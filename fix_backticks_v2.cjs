const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'lessons', 'react');
const files = fs.readdirSync(dir).filter(f => f.startsWith('step') && f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the content block
  const startIndex = content.indexOf('content: `');
  if (startIndex === -1) return;
  
  // The start of the template string content
  const startStr = startIndex + 'content: `'.length;
  
  // The closing backtick is right before the comma that precedes 'code:'
  const nextPropIndex = content.indexOf('`,\n  code:');
  
  if (nextPropIndex === -1) {
    console.error(`Could not find \`,\n  code: marker in ${file}`);
    return;
  }
  
  const contentBlock = content.substring(startStr, nextPropIndex);
  
  // Escape unescaped backticks
  let newContentBlock = contentBlock.replace(/(?<!\\)`/g, '\\`');
  
  content = content.substring(0, startStr) + newContentBlock + content.substring(nextPropIndex);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', file);
});
