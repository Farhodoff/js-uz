export const objects = {
  id: "b6",
  title: "Ob'ektlar (Objects)",
  theory: `## Ob'ektlar nima?
Kalit-qiymat (key-value) juftligi ko'rinishida ma'lumot saqlash.

\`\`\`javascript
const user = {
  name: "Ali",
  age: 25,
  job: "Developer"
};
\`\`\`

**Xususiyatlarga kirish:**
- \`user.name\` (dot notation)
- \`user["age"]\` (bracket notation)

**Metodlar:**
Ob'ekt ichidagi funksiyalar metod deyiladi.`,
  task: `// 1. 'car' nomli ob'ekt yarating (model, year, color).
// 2. Ob'ektga yangi 'price' xususiyatini qo'shing.
// 3. Ob'ekt ichida 'start' nomli metod yarating, u "Vroom!" deb konsolga chiqarsin.

const car = {};
// ...`,
  hint: `const car = {
  model: "Tesla",
  year: 2023,
  color: "black",
  start: function() {
    console.log("Vroom!");
  }
};
car.price = 50000;
car.start();`
};
