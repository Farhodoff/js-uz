export const prototypesLesson = {
  id: "a18",
  title: "Prototypes va Inheritance (Merosxo'rlik)",
  theory: `## 1. KIRISH
JavaScriptda deyarli hamma narsa - obyekt. Lekin bu obyektlar qanday qilib \`.toString()\` yoki \`.map()\` kabi metodlarni o'z-o'zidan biladi? Javob - **Prototypes**. 

Agar siz buni tushunsangiz, JS qanday qurilganini anglaysiz.

## 2. TUSHUNCHA

### Prototype (Prototip)
Har bir JS obyektining yashirin \`[[Prototype]]\` (yoki \`__proto__\`) xususiyati bor. Bu uning "otasi" yoki "andozasi"ga ishora qiladi.

### Prototip Zanjiri (Prototype Chain)
Agar siz obyektda yo'q xususiyatni qidirsangiz, JS uni uning prototipidan qidiradi. Agar u yerda ham yo'q bo'lsa, uning "bobosidan" qidiradi. Bu zanjir \`null\` ga yetguncha davom etadi.

---

## 3. KOD MISOLLARI

### Misol 1 — Prototip orqali metod qo'shish
\`\`\`javascript
function Robot(name) {
  this.name = name;
}

// Metodni prototipga qo'shamiz (xotirani tejaydi)
Robot.prototype.sayHi = function() {
  console.log("Salom, men " + this.name);
};

const r1 = new Robot("R2D2");
r1.sayHi(); // → Salom, men R2D2
\`\`\`

### Misol 2 — Merosxo'rlik (Inheritance)
\`\`\`javascript
const hayvon = { yeydi: true };
const quyon = { sakraydi: true };

// Quyon hayvondan meros oladi
quyon.__proto__ = hayvon; 

console.log(quyon.yeydi); // → true (Hayvondan keldi)
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Prototip Zanjiri Vizualizatsiyasi
\`\`\`mermaid
graph TD
    A[Obyekt: quyon] -- ishora qiladi --> B[Prototip: hayvon]
    B -- ishora qiladi --> C[Prototip: Object.prototype]
    C -- ishora qiladi --> D[null]
\`\`\`
*Agar quyon.yeydi chaqirilsa va quyonda yo'q bo'lsa, JS tepaga (hayvonga) qarab chiqadi.*

---

## 5. INTERVYU SAVOLLARI
1. **Prototype nima?** - Obyektlar o'rtasida metod va xususiyatlarni bo'lishish uchun ishlatiladigan mexanizm.
2. **__proto__ va prototype farqi nima?** - \`__proto__\` bu obyektning o'zidagi ishora, \`prototype\` esa konstruktor funksiyadagi andozadir.
3. **Merosxo'rlikning qanday turlari bor?** - Prototip asosidagi (JS) va Klass asosidagi (Java/C++).

---

## 6. MINI LOYIHA: "Custom Array Method"
**Vazifa:** Barcha massivlar uchun \`.oxirgisi()\` degan metod yarating, u massivning oxirgi elementini qaytarsin.

\`\`\`javascript
Array.prototype.oxirgisi = function() {
  return this[this.length - 1];
};

const sonlar = [1, 2, 3, 4, 5];
console.log(sonlar.oxirgisi()); // → 5
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Prototip qo'shish",
      instruction: "String prototipiga 'salomlash' metodini qo'shing, u 'Salom ' + matn qaytarsin.",
      startingCode: "// String.prototype bilan ishlang\n",
      hint: "String.prototype.salomlash = function() { ... }",
      test: "if ('test'.salomlash() === 'Salom test') return null; return 'Salomlash metodi noto\\'g\\'ri ishlayapti';"
    }
  ]
};
