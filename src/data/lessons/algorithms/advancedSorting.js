export const advancedSorting = {
  id: "advancedSorting",
  title: "Murakkab Saralash Algoritmlari (Quick, Merge, Heap, Radix, Counting)",
  language: "javascript",

  theory: `## 1. Bu nima?

Kutubxonada ikkita javon bor. Ikkalasida ham kitoblar alifbo tartibida terilgan. Siz ularni bitta javonga qo'ymoqchisiz. Har safar ikki javonning eng chapdagi kitobini solishtirib, alifboda oldinroq turganini olasiz. Shu usul **birlashtirish (merge)** deyiladi.

**Murakkab saralash** — massivni mayda bo'laklarga bo'lib saralaydigan, keyin bo'laklarni birlashtiradigan algoritmlar guruhi. Ular oddiy saralashlardagi O(n²) o'rniga odatda **O(n log n)** vaqtda ishlaydi.

---

## 2. Nega kerak?

10 000 ta sonni pufakchali saralash (Bubble Sort) bilan tartiblash uchun taxminan 100 000 000 ta solishtirish kerak. Merge Sort uchun esa atigi 133 000 ta atrofida.

| Algoritm | O'rtacha vaqt | Eng yomon vaqt | Qo'shimcha xotira | Barqaror |
|---|---|---|---|---|
| Merge Sort | O(n log n) | O(n log n) | O(n) | Ha |
| Quick Sort | O(n log n) | O(n²) | O(log n) | Yo'q |
| Heap Sort | O(n log n) | O(n log n) | O(1) | Yo'q |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | Ha |
| Radix Sort | O(d · (n + b)) | O(d · (n + b)) | O(n + b) | Ha |

Bu yerda n — elementlar soni, k — qiymatlar oralig'i, d — raqamlar soni, b — raqamlar asosi (o'nlik sanoqda 10).

---

## 3. Birinchi misol

Ikki **allaqachon saralangan** massivni bitta saralangan massivga birlashtiramiz.

\`\`\`javascript
function merge(left, right) {
  const result = [];                                    // natija uchun bo'sh massiv
  let i = 0, j = 0;                                     // ikki massiv ko'rsatkichlari
  while (i < left.length && j < right.length) {         // ikkalasida ham element bor ekan
    result.push(left[i] <= right[j] ? left[i++] : right[j++]); // kichigini olamiz
  }
  return [...result, ...left.slice(i), ...right.slice(j)]; // qolgan elementlarni qo'shamiz
}

console.log(merge([3, 9, 27], [10, 38, 43]));           // Natija: [3, 9, 10, 27, 38, 43]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const result = []\` — birlashgan massiv shu yerda yig'iladi.
- \`let i = 0, j = 0\` — \`i\` chap massivning, \`j\` o'ng massivning joriy elementiga ishora qiladi.
- \`while (...)\` — ikkala massivda ham tekshirilmagan element qolgan ekan, davom etadi.
- \`left[i] <= right[j] ? ... : ...\` — ikki joriy elementdan kichigini tanlaydi. \`<=\` ishlatilgani uchun teng elementlarda chap massiv elementi oldin olinadi — bu **barqarorlikni (stability)** saqlaydi.
- \`slice(i)\` va \`slice(j)\` — bir massiv tugagach, ikkinchisining qolgan qismini o'zgartirmasdan qo'shadi.

---

## 5. Qadamma-qadam

\`mergeSort([38, 27, 43, 3])\` qanday bajariladi:

| Qadam | Bo'linish | Birlashish |
|---|---|---|
| 1 | \`[38, 27, 43, 3]\` | — |
| 2 | \`[38, 27]\` va \`[43, 3]\` | — |
| 3 | \`[38]\`, \`[27]\` → \`[38]\` va \`[27]\` | \`[27, 38]\` |
| 4 | \`[43]\`, \`[3]\` → \`[43]\` va \`[3]\` | \`[3, 43]\` |
| 5 | \`[27, 38]\` va \`[3, 43]\` | \`[3, 27, 38, 43]\` |

Har bir qavatda barcha elementlar bir marta ko'rib chiqiladi. Qavatlar soni log₂n ga teng. Shuning uchun umumiy vaqt O(n log n).

---

## 6. Yana bitta misol

Endi bo'lish va birlashtirishni birlashtirib, to'liq **Merge Sort** yozamiz.

\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;                 // 0 yoki 1 element — allaqachon saralangan
  const mid = Math.floor(arr.length / 2);          // massivni o'rtadan bo'lamiz
  const left = mergeSort(arr.slice(0, mid));       // chap yarmini rekursiv saralaymiz
  const right = mergeSort(arr.slice(mid));         // o'ng yarmini rekursiv saralaymiz
  return merge(left, right);                       // ikki saralangan yarmini birlashtiramiz
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // Natija: [3, 9, 10, 27, 38, 43, 82]
\`\`\`

Bu misol avvalgisidan bitta narsa bilan farq qiladi: massivni avval **bo'lib tashlaydi**, keyin birlashtiradi.

### Quick Sort — joyida saralash

Quick Sort massivni **pivot** (tayanch element) atrofida ikki qismga bo'ladi: pivotdan kichiklar chapga, kattalar o'ngga. Keyin ikkala qism alohida saralanadi. U yangi massiv yaratmaydi — shuning uchun **in-place** hisoblanadi.

\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return arr;                     // 0 yoki 1 element — tayyor
  const pivot = arr[high];                         // oxirgi elementni tayanch qilamiz
  let i = low;                                     // kichik elementlar chegarasi
  for (let j = low; j < high; j++) {               // pivotdan oldingi elementlar bo'ylab
    if (arr[j] < pivot) {                          // joriy element pivotdan kichikmi?
      [arr[i], arr[j]] = [arr[j], arr[i]];         // kichigini chapga suramiz
      i++;                                         // chegara o'ngga suriladi
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];       // pivotni o'z joyiga qo'yamiz
  quickSort(arr, low, i - 1);                      // chap qismni saralaymiz
  quickSort(arr, i + 1, high);                     // o'ng qismni saralaymiz
  return arr;
}

console.log(quickSort([7, 2, 9, 4]));              // Natija: [2, 4, 7, 9]
\`\`\`

\`quickSort([7, 2, 9, 4])\` uchun birinchi bo'linish:

| j | arr[j] | arr[j] < 4? | Massiv | i |
|---|---|---|---|---|
| 0 | 7 | Yo'q | \`[7, 2, 9, 4]\` | 0 |
| 1 | 2 | Ha | \`[2, 7, 9, 4]\` | 1 |
| 2 | 9 | Yo'q | \`[2, 7, 9, 4]\` | 1 |
| — | pivot 4 | — | \`[2, 4, 9, 7]\` | 1 |

Keyin chap qism \`[2]\` va o'ng qism \`[9, 7]\` alohida saralanadi. Natija: \`[2, 4, 7, 9]\`.

### Heap Sort va Counting Sort

**Heap Sort** massivdan maksimal uyum (max-heap) quradi. Eng katta element har safar ildizdan olinib, massiv oxiriga qo'yiladi. U ham in-place, lekin barqaror emas.

**Counting Sort** solishtirishni umuman ishlatmaydi. U har bir qiymat necha marta uchrashini sanaydi.

\`\`\`javascript
function countingSort(arr) {
  if (arr.length === 0) return [];                 // bo'sh massiv
  const max = Math.max(...arr);                    // eng katta qiymat
  const count = new Array(max + 1).fill(0);        // har qiymat uchun hisoblagich
  for (const n of arr) count[n]++;                 // uchrashlarini sanaymiz
  const result = [];                               // natija
  for (let v = 0; v <= max; v++) {                 // qiymatlar bo'ylab o'sish tartibida
    while (count[v] > 0) { result.push(v); count[v]--; } // necha marta bo'lsa, shuncha qo'shamiz
  }
  return result;
}

console.log(countingSort([4, 2, 2, 0, 3]));        // Natija: [0, 2, 2, 3, 4]
\`\`\`

**Radix Sort** sonlarni raqamlar bo'yicha saralaydi: avval birliklar, keyin o'nliklar, keyin yuzliklar. Har bir raqam uchun barqaror Counting Sort ishlatiladi.

---

## 7. Ko'p uchraydigan xatolar

❌ **1-xato: Quick Sortda to'xtash sharti yo'q.**

\`\`\`javascript
function quickSort(arr, low, high) {
  const pivot = arr[high];
  // ... bo'linish ...
  quickSort(arr, low, i - 1);
  quickSort(arr, i + 1, high);
}
\`\`\`

Natija: \`RangeError: Maximum call stack size exceeded\`. Sabab: \`low >= high\` bo'lganda ham funksiya o'zini chaqiraveradi. To'g'ri variant: funksiya boshida \`if (low >= high) return arr;\` yozish.

❌ **2-xato: Merge Sortda natijani qaytarmaslik.**

\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
\`\`\`

Bu kod \`undefined\` qaytaradi, chunki oxirgi qatorda \`return\` yo'q. To'g'ri variant: \`return merge(...)\`.

❌ **3-xato: Counting Sortni manfiy sonlarga qo'llash.**

\`\`\`javascript
const arr = [-2, 3, -1];
const max = Math.max(...arr);            // 3
const count = new Array(max + 1).fill(0); // indekslar 0..3
for (const n of arr) count[n]++;          // count[-2] va count[-1] massivdan tashqarida
\`\`\`

Manfiy qiymatlar hisobga olinmaydi, natija noto'g'ri chiqadi. Yechim: eng kichik qiymatni topib, barcha sonlardan ayirish (siljish kiritish).

---

## 8. Tekshiruv

1. \`[5, 2, 8, 1]\` massivini Merge Sort bilan saralang. Har bir bo'linish va birlashish qadamini yozing.
2. \`[5, 2, 8, 1, 7]\` massiviga Quick Sort qo'llang (pivot — oxirgi element). Birinchi bo'linishdan keyin massiv qanday ko'rinishda bo'ladi?
3. \`[4, 2, 2, 0]\` uchun Counting Sort hisoblagich massivi qanday bo'ladi? Natija qanday?

**Javoblar:**

1. \`[5, 2]\` va \`[8, 1]\` → \`[2, 5]\` va \`[1, 8]\` → \`[1, 2, 5, 8]\`.
2. \`[5, 2, 1, 7, 8]\` — pivot 7 o'z joyiga (indeks 3) o'tadi.
3. Hisoblagich: \`[1, 0, 2, 0, 1]\`; natija: \`[0, 2, 2, 4]\`.

---

## 9. Xulosa

- Merge Sort har doim O(n log n) ishlaydi va barqaror, lekin O(n) qo'shimcha xotira talab qiladi.
- Quick Sort odatda eng tez amaliy algoritm, lekin noto'g'ri pivot tanlansa O(n²) ga tushadi.
- Counting va Radix Sort solishtirmaydi; ular butun sonlar va kichik oraliq uchun juda tez.

**Keyingi darsda:** saralangan massivda ikkilik qidiruvni (Binary Search) va uning chegaralarini ko'ramiz.
`,

  exercises: [
  {
    "id": "adv-sort-1",
    "title": "Merge Sort",
    "instruction": "Sonlar massivini Merge Sort yordamida o'sish tartibida saralovchi `mergeSort(arr)` funksiyasini yozing. Funksiya yangi massiv qaytarsin, asl massiv o'zgarmasin.",
    "startingCode": "function mergeSort(arr) {\n  // kodni yozing\n}",
    "solution": "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(mergeSort([38, 27, 43, 3, 9, 82, 10])) === \"[3,9,10,27,38,43,82]\"; },\n    () => { return JSON.stringify(mergeSort([])) === \"[]\"; },\n    () => { const input = [5, 1, 4]; const out = mergeSort(input); return JSON.stringify(out) === \"[1,4,5]\" && JSON.stringify(input) === \"[5,1,4]\"; }\n];\nconst __desc = [\"Tasodifiy tartibdagi massiv saralanadi\", \"Bo'sh massiv bo'sh qaytadi\", \"Asl massiv o'zgarmaydi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-2",
    "title": "Quick Sort (in-place)",
    "instruction": "Massivni Quick Sort yordamida joyida (in-place) saralovchi `quickSort(arr)` funksiyasini yozing. Funksiya saralangan massivni qaytarsin.",
    "startingCode": "function quickSort(arr) {\n  // kodni yozing\n}",
    "solution": "function quickSort(arr, low = 0, high = arr.length - 1) {\n  if (low >= high) return arr;\n  const pivot = arr[high];\n  let i = low;\n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n      i++;\n    }\n  }\n  [arr[i], arr[high]] = [arr[high], arr[i]];\n  quickSort(arr, low, i - 1);\n  quickSort(arr, i + 1, high);\n  return arr;\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(quickSort([7, 2, 9, 4])) === \"[2,4,7,9]\"; },\n    () => { return JSON.stringify(quickSort([3, 1, 3, 2, 1])) === \"[1,1,2,3,3]\"; },\n    () => { return JSON.stringify(quickSort([])) === \"[]\"; }\n];\nconst __desc = [\"Oddiy massiv saralanadi\", \"Takrorlanuvchi qiymatlar to'g'ri ishlanadi\", \"Bo'sh massiv chegarasi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-3",
    "title": "Heap Sort",
    "instruction": "Maksimal uyum (max-heap) asosida ishlovchi `heapSort(arr)` funksiyasini yozing. Massivni joyida saralab, o'sha massivni qaytaring.",
    "startingCode": "function heapSort(arr) {\n  // kodni yozing\n}",
    "solution": "function heapSort(arr) {\n  const n = arr.length;\n  function heapify(size, i) {\n    let largest = i;\n    const left = 2 * i + 1;\n    const right = 2 * i + 2;\n    if (left < size && arr[left] > arr[largest]) largest = left;\n    if (right < size && arr[right] > arr[largest]) largest = right;\n    if (largest !== i) {\n      [arr[i], arr[largest]] = [arr[largest], arr[i]];\n      heapify(size, largest);\n    }\n  }\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);\n  for (let end = n - 1; end > 0; end--) {\n    [arr[0], arr[end]] = [arr[end], arr[0]];\n    heapify(end, 0);\n  }\n  return arr;\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(heapSort([12, 11, 13, 5, 6, 7])) === \"[5,6,7,11,12,13]\"; },\n    () => { return JSON.stringify(heapSort([1])) === \"[1]\"; },\n    () => { return JSON.stringify(heapSort([4, 4, 2, 9])) === \"[2,4,4,9]\"; }\n];\nconst __desc = [\"Tasodifiy massiv saralanadi\", \"Bitta elementli massiv\", \"Takrorlanuvchi qiymatlar\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-4",
    "title": "Counting Sort",
    "instruction": "Manfiy bo'lmagan butun sonlardan iborat massivni Counting Sort yordamida saralovchi `countingSort(arr)` funksiyasini yozing.",
    "startingCode": "function countingSort(arr) {\n  // kodni yozing\n}",
    "solution": "function countingSort(arr) {\n  if (arr.length === 0) return [];\n  const max = Math.max(...arr);\n  const count = new Array(max + 1).fill(0);\n  for (const n of arr) count[n]++;\n  const result = [];\n  for (let v = 0; v <= max; v++) {\n    while (count[v] > 0) {\n      result.push(v);\n      count[v]--;\n    }\n  }\n  return result;\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(countingSort([4, 2, 2, 0, 3])) === \"[0,2,2,3,4]\"; },\n    () => { return JSON.stringify(countingSort([7, 7, 7])) === \"[7,7,7]\"; },\n    () => { return JSON.stringify(countingSort([])) === \"[]\"; }\n];\nconst __desc = [\"Oddiy massiv saralanadi\", \"Barcha elementlar teng\", \"Bo'sh massiv chegarasi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-5",
    "title": "Radix Sort (LSD)",
    "instruction": "Manfiy bo'lmagan butun sonlarni raqamlar bo'yicha (LSD — eng kichik raqamdan boshlab) saralovchi `radixSort(arr)` funksiyasini yozing.",
    "startingCode": "function radixSort(arr) {\n  // kodni yozing\n}",
    "solution": "function radixSort(arr) {\n  if (arr.length === 0) return [];\n  const max = Math.max(...arr);\n  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {\n    const buckets = Array.from({ length: 10 }, () => []);\n    for (const n of arr) buckets[Math.floor(n / exp) % 10].push(n);\n    arr = buckets.flat();\n  }\n  return arr;\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(radixSort([170, 45, 75, 90, 802, 24, 2, 66])) === \"[2,24,45,66,75,90,170,802]\"; },\n    () => { return JSON.stringify(radixSort([5, 3, 8])) === \"[3,5,8]\"; },\n    () => { return JSON.stringify(radixSort([])) === \"[]\"; }\n];\nconst __desc = [\"Har xil uzunlikdagi sonlar saralanadi\", \"Bir xonali sonlar\", \"Bo'sh massiv chegarasi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-6",
    "title": "Barqaror saralash (stability)",
    "instruction": "Obyektlar massivini `age` maydoni bo'yicha o'sish tartibida saralovchi `stableSortByAge(people)` funksiyasini yozing. Teng yoshdagilar asl tartibini saqlab qolsin.",
    "startingCode": "function stableSortByAge(people) {\n  // kodni yozing\n}",
    "solution": "function stableSortByAge(people) {\n  if (people.length <= 1) return people.slice();\n  const mid = Math.floor(people.length / 2);\n  const left = stableSortByAge(people.slice(0, mid));\n  const right = stableSortByAge(people.slice(mid));\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i].age <= right[j].age ? left[i++] : right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}",
    "test": "const __checks = [\n    () => { const people = [{name: 'Ali', age: 20}, {name: 'Vali', age: 18}, {name: 'Sami', age: 20}]; const out = stableSortByAge(people).map(p => p.name).join(','); return out === 'Vali,Ali,Sami'; },\n    () => { const people = [{name: 'A', age: 30}, {name: 'B', age: 10}]; return stableSortByAge(people)[0].name === 'B'; }\n];\nconst __desc = [\"Teng yoshdagilar tartibi saqlanadi\", \"Ikki element to'g'ri almashtiriladi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-7",
    "title": "Counting Sort — manfiy sonlar bilan",
    "instruction": "Manfiy sonlarni ham qabul qiladigan `countingSortRange(arr)` funksiyasini yozing. Eng kichik qiymatni siljish (offset) sifatida ishlating.",
    "startingCode": "function countingSortRange(arr) {\n  // kodni yozing\n}",
    "solution": "function countingSortRange(arr) {\n  if (arr.length === 0) return [];\n  const min = Math.min(...arr);\n  const max = Math.max(...arr);\n  const count = new Array(max - min + 1).fill(0);\n  for (const n of arr) count[n - min]++;\n  const result = [];\n  for (let i = 0; i < count.length; i++) {\n    while (count[i] > 0) {\n      result.push(i + min);\n      count[i]--;\n    }\n  }\n  return result;\n}",
    "test": "const __checks = [\n    () => { return JSON.stringify(countingSortRange([3, -2, 0, -5, 3])) === \"[-5,-2,0,3,3]\"; },\n    () => { return JSON.stringify(countingSortRange([-1, -7, -3])) === \"[-7,-3,-1]\"; },\n    () => { return JSON.stringify(countingSortRange([])) === \"[]\"; }\n];\nconst __desc = [\"Manfiy va musbat qiymatlar aralash\", \"Faqat manfiy qiymatlar\", \"Bo'sh massiv chegarasi\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  },
  {
    "id": "adv-sort-8",
    "title": "K-eng katta element",
    "instruction": "Saralash yordamida massivdagi `k`-eng katta elementni qaytaruvchi `kthLargest(nums, k)` funksiyasini yozing. `k` 1 dan boshlanadi.",
    "startingCode": "function kthLargest(nums, k) {\n  // kodni yozing\n}",
    "solution": "function kthLargest(nums, k) {\n  const sorted = [...nums].sort((a, b) => b - a);\n  return sorted[k - 1];\n}",
    "test": "const __checks = [\n    () => { return kthLargest([3, 2, 1, 5, 6, 4], 2) === 5; },\n    () => { return kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) === 4; },\n    () => { return kthLargest([1], 1) === 1; }\n];\nconst __desc = [\"Ikkinchi eng katta element 5\", \"Takrorlanishlar hisobga olinadi\", \"Bitta elementli massiv\"];\nfor (let i = 0; i < __checks.length; i++) {\n  if (!__checks[i]()) return 'Test ' + (i + 1) + ' muvaffaqiyatsiz: ' + __desc[i];\n}\nreturn null;"
  }
],

  quizzes: [
  {
    "id": "adv-sort-q1",
    "question": "Merge Sortning eng yomon holatdagi vaqt murakkabligi qanday?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(log n)"
    ],
    "correctAnswer": 1,
    "explanation": "Merge Sort massivni har safar teng ikkiga bo'ladi (log n qavat) va har qavatda barcha elementlarni bir marta ko'rib chiqadi (n ta). Shuning uchun har doim O(n log n)."
  },
  {
    "id": "adv-sort-q2",
    "question": "Quick Sort qaysi holatda O(n²) vaqtda ishlaydi?",
    "options": [
      "Massiv allaqachon saralangan va pivot oxirgi element bo'lsa",
      "Massiv bo'sh bo'lsa",
      "Barcha elementlar har xil bo'lsa",
      "Pivot o'rtadagi element bo'lsa"
    ],
    "correctAnswer": 0,
    "explanation": "Saralangan massivda oxirgi element har safar eng katta bo'ladi. Bo'linish bir tomonga og'ib, rekursiya chuqurligi n ga yetadi va vaqt O(n²) bo'ladi."
  },
  {
    "id": "adv-sort-q3",
    "question": "Qaysi algoritm barqaror (stable) hisoblanadi?",
    "options": [
      "Quick Sort",
      "Heap Sort",
      "Merge Sort",
      "Tanlov bo'yicha saralash (Selection Sort)"
    ],
    "correctAnswer": 2,
    "explanation": "Merge Sort birlashtirishda teng elementlardan chap massivdagisini avval oladi, shuning uchun ularning asl tartibi saqlanadi."
  },
  {
    "id": "adv-sort-q4",
    "question": "Counting Sort qanday ma'lumotlar uchun mos?",
    "options": [
      "Ixtiyoriy obyektlar uchun",
      "Kichik oraliqdagi butun sonlar uchun",
      "Faqat matnlar uchun",
      "Faqat kasr sonlar uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Counting Sort qiymatlar necha marta uchrashini sanaydi. Shu sababli qiymatlar oralig'i (k) kichik bo'lgan butun sonlar uchun samarali."
  },
  {
    "id": "adv-sort-q5",
    "question": "Heap Sortning qo'shimcha xotira murakkabligi qanday?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n²)"
    ],
    "correctAnswer": 2,
    "explanation": "Heap Sort massivning o'zida uyum quradi va elementlarni joyida almashtiradi. Faqat bir nechta vaqtinchalik o'zgaruvchilar kerak, shuning uchun O(1)."
  },
  {
    "id": "adv-sort-q6",
    "question": "Radix Sortda nega har bir raqam uchun barqaror saralash ishlatiladi?",
    "options": [
      "Xotirani tejash uchun",
      "Oldingi raqamlar bo'yicha hosil bo'lgan tartibni saqlash uchun",
      "Rekursiyani oldini olish uchun",
      "Taqqoslashlarni ko'paytirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Keyingi raqam bo'yicha saralashda oldingi raqamlar tartibi buzilmasligi kerak. Barqaror saralash aynan shu tartibni saqlaydi."
  },
  {
    "id": "adv-sort-q7",
    "question": "`merge([3, 9], [1, 7])` qanday natija qaytaradi?",
    "options": [
      "[1, 3, 7, 9]",
      "[3, 9, 1, 7]",
      "[1, 7, 3, 9]",
      "[9, 7, 3, 1]"
    ],
    "correctAnswer": 0,
    "explanation": "Har qadamda ikki massivning joriy elementidan kichigi olinadi: 1, keyin 3, keyin 7, keyin 9."
  },
  {
    "id": "adv-sort-q8",
    "question": "Quick Sortda pivotdan teng elementlar qaysi tomonga o'tishi muhimmi?",
    "options": [
      "Muhim emas, natija baribir to'g'ri",
      "Muhim, chunki teng elementlar cheksiz rekursiyaga olib kelishi mumkin",
      "Faqat matnlar uchun muhim",
      "Faqat 10 tadan ko'p elementda muhim"
    ],
    "correctAnswer": 1,
    "explanation": "Agar bo'linishda hech bo'lmaganda bitta element pivotdan ajralmasa, rekursiya bir xil chegaralar bilan takrorlanib, stack overflow bo'lishi mumkin."
  }
]
};
