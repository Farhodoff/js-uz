export const serviceWorkersPwa = {
  id: "serviceWorkersPwa",
  title: "Service Workers va PWA: Oflayn Rejim va Keshlash",
  theory: `## 1. NEGA kerak?
An'anaviy veb-saytlar faqat faol internet ulanishi mavjud bo'lgandagina ishlaydi. Internet yo'qolganda foydalanuvchiga dinozavr rasmi yoki tarmoq xatosi ko'rsatiladi. Progressive Web Apps (PWA) veb-ilovalarni huddi mobil ilovalar kabi oflayn rejimda ishlash, telefonga o'rnatilish (install), bildirishnomalar (Push Notifications) yuborish imkoniyati bilan ta'minlaydi. PWA-ning yuragi esa **Service Worker** hisoblanadi. U brauzer fonda ishlatadigan, tarmoq so'rovlarini tutib oladigan (intercept) va ularni Cache Storage-dan oflayn rejimda qaytara oladigan maxsus proxy-skriptdir.

## 2. SODDALIK (Analogiya)
Veb-saytingizni **restoran**, internetdagi serverni esa **omborxona** deb tasavvur qiling. Oldin har safar ovqat kerak bo'lganda (sahifaga kirganda) ofitsiant omborxonaga borib kelishi kerak edi. Agar yo'l yopiq bo'lsa (internet uzilsa), restoran yopilardi.
**Service Worker** esa restoranda qurilgan **muzlatgichli kichik oshxona** kabidir. U bir marta ombordan kerakli narsalarni olib muzlatgichga solib qo'yadi (Keshlash). Keyingi safar mijoz ovqat so'rasa, u omborga qarab o'tirmaydi, muzlatgichdan olib beraveradi. Omborga faqat muzlatgichda yo'q narsa uchungina boriladi.

## 3. STRUKTURA
Service Worker faqat **HTTPS** protokoli ostida (yoki \`localhost\` da test qilish uchun) ishlaydi. U alohida faylda (masalan, \`sw.js\`) yoziladi va asosiy fayldan ro'yxatdan o'tkaziladi.

### 1. Ro'yxatdan o'tkazish (main.js):
\`\`\`javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker muvaffaqiyatli ro\\'yxatdan o\\'tdi:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker ro\\'yxatdan o\\'tishda xato:', error);
      });
  });
}
\`\`\`

### 2. Service Worker hayotiy sikli (Lifecycle) va hodisalari (sw.js):
Service Worker asosan uchta bosqichni bosib o'tadi:
- **\`install\` (O'rnatilish):** Kesh yaratish va statik fayllarni (HTML, CSS, JS) saqlab olish uchun eng qulay joy.
- **\`activate\` (Faollashuv):** Eski keshlarni tozalash va tizimni yangilash uchun ishlatiladi.
- **\`fetch\` (So'rovlarni tutish):** Sahifa tomonidan yuborilgan barcha tarmoq so'rovlarini ushlab, ularga keshdan javob qaytaradi.

\`\`\`javascript
const CACHE_NAME = 'my-app-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

// O'rnatish hodisasi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Fayllarni keshga yozish...');
      return cache.addAll(ASSETS);
    })
  );
});

// Faollashtirish hodisasi
self.addEventListener('activate', (event) => {
  console.log('Service Worker faollashdi.');
});

// Tarmoq so'rovlarini tutish
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Agar keshda bo'lsa keshdan beramiz, aks holda tarmoqdan yuklaymiz
      return cachedResponse || fetch(event.request);
    })
  );
});
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Noto'g'ri fayl manzili va scope (doira):** Service Worker faqat o'zi joylashgan va undan pastki kataloglardagi so'rovlarni tuta oladi. Agar siz \`sw.js\` ni \`/js/sw.js\` ichiga joylashtirsangiz, u \`/index.html\` dan chiquvchi so'rovlarni nazorat qila olmaydi. Shuning uchun \`sw.js\` ni har doim loyihaning ildiz papkasiga (root directory) joylash lozim.
2. **Kesh versiyasini yangilashni unutish:** Agar siz kodga o'zgartirish kiritsangiz-u, lekin \`sw.js\` ichidagi \`CACHE_NAME\` (versiyasi) ni o'zgartirmasangiz, foydalanuvchilar brauzerida eski kesh turib qolaveradi va ular yangilangan saytni ko'ra olishmaydi.
3. **HTTP orqali ishga tushirish:** Service Worker yuqori xavfsizlik talab qiladi (chunki u barcha tarmoq so'rovlarini nazorat qiladi). Mahalliy kompyuterdan (\`localhost\`) tashqari barcha production serverlar faqat **HTTPS** protokoli bilan ishlashi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Progressive Web App (PWA) nima?**
Veb-saytni xuddi mobil ilovadek o'rnatish, oflayn ishlatish va bildirishnomalar yuborish imkonini beruvchi texnologiyalar to'plami.

**2. Service Worker nima?**
Brauzer fonda ishlatadigan, tarmoq so'rovlarini boshqaradigan va keshlashni ta'minlaydigan proxy skript.

**3. Service Worker oddiy JS oqimidan nima bilan farq qiladi?**
U alohida oqimda ishlaydi, DOM elementlari bilan bevosita ishlay olmaydi va sahifa yopilganda ham fonda yashashi mumkin.

**4. Service Worker qaysi protokollarda ishlaydi?**
Faqat xavfsiz HTTPS protokoli ostida yoki ishlab chiqish jarayonida \`http://localhost\` da.

**5. Service Worker ro'yxatdan o'tkazilganda qaysi obyektdan foydalaniladi?**
\`navigator.serviceWorker\` obyektidan.

**6. Service Worker hayotiy siklidagi 3 ta asosiy hodisa qaysilar?**
\`install\`, \`activate\`, \`fetch\`.

**7. \`install\` hodisasi ichida \`event.waitUntil\` nima uchun kerak?**
Brauzerga kesh to'liq yaratilib bo'lmaguncha Service Worker-ni o'rnatilgan (\`installed\`) deb hisoblamaslikni buyurish uchun.

**8. Keshdagi fayllarni tekshirish va javob berish uchun qaysi metod ishlatiladi?**
\`caches.match(request)\` metodi.

**9. Veb-ilovani telefonga yoki kompyuterga o'rnatiladigan (Installable) qilish uchun qaysi fayl majburiy hisoblanadi?**
\`manifest.json\` (Web App Manifest) fayli.

**10. Service Worker-ni eski keshlarni o'chirish uchun qaysi lifecycle hodisasi eng mos keladi?**
\`activate\` hodisasi.

**11. Nima uchun Service Worker-ni root papkada (masalan \`/sw.js\`) saqlash muhim?**
Chunki uning ta'sir doirasi (scope) o'zi joylashgan papka darajasi bilan cheklanadi.

**12. Service Worker keshida ma'lumotlarni saqlash hajmi cheklanganmi?**
Ha, har bir brauzer disk hajmiga qarab kesh uchun ma'lum bir maksimal kvotani ajratadi, ammo bu odatda yuzlab megabaytlar uchun yetarli bo'ladi.
`,
  exercises: [
    {
      id: 1,
      title: "Service Worker mavjudligini tekshirish",
      instruction: "Brauzerda service worker qo'llab-quvvatlanishini tekshiring va natijani 'isSupported' o'zgaruvchisiga saqlang (true/false).",
      startingCode: "// Bu yerga yozing\nconst isSupported = ",
      hint: "'serviceWorker' in navigator",
      test: "if (code.includes('serviceWorker') && code.includes('navigator')) return null; return 'navigator tarkibida serviceWorker borligini tekshiring.';"
    },
    {
      id: 2,
      title: "Service Worker-ni ro'yxatdan o'tkazish",
      instruction: "'/sw.js' faylini service worker sifatida ro'yxatdan o'tkazadigan kod yozing.",
      startingCode: "if ('serviceWorker' in navigator) {\n  // Bu yerga yozing\n  \n}",
      hint: "navigator.serviceWorker.register('/sw.js');",
      test: "if (code.includes('register') && (code.includes(\"'/sw.js'\") || code.includes('\"/sw.js\"'))) return null; return 'navigator.serviceWorker.register metodini to\\'g\\'ri chaqiring.';"
    },
    {
      id: 3,
      title: "Install hodisasini eshitish",
      instruction: "Service worker kodi ichida (self global obyekti orqali) 'install' hodisasiga tinglovchi qo'shing.",
      startingCode: "// sw.js fayli ichi\n// Bu yerga yozing\n",
      hint: "self.addEventListener('install', (event) => {\n  // kod\n});",
      test: "if (code.includes(\"addEventListener('install'\") || code.includes('addEventListener(\"install\"')) return null; return 'install hodisasi uchun addEventListener yozing.';"
    },
    {
      id: 4,
      title: "Kesh ochish",
      instruction: "'caches.open' yordamida 'app-v1' nomli keshni oching va qaytgan va'da (promise)ni 'cachePromise'ga saqlang.",
      startingCode: "// Bu yerga yozing\nconst cachePromise = ",
      hint: "caches.open('app-v1')",
      test: "if (code.includes(\"caches.open('app-v1')\") || code.includes('caches.open(\"app-v1\")')) return null; return 'caches.open metodini to\\'g\\'ri nom bilan chaqiring.';"
    },
    {
      id: 5,
      title: "Keshga fayllar qo'shish",
      instruction: "Ochilgan 'cache' obyektiga '/index.html' va '/styles.css' fayllarini bir vaqtda qo'shuvchi (addAll) metodini yozing.",
      startingCode: "caches.open('app-v1').then((cache) => {\n  // Bu yerga yozing\n  \n});",
      hint: "return cache.addAll(['/index.html', '/styles.css']);",
      test: "if (code.includes('addAll') && code.includes('/index.html') && code.includes('/styles.css')) return null; return 'cache.addAll yordamida ko\\'rsatilgan fayllarni keshga qo\\'shing.';"
    },
    {
      id: 6,
      title: "O'rnatilishni kutish (waitUntil)",
      instruction: "install hodisasi voqeasi (event) ichida kesh ochish yakunlanmaguncha o'rnatilish jarayonini ushlab turuvchi event.waitUntil() metodini chaqiring va unga 'caches.open' va'dasini bering.",
      startingCode: "self.addEventListener('install', (event) => {\n  // Bu yerga yozing\n  \n});",
      hint: "event.waitUntil(\n    caches.open('v1').then(cache => cache.addAll(['/']))\n  );",
      test: "if (code.includes('event.waitUntil') && code.includes('caches.open')) return null; return 'event.waitUntil yordamida o\\'rnatilish va\\'dasini boshqaring.';"
    },
    {
      id: 7,
      title: "Activate hodisasini eshitish",
      instruction: "Service worker ichida 'activate' hodisasini eshitadigan va konsolga 'Activated' deb chiqaradigan kod yozing.",
      startingCode: "// sw.js ichi\n// Bu yerga yozing\n",
      hint: "self.addEventListener('activate', (event) => {\n  console.log('Activated');\n});",
      test: "if (code.includes(\"addEventListener('activate'\") && code.includes('Activated')) return null; return 'activate hodisasi uchun tinglovchi va log yozing.';"
    },
    {
      id: 8,
      title: "Fetch hodisasini tutish",
      instruction: "Tarmoq so'rovlarini tutib olish uchun 'fetch' hodisasini eshitadigan voqea tinglovchisini qo'shing.",
      startingCode: "// sw.js ichi\n// Bu yerga yozing\n",
      hint: "self.addEventListener('fetch', (event) => {\n  // kod\n});",
      test: "if (code.includes(\"addEventListener('fetch'\") || code.includes('addEventListener(\"fetch\"')) return null; return 'fetch hodisasi uchun tinglovchi yozing.';"
    },
    {
      id: 9,
      title: "Keshdan qidirish (caches.match)",
      instruction: "fetch hodisasi event.respondWith ichida kelgan event.request so'roviga mos kesh ma'lumotlarini qidirish metodini yozing.",
      startingCode: "self.addEventListener('fetch', (event) => {\n  event.respondWith(\n    // Bu yerga yozing\n    \n  );\n});",
      hint: "caches.match(event.request)",
      test: "if (code.includes('caches.match(event.request)') || code.includes('caches.match(e.request)')) return null; return 'caches.match metodi orqali event.request-ni tekshiring.';"
    },
    {
      id: 10,
      title: "Ulanishni kutmasdan faollashish (skipWaiting)",
      instruction: "Yangi service worker-ni o'rnatilgan zahoti kutish rejimisiz darhol faollashtirish uchun self.skipWaiting() metodini chaqiring.",
      startingCode: "self.addEventListener('install', (event) => {\n  // Bu yerga yozing\n  \n});",
      hint: "self.skipWaiting();",
      test: "if (code.includes('self.skipWaiting()') || code.includes('skipWaiting()')) return null; return 'self.skipWaiting() metodini chaqiring.';"
    },
    {
      id: 11,
      title: "PWA Manifest havolasini HTMLga qo'shish",
      instruction: "HTML fayli head qismida '/manifest.json' fayliga havola beruvchi link tegi matnini 'manifestHtml' o'zgaruvchisiga string ko'rinishida yozing.",
      startingCode: "// Bu yerga yozing\nconst manifestHtml = ",
      hint: "'<link rel=\"manifest\" href=\"/manifest.json\">'",
      test: "if (code.includes('link') && code.includes('manifest') && code.includes('/manifest.json')) return null; return 'HTML manifest link tegini string shaklida to\\'g\\'ri yozing.';"
    },
    {
      id: 12,
      title: "Eski keshni o'chirish",
      instruction: "caches.delete metodi yordamida 'app-v1' nomli eski keshni o'chirib yuboradigan kod yozing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "caches.delete('app-v1');",
      test: "if (code.includes(\"caches.delete('app-v1')\") || code.includes('caches.delete(\"app-v1\")')) return null; return 'caches.delete orqali app-v1 keshini o\\'chiring.';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Service Worker nima?",
      options: [
        "Veb-sayt dizaynini chiroyli qiluvchi CSS animatsiya kutubxonasi",
        "Brauzer sahifasidan mustaqil, fonda ishlaydigan va tarmoq so'rovlarini boshqaradigan proxy skript",
        "Ma'lumotlar bazasini boshqaradigan server tizimi",
        "HTML-ni avtomatik tekshiradigan brauzer plagini"
      ],
      correctAnswer: 1,
      explanation: "Service Worker sahifadan alohida ishlovchi va asosan oflayn rejim, kesh va bildirishnomalarni ta'minlovchi fondagi proxy skriptdir."
    },
    {
      id: 2,
      question: "Service Worker qaysi sharoitda xavfsizlik tufayli ishlashdan bosh tortadi?",
      options: [
        "Sahifada JavaScript o'chirilgan bo'lsa",
        "Domen HTTPS bo'lmasa (localhost-dan tashqari)",
        "Sahifada CSS ishlatilmagan bo'lsa",
        "Foydalanuvchi mobil telefondan kirmasa"
      ],
      correctAnswer: 1,
      explanation: "Service Worker barcha tarmoq so'rovlarini nazorat qilgani tufayli u faqat xavfsiz kanallarda (HTTPS va localhost-da) ishlashga ruxsat etiladi."
    },
    {
      id: 3,
      question: "Service worker ro'yxatdan o'tganligini tekshirish uchun qaysi obyektdan foydalaniladi?",
      options: [
        "window.serviceWorker",
        "navigator.serviceWorker",
        "document.serviceWorker",
        "self.serviceWorker"
      ],
      correctAnswer: 1,
      explanation: "navigator.serviceWorker obyekti orqali service worker ro'yxatdan o'tkaziladi va tekshiriladi."
    },
    {
      id: 4,
      question: "Service worker-ga statik fayllarni keshga yozish buyrug'i odatda qaysi voqea (event) ichida beriladi?",
      options: [
        "install",
        "activate",
        "fetch",
        "message"
      ],
      correctAnswer: 0,
      explanation: "install hodisasi service worker ilk bor yuklanganda faqat bir marta ishga tushadi, bu statik resurslarni keshlab olish uchun eng qulay bosqichdir."
    },
    {
      id: 5,
      question: "Service worker o'zgarib yangilanganda, yangi versiya darhol faollashmasdan kutib turishiga nima sabab bo'ladi?",
      options: [
        "Eski service worker boshqarayotgan ochiq sahifalar (tabs) hali ham mavjudligi",
        "Internet ulanishining sekinligi",
        "Vite sozlamalari",
        "Brauzerning xotirasi to'lganligi"
      ],
      correctAnswer: 0,
      explanation: "Brauzer eski oqimni kutilmaganda uzib qo'ymaslik uchun, o'sha sayt ishlayotgan barcha tablar butunlay yopilmaguncha yangi service worker-ni faollashtirmay kutish holatida (waiting) saqlaydi."
    },
    {
      id: 6,
      question: "Service worker-da eski keshlarni tozalash (o'chirish) odatda qaysi bosqichda amalga oshiriladi?",
      options: [
        "install",
        "activate",
        "fetch",
        "register"
      ],
      correctAnswer: 1,
      explanation: "activate hodisasi yangi service worker to'liq faol holatga o'tganda ishga tushadi. Bu eski keshlar bilan yangisini almashtirish va eskisini tozalash uchun qulay."
    },
    {
      id: 7,
      question: "Tarmoq so'rovlarini intercept qilish (tutib olish) qaysi hodisa yordamida amalga oshiriladi?",
      options: [
        "onrequest",
        "onfetch",
        "self.addEventListener('fetch', ...)",
        "self.addEventListener('intercept', ...)"
      ],
      correctAnswer: 2,
      explanation: "self.addEventListener('fetch', callback) yordamida sahifadan chiquvchi har qanday tarmoq so'rovini tutib, unga boshqacha javob berish mumkin."
    },
    {
      id: 8,
      question: "Event.respondWith() metodi qaysi hodisa (event) ichida ishlatiladi?",
      options: [
        "install",
        "activate",
        "fetch",
        "message"
      ],
      correctAnswer: 2,
      explanation: "respondWith() metodi faqat fetch hodisasi ichida ishlatiladi va so'rovga keshdagi yoki yangi fetch orqali kelgan Response obyektini qaytaradi."
    },
    {
      id: 9,
      question: "caches.match(event.request) nima qiladi?",
      options: [
        "So'rovni bevosita internetdagi serverga yo'llaydi",
        "Kesh omboridan joriy so'rovga mos keluvchi fayl/javob bor yoki yo'qligini tekshiradi",
        "HTML sahifadagi barcha rasmlarni topadi",
        "So'rovni o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "caches.match() joriy so'rov (URL) keshda oldindan saqlangan bo'lsa, o'sha keshdagi Response-ni qaytaradi."
    },
    {
      id: 10,
      question: "Progressive Web App (PWA) ilovasini telefonga o'rnatish taklifini ko'rsatish uchun HTML-da qaysi metadata fayli ulangan bo'lishi kerak?",
      options: [
        "package.json",
        "manifest.json (Web App Manifest)",
        "config.xml",
        "pwa.config.js"
      ],
      correctAnswer: 1,
      explanation: "manifest.json fayli ilovaning nomi, piktogrammalari (icons), start_url va ekran ko'rinish rejimini belgilab beradi va ulanishi majburiydir."
    },
    {
      id: 11,
      question: "Service worker-ga o'rnatilgan zahoti kutish rejimini chetlab o'tib, darhol faollashishni qanday buyuramiz?",
      options: [
        "self.skipWaiting() metodi orqali",
        "event.waitUntil() yordamida",
        "self.clients.claim() yordamida",
        "worker.terminate() yordamida"
      ],
      correctAnswer: 0,
      explanation: "self.skipWaiting() chaqirilsa, yangi service worker o'rnatilishi bilanoq eski ulanishlarni o'rniga o'zini darhol faol holatga o'tkazadi."
    },
    {
      id: 12,
      question: "Veb-ilovada PWA statusini tekshirish uchun Google Chrome devtools-ning qaysi bo'limidan foydalaniladi?",
      options: [
        "Console",
        "Network",
        "Lighthouse va Application bo'limlari",
        "Elements"
      ],
      correctAnswer: 2,
      explanation: "Chrome DevTools-dagi Application bo'limida Service Worker va Manifest holati ko'rinadi, Lighthouse esa saytning PWA mezonlariga mosligini to'liq tekshirib audit beradi."
    }
  ]
};
