export const destructuring = {
  id: "m1",
  title: "Destructuring",
  theory: `## Destructuring
Destructuring - obyekt yoki massiv ichidan kerakli qiymatlarni qisqa yozuv bilan ajratib olish usuli. Bu usul kodni toza qiladi va kerakli ma'lumotni birdan o'qishga yordam beradi. Loyiha kodida forma ma'lumotlari, API javoblari yoki props bilan ishlaganda juda foydali.

## Obyekt destructuring
\`\`\`javascript
const user = { ism: "Ali", yosh: 25, shahar: "Toshkent" };
const { ism, yosh } = user;
console.log(ism, yosh);
\`\`\`

## Massiv destructuring
\`\`\`javascript
const ranglar = ["qizil", "yashil", "ko'k"];
const [birinchi, ikkinchi] = ranglar;
console.log(birinchi, ikkinchi);
\`\`\`

## Default qiymat
\`\`\`javascript
const { ism = "Noma'lum" } = {};
console.log(ism);
\`\`\`

## Qachon ishlatish kerak?
- Funksiyaga kelgan obyektni qisqa o'qish uchun.
- API dan kelgan ma'lumotdan faqat kerakli qismini olish uchun.
- Massivdan birinchi yoki ikkinchi elementni ajratish uchun.

## Quiz
1. Destructuring nima?
2. Obyekt va massiv destructuring farqi nima?
3. Default qiymat qachon kerak bo'ladi?`,
  task: `// Quyidagi ob'ektdan destructuring yordamida 'nomi' va 'narxi' ni ajratib chiqaring.

const mahsulot = { nomi: 'Telefon', narxi: 5000000, brend: 'Samsung' };

// destructuring qiling
const { } = mahsulot;
console.log(nomi, narxi);`,
  hint: `const mahsulot = { nomi: 'Telefon', narxi: 5000000, brend: 'Samsung' };
const { nomi, narxi } = mahsulot;
console.log(nomi, narxi);`
};
