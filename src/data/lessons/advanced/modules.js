export const modulesLesson = {
  id: "a6",
  title: "Modullar (ES6 Modules: import/export)",
  theory: `## ES6 Modullari – JavaScriptni qismlarga bo‘lish

ES6 modullari – kodni alohida fayllarga bo‘lib, ular orasida funksiya, obyekt, o‘zgaruvchilarni import/export qilish imkonini beradi. Har bir modul o‘z **scope** (doira) ga ega, global scope’ni ifloslantirmaydi.

### Muhim xususiyatlar:
- Modul faylida \`"use strict"\` avtomatik yoqiladi.
- Import/export faqat modul ichida ishlaydi (HTML da \`<script type="module">\`).
- Modullar **defer** kabi yuklanadi (kechiktirilgan, lekin tartibli).
- **Live Binding:** Import qilingan o'zgaruvchining qiymati eksport qiluvchi faylda o'zgarsa, import qiluvchi faylda ham o'zgaradi.

---

### 1. Export (Eksport qilish)

**Named export (nomli eksport):**
\`\`\`javascript
export const PI = 3.14159;
export function add(a, b) { return a + b; }
\`\`\`

**Default export (bitta asosiy eksport):**
\`\`\`javascript
export default class User { ... }
\`\`\`

---

### 2. Import (Import qilish)

**Named import:**
\`\`\`javascript
import { PI, add } from './math.js';
\`\`\`

**Default import:**
\`\`\`javascript
import User from './user.js'; // nom ixtiyoriy
\`\`\`

**Rename (nom o‘zgartirish):**
\`\`\`javascript
import { add as sum } from './math.js';
\`\`\`

---

### 3. Dynamic import (Dinamik import)
Modulni shartli yoki kerak bo‘lganda yuklash. \`Promise\` qaytaradi.
\`\`\`javascript
async function load() {
  const module = await import('./math.js');
  console.log(module.add(2, 3));
}
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **ES6 modullari nima uchun kerak?**
2. **Named export va default export farqi nimada?**
3. **Brauzerda modulni qanday ulash mumkin? (\`type="module"\`)**

### Middle daraja
4. **Live Binding nima va u qanday ishlaydi?**
5. **Dynamic import qayerda va nima uchun foydali?**
6. **Re-export nima? Misol keltiring.**
7. **CommonJS (require) va ES Modules (import) farqi?**`,
  task: `// 1. greeting.js faylidan "sayHi(name)" funksiyasini named export qiling va main.js da import qilib ishlating.
// 2. calculator.js faylida default export qilib Calculator klassini yarating (metodlari: add, subtract).
// 3. math.js dagi funksiyani import qilayotganda nomini "sum"ga o'zgartiring (as operatori).
// 4. Dinamik import yordamida modulni faqat shartli ravishda (if bloki ichida) yuklang.
// 5. Re-export yordamida index.js faylida boshqa modullardagi funksiyalarni jamlang.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Named Export
// greeting.js: export const sayHi = (n) => "Salom " + n;
// main.js: import { sayHi } from './greeting.js';

// 3. Rename
import { add as sum } from './math.js';

// 4. Dynamic Import
if (true) {
  import('./lazy.js').then(m => m.start());
}

// 5. Re-export
// index.js: export { add, PI } from './math.js';`
};
