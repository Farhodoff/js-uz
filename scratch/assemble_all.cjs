const fs = require('fs');
const path = require('path');

const curriculumPath = path.resolve(__dirname, '../src/data/curriculum.js');
const scratchDir = __dirname;
const outputBaseDir = path.resolve(__dirname, '../src/data/lessons');

// 1. Build mapping from curriculum.js
const curriculum = fs.readFileSync(curriculumPath, 'utf8');
const lines = curriculum.split('\n');
const topicToDest = {};

for (let line of lines) {
  if (line.includes('import ')) {
    const m = line.match(/import\s+\{\s*([a-zA-Z0-9_]+)(?:\s+as\s+([a-zA-Z0-9_]+))?\s*\}\s+from\s+"([^"]+)"/);
    if (m) {
      const exportName = m[1];
      const aliasName = m[2] || m[1];
      const importPath = m[3]; // e.g. "./lessons/beginner/switch"
      
      const pathParts = importPath.replace('./lessons/', '').split('/');
      if (pathParts.length === 2) {
        const category = pathParts[0];
        const filename = pathParts[1];
        
        topicToDest[exportName] = { category, filename };
        topicToDest[aliasName] = { category, filename };
      }
    }
  }
}

// 2. Find all topics in scratch
const scratchFiles = fs.readdirSync(scratchDir);
const topics = new Set();
for (let f of scratchFiles) {
  const m = f.match(/^([a-zA-Z0-9_]+)_theory\.md/);
  if (m) topics.add(m[1]);
}

let successCount = 0;
let failCount = 0;

// 3. Process each topic
for (let topic of topics) {
  const dest = topicToDest[topic];
  if (!dest) {
    console.error(`Could not map topic: ${topic}`);
    failCount++;
    continue;
  }
  
  const theoryPath = path.join(scratchDir, `${topic}_theory.md`);
  const exercisesPath = path.join(scratchDir, `${topic}_exercises.json`);
  const quizzesPath = path.join(scratchDir, `${topic}_quizzes.json`);
  const metaPath = path.join(scratchDir, `${topic}_meta.json`);
  
  if (!fs.existsSync(theoryPath) || !fs.existsSync(exercisesPath) || !fs.existsSync(quizzesPath) || !fs.existsSync(metaPath)) {
    console.error(`Missing files for topic: ${topic}`);
    failCount++;
    continue;
  }
  
  let theoryRaw = fs.readFileSync(theoryPath, 'utf8');
  
  // REPLACE "Analogiya" to "O'xshatish"
  theoryRaw = theoryRaw.replace(/Analogiya/g, "O'xshatish").replace(/analogiya/g, "o'xshatish");
  
  const exercisesRaw = fs.readFileSync(exercisesPath, 'utf8');
  const quizzesRaw = fs.readFileSync(quizzesPath, 'utf8');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  
  // Escape backticks correctly
  const escapedTheory = theoryRaw
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
    
  const jsContent = `export const ${topic} = {
  id: "${meta.id || topic}",
  title: "${meta.title}",
  language: "${meta.language || 'javascript'}",
  theory: \`${escapedTheory}\`,
  exercises: ${exercisesRaw},
  quizzes: ${quizzesRaw}
};
`;

  const outputDir = path.join(outputBaseDir, dest.category);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `${dest.filename}.js`);
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  successCount++;
}

console.log(`Successfully assembled ${successCount} topics. Failed: ${failCount}`);
