export const strictMode = {
  id: "strictMode",
  title: "Qat'iy Rejim (Strict Mode)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### strict mode — qattiq nazoratchi
Odatda JavaScript juda "bag'rikeng": ba'zi xatolarni indamay o'tkazib yuboradi. \`"use strict"\` qo'shsangiz — **qattiq nazorat** yoqiladi va xatolar darhol ushlanadi.

\`\`\`javascript
"use strict";

let ism = "Ali";  // ✅ to'g'ri
ismma = "Vali";   // ❌ ReferenceError! (ismma e'lon qilinmagan)
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **haydovchilik imtihonidasiz**:
- **Strict mode yo'q** — instruktor indamay o'tiradi: yo'lni noto'g'ri tanladingiz? Hech narsa demaydi, oxiri katta baxtsizlik!
- **Strict mode bor** — instruktor darhol aytadi: "to'xtang, bu xato!" — muammoni erta tuzatasiz

---

## 2. 💻 Nimalarni Ushlaydi?

### 1. E'lon qilinmagan o'zgaruvchi
\`\`\`javascript
"use strict";
x = 5;  // ❌ ReferenceError: x is not defined
\`\`\`

### 2. O'chirib bo'lmaydigan narsani o'chirish
\`\`\`javascript
"use strict";
delete Object.prototype;  // ❌ TypeError
\`\`\`

### 3. Takroriy parametr
\`\`\`javascript
"use strict";
function f(a, a) { }  // ❌ SyntaxError
\`\`\`

### 4. Zaxira so'zni nom qilish
\`\`\`javascript
"use strict";
let public = 5;  // ❌ SyntaxError (kelajakdagi kalit so'z)
\`\`\`

\`\`\`mermaid
flowchart TD
    A["'use strict'"] --> B["E'lon qilinmagan o'zgaruvchi"]
    A --> C["Takroriy parametr"]
    A --> D["Zaxira so'z"]
    B --> E["Darhol xato!"]
    C --> E
    D --> E
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`"use strict";\` — fayl yoki funksiyaning **eng boshida** yozilishi shart (izohdan keyin bo'lsa ham bo'ladi, lekin kod oldinda bo'lsa — ishlamaydi).

**Muhim:** Zamonaviy modullar (\`import\`/\`export\`) va class'lar AVTOMATIK strict rejimda ishlaydi! React loyihalarida bu allaqachon yoniq.

\`\`\`javascript
// Bu modul — avtomatik strict:
export function hisob() {
  x = 5;  // ❌ xato beradi (strict avtomatik!)
}
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`"use strict"\` ni kod o'rtasiga yozish | Eng boshiga | O'rtada bo'lsa e'tiborsiz qoladi |
| Strict yoqilgach eski kodni tuzatmaslik | E'lon qilinmagan o'zgaruvchilarni topib tuzatish | Strict xatolarni OSHKOR qiladi, yaratmaydi |
| \`this\` ni strict'da ham bir xil deb o'ylash | Strict'da funksiyada \`this\` = \`undefined\` | Muhim farq (keyingi darslarda) |

---

## 5. 🔑 Asosiy Atamalar

- **strict mode** — qattiq nazorat rejimi
- **ReferenceError** — e'lon qilinmagan narsaga murojaat
- **Sloppy mode** — strict'siz "bo'sh" rejim (eski xatti-harakat)

---

## 6. 🌍 Real Hayotda Qayerda?

- **React/Vue loyihalari** — modullar avtomatik strict
- **Kutubxonalar** — xatolarni erta ushlash uchun strict yoqadi
- **Eski kod** — strict yoqilganda ko'plab xatolar aniqlanadi (foyda!)

---

## 7. 🎙 Intervyu Savollari

**1. \`"use strict"\` nima qiladi?**
**Javob:** Xatolarni indamay o'tkazish o'rniga darhol xato beradi (e'lon qilinmagan o'zgaruvchi va h.k.).

**2. Modullarda \`"use strict"\` yozish kerakmi?**
**Javob:** Yo'q — modullar va class'lar avtomatik strict rejimda.

**3. Strict rejim mavjud kodni buzadimi?**
**Javob:** Balki — yashirin xatolar oshkor bo'ladi. Bu yaxshi: erta tuzatasiz.

---

## 8. ✅ Xulosa

- **\`"use strict";\`** — eng boshida, qattiq nazorat
- **Xatolarni erta ushlaydi** — yashirin buglarni oshkor qiladi
- **Modullar avtomatik strict**
- **Keyingi qadam:** 1.22-darsda JavaScript'ning mashhur tuzoqlari — gotchas
`,
exercises: [
    {
      id: 1,
      title: "Strict yoqish",
      instruction: "Kod boshida `\"use strict\";` yozing va `let ism = \"Ali\";` e'lon qiling.",
      startingCode: "// \"use strict\" yozing\n",
      hint: "\"use strict\";\nlet ism = \"Ali\";",
      test: "if (!code.trim().startsWith('\"use strict\"') && !code.trim().startsWith(\"'use strict'\")) return 'Eng boshida \"use strict\"; bo\\'lishi kerak';\nconst v = new Function(code + '; return ism;')();\nif (v === 'Ali') return null;\nreturn 'ism = Ali bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "To'g'ri e'lon",
      instruction: "`hisob()` funksiyasini yozing: ichida `\"use strict\";` va `let jami = 10 + 5;` bo'lsin, `jami` qaytarilsin.",
      startingCode: "function hisob() {\n  // strict + let\n}\n",
      hint: "\"use strict\"; let jami = 10 + 5; return jami;",
      test: "const fn = new Function(code + '; return hisob;')();\nif (fn() === 15) return null;\nreturn '15 qaytarishi kerak';"
    },
    {
      id: 3,
      title: "Xatoni ushlash",
      instruction: "`safeRun()` funksiyasi yozing: ichida `\"use strict\";` bilan e'lon qilinmagan o'zgaruvchiga (`x = 5;`) murojaat qilib XATO chiqishini ta'minlang. Funksiya xatoni `try/catch` bilan ushlab `\"Xato ushlandi\"` qaytarsin.",
      startingCode: "function safeRun() {\n  \"use strict\";\n  // try/catch yozing\n}\n",
      hint: "try { x = 5; } catch (e) { return \"Xato ushlandi\"; }",
      test: "const fn = new Function(code + '; return safeRun;')();\nif (fn() === 'Xato ushlandi') return null;\nreturn 'try/catch bilan xatoni ushlang';"
    },
    {
      id: 4,
      title: "Strict solishtirish",
      instruction: "`demo()` funksiyasi `\"use strict\";` bilan ishlab, `[1, 2]` massivini qaytarsin — strict rejimda ham kod to'g'ri ishlashini ko'ring.",
      startingCode: "function demo() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "\"use strict\"; let a = 1; let b = 2; return [a, b];",
      test: "const fn = new Function(code + '; return demo;')();\nif (JSON.stringify(fn()) === JSON.stringify([1,2])) return null;\nreturn '[1,2] qaytarishi kerak';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "`\"use strict\"` qayerga yoziladi?",
      options: [
        "Fayl oxiriga",
        "Fayl yoki funksiyaning eng boshiga",
        "Istalgan joyga",
        "Faqat izohga"
      ],
      correctAnswer: 1,
      explanation: "Boshida bo'lmasa — e'tiborsiz qoladi."
    },
    {
      id: 2,
      question: "Strict rejimda `x = 5;` (e'lonsiz) nima bo'ladi?",
      options: [
        "O'zgaruvchi yaratiladi",
        "ReferenceError beradi",
        "Jimgina o'tadi",
        "undefined bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Strict yashirin xatolarni ushlaydi."
    },
    {
      id: 3,
      question: "Modullarda `\"use strict\"` yozish kerakmi?",
      options: [
        "Ha, shart",
        "Yo'q — avtomatik strict",
        "Faqat React'da",
        "Faqat Node'da"
      ],
      correctAnswer: 1,
      explanation: "import/export va class avtomatik strict."
    },
    {
      id: 4,
      question: "Strict rejimning asosiy foydasi?",
      options: [
        "Kod tezlashadi",
        "Xatolar indamay o'tmaydi — erta ushlanadi",
        "Kod qisqaradi",
        "Rangli bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Yashirin buglar oshkor bo'ladi."
    }
  ]
};
