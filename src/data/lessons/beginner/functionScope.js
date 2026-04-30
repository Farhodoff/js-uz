export const functionScopeLesson = {
  id: "b9",
  title: "Function Scope (Funksiya doirasi)",
  theory: `## Function Scope – o‘zgaruvchining funksiya ichida mavjudligi

Function Scope – o‘zgaruvchining faqat **funksiya ichida** mavjud bo‘lishi va tashqaridan kirish mumkin emasligi. JavaScriptda \`var\`, \`let\`, \`const\` bilan funksiya ichida e’lon qilingan har qanday o‘zgaruvchi – **function-scoped** hisoblanadi.

### Muhim qoidalar:
1. **Funksiya ichida e’lon qilingan o‘zgaruvchi** – tashqaridan ko‘rinmaydi.
2. **Funksiya parametrlari** ham function scope’ga kiradi.
3. **var** – funksiya ichida qayerda e’lon qilinsa, butun funksiya bo‘ylab mavjud (hoisting tufayli).
4. **let va const** – funksiya ichida ham blok scope’ga bo‘ysunadi, lekin baribir funksiyadan tashqariga chiqmaydi.

### Misol:
\`\`\`javascript
function example() {
  var a = 1;
  let b = 2;
  if (true) {
    var d = 4;    // function-scoped
    let e = 5;    // block-scoped
  }
  console.log(a, b, d); // 1, 2, 4
  // console.log(e); // ReferenceError
}
\`\`\`

### Funksiya ichidagi funksiya (Nested function):
\`\`\`javascript
function outer() {
  let outerVar = "tashqi";
  function inner() {
    console.log(outerVar); // "tashqi" – lexical scopedan oladi
  }
  inner();
}
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Function scope deganda nima tushuniladi?**
2. **var va let funksiya ichida qanday farq qiladi?**
3. **Hoisting function scope ichida qanday ishlaydi?**

### Middle daraja
4. **Nested funksiya tashqi funksiyaning o‘zgaruvchilariga qanday kirish huquqiga ega?**
5. **IIFE (Immediately Invoked Function Expression) function scope dan qanday foydalanadi?**
6. **Funksiya parametrlari bilan funksiya ichidagi o‘zgaruvchilar o‘rtasida nom ziddiyati bo‘lsa nima bo‘ladi?**`,
  task: `// 1. Funksiya yarating: uning ichida var, let, const bilan 3 xil o‘zgaruvchi e’lon qiling va ularni funksiyadan tashqarida chaqirib ko‘ring.
// 2. Funksiya ichida if bloki yarating va uning ichida var bilan o'zgaruvchi e'lon qiling. Ushbu o'zgaruvchini if blokidan tashqarida (lekin funksiya ichida) ishlating.
// 3. Nested function (ichma-ich funksiya) yarating va tashqi funksiya o'zgaruvchisini ichki funksiyada konsolga chiqaring.
// 4. Funksiya parametri bilan bir xil nomli o'zgaruvchini funksiya ichida let bilan e'lon qilib ko'ring. Nima sodir bo'lishini kuzating.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Function Scope isolation
function test() {
  var x = "var";
  let y = "let";
}
// console.log(x); // ReferenceError

// 2. var in function block
function varTest() {
  if (true) {
    var secret = 42;
  }
  console.log(secret); // 42 (chunki var function-scoped)
}

// 3. Nested function
function parent() {
  let money = 1000;
  function child() {
    console.log("Dadamda " + money + "$ bor");
  }
  child();
}

// 4. Parameter conflict
function greet(name) {
  // let name = "Ali"; // SyntaxError: Identifier 'name' has already been declared
}`
};
