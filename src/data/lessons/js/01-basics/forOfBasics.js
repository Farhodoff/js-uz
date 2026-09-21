export const forOfBasics = {
  id: "forOfBasics",
  title: "for...of Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, konveyer lentasida qutilar birin-ketin kelmoqda. Siz har bir qutining tartib raqamini (indeksini) sanab o'tirmaysiz, balki har bir qutini navbati bilan qo'lingizga olib tekshirasiz.
JavaScript da ham massiv elementlarini indekslarsiz, to'g'ridan-to'g'ri qiymati bo'yicha aylanib chiqish uchun xuddi shunday qulay vosita mavjud.

**for...of sikli** — massivdagi har bir elementni indekslarsiz, to'g'ridan-to'g'ri qiymatining o'zi bo'yicha boshidan oxirigacha aylanib chiqish uchun ishlatiladigan zamonaviy sikldir.

*Yangi terminlar:*
- **for...of sikli** — \`for (const element of massiv)\` sintaksisi orqali massiv elementlarini birma-bir aylanuvchi sikl.
- **of kalit so'zi** — qaysi massivdan element olinayotganini ko'rsatuvchi bog'lovchi so'z.

---

## 2. Nega kerak?

Oldingi darslarda o'rganganimizdek, an'anaviy \`for\` sikli yordamida massivni aylanishda sanagich (\`i\`), shart (\`i < fruits.length\`) va qadam (\`i++\`) yozishga to'g'ri kelardi:

\`\`\`javascript
// Eski va uzun usul:
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\`

Bu usulda indekslar bilan adashib ketish xavfi bor. \`for...of\` siklida esa indekslar umuman kerak emas: u avtomatik ravishda birinchi elementdan oxirgi elementgacha barcha qiymatlarni bittama-bitta olib beradi.

---

## 3. Birinchi misol

Bu kod massivdagi har bir meva nomini \`for...of\` sikli yordamida konsolga chiqaradi.

\`\`\`javascript
const fruits = ["Olma", "Banan", "Gilos"];

for (const fruit of fruits) { // har bir meva navbat bilan olinadi
  console.log(fruit); // mevani konsolga chiqarish
}
\`\`\`

\`\`\`text
// Natija:
Olma
Banan
Gilos
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const fruits = ["Olma", "Banan", "Gilos"];\` — 3 ta elementli massiv.
- \`for (const fruit of fruits)\`:
  - \`fruit\` — har bir aylanishda navbatdagi element saqlanadigan o'zgaruvchi. Har bir aylanish uchun yangi o'zgaruvchi yaratilgani sababli odatda \`const\` ishlatiladi.
  - \`of\` — massiv ichidan elementlarni ajratib oluvchi maxsus kalit so'z.
  - \`fruits\` — aylanib chiqilayotgan massiv nomi.
- \`console.log(fruit);\` — sikl har aylanganda o'sha paytdagi meva nomini konsolga chiqaradi.

---

## 5. Qadamma-qadam (trace)

Siklning bajarilish jarayoni:

| Aylanish (qadam) | Massivdagi o'rni | fruit o'zgaruvchisi | Konsolga nima chiqadi? |
|---|---|---|---|
| 1-aylanish | 0-indeks | "Olma" | Olma |
| 2-aylanish | 1-indeks | "Banan" | Banan |
| 3-aylanish | 2-indeks | "Gilos" | Gilos |
| Tugash | — | Boshqa element yo'q | Sikl to'xtaydi |

---

## 6. Yana bitta misol

1-misoldan farqi: Sonlar massividagi barcha qiymatlarni umumiy yig'indi (\`total\`) ga qo'shib borish.

\`\`\`javascript
const prices = [10, 25, 15];
let total = 0;

for (const price of prices) {
  total += price; // har bir narxni summaga qo'shish
}

console.log(total);
\`\`\`

\`\`\`text
// Natija:
50
\`\`\`

Tahlil:
- \`for...of\` sikli \`prices\` massividan \`10\`, \`25\` va \`15\` sonlarini navbat bilan olib, \`total\` o'zgaruvchisiga qo'shadi.
- Sikl yakunlangach, konsolga \`50\` soni chiqadi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: of o'rniga in yozib qo'yish

\`\`\`javascript
const names = ["Ali", "Vali"];

for (const x in names) { // XATO: of o'rniga in yozildi
  console.log(x); // "Ali", "Vali" emas, "0", "1" (indekslar) chiqadi!
}
\`\`\`

**Nima bo'ladi:** \`for...in\` elementlarning qiymatini emas, balki ularning indekslarini (raqamlarini) beradi. Massiv elementlarini to'g'ridan-to'g'ri olish uchun doimo \`of\` yozilishi kerak.
**To'g'ri varianti:** \`for (const x of names) { ... }\`.

### 2-xato: Massiv bo'lmagan oddiy songa for...of ishlatish

\`\`\`javascript
const count = 5;

for (const n of count) { // XATO: TypeError: count is not iterable
  console.log(n);
}
\`\`\`

**Nima bo'ladi:** Oddiy son (number) bo'ylab aylanib bo'lmaydi, natijada \`TypeError: count is not iterable\` xatosi chiqadi.
**To'g'ri varianti:** \`for...of\` faqat massivlar kabi ro'yxat shaklidagi ma'lumotlarda ishlatiladi.

### 3-xato: Sikl o'zgaruvchisini o'zgartirib, massiv ham o'zgaradi deb o'ylash

\`\`\`javascript
const numbers = [1, 2, 3];

for (let num of numbers) {
  num = num * 2; // Bu faqat num o'zgaruvchisini o'zgartiradi
}

console.log(numbers); // [1, 2, 3] (massiv o'zgarmadi!)
\`\`\`

**Nima bo'ladi:** \`num\` o'zgaruvchisi elementning faqat alohida nusxasi bo'lib, unga yangi qiymat berilsa asl massiv o'zgarmaydi.
**To'g'ri varianti:** Massiv ichidagi elementni o'zgartirish uchun indeksdan foydalaniladi (\`numbers[i] = ...\`).

---

## 8. Tekshiruv

### 1-mashq (oson)
\`colors = ["Qizil", "Yashil", "Ko'k"]\` massivi berilgan. \`for...of\` siklidan foydalanib, har bir rangni konsolga chiqaring.

### 2-mashq (o'rtacha)
\`scores = [10, 20, 30, 40]\` massivi berilgan. \`let total = 0;\` o'zgaruvchisini ochib, \`for...of\` orqali barcha ballarning yig'indisini hisoblang va yakuniy natijani konsolga chiqaring (\`100\`).

### 3-mashq (chegara holat)
\`words = ["Salom", "Dunyo", "JS"]\` massivi berilgan. \`for...of\` sikli ichida \`if\` shartidan foydalanib, faqat uzunligi 4 dan katta bo'lgan so'zlarni konsolga chiqaring (\`word.length > 4\`, ya'ni \`"Salom"\` va \`"Dunyo"\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const colors = ["Qizil", "Yashil", "Ko'k"];

for (const color of colors) {
  console.log(color);
}
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const scores = [10, 20, 30, 40];
let total = 0;

for (const score of scores) {
  total += score;
}

console.log(total); // 100
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const words = ["Salom", "Dunyo", "JS"];

for (const word of words) {
  if (word.length > 4) {
    console.log(word);
  }
}
\`\`\`

---

## 9. Xulosa

1. \`for (const element of massiv)\` — massivdagi har bir elementni indekslarsiz to'g'ridan-to'g'ri aylanib chiqadi.
2. Massiv elementlarini qiymati bo'yicha olish uchun doimo \`of\` kalit so'zi ishlatiladi.
3. \`for...of\` an'anaviy \`for\` ga qaraganda qisqaroq, xatosiz va o'qish uchun ancha qulay.

Keyingi darsda: Callback yordamida massivni aylanish — forEach metodi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "colors massivini for...of bilan aylanish",
      instruction: "`colors = [\"Qizil\", \"Yashil\", \"Ko'k\"]` massivining har bir elementini `for...of` yordamida konsolga chiqaring.",
      startingCode: "const colors = [\"Qizil\", \"Yashil\", \"Ko'k\"];\n// for...of siklidan foydalanib konsolga chiqaring\n",
      hint: "for (const color of colors) {\n  console.log(color);\n}",
      test: "if (!code.includes('for') || !code.includes('of')) return 'for...of sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Qizil')) && out.some(m => m.includes('Yashil'))) return null;\nreturn 'Ranglar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "scores yig'indisini for...of bilan hisoblash",
      instruction: "`scores = [10, 20, 30, 40]` massivining barcha elementlari yig'indisini `for...of` siklidan foydalanib hisoblang va konsolga chiqaring (100).",
      startingCode: "const scores = [10, 20, 30, 40];\nlet total = 0;\n// for...of orqali total ga qo'shing va chiqaring\n",
      hint: "for (const score of scores) {\n  total += score;\n}\nconsole.log(total);",
      test: "if (!code.includes('for') || !code.includes('of')) return 'for...of sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('100'))) return null;\nreturn 'Konsolga 100 chiqmadi';"
    },
    {
      id: 3,
      title: "Uzun so'zlarni for...of va if bilan ajratish",
      instruction: "`words = [\"Salom\", \"Dunyo\", \"JS\"]` massividan faqat uzunligi 4 dan katta bo'lgan so'zlarni (`word.length > 4`) `for...of` va `if` orqali konsolga chiqaring.",
      startingCode: "const words = [\"Salom\", \"Dunyo\", \"JS\"];\n// for...of va if yordamida uzunligi 4 dan katta so'zlarni chiqaring\n",
      hint: "for (const word of words) {\n  if (word.length > 4) {\n    console.log(word);\n  }\n}",
      test: "if (!code.includes('for') || !code.includes('of')) return 'for...of ishlatilmadi';\nif (!code.includes('if')) return 'if sharti ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom')) && !out.some(m => m.includes('JS'))) return null;\nreturn 'Faqat uzunligi 4 dan katta so\\'zlar konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "for...of siklida massiv elementlarini olish uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "of",
        "in",
        "from",
        "with"
      ],
      correctAnswer: 0,
      explanation: "Massiv elementlarining qiymatlarini olish uchun doimo 'of' kalit so'zi ishlatiladi: for (const item of items)."
    },
    {
      id: 2,
      question: "for...of siklining an'anaviy for (let i = 0; ...) ga nisbatan asosiy afzalligi nima?",
      options: [
        "Indekslarni boshqarish va hisoblash shart emas, to'g'ridan-to'g'ri qiymatlar olinadi",
        "Faqat juft sonlarni sanaydi",
        "Massivni avtomatik o'chirib tashlaydi",
        "Sikl har doim faqat 1 marta aylanadi"
      ],
      correctAnswer: 0,
      explanation: "for...of siklida indekslar va sanagichlarni boshqarish shart emas, elementlar to'g'ridan-to'g'ri qiymat sifatida beriladi."
    },
    {
      id: 3,
      question: "Massiv ustida of o'rniga in ishlatilsa nima bo'ladi?",
      options: [
        "Element qiymatlari o'rniga indekslar (0, 1, 2...) olinadi",
        "SyntaxError beradi",
        "Sikl umuman aylanmaydi",
        "Massiv teskari aylanadi"
      ],
      correctAnswer: 0,
      explanation: "for...in massiv elementlarining qiymatlarini emas, ularning indekslarini qaytaradi."
    }
  ]
};
