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
    },
    {
      "id": 4,
      "title": "Sonlar massivini chiqarish",
      "instruction": "`const nums = [2, 4, 6];` massividagi har bir sonni `for...of` yordamida konsolga chiqaring.",
      "startingCode": "const nums = [2, 4, 6];\n// for...of bilan har bir sonni chiqaring\n",
      "hint": "for (const n of nums) {\n  console.log(n);\n}",
      "test": "if (!code.includes(\"of\")) return \"for...of sikli ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\",\");\nif (all.includes(\"2\") && all.includes(\"4\") && all.includes(\"6\")) return null;\nreturn \"2, 4, 6 sonlari konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Eng katta sonni topish",
      "instruction": "`const nums = [3, 9, 4];` massividagi eng katta sonni `for...of` va `if` yordamida topib, konsolga chiqaring.",
      "startingCode": "const nums = [3, 9, 4];\nlet max = nums[0];\n// for...of bilan eng katta sonni toping\n",
      "hint": "for (const n of nums) {\n  if (n > max) max = n;\n}\nconsole.log(max);",
      "test": "if (!code.includes(\"of\")) return \"for...of ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"9\")) return null;\nreturn \"Eng katta son 9 konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "So'zlarning umumiy uzunligi",
      "instruction": "`const words = [\"olma\", \"nok\"];` massividagi har bir so'zning uzunligini qo'shib, umumiy uzunlikni (`7`) konsolga chiqaring.",
      "startingCode": "const words = [\"olma\", \"nok\"];\nlet total = 0;\n// har bir so'z uzunligini qo'shing va chiqaring\n",
      "hint": "for (const w of words) {\n  total += w.length;\n}\nconsole.log(total);",
      "test": "if (!code.includes(\"of\")) return \"for...of ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"7\")) return null;\nreturn \"Umumiy uzunlik 7 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Faqat musbat sonlar",
      "instruction": "`const nums = [-2, 5, -1, 8];` massividan `for...of` va `if` yordamida faqat musbat sonlarni konsolga chiqaring.",
      "startingCode": "const nums = [-2, 5, -1, 8];\n// faqat musbat sonlarni chiqaring\n",
      "hint": "for (const n of nums) {\n  if (n > 0) console.log(n);\n}",
      "test": "if (!code.includes(\"of\")) return \"for...of ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!out.some((m) => m.trim() === \"5\")) return \"5 konsolga chiqmadi\";\nif (!out.some((m) => m.trim() === \"8\")) return \"8 konsolga chiqmadi\";\nif (out.some((m) => m.includes(\"-2\") || m.includes(\"-1\"))) return \"Manfiy sonlar ham chiqib ketdi\";\nreturn null;"
    },
    {
      "id": 8,
      "title": "in xatosini tuzatish",
      "instruction": "Quyidagi kodda `in` ishlatilgani sababli indekslar chiqadi. `of` ga o'zgartiring, toki konsolga `Qizil` va `Yashil` chiqsin.",
      "startingCode": "const colors = [\"Qizil\", \"Yashil\"];\nfor (const c in colors) {\n  console.log(c);\n}\n",
      "hint": "for (const c of colors) {\n  console.log(c);\n}",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nif (!out.some((m) => m.includes(\"Qizil\"))) return \"Qizil konsolga chiqmadi\";\nif (!out.some((m) => m.includes(\"Yashil\"))) return \"Yashil konsolga chiqmadi\";\nif (out.some((m) => m.trim() === \"0\" || m.trim() === \"1\")) return \"Indekslar chiqdi, of ishlatilsin\";\nreturn null;"
    },
    {
      "id": 9,
      "title": "Bo'laklarni birlashtirish",
      "instruction": "`const parts = [\"Ja\", \"va\", \"Script\"];` massivi bo'laklarini `for...of` bilan bitta matnga ulab, `JavaScript` ni konsolga chiqaring.",
      "startingCode": "const parts = [\"Ja\", \"va\", \"Script\"];\nlet text = \"\";\n// bo'laklarni birlashtirib chiqaring\n",
      "hint": "for (const p of parts) {\n  text += p;\n}\nconsole.log(text);",
      "test": "if (!code.includes(\"of\")) return \"for...of ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"JavaScript\"))) return null;\nreturn \"JavaScript matni konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Shartga mos elementlar soni (chegara)",
      "instruction": "`const nums = [4, 7, 10, 13, 16];` massivida `for...of` va `if` yordamida `5` dan katta bo'lgan sonlar sonini hisoblab konsolga chiqaring (`4`).",
      "startingCode": "const nums = [4, 7, 10, 13, 16];\nlet count = 0;\n// 5 dan katta sonlar sonini hisoblang\n",
      "hint": "for (const n of nums) {\n  if (n > 5) count++;\n}\nconsole.log(count);",
      "test": "if (!code.includes(\"of\")) return \"for...of ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"4\")) return null;\nreturn \"Natija 4 konsolga chiqmadi\";"
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
    },
    {
      "id": 4,
      "question": "`for (const n of [1, 2, 3]) console.log(n * 2);` kodi konsolga nima chiqaradi?",
      "options": [
        "2 4 6",
        "1 2 3",
        "246",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "for...of har bir elementni oladi (1, 2, 3), ular 2 ga ko'paytirilib alohida qatorlarda chiqadi: 2, 4, 6."
    },
    {
      "id": 5,
      "question": "`for (const ch of \"JS\")` kodida har bir aylanishda `ch` nima oladi?",
      "options": [
        "Matnning butun uzunligini",
        "Navbatdagi bitta belgini (J, keyin S)",
        "Bitta massivni",
        "undefined"
      ],
      "correctAnswer": 1,
      "explanation": "Satr (string) ham iterable bo'lgani uchun for...of har bir belgini alohida beradi: avval J, keyin S."
    },
    {
      "id": 6,
      "question": "`for...of` siklida sikl o'zgaruvchisini `const` bilan e'lon qilish mumkinmi?",
      "options": [
        "Mumkin, har aylanishda yangi o'zgaruvchi yaratiladi",
        "Mumkin emas, faqat let",
        "Mumkin emas, faqat var",
        "Faqat massiv bo'sh bo'lsa mumkin"
      ],
      "correctAnswer": 0,
      "explanation": "Har bir aylanishda sikl o'zgaruvchisi qayta yaratilgani uchun uni const bilan e'lon qilish mumkin va tavsiya etiladi."
    },
    {
      "id": 7,
      "question": "`for...of` ichida `break` va `continue` ishlatish mumkinmi?",
      "options": [
        "Ha, ikkalasi ham ishlaydi",
        "Yo'q, faqat an'anaviy for'da ishlaydi",
        "Faqat break ishlaydi",
        "Faqat continue ishlaydi"
      ],
      "correctAnswer": 0,
      "explanation": "for...of ham to'liq sikldir: break siklni to'xtatadi, continue esa joriy aylanishni o'tkazib yuboradi."
    },
    {
      "id": 8,
      "question": "Massiv elementlarini yig'indisini hisoblash uchun to'g'ri boshlanish qaysi?",
      "options": [
        "`let total = 0;` so'ng `for (const x of arr) total += x;`",
        "`let total = arr;`",
        "`const total = arr;`",
        "`for (const i in arr) total = arr[i];`"
      ],
      "correctAnswer": 0,
      "explanation": "Yig'indi uchun nolga teng yig'indi o'zgaruvchisi ochiladi va har bir element for...of ichida qo'shib boriladi."
    },
    {
      "id": 9,
      "question": "`for...of` sikl o'zgaruvchisiga yangi qiymat bersa, asl massiv o'zgaradimi?",
      "options": [
        "Yo'q, bu faqat nusxa o'zgaruvchi",
        "Ha, massiv elementlari o'zgaradi",
        "Ha, lekin faqat sonlar uchun",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Sikl o'zgaruvchisi elementning nusxasi bo'lib qoladi; massiv ichidagi qiymatni o'zgartirish uchun indeks orqali murojaat qilinadi."
    },
    {
      "id": 10,
      "question": "Quyidagi kod natijasi qanday? `let s = \"\"; for (const p of [\"A\", \"B\"]) s += p; console.log(s);`",
      "options": [
        "AB",
        "A B",
        "BA",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Bo'laklar navbat bilan qo'shilib, natijada AB hosil bo'ladi."
    },
    {
      "id": 11,
      "question": "Massivni `for...of` bilan teskari tartibda (oxiridan boshiga) aylanish mumkinmi?",
      "options": [
        "Yo'q, for...of doim boshidan oxiriga aylanadi",
        "Ha, avtomatik teskari bo'ladi",
        "Ha, of o'rniga in yozilsa teskari bo'ladi",
        "Faqat sonli massivlarda mumkin"
      ],
      "correctAnswer": 0,
      "explanation": "for...of massivni doimo birinchi elementdan oxirgisigacha aylanadi; teskari tartib uchun massivni oldin reverse() qilish kerak."
    },
    {
      "id": 12,
      "question": "`const n = 5; for (const x of n) console.log(x);` kodi qanday natija beradi?",
      "options": [
        "1 dan 5 gacha chiqaradi",
        "TypeError: n is not iterable",
        "5 ni chiqaradi",
        "Sikl aylanmaydi, jim turadi"
      ],
      "correctAnswer": 1,
      "explanation": "Oddiy son (number) iterable emas, shuning uchun for...of bilan aylanishda TypeError yuzaga keladi."
    }
  ]
};
