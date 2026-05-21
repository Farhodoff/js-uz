export const fetchApi = {
  id: "fetch-api",
  title: "🌐 Fetch API: Server bilan Aloqa",
  level: "Murakkab",
  description: "Fetch API yordamida serverga asinxron so'rovlar yuborish (GET, POST, PUT, DELETE), header va body bilan ishlash, HTTP va tarmoq xatolarini boshqarish.",
  theory: `## 1. NEGA kerak?

Zamonaviy veb-saytlar dinamik va jonli bo'lishi talab etiladi. Masalan, ijtimoiy tarmoqda yangi postlarni ko'rish yoki yangiliklarni o'qish uchun butun sahifani qayta yuklash (F5) juda noqulay va eskirgan usuldir.

**Fetch API** — bu sahifani yangilamasdan, orqa fonda (backgroundda) server bilan ma'lumot almashish imkonini beruvchi asinxron vositadir. U eski \`XMLHttpRequest\` texnologiyasining o'rniga kelgan, qulay, o'qilishi oson va Promis-larga asoslangan zamonaviy standartdir.

---

## 2. SODDALIK (Analogiya)

Fetch ishini restorandagi **ofitsiant** faoliyatiga o'xshatish mumkin:
1. **So'rov (Request):** Siz stolda o'tirib, ofitsiantga buyurtma berasiz (fetch chaqiruvi).
2. **Kutish (Pending):** Ofitsiant buyurtmangizni oshxonaga (Server) olib ketadi. Siz esa stolingizda suhbatlashib o'tiraverasiz (sayt qotib qolmaydi).
3. **Javob (Response):** Oshxona ovqatni tayyorlaydi. Ofitsiant uni sizga olib keladi (Response). Siz ovqatni yeyishni boshlaysiz (ma'lumotlarni interfeysga chiqarish).
4. **Xatolik (Error):** Agar oshxonada kebab qolmagan bo'lsa, ofitsiant sizga rad javobini beradi (Rejected).

---

## 3. STRUKTURA

### A. GET So'rov (Default holat)
\`fetch()\` metodiga faqat URL berilsa, u sukut bo'yicha ma'lumot olish so'rovini (GET) yuboradi. Tarmoqdan olingan ma'lumot oqim (stream) ko'rinishida bo'ladi, shuning uchun uni \`.json()\` yoki \`.text()\` orqali asinxron o'qib olish kerak.
\`\`\`javascript
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json(); // JS obyektiga o'giramiz
  return data;
}
\`\`\`

### B. HTTP Status va Muvaffaqiyatni Tekshirish (\`response.ok\`)
E'tibor bering: \`fetch()\` server 404 yoki 500 xato statusini qaytarganda catch blokiga **tushmaydi**. So'rov tarmoq darajasida muvaffaqiyatli yakunlansa bo'ldi. HTTP xatolarini tekshirish uchun \`response.ok\` dan foydalanamiz.
- \`response.ok\` - agar HTTP status 200-299 oralig'ida bo'lsa \`true\`, aks holda \`false\`.
- \`response.status\` - HTTP status kodi (masalan, 200, 404, 500).
\`\`\`javascript
const res = await fetch("https://api.example.com/data");
if (!res.ok) {
  throw new Error("Server xatosi: " + res.status);
}
const data = await res.json();
\`\`\`

### C. POST, PUT, DELETE So'rovlar (Sozlamalar bilan)
Ma'lumot yuborish, o'zgartirish yoki o'chirish uchun \`fetch()\`ning ikkinchi argumentiga sozlamalar obyektini uzatamiz.
- \`method\` - HTTP metodlar (\`POST\`, \`PUT\`, \`DELETE\`).
- \`headers\` - sarlavhalar. Odatda jo'natilayotgan formatni bildirish uchun \`Content-Type: application/json\` beriladi.
- \`body\` - yuborilayotgan ma'lumot. U matn formatida (\`JSON.stringify(data)\`) bo'lishi shart.
\`\`\`javascript
async function addPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer token123"
    },
    body: JSON.stringify({
      title: "Yangi Post",
      body: "Post matni"
    })
  });
  return await res.json();
}
\`\`\`

### D. Tarmoq Xatolari (Network Errors)
Tarmoq xatolari (internet yo'qligi, server o'chganligi, DNS xatosi) yuz berganda \`fetch()\` asinxron xato tashlaydi va bu xatolarni \`try...catch\` bilan ushlaymiz.
\`\`\`javascript
try {
  const res = await fetch("https://non-existent-domain.xyz");
  const data = await res.json();
} catch (error) {
  console.log("Tarmoq ulanishida muammo bor:", error.message);
}
\`\`\`

---

## 4. AMALIYOT

Dasturlarda ma'lumot yuklanayotganda yuklanish holatini (Loading) va xatoliklarni chiroyli ko'rsatish standart pattern hisoblanadi:
\`\`\`javascript
let isLoading = false;
let errorMessage = "";

async function loadProducts() {
  isLoading = true;
  errorMessage = "";
  try {
    const res = await fetch("https://api.example.com/products");
    if (!res.ok) throw new Error("Yuklab bo'lmadi");
    const products = await res.json();
    displayProducts(products);
  } catch (err) {
    errorMessage = err.message;
    showError(errorMessage);
  } finally {
    isLoading = false;
    hideLoadingSpinner();
  }
}
\`\`\`

---

## 5. XATOLAR (Common Mistakes)

1. **\`res.json()\` da \`await\` yozishni unutish:**
   \`\`\`javascript
   // XATO: json() ham Promise qaytaradi
   const data = res.json(); 
   
   // TO'G'RI
   const data = await res.json();
   \`\`\`
2. **404 xatosi catch-ga tushadi deb o'ylash:**
   \`fetch()\` faqat so'rov umuman bajarilmay qolsa reject bo'ladi. HTTP 404 yoki 500 statuslarida u catch-ga tushmaydi. Shuning uchun har doim \`response.ok\` tekshirilishi kerak.
3. **POST so'rovida body-ni stringify qilmaslik:**
   \`\`\`javascript
   // XATO: obyektni to'g'ridan-to'g'ri jo'natib bo'lmaydi
   body: { title: "Salom" } 
   
   // TO'G'RI
   body: JSON.stringify({ title: "Salom" })
   \`\`\`

---

## 6. SAVOLLAR VA JAVOBLAR

**1. fetch() nima vazifani bajaradi?**
Brauzer orqali tarmoq bo'ylab serverga HTTP so'rovlar yuborish va javoblarni qabul qilish uchun xizmat qiladigan zamonaviy asinxron interfeysdir.

**2. fetch() so'rovining sukut bo'yicha HTTP metodi qaysi?**
Sukut bo'yicha (default) GET metodi ishlatiladi, ya'ni serverdan ma'lumot olish so'raladi.

**3. fetch() qaytaradigan javobni (response) to'g'ridan-to'g'ri o'qib bo'ladimi? Nima uchun .json() kerak?**
Yo'q, chunki javob oqim (stream) ko'rinishida keladi. .json() yoki .text() metodlari bu oqimni to'liq o'qib, mos ravishda JS obyektiga yoki matnga o'girib beradi. Ular ham asinxron bo'lgani uchun await qilinishi shart.

**4. response.ok xususiyati nima va u qachon true bo'ladi?**
Bu so'rov muvaffaqiyatli yakunlanganini bildiruvchi boolean qiymat. HTTP status kodi 200-299 oralig'ida bo'lsa, u true bo'ladi, aks holda false bo'ladi.

**5. Server 404 (Topilmadi) yoki 500 (Server xatosi) qaytarsa, fetch() catch blokiga tushadimi?**
Yo'q! fetch() faqat tarmoq ulanishi yo'qolsa, DNS xatosi bo'lsa yoki so'rov to'xtatilsagina reject bo'ladi (catch-ga tushadi). HTTP xato statuslarida esa muvaffaqiyatli yakunlanadi va faqat response.ok false bo'ladi.

**6. POST yoki PUT so'rovlarida body qanday shaklda jo'natiladi?**
Odatda obyektdan string ko'rinishiga o'tkazilgan JSON matni shaklida jo'natiladi: body: JSON.stringify(data).

**7. headers (sarlavhalar) nima uchun kerak?**
So'rov haqidagi meta-ma'lumotlarni, masalan, yuborilayotgan ma'lumot turini (Content-Type: application/json) yoki foydalanuvchini identifikatsiya qilish uchun tokenlarni (Authorization) yuborish uchun ishlatiladi.

**8. Tarmoq xatosi (network error) va HTTP xato statusi farqi nimada?**
Tarmoq xatosi - internet yo'qligi yoki server umuman javob bermasligi bo'lib, fetch-da reject (catch) chaqiradi. HTTP xatosi esa server javob bergani lekin so'ralgan resurs xato ekanini bildiradi (ok: false).

**9. So'rov yuborilganda foydalanuvchi interfeysida loading (yuklanmoqda) holati qanday tashkil etiladi?**
So'rov boshlanishidan oldin loading o'zgaruvchisi true qilinadi, so'rov yakunlangach (try/catch tugagach, yoki finally ichida) false qilinadi.

**10. response.blob() nima uchun ishlatiladi?**
Serverdan rasm, audio, video yoki fayl kabi ikkilik (binary) ma'lumotlarni yuklab olish va ularni brauzerda qayta ishlash uchun ishlatiladi.

**11. fetch yordamida yuborilgan so'rovni qanday qilib bekor qilish (abort qilish) mumkin?**
AbortController obyektidan foydalanib. Controllerdan signal olinib, fetch sozlamalariga beriladi va kerak bo'lganda controller.abort() chaqiriladi.

**12. fetch orqali DELETE so'rovi qanday yuboriladi?**
Sozlamalar obyektida method: "DELETE" ko'rsatiladi. Odatda delete so'rovida body yuborilmaydi, faqat URL oxirida o'chirilishi kerak bo'lgan ID beriladi.
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
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`fetch()` metodi serverga tarmoq so'rovini yuborib default holatda nima qaytaradi?",
      options: [
        "Serverdan kelgan JSON matnini",
        "Promise (u hal bo'lganda Response obyekti qaytadi)",
        "JavaScript obyekti",
        "Faqat status kodi"
      ],
      correctAnswer: 1,
      explanation: "`fetch()` har doim asinxron Promise qaytaradi. U muvaffaqiyatli yakunlanganda Response obyektini saqlaydi."
    },
    {
      id: 2,
      question: "Nima uchun `response.json()` metodidan oldin ham `await` kalit so'zini yozish kerak?",
      options: [
        "Bu JavaScript-ning majburiy qoidasi",
        "`response.json()` ham asinxron bo'lib, o'qib tugatilgandan keyin Promise qaytaradi",
        "Hech qanday sabab yo'q, xohlasak yozmasligimiz mumkin",
        "Sinxron ishlashini ta'minlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Body ma'lumotlarini to'liq o'qish va JSON sifatida parse qilish vaqt oladi, shuning uchun bu jarayon asinxron Promise qaytaradi."
    },
    {
      id: 3,
      question: "`response.ok` xususiyati qaysi HTTP status kodlari oralig'ida `true` bo'ladi?",
      options: [
        "Faqat 200 da",
        "200 dan 299 gacha",
        "100 dan 500 gacha",
        "Faqat 304 da"
      ],
      correctAnswer: 1,
      explanation: "`response.ok` HTTP status kodi muvaffaqiyatli (200-299) bo'lganda true qiymatini saqlaydi."
    },
    {
      id: 4,
      question: "Server 500 (Internal Server Error) qaytarganda `fetch()` so'rovi qanday yakunlanadi?",
      options: [
        "Muvaffaqiyatli yakunlanadi, ammo `response.ok` false bo'ladi",
        "Rad etiladi va catch blokiga o'tadi",
        "So'rov abadiy kutish rejimiga o'tadi",
        "Brauzer sahifani avtomatik yangilaydi"
      ],
      correctAnswer: 0,
      explanation: "Server javob berganligi sababli fetch muvaffaqiyatli tugaydi (catchga tushmaydi). Faqat xato kod bo'lgani uchun `ok` xususiyati false bo'ladi."
    },
    {
      id: 5,
      question: "`POST` so'rovida ma'lumot yuborishda `body` xususiyatiga qanday qiymat beriladi?",
      options: [
        "JavaScript obyekti",
        "JSON.stringify() orqali string-ga o'tkazilgan obyekt matni",
        "Faqat massiv",
        "Faqat fayl (file) formati"
      ],
      correctAnswer: 1,
      explanation: "Tarmoq orqali yuborilayotgan ma'lumotlar matn (string) shaklida bo'lishi lozim. Shuning uchun obyekt `JSON.stringify` qilinadi."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri fetch() catch blokiga tushadigan (reject bo'ladigan) holat hisoblanadi?",
      options: [
        "Server 404 (Not Found) statusini qaytarganda",
        "Server 500 (Server Error) statusini qaytarganda",
        "Tarmoq ulanishi yo'qolganda yoki DNS xatosi sababli so'rov serverga yetib bormaganda",
        "Foydalanuvchi ma'lumotlari noto'g'ri bo'lganda"
      ],
      correctAnswer: 2,
      explanation: "fetch() faqat tarmoq darajasida uzilish yuz bergandagina (so'rov yakuniga yetmasa) reject bo'ladi va catch blokiga o'tadi."
    },
    {
      id: 7,
      question: "`Content-Type: application/json` sarlavhasi (header) nima uchun jo'natiladi?",
      options: [
        "Foydalanuvchini autentifikatsiya qilish uchun",
        "Serverga yuborilayotgan ma'lumot formati JSON ekanligini bildirish uchun",
        "So'rovni bekor qilish uchun",
        "CORS xatosini oldini olish uchun"
      ],
      correctAnswer: 1,
      explanation: "Ushbu sarlavha serverga yuborilayotgan body tarkibi JSON formatida ekanini tushunishga va uni to'g'ri parse qilishga yordam beradi."
    },
    {
      id: 8,
      question: "`fetch` yordamida yuborilgan so'rovni qanday bekor qilish mumkin?",
      options: [
        "`fetch.stop()` chaqirish orqali",
        "`AbortController` va uning `signal` xususiyati yordamida",
        "Sahifani yangilash orqali",
        "So'rovni bekor qilib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "AbortController signalini fetch-ga ulab, keyinchalik `controller.abort()` chaqirish orqali faol so'rovni to'xtatish mumkin."
    },
    {
      id: 9,
      question: "Serverdan kelgan rasm yoki PDF faylni o'qish uchun response-ning qaysi metodidan foydalaniladi?",
      options: [
        "`.json()`",
        "`.text()`",
        "`.blob()`",
        "`.html()`"
      ],
      correctAnswer: 2,
      explanation: "Ikkilik (binary) ko'rinishdagi ma'lumotlarni o'qish uchun `.blob()` (Binary Large Object) metodi ishlatiladi."
    },
    {
      id: 10,
      question: "CORS (Cross-Origin Resource Sharing) nima?",
      options: [
        "Tarmoq ma'lumotlarini shifrlash vositasi",
        "Xavfsizlik nuqtai nazaridan bir domendan boshqa domenga so'rov yuborishni cheklovchi/tartibga soluvchi brauzer mexanizmi",
        "Yangi HTTP protokoli",
        "JSON-ga o'xshash ma'lumot formati"
      ],
      correctAnswer: 1,
      explanation: "CORS — brauzerlar xavfsizligini ta'minlash maqsadida boshqa manbalardan ma'lumot yuklashni cheklovchi xavfsizlik qoidasidir."
    },
    {
      id: 11,
      question: "Authorization sarlavhasida Token yuborish uchun qaysi format ko'p ishlatiladi?",
      options: [
        "`Token mytoken123`",
        "`Bearer mytoken123`",
        "`Auth mytoken123`",
        "`Key mytoken123`"
      ],
      correctAnswer: 1,
      explanation: "Veb standartlarida ko'pincha tokenlar Authorization headerida `Bearer <token>` ko'rinishida yuboriladi."
    },
    {
      id: 12,
      question: "So'rov parametrlarini (query parameters, masalan `?limit=10&page=2`) fetch-da qanday yuboramiz?",
      options: [
        "Body ichiga qo'shib",
        "URL oxiriga string ko'rinishida yoki URLSearchParams yordamida qo'shib",
        "Headers ichida",
        "Parametrlarni yuborib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Query parametrlari GET so'rovlarida to'g'ridan-to'g'ri URL manzilining oxiriga qo'shib yuboriladi."
    }
  ]
};