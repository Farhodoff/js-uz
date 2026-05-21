export const localStorageLesson = {
  id: "local-storage",
  title: "Brauzer xotirasi (LocalStorage, SessionStorage va Cookies)",
  level: "Murakkab",
  description: "Ma'lumotlarni brauzerda doimiy va vaqtinchalik saqlash usullari hamda Cookies xavfsizligi.",
  theory: `## 1. NEGA kerak?

Veb-saytga kirganingizda, sayt sizning tanlagan tilingizni yoki tungi rejim (dark mode) sozlamangizni eslab qolishi kerak. Agar bu ma'lumotlarni hech qayerda saqlamasangiz, sahifa yangilanganda hamma narsa dastlabki holatiga qaytib qoladi. Har bir kichik sozlama yoki foydalanuvchi sessiyasini saqlash uchun serverdagi ma'lumotlar bazasiga murojaat qilish vaqt va resurs sarfini oshiradi. Brauzer xotirasi bunday holatlar uchun ayni muddaodir.

## 2. SODDALIK (Analogiya)

Brauzerdagi xotiralarni quyidagicha tushunish mumkin:
- **LocalStorage:** Bu sizning uyingizdagi shaxsiy esdalik daftaringiz. Unga yozilgan narsalar siz o'zingiz uni o'chirmaguningizcha (yoki varag'ini yirtmaguningizcha) muddatsiz saqlanib turaveradi.
- **SessionStorage:** Bu esa o'quv xonasidagi oq doska. Dars tugab, xonani tark etishingiz (tab yoki brauzerni yopishingiz) bilan doska o'chirib tozalanadi.
- **Cookies (Kuki):** Bu sizga mehmonxonada berilgan elektron kalit-karta. Har safar xonangizga kirmoqchi bo'lganingizda (serverga HTTP so'rov yuborganingizda), bu karta sizning kimligingizni tasdiqlash uchun tizimga uzatiladi va uning ham ma'lum bir amal qilish muddati bo'ladi.

## 3. STRUKTURA

### A. LocalStorage va SessionStorage Metodlari
Ikkala xotira turi ham bir xil metodlar yordamida boshqariladi:
\`\`\`javascript
// Ma'lumot yozish (saqlash)
localStorage.setItem("theme", "dark");
sessionStorage.setItem("session_id", "12345");

// Ma'lumotni o'qish
const theme = localStorage.getItem("theme");

// Bitta kalitni o'chirish
localStorage.removeItem("theme");

// Hamma narsani butunlay tozalash
localStorage.clear();
\`\`\`

### B. Obyekt va Massivlarni saqlash (JSON)
Veb-xotira faqat **string (matn)** turidagi ma'lumotlarni saqlay oladi. Obyekt yoki massivlarni saqlash uchun ularni string formatiga o'tkazish kerak:
\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Obyekt -> String (Saqlashda)
localStorage.setItem("user", JSON.stringify(user));

// String -> Obyekt (O'qishda)
const parsedUser = JSON.parse(localStorage.getItem("user"));
\`\`\`

### C. Cookies (Kuki fayllari)
Cookies — brauzer va server o'rtasida har bir HTTP so'rovda avtomatik uzatiladigan kichik ma'lumot bo'lagi (maksimal 4 KB).
JavaScript-da kuki yozish va o'qish:
\`\`\`javascript
// Kuki yaratish
document.cookie = "username=Farhod; expires=Sat, 23 May 2026 12:00:00 UTC; path=/";

// Max-Age yordamida yashash muddatini soniyalarda berish (1 soat)
document.cookie = "token=abc123xyz; max-age=3600; secure; samesite=lax";
\`\`\`

#### Muhim Kuki Atributlari:
1. **Expires / Max-Age:** Kukining amal qilish muddati. Muddati tugagach, brauzer uni o'chirib yuboradi.
2. **Secure:** Kuki faqat HTTPS (shifrlangan) ulanish orqali uzatilishini ta'minlaydi.
3. **SameSite:** Kuki uchinchi tomon so'rovlarida yuborilishini boshqaradi (qiymatlari: \`Strict\`, \`Lax\`, \`None\`). CSRF hujumlaridan himoya qiladi.
4. **HttpOnly:** Ushbu atribut o'rnatilgan kukilarni JavaScript orqali o'qib bo'lmaydi (\`document.cookie\`da ko'rinmaydi). Bu XSS hujumlaridan himoyalanish uchun juda muhimdir. (Faqat server tomonidan o'rnatiladi).

| Xususiyat | LocalStorage | SessionStorage | Cookies |
| :--- | :--- | :--- | :--- |
| **Hajmi** | ~5-10 MB | ~5 MB | ~4 KB |
| **Muddati** | Muddatsiz | Tab yopilguncha | Belgilangan vaqtgacha |
| **Serverga uzatilishi** | Yo'q | Yo'q | Har bir so'rovda avtomatik |
| **JS kirishi** | Ha | Ha | Ha (HttpOnly bo'lmasa) |

## 4. XATOLAR (Common Mistakes)

1. **Obyektlarni to'g'ridan-to'g'ri yozish:**
   \`\`\`javascript
   // XATO:
   localStorage.setItem("user", { name: "Ali" }); // "[object Object]" bo'lib saqlanadi
   // TO'G'RI:
   localStorage.setItem("user", JSON.stringify({ name: "Ali" }));
   \`\`\`

2. **Nozik ma'lumotlarni saqlash (Xavfsizlik xatosi):**
   Foydalanuvchi parollari, shaxsiy ma'lumotlari yoki maxfiy tokenlarni LocalStorage'da saqlamang. XSS xuruji orqali zararli skriptlar xotirani osonlik bilan o'qib olishi mumkin. Bunday tokenlar uchun **HttpOnly** kukilari tavsiya etiladi.

## 5. AMALIYOT (Mashqlar)

## 6. SAVOLLAR VA JAVOBLAR

**1. LocalStorage va SessionStorage asosiy farqi nima?**
LocalStorage doimiy xotira bo'lib, oyna yopilsa ham saqlanadi. SessionStorage esa faqat o'sha oyna/tab ochiq turguncha saqlanadi, tab yopilganda o'chadi.

**2. LocalStorage limit sig'imi qancha?**
Brauzerga qarab 5 MB dan 10 MB gacha.

**3. Obyektlarni saqlash uchun nima uchun JSON ishlatiladi?**
LocalStorage faqat string ma'lumotlarni qabul qilgani uchun obyektlarni \`JSON.stringify\` orqali matnga o'tkazish lozim.

**4. Kuki (Cookie) nima?**
Kuki — brauzer va server o'rtasida har bir so'rovda yuboriladigan, asosan foydalanuvchi seansini aniqlash uchun ishlatiladigan kichik ma'lumot bo'lagi.

**5. Kukining maksimal hajmi qancha?**
Taxminan 4 KB.

**6. HttpOnly kuki nima va u nima uchun kerak?**
Faqat server tomonidan o'rnatiladigan, JavaScript kirishi taqiqlangan kuki turi. U XSS hujumi orqali sessiya tokenlarini o'g'irlanishidan himoya qiladi.

**7. Secure atributi nima qiladi?**
Kukining faqat HTTPS xavfsiz protokoli orqali jo'natilishini kafolatlaydi.

**8. SameSite atributi nima uchun kerak?**
Cross-Site Request Forgery (CSRF) hujumlaridan himoyalanish uchun kukilarning saytlararo so'rovlarda yuborilishini boshqaradi.

**9. LocalStorage ma'lumotlarini boshqa sayt (origin) o'qiy oladimi?**
Yo'q, "Same-Origin Policy" qoidasiga ko'ra, har bir sayt faqat o'zining LocalStorage xotirasiga kira oladi.

**10. localStorage.clear() nima qiladi?**
Domen uchun LocalStorage'da saqlangan barcha ma'lumotlarni tozalaydi.

**11. storage hodisasi (event) qachon ishlaydi?**
LocalStorage joriy origin ostidagi boshqa oynada yoki tabda o'zgartirilganda.

**12. Kuki muddatini belgilash uchun qaysi atributlar ishlatiladi?**
\`Expires\` (muayyan sana bilan) yoki \`Max-Age\` (soniyalarda).`,
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
      title: "Barcha LocalStorage'ni tozalash",
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
      explanation: "Cookies juda kichik hajmga ega (har bir kuki uchun taxminan 4 KB gacha), chunki ular har bir HTTP so'rov bilan birga serverga yuboriladi."
    },
    {
      id: 7,
      question: "Kukilarning `HttpOnly` atributi nima uchun kerak?",
      options: [
        "Kukilarni faqat mobil telefonlarda o'qish uchun",
        "JavaScript (masalan, `document.cookie` orqali) ushbu kukini o'qiy olmasligi va shu orqali XSS hujumlaridan himoyalanish uchun",
        "Kukilarni HTTPS o'rniga faqat HTTP orqali yuborish uchun",
        "Kuki hajmini oshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "`HttpOnly` atributi o'rnatilgan kukilarga JavaScript orqali kirib bo'lmaydi. Bu esa hackerlar zararli kod (XSS) yordamida foydalanuvchining sessiya tokenlarini o'g'irlashining oldini oladi."
    },
    {
      id: 8,
      question: "Kuki atributlaridan `Secure` nima qiladi?",
      options: [
        "Kukini shifrlab brauzerga yozadi",
        "Kukini faqat xavfsiz HTTPS protokoli orqali yuborilishini ta'minlaydi",
        "Kuki o'chib ketishining oldini oladi",
        "Kuki faqat localhostda ishlashini ta'minlaydi"
      ],
      correctAnswer: 1,
      explanation: "`Secure` atributi kuki faqat shifrlangan HTTPS ulanishlari orqali yuborilishini ta'minlaydi."
    },
    {
      id: 9,
      question: "Kukining `SameSite` atributi qanday maqsadlarda qo'llaniladi?",
      options: [
        "Kuki faqat bitta kompyuterda ishlashi uchun",
        "Kuki faqat JavaScript fayllarda ishlashi uchun",
        "Cross-Site Request Forgery (CSRF) hujumlaridan himoya qilish va uchinchi tomon (third-party) so'rovlarida kuki yuborilishini boshqarish uchun",
        "Kuki yozilishini butunlay cheklash uchun"
      ],
      correctAnswer: 2,
      explanation: "`SameSite` atributi (qiymatlari: Strict, Lax, None) saytlararo so'rovlarda kuki yuborilishini nazorat qilib, CSRF hujumlaridan himoyalanishga yordam beradi."
    },
    {
      id: 10,
      question: "Maxfiy session tokenlarni saqlashda nega xavfsizlik nuqtai nazaridan LocalStorage'dan ko'ra HttpOnly kuki tavsiya etiladi?",
      options: [
        "Chunki LocalStorage xotira hajmi kichikroq",
        "Chunki LocalStorage kompyuter o'chganda o'chib ketadi",
        "Chunki LocalStorage'dagi ma'lumotlarni JavaScript o'qiy oladi (XSS orqali o'g'irlanishi mumkin), HttpOnly kuki esa JS skriptlaridan himoyalangan",
        "Farqi yo'q, ikkalasi ham bir xil xavfsizlikka ega"
      ],
      correctAnswer: 2,
      explanation: "LocalStorage'dagi barcha ma'lumotlar joriy sahifada ishlayotgan har qanday JS kodi tomonidan osonlikcha o'qilishi mumkin. HttpOnly kuki esa JS ga yopiq bo'lgani sababli xavfsizroq."
    },
    {
      id: 11,
      question: "JavaScript orqali yangi kuki yozish uchun to'g'ri sintaksis qanday?",
      options: [
        "`document.cookie = \"key=value\"`",
        "`document.cookie.set(\"key\", \"value\")`",
        "`document.cookie(\"key\", \"value\")`",
        "`document.setCookie(\"key\", \"value\")`"
      ],
      correctAnswer: 0,
      explanation: "JS da `document.cookie` xususiyati setter vazifasini bajaradi, unga `\"key=value\"` ko'rinishidagi string qiymat berilsa, brauzer mavjud kukilarga ushbu yangi kukini qo'shib qo'yadi."
    },
    {
      id: 12,
      question: "LocalStorage'dagi o'zgarishlarni eshitadigan `storage` event qachon ishga tushmaydi?",
      options: [
        "O'zgarishlar boshqa tabda sodir bo'lganda",
        "O'zgarishlar ayni joriy oynaning o'zida yuz berganda",
        "Kompyuter o'chib yonganda",
        "SessionStorage ishlatilganda"
      ],
      correctAnswer: 1,
      explanation: "`storage` hodisasi faqat boshqa tablar yoki oynalarda ma'lumot o'zgarganda o'sha origin'dagi boshqa sahifalarda ishga tushadi. Joriy o'zgarish yuz bergan sahifaning o'zida bu event ishlamaydi."
    }
  ]
};
