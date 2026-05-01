export const thisKeyword = {
  id: "i11",
  title: "this kalit so'zi (this keyword)",
  theory: `## 1. KIRISH
\`this\` — bu JavaScriptda funksiya chaqirilayotgan **kontekstga** (sharoitga) ishora qiluvchi ko'rsatkichdir. Uning qiymati funksiya qanday chaqirilganiga qarab o'zgaradi.

---

## 2. TO'RTTA BOG'LANISH QOIDASI

1.  **Global Binding:** Funksiya oddiy chaqirilganda, \`this\` global obyektga (window) teng.
2.  **Implicit Binding:** Funksiya obyekt ichida metod sifatida chaqirilganda (\`obj.metod()\`), \`this\` o'sha obyektga teng.
3.  **Explicit Binding:** \`call\`, \`apply\` yoki \`bind\` yordamida \`this\`ni o'zimiz belgilaymiz.
4.  **New Binding:** Konstruktor funksiya (\`new\`) ishlatilganda, \`this\` yangi obyektga teng bo'ladi.

\`\`\`mermaid
graph TD
    A[this nimaga teng?] --> B{new bormi?}
    B -- Ha --> C[Yangi obyekt]
    B -- Yo'q --> D{call/apply/bind?}
    D -- Ha --> E[Belgilangan obyekt]
    D -- Yo'q --> F{Obyekt metodi?}
    F -- Ha --> G[O'sha obyekt]
    F -- Yo'q --> H[Global / undefined]
\`\`\`

---

## 3. ARROW FUNCTION VA THIS ⭐
Arrow funksiyalarda o'zining \`this\` konteksti yo'q. Ular \`this\`ni o'zi yozilgan joydagi tashqi muhitdan (lexical scope) oladi.

\`\`\`javascript
const user = {
  name: "Ali",
  sayHi: () => {
    console.log(this.name); // ❌ undefined (chunki arrow function windowga qaraydi)
  },
  sayHello() {
    console.log(this.name); // ✅ Ali
  }
};
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **call va apply farqi nima?**
   *Javob:* \`call\` argumentlarni bittalab qabul qiladi, \`apply\` esa massiv ko'rinishida.

2. **bind() nima qaytaradi?**
   *Javob:* U funksiyani darhol ishlatmaydi, balki \`this\` bog'langan yangi funksiya qaytaradi.

3. **'use strict' ishlatilganda global this nima bo'ladi?**
   *Javob:* \`window\` emas, \`undefined\` bo'ladi. Bu xavfsizlik uchun qilingan.`,
  exercises: [
    {
      id: 1,
      title: "Implicit Binding",
      instruction: "Obyekt ichida 'this.name' ni qaytaradigan metod yozing.",
      startingCode: "const person = { name: 'Ali', getName() { /* bu yerda return qiling */ } };\nconsole.log(person.getName());",
      hint: "return this.name;",
      test: "if (logs.includes('Ali')) return null; return 'Ali chiqishi kerak';"
    },
    {
      id: 2,
      title: "Explicit Binding",
      instruction: "call() yordamida 'greet' funksiyasini 'user' obyekti bilan chaqiring.",
      startingCode: "const user = { name: 'Vali' };\nfunction greet() { console.log('Salom ' + this.name); }\n// Bu yerda call ishlating\n",
      hint: "greet.call(user);",
      test: "if (logs.includes('Salom Vali')) return null; return 'Salom Vali chiqishi kerak';"
    }
  ]
};
