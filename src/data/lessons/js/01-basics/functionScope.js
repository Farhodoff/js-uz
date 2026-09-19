export const functionScopeLesson = {
  id: "functionScopeLesson",
  title: "Function Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Function scope — funksiya "hududi"
Funksiya ichida yaratilgan o'zgaruvchi **faqat o'sha funksiya ichida** ko'rinadi. Tashqariga chiqmaydi.

\`\`\`javascript
function hisob() {
  let jami = 100;
  console.log(jami);  // ✅ 100
}

hisob();
console.log(jami);  // ❌ ReferenceError: jami is not defined
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ofis xonasidasiz**:
- Xona ichidagi doskadagi yozuv — **faqat xonadagilar ko'radi**
- Xona eshigi yopilgach (\`}\`), doska o'chiriladi — tashqaridagilar uni ko'rmaydi
- Xona ichidan koridorga (tashqi scope) qarash mumkin — lekin koridordan xonaga qarab bo'lmaydi!

Ana shu — **bir tomonlama ko'rinish**: ichkaridan tashqariga ✅, tashqaridan ichkariga ❌.

---

## 2. 💻 var va let — ikkalasi ham funksiyaga bo'ysunadi

\`\`\`javascript
function test() {
  var a = 1;
  let b = 2;
  const c = 3;
}
test();
console.log(a, b, c);  // ❌ Uchtasi ham topilmaydi
\`\`\`

Function scope — \`var\` ning **asosiy** hududi (blokni mensimaydi, lekin funksiyaga bo'ysunadi):

\`\`\`javascript
function demo() {
  if (true) {
    var x = 5;   // blokda yaratildi...
  }
  console.log(x);  // ✅ 5 — var blokdan chiqib ketdi (lekin funksiyadan chiqmaydi!)
}
demo();
\`\`\`

### Ichkaridan tashqariga o'qish
\`\`\`javascript
const GLOBAL_URL = "https://api.example.com";

function fetchData() {
  console.log(GLOBAL_URL);  // ✅ Global ko'rinadi
}
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Global scope"] --> B["Funksiya scope"]
    B --> C["Blok scope"]
    A -.->|"✅ ko'rinadi"| B
    B -.->|"✅ ko'rinadi"| C
    C -.->|"❌ ko'rinmaydi"| B
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Funksiya chaqirilganda JavaScript unga yangi **"xotira xonasi"** ochadi. Funktsiya tugagach, xona yopiladi va ichidagi o'zgaruvchilar o'chiriladi (garbage collector tozalaydi).

Shuning uchun:
\`\`\`javascript
function sanoq() {
  let hisob = 0;
  hisob++;
  return hisob;
}
sanoq();  // 1
sanoq();  // 1 — har chaqiruvda YANGI xona! (oldingi hisob o'chgan)
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| Funksiya ichidagi \`var\` ni tashqarida ishlatish | \`return\` bilan natijani chiqarish | Funksiya scope yopiq xona |
| Natijani \`console.log\` qilib qaytarmaslik | \`return\` ishlatish | Konsol chiqishi funksiyadan "chiqmaydi" |
| Har funksiyada bir xil nom (\`data\`, \`temp\`) | Aniq nomlar | Ko'rinmasa ham chalkashlik tug'diradi |

---

## 5. 🔑 Asosiy Atamalar

- **Function scope** — funksiya ichidagi ko'rinish hududi
- **Lokal o'zgaruvchi** — funksiya ichida yaratilgan
- **Global o'zgaruvchi** — funksiyadan tashqarida yaratilgan (hammaga ko'rinadi)
- **ReferenceError** — mavjud bo'lmagan o'zgaruvchiga murojaat

---

## 6. 🌍 Real Hayotda Qayerda?

- **Funksiya ichki hisoblari:** oraliq natijalar (\`temp\`, \`jami\`) — tashqariga kerak emas
- **Yordamchi funksiyalar:** ichki yordamchi faqat shu fayl/funksiyaga xizmat qiladi
- **Maxfiylik:** funksiya ichidagi parol/token tashqariga chiqmasligi kerak

---

## 7. 🎙 Intervyu Savollari

**1. Funksiya ichidagi o'zgaruvchi tashqaridan ko'rinadimi?**
**Javob:** Yo'q — funksiya tugashi bilan o'chiriladi.

**2. \`var\` function scope'da qanday o'zini tutadi?**
**Javob:** Blokni mensimaydi, lekin funksiyadan chiqmaydi (\`if\` ichida yaratilsa ham funksiyada ko'rinadi).

**3. Funksiya global o'zgaruvchini o'qiy oladimi?**
**Javob:** Ha — ko'rinish ichkaridan tashqariga ochiq.

---

## 8. ✅ Xulosa

- **Funksiya ichi** — yopiq xona: ichkaridan tashqariga ko'rinadi, teskarisi yo'q
- **\`var\` ham, \`let\` ham** funksiyaga bo'ysunadi (lekin \`var\` blokka bo'ysunmaydi)
- **Natijani chiqarish uchun \`return\`**, konsol emas!
- **Keyingi qadam:** 1.14-darsda eng tor hudud — blok scope`,
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
