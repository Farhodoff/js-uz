export const spreadRest = {
  id: "m2", title: "Spread & Rest",
  theory: `## Spread va Rest operatori (\`...\`)

**Spread** — elementlarni yoyish:
\`\`\`js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
\`\`\`

**Ob'ektda:**
\`\`\`js
const yangi = { ...eski, yosh: 30 };
\`\`\`

**Rest** — qolgan argumentlar:
\`\`\`js
function yig(a, b, ...qolgan) {
  return qolgan;
}
\`\`\``,
  task: "// Topshiriq: Spread yordamida 2 massivni birlashtiring\n\nconst sabzavotlar = ['pomidor', 'bodring'];\nconst mevalar = ['olma', 'banan'];\n\n// birlashtirilgan massiv yarating\nconst hammasi = [];\nconsole.log(hammasi);",
  hint: "const hammasi = [...sabzavotlar, ...mevalar]; console.log(hammasi);"
};
