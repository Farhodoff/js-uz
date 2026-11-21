export const movieSearchApi = {
  id: "movie-search-api",
  title: "API orqali Kinolarni Qidirish Loyihasi",
  theory: `
API (Application Programming Interface) — bu xuddi restorandagi ofitsiantga o'xshaydi.

### 1-Qism: Sodda Tushuntirish
Tasavvur qiling, siz restorandasiz (Mijoz / Brauzer). Siz taomnoma asosida ovqat buyurtma qilasiz (So'rov / Request). Oshxonada oshpazlar (Server va Ma'lumotlar bazasi) ovqatni tayyorlashadi. Lekin siz o'zingiz oshxonaga kirib ovqat pishirolmaysiz. Sizga ofitsiant (API) yordam beradi. Siz ofitsiantga buyurtmani aytasiz, u oshxonaga olib boradi, tayyor ovqatni (Javob / Response) sizga keltirib beradi. Film qidirish APIsi ham xuddi shunday: siz film nomini berasiz, API uni serverdan qidirib, topilgan ma'lumotlarni sizning brauzeringizga olib keladi.

### 2-Qism: Chuqur Tahlil
Katta hajmdagi ma'lumotlar bazasida (masalan, IMDB) qidiruv jarayoni qanday kechadi?
- **Inverted Index**: Qidiruv tez bo'lishi uchun, server har bir so'z qaysi filmlarda uchrashini ko'rsatadigan "Inverted Index" (Teskari indeks) tuzib chiqadi. Bu xuddi kitob oxiridagi indeksga o'xshaydi. "Matrix" so'zi so'ralsa, butun bazani qidirish o'rniga, indeksdan to'g'ridan-to'g'ri o'sha kinolar ro'yxati olinadi.
- **Search Algorithms**: Kiritilgan so'zda xatolar bo'lsa (masalan, "matirx"), Levenshtein distance kabi algoritmlar "Fuzzy Search" orqali eng yaqin to'g'ri so'zni topadi.
- **Redis Caching**: Tez-tez so'raladigan filmlar (masalan, "Avatar") har safar bazadan qidirilmasligi uchun xotirada (Redis) vaqtinchalik saqlanadi. Bu javob vaqtini millisoniyalargacha qisqartiradi.
- **Pagination strategies**: Agar so'rov natijasida 1000 ta film topilsa, ularning barchasi bir vaqtda qaytarilmaydi. Tarmoqni ortiqcha yuklamaslik uchun limit (offset/limit yoki cursor-based pagination) qo'llaniladi.

### 3-Qism: Chekka holatlar va Senior Intervyu Savollari
- **Measuring API latency**: API qanchalik tez ishlashini o'lchash kerak. Buni "Time to First Byte" (TTFB) kabi metrikalar orqali o'lchaymiz.
- **Optimizing search queries**: Foydalanuvchi har bir harfni kiritganda API ga so'rov yuborilmasligi uchun "Debouncing" va "Throttling" usullaridan foydalaniladi (masalan, so'nggi harf kiritilgandan 300ms o'tgach so'rov ketadi).
- **Rate Limiting (429 Too Many Requests)**: Bitta IP manzildan qisqa vaqt ichida juda ko'p so'rov yuborilsa, API server himoya tizimini ishga tushirib, 429 status kodini qaytaradi.

### Tizim Arxitekturasi
\`\`\`mermaid
sequenceDiagram
    participant C as Brauzer (Mijoz)
    participant A as API Gateway
    participant R as Redis Cache
    participant DB as Database
    
    C->>A: GET /search?q=Matrix
    A->>R: Keshda bormi?
    alt Keshda bor
        R-->>A: Film ma'lumotlari
    else Keshda yo'q
        R-->>A: Yo'q
        A->>DB: Inverted Index bo'yicha qidirish
        DB-->>A: Film ma'lumotlari
        A->>R: Keshga saqlash
    end
    A-->>C: 200 OK (JSON)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Mock so'rov yaratish",
      instruction: "`mockFetchMovie(title)` funksiyasini `Promise` bilan yozing. 500 ms dan keyin `{ title, year: 2020 }` qaytarsin.",
      startingCode: "function mockFetchMovie(title) {\n  // Promise yaratib, natijani qaytaring\n}\n",
      hint: "return new Promise((resolve) => setTimeout(() => resolve({ title, year: 2020 }), 500));",
      test: "if (!code.includes('Promise')) return 'Promise yaratish kerak';\nif (!code.includes('resolve')) return 'Natijani resolve orqali qaytaring';"
    },
    {
      id: 2,
      title: "Debounce funksiyasi",
      instruction: "`debounce(fn, delay)` yozing: har chaqiruvda eski taymerni tozalab, yangisini o'rnating.",
      startingCode: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    // kodingizni yozing\n  };\n}\n",
      hint: "clearTimeout(timer); timer = setTimeout(() => fn(...args), delay);",
      test: "if (!code.includes('clearTimeout')) return 'Eski taymerni clearTimeout bilan tozalang';\nif (!code.includes('setTimeout')) return 'Yangi taymerni setTimeout bilan o\\'rnating';"
    },
    {
      id: 3,
      title: "Async/await bilan so'rov",
      instruction: "`getMovieInfo(title)` ni async/await va try/catch bilan yozing. Xatolik konsolga chiqarilsin.",
      startingCode: "async function getMovieInfo(title) {\n  // try/catch ichida await bilan natijani oling\n}\n",
      hint: "try { const data = await mockFetchMovie(title); return data; } catch (e) { console.error(e); }",
      test: "if (!code.includes('async') || !code.includes('await')) return 'async funksiya ichida await ishlating';\nif (!code.includes('catch')) return 'Xatolikni ushlash uchun catch qo\\'shing';"
    },
    {
      id: 4,
      title: "Bir nechta filmni qidirish",
      instruction: "`getMultipleMovies(titles)` da barcha so'rovlarni `Promise.all` bilan parallel bajaring.",
      startingCode: "async function getMultipleMovies(titles) {\n  // titles ni so'rovlarga aylantirib, Promise.all qaytaring\n}\n",
      hint: "const promises = titles.map(mockFetchMovie); return Promise.all(promises);",
      test: "if (!code.includes('Promise.all')) return 'Promise.all ishlating';\nif (!code.includes('.map')) return 'So\\'rovlarni .map bilan hosil qiling';"
    },
    {
      id: 5,
      title: "Kechikishni o'lchash",
      instruction: "`measureLatency(title)` da so'rov oldidan va keyin `performance.now()` olib, farqni qaytaring.",
      startingCode: "async function measureLatency(title) {\n  // boshlang'ich va oxirgi vaqtni olib, farqni qaytaring\n}\n",
      hint: "const start = performance.now(); await mockFetchMovie(title); return performance.now() - start;",
      test: "if (!code.includes('performance.now()')) return 'Vaqtni performance.now() bilan o\\'lchang';\nif (!code.includes('await')) return 'So\\'rovni await bilan kuting';"
    },
    {
      id: 6,
      title: "Maxsus xato klassi",
      instruction: "`APIError` klassini `Error` dan meros olib, `status` xususiyatini saqlaydigan qiling.",
      startingCode: "class APIError extends Error {\n  constructor(message, status) {\n    // kodingizni yozing\n  }\n}\n",
      hint: "super(message); this.status = status;",
      test: "if (!code.includes('extends Error')) return 'Klass Error dan meros olishi kerak';\nif (!code.includes('this.status')) return 'status xususiyatini saqlang';"
    },
    {
      id: 7,
      title: "Natijalarni keshda saqlash",
      instruction: "`fetchWithCache(title)` da avval keshni tekshiring. Bor bo'lsa keshdan, yo'q bo'lsa so'rovdan qaytaring.",
      startingCode: "const cache = {};\nasync function fetchWithCache(title) {\n  // kodingizni yozing\n}\n",
      hint: "if (cache[title]) return cache[title]; const res = await mockFetchMovie(title); cache[title] = res; return res;",
      test: "if (!code.includes('cache[')) return 'Keshga murojaat qiling';\nif (!code.includes('await')) return 'Keshda yo\\'q bo\\'lsa, so\\'rovni await bilan bajaring';"
    },
    {
      id: 8,
      title: "Qidiruv tarixi",
      instruction: "`addToHistory(title)` funksiyasida `Set` ga yangi nom qo'shing.",
      startingCode: "const searchHistory = new Set();\nfunction addToHistory(title) {\n  // kodingizni yozing\n}\n",
      hint: "searchHistory.add(title);",
      test: "if (!code.includes('new Set')) return 'Tarix uchun Set yarating';\nif (!code.includes('.add(')) return 'Nomni .add() bilan qo\\'shing';"
    },
    {
      id: 9,
      title: "Pagination",
      instruction: "`paginate(array, limit, offset)` funksiyasida `slice` bilan kerakli qismni qaytaring.",
      startingCode: "function paginate(array, limit, offset) {\n  // slice bilan qismni oling\n}\n",
      hint: "return array.slice(offset, offset + limit);",
      test: "if (!code.includes('.slice(')) return 'Massiv qismini .slice() bilan oling';"
    },
    {
      id: 10,
      title: "Xavfsiz qidiruv",
      instruction: "`sanitizeInput(input)` da regex bilan faqat harflar, raqamlar va bo'shliq qoldiring.",
      startingCode: "function sanitizeInput(input) {\n  // regex bilan keraksiz belgilarni olib tashlang\n}\n",
      hint: "return input.replace(/[^a-zA-Z0-9 ]/g, '');",
      test: "if (!code.includes('.replace(')) return 'Belgilarni .replace() bilan olib tashlang';\nif (!code.includes('[^a-zA-Z0-9 ]')) return 'Faqat harflar, raqamlar va bo\\'shliqqa ruxsat beruvchi regex ishlating';"
    }
  ],
  quizzes: [
    {
      question: "API nima?",
      options: ["Application Programming Interface", "Advanced Program Interface", "Application Process Integration", "Automated Program Internet"],
      answerIndex: 0
    },
    {
      question: "Inverted Index qanday maqsadlarda ishlatiladi?",
      options: ["Ma'lumotlar bazasida qidiruvni tezlashtirish uchun", "Fayllarni siqish uchun", "Parollarni shifrlash uchun", "CSS stillarini optimallashtirish uchun"],
      answerIndex: 0
    },
    {
      question: "Redis Caching nima uchun kerak?",
      options: ["Ma'lumotlar bazasiga ulanish uchun", "Javob vaqtini qisqartirish uchun ma'lumotlarni xotirada saqlash", "Xavfsizlikni kuchaytirish uchun", "Foydalanuvchi parolini tekshirish uchun"],
      answerIndex: 1
    },
    {
      question: "Debouncing nima?",
      options: ["Qidiruv tugmasini bezash", "So'nggi harakatdan keyin ma'lum vaqt o'tgachgina funksiyani bajarish", "Tarmoq tezligini oshirish", "Xatoliklarni yashirish"],
      answerIndex: 1
    },
    {
      question: "429 Too Many Requests status kodi nimani anglatadi?",
      options: ["Sahifa topilmadi", "Server xatosi", "Ruxsat yo'q", "Mijoz juda ko'p so'rov yuborganini"],
      answerIndex: 3
    },
    {
      question: "Time to First Byte (TTFB) nima?",
      options: ["So'rov va serverning birinchi bayt javobi orasidagi vaqt", "HTML faylning to'liq yuklanishi", "Barcha rasmlar ochilishi uchun ketadigan vaqt", "JavaScript bajarilish vaqti"],
      answerIndex: 0
    },
    {
      question: "Pagination nima maqsadda ishlatiladi?",
      options: ["Matnni rangli qilish uchun", "Katta ma'lumotlarni qismlarga bo'lib, sahifalab yuklash uchun", "Rasm o'lchamini kichraytirish uchun", "Keshni tozalash uchun"],
      answerIndex: 1
    },
    {
      question: "Fuzzy Search qaysi algoritm asosida ishlashi mumkin?",
      options: ["Levenshtein distance", "Dijkstra algorithm", "Bubble sort", "Binary search"],
      answerIndex: 0
    },
    {
      question: "Promise qanday uch holatda bo'lishi mumkin?",
      options: ["Start, Running, End", "Pending, Fulfilled, Rejected", "Loading, Success, Error", "Wait, Resolve, Catch"],
      answerIndex: 1
    },
    {
      question: "async/await qaysi maqsadda ishlatiladi?",
      options: ["HTML render qilish", "Asinxron kodni sinxron kabi o'qishli yozish", "Kod hajmini oshirish", "Tarmoq uzilishini oldini olish"],
      answerIndex: 1
    },
    {
      question: "fetch() funksiyasi qanday turdagi qiymat qaytaradi?",
      options: ["Number", "String", "Promise", "Boolean"],
      answerIndex: 2
    },
    {
      question: "Agar tarmoq xatosi bo'lmasa, lekin sahifa topilmasa (404), fetch() dagi promise qanday holatda bo'ladi?",
      options: ["Rejected", "Pending", "Fulfilled (Resolved)", "To'xtab qoladi"],
      answerIndex: 2
    }
  ]
};
