const fs = require('fs');
const path = require('path');

const lessons = [
  { id: 'step1_nodejs_intro', title: "Node.js Asoslari: REPL va Global Obyekt" },
  { id: 'step2_modules_fs', title: "Modullar (CommonJS, ESM) va File System (FS)" },
  { id: 'step3_events_streams', title: "Events (Hodisalar), Streams va Buffers" },
  { id: 'step4_http_server', title: "HTTP Moduli va Node.js da Server Yaratish" },
  { id: 'step5_express_basics', title: "Express.js Asoslari va Routing" }
];

const dir = path.join(__dirname, 'src/data/lessons/nodejs');

lessons.forEach(l => {
  const fileContent = `export const ${l.id} = {
  id: "${l.id}",
  title: "${l.title}",
  language: "javascript",
  theory: \`\`,
  exercises: [],
  quizzes: []
};
`;
  fs.writeFileSync(path.join(dir, `${l.id}.js`), fileContent, 'utf8');
});
console.log("Skeletons created!");
