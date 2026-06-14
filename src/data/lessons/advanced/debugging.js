export const debugging = {
  id: "debugging",
  title: "Javascript-da Debugging va Xatolarni aniqlash",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Debugging nima?
**Debugging** (xatoliklarni aniqlash va tuzatish) — bu dasturdagi buglarni (xatolarni) topish, tahlil qilish va ularni bartaraf etish jarayonidir. Kodingiz kutilganidek ishlamayotganida, faqat taxmin qilish o'rniga, dasturning ma'lum bir qatorida to'xtatib, o'zgaruvchilarning o'sha paytdagi holatini tekshirish juda muhimdir.
* **console.\\***: Turli xil shakllarda ma'lumotlarni konsolga chiqarish (faqat \`log\` emas, balki jadval, ogohlantirish, vaqtni o'lchash va h.k.).
* **debugger (to'xtatuvchi):** Dasturning bajarilishini aynan o'sha nuqtada to'xtatib, brauzerning ishlab chiquvchilar oynasini (DevTools) ochib beruvchi maxsus JavaScript buyrug'i.
* **Breakpoints (to'xtash nuqtalari):** DevTools oynasida kodning qaysi qatori bajarilganda to'xtashini belgilash usuli.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **detektivsiz**:
* **console.log:** Yo'l chetiga o'rnatilgan kuzatuv kameralari. Siz ularni ma'lum joylarga qo'yib chiqasiz va keyinroq kelib kimlar o'tganini (qiymatlarni) ko'rasiz.
* **debugger / Breakpoints:** Vaqtni to'xtatuvchi sehrli pult. Jinoyatchi (xatolik) qayerda sodir bo'lishini bilsangiz, vaqtni aynan o'sha lahzada to'xtatasiz. So'ngra atrofdagi har bir narsani (o'zgaruvchilarni, Call Stackni) diqqat bilan tekshirasiz, bir soniya oldinga yurib nima sodir bo'layotganini bosqichma-bosqich kuzatasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (console metodlari)
Kodni oddiy loglardan tashqari professional konsol metodlari yordamida tekshirish:
\`\`\`javascript
// Obyektlar massivini chiroyli jadval ko'rinishida chiqarish
const users = [
  { id: 1, name: "Ali", role: "Admin" },
  { id: 2, name: "Vali", role: "User" }
];
console.table(users);

// Funksiya ishlash vaqtini o'lchash
console.time("LoopTime");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd("LoopTime"); // LoopTime: X.XX ms deb chiqaradi

// Funksiya qayerdan chaqirilganini (Call Stack trace) aniqlash
function logCallOrigin() {
  console.trace("Bu yerga qayerdan keldik?");
}
function test() { logCallOrigin(); }
test();
\`\`\`

### 2. Intermediate Example (debugger kalit so'zi)
Kod oqimini to'xtatish va tekshirish:
\`\`\`javascript
function calculateCartTotal(cartItems) {
  let total = 0;
  
  for (let item of cartItems) {
    const price = item.price;
    const qty = item.quantity;
    
    // Agar DevTools ochiq bo'lsa, kod aynan shu yerda muzlaydi (to'xtaydi)
    // Siz price va qty qiymatlarini ko'rishingiz mumkin
    debugger; 
    
    total += price * qty;
  }
  
  return total;
}

calculateCartTotal([{ price: 100, quantity: 2 }, { price: 50, quantity: 1 }]);
\`\`\`

### 3. Advanced Example (Source Maps)
Production (ishlab chiqarish) muhitida kodlar siqiladi (minify qilinadi) va o'qish qiyin holga keladi. **Source Maps** — bu siqilgan kod bilan siz yozgan asl kod o'rtasidagi ko'prikdir:
\`\`\`javascript
// production.min.js (Haqiqiy brauzer o'qiydigan kod)
function a(b){return b*2}console.log(a(5));

// Source Map (.js.map fayli) yordamida brauzer DevTools-da buni quyidagicha ko'rsatadi:
// main.js (Siz yozgan kod)
function doubleNumber(num) {
  return num * 2;
}
console.log(doubleNumber(5));
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Ko'r-ko'rona kod yozish:** console.log yozib, sahifani yangilab, yana console.log yozib vaqt yo'qotishni kamaytiradi. Breakpoint-lar yordamida kod ishlayotgan paytning o'zida o'zgaruvchilarni o'zgartirib ko'rish, kodni qadamma-qadam (Step Over, Step Into) bajarish mumkin.
* **Call Stack-ni ko'ra olish:** Xatolik aynan qaysi funksiya ichidan, u funksiya esa qaysi biri orqali chaqirilganini aniqlash.
* **Xotira sizib chiqishini (Memory Leaks) topish:** DevTools-dagi "Memory" (Performance) paneli orqali xotirada ortiqcha qolib ketgan obyektlarni aniqlash.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Production-ga console.log-larni qoldirib ketish
*Tushuntirish:* Konsol metodlari foydalanuvchiga keraksiz loglarni ko'rsatadi va unumdorlikka (performance) salbiy ta'sir qiladi.
*Tuzatish:* Build vositalari (masalan, Vite, Webpack, Terser) yordamida build paytida barcha console.log-larni avtomatik o'chirib tashlash.

### 2. debugger kalit so'zini o'chirishni unutish
Agar \`debugger\` yozilgan kod production sahifasida qolsa va foydalanuvchi DevTools-ni ochsa, sayt kutilmaganda to'xtab qoladi va bu yomon foydalanuvchi tajribasini keltirib chiqaradi.

### 3. Asinxron kodlarda breakpoints ishlashini tushunmaslik
Asinxron chaqiriqlarda (masalan fetch yoki setTimeout) breakpoint o'rnatilganda, sinxron kodlar bajarilib bo'lib, keyin asinxron qismga o'tishini tushunish kerak.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da \`debugger\` kalit so'zi nima vazifani bajaradi?
   * **Javob:** Agar brauzerda ishlab chiquvchi asboblari (DevTools) ochiq bo'lsa, kod bajarilishi aynan \`debugger\` yozilgan qatorda to'xtaydi (breakpoint kabi ishlaydi).
2. **Savol:** \`console.table()\` metodining vazifasi nima?
   * **Javob:** Obyektlar yoki massivlarni konsolda qulay va chiroyli jadval (table) ko'rinishida ko'rsatadi.
3. **Savol:** DevTools-dagi "Watch" bo'limi nima uchun kerak?
   * **Javob:** Debugging paytida biz kuzatmoqchi bo'lgan maxsus o'zgaruvchilar yoki ifodalarni ro'yxatga qo'shib qo'yib, ularning qiymati qanday o'zgarayotganini real vaqtda kuzatish uchun.
4. **Savol:** Kodni qadamma-qadam bajarishda "Step Over" va "Step Into" farqi nimada?
   * **Javob:** "Step Over" keyingi qatorga o'tadi (funksiya bo'lsa uning ichiga kirmaydi). "Step Into" esa joriy qatordagi funksiya ichiga kirib, uning ichki qadamlarini birma-bir bajaradi.

### Middle (5–8)
5. **Savol:** Source Map nima va u loyihalarda nima uchun kerak?
   * **Javob:** Source Map — bu build jarayonida siqilgan (minified) kod bilan asl yozilgan kodni bog'laydigan xarita. U production-da yuz bergan xatolarni oson topish va asl kodni debug qilish uchun kerak.
6. **Savol:** Conditional Breakpoint nima?
   * **Javob:** Faqat ma'lum bir shart bajarilgandagina (masalan \`i === 50\` bo'lganda) kodni to'xtatadigan breakpoint turi.
7. **Savol:** \`console.time()\` va \`console.timeEnd()\` qanday ishlatiladi?
   * **Javob:** Bir xil teg (label) nomi bilan chaqirilib, ular orasida bajarilgan kodning qancha vaqt (millisekund) olganini o'lchash uchun ishlatiladi.
8. **Savol:** \`console.trace()\` nimani chop etadi?
   * **Javob:** Xato yuz bergan yoki chaqirilgan joygacha bo'lgan funksiyalar chaqiruvi iyerarxiyasini (Call Stack) ko'rsatadi.

### Senior (9–12)
9. **Savol:** Dom Breakpoints nima va ularning qanday turlari bor?
   * **Javob:** HTML DOM elementi ustida biror amal bajarilganda kodni to'xtatish. Turlari: Subtree modifications (ichki elementlar o'zgarganda), Attribute modifications (klass yoki id o'zgarganda), Node removal (element o'chirilganda).
10. **Savol:** JavaScript single-threaded bo'lsa, asinxron callbacklar bajarilayotgan paytda Call Stack va Async Call Stack iyerarxiyasi DevTools-da qanday ko'rsatiladi?
    * **Javob:** DevTools-da "Async" funksiyasi yoqilgan bo'lsa, u asinxron vazifani yaratgan joyni ham Call Stack-ning quyi qismida xotirada saqlab ko'rsatib beradi.
11. **Savol:** "Blackboxing" (Ignore List) nima va u debugging jarayonini qanday osonlashtiradi?
    * **Javob:** Uchinchi tomon kutubxonalari (masalan, React, jQuery yoki lodash) kodlarini debugging jarayonida chetlab o'tish (ignore qilish). Bu orqali "Step Into" qilganda kutubxonalar kodiga kirmasdan faqat o'zimiz yozgan kod bo'yicha yuramiz.
12. **Savol:** Xotira sizib chiqishini (Memory Leak) aniqlashda "Heap Snapshot" dan qanday foydalaniladi?
    * **Javob:** Ikki yoki undan ortiq vaqt oralig'ida xotira nusxalari (snapshots) olinadi va ularni taqqoslash ("Comparison") orqali qaysi obyektlar o'chirilmasdan xotirada qolib ketayotganini aniqlash mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali debugging va console metodlari bo'yicha mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Rekursiv funksiyadagi cheksizlikni Call Stack orqali topish
Faraz qilaylik, bizda rekursiv faktorial hisoblaydigan funksiya bor, lekin u ba'zida cheksiz siklga tushib, stack to'lib ketmoqda:

\`\`\`javascript
function findFactorial(n) {
  // Debugging uchun chaqiriq trace-ni ko'ramiz
  if (n < 0) {
    console.trace("Manfiy son bilan chaqirildi!");
    return 0;
  }
  
  if (n === 1 || n === 0) {
    return 1;
  }
  
  // Xato shart: agar n son bo'lmasa yoki butun bo'lmasa nima bo'ladi?
  // debugger yordamida oqimni to'xtatib kuzatamiz:
  if (typeof n !== 'number') {
    debugger;
  }
  
  return n * findFactorial(n - 1);
}

// Mana bu chaqiriq cheksiz rekursiyaga olib keladi:
// findFactorial(3.5); // 3.5 -> 2.5 -> 1.5 -> 0.5 -> -0.5 ...
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Konsol loglarini tozalash:** console metodlari bajarilayotgan paytda sinxron bo'lib, ular parametr sifatida uzatilgan obyektlarni xotirada ushlab turadi. Katta hajmdagi ma'lumotlarni konsolga chiqarish sahifani sekinlashtiradi.
* **Production-da o'chirish:** Vite loyihalarda Vite config orqali \`esbuild: { drop: ['console', 'debugger'] }\` sozlamasini o'rnatish orqali ishlab chiqarish kodidan konsollarni butunlay tozalang.

---

## 10. 📌 Cheat Sheet

| Metod / Buyruq | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`console.log()\` | Oddiy xabar chiqarish | \`console.log(x)\` |
| \`console.table()\` | Massiv/obyektlarni jadval ko'rinishida chiqarish | \`console.table(users)\` |
| \`console.trace()\` | Call Stack izlarini ko'rsatish | \`console.trace('Log trace')\` |
| \`console.time(label)\` | Vaqtni o'lchashni boshlash | \`console.time('fetchTime')\` |
| \`console.timeEnd(label)\` | O'lchashni tugatish va vaqtni chiqarish | \`console.timeEnd('fetchTime')\` |
| \`debugger;\` | Dasturni to'xtatib, DevTools-ni ishga tushirish | \`if(!data) { debugger; }\` |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Console Table",
      instruction: "Obyektni jadval ko'rinishida chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerda console.table ishlating\n",
      hint: "console.table(car);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    },
    {
      id: 2,
      title: "2️⃣ Console Error log",
      instruction: "'Xatolik yuz berdi!' xabarini console.error yordamida konsolga chiqaring.",
      startingCode: "// Error log yozing\n",
      hint: "console.error('Xatolik yuz berdi!');",
      test: "if (code.includes('console.error')) return null; return 'console.error dan foydalaning';"
    },
    {
      id: 3,
      title: "3️⃣ Console Warn log",
      instruction: "'Ogohlantirish!' xabarini console.warn yordamida konsolga chiqaring.",
      startingCode: "// Warn log yozing\n",
      hint: "console.warn('Ogohlantirish!');",
      test: "if (code.includes('console.warn')) return null; return 'console.warn dan foydalaning';"
    },
    {
      id: 4,
      title: "4️⃣ Debugger kalit so'zi",
      instruction: "Funksiya ichida 'result' hisoblangandan keyin kodni pauza qilish uchun 'debugger' kalit so'zini joylashtiring.",
      startingCode: "function checkResult(x) {\n  const result = x * 2;\n  // debugger yozing\n  return result;\n}",
      hint: "debugger;",
      test: "if (code.includes('debugger;')) return null; return 'debugger kalit so\\'zini yozing';"
    },
    {
      id: 5,
      title: "5️⃣ Console Time",
      instruction: "'testTime' yorlig'i ostida vaqtni o'lchashni boshlang va tugating.",
      startingCode: "// Vaqtni o'lchashni boshlang va tugating\n",
      hint: "console.time('testTime'); console.timeEnd('testTime');",
      test: "if (code.includes('console.time') && code.includes('console.timeEnd')) return null; return 'console.time va console.timeEnd dan foydalaning';"
    },
    {
      id: 6,
      title: "6️⃣ Console Count",
      instruction: "'counter' yorlig'i necha marta chaqirilganini sanash uchun console.count ni yozing.",
      startingCode: "function clickEvent() {\n  // console.count chaqiring\n}",
      hint: "console.count('counter');",
      test: "if (code.includes('console.count')) return null; return 'console.count dan foydalaning';"
    },
    {
      id: 7,
      title: "7️⃣ Console Group",
      instruction: "'MyLogs' yorlig'i ostida konsol loglarini guruhlang va guruhni yoping.",
      startingCode: "// Guruhni oching, log yozing va guruhni yoping\n",
      hint: "console.group('MyLogs'); console.log('Hi'); console.groupEnd();",
      test: "if (code.includes('console.group') && code.includes('console.groupEnd')) return null; return 'console.group va console.groupEnd ishlatilsin';"
    },
    {
      id: 8,
      title: "8️⃣ Console Trace",
      instruction: "Funksiya qanday chaqirilganini (Call Stack trace) ko'rish uchun console.trace ni ishlating.",
      startingCode: "function processTask() {\n  // Trace ni chaqiring\n}",
      hint: "console.trace();",
      test: "if (code.includes('console.trace()')) return null; return 'console.trace() dan foydalaning';"
    },
    {
      id: 9,
      title: "9️⃣ Try...Catch Error logging",
      instruction: "Catch blokida xato xabarini (err.message) console.error yordamida chiqaring.",
      startingCode: "try {\n  throw new Error('Test xatosi');\n} catch(err) {\n  // Error log yozing\n}",
      hint: "console.error(err.message);",
      test: "if (code.includes('console.error(err.message)') || code.includes('console.error(err.message)')) return null; return 'err.message ni console.error yordamida chiqaring';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Console Assert",
      instruction: "Yoshi 18 dan kichik bo'lsa 'Yosh yetarli emas' xabarini chiqaruvchi console.assert yozing.",
      startingCode: "const age = 15;\n// console.assert yozing\n",
      hint: "console.assert(age >= 18, 'Yosh yetarli emas');",
      test: "if (code.includes('console.assert') && code.includes('age >= 18')) return null; return 'console.assert dan foydalaning';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Conditional Breakpoint sharti",
      instruction: "Agar index 5 bo'lsa kodni to'xtatuvchi shartli debugger yozing (if orqali).",
      startingCode: "const index = 5;\n// if sharti bilan debugger yozing\n",
      hint: "if (index === 5) debugger;",
      test: "if (code.includes('if') && code.includes('index') && code.includes('debugger')) return null; return 'if orqali index === 5 bo\\'lganda debugger qo\\'shing';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Console Clear",
      instruction: "Konsolni dasturiy ravishda tozalash buyrug'ini yozing.",
      startingCode: "// Konsolni tozalang\n",
      hint: "console.clear();",
      test: "if (code.includes('console.clear()')) return null; return 'console.clear() metodini chaqiring';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Operatsiya vaqtini o'lchash (timeOperation)",
      instruction: "`console.time` va `console.timeEnd` metodlaridan foydalanib, berilgan `callback` funksiyasining bajarilish vaqtini `label` yorlig'i ostida o'lchovchi va callback natijasini qaytaruvchi `timeOperation(label, callback)` funksiyasini yozing.",
      startingCode: "function timeOperation(label, callback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "console.time(label);\nconst res = callback();\nconsole.timeEnd(label);\nreturn res;",
      test: "if (typeof timeOperation !== 'function') return 'timeOperation funksiya emas';\nlet called = false;\nconst res = timeOperation('test', () => { called = true; return 42; });\nif (!called || res !== 42) return 'Callback to\\'g\\'ri bajarilmadi yoki natija qaytarilmadi';\nif (!code.includes('console.time') || !code.includes('console.timeEnd')) return 'console.time va console.timeEnd ishlatilmadi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Call Stack izlarini chiqarish (traceCallStack)",
      instruction: "Chaqirilayotgan funksiyalarning to'liq izini (`Call Stack trace`) konsolga chiqarish uchun `console.trace()` metodidan foydalanuvchi va `callback` funksiyasini chaqirib natijasini qaytaruvchi `traceCallStack(callback)` funksiyasini yozing. Agarda callback bajarilishida xatolik yuz bersa, uni ushlab olib, xato xabarini `console.error` orqali chiqaring va `null` qaytaring.",
      startingCode: "function traceCallStack(callback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try {\n  console.trace();\n  return callback();\n} catch(err) {\n  console.error(err.message);\n  return null;\n}",
      test: "if (typeof traceCallStack !== 'function') return 'traceCallStack funksiya emas';\nif (!code.includes('console.trace')) return 'console.trace() ishlatilmadi';\nif (!code.includes('try') || !code.includes('catch') || !code.includes('console.error')) return 'Try-catch yoki console.error ishlatilmadi';\nconst successRes = traceCallStack(() => 'ok');\nif (successRes !== 'ok') return 'Muvaffaqiyatli callback natijasi noto\\'g\\'ri';\nconst failRes = traceCallStack(() => { throw new Error('err'); });\nif (failRes !== null) return 'Xatolik yuz berganda null qaytarilmadi';\nreturn null;"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da debugger kalit so'zi nima vazifani bajaradi?",
    "options": [
      "Koddagi barcha xatolarni avtomatik tarzda tuzatadi",
      "Agar brauzer DevTools oynasi ochiq bo'lsa, kod bajarilishini o'sha qatorda to'xtatadi",
      "Kod ishlash tezligini ikki barobar oshiradi",
      "Sinxron kodni asinxron kodga o'zgartiradi"
    ],
    "correctAnswer": 1,
    "explanation": "debugger kalit so'zi dasturchi tomonidan qo'yilgan breakpoint vazifasini bajaradi va DevTools ochiq bo'lgan taqdirda dasturni o'sha joyda to'xtatib, holatni tekshirish imkonini beradi."
  },
  {
    "id": 2,
    "question": "Massiv yoki obyektlarni konsolda jadval shaklida chiroyli ko'rsatish uchun qaysi metod mos keladi?",
    "options": [
      "console.log()",
      "console.dir()",
      "console.table()",
      "console.group()"
    ],
    "correctAnswer": 2,
    "explanation": "console.table() metodi uzatilgan obyekt yoki massiv elementlarini konsolda jadval ko'rinishida chiqarib beradi."
  },
  {
    "id": 3,
    "question": "Dasturdagi xatolik aynan qaysi funksiyalar zanjiri orqali chaqirilib kelganini (Call Stack trace) konsolga chiqarish uchun qaysi metoddan foydalaniladi?",
    "options": [
      "console.log()",
      "console.trace()",
      "console.warn()",
      "console.assert()"
    ],
    "correctAnswer": 1,
    "explanation": "console.trace() metodi chaqirilgan nuqtagacha bo'lgan Call Stack izlarini konsolga chiqaradi."
  },
  {
    "id": 4,
    "question": "Production (ishlab chiqarish) uchun siqilgan (minify qilingan) kodni DevTools-da asl yozilgan holida ko'rish imkonini beruvchi texnologiya nima deb nomlanadi?",
    "options": [
      "Source Map",
      "Web Workers",
      "Babel Compiler",
      "Service Workers"
    ],
    "correctAnswer": 0,
    "explanation": "Source Map (.map fayllari) siqilgan kod bilan uning asl manbasi (source code) o'rtasidagi bog'liqlikni saqlaydi va debuggingni osonlashtiradi."
  },
  {
    "id": 5,
    "question": "Faqat biror o'zgaruvchi ma'lum bir qiymatga teng bo'lgandagina (masalan, i === 10) kodni to'xtatadigan breakpoint turi qanday ataladi?",
    "options": [
      "DOM Breakpoint",
      "Conditional Breakpoint",
      "Event Listener Breakpoint",
      "XHR Breakpoint"
    ],
    "correctAnswer": 1,
    "explanation": "Conditional Breakpoint (shartli to'xtash nuqtasi) faqat berilgan shart 'true' bo'lgandagina dasturni to'xtatish imkonini beradi."
  },
  {
    "id": 6,
    "question": "Debugging jarayonida 'Step Over' tugmasi bosilganda nima sodir bo'ladi?",
    "options": [
      "Dastur bajarilishini butunlay to'xtatadi",
      "Keyingi qatorga o'tadi, agar u qatorda funksiya chaqirilgan bo'lsa, uning ichiga kirmaydi",
      "Funksiyaning eng birinchi qatoriga kiradi",
      "Faqat xato yuz berganda to'xtaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Step Over keyingi qatorga o'tadi, lekin funksiyalar ichiga chuqurlashib kirmasdan ularni to'liq bajarib o'tib ketadi. Ichiga kirish uchun esa Step Into ishlatiladi."
  },
  {
    "id": 7,
    "question": "Koddagi biror bo'limning bajarilish vaqtini aniq o'lchash uchun qaysi metodlar juftligi ishlatiladi?",
    "options": [
      "console.start() va console.stop()",
      "console.time() va console.timeEnd()",
      "console.profile() va console.profileEnd()",
      "console.log() va console.clear()"
    ],
    "correctAnswer": 1,
    "explanation": "console.time('label') va console.timeEnd('label') yordamida jarayonning boshlanishi va tugashi orasidagi millisekundlarni hisoblash mumkin."
  },
  {
    "id": 8,
    "question": "DevTools-dagi 'Blackboxing' (Ignore List) funksiyasining maqsadi nima?",
    "options": [
      "Dasturning xavfsizlik darajasini oshirish",
      "Debugging paytida uchinchi tomon kutubxonalari (React, Vue va h.k.) kodlari ichiga kirmasdan chetlab o'tish",
      "Kodlarni brauzer keshidan o'chirib yuborish",
      "Dasturni qorong'u rejimga o'tkazish"
    ],
    "correctAnswer": 1,
    "explanation": "Blackboxing yordamida biz kutubxonalar kodini e'tiborsiz qoldiramiz. Natijada debug qilayotganda faqat o'zimiz yozgan kod bo'ylab harakatlanamiz."
  },
  {
    "id": 9,
    "question": "HTML elementining atributlari (masalan, class yoki style) JavaScript orqali o'zgartirilganda kodni to'xtatish uchun qanday breakpoint o'rnatiladi?",
    "options": [
      "DOM Attribute Modifications Breakpoint",
      "Event Listener Breakpoint",
      "Fetch/XHR Breakpoint",
      "Line-of-code Breakpoint"
    ],
    "correctAnswer": 0,
    "explanation": "DOM breakpoints bo'limida 'Attribute modifications' tanlansa, element atributi o'zgargan zahoti uni o'zgartirgan JS qatorida kod to'xtaydi."
  },
  {
    "id": 10,
    "question": "Nima uchun production koddagi ortiqcha console.log-larni o'chirish yoki build tool yordamida olib tashlash kerak?",
    "options": [
      "Chunki ular JS fayl hajmini keskin oshirib yuboradi",
      "Chunki console loglari foydalanuvchiga keraksiz metadatalarni chiqaradi va sinxron bo'lgani uchun tezlikni pasaytirishi mumkin",
      "Chunki xosting provayderlari console loglari uchun pul oladi",
      "Hech qanday salbiy ta'siri yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Console obyektining metodlari sinxron bo'lib, ular xotirani egallaydi va unumdorlikni pasaytiradi. Shuningdek, uchinchi shaxslarga ichki tizim ma'lumotlarini oshkor qilib qo'yishi mumkin."
  },
  {
    "id": 11,
    "question": "DevTools debugging panelidagi 'Watch' bo'limi nima uchun ishlatiladi?",
    "options": [
      "Kodni real vaqtda videoga olish uchun",
      "Dasturchi kiritgan o'zgaruvchilar yoki ifodalarning qiymatlarini debug jarayonida doimiy kuzatib borish uchun",
      "CPU haroratini o'lchash uchun",
      "Server yuklamasini nazorat qilish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Watch bo'limiga biror o'zgaruvchi yoki ifoda (masalan, user.id) yozib qo'yilsa, u har bir qadam bajarilganda o'zgaruvchi qiymati qanchaga o'zgarganini avtomatik ko'rsatib boradi."
  },
  {
    "id": 12,
    "question": "Chrome DevTools-ning qaysi paneli xotira sizib chiqishi (Memory Leaks) va xotira holatini tahlil qilish uchun mo'ljallangan?",
    "options": [
      "Console",
      "Network",
      "Memory (yoki Performance)",
      "Elements"
    ],
    "correctAnswer": 2,
    "explanation": "Memory paneli yordamida xotiradan nusxa (Heap Snapshot) olish va qaysi obyektlar o'chirilmasdan xotirani band qilib turganini aniqlash mumkin."
  }
]

};
