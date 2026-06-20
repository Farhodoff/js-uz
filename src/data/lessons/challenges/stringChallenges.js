export const stringChallenges = {
  title: "String (Satr) Masalalari",
  content: `
Ushbu darsda satrlar ustida amallar bajarish ko'nikmalarini mustahkamlaysiz. Qidirish, kesish, o'zgartirish va satrlarni formatlash bo'yicha eng ko'p so'raladigan intervyu masalalarini ishlaysiz.
`,
  exercises: [
    {
      id: "str-chal-1",
      title: "Satr uzunligi",
      description: "Berilgan satrning uzunligini qaytaruvchi `getStringLength(str)` funksiyasini yozing.",
      initialCode: "function getStringLength(str) {\n  // kodni yozing\n}",
      solution: "function getStringLength(str) {\n  return str.length;\n}",
      tests: [
        { test: "return getStringLength('hello') === 5;", description: "'hello' so'zining uzunligi 5 ta harf" },
        { test: "return getStringLength('') === 0;", description: "Bo'sh satr uzunligi 0 bo'lishi kerak" }
      ]
    },
    {
      id: "str-chal-2",
      title: "Katta harflarga o'tkazish",
      description: "Berilgan barcha harflarni katta harf (uppercase) ko'rinishiga o'tkazuvchi `makeUpperCase(str)` funksiyasini yozing.",
      initialCode: "function makeUpperCase(str) {\n  // kodni yozing\n}",
      solution: "function makeUpperCase(str) {\n  return str.toUpperCase();\n}",
      tests: [
        { test: "return makeUpperCase('js') === 'JS';", description: "'js' -> 'JS' ga aylanishi kerak" }
      ]
    },
    {
      id: "str-chal-3",
      title: "Birinchi harfni qaytarish",
      description: "Satrning faqat birinchi harfini qaytaruvchi `getFirstChar(str)` funksiyasini yozing. Bo'sh satr uchun bo'sh satr qaytarsin.",
      initialCode: "function getFirstChar(str) {\n  // kodni yozing\n}",
      solution: "function getFirstChar(str) {\n  return str.charAt(0);\n}",
      tests: [
        { test: "return getFirstChar('apple') === 'a';", description: "'apple' dan 'a' qaytishi kerak" },
        { test: "return getFirstChar('') === '';", description: "Bo'sh satrda bo'sh qaytishi kerak" }
      ]
    },
    {
      id: "str-chal-4",
      title: "Satrni teskarisiga o'girish",
      description: "Berilgan satrni teskarisiga o'giruvchi (reverse) `reverseString(str)` funksiyasini yozing.",
      initialCode: "function reverseString(str) {\n  // kodni yozing\n}",
      solution: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
      tests: [
        { test: "return reverseString('hello') === 'olleh';", description: "'hello' -> 'olleh' bo'lishi kerak" }
      ]
    },
    {
      id: "str-chal-5",
      title: "So'z borligini tekshirish",
      description: "Birinchi satr (text) ichida ikkinchi satr (word) mavjudligini tekshirib true/false qaytaruvchi `containsWord(text, word)` funksiyasini yozing.",
      initialCode: "function containsWord(text, word) {\n  // kodni yozing\n}",
      solution: "function containsWord(text, word) {\n  return text.includes(word);\n}",
      tests: [
        { test: "return containsWord('I love coding', 'coding') === true;", description: "'coding' so'zi mavjud" },
        { test: "return containsWord('I love JS', 'Python') === false;", description: "'Python' so'zi mavjud emas" }
      ]
    },
    {
      id: "str-chal-6",
      title: "Bo'shliqlarni olib tashlash",
      description: "Satrning ikki chetidagi (boshi va oxiridagi) ortiqcha bo'shliqlarni (probel) olib tashlaydigan `trimString(str)` funksiyasini yozing.",
      initialCode: "function trimString(str) {\n  // kodni yozing\n}",
      solution: "function trimString(str) {\n  return str.trim();\n}",
      tests: [
        { test: "return trimString('  hello   ') === 'hello';", description: "Chetlaridagi bo'shliqlar tozalanishi kerak" }
      ]
    },
    {
      id: "str-chal-7",
      title: "So'zlarni sanash",
      description: "Berilgan gapda nechta so'z borligini sanovchi `countWords(sentence)` funksiyasini yozing (so'zlar orasida faqat bittadan probel bor deb faraz qiling). Bo'sh satr uchun 0 qaytarsin.",
      initialCode: "function countWords(sentence) {\n  // kodni yozing\n}",
      solution: "function countWords(sentence) {\n  if(!sentence.trim()) return 0;\n  return sentence.trim().split(' ').length;\n}",
      tests: [
        { test: "return countWords('One two three') === 3;", description: "3 ta so'z mavjud" },
        { test: "return countWords('') === 0;", description: "Bo'sh satrda 0 qaytishi kerak" }
      ]
    },
    {
      id: "str-chal-8",
      title: "Ma'lum qismini kesib olish",
      description: "Satrning berilgan `start` indeksidan boshlab `end` indeksigacha bo'lgan qismini qirqib oladigan `sliceString(str, start, end)` funksiyasini yozing.",
      initialCode: "function sliceString(str, start, end) {\n  // kodni yozing\n}",
      solution: "function sliceString(str, start, end) {\n  return str.slice(start, end);\n}",
      tests: [
        { test: "return sliceString('JavaScript', 0, 4) === 'Java';", description: "0 dan 4 gacha qirqib olish (4 kirmaydi)" }
      ]
    },
    {
      id: "str-chal-9",
      title: "Unli harflarni sanash",
      description: "Berilgan satrda nechta unli harf (a, e, i, o, u) borligini sanaydigan `countVowels(str)` funksiyasini yozing (katta-kichik harflarni inobatga oling).",
      initialCode: "function countVowels(str) {\n  // kodni yozing\n}",
      solution: "function countVowels(str) {\n  const matches = str.match(/[aeiou]/gi);\n  return matches ? matches.length : 0;\n}",
      tests: [
        { test: "return countVowels('hello') === 2;", description: "'hello' da 2 ta unli bor (e, o)" },
        { test: "return countVowels('APPLE') === 2;", description: "Katta harflar ham sanalishi kerak" },
        { test: "return countVowels('bcd') === 0;", description: "Unlilar bo'lmasa 0 qaytishi kerak" }
      ]
    },
    {
      id: "str-chal-10",
      title: "Satrlar bir xilligi",
      description: "Ikkita satr berilgan, ularning harflari katta/kichikligiga qaramasdan bir xil ekanini tekshiruvchi `isEqualIgnoreCase(str1, str2)` funksiyasini yozing.",
      initialCode: "function isEqualIgnoreCase(str1, str2) {\n  // kodni yozing\n}",
      solution: "function isEqualIgnoreCase(str1, str2) {\n  return str1.toLowerCase() === str2.toLowerCase();\n}",
      tests: [
        { test: "return isEqualIgnoreCase('Hello', 'hello') === true;", description: "'Hello' va 'hello' bir xil deb topilishi kerak" },
        { test: "return isEqualIgnoreCase('JS', 'TS') === false;", description: "Har xil satrlar false qaytishi kerak" }
      ]
    },
    {
      id: "str-chal-11",
      title: "Ismni bosh harf bilan yozish",
      description: "Berilgan ismning birinchi harfini kattalashtirib, qolganlarini qanday bo'lsa shunday qoldiradigan `capitalizeName(name)` funksiyasini yozing.",
      initialCode: "function capitalizeName(name) {\n  // kodni yozing\n}",
      solution: "function capitalizeName(name) {\n  if(!name) return '';\n  return name.charAt(0).toUpperCase() + name.slice(1);\n}",
      tests: [
        { test: "return capitalizeName('ali') === 'Ali';", description: "'ali' -> 'Ali' bo'lishi kerak" },
        { test: "return capitalizeName('JOHN') === 'JOHN';", description: "'JOHN' -> 'JOHN' bo'lib qoladi" }
      ]
    },
    {
      id: "str-chal-12",
      title: "Satrni takrorlash",
      description: "Berilgan `str` satrini n marta ketma-ket yopishtirib (takrorlab) qaytaruvchi `repeatString(str, n)` funksiyasini tuzing.",
      initialCode: "function repeatString(str, n) {\n  // kodni yozing\n}",
      solution: "function repeatString(str, n) {\n  return str.repeat(n);\n}",
      tests: [
        { test: "return repeatString('a', 3) === 'aaa';", description: "3 marta takrorlanishi kerak" },
        { test: "return repeatString('hi', 0) === '';", description: "0 marta bo'lsa bo'sh satr qaytishi kerak" }
      ]
    },
    {
      id: "str-chal-13",
      title: "So'zni almashtirish",
      description: "Matn ichidagi birinchi uchragan eski so'zni (oldWord) yangisiga (newWord) almashtiruvchi `replaceWord(text, oldWord, newWord)` funksiyasini tuzing.",
      initialCode: "function replaceWord(text, oldWord, newWord) {\n  // kodni yozing\n}",
      solution: "function replaceWord(text, oldWord, newWord) {\n  return text.replace(oldWord, newWord);\n}",
      tests: [
        { test: "return replaceWord('I like cats', 'cats', 'dogs') === 'I like dogs';", description: "So'z to'g'ri almashtirilishi kerak" }
      ]
    },
    {
      id: "str-chal-14",
      title: "Palindromni tekshirish",
      description: "Satrni o'ngdan o'qisa ham, chapdan o'qisa ham bir xil o'qilsa (masalan, 'madam', 'racecar'), bunday satrlar Palindrom deyiladi. Berilgan satr palindrom ekanini tekshiruvchi `isPalindrome(str)` funksiyasini yozing.",
      initialCode: "function isPalindrome(str) {\n  // kodni yozing\n}",
      solution: "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}",
      tests: [
        { test: "return isPalindrome('madam') === true;", description: "'madam' palindrom" },
        { test: "return isPalindrome('hello') === false;", description: "'hello' palindrom emas" }
      ]
    },
    {
      id: "str-chal-15",
      title: "Faqat raqamlardan iboratligini tekshirish",
      description: "Berilgan satr faqat 0-9 raqamlardan tashkil topgan bo'lsa `true`, aks holda `false` qaytaruvchi `isOnlyDigits(str)` funksiyasini tuzing. Bo'sh satr false qaytarsin.",
      initialCode: "function isOnlyDigits(str) {\n  // kodni yozing\n}",
      solution: "function isOnlyDigits(str) {\n  return str.length > 0 && /^\\d+$/.test(str);\n}",
      tests: [
        { test: "return isOnlyDigits('12345') === true;", description: "Faqat sonlar uchun true" },
        { test: "return isOnlyDigits('123a5') === false;", description: "Harf aralashsa false" },
        { test: "return isOnlyDigits('') === false;", description: "Bo'sh satr uchun false" }
      ]
    },
    {
      id: "str-chal-16",
      title: "Belgi indeksini topish",
      description: "Matn ichida berilgan belgining eng oxirgi marta uchragan joyi indeksini qaytaruvchi `findLastIndex(text, char)` funksiyasini tuzing.",
      initialCode: "function findLastIndex(text, char) {\n  // kodni yozing\n}",
      solution: "function findLastIndex(text, char) {\n  return text.lastIndexOf(char);\n}",
      tests: [
        { test: "return findLastIndex('banana', 'a') === 5;", description: "Oxirgi 'a' ning indeksi 5" },
        { test: "return findLastIndex('hello', 'z') === -1;", description: "Mavjud bo'lmasa -1 qaytaradi" }
      ]
    },
    {
      id: "str-chal-17",
      title: "Matn oxirini tekshirish",
      description: "Berilgan matn `ending` so'zi bilan tugash-tugamasligini aniqlovchi `endsWithWord(text, ending)` funksiyasini yozing.",
      initialCode: "function endsWithWord(text, ending) {\n  // kodni yozing\n}",
      solution: "function endsWithWord(text, ending) {\n  return text.endsWith(ending);\n}",
      tests: [
        { test: "return endsWithWord('hello world', 'world') === true;", description: "'world' bilan tugaydi" },
        { test: "return endsWithWord('hello world', 'hello') === false;", description: "Noto'g'ri so'z bilan texamasligi kerak" }
      ]
    },
    {
      id: "str-chal-18",
      title: "Katta harfli so'zga aylantirish",
      description: "Gapdagi har bir so'zning birinchi harfini bosh harfga (katta harfga) aylantirib qaytaruvchi `capitalizeWords(sentence)` funksiyasini yozing.",
      initialCode: "function capitalizeWords(sentence) {\n  // kodni yozing\n}",
      solution: "function capitalizeWords(sentence) {\n  return sentence.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');\n}",
      tests: [
        { test: "return capitalizeWords('hello from js') === 'Hello From Js';", description: "Har bir so'z bosh harf bilan yozilishi kerak" }
      ]
    },
    {
      id: "str-chal-19",
      title: "Satrni to'ldirish (Pad Start)",
      description: "Berilgan satr uzunligi `targetLength` ga yetguncha uning boshiga `padString` ni qo'shib boruvchi `padWithZeros(str, targetLength)` funksiyasini yozing. Doim 0 ('0') qo'shsin.",
      initialCode: "function padWithZeros(str, targetLength) {\n  // kodni yozing\n}",
      solution: "function padWithZeros(str, targetLength) {\n  return String(str).padStart(targetLength, '0');\n}",
      tests: [
        { test: "return padWithZeros('5', 3) === '005';", description: "Uzunligi 3 ga yetguncha '0' lar qo'shiladi" },
        { test: "return padWithZeros('123', 3) === '123';", description: "Yetarli bo'lsa o'zgarmaydi" }
      ]
    },
    {
      id: "str-chal-20",
      title: "Bir xil belgilarni o'chirish",
      description: "Satrdagi barcha bir xil yonma-yon kelgan belgilarni bittaga qisqartiruvchi `removeAdjacentDuplicates(str)` funksiyasini yozing (masalan, 'aabbbc' -> 'abc').",
      initialCode: "function removeAdjacentDuplicates(str) {\n  // kodni yozing\n}",
      solution: "function removeAdjacentDuplicates(str) {\n  let res = '';\n  for(let i=0; i<str.length; i++) {\n    if(str[i] !== str[i-1]) res += str[i];\n  }\n  return res;\n}",
      tests: [
        { test: "return removeAdjacentDuplicates('aabbbc') === 'abc';", description: "Yonma-yon kelgan bir xil belgilarni olib tashlaydi" },
        { test: "return removeAdjacentDuplicates('abab') === 'abab';", description: "Yonma-yon kelmaganlar o'zgarmaydi" }
      ]
    }
  ]
};
