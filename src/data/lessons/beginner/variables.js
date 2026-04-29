export const variables = {
  id: "b1",
  title: "O'zgaruvchilar va Ma'lumot turlari",
  theory: `## O'zgaruvchilar
Ma'lumotlarni saqlash uchun idishlar:
- \`let\`: Qiymati o'zgarishi mumkin bo'lgan o'zgaruvchilar.
- \`const\`: Qiymati o'zgarmas o'zgaruvchilar.

## Ma'lumot turlari (Data Types)
JavaScriptda 8 ta ma'lumot turi mavjud:
1. **String**: Matnlar ("Salom")
2. **Number**: Sonlar (25, 3.14)
3. **Boolean**: Mantiqiy (true, false)
4. **Undefined**: Qiymat berilmagan
5. **Null**: Bo'sh qiymat
6. **Object**: Murakkab tuzilmalar
7. **Symbol**: Unikal ID'lar
8. **BigInt**: Juda katta sonlar

\`typeof\` operatori orqali turini aniqlash mumkin.`,
  task: `// 1. 'let' yordamida 'name' va 'age' o'zgaruvchilarini yarating
// 2. 'const' yordamida 'pi' (3.14) o'zgaruvchisini yarating
// 3. typeof yordamida 5 ta har xil tipdagi qiymatlarni konsolga chiqaring

let name = "Ali";
// Davom ettiring...`,
  hint: `let name = "Ali";
let age = 25;
const pi = 3.14;
console.log(typeof "text");
console.log(typeof 10);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);`
};
