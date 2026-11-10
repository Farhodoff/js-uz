# 📚 Advanced Sorting — Quick Sort detail, Merge Sort detail, Heap Sort, Radix, Counting — O'rta/Advanced daraja

## 📦 Tushunchalarning sodda izohi

**Saralash (Sorting)** — massivni qaysi tartibda (o'sish yoki kamayish) bo'lishi keraki. Har bir algoritm — **vaqt** (time), **xotira** (space), **barqarorlik** (stable yoki unstable), **joyida ishlash** (in-place yoki yo'q) — jihatidan farq qiladi.

- **Barqarorlik (Stability):** agar engizilgan ikkita element bir xil bo'lsa, ularning dastlabki tartibi saqlanadimi? Stable — tartib saqlanadi. Masalan: `[("Ali", 20), ("Vali", 20)]` — `Vali` "yirikroq" degan holda ham tartib saqlanadigan algoritm — stable. Aggregationga qaratilgan sortlarda barqarorlik muhim.
- **Joyida ishlash (In-place):** yangi arr yaratilmasin, eski massiv o'zi o'zgaradimi? In-place — ekstra xotira miqdori ya'ni O(1) (yoki recursion stack O(log n) qadriyatida). Merge Sort — in-place emas, chunki u `left`, `right`, `result` yaratar.

### 1. Bubble Sort — O(n²) — O(1) space — Stable — In-place

- **Prinsip:** Qat'iy solishtirish — "chegarada keep korang, agar chap > o'ng bo'lsa almashtir. Har o'tishda eng yirik element oq 'hididan tezroq ko'r poloqtiradi'. Eng yirik birinchi navbatda ko'rinadi, keyingi katta ikkinchi navbatda, va hokazo. Har qanday holatda ketma-ketlik tepada yoki tagda chegarada ko'rinadi. Eng kattai har turgi holatda banded — eng katta yoki eng kichik takroriy hal qiladi. Eng katta eng katta navbatda beradi.
- **Vaqt:** O(n²) — chetda holda: n elemetlarga n marta, har biri n ta yoki kamroq solishtirish. Optimal holda (sirtilgan massiv) O(n) — cheklovsiz eng mushtabar holat. Worst case — teskari tartibli holda — O(n²).
- **Xotira:** O(1) — in-place, faqat operatorlar uchun o'zgaruvchilar.
- **Stability:** Stable — almashtirish faqat `<` ga mo'ljallangan bo'lmasa (ya'ni `<=` yoki `>` ni ko'rib chiqmasa), tartib saqlanadi.

**Misol:** `[5, 2, 9, 1, 5, 6]` — birinchi o'tish — 9 oxira, keyingi — 6 ... `1` eng kichik otarida.

### 2. Selection Sort — O(n²) — O(1) space — Unstable — In-place

- **Prinsip:** Har o'tishda eng kichik elementni top, va uni hali saralangani bo'lmagan qismning boshiga o'rnating. Boshlanishi bilan boshlaydigan qism har doim saralanadi, qolgan qism saralanishi kutilmoqda.
- **Vaqt:** O(n²) — har bir element uchun qolgan qismdagi eng kichikini topish — O(n) — har safar. Total: n * n.
- **Xotira:** O(1) — in-place.
- **Stability:** Unstable — almashtirish boshlang'ich elementni yurtiyotganingizdek uzoq masofaga o'tkazishi mumkin va tartib buzilishi mumkin.

### 3. Insertion Sort — O(n²) — O(1) space — Stable — In-place

- **Prinsip:** "Kartalarni o'raltirish" — har bir keyingi elementni, saralangan qism ichida o'zi uchun to'g'ri o'rinni topib, u yerga soling. Keyingi element oldingisidan katta yoki teng bo'lsa joylashtiriladi, kichik bo'lsa solishtirib chiqiladigan.
- **Vaqt:** Worst/average — O(n²). Optimal — deyarli saralangan massivda — O(n). Eng yomon — teskari tartibli.
- **Xotira:** O(1) — in-place.
- **Stability:** Stable — o'sha element o'zi saralanishicha tartib saqlanadi.

**Misol:** `[5, 2, 9, 1, 5, 6]` — 1 — eng kichik, dastlabki joyda saralanish.

### 4. Merge Sort — O(n log n) — O(n) space — Stable — NOT in-place

- **Prinsip:** "Divide and Conquer" — massivni tasodifiy yarmlarga bo'ling, har yarmni takroriy saraling, keyin ikki saralangan yarmni birlashtirib, umumiy saralaqni hosil qiling. Har bir qadamda ikki saralangan qism bir-biriga solishtiriladi.
- **Vaqt:** O(n log n) — har doim, chunki har bir bosqichda n ta elementlarni tekshirish — log n darajaga bo'linadi.
- **Xotira:** O(n) — yangi massiv yaratish kerak. Recursion stack — O(log n). O'rtacha O(n) xotira.
- **Stability:** Stable — birlashtirishda `<=` yoki `<` solishtirish tartibni saqlashga bog'liq, odatda stable.
- **Advantages:** Har doim O(n log n), worst-case ham, stable, parallel ishga tushishi mumkin.

### 5. Quick Sort — O(n log n) average, O(n²) worst — O(log n) space — Un stable — In-place

- **Prinsip:** "Divide and Conquer" — pivot tanlang (birinchi, oxirgi, yoki o'rtacha), massivni ikki qismga bo'ling: "pivotdan kichik" va "pivotdan katta". Har ikki qismni takroriy saralash. In-place almashtirish bilan — O(n log n) vaqtda.
- **Vaqt:** Average — O(n log n) — pivot dentist yaxshi tanlanganda. Worst — teskari tartibli holda — O(n²) — pivot har safar eng katta yoki kichik element bo'lsa. Randomized pivot yoki median-of-three yordamida worst holat kamaytiriladi.
- **Xotira:** O(log n) — recursion depth. In-place almashtirish.
- **Stability:** Unstable — almashtirish tartibni buzishi mumkin.
- **Advantages:** Odatda tezroq harakat qiladi (cache-friendly), keraksiz massivlarni ko'p emas.

**Misol:** pivot — oxirgi element, "small" qism chapda, "big" qism o'ngda, har ikkalasi saralanadi.

### 6. Heap Sort — O(n log n) — O(1) space — Unstable — In-place

- **Prinsip:** Max-heap (eng yirik ildizli) qurish — heapify — eng yirik elementni ildizdan olib, oxiriga o'rnating, keyin heapni qayta tuzing. Har qadamda eng yirik cho'ziladi va massivning oxiriga joylashtiriladi.
- **Vaqt:** O(n log n) — heapify — O(n), har bir cho'zish — O(log n) — n marta.
- **Xotira:** O(1) — in-place.
- **Stability:** Unstable — almashtirish tartibni buzishi mumkin.
- **Advantages:** Har doim O(n log n), in-place, memory yo'q. Worst-case ham o'rinli.

### 7. Counting Sort — O(n + k) — O(n + k) space — Stable — NOT in-place

- **Prinsip:** Elementlar soni (freq) hisoblang (k — max qiymat + 1), keyin prefix sum orqali har bir elementning joylashgan pozitsiyasini aniqlang, majburiy tushish (reverse) tartibda yangi massivga joylang.
- **Vaqt:** O(n + k) — n elementlar, k — max qiymat.
- **Xotira:** O(n + k) — freq array, output array.
- **Stability:** Stable — tartib saqlanadi (reverse tartibda joylashtiriladi).
- **Advantages:** Agar k — n bilan solishtirma — tez — integer qiymatlar uchun foydali.

**Misol:** `[2, 5, 3, 2, 1, 5, 4]` — freq: [0,1,2,1,1,2] — prefix sum: [... vaqtinchalik joylashtirish].

### 8. Radix Sort (LSD / MSD) — O(d * (n + b)) — O(n + b) space — Stable — NOT in-place

- **Prinsip:** Sonlarni raqamlar (radix — asosiy) bo'yicha saralash. Odatda LSD (Least Significant Digit) — eng kichik raqamdan boshlab, har bir raqam uchun Counting Sort (yoki boshqa stable sort) qo'llaniladi. Har bir raqam uchun dastlabki tartibni saqlab qolish — stability kerak.
- **Vaqt:** O(d * (n + b)) — d — raqamlar soni (max sonning uzunligi), b — radix (masalan, 10 — decimal), n — elementlar soni.
- **Xotira:** O(n + b) — Counting Sort xotirasi har raqam uchun.
- **Stability:** Stable — ularning har bir bosqichida stable sorting — umumiy tartib.
- **Advantages:** Sonlar uchun tez, agar d kichik bo'lsa. d — max sonning raqamlari soni. Masalan, 3-honali sonlar uchun d=3.

**Misol:** `[170, 45, 75, 90, 802, 24, 2, 66]` — raqamlar bo'yicha saralash.

---

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Merge Sort — O(n log n), stable, O(n) xotira
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr)); // [3, 9, 10, 27, 38, 43, 82]
// Tahlil: O(n log n) — vaqt, O(n) — xotira, stable
```

```javascript
// 2. Quick Sort — average O(n log n), worst O(n²), in-place, unstable
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right]; // oxirgi element
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

