export const jsGotchas = {
  id: "jsGotchas",
  title: "JavaScript Gotchas (Tuzoqlar)",
  language: "javascript",
  theory: `## 1. Bu nima?

Yangi shaharda mashina haydayapsiz. Ba'zi ko'chalar bir tomonlama, ba'zi belgilar esa chalg'ituvchi. Mahalliy haydovchi bu joylarni biladi va ehtiyot bo'lib yuradi. Chetdan kelgan haydovchi esa belgilarga ishonib, noto'g'ri yo'lga kirib qoladi.

JavaScript da ham shunday joylar bor: kod xato **bermaydi**, lekin natija butunlay kutilmagan bo'ladi. Bunday joylar **tuzoq (gotcha)** deb ataladi.

**Tuzoq (gotcha)** — bu sintaksis xatosi bo'lmagan, ammo oldindan bilmasangiz kutilmagan natija beradigan xatti-harakat.

*Muhim atama:*

- **Gotcha** — "tuzoq" ma'nosini bildiruvchi so'z; kod ishlaydi, lekin natija siz kutgandek chiqmaydi.
- **Majburiy tur aylantirish (coercion)** — JavaScript turli turdagi qiymatlarni hisoblashda ularni jimgina boshqa turga o'giradi.

---

## 2. Nega kerak?

Muammo: pul hisobida kasr sonlarni qo'shsak, kutilmagan natija chiqadi.

\`\`\`javascript
const narx = 0.1 + 0.2; // ikkita kasr narxni qo'shdik
console.log(narx);
console.log(narx === 0.3); // 0.3 ga tengmi?
\`\`\`

\`\`\`text
// Natija:
0.30000000000000004
false
\`\`\`

Sabab: kasr sonlar kompyuter xotirasida ikkilik sistemada saqlanadi va ba'zi kasrlarni aniq ifodalab bo'lmaydi. Bu dasturchining xatosi emas — bu sonlarning tabiati.

Tuzoqlarni bilgan dasturchi bunday natijani ko'rganda hayron qolmaydi va darhol to'g'ri yechim (masalan, tiyinda hisoblash) ni tanlaydi. Bilmasa esa soatlab "nega teng emas?" deb qidiradi.

---

## 3. Birinchi misol

Eng mashhur tuzoq: \`typeof null\`.

\`\`\`javascript
console.log(typeof null); // "object" chiqadi
console.log(typeof 5); // "number"
console.log(typeof "Salom"); // "string"
\`\`\`

\`\`\`text
// Natija:
object
number
string
\`\`\`

Bu yerda \`null\` qiymati "hech narsa yo'q" degani bo'lsa ham, uning turi \`"object"\` bo'lib chiqadi. Sabab tarixiy: dastlabki implementatsiyada obyekt uchun ajratilgan belgi (bit) mos ravishda \`null\` ga ham to'g'ri kelib qolgan. Bugun esa eski kodlar buzilib ketmasligi uchun bu holat o'zgartirilmagan.

---

## 4. Qator-baqator tahlil

- \`console.log(typeof null);\` — \`typeof\` operatori \`null\` ning turini so'raydi. Kutilgan javob \`"null"\`, lekin kod \`"object"\` beradi.
- \`console.log(typeof 5);\` — son uchun hammasi joyida: \`"number"\`.
- \`console.log(typeof "Salom");\` — matn uchun ham to'g'ri: \`"string"\`.

Xulosa: \`typeof\` ko'p hollarda to'g'ri ishlaydi, faqat \`null\` uchun alohida ehtiyot kerak. Shuning uchun \`null\` ni tekshirish uchun tur emas, \`=== null\` solishtirish ishlatiladi.

---

## 5. Yana bitta misol

1-misoldan farqi: bu safar qiymat o'ziga ham teng bo'lmaydi.

\`\`\`javascript
const son = NaN; // NaN — "Not a Number" (son emas)

console.log(son); // NaN
console.log(son === son); // false (!)
console.log(Number.isNaN(son)); // true — to'g'ri tekshirish usuli
\`\`\`

\`\`\`text
// Natija:
NaN
false
true
\`\`\`

Tahlil:

- \`NaN\` — noto'g'ri matematik amaldan (masalan, matnni songa bo'lishdan) chiqqan "son emas" qiymati.
- \`son === son\` — solishtirish jimgina \`false\` qaytaradi. Adashib qolmaslik uchun soddaroq usul ham bor: \`son !== son\` (\`NaN\` uchun \`true\` bo'ladi).
- \`Number.isNaN(son)\` — faqat \`NaN\` uchun \`true\` beradigan maxsus metod.

Boshqa mashhur tuzoqlar:

| Kod | Kutilgan? | Haqiqiy natija | Sabab |
|---|---|---|---|
| \`1 + 2 + "3"\` | "33" | "33" | Avval sonlar qo'shildi, keyin matn yopishtirildi |
| \`"1" + 2 + 3\` | 6 | "123" | Boshida matn bo'lsa, qolgani ham matn bo'ladi |
| \`[] + []\` | 0 | "" | Massivlar jimgina bo'sh matnga aylandi |
| \`[] + {}\` | xato | "[object Object]" | Obyekt matnga aylantirildi |
| \`[1, 2] === [1, 2]\` | true | false | Ikki massiv — xotirada ikki xil manzil |

---

## 6. Ko'p uchraydigan xatolar

### 1-xato: massivlarni "===" bilan solishtirish

❌ Xato kod:

\`\`\`javascript
const a = [1, 2];
const b = [1, 2];
console.log(a === b); // false — mazmuni bir xil bo'lsa ham
\`\`\`

**Nima bo'ladi:** Obyekt va massivlar xotiradagi **manzil (havola)** bilan solishtiriladi. \`a\` va \`b\` — ikki xil manzil.
**To'g'ri varianti:** Mazmunni solishtiring: \`JSON.stringify(a) === JSON.stringify(b)\`.

### 2-xato: kasr sonlarni to'g'ridan-to'g'ri solishtirish

❌ Xato kod:

\`\`\`javascript
if (0.1 + 0.2 === 0.3) {
  console.log("teng");
}
\`\`\`

**Nima bo'ladi:** Shart hech qachon bajarilmaydi, chunki chap tomonda \`0.30000000000000004\` turadi.
**To'g'ri varianti:** \`Math.round(0.1 * 100 + 0.2 * 100) / 100 === 0.3\` (tiyinda hisoblash) yoki \`(0.1 + 0.2).toFixed(1) === "0.3"\`.

### 3-xato: NaN ni "===" bilan tekshirish

❌ Xato kod:

\`\`\`javascript
const son = Number("salom");
if (son === NaN) {
  console.log("bu ishlamaydi");
}
\`\`\`

**Nima bo'ladi:** \`NaN\` o'ziga ham teng emas, shuning uchun shart hech qachon \`true\` bo'lmaydi.
**To'g'ri varianti:** \`son !== son\` yoki \`Number.isNaN(son)\`.

---

## 7. Tekshiruv

### 1-mashq (oson)

\`nullType()\` funksiyasi \`typeof null\` natijasini qaytarsin (\`"object"\`).

### 2-mashq (o'rtacha)

\`sameArrays(a, b)\` funksiyasi ikki massiv mazmunini \`JSON.stringify\` bilan solishtirib, \`true\` yoki \`false\` qaytarsin.

### 3-mashq (chegara holat)

\`priceSum()\` funksiyasi \`0.1\` va \`0.2\` ni tiyinga o'girib (100 ga ko'paytirib), \`Math.round\` bilan yumaloqlab, yana 100 ga bo'lsin va aniq \`0.3\` qaytarsin.

---

### Javoblar

**1-mashq javobi:**

\`\`\`javascript
function nullType() {
  return typeof null;
}
\`\`\`

**2-mashq javobi:**

\`\`\`javascript
function sameArrays(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
\`\`\`

**3-mashq javobi:**

\`\`\`javascript
function priceSum() {
  return Math.round(0.1 * 100 + 0.2 * 100) / 100;
}
\`\`\`

---

## 8. Xulosa

1. Tuzoq (gotcha) — kod xato bermaydi, lekin natija kutilgandan boshqacha bo'ladi.
2. \`typeof null\` \`"object"\` beradi, shuning uchun \`null\` ni \`=== null\` bilan tekshirish kerak.
3. \`NaN\` o'ziga teng emas; massiv va obyektlar esa havola bilan solishtiriladi, kasr sonlarni tiyinda hisoblash xavfsizroq.

Keyingi darsda: barcha o'rganganlarimizni bir joyga jamlagan qisqa ma'lumotnoma (cheat sheet) bilan tanishamiz.
`,
exercises: [
    {
      id: 1,
      title: "null turi",
      instruction: "`nullType()` funksiyasi `typeof null` natijasini qaytarsin.",
      startingCode: "function nullType() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof null;",
      test: "const fn = new Function(code + '; return nullType;')();\nif (fn() === 'object') return null;\nreturn 'typeof null -> object';"
    },
    {
      id: 2,
      title: "NaN ni aniqlash",
      instruction: "`isNotNumber(x)` funksiyasi `Number.isNaN(x)` bilan tekshirsin.",
      startingCode: "function isNotNumber(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number.isNaN(x);",
      test: "const fn = new Function(code + '; return isNotNumber;')();\nif (fn(NaN) === true && fn(5) === false) return null;\nreturn 'Number.isNaN ishlating';"
    },
    {
      id: 3,
      title: "Yopishtirish tuzog'i",
      instruction: "`concatTrap()` funksiyasi `1 + 2 + \"3\"` natijasini (`\"33\"`) qaytarsin.",
      startingCode: "function concatTrap() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return 1 + 2 + \"3\";",
      test: "const fn = new Function(code + '; return concatTrap;')();\nif (fn() === \"33\") return null;\nreturn '\"33\" bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Kasr aniqligi",
      instruction: "`floatTrap()` funksiyasi `(0.1 + 0.2).toFixed(1)` natijasini qaytarsin.",
      startingCode: "function floatTrap() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return (0.1 + 0.2).toFixed(1);",
      test: "const fn = new Function(code + '; return floatTrap;')();\nif (fn() === '0.3') return null;\nreturn 'toFixed(1) ishlating -> \"0.3\"';"
    },
    {
      id: 5,
      title: "Massiv solishtirish",
      instruction: "`sameArrays(a, b)` funksiyasi ikkita massivni `JSON.stringify` bilan solishtirib `true`/`false` qaytarsin.",
      startingCode: "function sameArrays(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return JSON.stringify(a) === JSON.stringify(b);",
      test: "const fn = new Function(code + '; return sameArrays;')();\nif (fn([1,2], [1,2]) === true && fn([1], [2]) === false) return null;\nreturn 'JSON.stringify bilan solishtiring';"
    },
    {
      "id": 6,
      "title": "Bo'sh massivlar qo'shilishi",
      "instruction": "`emptySum()` funksiyasi `[] + []` natijasini qaytarsin (bo'sh matn `\"\"`).",
      "startingCode": "function emptySum() {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return [] + [];",
      "test": "const fn = new Function(code + \"; return emptySum;\")();\nif (fn() === \"\") return null;\nreturn \"\\\"\\\" qaytarishi kerak\";"
    },
    {
      "id": 7,
      "title": "Massiv va obyekt qo'shilishi",
      "instruction": "`arrayObjectSum()` funksiyasi `[] + {}` natijasini qaytarsin.",
      "startingCode": "function arrayObjectSum() {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return [] + {};",
      "test": "const fn = new Function(code + \"; return arrayObjectSum;\")();\nif (fn() === \"[object Object]\") return null;\nreturn \"[] + {} => [object Object] bo'lishi kerak\";"
    },
    {
      "id": 8,
      "title": "Matn boshida tursa hammasi yopishtiriladi",
      "instruction": "`stringFirst()` funksiyasi `\"1\" + 2 + 3` natijasini qaytarsin.",
      "startingCode": "function stringFirst() {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return \"1\" + 2 + 3;",
      "test": "const fn = new Function(code + \"; return stringFirst;\")();\nif (fn() === \"123\") return null;\nreturn '\"123\" qaytarishi kerak';"
    },
    {
      "id": 9,
      "title": "Bir xil havola teng bo'ladi",
      "instruction": "`sameRef()` funksiyasi bitta massivni o'zgaruvchiga saqlab, uni o'ziga solishtirsin (`===`) va natijani qaytarsin.",
      "startingCode": "function sameRef() {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "const a = [1, 2];\nreturn a === a;",
      "test": "const fn = new Function(code + \"; return sameRef;\")();\nif (fn() === true) return null;\nreturn \"true qaytarishi kerak (bir xil havola)\";"
    },
    {
      "id": 10,
      "title": "Chegara: kasr narxni tiyinda hisoblash",
      "instruction": "`priceSum()` funksiyasi `0.1` va `0.2` ni 100 ga ko'paytirib, `Math.round` bilan yumaloqlab, yana 100 ga bo'lib aniq `0.3` qaytarsin.",
      "startingCode": "function priceSum() {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return Math.round(0.1 * 100 + 0.2 * 100) / 100;",
      "test": "const fn = new Function(code + \"; return priceSum;\")();\nif (fn() === 0.3) return null;\nreturn \"aniq 0.3 qaytarishi kerak (tiyinda hisoblang)\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`typeof null` nima qaytaradi?",
      options: [
        "\"null\"",
        "\"object\"",
        "\"undefined\"",
        "null"
      ],
      correctAnswer: 1,
      explanation: "1995-yilgi tarixiy xato."
    },
    {
      id: 2,
      question: "`NaN === NaN` natijasi?",
      options: [
        "true",
        "false",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Number.isNaN() bilan tekshiriladi."
    },
    {
      id: 3,
      question: "`1 + 2 + \"3\"` natijasi?",
      options: [
        "\"33\"",
        "\"123\"",
        "6",
        "\"6\""
      ],
      correctAnswer: 0,
      explanation: "Avval 1+2=3, keyin \"3\" bilan yopishtiriladi."
    },
    {
      id: 4,
      question: "`0.1 + 0.2` nima beradi?",
      options: [
        "0.3",
        "0.30000000000000004",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Float aniqlik chegarasi — toFixed ishlatiladi."
    },
    {
      id: 5,
      question: "`[1,2] === [1,2]` natijasi?",
      options: [
        "true",
        "false — havolalar har xil",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "JSON.stringify bilan solishtiriladi."
    },
    {
      "id": 6,
      "question": "`[] + []` ifodasi nima qaytaradi?",
      "options": [
        "0",
        "Bo'sh matn \"\"",
        "[]",
        "Xatolik"
      ],
      "correctAnswer": 1,
      "explanation": "Ikki bo'sh massiv jimgina bo'sh matnga aylantirilib, yopishtiriladi."
    },
    {
      "id": 7,
      "question": "`[] + {}` ifodasining natijasi nima?",
      "options": [
        "\"[object Object]\"",
        "0",
        "undefined",
        "Xatolik"
      ],
      "correctAnswer": 0,
      "explanation": "Bo'sh massiv \"\", obyekt esa \"[object Object]\" matniga aylanadi."
    },
    {
      "id": 8,
      "question": "`\"1\" + 2 + 3` ifodasi nima beradi?",
      "options": [
        "6",
        "\"123\"",
        "\"6\"",
        "NaN"
      ],
      "correctAnswer": 1,
      "explanation": "Qo'shish chapdan o'ngga bajariladi: boshida matn turgani uchun qolganlari ham matn bo'ladi."
    },
    {
      "id": 9,
      "question": "`0.1 + 0.2 === 0.3` ifodasi nima qaytaradi?",
      "options": [
        "true",
        "false",
        "NaN",
        "Xatolik"
      ],
      "correctAnswer": 1,
      "explanation": "Chap tomondagi qiymat 0.30000000000000004 bo'lgani uchun solishtirish false beradi."
    },
    {
      "id": 10,
      "question": "`NaN` ni qanday ishonchli tekshirish mumkin?",
      "options": [
        "`x === NaN`",
        "`x !== x` yoki `Number.isNaN(x)`",
        "`typeof x === \"NaN\"`",
        "`x == NaN`"
      ],
      "correctAnswer": 1,
      "explanation": "NaN faqat o'ziga teng bo'lmagani uchun x !== x ishlaydi; Number.isNaN ham xuddi shuni bajaradi."
    },
    {
      "id": 11,
      "question": "`[1, 2] === [1, 2]` nima uchun `false`?",
      "options": [
        "Chunki ularning uzunligi har xil",
        "Chunki massivlar xotiradagi havola bilan solishtiriladi va havolalar har xil",
        "Chunki massivlarni solishtirib bo'lmaydi",
        "Chunki === faqat sonlar uchun ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Mazmuni bir xil bo'lsa ham ikki massiv — xotirada ikki xil manzil."
    },
    {
      "id": 12,
      "question": "`typeof null` nima uchun `\"object\"` qaytaradi?",
      "options": [
        "Chunki null obyektlardan tashkil topgan",
        "Bu 1995-yildagi implementatsiya xatosi; eski kodlar buzilmasligi uchun o'zgartirilmagan",
        "Chunki null ham massiv",
        "Chunki typeof ishlamaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Bu tarixiy xatolik; null ni tekshirish uchun === null ishlatiladi."
    }
  ]
};
