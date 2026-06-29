export const primitivesVsObjects = {
  id: "primitivesVsObjects",
  title: "Primitivlar va Obyektlar (Memory)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
JavaScript-da o'zgaruvchilar va ma'lumotlar bilan ishlashda ularning xotirada qanday saqlanishi muhim:
1. **Primitiv turlar:** (Number, String, Boolean, Null, Undefined, Symbol). Ular xotiraning **Stack** deb nomlangan qismida bevosita saqlanadi. Ular o'zgarmas (immutable) va nusxalanganda mustaqil qiymat bo'ladi.
2. **Obyektlar:** (Object, Array, Function). Ular xotiraning **Heap** deb nomlangan qismida saqlanadi, Stack-da esa faqat ularning Heap-dagi manziliga ko'rsatuvchi havola (pointer) saqlanadi. Ular o'zgaruvchan (mutable).

O'xshatish: Primitiv - qog'ozga yozilgan son (nusxa olinganda mutlaqo mustaqil qog'ozlar bo'ladi). Obyekt - Google Docs havolasi (link nusxalangan bilan u bitta original hujjatga ko'rsatadi, agar biri o'zgartirsa, hamma o'sha o'zgarishni ko'radi).

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON:** Obyektlarni \`=\` orqali nusxalash, keyin original obyektni beixtiyor o'zgartirib qo'yish (Mutatsiya xatosi).
\`\`\`javascript
const user = { name: "Anvar" };
const copy = user;
copy.name = "Doston";
console.log(user.name); // Doston (original ham o'zgardi!)
\`\`\`

✅ **YAXSHI:** Spread operatori yoki \`structuredClone\` yordamida xavfsiz nusxa olish.
\`\`\`javascript
const user = { name: "Anvar" };
const copy = { ...user };
copy.name = "Doston";
console.log(user.name); // Anvar (original xavfsiz)
\`\`\`

## 🎤 Intervyu Savollari
1. **Primitivlar va obyektlarning nusxalanishidagi farq nima?**
   - Primitivlar qiymat bo'yicha (by value) nusxalanadi, obyektlar havola (by reference) bo'yicha.
2. **Nima uchun \`{} === {}\` false qaytaradi?**
   - Obyektlar solishtirilganda ularning tarkibi emas, xotiradagi manzillari (pointers) tekshiriladi. Ikkita bo'sh obyekt xotirada turli manzillarga ega bo'ladi.
3. **Sayoz (Shallow) va Chuqur (Deep) nusxalash farqi nima?**
   - Sayoz nusxa (\`{...obj}\`) obyektning faqat eng yuqori darajadagi xususiyatlarini yangilaydi, ichki obyektlarni havola bo'yicha qoldiradi. Chuqur nusxa (\`structuredClone(obj)\`) ichki obyektlarning ham mutlaqo yangi xotira nusxasini yaratadi.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
flowchart TD
    A[Xotira] --> B[Stack Xotira]
    A --> C[Heap Xotira]
    B --> D[Primitivlar (x = 10)]
    B --> E[Obyekt Havolalari (obj = #101)]
    C --> F[#101: { name: 'Ali' }]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Havolani mutatsiya qilmasdan yangilash",
      instruction: "Berilgan `user` obyektini o'zgartirmasdan, uning `score` xususiyatini yangi `newScore` qiymatiga o'zgartirib, yangi obyektni qaytaruvchi `updateScore(user, newScore)` funksiyasini yozing.",
      startingCode: "function updateScore(user, newScore) {\n  // Kodni yozing\n}",
      hint: "Spread operator `{ ...user, score: newScore }` yordamida yuzaki nusxa olib qaytaring.",
      test: "const fn = new Function(code + '; return updateScore;')(); const original = { name: 'Anvar', score: 50 }; const updated = fn(original, 100); if (original.score !== 50 || updated === original || updated.score !== 100) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Chuqur nusxalash",
      instruction: "Ichma-ich tuzilishga ega `user` obyektini xavfsiz chuqur nusxalab (deep clone) qaytaruvchi `deepCloneUser(user)` yozing.",
      startingCode: "function deepCloneUser(user) {\n  // Kodni yozing\n}",
      hint: "`structuredClone(user)` yoki `JSON.parse(JSON.stringify(user))` ishlating.",
      test: "const fn = new Function(code + '; return deepCloneUser;')(); const original = { a: { b: 1 } }; const cloned = fn(original); cloned.a.b = 2; if (original.a.b !== 1 || cloned === original) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Obyektlarni qiymatlari bo'yicha solishtirish",
      instruction: "Ikkita obyektni birinchi darajali xususiyatlari va ularning qiymatlari bo'yicha solishtiruvchi `areEqual(obj1, obj2)` funksiyasini yozing.",
      startingCode: "function areEqual(obj1, obj2) {\n  // Kodni yozing\n}",
      hint: "Object.keys() orqali kalitlar soni va qiymatlarini solishtiring.",
      test: "const fn = new Function(code + '; return areEqual;')(); if (!fn({a:1}, {a:1}) || fn({a:1}, {b:1})) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Primitivlarni taqqoslash",
      instruction: "Ikkita parametr qabul qilib, ular qat'iy teng bo'lsa true qaytaruvchi `comparePrimitives(a, b)` yozing.",
      startingCode: "function comparePrimitives(a, b) {\n  // Kodni yozing\n}",
      hint: "a === b ishlating.",
      test: "const fn = new Function(code + '; return comparePrimitives;')(); if (!fn('5', '5') || fn('5', 5)) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Massivlarni xavfsiz nusxalash",
      instruction: "Berilgan massiv (Array) dan yuzaki nusxa (clone) olib qaytaradigan `cloneArray(arr)` yozing.",
      startingCode: "function cloneArray(arr) {\n  // Kodni yozing\n}",
      hint: "[...arr] operatoridan foydalaning.",
      test: "const fn = new Function(code + '; return cloneArray;')(); const original = [1, 2]; const cloned = fn(original); if (original === cloned || cloned[0] !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Object.assign bilan nusxa",
      instruction: "Object.assign yordamida obyektning yangi nusxasini qaytaruvchi `cloneWithAssign(obj)` yozing.",
      startingCode: "function cloneWithAssign(obj) {\n  // Kodni yozing\n}",
      hint: "Object.assign({}, obj) orqali hal qiling.",
      test: "const fn = new Function(code + '; return cloneWithAssign;')(); const obj = {x: 10}; const copy = fn(obj); if (copy === obj || copy.x !== 10) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Typeof operatori bilan tekshirish",
      instruction: "Agar argument 'string' tipidagi primitiv bo'lsa true, boshqa holatda false qaytaruvchi `isString(val)` yozing.",
      startingCode: "function isString(val) {\n  // Kodni yozing\n}",
      hint: "typeof val === 'string'",
      test: "const fn = new Function(code + '; return isString;')(); if (!fn('salom') || fn(123)) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Reference turi mutatsiyasi",
      instruction: "Ikkita parametr x va y (obyektlar). Ularning xotira manzili bir xil bo'lsa true qaytaruvchi `isSameReference(x, y)` yozing.",
      startingCode: "function isSameReference(x, y) {\n  // Kodni yozing\n}",
      hint: "x === y manzillarni taqqoslaydi.",
      test: "const fn = new Function(code + '; return isSameReference;')(); const o = {}; if (!fn(o, o) || fn({}, {})) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Object.freeze tekshiruvi",
      instruction: "Obyektni qabul qilib, u Object.freeze orqali muzlatilgan bo'lsa true, aks holda false qaytaruvchi `isFrozenObject(obj)` yozing.",
      startingCode: "function isFrozenObject(obj) {\n  // Kodni yozing\n}",
      hint: "Object.isFrozen(obj)",
      test: "const fn = new Function(code + '; return isFrozenObject;')(); const obj1 = Object.freeze({}); const obj2 = {}; if (!fn(obj1) || fn(obj2)) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Massivda Object mutatsiyasi",
      instruction: "Ichida obyektlar bor massivdan yuzaki nusxa olinganda (masalan `newArr = [...arr]`), obyekt o'zgarishi (newArr[0].x = 5) originalga ham ta'sir qiladimi? Shuni isbotlash uchun faqat true qaytaruvchi `doesShallowCopyMutateInnerObjects()` yozing.",
      startingCode: "function doesShallowCopyMutateInnerObjects() {\n  // Kodni yozing\n}",
      hint: "Ha ta'sir qiladi, shunchaki return true; yozing.",
      test: "const fn = new Function(code + '; return doesShallowCopyMutateInnerObjects;')(); if(fn() !== true) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da qaysi ma'lumotlar turi primitiv hisoblanadi?",
      options: [
        "Object",
        "Function",
        "String",
        "Array"
      ],
      correctAnswer: 2,
      explanation: "String JavaScript-dagi primitiv ma'lumot turlaridan biridir."
    },
    {
      id: 2,
      question: "Primitiv qiymatlar xotiraning qaysi qismida saqlanadi?",
      options: [
        "Stack xotirada",
        "Heap xotirada",
        "Faqat diskda",
        "Web API-larda"
      ],
      correctAnswer: 0,
      explanation: "Primitiv qiymatlar tezkor va qat'iy tartibli Stack xotirasida bevosita saqlanadi."
    },
    {
      id: 3,
      question: "Obyektlar kabi murakkab ma'lumotlar qanday saqlanadi?",
      options: [
        "Heap-da saqlanadi, Stack-da pointer (havola) turadi",
        "Stack-da saqlanadi, Heap-da pointer turadi",
        "Faqat Stack-da",
        "Hech qayerda"
      ],
      correctAnswer: 0,
      explanation: "Dinamik o'lchamli obyektlar Heap xotirada, uning manzili Stack-da saqlanadi."
    },
    {
      id: 4,
      question: "let a = 5; let b = a; b = 10; a ning qiymati nima bo'ladi?",
      options: [
        "10",
        "5",
        "undefined",
        "Error"
      ],
      correctAnswer: 1,
      explanation: "a primitiv son bo'lganligi sababli b ga faqat qiymat nusxalandi, ular bir-biriga bog'liq emas."
    },
    {
      id: 5,
      question: "Quyidagi natija qanday bo'ladi: const user1={name:'Ali'}; const user2=user1; user2.name='Vali'; console.log(user1.name);",
      options: [
        "'Ali'",
        "'Vali'",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Obyektlar havola (reference) bo'yicha nusxalanadi, shuning uchun birini o'zgartirish ikkinchisiga ta'sir qiladi."
    },
    {
      id: 6,
      question: "console.log({} === {}); nima qaytaradi?",
      options: [
        "true",
        "false",
        "undefined",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "Ikki obyekt === orqali solishtirilganda xotiradagi manzili tekshiriladi, bu erda 2ta yangi manzilli obyektlar yaratilgan."
    },
    {
      id: 7,
      question: "const bilan e'lon qilingan obyektda qaysi amalni bajarib bo'lmaydi?",
      options: [
        "Ichidagi xususiyatni o'zgartirish",
        "Yangi xususiyat qo'shish",
        "Obyektga butunlay yangi obyekt yuklash (Reassignment)",
        "Xususiyatni o'chirish"
      ],
      correctAnswer: 2,
      explanation: "const obyekti o'zgaruvchisi o'z manzilini o'zgartira olmaydi."
    },
    {
      id: 8,
      question: "Obyektning birinchi darajali xossalarini nusxalash nima deyiladi?",
      options: [
        "Deep Copy",
        "Shallow Copy (Yuzaki nusxa)",
        "Reference Copy",
        "Mutloq nusxa"
      ],
      correctAnswer: 1,
      explanation: "Faqat tashqi darajadagi xossalarni nusxalash Shallow Copy deyiladi."
    },
    {
      id: 9,
      question: "Obyektni chuqur nusxalash (Deep Copy) uchun o'rnatilgan funksiya qaysi?",
      options: [
        "Object.assign()",
        "Spread operator (...)",
        "structuredClone()",
        "Object.create()"
      ],
      correctAnswer: 2,
      explanation: "structuredClone() chuqur nusxalashni xavfsiz bajaradi."
    },
    {
      id: 10,
      question: "Parametr sifatida obyekt uzatilganda va ichki xususiyat o'zgartirilganda originalga ta'sir qiladimi?",
      options: [
        "Yo'q",
        "Ha, ta'sir qiladi",
        "Faqat array bo'lsa",
        "Faqat strict mode da"
      ],
      correctAnswer: 1,
      explanation: "Obyekt havola (pointer) sifatida uzatilgani uchun ichki mutatsiyalar original obyektga ham tegishli bo'ladi."
    },
    {
      id: 11,
      question: "Obyektni mutatsiyadan to'liq saqlash uchun nima ishlatiladi?",
      options: [
        "Object.freeze()",
        "Object.seal()",
        "Object.preventExtensions()",
        "Object.lock()"
      ],
      correctAnswer: 0,
      explanation: "Object.freeze() obyektga har qanday mutatsiyani man etadi."
    },
    {
      id: 12,
      question: "Heap xotiradagi axlat qanday tozalanadi?",
      options: [
        "Stack to'lishi bilan",
        "Garbage Collector (Axlat yig'uvchi) tomonidan",
        "free() funksiyasi bilan",
        "Brauzer yopilguncha saqlanadi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da Garbage Collector avtomatik ishlaydi va aloqasi uzilgan obyektlarni xotiradan tozalaydi."
    }
  ]
};