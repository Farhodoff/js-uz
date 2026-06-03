export const sortingSearching = {
  id: "sortingSearching",
  title: "Saralash va Qidiruv Algoritmlari",
  theory: `## 1. NEGA kerak?
Dasturlashda ma'lumotlar bilan ishlashning eng ko'p bajariladigan amallari — bu **qidiruv** (izlash) va **saralash** (tartiblash) dir. Masalan, minglab tovarlar orasidan eng arzonini topish uchun avval tovarlarni narxi bo'yicha saralash kerak, keyin keraklisini qidirish kerak.
Agar ma'lumotlar to'g'ri saralanmagan va samarasiz algoritm ishlatsak, qidiruv juda sekin ishlaydi. To'g'ri tanlangan saralash va qidiruv algoritmlari dasturning resurs sarfini keskin kamaytiradi (masalan, $O(n^2)$ dan $O(n \log n)$ gacha).

## 2. SODDALIK (Analogiya)
- **Qidiruv:** Siz telefon daftarchasidan "Sardor" ismli odamni qidiryapsiz.
  * *Chiziqli qidiruv (Linear Search):* Daftarni boshidan boshlab har bir ismni bittalab ko'rib chiqasiz ($O(n)$).
  * *Ikkilik qidiruv (Binary Search):* Daftarni o'rtasidan ochasiz, agar o'rtada "M" harfi bo'lsa, "Sardor" o'ng tomonda ekanligini bilib, chap tomonni butunlay yopasiz ($O(\log n)$).
- **Saralash:** Siz aralash yotgan **kuy ko'zirlarini (karta)** qo'lingizda tartiblamoqchisiz.
  * *Insertion Sort:* Har bir yangi kartani olib, qo'lingizdagi tartiblangan kartalar orasida o'z o'rniga joylaysiz.

## 3. STRUKTURA VA ILG'OR TUSHUNCHALAR

### A. Divide and Conquer (Bo'lib tashla va hukmronlik qil)
Muammoni kichik bo'laklarga bo'lib yechish, keyin esa bo'laklar yechimini birlashtirishga asoslangan algoritmik yondashuv:
- **Merge Sort (Birlashtirish orqali):** Massivni o'rtasidan bo'lib saralaydi va birlashtiradi. Har doim $O(n \log n)$ tezlikda ishlaydi, barqaror (stable) lekin qo'shimcha $O(n)$ xotira talab qiladi.
- **Quick Sort (Tezkor):** Pivot (tayanch) element tanlab, undan kichiklarini chapga, kattalarini o'ngga yig'adi. O'rtacha $O(n \log n)$ tezlikda ishlaydi, qo'shimcha xotira talab qilmaydi ($O(1)$ in-place) lekin barqaror emas (unstable).

\`mermaid
graph TD
    classDef base fill:#2c3e50,stroke:#34495e,color:#fff;
    classDef div fill:#e74c3c,stroke:#c0392b,color:#fff;
    classDef merged fill:#2ecc71,stroke:#27ae60,color:#fff;

    Start["[38, 27, 43, 3]"]:::base
    D1["[38, 27]"]:::div
    D2["[43, 3]"]:::div
    D1_1["[38]"]:::div
    D1_2["[27]"]:::div
    D2_1["[43]"]:::div
    D2_2["[3]"]:::div
    
    Start --> D1
    Start --> D2
    D1 --> D1_1
    D1 --> D1_2
    D2 --> D2_1
    D2 --> D2_2

    M1["[27, 38]"]:::merged
    M2["[3, 43]"]:::merged
    Final["[3, 27, 38, 43]"]:::merged

    D1_1 & D1_2 --> M1
    D2_1 & D2_2 --> M2
    M1 & M2 --> Final
\`

### B. Barqaror (Stable) vs Nobarqaror (Unstable) Saralash
- **Stable Sorting:** Massivda qiymati teng bo'lgan elementlar o'zaro tartibini o'zgartirmasdan saqlab qoladi (masalan, Merge Sort, Insertion Sort).
- **Unstable Sorting:** Teng elementlar o'rni almashib ketishi mumkin (masalan, Quick Sort, Heap Sort, Selection Sort).

### C. Pivot Tanlash Strategiyalari (Quick Sort)
Quick Sort tezligi pivot elementga bog'liq. Agar pivot sifatida eng chekka (eng kichik yoki eng katta) element tanlansa, massiv muvozanatsiz bo'linadi va tezlik $O(n^2)$ ga tushadi. Buni oldini olish usullari:
1. **Random Pivot:** Pivotni tasodifiy indeksdan olish.
2. **Median-of-Three:** Boshlang'ich, o'rtadagi va oxirgi elementlarning medianasini pivot sifatida tanlash.

\`mermaid
graph LR
    classDef pivot fill:#e67e22,stroke:#d35400,color:#fff;
    classDef normal fill:#3498db,stroke:#2980b9,color:#fff;

    P["Pivot: 5"]:::pivot
    N1["[ Kichiklar: 3, 2 ]"]:::normal
    N2["[ Kattalar: 8 ]"]:::normal
    
    N1 --> P
    P --> N2
\`

## 4. AMALIYOT
Chiziqli qidiruv (Linear Search) barcha elementlarni birma-bir ko'rib chiqadi:
\`javascript
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}
\`

Ikkilik qidiruv (Binary Search) saralangan massiv uchun:
\`javascript
function binarySearch(arr, val) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
\`

## 5. XATOLAR (Common mistakes)
1. **Saralanmagan massivda Binary Search ishlatish:** Binary Search ishlashi uchun massiv mutlaqo saralangan bo'lishi shart.
2. **Katta ma'lumotlar uchun quadratic saralash tanlash:** Katta hajmdagi ma'lumotlar uchun deyarli hech qachon $O(n^2)$ lik algoritmlarni (Bubble, Selection) ishlatmaslik kerak. Ularning o'rniga Merge Sort yoki Quick Sort tanlanadi.
3. **Qo'shimcha xotira sarfi:** Merge Sort barqaror (stable) va tez bo'lsa-da, u massivlarni birlashtirishda qo'shimcha $O(n)$ xotira talab qiladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Linear Search qachon ishlatiladi?**
Ma'lumotlar kichik va tartibsiz bo'lganda hamda ularni saralashga ketadigan vaqt qidiruv vaqtidan ko'p bo'lganda.

**2. Barqaror (Stable) saralash nima?**
Agar massivda qiymati teng bo'lgan elementlar bo'lsa, ularning saralashdan oldingi boshlang'ich o'zaro tartibini o'zgartirmasdan saqlab qoladigan saralash barqaror deyiladi.

**3. V8 motoridagi Array.prototype.sort() qaysi algoritmdan foydalanadi?**
V8 motorida Timsort (Merge Sort va Insertion Sort gibridi) ishlatiladi, u barqaror va juda tezdir.
`,
  exercises: [
    {
      id: 1,
      title: "Chiziqli qidiruv (Linear Search)",
      instruction: "Massivdan berilgan `val` qiymatini chiziqli qidirib, uning indeksini qaytaruvchi `linearSearch(arr, val)` funksiyasini yozing (topilmasa -1).",
      startingCode: "function linearSearch(arr, val) {\n  // Kodni yozing\n}",
      hint: "for (let i = 0; i < arr.length; i++) { if (arr[i] === val) return i; } return -1;",
      test: "if (typeof linearSearch !== 'function') return 'linearSearch topilmadi'; if (linearSearch([5, 8, 2], 8) !== 1) return 'Mavjud element topilmadi'; if (linearSearch([5, 8, 2], 10) !== -1) return 'Mavjud bo\\'lmagan element uchun -1 qaytishi kerak'; return null;"
    },
    {
      id: 2,
      title: "Ikkilik qidiruv (Binary Search)",
      instruction: "Saralangan massivdan `val` qiymatini qidiruvchi `binarySearch(arr, val)` funksiyasini O(log n) da yozing.",
      startingCode: "function binarySearch(arr, val) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    // Shartlarni yozing\n  }\n  return -1;\n}",
      hint: "if(arr[mid] === val) return mid;\nelse if(arr[mid] < val) left = mid + 1;\nelse right = mid - 1;",
      test: "if (typeof binarySearch !== 'function') return 'binarySearch topilmadi'; if (binarySearch([1, 3, 5, 7], 5) !== 2) return 'Binary search xato'; if (binarySearch([1, 3, 5, 7], 4) !== -1) return 'Xato topildi'; return null;"
    },
    {
      id: 3,
      title: "Bubble Sort",
      instruction: "Berilgan sonlar massivini o'sish tartibida saralaydigan `bubbleSort(arr)` funksiyasini yozing (massivni o'zini o'zgartiring - in-place).",
      startingCode: "function bubbleSort(arr) {\n  // Ichma-ich looplar yordamida solishtirib o'rin almashtiring\n  return arr;\n}",
      hint: "for(let i=0; i<arr.length; i++) {\n  for(let j=0; j<arr.length-1-i; j++) {\n    if(arr[j] > arr[j+1]) {\n      let temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;\n    }\n  }\n} return arr;",
      test: "if (typeof bubbleSort !== 'function') return 'bubbleSort topilmadi'; const a = [3, 1, 4, 2]; bubbleSort(a); if (a[0] !== 1 || a[3] !== 4) return 'Massiv to\\'g\\'ri saralanmadi'; return null;"
    },
    {
      id: 4,
      title: "Selection Sort",
      instruction: "Har safar eng kichik elementni topib boshiga qo'yish orqali saralaydigan `selectionSort(arr)` funksiyasini yozing (in-place).",
      startingCode: "function selectionSort(arr) {\n  // Selection sort yozing\n  return arr;\n}",
      hint: "for(let i=0; i<arr.length; i++) {\n  let minIdx = i;\n  for(let j=i+1; j<arr.length; j++) {\n    if(arr[j] < arr[minIdx]) minIdx = j;\n  }\n  if(minIdx !== i) { let temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp; }\n} return arr;",
      test: "if (typeof selectionSort !== 'function') return 'selectionSort topilmadi'; const a = [5, 2, 9, 1]; selectionSort(a); if(a[0] !== 1 || a[3] !== 9) return 'Selection sort xato'; return null;"
    },
    {
      id: 5,
      title: "Insertion Sort",
      instruction: "Har bir elementni chap tomondagi to'g'ri o'rniga joylash orqali saralaydigan `insertionSort(arr)` funksiyasini yozing (in-place).",
      startingCode: "function insertionSort(arr) {\n  // Insertion sort yozing\n  return arr;\n}",
      hint: "for(let i=1; i<arr.length; i++) {\n  let key = arr[i];\n  let j = i - 1;\n  while(j >= 0 && arr[j] > key) {\n    arr[j+1] = arr[j];\n    j--;\n  }\n  arr[j+1] = key;\n} return arr;",
      test: "if (typeof insertionSort !== 'function') return 'insertionSort topilmadi'; const a = [4, 3, 2, 1]; insertionSort(a); if(a[0] !== 1 || a[3] !== 4) return 'Insertion sort xato'; return null;"
    },
    {
      id: 6,
      title: "Merge Sort - Ikki massivni birlashtirish",
      instruction: "Ikkita tartiblangan massivni qabul qilib, ularni bitta tartiblangan massivga birlashtirib qaytaruvchi `merge(arr1, arr2)` funksiyasini yozing.",
      startingCode: "function merge(arr1, arr2) {\n  const result = [];\n  let i = 0, j = 0;\n  // Elementlarni solishtirib qo'shing\n  return result;\n}",
      hint: "while(i < arr1.length && j < arr2.length) {\n  if(arr1[i] < arr2[j]) { result.push(arr1[i]); i++; }\n  else { result.push(arr2[j]); j++; }\n}\nreturn result.concat(arr1.slice(i)).concat(arr2.slice(j));",
      test: "if (typeof merge !== 'function') return 'merge topilmadi'; const res = merge([1, 5], [2, 6]); if(res[0]!==1 || res[1]!==2 || res[2]!==5 || res[3]!==6) return 'Birlashtirish xato'; return null;"
    },
    {
      id: 7,
      title: "Merge Sort (Recursive)",
      instruction: "Merge Sort algoritmini rekursiv ravishda to'liq yozing (oldin yozilgan `merge` funksiyasidan foydalanishingiz mumkin).",
      startingCode: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  // Bo'ling va rekursiv saralang\n}",
      hint: "const left = mergeSort(arr.slice(0, mid));\nconst right = mergeSort(arr.slice(mid));\nreturn merge(left, right); // Bu yerda merge helper funksiyasi chaqiriladi",
      test: "if (typeof mergeSort !== 'function') return 'mergeSort topilmadi';\n// merge helperini ta'minlaymiz\nfunction merge(a1, a2) {\n  let r = [], i = 0, j = 0;\n  while(i<a1.length && j<a2.length) { if(a1[i]<a2[j]) r.push(a1[i++]); else r.push(a2[j++]); }\n  return r.concat(a1.slice(i)).concat(a2.slice(j));\n}\nconst sorted = mergeSort([38, 27, 43, 3]); if(sorted[0]!==3 || sorted[3]!==43) return 'Saralash xato'; return null;"
    },
    {
      id: 8,
      title: "Quick Sort - Partition",
      instruction: "Quick Sort uchun massiv oxirgi elementini pivot tanlab, pivot indeksini qaytaruvchi `partition(arr, start, end)` metodini yozing.",
      startingCode: "function partition(arr, start, end) {\n  let pivot = arr[end];\n  let i = start - 1;\n  // Elementlarni pivot bilan solishtirib joyini almashtiring\n}",
      hint: "for (let j = start; j < end; j++) {\n  if (arr[j] < pivot) {\n    i++;\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n}\n[arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];\nreturn i + 1;",
      test: "if (typeof partition !== 'function') return 'partition topilmadi'; const list = [3, 8, 2, 5]; const pIdx = partition(list, 0, 3); if(list[pIdx] !== 5) return 'Pivot to\\'g\\'ri joylashtirilmadi'; return null;"
    },
    {
      id: 9,
      title: "Quick Sort (Recursive)",
      instruction: "Quick Sort algoritmini massivni in-place saralaydigan qilib yozing (avvalgi partition funksiyasidan foydalaning).",
      startingCode: "function quickSort(arr, left = 0, right = arr.length - 1) {\n  if (left < right) {\n    // partition chaqiring va rekursiv quickSort qiling\n  }\n  return arr;\n}",
      hint: "let pivotIndex = partition(arr, left, right);\nquickSort(arr, left, pivotIndex - 1);\nquickSort(arr, pivotIndex + 1, right);\nreturn arr;",
      test: "if (typeof quickSort !== 'function') return 'quickSort topilmadi';\nfunction partition(arr, start, end) {\n  let pivot = arr[end], i = start - 1;\n  for(let j=start; j<end; j++) { if(arr[j]<pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; } }\n  [arr[i+1], arr[end]] = [arr[end], arr[i+1]]; return i+1;\n}\nconst list = [9, -3, 5, 2, 6, 8, -6, 1, 3]; quickSort(list); if(list[0] !== -6 || list[8] !== 9) return 'Quick sort xato saralayapti'; return null;"
    },
    {
      id: 10,
      title: "Ternary Search",
      instruction: "Massivni uch qismga bo'lib qidiradigan `ternarySearch(arr, val, left, right)` rekursiv funksiyasini yozing.",
      startingCode: "function ternarySearch(arr, val, left, right) {\n  if (right >= left) {\n    let mid1 = left + Math.floor((right - left) / 3);\n    let mid2 = right - Math.floor((right - left) / 3);\n    // Qidiruv shartlarini yozing\n  }\n  return -1;\n}",
      hint: "if (arr[mid1] === val) return mid1;\nif (arr[mid2] === val) return mid2;\nif (val < arr[mid1]) return ternarySearch(arr, val, left, mid1 - 1);\nif (val > arr[mid2]) return ternarySearch(arr, val, mid2 + 1, right);\nreturn ternarySearch(arr, val, mid1 + 1, mid2 - 1);",
      test: "if (typeof ternarySearch !== 'function') return 'ternarySearch topilmadi'; const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]; if (ternarySearch(list, 6, 0, 8) !== 5) return 'Ternary search topa olmadi'; return null;"
    },
    {
      id: 11,
      title: "Qidiruv orqali joylash indeksi (Search Insert Position)",
      instruction: "Saralangan massiv va target berilgan. Agar target bor bo'lsa indeksini, yo'q bo'lsa tartib bo'yicha qayerga joylanishi kerak bo'lgan indeksni qaytaruvchi funksiyani yozing.",
      startingCode: "function searchInsert(nums, target) {\n  let left = 0, right = nums.length - 1;\n  // Binary search yordamida yozing\n}",
      hint: "while(left <= right) {\n  let mid = Math.floor((left+right)/2);\n  if(nums[mid] === target) return mid;\n  else if(nums[mid] < target) left = mid + 1;\n  else right = mid - 1;\n} return left;",
      test: "if (typeof searchInsert !== 'function') return 'searchInsert topilmadi'; if(searchInsert([1, 3, 5, 6], 5) !== 2) return 'Bor element uchun xato'; if(searchInsert([1, 3, 5, 6], 2) !== 1) return 'Joylashish indeksi xato'; return null;"
    },
    {
      id: 12,
      title: "Barqarorlikni tekshirish",
      instruction: "Saralash algoritmlaridan `Merge Sort` barqaror (stable) yoki yo'qligini bildiruvchi boolean qiymatli `isMergeSortStable` o'zgaruvchisini yarating.",
      startingCode: "const isMergeSortStable = ",
      hint: "true",
      test: "if (typeof isMergeSortStable === 'undefined') return 'isMergeSortStable aniqlanmagan'; if(isMergeSortStable !== true) return 'Merge Sort barqaror algoritm hisoblanadi'; return null;"
    },
    {
      id: 13,
      title: "Aylantirilgan saralangan massivdan qidirish (Search in Rotated Sorted Array)",
      instruction: "O'sib borish tartibida saralangan, lekin ma'lum bir pivot nuqtada aylantirilgan (masalan, `[4,5,6,7,0,1,2]`) massiv `nums` va `target` soni berilgan. Target qiymatini massiv ichidan O(log n) vaqt murakkabligida qidirib uning indeksini qaytaruvchi `searchInRotatedArray(nums, target)` funksiyasini yozing. (Topilmasa -1).",
      startingCode: "function searchInRotatedArray(nums, target) {\n  // Aylantirilgan saralangan massivdan targetni O(log n) da toping\n}",
      hint: "O(log n) uchun standart Binary Search yozing. Har doim massivning kamida bitta yarmi (chap yoki o'ng) mutlaqo saralangan bo'ladi. target shu diapazonga tushish-tushmasligiga qarab qidiruvni davom ettiring.",
      test: "if (typeof searchInRotatedArray !== 'function') return 'searchInRotatedArray funksiyasi topilmadi';\nif (searchInRotatedArray([4,5,6,7,0,1,2], 0) === 4 && searchInRotatedArray([4,5,6,7,0,1,2], 3) === -1 && searchInRotatedArray([1], 0) === -1) {\n  return null;\n}\nreturn 'Qidiruv natijasi noto\\'g\\'ri';"
    },
    {
      id: 14,
      title: "Massivdagi K-chi eng katta element (Kth Largest Element)",
      instruction: "Tartibsiz sonlar massivi `nums` va butun son `k` berilgan. Massivdagi `k`-chi eng katta elementni aniqlab qaytaruvchi `findKthLargest(nums, k)` funksiyasini yozing. (Masalan, `[3,2,1,5,6,4]` va `k = 2` bo'lsa, 2-chi eng katta element `5`).",
      startingCode: "function findKthLargest(nums, k) {\n  // K-chi eng katta elementni toping\n}",
      hint: "Massivni o'sib borish tartibida saralang. k-chi eng katta element oxiridan k-chi element bo'ladi (nums.length - k indeksida).",
      test: "if (typeof findKthLargest !== 'function') return 'findKthLargest funksiyasi topilmadi';\nif (findKthLargest([3,2,1,5,6,4], 2) === 5 && findKthLargest([3,2,3,1,2,4,5,5,6], 4) === 4) {\n  return null;\n}\nreturn 'K-chi eng katta element noto\\'g\\'ri topildi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Faqat saralangan (sorted) massivlar ustida ishlaydigan qidiruv algoritmi qaysi?",
      options: ["Linear Search", "Binary Search", "DFS", "Bubble Search"],
      correctAnswer: 1,
      explanation: "Binary Search o'rtadagi elementga qarab qidiruv doirasini o'ng yoki chapga qisqartirishi uchun ma'lumotlar tartiblangan (saralangan) bo'lishi majburiydir."
    },
    {
      id: 2,
      question: "Ikkilik qidiruv (Binary Search) ning eng yomon holatdagi vaqt murakkabligi qancha?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "Har safar element topilmaganda massiv hajmi 2 barobarga bo'linganligi sababli, algoritm logarifmik vaqtda, ya'ni O(log n) tezlikda ishlaydi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri Divide and Conquer (Bo'l va hukmronlik qil) yondashuvi asosida ishlaydi?",
      options: ["Selection Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort muammoni (massivni) kichik qismlarga bo'lib saralaydi va keyin ularni birlashtiradi. Bu 'Divide and Conquer' deyiladi."
    },
    {
      id: 4,
      question: "Bubble Sort-ning eng yomon va o'rtacha holatdagi vaqt murakkabligi qanday?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
      correctAnswer: 2,
      explanation: "Bubble Sort har bir elementni yonma-yon solishtirish uchun ichma-ich ikkita sikldan foydalanadi, bu esa uning murakkabligini O(n^2) qiladi."
    },
    {
      id: 5,
      question: "Merge Sort va Quick Sort orasidagi farq nima?",
      options: [
        "Quick Sort doimo qo'shimcha ko'p xotira oladi",
        "Merge Sort barqaror (stable) va har doim O(n log n) ishlaydi, Quick Sort esa in-place ishlaydi lekin eng yomon holatda O(n^2) bo'lishi mumkin",
        "Merge Sort faqat sonlarni saralaydi",
        "Quick Sort faqat kichik massivlar uchun ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Merge Sort barqaror va kafolatlangan O(n log n) tezlikka ega, lekin qo'shimcha massivlar uchun xotira sarflaydi. Quick Sort esa in-place (qo'shimcha xotirasiz) ishlaydi, ammo yomon pivot tanlansa O(n^2) bo'lib ketishi xavfi bor."
    },
    {
      id: 6,
      question: "Quick Sort-da massiv elementlarini tanlangan elementdan kichik va kattalarga ajratish uchun ishlatiladigan qiymat nima deyiladi?",
      options: ["Root", "Pivot (Tayanch)", "Index", "Key"],
      correctAnswer: 1,
      explanation: "Quick Sort-da massivni o'rtasidan bo'lish uchun tayanch nuqta sifatida tanlangan element 'Pivot' deb ataladi."
    },
    {
      id: 7,
      question: "Saralash barqarorligi (Stability) deganda nima tushuniladi?",
      options: [
        "Algoritmning hech qachon xato bermasligi",
        "Teng qiymatli elementlarning boshlang'ich o'zaro tartibi saralashdan keyin har safar o'zgarmasdan saqlanishi",
        "Algoritm faqat bir xil kompyuterda ishlashi",
        "Xotira sarfining doimiyligi"
      ],
      correctAnswer: 1,
      explanation: "Barqaror saralash teng kalitli ob'ektlarning tartibini saqlaydi, bu esa masalan ma'lumotlar bazasida bir nechta ustun bo'yicha saralashda juda muhim."
    },
    {
      id: 8,
      question: "Deyarli saralangan (nearly sorted) massiv uchun qaysi oddiy saralash algoritmi eng samarali hisoblanadi (O(n) ga yaqin)?",
      options: ["Selection Sort", "Insertion Sort", "Bubble Sort", "Quick Sort"],
      correctAnswer: 1,
      explanation: "Insertion Sort deyarli saralangan massivlar uchun elementlarni surishga kam vaqt sarflaydi va chiziqli O(n) tezlikka yaqin ishlaydi."
    },
    {
      id: 9,
      question: "Selection Sort algoritmining ishlash prinsipi qanday?",
      options: [
        "Elementlarni tasodifiy almashtirish",
        "Har safar massivning saralanmagan qismidan eng kichik elementni topib, saralangan qismning oxiriga (boshiga) qo'yish",
        "Elementlarni ikkiga bo'lish",
        "Stek tuzilmasidan foydalanish"
      ],
      correctAnswer: 1,
      explanation: "Selection Sort har bir qadamda eng minimal elementni tanlab (select qilib) oladi va uni massiv boshidagi tegishli o'rniga joylashtiradi."
    },
    {
      id: 10,
      question: "Binary Search o'rtacha necha qadamda 1024 ta elementdan iborat saralangan ro'yxatdan kerakli elementni topadi?",
      options: ["1024 qadam", "Ko'pi bilan 10 qadam", "Ko'pi bilan 512 qadam", "1 qadam"],
      correctAnswer: 1,
      explanation: "log_2(1024) = 10 bo'lganligi sababli, Binary Search ko'pi bilan 10 ta solishtirish orqali elementni topadi yoki uning yo'qligini aniqlaydi."
    },
    {
      id: 11,
      question: "JavaScript V8 motoridagi `Array.prototype.sort()` metodi asosan qaysi saralash aralashmasiga asoslangan?",
      options: ["Quick Sort", "Timsort (Merge + Insertion Sort gibridi)", "Bubble Sort", "Heap Sort"],
      correctAnswer: 1,
      explanation: "Zamonaviy JavaScript dvigatellari barqaror va real ma'lumotlar uchun optimal bo'lgan Timsort algoritmidan foydalanadi."
    },
    {
      id: 12,
      question: "Massiv elementlari bir tekis taqsimlangan saralangan massivda (masalan, telefon kitobi) Binary Search-dan ham tezroq ishlaydigan algoritm qaysi?",
      options: ["Interpolation Search", "Selection Sort", "DFS", "Linear Search"],
      correctAnswer: 0,
      explanation: "Interpolation Search kiritilgan qiymatning joylashuvini taxmin qilish formulasi yordamida bir tekis taqsimlangan ma'lumotlar uchun o'rtacha O(log(log n)) tezlikda ishlaydi."
    },
    {
      id: 13,
      question: "Aylantirilgan saralangan massivdan (Rotated Sorted Array) target elementni qidirishda qanday qilib O(log n) tezlikni saqlab qolish mumkin?",
      options: [
        "Massivni boshidan oxirigacha oddiy chiziqli qidirib",
        "Massivni o'rtasidan bo'lganda, kamida bitta yarmi (chap yoki o'ng) har doim to'g'ri saralangan bo'lishi qoidasidan foydalanib va Binary Search-ni moslashtirib",
        "Massivni avval to'liq boshqacha tartibda saralab",
        "Daraxt tuzilishiga o'tkazib"
      ],
      correctAnswer: 1,
      explanation: "Aylantirilgan saralangan massivda har safar mid o'rtadagi nuqtani olganimizda, massivning chap yoki o'ng yarmi albatta saralangan bo'ladi. Biz target qiymatining shu saralangan qism diapazoniga tushishini tekshirib, Binary search chegaralarini toraytiramiz va O(log n) tezlikka erishamiz."
    },
    {
      id: 14,
      question: "Massivdagi K-chi eng katta elementni qidirishda Quick Select algoritmi Quick Sort-dan qanday ustunlikka ega?",
      options: [
        "Quick Select qo'shimcha massivlar yaratadi",
        "Quick Sort har doim har ikkala bo'lingan qismni rekursiv saralaydi (O(n log n)), Quick Select esa faqat target indeks joylashgan birgina qism bo'yicha davom etadi va o'rtacha O(n) vaqt oladi",
        "Quick Select faqat musbat sonlar uchun ishlaydi",
        "Unda pivot ishlatilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Quick Select joriy pivot bo'yicha partitioning qilgach, k-chi element qaysi tomondaligiga qarab faqatgina bitta qism bo'ylab davom etadi. Bu har safar muammoni yarmiga qisqartirib, o'rtacha O(n) vaqt murakkabligini beradi."
    }
  ]
};
