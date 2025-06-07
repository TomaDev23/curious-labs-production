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

// Function to check if file already has framer-motion or FramerProvider import
function hasFramerImport(content) {
  return content.includes('framer-motion') || content.includes('FramerProvider');
}

// Function to detect motion usage in file
function hasMotionUsage(content) {
  return /motion\.|AnimatePresence|useAnimation|useMotionValue/.test(content);
}

// Function to extract used motion components
function extractMotionComponents(content) {
  const components = new Set();
  
  // Match motion.div, motion.span, etc.
  const motionMatches = content.match(/motion\.\w+/g);
  if (motionMatches) {
    components.add('motion');
  }
  
  // Match AnimatePresence
  if (content.includes('AnimatePresence')) {
    components.add('AnimatePresence');
  }
  
  // Match other framer-motion hooks
  if (content.includes('useAnimation')) {
    components.add('useAnimation');
  }
  
  if (content.includes('useMotionValue')) {
    components.add('useMotionValue');
  }
  
  if (content.includes('useScroll')) {
    components.add('useScroll');
  }
  
  if (content.includes('useTransform')) {
    components.add('useTransform');
  }
  
  return Array.from(components);
}

// Function to add import statement to file
function addFramerImport(content, relativePath, components) {
  const importStatement = `import { ${components.join(', ')} } from '${relativePath}';\n`;
  
  // Find the position after the last import statement
  const lines = content.split('\n');
  let insertIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ') || line.startsWith('//')) {
      insertIndex = i + 1;
    } else if (line === '') {
      // Continue if empty line after imports
      continue;
    } else {
      // Stop at first non-import, non-comment, non-empty line
      break;
    }
  }
  
  // Insert the import statement
  lines.splice(insertIndex, 0, importStatement);
  return lines.join('\n');
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if file doesn't use motion components
    if (!hasMotionUsage(content)) {
      return false;
    }
    
    // Skip if file already has framer import
    if (hasFramerImport(content)) {
      console.log(`⏭️  Skipping (already has import): ${filePath}`);
      return false;
    }
    
    console.log(`🔧 Processing: ${filePath}`);
    
    const relativePath = getRelativePathToFramerProvider(filePath);
    const components = extractMotionComponents(content);
    
    console.log(`  📝 Adding import for: ${components.join(', ')}`);
    
    const updatedContent = addFramerImport(content, relativePath, components);
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`  ✅ Updated: ${filePath}`);
    return true;
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
console.log('🚀 Starting missing motion imports fix automation...\n');

const startTime = Date.now();
const searchDirs = [
  path.join(process.cwd(), 'src'),
  path.join(process.cwd(), 'final-purge-integration'),
  path.join(process.cwd(), 'Docs')
];

let allFiles = [];
searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    allFiles = allFiles.concat(findFiles(dir));
  }
});

console.log(`📁 Found ${allFiles.length} files to check\n`);

let processedCount = 0;
let updatedCount = 0;

allFiles.forEach(file => {
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
console.log('\n✅ All missing motion imports have been added!');
console.log('🔥 Run npm run build to test the fixes'); 