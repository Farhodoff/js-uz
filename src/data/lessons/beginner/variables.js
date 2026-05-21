export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga o'yin davomida foydalanuvchining ballarini saqlab borish kerak. Ballar har doim o'zgarib turadi. Agar bizda o'zgaruvchi bo'lmasa, har bir yeni ballni kompyuter xotirasida qayerda ekanligini qo'lda qidirishimizga to'g'ri kelardi. O'zgaruvchi bizga o'sha xotira joyiga chiroyli "nom" berish imkonini beradi.

## 2. SODDALIK (Analogiya)
O'zgaruvchini oshxonadagi **bankachalarga** o'xshatish mumkin:
- **Bankacha nomi:** "Tuz" (bu o'zgaruvchi nomi).
- **Bankacha ichidagisi:** Oq kukun (bu o'zgaruvchi qiymati).
Siz bankacha ichidagi tuzni ishlatib, o'rniga shakar solib qo'yishingiz ham mumkin (qiymatni o'zgartirish).

## 3. STRUKTURA

### A. let (Zamonaviy tanlov)
Agar qiymat keyinchalik o'zgarishi kerak bo'lsa, \`let\` ishlatiladi. U **block scope**ga ega (faqat o'zi yozilgan \`{ }\` ichida ko'rinadi).
\`\`\`javascript
let ball = 10;
ball = 20; // Qiymatni yangilash mumkin ✅
\`\`\`

### B. const (O'zgarmas)
Agar qiymat bir marta berilsa va boshqa o'zgarmasa, \`const\` ishlatiladi. Uni e'lon qilganda darhol qiymat berish shart.
\`\`\`javascript
const PI = 3.14;
// PI = 5; // Xato! ❌
\`\`\`

### C. var (Eski usul)
JSning eski versiyalaridan qolgan. U **function scope**ga ega va **hoisting** (yuqoriga ko'tarilish) xususiyatiga ega, bu esa kutilmagan xatolarga olib kelishi mumkin. Hozirda undan foydalanmaslik tavsiya etiladi.

| Xususiyat | var | let | const |
|-----------|-----|-----|-------|
| Scope | Function | Block | Block |
| Qayta e'lon qilish | Ha ✅ | Yo'q ❌ | Yo'q ❌ |
| Qiymatni o'zgartirish | Ha ✅ | Ha ✅ | Yo'q ❌ |
| Hoisting | Ha ✅ | Yo'q (TDZ) | Yo'q (TDZ) |

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Nomlash qoidalari:** Nomlar raqam bilan boshlanishi mumkin emas (\`let 1name\` ❌). Faqat harf, \`$\` yoki \`_\` bilan boshlanishi mumkin.
2. **Bo'sh joy:** O'zgaruvchi nomida bo'sh joy bo'lishi mumkin emas (\`let mening ismim\` ❌). O'rniga \`meningIsmim\` (camelCase) ishlatiladi.
3. **const va undefined:** \`const x;\` deb yozib bo'lmaydi, unga darhol qiymat berish shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. O'zgaruvchi nima?**
Ma'lumotlarni kompyuter xotirasida saqlash uchun ishlatiladigan nomlangan "quti".

**2. let va var o'rtasidagi asosiy farq nima?**
\`let\` block scopega ega, \`var\` esa function scopega. \`let\` qayta e'lon qilinishga yo'l qo'ymaydi.

**3. Nima uchun constdan foydalanish xavfsizroq?**
Chunki u qiymatning tasodifan o'zgarib ketishidan himoya qiladi.

**4. O'zgaruvchi nomini raqam bilan boshlasa bo'ladimi?**
Yo'q, bu xatolikka olib keladi.

**5. camelCase yozish usuli nima?**
Birinchi so'z kichik, keyingi so'zlar katta harf bilan boshlanadigan yozish usuli (masalan: \`meningIsmim\`).

**6. Qaysi kalit so'zni ishlatish hozirda tavsiya etilmaydi?**
\`var\` kalit so'zi.

**7. const bilan yaratilgan obyekt ichidagi qiymatni o'zgartirsa bo'ladimi?**
Ha, obyektning o'zini (reference) o'zgartirib bo'lmaydi, lekin ichidagi xususiyatlarini o'zgartirsa bo'ladi.

**8. Bir vaqtda bir nechta o'zgaruvchini e'lon qilsa bo'ladimi?**
Ha: \`let a = 1, b = 2, c = 3;\`

**9. O'zgaruvchi nomi qaysi tillarda yozilishi mumkin?**
Unicode qo'llab-quvvatlanadi, lekin ingliz tilida yozish standart hisoblanadi.

**10. Hoisting nima?**
O'zgaruvchi yoki funksiyalarni e'lon qilinishidan oldin ishlatish imkonini beruvchi JS mexanizmi (faqat \`var\` va funksiyalar bilan).

**11. "Temporal Dead Zone" (TDZ) nima?**
\`let\` va \`const\` e'lon qilinguncha bo'lgan vaqt oralig'i, bunda o'zgaruvchiga murojaat qibly bo'lmaydi.

**12. Qachon let ishlatgan ma'qul?**
Qiymat keyinchalik o'zgarishi aniq bo'lgan holatlarda (masalan, sikllarda).
`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchi yaratish",
      instruction: "'name' nomli o'zgarmas (const) va 'score' nomli o'zgaruvchan (let) yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const name = 'Ali'; let score = 0;",
      test: "if (code.includes('const') && code.includes('let')) return null; return 'Kalit so\\'zlarni to\\'g\\'ri ishlating';"
    },
    {
      id: 2,
      title: "Qiymatni yangilash",
      instruction: "'ball' o'zgaruvchisini yarating, unga 10 bering va keyingi qatorda uni 15 ga o'zgartiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let ball = 10; ball = 15;",
      test: "if (code.includes('let') && code.split('=')[2]?.trim().includes('15')) return null; return 'Qiymatni to\\'g\\'ri yangilang';"
    },
    {
      id: 3,
      title: "O'zgarmas PI qiymati",
      instruction: "'PI' nomli o'zgarmas o'zgaruvchi yarating va unga 3.14159 qiymatini bering.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const PI = 3.14159;",
      test: "if (code.includes('const') && code.includes('PI') && code.includes('3.14159')) return null; return 'const PI o\\'zgarmasini to\\'g\\'ri e\\'lon qiling';"
    },
    {
      id: 4,
      title: "Ism va Familiya",
      instruction: "'firstName' o'zgaruvchisiga 'Ali' va 'lastName' o'zgaruvchisiga 'Valiyev' qiymatlarini bering.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let firstName = 'Ali';\nlet lastName = 'Valiyev';",
      test: "if (code.includes('firstName') && code.includes('lastName')) return null; return 'firstName va lastName o\\'zgaruvchilarini yarating';"
    },
    {
      id: 5,
      title: "Qiymatlarni almashtirish",
      instruction: "Berilgan 'a' va 'b' o'zgaruvchilarining qiymatlarini alohida 'temp' o'zgaruvchisi yordamida almashtiring.",
      startingCode: "let a = 5;\nlet b = 10;\nlet temp;\n// Bu yerga yozing\n",
      hint: "temp = a;\na = b;\nb = temp;",
      test: "if (code.includes('temp = a') && code.includes('a = b') && code.includes('b = temp')) return null; return 'Qiymatlarni temp yordamida almashtiring';"
    },
    {
      id: 6,
      title: "CamelCase uslubida nomlash",
      instruction: "CamelCase uslubidan foydalanib 'foydalanuvchi yoshi' va 'tizimga kirish vaqti' degan ma'nolarni anglatuvchi let o'zgaruvchilarini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let userAge;\nlet loginTime;",
      test: "if (code.includes('userAge') && code.includes('loginTime')) return null; return 'O\\'zgaruvchilarni camelCase shaklida nomlang (userAge, loginTime)';"
    },
    {
      id: 7,
      title: "Dinamik tiplashtirish",
      instruction: "'data' o'zgaruvchisini let orqali yarating, dastlab unga 100 sonini bering va keyingi qatorda unga 'Salom' matnini yuklang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let data = 100;\ndata = 'Salom';",
      test: "if (code.includes('let data') && code.includes('100') && code.includes('Salom')) return null; return 'data o\\'zgaruvchisini yarating va keyin matn qiymat yuklang';"
    },
    {
      id: 8,
      title: "Undefined o'zgaruvchi",
      instruction: "'message' nomli o'zgaruvchini qiymat bermasdan e'lon qiling va uni console.log() orqali konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let message;\nconsole.log(message);",
      test: "if (code.includes('let message') && code.includes('console.log')) return null; return 'message ni qiymat bermay e\\'lon qiling va konsolga chiqaring';"
    },
    {
      id: 9,
      title: "O'zgarmas massivni o'zgartirish",
      instruction: "const bilan 'numbers' massivini [1, 2] ko'rinishida yarating va unga push() metodi yordamida 3 sonini qo'shing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const numbers = [1, 2];\nnumbers.push(3);",
      test: "if (code.includes('const numbers') && code.includes('push(3)')) return null; return 'const massiv yarating va 3 ni push qiling';"
    },
    {
      id: 10,
      title: "O'zgarmas obyektni yangilash",
      instruction: "const bilan 'car' obyektini yarating (ichida brand: 'Tesla' bo'lsin). Keyingi qatorda brand qiymatini 'BYD' ga o'zgartiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const car = { brand: 'Tesla' };\ncar.brand = 'BYD';",
      test: "if (code.includes('const car') && code.includes('BYD')) return null; return 'Obyekt ichidagi xususiyatni yangilang';"
    },
    {
      id: 11,
      title: "Bir qatorda bir nechta o'zgaruvchi",
      instruction: "Bir dona 'let' kalit so'zi yordamida bir qatorning o'zida a = 1, b = 2, c = 3 o'zgaruvchilarini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let a = 1, b = 2, c = 3;",
      test: "if (code.includes('let') && code.includes('a = 1') && code.includes('b = 2') && code.includes('c = 3')) return null; return 'Bir qatorda e\\'lon qilish qoidasiga rioya qiling';"
    },
    {
      id: 12,
      title: "TDZ va ReferenceError",
      instruction: "Try-catch bloki ichida, 'y' o'zgaruvchisini let bilan e'lon qilishdan oldin console.log(y) qiling va xatoni ushlab e.name ni konsolga chiqaring.",
      startingCode: "try {\n  // Bu yerga yozing\n  \n  let y = 5;\n} catch (e) {\n  console.log(e.name);\n}",
      hint: "console.log(y);",
      test: "if (code.includes('console.log(y)') && code.includes('let y')) return null; return 'y e\\'lon qilinishidan oldin konsolga chiqarilishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let` va `const` kalit so'zlari yordamida yaratilgan o'zgaruvchilar qanday ko'rinish doirasiga (scope) ega?",
      options: [
        "Global Scope (barcha joyda ko'rinadi)",
        "Function Scope (faqat funksiya ichida ko'rinadi)",
        "Block Scope (faqat o'zi yozilgan `{ }` jingalak qavslar ichida ko'rinadi)",
        "Ular umuman scopega ega emas"
      ],
      correctAnswer: 2,
      explanation: "`let` va `const` block-scoped hisoblanadi, ya'ni ular if bloklari, for sikllari yoki shunchaki `{ }` qavslar ichida e'lon qilinsa, tashqarida ularga murojaat qilib bo'lmaydi."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri sintaktik jihatdan noto'g'ri (Error) va nima uchun?",
      options: [
        "`let score;`",
        "`const price;` (const e'lon qilinganda unga darhol boshlang'ich qiymat berish shart)",
        "`var x = 10;`",
        "`let name = 'Ali'; name = 'Vali';`"
      ],
      correctAnswer: 1,
      explanation: "`const` o'zgarmas qiymat bo'lganligi sababli, e'lon qilinayotgan vaqtda uning qiymati aniq ko'rsatilishi lozim. Aks holda `SyntaxError: Missing initializer in const declaration` xatosi yuz beradi."
    },
    {
      id: 3,
      question: "`var` kalit so'zi yordamida e'lon qilingan o'zgaruvchilarning qaysi tabiati zamonaviy JavaScriptda muammolarga sabab bo'lgan va shuning uchun ishlatilishi tavsiya etilmaydi?",
      options: [
        "Unga qiymat berib bo'lmaydi",
        "U function scopega ega bo'lib, hoisting tufayli e'lon qilinishidan oldin ishlatilsa `undefined` qaytaradi va xato bermaydi, shuningdek bir xil nom bilan qayta-qayta e'lon qilish mumkin",
        "U faqat raqamlarni saqlay oladi",
        "U faqat brauzerda ishlaydi, Node.js da ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "`var` block scope qoidalariga rioya qilmaydi va hoisting xususiyati sababli kutilmagan mantiqiy xatolarni keltirib chiqarishi mumkin. Shu sababli ES6 dan boshqa `let` va `const` tavsiya etiladi."
    },
    {
      id: 4,
      question: "O'zgaruvchilarni nomlash qoidalariga ko'ra, quyidagilardan qaysi biri to'g'ri nomlangan o'zgaruvchi hisoblanadi?",
      options: [
        "`let 1stPlace = 'Ali';`",
        "`let user-name = 'Ali';`",
        "`let $price = 100;`",
        "`let my age = 20;`"
      ],
      correctAnswer: 2,
      explanation: "JavaScriptda o'zgaruvchi nomlari raqam bilan boshlanishi mumkin emas, chiziqcha `-` yoki bo'shliq (space) belgisini saqlashi mumkin emas. O'zgaruvchi nomi faqat harf, `$` va `_` bilan boshlanishi mumkin."
    },
    {
      id: 5,
      question: "\"Temporal Dead Zone\" (TDZ - Vaqtinchalik o'lik hudud) nima?",
      options: [
        "Kodni bajarish to'xtab qolgan vaqt",
        "`let` va `const` o'zgaruvchilari e'lon qilingan qatorgacha bo'lgan hudud bo'lib, unda ushbu o'zgaruvchilarga murojaat qilish `ReferenceError` xatosini beradi",
        "Faqat `var` bilan bog'liq bo'lgan xotira maydoni",
        "LocalStorage o'chib ketadigan vaqt oralig'i"
      ],
      correctAnswer: 1,
      explanation: "TDZ — bu blok boshlangan joydan to `let` yoki `const` e'lon qilingan joygacha bo'lgan masofa bo'lib, uning ichida o'zgaruvchi xotirada bo'lsa-da, unga murojaat qilish taqiqlanadi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(x);\nvar x = 5;\n```",
      options: [
        "ReferenceError",
        "5",
        "undefined (chunki var o'zgaruvchisi hoist bo'ladi, lekin qiymat yuklash o'z joyida qoladi)",
        "TypeError"
      ],
      correctAnswer: 2,
      explanation: "var yordamida e'lon qilingan o'zgaruvchilar hoisting tufayli scope boshiga ko'tariladi va default holatda undefined qiymatini oladi."
    },
    {
      id: 7,
      question: "const yordamida yaratilgan massiv (array) elementlarini o'zgartirish yoki unga yangi element qo'shish mumkinmi?",
      options: [
        "Yo'q, const bilan yaratilgan har qanday o'zgaruvchini umuman o'zgartirib bo'lmaydi",
        "Ha, massiv elementlarini o'zgartirish mumkin, lekin massivning o'zini yangi massivga qayta yuklab (reassign) bo'lmaydi",
        "Faqat massivning birinchi elementini o'zgartirsa bo'ladi",
        "Ha, massivni to'liq yangi qiymatga qayta yuklash ham mumkin"
      ],
      correctAnswer: 1,
      explanation: "const o'zgaruvchining xotiradagi manzili o'zgarmasligini ta'minlaydi. Massiv yoki obyekt tarkibini o'zgartirish (mutatsiya qilish) mumkin, lekin ularga boshqa yangi massiv yoki qiymatni qayta yuklab bo'lmaydi."
    },
    {
      id: 8,
      question: "JavaScript-da kalit so'zsiz yaratilgan o'zgaruvchilar (masalan, `x = 10`) strict mode bo'lmagan holda qaysi scopega tegishli bo'ladi?",
      options: [
        "Faqat o'zi yozilgan blok doirasiga (Block scope)",
        "Global scopega (avtomatik ravishda global o'zgaruvchiga aylanadi)",
        "Faqat o'zi yozilgan funksiya ichiga (Function scope)",
        "Ular hech qanday scopega ega bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Kalit so'zsiz e'lon qilingan o'zgaruvchilar avtomatik ravishda global scopega biriktiriladi (global namespace pollution). Bu yomon kod yozish odati hisoblanadi."
    },
    {
      id: 9,
      question: "Quyidagi e'lonlardan qaysi biri sintaktik jihatdan xato?",
      options: [
        "`let name = 'Ali', age = 20;`",
        "`const user = { name: 'Vali' };`",
        "`let a; const b = 2;`",
        "`const x;` (chunki const bilan e'lon qilingan o'zgaruvchiga darhol qiymat berish shart)"
      ],
      correctAnswer: 3,
      explanation: "const bilan e'lon qilingan o'zgaruvchilarni e'lon qilingan vaqtda boshlang'ich qiymat bilan ta'minlash shart (initializer required)."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nlet a = 10;\nlet a = 20;\n```",
      options: [
        "a ning qiymati 20 ga teng bo'ladi",
        "SyntaxError (Identifier 'a' has already been declared - let bilan bir xil nomli o'zgaruvchini qayta e'lon qilib bo'lmaydi)",
        "a ning qiymati 10 bo'lib qoladi",
        "Undefined qiymat chop etiladi"
      ],
      correctAnswer: 1,
      explanation: "let va const bilan bitta scope ichida bir xil nomli o'zgaruvchini qayta e'lon qilib bo'lmaydi. var da esa bunga yo'l qo'yiladi."
    },
    {
      id: 11,
      question: "Temporal Dead Zone (TDZ) qachon yakunlanadi?",
      options: [
        "Loyiha to'liq yuklanganda",
        "Dastur bajarilishi joriy blokdan chiqib ketganda",
        "O'zgaruvchi haqiqatda e'lon qilingan va qiymat yuklangan qatorga yetib kelganda",
        "Call stack bo'shaganda"
      ],
      correctAnswer: 2,
      explanation: "TDZ o'zgaruvchi e'lon qilingan va unga qiymat yuklangan qatordan keyin tugaydi. Shundan so'ng o'zgaruvchiga murojaat qilish bexatar hisoblanadi."
    },
    {
      id: 12,
      question: "Quyidagi kodda xato bormi?\n```javascript\nconst user = { name: 'Ali' };\nuser.name = 'Vali';\n```",
      options: [
        "Ha, const o'zgaruvchining xususiyatini o'zgartirib bo'lmaydi",
        "Yo'q, xato yo'q. Obyekt tarkibini o'zgartirish mumkin, chunki user manzili o'zgarmayapti",
        "Ha, SyntaxError yuz beradi",
        "Ha, TypeError: Assignment to constant variable"
      ],
      correctAnswer: 1,
      explanation: "const yordamida yaratilgan obyekt xususiyatlarini (properties) bemalol o'zgartirish, qo'shish yoki o'chirish mumkin. Faqatgina `user = {}` qilib unga yangi obyekt yuklash xato bo'ladi."
    }
  ]
};
