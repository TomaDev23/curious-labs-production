const fs = require('fs-extra');
const path = require('path');

class ProductionExtractor {
  constructor(options = {}) {
    this.options = {
      preserveStructure: true,
      copyConfigs: true,
      ...options
    };
  }

  async extract(usedFiles, outputDir) {
    console.log(`🚀 Extracting ${usedFiles.length} files to ${outputDir}...`);
    
    // Ensure output directory exists and is clean
    await fs.ensureDir(outputDir);
    
    // Track copied files for reporting
    const copied = [];
    const failed = [];

    // Copy each used file
    for (const filePath of usedFiles) {
      try {
        const relativePath = path.relative(process.cwd(), filePath);
        const outputPath = path.join(outputDir, relativePath);
        
        // Ensure directory exists
        await fs.ensureDir(path.dirname(outputPath));
        
        // Copy file
        await fs.copy(filePath, outputPath);
        copied.push(relativePath);
        
      } catch (error) {
        failed.push({ file: filePath, error: error.message });
      }
    }

    // Copy essential config files if not already included
    if (this.options.copyConfigs) {
      await this.copyEssentialConfigs(outputDir, copied);
    }

    console.log(`✅ Extraction complete: ${copied.length} files copied, ${failed.length} failed`);
    
    return {
      copied: copied.length,
      failed: failed.length,
      copiedFiles: copied,
      failedFiles: failed
    };
  }

  async copyEssentialConfigs(outputDir, alreadyCopied) {
    const essentialConfigs = [
      'package.json',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
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
      '.gitignore',
      'vercel.json',
      'netlify.toml'
    ];

    for (const config of essentialConfigs) {
      if (!alreadyCopied.includes(config) && await fs.pathExists(config)) {
        try {
          await fs.copy(config, path.join(outputDir, config));
          console.log(`📋 Copied essential config: ${config}`);
        } catch (error) {
          console.warn(`⚠️ Failed to copy config ${config}: ${error.message}`);
        }
      }
    }
  }
}

module.exports = ProductionExtractor; 