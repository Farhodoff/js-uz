export const jsWhat = {
  id: "jsWhat",
  title: "JavaScriptga Kirish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### JavaScript nima?
**JavaScript (JS)** — veb-sahifalarni jonlantiradigan til. Tugmani bossangiz — nimadir bo'ladi. Matn yozsangiz — sahifa javob beradi. Ana shu "jonlilik" ortida JavaScript turadi.

> **Bir jumlada:** HTML — skelet, CSS — kiyim, **JavaScript — miya va muskullar**.

### Qayerda ishlaydi?
- **Brauzerda** — har bir sayt ichida (Chrome, Firefox, Safari)
- **Serverda** — Node.js yordamida (backend)
- **Telefonda** — mobil ilovalarda
- **Hatto robotlarda** — istalgan joyda!

### Real hayotiy o'xshatish
Tasavvur qiling, siz **uy quryapsiz**:
- **HTML** — g'ishtlar va devorlar (tuzilish)
- **CSS** — bo'yoq, pardalar, mebel (ko'rinish)
- **JavaScript** — elektr va suv tizimi (hamma narsa ISHLAYDI: chiroq yonadi, suv oqadi)

Elektrsiz uy — shunchaki chiroyli quti. JavaScriptsiz sayt — shunchaki chiroyli rasm.

---

## 2. 💻 Birinchi Kod

Qo'rqmang — birinchi kodingizni hoziroq yozamiz. Bu ikki qatorni o'ngdagi muharrirga yozing va **"Ishga tushirish"** tugmasini bosing:

