import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const replacements = [
  { from: /bg-obsidian-900/g, to: 'bg-background' },
  { from: /bg-\[#0B0806\]/g, to: 'bg-background' },
  { from: /bg-\[#0B0B0C\]/g, to: 'bg-background' },
  { from: /bg-\[#121214\]/g, to: 'bg-surface' },
  { from: /bg-\[#120C09\]\/80/g, to: 'glass-navbar' },
  { from: /bg-\[#1A1A1E\]/g, to: 'bg-surface-elevated' },
  { from: /bg-neutral-900/g, to: 'bg-surface' },
  { from: /bg-neutral-950\/40/g, to: 'bg-surface' },
  { from: /bg-neutral-950/g, to: 'bg-surface' },
  { from: /bg-neutral-850/g, to: 'bg-surface-elevated' },
  { from: /bg-neutral-800/g, to: 'bg-surface-elevated' },
  { from: /text-white/g, to: 'text-main' },
  { from: /text-neutral-200/g, to: 'text-main' },
  { from: /text-neutral-300/g, to: 'text-main/80' },
  { from: /text-neutral-400/g, to: 'text-muted' },
  { from: /text-neutral-500/g, to: 'text-muted' },
  { from: /border-white\/5/g, to: 'border-subtle' },
  { from: /border-white\/10/g, to: 'border-subtle' },
  { from: /border-white\/15/g, to: 'border-subtle' },
  { from: /border-white\/\[0\.04\]/g, to: 'border-subtle' },
  { from: /border-white\/\[0\.03\]/g, to: 'border-subtle' },
  { from: /border-white\/\[0\.06\]/g, to: 'border-subtle' },
  { from: /border-white\/\[0\.08\]/g, to: 'border-subtle' },
  { from: /bg-white\/5/g, to: 'bg-main/5' },
  { from: /bg-white\/10/g, to: 'bg-main/10' },
  { from: /bg-white\/15/g, to: 'bg-main/15' },
  { from: /bg-white\/20/g, to: 'bg-main/20' },
  { from: /bg-white\/\[0\.03\]/g, to: 'bg-main/5' },
  { from: /ring-\[#0B0806\]/g, to: 'ring-background' },
  { from: /ring-white\/10/g, to: 'ring-subtle' },
  { from: /glass-card-dark/g, to: 'glass-card-dark' } // keeping for reference
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
console.log('Done replacement.');
