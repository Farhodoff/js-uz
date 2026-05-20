export const typeCasting = {
  id: "type-casting",
  title: "Explicit Type Casting (Aniq tiplarni o'zgartirish)",
  theory: `## 1. KIRISH
**Explicit Type Casting** – dasturchi tomonidan ma’lumot turini **aniq**, o‘zi yozgan kod orqali bir turdan boshqasiga o‘tkazish. JavaScriptda buning uchun maxsus funksiyalar va operatorlar mavjud.

**Type Casting** (yoki Explicit Conversion) — bu dasturchi o'z xohishi bilan bir turdagi ma'lumotni boshqa turga o'zgartirishidir. Bu "avtomatik" emas, balki "buyruq" asosida sodir bo'ladi.

## 1. NEGA kerak?
Ba'zan JS avtomatik ravishda turni noto'g'ri o'zgartirishi mumkin. Xatolarni oldini olish va natija aniq bo'lishi uchun biz o'zimiz "mana shu o'zgaruvchi hozir son bo'lsin" deb buyruq beramiz.

## 2. SODDALIK (Analogiya)
Buni **plastilin (loy)** deb tasavvur qiling. Plastilin o'zi bir shaklda turibdi, lekin siz uni qo'lingiz bilan ezib, yangi shakl (masalan, koptok) yasaysiz. Siz unga o'zingiz shakl berasiz.

## 3. STRUKTURA (Asosiy funksiyalar)

### A. Number() – Songa o'tkazish
Hammasini songa aylantirishga harakat qiladi:
\`\`\`javascript
Number("123"); // 123
Number("12.5"); // 12.5
Number("abc"); // NaN
\`\`\`

### B. String() – Matnga o'tkazish
Istalgan narsani matn qiladi:
\`\`\`javascript
String(100); // "100"
String(true); // "true"
String(null); // "null"
\`\`\`

### C. Boolean() – Mantiqiy qiymatga o'tkazish
\`\`\`javascript
Boolean(1); // true
Boolean(0); // false
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let r = "50.5px";
console.log(parseFloat(r)); // 50.5 (son qismini oladi)
console.log(parseInt(r));   // 50 (faqat butun qismini oladi)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **.toString() va null:** \`null.toString()\` deb yozsangiz xato (Error) beradi. Lekin \`String(null)\` xato bermaydi, shunchaki \`"null"\` matnini qaytaradi. Har doim \`String()\` ishlatish xavfsizroq.
2. **Bo'sh massiv:** \`Number([])\` natijasi \`0\` bo'ladi. Bu kutilmagan natija bo'lishi mumkin!

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Type Casting (Aniq o'zgartirish) nima?**
Type Casting (aniq o'zgartirish) — bu dasturchi tomonidan maxsus funksiyalar yoki operatorlar yordamida qiymat turining bir ko'rinishdan boshqasiga aniq o'zgartirilishi (masalan, \`Number()\`, \`String()\` orqali).


**2. Number() va parseInt() farqi nimada?**
\`Number()\` butun matnni songa o'tkazadi va agar matnda bitta bo'lsa ham harf bo'lsa \`NaN\` qaytaradi. \`parseInt()\` esa matnning boshidagi sonlarni ajratib oladi (masalan, \`"100px"\` dan \`100\` ajratadi).


**3. parseFloat() qachon ishlatiladi?**
Matndan o'nli kasr sonlarni ajratib olish kerak bo'lganda ishlatiladi (masalan, \`"12.5rem"\` dan \`12.5\` sonini ajratadi).


**4. String() va .toString() farqi nimada?**
\`String()\` global funksiya bo'lib, har qanday qiymatni, jumladan \`null\` va \`undefined\` ni ham xatolarsiz matnga o'gira oladi. \`.toString()\` esa metod bo'lib, \`null\` va \`undefined\` da chaqirilganda xato (\`TypeError\`) beradi.


**5. Nima uchun null.toString() ishlamaydi?**
Chunki \`null\` (va \`undefined\`) primitiv qiymat bo'lib, ularda hech qanday metod yoki xususiyat, jumladan \`.toString()\` metodi mavjud emas.


**6. Unary plus (+) operatori nima qiladi?**
Unary plus (\`+\`) operatori o'zidan keyin kelgan qiymatni tezkor ravishda songa o'tkazadi (masalan, \`+"5"\` natijasi \`5\` soni bo'ladi). Bu \`Number()\` bilan bir xil ishlaydi.


**7. Boolean(undefined) natijasi nima bo'ladi?**
Natija \`false\` bo'ladi. Chunki \`undefined\` JavaScript-dagi "falsy" (yolg'on) qiymatlar ro'yxatiga kiradi.


**8. Number(true) natijasi nima bo'ladi?**
Natija \`1\` bo'ladi.


**9. Number(false) natijasi nima bo'ladi?**
Natija \`0\` bo'ladi.


**10. Matn ichida raqamdan keyin harf bo'lsa ("100kg"), Number() nima qaytaradi?**
Natija \`NaN\` (Not a Number) bo'ladi. Chunki \`Number()\` funksiyasi matnni to'liq son qiling o'gira olmasa, \`NaN\` qaytaradi.


**11. parseInt("100kg") nima qaytaradi?**
Natija \`100\` soni bo'ladi. Chunki \`parseInt()\` matn boshidagi barcha raqamlarni ajratib oladi va harfga yetganda to'xtaydi.


**12. "Double bang" (!!) operatori nima vazifani bajaradi?**
\`!!\` operatori har qanday qiymatni unga mos keluvchi mantiqiy (\`boolean\`) qiymatga (\`true\` yoki \`false\` ga) tezkor o'tkazish uchun ishlatiladi (bu \`Boolean()\` bilan bir xil).
`,
  exercises: [
    {
      id: 1,
      title: "Butun sonni olish",
      instruction: "'100px' matnidan faqat butun son qismini ajratib oling.",
      startingCode: "let val = '100px';\n// Bu yerda yozing\nlet res = ",
      hint: "let res = parseInt(val);",
      test: "if (res === 100) return null; return 'Faqat 100 chiqishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`parseInt(\"100px\")` va `Number(\"100px\")` amallarining natijalari mos ravishda qanday bo'ladi?",
      options: [
        "`100` va `100`",
        "`100` va `NaN` (chunki parseInt faqat boshidagi sonni ajratib oladi, Number esa butun boshli satrni son qila olmasa NaN qaytaradi)",
        "`NaN` va `100`",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "`parseInt()` satr boshidagi sonlarni tahlil qilib, ularni ajratib oladi (`100`). `Number()` esa satrni to'liqligicha songa aylantirishga harakat qiladi va unda raqam bo'lmagan belgilar bo'lsa, `NaN` qaytaradi."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri ishga tushirilganda `TypeError` xatosi (error) yuz beradi?",
      options: [
        "`String(null)`",
        "`null.toString()` (chunki null va undefined qiymatlarida toString() metodi mavjud emas)",
        "`String(undefined)`",
        "`+(null)`"
      ],
      correctAnswer: 1,
      explanation: "`null` va `undefined` qiymatlari obyekt bo'lmaganligi uchun ularda `.toString()` metodini chaqirib bo'lmaydi. Lekin `String()` global funksiyasi ularni xatosiz string ko'rinishiga o'tkazadi."
    },
    {
      id: 3,
      question: "`Number([])` va `Number([5])` o'zgarishlarining natijalari qanday bo'ladi?",
      options: [
        "`NaN` va `NaN`",
        "`0` va `5`",
        "`0` va `NaN`",
        "`undefined` va `5`"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh massiv `[]` songa o'girilganda `0` ga aylanadi. Yagona elementli `[5]` massivi esa uning ichidagi elementga qarab `5` soniga o'zgaradi."
    },
    {
      id: 4,
      question: "JavaScript-da \"Double bang\" (`!!`) operatori qanday vazifani bajaradi?",
      options: [
        "Qiymatni ikkala tomonga ko'paytiradi",
        "Istalgan turdagi qiymatni tez va oson tarzda unga mos Boolean (true/false) turiga o'tkazadi",
        "Sonlarni solishtiradi",
        "Matnni tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "Birinchi inkor belgisi `!` qiymatni teskari boolean turiga o'tkazadi, ikkinchi `!` esa uni yana asl mantiqiy ko'rinishiga qaytaradi (aslida `Boolean(qiymat)` bilan bir xil ishlaydi)."
    },
    {
      id: 5,
      question: "`Number(true)` va `Number(false)` natijalari mos ravishda qanday chiqadi?",
      options: [
        "`1` va `0`",
        "`true` va `false`",
        "`NaN` va `NaN`",
        "`1` va `-1`"
      ],
      correctAnswer: 0,
      explanation: "Mantiqiy `true` qiymati sonli ifodada `1` ga, mantiqiy `false` qiymati esa `0` ga teng deb hisoblanadi."
    }
  ]
};
