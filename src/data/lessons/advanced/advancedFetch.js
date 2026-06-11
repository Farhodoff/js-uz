export const advancedFetch = {
  id: "advancedFetch",
  title: "Advanced Fetch, so'rov sozlamalari va aborting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Advanced Fetch va Aborting nima?
**Fetch API** — bu brauzerdan serverga tarmoq so'rovlarini (HTTP so'rovlari) yuborish uchun ishlatiladigan zamonaviy interfeysdir. Odatda biz \`fetch(url)\` orqali oddiy so'rovlar yuboramiz, biroq katta loyihalarda so'rovlarni boshqarish (masalan: ma'lumotlar yuborishda sarlavhalar sozlash, so'rov juda cho'zilib ketganda uni to'xtatish yoki foydalanuvchi sahifadan chiqib ketganda so'rovni bekor qilish) talab etiladi. Buning uchun bizga **AbortController** va ilg'or \`fetch\` sozlamalari yordam beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranda taom buyurtma qildingiz**:
* **Oddiy Fetch:** Ofitsiantga "menga pitssa olib keling" dedingiz, u ketdi va pitssa tayyor bo'lishini kuta boshladingiz.
* **Headers (Sarlavhalar):** Ofitsiantga "menga pitssa olib keling, faqat piyozsiz bo'lsin va achchiq sous bilan" deb qo'shimcha shartlar (sarlavhalar) berishingiz.
* **AbortController (Buyurtmani bekor qilish):** Buyurtma berganingizdan keyin to'satdan shoshilinch ish chiqib qoldi va ketishingiz kerak. Siz ofitsiantni chaqirib: "Aka, buyurtmani bekor qiling (Abort), men ketishim kerak!" deysiz. Agar taom hali tayyor bo'lmagan bo'lsa, jarayon to'xtatiladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Headers va POST so'rovi sozlamalari)
Yangi foydalanuvchini ro'yxatdan o'tkazish uchun POST so'rovi yuborish:
\`\`\`javascript
async function registerUser(username, email) {
  const url = 'https://api.example.com/users';
  
  const response = await fetch(url, {
    method: 'POST', // HTTP metodi
    headers: {
      'Content-Type': 'application/json', // Yuborilayotgan ma'lumot turi
      'Accept': 'application/json',       // Qabul qiluvchi ma'lumot turi
      'Authorization': 'Bearer my-token-123' // Avtorizatsiya tokeni
    },
    body: JSON.stringify({
      username: username,
      email: email
    }) // JS obyektini stringga aylantiramiz
  });

  if (!response.ok) {
    throw new Error(\`Xatolik: \${response.status}\`);
  }

  const data = await response.json();
  return data;
}
\`\`\`

### 2. Intermediate Example (AbortController yordamida so'rovni bekor qilish)
Foydalanuvchi tugmani bosganda boshlangan so'rovni ikkinchi marta bosganda bekor qilish:
\`\`\`javascript
let controller;

function startDownload() {
  // Agar oldingi so'rov faol bo'lsa, uni bekor qilamiz
  if (controller) {
    controller.abort();
    console.log('Oldingi yuklash bekor qilindi.');
  }

  // Yangi AbortController yaratamiz
  controller = new AbortController();
  const signal = controller.signal;

  fetch('https://api.example.com/large-file', { signal })
    .then(response => response.blob())
    .then(blob => console.log('Yuklash tayyor:', blob))
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Yuklash foydalanuvchi tomonidan bekor qilindi.');
      } else {
        console.error('Yuklashda boshqa xatolik:', error);
      }
    });
}
\`\`\`

### 3. Advanced Example (Fetch so'roviga Timeout o'rnatish)
Agar so'rov 5 soniyadan ko'p vaqt olsa, uni avtomatik abort qilish:
\`\`\`javascript
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options; // Default 5 soniya timeout
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id); // Agar so'rov tez tugasa, taymerni tozalaymiz
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('So\\'rov belgilangan vaqt ichida javob bermadi (Timeout)');
    }
    throw error;
  }
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Keraksiz tarmoq trafigi va xotira sarfi:** Foydalanuvchi qidiruv maydoniga yozganda (Autocomplete) har bir harfda fetch ketadi. Eski harflarga ketgan fetch so'rovlarini bekor qilmasak, tarmoq band bo'ladi va eng oxirgi so'rov natijasi emas, balki eng kech kelgan eski so'rov natijasi ekranga chiqib qolishi mumkin (Race Condition).
* **Cheksiz kutish (Timeout):** Agar serverda muammo bo'lsa, so'rov juda uzoq kutish rejimida qolib ketadi va foydalanuvchi interfeysi muzlaydi. Timeout qo'shish dastur barqarorligini ta'minlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`JSON.stringify\` qilishni unutish
#### Xato:
\`fetch(url, { method: 'POST', body: { name: 'Ali' } })\` // Obyekt to'g'ridan-to'g'ri jo'natilmaydi!
#### To'g'ri usul:
\`fetch(url, { method: 'POST', body: JSON.stringify({ name: 'Ali' }) })\`

### 2. \`Content-Type: application/json\` sarlavhasini bermaslik
#### Xato:
JSON string jo'natib, sarlavhada uning turi ko'rsatilmasa, server uni tushunmaydi va so'rovni rad etadi.
#### To'g'ri usul:
\`headers: { 'Content-Type': 'application/json' }\` sozlamasini qo'shish.

### 3. HTTP xato statuslarida (masalan 404 yoki 500) catch blokiga tushadi deb o'ylash
#### Xato:
\`fetch(url).catch(err => console.log('Xato!'))\` // 404 yoki 500 da catch ishlamaydi, chunki server javob bergan!
#### To'g'ri usul:
\`response.ok\` xossasini tekshirish.

### 4. Har safar yangi fetch uchun bitta global AbortController ishlatish
#### Xato:
Bitta controllerni qayta-qayta ishlatish. U bir marta abort bo'lgach, keyingi barcha so'rovlar ham darhol bekor bo'ladi.
#### To'g'ri usul:
Har bir yangi fetch so'rovi uchun yangi \`new AbortController()\` yaratish.

### 5. \`clearTimeout()\` chaqirishni unutish
#### Xato:
Timeout funksiyasini yozib, fetch muvaffaqiyatli tugagandan keyin taymerni o'chirmaslik. Bu keyinchalik xotira muammolariga olib keladi.
#### To'g'ri usul:
\`try\` bloki ichida javob olinganidan keyin \`clearTimeout(id)\` ni chaqirish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`fetch()\` nima va u qanday qiymat qaytaradi?
   * **Javob:** \`fetch()\` — bu HTTP so'rovlar yuborish uchun asinxron funksiya bo'lib, u Response obyektiga resolve bo'luvchi Promise qaytaradi.
2. **Savol:** Nega \`fetch\` so'rovida 404 status kodi kelganda \`.catch()\` bloki ishga tushmaydi?
   * **Javob:** Chunki server bilan ulanish muvaffaqiyatli amalga oshgan va javob olingan. \`.catch()\` faqat tarmoq butunlay uzilib qolsa yoki ulanish imkonsiz bo'lsa ishlaydi.
3. **Savol:** POST so'rovida \`body\` nima va u qanday formatda uzatiladi?
   * **Javob:** \`body\` — bu serverga yuboriladigan ma'lumotlar tanasi. Odatda u \`JSON.stringify(obyekt)\` yordamida JSON satri ko'rinishida uzatiladi.
4. **Savol:** Fetch-da sarlavhalar (headers) nima uchun kerak?
   * **Javob:** Serverga so'rov haqida qo'shimcha metadata (ma'lumot turi, avtorizatsiya tokeni, kesh sozlamalari) uzatish uchun kerak.

### Middle (5–8)
5. **Savol:** \`AbortController\` nima va uning \`signal\` xossasi nima vazifani bajaradi?
   * **Javob:** \`AbortController\` — so'rovlarni bekor qilish imkonini beruvchi obyekt. Uning \`signal\` xossasi \`fetch\` sozlamalariga uzatiladi va controller abort bo'lganda so'rovni to'xtatish uchun aloqa kanali bo'lib xizmat qiladi.
6. **Savol:** \`response.json()\` va \`response.text()\` farqi nimada?
   * **Javob:** \`json()\` kelgan matnni avtomatik ravishda parse qilib JS obyektiga o'giradi. \`text()\` esa kelgan ma'lumotni o'zgarmagan oddiy satr sifatida qaytaradi.
7. **Savol:** Qanday qilib \`fetch\` so'rovida bir nechta so'rovlar poygasini (Race Condition) oldini olish mumkin?
   * **Javob:** Yangi so'rov jo'natishdan oldin, oldingi faol so'rovning \`AbortController\`ini chaqirib, abort qilish orqali.
8. **Savol:** \`response.ok\` nima va u qanday ishlaydi?
   * **Javob:** Bu Response obyektining o'qiladigan xossasi bo'lib, HTTP status 200 va 299 oralig'ida bo'lsa \`true\`, aks holda \`false\` bo'ladi.

### Senior (9–12)
9. **Savol:** AbortController xotira sizib chiqishini (memory leaks) qanday hal qiladi?
   * **Javob:** Sahifadan chiqib ketganda yakunlanmagan tarmoq so'rovlarini bekor qilish orqali u yopilmagan Promise-lar va ulanishlar xotirada ushlanib qolishining oldini oladi.
10. **Savol:** \`headers\` tarkibidagi \`Keep-Alive\` xossasi va fetch aloqasi qanday ishlaydi?
    * **Javob:** U HTTP ulanishni har bir so'rov uchun qayta ochmasdan, ochiq holda saqlab turishni ta'minlaydi. Modern brauzerlar buni sukut bo'yicha boshqaradi.
11. **Savol:** Custom AbortController signallari yordamida bir vaqtda 5 ta fetch so'rovidan faqat bittasini yoki hammasini qanday bekor qilish mumkin?
    * **Javob:** Agar barcha 5 ta fetch so'roviga bitta \`controller.signal\` berilgan bo'lsa, \`controller.abort()\` chaqirilganda barchasi birdaniga bekor bo'ladi. Agar alohida nazorat kerak bo'lsa, alohida controllerlar yaratilishi lozim.
12. **Savol:** Fetch API bilan Axios kutubxonasi o'rtasidagi asosiy arxitekturaviy farqlar nimada?
    * **Javob:** Axios sukut bo'yicha xato HTTP statuslarda reject bo'ladi, so'rovlarni bekor qilish uchun o'zining CancelToken-lariga ega (hozirda u ham AbortController ishlatadi), avtomatik ravishda JSON parse qiladi va Interceptor-larni qo'llab-quvvatlaydi. Fetch esa brauzer ichki standart API-si bo'lib, qo'shimcha yuklamalarsiz ishlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Qidiruv tizimida (Typeahead / Autocomplete) yuklamani kamaytirish
Foydalanuvchi inputga tez yozganda serverga ketma-ket so'rov ketadi. Biz faqat eng so'nggi so'rov javobini kutamiz, eskilarini esa bekor qilamiz.

#### Yechim (Race condition oldini olish):
\`\`\`javascript
class SearchService {
  constructor() {
    this.controller = null;
  }

  async search(query) {
    // Oldingi so'rovni bekor qilamiz
    if (this.controller) {
      this.controller.abort();
    }

    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      const response = await fetch(\`https://api.example.com/search?q=\${query}\`, { signal });
      if (!response.ok) throw new Error('Qidiruvda xatolik');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log(\`"\${query}" so'rovi bekor qilindi (eski so'rov).\`);
        return null; // Hech narsa qaytarmaymiz
      }
      throw error;
    }
  }
}

const searchService = new SearchService();
// Foydalanuvchi tez yozmoqda:
searchService.search('a');
searchService.search('ab');
searchService.search('abc'); // Faqat mana shu so'rov natijasi ekranga chiqadi
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Keshdan foydalanish:** Fetch opsiyalarida \`cache: 'force-cache'\` berish orqali tez-tez o'zgarmaydigan ma'lumotlarni tarmoqdan qayta tortmasdan brauzer keshidan olish mumkin.
* **Ulanishlarni o'chirish (Aborting):** Sahifa almashganda (SPA) o'sha sahifadagi barcha yakunlanmagan fetch so'rovlarini abort qilish mijoz kompyuteri va tarmoq resurslarini tejaydi.

---

## 10. 📌 Cheat Sheet

| Sozlama / Metod | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`method\` | HTTP metodini tanlash (GET, POST, PUT, DELETE) | \`method: 'POST'\` |
| \`headers\` | So'rov sarlavhalarini belgilash | \`headers: { 'Content-Type': 'application/json' }\` |
| \`body\` | Serverga yuboriladigan ma'lumot | \`body: JSON.stringify(data)\` |
| \`signal\` | AbortController signalini bog'lash | \`signal: controller.signal\` |
| \`controller.abort()\` | Bog'langan so'rovni zudlik bilan to'xtatish | \`controller.abort()\` |
| \`cache\` | Kesh strategiyasini belgilash | \`cache: 'no-store'\` |
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
    "id": 1,
    "question": "fetch() funksiyasi sukut bo'yicha (default) qaysi HTTP metodidan foydalanadi?",
    "options": [
      "POST",
      "GET",
      "PUT",
      "DELETE"
    ],
    "correctAnswer": 1,
    "explanation": "fetch() metodi agar options obyekti berilmasa, sukut bo'yicha har doim GET so'rovini yuboradi."
  },
  {
    "id": 2,
    "question": "Fetch so'rovida maxsus sarlavhalarni (custom headers) qaysi kalit orqali uzatamiz?",
    "options": [
      "header",
      "headers",
      "customHeaders",
      "requestHeaders"
    ],
    "correctAnswer": 1,
    "explanation": "Fetch parametrlaridagi options obyektida sarlavhalar 'headers' kaliti orqali obyekt ko'rinishida beriladi."
  },
  {
    "id": 3,
    "question": "Fetch javobidagi `response.ok` xossasi qachon `true` qiymat qaytaradi?",
    "options": [
      "Faqat HTTP status 200 bo'lganda",
      "HTTP status 200 dan 299 gacha bo'lgan oraliqda",
      "Sarlavhalar muvaffaqiyatli o'qilganda",
      "Tarmoq xatosi bo'lmagan har qanday holatda"
    ],
    "correctAnswer": 1,
    "explanation": "response.ok xossasi HTTP status kodi 200-299 oralig'ida bo'lsa true, aks holda false qaytaradi."
  },
  {
    "id": 4,
    "question": "Fetch so'rovini ma'lum muddat ichida yoki foydalanuvchi xohishiga ko'ra bekor qilish uchun qaysi API ishlatiladi?",
    "options": [
      "AbortController",
      "fetchCancel",
      "RequestController",
      "Promise.race"
    ],
    "correctAnswer": 0,
    "explanation": "AbortController JS da faol tarmoq so'rovlarini yoki boshqa asinxron ishlarni bekor qilish uchun mo'ljallangan maxsus API hisoblanadi."
  },
  {
    "id": 5,
    "question": "AbortController.abort() chaqirilganda, unga bog'langan fetch qanday xatolik tashlaydi?",
    "options": [
      "TimeoutError",
      "AbortError nomli DOMException",
      "NetworkError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "So'rov bekor qilinganda, fetch Promise-i 'AbortError' nomli DOMException bilan reject qilinadi."
  },
  {
    "id": 6,
    "question": "Fetch orqali POST so'rovi yuborilganda JavaScript obyektini body qismiga qanday joylaymiz?",
    "options": [
      "Obyektni o'zini to'g'ridan-to'g'ri body-ga beramiz",
      "JSON.stringify() yordamida satr formatiga o'tkazib beramiz",
      "Obyektni toString() metodi bilan o'giramiz",
      "Faqat URL param-lar orqali jo'natamiz"
    ],
    "correctAnswer": 1,
    "explanation": "HTTP body orqali obyekt uzatish uchun uni JSON.stringify() yordamida JSON satriga o'girish lozim."
  },
  {
    "id": 7,
    "question": "Tarmoq xatosi yuz berganda (masalan, internet butunlay uzilib qolganda) fetch() qanday yo'l tutadi?",
    "options": [
      "status: 500 bo'lgan Response qaytaradi",
      "status: 404 bo'lgan Response qaytaradi",
      "Promise reject bo'ladi va xatolik tashlanadi",
      "Sonsiz kutish rejimiga (pending) o'tadi"
    ],
    "correctAnswer": 2,
    "explanation": "Fetch server bilan umuman bog'lana olmaganda (tarmoq xatosi yoki noto'g'ri domen) Promise-ni reject qiladi. Agar server xato status (masalan 500 yoki 404) qaytarsa, u reject bo'lmaydi, balki response.ok=false bo'lib resolve bo'ladi."
  },
  {
    "id": 8,
    "question": "Quyidagilardan qaysi biri AbortController signalini fetchga to'g'ri bog'lash usuli hisoblanadi?",
    "options": [
      "fetch(url, { controller })",
      "fetch(url, { signal: controller.signal })",
      "fetch(url, controller.signal)",
      "fetch(url).abort(controller)"
    ],
    "correctAnswer": 1,
    "explanation": "AbortController obyekti yaratilgach, uning signal xossasi fetch-ning optsiyasidagi 'signal' kalitiga qiymat qilib beriladi."
  },
  {
    "id": 9,
    "question": "Fetch orqali kelgan javobni matn (text) ko'rinishida to'liq o'qish uchun qaysi metod chaqiriladi?",
    "options": [
      "response.json()",
      "response.text()",
      "response.body()",
      "response.toString()"
    ],
    "correctAnswer": 1,
    "explanation": "Response obyekti tarkibidagi text() metodi javobni oddiy matn ko'rinishida o'qib beruvchi Promise qaytaradi."
  },
  {
    "id": 10,
    "question": "`response.json()` metodi nima qaytaradi?",
    "options": [
      "Tayyor JavaScript obyekti yoki massivini",
      "Obyektga parse qiluvchi va resolve bo'luvchi Promise-ni",
      "JSON formatidagi JSON string-ni",
      "Undefined qiymatini"
    ],
    "correctAnswer": 1,
    "explanation": "response.json() asinxron metod bo'lib, u ma'lumotni parse qilib bo'lgach JS obyektini qaytaradigan Promise taqdim etadi."
  },
  {
    "id": 11,
    "question": "Agar server 404 status kodi qaytarsa, fetch() qanday holatga o'tadi?",
    "options": [
      "Promise reject holatiga o'tadi",
      "Promise resolve holatiga o'tadi, ammo response.ok=false bo'ladi",
      "Dastur darhol qotib qoladi",
      "So'rov avtomatik qaytadan yuboriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Fetch faqat tarmoq ulanishi mutlaqo bo'lmagandagina reject bo'ladi. 404 kabi server javoblari muvaffaqiyatli qabul qilingan hisoblanib, resolve bo'ladi va response.ok = false, response.status = 404 bo'ladi."
  },
  {
    "id": 12,
    "question": "Headers tarkibidagi `'Content-Type': 'application/json'` sozlamasi nimani anglatadi?",
    "options": [
      "Serverdan faqat JSON javob qabul qilinishini",
      "Yuborilayotgan request tanasi (body) JSON formatida ekanligini",
      "So'rov xavfsiz HTTPS protokoli orqali yuborilishini",
      "Brauzer keshidan ma'lumotlarni o'qishini"
    ],
    "correctAnswer": 1,
    "explanation": "Content-Type so'rov sarlavhasi jo'natilayotgan body-ning media-turini bildiradi. application/json esa ma'lumot JSON matni ekanligini anglatadi."
  }
]

};
