export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)",
  language: "javascript",
  theory: `## 1. Bu nima?

Chet tilda gapirganda yoningizda kichik lug'at daftarchasi bo'lsa, har safar eslay olmay qolgan so'zni qidirib o'tirmaysiz: daftarchani ochib, kerakli so'zni topasiz.

Bu dars ham xuddi shunday **ma'lumotnoma (cheat sheet)** — yodlash uchun emas, kerak bo'lganda ochib qarash uchun tayyorlangan qisqa qo'llanma.

**Ma'lumotnoma (cheat sheet)** — 1-Bosqichda o'rgangan hamma narsani ixcham jadval va misollar holida bir joyga jamlagan varaq.

*Yangi atama:*

- **Cheat sheet** — "aldash varaqasi" ma'nosida: qisqa, tez qaraladigan yordamchi jadval.

---

## 2. Nega kerak?

Muammo: o'rgangan narsalar vaqt o'tishi bilan esdan chiqadi. Masalan: \`parseInt\` va \`Number\` orasida qanday farq bor edi? Yoki \`%\` operatori nima qilardi?

Yechim: yodlashning o'rniga tayyor jadvalga qarash. Bu varaq har kuni ishlatiladi — shuning uchun xatcho'pga (bookmark) qo'shib qo'yish tavsiya etiladi.

---

## 3. Birinchi misol

Eng ko'p qaraladigan joy — o'zgaruvchilar va turlar.

\`\`\`javascript
let yosh = 25; // o'zgaruvchi: keyin qiymati o'zgarishi mumkin
const ISM = "Ali"; // konstanta: qiymati muhrlangan

console.log(typeof yosh); // turini so'raymiz
console.log(typeof ISM);
\`\`\`

\`\`\`text
// Natija:
number
string
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let yosh = 25;\` — \`let\` bilan e'lon qilingan o'zgaruvchi; qiymatini keyin o'zgartirish mumkin.
- \`const ISM = "Ali";\` — \`const\` qiymati o'zgarmaydigan nomlar uchun ishlatiladi.
- \`typeof yosh\` — tur nomini beradi: son uchun \`"number"\`.
- \`typeof ISM\` — matn uchun \`"string"\`.

---

## 5. Ma'lumotnoma

### O'zgaruvchilar

| Nima | Qachon ishlatiladi |
|---|---|
| \`let\` | Qiymat o'zgaradi (hisob, holat) |
| \`const\` | Qiymat o'zgarmaydi (sozlama, konstanta) |

**Nomlash:** harf, raqam, \`$\` va \`_\` ishlatiladi; birinchi belgi raqam bo'lmaydi; uslub — camelCase: \`foydalanuvchiIsmi\`.

### Ma'lumot turlari

| Tur | Misol | \`typeof\` |
|---|---|---|
| \`number\` | \`25\`, \`99.9\` | \`"number"\` |
| \`string\` | \`"Ali"\` | \`"string"\` |
| \`boolean\` | \`true\`, \`false\` | \`"boolean"\` |
| \`undefined\` | \`let x;\` | \`"undefined"\` |
| \`null\` | \`let x = null;\` | \`"object"\` (tarixiy xato) |
| \`bigint\` | \`10n\` | \`"bigint"\` |
| \`symbol\` | \`Symbol()\` | \`"symbol"\` |

**5 ta yolg'onchi qiymat** (\`false\` beradi): \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`.

### Operatorlar

