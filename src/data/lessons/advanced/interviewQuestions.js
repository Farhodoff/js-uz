export const interviewQuestionsAdvanced = {
  id: "q3",
  title: "🔴 Interview Savollar (Murakkab)",
  theory: `## Kirish
Ilg'or darajadagi intervyular asosan arxitektura, optimizatsiya va JavaScriptning eng murakkab qismlari haqida bo'ladi.

---

## NAZARIY SAVOLLAR

### 1. Event Loop qanday ishlaydi? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** Asinxronlik

<details>
<summary>📖 Javob</summary>

**Qisqa javob:**
Event Loop - bu JavaScriptning single-threaded tabiatini saqlagan holda asinxron amallarni bajarishga imkon beruvchi mexanizm.

**Ishlash tartibi:**
1. Call Stack bo'shligini tekshiradi.
2. Microtask Queue (Promises) dagi barcha vazifalarni bajaradi.
3. Task Queue (setTimeout) dagi bitta vazifani Stack'ga olib keladi.
</details>

### 2. Prototype Chain nima? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** OOP

<details>
<summary>📖 Javob</summary>

JavaScriptda har bir obyektning yashirin \`[[Prototype]]\` xususiyati bor. Agar biror xususiyat obyektning o'zida topilmasa, JS uni prototipdan qidiradi. Bu zanjir \`null\` ga yetguncha davom etadi.
</details>

### 3. Debounce va Throttle farqi nima? ⭐
**Qiyinlik:** 🔴 Qiyin | **Mavzu:** Performance

<details>
<summary>📖 Javob</summary>

**Debounce:** Ketma-ket kelayotgan chaqiriqlarni to'xtatib, oxirgisidan keyin ma'lum vaqt o'tgach ishlaydi (masalan, qidiruv inputi).
**Throttle:** Chaqiriqlar sonidan qat'i nazar, ma'lum vaqt oralig'ida faqat bir marta ishlaydi (masalan, scroll event).
</details>

---

## AMALIY SAVOLLAR

### 1. Currying funksiyasini yozing
**Topshiriq:** \`sum(1)(2)(3)\` ko'rinishida ishlaydigan funksiya yarating.

<details>
<summary>✅ Yechim</summary>

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
</details>

### 2. Deep Flatten Array
**Topshiriq:** \`[1, [2, [3, 4]]]\` massivini \`[1, 2, 3, 4]\` holatiga keltiring (flat() ishlatmay).

<details>
<summary>✅ Yechim</summary>

\`\`\`javascript
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
\`\`\`
</details>

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
  ]
};
