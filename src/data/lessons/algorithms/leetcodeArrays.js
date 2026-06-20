export const leetcodeArrays = {
  title: "LeetCode: Array (Massiv) Algoritmlari",
  content: `
Ushbu bo'limda Massivlarga oid LeetCode dagi eng ko'p so'raladigan algoritmlarni yechasiz. Ikki ko'rsatkich (Two Pointers), oyna siljitish (Sliding Window) kabi optimal usullardan foydalanish tavsiya etiladi.
`,
  exercises: [
    {
      id: "lc-arr-1",
      title: "Two Sum",
      description: "Sonlardan iborat massiv (`nums`) va maqsadli son (`target`) berilgan. Yig'indisi `target` ga teng bo'lgan ikkita sonning indekslarini massiv ko'rinishida qaytaruvchi `twoSum(nums, target)` yozing.",
      initialCode: "function twoSum(nums, target) {\n  // kodni yozing\n}",
      solution: "function twoSum(nums, target) {\n  const map = {};\n  for(let i=0; i<nums.length; i++) {\n    const comp = target - nums[i];\n    if(comp in map) return [map[comp], i];\n    map[nums[i]] = i;\n  }\n  return [];\n}",
      tests: [
        { test: "return twoSum([2,7,11,15], 9).join(',') === '0,1';", description: "2 + 7 = 9 (indekslari 0 va 1)" },
        { test: "return twoSum([3,2,4], 6).join(',') === '1,2';", description: "2 + 4 = 6 (indekslari 1 va 2)" }
      ]
    },
    {
      id: "lc-arr-2",
      title: "Remove Duplicates from Sorted Array",
      description: "O'sish tartibida joylashgan massiv berilgan. Barcha takrorlangan sonlarni joyida (in-place) o'chirib, massivning yangi uzunligini qaytaruvchi `removeDuplicates(nums)` yozing (1-elementdan boshlab ortiqchalarni oldinga suring).",
      initialCode: "function removeDuplicates(nums) {\n  // kodni yozing\n}",
      solution: "function removeDuplicates(nums) {\n  if(!nums.length) return 0;\n  let j = 0;\n  for(let i=1; i<nums.length; i++) {\n    if(nums[i] !== nums[j]) {\n      j++;\n      nums[j] = nums[i];\n    }\n  }\n  return j + 1;\n}",
      tests: [
        { test: "const arr = [1,1,2]; const len = removeDuplicates(arr); return len === 2 && arr[0] === 1 && arr[1] === 2;", description: "Uzunligi 2 qaytishi va arr [1,2] bo'lishi kerak" }
      ]
    },
    {
      id: "lc-arr-3",
      title: "Remove Element",
      description: "Massiv va qiymat (val) berilgan. Massivdan val ga teng bo'lgan barcha elementlarni joyida o'chirib, qolgan elementlar sonini qaytaruvchi `removeElement(nums, val)` yozing.",
      initialCode: "function removeElement(nums, val) {\n  // kodni yozing\n}",
      solution: "function removeElement(nums, val) {\n  let j = 0;\n  for(let i=0; i<nums.length; i++) {\n    if(nums[i] !== val) {\n      nums[j] = nums[i];\n      j++;\n    }\n  }\n  return j;\n}",
      tests: [
        { test: "const arr = [3,2,2,3]; const len = removeElement(arr, 3); return len === 2 && arr[0] === 2 && arr[1] === 2;", description: "Ikki qaytishi va dastlabki ikkita element 2 bo'lishi kerak" }
      ]
    },
    {
      id: "lc-arr-4",
      title: "Search Insert Position",
      description: "Tartiblangan massiv va target son berilgan. Target bor bo'lsa uning indeksini, yo'q bo'lsa joylashishi kerak bo'lgan indeksini topuvchi `searchInsert(nums, target)` yozing (Binarniy qidiruv qilish maqsadga muvofiq).",
      initialCode: "function searchInsert(nums, target) {\n  // kodni yozing\n}",
      solution: "function searchInsert(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while(l <= r) {\n    let mid = Math.floor((l+r)/2);\n    if(nums[mid] === target) return mid;\n    if(nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return l;\n}",
      tests: [
        { test: "return searchInsert([1,3,5,6], 5) === 2;", description: "5 soni 2-indeksda" },
        { test: "return searchInsert([1,3,5,6], 2) === 1;", description: "2 soni 1-indeksga qo'yilishi kerak" },
        { test: "return searchInsert([1,3,5,6], 7) === 4;", description: "7 soni oxirida joylashadi" }
      ]
    },
    {
      id: "lc-arr-5",
      title: "Maximum Subarray",
      description: "Sonlar massivi berilgan. Uzluksiz yordamchi massiv (subarray) elementlari yig'indisi eng maksimal bo'lganini topib, o'sha yig'indini qaytaruvchi `maxSubArray(nums)` yozing (Kadane algoritmi).",
      initialCode: "function maxSubArray(nums) {\n  // kodni yozing\n}",
      solution: "function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currMax = nums[0];\n  for(let i=1; i<nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}",
      tests: [
        { test: "return maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) === 6;", description: "[4,-1,2,1] yig'indisi 6 ga teng" },
        { test: "return maxSubArray([1]) === 1;", description: "1 ta elementli" }
      ]
    },
    {
      id: "lc-arr-6",
      title: "Plus One",
      description: "Sonning raqamlaridan tashkil topgan massiv ko'rinishida berilgan butun songa 1 ni qo'shib, qayta massiv qilib qaytaradigan `plusOne(digits)` yozing. Masalan: [1,2,3] -> [1,2,4], [9] -> [1,0].",
      initialCode: "function plusOne(digits) {\n  // kodni yozing\n}",
      solution: "function plusOne(digits) {\n  for(let i=digits.length-1; i>=0; i--) {\n    if(digits[i] < 9) {\n      digits[i]++;\n      return digits;\n    }\n    digits[i] = 0;\n  }\n  digits.unshift(1);\n  return digits;\n}",
      tests: [
        { test: "return plusOne([1,2,3]).join('') === '124';", description: "[1,2,3] -> [1,2,4]" },
        { test: "return plusOne([9,9]).join('') === '100';", description: "[9,9] -> [1,0,0]" }
      ]
    },
    {
      id: "lc-arr-7",
      title: "Merge Sorted Array",
      description: "Ikkita tartiblangan massivni (`nums1` va `nums2`) bittaga in-place qilib birlashtiruvchi `merge(nums1, m, nums2, n)` tuzing. Natija `nums1` da bo'lsin. (Uning uzunligi m+n ekani oldindan berilgan).",
      initialCode: "function merge(nums1, m, nums2, n) {\n  // kodni yozing\n}",
      solution: "function merge(nums1, m, nums2, n) {\n  let i = m - 1, j = n - 1, k = m + n - 1;\n  while(j >= 0) {\n    if(i >= 0 && nums1[i] > nums2[j]) {\n      nums1[k--] = nums1[i--];\n    } else {\n      nums1[k--] = nums2[j--];\n    }\n  }\n  return nums1;\n}",
      tests: [
        { test: "const n1=[1,2,3,0,0,0]; merge(n1, 3, [2,5,6], 3); return n1.join(',') === '1,2,2,3,5,6';", description: "To'g'ri birlashtirilishi kerak" }
      ]
    },
    {
      id: "lc-arr-8",
      title: "Pascals Triangle",
      description: "`numRows` berilganda, Paskal uchburchagining n qatorini qaytaruvchi `generate(numRows)` yozing.",
      initialCode: "function generate(numRows) {\n  // kodni yozing\n}",
      solution: "function generate(numRows) {\n  const res = [];\n  for(let i=0; i<numRows; i++) {\n    const row = new Array(i+1).fill(1);\n    for(let j=1; j<i; j++) {\n      row[j] = res[i-1][j-1] + res[i-1][j];\n    }\n    res.push(row);\n  }\n  return res;\n}",
      tests: [
        { test: "return generate(3).length === 3 && generate(3)[2].join(',') === '1,2,1';", description: "3-qator [1,2,1] bo'ladi" },
        { test: "return generate(1)[0].join(',') === '1';", description: "1-qator faqat [1]" }
      ]
    },
    {
      id: "lc-arr-9",
      title: "Best Time to Buy and Sell Stock",
      description: "Narxlar massivi berilgan. Siz faqat bir marta sotib olib va keyinroq sotib eng katta foyda ko'rishingiz kerak. O'sha maksimal foydani qaytaruvchi `maxProfit(prices)` yozing.",
      initialCode: "function maxProfit(prices) {\n  // kodni yozing\n}",
      solution: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxP = 0;\n  for(let price of prices) {\n    if(price < minPrice) minPrice = price;\n    else if(price - minPrice > maxP) maxP = price - minPrice;\n  }\n  return maxP;\n}",
      tests: [
        { test: "return maxProfit([7,1,5,3,6,4]) === 5;", description: "1 da olib 6 da sotsak foyda 5" },
        { test: "return maxProfit([7,6,4,3,1]) === 0;", description: "Narxlar faqat tushsa foyda bo'lmaydi (0)" }
      ]
    },
    {
      id: "lc-arr-10",
      title: "Single Number",
      description: "Massivda barcha sonlar ikki marta takrorlanadi faqat bitta sondan tashqari. O'sha takrorlanmagan (yagona) sonni topuvchi `singleNumber(nums)` yozing (XOR ishlatish eng optimal usul).",
      initialCode: "function singleNumber(nums) {\n  // kodni yozing\n}",
      solution: "function singleNumber(nums) {\n  return nums.reduce((acc, val) => acc ^ val, 0);\n}",
      tests: [
        { test: "return singleNumber([2,2,1]) === 1;", description: "1 bir marta ishtirok etgan" },
        { test: "return singleNumber([4,1,2,1,2]) === 4;", description: "4 qaytishi kerak" }
      ]
    },
    {
      id: "lc-arr-11",
      title: "Majority Element",
      description: "Massiv berilgan. Elementlar ichida n/2 dan ko'p marta ishtirok etgan (dominant) sonni topuvchi `majorityElement(nums)` yozing (Boyer-Moore voting algoritmi o'rinli).",
      initialCode: "function majorityElement(nums) {\n  // kodni yozing\n}",
      solution: "function majorityElement(nums) {\n  let candidate = null;\n  let count = 0;\n  for(let n of nums) {\n    if(count === 0) candidate = n;\n    count += (n === candidate) ? 1 : -1;\n  }\n  return candidate;\n}",
      tests: [
        { test: "return majorityElement([3,2,3]) === 3;", description: "3 eng ko'p kelgan" },
        { test: "return majorityElement([2,2,1,1,1,2,2]) === 2;", description: "2 eng ko'p kelgan" }
      ]
    },
    {
      id: "lc-arr-12",
      title: "Contains Duplicate",
      description: "Massivda biror son ikki marta uchrash-uchramasligini tekshiruvchi `containsDuplicate(nums)` tuzing (ha bo'lsa true, yo'qsa false).",
      initialCode: "function containsDuplicate(nums) {\n  // kodni yozing\n}",
      solution: "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}",
      tests: [
        { test: "return containsDuplicate([1,2,3,1]) === true;", description: "1 soni takrorlangan" },
        { test: "return containsDuplicate([1,2,3,4]) === false;", description: "Hamma element unikal" }
      ]
    },
    {
      id: "lc-arr-13",
      title: "Missing Number",
      description: "[0, n] oraliqdagi n ta turli xil sonlardan iborat massivdan yetishmayotgan o'sha 1 ta sonni topuvchi `missingNumber(nums)` yozing (Formula: n*(n+1)/2 - sum(nums)).",
      initialCode: "function missingNumber(nums) {\n  // kodni yozing\n}",
      solution: "function missingNumber(nums) {\n  const n = nums.length;\n  const expectedSum = n * (n + 1) / 2;\n  const actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}",
      tests: [
        { test: "return missingNumber([3,0,1]) === 2;", description: "2 yetishmayapti" },
        { test: "return missingNumber([0,1]) === 2;", description: "Oxirgi 2 yetishmayapti" }
      ]
    },
    {
      id: "lc-arr-14",
      title: "Move Zeroes",
      description: "Massivdagi barcha 0 larni tartibni buzmagan holda massiv oxiriga surib qo'yuvchi in-place `moveZeroes(nums)` yozing.",
      initialCode: "function moveZeroes(nums) {\n  // kodni yozing\n}",
      solution: "function moveZeroes(nums) {\n  let lastNonZero = 0;\n  for(let i=0; i<nums.length; i++) {\n    if(nums[i] !== 0) {\n      let temp = nums[lastNonZero];\n      nums[lastNonZero] = nums[i];\n      nums[i] = temp;\n      lastNonZero++;\n    }\n  }\n  return nums;\n}",
      tests: [
        { test: "const arr = [0,1,0,3,12]; moveZeroes(arr); return arr.join(',') === '1,3,12,0,0';", description: "Nollar oxiriga o'tadi" }
      ]
    },
    {
      id: "lc-arr-15",
      title: "Intersection of Two Arrays",
      description: "Ikkita massiv berilgan. Ikkalasida ham qatnashgan elementlarni yagona (unique) ko'rinishda massiv sifatida qaytaruvchi `intersection(nums1, nums2)` yozing.",
      initialCode: "function intersection(nums1, nums2) {\n  // kodni yozing\n}",
      solution: "function intersection(nums1, nums2) {\n  const set1 = new Set(nums1);\n  const set2 = new Set(nums2);\n  return [...set1].filter(x => set2.has(x));\n}",
      tests: [
        { test: "return intersection([1,2,2,1], [2,2]).join(',') === '2';", description: "Faqat unique 2 olinadi" },
        { test: "return intersection([4,9,5], [9,4,9,8,4]).sort().join(',') === '4,9';", description: "[4,9] chiqishi kerak" }
      ]
    },
    {
      id: "lc-arr-16",
      title: "Third Maximum Number",
      description: "Massivdagi aniq kattaligi bo'yicha uchinchi o'rinda turadigan maksimal sonni qaytaradigan `thirdMax(nums)` yozing. Agar 3-eng katta yo'q bo'lsa, eng kattasini qaytarsin.",
      initialCode: "function thirdMax(nums) {\n  // kodni yozing\n}",
      solution: "function thirdMax(nums) {\n  let first = -Infinity, second = -Infinity, third = -Infinity;\n  for (let n of nums) {\n    if (n === first || n === second || n === third) continue;\n    if (n > first) {\n      third = second; second = first; first = n;\n    } else if (n > second) {\n      third = second; second = n;\n    } else if (n > third) {\n      third = n;\n    }\n  }\n  return third === -Infinity ? first : third;\n}",
      tests: [
        { test: "return thirdMax([3,2,1]) === 1;", description: "Uchinchi katta 1" },
        { test: "return thirdMax([1,2]) === 2;", description: "Uchinchi yo'q, shuning uchun eng kattasi (2) chiqadi" },
        { test: "return thirdMax([2,2,3,1]) === 1;", description: "Takroriy hisoblanmaydi" }
      ]
    },
    {
      id: "lc-arr-17",
      title: "Find All Numbers Disappeared in an Array",
      description: "Uzunligi n bo'lgan massivda [1, n] gacha sonlar bor (ba'zilari ikki marta, ba'zilari umuman yo'q). Shu yo'q sonlarni topib massiv sifatida qaytaruvchi `findDisappearedNumbers(nums)` tuzing.",
      initialCode: "function findDisappearedNumbers(nums) {\n  // kodni yozing\n}",
      solution: "function findDisappearedNumbers(nums) {\n  for(let i=0; i<nums.length; i++) {\n    const index = Math.abs(nums[i]) - 1;\n    if(nums[index] > 0) nums[index] = -nums[index];\n  }\n  const res = [];\n  for(let i=0; i<nums.length; i++) {\n    if(nums[i] > 0) res.push(i+1);\n  }\n  return res;\n}",
      tests: [
        { test: "return findDisappearedNumbers([4,3,2,7,8,2,3,1]).join(',') === '5,6';", description: "5 va 6 yo'q" },
        { test: "return findDisappearedNumbers([1,1]).join(',') === '2';", description: "2 yetishmayapti" }
      ]
    },
    {
      id: "lc-arr-18",
      title: "Sort Colors",
      description: "0 (qizil), 1 (oq), 2 (ko'k) lardan iborat massivni in-place holatda tartiblang (Dutch National Flag algoritmi bilan). `sortColors(nums)`.",
      initialCode: "function sortColors(nums) {\n  // kodni yozing\n}",
      solution: "function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while(mid <= high) {\n    if(nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if(nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n  return nums;\n}",
      tests: [
        { test: "const arr = [2,0,2,1,1,0]; sortColors(arr); return arr.join(',') === '0,0,1,1,2,2';", description: "Massiv to'g'ri tartiblanishi kerak" }
      ]
    },
    {
      id: "lc-arr-19",
      title: "Container With Most Water",
      description: "Manfiy bo'lmagan sonlardan iborat massiv balandliklarni bildiradi. Eng ko'p suv to'play oladigan 2 ta chiziq (idish) maydonini topuvchi `maxArea(height)` yozing.",
      initialCode: "function maxArea(height) {\n  // kodni yozing\n}",
      solution: "function maxArea(height) {\n  let l = 0, r = height.length - 1;\n  let maxArea = 0;\n  while(l < r) {\n    const area = Math.min(height[l], height[r]) * (r - l);\n    maxArea = Math.max(maxArea, area);\n    if(height[l] < height[r]) l++; else r--;\n  }\n  return maxArea;\n}",
      tests: [
        { test: "return maxArea([1,8,6,2,5,4,8,3,7]) === 49;", description: "49 maydonli quti" },
        { test: "return maxArea([1,1]) === 1;", description: "1*1=1" }
      ]
    },
    {
      id: "lc-arr-20",
      title: "Product of Array Except Self",
      description: "Massivdagi har bir element uchun qolgan barcha elementlarning ko'paytmasidan iborat yangi massiv qaytaruvchi `productExceptSelf(nums)` yozing. (Bo'lish operatsiyasiz va O(n) vaqtda).",
      initialCode: "function productExceptSelf(nums) {\n  // kodni yozing\n}",
      solution: "function productExceptSelf(nums) {\n  const res = new Array(nums.length).fill(1);\n  let left = 1;\n  for(let i=0; i<nums.length; i++) {\n    res[i] *= left;\n    left *= nums[i];\n  }\n  let right = 1;\n  for(let i=nums.length-1; i>=0; i--) {\n    res[i] *= right;\n    right *= nums[i];\n  }\n  return res;\n}",
      tests: [
        { test: "return productExceptSelf([1,2,3,4]).join(',') === '24,12,8,6';", description: "To'g'ri ko'paytirilgan holat" },
        { test: "return productExceptSelf([-1,1,0,-3,3]).join(',') === '0,0,9,0,0';", description: "0 aralashganida ishlashi kerak" }
      ]
    }
  ]
};
