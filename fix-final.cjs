const fs = require('fs');
const path = require('path');

const dir = 'src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace {` with {\`
  content = content.replace(/\{`/g, '{\\`');
  
  // Replace `} with \`}
  content = content.replace(/`\}/g, '\\`}');
  
  // Replace ${ with \${ but avoid replacing already escaped ones
  content = content.replace(/(?<!\\)\$\{/g, '\\${');
  
  fs.writeFileSync(filePath, content);
}
