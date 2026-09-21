export const pushPopBasics = {
  id: "pushPopBasics",
  title: "push va pop Metodlari",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz kitoblarni ustma-ust taxlab bitta ustun hosil qildingiz. Yangi kitob kelsa, uni eng tepaga (oxiriga) qo'yasiz — bu \`push\`. Bitta kitob olmoqchi bo'lsangiz, yana eng tepadan (oxiridan) bitta kitobni sug'urib olasiz — bu \`pop\`.
JavaScript da massiv bilan ishlashda ham eng ko'p bajariladigan amal — ro'yxatning oxiriga element qo'shish yoki oxirgi elementni olib tashlashdir.

**push va pop** — massivning oxirgi qismi bilan ishlovchi maxsus metodlardir: \`push()\` oxiriga element qo'shadi, \`pop()\` esa eng oxirgi elementni sug'urib oladi.

*Yangi terminlar:*
- **push() metodi** — massivning oxiriga yangi element (yoki elementlar) qo'shuvchi buyruq.
- **pop() metodi** — massivning eng oxiridagi elementini o'chirib, o'sha elementni qaytaruvchi buyruq.

---

## 2. Nega kerak?

Massivga yangi ma'lumot qo'shish uchun uning indeksini qo'lda hisoblab yozish noqulay:

\`\`\`javascript
// Noqulay usul: Indeksni qo'lda hisoblash
const fruits = ["Olma", "Banan"];
fruits[2] = "Gilos"; // massivda nechta element borligini eslab qolish kerak
\`\`\`

Agar massivda yuzlab elementlar bo'lsa, oxirgi indeksni bilish qiyinlashadi. \`push\` va \`pop\` metodlari indekslarni o'ylamasdan, avtomatik ravishda ro'yxat oxiriga element qo'shish yoki oxirgisini xavfsiz sug'urib olish imkonini beradi.

---

## 3. Birinchi misol

Bu kod massiv oxiriga yangi meva qo'shadi va keyin oxirgi mevani sug'urib olib tashlaydi.

\`\`\`javascript
const fruits = ["Olma", "Banan"]; // boshlang'ich massiv

fruits.push("Gilos"); // oxiriga "Gilos" qo'shildi
console.log(fruits); // massiv tarkibi

let removed = fruits.pop(); // oxiridagi element sug'urib olindi
console.log(removed); // olib tashlangan element
console.log(fruits); // qolgan massiv
\`\`\`

\`\`\`text
// Natija:
[ 'Olma', 'Banan', 'Gilos' ]
Gilos
[ 'Olma', 'Banan' ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const fruits = ["Olma", "Banan"];\` — 2 ta elementdan iborat massiv. E'tibor bering: massiv \`const\` bilan yaratilgan bo'lsa ham, uning ichidagi elementlarni \`push\` va \`pop\` orqali bemalol o'zgartirish mumkin!
- \`fruits.push("Gilos");\` — \`fruits\` massivining oxiriga \`"Gilos"\` qo'shildi va massiv uzunligi 3 ga aylandi.
- \`let removed = fruits.pop();\` — massivning eng oxiridagi element ("Gilos") olib tashlandi va \`removed\` o'zgaruvchisiga saqlandi. Massivda esa faqat dastlabki 2 ta meva qoldi.
- \`console.log(removed);\` — o'chirilgan \`"Gilos"\` konsolga chiqdi.

---

## 5. Qadamma-qadam (trace)

Massiv holatining qadamma-qadam o'zgarishi:

| Qadam | Kod | Massiv tarkibi (\`fruits\`) | fruits.length | Qaytargan qiymati |
|---|---|---|---|---|
| 1 | \`const fruits = ["Olma", "Banan"];\` | \`["Olma", "Banan"]\` | 2 | — |
| 2 | \`fruits.push("Gilos");\` | \`["Olma", "Banan", "Gilos"]\` | 3 | 3 (yangi uzunlik) |
| 3 | \`let removed = fruits.pop();\` | \`["Olma", "Banan"]\` | 2 | "Gilos" (olib tashlangan element) |

---

## 6. Yana bitta misol

1-misoldan farqi: Bo'sh massiv yaratib, unga sonlarni ketma-ket \`push\` qilish va \`pop\` bilan chiqarib olish.

\`\`\`javascript
const numbers = []; // bo'sh massiv

numbers.push(10);
numbers.push(20);
numbers.push(30);

console.log(numbers); // [10, 20, 30]
console.log(numbers.pop()); // 30 (oxirgi son sug'urib olindi)
console.log(numbers.pop()); // 20 (keyingi oxirgi son)
console.log(numbers); // [10]
\`\`\`

\`\`\`text
// Natija:
[ 10, 20, 30 ]
30
20
[ 10 ]
\`\`\`

Tahlil:
- Har safar \`numbers.pop()\` chaqirilganda, o'sha paytdagi eng oxirgi son massivdan chiqib ketadi va konsolga chiqariladi.
- Oxirida massivda faqat \`[10]\` qoladi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: pop() metodiga argument berish

\`\`\`javascript
const list = [1, 2, 3];
list.pop(0); // XATO: pop hech qanday argument olmaydi!
console.log(list); // [1, 2] (3 o'chib ketdi!)
\`\`\`

**Nima bo'ladi:** \`pop()\` ichiga nima yozsangiz ham, u faqat eng oxirgi elementni olib tashlaydi. \`pop(0)\` birinchi elementni emas, oxirgi 3 ni o'chiradi.
**To'g'ri varianti:** \`pop()\` har doim bo'sh qavslar bilan chaqiriladi: \`list.pop()\`.

### 2-xato: Bo'sh massivdan pop() chaqirish

\`\`\`javascript
const empty = [];
let item = empty.pop();
console.log(item); // undefined
\`\`\`

**Nima bo'ladi:** Bo'sh massivda element yo'qligi sababli \`pop()\` xatolik bermaydi, balki \`undefined\` qaytaradi.
**To'g'ri varianti:** Element sug'urishdan oldin massiv bo'sh emasligiga (\`empty.length > 0\`) ishonch hosil qiling.

### 3-xato: const bilan e'lon qilingan massiv o'zgaruvchisiga yangi massiv tenglash

\`\`\`javascript
const items = [1, 2];
items.push(3); // To'g'ri: massiv ichidagi element o'zgardi
items = [4, 5]; // XATO: TypeError: Assignment to constant variable.
\`\`\`

**Nima bo'ladi:** \`const\` o'zgaruvchisiga yangi qiymat berib bo'lmaydi. Lekin uning ichidagi ma'lumotlarni \`push\` va \`pop\` orqali yangilash mumkin.
**To'g'ri varianti:** Massivni o'zgartirish uchun faqat metodlardan foydalaning, uni qayta tenglamang.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`colors = ["Qizil", "Yashil"]\` massivi berilgan. \`push\` metodidan foydalanib uning oxiriga \`"Sariq"\` rangini qo'shing va \`colors\` massivini konsolga chiqaring.

### 2-mashq (o'rtacha)
\`tasks = ["Dars qilish", "Kitob o'qish", "Dam olish"]\` massivi berilgan. \`pop()\` yordamida oxirgi vazifani sug'urib oling va uni konsolga chiqaring (\`"Dam olish"\`).

### 3-mashq (chegara holat)
Bo'sh \`queue = []\` massivini yarating. \`push\` orqali unga ketma-ket \`1\` va \`2\` sonlarini qo'shing. So'ngra bitta \`pop()\` chaqiring. Massivning qolgan uzunligini (\`queue.length\`) konsolga chiqaring (\`1\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const colors = ["Qizil", "Yashil"];
colors.push("Sariq");
console.log(colors); // [ 'Qizil', 'Yashil', 'Sariq' ]
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const tasks = ["Dars qilish", "Kitob o'qish", "Dam olish"];
let lastTask = tasks.pop();
console.log(lastTask); // Dam olish
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const queue = [];
queue.push(1);
queue.push(2);
queue.pop();
console.log(queue.length); // 1
\`\`\`

---

## 9. Xulosa

1. \`push(element)\` — massiv oxiriga element qo'shadi va uning uzunligini oshiradi.
2. \`pop()\` — massivning oxirgi elementini sug'urib olib tashlaydi va o'sha elementni qaytaradi.
3. \`const\` bilan yaratilgan massivning ichki elementlarini \`push\` va \`pop\` orqali bemalol o'zgartirish mumkin.

Keyingi darsda: Massiv elementlari bo'ylab sikl aylanish — for...of sikli bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "colors massiviga push qilish",
      instruction: "`colors = [\"Qizil\", \"Yashil\"]` massivining oxiriga `push` bilan `\"Sariq\"` rangini qo'shing va `colors` ni konsolga chiqaring.",
      startingCode: "const colors = [\"Qizil\", \"Yashil\"];\n// \"Sariq\" rangini qo'shing va colors ni konsolga chiqaring\n",
      hint: "colors.push(\"Sariq\");\nconsole.log(colors);",
      test: "if (!code.includes('push')) return 'push metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Sariq'))) return null;\nreturn 'Konsolga \"Sariq\" qo\\'shilgan massiv chiqmadi';"
    },
    {
      id: 2,
      title: "tasks massividan pop qilish",
      instruction: "`tasks` massividan `pop()` yordamida oxirgi vazifani sug'urib olib, uni konsolga chiqaring.",
      startingCode: "const tasks = [\"Dars qilish\", \"Kitob o'qish\", \"Dam olish\"];\n// oxirgi vazifani pop qilib konsolga chiqaring\n",
      hint: "let lastTask = tasks.pop();\nconsole.log(lastTask);",
      test: "if (!code.includes('pop')) return 'pop metodi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Dam olish'))) return null;\nreturn 'Konsolga \"Dam olish\" chiqmadi';"
    },
    {
      id: 3,
      title: "queue massivi bilan ishlash",
      instruction: "Bo'sh `queue` massiviga `push` bilan `1` va `2` ni qo'shing. Keyin bitta `pop()` chaqirib, qolgan massiv uzunligini (`queue.length`) konsolga chiqaring.",
      startingCode: "const queue = [];\n// 1 va 2 ni qo'shing, 1 marta pop qiling va queue.length ni chiqaring\n",
      hint: "queue.push(1);\nqueue.push(2);\nqueue.pop();\nconsole.log(queue.length);",
      test: "if (!code.includes('push') || !code.includes('pop')) return 'push va pop metodlari ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('1'))) return null;\nreturn 'Konsolga 1 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "push() metodi nima vazifani bajaradi?",
      options: [
        "Massivning oxiriga yangi element qo'shadi",
        "Massivning boshiga element qo'shadi",
        "Massivning barcha elementlarini o'chiradi",
        "Massiv uzunligini hisoblaydi"
      ],
      correctAnswer: 0,
      explanation: "push() metodi berilgan elementni massivning eng oxiriga qo'shadi."
    },
    {
      id: 2,
      question: "pop() metodi massivning qaysi elementini olib tashlaydi?",
      options: [
        "Eng oxirgi elementini",
        "Eng birinchi elementini",
        "Tasodifiy elementini",
        "Barcha elementlarini"
      ],
      correctAnswer: 0,
      explanation: "pop() metodi massivning faqat eng oxirgi elementini sug'urib olib tashlaydi va o'sha elementni qaytaradi."
    },
    {
      id: 3,
      question: "Bo'sh massivda pop() chaqirilsa nima qaytadi?",
      options: [
        "undefined",
        "null",
        "0",
        "Error beradi"
      ],
      correctAnswer: 0,
      explanation: "Bo'sh massivda element bo'lmaganligi sababli pop() hech qanday xato bermasdan undefined qaytaradi."
    }
  ]
};
