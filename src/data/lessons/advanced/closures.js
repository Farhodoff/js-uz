export const closuresLesson = {
  id: "a8",
  title: "Closures (Yopiq muhitlar)",
  theory: `## Closure nima?

**Closure** – funksiya va uning lexical scope’idagi o‘zgaruvchilarni “eslab qolish” qobiliyati. Ichki funksiya tashqi funksiyaning o‘zgaruvchilariga, hatto tashqi funksiya tugaganidan keyin ham kirish huquqiga ega bo‘ladi.

### Oddiy misol:
\`\`\`javascript
function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    console.log(counter);
  }
}
const increment = outer();
increment(); // 1
increment(); // 2
\`\`\`

### Qayerda ishlatiladi?
- **Ma’lumotlarni yashirish (Private variables):** O'zgaruvchini tashqaridan to'g'ridan-to'g'ri o'zgartirib bo'lmaydi.
- **Funksiya fabrikalari:** Bir xil mantiqli, lekin turli qiymatli funksiyalar yaratish.
- **Callback funksiyalar:** Holatni (state) saqlab qolish uchun.

### Loop va Closure muammosi
\`var\` bilan e'lon qilingan o'zgaruvchilar loop ichida closure bilan muammo yaratadi. \`let\` bu muammoni hal qiladi, chunki u har iteratsiyada yangi scope yaratadi.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Closure nima? O'z so'zingiz bilan tushuntiring.**
2. **Nima uchun closure kerak?**
3. **Ichki funksiya tashqi funksiyaning o'zgaruvchisiga kira oladimi?**

### Middle daraja
4. **Closure xotira (memory leak) bilan qanday bog'liq?**
5. **Private o'zgaruvchilar yaratishda closure qanday yordam beradi?**
6. **Encapsulation (inkapsulyatsiya) darsiga closure misol bo'la oladimi?**`,
  task: `// 1. "multiplier(n)" funksiyasini yozing. U "m" qabul qiladigan va "n * m" qaytaradigan funksiya qaytarsin (closure).
// 2. createCounter() funksiyasini yarating. U obyekt qaytarsin, ichida increment, decrement va getValue metodlari bo'lsin. count o'zgaruvchisi private bo'lsin.
// 3. setTimeout va closure yordamida har bir sonni 1 sekund farq bilan chiqaradigan loop yozing (0 dan 2 gacha).

// Kodingizni shu yerga yozing`,
  hint: `// 1. Multiplier
function multiplier(n) {
  return (m) => n * m;
}
const double = multiplier(2);
console.log(double(5)); // 10

// 2. Counter object
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getValue: () => count
  };
}

// 3. Loop
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}`
};
