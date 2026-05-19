export const advancedFetch = {
  id: "a19",
  title: "Ilg'or Fetch: Timeout, Retry va Xatolar",
  theory: `## 1. KIRISH
Oddiy \`fetch()\` faqat internet o'chsa yoki server topilmasa xato (reject) beradi. Agar server 404 yoki 500 xato bersa ham, \`fetch\` uni "muvaffaqiyatli" deb hisoblaydi. Real loyihalarda bizga bunday "baxtli yakunlar" yetarli emas.

## 2. CHUQUR TUSHUNCHALAR

### Request Timeout (AbortController)
Agar so'rov juda uzoq davom etsa (masalan 5 soniya), uni to'xtatish kerak. Aks holda foydalanuvchi cheksiz kutib qoladi.

### Retry Mexanizmi
Internet uzilib qolsa yoki server vaqtinchalik ishlamasa, avtomatik ravishda qayta so'rov yuborish.

### HTTP Xatolarni Tekshirish
\`res.ok\` xususiyati orqali status kod 200-299 oralig'ida ekanligini tekshirish shart.

---

## 3. KOD MISOLLARI

### Misol 1 — Request Timeout (AbortController) ⭐
\`\`\`javascript
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error("Vaqt tugadi (Timeout)!");
    }
    throw err;
  }
}
\`\`\`

### Misol 2 — Retry (Qayta urinish) Mexanizmi
\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Server xatosi: " + res.status);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(\`Qayta urinish... (\${i + 1})\`);
    }
  }
}
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Xatolarni Boshqarish Oqimi
\`\`\`mermaid
graph TD
    A[Fetch Request] --> B{Tarmoq bormi?}
    B -- Yo'q --> C[catch: Network Error]
    B -- Ha --> D{res.ok?}
    D -- Yo'q 404/500 --> E[throw: Custom Error]
    D -- Ha 200 --> F[res.json]
    F --> G[Muvaffaqiyat ✅]
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Fetch qachon reject bo'ladi?** - Faqat tarmoq xatosi bo'lganda (internet yo'qligi). HTTP 404/500 xatolarida reject bo'lmaydi.
2. **AbortController nima uchun kerak?** - Ishlab turgan fetch so'rovini istalgan vaqtda (masalan, timeout bo'lganda) to'xtatish uchun.
3. **Promise.race() bilan timeout qilsa bo'ladimi?** - Bo'ladi, lekin u so'rovni to'xtatmaydi, shunchaki natijani kutmaydi. \`AbortController\` esa haqiqatda so'rovni uzadi.

---

## 6. MINI LOYIHA: "Robust API Client"
**Vazifa:** Xavfsiz fetch funksiyasini yozing.

\`\`\`javascript
async function secureGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
       throw new Error(\`HTTP xatosi! Status: \${res.status}\`);
    }
    return await res.json();
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
}
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "res.ok tekshiruvi",
      instruction: "Fetch so'rovida res.ok false bo'lsa, xato tashlaydigan (throw) kod yozing.",
      startingCode: "fetch(url).then(res => {\n  // Bu yerada tekshiring\n});",
      hint: "if (!res.ok) throw new Error('Xato');",
      test: "if (code.includes('res.ok')) return null; return 'res.ok xususiyatini tekshiring';"
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
      explanation: "`fetch()` HTTP status kodlaridan (masalan, 404 yoki 500) qat'i nazar, agar server javob qaytarsa Promiseni muvaffaqiyatli (`resolve`) deb biladi. U faqat tarmoq butunlay uzilganda yoki serverga bog'lanib bo'lmaganda (`reject`) xato beradi."
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
      explanation: "`AbortController` yordamida signal obyekti yaratilib, `fetch` parametrlariga uzatiladi. Keyinchalik `controller.abort()` chaqirilganda so'rov darhol to'xtatiladi va 'AbortError' xatoligi tashlanadi."
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
    }
  ]
};
