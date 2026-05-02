export const consoleMethods = {
  id: "console-methods",
  title: "Console Metodlari (log, table, error, warn)",
  level: "Beginner",
  description: "Dasturni tekshirish (debugging) uchun faqat console.log kifoya qilmaydi. Boshqa foydali metodlarni o'rganamiz.",
  content: `
# Console Metodlari – Bu nima va nima uchun kerak?

Dasturchi sifatida ish vaqtingizning 50% qismi kod yozish bilan o'tsa, qolgan 50% qismi xatolarni qidirish (debugging) bilan o'tadi. **Console** obyekti bizga kodimiz ichida nima bo'layotganini ko'rishga yordam beradi.

## 1. NEGA kerak?
Faqat \`console.log\` ishlatish ba'zan tartibsizlikka olib keladi. Agar sizda katta massiv yoki obekt bo'lsa, uni oddiy \`log\` bilan ko'rish qiyin. Yoki xatolarni alohida rangda (qizil) ko'rsatish kerak bo'lsa, maxsus metodlar kerak bo'ladi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, sizda asboblar qutisi bor.
*   \`console.log\`: Bu oddiy chiroq (fonar), hamma joyni yoritadi.
*   \`console.table\`: Bu lupa (mikroskop), hamma narsani jadval ichida tartibli ko'rsatadi.
*   \`console.error\`: Bu "qizil signal", xavf haqida ogohlantiradi.
*   \`console.warn\`: Bu "sariq signal", ehtiyot bo'lishni aytadi.

## 3. STRUKTURA

### A. console.log() – Oddiy xabar
Hamma biladigan metod. Istalgan turdagi ma'lumotni chiqaradi.

### B. console.table() – Jadval ko'rinishi
Obektlar yoki massivlarni chiroyli jadval qilib chiqaradi:
\`\`\`javascript
const users = [
  { ism: "Ali", yosh: 25 },
  { ism: "Vali", yosh: 20 }
];
console.table(users);
\`\`\`

### C. console.error() va console.warn()
Xato va ogohlantirishlar uchun:
\`\`\`javascript
console.error("Vay! Xato yuz berdi."); // Qizil rangda chiqadi
console.warn("Diqqat! Bu funksiya tez orada o'chiriladi."); // Sariq rangda chiqadi
\`\`\`

### D. console.time() va console.timeEnd()
Kodning qancha vaqt davomida ishlaganini o'lchash uchun:
\`\`\`javascript
console.time("Loop-vaqti");
for(let i=0; i<1000000; i++) {}
console.timeEnd("Loop-vaqti"); // Loop-vaqti: 2.34ms
\`\`\`

## 4. AMALIYOT (Mashq)
Quyidagi obektni jadval ko'rinishida chiqarib ko'ring:
\`\`\`javascript
const meva = { nomi: "Olma", narxi: 12000, rangi: "Qizil" };
console.table(meva);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Productionda qoldirish:** Saytni foydalanuvchiga topshirayotganda \`console.log\`larni o'chirib tashlash kerak (yoki maxsus kutubxona ishlatish kerak).
2.  **Sintaksis:** \`console\` kichik harf bilan yoziladi. \`Console.log\` ishlamaydi.

## 6. SAVOLLAR (12 ta)

### Nazariy savollar:
1. \`console\` obyekti brauzerning bir qismimi yoki JS tiliningmi?
2. Massivlarni chiroyli ko'rsatish uchun qaysi metod ishlatiladi?
3. \`console.error\` va \`console.log\` o'rtasidagi asosiy farq nima?
4. Kodning tezligini qanday o'lchash mumkin?
5. \`console.clear()\` nima ish bajaradi?
6. \`console.group()\` metodi nima uchun kerak?

### Amaliy savollar (Junior/Middle):
7. Bir vaqtning o'zida 3 ta o'zgaruvchini bitta \`console.log\` ichida chiqaring.
8. Matnni CSS bilan bezab chiqaring (Ha, JS konsolida ham CSS ishlatsa bo'ladi! \`console.log('%c Salom', 'color: red')\`).
9. Xatolik yuz berganda foydalanuvchiga \`console.error\` orqali xabar bering.
10. Tasodifiy sonli massiv yarating va uni \`console.table\`da ko'ring.
11. 1 million marta takrorlanadigan siklning ishlash vaqtini o'lchang.
12. O'zingiz haqingizda obekt yarating va barcha ma'lumotlarni konsolga guruhlab (\`group\`) chiqaring.
`,
  practice: [
    {
      id: "console-1",
      task: "Quyidagi massivni jadval ko'rinishida konsolga chiqaring: ['BMW', 'Tesla', 'Audi']",
      initialCode: "const cars = ['BMW', 'Tesla', 'Audi'];\n// Kodni shu yerda yozing",
      answer: "const cars = ['BMW', 'Tesla', 'Audi'];\nconsole.table(cars);"
    }
  ]
};
