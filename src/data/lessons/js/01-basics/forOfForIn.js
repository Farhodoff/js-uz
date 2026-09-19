export const forOfForIn = {
  id: "forOfForIn",
  title: "Sikllar: for...of va for...in",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Nima uchun yana ikkita sikl?
Oddiy \`for\` bilan massivni aylanganda index bilan ishlaysiz:

\`\`\`javascript
const mevalar = ["olma", "behi", "anor"];

for (let i = 0; i < mevalar.length; i++) {
  console.log(mevalar[i]);  // index orqali — uzunroq yo'l
}
\`\`\`

\`for...of\` — **qiymatlarni** bevosita beradi (indexsiz):

\`\`\`javascript
for (const meva of mevalar) {
  console.log(meva);  // olma, behi, anor — to'g'ridan-to'g'ri!
}
\`\`\`

\`for...in\` — **kalitlarni** (obyekt xususiyatlari nomlarini) beradi:

\`\`\`javascript
const talaba = { ism: "Ali", yosh: 20 };

for (const kalit in talaba) {
  console.log(kalit, ":", talaba[kalit]);
}
// ism : Ali
// yosh : 20
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **tilim tortayapsiz**:
- **Oddiy for** — "1-bo'lakni olib, keyin 2-bo'lakni olib..." (raqamlab yurish kerak)
- **for...of** — "har bo'lakni olib kel" (faqat bo'laklar, raqamlash shart emas)
- **for...in** — "har bo'lakning YORLIG'INI olib kel" (obyektda kalitlar)

> **Yodlash:** massiv uchun \`for...of\` (qiymatlar), obyekt uchun \`for...in\` (kalitlar).

---

## 2. 💻 for...of — massivlar va "aylanadigan" narsalar

\`\`\`javascript
const sonlar = [10, 20, 30];

for (const son of sonlar) {
  console.log(son * 2);  // 20, 40, 60
}
\`\`\`

- \`son\` — har aylanishda navbatdagi **qiymat**
- Massiv, string, Map, Set bilan ishlaydi

### String bilan ham ishlaydi
\`\`\`javascript
for (const harf of "JS") {
  console.log(harf);  // J, S
}
\`\`\`

### break/continue bilan ishlaydi
\`\`\`javascript
for (const son of [1, 2, 3, 4]) {
  if (son === 3) break;
  console.log(son);  // 1, 2
}
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Sikl tanlash"] --> B{"Nima ustida aylanamiz?"}
    B -->|"Massiv/string (qiymatlar)"| C["for...of"]
    B -->|"Obyekt (kalitlar)"| D["for...in"]
    B -->|"Index yoki maxsus qadam"| E["oddiy for"]
\`\`\`

---

## 3. ⚙️ for...in — obyekt kalitlari

\`\`\`javascript
const mahsulot = {
  nom: "Non",
  narx: 5000,
  mavjud: true
};

for (const kalit in mahsulot) {
  console.log(kalit + " = " + mahsulot[kalit]);
}
// nom = Non
// narx = 5000
// mavjud = true
\`\`\`

**Muhim:** \`for...in\` kalitlarni beradi — qiymatni olish uchun \`obj[kalit]\` yozishingiz kerak:

\`\`\`javascript
for (const kalit in mahsulot) {
  console.log(mahsulot[kalit]);  // ✅ qiymat
  // console.log(kalit);          // ❌ faqat kalit nomi
}
\`\`\`

> ⚠️ **Ehtiyot:** \`for...in\` ni massivda ishlatmang — u indexlarni matn (\`"0"\`, \`"1"\`) ko'rinishida beradi va prototip xususiyatlarini ham tortib kelishi mumkin. Massiv uchun har doim \`for...of\` yoki oddiy \`for\`.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| Massivni \`for...in\` bilan aylash | \`for...of\` ishlatish | \`in\` indexlarni matn qilib beradi |
| \`for...of\` ni obyektga qo'llash | \`for...in\` ishlatish | Obyekt "aylanadigan" (iterable) emas — xato! |
| \`for...in\` da qiymatni to'g'ridan olish | \`obj[kalit]\` yozish | \`in\` faqat KALITLARNI beradi |
| \`let\` o'rniga sikl o'zgaruvchisini e'lonsiz qoldirish | \`for (const x of ...)\` | \`const\`/\`let\` shart |

---

## 5. 🔑 Asosiy Atamalar

- **Iterable (aylanadigan)** — \`for...of\` bilan aylanishi mumkin bo'lgan narsa (massiv, string, Map, Set)
- **Kalit (key)** — obyekt xususiyati nomi
- **Qiymat (value)** — kalitga bog'langan ma'lumot
- **Enumerable** — sanab o'tish mumkin bo'lgan xususiyat

---

## 6. 🌍 Real Hayotda Qayerda?

- **for...of:** ro'yxatni ekranga chiqarish, barcha mahsulotlarni qayta ishlash
- **for...in:** sozlamalar obyektini ko'rib chiqish, formadagi maydonlarni o'qish
- **Amalda:** \`for...of\` 90% hollarda, \`for...in\` — obyekt kalitlari kerak bo'lganda

---

## 7. 🎙 Intervyu Savollari

**1. \`for...of\` va \`for...in\` farqi nima?**
**Javob:** \`for...of\` qiymatlarni beradi (massivlar, iterable'lar uchun), \`for...in\` kalitlarni beradi (obyektlar uchun).

**2. Obyektni \`for...of\` bilan aylasa bo'ladimi?**
**Javob:** Yo'q — obyekt iterable emas, xato beradi. \`for...in\` yoki \`Object.keys()\` kerak.

**3. Nega massivni \`for...in\` bilan aylanmaslik tavsiya qilinadi?**
**Javob:** Indexlar matn ko'rinishida beriladi va prototipdagi qo'shimcha xususiyatlar ham tortib kelishi mumkin.

---

## 8. ✅ Xulosa

- **\`for...of\`** = qiymatlar (massiv, string) — 90% hollarda shu
- **\`for...in\`** = kalitlar (obyekt), qiymat uchun \`obj[kalit]\`
- **Massivda \`for...in\` ishlatmang!**
- **Keyingi qadam:** 1.21-darsda sikllarni boshqarish — break va continue
`,
exercises: [
    {
      id: 1,
      title: "for...of bilan chop etish",
      instruction: "`sum(massiv)` funksiyasi `for...of` bilan barcha sonlar yig'indisini qaytarsin.",
      startingCode: "function sum(massiv) {\n  // for...of yozing\n}\n",
      hint: "let jami = 0; for (const son of massiv) jami += son; return jami;",
      test: "if (!code.includes(' of ')) return 'for...of ishlatilmadi';\nconst fn = new Function(code + '; return sum;')();\nif (fn([1,2,3]) === 6 && fn([]) === 0) return null;\nreturn 'Yig\\'indi xato';"
    },
    {
      id: 2,
      title: "String harflari",
      instruction: "`countLetters(matn, harf)` funksiyasi `for...of` bilan matnda harf necha marta uchraganini sanasin.",
      startingCode: "function countLetters(matn, harf) {\n  // for...of yozing\n}\n",
      hint: "let soni = 0; for (const h of matn) if (h === harf) soni++; return soni;",
      test: "if (!code.includes(' of ')) return 'for...of ishlatilmadi';\nconst fn = new Function(code + '; return countLetters;')();\nif (fn('salom', 'a') === 1 && fn('ana', 'a') === 2) return null;\nreturn 'Sanash xato';"
    },
    {
      id: 3,
      title: "for...in bilan kalitlar",
      instruction: "`keys(obj)` funksiyasi `for...in` bilan obyektning barcha kalitlarini massivda qaytarsin.",
      startingCode: "function keys(obj) {\n  // for...in yozing\n}\n",
      hint: "const r = []; for (const kalit in obj) r.push(kalit); return r;",
      test: "if (!code.includes(' in ')) return 'for...in ishlatilmadi';\nconst fn = new Function(code + '; return keys;')();\nif (JSON.stringify(fn({a: 1, b: 2})) === JSON.stringify(['a','b'])) return null;\nreturn 'Kalitlar massivi xato';"
    },
    {
      id: 4,
      title: "for...in bilan qiymatlar",
      instruction: "`values(obj)` funksiyasi `for...in` bilan qiymatlarni massivda qaytarsin (obj[kalit] bilan).",
      startingCode: "function values(obj) {\n  // for...in + obj[kalit]\n}\n",
      hint: "const r = []; for (const kalit in obj) r.push(obj[kalit]); return r;",
      test: "const fn = new Function(code + '; return values;')();\nif (JSON.stringify(fn({a: 1, b: 2})) === JSON.stringify([1,2])) return null;\nreturn 'obj[kalit] bilan qiymat oling';"
    },
    {
      id: 5,
      title: "for...of + break",
      instruction: "`findFirst(massiv, maqsad)` funksiyasi `for...of` bilan maqsadni topishi bilan `true` qaytarsin, topilmasa `false`.",
      startingCode: "function findFirst(massiv, maqsad) {\n  // for...of + break/return\n}\n",
      hint: "for (const x of massiv) if (x === maqsad) return true; return false;",
      test: "if (!code.includes(' of ')) return 'for...of ishlatilmadi';\nconst fn = new Function(code + '; return findFirst;')();\nif (fn([5,8,3], 8) === true && fn([1], 9) === false) return null;\nreturn 'Topish xato';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "`for...of` nimani beradi?",
      options: [
        "Kalitlarni",
        "Qiymatlarni (massiv elementlarini)",
        "Indexlarni",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "for...of — massiv elementlarini to'g'ridan-to'g'ri beradi."
    },
    {
      id: 2,
      question: "`for...in` nimani beradi?",
      options: [
        "Qiymatlarni",
        "Kalitlarni (xususiyat nomlarini)",
        "Massiv elementlarini",
        "Sonlarni"
      ],
      correctAnswer: 1,
      explanation: "for...in — obyekt kalitlarini beradi."
    },
    {
      id: 3,
      question: "Obyektni `for...of` bilan aylash mumkinmi?",
      options: [
        "Ha, mumkin",
        "Yo'q — obyekt iterable emas, xato beradi",
        "Faqat kichik obyektlarda",
        "Faqat strict rejimda"
      ],
      correctAnswer: 1,
      explanation: "Obyekt uchun for...in yoki Object.keys() ishlatiladi."
    },
    {
      id: 4,
      question: "Massivni qaysi sikl bilan aylash TAVSIYA ETILMAYDI?",
      options: [
        "for...of",
        "oddiy for",
        "for...in",
        "while"
      ],
      correctAnswer: 2,
      explanation: "for...in indexlarni matn qilib, prototip xususiyatlarini ham olib keladi."
    },
    {
      id: 5,
      question: "`for (const kalit in obj)` dan keyin qiymatni qanday olamiz?",
      options: [
        "obj.kalit",
        "obj[kalit]",
        "kalit.value",
        "values(kalit)"
      ],
      correctAnswer: 1,
      explanation: "Kvadrat qavs bilan dinamik kalit orqali."
    }
  ]
};
