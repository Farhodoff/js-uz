export const globalScopeLesson = {
  id: "global-scope",
  title: "Global Scope (Global doira)",
  theory: `## Global Scope – JavaScriptning eng tashqi darajasi

**Global Scope** (Umumiy doira) — bu JavaScript kodining eng tashqi qismidir. Bu yerda e'lon qilingan o'zgaruvchilar va funksiyalar dasturning istalgan joyidan (xohlagan funksiya yoki blok ichidan) ko'rinadi.

## 1. NEGA kerak?
Ba'zan bizga butun dastur davomida kerak bo'ladigan ma'lumotlar zarur bo'ladi. Masalan, foydalanuvchining tanlagan tili yoki dastur versiyasi. Bunday ma'lumotlarni globalda saqlash qulay.

## 2. SODDALIK (Analogiya)
Global doirani **shahar maydoni** deb tasavvur qiling. Maydon o'rtasida turgan soatni (global o'zgaruvchini) shahardagi barcha odamlar (hamma funksiyalar) ko'ra oladi. Local scope esa — uyingiz ichidagi soat, uni faqat uydagilar ko'radi.

## 3. STRUKTURA

### A. Global o'zgaruvchi yaratish
Hech qanday funksiya yoki blok ichida bo'lmagan o'zgaruvchi global hisoblanadi:
\`\`\`javascript
let til = "O'zbekcha"; // Global

function salomBer() {
  console.log("Til: " + til); // Global o'zgaruvchini funksiya ichida ishlatish ✅
}
salomBer();
\`\`\`

### B. Global Obyekt (window)
Brauzerda barcha global narsalar \`window\` obyektining ichida bo'ladi:
\`\`\`javascript
var ism = "Farhod";
console.log(window.ism); // "Farhod"
\`\`\`
*(Eslatma: let va const bilan yaratilgan global o'zgaruvchilar window'ga qo'shilmaydi).*

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = 10; // Global

function o'zgartir() {
  x = 20; // Global o'zgaruvchini funksiya ichida yangilash
}
o'zgartir();
console.log(x); // 20
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Global ifloslanish (Global Pollution):** Juda ko'p global o'zgaruvchi yaratmang! Agar ikki xil faylda bir xil nomli global o'zgaruvchi bo'lsa, ular bir-birini buzib qo'yadi.
2. **E'lonsiz o'zgaruvchi:** Funksiya ichida \`let/const\` yozishni unutsangiz (\`y = 5\`), JS uni avtomatik global qilib yuboradi. Bu juda yomon odat!

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Global Scope nima?**
Global Scope (global doira) — bu JavaScript kodining eng tashqi qismi bo'lib, bu yerda e'lon qilingan o'zgaruvchilar va funksiyalar dasturning istalgan joyidan foydalanish uchun ochiq bo'ladi.


**2. Qayerda e'lon qilingan o'zgaruvchilar global hisoblanadi?**
Hech qanday funksiya yoki blok (\`{ }\`) ichida bo'lmagan, kodning eng yuqori qismida e'lon qilingan o'zgaruvchilar global hisoblanadi.


**3. Global o'zgaruvchini funksiya ichida ishlatsa bo'ladimi?**
Ha, global o'zgaruvchini kodning istalgan joyida, jumladan har qanday funksiya yoki blok ichida bemalol ishlatish va o'zgartirish mumkin.


**4. window obyekti nima?**
\`window\` — brauzer muhitidagi global obyekt bo'lib, u brauzer oynasini ifodalaydi va barcha global o'zgaruvchilar hamda brauzer API'larini (masalan, \`window.alert\`) o'z ichiga oladi.


**5. Nima uchun global o'zgaruvchilar xavfli bo'lishi mumkin?**
Chunki dasturning istalgan joyi ularni o'zgartirishi mumkin, bu esa kutilmagan xatoliklarga (side-effects) va turli kodlar orasida nomlar to'qnashuviga olib keladi.


**6. let va var global e'lon qilinganda nima farqi bor?**
Global e'lon qilingan \`var\` o'zgaruvchisi global \`window\` obyektining xususiyatiga aylanadi (\`window.x\`), lekin \`let\` (va \`const\`) global obyektga qo'shilmaydi.


**7. "Global Namespace Pollution" nima degani?**
Global Namespace Pollution (Global doiraning ifloslanishi) — global sohada keragidan ortiq o'zgaruvchilarning to'planishi va bu sababli nomlar to'qnashuvi ehtimolining ortishidir.


**8. Funksiya ichida let ishlatmasdan o'zgaruvchi yaratsak nima bo'ladi?**
Strict mode bo'lmagan holatlarda, kalit so'zsiz yaratilgan o'zgaruvchi (\`x = 10\`) avtomatik ravishda global doiraga qo'shiladi va xavfli hisoblanadi.


**9. Global o'zgaruvchini qachon ishlatish tavsiya etiladi?**
Faqat butun loyiha bo'ylab o'zgarmas umumiy konfiguratsiyalar (masalan, API manzili, dasturning versiyasi yoki sozlamalari) uchun ishlatish tavsiya etiladi.


**10. Global doira faqat brauzerdami yoki Node.js'da ham bormi?**
Ikkala muhitda ham bor. Brauzerda global obyekt \`window\`, Node.js'da esa \`global\` deb ataladi.


**11. globalThis nima uchun kerak?**
\`globalThis\` — har qanday JavaScript ishlaydigan muhitda (brauzer, Node.js, Web Worker) global obyektga murojaat qilishning yagona va universal standart usulidir.


**12. Qanday qilib global o'zgaruvchilar sonini kamaytirish mumkin?**
O'zgaruvchilarni funksiyalar yoki bloklar ichida cheklash (local/block scope), modullardan (ES Modules) foydalanish va ma'lumotlarni bitta global obyekt ichiga guruhlash orqali kamaytirish mumkin.
`,
  exercises: [
    {
      id: 1,
      title: "Global mashqi",
      instruction: "Global o'zgaruvchi yarating va uni funksiya ichida 1 ga oshiring.",
      startingCode: "let count = 0;\nfunction inc() {\n  // Bu yerda countni oshiring\n}\ninc();",
      hint: "count++;",
      test: "if (count === 1) return null; return 'O\\'zgaruvchi oshmadi!';"
    },
    {
      id: 2,
      title: "var va window bog'liqligi",
      instruction: "Global doirada var globalVar = 'Hello' e'lon qiling va window.globalVar ni konsolga chiqarish orqali uning global obyektga qo'shilishini tekshiring.",
      startingCode: "// var globalVar ni yarating va window.globalVar ni konsolga chiqaring\n",
      hint: "var globalVar = 'Hello';\nconsole.log(window.globalVar);",
      test: "if (code.includes('var globalVar') && logs.includes('Hello')) return null; return 'var global o\\'zgaruvchisini window orqali olishni tekshiring!';"
    },
    {
      id: 3,
      title: "Global let va window farqi",
      instruction: "Globalda let globalLet = 'Hi' e'lon qiling va window.globalLet ni konsolga chiqaring (u undefined bo'lishi kerak).",
      startingCode: "// let globalLet ni yarating va window.globalLet ni konsolga chiqaring\n",
      hint: "let globalLet = 'Hi';\nconsole.log(window.globalLet);",
      test: "if (code.includes('let globalLet') && logs.includes('undefined')) return null; return 'let o\\'zgaruvchisi window-da undefined bo\\'lishini tekshiring!';"
    },
    {
      id: 4,
      title: "Global o'zgarmas const",
      instruction: "Global doirada o'zgarmas API_URL yarating (qiymati 'https://api.com'). printUrl() funksiyasi ichida uni konsolga chiqaring.",
      startingCode: "// API_URL const yarating\nfunction printUrl() {\n  // API_URL ni konsolga chiqaring\n}\nprintUrl();\n",
      hint: "const API_URL = 'https://api.com';\nconsole.log(API_URL);",
      test: "if (code.includes('const API_URL') && logs.includes('https://api.com')) return null; return 'API_URL global const yarating va funksiya ichida log qiling!';"
    },
    {
      id: 5,
      title: "globalThis orqali global o'zgaruvchi",
      instruction: "globalThis yordamida siteName = 'JS Academy' global o'zgaruvchisini yarating va konsolga chiqaring.",
      startingCode: "// globalThis orqali yarating\n",
      hint: "globalThis.siteName = 'JS Academy';\nconsole.log(globalThis.siteName);",
      test: "if (logs.includes('JS Academy') && code.includes('globalThis.siteName')) return null; return 'globalThis orqali siteName-ni sozlang va konsolga chiqaring!';"
    },
    {
      id: 6,
      title: "Global funksiya yaratish",
      instruction: "Global doirada greetUser() funksiyasini yarating, u konsolga 'Xush kelibsiz!' yozsin va uni chaqiring.",
      startingCode: "// Global funksiya yarating va chaqiring\n",
      hint: "function greetUser() { console.log('Xush kelibsiz!'); }\ngreetUser();",
      test: "if (code.includes('greetUser()') && logs.includes('Xush kelibsiz!')) return null; return 'greetUser funksiyasini yaratib chaqiring!';"
    },
    {
      id: 7,
      title: "Global o'zgaruvchini funksiyada yangilash",
      instruction: "Globalda let status = 'offline' o'zgaruvchisini yarating. goOnline() funksiyasi status ni 'online' ga o'zgartirsin va uni chaqiring.",
      startingCode: "let status = 'offline';\n// goOnline funksiyasini yozing\n\ngoOnline();\nconsole.log(status);\n",
      hint: "function goOnline() { status = 'online'; }",
      test: "if (logs.includes('online') && code.includes('status =')) return null; return 'goOnline statusni online ga o\\'zgartirishi kerak!';"
    },
    {
      id: 8,
      title: "Global va Local to'qnashuvi",
      instruction: "Globalda let user = 'Mehmon' yarating. greet() funksiyasi ichida yana let user = 'Admin' yarating va konsolga chiqaring. Tashqarida ham konsolga chiqaring.",
      startingCode: "let user = 'Mehmon';\nfunction greet() {\n  // Bu yerda local user yarating\n}\ngreet();\nconsole.log('Global:', user);\n",
      hint: "let user = 'Admin'; console.log('Local:', user);",
      test: "if (logs.includes('Local: Admin') && logs.includes('Global: Mehmon')) return null; return 'Local o\\'zgaruvchi globalni shadowing qilishi kerak!';"
    },
    {
      id: 9,
      title: "globalThis bilan ishlash",
      instruction: "globalThis obyektiga APP_VERSION = '1.0.0' qiymatini yuklang va uni console.log orqali konsolga chiqaring.",
      startingCode: "// APP_VERSION ni globalThis-ga yuklang\n",
      hint: "globalThis.APP_VERSION = '1.0.0';\nconsole.log(globalThis.APP_VERSION);",
      test: "if (logs.includes('1.0.0') && code.includes('globalThis.APP_VERSION')) return null; return 'globalThis yordamida APP_VERSION ni yozib chiqaring!';"
    },
    {
      id: 10,
      title: "Global counter yaratish",
      instruction: "Global doirada let steps = 0 yarating. walk() funksiyasi steps ni 10 ga oshirsin. Funksiyani 3 marta chaqiring va steps qiymatini konsolga chiqaring.",
      startingCode: "let steps = 0;\n// walk funksiyasini yarating va chaqiring\n",
      hint: "function walk() { steps += 10; }\nwalk(); walk(); walk(); console.log(steps);",
      test: "if (logs.includes('30') && code.includes('steps += 10')) return null; return 'steps ni har safar 10 ga oshirib 3 marta chaqiring!';"
    },
    {
      id: 11,
      title: "Global massivni to'ldirish",
      instruction: "Global doirada const list = [] yarating. addItem(item) funksiyasi list massiviga element push qilsin. Nol va Bir parametrlarini qo'shing.",
      startingCode: "const list = [];\n// addItem funksiyasini yozing\n\naddItem('Nol');\naddItem('Bir');\nconsole.log(list);\n",
      hint: "function addItem(item) { list.push(item); }",
      test: "if (logs.includes('Nol') && logs.includes('Bir') && code.includes('push')) return null; return 'list massiviga push orqali elementlarni qo\\'shing!';"
    },
    {
      id: 12,
      title: "this va globalThis tengligi",
      instruction: "Global sohadagi this globalThis ga tengligini tasdiqlovchi console.log('Equal:', this === globalThis) kodini yozing.",
      startingCode: "// this va globalThis ni solishtiring\n",
      hint: "console.log('Equal:', this === globalThis);",
      test: "if (logs.includes('Equal: true')) return null; return 'this === globalThis ekanligini konsolga chiqaring!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da global scope (global doira) deb qaysi doiraga aytiladi?",
      options: [
        "Faqat `if` sharti bajariladigan blokka",
        "Kodning eng tashqi qismi bo'lib, unda e'lon qilingan o'zgaruvchi va funksiyalar dasturning istalgan joyidan ko'rinadi",
        "Faqat server muhiti (Node.js)dagi maxsus doiraga",
        "Faqat HTML fayliga bog'langan qismga"
      ],
      correctAnswer: 1,
      explanation: "Global doira bu kodning eng yuqori, tashqi qavatidir. Undagi ma'lumotlar local (funksiya yoki blok) scopelar uchun ochiq hisoblanadi."
    },
    {
      id: 2,
      question: "Brauzer muhitida global doirada `var` yordamida yaratilgan o'zgaruvchi qaysi global obyektning xususiyatiga (property) aylanadi?",
      options: [
        "`document`",
        "`window` (masalan: `var x = 5` yaratilsa, unga `window.x` orqali murojaat qilish mumkin)",
        "`console`",
        "`globalThis` faqat Node.js-da"
      ],
      correctAnswer: 1,
      explanation: "Brauzerlarda global ob'ekt `window` hisoblanadi. Global doiradagi har qanday `var` o'zgaruvchisi avtomatik tarzda `window` obyektining xususiyatiga aylanadi."
    },
    {
      id: 3,
      question: "Global doirada `let` yoki `const` yordamida yaratilgan o'zgaruvchilarning `var` dan eng katta farqi nimada?",
      options: [
        "Ular global doiradan ko'rinmaydi",
        "Ular brauzerning global `window` obyektiga xususiyat bo'lib qo'shilmaydi",
        "Ularning qiymatini o'zgartirib bo'lmaydi",
        "Ular xotirani band qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` global doirada e'lon qilinsa ham, uklar xavfsizlik va yangi standart qoidalariga ko'ra `window` obyektiga xususiyat sifatida biriktirilmaydi."
    },
    {
      id: 4,
      question: "Nima uchun JavaScript-da global doiradagi o'zgaruvchilardan imkon qadar kamroq foydalanish tavsiya etiladi?",
      options: [
        "Chunki global o'zgaruvchilar dasturni sekinlashtiradi",
        "Chunki turli fayllarda yoki kutubxonalarda bir xil nomli o'zgaruvchilar bir-birining qiymatini kutilmaganda o'zgartirib yuborishi (global pollution/ifloslanish) mumkin",
        "Ular hech qachon xotiradan o'chmaydi",
        "To'g'ri javob: ham global ifloslanish xavfi, ham ular dastur ishlayotgan vaqt davomida xotirada saqlanib qolishi sababli"
      ],
      correctAnswer: 3,
      explanation: "Global o'zgaruvchilar butun dastur faoliyati davomida xotirani egallab turadi hamda koddagi nomlar to'qnashuvi xavfini (name collision) sezilarli darajada oshiradi."
    },
    {
      id: 5,
      question: "Brauzerda ham, Node.js-da ham universal tarzda global obyektga murojaat qilish uchun ES2020 standartida qaysi kalit so'z kiritildi?",
      options: [
        "`window`",
        "`global`",
        "`globalThis`",
        "`root`"
      ],
      correctAnswer: 2,
      explanation: "`globalThis` kalit so'zi JavaScript ishlaydigan istalgan muhitda (brauzerda `window`, Node.js-da `global`) global obyektga murojaat qilishning yagona standart usulidir."
    },
    {
      id: 6,
      question: "Agar global doirada `const API = 'https://site.com'` yozsak va uni funksiya ichida o'zgartirmoqchi bo'lsak nima yuz beradi?\n```javascript\nconst API = 'https://site.com';\nfunction update() {\n  API = 'https://new.com';\n}\nupdate();\n```",
      options: ["API o'zgaradi", "TypeError (Assignment to constant variable)", "SyntaxError", "Hech narsa sodir bo'lmaydi"],
      correctAnswer: 1,
      explanation: "`const` bilan e'lon qilingan global o'zgaruvchilarni dasturning hech qaysi qismida (globalda ham, localda ham) qayta qiymatlab bo'lmaydi. TypeError yuz beradi."
    },
    {
      id: 7,
      question: "Quyidagi kod ishga tushganda nima chiqadi?\n```javascript\nlet x = 'global';\nfunction show() {\n  let x = 'local';\n  console.log(x);\n}\nshow();\n```",
      options: ["\"global\"", "\"local\"", "undefined", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Shadowing qoidasiga ko'ra, funksiya ichida yaratilgan local `let x` tashqi global `x` ni to'sib qo'yadi. Shuning uchun local `x` qiymati ya'ni `local` chop etiladi."
    },
    {
      id: 8,
      question: "Node.js muhitida eng tashqi global obyekt nima deb ataladi?",
      options: ["`window`", "`global`", "`document`", "`root`"],
      correctAnswer: 1,
      explanation: "Brauzerda global obyekt `window` bo'lsa, Node.js muhitida u `global` deb nomlanadi."
    },
    {
      id: 9,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nvar globalVal = 100;\nconsole.log('globalVal' in globalThis);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 0,
      explanation: "Global doiradagi `var` bilan e'lon qilingan o'zgaruvchilar global obyekt (`globalThis` / `window`) xususiyatiga aylanadi. Shuning uchun `'globalVal' in globalThis` ifodasi `true` beradi."
    },
    {
      id: 10,
      question: "ES Modules (import/export) ishlatilganda, eng tashqarida e'lon qilingan o'zgaruvchi global scope-ga o'tadimi?",
      options: ["Ha, avtomatik ravishda global bo'ladi", "Yo'q, u faqat o'sha modul (fayl) ichida lokal bo'ladi (Module Scope)", "Faqat var ishlatilganda global bo'ladi", "Faqat window obyektiga yozilganda modul bo'ladi"],
      correctAnswer: 1,
      explanation: "ES Modullarda yozilgan kod o'zining shaxsiy module scope-ga ega bo'ladi. Tashqarida yozilgan o'zgaruvchilar global scope-ni ifloslantirmaydi."
    },
    {
      id: 11,
      question: "JavaScript-da e'lon qilingan global o'zgaruvchilar qachon xotiradan o'chiriladi?",
      options: ["Funksiya bajarilib bo'lingach", "Hech qachon o'chirilmaydi, faqat sahifa yangilanganda yoki dastur yopilganda o'chadi", "Garbage collector ularni har 5 daqiqada o'chirib turadi", "Browser tabini kichraytirganda"],
      correctAnswer: 1,
      explanation: "Global o'zgaruvchilar butun dastur (sessiya) davomida xotirada saqlanib turadi. Shu sababli ulardan ko'p foydalanish xotirani ortiqcha band qiladi."
    },
    {
      id: 12,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nlet a = 10;\nfunction test() {\n  a = 20;\n}\ntest();\nconsole.log(a);\n```",
      options: ["10", "20", "undefined", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Funksiya ichidagi `a = 20` qatori tashqaridagi global `let a` o'zgaruvchisining qiymatini to'g'ridan-to'g'ri o'zgartiradi (chunki funksiya ichida yangi o'zgaruvchi e'lon qilinmagan). Natija `20` chiqadi."
    }
  ]
};
