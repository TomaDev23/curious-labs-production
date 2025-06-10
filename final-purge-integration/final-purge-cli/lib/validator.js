const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

class Validator {
  constructor(options = {}) {
    this.options = {
      timeout: 30000, // 30 seconds
      ...options
    };
  }

  async validate(directory) {
    console.log(`🧪 Validating clean version in ${directory}...`);
    
    // Check if directory exists
    if (!await fs.pathExists(directory)) {
      throw new Error(`Directory not found: ${directory}`);
    }

    // Check for package.json
    const packageJsonPath = path.join(directory, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      console.warn('⚠️ No package.json found - skipping npm build test');
      return this.validateBasicStructure(directory);
    }

    // Run basic structure validation
    const structureValid = await this.validateBasicStructure(directory);
    if (!structureValid) {
      return false;
    }

    // Try to run npm install (if node_modules doesn't exist)
    const nodeModulesPath = path.join(directory, 'node_modules');
    if (!await fs.pathExists(nodeModulesPath)) {
      console.log('📦 Installing dependencies...');
      const installSuccess = await this.runCommand('npm', ['install'], directory);
      if (!installSuccess) {
        console.error('❌ npm install failed');
        return false;
      }
    }

    // Try to run build command
    console.log('🔨 Testing build...');
    const buildSuccess = await this.runCommand('npm', ['run', 'build'], directory);
    if (!buildSuccess) {
      console.error('❌ Build failed');
      return false;
    }

    console.log('✅ Validation passed - clean version is fully functional!');
    return true;
  }

  async validateBasicStructure(directory) {
    console.log('🔍 Validating basic structure...');
    
    const requiredPaths = [
      'src',
      'package.json'
    ];

    for (const requiredPath of requiredPaths) {
      const fullPath = path.join(directory, requiredPath);
      if (!await fs.pathExists(fullPath)) {
        console.error(`❌ Required path missing: ${requiredPath}`);
        return false;
      }
    }

    // Check for main entry points
    const entryPoints = [
      'src/main.js',
      'src/main.jsx',
      'src/main.ts',
      'src/main.tsx',
      'src/index.js',
      'src/index.jsx',
      'src/index.ts',
      'src/index.tsx'
    ];

    let hasEntryPoint = false;
    for (const entry of entryPoints) {
      if (await fs.pathExists(path.join(directory, entry))) {
        hasEntryPoint = true;
        break;
      }
    }

    if (!hasEntryPoint) {
      console.warn('⚠️ No standard entry point found, but continuing validation...');
    }

    console.log('✅ Basic structure validation passed');
    return true;
  }

  async runCommand(command, args, cwd) {
    return new Promise((resolve) => {
      const child = spawn(command, args, {
        cwd,
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      const timeout = setTimeout(() => {
        child.kill();
        console.error(`❌ Command timed out: ${command} ${args.join(' ')}`);
        resolve(false);
      }, this.options.timeout);

      child.on('close', (code) => {
        clearTimeout(timeout);
        
        if (code === 0) {
          console.log(`✅ Command succeeded: ${command} ${args.join(' ')}`);
          resolve(true);
        } else {
          console.error(`❌ Command failed with code ${code}: ${command} ${args.join(' ')}`);
          if (errorOutput) {
            console.error('Error output:', errorOutput.slice(0, 500));
          }
          resolve(false);
        }
      });

      child.on('error', (error) => {
        clearTimeout(timeout);
        console.error(`❌ Command error: ${error.message}`);
        resolve(false);
      });
    });
  }
}

module.exports = Validator; 