export const consoleMethods = {
  id: "console-methods",
  title: "Console Metodlari (log, table, error, warn)",
  level: "Beginner",
  description: "Dasturni tekshirish (debugging) uchun faqat console.log kifoya qilmaydi. Boshqa foydali metodlarni o'rganamiz.",
  theory: `
# Console Metodlari – Bu nima va nima uchun kerak?

Dasturchi sifatida ish vaqtingizning 50% qismi kod yozish bilan o'tsa, qolgan 50% qismi xatolarni qidirish (debugging) bilan o'tadi. **Console** obyekti bizga kodimiz ichida nima bo'layotganini ko'rishga yordam beradi.

## 1. NEGA kerak?
Faqat \`console.log\` ishlatish ba'zan tartibsizlikka olib keladi. Agar sizda katta massiv yoki obekt bo'lsa, uni oddiy \`log\` bilan ko'rish qiyin.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, sizda asboblar qutisi bor.
*   \`console.log\`: Oddiy chiroq (fonar).
*   \`console.table\`: Lupa, jadval qilib ko'rsatadi.
*   \`console.error\`: Qizil signal, xavf!
*   \`console.warn\`: Sariq signal, ehtiyot bo'ling!

## 3. STRUKTURA

### A. console.table()
Obektlar yoki massivlarni jadval qilib chiqaradi:
\`\`\`javascript
const users = [{ ism: "Ali", yosh: 25 }];
console.table(users);
\`\`\`

### B. console.error() va console.warn()
\`\`\`javascript
console.error("Xato!");
console.warn("Ogohlantirish!");
\`\`\`

### C. console.time() va console.timeEnd()
Vaqtni o'lchash:
\`\`\`javascript
console.time("T1");
// ...kod
console.timeEnd("T1");
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const meva = { nomi: "Olma", narxi: 12000 };
console.table(meva);
\`\`\`

## 5. XATOLAR (Common mistakes)
1. \`Console.log\` (katta harf bilan) deb yozish.
2. Production kodda konsollarni qoldirish.

## 6. SAVOLLAR (12 ta)
1. \`console.table\` nima uchun kerak?
2. \`console.error\` qanday rangda chiqadi?
3. Vaqtni o'lchash uchun qaysi metodlar ishlatiladi?
4. \`console.clear()\` nima qiladi?
5. Bir nechta qiymatni bitta logda chiqarsa bo'ladimi?
6. \`console.group()\` nima?
7. \`console.warn\` qachon ishlatiladi?
8. \`console.log\` JS tilidami yoki brauzerda?
9. Konsolga CSS bersa bo'ladimi?
10. \`console.count()\` nima vazifani bajaradi?
11. Obektni konsolda qanday qulay ko'rish mumkin?
12. Debugging nima?`,
  exercises: [
    {
      id: 1,
      title: "Table mashqi",
      instruction: "['BMW', 'Audi'] massivini jadval ko'rinishida chiqaring.",
      startingCode: "const cars = ['BMW', 'Audi'];\n// Kodni yozing",
      hint: "console.table(cars);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    }
  ]
};
