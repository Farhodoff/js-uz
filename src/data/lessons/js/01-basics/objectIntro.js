export const objectIntroLesson = {
  id: "objectIntroLesson",
  title: "Obyektlarga Kirish (Object)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Obyekt nima?
**Obyekt** — bir nechta ma'lumotni bitta joyda saqlaydigan "kartoteka". Oddiy o'zgaruvchi bitta narsani saqlasa, obyekt **ko'plab xususiyatlarni** bitta nom ostida guruhlaydi.

\`\`\`javascript
let talaba = {
  ism: "Ali",
  yosh: 20,
  talaba: true
};
\`\`\`

Bu obyektda 3 ta **kalit-qiymat jufti** bor: \`ism: "Ali"\`, \`yosh: 20\`, \`talaba: true\`.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kartotekaga qarayapsiz**:
- Har bir qog'oz — bitta obyekt
- Ustida "Ism:", "Yosh:", "Guruh:" deb yozilgan joylar — **kalitlar (keys)**
- Unga yozilgan javoblar — **qiymatlar (values)**

Bitta qog'ozda hamma narsa bor — chaqirganda butun obyektni olasiz, kerakli maydonini esa nomi bilan olasiz.

---

## 2. 💻 Yaratish va O'qish

### Obyekt yaratish
\`\`\`javascript
const talaba = {
  ism: "Ali",
  yosh: 20,
  talaba: true
};
\`\`\`

### Nuqta bilan o'qish
\`\`\`javascript
console.log(talaba.ism);   // "Ali"
console.log(talaba.yosh);  // 20
\`\`\`

### Kvadrat qavs bilan o'qish
\`\`\`javascript
console.log(talaba["ism"]);  // "Ali"
\`\`\`

Kvadrat qavs foydali bo'ladi, agar kalit nomi o'zgaruvchida saqlangan bo'lsa:

\`\`\`javascript
let kalit = "ism";
console.log(talaba[kalit]);  // "Ali"
\`\`\`

\`\`\`mermaid
flowchart LR
    A["talaba obyekti"] --> B["ism: Ali"]
    A --> C["yosh: 20"]
    A --> D["talaba: true"]
    E["talaba.ism"] --> B
    F["talaba['yosh']"] --> C
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Obyekt — **reference type** (havola turi). U xotirada alohida saqlanadi, o'zgaruvchi esa unga "ko'rsatkich" bo'ladi:

\`\`\`javascript
let a = { x: 1 };
let b = a;      // b a ga havola qiladi (nusxa emas!)
b.x = 99;
console.log(a.x);  // 99 — ikkalasi bitta obyektni ko'radi!
\`\`\`

Bu **primitiv** (son, matn) dan farq qiladi — primitivlar qiymat bo'yicha ko'chadi.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`talaba.ism\` o'rniga \`talaba["ism"]\` deb ishonish | Ikkalasi ham to'g'ri, lekin nuqta qulay | Kvadrat faqat dinamik kalitda kerak |
| \`let b = a\` ni nusxa deb o'ylash | Bu havola, nusxa emas | Ikkalasi bitta obyektni ko'radi |
| Kalit yo'q bo'lsa \`undefined\` deb qabul qilish | \`in\` yoki \`hasOwnProperty\` bilan tekshirish | \`talaba.familiya\` → \`undefined\` |
| Kalitda \`-\` bo'lsa \`obj.a-b\` yozish | \`obj["a-b"]\` | \`-\` minus deb tushuniladi |

---

## 5. 🔑 Asosiy Atamalar

- **Obyekt** — kalit-qiymat juftlari to'plami
- **Kalit (key)** — xususiyat nomi
- **Qiymat (value)** — xususiyatning qiymati
- **Property** — kalit-qiymat jufti
- **Reference** — havola (obyektga yo'l)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Foydalanuvchi:** \`{ ism, email, yosh }\` — bitta obyektda
- **Sozlamalar:** \`{ til: "uz", mavzu: "qora" }\`
- **Mahsulot:** \`{ nom: "Non", narx: 5000, mavjud: true }\`

---

## 7. 🎙 Intervyu Savollari

**1. Obyekt nima va primitivdan nimasi bilan farq qiladi?**
**Javob:** Obyekt — kalit-qiymat to'plami (reference type), primitiv — yakka qiymat (number, string).

**2. \`obj.key\` va \`obj["key"]\` farqi?**
**Javob:** Bir xil, lekin \`["key"]\` dinamik kalit nomi kerak bo'lganda ishlatiladi.

**3. \`let b = a\` obyektni nusxalaydimi?**
**Javob:** Yo'q — havola yaratiladi, nusxa emas. Ikkalasi bitta obyektni ko'radi.

---

## 8. ✅ Xulosa

- **Obyekt** = kartoteka: \`{ kalit: qiymat }\`
- **O'qish:** \`obj.kalit\` yoki \`obj["kalit"]\`
- **Havola:** \`let b = a\` nusxa emas!
- **Keyingi qadam:** 2.6-darsda obyektlarni chuqurroq o'rganamiz (metodlar, copy, immutability)
`,
exercises: [
    {
      id: 1,
      title: "Birinchi obyekt",
      instruction: "`talaba` nomli obyekt yarating: `ism: \"Ali\"` va `yosh: 20` bo'lsin.",
      startingCode: "// talaba obyektini yarating\n",
      hint: "const talaba = { ism: \"Ali\", yosh: 20 };",
      test: "const v = new Function(code + '\\nreturn talaba;')();\nif (v.ism === 'Ali' && v.yosh === 20) return null;\nreturn 'ism va yosh kerak';"
    },
    {
      id: 2,
      title: "Nuqta bilan o'qish",
      instruction: "`getIsm(obj)` funksiyasi obyektning `ism` maydonini nuqta bilan qaytarsin.",
      startingCode: "function getIsm(obj) {\n  // obj.ism qaytaring\n}\n",
      hint: "return obj.ism;",
      test: "const fn = new Function(code + '; return getIsm;')();\nif (fn({ism: 'Ali', yosh: 20}) === 'Ali') return null;\nreturn 'obj.ism qaytaring';"
    },
    {
      id: 3,
      title: "Kvadrat qavs",
      instruction: "`getKalit(obj, kalit)` funksiyasi kvadrat qavs bilan `obj[kalit]` qaytarsin.",
      startingCode: "function getKalit(obj, kalit) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return obj[kalit];",
      test: "const fn = new Function(code + '; return getKalit;')();\nif (fn({yosh: 20}, 'yosh') === 20 && fn({ism: 'Ali'}, 'ism') === 'Ali') return null;\nreturn 'obj[kalit] qaytaring';"
    },
    {
      id: 4,
      title: "Havola tekshiruvi",
      instruction: "`obj` obyekti yarating (`{ x: 1 }`). `let b = obj;` yozing, keyin `b.x = 99` qiling. `obj.x` ham 99 bo'lishini tekshiring.",
      startingCode: "// obj yarating, b ga havola qiling\n",
      hint: "const obj = { x: 1 }; let b = obj; b.x = 99;",
      test: "const v = new Function(code + '\\nreturn obj;')();\nif (v.x === 99) return null;\nreturn 'obj.x 99 bo\\'lishi kerak (havola)';"
    },
    {
      id: 5,
      title: "Mavjudlik tekshiruvi",
      instruction: "`hasKalit(obj, kalit)` funksiyasi kalit obyektda bormi — `true`/`false` qaytarsin.",
      startingCode: "function hasKalit(obj, kalit) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return kalit in obj; yoki return obj[kalit] !== undefined;",
      test: "const fn = new Function(code + '; return hasKalit;')();\nif (fn({a: 1}, 'a') === true && fn({a: 1}, 'b') === false) return null;\nreturn 'Kalit mavjudligi tekshirilsin';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Obyekt nima?",
      options: [
        "Faqat son saqlovchi",
        "Kalit-qiymat juftlari to'plami",
        "Matn qatori",
        "Funksiya turi"
      ],
      correctAnswer: 1,
      explanation: "{ ism: \"Ali\", yosh: 20 } — kalit: qiymat."
    },
    {
      id: 2,
      question: "`talaba.ism` va `talaba[\"ism\"]` — farqi?",
      options: [
        "Bir xil, lekin nuqta qulay",
        "Bir xil, lekin [ ] dinamik kalit uchun",
        "Bir xil emas",
        "Faqat nuqta ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Kalit o'zgaruvchida bo'lsa [ ] ishlatiladi."
    },
    {
      id: 3,
      question: "`let b = a; b.x = 5;` — `a.x` nima bo'ladi?",
      options: [
        "1 (o'zgarmaydi)",
        "5 — ikkalasi bitta obyektga havola",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "let b = a nusxa emas, havola."
    },
    {
      id: 4,
      question: "Obyekt qaysi turga kiradi?",
      options: [
        "Primitiv",
        "Reference (havola) turi",
        "String",
        "Boolean"
      ],
      correctAnswer: 1,
      explanation: "Xotirada alohida, o'zgaruvchi havola saqlaydi."
    },
    {
      id: 5,
      question: "Kalitda `-` bo'lsa qanday o'qiymiz?",
      options: [
        "obj.a-b",
        "obj[\"a-b\"]",
        "obj->a-b",
        "Mumkin emas"
      ],
      correctAnswer: 1,
      explanation: "Kvadrat qavs kalitni matn sifatida oladi."
    }
  ]
};
