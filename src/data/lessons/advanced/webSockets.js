export const webSockets = {
  id: "webSockets",
  title: "WebSockets: Real-time Ikki Tomonlama Aloqa",
  level: "Murakkab",
  description: "Mijoz va server o'rtasida doimiy, ikki tomonlama real-vaqt rejimida aloqa protokoli.",
  theory: `## 1. NEGA kerak?
An'anaviy HTTP so'rovlarida mijoz (brauzer) doimo birinchi bo'lib so'rov yuboradi, server esa javob qaytaradi. Server o'z-o'zidan mijozga yangi ma'lumot jo'nata olmaydi. Real-time ilovalar (chatlar, birja grafiklari, bildirishnomalar, ko'p foydalanuvchili o'yinlar) uchun brauzer har soniyada serverdan yangilik bormi deb so'rab turishi (Polling) juda samarasiz va tarmoqni ortiqcha yuklaydi. WebSockets protokoli mijoz va server o'rtasida doimiy, ochiq va ikki tomonlama (bi-directional) aloqa kanalini o'rnatish orqali bu muammoni hal qiladi. Bu orqali har ikki tomon ham istalgan vaqtda bir-biriga juda kam kechikish (low latency) bilan ma'lumot yubora oladi.

---

## 2. SODDALIK (Analogiya)
HTTP protokoli **pochta orqali xat yuborishga** o'xshaydi: siz xat yuborasiz va javobini kutasiz, server esa siz so'ramaguningizcha yangi xat yubora olmaydi.
WebSockets esa **telefon qo'ng'irog'iga** o'xshaydi: aloqa o'rnatilgach, trubkani qo'ymaguningizcha ikkala tomon ham bir vaqtda gapira oladi va bir-birini darhol eshitadi.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. WebSocket Handshake (Ulanish o'rnatish)
WebSocket TCP ulanishini o'rnatish uchun HTTP protokolining maxsus "Upgrade" (yangilash) mexanizmidan foydalanadi:
1. Brauzer serverga odatiy HTTP GET so'rovini yuboradi, lekin sarlavhalarda (headers) ulanishni WebSocket-ga o'zgartirishni so'raydi:
   \`\`\`http
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Sec-WebSocket-Version: 13
   \`\`\`
2. Server rozilik bildirsa, HTTP **101 Switching Protocols** javobini qaytaradi:
   \`\`\`http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   \`\`\`
3. Shu lahzadan boshlab HTTP ulanishi butunlay tugaydi va TCP soketi orqali to'g'ridan-to'g'ri WebSocket protokoli ishga tushadi.

\`\`\`mermaid
sequenceDiagram
    participant C as Brauzer (Client)
    participant S as Server
    Note over C,S: 1. HTTP Handshake bosqichi
    C->>S: GET /chat (Upgrade: websocket)
    S-->>C: 101 Switching Protocols
    Note over C,S: 2. WebSocket Ikki tomonlama ochiq kanal (TCP)
    C->>S: Bidirectional Data (Framed)
    S->>C: Bidirectional Data (Framed)
\`\`\`

### B. Heartbeat Ping-Pong (Ulanishni ushlab turish)
Agar WebSocket kanali orqali uzoq vaqt davomida hech qanday ma'lumot uzatilmasa, yo'ldagi tarmoq routerlari, proksilar yoki serverlar ulanishni "o'lik ulanish" (idle timeout) deb hisoblab, uni avtomatik yopib yuborishi mumkin. Buni oldini olish uchun **Heartbeat** (yurak urishi) mexanizmi ishlatiladi:
- Mijoz yoki server har 30-60 soniyada kichik "Ping" ramkasini (frame) jo'natadi.
- Ikkinchi tomon zudlik bilan "Pong" ramkasi bilan javob qaytarishi shart.
- Agar ma'lum vaqt ichida javob kelmasa, ulanish uzilgan deb hisoblanadi va qayta ulanish (reconnect) ishga tushiriladi.

\`\`\`mermaid
sequenceDiagram
    participant C as Client (Browser)
    participant S as Server
    loop Har 30 soniyada (Heartbeat Interval)
        C->>S: Ping (U yerdamisan?)
        S-->>C: Pong (Ha, shu yerdaman!)
    end
    Note over C,S: Agar serverdan Pong kelmasa, ulanish qayta ochiladi.
\`\`\`

### C. BinaryType (Ikkilik ma'lumotlar bilan ishlash)
WebSocket orqali nafaqat matn, balki media fayllar yoki raw binary ma'lumotlar uzatish ham mumkin. Brauzer binary ma'lumotlarni qanday formatda qabul qilishini belgilash uchun \`binaryType\` xossasidan foydalaniladi:
* **\`blob\` (sukut bo'yicha):** Fayllar, rasmlar kabi diskda saqlanadigan xom ma'lumotlar uchun mos.
* **\`arraybuffer\`:** Xotirada tezkor ishlov berish kerak bo'lgan, audio/video oqimlar yoki binar tarmoq paketlari uchun mo'ljallangan.

---

## 4. XATOLAR (Common mistakes)
1. **ReadyState-ni tekshirmaslik:** WebSocket obyekti yaratilishi bilan uning xotiradagi holati hali \`CONNECTING\` bo'ladi. Ulanish to'liq ochiq (\`OPEN\`) bo'lmasdan turib \`send()\` metodini chaqirish dasturning to'xtab qolishiga olib keladi.
2. **Ulanish uzilishini hisobga olmaslik:** Internet sifati yomonlashganda yoki mobil tarmoq almashganda WebSocket jimgina uziladi. Dasturda avtomatik reconnect va offline boshqaruv mantiqini yozmaslik foydalanuvchilarning xabar olmay qolishiga sabab bo'ladi.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. WebSocket nima?**
Mijoz va server o'rtasida doimiy va ikki tomonlama real-vaqt rejimida aloqani ta'minlovchi tarmoq protokoli.

**2. WebSockets qaysi protokol ustiga qurilgan?**
U TCP protokoli ustida ishlaydi va dastlab HTTP handshake (salomlashish) orqali ulanishni yangilaydi (Upgrade).

**3. ws:// va wss:// farqi nima?**
\`ws://\` shifrlanmagan (HTTP kabi), \`wss://\` esa shifrlangan va xavfsiz (HTTPS kabi) WebSocket ulanishidir.`,
  exercises: [
    {
      id: 1,
      title: "WebSocket obyektini yaratish",
      instruction: "'wss://echo.websocket.org' manziliga ulanuvchi yangi WebSocket obyektini yarating va uni 'ws' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nconst ws = ",
      hint: "new WebSocket('wss://echo.websocket.org')",
      test: "if (code.includes(\"new WebSocket('wss://echo.websocket.org')\") || code.includes('new WebSocket(\"wss://echo.websocket.org\")')) return null; return 'WebSocket obyektini to\\'g\\'ri URL bilan yarating.';"
    },
    {
      id: 2,
      title: "Ulanish ochilganda xabar berish",
      instruction: "WebSocket 'ws' o'zgaruvchisi uchun 'onopen' hodisasi (event handler) yordamida konsolga 'Ulanish ochildi' matnini chiqaruvchi funksiya yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.onopen = () => {\n  console.log('Ulanish ochildi');\n};",
      test: "if (code.includes('onopen') && code.includes('Ulanish ochildi')) return null; return 'onopen hodisasini sozlang va konsolga to\\'g\\'ri xabarni chiqaring.';"
    },
    {
      id: 3,
      title: "Serverga xabar yuborish",
      instruction: "Ulanish ochilishi bilan (onopen hodisasi ichida) serverga 'Salom' matnini yuboradigan kod yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\nws.onopen = () => {\n  // Bu yerga yozing\n  \n};",
      hint: "ws.send('Salom');",
      test: "if (code.includes(\"ws.send('Salom')\") || code.includes('ws.send(\"Salom\")')) return null; return 'send() metodi yordamida \\'Salom\\' xabarini yuboring.';"
    },
    {
      id: 4,
      title: "Kelgan xabarlarni qabul qilish",
      instruction: "Serverdan xabar kelganda (onmessage hodisasi), uning ichidagi ma'lumotni (event.data) konsolga chiqaradigan funksiya yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.onmessage = (event) => {\n  console.log(event.data);\n};",
      test: "if (code.includes('onmessage') && (code.includes('event.data') || code.includes('data'))) return null; return 'onmessage hodisasi ichida event.data-ni konsolga chiqaring.';"
    },
    {
      id: 5,
      title: "Ulanish yopilganda xabar yozish",
      instruction: "WebSocket aloqasi yopilganda (onclose hodisasi), konsolga 'Ulanish yopildi' yozuvini chiqaruvchi funksiya yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.onclose = () => {\n  console.log('Ulanish yopildi');\n};",
      test: "if (code.includes('onclose') && code.includes('Ulanish yopildi')) return null; return 'onclose hodisasini to\\'g\\'ri boshqaring.';"
    },
    {
      id: 6,
      title: "Xatoliklarni tutish",
      instruction: "WebSocket-da xatolik yuz berganda (onerror hodisasi), xatoni konsolga chiqaradigan kod yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.onerror = (error) => {\n  console.error(error);\n};",
      test: "if (code.includes('onerror')) return null; return 'onerror hodisasi orqali xatoliklarni tuting.';"
    },
    {
      id: 7,
      title: "Ulanishni yopish",
      instruction: "'ws' ulanishini yopuvchi metodni chaqiring.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.close();",
      test: "if (code.includes('ws.close()')) return null; return 'ws.close() metodini chaqiring.';"
    },
    {
      id: 8,
      title: "Ulanish holatini tekshirish",
      instruction: "WebSocket 'ws' ning readyState qiymati ochiq (WebSocket.OPEN) ekanligini tekshiradigan 'isOpen' o'zgaruvchisini yarating (true/false).",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\nconst isOpen = ",
      hint: "ws.readyState === WebSocket.OPEN",
      test: "if (code.includes('readyState') && (code.includes('WebSocket.OPEN') || code.includes('1'))) return null; return 'ws.readyState-ni WebSocket.OPEN bilan solishtiring.';"
    },
    {
      id: 9,
      title: "JSON jo'natish",
      instruction: "Mijozdan serverga { type: 'chat', text: 'Salom' } obyektini JSON string ko'rinishida yuboradigan kod yozing.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\nws.onopen = () => {\n  const message = { type: 'chat', text: 'Salom' };\n  // Bu yerga yozing\n  \n};",
      hint: "ws.send(JSON.stringify(message));",
      test: "if (code.includes('JSON.stringify(message)')) return null; return 'JSON.stringify yordamida obyektni stringga o\\'girib jo\\'nating.';"
    },
    {
      id: 10,
      title: "Kelgan JSONni parse qilish",
      instruction: "onmessage hodisasida kelgan event.data-ni obyekt sifatida parse qiling va konsolga uning 'text' xususiyatini chiqaring.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\nws.onmessage = (event) => {\n  // Bu yerga yozing\n  \n};",
      hint: "const data = JSON.parse(event.data);\nconsole.log(data.text);",
      test: "if (code.includes('JSON.parse(event.data)') && (code.includes('.text') || code.includes('[\"text\"]'))) return null; return 'event.data-ni parse qilib, text xususiyatini konsolga yozing.';"
    },
    {
      id: 11,
      title: "Binary ma'lumotlar turini sozlash",
      instruction: "WebSocket orqali keladigan ikkilik ma'lumotlar turini (binaryType) 'arraybuffer' ga tenglang.",
      startingCode: "const ws = new WebSocket('wss://echo.websocket.org');\n// Bu yerga yozing\n",
      hint: "ws.binaryType = 'arraybuffer';",
      test: "if (code.includes('binaryType') && (code.includes(\"'arraybuffer'\") || code.includes('\"arraybuffer\"'))) return null; return 'binaryType-ni arraybuffer qilib belgilang.';"
    },
    {
      id: 12,
      title: "Oddiy qayta ulanish (Reconnect)",
      instruction: "Ulanish yopilganda (onclose), 3 soniyadan (3000ms) keyin 'connect' nomli funksiyani qayta chaqiradigan voqea tinglovchisini yozing.",
      startingCode: "function connect() {\n  const ws = new WebSocket('wss://echo.websocket.org');\n  ws.onclose = () => {\n    // Bu yerga yozing\n    \n  };\n}",
      hint: "setTimeout(connect, 3000);",
      test: "if (code.includes('setTimeout') && code.includes('connect') && code.includes('3000')) return null; return 'onclose ichida setTimeout orqali 3000ms kechikish bilan connect funksiyasini chaqiring.';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ ReadyState Tekshiruvchi Helper (checkReadyState)",
      instruction: "Berilgan `socket` obyektining `readyState` holatiga mos ravishda uning matnli tavsifini qaytaruvchi `checkReadyState(socket)` funksiyasini yozing. Mosliklar: 0: 'CONNECTING', 1: 'OPEN', 2: 'CLOSING', 3: 'CLOSED'. Agar ulanish obyekti berilmagan yoki noto'g'ri bo'lsa, 'INVALID' qaytarsin.",
      startingCode: "function checkReadyState(socket) {\n  // Kodni shu yerdan yozing\n}",
      hint: "if (!socket || typeof socket.readyState === 'undefined') return 'INVALID'; const map = { 0: 'CONNECTING', 1: 'OPEN', 2: 'CLOSING', 3: 'CLOSED' }; return map[socket.readyState] || 'INVALID';",
      test: "if (typeof checkReadyState !== 'function') return 'checkReadyState funksiya emas';\nif (checkReadyState(null) !== 'INVALID') return 'null obyekt uchun INVALID qaytmadi';\nif (checkReadyState({ readyState: 1 }) !== 'OPEN') return 'OPEN holati noto\\'g\\'ri';\nif (checkReadyState({ readyState: 3 }) !== 'CLOSED') return 'CLOSED holati noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Xavfsiz JSON Yuboruvchi (sendJSONMessage)",
      instruction: "WebSocket ulanishi orqali serverga JSON xabar jo'natuvchi xavfsiz `sendJSONMessage(socket, type, payload)` funksiyasini yozing. U quyidagi qoidalarga rioya qilsin:\n1. Agar `socket.readyState` ochiq (`WebSocket.OPEN` ya'ni 1) bo'lsa, xabarni `{ type, payload }` ko'rinishida stringify qilib jo'natsin (send) va `true` qaytarsin.\n2. Aks holda `false` qaytarsin va xabar yubormasin.",
      startingCode: "function sendJSONMessage(socket, type, payload) {\n  // Kodni shu yerdan yozing\n}",
      hint: "if (socket && socket.readyState === 1) { socket.send(JSON.stringify({ type, payload })); return true; } return false;",
      test: "if (typeof sendJSONMessage !== 'function') return 'sendJSONMessage funksiya emas';\nlet sentData = null;\nconst mockSocket = { readyState: 1, send: (data) => { sentData = data; } };\nconst success = sendJSONMessage(mockSocket, 'test', { val: 1 });\nif (!success) return 'Muvaffaqiyatli yuborishda false qaytdi';\nconst parsed = JSON.parse(sentData);\nif (parsed.type === 'test' && parsed.payload.val === 1) {\n  const mockClosed = { readyState: 3, send: () => {} };\n  if (sendJSONMessage(mockClosed, 'test', {}) === false) return null;\n}\nreturn 'Xabar to\\'g\\'ri stringify qilinmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "WebSocket protokoli HTTP so'rovlariga qaraganda qanday asosiy ustunlikka ega?",
      options: [
        "U ma'lumotlarni faqat XML formatida yuboradi",
        "U mijoz va server o'rtasida to'liq ikki tomonlama (full-duplex) doimiy aloqa kanalini o'rnatadi",
        "U har safar yangi xabar yuborilganda HTTP sarlavhalarini to'liq yangilaydi",
        "U faqat rasm fayllarini yuborish uchun mo'ljallangan"
      ],
      correctAnswer: 1,
      explanation: "WebSocket mijoz va server o'rtasida bir marta handshake qilgach, ulanishni doimiy ochiq qoldiradi va ikki tomon ham istalgan vaqtda ma'lumot yo'llay oladi."
    },
    {
      id: 2,
      question: "WebSocket ulanishini yaratishda qaysi protokollardan foydalaniladi?",
      options: [
        "http:// va https://",
        "ftp:// va ftps://",
        "ws:// va wss://",
        "ssh:// va ssl://"
      ],
      correctAnswer: 2,
      explanation: "WebSocket aloqasi uchun ws:// (odatiy) yoki wss:// (xavfsiz, shifrlangan) protokollari ishlatiladi."
    },
    {
      id: 3,
      question: "WebSocket obyekti yaratilishi bilanoq darhol ma'lumot yuborish nima uchun xato hisoblanadi?",
      options: [
        "WebSocket xabar yuborishni qo'llab-quvvatlamaydi",
        "Chunki ulanish hali to'liq ochilmagan (readyState = CONNECTING) bo'ladi",
        "Faqat server birinchi xabar yuborganidan keyingina yuborish mumkin",
        "Ulanish uchun faqat CSS orqali ruxsat berilishi kerak"
      ],
      correctAnswer: 1,
      explanation: "WebSocket-ni ochish biroz vaqt talab etadi. Agar ulanish tayyor (OPEN, readyState = 1) bo'lmasdan oldin send() chaqirilsa, xatolik yuz beradi."
    },
    {
      id: 4,
      question: "WebSocket readyState xususiyatining qaysi qiymati ulanishning ochiq va tayyor holatini ifodalaydi?",
      options: [
        "0 (WebSocket.CONNECTING)",
        "1 (WebSocket.OPEN)",
        "2 (WebSocket.CLOSING)",
        "3 (WebSocket.CLOSED)"
      ],
      correctAnswer: 1,
      explanation: "1 qiymati WebSocket.OPEN holatini anglatadi va faqat shu holatda ma'lumot almashish mumkin."
    },
    {
      id: 5,
      question: "Serverdan ma'lumot kelganda qaysi voqea (event) ishga tushadi?",
      options: [
        "onopen",
        "onclose",
        "onerror",
        "onmessage"
      ],
      correctAnswer: 3,
      explanation: "Serverdan yuborilgan har bir ma'lumot paketini olish uchun onmessage hodisasi (event handler) ishlatiladi."
    },
    {
      id: 6,
      question: "WebSocket ulanishini dasturiy ravishda yopish metodini ko'rsating.",
      options: [
        "socket.disconnect()",
        "socket.close()",
        "socket.exit()",
        "socket.terminate()"
      ],
      correctAnswer: 1,
      explanation: "WebSocket obyekti ulanishni toza va to'g'ri yopish uchun close() metodini taqdim etadi."
    },
    {
      id: 7,
      question: "Brauzer WebSocket orqali keladigan ikkilik (binary) ma'lumotlarni qaysi turlarda qabul qilishi mumkin?",
      options: [
        "Faqat String va Number",
        "Blob yoki ArrayBuffer",
        "Faqat JSON",
        "Faqat HTML elementlari"
      ],
      correctAnswer: 1,
      explanation: "Ikkilik fayllar (masalan, rasmlar, audio) uchun binaryType xususiyatini 'blob' yoki 'arraybuffer' qilib sozlash mumkin."
    },
    {
      id: 8,
      question: "Serverga JSON formatidagi ma'lumot yuborishdan oldin nima qilish kerak?",
      options: [
        "Hech narsa, obyekt avtomatik o'giriladi",
        "Uni JSON.stringify() yordamida string formatiga o'tkazish kerak",
        "Uni Base64 formatida kodlash kerak",
        "Faqat Array-ga o'tkazish kerak"
      ],
      correctAnswer: 1,
      explanation: "WebSocket faqat string yoki binary qabul qilgani uchun har qanday murakkab JS obyektini JSON.stringify() yordamida matnga aylantirish lozim."
    },
    {
      id: 9,
      question: "Nima uchun HTTPS sahifalarda ws:// protokoli orqali ulanish taqiqlanadi?",
      options: [
        "ws:// protokoli HTTPS sahifani buzadi",
        "Chunki HTTPS sahifadagi barcha ulanishlar xavfsiz (Mixed Content taqiqlangan) bo'lishi shart",
        "HTTPS sahifalarda umuman WebSocket ishlatib bo'lmaydi",
        "Server bunga ruxsat bermaydi"
      ],
      correctAnswer: 1,
      explanation: "Brauzerlar xavfsiz (HTTPS) sahifada xavfsiz bo'lmagan (shifrlanmagan HTTP/WS) ulanishlarni Mixed Content xavfsizlik qoidalariga ko'ra bloklaydi. U yerda wss:// ishlatish shart."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri WebSocket-dagi xatoliklarni aniqlashga yordam beradi?",
      options: [
        "onerror hodisasi",
        "onclose hodisasi",
        "onopen hodisasi",
        "onreceive hodisasi"
      ],
      correctAnswer: 0,
      explanation: "onerror hodisasi ulanishda yuzaga keladigan barcha tarmoq va protokol xatoliklarini qayd qiladi."
    },
    {
      id: 11,
      question: "WebSocket o'z-o'zidan uzilib qolganda avtomatik ulanish (auto-reconnect) imkoniyatini taqdim etadimi?",
      options: [
        "Ha, brauzer o'zi avtomatik ulanadi",
        "Yo'q, bu mantiqni JavaScript yordamida onclose ichida o'zimiz yozishimiz kerak",
        "Ha, faqat wss:// protokoli ishlatsa",
        "Yo'q, sahifani reload qilmasdan ulanib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Standart WebSocket API-da avtomatik qayta ulanish (reconnect) mexanizmi yo'q. Biz uni onclose hodisasi ichida qo'lda dasturlashimiz zarur."
    },
    {
      id: 12,
      question: "WebSockets qaysi dasturiy arxitektura yoki yondashuv uchun mos kelmaydi?",
      options: [
        "Real-time chat ilovasi",
        "Dinamik multiplayer o'yinlari",
        "Faqat bir marta yuklanadigan va o'zgarmaydigan statik blog maqolasi sahifasi",
        "Birja narxlari jadvali (live trading dashboard)"
      ],
      correctAnswer: 2,
      explanation: "Faqat bir marta yuklanib, keyin o'zgarmaydigan oddiy matnli blog sahifasi uchun doimiy ochiq WebSocket ulanishi keraksiz resurs sarfidir. Bunga oddiy HTTP so'rovi kifoya qiladi."
    },
    {
      id: 13,
      question: "WebSocket ulanishini o'rnatish paytida, mijoz sarlavhadagi qaysi HTTP Upgrade so'rovi orqali o'tishni boshlaydi va server bunga qanday status kodi bilan javob qaytaradi?",
      options: [
        "Upgrade: websocket sarlavhasi va HTTP 101 Switching Protocols status kodi",
        "Upgrade: tcp sarlavhasi va HTTP 200 OK status kodi",
        "Upgrade: socket sarlavhasi va HTTP 301 Moved Permanently status kodi",
        "Connection: Upgrade sarlavhasi va HTTP 500 Server Error status kodi"
      ],
      correctAnswer: 0,
      explanation: "WebSocket-ga ulanish HTTP Upgrade: websocket sarlavhasi orqali yuboriladi va server muvaffaqiyatli ulansa, HTTP 101 Switching Protocols kodi bilan javob beradi."
    },
    {
      id: 14,
      question: "Mijoz va server o'rtasidagi WebSocket ulanishini uzoq vaqt faol bo'lmaganda (idle timeout) uzilib qolishdan himoya qilish uchun qaysi mexanizm ishlatiladi?",
      options: [
        "CSS transition mexanizmi",
        "Heartbeat Ping-Pong ramkalari (frames)",
        "Polling HTTP requestlari",
        "LocalStorage storage event tinglovchisi"
      ],
      correctAnswer: 1,
      explanation: "Mijoz yoki server tomonidan muntazam ravishda yuboriladigan Ping va javob sifatida qaytuvchi Pong ramkalari (Heartbeat) ulanishni yopilib ketishidan asraydi."
    }
  ]
};
