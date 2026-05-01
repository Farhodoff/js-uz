export const arrays = {
  id: "b5",
  title: "Massivlar (Arrays) - To'liq qo'llanma",
  theory: `## 1. MASSIVLAR NIMA?
Massiv — bu ma'lumotlarni tartiblangan ro'yxat ko'rinishida saqlash usulidir. Bitta o'zgaruvchida yuzlab qiymatlarni saqlashingiz mumkin.

\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
console.log(mevalar.length); // 3
\`\`\`

---

## 2. ASOSIY METODLAR (Mutatsiya qiluvchi)
Bu metodlar massivning o'zini o'zgartiradi:
- **push / pop:** Oxiridan qo'shish / olish.
- **unshift / shift:** Boshidan qo'shish / olish.
- **splice:** Elementlarni o'chirish yoki yangisini qo'shish.

\`\`\`mermaid
graph LR
    A[Massiv] -- push/pop --> B[Oxiri]
    A -- unshift/shift --> C[Boshi]
    A -- splice --> D[Istalgan joyi]
    style A fill:#f9f,stroke:#333
\`\`\`

---

## 3. MASSIVNI KESISH VA BIRLASHTIRISH
- **slice:** Massivdan nusxa ko'chirib olish (aslini o'zgartirmaydi).
- **join:** Massiv elementlarini bitta matnga (string) aylantirish.
- **concat:** Ikki massivni birlashtirish.

\`\`\`javascript
const qisqa = mevalar.slice(0, 2); // ["Olma", "Banan"]
const matn = mevalar.join(", "); // "Olma, Banan, Gilos"
\`\`\`

---

## 4. AYLANIB CHIQISH (Iteration)
Massiv elementlari bilan birma-bir ishlash uchun quyidagi usullar bor:
- **for...of:** Qiymatlarni olish uchun eng qulay usul.
- **forEach:** Har bir element uchun funksiya ishga tushirish.

\`\`\`javascript
for (let meva of mevalar) {
  console.log(meva);
}
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Junior & Middle)

1. **Massiv va Obyekt farqi nima?**
   *Javob:* Massiv — tartiblangan (indexga ega), Obyekt — tartiblanmagan (kalit-qiymat).

2. **slice() va splice() farqi nima? ⭐**
   *Javob:* \`slice\` asl massivni o'zgartirmaydi (nusxa oladi), \`splice\` esa asl massivdan elementlarni o'chiradi yoki qo'shadi.

3. **Massivdagi elementni qanday o'chirish mumkin?**
   *Javob:* \`pop\`, \`shift\` yoki \`splice\` yordamida.`,
  exercises: [
    {
      id: 1,
      title: "Element qo'shish",
      instruction: "'colors' massiviga 'blue' ni oxiridan, 'white' ni boshidan qo'shing.",
      startingCode: "const colors = ['red'];\n// Bu yerga yozing\n\nconsole.log(colors);",
      hint: "colors.push('blue'); colors.unshift('white');",
      test: "if (logs[0].includes('white') && logs[0].includes('blue')) return null; return 'white va blue qo\\'shilmadi';"
    },
    {
      id: 2,
      title: "Massivdan nusxa olish",
      instruction: "slice() yordamida massivning birinchi 2 ta elementini 'firstTwo' o'zgaruvchisiga oling.",
      startingCode: "const arr = [1, 2, 3, 4];\nconst firstTwo = // bu yerga yozing\n\nconsole.log(firstTwo);",
      hint: "arr.slice(0, 2);",
      test: "if (logs[0].includes('1,2') || logs[0].includes('1, 2')) return null; return 'Faqat birinchi 2 ta element bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Matnga aylantirish",
      instruction: "Massiv elementlarini '-' belgisi bilan birlashtirib konsolga chiqaring.",
      startingCode: "const words = ['A', 'B', 'C'];\n// join ishlating\n",
      hint: "console.log(words.join('-'));",
      test: "if (logs.includes('A-B-C')) return null; return 'A-B-C chiqishi kerak';"
    }
  ]
};