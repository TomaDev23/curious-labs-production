const fs = require('fs-extra');
const path = require('path');
const { parse } = require('acorn');
const walk = require('acorn-walk');
const glob = require('glob');

class DependencyTracer {
  constructor(options = {}) {
    this.options = {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'],
      ignorePatterns: [
        'node_modules/**',
        'dist/**',
        'build/**',
        '.git/**',
        '**/*.test.*',
        '**/*.spec.*',
        ...options.ignorePatterns || []
      ],
      ...options
    };
    
    this.usedFiles = new Set();
    this.processed = new Set();
    this.errors = [];
  }

  async trace(entryPoints) {
    console.log(`🔍 Starting dependency trace from ${entryPoints.length} entry points...`);
    
    // Ensure entry points exist
    for (const entry of entryPoints) {
      if (!await fs.pathExists(entry)) {
        throw new Error(`Entry point not found: ${entry}`);
      }
    }

    // Process each entry point
    for (const entry of entryPoints) {
      await this.processFile(path.resolve(entry));
    }

    // Include essential project files
    await this.includeEssentialFiles();

    // Include public assets
    await this.includePublicAssets();

    const result = {
      entryPoints,
      usedFiles: Array.from(this.usedFiles),
      totalFiles: this.usedFiles.size,
      errors: this.errors,
      timestamp: new Date().toISOString()
    };

    console.log(`✅ Dependency trace complete: ${result.totalFiles} files found`);
    return result;
  }

  async processFile(filePath) {
    const normalizedPath = path.normalize(filePath);
    
    // Skip if already processed
    if (this.processed.has(normalizedPath)) {
      return;
    }
    
    this.processed.add(normalizedPath);

    // Check if file exists
    if (!await fs.pathExists(normalizedPath)) {
      this.errors.push(`File not found: ${normalizedPath}`);
      return;
    }

    // Add to used files
    this.usedFiles.add(normalizedPath);

    try {
      const content = await fs.readFile(normalizedPath, 'utf8');
      const imports = this.extractImports(content, normalizedPath);

      // Process each import
      for (const importPath of imports) {
        const resolvedPath = await this.resolveImport(importPath, normalizedPath);
        if (resolvedPath) {
          await this.processFile(resolvedPath);
        }
      }

    } catch (error) {
      this.errors.push(`Error processing ${normalizedPath}: ${error.message}`);
    }
  }

  extractImports(content, filePath) {
    const imports = [];
    const ext = path.extname(filePath);

    try {
      // Handle JSON files
      if (ext === '.json') {
        return imports;
      }

      // Handle CSS/SCSS files
      if (['.css', '.scss', '.sass'].includes(ext)) {
        const cssImports = content.match(/@import\s+['"]([^'"]+)['"]/g) || [];
        return cssImports.map(imp => imp.match(/['"]([^'"]+)['"]/)[1]);
      }

      // Parse JavaScript/TypeScript
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowImportExportEverywhere: true,
        allowHashBang: true
      });

      walk.simple(ast, {
        ImportDeclaration(node) {
          imports.push(node.source.value);
        },
        CallExpression(node) {
          // Handle dynamic imports: import('path')
          if (node.callee.type === 'Import' && node.arguments.length > 0) {
            if (node.arguments[0].type === 'Literal') {
              imports.push(node.arguments[0].value);
            }
          }
          
          // Handle require() calls
          if (node.callee.type === 'Identifier' && node.callee.name === 'require') {
            if (node.arguments.length > 0 && node.arguments[0].type === 'Literal') {
              imports.push(node.arguments[0].value);
            }
          }
        }
      });

      // Extract additional patterns using regex for edge cases
      const regexPatterns = [
        /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,  // Dynamic imports
        /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g, // Require calls
        /from\s+['"`]([^'"`]+)['"`]/g,              // Import from
        /import\s+['"`]([^'"`]+)['"`]/g,            // Import statements
      ];

      for (const pattern of regexPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          imports.push(match[1]);
        }
      }

    } catch (error) {
      // If parsing fails, try regex extraction
      const fallbackImports = this.extractImportsWithRegex(content);
      imports.push(...fallbackImports);
    }

    return [...new Set(imports)]; // Remove duplicates
  }

  extractImportsWithRegex(content) {
    const imports = [];
    const patterns = [
      /import\s+.*?from\s+['"`]([^'"`]+)['"`]/g,
      /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
      /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
      /import\s+['"`]([^'"`]+)['"`]/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        imports.push(match[1]);
      }
    }

    return imports;
  }

  async resolveImport(importPath, fromFile) {
    // Skip node_modules imports
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
      return null;
    }

    const baseDir = path.dirname(fromFile);
    let resolvedPath;

    // Handle relative imports
    if (importPath.startsWith('.')) {
      resolvedPath = path.resolve(baseDir, importPath);
    } else {
      resolvedPath = path.resolve(importPath);
    }

    // Try different extensions if no extension provided
    if (!path.extname(resolvedPath)) {
      for (const ext of this.options.extensions) {
        const withExt = resolvedPath + ext;
        if (await fs.pathExists(withExt)) {
          return withExt;
        }
      }

      // Try index files
      for (const ext of this.options.extensions) {
        const indexFile = path.join(resolvedPath, `index${ext}`);
        if (await fs.pathExists(indexFile)) {
          return indexFile;
        }
      }
    } else {
      // File has extension, check if it exists
      if (await fs.pathExists(resolvedPath)) {
        return resolvedPath;
      }
    }

    return null;
  }

  async includeEssentialFiles() {
    const essentialFiles = [
      'package.json',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      'index.html',
      'vite.config.js',
      'vite.config.ts',
      'webpack.config.js',
      'webpack.config.ts',
      'tailwind.config.js',
      'tailwind.config.ts',
      'postcss.config.js',
      'postcss.config.ts',
      'tsconfig.json',
      'jsconfig.json',
      '.env',
      '.env.local',
      '.env.production',
      '.gitignore',
      '.gitattributes',
      'vercel.json',
      'netlify.toml',
      'LICENSE',
      'README.md'
    ];

    for (const file of essentialFiles) {
      const filePath = path.resolve(file);
      if (await fs.pathExists(filePath)) {
        this.usedFiles.add(filePath);
      }
    }

    // Include dot directories
    const dotDirs = ['.github', '.vscode', '.next', '.nuxt'];
    for (const dir of dotDirs) {
      const dirPath = path.resolve(dir);
      if (await fs.pathExists(dirPath)) {
        const files = await glob('**/*', { cwd: dirPath, nodir: true });
        for (const file of files) {
          this.usedFiles.add(path.resolve(dir, file));
        }
      }
    }
  }

  async includePublicAssets() {
    const assetDirs = ['public', 'static', 'assets', 'data'];
    
    for (const dir of assetDirs) {
      const dirPath = path.resolve(dir);
      if (await fs.pathExists(dirPath)) {
        const files = await glob('**/*', { cwd: dirPath, nodir: true });
        for (const file of files) {
          this.usedFiles.add(path.resolve(dir, file));
        }
      }
    }
  }
}

module.exports = DependencyTracer; 