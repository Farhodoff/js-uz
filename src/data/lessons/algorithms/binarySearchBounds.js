export const binarySearchBounds = {
  id: "binarySearchBounds",
  title: "Ikkilik Qidiruv Chegaralari (Lower Bound, Upper Bound)",
  language: "javascript",

  theory: `## 1. Bu nima?

Poyezd jadvalida bir nechta reys bir xil vaqtda jo'naydi. Sizga "soat 10:00 dan oldin bo'lmagan **birinchi** reys qaysi?" deb savol berildi. Siz jadvalning o'rtasidan boshlab, kerakli vaqtdan oldinmi yoki keyinmi ekanini tekshirib, har safar yarmini tashlab ketasiz.

**Chegaraviy ikkilik qidiruv** — saralangan massivda shartni qanoatlantiradigan **birinchi** o'rinni topadigan usul. Oddiy ikkilik qidiruv bitta mos elementni topsa, bu usul **chegarani** topadi: birinchi uchrash, oxirgi uchrash yoki qo'shish joyi.

---

## 2. Nega kerak?

Oddiy \`binarySearch\` faqat "qiymat bormi?" degan savolga javob beradi. Teng elementlar bo'lsa, u **qaysi** nusxani topishini kafolatlamaydi:

Masalan, \`[1, 3, 3, 3, 7]\` massivda oddiy \`binarySearch\` 3 uchun 1, 2 yoki 3-indekslardan birini qaytarishi mumkin.

Amalda esa ko'pincha aniq chegara kerak:

- Takrorlanuvchi qiymatlarning **birinchi** indeksi.
- **Oxirgi** indeksi va umumiy soni.
- Qiymat bo'lmasa, uni **qayerga qo'shish** kerakligi.
- "Targetdan katta birinchi element" qaysi biri.

Bularning barchasi bitta usul bilan topiladi: qidiruvni tenglikka emas, **shartga** asoslab.

---

## 3. Birinchi misol

\`lowerBound(arr, target)\` — massivda \`target\` dan kichik bo'lmagan **birinchi** elementning indeksini qaytaradi.

\`\`\`javascript
function lowerBound(arr, target) {
  let left = 0;                              // qidiruv boshi
  let right = arr.length;                    // qidiruv oxiri (ochiq)
  while (left < right) {                     // oraliq bo'sh emas
    const mid = Math.floor((left + right) / 2); // o'rtani topamiz
    if (arr[mid] < target) left = mid + 1;   // o'rtacha kichik — o'ngga
    else right = mid;                        // aks holda — chapga
  }
  return left;                               // birinchi mos index
}

console.log(lowerBound([1, 3, 3, 3, 7], 3)); // Natija: 1
console.log(lowerBound([1, 3, 3, 3, 7], 4)); // Natija: 4
console.log(lowerBound([1, 3, 3, 3, 7], 9)); // Natija: 5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`left = 0\` — qidiruv shu indeksdan boshlanadi.
- \`right = arr.length\` — o'ng chegara **ochiq**: u massivdan tashqarida turishi mumkin. Shuning uchun massivda targetdan katta element bo'lmasa, javob \`arr.length\` bo'ladi.
- \`while (left < right)\` — oraliqda kamida bitta element qolgan ekan davom etadi.
- \`arr[mid] < target\` — o'rtadagi element targetdan kichik bo'lsa, javob undan keyin turishi aniq. Shuning uchun \`left = mid + 1\`.
- \`else right = mid\` — aks holda \`mid\` ning o'zi javob bo'lishi mumkin, shuning uchun uni tashlab yubormaymiz.
- \`return left\` — tsikl tugaganda \`left === right\` bo'ladi va u birinchi mos indeksni ko'rsatadi.

---

## 5. Qadamma-qadam

\`lowerBound([1, 3, 3, 3, 7], 3)\` uchun:

| Qadam | left | right | mid | arr[mid] | arr[mid] < 3? | Yangi oraliq |
|---|---|---|---|---|---|---|
| 1 | 0 | 5 | 2 | 3 | Yo'q | left=0, right=2 |
| 2 | 0 | 2 | 1 | 3 | Yo'q | left=0, right=1 |
| 3 | 0 | 1 | 0 | 1 | Ha | left=1, right=1 |
| 4 | 1 | 1 | — | — | — | Tsikl tugadi, javob: 1 |

Har qadamda oraliq ikki barobar qisqaradi. Shuning uchun vaqt murakkabligi O(log n), qo'shimcha xotira O(1).

---

## 6. Yana bitta misol

\`upperBound(arr, target)\` — \`target\` dan **katta** birinchi elementning indeksini qaytaradi. Birinchi misoldan farqi bitta: teng elementlar ham chapga emas, o'ngga suriladi.

\`\`\`javascript
function upperBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) left = mid + 1;  // tenglarni ham o'ngga
    else right = mid;                        // kattasi — chegaraga
  }
  return left;                               // birinchi katta index
}

console.log(upperBound([1, 3, 3, 3, 7], 3)); // Natija: 4
console.log(upperBound([1, 3, 3, 3, 7], 7)); // Natija: 5
\`\`\`

Endi takrorlanishlar sonini topish oson: \`count = upperBound(arr, 3) - lowerBound(arr, 3)\`, ya'ni \`4 - 1 = 3\`.

Xuddi shu formula bilan:

- **Birinchi uchrash:** \`lowerBound(arr, x)\`.
- **Oxirgi uchrash:** \`upperBound(arr, x) - 1\`.
- **Qo'shish joyi:** \`lowerBound(arr, x)\`.
- **Targetdan katta birinchi element:** \`upperBound(arr, x)\`.

---

## 7. Ko'p uchraydigan xatolar

❌ **1-xato: yopiq oraliqda \`right = mid - 1\` yozish.**

\`\`\`javascript
function lowerBoundWrong(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;      // javobning o'zini tashlab yuboradi
  }
  return left;
}
console.log(lowerBoundWrong([1, 3, 3], 3)); // Natija: 0 (noto'g'ri, 1 bo'lishi kerak)
\`\`\`

Sabab: \`arr[mid] >= target\` bo'lganda \`mid\` javob bo'lishi mumkin, uni \`mid - 1\` bilan tashlab yuborish noto'g'ri. Yechim: \`right = mid\` va oraliqni ochiq (\`right = arr.length\`) saqlash.

❌ **2-xato: \`Math.floor\` ni unutish.**

\`\`\`javascript
const mid = (left + right) / 2;   // masalan 2.5
console.log(arr[mid]);            // arr[2.5] === undefined
\`\`\`

Massiv indeksi butun son bo'lishi kerak. Har doim \`Math.floor((left + right) / 2)\` ishlatiladi.

❌ **3-xato: saralanmagan massivda ishlatish.**

Ikkilik qidiruv har qadamda "javob o'rtadan chapdami yoki o'ngdami?" deb taxmin qiladi. Massiv saralanmagan bo'lsa, bu taxmin buziladi va natija noto'g'ri chiqadi. Avval saralash shart.

---

## 8. Tekshiruv

1. \`lowerBound([2, 4, 4, 4, 9], 4)\` nima qaytaradi?
2. \`upperBound([2, 4, 4, 4, 9], 4)\` nima qaytaradi? 4 necha marta uchraydi?
3. \`[1, 5, 8]\` massiviga 6 ni qo'shish kerak bo'lsa, indeks nechchi bo'ladi?

**Javoblar:**

1. \`1\` — birinchi 4 shu indeksda.
2. \`4\`; uchrashlar soni \`4 - 1 = 3\`.
3. \`2\` — 6 dan katta birinchi element 8, uning indeksi 2. \`lowerBound([1, 5, 8], 6) === 2\`.

---

## 9. Xulosa

- Chegaraviy qidiruv tenglikni emas, \`arr[mid] < target\` shartini tekshiradi.
- \`right = mid\` va ochiq oraliq tufayli birinchi mos index yo'qolmaydi.
- Lower va upper bound orqali uchrashlar soni, oxirgi index va qo'shish joyi topiladi.

**Keyingi darsda:** "javob ustida ikkilik qidiruv" (binary search on answer) usulini ko'ramiz.
`,

  exercises: [
    {
      id: "bsb-1",
      title: "Lower Bound",
      instruction: "Saralangan `arr` massivda `target` dan kichik bo'lmagan birinchi elementning indeksini qaytaruvchi `lowerBound(arr, target)` funksiyasini yozing. Bunday element bo'lmasa, `arr.length` qaytsin.",
      startingCode: "function lowerBound(arr, target) {\n  // kodni yozing\n}",
      solution: "function lowerBound(arr, target) {\n  let left = 0;\n  let right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}",
      test: `const cases = [
  [[1, 3, 3, 3, 7], 3, 1],
  [[1, 3, 3, 3, 7], 4, 4],
  [[1, 3, 3, 3, 7], 9, 5],
  [[1, 3, 3, 3, 7], 0, 0],
  [[], 5, 0]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = lowerBound(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-2",
      title: "Upper Bound",
      instruction: "Saralangan `arr` massivda `target` dan qat'iy katta bo'lgan birinchi elementning indeksini qaytaruvchi `upperBound(arr, target)` funksiyasini yozing. Bunday element bo'lmasa, `arr.length` qaytsin.",
      startingCode: "function upperBound(arr, target) {\n  // kodni yozing\n}",
      solution: "function upperBound(arr, target) {\n  let left = 0;\n  let right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] <= target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}",
      test: `const cases = [
  [[1, 3, 3, 3, 7], 3, 4],
  [[1, 3, 3, 3, 7], 7, 5],
  [[1, 3, 3, 3, 7], 0, 0],
  [[2, 2, 2], 2, 3],
  [[], 4, 0]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = upperBound(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-3",
      title: "Uchrashlar soni",
      instruction: "Saralangan massivda `target` necha marta uchrashini qaytaruvchi `countOccurrences(arr, target)` funksiyasini yozing. Lower va upper bound orasidagi farqdan foydalaning.",
      startingCode: "function countOccurrences(arr, target) {\n  // kodni yozing\n}",
      solution: "function lowerBound(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}\nfunction upperBound(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] <= target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}\nfunction countOccurrences(arr, target) {\n  return upperBound(arr, target) - lowerBound(arr, target);\n}",
      test: `const cases = [
  [[1, 3, 3, 3, 7], 3, 3],
  [[1, 3, 3, 3, 7], 1, 1],
  [[1, 3, 3, 3, 7], 4, 0],
  [[2, 2, 2, 2], 2, 4],
  [[], 1, 0]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = countOccurrences(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-4",
      title: "Qo'shish joyi",
      instruction: "Saralangan `arr` massivga `target` ni tartibni buzmasdan qo'shish uchun kerakli indeksni qaytaruvchi `searchInsert(arr, target)` funksiyasini yozing.",
      startingCode: "function searchInsert(arr, target) {\n  // kodni yozing\n}",
      solution: "function searchInsert(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}",
      test: `const cases = [
  [[1, 3, 5, 6], 5, 2],
  [[1, 3, 5, 6], 2, 1],
  [[1, 3, 5, 6], 7, 4],
  [[1, 3, 5, 6], 0, 0],
  [[], 9, 0]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = searchInsert(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-5",
      title: "Targetdan katta birinchi element",
      instruction: "Saralangan massivda `target` dan katta birinchi elementning indeksini qaytaruvchi `firstGreater(arr, target)` funksiyasini yozing. Bunday element bo'lmasa, `-1` qaytsin.",
      startingCode: "function firstGreater(arr, target) {\n  // kodni yozing\n}",
      solution: "function firstGreater(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] <= target) left = mid + 1;\n    else right = mid;\n  }\n  return left < arr.length ? left : -1;\n}",
      test: `const cases = [
  [[1, 3, 3, 7], 3, 3],
  [[1, 3, 3, 7], 7, -1],
  [[4, 5, 6], 0, 0],
  [[2, 2, 2], 2, -1],
  [[], 1, -1]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = firstGreater(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-6",
      title: "Oxirgi uchrash",
      instruction: "Saralangan massivda `target` ning oxirgi uchrash indeksini qaytaruvchi `lastOccurrence(arr, target)` funksiyasini yozing. Qiymat bo'lmasa, `-1` qaytsin.",
      startingCode: "function lastOccurrence(arr, target) {\n  // kodni yozing\n}",
      solution: "function lastOccurrence(arr, target) {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] <= target) left = mid + 1;\n    else right = mid;\n  }\n  const index = left - 1;\n  return index >= 0 && arr[index] === target ? index : -1;\n}",
      test: `const cases = [
  [[1, 3, 3, 3, 7], 3, 3],
  [[1, 3, 3, 3, 7], 7, 4],
  [[1, 3, 3, 3, 7], 4, -1],
  [[5, 5], 5, 1],
  [[], 2, -1]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = lastOccurrence(arr, target);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsb-7",
      title: "Uchrashlar oralig'i",
      instruction: "Saralangan massivda `target` ning birinchi va oxirgi indekslarini `[first, last]` ko'rinishida qaytaruvchi `findRange(arr, target)` funksiyasini yozing. Qiymat bo'lmasa, `[-1, -1]` qaytsin.",
      startingCode: "function findRange(arr, target) {\n  // kodni yozing\n}",
      solution: "function findRange(arr, target) {\n  function bound(isUpper) {\n    let left = 0, right = arr.length;\n    while (left < right) {\n      const mid = Math.floor((left + right) / 2);\n      if (isUpper ? arr[mid] <= target : arr[mid] < target) left = mid + 1;\n      else right = mid;\n    }\n    return left;\n  }\n  const first = bound(false);\n  const after = bound(true);\n  if (first === after) return [-1, -1];\n  return [first, after - 1];\n}",
      test: `const cases = [
  [[1, 3, 3, 3, 7], 3, [1, 3]],
  [[1, 2, 3, 4], 4, [3, 3]],
  [[1, 2, 3, 4], 5, [-1, -1]],
  [[2, 2], 2, [0, 1]],
  [[], 1, [-1, -1]]
];
for (let i = 0; i < cases.length; i++) {
  const [arr, target, expected] = cases[i];
  const got = findRange(arr, target);
  if (JSON.stringify(got) !== JSON.stringify(expected)) return 'Test ' + (i + 1) + ' xato: kutilgan ' + JSON.stringify(expected) + ', olindi ' + JSON.stringify(got);
}
return null;`
    }
  ],

  quizzes: [
    {
      id: "bsb-q1",
      question: "`lowerBound(arr, target)` nimani qaytaradi?",
      options: [
        "Targetning istalgan uchrash indeksini",
        "Targetdan kichik bo'lmagan birinchi element indeksini",
        "Targetdan katta birinchi element indeksini",
        "Targetning oxirgi uchrash indeksini"
      ],
      correctAnswer: 1,
      explanation: "Lower bound `arr[i] >= target` shartini birinchi qanoatlantiradigan indeksni qaytaradi. Target bo'lmasa ham, u qo'shish joyini ko'rsatadi."
    },
    {
      id: "bsb-q2",
      question: "`upperBound` va `lowerBound` kodidagi asosiy farq nima?",
      options: [
        "upperBound `arr[mid] < target`, lowerBound `arr[mid] <= target` ishlatadi",
        "upperBound `arr[mid] <= target`, lowerBound `arr[mid] < target` ishlatadi",
        "upperBound rekursiv, lowerBound esa sikl bilan yoziladi",
        "Ular butunlay bir xil ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Upper bound teng elementlarni ham o'ngga suradi, shuning uchun `<=` ishlatiladi. Lower bound esa tenglikda to'xtaydi, shuning uchun `<`."
    },
    {
      id: "bsb-q3",
      question: "`[1, 3, 3, 3, 7]` massivda 3 necha marta uchraydi?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      explanation: "lowerBound = 1, upperBound = 4. Uchrashlar soni 4 - 1 = 3."
    },
    {
      id: "bsb-q4",
      question: "Nega `right` boshlang'ich qiymati `arr.length` bo'ladi?",
      options: [
        "Massiv indekslari 1 dan boshlanadi",
        "Javob massiv oxiridan keyin ham bo'lishi mumkin",
        "Bu xotirani tejaydi",
        "`arr.length - 1` yozish sintaksis xatosi beradi"
      ],
      correctAnswer: 1,
      explanation: "Ochiq oraliqda `right` javob bo'lishi mumkin bo'lgan eng katta indeksdan bitta keyin turadi. Target barcha elementlardan katta bo'lsa, javob `arr.length` bo'ladi."
    },
    {
      id: "bsb-q5",
      question: "Chegaraviy ikkilik qidiruvning vaqt murakkabligi qanday?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation: "Har qadamda oraliq ikki barobar qisqaradi: n → n/2 → n/4 ... Shuning uchun O(log n)."
    },
    {
      id: "bsb-q6",
      question: "`[1, 3, 3, 3, 7]` da 4 ni qo'shish joyi qaysi indeks?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "4 dan katta birinchi element — 7, uning indeksi 4. `lowerBound(arr, 4) === 4`."
    },
    {
      id: "bsb-q7",
      question: "Oddiy binary search takrorlanuvchi qiymatlarda nega yetarli emas?",
      options: [
        "U har doim -1 qaytaradi",
        "U qaysi nusxani topishini kafolatlamaydi",
        "U faqat 10 ta elementgacha ishlaydi",
        "U massivni o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "Oddiy binary search topilgan birinchi moslikda to'xtaydi. Teng elementlar orasidan qaysi biri qaytishi qidiruv yo'liga bog'liq."
    },
    {
      id: "bsb-q8",
      question: "`lowerBound` da `arr[mid] < target` sharti bajarilsa, keyingi qadam nima?",
      options: [
        "`right = mid`",
        "`left = mid + 1`",
        "`left = mid`",
        "`right = mid - 1`"
      ],
      correctAnswer: 1,
      explanation: "O'rtadagi element targetdan kichik bo'lsa, javob undan keyin turishi aniq. Shuning uchun chap chegara `mid + 1` ga suriladi."
    }
  ]
};
