const fs = require('fs');
const { execSync } = require('child_process');

const filePath = 'src/data/lessons/advanced/regex.js';
const oldHash = 'bf806461';

let currentContent = fs.readFileSync(filePath, 'utf8');
const oldContent = execSync('git show ' + oldHash + ':' + filePath).toString();

const oldStart = oldContent.indexOf('  exercises: [');
const oldEnd = oldContent.indexOf('  quizzes: [');

if (oldStart === -1 || oldEnd === -1) {
  console.log('Could not find exercises or quizzes in old file');
  process.exit(1);
}

const oldExercisesBlock = oldContent.substring(oldStart, oldEnd);

const currentStart = currentContent.indexOf('  exercises: [');
const currentEnd = currentContent.indexOf('  quizzes: [');

if (currentStart === -1 || currentEnd === -1) {
  console.log('Could not find exercises or quizzes in current file');
  process.exit(1);
}

const newContent = currentContent.substring(0, currentStart) + oldExercisesBlock + currentContent.substring(currentEnd);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully restored regex.js exercises using string index!');
