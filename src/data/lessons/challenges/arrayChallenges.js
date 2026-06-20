export const arrayChallenges = {
  title: "Array (Massiv) Masalalari",
  content: `
Ushbu darsda faqat amaliy masalalar yig'ilgan. 
Siz massivlarni yaratish, o'zgartirish, qidirish va tartiblash kabi eng ko'p ishlatiladigan algoritmlarni mashq qilasiz. Har bir masala uchun yechimni yozing va testdan o'tkazing.
`,
  exercises: [
    {
      id: "arr-chal-1",
      title: "Oxirgi elementni topish",
      description: "Berilgan massivning eng oxirgi elementini qaytaruvchi `getLastElement(arr)` funksiyasini tuzing.",
      initialCode: "function getLastElement(arr) {\n  // kodni yozing\n}",
      solution: "function getLastElement(arr) {\n  return arr[arr.length - 1];\n}",
      tests: [
        { test: "return getLastElement([1, 2, 3]) === 3;", description: "[1, 2, 3] uchun 3 qaytishi kerak" },
        { test: "return getLastElement(['a', 'b']) === 'b';", description: "['a', 'b'] uchun 'b' qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-2",
      title: "Barcha elementlarni yig'indisi",
      description: "Sonlardan iborat massiv qabul qilib, uning barcha elementlari yig'indisini qaytaruvchi `sumArray(arr)` funksiyasini yozing.",
      initialCode: "function sumArray(arr) {\n  // kodni yozing\n}",
      solution: "function sumArray(arr) {\n  return arr.reduce((sum, curr) => sum + curr, 0);\n}",
      tests: [
        { test: "return sumArray([1, 2, 3, 4]) === 10;", description: "[1,2,3,4] uchun 10 qaytishi kerak" },
        { test: "return sumArray([-1, 1]) === 0;", description: "[-1, 1] uchun 0 qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-3",
      title: "Juft sonlarni ajratish",
      description: "Sonlardan iborat massivdan faqat juft sonlarni ajratib, yangi massivda qaytaruvchi `filterEvens(arr)` funksiyasini yozing.",
      initialCode: "function filterEvens(arr) {\n  // kodni yozing\n}",
      solution: "function filterEvens(arr) {\n  return arr.filter(n => n % 2 === 0);\n}",
      tests: [
        { test: "return filterEvens([1, 2, 3, 4, 5, 6]).join(',') === '2,4,6';", description: "Juft sonlar to'g'ri filtrlangan bo'lishi kerak" }
      ]
    },
    {
      id: "arr-chal-4",
      title: "Massivni teskarisiga o'girish",
      description: "Berilgan massivni teskari tartibda (reverse) qaytaruvchi `reverseArray(arr)` funksiyasini tuzing (Asl massivni o'zgartirmang!).",
      initialCode: "function reverseArray(arr) {\n  // kodni yozing\n}",
      solution: "function reverseArray(arr) {\n  return [...arr].reverse();\n}",
      tests: [
        { test: "const arr = [1,2]; const res = reverseArray(arr); return res[0] === 2 && arr[0] === 1;", description: "Asl massiv o'zgarmasligi va natija [2, 1] bo'lishi kerak" }
      ]
    },
    {
      id: "arr-chal-5",
      title: "Eng katta sonni topish",
      description: "Sonlardan iborat massiv ichidagi eng katta sonni qaytaruvchi `findMax(arr)` funksiyasini yozing.",
      initialCode: "function findMax(arr) {\n  // kodni yozing\n}",
      solution: "function findMax(arr) {\n  return Math.max(...arr);\n}",
      tests: [
        { test: "return findMax([1, 5, 2, 9, 3]) === 9;", description: "Eng katta son 9 bo'lishi kerak" },
        { test: "return findMax([-5, -1, -10]) === -1;", description: "Manfiy sonlar orasidan -1 qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-6",
      title: "Nollar sonini sanash",
      description: "Berilgan massivda nechta 0 qatnashganini sanaydigan `countZeros(arr)` funksiyasini yozing.",
      initialCode: "function countZeros(arr) {\n  // kodni yozing\n}",
      solution: "function countZeros(arr) {\n  return arr.filter(n => n === 0).length;\n}",
      tests: [
        { test: "return countZeros([1, 0, 2, 0, 3]) === 2;", description: "Massivda 2 ta nol bor" },
        { test: "return countZeros([1, 2, 3]) === 0;", description: "Nol yo'q bo'lsa 0 qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-7",
      title: "Takrorlangan elementlarni o'chirish",
      description: "Massivdan barcha takrorlangan elementlarni (duplicate) olib tashlab, faqat bittadan yagona (unique) qilib qaytaruvchi `removeDuplicates(arr)` funksiyasini yozing.",
      initialCode: "function removeDuplicates(arr) {\n  // kodni yozing\n}",
      solution: "function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}",
      tests: [
        { test: "return removeDuplicates([1, 2, 2, 3, 1]).join(',') === '1,2,3';", description: "Natija [1, 2, 3] bo'lishi kerak" },
        { test: "return removeDuplicates(['a', 'a', 'b']).join(',') === 'a,b';", description: "Satrlar uchun ham ishlashi kerak" }
      ]
    },
    {
      id: "arr-chal-8",
      title: "Har bir sonni kvadratga oshirish",
      description: "Massivdagi har bir sonning kvadratidan (x*x) iborat yangi massiv qaytaradigan `squareArray(arr)` funksiyasini yozing.",
      initialCode: "function squareArray(arr) {\n  // kodni yozing\n}",
      solution: "function squareArray(arr) {\n  return arr.map(x => x * x);\n}",
      tests: [
        { test: "return squareArray([1, 2, 3]).join(',') === '1,4,9';", description: "[1, 4, 9] qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-9",
      title: "Bir xil elementga to'ldirish",
      description: "Uzunligi `n` ga teng va barcha elementlari `value` ga teng bo'lgan massiv yaratuvchi `fillArray(n, value)` funksiyasini yozing.",
      initialCode: "function fillArray(n, value) {\n  // kodni yozing\n}",
      solution: "function fillArray(n, value) {\n  return Array(n).fill(value);\n}",
      tests: [
        { test: "return fillArray(3, 'a').join(',') === 'a,a,a';", description: "3 ta 'a' dan iborat massiv yaratilishi kerak" },
        { test: "return fillArray(0, 5).length === 0;", description: "0 uzunlik berilsa bo'sh massiv qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-10",
      title: "Massivlar kesishmasi (Intersection)",
      description: "Ikkita massiv qabul qilib, ularning ikkisida ham bor bo'lgan (kesishgan) elementlardan yangi massiv tuzuvchi `intersect(arr1, arr2)` funksiyasini yozing. Natijada takroriy sonlar bo'lmasin.",
      initialCode: "function intersect(arr1, arr2) {\n  // kodni yozing\n}",
      solution: "function intersect(arr1, arr2) {\n  const set1 = new Set(arr1);\n  return [...new Set(arr2)].filter(x => set1.has(x));\n}",
      tests: [
        { test: "return intersect([1, 2, 3], [2, 3, 4]).join(',') === '2,3';", description: "[2, 3] qaytishi kerak" },
        { test: "return intersect([1, 1, 2], [1]).join(',') === '1';", description: "Faqat unique elementlar bo'lishi kerak" }
      ]
    },
    {
      id: "arr-chal-11",
      title: "Matnni massivga ajratish",
      description: "Berilgan gapdagi so'zlarni ajratib, massiv ko'rinishida qaytaruvchi `splitWords(sentence)` funksiyasini yozing. So'zlar bo'shliq (space) bilan ajratilgan deb hisoblang.",
      initialCode: "function splitWords(sentence) {\n  // kodni yozing\n}",
      solution: "function splitWords(sentence) {\n  return sentence ? sentence.split(' ') : [];\n}",
      tests: [
        { test: "return splitWords('Hello JS world').join(',') === 'Hello,JS,world';", description: "So'zlar to'g'ri ajratilishi kerak" },
        { test: "return splitWords('').length === 0 || splitWords('').join('') === '';", description: "Bo'sh matn uchun to'g'ri ishlashi kerak" }
      ]
    },
    {
      id: "arr-chal-12",
      title: "Tartibni tekshirish",
      description: "Massiv o'sish tartibida (har bir keyingi son oldingisidan katta yoki teng) joylashgan bo'lsa `true`, yo'qsa `false` qaytaruvchi `isSorted(arr)` funksiyasini yozing.",
      initialCode: "function isSorted(arr) {\n  // kodni yozing\n}",
      solution: "function isSorted(arr) {\n  for(let i = 1; i < arr.length; i++) {\n    if(arr[i] < arr[i-1]) return false;\n  }\n  return true;\n}",
      tests: [
        { test: "return isSorted([1, 2, 3, 4]) === true;", description: "[1, 2, 3, 4] uchun true" },
        { test: "return isSorted([1, 3, 2]) === false;", description: "[1, 3, 2] uchun false" },
        { test: "return isSorted([5, 5, 5]) === true;", description: "Teng sonlar ham to'g'ri (o'sish yoki bir xil)" }
      ]
    },
    {
      id: "arr-chal-13",
      title: "Ikkita massivni ulash",
      description: "Berilgan ikkita massivni bitta massiv qilib birlashtiradigan `mergeArrays(arr1, arr2)` funksiyasini yozing.",
      initialCode: "function mergeArrays(arr1, arr2) {\n  // kodni yozing\n}",
      solution: "function mergeArrays(arr1, arr2) {\n  return [...arr1, ...arr2];\n}",
      tests: [
        { test: "return mergeArrays([1, 2], [3, 4]).join(',') === '1,2,3,4';", description: "Ikkita massiv to'g'ri ulangan bo'lishi kerak" }
      ]
    },
    {
      id: "arr-chal-14",
      title: "Faqat truthy qiymatlar",
      description: "Massiv ichidan barcha falsy qiymatlarni (false, null, 0, \"\", undefined, NaN) olib tashlaydigan `compact(arr)` funksiyasini yozing.",
      initialCode: "function compact(arr) {\n  // kodni yozing\n}",
      solution: "function compact(arr) {\n  return arr.filter(Boolean);\n}",
      tests: [
        { test: "return compact([0, 1, false, 2, '', 3]).join(',') === '1,2,3';", description: "Falsy qiymatlar to'g'ri tozalanishi kerak" }
      ]
    },
    {
      id: "arr-chal-15",
      title: "Qatorni tekislash (Flatten)",
      description: "Ikki o'lchamli massivni (massiv ichida massiv) bir o'lchamli qilib tekislaydigan `flattenArray(arr)` funksiyasini tuzing.",
      initialCode: "function flattenArray(arr) {\n  // kodni yozing\n}",
      solution: "function flattenArray(arr) {\n  return arr.flat();\n}",
      tests: [
        { test: "return flattenArray([[1, 2], [3, 4], [5]]).join(',') === '1,2,3,4,5';", description: "Massiv to'g'ri tekislanishi kerak" }
      ]
    },
    {
      id: "arr-chal-16",
      title: "Eng ko'p qatnashgan element",
      description: "Massivda eng ko'p marta takrorlangan elementni topuvchi `mostFrequent(arr)` funksiyasini yozing.",
      initialCode: "function mostFrequent(arr) {\n  // kodni yozing\n}",
      solution: "function mostFrequent(arr) {\n  let counts = {};\n  let maxCount = 0;\n  let maxItem = null;\n  for(let i=0; i<arr.length; i++) {\n    counts[arr[i]] = (counts[arr[i]] || 0) + 1;\n    if(counts[arr[i]] > maxCount) {\n      maxCount = counts[arr[i]];\n      maxItem = arr[i];\n    }\n  }\n  return maxItem;\n}",
      tests: [
        { test: "return mostFrequent([1, 2, 2, 3, 2, 4]) === 2;", description: "Eng ko'p takrorlangan son 2" },
        { test: "return mostFrequent(['a', 'b', 'b', 'a', 'a']) === 'a';", description: "Satrlar uchun ishlashi kerak ('a')" }
      ]
    },
    {
      id: "arr-chal-17",
      title: "Mavjudligini tekshirish",
      description: "Massiv ichida qidirilayotgan son (target) mavjud bo'lsa `true`, aks holda `false` qaytaruvchi `contains(arr, target)` funksiyasini yozing.",
      initialCode: "function contains(arr, target) {\n  // kodni yozing\n}",
      solution: "function contains(arr, target) {\n  return arr.includes(target);\n}",
      tests: [
        { test: "return contains([10, 20, 30], 20) === true;", description: "Massivda son bor bo'lsa true qaytishi kerak" },
        { test: "return contains([10, 20, 30], 40) === false;", description: "Massivda yo'q son uchun false qaytishi kerak" }
      ]
    },
    {
      id: "arr-chal-18",
      title: "Indeksni topish",
      description: "Berilgan element massivning qaysi indeksida joylashganini topuvchi `findIndex(arr, element)` funksiyasini yozing. Agar yo'q bo'lsa -1 qaytarsin.",
      initialCode: "function findIndex(arr, element) {\n  // kodni yozing\n}",
      solution: "function findIndex(arr, element) {\n  return arr.indexOf(element);\n}",
      tests: [
        { test: "return findIndex(['a', 'b', 'c'], 'b') === 1;", description: "'b' harfi 1-indeksda joylashgan" },
        { test: "return findIndex([1, 2, 3], 5) === -1;", description: "Yo'q element uchun -1" }
      ]
    },
    {
      id: "arr-chal-19",
      title: "Toq indeksli elementlar",
      description: "Massivdagi faqat toq indeksda (1, 3, 5...) joylashgan elementlardan iborat yangi massiv qaytaruvchi `getOddIndices(arr)` funksiyasini tuzing.",
      initialCode: "function getOddIndices(arr) {\n  // kodni yozing\n}",
      solution: "function getOddIndices(arr) {\n  return arr.filter((_, idx) => idx % 2 !== 0);\n}",
      tests: [
        { test: "return getOddIndices(['a', 'b', 'c', 'd']).join(',') === 'b,d';", description: "Natija ['b', 'd'] bo'lishi kerak" }
      ]
    },
    {
      id: "arr-chal-20",
      title: "Massivning yarmini olish",
      description: "Berilgan massivning birinchi yarmidan iborat massivni qaytaradigan `getFirstHalf(arr)` funksiyasini yozing. Toq sonli uzunlik bo'lsa kichik tomonga yaxlitlang (Math.floor).",
      initialCode: "function getFirstHalf(arr) {\n  // kodni yozing\n}",
      solution: "function getFirstHalf(arr) {\n  const half = Math.floor(arr.length / 2);\n  return arr.slice(0, half);\n}",
      tests: [
        { test: "return getFirstHalf([1, 2, 3, 4]).join(',') === '1,2';", description: "[1, 2] qaytishi kerak" },
        { test: "return getFirstHalf([1, 2, 3, 4, 5]).join(',') === '1,2';", description: "Toq sonli (5 ta) da yarmi 2 ta bo'lishi kerak (Math.floor(2.5) = 2)" }
      ]
    }
  ]
};
