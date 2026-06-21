const fs = require('fs');

function fixDir(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    if(file.endsWith('.js')) {
      const p = dirPath + '/' + file;
      let content = fs.readFileSync(p, 'utf8');
      content = content.replace(/\\\\'/g, "\\'");
      fs.writeFileSync(p, content, 'utf8');
    }
  });
}

fixDir('/Users/farhod/Desktop/github/js-uz/src/data/lessons/react-projects');
console.log('Fixed quotes in react-projects');
