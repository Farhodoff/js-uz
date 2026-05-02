export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish)",
  level: "Intermediate",
  description: "Obyekt va massiv ichidagi ma'lumotlarni bitta qatorda o'zgaruvchilarga ajratib olish.",
  theory: `
# Destructuring – Bu nima va nima uchun kerak?

**Destructuring** — bu obyekt yoki massiv ichidagi qiymatlarni bittalab olish o'rniga, ularni "bir urinishda" alohida o'zgaruvchilarga chiqarib olish usulidir.

## 1. NEGA kerak?
Tasavvur qiling, sizda foydalanuvchi obyekti bor va sizga uning ismi, yoshi va shahri kerak.
**Eski usul:**
\`\`\`javascript
const name = user.name;
const age = user.age;
const city = user.city;
\`\`\`
Bu juda uzun va zerikarli. Destructuring bilan bu 1 qatorlik kod:
\`\`\`javascript
const { name, age, city } = user;
\`\`\`

## 2. SODDALIK (Analogiya)
Buni sovg'a qutisi deb tasavvur qiling. Ichida ayiqcha, koptok va shokolad bor.
- Eski usulda: Qutini ochib, ayiqchani olasiz. Keyin yana qutiga qarab, koptokni olasiz...
- Destructuring usulida: Qutini bir marta ochib, hamma narsani bir vaqtda qo'lingizga (o'zgaruvchilarga) olasiz.

## 3. STRUKTURA

### A. Obyekt Destructuring
Obyektlarda kalit (key) nomi muhim:
\`\`\`javascript
const car = { model: "BYD", year: 2024 };
const { model, year } = car;
// Nomini o'zgartirish:
const { model: m } = car; // m = "BYD"
\`\`\`

### B. Massiv Destructuring
Massivlarda tartib (index) muhim:
\`\`\`javascript
const ranglar = ["qizil", "yashil", "ko'k"];
const [r1, r2] = ranglar; // r1="qizil", r2="yashil"
// Keraksizlarini tashlab ketish:
const [, , uchinchi] = ranglar; // uchinchi="ko'k"
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const person = { ism: "Farhod", yosh: 25 };
const { ism, yosh, kasb = "Dasturchi" } = person;
console.log(ism, kasb); // Farhod Dasturchi
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Noto'g'ri qavslar:** Obyekt uchun \`{ }\`, massiv uchun \`[ ]\` ishlatishni unutmang.
2.  **Null/Undefined:** Agar o'zgaruvchi \`null\` bo'lsa, uni destructure qilib bo'lmaydi (Xato beradi).

## 6. SAVOLLAR (12 ta)
1. Destructuring nima?
2. Obyekt destructuringda kalit nomlari bir xil bo'lishi shartmi?
3. O'zgaruvchi nomini qanday o'zgartirsa bo'ladi?
4. Massiv destructuringda elementlarni qanday tashlab ketsa bo'ladi?
5. Default qiymat berish nima uchun kerak?
6. Funksiya parametrlarida destructuring ishlatish mumkinmi?
7. Ikki o'zgaruvchi qiymatini uchinchi o'zgaruvchisiz qanday almashtirish mumkin?
8. Nested (ichma-ich) obyektlarni destructure qilish misolini keltiring.
9. \`const { a, b } = null\` natijasi nima bo'ladi?
10. Massivdan qolgan hamma elementlarni rest (\`...\`) orqali qanday olish mumkin?
11. Obyekt destructuringda tartib muhimmi?
12. Massiv destructuringda tartib muhimmi?`,
  exercises: [
    {
      id: 1,
      title: "Obyekt mashqi",
      instruction: "Obyektdan 'name' va 'age'ni ajratib oling.",
      startingCode: "const user = { name: 'Ali', age: 20 };\n// Bu yerga yozing\n",
      hint: "const { name, age } = user;",
      test: "if (code.includes('{ name, age }')) return null; return 'Destructuring ishlatilmadi';"
    }
  ]
};
