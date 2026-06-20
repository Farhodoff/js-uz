const fs = require('fs');

const createLesson = (name, title) => {
  const content = `export const ${name} = {
  title: "${title}",
  content: \`
# ${title}

Tez kunda bu dars uchun batafsil ma'lumotlar qo'shiladi.

\`\`\`javascript
// Namuna kod
console.log("Hello React!");
\`\`\`
  \`,
  code: \`import React from "react";\n\nexport default function App() {\n  return <h1>Hello React</h1>;\n}\`,
  exercises: [],
  quizzes: []
};
`;
  fs.writeFileSync(`src/data/lessons/react/${name}.js`, content);
}

createLesson('reactIntro', 'React nima?');
createLesson('jsxBasics', 'JSX Asoslari');
createLesson('reactComponents', 'Komponentlar va Props');
createLesson('reactState', 'State va useState Hook\\'i');
createLesson('useEffectHook', 'useEffect va Komponent Hayoti');
