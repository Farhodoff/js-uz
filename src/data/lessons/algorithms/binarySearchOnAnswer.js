export const binarySearchOnAnswer = {
  id: "binarySearchOnAnswer",
  title: "Javob Ustida Ikkilik Qidiruv (Binary Search on Answer)",
  language: "javascript",

  theory: `## 1. Bu nima?

Sizda 480 betlik kitob bor. Uni 12 kunda tugatish kerak. Savol: **kuniga eng kam necha bet o'qish kerak?**

Javobni to'g'ridan-to'g'ri hisoblaydigan formula yo'q. Lekin bitta oddiy tekshiruv bor: "kuniga 40 bet yetarlimi?" — ha. "50 bet-chi?" — ham ha. "30 bet?" — yo'q. Diqqat qiling: agar 40 bet yetarli bo'lsa, undan **katta** har qanday son ham albatta yetarli. Bu xossa **monotonlik** (monotonicity) deyiladi.

**Javob ustida ikkilik qidiruv** — javobning o'zi son bo'lganda, "shu son yetarlimi?" degan tekshiruvni ishlatib, mumkin bo'lgan qiymatlar orasidan eng kichigini topish usuli. Ya'ni ikkilik qidiruv massivda emas, **sonlar oralig'ida** o'tkaziladi.

Shart bitta: tekshiruv monoton bo'lishi kerak — kichik qiymatlar "yo'q", katta qiymatlar "ha" bo'lib joylashgan bo'lsin.

---

## 2. Nega kerak?

Yuqoridagi masalada 1 dan 480 gacha hamma sonni birma-bir sinash mumkin. Bu 480 ta tekshiruv. Kitob 1 000 000 bet bo'lsa — 1 000 000 ta tekshiruv. Sekin.

Ikkilik qidiruv esa har qadamda oraliqni yarmini tashlab ketadi. 480 qiymat uchun atigi **9 ta** tekshiruv yetadi (2⁹ = 512 > 480). 1 000 000 uchun 20 ta.

Muhim jihat: bu usulda masalaning javobini **taxmin qilish shart emas**. Faqat "bu qiymat bilan bajariladimi?" degan savolga javob bera olish kerak. Ko'p amaliy masalalar shunday tuzilgan:

- Kuniga eng kam nechta bet o'qish kerak?
- Mashina eng kam qanday yuk ko'tarishi kerak?
- Server eng kam qanday tezlikda ishlashi kerak?
- Necha kundan keyin natija chiqadi?

Bularning barchasida javob son, va "yetarlimi?" tekshiruvi monoton.

---

## 3. Birinchi misol

Kod nima qiladi: kitob hajmi va muddatga qarab, kuniga eng kam bet sonini topadi.

\`\`\`javascript
const totalPages = 480;                          // kitob necha bet
const days = 12;                                 // muddat necha kun

function canFinish(perDay) {                     // "shuncha bet yetarlimi?"
  return perDay * days >= totalPages;            // 12 kunda shuncha o'qiy oladimi?
}

function minPerDay() {
  let left = 1;                                  // eng kichik mumkin bo'lgan javob
  let right = totalPages;                        // eng katta mumkin bo'lgan javob
  while (left < right) {                         // oraliqda 1 tadan ko'p qiymat bor
    const mid = Math.floor((left + right) / 2);  // o'rtadagi qiymatni sinaymiz
    if (canFinish(mid)) right = mid;             // yetarli — kichikroqni qidiramiz
    else left = mid + 1;                         // yetmaydi — kattaroqqa o'tamiz
  }
  return left;                                   // eng kichik yetarli qiymat
}

console.log(minPerDay()); // Natija: 40
\`\`\`

---

## 4. Qator-baqator tahlil

- \`canFinish(perDay)\` — **tekshiruv funksiyasi** (predicate). U "ha" yoki "yo'q" qaytaradi; javobning o'zini hisoblamaydi. Butun usul shu funksiyaga tayanadi.
- \`return perDay * days >= totalPages\` — bitta jumlada butun shart: 12 kunda o'qiladigan bet soni kitobdan kam bo'lmasin. \`>=\` taqqoslash natijasi \`true\` yoki \`false\`.
- \`left = 1\` — javob 0 bo'lishi mumkin emas, ya'ni eng kichik tekshiriladigan qiymat 1.
- \`right = totalPages\` — kuniga kitobning hamma betini o'qish **har doim** yetarli. Shuning uchun yuqori chegara shu.
- \`while (left < right)\` — oraliqda kamida 2 ta qiymat qolgan ekan davom etadi. Bitta qiymat qolganda u javob.
- \`mid = Math.floor((left + right) / 2)\` — o'rtadagi butun son. \`Math.floor\` kasr qismini tashlaydi.
- \`if (canFinish(mid)) right = mid\` — \`mid\` yetarli bo'lsa, u javob bo'lishi mumkin, lekin undan kichigi ham bo'lishi mumkin. Shuning uchun \`mid\` ni tashlab yubormaymiz.
- \`else left = mid + 1\` — \`mid\` yetarli bo'lmasa, undan kichigi ham yetarli emas (monotonlik!). Shuning uchun \`mid + 1\` dan boshlaymiz.
- \`return left\` — tsikl tugaganda \`left === right\` bo'ladi va bu eng kichik yetarli qiymat.

---

## 5. Qadamma-qadam

\`minPerDay()\` uchun \`totalPages = 480\`, \`days = 12\`:

| Qadam | left | right | mid | canFinish(mid) | Yangi oraliq |
|---|---|---|---|---|---|
| 1 | 1 | 480 | 240 | 2880 >= 480 → ha | left=1, right=240 |
| 2 | 1 | 240 | 120 | 1440 → ha | left=1, right=120 |
| 3 | 1 | 120 | 60 | 720 → ha | left=1, right=60 |
| 4 | 1 | 60 | 30 | 360 → yo'q | left=31, right=60 |
| 5 | 31 | 60 | 45 | 540 → ha | left=31, right=45 |
| 6 | 31 | 45 | 38 | 456 → yo'q | left=39, right=45 |
| 7 | 39 | 45 | 42 | 504 → ha | left=39, right=42 |
| 8 | 39 | 42 | 40 | 480 → ha | left=39, right=40 |
| 9 | 39 | 40 | 39 | 468 → yo'q | left=40, right=40 |
| 10 | 40 | 40 | — | — | Tsikl tugadi, javob: 40 |

9 ta tekshiruv, 480 ta emas. Vaqt murakkabligi O(log n), qo'shimcha xotira O(1).

Diqqat qiling: 4-qadamda \`mid = 30\` yetmadi va biz \`left = 31\` qildik. Xato qilib \`left = mid\` yozsak, tsikl joyida qotib qolardi.

---

## 6. Yana bitta misol

Endi boblar har xil uzunlikda. Tekshiruv funksiyasi massiv bo'ylab yurib, necha kun kerakligini sanaydi. Birinchi misoldan farqi faqat shu: \`canFinish\` ichida sikl bor.

\`\`\`javascript
const chapters = [30, 20, 45, 15];                 // har bob necha bet
const limitDays = 3;                               // necha kunda tugatish kerak

function canFinishIn(perDay) {                     // "kuniga shuncha bet yetarlimi?"
  let usedDays = 1;                                // birinchi kundan boshlaymiz
  let today = 0;                                   // bugun o'qilgan betlar
  for (const pages of chapters) {
    if (pages > perDay) return false;              // bob bir kunga sig'masa — yo'q
    if (today + pages > perDay) {                  // sig'maydi — yangi kun ochamiz
      usedDays = usedDays + 1;
      today = 0;
    }
    today = today + pages;
  }
  return usedDays <= limitDays;                    // muddatga sig'dimi?
}

function minPagesPerDay() {
  let left = 1;
  let right = 0;
  for (const p of chapters) right = right + p;     // eng katta javob: hammasi bir kunda
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canFinishIn(mid)) right = mid;             // yetarli — pastga tushamiz
    else left = mid + 1;                           // yetmaydi — yuqoriga chiqamiz
  }
  return left;
}

console.log(minPagesPerDay()); // Natija: 50
\`\`\`

Tekshiruv: \`50\` bet/kun bilan 1-kun [30, 20] (50 bet), 2-kun [45], 3-kun [15] — 3 kun yetadi. \`49\` bet bilan 1-kun [30], 2-kun [20], 3-kun [45], 4-kun [15] — 4 kun kerak, muddat oshib ketadi.

Yuqori chegarani taxmin qilishning hojati yo'q: eng katta javob — barcha betlarni qo'shish (hammasini bir kunda o'qish).

---

## 7. Ko'p uchraydigan xatolar

❌ **1-xato: javobni tashlab yuborish (\`right = mid - 1\`).**

\`\`\`javascript
function minPerDayWrong() {
  let left = 1, right = 100;              // 100 bet, 3 kun
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * 3 >= 100) right = mid - 1;  // javobning o'zini tashlab yuboradi
    else left = mid + 1;
  }
  return left;
}
console.log(minPerDayWrong()); // Natija: 33 (noto'g'ri, 34 bo'lishi kerak)
\`\`\`

Sabab: \`mid\` yetarli bo'lganda u ham javob bo'lishi mumkin. Uni \`mid - 1\` bilan chetga chiqarib yuborish javobni yo'qotadi: 33 * 3 = 99, ya'ni 33 yetarli emas. To'g'risi: \`right = mid\`.

❌ **2-xato: yuqori chegara juda kichik.**

\`\`\`javascript
function minPerDaySmallCap() {
  let left = 1, right = 12;              // muddatni javob deb oldik
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * 12 >= 480) right = mid;
    else left = mid + 1;
  }
  return left;
}
console.log(minPerDaySmallCap()); // Natija: 12 (noto'g'ri, 40 bo'lishi kerak)
\`\`\`

Ikkilik qidiruv faqat o'zi ko'rgan oraliq ichidan javob qidiradi. Javob oraliqdan tashqarida qolsa, u hech qachon topilmaydi. Yuqori chegara **albatta yetarli** bo'lgan qiymat bo'lishi shart.

❌ **3-xato: ochiq oraliqni yopiq tsikl bilan aralashtirish.**

\`\`\`javascript
let left = 1, right = 480;
let steps = 0;
while (left <= right) {                  // yopiq shart, lekin right = mid
  const mid = Math.floor((left + right) / 2);
  if (mid * 12 >= 480) right = mid;      // right kamaymay qolishi mumkin
  else left = mid + 1;
  steps = steps + 1;
  if (steps > 100) break;                // cheksiz sikl demo uchun to'xtatildi
}
console.log(steps); // Natija: 101 — tsikl o'zi tugamaydi
\`\`\`

\`left === right === 40\` bo'lganda ham \`left <= right\` rost bo'lib qoladi, va \`right = mid\` o'zgarishsiz qaytadi. Yechim: yoki \`while (left < right)\`, yoki yopiq oraliqda \`right = mid - 1\`. Ikkalasini aralashtirmang.

Yana bitta muhim tekshiruv: monotonlik buzilgan bo'lsa, usul jim ravishda noto'g'ri javob beradi. Masalan tekshiruv "juft kunlarda yetarli, toq kunlarda yo'q" desa, ikkilik qidiruv ishonchsiz bo'ladi.

---

## 8. Tekshiruv

1. \`canFinish(40)\` va \`canFinish(39)\` nima qaytaradi (\`totalPages = 480\`, \`days = 12\`)?
2. \`[30, 20, 45, 15]\` va \`limitDays = 3\` uchun \`canFinishIn(45)\` nima qaytaradi? Nega?
3. Nega \`right = totalPages\` deb olish xavfsiz, lekin \`right = days\` deb olish xatarli?

**Javoblar:**

1. \`true\` (40 * 12 = 480) va \`false\` (39 * 12 = 468). Shuning uchun eng kichik yetarli qiymat 40.
2. \`false\`. 45 bet/kun bilan 1-kun [30], 2-kun [20], 3-kun [45], 4-kun [15] — 4 kun kerak, muddat esa 3.
3. \`totalPages\` — kuniga hamma betni o'qish har doim yetarli, ya'ni yuqori chegara kafolatlangan. \`days\` esa javob bilan hech qanday bog'liq emas; javob undan katta bo'lsa, oraliq javobni qamramaydi.

---

## 9. Xulosa

- Javob ustida ikkilik qidiruv massivda emas, **sonlar oralig'ida** o'tkaziladi.
- Usulning yuragi — monoton tekshiruv funksiyasi: "bu qiymat yetarlimi?".
- \`right = mid\` va \`left = mid + 1\` tufayli eng kichik yetarli qiymat yo'qolmaydi.

**Keyingi darsda:** oraliq yig'indisini tez hisoblaydigan **Segment Tree** tuzilmasini ko'ramiz.
`,

  exercises: [
    {
      id: "bsa-1",
      title: "Tekshiruv funksiyasi",
      instruction:
        "`totalPages` betli kitobni `days` kunda `perDay` bet o'qib tugatish mumkinmi, shuni `true`/`false` qilib qaytaruvchi `canFinish(totalPages, days, perDay)` funksiyasini yozing. Bu — javob ustida ikkilik qidiruvning tekshiruv funksiyasi.",
      startingCode:
        "function canFinish(totalPages, days, perDay) {\n  // kodni yozing\n}",
      solution:
        "function canFinish(totalPages, days, perDay) {\n  return perDay * days >= totalPages;\n}",
      test: `const cases = [
  [480, 12, 40, true],
  [480, 12, 39, false],
  [10, 3, 4, true],
  [10, 3, 3, false],
  [1, 1, 1, true]
];
for (let i = 0; i < cases.length; i++) {
  const [totalPages, days, perDay, expected] = cases[i];
  const got = canFinish(totalPages, days, perDay);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-2",
      title: "Eng kam bet soni",
      instruction:
        "`totalPages` betli kitobni `days` kunda tugatish uchun kuniga eng kam necha bet o'qish kerakligini qaytaruvchi `minPerDay(totalPages, days)` funksiyasini yozing. Ikkilik qidiruvni 1 dan `totalPages` gacha oraliqda o'tkazing.",
      startingCode:
        "function minPerDay(totalPages, days) {\n  // kodni yozing\n}",
      solution:
        "function minPerDay(totalPages, days) {\n  let left = 1;\n  let right = totalPages;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (mid * days >= totalPages) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [480, 12, 40],
  [100, 3, 34],
  [1, 1, 1],
  [10, 10, 1],
  [7, 2, 4],
  [1000000000, 1, 1000000000]
];
for (let i = 0; i < cases.length; i++) {
  const [totalPages, days, expected] = cases[i];
  const got = minPerDay(totalPages, days);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-3",
      title: "Boblar bo'yicha tekshiruv",
      instruction:
        "`chapters` massivida boblar betlari berilgan. Kuniga `perDay` bet o'qib, `limitDays` kun ichida tugatish mumkinmi? `canFinishIn(chapters, perDay, limitDays)` funksiyasini yozing. Bob tartibi o'zgarmaydi; bitta bob bir kunga sig'masa, javob `false`.",
      startingCode:
        "function canFinishIn(chapters, perDay, limitDays) {\n  // kodni yozing\n}",
      solution:
        "function canFinishIn(chapters, perDay, limitDays) {\n  let usedDays = 1;\n  let today = 0;\n  for (const pages of chapters) {\n    if (pages > perDay) return false;\n    if (today + pages > perDay) {\n      usedDays = usedDays + 1;\n      today = 0;\n    }\n    today = today + pages;\n  }\n  return usedDays <= limitDays;\n}",
      test: `const cases = [
  [[30, 20, 45, 15], 50, 3, true],
  [[30, 20, 45, 15], 49, 3, false],
  [[30, 20, 45, 15], 45, 3, false],
  [[5], 5, 1, true],
  [[6], 5, 3, false],
  [[1, 1, 1, 1], 2, 2, true]
];
for (let i = 0; i < cases.length; i++) {
  const [chapters, perDay, limitDays, expected] = cases[i];
  const got = canFinishIn(chapters, perDay, limitDays);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-4",
      title: "Eng kam sahifa",
      instruction:
        "`chapters` massivi va `limitDays` berilgan. Barcha boblarni muddatga sig'dirish uchun kuniga eng kam necha bet o'qish kerakligini qaytaruvchi `minPagesPerDay(chapters, limitDays)` funksiyasini yozing. Yuqori chegarani taxmin qilmang — barcha betlarni qo'shib oling.",
      startingCode:
        "function minPagesPerDay(chapters, limitDays) {\n  // kodni yozing\n}",
      solution:
        "function minPagesPerDay(chapters, limitDays) {\n  function fits(perDay) {\n    let usedDays = 1;\n    let today = 0;\n    for (const pages of chapters) {\n      if (pages > perDay) return false;\n      if (today + pages > perDay) {\n        usedDays = usedDays + 1;\n        today = 0;\n      }\n      today = today + pages;\n    }\n    return usedDays <= limitDays;\n  }\n  let left = 1;\n  let right = 0;\n  for (const p of chapters) right = right + p;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (fits(mid)) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [[30, 20, 45, 15], 3, 50],
  [[30, 20, 45, 15], 4, 45],
  [[10, 10, 10], 1, 30],
  [[1, 2, 3], 3, 3],
  [[100], 5, 100]
];
for (let i = 0; i < cases.length; i++) {
  const [chapters, limitDays, expected] = cases[i];
  const got = minPagesPerDay(chapters, limitDays);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-5",
      title: "Eng kam tezlik",
      instruction:
        "`piles` massivida uyumlar bor. Bir soatda `speed` dona yeyiladi (bitta uyumdan). Barcha uyumlarni `hours` soat ichida tugatish uchun eng kam tezlikni qaytaruvchi `minEatingSpeed(piles, hours)` funksiyasini yozing. Soat butun son; har uyum uchun kerakli soat `Math.ceil(pile / speed)`.",
      startingCode:
        "function minEatingSpeed(piles, hours) {\n  // kodni yozing\n}",
      solution:
        "function minEatingSpeed(piles, hours) {\n  let left = 1;\n  let right = 0;\n  for (const p of piles) if (p > right) right = p;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    let needed = 0;\n    for (const p of piles) needed = needed + Math.ceil(p / mid);\n    if (needed <= hours) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [[3, 6, 7, 11], 8, 4],
  [[30, 11, 23, 4, 20], 5, 30],
  [[30, 11, 23, 4, 20], 6, 23],
  [[1], 1, 1],
  [[100], 100, 1],
  [[5, 5, 5], 3, 5]
];
for (let i = 0; i < cases.length; i++) {
  const [piles, hours, expected] = cases[i];
  const got = minEatingSpeed(piles, hours);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-6",
      title: "Kema sig'imi",
      instruction:
        "`weights` massividagi yuklar `days` kun ichida tashilishi kerak. Kema bir kunda `days` marta emas, bir marta yuk ortadi, lekin bir kunda faqat bitta reys. Har reysda `capacity` dan oshmaydigan ketma-ket yuklarni olish mumkin. Eng kam `capacity` ni qaytaruvchi `shipCapacity(weights, days)` funksiyasini yozing.",
      startingCode:
        "function shipCapacity(weights, days) {\n  // kodni yozing\n}",
      solution:
        "function shipCapacity(weights, days) {\n  let left = 0;\n  let right = 0;\n  for (const w of weights) {\n    right = right + w;\n    if (w > left) left = w;\n  }\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    let used = 1;\n    let load = 0;\n    for (const w of weights) {\n      if (load + w > mid) {\n        used = used + 1;\n        load = 0;\n      }\n      load = load + w;\n    }\n    if (used <= days) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 15],
  [[3, 2, 2, 4, 1, 4], 3, 6],
  [[1, 2, 3, 1, 1], 4, 3],
  [[10], 1, 10],
  [[7, 7], 1, 14],
  [[5, 5, 5, 5], 4, 5]
];
for (let i = 0; i < cases.length; i++) {
  const [weights, days, expected] = cases[i];
  const got = shipCapacity(weights, days);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-7",
      title: "Bo'laklarga bo'lish",
      instruction:
        "`nums` massivini tartibni buzmasdan `k` ta bo'lakka bo'ling. Bo'laklarning yig'indilari orasidagi eng kattasini imkon qadar kichik qiluvchi `minLargestSum(nums, k)` funksiyasini yozing. Elementlar noldan kichik emas, shuning uchun javob `0` bo'lishi ham mumkin.",
      startingCode:
        "function minLargestSum(nums, k) {\n  // kodni yozing\n}",
      solution:
        "function minLargestSum(nums, k) {\n  let left = 0;\n  let right = 0;\n  for (const n of nums) {\n    right = right + n;\n    if (n > left) left = n;\n  }\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    let parts = 1;\n    let sum = 0;\n    for (const n of nums) {\n      if (sum + n > mid) {\n        parts = parts + 1;\n        sum = 0;\n      }\n      sum = sum + n;\n    }\n    if (parts <= k) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [[7, 2, 5, 10, 8], 2, 18],
  [[1, 2, 3, 4, 5], 2, 9],
  [[1, 4, 4], 3, 4],
  [[1], 1, 1],
  [[0, 0, 0], 2, 0],
  [[10, 20, 30], 3, 30]
];
for (let i = 0; i < cases.length; i++) {
  const [nums, k, expected] = cases[i];
  const got = minLargestSum(nums, k);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-8",
      title: "Birinchi nosoz versiya",
      instruction:
        "`1` dan `n` gacha versiyalar bor. `isBad(v)` funksiyasi versiya nosoz bo'lsa `true` qaytaradi. Nosoz versiyadan keyingi hamma versiya ham nosoz. Birinchi nosoz versiyani qaytaruvchi `firstBadVersion(n, isBad)` funksiyasini yozing.",
      startingCode:
        "function firstBadVersion(n, isBad) {\n  // kodni yozing\n}",
      solution:
        "function firstBadVersion(n, isBad) {\n  let left = 1;\n  let right = n;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (isBad(mid)) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [5, (v) => v >= 4, 4],
  [1, () => true, 1],
  [100, (v) => v >= 1, 1],
  [9, (v) => v >= 9, 9],
  [1000000, (v) => v >= 999999, 999999]
];
for (let i = 0; i < cases.length; i++) {
  const [n, isBad, expected] = cases[i];
  const got = firstBadVersion(n, isBad);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-9",
      title: "Butun ildiz",
      instruction:
        "`Math.sqrt` ishlatmasdan, `n` sonining butun qismli kvadrat ildizini qaytaruvchi `integerSqrt(n)` funksiyasini yozing. Ya'ni kvadrati `n` dan katta bo'lmagan eng katta butun son. `n` noldan kichik emas.",
      startingCode:
        "function integerSqrt(n) {\n  // kodni yozing\n}",
      solution:
        "function integerSqrt(n) {\n  let left = 0;\n  let right = n;\n  while (left < right) {\n    const mid = Math.floor((left + right + 1) / 2);\n    if (mid * mid <= n) left = mid;\n    else right = mid - 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 2],
  [15, 3],
  [16, 4],
  [1000000, 1000],
  [2147395599, 46339]
];
for (let i = 0; i < cases.length; i++) {
  const [n, expected] = cases[i];
  const got = integerSqrt(n);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    },
    {
      id: "bsa-10",
      title: "Umumiy shakl: birinchi true",
      instruction:
        "`1` dan `n` gacha sonlar berilgan. `check(x)` funksiyasi qaysidir sondan boshlab `true` qaytaradi. `check` birinchi marta `true` bo'ladigan sonni qaytaruvchi `firstTrue(n, check)` funksiyasini yozing. Hech qayerda `true` bo'lmasa, `n + 1` qaytsin.",
      startingCode:
        "function firstTrue(n, check) {\n  // kodni yozing\n}",
      solution:
        "function firstTrue(n, check) {\n  let left = 1;\n  let right = n + 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (check(mid)) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}",
      test: `const cases = [
  [5, (x) => x >= 3, 3],
  [5, () => true, 1],
  [5, () => false, 6],
  [1, () => true, 1],
  [100, (x) => x >= 100, 100],
  [7, (x) => x >= 8, 8]
];
for (let i = 0; i < cases.length; i++) {
  const [n, check, expected] = cases[i];
  const got = firstTrue(n, check);
  if (got !== expected) return 'Test ' + (i + 1) + ' xato: kutilgan ' + expected + ', olindi ' + got;
}
return null;`
    }
  ],

  quizzes: [
    {
      id: "bsa-q1",
      question: "Javob ustida ikkilik qidiruvning ishlashi uchun qanday shart bajarilishi kerak?",
      options: [
        "Massiv saralangan bo'lishi kerak",
        "Tekshiruv funksiyasi monoton bo'lishi kerak",
        "Javob har doim juft son bo'lishi kerak",
        "Mashina resursi qidiruv vaqtida o'zgarmasligi kerak"
      ],
      correctAnswer: 1,
      explanation:
        "Bu usul massivda emas, qiymatlar oralig'ida ishlaydi. Uning sharti — 'bu qiymat yetarlimi?' tekshiruvi bir nuqtadan keyin doim 'ha' bo'lishi (yoki teskarisi)."
    },
    {
      id: "bsa-q2",
      question: "`canFinish(40)` va `canFinish(39)` uchun (480 bet, 12 kun) qaysi javob to'g'ri?",
      options: [
        "true, false",
        "false, true",
        "true, true",
        "false, false"
      ],
      correctAnswer: 0,
      explanation: "40 * 12 = 480 yetadi; 39 * 12 = 468 yetmaydi."
    },
    {
      id: "bsa-q3",
      question: "Tekshiruv funksiyasi `true` qaytarganda nega `right = mid` yoziladi, `right = mid - 1` emas?",
      options: [
        "Ikkalasi ham bir xil ishlaydi",
        "`mid - 1` xotirani tejaydi",
        "`mid` ning o'zi javob bo'lishi mumkin, uni tashlab yubormaslik kerak",
        "`right = mid - 1` sintaksis xatosi beradi"
      ],
      correctAnswer: 2,
      explanation:
        "Biz eng kichik yetarli qiymatni qidiramiz. `mid` yetarli bo'lsa, `mid` ning o'zi ham javob nomzodi, shuning uchun u oraliqda qolishi kerak."
    },
    {
      id: "bsa-q4",
      question: "Tekshiruv funksiyasi `false` qaytarganda qaysi qator bajariladi?",
      options: [
        "`right = mid`",
        "`left = mid + 1`",
        "`left = mid - 1`",
        "Sikl to'xtaydi"
      ],
      correctAnswer: 1,
      explanation:
        "Monotonlik tufayli `mid` yetarli bo'lmasa, undan kichik qiymatlar ham yetarli emas. Shuning uchun pastki chegara `mid + 1` ga suriladi."
    },
    {
      id: "bsa-q5",
      question: "480 betli kitob uchun 1 dan 480 gacha birma-bir sinash nechta tekshiruv, javob ustida ikkilik qidiruv nechta tekshiruv talab qiladi?",
      options: [
        "480 va 9",
        "480 va 480",
        "9 va 480",
        "480 va 240"
      ],
      correctAnswer: 0,
      explanation:
        "Ketma-ket sinash har qiymatni tekshiradi: 480 ta. Ikkilik qidiruv oraliqni ikkiga bo'ladi: 2⁹ = 512 > 480, ya'ni 9 ta tekshiruv yetadi."
    },
    {
      id: "bsa-q6",
      question: "`while (left < right)` sikl tugaganda `left` va `right` haqida nima deyish mumkin?",
      options: [
        "`left === right`",
        "`left > right`",
        "`right === left + 1`",
        "`left === 0`"
      ],
      correctAnswer: 0,
      explanation:
        "Tsikl faqat `left < right` bo'lmaganda to'xtaydi, ya'ni `left` va `right` tenglashadi. Shu bitta qiymat javob bo'ladi."
    },
    {
      id: "bsa-q7",
      question: "Nega `right` ni boshlang'ich qiymatini 'albatta yetarli' qilib tanlash kerak?",
      options: [
        "Aks holda kod sintaksis xatosi beradi",
        "Aks holda javob oraliqdan tashqarida qolib, hech qachon topilmaydi",
        "Faqat xotirani tejash uchun",
        "Ikkilik qidiruv `right` qiymatini ishlatmaydi"
      ],
      correctAnswer: 1,
      explanation:
        "Qidiruv faqat o'zi ko'rgan oraliq ichidan izlaydi. Yuqori chegara yetarli bo'lmasa, haqiqiy javob oraliqdan tashqarida qoladi."
    },
    {
      id: "bsa-q8",
      question: "`[30, 20, 45, 15]` va 3 kun uchun `canFinishIn(45)` nima qaytaradi?",
      options: [
        "true",
        "false",
        "45",
        "undefined"
      ],
      correctAnswer: 1,
      explanation:
        "45 bet/kun bilan 1-kun [30], 2-kun [20], 3-kun [45], 4-kun [15] — jami 4 kun kerak bo'ladi, muddat esa 3 kun."
    },
    {
      id: "bsa-q9",
      question: "Javob ustida ikkilik qidiruvning vaqt murakkabligi qanday?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(log n)",
        "O(1)"
      ],
      correctAnswer: 2,
      explanation:
        "Har qadamda oraliq ikki barobar qisqaradi. Tekshiruv funksiyasining o'z vaqti bunga qo'shimcha hisoblanadi."
    },
    {
      id: "bsa-q10",
      question: "Nega `while (left <= right)` bilan birga `right = mid` yozish xatarli?",
      options: [
        "Natija har doim 0 bo'lib qoladi",
        "`left === right` bo'lganda sikl tugamay, cheksiz aylanishi mumkin",
        "Massiv buzilib qoladi",
        "`<=` operatori mavjud emas"
      ],
      correctAnswer: 1,
      explanation:
        "`left === right === mid` holatida `right = mid` qiymatni o'zgartirmaydi, shart esa rost bo'lib qolaveradi. Yoki ochiq oraliq + `left < right`, yoki yopiq oraliq + `mid - 1` ishlatiladi."
    },
    {
      id: "bsa-q11",
      question: "`minPagesPerDay` da yuqori chegarani taxmin qilish o'rniga nima qilish to'g'ri?",
      options: [
        "Barcha betlarni qo'shib, shu yig'indini olish",
        "Boblar sonini olish",
        "Eng kichik bobni olish",
        "Chegarani 100 deb olish"
      ],
      correctAnswer: 0,
      explanation:
        "Hamma betlarni bir kunda o'qish har doim yetarli, shuning uchun umumiy yig'indi ishonchli yuqori chegara bo'ladi."
    },
    {
      id: "bsa-q12",
      question: "Monotonlik buzilgan bo'lsa (masalan tekshiruv ba'zi kichik qiymatlarda 'ha', ba'zi kattalarida 'yo'q' bo'lsa) nima bo'ladi?",
      options: [
        "Kod ishlamaydi va xato beradi",
        "Kod ishlaydi, lekin jim ravishda noto'g'ri javob berishi mumkin",
        "Ikkilik qidiruv avtomatik ketma-ket qidiruvga o'tadi",
        "Natija har doim to'g'ri bo'ladi"
      ],
      correctAnswer: 1,
      explanation:
        "Usul 'bir nuqtadan keyin hammasi bir xil' degan taxminga tayanadi. Taxmin buzilsa, u o'zi tekshirmagan oraliqni tasodifan tashlab yuboradi va xato javob beradi."
    }
  ]
};
