export const movieSearchApi = {
  id: "movie-search-api",
  title: "API orqali Kinolarni Qidirish Loyihasi",
  theory: `
API (Application Programming Interface) — bu xuddi restorandagi ofitsiantga o'xshaydi.

### Part 1: Beginner Analogy
Tasavvur qiling, siz restorandasiz (Mijoz / Brauzer). Siz taomnoma asosida ovqat buyurtma qilasiz (So'rov / Request). Oshxonada oshpazlar (Server va Ma'lumotlar bazasi) ovqatni tayyorlashadi. Lekin siz o'zingiz oshxonaga kirib ovqat pishirolmaysiz. Sizga ofitsiant (API) yordam beradi. Siz ofitsiantga buyurtmani aytasiz, u oshxonaga olib boradi, tayyor ovqatni (Javob / Response) sizga keltirib beradi. Film qidirish APIsi ham xuddi shunday: siz film nomini berasiz, API uni serverdan qidirib, topilgan ma'lumotlarni sizning brauzeringizga olib keladi.

### Part 2: Deep Dive (Under the Hood)
Katta hajmdagi ma'lumotlar bazasida (masalan, IMDB) qidiruv jarayoni qanday kechadi?
- **Inverted Index**: Qidiruv tez bo'lishi uchun, server har bir so'z qaysi filmlarda uchrashini ko'rsatadigan "Inverted Index" (Teskari indeks) tuzib chiqadi. Bu xuddi kitob oxiridagi indeksga o'xshaydi. "Matrix" so'zi so'ralsa, butun bazani qidirish o'rniga, indeksdan to'g'ridan-to'g'ri o'sha kinolar ro'yxati olinadi.
- **Search Algorithms**: Kiritilgan so'zda xatolar bo'lsa (masalan, "matirx"), Levenshtein distance kabi algoritmlar "Fuzzy Search" orqali eng yaqin to'g'ri so'zni topadi.
- **Redis Caching**: Tez-tez so'raladigan filmlar (masalan, "Avatar") har safar bazadan qidirilmasligi uchun xotirada (Redis) vaqtinchalik saqlanadi. Bu javob vaqtini millisoniyalargacha qisqartiradi.
- **Pagination strategies**: Agar so'rov natijasida 1000 ta film topilsa, ularning barchasi bir vaqtda qaytarilmaydi. Tarmoqni ortiqcha yuklamaslik uchun limit (offset/limit yoki cursor-based pagination) qo'llaniladi.

### Part 3: Edge Cases and Senior Interview Questions
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
  exercises: `
// Exercise 1: Asosiy mockFetchMovie funksiyasi
function mockFetchMovie(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ title, year: 2020 }), 500);
  });
}

// Exercise 2: Debounce funksiyasini yozing
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Exercise 3: API so'rovini async/await bilan yozing
async function getMovieInfo(title) {
  try {
    const data = await mockFetchMovie(title);
    return data;
  } catch(e) {
    console.error(e);
  }
}

// Exercise 4: Promise.all orqali bir nechta filmni qidiring
async function getMultipleMovies(titles) {
  const promises = titles.map(mockFetchMovie);
  return Promise.all(promises);
}

// Exercise 5: Kechikishni hisoblash (Latency)
async function measureLatency(title) {
  const start = performance.now();
  await mockFetchMovie(title);
  const end = performance.now();
  return end - start;
}

// Exercise 6: Xatolikni maxsus class orqali boshqarish
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Exercise 7: Cache tizimi (Memoization)
const cache = {};
async function fetchWithCache(title) {
  if (cache[title]) return cache[title];
  const res = await mockFetchMovie(title);
  cache[title] = res;
  return res;
}

// Exercise 8: Qidiruv tarixini saqlash
const searchHistory = new Set();
function addToHistory(title) {
  searchHistory.add(title);
}

// Exercise 9: Pagination simulyatsiyasi (offset, limit)
function paginate(array, limit, offset) {
  return array.slice(offset, offset + limit);
}

// Exercise 10: Xavfsiz qidiruv (Sanitize input)
function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9 ]/g, "");
}
`,
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
