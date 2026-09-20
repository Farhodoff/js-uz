export const globalObjectsCheatSheet = {
  id: "globalObjectsCheatSheet",
  title: "⚡ Global Obyektlar Cheat Sheet (Math, Date, Set, Map, Window, Document)",
  language: "javascript",
  theory: `## 1. 💡 Bu Dars Nima Uchun?

Bu — **ma'lumotnoma**. 2.14 darsida global obyektlarni chuqur o'rgandingiz; endi hammasi bir sahifada, ixcham jadval holida. Yodlash shart emas — kerak payt ochib qaraysiz.

> **Maslahat:** bu sahifani xatcho'pga qo'shing — kundalik ishda eng ko'p murojaat qiladigan sahifangiz bo'ladi.

---

## 2. 🧮 Math — matematika (konstruktor emas!)

| Metod | Natija | Izoh |
|---|---|---|
| \`Math.PI\` | 3.14159... | property, qavs yo'q |
| \`Math.round(4.5)\` | 5 | eng yaqin yaxlitlash (.5 → yuqoriga) |
| \`Math.floor(4.9)\` | 4 | pastga |
| \`Math.ceil(4.1)\` | 5 | yuqoriga |
| \`Math.trunc(-4.9)\` | -4 | kasrni olib tashlaydi |
| \`Math.abs(-7)\` | 7 | modul |
| \`Math.max(1, 9, 3)\` | 9 | eng katta |
| \`Math.min(1, 9, 3)\` | 1 | eng kichik |
| \`Math.pow(2, 10)\` | 1024 | daraja (\`2 ** 10\` bilan bir xil) |
| \`Math.sqrt(16)\` | 4 | kvadrat ildiz |
| \`Math.random()\` | 0 ≤ x < 1 | tasodifiy (xavfsizlik uchun EMAS!) |
| \`Math.sign(-5)\` | -1 | ishorasi: -1 / 0 / 1 |
| \`Math.hypot(3, 4)\` | 5 | √(3² + 4²) |

\`\`\`javascript
// Eng ko'p ishlatiladigan 2 ta recipe:
Math.floor(Math.random() * (max - min + 1)) + min; // min..max butun son
Math.max(...arr); // massivdagi eng kattasi (spread shart!)
\`\`\`

---

## 3. 📅 Date — sana va vaqt

**Yaratish:**

\`\`\`javascript
new Date();                    // hozirgi lahzа
new Date("2026-09-19");        // ISO string'dan
new Date(2026, 8, 19);         // YIL, OY (0-bazali!), KUN — 8 = SENTABR
new Date(1758240000000);       // timestamp (ms)
Date.now();                    // hozirgi timestamp — eng tez
\`\`\`

**O'qish (get):**

| Metod | Qaytaradi | Eslatma |
|---|---|---|
| \`getFullYear()\` | 2026 | to'liq yil |
| \`getMonth()\` | 0..11 | ⚠️ 0 = yanvar! |
| \`getDate()\` | 1..31 | oy kuni |
| \`getDay()\` | 0..6 | hafta kuni, 0 = yakshanba |
| \`getHours()\` / \`getMinutes()\` / \`getSeconds()\` | ... | vaqt qismlari |
| \`getTime()\` | ms | 1970.1.1 dan beri |

**Yozish (set):** \`setMonth()\`, \`setDate()\`, \`setHours()\`... — ⚠️ Date MUTABLE, asl obyektni o'zgartiradi!

**Formatlash:**

\`\`\`javascript
d.toISOString();                          // "2026-09-19T10:30:00.000Z"
d.toLocaleDateString("uz-UZ");            // mahalliy format
\`\`\`

**Vaqt farqi (kunlar hisoblash):**

\`\`\`javascript
const diff = (a, b) => Math.round(Math.abs(a - b) / 86400000);
\`\`\`

---

## 4. 🎯 Set — unikal qiymatlar

\`\`\`javascript
const s = new Set([1, 2, 2, 3]); // {1, 2, 3}
s.add(4);        // qo'shish (chained ham bo'ladi)
s.has(2);        // true — O(1)!
s.delete(1);     // o'chirish
s.size;          // 3
s.clear();       // hammasini tozalash
[...s];          // massivga aylantirish
\`\`\`

**Top recipes:**

\`\`\`javascript
const uniq = [...new Set(arr)];                    // takrorlarni olib tashlash
const inAOnly = [...setA].filter(x => !setB.has(x)); // farq (A - B)
const common = [...setA].filter(x => setB.has(x));   // kesishma
\`\`\`

⚠️ Set obyektlarni **referens** bo'yicha solishtiradi: \`set.add({id:1}); set.add({id:1})\` → 2 ta element!

---

## 5. 🗺️ Map — kalit → qiymat (kalit istalgan tur!)

\`\`\`javascript
const m = new Map();
m.set("ali", 25);      // qo'shish/yantralash
m.set(1, "son kalit"); // 1 va "1" — HAR XIL kalitlar!
m.get("ali");          // 25
m.has(1);              // true — O(1)
m.delete("ali");
m.size;                // O(1) — Object.keys'dan tez

for (const [key, val] of m) { }        // iteratsiya
Object.fromEntries(m);                 // Map → oddiy obyekt
new Map(Object.entries(obj));          // obyekt → Map
\`\`\`

**Qachon Map, qachon obyekt?**

| | Obyekt | Map |
|---|---|---|
| Kalit turi | string/symbol | istalgan |
| O'lcham | \`Object.keys(o).length\` | \`m.size\` |
| Iteratsiya | \`Object.entries()\` kerak | to'g'ridan-to'g'ri |
| JSON | ✅ tabiiy | ❌ qo'lda |
| chastotali qo'shish/o'chirish | sekinroq | optimallashtirilgan |

---

## 6. 🔄 JSON — serializatsiya

\`\`\`javascript
JSON.stringify({ a: 1 });          // '{"a":1}'
JSON.stringify(obj, null, 2);      // chiroyli indent
JSON.parse('{"a":1}');             // obyektga qaytarish

// ⚠️ parse xato tashlaydi — har doim try/catch:
try {
  const data = JSON.parse(raw);
} catch { /* buzuq JSON */ }

// localStorage bilan juftlik:
localStorage.setItem("key", JSON.stringify(obj));
JSON.parse(localStorage.getItem("key"));
\`\`\`

⚠️ \`stringify\` cheklovlari: \`undefined\`, funksiya, \`Symbol\` — tashlab yuboriladi; \`Date\` → ISO string; \`Map/Set\` → \`{}\`; siklik referens → xato.

---

## 7. 🌍 globalThis — universal global obyekt

| Muhit | Global nomi |
|---|---|
| Brauzer | \`window\` / \`globalThis\` |
| Web Worker | \`self\` / \`globalThis\` (window YO'Q) |
| Node.js | \`global\` / \`globalThis\` |

\`\`\`javascript
typeof globalThis; // "object" — har qanday muhitda
\`\`\`

---

## 8. 🪟 Window — brauzer oynasi (BOM)

\`\`\`javascript
window.innerWidth / innerHeight;   // oyna o'lchami
window.location.href;              // URL (assign() — yo'naltirish)
window.navigator.userAgent;        // brauzer ma'lumoti
window.history.back();             // orqaga
window.localStorage;               // saqlash
window.scrollTo(0, 0);             // tepaga scroll
window.alert("x"); confirm("?"); prompt("ism");  // modal oynalar
window.open("https://...");        // yangi oyna/tab
setTimeout(fn, 1000);              // window. yozmasdan ham ishlaydi
\`\`\`

⚠️ \`var\` va \`function\` global'da e'lon qilinsa window'ga osiladi; \`let/const\` osilmaydi.

---

## 9. 📄 Document — sahifa mazmuni (DOM)

\`\`\`javascript
document.title;                      // <title>
document.body;                       // <body>
document.getElementById("root");     // ✅ eng tez
document.querySelector(".card");     // birinchi mos (CSS selector)
document.querySelectorAll("li");     // BARCHA mos — statik NodeList
document.createElement("div");       // yangi element
el.closest(".parent");               // eng yaqin otadan mosini topish
\`\`\`

⚠️ \`getElementsByTagName\` — **jonli (live)** HTMLCollection qaytaradi; \`querySelectorAll\` — **statik** NodeList. Subtle bug'lar manbai!

---

## 10. 🧯 Tez tuzoqlar jadvali

| Tuzoq | To'g'ri yo'l |
|---|---|
| \`new Date(2026, 5, 1)\` → "iyun" deb kutish | Oy 0-bazali: 5 = iyun |
| \`Math.random()\` dan token yasash | \`crypto.getRandomValues()\` |
| \`new Math()\` | Math konstruktor emas |
| Set'da obyekt takrori kutilmagan holda qo'shilyapti | referens solishtirish — id bilan Map ishlating |
| \`JSON.parse\` try/catch'siz | buzuq JSON — bevosita crash |
| \`window\`'ga Worker'da murojaat | \`self\` / \`globalThis\` ishlating |
| \`arr.includes\` katta massivda tsiklda | bir marta \`new Set(arr)\`, keyin \`has()\` |
| Map'ni \`JSON.stringify\` qilish | avval \`Object.fromEntries(map)\` |
`,
  exercises: [
    {
      id: 1,
      title: "Math: yaxlitlash uchligi",
      instruction: "`round3(n)` funksiyasini yozing — [floor, round, ceil] massivini qaytarsin (n = 4.5 uchun [4, 5, 5]).",
      startingCode: "function round3(n) {\n  // Math.floor, Math.round, Math.ceil\n}",
      hint: "return [Math.floor(n), Math.round(n), Math.ceil(n)];",
      test: "const fn = new Function(code + '; return JSON.stringify(round3(4.5));'); if (fn() === JSON.stringify([4, 5, 5])) return null; return 'Uchta yaxlitlash metodini to\\'g\\'ri tartibda qaytaring';"
    },
    {
      id: 2,
      title: "Date: hafta kuni nomi",
      instruction: "`weekdayName(d)` funksiyasini yozing — getDay() va massiv yordamida 'Yakshanba'...'Shanba' qaytarsin (0 = Yakshanba).",
      startingCode: "function weekdayName(d) {\n  const names = [/* to'ldiring */];\n  // getDay() bilan qaytaring\n}",
      hint: "const names = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']; return names[d.getDay()];",
      test: "const fn = new Function(code + '; return weekdayName(new Date(2026, 8, 20));'); if (fn() === 'Yakshanba') return null; return 'getDay() 0=yakshanba ekanini hisobga oling';"
    },
    {
      id: 3,
      title: "Set: ikki massiv birlashmasi",
      instruction: "`union(a, b)` funksiyasini yozing — Set yordamida ikkala massivning barcha unikal elementlarini qaytarsin.",
      startingCode: "function union(a, b) {\n  // Set bilan birlashtiring\n}",
      hint: "return [...new Set([...a, ...b])];",
      test: "const fn = new Function(code + '; return JSON.stringify(union([1, 2], [2, 3]));'); if (fn() === JSON.stringify([1, 2, 3])) return null; return 'Spread bilan ikkala massivni bitta Setga bering';"
    },
    {
      id: 4,
      title: "Map: obyektga aylantirish",
      instruction: "`mapToObj(map)` funksiyasini yozing — Map'ni oddiy obyektga aylantirsin (Object.fromEntries ishlating).",
      startingCode: "function mapToObj(map) {\n  // Object.fromEntries\n}",
      hint: "return Object.fromEntries(map);",
      test: "const fn = new Function(code + '; return JSON.stringify(mapToObj(new Map([[\\'a\\', 1]])));'); if (fn() === JSON.stringify({ a: 1 })) return null; return 'Object.fromEntries(map) ni qaytaring';"
    },
    {
      id: 5,
      title: "JSON: xavfsiz parse",
      instruction: "`safeParse(str)` funksiyasini yozing — JSON.parse'ni try/catch bilan o'rash: muvaffaqiyatda obyektni, xatoda null qaytarsin.",
      startingCode: "function safeParse(str) {\n  // try/catch\n}",
      hint: "try { return JSON.parse(str); } catch { return null; }",
      test: "const fn = new Function(code + '; return [safeParse(\\'{\"a\":1}\\').a, safeParse(\\'nope\\')];'); const r = fn(); if (r && r[0] === 1 && r[1] === null) return null; return 'Xato holatda null qaytarishi kerak';"
    },
    {
      id: 6,
      title: "globalThis: universal o'qish",
      instruction: "`getGlobal(key, fallback)` funksiyasini yozing — globalThis'da key bo'lsa qiymatini, bo'lmasa fallback qaytarsin.",
      startingCode: "function getGlobal(key, fallback) {\n  // globalThis bilan ishlang\n}",
      hint: "return key in globalThis ? globalThis[key] : fallback;",
      test: "const fn = new Function(code + '; return [getGlobal(\\'Math\\') !== undefined, getGlobal(\\'yoqGlobalNarsa\\', \\'def\\')];'); const r = fn(); if (r && r[0] === true && r[1] === 'def') return null; return 'globalThis ichida in bilan tekshirib, qiymat yoki fallback qaytaring';"
    },
    {
      id: 7,
      title: "Date: kunlar farqi",
      instruction: "`daysBetween(a, b)` funksiyasini yozing — ikki Date orasidagi kunlar sonini (modul bilan) qaytarsin.",
      startingCode: "function daysBetween(a, b) {\n  // timestamp farqi / 86400000\n}",
      hint: "return Math.round(Math.abs(a - b) / 86400000);",
      test: "const fn = new Function(code + '; return daysBetween(new Date(2026, 0, 1), new Date(2026, 0, 11));'); if (fn() === 10) return null; return 'Date ayirmasi millisekund — 86400000 ga bo\\'ling';"
    },
    {
      id: 8,
      title: "Mini stats (Math + massiv)",
      instruction: "`stats(arr)` funksiyasini yozing — { min, max, avg } obyektini qaytarsin (avg — Math.round bilan butun son).",
      startingCode: "function stats(arr) {\n  // Math.min, Math.max, o'rtacha\n}",
      hint: "const sum = arr.reduce((s, x) => s + x, 0); return { min: Math.min(...arr), max: Math.max(...arr), avg: Math.round(sum / arr.length) };",
      test: "const fn = new Function(code + '; const s = stats([2, 4, 6]); return s.min + \\'-\\' + s.max + \\'-\\' + s.avg;'); if (fn() === '2-6-4') return null; return 'min, max va yaxlitlangan o\\'rtachani obyekt sifatida qaytaring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi ikkisi konstruktor emas?",
      options: ["Date va Set", "Math va JSON", "Map va Date", "Set va Math"],
      correctAnswer: 1,
      explanation: "Math va JSON — statik metod konteyneri, new bilan ishlamaydi."
    },
    {
      id: 2,
      question: "new Date(2026, 3, 10) qaysi oy?",
      options: ["Mart", "Aprel", "May", "Yanvar"],
      correctAnswer: 1,
      explanation: "Oy 0-bazali: 3 = aprel (0 = yanvar)."
    },
    {
      id: 3,
      question: "Massivdagi takrorlarni olib tashlashning eng qisqa idiomasi?",
      options: ["arr.filter(x => x)", "[...new Set(arr)]", "arr.map(x => x)", "JSON.parse(JSON.stringify(arr))"],
      correctAnswer: 1,
      explanation: "Set unikal qiymatlar saqlaydi — spread bilan massivga qaytariladi."
    },
    {
      id: 4,
      question: "Mapda 1 (son) va '1' (string) kalitlar?",
      options: ["Bir xil kalit hisoblanadi", "Har xil kalitlar — ikkala yozuv saqlanadi", "Xato beradi", "Son kalit stringga aylanadi"],
      correctAnswer: 1,
      explanation: "Map kalitlarni turning hamda referens bo'yicha ajratadi — obyektdan farqi shu."
    },
    {
      id: 5,
      question: "Web Worker ichida global obyekt nomi?",
      options: ["window", "document", "self", "navigator"],
      correctAnswer: 2,
      explanation: "Worker'da window yo'q — self (yoki globalThis) ishlatiladi."
    },
    {
      id: 6,
      question: "getElementsByTagName qaytaradigan kolleksiya qanday?",
      options: ["Statik", "Jonli (live) — DOM bilan yangilanadi", "Promise qaytaradi", "Faqat bitta element"],
      correctAnswer: 1,
      explanation: "HTMLCollection jonli; querySelectorAll statik NodeList qaytaradi."
    },
    {
      id: 7,
      question: "JSON.stringify(new Map([[1, 'a']])) natijasi?",
      options: ["'{\"1\":\"a\"}'", "'{}'", "'[[1,\"a\"]]'", "Xato beradi"],
      correctAnswer: 1,
      explanation: "Map'ni stringify bo'sh obyekt qiladi — avval Object.fromEntries kerak."
    },
    {
      id: 8,
      question: "Math.max massiv bilan to'g'ridan-to'g'ri ishladimi?",
      options: ["Ha, Math.max(arr)", "Yo'q — Math.max(...arr) spread kerak", "Faqat 2 ta argument", "apply'siz ishlamaydi umuman"],
      correctAnswer: 1,
      explanation: "Math.max argumentlar kutadi — massivni spread qilish shart."
    },
    {
      id: 9,
      question: "set.has() ning murakkabligi (Big-O)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Set hash-asosida — has/add/delete O(1). Shuning uchun tsiklda includes o'rniga has ishlating."
    },
    {
      id: 10,
      question: "localStorage'ga obyekt saqlash uchun to'g'ri juftlik?",
      options: [
        "setItem(key, obj) / getItem(key)",
        "setItem(key, JSON.stringify(obj)) / JSON.parse(getItem(key))",
        "setItem(key, String(obj)) / eval(getItem(key))",
        "saveItem(key, obj) / loadItem(key)"
      ],
      correctAnswer: 1,
      explanation: "localStorage faqat string saqlaydi — JSON.stringify/parse juftligi majburiy."
    }
  ]
};
