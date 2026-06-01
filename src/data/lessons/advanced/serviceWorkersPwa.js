export const serviceWorkersPwa = {
  id: "serviceWorkersPwa",
  title: "Service Workers va PWA: Oflayn Rejim va Keshlash",
  level: "Murakkab",
  description: "Progressive Web Apps asosi bo'lgan Service Worker-lar, oflayn rejim va keshlash strategiyalari.",
  theory: `## 1. NEGA kerak?
An'anaviy veb-saytlar faqat faol internet ulanishi mavjud bo'lgandagina ishlaydi. Internet yo'qolganda foydalanuvchiga dinozavr rasmi yoki tarmoq xatosi ko'rsatiladi. Progressive Web Apps (PWA) veb-ilovalarni huddi mobil ilovalar kabi oflayn rejimda ishlash, telefonga o'rnatilish (install), bildirishnomalar (Push Notifications) yuborish imkoniyati bilan ta'minlaydi. PWA-ning yuragi esa **Service Worker** hisoblanadi. U brauzer fonda ishlatadigan, tarmoq so'rovlarini tutib oladigan (intercept) va ularni Cache Storage-dan oflayn rejimda qaytara oladigan maxsus proxy-skriptdir.

---

## 2. SODDALIK (Analogiya)
Veb-saytingizni **restoran**, internetdagi serverni esa **omborxona** deb tasavvur qiling. Oldin har safar ovqat kerak bo'lganda (sahifaga kirganda) ofitsiant omborxonaga borib kelishi kerak edi. Agar yo'l yopiq bo'lsa (internet uzilsa), restoran yopilardi.
**Service Worker** esa restoranda qurilgan **muzlatgichli kichik oshxona** kabidir. U bir marta ombordan kerakli narsalarni olib muzlatgichga solib qo'yadi (Keshlash). Keyingi safar mijoz ovqat so'rasa, u omborga qarab o'tirmaydi, muzlatgichdan olib beraveradi. Omborga faqat muzlatgichda yo'q narsa uchungina boriladi.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. Keshlash Strategiyalari (Caching Strategies)
Service Worker yordamida tarmoq so'rovlariga javob berishda turli strategiyalardan foydalaniladi:
1. **Cache-First (Kesh-Birinchi):** So'rov kelganda birinchi kesh tekshiriladi. Agar keshda bo'lsa, tarmoqqa chiqmasdan darhol qaytariladi. Topilmasa, tarmoqdan yuklanadi va kelajak uchun keshga yoziladi. (Statik assetlar — rasm, shrift, CSS uchun mos).
2. **Network-First (Tarmoq-Birinchi):** Avval tarmoqdan yangi ma'lumot olishga harakat qiladi. Tarmoq ulanishi yo'q bo'lsa (oflayn), keshdagi eskiroq ma'lumotni qaytaradi. (Tez-tez o'zgaruvchi API ma'lumotlari uchun mos).
3. **Stale-While-Revalidate:** Keshda bor ma'lumotni darhol foydalanuvchiga taqdim etadi (stale), lekin ayni vaqtda fonda tarmoqdan yangi ma'lumotni yuklab keshni yangilab qo'yadi (revalidate). (Yangiliklar tasmasi yoki avatar rasmlar uchun mos).

\`\`\`mermaid
graph TD
    subgraph Cache First
        C1[Client Request] -->|1| CA[Check Cache]
        CA -->|Hit| C1
        CA -->|Miss| N1[Network Fetch]
        N1 -->|Save to Cache| CA
        N1 --> C1
    end
    subgraph Network First
        C2[Client Request] -->|1| N2[Network Fetch]
        N2 -->|Success| C2
        N2 -->|Fail| CA2[Get from Cache]
        CA2 --> C2
    end
\`\`\`

### B. Service Worker Update Lifecycle (Yangilanish sikli)
Service Worker o'zgartirilganda uning o'rnatilishi quyidagi bosqichlardan o'tadi:
1. **Installing:** Brauzer yangi \`sw.js\` faylini yuklab oladi va o'rnatadi.
2. **Waiting (Kutish):** Yangi SW o'rnatilgach, u faollashmaydi, kutish rejimida turadi. Chunki eski SW hali ham ochiq sahifalarni (tablarni) nazorat qilmoqda.
3. **Active (Faol):** Foydalanuvchi barcha tablarni yopib, saytga qayta kirgandagina yangi SW faollashadi.
   * **skipWaiting():** Yangi SW kutib turmasdan, darhol eski SW-ni o'chirib o'rnini egallashi uchun \`install\` hodisasida \`self.skipWaiting()\` chaqiriladi.
   * **clients.claim():** Faollashgan SW ochiq turgan sahifalarni darhol o'z nazoratiga olishi uchun \`activate\` hodisasida \`self.clients.claim()\` ishlatiladi.

\`\`\`mermaid
stateDiagram-v2
    [*] --> Installing: sw.js register bo'lganda
    Installing --> Waiting: install muvaffaqiyatli tugasa
    Waiting --> Activating: skipWaiting() chaqirilsa yoki tablar yopilsa
    Activating --> Active: clients.claim() ishga tushsa
    Active --> [*]
\`\`\`

---

## 4. XATOLAR (Common mistakes)
1. **Kesh hajmini to'ldirib yuborish:** Dynamic caching ishlatganda tarmoqdan kelayotgan barcha javoblar nazoratsiz ravishda keshga yozilaversa, kesh limiti tezda to'ladi. Doimo kesh elementlar sonini yoki hajmini cheklovchi helperlar yozish kerak.
2. **Aktiv ulanishlarni uzishdan qo'rqish:** \`skipWaiting\` ishlatilganda eski ulanishlar darhol yangisiga almashtiriladi, bu esa ayni daqiqada bajarilayotgan yuklash amallarini uzib qo'yishi mumkin. Muhim ilovalarda buni foydalanuvchiga "Yangi versiya tayyor, yangilang" tugmasi orqali bildirish tavsiya etiladi.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. Progressive Web App (PWA) nima?**
Veb-saytni xuddi mobil ilovadek o'rnatish, oflayn ishlatish va bildirishnomalar yuborish imkonini beruvchi texnologiyalar to'plami.

**2. Service Worker nima?**
Brauzer fonda ishlatadigan, tarmoq so'rovlarini boshqaradigan va keshlashni ta'minlaydigan proxy skript.

**3. Service Worker-da avtomatik yangilanish qanday amalga oshiriladi?**
Brauzer har 24 soatda yoki sahifa reload bo'lganda yangi \`sw.js\` borligini byte-by-byte tekshiradi. Agar o'zgarish bo'lsa, yangisini yuklab o'rnatadi.`,
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
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Stale-While-Revalidate Simulyatori (staleWhileRevalidateFetch)",
      instruction: "Fetch hodisasi doirasida `stale-while-revalidate` keshlash strategiyasini simulyatsiya qiluvchi asinxron `staleWhileRevalidateFetch(request, cacheName)` funksiyasini yozing. U quyidagi bosqichlarni bajarishi kerak:\n1. Keshdan `request` so'roviga javob qidirsin.\n2. Fonda (`caches.open` va `cache.put` orqali) `fetch(request)` so'rovini yuborib keshni yangilasin.\n3. Agar keshda eski javob bo'lsa, zudlik bilan o'shani qaytarsin (revalidate fonda ketaveradi). Agar keshda bo'lmasa, tarmoqdan yuklab qaytarsin.",
      startingCode: "async function staleWhileRevalidateFetch(request, cacheName) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const cached = await caches.match(request); const fetchPromise = caches.open(cacheName).then(async (cache) => { const response = await fetch(request); cache.put(request, response.clone()); return response; }); return cached || fetchPromise;",
      test: "if (typeof staleWhileRevalidateFetch !== 'function') return 'staleWhileRevalidateFetch funksiya emas';\nlet cacheUpdated = false;\nglobalThis.caches = {\n  match: async () => 'cached_resp',\n  open: async () => ({\n    put: async () => { cacheUpdated = true; }\n  })\n};\nglobalThis.fetch = async () => ({ clone: () => 'network_resp' });\nreturn staleWhileRevalidateFetch('req', 'v1').then(res => {\n  if (res === 'cached_resp' && cacheUpdated) return null;\n  return 'Stale-while-revalidate strategiyasi xato';"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Eski Keshlarni Tozalovchi (clearOldCaches)",
      instruction: "Service Worker faollashuv jarayonida (`activate`) eski kesh versiyalarini o'chirib yuboradigan `clearOldCaches(currentCacheName, cacheNamesList)` funksiyasini yozing. Funksiya `cacheNamesList` (kesh nomlari massivi) ichidan `currentCacheName` ga teng bo'lmagan barcha kesh nomlarini aniqlab, `caches.delete(cacheName)` yordamida o'chirib tashlasin va yakuniy va'da (Promise.all) qaytarsin.",
      startingCode: "function clearOldCaches(currentCacheName, cacheNamesList) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const deletePromises = cacheNamesList.filter(name => name !== currentCacheName).map(name => caches.delete(name)); return Promise.all(deletePromises);",
      test: "if (typeof clearOldCaches !== 'function') return 'clearOldCaches funksiya emas';\nconst deleted = [];\nglobalThis.caches = { delete: async (name) => { deleted.push(name); return true; } };\nreturn clearOldCaches('v2', ['v1', 'v2', 'v3']).then(() => {\n  if (deleted.includes('v1') && deleted.includes('v3') && !deleted.includes('v2')) return null;\n  return 'Eski keshlar to\\'g\\'ri o\\'chirilmadi: ' + deleted.join(',');\n});"
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
      explanation: "Service Worker barakar tarmoq so'rovlarini nazorat qilgani tufayli u faqat xavfsiz kanallarda (HTTPS va localhost-da) ishlashga ruxsat etiladi."
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
    },
    {
      id: 13,
      question: "Sahifada keshda saqlangan ma'lumotni darhol ko'rsatib, ayni vaqtda fonda tarmoqdan yuklab keshni yangilab qo'yish (Revalidate) strategiyasi nima deyiladi?",
      options: [
        "Cache-Only strategiyasi",
        "Network-Only strategiyasi",
        "Stale-While-Revalidate strategiyasi",
        "Cache-First strategiyasi"
      ],
      correctAnswer: 2,
      explanation: "Stale-While-Revalidate tezlik va eng yangi ma'lumotni kelajak uchun saqlash o'rtasidagi oltin o'rtalik bo'lib, eski javobni qaytarib fonda keshni yangilaydi."
    },
    {
      id: 14,
      question: "Teskari proksi (Nginx) serverda keshlashni o'chirib SSE va Service Worker real-vaqt rejimida ishlashiga yordam beruvchi sarlavha qaysi?",
      options: [
        "Content-Type: text/event-stream",
        "X-Accel-Buffering: no",
        "Cache-Control: public",
        "Pragma: no-cache"
      ],
      correctAnswer: 1,
      explanation: "Nginx oqim ma'lumotlarini bufferlamasligi va darhol klientga yetkazishi uchun X-Accel-Buffering: no headerini yuborish kerak."
    }
  ]
};
