export const fenwickTree = {
  id: "fenwickTree",
  title: "Fenwick Daraxti (Binary Indexed Tree)",
  language: "javascript",

  theory: `## 1. Bu nima?

Kassada 8 ta chek bor. Siz ularni papkalarga joylayapsiz. 1-chek alohida papkada. 2-chek o'zidan oldingi 1-chek bilan bitta papkada (2 ta chek). 4-chek esa oldingi 3 chek bilan (4 ta chek). 8-chek — oldingi 7 chek bilan (8 ta chek). Har papkaning ustiga o'z yig'indisi yozilgan.

Endi "birinchi 5 chekning yig'indisi qancha?" deb so'rashsa, siz 4 ta chekni qamragan papkani va 1 ta chekni qamragan papkani olasiz — ikkitasini qo'shib qo'yasiz. Hammasini qaytadan sanash shart emas.

**Fenwick daraxti** (Binary Indexed Tree, BIT) — indeksning ikkilik yozuviga tayanib, har \`i\` katakda massivning bir bo'lagi yig'indisini saqlaydigan tuzilma. \`bit[i]\` aynan qaysi bo'lakni saqlashini \`i & -i\` ifodasi belgilaydi.

---

## 2. Nega kerak?

Segment tree ham O(log n) beradi, lekin \`4 * n\` xotira va rekursiya talab qiladi. Fenwick ixchamroq:

| Tuzilma | So'rov | Yangilash | Xotira | Kod |
|---|---|---|---|---|
| Oddiy sikl | O(n) | O(1) | O(1) | eng oddiy |
| Segment tree | O(log n) | O(log n) | O(4n) | rekursiv |
| Fenwick (BIT) | O(log n) | O(log n) | O(n) | 6 qator |

Amaliy farq: 1 000 000 element uchun segment tree 4 000 000 katak, Fenwick 1 000 001 katak. Ustiga Fenwick'da rekursiya yo'q — faqat ikki kichik sikl.

Fenwick faqat **teskari amali bor** operatsiyalar uchun mos: yig'indi, ko'paytma, XOR. Maksimum yoki minimum uchun mos emas, chunki "oraliqdan elementni olib tashlash" mumkin emas.

---

## 3. Birinchi misol

Kod nima qiladi: massiv elementlarini Fenwick daraxtiga joylaydi.

\`\`\`javascript
const arr = [3, 2, -1, 6, 5, 4, -3, 7];
const n = arr.length;
const bit = new Array(n + 1).fill(0);          // 1 dan n gacha indeks

function add(index, delta) {                   // index — 1 dan boshlanadi
  for (let i = index; i <= n; i += i & -i) {   // "papkalar"ni yangilaymiz
    bit[i] = bit[i] + delta;
  }
}

for (let index = 1; index <= n; index++) {
  add(index, arr[index - 1]);
}
console.log(bit); // Natija: [0, 3, 5, -1, 10, 5, 9, -3, 23]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`new Array(n + 1)\` — Fenwick 1-indeksdan boshlanadi. 0-katak ishlatilmaydi va doim 0 bo'lib qoladi.
- \`i & -i\` — sonning **eng o'ngdagi 1-bitini** ajratib beradi. Masalan 6 (110) uchun 2, 8 (1000) uchun 8, 7 (111) uchun 1. \`&\` — bitwise AND, 13.24-darsda o'rganilgan.
- \`i += i & -i\` — yangilashda indeks shu qadam bilan **yuqoriga** suriladi: 3 → 4 → 8 → 16.
- \`bit[i]\` katagi \`i - (i & -i) + 1\` dan \`i\` gacha bo'lgan bo'lak yig'indisini saqlaydi.
- \`add(index, arr[index - 1])\` — massiv 0-indeksli, daraxt 1-indeksli. Shu sababli \`index - 1\`.
- Nol bilan boshlash xavfli: \`0 & -0\` — bu 0, ya'ni sikl hech qachon siljimaydi.

Natijadagi kataklar ma'nosi:

| i | bit[i] | Qamrab olgan bo'lak |
|---|---|---|
| 1 | 3 | arr[1] |
| 2 | 5 | arr[1..2] = 3 + 2 |
| 3 | -1 | arr[3] |
| 4 | 10 | arr[1..4] = 3 + 2 - 1 + 6 |
| 8 | 23 | arr[1..8] — butun massiv |

---

## 5. Qadamma-qadam

\`add(3, -1)\` chaqirilganda (n = 8):

| Qadam | i | i & -i | Amal | Keyingi i |
|---|---|---|---|---|
| 1 | 3 | 1 | bit[3] += -1 | 3 + 1 = 4 |
| 2 | 4 | 4 | bit[4] += -1 | 4 + 4 = 8 |
| 3 | 8 | 8 | bit[8] += -1 | 8 + 8 = 16 |
| 4 | 16 | — | 16 > n, sikl tugadi | — |

Atigi 3 ta katak o'zgardi, massivning hammasi emas. n = 1 000 000 bo'lsa ham qadamlar soni 20 dan oshmaydi — bu O(log n).

---

## 6. Yana bitta misol

Endi daraxtdan **prefiks yig'indini** o'qiymiz. Birinchi misoldan farqi: indeks yuqoriga emas, **pastga** suriladi.

\`\`\`javascript
function prefixSum(index) {
  let sum = 0;
  for (let i = index; i > 0; i -= i & -i) {   // "papkalar"ni yig'amiz
    sum = sum + bit[i];
  }
  return sum;
}

console.log(prefixSum(5));                 // Natija: 15
console.log(prefixSum(7) - prefixSum(2));  // Natija: 11
\`\`\`

\`prefixSum(5)\`: 5 → 4 → 0, ya'ni \`bit[5] + bit[4] = 5 + 10 = 15\`. Bu \`arr[1..5]\` yig'indisi.

Istalgan oraliq \`l..r\` ikki prefiks ayirmasi bilan topiladi: \`prefixSum(r) - prefixSum(l - 1)\`. \`[3..7]\` uchun \`23 - 12 = 11\`.

---

## 7. Ko'p uchraydigan xatolar

❌ **1-xato: indeksni 0 dan boshlash.**

\`\`\`javascript
const n = 8;
let steps = 0;
for (let i = 0; i <= n && steps < 100; i += i & -i) steps++;
console.log(steps); // Natija: 100 (cheksiz sikl — 0 & -0 === 0)
\`\`\`

\`0 & -0\` nolga teng, shuning uchun \`i\` hech qachon o'zgarmaydi. Fenwick indekslari **doim 1 dan** boshlanadi.

❌ **2-xato: yangilashda \`i++\` yozish.**

\`\`\`javascript
const arr = [3, 2, -1, 6, 5, 4, -3, 7];
const n = arr.length;
const bit = new Array(n + 1).fill(0);

function addWrong(index, delta) {
  for (let i = index; i <= n; i++) {      // har keyingi katakka ham yozadi
    bit[i] = bit[i] + delta;
  }
}

for (let index = 1; index <= n; index++) addWrong(index, arr[index - 1]);

function prefixSum(index) {
  let sum = 0;
  for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];
  return sum;
}

console.log(prefixSum(5)); // Natija: 25 (noto'g'ri, 15 bo'lishi kerak)
\`\`\`

\`i++\` bilan bitta element o'zi tegishli bo'lmagan kataklarga ham qo'shiladi va yig'indi shishib ketadi. Faqat \`i += i & -i\` to'g'ri "papkalar"ni tanlaydi.

❌ **3-xato: qo'shish o'rniga yozib qo'yish (\`bit[i] = delta\`).**

\`\`\`javascript
const arr = [3, 2, -1, 6, 5, 4, -3, 7];
const n = arr.length;
const bit = new Array(n + 1).fill(0);

function addAssign(index, delta) {
  for (let i = index; i <= n; i += i & -i) bit[i] = delta;   // = bo'lib qoldi
}

for (let index = 1; index <= n; index++) addAssign(index, arr[index - 1]);

function prefixSum(index) {
  let sum = 0;
  for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];
  return sum;
}

console.log(prefixSum(8)); // Natija: 7 (noto'g'ri, 23 bo'lishi kerak)
\`\`\`

Bir katak ko'p elementlarning yig'indisini saqlaydi. Shuning uchun yangilashda **qo'shish** kerak, qayta yozish emas.

---

## 8. Tekshiruv

1. \`bit[6]\` qaysi oraliqni qamrab oladi?
2. \`prefixSum(6)\` nechchi qadamda hisoblanadi?
3. Nega Fenwick maksimal qiymat uchun ishlamaydi?

**Javoblar:**

1. \`6 & -6 = 2\`, ya'ni \`6 - 2 + 1 = 5\` dan boshlab \`6\` gacha: \`arr[5..6]\`.
2. \`6 → 4 → 0\`: 2 qadam (\`bit[6] + bit[4]\`).
3. Maksimumni "oraliqdan chiqarib tashlash" mumkin emas: qiymat o'chsa, eski maksimumni qaytarish uchun qo'shish/ayirish yetmaydi. Buning uchun segment tree kerak.

---

## 9. Xulosa

- Fenwick daraxti \`i & -i\` orqali indeksni "papkalar"ga bo'lib, har katakda bo'lak yig'indisini saqlaydi.
- Prefiks so'rov ham, yangilash ham O(log n); xotira O(n), rekursiya yo'q.
- Faqat teskari amali bor operatsiyalar (yig'indi, ko'paytma, XOR) uchun mos.

**Keyingi darsda:** oraliqni yangilashni ham O(log n) qiladigan **lazy propagation** usulini ko'ramiz.
`,

  exercises: [
    {
      id: "fen-1",
      title: "Eng o'ngdagi bit",
      instruction:
        "`lowbit(x)` funksiyasini yozing: `x` sonining eng o'ngdagi 1-bitini ifodalovchi qiymatni qaytarsin. Masalan 6 → 2, 8 → 8, 7 → 1.",
      startingCode: "function lowbit(x) {\n  // kodni yozing\n}",
      solution: "function lowbit(x) {\n  return x & -x;\n}",
      test: `const cases = [
  [1, 1], [2, 2], [3, 1], [4, 4], [5, 1], [6, 2], [7, 1], [8, 8],
  [12, 4], [100, 4], [1024, 1024]
];
for (let i = 0; i < cases.length; i++) {
  const [x, expected] = cases[i];
  const got = lowbit(x);
  if (got !== expected) return "Test " + (i + 1) + " xato: lowbit(" + x + ") uchun " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-2",
      title: "Daraxtni qurish",
      instruction:
        "`buildBit(arr)` funksiyasini yozing: massivdan Fenwick daraxtini qursin va uzunligi `arr.length + 1` bo'lgan massiv qaytarsin (0-katak ishlatilmaydi).",
      startingCode: "function buildBit(arr) {\n  // kodni yozing\n}",
      solution:
        "function buildBit(arr) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  for (let index = 1; index <= n; index++) {\n    for (let i = index; i <= n; i += i & -i) {\n      bit[i] = bit[i] + arr[index - 1];\n    }\n  }\n  return bit;\n}",
      test: `const t1 = buildBit([3, 2, -1, 6, 5, 4, -3, 7]);
const expected = [0, 3, 5, -1, 10, 5, 9, -3, 23];
if (JSON.stringify(t1) !== JSON.stringify(expected)) return "Test 1 xato: kutilgan " + JSON.stringify(expected) + ", olindi " + JSON.stringify(t1);
const t2 = buildBit([5]);
if (JSON.stringify(t2) !== JSON.stringify([0, 5])) return "Test 2 xato: bitta elementli massiv";
const t3 = buildBit([1, 1, 1, 1]);
if (JSON.stringify(t3) !== JSON.stringify([0, 1, 2, 1, 4])) return "Test 3 xato: [1,1,1,1] uchun [0,1,2,1,4] kutilgan";
const t4 = buildBit([2, 4, 6]);
if (t4.length !== 4) return "Test 4 xato: massiv uzunligi arr.length + 1 bo'lishi kerak";
return null;`
    },
    {
      id: "fen-3",
      title: "Prefiks yig'indi",
      instruction:
        "`prefixSum(bit, index)` funksiyasini yozing: `bit` daraxtida birinchi `index` elementning yig'indisini qaytarsin (`index` 1 dan boshlanadi). `index === 0` bo'lsa, `0` qaytsin.",
      startingCode: "function prefixSum(bit, index) {\n  // kodni yozing\n}",
      solution:
        "function prefixSum(bit, index) {\n  let sum = 0;\n  for (let i = index; i > 0; i -= i & -i) {\n    sum = sum + bit[i];\n  }\n  return sum;\n}",
      test: `const bit = [0, 3, 5, -1, 10, 5, 9, -3, 23];
const cases = [
  [5, 15],
  [1, 3],
  [2, 5],
  [8, 23],
  [7, 16],
  [0, 0]
];
for (let i = 0; i < cases.length; i++) {
  const [index, expected] = cases[i];
  const got = prefixSum(bit, index);
  if (got !== expected) return "Test " + (i + 1) + " xato: prefixSum(" + index + ") uchun " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-4",
      title: "Yangilash",
      instruction:
        "`add(bit, n, index, delta)` funksiyasini yozing: daraxtni `index` katagiga `delta` qo'shish orqali yangilasin. `n` — massiv uzunligi. Funksiya hech narsa qaytarmasin.",
      startingCode: "function add(bit, n, index, delta) {\n  // kodni yozing\n}",
      solution:
        "function add(bit, n, index, delta) {\n  for (let i = index; i <= n; i += i & -i) {\n    bit[i] = bit[i] + delta;\n  }\n}",
      test: `function __prefix(bit, index) {
  let sum = 0;
  for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];
  return sum;
}
const b1 = [0, 1, 3, 3, 10];
add(b1, 4, 2, 5);
if (__prefix(b1, 4) !== 15) return "Test 1 xato: yangilangandan keyin jami 15 bo'lishi kerak";
if (__prefix(b1, 2) !== 8) return "Test 2 xato: prefix(2) 8 bo'lishi kerak";
const b2 = [0, 3, 5, -1, 10, 5, 9, -3, 23];
add(b2, 8, 3, 4);
if (__prefix(b2, 8) !== 27) return "Test 3 xato: 23 + 4 = 27 kutilgan";
if (__prefix(b2, 2) !== 5) return "Test 4 xato: 3-indeksdagi o'zgarish prefix(2) ga tegmasligi kerak";
const b3 = [0, 7];
add(b3, 1, 1, -7);
if (__prefix(b3, 1) !== 0) return "Test 5 xato: manfiy delta bilan 0 bo'lishi kerak";
return null;`
    },
    {
      id: "fen-5",
      title: "Oraliq so'rovi",
      instruction:
        "`rangeQuery(bit, l, r)` funksiyasini yozing: `l..r` (ikkalasi kiradi, 1-indeksli) oraliq yig'indisini qaytarsin. Ikki prefiks ayirmasidan foydalaning.",
      startingCode: "function rangeQuery(bit, l, r) {\n  // kodni yozing\n}",
      solution:
        "function rangeQuery(bit, l, r) {\n  function prefix(index) {\n    let sum = 0;\n    for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n    return sum;\n  }\n  return prefix(r) - prefix(l - 1);\n}",
      test: `const bit = [0, 3, 5, -1, 10, 5, 9, -3, 23];
const cases = [
  [1, 5, 15],
  [3, 7, 11],
  [4, 4, 6],
  [1, 8, 23],
  [2, 3, 1],
  [8, 8, 7]
];
for (let i = 0; i < cases.length; i++) {
  const [l, r, expected] = cases[i];
  const got = rangeQuery(bit, l, r);
  if (got !== expected) return "Test " + (i + 1) + " xato: [" + l + ".." + r + "] uchun " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-6",
      title: "Massiv ustida oraliq yig'indisi",
      instruction:
        "`sumRange(arr, l, r)` funksiyasini yozing: ichida Fenwick daraxtini qurib, `l..r` (1-indeksli) oraliq yig'indisini qaytarsin. Massiv o'zgarmasin.",
      startingCode: "function sumRange(arr, l, r) {\n  // kodni yozing\n}",
      solution:
        "function sumRange(arr, l, r) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  for (let index = 1; index <= n; index++) {\n    for (let i = index; i <= n; i += i & -i) bit[i] = bit[i] + arr[index - 1];\n  }\n  function prefix(index) {\n    let sum = 0;\n    for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n    return sum;\n  }\n  return prefix(r) - prefix(l - 1);\n}",
      test: `const cases = [
  [[3, 2, -1, 6, 5, 4, -3, 7], 1, 5, 15],
  [[3, 2, -1, 6, 5, 4, -3, 7], 3, 7, 11],
  [[3, 2, -1, 6, 5, 4, -3, 7], 1, 8, 23],
  [[5], 1, 1, 5],
  [[1, 2, 3, 4], 2, 4, 9]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, l, r, expected] = cases[i];
  const copy = arr.slice();
  const got = sumRange(arr, l, r);
  if (got !== expected) return "Test " + (i + 1) + " xato: " + expected + " kutilgan, olindi " + got;
  if (JSON.stringify(arr) !== JSON.stringify(copy)) return "Test " + (i + 1) + " xato: massiv o'zgardi";
}
return null;`
    },
    {
      id: "fen-7",
      title: "Yangilashlardan keyin prefiks",
      instruction:
        "`prefixAfterUpdates(arr, updates, index)` funksiyasini yozing: daraxtni qurib, `updates` massividagi har bir `[i, delta]` juftini qo'llasin, so'ng birinchi `index` element yig'indisini qaytarsin (1-indeksli).",
      startingCode: "function prefixAfterUpdates(arr, updates, index) {\n  // kodni yozing\n}",
      solution:
        "function prefixAfterUpdates(arr, updates, index) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  function add(i0, delta) {\n    for (let i = i0; i <= n; i += i & -i) bit[i] = bit[i] + delta;\n  }\n  for (let i0 = 1; i0 <= n; i0++) add(i0, arr[i0 - 1]);\n  for (const [i0, delta] of updates) add(i0, delta);\n  let sum = 0;\n  for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n  return sum;\n}",
      test: `const arr = [3, 2, -1, 6, 5, 4, -3, 7];
const cases = [
  [arr, [[2, 3]], 5, 18],
  [arr, [[1, 10], [8, -7]], 8, 26],
  [arr, [], 8, 23],
  [arr, [[3, 1]], 2, 5],
  [[5], [], 1, 5],
  [[1, 1], [[1, 4], [2, 4]], 2, 10]
];
for (let i = 0; i < cases.length; i++) {
  const [source, updates, index, expected] = cases[i];
  const got = prefixAfterUpdates(source, updates, index);
  if (got !== expected) return "Test " + (i + 1) + " xato: " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-8",
      title: "Juft sonlar prefiksi",
      instruction:
        "`countEvenUpTo(arr, index)` funksiyasini yozing: massivning birinchi `index` elementida nechta juft son borligini qaytarsin (1-indeksli). Daraxtga 0/1 yozib, yig'indidan foydalaning.",
      startingCode: "function countEvenUpTo(arr, index) {\n  // kodni yozing\n}",
      solution:
        "function countEvenUpTo(arr, index) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  for (let i0 = 1; i0 <= n; i0++) {\n    const value = arr[i0 - 1] % 2 === 0 ? 1 : 0;\n    for (let i = i0; i <= n; i += i & -i) bit[i] = bit[i] + value;\n  }\n  let sum = 0;\n  for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n  return sum;\n}",
      test: `const cases = [
  [[2, 3, 4, 7, 8], 5, 3],
  [[2, 3, 4, 7, 8], 1, 1],
  [[2, 3, 4, 7, 8], 2, 1],
  [[1, 3, 5], 3, 0],
  [[6], 1, 1],
  [[0, 1, 0, 1], 4, 2]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, index, expected] = cases[i];
  const got = countEvenUpTo(arr, index);
  if (got !== expected) return "Test " + (i + 1) + " xato: " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-9",
      title: "Kvadratlar oraliq yig'indisi",
      instruction:
        "`squaresRange(arr, l, r)` funksiyasini yozing: `l..r` (1-indeksli) oraliqdagi sonlar kvadratlari yig'indisini qaytarsin. Daraxtga kvadratlarni yozing.",
      startingCode: "function squaresRange(arr, l, r) {\n  // kodni yozing\n}",
      solution:
        "function squaresRange(arr, l, r) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  for (let i0 = 1; i0 <= n; i0++) {\n    const square = arr[i0 - 1] * arr[i0 - 1];\n    for (let i = i0; i <= n; i += i & -i) bit[i] = bit[i] + square;\n  }\n  function prefix(index) {\n    let sum = 0;\n    for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n    return sum;\n  }\n  return prefix(r) - prefix(l - 1);\n}",
      test: `const cases = [
  [[2, 5, 1, 4], 1, 4, 46],
  [[2, 5, 1, 4], 2, 3, 26],
  [[2, 5, 1, 4], 1, 1, 4],
  [[3, 3], 1, 2, 18],
  [[0, 2], 1, 2, 4],
  [[1], 1, 1, 1]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, l, r, expected] = cases[i];
  const got = squaresRange(arr, l, r);
  if (got !== expected) return "Test " + (i + 1) + " xato: " + expected + " kutilgan, olindi " + got;
}
return null;`
    },
    {
      id: "fen-10",
      title: "Yangilashlardan keyin oraliq",
      instruction:
        "`rangeAfterUpdates(arr, updates, l, r)` funksiyasini yozing: daraxtni qurib, barcha `[i, delta]` yangilashlarni qo'llasin, so'ng `l..r` (1-indeksli) oraliq yig'indisini qaytarsin.",
      startingCode: "function rangeAfterUpdates(arr, updates, l, r) {\n  // kodni yozing\n}",
      solution:
        "function rangeAfterUpdates(arr, updates, l, r) {\n  const n = arr.length;\n  const bit = new Array(n + 1).fill(0);\n  function add(i0, delta) {\n    for (let i = i0; i <= n; i += i & -i) bit[i] = bit[i] + delta;\n  }\n  for (let i0 = 1; i0 <= n; i0++) add(i0, arr[i0 - 1]);\n  for (const [i0, delta] of updates) add(i0, delta);\n  function prefix(index) {\n    let sum = 0;\n    for (let i = index; i > 0; i -= i & -i) sum = sum + bit[i];\n    return sum;\n  }\n  return prefix(r) - prefix(l - 1);\n}",
      test: `const arr = [3, 2, -1, 6, 5, 4, -3, 7];
const cases = [
  [arr, [[1, 5]], 1, 3, 9],
  [arr, [[4, -6]], 4, 4, 0],
  [arr, [], 1, 8, 23],
  [arr, [[3, 4], [5, 5]], 3, 5, 19],
  [[2, 2], [[1, 1]], 1, 2, 5]
];
for (let i = 0; i < cases.length; i++) {
  const [source, updates, l, r, expected] = cases[i];
  const got = rangeAfterUpdates(source, updates, l, r);
  if (got !== expected) return "Test " + (i + 1) + " xato: " + expected + " kutilgan, olindi " + got;
}
return null;`
    }
  ],

  quizzes: [
    {
      id: "fen-q1",
      question: "Fenwick daraxtida `i & -i` ifodasi nimani beradi?",
      options: [
        "Indeksning yarmini",
        "Indeksning eng o'ngdagi 1-bitini",
        "Indeksning eng chapdagi 1-bitini",
        "Indeks kvadratini"
      ],
      correctAnswer: 1,
      explanation:
        "Masalan 12 (1100) uchun 4, 10 (1010) uchun 2. Shu qiymat `bit[i]` qaysi oraliqni qamrab olishini va keyingi qadam qancha bo'lishini belgilaydi."
    },
    {
      id: "fen-q2",
      question: "`[3, 2, -1, 6, 5, 4, -3, 7]` uchun `bit[4]` qanday qiymat saqlaydi?",
      options: ["6", "10", "13", "23"],
      correctAnswer: 1,
      explanation: "`4 & -4 = 4`, ya'ni `bit[4]` `arr[1..4]` ni qamraydi: 3 + 2 - 1 + 6 = 10."
    },
    {
      id: "fen-q3",
      question: "Prefiks so'rovida indeks qanday o'zgaradi?",
      options: [
        "`i += i & -i`",
        "`i++`",
        "`i -= i & -i`",
        "`i = i / 2`"
      ],
      correctAnswer: 2,
      explanation:
        "So'rovda indeks kamayadi (5 → 4 → 0), yangilashda esa o'sadi (3 → 4 → 8). Ikkalasi ham O(log n) qadam."
    },
    {
      id: "fen-q4",
      question: "`prefixSum(5)` uchun (bit = [0,3,5,-1,10,5,9,-3,23]) qaysi kataklar qo'shiladi?",
      options: [
        "bit[5] va bit[4]",
        "bit[1] dan bit[5] gacha",
        "bit[4] va bit[8]",
        "faqat bit[5]"
      ],
      correctAnswer: 0,
      explanation: "5 - (5 & -5) = 4, keyin 4 - 4 = 0. Ya'ni bit[5] + bit[4] = 5 + 10 = 15."
    },
    {
      id: "fen-q5",
      question: "Fenwick daraxtining xotira murakkabligi qanday?",
      options: ["O(1)", "O(log n)", "O(n)", "O(4n)"],
      correctAnswer: 2,
      explanation: "Faqat `n + 1` katak kerak: 1 dan n gacha indekslar. Segment tree esa zaxira bilan `4n` oladi."
    },
    {
      id: "fen-q6",
      question: "Nega Fenwick indekslari 1 dan boshlanadi?",
      options: [
        "Chunki JavaScript massivlari 1 dan boshlanadi",
        "Chunki `0 & -0 = 0` va sikl hech qachon siljimaydi",
        "Chunki bit amallari faqat toq sonlarda ishlaydi",
        "Bu shart emas, 0 ham bo'ladi"
      ],
      correctAnswer: 1,
      explanation:
        "`i & -i` nolga teng bo'lsa, `i` o'zgarmaydi va sikl cheksiz aylanadi. Shu sababli 0-katak ishlatilmaydi."
    },
    {
      id: "fen-q7",
      question: "`rangeQuery(bit, 3, 7)` qanday hisoblanadi?",
      options: [
        "`prefixSum(7) + prefixSum(2)`",
        "`prefixSum(7) - prefixSum(2)`",
        "`prefixSum(7) - prefixSum(3)`",
        "`bit[3] + bit[7]`"
      ],
      correctAnswer: 1,
      explanation:
        "1..7 yig'indisidan 1..2 yig'indisini ayirsak, 3..7 qoladi. Shu sababli `prefix(r) - prefix(l - 1)`."
    },
    {
      id: "fen-q8",
      question: "Yangilashda `bit[i] = delta` yozilsa nima bo'ladi?",
      options: [
        "Hech narsa o'zgarmaydi",
        "Katakdagi eski yig'indi yo'qoladi va natija noto'g'ri chiqadi",
        "Faqat birinchi element yangilanadi",
        "Kod xato beradi"
      ],
      correctAnswer: 1,
      explanation:
        "Bir katak bir nechta elementning yig'indisini saqlaydi. Shuning uchun `bit[i] = bit[i] + delta` yozish kerak."
    },
    {
      id: "fen-q9",
      question: "Fenwick daraxti qaysi operatsiya uchun mos emas?",
      options: [
        "Yig'indi",
        "Ko'paytma",
        "XOR",
        "Oraliqdagi maksimum"
      ],
      correctAnswer: 3,
      explanation:
        "Fenwick qiymatlarni qo'shib/ayirib ishlaydi. Maksimumda element o'chganda eski qiymatni qaytarib bo'lmaydi, shuning uchun segment tree kerak."
    },
    {
      id: "fen-q10",
      question: "8 elementli massivda yangilash nechta katakni o'zgartiradi (eng yomon holat)?",
      options: ["1", "2", "3", "8"],
      correctAnswer: 2,
      explanation:
        "Masalan `add(1, ...)`: 1 → 2 → 4 → 8, ya'ni 4 ta. `add(3, ...)`: 3 → 4 → 8, ya'ni 3 ta. Umumiy qoida — log₂n tartibida."
    },
    {
      id: "fen-q11",
      question: "`bit[8]` qaysi oraliqni qamrab oladi?",
      options: ["arr[8]", "arr[7..8]", "arr[1..8]", "arr[4..8]"],
      correctAnswer: 2,
      explanation: "`8 & -8 = 8`, ya'ni 8 - 8 + 1 = 1 dan boshlanadi: butun massiv."
    },
    {
      id: "fen-q12",
      question: "Fenwick daraxti segment treega nisbatan qanday afzallikka ega?",
      options: [
        "Har qanday operatsiyani qo'llaydi",
        "Kamroq xotira va rekursiyasiz qisqa kod",
        "So'rovlar O(1) da bajariladi",
        "Massivni saralaydi"
      ],
      correctAnswer: 1,
      explanation:
        "Xotira `n + 1`, kod ikki kichik sikl. Lekin faqat teskari amali bor operatsiyalar uchun mos; segment tree umumiyroq."
    }
  ]
};
