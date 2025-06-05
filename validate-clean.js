#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function countFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.html']) {
  let count = 0;
  
  function traverse(currentPath) {
    try {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
          traverse(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item);
          if (extensions.includes(ext)) {
            count++;
          }
        }
      }
    } catch (err) {
      // Skip directories we can't read
    }
  }
  
  traverse(dir);
  return count;
}

console.log('\n🧹 CLEAN VERSION VALIDATION');
console.log('=' .repeat(50));

const cleanCount = countFiles('./src');
const originalCount = countFiles('../src');

console.log(`📁 CLEAN VERSION (./src):     ${cleanCount} files`);
console.log(`📁 ORIGINAL VERSION (../src): ${originalCount} files`);
console.log(`📊 REDUCTION:                 ${((originalCount - cleanCount) / originalCount * 100).toFixed(1)}%`);
console.log(`🎯 SPACE SAVED:               ${originalCount - cleanCount} files removed`);

if (cleanCount < 300) {
  console.log('\n✅ VALIDATION: You are on the CLEAN VERSION! 🎉');
} else {
  console.log('\n❌ VALIDATION: You might be on the original version');
}

console.log('\n🌐 ACCESS URLS:');
console.log('   Clean Version:    http://localhost:5174');
console.log('   Original Version: http://localhost:5173 (if running)');
console.log('\n💡 Look for the green validation banner at the top of the page!'); 