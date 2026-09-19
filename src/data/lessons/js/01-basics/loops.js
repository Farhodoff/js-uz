export const loops = {
  id: "loops",
  title: "Sikllar: for, while, do-while",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Sikl nima?
**Sikl** — bir ishni ko'p marta takrorlash. 1 dan 100 gacha sonlarni chop etish uchun 100 qator yozmaysiz — 3 qatorli sikl yozasiz!

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);  // 1, 2, 3, 4, 5
}
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **nonvoyxonada non yopyapsiz**:
- **for** — "100 ta non yopaman" (soni aniq — sanab borasiz)
- **while** — "un tugaguncha yopaman" (shart bajarilguncha)
- **do...while** — "avval bitta yopib ko'raman, keyin un bor-yo'qligini tekshiraman" (kamida bir marta!)

---

## 2. 💻 Uchta Sikl

### for — soni aniq bo'lganda
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log("Salom " + i);
}
// Salom 0, Salom 1, Salom 2
\`\`\`

**Tuzilishi:** \`for (boshlanish; shart; qadam)\` — shart true ekan, takrorlanadi.

### while — shartgacha
\`\`\`javascript
let suv = 3;
while (suv > 0) {
  console.log("Ichdim, qoldi: " + suv);
  suv--;  // MUHIM! Aks holda cheksiz sikl!
}
\`\`\`

### do...while — kamida bir marta
\`\`\`javascript
let pin = 1111;
do {
  console.log("Urinish...");
  pin = 1234;  // to'g'ri pin topildi deylik
} while (pin !== 1234);
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Soni aniqmi?"] -->|"Ha"| B["for"]
    A -->|"Yo'q"| C{"Kamida 1 marta shartmi?"}
    C -->|"Ha"| D["do...while"]
    C -->|"Yo'q"| E["while"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`for\` ning uch qismi:
1. **Boshlanish:** \`let i = 0\` — bir marta, eng avval
2. **Shart:** \`i < 3\` — har takrorlashdan oldin tekshiriladi
3. **Qadam:** \`i++\` — har takrorlashdan keyin bajariladi

Shart \`false\` bo'lishi bilan sikl to'xtaydi.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`while\` da qadamni unutish | \`suv--\` kabi o'zgarish | Cheksiz sikl — brauzer qotadi! |
| \`i <= massiv.length\` (bir ortiq) | \`i < massiv.length\` | Oxirgi index \`length - 1\`! |
| \`for (let i = 0; i < 5; i--)\` | \`i++\` | Teskari qadam — cheksiz sikl |

---

## 5. 🔑 Asosiy Atamalar

- **Sikl (loop)** — takrorlash konstruksiyasi
- **Iteratsiya** — bitta takrorlanish
- **Cheksiz sikl** — hech to'xtamaydigan sikl (xato!)
- **Hisoblagich** — takrorlarni sanovchi o'zgaruvchi (\`i\`)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Ro'yxat:** talabalar massivini birma-bir chiqarish
- **Urinish:** parol xato bo'lsa qayta so'rash (while)
- **O'yin:** 10 raund o'ynash (for)

---

## 7. 🎙 Intervyu Savollari

**1. \`for\` va \`while\` farqi?**
**Javob:** for — soni aniq bo'lganda, while — shart bajarilguncha.

**2. Cheksiz sikl qanday yuzaga keladi?**
**Javob:** Shart hech qachon false bo'lmasa (qadam unutilsa).

**3. \`do...while\` ning o'ziga xosligi?**
**Javob:** Shart oxirida tekshiriladi — kamida bir marta ishlaydi.

---

## 8. ✅ Xulosa

- **for** — soni aniq, **while** — shartgacha, **do...while** — kamida bir marta
- **Qadamni unutmang** — cheksiz sikl xavfi!
- **Keyingi qadam:** 1.18-darsda siklni boshqarish — break/continue
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 5 gacha",
      instruction: "`printNumbers()` funksiyasi 1 dan 5 gacha sonlarni massivda qaytarsin: [1, 2, 3, 4, 5] (for bilan).",
      startingCode: "function printNumbers() {\n  // for yozing\n}\n",
      hint: "const natija = []; for (let i = 1; i <= 5; i++) natija.push(i); return natija;",
      test: "const fn = new Function(code + '; return printNumbers;')();\nconst r = fn();\nif (JSON.stringify(r) === JSON.stringify([1,2,3,4,5])) return null;\nreturn '[1,2,3,4,5] kutilgandi';"
    },
    {
      id: 2,
      title: "Yig'indi",
      instruction: "`sumTo(n)` funksiyasi 1 dan n gacha sonlar yig'indisini qaytarsin. Masalan: sumTo(5) => 15.",
      startingCode: "function sumTo(n) {\n  // for yozing\n}\n",
      hint: "let jami = 0; for (let i = 1; i <= n; i++) jami += i; return jami;",
      test: "const fn = new Function(code + '; return sumTo;')();\nif (fn(5) === 15 && fn(10) === 55 && fn(1) === 1) return null;\nreturn 'Yig\\'indi xato';"
    },
    {
      id: 3,
      title: "Ortga sanash",
      instruction: "`countdown(n)` funksiyasi n dan 1 gacha massiv qaytarsin. Masalan: countdown(3) => [3, 2, 1].",
      startingCode: "function countdown(n) {\n  // for yozing (teskari!)\n}\n",
      hint: "for (let i = n; i >= 1; i--) ...",
      test: "const fn = new Function(code + '; return countdown;')();\nif (JSON.stringify(fn(3)) === JSON.stringify([3,2,1])) return null;\nreturn '[3,2,1] kutilgandi';"
    },
    {
      id: 4,
      title: "While bilan yig'ish",
      instruction: "`sumWhile(n)` funksiyasi while bilan 1 dan n gacha yig'indini qaytarsin.",
      startingCode: "function sumWhile(n) {\n  // while yozing\n}\n",
      hint: "let jami = 0; let i = 1; while (i <= n) { jami += i; i++; } return jami;",
      test: "const fn = new Function(code + '; return sumWhile;')();\nif (fn(5) === 15 && fn(3) === 6) return null;\nreturn 'while + qadam (i++) kerak';"
    },
    {
      id: 5,
      title: "Juft sonlar",
      instruction: "`evens(n)` funksiyasi 1 dan n gacha JUFT sonlarni massivda qaytarsin. Masalan: evens(6) => [2, 4, 6].",
      startingCode: "function evens(n) {\n  // for + % yozing\n}\n",
      hint: "for (let i = 1; i <= n; i++) if (i % 2 === 0) ...",
      test: "const fn = new Function(code + '; return evens;')();\nif (JSON.stringify(fn(6)) === JSON.stringify([2,4,6])) return null;\nreturn '[2,4,6] kutilgandi';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "Qachon `for`, qachon `while`?",
      options: [
        "Farqi yo'q",
        "Soni aniq — for; shartgacha — while",
        "Har doim while",
        "Har doim for"
      ],
      correctAnswer: 1,
      explanation: "Aniq son → for, noma'lum davom → while."
    },
    {
      id: 2,
      question: "`for (let i = 0; i < 3; i++)` necha marta ishlaydi?",
      options: [
        "2 marta",
        "3 marta (0, 1, 2)",
        "4 marta",
        "Cheksiz"
      ],
      correctAnswer: 1,
      explanation: "i = 0, 1, 2 — uchta iteratsiya."
    },
    {
      id: 3,
      question: "Cheksiz sikl sababi?",
      options: [
        "for ishlatish",
        "Shart hech false bo'lmasligi (qadam unutilishi)",
        "console.log yozish",
        "let ishlatish"
      ],
      correctAnswer: 1,
      explanation: "while da i++ unutilsangiz — abadiy aylanadi."
    },
    {
      id: 4,
      question: "`do...while` o'ziga xosligi?",
      options: [
        "Hech ishlamaydi",
        "Kamida bir marta ishlaydi (shart oxirida)",
        "Faqat matnda ishlaydi",
        "Tezroq ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Shart keyin tekshiriladi — birinchi urinish kafolatli."
    },
    {
      id: 5,
      question: "Massivning oxirgi indexi?",
      options: [
        "length",
        "length - 1",
        "length + 1",
        "0"
      ],
      correctAnswer: 1,
      explanation: "5 elementli massiv: indexlar 0..4."
    }
  ]

};
