export const consoleMethods = {
  id: "consoleMethods",
  title: "Console Metodlari va DevTools",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Konsol nima?
**Konsol** — dasturchining "qoralama daftari". Kod ishlayotganda oraliq natijalarni ko'rish, xatolarni topish uchun ishlatiladigan maxsus panel. Brauzerda **F12** ni bossangiz ochiladi.

> **Bir jumlada:** \`console.log()\` — kod ichidan tashqariga "gapirish" usuli.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **oshpazsiz** va ovqat pishiryapsiz:
- **console.log()** — taomni vaqti-vaqti bilan tatib ko'rish (hammasi joyidami?)
- **console.warn()** — "tuz kamroqday" degan ogohlantirish (ish davom etadi)
- **console.error()** — "ovqat kuyib ketdi!" (jiddiy muammo, to'xtash kerak)

Tatib ko'rmasdan ovqat pishirib bo'lmaydi. \`console.log\` siz yozmasdan kodni tekshirib bo'lmaydi.

---

## 2. 💻 Asosiy Metodlar

### log — oddiy xabar
\`\`\`javascript
console.log("Salom!");
console.log(42);
console.log("Yosh:", 25);
\`\`\`

### warn — ogohlantirish (sariq)
\`\`\`javascript
console.warn("Diqqat! Parolingiz kuchsiz.");
\`\`\`

### error — xatolik (qizil)
\`\`\`javascript
console.error("Ulanish uzildi!");
\`\`\`

### table — jadval ko'rinishi
\`\`\`javascript
const talabalar = [
  { ism: "Ali", yosh: 20 },
  { ism: "Vali", yosh: 22 }
];
console.table(talabalar);
\`\`\`

Mashq maydonida \`console.table\` ni sinab ko'ring — natija pastdagi konsolda jadval bo'lib chiqadi!

---

## 3. ⚙️ Qanday Ishlaydi

\`console\` — brauzer sizga bepul beradigan tayyor **obyekt**. Uning ichida \`log\`, \`warn\`, \`error\`, \`table\` kabi tayyor **metodlar** (funksiyalar) bor:

\`\`\`mermaid
flowchart LR
    A["console"] --> B["log()"]
    A --> C["warn()"]
    A --> D["error()"]
    A --> E["table()"]
    B --> F["Konsolga chiqaradi"]
    C --> F
    D --> F
    E --> F
\`\`\`

E'tibor bering: \`console\` JavaScript tilining o'zi emas — uni **brauzer** beradi. Shuning uchun u "host API" deyiladi.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`consol.log(...)\` | \`console.log(...)\` | So'zda harf tushib qolgan — \`console\` to'liq yoziladi |
| \`console.log("natija": 5)\` | \`console.log("natija:", 5)\` | Bir nechta narsani vergul bilan ajrating |
| Tayyor kodda \`console.log\` qoldirish | Ish tugagach o'chirish | Keraksiz loglar dasturni sekinlashtiradi |

---

## 5. 🔑 Asosiy Atamalar

- **Konsol (console)** — natija va xatolar chiqadigan panel (F12)
- **Metod (method)** — obyekt ichidagi funksiya (\`log\`, \`warn\`, \`error\`)
- **Debugging** — xatoni topish va tuzatish jarayoni
- **Log darajasi** — xabar turi: oddiy (\`log\`), ogohlantirish (\`warn\`), xato (\`error\`)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Sayt ishlamay qolganda** — dasturchi konsolni ochib qizil xatolarni o'qiydi
- **Hisob-kitob tekshirishda** — oraliq natijalarni \`log\` bilan ko'radi
- **Ma'lumotni solishtirishda** — ro'yxatlarni \`table\` bilan jadval qiladi

---

## 6.5. 🚀 Pro daraja: Konsolning kuchli metodlari

### console.count — chaqiruv hisoblagichi
Bir funksiya necha marta chaqirilganini sanash uchun (debugging da juda qulay):

    function tugmaBosildi() {
      console.count("Tugma"); // Tugma: 1, Tugma: 2, Tugma: 3...
    }

### console.time / console.timeEnd — kod tezligini olchash
Kod bolagi qancha vaqt olishini aniq olchaydi (performance profiling):

    console.time("hisoblash");
    let sum = 0;
    for (let i = 0; i < 1000000; i++) sum += i;
    console.timeEnd("hisoblash"); // hisoblash: 3.21ms

### console.group — loglarni guruhlash
Bog'liq loglarni ichma-ich kollaps qilinadigan guruhlarga jiglaydi:

    console.group("Foydalanuvchi");
    console.log("Ism: Ali");
    console.log("Yosh: 20");
    console.groupEnd();

### console.assert — shart tekshiruvchi log
Shart FALSE bo'lsa xabar chiqadi, true bo'lsa jim turadi:

    console.assert(yosh >= 18, "Yosh 18 dan kichik!");

### console.trace — chaqiruv zanjirini korish
"Bu kodga qanday kelindi?" degan savolga javob beradi — ichma-ich chaqiruvlar ro'yxatini chop etadi:

    function ichki() { console.trace("Keldim"); }
    function tashqi() { ichki(); }
    tashqi(); // tashqi -> ichki zanjiri chiqadi

### console.dir — obyekt tuzilmasini interaktiv korish
DOM elementlar yoki murakkab obyektlarning ichki tuzilishini daraxt korinishida ochadi:

    console.dir(document.body);

### %c bilan loglarga stil berish
Katta loyihalarda muhim loglarni ajratib korish uchun CSS stilini berish mumkin:

    console.log("%c MUHIM! ", "background: red; color: white; font-weight: bold;");

Bu metodlarni tepadagi mashq maydonida sinab koring — hammasi ishlaydi!

## 7. 🎙 Intervyu Savollari

**1. \`console.log\` va \`console.error\` farqi nima?**
**Javob:** Ikkisi ham chop etadi, lekin \`error\` qizil rangda va "xatolik" sifatida belgilanadi — filtrlash oson bo'ladi.

**2. \`console.table\` qachon foydali?**
**Javob:** Obyektlar ro'yxatini solishtirish kerak bo'lganda — jadval ko'rinishi oddiy matndan ancha o'qilishi oson.

**3. Tayyor sayt kodida \`console.log\` qoldirish mumkinmi?**
**Javob:** Yo'q — keraksiz loglar sekinlashtiradi va ichki ma'lumotni oshkor qiladi. Ish tugagach o'chiriladi.

---

## 8. ✅ Xulosa

- **Konsol** — dasturchining ko'zi: \`log\` (oddiy), \`warn\` (sariq), \`error\` (qizil), \`table\` (jadval)
- **F12** — brauzerda konsolni ochish tugmasi
- **Keyingi qadam:** 1.3-darsda ma'lumot saqlaydigan "qutilar" — o'zgaruvchilarni o'rganamiz
`,
  exercises: [
  {
    "id": 1,
    "title": "Oddiy xabar",
    "instruction": "Konsolga `Men JavaScript o'rganyapman!` matnini `console.log` bilan chop eting.",
    "startingCode": "// console.log bilan xabar chop eting\n",
    "hint": "console.log(\"Men JavaScript o'rganyapman!\");",
    "test": "if (!code.includes('console.log')) return 'console.log ishlatilmadi';"
  },
  {
    "id": 2,
    "title": "Son va matn birga",
    "instruction": "`showInfo()` funksiyasini yozing. U `Yosh: 20` matnini konsolga chop etsin (qaytarish shart emas, faqat chop etish).",
    "startingCode": "function showInfo() {\n  // console.log yozing\n}\n",
    "hint": "console.log(\"Yosh:\", 20);",
    "test": "const fn = new Function(code + '; return showInfo;')();\nlet out = [];\nconst orig = console.log;\nconsole.log = (...a) => out.push(a.join(' '));\ntry { fn(); } finally { console.log = orig; }\nif (out.join(' ').includes('20')) return null;\nreturn 'Konsolga 20 soni chop etilmadi';"
  },
  {
    "id": 3,
    "title": "Ogohlantirish",
    "instruction": "`checkPassword(quvvat)` funksiyasini yozing. Agar `quvvat` 5 dan kichik bo'lsa, `console.warn` bilan `Parol kuchsiz!` deb ogohlantiring.",
    "startingCode": "function checkPassword(quvvat) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "if (quvvat < 5) console.warn(\"Parol kuchsiz!\");",
    "test": "const fn = new Function(code + '; return checkPassword;')();\nlet warned = false;\nconst orig = console.warn;\nconsole.warn = () => { warned = true; };\ntry { fn(3); } finally { console.warn = orig; }\nif (warned) return null;\nreturn 'quvvat=3 da console.warn chaqirilmadi';"
  },
  {
    "id": 4,
    "title": "Xatolik xabari",
    "instruction": "`connect(ulangan)` funksiyasini yozing. Agar `ulangan` false bo'lsa, `console.error` bilan `Ulanish uzildi!` deb xabar bering.",
    "startingCode": "function connect(ulangan) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "if (!ulangan) console.error(\"Ulanish uzildi!\");",
    "test": "const fn = new Function(code + '; return connect;')();\nlet erred = false;\nconst orig = console.error;\nconsole.error = () => { erred = true; };\ntry { fn(false); } finally { console.error = orig; }\nif (erred) return null;\nreturn 'ulangan=false da console.error chaqirilmadi';"
  },
  {
    "id": 5,
    "title": "Yig'indini ko'rsatish",
    "instruction": "`printSum(a, b)` funksiyasini yozing. U yig'indini hisoblab, konsolga chop etsin. Masalan: printSum(3, 4) => konsolda 7 chiqsin.",
    "startingCode": "function printSum(a, b) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "console.log(a + b);",
    "test": "const fn = new Function(code + '; return printSum;')();\nlet out = [];\nconst orig = console.log;\nconsole.log = (...a) => out.push(a.join(' '));\ntry { fn(3, 4); } finally { console.log = orig; }\nif (out.join(' ').includes('7')) return null;\nreturn 'Konsolda 7 chiqishi kerak edi';"
  },
  {
    "id": 6,
    "title": "Jadval chiqarish",
    "instruction": "`showStudents()` funksiyasini yozing. Ichida 2 ta talaba obyektidan iborat massiv yarating va uni `console.table` bilan chop eting.",
    "startingCode": "function showStudents() {\n  // Massiv yarating va console.table qiling\n}\n",
    "hint": "const arr = [{ ism: \"Ali\" }, { ism: \"Vali\" }]; console.table(arr);",
    "test": "if (!code.includes('console.table')) return 'console.table ishlatilmadi';\nconst fn = new Function(code + '; return showStudents;')();\nlet called = false;\nconst orig = console.table;\nconsole.table = () => { called = true; };\ntry { fn(); } finally { console.table = orig; }\nif (called) return null;\nreturn 'console.table chaqirilmadi';"
  },
  {
    "id": 7,
    "title": "Hisoblagich (console.count)",
    "instruction": "countCalls(n) funksiyasini yozing: u console.count('chaqiruv') ni n marta chaqirsin. Bu bir funksiya necha marta ishlaganini sanash uchun pro usul!",
    "startingCode": "function countCalls(n) {\n  // console.count bilan n marta sanang\n}\n",
    "hint": "for (let i = 0; i < n; i++) console.count('chaqiruv');",
    "test": "if (!code.includes('console.count')) return 'console.count ishlatilmadi';\nconst fn = new Function(code + '; return countCalls;')();\nlet count = 0, label = '';\nconst orig = console.count;\nconsole.count = (l) => { count++; label = l; };\ntry { fn(3); } finally { console.count = orig; }\nif (count !== 3) return 'console.count 3 marta chaqirilishi kerak, keldi: ' + count;\nif (label !== 'chaqiruv') return 'Label chaqiruv bolishi kerak';\nreturn null;"
  },
  {
    "id": 8,
    "title": "Vaqt olchash (console.time/timeEnd)",
    "instruction": "timeLoop() funksiyasini yozing: u console.time('tsikl') bilan taymerni ishga tushirsin, 1 dan 100 gacha sonlar yig'indisini hisoblab (oddiy for tsikl), so'ng console.timeEnd('tsikl') bilan yakunlasin. Yig'indini ham qaytarsin!",
    "startingCode": "function timeLoop() {\n  // 1) console.time('tsikl')\n  // 2) 1..100 yig'indisini hisoblang\n  // 3) console.timeEnd('tsikl')\n  // 4) yig'indini qaytaring (5050)\n}\n",
    "hint": "console.time('tsikl'); let sum = 0; for (let i = 1; i <= 100; i++) sum += i; console.timeEnd('tsikl'); return sum;",
    "test": "if (!code.includes('console.time') || !code.includes('console.timeEnd')) return 'console.time va timeEnd ikkalasi ham ishlatilishi kerak';\nconst fn = new Function(code + '; return timeLoop;')();\nconst calls = [];\nconsole.time = (l) => calls.push('start:' + l);\nconsole.timeEnd = (l) => calls.push('end:' + l);\ntry { var result = fn(); } finally { delete console.time; delete console.timeEnd; }\nif (result !== 5050) return 'Yigindi 5050 bolishi kerak, keldi: ' + result;\nif (calls[0] !== 'start:tsikl' || calls[1] !== 'end:tsikl') return 'time va timeEnd tartibi yoki labeli notogri: ' + calls.join(',');\nreturn null;"
  }
],

  quizzes: [
    {
      id: 1,
      question: "Brauzerda konsolni qaysi tugma bilan ochamiz?",
      options: [
        "F1",
        "F12",
        "Esc",
        "Tab"
      ],
      correctAnswer: 1,
      explanation: "F12 — dasturchi panelini (shu jumladan konsolni) ochadi."
    },
    {
      id: 2,
      question: "`console.warn` oddiy `console.log` dan nimasi bilan farq qiladi?",
      options: [
        "Hech qanday farqi yo'q",
        "Sariq rangda ogohlantirish sifatida chiqadi",
        "Kompyuterni o'chiradi",
        "Faqat sonlarni chop etadi"
      ],
      correctAnswer: 1,
      explanation: "warn — sariq ogohlantirish, log — oddiy xabar."
    },
    {
      id: 3,
      question: "Qizil rangda xatolik chiqarish uchun qaysi metod?",
      options: [
        "console.log",
        "console.warn",
        "console.error",
        "console.table"
      ],
      correctAnswer: 2,
      explanation: "console.error xatolarni qizil rangda belgilaydi."
    },
    {
      id: 4,
      question: "`console.table` nima uchun qulay?",
      options: [
        "Musiqa chalish uchun",
        "Obyektlar ro'yxatini jadval ko'rinishida solishtirish uchun",
        "Internet tezligini oshirish uchun",
        "Rasm chizish uchun"
      ],
      correctAnswer: 1,
      explanation: "table massiv va obyektlarni jadval qilib chiqaradi."
    },
    {
      id: 5,
      question: "Quyidagi kod konsolga nimani chiqaradi?\n```javascript\nconsole.log(\"Natija:\", 2 + 3);\n```",
      options: [
        "\"Natija: 5\"",
        "\"Natija: 2 + 3\"",
        "\"Natija:\"",
        "Xatolik"
      ],
      correctAnswer: 0,
      explanation: "Avval 2 + 3 = 5 hisoblanadi, keyin \"Natija: 5\" chop etiladi."
    },
    {
      id: 6,
      question: "Tayyor sayt kodida `console.log` qoldirish haqida qaysi fikr to'g'ri?",
      options: [
        "Qoldirish kerak — sayt tezlashadi",
        "Qoldirish mumkin emas — sekinlashtiradi va ichki ma'lumotni oshkor qiladi",
        "Faqat yakshanba kunlari o'chiriladi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Ish tugagach keraksiz loglar o'chiriladi."
    }
  ]

};
