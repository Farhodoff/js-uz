export const localStorageLesson = {
  id: "local-storage",
  title: "Brauzer xotirasi (LocalStorage, SessionStorage va Cookies)",
  level: "Murakkab",
  description: "Ma'lumotlarni brauzerda doimiy va vaqtinchalik saqlash usullari hamda Cookies xavfsizligi.",
  theory: `## 1. NEGA kerak?

Veb-saytga kirganingizda, sayt sizning tanlagan tilingizni yoki tungi rejim (dark mode) sozlamangizni eslab qolishi kerak. Agar bu ma'lumotlarni hech qayerda saqlamasangiz, sahifa yangilanganda hamma narsa dastlabki holatiga qaytib qoladi. Har bir kichik sozlama yoki foydalanuvchi sessiyasini saqlash uchun serverdagi ma'lumotlar bazasiga murojaat qilish vaqt va resurs sarfini oshiradi. Brauzer xotirasi bunday holatlar uchun ayni muddaodir.

---

## 2. SODDALIK (Analogiya)

Brauzerdagi xotiralarni quyidagicha tushunish mumkin:
- **LocalStorage:** Bu sizning uyingizdagi shaxsiy esdalik daftaringiz. Unga yozilgan narsalar siz o'zingiz uni o'chirmaguningizcha muddatsiz saqlanib turaveradi.
- **SessionStorage:** Bu o'quv xonasidagi oq doska. Dars tugab, xonani tark etishingiz (tab yoki brauzerni yopishingiz) bilan doska o'chirib tozalanadi.
- **Cookies (Kuki):** Bu mehmonxonada berilgan elektron kalit-karta. Har safar xonaga kirmoqchi bo'lganingizda (serverga so'rov yuborganda), bu karta sizning kimligingizni tasdiqlash uchun tizimga uzatiladi.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. LocalStorage va SessionStorage Metodlari
Ikkala xotira turi ham bir xil metodlar yordamida boshqariladi:
\`\`\`javascript
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();
\`\`\`

### B. QuotaExceededError (Xotira limitsiz emas!)
Brauzer xotiralari o'rtacha **5-10 MB** hajmgacha ma'lumot sig'dira oladi. Agar siz ushbu limitdan ko'p ma'lumot yozmoqchi bo'lsangiz, JavaScript \`QuotaExceededError\` xatosini otadi. Shuning uchun ma'lumotlarni yozishda try...catch bloklaridan foydalanish tavsiya etiladi:
\`\`\`javascript
try {
  localStorage.setItem("key", bigData);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error("Xotira to'ldi!");
  }
}
\`\`\`

### C. Multi-Tab Storage Event (Oynalararo Sinxronizatsiya)
Agar bir xil domen ostida foydalanuvchi bir nechta tab ochgan bo'lsa va ulardan birida LocalStorage yangilansa, qolgan barcha ochiq tablarda \`storage\` hodisasi triggering bo'ladi. Bu oynalararo dark/light rejimni yoki savatchadagi mahsulotlarni sinxronlashda juda qulay.

\`\`\`mermaid
sequenceDiagram
    participant Tab A as Brauzer Tab A
    participant LocalStorage as LocalStorage Xotira
    participant Tab B as Brauzer Tab B
    Tab A->>LocalStorage: setItem('theme', 'dark')
    LocalStorage-->>Tab B: window.onstorage (storage event) trigger bo'ladi
    Note over Tab B: Tab B dark mode-ga o'tadi
\`\`\`

### D. Cookie Atributlari va Xavfsizlik (XSS va CSRF)
Kuki — server tomonidan o'rnatiladigan va har safar HTTP so'rov yuborilganda brauzer tomonidan avtomatik qo'shib yuboriladigan kichik ma'lumot bo'lagi (4 KB).
* **\`HttpOnly\`:** Ushbu atribut o'rnatilgan kukilarni JavaScript orqali (ya'ni \`document.cookie\` bilan) o'qib bo'lmaydi. Bu **XSS (Cross-Site Scripting)** hujumlaridan himoya qilishda o'ta muhim.
* **\`Secure\`:** Kuki faqat shifrlangan HTTPS ulanishi orqali uzatilishini ta'minlaydi.
* **\`SameSite\`:** Kuki uchinchi tomon so'rovlarida yuborilishini boshqaradi (\`Strict\`, \`Lax\`, \`None\`). Bu **CSRF (Cross-Site Request Forgery)** hujumlaridan himoya qiladi.

\`\`\`mermaid
graph TD
    A[Brauzer Xotira Turlari] --> B[Web Storage]
    A --> C[Cookies]
    B --> D[LocalStorage - Muddatsiz, 5-10MB]
    B --> E[SessionStorage - Tab yopilguncha, 5MB]
    C --> F[HttpOnly - JS uchun yopiq, 4KB]
    C --> G[Secure - Faqat HTTPS]
    C --> H[SameSite - CSRF himoyasi]
\`\`\`

---

## 4. XATOLAR (Common Mistakes)
1. **Obyektlarni to'g'ridan-to'g'ri stringify-siz yozish:** \`[object Object]\` bo'lib saqlanishi.
2. **Maxfiy ma'lumotlarni saqlash:** LocalStorage JavaScript uchun ochiq bo'lgani uchun unda parollar yoki auth-tokenlarni saqlash xavflidir.

---

## 5. SAVOLLAR VA JAVOBLAR

**1. LocalStorage va SessionStorage asosiy farqi nima?**
LocalStorage doimiy xotira bo'lib, oyna yopilsa ham saqlanadi. SessionStorage esa faqat o'sha oyna/tab ochiq turguncha saqlanadi, tab yopilganda o'chadi.

**2. LocalStorage limit sig'imi to'lganda nima yuz beradi?**
Dasturda \`QuotaExceededError\` nomli runtime xatolik yuz beradi va ma'lumot saqlanmaydi.

**3. Same-Origin Policy nima?**
Xavfsizlik qoidasi bo'lib, unga ko'ra har bir sayt faqat o'zining port, protokol va domen manziliga tegishli LocalStorage xotirasiga kira oladi. Boshqa saytlar xotirani o'qiy olmaydi.

**4. HttpOnly kukilar nima uchun xavfsizroq?**
Chunki bu atribut kuki ma'lumotlarini JavaScript (\`document.cookie\`) yordamida o'g'irlanishini butunlay cheklaydi.
`,
  exercises: [
    {
      id: 1,
      title: "Ma'lumot saqlash",
      instruction: "LocalStorage'ga 'theme' kaliti bilan 'dark' qiymatini saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.setItem('theme', 'dark');",
      test: "if (code.includes('setItem')) return null; return 'setItem ishlatilmadi';"
    },
    {
      id: 2,
      title: "Obyektni saqlash",
      instruction: "JSON.stringify yordamida 'car' obyektini saqlang.",
      startingCode: "const car = { model: 'BYD' };\n// Saqlang\n",
      hint: "localStorage.setItem('car', JSON.stringify(car));",
      test: "if (code.includes('JSON.stringify')) return null; return 'JSON.stringify ishlatilmadi';"
    },
    {
      id: 3,
      title: "Ma'lumotni o'chirish",
      instruction: "LocalStorage'dan 'user' kalitini o'chirib tashlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.removeItem('user');",
      test: "if (code.includes('removeItem')) return null; return 'removeItem ishlatilmadi';"
    },
    {
      id: 4,
      title: "Ma'lumotni olish",
      instruction: "LocalStorage'dan 'theme' kaliti qiymatini oling va uni 'myTheme' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const myTheme = localStorage.getItem('theme');",
      test: "if (code.includes('getItem') && code.includes('theme')) return null; return 'getItem(\\'theme\\') orqali theme\\'ni oling';"
    },
    {
      id: 5,
      title: "Obyektni o'qish va parse qilish",
      instruction: "LocalStorage'dan 'car' kalitini oling va uni JSON.parse yordamida obyektga o'tkazib 'carObj' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const carObj = JSON.parse(localStorage.getItem('car'));",
      test: "if (code.includes('JSON.parse') && code.includes('getItem')) return null; return 'JSON.parse va getItem orqali obyektingizni parse qiling';"
    },
    {
      id: 6,
      title: "SessionStorage yozish",
      instruction: "SessionStorage'ga 'session_id' kaliti bilan 'xyz123' qiymatini saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "sessionStorage.setItem('session_id', 'xyz123');",
      test: "if (code.includes('sessionStorage.setItem') && code.includes('session_id')) return null; return 'sessionStorage.setItem ishlatilmadi';"
    },
    {
      id: 7,
      title: "Kuki yozish",
      instruction: "document.cookie orqali 'username=Farhod' kuki qiymatini yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "document.cookie = 'username=Farhod';",
      test: "if (code.includes('document.cookie') && code.includes('username=Farhod')) return null; return 'document.cookie ga username=Farhod qo\\'shing';"
    },
    {
      id: 8,
      title: "Max-Age bilan kuki yozish",
      instruction: "document.cookie orqali 'user=Ali' kukisini uning yashash muddatini 3600 soniya qilib belgilang (max-age=3600).",
      startingCode: "// Bu yerga yozing\n",
      hint: "document.cookie = 'user=Ali; max-age=3600';",
      test: "if (code.includes('document.cookie') && code.includes('max-age=3600')) return null; return 'max-age=3600 bilan kuki yozing';"
    },
    {
      id: 9,
      title: "Balla LocalStorage'ni tozalash",
      instruction: "LocalStorage'dagi barcha ma'lumotlarni tozalash uchun tegishli metodni chaqiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.clear();",
      test: "if (code.includes('localStorage.clear()')) return null; return 'localStorage.clear() chaqirilmadi';"
    },
    {
      id: 10,
      title: "LocalStorage hajmini tekshirish",
      instruction: "LocalStorage'da nechta kalit saqlanganligini (length) 'len' o'zgaruvchisiga oling.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const len = localStorage.length;",
      test: "if (code.includes('localStorage.length')) return null; return 'localStorage.length ishlating';"
    },
    {
      id: 11,
      title: "Index bo'yicha kalit nomini olish",
      instruction: "LocalStorage'dagi birinchi kalit nomini (index 0) .key() metodi yordamida 'firstKey' o'zgaruvchisiga oling.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const firstKey = localStorage.key(0);",
      test: "if (code.includes('localStorage.key(0)')) return null; return 'localStorage.key(0) ishlating';"
    },
    {
      id: 12,
      title: "SessionStorage'ni butunlay tozalash",
      instruction: "SessionStorage'dagi barcha ma'lumotlarni tozalang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "sessionStorage.clear();",
      test: "if (code.includes('sessionStorage.clear()')) return null; return 'sessionStorage.clear() chaqirilmadi';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Xavfsiz Yozish Wrapper (safeSetItem)",
      instruction: "LocalStorage limitdan oshganda `QuotaExceededError` xatosini tashlaydi. Agar yozish jarayonida xato bo'lsa (quota exceeded), uni tutib `false` qaytaradigan, muvaffaqiyatli yozilsa `true` qaytaradigan `safeSetItem(key, value)` funksiyasini yozing.",
      startingCode: "function safeSetItem(key, value) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { localStorage.setItem(key, value); return true; } catch (e) { return false; }",
      test: "if (typeof safeSetItem !== 'function') return 'safeSetItem funksiya emas';\nconst success = safeSetItem('test_key', 'val');\nif (success && localStorage.getItem('test_key') === 'val') return null;\nreturn 'Yozish xato bajarildi';"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Kuki Parser Helper (parseCookie)",
      instruction: "Brauzerning `document.cookie` satrini (`key1=val1; key2=val2` formatida) parse qilib, obyekt ko'rinishida qaytaruvchi `parseCookie(cookieStr)` funksiyasini yozing.",
      startingCode: "function parseCookie(cookieStr) {\n  // Kodni shu yerdan yozing\n}",
      hint: "if (!cookieStr) return {}; return cookieStr.split(';').reduce((acc, current) => { const [key, val] = current.trim().split('='); if (key) acc[key] = val || ''; return acc; }, {});",
      test: "if (typeof parseCookie !== 'function') return 'parseCookie funksiya emas';\nconst parsed = parseCookie('user=Ali; theme=dark');\nif (parsed && parsed.user === 'Ali' && parsed.theme === 'dark') return null;\nreturn 'Kuki parse qilish xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`LocalStorage` va `SessionStorage` o'rtasidagi eng asosiy farq nima?",
      options: [
        "LocalStorage ma'lumotlarni faqat massiv ko'rinishida saqlaydi, SessionStorage esa faqat obyekt ko'rinishida",
        "LocalStorage'dagi ma'lumotlar foydalanuvchi yoki kod orqali o'chirilmaguncha muddatsiz saqlanadi, SessionStorage esa tab yoki brauzer yopilishi bilan o'chib ketadi",
        "SessionStorage xavfsizroq va parollarni saqlash uchun mo'ljallangan",
        "LocalStorage faqat serverda, SessionStorage esa faqat client-side'da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "LocalStorage doimiy xotira bo'lib, kompyuter o'chib yonsa ham o'chmaydi (kod orqali yoki qo'lda tozalanmaguncha). SessionStorage esa faqat o'sha tab ochiq turganda saqlanib turadi."
    },
    {
      id: 2,
      question: "`LocalStorage`ga JavaScript obyektini (`const user = { name: 'Ali' }`) saqlamoqchi bo'lsak, nima uchun `JSON.stringify()` ishlatishimiz shart?",
      options: [
        "Chunki LocalStorage faqat matnli (string) ma'lumotlarni saqlashga moslashgan, aks holda obyekt `[object Object]` shaklida saqlanib qoladi",
        "Chunki bu xotirada joyni 10 barobargacha tejaydi",
        "Chunki u ma'lumotlarni shifrlaydi (encrypt)",
        "JSON ishlatilmasa brauzer avtomatik ravishda sahifani bloklaydi"
      ],
      correctAnswer: 0,
      explanation: "Veb-xotiraga faqat kalit-qiymat ko'rinishidagi stringlar saqlanadi. Obyektlarni saqlashdan oldin `JSON.stringify` orqali string formatiga aylantirish, o'qiyotganda esa `JSON.parse` yordamida obyekt holiga qaytarish zarur."
    },
    {
      id: 3,
      question: "`LocalStorage`ning o'rtacha sig'im limiti (storage limit) qancha?",
      options: [
        "5-10 KB",
        "5-10 MB",
        "1-2 GB",
        "Cheksiz"
      ],
      correctAnswer: 1,
      explanation: "LocalStorage juda katta hajmdagi ma'lumotlar uchun mo'ljallagannmagan. Brauzerlar odatda har bir origin uchun 5 dan 10 MB gacha bo'lgan limit o'rnatishadi."
    },
    {
      id: 4,
      question: "Brauzer xotirasidan barcha ma'lumotlarni bitta operatsiya bilan butunlay tozalash uchun qaysi metod ishlatiladi?",
      options: [
        "`localStorage.removeAll()`",
        "`localStorage.clear()`",
        "`localStorage.delete()`",
        "`localStorage.reset()`"
      ],
      correctAnswer: 1,
      explanation: "`localStorage.clear()` metodi o'sha origin (domen) uchun saqlangan barcha kalit va qiymatlarni butunlay tozalab tashlaydi."
    },
    {
      id: 5,
      question: "Bir xil domendagi boshqa tab yoki oynada `LocalStorage` ma'lumotlari o'zgarganda, buni real-vaqtda kuzatib borish uchun qaysi hodisadan (event) foydalanish mumkin?",
      options: [
        "`change` event",
        "`storage` event",
        "`update` event",
        "`load` event"
      ],
      correctAnswer: 1,
      explanation: "Brauzerda `storage` event hodisasi mavjud. Agar bitta saytning bir nechta tabi ochiq bo'lsa va birida `localStorage` o'zgartirilsa, qolgan tablar buni `window.addEventListener('storage', callback)` orqali eshitib, mos ravishda ish tutishi mumkin."
    },
    {
      id: 6,
      question: "Kukilar (Cookies)ning odatiy maksimal hajmi (sig'im limiti) qancha bo'ladi?",
      options: [
        "taxminan 4 KB",
        "taxminan 5 MB",
        "taxminan 100 KB",
        "Cheksiz"
      ],
      correctAnswer: 0,
      explanation: "Cookies vaqtinchalik va real vaqtda HTTP request-lar bilan serverga avtomatik yuklanganligi sababli, ularning hajmi 4 KB bilan cheklangan."
    },
    {
      id: 7,
      question: "Kukilarning `HttpOnly` sarlavha atributining asosiy xavfsizlik afzalligi nima?",
      options: [
        "Kukini shifrlash tezligini oshiradi",
        "JavaScript kodi (document.cookie) orqali kuki qiymatlarini o'qishni taqiqlaydi va XSS o'g'irligini oldini oladi",
        "Kukilarni faqat mobil qurilmalarda ko'rsatadi",
        "CORS xatosini butunlay yo'qotadi"
      ],
      correctAnswer: 1,
      explanation: "HttpOnly atributi kuki qiymatlarini JavaScript kirishidan to'liq berkitadi va browser darajasida XSS xavfidan himoyalaydi."
    },
    {
      id: 8,
      question: "Cookies limit to'lib ketganda yoki QuotaExceededError yuz berganda xavfsiz setItem wrapper yozish nega muhim?",
      options: [
        "Dastur sinxron ravishda to'xtab qolmasligi va ma'lumot saqlanmaganda fallback boshqaruvini amalga oshirish uchun",
        "LocalStorage hajmini 10MB dan oshirish uchun",
        "Brauzerni tezkor refresh qilish uchun",
        "CSS stillarini o'zgartirish uchun"
      ],
      correctAnswer: 0,
      explanation: "QuotaExceededError tutilmasa, dastur kutilmaganda sinxron crash bo'ladi. Xavfsiz wrapper buni aniqlab, boshqa muqobil reja ishlatishga imkon beradi."
    },
    {
      id: 9,
      question: "document.cookie ga yangi qiymat berilganda (masalan, key=value) eski kukilar o'chib ketadimi?",
      options: [
        "Ha, barcha eski kukilar tozalab tashlanadi",
        "Yo'q, brauzer yangi kukini mavjud kukilar ro'yxatiga qo'shib qo'yadi (append qiladi)",
        "Faqat HttpOnly bo'lmasa o'chadi",
        "Faqat Secure o'rnatilgan bo'lsa o'chadi"
      ],
      correctAnswer: 1,
      explanation: "document.cookie xususiyati setter kabi ishlaydi, ammo u to'liq satrni o'zgartirmaydi, balki berilgan yangi kuki kalitini qo'shadi yoki eskisini yangilaydi."
    },
    {
      id: 10,
      question: "Ayni joriy sahifaning o'zida sodir bo'lgan LocalStorage o'zgarishi shu sahifadagi window 'storage' eventini ishga tushiradimi?",
      options: [
        "Ha, har doim ishlaydi",
        "Yo'q, storage hodisasi faqat boshqa tablar yoki oynalardagi o'zgarishlar uchun trigger bo'ladi",
        "Faqat iframe ichida ishlasa trigger bo'ladi",
        "Faqat secure kuki bo'lsa ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Qoidaga ko'ra, joriy oynaning o'zida yuz bergan o'zgarish joriy oynadagi 'storage' listenerini trigger qilmaydi, faqat boshqa ochiq tablarda trigger bo'ladi."
    },
    {
      id: 11,
      question: "CSRF (Cross-Site Request Forgery) hujumlaridan himoyalanishda kuki faylining qaysi atributi yordam beradi?",
      options: [
        "Secure",
        "HttpOnly",
        "SameSite (Strict/Lax)",
        "Max-Age"
      ],
      correctAnswer: 2,
      explanation: "SameSite atributi uchinchi tomon so'rovlarida kuki yuborilishini boshqaradi va bu orqali CSRF xavfini kamaytiradi."
    },
    {
      id: 12,
      question: "Cookies secure atributi nimani kafolatlaydi?",
      options: [
        "Kukini shifrlanganligini",
        "Kuki faqat HTTPS protokoli orqali serverga uzatilishini",
        "JavaScript kuki kirishini to'xtatishini",
        "Kuki muddati cheksizligini"
      ],
      correctAnswer: 1,
      explanation: "Secure atributi kuki faqat HTTPS (xavfsiz shifrlangan kanal) orqali yuborilishini ta'minlaydi."
    },
    {
      id: 13,
      question: "Veb-xotiraga katta ma'lumot yozayotganda QuotaExceededError xatosini qaysi catch sharti bilan ushlash maqsadga muvofiq?",
      options: [
        "e.name === 'QuotaExceededError' yoki e.code === 22",
        "e.message === 'Failed'",
        "e instanceof TypeError",
        "e instanceof ReferenceError"
      ],
      correctAnswer: 0,
      explanation: "Brauzer xotira limiti to'lganda aynan 'QuotaExceededError' nomli xatoni (yoki eski brauzerlarda kod 22) otadi."
    },
    {
      id: 14,
      question: "Same-Origin Policy qoidasiga ko'ra, qaysi uchta qiymat mos kelgandagina boshqa oyna LocalStorage-ni o'qiy oladi?",
      options: [
        "Domen nomi, Port va Protokol (schema)",
        "IP address, operatsion tizim va brauzer turi",
        "URL, sarlavhalar va HTTP metod",
        "Faqat URL va sarlavhalar"
      ],
      correctAnswer: 0,
      explanation: "Same-Origin (bir xil manba) qoidasi protokol (http/https), domen (example.com) va port (:80/:443) to'liq mos kelishini talab qiladi."
    }
  ]
};
