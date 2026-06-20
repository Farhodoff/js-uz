export const leetcodeHashMaps = {
  title: "LeetCode: HashMap va Set Algoritmlari",
  content: `
Obyektlar (HashMaps) va Set (To'plam) lar dasturlashda eng ko'p ishlatiladigan va qidiruvni O(1) vaqtga tushiradigan muhim ma'lumotlar tuzilmasidir. Ushbu darsda ular orqali optimallashtirish sirlarini o'rganasiz.
`,
  exercises: [
    {
      id: "lc-hash-1",
      title: "Ransom Note",
      description: "`ransomNote` va `magazine` degan ikki satr berilgan. Agar magazine ichidagi harflardan ransomNote tuzish mumkin bo'lsa `true` qaytaruvchi `canConstruct(ransomNote, magazine)` yozing.",
      initialCode: "function canConstruct(ransomNote, magazine) {\n  // kodni yozing\n}",
      solution: "function canConstruct(ransomNote, magazine) {\n  const map = {};\n  for(let c of magazine) map[c] = (map[c]||0) + 1;\n  for(let c of ransomNote) {\n    if(!map[c]) return false;\n    map[c]--;\n  }\n  return true;\n}",
      tests: [
        { test: "return canConstruct('a', 'b') === false;", description: "b dan a tuzib bo'lmaydi" },
        { test: "return canConstruct('aa', 'aab') === true;", description: "aab dan aa bemalol chiqadi" }
      ]
    },
    {
      id: "lc-hash-2",
      title: "Contains Duplicate II",
      description: "Massiv va `k` butun soni berilgan. Agar massivda ikkita bir xil `nums[i] == nums[j]` bo'lsa va ularning indekslari farqi (abs(i - j) <= k) bo'lsa `true` qaytaruvchi `containsNearbyDuplicate(nums, k)` yozing.",
      initialCode: "function containsNearbyDuplicate(nums, k) {\n  // kodni yozing\n}",
      solution: "function containsNearbyDuplicate(nums, k) {\n  const map = new Map();\n  for(let i=0; i<nums.length; i++) {\n    if(map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;\n    map.set(nums[i], i);\n  }\n  return false;\n}",
      tests: [
        { test: "return containsNearbyDuplicate([1,2,3,1], 3) === true;", description: "1 lar orasi 3 ta farq" },
        { test: "return containsNearbyDuplicate([1,2,3,1,2,3], 2) === false;", description: "Bir xillar orasidagi masofa 2 dan katta" }
      ]
    },
    {
      id: "lc-hash-3",
      title: "Jewels and Stones",
      description: "`jewels` (qimmatbaho toshlar turlari, masalan 'aA') va `stones` (sizdagi toshlar 'aAAbbbb') satrlari berilgan. Sizdagi toshlar ichida nechtasi qimmatbaho ekanligini sanaydigan `numJewelsInStones(jewels, stones)` yozing.",
      initialCode: "function numJewelsInStones(jewels, stones) {\n  // kodni yozing\n}",
      solution: "function numJewelsInStones(jewels, stones) {\n  const set = new Set(jewels);\n  let count = 0;\n  for(let stone of stones) {\n    if(set.has(stone)) count++;\n  }\n  return count;\n}",
      tests: [
        { test: "return numJewelsInStones('aA', 'aAAbbbb') === 3;", description: "a (1 ta) + A (2 ta) = 3" },
        { test: "return numJewelsInStones('z', 'ZZ') === 0;", description: "0 qaytishi kerak" }
      ]
    },
    {
      id: "lc-hash-4",
      title: "First Unique Character",
      description: "Berilgan satrda faqat bir marta kelgan eng birinchi harfning indeksini qaytaruvchi `firstUniqChar(s)` yozing.",
      initialCode: "function firstUniqChar(s) {\n  // kodni yozing\n}",
      solution: "function firstUniqChar(s) {\n  let map = {};\n  for(let c of s) map[c] = (map[c]||0) + 1;\n  for(let i=0; i<s.length; i++) {\n    if(map[s[i]] === 1) return i;\n  }\n  return -1;\n}",
      tests: [
        { test: "return firstUniqChar('leetcode') === 0;", description: "l qaytishi kerak (indeks 0)" },
        { test: "return firstUniqChar('aabb') === -1;", description: "hamma harf 2 martadan ishtirok etgan" }
      ]
    },
    {
      id: "lc-hash-5",
      title: "Isomorphic Strings",
      description: "Ikkita satr izomorf ekanligini (harflari o'zaro to'liq mosligini) tekshiruvchi `isIsomorphic(s, t)` yozing.",
      initialCode: "function isIsomorphic(s, t) {\n  // kodni yozing\n}",
      solution: "function isIsomorphic(s, t) {\n  if(s.length !== t.length) return false;\n  const m1={}, m2={};\n  for(let i=0; i<s.length; i++) {\n    if(m1[s[i]] !== m2[t[i]]) return false;\n    m1[s[i]] = i+1; m2[t[i]] = i+1;\n  }\n  return true;\n}",
      tests: [
        { test: "return isIsomorphic('egg', 'add') === true;", description: "e->a, g->d (true)" },
        { test: "return isIsomorphic('foo', 'bar') === false;", description: "false bo'ladi" }
      ]
    },
    {
      id: "lc-hash-6",
      title: "Intersection of Two Arrays",
      description: "Ikkita massivdan faqat bir marta qatnashgan umumiy elementlarni (unique intersection) topuvchi `intersection(nums1, nums2)` yozing.",
      initialCode: "function intersection(nums1, nums2) {\n  // kodni yozing\n}",
      solution: "function intersection(nums1, nums2) {\n  const s1 = new Set(nums1);\n  return [...new Set(nums2)].filter(n => s1.has(n));\n}",
      tests: [
        { test: "return intersection([1,2,2,1], [2,2]).join(',') === '2';", description: "2 chiqishi kerak" }
      ]
    },
    {
      id: "lc-hash-7",
      title: "Intersection of Two Arrays II",
      description: "Ikkita massiv kesishmasini, takrorlanishlar sonini hisobga olgan holda qaytaruvchi `intersect(nums1, nums2)` yozing. Masalan: [1,2,2,1], [2,2] -> [2,2].",
      initialCode: "function intersect(nums1, nums2) {\n  // kodni yozing\n}",
      solution: "function intersect(nums1, nums2) {\n  const map = {};\n  for(let n of nums1) map[n] = (map[n]||0) + 1;\n  const res = [];\n  for(let n of nums2) {\n    if(map[n] > 0) {\n      res.push(n);\n      map[n]--;\n    }\n  }\n  return res;\n}",
      tests: [
        { test: "return intersect([1,2,2,1], [2,2]).join(',') === '2,2';", description: "Ikkita 2 ham kelishi kerak" }
      ]
    },
    {
      id: "lc-hash-8",
      title: "Longest Palindrome",
      description: "Satrdagi harflardan foydalanib yozish mumkin bo'lgan eng uzun palindromning maksimal uzunligini hisoblaydigan `longestPalindromeLength(s)` yozing.",
      initialCode: "function longestPalindromeLength(s) {\n  // kodni yozing\n}",
      solution: "function longestPalindromeLength(s) {\n  const set = new Set();\n  let len = 0;\n  for(let c of s) {\n    if(set.has(c)) { len += 2; set.delete(c); }\n    else { set.add(c); }\n  }\n  return set.size > 0 ? len + 1 : len;\n}",
      tests: [
        { test: "return longestPalindromeLength('abccccdd') === 7;", description: "dccaccd (7 harf)" }
      ]
    },
    {
      id: "lc-hash-9",
      title: "Word Pattern",
      description: "Pattern va satr izomorfligini tekshiruvchi `wordPattern(pattern, s)` yozing.",
      initialCode: "function wordPattern(pattern, s) {\n  // kodni yozing\n}",
      solution: "function wordPattern(pattern, s) {\n  let words = s.split(' ');\n  if(pattern.length !== words.length) return false;\n  let map1 = new Map(), map2 = new Map();\n  for(let i=0; i<words.length; i++) {\n    if(map1.get(pattern[i]) !== map2.get(words[i])) return false;\n    map1.set(pattern[i], i+1); map2.set(words[i], i+1);\n  }\n  return true;\n}",
      tests: [
        { test: "return wordPattern('abba', 'dog cat cat dog') === true;", description: "Izomorf (a=dog, b=cat)" }
      ]
    },
    {
      id: "lc-hash-10",
      title: "Find All Duplicates in an Array",
      description: "1 dan n gacha sonlardan iborat massivda faqat ikki marta qatnashgan elementlarni HashMap orqali topib, massiv ko'rinishida qaytaruvchi `findDuplicates(nums)` yozing.",
      initialCode: "function findDuplicates(nums) {\n  // kodni yozing\n}",
      solution: "function findDuplicates(nums) {\n  const map = {}, res = [];\n  for(let n of nums) {\n    if(map[n]) res.push(n);\n    else map[n] = 1;\n  }\n  return res;\n}",
      tests: [
        { test: "return findDuplicates([4,3,2,7,8,2,3,1]).join(',') === '2,3';", description: "2 va 3 takrorlangan" }
      ]
    },
    {
      id: "lc-hash-11",
      title: "Find Unique Character Frequency",
      description: "Massivda har bir son bir xil miqdorda takrorlanmagan bo'lsa (chastotalari har xil bo'lsa) true qaytaruvchi `uniqueOccurrences(arr)` yozing.",
      initialCode: "function uniqueOccurrences(arr) {\n  // kodni yozing\n}",
      solution: "function uniqueOccurrences(arr) {\n  const map = {};\n  for(let n of arr) map[n] = (map[n]||0) + 1;\n  const freqs = Object.values(map);\n  return freqs.length === new Set(freqs).size;\n}",
      tests: [
        { test: "return uniqueOccurrences([1,2,2,1,1,3]) === true;", description: "1->3 marta, 2->2 marta, 3->1 marta (hammasi har xil)" },
        { test: "return uniqueOccurrences([1,2]) === false;", description: "Ikkalasi ham 1 marta (bir xil takrorlanish, false)" }
      ]
    },
    {
      id: "lc-hash-12",
      title: "Subarray Sum Equals K",
      description: "Massivda yig'indisi K ga teng bo'ladigan uzluksiz yordamchi massivlar (subarray) sonini topuvchi `subarraySum(nums, k)` tuzing (HashMap va prefix sum ishlating).",
      initialCode: "function subarraySum(nums, k) {\n  // kodni yozing\n}",
      solution: "function subarraySum(nums, k) {\n  let map = {0: 1};\n  let count = 0, sum = 0;\n  for(let n of nums) {\n    sum += n;\n    if(map[sum - k]) count += map[sum - k];\n    map[sum] = (map[sum]||0) + 1;\n  }\n  return count;\n}",
      tests: [
        { test: "return subarraySum([1,1,1], 2) === 2;", description: "[1,1] va [1,1] jami 2 ta subarray" }
      ]
    },
    {
      id: "lc-hash-13",
      title: "Sort Characters By Frequency",
      description: "Satr berilgan, harflarni ularning chastotasiga qarab kamayish tartibida joylashtirib qaytaruvchi `frequencySort(s)` yozing.",
      initialCode: "function frequencySort(s) {\n  // kodni yozing\n}",
      solution: "function frequencySort(s) {\n  const map = {};\n  for(let c of s) map[c] = (map[c]||0)+1;\n  return Object.keys(map).sort((a,b) => map[b] - map[a]).map(c => c.repeat(map[c])).join('');\n}",
      tests: [
        { test: "return frequencySort('tree') === 'eert' || frequencySort('tree') === 'eetr';", description: "'eert' yoki 'eetr' bo'lishi kerak" }
      ]
    },
    {
      id: "lc-hash-14",
      title: "Top K Frequent Elements",
      description: "Massivdan eng ko'p takrorlangan k ta elementni massiv ko'rinishida qaytaruvchi `topKFrequent(nums, k)` tuzing.",
      initialCode: "function topKFrequent(nums, k) {\n  // kodni yozing\n}",
      solution: "function topKFrequent(nums, k) {\n  const map = {};\n  for(let n of nums) map[n] = (map[n]||0) + 1;\n  return Object.keys(map).sort((a,b)=>map[b]-map[a]).slice(0,k).map(Number);\n}",
      tests: [
        { test: "return topKFrequent([1,1,1,2,2,3], 2).join(',') === '1,2';", description: "Eng ko'p takrorlanganlar 1 va 2" }
      ]
    },
    {
      id: "lc-hash-15",
      title: "Group Anagrams (Hash)",
      description: "Satrlar massividagi anagrammalarni guruhlab qaytaruvchi `groupAnagrams(strs)` (hashmap yordamida).",
      initialCode: "function groupAnagrams(strs) {\n  // kodni yozing\n}",
      solution: "function groupAnagrams(strs) {\n  const map = {};\n  for(let str of strs) {\n    let sorted = str.split('').sort().join('');\n    if(!map[sorted]) map[sorted] = [];\n    map[sorted].push(str);\n  }\n  return Object.values(map);\n}",
      tests: [
        { test: "return groupAnagrams(['eat','tea']).length === 1;", description: "1 ta guruh" }
      ]
    },
    {
      id: "lc-hash-16",
      title: "Majority Element",
      description: "N/2 dan ko'p qatnashgan elementni qaytaruvchi `majorityElement(nums)` yozing.",
      initialCode: "function majorityElement(nums) {\n  // kodni yozing\n}",
      solution: "function majorityElement(nums) {\n  const map = {};\n  const half = nums.length / 2;\n  for(let n of nums) {\n    map[n] = (map[n]||0)+1;\n    if(map[n] > half) return n;\n  }\n}",
      tests: [
        { test: "return majorityElement([3,2,3]) === 3;", description: "3 dominat" }
      ]
    },
    {
      id: "lc-hash-17",
      title: "Valid Sudoku",
      description: "Sudoku doskasi (9x9) to'g'ri ekanini tekshiruvchi `isValidSudoku(board)` yozing. HashMap lar (Set) ishlating.",
      initialCode: "function isValidSudoku(board) {\n  // kodni yozing\n}",
      solution: "function isValidSudoku(board) {\n  const set = new Set();\n  for(let i=0; i<9; i++) {\n    for(let j=0; j<9; j++) {\n      const val = board[i][j];\n      if(val !== '.') {\n        const row = `r${i}${val}`, col = `c${j}${val}`, box = `b${Math.floor(i/3)}${Math.floor(j/3)}${val}`;\n        if(set.has(row) || set.has(col) || set.has(box)) return false;\n        set.add(row); set.add(col); set.add(box);\n      }\n    }\n  }\n  return true;\n}",
      tests: [
        { test: "return isValidSudoku([['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]) === true;", description: "Sudoku haqiqiy" }
      ]
    },
    {
      id: "lc-hash-18",
      title: "Happy Number",
      description: "Son raqamlari kvadratlari yig'indisini olib, u 1 ga aylansa Baxtli (Happy) deyiladi. Siklga tushib qolsa false. Shuni tekshiradigan `isHappy(n)` tuzing.",
      initialCode: "function isHappy(n) {\n  // kodni yozing\n}",
      solution: "function isHappy(n) {\n  let set = new Set();\n  while(n !== 1 && !set.has(n)) {\n    set.add(n);\n    n = String(n).split('').reduce((sum, d) => sum + d*d, 0);\n  }\n  return n === 1;\n}",
      tests: [
        { test: "return isHappy(19) === true;", description: "19 baxtli son" },
        { test: "return isHappy(2) === false;", description: "2 baxtli emas (siklga tushadi)" }
      ]
    },
    {
      id: "lc-hash-19",
      title: "Word Subsets",
      description: "`words1` va `words2` massivlarida berilgan so'zlar. Agar `words1` dagi ma'lum so'z `words2` dagi barcha so'zlarning harflari miqdorini o'zida mujassam etsa (subset), ularni massivda qaytaruvchi `wordSubsets(words1, words2)` tuzing.",
      initialCode: "function wordSubsets(words1, words2) {\n  // kodni yozing\n}",
      solution: "function wordSubsets(words1, words2) {\n  const maxFreq = new Array(26).fill(0);\n  for(let w of words2) {\n    const freq = new Array(26).fill(0);\n    for(let c of w) freq[c.charCodeAt(0)-97]++;\n    for(let i=0; i<26; i++) maxFreq[i] = Math.max(maxFreq[i], freq[i]);\n  }\n  return words1.filter(w => {\n    const freq = new Array(26).fill(0);\n    for(let c of w) freq[c.charCodeAt(0)-97]++;\n    for(let i=0; i<26; i++) if(freq[i] < maxFreq[i]) return false;\n    return true;\n  });\n}",
      tests: [
        { test: "return wordSubsets(['amazon','apple','facebook','google','leetcode'], ['e','o']).length === 2;", description: "faqat 'facebook' va 'google' to'g'ri keladi" }
      ]
    },
    {
      id: "lc-hash-20",
      title: "Longest Consecutive Sequence",
      description: "O(n) vaqtida massivdagi eng uzun ketma-ket (masalan: 1,2,3,4) raqamlar zanjirining uzunligini topuvchi `longestConsecutive(nums)` yozing.",
      initialCode: "function longestConsecutive(nums) {\n  // kodni yozing\n}",
      solution: "function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let maxLen = 0;\n  for(let n of set) {\n    if(!set.has(n-1)) {\n      let curr = n;\n      let currLen = 1;\n      while(set.has(curr+1)) {\n        curr++; currLen++;\n      }\n      maxLen = Math.max(maxLen, currLen);\n    }\n  }\n  return maxLen;\n}",
      tests: [
        { test: "return longestConsecutive([100,4,200,1,3,2]) === 4;", description: "1,2,3,4 zanjiri 4 uzunlikda" }
      ]
    }
  ]
};