\`\`\`javascript
10 + 5    // 15 — qo'shish
10 - 5    // 5  — ayirish
10 * 5    // 50 — ko'paytirish
10 / 5    // 2  — bo'lish
10 % 3    // 1  — qoldiq (juft/toq tekshirish)
2 ** 3    // 8  — daraja
\`\`\`

**Solishtirish:** \`>\`, \`<\`, \`>=\`, \`<=\`, \`===\`, \`!==\`
**Mantiqiy:** \`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS)
**Qisqa yozuv:** \`+=\`, \`-=\`, \`++\`, \`--\`

### Tur aylantirish

\`\`\`javascript
Number("25")       // 25
Number("25px")     // NaN (qat'iy)
parseInt("25px")   // 25
parseFloat("25.9") // 25.9
String(25)         // "25"
Boolean("")        // false
\`\`\`

**Tuzoq:** \`"5" + 3\` → \`"53"\` (yopishtiradi), \`"5" - 3\` → \`2\` (hisoblaydi).

### Shartlar va sikllar

\`\`\`javascript
if (yosh >= 18) {
  console.log("Kattalar");
} else {
  console.log("Bolalar");
}

switch (kun) {
  case 1: console.log("Dushanba"); break;
  default: console.log("Boshqa");
}

for (let i = 1; i <= 5; i++) console.log(i);
while (suv > 0) { suv--; }
\`\`\`

**break** — siklni to'xtatadi, **continue** — joriy qadamni tashlab, keyingisiga o'tadi.

### Funksiyalar va matn

\`\`\`javascript
function salomBer(ism) {
  return \`Salom, \${ism}!\`; // backtick bilan matn yig'ish
}
console.log(salomBer("Ali")); // Salom, Ali!
\`\`\`

**Backtick** (\`\`) va \`\${}\` — zamonaviy yopishtirish usuli; ichida hisoblash ham mumkin: \`\${a + b}\`.

---

## 6. Ko'p uchraydigan xatolar

### 1-xato: \`==\` bilan solishtirish

❌ Xato kod:

\`\`\`javascript
console.log("5" == 5); // true — turni e'tiborsiz qoldirdi
\`\`\`

**Nima bo'ladi:** \`==\` jimgina tur aylantiradi va kutilmagan joyda \`true\` beradi.
**To'g'ri varianti:** Doim \`"5" === 5\` kabi qat'iy solishtirish (\`===\`) ishlating.

### 2-xato: \`const\` qiymatini o'zgartirishga urinish

❌ Xato kod:

\`\`\`javascript
const ISM = "Ali";
ISM = "Vali"; // TypeError chiqadi
\`\`\`

**Nima bo'ladi:** \`const\` bilan e'lon qilingan nomga qayta qiymat berib bo'lmaydi.
**To'g'ri varianti:** Qiymat o'zgaradigan bo'lsa \`let\` ishlating.

### 3-xato: son va matnni aralashtirib hisoblash

❌ Xato kod:

\`\`\`javascript
const kiritma = "25";
console.log(kiritma + 5); // "255" — kutilgan 30 emas!
\`\`\`

**Nima bo'ladi:** Kiritma matn bo'lsa, \`+\` uni yopishtiradi.
**To'g'ri varianti:** Avval songa o'giring: \`Number(kiritma) + 5\`.

---

## 7. Tekshiruv

### 1-mashq (oson)

\`whatType(x)\` funksiyasi \`typeof x\` natijasini qaytarsin.

### 2-mashq (o'rtacha)

\`sumList(massiv)\` funksiyasi massivdagi sonlar yig'indisini \`for\` bilan hisoblab qaytarsin.

### 3-mashq (chegara holat)

\`safeDivide(a, b)\` funksiyasi noldan bo'lishdan himoyalansin: agar \`b === 0\` bo'lsa \`0\`, aks holda \`a / b\` qaytarsin.

---

### Javoblar

**1-mashq javobi:**

\`\`\`javascript
function whatType(x) {
  return typeof x;
}
\`\`\`

**2-mashq javobi:**

\`\`\`javascript
function sumList(massiv) {
  let jami = 0;
  for (let i = 0; i < massiv.length; i++) {
    jami += massiv[i];
  }
  return jami;
}
\`\`\`

**3-mashq javobi:**

\`\`\`javascript
function safeDivide(a, b) {
  if (b === 0) {
    return 0;
  }
  return a / b;
}
\`\`\`

---

## 8. Xulosa

1. Bu varaq — yodlash uchun emas, tez qarash uchun tayyorlangan ma'lumotnoma.
2. O'zgaruvchi, tur, operator, sikl va funksiya bo'limlarini kerak bo'lganda ochib ko'ring.
3. Eng ko'p uchraydigan xato — turni e'tiborsiz qoldirish; shuning uchun doim \`===\` va \`Number()\` ishlatish tavsiya etiladi.

Keyingi darsda: shu varaqdagi barcha bilimlarni birlashtirib, kichik **mini-loyiha** yozamiz.
`,
exercises: [
    {
      id: 1,
      title: "O'zgaruvchi turi",
      instruction: "`whatType(x)` funksiyasi `typeof x` natijasini qaytarsin (ma'lumotnomani mashq qilamiz).",
      startingCode: "function whatType(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof x;",
      test: "const fn = new Function(code + '; return whatType;')();\nif (fn(25) === 'number' && fn(\"a\") === 'string' && fn(true) === 'boolean') return null;\nreturn 'typeof qaytaring';"
    },
    {
      id: 2,
      title: "Yolg'onchimi?",
      instruction: "`isFalsy(x)` funksiyasi `Boolean(x) === false` bo'lsa `true` qaytarsin.",
      startingCode: "function isFalsy(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Boolean(x) === false;",
      test: "const fn = new Function(code + '; return isFalsy;')();\nif (fn(0) === true && fn(\"\") === true && fn(\"a\") === false && fn(1) === false) return null;\nreturn '5 ta yolg\\'onchi: 0, \"\", null, undefined, NaN';"
    },
    {
      id: 3,
      title: "Qoldiq",
      instruction: "`remainder(a, b)` funksiyasi `a` ni `b` ga bo'lgandagi qoldiqni qaytarsin.",
      startingCode: "function remainder(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a % b;",
      test: "const fn = new Function(code + '; return remainder;')();\nif (fn(10, 3) === 1 && fn(9, 3) === 0) return null;\nreturn '% ishlating';"
    },
    {
      id: 4,
      title: "Xavfsiz aylantirish",
      instruction: "`safeInt(x)` funksiyasi `parseInt` bilan butun son qaytarsin: safeInt(\"25px\") => 25.",
      startingCode: "function safeInt(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return parseInt(x);",
      test: "const fn = new Function(code + '; return safeInt;')();\nif (fn(\"25px\") === 25 && fn(\"99.9\") === 99) return null;\nreturn 'parseInt ishlating';"
    },
    {
      id: 5,
      title: "Sikl bilan yig'ish",
      instruction: "`sumList(massiv)` funksiyasi massivdagi sonlar yig'indisini for bilan hisoblab qaytarsin.",
      startingCode: "function sumList(massiv) {\n  // for yozing\n}\n",
      hint: "let jami = 0; for (let i = 0; i < massiv.length; i++) jami += massiv[i]; return jami;",
      test: "const fn = new Function(code + '; return sumList;')();\nif (fn([1,2,3,4]) === 10 && fn([]) === 0) return null;\nreturn 'Yig\\'indi xato';"
    },
    {
      id: 6,
      title: "Blanka",
      instruction: "`card(ism, yosh)` funksiyasi backtick bilan `\"Ali (20 yosh)\"` qaytarsin.",
      startingCode: "function card(ism, yosh) {\n  // backtick yozing\n}\n",
      hint: "return `${ism} (${yosh} yosh)`;",
      test: "const fn = new Function(code + '; return card;')();\nif (fn(\"Ali\", 20) === 'Ali (20 yosh)') return null;\nreturn 'Format: Ali (20 yosh)';"
    },
    {
      "id": 7,
      "title": "Qat'iy solishtirish",
      "instruction": "`equalCheck(a, b)` funksiyasi qiymatlarni qat'iy (`===`) solishtirib `true`/`false` qaytarsin.",
      "startingCode": "function equalCheck(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return a === b;",
      "test": "const fn = new Function(code + \"; return equalCheck;\")();\nif (fn(5, 5) === true && fn(\"5\", 5) === false) return null;\nreturn \"=== bilan solishtiring\";"
    },
    {
      "id": 8,
      "title": "Juft yoki toq",
      "instruction": "`oddEven(son)` funksiyasi `son % 2 === 0` bo'lsa `\"juft\"`, aks holda `\"toq\"` qaytarsin.",
      "startingCode": "function oddEven(son) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "if (son % 2 === 0) {\n  return \"juft\";\n}\nreturn \"toq\";",
      "test": "const fn = new Function(code + \"; return oddEven;\")();\nif (fn(4) === \"juft\" && fn(7) === \"toq\") return null;\nreturn \"juft/toq natijasi xato\";"
    },
    {
      "id": 9,
      "title": "Backtick bilan format",
      "instruction": "`formatPrice(narx)` funksiyasi backtick yordamida `\"25 so'm\"` ko'rinishidagi matn qaytarsin.",
      "startingCode": "function formatPrice(narx) {\n  // backtick yozing\n}\n",
      "hint": "return `${narx} so'm`;",
      "test": "const fn = new Function(code + \"; return formatPrice;\")();\nif (fn(25) === \"25 so'm\") return null;\nreturn \"formatPrice(25) 25 so'm qaytarishi kerak\";"
    },
    {
      "id": 10,
      "title": "Chegara: noldan bo'lishdan himoya",
      "instruction": "`safeDivide(a, b)` funksiyasi: agar `b === 0` bo'lsa `0` qaytarsin, aks holda `a / b` natijasini qaytarsin.",
      "startingCode": "function safeDivide(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "if (b === 0) {\n  return 0;\n}\nreturn a / b;",
      "test": "const fn = new Function(code + \"; return safeDivide;\")();\nif (fn(10, 2) === 5 && fn(10, 0) === 0) return null;\nreturn \"b === 0 bo'lsa 0 qaytarishi kerak\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qiymat o'zgarmasligi aniq bo'lsa nima ishlatamiz?",
      options: [
        "let",
        "const",
        "var",
        "function"
      ],
      correctAnswer: 1,
      explanation: "const — muhrlangan quti."
    },
    {
      id: 2,
      question: "Erta/usul: `\"5\" + 3` natijasi nima?",
      options: [
        "8",
        "\"53\"",
        "NaN",
        "\"8\""
      ],
      correctAnswer: 1,
      explanation: "+ matnni ko'rsa yopishtiradi."
    },
    {
      id: 3,
      question: "Juft sonni tekshirish usuli?",
      options: [
        "son / 2 === 0",
        "son % 2 === 0",
        "son + 2",
        "son * 2"
      ],
      correctAnswer: 1,
      explanation: "% — qoldiq operatori."
    },
    {
      id: 4,
      question: "`parseInt(\"25px\")` va `Number(\"25px\")`?",
      options: [
        "25 va 25",
        "25 va NaN",
        "NaN va 25",
        "Ikkisi NaN"
      ],
      correctAnswer: 1,
      explanation: "parseInt moslashuvchan, Number qat'iy."
    },
    {
      id: 5,
      question: "Funksiya natijani qaytarish uchun nima ishlatadi?",
      options: [
        "console.log",
        "return",
        "alert",
        "throw"
      ],
      correctAnswer: 1,
      explanation: "return — natija eshigi."
    },
    {
      id: 6,
      question: "O'zgaruvchi qaysi rejimda blokka bo'ysunadi?",
      options: [
        "var",
        "let va const",
        "function",
        "Hech qaysi"
      ],
      correctAnswer: 1,
      explanation: "var faqat funksiyaga bo'ysunadi."
    },
    {
      "id": 7,
      "question": "`\"5\" - 3` ifodasi nima beradi?",
      "options": [
        "\"53\"",
        "2",
        "NaN",
        "Xatolik"
      ],
      "correctAnswer": 1,
      "explanation": "Ayirish operatori (-) sonlar bilan ishlaydi: matn jimgina songa aylanadi."
    },
    {
      "id": 8,
      "question": "`Boolean(\"false\")` natijasi nima?",
      "options": [
        "false",
        "true",
        "undefined",
        "NaN"
      ],
      "correctAnswer": 1,
      "explanation": "Bo'sh bo'lmagan har qanday matn — true; \"false\" matni ham true hisoblanadi."
    },
    {
      "id": 9,
      "question": "`10n` qiymatining turi (`typeof`) nima?",
      "options": [
        "\"number\"",
        "\"bigint\"",
        "\"string\"",
        "\"object\""
      ],
      "correctAnswer": 1,
      "explanation": "Oxirida n qo'yilgan son bigint turiga kiradi."
    },
    {
      "id": 10,
      "question": "`parseFloat(\"25.9\")` nima qaytaradi?",
      "options": [
        "25",
        "25.9",
        "NaN",
        "\"25.9\""
      ],
      "correctAnswer": 1,
      "explanation": "parseFloat kasr qismini ham saqlab qoladi (parseInt esa 25 berardi)."
    },
    {
      "id": 11,
      "question": "Sikl ichida `break` va `continue` orasidagi farq?",
      "options": [
        "break — joriy qadamni tashlaydi, continue — siklni to'xtatadi",
        "break — siklni to'xtatadi, continue — joriy qadamni tashlab keyingisiga o'tadi",
        "Ikkalasi bir xil",
        "Ikkalasi ham siklni qaytadan boshlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "break sikldan butunlay chiqadi, continue esa faqat shu qadamni o'tkazib yuboradi."
    },
    {
      "id": 12,
      "question": "`const` bilan e'lon qilingan songa keyin qiymat berilsa nima bo'ladi?",
      "options": [
        "Qiymat yangilanadi",
        "TypeError beradi — const qiymati muhrlangan",
        "Jimgina o'tadi",
        "undefined bo'ladi"
      ],
      "correctAnswer": 1,
      "explanation": "Qiymati o'zgarishi kerak bo'lsa let ishlatiladi; const ni qayta yozib bo'lmaydi."
    }
  ]
};
