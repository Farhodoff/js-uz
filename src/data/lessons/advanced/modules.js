export const modulesLesson = {
  id: "a6",
  title: "Modullar (import va export)",
  theory: `## 1. MODULLAR NIMA?
Loyiha kattalashgani sari hamma kodni bitta faylda saqlash imkonsiz bo'lib qoladi. **Modullar** — bu kodni mantiqiy bo'laklarga (alohida fayllarga) bo'lish va ularni bir-biriga ulash usulidir.

### Afzalliklari:
- **Tartib:** Har bir fayl bitta vazifaga javob beradi.
- **Qayta ishlatish:** Bir marta yozilgan kodni boshqa fayllarda ham ishlatish mumkin.
- **Xavfsizlik:** Modullar o'z xususiy doirasiga (scope) ega, global o'zgaruvchilar bilan to'qnashmaydi.

---

## 2. EXPORT VA IMPORT

### A. Named Export (Nomli eksport)
Bitta fayldan bir nechta narsani eksport qilish mumkin. Import qilganda aynan o'sha nom bilan jingalak qavs ichida olish kerak.

\`\`\`javascript
// math.js
export const PI = 3.14;
export function sum(a, b) { return a + b; }

// main.js
import { PI, sum } from './math.js';
\`\`\`

### B. Default Export (Asosiy eksport)
Fayldan faqat bitta asosiy narsani eksport qilish uchun. Import qilganda istalgan nom berish mumkin.

\`\`\`javascript
// user.js
export default class User { ... }

// main.js
import MyUser from './user.js';
\`\`\`

\`\`\`mermaid
graph LR
    A[Modul A] -- export --> B(Exported Data)
    B -- import --> C[Modul B]
    style B fill:#f9f,stroke:#333
\`\`\`

---

## 3. INTERVYU SAVOLLARI (Junior & Middle)

1. **Named export va Default export farqi?**
   *Javob:* Named export bir nechta bo'lishi mumkin va nomi bir xil bo'lishi shart. Default export bitta bo'ladi va nomini importda o'zgartirish mumkin.

2. **Dinamik import nima?**
   *Javob:* Modulni kodning istalgan joyida (masalan, \`if\` ichida) \`import()\` funksiyasi orqali yuklash. Bu \`Promise\` qaytaradi.

3. **Modullarda 'use strict' yozish shartmi?**
   *Javob:* Yo'q, modullar avtomatik ravishda qat'iy rejimda (strict mode) ishlaydi.`,
  exercises: [
    {
      id: 1,
      title: "Named Import",
      instruction: "'math' modulidan 'PI' va 'add' ni import qilish kodini yozing.",
      startingCode: "// Import kodini yozing\n",
      hint: "import { PI, add } from './math.js';",
      test: "if (code.includes('import') && code.includes('{') && code.includes('}')) return null; return 'Named import sintaksisi noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Default Export",
      instruction: "'Person' klassini default sifatida eksport qiling.",
      startingCode: "class Person {}\n// Bu yerda eksport qiling\n",
      hint: "export default Person;",
      test: "if (code.includes('export default')) return null; return 'export default ishlatilmadi';"
    }
  ]
};
