export const bomAndWindow = {
  id: "bomAndWindow",
  title: "BOM (Browser Object Model) va Window API",
  theory: `
## Part 1: Beginner Analogy
Tasavvur qiling, veb-sahifa (DOM) - bu televizor ekranidagi ko'rsatuv. Televizorning o'zi, uning sozlamalari, ovoz balandligi, kanallarni o'zgartirish pulti (orqaga, oldinga) va qurilma haqidagi ma'lumotlar - bu BOM (Browser Object Model). Window esa butun televizor obyekti.

Siz televizor ekranidagi aktyorlarni (DOM elementlarini) boshqarishingiz mumkin, lekin pult (BOM) orqali kanalni almashtirishingiz (boshqa URL ga o'tish), ovozni baland qilish (ekran o'lchamlarini o'zgartirish) yoki televizor modelini (navigator) ko'rishingiz ham mumkin.

## Part 2: Deep Dive

### 1. BOM Ierarxiyasi
BOM (Browser Object Model) dagi barcha obyektlar \\\`window\\\` obyektiga bog'langan.
\\\`\\\`\\\`mermaid
graph TD
A[window] --> B[document DOM]
A --> C[location]
A --> D[history]
A --> E[navigator]
A --> F[screen]
A --> G[frames]
\\\`\\\`\\\`

### 2. Global Execution Context va window
Brauzerda global execution context (GEC) \\\`window\\\` obyektiga tenglashtiriladi. 
Agar biz \\\`var\\\` bilan o'zgaruvchi e'lon qilsak, u avtomatik tarzda \\\`window\\\` obyektiga ulanadi. Ammo \\\`let\\\` va \\\`const\\\` bilan bunday bo'lmaydi.

\\\`\\\`\\\`javascript
var a = 10;
let b = 20;

console.log(window.a); // 10
console.log(window.b); // undefined
\\\`\\\`\\\`

### 3. Iframe va postMessage Kommunikatsiyasi
Boshqa domen yoki xuddi shu domendagi iframe bilan xavfsiz muloqot qilish uchun \\\`window.postMessage\\\` ishlatiladi.

\\\`\\\`\\\`javascript
// Ma'lumot yuborish
window.parent.postMessage("Salom", "https://example.com");

// Ma'lumotni qabul qilish
window.addEventListener("message", (event) => {
  if (event.origin !== "https://example.com") return;
  console.log(event.data);
});
\\\`\\\`\\\`

## Part 3: Edge Cases va Senior Interview Questions

**Savol: \\\`window\\\` va \\\`globalThis\\\` o'rtasidagi farq nima?**
**Javob:** \\\`window\\\` faqat brauzer muhitida mavjud bo'lgan global obyektdir. Agar xuddi shu kod Node.js da ishlatilsa, \\\`window\\\` xatolik beradi (chunki u yerda \\\`global\\\` ishlatiladi). \\\`globalThis\\\` esa muhitdan qat'iy nazar (brauzer, Node.js, Web Worker) global obyektni to'g'ri aniqlaydigan universal standartdir.

**Savol: \\\`location.href\\\` va \\\`history.pushState()\\\` o'rtasidagi farq nima?**
**Javob:** \\\`location.href = "..."\\\` deb qiymat berilsa, brauzer yangi sahifani to'liq yuklaydi (page reload). \\\`history.pushState()\\\` esa URL ni o'zgartiradi, lekin sahifani qayta yuklamaydi. SPA (Single Page Application - React, Vue, Angular) larda marshrutlash aynan \\\`pushState\\\` orqali ishlaydi.

**Savol: Nega \\\`alert\\\`, \\\`prompt\\\` va \\\`confirm\\\` lardan foydalanish tavsiya etilmaydi?**
**Javob:** Ular sinxron bloklovchi funksiyalar hisoblanadi. Ular chaqirilganda JavaScript ning ishlashi (execution thread) foydalanuvchi javob bermaguncha to'liq to'xtab qoladi va sahifa qotib qolgandek ko'rinadi. Zamonaviy dasturlarda buning o'rniga asinxron custom modal (HTML/CSS) oynalar ishlatiladi.
`,
  exercises: [
    {
      id: "bom-1",
      title: "Joriy manzilni olish",
      description: "Funksiya yozing. U joriy sahifaning to'liq URL manzilini qaytarishi kerak.",
      initialCode: "function getCurrentUrl() {\n  return '';\n}",
      solution: "function getCurrentUrl() {\n  return window.location.href;\n}",
      tests: [
        {
          test: "const url = getCurrentUrl();\nreturn url === window.location.href;",
          description: "Joriy URL manzilini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-2",
      title: "Brauzer tili",
      description: "Funksiya foydalanuvchining brauzer tilini (masalan, 'uz-UZ' yoki 'en-US') qaytarishi kerak.",
      initialCode: "function getBrowserLanguage() {\n  return '';\n}",
      solution: "function getBrowserLanguage() {\n  return navigator.language;\n}",
      tests: [
        {
          test: "const lang = getBrowserLanguage();\nreturn lang === navigator.language;",
          description: "Brauzer tilini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-3",
      title: "Ekran o'lchamlari",
      description: "Funksiya obyekt qaytarishi kerak, unda joriy ekranning (monitor) kengligi 'width' va balandligi 'height' bo'lishi kerak.",
      initialCode: "function getScreenResolution() {\n  return {\n    width: 0,\n    height: 0\n  };\n}",
      solution: "function getScreenResolution() {\n  return { width: window.screen.width, height: window.screen.height };\n}",
      tests: [
        {
          test: "const res = getScreenResolution();\nreturn res.width === window.screen.width && res.height === window.screen.height;",
          description: "Ekran kengligi va balandligini to'g'ri obyektdan qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-4",
      title: "Onlayn holatini tekshirish",
      description: "Funksiya foydalanuvchi internetga ulanganligini (true) yoki oflayn (false) ekanligini bildiruvchi mantiqiy qiymat qaytarishi kerak.",
      initialCode: "function isUserOnline() {\n  return false;\n}",
      solution: "function isUserOnline() {\n  return navigator.onLine;\n}",
      tests: [
        {
          test: "const status = isUserOnline();\nreturn status === navigator.onLine;",
          description: "Onlayn holatini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-5",
      title: "Oyna o'lchamlari",
      description: "Funksiya obyekt qaytarishi kerak, unda joriy brauzer oynasining (viewport) kengligi 'width' va balandligi 'height' bo'lishi kerak.",
      initialCode: "function getWindowDimensions() {\n  return {\n    width: 0,\n    height: 0\n  };\n}",
      solution: "function getWindowDimensions() {\n  return { width: window.innerWidth, height: window.innerHeight };\n}",
      tests: [
        {
          test: "const dim = getWindowDimensions();\nreturn dim.width === window.innerWidth && dim.height === window.innerHeight;",
          description: "Brauzer oynasi o'lchamlarini (viewport) to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-6",
      title: "Domen nomi (Hostname)",
      description: "Funksiya joriy sahifaning domen nomini qaytarishi kerak.",
      initialCode: "function getHostname() {\n  return '';\n}",
      solution: "function getHostname() {\n  return window.location.hostname;\n}",
      tests: [
        {
          test: "const host = getHostname();\nreturn host === window.location.hostname;",
          description: "Domen nomini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-7",
      title: "Platforma haqida",
      description: "Funksiya foydalanuvchining platformasini (OS/arxitektura) ko'rsatadigan xususiyatni qaytarishi kerak.",
      initialCode: "function getPlatform() {\n  return '';\n}",
      solution: "function getPlatform() {\n  return navigator.platform;\n}",
      tests: [
        {
          test: "const plat = getPlatform();\nreturn plat === navigator.platform;",
          description: "Platformani to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-8",
      title: "Tarix uzunligi",
      description: "Funksiya joriy brauzer tarixidagi (history) yozuvlar sonini qaytarishi kerak.",
      initialCode: "function getHistoryLength() {\n  return 0;\n}",
      solution: "function getHistoryLength() {\n  return window.history.length;\n}",
      tests: [
        {
          test: "const len = getHistoryLength();\nreturn len === window.history.length;",
          description: "Tarix uzunligini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-9",
      title: "Foydalanuvchi brauzeri (User Agent)",
      description: "Funksiya foydalanuvchining brauzer user-agent qatorini qaytarishi kerak.",
      initialCode: "function getUserAgent() {\n  return '';\n}",
      solution: "function getUserAgent() {\n  return navigator.userAgent;\n}",
      tests: [
        {
          test: "const ua = getUserAgent();\nreturn ua === navigator.userAgent;",
          description: "User Agent ma'lumotlarini to'g'ri qaytarishi kerak"
        }
      ]
    },
    {
      id: "bom-10",
      title: "URL qidiruv parametrlari",
      description: "Funksiya joriy URL ning qidiruv parametrlarini (search / query string) qaytarishi kerak (masalan, '?id=123').",
      initialCode: "function getSearchQuery() {\n  return '';\n}",
      solution: "function getSearchQuery() {\n  return window.location.search;\n}",
      tests: [
        {
          test: "const search = getSearchQuery();\nreturn search === window.location.search;",
          description: "Search (qidiruv qatorini) to'g'ri qaytarishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "bom-q1",
      question: "BOM qanday ma'noni anglatadi?",
      options: [
        "Browser Object Model",
        "Basic Object Method",
        "Browser Output Model",
        "Base Option Method"
      ],
      correctAnswer: "Browser Object Model",
      explanation: "BOM (Browser Object Model) brauzer bilan ishlash imkonini beruvchi obyektlar to'plamidir."
    },
    {
      id: "bom-q2",
      question: "Javascriptda qaysi global obyekt butun brauzer oynasini ifodalaydi?",
      options: [
        "document",
        "window",
        "navigator",
        "screen"
      ],
      correctAnswer: "window",
      explanation: "window obyekti JavaScript'ning eng yuqori obyekti hisoblanadi va butun brauzer oynasini o'z ichiga oladi."
    },
    {
      id: "bom-q3",
      question: "Joriy URL manzilini qanday olish mumkin?",
      options: [
        "window.document.href",
        "window.url.href",
        "window.location.href",
        "window.location.url"
      ],
      correctAnswer: "window.location.href",
      explanation: "window.location.href orqali joriy sahifaning to'liq manzilini olish yoki o'zgartirish mumkin."
    },
    {
      id: "bom-q4",
      question: "Foydalanuvchi qaysi brauzerdan yoki qanday qurilmadan kirganini qaysi obyekt yordamida aniqlaymiz?",
      options: [
        "window.history",
        "window.navigator",
        "window.location",
        "window.screen"
      ],
      correctAnswer: "window.navigator",
      explanation: "window.navigator obyekti brauzer nomi, tili, onlayn holati va OT kabi ma'lumotlarni o'z ichiga oladi."
    },
    {
      id: "bom-q5",
      question: "Sahifani qayta yuklash (refresh) uchun qaysi metod ishlatiladi?",
      options: [
        "window.location.refresh()",
        "window.location.reload()",
        "window.history.reload()",
        "window.refresh()"
      ],
      correctAnswer: "window.location.reload()",
      explanation: "location.reload() orqali joriy sahifani qayta yuklash (F5 bosgandek) bajariladi."
    },
    {
      id: "bom-q6",
      question: "Tarixda orqaga qaytish uchun nima ishlatiladi?",
      options: [
        "window.history.back()",
        "window.history.previous()",
        "window.location.back()",
        "window.navigator.back()"
      ],
      correctAnswer: "window.history.back()",
      explanation: "window.history.back() brauzerning back (orqaga) tugmasi bilan bir xil ish bajaradi."
    },
    {
      id: "bom-q7",
      question: "Global Execution Context da e'lon qilingan qaysi o'zgaruvchi window obyektiga avtomatik ulanadi?",
      options: [
        "var bilan e'lon qilingan",
        "let bilan e'lon qilingan",
        "const bilan e'lon qilingan",
        "Barcha o'zgaruvchilar"
      ],
      correctAnswer: "var bilan e'lon qilingan",
      explanation: "Faqatgina var orqali global e'lon qilingan o'zgaruvchilar (yoki funksiyalar) window obyektining a'zosiga aylanadi."
    },
    {
      id: "bom-q8",
      question: "Boshqa frame yoki oyna (window) bilan xavfsiz muloqot qilish uchun qanday metod ishlatiladi?",
      options: [
        "window.sendMessage()",
        "window.postMessage()",
        "window.transmit()",
        "window.communicate()"
      ],
      correctAnswer: "window.postMessage()",
      explanation: "Cross-origin muloqoti uchun xavfsiz usul sifatida window.postMessage ishlatiladi."
    },
    {
      id: "bom-q9",
      question: "window.screen.width va window.innerWidth orasidagi farq nima?",
      options: [
        "Farqi yo'q, ikkisi bir xil qiymat qaytaradi",
        "screen.width butun monitor kengligi, innerWidth brauzer oynasining joriy ko'rinish qismi",
        "innerWidth butun monitor kengligi, screen.width brauzer oynasi",
        "innerWidth - ichki HTML o'lchami, screen.width - CSS o'lchami"
      ],
      correctAnswer: "screen.width butun monitor kengligi, innerWidth brauzer oynasining joriy ko'rinish qismi",
      explanation: "screen (monitor) butunlay boshqa tushuncha bo'lib, uning qiymati brauzerni kichraytirganda o'zgarmaydi."
    },
    {
      id: "bom-q10",
      question: "SPA (Single Page Application) larda sahifani to'liq yuklamasdan URL manzilini qanday o'zgartirish mumkin?",
      options: [
        "window.location.href orqali",
        "window.history.pushState() orqali",
        "window.location.assign() orqali",
        "window.navigator.redirect() orqali"
      ],
      correctAnswer: "window.history.pushState() orqali",
      explanation: "history.pushState() URLni yangilaydi lekin sahifani qayta serverdan so'ramaydi (reload qilmaydi)."
    },
    {
      id: "bom-q11",
      question: "Muloqot oynalari: alert(), prompt() va confirm() haqida qaysi fikr to'g'ri?",
      options: [
        "Ular asinxron ishlaydi va sahifani qotirib qo'ymaydi",
        "Ular sinxron ishlaydi va foydalanuvchi javob bermaguncha JS ishlashini bloklaydi",
        "Ular faqat xatoliklarni chiqarish uchun ishlatiladi",
        "Ularni hamma zamonaviy proyektlarda doimiy qo'llash tavsiya etiladi"
      ],
      correctAnswer: "Ular sinxron ishlaydi va foydalanuvchi javob bermaguncha JS ishlashini bloklaydi",
      explanation: "Shuning uchun ular zamonaviy amaliyotlarda u qadar ko'p qo'llanilmaydi va odatiy HTML/CSS modallarga almashtiriladi."
    },
    {
      id: "bom-q12",
      question: "Muhitdan (brauzer yoki Node.js) qat'iy nazar har doim global obyektni qaytaruvchi yangi standart xususiyat nima?",
      options: [
        "global",
        "window",
        "globalThis",
        "self"
      ],
      correctAnswer: "globalThis",
      explanation: "globalThis ES2020 standartida kiritilgan bo'lib, har qanday JS muhitida asosiy global obyektga ishora qiladi."
    }
  ]
};
