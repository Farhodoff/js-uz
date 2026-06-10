## 1. 💡 Sodda Tushuntirish va Analogiya

### WebSockets nima?
**WebSocket** — bu mijoz (brauzer) va server o'rtasida bitta doimiy TCP ulanishi orqali **haqiqiy vaqt rejimida (real-time)**, ikki tomonlama (bi-directional) va juda tez ma'lumot almashish imkonini beruvchi tarmoq protokolidir.
* **HTTP:** Mijoz so'rov yuboradi, server javob beradi va ulanish yopiladi. Server o'z tashabbusi bilan mijozga ma'lumot jo'nata olmaydi.
* **WebSocket:** Mijoz va server o'rtasida "qo'l berib ko'rishish" (Handshake) sodir bo'ladi va doimiy ochiq aloqa kanali o'rnatiladi. Ulanish yopilmaguncha, har ikki tomon ham istalgan vaqtda bir-biriga ma'lumot jo'nata oladi.
* **ws:// va wss://**: WebSocket protokollarining nomlanishi. `wss://` shifrlangan (xavfsiz) ulanish bo'lib, HTTP-dagi HTTPS kabi ishlaydi.

### Real hayotiy analogiya
* **HTTP (Pochta orqali xat yozish):** Siz do'stingizga xat yuborasiz (so'rov). Do'stingiz xatni olib, javob yozadi (javob). Agar sizda yangi savol tug'ilsa, yana boshqa xat yozishingiz kerak. Do'stingiz siz so'ramasangiz o'z-o'zidan xat yoza olmaydi.
* **WebSocket (Telefon orqali gaplashish):** Siz do'stingizga qo'ng'iroq qilasiz, u go'shakni ko'taradi va ulanish o'rnatiladi. Endi telefonni qo'ymagan holda, har ikkingiz ham xohlagan paytda gapira olasiz (real-time muloqot).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Ulanish va xabar almashish)
Brauzerda oddiy WebSocket mijozi:
```javascript
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
```

### 2. Intermediate Example (Qayta ulanish mexanizmi - Auto-Reconnection)
Agar internet uzilib qolsa, avtomatik ravishda qayta ulanishga urinish:
```javascript
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
```

### 3. Advanced Example (Heartbeat / Ping-Pong mexanizmi)
Ulanish o'lik holatda (zombi) qolib ketishining oldini olish uchun faollikni tekshirib turish:
```javascript
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
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Polling (so'rab turish) samarasizligi:** Ilgari real-time ma'lumot olish uchun brauzer har 2 soniyada serverga `fetch` yuborib turardi (Short Polling). Bu serverga ulkan keraksiz yuklama hosil qilardi. WebSocket bu muammoni bitta ulanish orqali hal qiladi.
* **Ortiqcha sarlavhalar yuklamasi (HTTP overhead):** Har bir HTTP so'rovda bir necha yuz bayt hajmdagi headers (sarlavhalar) yuboriladi. WebSocket-da esa ulanish o'rnatilgandan keyin xabarlar juda kichik sarlavhalar (atigi 2-10 bayt) bilan yuboriladi, bu esa tarmoq tezligini sezilarli darajada oshiradi.
* **Haqiqiy real-time:** Kechikishlar (latency) millisekundlargacha kamayadi. Bu onlayn o'yinlar, birja grafiklari va chat ilovalari uchun juda muhimdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Ulanish tayyor bo'lmasdan xabar jo'natish
#### Xato:
```javascript
const socket = new WebSocket('wss://example.com');
socket.send("Hello"); // InvalidStateError!
```
*Tushuntirish:* WebSocket obyekti yaratilishi bilan ulanish darhol ochilmaydi. Tarmoq orqali ulanish o'rnatilguncha vaqt ketadi.
#### Tuzatish:
```javascript
socket.onopen = () => {
  socket.send("Hello"); // Faqat ulanish to'liq ochilgach jo'natiladi
};
```

### 2. HTTPS sayt ichida WS (shifrlanmagan) ishlatish
Agar sizning saytingiz xavfsiz `https://` protokolida ishlayotgan bo'lsa, brauzer xavfsizlik nuqtai nazaridan shifrlanmagan `ws://` WebSocket ulanishlarini bloklaydi (Mixed Content). Har doim `wss://` dan foydalanish shart.

### 3. JSON formatini tekshirmasdan parse qilish
WebSocket-dan kelayotgan ma'lumot har doim ham JSON bo'lmasligi mumkin. Uni `JSON.parse` qilishda dastur qulab tushmasligi uchun `try-catch` ishlatilishi lozim.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** WebSocket nima va u HTTP-dan nimasi bilan farq qiladi?
   * **Javob:** WebSocket ikki tomonlama, haqiqiy vaqt rejimida ishlovchi doimiy ulanish protokolidir. HTTP esa so'rov-javob shaklidagi bir tomonlama va vaqtinchalik ulanishdir.
2. **Savol:** `ws://` va `wss://` farqi nimada?
   * **Javob:** `ws://` shifrlanmagan oddiy ulanish, `wss://` esa SSL/TLS orqali shifrlangan xavfsiz WebSocket ulanishidir.
