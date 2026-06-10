export const bigO = {
  id: "bigO",
  title: "Algoritmlar Murakkabligi (Big O)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Big O va Algoritmlar Murakkabligi nima?
* **Big O Notatsiyasi:** Bu algoritmning kirish ma'lumotlari hajmi (masalan, massiv uzunligi yoki matn o'lchami) o'sishi bilan uning bajarilish vaqti (Time Complexity) yoki talab etadigan qo'shimcha xotira hajmi (Space Complexity) qanchalik o'sishini ko'rsatadigan matematik o'lchovdir.
* **Maqsad:** Kodimiz millisekundlarda qancha tez ishlashini emas (chunki u kompyuterning protsessoriga bog'liq), balki operatsiyalar soni ma'lumotlar ko'payganda qanday tezlikda o'sib borishini o'rganishdir.

### Real hayotiy analogiya
Tasavvur qiling, siz **do'stingizga katta hajmdagi ma'lumot faylini (masalan, 1 TB video)** yetkazishingiz kerak:
* **1-usul (Internet orqali jo'natish):** Agar siz faylni Telegram yoki bulutli saqlagich orqali jo'natsangiz, uzatish vaqti fayl hajmiga to'g'ri proporsional ravishda oshadi. 1 GB tez uzatiladi, 1 TB esa ancha uzoq kutishni talab qiladi. Bu **O(n)** (Chiziqli murakkablik).
* **2-usul (Samolyot yoki mashinada olib borish):** Siz faylni qattiq diskka (HDD/SSD) yozasiz-da, mashinaga o'tirib o'zingiz yetkazib berasiz. Bu holda fayl o'lchami 1 GB bo'ladimi yoki 10 TB bo'ladimi, borish vaqti bir xil bo'lib qolaveradi. Bu **O(1)** (Doimiy murakkablik).

---

## 2. 💻 Real Kod Misollari

### 1. Constant Time - O(1) (Doimiy vaqt)
Ma'lumot hajmi qancha bo'lishidan qat'i nazar, faqat bitta operatsiya bajariladi:
\`\`\`javascript
function getElementAtIndex(arr, index) {
  return arr[index]; // O(1) - indeks bo'yicha olish darhol bajariladi
}
\`\`\`

### 2. Linear Time - O(n) (Chiziqli vaqt)
Operatsiyalar soni kirish ma'lumotlari soni \`n\` ga to'g'ridan-to'g'ri bog'liq:
\`\`\`javascript
function printAllElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // O(n) - massivda n ta element bo'lsa, n marta ishlaydi
  }
}
\`\`\`

### 3. Quadratic Time - O(n^2) (Kvadratik vaqt)
Ko'pincha ichma-ich joylashgan looplar sababli yuzaga keladi. Elementlar soni ko'paysa, vaqt keskin (kvadrat shaklida) oshadi:
\`\`\`javascript
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]); // O(n^2) - har bir element boshqa har bir element bilan juftlanadi
    }
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Big O ni hisoblash qoidalari
Dastur kodining Big O murakkabligini aniqlash uchun quyidagi 3 ta asosiy qoidaga amal qilinadi:

1. **Eng yomon holatga e'tibor qaratish (Worst Case):**
   Agar massivdan element qidirayotgan bo'lsak, u eng birinchi indeksda ham bo'lishi mumkin (Best Case - O(1)) yoki umuman yo'q bo'lishi mumkin (Worst Case - O(n)). Biz doimo eng yomon holatni - O(n) ni hisobga olamiz.
   
2. **O'zgarmaslarni (Constants) olib tashlash:**
   Agar algoritm \`2n\` ta operatsiya bajarsa, u \`O(2n)\` deb emas, balki \`O(n)\` deb yoziladi. Chunki \`n\` cheksizlikka intilganda \`2\` koeffitsiyenti ahamiyatini yo'qotadi.
   
3. **Kichik hadlarni olib tashlash (Drop Non-Dominant Terms):**
   Agar algoritm \`n^2 + n + 5\` ta operatsiya bajarsa, uning murakkabligi \`O(n^2)\` deb olinadi. Chunki \`n\` juda katta bo'lganda (masalan, 1,000,000), \`n^2\` (1 trillion) oldida \`n\` (1 million) va \`5\` juda kichik bo'lib qoladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Loop ichida og'ir metodlarni ishlatish (yashirin O(n^2))
Sikl ichida \`indexOf\`, \`includes\`, \`shift\` yoki \`slice\` kabi chiziqli murakkablikdagi metodlarni ishlatish kodni bilmasdan sekinlashtiradi.
* **Xato (O(n^2)):**
  \`\`\`javascript
  const arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < arr.length; i++) {
    if (arr.includes(3)) { // includes ham orqa fonda massivni aylanib chiqadi (O(n))
      console.log("Topildi");
    }
  }
  \`\`\`
* **Tuzatish (O(n) yoki O(1) lookup):**
  Qidiruv uchun \`Set\` yoki \`Map\`dan foydalanish lookup operatsiyasini O(1) ga tushiradi:
  \`\`\`javascript
  const mySet = new Set(arr);
  for (let i = 0; i < arr.length; i++) {
    if (mySet.has(3)) { // Set.has() O(1) murakkablikda ishlaydi
      console.log("Topildi");
    }
  }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Big O nima?**
   * *Javob:* Algoritmning kirish o'lchami kattalashganda vaqt va xotira sarfining o'sish sur'atini ko'rsatuvchi matematik notatsiya.
2. **O(1) va O(n) farqi nimada?**
   * *Javob:* O(1) doimiy vaqt oladi, O(n) esa ma'lumotlar soniga mutanosib ravishda o'sib boradi.
3. **Sikl ichidagi boshqa sikl qanday murakkablik yaratadi?**
   * *Javob:* Agar ikkala sikl ham kirish o'lchami \`n\` ga bog'liq bo'lsa, u O(n^2) kvadratik murakkablikni yaratadi.
4. **JavaScript massivining \`.push()\` metodi qanday vaqt oladi?**
   * *Javob:* O(1) amortizatsiyalangan vaqt oladi, chunki u massiv oxiriga element qo'shadi.

### Middle
5. **Logarifmik murakkablik (O(log n)) deganda nimani tushunasiz?**
   * *Javob:* Har bir bosqichda kirish ma'lumotlarining hajmi yarmiga qisqarib boradigan algoritmlar (masalan, Binary Search).
6. **Space Complexity (Xotira murakkabligi) nima?**
   * *Javob:* Algoritm o'z ishini bajarishi uchun talab etadigan qo'shimcha xotira miqdori (kirish ma'lumotlaridan tashqari).
7. **Nima uchun Big O da konstantalar (masalan, O(2n)) yozilmaydi?**
   * *Javob:* Chunki Big O ning maqsadi aniq millisekundlarni o'lchash emas, balki \`n\` cheksiz o'sganda tendensiyani (o'sish tezligini) ifodalashdir.
8. **Massiv boshiga element qo'shish (\`.unshift()\`) nega O(n) vaqt oladi?**
   * *Javob:* Massivning barcha mavjud elementlarini bitta indeks o'ngga surib chiqish kerak bo'lgani uchun.

### Senior
9. **Amortizatsiyalangan murakkablik (Amortized Time Complexity) nima?**
   * *Javob:* Ko'p marta bajariladigan operatsiyalarning o'rtacha murakkabligi. Masalan, massiv to'lib qolganda xotirani kengaytirish O(n) vaqt olsa-da, oddiy vaqtlarda \`.push()\` O(1) oladi. O'rtacha hisoblaganda bu O(1) ga teng.
10. **Rekursiv chaqiriqlarning Space Complexity-ga ta'siri qanday?**
    * *Javob:* Har bir rekursiv chaqiriq Call Stack-ga yangi freym qo'shadi. Shuning uchun rekursiya chuqurligi \`d\` bo'lsa, u O(d) qo'shimcha xotira talab qiladi.
11. **\`new Set()\` yordamida massivdagi dublikatlarni tozalashning murakkabligi qanday?**
    * *Javob:* Vaqt bo'yicha O(n), chunki har bir element Set-ga qo'shib chiqiladi. Xotira bo'yicha ham O(n), chunki yangi Set yaratiladi.
12. **\`O(n log n)\` algoritmlar \`O(n^2)\` dan har doim tezroqmi?**
    * *Javob:* Matematik jihatdan \`n\` kattalashganda \`n log n\` doimo \`n^2\` dan kichik bo'ladi. Lekin \`n\` juda kichik bo'lganda (masalan, n < 10) konstantalar ta'sirida ba'zan O(n^2) tezroq ishlashi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu dars uchun mo'ljallangan amaliy topshiriqlarni \`bigO_exercises.json\` faylidan topishingiz mumkin. U yerda siz O(1), O(n) va O(log n) murakkablikdagi algoritmlarni amaliy yozasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'zlashtirgan bilimlaringizni tekshirish uchun 12 ta test savollari tayyorlangan. Savollar va variantlar \`bigO_quizzes.json\` faylida keltirilgan.

---

## 8. 🎯 Real Project Case Study

### Katta hajmli foydalanuvchilar bazasida qidiruv tizimini optimallashtirish
Kompaniyamiz bazasida 1,000,000 ta saralangan foydalanuvchi ma'lumotlari bor. Foydalanuvchilar ID bo'yicha saralangan.
* **Muammo:** Chiziqli qidiruv (\`Array.prototype.find\`) eng yomon holatda 1,000,000 ta operatsiya bajaradi. Bu esa sahifani sekinlashtiradi va serverga ortiqcha yuklama beradi.
* **Yechim:** Binary Search (Ikkilik qidiruv) algoritmini qo'llash.
* **Natija:** Operatsiyalar soni max 20 tagacha kamayadi ($log_2(1,000,000) \\approx 20$).

\`\`\`javascript
// Binary Search orqali optimallashtirilgan qidiruv
function searchUserById(users, targetId) {
  let left = 0;
  let right = users.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (users[mid].id === targetId) {
      return users[mid]; // Topildi
    } else if (users[mid].id < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null; // Topilmadi
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **O(1) va O(log n) sari intiling:** Qidiruv va lookup amallarida massivlardan ko'ra Hash Table (Set/Map) ma'lumotlar tuzilmasini tanlang.
* **Ichma-ich looplardan qoching:** Kodda \`for\` ichida boshqa \`for\` ishlatayotganda massiv o'lchamlarini hisobga oling. Agar \`n\` katta bo'lsa, bu algoritm ishdan chiqishiga olib kelishi mumkin.

---

## 10. 📌 Cheat Sheet

| Murakkablik | Nomi | Izoh / Misol | O'sish tezligi |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant (Doimiy) | Massiv elementini indeks orqali olish | Juda zo'r |
| **O(log n)** | Logarithmic (Logarifmik) | Binary Search | Juda yaxshi |
| **O(n)** | Linear (Chiziqli) | Oddiy \`for\` loop, \`.find()\`, \`.indexOf()\` | Yaxshi |
| **O(n log n)** | Linearithmic | Merge Sort, Quick Sort | Qoniqarli |
| **O(n^2)** | Quadratic (Kvadratik) | Ichma-ich \`for\` looplar | Yomon |
| **O(2^n)** | Exponential (Eksponentsial) | Rekursiv Fibonachchi ketma-ketligi | Juda yomon |
`,
  exercises: [
  {
    "id": 1,
    "title": "Doimiy Vaqt Murakkabligi (O(1))",
    "instruction": "Berilgan massivning birinchi elementini qaytaradigan `getFirstElement(arr)` funksiyasini yozing. Ushbu operatsiya massiv o'lchamidan qat'i nazar bir xil vaqtda bajarilishi (O(1)) kerak.",
    "startingCode": "function getFirstElement(arr) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Massivning 0-indeksidagi elementiga murojaat qiling va uni qaytaring.",
    "test": "const sandbox = new Function(code + '; return getFirstElement;');\nconst fn = sandbox();\nif (fn([10, 20, 30]) === 10 && fn(['a', 'b']) === 'a') return null;\nreturn 'getFirstElement to\\'g\\'ri birinchi elementni qaytarmadi';"
  },
  {
    "id": 2,
    "title": "Chiziqli Vaqt Murakkabligi (O(n))",
    "instruction": "Massivda dublikat (takrorlangan) elementlar bor yoki yo'qligini aniqlovchi `hasDuplicates(arr)` funksiyasini yozing. Kod O(n) vaqt murakkabligida ishlashi uchun `Set` ma'lumotlar tuzilmasidan foydalaning (ikkita ichma-ich loop yozmang). Agar dublikat bo'lsa `true`, bo'lmasa `false` qaytaring.",
    "startingCode": "function hasDuplicates(arr) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Set obyektining `.size` xossasi bilan massivning `.length` xossasini solishtiring.",
    "test": "if (code.includes('for') && (code.match(/for/g) || []).length > 1) return 'Nested looplardan foydalanmang (O(n^2) bo\\'lmasligi kerak)';\nconst sandbox = new Function(code + '; return hasDuplicates;');\nconst fn = sandbox();\nif (fn([1, 2, 3, 4]) === false && fn([1, 2, 2, 4]) === true) return null;\nreturn 'hasDuplicates xato natija qaytardi';"
  },
  {
    "id": 3,
    "title": "Logarifmik Murakkablik (O(log n))",
    "instruction": "Saralangan massiv `arr` va qidirilayotgan son `target` berilgan. Binary Search (Ikkilik qidiruv) algoritmidan foydalanib, `target` massivda mavjud bo'lsa uning indeksini, aks holda `-1` qaytaradigan `binarySearch(arr, target)` funksiyasini yozing.",
    "startingCode": "function binarySearch(arr, target) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "left va right ko'rsatkichlarni belgilang, o'rtadagi elementni (mid) topib, target bilan solishtiring va doim qidiruv hududini yarmiga qisqartiring.",
    "test": "if (code.includes('indexOf') || code.includes('includes') || code.includes('find')) return 'Tayyor metodlardan foydalanmang';\nconst sandbox = new Function(code + '; return binarySearch;');\nconst fn = sandbox();\nconst arr = [1, 3, 5, 7, 9, 11];\nif (fn(arr, 5) === 2 && fn(arr, 1) === 0 && fn(arr, 10) === -1) return null;\nreturn 'binarySearch algoritmi to\\'g\\'ri ishlamadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Big O notatsiyasi (belgilanishi) nima uchun ishlatiladi?",
    "options": [
      "Koddagi sintaktik xatolarni avtomatik tuzatish uchun",
      "Algoritmning kirish ma'lumotlari hajmi o'sishi bilan vaqt va xotira sarfi qanday o'zgarishini (o'sish sur'atini) ifodalash uchun",
      "Dastur interfeysining chiroyli ko'rinishini ta'minlash uchun",
      "Ma'lumotlar bazasidagi so'rovlarni tezlashtirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Big O notatsiyasi algoritmning samaradorligini kirish o'lchami (n) kattalashganda uning vaqt yoki xotira sarfi qanchalik o'sishini matematik modellashtirish uchun ishlatiladi."
  },
  {
    "id": 2,
    "question": "Quyidagi algoritmlardan qaysi biri doimiy vaqt murakkabligiga (O(1)) ega?",
    "options": [
      "Massivning o'rtasidagi elementni indeks orqali olish",
      "Massivning barcha elementlarini konsolga chiqarish",
      "Massiv ichidan ma'lum bir elementni qidirish",
      "Massiv elementlarini o'sish tartibida saralash"
    ],
    "correctAnswer": 0,
    "explanation": "Massiv elementiga indeks bo'yicha murojaat qilish massiv hajmidan qat'i nazar darhol bajariladi, shuning uchun bu O(1) murakkablikka ega."
  },
  {
    "id": 3,
    "question": "Quyidagi kodning vaqt murakkabligi qanday?\n```javascript\nfor (let i = 0; i < n; i++) {\n  console.log(i);\n}\n```",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Sikl n marta aylanadi va har bir iteratsiyada O(1) operatsiya bajariladi. Jami operatsiyalar soni n ga to'g'ri proporsional, shuning uchun O(n)."
  },
  {
    "id": 4,
    "question": "Quyidagi kodning umumiy vaqt murakkabligi nima bo'ladi?\n```javascript\nfor (let i = 0; i < n; i++) {\n  // O(1) kod\n}\nfor (let j = 0; j < n; j++) {\n  // O(1) kod\n}\n```",
    "options": [
      "O(n^2)",
      "O(2n) yoki soddalashtirilganda O(n)",
      "O(log n)",
      "O(1)"
    ],
    "correctAnswer": 1,
    "explanation": "Ikkita yonma-yon sikl n + n = 2n marta bajariladi. Big O qoidasiga ko'ra konstantalar tashlab yuboriladi, shuning uchun murakkablik O(n) bo'ladi."
  },
  {
    "id": 5,
    "question": "Ichma-ich joylashgan ikkita sikl (har biri n gacha aylanadi) qanday vaqt murakkabligini hosil qiladi?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(2n)",
      "O(n^2)"
    ],
    "correctAnswer": 3,
    "explanation": "Tashqi sikl n marta aylanganda ichki sikl ham har safar n marta aylanadi. Jami bajarilishlar soni n * n = n^2 bo'ladi, ya'ni kvadratik murakkablik (O(n^2))."
  },
  {
    "id": 6,
    "question": "Binary Search (Ikkilik qidiruv) algoritmining vaqt murakkabligi qanday?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "correctAnswer": 1,
    "explanation": "Binary Search har safar qidiruv maydonini yarmiga qisqartirib boradi, bu esa logarifmik o'sishga mos keladi, ya'ni O(log n)."
  },
  {
    "id": 7,
    "question": "Eng samarali saralash algoritmlarining (masalan, Merge Sort, Quick Sort o'rtacha holatda) vaqt murakkabligi nima?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "explanation": "Bo'l va hukmronlik qil (Divide and conquer) usuliga asoslangan Merge Sort kabi saralash algoritmlari O(n log n) vaqt murakkabligida ishlaydi."
  },
  {
    "id": 8,
    "question": "Rekursiv Fibonachchi ketma-ketligini hisoblash algoritmi (optimallashtirilmagan) qanday vaqt murakkabligiga ega?",
    "options": [
      "O(log n)",
      "O(n)",
      "O(n^2)",
      "O(2^n)"
    ],
    "correctAnswer": 3,
    "explanation": "Har bir rekursiv chaqiriq o'zidan keyin yana ikkita rekursiv chaqiriqni amalga oshiradi, bu esa operatsiyalar daraxtini hosil qiladi va eksponentsial o'sishga (O(2^n)) olib keladi."
  },
  {
    "id": 9,
    "question": "Xotira murakkabligi (Space Complexity) nima?",
    "options": [
      "Dastur faylining diskdagi hajmi",
      "Algoritm ishlashi davomida kirish ma'lumotlaridan tashqari qo'shimcha ravishda foydalanadigan tezkor xotira (RAM) miqdori",
      "Ma'lumotlar bazasining diskdagi hajmi",
      "Koddagi qatorlar soni"
    ],
    "correctAnswer": 1,
    "explanation": "Space Complexity algoritm o'z vazifasini bajarishi uchun qancha qo'shimcha xotira (xotirada yaratilgan yangi massivlar, o'zgaruvchilar, chaqiriqlar steki) talab qilishini o'lchaydi."
  },
  {
    "id": 10,
    "question": "Quyidagi operatsiyalardan qaysi biri O(n) xotira murakkabligiga (Space Complexity) ega?",
    "options": [
      "Massiv elementlarini bitta o'zgaruvchi yordamida yig'ish",
      "O'lchami n bo'lgan massivning barcha elementlaridan nusxa olib, yangi massiv yaratish",
      "Ikki sonni bir-biriga ko'paytirish",
      "Massivni o'z joyida (in-place) saralash"
    ],
    "correctAnswer": 1,
    "explanation": "O'lchami n bo'lgan yangi massiv yaratilganda xotiradan n ta element joy egallaydi, bu esa chiziqli xotira murakkabligi O(n) hisoblanadi."
  },
  {
    "id": 11,
    "question": "Nima uchun Big O da asosan eng yomon holat (Worst Case) tahlil qilinadi?",
    "options": [
      "Chunki dasturchilar doim xatolarga tayyor turishi kerak",
      "Algoritm har qanday holatda ham kafolatlangan maksimal chegaradan (vaqtdan) ko'p vaqt olmasligini bilish uchun",
      "Eng yomon holatni kodlash osonroq bo'lgani uchun",
      "Worst Case faqat mobil dasturlar uchun muhim bo'lgani uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Eng yomon holat tahlili algoritm har qanday eng qiyin kirish ma'lumotida ham ma'lum bir vaqtdan oshib ketmasligiga kafolat beradi."
  },
  {
    "id": 12,
    "question": "Algoritm bajaradigan operatsiyalar soni f(n) = 5n^2 + 100n + 500 bo'lsa, uning Big O dagi soddalashtirilgan ko'rinishi qanday bo'ladi?",
    "options": [
      "O(500)",
      "O(100n)",
      "O(n^2)",
      "O(n^2 + n)"
    ],
    "correctAnswer": 2,
    "explanation": "Big O tahlilida faqat eng tez o'suvchi had (n^2) qoldiriladi va uning oldidagi o'zgarmas koeffitsiyentlar (5) hamda boshqa sekin o'suvchi hadlar (100n, 500) tashlab yuboriladi. Natija: O(n^2)."
  }
]

};
