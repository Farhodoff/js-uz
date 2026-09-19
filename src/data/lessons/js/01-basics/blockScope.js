export const blockScopeLesson = {
  id: "blockScopeLesson",
  title: "Blok Ko'lami (Block Scope)",
  language: "javascript",
  theory: `## 1.  Sodda Tushuntirish

### Block scope — \`{ }\` ichidagi hudud
Har bir figurali qavs juftligi (\`{ }\`) — alohida kichik hudud. \`let\` yoki \`const\` bilan yaratilgan o'zgaruvchi **faqat o'sha qavslar ichida** yashaydi.

\`\`\`javascript
if (true) {
  let xona = "yotoqxona";
  console.log(xona);  // ✅ ko'rinadi
}
console.log(xona);  // ❌ ReferenceError!
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **mehmonxonadasiz**:
- \`{ }\` — bitta xona
- Xonadagi narsalar (\`let\` bilan olingan) — **faqat o'sha xona mehmoniga tegishli**
- Xonadan chiqsangiz (\`}\`) — narsalar qoladi, siz ularni ko'rmaysiz
- Koridordagi umumiy narsalar (\`global\`) — hammaga ko'rinadi

Eng muhimi: \`var\` bilan olingan narsa — xonaga "yopishmaydi", u butun qavat bo'ylab yuradi!

---

## 2. 💻 Bloklar Qayerda Uchraydi?

Blok — bu har qanday \`{ }\`: \`if\`, \`for\`, \`while\`, \`switch\`, hatto yalang'och \`{ }\`.

\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i);  // ✅ 0, 1, 2
}
console.log(i);  // ❌ ReferenceError — sikl tugadi, i yo'qoldi
\`\`\`

Har iteratsiyada yangi \`i\` yaratiladi:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 0, 1, 2 (har biri o'z i sini eslab qoladi!)
}
\`\`\`

\`var\` bilan esa bitta umumiy o'zgaruvchi bo'lardi — mashhur xato!

### let vs var — blokda
\`\`\`javascript
if (true) {
  var v = "var chiqib ketadi";
  let l = "let qoladi";
}
console.log(v);  // ✅ "var chiqib ketadi"
console.log(l);  // ❌ ReferenceError
\`\`\`

\`\`\`mermaid
flowchart LR
    A["{ } blok"] --> B["let/const: faqat ichida"]
    A --> C["var: blokni tark etadi"]
\`\`\`

---

## 3. ️ Qanday Ishlaydi

Blok ochilganda JavaScript yangi **ko'rinish qatlami** yaratadi. Blok yopilganda qatlam o'chiriladi.

Bu **"eng tor scope" qoidasi** asosida ishlaydi: o'zgaruvchini qancha tor joyda yaratsangiz, u shuncha xavfsiz — hech kim tasodifan uni o'zgartira olmaydi.

---

## 4. ️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| Blok ichidagi \`let\` ni tashqarida ishlatish | O'zgaruvchini kerakli joyda e'lon qilish | Blok yopilgach o'zgaruvchi o'ladi |
| Sikldan keyin \`i\` kerak bo'lish | \`let natija\` ni sikldan OLDIN e'lon qilish | Sikldagi \`i\` faqat sikl ichida |
| Blokda \`var\` dan "yashirin" o'zgaruvchi kutish | \`let\` ishlatish | \`var\` blokka bo'ysunmaydi |

---

## 5. 🔑 Asosiy Atamalar

- **Block scope** — \`{ }\` ichidagi ko'rinish hududi
- **Lokal blok o'zgaruvchisi** — blok ichida yaratilgan (\`let\`/\`const\`)
- **Eng tor scope qoidasi** — o'zgaruvchini kerak joyda yaratish amaliyoti

---

## 6. 🌍 Real Hayotda Qayerda?

- **Sikl hisoblagichi:** \`for (let i ...)\` — \`i\` faqat siklda kerak
- **Shart ichidagi oraliq:** \`if\` ichida hisoblangan qiymat — tashqariga sizib chiqmasin
- **Xavfsiz kod:** blok scope tufayli nom to'qnashuvi kamayadi

---

## 7. 🎙 Intervyu Savollari

**1. Block scope nima?**
**Javob:** \`let\`/\`const\` bilan yaratilgan o'zgaruvchining faqat \`{ }\` ichida ko'rinishi.

**2. \`var\` blokni chetlab o'tadimi?**
**Javob:** Ha — \`var\` blokka bo'ysunmaydi, faqat funksiyaga.

**3. Nega \`for (let i ...)\` afzal?**
**Javob:** \`i\` faqat sikl ichida yashaydi va har iteratsiyada yangi bo'ladi (closure muammolari yo'q).

---

## 8. ✅ Xulosa

- **\`{ }\`** — eng tor hudud: \`let\`/\`const\` shu yerda yashaydi
- **\`var\` blokni tark etadi** — shuning uchun \`let\` tavsiya qilinadi
- **Eng tor scope qoidasi** — xavfsiz kodning asosi
- **Keyingi qadam:** 1.15-darsda qaror qabul qilish — if/else`,
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
