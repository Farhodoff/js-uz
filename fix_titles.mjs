import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixTitles() {
  const curriculumPath = path.join(__dirname, 'src/data/curriculum.js');
  let content = await fs.readFile(curriculumPath, 'utf8');

  // Regex to match the lesson objects
  const regex = /\{ id: "([^"]+)", title: "([^"]*)", load: \(\) => import\("([^"]+)"\)\.then\(m => m\.([^\)]+)\) \}/g;
  
  const matches = [...content.matchAll(regex)];
  console.log(`Found ${matches.length} lessons to check.`);

  let updatedContent = content;

  for (const match of matches) {
    const fullString = match[0];
    const id = match[1];
    const brokenTitle = match[2];
    const importPath = match[3]; // e.g. "./lessons/beginner/variables.js"
    const exportName = match[4];

    try {
      const absolutePath = path.join(__dirname, 'src/data', importPath);
      // We must append file:// for dynamic import on windows/mac with absolute paths
      const module = await import('file://' + absolutePath);
      const realTitle = module[exportName].title;

      if (realTitle && realTitle !== brokenTitle) {
        // Escape quotes if necessary, though titles usually only have single quotes.
        // The curriculum.js uses double quotes for titles.
        const escapedTitle = realTitle.replace(/"/g, '\\"');
        const newString = `{ id: "${id}", title: "${escapedTitle}", load: () => import("${importPath}").then(m => m.${exportName}) }`;
        updatedContent = updatedContent.replace(fullString, newString);
        console.log(`Fixed: "${brokenTitle}" -> "${realTitle}"`);
      }
    } catch (err) {
      console.error(`Failed to load ${importPath}: ${err.message}`);
    }
  }

  await fs.writeFile(curriculumPath, updatedContent, 'utf8');
  console.log('Successfully updated curriculum.js');
}

fixTitles();
