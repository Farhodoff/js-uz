export const advancedFetch = {
  id: "a19",
  title: "Ilg'or Fetch: Timeout, Retry va Xatolar",
  theory: `## 1. NEGA kerak?
Oddiy \`fetch()\` faqat tarmoq uzilsa yoki server topilmasa xato (reject) qaytaradi. Server 404 (Not Found) yoki 500 (Internal Server Error) xatolik qaytarganda esa, \`fetch\` so'rovni muvaffaqiyatli deb hisoblaydi. Murakkab loyihalarda so'rovlarni timeout qilish, xatolarni to'g'ri boshqarish va tarmoq vaqtincha uzilganda avtomatik qayta urinish (retry) tizimlarini qurish muhim ahamiyatga ega.

---

## 2. SODDALIK (Analogiya)
Buni **pochta orqali xat yuborish** deb tasavvur qiling:
- **Oddiy fetch:** Xatingiz manzilga borib tegsa (garchi u yerda qabul qiluvchi xatni rad etsa ham), xat tashuvchi vazifasini muvaffaqiyatli bajardi deb hisoblaydi.
- **Ilg'or fetch:** Xatni oluvchi uni rad etsa xatoni aniqlaydi, agar xat manzilga yetib bormasa, bir necha bor qayta jo'natishga urinadi, va agar xat vaqtida etib bormasa (timeout), jo'natishni bekor qiladi.

---

## 3. CHUQUR TUSHUNCHALAR VA ILG'OR TIZIMLAR

### A. Exponential Backoff va Jitter
Tizimda vaqtincha uzilishlar (masalan, server yuklamasi ortganda) yuz berganda, so'rovlarni ketma-ket, bir xil kutish vaqti bilan takrorlash serverga bo'lgan yuklamani yanada oshirib yuboradi (bunga **Thundering Herd Problem** deyiladi).
Bunining oldini olish uchun:
1. **Exponential Backoff:** Har bir urinishdagi kutish vaqti eksponental ravishda oshiriladi (masalan, 100ms, 200ms, 400ms, 800ms...).
2. **Jitter:** Takrorlanish vaqtiga tasodifiy kichik son (random delay) qo'shiladi, bu so'rovlarning bir xil vaqtda serverga qaytib kelmasligini ta'minlaydi.

\`\`\`mermaid
graph TD
    A[So'rov yuborish] --> B{Muvaffaqiyatlimi?}
    B -- Ha --> C[Natijani qaytarish]
    B -- Yo'q --> D{Urinishlar soni tugadimi?}
    D -- Ha --> E[Xatoni qaytarish]
    D -- Yo'q --> F[Kutish vaqtini hisoblash: delay * 2^i + Jitter]
    F --> G[Belgilangan vaqt kutish]
    G --> A
\`\`\`

### B. AbortSignal Event Listener
\`AbortController\` faqat so'rovni to'xtatish uchun emas, balki asinxron operatsiyalar bilan bog'liq resurslarni tozalashda ham muhim rol o'ynaydi. \`AbortSignal\` obyektiga \`abort\` hodisasi tinglovchisini (\`addEventListener\`) qo'shish orqali boshqa asinxron ishlarni ham avtomatik tozalash mumkin:
\`\`\`javascript
const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener('abort', () => {
  console.log("Tarmoq so'rovi to'xtatildi, xotirani tozalash jarayoni boshlandi...");
});
\`\`\`

### C. Promise Concurrency: Promise.any vs Promise.allSettled
Tarmoq so'rovlarini parallel ravishda yuborishda quyidagi ilg'or Promise metodlaridan foydalaniladi:
* **\`Promise.any()\`:** Berilgan ro'yxatdan eng birinchi bo'lib muvaffaqiyatli yakunlangan (resolved) Promise natijasini qaytaradi. Agar barcha Promiselar reject bo'lsa, xato beradi (AggregateError). Bu bir nechta CDNdagi bir xil resurslardan eng tezkorini tanlashda juda qo'l keladi.
* **\`Promise.allSettled()\`:** Barcha Promiselar yakunlanishini kutadi (muvaffaqiyatli yoki xatoli bo'lishidan qat'i nazar) va har birining holati (fulfilled/rejected) hamda qiymati haqida ma'lumot beruvchi massiv qaytaradi. Bu bir nechta mustaqil API'lardan ma'lumot olishda, bittasi xato bo'lsa ham qolganlarini ko'rsatishda qulaydir.

\`\`\`mermaid
sequenceDiagram
    participant App
    participant Controller
    participant Fetch
    App->>Controller: new AbortController()
    App->>Fetch: fetch(url, { signal })
    Note over Fetch: So'rov davom etmoqda...
    App->>Controller: abort()
    Controller->>Fetch: abort signal yuboriladi
    Fetch-->>App: AbortError qaytariladi
\`\`\`

---

## 4. AMALIYOT (Mashqlar pastda)
So'rovni ma'lum vaqt ichida bajarilmasa bekor qilish kodi:
\`\`\`javascript
async function fetchWithTimeout(url, ms = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}
\`\`\`

---

## 5. XATOLAR (Common mistakes)
- **HTTP status kodlarini tekshirmaslik:** \`res.ok\`ni tekshirmasdan to'g'ridan-to'g'ri \`res.json()\` chaqirish.
- **AbortController-ni yopmaslik:** \`clearTimeout(id)\` qilish esdan chiqsa, so'rov muvaffaqiyatli bo'lsa ham kelajakda controller uni asossiz bekor qilishi mumkin.
- **Promise.race() orqali so'rovni uzib bo'lmasligi:** \`Promise.race\` kutishni to'xtatadi, lekin brauzer darajasida tarmoq yuklamasini (fetch-ni) bekor qilmaydi. Buning uchun faqat \`AbortController\` kerak.

---

## 6. SAVOLLAR VA JAVOBLAR
**1. fetch() qachon reject bo'ladi?**
Faqat tarmoq ulanishi mutlaqo yo'qolganda yoki server topilmaganda. HTTP 404 va 500 statuslarida u resolve bo'ladi.

**2. res.ok nimani anglatadi?**
HTTP status kodi 200 dan 299 gacha oraliqda bo'lsa, u \`true\` qiymatga ega bo'ladi.

**3. AbortController nima uchun ishlatiladi?**
Tarmoq so'rovlarini dasturiy ravishda bekor qilish uchun (masalan, timeout yoki sahifani tark etganda).

**4. Exponential Backoff nima uchun kerak?**
Server vaqtincha ishdan chiqqanda, qayta urinishlar oralig'ini tobora uzaytirib serverni qo'shimcha bosimdan (yuklamadan) himoyalash uchun.

**5. Promise.any va Promise.race farqi nimada?**
Promise.race birinchi yakunlangan (resolve yoki reject) Promiseni qaytarsa, Promise.any faqat birinchi muvaffaqiyatli (resolve) bo'lgan Promiseni qaytaradi.
`,
  exercises: [
    {
      id: 1,
      title: "res.ok tekshiruvi",
      instruction: "Fetch so'rovda res.ok false bo'lsa, xato tashlaydigan (throw) kod yozing.",
      startingCode: "fetch(url).then(res => {\n  // Bu yerda tekshiring\n});",
      hint: "if (!res.ok) throw new Error('Xato');",
      test: "if (code.includes('res.ok')) return null; return 'res.ok xususiyatini tekshiring';"
    },
    {
      id: 2,
      title: "AbortController signalini ulanishi",
      instruction: "fetch parametrlariga 'controller'dan olingan signalni ulang.",
      startingCode: "const controller = new AbortController();\nfetch(url, {\n  // Signalni ulang\n});",
      hint: "signal: controller.signal",
      test: "if (code.includes('signal: controller.signal') || code.includes('signal:controller.signal')) return null; return 'signalni controller.signal ga tenglang';"
    },
    {
      id: 3,
      title: "Fetch POST Request",
      instruction: "Method POST, Content-Type application/json bo'lgan fetch so'rovi sozlamalarini yozing.",
      startingCode: "fetch(url, {\n  // Method va headers qo'shing\n});",
      hint: "method: 'POST', headers: { 'Content-Type': 'application/json' }",
      test: "if (code.includes('POST') && code.includes('application/json')) return null; return 'method POST va Content-Type headerini qo\\'shing';"
    },
    {
      id: 4,
      title: "Simple Retry loops",
      instruction: "Xatolik yuz berganda 3 marta qayta urinadigan so'rov yozing.",
      startingCode: "async function getWithRetry(url) {\n  for (let i = 0; i < 3; i++) {\n    try {\n      return await fetch(url);\n    } catch(e) {\n      // Oxirgi qadamda xatoni qayta tashlang\n    }\n  }\n}",
      hint: "if (i === 2) throw e;",
      test: "if (code.includes('throw') && code.includes('catch')) return null; return 'catch ichida oxirgi urinishda xatoni qayta tashlang';"
    },
    {
      id: 5,
      title: "URL Parameters (URLSearchParams)",
      instruction: "URLSearchParams orqali 'page=2' va 'limit=10' parametrlarini URL-ga qo'shing.",
      startingCode: "const params = new URLSearchParams();\n// Parametrlarni set qiling\n",
      hint: "params.set('page', '2'); params.set('limit', '10');",
      test: "if (code.includes('page') && code.includes('limit') && code.includes('set')) return null; return 'params.set yordamida parametrlar o\\'rnating';"
    },
    {
      id: 6,
      title: "Promise.all bilan Concurrency",
      instruction: "Promise.all yordamida bir vaqtda url1 va url2 so'rovlarini yuboring.",
      startingCode: "const url1 = 'url1', url2 = 'url2';\nconst fetchAll = () => {\n  // Promise.all ishlating\n};",
      hint: "return Promise.all([fetch(url1), fetch(url2)]);",
      test: "if (code.includes('Promise.all') && code.includes('fetch')) return null; return 'Promise.all yordamida fetch so\\'rovlarini birlashtiring';"
    },
    {
      id: 7,
      title: "Response Headers olish",
      instruction: "Kelgan javobdan (res) 'content-type' sarlavhasini olib qaytaring.",
      startingCode: "function getContentType(res) {\n  // Content-Type ni qaytaring\n}",
      hint: "return res.headers.get('content-type');",
      test: "if (code.includes('headers.get')) return null; return 'res.headers.get metodidan foydalaning';"
    },
    {
      id: 8,
      title: "Text formatida o'qish",
      instruction: "Javobni json emas, balki oddiy text formatida o'qib qaytaruvchi kod yozing.",
      startingCode: "fetch(url).then(res => {\n  // Text formatida qaytaring\n});",
      hint: "return res.text();",
      test: "if (code.includes('res.text()')) return null; return 'res.text() metodini ishlating';"
    },
    {
      id: 9,
      title: "AbortError checking",
      instruction: "Catch blokida xatoning nomi 'AbortError' ekanligini tekshiring.",
      startingCode: "try {\n  await fetch(url);\n} catch(err) {\n  // AbortError ekanini tekshiring\n}",
      hint: "if (err.name === 'AbortError') { }",
      test: "if (code.includes(\"err.name === 'AbortError'\") || code.includes('err.name === \"AbortError\"')) return null; return 'err.name ni tekshiring';"
    },
    {
      id: 10,
      title: "Promise.race for Fast Response",
      instruction: "Promise.race yordamida url1 va url2 dan birinchi bo'lib kelganini oling.",
      startingCode: "const getFastest = (url1, url2) => {\n  // Promise.race yozing\n};",
      hint: "return Promise.race([fetch(url1), fetch(url2)]);",
      test: "if (code.includes('Promise.race') && code.includes('fetch')) return null; return 'Promise.race dan foydalaning';"
    },
    {
      id: 11,
      title: "Fetch image blob",
      instruction: "res ob'ektidan blob ko'rinishidagi ma'lumotni o'qib qaytaring.",
      startingCode: "fetch(imageUrl).then(res => {\n  // Blob qaytaring\n});",
      hint: "return res.blob();",
      test: "if (code.includes('res.blob()')) return null; return 'res.blob() metodini chaqiring';"
    },
    {
      id: 12,
      title: "FormData request body",
      instruction: "Fetch so'rovining 'body'siga 'formData' ob'ektini uzating.",
      startingCode: "const formData = new FormData();\nfetch(url, {\n  method: 'POST',\n  // FormData ni uzating\n});",
      hint: "body: formData",
      test: "if (code.includes('body: formData') || code.includes('body:formData')) return null; return 'body qismiga formData ni bering';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Exponential Backoff Retry (fetchWithBackoff)",
      instruction: "Xatolik yuz berganda (tarmoq uzilishi yoki 5xx xatolik) exponential backoff algoritmi bilan (`initialDelay` har safar 2 barobar ko'payadi) `maxRetries` marta qayta urinadigan `fetchWithBackoff(url, maxRetries, initialDelay)` funksiyasini yozing.",
      startingCode: "async function fetchWithBackoff(url, maxRetries = 3, initialDelay = 50) {\n  // Kodni shu yerdan yozing\n}",
      hint: "for (let i = 0; i < maxRetries; i++) { try { const res = await fetch(url); if (res.ok) return res; } catch(e) { if (i === maxRetries - 1) throw e; } await new Promise(r => setTimeout(r, initialDelay * Math.pow(2, i))); }",
      test: "if (typeof fetchWithBackoff !== 'function') return 'fetchWithBackoff funksiya emas';\nreturn fetchWithBackoff('https://jsonplaceholder.typicode.com/todos/1', 2, 10).then(res => {\n  if (res && res.status === 200) return null;\n  return 'Muvaffaqiyatli so\\'rov bajarilmadi';\n}).catch(e => 'Xatolik: ' + e.message);"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Promise.any orqali eng tezkor so'rov (fetchFastestWithFallback)",
      instruction: "Berilgan `urls` massividan `Promise.any` yordamida eng tez javob berganini qaytaring. Agar barcha URL-lar xato bilan tugasa, `fallbackUrl` ga so'rov yuborib, uning natijasini qaytaring.",
      startingCode: "async function fetchFastestWithFallback(urls, fallbackUrl) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return await Promise.any(urls.map(url => fetch(url))); } catch (e) { return await fetch(fallbackUrl); }",
      test: "if (typeof fetchFastestWithFallback !== 'function') return 'fetchFastestWithFallback funksiya emas';\nreturn fetchFastestWithFallback([\n  'https://invalid-url-1.com/nonexistent',\n  'https://invalid-url-2.com/nonexistent'\n], 'https://jsonplaceholder.typicode.com/todos/1').then(res => {\n  if (res && res.status === 200) return null;\n  return 'Fallback URL-ga murojaat qilinmadi yoki noto\\'g\\'ri javob qaytdi';\n}).catch(e => 'Xatolik: ' + e.message);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`fetch()` metodi yordamida yuborilgan so'rov qachon Promise'ning `reject` (error) holatiga o'tadi?",
      options: [
        "Server 404 Not Found xatoligini qaytarganda",
        "Server 500 Internal Server Error xatoligini qaytarganda",
        "Faqat tarmoq ulanishi yo'qolganda (Network Error) yoki server umuman topilmaganda",
        "So'rov yuborilganda va server 200 OK qaytarganda"
      ],
      correctAnswer: 2,
      explanation: "`fetch()` HTTP status kodlaridan (masalan, 404 yoki 500) qat'i nazar, agar server javob qaytarsa Promiseni muvaffayatli (`resolve`) deb biladi. U faqat tarmoq butunlay uzilganda yoki serverga bog'lanib bo'lmaganda (`reject`) xato beradi."
    },
    {
      id: 2,
      question: "Fetch so'rovini ma'lum bir vaqtdan keyin to'xtatish (Request Timeout) yoki foydalanuvchi sahifadan chiqib ketganda so'rovni bekor qilish uchun qaysi standart API'dan foydalaniladi?",
      options: [
        "`Promise.race()`",
        "`AbortController`",
        "`fetch.cancel()`",
        "`clearTimeout()`"
      ],
      correctAnswer: 1,
      explanation: "`AbortController` yordamida signal obyekti yaratilib, `fetch` parametrlariga uzatiladi. Keyinchalik `controller.abort()` chaqirilganda so'rov darhol to'xtatilagi va 'AbortError' xatoligi tashlanadi."
    },
    {
      id: 3,
      question: "Fetch orqali kelgan javob obyekti (`res`) muvaffaqiyatli (HTTP status kodi 200-299 oralig'ida) ekanligini tezkor tekshirish uchun qaysi boolean xususiyatdan (property) foydalaniladi?",
      options: [
        "`res.status === 200`",
        "`res.ok`",
        "`res.success`",
        "`res.isDone`"
      ],
      correctAnswer: 1,
      explanation: "`res.ok` xususiyati status kodi 200 dan 299 gacha bo'lgan oraliqda bo'lsa `true`, aks holda `false` qiymat qaytaradi."
    },
    {
      id: 4,
      question: "Nima uchun `Promise.race()` yordamida o'rnatilgan timeout yechimi `AbortController`ga qaraganda samarasizroq hisoblanadi?",
      options: [
        "`Promise.race()` asinxron ishlay olmadi",
        "`Promise.race()` faqat natijani kutishni to'xtatadi, lekin tarmoqdagi haqiqiy HTTP so'rovini bekor qilmaydi (so'rov fonda serverga yetib boradi va resurs sarflaydi); `AbortController` esa tarmoqdagi so'rovni haqiqatda to'xtatadi",
        "`Promise.race()` brauzerlarda qo'llab-quvvatlanmaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "`Promise.race` faqat birinchi bajarilgan Promisening natijasini oladi, ammo fonda ketayotgan fetch so'rovi to'xtamaydi. `AbortController` esa brauzer darajasida tarmoq so'rovini uzib, server yuklamasini kamaytiradi."
    },
    {
      id: 5,
      question: "Agar so'rov yuborishda xatolik yuz bersa va biz ma'lum miqdorda avtomatik ravishda qayta urinib ko'rishni xohlasak (Retry Pattern), eng optimal usul qaysi?",
      options: [
        "So'rovni loop yoki rekursiya yordamida try-catch ichida qayta yuborish, urinishlar soni tugagandan keyingina error tashlash",
        "Brauzerni butunlay refresh qilish",
        "Cheksiz `setInterval` ishlatish",
        "Hech qachon qayta urinmaslik, chunki bu xavfli"
      ],
      correctAnswer: 0,
      explanation: "`for` tsikli orqali belgilangan miqdorda urinish yasaladi. So'rov muvaffaqiyatli bo'lsa, natija qaytariladi. Agar xato bo'lsa, tsikl davom etadi va faqat oxirgi urinish ham xato bo'lsagina xatolik tashqariga otiladi."
    },
    {
      id: 6,
      question: "Server 401 (Unauthorized) qaytarganda fetch so'rovi qanday yakunlanadi?",
      options: [
        "So'rov reject bo'ladi",
        "So'rov resolve bo'ladi va res.ok qiymati false bo'ladi",
        "Dastur darhol ishdan to'xtaydi",
        "Tashqi catch bloki avtomatik ishga tushadi"
      ],
      correctAnswer: 1,
      explanation: "HTTP 401 status kodi ulanish muvaffaqiyatli o'rnatilganini ko'rsatadi, shuning uchun fetch resolve bo'ladi, lekin status 200-299 orasida bo'lmagani sababli res.ok false bo'ladi."
    },
    {
      id: 7,
      question: "Tarmoq javobining status kodini (masalan, 200, 404, 500) qaysi response xossasidan olish mumkin?",
      options: [
        "`res.code`",
        "`res.status`",
        "`res.statusCode`",
        "`res.responseCode`"
      ],
      correctAnswer: 1,
      explanation: "`res.status` xususiyati HTTP javobning raqamli status kodini saqlaydi (masalan, 200 yoki 404)."
    },
    {
      id: 8,
      question: "AbortController.abort() chaqirilganda, so'rov qaytaradigan errorning nomi qanday bo'ladi?",
      options: [
        "\"TimeoutError\"",
        "\"AbortError\"",
        "\"CancelError\"",
        "\"RequestError\""
      ],
      correctAnswer: 1,
      explanation: "Controller bekor qilinganda, fetch Promise reject bo'ladi va uning xato obyekti nomi (name) doimo `\"AbortError\"` bo'lib keladi."
    },
    {
      id: 9,
      question: "Fetch so'roviga abort signalini ulatish uchun qaysi konfiguratsiya xossasidan foydalaniladi?",
      options: [
        "`abort`",
        "`signal`",
        "`controller`",
        "`cancel`"
      ],
      correctAnswer: 1,
      explanation: "`fetch(url, { signal: controller.signal })` ko'rinishida `signal` konfiguratsiya xossasiga o'rnatiladi."
    },
    {
      id: 10,
      question: "Bitta AbortController signalini birdaniga bir nechta fetch so'rovlariga ulash mumkinmi?",
      options: [
        "Yo'q, faqat bittaga ulash mumkin",
        "Ha, mumkin va controller.abort() chaqirilganda barcha ulangan so'rovlar to'xtatiladi",
        "Ha, lekin faqat oxirgi ulangan so'rov to'xtaydi",
        "Faqat strict rejimda ruxsat beriladi"
      ],
      correctAnswer: 1,
      explanation: "Bir nechta fetch so'rovi bitta `signal`ni kuzatishi mumkin. `controller.abort()` chaqirilganda barcha mos fetch so'rovlari bekor qilinadi."
    },
    {
      id: 11,
      question: "Fetch so'rovining default HTTP metodi qaysi?",
      options: [
        "`POST`",
        "`GET`",
        "`PUT`",
        "`OPTIONS`"
      ],
      correctAnswer: 1,
      explanation: "Agar method konfiguratsiya parametrlari orasida ko'rsatilmagan bo'lsa, fetch avtomatik ravishda `GET` so'rovini yuboradi."
    },
    {
      id: 12,
      question: "Fetch POST so'rovida body qismiga JSON matn uzatish uchun qaysi sarlavha (Header) Content-Type qiymati sifatida berilishi kerak?",
      options: [
        "`text/plain`",
        "`application/json`",
        "`application/x-www-form-urlencoded`",
        "`multipart/form-data`"
      ],
      correctAnswer: 1,
      explanation: "Serverga JSON formatidagi ma'lumot uzatilayotganini bildirish uchun `headers: { 'Content-Type': 'application/json' }` o'rnatilishi shart."
    },
    {
      id: 13,
      question: "Exponential Backoff algoritmining asosiy maqsadi nima?",
      options: [
        "So'rovlarni tezroq yuborish",
        "Urinishlar orasidagi vaqtni eksponentsial ravishda oshirish orqali serverni ortiqcha yuklamalardan (Thundering Herd) himoyalash",
        "Ma'lumotlarni shifrlash",
        "Xatoliklarni yashirish"
      ],
      correctAnswer: 1,
      explanation: "Eksponentsial orqaga qaytish (exponential backoff) urinishlar orasidagi kechikishni har safar 2 barobar uzaytirib, server o'ziga kelishi uchun vaqt beradi va yuklamani tarqatadi."
    },
    {
      id: 14,
      question: "Promise.any() metodi Promise.race() dan qanday farq qiladi?",
      options: [
        "Promise.any() faqat birinchi muvaffaqiyatli (resolve) Promiseni qaytaradi; Promise.race() esa birinchi yakunlangan (resolve yoki reject) Promiseni qaytaradi",
        "Ikkalasi mutlaqo bir xil",
        "Promise.any() faqat reject bo'lganlarni qaytaradi",
        "Promise.any() asinxron operatsiyalarni cheklaydi"
      ],
      correctAnswer: 0,
      explanation: "Promise.race har qanday yakunni (hatto xato bo'lsa ham) birinchi bo'lib qaytarsa, Promise.any barcha xatolar orasidan faqat birinchi muvaffaqiyatli chiqqanini tanlaydi."
    }
  ]
};
