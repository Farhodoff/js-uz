export const modules = {
  id: "modules",
  title: "JavaScript Modullari (ES Modules va CommonJS)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### JavaScript Modullari nima?
**JavaScript Modullari** — bu kodlarimizni alohida mustaqil fayllarga (bloklarga) bo'lish va ularni bir-biri bilan bog'lash tizimidir. Modul ichidagi barcha o'zgaruvchilar va funksiyalar faqat o'sha modul ichida yopiq bo'ladi va faqat \`export\` kalit so'zi orqali tashqariga ruxsat berilgan narsalargina boshqa fayllarga \`import\` qilinishi mumkin.

### Real hayotiy analogiya
Tasavvur qiling, siz **Lego konstruktori** yordamida katta shahar quryapsiz:
* **Modulsiz (Eski yomon usul):** Siz shahar binosini bitta yaxlit ulkan plastik bo'lakdan quyib yasadingiz. Agar biror chiroq yoki deraza buzilsa, butun binoni eritib, qaytadan yasashingiz kerak.
* **Modulli (Yangi optimal usul):** Shahardagi har bir uy, daraxt, mashina — alohida Lego g'ishtlaridir (modullar). Siz ularni alohida qutilardan olasiz (\`import\`), birlashtirasiz va shahar qurasiz. Agar biror daraxt buzilsa, butun shaharni buzmasdan, faqat o'sha daraxt modulini almashtirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Named Exports and Imports)
Bir nechta o'zgaruvchi va funksiyalarni nomlari bilan eksport va import qilish:
\`\`\`javascript
// mathUtils.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
\`\`\`
\`\`\`javascript
// main.js
import { PI, add } from './mathUtils.js';

console.log(PI); // 3.14159
console.log(add(5, 3)); // 8
\`\`\`

### 2. Intermediate Example (Default Exports)
Fayldan faqat bitta asosiy qiymat yoki klassni default ravishda eksport qilish:
\`\`\`javascript
// Logger.js
export default class Logger {
  log(message) {
    console.log(\`[LOG] \${new Date().toISOString()}: \${message}\`);
  }
}
\`\`\`
\`\`\`javascript
// app.js
// Default importda gullik qavslar {} kerak emas va xohlagan nomni berish mumkin
import CustomLogger from './Logger.js';

const logger = new CustomLogger();
logger.log('Loyiha ishga tushdi');
\`\`\`

### 3. Advanced Example (Renaming va Namespace Imports)
Nomlarni to'qnashuvini oldini olish uchun \`as\` yordamida qayta nomlash va barcha eksportlarni obyekt shaklida import qilish (\`* as\`):
\`\`\`javascript
// api.js
export function fetchUser() { return { id: 1, name: 'Ali' }; }
\`\`\`
\`\`\`javascript
// main.js
// 1. as yordamida nomini o'zgartirib import qilish
import { fetchUser as getUserData } from './api.js';

// 2. Namespace import (barcha eksportlarni bitta obyekt ichiga yig'ish)
import * as ApiService from './api.js';

console.log(getUserData()); // { id: 1, name: 'Ali' }
console.log(ApiService.fetchUser()); // { id: 1, name: 'Ali' }
\`\`\`

### 4. Production Example (Aggregating Modules - Re-exporting)
Loyihada chiroyli "Entry Point" (kirish nuqtasi) yaratish uchun modullarni qayta eksport qilish:
\`\`\`javascript
// components/Button.js
export const Button = () => '<button>Click</button>';

// components/Input.js
export const Input = () => '<input type="text" />';
\`\`\`
\`\`\`javascript
// components/index.js (Aggregator)
// Boshqa faylga import qilmasdan, to'g'ridan-to'g'ri tashqariga qayta eksport qiladi
export { Button } from './Button.js';
export { Input } from './Input.js';
\`\`\`
\`\`\`javascript
// app.js
// Endi 10 ta fayldan alohida import qilmasdan, bitta joydan hammasini yig'ib olish mumkin
import { Button, Input } from './components/index.js';
\`\`\`

### 5. Enterprise Example (Dynamic Module Loading)
Faqat kerakli vaqtda (masalan, foydalanuvchi tugmani bosganda) modulni yuklash orqali unumdorlikni oshirish:
\`\`\`javascript
// chartGenerator.js
export function drawChart() {
  console.log('Grafik chizildi (Bu modul ancha og\\\\'ir)');
}
\`\`\`
\`\`\`javascript
// dashboard.js
const button = document.getElementById('showChartBtn');

button.addEventListener('click', async () => {
  try {
    // Dinamik import Promise qaytardigi uchun await ishlatiladi
    const { drawChart } = await import('./chartGenerator.js');
    drawChart();
  } catch (error) {
    console.error('Modulni yuklab bo\\\\'lmadi:', error);
  }
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Global Scope ifloslanishi:** Modullar bo'lmaganda, har bir script o'z o'zgaruvchilarini global \`window\` obyektiga yozib yuborardi. Bu esa turli kutubxonalar bir xil nomli o'zgaruvchilarni overwrite (ustiga yozib) yuborishiga sabab bo'lardi. Modullarda har bir fayl o'z scope-iga ega.
* **CommonJS vs ES Modules (ESM) farqlari:**
  * **CommonJS (CJS):** Node.js-da ishlatiladigan \`require()\` sinxron yuklanadi. Dinamik ravishda shartlar ichida ishlatilishi mumkin, lekin static analiz va Tree-shaking-ni qo'llab-quvvatlamaydi.
  * **ES Modules (ESM):** JavaScript standarti bo'lgan \`import/export\` statik tahlil qilinadi (Evaluation bosqichidan avval parse qilinadi). Bu esa yig'uvchi (bundler) dasturlarga ishlatilmagan kodlarni yakuniy build-dan avtomatik o'chirib tashlash (Tree-shaking) imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`import\` va \`export\` operatorlarini shartlar yoki looplar ichida ishlatish
#### Xato:
\`\`\`javascript
if (user.isLoggedIn) {
  import { dashboard } from './dashboard.js'; // SyntaxError
}
\`\`\`
#### Nima uchun noto'g'ri:
ESM statik tahlil qilinadi, shuning uchun statik \`import\` faqat faylning eng yuqori darajasida (top-level) bo'lishi shart.
#### To'g'ri usul:
Dinamik importdan foydalanish:
\`\`\`javascript
if (user.isLoggedIn) {
  const { dashboard } = await import('./dashboard.js');
}
\`\`\`

### 2. Live Bindings (jonli bog'lanishlar) o'zgaruvchisini o'zgartirishga urinish
#### Xato:
\`\`\`javascript
import { counter } from './counter.js';
counter = counter + 1; // TypeError: Assignment to constant variable
\`\`\`
#### Nima uchun noto'g'ri:
Import qilingan o'zgaruvchilar faqat o'qish uchun (read-only bindings) mo'ljallangan. Ularni faqat eksport qilgan modul o'zi o'zgartira oladi.
#### To'g'ri usul:
Eksport qilgan modulda qiymatni o'zgartiruvchi funksiyani ham eksport qilish va uni chaqirish:
\`\`\`javascript
import { counter, increment } from './counter.js';
increment(); // counter qiymati o'z-o'zidan bizda ham o'zgaradi
\`\`\`

### 3. Brauzerda scriptni ulaganda \`type="module"\` atributini unutish
#### Xato:
\`\`\`html
<script src="app.js"></script> <!-- console.log: Cannot use import statement outside a module -->
\`\`\`
#### To'g'ri usul:
\`\`\`html
<script type="module" src="app.js"></script>
\`\`\`

### 4. Default export-ni gullik qavslar \`{}\` ichida import qilish
#### Xato:
\`import { Logger } from './Logger.js';\` (agar Logger default eksport bo'lsa, import bo'lmaydi yoki xato beradi).
#### To'g'ri usul:
\`import Logger from './Logger.js';\`

### 5. Fayl kengaytmasini \`.js\` deb yozmaslik (Nisbiy yo'llarda)
#### Xato:
\`import { add } from './mathUtils';\` (Brauzer muhitida fayl topilmaydi).
#### To'g'ri usul:
\`import { add } from './mathUtils.js';\`

### 6. Bitta faylda bir nechta \`default export\` yozish
#### Xato:
Faylda ikkita \`export default\` yozish. Tizim faqat bitta default eksportga ruxsat beradi.

### 7. Dinamik import Promise qaytarishini unutish
#### Xato:
\`const module = import('./utils.js'); console.log(module.myFn);\` (Promise resolved bo'lmasidan o'qishga urinish).
#### To'g'ri usul:
\`const module = await import('./utils.js');\`

### 8. \`this\` kalit so'zi ESM-da global obyektni qaytaradi deb o'ylash
#### Xato:
Top-level \`this\` brauzerda \`window\` ga teng deb o'ylash. ESM har doim strict mode-da ishlagani uchun, modul fayli darajasida \`this\` qiymati \`undefined\` bo'ladi.

### 9. Aylanma bog'liqlikda (circular dependency) chala obyektlarni tekshirmaslik
#### Muammo:
CommonJS-da aylanma bog'liqlik bo'lganda chala yuklangan obyekt qaytadi, natijada metod chaqirilganda xatolik kelib chiqadi.

### 10. \`export *\` default eksportni ham qayta eksport qiladi deb o'ylash
#### Xato:
\`export * from './module.js'\` yozganda default export ham tashqariga chiqadi deb o'ylash. U faqat named exportlarni qayta eksport qiladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** ES Modules (ESM) va CommonJS (CJS) o'rtasidagi asosiy sintaktik farq nima?
   * **Javob:** ESM-da \`import\` va \`export\` ishlatiladi. CommonJS-da esa \`require()\` va \`module.exports\` ishlatiladi.

2. **Savol:** Bitta modulda nechta default export va nechta named export bo'lishi mumkin?
   * **Javob:** Default export faqat bitta bo'lishi mumkin, named exportlar esa cheksiz miqdorda bo'lishi mumkin.

3. **Savol:** \`type="module"\` atributi html sahifada ulangan scriptga qanday ta'sir qiladi?
   * **Javob:** Brauzer uning ichidagi \`import/export\` operatorlarini tushunadi, kodni avtomatik ravishda strict mode-da bajaradi va uni defer (asinxron yuklanib, DOM tayyor bo'lgach bajariladigan) rejimga o'tkazadi.

4. **Savol:** \`import { a as b }\` yozuvi nima maqsadda ishlatiladi?
   * **Javob:** Nomli eksport \`a\` ni loyihamizda \`b\` nomi ostida qayta nomlab import qilish (nomlar to'qnashuvini oldini olish) uchun.

### Middle (5–8)
5. **Savol:** Live Bindings (jonli bog'lanishlar) nima va u CommonJS-dagi qiymat nusxasidan (value copy) nimasi bilan farq qiladi?
   * **Javob:** CommonJS-da require qilinganda eksport qilingan qiymat nusxalanadi (xotira nusxasi). ESM-da esa xotiradagi o'zgaruvchiga havola (binding) uzatiladi. Agar eksport qilgan modul o'sha o'zgaruvchini o'zgartirsa, import qilgan jamoada ham qiymat dynamic ravishda yangilanadi.

6. **Savol:** Tree-shaking nima va u qaysi modul tizimida ishlaydi?
   * **Javob:** Tree-shaking - bu loyihani build (yig'ish) qilishda ishlatilmagan ortiqcha kodlarni olib tashlash jarayoni. U faqat statik tuzilishga ega bo'lgan ES Modules (ESM) tizimida ishlaydi, chunki import/export-lar kompilyatsiya bosqichida aniq bo'ladi.

7. **Savol:** Re-exporting (qayta eksport qilish) nima va u qachon foydali?
   * **Javob:** Boshqa modulning eksportlarini o'zimizga import qilmasdan, joriy moduldan tashqariga uzatish (\`export { x } from './module.js'\`). Bu bir nechta kichik modullarni bitta katta modul (index.js) orqali birlashtirib taqdim etishda juda qo'l keladi.

8. **Savol:** Dinamik import \`import(path)\` metodining oddiy \`import\`-dan farqi nimada va u nima qaytaradi?
   * **Javob:** Statik import parsing bosqichida bajariladi va shartli bo'la olmaydi. Dinamik import esa runtime-da xohlagan shart ostida asinxron yuklanadi va Promise qaytaradi.

### Senior (9–12)
9. **Savol:** ES Modules yuklanish jarayonining 3 ta bosqichini (Construction, Instantiation, Evaluation) tushuntiring.
   * **Javob:** 1. Construction: Fayllarni topadi, yuklab oladi va parse qiladi (AST yaratiladi). 2. Instantiation: Eksport va importlar uchun xotiradan joy ajratib, ularni bir-biriga ulaydi (live bindings). 3. Evaluation: Kodni qator-baqator ishga tushirib, xotiradagi joylarni haqiqiy qiymatlar bilan to'ldiradi.

10. **Savol:** Circular Dependency (aylanma bog'liqlik) yuz berganda CommonJS va ESM buni qanday hal qiladi?
    * **Javob:** CommonJS-da require sinxron yuklagani uchun chala yuklangan obyekt qaytadi, bu esa runtime-da metodlar topilmasligiga olib kelishi mumkin. ESM-da esa live bindings o'rnatiladi. Agar evaluation jarayonida hali qiymat berilmagan o'zgaruvchiga murojaat qilinsa, ReferenceError (Temporal Dead Zone) yordamida dasturchi ogohlantiriladi.

11. **Savol:** Webpack yoki Vite kabi bundlerlar dinamik import yozganda dynamic code splitting-ni qanday amalga oshiradi?
    * **Javob:** Yig'uvchi kodda \`import('./heavy.js')\`ni ko'rishi bilan uning kodini alohida JS faylga (chunk) ajratadi. Asosiy sahifa yuklanganda bu chunk yuklanmaydi, faqat chaqiruv sodir bo'lgandagina brauzer dynamic tarmoq so'rovi orqali o'sha chunkni yuklab oladi.

12. **Savol:** Node.js muhitida ES Modules-dan foydalanish uchun qanday usullardan foydalaniladi?
    * **Javob:** \`package.json\` faylida \`"type": "module"\` deb belgilash, yoki fayllarni \`.mjs\` kengaytmasi bilan saqlash.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Dynamic Theme/Plugin Loader
Sizda onlayn vizual redaktor bor. Har bir redaktor uskunasi (qalam, o'chirg'ich, matn) alohida og'ir modul hisoblanadi. Bizga faqat foydalanuvchi uskunani tanlagandagina uni yuklaydigan dynamic plagin yuklovchi tizim kerak.

\`\`\`javascript
class ToolManager {
  constructor() {
    this.activeTool = null;
  }

  async selectTool(toolName) {
    console.log(\`\${toolName} yuklanmoqda...\`);
    try {
      // Modul dynamic yuklanadi
      const module = await import(\`./tools/\${toolName}.js\`);
      this.activeTool = new module.default();
      this.activeTool.activate();
    } catch (err) {
      console.error('Uskunani yuklab bo\\\\'lmadi:', err);
    }
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Prefetching/Preloading:** Foydalanuvchi tugmaga sichqonchani olib kelganda (hover qilganda) modulni dynamic yuklashni boshlash (prefetch), bu tugma bosilganda modul allaqachon tayyor bo'lishini ta'minlaydi.
* **Live bindings vs Copies:** ESM live bindings-da o'zgaruvchi xotiradagi bitta joyga bog'langani uchun CommonJS-dagi qiymat nusxalashga nisbatan xotira va CPU resurslarini tejaydi.

---

## 10. 📌 Cheat Sheet

| Sintaksis | Turi | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| \`export const a = 1;\` | Named Export | Nomli eksport | Bir nechta bo'lishi mumkin |
| \`export default MyClass;\`| Default Export| Asosiy eksport | Har bir faylda faqat 1 ta |
| \`import { a } from './m.js';\`| Named Import | Nomli import | Qavs ichida nomi mos bo'lishi shart |
| \`import MyClass from './m.js';\`| Default Import| Default import | Gullik qavslarsiz, nomi ixtiyoriy |
| \`import { a as b }\` | Rename | Qayta nomlash | To'qnashuvlarni oldini oladi |
| \`import * as Api from './m.js';\`| Namespace | Hammasini yig'ish | Api.a shaklida ishlatiladi |
| \`export { x } from './m.js';\`| Re-export | Qayta eksport | index.js kirish nuqtalari uchun |
| \`import('./m.js')\` | Dynamic | Dinamik yuklash | Promise qaytaradi, runtime-da ishlaydi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Nomli Eksport va Qayta Nomlash (as)",
    "instruction": "`math.js` modulidan `multiply` funksiyasini eksport qilib, uni joriy faylda `mult` nomi ostida import qiling. (Simulyatsiya uchun import sintaksisini string sifatida boshlang'ich koda kiriting).",
    "startingCode": "// import sintaksisini yozing\n// import { ... as ... } from './math.js';",
    "hint": "import { multiply as mult } from './math.js';",
    "test": "try { if (!code.includes('import') || !code.includes('multiply as mult') || !code.includes('./math.js')) return 'Nomli eksport qayta nomlanib import qilinmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Default Eksportni Qayta Eksport qilish (Re-export)",
    "instruction": "`auth.js` faylidagi default eksportni joriy fayldan `defaultAuth` nomi ostida qayta eksport (re-export) qiluvchi kodni yozing.",
    "startingCode": "// Re-export kodini yozing",
    "hint": "export { default as defaultAuth } from './auth.js';",
    "test": "try { if (!code.includes('export') || !code.includes('default as defaultAuth') || !code.includes('./auth.js')) return 'auth.js default eksporti defaultAuth sifatida re-export qilinmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Dinamik Modul Yuklovchi",
    "instruction": "Dinamik ravishda `import()` yordamida modul yuklashni simulyatsiya qiluvchi va uning default yoki ma'lum bir nomli eksportini asinxron qaytaruvchi `dynamicImportLoader(modulePromise, exportName)` funksiyasini yozing. `modulePromise` — bu import natijasi kabi resolve bo'ladigan Promise obyekti bo'lib, uning ichida moduldagi eksportlar saqlanadi. Agar `exportName` berilmasa, default eksport qaytarilsin.",
    "startingCode": "async function dynamicImportLoader(modulePromise, exportName) {\n  // Kodni yozing\n}",
    "hint": "const module = await modulePromise; return exportName ? module[exportName] : module.default;",
    "test": "if (typeof dynamicImportLoader !== 'function') return 'dynamicImportLoader funksiya emas'; const mockModule = { default: 'DefaultValue', named: 'NamedValue' }; const promise = Promise.resolve(mockModule); return new Promise(resolve => { dynamicImportLoader(promise, 'named').then(val1 => { if (val1 !== 'NamedValue') return resolve('Nomli eksport yuklanmadi'); dynamicImportLoader(promise).then(val2 => { if (val2 !== 'DefaultValue') return resolve('Default eksport yuklanmadi'); resolve(null); }); }); });"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "ES Modules (ESM) va CommonJS (CJS) o'rtasidagi asosiy farq nimada?",
    "options": [
      "CommonJS faqat Node-da, ESM esa barcha joyda",
      "ESM statik tahlil qilinadi va import/export ishlatadi, CommonJS esa dinamik yuklanadi va require ishlatadi",
      "ESM har doim sekinroq ishlaydi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "ES Modules sintaksisi (import/export) statik parsing rejimida ishlaydi, CommonJS esa `require()` bilan runtime-da dinamik sinxron yuklanadi."
  },
  {
    "id": 2,
    "question": "Bitta JavaScript modul faylida nechta `default export` bo'lishi mumkin?",
    "options": [
      "Faqat 1 ta",
      "Maksimal 2 ta",
      "Istalgancha (cheksiz)",
      "0 ta (default export taqiqlangan)"
    ],
    "correctAnswer": 0,
    "explanation": "JavaScript qoidalariga ko'ra, har bir modul fayli uchun faqat bitta `default export` bo'lishiga ruxsat beriladi."
  },
  {
    "id": 3,
    "question": "Nomli (Named) eksportlar qanday import qilinadi?",
    "options": [
      "Gullik qavslarsiz, xohlagan nom bilan",
      "Gullik qavslar `{}` ichida, eksport qilingan paytdagi nomi bilan",
      "Faqat `require` kalit so'zi yordamida",
      "Ular avtomatik ravishda global o'zgaruvchiga aylanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Nomli eksportlarni import qilayotganda, ularni eksport qilingan nomlar bilan mos keladigan gullik qavslar `{}` ichida yozish kerak."
  },
  {
    "id": 4,
    "question": "Default eksportni import qilganda qanday qoida amal qiladi?",
    "options": [
      "Faqat eksport qilingan nom bilan import qilish shart",
      "Uni gullik qavslarsiz va ixtiyoriy nom bilan import qilish mumkin",
      "Uni import qilish uchun `as` kalit so'zi majburiy",
      "Default exportni import qilib bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Default eksport modulda yagona bo'lgani uchun, uni import qilayotganda qavslardan foydalanilmaydi va unga xohlagan nom berilishi mumkin."
  },
  {
    "id": 5,
    "question": "ES Modules tizimida fayl darajasida (eng yuqori qismida) `this` qiymati nimaga teng?",
    "options": [
      "window (brauzerda)",
      "undefined",
      "global (Node-da)",
      "Modul obyektining o'ziga"
    ],
    "correctAnswer": 1,
    "explanation": "ES Modules har doim strict mode rejimida ishlaydi. Shuning uchun modul ichida top-level darajadagi `this` har doim `undefined` ga teng bo'ladi."
  },
  {
    "id": 6,
    "question": "Dinamik import `import(path)` chaqirilganda qanday qiymat qaytaradi?",
    "options": [
      "Sinxron yuklangan modul obyektini",
      "Promise obyektini, u resolved bo'lganda modul eksportlarini beradi",
      "Callback funksiyani",
      "HTML script elementini"
    ],
    "correctAnswer": 1,
    "explanation": "Dinamik import asinxron ravishda modulni yuklaydi va Promise qaytaradi. Bu kodni bo'laklash (code splitting) uchun asosiy vositadir."
  },
  {
    "id": 7,
    "question": "Brauzerda ES Modules faylini to'g'ri ulash uchun script tegiga qaysi atribut qo'shiladi?",
    "options": [
      "type=\"javascript\"",
      "type=\"module\"",
      "async",
      "defer"
    ],
    "correctAnswer": 1,
    "explanation": "Brauzer modul import/export sintaksisini tushunishi uchun `<script type=\"module\" src=\"...\"></script>` ko'rinishida ulanishi shart."
  },
  {
    "id": 8,
    "question": "Live Bindings (jonli bog'lanishlar) nima degani?",
    "options": [
      "Import qilingan o'zgaruvchini xohlagan joyda o'zgartirish",
      "Eksport qilgan modulda o'zgaruvchi qiymati yangilansa, import qilgan jamoada ham qiymat avtomatik ravishda yangilanishi",
      "Internet orqali real-time bog'lanish",
      "Modulning faqat sinxron bajarilishi"
    ],
    "correctAnswer": 1,
    "explanation": "ESM live bindings-dan foydalanadi: eksport qilingan o'zgaruvchi xotiradagi bitta manzilga ishora qiladi. Agar eksport qiluvchi uni yangilasa, barcha import qilganlarda ham yangi qiymat ko'rinadi."
  },
  {
    "id": 9,
    "question": "Loyiha yig'ilayotganda (build) ishlatilmagan kodlarni o'chirib tashlaydigan Tree-shaking ishlashi uchun qaysi modul tizimi talab etiladi?",
    "options": [
      "CommonJS",
      "ES Modules (ESM)",
      "AMD",
      "SystemJS"
    ],
    "correctAnswer": 1,
    "explanation": "Vite/Webpack kabi yig'uvchilar faqat statik tahlilga ega bo'lgan ES Modules yordamidagina qaysi eksportlar ishlatilmayotganini aniqlay oladi va ularni o'chirib yuboradi."
  },
  {
    "id": 10,
    "question": "`export * from './module.js'` ifodasi nima vazifani bajaradi?",
    "options": [
      "Hamma kodni o'chirib yuboradi",
      "'module.js' ichidagi barcha nomli eksportlarni import qilmasdan to'g'ridan-to'g'ri qayta eksport (re-export) qiladi",
      "Faqat default eksportni qayta eksport qiladi",
      "Xatolik otadi (SyntaxError)"
    ],
    "correctAnswer": 1,
    "explanation": "Bu qayta eksport qilish (re-exporting) bo'lib, joriy faylni aggregator (kirish nuqtasi) sifatida ishlatganda named eksportlarni tashqariga yo'naltiradi."
  },
  {
    "id": 11,
    "question": "Aylanma bog'liqlik (circular dependency) yuz berganda ES Modules CommonJS-dan qanday ustunlikka ega?",
    "options": [
      "ES Modules-da aylanma bog'liqlik xavfsiz live bindings orqali boshqariladi va ReferenceError orqali xavfsizlikni ta'minlaydi, CommonJS-da esa chala obyekt qaytib dynamic xatolarga sabab bo'ladi",
      "ES Modules aylanma bog'liqlikni umuman qo'llab-quvvatlamaydi",
      "CommonJS aylanma bog'liqlikda ReferenceError beradi",
      "Ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "CommonJS-da circular reference bo'lganda require chala obyekt qaytaradi va bu runtime'da kutilmagan undefined xatolarga olib kelishi mumkin. ESM esa live bindings-ni xotira bog'lanishida TDZ qoidalari bilan boshqarib, ReferenceError orqali xavfsizroq ogohlantiradi."
  },
  {
    "id": 12,
    "question": "Nima uchun statik `import` operatorini conditional block (masalan, `if` sharti) ichida yozish mumkin emas?",
    "options": [
      "Chunki brauzer if-ni tushunmaydi",
      "Chunki statik importlar kod bajarilishidan oldin (statik tahlil bosqichida) aniqlanishi va bog'lanishi shart",
      "Chunki global scope cheklangan",
      "Uni shartlar ichida yozsa bo'ladi, bu xato emas"
    ],
    "correctAnswer": 1,
    "explanation": "Statik importlar kod hali runtime-da ishga tushmasdan parse qilingani sababli, dynamic runtime shartlari (if, switch) ichida ishlay olmaydi. Bunga ehtiyoj bo'lsa, dinamik `import()` ishlatilishi lozim."
  }
]

};
