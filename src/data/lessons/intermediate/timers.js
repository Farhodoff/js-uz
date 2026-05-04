export const timersLesson = {
  id: "timers",
  title: "Vaqt funksiyalari (Timers)",
  level: "O'rta daraja",
  description: "JavaScriptda vaqt bilan ishlash: kodni kechiktirib ishga tushirish va takroriy amallar.",
  theory: `
# Timers — Bu nima va nima uchun kerak?

JavaScriptda ba'zi amallarni darhol emas, balki ma'lum bir vaqtdan keyin bajarish kerak bo'ladi. Masalan, 3 soniyadan keyin reklamani ko'rsatish yoki har 1 soniyada soatni yangilab turish.

## 1. NEGA kerak?
Tasavvur qiling, sizda "Stopwatch" (sekundomer) bor, u har millisekundda o'zgarib turishi shart. Yoki foydalanuvchiga xabar ko'rsatdingiz va u 5 soniyadan keyin yo'qolishi kerak. Bular timerlar yordamida qilinadi.

## 2. SODDALIK (Analogiya)
*   **setTimeout:** Bu budilnikka o'xshaydi. Siz uni 7:00 ga qo'yasiz, u bir marta jiringlaydi va to'xtaydi.
*   **setInterval:** Bu esa har soatda jiringlaydigan devor soatiga o'xshaydi. Siz uni to'xtatmaguningizcha, u takrorlanaveradi.

## 3. STRUKTURA

### A. setTimeout (Bir marta)
\`\`\`javascript
setTimeout(() => {
  console.log("3 soniya o'tdi!");
}, 3000); // 3000ms = 3s
\`\`\`

### B. setInterval (Takroriy)
\`\`\`javascript
const id = setInterval(() => {
  console.log("Har 1 soniyada...");
}, 1000);
\`\`\`

### C. To'xtatish (clearTimeout / clearInterval)
\`\`\`javascript
clearInterval(id); // Takrorlanishni to'xtatadi
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1.  **Vaqt o'lchovi:** Vaqt millisekundda beriladi (1000 = 1 soniya).
2.  **To'xtatishni unutish:** \`setInterval\`ni to'xtatmasangiz, u sayt yopilguncha ishlayveradi (performance uchun yomon).

## 6. SAVOLLAR (12 ta)
1. \`setTimeout\` va \`setInterval\` farqi nima?
2. 1 soniya necha millisekund?
3. Taymerni qanday to'xtatish mumkin?
4. \`clearTimeout\` nima uchun kerak?
5. Taymer ID-si nima?
6. \`setTimeout(() => {}, 0)\` nima qiladi?
7. Taymerlar brauzerda qanday navbatga qo'yiladi?
8. \`setInterval\` ichida \`clearInterval\` ishlatsa bo'ladimi?
9. Bir vaqtda nechta taymer ishlatish mumkin?
10. Taymer vaqtini o'zgaruvchida saqlash mumkinmi?
11. Rekursiv \`setTimeout\` nima?
12. \`requestAnimationFrame\` taymerlardan nimasi bilan farq qiladi?`,
  exercises: [
    {
      id: 1,
      title: "Kechiktirish",
      instruction: "2 soniyadan keyin 'Salom' degan yozuvni konsolga chiqaradigan kod yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Salom'), 2000);",
      test: "if (code.includes('setTimeout') && code.includes('2000')) return null; return 'setTimeout noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 2,
      title: "Takrorlash",
      instruction: "Har 500 millisekundda 'Takror' so'zini chiqaradigan taymer yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setInterval(() => console.log('Takror'), 500);",
      test: "if (code.includes('setInterval') && code.includes('500')) return null; return 'setInterval noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 3,
      title: "To'xtatish",
      instruction: "'timerId' o'zgaruvchisida saqlangan intervalni to'xtating.",
      startingCode: "const timerId = 123;\n// Bu yerga yozing\n",
      hint: "clearInterval(timerId);",
      test: "if (code.includes('clearInterval(timerId)')) return null; return 'clearInterval ishlatilmadi';"
    },
    {
      id: 4,
      title: "Sanoq",
      instruction: "3 soniyadan keyin 'Tugadi' so'zini chiqaruvchi taymer yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "setTimeout(() => console.log('Tugadi'), 3000);",
      test: "if (code.includes('setTimeout') && code.includes('3000')) return null; return '3000ms kutish kerak';"
    }
  ]
};
