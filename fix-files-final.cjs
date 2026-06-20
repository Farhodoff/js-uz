const fs = require('fs');
const path = require('path');

const dir = 'src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the closing backtick of `content`
  content = content.replace(/\\`,\n\s*code:/g, '`,\n  code:');
  
  // Replace the opening backtick of `code`
  content = content.replace(/code: \\`/g, 'code: `');
  
  // Replace the closing backtick of `code`
  content = content.replace(/\\`,\n\s*exercises:/g, '`,\n  exercises:');
  
  fs.writeFileSync(filePath, content);
}
