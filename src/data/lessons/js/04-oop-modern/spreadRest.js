export const spreadRest = {
  id: "spreadRest",
  title: "Spread va Rest (...) — Yoyish va Yig'ish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### \`...\` — uch nuqta (spread/rest)
Bir xil belgi, ikki xil vazifa:

- **Spread (yoyish)** — massiv/obyektni "ochib" elementlarni joyiga yoyish
- **Rest (yig'ish)** — qolgan elementlarni "yig'ib" bitta massivga solish

\`\`\`javascript
// SPREAD — yoyish:
const sonlar = [1, 2, 3];
console.log(...sonlar);      // 1 2 3 (massiv emas, 3 ta alohida son!)

// REST — yig'ish:
function yigindi(...sonlar) {
  return sonlar;             // barcha argumentlar massivga yig'ildi
}
console.log(yigindi(1, 2, 3));  // [1, 2, 3]
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **choynak va stakanlarsiz**:
- **Spread** — choynakdagi choy uchta stakanga YOYILADI (bitta quti → ko'p narsa)
- **Rest** — stollarga tarqalgan stakanlarni bitta SABADAGA YIG'ASIZ (ko'p narsa → bitta quti)

> **Yodlash:** chaqirishda/ochishda — **spread** (yoyish). Parametrda/oxirida — **rest** (yig'ish).

---

## 2. 💻 Spread Amaliyotda

### Massivni nusxalash va birlashtirish
\`\`\`javascript
const a = [1, 2];
const b = [...a];        // yangi nusxa! (havola emas)
b.push(3);
console.log(a);          // [1, 2] — a o'zgarmadi ✅

const birlashgan = [...a, ...b];  // [1, 2, 1, 2, 3]
\`\`\`

### O'rtaga qo'shish
\`\`\`javascript
const yangi = [0, ...a, 99];  // [0, 1, 2, 99]
\`\`\`

### Obyekt spread
\`\`\`javascript
const asosiy = { ism: "Ali", yosh: 20 };
const yangilangan = { ...asosiy, yosh: 21 };  // yosh ustiga yozildi
console.log(yangilangan);  // { ism: "Ali", yosh: 21 }
\`\`\`

\`\`\`mermaid
flowchart TD
    A["... (uch nuqta)"] --> B{"Qayerda turgan?"}
    B -->|"Chaqirishda / ifodada"| C["SPREAD — yoyish"]
    B -->|"Parametrda / destructuring oxirida"| D["REST — yig'ish"]
    C --> E["...massiv, ...obyekt"]
    D --> F["function f(...args)"]
\`\`\`

---

## 3. ⚙️ Rest Amaliyotda

### Noma'lum sondagi argumentlar
\`\`\`javascript
function jami(...sonlar) {
  let summa = 0;
  for (const son of sonlar) {
    summa += son;
  }
  return summa;
}
console.log(jami(1, 2));        // 3
console.log(jami(1, 2, 3, 4));  // 10 — istalgancha!
\`\`\`

### Birinchi argument + qolganlar
\`\`\`javascript
function ismVaQolganlar(ism, ...boshqalar) {
  return boshqalar;
}
console.log(ismVaQolganlar("Ali", "futbol", "shaxmat"));
// ["futbol", "shaxmat"]
\`\`\`

### Destructuring oxirida
\`\`\`javascript
const [birinchi, ...qolgan] = [1, 2, 3, 4];
console.log(qolgan);  // [2, 3, 4]
\`\`\`

> ⚠️ Rest **har doim OXIRIDA** bo'lishi shart: \`function f(...a, b)\` — XATO!

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`const b = a\` ni nusxa deb o'ylash | \`const b = [...a]\` | Havola yaratiladi, nusxa emas |
| Rest ni o'rtaga qo'yish | \`function f(a, ...rest)\` | Rest faqat OXIRIDA bo'lishi mumkin |
| Obyektni \`[...obj]\` bilan nusxalash | \`{ ...obj }\` | Obyekt uchun jingalak qavslar |
| Ichma-ich obyektlarni spread bilan chuqur nusxalash deb o'ylash | \`structuredClone(obj)\` | Spread — SAYOR (shallow) nusxa! |

---

## 5. 🔑 Asosiy Atamalar

- **Spread** — yoyish: massiv/obyekt elementlarini joyiga yozish
- **Rest** — yig'ish: qolgan argumentlarni massivga solish
- **Shallow copy** — sayoz nusxa (faqat 1-qavat)
- **Chaining** — zanjirlash

---

## 6. 🌍 Real Hayotda Qayerda?

- **State yangilash (React):** \`setUser({ ...user, yosh: 21 })\` — o'zgarmas yangilash
- **Savatcha:** \`const yangiSavatcha = [...savatcha, yangiMahsulot]\`
- **Sozlamalarni birlashtirish:** \`{ ...defaultlar, ...foydalanuvchiSozlamalari }\`
- **Sum/maximum:** \`Math.max(...sonlar)\`

---

## 7. 🎙 Intervyu Savollari

**1. Spread va Rest farqi nima?**
**Javob:** Ikkisi bir xil \`...\` belgi. Chaqirishda/ifodada — spread (yoyadi), parametrda — rest (yig'adi).

**2. \`[...massiv]\` nimaga kerak?**
**Javob:** Yangi nusxa yaratish — asl massiv o'zgarmasligi uchun (immutability).

**3. \`{ ...obj, yangi: 1 }\` nima qiladi?**
**Javob:** Yangi obyekt yaratadi, eski maydonlar saqlanadi, \`yangi\` qo'shiladi (mos nom bo'lsa ustiga yoziladi).

**4. Spread chuqur (deep) nusxa beradimi?**
**Javob:** Yo'q — faqat 1-qavat. Ichma-ich obyektlar havola qoladi. Deep uchun \`structuredClone()\`.

---

## 8. ✅ Xulosa

- **\`...\` = spread** (yoyish) yoki **rest** (yig'ish) — joyiga qarab
- **Nusxalash:** \`[...massiv]\`, \`{ ...obyekt }\` — aslni saqlab qoladi
- **Rest faqat oxirida**, \`Math.max(...sonlar)\` — eng qulay ishlatish
- **Keyingi qadam:** 4.5-darsda Optional Chaining \`?.\` va Nullish Coalescing \`??\``,
exercises: [
    {
      id: 1,
      title: "Spread bilan nusxa",
      instruction: "`a = [1, 2, 3]` ni spread bilan NUSXAlang (`b`). So'ng `b.push(4)` qiling. `a` o'zgarmasligi kerak!",
      startingCode: "const a = [1, 2, 3];\n// spread bilan nusxa oling\n",
      hint: "const b = [...a]; b.push(4); return [a.length, b.length];",
      test: "const r = new Function(code + '\\nreturn [a.length, b.length];')();\nif (r[0] === 3 && r[1] === 4) return null;\nreturn 'a o\\'zgarmasligi kerak (spread nusxa)';"
    },
    {
      id: 2,
      title: "Birlashtirish",
      instruction: "Ikki massivni spread bilan birlashtiring: `[...a, ...b]`.",
      startingCode: "const a = [1, 2];\nconst b = [3, 4];\n// birlashtiring\n",
      hint: "const birlashgan = [...a, ...b]; return birlashgan;",
      test: "const r = new Function(code + '\\nreturn birlashgan;')();\nif (JSON.stringify(r) === JSON.stringify([1,2,3,4])) return null;\nreturn '[1,2,3,4] kutilgandi';"
    },
    {
      id: 3,
      title: "Obyektni yangilash",
      instruction: "`user = { ism: \"Ali\", yosh: 20 }` obyektini spread bilan yangilang: yosh 21 bo'lsin (asl o'zgarmasligi kerak).",
      startingCode: "const user = { ism: \"Ali\", yosh: 20 };\n// spread bilan yangilang\n",
      hint: "const yangi = { ...user, yosh: 21 }; return [user.yosh, yangi.yosh];",
      test: "const r = new Function(code + '\\nreturn [user.yosh, yangi.yosh];')();\nif (r[0] === 20 && r[1] === 21) return null;\nreturn 'user o\\'zgarmasligi, yangi 21 bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Rest parametri",
      instruction: "`jami(...sonlar)` funksiyasi istalgancha son qabul qilib, yig'indisini qaytarsin (rest bilan).",
      startingCode: "// rest bilan funksiya yozing\n",
      hint: "function jami(...sonlar) { let s = 0; for (const x of sonlar) s += x; return s; }",
      test: "const fn = new Function(code + '; return jami;')();\nif (fn(1, 2) === 3 && fn(1, 2, 3, 4) === 10) return null;\nreturn 'Rest parametri ishlamadi';"
    },
    {
      id: 5,
      title: "Rest + destructuring",
      instruction: "`[birinchi, ...qolgan] = [10, 20, 30, 40]` — birinchini alohida, qolganlarini massivga yig'ing.",
      startingCode: "const sonlar = [10, 20, 30, 40];\n// rest destructuring\n",
      hint: "const [birinchi, ...qolgan] = sonlar; return [birinchi, qolgan];",
      test: "const r = new Function(code + '\\nreturn [birinchi, qolgan];')();\nif (r[0] === 10 && JSON.stringify(r[1]) === JSON.stringify([20,30,40])) return null;\nreturn 'birinchi=10, qolgan=[20,30,40]';"
    },
    {
      id: 6,
      title: "Math.max bilan spread",
      instruction: "`engKatta(...sonlar)` funksiyasi `Math.max(...sonlar)` bilan eng kattasini qaytarsin.",
      startingCode: "// spread bilan Math.max\n",
      hint: "const engKatta = (...sonlar) => Math.max(...sonlar);",
      test: "const fn = new Function(code + '; return engKatta;')();\nif (fn(3, 7, 5) === 7 && fn(1, 9, 2) === 9) return null;\nreturn 'Math.max(...sonlar) ishlating';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "`...` belgisi parametrda tursa — bu nima?",
      options: [
        "Spread (yoyish)",
        "Rest (yig'ish)",
        "Kopiratsiya",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Parametrda — argumentlarni massivga yig'adi."
    },
    {
      id: 2,
      question: "`const b = [...a]; b.push(4);` — `a` o'zgaradimi?",
      options: [
        "Ha, o'zgaradi",
        "Yo'q — spread yangi nusxa yaratdi",
        "Xatolik",
        "Ba'zan"
      ],
      correctAnswer: 1,
      explanation: "Spread — yangi massiv, asl saqlanadi."
    },
    {
      id: 3,
      question: "`{ ...user, yosh: 21 }` nimani qiladi?",
      options: [
        "user ni o'chiradi",
        "Yangi obyekt: eski maydonlar + yosh ustiga yozilgan",
        "Faqat yosh saqlaydi",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Mos kalitlar ustiga yoziladi — qulay yangilash."
    },
    {
      id: 4,
      question: "`function f(...a, b)` to'g'rimi?",
      options: [
        "Ha",
        "Yo'q — rest faqat OXIRIDA bo'lishi mumkin",
        "Faqat strictda",
        "Faqat arrowda"
      ],
      correctAnswer: 1,
      explanation: "Rest parametr ro'yxatining oxirida bo'lishi shart."
    },
    {
      id: 5,
      question: "`Math.max(...[3, 7, 5])` natijasi?",
      options: [
        "Xatolik",
        "7 (spread massivni alohida sonlarga yoyadi)",
        "[3, 7, 5]",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "Spread massivni argumentlarga aylantiradi: Math.max(3,7,5)."
    }
  ]
};
