export const leetcodeStrings = {
  title: "LeetCode: String (Satr) Algoritmlari",
  content: `
Ushbu bo'limda siz eng mashhur intervyu platformasi bo'lgan LeetCode'dagi "String" (Satr) mavzusiga oid algoritmlarni ishlaysiz. Ular yirik kompaniyalarning texnik suhbatlarida tez-tez so'raladi. O'z yechimingizni optimal (tez) ishlashiga ham ahamiyat qarating!
`,
  exercises: [
    {
      id: "lc-str-1",
      title: "Valid Anagram (Haqiqiy Anagramma)",
      description: "Ikkita satr (s va t) berilgan. Agar t satr s ning anagrammasi (harflarining o'rnini almashtirib yozilgan varianti) bo'lsa `true`, yo'qsa `false` qaytaruvchi `isAnagram(s, t)` funksiyasini yozing.",
      initialCode: "function isAnagram(s, t) {\n  // kodni yozing\n}",
      solution: "function isAnagram(s, t) {\n  if(s.length !== t.length) return false;\n  const charCount = {};\n  for(let char of s) {\n    charCount[char] = (charCount[char] || 0) + 1;\n  }\n  for(let char of t) {\n    if(!charCount[char]) return false;\n    charCount[char]--;\n  }\n  return true;\n}",
      tests: [
        { test: "return isAnagram('anagram', 'nagaram') === true;", description: "'anagram' va 'nagaram' anagrammalar" },
        { test: "return isAnagram('rat', 'car') === false;", description: "'rat' va 'car' anagramma emas" }
      ]
    },
    {
      id: "lc-str-2",
      title: "Valid Palindrome",
      description: "Berilgan satrdan barcha bo'shliqlar va belgilarni (harf va raqam bo'lmaganlarni) olib tashlab, hammasini kichik harfga o'tkazganda, o'ngdan va chapdan bir xil o'qilsa `true` qaytaruvchi `isPalindrome(s)` funksiyasini yozing.",
      initialCode: "function isPalindrome(s) {\n  // kodni yozing\n}",
      solution: "function isPalindrome(s) {\n  const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  let left = 0, right = cleanStr.length - 1;\n  while(left < right) {\n    if(cleanStr[left] !== cleanStr[right]) return false;\n    left++; right--;\n  }\n  return true;\n}",
      tests: [
        { test: "return isPalindrome('A man, a plan, a canal: Panama') === true;", description: "Tozalanganda 'amanaplanacanalpanama' qoladi (palindrom)" },
        { test: "return isPalindrome('race a car') === false;", description: "Palindrom emas" }
      ]
    },
    {
      id: "lc-str-3",
      title: "First Unique Character in a String",
      description: "Satr ichida takrorlanmaydigan eng birinchi belgi (harf) indeksini qaytaruvchi `firstUniqChar(s)` funksiyasini yozing. Agar bunday belgi yo'q bo'lsa, -1 qaytarsin.",
      initialCode: "function firstUniqChar(s) {\n  // kodni yozing\n}",
      solution: "function firstUniqChar(s) {\n  const count = {};\n  for(let char of s) count[char] = (count[char] || 0) + 1;\n  for(let i = 0; i < s.length; i++) {\n    if(count[s[i]] === 1) return i;\n  }\n  return -1;\n}",
      tests: [
        { test: "return firstUniqChar('leetcode') === 0;", description: "'l' birinchi takrorlanmas belgi (indeks 0)" },
        { test: "return firstUniqChar('loveleetcode') === 2;", description: "'v' harfi indeks 2" },
        { test: "return firstUniqChar('aabb') === -1;", description: "Takrorlanmas harf yo'q" }
      ]
    },
    {
      id: "lc-str-4",
      title: "Reverse String (In-place Array)",
      description: "Belgilar massivi qabul qilib, uni 'in-place' (joyida, yangi massiv yaratmasdan) teskarisiga o'giruvchi `reverseString(s)` funksiyasini yozing.",
      initialCode: "function reverseString(s) {\n  // kodni yozing\n}",
      solution: "function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while(left < right) {\n    let temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    left++; right--;\n  }\n  return s;\n}",
      tests: [
        { test: "const s = ['h','e','l','l','o']; reverseString(s); return s.join('') === 'olleh';", description: "Massiv teskarisiga o'girildi" }
      ]
    },
    {
      id: "lc-str-5",
      title: "Longest Common Prefix",
      description: "Satrlar massivi ichidagi barcha so'zlar uchun eng uzun umumiy prefiksni (boshlang'ich qismni) topuvchi `longestCommonPrefix(strs)` funksiyasini yozing. Agar prefiks bo'lmasa, `\"\"` (bo'sh satr) qaytaring.",
      initialCode: "function longestCommonPrefix(strs) {\n  // kodni yozing\n}",
      solution: "function longestCommonPrefix(strs) {\n  if(!strs.length) return '';\n  let prefix = strs[0];\n  for(let i=1; i<strs.length; i++) {\n    while(strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.substring(0, prefix.length - 1);\n      if(prefix === '') return '';\n    }\n  }\n  return prefix;\n}",
      tests: [
        { test: "return longestCommonPrefix(['flower','flow','flight']) === 'fl';", description: "'fl' hammada qatnashgan umumiy boshlanish" },
        { test: "return longestCommonPrefix(['dog','racecar','car']) === '';", description: "Umumiy qism yo'q" }
      ]
    },
    {
      id: "lc-str-6",
      title: "Length of Last Word",
      description: "Berilgan satrdagi eng oxirgi so'zning uzunligini qaytaruvchi `lengthOfLastWord(s)` funksiyasini tuzing (oxirida bo'shliqlar bo'lishi mumkin).",
      initialCode: "function lengthOfLastWord(s) {\n  // kodni yozing\n}",
      solution: "function lengthOfLastWord(s) {\n  return s.trim().split(' ').pop().length;\n}",
      tests: [
        { test: "return lengthOfLastWord('Hello World') === 5;", description: "'World' ning uzunligi 5" },
        { test: "return lengthOfLastWord('   fly me   to   the moon  ') === 4;", description: "'moon' uzunligi 4" }
      ]
    },
    {
      id: "lc-str-7",
      title: "Implement strStr() (indexOf)",
      description: "Katta matn (`haystack`) ichidan kichik satr (`needle`) ning birinchi marta uchrash indeksini qaytaruvchi `strStr(haystack, needle)` funksiyasini tuzing. Agar yo'q bo'lsa -1.",
      initialCode: "function strStr(haystack, needle) {\n  // kodni yozing\n}",
      solution: "function strStr(haystack, needle) {\n  if(needle === '') return 0;\n  return haystack.indexOf(needle);\n}",
      tests: [
        { test: "return strStr('hello', 'll') === 2;", description: "'ll' 2-indeksdan boshlanadi" },
        { test: "return strStr('aaaaa', 'bba') === -1;", description: "Topilmasa -1" }
      ]
    },
    {
      id: "lc-str-8",
      title: "Isomorphic Strings",
      description: "Ikkita satr `s` va `t` berilgan. Agar ularning belgilari o'zaro to'liq mos ravishda (biri faqat bittasiga) o'zgara olsa izomorf hisoblanadi. Shuni aniqlovchi `isIsomorphic(s, t)` funksiyasini yozing.",
      initialCode: "function isIsomorphic(s, t) {\n  // kodni yozing\n}",
      solution: "function isIsomorphic(s, t) {\n  if(s.length !== t.length) return false;\n  const mapST = {}, mapTS = {};\n  for(let i=0; i<s.length; i++) {\n    const c1 = s[i], c2 = t[i];\n    if((mapST[c1] && mapST[c1] !== c2) || (mapTS[c2] && mapTS[c2] !== c1)) return false;\n    mapST[c1] = c2;\n    mapTS[c2] = c1;\n  }\n  return true;\n}",
      tests: [
        { test: "return isIsomorphic('egg', 'add') === true;", description: "'egg' va 'add' izomorf (e->a, g->d)" },
        { test: "return isIsomorphic('foo', 'bar') === false;", description: "'foo' va 'bar' izomorf emas (o ham a ga, ham r ga o'ta olmaydi)" }
      ]
    },
    {
      id: "lc-str-9",
      title: "Group Anagrams",
      description: "Satrlar massivi berilgan. Ulardan o'zaro anagramma bo'lganlarini bitta guruhga yig'uvchi `groupAnagrams(strs)` yozing (Natija - ichma-ich massiv).",
      initialCode: "function groupAnagrams(strs) {\n  // kodni yozing\n}",
      solution: "function groupAnagrams(strs) {\n  const map = {};\n  for(let str of strs) {\n    const sorted = str.split('').sort().join('');\n    if(!map[sorted]) map[sorted] = [];\n    map[sorted].push(str);\n  }\n  return Object.values(map);\n}",
      tests: [
        { test: "const res = groupAnagrams(['eat','tea','tan','ate','nat','bat']); return res.length === 3;", description: "3 ta alohida anagramma guruhi hosil bo'ladi" }
      ]
    },
    {
      id: "lc-str-10",
      title: "Longest Substring Without Repeating Characters",
      description: "Berilgan satrdan barcha belgilari faqat bir marta takrorlanadigan eng uzun qism (substring) ning uzunligini topuvchi `lengthOfLongestSubstring(s)` yozing.",
      initialCode: "function lengthOfLongestSubstring(s) {\n  // kodni yozing\n}",
      solution: "function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLength = 0;\n  for(let right=0; right<s.length; right++) {\n    while(set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  return maxLength;\n}",
      tests: [
        { test: "return lengthOfLongestSubstring('abcabcbb') === 3;", description: "'abc' eng uzun (3)" },
        { test: "return lengthOfLongestSubstring('bbbbb') === 1;", description: "'b' eng uzun (1)" },
        { test: "return lengthOfLongestSubstring('pwwkew') === 3;", description: "'wke' eng uzun (3)" }
      ]
    },
    {
      id: "lc-str-11",
      title: "Word Pattern",
      description: "Pattern (namuna) (masalan, 'abba') va gap (`s = 'dog cat cat dog'`) berilgan. Ular mosligini (izomorfizmdek) aniqlovchi `wordPattern(pattern, s)` yozing.",
      initialCode: "function wordPattern(pattern, s) {\n  // kodni yozing\n}",
      solution: "function wordPattern(pattern, s) {\n  const words = s.split(' ');\n  if(pattern.length !== words.length) return false;\n  const mapPW = {}, mapWP = {};\n  for(let i=0; i<pattern.length; i++) {\n    const p = pattern[i], w = words[i];\n    if((mapPW[p] && mapPW[p] !== w) || (mapWP[w] && mapWP[w] !== p)) return false;\n    mapPW[p] = w; mapWP[w] = p;\n  }\n  return true;\n}",
      tests: [
        { test: "return wordPattern('abba', 'dog cat cat dog') === true;", description: "Qonuniyat to'g'ri (a->dog, b->cat)" },
        { test: "return wordPattern('abba', 'dog cat cat fish') === false;", description: "Natija false bo'lishi kerak" }
      ]
    },
    {
      id: "lc-str-12",
      title: "Reverse Words in a String",
      description: "Gap ichidagi barcha so'zlar ketma-ketligini teskarisiga aylantirib qaytaruvchi (so'zlarni ichini emas) `reverseWords(s)` funksiyasini yozing. Ortiqcha bo'shliqlarni olib tashlang.",
      initialCode: "function reverseWords(s) {\n  // kodni yozing\n}",
      solution: "function reverseWords(s) {\n  return s.trim().split(/\\s+/).reverse().join(' ');\n}",
      tests: [
        { test: "return reverseWords('the sky is blue') === 'blue is sky the';", description: "So'zlar teskari joylashadi" },
        { test: "return reverseWords('  hello world  ') === 'world hello';", description: "Chetki va o'rtadagi ortiqcha joylar ketishi kerak" }
      ]
    },
    {
      id: "lc-str-13",
      title: "Roman to Integer",
      description: "Rim raqamlari (I=1, V=5, X=10, L=50, C=100, D=500, M=1000) dagi satrni oddiy integer'ga aylantiruvchi `romanToInt(s)` yozing (masalan, IV=4, IX=9).",
      initialCode: "function romanToInt(s) {\n  // kodni yozing\n}",
      solution: "function romanToInt(s) {\n  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };\n  let sum = 0;\n  for(let i=0; i<s.length; i++) {\n    if(map[s[i]] < map[s[i+1]]) {\n      sum -= map[s[i]];\n    } else {\n      sum += map[s[i]];\n    }\n  }\n  return sum;\n}",
      tests: [
        { test: "return romanToInt('III') === 3;", description: "3 ga teng" },
        { test: "return romanToInt('MCMXCIV') === 1994;", description: "MCMXCIV = 1000 + (1000-100) + (100-10) + (5-1) = 1994" }
      ]
    },
    {
      id: "lc-str-14",
      title: "Add Binary",
      description: "Ikkita binarniy (0 va 1 lardan iborat) satr berilgan. Ularni qo'shib yana binarniy satr qaytaruvchi `addBinary(a, b)` funksiyasini yozing. Raqamlar juda katta bo'lishi mumkin (BigInt kerak).",
      initialCode: "function addBinary(a, b) {\n  // kodni yozing\n}",
      solution: "function addBinary(a, b) {\n  return (BigInt('0b'+a) + BigInt('0b'+b)).toString(2);\n}",
      tests: [
        { test: "return addBinary('11', '1') === '100';", description: "11 + 1 = 100 (ikkilik sanoqda)" },
        { test: "return addBinary('1010', '1011') === '10101';", description: "To'g'ri ishlashi kerak" }
      ]
    },
    {
      id: "lc-str-15",
      title: "Find the Difference",
      description: "`s` va `t` satrlar berilgan. `t` satri `s` ning harflaridan aralashtirilib yana bitta yangi xat qo'shilgan. O'sha bitta qo'shilgan (ortiqcha) xatni topuvchi `findTheDifference(s, t)` yozing.",
      initialCode: "function findTheDifference(s, t) {\n  // kodni yozing\n}",
      solution: "function findTheDifference(s, t) {\n  let code = 0;\n  for(let char of s) code ^= char.charCodeAt(0);\n  for(let char of t) code ^= char.charCodeAt(0);\n  return String.fromCharCode(code);\n}",
      tests: [
        { test: "return findTheDifference('abcd', 'abcde') === 'e';", description: "'e' ortiqcha qo'shilgan" },
        { test: "return findTheDifference('', 'y') === 'y';", description: "'y' ortiqcha" }
      ]
    },
    {
      id: "lc-str-16",
      title: "Valid Parentheses",
      description: "Faqat `()[]{}` lardan iborat qavslar satri berilgan. Barcha ochiq qavslar to'g'ri yopilgan bo'lsa `true` qaytaruvchi `isValid(s)` yozing.",
      initialCode: "function isValid(s) {\n  // kodni yozing\n}",
      solution: "function isValid(s) {\n  const stack = [];\n  const pairs = { '(':')', '[':']', '{':'}' };\n  for(let char of s) {\n    if(pairs[char]) {\n      stack.push(char);\n    } else {\n      let last = stack.pop();\n      if(pairs[last] !== char) return false;\n    }\n  }\n  return stack.length === 0;\n}",
      tests: [
        { test: "return isValid('()[]{}') === true;", description: "Hammasi juft to'g'ri yopilgan" },
        { test: "return isValid('(]') === false;", description: "Noto'g'ri qavslar jufti" }
      ]
    },
    {
      id: "lc-str-17",
      title: "Detect Capital",
      description: "So'zda katta harflar ishlatilishi to'g'ri ekanini tekshiradigan `detectCapitalUse(word)` yozing. To'g'ri: 'USA' (hammasi katta), 'leetcode' (hammasi kichik), 'Google' (birinchisi katta qolgani kichik).",
      initialCode: "function detectCapitalUse(word) {\n  // kodni yozing\n}",
      solution: "function detectCapitalUse(word) {\n  return /^[A-Z]+$/.test(word) || /^[a-z]+$/.test(word) || /^[A-Z][a-z]+$/.test(word);\n}",
      tests: [
        { test: "return detectCapitalUse('USA') === true;", description: "True" },
        { test: "return detectCapitalUse('FlaG') === false;", description: "False (oxirida katta qolib ketgan)" }
      ]
    },
    {
      id: "lc-str-18",
      title: "Fizz Buzz",
      description: "`n` son qabul qilib 1 dan `n` gacha bo'lgan satrlar massivi qaytaruvchi `fizzBuzz(n)` yozing. Agar 3 ga bo'linsa 'Fizz', 5 ga bo'linsa 'Buzz', ham 3 ga ham 5 ga bo'linsa 'FizzBuzz' qaytarsin. Qolganida sonning o'zini satrda.",
      initialCode: "function fizzBuzz(n) {\n  // kodni yozing\n}",
      solution: "function fizzBuzz(n) {\n  let res = [];\n  for(let i=1; i<=n; i++) {\n    if(i%15===0) res.push('FizzBuzz');\n    else if(i%3===0) res.push('Fizz');\n    else if(i%5===0) res.push('Buzz');\n    else res.push(String(i));\n  }\n  return res;\n}",
      tests: [
        { test: "return fizzBuzz(3)[2] === 'Fizz';", description: "3-element Fizz bo'lishi kerak" },
        { test: "return fizzBuzz(5)[4] === 'Buzz';", description: "5-element Buzz bo'lishi kerak" },
        { test: "return fizzBuzz(15)[14] === 'FizzBuzz';", description: "15-element FizzBuzz bo'lishi kerak" }
      ]
    },
    {
      id: "lc-str-19",
      title: "Count Segments",
      description: "Bo'shliqlar bilan ajratilgan so'zlar (segmentlar) sonini aniqlovchi `countSegments(s)` yozing (ketma-ket bir nechta bo'shliq kelishi mumkin).",
      initialCode: "function countSegments(s) {\n  // kodni yozing\n}",
      solution: "function countSegments(s) {\n  if(!s.trim()) return 0;\n  return s.trim().split(/\\s+/).length;\n}",
      tests: [
        { test: "return countSegments('Hello, my name is John') === 5;", description: "5 ta so'z bor" },
        { test: "return countSegments('  ') === 0;", description: "Hech nima yo'q" }
      ]
    },
    {
      id: "lc-str-20",
      title: "Longest Palindromic Substring",
      description: "Berilgan satr ichidagi eng uzun palindrom bo'lgan qismni (substring) topuvchi `longestPalindrome(s)` yozing (dinamik dasturlash yoki markazdan kengaytirish algoritmi tavsiya etiladi).",
      initialCode: "function longestPalindrome(s) {\n  // kodni yozing\n}",
      solution: "function longestPalindrome(s) {\n  if(s.length < 2) return s;\n  let start = 0, maxLength = 1;\n  function expand(l, r) {\n    while(l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    if(r - l - 1 > maxLength) {\n      maxLength = r - l - 1;\n      start = l + 1;\n    }\n  }\n  for(let i=0; i<s.length; i++) {\n    expand(i, i);\n    expand(i, i+1);\n  }\n  return s.substring(start, start + maxLength);\n}",
      tests: [
        { test: "const res = longestPalindrome('babad'); return res === 'bab' || res === 'aba';", description: "'bab' yoki 'aba' qaytishi kerak" },
        { test: "return longestPalindrome('cbbd') === 'bb';", description: "'bb' uzunligi 2 bo'lgan palindrom" }
      ]
    }
  ]
};
