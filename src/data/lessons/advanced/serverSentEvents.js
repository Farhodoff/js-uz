export const serverSentEvents = {
  id: "serverSentEvents",
  title: "Server-Sent Events (SSE): Serverdan Bir Tomonlama Oqim",
  theory: `## 1. NEGA kerak?
Real-time ilovalarda har doim ham ikki tomonlama (mijoz ham, server ham yuboradigan) aloqaga ehtiyoj bo'lavermaydi. Masalan, ob-havo yangiliklari, yangiliklar tasmasi (news feed), birja narxlari yoki serverdagi uzoq davom etadigan jarayon progressini kuzatishda faqat server yangi ma'lumotlarni mijozga jo'natib tursa kifoya. WebSockets bu kabi vazifalar uchun juda murakkab va ortiqcha sozlamalarni talab qiladi. Shunday holatlar uchun HTML5-da **Server-Sent Events (SSE)** texnologiyasi joriy qilingan. SSE oddiy HTTP protokoli ustida ishlaydi, brauzer tomonidan avtomatik qayta ulanishni qo'llab-quvvatlaydi va juda sodda API (\`EventSource\` obyekti) orqali boshqariladi.

## 2. SODDALIK (Analogiya)
WebSockets-ni **ikki kishilik telefon suhbatiga** o'xshatsak, Server-Sent Events (SSE) ni **radio eshittirishga** o'xshatish mumkin. Mijoz (radio tinglovchi) radiostansiyaga ulanadi (EventSource yaratadi), server (radioboshlovchi) esa uzluksiz ma'lumot uzatadi. Mijoz radioga gapira olmaydi (ma'lumot yubora olmaydi), lekin doimo yangi ma'lumotlarni eshitib turadi.

## 3. STRUKTURA
JavaScript-da SSE bilan ishlash uchun \`EventSource\` obyektidan foydalaniladi.

\`\`\`javascript
// 1. EventSource ulanishini yaratish
const source = new EventSource('/api/live-stream');

// 2. Server bilan aloqa o'rnatilganda
source.onopen = (event) => {
  console.log('Server bilan bog\\'lanildi!');
};

// 3. Serverdan standart xabar kelganda
source.onmessage = (event) => {
  console.log('Yangi ma\\'lumot:', event.data);
};

// 4. Serverdan maxsus nomli voqea kelganda (Custom Event)
source.addEventListener('scoreUpdate', (event) => {
  console.log('Hisob o\\'zgardi:', event.data);
});

// 5. Xatolik yuz berganda
source.onerror = (event) => {
  if (source.readyState === EventSource.CLOSED) {
    console.log('Ulanish server tomonidan yopildi.');
  } else {
    console.error('Xatolik yuz berdi.');
  }
};
\`\`\`

### Server-Sent Events-ning ishlash protokoli:
Server javob qaytarganda quyidagi HTTP sarlavhalarini (headers) yuborishi shart:
- \`Content-Type: text/event-stream\`
- \`Cache-Control: no-cache\`
- \`Connection: keep-alive\`

Serverdan yuboriladigan ma'lumot formati quyidagicha bo'ladi:
\`\`\`text
data: Salom mijoz\n\n
\`\`\`
yoki maxsus voqea uchun:
\`\`\`text
event: scoreUpdate
data: 2-1
\n\n
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Ikki tomonlama aloqa qilishga urinish:** SSE faqat serverdan mijozga (one-way) ma'lumot jo'natadi. Agar mijoz ham serverga real-time ma'lumot yuborishi kerak bo'lsa, SSE mos kelmaydi. Mijoz ma'lumot yuborishi uchun an'anaviy \`fetch()\` dan yoki WebSockets-dan foydalanishi kerak.
2. **Serverda buffering-ni yopmaslik:** Ko'pgina veb-serverlar (masalan, Nginx) ma'lumotlarni bufferlab, keyin birdaniga yuboradi. SSE ishlashi uchun serverda buffering o'chirilgan bo'lishi shart (\`X-Accel-Buffering: no\`), aks holda ma'lumotlar real-vaqtda yetib bormaydi.
3. **HTTP/1.1-da ulanishlar soni cheklovi:** Brauzerlar bitta domen uchun HTTP/1.1 orqali maksimal 6 ta doimiy ulanishni qo'llab-quvvatlaydi. Agar foydalanuvchi bir nechta tab ochsa, 7-tab yuklanmay qoladi. Buni hal qilish uchun HTTP/2 ishlatish lozim (HTTP/2-da bu cheklov yo'q).

## 6. SAVOLLAR VA JAVOBLAR
**1. Server-Sent Events (SSE) nima?**
HTTP orqali serverdan mijozga real-vaqtda bir tomonlama ma'lumotlar oqimini uzatish texnologiyasi.

**2. SSE qaysi API orqali boshqariladi?**
Brauzerdagi standart \`EventSource\` API-si orqali.

**3. SSE va WebSockets o'rtasidagi asosiy farq nima?**
WebSockets ikki tomonlama (bi-directional), SSE esa faqat bir tomonlama (server -> mijoz) aloqadir.

**4. SSE-da avtomatik qayta ulanish (reconnection) bormi?**
Ha, brauzer tarmoq uzilsa, o'zi avtomatik ravishda serverga qayta ulanishga harakat qiladi.

**5. Server SSE uchun qaysi Content-Type header-ni qaytarishi kerak?**
\`text/event-stream\`.

**6. EventSource.readyState holatlari qaysilar?**
\`0\` (\`CONNECTING\`), \`1\` (\`OPEN\`), \`2\` (\`CLOSED\`).

**7. Serverdan kelgan maxsus nomli voqeani (masalan, "ping") qanday eshitamiz?**
\`source.addEventListener('ping', callback)\` yordamida.

**8. EventSource ulanishini qanday yopamiz?**
\`source.close()\` metodi orqali.

**9. Serverdan kelayotgan ma'lumot satri qanday belgi bilan tugashi kerak?**
Ikkita yangi qator belgisi (\`\\n\\n\`) bilan.

**10. SSE shifrlangan ulanishlarni qo'llab-quvvatlaydimi?**
Ha, agar HTTPS sahifada ishlatilsa, avtomatik ravishda xavfsiz HTTP kanali orqali ishlaydi.

**11. Server mijozga qayta ulanish vaqtini (retry interval) o'zgartirishni qanday buyurishi mumkin?**
Server javobida \`retry: 5000\\n\` satrini yuborish orqali (bu qayta ulanishni 5 soniyaga sozlaydi).

**12. SSE-da CORS (Cross-Origin Resource Sharing) qo'llab-quvvatlanadimi?**
Ha, ikkinchi parametr sifatida \`{ withCredentials: true }\` kabi sozlamalarni berish mumkin.
`,
  exercises: [
    {
      id: 1,
      title: "EventSource yaratish",
      instruction: "'/api/stream' manziliga ulanuvchi yangi EventSource obyektini yarating va uni 'source' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nconst source = ",
      hint: "new EventSource('/api/stream')",
      test: "if (code.includes(\"new EventSource('/api/stream')\") || code.includes('new EventSource(\"/api/stream\")')) return null; return 'EventSource obyektini to\\'g\\'ri manzilda yarating.';"
    },
    {
      id: 2,
      title: "Ulanish ochilishini kuzatish",
      instruction: "'source' ulanishi muvaffaqiyatli ochilganda (onopen) konsolga 'SSE ulanishi ochiq' deb chiqaruvchi kod yozing.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.onopen = () => {\n  console.log('SSE ulanishi ochiq');\n};",
      test: "if (code.includes('onopen') && code.includes('SSE ulanishi ochiq')) return null; return 'onopen hodisasini to\\'g\\'ri belgilang.';"
    },
    {
      id: 3,
      title: "Xabarlarni qabul qilish",
      instruction: "Serverdan xabar kelganda (onmessage) uning ma'lumotini (event.data) konsolga yozadigan funksiya sozlang.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.onmessage = (event) => {\n  console.log(event.data);\n};",
      test: "if (code.includes('onmessage') && (code.includes('event.data') || code.includes('data'))) return null; return 'onmessage ichida event.data-ni konsolga chiqaring.';"
    },
    {
      id: 4,
      title: "Maxsus voqeani eshitish",
      instruction: "'source' obyektiga 'news' nomli maxsus voqeani (custom event) eshitadigan va kelgan ma'lumotni konsolga chiqaradigan tinglovchi (addEventListener) qo'shing.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.addEventListener('news', (event) => {\n  console.log(event.data);\n});",
      test: "if (code.includes(\"addEventListener('news'\") || code.includes('addEventListener(\"news\"')) return null; return 'addEventListener yordamida news voqeasini eshiting.';"
    },
    {
      id: 5,
      title: "Ulanishni yopish",
      instruction: "Server bilan aloqani butunlay to'xtatish uchun 'source' ulanishini yopuvchi metodni chaqiring.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.close();",
      test: "if (code.includes('source.close()')) return null; return 'source.close() metodini chaqiring.';"
    },
    {
      id: 6,
      title: "Xatoliklarni boshqarish",
      instruction: "Agar ulanishda xatolik bo'lsa (onerror), konsolga 'Xato yuz berdi' deb chiqaruvchi kod yozing.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.onerror = () => {\n  console.error('Xato yuz berdi');\n};",
      test: "if (code.includes('onerror') && code.includes('Xato yuz berdi')) return null; return 'onerror hodisasi orqali xatoni konsolga chiqaring.';"
    },
    {
      id: 7,
      title: "CORS bilan EventSource yaratish",
      instruction: "'/api/stream' manziliga shaxsiy ma'lumotlar (cookies/credentials) bilan ulanish uchun EventSource obyektini ikkinchi parametr { withCredentials: true } bilan yarating.",
      startingCode: "// Bu yerga yozing\nconst source = ",
      hint: "new EventSource('/api/stream', { withCredentials: true })",
      test: "if (code.includes('withCredentials: true')) return null; return 'withCredentials: true sozlamasini qo\\'shing.';"
    },
    {
      id: 8,
      title: "Ulanish holatini o'qish",
      instruction: "'source.readyState' joriy holatini tekshirib, agar u ulanayotgan (EventSource.CONNECTING) holatda bo'lsa, konsolga 'Ulanmoqda...' chiqaradigan kod yozing.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "if (source.readyState === EventSource.CONNECTING) {\n  console.log('Ulanmoqda...');\n}",
      test: "if (code.includes('readyState') && (code.includes('EventSource.CONNECTING') || code.includes('0'))) return null; return 'readyState-ni EventSource.CONNECTING holati bilan solishtiring.';"
    },
    {
      id: 9,
      title: "JSON obyektni parse qilish",
      instruction: "onmessage hodisasida kelgan event.data-ni parse qilib, undagi 'price' qiymatini konsolga yozadigan kod yozing.",
      startingCode: "const source = new EventSource('/api/stream');\nsource.onmessage = (event) => {\n  // Bu yerga yozing\n  \n};",
      hint: "const obj = JSON.parse(event.data);\nconsole.log(obj.price);",
      test: "if (code.includes('JSON.parse(event.data)') && (code.includes('.price') || code.includes('[\"price\"]'))) return null; return 'event.data-ni parse qilib, price xususiyatini chiqaring.';"
    },
    {
      id: 10,
      title: "EventSource-ni tekshirish",
      instruction: "Brauzer EventSource-ni qo'llab-quvvatlashini tekshiring: agar u mavjud bo'lsa (typeof EventSource !== 'undefined'), 'isSupported' o'zgaruvchisini true ga tenglang.",
      startingCode: "// Bu yerga yozing\nlet isSupported = false;\n",
      hint: "if (typeof EventSource !== 'undefined') {\n  isSupported = true;\n}",
      test: "if (code.includes('typeof EventSource') && code.includes('undefined')) return null; return 'EventSource mavjudligini typeof tekshiruvi orqali aniqlang.';"
    },
    {
      id: 11,
      title: "addEventListener orqali standart xabar olish",
      instruction: "'onmessage' o'rniga 'addEventListener' metodidan foydalanib, standart 'message' voqeasini eshiting va konsolga event.data-ni chiqaring.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\n",
      hint: "source.addEventListener('message', (event) => {\n  console.log(event.data);\n});",
      test: "if (code.includes(\"addEventListener('message'\") || code.includes('addEventListener(\"message\"')) return null; return 'addEventListener yordamida message voqeasini sozlang.';"
    },
    {
      id: 12,
      title: "Yopiq holatni aniqlash",
      instruction: "'source' ulanishi to'liq yopilganligini (EventSource.CLOSED) aniqlaydigan va natijani 'isClosed' o'zgaruvchisiga saqlovchi kod yozing.",
      startingCode: "const source = new EventSource('/api/stream');\n// Bu yerga yozing\nconst isClosed = ",
      hint: "source.readyState === EventSource.CLOSED",
      test: "if (code.includes('readyState') && (code.includes('EventSource.CLOSED') || code.includes('2'))) return null; return 'readyState-ni EventSource.CLOSED qiymatiga solishtiring.';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Server-Sent Events (SSE) texnologiyasi qaysi protokol ustida ishlaydi?",
      options: [
        "Faqat WebSocket protokoli",
        "Standart HTTP protokoli",
        "FTP protokoli",
        "SMTP protokoli"
      ],
      correctAnswer: 1,
      explanation: "SSE to'liq standart HTTP/HTTPS protokollari ustida ishlaydi va qo'shimcha murakkab aloqa protokollarini talab qilmaydi."
    },
    {
      id: 2,
      question: "SSE texnologiyasining yo'nalishi qanday?",
      options: [
        "Ikki tomonlama (Full-duplex)",
        "Bir tomonlama - faqat mijozdan serverga",
        "Bir tomonlama - faqat serverdan mijozga (One-way)",
        "Tarmoqsiz rejimda ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "SSE bir tomonlama aloqa turi bo'lib, faqat server mijozga yangilanishlarni yubora oladi."
    },
    {
      id: 3,
      question: "EventSource ulanishini yaratish uchun qaysi brauzer obyekti ishlatiladi?",
      options: [
        "new WebSocket()",
        "new XMLHttpRequest()",
        "new EventSource()",
        "new FetchStream()"
      ],
      correctAnswer: 2,
      explanation: "SSE ulanishini o'rnatish va boshqarish uchun EventSource klassidan foydalaniladi."
    },
    {
      id: 4,
      question: "Server SSE orqali ma'lumot yuborganda qaysi sarlavhani (header) qaytarishi shart?",
      options: [
        "Content-Type: application/json",
        "Content-Type: text/event-stream",
        "Content-Type: text/html",
        "Content-Type: multipart/form-data"
      ],
      correctAnswer: 1,
      explanation: "SSE protokoli to'g'ri ishlashi uchun server javob sarlavhasida Content-Type: text/event-stream bo'lishi talab etiladi."
    },
    {
      id: 5,
      question: "EventSource readyState qiymati 2 ga teng bo'lsa, u qaysi holatni bildiradi?",
      options: [
        "CONNECTING - Ulanmoqda",
        "OPEN - Aloqa ochiq",
        "CLOSED - Aloqa butunlay yopilgan",
        "ERROR - Xatolik yuz berdi"
      ],
      correctAnswer: 2,
      explanation: "0 = CONNECTING, 1 = OPEN, 2 = CLOSED. Shuning uchun 2 qiymati ulanish yopilganini anglatadi."
    },
    {
      id: 6,
      question: "Agar aloqa kutilmaganda uzilib qolsa, EventSource qanday harakat qiladi?",
      options: [
        "Aloqa uzilganicha qoladi va JavaScript xato beradi",
        "Brauzer ma'lum vaqtdan so'ng avtomatik ravishda qayta ulanishga harakat qiladi",
        "Foydalanuvchiga internet uzildi degan oyna ochiladi",
        "Sahifa majburan yangilanadi (reload)"
      ],
      correctAnswer: 1,
      explanation: "EventSource API-ning asosiy qulayliklaridan biri bu - avtomatik tarzda (built-in auto-reconnection) qayta ulanish mexanizmidir."
    },
    {
      id: 7,
      question: "Serverdan yuborilayotgan xabarning asosiy ma'lumot qismi qaysi kalit so'z bilan boshlanishi kerak?",
      options: [
        "message: ...",
        "content: ...",
        "data: ...",
        "payload: ..."
      ],
      correctAnswer: 2,
      explanation: "SSE spetsifikatsiyasiga ko'ra ma'lumot satri 'data: ' prefiksi bilan yuboriladi."
    },
    {
      id: 8,
      question: "Serverdan kelgan maxsus nomlangan voqealarni qanday tutish mumkin?",
      options: [
        "onmessage orqali avtomatik keladi",
        "source.addEventListener('voqea_nomi', callback) yordamida",
        "oncustom event handler orqali",
        "Uni tutishning iloji yo'q, faqat standart xabar keladi"
      ],
      correctAnswer: 1,
      explanation: "Agar server xabarni 'event: eventName' ko'rinishida yuborsa, mijoz uni addEventListener('eventName', ...) yordamida tinglashi shart."
    },
    {
      id: 9,
      question: "Bitta brauzer tabida HTTP/1.1 ostida nechta maksimal doimiy SSE ulanishini ochish mumkin?",
      options: [
        "Cheksiz",
        "Maksimal 6 ta ulanish (har bir domen uchun)",
        "Faqat 1 ta ulanish",
        "100 ta ulanish"
      ],
      correctAnswer: 1,
      explanation: "HTTP/1.1 brauzer cheklovlariga ko'ra bitta domen uchun parallel ulanishlar soni 6 tadan oshmaydi. HTTP/2 da esa bu cheklov bartaraf etilgan."
    },
    {
      id: 10,
      question: "Server mijozga qayta ulanish tezligini (retry interval) o'zgartirishni qanday ma'lum qiladi?",
      options: [
        "HTTP header-lar orqali",
        "Oqim ichida 'retry: millisekundlar\\n' yuborish orqali",
        "Mijoz close() qilib qayta ulanishi kerak",
        "Bu vaqtni o'zgartirib bo'lmaydi, u har doim 1 soniyaga teng"
      ],
      correctAnswer: 1,
      explanation: "Server oqim orqali 'retry: 5000\\n' ko'rinishida ma'lumot jo'natsa, brauzer qayta ulanish vaqtini ko'rsatilgan millisekundga o'zgartiradi."
    },
    {
      id: 11,
      question: "EventSource-da CORS xavfsizligini ta'minlash uchun qaysi sozlamadan foydalaniladi?",
      options: [
        "{ cors: 'true' }",
        "{ withCredentials: true }",
        "{ headers: { 'Authorization': '...' } }",
        "{ mode: 'no-cors' }"
      ],
      correctAnswer: 1,
      explanation: "EventSource faqat ikkinchi parametrda { withCredentials: true } obyektini qabul qiladi, u orqali cookie yoki auth tokenlarni boshqa domenga yuborishga ruxsat beriladi."
    },
    {
      id: 12,
      question: "Ulanishni server tomonidan ham, mijoz tomonidan ham butunlay to'xtatish uchun mijoz nima qilishi kerak?",
      options: [
        "socket.close() qilish kerak",
        "source.close() qilish kerak",
        "source.disconnect() chaqirish kerak",
        "Ulanishni faqat brauzerni yopish orqali yopish mumkin"
      ],
      correctAnswer: 1,
      explanation: "Mijoz tomonidan ulanishni yopish va serverni ortiqcha band qilmaslik uchun source.close() metodi ishlatiladi."
    }
  ]
};
