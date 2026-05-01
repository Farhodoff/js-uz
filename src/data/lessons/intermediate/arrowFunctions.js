export const arrowFunctions = {
  id: "m3",
  title: "Arrow functions & Callbacks",
  theory: `## 1. ARROW FUNCTIONS (Arrow funksiyalar)
Arrow function — bu ES6 (2015) versiyasida qo'shilgan, funksiyalarni yozishning qisqa va zamonaviy usuli.

### Sintaksis farqi
\`\`\`javascript
// Oddiy funksiya
function sum(a, b) {
  return a + b;
}

// Arrow function
const sum = (a, b) => a + b;
\`\`\`

### Asosiy xususiyatlari:
1. **Implicit Return:** Agar funksiya faqat bitta qatordan iborat bo'lsa, \`return\` va \`{}\` qavslarni yozmasa ham bo'ladi.
2. **this konteksti:** Arrow function o'zining \`this\`iga ega emas (buni keyingi darslarda chuqurroq o'rganamiz).

---

## 2. CALLBACK FUNCTIONS (Qayta qo'ng'iroq funksiyalari)
Callback — bu boshqa bir funksiyaga **argument** sifatida berib yuboriladigan funksiya.

\`\`\`javascript
function xabar(callback) {
  console.log("Xabar yuborilmoqda...");
  callback(); // Callback funksiyani ichkarida chaqiramiz
}

xabar(() => {
  console.log("Xabar muvaffaqiyatli yuborildi!");
});
\`\`\`

\`\`\`mermaid
graph TD
    A[Main Function] --> B{Callback bormi?}
    B -- Ha --> C[Callbackni chaqirish]
    B -- Yo'q --> D[Tugatish]
    C --> D
\`\`\`

---

## 3. REAL MISOL: Massiv metodlarida
Callbacklar asosan \`map\`, \`filter\`, \`forEach\` kabi massiv metodlarida ishlatiladi.

\`\`\`javascript
const sonlar = [1, 2, 3];
const kvadratlar = sonlar.map(n => n * n); // Bu yerda (n => n * n) callback funksiyadir
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Middle)

1. **Arrow function va oddiy funksiya farqi nima?**
   *Javob:* Sintaksis qisqaligi, \`this\` bog'lanishi (arrowda o'ziniki yo'q) va \`arguments\` obyekti yo'qligi.

2. **Qachon arrow function ishlata olmaymiz?**
   *Javob:* Konstruktor funksiyalar (new bilan) va ba'zi \`this\` ga bog'liq bo'lgan metodlarda.

3. **Callback hell nima?**
   *Javob:* Callbacklar ichma-ich haddan tashqari ko'payib ketishi natijasida kodning o'qilishi qiyinlashib ketishi.`,
  exercises: [
    {
      id: 1,
      title: "Arrow sum",
      instruction: "Arrow function yordamida ikkita sonni ko'paytiruvchi 'multiply' funksiyasini yozing (bitta qatorda).",
      startingCode: "const multiply = // bu yerga yozing\n\nconsole.log(multiply(4, 5));",
      hint: "const multiply = (a, b) => a * b;",
      test: "if (logs.includes('20')) return null; return 'Natija 20 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Simple Callback",
      instruction: "'greet' funksiyasi bitta callback qabul qilsin va uni ichkarida chaqirsin.",
      startingCode: "function greet(callback) {\n  // callbackni chaqiring\n}\n\ngreet(() => console.log('Salom Callback'));",
      hint: "callback();",
      test: "if (logs.includes('Salom Callback')) return null; return 'Callback chaqirilmadi';"
    }
  ]
};
