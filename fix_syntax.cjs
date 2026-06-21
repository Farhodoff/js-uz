const fs = require('fs');
const glob = require('fs').readdirSync;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix opening backticks
  content = content.replace(/(startingCode|solution|code):\s*\\`/g, '$1: `');
  
  // Fix closing backticks
  content = content.replace(/\\`,/g, '`,');
  
  // End of file closing backticks might not have a comma
  // So we also replace \` } with ` }
  content = content.replace(/\\`\n(\s*)\}/g, '`\n$1}');

  fs.writeFileSync(filePath, content, 'utf8');
}

const dir = '/Users/farhod/Desktop/github/js-uz/src/data/lessons/react-projects';
glob(dir).forEach(file => {
  if(file.endsWith('.js')) {
    fixFile(dir + '/' + file);
  }
});

console.log('Fixed syntax errors');
