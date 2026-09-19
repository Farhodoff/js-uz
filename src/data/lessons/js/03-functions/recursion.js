export const recursion = {
  id: 'recursion',
  title: 'Rekursiya (Recursion)',
  description: "Rekursiya nima, base case ahamiyati, stack overflow, amaliy misollar va iterative yechimlar bilan solishtirish.",
  theory: `
## 📦 Rekursiya nima?

**Rekursiya** — funksiyaning **o'zini o'zi chaqirishi**.

🎩 **Hayotiy o'xshatish:** Tasavvur qiling, siz zinapoyada turibsiz va "yuqorida yana qancha qadam bor?" deb so'rashingiz kerak. Siz yuqoridagi odamdan so'raysiz, u ham undan yuqoridagidan so'raydi... Eng yuqoridagi odam: "mendan yuqorida 0 qadam bor" deydi — va javor pastga qaytadi, har kim o'z qadamini qo'shib.

\`\`\`javascript
function countDown(n) {
  if (n === 0) return;       // ⬅️ BASE CASE (to'xtash sharti)
  console.log(n);
  countDown(n - 1);          // ⬅️ RECURSIVE CASE (o'zini chaqiradi)
}
countDown(3); // 3, 2, 1
\`\`\`

## ⚠️ Eng muhim qoida: Base Case

Har bir rekursiv funksiyada **to'xtash sharti (base case)** bo'lishi SHART. Bo'lmasa — **stack overflow**:

\`\`\`javascript
// ❌ YOMON — base case yo'q!
function badRecursion(n) {
  return badRecursion(n - 1); // RangeError: Maximum call stack size exceeded
}

// ✅ YAXSHI — base case bor
function goodRecursion(n) {
  if (n <= 0) return 0;      // base case
  return n + goodRecursion(n - 1);
}
\`\`\`

## 💡 Klassik misollar

**1. Faktorial (n! = n × (n-1) × ... × 1):**
\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1;        // 1! = 1
  return n * factorial(n - 1); // n! = n × (n-1)!
}
factorial(5); // 120 (5×4×3×2×1)
\`\`\`

**2. Fibonacci (har bir son = oldingi ikkisining yig'indisi):**
\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;       // fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);
}
fib(6); // 8 (0,1,1,2,3,5,8)
\`\`\`

**3. Massiv yig'indisi:**
\`\`\`javascript
function sum(arr) {
  if (arr.length === 0) return 0;          // bo'sh massiv = 0
  return arr[0] + sum(arr.slice(1));       // birinchi + qolgani
}
sum([1, 2, 3, 4]); // 10
\`\`\`

**4. Nested obyektni tekislash (flatten):**
\`\`\`javascript
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));  // ichki massiv — yana flatten!
    } else {
      result.push(item);
    }
  }
  return result;
}
flatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
\`\`\`

## 🚀 Call Stack qanday ishlaydi

Har bir chaqiruv **call stack** ga ramka (frame) qo'shadi:

\`\`\`javascript
factorial(3)
// factorial(3) → 3 * factorial(2)   (kutish)
//   factorial(2) → 2 * factorial(1) (kutish)
//     factorial(1) → 1              (BASE! javob qaytadi)
//   factorial(2) → 2 * 1 = 2
// factorial(3) → 3 * 2 = 6
\`\`\`

Chrome'da stack limiti ~10,000 chaqiruv. Shuning uchun **chuqur rekursiya** xavfli.

## ⚖️ Rekursiya vs Iteratsiya

| Jihat | Rekursiya | Iteratsiya (sikl) |
|---|---|---|
| O'qilishi | Nested ma'lumotlarda aniq | Oddiy hollarda aniq |
| Xotira | Har chaqiruv stack oladi | Doimiy O(1) |
| Tezligi | Funksiya chaqiruvi qimmat | Tezroq |
| Stack overflow | Mavjud xavf | Yo'q |

❌ **YOMON:** Oddiy yig'indini ham rekursiya bilan hisoblash.
✅ **YAXSHI:** Rekursiya — daraxt, nested tuzilmalar, bo'lib yechish (divide & conquer) uchun.

**Maslahat:** Har bir rekursiyani siklga aylantirish mumkin (va aksincha). Interview'da ikkalasini ham ko'rsata olish kerak.

## 🎯 Amaliy qo'llanilishi

- **DOM daraxti:** elementlar ichidagi elementlarni aylanish
- **JSON nested:** chuqur obyektlarni tekshirish
- **Fayl tizimi:** papka ichidagi papkalarni o'qish
- **Algoritmlar:** merge sort, quick sort, binary search (rekursiv shaklda)
- **Recursion + memoization:** fib(50) ni tez hisoblash

\`\`\`javascript
// Memoization bilan fibonacci — exponential → linear:
const memo = {};
function fastFib(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fastFib(n - 1) + fastFib(n - 2);
}
\`\`\`

## 📝 Xulosa

- Rekursiya = funksiyaning o'zini chaqirishi
- **Base case** bo'lmasa — stack overflow
- Har chaqiruv call stack'da joy oladi
- Nested/daraxt strukturalar uchun ideal
- Katta n uchun iteratsiya yoki memoization ishlating
`,

  exercises: [
    {
      id: 1,
      title: "countDown — birinchi rekursiya",
      instruction: "n dan 1 gacha sonlarni console.log bilan chiqaradigan rekursiv funksiya yozing. n = 0 bo'lsa to'xtasin.",
      startingCode: "function countDown(n) {\n  // base case\n  // chiqarish\n  // rekursiv chaqiruv\n}",
      hint: "if (n === 0) return; console.log(n); countDown(n - 1);",
      solution: "function countDown(n) {\n  if (n === 0) return;\n  console.log(n);\n  countDown(n - 1);\n}",
      test: "const fn = new Function(code + '; return countDown;')();\nfn(3);\nif (logs.join(',') !== '3,2,1') throw new Error('3, 2, 1 chiqishi kerak (natija: ' + logs.join(',') + ')');"
    },
    {
      id: 2,
      title: "Faktorial",
      instruction: "n! ni rekursiv hisoblaydigan funksiya yozing (n! = n × (n-1) × ... × 1).",
      startingCode: "function factorial(n) {\n  // base case: n <= 1 => 1\n  // recursive case: n * factorial(n-1)\n}",
      hint: "if (n <= 1) return 1; return n * factorial(n - 1);",
      solution: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
      test: "const fn = new Function(code + '; return factorial;')();\nif (fn(5) !== 120) throw new Error('factorial(5) = 120 bo\\'lishi kerak');\nif (fn(1) !== 1) throw new Error('factorial(1) = 1 bo\\'lishi kerak');"
    },
    {
      id: 3,
      title: "Yig'indi 1 dan n gacha",
      instruction: "1 + 2 + ... + n yig'indisini rekursiya bilan hisoblang (sikl ishlatmang).",
      startingCode: "function sumTo(n) {\n  // kodni yozing\n}",
      hint: "n === 1 bo'lsa 1; aks holda n + sumTo(n - 1).",
      solution: "function sumTo(n) {\n  if (n === 1) return 1;\n  return n + sumTo(n - 1);\n}",
      test: "const fn = new Function(code + '; return sumTo;')();\nif (fn(4) !== 10) throw new Error('sumTo(4) = 10 bo\\'lishi kerak');\nif (fn(100) !== 5050) throw new Error('sumTo(100) = 5050 bo\\'lishi kerak');"
    },
    {
      id: 4,
      title: "Massiv yig'indisi",
      instruction: "Massiv elementlari yig'indisini rekursiya bilan hisoblang (slice ishlatish mumkin).",
      startingCode: "function sumArray(arr) {\n  // base case: bo'sh massiv\n  // birinchi element + qolganlari\n}",
      hint: "arr.length === 0 → 0; arr[0] + sumArray(arr.slice(1))",
      solution: "function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sumArray(arr.slice(1));\n}",
      test: "const fn = new Function(code + '; return sumArray;')();\nif (fn([1, 2, 3, 4]) !== 10) throw new Error('[1,2,3,4] yig\\'indisi 10 bo\\'lishi kerak');\nif (fn([]) !== 0) throw new Error('Bo\\'sh massiv yig\\'indisi 0 bo\\'lishi kerak');"
    },
    {
      id: 5,
      title: "Fibonacci",
      instruction: "n-chi Fibonacci sonini rekursiv hisoblang (0, 1, 1, 2, 3, 5, 8...).",
      startingCode: "function fib(n) {\n  // base: fib(0)=0, fib(1)=1\n}",
      hint: "if (n <= 1) return n; return fib(n-1) + fib(n-2);",
      solution: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
      test: "const fn = new Function(code + '; return fib;')();\nif (fn(6) !== 8) throw new Error('fib(6) = 8 bo\\'lishi kerak');\nif (fn(10) !== 55) throw new Error('fib(10) = 55 bo\\'lishi kerak');"
    },
    {
      id: 6,
      title: "Satrni teskari yozish",
      instruction: "Berilgan satrni teskari qiladigan rekursiv funksiya yozing.",
      startingCode: "function reverseString(str) {\n  // base: bo'sh satr yoki 1 belgi\n}",
      hint: "str.length <= 1 → str; aks holda reverseString(str.slice(1)) + str[0]",
      solution: "function reverseString(str) {\n  if (str.length <= 1) return str;\n  return reverseString(str.slice(1)) + str[0];\n}",
      test: "const fn = new Function(code + '; return reverseString;')();\nif (fn('salom') !== 'molas') throw new Error(\"'salom' → 'molas' bo\\'lishi kerak\");"
    },
    {
      id: 7,
      title: "Daraja (pow)",
      instruction: "n ning m-darajasini rekursiya bilan hisoblang (Math.pow ishlatmang).",
      startingCode: "function power(n, m) {\n  // base: m === 0 => 1\n}",
      hint: "m === 0 → 1; aks holda n * power(n, m - 1).",
      solution: "function power(n, m) {\n  if (m === 0) return 1;\n  return n * power(n, m - 1);\n}",
      test: "const fn = new Function(code + '; return power;')();\nif (fn(2, 10) !== 1024) throw new Error('2^10 = 1024 bo\\'lishi kerak');\nif (fn(5, 0) !== 1) throw new Error('5^0 = 1 bo\\'lishi kerak');"
    },
    {
      id: 8,
      title: "Nested massiv chuqurligi",
      instruction: "Massivning necha daraja ichma-ich ekanini rekursiv hisoblang ([1] = 1, [1,[2]] = 2).",
      startingCode: "function depth(arr) {\n  // ichki massivlar uchun rekursiya\n}",
      hint: "Har element uchun: Array.isArray(item) ? depth(item) : 0; max + 1.",
      solution: "function depth(arr) {\n  let max = 0;\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      max = Math.max(max, depth(item));\n    }\n  }\n  return max + 1;\n}",
      test: "const fn = new Function(code + '; return depth;')();\nif (fn([1, 2]) !== 1) throw new Error('[1,2] chuqurligi 1');\nif (fn([1, [2, [3]]]) !== 3) throw new Error('[1,[2,[3]]] chuqurligi 3 bo\\'lishi kerak');"
    },
    {
      id: 9,
      title: "Rekursiv flatten",
      instruction: "Ichma-ich massivni bir darajaga tekislang: [1,[2,[3]]] → [1,2,3].",
      startingCode: "function flatten(arr) {\n  // Array.isArray bilan tekshirib, rekursiya\n}",
      hint: "Array.isArray(item) bo'lsa ...flatten(item), aks holda item.",
      solution: "function flatten(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) result.push(...flatten(item));\n    else result.push(item);\n  }\n  return result;\n}",
      test: "const fn = new Function(code + '; return flatten;')();\nconst res = fn([1, [2, [3, [4]]], 5]);\nif (JSON.stringify(res) !== '[1,2,3,4,5]') throw new Error('[1,2,3,4,5] bo\\'lishi kerak');"
    },
    {
      id: 10,
      title: "Base case ni toping (tuzatish)",
      instruction: "Quyidagi funksiya stack overflow beradi. Base case qo'shib tuzatib, n dan 0 gacha juft sonlarni qaytaruvchi massiv yozing.",
      startingCode: "function evenNumbers(n) {\n  // TUZATISH KERAK: base case yo'q!\n  const result = evenNumbers(n - 1);\n  if (n % 2 === 0) result.push(n);\n  return result;\n}",
      hint: "Birinchi qatorda: if (n === 0) return [];",
      solution: "function evenNumbers(n) {\n  if (n === 0) return [];\n  const result = evenNumbers(n - 1);\n  if (n % 2 === 0) result.push(n);\n  return result;\n}",
      test: "const fn = new Function(code + '; return evenNumbers;')();\nconst res = fn(10);\nif (JSON.stringify(res) !== '[2,4,6,8,10]') throw new Error('[2,4,6,8,10] qaytishi kerak (natija: ' + JSON.stringify(res) + ')');"
    }
  ],

  quizzes: [
    {
      question: "Rekursiya nima?",
      options: [
        "Funksiyaning o'zini o'zi chaqirishi",
        "Sikl ichida sikl ishlatish",
        "Massivni saralash usuli",
        "Obyektdan voris olish"
      ],
      correctAnswer: 0,
      explanation: "Rekursiya — funksiya o'z tanasida o'zini yana chaqiradi."
    },
    {
      question: "Base case (to'xtash sharti) nima uchun kerak?",
      options: [
        "Tezlik uchun",
        "Cheksiz chaqiruvlardan (stack overflow) saqlash uchun",
        "Xotirani kamaytirish uchun",
        "Sintaksis talabi"
      ],
      correctAnswer: 1,
      explanation: "Base case bo'lmasa funksiya abadiy o'zini chaqiraveradi va call stack tugaydi — RangeError."
    },
    {
      question: "Base case yo'q bo'lsa qanday xato ro'y beradi?",
      options: ["TypeError", "SyntaxError", "RangeError: Maximum call stack size exceeded", "ReferenceError"],
      correctAnswer: 2,
      explanation: "Call stack to'lib qoladi va 'Maximum call stack size exceeded' xatosi chiqadi."
    },
    {
      question: "factorial(4) necha marta chaqiriladi (o'zini chaqirishlari bilan)?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "factorial(4) → factorial(3) → factorial(2) → factorial(1). Jami 4 ta chaqiruv."
    },
    {
      question: "Rekursiyaning iteratsiyaga nisbatan asosiy kamchiligi?",
      options: [
        "Ishlamaydi katta sonlar bilan",
        "Har chaqiruv call stack'da xotira oladi",
        "Faqat massivlar bilan ishlaydi",
        "Kod tushunarsiz bo'ladi (har doim)"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruv yangi stack frame yaratadi — xotira sarfi va stack limiti muammosi."
    },
    {
      question: "Qaysi holatda rekursiya eng tabiiy yechim?",
      options: [
        "Oddiy yig'indini hisoblashda",
        "Daraxt/nested tuzilmalarni aylanishda",
        "Ikki sonni qo'shishda",
        "Satr uzunligini olishda"
      ],
      correctAnswer: 1,
      explanation: "Nested tuzilmalar (DOM, fayl tizimi, ichma-ich massivlar) rekursiyaning tabiiy maydoni."
    },
    {
      question: "Oddiy rekursiv fibonacci'ning muammosi nima?",
      options: [
        "Xato natija beradi",
        "Bir xil qiymatlar qayta-qayta hisoblanadi (exponential vaqt)",
        "Faqat n < 10 da ishlaydi",
        "Stack ishlatmaydi"
      ],
      correctAnswer: 1,
      explanation: "fib(50) ta fib(30) bir necha marta hisoblanadi — memoization bilan tezlashadi."
    },
    {
      question: "Memoization nima qiladi?",
      options: [
        "Kodni siqadi",
        "Hisoblangan natijalarni cache qilib qayta hisoblamaydi",
        "Stack ni kattalashtiradi",
        "Funksiyani iterativga aylantiradi"
      ],
      correctAnswer: 1,
      explanation: "Memoization — eslab qolish: bir xil argument uchun natija cache'dan olinadi."
    },
    {
      question: "sumArray([1,2,3]) chaqiruvi qanday yoyiladi?",
      options: [
        "1 + 2 + 3 bir chaqiruvda",
        "1 + sumArray([2,3]) → 1 + (2 + sumArray([3])) → 1 + (2 + (3 + sumArray([])))",
        "sumArray([3,2,1]) teskari",
        "Faqat 3 marta slice ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Har qadamda massiv kichrayib boradi va eng chuqur nuqtada (bo'sh massiv) natijalar qaytadi."
    },
    {
      question: "Har bir rekursiv funksiyani... yozish mumkin:",
      options: ["Faqat funksiya bilan", "Sikl (iteratsiya) bilan", "Faqat klass bilan", "Async/await bilan"],
      correctAnswer: 1,
      explanation: "Har qanday rekursiya sikl bilan almashtirilishi mumkin (va aksincha) — interview'da ko'pincha ikkalasi so'raladi."
    },
    {
      question: "Chrome brauzerida taxminan stack limiti:",
      options: ["~100 chaqiruv", "~1,000", "~10,000", "Cheksiz"],
      correctAnswer: 2,
      explanation: "Chrome ~10,000 chaqiruv atrofida — juda chuqur rekursiyada iteratsiya afzal."
    },
    {
      question: "flatten([1,[2,[3]]]) ning natijasi nima?",
      options: ["[1,[2,[3]]]", "[[1],2,3]", "[1,2,3]", "6"],
      correctAnswer: 2,
      explanation: "Flatten — ichma-ich massivlarni bir darajaga tekislaydi: [1, 2, 3]."
    }
  ]
};
