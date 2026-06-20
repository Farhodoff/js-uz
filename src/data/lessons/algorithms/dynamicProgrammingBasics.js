export const dynamicProgrammingBasics = {
  title: "LeetCode: Dynamic Programming (Dinamik Dasturlash)",
  content: `
Dinamik Dasturlash (DP) murakkab masalalarni kichik qismlarga bo'lib yechish va oraliq natijalarni saqlab qolishga asoslangan texnikadir. Ushbu bo'limdagi masalalar intervyulardagi eng qiyin hisoblanuvchi qismlarga tayyorlaydi.
`,
  exercises: [
    {
      id: "dp-1",
      title: "Climbing Stairs",
      description: "Siz zinadan chiqayapsiz. Eng tepaga chiqish uchun n ta qadam kerak. Har safar yo 1 ta, yoki 2 ta zinadan hatlab o'tishingiz mumkin. Eng tepaga necha xil usul bilan chiqish mumkinligini topuvchi `climbStairs(n)` yozing.",
      initialCode: "function climbStairs(n) {\n  // kodni yozing\n}",
      solution: "function climbStairs(n) {\n  if(n <= 2) return n;\n  let a = 1, b = 2;\n  for(let i=3; i<=n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}",
      tests: [
        { test: "return climbStairs(2) === 2;", description: "2 zinaga 2 xil usul" },
        { test: "return climbStairs(3) === 3;", description: "3 zinaga 3 xil usul (1+1+1, 1+2, 2+1)" }
      ]
    },
    {
      id: "dp-2",
      title: "Fibonacci Number",
      description: "N-chi Fibonachchi sonini qaytaruvchi `fib(n)` yozing (dinamik dasturlash memoization yoki bottom-up yondashuv bilan).",
      initialCode: "function fib(n) {\n  // kodni yozing\n}",
      solution: "function fib(n) {\n  if(n < 2) return n;\n  let dp = [0, 1];\n  for(let i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}",
      tests: [
        { test: "return fib(2) === 1;", description: "F(2) = 1" },
        { test: "return fib(4) === 3;", description: "F(4) = 3" }
      ]
    },
    {
      id: "dp-3",
      title: "Min Cost Climbing Stairs",
      description: "Zinaning har bir qadamiga to'lanadigan narx massivi berilgan. Siz 0 yoki 1-qadamdan boshlashingiz mumkin. Yana tepaga 1 yoki 2 qadam tashlab chiqasiz. Tepaga yetish uchun eng kam narxni hisoblovchi `minCostClimbingStairs(cost)` yozing.",
      initialCode: "function minCostClimbingStairs(cost) {\n  // kodni yozing\n}",
      solution: "function minCostClimbingStairs(cost) {\n  let n = cost.length;\n  let dp = new Array(n+1).fill(0);\n  for(let i=2; i<=n; i++) {\n    dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);\n  }\n  return dp[n];\n}",
      tests: [
        { test: "return minCostClimbingStairs([10, 15, 20]) === 15;", description: "O'rtadagi 15 ni bosib o'tish eng arzonga tushadi" },
        { test: "return minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1]) === 6;", description: "Optimal yo'l 6" }
      ]
    },
    {
      id: "dp-4",
      title: "House Robber",
      description: "O'g'ri ko'chadagi uylarni tunamoqchi, lekin ketma-ket ikkita uyga kirsagina signalizatsiya chalinadi. Signalni yoqmasdan maksimal qancha pul o'g'irlash mumkinligini topuvchi `rob(nums)` tuzing.",
      initialCode: "function rob(nums) {\n  // kodni yozing\n}",
      solution: "function rob(nums) {\n  if(!nums.length) return 0;\n  if(nums.length === 1) return nums[0];\n  let prev1 = Math.max(nums[0], nums[1]), prev2 = nums[0];\n  for(let i=2; i<nums.length; i++) {\n    let temp = prev1;\n    prev1 = Math.max(prev2 + nums[i], prev1);\n    prev2 = temp;\n  }\n  return prev1;\n}",
      tests: [
        { test: "return rob([1,2,3,1]) === 4;", description: "1 (1-uy) + 3 (3-uy) = 4" },
        { test: "return rob([2,7,9,3,1]) === 12;", description: "2 + 9 + 1 = 12" }
      ]
    },
    {
      id: "dp-5",
      title: "House Robber II",
      description: "Yuqoridagi masala kabi, ammo endi ko'cha aylanma (birinchi va oxirgi uylar qo'shni). Eng ko'p qancha pul topish mumkinligini bilish uchun `rob2(nums)` yozing.",
      initialCode: "function rob2(nums) {\n  // kodni yozing\n}",
      solution: "function rob2(nums) {\n  if(nums.length === 1) return nums[0];\n  function robSimple(arr) {\n    let t1=0, t2=0;\n    for(let n of arr) { let temp = t1; t1 = Math.max(n+t2, t1); t2 = temp; }\n    return t1;\n  }\n  return Math.max(robSimple(nums.slice(0,-1)), robSimple(nums.slice(1)));\n}",
      tests: [
        { test: "return rob2([2,3,2]) === 3;", description: "2 va 2 qo'shni bo'lib qoladi, shuning uchun 3 ni o'zini oladi" },
        { test: "return rob2([1,2,3,1]) === 4;", description: "Natija 4 bo'ladi" }
      ]
    },
    {
      id: "dp-6",
      title: "Maximum Subarray",
      description: "Bu DP usuli bilan ham yechiladi: O(n) vaqtda massiv ichidagi eng yig'indisi katta davomiy qism massiv yig'indisini topuvchi `maxSubArray(nums)` yozing.",
      initialCode: "function maxSubArray(nums) {\n  // kodni yozing\n}",
      solution: "function maxSubArray(nums) {\n  let curr = nums[0], max = nums[0];\n  for(let i=1; i<nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    max = Math.max(max, curr);\n  }\n  return max;\n}",
      tests: [
        { test: "return maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) === 6;", description: "Optimal 6 bo'lishi kerak" }
      ]
    },
    {
      id: "dp-7",
      title: "Coin Change",
      description: "Sizda tangalar massivi `coins` (masalan: [1,2,5]) va miqdor `amount` (masalan: 11) bor. Shu miqdorni yig'ish uchun eng kamida nechta tanga kerak? (agar imkoni bo'lmasa -1). `coinChange(coins, amount)` tuzing.",
      initialCode: "function coinChange(coins, amount) {\n  // kodni yozing\n}",
      solution: "function coinChange(coins, amount) {\n  const dp = new Array(amount+1).fill(Infinity);\n  dp[0] = 0;\n  for(let i=1; i<=amount; i++) {\n    for(let coin of coins) {\n      if(i - coin >= 0) dp[i] = Math.min(dp[i], dp[i-coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
      tests: [
        { test: "return coinChange([1,2,5], 11) === 3;", description: "5+5+1 = 3 tanga" },
        { test: "return coinChange([2], 3) === -1;", description: "2 lik bilan 3 yig'ib bo'lmaydi" }
      ]
    },
    {
      id: "dp-8",
      title: "Longest Increasing Subsequence",
      description: "Massiv berilgan, o'sish tartibida davom etuvchi eng uzun qism ketma-ketlikning (yonma-yon bo'lishi shart emas) uzunligini topuvchi `lengthOfLIS(nums)` yozing.",
      initialCode: "function lengthOfLIS(nums) {\n  // kodni yozing\n}",
      solution: "function lengthOfLIS(nums) {\n  const dp = new Array(nums.length).fill(1);\n  let maxAns = 1;\n  for(let i=1; i<nums.length; i++) {\n    for(let j=0; j<i; j++) {\n      if(nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n    }\n    maxAns = Math.max(maxAns, dp[i]);\n  }\n  return maxAns;\n}",
      tests: [
        { test: "return lengthOfLIS([10,9,2,5,3,7,101,18]) === 4;", description: "[2,3,7,101] uzunligi 4" }
      ]
    },
    {
      id: "dp-9",
      title: "Word Break",
      description: "Satr `s` va so'zlar massivi `wordDict` berilgan. Satrni massivdagi so'zlarga (bo'shliq bilan) bo'laklash mumkin bo'lsa `true` qaytaruvchi `wordBreak(s, wordDict)` yozing.",
      initialCode: "function wordBreak(s, wordDict) {\n  // kodni yozing\n}",
      solution: "function wordBreak(s, wordDict) {\n  const dict = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for(let i=1; i<=s.length; i++) {\n    for(let j=0; j<i; j++) {\n      if(dp[j] && dict.has(s.substring(j, i))) {\n        dp[i] = true; break;\n      }\n    }\n  }\n  return dp[s.length];\n}",
      tests: [
        { test: "return wordBreak('leetcode', ['leet', 'code']) === true;", description: "leet code deb bo'lish mumkin" },
        { test: "return wordBreak('catsandog', ['cats','dog','sand','and','cat']) === false;", description: "To'g'ri bo'lish imkoni yo'q" }
      ]
    },
    {
      id: "dp-10",
      title: "Decode Ways",
      description: "Xabar 'A'->1, 'B'->2 ... 'Z'->26 deb shifrlangan. Sonlar ketma-ketligi (masalan '12' -> 'AB' yoki 'L') qancha usul bilan yechilishini topuvchi `numDecodings(s)` tuzing.",
      initialCode: "function numDecodings(s) {\n  // kodni yozing\n}",
      solution: "function numDecodings(s) {\n  if(!s || s[0] === '0') return 0;\n  const dp = new Array(s.length+1).fill(0);\n  dp[0] = 1; dp[1] = 1;\n  for(let i=2; i<=s.length; i++) {\n    const oneDigit = parseInt(s.substring(i-1, i));\n    const twoDigits = parseInt(s.substring(i-2, i));\n    if(oneDigit >= 1) dp[i] += dp[i-1];\n    if(twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i-2];\n  }\n  return dp[s.length];\n}",
      tests: [
        { test: "return numDecodings('12') === 2;", description: "'AB' (1,2) yoki 'L' (12)" },
        { test: "return numDecodings('226') === 3;", description: "3 xil yechim" }
      ]
    },
    {
      id: "dp-11",
      title: "Unique Paths",
      description: "Robot (m x n) maydonning yuqori-chap (0,0) nuqtasida turibdi. U faqat pastga yoki o'ngga yura oladi. Pastki-o'ng burchakka qancha xil usul bilan borishi mumkinligini topuvchi `uniquePaths(m, n)` tuzing.",
      initialCode: "function uniquePaths(m, n) {\n  // kodni yozing\n}",
      solution: "function uniquePaths(m, n) {\n  let row = new Array(n).fill(1);\n  for(let i=1; i<m; i++) {\n    for(let j=1; j<n; j++) row[j] += row[j-1];\n  }\n  return row[n-1];\n}",
      tests: [
        { test: "return uniquePaths(3, 7) === 28;", description: "28 usul" },
        { test: "return uniquePaths(3, 2) === 3;", description: "3 xil usul" }
      ]
    },
    {
      id: "dp-12",
      title: "Jump Game",
      description: "Massivda siz indeks 0 dasiz va har bir element necha qadam oldinga sakrashingiz mumkinligini ko'rsatadi. Oxiriga yetib borib bo'lsa `true` qaytaradigan `canJump(nums)` tuzing.",
      initialCode: "function canJump(nums) {\n  // kodni yozing\n}",
      solution: "function canJump(nums) {\n  let maxReach = 0;\n  for(let i=0; i<nums.length; i++) {\n    if(i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}",
      tests: [
        { test: "return canJump([2,3,1,1,4]) === true;", description: "Yetib borish imkoni bor" },
        { test: "return canJump([3,2,1,0,4]) === false;", description: "0 da to'xtab qoladi" }
      ]
    },
    {
      id: "dp-13",
      title: "Best Time to Buy and Sell Stock (DP)",
      description: "Bu masalani yana bir marta ishlang, ammo bu safar joriy min va maksimalni hisobga oluvchi minimal yondashuvni yozing `maxProfit(prices)`.",
      initialCode: "function maxProfit(prices) {\n  // kodni yozing\n}",
      solution: "function maxProfit(prices) {\n  let dp = 0, minBuy = prices[0];\n  for(let i=1; i<prices.length; i++) {\n    dp = Math.max(dp, prices[i] - minBuy);\n    minBuy = Math.min(minBuy, prices[i]);\n  }\n  return dp;\n}",
      tests: [
        { test: "return maxProfit([7,1,5,3,6,4]) === 5;", description: "1 da olib 6 da sotsak 5 foyda" }
      ]
    },
    {
      id: "dp-14",
      title: "Best Time to Buy and Sell Stock II",
      description: "Istalgancha marta olib sotishingiz mumkin (lekin qo'lda bir paytda bitta bo'lishi shart). Maksimal foydani hisoblovchi `maxProfit2(prices)` tuzing.",
      initialCode: "function maxProfit2(prices) {\n  // kodni yozing\n}",
      solution: "function maxProfit2(prices) {\n  let profit = 0;\n  for(let i=1; i<prices.length; i++) {\n    if(prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];\n  }\n  return profit;\n}",
      tests: [
        { test: "return maxProfit2([7,1,5,3,6,4]) === 7;", description: "(5-1) + (6-3) = 7" },
        { test: "return maxProfit2([1,2,3,4,5]) === 4;", description: "Foyda uzluksiz bo'ladi" }
      ]
    },
    {
      id: "dp-15",
      title: "Pascal's Triangle II",
      description: "`rowIndex` qabul qilib, Paskal uchburchagining o'sha qatorini qaytaradigan O(rowIndex) xotirali `getRow(rowIndex)` yozing.",
      initialCode: "function getRow(rowIndex) {\n  // kodni yozing\n}",
      solution: "function getRow(rowIndex) {\n  const row = new Array(rowIndex+1).fill(1);\n  for(let i=1; i<rowIndex; i++) {\n    for(let j=i; j>0; j--) row[j] += row[j-1];\n  }\n  return row;\n}",
      tests: [
        { test: "return getRow(3).join(',') === '1,3,3,1';", description: "To'g'ri qatorni qaytaradi" },
        { test: "return getRow(0).join(',') === '1';", description: "Indeks 0 ga 1 chiqishi kerak" }
      ]
    },
    {
      id: "dp-16",
      title: "Maximum Product Subarray",
      description: "Massivdagi sonlarning ketma-ketlikda ko'paytmasi eng katta bo'ladigan qiymatni topuvchi `maxProduct(nums)` tuzing.",
      initialCode: "function maxProduct(nums) {\n  // kodni yozing\n}",
      solution: "function maxProduct(nums) {\n  let maxP = nums[0], minP = nums[0], res = nums[0];\n  for(let i=1; i<nums.length; i++) {\n    let temp = Math.max(nums[i], maxP*nums[i], minP*nums[i]);\n    minP = Math.min(nums[i], maxP*nums[i], minP*nums[i]);\n    maxP = temp;\n    res = Math.max(res, maxP);\n  }\n  return res;\n}",
      tests: [
        { test: "return maxProduct([2,3,-2,4]) === 6;", description: "2*3=6" },
        { test: "return maxProduct([-2,0,-1]) === 0;", description: "0 chiqishi kerak" }
      ]
    },
    {
      id: "dp-17",
      title: "Minimum Path Sum",
      description: "Raqamlardan iborat nxm to'rdan (grid) yuqori chap burchakdan pastki o'ng burchakkacha bo'lgan, raqamlar yig'indisi eng kam yo'l narxini topuvchi `minPathSum(grid)` yozing.",
      initialCode: "function minPathSum(grid) {\n  // kodni yozing\n}",
      solution: "function minPathSum(grid) {\n  const m = grid.length, n = grid[0].length;\n  for(let i=0; i<m; i++) {\n    for(let j=0; j<n; j++) {\n      if(i===0 && j!==0) grid[i][j] += grid[i][j-1];\n      else if(i!==0 && j===0) grid[i][j] += grid[i-1][j];\n      else if(i!==0 && j!==0) grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);\n    }\n  }\n  return grid[m-1][n-1];\n}",
      tests: [
        { test: "return minPathSum([[1,3,1],[1,5,1],[4,2,1]]) === 7;", description: "1+3+1+1+1 = 7" }
      ]
    },
    {
      id: "dp-18",
      title: "Longest Common Subsequence",
      description: "Ikkita satr `text1` va `text2` berilgan, ulardagi umumiy ketma-ketlik (oraliqlar farqi bilan bo'lsa ham) maksimal uzunligini topuvchi `longestCommonSubsequence(text1, text2)` yozing.",
      initialCode: "function longestCommonSubsequence(text1, text2) {\n  // kodni yozing\n}",
      solution: "function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array(m+1).fill(0).map(()=>Array(n+1).fill(0));\n  for(let i=1; i<=m; i++) {\n    for(let j=1; j<=n; j++) {\n      if(text1[i-1] === text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}",
      tests: [
        { test: "return longestCommonSubsequence('abcde', 'ace') === 3;", description: "'ace' uzunligi 3" },
        { test: "return longestCommonSubsequence('abc', 'abc') === 3;", description: "To'liq moslik" }
      ]
    },
    {
      id: "dp-19",
      title: "Edit Distance",
      description: "word1 ni word2 ga aylantirish uchun minimal (qo'shish, o'chirish, almashtirish) operatsiyalar sonini hisoblovchi `minDistance(word1, word2)` yozing.",
      initialCode: "function minDistance(word1, word2) {\n  // kodni yozing\n}",
      solution: "function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array(m+1).fill(0).map(()=>Array(n+1).fill(0));\n  for(let i=0; i<=m; i++) dp[i][0] = i;\n  for(let j=0; j<=n; j++) dp[0][j] = j;\n  for(let i=1; i<=m; i++) {\n    for(let j=1; j<=n; j++) {\n      if(word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];\n      else dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;\n    }\n  }\n  return dp[m][n];\n}",
      tests: [
        { test: "return minDistance('horse', 'ros') === 3;", description: "3 operatsiya kerak" }
      ]
    },
    {
      id: "dp-20",
      title: "Triangle",
      description: "Ichma-ich massivlar ko'rinishidagi uchburchak maydoni qabul qilib, tepadagi nuqtadan pastga tushishdagi eng kam yo'l yig'indisini hisoblaydigan `minimumTotal(triangle)` tuzing.",
      initialCode: "function minimumTotal(triangle) {\n  // kodni yozing\n}",
      solution: "function minimumTotal(triangle) {\n  for(let i = triangle.length - 2; i >= 0; i--) {\n    for(let j = 0; j <= i; j++) {\n      triangle[i][j] += Math.min(triangle[i+1][j], triangle[i+1][j+1]);\n    }\n  }\n  return triangle[0][0];\n}",
      tests: [
        { test: "return minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]) === 11;", description: "2 + 3 + 5 + 1 = 11" }
      ]
    }
  ]
};
