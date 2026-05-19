export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)",
  theory: `## JS Cheat Sheet: Hammasi bir joyda! 🚀

**NEGA:** Dasturlashni o'rganayotganda hamma narsani yodda saqlash qiyin. Bu ma'lumotnoma — sizning "shpargalkangiz". Bu yerda JavaScript-ning eng muhim qismlari jamlangan.

---

### 1. Asoslar va O'zgaruvchilar
JavaScript-ni HTML-ga qo'shish:
\`\`\`html
<script src="script.js"></script>
\`\`\`

**O'zgaruvchilar:**
- \`let\` — o'zgaradigan qiymatlar uchun (zamonaviy).
- \`const\` — o'zgarmas (konstanta) qiymatlar uchun.
- \`var\` — eski usul, asosan ishlatilmaydi.

**Ma'lumot turlari:**
- \`Number\`: \`23\`, \`3.14\`
- \`String\`: \`"Salom"\`, \`'Dunyo'\`
- \`Boolean\`: \`true\`, \`false\`
- \`Object\`: \`{name: "Ali", age: 20}\`
- \`Array\`: \`[1, 2, 3]\`
- \`typeof null\`: \`"object"\` (JS xatosi, intervyuda so'raladi!)
- \`typeof NaN\`: \`"number"\` (NaN - "Son emas", lekin turi son)

---

### 2. Operatorlar (Hisob-kitob)
- **Arifmetik:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (qoldiq), \`++\` (1 qo'shish), \`--\` (1 ayirish).
- **Solishtirish:** \`==\` (qiymat), \`===\` (qiymat va tur), \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
- **Mantiqiy:** \`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS).

---

### 3. Satrlar (Strings) bilan ishlash
- \`str.length\` — uzunligi.
- \`str.indexOf("matn")\` — qidirish.
- \`str.slice(start, end)\` — kesib olish.
- \`str.replace("eski", "yangi")\` — almashtirish.
- \`str.toUpperCase()\` / \`str.toLowerCase()\` — harf shakli.

---

### 4. Massivlar (Arrays)
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Nok"];
\`\`\`
- \`push("Gilos")\` — oxiriga qo'shish.
- \`pop()\` — oxiridan o'chirish.
- \`shift()\` — boshidan o'chirish.
- \`unshift("Uzum")\` — boshiga qo'shish.
- \`join(", ")\` — matnga aylantirish.
- \`sort()\` — alifbo bo'yicha saralash.

---

### 5. Funksiyalar va Shartlar
**Shartlar:**
\`\`\`javascript
if (yosh >= 18) {
  console.log("Ruxsat");
} else {
  console.log("Taqiq");
}
\`\`\`

**Funksiya:**
\`\`\`javascript
function kvadrat(son) {
  return son * son;
}
// Arrow function:
const kvadrat = (son) => son * son;
\`\`\`

---

### 6. Sikllar (Loops)
- \`for\` — ma'lum marta takrorlash uchun.
- \`while\` — shart bajarilguncha.
- \`do while\` — kamida bir marta ishlaydi.
- \`break\` — siklni to'xtatish.
- \`continue\` — bitta qadamni tashlab o'tish.

---

### 7. Math (Matematika) va Sana
- \`Math.random()\` — 0 va 1 oralig'ida tasodifiy son.
- \`Math.floor(x)\` — pastga yaxlitlash.
- \`Math.ceil(x)\` — tepaga yaxlitlash.
- \`Math.round(x)\` — eng yaqin songa yaxlitlash.
- \`new Date()\` — hozirgi vaqtni olish.

---

### 8. DOM (Veb-sahifa bilan ishlash)
- \`document.getElementById("id")\` — elementni olish.
- \`document.querySelector(".class")\` — tanlab olish.
- \`element.innerHTML = "Yangi matn"\` — ichidagi matnni o'zgartirish.
- \`element.style.color = "red"\` — rangini o'zgartirish.

---

### 9. Hodisalar (Events)
- \`onclick\` — chertilganda.
- \`onmouseover\` — sichqoncha ustiga kelganda.
- \`onkeydown\` — klavish bosilganda.
- \`onload\` — sahifa yuklanganda.

---

### 10. Xatolar (Errors)
\`\`\`javascript
try {
  // xavfli kod
} catch (err) {
  console.log("Xato yuz berdi: " + err.message);
} finally {
  // baribir ishlaydi
}
\`\`\`

---

### 11. SAVOLLAR (12 ta)
1. \`const\` bilan e'lon qilingan massivga yangi element qo'shsa bo'ladimi?
2. \`Math.random()\` 1 sonini qaytara oladimi?
3. \`"5" + 2\` natijasi nima?
4. \`"5" - 2\` natijasi nima?
5. \`alert()\` va \`confirm()\` farqi nima?
6. \`null\` va \`undefined\` farqi nima?
7. \`push()\` massivning qayeriga ma'lumot qo'shadi?
8. \`slice()\` asl massivni o'zgartiradimi?
9. \`document.write()\` nima uchun xavfli bo'lishi mumkin?
10. \`try...catch\` nima uchun ishlatiladi?
11. \`==\` va \`===\` operatorlari o'rtasidagi farqni tushuntiring.
12. \`for\` siklining uchta qismini sanab bering.`,
  exercises: [
    {
      id: 1,
      title: "Massivlar bilan ishlash",
      instruction: "'mevalar' massiviga 'Olma' va 'Uzum' qo'shing, so'ngra 'Olma'ni o'chirib tashlang va natijani konsolga chiqaring.",
      startingCode: "const mevalar = [];\n// Bu yerga yozing\n",
      hint: "push() qo'shadi, shift() boshidan o'chiradi.",
      test: "if (logs.includes('Uzum') && !logs.includes('Olma')) return null; return 'Natija noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "Matematika",
      instruction: "0 dan 10 gacha bo'lgan tasodifiy butun son yaratuvchi kod yozing va konsolga chiqaring.",
      startingCode: "// Math.random va Math.floor ishlating\n",
      hint: "Math.floor(Math.random() * 11);",
      test: "const n = logs[0]; if (typeof n === 'number' && n >= 0 && n <= 10) return null; return '0-10 oralig\\'idagi son chiqishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`typeof null` natijasi JavaScript-da nima qaytaradi va bu nima deb hisoblanadi?",
      options: [
        "`\"null\"` (to'g'ri qiymat)",
        "`\"object\"` (JavaScript-dagi tarixiy/sintaktik xato)",
        "`\"undefined\"`",
        "`\"empty\"`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript birinchi marta yaratilayotganda qiymatlar 32-bitli tizimda saqlangan va null obyekt deb hisoblangan. Bu xato hozirda ham saqlanib qolgan, chunki uni to'g'irlash eski saytlar ishini buzishi mumkin."
    },
    {
      id: 2,
      question: "Quyidagi kod konsolda nima natija qaytaradi: `\"5\" + 2` va `\"5\" - 2`?",
      options: [
        "`7` va `3`",
        "`\"52\"` (string) va `3` (number)",
        "`\"52\"` va `\"5-2\"`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "`+` operatori satr (string) bilan kelganda konkatenatsiya (birlashtirish) qiladi, ya'ni `\"5\" + 2` natijasi `\"52\"` bo'ladi. `-` operatori esa matnni songa o'tkazib arifmetik amal bajaradi, shuning uchun `\"5\" - 2` natijasi `3` bo'ladi."
    },
    {
      id: 3,
      question: "`Math.random()` funksiyasi qanday sonlar oralig'ida tasodifiy qiymat qaytaradi?",
      options: [
        "0 va 1 oralig'ida (0 kiradi, 1 kirmaydi: `[0, 1)`)",
        "0 va 10 oralig'ida",
        "1 va 100 oralig'ida",
        "Faqat 0 yoki 1 butun sonini"
      ],
      correctAnswer: 0,
      explanation: "`Math.random()` 0 dan (shu jumladan) 1 gacha (lekin 1 o'zi kirmaydi) bo'lgan o'nli kasr sonlarni qaytaradi."
    },
    {
      id: 4,
      question: "`const` kalit so'zi yordamida yaratilgan massiv (Array) elementlarini o'zgartirish yoki unga element qo'shish mumkinmi?",
      options: [
        "Yo'q, const bilan yaratilgan massiv mutlaqo o'zgarmas bo'ladi va element qo'shib bo'lmaydi",
        "Ha, massiv xotiradagi havolasi (reference) o'zgarmaydi, lekin massiv tarkibiga `push` yoki indeks orqali yangi element qo'shish va qiymatlarni o'zgartirish mumkin",
        "Faqat `let` bilan yozilgan massivlarni o'zgartirish mumkin",
        "Faqat massiv uzunligini qisqartirish mumkin"
      ],
      correctAnswer: 1,
      explanation: "`const` massivni qaytadan boshqa massivga o'zlashtirishni taqiqlaydi (masalan: `mevalar = [...]`), lekin uning ichidagi qiymatlarni o'zgartirishga yoki element qo'shish/o'chirishga to'sqinlik qilmaydi."
    },
    {
      id: 5,
      question: "Massiv (Array) oxiriga yangi element qo'shish va massivning eng boshidan elementni o'chirish uchun qaysi metodlar juftligidan foydalaniladi?",
      options: [
        "`push()` va `pop()`",
        "`push()` va `shift()`",
        "`unshift()` va `shift()`",
        "`push()` va `unshift()`"
      ],
      correctAnswer: 1,
      explanation: "`push()` massiv oxiriga yangi element qo'shadi, `shift()` esa massivning birinchi elementini o'chirib yuboradi."
    }
  ]
};
