export const loops = {
  id: "loops",
  title: "Sikllar (Loops): for, while va boshqalar",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga konsolga 100 marta "Salom" deb yozish kerak. Buni qo'lda yozish juda uzoq vaqt oladi. Sikllar yordamida buni 3 qator kod bilan hal qilish mumkin.

## 2. SODDALIK (Analogiya)
Buni **stadionda yugurishga** o'xshatish mumkin:
- **Start:** Siz start chizig'idasiz (\`let i = 0\`).
- **Shart:** 10 ta aylana yugurishingiz kerak (\`i < 10\`).
- **Qadam:** Har bir aylana oxirida bittaga oshirasiz (\`i++\`).

## 3. STRUKTURA

### A. for sikli (Eng ko'p ishlatiladigani)
Takrorlanish soni aniq bo'lganda:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i + "-aylana");
}
\`\`\`

### B. while va do...while
\`while\` shart to'g'ri bo'lguncha ishlaydi. \`do...while\` esa kamida bir marta ishlaydi.
\`\`\`javascript
let count = 1;
while (count <= 3) {
  console.log(count);
  count++;
}
\`\`\`

### C. for...of va for...in
- **for...of:** Massiv **qiymatlarini** aylanish uchun.
- **for...in:** Obyekt **kalitlarini** (yoki massiv indekslarini) aylanish uchun.
\`\`\`javascript
const ranglar = ["Qizil", "Ko'k"];
for (let rang of ranglar) {
  console.log(rang); // "Qizil", "Ko'k"
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Cheksiz sikl (Infinite Loop):** Agar shartni doim \`true\` qilib qo'ysangiz yoki \`i++\`ni unutsangiz, brauzer qotib qoladi!
2. **Indeks xatosi:** Massivlar 0 dan boshlanadi. Agar 1 dan boshlasangiz, birinchi elementni o'tkazib yuborasiz.

## 6. SAVOLLAR VA JAVOBLAR
**1. Sikl (Loop) nima?**
Bir xil kodni ma'lum bir shart asosida qayta-qayta bajarish usuli.

**2. JavaScriptda qaysi sikl turlari bor?**
for, while, do...while, for...of, for...in.

**3. for siklining 3 ta qismi nima?**
Boshlanish (initialization), Shart (condition) va Qadam (increment).

**4. while va do...while farqi nimada?**
\`while\` avval shartni tekshiradi, \`do...while\` avval kodni bajarib, keyin shartni tekshiradi.

**5. for...of nima uchun ishlatiladi?**
Massiv (yoki boshqa iterable) ichidagi qiymatlarni to'g'ridan-to'g'ri olish uchun.

**6. Cheksiz sikl qanday hosil bo'ladi?**
Shart hech qachon \`false\` bo'lmaganda (masalan, \`while(true)\`).

**7. i++ yozishni unutsak nima bo'ladi?**
Sikl sanoq o'zgarmagani uchun cheksiz davom etadi.

**8. for siklida let o'rniga const ishlatsa bo'ladimi?**
Yo'q, chunki \`i\` ning qiymati har bir qadamda o'zgarishi shart.

**9. continue nima vazifani bajaradi?**
Siklning joriy qadamini tashlab o'tib, keyingisiga o'tadi.

**10. break nima vazifani bajaradi?**
Siklni darhol to'xtatib, undan chiqib ketadi.

**11. Obyekt kalitlarini aylanish uchun qaysi sikl ishlatiladi?**
\`for...in\` sikli.

**12. 10 dan 1 gacha teskari sanaydigan sikl qanday yoziladi?**
\`for (let i = 10; i >= 1; i--)\`
`,
  exercises: [
    {
      id: 1,
      title: "Takrorlash",
      instruction: "for sikli yordamida 1 dan 5 gacha bo'lgan sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      test: "if (logs.length >= 5 && logs.includes('1') && logs.includes('5')) return null; return '1 dan 5 gacha sonlar chiqishi kerak!';"
    },
    {
      id: 2,
      title: "While sikli",
      instruction: "while sikli yordamida 'count' 3 bo'lguncha uning qiymatini chiqaring.",
      startingCode: "let count = 1;\n// Bu yerga yozing\n",
      hint: "while (count <= 3) { console.log(count); count++; }",
      test: "if (logs.includes('1') && logs.includes('3')) return null; return 'While siklini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "Yig'indi",
      instruction: "1 dan 10 gacha sonlar yig'indisini hisoblang va konsolga chiqaring.",
      startingCode: "let sum = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 10; i++) { sum += i; } console.log(sum);",
      test: "if (logs.includes('55')) return null; return 'Yig\\'indi 55 chiqishi kerak!';"
    },
    {
      id: 4,
      title: "Juft sonlar",
      instruction: "for sikli yordamida 1 dan 10 gacha bo'lgan juft sonlarni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 2; i <= 10; i += 2) { console.log(i); }",
      test: "if (logs.includes('2') && logs.includes('10') && !logs.includes('3')) return null; return 'Faqat juft sonlarni chiqaring';"
    },
    {
      id: 5,
      title: "Teskari tartib",
      instruction: "for sikli yordamida 5 dan 1 gacha teskari tartibda sonlarni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 5; i >= 1; i--) { console.log(i); }",
      test: "if (logs.indexOf('5') < logs.indexOf('1') && logs.includes('5') && logs.includes('1')) return null; return '5 dan 1 gacha kamayib borishini ta\\'minlang';"
    },
    {
      id: 6,
      title: "Massiv elementlarini aylanish",
      instruction: "for...of sikli yordamida 'fruits' massivi elementlarini ketma-ket konsolga chiqaring.",
      startingCode: "const fruits = ['Olma', 'Banan', 'Nok'];\n// Bu yerga yozing\n",
      hint: "for (const fruit of fruits) { console.log(fruit); }",
      test: "if (logs.includes('Olma') && logs.includes('Banan') && logs.includes('Nok')) return null; return 'for...of yordamida mevalarni chiqaring';"
    },
    {
      id: 7,
      title: "Obyekt kalitlarini aylanish",
      instruction: "for...in sikli yordamida 'user' obyektining kalitlarini konsolga chiqaring.",
      startingCode: "const user = { name: 'Ali', age: 20 };\n// Bu yerga yozing\n",
      hint: "for (const key in user) { console.log(key); }",
      test: "if (logs.includes('name') && logs.includes('age')) return null; return 'for...in yordamida kalitlarni chiqaring';"
    },
    {
      id: 8,
      title: "Break operatori",
      instruction: "for sikli yordamida 1 dan 10 gacha sonlarni aylaning, lekin son 5 ga teng bo'lganda break orqali siklni to'xtating va sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 10; i++) { if (i === 5) break; console.log(i); }",
      test: "if (logs.includes('4') && !logs.includes('5')) return null; return '5 ga yetganda break ishlatib siklni to\\'xtating';"
    },
    {
      id: 9,
      title: "Continue operatori",
      instruction: "for sikli yordamida 1 dan 5 gacha sonlarni aylaning, lekin son 3 ga teng bo'lganda continue orqali uni o'tkazib yuboring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }",
      test: "if (logs.includes('2') && logs.includes('4') && !logs.includes('3')) return null; return '3 qiymatini continue yordamida o\\'tkazib yuboring';"
    },
    {
      id: 10,
      title: "Do...While sikli",
      instruction: "do...while sikli yordamida 'x' o'zgaruvchisi 1 dan 3 gacha bo'lgan sonlarni konsolga chiqaring.",
      startingCode: "let x = 1;\n// Bu yerga yozing\n",
      hint: "do { console.log(x); x++; } while (x <= 3);",
      test: "if (logs.includes('1') && logs.includes('3') && code.includes('do') && code.includes('while')) return null; return 'do...while siklini to\\'g\\'ri yozing';"
    },
    {
      id: 11,
      title: "Ko'paytirish hisoblash",
      instruction: "Loop yordamida 5 ning kvadratini (5 ta 5 ni qo'shish orqali) hisoblang va natijani konsolga chiqaring.",
      startingCode: "let result = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 0; i < 5; i++) { result += 5; } console.log(result);",
      test: "if (logs.includes('25')) return null; return 'Natija 25 chiqishi kerak';"
    },
    {
      id: 12,
      title: "Massiv sonlarini yig'ish",
      instruction: "for...of yordamida 'numbers' massividagi sonlar yig'indisini hisoblang va 'total' o'zgaruvchisiga saqlang.",
      startingCode: "const numbers = [10, 20, 30];\nlet total = 0;\n// Bu yerga yozing\n",
      hint: "for (const num of numbers) { total += num; }",
      test: "if (code.includes('for') && code.includes('total') && code.includes('of')) return null; return 'for...of yordamida numbers yig\\'indisini total ga qo\\'shing';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`while` va `do...while` sikllari (loops) o'rtasidagi eng asosiy amaliy farq nimada?",
      options: [
        "`while` sikli kamida bir marta ishlaydi, `do...while` esa shart noto'g'ri bo'lsa umuman ishlamaydi",
        "`do...while` sikli shart noto'g'ri bo'lsa ham kamida bir marta ishlaydi; `while` esa birinchi bo'lib shartni tekshiradi va u bajarilmaguncha kodni ishga tushirmaydi",
        "Ular o'rtasida hech qanday farq yo'q",
        "`while` faqat sonli shartlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`do...while` siklida avval `do` blokidagi kod bajariladi, keyin shart tekshiriladi. Shuning uchun shart noto'g'ri bo'lsa ham kod kamida 1 marta ishlaydi. `while`-da esa shart boshida tekshiriladi."
    },
    {
      id: 2,
      question: "Quyidagi `for` siklida `const` ishlatilishi qanday natijaga olib kelami?\n```javascript\nfor (const i = 0; i < 5; i++) {\n  console.log(i);\n}\n```",
      options: [
        "0 dan 4 gacha sonlar ekranga chiqadi",
        "`TypeError: Assignment to constant variable` xatosi yuz beradi (chunki `i++` har bir aylanishda `i` ning qiymatini o'zgartirishga harakat qiladi, const esa bunga yo'l qo'ymaydi)",
        "Tsikl cheksiz davom etadi",
        "Faqat 0 soni chiqadi va tsikl tugaydi"
      ],
      correctAnswer: 1,
      explanation: "`for` siklida boshqaruvchi o'zgaruvchi har bir qadamda yangilanadi (qiymati qayta yuklanadi). `const` bilan yaratilgan o'zgaruvchilarni qayta o'zgartirib bo'lmagani sababli, `i++` bajarilishida xatolik yuz beradi."
    },
    {
      id: 3,
      question: "Obyektning kalitlarini (keys) yoki xususiyatlarini (properties) ketma-ket aylanib chiqish (iterate) uchun qaysi sikldan foydalanish eng to'g'ri?",
      options: [
        "`for...of`",
        "`for...in` (chunki u obyekt xususiyatlarini aylanish uchun maxsus yozilgan)",
        "`while`",
        "`do...while`"
      ],
      correctAnswer: 1,
      explanation: "`for...in` sikli obyektlarning kalitlarini aylanib chiqish uchun maxsus ishlab chiqilgan. `for...of` esa massivlar va iterable ma'lumotlar qiymatlari uchun ishlatiladi."
    },
    {
      id: 4,
      question: "Massiv (Array) qiymatlarini indekslar bilan ishlamasdan, to'g'ridan-to'g'ri elementlarini o'qib chiqish uchun qaysi sikl qulay hisoblanadi?",
      options: [
        "`for...in`",
        "`for...of` (massiv elementlarini to'g'ridan-to'g'ri o'qish uchun)",
        "`while`",
        "`do...while`"
      ],
      correctAnswer: 1,
      explanation: "`for...of` sikli massiv elementlari (indeksi emas, qiymatlari) bo'ylab to'g'ridan-to'g'ri aylanish imkonini beradi."
    },
    {
      id: 5,
      question: "Quyidagi kod ishga tushganda brauzer yoki kompyuter nima uchun qotib qoladi (cheksiz sikl hosil bo'ladi)?\n```javascript\nlet i = 0;\nwhile (i < 5) {\n  console.log(i);\n}\n```",
      options: [
        "Chunki console.log vaqtida ko'p xotira sarflaydi",
        "Chunki `i` o'zgaruvchisining qiymatini oshiruvchi qadam (`i++` yoki shunga o'xshash amal) yozilmagan, natijada shart (`i < 5`) doimo true bo'lib qolaveradi",
        "Chunki `i` global o'zgaruvchi",
        "Chunki `while` siklida qavslar noto'g'ri yozilgan"
      ],
      correctAnswer: 1,
      explanation: "Sikl to'xtashi uchun undagi shart qachondir false bo'lishi kerak. `i` o'zgarmasdan 0 ligicha qolganligi sababli `i < 5` (0 < 5) har doim `true` bo'lib sikl to'xtamaydi."
    },
    {
      id: 6,
      question: "Sikllarda ishlatiladigan `continue` kalit so'zi nima vazifani bajaradi?",
      options: [
        "Siklni butunlay to'xtatadi va undan chiqadi",
        "Siklning joriy qadamini (iteratsiyasini) tashlab o'tib, keyingi qadamiga o'tadi",
        "Dasturni butunlay to'xtatadi",
        "Siklni boshidan qayta boshlaydi"
      ],
      correctAnswer: 1,
      explanation: "`continue` operatori joriy iteratsiyani to'xtatadi va siklning shart/qadam qismiga o'tadi, ya'ni qolgan kod bajarilmaydi."
    },
    {
      id: 7,
      question: "Sikllarda ishlatiladigan `break` kalit so'zi nima vazifani bajaradi?",
      options: [
        "Siklning joriy qadamini tashlab o'tadi",
        "Siklni darhol butunlay to'xtatadi va undan keyingi kod qatoriga o'tadi",
        "Kompyuterni o'chiradi",
        "Sikldagi o'zgaruvchini nollashtiradi"
      ],
      correctAnswer: 1,
      explanation: "`break` operatori joriy siklni o'z vaqtidan oldin butunlay to'xtatib, uning blokidan chiqib ketish uchun xizmat qiladi."
    },
    {
      id: 8,
      question: "`for` va `while` sikllari o'rtasidagi asosiy farq nima?",
      options: [
        "`for` sikli faqat brauzerda ishlaydi",
        "`for` sikli odatda takrorlanishlar soni oldindan aniq bo'lganda ishlatiladi; `while` esa ma'lum bir shart to'g'ri bo'lib turgunga qadar takrorlashda qo'llaniladi",
        "`while` sikli tezroq ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "`for` siklida counter yaratish, shart va qadam bitta qatorda yoziladi. `while` esa ko'proq shartga bog'liq ravishda (masalan, foydalanuvchi ma'lumot kiritguncha) ishlatiladi."
    },
    {
      id: 9,
      question: "Quyidagi kodda `console.log(i)` sikldan tashqarida chaqirilganda nima sodir bo'ladi?\n```javascript\nfor (let i = 0; i < 5; i++) {\n  // kod\n}\nconsole.log(i);\n```",
      options: [
        "`5` chiqadi",
        "`ReferenceError: i is not defined` xatosi chiqadi (chunki let block scopega ega bo'lib, faqat for bloki ichida ko'rinadi)",
        "`undefined` chiqadi",
        "`0` chiqadi"
      ],
      correctAnswer: 1,
      explanation: "`let` block scope bo'lganligi uchun u faqat jingalak qavslar ichida (for bloki) ishlaydi. Tashqarida `i` o'zgaruvchisi mavjud bo'lmaydi."
    },
    {
      id: 10,
      question: "Quyidagi kodda `console.log(i)` sikldan tashqarida chaqirilganda nima sodir bo'ladi?\n```javascript\nfor (var i = 0; i < 5; i++) {\n  // kod\n}\nconsole.log(i);\n```",
      options: [
        "`ReferenceError` xatosi chiqadi",
        "`5` chiqadi (chunki var block scopega rioya qilmaydi va global/funksiya scopeida qoladi)",
        "`undefined` chiqadi",
        "`4` chiqadi"
      ],
      correctAnswer: 1,
      explanation: "`var` block scope qoidasiga bo'ysunmaganligi uchun, u tsikldan tashqarida ham yashab qoladi. Tsikl `i = 5` bo'lganda to'xtaydi, shuning uchun konsolga `5` chiqadi."
    },
    {
      id: 11,
      question: "Quyidagi sikldan nima natija qaytadi?\n```javascript\nfor (let i = 0; i < 3; i--) {\n  console.log(i);\n}\n```",
      options: [
        "Hech narsa chop etilmaydi",
        "Cheksiz sikl yuzaga keladi (chunki i har safar kamayib boradi va i < 3 doim true bo'lib qoladi)",
        "0, 1, 2 chop etiladi",
        "ReferenceError beradi"
      ],
      correctAnswer: 1,
      explanation: "`i` noldan boshlanib har safar kamaygani uchun (-1, -2, -3...) u har doim `3` dan kichik bo'ladi. Natijada shart doim to'g'ri bo'lib, cheksiz sikl sodir bo'ladi."
    },
    {
      id: 12,
      question: "Massiv elementlarining indekslari bo'ylab aylanish uchun qaysi sikldan foydalanish to'g'ri?",
      options: [
        "`for...of`",
        "`for...in` (chunki u indekslar/kalitlarni aylanish uchun ishlatiladi)",
        "`while`",
        "`do...while`"
      ],
      correctAnswer: 1,
      explanation: "`for...in` massivda elementlarning indekslarini (kalitlarini) ketma-ket qaytaradi. `for...of` esa to'g'ridan-to'g'ri qiymatlarni qaytaradi."
    }
  ]
};