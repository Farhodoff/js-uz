export const arrayDestructuringBasics = {
  id: "arrayDestructuringBasics",
  title: "Massiv Destructuring: Qiymatlarni Ajratib Olish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'kondan qutida ikkita meva sotib oldingiz: birinchi bo'limda olma, ikkinchisida nok turibdi. Siz ularni qutidan olib, oshxonada alohida ikkita idishga (birini mevalar idishiga, ikkinchisini muzlatkichga) qo'ymoqchisiz.

JavaScript da **massiv destructuring** aynan shunday ishlaydi: u massiv ichidagi elementlarni navbati bilan alohida o'zgaruvchilarga taqsimlab beradi.

**Massiv destructuring (destrukturizatsiya)** — massiv elementlarini indeks bo'yicha tartib bilan yangi o'zgaruvchilarga bitta qatorda ajratib olish sintaksisidir (\`const [a, b] = array;\`).

*Yangi terminlar:*
- **Destructuring** — to'plam (massiv) ichidagi ma'lumotlarni o'zgaruvchilarga ochib taqsimlash.
- **Massiv destructuring sintaksisi** — tenglikning chap tomonida kvadrat qavs \`[x, y]\` qo'llash orqali yangi o'zgaruvchilar e'lon qilish.

---

## 2. Nega kerak?

Ilgari massivdagi har bir elementni alohida o'zgaruvchiga olish uchun indekslar orqali birma-bir yozish kerak edi:
\`\`\`javascript
const colors = ["Qizil", "Yashil"];
const firstColor = colors[0];
const secondColor = colors[1];
\`\`\`
Bu usulda har bir element uchun yangi qator ochish va \`[0]\`, \`[1]\` deb takroriy yozish talab etilardi.

Destructuring bilan bularning barchasini bitta qisqa qatorda yozish mumkin:
\`\`\`javascript
const [firstColor, secondColor] = colors;
\`\`\`
Kod ancha ixcham, toza va o'qishga oson bo'ladi.

---

## 3. Birinchi misol

Bu kod massivdan ikkita elementni alohida o'zgaruvchilarga ajratib oladi.

\`\`\`javascript
const colors = ["Qizil", "Yashil"];

const [firstColor, secondColor] = colors; // massiv elementlarini ajratib olish

console.log(firstColor); // "Qizil"
console.log(secondColor); // "Yashil"
\`\`\`

\`\`\`text
// Natija:
Qizil
Yashil
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const colors = ["Qizil", "Yashil"];\` — ikkita elementdan iborat oddiy massiv e'lon qilindi.
- \`const [firstColor, secondColor] = colors;\` — destructuring sintaksisi. Chap tomondagi kvadrat qavs yangi massiv yaratmayapti, balki yangi o'zgaruvchilar ochmoqda:
  - 1-o'rindagi \`firstColor\` o'zgaruvchisiga massivning \`0\`-elementi (\`"Qizil"\`) tushadi.
  - 2-o'rindagi \`secondColor\` o'zgaruvchisiga massivning \`1\`-elementi (\`"Yashil"\`) tushadi.
- \`console.log(firstColor);\` — konsolga \`"Qizil"\` chiqadi.
- \`console.log(secondColor);\` — konsolga \`"Yashil"\` chiqadi.

---

## 5. Qadamma-qadam (trace)

O'zgaruvchilarga qiymat taqsimlanishi:

| O'zgaruvchi nomi | Olingan massiv indeksi | Qiymat | Izoh |
|---|---|---|---|
| \`firstColor\` | \`colors[0]\` | \`"Qizil"\` | Birinchi element berildi |
| \`secondColor\` | \`colors[1]\` | \`"Yashil"\` | Ikkinchi element berildi |

---

## 6. Yana bitta misol

1-misoldan farqi: Keraksiz o'rtadagi elementni vergul orqali tashlab ketish (o'tkazib yuborish).

\`\`\`javascript
const numbers = [10, 20, 30];

const [first, , third] = numbers; // ikkinchi elementni tashlab ketish

console.log(first); // 10
console.log(third); // 30
\`\`\`

\`\`\`text
// Natija:
10
30
\`\`\`

Tahlil:
- \`[first, , third]\` — ikki vergul orasida o'zgaruvchi nomi yozilmagani sababli, 1-indeksdagi \`20\` soni hech qayerga biriktirilmaydi va tashlab ketiladi.
- Natijada \`third\` o'zgaruvchisiga 2-indeksdagi \`30\` tushadi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: O'ng tomonga massiv emas, iterable bo'lmagan qiymat qo'yish

\`\`\`javascript
const [a, b] = null; // XATO: TypeError: null is not iterable
\`\`\`

**Nima bo'ladi:** Massiv destructuring faqat aylanuvchi to'plamlar (massivlar) bilan ishlaydi. \`null\` yoki \`undefined\` berilsa, dastur to'xtaydi.
**To'g'ri varianti:** O'ng tomonda doim massiv bo'lishi kerak: \`const [a, b] = [1, 2];\`.

### 2-xato: Massivda element yetarli bo'lmaganda

\`\`\`javascript
const [first, second] = ["Salom"];

console.log(second); // undefined
\`\`\`

**Nima bo'ladi:** Dastur xato bermaydi, lekin massivda 2-element yo'qligi sababli \`second\` o'zgaruvchisi avtomatik tarzda \`undefined\` bo'lib qoladi.
**To'g'ri varianti:** Massivda kerakli miqdorda element borligini tekshirish.

### 3-xato: Massiv uchun kvadrat qavs o'rniga figurali qavs ishlatish

\`\`\`javascript
const fruits = ["Olma", "Banan"];
const { first, second } = fruits; // XATO: massiv uchun mos emas
\`\`\`

**Nima bo'ladi:** Massiv elementlari indeks bo'yicha joylashadi, shuning uchun ularni faqat kvadrat qavs \`[ ]\` bilan ajratish kerak. Figurali qavs \`{ }\` esa obyektlar uchun ishlatiladi.
**To'g'ri varianti:** \`const [first, second] = fruits;\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`animals = ["Mushuk", "It"]\` massivi berilgan. Destructuring orqali \`first\` va \`second\` o'zgaruvchilarini e'lon qilib, \`first\` ni konsolga chiqaring (\`"Mushuk"\`).

### 2-mashq (o'rtacha)
\`coords = [100, 250]\` massivi berilgan. Destructuring yordamida \`[x, y]\` o'zgaruvchilarini oling va ularning yig'indisini (\`x + y\`) konsolga chiqaring (\`350\`).

### 3-mashq (chegara holat)
\`scores = [10, 20, 30]\` massivi berilgan. Destructuring orqali 1- va 3-elementni oling (o'rtadagi 2-elementni bo'sh vergul bilan o'tkazib yuboring: \`[first, , third]\`) va \`third\` ni konsolga chiqaring (\`30\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const animals = ["Mushuk", "It"];
const [first, second] = animals;

console.log(first); // "Mushuk"
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const coords = [100, 250];
const [x, y] = coords;

console.log(x + y); // 350
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const scores = [10, 20, 30];
const [first, , third] = scores;

console.log(third); // 30
\`\`\`

---

## 9. Xulosa

1. Massiv destructuring — \`const [a, b] = array\` sintaksisi orqali massiv elementlarini o'zgaruvchilarga qisqa va qulay ajratib olishdir.
2. Elementlar massivdagi tartib (indeks) bo'yicha navbatma-navbat o'zgaruvchilarga biriktiriladi.
3. Keraksiz elementni tashlab ketish uchun bo'sh vergul qo'yish yetarli: \`[first, , third]\`.

Keyingi darsda: Obyektdan xususiyatlarni ajratib olish — obyekt destructuring bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Massivdan birinchi elementni ajratish",
      instruction: "`animals = [\"Mushuk\", \"It\"]` massivi berilgan. Destructuring orqali `first` va `second` o'zgaruvchilariga ajrating va `first` ni konsolga chiqaring.",
      startingCode: "const animals = [\"Mushuk\", \"It\"];\n// Destructuring orqali [first, second] ni oling va first ni chiqaring\n",
      hint: "const [first, second] = animals;\nconsole.log(first);",
      test: "if (!code.includes('[') || !code.includes(']')) return 'Massiv destructuring ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('Mushuk')) return null;\nreturn 'Mushuk konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Koordinatalar yig'indisini hisoblash",
      instruction: "`coords = [100, 250]` massivi berilgan. Destructuring yordamida `[x, y]` oling va ularning yig'indisini (`x + y`) konsolga chiqaring.",
      startingCode: "const coords = [100, 250];\n// Destructuring orqali [x, y] ni oling va x + y ni chiqaring\n",
      hint: "const [x, y] = coords;\nconsole.log(x + y);",
      test: "if (!code.includes('[') || !code.includes(']')) return 'Massiv destructuring ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('350'))) return null;\nreturn 'Yig\\'indi 350 chiqmadi';"
    },
    {
      id: 3,
      title: "Elementni o'tkazib yuborish (skip)",
      instruction: "`scores = [10, 20, 30]` massivi berilgan. Destructuring orqali 1- va 3-elementni oling (`[first, , third]`) va `third` ni konsolga chiqaring.",
      startingCode: "const scores = [10, 20, 30];\n// 2-elementni o'tkazib yuborib third ni oling va konsolga chiqaring\n",
      hint: "const [first, , third] = scores;\nconsole.log(third);",
      test: "if (!/,\\s*,/.test(code)) return 'Elementni vergul bilan o\\'tkazib yuborish ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('30')) return null;\nreturn '30 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Massiv destructuring sintaksisi to'g'ri ko'rsatilgan qatorni toping:",
      options: [
        "const [a, b] = numbers;",
        "const {a, b} = numbers;",
        "const (a, b) = numbers;",
        "const a, b = numbers;"
      ],
      correctAnswer: 0,
      explanation: "Massivlar elementlarini tartib bilan ajratib olish uchun kvadrat qavslardan foydalaniladi: const [a, b] = numbers;."
    },
    {
      id: 2,
      question: "const [x, y] = [5]; kodida y o'zgaruvchisining qiymati nima bo'ladi?",
      options: [
        "undefined",
        "null",
        "0",
        "Xatolik (ReferenceError) beradi"
      ],
      correctAnswer: 0,
      explanation: "Massivda mos indeksdagi element bo'lmasa, o'zgaruvchi xatolik bermaydi, balki undefined qiymatini oladi."
    },
    {
      id: 3,
      question: "Massiv destructuring da o'rtadagi keraksiz elementni qanday o'tkazib yuborish mumkin?",
      options: [
        "Ikki vergul orasini bo'sh qoldirish orqali: [a, , c]",
        "delete so'zini yozish orqali: [a, delete, c]",
        "skip so'zini yozish orqali: [a, skip, c]",
        "O'tkazib yuborishning iloji yo'q"
      ],
      correctAnswer: 0,
      explanation: "Shunchaki vergullar orasini bo'sh qoldirish ([a, , c]) orqali o'sha indeksdagi elementni tashlab ketish mumkin."
    }
  ]
};
