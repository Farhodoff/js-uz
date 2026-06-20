const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.js');
let code = fs.readFileSync(curriculumPath, 'utf8');

// Find all imports
// e.g. import { jsWhat } from "./lessons/beginner/js-what";
const importRegex = /import\s+\{\s*([a-zA-Z0-9_]+)\s*\}\s+from\s+["'](\.\/lessons\/[^"']+)["'];/g;

let match;
const importsMap = {}; // { jsWhat: "./lessons/beginner/js-what" }

while ((match = importRegex.exec(code)) !== null) {
  importsMap[match[1]] = match[2];
}

// Now replace imports with nothing
let newCode = code.replace(importRegex, '');

// For each lesson in lessons array, we replace `lessonVar,` with `{ id: "...", title: "...", load: () => import("path").then(m => m.lessonVar) },`
// We need to read the actual file to get id and title.

function extractMetadata(varName, relPath) {
  const fullPath = path.join(__dirname, 'src', 'data', relPath + '.js');
  if (!fs.existsSync(fullPath)) return null;
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  
  const idMatch = fileContent.match(/id:\s*["']([^"']+)["']/);
  const titleMatch = fileContent.match(/title:\s*["']([^"']+)["']/);
  
  if (!idMatch || !titleMatch) return null;
  
  return {
    id: idMatch[1],
    title: titleMatch[1]
  };
}

for (const [varName, relPath] of Object.entries(importsMap)) {
  const meta = extractMetadata(varName, relPath);
  if (meta) {
    // Replace standalone variable in array with object
    // Regex to match the variable in an array, e.g. `    jsWhat,`
    const varRegex = new RegExp(`(^|\\s|\\[|,)(${varName})(,|\\s|\\])`, 'g');
    
    // Instead of regex replace which might be risky, we can replace the exact word
    newCode = newCode.replace(varRegex, (match, p1, p2, p3) => {
      // p1 is before, p2 is varName, p3 is after
      return `${p1}{ id: "${meta.id}", title: "${meta.title}", load: () => import("${relPath}.js").then(m => m.${varName}) }${p3}`;
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'curriculum.js'), newCode);
console.log('Curriculum successfully refactored to use dynamic imports!');
