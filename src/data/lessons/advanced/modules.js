export const modulesLesson = {
  id: "modules",
  title: "Modules va ES6 Import/Export: Kod Tashkilashishi",
  level: "Murakkab",
  description: "Modullar, Named/Default exports, Import patterns, va Kod strukturasi.",
  theory: `## 1. NEGA kerak?

**Savollar:**
- Bitta faylda 10,000+ qator kod?
- Global o'zgaruvchilar nomlar bilan taqqashladi?
- Kodni qayta ishlatish?

**Javob:** **Modules** — JavaScript kodni mantiqiy bo'laklarga bo'lish va ularni xavfsiz ulashtirish.

## 2. SODDALIK (Analogiya)

**Lego konstruktori:**
- Har xil rangli va shaklli bo'laklar (modules)
- Alohida qutilarda saqlangan (fayllarda)
- Kerak bo'lganda bir-biriga ulangan (imported)
- Katta bino (loyiha) yig'ilgan

## 3. STRUKTURA

### A. ES6 Modules - Zamonaviy Standard

\`\`\`javascript
// math.js - Modulni eksport qilish
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// DEFAULT EXPORT - Eng muhimi
export default function divide(a, b) {
  return a / b;
}
\`\`\`

\`\`\`javascript
// main.js - Modulni import qilish
// 1. DEFAULT import (jingalak qavssiz)
import divide from './math.js';

// 2. NAMED imports (jingalak qavs bilan)
import { PI, add, multiply } from './math.js';

// 3. HAMMASI import qilish
import * as math from './math.js';

console.log(divide(10, 2));      // 5
console.log(add(5, 3));          // 8
console.log(PI);                 // 3.14159
console.log(math.multiply(2, 3)); // 6
\`\`\`

### B. Export Turlari

**1. Nomli Export (Named Export):**
\`\`\`javascript
// utils.js
export const config = { version: "1.0" };
export function validate(data) { return true; }
export class Logger { }
\`\`\`

**2. Default Export:**
\`\`\`javascript
// app.js
export default function App() {
  return "Ilovasi";
}

// Yoki oxiriga qo'shish:
// export default class App { }
\`\`\`

**3. Re-export (O'z moduli orqali qayta eksport):**
\`\`\`javascript
// index.js - API markazi
export { add, subtract } from './math.js';
export { validate } from './validator.js';
export { default as App } from './app.js';
\`\`\`

### C. Import Turlari

**1. Default Import:**
\`\`\`javascript
import React from 'react';
\`\`\`

**2. Named Imports:**
\`\`\`javascript
import { useState, useEffect } from 'react';
\`\`\`

**3. Aliasing (O'zgaruvchi nomini o'zgartirish):**
\`\`\`javascript
import { add as addition, multiply as mult } from './math.js';
addition(2, 3); // to'g'ri
\`\`\`

**4. Namespace Import (Barcha narsani o'zgaruvchiga):**
\`\`\`javascript
import * as math from './math.js';
math.add(2, 3);
math.multiply(2, 3);
\`\`\`

**5. Dinamik Import (Runtime'da):**
\`\`\`javascript
// Shartli ravishda modul yukla
if (condition) {
  import('./heavy-module.js')
    .then(module => {
      module.doSomething();
    })
    .catch(error => console.error(error));
}

// Async/Await bilan
async function loadModule() {
  const math = await import('./math.js');
  console.log(math.add(2, 3));
}
\`\`\`

### D. Module Scope - Global Scope'dan Farq

\`\`\`javascript
// math.js
const PI = 3.14;  // Bu FAQAT bu modul ichida ko'rinadi
export function getPi() { return PI; }

// main.js
import { getPi } from './math.js';
console.log(PI);     // ReferenceError! PI global emas
console.log(getPi()); // 3.14 - to'g'ri
\`\`\`

### E. CommonJS vs ES6 Modules

**CommonJS (Node.js eski):**
\`\`\`javascript
// math.js
module.exports = {
  add: (a, b) => a + b
};

// main.js
const math = require('./math.js');
\`\`\`

**ES6 Modules (Zamonaviy):**
\`\`\`javascript
// math.js
export const add = (a, b) => a + b;

// main.js
import { add } from './math.js';
\`\`\`

### F. HTML'da Module Ulash

\`\`\`html
<!-- Modulni ulash -->
<script type="module" src="main.js"></script>

<!-- Inline module -->
<script type="module">
  import { add } from './math.js';
  console.log(add(2, 3));
</script>

<!-- IMPORTANT: type="module" kerak! Bo'lmasa import/export ishlamaydi -->
\`\`\`

### G. Modul Pattern - Private va Public

\`\`\`javascript
// counter.js - Modul pattern bilan encapsulation
let count = 0; // Private

export const increment = () => ++count;
export const decrement = () => --count;
export const getCount = () => count;

// main.js
import { increment, getCount } from './counter.js';
increment();
increment();
console.log(getCount()); // 2
// console.log(count);  // ReferenceError - private!
\`\`\`

### H. Circular Dependencies Muammosi

\`\`\`javascript
// a.js
import { funcB } from './b.js';
export function funcA() { return funcB(); }

// b.js
import { funcA } from './a.js';
export function funcB() { return funcA(); }

// XATO: Circular dependency!
// Yechim: Struktura qayta ishlash yoki factory pattern
\`\`\`

### I. Tree-shaking (Foydalanilmagan Kod Olib Tashish)

Modern bundler'lar (Webpack, Vite) named export'larni qo'lladi:

\`\`\`javascript
// utils.js
export const used = () => console.log("Used");
export const unused = () => console.log("Unused");

// main.js
import { used } from './utils.js';
used();

// Bundle'da faqat used qo'shiladi, unused olib tashlanadi!
// (Agar faqat named export bo'lsa)
\`\`\`

### J. Side Effects'li Modullar

\`\`\`javascript
// logger.js
console.log("Logger init");  // Side effect

export function log(msg) {
  console.log(msg);
}

// main.js
import { log } from './logger.js';  // "Logger init" chiqar
\`\`\`

### K. Modul Package'lar - package.json

\`\`\`json
{
  "name": "my-package",
  "version": "1.0.0",
  "type": "module",  // ES6 modules ishlatish
  "exports": {
    ".": "./dist/index.js",
    "./utils": "./dist/utils.js"
  }
}
\`\`\`

\`\`\`javascript
// Ishlatiilchi
import MyPackage from 'my-package';
import { util } from 'my-package/utils';
\`\`\`

### L. Vaqtinchalik vs Permanent Imports

\`\`\`javascript
// TEMPORARY - Faqat bu faylda
import { helper } from './helpers.js';

// PERMANENT - Re-export qilib boshqalarga berib jo'natish
export { logger } from './logger.js';
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Default export'ni named import qilish:**
   \`\`\`javascript
   // XATO:
   export default function sum() {}
   import { sum } from './math.js';  // undefined

   // TO'G'RI:
   import sum from './math.js';
   \`\`\`

2. **Fayl yo'li xatosi:**
   \`\`\`javascript
   // XATO:
   import { add } from 'math.js';  // No ./ !

   // TO'G'RI:
   import { add } from './math.js';
   \`\`\`

3. **type="module" bo'lmasa:**
   \`\`\`html
   <!-- XATO: -->
   <script src="main.js"></script>

   <!-- TO'G'RI: -->
   <script type="module" src="main.js"></script>
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Modul nima?</summary>
JavaScript fayli, kendi scope'iga ega, exported qiymatlari bilan.
</details>

<details>
<summary>2. Named export vs Default export?</summary>
Named - nomi bo'ladi, default - faqat bitta, nomisiz.
</details>

<details>
<summary>3. Bitta faylda nechta default eksport?</summary>
Faqat bitta! Nechta nom export bo'lishi mumkin.
</details>

<details>
<summary>4. as orqali nom o'zgartirish?</summary>
Ha: import { add as plus } from './math.js'
</details>

<details>
<summary>5. Modullar avtomatik "use strict"da?</summary>
Ha! Modullar har doim strict mode'da.
</details>

<details>
<summary>6. import * as nima?</summary>
Barcha export'larni object'ga yig'ish.
</details>

<details>
<summary>7. Dinamik import nima?</summary>
Runtime'da shart orqali modul yukla: import('./module.js')
</details>

<details>
<summary>8. Module scope nima?</summary>
Modul ichidagi o'zgaruvchilar global emas, faqat exported bo'lsa ko'rinadi.
</details>

<details>
<summary>9. Circular dependency muammosi?</summary>
A imports B, B imports A - zanjir shaklida. Struktura qayta ishlash kerak.
</details>

<details>
<summary>10. Tree-shaking nima?</summary>
Bundler foydalanilmagan kodni olib tashadi (named export'larda).
</details>

<details>
<summary>11. HTML'da module ulash?</summary>
\`<script type="module" src="main.js"></script>\` kerak.
</details>

<details>
<summary>12. CommonJS vs ES6 Modules?</summary>
CommonJS - require/module.exports (eski). ES6 - import/export (zamonaviy).
</details>`,
  exercises: [
    {
      id: 1,
      title: "Named Export",
      instruction: "Funksiyani nomli eksport qiling.",
      startingCode: "function sayHello() {\n  return 'Salom';\n}\n// Bu yerda eksport qiling\n",
      hint: "export { sayHello };",
      test: "if (code.includes('export')) return null; return 'Export noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Default Export",
      instruction: "Default eksport qiling.",
      startingCode: "function App() {\n  return 'My App';\n}\n// Bu yerga default export\n",
      hint: "export default App;",
      test: "if (code.includes('export default')) return null; return 'Default export noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Import Named",
      instruction: "Named import qiling - { sayHello }",
      startingCode: "// Bu yerga import qiling sayHello'ni\nconsole.log(sayHello());\n",
      hint: "import { sayHello } from './module.js';",
      test: "if (code.includes('import') && code.includes('{ sayHello }')) return null; return 'Import noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Import Default",
      instruction: "Default import qiling.",
      startingCode: "// Bu yerga import qiling App'ni\nconsole.log(new App());\n",
      hint: "import App from './app.js';",
      test: "if (code.includes('import App')) return null; return 'Default import noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Namespace Import",
      instruction: "* as orqali barchasini import qiling.",
      startingCode: "// Bu yerga import qiling * as math\nconsole.log(math.add(2, 3));\n",
      hint: "import * as math from './math.js';",
      test: "if (code.includes('import *') && code.includes('as math')) return null; return 'Namespace import noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Aliasing (as)",
      instruction: "add'ni plus deb import qiling (rename).",
      startingCode: "// as orqali add'ni plus deb import qiling\nconsole.log(plus(2, 3));\n",
      hint: "import { add as plus } from './math.js';",
      test: "if (code.includes('as plus')) return null; return 'Aliasing noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Re-export",
      instruction: "Boshqa modul'dan import qilib, o'z modul orqali qayta export qiling.",
      startingCode: "// math.js'dan add'ni export qiling\nexport { add } from './math.js';\n",
      hint: "export { ... } from './...'",
      test: "if (code.includes('export')) return null; return 'Re-export noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Module Scope",
      instruction: "Modul ichidagi private o'zgaruvchini faqat funksiya orqali olib qo'rish.",
      startingCode: "const secret = 'Sirli';\nexport function getSecret() {\n  // Bu yerga return secret\n}\n",
      hint: "return secret;",
      test: "if (code.includes('return secret')) return null; return 'Module scope noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Dynamic Import",
      instruction: "Dinamik import orqali modul yukla - import()",
      startingCode: "async function load() {\n  // Bu yerga dynamic import qiling\n  const mod = await import('./module.js');\n  console.log(mod.sayHello());\n}\n",
      hint: "await import('./module.js')",
      test: "if (code.includes('import(')) return null; return 'Dynamic import noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Export Multiple Named",
      instruction: "Nechta funksiyani named export qiling.",
      startingCode: "function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\n// Ikkala funksiyani export qiling\n",
      hint: "export { add, subtract };",
      test: "if (code.includes('export') && code.includes('add') && code.includes('subtract')) return null; return 'Multiple export noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Export Class",
      instruction: "Class'ni export qiling.",
      startingCode: "class Logger {\n  log(msg) { console.log(msg); }\n}\n// Class'ni export qiling\n",
      hint: "export { Logger }; yoki export class Logger",
      test: "if (code.includes('export') && code.includes('Logger')) return null; return 'Class export noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Mix Named va Default",
      instruction: "Named va Default export'larni birgalikda qiling.",
      startingCode: "export const version = '1.0';\nexport const config = { debug: true };\nexport default function init() {\n  return 'Init...';\n}\n// Hammasi export bo'lsin\n",
      hint: "Mavjud",
      test: "if (code.includes('export default') && code.includes('export const')) return null; return 'Mix export noto\\'g\\'ri';"
    }
  ]
};
