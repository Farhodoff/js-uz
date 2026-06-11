const fs = require('fs');
const path = require('path');

const files = ['dsaGraphAlgos.js', 'dsaStringAlgos.js', 'dsaAdvancedDP.js', 'dsaAdvancedGraph.js', 'dsaGeometry.js'];
const dir = path.join(__dirname, '../src/data/lessons/algorithms');

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the start of theory: theory: `
  const theoryStartMarker = 'theory: `';
  const startIdx = content.indexOf(theoryStartMarker);
  if (startIdx === -1) {
    console.log(`Could not find theory start in ${file}`);
    return;
  }

  // Find the end of theory: `,
  // But wait, there might be multiple `, in the file (e.g. at the end of properties)
  // The closing backtick of theory is followed by a comma and newline, then spaces and 'exercises:'
  const theoryEndPattern = '`,\n  exercises:';
  const endIdx = content.indexOf(theoryEndPattern);
  if (endIdx === -1) {
    console.log(`Could not find theory end in ${file}`);
    return;
  }

  const beforeTheory = content.slice(0, startIdx + theoryStartMarker.length);
  const theoryText = content.slice(startIdx + theoryStartMarker.length, endIdx);
  const afterTheory = content.slice(endIdx);

  // Now, escape any backticks in theoryText that are NOT already escaped
  // We can look at each character. If it is a backtick, check if the previous character is a backslash.
  let escapedTheory = '';
  for (let i = 0; i < theoryText.length; i++) {
    const char = theoryText[i];
    if (char === '`') {
      // Check if it is already escaped
      if (i > 0 && theoryText[i - 1] === '\\') {
        escapedTheory += char;
      } else {
        escapedTheory += '\\`';
      }
    } else {
      escapedTheory += char;
    }
  }

  const finalContent = beforeTheory + escapedTheory + afterTheory;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`Successfully fixed backticks in ${file}`);
});
