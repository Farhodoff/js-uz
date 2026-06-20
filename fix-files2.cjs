const fs = require('fs');
const path = require('path');

const dir = 'src/data/lessons/react';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Fix `code: \`import` to `code: `import`
  content = content.replace(/code:\s*\\`/g, 'code: `');
  
  fs.writeFileSync(filePath, content);
}
