export const scopeLesson = {
  id: "b8",
  title: "O‘zgaruvchi doirasi (Scope)",
  theory: `## Scope – JavaScriptda ko‘rinish sohasi

Scope – o‘zgaruvchi, funksiya yoki obyektning qayerda mavjudligi va qayerdan kirish mumkinligini belgilaydi. JavaScriptda 3 turdagi scope bor:

### 1. Global Scope
- Eng tashqi daraja (funksiya yoki blokdan tashqarida e’lon qilingan o‘zgaruvchi).
- Har qanday joydan (shu jumladan funksiya ichidan) kirish mumkin.
- Brauzerda \`var\` bilan e’lon qilingan global o‘zgaruvchi \`window\` obyektiga birikadi.

### 2. Function Scope (Lokal scope)
- Funksiya ichida \`var\`, \`let\`, \`const\` bilan e’lon qilingan o‘zgaruvchi faqat o‘sha funksiya ichida mavjud.
- Tashqaridan kirish mumkin emas.

### 3. Block Scope
- \`{}\` (if, for, while, switch) ichida \`let\` va \`const\` bilan e’lon qilingan o‘zgaruvchilar faqat shu blok ichida mavjud.
- \`var\` **blok scopega bo‘ysunmaydi** (faqat funksiya scopega bo‘ysunadi).

### Lexical Scope (Static Scope)
- Funksiyalar qayerda e’lon qilingan bo‘lsa, o‘sha joydagi o‘zgaruvchilarga kirish huquqiga ega (qayerda chaqirilganiga qaramasdan).

### Scope Chain
- Ichki funksiya o‘z scope’ida topa olmagan o‘zgaruvchini tashqi (parent) scope’lardan qidirib topadi. Bu zanjir global scope’gacha davom etadi.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Scope nima? Global va lokal scope farqi?**
2. **var va let scope jihatidan qanday farq qiladi?**
3. **Lexical scope nima?**

### Middle daraja
4. **Scope chain qanday ishlaydi?**
5. **IIFE (Immediately Invoked Function Expression) nima va u scope bilan qanday bog‘liq?**
6. **var bilan e’lon qilingan o‘zgaruvchi for loop ichida va tashqarisida qanday farq qiladi?**`,
  task: `// 1. Global o'zgaruvchi yarating va uni funksiya ichida ishlating.
// 2. Funksiya ichida o'zgaruvchi yarating va unga funksiyadan tashqarida murojaat qilib ko'ring (xatoni kuzating).
// 3. if bloki ichida var va let bilan o'zgaruvchilar yarating. Ularning blokdan tashqarida ko'rinishini tekshiring.
// 4. Lexical scope: Tashqi funksiyada o'zgaruvchi yarating va ichki funksiyada uni konsolga chiqaring.
// 5. Scope Chain: Global, Outer va Inner darajalarda o'zgaruvchilar yarating va eng ichki funksiyada hammasini ishlating.

// Kodingizni shu yerga yozing`,
  hint: `// 1 & 2. Global vs Local
let globalVar = "Global";
function checkScope() {
  let localVar = "Local";
  console.log(globalVar); // Ishlaydi
}
// console.log(localVar); // ReferenceError

// 3. Block Scope
if (true) {
  var v = "var";
  let l = "let";
}
console.log(v); // "var"
// console.log(l); // ReferenceError

// 4 & 5. Lexical Scope & Chain
let name = "Global Scope";
function outer() {
  let outerVal = "Outer Scope";
  function inner() {
    let innerVal = "Inner Scope";
    console.log(innerVal, outerVal, name);
  }
  inner();
}
outer();`
};
