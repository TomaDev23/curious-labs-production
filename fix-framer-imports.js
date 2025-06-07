import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get the correct relative path to FramerProvider
function getRelativePathToFramerProvider(filePath) {
  const relativePath = path.relative(path.dirname(filePath), 'src');
  return relativePath ? `${relativePath}/FramerProvider` : './FramerProvider';
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if file doesn't contain framer-motion imports
    if (!content.includes('framer-motion')) {
      return false;
    }
    
    console.log(`🔧 Processing: ${filePath}`);
    
    let updatedContent = content;
    const relativePath = getRelativePathToFramerProvider(filePath);
    
    // Replace various framer-motion import patterns
    const patterns = [
      // import { motion } from 'framer-motion'
      /import\s*{\s*([^}]+)\s*}\s*from\s*['"]framer-motion['"]/g,
      // import * as framerMotion from 'framer-motion'
      /import\s*\*\s*as\s+(\w+)\s*from\s*['"]framer-motion['"]/g,
      // import framerMotion from 'framer-motion'
      /import\s+(\w+)\s*from\s*['"]framer-motion['"]/g
    ];
    
    patterns.forEach(pattern => {
      updatedContent = updatedContent.replace(pattern, (match, importedItems) => {
        console.log(`  📝 Replacing: ${match}`);
        return `import { ${importedItems} } from '${relativePath}'`;
      });
    });
    
    // If content changed, write it back
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`  ✅ Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find all JS/JSX/TS/TSX files
function findFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  let files = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, dist, build directories
        if (!['node_modules', 'dist', 'build', '.git'].includes(entry.name)) {
          files = files.concat(findFiles(fullPath, extensions));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Main execution
console.log('🚀 Starting framer-motion import fix automation...\n');

const startTime = Date.now();
const srcDir = path.join(process.cwd(), 'src');

// Find all JS/JSX/TS/TSX files in src directory
const files = findFiles(srcDir);
console.log(`📁 Found ${files.length} files to check\n`);

let processedCount = 0;
let updatedCount = 0;

files.forEach(file => {
  processedCount++;
  if (processFile(file)) {
    updatedCount++;
  }
});

const endTime = Date.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);

console.log('\n🎯 AUTOMATION COMPLETE!');
console.log(`📊 Statistics:`);
console.log(`  • Files checked: ${processedCount}`);
console.log(`  • Files updated: ${updatedCount}`);
console.log(`  • Duration: ${duration}s`);
console.log('\n✅ All framer-motion imports have been updated to use FramerProvider!');
console.log('🔥 Run npm run build to test the fixes'); 