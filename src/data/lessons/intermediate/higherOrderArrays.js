export const higherOrderArrays = {
  id: "higher-order-arrays",
  title: "🚀 Massiv Metodlari (Chuqur O'rganish)",
  level: "O'rta daraja",
  description: "map, filter, reduce, find, some, every, sort - amaliy misollari bilan.",
  theory: `## 📌 MASSIV METODLARI — KURS DARAJASI

### 1. NEGA kerak? (Sabab)
Eski usulda 100 ta foydalanuvchini filtrlash uchun:
\`\`\`javascript
// Eski, uzoq usul
const natijaQatuv = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    natijaQatuv.push(users[i].name);
  }
}
\`\`\`
Zamonaviy usulda:
\`\`\`javascript
const natijaQatuv = users
  .filter(u => u.age >= 18)
  .map(u => u.name);
\`\`\`
**Foyda:** Kod qisqa, xatolar kam, o'qish oson, qayta ishlatiladigan (reusable).

---

### 2. SODDALIK (Haqiqiy Analogiyalar)
- **map() — Masturga yozu berish:** Har bir student uchun sertifikat o'zimiz yozie qo'yamiz. Natijaviy qagozlar massivi — shu massiv.
- **filter() — Qo'shni saralash:** Qo'shdan faqat 18 yoshdan oshgan bolalarni chiqaramiz.
- **reduce() — Xazina:** Hamma gaz noma'lumlarning puli bor. Hammani bitta quitiga qo'shamiz.
- **find() — Izlanuvchi:** "Berilgan yoshda kim bor?" deb birinchisini topamiz.
- **some() — Hammasida bormi?** "Kamida birta 18 yoshdan oshgan bormi?" — Ha yoki Yo'q.
- **every() — Hammasida o'z-o'zidan?** "Hammasibmi 18 yoshdan oshgan?" — Ha yoki Yo'q.

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. map() — TRANSFORMATSIYA
**Vazifasi:** Har bir element bilan bir narsa qilish, yangi massiv qaytarish.
\`\`\`javascript
// Misol 1: Hamma sonni 2 ga ko'paytirish
const sonlar = [1, 2, 3];
const ikkilantirilgan = sonlar.map(n => n * 2);
console.log(ikkilantirilgan); // [2, 4, 6]

// Misol 2: Foydalanuvchi ma'lumotlarini o'zlashtirish
const foydalanuvchilar = [
  { id: 1, ism: "Ali" },
  { id: 2, ism: "Zara" }
];
const ismlar = foydalanuvchilar.map(f => f.ism);
console.log(ismlar); // ["Ali", "Zara"]

// Misol 3: String formatini o'zgartirish
const narxlar = [100, 200, 300];
const formatlanganNarxlar = narxlar.map(n => n + " so'm");
// ["100 so'm", "200 so'm", "300 so'm"]
\`\`\`

#### B. filter() — SARALASH
**Vazifasi:** Shartga mos elementlarni saqlash, qolgani tashlash.
\`\`\`javascript
// Misol 1: Raqamli saralash
const ballar = [45, 80, 55, 90, 30];
const otib_ketganlar = ballar.filter(b => b >= 60);
console.log(otib_ketganlar); // [80, 90]

// Misol 2: String saralash
const ismlar = ["Ali", "Anna", "Zara", "Aziz"];
const A_bilan = ismlar.filter(i => i[0] === "A");
console.log(A_bilan); // ["Ali", "Anna", "Aziz"]

// Misol 3: Kompleks shart
const tovarlar = [
  { nom: "Kitob", narx: 30000 },
  { nom: "Qalam", narx: 5000 },
  { nom: "Daftar", narx: 15000 }
];
const arzon = tovarlar.filter(t => t.narx < 20000);
// Kitob va qalam qoladi
\`\`\`

#### C. reduce() — JAMI QISISH
**Vazifasi:** Massivni bitta qiymatga keltirish (raqam, string, obyekt...).
\`\`\`javascript
// Misol 1: Yig'indi
const savat = [500, 1200, 300];
const jami = savat.reduce((sum, narx) => sum + narx, 0);
console.log(jami); // 2000

// Misol 2: Ko'paytma
const sonlar = [2, 3, 4];
const mahsulot = sonlar.reduce((p, n) => p * n, 1);
console.log(mahsulot); // 24

// Misol 3: Massivni Obyektga aylantirish
const ranglar = ["qizil", "ko'k", "sariq"];
const indeks = ranglar.reduce((obj, rang, i) => {
  obj[i] = rang;
  return obj;
}, {});
// { 0: "qizil", 1: "ko'k", 2: "sariq" }

// Misol 4: Guruhlash
const xaridlar = [
  { nom: "Kitob", narx: 30000 },
  { nom: "Qalam", narx: 5000 },
  { nom: "Daftar", narx: 30000 }
];
const guruh = xaridlar.reduce((acc, tovar) => {
  if (!acc[tovar.narx]) acc[tovar.narx] = [];
  acc[tovar.narx].push(tovar.nom);
  return acc;
}, {});
// { 30000: ["Kitob", "Daftar"], 5000: ["Qalam"] }
\`\`\`

#### D. find() — BIRINCHISINI TOPISH
**Vazifasi:** Shartga mos **birinchi** elementni qaytarish (yoki undefined).
\`\`\`javascript
// Misol 1
const sonlar = [10, 20, 30];
const birinchi = sonlar.find(n => n > 15);
console.log(birinchi); // 20 (30 emas, birinchi mos)

// Misol 2: Foydalanuvchini ID orqali qidirish
const foydalanuvchilar = [
  { id: 1, ism: "Ali" },
  { id: 2, ism: "Zara" }
];
const topildi = foydalanuvchilar.find(f => f.id === 2);
console.log(topildi); // { id: 2, ism: "Zara" }
\`\`\`

#### E. some() — HAMMASIDA BORMI?
**Vazifasi:** Kamida birta element shartga mos bormi? **true/false**.
\`\`\`javascript
// Misol 1
const ballar = [30, 45, 80, 55];
const otdi_bormi = ballar.some(b => b >= 60);
console.log(otdi_bormi); // true (80 bor)

// Misol 2
const foydalanuvchilar = [
  { ism: "Ali", admin: false },
  { ism: "Zara", admin: true }
];
const admin_bormi = foydalanuvchilar.some(f => f.admin === true);
console.log(admin_bormi); // true
\`\`\`

#### F. every() — HAMMASI SHARTGA MOS?
**Vazifasi:** **Barcha** elementlar shartga mos? **true/false**.
\`\`\`javascript
// Misol 1
const ballar = [65, 75, 85];
const hammasi_otdi = ballar.every(b => b >= 60);
console.log(hammasi_otdi); // true

// Misol 2
const ballar2 = [65, 45, 85];
const hammasi_otdi2 = ballar2.every(b => b >= 60);
console.log(hammasi_otdi2); // false (45 yo'q)
\`\`\`

#### G. CHAINING (ZANJIR QILISH)
**Vazifasi:** Bir nechta operatsiyani ketma-ket qilish.
\`\`\`javascript
// Misol: O'quvchilardan 18 yoshdan oshgan erkaklar topib, ularning ismlarini olib, ABC tartibida saralash
const oqvuchilar = [
  { ism: "Ali", yosh: 20, jins: "erkak" },
  { ism: "Zara", yosh: 25, jins: "ayol" },
  { ism: "Bobir", yosh: 17, jins: "erkak" },
  { ism: "Kamol", yosh: 22, jins: "erkak" }
];

const natija = oqvuchilar
  .filter(o => o.yosh >= 18)       // 18+ sifillash
  .filter(o => o.jins === "erkak") // Faqat erkaklar
  .map(o => o.ism)                 // Ismlarni olish
  .sort();                         // ABC tartibida

console.log(natija); // ["Ali", "Kamol"]
\`\`\`

---

### 4. XATOLAR VA CHUQURLIKLAR (Edge Cases)

#### ❌ Xato 1: Arrow funksiyada returnni unutish
\`\`\`javascript
// NOTO'G'RI ❌
const sonlar = [1, 2, 3];
const ikkilantir = sonlar.map(n => { n * 2 }); // undefined, undefined, undefined

// TO'G'RI ✅
const ikkilantir = sonlar.map(n => { return n * 2; });
// YOKI (return kalit sozi yo'q)
const ikkilantir = sonlar.map(n => n * 2);
\`\`\`

#### ❌ Xato 2: Asl massivni o'zgartiramiz (Mutation)
\`\`\`javascript
// XATO ❌ - Yangi massiv kerak, eslizini o'zgartirish kerak emas
const sonlar = [1, 2, 3];
sonlar.forEach(n => n * 2); // Asl massiv o'zgarishsiz

// TO'G'RI ✅
const sonlar = [1, 2, 3];
const natija = sonlar.map(n => n * 2);
\`\`\`

#### ❌ Xato 3: reduce() bilan boshlang'ich qiymatni unutish
\`\`\`javascript
// XATO ❌ - Bo'sh massiv xatoga olib keladi
const sonlar = [];
const jami = sonlar.reduce((sum, n) => sum + n);
// TypeError: Reduce of empty array with no initial value

// TO'G'RI ✅
const jami = sonlar.reduce((sum, n) => sum + n, 0); // 0
\`\`\`

#### ❌ Xato 4: sort() asl massivni o'zgartiradi
\`\`\`javascript
// XATO ❌ - Asl massiv o'zgaradi
const sonlar = [3, 1, 2];
sonlar.sort((a, b) => a - b); // sonlar = [1, 2, 3]

// TO'G'RI ✅ - Aslisini xohlamasak
const sonlar = [3, 1, 2];
const saralangan = [...sonlar].sort((a, b) => a - b);
\`\`\`

#### ⚠️ Edge Case: map(parseInt) mazmunam
\`\`\`javascript
// XATO ❌
const stringlar = ["10", "20", "30"];
const sonlar = stringlar.map(parseInt);
console.log(sonlar); // [10, NaN, NaN] ❌ NEGA?!

// SABABNI: parseInt(value, index) ishlamoqda
// parseInt("10", 0) → 10 ✓
// parseInt("20", 1) → NaN ✗ (1-asosda 20 yo'q)
// parseInt("30", 2) → NaN ✗ (2-asosda 30 yo'q)

// TO'G'RI ✅
const sonlar = stringlar.map(Number); // [10, 20, 30]
// YOKI
const sonlar = stringlar.map(s => parseInt(s, 10));
\`\`\`

---

### 5. REAL HAYOTDAGI MISOLLAR

#### Misol 1: E-commerce savatchasi
\`\`\`javascript
const savat = [
  { nom: "Kitob", narx: 30000, miqdori: 2 },
  { nom: "Qalam", narx: 5000, miqdori: 5 },
  { nom: "Daftar", narx: 15000, miqdori: 1 }
];

// Har bir tovar uchun umumiy summani hisoblash
const tovarlar_bilan_jami = savat.map(t => ({
  ...t,
  jami: t.narx * t.miqdori
}));

// Umumiy summani hisoblash
const savatning_jamiyi = savat
  .map(t => t.narx * t.miqdori)
  .reduce((sum, n) => sum + n, 0);

console.log(savatning_jamiyi); // 115000
\`\`\`

#### Misol 2: Filterlab va o'rganish
\`\`\`javascript
const darslar = [
  { nom: "JavaScript", kesib: true, reyting: 4.8 },
  { nom: "Python", kesib: false, reyting: 4.9 },
  { nom: "React", kesib: true, reyting: 4.7 }
];

// Kesib o'tilgan va 4.8+ reyting bilan darslar
const yaxshi_darslar = darslar
  .filter(d => d.kesib === true)
  .filter(d => d.reyting >= 4.8)
  .map(d => d.nom);

console.log(yaxshi_darslar); // ["JavaScript"]
\`\`\`

---

### 6. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. map() metodi asl massivni o'zgartiradimi?</b></summary>
Yo'q, \`map()\` yangi massiv qaytaradi. Asl massiv o'zgarmasin.
</details>

<details>
<summary><b>2. filter() qachon bo'sh massiv qaytaradi?</b></summary>
Agar hech qanday element shartga mos bo'lmasa (\`true\` bo'lmasa).
</details>

<details>
<summary><b>3. reduce() akkumulyatorning boshlang'ich qiymati nima?</b></summary>
4-parametr (\`initial value\`). Masalan, \`reduce((sum, n) => sum + n, 0)\` da 0 boshlang'ich.
</details>

<details>
<summary><b>4. find() va filter() asosiy farqi nimada?</b></summary>
\`find()\` — birinchi mos elementni qaytaradi (yoki undefined).
\`filter()\` — **barcha** mos elementlar massivini qaytaradi.
</details>

<details>
<summary><b>5. some() va every() o'rtasidagi farq?</b></summary>
\`some()\` — kamida bittasi shartga mos?
\`every()\` — **barcha**si shartga mos?
</details>

<details>
<summary><b>6. map() va forEach() o'rtasidagi farq?</b></summary>
\`map()\` — yangi massiv qaytaradi.
\`forEach()\` — hech narsa qaytarmaydi (undefined), faqat side-effect uchun.
</details>

<details>
<summary><b>7. reduce() yordamida massivni objektga aylantirish mumkinmi?</b></summary>
Ha! \`reduce((obj, item) => { obj[item.id] = item; return obj; }, {})\`
</details>

<details>
<summary><b>8. find() bir nechta mos element topsa nima bo'ladi?</b></summary>
Faqat **birinchisi** qaytariladi.
</details>

<details>
<summary><b>9. Chaining nima va nega kerak?</b></summary>
Bir nechta metodni ketma-ket qilish: \`.filter().map().sort()\`. Kod tilishni va o'qishni osonlashtiradi.
</details>

<details>
<summary><b>10. sort() asl massivni o'zgartiradimi?</b></summary>
Ha! \`sort()\` asl massivni o'zgartiradi. Xohlamasak: \`[...arr].sort()\`
</details>

<details>
<summary><b>11. reduce() yordamida massivning duplikatlarini olib tashlay olamiz?</b></summary>
Ha! Misol:
\`\`\`javascript
const sonlar = [1, 2, 2, 3, 1];
const unique = sonlar.reduce((arr, n) =>
  arr.includes(n) ? arr : [...arr, n], []);
console.log(unique); // [1, 2, 3]
\`\`\`
</details>

<details>
<summary><b>12. Qaysi vaziyatda find() o'rniga filter() ishlatish kerak?</b></summary>
\`find()\` — bitta element kerak bo'lganda.
\`filter()\` — bir nechta element kerak bo'lganda.
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Map: Narxlarni yangilash (Boshlang'ich)",
      instruction: "Mahsulotlar narxiga 15% QQS qo'shib, yangi massiv yarating.",
      startingCode: "const narxlar = [100, 200, 300];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "narxlar.map(n => n * 1.15)",
      test: "if (logs.some(l => Array.isArray(l) && Math.abs(l[0] - 115) < 0.1)) return null; return 'Narxlar noto\\'g\\'ri!';"
    },
    {
      id: 2,
      title: "2️⃣ Filter: Juft sonlar (Boshlang'ich)",
      instruction: "Massivdan faqat juft sonlarni olib, konsolga chiqaring.",
      startingCode: "const sonlar = [1, 2, 3, 4, 5, 6, 7, 8];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "sonlar.filter(n => n % 2 === 0)",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 4 && l[0] === 2)) return null; return 'Faqat juft sonlar qolishi kerak!';"
    },
    {
      id: 3,
      title: "3️⃣ Reduce: Yig'indi (Boshlang'ich)",
      instruction: "Massivdagi barcha sonlarni qo'shib, umumiy yig'indini chiqaring.",
      startingCode: "const ballar = [85, 90, 70, 100];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "ballar.reduce((sum, ball) => sum + ball, 0)",
      test: "if (logs.includes(345)) return null; return 'Umumiy ball 345 chiqishi kerak!';"
    },
    {
      id: 4,
      title: "4️⃣ Find: Birinchi topish (O'rta)",
      instruction: "Massivdan 50 dan katta birinchi sonni toping.",
      startingCode: "const sonlar = [20, 40, 60, 30, 80];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "sonlar.find(n => n > 50)",
      test: "if (logs.includes(60)) return null; return '50 dan katta birinchi sonni toping!';"
    },
    {
      id: 5,
      title: "5️⃣ Map + Filter: Ism va yoshni o'zgartirish (O'rta)",
      instruction: "18 yoshdan oshgan odamlarning ismlarini KATTA HARFLAR bilan oling.",
      startingCode: "const adamlar = [\n  { ism: 'Ali', yosh: 20 },\n  { ism: 'zara', yosh: 17 },\n  { ism: 'bobir', yosh: 25 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "adamlar.filter(a => a.yosh >= 18).map(a => a.ism.toUpperCase())",
      test: "if (logs.some(l => Array.isArray(l) && l.length === 2 && l[0] === 'ALI')) return null; return 'Natijani to\\'g\\'ri formatda oling!';"
    },
    {
      id: 6,
      title: "6️⃣ Some: Shartga mos bormi? (O'rta)",
      instruction: "Massivda 18 yoshdan oshgan foydalanuvchi bormi? true/false ni konsolga chiqaring.",
      startingCode: "const foydalanuvchilar = [\n  { ism: 'Ali', yosh: 20 },\n  { ism: 'Zara', yosh: 17 },\n  { ism: 'Bobir', yosh: 15 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "foydalanuvchilar.some(f => f.yosh >= 18)",
      test: "if (logs.includes(true)) return null; return 'some() metodi false qaytarishi kerak!';"
    },
    {
      id: 7,
      title: "7️⃣ Every: Hammasi shartga mos? (O'rta)",
      instruction: "Hammasi 18 yoshdan oshganmi? true/false ni chiqaring.",
      startingCode: "const foydalanuvchilar = [\n  { ism: 'Ali', yosh: 20 },\n  { ism: 'Zara', yosh: 25 },\n  { ism: 'Bobir', yosh: 15 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "foydalanuvchilar.every(f => f.yosh >= 18)",
      test: "if (logs.includes(false)) return null; return 'Hisoblanmadi!';"
    },
    {
      id: 8,
      title: "8️⃣ Reduce: Jami summani hisoblash (O'rta)",
      instruction: "Savatchadagi barcha tovarlarning umumiy narxini hisoblang (narx × miqdori).",
      startingCode: "const savat = [\n  { nom: 'Kitob', narx: 30000, miqdori: 2 },\n  { nom: 'Qalam', narx: 5000, miqdori: 3 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "savat.reduce((sum, t) => sum + (t.narx * t.miqdori), 0)",
      test: "if (logs.includes(75000)) return null; return 'Jami 75000 bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "9️⃣ Chaining: Filter + Map + Sort (Qiyin)",
      instruction: "18+ yoshli odamlarni ismlarini alfabetik tartibda chiqaring.",
      startingCode: "const adamlar = [\n  { ism: 'Zara', yosh: 20 },\n  { ism: 'Ali', yosh: 17 },\n  { ism: 'Bobir', yosh: 25 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "adamlar.filter(a => a.yosh >= 18).map(a => a.ism).sort()",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 'Bobir' && l[1] === 'Zara')) return null; return 'Alfabetik tartibda bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "🔟 Reduce: Massivni Objektga aylantirish (Qiyin)",
      instruction: "Foydalanuvchilar massivini ID bo'yicha indexed objektga aylantiring.",
      startingCode: "const users = [\n  { id: 1, ism: 'Ali' },\n  { id: 2, ism: 'Zara' }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "users.reduce((obj, u) => { obj[u.id] = u.ism; return obj; }, {})",
      test: "if (logs.some(l => typeof l === 'object' && l['1'] === 'Ali' && l['2'] === 'Zara')) return null; return 'Objektga aylantirish kerak!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Map + Sort: Narxlarni saralash (Qiyin)",
      instruction: "Mahsulotlarni narxga ko'ra o'suvchi tartibda saralab, ismlarni konsolga chiqaring.",
      startingCode: "const tovarlar = [\n  { nom: 'Kitob', narx: 30000 },\n  { nom: 'Qalam', narx: 5000 },\n  { nom: 'Daftar', narx: 15000 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "[...tovarlar].sort((a, b) => a.narx - b.narx).map(t => t.nom)",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 'Qalam' && l[1] === 'Daftar')) return null; return 'Narxga ko\\'ra saralanmadi!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Reduce: Guruhlash (Eng Qiyin)",
      instruction: "Tovarlarni narxga ko'ra guruhlang: { narx: [tovar ismları] }.",
      startingCode: "const tovarlar = [\n  { nom: 'Kitob', narx: 30000 },\n  { nom: 'Qalam', narx: 5000 },\n  { nom: 'Daftar', narx: 30000 }\n];\n// Kodni shu yerda yozing\nconsole.log(/* natija */);",
      hint: "tovarlar.reduce((acc, t) => { if (!acc[t.narx]) acc[t.narx] = []; acc[t.narx].push(t.nom); return acc; }, {})",
      test: "if (logs.some(l => typeof l === 'object' && l['30000'] && l['30000'].length === 2)) return null; return 'Guruhlash to\\'g\\'ri emas!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`map()` va `forEach()` metodlari o'rtasidagi asosiy farq nimada?",
      options: [
        "`map()` har bir element uchun amal bajarib, natijalardan iborat mutlaqo yangi massiv qaytaradi; `forEach()` esa natija qaytarmaydi (`undefined` qaytaradi) va faqat elementlarni aylanib chiqish uchun ishlatiladi",
        "`forEach()` yangi massiv qaytaradi, `map()` esa qaytarmaydi",
        "`map()` faqat sonlar bilan, `forEach()` esa faqat stringlar bilan ishlaydi",
        "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "`map()` har doim asl massiv bilan bir xil uzunlikdagi yangi o'zgartirilgan massiv qaytaradi. `forEach` esa shunchaki har bir element uchun callback funksiyani bajaradi, lekin hech qanday qiymat qaytarmaydi."
    },
    {
      id: 2,
      question: "`filter()` metodi qidiruv natijasida hech qanday mos element topa olmasa nima qaytaradi?",
      options: [
        "`undefined`",
        "`null`",
        "Bo'sh massiv (`[]`)",
        "Xatolik (Error) beradi"
      ],
      correctAnswer: 2,
      explanation: "`filter()` shartga mos keluvchi barcha elementlar to'plamini (massiv) qaytaradi. Agar hech qanday element shartni bajarmasa, natija baribir massiv bo'ladi, faqat bo'sh (`[]`)."
    },
    {
      id: 3,
      question: "`reduce()` metodida boshlang'ich qiymat (initial value) berilmagan bo'lsa va massiv bo'sh bo'lsa nima yuz beradi?",
      options: [
        "`0` qaytaradi",
        "`undefined` qaytaradi",
        "`TypeError: Reduce of empty array with no initial value` xatosi yuz beradi",
        "Bo'sh massiv `[]` qaytaradi"
      ],
      correctAnswer: 2,
      explanation: "Bo'sh massiv ustida boshlang'ich qiymatsiz `reduce` bajarilganda, akkumulyatorni nimadan boshlashni bilmagani uchun JavaScript `TypeError` xatoligini tashlaydi."
    },
    {
      id: 4,
      question: "`sort()` metodi haqida qaysi tasdiq to'g'ri?",
      options: [
        "U har doim yangi saralangan massiv qaytaradi va asl massivni o'zgartirmaydi",
        "U asl massivning o'zini o'zgartiradi (mutable) va elementlarni string sifatida taqqoslaydi (shuning uchun sonlarni saralashda taqqoslash funksiyasi yozilishi kerak)",
        "U faqat obyektlarni saralay oladi",
        "U faqat asinxron ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`sort()` asl massivning joylashuvini o'zgartiradi. Agar solishtirish (compare) funksiyasi berilmasa, sonlarni ham string kabi tartiblaydi (masalan, 10 soni 2 dan oldin keladi, chunki '1' < '2')."
    },
    {
      id: 5,
      question: "Massivdagi hammasi emas, balki kamida bitta element berilgan shartga mos kelishini tekshirish uchun qaysi metod ishlatiladi?",
      options: [
        "`every()`",
        "`some()`",
        "`find()`",
        "`filter()`"
      ],
      correctAnswer: 1,
      explanation: "`some()` kamida bitta element shartni bajarsa `true` qaytaradi. `every()` esa faqat barcha elementlar shartni bajargandagina `true` beradi."
    }
  ]
};
