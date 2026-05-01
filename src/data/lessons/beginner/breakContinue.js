export const breakContinue = {
  id: "b15",
  title: "Break va Continue",
  theory: `## 1. KIRISH
Sikllar (loops) bilan ishlaganda, ba'zida bizga siklni muddatidan oldin to'xtatish yoki ma'lum bir qadamni tashlab ketish kerak bo'ladi. Buning uchun JavaScriptda \`break\` va \`continue\` kalit so'zlari ishlatiladi.

---

## 2. BREAK (To'xtatish)
\`break\` — siklni butunlay to'xtatadi va undan chiqib ketadi. Xuddi favqulodda tormoz kabi!

### Misol:
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 5 ga yetganda to'xtaydi
  }
  console.log(i);
}
// Natija: 1, 2, 3, 4
\`\`\`

---

## 3. CONTINUE (Tashlab ketish)
\`continue\` — joriy qadamni (iteratsiyani) to'xtatadi va darhol keyingi qadamga o'tib ketadi. Ya'ni, o'sha qadamdagi qolgan kodlar bajarilmaydi.

### Misol:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // 3 ni tashlab o'tib ketadi
  }
  console.log(i);
}
// Natija: 1, 2, 4, 5
\`\`\`

---

## 4. VIZUAL TAQQOSLASH

\`\`\`mermaid
graph LR
    A[Sikl] --> B{Shart?}
    B -- break --> C[Sikldan chiqish 🛑]
    B -- continue --> D[Keyingi qadamga o'tish ⏭️]
    style C fill:#f99,stroke:#333
    style D fill:#9f9,stroke:#333
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Junior)

1. **break va continue farqi nima?**
   *Javob:* \`break\` siklni butunlay to'xtatadi, \`continue\` esa faqat joriy qadamni o'tkazib yuboradi.

2. **switch ichida continue ishlatsa bo'ladimi?**
   *Javob:* Yo'q, \`continue\` faqat sikllar (for, while) ichida ishlaydi.

3. **while siklida continue ishlatganda nima xavf bor?**
   *Javob:* Agar hisoblagich (i++) \`continue\`dan keyin yozilgan bo'lsa, sikl cheksiz bo'lib qolishi mumkin.

---

## 6. MINI LOYIHA: "Qidiruv tizimi"
**Vazifa:** Massiv ichidan kerakli sonni toping va topilgan zahoti qidiruvni to'xtating.

\`\`\`javascript
const sonlar = [10, 25, 38, 45, 50];
const target = 38;

for (let i = 0; i < sonlar.length; i++) {
  console.log("Tekshirilmoqda:", sonlar[i]);
  if (sonlar[i] === target) {
    console.log("Topildi!");
    break; // Topilgandan keyin qolganlarini tekshirish shart emas
  }
}
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Break mashqi",
      instruction: "0 dan 10 gacha sonlarni chiqaring, lekin son 7 ga teng bo'lganda siklni to'xtating.",
      startingCode: "for (let i = 0; i <= 10; i++) {\n  // Bu yerda tekshiring\n  console.log(i);\n}",
      hint: "if (i === 7) break;",
      test: "if (logs.includes('6') && !logs.includes('7')) return null; return '7 da to\\'xtashi kerak';"
    },
    {
      id: 2,
      title: "Continue mashqi",
      instruction: "1 dan 10 gacha bo'lgan sonlarni chiqaring, lekin 5 sonini tashlab o'tib keting.",
      startingCode: "for (let i = 1; i <= 10; i++) {\n  // Bu yerda tekshiring\n  console.log(i);\n}",
      hint: "if (i === 5) continue;",
      test: "if (!logs.includes('5') && logs.includes('4') && logs.includes('6')) return null; return '5 tashlab ketilishi kerak';"
    }
  ]
};
