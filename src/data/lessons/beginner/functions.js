export const functions = {
  id: "b2", title: "Funksiyalar",
  theory: `## Funksiyalar

Funksiya — bir necha marta ishlatiladigan kod bloki.

**E'lon qilish:**
\`\`\`js
function salom(ism) {
  return "Salom, " + ism + "!";
}
\`\`\`

**Chaqirish:**
\`\`\`js
salom("Ali"); // "Salom, Ali!"
\`\`\`

**Arrow function (ES6):**
\`\`\`js
const salom = (ism) => "Salom, " + ism + "!";
\`\`\``,
  task: "// 2-topshiriq: Ikki sonni qo'shadigan funksiya yozing\n// Natijani console.log() bilan chiqaring\n\nfunction qoshish(a, b) {\n  // shu yerga yozing\n}\n\nconsole.log(qoshish(5, 3));",
  hint: "function qoshish(a, b) { return a + b; } console.log(qoshish(5, 3));"
};
