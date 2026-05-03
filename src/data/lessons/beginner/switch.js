export const switchLesson = {
  id: "switch",
  title: "Switch Operatori",
  theory: `## 1. SWITCH ASOSLARI
\`switch\` — bir o‘zgaruvchi yoki ifodaning qiymatiga qarab, bir nechta **case** (holat) dan birini bajarish imkonini beradi. Bu operator ko'pincha juda ko'p \`if...else if\` yozishdan qochish uchun ishlatiladi.

### Sintaksis
\`\`\`javascript
switch (ifoda) {
  case qiymat1:
    // agar ifoda === qiymat1 bo'lsa
    break;
  case qiymat2:
    // agar ifoda === qiymat2 bo'lsa
    break;
  default:
    // hech bir case mos kelmasa
}
\`\`\`

---

## 2. BREAK VA FALL-THROUGH
\`break\` — switch blokidan chiqishni ta’minlaydi. Agar \`break\` yozilmasa, bajarilish keyingi case’larga ham o‘tib ketadi (**fall-through**).

\`\`\`javascript
let a = 1;
switch (a) {
  case 1:
    console.log("Bir");
    // break yo'q!
  case 2:
    console.log("Ikki");
    break;
}
// Natija: "Bir", "Ikki"
\`\`\`

\`\`\`mermaid
graph TD
    A[Switch boshlanishi] --> B{Qiymat bormi?}
    B -- Case 1 --> C[Blok 1 bajariladi]
    B -- Case 2 --> D[Blok 2 bajariladi]
    B -- Default --> E[Default blok]
    C --> F{break bormi?}
    F -- Ha --> G[Blokdan chiqish]
    F -- Yo'q --> D
    D --> G
    E --> G
\`\`\`

---

## 3. BIR NECHTA CASE — BIR XIL KOD
Agar bir nechta holat uchun bitta natija kerak bo'lsa, ularni ketma-ket yozish mumkin:

\`\`\`javascript
let oy = 4;
switch (oy) {
  case 3:
  case 4:
  case 5:
    console.log("Bahor");
    break;
}
\`\`\`

---

## 4. SWITCH(TRUE) — MANTIQIY SHARTLAR
\`switch\` asosan aniq tenglik (\`===\`) uchun ishlasa-da, \`switch(true)\` usuli orqali mantiqiy shartlarni (>, <) ham tekshirish mumkin:

\`\`\`javascript
let score = 85;
switch (true) {
  case score >= 90:
    console.log("A");
    break;
  case score >= 80:
    console.log("B");
    break;
}
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Junior & Middle)

1. **switch qanday solishtirish operatoridan foydalanadi?**
   *Javob:* Strict equality (\`===\`).

2. **Fall-through qachon foydali bo'lishi mumkin?**
   *Javob:* Bir nechta case'lar bir xil kodni bajarishi kerak bo'lganda (masalan, fasllarni aniqlashda).

3. **switch ichida return ishlatsa bo'ladimi?**
   *Javob:* Ha, agar switch funksiya ichida bo'lsa, \`return\` ham switch'ni, ham funksiyani to'xtatadi.`,
  exercises: [
    {
      id: 1,
      title: "Hafta kunlari",
      instruction: "'day' o'zgaruvchisi 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' chiqaring. Qolgan holatda 'Boshqa kun' chiqsin.",
      startingCode: "const day = 1;\nswitch (day) {\n  // Case larni yozing\n}",
      hint: "case 1: console.log('Dushanba'); break;",
      test: "if (logs.includes('Dushanba')) return null; return 'Dushanba chiqishi kerak';"
    },
    {
      id: 2,
      title: "Baholash tizimi",
      instruction: "Switch yordamida 'ball' 5 bo'lsa 'Alo', 4 bo'lsa 'Yaxshi' chiqaring.",
      startingCode: "const ball = 4;\n// Bu yerga yozing\n",
      hint: "switch(ball) { case 5: ... }",
      test: "if (logs.includes('Yaxshi')) return null; return 'Yaxshi chiqishi kerak';"
    }
  ]
};
