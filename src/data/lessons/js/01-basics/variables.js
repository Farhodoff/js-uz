export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### O'zgaruvchi nima?
**O'zgaruvchi** — ma'lumot saqlaydigan nomlangan "quti". Do'kon misolida: savatdagi har bir mahsulot alohida qutida, ustida yorliq yozilgan.

\`\`\`javascript
let ism = "Ali";
\`\`\`

Bu qatorda uch narsa bo'lyapti:
1. **let** — "yangi quti yarataman" degan buyruq
2. **ism** — qutining nomi (yorliq)
3. **"Ali"** — quti ichidagi narsa (qiymat)

### Real hayotiy o'xshatish
Tasavvur qiling, siz **omborxona mudirisiz**:
- Har bir qutida bitta narsa saqlanadi
- Quti ustida yorliq bor (\`ism\`, \`yosh\`, \`manzil\`)
- Quti ichidagini istalgan payt almashtirish mumkin — lekin yorliq o'zgarmaydi

\`\`\`javascript
let rang = "Qizil";  // qutiga Qizil soldik
rang = "Yashil";     // eskisini tashlab, Yashil soldik
\`\`\`

---

## 2. 💻 let, const — farqi nima?

### let — o'zgaruvchan quti
Qiymati keyin o'zgarishi mumkin bo'lgan narsalar uchun:

\`\`\`javascript
let yosh = 20;
yosh = 21;  // tug'ilgan kun o'tdi, yangiladik
console.log(yosh);  // 21
\`\`\`

### const — muhrlangan quti
Qiymati HECH QACHON o'zgarmaydigan narsalar uchun:

\`\`\`javascript
const tugilganYil = 2000;
tugilganYil = 2001;  // XATO! O'zgartirib bo'lmaydi
\`\`\`

### Qoidani eslab qoling
> **Shubhalansangiz — \`const\` ishlating.** O'zgartirish kerak bo'lib qolsa, keyin \`let\` ga almashtirasiz. Bu professional dasturchilarning oltin qoidasi.

\`\`\`mermaid
flowchart TD
    A["Qiymat o'zgaradimi?"] -->|"Ha (yosh, hisob)"| B["let"]
    A -->|"Yo'q (tug'ilgan yil, PI)"| C["const"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`let ism = "Ali"\` yozganingizda kompyuter xotirasidan kichik joy ajratadi va unga \`ism\` deb nom beradi:

1. **E'lon (declare):** \`let ism;\` — bo'sh quti yaratildi (ichida \`undefined\`)
2. **O'zlashtirish (assign):** \`ism = "Ali";\` — qutiga qiymat solindi
3. **O'qish (read):** \`console.log(ism);\` — quti ochilib, ichidagisi o'qildi

Buni bir qatorda ham yozish mumkin: \`let ism = "Ali";\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`let ism = "Ali"; let ism = "Vali";\` | \`ism = "Vali";\` (qayta \`let\` siz) | Quti bir marta yaratiladi, keyin faqat ichidagisi almashtiriladi |
| \`let 1ism = "Ali";\` | \`let ism1 = "Ali";\` | Nom raqam bilan boshlanishi mumkin emas |
| \`let ism-family = "Ali";\` | \`let ismFamily = "Ali";\` | Nomda \`-\` mumkin emas, camelCase ishlating |
| \`apple\` va \`APPLE\` ni bir xil deb o'ylash | Bular ikki xil quti! | Katta-kichik harf farq qiladi |

### Nomlash qoidalari
1. Harf, raqam, \`$\`, \`_\` mumkin — lekin **birinchi belgi raqam bo'lmasin**
2. Bir nechta so'z bo'lsa **camelCase**: \`ismFamilyasi\`, \`tugilganYil\`
3. \`let\`, \`const\`, \`function\` kabi **zaxira so'zlarni** nom qilib bo'lmaydi
4. \`a\`, \`data\`, \`x\` kabi **ma'nosiz nomlardan qoching** — \`foydalanuvchiIsmi\` ancha yaxshi

---

## 5. 🔑 Asosiy Atamalar

- **E'lon qilish (declare)** — quti yaratish (\`let ism;\`)
- **O'zlashtirish (assign)** — qutiga qiymat solish (\`ism = "Ali";\` — \`=\` belgisi bilan)
- **Qayta tayinlash (reassign)** — ichidagini almashtirish (faqat \`let\` da mumkin)
- **Konstanta (constant)** — o'zgarmas qiymat (\`const\`)
- **camelCase** — so'zlarni bosh harf bilan ulash usuli (\`meningIsmim\`)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Savatcha:** \`let jamiNarx = 0;\` — har mahsulotda yangilanadi
- **Foydalanuvchi:** \`const login = "ali_2000";\` — o'zgarmaydi
- **Sozlamalar:** \`const ASOSIY_RANG = "#FF0000";\` — katta harf bilan yoziladigan doimiy qiymatlar

---



### \`var\` haqida

Eski kodlarda \`var\` ko'rasiz — u ham o'zgaruvchi yaratadi, lekin FARQ qiladi:

\`\`\`javascript
if (true) {
  var v = 1;   // blokdan chiqib ketadi!
  let l = 2;   // blok ichida qoladi
}
console.log(v);  // 1
console.log(l);  // XATO!
\`\`\`

**Qoida:** zamonaviy kodda faqat \`let\` va \`const\` ishlating. \`var\` — faqat eski kodni o'qish uchun bilinadi.
` ,
  exercises: [
    {
      id: 1,
      title: "Birinchi quti",
      instruction: "`ism` nomli o'zgaruvchi yarating (`let` bilan) va unga o'z ismingizni yozing.",
      startingCode: "// ism qutisini yarating\n",
      hint: "let ism = \"Ali\";",
      test: "const v = new Function(code + '; return (typeof ism !== \"undefined\" ? ism : null);')();\nif (v === null) return 'ism nomli o\\'zgaruvchi topilmadi';\nreturn null;"
    },
    {
      id: 2,
      title: "Qiymatni almashtirish",
      instruction: "`rang` qutisini yarating, ichiga `Qizil` soling. Keyingi qatorda uni `Yashil` ga almashtiring.",
      startingCode: "// rang ni yarating va almashtiring\n",
      hint: "let rang = \"Qizil\"; rang = \"Yashil\";",
      test: "const v = new Function(code + '; return (typeof rang !== \"undefined\" ? rang : null);')();\nif (v !== 'Yashil') return 'rang ning oxirgi qiymati Yashil bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "Muhrlangan yil",
      instruction: "`TUGILGAN_YIL` ni `const` bilan e'lon qiling va unga o'z yilingizni yozing (masalan 2000).",
      startingCode: "// const bilan yilni muhrlang\n",
      hint: "const TUGILGAN_YIL = 2000;",
      test: "if (!code.includes('const')) return 'const ishlatilmadi';\nconst v = new Function(code + '; return (typeof TUGILGAN_YIL !== \"undefined\" ? TUGILGAN_YIL : null);')();\nif (typeof v !== 'number') return 'TUGILGAN_YIL songa teng bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "Ikki quti, bitta yig'indi",
      instruction: "`a = 5` va `b = 7` qutilarini yarating. Uchinchi `sum` qutisiga ularning yig'indisini soling.",
      startingCode: "let a = 5;\nlet b = 7;\n// sum ni yarating\n",
      hint: "let sum = a + b;",
      test: "const v = new Function(code + '; return (typeof sum !== \"undefined\" ? sum : null);')();\nif (v !== 12) return 'sum 12 ga teng bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "Qiymat ko'chirish",
      instruction: "`name` ga `John` bering, keyin uni `admin` ga ko'chiring. Ikkala quti ham `John` bo'lishi kerak.",
      startingCode: "let admin;\nlet name;\n// Qolganini yozing\n",
      hint: "name = \"John\"; admin = name;",
      test: "const r = new Function(code + '; return [admin, name];')();\nif (r[0] === 'John' && r[1] === 'John') return null;\nreturn 'admin va name ikkisi ham John bo\\'lishi kerak';"
    },
    {
      id: 6,
      title: "Yaxshi nom tanlash",
      instruction: "Sayyoramiz nomini saqlaydigan, ma'noli nomli o'zgaruvchi yarating va unga `Yer` yozing.",
      startingCode: "// Ma'noli nom tanlang\n",
      hint: "let ourPlanetName = \"Yer\";",
      test: "const hasGood = /ourPlanet|planetName|sayyora|yerNomi/i.test(code);\nif (!hasGood) return 'Ma\\'noli nom tanlang (masalan ourPlanetName)';\nif (!code.includes('Yer')) return 'Yer qiymati bo\\'lishi kerak';\nreturn null;"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`let ism = \"Ali\";` qatorida nechta ish bajarilmoqda?",
      options: [
        "Bitta — faqat chop etish",
        "Ikkita — quti yaratish (e'lon) va ichiga qiymat solish (o'zlashtirish)",
        "Hech narsa — bu izoh",
        "Uchta — quti, chop etish, o'chirish"
      ],
      correctAnswer: 1,
      explanation: "let — quti yaratadi, = — ichiga qiymat soladi."
    },
    {
      id: 2,
      question: "Qaysi holatda `const` ishlatish kerak?",
      options: [
        "Qiymat tez-tez o'zgarganda",
        "Qiymat hech qachon o'zgarmaganda (tug'ilgan yil, PI)",
        "Har doim — const universal",
        "Hech qachon — const keraksiz"
      ],
      correctAnswer: 1,
      explanation: "const o'zgarmas narsalar uchun — muhrlangan quti."
    },
    {
      id: 3,
      question: "Quyidagi kodda xatolik qayerda?\n```javascript\nlet ism = \"Ali\";\nlet ism = \"Vali\";\n```",
      options: [
        "Xatolik yo'q",
        "Bir quti ikki marta let bilan yaratilgan — ikkinchisida let bo'lmasligi kerak",
        "Qo'shtirnoq xato",
        "Ali noto'g'ri ism"
      ],
      correctAnswer: 1,
      explanation: "Quti bir marta yaratiladi: `ism = \"Vali\";` kifoya."
    },
    {
      id: 4,
      question: "Qaysi nom YAROQSIZ?",
      options: [
        "ismFamilyasi",
        "_maxfiy",
        "$narx",
        "1-raqam"
      ],
      correctAnswer: 3,
      explanation: "Nom raqam bilan boshlanishi va `-` tutishi mumkin emas."
    },
    {
      id: 5,
      question: "`let rang;` dan keyin `rang` ning qiymati nima?",
      options: [
        "null",
        "undefined (bo'sh quti)",
        "0",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Qiymatsiz quti avtomatik `undefined` bo'ladi."
    },
    {
      id: 6,
      question: "Nega `foydalanuvchiIsmi` nomi `x` nomidan yaxshi?",
      options: [
        "Uzun nomlar tezroq ishlaydi",
        "Ma'noli nom kodni o'qishni osonlashtiradi",
        "Farqi yo'q",
        "x taqiqlangan so'z"
      ],
      correctAnswer: 1,
      explanation: "Yaxshi nom — yaxshi hujjat: quti ichida nima borligi nomidan bilinadi."
    }
  ]

};
