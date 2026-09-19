export const templateLiterals = {
  id: "templateLiterals",
  title: "Template Literals (Backticks)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Template literals — matn yopishtirishning zamonaviy usuli
Matn ichiga o'zgaruvchi qo'shishning ikki usuli:

\`\`\`javascript
let ism = "Ali";
let yosh = 20;

// Eski usul (+ bilan):
console.log("Salom, " + ism + "! Yoshingiz " + yosh + " da.");

// Yangi usul (backtick + \${} bilan):
console.log(\`Salom, \${ism}! Yoshingiz \${yosh} da.\`);
\`\`\`

Ikkisi ham bir xil natija — lekin ikkinchisi ancha toza!

### Real hayotiy o'xshatish
Tasavvur qiling, siz **taklifnoma yozyapsiz**:
- **Eski usul** — qog'ozni kesib-yopishtirish: "Hurmatli " + [ISM] + ", sizni " + [SANA] + " ga..."
- **Yangi usul** — bo'sh joyli blanka: "Hurmatli \${ism}, sizni \${sana} ga..." — bo'sh joyga qalamda yozasiz

Blanka — tezroq, tozaroq, xatosiz!

---

## 2. 💻 Imkoniyatlar

### O'zgaruvchi qo'shish (\${})
\`\`\`javascript
let ism = "Ali";
let ball = 95;
console.log(\`Talaba \${ism} \${ball} ball oldi.\`);
\`\`\`

### Hisoblash (\${} ichida!)
\`\`\`javascript
let a = 5, b = 3;
console.log(\`Yig'indi: \${a + b}\`);  // Yig'indi: 8
console.log(\`Keyingi yil: \${2024 + 1}\`);  // Keyingi yil: 2025
\`\`\`

### Ko'p qatorli matn
\`\`\`javascript
let xat = \`Hurmatli mijoz,
Sizning buyurtmangiz tayyor.
Rahmat!\`;
console.log(xat);
\`\`\`

Eski usulda har qatorga \`\\n\` kerak edi — backtick'da shart emas!

\`\`\`mermaid
flowchart LR
    A["Matn kerakmi?"] --> B{"O'zgaruvchi bormi?"}
    B -->|"Yo'q"| C["Oddiy qo'shtirnoq"]
    B -->|"Ha"| D["Backtick + \${}"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Backtick (\`\` \` \`\`) — klaviaturada Tab tepasidagi tugma. \`\${}\` ichidagi ifoda hisoblanib, matnga aylanadi:

\`\`\`javascript
let ism = "Ali";
console.log(\`Salom \${ism.toUpperCase()}!\`);  // Salom ALI!
\`\`\`

Hatto funksiya ham chaqirish mumkin: \`\${kvadrat(5)}\` → \`25\`.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`"Salom \${ism}"\` (oddiy qo'shtirnoq) | \`\` \`Salom \${ism}\` \`\` (backtick) | \`\${}\` faqat backtick ichida ishlaydi! |
| \`\` \`Narx: \${narx} \`\` (yopilmagan) | Oxirida \`\` \` \`\` | Backtick juft bo'lishi kerak |
| \`\${}\` ni unutish (\`$ism\`) | \`\${ism}\` | Qavslarsiz ishlamaydi |

---

## 5. 🔑 Asosiy Atamalar

- **Template literal** — backtick ichidagi matn
- **Interpolatsiya** — \`\${}\` bilan qiymat qo'shish
- **Backtick** — \`\` \` \`\` belgisi (Tab tepasida)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Xabarnoma:** \`Xurmatli \${mijoz}, buyurtmangiz \${holat}\`
- **Hisobot:** \`Jami: \${son} ta, summa: \${jami} so'm\`
- **URL:** \`/users/\${id}/profile\`

---

## 7. 🎙 Intervyu Savollari

**1. Template literal afzalligi nima?**
**Javob:** O'qilishi oson, \`\${}\` ichida hisoblash mumkin, ko'p qatorli matn oson.

**2. \`\${}\` oddiy qo'shtirnoqda ishlaydimi?**
**Javob:** Yo'q — faqat backtick ichida.

**3. \`\${}\` ichida nima yozish mumkin?**
**Javob:** Har qanday ifoda: o'zgaruvchi, hisob (\`\${a+b}\`), funksiya chaqiruvi.

---

## 8. ✅ Xulosa

- **Backtick + \`\${}\`** = zamonaviy matn yopishtirish
- **\`\${}\` ichida hisoblash** mumkin
- **Ko'p qator** — avtomatik
- **Keyingi qadam:** 1.21-darsda qat'iy rejim — strict mode
`,
  exercises: [
    {
      id: 1,
      title: "Blanka to'ldirish",
      instruction: "`invite(ism)` funksiyasi backtick bilan `\"Xurmatli Ali, taklif qilamiz!\"` qaytarsin.",
      startingCode: "function invite(ism) {\n  // backtick yozing\n}\n",
      hint: "return `Xurmatli ${ism}, taklif qilamiz!`;",
      test: "if (!code.includes('`')) return 'Backtick ishlatilmadi';\nconst fn = new Function(code + '; return invite;')();\nif (fn(\"Ali\") === 'Xurmatli Ali, taklif qilamiz!') return null;\nreturn 'Format xato';"
    },
    {
      id: 2,
      title: "Hisob ichida",
      instruction: "`total(a, b)` funksiyasi `\"Yig'indi: 8\"` formatida qaytarsin (a=5, b=3 uchun). Hisob ${} ICHIDA bo'lsin!",
      startingCode: "function total(a, b) {\n  // ${a + b} ishlating\n}\n",
      hint: "return `Yig'indi: ${a + b}`;",
      test: "const fn = new Function(code + '; return total;')();\nif (fn(5, 3) === \"Yig'indi: 8\") return null;\nreturn 'Hisob ${} ichida bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Profil manzili",
      instruction: "`profileUrl(id)` funksiyasi `` `/users/42/profile` `` qaytarsin (id=42 uchun).",
      startingCode: "function profileUrl(id) {\n  // backtick yozing\n}\n",
      hint: "return `/users/${id}/profile`;",
      test: "const fn = new Function(code + '; return profileUrl;')();\nif (fn(42) === '/users/42/profile') return null;\nreturn 'URL formati xato';"
    },
    {
      id: 4,
      title: "Chek chiqarish",
      instruction: "`chek(mahsulot, narx, soni)` funksiyasi `\"Non x 3 = 9000 so'm\"` qaytarsin (jami ${} ichida hisoblansin).",
      startingCode: "function chek(mahsulot, narx, soni) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return `${mahsulot} x ${soni} = ${narx * soni} so'm`;",
      test: "const fn = new Function(code + '; return chek;')();\nif (fn(\"Non\", 3000, 3) === \"Non x 3 = 9000 so'm\") return null;\nreturn 'Format: Non x 3 = 9000 so\\'m';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`${}` qayerda ishlaydi?",
      options: [
        "Oddiy qo'shtirnoqda",
        "Faqat backtick ichida",
        "Hamma joyda",
        "Hech qayerda"
      ],
      correctAnswer: 1,
      explanation: "\"Salom ${ism}\" — matnligicha chiqadi, backtick kerak!"
    },
    {
      id: 2,
      question: "Backtick qayerda joylashgan?",
      options: [
        "Enter yonida",
        "Tab tepasida (ё harfi)",
        "Probeldа",
        "Sichqonchada"
      ],
      correctAnswer: 1,
      explanation: "Chap yuqori burchak — 1 raqami yonida."
    },
    {
      id: 3,
      question: "`${}` ichida nima yozish mumkin?",
      options: [
        "Faqat o'zgaruvchi nomi",
        "Har qanday ifoda (hisob, funksiya)",
        "Faqat matn",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "${a + b}, ${kvadrat(5)} — hammasi ishlaydi."
    },
    {
      id: 4,
      question: "Ko'p qatorli matnda template literal afzalligi?",
      options: [
        "Yo'q",
        "\\n yozish shart emas — Enter kifoya",
        "Tezroq ishlaydi",
        "Rangli chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Backtick ichida qator tashlash avtomatik."
    }
  ]

};
