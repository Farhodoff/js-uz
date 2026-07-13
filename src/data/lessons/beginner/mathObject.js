export const mathObject = {
  id: "mathObject",
  title: "Math Obyekti va Matematik Metodlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

### Math obyekti nima?
JavaScript-da **\\\`Math\\\`** obyekti matematik amallar va konstantalarni (masalan, $\\pi$ soni) bajarish uchun mo'ljallangan maxsus **ichki (built-in)** obyektdir. Bu obyekt global hisoblanadi va uning barcha metodlari hamda xususiyatlari statikdir, shuning uchun hech qachon \\\`new Math()\\\` deb chaqirib bo'lmaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, sizga matematik asboblar kerak. 
* **Yangi asbob yasash shart emas (\\\`new Math()\\\` yo'q):** Devor chetida tayyor o'rnatilgan universal va bepul ilmiy kalkulyator paneli bor. 
* **Math.floor(x):** Taxtani kesishda har doim **pastga** butunlash (agar sizda 3.8 metr bo'lsa ham faqat 3 metr ishlatasiz).
* **Math.ceil(x):** Kafel yotqizishda har doim **yuqoriga** butunlash (hatto 10.1 ta kafel ketsa ham, do'kondan 11 ta olishingiz kerak).
* **Math.round(x):** Eng adolatli yaqin songa yaxlitlash (3.5 va undan tepasi yuqoriga, undan pasti pastga).
* **Math.random():** Tanlov qilish uchun tasodifiy raqam yoki qur'a tashlash.

---

## 2. 🧠 Deep Dive (Under the hood, memory, V8 engine, performance)

### 1. V8 Engine va Xotira Boshqaruvi (Memory)
JavaScript-da barcha sonlar IEEE 754 standartiga muvofiq **64-bit float (Double Precision)** formatida saqlanadi. Biroq V8 dvigateli raqamlarni yanada samaraliroq boshqarish uchun turli xil ichki tiplardan (masalan, **Smi** - Small Integer, va **HeapNumber**) foydalanadi. 

**\\\`Math\\\`** obyektidagi metodlar odatda C++ da yuqori tezlikda ishlash uchun optimizatsiya qilingan:
* **Inline qilinadigan metodlar:** V8 engine \\\`Math.abs()\\\`, \\\`Math.round()\\\`, va \\\`Math.floor()\\\` kabi qisqa matematik operatsiyalarni to'g'ridan-to'g'ri CPU instruksiyalariga aylantiradi, shuning uchun ular juda tez.
* **Math.random() arxitekturasi:** V8 engine \\\`xorshift128+\\\` psevdo-tasodifiy raqamlar generatori (PRNG) algoritmidan foydalanadi. U yuqori tezlikka ega va oddiy tasodifiylik (o'yinlar, animatsiyalar) uchun juda zo'r ishlaydi, biroq xavfsizlik va kriptografiya uchun **ishonchli emas**. 

### 2. Performance (Tezlik) Optimizatsiyasi
Oddiy funksiya chaqiruvlari emas, balki "Bitwise" operatorlar ham butun sonli o'zgarishlar uchun (float'ni kasridan qutulish) tez-tez qo'llanadi:
\\\`\\\`\\\`javascript
// Bitwise Not operatori bilan kasrni qirqish
const a = ~~4.9; // 4 qaytaradi. Bu Math.trunc(4.9) dan biroz tezroq!
const b = 4.9 | 0; // 4 qaytaradi.
\\\`\\\`\\\`
*Diqqat:* Bitwise operatorlar sonlarni 32-bit butun soniga aylantirganligi sababli, 2 milliarddan ortiq bo'lgan sonlarda (masalan 3000000000) noto'g'ri ishlay boshlaydi!

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (G'ayrioddiy holatlar)
* **\\\`Math.max()\\\` va \\\`Math.min()\\\` argumentsiz:**
\\\`\\\`\\\`javascript
console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity
\\\`\\\`\\\`
* **\\\`Math.floor()\\\` va \\\`Math.trunc()\\\` ning manfiy sonlardagi farqi:**
\\\`\\\`\\\`javascript
console.log(Math.floor(-3.1)); // -4 (pastga, ya'ni kichik songa siljiydi)
console.log(Math.trunc(-3.1)); // -3 (faqat kasr qismini kesib tashlaydi)
\\\`\\\`\\\`

### Senior Interview Questions

1. **Savol:** Nima uchun katta massivlarni \\\`Math.max(...array)\\\` bilan ishlatish xavfli?
   **Javob:** Argumentlarni "spread" qilish JavaScript-da maksimal call stack (chaqiruv steki) hajmiga bog'liq (bu ko'pincha 65536 atrofida bo'ladi). Agar massiv hajmi millionta elementdan iborat bo'lsa, \\\`RangeError: Maximum call stack size exceeded\\\` xatosi yuzaga keladi. Bunday holatlarda \\\`reduce()\\\` orqali massivni aylanish xavfsizroq.

2. **Savol:** Nima uchun \\\`Math.random()\\\` ni kriptografiyada ishlatib bo'lmaydi?
   **Javob:** \\\`Math.random()\\\` V8 da "xorshift128+" degan algoritmni ishlatadi va bu algoritm deterministikdir, ya'ni uning ketma-ketlik qiymatlarini matematik tahlil orqali topib olish (bashorat qilish) mumkin. Parollar va tokenlar yaratish uchun doimo **Web Crypto API** (\\\`window.crypto.getRandomValues()\\\` yoki Node.js da \\\`crypto.randomBytes()\\\`) ishlatilishi shart.

3. **Savol:** \\\`0.1 + 0.2 === 0.3\\\` nega "false" qaytaradi va uni qanday qilib yaxlitlash mumkin?
   **Javob:** Barcha raqamlar IEEE 754 standarti bo'yicha float ko'rinishida saqlangani uchun kasr sonlarni ikkilik sanoq sistemasida ifodalashda cheksiz davriyliklar paydo bo'ladi (xuddi 1/3 kabi). Bu oxirgi aniqlik bitlarida "0.30000000000000004" degan xatolikka sabab bo'ladi. Muammoni \\\`Number((0.1 + 0.2).toFixed(2))\\\` yoki \\\`Math.round((0.1 + 0.2) * 10) / 10\\\` yordamida yechamiz.

4. **Savol:** \\\`Math.round(-3.5)\\\` nima uchun -3 qaytaradi?
   **Javob:** JavaScript-da \\\`Math.round()\\\` qoidasiga asosan n.5 holatida doimo +Infinity (musbat cheksizlik) tomonidagi eng yaqin butun songa siljiydi. Shuning uchun -3.5 dan ko'ra kattaroq va eng yaqin butun son -3 ga o'tadi.

---

## 4. 📊 Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Math Obyekti] --> B[Yaxlitlash]
    A --> C[Tasodifiy Son]
    A --> D[Arifmetik Metodlar]
    
    B --> B1[Math.floor]
    B --> B2[Math.ceil]
    B --> B3[Math.round]
    B --> B4[Math.trunc]
    
    B1 --> F1[Doimo kichik tomonga]
    B2 --> F2[Doimo katta tomonga]
    B3 --> F3[Eng yaqin butun songa]
    B4 --> F4[Faqat butun qismni oladi]
    
    C --> C1[Math.random]
    C1 --> C2[0 dan 1 gacha son]
    
    D --> D1[Math.max / Math.min]
    D --> D2[Math.pow]
    D --> D3[Math.abs]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Tasodifiy son generatori",
      instruction: "Berilgan `min` va `max` butun sonlari oralig'ida (ikkala chegara ham kiruvchi) tasodifiy butun sonni qaytaruvchi `getRandomInRange(min, max)` funksiyasini yozing.",
      startingCode: "function getRandomInRange(min, max) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Math.floor(Math.random() * (max - min + 1)) + min formulasidan foydalaning.",
      test: "const sandbox = new Function(code + '; return getRandomInRange;'); const fn = sandbox(); let val = fn(5, 10); if (val < 5 || val > 10) return 'Oraliqdan tashqari'; return null;"
    },
    {
      id: 2,
      title: "Moliyaviy yaxlitlash",
      instruction: "Pul qiymatlarini ko'rsatilgan `decimals` xonagacha matematik qoida bo'yicha yaxlitlaydigan `roundToDecimal(num, decimals)` yozing.",
      startingCode: "function roundToDecimal(num, decimals) {\n  // Kodni yozing\n}\n",
      hint: "Sonni `10^decimals` ga ko'paytirib round qiling va qayta bo'ling.",
      test: "const fn = new Function(code + '; return roundToDecimal;')(); if (fn(10.235, 2) !== 10.24) return 'Xato yaxlitlandi'; return null;"
    },
    {
      id: 3,
      title: "Eng katta va kichik son farqi",
      instruction: "Sonlar massivi ichidagi eng katta va eng kichik son o'rtasidagi farqni (absolyut) hisoblab beruvchi `getMinMaxDifference(arr)` yozing. Bo'sh massiv bo'lsa `0` qaytsin.",
      startingCode: "function getMinMaxDifference(arr) {\n  // Kodni yozing\n}\n",
      hint: "Math.max(...arr) va Math.min(...arr) larni topib ayrishingiz mumkin.",
      test: "const fn = new Function(code + '; return getMinMaxDifference;')(); if (fn([10, 2, 38]) !== 36) return 'Xato farq'; if (fn([]) !== 0) return '0 qaytishi kerak'; return null;"
    },
    {
      id: 4,
      title: "Kvadrat Ildiz va Yaxlitlash",
      instruction: "Berilgan sonning kvadrat ildizini topib, uni pastga qarab yaxlitlovchi `floorSqrt(n)` yozing.",
      startingCode: "function floorSqrt(n) {\n  // Kodni yozing\n}\n",
      hint: "Math.floor(Math.sqrt(n)) dan foydalaning.",
      test: "const fn = new Function(code + '; return floorSqrt;')(); if(fn(20) !== 4) return '20 ni ildizi 4.47, yaxlitlansa 4'; return null;"
    },
    {
      id: 5,
      title: "Darajaga Ko'tarish",
      instruction: "Berilgan `base` va `exp` qiymatlarini darajaga ko'taruvchi funksiya `power(base, exp)` ni Math metodi yordamida yozing.",
      startingCode: "function power(base, exp) {\n  // Kodni yozing\n}\n",
      hint: "Math.pow(base, exp) ni ishlating.",
      test: "const fn = new Function(code + '; return power;')(); if(fn(2,3) !== 8) return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "Eng Katta Sonni Topish",
      instruction: "Uchta sondan eng kattasini qaytaruvchi `maxOfThree(a, b, c)` funksiyasini yozing.",
      startingCode: "function maxOfThree(a, b, c) {\n  // Kodni yozing\n}\n",
      hint: "Math.max(a, b, c) ishlatish orqali natijani qaytaring.",
      test: "const fn = new Function(code + '; return maxOfThree;')(); if(fn(1,9,4) !== 9) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Absolyut farqni topish",
      instruction: "Ikkita son a va b o'rtasidagi absolyut masofani qaytaradigan `absoluteDiff(a, b)` yozing.",
      startingCode: "function absoluteDiff(a, b) {\n  // Kodni yozing\n}\n",
      hint: "Math.abs(a - b) dan foydalaning.",
      test: "const fn = new Function(code + '; return absoluteDiff;')(); if(fn(-2, 5) !== 7) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Faqat Kasr Qismini Olib Tashlash",
      instruction: "Manfiy yoki musbat bo'lishidan qat'iy nazar, faqatgina kasr qismini kesib tashlaydigan `removeDecimals(n)` yozing.",
      startingCode: "function removeDecimals(n) {\n  // Kodni yozing\n}\n",
      hint: "Math.trunc(n) bu ishni to'g'ri bajaradi.",
      test: "const fn = new Function(code + '; return removeDecimals;')(); if(fn(-4.9) !== -4) return '-4 qaytishi kerak'; return null;"
    },
    {
      id: 9,
      title: "Yuqoriga yaxlitlash",
      instruction: "Kiritilgan kasr sonni doimo yuqoriga (keyingi eng katta butun songa) yaxlitlovchi `roundUp(num)` yozing.",
      startingCode: "function roundUp(num) {\n  // Kodni yozing\n}\n",
      hint: "Math.ceil() ni ishlating.",
      test: "const fn = new Function(code + '; return roundUp;')(); if(fn(4.1) !== 5) return '5 qaytishi kerak'; return null;"
    },
    {
      id: 10,
      title: "O'zgaruvchan yaxlitlash qoidasi",
      instruction: "Agar sonning kasr qismi aniq `0.5` yoki katta bo'lsa yuqoriga, kichik bo'lsa pastga yaxlitlovchi `standardRound(n)` yozing.",
      startingCode: "function standardRound(n) {\n  // Kodni yozing\n}\n",
      hint: "Bu Math.round(n) ning xuddi o'zidir.",
      test: "const fn = new Function(code + '; return standardRound;')(); if(fn(4.5) !== 5) return '4.5 da 5 bo\\'lishi kerak'; if(fn(4.4) !== 4) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Math obyekti haqida qaysi tasdiq to'g'ri?",
      options: [
        "`new Math()` yordamida uning yangi nusxasini yaratish mumkin",
        "U funksiya emas, balki statik obyekt bo'lib, uning konstruktori yo'q",
        "U faqat natural sonlar bilan ishlaydigan brauzer funksiyasidir",
        "Uning metodlarini faqat Node.js da ishlatish mumkin"
      ],
      correctAnswer: 1,
      explanation: "Math obyekti konstruktor emas, ya'ni uni `new Math()` deb chaqirib bo'lmaydi."
    },
    {
      id: 2,
      question: "`Math.floor(4.7)` va `Math.ceil(4.1)` metodlari qanday natija beradi?",
      options: [
        "`4` va `5`",
        "`5` va `4`",
        "`4.7` va `4.1`",
        "`4` va `4`"
      ],
      correctAnswer: 0,
      explanation: "`Math.floor()` pastga (4), `Math.ceil()` yuqoriga (5) yaxlitlaydi."
    },
    {
      id: 3,
      question: "`Math.round(2.5)` va `Math.round(-2.5)` natijalari mos ravishda qanday bo'ladi?",
      options: [
        "`3` va `-3`",
        "`2` va `-2`",
        "`3` va `-2`",
        "`2.5` va `-2.5`"
      ],
      correctAnswer: 2,
      explanation: "Musbat .5 yuqoriga, manfiy -.5 ham musbat tarafga (ya'ni -2 ga) tortiladi."
    },
    {
      id: 4,
      question: "`Math.trunc()` metodining asosiy vazifasi nima?",
      options: [
        "Sonning butun qismini qoldirib, kasrni tashlab yuboradi",
        "Sonni eng yaqin juft songacha yaxlitlaydi",
        "Musbatni pastga, manfiyni yuqoriga",
        "Sonning kvadrat ildizini hisoblaydi"
      ],
      correctAnswer: 0,
      explanation: "Kasr qismini kesib tashlaydi."
    },
    {
      id: 5,
      question: "Musbat va manfiy sonlar uchun `Math.floor()` va `Math.trunc()` qachon farqli natija beradi?",
      options: [
        "Hech qachon",
        "Faqat musbat kasr sonlarda",
        "Faqat manfiy kasr sonlarda",
        "Butun sonlarda"
      ],
      correctAnswer: 2,
      explanation: "-3.2 floor bilan -4, trunc bilan -3 bo'ladi."
    },
    {
      id: 6,
      question: "`Math.random()` funksiyasi qanday diapazondagi sonlarni qaytaradi?",
      options: [
        "\"[0, 1)\" ya'ni 0 dan 1 gacha (0 kiradi, 1 kirmaydi)",
        "`(0, 1)`",
        "`[0, 1]`",
        "`[1, 100]`"
      ],
      correctAnswer: 0,
      explanation: "Har doim 0 kiritilgan va 1 gacha (1 kirmaydi)."
    },
    {
      id: 7,
      question: "Qaysi kod berilgan `[1, 10]` oralig'idan butun tasodifiy sonni qaytaradi?",
      options: [
        "`Math.floor(Math.random() * 10)`",
        "`Math.floor(Math.random() * 10) + 1`",
        "`Math.ceil(Math.random() * 10)`",
        "`Math.round(Math.random() * 9) + 1`"
      ],
      correctAnswer: 1,
      explanation: "random()*10 bizga [0, 9] oraliq qilib +1 bilan [1, 10] ga o'tkazadi."
    },
    {
      id: 8,
      question: "`Math.min()` metodiga argumentlar berilmasa nima qaytadi?",
      options: [
        "`0`",
        "`undefined`",
        "`Infinity`",
        "`-Infinity`"
      ],
      correctAnswer: 2,
      explanation: "Argumentlarsiz `Infinity` qaytaradi."
    },
    {
      id: 9,
      question: "Massivdagi sonlarning eng kattasini topish uchun qaysi kod to'g'ri hisoblanadi?",
      options: [
        "`Math.max(numbers)`",
        "`Math.max(...numbers)`",
        "`Math.max.apply(numbers)`",
        "`Math.max(Array.values(numbers))`"
      ],
      correctAnswer: 1,
      explanation: "Spread (...) yordamida massiv elementlarini argumentlarga yoyib yuborish kerak."
    },
    {
      id: 10,
      question: "`Math.abs(-42.5)` ning natijasi nima bo'ladi?",
      options: [
        "`-42`",
        "`42`",
        "`43`",
        "`42.5`"
      ],
      correctAnswer: 3,
      explanation: "Faqat ishorasini tushirib qoldiradi."
    },
    {
      id: 11,
      question: "`Math.pow(8, 2)` metodi qaysi operator bilan bir xil ishlaydi?",
      options: [
        "`8 * 2`",
        "`8 ** 2`",
        "`8 ^ 2`",
        "`8 && 2`"
      ],
      correctAnswer: 1,
      explanation: "ES6 da qo'shilgan ** operatori bilan."
    },
    {
      id: 12,
      question: "`Math.sqrt(16)` va `Math.sqrt(-16)` natijalari qanday?",
      options: [
        "`4` va `NaN`",
        "`4` va `-4`",
        "`4` va `TypeError`",
        "`8` va `NaN`"
      ],
      correctAnswer: 0,
      explanation: "Manfiy son kvadrat ildizi NaN beradi."
    }
  ]
};
