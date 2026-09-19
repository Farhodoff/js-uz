export const clipboardApi = {
  id: "clipboardApi",
  title: "Clipboard API: Nusxalash va Joylash",
  theory: `
### Part 1: Beginner Analogy

Tasavvur qiling, sizning bir "Sehrli Xalta"ngiz (Clipboard) bor. 
Siz biror matn yoki rasmni ko'rganingizda, uni shu xaltaga solib qo'yishingiz mumkin (Nusxalash - Copy).
Keyinroq, boshqa bir joyga borib, xaltadagi narsani chiqarib, o'sha joyga qoldirishingiz mumkin (Joylash - Paste).

Eski zamonlarda bu xaltaga narsa solish va olish biroz noqulay va xavfli edi (buni \\\`document.execCommand\\\` deb atashardi). Saytlar sizning ruxsatingizsiz ham xaltangizga qo'l tiqishi mumkin edi.
Hozirgi zamonda esa, "Zamonaviy Sehrli Xalta" (Async Clipboard API) mavjud. U faqat xavfsiz joylarda (HTTPS) ishlaydi va ba'zida narsa olishdan oldin sizdan ruxsat so'raydi (Permissions).

### Part 2: Deep Dive (Under the hood)

#### Eski yondashuv: \\\`document.execCommand('copy')\\\`
Ilgari nusxalash va joylash amallari \\\`document.execCommand('copy')\\\` va \\\`document.execCommand('paste')\\\` orqali amalga oshirilardi. 
Bu sinxron (qotib qoluvchi) API bo'lib, faqat tanlangan (selected) DOM elementlari bilangina ishlar edi. Hozirgi kunda bu usul **deprecate** (eskirgan) qilingan va undan foydalanish tavsiya etilmaydi.

#### Yangi yondashuv: Async Clipboard API
Zamonaviy brauzerlar \\\`navigator.clipboard\\\` obyekti orqali Asinxron Clipboard API ni taqdim etadi. Bu API Promise qaytaradi, ya'ni brauzerning asosiy oqimini (main thread) bloklamaydi.

Asosiy metodlar:
1. \\\`writeText(text)\\\` - Matnni clipboardga yozish.
2. \\\`readText()\\\` - Clipboarddagi matnni o'qish (faqat ruxsat berilsa).
3. \\\`write(data)\\\` - Matn, rasm yoki boshqa turdagi ma'lumotlarni (Blob) \\\`ClipboardItem\\\` orqali yozish.
4. \\\`read()\\\` - Clipboarddagi har xil turdagi ma'lumotlarni o'qish.

\\\`\\\`\\\`javascript
// Matn nusxalash
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Nusxa olindi!');
  } catch (err) {
    console.error('Xatolik:', err);
  }
}
\\\`\\\`\\\`

#### Permissions va Security (Xavfsizlik)
Clipboard API juda kuchli, chunki u foydalanuvchining shaxsiy ma'lumotlariga (parollar, shaxsiy yozishmalar) kirish huquqiga ega bo'lishi mumkin. Shuning uchun:
- U faqat **Secure Context** larda (HTTPS yoki localhost) ishlaydi.
- \\\`readText()\\\` va \\\`read()\\\` chaqirilganda, brauzer odatda foydalanuvchiga ruxsat so'rovini (Permission Prompt) ko'rsatadi.
- \\\`writeText()\\\` va \\\`write()\\\` odatda foydalanuvchining harakati (masalan, tugmani bosish - click hodisasi) bilan boshlangan taqdirdagina ishlaydi.

### Part 3: Edge Cases and Senior Interview Questions

**Edge Cases:**
1. **Fokus yo'qolishi:** Agar sahifa fokusni yo'qotsa (masalan, boshqa tabga o'tib ketsangiz), Clipboard API xato (DOMException) qaytarishi mumkin.
2. **Katta hajmdagi ma'lumotlar:** Katta rasmlarni \\\`write()\\\` yordamida clipboardga yozish jarayoni biroz vaqt olishi va xotiraga yuk berishi mumkin.
3. **Brauzerlar mosligi:** Barcha brauzerlar ham Clipboard API ning barcha funksiyalarini to'liq qo'llab-quvvatlamaydi (ayniqsa \\\`read()\\\` va \\\`write()\\\` metodlarini).

**Senior Interview Questions:**
- *Savol:* Nega \\\`document.execCommand('copy')\\\` eskirgan deb e'lon qilingan?
  *Javob:* Chunki u sinxron ishlaydi, asosiy oqimni (main thread) band qiladi, faqat DOM orqali tanlangan (selected) matnlar bilangina cheklangan, va uning xavfsizlik modeli zamonaviy talablarga javob bermaydi.
- *Savol:* \\\`navigator.clipboard.readText()\\\` qachon \\\`NotAllowedError\\\` qaytaradi?
  *Javob:* Foydalanuvchi clipboarddan o'qishga ruxsat bermaganida yoki sahifa HTTPS da bo'lmaganida (yoki sahifa aktiv - focused bo'lmaganda).
- *Savol:* Rasm yoki murakkab HTML fayllarni clipboardga qanday yozamiz?
  *Javob:* \\\`ClipboardItem\\\` va \\\`navigator.clipboard.write()\\\` metodidan foydalanib. Ma'lumotlarni avval Blob obyektiga o'tkazish kerak.

### Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[Foydalanuvchi Click qiladi] --> B{navigator.clipboard.writeText}
    B -- Muvaffaqiyatli --> C[Matn xotiraga yozildi]
    B -- Xatolik --> D[Xatolikni ushlash - catch]
    
    E[Sayt matnni o'qimoqchi] --> F{navigator.clipboard.readText}
    F -- Ruxsat so'raladi --> G{Foydalanuvchi ruxsat berdimi?}
    G -- Ha --> H[Matn qaytariladi]
    G -- Yo'q --> I[NotAllowedError]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "clipboard-1",
      title: "Oddiy Matn Nusxalash",
      description: "Berilgan `text` ni `navigator.clipboard.writeText` orqali clipboardga yozuvchi asinxron funksiya yozing.",
      initialCode: "async function copyMyText(text) {\n  \n}",
      solution: "async function copyMyText(text) {\n  await navigator.clipboard.writeText(text);\n}",
      tests: [
        {
          test: "let copiedText = '';\nglobalThis.navigator = { clipboard: { writeText: (t) => { copiedText = t; return Promise.resolve(); } } };\nreturn copyMyText('salom').then(() => copiedText === 'salom');",
          description: "`navigator.clipboard.writeText` to'g'ri matn bilan chaqirilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-2",
      title: "Matnni O'qish",
      description: "Clipboarddagi matnni o'qib, uni qaytaruvchi asinxron funksiya yozing.",
      initialCode: "async function readMyText() {\n  \n}",
      solution: "async function readMyText() {\n  return await navigator.clipboard.readText();\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('qale') } };\nreturn readMyText().then(res => res === 'qale');",
          description: "`navigator.clipboard.readText` chaqirilishi va uning natijasi qaytarilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-3",
      title: "Xavfsiz Nusxalash",
      description: "`text` ni clipboardga nusxalang. Agar muvaffaqiyatli bo'lsa `true`, xatolik yuz bersa `false` qaytaring (try/catch ishlating).",
      initialCode: "async function copySafely(text) {\n  \n}",
      solution: "async function copySafely(text) {\n  try {\n    await navigator.clipboard.writeText(text);\n    return true;\n  } catch(e) {\n    return false;\n  }\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { writeText: () => Promise.resolve() } };\nreturn copySafely('a').then(res => res === true);",
          description: "Muvaffaqiyatli holatda true qaytishi kerak"
        },
        {
          test: "globalThis.navigator = { clipboard: { writeText: () => Promise.reject(new Error('err')) } };\nreturn copySafely('a').then(res => res === false);",
          description: "Xatolik holatida false qaytishi kerak"
        }
      ]
    },
    {
      id: "clipboard-4",
      title: "Clipboard Uzunligi",
      description: "Clipboarddagi matnni o'qing va uning uzunligini (length) qaytaring. Agar xatolik bo'lsa 0 qaytaring.",
      initialCode: "async function getClipboardLength() {\n  \n}",
      solution: "async function getClipboardLength() {\n  try {\n    const text = await navigator.clipboard.readText();\n    return text.length;\n  } catch(e) {\n    return 0;\n  }\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('12345') } };\nreturn getClipboardLength().then(res => res === 5);",
          description: "Matn uzunligi to'g'ri qaytarilishi kerak"
        },
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.reject(new Error('err')) } };\nreturn getClipboardLength().then(res => res === 0);",
          description: "Xatolik holatida 0 qaytarilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-5",
      title: "JSON obyektni nusxalash",
      description: "Berilgan JS obyektini JSON stringga o'tkazib (JSON.stringify), clipboardga yozing.",
      initialCode: "async function copyJSON(obj) {\n  \n}",
      solution: "async function copyJSON(obj) {\n  const str = JSON.stringify(obj);\n  await navigator.clipboard.writeText(str);\n}",
      tests: [
        {
          test: "let val = '';\nglobalThis.navigator = { clipboard: { writeText: (t) => { val = t; return Promise.resolve(); } } };\nreturn copyJSON({a: 1}).then(() => val === '{\"a\":1}');",
          description: "Obyekt stringify qilinib yozilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-6",
      title: "JSON o'qish va parse qilish",
      description: "Clipboarddan matnni o'qing va JS obyektiga aylantirib (JSON.parse) qaytaring. Xatolik bo'lsa `null` qaytaring.",
      initialCode: "async function readAndParseJSON() {\n  \n}",
      solution: "async function readAndParseJSON() {\n  try {\n    const text = await navigator.clipboard.readText();\n    return JSON.parse(text);\n  } catch(e) {\n    return null;\n  }\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('{\"b\":2}') } };\nreturn readAndParseJSON().then(res => res && res.b === 2);",
          description: "JSON matn to'g'ri parse qilinishi kerak"
        },
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('not json') } };\nreturn readAndParseJSON().then(res => res === null);",
          description: "Parse xatosi bo'lsa null qaytishi kerak"
        }
      ]
    },
    {
      id: "clipboard-7",
      title: "Katta harflarda nusxalash",
      description: "Berilgan `text` ni barcha harflarini kattalashtirib (toUpperCase), keyin clipboardga yozing.",
      initialCode: "async function copyUppercase(text) {\n  \n}",
      solution: "async function copyUppercase(text) {\n  await navigator.clipboard.writeText(text.toUpperCase());\n}",
      tests: [
        {
          test: "let val = '';\nglobalThis.navigator = { clipboard: { writeText: (t) => { val = t; return Promise.resolve(); } } };\nreturn copyUppercase('hello').then(() => val === 'HELLO');",
          description: "Matn katta harflarga o'zgarib yozilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-8",
      title: "Qo'shimcha so'z bilan nusxalash",
      description: "Berilgan `text` ga `appendStr` ni qo'shib, hosil bo'lgan matnni clipboardga yozing.",
      initialCode: "async function appendAndCopy(text, appendStr) {\n  \n}",
      solution: "async function appendAndCopy(text, appendStr) {\n  await navigator.clipboard.writeText(text + appendStr);\n}",
      tests: [
        {
          test: "let val = '';\nglobalThis.navigator = { clipboard: { writeText: (t) => { val = t; return Promise.resolve(); } } };\nreturn appendAndCopy('salom', ' dunyo').then(() => val === 'salom dunyo');",
          description: "Ikki matn birlashib yozilishi kerak"
        }
      ]
    },
    {
      id: "clipboard-9",
      title: "Bo'shliqlarni tozalab o'qish",
      description: "Clipboarddagi matnni o'qing, uning boshidagi va oxiridagi bo'shliqlarni olib tashlab (trim) qaytaring.",
      initialCode: "async function readAndTrim() {\n  \n}",
      solution: "async function readAndTrim() {\n  const text = await navigator.clipboard.readText();\n  return text.trim();\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('  bo\\'shliq  ') } };\nreturn readAndTrim().then(res => res === 'bo\\'shliq');",
          description: "Matn chetidagi bo'shliqlar olib tashlanishi kerak"
        }
      ]
    },
    {
      id: "clipboard-10",
      title: "Clipboard bo'shligini tekshirish",
      description: "Agar clipboard dagi matn bo'sh string `\"\"` bo'lsa `true`, aks holda `false` qaytaring. Xatolik bo'lsa ham `false` qaytaring.",
      initialCode: "async function isClipboardEmpty() {\n  \n}",
      solution: "async function isClipboardEmpty() {\n  try {\n    const text = await navigator.clipboard.readText();\n    return text === '';\n  } catch(e) {\n    return false;\n  }\n}",
      tests: [
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('') } };\nreturn isClipboardEmpty().then(res => res === true);",
          description: "Bo'sh matn bo'lsa true qaytarishi kerak"
        },
        {
          test: "globalThis.navigator = { clipboard: { readText: () => Promise.resolve('nimadir') } };\nreturn isClipboardEmpty().then(res => res === false);",
          description: "Bo'sh matn bo'lmasa false qaytarishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "quiz-1",
      question: "Clipboard API qanday ishlaydi?",
      options: [
        "Asinxron (Promise qaytaradi)",
        "Sinxron",
        "Faqat Callback orqali",
        "Umuman ishlamaydi"
      ],
      answer: "Asinxron (Promise qaytaradi)",
      explanation: "Zamonaviy Clipboard API asosiy oqimni band qilmaslik uchun Asinxron ishlaydi va Promise qaytaradi."
    },
    {
      id: "quiz-2",
      question: "Matnni xotiraga nusxalash uchun qaysi metod ishlatiladi?",
      options: [
        "navigator.clipboard.writeText()",
        "navigator.clipboard.copy()",
        "document.execCommand('copy')",
        "clipboard.set()"
      ],
      answer: "navigator.clipboard.writeText()",
      explanation: "Matnni xotiraga yozish uchun navigator.clipboard.writeText() ishlatiladi."
    },
    {
      id: "quiz-3",
      question: "Xotiradagi matnni o'qish uchun qaysi metod ishlatiladi?",
      options: [
        "navigator.clipboard.readText()",
        "navigator.clipboard.getText()",
        "clipboard.read()",
        "window.getClipboard()"
      ],
      answer: "navigator.clipboard.readText()",
      explanation: "Xotiradan matn o'qish uchun navigator.clipboard.readText() ishlatiladi."
    },
    {
      id: "quiz-4",
      question: "Clipboard API qaysi protokollarda ishlaydi?",
      options: [
        "Faqat HTTPS va localhost da",
        "Barcha protokollarda (HTTP va HTTPS)",
        "Faqat HTTP da",
        "Faqat fayl tizimida (file://)"
      ],
      answer: "Faqat HTTPS va localhost da",
      explanation: "Xavfsizlik nuqtai nazaridan (Secure Context) u faqat HTTPS va localhost muhitlarida ishlaydi."
    },
    {
      id: "quiz-5",
      question: "Nima uchun document.execCommand('copy') eskirgan hisoblanadi?",
      options: [
        "Sinxron bo'lgani va xavfsizlik modeli yaxshi emasligi uchun",
        "Juda sekin ishlagani uchun",
        "Matnni noto'g'ri nusxalagani uchun",
        "Hech qanday brauzerda ishlamagani uchun"
      ],
      answer: "Sinxron bo'lgani va xavfsizlik modeli yaxshi emasligi uchun",
      explanation: "document.execCommand sinxron bo'lgani uchun brauzerni qotirib qo'yishi mumkin va ruxsatsiz ishlash imkoniyatlari xavfli."
    },
    {
      id: "quiz-6",
      question: "Rasm kabi murakkab ma'lumotlarni clipboardga yozish uchun qaysi obyektdan foydalaniladi?",
      options: [
        "ClipboardItem",
        "ImageItem",
        "BlobItem",
        "ClipboardData"
      ],
      answer: "ClipboardItem",
      explanation: "Rasmlar yoki HTML kabi turli xil ma'lumotlarni yozishda ClipboardItem'dan foydalaniladi."
    },
    {
      id: "quiz-7",
      question: "navigator.clipboard.readText() chaqirilganda foydalanuvchiga nima ko'rsatilishi mumkin?",
      options: [
        "Ruxsat so'rovchi oyna (Permission Prompt)",
        "Xatolik xabari",
        "Reklama",
        "Hech narsa"
      ],
      answer: "Ruxsat so'rovchi oyna (Permission Prompt)",
      explanation: "Brauzer foydalanuvchi xotirasiga ruxsatsiz kirmaslik uchun Permission Prompt ko'rsatadi."
    },
    {
      id: "quiz-8",
      question: "writeText() va readText() metodlari qanday ma'lumot turini (data type) qaytaradi?",
      options: [
        "Promise",
        "String",
        "Boolean",
        "Undefined"
      ],
      answer: "Promise",
      explanation: "Bu metodlar asinxron bo'lgani uchun har doim Promise qaytaradi."
    },
    {
      id: "quiz-9",
      question: "Agar sahifa fokusni yo'qotgan bo'lsa, Clipboard API qanday xato qaytaradi?",
      options: [
        "NotAllowedError (yoki DOMException)",
        "TypeError",
        "ReferenceError",
        "SyntaxError"
      ],
      answer: "NotAllowedError (yoki DOMException)",
      explanation: "Sahifa aktiv (focused) bo'lmaganda xavfsizlik sababli NotAllowedError (DOMException) qaytadi."
    },
    {
      id: "quiz-10",
      question: "readText() xatosini qanday ushlash mumkin?",
      options: [
        "try...catch bloki orqali",
        "if...else orqali",
        "faqat .then() orqali",
        "Xatoni ushlab bo'lmaydi"
      ],
      answer: "try...catch bloki orqali",
      explanation: "Async/await funksiyalarda xatoliklarni try...catch orqali xavfsiz ushlash mumkin."
    },
    {
      id: "quiz-11",
      question: "Ruxsat berilmaganda readText() nima qiladi?",
      options: [
        "Promise reject bo'ladi va xato tashlaydi",
        "Bo'sh string qaytaradi",
        "Null qaytaradi",
        "Brauzer yopilib qoladi"
      ],
      answer: "Promise reject bo'ladi va xato tashlaydi",
      explanation: "Ruxsat etilmasa, metod Promise'ni reject qiladi va xatolik tashlanadi."
    },
    {
      id: "quiz-12",
      question: "Clipboard API ni ishlatishdan oldin brauzer uni qo'llab-quvvatlashini qanday tekshirish mumkin?",
      options: [
        "if (navigator.clipboard) orqali",
        "if (window.clipboard) orqali",
        "if (document.clipboard) orqali",
        "if (typeof Clipboard !== 'undefined') orqali"
      ],
      answer: "if (navigator.clipboard) orqali",
      explanation: "navigator.clipboard obyekti mavjudligini tekshirish eng ishonchli usuldir."
    }
  ]
};
