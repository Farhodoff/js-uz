export const mathObject = {
  id: "mathObject",
  title: "Math Obyekti va Matematik Metodlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Math obyekti nima?
JavaScript-da **\`Math\`** obyekti matematik amallar va konstantalarni (masalan, $\\pi$ soni) bajarish uchun mo'ljallangan maxsus **ichki (built-in)** obyektdir. 

Boshqa ko'plab JavaScript obyektlaridan farqli o'laroq, \`Math\` konstruktor emas. Ya'ni, siz \`new Math()\` deb yozib, undan yangi nusxa ololmaysiz. Uning barcha metod va xususiyatlari **statikdir** — ularni to'g'ridan-to'g'ri \`Math.metodName()\` ko'rinishida chaqirib ishlataverasiz.

### Real hayotiy o'xshatish
Tasavvur qiling, siz yangi uy qurayapsiz va sizga har xil o'lchov asboblari kerak:
* **Siz yangi chizg'ich yoki kalkulyator sotib olmaysiz (\`new Math()\` yo'q):** Devor chetida tayyor o'rnatilgan universal va bepul **ilmiy kalkulyator panelini** ko'rasiz.
* **Math.floor(x):** Doskani kesayotganingizda uzunlikni faqat **kichik butun tomonga qarab** kesib tashlash (masalan, 3.8 metrli taxtadan faqat 3 metrini ishlatish).
* **Math.ceil(x):** Xonani plitka bilan qoplashda plitkalar sonini **yuqori tomonga qarab** butunlash. Agar sizga 10.2 ta plitka kerak bo'lsa, siz do'kondan baribir 11 ta butun plitka sotib olasiz.
* **Math.round(x):** Eng adolatli va matematik qoida bo'yicha yaqin butun songa yaxlitlash.
* **Math.random():** Qaysi usta bugun tushlikka borishini aniqlash uchun **tangani havoga otish** yoki tasodifiy raqam tanlash.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sonlarni yaxlitlash metodlari)
Kundalik ishlarda ko'p qo'llaniladigan yaxlitlash metodlarining farqi:

\`\`\`javascript
// 1. Math.floor() - Doimo pastga (kichik butun songa) yaxlitlaydi
console.log(Math.floor(4.7));  // 4
console.log(Math.floor(-4.2)); // -5 (chunki -5 soni -4.2 dan kichik)

// 2. Math.ceil() - Doimo yuqoriga (katta butun songa) yaxlitlaydi
console.log(Math.ceil(4.1));   // 5
console.log(Math.ceil(-4.8));  // -4

// 3. Math.round() - Matematik qoida bo'yicha eng yaqin butun songa yaxlitlaydi
console.log(Math.round(4.4));  // 4
console.log(Math.round(4.5));  // 5 
console.log(Math.round(-4.5)); // -4 (manfiy sonlarda -4 soni musbat cheksizlikka yaqinroq)

// 4. Math.trunc() - Kasr qismini shunchaki kesib tashlaydi
console.log(Math.trunc(4.9));  // 4
console.log(Math.trunc(-4.9)); // -4

// 5. Math.abs() - Sonning absolyut qiymatini (modulini) qaytaradi
console.log(Math.abs(-15));    // 15
\`\`\`

### 2. Intermediate Example (Min/Max va Darajalar bilan ishlash)
Elementlarning eng kattasi/kichigini aniqlash va matematik hisob-kitoblar:

\`\`\`javascript
// 1. Math.max va Math.min
console.log(Math.max(12, 5, 8, 30, 2)); // 30
console.log(Math.min(12, 5, 8, 30, 2)); // 2

// Massivlar bilan spread (...) operatori orqali ishlatish:
const scores = [85, 92, 78, 99, 64];
const highest = Math.max(...scores);
console.log(\`Eng yuqori ball: \${highest}\`); // 99

// 2. Math.pow va Math.sqrt
console.log(Math.pow(2, 3)); // 8 (2 ning 3-darajasi)
console.log(2 ** 3);         // 8 (ES6 muqobil)

console.log(Math.sqrt(25));  // 5 (Kvadrat ildiz)
console.log(Math.sqrt(-25)); // NaN
\`\`\`

### 3. Advanced Example (Tasodifiy son va moliyaviy yaxlitlash)

\`\`\`javascript
// 1. Chegaralangan oraliqda tasodifiy son [min, max]
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomNumber(10, 20));

// 2. Float sonlarni aniq kasr xonasigacha yaxlitlash (0.1 + 0.2 muammosi)
function financialRound(value, decimals) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(financialRound(0.1 + 0.2, 2)); // 0.3

// 3. Doira yuzini hisoblash (Math.PI)
function calculateCircleArea(radius) {
  return Math.PI * Math.pow(radius, 2);
}
console.log(calculateCircleArea(5).toFixed(2)); // "78.54"
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

1. **Kompyuter xotirasidagi sonlar xatoligi:** JavaScript barcha sonlarni 64-bitli float formatda saqlaydi. Bu esa \`0.1 + 0.2\` xatoligini beradi. Math metodlari bilan ularni aniq yaxlitlaymiz.
2. **Tasodifiylik:** O'yinlar, lotereyalar yoki shuffling uchun \`Math.random()\` asqotadi.
3. **Massivdan Min/Max ni tez topish:** Siklsiz, to'g'ridan-to'g'ri bir qator kod bilan topish mumkin.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`new Math()\` orqali yangi obyekt yaratishga urinish
🔴 **YOMON:**
\`\`\`javascript
const myMath = new Math(); // TypeError: Math is not a constructor
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
const value = Math.sqrt(9); // 3
\`\`\`

### 2. Manfiy sonlarda \`Math.floor\` va \`Math.trunc\` farqini unutish
🔴 **YOMON:**
\`\`\`javascript
console.log(Math.floor(-5.5)); // -6 qaytadi
\`\`\`

🟢 **YAXSHI:**
Agar faqat kasr qismini olmoqchi bo'lsangiz:
\`\`\`javascript
console.log(Math.trunc(-5.5)); // -5
\`\`\`

### 3. Massivni spread operatorisiz \`Math.max\`ga to'g'ridan-to'g'ri uzatish
🔴 **YOMON:**
\`\`\`javascript
const numbers = [1, 5, 3];
console.log(Math.max(numbers)); // NaN
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
console.log(Math.max(...numbers)); // 5
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Nima uchun \`new Math()\` yozib bo'lmaydi?
   * **Javob:** Chunki \`Math\` konstruktor emas, u shunchaki global statik obyekt bo'lib metodlari chaqirish uchun qilingan.
2. **Savol:** \`Math.floor(4.9)\` va \`Math.ceil(4.1)\` metodlarining farqi nimada?
   * **Javob:** \`Math.floor()\` pastga yaxlitlaydi (4.9 -> 4). \`Math.ceil()\` yuqoriga yaxlitlaydi (4.1 -> 5).
3. **Savol:** \`Math.random()\` 1 qiymatini qaytarishi mumkinmi?
   * **Javob:** Yo'q, u \`[0, 1)\` oraliqda bo'ladi.
4. **Savol:** \`Math.round(-3.5)\` natijasi nima?
   * **Javob:** \`-3\` qaytaradi, chunki musbat cheksizlik tomonga qarab yaxlitlaydi.

### Middle (5–8)
5. **Savol:** Bo'sh massiv bilan \`Math.max(...[])\` necha qaytaradi?
   * **Javob:** \`-Infinity\`. \`Math.min\` esa \`Infinity\` qaytaradi.
6. **Savol:** Nima uchun manfiy sonlarda \`Math.floor()\` va \`Math.trunc()\` farq qiladi?
   * **Javob:** \`Math.trunc()\` faqat kasrni kesadi (-3.9 -> -3). \`Math.floor()\` pastga tortadi (-3.9 -> -4).
7. **Savol:** \`Math.pow(x, y)\` muqobili nima?
   * **Javob:** ES6 daraja operatori: \`x ** y\`.
8. **Savol:** \`Math.sqrt(-9)\` natijasi?
   * **Javob:** \`NaN\`. Haqiqiy manfiy son ildizi yo'q.

### Senior (9–12)
9. **Savol:** \`Math.random()\` qanday algoritmga asoslangan va nega kriptografiyaga yaramaydi?
   * **Javob:** xorshift128+ PRNG algoritmidir. U bashorat qilinishi oson. O'rniga Web Crypto API (\`crypto.getRandomValues()\`) ishlatiladi.
10. **Savol:** Bitwise operatorlar (\`~~x\`) nega \`Math.floor\` dan ko'ra tez ishlaydi va uning qanday xavfi bor?
    * **Javob:** Bitwise 32-bit butun songa o'girib protsessor darajasida ishlaydi (tezroq). Ammo 2,147,483,647 dan katta sonlarda noto'g'ri qiymat beradi.
11. **Savol:** \`Math.max(...veryLargeArray)\` ishlatganda qanday xavf bor?
    * **Javob:** JS engine-da call stack limiti tufayli array hajmi o'ta katta bo'lsa \`Maximum call stack size exceeded\` xatosi beradi.
12. **Savol:** \`Math.atan2(y, x)\` nima uchun kerak?
    * **Javob:** X va Y koordinatalari bo'yicha nuqtaning qutb burchagini $(-\\pi, \\pi)$ aniq choraklarda (quadrant) qaytaradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Yaxlitlash va Tasodifiylik Vizual Modeli:

\`\`\`mermaid
graph TD
    A["Math Metodlari"] --> B["Rounding (Yaxlitlash)"]
    A --> C["Random Numbers"]

    B --> B1["Math.floor(x)"]
    B --> B2["Math.ceil(x)"]
    B --> B3["Math.round(x)"]
    B --> B4["Math.trunc(x)"]

    B1 --> F1["Pastga <br> 3.7 -> 3 <br> -3.2 -> -4"]
    B2 --> F2["Yuqoriga <br> 3.1 -> 4 <br> -3.7 -> -3"]
    B3 --> F3["Yaqin songa <br> 3.5 -> 4 <br> -3.5 -> -3"]
    B4 --> F4["Kasrni kesadi <br> 3.9 -> 3 <br> -3.9 -> -3"]

    C --> C1["Math.random()"]
    C1 --> C2["[0, 1) oraliq"]
    C1 --> C3["[min, max] oraliq: <br> floor(random() * (max-min+1)) + min"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars yuzasidan barcha interaktiv testlarni o'zlashtirish orqali bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### E-Commerce Financial & Transaction Utility
Klass valyutalarni hisoblash, chegirmalarni soliq bilan birga to'g'ri yaxlitlash uchun xizmat qiladi:

\`\`\`javascript
class FinanceUtility {
  static roundPrice(amount, currency = 'USD') {
    const dec = currency === 'JPY' ? 0 : 2;
    const factor = Math.pow(10, dec);
    return Math.round(amount * factor) / factor;
  }
}
console.log(FinanceUtility.roundPrice(19.9923)); // 19.99
\`\`\`

---

## 9. 🚀 Performance va Optimization

1. **Bitwise Operatorlar (\`~~\`):** Kichik butun sonlar uchun tezroq ishlaydi, ammo son kattalashsa (-2^31 dan oshganda) buziladi.
2. **Katta massivlarda Spread'dan qochish:** \`Math.max(...arr)\` juda katta massivda call stack-ni to'ldiradi. Sikl orqali eng kattasini topish xavfsizroq.
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
        "\`[0, 1)\` ya'ni 0 dan 1 gacha (0 kiradi, 1 kirmaydi)",
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
