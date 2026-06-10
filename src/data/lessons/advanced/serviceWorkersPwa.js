export const serviceWorkersPwa = {
  id: "serviceWorkersPwa",
  title: "Service Workers va Progressive Web Apps (PWA)",
  language: "uz",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Service Workers va PWA nima?
**Service Worker** — bu brauzeringiz orqa fonida (background) ishlaydigan, veb-sahifadan mustaqil bo'lgan skript (oqim) faylidir. U veb-sahifa va tarmoq (network) o'rtasida proksi vazifasini bajaradi: barcha chiquvchi so'rovlarni tutib oladi, keshlash xizmatlarini boshqaradi va veb-saytning tarmoqsiz (oflayn - offline) ishlashini ta'minlaydi.

**Progressive Web Apps (PWA)** — oddiy veb-saytlarni mobil yoki desktop ilova kabi o'rnatiladigan, tezkor va oflaynda ishlaydigan darajaga olib chiquvchi texnologiyalar to'plamidir. PWA-ning yuragi Service Worker va Manifest faylidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **do'konga (serverga) borib mahsulot sotib oladigan xaridorsiz (Web Page)**:
* **Service Workersiz (Oddiy Veb):** Siz har safar sut kerak bo'lganda ko'chaga chiqib do'konga borasiz. Agar yo'llar yopilgan bo'lsa (internet uzilgan bo'lsa), siz sut ololmay och qolasiz (sahifada xatolik chiqadi).
* **Service Worker bilan (PWA):** Siz o'zingiz uchun **shaxsiy yordamchi (Service Worker)** yolladingiz va u uyingiz eshigi tagida turadi. Siz sut so'raganingizda, yordamchi birinchi navbatda **muzlatgichni (Cache Storage)** tekshiradi. Agar muzlatgichda sut bo'lsa, uni darhol sizga beradi (tezkor / oflayn). Agar muzlatgich bo'sh bo'lsa, u do'konga borib sut sotib oladi, uni muzlatgichga qo'yadi va sizga yetkazadi (Cache-first strategy).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Service Worker-ni ro'yxatdan o'tkazish)
Bu kod asosiy \`index.js\` yoki \`app.js\` faylida, ya'ni asosiy oqimda ishga tushiriladi:
\`\`\`javascript
// Brauzer Service Worker-ni qo'llab-quvvatlashini tekshiramiz
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log("Service Worker muvaffaqiyatli ro'yxatdan o'tdi:", registration.scope);
      })
      .catch(error => {
        console.error("Service Worker ro'yxatdan o'tishda xatolik:", error);
      });
  });
}
\`\`\`

### 2. Intermediate Example (Statik fayllarni keshlash - sw.js)
\`sw.js\` (Service Worker) ichida \`install\` va \`activate\` bosqichlarini boshqarish:
\`\`\`javascript
const CACHE_NAME = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icon-192.png'
];

// 1. O'rnatish bosqichi (Install) - fayllarni keshga yozish
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Fayllar keshga yozilmoqda...");
      return cache.addAll(assets);
    })
  );
  // Yangi SW darhol faollashishi uchun
  self.skipWaiting();
});

// 2. Faollashuv bosqichi (Activate) - eski keshni tozalash
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key)) // Eski keshni o'chiramiz
      );
    })
  );
});
\`\`\`

### 3. Advanced Example (Tutib qolish va Keshdan qaytarish - Fetch event)
Har bir tarmoq so'rovini tekshirish va "Offline-first" strategiyasini qo'llash (\`sw.js\`):
\`\`\`javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Agar keshda bo'lsa, keshdagini qaytaramiz (Cache hit)
      if (cachedResponse) {
        return cachedResponse;
      }

      // Aks holda tarmoqdan yuklaymiz (Network fallback)
      return fetch(event.request).then((networkResponse) => {
        // Kelgan yangi javobni keshga yozib qo'yamiz (ixtiyoriy)
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Agar tarmoq ham, kesh ham ishlamasa (masalan, oflaynda yangi sahifani ochganda)
      // Ixtiyoriy ravishda zaxira offline.html sahifasini qaytarish mumkin
      return caches.match('/offline.html');
    })
  );
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Internet yo'qolganda sahifa ishlamay qolishi (Offline Mode):** Oddiy veb-saytlar internet uzilishi bilan "No Internet" (Dinozavr) sahifasini ko'rsatadi. Service Worker kesh yordamida saytning asosiy qismini internet yo'q bo'lsa ham ochib bera oladi.
* **Sekin yuklanish (Slow Network / Latency):** Mobil internet sekin yoki beqaror bo'lgan joylarda sahifa ochilishi juda qiyinlashadi. Statik fayllar (CSS, JS, Rasmlar) keshdan yuklanganda yuklanish tezligi deyarli 0 millisekundga teng bo'ladi.
* **Mobil ilovalar o'rnini egallash (PWA Installability):** Saytni Google Play yoki App Store-ga yuklamasdan turib, to'g'ridan-to'g'ri brauzerdan telefonga "o'rnatish" imkonini beradi, bu esa dasturchilar uchun xarajatlarni va foydalanuvchilar yuklab olish vaqtini tejaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Service Worker faylini noto'g'ri papkaga joylash (Scope muammosi)
#### Xato:
Service Worker fayli o'zi joylashgan papka va undan pastki yo'llardagi (subfolders) fetch so'rovlarini tuta oladi. Agar siz uni \`/js/sw.js\` ichiga joylashtirsangiz, u \`/index.html\` ga tegishli tarmoq so'rovlarini tutolmaydi!
#### To'g'ri yechim:
Service Worker faylini loyihaning eng asosiy root (ildiz) papkasiga joylashtirish lozim: \`/sw.js\`.

### 2. Keshni yangilashni unutish (Stale Cache)
#### Xato:
Fayllar keshga yozilgach, brauzer ularni doim keshdan o'qiydi. Agar siz CSS yoki JS kodini o'zgartirsangiz va Service Worker-dagi kesh nomini (masalan: \`v1\` ni \`v2\` ga) o'zgartirmasangiz, foydalanuvchilarga saytning eski ko'rinishi ochilaveradi.
#### To'g'ri yechim:
Har safar kod o'zgarganda \`CACHE_NAME\` versiyasini yangilang va \`activate\` hodisasida eski keshni o'chiring.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Service Worker nima va u qayerda ishlaydi?
   * **Javob:** Service Worker — bu brauzer va tarmoq o'rtasida ishlaydigan, sahifa kontekstidan alohida fondagi skriptdir. U oflayn ishlash, kesh yozish va push bildirishnomalarini ta'minlash uchun kerak.
2. **Savol:** Nega Service Worker faqat HTTPS da ishlaydi?
   * **Javob:** Chunki u tarmoq so'rovlarini tutib olib, ularga soxta javoblar qaytarishi ham mumkin (Man-in-the-Middle hujumi xavfi tufayli faqat shifrlangan xavfsiz HTTPS ulanish talab qilinadi).
3. **Savol:** Web App Manifest nima?
   * **Javob:** Bu \`manifest.json\` fayli bo'lib, PWA ilovasining ikonkasi, nomi, boshlang'ich URL manzili va orqa fon ranglarini belgilaydi, bu esa ilovani telefonga o'rnatish imkonini beradi.
4. **Savol:** Service Worker-da qaysi kesh saqlash tizimi ishlatiladi?
   * **Javob:** Cache Storage API (HTTP Response va Request-larni saqlash uchun maxsus kesh) ishlatiladi.

### Middle (5–8)
5. **Savol:** Service Worker hayotiy siklidagi (lifecycle) asosiy bosqichlarni sanang.
   * **Javob:** Ro'yxatdan o'tish (Registration), O'rnatilish (Installation - \`install\`), Kutish (Waiting), Faollashuv (Activation - \`activate\`) va Faol holat (Active/Idle).
6. **Savol:** \`self.skipWaiting()\` nima vazifani bajaradi?
   * **Javob:** Yangi o'rnatilgan Service Worker eski ochiq turgan tablar yopilishini kutmasdan, darhol faol holatga o'tishini ta'minlaydi.
7. **Savol:** \`event.waitUntil()\` metodi nima uchun kerak?
   * **Javob:** Brauzerga ichidagi va'da (Promise) yakunlanmaguncha o'rnatish (install) yoki faollashtirish (activate) jarayonini tugatmaslikni buyuradi.
8. **Savol:** Cache-First va Network-First keshlash strategiyalarining farqi nimada?
   * **Javob:** Cache-First birinchi navbatda ma'lumotni keshdan o'qiydi (tezlik uchun). Network-First esa birinchi bo'lib tarmoqdan olishga harakat qiladi, agar internet yo'q bo'lsa, keyin keshga murojaat qiladi (yangiliklar kabi tez-tez o'zgaruvchan ma'lumotlar uchun).

### Senior (9–12)
9. **Savol:** \`clients.claim()\` metodi nima qiladi va u qachon chaqiriladi?
   * **Javob:** U faollashgan yangi Service Worker-ga sahifa qayta yuklanmasdanoq uning barcha ochiq mijozlarini (tablarini) darhol nazorat qilishga ruxsat beradi. Odatda \`activate\` hodisasida ishlatiladi.
10. **Savol:** Service Worker orqali fondagi ma'lumotlarni sinxronizatsiya qilish (Background Sync API) qanday ishlaydi?
    * **Javob:** Foydalanuvchi oflayn holatda biror amal bajarsa (masalan, xabar yuborsa), bu xabar navbatga saqlanadi. Service Worker tarmoq tiklanishini kutib turadi va internet paydo bo'lishi bilan fonda ma'lumotni serverga yuboradi.
11. **Savol:** PWA-da Push Notifications qanday amalga oshiriladi (Push API va Notification API bog'liqligi)?
    * **Javob:** Server \`Push API\` orqali brauzerning push-servisiga xabar yuboradi. Hatto sahifa yopiq bo'lsa ham, Service Worker xabarni tutib oladi va \`Notification API\` yordamida ekranga bildirishnoma chiqaradi.
12. **Savol:** Service Worker xotira sizib chiqishi (memory leaks) va resurslarni boshqarishda qanday cheklovlarga ega?
    * **Javob:** Service Worker doimiy faol bo'lmaydi (Event-driven). Agar hodisalar bo'lmasa, brauzer uni o'chirib qo'yadi va hodisa kelganda qayta uyg'otadi. Shuning uchun unda global o'zgaruvchilarda ma'lumot saqlab bo'lmaydi (ular o'chib ketishi mumkin). Buning o'rniga \`IndexedDB\` yoki \`Cache Storage\` ishlatilishi shart.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Oflayn rejimda ishlovchi Chat Ilova (Offline Message Queue)
Ilovada foydalanuvchi internet bo'lmaganda yozgan xabarlarini yo'qotmaslik uchun fondagi sinxronizatsiyadan foydalanilgan.

#### Yechim (sw-sync.js):
\`\`\`javascript
// main.js - Sahifadagi kod
async function sendMessage(text) {
  const messageObj = { text, timestamp: Date.now() };

  // Xabarni IndexedDB-ga vaqtinchalik saqlaymiz
  await saveToIndexedDB(messageObj);

  // Sync xizmatini ro'yxatdan o'tkazamiz
  const registration = await navigator.serviceWorker.ready;
  if ('sync' in registration) {
    // 'send-pending-messages' nomli sync hodisasini yoqamiz
    await registration.sync.register('send-pending-messages');
    console.log("Tarmoq tiklanganda xabar fonda yuboriladi!");
  } else {
    // Agar fon sinxronizatsiyasi ishlamasa, oddiy yuborish
    sendToServer(messageObj);
  }
}

// sw.js - Service Worker kodi
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-pending-messages') {
    event.waitUntil(
      // IndexedDB-dagi barcha saqlanib qolgan xabarlarni olib, serverga yuborish
      sendPendingMessagesToServer()
    );
  }
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Cache Busting:** Keshdagi fayllar yangilanishi uchun kesh nomidagi versiyani o'zgartirishdan tashqari, fayl nomlariga hashlar qo'shish tavsiya etiladi (masalan: \`styles.ab839d.css\`).
* **Cache limit o'rnatish:** Kesh hajmi cheksiz emas. Keshdagi eski rasmlar va keraksiz sahifalar sonini nazorat qilish va keraksizlarini tozalash (\`cache.delete()\`) algoritmlarini yozish zarur.

---

## 10. 📌 Cheat Sheet

| Hodisa / Metod | Qayerda chaqiriladi | Vazifasi |
| :--- | :--- | :--- |
| \`navigator.serviceWorker.register(url)\` | Asosiy Oqim (Page) | Service Worker-ni ro'yxatdan o'tkazadi |
| \`addEventListener('install', cb)\` | Service Worker | O'rnatilish bosqichida statik kesh yaratish uchun ishlatiladi |
| \`addEventListener('activate', cb)\` | Service Worker | Yangi versiya faollashganda eski keshni tozalash uchun ishlatiladi |
| \`addEventListener('fetch', cb)\` | Service Worker | Tarmoq so'rovlarini tutib qolib keshdan yoki tarmoqdan berish uchun ishlatiladi |
| \`caches.open(name)\` | Service Worker / Page | Yangi kesh xotirasini ochadi |
| \`cache.addAll(urls)\` | Service Worker / Page | Berilgan barcha manzillarni keshga yozadi |
| \`cache.put(req, res)\` | Service Worker / Page | Keshga bitta so'rov va javob juftligini yozadi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Service Worker ro'yxatdan o'tkazish",
    "instruction": "Brauzerda Service Worker qo'llab-quvvatlanishini tekshiring va `/sw.js` faylini ro'yxatdan o'tkazuvchi `registerSW()` funksiyasini yozing.",
    "startingCode": "function registerSW() {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js'); } shartidan foydalaning.",
    "test": "if (!code.includes('serviceWorker')) return 'navigator tekshiruvi amalga oshirilmadi';\nif (!code.includes('register')) return 'register() metodi chaqirilmadi';\nif (!code.includes('/sw.js')) return 'sw.js fayli yo\\'li to\\'g\\'ri ko\\'rsatilmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Install hodisasida kesh yaratish",
    "instruction": "Service Worker ichida `install` hodisasini tinglang. `caches.open('v1')` orqali keshni oching va unga `['/', '/index.html', '/styles.css']` fayllarini qo'shing (`addAll`).",
    "startingCode": "self.addEventListener('install', (event) => {\n  // Kodni shu yerda yozing\n});\n",
    "hint": "event.waitUntil(caches.open('v1').then(cache => cache.addAll([...]))) zanjiridan foydalaning.",
    "test": "if (!code.includes('install')) return 'install hodisasi tinglanmadi';\nif (!code.includes('caches.open')) return 'caches.open ishlatilmadi';\nif (!code.includes('addAll')) return 'addAll metodi chaqirilmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Fetch hodisasida keshdan javob qaytarish",
    "instruction": "Service Worker ichida tarmoq so'rovlarini tutib qolish (`fetch` event) va agar keshda mos keluvchi resurs mavjud bo'lsa, o'shani qaytarish (`caches.match(event.request)`), aks holda tarmoqdan yuklash kodini yozing.",
    "startingCode": "self.addEventListener('fetch', (event) => {\n  // Kodni shu yerda yozing\n});\n",
    "hint": "event.respondWith(caches.match(event.request).then(response => response || fetch(event.request))) dan foydalaning.",
    "test": "if (!code.includes('fetch')) return 'fetch hodisasi tinglanmadi';\nif (!code.includes('respondWith')) return 'respondWith ishlatilmadi';\nif (!code.includes('caches.match')) return 'caches.match ishlatilmadi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Service Worker nima vazifani bajaradi?",
    "options": [
      "Foydalanuvchi interfeysini bezatuvchi zamonaviy CSS klassidir",
      "Brauzer va tarmoq o'rtasida proksi bo'lib xizmat qiladigan, oflayn rejimni va push bildirishnomalarni boshqaradigan skript oqimi",
      "Ma'lumotlar bazasini brauzer ichida avtomatik sinxronizatsiya qiluvchi SQL so'rovi",
      "Sayt sahifalarini serverda avtomatik render qiladigan Node.js moduli"
    ],
    "correctAnswer": 1,
    "explanation": "Service Worker tarmoq so'rovlarini tutib olish, keshlash va internet yo'q bo'lganda (oflayn) saytning ishlashini ta'minlash uchun ishlatiladigan brauzer skriptidir."
  },
  {
    "id": 2,
    "question": "Service Worker-ning xavfsizlik talablariga ko'ra, u qaysi manzillarda ishlashi mumkin?",
    "options": [
      "Faqat oddiy HTTP protokoli ostida",
      "Faqat xavfsiz HTTPS protokoli (va localhost) ostida",
      "Faqat ftp:// manzillarida",
      "Istalgan tarmoq sharoitida cheklovsiz ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Service Worker tarmoq so'rovlarini o'zgartira olgani sababli, xavfsizlik nuqtai nazaridan faqat HTTPS ulanishlarda yoki mahalliy sinovlar uchun localhost manzillarida ishlashiga ruxsat berilgan."
  },
  {
    "id": 3,
    "question": "Progressive Web Apps (PWA) ning asosiy talablaridan biri nima?",
    "options": [
      "Faqat React yoki Vue JS kutubxonalari yordamida yaratilgan bo'lishi",
      "Ilova nomi va ikonkalarini belgilovchi manifest.json va oflayn rejimni ta'minlovchi Service Worker bo'lishi",
      "Faqat mobil qurilmalarda ishlashi va kompyuterlarda ochilmasligi",
      "Dastur kodlarining barchasi serverda shifrlangan bo'lishi"
    ],
    "correctAnswer": 1,
    "explanation": "PWA veb-saytni xuddi mobil ilovadek o'rnatish va oflayn rejimda ishga tushirish imkonini berishi uchun `manifest.json` (Manifest fayli) va `Service Worker` talab etiladi."
  },
  {
    "id": 4,
    "question": "Service Worker hayotiy siklida (lifecycle) ro'yxatdan o'tgandan so'ng birinchi bo'lib qaysi bosqichdan o'tadi?",
    "options": [
      "activate",
      "fetch",
      "install",
      "message"
    ],
    "correctAnswer": 2,
    "explanation": "Service Worker ro'yxatdan o'tgach, eng birinchi bo'lib `install` (o'rnatilish) bosqichidan o'tadi. Bu bosqichda ko'pincha statik fayllar keshga yozib olinadi."
  },
  {
    "id": 5,
    "question": "Service Worker-da eski keshlar va fayllarni tozalash ko'pincha qaysi bosqichda amalga oshiriladi?",
    "options": [
      "install",
      "fetch",
      "activate",
      "register"
    ],
    "correctAnswer": 2,
    "explanation": "Eski keshlar va eskirgan ma'lumotlarni o'chirish odatda Service Worker yangi versiyasi to'liq boshqaruvni qo'lga oladigan `activate` (faollashish) bosqichida amalga oshiriladi."
  },
  {
    "id": 6,
    "question": "Tarmoqdan kelayotgan barcha fetch so'rovlarini tutib qolish va ularga javob berish uchun qaysi hodisadan foydalaniladi?",
    "options": [
      "onrequest",
      "fetch",
      "get",
      "onhttp"
    ],
    "correctAnswer": 1,
    "explanation": "`fetch` hodisasi yordamida Service Worker saytdan chiquvchi har qanday tarmoq so'rovini tutib olib, unga tarmoqdan yoki keshdan javob qaytarishi mumkin."
  },
  {
    "id": 7,
    "question": "Service Worker-da yuklash tugaguncha uning o'rnatilish bosqichini ushlab turish uchun qaysi metod ishlatiladi?",
    "options": [
      "event.waitUntil()",
      "event.respondWith()",
      "event.hold()",
      "event.freeze()"
    ],
    "correctAnswer": 0,
    "explanation": "`event.waitUntil(promise)` metodi ichidagi va'da (Promise) bajarilguncha Service Worker-ning `install` yoki `activate` holatini tugallanmagan qilib ushlab turadi."
  },
  {
    "id": 8,
    "question": "Keshdagi mavjud resurslarni tekshirish va mos keluvchi faylni qaytarish uchun qaysi Cache API metodi chaqiriladi?",
    "options": [
      "caches.find()",
      "caches.match()",
      "caches.get()",
      "caches.retrieve()"
    ],
    "correctAnswer": 1,
    "explanation": "`caches.match(request)` kesh xotirasi ichidan so'ralgan URL yoki so'rovga mos keladigan oldindan saqlangan javobni (Response) izlab topadi."
  },
  {
    "id": 9,
    "question": "PWA ilovasining nomlari, ranglari va ikonkalarini belgilaydigan standart fayl qaysi?",
    "options": [
      "package.json",
      "sw.js",
      "manifest.json",
      "config.xml"
    ],
    "correctAnswer": 2,
    "explanation": "`manifest.json` — veb-ilovaning metadata fayli bo'lib, mobil va desktop qurilmalarga o'rnatish (Add to Home Screen) sozlamalarini o'z ichiga oladi."
  },
  {
    "id": 10,
    "question": "Yangi yozilgan Service Worker-ni kutish holatidan darhol va majburiy faol holatga o'tkazish uchun qaysi metod chaqiriladi?",
    "options": [
      "self.skipWaiting()",
      "self.activate()",
      "self.forceUpdate()",
      "self.close()"
    ],
    "correctAnswer": 0,
    "explanation": "`self.skipWaiting()` yangi Service Worker o'rnatilganidan so'ng eski brauzer tablarini yopishni kutmasdan, yangi versiyani darhol faollashtiradi."
  },
  {
    "id": 11,
    "question": "Cache-First (Kesh birinchi) strategiyasi nimani anglatadi?",
    "options": [
      "Faqat internet bo'lmaganda ishlaydigan strategiya",
      "Ma'lumotni birinchi bo'lib keshdan izlash, topsa qaytarish, topmasa tarmoqdan yuklash va keshga saqlash usuli",
      "Kesh xotirasini butunlay o'chirib yuborish",
      "Faqat serverdan yuklash strategiyasi"
    ],
    "correctAnswer": 1,
    "explanation": "Cache-First strategiyasi ilova yuklanish tezligini sezilarli darajada oshiradi, chunki u ma'lumotni tarmoqdan emas, birinchi navbatda local keshdan o'qiydi."
  },
  {
    "id": 12,
    "question": "Service Worker ichida DOM elementlarini to'g'ridan-to'g'ri o'zgartirish yoki unga kirish mumkinmi?",
    "options": [
      "Ha, bunga to'liq ruxsat berilgan",
      "Yo'q, u DOM-dan butunlay alohida fondagi oqimda ishlaydi",
      "Faqat tarmoq uzilib qolgan vaziyatlarda ruxsat bor",
      "Faqat rasmlarni yuklash paytida ruxsat berilgan"
    ],
    "correctAnswer": 1,
    "explanation": "Service Worker `window` kontekstidan tashqarida ishlaydi, shuning uchun unda DOM elementlariga bevosita kirish mutlaqo taqiqlangan. Agar DOM-ni o'zgartirish kerak bo'lsa, xabarni asosiy oqimga (postMessage orqali) yuborish lozim."
  }
]

};
