export const dataTypesLesson = {
  id: "b2",
  title: "Ma'lumotlar Turlari (Data Types)",
  theory: `## JavaScriptda Ma'lumotlar Turlari

JavaScriptda 8 ta asosiy ma’lumot turi mavjud. Shundan 7 tasi **primitive** (oddiy) va 1 tasi **complex** (murakkab - Object).

### 1. String (Matn)
Matnli ma’lumotlarni saqlash uchun. Qo‘shtirnoq (\`"\`), birtirnoq (\`'\`), yoki backtick (\` \` \`) bilan yoziladi.
- Uzunligi: \`.length\`
- Metodlar: \`.toUpperCase()\`, \`.slice()\` va b.

### 2. Number (Son)
Butun va kasr sonlar. 
- Maxsus qiymatlar: \`Infinity\`, \`-Infinity\`, \`NaN\` (Not a Number).
- \`"salom" * 5\` natijasi \`NaN\` bo‘ladi.

### 3. Boolean (Mantiqiy)
Faqat ikkita qiymat: \`true\` (rost) yoki \`false\` (yolg‘on).

### 4. Undefined
O‘zgaruvchi e’lon qilingan, lekin qiymat berilmagan holat. JavaScript avtomatik beradi.

### 5. Null
\`null\` – “bo‘sh” degan ma’noni dasturchi **o‘zi** beradi.
- **Diqqat:** \`typeof null\` natijasi \`"object"\` chiqadi (JS dagi eski xatolik).

### Ma'lumot turlarini tekshirish: \`typeof\`
\`\`\`javascript
typeof "Ali"      // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object"
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **JavaScriptda nechta primitiv ma’lumot turi bor?**
2. **undefined va null farqi nimada?**
3. **typeof null nima qaytaradi va nega?**

### Middle daraja
4. **NaN nima va uni qanday to‘g‘ri tekshirish mumkin?**
5. **"+" operatori string va number bilan qanday ishlaydi?**
6. **BigInt nima va u qachon kerak?**`,
  task: `// 1. Har xil turdagi (string, number, boolean, undefined, null) o'zgaruvchilar yarating.
// 2. typeof operatori yordamida ularning turlarini konsolga chiqaring.
// 3. Stringni numberga o'tkazishning 3 xil usulini ko'rsating (Number(), parseInt, +).
// 4. NaN natijasini beruvchi matematik amal yozing va uni isNaN() bilan tekshiring.
// 5. "5" + 3 va "5" - 3 amallarini bajarib, natijalarni va sababini izohlang.

// Kodingizni shu yerga yozing`,
  hint: `// 1 & 2. Types
let s = "JS"; let n = 10; let b = true; let u; let nl = null;
console.log(typeof s, typeof n, typeof b, typeof u, typeof nl);

// 3. Conversion
let str = "100";
console.log(Number(str), parseInt(str), +str);

// 4. NaN
let wrong = "olma" / 2;
console.log(isNaN(wrong)); // true

// 5. Coercion
console.log("5" + 3); // "53" (string concatenation)
console.log("5" - 3); // 2 (mathematical subtraction)`
};
