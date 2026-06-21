const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // replace all \\' with \'
  content = content.replace(/\\\\'/g, "\\'");
  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('/Users/farhod/Desktop/github/js-uz/src/data/lessons/react/step13_advanced_hooks.js');
fixFile('/Users/farhod/Desktop/github/js-uz/src/data/lessons/react/step14_class_components_and_errors.js');
console.log('Fixed quotes');
