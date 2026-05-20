export const spreadRest = {
  id: "spread-rest",
  title: "Spread va Rest (...) - Yoyish va Yig'ish",
  level: "Intermediate",
  description: "Ma'lumotlarni Lego bo'laklaridek oson boshqarish: yoyish va yig'ish operatorlari.",
  theory: `
# Spread va Rest – Bu nima va nima uchun kerak?

Sintaksis jihatidan ikkalasi ham uchta nuqta (\`...\`) bilan yoziladi, lekin vazifasi butunlay boshqa-boshqa.

## 1. NEGA kerak?
Tasavvur qiling, sizda ikkita massiv bor va ularni birlashtirmoqchisiz. Eski usulda \`.concat()\` ishlatish yoki sikl aylantirish kerak edi. Spread/Rest bilan esa bu bir necha soniyalik ish.

## 2. SODDALIK (Analogiya)
- **Spread (Yoyish):** Bu xuddi sumkani ichidagilarni stolga to'kib yuborishga o'xshaydi. Hamma narsa yoyilib chiqadi.
- **Rest (Yig'ish):** Bu esa stol ustidagi hamma narsani sumkaga solib, og'zini yopishga o'xshaydi. Hamma narsa bir joyga yig'iladi.

## 3. STRUKTURA

### A. Spread: Massiv va Obyektlarni yoyish
\`\`\`javascript
// Massivlarni birlashtirish
const m1 = [1, 2];
const m2 = [3, 4];
const yangi = [...m1, ...m2]; // [1, 2, 3, 4]

// Obyektdan nusxa olish
const user = { name: "Ali", age: 25 };
const copy = { ...user, city: "Tashkent" };
\`\`\`

### B. Rest: Funksiya parametrlarida yig'ish
Rest har doim oxirida keladi va qolgan hamma argumentlarni massivga aylantiradi:
\`\`\`javascript
function sum(birinchi, ...qolganlar) {
  console.log(birinchi); // 1
  console.log(qolganlar); // [2, 3, 4, 5] (Massiv)
}
sum(1, 2, 3, 4, 5);
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const mevalar = ["olma", "anor"];
const hammasi = ["behi", ...mevalar, "uzum"];
console.log(hammasi); // ["behi", "olma", "anor", "uzum"]
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Rest o'rtada kelishi:** \`function x(...a, b)\` — Xato! ❌ Rest har doim oxirgi parametr bo'lishi shart.
2.  **Shallow Copy:** Spread obyektdan nusxa olganda, ichidagi ichki obyeklarni (nested objects) nusxalamaydi, shunchaki bog'lanish (reference) beradi.

## 6. SAVOLLAR (12 ta)
1. Spread operatori nima ish qiladi?
2. Rest operatori nima ish qiladi?
3. Ikkalasining yozilishida farq bormi?
4. Funksiya parametrida \`...args\` ishlatilsa, \`args\` qanday turdagi ma'lumot bo'ladi?
5. Spread yordamida ikkita obyekni qanday birlashtirish mumkin?
6. Rest operatorini funksiya parametrining boshida ishlatsa bo'ladimi?
**<b>1. Spread operatori nima ish qiladi?</b>**
Massiv, obyekt yoki string elementlarini alohida qiymatlar qilib yoyib yuboradi. Obyekt va massivlarni nusxalash, birlashtirishda juda qo'l keladi.


**<b>2. Rest operatori nima ish qiladi?</b>**
Funksiyaga berilgan ortiqcha argumentlarni yoki destructuring'dan ortgan qismni bitta qilib massivga yig'adi.


**<b>3. Ikkalasining yozilishida farq bormi?</b>**
Sintaksis jihatidan mutlaqo bir xil (uchta nuqta ...). Faqat ishlatilish o'rniga qarab farqlanadi: yoyish yoki yig'ish.


**<b>4. Funksiya parametrida ...args ishlatilsa, args qanday turda bo'ladi?</b>**
U haqiqiy Array (massiv) bo'ladi va unda map, filter, reduce kabi barcha massiv metodlarini ishlatish mumkin.


**<b>5. Spread yordamida ikkita obyekni qanday birlashtirish mumkin?</b>**
\`const combined = { ...obj1, ...obj2 };\` shaklida. Agar bir xil kalitlar bo'lsa, obj2 dagi qiymat obj1 dagi qiymatning ustidan yozib yuboradi.


**<b>6. Rest operatorini funksiya parametrining boshida ishlatsa bo'ladimi?</b>**
Yo'q, SyntaxError xatosi beradi. Rest operatori har doim eng oxirgi parametr bo'lishi shart.


**<b>7. Stringni ("Salom") spread qilsak nima bo'ladi?</b>**
Har bir harf massivning alohida elementiga aylanadi: \`["S", "a", "l", "o", "m"]\`. Bu \`split('')\` kabi ishlaydi.


**<b>8. Math.max(...[1, 5, 2]) natijasi nima bo'ladi?</b>**
Natija 5 bo'ladi. Spread massivni yoyadi va funksiya \`Math.max(1, 5, 2)\` ko'rinishida argumentlarni qabul qiladi.


**<b>9. Obyektdan nusxa olishda spreadning qanday kamchiligi bor?</b>**
U faqat "shallow copy" (sayoz nusxa) qiladi. Agar obyekt ichida yana obyekt bo'lsa, ichkisining reference (manzili) nusxalanadi, o'zi emas.


**<b>10. Destructuring'da rest operatorini ishlatish misolini keltiring.</b>**
Massivda: \`const [bir, ...qolganlari] = [1, 2, 3];\`. Obyektda: \`const { ism, ...qolganMalumotlar } = user;\`.


**<b>11. arguments obyekti va Rest parametrning farqi nima?</b>**
\`arguments\` — ES5 da qo'shilgan massivga o'xshash obyekt (haqiqiy massiv emas). Rest — ES6 yordamida tuzilgan haqiqiy massiv bo'lib, o'qish uchun qulayroq.


**<b>12. Spread obyektlarda qanday ishlaydi?</b>**
\`{ ...obj }\` shaklida yozilsa, obyektning barcha xususiyatlari (property) yangi obyektga yoyilib yoziladi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Massivlarni birlashtirish (Spread)",
      instruction: "Spread yordamida 'arr1' va 'arr2'ni 'combined' massiviga birlashtiring.",
      startingCode: "const arr1 = [1, 2];\nconst arr2 = [3, 4];\n// Bu yerga yozing\nconst combined = [];\nconsole.log(combined);",
      hint: "const combined = [...arr1, ...arr2];",
      test: "if (combined.length === 4 && combined[3] === 4) return null; return 'Massivlar birlashmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Obyektdan nusxa olish (Spread)",
      instruction: "'user' obyektidan spread orqali 'copyUser' nomli nusxa oling va unga 'yosh: 25' xususiyatini qo'shing.",
      startingCode: "const user = { ism: 'Ali' };\n// Bu yerga yozing\nconst copyUser = {};\nconsole.log(copyUser);",
      hint: "const copyUser = { ...user, yosh: 25 };",
      test: "if (copyUser.ism === 'Ali' && copyUser.yosh === 25) return null; return 'Obyekt to\\'g\\'ri nusxalanmadi';"
    },
    {
      id: 3,
      title: "3️⃣ Stringni yoyish (Spread)",
      instruction: "'HELLO' so'zini harflar massiviga aylantiring.",
      startingCode: "const word = 'HELLO';\n// Bu yerga yozing\nconst letters = [];\nconsole.log(letters);",
      hint: "const letters = [...word];",
      test: "if (letters.length === 5 && letters[0] === 'H') return null; return 'String to\\'g\\'ri yoyilmadi';"
    },
    {
      id: 4,
      title: "4️⃣ Parametrlarni yig'ish (Rest)",
      instruction: "x, y va qolgan barcha argumentlarni yig'ib massiv qilib qaytaradigan 'getRest' funksiyasini yozing.",
      startingCode: "function getRest(x, y, /* rest parametr */) {\n  // Bu yerga yozing\n  return [];\n}\nconsole.log(getRest(1, 2, 3, 4, 5));",
      hint: "function getRest(x, y, ...args) { return args; }",
      test: "if (typeof getRest === 'function' && getRest(1,2,3,4).length === 2) return null; return 'Rest parametr to\\'g\\'ri ishlatilmadi';"
    },
    {
      id: 5,
      title: "5️⃣ Math metodlarida Spread",
      instruction: "'numbers' massivi ichidagi eng kichik sonni topish uchun Math.min() da spread ishlating.",
      startingCode: "const numbers = [45, 12, 89, 5];\n// Bu yerga yozing\nconst min = 0;\nconsole.log(min);",
      hint: "const min = Math.min(...numbers);",
      test: "if (min === 5) return null; return 'Eng kichik son topilmadi';"
    },
    {
      id: 6,
      title: "6️⃣ Obyektlarni birlashtirish (Merge)",
      instruction: "'obj1' va 'obj2' ni spread orqali birlashtirib 'merged' obyektini yarating.",
      startingCode: "const obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n// Bu yerga yozing\nconst merged = {};\nconsole.log(merged);",
      hint: "const merged = { ...obj1, ...obj2 };",
      test: "if (merged.a === 1 && merged.d === 4) return null; return 'Obyektlar birlashmadi';"
    },
    {
      id: 7,
      title: "7️⃣ Massivdan Mustaqil Nusxa olish",
      instruction: "originalArray dan butunlay mustaqil bo'lgan yangi nusxa (newArray) yarating, shunda original o'zgarmasin.",
      startingCode: "const originalArray = [10, 20, 30];\n// Bu yerga yozing\nconst newArray = [];\nnewArray[0] = 99;\nconsole.log(originalArray[0], newArray[0]);",
      hint: "const newArray = [...originalArray];",
      test: "if (newArray[0] === 99 && originalArray[0] === 10) return null; return 'Mustaqil nusxa olinmadi';"
    },
    {
      id: 8,
      title: "8️⃣ Obyekt qiymatini ustidan yozish (Override)",
      instruction: "user obyektidan nusxa oling, lekin 'ism' ni 'Bobur' ga o'zgartiring.",
      startingCode: "const user = { ism: 'Ali', email: 'ali@bk.ru' };\n// Bu yerga yozing\nconst newUser = {};\nconsole.log(newUser);",
      hint: "const newUser = { ...user, ism: 'Bobur' };",
      test: "if (newUser.ism === 'Bobur' && newUser.email === 'ali@bk.ru') return null; return 'Override noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "9️⃣ Massiv destructuring bilan Rest",
      instruction: "Destructuring qilib 'birinchi' ga massiv boshini, 'qolganlar' o'zgaruvchisiga qolgan hammasini massiv qilib saqlang.",
      startingCode: "const nums = [10, 20, 30, 40];\n// Bu yerga yozing\n\nconsole.log(birinchi, qolganlar);",
      hint: "const [birinchi, ...qolganlar] = nums;",
      test: "if (birinchi === 10 && qolganlar.length === 3) return null; return 'Rest bilan destructuring qilinmadi';"
    },
    {
      id: 10,
      title: "🔟 Obyekt destructuring bilan Rest",
      instruction: "user obyektidan 'age' ni olib, qolgan kalitlarni 'restProps' nomli obyektga saqlang.",
      startingCode: "const user = { ism: 'Lola', age: 22, shahar: 'Navoiy' };\n// Bu yerga yozing\n\nconsole.log(age, restProps);",
      hint: "const { age, ...restProps } = user;",
      test: "if (age === 22 && restProps.shahar === 'Navoiy') return null; return 'Obyekt destructuring noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Funksiyaga argumentlarni yoyish (Spread)",
      instruction: "'info' massividagi ma'lumotlarni 'greet' funksiyasiga argument sifatida spread qilib uzating.",
      startingCode: "function greet(ism, shahar) {\n  return `${ism} ${shahar}dan`;\n}\nconst info = ['Hasan', 'Samarqand'];\n// Bu yerga yozing\nconst result = '';\nconsole.log(result);",
      hint: "const result = greet(...info);",
      test: "if (result === 'Hasan Samarqanddan') return null; return 'Spread ishlatilmadi';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Kompleks Array ichiga qo'shish",
      instruction: "Eski massivdagi ob'ektlar ro'yxati boshiga va oxiriga yangi obyekt qo'shing.",
      startingCode: "const data = [{id: 2}, {id: 3}];\n// Bu yerga yozing: result = [ {id: 1}, ...data, {id: 4} ]\nconst result = [];\nconsole.log(result);",
      hint: "const result = [{id: 1}, ...data, {id: 4}];",
      test: "if (result.length === 4 && result[0].id === 1 && result[3].id === 4) return null; return 'Kompleks spread qilinmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Spread` va `Rest` operatorlari sintaktik jihatdan bir xil yozilsa-da, ularni qanday farqlash mumkin?",
      options: [
        "Spread massiv/obyekt elementlarini yoyib chiqadi, Rest esa alohida qiymatlarni bitta massivga yig'adi",
        "Rest faqat sonlarni, Spread esa faqat stringlarni qabul qiladi",
        "Spread faqat Node.js da, Rest esa faqat brauzerda ishlaydi",
        "Hech qanday farqi yo'q, sinonim so'zlar"
      ],
      correctAnswer: 0,
      explanation: "Sintaksis bir xil bo'lsa-da, Spread ma'lumotni 'yoyadi' (tarqatadi), Rest esa kelayotgan bir nechta parametrlarni 'yig'ib' bitta massivga aylantiradi."
    },
    {
      id: 2,
      question: "Quyidagi funksiya parametrlaridagi rest operatoridan foydalanishda qaysi biri xato (SyntaxError) hisoblanadi?",
      options: [
        "`function show(a, b, ...c) {}`",
        "`function show(...c) {}`",
        "`function show(a, ...b, c) {}`",
        "`function show(first, second, ...rest) {}`"
      ],
      correctAnswer: 2,
      explanation: "Rest operatori har doim parametrlar ro'yxatining oxirida kelishi shart. O'rtada yoki boshida (oxirida yana parametr bo'lsa) yozilishi taqiqlanadi."
    },
    {
      id: 3,
      question: "Quyidagi kod chop etilganda konsolga nima chiqadi?\n```javascript\nconst str = 'JS';\nconst arr = [...str];\nconsole.log(arr);\n```",
      options: [
        "`['JS']`",
        "`['J', 'S']`",
        "`['J S']`",
        "TypeError: str is not iterable"
      ],
      correctAnswer: 1,
      explanation: "String turi iterable (aylanib chiqiladigan) hisoblanadi. Uni spread qilganda har bir harfi alohida element sifatida massivga yoyiladi."
    },
    {
      id: 4,
      question: "Spread operatori orqali obyekt yoki massivdan nusxa olinganda (shallow copy), undagi ichki (nested) obyektlar qanday nusxalanadi?",
      options: [
        "Ulardan ham to'liq yangi nusxa olinadi (deep copy)",
        "Ular nusxalanmaydi va tashlab ketiladi",
        "Ularning faqat xotiradagi manzili (reference) nusxalanadi, natijada asl va nusxa obyektlar bitta ichki obyektga tayanadi",
        "Har doim xatolik beradi"
      ],
      correctAnswer: 2,
      explanation: "Spread operatori faqat birinchi darajali (shallow) nusxa oladi. Ichma-ich joylashgan obyektlar reference (xotira manzili) bo'yicha bog'lanib qoladi."
    },
    {
      id: 5,
      question: "`Math.max([1, 5, 2])` xato beradi (chunki massiv qabul qilmaydi). Uni to'g'ri ishlashini ta'minlash uchun qaysi variant mos keladi?",
      options: [
        "`Math.max(...[1, 5, 2]);`",
        "`Math.max(rest[1, 5, 2]);`",
        "`Math.max([1, 5, 2].toString());`",
        "`Math.max.apply([1, 5, 2]);`"
      ],
      correctAnswer: 0,
      explanation: "Spread `...` operatori massivni argumentlar ro'yxatiga yoyib yuboradi: `Math.max(1, 5, 2)` ko'rinishida chaqirilishini ta'minlaydi."
    }
  ]
};