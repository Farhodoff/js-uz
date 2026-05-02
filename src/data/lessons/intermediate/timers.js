export const timersLesson = {
  id: "timers",
  title: "Timers (setTimeout va setInterval)",
  level: "Intermediate",
  description: "JavaScriptda vaqt bilan ishlash: kodni kechiktirib ishga tushirish va takroriy amallar.",
  content: `
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
}, 3000); // vaqt millisekundlarda beriladi (1000ms = 1s)
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
clearTimeout(timerId); // Agar bu ishga tushsa, timer hech qachon bajarilmaydi
\`\`\`

## 4. AMALIYOT (Mashq)
Quyidagi kodni sinab ko'ring. U 5 soniya davomida har soniyada "Salom" deydi va to'xtaydi:
\`\`\`javascript
let i = 0;
const id = setInterval(() => {
  console.log("Salom " + (++i));
  if (i === 5) clearInterval(id);
}, 1000);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Vaqtni adashtirish:** \`1000\` deb yozsangiz bu 1 soniya, \`10\` deb yozsangiz bu juda tez (soniyaning yuzdan biri).
2.  **Qavslar bilan xato:** \`setTimeout(sayHello(), 1000)\` deb yozmang! Bunda funksiya darhol ishlaydi. To'g'ri usul: \`setTimeout(sayHello, 1000)\` yoki \`setTimeout(() => sayHello(), 1000)\`.
3.  **To'xtatishni unutish:** \`setInterval\`ni to'xtatmasangiz, u sayt yopilguncha xotirani band qilib ishlayveradi.

## 6. SAVOLLAR (12 ta)

### Nazariy savollar:
1. \`setTimeout\` va \`setInterval\` o'rtasidagi asosiy farq nima?
2. 1 soniya necha millisekundga teng?
3. Timerlarni to'xtatish uchun qaysi funksiyalar ishlatiladi?
4. \`setTimeout(() => {...}, 0)\` yozsak nima bo'ladi? U darhol ishlaydimi?
5. \`setInterval\` qaytaradigan qiymat (ID) nima uchun kerak?
6. Brauzer tabini yopmasak, timerlar qachon to'xtaydi?

### Amaliy savollar (Junior/Middle):
7. 2 soniyadan keyin konsolga "Xush kelibsiz" degan xabarni chiqaring.
8. Har 500 millisekundda konsolga tasodifiy son chiqaradigan dastur yozing.
9. 10 dan 0 gacha teskari sanaydigan (countdown) taymer yasang.
10. Tugma bosilganda timerni to'xtatadigan kod yozing.
11. \`setTimeout\` ichida boshqa bir \`setTimeout\` ishlatish (Recursive setTimeout) mumkinmi?
12. Bir vaqtning o'zida 3 ta har xil timerni qanday boshqarish mumkin?
`,
  practice: [
    {
      id: "timer-1",
      task: "3 soniyadan keyin konsolga 'Bajarildi' so'zini chiqaradigan kod yozing.",
      initialCode: "// Kodni shu yerda yozing\n",
      answer: "setTimeout(() => {\n  console.log('Bajarildi');\n}, 3000);"
    }
  ]
};
