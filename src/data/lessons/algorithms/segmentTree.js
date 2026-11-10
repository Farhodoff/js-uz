export const segmentTree = {
  id: "segmentTree",
  title: "Segment Tree: Oraliq So'rovlari Daraxti",
  language: "javascript",

  theory: `## 1. Bu nima?

Sport musobaqasida jamoalar jadvali bor: har juftlik o'ynaydi, g'olib keyingi bosqichga chiqadi. Jadvalning eng yuqorisida joylashgan tugun — barcha o'yinlar natijasining yig'indisi. Sizga "3- va 6-o'yinlar orasida qancha ball to'plangan?" deb so'rashsa, butun jadvalni qaytadan hisoblamaysiz — faqat kerakli tugunlarni yig'ib olasiz.

**Segment tree** — massiv oraliqlari ustida qurilgan daraxt. Har tugun massivning bir bo'lagini (segmentini) ifodalaydi va o'sha bo'lak uchun tayyor natijani (masalan yig'indini) saqlaydi. Ildiz — butun massiv, barglar — bitta element.

---

## 2. Nega kerak?

Massivda "ql dan qr gacha yig'indi" so'rovi tez-tez keladi. Uch xil yo'l bor:

| Usul | So'rov (query) | Yangilash (update) |
|---|---|---|
| Oddiy sikl | O(n) | O(1) |
| Prefiks yig'indi massivi | O(1) | O(n) |
| Segment tree | O(log n) | O(log n) |

Prefiks massivi so'rovni juda tez qiladi, lekin bitta element o'zgarsa, undan keyingi **barcha** prefikslarni qayta hisoblash kerak. Amalda esa so'rov ham, yangilash ham aralash keladi: 1 000 000 element, 100 000 so'rov va 100 000 yangilash.

- Oddiy sikl: 100 000 × 1 000 000 = 10¹¹ amal.
- Prefiks massivi: yangilashlar uchun 100 000 × 1 000 000 = 10¹¹ amal.
- Segment tree: 100 000 × 20 × 2 = 4 000 000 amal.

Segment tree ikkala amalni ham bir xil tezlikda bajaradi — shu uchun u muvozanatli tanlov.

---

## 3. Birinchi misol

Kod nima qiladi: \`[2, 5, 1, 4]\` massivi uchun yig'indi daraxtini quradi.

\`\`\`javascript
const arr = [2, 5, 1, 4];
const tree = new Array(arr.length * 4).fill(0);      // har tugun uchun joy

function build(node, left, right) {                  // [left, right] oraliq
  if (left === right) {                              // barg — bitta element
    tree[node] = arr[left];
    return;
  }
  const mid = Math.floor((left + right) / 2);        // oraliqni ikkiga bo'lamiz
  build(node * 2, left, mid);                        // chap farzand
  build(node * 2 + 1, mid + 1, right);               // o'ng farzand
  tree[node] = tree[node * 2] + tree[node * 2 + 1];  // yig'indini yuqoriga yozamiz
}

build(1, 0, arr.length - 1);
console.log(tree.slice(1, 8)); // Natija: [12, 7, 5, 2, 5, 1, 4]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`new Array(arr.length * 4)\` — daraxt uchun zaxira joy. Har tugunga indeks kerak, va indekslar 1 dan boshlanadi.
- \`build(node, left, right)\` — \`node\` tuguni \`left..right\` oraliqni ifodalaydi.
- \`if (left === right)\` — oraliqda bitta element qoldi. Bu **barg**, unga massiv qiymati yoziladi.
- \`build(node * 2, ...)\` — chap farzand indeksi har doim \`node * 2\`.
- \`build(node * 2 + 1, ...)\` — o'ng farzand indeksi \`node * 2 + 1\`.
- \`mid = Math.floor((left + right) / 2)\` — oraliq o'rtasi. Chap qism \`left..mid\`, o'ng qism \`mid + 1..right\`.
- \`tree[node] = tree[node * 2] + tree[node * 2 + 1]\` — farzandlar tayyor bo'lgach, ota tugun ularni birlashtiradi. Rekursiya tufayli bu qator bargdan ildizga qarab ishlaydi.

Indekslar 1 dan boshlangani muhim: agar ildiz 0 bo'lsa, chap farzandi ham \`0 * 2 = 0\` bo'lib qoladi va daraxt buziladi.

---

## 5. Qadamma-qadam

\`build(1, 0, 3)\` uchun:

| Qadam | node | oraliq | Amal |
|---|---|---|---|
| 1 | 1 | 0..3 | mid = 1, chapga ketadi |
| 2 | 2 | 0..1 | mid = 0, chapga ketadi |
| 3 | 4 | 0..0 | barg: tree[4] = 2 |
| 4 | 5 | 1..1 | barg: tree[5] = 5 |
| 5 | 2 | 0..1 | tree[2] = 2 + 5 = 7 |
| 6 | 3 | 2..3 | mid = 2, barglar: tree[6] = 1, tree[7] = 4 |
| 7 | 3 | 2..3 | tree[3] = 1 + 4 = 5 |
| 8 | 1 | 0..3 | tree[1] = 7 + 5 = 12 |

Yakuniy massiv: \`[_, 12, 7, 5, 2, 5, 1, 4]\` (0-indeks ishlatilmaydi). Qurish vaqti O(n), daraxt balandligi O(log n).

---

## 6. Yana bitta misol

Endi daraxtdan **oraliq yig'indisini** o'qiymiz. Birinchi misoldan farqi: daraxt qurilmaydi, undan javob olinadi.

\`\`\`javascript
function query(node, left, right, ql, qr) {
  if (qr < left || right < ql) return 0;                  // oraliqdan tashqarida
  if (ql <= left && right <= qr) return tree[node];       // to'liq ichida — tayyor
  const mid = Math.floor((left + right) / 2);             // qismlarga bo'lamiz
  return query(node * 2, left, mid, ql, qr)
       + query(node * 2 + 1, mid + 1, right, ql, qr);
}

console.log(query(1, 0, 3, 1, 2)); // Natija: 6
\`\`\`

Uch holat bor: **tashqarida** (0 qo'shamiz), **to'liq ichida** (tayyor yig'indini olamiz), **qisman** (ikkala farzandga bo'lib so'raymiz). Shu tufayli faqat O(log n) tugun ko'riladi.

### Yangilash

Bitta element o'zgarsa, undan ildizgacha bo'lgan yo'ldagi tugunlar qayta hisoblanadi:

\`\`\`javascript
function update(node, left, right, index, value) {
  if (left === right) {                              // bargni topdik
    tree[node] = value;
    return;
  }
  const mid = Math.floor((left + right) / 2);
  if (index <= mid) update(node * 2, left, mid, index, value);
  else update(node * 2 + 1, mid + 1, right, index, value);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];  // yuqoriga qaytamiz
}

update(1, 0, 3, 0, 10);      // arr[0] ni 10 ga o'zgartiramiz
console.log(query(1, 0, 3, 0, 3)); // Natija: 20
\`\`\`

Qaytishda \`tree[node]\` ni qayta hisoblashni unutish eng ko'p uchraydigan xato: barg yangilanadi, lekin ota tugunlar eski qiymatni saqlab qoladi.

---

## 7. Ko'p uchraydigan xatolar

❌ **1-xato: tashqari holatni tekshirmaslik.**

\`\`\`javascript
const tree = [0, 12, 7, 5, 2, 5, 1, 4];

function queryNoOverlap(node, left, right, ql, qr) {
  if (ql <= left && right <= qr) return tree[node];   // faqat "ichida" holati
  const mid = Math.floor((left + right) / 2);
  return queryNoOverlap(node * 2, left, mid, ql, qr)
       + queryNoOverlap(node * 2 + 1, mid + 1, right, ql, qr);
}

console.log(queryNoOverlap(1, 0, 3, 1, 2)); // Natija: RangeError: Maximum call stack size exceeded
\`\`\`

Sabab: bargga yetganda ham rekursiya to'xtamaydi (\`left === right\` bo'lsa ham \`mid\` o'sha bo'lib qolaveradi). Har doim avval "tashqaridami?" deb tekshirish shart.

❌ **2-xato: \`&&\` o'rniga \`||\` yozish.**

\`\`\`javascript
const tree = [0, 12, 7, 5, 2, 5, 1, 4];

function queryOr(node, left, right, ql, qr) {
  if (ql <= left || right <= qr) return tree[node];   // shart juda keng
  const mid = Math.floor((left + right) / 2);
  return queryOr(node * 2, left, mid, ql, qr) + queryOr(node * 2 + 1, mid + 1, right, ql, qr);
}

console.log(queryOr(1, 0, 3, 1, 2)); // Natija: 12 (noto'g'ri, 6 bo'lishi kerak)
\`\`\`

To'liq qamrov sharti \`ql <= left && right <= qr\`: **ikkala** chegara ham ichida bo'lishi kerak. Bittasi yetarli bo'lsa, butun massiv yig'indisi qaytadi.

❌ **3-xato: indeksni 0 dan boshlash.**

Ildiz 0 bo'lsa, chap farzandi \`0 * 2 = 0\` — ya'ni o'zi. Daraxt tugunlari ustma-ust yoziladi va so'rovlar noto'g'ri javob beradi. Ildiz indeksi har doim 1 bo'lsin.

---

## 8. Tekshiruv

1. \`[3, 1, 4, 2]\` uchun ildizda qanday qiymat turadi? Chap farzandda-chi?
2. \`[2, 5, 1, 4]\` daraxtida \`query(1, 0, 3, 2, 3)\` nima qaytaradi?
3. So'rov oraliqqa **hech qanday** tegmasa, nega 0 qaytariladi?

**Javoblar:**

1. Ildiz \`3 + 1 + 4 + 2 = 10\`; chap farzand \`0..1\` oralig'i uchun \`3 + 1 = 4\`.
2. \`1 + 4 = 5\` — \`[2..3]\` oralig'i \`tree[3]\` da tayyor turadi.
3. Yig'indi amalida 0 — qo'shishning **neytral** elementi: \`x + 0 = x\`. Shu sababli tegishli bo'lmagan tugunlar natijani o'zgartirmaydi.

---

## 9. Xulosa

- Segment tree har tugunda massivning bir bo'lagi uchun tayyor natijani saqlaydi.
- So'rov ham, yangilash ham O(log n); qurish O(n), xotira O(n).
- Ildiz indeksi 1, farzandlar \`2 * i\` va \`2 * i + 1\`; so'rovda uch holat: tashqarida, to'liq ichida, qisman.

**Keyingi darsda:** bir xil ishni ixchamroq bajaradigan **Fenwick daraxti** (Binary Indexed Tree) ni ko'ramiz.
`,

  exercises: [
    {
      id: "seg-1",
      title: "Daraxtni qurish",
      instruction:
        "`buildTree(arr)` funksiyasini yozing: yig'indi segment daraxtini qursin va tayyor `tree` massivini qaytarsin. Kelishuv: ildiz indeksi `1`, farzandlar `2 * i` va `2 * i + 1`, massiv hajmi `4 * arr.length`.",
      startingCode: "function buildTree(arr) {\n  // kodni yozing\n}",
      solution:
        "function buildTree(arr) {\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = arr[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  build(1, 0, arr.length - 1);\n  return tree;\n}",
      test: `const t1 = buildTree([2, 5, 1, 4]);
if (t1[1] !== 12) return "Test 1: ildiz 12 bo'lishi kerak, olindi " + t1[1];
if (t1[2] !== 7 || t1[3] !== 5) return "Test 2: o'rta tugunlar 7 va 5 bo'lishi kerak";
if (t1[4] !== 2 || t1[5] !== 5 || t1[6] !== 1 || t1[7] !== 4) return "Test 3: barglar 2, 5, 1, 4 bo'lishi kerak";
const t2 = buildTree([7]);
if (t2[1] !== 7) return "Test 4: bitta elementli massivda ildiz 7 bo'lishi kerak";
const t3 = buildTree([1, 2, 3, 4, 5]);
if (t3[1] !== 15) return "Test 5: besh element yig'indisi 15 bo'lishi kerak";
return null;`
    },
    {
      id: "seg-2",
      title: "Oraliq yig'indisi",
      instruction:
        "Tayyor yig'indi daraxtidan `ql..qr` oraliq yig'indisini qaytaruvchi `rangeSum(tree, n, ql, qr)` funksiyasini yozing (`n` — massiv uzunligi, chegaralar kiradi). Kelishuv avvalgidek: ildiz `1`.",
      startingCode: "function rangeSum(tree, n, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function rangeSum(tree, n, ql, qr) {\n  function query(node, left, right) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return query(node * 2, left, mid) + query(node * 2 + 1, mid + 1, right);\n  }\n  return query(1, 0, n - 1);\n}",
      test: `function __build(arr) {
  const tree = new Array(arr.length * 4).fill(0);
  function go(node, left, right) {
    if (left === right) { tree[node] = arr[left]; return; }
    const mid = Math.floor((left + right) / 2);
    go(node * 2, left, mid);
    go(node * 2 + 1, mid + 1, right);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
  }
  go(1, 0, arr.length - 1);
  return tree;
}
const a = [2, 5, 1, 4];
const t = __build(a);
const cases = [
  [a, t, 0, 3, 12],
  [a, t, 1, 2, 6],
  [a, t, 2, 3, 5],
  [a, t, 0, 0, 2],
  [a, t, 3, 3, 4]
];
for (let i = 0; i < cases.length; i++) {
  const [arrRef, treeRef, ql, qr, expected] = cases[i];
  const got = rangeSum(treeRef, arrRef.length, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
const b = [10, 20, 30, 40, 50];
const tb = __build(b);
if (rangeSum(tb, b.length, 1, 3) !== 90) return "Test 6 xato: [1..3] uchun 90 kutilgan";
return null;`
    },
    {
      id: "seg-3",
      title: "Nuqtani yangilash",
      instruction:
        "`pointUpdate(tree, n, index, value)` funksiyasini yozing: daraxtning `index` bargini `value` ga o'zgartirsin va yuqoridagi barcha yig'indilarni qayta hisoblasin. Funksiya hech narsa qaytarmasin — `tree` ni joyida o'zgartirsin.",
      startingCode: "function pointUpdate(tree, n, index, value) {\n  // kodni yozing\n}",
      solution:
        "function pointUpdate(tree, n, index, value) {\n  function update(node, left, right) {\n    if (left === right) {\n      tree[node] = value;\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    if (index <= mid) update(node * 2, left, mid);\n    else update(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  update(1, 0, n - 1);\n}",
      test: `function __build(arr) {
  const tree = new Array(arr.length * 4).fill(0);
  function go(node, left, right) {
    if (left === right) { tree[node] = arr[left]; return; }
    const mid = Math.floor((left + right) / 2);
    go(node * 2, left, mid);
    go(node * 2 + 1, mid + 1, right);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
  }
  go(1, 0, arr.length - 1);
  return tree;
}
const t1 = __build([2, 5, 1, 4]);
pointUpdate(t1, 4, 0, 10);
if (t1[1] !== 20) return "Test 1 xato: ildiz 20 bo'lishi kerak, olindi " + t1[1];
if (t1[4] !== 10) return "Test 2 xato: barg yangilanmadi";
const t2 = __build([2, 5, 1, 4]);
pointUpdate(t2, 4, 3, 0);
if (t2[1] !== 8) return "Test 3 xato: 2 + 5 + 1 + 0 = 8 kutilgan, olindi " + t2[1];
const t3 = __build([9]);
pointUpdate(t3, 1, 0, 4);
if (t3[1] !== 4) return "Test 4 xato: bitta elementli daraxt yangilanmadi";
const t4 = __build([1, 2, 3, 4, 5]);
pointUpdate(t4, 5, 4, 10);
if (t4[1] !== 20) return "Test 5 xato: oxirgi element yangilangach 20 kutilgan";
return null;`
    },
    {
      id: "seg-4",
      title: "Array ustida yig'indi",
      instruction:
        "`sumRange(arr, ql, qr)` funksiyasini yozing: ichida segment daraxtini qurib, so'ng `ql..qr` oraliq yig'indisini qaytarsin. Massiv o'zgarmasin.",
      startingCode: "function sumRange(arr, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function sumRange(arr, ql, qr) {\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = arr[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  function query(node, left, right) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return query(node * 2, left, mid) + query(node * 2 + 1, mid + 1, right);\n  }\n  build(1, 0, arr.length - 1);\n  return query(1, 0, arr.length - 1);\n}",
      test: `const cases = [
  [[2, 5, 1, 4], 1, 2, 6],
  [[2, 5, 1, 4], 0, 3, 12],
  [[5], 0, 0, 5],
  [[1, 2, 3, 4, 5], 2, 2, 3],
  [[1, 2, 3, 4, 5], 0, 4, 15]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, ql, qr, expected] = cases[i];
  const copy = arr.slice();
  const got = sumRange(arr, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
  if (JSON.stringify(arr) !== JSON.stringify(copy)) return "Test " + (i + 1) + " xato: massiv o'zgardi";
}
return null;`
    },
    {
      id: "seg-5",
      title: "Maksimum daraxti",
      instruction:
        "`buildMaxTree(arr)` funksiyasini yozing: barglarda massiv qiymatlari, ota tugunlarda farzandlarining **maksimumi** bo'lsin. Kelishuv: ildiz `1`, farzandlar `2 * i` va `2 * i + 1`.",
      startingCode: "function buildMaxTree(arr) {\n  // kodni yozing\n}",
      solution:
        "function buildMaxTree(arr) {\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = arr[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n  build(1, 0, arr.length - 1);\n  return tree;\n}",
      test: `const t1 = buildMaxTree([2, 5, 1, 4]);
if (t1[1] !== 5) return "Test 1 xato: ildiz 5 bo'lishi kerak, olindi " + t1[1];
if (t1[2] !== 5 || t1[3] !== 4) return "Test 2 xato: o'rta tugunlar 5 va 4 bo'lishi kerak";
const t2 = buildMaxTree([9, 1, 1, 1, 3]);
if (t2[1] !== 9) return "Test 3 xato: eng katta element 9";
const t3 = buildMaxTree([3]);
if (t3[1] !== 3) return "Test 4 xato: bitta element";
return null;`
    },
    {
      id: "seg-6",
      title: "Oraliq maksimumi",
      instruction:
        "Maksimum daraxtidan `ql..qr` oraliqdagi eng katta qiymatni qaytaruvchi `rangeMax(tree, n, ql, qr)` funksiyasini yozing.",
      startingCode: "function rangeMax(tree, n, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function rangeMax(tree, n, ql, qr) {\n  function query(node, left, right) {\n    if (qr < left || right < ql) return -Infinity;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return Math.max(query(node * 2, left, mid), query(node * 2 + 1, mid + 1, right));\n  }\n  return query(1, 0, n - 1);\n}",
      test: `function __buildMax(arr) {
  const tree = new Array(arr.length * 4).fill(0);
  function go(node, left, right) {
    if (left === right) { tree[node] = arr[left]; return; }
    const mid = Math.floor((left + right) / 2);
    go(node * 2, left, mid);
    go(node * 2 + 1, mid + 1, right);
    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
  }
  go(1, 0, arr.length - 1);
  return tree;
}
const arr = [2, 5, 1, 4];
const t = __buildMax(arr);
const cases = [
  [0, 3, 5],
  [1, 2, 5],
  [2, 3, 4],
  [0, 0, 2],
  [3, 3, 4]
];
for (let i = 0; i < cases.length; i++) {
  const [ql, qr, expected] = cases[i];
  const got = rangeMax(t, arr.length, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
const t2 = __buildMax([1, 1, 1]);
if (rangeMax(t2, 3, 0, 2) !== 1) return "Test 6 xato: barcha elementlar teng bo'lsa 1 kutilgan";
return null;`
    },
    {
      id: "seg-7",
      title: "Array ustida maksimum",
      instruction:
        "`maxRange(arr, ql, qr)` funksiyasini yozing: ichida maksimum daraxtini qurib, `ql..qr` oraliqdagi eng katta qiymatni qaytarsin.",
      startingCode: "function maxRange(arr, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function maxRange(arr, ql, qr) {\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = arr[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);\n  }\n  function query(node, left, right) {\n    if (qr < left || right < ql) return -Infinity;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return Math.max(query(node * 2, left, mid), query(node * 2 + 1, mid + 1, right));\n  }\n  build(1, 0, arr.length - 1);\n  return query(1, 0, arr.length - 1);\n}",
      test: `const cases = [
  [[2, 5, 1, 4], 0, 3, 5],
  [[2, 5, 1, 4], 2, 3, 4],
  [[7], 0, 0, 7],
  [[3, 9, 2, 8, 1], 1, 3, 9],
  [[3, 9, 2, 8, 1], 2, 4, 8]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, ql, qr, expected] = cases[i];
  const got = maxRange(arr, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
return null;`
    },
    {
      id: "seg-8",
      title: "Juft sonlar soni",
      instruction:
        "`countEven(arr, ql, qr)` funksiyasini yozing: oraliqda nechta juft son borligini qaytarsin. Maslahat: daraxt bargiga sonning o'zi o'rniga `1` (juft) yoki `0` (toq) yozib, yig'indi daraxtidan foydalaning.",
      startingCode: "function countEven(arr, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function countEven(arr, ql, qr) {\n  const bits = arr.map((v) => (v % 2 === 0 ? 1 : 0));\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = bits[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  function query(node, left, right) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return query(node * 2, left, mid) + query(node * 2 + 1, mid + 1, right);\n  }\n  build(1, 0, arr.length - 1);\n  return query(1, 0, arr.length - 1);\n}",
      test: `const cases = [
  [[2, 3, 4, 7, 8], 0, 4, 3],
  [[2, 3, 4, 7, 8], 0, 1, 1],
  [[2, 3, 4, 7, 8], 3, 4, 1],
  [[1, 3, 5], 0, 2, 0],
  [[6], 0, 0, 1]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, ql, qr, expected] = cases[i];
  const got = countEven(arr, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
return null;`
    },
    {
      id: "seg-9",
      title: "Kvadratlar yig'indisi",
      instruction:
        "`sumOfSquares(arr, ql, qr)` funksiyasini yozing: oraliqdagi sonlarning kvadratlari yig'indisini qaytarsin. Daraxt bargiga sonning kvadratini yozing.",
      startingCode: "function sumOfSquares(arr, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function sumOfSquares(arr, ql, qr) {\n  const squares = arr.map((v) => v * v);\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = squares[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  function query(node, left, right) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return query(node * 2, left, mid) + query(node * 2 + 1, mid + 1, right);\n  }\n  build(1, 0, arr.length - 1);\n  return query(1, 0, arr.length - 1);\n}",
      test: `const cases = [
  [[2, 5, 1, 4], 0, 3, 46],
  [[2, 5, 1, 4], 1, 2, 26],
  [[3, 3], 0, 1, 18],
  [[1], 0, 0, 1],
  [[0, 2], 0, 1, 4]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, ql, qr, expected] = cases[i];
  const got = sumOfSquares(arr, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
return null;`
    },
    {
      id: "seg-10",
      title: "Yangilashlardan keyin so'rov",
      instruction:
        "`queryAfterUpdates(arr, updates, ql, qr)` funksiyasini yozing: daraxtni bir marta qurib, `updates` massividagi har bir `[index, value]` juftini ketma-ket qo'llasin, so'ng `ql..qr` oraliq yig'indisini qaytarsin.",
      startingCode: "function queryAfterUpdates(arr, updates, ql, qr) {\n  // kodni yozing\n}",
      solution:
        "function queryAfterUpdates(arr, updates, ql, qr) {\n  const tree = new Array(arr.length * 4).fill(0);\n  function build(node, left, right) {\n    if (left === right) {\n      tree[node] = arr[left];\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    build(node * 2, left, mid);\n    build(node * 2 + 1, mid + 1, right);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  function update(node, left, right, index, value) {\n    if (left === right) {\n      tree[node] = value;\n      return;\n    }\n    const mid = Math.floor((left + right) / 2);\n    if (index <= mid) update(node * 2, left, mid, index, value);\n    else update(node * 2 + 1, mid + 1, right, index, value);\n    tree[node] = tree[node * 2] + tree[node * 2 + 1];\n  }\n  function query(node, left, right) {\n    if (qr < left || right < ql) return 0;\n    if (ql <= left && right <= qr) return tree[node];\n    const mid = Math.floor((left + right) / 2);\n    return query(node * 2, left, mid) + query(node * 2 + 1, mid + 1, right);\n  }\n  build(1, 0, arr.length - 1);\n  for (const [index, value] of updates) {\n    update(1, 0, arr.length - 1, index, value);\n  }\n  return query(1, 0, arr.length - 1);\n}",
      test: `const cases = [
  [[2, 5, 1, 4], [[0, 10]], 0, 3, 20],
  [[2, 5, 1, 4], [[0, 10], [3, 0]], 0, 3, 16],
  [[2, 5, 1, 4], [], 1, 2, 6],
  [[2, 5, 1, 4], [[1, 0], [2, 0]], 1, 3, 4],
  [[7, 7], [[0, 1], [1, 2]], 0, 1, 3]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, updates, ql, qr, expected] = cases[i];
  const got = queryAfterUpdates(arr, updates, ql, qr);
  if (got !== expected) return "Test " + (i + 1) + " xato: kutilgan " + expected + ", olindi " + got;
}
return null;`
    }
  ],

  quizzes: [
    {
      id: "seg-q1",
      question: "Segment tree da so'rov va yangilash qanday murakkablikda bajariladi?",
      options: [
        "So'rov O(1), yangilash O(n)",
        "Ikkalasi ham O(log n)",
        "Ikkalasi ham O(n)",
        "So'rov O(n), yangilash O(1)"
      ],
      correctAnswer: 1,
      explanation:
        "Daraxt balandligi O(log n). Har ikkala amal ham ildizdan barggacha yoki kerakli tugunlargacha boradi, shuning uchun ikkalasi ham O(log n)."
    },
    {
      id: "seg-q2",
      question: "Nega daraxt uchun `4 * n` hajmli massiv olinadi?",
      options: [
        "Chunki har tugunga 4 ta farzand kerak",
        "Chunki tugunlar indekslari bo'sh joy qoldirib o'sadi va 4n barcha holatga yetadi",
        "Chunki massiv uzunligi har doim 4 ga karrali",
        "Chunki JavaScript boshqa hajmni qabul qilmaydi"
      ],
      correctAnswer: 1,
      explanation:
        "Indekslar `2 * i` va `2 * i + 1` qoidasi bilan o'sadi, shuning uchun ba'zi indekslar ishlatilmay qoladi. `4 * n` barcha tugunlar uchun xavfsiz zaxira."
    },
    {
      id: "seg-q3",
      question: "`[2, 5, 1, 4]` uchun qurilgan daraxtda ildizda qanday qiymat turadi?",
      options: ["7", "12", "5", "4"],
      correctAnswer: 1,
      explanation: "Ildiz butun massivni ifodalaydi: 2 + 5 + 1 + 4 = 12."
    },
    {
      id: "seg-q4",
      question: "Ildiz indeksi `1` bo'lsa, `i` tugunning farzandlari qaysi indekslarda?",
      options: [
        "`i - 1` va `i + 1`",
        "`2 * i` va `2 * i + 1`",
        "`i / 2` va `i / 2 + 1`",
        "`2 * i - 1` va `2 * i`"
      ],
      correctAnswer: 1,
      explanation:
        "Ikkilik daraxtni massivda saqlashning standart qoidasi: chap farzand `2 * i`, o'ng farzand `2 * i + 1`."
    },
    {
      id: "seg-q5",
      question: "So'ralgan oraliq tugun oraliqini to'liq qamrab olsa, nima qilinadi?",
      options: [
        "Pastga davom etiladi",
        "Tugundagi tayyor qiymat qaytariladi",
        "0 qaytariladi",
        "Xato beriladi"
      ],
      correctAnswer: 1,
      explanation:
        "Aynan shu holat segment tree tezligining sababi: tayyor yig'indi qaytariladi va pastga tushilmaydi."
    },
    {
      id: "seg-q6",
      question: "Prefiks yig'indi massiviga nisbatan segment treening asosiy afzalligi nima?",
      options: [
        "So'rov tezroq",
        "Xotira kamroq",
        "Yangilash O(n) emas, O(log n)",
        "Kod qisqaroq"
      ],
      correctAnswer: 2,
      explanation:
        "Prefiks massivida bitta element o'zgarsa, keyingi barcha prefikslar qayta hisoblanadi (O(n)). Segment tree faqat yo'ldagi O(log n) tugunni yangilaydi."
    },
    {
      id: "seg-q7",
      question: "`qr < left || right < ql` sharti nimani bildiradi?",
      options: [
        "Tugun oraliq so'rovga to'liq kiradi",
        "Tugun oraliq so'rov bilan umuman kesishmaydi",
        "So'rov noto'g'ri kiritilgan",
        "Daraxt tugagan"
      ],
      correctAnswer: 1,
      explanation:
        "So'rov `ql..qr`, tugun `left..right`. Agar so'rov tugundan butunlay chapda yoki o'ngda bo'lsa, ular kesishmaydi va hissa 0 bo'ladi."
    },
    {
      id: "seg-q8",
      question: "`[2, 5, 1, 4]` daraxtida `[1..2]` oraliq yig'indisi nechchi?",
      options: ["6", "7", "5", "9"],
      correctAnswer: 0,
      explanation: "arr[1] = 5, arr[2] = 1, yig'indi 6."
    },
    {
      id: "seg-q9",
      question: "4 ta elementli massiv uchun daraxt nechchi qavatdan iborat?",
      options: ["2", "3", "4", "8"],
      correctAnswer: 1,
      explanation:
        "1-qavat: 0..3; 2-qavat: 0..1 va 2..3; 3-qavat: bitta elementlar. Jami 3 qavat (log₂4 + 1)."
    },
    {
      id: "seg-q10",
      question: "Yig'indi daraxtida qaysi tugunlar massivning bitta elementini ifodalaydi?",
      options: [
        "Ildiz",
        "Barcha ichki tugunlar",
        "Barglar",
        "Faqat chap farzandlar"
      ],
      correctAnswer: 2,
      explanation: "Barglarda `left === right` bo'ladi, ya'ni oraliq bitta elementdan iborat."
    },
    {
      id: "seg-q11",
      question: "Yangilashda nega ildizgacha qaytib, `tree[node]` ni qayta hisoblash kerak?",
      options: [
        "Chunki JavaScript massivni avtomatik yangilamaydi",
        "Chunki ota tugunlardagi yig'indi endi eski qiymatga asoslangan",
        "Chunki rekursiya to'xtamaydi",
        "Bu faqat maksimum daraxti uchun kerak"
      ],
      correctAnswer: 1,
      explanation:
        "Barg o'zgardi, lekin ota tugunlar eski yig'indini saqlab turibdi. Qaytishda har bir ota tugun farzandlaridan qayta hisoblanadi."
    },
    {
      id: "seg-q12",
      question: "Qaysi holatda segment tree ortiqcha murakkablik bo'ladi?",
      options: [
        "Ko'p so'rov va ko'p yangilash aralash kelganda",
        "Faqat bir marta umumiy yig'indi kerak bo'lganda",
        "Oraliqlar takrorlab so'ralganda",
        "Massiv juda katta bo'lganda"
      ],
      correctAnswer: 1,
      explanation:
        "Agar bitta umumiy yig'indi kerak bo'lsa, oddiy sikl O(n) bilan yetadi. Daraxt asosan takrorlanuvchi so'rov va yangilashlarda foyda beradi."
    }
  ]
};
