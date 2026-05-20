export const interviewQuestionsAdvanced = {
  id: "q3",
  title: "🔴 Interview Savollar (Murakkab)",
  theory: `## Kirish
Ilg'or darajadagi intervyular asosan arxitektura, optimizatsiya va JavaScriptning eng murakkab qismlari haqida bo'ladi.

---

## NAZARIY SAVOLLAR

### 1. Event Loop qanday ishlaydi? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** Asinxronlik

**📖 Javob**

**Qisqa javob:**
Event Loop - bu JavaScriptning single-threaded tabiatini saqlagan holda asinxron amallarni bajarishga imkon beruvchi mexanizm.

**Ishlash tartibi:**
1. Call Stack bo'shligini tekshiradi.
2. Microtask Queue (Promises) dagi barcha vazifalarni bajaradi.
3. Task Queue (setTimeout) dagi bitta vazifani Stack'ga olib keladi.


### 2. Prototype Chain nima? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** OOP

**📖 Javob**

JavaScriptda har bir obyektning yashirin \`[[Prototype]]\` xususiyati bor. Agar biror xususiyat obyektning o'zida topilmasa, JS uni prototipdan qidiradi. Bu zanjir \`null\` ga yetguncha davom etadi.


### 3. Debounce va Throttle farqi nima? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** Performance

**📖 Javob**

**Debounce:** Ketma-ket kelayotgan chaqiriqlarni to'xtatib, oxirgisidan keyin ma'lum vaqt o'tgach ishlaydi (masalan, qidiruv inputi).
**Throttle:** Chaqiriqlar sonidan qat'i nazar, ma'lum vaqt oralig'ida faqat bir marta ishlaydi (masalan, scroll event).


---

## AMALIY SAVOLLAR

### 1. Currying funksiyasini yozing
**Topshiriq:** \`sum(1)(2)(3)\` ko'rinishida ishlaydigan funksiya yarating.

**✅ Yechim**

\`\`\`javascript
function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
console.log(sum(1)(2)(3)); // → 6
\`\`\`


### 2. Deep Flatten Array
**Topshiriq:** \`[1, [2, [3, 4]]]\` massivini \`[1, 2, 3, 4]\` holatiga keltiring (flat() ishlatmay).

**✅ Yechim**

\`\`\`javascript
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
\`\`\`


---

## BU KOD NIMA CHIQARADI?

### Savol #1: Async order
\`\`\`javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
\`\`\`
**Javob:** 1, 4, 3, 2. (Sinxron -> Microtask -> Macrotask)
`,
  exercises: [
    {
      id: 1,
      title: "Memoization",
      instruction: "Natijani keshlovchi oddiy memoize funksiyasini yozing.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  return function(n) {\n    // keshni tekshiring\n  }\n}",
      hint: "cache[n] borligini tekshiring.",
      test: "if (typeof memoize === 'function') return null; return 'Memoize funksiya bo\\'lishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Loop ketma-ketligi bo'yicha quyidagi kod konsolga nimalarni chiqaradi?\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n```",
      options: ["1 2 3 4", "1 4 2 3", "1 4 3 2", "1 3 4 2"],
      correctAnswer: 2,
      explanation: "Sinxron kodlar (`1` va `4`) birinchi bajariladi. Keyin microtask'lar navbati keladi, shuning uchun `Promise` ning callback kodi (`3`) bajariladi. Eng oxirida macrotask bo'lgan `setTimeout` callback kodi (`2`) bajariladi."
    },
    {
      id: 2,
      question: "Asinxron `async/await` va microtask ketma-ketligi haqidagi ushbu savol javobini toping:\n```javascript\nasync function foo() {\n  console.log('A');\n  await bar();\n  console.log('B');\n}\nasync function bar() {\n  console.log('C');\n}\nconsole.log('D');\nfoo();\nconsole.log('E');\n```",
      options: ["D A C B E", "D A C E B", "D A E C B", "A C D E B"],
      correctAnswer: 1,
      explanation: "1. Birinchi `console.log('D')` ishlaydi. \n2. `foo()` chaqiriladi, uning ichida sinxron ravishda `console.log('A')` ishlaydi. \n3. `await bar()` chaqiriladi, uning ichidagi sinxron qism `console.log('C')` ishlaydi. `await` dan keyingi qism esa (`console.log('B')`) microtask queue'ga yuboriladi va `foo` bajarilishi pauza bo'ladi. \n4. Sinxron navbat davom etib `console.log('E')` ishlaydi. \n5. Sinxron kod tugagach, microtask ishga tushib, `console.log('B')` chiqadi."
    },
    {
      id: 3,
      question: "Prototypes va constructor funksiyalar bo'yicha quyidagi kod natijasini aniqlang:\n```javascript\nfunction Person(name) {\n  this.name = name;\n}\nPerson.prototype.sayName = function() {\n  return this.name;\n};\nconst p1 = new Person('Ali');\nPerson.prototype = { sayName() { return 'Vali'; } };\nconst p2 = new Person('Ali');\nconsole.log(p1.sayName(), p2.sayName());\n```",
      options: ["Ali Vali", "Vali Vali", "Ali Ali", "TypeError"],
      correctAnswer: 0,
      explanation: "`p1` obyekti yaratilgan paytdagi `Person.prototype` ga ishora qiladi. Keyinchalik `Person.prototype` butunlay yangi obyektga almashtirilganda, `p1` ning ichki `[[Prototype]]` havolasi eskisi bo'lib qolaveradi. Yangi yaratilgan `p2` esa yangi prototipga ishora qiladi, shuning uchun `p1.sayName()` 'Ali' (eski metod) va `p2.sayName()` 'Vali' (yangi metod) qaytaradi."
    },
    {
      id: 4,
      question: "Bind qilish bo'yicha quyidagi kod nima chiqaradi?\n```javascript\nfunction sayHi() {\n  console.log(this.name);\n}\nconst user = { name: 'Ali' };\nconst bound = sayHi.bind(user).bind({ name: 'Vali' });\nbound();\n```",
      options: ["Ali", "Vali", "undefined", "TypeError"],
      correctAnswer: 0,
      explanation: "JavaScriptda `bind()` funksiyasi yordamida bog'langan kontekstni ikkinchi marta `bind()` orqali o'zgartirib bo'lmaydi. Birinchi marta bog'langan kontekst (`user`) doimiy bo'lib qoladi."
    },
    {
      id: 5,
      question: "Obyektni muzlatish (freezing) bo'yicha quyidagi kod natijasini toping:\n```javascript\nconst user = { name: 'Ali', details: { age: 25 } };\nObject.freeze(user);\nuser.name = 'Vali';\nuser.details.age = 30;\nconsole.log(user.name, user.details.age);\n```",
      options: ["Ali 25", "Vali 30", "Ali 30", "TypeError"],
      correctAnswer: 2,
      explanation: "`Object.freeze()` obyektdan nusxa olmaydi, uni o'zgartirib bo'lmaydigan qilib qo'yadi. Lekin u sayoz (shallow) ishlaydi, ya'ni faqat birinchi darajali xususiyatlarni muzlatadi. Ichki obyektlar (details) muzlamaydi, shuning uchun `user.name` o'zgarmaydi ('Ali'), lekin `user.details.age` o'zgaradi (30)."
    }
  ]
};
