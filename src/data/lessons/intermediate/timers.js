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
  ],
  quizzes: [
    {
      id: 1,
      question: "`setTimeout` va `setInterval` funksiyalari o'rtasidagi asosiy farq nimada?",
      options: [
        "`setTimeout` kodni ma'lum vaqtdan keyin faqat bir marta ishga tushiradi, `setInterval` esa ko'rsatilgan vaqt oralig'ida to'xtovsiz takrorlab turadi",
        "`setInterval` faqat soniyalar bilan, `setTimeout` esa millisekundlar bilan ishlaydi",
        "`setTimeout` asinxron, `setInterval` esa sinxron ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "`setTimeout` taymeri o'rnatilgan vaqt o'tgandan keyin berilgan callback funksiyasini faqat 1 marta bajaradi. `setInterval` esa har safar belgilangan vaqt oralig'i (delay) o'tganda funksiyani takroran chaqiraveradi."
    },
    {
      id: 2,
      question: "Quyidagi kod e'lon qilingandan so'ng, konsolga xabarlar qaysi tartibda chiqadi?\n```javascript\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
      options: [
        "A, B, C",
        "A, C, B",
        "B, A, C",
        "C, A, B"
      ],
      correctAnswer: 1,
      explanation: "Garchi `setTimeout` kechikishi `0` millisekund etib belgilangan bo'lsa ham, u asinxron vazifa (Macrotask) bo'lgani sababli Macrotask navbatiga (Callback Queue) joylashtiriladi va faqat barcha sinxron kodlar (Call Stack) to'liq bajarilib bo'lingandan keyingina ishlaydi. Shuning uchun tartib: A -> C -> B bo'ladi."
    },
    {
      id: 3,
      question: "Ishga tushirilgan `setInterval` taymerini butunlay to'xtatish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`stopInterval()`",
        "`clearInterval()`",
        "`clearTimeout()`",
        "`deleteInterval()`"
      ],
      correctAnswer: 1,
      explanation: "`setInterval` chaqirilganda qaytariladigan maxsus ID raqamni `clearInterval(timerID)` metodiga uzatish orqali takroriy taymer to'xtatiladi."
    },
    {
      id: 4,
      question: "JavaScript-da timer funksiyalariga (masalan, `setTimeout`) beriladigan vaqt birligi nima?",
      options: [
        "Soniya (Seconds)",
        "Millisekund (Milliseconds) — ya'ni 1 soniya 1000 millisekundga teng",
        "Mikrosekund (Microseconds)",
        "Daqiqa (Minutes)"
      ],
      correctAnswer: 1,
      explanation: "JavaScript taymerlarida vaqt o'lchovi millisekundlarda beriladi. Masalan, 5 soniyani ko'rsatish uchun 5000 qiymati yoziladi."
    },
    {
      id: 5,
      question: "Agar biz har safar oldingi tsikl to'liq bajarilib bo'lganidan keyingina yangi kutish vaqtini aniq hisoblab boshlamoqchi bo'lsak (ya'ni, takroriy amallar bir-birini bosib ketmasligi uchun), qaysi yondashuv tavsiya etiladi?",
      options: [
        "Juda katta kechikish vaqti bilan `setInterval` ishlatish",
        "Rekursiv `setTimeout` (ya'ni funksiya bajarilib bo'lgach, o'z ichida yangi `setTimeout` chaqirishi)",
        "`while` siklidan foydalanish",
        "Hech qanday taymersiz to'g'ridan-to'g'ri chaqirish"
      ],
      correctAnswer: 1,
      explanation: "Rekursiv `setTimeout` yordamida funksiya ichida navbatdagi setTimeout e'lon qilinadi. Bu usul oldingi kodning ishlash muddati qancha cho'zilishidan qat'i nazar, navbatdagi chaqiruvgacha bo'lgan oraliq aniq bo'lishini kafolatlaydi, `setInterval`da esa asinxron amallar kechiksa interval bir-birini bosib ketishi mumkin."
    }
  ]
};
