export const moreDataTypesLesson = {
  id: "more-data-types",
  title: "Ma'lumotlar Turlari: Null, Symbol, BigInt",
  theory: `## Ma'lumotlar Turlari: Null, Symbol, BigInt

Oldingi darsda biz eng ko'p ishlatiladigan turlarni ko'rdik. Endi esa JavaScriptning biroz "maxsus" turlari haqida gaplashamiz.

## 1. NEGA kerak?
- **Null:** Ba'zan biz o'zgaruvchi borligini, lekin uning ichi bo'shligini ataylab aytishimiz kerak.
- **BigInt:** Oddiy \`Number\` turi ma'lum bir kattalikdagi sonlardan keyin xato hisoblashni boshlaydi. Juda katta sonlar (masalan, koinotdagi atomlar soni) uchun \`BigInt\` kerak.
- **Symbol:** Obyektlar ichida bir-biriga o'xshamaydigan, mutlaqo unikal (yagona) kalitlar yaratish uchun ishlatiladi.

## 2. SODDALIK (Analogiya)
- **Null:** Bu xuddi bo'sh **suv shishasiga** o'xshaydi. Shisha bor, lekin ichida suv yo'q. (\`Undefined\` esa — shishaning o'zi ham yo'qligi).
- **BigInt:** Oddiy kalkulyator sig'maydigan juda uzun **chek** yoki raqam deb tasavvur qiling.
- **Symbol:** Bu har bir insonga beriladigan **pasport seriyasi** kabi. Ikki kishining ismi bir xil bo'lishi mumkin, lekin pasport seriyasi (Symbol) doim boshqa-boshqa bo'ladi.

## 3. STRUKTURA

### A. Null (Ataylab bo'shatish)
\`\`\`javascript
let foydalanuvchi = null; // Hozircha foydalanuvchi yo'q
\`\`\`

### B. BigInt (Katta sonlar)
Son oxiriga \`n\` harfi qo'shiladi:
\`\`\`javascript
let kattaSon = 9007199254740991n;
let yanaBir = BigInt("12345678901234567890");
\`\`\`

### C. Symbol (Yagona belgi)
\`\`\`javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (nomi bir xil bo'lsa ham, o'zlari boshqa-boshqa!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const shaxs = {
  ism: "Ali"
};
const ID = Symbol("shaxsiy_id");
shaxs[ID] = 12345;
console.log(shaxs[ID]); // 12345
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **BigInt va Numberni aralashtirish:** \`10n + 5\` — Xato! ❌ BigIntni faqat BigInt bilan qo'shish mumkin. (\`10n + BigInt(5)\` ✅).
2. **typeof null:** Yana bir bor eslatamiz, bu \`"object"\` chiqadi, lekin u aslida Primitiv tur.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. null va undefined farqi nimada?**
\`null\` — o'zgaruvchining qiymati ataylab "bo'sh" qilib belgilanganligini anglatadi (shisha bor, lekin bo'sh). \`undefined\` esa o'zgaruvchi e'lon qilingan, lekin unga hali hech qanday qiymat berilmaganligini anglatadi (shishaning o'zi ham yo'q).


**2. Nima uchun null primitiv tur bo'lsa ham object qaytaradi?**
Bu JavaScript yaratilgan paytdagi xato (bug) bo'lib, xotiradagi ob'ektlar ko'rsatkichi bilan bog'liq. Tizimlar va saytlar buzilmasligi uchun bu xatolik o'zgartirilmasdan qoldirilgan.


**3. BigInt qachon kerak bo'ladi?**
JavaScriptda xavfsiz butun son chegarasidan (\`Number.MAX_SAFE_INTEGER\` ya'ni \`9007199254740991\`) katta bo'lgan o'ta yirik sonlar bilan aniq ishlamoqchi bo'lganda kerak bo'ladi.


**4. BigInt son yaratishning 2 xil usulini ayting.**
1. Son oxiriga \`n\` harfini qo'shish orqali (\`const son = 100n;\`).  
2. \`BigInt()\` global funksiyasiga matn yoki raqam uzatish orqali (\`const son = BigInt("100");\`).


**5. Number.MAX_SAFE_INTEGER nima?**
Bu JavaScript-da oddiy \`Number\` turi yordamida aniqlik yo'qolmasdan xavfsiz hisoblanishi mumkin bo'lgan eng katta butun sondir (qiymati \`9007199254740991\` yoki \`2^53 - 1\`).


**6. Symbol nima vazifani bajaradi?**
\`Symbol\` obyektlar uchun mutlaqo yagona (unikal) va takrorlanmas kalitlar (xususiyatlar) yaratish uchun ishlatiladi. Bu obyektlardagi kalitlar to'qnashuvini oldini oladi.


**7. Ikki xil Symbol("a") bir-biriga tengmi?**
Yo'q, har bir yaratilgan \`Symbol\` ichidagi tavsifidan (description) qat'i nazar xotirada mutlaqo unikal bo'lib yaratiladi. Shuning uchun \`Symbol("a") === Symbol("a")\` natijasi \`false\` bo'ladi.


**8. BigInt va Numberni birga qo'shsa bo'ladimi?**
Yo'q, \`BigInt\` va \`Number\` turlarini to'g'ridan-to'g'ri birgalikda arifmetik amallarda ishlatib bo'lmaydi (\`TypeError\` beradi). Oldin ularni bir xil turga keltirish shart (masalan, \`BigInt(5) + 10n\`).


**9. Obyekt ichida Symbolni qanday kalit qiling ishlatish mumkin?**
Kvadrat qavslar \`[ ]\` yordamida obyekt xususiyati sifatida kiritiladi:
\`\`\`javascript
const sym = Symbol("id");
const obj = { [sym]: 123 };
\`\`\`


**10. Symbol.description nima qaytaradi?**
U \`Symbol\` yaratilayotganda qavs ichida berilgan tavsif matnini qaytaradi (masalan, \`Symbol("ism").description\` natijasi \`"ism"\` bo'ladi).


**11. null == undefined natijasi nima bo'ladi?**
Natija \`true\` bo'ladi, chunki qat'iy bo'lmagan tenglikda JS ularning ikkalasini ham "qiymatsizlik" jihatidan teng deb hisoblaydi.


**12. null === undefined natijasi nima bo'ladi?**
Natija \`false\` bo'ladi. Chunki ularning ma'lumot turlari har xil (\`null\` turi \`object\`, \`undefined\` turi esa \`undefined\`).
`,
  exercises: [
    {
      id: 1,
      title: "BigInt mashqi",
      instruction: "Son oxiriga 'n' qo'shish orqali bitta BigInt son yarating.",
      startingCode: "// Bu yerda yarating\nconst big = ",
      hint: "const big = 100n;",
      test: "if (typeof big === 'bigint') return null; return 'BigInt yaratilmadi!';"
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
    }
  ]
};
