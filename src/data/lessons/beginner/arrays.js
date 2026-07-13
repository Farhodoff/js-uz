export const arrays = {
  id: "arrays",
  title: "Massivlar (Arrays) va Ularning Metodlari",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy

Massiv (Array) - bu bitta nom ostida ko'plab qiymatlarni saqlovchi maxsus ro'yxat. Oddiy o'zgaruvchi faqat bitta qiymatni saqlay olsa, massiv o'zida yuzlab qiymatlarni saqlashi mumkin.

Tasavvur qiling, siz poyezd bekatidasiz:
* **O'zgaruvchi** - bu faqat bitta odam sig'adigan kichik taksi.
* **Massiv** - bu ketma-ket ulangan ko'plab vagonlardan iborat poyezd. Har bir vagonning o'z tartib raqami bor va u **indeks** deb ataladi. Indekslar doim 0 dan boshlanadi.

\\\`\\\`\\\`javascript
const poyezd = ['vagon-0', 'vagon-1', 'vagon-2'];
console.log(poyezd[0]); // "vagon-0"
console.log(poyezd.length); // 3
\\\`\\\`\\\`

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

C yoki Java kabi tillarda massivlar qat'iy o'lchamga ega va xotirada faqat bir xil turdagi ma'lumotlarni saqlaydi. Lekin JavaScript'da massivlar **Obyektlar** hisoblanadi. Ularning kalitlari (keys) raqamlardan iborat.

### V8 Engine qanday ishlaydi?
JavaScript dvigateli (masalan, V8) massivlarni optimallashtirish uchun ikki usuldan foydalanadi:
1. **Fast Elements (Zich massivlar):** Agar massivda bo'shliqlar bo'lmasa va ma'lumot turlari o'xshash bo'lsa, V8 uni xotirada ketma-ket (contiguous) saqlaydi. Bu o'qish va yozishni juda tezlashtiradi.
2. **Dictionary Elements (Siyrak massivlar):** Agar massiv elementlari orasida katta bo'shliqlar bo'lsa (masalan \\\`arr[1000] = 5\\\`), V8 uni Hash Map (lug'at) ga aylantiradi. Bu xotirani tejaydi, lekin ishlash tezligi tushib ketadi.

### Vaqt murakkabligi (Time Complexity):
* **\\\`push\\\` / \\\`pop\\\`**: Oxiriga qo'shish yoki olib tashlash juda tez, chunki boshqa elementlar joyi o'zgarmaydi. Bu **O(1)** vaqt oladi.
* **\\\`unshift\\\` / \\\`shift\\\`**: Boshidan qo'shish yoki olish sekin, chunki qolgan BARCHA elementlarning indeksi bittaga siljishi kerak. Bu **O(N)** vaqt oladi.

## Part 3: Edge Cases and Senior Interview Questions

* **Savol:** \\\`arr.length = 0\\\` qilsak nima sodir bo'ladi?
  **Javob:** Bu massivni tozalashning (empty an array) eng tezkor usuli. Massivdagi barcha elementlar o'chadi.
* **Savol:** Massivlarni qanday qilib chuqur nusxalash (Deep Copy) mumkin?
  **Javob:** Sayoz nusxalash uchun \\\`[...arr]\\\` ishlatiladi, lekin ichma-ich massivlar yoki obyektlar bo'lsa, zamonaviy usul \\\`structuredClone(arr)\\\` dan foydalanish kerak.
* **Savol:** \\\`delete arr[1]\\\` qilsak nima bo'ladi?
  **Javob:** Element o'chadi, lekin uning o'rnida bo'shliq (empty slot) qoladi. Massiv uzunligi (\\\`length\\\`) o'zgarmaydi. Elementni to'g'ri o'chirish uchun \\\`arr.splice(1, 1)\\\` ishlatish kerak.

### Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Massiv] --> B[Oxirgi elementlar]
    A --> C[Boshlangich elementlar]
    B --> D[push: O1 tezlik]
    B --> E[pop: O1 tezlik]
    C --> F[unshift: ON tezlik]
    C --> G[shift: ON tezlik]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Massiv oxiriga qo'shish",
      instruction: "Berilgan `arr` massivining oxiriga `element` ni qo'shuvchi `addToEnd(arr, element)` funksiyasini yozing va massivni qaytaring.",
      startingCode: "function addToEnd(arr, element) {\n  // Kodni yozing\n}",
      hint: "push() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return addToEnd;')(); const res = fn([1,2], 3); if(res[2] !== 3) return 'Xato'; return null;"
    },
    {
      id: 2,
      title: "Massiv oxiridan o'chirish",
      instruction: "Berilgan `arr` massivining oxirgi elementini o'chiruvchi va massivni qaytaruvchi `removeLast(arr)` funksiyasini yozing.",
      startingCode: "function removeLast(arr) {\n  // Kodni yozing\n}",
      hint: "pop() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return removeLast;')(); const res = fn([1,2,3]); if(res.length !== 2) return 'Xato'; return null;"
    },
    {
      id: 3,
      title: "Massiv boshiga qo'shish",
      instruction: "Berilgan `arr` massivining boshiga `element` ni qo'shuvchi va massivni qaytaruvchi `addToStart(arr, element)` funksiyasini yozing.",
      startingCode: "function addToStart(arr, element) {\n  // Kodni yozing\n}",
      hint: "unshift() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return addToStart;')(); const res = fn([2,3], 1); if(res[0] !== 1) return 'Xato'; return null;"
    },
    {
      id: 4,
      title: "Massiv boshidan o'chirish",
      instruction: "Berilgan `arr` massivining birinchi elementini o'chiruvchi va massivni qaytaruvchi `removeFirst(arr)` funksiyasini yozing.",
      startingCode: "function removeFirst(arr) {\n  // Kodni yozing\n}",
      hint: "shift() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return removeFirst;')(); const res = fn([1,2,3]); if(res[0] !== 2) return 'Xato'; return null;"
    },
    {
      id: 5,
      title: "Massivdan nusxa olish",
      instruction: "Berilgan `arr` massivining 1-indeksdan boshlab oxirigacha bo'lgan qismini nusxalab qaytaruvchi `copyArray(arr)` funksiyasini yozing.",
      startingCode: "function copyArray(arr) {\n  // Kodni yozing\n}",
      hint: "slice(1) metodidan foydalaning.",
      test: "const fn = new Function(code + '; return copyArray;')(); const res = fn([1,2,3]); if(res[0] !== 2 || res.length !== 2) return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "Massiv elementini almashtirish",
      instruction: "Berilgan `arr` massivining 2-indeksdagi elementini o'chirib, o'rniga `newItem` ni joylovchi `replaceItem(arr, newItem)` funksiyasini yozing.",
      startingCode: "function replaceItem(arr, newItem) {\n  // Kodni yozing\n}",
      hint: "splice(2, 1, newItem) metodidan foydalaning.",
      test: "const fn = new Function(code + '; return replaceItem;')(); const res = fn([1,2,3,4], 99); if(res[2] !== 99) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Element indeksini topish",
      instruction: "Berilgan `arr` massivida `target` elementining indeksini qaytaruvchi `findIndex(arr, target)` funksiyasini yozing.",
      startingCode: "function findIndex(arr, target) {\n  // Kodni yozing\n}",
      hint: "indexOf() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return findIndex;')(); if(fn([1,2,3], 2) !== 1) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Element borligini tekshirish",
      instruction: "Berilgan `arr` massivida `target` elementi mavjud bo'lsa true, aks holda false qaytaruvchi `checkElement(arr, target)` funksiyasini yozing.",
      startingCode: "function checkElement(arr, target) {\n  // Kodni yozing\n}",
      hint: "includes() metodidan foydalaning.",
      test: "const fn = new Function(code + '; return checkElement;')(); if(fn([1,2,3], 2) !== true) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "Ikki massivni birlashtirish",
      instruction: "Berilgan `arr1` va `arr2` massivlarini birlashtirib bitta yangi massiv qaytaruvchi `mergeArrays(arr1, arr2)` funksiyasini yozing.",
      startingCode: "function mergeArrays(arr1, arr2) {\n  // Kodni yozing\n}",
      hint: "concat() yoki spread operator [...] ishlating.",
      test: "const fn = new Function(code + '; return mergeArrays;')(); const res = fn([1], [2]); if(res[1] !== 2 || res.length !== 2) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Massivni satrga aylantirish",
      instruction: "Berilgan `arr` massivini probel bilan ajratilgan satrga (string) aylantiruvchi `joinElements(arr)` funksiyasini yozing.",
      startingCode: "function joinElements(arr) {\n  // Kodni yozing\n}",
      hint: "join(' ') metodidan foydalaning.",
      test: "const fn = new Function(code + '; return joinElements;')(); if(fn([1,2]) !== '1 2') return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da massiv yaratishning eng optimal usuli qaysi?",
      options: [
        "let arr = [];",
        "let arr = new Array();",
        "let arr = {};",
        'let arr = "";'
      ],
      correctAnswer: 0,
      explanation: "Kvadrat qavslar [] orqali massiv yaratish (array literal) eng oson va tavsiya qilingan usuldir."
    },
    {
      id: 2,
      question: "Qaysi metod massiv oxiriga element qo'shadi?",
      options: [
        "unshift()",
        "shift()",
        "push()",
        "pop()"
      ],
      correctAnswer: 2,
      explanation: "push() metodi massivning oxiriga element qo'shadi va yangi uzunlikni qaytaradi."
    },
    {
      id: 3,
      question: "Massiv boshidan elementni o'chiradigan metod qaysi?",
      options: [
        "shift()",
        "unshift()",
        "pop()",
        "splice()"
      ],
      correctAnswer: 0,
      explanation: "shift() metodi massivning birinchi elementini olib tashlaydi."
    },
    {
      id: 4,
      question: "O(N) vaqt murakkabligiga ega bo'lgan amallar qaysilar?",
      options: [
        "push va pop",
        "shift va unshift",
        "length xossasini o'qish",
        "indeks orqali elementni olish (masalan arr[0])"
      ],
      correctAnswer: 1,
      explanation: "shift() va unshift() massiv boshiga ta'sir qilgani uchun barcha elementlar indekslarini siljitadi, shuning uchun ular O(N) vaqt oladi."
    },
    {
      id: 5,
      question: "Asl massivni o'zgartirmasdan nusxa oladigan metodni toping.",
      options: [
        "splice()",
        "slice()",
        "push()",
        "pop()"
      ],
      correctAnswer: 1,
      explanation: "slice() metodi asl massivni o'zgartirmaydi, balki uning ma'lum qismidan yangi nusxa qaytaradi."
    },
    {
      id: 6,
      question: "arr.length = 0 kodining natijasi nima?",
      options: [
        "Xatolik beradi",
        "Massiv tozalanadi (bo'shaydi)",
        "Massivning faqat birinchi elementi o'chadi",
        "Massiv o'zgarmaydi"
      ],
      correctAnswer: 1,
      explanation: "length xossasini 0 ga tenglashtirish massivni butunlay tozalaydi."
    },
    {
      id: 7,
      question: "Massivda ma'lum bir element bor-yo'qligini qanday bilish mumkin?",
      options: [
        "includes()",
        "concat()",
        "join()",
        "slice()"
      ],
      correctAnswer: 0,
      explanation: "includes() metodi qidirilayotgan element bor bo'lsa true, yo'q bo'lsa false qaytaradi."
    },
    {
      id: 8,
      question: "Ikkita massivni === yordamida solishtirsak nima bo'ladi?",
      options: [
        "Agar elementlari bir xil bo'lsa true chiqadi",
        "Har doim false chiqadi, chunki ular xotirada turli manzillarda joylashgan",
        "Xatolik yuz beradi",
        "Faqat birinchi elementlari solishtiriladi"
      ],
      correctAnswer: 1,
      explanation: "Massivlar reference (havola) tipida bo'lganligi sababli === faqat xotira manzilini tekshiradi."
    },
    {
      id: 9,
      question: "JavaScript'da typeof [] qanday natija qaytaradi?",
      options: [
        '"array"',
        '"object"',
        '"list"',
        '"undefined"'
      ],
      correctAnswer: 1,
      explanation: "Massivlar JavaScript'da Obyektlarning maxsus ko'rinishi hisoblanadi, shuning uchun typeof ularga 'object' qaytaradi."
    },
    {
      id: 10,
      question: "O'zgaruvchi massiv ekanligini aniq tekshirish uchun nima ishlatamiz?",
      options: [
        "typeof arr === 'array'",
        "arr.isArray()",
        "Array.isArray(arr)",
        "arr instanceof Object"
      ],
      correctAnswer: 2,
      explanation: "Array.isArray(arr) eng ishonchli va to'g'ri usul hisoblanadi."
    },
    {
      id: 11,
      question: "delete arr[1] va arr.splice(1, 1) farqi nimada?",
      options: [
        "Farqi yo'q",
        "delete elementi o'chirmaydi",
        "delete bo'shliq (empty slot) qoldiradi, splice esa haqiqatda o'chiradi",
        "splice faqat oxiridan o'chiradi"
      ],
      correctAnswer: 2,
      explanation: "delete operatori massivdan elementni o'chirsa ham indeks joyini bo'shatib qo'yadi (uzunlik o'zgarmaydi). splice esa to'liq o'chiradi."
    },
    {
      id: 12,
      question: "V8 Dvigateli massivlarni optimallashtirishda nimalardan foydalanadi?",
      options: [
        "Faqat JSON formatidan",
        "Fast Elements va Dictionary Elements usullaridan",
        "Doimiy Linked Listlardan",
        "Faqat Obyektlardan"
      ],
      correctAnswer: 1,
      explanation: "V8 massivlarni ularning turi va o'lchamiga qarab Fast Elements (zich) yoki Dictionary Elements (siyrak) sifatida xotirada optimallashtiradi."
    }
  ]
};
