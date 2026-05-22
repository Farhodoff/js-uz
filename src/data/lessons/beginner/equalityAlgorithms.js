export const equalityAlgorithms = {
  id: "equality-algorithms",
  title: "Tenglik Operatorlari (Equality)",
  level: "Beginner",
  description: "JavaScript-da yumshoq tenglik (==), qat'iy tenglik (===) va Object.is() o'rtasidagi farqlarni chuqur o'rganish.",
  theory: `## 1. NEGA kerak?
JavaScriptda ikkita qiymatni solishtirish uchun bir nechta usul bor. Foydalanuvchi kiritgan raqamni (\`"10"\`) dasturdagi raqam (\`10\`) bilan solishtirganda JS ularni qanday tushunishini bilishimiz zarur. Noto'g'ri solishtirish kutilmagan mantiqiy xatolarga (bug) sabab bo'ladi.

## 2. SODDALIK (Analogiya)
- **== (Yumshoq tenglik):** Bu xuddi egizaklarni solishtirish kabi. Kiyimlari har xil bo'lsa ham (ma'lumot turi farqli bo'lsa ham), yuz ko'rinishi bir xilligi uchun ularni "teng" deb hisoblaydi.
- **=== (Qat'iy tenglik):** Bu xuddi pasport tekshiruvi kabi. Ham yuz ko'rinishi, ham kiyimi (ma'lumot turi) aynan bir xil bo'lishi shart.

## 3. STRUKTURA

### A. Yumshoq tenglik (==)
Solishtirishdan oldin turlarni avtomatik tarzda bir xil ko'rinishga o'tkazadi (Coercion):
\`\`\`javascript
5 == "5"; // true (matn songa o'girildi)
1 == true; // true (true 1 soniga o'girildi)
0 == false; // true
\`\`\`

### B. Qat'iy tenglik (===)
Turlarni o'zgartirmaydi. Agar turlari mos kelmasa — darhol \`false\` qaytaradi:
\`\`\`javascript
5 === "5"; // false (biri number, biri string)
1 === true; // false
\`\`\`

### C. Object.is()
ES6 bilan kirib kelgan eng aniq va mukammal taqqoslash usuli:
\`\`\`javascript
NaN === NaN; // false (JSning g'alati qoidasi)
Object.is(NaN, NaN); // true (mana bu to'g'ri!)

-0 === +0; // true
Object.is(-0, +0); // false (ishoralarini ajratadi)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Yumshoq tenglikdan ko'p foydalanish:** \`==\` kutilmagan natijalarga olib kelishi sababli har doim qat'iy \`===\` operatoridan foydalanish tavsiya etiladi.
2. **NaN tekshirish:** \`if (x === NaN)\` hech qachon ishlamaydi, chunki NaN o'ziga teng emas. Buning o'rniga \`Number.isNaN(x)\` yoki \`Object.is(x, NaN)\` ishlatiladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. == va === farqi nimada?**
\`==\` solishtirishdan oldin turlarni avtomatik o'zgartiradi (\`coercion\`), \`===\` esa o'zgartirmaydi.

**2. Coercion qaysi tenglikda sodir bo'ladi?**
Faqat yumshoq tenglikda (\`==\`) sodir bo'ladi.

**3. Nima uchun 5 === "5" false qaytaradi?**
Chunki ularning ma'lumot turlari mos kelmaydi (\`number\` va \`string\`).

**4. null == undefined natijasi nima?**
Natija \`true\` bo'ladi. JS qoidalariga ko'ra, yumshoq solishtirishda ular tengdir.

**5. null === undefined natijasi nima?**
Natija \`false\` bo'ladi, chunki turlari mos ravishda \`object\` va \`undefined\`dir.

**6. NaN == NaN natijasi nima bo'ladi?**
Natija \`false\` bo'ladi, chunki NaN o'z-o'ziga teng bo'lmagan yagona qiymatdir.

**7. Object.is() nima uchun kerak?**
NaN va nol ishoralari (\`-0\` va \`+0\`) kabi maxsus holatlarni xatosiz solishtirish uchun.

**8. 0 == "" (bo'sh matn) natijasi nima?**
\`true\` bo'ladi, chunki bo'sh matn avtomatik ravishda \`0\` soniga aylantiriladi.

**9. 0 === "" natijasi nima?**
\`false\` bo'ladi (biri number, ikkinchisi string).

**10. Nima uchun qat'iy tenglik (===) xavfsizroq?**
Avtomatik turlar o'zgarishi natijasida yuzaga keladigan yashirin mantiqiy xatolarning oldini oladi.

**11. false == "0" natijasi nima?**
\`true\` bo'ladi. Ikkala tomon ham \`0\` soniga aylantiriladi.

**12. Massivlarni tenglik operatori bilan tekshirib bo'ladimi?**
Massivlar havola (reference) turi bo'lgani uchun, \`[] === []\` xotiradagi manzillar boshqa-boshqaligi sababli \`false\` qaytaradi.
`,
  exercises: [
    {
      id: 1,
      title: "Tenglikni tekshiring",
      instruction: "100 sonini '100' matni bilan qat'iy tenglik (===) orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 100 === '100';",
      test: "if (res === false) return null; return 'Solishtirish noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "Loose equality sinovi",
      instruction: "100 sonini '100' matni bilan yumshoq tenglik (==) orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 100 == '100';",
      test: "if (res === true) return null; return 'Yumshoq tenglik true qaytarishi kerak!';"
    },
    {
      id: 3,
      title: "Null va Undefined loose",
      instruction: "null va undefined qiymatlarini == orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = null == undefined;",
      test: "if (res === true) return null; return 'null == undefined true bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Null va Undefined strict",
      instruction: "null va undefined qiymatlarini === orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = null === undefined;",
      test: "if (res === false) return null; return 'null === undefined false bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "NaN solishtirish",
      instruction: "NaN qiymatini o'zi bilan === orqali solishtirib natijani oling.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = NaN === NaN;",
      test: "if (res === false) return null; return 'NaN === NaN har doim false bo\\'ladi!';"
    },
    {
      id: 6,
      title: "Object.is NaN",
      instruction: "Object.is yordamida NaN qiymatlarini solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = Object.is(NaN, NaN);",
      test: "if (res === true) return null; return 'Object.is(NaN, NaN) true bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Zero comparison",
      instruction: "-0 va +0 sonlarini === yordamida solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = -0 === +0;",
      test: "if (res === true) return null; return '-0 === +0 true bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Object.is Zeros",
      instruction: "Object.is yordamida -0 va +0 sonlarini solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = Object.is(-0, +0);",
      test: "if (res === false) return null; return 'Object.is(-0, +0) false bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "String va Boolean loose",
      instruction: "'0' stringini false bulian qiymati bilan == orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '0' == false;",
      test: "if (res === true) return null; return '\"0\" == false true bo\\'lishi lozim!';"
    },
    {
      id: 10,
      title: "Bo'sh massiv va false",
      instruction: "[] massivini false bulian qiymati bilan == orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = [] == false;",
      test: "if (res === true) return null; return '[] == false true qaytaradi!';"
    },
    {
      id: 11,
      title: "Obyektlar reference solishtirish",
      instruction: "Ikki xil bo'sh obyekt {} va {} ni === orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = {} === {};",
      test: "if (res === false) return null; return '{} === {} har doim false, chunki ular alohida havolalardir!';"
    },
    {
      id: 12,
      title: "Bir xil reference",
      instruction: "obj o'zgaruvchisini yarating. Keyin res o'zgaruvchisiga obj === obj solishtirish natijasini bering.",
      startingCode: "const obj = { x: 1 };\n// Bu yerga yozing\nlet res = ",
      hint: "let res = obj === obj;",
      test: "if (res === true) return null; return 'Bir xil havola bo\\'lgani uchun true bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `NaN === NaN` va `Object.is(NaN, NaN)` amallari qanday qiymatlarni qaytaradi?",
      options: [
        "`true` va `true`",
        "`false` va `true` (chunki NaN o'z-o'ziga teng bo'lmagan yagona qiymatdir, lekin Object.is() algoritmi ularni aniq teng deb biladi)",
        "`true` va `false`",
        "`false` va `false`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript IEEE 754 standarti bo'yicha `NaN` qiymatini o'z-o'ziga teng emas deb hisoblaydi (`NaN === NaN` - false). Ammo ES6 da qo'shilgan `Object.is()` metodi bu qoidani to'g'irlab, `true` qaytaradi."
    },
    {
      id: 2,
      question: "Quyidagi loose equality (yumshoq tenglik) solishtiruvlaridan qaysi biri `false` qaytaradi?",
      options: [
        "`null == undefined`",
        "`0 == \"\"`",
        "`false == \"0\"`",
        "`null == 0` (null faqat undefined bilan == taqqoslanganda true qaytaradi, boshqa falsy qiymatlar bilan false beradi)"
      ],
      correctAnswer: 3,
      explanation: "`null` va `undefined` o'zaro teng deb olingan. Ammo `null` boshqa hech qanday falsy qiymatga (`0`, `false`, `\"\"`) `==` operatori bilan teng bo'la olmaydi."
    },
    {
      id: 3,
      question: "Ikki alohida bo'sh massiv `[] == []` yoki `[] === []` shaklida solishtirilsa, natija nima bo'ladi va nima uchun?",
      options: [
        "`true` (chunki ikkalasi ham bo'sh massivlar)",
        "`false` (chunki massivlar reference (havola) turiga kiradi va xotiradagi har xil manzillarga ishora qiladi)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Reference (havola) tipli ma'lumotlar (massivlar, obyektlar) solishtirilayotganda ularning ichki tarkibi emas, balki xotiradagi manzillari solishtiriladi. Ikki alohida massiv xotirada turlicha joylashgani uchun teng emas."
    },
    {
      id: 4,
      question: "JavaScript-da `Object.is(-0, +0)` ifodasi nima qaytaradi?",
      options: [
        "`true` (chunki 0 ning ishorasi farq qilmaydi)",
        "`false` (chunki Object.is() matematik jihatdan manfiy nol va musbat nolni alohida ajratib tekshiradi)",
        "`NaN`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "Qat'iy tenglik `===` operatori `-0 === +0` ni `true` deb baholasada, `Object.is()` algoritmi ularning ishorasini farqlab, `false` qaytaradi."
    },
    {
      id: 5,
      question: "`isNaN(x)` funksiyasi nima uchun kerak?",
      options: [
        "Qiymat string ekanligini tekshirish uchun",
        "Qiymat haqiqatan ham `NaN` (son emas) ekanligini tekshirish uchun, chunki `x === NaN` solishtiruvi har doim false beradi",
        "Faqat manfiy sonlarni aniqlash uchun",
        "Qiymatni songa o'tkazish uchun"
      ],
      correctAnswer: 1,
      explanation: "Chunki `NaN` o'z-o'ziga teng emasligi sababli, biror o'zgaruvchining qiymati son emasligini (`NaN` ligini) oddiy tenglik orqali tekshirib bo'lmaydi. Buning uchun maxsus `isNaN()` yoki `Number.isNaN()` funksiyasi ishlatiladi."
    },
    {
      id: 6,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nObject.is(null, undefined)\n```",
      options: [
        "true",
        "false",
        "TypeError",
        "null"
      ],
      correctAnswer: 1,
      explanation: "`Object.is()` qat'iy tenglikka yaqin ishlaydi. `null` va `undefined` har xil tiplar bo'lgani uchun natija `false` bo'ladi."
    },
    {
      id: 7,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\n[] == ![]\n```",
      options: [
        "true (chunki ![] false bo'ladi, [] esa songa o'girilganda 0 bo'ladi, false ham 0 ga o'girilib o'zaro tenglashadi)",
        "false",
        "TypeError",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "`![]` amali `false` qaytaradi. Shunda `[] == false` qoladi. Solishtirishda massiv stringga (`\"\"`), keyin songa (`0`) aylanadi. `false` ham `0` soniga aylanib, natijada `0 == 0` ya'ni `true` bo'ladi."
    },
    {
      id: 8,
      question: "JavaScriptda `typeof null` nima uchun `\"object\"` qaytaradi?",
      options: [
        "Chunki null haqiqatdan ham obyektdir",
        "Bu JavaScript yaratilishidagi tarixiy xatolik (bug) hisoblanadi",
        "Chunki u xotirani boshqaradi",
        "Chunki null massiv tipiga kiradi"
      ],
      correctAnswer: 1,
      explanation: "`typeof null === 'object'` bu JavaScriptning birinchi versiyasidan qolib ketgan va o'zgartirib bo'lmaydigan tarixiy xato (bug) hisoblanadi."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri global `isNaN()` va `Number.isNaN()` o'rtasidagi farqni to'g'ri tushuntiradi?",
      options: [
        "Hech qanday farq yo'q",
        "global `isNaN` o'z parametrini solishtirishdan oldin songa o'giradi (coercion), `Number.isNaN` esa turni o'girmasdan faqat NaN ekanligini qat'iy tekshiradi",
        "`Number.isNaN` faqat butun sonlarni tekshiradi",
        "global `isNaN` eskirgan va brauzerlar uni qo'llab-quvvatlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Global `isNaN('matn')` -> `true` qaytaradi, chunki `'matn'` songa o'tganda `NaN` bo'ladi. `Number.isNaN('matn')` -> `false` qaytaradi, chunki `'matn'` turi `number` emas."
    },
    {
      id: 10,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\n[1, 2] == \"1,2\"\n```",
      options: [
        "true",
        "false",
        "TypeError",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "Loose equality taqqoslashida `[1, 2]` massivi string ko'rinishiga, ya'ni `\"1,2\"`ga o'giriladi. Shuning uchun `\"1,2\" == \"1,2\"` bo'lib, `true` qaytadi."
    },
    {
      id: 11,
      question: "Quyidagi ifodaning natijasini toping:\n```javascript\nnull == false\n```",
      options: [
        "true",
        "false (chunki null faqat undefined bilan teng bo'la oladi)",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "`null` yumshoq tenglikda `false` bilan solishtirilganda songa aylanmaydi. U faqat `undefined`ga teng deb belgilangan."
    },
    {
      id: 12,
      question: "Reference turlarini solishtirish qoidalariga ko'ra qaysi biri to'g'ri?",
      options: [
        "Tarkibi bir xil bo'lgan massivlar doimo tengdir",
        "Ikki obyekt faqat xotiradagi bitta manzilga (reference) ishora qilgandagina teng bo'ladi",
        "Tarkibi bir xil obyektlar doimo qat'iy teng",
        "Obyektlar faqat == bilan teng bo'ladi, === ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript reference tipli qiymatlar uchun qiymat bo'yicha emas, balki xotiradagi manzillar bo'yicha tenglikni tekshiradi."
    }
  ]
};
