export const globalObjects = {
  id: "globalObjects",
  title: "Global Obyektlar: Math, Date, Set, Map, Window va Document",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

JS'da siz yozmasdan turib ham **tayyor obyektlar** mavjud. Ular "global" — chunki hech qanday import'siz istalgan joydan ishlaydi. Ularni **kutubxona binosi** deb tasavvur qiling: eshik ochiq (import shart emas), lekin har bo'lim (obyekt) o'z vositalariga ega.

### Global obyektlar xaritasi

\`\`\`javascript
// MATEMATIKA BO'LIMI — Math
Math.PI;            // 3.14159...
Math.round(4.6);    // 5
Math.random();      // 0..1 orasida tasodifiy son
Math.max(1, 5, 3);  // 5

// VAQT BO'LIMI — Date
const now = new Date();
now.getFullYear();  // 2026
now.getHours();     // joriy soat

// YIG'IMLAR BO'LIMI — Set va Map
const set = new Set([1, 2, 2, 3]);  // {1, 2, 3} — takror yo'q
const map = new Map([["ali", 25]]); // kalit-qiymat, kalit istalgan tur

// SERIALLASH — JSON
JSON.stringify({ a: 1 }); // '{"a":1}'
\`\`\`

### globalThis — global obyektga universal kirish

Har bir muhitda global obyekt bor, lekin nomi har xil:

\`\`\`javascript
// Brauzerda: window (yoki self — worker'da)
// Node.js'da: global
// Ikkala muhitda ham ishlaydigan yagona nom:
console.log(typeof globalThis); // "object"

globalThis.MATH_PI = Math.PI; // global obyektga property qo'shish (tavsiya etilmaydi!)
\`\`\`

### Window va Document — brauzerning ikki qatlami

Brauzerda ikkita katta global obyekt bor, ular **BOM** va **DOM**'ni boshqaradi:

\`\`\`javascript
// WINDOW — brauzer oynasi (BOM: Browser Object Model)
window.innerWidth;        // oyna eni
window.location.href;     // manzil qatori
window.alert("Salom");    // modal oyna
window.setTimeout(fn, 1000); // (window. yozmasdan ham bo'ladi!)

// DOCUMENT — sahifa mazmuni (DOM: Document Object Model)
document.title;                  // sahifa sarlavhasi
document.body;                   // <body> elementi
document.querySelector("h1");    // birinchi h1
document.createElement("div");   // yangi element
\`\`\`

**Soddalashtirilgan ierarxiya:**

\`\`\`javascript
window
├── document        ← sahifa (DOM)
├── location        ← URL
├── navigator       ← brauzer ma'lumotlari
├── history         ← tarix
├── localStorage    ← saqlash
├── console         ← log
├── Math, Date...   ← JS built-in obyektlar
└── setTimeout, fetch, alert...  ← tayyor funksiyalar
\`\`\`

\`\`\`mermaid
graph TD
    A["globalThis"] --> B["Brauzer: window"]
    A --> C["Node.js: global"]
    B --> D["BOM: location, navigator, history"]
    B --> E["DOM: document"]
    B --> F["Built-in: Math, Date, Set, Map, JSON"]
    E --> G["body, title, querySelector, createElement"]
    style A fill:#f9f,stroke:#333
    style E fill:#bfb,stroke:#333
\`\`\`

---

## 2. ⚙️ Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, unumdorlik)

### Built-in obyektlar nima qiladi — spetsifikasiyadan

ECMAScript spetsifikatsiyasi bu obyektlarni **"intrinsic objects"** deb ataydi. Ular prototipi bilan birga har yangi **realm** (global muhit) yaratilganda avtomatik paydo bo'ladi:

- **Oddiy built-ins:** Math, JSON, Reflect, Atomics (funksiya/obyekt konteynerlari)
- **Konstruktor built-ins:** Date, Set, Map, WeakMap, Promise, RegExp (\`new\` bilan ishlatiladi)
- **Error turlari:** Error, TypeError, RangeError...

\`\`\`javascript
// Math va JSON — konstruktor EMAS:
new Math(); // ❌ TypeError: Math is not a constructor
new JSON(); // ❌ xuddi shu

// Date va Set — konstruktor:
new Date();  // ✅ hozirgi vaqt
new Set();   // ✅ bo'sh yig'im

// typeof ham buni ko'rsatadi:
typeof Math;      // "object" (statik metodlar bilan)
typeof Date;      // "function" (chaqiriladigan konstruktor)
typeof new Date(); // "object" — instansiya
\`\`\`

### V8 optimizatsiyasi — Set/Map vs oddiy obyekt

\`\`\`javascript
// Obyekt — kalitlar faqat string/symbol
const obj = { 1: "bir" };  // 1 → "1" ga aylanadi!

// Map — kalit ISTALGAN tur bo'ladi
const map = new Map();
map.set(1, "son kalit");
map.set("1", "string kalit"); // har xil kalitlar!
map.get(1); // "son kalit" — ajratilgan

// Map o'lchami — O(1):
map.size; // 2 (obj uchun Object.keys(obj).length kerak)

// Set esa bor-yo'qligi O(1) bo'lgan yig'im:
const s = new Set([100000 ta element]);
s.has(42); // O(1) — massivning includes()'i esa O(n)
\`\`\`

**Amaliy xulosa:** katta massivda qidiruv kerak bo'lsa — \`new Set(arr)\` qilib \`has()\` ishlating. Bu interview'da tez-tez so'raladi.

### Date'ning dizayn muammosi

\`\`\`javascript
// Date mutablev (mutable) va oy 0 dan boshlanadi:
const d = new Date(2026, 0, 15); // 0 = YANVAR (trap!)
d.getMonth(); // 0

// d.setMonth(...) asl obyektni o'zgartiradi — side effect!
// Shu sababdan zamonaviy kod Temporal API'ga o'tmoqda (stage 3):
// Temporal.PlainDate.from("2026-01-15") — immutable, 1-bazali emas
\`\`\`

### Window: global scope'ning "begona yuzi"

\`\`\`javascript
// var va funksiya deklaratsiyalari window'ga "osilib" qoladi:
var x = 1;
function foo() {}
window.x;   // 1
window.foo; // foo()

// let/const — window'ga OSIMAYDI (script scope'da yashaydi):
let y = 2;
const z = 3;
window.y;   // undefined
window.z;   // undefined

// Shu sababli global zarar (pollution) kamayadi — var'dan qoching
\`\`\`

### Document: DOM daraxtining kirish eshigi

\`\`\`javascript
// document — Document interfeysining instansiyasi:
document instanceof Document;      // true
document instanceof Node;          // true (DOM'dagi hamma narsa Node'dan)

// Eng tez kirish yo'llari (query'lar qimmat!):
document.getElementById("root");   // ✅ eng tez
document.querySelector(".card");   // CSS selector (birinchi mos)
document.querySelectorAll("li");   // barcha mos — statik NodeList
document.body.children;            // HTMLCollection — jonli (live)
\`\`\`

---

## 3. ⚠️ Murakkab Holatlar va Senior Intervyu Savollari

### 1. window, globalThis, self, global — qaysi biri qayerda?

| Muhit | Global obyekt | Eslatma |
|-------|---------------|---------|
| Brauzer (sahifa) | \`window\` / \`globalThis\` | ikkalasi bir xil obyekt |
| Web Worker | \`self\` / \`globalThis\` | \`window\` YO'Q! |
| Node.js | \`global\` / \`globalThis\` | \`window\` yo'q |
| Node module scope | \`globalThis\` | top-level \`this\` = module.exports |

\`\`\`javascript
// Muhitdan mustaqil kod — globalThis ishlating:
const g = typeof globalThis !== "undefined" ? globalThis : window;
\`\`\`

### 2. HTML metodlarning "osma" xususiyati (intervyu klassikasi)

\`\`\`javascript
// Global funksiya — aslida window'ning metodi:
function hi() { return "salom"; }
window.hi(); // ✅ ishlaydi — chunki window.hi === hi

// this esa global obyektga qaraydi (strict mode'da undefined):
function whoAmI() { return this; }
whoAmI(); // window (non-strict), undefined (strict)

// ⚠️ BILAN farqi — let bilan e'lon qilingan global window'ga osilmaydi:
let hidden = 1;
window.hidden; // undefined
\`\`\`

### 3. Set'ta obyektlar — referens bo'yicha saqlanadi

\`\`\`javascript
const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 }); // YANGI obyekt — referens boshqacha!
set.size; // 2

const a = { id: 1 };
set.add(a);
set.add(a); // BIR XIL referens — qo'shilmaydi
set.size; // 3

// Yechim: obyektlarni Set'ta takrorlashdan oldin
// kalitni normalize qiling (masalan Map<id, obj>)
\`\`\`

### 4. Map kalli tartibi — insertion order kafolatlangan

\`\`\`javascript
const m = new Map();
m.set(3, "c"); m.set(1, "a"); m.set(2, "b");
[...m.keys()]; // [3, 1, 2] — qo'shilish tartibida

// Oddiy obyekt ham ES2015'dan tartibli, LEKIN:
// butun sonli kalitlar (integer-like keys) avval chiqadi — ascending tartibda:
const obj = { 10: "x", b: "y", 2: "z" };
Object.keys(obj); // ["2", "10", "b"] — raqamlar oldin!
\`\`\`

### 5. live vs static kolleksiyalar — document'dan qaytuvchilar

\`\`\`javascript
// HTMLCollection — LIVE: DOM o'zgarishi bilan avtomatik yangilanadi
const live = document.getElementsByTagName("div");

// NodeList (querySelectorAll) — STATIC: olingan lahzadagi ko'rinish
const staticList = document.querySelectorAll("div");

// yangi <div> qo'shilsa: live.length o'zgaradi, staticList.length emas
// Bu subtle bug'lar manbai — intervyuda so'raladi
\`\`\`

### 6. Math.random xavfsiz emas

\`\`\`javascript
Math.random(); // pseudo-tasodifiy — PAROL/token uchun ishlatmang!

// Xavfsiz tasodifiy qiymat uchun:
const bytes = new Uint8Array(16);
crypto.getRandomValues(bytes); // kriptografik sifat
\`\`\`

---

## 4. 📊 Umumiy jadval: qaysi obyekt qachon?

| Obyekt | Vazifasi | Konstruktor? | Muhit |
|--------|----------|--------------|-------|
| Math | matematik funksiyalar | ❌ | har qanday |
| Date | sana/vaqt | ✅ new Date() | har qanday |
| Set | unikal qiymatlar | ✅ new Set() | har qanday |
| Map | kalit→qiymat (kalit istalgan tur) | ✅ new Map() | har qanday |
| JSON | stringify / parse | ❌ | har qanday |
| Window | brauzer oynasi, BOM | — | faqat brauzer |
| Document | sahifa mazmuni, DOM | — | faqat brauzer |

**Xulosa:** \`Math, Date, Set, Map, JSON\` — JS tili bilan birga keladi (har qanday muhitda). \`window\` va \`document\` — brauzer bergan host obyektlar (Node'da yo'q). Kross-platform kodda bu farqni hisobga oling.
`,
  exercises: [
    {
      id: 1,
      title: "Math bilan doira yuzi",
      instruction: "`circleArea(r)` funksiyasini yozing — Math.PI va Math.pow ishlatib PI * r^2 natijasini qaytarsin.",
      startingCode: "function circleArea(r) {\n  // kodni yozing\n}",
      hint: "return Math.PI * Math.pow(r, 2);",
      test: "const fn = new Function(code + '; return circleArea(2);'); const r = fn(); if (typeof r === 'number' && Math.abs(r - Math.PI * 4) < 0.0001) return null; return 'Math.PI va Math.pow ishlatib formulani yozing';"
    },
    {
      id: 2,
      title: "Tasodifiy butun son",
      instruction: "`randomInt(min, max)` funksiyasini yozing — min va max ORASIDA (ikkalasi ham kiritilgan) tasodifiy butun son qaytarsin.",
      startingCode: "function randomInt(min, max) {\n  // Math.random va Math.floor ishlating\n}",
      hint: "return Math.floor(Math.random() * (max - min + 1)) + min;",
      test: "const fn = new Function(code + '; for (let i = 0; i < 200; i++) { const v = randomInt(3, 7); if (!Number.isInteger(v) || v < 3 || v > 7) return \\'out-of-range\\'; } return null;'); if (fn() === null) return null; return 'Natija 3..7 oraligida butun son bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Date bilan yosh hisoblash",
      instruction: "`ageInYears(birthYear)` funksiyasini yozing — joriy yil (Date'dan olingan) minus birthYear natijasini qaytarsin.",
      startingCode: "function ageInYears(birthYear) {\n  // Date ishlating\n}",
      hint: "return new Date().getFullYear() - birthYear;",
      test: "const fn = new Function(code + '; return ageInYears(2000);'); const r = fn(); const expected = new Date().getFullYear() - 2000; if (r === expected) return null; return 'getFullYear() ishlatib farqni qaytaring';"
    },
    {
      id: 4,
      title: "Set bilan takrorlarni olib tashlash",
      instruction: "`uniq(arr)` funksiyasini yozing — Set ishlatib massivdagi takrorlarni olib tashlab yangi massiv qaytarsin.",
      startingCode: "function uniq(arr) {\n  // Set ishlating\n}",
      hint: "return [...new Set(arr)];",
      test: "const fn = new Function(code + '; return JSON.stringify(uniq([1, 2, 2, 3, 1]));'); if (fn() === JSON.stringify([1, 2, 3])) return null; return 'new Set(arr) dan spread qilib massiv oling';"
    },
    {
      id: 5,
      title: "Map bilan hisoblagich",
      instruction: "`countWords(words)` funksiyasini yozing — Map ishlatib har so'z necha marta uchrashini qaytarsin. Natija: Map, kalitlar so'zlar.",
      startingCode: "function countWords(words) {\n  const counts = new Map();\n  // tsikl bilan to'ldiring\n  return counts;\n}",
      hint: "for (const w of words) { counts.set(w, (counts.get(w) || 0) + 1); } return counts;",
      test: "const fn = new Function(code + '; const m = countWords([\\'a\\', \\'b\\', \\'a\\']); return m.get(\\'a\\') + \\'-\\' + m.get(\\'b\\');'); if (fn() === '2-1') return null; return 'Har soz uchun counts.get(w) || 0 asosida hisoblang';"
    },
    {
      id: 6,
      title: "Map vs obyekt — aralash kalitlar",
      instruction: "`mixedKeys()` funksiyasini yozing — Map yaratib, unga 1 (son) va '1' (string) kalitlariga turli qiymatlar qo'ysin, so'ng [map.get(1), map.get('1')] massivini qaytarsin.",
      startingCode: "function mixedKeys() {\n  const map = new Map();\n  // 1 va '1' kalitlariga har xil qiymat qo'ying\n  return [map.get(1), map.get('1')];\n}",
      hint: "map.set(1, 'number'); map.set('1', 'string');",
      test: "const fn = new Function(code + '; const r = mixedKeys(); return Array.isArray(r) && r[0] !== r[1];'); if (fn() === true) return null; return '1 va \\'1\\' Mapda har xil kalitlar — turli qiymat qo\\'ying';"
    },
    {
      id: 7,
      title: "globalThis mavjudligini tekshirish",
      instruction: "`hasGlobal(name)` funksiyasini yozing — globalThis'da `name` property bor-yo'qligini boolean qaytarsin.",
      startingCode: "function hasGlobal(name) {\n  // globalThis ishlating\n}",
      hint: "return name in globalThis;",
      test: "const fn = new Function(code + '; return [hasGlobal(\\'Math\\'), hasGlobal(\\'window\\')];'); const r = fn(); if (r && r[0] === true && typeof r[1] === 'boolean') return null; return 'globalThis ichida in operatori bilan tekshiring';"
    },
    {
      id: 8,
      title: "Math.max bilan eng kattasi",
      instruction: "`biggest(arr)` funksiyasini yozing — Math.max va spread ishlatib massivdagi eng katta sonni qaytarsin. Bo'sh massiv uchun null qaytarsin.",
      startingCode: "function biggest(arr) {\n  // bo'sh massivni tekshiring\n}",
      hint: "if (arr.length === 0) return null; return Math.max(...arr);",
      test: "const fn = new Function(code + '; return [biggest([3, 9, 1]), biggest([])];'); const r = fn(); if (r && r[0] === 9 && r[1] === null) return null; return 'Math.max(...arr) va bo\\'sh massiv holatini yozing';"
    },
    {
      id: 9,
      title: "Set kesishmasi",
      instruction: "`common(a, b)` funksiyasini yozing — Set ishlatib ikki massivning umumiy elementlarini massiv sifatida qaytarsin.",
      startingCode: "function common(a, b) {\n  // Set yordamida kesishma toping\n}",
      hint: "const s = new Set(a); return [...new Set(b)].filter(x => s.has(x));",
      test: "const fn = new Function(code + '; return JSON.stringify(common([1, 2, 3, 4], [3, 4, 5]));'); if (fn() === JSON.stringify([3, 4])) return null; return 'Bir Set\\'dan has() bilan tekshiring';"
    },
    {
      id: 10,
      title: "Mini formatlovchi (Math + Date)",
      instruction: "`formatPrice(n)` funksiyasini yozing — sonni Math.round bilan butun songa aylantirib, `'${butun} so'm'` shaklida qaytarsin (masalan: 99.6 → '100 so\\'m').",
      startingCode: "function formatPrice(n) {\n  // Math.round ishlating\n}",
      hint: "return Math.round(n) + \" so'm\";",
      test: "const fn = new Function(code + '; return formatPrice(99.6);'); if (fn() === \"100 so'm\") return null; return 'Math.round bilan yaxlitlab, ozbek tilidagi matn bilan qaytaring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi obyekt KONSTRUKTOR emas (new bilan ishlatilmaydi)?",
      options: ["Date", "Set", "Math", "Map"],
      correctAnswer: 2,
      explanation: "Math va JSON statik metodlar konteyneri — new Math() xato beradi."
    },
    {
      id: 2,
      question: "globalThis nima?",
      options: [
        "Faqat brauzerda ishlaydigan global obyekt",
        "Har qanday muhitda global obyektga kirishning universal usuli",
        "Node.js'dagi maxsus kutubxona",
        "Yangi o'zgaruvchi e'lon qilish usuli"
      ],
      correctAnswer: 1,
      explanation: "globalThis ES2020'dan — brauzer, worker va Node'da bir xil ishlaydi."
    },
    {
      id: 3,
      question: "Set ichida ikkita bir xil ko'rinishdagi OBYEKT (new dan olingan) saqlansa?",
      options: [
        "Bittasi deb birlashtiriladi",
        "Ikkalasi saqlanadi — referenslar har xil",
        "Xato beradi",
        "Ikkinchisi birinchisini almashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Set tenglikni referens bo'yicha tekshiradi — ikki alohida obyekt ikkita element."
    },
    {
      id: 4,
      question: "Map ni oddiy obyektdan asosiy farqi nima?",
      options: [
        "Map faqat string kalitlarni oladi",
        "Map kalit sifatida istalgan turni oladi va size xossasi bor",
        "Map sekinroq ishlaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Mapda kalit har qanday tur bo'ladi (1 va '1' har xil), size O(1), kallar tartibi kafolatlangan."
    },
    {
      id: 5,
      question: "Brauzerda `let x = 5` yozilsa, window.x qanday qiymat oladi?",
      options: ["5", "undefined", "null", "Xato beradi"],
      correctAnswer: 1,
      explanation: "let/const window'ga osilmaydi (script scope). Faqat var va function deklaratsiyalari osiladi."
    },
    {
      id: 6,
      question: "document va window orasidagi munosabat?",
      options: [
        "document — window'ning bir xossasi (window.document)",
        "window — document'ning bir xossasi",
        "Ikkalasi mustaqil global obyekt",
        "document window'dan katta"
      ],
      correctAnswer: 0,
      explanation: "document — window obyektining xossasi: window.document === document."
    },
    {
      id: 7,
      question: "Katta massivda element bor-yo'qligini eng tez tekshirish?",
      options: [
        "arr.includes(x)",
        "new Set(arr) qilib s.has(x)",
        "arr.find(x)",
        "arr.indexOf(x) !== -1"
      ],
      correctAnswer: 1,
      explanation: "Set.has() O(1) — includes/find/indexOf har safar O(n) qidiradi."
    },
    {
      id: 8,
      question: "new Date(2026, 5, 15) qaysi oyni bildiradi?",
      options: ["May", "Iyun", "Yanvar", "Dekabr"],
      correctAnswer: 1,
      explanation: "Date konstruktorida oy 0'dan boshlanadi: 5 = iyun. Klassik tuzoq!"
    },
    {
      id: 9,
      question: "Web Worker ichida window obyekt bormi?",
      options: ["Ha, mavjud", "Yo'q — o'rniga self/globalThis ishlatiladi", "Faqat Safari'da bor", "Qo'lda yaratish kerak"],
      correctAnswer: 1,
      explanation: "Worker'da window yo'q — global obyekt self (globalThis ham ishlaydi)."
    },
    {
      id: 10,
      question: "getElementsByTagName qaytaradigan HTMLCollection ning xususiyati?",
      options: [
        "Statik — DOM o'zgarse ham o'zgarmaydi",
        "Jonli (live) — DOM o'zgarganda avtomatik yangilanadi",
        "Har doim bo'sh",
        "Faqat massiv qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "HTMLCollection — live kolleksiya; querySelectorAll esa statik NodeList qaytaradi."
    },
    {
      id: 11,
      question: "Math.random() ni parol yoki token yaratishda ishlatish?",
      options: [
        "To'g'ri — bu eng oson usul",
        "Xato — crypto.getRandomValues ishlatish kerak",
        "Faqat HTTPS'da ishlaydi",
        "Faqat mobil brauzerlarda muammo bor"
      ],
      correctAnswer: 1,
      explanation: "Math.random pseudo-tasodifiy — bashorat qilinadi. Xavfsizlik uchun Web Crypto API kerak."
    },
    {
      id: 12,
      question: "Global funksiya e'lon qilinganda (non-strict) u qayerga 'osiladi'?",
      options: ["globalThis'ga (brauzerda window'ga)", "document'ga", "console'ga", "Hech qayerga"],
      correctAnswer: 0,
      explanation: "var va function deklaratsiyalari global obyektning property'siga aylanadi: window.foo === foo."
    }
  ]
};
