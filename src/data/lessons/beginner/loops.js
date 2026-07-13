export const loops = {
  id: "loops",
  title: "Sikllar: for, while, do-while",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

Sikl (Loop) - bu biror vazifani ma'lum bir shart bajarilgunga qadar qayta-qayta takrorlash jarayonidir.

Tasavvur qiling, siz stadiyonda yuguryapsiz:
* **\\\`for\\\` sikli**: Murabbiy sizga aniq 10 marta aylanishni buyurdi. Siz boshidanoq necha marta yugurishingizni bilasiz va sanab borasiz. (Aniq takrorlanishlar soni).
* **\\\`while\\\` sikli**: Murabbiy sizga "Charchab qolmaguningizcha yugur!" dedi. Har bir aylanadan keyin o'zingizni tekshirasiz. Agar charchagan bo'lsangiz, to'xtaysiz. (Shartga asoslangan).
* **\\\`do-while\\\` sikli**: Murabbiy sizga yangi poyabzalda yugurib ko'rishni aytdi. Siz **kamida bir marta** aylanasiz, shundan keyingina poyabzal qulay yoki yo'qligiga qarab davom ettirishni hal qilasiz.

---

## 2. ⚙️ Deep Dive (Under the hood, memory, V8 engine, performance)

JavaScript dvigateli (V8) sikllarni qanday optimallashtiradi?
1. **JIT Compilation (Just-In-Time)**: Agar V8 bir xil sikl iteratsiyalarini qayta-qayta ko'rsa, uni "qaynoq" (hot code) deb hisoblaydi va to'g'ridan-to'g'ri mashina kodiga (machine code) o'tkazadi (Crankshaft yoki TurboFan orqali).
2. **Loop Unrolling (Siklni yoyish)**: Dvigatel kichik va qisqa sikllarni ketma-ket kod qatorlariga aylantirib yuborishi mumkin. Bu siklni boshqarishga ketadigan vaqtni (overhead) tejaydi.
3. **Memory and Call Stack**: Sikllar Sinxron (Synchronous) bajariladi va uzoq vaqt oladigan sikllar asosiy oqimni (Main Thread) bloklaydi (Blocking). Bu esa Event Loop ni to'xtatib qo'yadi. Call Stack da bitta Frame yotadi, ammo Leksik muhit (Lexical Environment) \\\`let\\\` ishlatilganda har bir iteratsiya uchun yangidan yaratiladi.

**Performance (Tezlik):**
An'anaviy \\\`for\\\` sikli har doim eng tezkor hisoblanadi. Chunki array metodlarida (\\\`.forEach\\\`, \\\`.map\\\`) har bir element uchun qo'shimcha callback funksiya (Function Execution Context) chaqirilishi xotira va vaqt talab qiladi.

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases
* **Sikl parametrlarini tushirib qoldirish**: \\\`for (;;)\\\` - bu \\\`while(true)\\\` ga teng bo'lgan cheksiz sikl yaratadi.
* **Sikl ichida \\\`var\\\` ishlashi**: \\\`var\\\` blokka emas (block-scoped), funksiyaga tegishli (function-scoped). Shuning uchun \\\`for (var i = 0; i < 5; i++)\\\` bilan asinxron (masalan \\\`setTimeout\\\`) ishlatsangiz, barcha callbacklar oxirgi o'zgargan qiymatni ko'radi. Buni oldini olish uchun \\\`let\\\` ishlatish zarur.

### Senior Interview Questions
1. **Savol**: \\\`for...in\\\` va \\\`for...of\\\` farqi nimada? Nega massivlar uchun \\\`for...in\\\` tavsiya etilmaydi?
   *Javob*: \\\`for...in\\\` obyektning kalitlarini (keys, property names) va uning prototip zanjiridagi (prototype chain) nomlarni aylanib chiqadi. Bu massivlarda kutilmagan natijalar berishi mumkin. \\\`for...of\\\` esa faqatgina qiymatlarni (values) aylanadi.
2. **Savol**: \\\`break\\\` va \\\`continue\\\` farqi nima? Label (\\\`label:\\\`) bilan qanday ishlaydi?
   *Javob*: \\\`break\\\` butun siklni to'xtatadi. \\\`continue\\\` faqat joriy qadamni (iteration) to'xtatib, keyingisiga o'tadi. \\\`Label\\\` bilan esa ichma-ich (nested) sikllarning aynan qaysi biridan chiqib ketish yoki davom ettirishni ko'rsatish mumkin.
3. **Savol**: Qachon \\\`.forEach\\\` o'rniga \\\`for\\\` siklini tanlash kerak?
   *Javob*: Agar siz siklni erta to'xtatmoqchi bo'lsangiz (\\\`break\\\`) yoki qiymat qaytarmoqchi bo'lsangiz (\\\`return\\\`), \\\`.forEach\\\` ichida buni qilib bo'lmaydi. Bunday hollarda \\\`for\\\` yoki \\\`for...of\\\` ishlatiladi.

---

## 4. 📊 Diagramma: Sikl turlari qachon tanlanadi?

\\\`\\\`\\\`mermaid
graph TD
    A[Sikl kerakmi?] -->|Ha| B{Takrorlanish soni aniqmi?}
    B -->|Ha| C[for siklini ishlating]
    B -->|Yoq| D{Kamida 1 marta ishlashi shartmi?}
    D -->|Ha| E[do-while siklini ishlating]
    D -->|Yoq| F[while siklini ishlating]
    
    C --> G[To'plamni aylanmoqchimisiz?]
    G -->|Object keys| H[for...in]
    G -->|Array values| I[for...of]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "1. 1 dan N gacha yig'indi",
      instruction: "for siklidan foydalanib, 1 dan n gacha bo'lgan barcha butun sonlarning yig'indisini hisoblovchi sumUpTo(n) funksiyasini yozing.",
      startingCode: "function sumUpTo(n) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "let sum = 0 yaratib, for bilan aylanib chiqing.",
      test: "const fn = new Function(code + '; return sumUpTo;')();\nif (fn(5) !== 15) return 'Xato';\nreturn null;"
    },
    {
      id: 2,
      title: "2. Massivdan juft sonlarni ajratish",
      instruction: "while siklidan foydalanib, massivdan faqat juft sonlarni ajratuvchi getEvens(arr) yozing.",
      startingCode: "function getEvens(arr) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "while (i < arr.length) sharti yordamida tekshiring.",
      test: "const fn = new Function(code + '; return getEvens;')();\nif (fn([1, 2, 3, 4]).join(',') !== '2,4') return 'Xato';\nreturn null;"
    },
    {
      id: 3,
      title: "3. Raqamlarni teskari qilish",
      instruction: "do-while siklidan foydalanib, son raqamlarini teskari satr ko'rinishida yig'ib qaytaruvchi reverseNumber(num) yozing.",
      startingCode: "function reverseNumber(num) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "do { ... } while (temp > 0) dan foydalaning.",
      test: "const fn = new Function(code + '; return reverseNumber;')();\nif (fn(123) !== '321') return 'Xato';\nreturn null;"
    },
    {
      id: 4,
      title: "4. Toq Sonlar Yig'indisi",
      instruction: "Massiv qabul qilib, faqat toq elementlari yig'indisini hisoblaydigan sumOdds(arr) yozing (for).",
      startingCode: "function sumOdds(arr) {\n  // Kodni yozing\n}\n",
      hint: "if (arr[i] % 2 !== 0) sum += arr[i].",
      test: "const fn = new Function(code + '; return sumOdds;')();\nif(fn([1,2,3,4,5]) !== 9) return 'Xato';\nreturn null;"
    },
    {
      id: 5,
      title: "5. Factorial Hisoblash",
      instruction: "Berilgan musbat sonning faktorialini hisoblovchi factorial(n) yozing.",
      startingCode: "function factorial(n) {\n  // Kodni yozing\n}\n",
      hint: "result = 1 deb i ni 1 dan n gacha ko'paytiring.",
      test: "const fn = new Function(code + '; return factorial;')();\nif(fn(5) !== 120) return 'Xato';\nreturn null;"
    },
    {
      id: 6,
      title: "6. Eng Kichik Sonni Topish",
      instruction: "Sikl orqali eng kichik sonni topuvchi findMin(arr) yozing.",
      startingCode: "function findMin(arr) {\n  // Kodni yozing\n}\n",
      hint: "let min = arr[0] deb oling va qolganini solishtiring.",
      test: "const fn = new Function(code + '; return findMin;')();\nif(fn([4,1,9]) !== 1) return 'Xato';\nreturn null;"
    },
    {
      id: 7,
      title: "7. Qatorni teskari qilish",
      instruction: "for siklidan foydalanib, berilgan satrni teskari tartibda qaytaruvchi reverseString(str) yozing.",
      startingCode: "function reverseString(str) {\n  // Kodni yozing\n}\n",
      hint: "Siklni str.length - 1 dan boshlab 0 gacha kamaytiring.",
      test: "const fn = new Function(code + '; return reverseString;')();\nif(fn('salom') !== 'molas') return 'Xato';\nreturn null;"
    },
    {
      id: 8,
      title: "8. Elementni qidirish",
      instruction: "Massiv ichida berilgan element bor-yo'qligini tekshiruvchi contains(arr, val) yozing.",
      startingCode: "function contains(arr, val) {\n  // Kodni yozing\n}\n",
      hint: "for bilan aylanib, val topilsa return true qiling.",
      test: "const fn = new Function(code + '; return contains;')();\nif(fn([1,2,3], 2) !== true) return 'Xato';\nreturn null;"
    },
    {
      id: 9,
      title: "9. Karra jadvali",
      instruction: "Berilgan n sonining 1 dan 10 gacha bo'lgan karra jadvalini massiv shaklida qaytaruvchi multiplicationTable(n) yozing.",
      startingCode: "function multiplicationTable(n) {\n  // Kodni yozing\n}\n",
      hint: "for bilan 1 dan 10 gacha aylanib, n * i ni massivga joylang.",
      test: "const fn = new Function(code + '; return multiplicationTable;')();\nif(fn(2).join(',') !== '2,4,6,8,10,12,14,16,18,20') return 'Xato';\nreturn null;"
    },
    {
      id: 10,
      title: "10. Takrorlanuvchi elementlarni sanash",
      instruction: "Massivda berilgan element necha marta qatnashganini hisoblovchi countOccurrences(arr, val) yozing.",
      startingCode: "function countOccurrences(arr, val) {\n  // Kodni yozing\n}\n",
      hint: "let count = 0 yaratib, mos element topilganda uni oshiring.",
      test: "const fn = new Function(code + '; return countOccurrences;')();\nif(fn([1,2,2,3], 2) !== 2) return 'Xato';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "for sikli necha qismdan iborat va ular qanday ajratiladi?",
      options: [
        "3 ta qism, nuqtali vergul (;) bilan",
        "2 ta qism, vergul (,) bilan",
        "3 ta qism, vergul (,) bilan",
        "4 ta qism, nuqta (.) bilan"
      ],
      correctAnswer: 0,
      explanation: "for (initialization; condition; update) ko'rinishida yoziladi va qismlar nuqtali vergul bilan ajratiladi."
    },
    {
      id: 2,
      question: "do-while siklining while dan asosiy farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "do-while kamida bir marta ishlaydi",
        "do-while faqat obyektlar bilan ishlaydi",
        "while har doim cheksiz ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "do-while shartni keyin tekshirgani uchun kamida bir marta bajariladi."
    },
    {
      id: 3,
      question: "continue qanday vazifa bajaradi?",
      options: [
        "Butunlay to'xtatadi",
        "Dasturni yopib qo'yadi",
        "Joriy iteratsiyani to'xtatib, keyingisiga o'tadi",
        "Xatolikni ushlaydi"
      ],
      correctAnswer: 2,
      explanation: "continue siklning keyingi qadamiga o'tish uchun ishlatiladi."
    },
    {
      id: 4,
      question: "break nima vazifa bajaradi?",
      options: [
        "Faqat bir qadamni o'tkazib yuboradi",
        "Sikldan to'liq chiqib ketadi",
        "Siklni sekinlashtiradi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "break siklni butunlay yakunlash uchun ishlatiladi."
    },
    {
      id: 5,
      question: "for...in sikli massivlar bilan nima uchun ehtiyotkorlikni talab qiladi?",
      options: [
        "U juda sekin",
        "Massivning faqat oxirgi elementini beradi",
        "U qiymatlarni emas, indekslarni (va prototipdagi xususiyatlarni) aylanadi",
        "Bu xato sintaksis"
      ],
      correctAnswer: 2,
      explanation: "for...in obyektning kalitlarini (indekslarini) string sifatida qaytaradi."
    },
    {
      id: 6,
      question: "Massiv qiymatlarini to'g'ridan-to'g'ri olish uchun qaysi sikl qulay?",
      options: [
        "for...in",
        "for...of",
        "while",
        "do-while"
      ],
      correctAnswer: 1,
      explanation: "for...of massiv kabi iterativ obyektlarning qiymatlarini olish uchun eng qulaydir."
    },
    {
      id: 7,
      question: "Cheksiz sikl yuzaga kelganda nima bo'ladi?",
      options: [
        "Brauzer yoki Thread bloklanib qoladi",
        "JavaScript avtomatik uni to'xtatadi",
        "Tezlik oshadi",
        "Xatolik (Error) tashlanadi"
      ],
      correctAnswer: 0,
      explanation: "Sinxron sikl cheksiz davom etsa, Call Stack bo'shamaydi va Event Loop to'xtab qoladi."
    },
    {
      id: 8,
      question: "Sikl parametrlarini for(;;) shaklida yozish nimani anglatadi?",
      options: [
        "Sintaktik xatolik",
        "Sikl umuman ishlamaydi",
        "Bu while(true) kabi cheksiz siklni anglatadi",
        "Faqat bir marta ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Barcha uch parametrni tushirib qoldirish cheksiz siklni hosil qiladi."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri V8 engine dagi sikl optimizatsiya usuli hisoblanadi?",
      options: [
        "Event Delegation",
        "Hoisting",
        "Loop Unrolling",
        "Closures"
      ],
      correctAnswer: 2,
      explanation: "Loop Unrolling bu kichik sikllarni ketma-ket yozilgan kod qatorlariga aylantirib optimallashtirishdir."
    },
    {
      id: 10,
      question: "Ichma-ich yozilgan (nested) sikllar vaqt murakkabligi (Time Complexity) jihatidan qanday?",
      options: [
        "Juda tez (O(1))",
        "O(N) ga teng",
        "Ko'pincha O(N^2) bo'ladi, ishlashni sekinlashtiradi",
        "Hech qanday farq qilmaydi"
      ],
      correctAnswer: 2,
      explanation: "Har bir tashqi qadam uchun ichki sikl to'liq ishlaydi, shuning uchun odatda O(N^2) bo'ladi."
    },
    {
      id: 11,
      question: "Qachon .forEach() o'rniga an'anaviy for ishlatgan ma'qul?",
      options: [
        "Qachonki break orqali siklni muddatidan oldin to'xtatish kerak bo'lganda",
        "Faqat qisqa kod yozish uchun",
        "Funksiya tezligini ataylab kamaytirish uchun",
        ".forEach() har doim yaxshiroq"
      ],
      correctAnswer: 0,
      explanation: "Array.prototype.forEach() ichida break ishlatib bo'lmaydi."
    },
    {
      id: 12,
      question: "Sikl ichida var o'rniga let ishlatish nima beradi?",
      options: [
        "Tezlikni 100 marta oshiradi",
        "Global o'zgaruvchiga aylantiradi",
        "Har bir iteratsiya uchun alohida Lexical Environment (Block Scope) yaratadi",
        "Xatolik keltirib chiqaradi"
      ],
      correctAnswer: 2,
      explanation: "let bilan yozilgan o'zgaruvchi blok darajasida yashaydi, asinxron call-backlar har bir qadamdagi to'g'ri qiymatni saqlab qoladi."
    }
  ]
};
