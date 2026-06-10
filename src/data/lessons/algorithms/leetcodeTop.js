export const leetcodeTop = {
  id: "leetcodeTop",
  title: "Top Interview LeetCode Masalalari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Top LeetCode Masalalari nima?
**LeetCode** — bu dasturchilar uchun algoritmik fikrlashni rivojlantirish va yirik texnologik kompaniyalar (Google, Meta, Amazon, Apple, Netflix va boshqalar) intervyulariga tayyorlanish uchun dunyodagi eng mashhur platformadir.
Top LeetCode masalalari odatda eng ko'p so'raladigan va dasturlashning asosiy naqshlarini (patterns) o'z ichiga olgan klassik muammolardir.

### Real hayotiy analogiya
Algoritmlarni yechish va naqshlarni o'rganish xuddi **shaxmat o'ynashga** o'xshaydi:
* **Brute Force (Oddiy yo'l):** Shaxmat donalarini tasodifiy surib ko'rish yoki raqibning har bir mumkin bo'lgan yurishini hisoblab chiqish (juda ko'p vaqt oladi).
* **Algoritmik naqshlar (Patterns):** Shaxmatdagi ma'lum debyutlar, taktikalar (vilka, bog'lash, mot naqshlari) kabi, algoritmlarda ham ma'lum usullar bor (masalan, Sliding Window, Two Pointers, DFS, Dynamic Programming). Agar siz shu naqshlarni bilsangiz, masalani ko'rishingiz bilan uning optimal yechimini ko'ra olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Two Sum - Ikki son yig'indisi)
Berilgan massiv ichidan yig'indisi target-ga teng bo'lgan ikki son indeksini topish:
\`\`\`javascript
// O(n) vaqt va O(n) xotira yechimi
function twoSum(nums, target) {
  const map = new Map(); // Qiymat -> Indeks xaritasi
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // Agar farq map-da bo'lsa, indekslarni qaytaramiz
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    // Aks holda joriy sonni indeks bilan birga saqlaymiz
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
\`\`\`

### 2. Intermediate Example (Valid Parentheses - Qavslarni tekshirish)
Qavslar to'g'ri ochilib yopilganligini stak yordamida tekshirish:
\`\`\`javascript
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char); // Ochilgan qavsni stakka qo'shamiz
    } else {
      // Yopiluvchi qavs kelganda stakdan oxirgisini pop qilamiz
      const last = stack.pop();
      if (last !== map[char]) {
        return false; // Mos kelmasa xato
      }
    }
  }
  
  return stack.length === 0; // Agar stak bo'sh bo'lsa, hammasi to'g'ri yopilgan
}

console.log(isValid("()[]{}")); // true
console.log(isValid("([)]")); // false
\`\`\`

### 3. Advanced Example (Best Time to Buy and Sell Stock)
Maksimal foydani bitta tsikl yordamida topish (Kadane uslubiga yaqin):
\`\`\`javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]; // Eng arzon narxni yangilaymiz
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice; // Maksimal foydani yangilaymiz
    }
  }
  
  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (1 da sotib olib, 6 da sotiladi)
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Texnik intervyulardan o'tish:** Yirik IT kompaniyalari sizning dasturlash tilingizni bilishingizdan ko'ra muammoni hal qilish logikangizni (Problem Solving) tekshiradi. LeetCode masalalari aynan shuni baholash uchun standart vositadir.
* **Kodni optimallashtirish ko'nikmasi:** Kundalik dasturlashda juniorlar ko'pincha nested loops (ichma-ich tsikllar) yozib, O(n²) yechimlar yaratishadi. LeetCode naqshlarini bilish esa kodni O(n) yoki O(log n) tezlikda ishlashiga imkon beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Brute Force yechimida to'xtab qolish
Masalaga yechim yozgach, tezlikni tekshirmaslik eng katta xatodir.
* *Junior:* Nested loops (O(n²)) yozadi va ishlayotganiga xursand bo'ladi.
* *Senior:* Xotira (Space) va Vaqt (Time) murakkabliklarini tahlil qilib, Hash Table, Sliding Window yoki Two Pointers yordamida tezlikni O(n) ga tushiradi.

### 2. Edge case-larni (chekka holatlar) hisobga olmaslik
#### Xato:
Massiv bo'sh bo'lganda, bitta element bo'lganda yoki manfiy sonlar bo'lganda kodni tekshirmaslik.
#### Tuzatish:
Kod yozishdan oldin input validatsiyasini va chekka holatlarni o'ylash kerak:
\`if (!prices || prices.length < 2) return 0;\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Big O notation nima va u nima uchun kerak?
   * **Javob:** Algoritmning ma'lumotlar hajmi (n) ortib borishi bilan vaqt va xotira sarfi qanchalik o'sishini ifodalovchi matematik o'lchovdir.
2. **Savol:** Stack va Queue farqi nimada?
   * **Javob:** Stack — LIFO (Last In First Out - oxirgi kirgan birinchi chiqadi), Queue — FIFO (First In First Out - birinchi kirgan birinchi chiqadi).
3. **Savol:** Nima uchun Two Sum masalasida Map ishlatganimiz ma'qul?
   * **Javob:** Map ichidan kalit bo'yicha qiymat qidirish vaqt murakkabligi O(1) bo'lganligi sababli.
4. **Savol:** Satr (string) belgilarini tezkor teskari (reverse) qilish qanday amalga oshiriladi?
   * **Javob:** JS-da: \`s.split('').reverse().join('')\` yoki Two Pointer yordamida massivga o'girib, o'rinlarini almashtirish orqali.

### Middle (5–8)
5. **Savol:** sliding Window (Sirpanuvchi oyna) texnikasi qachon ishlatiladi?
   * **Javob:** Massiv yoki satrning ketma-ket kelgan qismlarini (subarrays/substrings) tahlil qilishda, keraksiz takroriy hisoblashlarni oldini olish uchun.
6. **Savol:** Linked List (Bog'langan ro'yxat) nima va uning massivdan afzalligi nimada?
   * **Javob:** Elementlari xotirada ketma-ket joylashmagan, har bir element keyingisiga ko'rsatkich (pointer) saqlaydigan tuzilma. Afzalligi — element qo'shish va o'chirish O(1) vaqt oladi.
7. **Savol:** Kadane algoritmi nima?
   * **Javob:** Massiv ichidagi eng katta yig'indiga ega bo'lgan ketma-ket qism massivni (Maximum Subarray) O(n) vaqtda topuvchi algoritm.
8. **Savol:** \`Fast and Slow Pointers\` (Tez va sekin ko'rsatkichlar) texnikasi qayerda ishlatiladi?
   * **Javob:** Linked List ichida sikl (loop/cycle) bor-yo'qligini aniqlashda (Floyd's Cycle Finding Algorithm) yoki ro'yxatning o'rtasini topishda.

### Senior (9–12)
9. **Savol:** Dinamik Dasturlash (Dynamic Programming) va Rekursiya o'rtasidagi farq nima?
   * **Javob:** DP — bu rekursiv muammoning kichik qismlari natijalarini keshlab (Memoization yoki Tabulation orqali), takroriy hisob-kitoblarni chetlab o'tuvchi optimallashtirilgan yondashuvdir.
10. **Savol:** BFS va DFS algoritmlarining xotira murakkabligi farqi nimada?
    * **Javob:** BFS daraxt kengligiga qarab xotira oladi (navbat queue ishlatadi), DFS esa daraxt chuqurligiga qarab xotira oladi (chaqiriqlar staki ishlatiladi).
11. **Savol:** "Monotonic Stack" nima va u qanday masalalarda qo'llaniladi?
    * **Javob:** Elementlari faqat o'sib borish yoki faqat kamayib borish tartibida saqlanadigan stak. U ko'pincha "keyingi eng katta element" (Next Greater Element) kabi masalalarni O(n) da yechishda qo'llaniladi.
12. **Savol:** Tizimli dizayn (System Design) va LeetCode algoritmlari o'rtasidagi bog'liqlik nimada?
    * **Javob:** Leetcode masalalari past darajadagi (low-level) kod tezligi va xotirani optimallashtirsa, System Design yuqori darajadagi (high-level) arxitektura, keshlar, ma'lumotlar bazalarini taqsimlash muammolarini hal qiladi. Har ikkisi ham masshtablanuvchanlik (scalability) uchun muhimdir.

---

## 6. 🛠️ Amaliy Topshiriqlar

Ushbu bo'limdagi interaktiv muharrir yordamida Two Sum, Valid Parentheses va Best Time to Buy and Sell Stock masalalarini optimal usullarda yozib, test topshiriqlarini bajaring.

---

## 7. 📝 12 ta Mini Test

Bilimingizni mustahkamlash uchun dars oxiridagi 12 ta test savoli.

---

## 8. 🎯 Real Project Case Study

### Ilova loglari yoki qavslar sintaksisini tekshiruvchi validator
Matn muharrirlarida (masalan, VS Code yoki brauzer konsolida) foydalanuvchi kod yozayotganda qavslarning to'g'ri ochilib yopilganligini real vaqtda tekshirish tizimi Stack va Map algoritmlari yordamida ishlaydi.

#### Kod sintaksisi validatorining soddalashtirilgan ko'rinishi:
\`\`\`javascript
class SyntaxValidator {
  constructor() {
    this.matchingPairs = { ')': '(', '}': '{', ']': '[' };
    this.openingSet = new Set(['(', '{', '[']);
  }

  validate(codeString) {
    const stack = [];
    for (let char of codeString) {
      if (this.openingSet.has(char)) {
        stack.push(char);
      } else if (this.matchingPairs[char]) {
        if (stack.length === 0 || stack.pop() !== this.matchingPairs[char]) {
          return false; // Noto'g'ri yopilgan qavs
        }
      }
    }
    return stack.length === 0; // Ochiq qavs qolib ketmaganligini tekshirish
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **O'rnatilgan metodlardan qochish:** Ba'zida \`Array.prototype.indexOf\` yoki \`.includes\` metodlarini tsikl ichida ishlatish bilmasdan O(n²) tezlikka olib kelishi mumkin. Ularning o'rniga Map/Set (O(1)) ishlatgan ma'qul.
* **Xotira tejash (In-place changes):** Agar qo'shimcha xotira sarflash taqiqlangan bo'lsa (O(1) Space), massiv elementlarini yangi massivga ko'chirmasdan, Two Pointer texnikasi bilan joyida almashtiring.

---

## 10. 📌 Cheat Sheet

| Naqsh (Pattern) | Qachon ishlatiladi | Murakkablik (Time) | Masalaga misol |
| :--- | :--- | :--- | :--- |
| **Two Pointers** | Saralangan massivda juftliklarni qidirishda | O(n) | Two Sum II, Reverse String |
| **Sliding Window** | Subarray yoki Substring o'lchamlarini dinamik tekshirishda | O(n) | Longest Substring Without Repeating Chars |
| **Fast & Slow** | Linked listda aylanma yo'llarni topishda | O(n) | Linked List Cycle |
| **Hash Map / Set** | Qiymatlarni tezkor tekshirish va indeks saqlashda | O(1) amallar | Two Sum, Contains Duplicate |
| **Stack** | Qavslar, orqaga qaytish (backtracking) jarayonlarida | O(n) | Valid Parentheses |
`,
  exercises: [
  {
    "id": 1,
    "title": "Two Sum (Ikki son yig'indisi)",
    "instruction": "Butun sonlar massivi (`nums`) va bitta butun son (`target`) berilgan. Yig'indisi `target` ga teng bo'lgan ikkita sonning indekslarini qaytaruvchi `twoSum(nums, target)` funksiyasini yozing. Bir xil elementni ikki marta ishlatish mumkin emas. Javob istalgan tartibda bo'lishi mumkin. O(n) vaqt murakkabligida ishlashga harakat qiling.",
    "startingCode": "function twoSum(nums, target) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Map (yoki obyekt) obyektidan foydalanib, har bir elementning farqini (target - nums[i]) tekshirib boring. Agar farq Map ichida bo'lsa, javobni darhol indekslar bilan qaytaring.",
    "test": "const sandbox = new Function(code + '; return twoSum;');\nconst fn = sandbox();\nconst res1 = fn([2, 7, 11, 15], 9);\nif (!Array.isArray(res1) || res1.length !== 2) return 'Massiv qaytarilishi kerak va uzunligi 2 bo\\'lishi lozim';\nif (!((res1[0] === 0 && res1[1] === 1) || (res1[0] === 1 && res1[1] === 0))) return '[2,7,11,15] va 9 uchun javob [0,1] chiqishi kerak';\nconst res2 = fn([3, 2, 4], 6);\nif (!((res2[0] === 1 && res2[1] === 2) || (res2[0] === 2 && res2[1] === 1))) return '[3,2,4] va 6 uchun javob [1,2] chiqishi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Valid Parentheses (Qavslar to'g'riligi)",
    "instruction": "Faqat `'('`, `')'`, `'{'`, `'}'`, `'['` va `']'` belgilaridan iborat satr (`s`) berilgan. Qavslar to'g'ri ochilib yopilganini tekshiruvchi `isValid(s)` funksiyasini yozing. Buning uchun qavslar to'g'ri tartibda yopilishi va ochilgan turdagi qavs bilan mos kelishi lozim.",
    "startingCode": "function isValid(s) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Stek (Stack) ma'lumotlar tuzilmasidan foydalaning. Ochiluvchi qavslarni stakka qo'shing (`push`), yopiluvchi qavs kelganda esa stakdan oxirgisini chiqarib (`pop`) solishtiring.",
    "test": "const sandbox = new Function(code + '; return isValid;');\nconst fn = sandbox();\nif (fn('()') !== true) return '\"()\" uchun true qaytishi kerak';\nif (fn('()[]{}') !== true) return '\"()[]{}\" uchun true qaytishi kerak';\nif (fn('(]') !== false) return '\"(]\" uchun false qaytishi kerak';\nif (fn('([)]') !== false) return '\"([)]\" uchun false qaytishi kerak';\nif (fn('{[]}') !== true) return '\"{[]}\" uchun true qaytishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Best Time to Buy and Sell Stock (Aksiyani sotib olish va sotish)",
    "instruction": "Kunlik aksiya narxlari massivi (`prices`) berilgan. Siz faqat bitta aksiyani bir kunda sotib olib, kelajakda boshqa kunda sotishingiz mumkin. Maksimal foyda miqdorini qaytaruvchi `maxProfit(prices)` funksiyasini yozing. Agar foyda ko'rish iloji bo'lmasa, `0` qaytaring.",
    "startingCode": "function maxProfit(prices) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Bir marta aylanib chiqadigan (Single Pass) algoritm yozing. Eng minimal narxni (minPrice) va maksimal foydani (maxProfit) kuzatib boring. Har safar `prices[i] - minPrice` ni hisoblab, maxProfit bilan solishtiring.",
    "test": "const sandbox = new Function(code + '; return maxProfit;');\nconst fn = sandbox();\nif (fn([7, 1, 5, 3, 6, 4]) !== 5) return '[7,1,5,3,6,4] uchun foyda 5 bo\\'lishi kerak (1 da olib, 6 da sotish)';\nif (fn([7, 6, 4, 3, 1]) !== 0) return '[7,6,4,3,1] uchun foyda 0 bo\\'lishi kerak';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Two Sum masalasini Brute Force (kuch bilan) yechganda vaqt murakkabligi (Time Complexity) qanday bo'ladi?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(1)"
    ],
    "correctAnswer": 2,
    "explanation": "Brute Force yondashuvida ikki qavatli tsikl yordamida barcha juftliklar solishtirib chiqiladi, bu esa O(n²) vaqt oladi."
  },
  {
    "id": 2,
    "question": "Hash Map (yoki JS Obyekti) yordamida Two Sum masalasini qanday optimal vaqtda yechish mumkin?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(log n)",
      "O(1)"
    ],
    "correctAnswer": 0,
    "explanation": "Biz massivni bir marta aylanib chiqib, har bir element uchun kerakli juftlikni (`target - element`) Map ichidan O(1) vaqtda qidiramiz, natijada umumiy vaqt O(n) bo'ladi."
  },
  {
    "id": 3,
    "question": "Hash Map yordamida Two Sum yechimining xotira murakkabligi (Space Complexity) qanday bo'ladi?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n²)"
    ],
    "correctAnswer": 1,
    "explanation": "Eng yomon holatda massivdagi barcha n ta elementni Hash Map ichiga saqlash talab etiladi, bu esa O(n) qo'shimcha xotira deganidir."
  },
  {
    "id": 4,
    "question": "Valid Parentheses (To'g'ri qavslar) masalasini yechishda eng mos keladigan ma'lumotlar tuzilmasi qaysi?",
    "options": [
      "Queue (Navbat)",
      "Stack (Stek)",
      "Binary Search Tree",
      "Graph (Graf)"
    ],
    "correctAnswer": 1,
    "explanation": "Qavslar 'oxirgi kirgan - birinchi chiqadi' (LIFO) tamoyili bo'yicha yopiladi, shuning uchun Stack tuzilmasi bu masalaga eng to'g'ri yechimdir."
  },
  {
    "id": 5,
    "question": "Valid Parentheses yechimining vaqt va xotira murakkabligi (optimal holatda) qanday?",
    "options": [
      "Vaqt: O(n), Xotira: O(n)",
      "Vaqt: O(n²), Xotira: O(1)",
      "Vaqt: O(log n), Xotira: O(n)",
      "Vaqt: O(n), Xotira: O(1)"
    ],
    "correctAnswer": 0,
    "explanation": "Satrni bir marta to'liq aylanib chiqish O(n) vaqt oladi. Ochilgan qavslarni yig'ib boruvchi stak esa eng yomon holatda n/2 elementni saqlashi mumkin, ya'ni xotira O(n)."
  },
  {
    "id": 6,
    "question": "Best Time to Buy and Sell Stock (Aksiyani sotish) masalasida maksimal foydani topish uchun Single Pass (bir marta aylanib chiqish) algoritmining vaqt va xotira murakkabligi qanday?",
    "options": [
      "Vaqt: O(n²), Xotira: O(1)",
      "Vaqt: O(n), Xotira: O(n)",
      "Vaqt: O(n), Xotira: O(1)",
      "Vaqt: O(1), Xotira: O(1)"
    ],
    "correctAnswer": 2,
    "explanation": "Biz massivni bir marta aylanib chiqib, faqat minimal narx va maksimal foydani saqlovchi ikkita o'zgaruvchidan foydalanamiz. Shuning uchun vaqt O(n), xotira O(1) bo'ladi."
  },
  {
    "id": 7,
    "question": "LeetCode masalalarida 'Two Pointers' (Ikki ko'rsatkich) texnikasi odatda qanday vaziyatlarda qo'llaniladi?",
    "options": [
      "Faqat daraxtlarni rekursiv aylanishda",
      "Saralangan massivda juftliklarni qidirish yoki massiv elementlarini joyida almashtirishda",
      "Katta JSON fayllarini parse qilishda",
      "Serverga HTTP POST so'rovlarini parallel yuborishda"
    ],
    "correctAnswer": 1,
    "explanation": "Ikki ko'rsatkich texnikasi massivning ikki chetidan (chap va o'ng) markazga qarab yurish yoki tez va sekin ko'rsatkichlar yordamida zanjirlarni tekshirishda ishlatiladi."
  },
  {
    "id": 8,
    "question": "'Number of Islands' (Orollar soni - LeetCode #200) masalasini yechishda qaysi algoritmik yondashuv eng ko'p ishlatiladi?",
    "options": [
      "Binary Search",
      "Merge Sort",
      "DFS (Depth-First Search) yoki BFS",
      "Sliding Window"
    ],
    "correctAnswer": 2,
    "explanation": "Orolning barcha qismlarini (qo'shni 1 larni) aniqlash va ularni suvga (0 ga) aylantirib borish uchun Graf/Matritsa aylanish algoritmlari (DFS/BFS) qo'llaniladi."
  },
  {
    "id": 9,
    "question": "Bog'langan ro'yxatni teskari qilish (Reverse Linked List) algoritmining vaqt murakkabligi qanday?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    "correctAnswer": 2,
    "explanation": "Ro'yxatning har bir tugunini bir marta ko'rib chiqib, ko'rsatkichlarini teskari tomonga o'zgartirish kerak, bu esa O(n) vaqt talab qiladi."
  },
  {
    "id": 10,
    "question": "Eng katta yig'indiga ega qism massivni topish (Maximum Subarray - Kadane algoritmi) qanday yondashuvga misol bo'ladi?",
    "options": [
      "Binary Search",
      "Dinamik Dasturlash (Dynamic Programming) / Greedy",
      "Divide and Conquer",
      "Brute Force"
    ],
    "correctAnswer": 1,
    "explanation": "Kadane algoritmi joriy elementgacha bo'lgan maksimal yig'indi va umumiy maksimal yig'indini saqlash orqali sub-problem xarakteriga ega, bu Dinamik dasturlash/Greedy tamoyillariga asoslanadi."
  },
  {
    "id": 11,
    "question": "Sliding Window (Sirpanuvchi oyna) texnikasi qanday turdagi muammolarni optimallashtirish uchun qo'llaniladi?",
    "options": [
      "Massivda ketma-ket keladigan (contiguous) elementlar blokini (masalan, eng uzun qism satr) O(n²) dan O(n) ga tushirish uchun",
      "Ikki xil massivni birlashtirish uchun",
      "SQL ma'lumotlar bazasini indekslash uchun",
      "Daraxtlarni darajama-daraja chiqarish uchun"
    ],
    "correctAnswer": 0,
    "explanation": "Sliding Window massivning ma'lum bir qismini (oynani) o'ngga surish va chap chegarani qisqartirish orqali keraksiz takroriy hisob-kitoblarning oldini olib, O(n) yechim beradi."
  },
  {
    "id": 12,
    "question": "LeetCode intervyulariga tayyorlanishda 'Space-Time Tradeoff' deganda nima tushuniladi?",
    "options": [
      "Algoritm bajarilish tezligini oshirish uchun qo'shimcha xotiradan (masalan, Hash Table) foydalanish",
      "Kodni faqat serverda bajarish orqali mijoz kompyuterini tejash",
      "Rekursiv funksiyalarni faqat async/await bilan yozish",
      "Dastur xotirasini bo'shatish uchun sahifani yangilash"
    ],
    "correctAnswer": 0,
    "explanation": "Space-Time Tradeoff — bu xotira evaziga vaqtni tejashdir. Masalan, Two Sum masalasida Hash Map (qo'shimcha xotira) ishlatib, qidiruv vaqtini O(n²) dan O(n) ga tushiramiz."
  }
]

};
