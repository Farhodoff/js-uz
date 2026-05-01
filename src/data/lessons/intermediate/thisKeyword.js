export const thisKeyword = {
  id: "i11",
  title: "this kalit so'zi (this keyword)",
  theory: `## 1. KIRISH
Intervyularda eng ko'p "yiqitadigan" savol: **"Bu yerda 'this' nimaga teng?"**.
\`this\` - bu JavaScriptda funksiya chaqirilayotgan **kontekstga** (sharoitga) ishora qiluvchi ko'rsatkichdir. U doimiy emas, u o'zgaruvchandir.

## 2. TUSHUNCHA

### Sodda ta'rif
\`this\` - bu "men" degan so'zga o'xshaydi. Men (this) kimligim, qayerda va kim bilan gaplashayotganimga qarab o'zgaradi.

### To'rt xil qoida (Binding)
1. **Global/Window**: Agar funksiya oddiy chaqirilsa, \`this\` global obyektga (brauzerda \`window\`) teng.
2. **Implicit (Obyekt ichida)**: Funksiya obyekt orqali chaqirilsa (\`obj.sayHi()\`), \`this\` o'sha obyektga teng.
3. **Explicit (call, apply, bind)**: Biz \`this\` ni o'zimiz majburlab bog'lab qo'yamiz.
4. **New**: Konstruktor orqali yaratilganda, \`this\` yangi yaratilgan obyektga teng.

---

## 3. KOD MISOLLARI

### Misol 1 — Obyekt konteksti
\`\`\`javascript
const user = {
  name: "Farhod",
  sayHi() {
    console.log("Salom, men " + this.name);
  }
};

user.sayHi(); // → "Salom, men Farhod"
const externalSay = user.sayHi;
externalSay(); // → "Salom, men undefined" (chunki this endi window)
\`\`\`

### Misol 2 — Arrow Function farqi ⭐
Arrow funksiyalarda o'zining \`this\`i yo'q. U o'zi yozilgan joydagi (lexical) kontekstni oladi.
\`\`\`javascript
const group = {
  title: "JS Guru",
  members: ["Ali", "Vali"],
  list() {
    this.members.forEach((m) => {
      console.log(this.title + ": " + m); // this ishladi!
    });
  }
};
group.list();
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### 'this' kim? (Decision Tree)
\`\`\`
Funksiya qanday chaqirildi?
  │
  ├── new bilanmi? ──────▶ Yangi obyekt
  │
  ├── call/bind/apply? ──▶ Bog'langan (explicit) obyekt
  │
  ├── Obyekt ichidami? ──▶ O'sha obyekt (implicit)
  │
  └── Oddiy chaqirildimi? ─▶ Global (Window / undefined)
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Arrow functionda this qanday ishlaydi?** - Uning o'z \`this\`i yo'q, u o'zi yaratilgan muhitdagi \`this\`ni ishlatadi.
2. **call, apply va bind farqi?** - \`call\` va \`apply\` funksiyani darhol ishlatadi, \`bind\` esa yangi funksiya qaytaradi.
3. **'use strict' rejimida this nima bo'ladi?** - Global chaqiriqda \`window\` emas, \`undefined\` bo'ladi.

---

## 6. MINI LOYIHA: "Context Switcher"
**Vazifa:** Bitta funksiyani turli obyektlar bilan ishlating.

\`\`\`javascript
function introduce(job) {
  console.log(\`Men \${this.name}, kasbim \${job}\`);
}

const p1 = { name: "Ali" };
const p2 = { name: "Vali" };

introduce.call(p1, "Dasturchi"); // → Men Ali, kasbim Dasturchi
introduce.apply(p2, ["Dizayner"]); // → Men Vali, kasbim Dizayner
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "this bog'lash",
      instruction: "bind() yordamida 'greet' funksiyasini 'person' obyektiga bog'lang.",
      startingCode: "const person = { name: 'Bob' };\nfunction greet() { console.log(this.name); }\n// Bog'lang\nconst boundGreet = greet.bind(person);\n",
      hint: "greet.bind(person)",
      test: "if (code.includes('.bind(person)')) return null; return 'bind(person) ishlatilishi shart';"
    }
  ]
};
