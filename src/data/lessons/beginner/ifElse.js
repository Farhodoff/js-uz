export const ifElseLesson = {
  id: "b21",
  title: "Shartli Operatorlar: if...else",
  theory: `## 1. KIRISH
Dasturlashda qaror qabul qilish — eng muhim jarayon. Masalan, **Payme** ilovasida pul o'tkazmoqchi bo'lsangiz: "Agar (if) balansda pul yetarli bo'lsa — o'tkaz, aks holda (else) — xatolik ko'rsat". 

Dars oxirida siz dasturingizni "fikrlashga" va sharoitga qarab ish tutishga o'rgatasiz.

## 2. TUSHUNCHA

### Sodda ta'rif
Shartli operatorlar — dasturda ma’lum bir shartga qarab turli kod bloklarini bajarish imkonini beradi.

### Real hayot o'xshashlik
Buni **svetoforga** o'xshatish mumkin:
- Agar **Yashil** bo'lsa -> Yur!
- Agar **Sariq** bo'lsa -> Tayyorlan!
- Aks holda (**Qizil**) -> To'xta!

---

## 3. ASOSIY OPERATORLAR

### if...else (Agar... aks holda)
\`\`\`javascript
let harorat = 25;
if (harorat > 30) {
  console.log("Issiq");
} else {
  console.log("Zo'r havo");
}
\`\`\`

### Ternary operator (? :) ⭐
Qisqa \`if...else\` yozish uchun. 
Sintaksis: \`shart ? rost_bo'lsa : yolg'on_bo'lsa\`
\`\`\`javascript
let yosh = 20;
let ruxsat = yosh >= 18 ? "Kir" : "To'xta";
console.log(ruxsat); // "Kir"
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### if...else Oqimi
\`\`\`mermaid
graph TD
    A[Boshlash] --> B{Shart: yosh >= 18?}
    B -- Ha --> C["Kirish mumkin ✅"]
    B -- Yo'q --> D["Taqiqlangan ❌"]
    C --> E[Tugash]
    D --> E
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Junior & Middle)

### Q1. Truthy va Falsy qiymatlar nima? ⭐
**Javob:**
Boolean kontekstida (if ichida) \`true\` ga aylanadigan qiymatlar — **truthy**, \`false\` ga aylanadiganlari — **falsy** deyiladi.
**Falsy (6 ta):** \`false\`, \`0\`, \`""\` (bo'sh matn), \`null\`, \`undefined\`, \`NaN\`. Qolgan hammasi (hatto \`[]\` va \`{}\`) — truthy!

### Q2. if(value) va if(value === true) farqi nima?
**Javob:**
\`if(value)\` har qanday truthy qiymatda (masalan: 1, "salom") ishlaydi. \`if(value === true)\` esa faqat qiymat aniq boolean turidagi \`true\` bo'lsagina ishlaydi.

---

## 6. MINI LOYIHA: "Ballarni Baholash"
**Vazifa:** Talaba to'plagan ballga qarab unga baxo bering.

\`\`\`javascript
function baholash(ball) {
  if (ball >= 90) return "A - Alo";
  if (ball >= 80) return "B - Yaxshi";
  if (ball >= 70) return "C - Qoniqarli";
  return "F - Yiqildi";
}

console.log(baholash(85)); // → "B - Yaxshi"
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "if...else mashqi",
      instruction: "Yosh 18 dan katta bo'lsa 'Xush kelibsiz', aks holda 'Kichiksiz' deb consolega chiqaring.",
      startingCode: "const age = 20;\n// Bu yerga yozing\n",
      hint: "if (age >= 18) { console.log('Xush kelibsiz'); }",
      test: "if (logs.includes('Xush kelibsiz')) return null; return 'Xush kelibsiz chiqishi kerak';"
    },
    {
      id: 2,
      title: "Musbat yoki Manfiy",
      instruction: "Son musbat bo'lsa 'Positive', manfiy bo'lsa 'Negative', nol bo'lsa 'Zero' deb chiqaring.",
      startingCode: "const n = -5;\n// Bu yerda tekshiring\n",
      hint: "else if ishlatishingiz kerak.",
      test: "if (logs.includes('Negative')) return null; return 'Negative chiqishi kerak';"
    },
    {
      id: 3,
      title: "Ternary operator",
      instruction: "Ternary operator yordamida 'score' 50 dan katta bo'lsa 'Pass', aks holda 'Fail' degan o'zgaruvchi yarating va chiqaring.",
      startingCode: "const score = 60;\nconst result = // bu yerga yozing\nconsole.log(result);",
      hint: "score > 50 ? 'Pass' : 'Fail'",
      test: "if (logs.includes('Pass')) return null; return 'Pass chiqishi kerak';"
    }
  ]
};
