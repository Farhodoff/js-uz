export const switchLesson = {
  id: "switchLesson",
  title: "Switch-Case Operatorlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### switch — ko'p yo'lli tanlov
\`if/else if\` zanjiri uzun bo'lsa — \`switch\` ixchamroq:

\`\`\`javascript
let kun = 3;

switch (kun) {
  case 1:
    console.log("Dushanba");
    break;
  case 3:
    console.log("Chorshanba");
    break;
  default:
    console.log("Boshqa kun");
}
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **lift oldidasiz**:
- Tugmani bossangiz (\`kun = 3\`) — lift 3-qavatga boradi
- Har bir qavat — \`case\` (to'xtash joyi)
- \`break\` — "shu yerda to'xta, pastga tushma!"
- \`default\` — "bunday qavat yo'q" (xato tugma)

\`break\` siz — liftsiz pastga tushib ketasiz (keyingi qavatlarga ham to'xtaysiz)!

---

## 2. 💻 Tuzilishi

\`\`\`javascript
switch (qiymat) {
  case VARIANT1:
    // qiymat === VARIANT1 bo'lsa ishlaydi
    break;
  case VARIANT2:
    // qiymat === VARIANT2 bo'lsa ishlaydi
    break;
  default:
    // hech biri mos kelmasa ishlaydi
}
\`\`\`

### Muhim: \`===\` bilan solishtiradi!
\`\`\`javascript
let x = "5";
switch (x) {
  case 5:
    console.log("son");  // ISHLAMAYDI! "5" !== 5
    break;
  case "5":
    console.log("matn");  // ISHLAYDI!
    break;
}
\`\`\`

\`\`\`mermaid
flowchart TD
    A["switch(x)"] --> B{"x === case1?"}
    B -->|"Ha"| C["case1 + break"]
    B -->|"Yo'q"| D{"x === case2?"}
    D -->|"Ha"| E["case2 + break"]
    D -->|"Yo'q"| F["default"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Mos \`case\` topilishi bilan kod pastga qarab ishlaydi — \`break\` gacha! Shuning uchun \`break\` ni unutish — eng mashhur xato:

\`\`\`javascript
let kun = 1;
switch (kun) {
  case 1:
    console.log("Dushanba");
  case 2:
    console.log("Seshanba");  // ham chiqadi! (break yo'q)
}
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`break\` ni unutish | Har case'da \`break\` | Pastdagi caselar ham ishlab ketadi ("tushib ketish") |
| \`case 5\` ga \`"5"\` kelishi | Turlarni moslash | switch \`===\` bilan solishtiradi! |
| \`default\` ni unutish | Oxirida \`default\` | Kutilmagan qiymatda sukunat — yomon |

---

## 5. 🔑 Asosiy Atamalar

- **case** — tekshiriladigan variant
- **break** — to'xtash buyrug'i
- **default** — hech biri mos kelmaganda
- **Fall-through** — break siz pastga tushib ketish

---

## 6. 🌍 Real Hayotda Qayerda?

- **Hafta kuni:** raqam → kun nomi
- **Menyu:** tanlov → amal
- **Rol:** "admin"/"user"/"mehmon" → huquqlar

---

## 7. 🎙 Intervyu Savollari

**1. \`break\` ni unutsak nima bo'ladi?**
**Javob:** Keyingi caselar ham ishlab ketadi (fall-through) — ko'pincha xato.

**2. switch qaysi tenglik bilan solishtiradi?**
**Javob:** Qat'iy (\`===\`) — turlar ham mos bo'lishi kerak.

**3. Qachon switch, qachon if?**
**Javob:** Bitta qiymatning ko'p varianti bo'lsa — switch; murakkab shartlar bo'lsa — if.

---

## 8. ✅ Xulosa

- **switch** = bitta qiymat, ko'p variant
- **Har case'da \`break\`**, oxirida **\`default\`**
- **Solishtirish \`===\`** bilan
- **Keyingi qadam:** 1.17-darsda takrorlash — sikllar
`,
  exercises: [
    {
      id: 1,
      title: "Hafta kuni",
      instruction: "`dayName(kun)` funksiyasi: 1 => `\"Dushanba\"`, 2 => `\"Seshanba\"`, 3 => `\"Chorshanba\"`, boshqasi => `\"Boshqa kun\"` qaytarsin (switch bilan).",
      startingCode: "function dayName(kun) {\n  // switch yozing\n}\n",
      hint: "switch (kun) { case 1: return \"Dushanba\"; ... default: return \"Boshqa kun\"; }",
      test: "const fn = new Function(code + '; return dayName;')();\nif (fn(1) === 'Dushanba' && fn(3) === 'Chorshanba' && fn(9) === 'Boshqa kun') return null;\nreturn 'switch + default ishlating';"
    },
    {
      id: 2,
      title: "Bahoga so'z",
      instruction: "`gradeWord(baho)` funksiyasi: `\"A\"` => `\"A'lo\"`, `\"B\"` => `\"Yaxshi\"`, `\"C\"` => `\"Qoniqarli\"`, boshqasi => `\"Qayta topshiring\"` qaytarsin.",
      startingCode: "function gradeWord(baho) {\n  // switch yozing\n}\n",
      hint: "switch (baho) { case \"A\": return \"A'lo\"; ... }",
      test: "const fn = new Function(code + '; return gradeWord;')();\nif (fn(\"A\") === \"A'lo\" && fn(\"B\") === 'Yaxshi' && fn(\"F\") === 'Qayta topshiring') return null;\nreturn 'Matnli case ham bo\\'ladi';"
    },
    {
      id: 3,
      title: "Rol huquqi",
      instruction: "`access(rol)` funksiyasi: `\"admin\"` => `\"Hamma huquq\"`, `\"user\"` => `\"Cheklangan\"`, boshqasi => `\"Mehmon\"` qaytarsin.",
      startingCode: "function access(rol) {\n  // switch yozing\n}\n",
      hint: "switch (rol) { case \"admin\": ... }",
      test: "const fn = new Function(code + '; return access;')();\nif (fn(\"admin\") === 'Hamma huquq' && fn(\"user\") === 'Cheklangan' && fn(\"x\") === 'Mehmon') return null;\nreturn 'Uchala holat ishlashi kerak';"
    },
    {
      id: 4,
      title: "Tur tuzog'i",
      instruction: "`checkType(x)` funksiyasi switch bilan: `5` (son) => `\"son\"`, `\"5\"` (matn) => `\"matn\"` qaytarsin. Turlar farqlanishi kerak!",
      startingCode: "function checkType(x) {\n  // switch yozing\n}\n",
      hint: "case 5: ... case \"5\": ... (switch === bilan solishtiradi)",
      test: "const fn = new Function(code + '; return checkType;')();\nif (fn(5) === 'son' && fn(\"5\") === 'matn') return null;\nreturn 'switch === bilan solishtiradi!';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`break` vazifasi nima?",
      options: [
        "Siklni boshlash",
        "Mos case'dan keyin to'xtash (pastga tushmaslik)",
        "Dasturni o'chirish",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "break siz — keyingi caselar ham ishlaydi."
    },
    {
      id: 2,
      question: "switch qaysi tenglik bilan solishtiradi?",
      options: [
        "== (yumshoq)",
        "=== (qat'iy)",
        "Hech qanday",
        "> (katta)"
      ],
      correctAnswer: 1,
      explanation: "case 5 ga \"5\" mos kelmaydi!"
    },
    {
      id: 3,
      question: "`default` qachon ishlaydi?",
      options: [
        "Har doim birinchi",
        "Hech bir case mos kelmaganda",
        "Hech qachon",
        "Faqat xato bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "default — oxirgi chora."
    },
    {
      id: 4,
      question: "Qachon switch, qachon if?",
      options: [
        "Har doim switch",
        "Bitta qiymatning ko'p varianti — switch; murakkab shartlar — if",
        "Har doim if",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "To'g'ri qurolni tanlash — professional belgi."
    }
  ]

};
