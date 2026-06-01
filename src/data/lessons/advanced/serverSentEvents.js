export const serverSentEvents = {
  id: "serverSentEvents",
  title: "Server-Sent Events (SSE): Serverdan Bir Tomonlama Oqim",
  level: "Murakkab",
  description: "HTTP protokoli ustida serverdan mijozga real-vaqtda bir tomonlama ma'lumotlar oqimini uzatish.",
  theory: `## 1. NEGA kerak?
Real-time ilovalarda har doim ham ikki tomonlama (mijoz ham, server ham yuboradigan) aloqaga ehtiyoj bo'lavermaydi. Masalan, ob-havo yangiliklari, yangiliklar tasmasi (news feed), birja narxlari yoki serverdagi uzoq davom etadigan jarayon progressini kuzatishda faqat server yangi ma'lumotlarni mijozga jo'natib tursa kifoya. WebSockets bu kabi vazifalar uchun juda murakkab va ortiqcha sozlamalarni talab qiladi. Shunday holatlar uchun HTML5-da **Server-Sent Events (SSE)** texnologiyasi joriy qilingan. SSE oddiy HTTP protokoli ustida ishlaydi, brauzer tomonidan avtomatik qayta ulanishni qo'llab-quvvatlaydi va juda sodda API (\`EventSource\` obyekti) orqali boshqariladi.

---

## 2. SODDALIK (Analogiya)
WebSockets-ni **ikki kishilik telefon suhbatiga** o'xshatsak, Server-Sent Events (SSE) ni **radio eshittirishga** o'xshatish mumkin. Mijoz (radio tinglovchi) radiostansiyaga ulanadi (EventSource yaratadi), server (radioboshlovchi) esa uzluksiz ma'lumot uzatadi. Mijoz radioga gapira olmaydi (ma'lumot yubora olmaydi), lekin doimo yangi ma'lumotlarni eshitib turadi.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. HTTP/2 Multiplexing va Ulanish Cheklovlari
* **HTTP/1.1 Cheklovi:** Brauzerlar bitta domen uchun maksimal **6 ta** doimiy HTTP ulanishini ochishi mumkin. Agar foydalanuvchi saytning 6 ta tabini (oynasini) ochsa va ularning har birida SSE faol bo'lsa, 7-tab butunlay yuklanmay qotib qoladi (tarmoq ulanishlari to'lib ketadi).
* **HTTP/2 Yechimi:** HTTP/2 protokolida **Multiplexing** (so'rovlarni bitta kanalga jamlash) qo'llaniladi. Unda barcha SSE oqimlari va oddiy HTTP so'rovlari bitta umumiy TCP ulanishi orqali uzatiladi. Bu esa cheklovni butunlay yo'qotib, yuzlab tablarda bir vaqtda SSE ishlatish imkonini beradi.

\`\`\`mermaid
graph TD
    subgraph HTTP/1.1 (Cheklangan)
        T1[Tab 1] -->|TCP Connection 1| S1[(Server)]
        T2[Tab 2] -->|TCP Connection 2| S1
        T6[Tab 6] -->|TCP Connection 6| S1
        T7[Tab 7] -->|Bloklanadi| S1
    end
    subgraph HTTP/2 (Multiplexed)
        M1[Tab 1] -->|Stream 1| TCP[Single TCP Connection]
        M2[Tab 2] -->|Stream 2| TCP
        M7[Tab 7] -->|Stream 7| TCP
        TCP --> S2[(Server)]
    end
\`\`\`

### B. Proxy Buffering (Nginx muammosi)
SSE ishlashi uchun server ma'lumotni tayyor bo'lishi bilan zudlik bilan jo'natishi (flush/stream) kerak. Biroq, Nginx yoki boshqa teskari proksi (reverse proxy) serverlar sukut bo'yicha ma'lumotlarni **bufferlab** (yig'ib), keyin birdaniga jo'natishga harakat qiladi. Bu real-vaqt rejimini buzadi.
* **Yechim:** Server javob berayotganda maxsus \`X-Accel-Buffering: no\` sarlavhasini yuborishi kerak. Bu Nginx-ga ma'lumotlarni bufferlamasdan darhol mijozga uzatishni buyuradi.

### C. Custom Event Turlari
SSE oqimida har xil turdagi voqealarni ajratish uchun maxsus nomli voqealar yuborilishi mumkin:
\`\`\`text
event: userLogin
data: {"username": "Ali"}

event: scoreUpdate
data: 2-1
\`\`\`
Mijozda bularni alohida eshitish uchun:
\`\`\`javascript
source.addEventListener('userLogin', (e) => { ... });
source.addEventListener('scoreUpdate', (e) => { ... });
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant S as Server (text/event-stream)
    participant C as Client (EventSource)
    S->>C: event: scoreUpdate \n data: 2-1 \n\n
    Note over C: scoreUpdate listener ishlaydi
    S->>C: data: Standart xabar \n\n
    Note over C: onmessage listener ishlaydi
\`\`\`

---

## 4. XATOLAR (Common mistakes)
1. **POST so'rov yuborishga urinish:** Standart \`EventSource\` faqat **GET** so'rovlarini qo'llab-quvvatlaydi. Agar siz serverga ma'lumot yubormoqchi bo'lsangiz, uni faqat URL query parametrlar (masalan, \`/stream?userId=123\`) orqali uzata olasiz.
2. **Double Linefeed (\\n\\n) ni unutish:** SSE protokolida har bir xabar bloki albatta **ikkita yangi qator belgisi (\\n\\n)** bilan tugashi shart. Agar server oxirida bitta \`\\n\` yuborsa, brauzer ma'lumot tugallanganini tushunmaydi va uni mijoz kodiga yetkazib bermaydi.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. Server-Sent Events (SSE) nima?**
HTTP orqali serverdan mijozga real-vaqtda bir tomonlama ma'lumotlar oqimini uzatish texnologiyasi.

**2. SSE qaysi API orqali boshqariladi?**
Brauzerdagi standart \`EventSource\` API-si orqali.

**3. SSE va WebSockets o'rtasidagi asosiy farq nima?**
WebSockets ikki tomonlama (bi-directional), SSE esa faqat bir tomonlama (server -> mijoz) aloqadir.`,
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
    },
    {
      id: 13,
      title: "1️⃣3️⃣ SSE Ulanishini Tekshiruvchi (checkSSEConnection)",
      instruction: "Berilgan `EventSource` ulanishi faol ulanish jarayonida (`CONNECTING` ya'ni 0) ekanligini aniqlaydigan va `true`/`false` qaytaradigan `checkSSEConnection(source)` funksiyasini yozing.",
      startingCode: "function checkSSEConnection(source) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return !!(source && source.readyState === 0);",
      test: "if (typeof checkSSEConnection !== 'function') return 'checkSSEConnection funksiya emas';\nif (checkSSEConnection(null) !== false) return 'null ulanish uchun false bo\\'lishi kerak';\nif (checkSSEConnection({ readyState: 0 }) !== true) return 'CONNECTING (0) holatida true qaytmadi';\nif (checkSSEConnection({ readyState: 1 }) !== false) return 'OPEN (1) holatida false qaytmadi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ SSE JSON Xavfsiz Parser (parseSSEData)",
      instruction: "Serverdan kelgan SSE xabari (`eventData` satri) JSON formatida bo'lsa uni obyektga parse qilib qaytaradigan, agar JSON bo'lmasa yoki parse qilishda xatolik bo'lsa xavfsiz ravishda asl satrni o'zini qaytaradigan `parseSSEData(eventData)` funksiyasini yozing.",
      startingCode: "function parseSSEData(eventData) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return JSON.parse(eventData); } catch (e) { return eventData; }",
      test: "if (typeof parseSSEData !== 'function') return 'parseSSEData funksiya emas';\nconst parsed = parseSSEData('{\"status\":\"ok\"}');\nif (!parsed || parsed.status !== 'ok') return 'JSON matn parse qilinmadi';\nif (parseSSEData('oddiy matn') !== 'oddiy matn') return 'Oddiy matnda xato qaytdi';\nif (parseSSEData(null) !== null) return 'null uchun to\\'g\\'ri qaytmadi';\nreturn null;"
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
    },
    {
      id: 13,
      question: "HTTP/2 protokolidagi multiplexing xususiyati SSE ulanishlariga qanday ta'sir qiladi?",
      options: [
        "U SSE-ni butunlay bloklaydi",
        "U HTTP/1.1-dagi bitta domen uchun maksimal 6 ta ulanish cheklovini olib tashlab, yuzlab tablarda bir vaqtda SSE-ni bloklanishlarsiz ishlatish imkonini beradi",
        "U ma'lumotlarni faqat POST so'rovi orqali yuborishga majburlaydi",
        "U avtomatik qayta ulanishni o'chirib qo'yadi"
      ],
      correctAnswer: 1,
      explanation: "HTTP/2 multiplexing barcha oqimlarni bitta TCP ulanishiga joylashtirgani uchun brauzerning 6 ta ulanish limiti endi SSE ulanishlarini to'sib qo'ymaydi."
    },
    {
      id: 14,
      question: "Teskari proksi server (masalan, Nginx) orqali yuborilgan SSE ma'lumotlari kechikish bilan yetib kelishining oldini olish uchun server qaysi HTTP sarlavhasini yuborishi kerak?",
      options: [
        "X-Accel-Buffering: no",
        "Cache-Control: public",
        "Connection: close",
        "Content-Encoding: gzip"
      ],
      correctAnswer: 0,
      explanation: "Nginx sukut bo'yicha ma'lumotni bufferda yig'adi. X-Accel-Buffering: no sarlavhasi Nginx-ga buffering-ni o'chirib, ma'lumotlarni real-vaqtda uzatishni buyuradi."
    }
  ]
};
