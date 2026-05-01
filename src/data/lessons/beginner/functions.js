export const functions = {
  id: "b4",
  title: "Funksiya: Deklaratsiya va Arrow",
  theory: `## 1. FUNKSIYA DEKLARATSIYASI
Funksiya — bu ma'lum bir vazifani bajaradigan kod bo'lagi. Uni bir marta yozib, istalgancha qayta ishlatish mumkin.

### Hoisting (Ko'tarilish)
Funksiya deklaratsiyasining eng katta ustunligi — uni e'lon qilishdan **oldin** ham chaqirish mumkin.

\`\`\`javascript
salomBer(); // Ishlaydi!

function salomBer() {
  console.log("Salom!");
}
\`\`\`

---

## 2. ARROW FUNCTIONS (Zamonaviy usul)
ES6 versiyasida qo'shilgan bu usul funksiyalarni qisqaroq yozish imkonini beradi.

\`\`\`javascript
// Oddiy funksiya
const kvadrat = function(x) {
  return x * x;
};

// Arrow funksiya
const kvadratArrow = x => x * x;
\`\`\`

### Arrow funksiya xususiyatlari:
- Agar funksiya bitta qatordan iborat bo'lsa, \`return\` va \`{}\` shart emas.
- \`this\` konteksti bilan boshqacha ishlaydi (keyinchalik o'rganamiz).

---

## 3. PARAMETR VA RETURN
- **Parametr:** Funksiyaga tashqaridan keladigan ma'lumot (o'zgaruvchi).
- **Default parametr:** Agar qiymat berilmasa, ishlatiladigan standart qiymat.
- **Return:** Funksiya natijasini qaytaradi.

\`\`\`javascript
function ko'paytir(a, b = 1) {
  return a * b;
}

console.log(ko'paytir(5, 3)); // 15
console.log(ko'paytir(10));    // 10 (b default 1 bo'ldi)
\`\`\`

\`\`\`mermaid
graph LR
    A[Parametrlar] --> B(Funksiya)
    B --> C[Return: Natija]
    style B fill:#f9f,stroke:#333
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **Hoisting funksiyalarda qanday ishlaydi?**
   *Javob:* Function declaration butunligicha tepaga ko'tariladi, shuning uchun e'lon qilinishidan oldin ham ishlaydi.

2. **Arrow funksiyada 'return' qachon yozilmaydi?**
   *Javob:* Funksiya tanasi bir qatordan iborat bo'lganda va \`{}\` qavslar ishlatilmaganda.

3. **Funksiya 'return' qilmasa nima qaytaradi?**
   *Javob:* Har doim \`undefined\` qaytaradi.`,
  exercises: [
    {
      id: 1,
      title: "Juft sonni tekshirish",
      instruction: "Son juft bo'lsa true, toq bo'lsa false qaytaradigan 'isEven' funksiyasini yozing.",
      startingCode: "function isEven(n) {\n  // Bu yerga yozing\n}\n\nconsole.log(isEven(4));",
      hint: "return n % 2 === 0;",
      test: "if (logs.includes('true')) return null; return '4 uchun true qaytarishi kerak';"
    },
    {
      id: 2,
      title: "Arrow Square",
      instruction: "Arrow funksiya yordamida sonning kvadratini qaytaradigan 'square' funksiyasini bir qatorda yozing.",
      startingCode: "const square = \n\nconsole.log(square(5));",
      hint: "const square = n => n * n;",
      test: "if (logs.includes('25')) return null; return 'Natija 25 bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Default Greet",
      instruction: "'name' va 'msg' qabul qiladigan funksiya yozing. 'msg' ning default qiymati 'Salom' bo'lsin.",
      startingCode: "function greet(name, msg = 'Salom') {\n  return msg + ', ' + name;\n}\n\nconsole.log(greet('Ali'));",
      hint: "Parametrlarda msg = 'Salom' deb yozing.",
      test: "if (logs.includes('Salom, Ali')) return null; return 'Default qiymat bilan Salom, Ali chiqishi kerak';"
    }
  ]
};