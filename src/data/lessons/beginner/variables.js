export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizga o'yin davomida foydalanuvchining ballarini saqlab borish kerak. Ballar har doim o'zgarib turadi. Agar bizda o'zgaruvchi bo'lmasa, har bir yangi ballni kompyuter xotirasida qayerda ekanligini qo'lda qidirishimizga to'g'ri kelardi. O'zgaruvchi bizga o'sha xotira joyiga chiroyli "nom" berish imkonini beradi.

## 2. SODDALIK (Analogiya)
O'zgaruvchini oshxonadagi **bankachalarga** o'xshatish mumkin:
- **Bankacha nomi:** "Tuz" (bu o'zgaruvchi nomi).
- **Bankacha ichidagisi:** Oq kukun (bu o'zgaruvchi qiymati).
Siz bankacha ichidagi tuzni ishlatib, o'rniga shakar solib qo'yishingiz ham mumkin (qiymatni o'zgartirish).

## 3. STRUKTURA (Kalit so'zlar)

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
PI = 5; // Xato! ❌
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
\`let\` va \`const\` e'lon qilinguncha bo'lgan vaqt oralig'i, bunda o'zgaruvchiga murojaat qilib bo'lmaydi.


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
    }
  ]
};
