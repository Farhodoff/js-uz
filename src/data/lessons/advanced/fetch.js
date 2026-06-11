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
      id: 1,
      title: "1️⃣ Oddiy GET so'rovi",
      instruction: "Berilgan URL-dan `fetch` orqali ma'lumot yuklab oling, response-ni JSON formatida parse qiling va qaytaring.",
      startingCode: "async function getJSON(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); return await res.json();",
      test: "if (typeof getJSON !== 'function') return 'getJSON funksiya emas'; const p = getJSON('https://jsonplaceholder.typicode.com/todos/1'); return p.then(r => r && r.id === 1 ? null : 'Ma\\'lumot noto\\'g\\'ri yuklandi');"
    },
    {
      id: 2,
      title: "2️⃣ HTTP statusini tekshirish (response.ok)",
      instruction: "URL-ga so'rov yuboring. Agar javob muvaffaqiyatli bo'lsa (`res.ok`), JSON ma'lumotni oling, aks holda 'Xato status: ' va status kodini qaytaring.",
      startingCode: "async function fetchSafe(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); if (res.ok) return await res.json(); return 'Xato status: ' + res.status;",
      test: "if (typeof fetchSafe !== 'function') return 'fetchSafe funksiya emas'; return fetchSafe('https://jsonplaceholder.typicode.com/todos/1').then(r => { if (typeof r === 'object' && r.id === 1) { return fetchSafe('https://jsonplaceholder.typicode.com/invalid-url-path-999').then(r2 => r2 === 'Xato status: 404' ? null : 'Xatolik to\\'g\\'ri boshqarilmadi'); } return 'Muvaffaqiyatli holat noto\\'g\\'ri bajarildi'; });"
    },
    {
      id: 3,
      title: "3️⃣ POST so'rovi yuborish",
      instruction: "Berilgan `url` va `data` (obyekt) yordamida POST so'rovini yuboring. Headers-da `'Content-Type': 'application/json'` yuboring, body-ni stringify qiling va natija JSON-ni qaytaring.",
      startingCode: "async function createPost(url, data) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return await res.json();",
      test: "if (typeof createPost !== 'function') return 'createPost funksiya emas'; return createPost('https://jsonplaceholder.typicode.com/posts', { title: 'foo' }).then(r => r && r.title === 'foo' ? null : 'POST so\\'rovi bajarilmadi');"
    },
    {
      id: 4,
      title: "4️⃣ DELETE so'rovi yuborish",
      instruction: "Berilgan URL-ga `DELETE` metodini ishlatgan holda fetch so'rovini yuboring va `response.status`ni qaytaring.",
      startingCode: "async function deleteItem(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url, { method: 'DELETE' }); return res.status;",
      test: "if (typeof deleteItem !== 'function') return 'deleteItem funksiya emas'; return deleteItem('https://jsonplaceholder.typicode.com/posts/1').then(r => r >= 200 && r < 300 ? null : 'DELETE so\\'rovi muvaffaqiyatsiz');"
    },
    {
      id: 5,
      title: "5️⃣ PUT so'rovi yordamida yangilash",
      instruction: "Berilgan `url` va `data` obyektini PUT metodi yordamida serverga yuboring (headers va body to'g'ri berilishi shart) va yangilangan JSON natijasini qaytaring.",
      startingCode: "async function updateItem(url, data) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return await res.json();",
      test: "if (typeof updateItem !== 'function') return 'updateItem funksiya emas'; return updateItem('https://jsonplaceholder.typicode.com/posts/1', { id: 1, title: 'bar' }).then(r => r && r.title === 'bar' ? null : 'PUT so\\'rovi noto\\'g\\'ri');"
    },
    {
      id: 6,
      title: "6️⃣ Tarmoq xatolarini ushlash",
      instruction: "So'rov yuborganda internet uzilishi yoki noto'g'ri domen kabi tarmoq xatolari (network errors) yuz bersa, catch bloki orqali 'Tarmoq xatosi' matnini qaytaradigan `fetchDataSafe` funksiyasini yozing.",
      startingCode: "async function fetchDataSafe(url) {\n  // Bu yerga yozing\n}",
      hint: "try { const res = await fetch(url); return await res.json(); } catch(e) { return 'Tarmoq xatosi'; }",
      test: "if (typeof fetchDataSafe !== 'function') return 'fetchDataSafe funksiya emas'; return fetchDataSafe('https://invalid-domain-does-not-exist.xyz').then(r => r === 'Tarmoq xatosi' ? null : 'Tarmoq xatosi ushlanmadi');"
    },
    {
      id: 7,
      title: "7️⃣ Matn (text) ko'rinishidagi javob",
      instruction: "Berilgan URL-dan ma'lumot yuklab oling va uni `.text()` yordamida oddiy matn ko'rinishida qaytaring.",
      startingCode: "async function getPlainText(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); return await res.text();",
      test: "if (typeof getPlainText !== 'function') return 'getPlainText funksiya emas'; return getPlainText('https://jsonplaceholder.typicode.com/todos/1').then(r => typeof r === 'string' && r.includes('userId') ? null : 'Matn noto\\'g\\'ri o\\'qildi');"
    },
    {
      id: 8,
      title: "8️⃣ Authorization Header yuborish",
      instruction: "Berilgan `url`ga `Authorization: Bearer my-token-123` header-i bilan GET so'rovi yuboring (fetch sozlamalarida headers obyektini bering).",
      startingCode: "async function fetchWithToken(url, token) {\n  // Bu yerga yozing\n}",
      hint: "return await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });",
      test: "if (typeof fetchWithToken !== 'function') return 'fetchWithToken funksiya emas'; if (code.includes('Authorization') && code.includes('Bearer')) return null; return 'Authorization header ishlatilmadi';"
    },
    {
      id: 9,
      title: "9️⃣ Response status kodini olish",
      instruction: "Berilgan URL-ga fetch so'rovini yuboring va faqat HTTP status kodini (masalan: 200, 404) qaytaring.",
      startingCode: "async function getStatus(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); return res.status;",
      test: "if (typeof getStatus !== 'function') return 'getStatus funksiya emas'; return getStatus('https://jsonplaceholder.typicode.com/posts/1').then(r => r === 200 ? null : 'Status noto\\'g\\'ri');"
    },
    {
      id: 10,
      title: "🔟 UI yuklanish holatini simulyatsiya qilish",
      instruction: "`loading = true` qiling. Keyin `fetch` so'rovini yuboring, javobini oling va oxirida `finally` bloki ichida `loading = false` qiling. Natijani qaytaring.",
      startingCode: "let loading = false;\nasync function loadData(url) {\n  // Bu yerga yozing\n}",
      hint: "loading = true; try { const res = await fetch(url); return await res.json(); } finally { loading = false; }",
      test: "if (typeof loadData !== 'function') return 'loadData funksiya emas'; const p = loadData('https://jsonplaceholder.typicode.com/todos/1'); if (loading === true) { return p.then(() => !loading ? null : 'loading false bo\\'lmadi'); } return 'loading true qilinmadi';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Timeout so'rovi (AbortController)",
      instruction: "`AbortController` yarating. So'rovni yuborayotganda uning `signal`ini sozlamalarga qo'shing va so'rov yuborilgandan so'ng darhol so'rovni bekor qiling (`abort()`), so'ng 'Bekor qilindi' deb return qiling (catch ichida).",
      startingCode: "async function requestAndAbort(url) {\n  // Bu yerga yozing\n}",
      hint: "const controller = new AbortController(); try { const p = fetch(url, { signal: controller.signal }); controller.abort(); await p; } catch (e) { return 'Bekor qilindi'; }",
      test: "if (typeof requestAndAbort !== 'function') return 'requestAndAbort funksiya emas'; return requestAndAbort('https://jsonplaceholder.typicode.com/posts').then(r => r === 'Bekor qilindi' ? null : 'So\\'rov abort qilinmadi');"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Response formatini dinamik aniqlash",
      instruction: "Berilgan URL-dan fetch orqali javob oling. Agar `Content-Type` headeri `'application/json'`ni o'z ichiga olsa JSON ko'rinishida, aks holda matn (text) ko'rinishida qaytaring.",
      startingCode: "async function getDynamic(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); const type = res.headers.get('content-type'); if (type && type.includes('application/json')) { return await res.json(); } return await res.text();",
      test: "if (typeof getDynamic !== 'function') return 'getDynamic funksiya emas'; return getDynamic('https://jsonplaceholder.typicode.com/todos/1').then(r => typeof r === 'object' && r.id === 1 ? null : 'Dinamik o\\'qish ishlamadi');"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Dinamik Headers Boshqaruvi (headersManager)",
      instruction: "Yangi `Headers` obyekti yarating, unga berilgan `key` va `value` qiymatini o'rnating va ushbu `Headers` obyektini qaytaring.",
      startingCode: "function headersManager(key, value) {\n  // Bu yerga yozing\n}",
      hint: "const headers = new Headers(); headers.set(key, value); return headers;",
      test: "if (typeof headersManager !== 'function') return 'headersManager funksiya emas';\nconst h = headersManager('x-api-key', 'secret');\nif (!(h instanceof Headers)) return 'Headers obyekti qaytarilmadi';\nif (h.get('x-api-key') !== 'secret') return 'Header qiymati noto\\'g\\'ri';\nif (h.get('X-API-Key') !== 'secret') return 'Headers case-insensitivity xususiyati ishlamadi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ JSON Stream Yuklash (fetchJSONStream)",
      instruction: "Berilgan URL'dan `fetch` so'rovi orqali keladigan ma'lumotlar oqimini (ReadableStream) `response.body.getReader()` va `TextDecoder` orqali bo'laklab (chunk-by-chunk) o'qing, ularni birlashtiring va to'liq yuklangach parse qilib JSON obyekt sifatida qaytaring.",
      startingCode: "async function fetchJSONStream(url) {\n  // Bu yerga yozing\n}",
      hint: "const res = await fetch(url); const reader = res.body.getReader(); const decoder = new TextDecoder(); let text = ''; while (true) { const { done, value } = await reader.read(); if (done) break; text += decoder.decode(value, { stream: true }); } text += decoder.decode(); return JSON.parse(text);",
      test: "if (typeof fetchJSONStream !== 'function') return 'fetchJSONStream funksiya emas';\nreturn fetchJSONStream('https://jsonplaceholder.typicode.com/todos/1').then(r => {\n  if (r && r.id === 1) return null;\n  return 'Stream orqali yuklangan JSON noto\\'g\\'ri';\n}).catch(e => 'Xatolik: ' + e.message);"
    }
  ],
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
