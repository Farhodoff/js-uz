export const arrayBasics = {
  id: "arrayBasics",
  title: "Massiv Yaratish va Murojaat",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, do'kondan tuxum sotib oldingiz. Tuxumlar har xil joyga sochilib yotmaydi, balki 0 dan boshlab raqamlangan maxsus katakchali qutida (tuxumdon) qatorda birga saqlanadi. Har bir tuxumni o'z katakcha raqami orqali topib olishingiz mumkin.
JavaScript da massiv ham xuddi shunday katakchali ro'yxatdir: bir nechta qiymatlar bitta o'zgaruvchi ichida tartib bilan saqlanadi.

**Massiv (array)** — bir nechta qiymatlarni bitta o'zgaruvchida, tartiblangan ro'yxat ko'rinishida saqlash uchun ishlatiladigan maxsus ma'lumot tuzilmasidir.

*Yangi terminlar:*
- **Massiv (array)** — kvadrat qavslar \`[ ]\` ichida vergul bilan ajratib yoziladigan tartiblangan qiymatlar ro'yxati.
- **Element (element)** — massiv ichidagi har bir alohida qiymat.
- **Indeks (index)** — elementning massivdagi tartib raqami (diqqat: sanoq har doim \`0\` dan boshlanadi!).
- **Length (uzunlik)** — massivda nechta element borligini ko'rsatuvchi xususiyat (\`massiv.length\`).

---

## 2. Nega kerak?

Agar bizda 5 ta meva yoki 10 ta talaba ismi bo'lsa, har biriga alohida o'zgaruvchi ochish kerak bo'lardi:

\`\`\`javascript
// Muammo: Har bir ma'lumot uchun alohida o'zgaruvchi ochish
let fruit1 = "Olma";
let fruit2 = "Banan";
let fruit3 = "Gilos";
\`\`\`

Agar ma'lumotlar 100 ta bo'lsa, 100 ta alohida o'zgaruvchi yaratish juda noqulay va deyarli imkonsiz bo'lib qoladi. Massiv yordamida barcha ma'lumotlarni bitta umumiy ro'yxatga birlashtiramiz va ularga o'z tartib raqami (indeksi) orqali osongina murojaat qilamiz: \`const fruits = ["Olma", "Banan", "Gilos"];\`.

---

## 3. Birinchi misol

Bu kod 3 ta meva nomidan iborat massiv yaratadi, uning birinchi va ikkinchi elementlarini hamda umumiy uzunligini konsolga chiqaradi.

\`\`\`javascript
const fruits = ["Olma", "Banan", "Gilos"]; // 3 ta elementli massiv

console.log(fruits[0]); // birinchi element (indeks 0)
console.log(fruits[1]); // ikkinchi element (indeks 1)
console.log(fruits.length); // massivdagi elementlar soni
\`\`\`

\`\`\`text
// Natija:
Olma
Banan
3
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const fruits = ["Olma", "Banan", "Gilos"];\` — massiv kvadrat qavs \`[\` bilan ochiladi va \`]\` bilan yopiladi. Ichidagi elementlar vergul bilan ajratiladi. Massivlar uchun odatda \`const\` ishlatiladi.
- \`fruits[0]\` — massiv elementini o'qish uchun massiv nomidan keyin kvadrat qavsda uning **indeksi** yoziladi. Dasturlashda sanoq har doim **0 dan** boshlanadi, shuning uchun birinchi element \`fruits[0]\` bo'ladi ("Olma").
- \`fruits[1]\` — ikkinchi elementning indeksi \`1\` ga teng ("Banan").
- \`fruits.length\` — nuqta va \`length\` so'zi massivda jami nechta element borligini bildiradi (bu yerda 3 ta).

---

## 5. Qadamma-qadam (trace)

Massivdagi elementlar va indekslar jadvali:

| Indeks | Element | Murojaat kodi | Qiymat |
|---|---|---|---|
| 0 | 1-element | \`fruits[0]\` | "Olma" |
| 1 | 2-element | \`fruits[1]\` | "Banan" |
| 2 | 3-element | \`fruits[2]\` | "Gilos" |

Massiv uzunligi: \`fruits.length\` = 3.
Oxirgi element indeksi esa har doim: \`fruits.length - 1\` = 2.

---

## 6. Yana bitta misol

1-misoldan farqi: Sonlardan iborat massiv va oxirgi elementni \`.length - 1\` formulasi orqali topish.

\`\`\`javascript
const scores = [85, 92, 78, 95];

let lastIndex = scores.length - 1; // 4 - 1 = 3
console.log(scores[lastIndex]); // oxirgi element
\`\`\`

\`\`\`text
// Natija:
95
\`\`\`

Tahlil:
- Massivda 4 ta son bor: \`scores.length\` qiymati \`4\` ga teng.
- Oxirgi elementning indeksi esa \`4 - 1 = 3\` bo'ladi.
- \`scores[3]\` oxirgi son — \`95\` ni konsolga chiqaradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Indeksni 0 o'rniga 1 dan boshlash

\`\`\`javascript
const colors = ["Qizil", "Yashil", "Ko'k"];
console.log(colors[1]); // Birinchi element deb o'ylash
\`\`\`

**Nima bo'ladi:** Birinchi element ("Qizil") emas, balki ikkinchi element ("Yashil") chiqadi! Chunki birinchi elementning indeksi doimo 0 dir.
**To'g'ri varianti:** Birinchi element uchun \`colors[0]\` deb yozish kerak.

### 2-xato: Mavjud bo'lmagan indeksga murojaat qilish

\`\`\`javascript
const items = ["Qalam", "Daftar"];
console.log(items[5]); // indeks 5 mavjud emas!
\`\`\`

**Nima bo'ladi:** JavaScript xato bermaydi, lekin qiymat yo'qligi sababli \`undefined\` qaytaradi.
**To'g'ri varianti:** Faqat massivda mavjud bo'lgan indekslarga (0 dan \`length - 1\` gacha) murojaat qilish kerak.

### 3-xato: length ni funksiya deb o'ylab qavs () qo'yish

\`\`\`javascript
const list = [1, 2, 3];
console.log(list.length()); // XATO: TypeError: list.length is not a function
\`\`\`

**Nima bo'ladi:** \`length\` bu funksiya emas, massivning xususiyati (property) hisoblanadi, shuning uchun \`TypeError\` xatosi chiqadi.
**To'g'ri varianti:** Qavslarsiz \`list.length\` deb yozing.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`animals\` nomli massiv yarating: \`"Mushuk"\`, \`"Kuchuk"\`, \`"Ot"\`. Uning birinchi elementini (\`animals[0]\`) konsolga chiqaring.

### 2-mashq (o'rtacha)
\`numbers\` nomli sonlar massivini yarating: \`10, 20, 30, 40, 50\`. Massivning umumiy uzunligini (\`numbers.length\`) konsolga chiqaring (5).

### 3-mashq (chegara holat)
Quyidagi massiv berilgan: \`const letters = ["A", "B", "C", "D"];\`. Oxirgi elementini indeksni qo'lda son qilib yozmasdan, \`letters.length - 1\` orqali topib, konsolga chiqaring (\`"D"\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const animals = ["Mushuk", "Kuchuk", "Ot"];
console.log(animals[0]); // Mushuk
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const numbers = [10, 20, 30, 40, 50];
console.log(numbers.length); // 5
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const letters = ["A", "B", "C", "D"];
console.log(letters[letters.length - 1]); // D
\`\`\`

---

## 9. Xulosa

1. Massiv — bir nechta qiymatlarni bitta ro'yxatda \`[ ]\` kvadrat qavslar ichida saqlash usulidir.
2. Elementlarga murojaat \`0\` dan boshlanuvchi indeks orqali amalga oshiriladi: \`massiv[0]\`.
3. \`massiv.length\` elementlar sonini bildiradi, oxirgi element indeksi esa doimo \`massiv.length - 1\` bo'ladi.

Keyingi darsda: Massiv oxiriga element qo'shish va olib tashlash — push va pop metodlari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "animals massivi va birinchi element",
      instruction: "`animals` nomli massiv yarating: `\"Mushuk\"`, `\"Kuchuk\"`, `\"Ot\"`. Uning birinchi elementini konsolga chiqaring.",
      startingCode: "// animals massivini yarating va birinchi elementni chiqaring\n",
      hint: "const animals = [\"Mushuk\", \"Kuchuk\", \"Ot\"];\nconsole.log(animals[0]);",
      test: "if (!code.includes('animals')) return 'animals massivi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Mushuk'))) return null;\nreturn 'Konsolga \"Mushuk\" chiqmadi';"
    },
    {
      id: 2,
      title: "numbers massivining uzunligi",
      instruction: "`numbers` nomli massiv yarating: `10, 20, 30, 40, 50`. Massiv uzunligini (`numbers.length`) konsolga chiqaring.",
      startingCode: "// numbers massivini yarating va uzunligini chiqaring\n",
      hint: "const numbers = [10, 20, 30, 40, 50];\nconsole.log(numbers.length);",
      test: "if (!code.includes('length')) return 'length ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('5'))) return null;\nreturn 'Konsolga 5 chiqmadi';"
    },
    {
      id: 3,
      title: "Oxirgi elementni length - 1 bilan topish",
      instruction: "`letters` massivining oxirgi elementini `letters.length - 1` orqali topib, konsolga chiqaring.",
      startingCode: "const letters = [\"A\", \"B\", \"C\", \"D\"];\n// letters ning oxirgi elementini konsolga chiqaring\n",
      hint: "console.log(letters[letters.length - 1]);",
      test: "if (!code.includes('length')) return 'length ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('D'))) return null;\nreturn 'Konsolga \"D\" chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Massivning birinchi elementi qaysi indeksda joylashadi?",
      options: [
        "0",
        "1",
        "-1",
        "first"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da (va ko'pgina dasturlash tillarida) indekslash doimo 0 dan boshlanadi."
    },
    {
      id: 2,
      question: "Massivda nechta element borligini qanday bilish mumkin?",
      options: [
        "massiv.length",
        "massiv.length()",
        "massiv.count",
        "massiv.size()"
      ],
      correctAnswer: 0,
      explanation: "Massiv uzunligini bilish uchun massiv.length xususiyatidan (qavslarsiz) foydalaniladi."
    },
    {
      id: 3,
      question: "Massivda mavjud bo'lmagan indeksga murojaat qilinsa (masalan: [1, 2][10]) nima qaytadi?",
      options: [
        "undefined",
        "null",
        "0",
        "IndexError"
      ],
      correctAnswer: 0,
      explanation: "JavaScript mavjud bo'lmagan indeks uchun xato bermaydi, balki undefined qaytaradi."
    }
  ]
};
