export const mapBasics = {
  id: "mapBasics",
  title: "map Metodi",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, konveyer lentasida toza paxta bo'laklari ketmoqda. Har bir paxta bo'lagi maxsus bo'yoq mashinasidan (callback) o'tadi va mashina uni rangli ipga aylantirib, yonidagi yangi lentaga chiqaradi. Boshlang'ich paxtalar o'z holicha saqlanib qoladi, ikkinchi lentada esa yangi tayyor rangli iplar to'plami paydo bo'ladi.
JavaScript dagi \`map()\` metodi ham xuddi shunday ishlaydi: u har bir elementni oladi, o'zgartiradi va yangi massiv qilib qaytaradi.

**map() metodi** — massivning har bir elementini berilgan callback funksiya orqali o'zgartirib (qayta ishlab), natijalardan iborat **yangi massiv** yaratuvchi metoddir.

*Yangi terminlar:*
- **map() metodi** — massiv elementlarini o'zgartirib yangi massiv hosil qiluvchi buyruq.
- **Transformatsiya (o'zgartirish)** — ma'lumotni bir ko'rinishdan ikkinchi ko'rinishga keltirish.

---

## 2. Nega kerak?

Har bir elementni o'zgartirib yangi massiv yasash uchun oddiy sikl va \`push\` ishlatish uzun kod talab qiladi:

\`\`\`javascript
// Eski usul:
const numbers = [1, 2, 3];
const doubled = [];

for (const n of numbers) {
  doubled.push(n * 2);
}
\`\`\`

\`map()\` metodi buni bitta qatorda, ixcham va toza tarzda amalga oshiradi:

\`\`\`javascript
const doubled = numbers.map((n) => n * 2);
\`\`\`

Eng muhimi: \`map()\` boshlang'ich massivni buzmaydi (o'zgartirmaydi), balki butunlay yangi massiv qaytaradi!

---

## 3. Birinchi misol

Bu kod har bir sonni 2 ga ko'paytirib, yangi massiv hosil qiladi.

\`\`\`javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((num) => {
  return num * 2; // har bir sonni 2 ga ko'paytirib qaytarish
});

console.log(doubled); // [2, 4, 6]
console.log(numbers); // [1, 2, 3] (asl massiv o'zgarmagan)
\`\`\`

\`\`\`text
// Natija:
[ 2, 4, 6 ]
[ 1, 2, 3 ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const numbers = [1, 2, 3];\` — boshlang'ich massiv.
- \`const doubled = numbers.map(...);\` — \`map\` metodi chaqirildi. U har bir element ustida ishlaydi va natijalardan yangi massiv tuzib, \`doubled\` ga saqlaydi.
- \`return num * 2;\` — **Juda muhim:** \`map\` callback funksiyasida doimo \`return\` bo'lishi shart! Callback nimani \`return\` qilsa, yangi massivga o'sha qiymat yoziladi.
- \`console.log(numbers);\` — asl \`numbers\` massivi o'zgarmasdan o'z holicha qolganini ko'ramiz.

---

## 5. Qadamma-qadam (trace)

Transformatsiya jarayoni:

| Qadam | Kirish elementi (\`num\`) | Callback amali (\`return num * 2\`) | Yangi massiv tarkibi |
|---|---|---|---|
| 1 | 1 | 1 * 2 = 2 | \`[2]\` |
| 2 | 2 | 2 * 2 = 4 | \`[2, 4]\` |
| 3 | 3 | 3 * 2 = 6 | \`[2, 4, 6]\` |
| Natija | [1, 2, 3] | — | **[2, 4, 6]** |

---

## 6. Yana bitta misol

1-misoldan farqi: Matnlarni o'zgartirish (har bir ism oldiga salomlashish so'zini qo'shish).

\`\`\`javascript
const names = ["Ali", "Vali"];

const greetings = names.map((name) => {
  return "Salom, " + name;
});

console.log(greetings);
\`\`\`

\`\`\`text
// Natija:
[ 'Salom, Ali', 'Salom, Vali' ]
\`\`\`

Tahlil:
- \`names\` massividagi har bir ism olinib, oldiga \`"Salom, "\` qo'shildi.
- Yangi \`greetings\` massiviga \`["Salom, Ali", "Salom, Vali"]\` qiymatlari joylashdi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Callback ichida return yozishni unutish

\`\`\`javascript
const list = [1, 2, 3];

const result = list.map((n) => {
  n * 2; // XATO: return yozilmadi!
});

console.log(result); // [undefined, undefined, undefined]
\`\`\`

**Nima bo'ladi:** Agar \`return\` yozilmasa, har bir element o'rniga \`undefined\` tushadi va massiv bo'sh qiymatlar bilan to'lib qoladi.
**To'g'ri varianti:** Har doim yangi qiymatni qaytaring: \`return n * 2;\`.

### 2-xato: map va forEach ni chalkashtirish

\`\`\`javascript
const nums = [1, 2];
const a = nums.forEach((n) => n * 2); // a = undefined!
const b = nums.map((n) => n * 2); // b = [2, 4]
\`\`\`

**Nima bo'ladi:** \`forEach\` yangi massiv qaytarmaydi (doimo \`undefined\`). Yangi massiv yasash uchun faqat \`map\` ishlatiladi.
**To'g'ri varianti:** O'zgargan qiymatlardan yangi massiv kerak bo'lsa, \`map\` dan foydalaning.

### 3-xato: map elementlar sonini kamaytiradi deb o'ylash

\`\`\`javascript
const items = [1, 2, 3];
const evens = items.map((n) => {
  if (n % 2 === 0) return n;
});
console.log(evens); // [undefined, 2, undefined]
\`\`\`

**Nima bo'ladi:** \`map\` massiv uzunligini qisqartirmaydi: agar kirishda 3 ta element bo'lsa, natijada ham har doim 3 ta element bo'ladi.
**To'g'ri varianti:** Shartga qarab elementlarni tanlab olish uchun keyingi darsdagi \`filter\` metodi ishlatiladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`prices = [100, 200, 300]\` massivi berilgan. \`map\` yordamida har bir narxga 10 qo'shilgan yangi massiv (\`newPrices\`) hosil qiling va uni konsolga chiqaring (\`[110, 210, 310]\`).

### 2-mashq (o'rtacha)
\`words = ["olma", "anor"]\` massivi berilgan. \`map\` yordamida har bir so'zning uzunligini (\`word.length\`) hisoblab, yangi \`lengths\` massiviga saqlang va uni konsolga chiqaring (\`[4, 4]\`).

### 3-mashq (chegara holat)
\`numbers = [5, 12]\` massivi berilgan. Arrow funksiyaning ixcham (bir qatorli) yozuvidan foydalanib (\`numbers.map(n => n * 10)\`), sonlarni 10 ga ko'paytiring va yangi massivni konsolga chiqaring (\`[50, 120]\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const prices = [100, 200, 300];

const newPrices = prices.map((price) => {
  return price + 10;
});

console.log(newPrices); // [ 110, 210, 310 ]
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const words = ["olma", "anor"];

const lengths = words.map((word) => {
  return word.length;
});

console.log(lengths); // [ 4, 4 ]
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const numbers = [5, 12];

const result = numbers.map((n) => n * 10);

console.log(result); // [ 50, 120 ]
\`\`\`

---

## 9. Xulosa

1. \`map()\` massivning har bir elementini o'zgartirib, aynan shu uzunlikdagi butunlay yangi massiv qaytaradi.
2. Callback funksiya ichida har doim yangi qiymatni qaytaruvchi \`return\` bo'lishi shart.
3. \`map()\` boshlang'ich massivni o'zgartirmaydi, uni butun holda saqlaydi.

Keyingi darsda: Shartga mos keladigan elementlarni saralab oluvchi — filter metodi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Narxlarni 10 ga oshiruvchi map",
      instruction: "`prices = [100, 200, 300]` massivi elementlariga `map` orqali 10 qo'shib, yangi `newPrices` massivini hosil qiling va uni konsolga chiqaring.",
      startingCode: "const prices = [100, 200, 300];\n// map orqali har bir narxga 10 qo'shing va yangi massivni chiqaring\n",
      hint: "const newPrices = prices.map(price => price + 10);\nconsole.log(newPrices);",
      test: "if (!code.includes('map')) return 'map metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('110') && m.includes('310'))) return null;\nreturn 'Natijada [110, 210, 310] chiqmadi';"
    },
    {
      id: 2,
      title: "So'zlar uzunligidan yangi massiv tuzish",
      instruction: "`words = [\"olma\", \"anor\"]` massividan `map` orqali har bir so'z uzunligini olib, `lengths` nomli yangi massiv yarating va konsolga chiqaring.",
      startingCode: "const words = [\"olma\", \"anor\"];\n// map yordamida so'zlar uzunligini chiqaring\n",
      hint: "const lengths = words.map(w => w.length);\nconsole.log(lengths);",
      test: "if (!code.includes('map')) return 'map metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('4'))) return null;\nreturn 'So\\'zlar uzunligi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Sonlarni 10 ga ko'paytirish",
      instruction: "`numbers = [5, 12]` massividan `map` orqali har bir sonni 10 ga ko'paytirib, natijani konsolga chiqaring.",
      startingCode: "const numbers = [5, 12];\n// map orqali 10 ga ko'paytirib konsolga chiqaring\n",
      hint: "const result = numbers.map(n => n * 10);\nconsole.log(result);",
      test: "if (!code.includes('map')) return 'map metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('50') && m.includes('120'))) return null;\nreturn '50 va 120 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "map() metodining asosiy vazifasi nima?",
      options: [
        "Har bir elementni o'zgartirib, yangi massiv qaytarish",
        "Faqat massiv elementlarini konsolga chiqarish",
        "Massivning oxirgi elementini o'chirish",
        "Massiv uzunligini qisqartirish"
      ],
      correctAnswer: 0,
      explanation: "map() har bir element ustida callback funksiyani bajaradi va natijalardan iborat yangi massiv qaytaradi."
    },
    {
      id: 2,
      question: "map callback funksiyasida return yozilmasa nima bo'ladi?",
      options: [
        "Yangi massiv elementlari undefined bo'lib qoladi",
        "SyntaxError beradi",
        "Massiv o'zgarmasdan qoladi",
        "Avtomatik 0 qaytariladi"
      ],
      correctAnswer: 0,
      explanation: "Agar return yozilmasa, callback avtomatik undefined qaytaradi va yangi massiv [undefined, ...] bo'lib qoladi."
    },
    {
      id: 3,
      question: "map() metodi asl (boshlang'ich) massivni o'zgartiradimi?",
      options: [
        "Yo'q, asl massiv o'zgarmaydi, butunlay yangi massiv yaratiladi",
        "Ha, asl massiv to'g'ridan-to'g'ri o'zgaradi",
        "Faqat birinchi element o'zgaradi",
        "Faqat sonlar massivi bo'lsa o'zgaradi"
      ],
      correctAnswer: 0,
      explanation: "map() metodi xavfsiz bo'lib, u asl massivga tegmaydi va mutlaqo yangi massiv qaytaradi."
    }
  ]
};
