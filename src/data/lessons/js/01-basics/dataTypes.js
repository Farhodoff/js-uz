export const dataTypesLesson = {
  id: "dataTypesLesson",
  title: "Ma'lumot Turlari (Data Types)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Ma'lumot turi nima?
Har bir "quti" (o'zgaruvchi) ichida biror narsa bor — son, matn, rost/yolg'on. Ana shu "narsa"ning ko'rinishi — **ma'lumot turi** (data type) deyiladi.

JavaScript'da 3 ta eng asosiy tur bor:

\`\`\`javascript
let yosh = 25;        // number — son
let ism = "Ali";      // string — matn
let talaba = true;    // boolean — rost/yolg'on
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **omborda qutilarni saralayapsiz**:
- **number** — ustida raqam yozilgan qutilar (necha dona?)
- **string** — ustida yozuv bor qutilar (nima deb ataladi?)
- **boolean** — ustida faqat ✅ yoki ❌ belgisi bor qutilar (bormi/yo'qmi?)

Omborchi qutini ochmasdan turib ham yorlig'idan ichida nima borligini biladi. JavaScript ham shunday — har bir qiymatning "yorlig'i" bor.

---

## 2. 💻 Uchta Asosiy Tur

### number — sonlar
Butun ham, kasr ham, manfiy ham — hammasi \`number\`:

\`\`\`javascript
let yosh = 25;
let narx = 99.99;
let qarz = -500;
console.log(10 + 5);  // 15
\`\`\`

### string — matn
Qo'shtirnoq ichidagi har qanday yozuv:

\`\`\`javascript
let ism = "Ali";
let salom = 'Salom';
console.log("Ali" + " " + "Vali");  // Ali Vali
\`\`\`

### boolean — rost/yolg'on
Faqat ikkita qiymat: \`true\` (rost) yoki \`false\` (yolg'on):

\`\`\`javascript
let talaba = true;
let bitirgan = false;
console.log(10 > 5);  // true
\`\`\`

### Turini tekshirish — typeof
Quti ichida nima borligini bilmoqchimisiz? \`typeof\` so'rang:

\`\`\`javascript
console.log(typeof 25);      // "number"
console.log(typeof "Ali");   // "string"
console.log(typeof true);    // "boolean"
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Qiymat"] --> B{"Qo'shtirnoqdami?"}
    B -->|"Ha"| C["string"]
    B -->|"Yo'q"| D{"true/false mi?"}
    D -->|"Ha"| E["boolean"]
    D -->|"Yo'q"| F["number"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

JavaScript **dinamik til** — qutining turi oldindan belgilanmaydi, ichidagi narsaga qarab o'zi aniqlaydi:

\`\`\`javascript
let narsa = 25;       // hozir number
narsa = "Salom";      // endi string — hech qanday ruxsat kerak emas!
\`\`\`

Bu qulaylik ham, xavf ham: bir qutiga avval son, keyin matn solsangiz — kod chalkashib ketishi mumkin. Shuning uchun **bitta qutiga bitta turdagi narsa soling**.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`let yosh = "25";\` (son kerak bo'lsa) | \`let yosh = 25;\` | Qo'shtirnoq ichidagi \`25\` — matn, son emas! \`"25" + 5 = "255"\` bo'ladi |
| \`console.log("10" - 2);\` ga hayron qolish | Sonlar bilan ishlaganda qo'shtirnoqsiz yozish | \`-\` matnni songa aylantiradi: natija \`8\` (kutilmagan!) |
| \`True\` yoki \`TRUE\` yozish | \`true\` (kichik harf) | Faqat kichik harf taniladi |

---

## 5. 🔑 Asosiy Atamalar

- **number** — son turi (butun, kasr, manfiy)
- **string** — matn turi (qo'shtirnoq ichida)
- **boolean** — mantiqiy tur (\`true\`/\`false\`)
- **typeof** — qiymat turini aniqlaydigan operator
- **Dinamik tiplash** — tur oldindan emas, qiymatga qarab belgilanishi

---

## 6. 🌍 Real Hayotda Qayerda?

- **Kalkulyator:** \`number\` — sonlarni qo'shish, ayirish
- **Ro'yxatdan o'tish:** \`string\` — ism, manzil, parol
- **Kirish tekshiruvi:** \`boolean\` — parol to'g'rimi? (\`true\`/\`false\`)

---

## 7. 🎙 Intervyu Savollari

**1. JavaScript'dagi 3 ta asosiy primitiv tur qaysilar?**
**Javob:** \`number\` (son), \`string\` (matn), \`boolean\` (rost/yolg'on).

**2. \`"25" + 5\` natijasi nima va nima uchun?**
**Javob:** \`"255"\` — matn. \`+\` matn bilan ishlaganda yopishtiradi, qo'shmaydi.

**3. \`typeof\` nima qiladi?**
**Javob:** Qiymat turini matn ko'rinishida qaytaradi: \`typeof 25\` → \`"number"\`.

---

## 8. ✅ Xulosa

- **3 asosiy tur:** \`number\` (son), \`string\` (matn), \`boolean\` (\`true\`/\`false\`)
- **\`typeof\`** — turini so'rash usuli
- **Ehtiyot bo'ling:** \`"25"\` (matn) va \`25\` (son) — ikki xil narsa!
- **Keyingi qadam:** 1.5-darsda maxsus turlar — \`null\`, \`undefined\`, \`BigInt\`, \`Symbol\`
`,
  exercises: [
    {
      id: 1,
      title: "Uch xil quti",
      instruction: "Uchta o'zgaruvchi yarating: `yosh = 25` (son), `ism = \"Ali\"` (matn), `talaba = true` (mantiqiy).",
      startingCode: "// Uchta o'zgaruvchi yarating\n",
      hint: "let yosh = 25; let ism = \"Ali\"; let talaba = true;",
      test: "const r = new Function(code + '; return [yosh, ism, talaba];')();\nif (r[0] === 25 && r[1] === 'Ali' && r[2] === true) return null;\nreturn 'yosh=25, ism=Ali, talaba=true bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Turini top",
      instruction: "`checkType(value)` funksiyasini yozing. U qiymat turini `typeof` bilan qaytarsin.",
      startingCode: "function checkType(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value;",
      test: "const fn = new Function(code + '; return checkType;')();\nif (fn(42) === 'number' && fn('x') === 'string' && fn(false) === 'boolean') return null;\nreturn 'typeof noto\\'g\\'ri ishlatildi';"
    },
    {
      id: 3,
      title: "Matn yopishtirish",
      instruction: "`makeFullName(ism, familiya)` funksiyasi `Ali Vali` formatida to'liq ism qaytarsin (orada bo'sh joy bilan).",
      startingCode: "function makeFullName(ism, familiya) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return ism + \" \" + familiya;",
      test: "const fn = new Function(code + '; return makeFullName;')();\nif (fn('Ali', 'Vali') === 'Ali Vali') return null;\nreturn 'Bo\\'sh joy bilan yopishtirish kerak';"
    },
    {
      id: 4,
      title: "Solishtirish natijasi",
      instruction: "`isGreater(a, b)` funksiyasi `a > b` natijasini (`true`/`false`) qaytarsin.",
      startingCode: "function isGreater(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a > b;",
      test: "const fn = new Function(code + '; return isGreater;')();\nif (fn(10, 5) === true && fn(3, 7) === false) return null;\nreturn 'Solishtirish xato';"
    },
    {
      id: 5,
      title: "Sonmi yoki matnmi?",
      instruction: "`isNumber(value)` funksiyasi qiymat `number` bo'lsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function isNumber(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value === \"number\";",
      test: "const fn = new Function(code + '; return isNumber;')();\nif (fn(25) === true && fn(\"25\") === false && fn(true) === false) return null;\nreturn 'Faqat number uchun true qaytishi kerak';"
    },
    {
      id: 6,
      title: "Chegirma hisoblash",
      instruction: "`discount(narx, foiz)` funksiyasi chegirmali narxni qaytarsin. Masalan: discount(100, 20) => 80.",
      startingCode: "function discount(narx, foiz) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return narx - (narx * foiz / 100);",
      test: "const fn = new Function(code + '; return discount;')();\nif (fn(100, 20) === 80 && fn(50, 10) === 45) return null;\nreturn 'Chegirma formulasi xato';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`let yosh = 25;` da `yosh` ning turi nima?",
      options: [
        "string",
        "number",
        "boolean",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "25 qo'shtirnoqsiz yozilgan — bu son (number)."
    },
    {
      id: 2,
      question: "`\"25\" + 5` natijasi nima?",
      options: [
        "30",
        "\"255\" (matn)",
        "20",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "`+` matn bilan yopishtiradi: \"25\" + \"5\" = \"255\"."
    },
    {
      id: 3,
      question: "`typeof true` nimani qaytaradi?",
      options: [
        "\"true\"",
        "\"boolean\"",
        "\"number\"",
        "true"
      ],
      correctAnswer: 1,
      explanation: "typeof har doim tur nomini matn qilib qaytaradi."
    },
    {
      id: 4,
      question: "Qaysi biri `boolean` qiymat?",
      options: [
        "\"rost\"",
        "1",
        "false",
        "\"false\""
      ],
      correctAnswer: 2,
      explanation: "Faqat `true` va `false` (qo'shtirnoqsiz) boolean hisoblanadi."
    },
    {
      id: 5,
      question: "JavaScript nega \"dinamik\" til deyiladi?",
      options: [
        "U juda tez yuguradi",
        "Tur oldindan emas, qiymatga qarab belgilanadi",
        "Unda turlar umuman yo'q",
        "Faqat harakatli saytlar uchun"
      ],
      correctAnswer: 1,
      explanation: "Bir qutiga avval son, keyin matn solish mumkin — tur avtomatik."
    },
    {
      id: 6,
      question: "`console.log(typeof \"Ali\")` nima chiqaradi?",
      options: [
        "Ali",
        "\"string\"",
        "\"text\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "\"Ali\" qo'shtirnoqda — demak string."
    }
  ]

};
