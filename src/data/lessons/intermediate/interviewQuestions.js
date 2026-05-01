export const interviewQuestionsIntermediate = {
  id: "q2",
  title: "🟡 Interview Savollar (O'rta daraja)",
  theory: `## Kirish
O'rta darajadagi intervyularda asosan JavaScriptning ichki ishlash mexanizmlari, ES6+ imkoniyatlari va asinxronlik haqida so'raladi.

---

## NAZARIY SAVOLLAR

### 1. Arrow function va oddiy function farqi nima? ⭐
**Qiyinlik:** 🟡 O'rta | **Mavzu:** Funksiyalar

<details>
<summary>📖 Javob</summary>

**Asosiy farqlar:**
1. **this:** Arrow funksiyalarda o'zining \`this\` konteksti yo'q. U tashqi muhitdan \`this\` ni oladi.
2. **arguments:** Arrow funksiyalarda \`arguments\` obyekti yo'q.
3. **constructor:** Arrow funksiyalarni \`new\` kalit so'zi bilan ishlatib bo'lmaydi.

**Kod misoli:**
\`\`\`javascript
const obj = {
  name: "Ali",
  sayHi: function() { console.log(this.name); },
  sayHiArrow: () => { console.log(this.name); }
};
obj.sayHi(); // → "Ali"
obj.sayHiArrow(); // → undefined
\`\`\`
</details>

### 2. Destructuring nima? ⭐
**Qiyinlik:** 🟢 Oson | **Mavzu:** ES6+

<details>
<summary>📖 Javob</summary>

Massiv yoki obyekt ichidagi qiymatlarni alohida o'zgaruvchilarga osonlik bilan ajratib olish usuli.

\`\`\`javascript
const user = { id: 1, ism: "Vali" };
const { ism } = user;
console.log(ism); // → "Vali"
\`\`\`
</details>

### 3. Spread va Rest operatorlari farqi? ⭐
**Qiyinlik:** 🟡 O'rta | **Mavzu:** ES6+

<details>
<summary>📖 Javob</summary>

**Spread (...):** To'plamni (massiv/obyekt) alohida elementlarga yoyib yuboradi.
**Rest (...):** Alohida elementlarni bitta to'plamga (massivga) yig'ib oladi.

\`\`\`javascript
// Spread
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
\`\`\`
</details>

---

## AMALIY SAVOLLAR

### 1. Massivdagi dublikatlarni o'chirish
**Topshiriq:** \`[1, 2, 2, 3, 4, 4]\` massividan takrorlanuvchi sonlarni o'chiring.

<details>
<summary>✅ Yechim</summary>

\`\`\`javascript
// Set yordamida eng oson usul
const arr = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(arr)];
console.log(unique); // → [1, 2, 3, 4]
\`\`\`
</details>

### 2. Obyektni chuqur klonlash (Deep Clone)
**Topshiriq:** Obyekt nusxasini shunday olingki, ichki obyektlar ham yangi manzilda bo'lsin.

<details>
<summary>✅ Yechim</summary>

\`\`\`javascript
const original = { a: 1, b: { c: 2 } };
const clone = JSON.parse(JSON.stringify(original));
\`\`\`
</details>

---

## BU KOD NIMA CHIQARADI?

### Savol #1: Object references
\`\`\`javascript
let a = { name: "Ali" };
let b = a;
b.name = "Vali";
console.log(a.name);
\`\`\`
- A) Ali
- B) Vali ✅
- C) undefined
- D) ReferenceError

**Sababi:** Obyektlar referens orqali uzatiladi. \`b = a\` qilinganda ikkala o'zgaruvchi xotiradagi bitta joyga ishora qiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Unique Elements",
      instruction: "Massivdan takrorlanuvchi elementlarni Set yordamida o'chiring.",
      startingCode: "const data = [10, 20, 10, 30, 20];\n// Unique massiv yarating\n",
      hint: "[...new Set(data)]",
      test: "if (logs.join(',').includes('10,20,30')) return null; return 'Faqat takrorlanmas elementlar qolishi kerak';"
    }
  ]
};
