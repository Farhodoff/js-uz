export const objects = {
  id: "b6",
  title: "Ob'ektlar (Objects)",
  theory: `## Obyektlar
Obyekt kalit-qiymat juftliklaridan iborat tuzilma. Foydalanuvchi, buyurtma, mahsulot va sozlamalar ko'pincha obyekt bo'ladi.

\`\`\`javascript
const user = {
  name: "Ali",
  age: 25,
  job: "Developer"
};
\`\`\`

## Kirish usullari
- \`user.name\` - dot notation
- \`user["age"]\` - bracket notation

## Metodlar
Obyekt ichidagi funksiya metod deyiladi.

## Quiz
1. Obyekt nima uchun ishlatiladi?
2. Dot notation va bracket notation farqi nima?
3. Obyekt ichida funksiya bo'lishi mumkinmi?`,
  task: `// 1. car nomli ob'ekt yarating (model, year, color).
// 2. Ob'ektga price xususiyatini qo'shing.
// 3. start nomli metod yarating va "Vroom!" chiqaring.

const car = {};
// Davom ettiring`,
  hint: `const car = {
  model: "Tesla",
  year: 2023,
  color: "black",
  start: function () {
    console.log("Vroom!");
  }
};
car.price = 50000;
car.start();`
};