export const typeCasting = {
  id: "type-casting",
  title: "Explicit Type Casting (Aniq tiplarni o'zgartirish)",
  level: "Beginner",
  description: "JavaScriptda ma'lumot turlarini dasturchi tomonidan aniq (explicit) ravishda bir turdan ikkinchi turga o'tkazish qoidalari.",
  theory: `## 1. NEGA kerak?
JavaScript ba'zan turlarni avtomatik (implicit) tarzda biz kutmagan shaklda o'zgartirib yuborishi mumkin. Dasturda xatoliklarning oldini olish va natija 100% aniq va to'g'ri bo'lishini ta'minlash uchun biz o'zgaruvchi turini maxsus funksiyalar yordamida **aniq (explicit)** ravishda o'zgartiramiz.

## 2. SODDALIK (Analogiya)
Buni **plastilin (loy)** deb tasavvur qiling. Plastilin o'zi ma'lum bir shaklda turibdi, lekin siz uni qo'lingiz bilan ezib, yangi shakl (masalan, koptok yoki kub) yasaysiz. Siz uning turini o'z qo'lingiz bilan o'zgartirmoqdasiz.

## 3. STRUKTURA
JavaScriptda aniq turni o'zgartirish (type casting) uchun quyidagi global funksiyalardan foydalaniladi:
- **Number(qiymat):** Qiymatni songa o'tkazadi.
- **String(qiymat):** Qiymatni matnga (string) o'tkazadi.
- **Boolean(qiymat):** Qiymatni true yoki false ga o'tkazadi.

Bundan tashqari matnlardan sonlarni ajratish metodlari mavjud:
- **parseInt(matn):** Matn boshidagi butun sonni ajratadi.
- **parseFloat(matn):** Matn boshidagi o'nli kasr sonni ajratadi.

## 4. AMALIYOT (Mashqlar pastda)
\`\`\`javascript
let str = "12.34px";
console.log(parseInt(str));   // 12 (butun son)
console.log(parseFloat(str)); // 12.34 (kasr son)
console.log(Number(str));     // NaN (chunki harflar bor)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **null.toString() ishlatish:** null va undefined qiymatlari obyekt emas, shuning uchun ularda \`.toString()\` metodini chaqirish xato (\`TypeError\`) beradi. Buning o'rniga xavfsiz bo'lgan \`String(null)\` global funksiyasidan foydalanish kerak.
2. **Bo'sh massiv va obyektni songa o'tkazish:** \`Number([])\` natijasi 0 bo'ladi, lekin \`Number({})\` natijasi \`NaN\` bo'ladi. Bu kutilmagan mantiqiy xatolarga olib kelishi mumkin.

## 6. SAVOLLAR VA JAVOBLAR
**1. Type Casting (Aniq o'zgartirish) nima?**
Dasturchi tomonidan maxsus funksiyalar yoki operatorlar yordamida qiymat turining bir ko'rinishdan boshqasiga aniq o'zgartirilishi.

**2. Number() va parseInt() farqi nimada?**
Number() butun matnni son qilishga urinadi, agar harf bo'lsa NaN qaytaradi. parseInt() esa matn boshidagi sonlarni ajratib oladi va harfga yetsa to'xtaydi.

**3. parseFloat() qachon ishlatiladi?**
Matndan o'nli kasr sonlarni (masalan: "12.5rem" -> 12.5) ajratib olish kerak bo'lganda.

**4. String() va .toString() farqi nimada?**
String() global funksiya bo'lib, null va undefined ni ham xatosiz matnga o'tkazadi. .toString() esa metod bo'lib, null va undefined da xato beradi.

**5. Nima uchun null.toString() xato beradi?**
Chunki null va undefined qiymatlarida metodlar mavjud emas (chunki ular obyekt emas).

**6. Unary plus (+) operatori nima qiladi?**
O'zidan keyin kelgan qiymatni tezkor ravishda songa o'tkazadi (masalan, +"5" -> 5 soni).

**7. Boolean(undefined) natijasi nima bo'ladi?**
false bo'ladi, chunki undefined falsy (yolg'on) qiymat hisoblanadi.

**8. Number(true) va Number(false) nima qaytaradi?**
Mos ravishda 1 va 0 qaytaradi.

**9. Matn ichida raqamdan keyin harf bo'lsa ("100kg"), Number() nima qaytaradi?**
NaN (Not a Number) qaytaradi, chunki matnda son bo'lmagan belgilar bor.

**10. parseInt("100kg") nima qaytaradi?**
100 sonini qaytaradi.

**11. "Double bang" (!!) operatori nima vazifani bajaradi?**
Qiymatni mantiqiy (boolean) turga tezkor o'zgartirish uchun ishlatiladi (Boolean() kabi).

**12. Number(null) va Number(undefined) natijalari nimaga teng?**
Number(null) -> 0 ga teng, Number(undefined) -> NaN ga teng.
`,
  exercises: [
    {
      id: 1,
      title: "Butun sonni olish",
      instruction: "'100px' matnidan faqat butun son qismini ajratib oling va res o'zgaruvchisiga saqlang.",
      startingCode: "let val = '100px';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = parseInt(val);",
      test: "if (res === 100) return null; return 'Faqat 100 chiqishi kerak!';"
    },
    {
      id: 2,
      title: "Kasr sonni ajratish",
      instruction: "size o'zgaruvchisidan parseFloat yordamida o'nli kasr sonni ajratib oling va natijani res o'zgaruvchisiga saqlang.",
      startingCode: "let size = '1.75em';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = parseFloat(size);",
      test: "if (res === 1.75) return null; return 'res 1.75 bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Unary plus orqali songa o'tkazish",
      instruction: "str o'zgaruvchisini unary plus (+) operatori yordamida songa o'tkazing va uni num o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let str = '42';\n// Bu yerga yozing\nlet num = ",
      hint: "let num = +str;",
      test: "if (num === 42) return null; return 'num 42 soni bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Xavfsiz matnga o'tkazish",
      instruction: "val o'zgaruvchisining qiymatini String() funksiyasi yordamida matnga o'tkazing va uni res o'zgaruvchisiga saqlang.",
      startingCode: "let val = null;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = String(val);",
      test: "if (res === 'null') return null; return 'res \"null\" bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Boolean o'tkazish (Double bang)",
      instruction: "user o'zgaruvchisini !! (double bang) yordamida boolean qiymatga o'tkazing va uni isLoggedIn o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let user = 'Anvar';\n// Bu yerga yozing\nlet isLoggedIn = ",
      hint: "let isLoggedIn = !!user;",
      test: "if (isLoggedIn === true) return null; return 'isLoggedIn true bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Mantiqiy qiymatni songa o'tkazish",
      instruction: "flag o'zgaruvchisini Number() yordamida songa o'tkazing va uni res o'zgaruvchisiga saqlang.",
      startingCode: "let flag = true;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Number(flag);",
      test: "if (res === 1) return null; return 'res 1 bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Massiv elementini songa o'tkazish",
      instruction: "arr massividagi qiymatni Number() funksiyasi yordamida songa o'tkazing va uni res o'zgaruvchisiga saqlang.",
      startingCode: "let arr = [7];\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Number(arr);",
      test: "if (res === 7) return null; return 'res 7 bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Obyektni matnga o'girish",
      instruction: "obj o'zgaruvchisini String() yordamida matnga o'tkazing va uni res o'zgaruvchisiga saqlang.",
      startingCode: "let obj = {};\n// Bu yerga yozing\nlet res = ",
      hint: "let res = String(obj);",
      test: "if (res === '[object Object]') return null; return 'res \"[object Object]\" bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "NaN ekanligini tekshirish",
      instruction: "Number('abc') natijasini NaN ekanligini isNaN() yordamida tekshiring va natijani check o'zgaruvchisiga saqlang.",
      startingCode: "let val = 'abc';\n// Bu yerga yozing\nlet check = ",
      hint: "let check = isNaN(Number(val));",
      test: "if (check === true) return null; return 'check true bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "toString() metodini qo'llash",
      instruction: "num o'zgaruvchisini .toString() metodi orqali matnga o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let num = 256;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = num.toString();",
      test: "if (res === '256') return null; return 'res \"256\" bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Falsy qiymatni Boolean qilish",
      instruction: "empty o'zgaruvchisini Boolean() funksiyasi yordamida mantiqiy qiymatga o'tkazing va res o'zgaruvchisiga saqlang.",
      startingCode: "let empty = '';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Boolean(empty);",
      test: "if (res === false) return null; return 'res false bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Undefinedni songa o'tkazish",
      instruction: "undef o'zgaruvchisini Number() yordamida songa o'tkazing va natijani res o'zgaruvchisiga saqlang.",
      startingCode: "let undef = undefined;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = Number(undef);",
      test: "if (Number.isNaN(res)) return null; return 'res NaN bo\\'lishi kerak!';"
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
    },
    {
      id: 6,
      question: "`Number(null)` va `Number(undefined)` natijalari qanday bo'ladi?",
      options: [
        "`0` va `NaN` (chunki null bo'shlikni anglatib 0 bo'ladi, undefined esa noaniqligi sababli NaN bo'ladi)",
        "`NaN` va `0`",
        "`0` va `0`",
        "`TypeError` xatoligi sodir bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "`Number(null)` ifodasi `0` qaytaradi. Biroq `undefined` aniqlanmagan qiymat bo'lgani uchun uni songa o'tkazganda `NaN` olinadi."
    },
    {
      id: 7,
      question: "Quyidagi qaysi qiymat `Boolean()` funksiyasiga kiritilganda `true` qaytaradi?",
      options: [
        "`\"0\"` (chunki bo'sh bo'lmagan matn har doim truthy hisoblanadi)",
        "`0` (son)",
        "`null`",
        "`\"\"` (bo'sh matn)"
      ],
      correctAnswer: 0,
      explanation: "JavaScriptda faqat falsy qiymatlar (0, -0, 0n, '', null, undefined, NaN, false) `false` ga aylanadi. `\"0\"` esa bo'sh bo'lmagan matn bo'lgani uchun `true` qaytaradi."
    },
    {
      id: 8,
      question: "Quyidagi kodning natijasi nima bo'ladi:\n```javascript\nlet x = \"   15   \";\nconsole.log(Number(x));\n```",
      options: [
        "`NaN` (chunki matnda bo'shliqlar bor)",
        "`15` (chunki Number() matn boshidagi va oxiridagi bo'shliqlarni inobatga olmaydi)",
        "`\"15\"`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "`Number()` funksiyasi matn boshidagi va oxiridagi bo'shliqlarni olib tashlab, ichidagi sonni o'gira oladi. Agar matn ichida (o'rtasida) bo'shliq bo'lsa, unda `NaN` bo'lardi."
    },
    {
      id: 9,
      question: "`parseInt(\"g100\")` kodi nima qaytaradi?",
      options: [
        "`100`",
        "`NaN` (chunki birinchi belgi raqam emas, shuning uchun parseInt tahlilni boshlay olmaydi)",
        "`g100`",
        "`TypeError` xatosi beradi"
      ],
      correctAnswer: 1,
      explanation: "`parseInt()` matnning faqat birinchi belgisidan boshlab sonlarni tahlil qiladi. Agar birinchi belgi son bo'lmasa, u darhol `NaN` qaytaradi."
    },
    {
      id: 10,
      question: "`String({})` ifodasi nima qaytaradi?",
      options: [
        "`\"{}\"`",
        "`\"[object Object]\"` (chunki obyektlar standart tarzda shunday matn ko'rinishiga o'tadi)",
        "`NaN`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda oddiy obyektni matnga o'tkazganda u har doim `\"[object Object]\"` natijasini qaytaradi."
    },
    {
      id: 11,
      question: "Quyidagi kod natijasi qanday bo'ladi:\n```javascript\nlet res = +\"12.34\";\nconsole.log(typeof res);\n```",
      options: [
        "`\"string\"`",
        "`\"number\"` (chunki unary plus operatori uni songa o'tkazdi)",
        "`\"boolean\"`",
        "`\"undefined\"`"
      ],
      correctAnswer: 1,
      explanation: "Unary plus (`+`) operatori matnni songa o'tkazadi, shu sababli `typeof res` natijasi `\"number\"` bo'ladi."
    },
    {
      id: 12,
      question: "`Boolean([])` ifodasining qiymati nimaga teng?",
      options: [
        "`false`",
        "`true` (chunki massivlar har doim obyekt hisoblanadi va barcha obyektlar truthy hisoblanadi)",
        "`NaN`",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "Massivlar (hatto bo'sh bo'lsa ham) obyektdir. JavaScriptda barcha obyektlar (shu jumladan bo'sh massivlar va bo'sh obyektlar) `Boolean` kontekstida har doim `true` qiymatini beradi."
    }
  ]
};
