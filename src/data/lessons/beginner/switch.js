export const switchLesson = {
  id: "b22",
  title: "Switch Operatori",
  theory: `## 1. SWITCH NIMA?
\`switch\` — bir o'zgaruvchi yoki ifodaning qiymatiga qarab, bir nechta **case** (holat) dan birini bajarish imkonini beradi. U ko'pincha juda ko'p \`if...else if\` yozishdan qochish uchun ishlatiladi.

### Sintaksis
\`\`\`javascript
switch (ifoda) {
  case qiymat1:
    // kod
    break;
  case qiymat2:
    // kod
    break;
  default:
    // hech biri mos kelmasa
}
\`\`\`

---

## 2. ASOSIY QOIDALAR

- **Strict Equality (===):** Switch qiymatlarni taqqoslaganda ham turi, ham qiymati bir xil bo'lishini talab qiladi.
- **break:** Bu juda muhim! Agar \`break\` qo'yilmasa, JS keyingi case'larga ham o'tib ketadi (**fall-through**).
- **default:** Agar hech bir case mos kelmasa, shu qism ishlaydi. Bu \`else\` ga o'xshash.

\`\`\`mermaid
graph TD
    A[Switch boshlanishi] --> B{Qiymat bormi?}
    B -- Case 1 --> C[Blok 1 bajariladi]
    B -- Case 2 --> D[Blok 2 bajariladi]
    B -- Default --> E[Default blok]
    C --> F[break: Blokdan chiqish]
    D --> F
    E --> F
\`\`\`

---

## 3. FALL-THROUGH (O'tib ketish)
Ba'zan ataylab \`break\` yozilmaydi, agar bir nechta holat uchun bir xil kod kerak bo'lsa:

\`\`\`javascript
let oy = 1;
switch (oy) {
  case 12:
  case 1:
  case 2:
    console.log("Qish");
    break;
}
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **switch da qiymatlar qanday tekshiriladi?**
   *Javob:* Strict equality (\`===\`) orqali. Ya'ni \`"1"\` va \`1\` bir-biriga teng deb olinmaydi.

2. **break yozish shartmi?**
   *Javob:* Texnik jihatdan shart emas, lekin yozilmasa, dastur keyingi case'larni ham bajarib yuboradi, bu esa xatoga olib kelishi mumkin.

3. **default har doim oxirida bo'lishi kerakmi?**
   *Javob:* Odatda oxirida yoziladi, lekin istalgan joyda bo'lishi mumkin. Baribir hech narsa mos kelmasa ishlaydi.`,
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