const arr2 = [38, 27, 43, 3, 9, 82, 10];
console.log(quickSort(arr2)); // [3, 9, 10, 27, 38, 43, 82]
// Tahlil: average O(n log n), worst O(n²) — oxirgi pivot, in-place, unstable
// Tahlil: qanday qilib worst holatni kamaytirish mumkin?
```

```javascript
// 3. Quick Sort — median-of-three pivot tanlash (worst kamaytirish)
function medianOfThree(arr, left, right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[left] > arr[mid]) [arr[left], arr[mid]] = [arr[mid], arr[left]];
  if (arr[left] > arr[right]) [arr[left], arr[right]] = [arr[right], arr[left]];
  if (arr[mid] > arr[right]) [arr[mid], arr[right]] = [arr[right], arr[mid]];
  return mid; // o'rtacha
}

function quickSortMedian(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = medianOfThree(arr, left, right);
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    const part = partition(arr, left, right);
    quickSortMedian(arr, left, part - 1);
    quickSortMedian(arr, part + 1, right);
  }
  return arr;
}

const arr3 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log(quickSortMedian(arr3)); // [1,2,3,4,5,6,7,8,9]
// Tahlil: median-of-three pivot tanlash — worst holat kamaytiriladi — ammo hali ham O(n²) mumkin
```

```javascript
// 4. Heap Sort — O(n log n), O(1) space, in-place, unstable
function heapSort(arr) {
  const n = arr.length;
  // Max-heap qurish — heapify from bottom up
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Eng yirik cho'zish va oxiriga joylashtirish
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

const arr4 = [12, 11, 13, 5, 6, 7];
console.log(heapSort(arr4)); // [5,6,7,11,12,13]
// Tahlil: O(n log n) — vaqt, O(1) — xotira, in-place, unstable
```

```javascript
// 5. Counting Sort — O(n + k), stable, O(n + k) xotira, NOT in-place
function countingSort(arr, max = Math.max(...arr)) {
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length);
  // freq hisoblash
  for (const num of arr) count[num]++;
  // prefix sum — joylashuvlar
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  // reverse tartibda joylashtirish — stability saqlash
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}

