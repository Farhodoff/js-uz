export const globalScopeLesson = {
  id: "globalScopeLesson",
  title: "Global Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Scope nima?
**Scope** — o'zgaruvchining "ko'rinish hududi": qayerda yaratilgan bo'lsa, o'sha yerda (va ichkarida) ko'rinadi, tashqarida — yo'q.

Uch xil scope bor:
- **Global** — hamma joyda ko'rinadi (shahar maydoni)
- **Function** — faqat funksiya ichida (uy ichi)
- **Block** — faqat \`{ }\` ichida (xona ichi)

### Real hayotiy o'xshatish
Tasavvur qiling, siz **katta binodasiz**:
- **Global** — binoning peshlavhasidagi yozuv: ko'chadan ham, har qavatdan ham ko'rinadi
- **Function** — 3-qavatdagi ofis ichidagi doska: faqat o'sha ofisdagilar ko'radi
- **Block** — ofis ichidagi seyf: faqat seyf oldida turgan odam ko'radi

\`\`\`javascript
let shahar = "Toshkent";  // global — hamma ko'radi

function ofis() {
  let doska = "reja";     // function — faqat ofis ichida
  if (true) {
    let seyf = "pul";     // block — faqat shu xonada
  }
}
\`\`\`

---

## 2. 💻 Har Biri Amalda

### Global — hamma joyda
\`\`\`javascript
let shahar = "Toshkent";

function salom() {
  console.log(shahar);  // ko'rinadi!
}
salom();  // Toshkent
\`\`\`

### Function — faqat ichida (\`var\` ham shunday)
\`\`\`javascript
function hisob() {
  var jami = 100;
  console.log(jami);  // 100
}
console.log(jami);  // XATO! Tashqaridan ko'rinmaydi
\`\`\`

### Block — faqat \`{ }\` ichida (\`let\`/\`const\`)
\`\`\`javascript
if (true) {
  let xona = "yotoqxona";
  console.log(xona);  // ko'rinadi
}
console.log(xona);  // XATO! Blok tugadi — xona yo'qoldi
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Global"] --> B["Function"]
    B --> C["Block"]
    A -->|"hamma ko'radi"| D["maydon"]
    B -->|"faqat ichida"| E["ofis"]
    C -->|"faqat qavs ichida"| F["xona"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

JavaScript o'zgaruvchini qidirganda **ichkaridan tashqariga** qaraydi: avval blok, keyin funksiya, keyin global. Topilmasa — \`ReferenceError\`.

\`\`\`javascript
let ism = "Ali";  // global
function test() {
  console.log(ism);  // tashqaridan topib oldi: Ali
}
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`var\` ni blokda "yashirin" deb o'ylash | \`var\` blokni mensimasligini bilish | \`var\` faqat funksiyaga bo'ysunadi! |
| Hamma narsani global qilish | Iloji boricha tor scope | Global — nomlar to'qnashuvi manbai |
| Blok ichidagi \`let\` ni tashqarida chaqirish | Blok ichida ishlatish | Qavs yopilishi bilan o'zgaruvchi o'ladi |

---

## 5. 🔑 Asosiy Atamalar

- **Scope** — ko'rinish hududi
- **Global** — hamma joyda ko'rinadigan
- **Function scope** — faqat funksiya ichida (\`var\`)
- **Block scope** — faqat \`{ }\` ichida (\`let\`/\`const\`)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Sozlamalar:** \`const API_URL\` — global (hamma joyda kerak)
- **Vaqtincha hisob:** sikl ichidagi \`let i\` — faqat siklda kerak
- **Maxfiy:** funksiya ichidagi parol — tashqariga chiqmasligi kerak

---

## 7. 🎙 Intervyu Savollari

**1. Global, function va block scope farqi nima?**
**Javob:** Global — hamma joyda; function — faqat funksiya ichida; block — faqat \`{ }\` ichida.

**2. \`var\` va \`let\` scope bo'yicha farqi?**
**Javob:** \`var\` — function scope (blokni mensimaydi), \`let\`/\`const\` — block scope.

**3. Nega global o'zgaruvchilar kam bo'lishi kerak?**
**Javob:** Har qanday kod o'zgartira oladi — nomlar to'qnashadi, xato topish qiyinlashadi.

---

## 8. ✅ Xulosa

- **3 scope:** global (maydon), function (ofis), block (xona)
- **\`var\`** — function, **\`let/const\`** — block
- **Qoida:** o'zgaruvchini iloji boricha TOR joyda yarating
- **Keyingi qadam:** 1.13–1.14-darslarda har bir scope batafsil
`,
  exercises: [
    {
      id: 1,
      title: "Global e'lon",
      instruction: "`shahar` nomli GLOBAL o'zgaruvchi yarating (funksiyadan tashqarida) va unga `\"Toshkent\"` bering.",
      startingCode: "// Global o'zgaruvchi yarating\n",
      hint: "let shahar = \"Toshkent\";",
      test: "const v = new Function(code + '; return (typeof shahar !== \"undefined\" ? shahar : null);')();\nif (v === 'Toshkent') return null;\nreturn 'shahar global bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Ichkaridan o'qish",
      instruction: "`getCity()` funksiyasi global `shahar` ni qaytarsin. Avval `let shahar = \"Samarqand\";` yozing.",
      startingCode: "let shahar = \"Samarqand\";\nfunction getCity() {\n  // shahar ni qaytaring\n}\n",
      hint: "return shahar;",
      test: "const fn = new Function(code + '; return getCity;')();\nif (fn() === 'Samarqand') return null;\nreturn 'Global o\\'zgaruvchi funksiya ichida ko\\'rinadi';"
    },
    {
      id: 3,
      title: "Blok tuzog'i",
      instruction: "`test()` funksiyasida `if (true)` bloki ichida `let sir = 42;` yarating va uni O'SHA BLOK ICHIDA qaytaring.",
      startingCode: "function test() {\n  if (true) {\n    // sir ni yarating va qaytaring\n  }\n}\n",
      hint: "let sir = 42; return sir;",
      test: "const fn = new Function(code + '; return test;')();\nif (fn() === 42) return null;\nreturn 'Blok ichida qaytarish kerak';"
    },
    {
      id: 4,
      title: "Ichkaridan tashqariga",
      instruction: "`outer()` ichida `ichki = \"topildi\"` yarating va qaytaring. So'ng uni chaqirib natijani `natija` ga saqlang.",
      startingCode: "function outer() {\n  // ichki ni yarating\n}\n// natija ga saqlang\n",
      hint: "let ichki = \"topildi\"; return ichki; ... const natija = outer();",
      test: "const v = new Function(code + '; return (typeof natija !== \"undefined\" ? natija : null);')();\nif (v === 'topildi') return null;\nreturn 'natija topildi bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "Soya (shadowing)",
      instruction: "Global `ism = \"Ali\"` yarating. `salom()` funksiyasi ICHIDA `ism = \"Vali\"` yarating va qaytaring. Funksiya `Vali` qaytarishi kerak.",
      startingCode: "let ism = \"Ali\";\nfunction salom() {\n  // Vali ni qaytaring\n}\n",
      hint: "let ism = \"Vali\"; return ism;",
      test: "const fn = new Function(code + '; return salom;')();\nif (fn() === 'Vali') return null;\nreturn 'Ichki ism soyaga olishi kerak';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "Scope nima?",
      options: [
        "O'zgaruvchining ko'rinish hududi",
        "Teleskop turi",
        "Internet tezligi",
        "Dastur nomi"
      ],
      correctAnswer: 0,
      explanation: "Qayerda yaratilgan bo'lsa — o'sha yerda ko'rinadi."
    },
    {
      id: 2,
      question: "Blok ichidagi `let` tashqaridan ko'rinadimi?",
      options: [
        "Ha, har doim",
        "Yo'q — qavs yopilishi bilan o'ladi",
        "Faqat yakshanba",
        "Faqat console.log bilan"
      ],
      correctAnswer: 1,
      explanation: "Block scope — faqat { } ichida."
    },
    {
      id: 3,
      question: "`var` va `let` scope farqi?",
      options: [
        "Farqi yo'q",
        "var — function, let — block",
        "let — function, var — block",
        "Ikkisi ham global"
      ],
      correctAnswer: 1,
      explanation: "var blokni mensimaydi — shuning uchun let tavsiya qilinadi."
    },
    {
      id: 4,
      question: "Funksiya global o'zgaruvchini o'qiy oladimi?",
      options: [
        "Yo'q, hech qachon",
        "Ha — ichkaridan tashqariga qidiradi",
        "Faqat ruxsat bilan",
        "Faqat string bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "Ichkaridan tashqariga qidiruv — scope chain."
    },
    {
      id: 5,
      question: "Nega hamma narsani global qilmaslik kerak?",
      options: [
        "Global sekin ishlaydi",
        "Har qanday kod o'zgartira oladi — xato topish qiyinlashadi",
        "Global taqiqlangan",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Tor scope — xavfsiz kod."
    }
  ]

};