3. **Savol:** WebSocket-da qanday asosiy hodisalar (events) mavjud?
   * **Javob:** `open` (ulanish ochilganda), `message` (xabar kelganda), `close` (ulanish yopilganda) va `error` (xatolik bo'lganda).
4. **Savol:** WebSocket orqali qanday formatdagi ma'lumotlarni yuborish mumkin?
   * **Javob:** Matnlar (strings), shuningdek ikkilik (binary) ma'lumotlar, ya'ni Blob va ArrayBuffer obyektlari.

### Middle (5–8)
5. **Savol:** WebSocket Handshake (qo'l berib ko'rishish) nima va u qanday amalga oshiriladi?
   * **Javob:** WebSocket HTTP so'rovi sifatida boshlanadi. Mijoz serverga `Upgrade: websocket` sarlavhasi bilan so'rov yuboradi. Agar server rozilik bersa, HTTP status kodi `101 Switching Protocols` qaytaradi va ulanish TCP/WebSocket kanaliga aylanadi.
6. **Savol:** WebSocket-dagi `readyState` xossasi qanday qiymatlarni qabul qiladi?
   * **Javob:** `0` (CONNECTING), `1` (OPEN), `2` (CLOSING), `3` (CLOSED).
7. **Savol:** WebSocket ulanishini qanday qilib qo'lda xavfsiz yopish mumkin?
   * **Javob:** `socket.close(code, reason)` metodini chaqirish orqali. Masalan, foydalanuvchi tizimdan chiqqanda.
8. **Savol:** HTTP Long Polling nima va WebSocket undan qanday ustunlikka ega?
   * **Javob:** Long Polling-da mijoz so'rov yuboradi va server yangi ma'lumot paydo bo'lguncha javob bermay ushlab turadi. Ma'lumot kelgach, ulanish yopiladi va mijoz darhol yangi so'rov yuboradi. WebSocket esa ulanishni yopmaydi va HTTP overhead yaratmaydi.

### Senior (9–12)
9. **Savol:** WebSocket ulanishi faol, lekin internet simi uzilganda nima uchun darhol `onclose` ishga tushmasligi mumkin? Buni qanday hal qilsa bo'ladi?
   * **Javob:** TCP ulanishlar jismoniy tarmoq uzilishini sezishi uchun vaqt kerak bo'ladi (TCP timeout). Buni hal qilish uchun ilova darajasida muntazam ravishda Ping/Pong xabarlarini yuborib turuvchi Heartbeat mexanizmini yaratish kerak.
10. **Savol:** WebSocket-da xavfsizlikni (Authentication) qanday tashkil etish mumkin?
    * **Javob:** WebSocket konstruktori maxsus sarlavhalarni (headers) qo'llab-quvvatlamaydi. Shuning uchun autentifikatsiya tokenini query parametrlari orqali (`wss://example.com/?token=xyz`) yoki ulanish o'rnatilgandan so'ng eng birinchi WebSocket xabari sifatida yuborish orqali amalga oshiriladi.
11. **Savol:** `socket.bufferedAmount` xossasi nima uchun kerak va undan unumdorlikda qanday foydalaniladi?
    * **Javob:** Bu xossa `send()` orqali yuborilgan, lekin tarmoq bo'ylab hali yetib bormay, brauzer navbatida (buffer) turgan ma'lumotlar hajmini (baytlarda) ko'rsatadi. Agar bu ko'rsatkich juda yuqori bo'lsa, tarmoqni ortiqcha yuklamaslik uchun yuborish tezligini sekinlashtirish lozim.
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

```javascript
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
```

---

## 9. 🚀 Performance va Optimization

* **JSON yuklamasini kamaytiring:** Agar tarmoq trafigini tejash juda muhim bo'lsa (masalan mobil o'yinlarda), JSON matnlari o'rniga ma'lumotlarni ikkilik (binary) ko'rinishga (masalan **Protocol Buffers** yoki **MessagePack**) o'girib yuboring.
* **Ulanishlarni guruhlang (Multiplexing):** Bitta ilova ichida har xil sahifalar yoki modullar uchun alohida WebSocket ulanishlarini ochmang. Bitta ulanishni ochib, xabarlar ichida `channel` yoki `type` maydonlari orqali ularni yo'naltiring.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa / Event | Vazifasi | Misol |
| :--- | :--- | :--- |
| `new WebSocket(url)` | Yangi ulanish o'rnatish | `const ws = new WebSocket('wss://api.com')` |
| `ws.send(data)` | Ma'lumot yuborish | `ws.send('Salom')` |
| `ws.close(code, reason)` | Ulanishni yopish | `ws.close(1000, 'Tugadi')` |
| `ws.readyState` | Ulanishning joriy holati | `if(ws.readyState === 1) { ... }` |
| `ws.onopen` | Ulanish muvaffaqiyatli ochilganda ishlaydi | `ws.onopen = () => { ... }` |
| `ws.onmessage` | Yangi xabar kelganda ishlaydi | `ws.onmessage = (e) => { ... }` |
| `ws.onclose` | Ulanish yopilganda ishlaydi | `ws.onclose = () => { ... }` |
