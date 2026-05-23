export const bigO = {
  id: "bigO",
  title: "Big O va Algoritmlar Murakkabligi",
  theory: `## 1. NEGA kerak?
Dasturlashda muammoni hal qilishning yuzlab usullari bor. Lekin qaysi usul eng yaxshisi? Qaysi kod tezroq ishlaydi? Qaysi kod xotirani kamroq sarflaydi? Bu savollarga javob berish uchun bizga **Big O Notation** (Big O belgisi) kerak. Big O algoritmlar tezligini soniyalarda emas, balki kiritilgan ma'lumotlar hajmi ($n$) ortishi bilan bajariladigan amallar sonining o'sish tezligi bo'yicha o'lchaydi. Bu orqali biz yozgan kodimiz serverda yuklama ortganda yoki katta ma'lumotlar bilan ishlaganda o'zini qanday tutishini oldindan bashorat qila olamiz.

## 2. SODDALIK (Analogiya)
Siz do'stingizga katta faylni (masalan, 1 TB video) yubormoqchisiz. Buning ikki yo'li bor:
1. **Internet orqali yuborish:** Fayl hajmi ortgani sari uzatish vaqti ham to'g'ri proporsional ravishda ortadi. Bu — **$O(n)$** (chiziqli vaqt).
2. **Samolyot yoki mashinada olib borib berish:** Fayl hajmi 1 GB bo'ladimi yoki 10 TB bo'ladimi, olib borish vaqti deyarli o'zgarmaydi. Bu — **$O(1)$** (o'zgarmas vaqt).
Katta hajmdagi ma'lumotlar uchun $O(1)$ har doim $O(n)$ dan afzaldir.

## 3. STRUKTURA
Eng ko'p uchraydigan vaqt murakkabligi sinflari (yaxshisidan yomoniga qarab):
1. **$O(1)$ — Constant Time (O'zgarmas):** Ma'lumot hajmidan qat'i nazar, amallar soni o'zgarmaydi. (Masalan, massivdan indeks bo'yicha element olish).
2. **$O(\\log n)$ — Logarithmic Time (Logarifmik):** Har bir qadamda muammo hajmi ikki barobarga kamayadi. (Masalan, Ikkilik qidiruv - Binary Search).
3. **$O(n)$ — Linear Time (Chiziqli):** Amallar soni ma'lumot hajmi bilan to'g'ridan-to'g'ri o'sadi. (Masalan, massiv bo'ylab oddiy qidiruv).
4. **$O(n \\log n)$ — Linearithmic Time:** Saralash algoritmlarining eng yaxshi o'rtacha tezligi. (Masalan, Merge Sort, Quick Sort).
5. **$O(n^2)$ — Quadratic Time (Kvadratik):** O'zaro ichma-ich joylashgan sikllar (loops). (Masalan, Bubble Sort).
6. **$O(2^n)$ — Exponential Time (Eksponential):** Muammo o'sishi bilan amallar soni keskin (ikki barobar) ortadi. (Masalan, rekursiv Fibonacci).
7. **$O(n!)$ — Factorial Time (Faktorial):** Eng yomon murakkablik. (Masalan, sayohatchi sotuvchi muammosi).

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Konstantalarni hisobga olish:** Big O faqat o'sish tendensiyasini o'lchaydi. $O(2n + 5)$ murakkablikdagi algoritmdan konstantalarni olib tashlab, shunchaki $O(n)$ deb yoziladi.
2. **Eng yomon holatni (Worst-case) unutish:** Har doim Big O eng yomon stsenariy bo'yicha o'lchanadi. Agar qidirayotgan elementimiz massiv boshida turgan bo'lsa, bu $O(1)$ degani emas. Chunki element massiv oxirida bo'lishi ham mumkin ($O(n)$).
3. **Space Complexity (Xotira murakkabligi)ni e'tiborsiz qoldirish:** Algoritm tez ishlashi uchun qo'shimcha massiv yoki xarita (Map) yaratsa, uning xotira murakkabligi $O(n)$ bo'ladi. Xotirani tejash ham tezlik kabi muhim.

## 6. SAVOLLAR VA JAVOBLAR
**1. Big O nima?**
Algoritmning kiritilgan ma'lumotlar hajmi ($n$) o'sishi bilan vaqt yoki xotira sarfining o'sish tendensiyasini baholovchi matematik belgi.

**2. Nima uchun tezlikni soniyalar bilan o'lchamaymiz?**
Chunki soniyalar kompyuterning protsessori, operativ xotirasi yoki boshqa dasturlar fonida ishlashiga qarab o'zgaradi. Big O esa universaldir.

**3. $O(1)$ nimani anglatadi?**
Kiritilgan ma'lumotlar hajmi qanchalik katta bo'lishidan qat'i nazar, algoritm doim bir xil miqdordagi qadamda bajarilishini anglatadi.

**4. Ikkilik qidiruv (Binary Search) murakkabligi qanday?**
$O(\\log n)$, chunki har bir solishtirishdan keyin qidiruv doirasi 2 barobar qisqarib boradi.

**5. Ichma-ich kelgan ikkita sikl (nested loops) murakkabligi qanday?**
Agar ikkala sikl ham $n$ gacha aylansa, ularning murakkabligi $O(n \times n) = O(n^2)$ bo'ladi.

**6. $O(n + m)$ nima degani?**
Bu algoritm ikkita turli o'lchamdagi ($n$ va $m$) kirish ma'lumotlariga bog'liqligini va ular birin-ketin bajarilishini anglatadi.

**7. Quick Sort-ning eng yomon holatdagi murakkabligi qanday?**
Eng yomon holatda $O(n^2)$, lekin o'rtacha holatda $O(n \\log n)$ ga teng.

**8. Xotira murakkabligi (Space Complexity) nima?**
Algoritm o'z ishi davomida qo'shimcha ravishda qancha xotira (o'zgaruvchilar, massivlar, obyektlar) talab qilishini o'lchash.

**9. Rekursiv funksiyalarning xotira murakkabligi nima uchun yuqori bo'ladi?**
Chunki har bir rekursiv chaqiriq Call Stack-da joy egallaydi. Agar rekursiya chuqurligi $n$ bo'lsa, xotira murakkabligi $O(n)$ bo'ladi.

**10. $O(2^n)$ murakkablikka ega algoritmga misol keltiring.**
Hech qanday optimallashtirishsiz yozilgan oddiy rekursiv Fibonacci sonini topish algoritmi.

**11. Nega konstantalar tashlab yuboriladi?**
Chunki $n$ juda katta bo'lganda (masalan, 1 milliard), konstantalarning ta'siri (masalan, $2n$ dagi 2 soni) ahamiyatsiz bo'lib qoladi.

**12. Kod optimalligini qanday aniqlash mumkin?**
Muammoni hal qilishda ham vaqt, ham xotira nuqtai nazaridan eng kam Big O murakkablikka ega bo'lgan yo'lni tanlash orqali.
`,
  exercises: [
    {
      id: 1,
      title: "Constant Time - O(1)",
      instruction: "Berilgan massivning birinchi elementini qaytaradigan `getFirstElement(arr)` funksiyasini O(1) vaqt murakkabligida yozing.",
      startingCode: "function getFirstElement(arr) {\n  // Kodni yozing\n}",
      hint: "return arr[0];",
      test: "if (typeof getFirstElement !== 'function') return 'getFirstElement funksiyasi topilmadi'; if (getFirstElement([10, 20, 30]) !== 10) return 'Birinchi elementni qaytarishda xatolik'; return null;"
    },
    {
      id: 2,
      title: "Linear Time - O(n)",
      instruction: "Massivdagi barcha sonlarning yig'indisini hisoblaydigan `sumArray(arr)` funksiyasini O(n) vaqt murakkabligida yozing.",
      startingCode: "function sumArray(arr) {\n  // Kodni yozing\n}",
      hint: "return arr.reduce((sum, num) => sum + num, 0);",
      test: "if (typeof sumArray !== 'function') return 'sumArray funksiyasi topilmadi'; if (sumArray([1, 2, 3, 4]) !== 10) return 'Yig\\'indi noto\\'g\\'ri hisoblandi'; return null;"
    },
    {
      id: 3,
      title: "Quadratic Time - O(n^2)",
      instruction: "Massivda bir xil elementlar borligini ichma-ich sikl orqali tekshiradigan `hasDuplicates(arr)` funksiyasini O(n^2) murakkabligida yozing.",
      startingCode: "function hasDuplicates(arr) {\n  // nested for loops ishlating\n}",
      hint: "for(let i=0; i<arr.length; i++) { for(let j=i+1; j<arr.length; j++) { if(arr[i] === arr[j]) return true; } } return false;",
      test: "if (typeof hasDuplicates !== 'function') return 'hasDuplicates funksiyasi topilmadi'; if (hasDuplicates([1, 2, 3]) !== false) return 'Takrorlanmagan massiv uchun xato'; if (hasDuplicates([1, 2, 1]) !== true) return 'Takrorlangan massiv uchun xato'; return null;"
    },
    {
      id: 4,
      title: "Logarithmic Time - O(log n)",
      instruction: "Saralangan massivdan `target` qiymatining indeksini topuvchi `binarySearchIndex(arr, target)` funksiyasini O(log n) murakkablikda yozing. Topilmasa -1 qaytaring.",
      startingCode: "function binarySearchIndex(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    // Shartlarni yozing\n  }\n  return -1;\n}",
      hint: "if (arr[mid] === target) return mid; else if (arr[mid] < target) left = mid + 1; else right = mid - 1;",
      test: "if (typeof binarySearchIndex !== 'function') return 'binarySearchIndex funksiyasi topilmadi'; if (binarySearchIndex([2, 4, 6, 8, 10], 8) !== 3) return 'Element topilmadi yoki indeks xato'; if (binarySearchIndex([2, 4, 6, 8, 10], 5) !== -1) return 'Mavjud bo\\'lmagan element uchun -1 qaytarilishi kerak'; return null;"
    },
    {
      id: 5,
      title: "Space Complexity - O(1) in-place",
      instruction: "Massivni qo'shimcha xotira ishlatmasdan (in-place) teskarilaydigan `reverseArrayInPlace(arr)` funksiyasini O(1) space complexity-da yozing.",
      startingCode: "function reverseArrayInPlace(arr) {\n  // Massivni o'zini o'zgartiring\n}",
      hint: "let left = 0, right = arr.length - 1;\nwhile(left < right) {\n  let temp = arr[left];\n  arr[left] = arr[right];\n  arr[right] = temp;\n  left++; right--;\n}",
      test: "if (typeof reverseArrayInPlace !== 'function') return 'reverseArrayInPlace funksiyasi topilmadi'; const list = [1, 2, 3, 4]; reverseArrayInPlace(list); if (list[0] !== 4 || list[3] !== 1) return 'Massiv to\\'g\\'ri teskarilanmadi'; return null;"
    },
    {
      id: 6,
      title: "Space Complexity - O(n)",
      instruction: "1 dan n gacha bo'lgan sonlar massivini yaratib qaytaradigan `createRange(n)` funksiyasini O(n) xotira murakkabligida yozing.",
      startingCode: "function createRange(n) {\n  // Massiv qaytaring\n}",
      hint: "const result = []; for(let i=1; i<=n; i++) result.push(i); return result;",
      test: "if (typeof createRange !== 'function') return 'createRange funksiyasi topilmadi'; const res = createRange(5); if (res.length !== 5 || res[4] !== 5) return 'Massiv to\\'g\\'ri yaratilmadi'; return null;"
    },
    {
      id: 7,
      title: "Factorial/Linear Recursion",
      instruction: "Berilgan n sonining faktorialini hisoblaydigan rekursiv `factorial(n)` funksiyasini yozing.",
      startingCode: "function factorial(n) {\n  // Base case va rekursiyani yozing\n}",
      hint: "if (n <= 1) return 1; return n * factorial(n - 1);",
      test: "if (typeof factorial !== 'function') return 'factorial funksiyasi topilmadi'; if (factorial(5) !== 120) return 'Faktorial noto\\'g\\'ri hisoblandi'; return null;"
    },
    {
      id: 8,
      title: "Exponential Time - O(2^n)",
      instruction: "n-Fibonacci sonini hisoblaydigan eng sodda rekursiv `fibonacci(n)` funksiyasini yozing (n >= 0).",
      startingCode: "function fibonacci(n) {\n  // Rekursiv formula yozing\n}",
      hint: "if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2);",
      test: "if (typeof fibonacci !== 'function') return 'fibonacci funksiyasi topilmadi'; if (fibonacci(6) !== 8) return 'Fibonacci soni xato hisoblandi'; return null;"
    },
    {
      id: 9,
      title: "Complexity Class - Linear",
      instruction: "Chiziqli qidiruv (Linear Search) algoritmining o'rtacha vaqt murakkabligi Big O sinfini string ko'rinishida `complexityClass` o'zgaruvchisiga saqlang.",
      startingCode: "const complexityClass = ",
      hint: "'O(n)'",
      test: "if (typeof complexityClass === 'undefined') return 'complexityClass aniqlanmagan'; if (complexityClass !== 'O(n)') return 'Murakkablik sinfi xato'; return null;"
    },
    {
      id: 10,
      title: "Complexity Class - BST Search",
      instruction: "Balanslashgan Ikkilik Daraxtdan (Balanced BST) element izlashning vaqt murakkabligini string ko'rinishida `bstSearchComplexity` o'zgaruvchisiga yozing.",
      startingCode: "const bstSearchComplexity = ",
      hint: "'O(log n)'",
      test: "if (typeof bstSearchComplexity === 'undefined') return 'bstSearchComplexity aniqlanmagan'; if (bstSearchComplexity !== 'O(log n)') return 'Murakkablik sinfi xato'; return null;"
    },
    {
      id: 11,
      title: "Complexity Class - Iterative Fibonacci",
      instruction: "Fibonacci sonini sikl yordamida (iterative) hisoblashning vaqt murakkabligini string ko'rinishida `fibIterativeComplexity` o'zgaruvchisiga yozing.",
      startingCode: "const fibIterativeComplexity = ",
      hint: "'O(n)'",
      test: "if (typeof fibIterativeComplexity === 'undefined') return 'fibIterativeComplexity aniqlanmagan'; if (fibIterativeComplexity !== 'O(n)') return 'Murakkablik sinfi xato'; return null;"
    },
    {
      id: 12,
      title: "Complexity Class - Bubble Sort",
      instruction: "Bubble Sort saralash algoritmining eng yomon holatdagi vaqt murakkabligini string ko'rinishida `bubbleSortComplexity` o'zgaruvchisiga yozing.",
      startingCode: "const bubbleSortComplexity = ",
      hint: "'O(n^2)'",
      test: "if (typeof bubbleSortComplexity === 'undefined') return 'bubbleSortComplexity aniqlanmagan'; if (bubbleSortComplexity !== 'O(n^2)') return 'Murakkablik sinfi xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi Big O murakkabligi kiritilgan ma'lumotlar hajmidan qat'i nazar doimiy tezlikda ishlashni anglatadi?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "O(1) murakkabligi o'zgarmas vaqtni (Constant Time) anglatadi, u kiruvchi ma'lumot hajmiga umuman bog'liq emas."
    },
    {
      id: 2,
      question: "Ikkilik qidiruv (Binary Search) algoritmining vaqt murakkabligi qanday?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
      correctAnswer: 2,
      explanation: "Binary Search har qadamda qidiruv maydonini yarmiga qisqartirgani uchun uning murakkabligi logarifmik, ya'ni O(log n) ga teng."
    },
    {
      id: 3,
      question: "O(n log n) murakkablik asosan qaysi turdagi algoritmlarda uchraydi?",
      options: ["Chiziqli qidiruvda", "O'rtacha samarali saralash algoritmlarida (Merge Sort, Quick Sort)", "Ichma-ich sikllarda", "Matrisalarni ko'paytirishda"],
      correctAnswer: 1,
      explanation: "Merge Sort, Quick Sort va Heap Sort kabi eng yaxshi umumiy maqsadli saralash algoritmlarining o'rtacha murakkabligi O(n log n) ni tashkil etadi."
    },
    {
      id: 4,
      question: "Quyidagi kodning vaqt murakkabligi qanday?\n```javascript\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    console.log(i, j);\n  }\n}\n```",
      options: ["O(n)", "O(n^2)", "O(2^n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Bu yerda ikkita ichma-ich sikl bo'lib, har biri n marta aylanadi. Shuning uchun amallar soni n * n = n^2 marta bajariladi, bu esa O(n^2) dir."
    },
    {
      id: 5,
      question: "Algoritmning Big O murakkabligi O(3n + 15) bo'lsa, uni soddalashtirilgan holda qanday yozamiz?",
      options: ["O(3n)", "O(n)", "O(3n + 15)", "O(1)"],
      correctAnswer: 1,
      explanation: "Big O da konstantalar (3 soni) va kichik darajali qo'shimchalar (15 soni) tashlab yuboriladi, chunki n cheksiz o'sganda ular tendensiyaga katta ta'sir ko'rsatmaydi. Natija: O(n)."
    },
    {
      id: 6,
      question: "Massivdan uning uzunligini (.length) olishning vaqt murakkabligi qanday?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "JavaScript-da massiv uzunligi ob'ekt xossasi sifatida oldindan saqlanadi va unga murojaat qilish O(1) vaqt oladi."
    },
    {
      id: 7,
      question: "Quyidagi kodning xotira murakkabligi (Space Complexity) qanday?\n```javascript\nfunction doubleArray(arr) {\n  let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr[i] * 2);\n  }\n  return result;\n}\n```",
      options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
      correctAnswer: 1,
      explanation: "Funksiya berilgan massiv uzunligi (n) bilan to'g'ridan-to'g'ri bog'liq bo'lgan yangi 'result' massivini yaratadi, bu esa qo'shimcha O(n) xotira demakdir."
    },
    {
      id: 8,
      question: "Qaysi murakkablik sinfi eng yomon va samarasiz hisoblanadi?",
      options: ["O(n^2)", "O(n log n)", "O(2^n)", "O(log n)"],
      correctAnswer: 2,
      explanation: "O(2^n) (Eksponential) va O(n!) (Faktorial) eng tez o'sadigan va katta hajmdagi ma'lumotlar uchun dasturni butunlay qotirib qo'yadigan darajada samarasiz murakkabliklardir."
    },
    {
      id: 9,
      question: "Linearithmic (O(n log n)) va Quadratic (O(n^2)) solishtirilganda qaysi biri tezroq ishlaydi?",
      options: ["Quadratic tezroq", "Linearithmic tezroq", "Ikkalasi teng", "Kiritilgan ma'lumot turiga bog'liq"],
      correctAnswer: 1,
      explanation: "n ning qiymati o'sib borgan sari O(n log n) murakkablik O(n^2) ga qaraganda ancha kam qadam talab qiladi va tezroq ishlaydi."
    },
    {
      id: 10,
      question: "Xotira murakkabligi O(1) bo'lgan algoritm nima deb ataladi?",
      options: ["Out-of-place", "In-place", "Recursive", "Exponential"],
      correctAnswer: 1,
      explanation: "Qo'shimcha yangi ma'lumotlar tuzilmasini yaratmasdan, mavjud xotiraning o'zida ishlaydigan algoritm 'In-place' algoritm deyiladi va uning space complexity-si O(1) dir."
    },
    {
      id: 11,
      question: "Quyidagi kodning vaqt murakkabligi qanday?\n```javascript\nfor (let i = 0; i < n; i++) {\n  console.log(i);\n}\nfor (let j = 0; j < m; j++) {\n  console.log(j);\n}\n```",
      options: ["O(n * m)", "O(n + m)", "O(n)", "O(m)"],
      correctAnswer: 1,
      explanation: "Sikllar ichma-ich kelmasdan ketma-ket kelganligi sababli, ularning murakkabliklari qo'shiladi: O(n + m)."
    },
    {
      id: 12,
      question: "Call Stack xotira hajmi oshib ketishiga olib keluvchi xatolik nima deb ataladi?",
      options: ["Memory Leak", "Stack Overflow", "Heap Exhaustion", "Syntax Error"],
      correctAnswer: 1,
      explanation: "Cheksiz yoki juda chuqur rekursiya natijasida tizim Call Stack hajmi to'lib ketadi va bu 'Stack Overflow' xatosiga olib keladi."
    }
  ]
};
