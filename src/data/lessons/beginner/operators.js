export const operators = {
  id: "b16",
  title: "Operatorlar (Operators)",
  theory: `## JavaScript Operatorlari

### 1. Arifmetik operatorlar
\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (qoldiq), \`**\` (daraja)

### 2. Tayinlash operatorlari
\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`
\`\`\`javascript
let x = 5;
x += 3; // x = 8
\`\`\`

### 3. Taqqoslash operatorlari
- \`==\` (qiymatni solishtiradi)
- \`===\` (qiymat va turni solishtiradi - STRICT)
- \`!=\`, \`!==\`, \`>\`, \`<\`, \`>=\`, \`<=\`

### 4. Mantiqiy operatorlar
- **&& (VA):** Birinchi falsy ni yoki oxirgi truthy ni qaytaradi.
- **|| (YOKI):** Birinchi truthy ni qaytaradi.
- **! (EMAS):** Qiymatni teskarisiga o'zgartiradi.

### 5. Ternary Operator
\`shart ? rost bo'lsa : yolg'on bo'lsa\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **== va === o‘rtasidagi farq nima?**
2. **% operatori nima vazifani bajaradi?**
3. **Mantiqiy "&&" operatori qanday ishlaydi?**

### Middle daraja
4. **Short-circuit evaluation nima?**
5. **Nullish Coalescing (??) va OR (||) farqi?**
6. **Taqqoslashda [] == ![] natijasi nima bo'ladi va nega?**`,
  task: `// 1. 2 ning 10-darajasini hisoblang (** operatori bilan).
// 2. let y = 10; o'zgaruvchisiga 5 ni qo'shib tayinlang (+= operatori).
// 3. 10 va "10" ni == va === bilan solishtiring.
// 4. Mantiqiy || operatori yordamida foydalanuvchi nomi bo'lmasa "Mehmon" qiymatini beradigan kod yozing.
// 5. Ternary operator bilan son juft yoki toqligini aniqlang.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Daraja
console.log(2 ** 10);

// 2. Tayinlash
let y = 10; y += 5;

// 3. Taqqoslash
console.log(10 == "10");  // true
console.log(10 === "10"); // false

// 4. Mantiqiy ||
let user = "";
let name = user || "Mehmon";

// 5. Ternary
let n = 7;
let res = n % 2 === 0 ? "Juft" : "Toq";`
};
