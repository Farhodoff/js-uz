export const implicitCasting = {
  id: "implicitCasting",
  title: "Implicit Type Casting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Yashirin aylantirish — JS siz uchun "taxmin" qiladi
Turlar aralashib qolsa, JavaScript xato berish o'rniga **o'zi to'g'rilashga** urinadi. Ba'zan foydali, ba'zan — kutilmagan!

\`\`\`javascript
console.log("5" + 3);  // "53" — yopishtirdi
console.log("5" - 3);  // 2 — hisoblab berdi?!
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **chet elda taksi haydovchisiz**, yo'lovchi o'z tilida gapiryapti:
- Ba'zan to'g'ri tushunasiz ("5" - 3 = 2 ✅)
- Ba'zan mutlaqo noto'g'ri ("5" + 3 = "53" ❌ — siz 8 kutgandingiz!)

Xulosa: haydovchiga (JavaScript'ga) **aniq tilda** (bir xil turda) gapiring!

---

## 2. 💻 Uchta Mashhur Tuzoq

### Tuzoq 1: \`+\` yopishtiradi
\`\`\`javascript
console.log("5" + 3);     // "53" (matn!)
console.log(5 + "3");     // "53" (matn!)
console.log("Ali" + 5);   // "Ali5"
\`\`\`

### Tuzoq 2: \`- * /\` hisoblaydi
\`\`\`javascript
console.log("10" - 2);    // 8 (son!)
console.log("10" * "2");  // 20 (son!)
console.log("10" / 2);    // 5 (son!)
\`\`\`

### Tuzoq 3: \`==\` ko'r qilib solishtiradi
\`\`\`javascript
console.log(5 == "5");    // true (tuzoq! turlar har xil!)
console.log(0 == false);  // true (tuzoq!)
console.log("" == false); // true (tuzoq!)
\`\`\`

> **Oltin qoida:** har doim \`===\` ishlating — u turlarni ham tekshiradi:
> \`\`\`javascript
> console.log(5 === "5");  // false (to'g'ri!)
> \`\`\`

\`\`\`mermaid
flowchart TD
    A["Turlar aralashdi"] --> B{"Qaysi operator?"}
    B -->|"+"| C["Matnga yopishtiradi"]
    B -->|"- * /"| D["Songa aylantirib hisoblaydi"]
    B -->|"=="| E["Ko'r solishtiradi (tuzoq!)"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

JavaScript \`+\` ni ko'rsa: "ikkisidan bittasi matnmi? — unda YOPISHTIRAMAN". Qolgan operatorlarda: "matnni songa aylantirib HISOBLAYMAN". \`==\` da esa: "turlarni e'tiborsiz qoldirib SOLISHTIRAMAN".

Bularning barchasi avtomatik — siz hech narsa demasdan sodir bo'ladi. Shuning uchun **turlarni O'ZINGIZ birxillashtiring**:

\`\`\`javascript
// Xavfli:
let jami = "100" + 50;      // "10050" (tuzoq!)

// Xavfsiz:
let jami = Number("100") + 50;  // 150 (to'g'ri!)
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`==\` bilan solishtirish | \`===\` bilan | \`==\` turlarni e'tiborsiz qoldiradi |
| \`"5" + 3\` dan 8 kutish | \`"53"\` ekanini bilish | \`+\` yopishtiradi |
| \`"10" - "2"\` dan matn kutish | \`8\` (son) ekanini bilish | \`-\` songa aylantiradi |
| Forma ma'lumotini to'g'ridan \`+\` qilish | Avval \`Number()\` | \`"100" + 50 = "10050"\` tuzog'i! |

---

## 5. 🔑 Asosiy Atamalar

- **Implicit coercion** — yashirin aylantirish (JS avtomatik qiladi)
- **Tuzoq** — kutilmagan natija beradigan holat
- **\`==\` vs \`===\`** — ko'r solishtirish vs qat'iy solishtirish

---

## 6. 🌍 Real Hayotda Qayerda?

- **Savatcha xatosi:** \`"100" + 50\` → \`"10050"\` so'm (mijoz hayron!) — \`Number()\` unutildi
- **Kirish:** \`"1234" == 1234\` → true (xavfsizlik teshigi!) — \`===\` kerak

---

## 7. 🎙 Intervyu Savollari

**1. \`"5" + 3\` va \`"5" - 3\` nima uchun farq qiladi?**
**Javob:** \`+\` matnni ko'rsa yopishtiradi (\`"53"\`), \`-\` esa songa aylantirib hisoblaydi (\`2\`).

**2. Nega \`==\` o'rniga \`===\` tavsiya qilinadi?**
**Javob:** \`==\` turlarni yashirin aylantiradi (\`5 == "5"\` → true), \`===\` turlarni ham tekshiradi.

**3. \`"100" + 50\` muammosini qanday tuzatasiz?**
**Javob:** \`Number("100") + 50\` → \`150\`.

---

## 8. ✅ Xulosa

- **\`+\` yopishtiradi, \`- * /\` hisoblaydi, \`==\` ko'r solishtiradi**
- **Himoya:** turlarni \`Number()\` bilan birxillang, \`===\` ishlating
- **Keyingi qadam:** 1.11-darsda \`==\` vs \`===\` ni to'liq o'rganamiz
`,
  exercises: [
    {
      id: 1,
      title: "Tuzoqni top",
      instruction: "`trap()` funksiyasi `\"5\" + 3` natijasini qaytarsin. Natija `\"53\"` (matn) bo'lishi kerak.",
      startingCode: "function trap() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return \"5\" + 3;",
      test: "const fn = new Function(code + '; return trap;')();\nif (fn() === \"53\") return null;\nreturn '\"5\" + 3 = \"53\"';"
    },
    {
      id: 2,
      title: "Ajablanarli ayirish",
      instruction: "`minus(a, b)` funksiyasi `\"10\" - \"2\"` kabi matnlarni ayirib, SON qaytarsin. minus(\"10\", \"2\") => 8.",
      startingCode: "function minus(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a - b;",
      test: "const fn = new Function(code + '; return minus;')();\nif (fn(\"10\", \"2\") === 8) return null;\nreturn '- avtomatik songa aylantiradi';"
    },
    {
      id: 3,
      title: "Xavfsiz qo'shish",
      instruction: "`safeAdd(a, b)` funksiyasi ikkita matn-sonni XAVFSIZ qo'shsin: safeAdd(\"10\", \"20\") => 30.",
      startingCode: "function safeAdd(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(a) + Number(b);",
      test: "const fn = new Function(code + '; return safeAdd;')();\nif (fn(\"10\", \"20\") === 30) return null;\nreturn 'Number() bilan himoyalang';"
    },
    {
      id: 4,
      title: "Ko'r vs ko'ruvchi",
      instruction: "`compare(a, b)` funksiyasi `[a == b, a === b]` massivini qaytarsin. Masalan: compare(5, \"5\") => [true, false].",
      startingCode: "function compare(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return [a == b, a === b];",
      test: "const fn = new Function(code + '; return compare;')();\nconst r = fn(5, \"5\");\nif (r[0] === true && r[1] === false) return null;\nreturn '[true, false] bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "Savatcha xatosini tuzatish",
      instruction: "Do'kon savatchasi: narx `\"100\"` (matn), yetkazish `50` (son). `total(narx, yetkazish)` to'g'ri jami (150) qaytarsin.",
      startingCode: "function total(narx, yetkazish) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(narx) + yetkazish;",
      test: "const fn = new Function(code + '; return total;')();\nif (fn(\"100\", 50) === 150) return null;\nreturn '150 chiqishi kerak, \"10050\" emas!';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`\"5\" + 3` natijasi?",
      options: [
        "8",
        "\"53\" (matn)",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "+ matnni ko'rsa yopishtiradi."
    },
    {
      id: 2,
      question: "`\"10\" - \"2\"` natijasi?",
      options: [
        "\"102\"",
        "8 (son)",
        "\"8\"",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "- matnlarni songa aylantirib hisoblaydi."
    },
    {
      id: 3,
      question: "`5 == \"5\"` va `5 === \"5\"`?",
      options: [
        "true va true",
        "true va false",
        "false va true",
        "false va false"
      ],
      correctAnswer: 1,
      explanation: "== ko'r (true), === qat'iy (false)."
    },
    {
      id: 4,
      question: "Savatcha: `\"100\" + 50` muammosi nima?",
      options: [
        "150 chiqadi — muammo yo'q",
        "\"10050\" chiqadi — Number() unutildi",
        "Xatolik beradi",
        "0 chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Matn + son = yopishtirish. Avval Number() kerak."
    },
    {
      id: 5,
      question: "Yashirin aylantirishdan himoya yo'li?",
      options: [
        "Hech narsa — ishonish kerak",
        "Turlarni Number() bilan birxillash + === ishlatish",
        "Faqat matn ishlatish",
        "JavaScript ishlatmaslik"
      ],
      correctAnswer: 1,
      explanation: "O'zingiz boshqaring — avtomatga ishonmang."
    }
  ]

};
