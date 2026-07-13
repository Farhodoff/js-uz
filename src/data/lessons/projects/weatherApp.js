export const weatherApp = {
  id: "p2",
  title: "Ob-havo ilovasi (Mini-loyiha)",
  theory: `## Ob-havo ilovasi

Bu loyihada biz Fetch API orqali tashqi API bilan ishlashni o'rganamiz.

### Qism 1: Boshlang'ich Analogiya
Tasavvur qiling, ob-havo haqida ma'lumot olish pitssa buyurtma qilishga o'xshaydi:
- **Siz (Ilova)** pitsseriyaga qong'iroq qilasiz (API ga request jo'natish).
- Go'shak orqali qaysi pitssani xohlashingizni aytasiz (Shaharning nomini berasiz, masalan, "Toshkent").
- **Pitsseriya (API serveri)** buyurtmani qabul qiladi, pishiradi va qutiga joylab sizga jo'natadi (JSON formatidagi javob).
- Siz qutini ochasiz va pitssani yeysiz (JSON ni \\\`res.json()\\\` bilan ochib, ma'lumotlarni ekranda ko'rsatasiz).

### Qism 2: Chuqur tahlil (Deep Dive)
Dastur orqasida (Under the hood) ma'lumot olish (Fetch) qanday amalga oshadi?

1. **DNS Resolution**: \\\`fetch('https://api.openweathermap.org/...')\\\` ishlaganda, brauzer avval DNS serveriga murojaat qilib, ushbu domen nomini IP manzilga o'giradi.
2. **TCP Handshake (Uch tomonlama kelishuv)**: Mijoz va server o'rtasida ma'lumot almashish uchun ishonchli aloqa o'rnatiladi (SYN, SYN-ACK, ACK).
3. **HTTPS / TLS**: Xavfsizlik uchun SSL/TLS handshake orqali trafik shifrlanadi.
4. **CORS (Cross-Origin Resource Sharing)**: Brauzerlar xavfsizlik nuqtai nazaridan boshqa domenlarga so'rov yuborishni cheklaydi. API server bunga ruxsat berish uchun \\\`Access-Control-Allow-Origin: *\\\` sarlavhasini qaytarishi shart.
5. **HTTP Caching**: Ba'zan brauzer ob-havo so'rovini keshlashi (saqlab qolishi) mumkin, buni nazorat qilish uchun biz URL ga tasodifiy son qo'shishimiz yoki server \\\`Cache-Control\\\` sozlamalarini berishi mumkin.

### Qism 3: Chekka holatlar (Edge Cases) va Senior Intervyu savollari

Senior dasturchilar Fetch bilan ishlashda qanday narsalarga e'tibor berishadi?

1. **Debouncing API calls**: 
Foydalanuvchi "Toshkent" deb yozayotganida, har bitta harf bosilganda so'rov yubormaslik uchun **debounce** funksiyasidan foydalaniladi (masalan, 500ms kutib, keyin yuborish).

2. **Retry mechanisms (Qayta urinish)**: 
Tarmoq bilan muammo bo'lganda so'rov darhol bekor bo'lishi o'rniga, exponensial ravishda kutib (1s, 2s, 4s) qayta urinib ko'rish.

3. **Xatolarni to'g'ri boshqarish**: 
\\\`fetch()\\\` 404 (Topilmadi) yoki 500 (Server xatosi) bo'lganda ham **Promise resolve** bo'ladi (reject bo'lmaydi!). Shuning uchun har doim \\\`if (!res.ok) throw new Error()\\\` ni tekshirish shart.

### Vizual sxema
\\\`\\\`\\\`mermaid
sequenceDiagram
    participant F as Foydalanuvchi
    participant I as Ilova
    participant DNS as DNS Server
    participant A as API Server

    F->>I: Shahar nomini kiritadi (masalan, Toshkent)
    I->>I: Debounce (500ms kutish)
    I->>DNS: api.openweathermap.org IP sini sorash
    DNS-->>I: 192.0.2.1
    I->>A: HTTP GET /weather?q=Toshkent
    A-->>I: 200 OK (JSON malumot)
    I->>F: Ob-havoni ekranda korsatish
    
    opt Xato holati (Masalan 404)
        A-->>I: 404 Not Found
        I-->>F: Shahar topilmadi xatosini korsatish
    end
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Fetch API asoslari",
      instruction: "Berilgan URL dan foydalanib 'fetch' orqali ma'lumot oling va konsolga chiqaring.",
      startingCode: "const URL = 'https://jsonplaceholder.typicode.com/posts/1';\n\n// fetch ishlatib ma'lumot oling\n",
      hint: "fetch(URL).then(res => res.json()).then(data => console.log(data))",
      test: "if (!code.includes('fetch')) return 'fetch() funksiyasidan foydalaning';"
    },
    {
      id: 2,
      title: "Async/Await bilan ishlash",
      instruction: "Xuddi shu URL dan foydalanib, so'rovni async/await yordamida yozing.",
      startingCode: "async function getData() {\n  const URL = 'https://jsonplaceholder.typicode.com/posts/1';\n  // yozing...\n}\ngetData();",
      hint: "const res = await fetch(URL); const data = await res.json(); console.log(data);",
      test: "if (!code.includes('await')) return 'await kalit so\\'zini ishlating';"
    },
    {
      id: 3,
      title: "JSON ga o'girish",
      instruction: "Fetch orqali kelgan ma'lumot qanday qilib JavaScript obyektiga aylantirilishini ko'rsating.",
      startingCode: "fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(res => {\n    // shu yerda JSON ga o'giring\n  })\n  .then(console.log);",
      hint: "res.json() metodidan foydalaning",
      test: "if (!code.includes('json()')) return 'res.json() metodidan foydalaning';"
    },
    {
      id: 4,
      title: "Try/Catch orqali xatolarni boshqarish",
      instruction: "Async funksiya ichida xatolarni ushlash uchun try/catch blokidan foydalaning.",
      startingCode: "async function getData() {\n  const URL = 'https://invalid-url-uz.com';\n  // try/catch yozing\n}",
      hint: "try { ... } catch(err) { console.log(err) }",
      test: "if (!code.includes('catch')) return 'try/catch blokidan foydalaning';"
    },
    {
      id: 5,
      title: "HTTP 404 ni tekshirish (res.ok)",
      instruction: "Fetch qiling va res.ok xususiyatini tekshiring, agar false bo'lsa xato tashlang.",
      startingCode: "fetch('https://jsonplaceholder.typicode.com/posts/9999')\n  .then(res => {\n    // agar res.ok false bo'lsa, xato tashlang\n  })",
      hint: "if (!res.ok) throw new Error('Xato');",
      test: "if (!code.includes('res.ok')) return 'res.ok xususiyatini tekshiring';"
    },
    {
      id: 6,
      title: "Debounce mexanizmi (Qisman)",
      instruction: "setTimeout orqali 500ms dan keyingina xabarni konsolga chiqaradigan funksiya yarating.",
      startingCode: "function debounce() {\n  // 500ms dan so'ng 'ishladi' so'zini chiqaring\n}",
      hint: "setTimeout(() => console.log('ishladi'), 500);",
      test: "if (!code.includes('setTimeout')) return 'setTimeout funksiyasidan foydalaning';"
    },
    {
      id: 7,
      title: "Qidiruv parametrlarini qo'shish (URLSearchParams)",
      instruction: "URLSearchParams orqali 'q=Toshkent' parametrini URL ga qo'shing.",
      startingCode: "const url = new URL('https://api.weather.com/v1/');\n// searchParams ni qo'shing\nconsole.log(url.toString());",
      hint: "url.searchParams.append('q', 'Toshkent');",
      test: "if (!code.includes('searchParams')) return 'searchParams xususiyatini ishlating';"
    },
    {
      id: 8,
      title: "So'rovni bekor qilish (AbortController)",
      instruction: "AbortController yordamida fetch so'roviga signal uzating.",
      startingCode: "const controller = new AbortController();\nconst URL = 'https://jsonplaceholder.typicode.com/posts';\n// fetch(URL, { ... }) ga signal bering",
      hint: "fetch(URL, { signal: controller.signal })",
      test: "if (!code.includes('signal')) return 'signal variantini fetchga bering';"
    },
    {
      id: 9,
      title: "Parallel so'rovlar (Promise.all)",
      instruction: "Promise.all orqali ikkita URL dan ma'lumotni parallel ravishda tortib oling.",
      startingCode: "const url1 = 'https://jsonplaceholder.typicode.com/posts/1';\nconst url2 = 'https://jsonplaceholder.typicode.com/posts/2';\n// Promise.all ishlating\n",
      hint: "Promise.all([fetch(url1), fetch(url2)])",
      test: "if (!code.includes('Promise.all')) return 'Promise.all metodini ishlating';"
    },
    {
      id: 10,
      title: "Dastlabki yuklanish animatsiyasi (Loading state)",
      instruction: "Ma'lumot kelgunga qadar isloading o'zgaruvchisini true qiling va nihoyasida (finally) false qiling.",
      startingCode: "let isLoading = false;\n// promise zanjirida finally ishlating",
      hint: ".finally(() => isLoading = false)",
      test: "if (!code.includes('finally')) return 'finally blokidan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Fetch funksiyasi nima qaytaradi?",
      options: [
        "Promise obyektini",
        "JSON stringini",
        "Oddiy arrayni",
        "Undefined qaytaradi"
      ],
      correctAnswer: 0,
      explanation: "Fetch har doim Promise qaytaradi. Vaqt o'tishi bilan u Response obyektiga resolve bo'ladi."
    },
    {
      id: 2,
      question: "Server xato bersa (masalan 404 yoki 500) Fetch qanday yo'l tutadi?",
      options: [
        "Catch bloki avtomatik ishga tushadi",
        "Promise resolve bo'ladi, lekin res.ok false bo'ladi",
        "Dastur darhol ishdan to'xtaydi",
        "Xatoni brauzer qabul qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Fetch faqatgina internet (network) xatosi bo'lgandagina reject (catch) qiladi. Boshqa HTTP xatolarda Promise baribir resolve bo'ladi."
    },
    {
      id: 3,
      question: "Fetch yordamida kelgan ma'lumotni JSON formatga o'tkazish uchun qaysi metod kerak?",
      options: [
        "JSON.parse()",
        "res.text()",
        "res.json()",
        "Object.keys()"
      ],
      correctAnswer: 2,
      explanation: "Fetch API da Response obyekti bilan ishlovchi maxsus res.json() metodi mavjud bo'lib, u asinxron tarzda JSON parse qiladi."
    },
    {
      id: 4,
      question: "CORS (Cross-Origin Resource Sharing) nima maqsadda ishlatiladi?",
      options: [
        "Turli domenlar o'rtasida ma'lumot almashish xavfsizligini nazorat qilish uchun",
        "CSS fayllarni keshlash uchun",
        "Malumotlar bazasini himoyalash uchun",
        "Brauzer tarixini o'chirish uchun"
      ],
      correctAnswer: 0,
      explanation: "CORS ruxsatsiz veb-saytlarga sizning API'ngizdan ma'lumot olishiga to'sqinlik qiluvchi himoya tizimidir."
    },
    {
      id: 5,
      question: "Debouncing API so'rovlarida nima uchun muhim?",
      options: [
        "So'rovlarni tezroq yuborish uchun",
        "Keraksiz API so'rovlarni kamaytirish (masalan har harf bosilganda jo'natmaslik) uchun",
        "Ma'lumotlar bazasiga qo'shish uchun",
        "Faqatgina GET so'rovlari uchun kerak"
      ],
      correctAnswer: 1,
      explanation: "Debounce bir xil so'rovlarning ortiqcha yuborilishini oldini olib, API ga ortiqcha yuk tushishidan saqlaydi."
    },
    {
      id: 6,
      question: "Internet uzilib qolsa (network failure), fetch() qanday harakat qiladi?",
      options: [
        "res.ok false bo'ladi",
        "200 OK qaytaradi",
        "Promise reject bo'ladi (catch ishlaydi)",
        "Cheksiz kutish rejimiga tushadi"
      ],
      correctAnswer: 2,
      explanation: "Agar foydalanuvchining interneti uzilsa yoki server DNS topilmasa, fetch o'z xatosini catch blokiga yuboradi (reject)."
    },
    {
      id: 7,
      question: "Async/await nima afzallik beradi?",
      options: [
        "Brauzerni sekinlashtiradi",
        "Kodni xotirada joy egallamasdan ishlatadi",
        "Asinxron kodlarni sinxron ko'rinishda yozish orqali tushunishni osonlashtiradi",
        "API so'rovsiz ishlashini ta'minlaydi"
      ],
      correctAnswer: 2,
      explanation: "Async/await Promise'lar bilan ishlashda .then() larni zanjiriga qaraganda ancha toza (clean) sintaksis beradi."
    },
    {
      id: 8,
      question: "Fetch so'rovini ortga qaytarish (bekor qilish) uchun nima ishlatamiz?",
      options: [
        "AbortController",
        "clearTimeout",
        "clearInterval",
        "window.close()"
      ],
      correctAnswer: 0,
      explanation: "AbortController orqali davom etayotgan fetch so'rovini abort() yordamida to'xtatish mumkin."
    },
    {
      id: 9,
      question: "Bir necha xil URL lardan bir vaqtning o'zida parallel ma'lumot qanday tortiladi?",
      options: [
        "Zanjirsimon setTimeout orqali",
        "Promise.all() metodidan foydalanib",
        "Do...While loop yordamida",
        "Faqat bitta URL dan so'rash mumkin"
      ],
      correctAnswer: 1,
      explanation: "Promise.all yordamida bir nechta so'rovlarni massivga solib parallel bajarish dastur ishlashini tezlashtiradi."
    },
    {
      id: 10,
      question: "HTTP GET metodi odatda nima ish qiladi?",
      options: [
        "Serverga fayl yuklaydi",
        "Yangi foydalanuvchini ro'yxatdan o'tkazadi",
        "Serverdan ma'lumotlarni o'qiydi yoki oladi",
        "Ma'lumotlar bazasidan yozuvni o'chiradi"
      ],
      correctAnswer: 2,
      explanation: "GET metodi asosan resurslarni (ma'lumotlarni) so'rash uchun ishlatiladi va serverdagi ma'lumotlarni o'zgartirmaydi."
    },
    {
      id: 11,
      question: "IP manzilga o'girish vazifasini qaysi tizim bajaradi (masalan api.server.com)?",
      options: [
        "TCP Protocol",
        "DNS (Domain Name System)",
        "HTTP Caching",
        "CORS"
      ],
      correctAnswer: 1,
      explanation: "DNS insonlar uchun tushunarli domen nomlarini brauzerlar tushunadigan IP manzillarga o'zgartirib beradi."
    },
    {
      id: 12,
      question: "Kechiktirilgan qayta urinish (Exponential Backoff Retry) qachon eng ko'p asqotadi?",
      options: [
        "Foydalanuvchi ma'lumotlarni saqlamoqchi bo'lganda",
        "Tarmoq nostabil bo'lganda so'rov muvaffaqiyatli bo'lmaganda",
        "Sayt dizayni yuklanganda",
        "Videolarni tahrirlashda"
      ],
      correctAnswer: 1,
      explanation: "Server vaqtincha javob bermay qolsa, so'rovni ma'lum muddat kutib qayta yuborish uni barqarorligini oshiradi."
    }
  ]
};
