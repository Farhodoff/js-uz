export const spreadRest = {
  id: "spread-rest",
  title: "Spread va Rest (...) - Yoyish va Yig'ish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

JavaScriptda uchta nuqta (\`...\`) sintaksisi ishlatiladigan joyiga qarab ikki xil vazifani bajaradi:
- **Spread (Yoyish):** Massiv yoki obyekt ichidagi elementlarni "yoyib", alohida-alohida qiymatlar ko'rinishida ochib beradi.
- **Rest (Yig'ish):** Alohida qiymatlar yoki funksiya argumentlarini bitta butun massivga "yig'ib" beradi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**YOMON:** Massivlarni birlashtirish yoki nusxalash uchun eski \`concat\` yoki sikllarni ishlatish.
\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const copy = arr1.slice();
const merged = arr1.concat(arr2);
\`\`\`

**YAXSHI:** \`Spread\` yordamida qisqa va tushunarli yozish.
\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const copy = [...arr1];
const merged = [...arr1, ...arr2];
\`\`\`

**YOMON:** Funksiyada noma'lum miqdordagi argumentlarni qabul qilish uchun eski \`arguments\` obyektidan foydalanish (unda array metodlari yo'q).
\`\`\`javascript
function sumAll() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
\`\`\`

**YAXSHI:** \`Rest\` parametri yordamida barcha argumentlarni massivga yig'ib olish (Array metodlari ishlashi uchun).
\`\`\`javascript
function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
\`\`\`

## 🎤 Intervyu Savollari

1. **Spread operatori orqali nusxa olinganda (\`const copy = { ...obj }\`), deep copy (chuqur nusxa) bo'ladimi yoki shallow copy (sayoz nusxa)?**
   - Bu "Shallow copy". Agar obyektning ichida yana boshqa obyekt yoki massivlar bo'lsa, ularning faqat xotiradagi manzillari nusxalanadi (reference tushadi).
2. **Rest parametri funksiya argumentlarining qayerida kelishi kerak?**
   - Har doim eng oxirida kelishi shart. Aks holda \`SyntaxError\` beradi. (masalan, \`function foo(a, ...rest, c)\` xato).
3. **Obyektlarni Spread qilganda bir xil kalit kelib qolsa nima bo'ladi?**
   - Oxirgi qo'shilgan kalit oldingisini qiymatini qayta yozadi (override). \`{ a: 1, ...{ a: 2 } }\` -> \`{ a: 2 }\`.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD
    A["[1, 2, 3]"]
    B["...Spread"]
    C["1, 2, 3 (alohida)"]
    A --> B --> C
    
    D["1, 2, 3 (alohida argumentlar)"]
    E["...Rest"]
    F["[1, 2, 3]"]
    D --> E --> F
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Massivlarni birlashtirish (Spread)",
      instruction: "Ikki massiv (arr1, arr2) parametr sifatida keladi. Ularni yoyish (...) orqali bitta massiv qilib qaytaruvchi funksiya yozing.",
      startingCode: "function mergeArrays(arr1, arr2) {\n  // kodni bu yerda yozing\n}",
      hint: "[...arr1, ...arr2] ko'rinishida yozing.",
      solution: "function mergeArrays(arr1, arr2) {\n  return [...arr1, ...arr2];\n}",
      test: "const fn = new Function(code + '; return mergeArrays;')(); if (fn([1],[2]).join('') !== '12') throw new Error('Test failed');"
    },
    {
      id: 2,
      title: "Obyektdan nusxa olish (Spread)",
      instruction: "`user` obyekti keladi. Undan yangi mustaqil obyekt yasang va qoshimcha ravishda 'role' kalitiga 'admin' qiymatini qo'shib qaytaring.",
      startingCode: "function copyAndAddRole(user) {\n  // kodni bu yerda yozing\n}",
      hint: "{ ...user, role: 'admin' }",
      solution: "function copyAndAddRole(user) {\n  return { ...user, role: 'admin' };\n}",
      test: "const fn = new Function(code + '; return copyAndAddRole;')(); const orig = {n: 'Ali'}; const res = fn(orig); if (res.role !== 'admin' || res === orig) throw new Error('Test failed');"
    },
    {
      id: 3,
      title: "Stringni massivga yoyish",
      instruction: "String yuboriladi. Uni har bir harfi alohida element bo'lgan massivga aylantirib qaytaring (spread orqali).",
      startingCode: "function splitString(str) {\n  // kodni bu yerda yozing\n}",
      hint: "[...str]",
      solution: "function splitString(str) {\n  return [...str];\n}",
      test: "const fn = new Function(code + '; return splitString;')(); if (fn('JS').join('') !== 'JS' || fn('JS').length !== 2) throw new Error('Test failed');"
    },
    {
      id: 4,
      title: "Cheksiz argumentlar yig'indisi (Rest)",
      instruction: "Rest parametr yordamida funksiyaga berilgan barcha son argumentlarni qabul qilib, ularning yig'indisini hisoblang.",
      startingCode: "function sumAll(...numbers) {\n  // kodni bu yerda yozing\n}",
      hint: "numbers.reduce((sum, num) => sum + num, 0)",
      solution: "function sumAll(...numbers) {\n  return numbers.reduce((s, n) => s + n, 0);\n}",
      test: "const fn = new Function(code + '; return sumAll;')(); if (fn(1,2,3,4) !== 10) throw new Error('Test failed');"
    },
    {
      id: 5,
      title: "Math funksiyasiga argument yoyish",
      instruction: "Sonlardan iborat massiv keladi. Math.max yordamida eng kattasini topish uchun massivni yoyib chaqiring.",
      startingCode: "function findMax(arr) {\n  // kodni bu yerda yozing\n}",
      hint: "Math.max(...arr)",
      solution: "function findMax(arr) {\n  return Math.max(...arr);\n}",
      test: "const fn = new Function(code + '; return findMax;')(); if (fn([1, 10, 5]) !== 10) throw new Error('Test failed');"
    },
    {
      id: 6,
      title: "Massivning boshidan element qirqib olish (Rest in Destructuring)",
      instruction: "Massiv beriladi. Destructuring va Rest yordamida 1-elementni o'tkazib yuborib, qolgan barcha elementlardan iborat yangi massivni qaytaring.",
      startingCode: "function getTail(arr) {\n  // const [first, ...rest] = arr;\n  // kodni bu yerda yozing\n}",
      hint: "const [head, ...tail] = arr; return tail;",
      solution: "function getTail(arr) {\n  const [first, ...rest] = arr;\n  return rest;\n}",
      test: "const fn = new Function(code + '; return getTail;')(); if (fn([1,2,3]).join('') !== '23') throw new Error('Test failed');"
    },
    {
      id: 7,
      title: "Obyektni qisqartirish (Rest in Destructuring)",
      instruction: "`user` obyekti beriladi. Uning 'password' kalitini o'chirib, qolgan ma'lumotlarni o'zida jamlagan yangi obyekt qaytaring. (Destructuring + rest ishlating)",
      startingCode: "function removePassword(user) {\n  // kodni bu yerda yozing\n}",
      hint: "const { password, ...safeUser } = user; return safeUser;",
      solution: "function removePassword(user) {\n  const { password, ...safeUser } = user;\n  return safeUser;\n}",
      test: "const fn = new Function(code + '; return removePassword;')(); const res = fn({id: 1, password: '123'}); if (res.password !== undefined || res.id !== 1) throw new Error('Test failed');"
    },
    {
      id: 8,
      title: "Obyektlarni qo'shish va ustidan yozish",
      instruction: "`defaultConfig` va `userConfig` obyektlari beriladi. Ikkalasini birlashtiring. `userConfig` ma'lumotlari ustunlikka (override) ega bo'lishi kerak.",
      startingCode: "function mergeConfigs(defaultConfig, userConfig) {\n  // kodni bu yerda yozing\n}",
      hint: "{ ...defaultConfig, ...userConfig }",
      solution: "function mergeConfigs(defaultConfig, userConfig) {\n  return { ...defaultConfig, ...userConfig };\n}",
      test: "const fn = new Function(code + '; return mergeConfigs;')(); const res = fn({t: 'light', w: 100}, {t: 'dark'}); if(res.t !== 'dark' || res.w !== 100) throw new Error('Test failed');"
    },
    {
      id: 9,
      title: "Massiv elementlarini o'rtaga qistirish",
      instruction: "X va Y berilgan. Ular ikkita array. Y ni X ning birinchi elementidan keyin (o'rtaga) qo'shib yangi massiv qaytaring. (Faraz qiling X kamida 1 ta elementga ega)",
      startingCode: "function insertArray(x, y) {\n  // kodni bu yerda yozing\n}",
      hint: "[ x[0], ...y, ...x.slice(1) ]",
      solution: "function insertArray(x, y) {\n  return [x[0], ...y, ...x.slice(1)];\n}",
      test: "const fn = new Function(code + '; return insertArray;')(); const res = fn([1, 4], [2, 3]); if(res.join('') !== '1234') throw new Error('Test failed');"
    },
    {
      id: 10,
      title: "Funksiya parametrlari va Spread",
      instruction: "`greet(greeting, name)` funksiyasi faraziy berilgan bo'lsa, siz massiv `['Salom', 'Ali']` ni shu funksiyaga spread orqali berib qaytaruvchi wrapper funksiya yozing.",
      startingCode: "function wrapGreet(greetFn, argsArray) {\n  // kodni bu yerda yozing\n}",
      hint: "return greetFn(...argsArray)",
      solution: "function wrapGreet(greetFn, argsArray) {\n  return greetFn(...argsArray);\n}",
      test: "const fn = new Function(code + '; return wrapGreet;')(); const g = (a, b) => a+b; if(fn(g, ['S','A']) !== 'SA') throw new Error('Test failed');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Spread operatori nima ish qiladi?",
      options: ["Massiv yoki obyektni alohida elementlarga yoyib yuboradi", "Obyektlarni JSON ga o'tkazadi", "Har xil argumentlarni bir massivga yig'adi", "Funksiya ishlashini to'xtatadi"],
      correctAnswer: 0,
      explanation: "Spread massiv/obyekt/string kabi ma'lumotlarni alohida qismlarga 'yoyib' beradi."
    },
    {
      id: 2,
      question: "Rest operatori nima ish qiladi?",
      options: ["Ma'lumotni alohida elementlarga yoyadi", "Stringlarni sonlarga ajratadi", "Funksiya argumentlarini yoki qolgan obyekt xususiyatlarini massiv yoki obyektga yig'adi", "Obyektlardan nusxa oladi"],
      correctAnswer: 2,
      explanation: "Rest operatori 'qolgan narsalarni' bitta idishga (massivga yoki obyektga) yig'ish (collecting) vazifasini bajaradi."
    },
    {
      id: 3,
      question: "Rest parametri argumentlar ro'yxatida qayerda turishi kerak?",
      options: ["Istalgan joyda", "Faqat birinchi o'rinda", "Faqat oxirgi o'rinda", "Faqat o'rtada"],
      correctAnswer: 2,
      explanation: "Rest parametri funksiya parametrlarining qat'iy ravishda oxirisida turishi shart. Aks holda qaysi qiymat qayerga tegishli ekanini parser bila olmay xato beradi."
    },
    {
      id: 4,
      question: "Spread orqali obyektdan olingan nusxa deep (chuqur) nusxami?",
      options: ["Ha, butunlay yangi nusxa", "Yo'q, bu shallow (sayoz) nusxa, ichki obyektlar reference orqali bog'langan qoladi", "Faqat stringlar uchun chuqur", "Obyektni spread qilib bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Spread faqat birinchi darajali ma'lumotni yangi idishga ko'chiradi. Agar qiymat referens (obj/arr) bo'lsa, asli kabi qoladi."
    },
    {
      id: 5,
      question: "Quyidagilardan qaysi biri xato?",
      options: ["const arr = [...str];", "const obj = {...user};", "function fn(a, ...b) {}", "function fn(...a, b) {}"],
      correctAnswer: 3,
      explanation: "`function fn(...a, b) {}` xato, chunki rest (`...a`) oxirgi bo'lishi kerak, undan keyin hech narsa (masalan `b`) kela olmaydi."
    },
    {
      id: 6,
      question: "`[...null]` yozsak nima bo'ladi?",
      options: ["Bo'sh massiv qaytadi", "null", "TypeError (not iterable)", "undefined"],
      correctAnswer: 2,
      explanation: "Massiv spread operatori qat'iy iterableni kutadi. `null` yoki `undefined` aylanib chiqiladigan (iterable) bo'lmagani uchun xato beradi."
    },
    {
      id: 7,
      question: "`{...null}` yozsak nima bo'ladi?",
      options: ["TypeError", "{}", "null", "undefined"],
      correctAnswer: 1,
      explanation: "Obyekt spread operatori esa bo'sh-xavfsizroq bo'lib, null yoki undefined ko'rsa hech narsa qilmaydi va bo'sh `{}` ni qoldiradi."
    },
    {
      id: 8,
      question: "Obyektlarni birlashtirganda kalit nomlari bir xil bo'lsa-chi? `{a: 1, ...{a: 2}}`",
      options: ["Xato beradi", "{a: 1} bo'lib qoladi", "{a: 2} bo'ladi", "{a: [1, 2]} bo'ladi"],
      correctAnswer: 2,
      explanation: "Ketma-ket yoyilayotgan obyektlarda qaysi kalit ohirida kelsa, o'sha o'zidan oldingi bir xil nomli kalitni ezib yozadi (override)."
    },
    {
      id: 9,
      question: "Funksiya ichidagi argumentlarni massivga aylantirish uchun nima ishlatish yaxshiroq?",
      options: ["arguments o'zgaruvchisi", "Rest parametri (`...args`)", "this", "Function.prototype"],
      correctAnswer: 1,
      explanation: "Rest parametri (`...args`) zamonaviy va xavfsiz. U haqiqiy massiv bo'lgani uchun .map(), .filter() kabi metodlar bemalol ishlaydi."
    },
    {
      id: 10,
      question: "Array destructuring bilan Rest ishlatilishi: `const [a, ...b] = [1, 2, 3];` bu yerda `b` nimaga teng?",
      options: ["2", "3", "[2, 3]", "undefined"],
      correctAnswer: 2,
      explanation: "`a` 1 ni oladi, `b` esa o'zining rest ekanligiga tayanib, qolgan elementlarni `[2, 3]` ko'rinishida yig'ib massiv qiladi."
    },
    {
      id: 11,
      question: "Object destructuring bilan Rest: `const { x, ...y } = { x: 1, z: 2, w: 3 };` bu yerda `y` nimaga teng?",
      options: ["{z: 2}", "{w: 3}", "{z: 2, w: 3}", "xatolik"],
      correctAnswer: 2,
      explanation: "`x` kaliti olib qolinib, qolgan barcha kalitlar o'z qiymatlari bilan bitta yangi obyekt (`{z: 2, w: 3}`) sifatida `y` ga beriladi."
    },
    {
      id: 12,
      question: "Math.max(1, 2, 3) ishlaydi, lekin arr = [1, 2, 3] massivi bilan Math.max ishlamaydi. Nima uchun spread bu yerda yordam beradi?",
      options: ["Chunki u massivni obyektga aylantiradi", "Chunki u massiv elementlarini alohida ketma-ket (1, 2, 3) qilib yoyib Math.max ga uzatadi", "U Math funksiyasini kutubxonadan chaqiradi", "Spread massivni numberga aylantiradi"],
      correctAnswer: 1,
      explanation: "Spread aynan shu uchun qilingan: funksiyalar alohida-alohida parametrlar kutganda, massivni ularga portlatib (yoyib) yuborish uchun."
    }
  ]
};
