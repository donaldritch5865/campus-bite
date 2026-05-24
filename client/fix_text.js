import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const replacements = [
  { from: /bg-gradient-sunset(.*?)text-main/g, to: 'bg-gradient-sunset$1text-white' },
  { from: /bg-\[#FF5C00\](.*?)text-main/g, to: 'bg-[#FF5C00]$1text-white' },
  { from: /bg-black(.*?)text-main/g, to: 'bg-black$1text-white' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('Navbar.tsx') && !fullPath.includes('MobileNav.tsx') && !fullPath.includes('App.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rule of replacements) {
        content = content.replace(rule.from, rule.to);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(SRC_DIR);
console.log('Done fix.');
