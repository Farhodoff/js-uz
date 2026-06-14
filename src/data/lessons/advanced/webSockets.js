export const webSockets = {
  id: "webSockets",
  title: "WebSockets: Real-time Ikki Tomonlama Aloqa",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### WebSockets nima?
**WebSocket** — bu mijoz (brauzer) va server o'rtasida bitta doimiy TCP ulanishi orqali **haqiqiy vaqt rejimida (real-time)**, ikki tomonlama (bi-directional) va juda tez ma'lumot almashish imkonini beruvchi tarmoq protokolidir.
* **HTTP:** Mijoz so'rov yuboradi, server javob beradi va ulanish yopiladi. Server o'z tashabbusi bilan mijozga ma'lumot jo'nata olmaydi.
* **WebSocket:** Mijoz va server o'rtasida "qo'l berib ko'rishish" (Handshake) sodir bo'ladi va doimiy ochiq aloqa kanali o'rnatiladi. Ulanish yopilmaguncha, har ikki tomon ham istalgan vaqtda bir-biriga ma'lumot jo'nata oladi.
* **ws:// va wss://**: WebSocket protokollarining nomlanishi. \`wss://\` shifrlangan (xavfsiz) ulanish bo'lib, HTTP-dagi HTTPS kabi ishlaydi.

### Real hayotiy o'xshatish
* **HTTP (Pochta orqali xat yozish):** Siz do'stingizga xat yuborasiz (so'rov). Do'stingiz xatni olib, javob yozadi (javob). Agar sizda yangi savol tug'ilsa, yana boshqa xat yozishingiz kerak. Do'stingiz siz so'ramasangiz o'z-o'zidan xat yoza olmaydi.
* **WebSocket (Telefon orqali gaplashish):** Siz do'stingizga qo'ng'iroq qilasiz, u go'shakni ko'taradi va ulanish o'rnatiladi. Endi telefonni qo'ymagan holda, har ikkingiz ham xohlagan paytda gapira olasiz (real-time muloqot).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Ulanish va xabar almashish)
Brauzerda oddiy WebSocket mijozi:
\`\`\`javascript
// 1. WebSocket serveriga ulanamiz
const socket = new WebSocket('wss://echo.websocket.org');

// 2. Ulanish muvaffaqiyatli ochilganda
socket.onopen = (event) => {
  console.log("WebSocket ulanishi ochildi!");
  // Serverga xabar jo'natamiz
  socket.send("Salom Server!");
};

// 3. Serverdan yangi xabar kelganda
socket.onmessage = (event) => {
  console.log("Serverdan xabar keldi:", event.data);
};

// 4. Ulanish yopilganda
socket.onclose = (event) => {
  console.log("Ulanish yopildi. Sabab kodi:", event.code);
};

// 5. Xatolik yuz berganda
socket.onerror = (error) => {
  console.error("WebSocket xatoligi:", error);
};
\`\`\`

### 2. Intermediate Example (Qayta ulanish mexanizmi - Auto-Reconnection)
Agar internet uzilib qolsa, avtomatik ravishda qayta ulanishga urinish:
\`\`\`javascript
let ws;
const url = 'wss://api.example.com/live';

function connect() {
  ws = new WebSocket(url);
  
  ws.onopen = () => console.log("Ulanish o'rnatildi");
  
  ws.onclose = (e) => {
    console.log("Ulanish uzildi. 3 soniyadan keyin qayta ulanamiz...");
    // 3 soniyadan keyin funksiyani qayta chaqiramiz
    setTimeout(connect, 3000);
  };
  
  ws.onerror = (err) => {
    console.error("Xatolik yuz berdi:", err.message);
    ws.close(); // onclose ishga tushishi uchun yopamiz
  };
}

connect();
\`\`\`

### 3. Advanced Example (Heartbeat / Ping-Pong mexanizmi)
Ulanish o'lik holatda (zombi) qolib ketishining oldini olish uchun faollikni tekshirib turish:
\`\`\`javascript
let socket;
let pingInterval;

function startHeartbeat() {
  // Har 30 soniyada serverga "ping" yuborib turamiz
  pingInterval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'ping' }));
      console.log("Ping yuborildi");
    }
  }, 30000);
}

function stopHeartbeat() {
  clearInterval(pingInterval);
}

socket = new WebSocket('wss://chat.example.com');
socket.onopen = () => startHeartbeat();
socket.onclose = () => stopHeartbeat();
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Polling (so'rab turish) samarasizligi:** Ilgari real-time ma'lumot olish uchun brauzer har 2 soniyada serverga \`fetch\` yuborib turardi (Short Polling). Bu serverga ulkan keraksiz yuklama hosil qilardi. WebSocket bu muammoni bitta ulanish orqali hal qiladi.
* **Ortiqcha sarlavhalar yuklamasi (HTTP overhead):** Har bir HTTP so'rovda bir necha yuz bayt hajmdagi headers (sarlavhalar) yuboriladi. WebSocket-da esa ulanish o'rnatilgandan keyin xabarlar juda kichik sarlavhalar (atigi 2-10 bayt) bilan yuboriladi, bu esa tarmoq tezligini sezilarli darajada oshiradi.
* **Haqiqiy real-time:** Kechikishlar (latency) millisekundlargacha kamayadi. Bu onlayn o'yinlar, birja grafiklari va chat ilovalari uchun juda muhimdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Ulanish tayyor bo'lmasdan xabar jo'natish
#### Xato:
\`\`\`javascript
const socket = new WebSocket('wss://example.com');
socket.send("Hello"); // InvalidStateError!
\`\`\`
*Tushuntirish:* WebSocket obyekti yaratilishi bilan ulanish darhol ochilmaydi. Tarmoq orqali ulanish o'rnatilguncha vaqt ketadi.
#### Tuzatish:
\`\`\`javascript
socket.onopen = () => {
  socket.send("Hello"); // Faqat ulanish to'liq ochilgach jo'natiladi
};
\`\`\`

### 2. HTTPS sayt ichida WS (shifrlanmagan) ishlatish
Agar sizning saytingiz xavfsiz \`https://\` protokolida ishlayotgan bo'lsa, brauzer xavfsizlik nuqtai nazaridan shifrlanmagan \`ws://\` WebSocket ulanishlarini bloklaydi (Mixed Content). Har doim \`wss://\` dan foydalanish shart.

### 3. JSON formatini tekshirmasdan parse qilish
WebSocket-dan kelayotgan ma'lumot har doim ham JSON bo'lmasligi mumkin. Uni \`JSON.parse\` qilishda dastur qulab tushmasligi uchun \`try-catch\` ishlatilishi lozim.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** WebSocket nima va u HTTP-dan nimasi bilan farq qiladi?
   * **Javob:** WebSocket ikki tomonlama, haqiqiy vaqt rejimida ishlovchi doimiy ulanish protokolidir. HTTP esa so'rov-javob shaklidagi bir tomonlama va vaqtinchalik ulanishdir.
2. **Savol:** \`ws://\` va \`wss://\` farqi nimada?
   * **Javob:** \`ws://\` shifrlanmagan oddiy ulanish, \`wss://\` esa SSL/TLS orqali shifrlangan xavfsiz WebSocket ulanishidir.
3. **Savol:** WebSocket-da qanday asosiy hodisalar (events) mavjud?
   * **Javob:** \`open\` (ulanish ochilganda), \`message\` (xabar kelganda), \`close\` (ulanish yopilganda) va \`error\` (xatolik bo'lganda).
4. **Savol:** WebSocket orqali qanday formatdagi ma'lumotlarni yuborish mumkin?
   * **Javob:** Matnlar (strings), shuningdek ikkilik (binary) ma'lumotlar, ya'ni Blob va ArrayBuffer obyektlari.

### Middle (5–8)
5. **Savol:** WebSocket Handshake (qo'l berib ko'rishish) nima va u qanday amalga oshiriladi?
   * **Javob:** WebSocket HTTP so'rovi sifatida boshlanadi. Mijoz serverga \`Upgrade: websocket\` sarlavhasi bilan so'rov yuboradi. Agar server rozilik bersa, HTTP status kodi \`101 Switching Protocols\` qaytaradi va ulanish TCP/WebSocket kanaliga aylanadi.
6. **Savol:** WebSocket-dagi \`readyState\` xossasi qanday qiymatlarni qabul qiladi?
   * **Javob:** \`0\` (CONNECTING), \`1\` (OPEN), \`2\` (CLOSING), \`3\` (CLOSED).
7. **Savol:** WebSocket ulanishini qanday qilib qo'lda xavfsiz yopish mumkin?
   * **Javob:** \`socket.close(code, reason)\` metodini chaqirish orqali. Masalan, foydalanuvchi tizimdan chiqqanda.
8. **Savol:** HTTP Long Polling nima va WebSocket undan qanday ustunlikka ega?
   * **Javob:** Long Polling-da mijoz so'rov yuboradi va server yangi ma'lumot paydo bo'lguncha javob bermay ushlab turadi. Ma'lumot kelgach, ulanish yopiladi va mijoz darhol yangi so'rov yuboradi. WebSocket esa ulanishni yopmaydi va HTTP overhead yaratmaydi.

### Senior (9–12)
9. **Savol:** WebSocket ulanishi faol, lekin internet simi uzilganda nima uchun darhol \`onclose\` ishga tushmasligi mumkin? Buni qanday hal qilsa bo'ladi?
   * **Javob:** TCP ulanishlar jismoniy tarmoq uzilishini sezishi uchun vaqt kerak bo'ladi (TCP timeout). Buni hal qilish uchun ilova darajasida muntazam ravishda Ping/Pong xabarlarini yuborib turuvchi Heartbeat mexanizmini yaratish kerak.
10. **Savol:** WebSocket-da xavfsizlikni (Authentication) qanday tashkil etish mumkin?
    * **Javob:** WebSocket konstruktori maxsus sarlavhalarni (headers) qo'llab-quvvatlamaydi. Shuning uchun autentifikatsiya tokenini query parametrlari orqali (\`wss://example.com/?token=xyz\`) yoki ulanish o'rnatilgandan so'ng eng birinchi WebSocket xabari sifatida yuborish orqali amalga oshiriladi.
11. **Savol:** \`socket.bufferedAmount\` xossasi nima uchun kerak va undan unumdorlikda qanday foydalaniladi?
    * **Javob:** Bu xossa \`send()\` orqali yuborilgan, lekin tarmoq bo'ylab hali yetib bormay, brauzer navbatida (buffer) turgan ma'lumotlar hajmini (baytlarda) ko'rsatadi. Agar bu ko'rsatkich juda yuqori bo'lsa, tarmoqni ortiqcha yuklamaslik uchun yuborish tezligini sekinlashtirish lozim.
12. **Savol:** WebSockets va Server-Sent Events (SSE) o'rtasidagi asosiy farqlar nimada va qachon qaysi birini tanlash lozim?
    * **Javob:** WebSockets to'liq ikki tomonlama aloqani ta'minlaydi (onlayn o'yinlar, chatlar). SSE esa faqat serverdan mijozga bir tomonlama ma'lumot oqimini yuborish uchun ishlatiladi (masalan, yangiliklar tasmasi, bildirishnomalar). SSE HTTP protokoli ustida ishlaydi, avtomatik qayta ulanishga ega va soddaroq.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali WebSocket ulanishlarini boshqarish bo'yicha mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Haqiqiy vaqtdagi Chat Ilovasi uchun WebSocket xabarlarini boshqarish
Chat ilovasida yangi xabarlarni yuborish va kelgan xabarlarni ekran interfeysiga qo'shish jarayoni:

\`\`\`javascript
class ChatClient {
  constructor(serverUrl, onMessageReceived) {
    this.url = serverUrl;
    this.onMessage = onMessageReceived;
    this.ws = null;
  }

  init() {
    this.ws = new WebSocket(this.url);

    this.ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'chat_message') {
          this.onMessage(payload.sender, payload.text);
        }
      } catch (e) {
        console.error("Xabarni o'qishda xatolik:", e);
      }
    };

    this.ws.onopen = () => console.log("Chat tizimiga ulandingiz.");
  }

  sendMessage(senderName, messageText) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageObj = {
        type: 'chat_message',
        sender: senderName,
        text: messageText,
        timestamp: Date.now()
      };
      this.ws.send(JSON.stringify(messageObj));
    } else {
      console.warn("Ulanish mavjud emas, xabar jo'natilmadi.");
    }
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **JSON yuklamasini kamaytiring:** Agar tarmoq trafigini tejash juda muhim bo'lsa (masalan mobil o'yinlarda), JSON matnlari o'rniga ma'lumotlarni ikkilik (binary) ko'rinishga (masalan **Protocol Buffers** yoki **MessagePack**) o'girib yuboring.
* **Ulanishlarni guruhlang (Multiplexing):** Bitta ilova ichida har xil sahifalar yoki modullar uchun alohida WebSocket ulanishlarini ochmang. Bitta ulanishni ochib, xabarlar ichida \`channel\` yoki \`type\` maydonlari orqali ularni yo'naltiring.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa / Event | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`new WebSocket(url)\` | Yangi ulanish o'rnatish | \`const ws = new WebSocket('wss://api.com')\` |
| \`ws.send(data)\` | Ma'lumot yuborish | \`ws.send('Salom')\` |
| \`ws.close(code, reason)\` | Ulanishni yopish | \`ws.close(1000, 'Tugadi')\` |
| \`ws.readyState\` | Ulanishning joriy holati | \`if(ws.readyState === 1) { ... }\` |
| \`ws.onopen\` | Ulanish muvaffaqiyatli ochilganda ishlaydi | \`ws.onopen = () => { ... }\` |
| \`ws.onmessage\` | Yangi xabar kelganda ishlaydi | \`ws.onmessage = (e) => { ... }\` |
| \`ws.onclose\` | Ulanish yopilganda ishlaydi | \`ws.onclose = () => { ... }\` |
`,
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
    "id": 1,
    "question": "WebSocket protokoli qaysi transport protokoli ustiga qurilgan?",
    "options": [
      "UDP",
      "TCP",
      "DNS",
      "FTP"
    ],
    "correctAnswer": 1,
    "explanation": "WebSocket protokoli ishonchli va tartiblangan ma'lumot uzatishni ta'minlaydigan TCP protokoli ustida ishlaydi."
  },
  {
    "id": 2,
    "question": "WebSocket ulanishini boshlashda mijoz va server o'rtasidagi kelishuv (Handshake) qanday amalga oshiriladi?",
    "options": [
      "FTP yuklash orqali",
      "HTTP Upgrade so'rovi yordamida",
      "SMTP elektron pochta protokoli orqali",
      "Hech qanday so'rovsiz to'g'ridan-to'g'ri bog'lanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Ulanish dastlab standart HTTP GET so'rovi orqali boshlanadi va sarlavhada Upgrade: websocket so'raladi. Server rozilik bergach ulanish WebSocket-ga o'tadi."
  },
  {
    "id": 3,
    "question": "HTTP-dan farqli o'laroq WebSocket protokolining eng muhim ustunligi nima?",
    "options": [
      "Har bir so'rovda sarlavhalarni kattalashtirishi",
      "Ikki tomonlama (bi-directional) va doimiy ochiq qoluvchi aloqa kanali orqali haqiqiy vaqt rejimida (real-time) ma'lumot uzatishi",
      "Faqat rasmlarni tezkor yuklashi",
      "Keshni avtomatik tozalashi"
    ],
    "correctAnswer": 1,
    "explanation": "WebSocket-da ulanish bir marta ochiladi va yopilmaguncha har ikki tomon ham istalgan vaqtda so'rov kutmasdan ma'lumot yubora oladi."
  },
  {
    "id": 4,
    "question": "SSL/TLS shifrlash bilan himoyalangan xavfsiz WebSocket protokoli qanday belgilanadi?",
    "options": [
      "ws://",
      "http://",
      "wss://",
      "https://"
    ],
    "correctAnswer": 2,
    "explanation": "wss:// (WebSocket Secure) xuddi https:// kabi ma'lumotlarni shifrlab uzatishni ta'minlaydi."
  },
  {
    "id": 5,
    "question": "WebSocket ulanishining joriy holatini (masalan ulanayotgan, ochiq yoki yopilgan) qaysi xossa orqali bilish mumkin?",
    "options": [
      "state",
      "status",
      "readyState",
      "connectionState"
    ],
    "correctAnswer": 2,
    "explanation": "readyState xossasi ulanishning 4 xil holat qiymatini (0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED) qaytaradi."
  },
  {
    "id": 6,
    "question": "WebSocket.readyState qiymati 1 bo'lganda, bu qaysi holatni anglatadi?",
    "options": [
      "CONNECTING (ulanish o'rnatilmoqda)",
      "OPEN (ulanish ochiq va xabarlar almashishga tayyor)",
      "CLOSING (ulanish yopilmoqda)",
      "CLOSED (ulanish yopilgan)"
    ],
    "correctAnswer": 1,
    "explanation": "1 (yoki WebSocket.OPEN) ulanish muvaffaqiyatli o'rnatilganini va hozirda faol ekanligini anglatadi."
  },
  {
    "id": 7,
    "question": "Ulanish to'liq ochiq holatga (OPEN) kelmasdan turib socket.send() metodi chaqirilsa nima sodir bo'ladi?",
    "options": [
      "Xabar ulanish ochilguncha navbatda turadi",
      "Hech narsa yuz bermaydi, xabar shunchaki yo'qoladi",
      "InvalidStateError xatoligi yuz beradi",
      "Dastur avtomatik ravishda qayta ishga tushadi"
    ],
    "correctAnswer": 2,
    "explanation": "Ulanish hali tayyor bo'lmagan (CONNECTING) yoki yopilgan holatda ma'lumot yuborish InvalidStateError xatosini keltirib chiqaradi."
  },
  {
    "id": 8,
    "question": "WebSocket serveridan yangi xabar olinganda qaysi hodisa (event listener) ishga tushadi?",
    "options": [
      "onopen",
      "onmessage",
      "onclose",
      "onchange"
    ],
    "correctAnswer": 1,
    "explanation": "onmessage hodisasi serverdan yangi ma'lumot kelganda chaqiriladi va event.data tarkibida kelgan ma'lumotni saqlaydi."
  },
  {
    "id": 9,
    "question": "Foydalanuvchi interneti kutilmaganda uzilib, tarmoq o'chib qolganda WebSocket ulanishida nima uchun darhol onclose ishlamay qolishi mumkin?",
    "options": [
      "Chunki WebSocket faqat Wi-Fi da ishlaydi",
      "Chunki TCP protokoli jismoniy tarmoq uzilishini sezishi uchun biroz vaqt talab etiladi (TCP timeout)",
      "Chunki brauzer har doim ma'lumotlarni keshlab turadi",
      "Dasturchi close() ni chaqirmagani sababli"
    ],
    "correctAnswer": 1,
    "explanation": "Tarmoq jismoniy uzilganini operatsion tizim va TCP darhol aniqlay olmaydi. Shuning uchun ulanish ochiqdek ko'rinib (zombi holati), onclose kechikib ishlaydi. Buni oldini olish uchun Heartbeat ishlatiladi."
  },
  {
    "id": 10,
    "question": "Tarmoq faolligini saqlash va zombi ulanishlarni aniqlash uchun qo'llaniladigan davriy xabar almashish tizimi nima deyiladi?",
    "options": [
      "Polling",
      "Handshake",
      "Heartbeat (yoki Ping-Pong)",
      "Long-Polling"
    ],
    "correctAnswer": 2,
    "explanation": "Heartbeat (Ping-Pong) mexanizmi ma'lum vaqt oralig'ida (masalan har 30 soniyada) server bilan bir-biriga kichik signal yuborib, ulanish tirikligini tekshirish jarayonidir."
  },
  {
    "id": 11,
    "question": "HTTPS orqali chiquvchi sahifada shifrlanmagan ws:// protokoli orqali ulanmoqchi bo'lsak nima sodir bo'ladi?",
    "options": [
      "Ulanish avtomatik ravishda wss:// ga o'tadi",
      "Ulanish muvaffaqiyatli amalga oshadi, lekin sekinroq ishlaydi",
      "Brauzer xavfsizlik siyosati (Mixed Content) tufayli so'rovni taqiqlaydi va bloklaydi",
      "Server xatolik kodi 404 qaytaradi"
    ],
    "correctAnswer": 2,
    "explanation": "HTTPS protokoli ostidagi sahifa faqat xavfsiz manbalar bilan ulanishi mumkin. Shifrlanmagan ws:// ulanishlari brauzer tomonidan bloklanadi."
  },
  {
    "id": 12,
    "question": "socket.bufferedAmount xossasining vazifasi nima?",
    "options": [
      "Serverdan qabul qilingan ma'lumotlar hajmini ko'rsatish",
      "send() orqali yuborilgan, lekin hali tarmoqqa chiqib ketmay brauzer xotirasi navbatida turgan ma'lumotlar hajmini baytlarda qaytarish",
      "Brauzer keshidagi ma'lumotlar o'lchovini aniqlash",
      "Ulanish tezligini megabitlarda ko'rsatish"
    ],
    "correctAnswer": 1,
    "explanation": "bufferedAmount yuborish navbatida turgan ma'lumotlar miqdorini aniqlaydi. Agar bu qiymat katta bo'lsa, tarmoq tiqilinchini oldini olish uchun ma'lumot yuborishni vaqtincha to'xtatib turish kerak."
  }
]

};
