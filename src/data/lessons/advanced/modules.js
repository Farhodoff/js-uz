export const modulesLesson = {
  id: "modules",
  title: "Modullar (import va export)",
  level: "Advanced",
  description: "Kodni mantiqiy bo'laklarga (fayllarga) bo'lish va ularni bir-biriga ulash.",
  theory: `
# Modullar – Bu nima va nima uchun kerak?

**Module** (Modul) — bu shunchaki bitta JavaScript fayli. Loyiha kattalashgani sari barcha kodni bitta faylda saqlash imkonsiz bo'lib qoladi. Modullar bizga kodni bo'laklarga bo'lishga yordam beradi.

## 1. NEGA kerak?
1. **Tartib:** Har bir fayl bitta vazifaga javob beradi (masalan, \`auth.js\`, \`api.js\`).
2. **Qayta ishlatish:** Bir marta yozilgan kodni bir nechta faylda ishlatish mumkin.
3. **Xavfsizlik:** Modullar o'z xususiy doirasiga (scope) ega, ular global o'zgaruvchilar bilan to'qnashmaydi.

## 2. SODDALIK (Analogiya)
Buni **Lego konstruktori** deb tasavvur qiling. Sizda har xil rangli va shaklli bo'laklar bor. Siz ularni alohida-alohida saqlaysiz va kerak bo'lganda bir-biriga ulab, katta bino (loyiha) qurasiz.

## 3. STRUKTURA

### A. Export (Eksport qilish)
Fayldagi ma'lumotni tashqariga chiqarish:
\`\`\`javascript
// math.js
export const PI = 3.14; // Nomli eksport
export default function sum(a, b) { return a + b; } // Default eksport
\`\`\`

### B. Import (Import qilish)
Boshqa fayldan ma'lumotni olib kelish:
\`\`\`javascript
// main.js
import qo'shish, { PI } from './math.js';
console.log(qo'shish(2, 2)); // 4
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
// lib.js
export const version = "1.0.0";

// app.js
import { version } from "./lib.js";
console.log("Versiya: " + version);
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Default export'da jingalak qavs ishlatish:** \`import { myDefault } from ...\` — Xato! ❌ Default export jingalak qavssiz import qilinadi.
2. **Fayl yo'lini unutish:** \`./\` yoki \`../\` kabi yo'llarni (path) to'g'ri ko'rsatish shart.

## 6. SAVOLLAR (12 ta)
1. Modul nima?
2. Nomli eksport (Named export) va Default eksport farqi nima?
3. Bitta faylda nechta default eksport bo'lishi mumkin?
4. Bitta faylda nechta nomli eksport bo'lishi mumkin?
5. Import qilishda o'zgaruvchi nomini o'zgartirsa bo'ladimi (\`as\` orqali)?
6. Modullar avtomatik ravishda \`use strict\` rejimida ishlaydimi?
7. \`import * as math from './math.js'\` nima vazifani bajaradi?
8. Dinamik import (\`import()\`) nima?
9. Modul ichidagi o'zgaruvchi globalda ko'rinadimi?
10. Nima uchun modullar xavfsizroq deb hisoblanadi?
11. HTML faylda modulni qanday ulash mumkin (\`type="module"\`)?
12. Modullar keshlanadimi (bir marta yuklanadimi)?`,
  exercises: [
    {
      id: 1,
      title: "Export mashqi",
      instruction: "'sayHello' funksiyasini nomli eksport (named export) qiling.",
      startingCode: "function sayHello() {\n  console.log('Salom');\n}\n// Bu yerda eksport qiling",
      hint: "export { sayHello };",
      test: "if (code.includes('export')) return null; return 'Export ishlatilmadi';"
    }
  ]
};
