export const typeConversionLesson = {
  id: "type-conversion",
  title: "Type Conversion (Tiplarni o'zgartirish)",
  level: "Beginner",
  description: "JavaScriptda ma'lumot turlarini bir turdan ikkinchisiga o'zgartirish (konvertatsiya qilish) tamoyillari.",
  theory: `## 1. NEGA kerak?
JavaScriptda ba'zan bir turdagi ma'lumotni boshqa turga o'tkazish kerak bo'ladi. Masalan, foydalanuvchi saytda yoshini yozsa, u bizga **matn** bo'lib keladi, biz esa uni **son**ga aylantirib hisob-kitob qilishimiz kerak. Agar \`"5"\` (matn) va \`5\` (son) ni o'zgartirmasdan qo'shsak, \`"5" + 5 = "55"\` bo'lib qoladi. Bizga esa natija \`10\` bo'lishi kerak. Buning uchun biz matnni songa o'tkazib olishimiz shart.

## 2. SODDALIK (Analogiya)
Buni **tarjimonlikka** o'xshatish mumkin. Ingliz tilidagi so'zni o'zbekchaga tarjima qilsangiz, ma'nosi bir xil qoladi, lekin shakli o'zgaradi. Ma'lumotlarni o'zgartirish ham shunday — qiymat o'sha-o'sha, faqat "kiyimi" (turi) o'zgaradi.

## 3. STRUKTURA
Ma'lumot turlarini o'zgartirish ikki xil bo'ladi:
1. **Explicit (Aniq/Qo'lda):** Dasturchi kodda aniq ko'rsatadi (masalan, \`Number(val)\`).
2. **Implicit (Avtomatik):** JavaScript fonda o'zi bajaradi (masalan, \`"5" * 2\` ko'paytirish uchun matnni songa o'tkazadi).

Asosiy o'zgartirish funksiyalari:
- **String(qiymat) yoki qiymat.toString():** Matnga o'tkazish.
- **Number(qiymat) yoki +qiymat:** Songa o'tkazish.
- **Boolean(qiymat):** Mantiqiy (rost/yolg'on) qiymatga o'tkazish.

## 4. AMALIYOT (Mashqlar pastda)
\`\`\`javascript
let a = "10";
let b = "20";
console.log(Number(a) + Number(b)); // 30 (matnlar songa o'tdi)
console.log(String(100));           // "100" (son matnga o'tdi)
console.log(Boolean(1));            // true (mantiqiy rost)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **NaN xatosi:** Agar matn ichida harf bo'lsa va uni songa o'tkazmoqchi bo'lsangiz, natija \`NaN\` chiqadi: \`Number("salom")\` — \`NaN\` ❌.
2. **Bo'sh joyli matn:** \`Number("  ")\` natijasi \`0\` bo'ladi. Bu g'alati, lekin JS shunday ishlaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Turni o'zgartirish (Type Conversion) nima?**
Qiymatni bir ma'lumot turidan boshqasiga o'tkazish jarayonidir (masalan, "5" ni 5 ga yoki aksincha).

**2. Nima uchun "5" + 5 natijasi 55 chiqadi?**
Chunki JavaScriptda plus (+) belgisi satrlarni birlashtirish (concatenation) amalini ham bajaradi. Agar operanlardan biri satr bo'lsa, JS sonni satrga aylantirib, ularni yopishtirib qo'yadi.

**3. Qo'lda (Explicit) va Avtomatik (Implicit) o'zgartirish farqi nima?**
Qo'lda o'zgartirish dasturchi tomonidan aniq funksiyalar (Number(), String()) yordamida bajariladi. Avtomatik o'zgartirish esa JS dvigateli tomonidan fonda avtomatik bajariladi (masalan, "5" * 2 = 10).

**4. Sonni matnga o'tkazishning 2 ta usulini ayting.**
1. String(son) global funksiyasidan foydalanish.
2. son.toString() metodidan foydalanish.

**5. Matnni songa o'tkazishning eng qisqa usuli qaysi (+)?**
Unary plus (+) operatoridan foydalanish. Masalan: let son = +"42".

**6. parseInt() va Number() farqi nimada?**
Number() matn to'liq raqamlardan iborat bo'lsagina songa o'giradi (aks holda NaN). parseInt() esa matnning boshidagi sonlarni ajratib oladi ("12px" dan 12 ajratadi).

**7. Boolean(0) natijasi nima bo'ladi?**
Natija false bo'ladi.

**8. Boolean("0") natijasi nima bo'ladi?**
Natija true bo'ladi, chunki "0" bo'sh bo'lmagan matn bo'lib, har qanday bo'sh bo'lmagan matn JSda rost (truthy) qiymat hisoblanadi.

**9. Falsy (yolg'on) qiymatlarni sanab bering.**
JavaScriptda faqatgina 6 ta falsy qiymat bor: false, 0 (va -0, 0n), "" (bo'sh string), null, undefined, va NaN. Boshqa barcha qiymatlar truthy hisoblanadi.

**10. Number(null) natijasi nima bo'ladi?**
Natija 0 bo'ladi.

**11. Number(undefined) natijasi nima bo'ladi?**
Natija NaN bo'ladi.

**12. String(true) natijasi nima bo'ladi?**
Natija "true" (string tipidagi matn) bo'ladi.
`,
  exercises: [
    {
      id: 1,
      title: "Son qilish",
      instruction: "'str' o'zgaruvchisini songa o'tkazing va 'num' o'zgaruvchisiga saqlang.",
      startingCode: "let str = '123';\n// Bu yerga yozing\nlet num = ",
      hint: "let num = Number(str); yoki let num = +str;",
      test: "if (typeof num === 'number' && num === 123) return null; return 'Noto\\'g\\'ri o\\'tkazildi!';"
    },
    {
      id: 2,
      title: "Matn qilish",
      instruction: "num o'zgaruvchisini String() yordamida matnga o'tkazing va uni str o'zgaruvchisiga saqlang.",
      startingCode: "let num = 456;\n// Bu yerga yozing\nlet str = ",
      hint: "let str = String(num);",
      test: "if (typeof str === 'string' && str === '456') return null; return 'Noto\\'g\\'ri o\\'tkazildi!';"
    },
    {
      id: 3,
      title: "Matnlarni qo'shish xatoligini to'g'rilash",
      instruction: "Foydalanuvchidan kelgan a va b matnli qiymatlarini songa o'tkazib, ularning yig'indisini sum o'zgaruvchisiga saqlang.",
      startingCode: "let a = '15';\nlet b = '25';\n// Bu yerga yozing\nlet sum = ",
      hint: "let sum = Number(a) + Number(b);",
      test: "if (sum === 40) return null; return 'sum 40 bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Mantiqiy qiymatga o'tkazish",
      instruction: "val o'zgaruvchisini Boolean() orqali mantiqiy qiymatga o'tkazing va bool o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let val = 1;\n// Bu yerga yozing\nlet bool = ",
      hint: "let bool = Boolean(val);",
      test: "if (bool === true) return null; return 'bool true bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Qisqa usulda songa o'tkazish",
      instruction: "price o'zgaruvchisini unary plus (+) operatori yordamida songa o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let price = '99.9';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = +price;",
      test: "if (res === 99.9) return null; return 'res 99.9 bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "NaN tekshiruvi",
      instruction: "Number('salom') natijasi NaN ekanligini isNaN() yordamida aniqlang va uni check o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet check = ",
      hint: "let check = isNaN(Number('salom'));",
      test: "if (check === true) return null; return 'check true bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "toString() metodidan foydalanish",
      instruction: "age o'zgaruvchisini .toString() metodi yordamida matnga o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let age = 18;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = age.toString();",
      test: "if (res === '18') return null; return 'res \"18\" bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Massivni String qilish",
      instruction: "arr o'zgaruvchisini String() yordamida matnga o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let arr = [1, 2, 3];\n// Bu yerga yozing\nlet res = ",
      hint: "let res = String(arr);",
      test: "if (res === '1,2,3') return null; return 'res \"1,2,3\" bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Boolean(0) qiymatini tekshirish",
      instruction: "num o'zgaruvchisini Boolean() orqali o'tkazing va boolVal o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let num = 0;\n// Bu yerga yozing\nlet boolVal = ",
      hint: "let boolVal = Boolean(num);",
      test: "if (boolVal === false) return null; return 'boolVal false bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Bo'sh joyli matnni Boolean qilish",
      instruction: "Bo'sh joylardan iborat spaceStr matnini Boolean() orqali o'tkazib res o'zgaruvchisiga yozing.",
      startingCode: "let spaceStr = '   ';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Boolean(spaceStr);",
      test: "if (res === true) return null; return 'res true bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Mantiqiy qiymatni string qilish",
      instruction: "bool o'zgaruvchisini String() yordamida string ko'rinishiga keltiring va res o'zgaruvchisiga saqlang.",
      startingCode: "let bool = false;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = String(bool);",
      test: "if (res === 'false') return null; return 'res \"false\" bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "O'nli kasr matnni songa o'tkazish",
      instruction: "percent o'zgaruvchisini Number() yordamida o'nli kasr songa o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let percent = '85.5';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Number(percent);",
      test: "if (res === 85.5) return null; return 'res 85.5 bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Boolean(\"0\")` va `Boolean(\"\")` qiymatlarining natijasi nima bo'ladi?",
      options: [
        "`false` va `false`",
        "`true` va `false` (chunki ichida belgi bor string har doim truthy, bo'sh string esa falsy)",
        "`true` va `true`",
        "`TypeError` yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh bo'lmagan har qanday satr, hatto u nol belgisi `\"0\"` yoki bo'sh joy `\" \"` bo'lsa ham truthy (rost) hisoblanadi. Mutlaqo bo'sh satr `\"\"` esa falsy (yolg'on) qiymat beradi."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri matn ko'rinishidagi sonni eng qisqa usulda Number turiga o'zgartiradi?",
      options: [
        "`Number(str)`",
        "`parseInt(str)`",
        "`+str`",
        "`str.toNumber()`"
      ],
      correctAnswer: 2,
      explanation: "Unary plus (`+`) operatori o'zgaruvchidan oldin qo'yilganda, uni juda tez va qisqa usulda songa o'tkazish imkonini beradi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri mantiqiy false (falsy) qiymat hisoblanmaydi?",
      options: [
        "`0`",
        "`null`",
        "`\" \"` (ichida bo'sh joy bo'lgan string)",
        "`undefined`"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da 6 ta falsy qiymat bor: `false`, `0`, `\"\"` (bo'sh string), `null`, `undefined`, va `NaN`. Ichida bo'sh joy bo'lgan string `\" \"` bo'sh hisoblanmaydi va u rost (truthy) qiymat qaytaradi."
    },
    {
      id: 4,
      question: "`Number(null)` va `Number(undefined)` chaqirilganda qanday qiymatlar hosil bo'ladi?",
      options: [
        "`0` va `NaN`",
        "`NaN` va `0`",
        "`0` va `0`",
        "`NaN` va `NaN`"
      ],
      correctAnswer: 0,
      explanation: "`null` obyekti sonli qiymat sifatida `0` ga aylanadi, lekin aniqlanmagan qiymat bo'lgan `undefined` esa songa o'girilganda mantiqan `NaN` (Not a Number) beradi."
    },
    {
      id: 5,
      question: "`String(true)` metodidan qaytadigan natijaning turi va qiymati qanday?",
      options: [
        "Boolean turidagi `true`",
        "String turidagi `\"true\"`",
        "Number turidagi `1`",
        "Undefined"
      ],
      correctAnswer: 1,
      explanation: "`String()` metodi uzatilgan boolean rostlik qiymatini shunchaki harfli matnga aylantiradi, ya'ni natija string turidagi `\"true\"` bo'ladi."
    },
    {
      id: 6,
      question: "`String(null)` va `String(undefined)` ifodalarining natijalari qanday?",
      options: [
        "`\"null\"` va `\"undefined\"` (chunki global String() funksiyasi xato bermay qiymatlarni shunchaki matnga aylantiradi)",
        "`TypeError` xatosi sodir bo'ladi",
        "`\"\"` (bo'sh matn) qaytariladi",
        "`NaN` va `NaN`"
      ],
      correctAnswer: 0,
      explanation: "`String()` global funksiyasi har qanday turni xavfsiz tarzda matnga o'zgartiradi, shu jumladan `null` va `undefined` mos ravishda `\"null\"` va `\"undefined\"` matnlarini beradi."
    },
    {
      id: 7,
      question: "Implicit (avtomatik) va Explicit (aniq) type conversion orasidagi farq nima?",
      options: [
        "Avtomatik conversion faqat sonlar bilan ishlaydi, Explicit esa faqat obyektlar bilan",
        "Implicit JS dvigateli tomonidan fonda avtomatik amalga oshiriladi (masalan, `\"5\" * 2` -> 10), Explicit esa dasturchi buyrug'i bilan (`Number()`, `String()` va h.k.) amalga oshiriladi",
        "Hech qanday farq yo'q, ikkalasi ham bir xil ishlaydi",
        "Implicit usulda xatoliklar ko'p bo'ladi, Explicit esa hech qachon ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Implicit o'zgartirish JavaScript dvigateli o'zgaruvchi turini kontekstga qarab avtomatik o'zgartirganda (masalan, ko'paytirish operatorida satrni songa aylantirish) sodir bo'ladi. Explicit esa dasturchi kodda aniq ko'rsatganda yuz beradi."
    },
    {
      id: 8,
      question: "Quyidagi ifodaning natijasi nima bo'ladi: `Boolean(NaN)`?",
      options: [
        "`true`",
        "`false` (chunki NaN JavaScript-dagi falsy qiymatlardan biridir)",
        "`NaN`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda `NaN` (Not a Number) mantiqiy kontekstda `false` (falsy) qiymat qaytaradi."
    },
    {
      id: 9,
      question: "Quyidagi kod ishga tushirilganda konsolga nima chiqadi:\n```javascript\nconsole.log(typeof String([1, 2]));\n```",
      options: [
        "`\"object\"`",
        "`\"string\"` (chunki massiv String() funksiyasi yordamida \"1,2\" matniga o'girildi)",
        "`\"number\"`",
        "`\"array\"`"
      ],
      correctAnswer: 1,
      explanation: "`String([1, 2])` natijasida `\"1,2\"` matni hosil bo'ladi va uning turi `\"string\"` bo'ladi."
    },
    {
      id: 10,
      question: "Quyidagi kod natijasi nima bo'ladi: `Number(\" 42 \")`?",
      options: [
        "`NaN` (bo'shliqlar bo'lgani sababli)",
        "`42` (bo'shliqlar avtomatik tozalab tashlanadi)",
        "`0`",
        "`SyntaxError`"
      ],
      correctAnswer: 1,
      explanation: "`Number()` funksiyasi matn boshidagi va oxiridagi bo'shliqlarni e'tiborga olmaydi, shuning uchun `\" 42 \"` to'g'ri o'girilib `42` sonini beradi."
    },
    {
      id: 11,
      question: "Quyidagi kod natijasi nima bo'ladi: `Number([1, 2])`?",
      options: [
        "`12`",
        "`NaN` (chunki massivda bir nechta element bor va u to'g'ridan-to'g'ri son bo'la olmaydi)",
        "`[1, 2]`",
        "`0`"
      ],
      correctAnswer: 1,
      explanation: "Agar massivda bir nechta element bo'lsa, u songa o'girilganda `NaN` qaytaradi, chunki `\"1,2\"` matni to'g'ridan-to'g'ri son bo'la olmaydi."
    },
    {
      id: 12,
      question: "JavaScript-da qaysi qiymat Boolean turiga o'tkazilganda `true` qiymatini beradi?",
      options: [
        "`undefined`",
        "`{}` (bo'sh obyekt, chunki barcha obyektlar truthy)",
        "`\"\"` (bo'sh string)",
        "`0`"
      ],
      correctAnswer: 1,
      explanation: "`{}` bo'sh obyekt bo'lib, JavaScriptda har qanday obyekt (bo'sh bo'lsa ham) truthy, ya'ni `true` qiymatini beradi. Qolgan uchta variant falsy qiymatlardir."
    }
  ]
};
