export const timersLesson = {
  id: "timers",
  title: "Timers (setTimeout va setInterval)",
  level: "Intermediate",
  description: "JavaScriptda vaqt bilan ishlash: kodni kechiktirib ishga tushirish va takroriy amallar.",
  theory: `
# Timers – Bu nima va nima uchun kerak?

JavaScriptda ba'zi amallarni darhol emas, balki ma'lum bir vaqtdan keyin bajarish kerak bo'ladi. Masalan, 3 soniyadan keyin reklamani ko'rsatish yoki har 1 soniyada soatni yangilab turish. Buning uchun **Timers** ishlatiladi.

## 1. NEGA kerak?
Tasavvur qiling, siz saytda foydalanuvchiga "Muvaffaqiyatli saqlandi" degan xabarni ko'rsatdingiz va u 5 soniyadan keyin o'zi yo'qolishi kerak. Yoki sizda "Stopwatch" (sekundomer) bor, u har millisekundda o'zgarib turishi shart. Bularning hammasi timerlar yordamida qilinadi.

## 2. SODDALIK (Analogiya)
*   **setTimeout:** Bu budilnikka o'xshaydi. Siz uni 7:00 ga qo'yasiz, u bir marta jiringlaydi va to'xtaydi.
*   **setInterval:** Bu esa har soatda jiringlaydigan devor soatiga o'xshaydi. Siz uni to'xtatmaguningizcha, u har soatda "bong" urib turadi.

## 3. STRUKTURA

### A. setTimeout (Bir martalik kechikish)
\`\`\`javascript
setTimeout(() => {
  console.log("3 soniya o'tdi!");
}, 3000); // 3000ms = 3s
\`\`\`

### B. setInterval (Takroriy amal)
\`\`\`javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(\`Soni: \${count}\`);
  if (count === 5) {
    clearInterval(intervalId); // To'xtatish!
  }
}, 1000);
\`\`\`

### C. To'xtatish (clearTimeout va clearInterval)
Timerlarni to'xtatish uchun ularning \`ID\`sini saqlab qolish kerak:
\`\`\`javascript
const timerId = setTimeout(() => {...}, 5000);
clearTimeout(timerId);
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let i = 0;
const id = setInterval(() => {
  console.log("Salom " + (++i));
  if (i === 5) clearInterval(id);
}, 1000);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Vaqtni adashtirish:** \`1000\` = 1 soniya.
2.  **To'xtatishni unutish:** \`setInterval\`ni to'xtatmasangiz, u doimiy ishlayveradi.
3.  **Callbackni noto'g'ri chaqirish:** \`setTimeout(funksiya(), 1000)\` deb emas, \`setTimeout(funksiya, 1000)\` deb yozing.

## 6. SAVOLLAR (12 ta)
1. \`setTimeout\` nima?
2. \`setInterval\` nima?
3. 1 soniya necha millisekund?
4. Taymerni qanday to'xtatish mumkin?
5. \`clearInterval\` nima uchun kerak?
6. \`setTimeout(() => {}, 0)\` nima qiladi?
7. Taymer IDsi nima?
8. \`clearTimeout\` qachon ishlatiladi?
9. Recursive \`setTimeout\` nima?
10. Taymerlar JSning asosiy qismimi yoki Browser APInimi?
11. Bitta faylda bir nechta taymer ishlatish mumkinmi?
12. \`setInterval\`ning kamchiligi nimada?`,
  exercises: [
    {
      id: 1,
      title: "setTimeout mashqi",
      instruction: "2 soniyadan keyin 'Salom' degan yozuvni konsolga chiqaradigan kod yozing.",
      startingCode: "// Kodni shu yerda yozing\n",
      hint: "setTimeout(() => console.log('Salom'), 2000);",
      test: "if (code.includes('setTimeout') && code.includes('2000')) return null; return 'setTimeout noto\\'g\\'ri ishlatildi';"
    }
  ]
};
