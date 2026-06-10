export const fetch = {
  id: "fetch",
  title: "Fetch API va Tarmoq So'rovlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Fetch API nima?
**Fetch API** — bu brauzerga o'rnatilgan, JavaScript orqali tarmoq (network) so'rovlarini yuborish va serverdan ma'lumotlarni yuklab olish uchun ishlatiladigan modern funksionallikdir. Uning yordamida sahifani to'liq yangilamasdan (refresh) turib, fonda API-lar bilan muloqot qilish mumkin.

### Real hayotiy analogiya
Tasavvur qiling, siz **kuryerlik xizmatidan foydalanyapsiz**:
* **Eski XMLHttpRequest usuli:** Kuryerni chaqirish uchun juda uzun qog'ozbozlik shartnomasini to'ldirasiz, qayerga borishi, qanday borishi, agar xato bo'lsa nima qilishini har bir bosqichini chigal kodlar bilan belgilaysiz.
* **Fetch API usuli:** Siz kuryerlik kompaniyasiga telefon qilib, shunchaki manzilni (\`url\`) va nima yubormoqchi ekanligingizni (\`body\`) aytasiz. Kuryer borib kelishni o'z zimmasiga oladi va sizga elektron va'da (Promise) beradi. Vaqt kelib u eshikni taqillatadi va ichida sovg'asi (Response) bo'lgan qutini uzatadi. Siz shunchaki qutini ochib ichidagidan foydalanasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (GET so'rovi yordamida JSON olish)
\`\`\`javascript
// Oddiy ma'lumot yuklab olish
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // response.json() ham asinxron ishlaydi
    const users = await response.json();
    console.log(users.slice(0, 2)); // Dastlabki 2 ta foydalanuvchini chiqaradi
  } catch (error) {
    console.error("Tarmoq xatosi:", error);
  }
}

getUsers();
\`\`\`

### 2. Intermediate Example (POST so'rovi yordamida ma'lumot yuborish)
Serverga yangi ma'lumot qo'shish uchun so'rov tanasi (body) va sarlavhalari (headers) sozlanadi:
\`\`\`javascript
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST", // HTTP metodi
      headers: {
        "Content-Type": "application/json" // Yuborilayotgan ma'lumot turi JSON ekanligi
      },
      body: JSON.stringify(userData) // Obyektni string (matn) holiga keltiramiz
    });

    const result = await response.json();
    console.log("Muvaffaqiyatli yaratildi:", result);
  } catch (error) {
    console.error("Yuborishda xato:", error);
  }
}

createUser({ name: "Farhod", username: "farrux" });
\`\`\`

### 3. Advanced Example (So'rovni bekor qilish - AbortController)
Agar foydalanuvchi sahifadan chiqib ketsa yoki so'rov juda cho'zilib ketsa, uni to'xtatish (abort qilish):
\`\`\`javascript
const controller = new AbortController();
const signal = controller.signal;

async function fetchWithTimeout() {
  // 3 soniyadan keyin so'rovni bekor qiladigan taymer
  setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch("https://httpbin.org/delay/5", { signal });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("So'rov vaqt o'tganligi sababli bekor qilindi (Timeout)!");
    } else {
      console.log("Boshqa xatolik:", error);
    }
  }
}

fetchWithTimeout();
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **XMLHttpRequest chigalligi:** Avvalgi XMLHttpRequest (XHR) obyekti callbacks tizimiga asoslangan bo'lib, uning yozilishi va boshqarilishi juda murakkab edi. Fetch esa toza Promise-larga asoslangan.
* **SPA (Single Page Application) ekotizimi:** Fetch sahifa to'liq qayta yuklanmasdan faqat uning kerakli qismini dinamik yangilash imkonini berdi (Gmail, Facebook kabi tezkor ilovalar).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. HTTP xatolarida (404, 500) fetch xato otadi deb o'ylash
#### Muammo:
Serverdan 404 yoki 500 qaytsa ham tarmoq aloqasi buzilmagani uchun \`fetch\` Promise-ni "fulfilled" (hal qilingan) qiladi, catch bloki ishlamaydi.
#### Tuzatish:
Har doim \`response.ok\` xossasini tekshirish lozim:
\`\`\`javascript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(\`HTTP xatosi! Status: \${response.status}\`);
}
\`\`\`

### 2. \`response.json()\` ni \`await\` qilishni unutish
\`json()\` metodi ham Promise qaytaradi. \`const data = response.json()\` deb yozilsa, uning ichida qiymat emas, Promise saqlanib qoladi. Har doim \`await response.json()\` deb yozish kerak.

### 3. \`JSON.stringify\` qilmasdan obyektni to'g'ridan-to'g'ri body-ga berish
#### Xato:
\`body: { name: "Ali" }\`
#### Tuzatish:
\`body: JSON.stringify({ name: "Ali" })\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Fetch API nima va u qanday HTTP metodlarini qo'llab-quvvatlaydi?
   * **Javob:** Fetch tarmoq so'rovlarini yuborish vositasi bo'lib, barcha standart metodlarni (GET, POST, PUT, DELETE, PATCH va boshqalar) qo'llab-quvvatlaydi.
2. **Savol:** \`fetch()\` qachon reject (rad etilgan) holatiga o'tadi?
   * **Javob:** Faqatgina tarmoq mutlaqo uzilganda yoki DNS topilmay serverga so'rov yetib bormagandagina. HTTP status kodlari 404/500 bo'lsa resolve bo'laveradi.
3. **Savol:** Response obyektining \`ok\` xossasi nima uchun kerak?
   * **Javob:** U HTTP status kodi 200–299 oralig'ida bo'lsa true, aks holda false qiymatini qaytaradi.
4. **Savol:** Nima uchun POST so'rov yuborganda \`Content-Type\` headeri kerak?
   * **Javob:** Serverga biz yuborayotgan ma'lumot qaysi formatda ekanligini (odatda \`application/json\`) bildirish uchun.

### Middle (5–8)
5. **Savol:** CORS (Cross-Origin Resource Sharing) xatosi nima va u qanday hal qilinadi?
   * **Javob:** Bu brauzerning xavfsizlik to'sig'i bo'lib, boshqa domendagi ma'lumotlarni ruxsatsiz olishga yo'l qo'ymaydi. Uni hal qilish uchun server o'z javobida \`Access-Control-Allow-Origin\` sarlavhasini qaytarishi kerak.
6. **Savol:** \`response.json()\` va \`response.text()\` farqi nimada?
   * **Javob:** \`json()\` kelgan ma'lumotni JavaScript obyektiga o'giradi. \`text()\` esa kelgan ma'lumotni oddiy string ko'rinishida o'qiydi.
7. **Savol:** Bitta response obyektida \`response.json()\` va \`response.text()\` ni ketma-ket chaqirish mumkinmi?
   * **Javob:** Yo'q. Brauzer body oqimini (stream) faqat bir marta o'qiy oladi. Ikkinchi marta chaqirganda \`TypeError: body stream already read\` xatosi chiqadi.
8. **Savol:** So'rov bilan birga cookie-larni boshqa domendagi API serverga yuborish qanday sozlanadi?
   * **Javob:** Fetch options qismida \`credentials: 'include'\` parametri berilishi kerak.

### Senior (9–12)
9. **Savol:** So'rov yuborishda vaqt cheklovini (Timeout) Fetch yordamida qanday amalga oshiramiz?
   * **Javob:** \`AbortController\` yaratib, uning \`signal\`ini fetch parametriga beramiz va \`setTimeout\` yordamida kerakli vaqtda \`controller.abort()\` chaqiramiz.
10. **Savol:** Fetch orqali yuklanish jarayonini (Upload/Download progress) kuzatish mumkinmi?
    * **Javob:** Fetch yuklash (upload) progressini kuzata olmaydi (buning uchun XHR kerak). Ammo yuklab olish (download) progressini \`response.body\` oqimidan (ReadableStream) baytlarni o'qib borish orqali kuzatish mumkin.
11. **Savol:** Fetch so'rovini keshlash (caching) siyosatini qanday boshqaramiz?
    * **Javob:** Options ichidagi \`cache\` parametri orqali (\`'no-store'\`, \`'reload'\`, \`'force-cache'\`, \`'only-if-cached'\`).
12. **Savol:** Axios kutubxonasi va o'rnatilgan Fetch API o'rtasidagi asosiy farqlar nimada?
    * **Javob:** Axios avtomatik ravishda HTTP xatolarda reject qiladi, JSON-ga o'gira oladi (transform), so'rovlarni abort qilish qulayroq va yuklash progressini qo'llab-quvvatlaydi. Fetch esa brauzerga o'rnatilgan bo'lib, loyihaga ortiqcha yuklama qo'shmaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Dinamik Ob-havo Ma'lumotlarini Yuklash
API orqali shahar nomini yuborib ob-havo ma'lumotini yuklaymiz. HTTP xatolarini va tarmoq uzilishlarini to'g'ri boshqaramiz.

\`\`\`javascript
async function getWeather(city) {
  const apiKey = "demo_key";
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}\`;

  try {
    const response = await fetch(url);
    
    // 1. HTTP status xatolarini tekshiramiz
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Shahar topilmadi!");
      }
      throw new Error("Server xatosi!");
    }
    
    // 2. JSON-ga o'giramiz
    const data = await response.json();
    return {
      temp: data.main.temp - 273.15, // Kelvinni Selsiyga o'tkazamiz
      description: data.weather[0].description
    };
  } catch (error) {
    // Tarmoq uzilishi yoki qo'lda otilgan xatolar shu yerga tushadi
    console.error("Ob-havo olishda xato:", error.message);
    return null;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Keshlashdan foydalaning:** Agar tez-tez o'zgarmaydigan ma'lumot bo'lsa (masalan davlatlar ro'yxati), \`cache: 'force-cache'\` sozlamasi bilan so'rovni keshdan tezkor o'qing.
* **Keep-Alive:** Bir nechta ketma-ket qisqa so'rovlar yuborilganda tarmoq ulanishini ochiq saqlash uchun \`keepalive: true\` opsiyasidan foydalaning.

---

## 10. 📌 Cheat Sheet

| Metod / Option | Vazifasi | Misol / Sintaksis |
| :--- | :--- | :--- |
| **fetch(url)** | GET so'rovi yuborish | \`await fetch('/api')\` |
| **response.ok** | Muvaffaqiyatni tekshirish (2xx) | \`if (res.ok) { ... }\` |
| **response.json()** | Body-ni JSON formatda o'qish | \`await res.json()\` |
| **response.text()** | Body-ni oddiy matn ko'rinishida o'qish | \`await res.text()\` |
| **body** | POST so'rovida yuboriladigan ma'lumot | \`body: JSON.stringify(data)\` |
| **headers** | So'rov sarlavhalari | \`headers: { 'Content-Type': 'application/json' }\` |
| **AbortController** | So'rovni bekor qilish | \`controller.abort()\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "GET so'rovi yordamida ma'lumot olish",
    "instruction": "Berilgan `url` manzilidan fetch orqali ma'lumot yuklab oluvchi va undan olingan JSON ma'lumotni qaytaruvchi asinxron `getJSON(url)` funksiyasini yozing.",
    "startingCode": "async function getJSON(url) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const response = await fetch(url); return await response.json();",
    "test": "if (!code.includes('fetch')) return 'fetch ishlatilmadi';\ntry {\n  const mockResponse = { json: async () => ({ status: 'ok' }) };\n  const mockFetch = async () => mockResponse;\n  const sandbox = new Function('fetch', code + '; return getJSON;');\n  const fn = sandbox(mockFetch);\n  const res = await fn('https://api.example.com');\n  if (res.status !== 'ok') return 'JSON qaytarishda xatolik yuz berdi';\n} catch (e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  },
  {
    "id": 2,
    "title": "POST so'rovi yordamida ma'lumot yuborish",
    "instruction": "Berilgan `url` manziliga `data` obyektini POST so'rovi yordamida JSON formatida yuboradigan hamda serverdan qaytgan javobning JSON formatini qaytaruvchi asinxron `sendPOST(url, data)` funksiyasini yozing. So'rov sarlavhalari (headers) ichida 'Content-Type': 'application/json' bo'lishi shart.",
    "startingCode": "async function sendPOST(url, data) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return await res.json();",
    "test": "if (!code.includes('POST') || !code.includes('body')) return 'POST so\\'rovi yoki body parametri ishlatilmadi';\ntry {\n  let sentOptions = null;\n  const mockFetch = async (u, opt) => { sentOptions = opt; return { json: async () => ({ success: true }) }; };\n  const sandbox = new Function('fetch', code + '; return sendPOST;');\n  const fn = sandbox(mockFetch);\n  await fn('api', { name: 'Ali' });\n  if (!sentOptions || sentOptions.method !== 'POST') return 'Metod POST qilib belgilanmagan';\n  if (!sentOptions.headers || (!sentOptions.headers['Content-Type'] && !sentOptions.headers['content-type'])) return 'Content-Type header-i to\\'g\\'ri o\\'rnatilmadi';\n  if (sentOptions.body !== JSON.stringify({ name: 'Ali' })) return 'So\\'rov body-si noto\\'g\\'ri formatlangan';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  },
  {
    "id": 3,
    "title": "HTTP Xatolarini Tekshirish",
    "instruction": "Fetch so'rovi yuborilganda tarmoq ishlashiga qaramasdan serverdan 404 yoki 500 kabi xatoliklar qaytishi mumkin (fetch buni reject qilmaydi). Agar `response.ok` xossasi false bo'lsa, 'Server error' xatosini otuvchi (`throw new Error('Server error')`) hamda muvaffaqiyatli bo'lsa, text formatida natijani qaytaruvchi asinxron `fetchText(url)` funksiyasini yozing.",
    "startingCode": "async function fetchText(url) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const response = await fetch(url); if (!response.ok) { throw new Error('Server error'); } return await response.text();",
    "test": "if (!code.includes('ok')) return 'response.ok tekshiruvi bajarilmadi';\ntry {\n  const mockFetchGood = async () => ({ ok: true, text: async () => 'hello' });\n  const mockFetchBad = async () => ({ ok: false });\n  const sandbox = new Function('fetch', code + '; return fetchText;');\n  const fnGood = sandbox(mockFetchGood);\n  const fnBad = sandbox(mockFetchBad);\n  const res = await fnGood('u');\n  if (res !== 'hello') return 'Muvaffaqiyatli so\\'rovda matn qaytarilmadi';\n  try {\n    await fnBad('u');\n    return 'Xato holatida (ok: false) error otilmadi';\n  } catch (err) {\n    if (err.message !== 'Server error') return 'Error xabari to\\'g\\'ri berilmadi';\n  }\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Fetch API yordamida so'rov yuborilganda, u default holatda qaysi HTTP metodidan foydalanadi?",
    "options": [
      "POST",
      "PUT",
      "GET",
      "DELETE"
    ],
    "correctAnswer": 2,
    "explanation": "Agar fetch() chaqirilganda hech qanday metod ko'rsatilmasa, brauzer avtomatik ravishda GET so'rovini yuboradi."
  },
  {
    "id": 2,
    "question": "Tarmoq so'rovi muvaffaqiyatli yakunlanib serverdan 404 Not Found xatosi qaytsa, `fetch()` qanday yo'l tutadi?",
    "options": [
      "Va'dani (Promise) 'fulfilled' deb hisoblaydi, faqat `response.ok` xossasi false bo'ladi",
      "Va'dani darhol 'rejected' (rad etilgan) qiladi va catch-ga otadi",
      "So'rovni serverga qayta yuboradi",
      "Dastur ishini butunlay to'xtatadi"
    ],
    "correctAnswer": 0,
    "explanation": "Fetch faqat tarmoq ulanishi mutlaqo uzilgandagina Promise-ni reject qiladi. Agar HTTP status kodi (masalan, 404 yoki 500) qaytsa, Promise baribir resolve bo'ladi va faqat `response.ok` false qiymat oladi."
  },
  {
    "id": 3,
    "question": "Qaysi holatda `fetch()` qaytargan Promise 'rejected' (rad etilgan) bo'ladi?",
    "options": [
      "Server 500 Internal Server Error qaytarganda",
      "Foydalanuvchida internet aloqasi bo'lmaganda yoki tarmoq mutlaqo ishlay olmay qolganda",
      "Server 403 Forbidden qaytarganda",
      "Javob JSON formatida bo'lmaganda"
    ],
    "correctAnswer": 1,
    "explanation": "Fetch faqat tarmoq uzilishi, DNS topilmasligi yoki xavfsizlik to'siqlari tufayli haqiqatdan ham serverga ulana olmaganidagina Promise-ni reject holatiga o'tkazadi."
  },
  {
    "id": 4,
    "question": "Fetch so'rovida POST metodini ishlatganda, yuborilayotgan JS obyektini `body` qismiga qanday ko'rinishda joylash kerak?",
    "options": [
      "JS obyektini to'g'ridan-to'g'ri o'zini uzatish orqali",
      "Massivga o'girib",
      "XML ko'rinishida",
      "`JSON.stringify(obyekt)` ko'rinishida string qilib"
    ],
    "correctAnswer": 3,
    "explanation": "Tarmoq orqali yuborishda JS obyektini JSON formatidagi matnga o'giriish uchun `JSON.stringify()` metodidan foydalanish zarur."
  },
  {
    "id": 5,
    "question": "Serverdan kelgan javobni JSON formatida o'qish uchun javob obyektining qaysi asinxron metodidan foydalaniladi?",
    "options": [
      "response.json()",
      "response.toJSON()",
      "JSON.parse(response)",
      "response.readBody()"
    ],
    "correctAnswer": 0,
    "explanation": "response.json() metodi javob body-sini JSON sifatida o'qiydi va Promise qaytaradi. Uni har doim `await` qilish kerak."
  },
  {
    "id": 6,
    "question": "So'rov jo'natish sarlavhalarini (headers) sozlash uchun fetch-ning qaysi parametridan foydalaniladi?",
    "options": [
      "credentials",
      "headers",
      "metadata",
      "mode"
    ],
    "correctAnswer": 1,
    "explanation": "So'rovda yuboriladigan qo'shimcha sarlavhalar (masalan, Authorization tokenlari, Content-Type) `headers` parametri orqali boshqariladi."
  },
  {
    "id": 7,
    "question": "Fetch so'rovini ma'lum vaqt o'tgandan keyin yoki foydalanuvchi bekor qilganda to'xtatish (abort qilish) uchun qaysi API ishlatiladi?",
    "options": [
      "AbortController va AbortSignal",
      "fetch.cancel()",
      "clearTimeout()",
      "Promise.race()"
    ],
    "correctAnswer": 0,
    "explanation": "`AbortController` yordamida maxsus signal yaratilib fetch-ga uzatiladi va kerak bo'lganda controller.abort() chaqirilib so'rov bekor qilinadi."
  },
  {
    "id": 8,
    "question": "`response.ok` xossasi serverning HTTP status kodi qaysi oraliqda bo'lganda `true` qiymat qaytaradi?",
    "options": [
      "100 dan 500 gacha bo'lgan oraliqda",
      "Faqat 200 bo'lganda",
      "200 dan 299 gacha bo'lgan oraliqda",
      "300 dan kichik va 400 dan katta bo'lganda"
    ],
    "correctAnswer": 2,
    "explanation": "Agar server muvaffaqiyatli HTTP status kodlarini (2xx oralig'ida, masalan 200 OK, 201 Created) qaytarsa, `response.ok` true bo'ladi."
  },
  {
    "id": 9,
    "question": "CORS (Cross-Origin Resource Sharing) xatosi nima sababdan yuzaga keladi?",
    "options": [
      "Brauzer xavfsizlik nuqtai nazaridan boshqa domendan ruxsatsiz ma'lumot olishni bloklaganda",
      "Foydalanuvchining internet tezligi juda past bo'lganda",
      "So'rov yuborilayotgan API URL manzili xato yozilganda",
      "Server 500 xatosini berganda"
    ],
    "correctAnswer": 0,
    "explanation": "CORS - bu brauzerning xavfsizlik siyosati bo'lib, ruxsat etilmagan boshqa domenlardan (origin) keladigan so'rovlarga javob qaytarishni taqiqlaydi yoki bloklaydi."
  },
  {
    "id": 10,
    "question": "Fetch orqali yuklangan fayl (masalan rasm yoki PDF) baytlarini xom holatda o'qish uchun `response` ning qaysi metodi ishlatiladi?",
    "options": [
      "response.text()",
      "response.blob()",
      "response.json()",
      "response.bytes()"
    ],
    "correctAnswer": 1,
    "explanation": "Rasm, audio, video yoki hujjatlarni yuklab ularni fayl sifatida o'qish va URL yaratish uchun `response.blob()` ishlatiladi."
  },
  {
    "id": 11,
    "question": "Nima uchun modern veb-dasturlashda eski `XMLHttpRequest` o'rniga `Fetch API` tavsiya etiladi?",
    "options": [
      "Fetch Promise-larga asoslangan bo'lib, asinxron kodni toza va oson yozish imkonini beradi",
      "XMLHttpRequest faqat sinxron ishlaydi",
      "Fetch orqali faqat JSON yuklash mumkin",
      "Fetch tashqi kutubxona bo'lib, o'rnatilishi shart"
    ],
    "correctAnswer": 0,
    "explanation": "Fetch API modern va'dalarga (Promises) asoslangani tufayli ancha sodda interfeys taqdim etadi va Callback Hell kabi muammolardan qutulishga yordam beradi."
  },
  {
    "id": 12,
    "question": "Fetch-da `credentials: 'include'` sozlamasi nima maqsadda beriladi?",
    "options": [
      "So'rov bilan birga cookie fayllarini va autentifikatsiya sarlavhalarini yuborish uchun",
      "So'rovni shifrlash (encrypt) qilish uchun",
      "API kalitlarini (API keys) yashirish uchun",
      "LocalStorage ma'lumotlarini serverga jo'natish uchun"
    ],
    "correctAnswer": 0,
    "explanation": "`credentials: 'include'` sozlamasi cross-origin (boshqa domendagi) so'rovlarda ham cookie fayllari va session IDlarni birga yuborishga imkon beradi."
  }
]

};
