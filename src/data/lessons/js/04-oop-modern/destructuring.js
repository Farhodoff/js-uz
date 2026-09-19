export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Destructuring — "quti ochish"
Obyekt yoki massivdan qiymatlarni olib, ularni darhol o'zgaruvchilarga solishning qisqa usuli.

\`\`\`javascript
// ESKI (uzun) usul:
const talaba = { ism: "Ali", yosh: 20 };
const ism = talaba.ism;
const yosh = talaba.yosh;

// YANGI (destructuring) usul — bir qatorda:
const { ism: ism2, yosh: yosh2 } = talaba;
// yoki kalit nomi = o'zgaruvchi nomi bo'lsa:
const { ism, yosh } = talaba;

console.log(ism, yosh);  // Ali 20
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ko'chish qutilarini ochyapsiz**:
- **Quti (obyekt)** — ichida bir nechta narsa
- **Destructuring** — qutini ochib, har narsani o'z o'rniga (o'zgaruvchiga) joylash
- \`{ ism, yosh } = talaba\` — "qutidagi ISM va YOSH yorliqli narsalarni olib qo'y" degani

Massiv uchun ham xuddi shunday, lekin **tartib bo'yicha**:

\`\`\`javascript
const [birinchi, ikkinchi] = [10, 20];
console.log(birinchi, ikkinchi);  // 10 20
\`\`\`

> **Yodlash:** obyekt = \`{}\` va **nom bo'yicha**, massiv = \`[]\` va **tartib bo'yicha**.

---

## 2. 💻 Obyekt Destructuring

### Asosiy shakl
\`\`\`javascript
const foydalanuvchi = {
  ism: "Ali",
  email: "ali@mail.uz",
  yosh: 25
};

const { ism, email } = foydalanuvchi;
console.log(ism);    // Ali
console.log(email);  // ali@mail.uz
\`\`\`

### Yangi nom bilan olish
\`\`\`javascript
const { ism: foydalanuvchiIsmi } = foydalanuvchi;
console.log(foydalanuvchiIsmi);  // Ali
\`\`\`

### Default qiymat
\`\`\`javascript
const { ism, shahar = "Toshkent" } = foydalanuvchi;
console.log(shahar);  // Toshkent (obyektda yo'q edi — default ishlatildi)
\`\`\`

### Funksiya parametrlarida (eng ko'p ishlatiladigan!)
\`\`\`javascript
function salomla({ ism, yosh }) {
  console.log(\`\${ism}, \${yosh} yosh\`);
}

salomla({ ism: "Ali", yosh: 20 });  // Ali, 20 yosh
\`\`\`

\`\`\`mermaid
flowchart LR
    A["Obyekt/Massiv"] --> B{"Qanday ochamiz?"}
    B -->|"Obyekt (nom bo'yicha)"| C["{ ism, yosh } = obj"]
    B -->|"Massiv (tartib bo'yicha)"| D["[a, b] = massiv"]
    C --> E["Yangi nom: { ism: yangiNom }"]
    C --> F["Default: { shahar = 'Toshkent' }"]
\`\`\`

---

## 3. ⚙️ Massiv va Aralash Destructuring

### Massiv
\`\`\`javascript
const [birinchi, , uchinchi] = [10, 20, 30];
console.log(birinchi, uchinchi);  // 10 30 (2-si tashlab yuborildi)
\`\`\`

### Joy almashtirish (swap)
\`\`\`javascript
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);  // 2 1
\`\`\`

### Aralash (obyekt ichida massiv)
\`\`\`javascript
const javob = { holat: "ok", natijalar: [1, 2, 3] };
const { holat, natijalar: [birinchi] } = javob;
console.log(holat, birinchi);  // ok 1
\`\`\`

### Spread bilan qolganini olish
\`\`\`javascript
const [birinchi, ...qolgan] = [1, 2, 3, 4];
console.log(qolgan);  // [2, 3, 4]
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`{ ism: foydalanuvchiIsmi }\` ni teskari o'ylash | \`kalit: yangiNom\` — CHAP tomondan O'NGga | Kalit — obyektdagi nom, o'ng — yangi o'zgaruvchi |
| Massivni \`{}\` bilan ochish | \`[]\` bilan | Obyekt = \`{}\`, massiv = \`[]\` |
| Mavjud bo'lmagan kalitni tekshirmaslik | Default qiymat berish: \`{ shahar = "—" }\` | Yo'q kalit → \`undefined\` |
| \`const\` bilan qayta o'zlashtirish | \`let\` ishlatish (swap uchun) | \`const\` qiymatni o'zgartirib bo'lmaydi |

---

## 5. 🔑 Asosiy Atamalar

- **Destructuring** — obyekt/massivni "ochib" qiymatlarni o'zgaruvchilarga olish
- **Renaming** — yangi nom bilan olish: \`{ ism: yangiNom }\`
- **Default value** — kalit yo'q bo'lsa ishlatiladigan qiymat
- **Swap** — ikki o'zgaruvchi qiymatini almashtirish

---

## 6. 🌍 Real Hayotda Qayerda?

- **API javobi:** \`const { data, status } = await fetch(...)\`
- **React props:** \`function Kartochka({ ism, rasm }) { ... }\`
- **Sozlamalar:** \`const { til, mavzu } = sozlamalar\`
- **Joy almashtirish:** \`[a, b] = [b, a]\`

Zamonaviy React/Vue kodining deyarli har funksiyasida uchraydi!

---

## 7. 🎙 Intervyu Savollari

**1. Destructuring nima?**
**Javob:** Obyekt/massivdagi qiymatlarni bir qatorda o'zgaruvchilarga olish usuli: \`const { ism } = obj\`.

**2. Obyekt va massiv destructuring farqi?**
**Javob:** Obyekt — nom bo'yicha (\`{}\`), massiv — tartib bo'yicha (\`[]\`).

**3. Default qiymat qanday beriladi?**
**Javob:** \`const { shahar = "Toshkent" } = obj\` — kalit yo'q bo'lsa default ishlaydi.

**4. \`const { ism: yangiIsm }\` nima qiladi?**
**Javob:** \`ism\` kalitining qiymatini \`yangiIsm\` o'zgaruvchisiga soladi.

---

## 8. ✅ Xulosa

- **Obyekt:** \`{ kalit } = obj\` — nom bo'yicha
- **Massiv:** \`[a, b] = massiv\` — tartib bo'yicha
- **Yangi nom:** \`{ kalit: yangiNom }\`, **default:** \`{ kalit = qiymat }\`
- **Funksiya parametrlarida** — eng ko'p ishlatiladigan joy
- **Keyingi qadam:** 4.4-darsda Spread va Rest operatorlari (...)`,
exercises: [
    {
      id: 1,
      title: "Obyektni ochish",
      instruction: "`const { ism, yosh } = talaba;` destructuring yozing va ikkalasini massivda qaytaring.",
      startingCode: "const talaba = { ism: \"Ali\", yosh: 20 };\n// destructuring yozing\n",
      hint: "const { ism, yosh } = talaba; return [ism, yosh];",
      test: "const r = new Function(code + '\\nreturn [ism, yosh];')();\nif (r[0] === 'Ali' && r[1] === 20) return null;\nreturn 'ism=Ali, yosh=20 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Yangi nom bilan",
      instruction: "`{ ism: toliqIsm }` bilan kalitni yangi nomga oling va `toliqIsm` qaytaring.",
      startingCode: "const talaba = { ism: \"Vali\", yosh: 22 };\n// yangi nom bilan oling\n",
      hint: "const { ism: toliqIsm } = talaba; return toliqIsm;",
      test: "const v = new Function(code + '\\nreturn toliqIsm;')();\nif (v === 'Vali') return null;\nreturn 'toliqIsm = Vali bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Default qiymat",
      instruction: "Obyektda `shahar` YO'Q. Destructuring bilan oling va default Toshkent bering.",
      startingCode: "const foydalanuvchi = { ism: \"Ali\" };\n// shahar uchun default bering\n",
      hint: "const { shahar = \"Toshkent\" } = foydalanuvchi; return shahar;",
      test: "const v = new Function(code + '\\nreturn shahar;')();\nif (v === 'Toshkent') return null;\nreturn 'Default qiymat ishlamadi';"
    },
    {
      id: 4,
      title: "Funksiya parametrlarida",
      instruction: "`salomla({ ism, yosh })` funksiyasi destructuring parametr bilan `\"Ali (20)\"` qaytarsin (backtick bilan).",
      startingCode: "function salomla(malumot) {\n  // destructuring parametr yozing\n}\n",
      hint: "function salomla({ ism, yosh }) { return `${ism} (${yosh})`; }",
      test: "const fn = new Function(code + '; return salomla;')();\nif (fn({ ism: 'Ali', yosh: 20 }) === 'Ali (20)') return null;\nreturn 'Format: Ali (20)';"
    },
    {
      id: 5,
      title: "Massiv destructuring",
      instruction: "`[birinchi, , uchinchi]` bilan 1 va 3-elementlarni oling, 2-sini tashlang. Massiv qaytaring.",
      startingCode: "const sonlar = [10, 20, 30];\n// destructuring yozing\n",
      hint: "const [birinchi, , uchinchi] = sonlar; return [birinchi, uchinchi];",
      test: "const r = new Function(code + '\\nreturn [birinchi, uchinchi];')();\nif (r[0] === 10 && r[1] === 30) return null;\nreturn '10 va 30 olinishi kerak';"
    },
    {
      id: 6,
      title: "Joy almashtirish",
      instruction: "`a = 1, b = 2` ni destructuring bilan almashtiring (swap). Natija: a=2, b=1.",
      startingCode: "let a = 1;\nlet b = 2;\n// swap yozing\n",
      hint: "[a, b] = [b, a];",
      test: "const r = new Function(code + '\\nreturn [a, b];')();\nif (r[0] === 2 && r[1] === 1) return null;\nreturn 'a=2, b=1 bo\\'lishi kerak';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Obyekt destructuring qaysi qavslar bilan yoziladi?",
      options: [
        "[ ]",
        "{ }",
        "( )",
        "< >"
      ],
      correctAnswer: 1,
      explanation: "Obyekt = {} (nom bo'yicha), massiv = [] (tartib bo'yicha)."
    },
    {
      id: 2,
      question: "`const { ism: yangiIsm } = obj` nimani qiladi?",
      options: [
        "obj ni o'chiradi",
        "ism kalitining qiymatini yangiIsm o'zgaruvchisiga soladi",
        "ism nomini o'zgartiradi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Kalit: yangiNom — renaming."
    },
    {
      id: 3,
      question: "`const { shahar = \"Toshkent\" } = obj` — obyektda shahar YO'Q bo'lsa?",
      options: [
        "Xatolik",
        "undefined",
        "\"Toshkent\" (default ishlaydi)",
        "null"
      ],
      correctAnswer: 2,
      explanation: "Default qiymat faqat kalit yo'q bo'lsa ishlaydi."
    },
    {
      id: 4,
      question: "`[a, b] = [b, a]` nima qiladi?",
      options: [
        "Massiv yaratadi",
        "a va b qiymatlarini almashtiradi (swap)",
        "Xatolik beradi",
        "Ko'chiradi"
      ],
      correctAnswer: 1,
      explanation: "Klassik swap — vaqtincha o'zgaruvchi kerak emas."
    },
    {
      id: 5,
      question: "Funksiya parametrlarida destructuring qanday foydali?",
      options: [
        "Tezroq ishlaydi",
        "Funksiya faqat kerakli maydonlarni oladi — o'qilishi oson",
        "Xotira tejaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "function f({ ism, yosh }) — nomlar hujjat kabi."
    }
  ]
};