const arr5 = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort(arr5, 8)); // [1, 2, 2, 3, 3, 4, 8]
// Tahlil: O(n + k) — vaqt, O(n + k) — xotira, stable — reverse joylashtirish bilan
// Tahlil: agar max qiymat katta bo'lsa — xotira va vaqt — katta bo'ladi — kamroq foydali
```

```javascript
// 6. Radix Sort (LSD) — O(d * (n + b)), stable, O(n + b) xotira
function radixSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  const maxDigits = String(max).length;
  for (let d = 0; d < maxDigits; d++) {
    // Counting Sort — raqamlar uchun (b = 10 — decimal)
    const count = new Array(10).fill(0);
    const output = new Array(arr.length);
    for (const num of arr) {
      const digit = Math.floor(num / Math.pow(10, d)) % 10;
      count[digit]++;
    }
    // prefix sum
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    // reverse joylashtirish — stability
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / Math.pow(10, d)) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  }
  return arr;
}

const arr6 = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(arr6)); // [2, 24, 45, 66, 75, 90, 170, 802]
// Tahlil: O(d * (n + b)) — vaqt, O(n + b) — xotira, stable — raqamlar bo'yicha
// Tahlil: agar max son katta bo'lsa — d katta bo'ladi — hali ham faydalı, ammo d katta bo'lsa — vaqt oshadi
```

```javascript
// 7. Comparison — tezlik va xotira (chiziqli ko'rinishda)
function compareSorts(n) {
  // Bu nafaqat test, balki tahlil — algorithmic — kuzatuv
  console.log("\n--- n =", n, "---");
  const arr1 = Array.from({ length: n }, () => Math.floor(Math.random() * n));
  const arr2 = [...arr1];
  const arr3 = [...arr1];
  const arr4 = [...arr1];
  const arr5 = [...arr1];

  console.time("Merge Sort");
  mergeSort(arr1);
  console.timeEnd("Merge Sort");

  console.time("Quick Sort (oxirgi pivot)");
  quickSort(arr2);
  console.timeEnd("Quick Sort (oxirgi pivot)");

  console.time("Quick Sort (median-of-three)");
  quickSortMedian(arr3);
  console.timeEnd("Quick Sort (median-of-three)");

  console.time("Heap Sort");
  heapSort(arr4);
  console.timeEnd("Heap Sort");

  console.time("Counting Sort (mavjud)");
  countingSort(arr5, Math.max(...arr5));
  console.timeEnd("Counting Sort (mavjud)");
}
// compareSorts(100000);
// Tahlil: Merge vs Quick vs Heap — tezlik — o'xshash, lekin Quick — cache-friendly — tezroq
// Counting — faqat integer qiymatlar — kichik range — tez
// Radix — sonlar uchun, raqamlar soni katta bo'lmagan holda — tez
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Quick Sort — pivot tanlash — oxirgi element — worst case teskari massivda — O(n²)
const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
quickSort(arr); // worst case — O(n²) — pivot har safar oxirgi eng katta
// Yaxshi: random pivot — yoki median-of-three — worst kamaytirish
```

```javascript
// XATO 2: Merge Sort — xotira — O(n) — katta massivlar uchun unchalik faydalı emas
// Merge Sort — O(n) xotira — har doim yangi massiv yaratadi
// Yaxshi: kichik massivlar uchun — Insertion Sort (O(n²) lekin kichik n — tez) — hybrid
// Braekpoint (n < 32) — insertion sort — Merge Sort ichida
```

```javascript
// XATO 3: Counting Sort — max qiymat katta — katta range — xotira va vaqt — katta
const arr = [1, 2, 3, 1000000]; // max = 1000000 — count array — 1M element
countingSort(arr, 1000000); // xotira — 1M element — yomon — faqat 4 ta element
// Yaxshi: agar range katta bo'lsa — Counting Sort — yomon — yoki Radix Sort — yoki Quick Sort
```

```javascript
// XATO 4: Radix Sort — manfiy sonlar — qanday qilib ishlaydi?
// Counting Sort — manfiy sonlar — qanday qilib ishlaydi — qanday qilib joylashtiradi?
const arr = [-5, 2, -3, 0, 10, -1];
// Radix Sort — manfiy sonlar uchun — max qiymat — manfiy sonlar — composite — radix — yomon
// Yaxshi: manfiy sonlar — Quick Sort / Merge Sort — yoki Counting Sort — max qiymat bilan — muddatli
```

```javascript
// XATO 5: Saralash — stability — kerak bo'lmagan holda — unstable — foydali bo'lishi mumkin
// Masalan: agar tartibga soliladigan elementlar — faqat raqamlar — stability — muhim emas — unstable — hali ham faydalı
// Ammo agar teng qiymatli elementlar — tartib saqlanishi — kerak bo'lsa — stable algorithms — tanlash
// Yaxshi: Merge Sort (stable) — yoki Counting Sort (stable) — agar stability — muhim bo'lsa
```

```javascript
// XATO 6: Sorting — avl tree bilan saralash — ya'ni tree — O(n log n) — O(n) xotira — tree — har doim saralash
// Tree sort — BST yoki AVL — O(n log n) — O(n) xotira — not in-place
// Yaxshi: odatda — yaqinlashtirilgan saralash — BST — yomon — skewed tree — O(n²) worst
// AVL / Red-Black — O(n log n) — O(n) xotira — but extra memory — yomon foydalanish — O(n) memory — foydali bo'lishi mumkin
```

```javascript
// XATO 7: Saralash — bubble sort — katta massivlar uchun — O(n²) — yomon — hali ham ishlatish mumkin?
// Har doim — O(n²) — yomon — katta massivlar uchun — yomon foydali
// Yaxshi: bubbling — cheklov — early exit — deyarli saralangan massivda — O(n) — optimal holda — yaxshi
// Ammo umumiy — O(n log n) — saralash — tanlash — yaxshi
// bubble sort — tez-tez ishlatilmaydi — O(n²) — yomon
```

```javascript
// XATO 8: Saralash — sort stability — kerak emas — esa ham — stable algorithm — tanlash — sabab — O(n) xotira — Merge Sort — O(n) xotira
// Yaxshi: agar stability — muhim bo'lsa — Merge Sort — yoki Counting sort — yoki Radix (LSD) — tanlash
// Aman: startTime-endTime — sort stability — merge sort — counting sort — radix — stable — yaxshi
// Agar stability — muhim emas — quick sort — yoki heap sort — yoki in-place — tanlash
```

---

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Merge Sort:** har doim O(n log n) — vaqt, O(n) — xotira, stable. Parallel — divide — conquer — ishlaydi. Kattaroq massivlar uchun — yaxshi. In-place emas — xotira kerak — lekin stability — foydali.
- **Quick Sort:** in-place — O(log n) stack — O(n log n) average — O(n²) worst. Cache-friendly — tez. Pivot tanlash — muhim — median-of-three yoki random pivot. Stability — unstable — lekin tez foydali.
- **Heap Sort:** O(n log n) — har doim — O(1) xotira — in-place — unstable. Worst-case ham o'rinli. Odatda — narativ — implementatsiya qiyin emas, lekin cache-friendly emas — O(n log n) — lekin merge yoki quickdan sekinroq.
- **Counting Sort:** O(n + k) — integer qiymatlar — k — range — kichik range — tez. Stable — reverse tartibda joylashtirish. Xotira — k — katta bo'lsa — yomon.
- **Radix Sort:** O(d * (n + b)) — sonlar — raqamlar — d — kichik raqamlar soni — b — radix — stable — raqamlar bo'yicha — integer sonlar uchun — faydalı. d katta bo'lsa — vaqt oshadi.
- **Insertion Sort:** deyarli saralangan massiv uchun — O(n) — optimal holat. Kichik n uchun — yaxshi — keraksiz xotira yo'q. Hybrid algorimlarda — braekpoint — n<32 — use insertion.
- **Saralash algoritmi tanlash:** massiv o'lchami — elementlar turi — range — stability — vaqt — xotira — tanlash. O'n katta massivlar uchun — O(n log n) — tanlash. Kichik massivlar — insertion. Integer — kichik range — counting.
- **Saralash — pred-sorted (deyarli saralangan) massivlar:** Insertion — O(n) — yaxshi. Tim Sort — Python/Java — o'zi — hybrid — merge + insertion — saralangan massivlar — O(n).
- **Saralash — user-defined comparator:** `arr.sort((a,b)=>a-b)` — tezkor — O(n log n) — JavaScript engine — V8 — Tim Sort (Chrome, V8) — yoki Merge Sort varianti.

### ❌ Noto'g'ri:

- **Bubble Sort — katta massivlar uchun — O(n²) — yomon.** Har doim — O(n²) — yomon. Optimal holda — O(n) — deyarli saralangan holda — lekin umumiy — yomon.
- **Quick Sort — pivot — oxirgi element — worst case** teskari massivda — O(n²). Pivot tanlash — median-of-three yoki random pivot — yaxshi. Worst case — kamaytiriladi.
- **Counting Sort — range katta** — katta — xotira — vaqt — katta — yomon. Integer qiymatlar — kichik range — yaxshi.
- **Radix Sort — manfiy sonlar** — qanday qilib ishlaydi — max qiymat — manfiy sonlar — composite — radix sort — yomon. Manfiy sonlar — boshqa usullar — tanlash.
- **Saralash — stability — yomon** — agar stability — kerak bo'lsa — Merge, Counting, Radix — tanlash. Agar stability — kerak emas — Quick, Heap — in-place — tanlash.
- **Saralash — massivdagi elementlar — objectlar — kompleks** — sort — comparator — faol — lekin faol — kalit — key — saralash — overcomplicate — simple — saralash — massivdagi ob'ektlar — object — key — saralash — qiyinroq — yomon.

---

## 🎩 Hayotiy o'xshatishlar

- **Kitoblar joylashish:** katta kutubxondagi kitoblarni saralash — O(n log n) — Merge / Quick Sort. Kichik fayllar — Insertion yoki Counting.
- **Telefon raqamlari ro'yxati:** tugatish tartibi — "oxirgi raqam" bo'yicha saralash — Radix Sort. Raqamlar — raqamlar — O(d * (n + b)).
- **Hisobotlar — umumiy maosh:** maoshlar bo'yicha saralash — Merge Sort (stable) — tartib saqlash — kerak.
- **Tasodifiy raqamlar — floor/ceil:** `array.sort()` — ushbu o'yinlar — algoritm — tanlash — tezkor va xotirmas.
- **Dastur — saralash — sort stability — kerak** — Merge, Counting, Radix — tanlash — stable.

---

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Saralash Algoritmlari Murakkabligi ] --> B1( O(n²) — Bubble, Selection, Insertion )
    A --> B2( O(n log n) — Merge, Quick (average), Heap )
    A --> B3( O(n + k) — Counting Sort )
    A --> B4( O(d * (n + b)) — Radix Sort )

    B1 --> C1( Bubble Sort — stable, in-place )
    B1 --> C2( Selection Sort — unstable, in-place )
    B1 --> C3( Insertion Sort — stable, in-place — kichik/nearly sorted — O(n) — optimal )

    B2 --> C4( Merge Sort — O(n) xotira, stable, NOT in-place )
    B2 --> C5( Quick Sort — O(log n) stack, in-place, unstable — pivot tanlash — median random )
    B2 --> C6( Heap Sort — O(1) xotira, in-place, unstable — max-heap )

    B3 --> C7( Counting Sort — integer qiymatlar — k — range — stable — reverse joylashtirish )

    B4 --> C8( LSD Radix Sort — raqamlar bo'yicha — Counting Sort — har raqam uchun — stable — d raqamlar soni )

    style B1 fill:#ffcdd2,stroke:#c62828
    style C1 fill:#ffcdd2,stroke:#c62828
    style C2 fill:#ffcdd2,stroke:#c62828
    style C3 fill:#ffcdd2,stroke:#c62828
    style B2 fill:#c8e6c9,stroke:#2e7d32
    style C4 fill:#c8e6c9,stroke:#2e7d32
    style C5 fill:#c8e6c9,stroke:#2e7d32
    style C6 fill:#c8e6c9,stroke:#2e7d32
    style B3 fill:#fff9c4,stroke:#f9a825
    style C7 fill:#fff9c4,stroke:#f9a825
    style B4 fill:#e0f7fa,stroke:#00838f
    style C8 fill:#e0f7fa,stroke:#00838f
```

