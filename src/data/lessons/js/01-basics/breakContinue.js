export const breakContinue = {
  id: "breakContinue",
  title: "Sikllarni Boshqarish: break, continue",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### break va continue — sikl boshqaruvchisi
Sikl ichida ikki favqulodda tugma bor:

- **break** — siklni BUTUNLAY to'xtatish (tashqariga chiqish)
- **continue** — shu aylanishni TASHLAB, keyingisiga o'tish

\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 4) continue;  // 4 ni tashlab o'tish
  if (i === 7) break;     // 7 da to'liq to'xtash
  console.log(i);  // 1, 2, 3, 5, 6
}
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kitob o'qiyapsiz** (100 bet):
- **continue** — zerikarli betni varaqlab o'tish (kitobni davom ettirasiz)
- **break** — kitobni yopib qo'yish (o'qishni tugatasiz)

---

## 2. 💻 Har Biri Amalda

### break — to'liq chiqish
\`\`\`javascript
let pin = 0;
for (let urinish = 1; urinish <= 5; urinish++) {
  if (urinish === 3) {
    console.log("To'g'ri topildi!");
    break;  // sikl tugadi
  }
}
\`\`\`

### continue — bittasini o'tkazish
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i % 2 !== 0) continue;  // toqlarni tashlash
  console.log(i);  // 2, 4
}
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Sikl aylanishi"] --> B{"break?"}
    B -->|"Ha"| C["Sikl tugadi"]
    B -->|"Yo'q"| D{"continue?"}
    D -->|"Ha"| E["Keyingi aylanish"]
    D -->|"Yo'q"| F["Davom et"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

- **break** — eng yaqin sikldan chiqadi (ichki siklda bo'lsa — faqat undan!)
- **continue** — \`for\` da qadamga (\`i++\`), \`while\` da shartga sakraydi

> ⚠️ \`while\` + \`continue\` xavfli: qadam \`continue\` dan KEYIN bo'lsa — cheksiz sikl! Qadamni \`continue\` dan OLDIN yozing.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`while\` da qadamni continue'dan keyin qo'yish | Oldin qo'yish | Cheksiz sikl! |
| Ichki siklda break — tashqi ham to'xtaydi deb o'ylash | Faqat eng yaqin to'xtaydi | Yorliq (label) kerak bo'ladi (kamdan) |
| Har joyda break (goto kabi) | Kamdan-kam, o'rinli | Ko'p break — chalkash kod belgisi |

---

## 5. 🔑 Asosiy Atamalar

- **break** — sikldan to'liq chiqish
- **continue** — joriy aylanishni tashlash
- **Fall-through** — switch'da break siz pastga tushish (o'xshash hodisa)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Qidiruv:** topildi → break (ortiqcha aylanma!)
- **Filtrlash:** keraksiz element → continue (tashlab o'tish)
- **Urinish chegarasi:** 3 xato → break + bloklash

---

## 7. 🎙 Intervyu Savollari

**1. break va continue farqi?**
**Javob:** break — siklni tugatadi, continue — bitta aylanishni tashlab davom ettiradi.

**2. while + continue da nimaga ehtiyot bo'lish kerak?**
**Javob:** Qadam continue'dan oldin bo'lishi kerak, aks holda cheksiz sikl.

**3. Ichki sikldagi break tashqi siklni to'xtatadimi?**
**Javob:** Yo'q — faqat eng yaqin siklni.

---

## 8. ✅ Xulosa

- **break** = kitobni yopish, **continue** = betni varaqlash
- **while + continue** da qadamni oldin yozing!
- **Keyingi qadam:** 1.19-darsda qayta ishlatiladigan kod — funksiyalar
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi topilgan",
      instruction: "`findFirst(massiv, maqsad)` funksiyasi massivda maqsadni topishi bilan indexni qaytarsin (break bilan). Masalan: findFirst([5, 8, 3], 8) => 1.",
      startingCode: "function findFirst(massiv, maqsad) {\n  // for + break yozing\n}\n",
      hint: "for (let i = 0; i < massiv.length; i++) if (massiv[i] === maqsad) return i;",
      test: "const fn = new Function(code + '; return findFirst;')();\nif (fn([5,8,3], 8) === 1 && fn([1,2], 9) === undefined) return null;\nreturn 'Topilishi bilan qaytaring';"
    },
    {
      id: 2,
      title: "Toqlarni tashlash",
      instruction: "`onlyEvens(n)` funksiyasi 1 dan n gacha faqat JUFTlarni qaytarsin (continue bilan).",
      startingCode: "function onlyEvens(n) {\n  // for + continue yozing\n}\n",
      hint: "for (...) { if (i % 2 !== 0) continue; r.push(i); }",
      test: "const fn = new Function(code + '; return onlyEvens;')();\nif (JSON.stringify(fn(6)) === JSON.stringify([2,4,6])) return null;\nreturn 'continue bilan toqlarni tashlang';"
    },
    {
      id: 3,
      title: "Manfiyni o'tkazish",
      instruction: "`sumPositive(massiv)` funksiyasi faqat MUSBAT sonlar yig'indisini qaytarsin (continue bilan).",
      startingCode: "function sumPositive(massiv) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (x <= 0) continue; jami += x;",
      test: "const fn = new Function(code + '; return sumPositive;')();\nif (fn([1,-5,3,-2,4]) === 8) return null;\nreturn '8 chiqishi kerak (1+3+4)';"
    },
    {
      id: 4,
      title: "Urinish chegarasi",
      instruction: "`tryLogin(urinishlar)` — massivdagi parollarni tekshiradi, to'g'ri (`\"1234\"`) topilishi bilan indexni qaytaradi, topilmasa -1.",
      startingCode: "function tryLogin(urinishlar) {\n  // for + break yozing\n}\n",
      hint: "for (...) if (urinishlar[i] === \"1234\") return i; return -1;",
      test: "const fn = new Function(code + '; return tryLogin;')();\nif (fn([\"0000\",\"1234\",\"9999\"]) === 1 && fn([\"0000\"]) === -1) return null;\nreturn 'Topilmasa -1';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "break va continue farqi?",
      options: [
        "Bir xil",
        "break — siklni tugatadi, continue — bitta aylanishni tashlaydi",
        "continue — siklni tugatadi, break — tashlaydi",
        "Ikkisi ham siklni buzadi"
      ],
      correctAnswer: 1,
      explanation: "break = kitobni yopish, continue = betni varaqlash."
    },
    {
      id: 2,
      question: "`for (i=1..10), i===4 da continue, i===7 da break` — qaysilar chop etiladi?",
      options: [
        "1-10 hammasi",
        "1, 2, 3, 5, 6",
        "1, 2, 3, 4, 5, 6",
        "7, 8, 9, 10"
      ],
      correctAnswer: 1,
      explanation: "4 tashlanadi, 7 da to'xtaydi."
    },
    {
      id: 3,
      question: "while + continue da asosiy xavf?",
      options: [
        "Hech qanday",
        "Qadam continue'dan keyin bo'lsa — cheksiz sikl",
        "Juda tez ishlaydi",
        "Xotira to'ladi"
      ],
      correctAnswer: 1,
      explanation: "continue qadamni o'tkazib yuboradi!"
    },
    {
      id: 4,
      question: "Ichki sikldagi break nima qiladi?",
      options: [
        "Hamma siklni to'xtatadi",
        "Faqat eng yaqin (ichki) siklni",
        "Dasturni o'chiradi",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "break faqat o'z sikliga ta'sir qiladi."
    }
  ]

};
