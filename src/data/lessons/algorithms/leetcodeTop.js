export const leetcodeTop = {
  id: "leetcodeTop",
  title: "Eng ko'p tushadigan LeetCode masalalari",
  theory: `## 1. NEGA kerak?
FAANG (Facebook, Apple, Amazon, Netflix, Google) kabi global gigantlar va mahalliy yetakchi IT kompaniyalarning texnik suhbatlaridagi asosiy to'siq — bu algoritmik masalalar (coding challenges). Ularni yechish qobiliyati sizning qiyin muammolarni qanchalik tizimli va optimal hal eta olishingizni ko'rsatadi.
Faqatgina nazariyani bilish yetarli emas. Biz eng mashhur 12 ta LeetCode masalalarini o'rganamiz, ularning optimal yechimlarini tahlil qilamiz va intervyerlar qanday javob kutishini ko'rib chiqamiz.

## 2. SODDALIK (Analogiya)
LeetCode masalalarini yechish **sport zalidagi mashg'ulotlarga** o'xshaydi.
Siz to'g'ridan-to'g'ri og'ir toshni (murakkab loyihani) ko'tara olmaysiz. Avval mushaklarni kichik va muntazam mashqlar (LeetCode Easy/Medium masalalari) orqali chiniqtirish kerak. Algoritmlarni mashq qilish miyangizni optimal yechimlar haqida o'ylashga o'rgatadi.

## 3. STRUKTURA
Ushbu darsda quyidagi klassik naqshlar (patterns) bo'yicha masalalarni ko'ramiz:
1. **Two Pointers (Ikki ko'rsatkich):** Massivning ikki chetidan yoki har xil tezlikda o'rtasiga qarab yurish.
2. **Sliding Window (Sirpanuvchi oyna):** Massivning ma'lum bir qismini dinamik ravishda kengaytirib yoki qisqartirib tahlil qilish.
3. **Hash Map (Assotsiativ massiv):** Qidiruv vaqtini $O(n)$ dan $O(1)$ gacha qisqartirish uchun xotiradan unumli foydalanish.
4. **Dynamic Programming (Dinamik dasturlash):** Katta muammoni kichik bo'laklarga ajratib, oraliq natijalarni saqlab borish (Memoization).

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Brute Force yechim bilan cheklanish:** Masalan, "Two Sum" masalasini ichma-ich ikkita sikl bilan yechish ($O(n^2)$). Bu to'g'ri javob bersa-da, suhbat oluvchini qoniqtirmaydi. Har doim vaqt murakkabligini $O(n)$ ga tushirish yo'llarini izlash kerak.
2. **Chekka holatlarni (Edge Cases) unutish:** Bo'sh massivlar, bitta elementli massivlar, manfiy sonlar yoki juda katta sonlar kiritilganda kodning sinib ketishi.
3. **Kodni yozishdan oldin gapirmaslik:** Texnik suhbatlarda eng katta xato — jim o'tirib kod yozish. Algoritmni yozishdan oldin o'z g'oyangiz va tanlagan vaqt/xotira murakkabligingizni intervyerga tushuntirishingiz shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. LeetCode Easy, Medium va Hard farqi nimada?**
Easy — asosiy algoritmlar va ma'lumotlar tuzilmalarini to'g'ridan-to'g'ri qo'llash. Medium — bir nechta yondashuvlarni birlashtirish yoki noaniq shartlar bilan ishlash. Hard — murakkab matematik va dinamik yechimlar.

**2. Two Sum masalasining eng optimal yechimi qanday?**
Hash Map (JavaScript-da \`Map\` yoki oddiy \`Object\`) yordamida har bir sonning to'ldiruvchisini (complement = target - num) saqlab borish orqali $O(n)$ vaqtda yechish.

**3. "Valid Parentheses" (Qavslar balansi) qaysi tuzilma bilan yechiladi?**
Stek (Stack) ma'lumotlar tuzilmasi yordamida. Ochiq qavslar stekka solinadi, yopiq kelganda stekdan olinib mosligi tekshiriladi.

**4. Dynamic Programming nima?**
Muammoning takrorlanuvchi qismlari yechimini xotirada saqlab (keshlab), ularni qayta hisoblamaslik orqali vaqtni tejash usuli (masalan, zaxira jadval - Memoization).

**5. Kadane algoritmi nima uchun ishlatiladi?**
Massiv ichidagi ketma-ket kelgan elementlarning eng maksimal yig'indisiga ega qism-massivni (Maximum Subarray) $O(n)$ vaqtda topish uchun.

**6. Valid Anagram masalasini qanday optimal yechish mumkin?**
Ikkala so'zdagi harflar sonini Hash Map orqali sanab solishtirish ($O(n)$ vaqt, $O(1)$ qo'shimcha xotira).

**7. "Best Time to Buy and Sell Stock" masalasida eng yuqori foydani qanday topamiz?**
Massiv bo'ylab yurganda eng minimal narxni eslab qolamiz va har bir yangi narxda mumkin bo'lgan maksimal foydani ($prices[i] - min$) yangilab boramiz.

**8. Linked List-ni teskari o'girish (Reverse) o'rtacha qancha xotira talab qiladi?**
O(1) qo'shimcha xotira, chunki faqat ko'rsatkichlarning yo'nalishini o'zgartirish kifoya, yangi tugunlar yaratilmaydi.

**9. "Contains Duplicate" masalasining eng qisqa yechimi qanday?**
JavaScript-dagi \`Set\` tuzilmasi yordamida: \`new Set(nums).size !== nums.length\`.

**10. Nega intervyuda kod yozish jarayonini sharhlash muhim?**
Chunki intervyer faqat tayyor kodni emas, balki sizning fikrlash doirangiz, muammoga yondashishingiz va jamoada qanday muloqot qilishingizni baholaydi.

**11. Sliding Window qachon ishlatiladi?**
Massiv yoki satrdan (string) ma'lum shartga javob beruvchi eng uzun/qisqa qismni (subarray/substring) qidirishda.

**12. LeetCode masalalarini yechishda "Brute Force" nima?**
Muammoni optimallashtirish haqida o'ylamasdan, eng sodda va qo'pol yo'l bilan (odatda barcha kombinatsiyalarni aylanib chiqib) yechish usuli.
`,
  exercises: [
    {
      id: 1,
      title: "Two Sum",
      instruction: "Berilgan sonlar massividan yig'indisi `target` bo'lgan ikkita sonning indekslarini `Map` yordamida O(n) vaqtda qaytaruvchi `twoSum(nums, target)` funksiyasini yozing.",
      startingCode: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    // complementary qiymatni hisoblab Map dan qidiring\n  }\n}",
      hint: "let diff = target - nums[i]; if(map.has(diff)) return [map.get(diff), i]; map.set(nums[i], i);",
      test: "if (typeof twoSum !== 'function') return 'twoSum topilmadi'; const res = twoSum([2, 7, 11, 15], 9); if(res[0]!==0 || res[1]!==1) return 'Indekslar xato'; return null;"
    },
    {
      id: 2,
      title: "Valid Parentheses",
      instruction: "Qavslar to'g'ri juftlashganligini tekshiruvchi `isValid(s)` funksiyasini yozing.",
      startingCode: "function isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', '}': '{', ']': '[' };\n  // Stek bilan yeching\n}",
      hint: "for (let char of s) { if(['(', '{', '['].includes(char)) stack.push(char); else if(stack.pop() !== pairs[char]) return false; } return stack.length === 0;",
      test: "if (typeof isValid !== 'function') return 'isValid topilmadi'; if(isValid('()[]{}') !== true) return 'To\\'g\\'ri satr rad etildi'; if(isValid('(]') !== false) return 'Noto\\'g\\'ri satr tasdiqlandi'; return null;"
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      instruction: "Ikkita tartiblangan Linked List-ni bitta qilib birlashtiruvchi `mergeTwoLists(l1, l2)` funksiyasini yozing (tugunlar {val, next} obyektlari).",
      startingCode: "function mergeTwoLists(l1, l2) {\n  // Dummy node yaratib birlashtiring\n}",
      hint: "let dummy = { val: -1, next: null }; let curr = dummy;\nwhile(l1 && l2) { if(l1.val < l2.val) { curr.next = l1; l1 = l1.next; } else { curr.next = l2; l2 = l2.next; } curr = curr.next; }\ncurr.next = l1 || l2; return dummy.next;",
      test: "if (typeof mergeTwoLists !== 'function') return 'mergeTwoLists topilmadi'; const l1 = { val: 1, next: { val: 3, next: null } }; const l2 = { val: 2, next: null }; const merged = mergeTwoLists(l1, l2); if (merged.val !== 1 || merged.next.val !== 2 || merged.next.next.val !== 3) return 'Birlashtirish xato'; return null;"
    },
    {
      id: 4,
      title: "Best Time to Buy and Sell Stock",
      instruction: "Aksiyani qaysi kuni sotib olib, qaysi kuni sotganda maksimal foyda bo'lishini hisoblaydigan `maxProfit(prices)` funksiyasini yozing.",
      startingCode: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  // Foydani hisoblang\n  return maxProfit;\n}",
      hint: "for(let price of prices) { if(price < minPrice) minPrice = price; else if(price - minPrice > maxProfit) maxProfit = price - minPrice; }",
      test: "if (typeof maxProfit !== 'function') return 'maxProfit topilmadi'; if (maxProfit([7, 1, 5, 3, 6, 4]) !== 5) return 'Maksimal foyda xato'; if (maxProfit([7, 6, 4, 3, 1]) !== 0) return 'Zarar holatida foyda 0 bo\\'lishi kerak'; return null;"
    },
    {
      id: 5,
      title: "Valid Anagram",
      instruction: "Ikkita satr bir-biriga anagramma (harflar tarkibi bir xil) ekanligini O(n) vaqtda tekshiradigan `isAnagram(s, t)` funksiyasini yozing.",
      startingCode: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  // Harflarni sanang\n}",
      hint: "for(let char of s) count[char] = (count[char] || 0) + 1;\nfor(let char of t) { if(!count[char]) return false; count[char]--; } return true;",
      test: "if (typeof isAnagram !== 'function') return 'isAnagram topilmadi'; if(isAnagram('anagram', 'nagaram') !== true) return 'To\\'g\\'ri anagramda xato'; if(isAnagram('rat', 'car') !== false) return 'Noto\\'g\\'ri anagramda xato'; return null;"
    },
    {
      id: 6,
      title: "Binary Search",
      instruction: "Saralangan `nums` massividan `target`ni izlovchi va uning indeksini qaytaruvchi `search(nums, target)` funksiyasini yozing.",
      startingCode: "function search(nums, target) {\n  // Binary Search yozing\n}",
      hint: "let left = 0, right = nums.length - 1;\nwhile(left <= right) {\n  let mid = Math.floor((left+right)/2);\n  if(nums[mid] === target) return mid;\n  if(nums[mid] < target) left = mid + 1; else right = mid - 1;\n} return -1;",
      test: "if (typeof search !== 'function') return 'search topilmadi'; if(search([-1, 0, 3, 5, 9, 12], 9) !== 4) return 'Binary search xato'; return null;"
    },
    {
      id: 7,
      title: "Reverse Linked List",
      instruction: "Linked List-ni teskari o'giradigan va yangi head-ni qaytaradigan `reverseList(head)` funksiyasini yozing.",
      startingCode: "function reverseList(head) {\n  let prev = null, curr = head;\n  // Havolalarni o'zgartiring\n  return prev;\n}",
      hint: "while(curr) { let nextNode = curr.next; curr.next = prev; prev = curr; curr = nextNode; }",
      test: "if (typeof reverseList !== 'function') return 'reverseList topilmadi'; const list = { val: 1, next: { val: 2, next: null } }; const reversed = reverseList(list); if (reversed.val !== 2 || reversed.next.val !== 1) return 'Teskari bo\\'lmadi'; return null;"
    },
    {
      id: 8,
      title: "Maximum Subarray - Kadane",
      instruction: "Massiv ichidagi eng katta yig'indiga ega ketma-ket kelgan subarray yig'indisini `maxSubArray(nums)` O(n) vaqtda hisoblang.",
      startingCode: "function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currSum = nums[0];\n  // Kadane algoritmini yozing\n  return maxSum;\n}",
      hint: "for (let i = 1; i < nums.length; i++) {\n  currSum = Math.max(nums[i], currSum + nums[i]);\n  maxSum = Math.max(maxSum, currSum);\n}",
      test: "if (typeof maxSubArray !== 'function') return 'maxSubArray topilmadi'; if(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) !== 6) return 'Maksimal yig\\'indi xato'; return null;"
    },
    {
      id: 9,
      title: "Contains Duplicate",
      instruction: "Massivda bir xil element borligini `Set` yordamida O(n) vaqtda tekshiruvchi `containsDuplicate(nums)` funksiyasini yozing (true/false).",
      startingCode: "function containsDuplicate(nums) {\n  // Set yordamida yozing\n}",
      hint: "return new Set(nums).size !== nums.length;",
      test: "if (typeof containsDuplicate !== 'function') return 'containsDuplicate topilmadi'; if (containsDuplicate([1, 2, 3, 1]) !== true) return 'Dublikat borligini topolmadi'; if (containsDuplicate([1, 2, 3]) !== false) return 'To\\'g\\'ri massivda xato berdi'; return null;"
    },
    {
      id: 10,
      title: "Product of Array Except Self",
      instruction: "Massivning har bir elementi o'rniga o'zidan tashqari barcha elementlar ko'paytmasini yozib qaytaradigan `productExceptSelf(nums)` funksiyasini O(n) vaqtda yozing (bo'lish amali '/' ishlatmang).",
      startingCode: "function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  // Chapdan o'ngga va o'ngdan chapga ko'paytiring\n  return res;\n}",
      hint: "let left = 1; for(let i=0; i<n; i++) { res[i] = left; left *= nums[i]; }\nlet right = 1; for(let i=n-1; i>=0; i--) { res[i] *= right; right *= nums[i]; }",
      test: "if (typeof productExceptSelf !== 'function') return 'productExceptSelf topilmadi'; const res = productExceptSelf([1, 2, 3, 4]); if(res[0]!==24 || res[1]!==12 || res[2]!==8 || res[3]!==6) return 'Ko\\'paytma xato'; return null;"
    },
    {
      id: 11,
      title: "Climbing Stairs",
      instruction: "n qadamli zinadan har safar 1 yoki 2 qadam tashlab chiqish mumkin bo'lsa, jami necha xil usulda chiqish mumkinligini hisoblaydigan `climbStairs(n)` funksiyasini yozing.",
      startingCode: "function climbStairs(n) {\n  if(n <= 2) return n;\n  // Dinamik yondashuv orqali zina kombinatsiyasini hisoblang\n}",
      hint: "let first = 1, second = 2; for(let i=3; i<=n; i++) { let third = first + second; first = second; second = third; } return second;",
      test: "if (typeof climbStairs !== 'function') return 'climbStairs topilmadi'; if(climbStairs(3) !== 3) return '3-zina uchun xato'; if(climbStairs(5) !== 8) return '5-zina uchun xato'; return null;"
    },
    {
      id: 12,
      title: "Valid Palindrome",
      instruction: "Satr faqat alfanumerik (harf va raqam) belgilar bo'yicha chapdan ham, o'ngdan ham bir xil o'qilishini (Palindrome) tekshiradigan `isPalindrome(s)` funksiyasini yozing.",
      startingCode: "function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  // Ikki ko'rsatkich yordamida tekshiring\n}",
      hint: "let left = 0, right = clean.length - 1;\nwhile(left < right) { if(clean[left] !== clean[right]) return false; left++; right--; } return true;",
      test: "if (typeof isPalindrome !== 'function') return 'isPalindrome topilmadi'; if(isPalindrome('A man, a plan, a canal: Panama') !== true) return 'To\\'g\\'ri palindromni rad etdi'; if(isPalindrome('race a car') !== false) return 'Palindrom bo\\'lmagan satrda xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi yondashuv orqali 'Two Sum' masalasini O(n^2) dan O(n) vaqt murakkabligiga tushirish mumkin?",
      options: [
        "Massivni saralab, Binary Search qilish orqali",
        "Hash Map yordamida ko'rilgan elementlar indeksini saqlash orqali",
        "Sliding Window yondashuvi yordamida",
        "Stack tuzilmasini qo'llash orqali"
      ],
      correctAnswer: 1,
      explanation: "Hash Map (yoki Map) yordamida biz har bir elementni bir marta aylanib, uning target-ga nisbatan farqini (complement) Map-dan O(1) da topishimiz mumkin."
    },
    {
      id: 2,
      question: "Valid Parentheses masalasini yechishda nima uchun Stack tuzilmasi eng mos keladi?",
      options: [
        "Chunki u ma'lumotlarni saralaydi",
        "Chunki oxirgi ochilgan qavs har doim birinchi yopilishi shart (LIFO printsipi)",
        "Stek xotirani kamroq egallaydi",
        "Massivdan tezroq ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Qavslar juftlashishi LIFO (Last In First Out) qoidasiga bo'ysunadi. Eng oxirgi ochilgan qavs navbatdagi kelgan mos yopuvchi qavs bilan juftlashishi kerak."
    },
    {
      id: 3,
      question: "Best Time to Buy and Sell Stock masalasining eng optimal vaqt murakkabligi qanday?",
      options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
      correctAnswer: 2,
      explanation: "Ushbu masalani bitta sikl bilan (O(n) vaqtda) massiv bo'ylab yurganda eng arzon narxni va shu kungacha bo'lgan eng katta foydani saqlab borish orqali yechish mumkin."
    },
    {
      id: 4,
      question: "Kadane algoritmi nima uchun xizmat qiladi?",
      options: [
        "Massivni ikkiga bo'lib saralash uchun",
        "Maksimal yig'indiga ega bo'lgan ketma-ket keluvchi qism-massivni (Maximum Subarray) O(n) da topish uchun",
        "Sikl bog'lanishlarini aniqlash uchun",
        "Fibonacci sonlarini hisoblash uchun"
      ],
      correctAnswer: 1,
      explanation: "Kadane algoritmi dinamik yondashuv bo'lib, har bir indeksda tugaydigan eng katta yig'indini hisoblab borish orqali maksimal qism-massivni topadi."
    },
    {
      id: 5,
      question: "Contains Duplicate masalasini O(n) vaqtda yechishda Set tuzilmasi qanday yordam beradi?",
      options: [
        "Set elementlarni avtomatik tartiblaydi",
        "Set faqat unikal (takrorlanmas) qiymatlarni saqlaydi, agar uning o'lchami massivnikidan kichik bo'lsa demak dublikat bor",
        "Set vaqtni O(1) qilib qo'yadi",
        "Set hech qanday xotira talab qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Set massivdagi takrorlangan elementlarni olib tashlaydi. Agar Set o'lchami asl massiv uzunligi bilan teng bo'lmasa, unda kamida bitta element takrorlangan bo'ladi."
    },
    {
      id: 6,
      question: "Product of Array Except Self masalasini bo'lish amalisiz (without division) O(n) vaqtda yechish printsipi qanday?",
      options: [
        "Ichma-ich sikl yordamida barcha ko'paytmalarni hisoblash",
        "Har bir element uchun uning chap tomonidagi ko'paytmalarni (prefix) va o'ng tomonidagi ko'paytmalarni (suffix) alohida hisoblab ko'paytirish",
        "Binary Search yordamida",
        "Faqat manfiy elementlarni hisobga olish"
      ],
      correctAnswer: 1,
      explanation: "Har bir son uchun uning o'ng va chap tomonlaridagi elementlar ko'paytmasini alohida massivlarda (yoki bitta massiv va bitta o'zgaruvchida) saqlab borish optimal yechim hisoblanadi."
    },
    {
      id: 7,
      question: "Zinaga chiqish (Climbing Stairs) masalasining yechim formulasi qaysi matematik qonuniyatga mos keladi?",
      options: ["Faktorialga", "Fibonacci ketma-ketligiga", "Tub sonlarga", "Geometrik progressiyaga"],
      correctAnswer: 1,
      explanation: "n-zinaga chiqish yo'llari soni (n-1) va (n-2) zinalarga chiqish yo'llari yig'indisiga teng. Bu Fibonacci sonlari formulasining o'zidir."
    },
    {
      id: 8,
      question: "Valid Anagram masalasida so'zlar anagramma ekanligini eng kam xotira sarflab tekshirish usuli qaysi?",
      options: [
        "Ikkala so'zni alohida harflarga ajratib saralash (Sort) va solishtirish",
        "Harflar chastotasini bitta massiv yoki ob'ektda sanab, birinchisida oshirib, ikkinchisida kamaytirib tekshirish",
        "Harflarni soniyaga o'girish",
        "Faqat unli harflarni solishtirish"
      ],
      correctAnswer: 1,
      explanation: "Harflar sonini bitta Map/Object yordamida sanash (oshirib-kamaytirish) eng optimal $O(n)$ vaqt va $O(1)$ (belgilar soni cheklanganligi sababli) xotira oladi."
    },
    {
      id: 9,
      question: "Sliding Window (sirpanuvchi oyna) yondashuvi odatda qanday masalalarda qo'llaniladi?",
      options: [
        "Graf elementlarini aylanib chiqishda",
        "Ketma-ket keladigan qism-massiv yoki qism-satrlar (contiguous subarray/substring) ustidagi shartlarni tekshirishda",
        "Ikki massivni tartiblab birlashtirishda",
        "Rekursiya chuqurligini cheklashda"
      ],
      correctAnswer: 1,
      explanation: "Sliding Window massiv ustidagi 'oyna' (left va right ko'rsatkichlar) o'lchamini o'zgartirib borish orqali barcha qism-massivlarni qayta hisoblamasdan tekshirishga imkon beradi."
    },
    {
      id: 10,
      question: "Brute Force (qo'pol kuch) yechim nima uchun intervyularda rad etiladi?",
      options: [
        "U kod yozishni qiyinlashtiradi",
        "Chunki u eng samarasiz va sekin ishlaydigan algoritm bo'lib, katta hajmdagi real loyihalarda ishdan chiqadi",
        "U hech qachon to'g'ri natija bermaydi",
        "Uni yozish taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "Brute Force odatda $O(n^2)$ yoki $O(2^n)$ kabi yuqori vaqt talab qiladi, intervyuda esa sizdan eng kam qadam va xotira sarflovchi optimal algoritm kutiladi."
    },
    {
      id: 11,
      question: "Climbing Stairs (Zinaga chiqish) masalasida nima uchun oddiy rekursiya yechimi qabul qilinmaydi?",
      options: [
        "Chunki u ko'p xatolik beradi",
        "Chunki oddiy rekursiya $O(2^n)$ vaqt murakkabligiga ega bo'lib, zinalar soni 40 dan oshganda dastur qotib qoladi",
        "Zina soni faqat juft bo'lishi kerak",
        "U xotirani tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "Oddiy rekursiv yechim bir xil zinalarni juda ko'p marta qayta hisoblaganligi tufayli eksponental vaqt oladi. Buni o'rniga dinamik dasturlash ($O(n)$) ishlatilishi shart."
    },
    {
      id: 12,
      question: "Valid Palindrome masalasini yozganda `replace(/[^a-z0-9]/g, '')` dan foydalanishning sababi nima?",
      options: [
        "Satrdagi barcha sonlarni o'chirish uchun",
        "Bo'shliqlar, tinish belgilari va maxsus belgilarni tozalab, faqat harf va raqamlarni solishtirish uchun",
        "Kodni xavfsiz qilish uchun",
        "JavaScript-da boshqa metod yo'qligi sababli"
      ],
      correctAnswer: 1,
      explanation: "Palindrom so'zni tekshirishda katta-kichik harflar va tinish belgilari (vergul, ikki nuqta, bo'shliqlar) hisobga olinmaydi, shuning uchun ularni o'chirib tashlash kerak."
    }
  ]
};