\`\`\`javascript
const ism = "Ali";
console.log("Salom, " + ism + "!");
\`\`\`

**Natija:** Konsolda \`Salom, Ali!\` chiqadi. TABRIKLAYMAN!

Tabriklayman — siz hozirgina JavaScript dasturchisisiz!

### Bu kodda nima bo'lyapti?
1. **const ism = "Ali"** — \`ism\` degan "quti" (o'zgaruvchi) yaratdik, ichiga matn soldik
2. **console.log(...)** — qavs ichidagini konsolga chop etdik
3. **"Salom, " + ism** — ikki matnni \`+\` bilan yopishtirdik

---

## 3. ⚙️ Qanday Ishlaydi

Brauzer kodingizni bevosita tushunmaydi. Orada **JavaScript dvigateli** (Chrome'da **V8**) ishlaydi:

1. **O'qish:** kod matn sifatida o'qiladi
2. **Tarjima:** mashina tushunadigan kodga aylantiriladi
3. **Bajarish:** qator-ma-qator bajariladi, natija ekranga chiqadi

\`\`\`mermaid
flowchart LR
    A["Sizning kodingiz"] --> B["Dvigatel: V8"]
    B --> C["O'qish"]
    C --> D["Tarjima"]
    D --> E["Natija ekranda"]
\`\`\`

Buni yodlash shart emas — brauzer og'ir ishni o'zi qiladi. Siz faqat to'g'ri buyruq berishni o'rganasiz.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`Console.Log(...)\` | \`console.log(...)\` | Katta-kichik harf farq qiladi |
| \`console.log(Salom)\` | \`console.log("Salom")\` | Matn qo'shtirnoq ichida bo'lishi shart |
| \`"Salom\` (yopilmagan) | \`"Salom"\` | Har bir qo'shtirnoq yopilishi shart |

---

## 5. 🔑 Asosiy Atamalar

- **O'zgaruvchi (variable)** — ma'lumot saqlaydigan "quti" (\`const ism = "Ali"\`)
- **Konsol (console)** — natijalarni ko'rish joyi, dasturchining "qoralama daftari"
- **Satr (string)** — qo'shtirnoq ichidagi matn (\`"Salom"\`)
- **Sintaksis (syntax)** — tilning yozilish qoidalari
- **ECMAScript (ES)** — standartning rasmiy nomi (ES6 = 2015 yangilanishi)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Ijtimoiy tarmoqlar** — like tugmasi, lenta yangilanishi
- **Online do'konlar** — savatchaga qo'shish, narx hisoblash
- **Xaritalar** — sudrab ko'rish, masshtab o'zgartirish
- **Chatlar** — xabar kelishi bilanoq ekranda chiqishi

Keyingi darslarda shularning kichik nusxalarini O'ZINGIZ yozasiz.

---

## 7. 🎙 Intervyu Savollari

**1. JavaScript nima, HTML/CSS dan farqi nimada?**
**Javob:** HTML tuzilish, CSS ko'rinish beradi. JavaScript harakat va mantiq qo'shadi — foydalanuvchi harakatlariga javob beradi.

**2. Kod qayerda bajariladi?**
**Javob:** Brauzer ichidagi dvigatelda (masalan V8). Node.js bilan serverda ham ishlaydi.

**3. \`console.log\` nima uchun kerak?**
**Javob:** Oraliq natijalarni ko'rish uchun — xato topishda birinchi yordamchi.

---

## 8. ✅ Xulosa

- **JavaScript** — saytlarga jon bag'ishlaydi (HTML = skelet, CSS = kiyim, JS = miya)
- **Qayerda:** brauzer, server, telefon — hamma joyda
- **Qurollar:** o'zgaruvchi (quti), \`console.log\` (chop etish), \`+\` (yopishtirish)
- **Keyingi qadam:** 1.2-darsda \`console\` imkoniyatlarini o'rganamiz
`,
  exercises: [
    {
      id: 1,
      title: "Salom, Dunyo!",
      instruction: "Konsolga `Salom, Dunyo!` matnini chop eting. `console.log` dan foydalaning.",
      startingCode: "// Konsolga Salom, Dunyo! ni chop eting\n",
      hint: "console.log(\"Salom, Dunyo!\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';"
    },
    {
      id: 2,
      title: "Ismingizni chop eting",
      instruction: "`ism` nomli o'zgaruvchi yarating (const bilan), unga o'z ismingizni yozing va konsolga chop eting.",
      startingCode: "// ism o'zgaruvchisini yarating va chop eting\n",
      hint: "const ism = \"Ali\"; console.log(ism);",
      test: "const fn = new Function(code + '; return (typeof ism !== \"undefined\" ? ism : null);')();\nif (fn === null) return 'ism nomli o\\'zgaruvchi topilmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "Salomlashuv yasash",
      instruction: "`greet(name)` funksiyasini yozing. U ism qabul qilib, `Salom Ali` formatida matn qaytarsin. Masalan: greet('Ali') => 'Salom Ali'.",
      startingCode: "function greet(name) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return 'Salom ' + name; dan foydalaning.",
      test: "const fn = new Function(code + '; return greet;')();\nif (fn('Ali') === 'Salom Ali') return null;\nreturn 'Salomlashuv formati xato';"
    },
    {
      id: 4,
      title: "Yig'indi hisoblash",
      instruction: "`sum(a, b)` funksiyasini yozing. U ikki son yig'indisini `result` o'zgaruvchisida saqlab, qaytarsin.",
      startingCode: "function sum(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "let result = a + b; keyin return result;",
      test: "if (!code.includes('result')) return 'result nomli o\\'zgaruvchi bo\\'lishi shart';\nconst fn = new Function(code + '; return sum;')();\nif (fn(5, 10) === 15 && fn(-1, 1) === 0) return null;\nreturn 'sum funksiyasi yig\\'indini to\\'g\\'ri qaytarmadi';"
    },
    {
      id: 5,
      title: "Turini aniqlash",
      instruction: "`getType(value)` funksiyasini yozing. U qiymat turini `typeof` bilan aniqlab qaytarsin.",
      startingCode: "function getType(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value;",
      test: "const fn = new Function(code + '; return getType;')();\nif (fn(42) === 'number' && fn('Salom') === 'string' && fn(true) === 'boolean') return null;\nreturn 'getType noto\\'g\\'ri ishladi';"
    },
    {
      id: 6,
      title: "O'zgarmas son",
      instruction: "`getPi()` funksiyasini yozing. Ichida `const PI = 3.14` e'lon qilib, uni qaytaring.",
      startingCode: "function getPi() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "const PI = 3.14; qilib return qiling.",
      test: "if (!code.includes('const PI')) return 'const PI e\\'lon qilinishi kerak';\nconst fn = new Function(code + '; return getPi;')();\nif (fn() === 3.14) return null;\nreturn 'Funksiya 3.14 qaytarishi kerak';"
    },
    {
      id: 7,
      title: "Voyaga yetganmi?",
      instruction: "`isAdult(age)` funksiyasi yosh 18+ bo'lsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function isAdult(age) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return age >= 18;",
      test: "const fn = new Function(code + '; return isAdult;')();\nif (fn(18) === true && fn(17) === false) return null;\nreturn 'Yosh tekshiruvi xato';"
    },
    {
      id: 8,
      title: "Qat'iy tenglik",
      instruction: "`isStrictlyEqual(a, b)` funksiyasi ikki qiymatning qat'iy tengligini (`===`) tekshirsin.",
      startingCode: "function isStrictlyEqual(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a === b;",
      test: "const fn = new Function(code + '; return isStrictlyEqual;')();\nif (fn(5, '5') === false && fn(5, 5) === true) return null;\nreturn 'Qat\\'iy tenglik xato';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "JavaScript nima?",
      options: [
        "Faqat serverda ishlaydigan ma'lumotlar bazasi tili",
        "Veb-sahifalarga harakat va interaktivlik qo'shadigan dasturlash tili",
        "Faqat dizayn uchun ishlatiladigan uslublar to'plami",
        "Kompyuterning operatsion tizimi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript sahifaga harakat va mantiq qo'shadi — tugmalar, hisoblash, yangilanish."
    },
    {
      id: 2,
      question: "HTML, CSS va JavaScript o'rtasidagi farq qaysi javobda to'g'ri?",
      options: [
        "HTML = miya, CSS = skelet, JS = kiyim",
        "HTML = skelet, CSS = kiyim, JS = miya va muskullar",
        "Uchovi ham bir xil ish qiladi",
        "JavaScript faqat rasm chizish uchun"
      ],
      correctAnswer: 1,
      explanation: "HTML tuzilish, CSS ko'rinish, JS harakat va mantiq beradi."
    },
    {
      id: 3,
      question: "JavaScript kodi qayerda bajariladi?",
      options: [
        "Faqat qog'ozda",
        "Brauzer ichidagi dvigatelda (masalan V8), Node.js bilan serverda ham",
        "Faqat printerda",
        "Hech qayerda bajarilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Asosan brauzer dvigatelida, Node.js yordamida serverda ham ishlaydi."
    },
    {
      id: 4,
      question: "`console.log(\"Salom\")` nima qiladi?",
      options: [
        "Kompyuterni o'chiradi",
        "Matnni konsolga chop etadi",
        "Internetni uzadi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "console.log — natijani konsolda ko'rish uchun eng asosiy qurol."
    },
    {
      id: 5,
      question: "Quyidagi kod natijasi nima?\n```javascript\nconst ism = \"Ali\";\nconsole.log(\"Salom, \" + ism + \"!\");\n```",
      options: [
        "\"Salom, Ali!\"",
        "\"Salom ism\"",
        "Xatolik beradi",
        "\"Ali Salom\""
      ],
      correctAnswer: 0,
      explanation: "`+` matnlarni yopishtiradi: \"Salom, \" + \"Ali\" + \"!\" = \"Salom, Ali!\"."
    },
    {
      id: 6,
      question: "Nima uchun `Console.Log` ishlamaydi-yu `console.log` ishlaydi?",
      options: [
        "Brauzer buzilgan",
        "JavaScript katta-kichik harfga sezgir",
        "Nuqta keraksiz",
        "console eskirgan"
      ],
      correctAnswer: 1,
      explanation: "JavaScript case-sensitive: `Console` va `console` ikki xil narsa."
    },
    {
      id: 7,
      question: "`console.log(Salom)` nima uchun xato?",
      options: [
        "Salom so'zi qo'shtirnoqsiz — uni o'zgaruvchi deb o'ylaydi",
        "console noto'g'ri yozilgan",
        "Nuqta ortiqcha",
        "Hammasi to'g'ri, xato yo'q"
      ],
      correctAnswer: 0,
      explanation: "Matn har doim qo'shtirnoq ichida: `console.log(\"Salom\")`."
    },
    {
      id: 8,
      question: "ECMAScript (ES) nima?",
      options: [
        "JavaScript'ning raqobatchi tili",
        "JavaScript standartining rasmiy nomi — barcha brauzerlar unga amal qiladi",
        "Ma'lumotlar bazasi dasturi",
        "Faqat animatsiya standarti"
      ],
      correctAnswer: 1,
      explanation: "ECMAScript — qoidalar to'plami, JavaScript shu qoidalarga amal qiladi."
    }
  ]

};
