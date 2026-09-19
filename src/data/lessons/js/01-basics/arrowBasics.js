export const arrowBasics = {
  id: "arrowBasics",
  title: "Arrow Functionlar (Kirish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Arrow function — funksiya yozishning qisqa usuli
JavaScript'da funksiya yozishning ikki usuli bor — ikkalasi ham bir xil ishlaydi:

\`\`\`javascript
// 1. Klassik usul (function declaration)
function kvadrat(son) {
  return son * son;
}

// 2. Arrow (strelka) usul
const kvadrat2 = (son) => {
  return son * son;
};

// 3. Arrow + qisqa yozuv (bir qatorda return avtomatik!)
const kvadrat3 = (son) => son * son;

console.log(kvadrat(5));    // 25
console.log(kvadrat2(5));   // 25
console.log(kvadrat3(5));   // 25
\`\`\`

Uchtasi ham bir xil natija beradi!

### Real hayotiy o'xshatish
Tasavvur qiling, siz **xat yozmoqchisiz**:
- **Klassik funksiya** — rasmiy xat: "Hurmat bilan, [ISM]" (to'liq shakl)
- **Arrow + qisqa yozuv** — SMS: "Kelaman 5 daqiqada" (bir Gap, bir ma'no)

Ikkalasi ham bir xil xabar beradi — faqat shakli qisqaroq.

---

## 2. 💻 Tuzilishi va Qisqartirish Qadamlari

Arrow funksiyani yozishda 4 ta qadam — har birida qisqaroq:

\`\`\`javascript
// 1-qadam: to'liq shakl
const yigindi = (a, b) => {
  return a + b;
};

// 2-qadam: tana bitta qator bo'lsa — {} va return o'chiriladi
const yigindi = (a, b) => a + b;

// 3-qadam: bitta parametr bo'lsa — ( ) ham ixtiyoriy
const kvadrat = son => son * son;

// 4-qadam: parametrsiz bo'lsa — ( ) SHART
const salom = () => "Salom!";
\`\`\`

> ⚠️ **Muhim:** 2-qatordagi qisqa shaklda \`return\` YO'Q, lekin qiymat qaytadi — bu **implicit return** deyiladi.

### Ko'p qatorli tana bo'lsa — {} SHART
\`\`\`javascript
const tekshir = (yosh) => {
  if (yosh >= 18) {
    return "Katta";
  }
  return "Kichik";
};
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Arrow funksiya"] --> B{"Tana bir qatormi?"}
    B -->|"Ha"| C["(x) => ifoda — return avtomatik"]
    B -->|"Yo'q"| D["(x) => { ... return ...; }"]
    A --> E{"Parametr bittami?"}
    E -->|"Ha"| F["( ) ixtiyoriy: x => x * 2"]
    E -->|"Yo'q / yo'qmi"| G["( ) shart: (a, b) => ..."]
\`\`\`

---

## 3. ⚙️ Qachon Ishlatiladi?

Arrow funksiya — ayniqsa **boshqa funksiyaga argument** bo'lganda qulay (keyingi bosqichlarda ko'rasiz):

\`\`\`javascript
setTimeout(() => {
  console.log("3 soniyadan keyin!");
}, 3000);
\`\`\`

Bu yerda butun funksiyani bitta qatorda yozdik — o'qilishi oson.

### Farqi nimalarda?
| Xususiyat | \`function\` | Arrow |
|---|---|---|
| Yozilishi | uzunroq | qisqaroq |
| \`this\` | chaqiruvga qarab | tashqi scope'dan oladi (keyinroq o'rganamiz) |
| Nomlanishi | \`function nom()\` | o'zgaruvchiga saqlanadi: \`const nom = () =>\` |
| Qayerda | hamma joyda | callback, qisqa operatsiyalar |

**Hozirgi bosqichda:** ikkalasini ham tani ng — o'zingizga qulayini ishlating. Keyinchalik (\`this\` mavzusida) farqlar chuqurroq tushuniladi.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`son => { son * 2 }\` ({} bilan, returnsiz) | \`son => son * 2\` yoki \`{ return son * 2 }\` | \`{}\` qo'ysangiz — \`return\` yozish SHART |
| \`a, b => a + b\` | \`(a, b) => a + b\` | 2+ parametrda qavs SHART |
| \`() => return "salom"\` | \`() => "salom"\` | Qisqa shaklda \`return\` kalit so'zi yo'q |
| \`const x = => 5\` (parametrsiz, qavssiz) | \`const x = () => 5\` | Parametrsiz bo'lsa ham \`()\` shart |

---

## 5. 🔑 Asosiy Atamalar

- **Arrow function** — \`=>\` bilan yoziladigan funksiya
- **Implicit return** — \`{}\` va \`return\`siz qiymat qaytarish (faqat bir qatorli tanada)
- **Callback** — boshqa funksiyaga uzatiladigan funksiya
- **Expression vs Declaration** — arrow — ifoda (o'zgaruvchiga saqlanadi), function — e'lon

---

## 6. 🌍 Real Hayotda Qayerda?

- **Tugma bosilganda:** \`button.onclick = () => { ... }\`
- **Ro'yxatni qayta ishlash:** \`massiv.map(x => x * 2)\` (keyingi bosqichda)
- **Vaqt kechikishi:** \`setTimeout(() => { ... }, 1000)\`

Zamonaviy kodning ~80% qisqa funksiyalari arrow usulda yoziladi.

---

## 7. 🎙 Intervyu Savollari

**1. Arrow va function farqi nimada?**
**Javob:** Sintaksis qisqaroq; \`this\` xatti-harakati har xil (arrow tashqi scope'dan oladi); arrow o'zgaruvchiga saqlanadi.

**2. Qisqa shakl \`(x) => x * 2\` qanday ishlaydi?**
**Javob:** Implicit return — \`{}\` va \`return\` yozilmasa ham ifoda natijasi qaytadi.

**3. Parametrsiz arrow qanday yoziladi?**
**Javob:** \`() => { ... }\` — bo'sh qavslar shart.

---

## 8. ✅ Xulosa

- **Ikkala usul:** \`function nom() {}\` va \`const nom = () => {}\`
- **Qisqa shakl:** bitta qator = implicit return, bitta parametr = qavssiz
- **Ko'p qator = \`{}\` + \`return\` shart**
- **Keyingi qadam:** 1.24-darsda matnlar bilan qulay ishlash — template literals`,
exercises: [
    {
      id: 1,
      title: "Birinchi arrow",
      instruction: "`kvadrat` nomli arrow funksiya yarating: `(son) => son * son`. Qisqa shaklda (implicit return).",
      startingCode: "// arrow funksiya yozing\n",
      hint: "const kvadrat = (son) => son * son;",
      test: "const fn = new Function(code + '\\nreturn kvadrat;')();\nif (typeof fn === 'function' && fn(5) === 25 && fn(3) === 9) return null;\nreturn 'kvadrat arrow funksiyasi 25/9 qaytarishi kerak';"
    },
    {
      id: 2,
      title: "Ikkita parametr",
      instruction: "`yigindi` nomli arrow yozing: `(a, b) => a + b`. Qavslar shart ekanini eslang!",
      startingCode: "// ikki parametrli arrow\n",
      hint: "const yigindi = (a, b) => a + b;",
      test: "const fn = new Function(code + '\\nreturn yigindi;')();\nif (fn(5, 3) === 8 && fn(-1, 1) === 0) return null;\nreturn 'yigindi(5, 3) = 8 bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Parametrsiz",
      instruction: "`salom` nomli PARAMETRSIZ arrow yozing: `\"Salom!\"` qaytarsin.",
      startingCode: "// parametrsiz arrow\n",
      hint: "const salom = () => \"Salom!\";",
      test: "const fn = new Function(code + '\\nreturn salom;')();\nif (fn() === 'Salom!') return null;\nreturn 'salom() = Salom! qaytarishi kerak';"
    },
    {
      id: 4,
      title: "Ko'p qatorli arrow",
      instruction: "`tekshir(yosh)` arrow funksiyasini `{}` bilan yozing: yosh >= 18 bo'lsa `\"Katta\"`, aks holda `\"Kichik\"` qaytarsin.",
      startingCode: "// ko'p qatorli arrow ({ } + return)\n",
      hint: "const tekshir = (yosh) => { if (yosh >= 18) { return \"Katta\"; } return \"Kichik\"; };",
      test: "const fn = new Function(code + '\\nreturn tekshir;')();\nif (fn(20) === 'Katta' && fn(15) === 'Kichik') return null;\nreturn 'tekshir noto\\'g\\'ri ishladi';"
    },
    {
      id: 5,
      title: "Callback sifatida",
      instruction: "`setTimeout` O'RNIGA quyidagi tayyor kodni to'ldiring: `ishgaTushir(funksiya)` — funksiyani chaqirib, natijasini qaytarsin. `funksiya` argumentini arrow bilan uzating.",
      startingCode: "function ishgaTushir(funksiya) {\n  return funksiya();\n}\n// ishgaTushir ni arrow bilan chaqiring va natijani saqlang\n",
      hint: "const natija = ishgaTushir(() => \"ishladi\");",
      test: "const v = new Function(code + '\\nreturn natija;')();\nif (v === 'ishladi') return null;\nreturn 'natija = ishladi bo\\'lishi kerak';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Arrow funksiya qaysi belgi bilan yoziladi?",
      options: [
        "->",
        "=>",
        "-->",
        "::"
      ],
      correctAnswer: 1,
      explanation: "Teng belgi + katta belgi: =>"
    },
    {
      id: 2,
      question: "`const f = x => x * 2;` — f(5) natijasi?",
      options: [
        "10 (implicit return)",
        "undefined",
        "Xatolik",
        "NaN"
      ],
      correctAnswer: 0,
      explanation: "Bir qatorli tanada return avtomatik."
    },
    {
      id: 3,
      question: "Qachon `{}` va `return` SHART bo'ladi?",
      options: [
        "Har doim",
        "Funksiya tanasi ko'p qatorli bo'lganda",
        "Hech qachon",
        "Faqat parametrsizda"
      ],
      correctAnswer: 1,
      explanation: "Ko'p qatorli tanada {} + return kerak."
    },
    {
      id: 4,
      question: "Parametrsiz arrow qanday yoziladi?",
      options: [
        "x => 5",
        "() => 5",
        "=> 5",
        "(()) => 5"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh qavslar shart: () => 5."
    },
    {
      id: 5,
      question: "`(a, b) => a + b` da qavslarni olib tashlash mumkinmi?",
      options: [
        "Ha — a, b => a + b",
        "Yo'q — 2+ parametrda qavslar shart",
        "Faqat strict rejimda mumkin",
        "Har doim mumkin"
      ],
      correctAnswer: 1,
      explanation: "Faqat bitta parametrda qavslar ixtiyoriy."
    }
  ]
};
