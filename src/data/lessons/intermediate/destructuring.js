export const destructuring = {
  id: "m1", title: "Destructuring",
  theory: `## Destructuring

Ob'ekt yoki massivdan qiymatlarni ajratib olish.

**Ob'ekt destructuring:**
\`\`\`js
const user = { ism: "Ali", yosh: 25 };
const { ism, yosh } = user;
\`\`\`

**Massiv destructuring:**
\`\`\`js
const [birinchi, ikkinchi] = [10, 20];
\`\`\`

**Default qiymat:**
\`\`\`js
const { ism = "Noma'lum" } = {};
\`\`\``,
  task: "// Topshiriq: Quyidagi ob'ektdan destructuring yordamida\n// 'nomi' va 'narxi' ni ajratib chiqaring\n\nconst mahsulot = { nomi: 'Telefon', narxi: 5000000, brend: 'Samsung' };\n\n// destructuring qiling\nconst { } = mahsulot;\nconsole.log(nomi, narxi);",
  hint: "const { nomi, narxi } = mahsulot; console.log(nomi, narxi);"
};
