export const moreDataTypesLesson = {
  id: "more-data-types",
  title: "Ma'lumotlar Turlari: Null, Symbol, BigInt",
  level: "Beginner",
  description: "JavaScriptdagi maxsus va yordamchi ma'lumotlar turlari: null qiymati, unikal Symbollar va o'ta katta BigInt sonlar.",
  theory: `## 1. NEGA kerak?
- **Null:** Ba'zan biz o'zgaruvchi borligini, lekin uning ichi ataylab bo'shatib qo'yilganligini ko'rsatishimiz kerak.
- **BigInt:** Oddiy \`Number\` turi ma'lum bir kattalikdagi sonlardan keyin aniqlikni yo'qotib, noto'g'ri hisoblaydi. Juda katta sonlar (masalan, kriptografiya yoki katta ma'lumotlar bilan ishlash) uchun \`BigInt\` kerak.
- **Symbol:** Obyektlar ichida bir-biriga o'xshamaydigan, mutlaqo unikal (yagona) va yashirin kalitlar yaratish uchun ishlatiladi.

## 2. SODDALIK (Analogiya)
- **Null:** Bu xuddi bo'sh **suv shishasiga** o'xshaydi. Shisha bor (o'zgaruvchi yaratilgan), lekin ichida suv yo'q (ataylab bo'sh qo'yilgan).
- **BigInt:** Oddiy kalkulyator ekraniga sig'maydigan o'ta uzun raqamlar deb tasavvur qiling.
- **Symbol:** Bu har bir insonga beriladigan **pasport seriyasi** kabi. Ikki kishining ismi bir xil bo'lishi mumkin, lekin pasport seriyasi (Symbol) doim takrorlanmas va yagona bo'ladi.

## 3. STRUKTURA

### A. Null (Ataylab bo'sh qiymat)
\`\`\`javascript
let foydalanuvchi = null; // Hozircha foydalanuvchi tizimga kirmagan, qiymat bo'sh
\`\`\`

### B. BigInt (O'ta yirik butun sonlar)
BigInt sonlar son oxiriga \`n\` harfi qo'shish yoki \`BigInt()\` funksiyasi orqali yaratiladi:
\`\`\`javascript
let kattaSon = 9007199254740995n;
let yanaBir = BigInt("12345678901234567890");
\`\`\`

### C. Symbol (Yagona va takrorlanmas belgi)
\`\`\`javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (tavsifi bir xil bo'lsa ham, o'zlari mutlaqo boshqa!)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Symbolni obyekt kaliti sifatida ishlatish:
\`\`\`javascript
const shaxs = {
  ism: "Ali"
};
const ID = Symbol("shaxsiy_id");
shaxs[ID] = 12345;
console.log(shaxs[ID]); // 12345
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **BigInt va Numberni aralashtirish:** \`10n + 5\` — Xato! ❌ BigIntni oddiy son bilan qo'shib bo'lmaydi. Uni: \`10n + BigInt(5)\` ko'rinishida yozish kerak ✅.
2. **typeof null:** Bu \`"object"\` natijasini beradi. Bu JavaScript-ning tarixiy xatosi (bug) hisoblanadi.
3. **Symbol bilan new ishlatish:** \`new Symbol('id')\` xato ❌. Symbol konstruktor emas, shuning uchun \`Symbol('id')\` deb yoziladi ✅.

## 6. SAVOLLAR VA JAVOBLAR
**1. null va undefined farqi nimada?**
\`null\` — qiymat ataylab "bo'sh" qilib belgilanganligini anglatadi. \`undefined\` esa o'zgaruvchi yaratilgan lekin unga hali hech qanday qiymat berilmagan.

**2. Nima uchun typeof null natijasi object chiqadi?**
Bu JavaScript yaratilgan birinchi versiyadagi xatolik bo'lib, eski saytlar va kutubxonalar ishdan chiqmasligi uchun o'zgartirilmasdan qolgan.

**3. BigInt qachon kerak bo'ladi?**
JavaScriptda xavfsiz butun son chegarasidan (\`Number.MAX_SAFE_INTEGER\` ya'ni \`9007199254740991\`) katta bo'lgan o'ta yirik butun sonlar bilan ishlaganda kerak bo'ladi.

**4. BigInt son qanday yaratiladi?**
Son oxiriga \`n\` harfini qo'shish orqali yoki \`BigInt()\` global funksiyasidan foydalanib.

**5. Number.MAX_SAFE_INTEGER qiymati qancha?**
Taxminan \`9007199254740991\` (yoki \`2^53 - 1\`) ga teng.

**6. Symbol nima uchun ishlatiladi?**
Obyekt xususiyatlari uchun mutlaqo yagona (unikal) va to'qnashmaydigan kalitlar yaratish uchun.

**7. Symbol("a") === Symbol("a") natijasi nima?**
\`false\` qaytadi. Har bir Symbol yaratilganda xotirada yangi unikal belgi hosil bo'ladi.

**8. BigInt sonni oddiy songa qo'shish mumkinmi?**
Yo'q, ularni aralashtirish \`TypeError\` xatosiga olib keladi.

**9. Obyekt ichida Symbol qanday kalit qilib yoziladi?**
Kvadrat qavslar ichida: \`const obj = { [sym]: 'qiymat' }\`.

**10. Symbol.description xususiyati nima qaytaradi?**
Symbol yaratilayotganda kiritilgan tavsif (nom) matnini qaytaradi.

**11. null == undefined natijasi nima bo'ladi?**
\`true\` bo'ladi (chunki qiymatsizlik jihatdan tenglashtiriladi).

**12. null === undefined natijasi nima bo'ladi?**
\`false\` bo'ladi (chunki ularning turlari mos ravishda Object va Undefined).
`,
  exercises: [
    {
      id: 1,
      title: "BigInt mashqi",
      instruction: "Son oxiriga 'n' qo'shish orqali big o'zgaruvchisiga 100 qiymatini BigInt turida saqlang.",
      startingCode: "// Bu yerda yarating\nconst big = ",
      hint: "const big = 100n;",
      test: "if (typeof big === 'bigint' && big === 100n) return null; return 'big o\\'zgaruvchisiga 100n qiymatini bering!';"
    },
    {
      id: 2,
      title: "Null qiymat",
      instruction: "car nomli o'zgaruvchiga ataylab bo'sh qiymat berish uchun null ni o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nconst car = ",
      hint: "const car = null;",
      test: "if (car === null) return null; return 'car o\\'zgaruvchisiga null qiymatini o\\'zlashtiring!';"
    },
    {
      id: 3,
      title: "Symbol yaratish",
      instruction: "mySymbol nomli o'zgaruvchiga 'tavsif' tavsifiga ega bo'lgan Symbol yarating.",
      startingCode: "// Bu yerga yozing\nconst mySymbol = ",
      hint: "const mySymbol = Symbol('tavsif');",
      test: "if (typeof mySymbol === 'symbol' && mySymbol.description === 'tavsif') return null; return 'Tavsifi \\'tavsif\\' bo\\'lgan Symbol yarating!';"
    },
    {
      id: 4,
      title: "BigInt global funksiyasi",
      instruction: "BigInt() funksiyasi yordamida '9007199254740995' stringini BigIntga o'tkazing va uni large o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nconst large = ",
      hint: "const large = BigInt('9007199254740995');",
      test: "if (typeof large === 'bigint' && large === 9007199254740995n) return null; return 'Stringni BigInt funksiyasi orqali o\\'tkazing!';"
    },
    {
      id: 5,
      title: "Symbol tavsifini olish",
      instruction: "sym o'zgaruvchisining description xususiyatidan foydalanib uning tavsifini desc o'zgaruvchisiga oling.",
      startingCode: "const sym = Symbol('kalit');\n// Bu yerga yozing\nconst desc = ",
      hint: "const desc = sym.description;",
      test: "if (desc === 'kalit') return null; return 'desc o\\'zgaruvchisiga sym.description ni o\\'zlashtiring!';"
    },
    {
      id: 6,
      title: "Obyekt va Symbol",
      instruction: "user obyektida yashirin kalit sifatida sym Symbolidan foydalaning va unga 101 qiymatini bering.",
      startingCode: "const sym = Symbol('id');\nconst user = {\n  // Bu yerga yozing\n};",
      hint: "const user = { [sym]: 101 };",
      test: "if (user[sym] === 101) return null; return 'user obyektida [sym]: 101 kalitini belgilang!';"
    },
    {
      id: 7,
      title: "Null turi",
      instruction: "typeof null natijasini typeOfNull o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nconst typeOfNull = ",
      hint: "const typeOfNull = typeof null;",
      test: "if (typeOfNull === 'object') return null; return 'typeof null natijasi \\'object\\' bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "BigIntlar ko'paytmasi",
      instruction: "10n va 20n sonlarini ko'paytiring va natijani result o'zgaruvchisiga o'zlashtiring.",
      startingCode: "const num1 = 10n;\nconst num2 = 20n;\n// Bu yerga yozing\nconst result = ",
      hint: "const result = num1 * num2;",
      test: "if (result === 200n) return null; return 'Natija 200n bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Oddiy sonni BigIntga o'tkazish",
      instruction: "BigInt() funksiyasi yordamida num o'zgaruvchisini BigInt ga o'tkazing va bigintNum o'zgaruvchisiga saqlang.",
      startingCode: "const num = 45;\n// Bu yerga yozing\nconst bigintNum = ",
      hint: "const bigintNum = BigInt(num);",
      test: "if (bigintNum === 45n) return null; return 'bigintNum o\\'zgaruvchisi 45n ga teng bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Bo'shliqlarni taqqoslash",
      instruction: "null va undefined ning qat'iy bo'lmagan (==) tenglik natijasini eq o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nconst eq = ",
      hint: "const eq = (null == undefined);",
      test: "if (eq === true) return null; return 'null == undefined natijasi true bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Qat'iy taqqoslash",
      instruction: "null va undefined ning qat'iy (===) tenglik natijasini seq o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nconst seq = ",
      hint: "const seq = (null === undefined);",
      test: "if (seq === false) return null; return 'null === undefined natijasi false bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Symbol taqqoslash",
      instruction: "Tavsifi bir xil bo'lgan ikkita sym1 va sym2 Symbolini qat'iy tenglik (===) orqali solishtirib, natijasini result o'zgaruvchisiga saqlang.",
      startingCode: "const sym1 = Symbol('a');\nconst sym2 = Symbol('a');\n// Bu yerga yozing\nconst result = ",
      hint: "const result = (sym1 === sym2);",
      test: "if (result === false) return null; return 'Ikkala symbol bir-biriga teng bo\\'la olmaydi, natija false bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`null` va `undefined` qiymatlarining bir-biri bilan qat'iy va qat'iy bo'lmagan solishtiruvlari (`==` va `===`) qanday natija beradi?",
      options: [
        "`null == undefined` is `false`, `null === undefined` is `true`",
        "`null == undefined` is `true`, `null === undefined` is `false` (chunki qiymat jihatdan ikkalasi ham bo'shlik, lekin turlari mos ravishda Null va Undefined)",
        "Ikkalasi ham `true` qaytaradi",
        "Ikkalasi ham `false` qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "`==` taqqoslash operatori turlarni tenglashtirib tekshiradi (coercion), shuning uchun `true` beradi. Qat'iy tenglik `===` esa qiymat turi (Null va Undefined) har xil bo'lgani uchun `false` beradi."
    },
    {
      id: 2,
      question: "BigInt turidagi sonlarni oddiy Number turidagi sonlar bilan aralashtirib arifmetik amallar bajarish (masalan, `10n + 5`) mumkinmi?",
      options: [
        "Ha, JavaScript avtomatik ravishda Numberni BigIntga o'tkazadi",
        "Yo'q, `TypeError` yuz beradi. BigIntni faqat boshqa BigInt bilan qo'shish/ayirish mumkin (yoki sonni `BigInt(5)` yordamida o'girish lozim)",
        "Faqat ko'paytirish va bo'lish amallarini bajarish mumkin",
        "Ha, lekin natija har doim string bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da implicit (yashirin) tarzda BigInt va oddiy sonlarni o'zaro hisoblash taqiqlangan, chunki bu sonlarning aniqlik darajasi yo'qolishiga sabab bo'lishi mumkin."
    },
    {
      id: 3,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi: `console.log(Symbol('x') === Symbol('x'))`?",
      options: [
        "`true` (chunki ikkalasining ham nomi/tavsifi bir xil)",
        "`false` (chunki har bir yaratilgan Symbol o'ziga xos va mutlaqo yagonadir)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Har bir `Symbol()` chaqirilganda, xotirada mutlaqo takrorlanmas yangi unikal qiymat yaratiladi. Ular ichidagi yozuv faqat tavsif (description) xolos."
    },
    {
      id: 4,
      question: "JavaScript-da xavfsiz ishlatish mumkin bo'lgan eng katta butun son chegarasi (cheklangan qiymat) qaysi o'zgarmasda saqlanadi?",
      options: [
        "`Number.MAX_VALUE`",
        "`Number.MAX_SAFE_INTEGER` (`9007199254740991`)",
        "`Number.INFINITY`",
        "`Math.max()`"
      ],
      correctAnswer: 1,
      explanation: "`Number.MAX_SAFE_INTEGER` JavaScript-dagi `2^53 - 1` ga teng xavfsiz va aniq hisoblanadigan eng katta son hisoblanadi. Undan katta sonlarni aniq saqlash uchun `BigInt` ishlatish kerak."
    },
    {
      id: 5,
      question: "BigInt sonni yaratish uchun qaysi belgi son oxiriga qo'shiladi?",
      options: [
        "`b` (masalan: `100b`)",
        "`n` (masalan: `100n`)",
        "`L` (masalan: `100L`)",
        "`g` (masalan: `100g`)"
      ],
      correctAnswer: 1,
      explanation: "Son oxiriga kichik `n` harfini qo'shish orqali JavaScript uni `BigInt` turi sifatida qabul qiladi. Masalan: `1234567890n`."
    },
    {
      id: 6,
      question: "`typeof null` natijasi nima?",
      options: [
        "`\"null\"`",
        "`\"undefined\"`",
        "`\"object\"` (chunki bu tilning tarixiy xatosidir)",
        "`\"boolean\"`"
      ],
      correctAnswer: 2,
      explanation: "JavaScript e'lon qilingan birinchi kundan boshlab `typeof null` qiymati `\"object\"` deb qaytadi va u tilning eng katta va mashhur buglaridan biridir."
    },
    {
      id: 7,
      question: "Obyekt ichidagi `Symbol` kalitiga qanday qilib murojaat qilinadi?",
      options: [
        "Nuqta orqali (masalan: `obj.mySymbol`)",
        "Kvadrat qavslar orqali (masalan: `obj[mySymbol]`)",
        "Qavslar orqali (masalan: `obj(mySymbol)`)",
        "Maxsus `get` metodi yordamida"
      ],
      correctAnswer: 1,
      explanation: "Symbollar obyekt kaliti sifatida ishlatilganda ularga faqat kvadrat qavslar `[]` yordamida murojaat qilinadi. Nuqta operatori ishlamaydi."
    },
    {
      id: 8,
      question: "Quyidagilardan qaysi biri sintaktik xatolik (SyntaxError) beradi?",
      options: [
        "`BigInt(10)`",
        "`BigInt(10.5)` (chunki BigInt faqat butun sonlarni ifodalaydi, kasr sonlar bilan ishlay olmaydi)",
        "`BigInt(\"10\")`",
        "`10n + 5n`"
      ],
      correctAnswer: 1,
      explanation: "BigInt faqat butun sonlar uchun mo'ljallangan bo'lib, unga kasr son uzatilsa yoki kasr ko'rinishida yozilsa `RangeError` / `SyntaxError` yuzaga keladi."
    },
    {
      id: 9,
      question: "JavaScriptda yangi `Symbol` yaratishda `new` kalit so'zidan foydalanilsa nima yuz beradi (masalan: `new Symbol('id')`)?",
      options: [
        "Symbol normal ravishda yaratiladi",
        "Obyekt turi qaytadi",
        "TypeError xatosi yuz beradi (chunki Symbol konstruktor funksiya emas)",
        "Dastur qotib qoladi"
      ],
      correctAnswer: 2,
      explanation: "Symbol konstruktor emas, shuning uchun uni `new` kalit so'zi bilan chaqirish mumkin emas. U to'g'ridan-to'g'ri `Symbol()` ko'rinishida chaqiriladi."
    },
    {
      id: 10,
      question: "Obyekt ichidagi Symbol kalitlari `Object.keys()` yoki `for...in` siklida aylanayotganda ko'rinadimi?",
      options: [
        "Ha, har doim ko'rinadi",
        "Yo'q, Symbol kalitlari yashirin bo'lib, oddiy aylanib chiqish metodlarida ko'rinmaydi",
        "Faqat `typeof` ishlatilsa ko'rinadi",
        "Faqat string ko'rinishiga o'tkazilganda ko'rinadi"
      ],
      correctAnswer: 1,
      explanation: "Symbollar obyektlarning yashirin xususiyatlarini yaratish uchun mo'ljallangan. Ular `Object.keys()` yoki `for...in` tomonidan o'tkazib yuboriladi. Ularni olish uchun `Object.getOwnPropertySymbols()` ishlatiladi."
    },
    {
      id: 11,
      question: "BigInt bilan bo'lish amali (`5n / 2n`) bajarilganda qanday natija chiqadi?",
      options: [
        "`2.5`",
        "`2.5n`",
        "`2n` (chunki BigInt bo'lish amali natijasidagi kasr qismni shunchaki tashlab yuboradi)",
        "`3n`"
      ],
      correctAnswer: 2,
      explanation: "BigInt faqat butun sonlar bilan ishlaydi, shuning uchun bo'lish amali bajarilganda kasr qismi to'liq tashlab yuborilib, faqat butun qismi qaytariladi."
    },
    {
      id: 12,
      question: "Quyidagilardan qaysi biri JavaScriptda yagona va takrorlanmas identifikator yaratib beradi?",
      options: [
        "null",
        "Symbol",
        "BigInt",
        "String"
      ],
      correctAnswer: 1,
      explanation: "`Symbol` o'zining asosiy ta'rifiga ko'ra mutlaqo unikal va yagona bo'lgan qiymatlarni yaratish uchun xizmat qiladi."
    }
  ]
};
