export const typeConversionLesson = {
  id: "b15",
  title: "Type Conversion (Tiplarni o'zgartirish)",
  theory: `## Type Conversion (Tiplarni o‘zgartirish)

JavaScript – dinamik tipli til. O‘zgaruvchining turi avtomatik (implicit) yoki qo‘lda (explicit) o‘zgarishi mumkin.

### 1. Avtomatik (Implicit) Conversion
JavaScript operatorlar va kontekstga qarab tiplarni o‘zi o‘zgartiradi.
- **String + anything → string:** \`"5" + 3\` → \`"53"\`
- **Arifmetik amallar (-, *, /, %) → number:** \`"10" - 2\` → \`8\`, \`"5" * "2"\` → \`10\`

### 2. Qo‘lda (Explicit) Conversion
- **String ga o‘tkazish:** \`String(123)\`, \`(456).toString()\`
- **Number ga o‘tkazish:** \`Number("123")\`, \`parseInt("123px")\`, \`+"123"\`
- **Boolean ga o‘tkazish:** \`Boolean(1)\` → \`true\`, \`Boolean(0)\` → \`false\`

### Falsy (yolg‘on) qiymatlar (6 ta):
\`false\`, \`0\`, \`""\` (bo‘sh string), \`null\`, \`undefined\`, \`NaN\` – hammasi Boolean kontekstida \`false\` hisoblanadi. Rest (qolgan hamma narsa) – **truthy**.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Implicit va explicit conversion farqi nima?**
2. **Falsy qiymatlarni sanab bering.**
3. **"5" - 3 va "5" + 3 natijasi nima chiqadi?**

### Middle daraja
4. **[] + [] natijasi nima?** (Javob: "")
5. **Nima uchun "0" truthy, lekin 0 falsy?**
6. **Double bang (!!) operatori nima uchun ishlatiladi?**`,
  task: `// 1. Sonni stringga o'tkazishning 2 xil usulini yozing.
// 2. Stringni ("123.45") songa o'tkazing (kasr qismi bilan).
// 3. Quyidagi qiymatlarni Boolean() orqali tekshiring: 0, "0", "", " ", null, undefined.
// 4. "10" / "2" va "10" + "2" natijalarini ko'ring.
// 5. Implicit conversion yordamida boolean qiymatni stringga qo'shing.

// Kodingizni shu yerga yozing`,
  hint: `// 1. To String
let n = 10;
console.log(String(n), n.toString());

// 2. To Number
let s = "123.45";
console.log(parseFloat(s), +s);

// 3. Boolean
console.log(Boolean(0)); // false
console.log(Boolean("0")); // true (bo'sh emas)

// 4. Coercion
console.log("10" / "2"); // 5
console.log("10" + "2"); // "102"`
};