**Diagrama tushuntirishi:** Saralash algoritm — 4 ta asosiy guruh:

1. **O(n²)** — Bubble, Selection, Insertion — alohida holatlarda yaxshi (insertion — deyarli saralangan).
2. **O(n log n)** — Merge, Quick, Heap — standart saralash uchun. Merge — stable — xotira kerak. Quick — in-place — pivot tanlash. Heap — in-place — xotira yo'q.
3. **O(n + k)** — Counting — integer qiymatlar — k kichik.
4. **O(d * (n + b))** — Radix — raqamlar bo'yicha — d raqamlar soni — b radix.

---

## 🎙 Intervyu savollari va javoblari

### S1: Merge Sort va Quick Sort orasidagi asosiy farqlar? Qaysi biri qaysi hollarda foydali?

**Javob:** Merge Sort — O(n log n) har doim, O(n) xotira, stable, parallel ishlaydi. Quick Sort — average O(n log n), worst O(n²) (pivot tanlashga bog'liq), in-place, O(log n) stack, cache-friendly, lekin unstable. Kattaroq massivlar uchun — odatda Quick Sort — tezroq (cache-friendly). Stability kerak bo'lsa — Merge Sort. Memory cheklangan holda — Quick yoki Heap Sort. Worst-case kamaytirish uchun — pivot tanlash (median-of-three yoki random).

### S2: Heap Sort qanday ishlaydi? O'z navbatida, u Merge Sort va Quick Sort bilan qanday taqqoslanadi?

**Javob:** Heap Sort — max-heap qurish — O(n), har bir eng yirik elementni cho'zish — O(log n) — n marta — total O(n log n). Xotira — O(1) — in-place. Merge Sortdan farqli o'laroq — Heap Sort — O(1) xotira, lekin cache-friendly emas. Quick Sortdan farqli o'laroq — Heap Sort — har doim O(n log n) — worst-case ham — lekin odatda tez emas (cache misses). Eng yaxshi holat — Heap Sort — O(n log n) har doim, in-place, lekin Quick Sort — average tezroq.

### S3: Counting Sort qanday ishlaydi va u qaysi holatlarda foydali? Sizning misolingiz qanday?

**Javob:** Counting Sort — elementlarining sonini (freq) hisoblaydi — `count` array — max qiymat + 1 uzunlikda — har bir element raqami uchun joylashuvlar — prefix sum yordamida joylashuvlarni aniqlash — reverse tartibda joylashtirish — stability saqlash. Vaqt — O(n + k) — xotira — O(n + k). Agar k (max qiymat) katta bo'lsa — xotira va vaqt katta — yomon. Masalan: `[2, 5, 3, 2, 1, 5, 4]` — max=5. Yaxshi — kichik range.

### S4: Radix Sortda "stability" qanday muhim? Qanday qilib quriladi?

**Javob:** Radix Sort (LSD) — har bir raqam uchun counting sort yoki boshqa stable sort qo'llaniladigan bo'lsa, umumiy tartib — stability — har safar saqlanadi. Agar stable — emas bolsa — raqamlar — tartib buziladi — natija to'g'ri bo'lmasa. Shuning uchun — har bir raqam uchun stable sort qo'llash zarur. Masalan: oxirgi raqam — uchinchi o'rinda saqlangan. LSD — stability — muhim — reverse joylashtirish dengan counting sort orqali — stability saqlanadi.

### S5: "Saralash" uchun hybrid usullar (masalan, TimSort) nima uchun qo'llaniladi? JavaScript `Array.prototype.sort` qanday ishlaydi?

**Javob:** Hybrid usullar (TimSort) — Merge Sort va Insertion Sort — birlashtiriladi. Kichik massivlar uchun — Insertion Sort — O(n²) lekin kichik n — tez. "Run" lar — saralangan massivlar — O(n) — yaxshi. Deyarli saralangan massivlar — O(n). Eng yaxshi — birlashtirilgan — merge — O(n log n) — worst holat. JavaScriptda — V8 (Chrome/Node) — `Array.prototype.sort` — TimSort yoki Merge Sort varianti — odatda O(n log n) — va stable. Lekin ba'zi browserlarda xilma-xil — o'zingizni sinab ko'ring.

### S6: Saralash algoritmini tanlashda — qanday omillarga qarab? Masalan: o'lcham, range, stability, xotira cheklovlari?

**Javob:** Omillar — o'lcham (n) — katta massiv uchun — O(n log n) — tanlash (Merge, Quick, Heap). Kichik massivlar (n<32) — Insertion. Elementlar — integer — kichik range (k) — Counting — O(n + k). Raqamlar — Radix — d raqamlar soni kichik. Stability kerak bo'lsa — Merge, Counting, Radix. Xotira cheklangan — Quick yoki Heap (in-place). Worst-case muhim — Merge yoki Heap. Odatda — Quick Sort — cache-friendly — tez.

### S7: Heap Sort — heapify protsessi qanday boshqacha tushuntiriladi? "Max-heapify" yozing.

**Javob:** Max-heapify — faqat ildizni tekshiradi — chunki u eng yirik bo'lishi kerak — agar yo'q — ildiz bilan eng yirik child almashtiriladi — va keyin ko'proq heapify — child ichida. Top-down — yoki bottom-up — heapify — ildiz — tinchlik — eng yirik element — ildizda bo'lishi kerak. Max-heapify — O(log n) — hisoblash — child — eng yirik — ildiz — almashtirish — keyin recursion — child. Bootom-up — heapify — n/2 dan 0 gacha — yarim — O(n) — saralash uchun — max-heap — qurish.

### S8: Quick Sort — pivot tanlash — qanday qilib worst-case kamaytirish mumkin?

**Javob:** Pivot tanlash — boshlang'ich — oxirgi element — yomon teskari massiv uchun — worst O(n²). Yaxshi variants — random pivot — median-of-three pivot — yoki "introsort" — Quick Sort — agar depth katta bo'lsa — Heap Sortga o'tish. Introsort — hybrid — Quick Sort — lekin depth katta bo'lsa — Heap Sort — worst-case O(n log n) ta'minlaydi. Median-of-three — yomon holatlar kamaytiradi — ammo hali ham worst-case mumkin. Random pivot — worst-case ehtimoli kichik.

### S9: Sort stability — nima? Qayerda uning menga qiziqarli qilishi mumkin? Misol tushuntirib bering.

**Javob:** Stability — "agar ikkita teng element — ularning dastlabki tartibi — saralashdan keyin ham saqlansa" — stable. Agar teng qiymatli elementlar bir xil bo'lsa — tartib o'zgarmaydi — stable. Ko'p holatda — stability kerak: masalan, 전환청구iani bir necha marta saralashda — eski tartib o'zi — yoki aggregation — shunchaki saralash davomida nima yuz berganini tushunish kerak. Masalan: `[("A", 1), ("B", 1)]` — sort shart — tartib saqlanadi — stable. Agar unstable — tartib o'zgarishi mumkin. Stability kerak bo'lmagan holda — Quick Sort yoki Heap Sort — tanlash mumkin.

### S10: Counting Sort va Radix Sort bilan birgalikda qanday yechim krijiminalnitelnogo muhim?

**Javob:** Counting Sort — O(n + K) — agar k range katta bo'lmasa — ishlaydi. Agar range katta bo'lsa (masalan 32-bit integerlar — range katta) — Counting Sort xotiraning mavjudligi — yo'q. Radix Sort — har raqam uchun Counting Sort — O(d*(n+b)) — d raqamlar soni — kichik holda — yaxshi. Ikkalasidan faydalanish uchun — integer qiymatlar — har ikkasini tanlash — range kichik — counting — raqamlar bo'yicha — radix. Ammo umumiy — O(n log n) saralash — eng ko'p holatda — tanlash — merge/quick/heap.

---

💲 *Bu dars — Advanced Sorting — O'rta/Advanced daraja uchun yozildi. Keyingi mavzu — Dynamic Programming, Backtracking, Advanced Data Structures.*
