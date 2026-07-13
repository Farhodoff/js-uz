export const step1_nodejs_intro = {
  theory: `# Node.js: Brauzerdan tashqaridagi hayot! 🚀

Salom, JS dasturchi! Hozirgi kungacha sen faqat brauzerda (Chrome, Safari va h.k.) yashading. HTML elementlarini \`document.querySelector\` bilan ushlading, \`console.log()\` qilding va hamma narsa oynada paydo bo'ldi. Lekin bilasanmi? **Node.js** bilan JavaScript o'z qafasidan (brauzerdan) qochib, to'g'ridan-to'g'ri operatsion tizimda ishlay boshlaydi!

Node.js bu - til emas, framework ham emas. Bu V8 (Google Chrome'ning JS dvigateli) ustiga qurilgan, JS kodini istalgan kompyuterda ishga tushirishga imkon beruvchi **Runtime Environment** (ishlash muhiti).

### Brauzer vs Node.js 🥊

Brauzerda bizda \`window\` va \`document\` bor. Node.js da esa ular yo'q! Chunki Node'da sahifa yo'q, u oddiy qora ekran (terminal).
Node.js da \`window\` o'rniga \`global\` degan obyekt bor.

❌ **YOMON (Brauzer odatlari Node.js da)**
\`\`\`javascript
console.log(window.innerHeight); // XATO! window is not defined
alert("Salom!"); // XATO! alert is not defined
document.getElementById("btn"); // XATO!
\`\`\`

✅ **YAXSHI (Node.js uslubi)**
\`\`\`javascript
console.log(global); // Node.js ning global obyekti
console.log(process.version); // Node.js versiyasini ko'rish
\`\`\`

---

### Node.js qanday ishlaydi? ⚙️

Node.js **Single Threaded** (bir oqimli) va **Non-blocking I/O** (bloklamaydigan) arxitekturaga asoslangan. 

Tasavvur qil: Restoranda bitta ofitsiant (Thread) bor. 
Agar u bitta mijozning ovqati pishishini oshxonada kutib tursa, boshqa mijozlar xafa bo'lib ketadi (Blocking).
Lekin Node.js ofitsianti aqlli! U buyurtmani oshxonaga beradi-da, boshqa stollarga borib buyurtma olishda davom etadi. Ovqat pishgach, oshxona (Event Loop) unga xabar beradi (Non-blocking).

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Node.js (Thread)
    participant Worker Pool (OS)

    Client->>Node.js (Thread): Faylni o'qish (Non-blocking)
    Node.js (Thread)->>Worker Pool (OS): Bu faylni o'qigin! Men kuta olmayman.
    Node.js (Thread)->>Client: Boshqa ishlarni qilaveramiz...
    Worker Pool (OS)->>Node.js (Thread): Fayl o'qildi! Mana natija (Callback/Promise)
    Node.js (Thread)->>Client: Mana fayl ichidagi ma'lumot!
\`\`\`

### REPL nima? 💻

Terminalni ochib, \`node\` deb yozsang va Enter ni bossang, ekranda \`>\` belgisi paydo bo'ladi. Bu **REPL** (Read-Eval-Print Loop). Bu yerda to'g'ridan-to'g'ri JS kodlarini yozib, natijasini shu yerning o'zida ko'rishing mumkin. Bu xuddi brauzerdagi Console ga o'xshaydi.

---

### 🎤 Intervyu savollari

1. **Savol: Node.js o'zi nima? Bu dasturlash tilimi?**
   **Javob:** Yo'q, u dasturlash tili emas. U Chrome V8 JS dvigateli ustiga qurilgan, JavaScript kodini serverda va brauzerdan tashqarida ishga tushirish uchun xizmat qiladigan ochiq kodli kross-platformali "JavaScript Runtime Environment" (ishlash muhiti).

2. **Savol: Node.js da \`window\` obyektiga murojaat qilsak nima bo'ladi?**
   **Javob:** ReferenceError xatosi kelib chiqadi (\`window is not defined\`). Chunki Node.js da DOM (Document Object Model) yoki brauzer API lari yo'q. Uning o'zining \`global\` deb ataladigan obyekti bor.

3. **Savol: Single-thread (bir oqimli) bo'la turib Node.js qanday qilib bir vaqtning o'zida minglab so'rovlarni qabul qila oladi?**
   **Javob:** Node.js Non-blocking I/O (bloklanmaydigan I/O) va Event Loop (Hodisalar halqasi) mexanizmlaridan foydalanadi. U qiyin va uzoq vaqt oladigan vazifalarni (fayl o'qish, bazaga so'rov) orqa fondagi C++ thread-pool'ga tashlab yuboradi va o'zi yangi so'rovlarni qabul qilishda davom etadi. Ish bitgach, natija Event Queue orqali yana asosiy thread'ga qaytadi.`,
  exercises: [
  {
    "id": 1,
    "title": "Global Obyekt",
    "instruction": "Node.js da `window` yo'q, uning o'rniga `global` obyekti ishlatiladi. Kodingizda `global.myVariable` degan o'zgaruvchiga 'Hello Node' qiymatini ta'minlang va uni `console.log` qiling.",
    "startingCode": "// Sizning kodingiz\n",
    "hint": "global.myVariable = 'Hello Node';\nconsole.log(global.myVariable);",
    "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return logs.includes('Hello Node') && global.myVariable === 'Hello Node';"
  },
  {
    "id": 2,
    "title": "Process obyekti",
    "instruction": "`process.version` Node.js versiyasini qaytaradi. Uni `console.log` orqali ekranga chiqaring.",
    "startingCode": "// process.version ni chop eting\n",
    "hint": "console.log(process.version)",
    "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return logs.length > 0 && typeof logs[0] === 'string' && logs[0].startsWith('v');"
  },
  {
    "id": 3,
    "title": "Platformani aniqlash",
    "instruction": "Dasturingiz qaysi OS (Operatsion Tizim) da ishlayotganini bilish uchun `process.platform` ni ekranga chiqaring.",
    "startingCode": "// process.platform dan foydalaning\n",
    "hint": "console.log(process.platform)",
    "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return logs.includes(process.platform);"
  },
  {
    "id": 4,
    "title": "Vaqtni o'lchash",
    "instruction": "Node.js da brauzerdagi kabi `setTimeout` bor. 1 sekunddan keyin 'Vaqt tugadi' yozuvini chiqaruvchi kod yozing.",
    "startingCode": "setTimeout(() => {\n  // kodingiz\n}, 1000);",
    "hint": "console.log('Vaqt tugadi')",
    "test": "return code.includes('console.log') && (code.includes(\"'Vaqt tugadi'\") || code.includes('\"Vaqt tugadi\"'));"
  },
  {
    "id": 5,
    "title": "Joriy papka manzili",
    "instruction": "Node.js da qaysi papkada turganingizni bilish uchun `process.cwd()` funksiyasini chaqirib natijasini chop eting.",
    "startingCode": "// cwd - current working directory\n",
    "hint": "console.log(process.cwd());",
    "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return logs.includes(process.cwd());"
  },
  {
    "id": 6,
    "title": "Joriy fayl papkasi",
    "instruction": "Har bir faylda maxsus `__dirname` o'zgaruvchisi bo'ladi. U fayl joylashgan papkani qaytaradi. `__dirname` ni chop eting.",
    "startingCode": "// __dirname\n",
    "hint": "console.log(__dirname);",
    "test": "return code.includes('console.log') && code.includes('__dirname');"
  },
  {
    "id": 7,
    "title": "Fayl nomi",
    "instruction": "`__filename` orqali faylning to'liq nomini o'qish mumkin. Uni ekranga chiqaring.",
    "startingCode": "// __filename\n",
    "hint": "console.log(__filename);",
    "test": "return code.includes('console.log') && code.includes('__filename');"
  },
  {
    "id": 8,
    "title": "Intervaldan chiqish",
    "instruction": "`setInterval` har soniyada 'Tik-tok' yozuvini chiqaradi. Kodga shunday narsa qo'shingki, u `clearInterval` orqali saqlab qo'yilgan intervalni o'chirsin.",
    "startingCode": "const timer = setInterval(() => console.log('Tik-tok'), 1000);\n// Shu yerda uni to'xtating\n",
    "hint": "clearInterval(timer);",
    "test": "return code.includes('clearInterval(timer)');"
  },
  {
    "id": 9,
    "title": "Dasturni tugatish",
    "instruction": "`process.exit(0)` funksiyasi dasturni muvaffaqiyatli yakunlaydi. Uni chaqiring.",
    "startingCode": "// Dasturni bu yerdan to'xtatamiz\n",
    "hint": "process.exit(0);",
    "test": "return code.includes('process.exit(0)');"
  },
  {
    "id": 10,
    "title": "Xotira ishlatilishi",
    "instruction": "`process.memoryUsage()` ni ekranga chiqaring, u Node.js qancha RAM ishlatayotganini ko'rsatadi.",
    "startingCode": "// xotirani tekshiring\n",
    "hint": "console.log(process.memoryUsage());",
    "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return logs.length > 0 && typeof logs[0] === 'object' && logs[0].hasOwnProperty('heapUsed');"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Node.js asosan qaysi muhitda JS ni ishlatish uchun yaratilgan?",
    "options": [
      "Faqat Brauzerda",
      "Faqat Mobil ilovalarda",
      "Serverda (Kompyuterda)",
      "Faqat Smart Soatlarda"
    ],
    "correctAnswer": 2,
    "explanation": "Node.js JS kodini server yoki kompyuterda bevosita ishga tushirish imkonini beradi."
  },
  {
    "id": 2,
    "question": "Node.js dvigateli qaysi kompaniya tomonidan ishlab chiqilgan V8 dvigateliga asoslangan?",
    "options": [
      "Microsoft",
      "Apple",
      "Google",
      "Mozilla"
    ],
    "correctAnswer": 2,
    "explanation": "Node.js Google'ning ochiq kodli Chrome V8 JavaScript dvigatelida ishlaydi."
  },
  {
    "id": 3,
    "question": "Node.js da `window` obyektining muqobili qanday nomlanadi?",
    "options": [
      "global",
      "universe",
      "document",
      "process"
    ],
    "correctAnswer": 0,
    "explanation": "Brauzerdagi `window` o'rniga Node.js da barcha fayllar uchun umumiy bo'lgan `global` obyekti ishlatiladi."
  },
  {
    "id": 4,
    "question": "REPL so'zining qisqartmasi to'g'ri yozilgan javobni toping.",
    "options": [
      "Run-Evaluate-Parse-Loop",
      "Read-Eval-Print-Loop",
      "Render-Event-Play-Loop",
      "Read-Error-Print-Loop"
    ],
    "correctAnswer": 1,
    "explanation": "REPL (Read-Eval-Print-Loop) bu kodlarni yozib darhol javobini ko'rish uchun mo'ljallangan interaktiv terminal muhitidir."
  },
  {
    "id": 5,
    "question": "Node.js ning eng katta afzalliklaridan biri nima?",
    "options": [
      "DOM bilan ishlashning osonligi",
      "Non-blocking (bloklamaydigan) I/O va Event-driven arxitekturasi",
      "C++ da yozilgan kodlarni tushunmasligi",
      "Faqat Windows da ishlashi"
    ],
    "correctAnswer": 1,
    "explanation": "Non-blocking arxitektura orqali u yuzlab so'rovlarni bir vaqtda hech birini kutib turmasdan bajara oladi."
  },
  {
    "id": 6,
    "question": "Qaysi komanda orqali terminalda Node.js versiyasini bilish mumkin?",
    "options": [
      "node -v",
      "node -info",
      "npm version",
      "node -status"
    ],
    "correctAnswer": 0,
    "explanation": "Terminalda `node -v` yoki `node --version` orqali o'rnatilgan Node.js versiyasini bilish mumkin."
  },
  {
    "id": 7,
    "question": "`process.cwd()` funksiyasi nimani qaytaradi?",
    "options": [
      "Fayl nomini",
      "Joriy ish papkasi manzilini",
      "Node.js versiyasini",
      "RAM miqdorini"
    ],
    "correctAnswer": 1,
    "explanation": "cwd (Current Working Directory) dastur ishga tushirilgan papkaning to'liq manzilini qaytaradi."
  },
  {
    "id": 8,
    "question": "Node.js dasturini kodning xohlagan joyidan qanday to'xtatish (chiqib ketish) mumkin?",
    "options": [
      "window.close()",
      "process.stop()",
      "process.exit()",
      "global.quit()"
    ],
    "correctAnswer": 2,
    "explanation": "`process.exit()` dastur bajarilishini darhol to'xtatadi."
  },
  {
    "id": 9,
    "question": "Node.js qanday thread (oqim) arxitekturasiga asoslangan?",
    "options": [
      "Multi-threaded",
      "Single-threaded",
      "Dual-threaded",
      "Thread ishlatilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript kabi Node.js ham o'zining asosiy ishlari uchun bitta oqimda (Single-threaded) ishlaydi."
  },
  {
    "id": 10,
    "question": "`__dirname` o'zgaruvchisi nima ma'lumot beradi?",
    "options": [
      "Joriy loyiha nomini",
      "Hozirgi foydalanuvchi nomini",
      "Fayl joylashgan joriy papka to'liq manzilini",
      "Global obyektlarni"
    ],
    "correctAnswer": 2,
    "explanation": "`__dirname` Node.js da hozirgi skript joylashgan papkaning manzilini bildiruvchi o'zgaruvchidir."
  },
  {
    "id": 11,
    "question": "Node.js dasturida Node.js arxitekturasi va OS o'rtasidagi aloqani asosan nima ta'minlaydi (ThreadPool va boshqalar)?",
    "options": [
      "V8 dvigateli",
      "Libuv kutubxonasi",
      "React kutubxonasi",
      "NPM moduli"
    ],
    "correctAnswer": 1,
    "explanation": "Libuv - Node.js dagi Event Loop, Non-blocking I/O va Thread Pool kabi orqa fon jarayonlarini boshqaruvchi C tili kutubxonasidir."
  },
  {
    "id": 12,
    "question": "Brauzerda `document` kabi maxsus obyektlar bor, Node.js da ham bormi?",
    "options": [
      "Ha, xuddi shunday ishlaydi",
      "Yo'q, chunki Node.js sahifa (UI) render qilmaydi",
      "Faqat `document.getElementById` ishlaydi",
      "Faqat o'ziga xos `node_document` bor"
    ],
    "correctAnswer": 1,
    "explanation": "Node.js sahifani chizish va ko'rsatish bilan shug'ullanmaydi, shuning uchun brauzer DOM obyektlari unda mavjud emas."
  }
]
};
