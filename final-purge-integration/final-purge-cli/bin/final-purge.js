#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');

const DependencyTracer = require('../lib/dependency-tracer');
const ProductionExtractor = require('../lib/production-extractor');
const Validator = require('../lib/validator');

const program = new Command();

// ASCII Art Banner
const banner = `
${chalk.cyan('╔═══════════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}                     ${chalk.bold.red('🔥 FINAL PURGE 🔥')}                      ${chalk.cyan('║')}
${chalk.cyan('║')}           ${chalk.yellow('Eliminate codebase bloat like a boss')}            ${chalk.cyan('║')}
${chalk.cyan('╚═══════════════════════════════════════════════════════════════╝')}
`;

program
  .name('final-purge')
  .description('Eliminate codebase bloat by extracting only production-used files')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analyze your codebase and identify production files')
  .option('-e, --entry <files...>', 'Entry point files (e.g., src/main.js)', ['src/main.js'])
  .option('-o, --output <dir>', 'Output directory for clean version', 'clean-build')
  .option('-r, --report <file>', 'Report file path', 'purge-report.json')
  .option('--dry-run', 'Show what would be done without making changes')
  .action(async (options) => {
    console.log(banner);
    
    const spinner = ora('🔍 Scanning your codebase...').start();
    
    try {
      // Step 1: Trace dependencies
      spinner.text = '🕵️  Tracing production dependencies...';
      const tracer = new DependencyTracer();
      const analysis = await tracer.trace(options.entry);
      
      spinner.text = `📊 Found ${analysis.usedFiles.length} production files`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Calculate savings
      const totalFiles = await getTotalFileCount('.');
      const savings = ((totalFiles - analysis.usedFiles.length) / totalFiles * 100).toFixed(1);
      
      spinner.succeed(`🎯 Analysis complete! ${savings}% bloat detected`);
      
      // Display results
      console.log('\n' + chalk.bold('📈 ANALYSIS RESULTS:'));
      console.log(chalk.green(`✅ Production files: ${analysis.usedFiles.length}`));
      console.log(chalk.red(`❌ Unused files: ${totalFiles - analysis.usedFiles.length}`));
      console.log(chalk.yellow(`💡 Potential savings: ${savings}%`));
      
      if (options.dryRun) {
        console.log(chalk.blue('\n🔍 DRY RUN MODE - No files will be modified'));
        return;
      }
      
      // Step 3: Ask for confirmation
      const { proceed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: `Create clean version with ${analysis.usedFiles.length} files?`,
        default: true
      }]);
      
      if (!proceed) {
        console.log(chalk.yellow('Operation cancelled by user'));
        return;
      }
      
      // Step 4: Extract production files
      const extractSpinner = ora('🚀 Creating clean version...').start();
      const extractor = new ProductionExtractor();
      await extractor.extract(analysis.usedFiles, options.output);
      
      extractSpinner.text = '🧪 Validating clean version...';
      const validator = new Validator();
      const isValid = await validator.validate(options.output);
      
      if (isValid) {
        extractSpinner.succeed('🎉 Clean version created and validated!');
        
        console.log('\n' + chalk.bold.green('🏆 MISSION ACCOMPLISHED!'));
        console.log(chalk.green(`✅ Clean codebase: ${options.output}/`));
        console.log(chalk.green(`✅ Savings: ${savings}% reduction`));
        console.log(chalk.green(`✅ Status: Fully functional`));
        
        console.log('\n' + chalk.bold('🚀 NEXT STEPS:'));
        console.log(`1. Test: ${chalk.cyan(`cd ${options.output} && npm run dev`)}`);
        console.log(`2. Build: ${chalk.cyan(`npm run build`)}`);
        console.log(`3. Deploy: ${chalk.cyan('Your clean version is production-ready!')}`);
        
      } else {
        extractSpinner.fail('❌ Validation failed - check the logs');
      }
      
      // Save report
      await fs.writeJSON(options.report, {
        timestamp: new Date().toISOString(),
        originalFiles: totalFiles,
        cleanFiles: analysis.usedFiles.length,
        savings: `${savings}%`,
        files: analysis.usedFiles
      }, { spaces: 2 });
      
    } catch (error) {
      spinner.fail(`❌ Error: ${error.message}`);
      console.error(chalk.red(error.stack));
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate that a clean version works independently')
  .argument('<directory>', 'Directory to validate')
  .action(async (directory) => {
    console.log(banner);
    
    const spinner = ora(`🧪 Validating ${directory}...`).start();
    
    try {
      const validator = new Validator();
      const isValid = await validator.validate(directory);
      
      if (isValid) {
        spinner.succeed('✅ Validation passed - codebase is independent!');
      } else {
        spinner.fail('❌ Validation failed - check dependencies');
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(`❌ Validation error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('stats')
  .description('Show statistics about your codebase')
  .action(async () => {
    console.log(banner);
    
    const spinner = ora('📊 Calculating statistics...').start();
    
    try {
      const totalFiles = await getTotalFileCount('.');
      const totalSize = await getTotalSize('.');
      
      spinner.succeed('📈 Statistics calculated');
      
      console.log('\n' + chalk.bold('📊 CODEBASE STATISTICS:'));
      console.log(chalk.blue(`📁 Total files: ${totalFiles.toLocaleString()}`));
      console.log(chalk.blue(`💾 Total size: ${formatBytes(totalSize)}`));
      console.log(chalk.yellow(`💡 Run 'final-purge analyze' to see potential savings!`));
      
    } catch (error) {
      spinner.fail(`❌ Error: ${error.message}`);
    }
  });

// Helper functions
async function getTotalFileCount(dir) {
  const glob = require('glob');
  const files = await glob('**/*', { 
    cwd: dir, 
    nodir: true,
    ignore: ['node_modules/**', 'dist/**', 'build/**', '.git/**']
  });
  return files.length;
}

async function getTotalSize(dir) {
  const glob = require('glob');
  const files = await glob('**/*', { 
    cwd: dir, 
    nodir: true,
    ignore: ['node_modules/**', 'dist/**', 'build/**', '.git/**']
  });
  
  let totalSize = 0;
  for (const file of files) {
    try {
      const stats = await fs.stat(path.join(dir, file));
      totalSize += stats.size;
    } catch (error) {
      // Skip files that can't be accessed
    }
  }
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(banner);
  console.log(chalk.bold('🚀 QUICK START:'));
  console.log(`  ${chalk.cyan('final-purge analyze')}     - Analyze your codebase`);
  console.log(`  ${chalk.cyan('final-purge stats')}       - Show codebase statistics`);
  console.log(`  ${chalk.cyan('final-purge validate')}    - Validate a clean version`);
  console.log(`  ${chalk.cyan('final-purge --help')}      - Show all commands`);
  console.log('');
}

program.parse(); 