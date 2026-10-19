export const miniProject = {
  id: "miniProject",
  title: "🏆 Mini-Loyiha: Kalkulyator Yadrosi",
  language: "javascript",
  theory: `## 1. Bu nima?

Kalkulyatorni qo'lingizga oling. Tugmalarni bosasiz, ekranda son chiqadi. Lekin tugma bilan ekran orasida **miya** bor: u qaysi amal tanlanganini biladi, sonlarni hisoblaydi va natijani tayyorlaydi. Bugun biz aynan shu **miyani** yozamiz — tugma va ekran keyingi bosqichlarda.

**Mini-loyiha** — kichik, lekin tugallangan dastur bo'lib, u 1-Bosqichda o'rgangan bilimlarni (funksiya, shart, switch, massiv, matn) bitta maqsad yo'lida birlashtiradi.

Bugungi loyiha tarkibi:

1. \`add(a, b)\` — qo'shish
2. \`subtract(a, b)\` — ayirish
3. \`multiply(a, b)\` — ko'paytirish
4. \`divide(a, b)\` — bo'lish (nolni tekshirish bilan)
5. \`calculate(a, op, b)\` — buyruqni to'g'ri amalga yo'naltiruvchi dispatcher (switch bilan)
6. \`describe(a, op, b)\` — natijani o'qiladigan matn qilib chiqarish

*Yangi atama:*

- **Modul** — faqat bitta vazifani bajaruvchi kichik funksiya.

---

## 2. Nega kerak?

Muammo: hamma hisob-kitobni bitta katta funksiyaga tiqsak, kod o'qib bo'lmas holga keladi.

\`\`\`javascript
function kalkulyator(a, op, b) {
  if (op === "+") {
    if (typeof a !== "number") return "Son kiriting!";
    return a + b;
  }
  if (op === "-") {
    if (typeof a !== "number") return "Son kiriting!";
    return a - b;
  }
  // ... har bir amal uchun yana o'nlab qator
}
\`\`\`

Bunday kodda bitta xatoni tuzatish uchun butun blokni ko'zdan kechirish kerak. Yangi amal qo'shish esa yana qatorlarni takrorlashga olib keladi.

Yechim: har bir amalni alohida kichik funksiyaga ajratish va ularni dispatcher orqali chaqirish. Natijada har bir funksiya qisqa va mustaqil bo'ladi.

---

## 3. Birinchi misol

Eng oddiy amal — qo'shish. Undan keyin bo'lishni noldan himoyalaymiz.

\`\`\`javascript
function add(a, b) {
  return a + b; // ikki sonni qo'shib qaytaramiz
}

function divide(a, b) {
  if (b === 0) {
    return "Nolga bo'lib bo'lmaydi!"; // nolni oldindan ushlaymiz
  }
  return a / b;
}

console.log(add(5, 3));
console.log(divide(10, 2));
console.log(divide(5, 0));
\`\`\`

\`\`\`text
// Natija:
8
5
Nolga bo'lib bo'lmaydi!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function add(a, b) { ... }\` — ikki parametr oladigan funksiya e'lon qilindi.
- \`return a + b;\` — natija funksiyadan tashqariga chiqariladi; \`console.log\` emas, aynan \`return\` — chunki natijani keyin boshqa joyda ham ishlatamiz.
- \`if (b === 0)\` — bo'lishdan **oldin** nolni tekshiramiz, aks holda \`Infinity\` chiqadi.
- \`divide(5, 0)\` — shu sababli xato qiymat o'rniga tushunarli matn qaytadi.

---

## 5. Qadamma-qadam (ma'lumot oqimi)

\`describe(5, "+", 3)\` chaqirilganda ma'lumot qanday harakatlanadi:

| Qadam | Nima bajariladi | Qiymat |
|---|---|---|
| 1 | \`describe(5, "+", 3)\` chaqirildi | a = 5, op = "+", b = 3 |
| 2 | \`calculate(a, op, b)\` chaqirildi | switch \`op\` ni ko'radi |
| 3 | \`case "+"\` tanlandi | \`add(5, 3)\` |
| 4 | \`add\` hisobladi | 8 |
| 5 | \`describe\` matn yasadi | "5 + 3 = 8" |

---

## 6. Yana bitta misol

1-misoldan farqi: endi kirimni tekshiramiz (validatsiya).

\`\`\`javascript
function safeAdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Son kiriting!"; // noto'g'ri kirimni erta ushlaymiz
  }
  return a + b;
}

console.log(safeAdd(5, 3));
console.log(safeAdd("5", 3));
\`\`\`

\`\`\`text
// Natija:
8
Son kiriting!
\`\`\`

Tahlil:

- \`typeof a !== "number"\` — \`a\` son emasligini bildiradi; \`||\` bilan ikkinchi parametr ham tekshirildi.
- Tekshiruv hisoblashdan **oldin** bajariladi, shuning uchun noto'g'ri natija chiqmaydi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: nolga bo'lishni tekshirmaslik

❌ Xato kod:

\`\`\`javascript
function divide(a, b) {
  return a / b; // b = 0 bo'lsa Infinity qaytadi
}
console.log(divide(5, 0));
\`\`\`

**Nima bo'ladi:** Natijada \`Infinity\` chiqadi — foydalanuvchi uchun tushunarsiz qiymat.
**To'g'ri varianti:** \`if (b === 0) return "Nolga bo'lib bo'lmaydi!";\`.

### 2-xato: har bir amalni bitta katta funksiyaga yig'ish

❌ Xato kod:

\`\`\`javascript
function kalkulyator(a, op, b) {
  if (op === "+") return a + b;
  else if (op === "-") return a - b;
  else if (op === "*") return a * b;
  else return a / b;
}
\`\`\`

**Nima bo'ladi:** Kod ishlaydi, lekin bo'lish uchun nol tekshiruvi qo'shish qiyinlashadi va yangi amal qo'shishda xato qilish oson bo'ladi.
**To'g'ri varianti:** Har bir amal alohida funksiya, tanlash esa \`switch\` bilan — modulli dizayn.

### 3-xato: xato o'rniga \`undefined\` qaytarish

❌ Xato kod:

\`\`\`javascript
function calculate(a, op, b) {
  if (op === "+") return a + b;
}
console.log(calculate(5, "%", 3)); // undefined
\`\`\`

**Nima bo'ladi:** \`undefined\` foydalanuvchiga hech narsa tushuntirmaydi.
**To'g'ri varianti:** \`default: return "Noma'lum amal";\`.

---

## 8. Tekshiruv

### 1-mashq (oson)

\`add(a, b)\` funksiyasini yozing — ikki sonni qo'shib qaytarsin.

### 2-mashq (o'rtacha)

\`calculate(a, op, b)\` dispatcheri yozilsin: barcha to'rt amal alohida funksiyalarda, tanlash esa \`switch\` bilan; noma'lum amal uchun \`"Noma'lum amal"\` qaytsin.

### 3-mashq (chegara holat)

\`formatResult(natija)\` funksiyasi natijani chiqaradi: agar natija son bo'lmasa (masalan, xato xabari matni bo'lsa), uni o'zicha qaytarsin; son bo'lsa \`"Natija: "\` matnini oldiga qo'shib qaytarsin.

---

### Javoblar

**1-mashq javobi:**

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

**2-mashq javobi:**

\`\`\`javascript
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nolga bo'lib bo'lmaydi!";
  return a / b;
}

function calculate(a, op, b) {
  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return "Noma'lum amal";
  }
}
\`\`\`

**3-mashq javobi:**

\`\`\`javascript
function formatResult(natija) {
  if (typeof natija !== "number") {
    return natija;
  }
  return "Natija: " + natija;
}
\`\`\`

---

## 9. Xulosa

1. Har bir kichik funksiya bitta vazifani bajaradi — test qilish va o'zgartirish osonlashadi.
2. \`switch\` dispatcher buyruqni to'g'ri funksiyaga yo'naltiradi va noma'lum amal uchun \`default\` javobi bo'ladi.
3. Validatsiya (kirimni tekshirish) va nolga bo'lish himoyasi natijani ishonchli qiladi.

Keyingi darsda: 2-Bosqichga o'tamiz — ma'lumot turlari va massivlar bilan chuqurroq ishlashni boshlaymiz.
`,
exercises: [
    {
      id: 1,
      title: "Qo'shish",
      instruction: "`add(a, b)` funksiyasini yozing — ikki sonni qo'shib qaytarsin.",
      startingCode: "function add(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a + b;",
      test: "const fn = new Function(code + '; return add;')();\nif (fn(5, 3) === 8 && fn(-1, 1) === 0) return null;\nreturn '5+3=8 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Ayirish va ko'paytirish",
      instruction: "`subtract(a, b)` va `multiply(a, b)` funksiyalarini yozing.",
      startingCode: "function subtract(a, b) {\n  // Kodni shu yerda yozing\n}\nfunction multiply(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a - b;  /  return a * b;",
      test: "const r = new Function(code + '; return [subtract, multiply];')();\nif (r[0](10, 4) === 6 && r[1](3, 4) === 12) return null;\nreturn 'Ikkala funksiya to\\'g\\'ri bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Bo'lish + nol tekshiruvi",
      instruction: "`divide(a, b)` funksiyasini yozing. Nolga bo'linsa `\"Nolga bo'lib bo'lmaydi!\"` qaytarsin.",
      startingCode: "function divide(a, b) {\n  // Nolni tekshiring\n}\n",
      hint: "if (b === 0) return \"Nolga bo'lib bo'lmaydi!\"; return a / b;",
      test: "const fn = new Function(code + '; return divide;')();\nif (fn(10, 2) === 5 && fn(5, 0) === \"Nolga bo'lib bo'lmaydi!\") return null;\nreturn 'Nolni tekshirish kerak!';"
    },
    {
      id: 4,
      title: "Validatsiya",
      instruction: "`safeAdd(a, b)` funksiyasi: agar ikkisi ham son bo'lmasa `\"Son kiriting!\"` qaytarsin, aks holda yig'indini.",
      startingCode: "function safeAdd(a, b) {\n  // typeof bilan tekshiring\n}\n",
      hint: "if (typeof a !== \"number\" || typeof b !== \"number\") return \"Son kiriting!\"; return a + b;",
      test: "const fn = new Function(code + '; return safeAdd;')();\nif (fn(5, 3) === 8 && fn(\"5\", 3) === 'Son kiriting!') return null;\nreturn 'typeof bilan tekshiring';"
    },
    {
      id: 5,
      title: "Dispatcher",
      instruction: "`calculate(a, op, b)` funksiyasi switch bilan ishlasin: `\"+\"` => add, `\"-\"` => subtract, `\"*\"` => multiply, `\"/\"` => divide, boshqasi => `\"Noma'lum amal\"`. Barcha funksiyalar kodda bo'lishi kerak.",
      startingCode: "function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\nfunction divide(a, b) { if (b === 0) return \"Nolga bo'lib bo'lmaydi!\"; return a / b; }\n\nfunction calculate(a, op, b) {\n  // switch yozing\n}\n",
      hint: "switch (op) { case \"+\": return add(a, b); ... default: return \"Noma'lum amal\"; }",
      test: "const fn = new Function(code + '; return calculate;')();\nif (fn(5, \"+\", 3) === 8 && fn(10, \"-\", 4) === 6 && fn(3, \"*\", 4) === 12 && fn(10, \"/\", 2) === 5 && fn(1, \"%\", 2) === \"Noma'lum amal\") return null;\nreturn 'Barcha amallar ishlashi kerak';"
    },
    {
      id: 6,
      title: "Chiqarish",
      instruction: "`describe(a, op, b)` funksiyasi backtick bilan `\"5 + 3 = 8\"` formatida qaytarsin. `calculate` dan foydalaning.",
      startingCode: "function calculate(a, op, b) {\n  switch (op) {\n    case \"+\": return a + b;\n    default: return \"Noma'lum amal\";\n  }\n}\nfunction describe(a, op, b) {\n  // backtick yozing\n}\n",
      hint: "const natija = calculate(a, op, b); return `${a} ${op} ${b} = ${natija}`;",
      test: "const fn = new Function(code + '; return describe;')();\nif (fn(5, \"+\", 3) === '5 + 3 = 8') return null;\nreturn 'Format: 5 + 3 = 8';"
    },
    {
      "id": 7,
      "title": "Validatsiya yadrosi",
      "instruction": "`isNumber(x)` funksiyasi `typeof x === \"number\"` bo'lsa `true`, aks holda `false` qaytarsin.",
      "startingCode": "function isNumber(x) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return typeof x === \"number\";",
      "test": "const fn = new Function(code + \"; return isNumber;\")();\nif (fn(5) === true && fn(\"5\") === false) return null;\nreturn \"typeof bilan tekshiring\";"
    },
    {
      "id": 8,
      "title": "Noto'g'ri qiymatlarni o'tkazib yuborish",
      "instruction": "`safeSum(numbers)` funksiyasi massivdagi faqat sonlarni qo'shib qaytarsin; matn qiymatlar e'tiborsiz qolsin (masalan, `[1, \"2\", 3]` uchun 4).",
      "startingCode": "function safeSum(numbers) {\n  // for + typeof bilan yozing\n}\n",
      "hint": "let jami = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  if (typeof numbers[i] === \"number\") {\n    jami += numbers[i];\n  }\n}\nreturn jami;",
      "test": "const fn = new Function(code + \"; return safeSum;\")();\nif (fn([1, \"2\", 3]) === 4 && fn([]) === 0) return null;\nreturn 'Faqat sonlar qo\\'shilishi kerak';"
    },
    {
      "id": 9,
      "title": "Qo'shimcha amal: foiz",
      "instruction": "`percentOf(total, foiz)` funksiyasi sonning berilgan foizini qaytarsin: `percentOf(200, 10)` => 20.",
      "startingCode": "function percentOf(total, foiz) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "return total * foiz / 100;",
      "test": "const fn = new Function(code + \"; return percentOf;\")();\nif (fn(200, 10) === 20 && fn(50, 0) === 0) return null;\nreturn \"200 ning 10 foizi 20 bo'lishi kerak\";"
    },
    {
      "id": 10,
      "title": "Chegara: natijani chiqarishga tayyorlash",
      "instruction": "`formatResult(natija)` funksiyasi: agar `natija` son bo'lmasa (masalan, xato xabari matni), uni o'zicha qaytarsin; son bo'lsa oldiga `\"Natija: \"` qo'shib qaytarsin.",
      "startingCode": "function formatResult(natija) {\n  // typeof bilan tekshiring\n}\n",
      "hint": "if (typeof natija !== \"number\") {\n  return natija;\n}\nreturn \"Natija: \" + natija;",
      "test": "const fn = new Function(code + \"; return formatResult;\")();\nif (fn(8) === \"Natija: 8\" && fn(\"Nolga bo'lib bo'lmaydi!\") === \"Nolga bo'lib bo'lmaydi!\") return null;\nreturn \"Xato matni va son uchun har xil natija kerak\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nega har funksiya bitta vazifa bajarishi kerak?",
      options: [
        "Kod qisqaradi",
        "Test qilish va o'zgartirish osonlashadi",
        "JavaScript talab qiladi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Modulli dizayn — professional tuzilish."
    },
    {
      id: 2,
      question: "Nolga bo'lish natijasi nima?",
      options: [
        "0",
        "Infinity — shuning uchun tekshirish kerak",
        "Xatolik avtomatik",
        "NaN har doim"
      ],
      correctAnswer: 1,
      explanation: "if (b === 0) bilan ushlab, xabar qaytarish kerak."
    },
    {
      id: 3,
      question: "`calculate` da nega switch ishlatiladi?",
      options: [
        "Tezroq ishlaydi",
        "Bitta qiymatning ko'p varianti bor",
        "if ishlamaydi",
        "Shart emas"
      ],
      correctAnswer: 1,
      explanation: "op ning bir nechta qiymati — switch tabiiy."
    },
    {
      id: 4,
      question: "`describe` funksiyasining vazifasi?",
      options: [
        "Hisoblash",
        "Natijani o'qilishi chiroyli matn qilib chiqarish",
        "Xatoni ushlash",
        "Sonlarni saqlash"
      ],
      correctAnswer: 1,
      explanation: "Chiqarish qatlami alohida bo'lishi kerak."
    },
    {
      id: 5,
      question: "Validatsiya nima?",
      options: [
        "Test yozish",
        "Kirimni tekshirish (tur, qiymat)",
        "Kodni chiroyli qilish",
        "Funksiya nomi"
      ],
      correctAnswer: 1,
      explanation: "Noto'g'ri kirimni erta ushlash."
    },
    {
      "id": 6,
      "question": "`describe(5, \"+\", 3)` qanday matn qaytaradi?",
      "options": [
        "8",
        "\"5 + 3 = 8\"",
        "\"Natija: 8\"",
        "\"5+3\""
      ],
      "correctAnswer": 1,
      "explanation": "describe natijani o'qiladigan matn ko'rinishida yasaydi."
    },
    {
      "id": 7,
      "question": "Validatsiya qachon bajarilishi kerak?",
      "options": [
        "Hisoblashdan keyin",
        "Hisoblashdan oldin",
        "Faqat xato chiqqanda",
        "Faqat oxirgi qadamda"
      ],
      "correctAnswer": 1,
      "explanation": "Noto'g'ri kirimni erta ushlash — hisoblashdan oldin tekshirish."
    },
    {
      "id": 8,
      "question": "`switch` ichidagi `default` nima uchun kerak?",
      "options": [
        "Kod tezroq ishlashi uchun",
        "Hech bir case mos kelmagan holat uchun javob berish uchun",
        "switch ni tugatish uchun",
        "Sonlarni yumaloqlash uchun"
      ],
      "correctAnswer": 1,
      "explanation": "Noma'lum amal kelganda default tushunarli xabar qaytaradi."
    },
    {
      "id": 9,
      "question": "Modulli dizaynning asosiy foydasi nima?",
      "options": [
        "Kod kamroq joy egallaydi",
        "Bitta funksiyani o'zgartirganda qolganlari ishlayveradi",
        "Dastur tezroq ishga tushadi",
        "Xato umuman bo'lmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Kichik mustaqil funksiyalar mustaqil test qilinadi va o'zgartiriladi."
    },
    {
      "id": 10,
      "question": "Buyruq topilmasa `undefined` o'rniga nima qaytarish yaxshi?",
      "options": [
        "Hech narsa qaytarmaslik",
        "Aniq xato xabari matni (masalan, \"Noma'lum amal\")",
        "0",
        "Bo'sh massiv"
      ],
      "correctAnswer": 1,
      "explanation": "Aniq matn foydalanuvchiga nima bo'lganini tushuntiradi."
    },
    {
      "id": 11,
      "question": "`typeof a !== \"number\"` sharti nimani bildiradi?",
      "options": [
        "a son emas",
        "a son",
        "a undefined",
        "a bo'sh matn"
      ],
      "correctAnswer": 0,
      "explanation": "Shart a qiymatining turi number emasligini tekshiradi."
    },
    {
      "id": 12,
      "question": "Kalkulyator yadrosini ko'rinish (interfeys) dan ajratib yozish nega foydali?",
      "options": [
        "Kod chiroyli ko'rinadi",
        "Yadroni mustaqil sinab ko'rish va qayta ishlatish mumkin",
        "JavaScript shuni talab qiladi",
        "Fayl hajmi kichrayadi"
      ],
      "correctAnswer": 1,
      "explanation": "Mantiq alohida bo'lsa, uni konsolda ham, keyin ko'rinishda ham bir xil ishlatish mumkin."
    }
  ]
};
