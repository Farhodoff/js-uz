export default {
  id: "movie-search-api",
  title: "API orqali Kinolarni Qidirish Loyihasi",
  theory: `
API (Application Programming Interface) — bu dasturlarning o'zaro ma'lumot almashishini va hamkorlik qilishini ta'minlovchi interfeysdir. Zamonaviy veb-dasturlashda API asosan frontend (mijoz) va backend (server) o'rtasida ko'prik vazifasini bajaradi.

### Frontend va Backend aloqasi (Mijoz-Server tsikli)
Veb-ilovalar asosan Mijoz-Server modelida ishlaydi:
1. **Mijoz (Client / Brauzer)**: Foydalanuvchi ma'lumot kiritadi va tugmani bosganda serverga so'rov yuboradi.
2. **Server**: So'rovni qabul qiladi, ma'lumotlar bazasidan kerakli ma'lumotni oladi va mijozga qaytaradi.

Quyidagi ketma-ketlik diagrammasida mijoz va server o'rtasidagi so'rov va javob aylanishi tasvirlangan:

\`\`\`mermaid
sequenceDiagram
    Mijoz->>Server: HTTP request (API so'rov: GET /movie?title=Inception)
    Note right of Server: Server ma'lumotlar bazasini qidiradi
    Server-->>Mijoz: HTTP response (API javob: 200 OK + JSON film ma'lumoti)
\`\`\`

### HTTP So'rovlari va Javoblari (HTTP Requests & Responses)
HTTP protokoli orqali mijoz va server muloqot qiladi:
- **HTTP request (So'rov)**: O'z ichiga so'rov metodi (GET, POST va boshqalar), URL manzili, HTTP Headers (sarlavhalar) va so'rov tanasini (Body) oladi.
- **HTTP response (Javob)**: O'z ichiga javob status kodi (Status Code), sarlavhalar va javob tanasini (Body, odatda JSON formatida) oladi.

### HTTP Sarlavhalari (HTTP Headers)
Sarlavhalar so'rov yoki javob haqida qo'shimcha ma'lumot beradi. Masalan:
- \`Content-Type: application/json\` - yuborilayotgan ma'lumot formati JSON ekanligini bildiradi.
- \`Authorization: Bearer <token>\` - foydalanuvchining shaxsini tasdiqlash uchun xizmat qiladi.

### HTTP Status kodlari (HTTP Status Codes)
Serverdan qaytadigan javob holatini bildiradi:
- \`200 OK\` — so'rov muvaffaqiyatli bajarildi.
- \`201 Created\` — yangi resurs muvaffaqiyatli yaratildi.
- \`400 Bad Request\` — mijoz tomonidan noto'g'ri so'rov yuborildi.
- \`401 Unauthorized\` — foydalanuvchi tizimga kirmagan yoki ruxsatsiz.
- \`404 Not Found\` — so'ralgan ma'lumot topilmadi.
- \`500 Internal Server Error\` — serverda ichki kutilmagan xato yuz berdi.

### Fetch API
Brauzerda asinxron HTTP so'rovlarini yuborish uchun standart \`fetch()\` funksiyasidan foydalaniladi. U Promise qaytaradi.
Misol:
\`\`\`javascript
fetch("https://api.example.com/movies?title=Inception")
  .then(response => {
    if (!response.ok) {
      throw new Error("Tarmoq xatosi: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Xatolik:", error));
\`\`\`

### async/await va try/catch
Asinxron so'rovlarni yanada tushunarli va sinxron kod kabi yozish uchun \`async\` va \`await\` kalit so'zlaridan foydalanamiz. Xatoliklarni qayta ishlash uchun esa \`try/catch\` ishlatiladi.
Misol:
\`\`\`javascript
async function getMovie(title) {
  try {
    const response = await fetch(\`https://api.example.com/movies?title=\${encodeURIComponent(title)}\`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(\`Xatolik yuz berdi, status kodi: \${response.status}\`);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Film topishda xatolik:", error.message);
    throw error;
  }
}
\`\`\`
`,
  exercises: `
// Film ma'lumotlar bazasi (mock database)
const movieDatabase = {
  "inception": {
    "Title": "Inception",
    "Year": "2010",
    "Director": "Christopher Nolan",
    "imdbRating": "8.8",
    "Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.O.",
    "Response": "True"
  },
  "avatar": {
    "Title": "Avatar",
    "Year": "2009",
    "Director": "James Cameron",
    "imdbRating": "7.9",
    "Plot": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "Response": "True"
  },
  "interstellar": {
    "Title": "Interstellar",
    "Year": "2014",
    "Director": "Christopher Nolan",
    "imdbRating": "8.7",
    "Plot": "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    "Response": "True"
  },
  "the matrix": {
    "Title": "The Matrix",
    "Year": "1999",
    "Director": "Lana Wachowski, Lilly Wachowski",
    "imdbRating": "8.7",
    "Plot": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    "Response": "True"
  }
};

/**
 * mockFetchMovie - Serverga so'rov yuborishni simulyatsiya qiluvchi asinxron funksiya.
 * Latency (kechikish) vaqtini setTimeout yordamida simulyatsiya qiladi.
 * @param {string} title - Qidirilayotgan film nomi
 * @returns {Promise<Object>} Film ma'lumotlari
 */
function mockFetchMovie(title) {
  return new Promise((resolve, reject) => {
    // 1. Film nomi kiritilgani va string ekanligini tekshiramiz
    if (typeof title !== 'string') {
      return reject(new Error("Film nomi kiritilmadi yoki noto'g'ri."));
    }

    // 2. Bo'shliqlarni olib tashlaymiz
    const cleanedTitle = title.trim().toLowerCase();

    if (!cleanedTitle) {
      return reject(new Error("Film nomi bo'sh bo'lishi mumkin emas."));
    }

    // 3. 200ms dan 3000ms gacha bo'lgan tasodifiy kechikish vaqti
    const delay = Math.floor(Math.random() * (3000 - 200 + 1)) + 200;

    // 4. Server kechikishini simulyatsiya qilamiz
    setTimeout(() => {
      const movie = movieDatabase[cleanedTitle];
      if (movie) {
        // Film topilsa, Promise'ni resolve (muvaffaqiyatli) qilamiz
        resolve(movie);
      } else {
        // Topilmasa, xatolik bilan reject (rad) qilamiz
        reject(new Error("Film topilmadi: " + title));
      }
    }, delay);
  });
}

// ==========================================
// MOCK FETCH MOVIE FUNKSIYASINI async/await ORQALI CHAQIRISH TUSHUNTIRILISHI:
//
// mockFetchMovie asinxron funksiya (Promise qaytaradi) bo'lganligi sababli, biz uni
// async/await yordamida quyidagicha chaqirishimiz mumkin:
//
// async function searchMovieDemo(title) {
//   try {
//     console.log("Qidirilmoqda...");
//     // mockFetchMovie funksiyasining yakunlanishini kutamiz (await)
//     const movie = await mockFetchMovie(title);
//     console.log("Film muvaffaqiyatli topildi!");
//     console.log("Nomi:", movie.Title);
//     console.log("Rejissori:", movie.Director);
//     console.log("Reytingi:", movie.imdbRating);
//     return movie;
//   } catch (error) {
//     // Agar film topilmasa yoki boshqa xato bo'lsa, catch bloki ishga tushadi
//     console.error("Xatolik yuz berdi:", error.message);
//   }
// }
// ==========================================
`,
  quizzes: [
    {
      question: "API nima va u qanday vazifani bajaradi?",
      options: [
        "Dasturlar va tizimlar o'rtasida ma'lumot almashishni ta'minlovchi interfeys.",
        "Ma'lumotlar bazasini xavfsiz saqlash uchun maxsus server.",
        "Faqat foydalanuvchi interfeysini loyihalash uchun ishlatiladigan dastur.",
        "Kompyuterning operatsion tizimi va uning drayverlari."
      ],
      answerIndex: 0
    },
    {
      question: "Mijoz (Client) va Server o'rtasidagi muloqotda so'rov turini (masalan, ma'lumot olish yoki yuborishni) nima belgilaydi?",
      options: [
        "HTTP Headers (Sarlavhalar)",
        "HTTP Method (GET, POST va h.k.)",
        "HTTP Status Code",
        "HTTP Response Body"
      ],
      answerIndex: 1
    },
    {
      question: "Tarmoq so'rovi yuborilganda '404 Not Found' status kodi nimani anglatadi?",
      options: [
        "So'rov muvaffaqiyatli bajarildi va ma'lumot qaytarildi.",
        "Serverda kutilmagan ichki xato yuz berdi.",
        "So'ralgan resurs yoki sahifa serverdan topilmadi.",
        "Mijozda ruxsat yo'q (tizimga kirmagan)."
      ],
      answerIndex: 2
    },
    {
      question: "HTTP so'rovida yuborilayotgan ma'lumot turini (masalan, JSON ekanligini) ko'rsatish uchun qaysi sarlavha (header) ishlatiladi?",
      options: [
        "Authorization",
        "Accept-Language",
        "Content-Type: application/json",
        "User-Agent"
      ],
      answerIndex: 2
    },
    {
      question: "JavaScript'da fetch() funksiyasi qaytaradigan Promise natijasini asinxron kutish va sinxron kod ko'rinishida yozish uchun qaysi konstruktsiyadan foydalaniladi?",
      options: [
        "setTimeout va setInterval",
        "async/await va try/catch",
        "then() va catch() zanjiri",
        "resolve() va reject() funksiyalari"
      ],
      answerIndex: 1
    }
  ]
};
