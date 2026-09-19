export const miniProject = {
  id: "miniProject",
  title: "🏆 Mini-Loyiha: Kalkulyator Yadrosi",
  language: "javascript",
  theory: `## 1. 💡 Loyiha Nima Qilamiz?

1-Bosqichda o'rgangan HAMMA narsani bitta loyihaga yig'amiz: **Terminal-manager / Kalkulyator yadrosi**. Bu kichik, lekin haqiqiy loyiha — interfeys o'rniga faqat mantiq (yadro) yozamiz.

### Loyiha tarkibi
1. **\`add(a, b)\`** — qo'shish
2. **\`subtract(a, b)\`** — ayirish
3. **\`multiply(a, b)\`** — ko'paytirish
4. **\`divide(a, b)\`** — bo'lish (nolni tekshirish bilan!)
5. **\`calculate(a, op, b)\`** — dispatcher (switch bilan)
6. **\`describe(a, op, b)\`** — natijani matn qilib chiqarish (template literal)

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kalkulyator yasayapsiz**. Ekran (ko'rinish) boshqa darsda, bugun faqat **miya** yasaymiz: tugma bosilganda nima hisoblanishi.

---

## 2. 💻 Bosqichma-bosqich Qurish

### 1-qadam: Asosiy amallar
\`\`\`javascript
function add(a, b) {
  return a + b;
}
function divide(a, b) {
  if (b === 0) return "Nolga bo'lib bo'lmaydi!";
  return a / b;
}
\`\`\`

### 2-qadam: Xatolarni tekshirish
\`\`\`javascript
function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Son kiriting!";
  }
  return a + b;
}
\`\`\`

### 3-qadam: Dispatcher (switch)
\`\`\`javascript
function calculate(a, op, b) {
  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    default: return "Noma'lum amal";
  }
}
\`\`\`

### 4-qadam: Chiqarish
\`\`\`javascript
function describe(a, op, b) {
  const natija = calculate(a, op, b);
  return \`\${a} \${op} \${b} = \${natija}\`;
}
console.log(describe(5, "+", 3));  // "5 + 3 = 8"
\`\`\`

\`\`\`mermaid
flowchart LR
    A["describe(5,'+',3)"] --> B["calculate(5,'+',3)"]
    B --> C["add(5,3)"]
    C --> D["8"]
    D --> E["'5 + 3 = 8'"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Har bir funksiya **bitta vazifa** bajaradi va faqat o'z ishi uchun javobgar:
- \`add\` — qo'shadi (tekshiradi)
- \`calculate\` — tanlaydi (oyna)
- \`describe\` — chiroyli qiladi (ekran)

Bu — **modulli dizayn**: bitta funksiyani o'zgartirsangiz, qolganlari ishlayveradi.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| Nolga bo'lishni tekshirmaslik | \`if (b === 0) return "..."\` | \`5/0 = Infinity\` — foydalanuvchiga g'alati |
| Hamma ishni bitta funksiyaga yig'ish | Har funksiya bitta ish | O'zgartirish va test qilish qiyin |
| Xato o'rniga \`undefined\` qaytarish | Aniq xabar matni | Foydalanuvchi nima bo'lganini tushunadi |

---

## 5. 🔑 Asosiy Atamalar

- **Modul** — alohida vazifa bajaruvchi funksiya
- **Dispatcher** — buyruqni to'g'ri funksiyaga yo'naltiruvchi
- **Validatsiya** — kirimni tekshirish

---

## 6. 🌍 Real Hayotda Qayerda?

- **Bank dasturi:** valyuta konvertori xuddi shu tuzilishda
- **Onlayn do'kon:** savatcha hisobi shu usulda
- **O'yin:** zar/koordinata hisoblari shunday yoziladi

---

## 7. 🎙 Intervyu Savollari

**1. Nega har funksiyaga bitta vazifa beriladi?**
**Javob:** Test qilish oson, o'zgartirish xavfsiz, qayta ishlatish mumkin.

**2. \`calculate\` da nega switch?**
**Javob:** Bitta qiymat (\`op\`) ning ko'p varianti — switch tabiiy tanlov.

**3. Nolga bo'lishni qanday tekshirasiz?**
**Javob:** \`if (b === 0)\` bilan oldindan ushlab, xabar matni qaytarish.

---

## 8. ✅ Xulosa

- **Kichik funksiyalar** + **dispatcher** + **validatsiya** = professional tuzilish
- Bu — 1-Bosqichning yakuniy sinovi!
- **Keyingi qadam:** 2-Bosqichda ma'lumot turlarini chuqurroq o'rganamiz (Math, String, Date, Array)`,
exercises: [
    {
      id: 1,
      title: "Qo'shish",
      instruction: "`add(a, b)` funksiyasini yozing — ikki sonni qo'shib qaytarsin.",
      startingCode: "function add(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a + b;",
      test: "const fn = new Function(code + '; return add;')();\nif (fn(5, 3) === 8 && fn(-1, 1) === 0) return null;\nreturn '5+3=8 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Ayirish va ko'paytirish",
      instruction: "`subtract(a, b)` va `multiply(a, b)` funksiyalarini yozing.",
      startingCode: "function subtract(a, b) {\n  // Kodni shu yerda yozing\n}\nfunction multiply(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a - b;  /  return a * b;",
      test: "const r = new Function(code + '; return [subtract, multiply];')();\nif (r[0](10, 4) === 6 && r[1](3, 4) === 12) return null;\nreturn 'Ikkala funksiya to\\'g\\'ri bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Bo'lish + nol tekshiruvi",
      instruction: "`divide(a, b)` funksiyasini yozing. Nolga bo'linsa `\"Nolga bo'lib bo'lmaydi!\"` qaytarsin.",
      startingCode: "function divide(a, b) {\n  // Nolni tekshiring\n}\n",
      hint: "if (b === 0) return \"Nolga bo'lib bo'lmaydi!\"; return a / b;",
      test: "const fn = new Function(code + '; return divide;')();\nif (fn(10, 2) === 5 && fn(5, 0) === \"Nolga bo'lib bo'lmaydi!\") return null;\nreturn 'Nolni tekshirish kerak!';"
    },
    {
      id: 4,
      title: "Validatsiya",
      instruction: "`safeAdd(a, b)` funksiyasi: agar ikkisi ham son bo'lmasa `\"Son kiriting!\"` qaytarsin, aks holda yig'indini.",
      startingCode: "function safeAdd(a, b) {\n  // typeof bilan tekshiring\n}\n",
      hint: "if (typeof a !== \"number\" || typeof b !== \"number\") return \"Son kiriting!\"; return a + b;",
      test: "const fn = new Function(code + '; return safeAdd;')();\nif (fn(5, 3) === 8 && fn(\"5\", 3) === 'Son kiriting!') return null;\nreturn 'typeof bilan tekshiring';"
    },
    {
      id: 5,
      title: "Dispatcher",
      instruction: "`calculate(a, op, b)` funksiyasi switch bilan ishlasin: `\"+\"` => add, `\"-\"` => subtract, `\"*\"` => multiply, `\"/\"` => divide, boshqasi => `\"Noma'lum amal\"`. Barcha funksiyalar kodda bo'lishi kerak.",
      startingCode: "function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\nfunction divide(a, b) { if (b === 0) return \"Nolga bo'lib bo'lmaydi!\"; return a / b; }\n\nfunction calculate(a, op, b) {\n  // switch yozing\n}\n",
      hint: "switch (op) { case \"+\": return add(a, b); ... default: return \"Noma'lum amal\"; }",
      test: "const fn = new Function(code + '; return calculate;')();\nif (fn(5, \"+\", 3) === 8 && fn(10, \"-\", 4) === 6 && fn(3, \"*\", 4) === 12 && fn(10, \"/\", 2) === 5 && fn(1, \"%\", 2) === \"Noma'lum amal\") return null;\nreturn 'Barcha amallar ishlashi kerak';"
    },
    {
      id: 6,
      title: "Chiqarish",
      instruction: "`describe(a, op, b)` funksiyasi backtick bilan `\"5 + 3 = 8\"` formatida qaytarsin. `calculate` dan foydalaning.",
      startingCode: "function calculate(a, op, b) {\n  switch (op) {\n    case \"+\": return a + b;\n    default: return \"Noma'lum amal\";\n  }\n}\nfunction describe(a, op, b) {\n  // backtick yozing\n}\n",
      hint: "const natija = calculate(a, op, b); return `${a} ${op} ${b} = ${natija}`;",
      test: "const fn = new Function(code + '; return describe;')();\nif (fn(5, \"+\", 3) === '5 + 3 = 8') return null;\nreturn 'Format: 5 + 3 = 8';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Nega har funksiya bitta vazifa bajarishi kerak?",
      options: [
        "Kod qisqaradi",
        "Test qilish va o'zgartirish osonlashadi",
        "JavaScript talab qiladi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Modulli dizayn — professional tuzilish."
    },
    {
      id: 2,
      question: "Nolga bo'lish natijasi nima?",
      options: [
        "0",
        "Infinity — shuning uchun tekshirish kerak",
        "Xatolik avtomatik",
        "NaN har doim"
      ],
      correctAnswer: 1,
      explanation: "if (b === 0) bilan ushlab, xabar qaytarish kerak."
    },
    {
      id: 3,
      question: "`calculate` da nega switch ishlatiladi?",
      options: [
        "Tezroq ishlaydi",
        "Bitta qiymatning ko'p varianti bor",
        "if ishlamaydi",
        "Shart emas"
      ],
      correctAnswer: 1,
      explanation: "op ning bir nechta qiymati — switch tabiiy."
    },
    {
      id: 4,
      question: "`describe` funksiyasining vazifasi?",
      options: [
        "Hisoblash",
        "Natijani o'qilishi chiroyli matn qilib chiqarish",
        "Xatoni ushlash",
        "Sonlarni saqlash"
      ],
      correctAnswer: 1,
      explanation: "Chiqarish qatlami alohida bo'lishi kerak."
    },
    {
      id: 5,
      question: "Validatsiya nima?",
      options: [
        "Test yozish",
        "Kirimni tekshirish (tur, qiymat)",
        "Kodni chiroyli qilish",
        "Funksiya nomi"
      ],
      correctAnswer: 1,
      explanation: "Noto'g'ri kirimni erta ushlash."
    }
  ]
};
