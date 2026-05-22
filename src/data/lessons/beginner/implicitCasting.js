export const implicitCasting = {
  id: "implicit-casting",
  title: "Implicit Type Casting (Avtomatik o'zgarishlar)",
  level: "Beginner",
  description: "JavaScript-da operatorlar va mantiqiy ifodalar ta'sirida ma'lumot turlarining yashirin (avtomatik) ravishda o'zgarishi (Type Coercion).",
  theory: `## 1. NEGA kerak?
Implicit Coercion (Avtomatik o'zgartirish) — bu JavaScriptning operatorlar (masalan, \`+\`, \`-\`) ishlatilganda ma'lumot turlarini dasturchi aralashuvisiz o'zgartirib yuborishidir. Bu JavaScriptni moslashuvchan qiladi va dastur xato berib to'xtab qolishining oldini oladi, lekin ba'zan kutilmagan mantiqiy xatolar (bugs) keltirib chiqarishi mumkin.

## 2. SODDALIK (Analogiya)
Buni universal elektr adapteriga o'xshatish mumkin. Sizda ikki tishli shtepsel va uch tishli rozetka bor. JavaScript o'zi simni biroz bukab bo'lsa ham rozetkaga "amallab" tiqib yuboradi. Natijada qurilma ishlaydi, lekin ba'zida uchqun chiqishi mumkin.

## 3. STRUKTURA (Asosiy qoidalar)

### A. Qo'shish operatori (+) – Matnga moyil
Agar amalda kamida bitta operand **matn (string)** bo'lsa, JS barcha qiymatlarni satrga aylantiradi va birlashtiradi:
\`\`\`javascript
"5" + 2; // "52"
1 + 1 + "2"; // "22" (oldin 1+1=2, keyin "2" bilan birlashib "22")
\`\`\`

### B. Arifmetik amallar (-, *, /, %) – Songa moyil
Bu operatorlar faqat sonlar bilan ishlagani uchun JS operanlarni avtomatik songa aylantiradi:
\`\`\`javascript
"10" - 5; // 5
"5" * "2"; // 10
\`\`\`

### C. Bulian qiymatlar (true / false) son sifatida
Arifmetik amallarda \`true\` sonli qiymat sifatida \`1\` ga, \`false\` esa \`0\` ga aylanadi:
\`\`\`javascript
true + 1; // 2
false * 10; // 0
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **== bilan solishtirish:** \`==\` (yumshoq tenglik) yashirin turni o'zgartiradi (\`5 == "5"\` is true). Qat'iy solishtirish uchun har doim \`===\` ishlatilishi kerak.
2. **undefined bilan hisob-kitob:** \`undefined\` arifmetik amallarda ishlatilsa natija har doim \`NaN\` (Not a Number) bo'ladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Coercion nima?**
JavaScript dvigateli tomonidan ma'lumot turlarining avtomatik ravishda biridan boshqasiga o'tkazilishi.

**2. Nima uchun "10" + 2 ifodasi "102" bo'ladi?**
Chunki \`+\` operatori matn ishtirok etganda konkatensiya (birlashtirish) amalini bajaradi.

**3. "10" - 2 nima uchun 8 bo'ladi?**
Chunki \`-\` operatori faqat raqamlar bilan ishlaydi va matnni songa o'giradi.

**4. true + true natijasi nima bo'ladi?**
\`2\` bo'ladi (chunki true = 1).

**5. [] == 0 natijasi nima uchun true?**
Bo'sh massiv stringga (\`""\`), keyin esa songa (\`0\`) o'giriladi, \`0 == 0\` esa \`true\`.

**6. !!"test" nima qaytaradi?**
\`true\` qaytaradi, chunki bo'sh bo'lmagan string - truthy qiymatdir.

**7. "5" * "5" natijasi nima?**
\`25\` soni bo'ladi.

**8. Nima uchun == o'rniga === tavsiya etiladi?**
=== avtomatik turni o'zgartirmay solishtiradi, bu esa xavfsizroq.

**9. null + 5 ifodasi nima beradi?**
\`5\` (null son sifatida 0 ga aylanadi).

**10. undefined + 5 ifodasi nima beradi?**
\`NaN\` (undefined songa aylanganda NaN beradi).

**11. 1 < 2 < 3 ifodasi nima beradi?**
\`true\` (\`1 < 2\` -> \`true\` (1), keyin \`1 < 3\` -> \`true\`).

**12. 3 > 2 > 1 ifodasi nima beradi?**
\`false\` (\`3 > 2\` -> \`true\` (1), keyin \`1 > 1\` -> \`false\`).
`,
  exercises: [
    {
      id: 1,
      title: "Coercion sinovi",
      instruction: "Konsolga '5' + 5 va '5' - 5 natijalarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('5' + 5); console.log('5' - 5);",
      test: "if (logs.includes('55') && logs.includes(0)) return null; return 'Natija noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "Boolean math coercion",
      instruction: "res o'zgaruvchisiga true + 10 amali natijasini bering.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = true + 10;",
      test: "if (res === 11) return null; return 'true son sifatida 1 ga teng bo\\'ladi!';"
    },
    {
      id: 3,
      title: "String division coercion",
      instruction: "res o'zgaruvchisiga '20' / 2 amali natijasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '20' / 2;",
      test: "if (res === 10) return null; return 'Bo\\'lish amali stringni songa o\\'giradi!';"
    },
    {
      id: 4,
      title: "Undefined summation",
      instruction: "res o'zgaruvchisiga undefined + 10 yig'indisini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = undefined + 10;",
      test: "if (Number.isNaN(res)) return null; return 'undefined + son NaN bo\\'lishi lozim!';"
    },
    {
      id: 5,
      title: "Null coercion sum",
      instruction: "res o'zgaruvchisiga null + 10 amali natijasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = null + 10;",
      test: "if (res === 10) return null; return 'null + 10 ifodasi 10 ga teng bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Implicit subtraction",
      instruction: "res o'zgaruvchisiga '100' - '50' ifodasi qiymatini bering.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '100' - '50';",
      test: "if (res === 50) return null; return 'Ayirish amali avtomatik tarzda songa o\\'giradi!';"
    },
    {
      id: 7,
      title: "Multiple operations coercion",
      instruction: "res o'zgaruvchisiga '5' + '5' - 5 amali natijasini bering.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '5' + '5' - 5;",
      test: "if (res === 50) return null; return 'Matnlar qo\\'shilib keyin 5 ayirilishi kerak!';"
    },
    {
      id: 8,
      title: "Three comparisons chain",
      instruction: "res o'zgaruvchisiga 3 > 2 > 1 taqqoslash ifodasi natijasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 3 > 2 > 1;",
      test: "if (res === false) return null; return '3 > 2 > 1 false bo\\'lishini hisobga oling';"
    },
    {
      id: 9,
      title: "Logical coercion ||",
      instruction: "res o'zgaruvchisiga '' || 'Sukut' mantiqiy ifodasi natijasini bering.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '' || 'Sukut';",
      test: "if (res === 'Sukut') return null; return '|| operatori birinchi truthy qiymatni qaytaradi!';"
    },
    {
      id: 10,
      title: "Double inversion boolean coercion",
      instruction: "res o'zgaruvchisiga !!'Salom' mantiqiy ifodasi natijasini bering.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = !!'Salom';",
      test: "if (res === true) return null; return '!! truthy qiymatni truega aylantiradi!';"
    },
    {
      id: 11,
      title: "Multiplication coercion",
      instruction: "res o'zgaruvchisiga '4' * '5' amali natijasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '4' * '5';",
      test: "if (res === 20) return null; return 'Ko\\'paytirish stringlarni songa o\\'giradi!';"
    },
    {
      id: 12,
      title: "Unary plus coercion",
      instruction: "res o'zgaruvchisiga unar plyus yordamida + '10' qiymatini oling.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = + '10';",
      test: "if (res === 10 && typeof res === 'number') return null; return 'Unar plyus stringni songa o\\'giradi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `true + true` va `undefined + 5` amallari qanday natijalarni qaytaradi?",
      options: [
        "`\"truetrue\"` va `\"undefined5\"`",
        "`2` va `NaN` (chunki true son sifatida 1 ga aylanadi, undefined esa songa o'girilganda NaN bo'lib, unga har qanday sonni qo'shish NaN qaytaradi)",
        "`2` va `5`",
        "`TypeError` xatoligi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "`true` mantiqiy qiymati arifmetik amallarda `1` soniga aylanadi, shu sababli `true + true` natijasi `2` dir. `undefined` esa songa o'girilganda `NaN` bo'ladi, `NaN` ga esa har qanday son qo'shilsa natija `NaN` bo'lib qoladi."
    },
    {
      id: 2,
      question: "Quyidagi kod solishtiruvi qanday natija qaytaradi va mantiqan uning sababi nima: `3 > 2 > 1`?",
      options: [
        "`true` (chunki matematika bo'yicha 3 katta 2 dan va 2 katta 1 dan)",
        "`false` (chunki chapdan o'ngga bajarilganda `3 > 2` `true` qaytaradi, so'ng `true > 1` taqqoslanadi va true son sifatida 1 ga aylanib `1 > 1` natijasi false bo'ladi)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Taqqoslash chapdan o'ngga bajariladi: `3 > 2` natijasi `true` bo'ladi. Keyin `true > 1` taqqoslanadi. `true` avtomatik tarzda `1` soniga o'girilib, `1 > 1` sharti tekshiriladi va javob `false` chiqadi."
    },
    {
      id: 3,
      question: "Quyidagi amal bajarilganda konsolga nima chiqadi: `console.log(\"5\" + \"5\" - 5)`?",
      options: [
        "`\"555\"`",
        "`50` (chunki dastlab `\"5\" + \"5\"` matnlari birlashib `\"55\"` stringini hosil qiladi, so'ngra `-` operatori kelganligi sababli u songa aylanib `55 - 5 = 50` bo'ladi)",
        "`5`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "Birinchi navbatda `+` operatori satrlar bilan ishlagani uchun ularni birlashtiradi (`\"55\"`). Keyingi `-` operatori esa faqat sonlar bilan ishlagani bois, satrni avtomatik songa aylantiradi va `55 - 5 = 50` natijasi chiqadi."
    },
    {
      id: 4,
      question: "`null + 5` ifodasi bajarilganda qanday natija hosil bo'ladi va nima sababdan?",
      options: [
        "`5` (chunki implicit coercion paytida `null` avtomatik tarzda `0` soniga aylanadi va `0 + 5 = 5` bo'ladi)",
        "`\"null5\"` (chunki null matn sifatida o'zlashtiriladi)",
        "`NaN` (chunki null son emas)",
        "`TypeError`"
      ],
      correctAnswer: 0,
      explanation: "`null` obyekti arifmetik amallarda va songa avtomatik o'tkazilganda (implicit coercion) har doim `0` soniga tenglashtiriladi."
    },
    {
      id: 5,
      question: "Nima uchun JavaScript-da ikkitalik tenglik `==` o'rniga qat'iy tenglik `===` ishlatish tavsiya qilinadi?",
      options: [
        "`==` faqat raqamlarni solishtiradi, `===` esa matnlarni solishtiradi",
        "`==` avtomatik turni o'zgartirish (coercion) xususiyatiga ega bo'lib, kutilmagan natijalarga olib kelishi mumkin; `===` esa qiymatni ham, uning turini ham o'zgartirmasdan solishtiradi",
        "`===` tezroq ishlaydi",
        "Ikkalasi o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "`==` taqqoslash operatori turlar har xil bo'lsa, ularni avtomatik bir xil turga keltirib taqqoslaydi (masalan, `[] == 0` yoki `true == 1` rost qaytaradi). Bu esa xatolarga sabab bo'lgani uchun qat'iy tenglik `===` tavsiya etiladi."
    },
    {
      id: 6,
      question: "Quyidagi ifodaning natijasini toping:\n```javascript\n{} + []\n```",
      options: [
        "`\"[object Object]\"` (agar ifoda sifatida console.log ichida yozilsa, lekin ba'zi console o'ynalarda {} bo'sh blok deb tushunilib, +[] ya'ni 0 qaytarishi ham mumkin)",
        "`0`",
        "`NaN`",
        "`TypeError`"
      ],
      correctAnswer: 0,
      explanation: "Agar bu console.log ichida ifoda sifatida uzatilsa, `{}` obyekt satrga (`\"[object Object]\"`), `[]` esa bo'sh satrga (`\"\"`) aylanib, natijada `\"[object Object]\"` qaytadi."
    },
    {
      id: 7,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\n1 + 2 + \"3\"\n```",
      options: [
        "\"123\"",
        "\"33\"",
        "6",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "Chapdan o'ngga bajarilish qoidasiga ko'ra: oldin `1 + 2` bajariladi va `3` soni chiqadi. Keyin `3 + \"3\"` bajariladi va son satrga birlashib `\"33\"` matni hosil bo'ladi."
    },
    {
      id: 8,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\n\"3\" + 1 + 2\n```",
      options: [
        "\"33\"",
        "\"312\" (chunki birinchi + matnli bo'lib keyingi barcha amallarni satrli qiladi)",
        "6",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "Chapdan o'ngga: `\"3\" + 1` birinchi bo'lib `\"31\"` stringini beradi. Keyin `\"31\" + 2` bajarilib, natijada `\"312\"` hosil bo'ladi."
    },
    {
      id: 9,
      question: "Quyidagi mantiqiy ifoda nima qaytaradi?\n```javascript\n\"a\" && \"b\"\n```",
      options: [
        "true",
        "\"b\" (chunki && operatori ikkala tomon truthy bo'lsa oxirgi truthy qiymatni qaytaradi)",
        "\"a\"",
        "false"
      ],
      correctAnswer: 1,
      explanation: "`&&` operatori birinchi qiymat truthy bo'lsa, ikkinchi qiymatni tekshiradi va o'sha ikkinchi qiymatni (turning o'zgarishisiz) qaytaradi."
    },
    {
      id: 10,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\n0 || \"Salom\"\n```",
      options: [
        "true",
        "\"Salom\" (chunki 0 falsy bo'lgani uchun || ikkinchi qiymatni qaytaradi)",
        "0",
        "false"
      ],
      correctAnswer: 1,
      explanation: "`||` operatori birinchi operand falsy bo'lsa, ikkinchi operandni qaytaradi."
    },
    {
      id: 11,
      question: "Quyidagi ifodaning natijasi nima?\n```javascript\n+true\n```",
      options: [
        "true",
        "1 (unar plyus true ni 1 raqamiga o'giradi)",
        "NaN",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Unar plyus operatori (`+`) har qanday qiymatni avtomatik ravishda son turiga o'tkazishning eng qisqa usulidir. `true` son sifatida `1` ga teng."
    },
    {
      id: 12,
      question: "Quyidagi ifodaning natijasi nima?\n```javascript\n+undefined\n```",
      options: [
        "0",
        "NaN (chunki undefined songa o'tmaydi)",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "`undefined` qiymati son ko'rinishiga kelganda `NaN` bo'ladi."
    }
  ]
};
