export const forEachBasics = {
  id: "forEachBasics",
  title: "forEach Metodi",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, o'qituvchi o'quvchilarining daftarlarini birma-bir tekshirmoqda. U har bir daftarni ochganda, oldindan belgilangan bir xil topshiriqni bajaradi: daftarga "yulduzcha qo'yish" (callback). O'qituvchining o'zi daftarlarni tartib bilan olib, yordamchisiga: "Mana bu daftarni ham tekshir, keyingisini ham tekshir" deb uzatadi.
JavaScript dagi \`forEach()\` metodi ham xuddi shunday ishlaydi: u massivdagi har bir elementni olib, biz bergan callback funksiyaga navbatma-navbat uzatadi.

**forEach() metodi** — massivdagi har bir element uchun biz bergan callback funksiyani boshidan oxirigacha avtomatik chaqirib beruvchi massiv metodidir.

*Yangi terminlar:*
- **forEach() metodi** — massiv elementlari ustida callback funksiya orqali sikl hosil qiluvchi buyruq.
- **Iteratsiya (aylanish)** — massivdagi bitta element bilan ishlash qadami.

---

## 2. Nega kerak?

Massiv elementlarini aylanish uchun qo'lda sikl yozish kodni cho'zib yuboradi:

\`\`\`javascript
// Eski usul:
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\`

\`forEach()\` metodi JavaScript dagi eng mashhur massiv metodlaridan biri bo'lib, sikl yozmasdan to'g'ridan-to'g'ri: "Har bir element uchun mana bu funksiyani ishlat!" deyish imkonini beradi:

\`\`\`javascript
fruits.forEach((fruit) => {
  console.log(fruit);
});
\`\`\`

Bu kodni qisqa, tushunarli va zamonaviy qiladi.

---

## 3. Birinchi misol

Bu kod massivdagi mevalarni \`forEach\` orqali konsolga chiqaradi.

\`\`\`javascript
const fruits = ["Olma", "Banan", "Gilos"];

fruits.forEach((fruit) => { // har bir element uchun callback chaqiriladi
  console.log(fruit); // ekranga chiqarish
});
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
- \`fruits.forEach(...)\` — \`forEach\` metodi chaqirilmoqda. U o'ziga argument sifatida callback funksiyani qabul qiladi.
- \`(fruit) => { ... }\` — biz uzatgan callback funksiya. Massivdagi har bir element navbat bilan \`fruit\` parametriga keladi.
- \`console.log(fruit);\` — callback tanasi. U har bir meva uchun alohida ishga tushadi.
- Muhim: \`forEach\` hech narsa qaytarmaydi (doimo \`undefined\` qaytaradi). U faqat elementlar ustida harakat bajarish uchun xizmat qiladi.

---

## 5. Qadamma-qadam (trace)

\`forEach\` ning ishlash bosqichlari:

| Qadam | forEach qiladigan ish | Callback ga kelgan qiymat (\`fruit\`) | Konsolga nima chiqadi? |
|---|---|---|---|
| 1 | 0-indeksdagi elementni oladi | "Olma" | Olma |
| 2 | 1-indeksdagi elementni oladi | "Banan" | Banan |
| 3 | 2-indeksdagi elementni oladi | "Gilos" | Gilos |
| Tugash | Barcha elementlar tugadi | — | Sikl yakunlandi |

---

## 6. Yana bitta misol

1-misoldan farqi: Callback funksiya ikkinchi parametr sifatida elementning indeksini ham qabul qilishi mumkin.

\`\`\`javascript
const names = ["Ali", "Vali", "Sami"];

names.forEach((name, index) => { // nom va indeks
  console.log(index + ": " + name);
});
\`\`\`

\`\`\`text
// Natija:
0: Ali
1: Vali
2: Sami
\`\`\`

Tahlil:
- \`forEach\` birinchi parametrga element qiymatini (\`name\`), ikkinchi parametrga esa uning indeksini (\`index\`) avtomatik uzatadi.
- Natijada har bir ism o'z tartib raqami bilan birga chiqadi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: forEach dan return orqali natija olishga urinish

\`\`\`javascript
const numbers = [1, 2, 3];

const result = numbers.forEach((n) => {
  return n * 2; // XATO: forEach natija qaytarmaydi!
});

console.log(result); // undefined
\`\`\`

**Nima bo'ladi:** \`forEach\` har doim \`undefined\` qaytaradi, uning ichida \`return\` yozish yangi massiv yaratmaydi.
**To'g'ri varianti:** Faqat ekranga chiqarish yoki tashqi o'zgaruvchini yangilash uchun \`forEach\` ishlatiladi. Yangi massiv yasash uchun keyingi darsda \`map\` o'rganiladi.

### 2-xato: forEach ichida break yoki continue ishlatish

\`\`\`javascript
const list = [1, 2, 3];

list.forEach((n) => {
  if (n === 2) break; // XATO: SyntaxError: Illegal break statement
});
\`\`\`

**Nima bo'ladi:** \`forEach\` oddiy sikl emas, funksiya bo'lgani sababli uning ichida \`break\` yoki \`continue\` ishlamaydi.
**To'g'ri varianti:** Agar siklni to'xtatish (\`break\`) kerak bo'lsa, \`for...of\` siklidan foydalaning.

### 3-xato: Callback parametrini yozishni unutish

\`\`\`javascript
const items = ["A", "B"];

items.forEach(() => { // parametr bo'sh!
  console.log("Salom"); // 2 marta Salom chiqadi, lekin element qiymati olinmaydi
});
\`\`\`

**Nima bo'ladi:** Element qiymatini olib bo'lmaydi.
**To'g'ri varianti:** Qavs ichida parametr nomini ko'rsating: \`items.forEach((item) => { ... });\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`cities = ["Toshkent", "Samarqand", "Buxoro"]\` massivi berilgan. \`forEach\` metodidan foydalanib har bir shaharni konsolga chiqaring.

### 2-mashq (o'rtacha)
\`numbers = [2, 4, 6]\` massivi berilgan. \`forEach\` yordamida har bir sonning kvadratini (\`n * n\`) hisoblab, konsolga chiqaring (\`4\`, \`16\`, \`36\`).

### 3-mashq (chegara holat)
\`animals = ["Sher", "Bo'ri"]\` massivi berilgan. \`forEach((animal, index) => ...)\` yordamida har bir hayvon nomini 1 dan boshlanuvchi tartib raqami bilan chiqaring (\`index + 1 + ". " + animal\`, ya'ni \`"1. Sher"\`, \`"2. Bo'ri"\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const cities = ["Toshkent", "Samarqand", "Buxoro"];

cities.forEach((city) => {
  console.log(city);
});
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const numbers = [2, 4, 6];

numbers.forEach((n) => {
  console.log(n * n);
});
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const animals = ["Sher", "Bo'ri"];

animals.forEach((animal, index) => {
  console.log(index + 1 + ". " + animal);
});
\`\`\`

---

## 9. Xulosa

1. \`massiv.forEach(callback)\` — massivdagi har bir element uchun berilgan callback funksiyani ishga tushiradi.
2. Callback parametr sifatida 1-navbatda element qiymatini, 2-navbatda uning indeksini oladi.
3. \`forEach\` doimo \`undefined\` qaytaradi va uning ichida \`break\` operatori ishlamaydi.

Keyingi darsda: Massiv elementlarini o'zgartirib, yangi massiv yaratish — map metodi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "cities massivini forEach bilan chiqarish",
      instruction: "`cities = [\"Toshkent\", \"Samarqand\", \"Buxoro\"]` massivining har bir elementini `forEach` orqali konsolga chiqaring.",
      startingCode: "const cities = [\"Toshkent\", \"Samarqand\", \"Buxoro\"];\n// forEach yordamida konsolga chiqaring\n",
      hint: "cities.forEach((city) => {\n  console.log(city);\n});",
      test: "if (!code.includes('forEach')) return 'forEach metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Toshkent')) && out.some(m => m.includes('Buxoro'))) return null;\nreturn 'Shaharlar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Sonlar kvadratini forEach bilan chiqarish",
      instruction: "`numbers = [2, 4, 6]` massividagi har bir sonning kvadratini (`n * n`) `forEach` yordamida konsolga chiqaring.",
      startingCode: "const numbers = [2, 4, 6];\n// forEach orqali har bir son kvadratini chiqaring\n",
      hint: "numbers.forEach((n) => {\n  console.log(n * n);\n});",
      test: "if (!code.includes('forEach')) return 'forEach metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('4')) && out.some(m => m.includes('36'))) return null;\nreturn 'Sonlar kvadrati konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Indeks bilan tartib raqam chiqarish",
      instruction: "`animals = [\"Sher\", \"Bo'ri\"]` massividan foydalanib, `forEach` dagi `index` yordamida har bir hayvonni `\"1. Sher\"` va `\"2. Bo'ri\"` ko'rinishida konsolga chiqaring.",
      startingCode: "const animals = [\"Sher\", \"Bo'ri\"];\n// forEach va index orqali tartib bilan chiqaring\n",
      hint: "animals.forEach((animal, index) => {\n  console.log(index + 1 + \". \" + animal);\n});",
      test: "if (!code.includes('forEach')) return 'forEach metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('1. Sher')) && out.some(m => m.includes('2. Bo'))) return null;\nreturn '1. Sher va 2. Bo\\'ri konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "forEach() metodiga argument sifatida nima beriladi?",
      options: [
        "Callback funksiya",
        "Faqat bitta son",
        "Sikl sharti",
        "Massiv uzunligi"
      ],
      correctAnswer: 0,
      explanation: "forEach() metodi har bir element uchun bajarilishi kerak bo'lgan callback funksiyani qabul qiladi."
    },
    {
      id: 2,
      question: "forEach() metodi nima qaytaradi?",
      options: [
        "undefined",
        "Yangi o'zgargan massiv",
        "Massiv uzunligini",
        "true yoki false"
      ],
      correctAnswer: 0,
      explanation: "forEach() hech narsa qaytarmaydi, ya'ni uning qaytaruvchi qiymati doimo undefined bo'ladi."
    },
    {
      id: 3,
      question: "forEach callback funksiyasi ikkinchi parametr sifatida nima qabul qiladi?",
      options: [
        "Joriy elementning indeksini",
        "Element turini",
        "Massivning oxirgi elementini",
        "Hech narsa qabul qilmaydi"
      ],
      correctAnswer: 0,
      explanation: "forEach callback funksiyasining birinchi parametri element qiymati, ikkinchi parametri esa uning indeksi hisoblanadi: (element, index) => {}."
    }
  ]
};
