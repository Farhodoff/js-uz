export const modulesLesson = {
  id: "modules",
  title: "Modules va ES6 Import/Export: Kod Tashkilashishi",
  level: "Murakkab",
  description: "Modullar, Named/Default exports, Import patterns, va Kod strukturasi.",
  theory: `## 1. NEGA kerak?

Kodimizni mantiqiy bo'laklarga bo'lish, har bir faylni o'z vazifasi bilan cheklash va nomlar to'qnashuvini (conflict) oldini olish uchun **Modules** kerak.

## 2. SODDALIK (Analogiya)

**Lego konstruktori:**
- Har bir bo'lak — bu alohida modul.
- Biz ularni birlashtirib katta "bino" (loyiha) quramiz.

## 3. STRUKTURA

### A. Named Export (Nomli)
\`export const PI = 3.14;\` -> \`import { PI } from './math.js';\`

### B. Default Export
\`export default function() {}\` -> \`import myFunc from './app.js';\`

### C. Import as (Renaming)
\`import { add as plus } from './math.js';\`

## 4. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Modul nima?</summary>
O'zining shaxsiy scope-iga ega bo'lgan alohida JS fayli.
</details>

<details>
<summary>2. Named export nima?</summary>
Nomi bor bo'lgan eksportlar, bitta faylda ko'p bo'lishi mumkin.
</details>

<details>
<summary>3. Default export nima?</summary>
Faylning "asosiy" eksporti, bitta faylda faqat 1 ta bo'ladi.
</details>

<details>
<summary>4. 'import * as' nima qiladi?</summary>
Barcha eksportlarni bitta obyektga yig'ib import qiladi.
</details>

<details>
<summary>5. as kalit so'zi nima uchun?</summary>
Import qilinayotgan narsaning nomini o'zgartirish (aliasing) uchun.
</details>

<details>
<summary>6. Modullar doim strict mode-dami?</summary>
Ha, har doim.
</details>

<details>
<summary>7. Dinamik import nima?</summary>
Kod bajarilayotganda (runtime) import() orqali modul yuklash.
</details>

<details>
<summary>8. type="module" qayerda kerak?</summary>
HTML-da script tegida modullarni ulash uchun.
</details>

<details>
<summary>9. CommonJS nima?</summary>
require() ishlatadigan eski modul tizimi (Node.js).
</details>

<details>
<summary>10. Tree-shaking nima?</summary>
Bundler tomonidan ishlatilmagan kodlarni olib tashlash.
</details>

<details>
<summary>11. Re-export nima?</summary>
Boshqa fayldan import qilib, darhol uni export qilish.
</details>

<details>
<summary>12. Modulda 'this' nima bo'ladi?</summary>
undefined (global obyekt emas).
</details>`,
  exercises: [
    {
      id: 1,
      title: "Named Export",
      instruction: "math.js faylidan PI ni export qiling.",
      startingCode: "const PI = 3.14;\n// Bu yerga yozing",
      hint: "export { PI };",
      test: "if (code.includes('export')) return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "ES Modules va CommonJS o'rtasidagi asosiy farq nima?",
      options: [
        "CommonJS faqat Node-da, ESM esa barcha joyda",
        "ESM statik va import/export ishlatadi, CommonJS dinamik va require ishlatadi",
        "ESM sekinroq",
        "Hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "ESM statik tahlil qilinadi, bu esa Tree-shaking kabi optimallashtirish imkonini beradi."
    },
    {
      id: 2,
      question: "Bitta faylda nechta `default export` bo'lishi mumkin?",
      options: ["1 ta", "2 ta", "Cheksiz", "0 ta"],
      correctAnswer: 0,
      explanation: "JavaScript qoidasiga ko'ra default eksport faqat bitta bo'lishi shart."
    }
  ]
};