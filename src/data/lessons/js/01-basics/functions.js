export const functions = {
  id: "functions",
  title: "Funksiyalar Asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Funksiya nima?
**Funksiya** — bir marta yozilib, ko'p marta chaqiriladigan buyruqlar to'plami. Xuddi oshxona retsepti: bir marta yozasiz, har safar ovqat pishirganda qayta ishlatasiz.

\`\`\`javascript
function salomBer(ism) {
  return "Salom, " + ism + "!";
}

console.log(salomBer("Ali"));   // Salom, Ali!
console.log(salomBer("Vali"));  // Salom, Vali!
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **qahvaxona ochdingiz**:
- **Retsept (funksiya)** — "qahva tayyorlash" yo'riqnomasi (bir marta yoziladi)
- **Buyurtma (chaqiruv)** — har bir mijoz uchun retseptni bajarish
- **Masalliq (parametr)** — har mijozning istagi (shakarli/shakarsiz)
- **Tayyor ichimlik (return)** — mijozga beriladigan natija

Bitta retsept — yuzlab mijoz!

---

## 2. 💻 Tuzilishi

\`\`\`javascript
function NOM(PARAMETRLAR) {
  // ...buyruqlar...
  return NATIJA;
}
\`\`\`

### Parametr vs Argument
- **Parametr** — retseptdagi "masalliq o'rni" (\`ism\`)
- **Argument** — haqiqiy berilgan narsa (\`"Ali"\`)

\`\`\`javascript
function kopaytir(a, b) {  // a, b — parametrlar
  return a * b;
}
kopaytir(3, 4);  // 3, 4 — argumentlar → 12
\`\`\`

### return — natijani qaytarish
\`\`\`javascript
function kvadrat(son) {
  return son * son;  // natija tashqariga chiqadi
}
let natija = kvadrat(5);  // 25
\`\`\`

\`\`\`mermaid
flowchart LR
    A["Chaquiruv: salomBer('Ali')"] --> B["Parametr: ism = 'Ali'"]
    B --> C["Tana: yopishtirish"]
    C --> D["return: 'Salom, Ali!'"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Funksiya chaqirilganda:
1. Argumentlar parametrlarga ko'chiriladi
2. Tana qator-ma-qator bajariladi
3. \`return\` ga yetishi bilan — qiymat qaytadi, funksiya tugaydi
4. \`return\` siz funksiya \`undefined\` qaytaradi

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`return\` dan keyingi kodga ishonish | return oxirgi bo'lishi | return dan keyingi kod HECH QACHON ishlamaydi |
| \`console.log\` ni return deb o'ylash | Farqni bilish | log — chop etadi, return — qaytaradi (saqlab bo'ladi!) |
| Funksiyani chaqirmaslik (\`salomBer\` qavssiz) | \`salomBer("Ali")\` | Qavssiz — faqat nom, chaqiruv emas! |

---

## 5. 🔑 Asosiy Atamalar

- **Funksiya** — qayta ishlatiladigan kod bloki
- **Parametr** — qabul qilinadigan o'zgaruvchi
- **Argument** — uzatiladigan haqiqiy qiymat
- **return** — natijani qaytarish buyrug'i

---

## 6. 🌍 Real Hayotda Qayerda?

- **Hisoblash:** soliq, chegirma, valyuta — har biri funksiya
- **Tekshiruv:** parol, yosh, forma — har biri funksiya
- **Takroriy ish:** har bir tugma bosilganda bitta funksiya

---

## 7. 🎙 Intervyu Savollari

**1. \`console.log\` va \`return\` farqi?**
**Javob:** log konsolga chop etadi (saqlab bo'lmaydi), return qiymatni qaytaradi (o'zgaruvchiga saqlanadi).

**2. Parametr va argument farqi?**
**Javob:** Parametr — e'londagi nom, argument — chaqiruvdagi haqiqiy qiymat.

**3. return siz funksiya nima qaytaradi?**
**Javob:** \`undefined\`.

---

## 8. ✅ Xulosa

- **Funksiya** = retsept: bir marta yoz, ko'p marta chaqir
- **return** — natija eshigi, undan keyingi kod o'ladi
- **Qavs shart:** \`nom\` ≠ \`nom()\`
- **Keyingi qadam:** 1.20-darsda matnlar bilan ishlash — template literals
`,
  exercises: [
    {
      id: 1,
      title: "Salomlashuv",
      instruction: "`salomBer(ism)` funksiyasi `\"Salom, Ali!\"` formatida qaytarsin.",
      startingCode: "function salomBer(ism) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return \"Salom, \" + ism + \"!\";",
      test: "const fn = new Function(code + '; return salomBer;')();\nif (fn(\"Ali\") === 'Salom, Ali!') return null;\nreturn 'Format: Salom, Ali!';"
    },
    {
      id: 2,
      title: "Kvadrat",
      instruction: "`kvadrat(son)` funksiyasi sonning kvadratini qaytarsin. Masalan: kvadrat(5) => 25.",
      startingCode: "function kvadrat(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return son * son;",
      test: "const fn = new Function(code + '; return kvadrat;')();\nif (fn(5) === 25 && fn(3) === 9) return null;\nreturn 'son * son';"
    },
    {
      id: 3,
      title: "To'liq ism",
      instruction: "`toliqIsm(ism, familiya)` funksiyasi `\"Ali Valiyev\"` qaytarsin.",
      startingCode: "function toliqIsm(ism, familiya) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return ism + \" \" + familiya;",
      test: "const fn = new Function(code + '; return toliqIsm;')();\nif (fn(\"Ali\", \"Valiyev\") === 'Ali Valiyev') return null;\nreturn 'Bo\\'sh joy bilan!';"
    },
    {
      id: 4,
      title: "Chegirma",
      instruction: "`chegirma(narx, foiz)` funksiyasi yakuniy narxni qaytarsin. Masalan: chegirma(100, 20) => 80.",
      startingCode: "function chegirma(narx, foiz) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return narx - (narx * foiz / 100);",
      test: "const fn = new Function(code + '; return chegirma;')();\nif (fn(100, 20) === 80 && fn(200, 50) === 100) return null;\nreturn 'Formula xato';"
    },
    {
      id: 5,
      title: "Eng kattasi",
      instruction: "`engKatta(a, b, c)` funksiyasi uch sondan eng kattasini qaytarsin.",
      startingCode: "function engKatta(a, b, c) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (a >= b && a >= c) return a; if (b >= c) return b; return c;",
      test: "const fn = new Function(code + '; return engKatta;')();\nif (fn(1, 5, 3) === 5 && fn(9, 2, 7) === 9 && fn(1, 1, 8) === 8) return null;\nreturn 'Uchala holat to\\'g\\'ri bo\\'lishi kerak';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "Funksiya nima uchun kerak?",
      options: [
        "Kod chiroyli ko'rinishi uchun",
        "Bir kodni ko'p marta qayta ishlatish uchun",
        "Kompyuterni tezlatish uchun",
        "Hech narsa uchun"
      ],
      correctAnswer: 1,
      explanation: "Bir retsept — yuzlab mijoz."
    },
    {
      id: 2,
      question: "Parametr va argument farqi?",
      options: [
        "Bir xil",
        "Parametr — e'londagi nom, argument — chaqiruvdagi qiymat",
        "Argument — e'londagi, parametr — chaqiruvdagi",
        "Ikkisi ham keraksiz"
      ],
      correctAnswer: 1,
      explanation: "function f(ism) — parametr; f(\"Ali\") — argument."
    },
    {
      id: 3,
      question: "`return` dan keyingi kod nima bo'ladi?",
      options: [
        "Ishlaydi",
        "Hech qachon ishlamaydi",
        "Ikki marta ishlaydi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "return — chiqish eshigi."
    },
    {
      id: 4,
      question: "`salomBer` va `salomBer()` farqi?",
      options: [
        "Bir xil",
        "Birinchisi nom, ikkinchisi chaqiruv",
        "Birinchisi chaqiruv",
        "Ikkisi ham xato"
      ],
      correctAnswer: 1,
      explanation: "Qavs — \"bajar!\" degan buyruq."
    },
    {
      id: 5,
      question: "return siz funksiya nima qaytaradi?",
      options: [
        "null",
        "undefined",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh qaytish — undefined."
    }
  ]

};
