export const typeofLesson = {
  id: "typeof",
  title: "typeof operatori",
  level: "Beginner",
  description: "Ma'lumot turini aniqlashning eng oson usuli.",
  theory: `
# typeof – Bu nima va nima uchun kerak?

**typeof** — bu o'zgaruvchi yoki qiymatning turini (number, string, boolean va h.k.) aniqlab beradigan operator.

## 1. NEGA kerak?
Tasavvur qiling, sizga birorta ma'lumot keldi, lekin siz uning ichida nima borligini bilmaysiz. Agar u son bo'lsa — hisoblashingiz, agar matn bo'lsa — kesishingiz kerak. \`typeof\` yordamida biz "bu nima o'zi?" deb so'rab olamiz.

## 2. SODDALIK (Analogiya)
Buni **detektorga** o'xshatish mumkin. Sizda noma'lum metall bor, uni detektordan o'tkazasiz va u sizga "bu oltin" yoki "bu kumush" deb aytadi. \`typeof\` ham shunday detektor.

## 3. STRUKTURA (Natijalar jadvali)

| Qiymat | typeof natijasi |
|--------|-----------------|
| 100 | "number" |
| "Salom" | "string" |
| true | "boolean" |
| undefined | "undefined" |
| null | "object" (Bug!) |
| { } | "object" |
| [ ] | "object" |
| function() {} | "function" |
| NaN | "number" |

### Muhim: G'alati holatlar (Intervyu savollari)
- **null:** Primitiv (oddiy) ma'lumot turi bo'lsa ham \`typeof null\` doim **"object"** qaytaradi. Bu JavaScript yaratilgandagi xato (bug) bo'lib, hozirda uni o'zgartirib bo'lmaydi (ko'plab saytlar buzilib ketishi mumkinligi uchun).
- **NaN (Not a Number):** "Son emas" degan ma'noni bersa-da, \`typeof NaN\` doim **"number"** qaytaradi. Chunki NaN raqamli amallar natijasida hosil bo'ladigan maxsus qiymatdir.
- **Massivlar:** JavaScriptda massivlar ham aslida obyektdir, shuning uchun \`typeof []\` ham **"object"** qaytaradi. Uni massiv ekanini bilish uchun \`Array.isArray()\` ishlatiladi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = "JS";
console.log(typeof x); // "string"

console.log(typeof (5 + 5)); // "number"
console.log(typeof true); // "boolean"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **typeof(x):** \`typeof\` funksiya emas, u operator. Uni qavssiz yozish to'g'riroq: \`typeof x\`.
2. **Double typeof:** \`typeof typeof 100\` har doim **"string"** qaytaradi. Chunki \`typeof 100\` — \`"number"\` (matn), uning turi esa \`string\`.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. typeof operatori nima qaytaradi?</summary>
\`typeof\` operatori tekshirilayotgan qiymat yoki o'zgaruvchining ma'lumot turini bildiruvchi matn (string) qaytaradi (masalan, \`"number"\`, \`"string"\`, \`"boolean"\` va hk).
</details>

<details>
<summary>2. typeof natijasi qaysi ma'lumot turida bo'ladi (string)?</summary>
Uning natijasi har doim \`string\` (matn) turida bo'ladi. Masalan, \`typeof 5\` bizga \`"number"\` qiymatini matn ko'rinishida beradi.
</details>

<details>
<summary>3. Nima uchun typeof null "object" chiqadi?</summary>
Bu JavaScript yaratilgan paytdagi tizimli xato (bug) bo'lib, keyinchalik mavjud saytlar va tizimlar buzilib ketmasligi uchun o'zgartirilmasdan qoldirilgan.
</details>

<details>
<summary>4. Massivning turini typeof orqali aniqlab bo'ladimi?</summary>
Yo'q, massivlar ham obyekt hisoblangani uchun \`typeof []\` har doim \`"object"\` qaytaradi. Haqiqiy massivni aniqlash uchun \`Array.isArray()\` metodidan foydalaniladi.
</details>

<details>
<summary>5. typeof NaN natijasi nima?</summary>
\`typeof NaN\` (Not a Number) \`"number"\` qaytaradi. Chunki u sonlar ustida noto'g'ri matematik amallar bajarilganda hosil bo'ladigan maxsus raqamli qiymatdir.
</details>

<details>
<summary>6. typeof 10 + " apples" natijasi nima bo'ladi?</summary>
Natija \`"number apples"\` bo'ladi. Chunki \`typeof 10\` birinchi bo'lib bajarilib \`"number"\` qaytaradi, so'ngra unga \`" apples"\` matni qo'shiladi.
</details>

<details>
<summary>7. typeof (10 + " apples") natijasi-chi?</summary>
Natija \`"string"\` bo'ladi. Qavs birinchi bajarilib, \`10 + " apples"\` amali \`"10 apples"\` matnini hosil qiladi, \`typeof\` esa ushbu matn turini \`"string"\` deb aniqlaydi.
</details>

<details>
<summary>8. typeof undefined natijasi nima?</summary>
\`typeof undefined\` natijasi \`"undefined"\` matni bo'ladi.
</details>

<details>
<summary>9. Funksiyalarning turi nima deb chiqadi?</summary>
Funksiyalarning turi har doim \`"function"\` deb chiqadi.
</details>

<details>
<summary>10. typeof true === "boolean" natijasi nima bo'ladi?</summary>
Natija \`true\` bo'ladi. Chunki \`typeof true\` qiymati \`"boolean"\` matniga teng va u \`"boolean"\` bilan taqqoslanmoqda.
</details>

<details>
<summary>11. typeof typeof 42 natijasi nima?</summary>
Natija \`"string"\` bo'ladi. Birinchi \`typeof 42\` bajarilib \`"number"\` (string) qiymatini qaytaradi. Ikkinchi \`typeof "number"\` esa \`"string"\` natijasini beradi.
</details>

<details>
<summary>12. E'lon qilinmagan o'zgaruvchiga typeof ishlatsa xato beradimi?</summary>
Yo'q, \`typeof\` e'lon qilinmagan (mavjud bo'lmagan) o'zgaruvchilar uchun ham xatolik bermaydi va xavfsiz tarzda \`"undefined"\` matnini qaytaradi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Turini tekshiring",
      instruction: "100 sonining turini konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof 100);",
      test: "if (logs.includes('number')) return null; return 'Xato chiqdi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`typeof` operatori qaytaradigan qiymat har doim qaysi ma'lumot turida (data type) bo'ladi?",
      options: [
        "Number",
        "String (ya'ni matn ko'rinishida, masalan: \"number\", \"string\")",
        "Boolean",
        "Object"
      ],
      correctAnswer: 1,
      explanation: "`typeof` har doim aniqlangan turning nomini satr (string) ko'rinishida qaytaradi (masalan, `\"number\"`, `\"boolean\"`, `\"undefined\"`)."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri JavaScript-ning dastlabki yaratilishidagi tarixiy xatolik (bug) hisoblanadi va unga ko'ra primitiv ma'lumot turi bo'lsa-da, javob `\"object\"` deb qaytadi?",
      options: [
        "`typeof undefined`",
        "`typeof null`",
        "`typeof NaN`",
        "`typeof []`"
      ],
      correctAnswer: 1,
      explanation: "`typeof null` ning `\"object\"` qaytarishi JSning birinchi versiyalaridan qolib ketgan mashhur xatolikdir. `null` aslida primitiv tur hisoblanadi."
    },
    {
      id: 3,
      question: "`typeof typeof 99` ifodasi bajarilganda qanday natija qaytadi?",
      options: [
        "`\"number\"`",
        "`\"string\"` (chunki birinchi `typeof 99` bizga \"number\" stringini qaytaradi, ikkinchi typeof esa uning turini string deb topadi)",
        "`\"object\"`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "`typeof 99` bizga `\"number\"` satrini beradi. Satrning ma'lumot turi esa `string` bo'lgani sababli `typeof \"number\"` natijasi `\"string\"` bo'ladi."
    },
    {
      id: 4,
      question: "JavaScript-da massiv (array) va obyekt (object) ustida alohida `typeof` ishlatilganda, ularning ikkalasidan ham qanday natija qaytadi?",
      options: [
        "`\"array\"` va `\"object\"`",
        "`\"object\"` va `\"object\"` (chunki JS-da massivlar ham mohiyatan obyektdir, massivni farqlash uchun Array.isArray() ishlatiladi)",
        "`\"list\"` va `\"dict\"`",
        "`\"collection\"` va `\"object\"`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da massivlar (arrays) alohida ma'lumot turi emas, ular obyektlarning bir ko'rinishidir. Shuning uchun `typeof []` ham `\"object\"` beradi."
    },
    {
      id: 5,
      question: "`typeof NaN` natijasi nima bo'ladi?",
      options: [
        "`\"NaN\"`",
        "`\"number\"` (chunki NaN (Not a Number) son bo'lmasa ham, sonli amallar natijasida chiqadigan qiymat sifatida sonlar oilasiga kiradi)",
        "`\"undefined\"`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "`NaN` — bu maxsus matematik qiymat bo'lib, 'Raqam Emas' (Not a Number) degan ma'noni beradi. Biroq, u raqamli tiplar doirasida ishlatilgani uchun uning turi `\"number\"` hisoblanadi."
    }
  ]
};
