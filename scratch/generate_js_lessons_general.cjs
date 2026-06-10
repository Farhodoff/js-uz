const fs = require('fs');
const path = require('path');

const category = process.argv[2];
const lessonId = process.argv[3];
if (!category || !lessonId) {
  console.error("Usage: node generate_js_lessons_general.cjs <category> <lessonId>");
  process.exit(1);
}

const scratchDir = __dirname;
const outputDir = path.resolve(__dirname, `../src/data/lessons/${category}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const theoryPath = path.join(scratchDir, `${lessonId}_theory.md`);
const exercisesPath = path.join(scratchDir, `${lessonId}_exercises.json`);
const quizzesPath = path.join(scratchDir, `${lessonId}_quizzes.json`);
const metaPath = path.join(scratchDir, `${lessonId}_meta.json`);

if (!fs.existsSync(theoryPath) || !fs.existsSync(exercisesPath) || !fs.existsSync(quizzesPath) || !fs.existsSync(metaPath)) {
  console.error(`Missing files for ${lessonId} in scratch folder!`);
  process.exit(1);
}

const theoryRaw = fs.readFileSync(theoryPath, 'utf8');
const exercisesRaw = fs.readFileSync(exercisesPath, 'utf8');
const quizzesRaw = fs.readFileSync(quizzesPath, 'utf8');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const escapedTheory = theoryRaw
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

const jsContent = `export const ${lessonId} = {
  id: "${lessonId}",
  title: "${meta.title}",
  language: "${meta.language || 'javascript'}",
  theory: \`${escapedTheory}\`,
  exercises: ${exercisesRaw},
  quizzes: ${quizzesRaw}
};
`;

const outputPath = path.join(outputDir, `${lessonId}.js`);
fs.writeFileSync(outputPath, jsContent, 'utf8');
console.log(`Successfully generated ${outputPath}`);
