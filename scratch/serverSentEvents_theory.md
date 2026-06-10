## 1. 💡 Sodda Tushuntirish va Analogiya

### Server-Sent Events (SSE) nima?
**Server-Sent Events (SSE)** — bu brauzer va server o'rtasida o'rnatiladigan bir tomonlama (one-way) doimiy aloqa kanali. U serverga real vaqt rejimida (real-time) mijozga yangi ma'lumotlarni yuborish imkonini beradi. Mijoz faqat bir marta serverga ulanish so'rovini yuboradi va server aloqani ochiq saqlab, yangiliklar paydo bo'lishi bilan ularni oqim (stream) ko'rinishida yuborib turadi.

### Real hayotiy analogiya
Tasavvur qiling, siz **obuna bo'lgan gazeta yoki jurnalni yetkazib berish xizmati**:
* **Polling (Soliishtirish uchun):** Siz har 5 daqiqada pochtangizga borib, "Menga gazeta keldimi?" deb so'raysiz. Agar kelmagan bo'lsa, quruq qaytasiz. Bu juda charchatadigan va samarasiz jarayon.
* **Server-Sent Events (SSE):** Siz gazeta nashriyotiga bir marta borib **obuna bo'lasiz** (ulanish). Nashriyot har safar yangi gazeta chop etilganda, uni to'g'ridan-to'g'ri uyingizga tashlab ketadi (server-push). Siz qayta-qayta borib so'rashingiz shart emas, gazeta o'zi keladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Mijoz / Brauzer qismi)
Brauzer orqali serverdagi SSE oqimiga ulanish va kelgan xabarlarni konsolga chiqarish:
```javascript
// Server-Sent Events oqimiga ulanish
const eventSource = new EventSource('/api/live-updates');

// Serverdan oddiy xabar kelganda ishlovchi funksiya
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Yangi xabar keldi:", data.message);
};

// Agar ulanishda xato yuz bersa
eventSource.onerror = (error) => {
  console.error("SSE ulanishida xatolik:", error);
};
```

### 2. Intermediate Example (Server qismi - Node.js Express)
Serverda `text/event-stream` oqimini yaratish va har 2 soniyada mijozga vaqtni jo'natish:
```javascript
const express = require('express');
const app = express();

app.get('/api/live-updates', (req, res) => {
  // SSE uchun kerakli HTTP sarlavhalarini o'rnatamiz
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Mijozga boshlang'ich xabar yuboramiz
  res.write(`data: ${JSON.stringify({ message: "Ulanish o'rnatildi!" })}\n\n`);

  // Har 2 soniyada vaqtni jo'natib turamiz
  const intervalId = setInterval(() => {
    const timeData = { time: new Date().toLocaleTimeString() };
    res.write(`data: ${JSON.stringify(timeData)}\n\n`);
  }, 2000);

  // Agar mijoz ulanishni yopsa, intervalni tozalaymiz
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => console.log("SSE Server running on port 3000"));
```

### 3. Advanced Example (Maxsus hodisalar va ID orqali qayta ulanish)
Serverda maxsus hodisalar (custom events) va xabar ID-larini ishlatish:
```javascript
// Brauzer qismi
const sse = new EventSource('/api/advanced-stream');

// Maxsus 'price-update' hodisasini tinglash
sse.addEventListener('price-update', (event) => {
  const stock = JSON.parse(event.data);
  console.log(`Aksiya narxi o'zgardi - ${stock.symbol}: ${stock.price}`);
});

// Maxsus 'alert' hodisasini tinglash
sse.addEventListener('alert', (event) => {
  alert(`Tizim ogohlantirishi: ${event.data}`);
});
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Keraksiz so'rovlar yuklamasi (Polling):** Avvallari real-time xususiyati uchun har 2-3 soniyada serverga fetch so'rovlari yuborilar edi. Bu server va tarmoqni juda ko'p foydasiz HTTP so'rovlar bilan band qilardi.
* **Ikki tomonlama ulanish og'irligi (WebSockets):** WebSockets juda kuchli texnologiya, ammo uni sozlash va boshqarish (proxies, firewalls, protokollar) murakkab. Agar bizga faqat serverdan mijozga ma'lumot uzatish kerak bo'lsa (masalan, yangiliklar tasmasi, bildirishnomalar, birja narxlari), SSE yengil va mukammal yechimdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `\n\n` formatini unutish (Serverda)
#### Xato:
SSE oqimida xabar yakunlanganini bildirish uchun har bir xabar oxirida ikkita yangi qator belgisi `\n\n` yuborilishi shart. Bitta `\n` yuborilsa, brauzer xabar tugashini kutib turaveradi.
```javascript
// Noto'g'ri
res.write(`data: ${message}\n`);
// To'g'ri
res.write(`data: ${message}\n\n`);
```

### 2. Keshni o'chirishni unutish (Cache-Control)
#### Xato:
Agar sarlavhalarda keshni o'chirish sozlanmasa, brauzer (ayniqsa, eski brauzerlar va ba'zi proksilar) oqimni keshlab qo'yishi va real-time ma'lumotlar kelmay qolishi mumkin.
```javascript
// To'g'ri
'Cache-Control': 'no-cache'
```

### 3. GET o'rniga POST ishlatishga urinish
#### Xato:
Standart `EventSource` faqat GET so'rovlarini qo'llab-quvvatlaydi. Unga POST orqali parametrlar berib yuborish imkoni yo'q. Agar murakkab ma'lumotlar yuborish kerak bo'lsa, URL query parametrlaridan foydalanish yoki WebSockets-ga o'tish lozim.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Server-Sent Events (SSE) nima?
   * **Javob:** SSE — bu HTTP protokoli orqali serverdan mijozga real vaqt rejimida bir tomonlama ma'lumotlarni oqim (stream) ko'rinishida yuborish imkonini beruvchi texnologiya.
2. **Savol:** SSE uchun qaysi brauzer obyekti ishlatiladi?
   * **Javob:** Standart `EventSource` klassi ishlatiladi.
3. **Savol:** SSE qaysi HTTP sarlavhasini (Content-Type) talab qiladi?
   * **Javob:** SSE serverdan kelayotgan javobda `text/event-stream` sarlavhasini talab qiladi.
4. **Savol:** Ulanish uzilib qolsa SSE qanday ish tutadi?
   * **Javob:** EventSource ulanish uzilganda avtomatik ravishda qayta ulanishga (auto-reconnect) harakat qiladi.

### Middle (5–8)
5. **Savol:** WebSockets va SSE o'rtasidagi asosiy farq nimada?
   * **Javob:** WebSockets ikki tomonlama (bidirectional) to'liq aloqa beradi, SSE esa faqat serverdan mijozga bir tomonlama (unidirectional) ma'lumot uzatish uchun ishlaydi va oddiy HTTP protokolidan foydalanadi.
6. **Savol:** SSE-da maxsus (custom) hodisalarni qanday tinglash mumkin?
   * **Javob:** Buning uchun `addEventListener('hodisa_nomi', callback)` metodidan foydalanish kerak.
7. **Savol:** Server SSE oqimida xabarlar tugaganini mijozga qanday bildiradi?
   * **Javob:** Har bir xabarning oxirida ikkita yangi qator belgisi `\n\n` (double newline) bo'lishi shart.
8. **Savol:** `Last-Event-ID` sarlavhasi nima uchun kerak?
   * **Javob:** Ulanish uzilib qolib, qayta tiklanganda, brauzer oxirgi muvaffaqiyatli qabul qilgan xabarining `id` sini yuboradi, server esa shunga qarab qolib ketgan joyidan davom ettiradi.

### Senior (9–12)
9. **Savol:** HTTP/1.1 va HTTP/2 protokollarida SSE ulanishlarining qanday cheklovlari bor?
   * **Javob:** HTTP/1.1 da bitta brauzer bitta serverga maksimal 6 ta ochiq SSE ulanishiga ega bo'la oladi. HTTP/2 multiplexing-ni qo'llab-quvvatlaganligi sababli, bu cheklov sezilmaydi va bitta ulanish ichida yuzlab oqimlar ochilishi mumkin.
10. **Savol:** SSE oqimida xavfsizlik (Authorization) qanday amalga oshiriladi?
    * **Javob:** Standart `EventSource` custom sarlavhalarni qo'llab-quvvatlamagani sababli, tokenni URL query parametrlari (masalan, `?token=abc`) yoki cookie fayllari orqali uzatish mumkin.
11. **Savol:** Server-Sent Events orqali binary (ikkilik) ma'lumotlarni yuborish mumkinmi?
    * **Javob:** SSE faqat UTF-8 matnli formatni qo'llab-quvvatlaydi. Binary ma'lumotlarni yuborish uchun ularni Base64 formatiga o'girib matn ko'rinishida yuborish kerak bo'ladi.
12. **Savol:** Backpressure (orqa bosim) muammosi SSE-da qanday namoyon bo'ladi va uni qanday hal qilish mumkin?
    * **Javob:** Agar mijoz ma'lumotlarni server yuborish tezligidan ko'ra sekinroq qayta ishlayotgan bo'lsa, xotira to'lib ketishi mumkin. Buni hal qilish uchun mijozda og'ir hisob-kitoblarni Web Worker-ga o'tkazish yoki serverda yuborish tezligini sekinlashtirish zarur.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Jonli bildirishnomalar tizimi (Real-Time Notification Service)
Katta hajmdagi foydalanuvchiga ega bo'lgan tizimda, yangi xabarlar va ogohlantirishlarni real vaqtda yetkazish uchun SSE ishlatilgan.

#### Yechim (Bildirishnoma yuboruvchi sinf):
```javascript
// Mijoz tomoni (NotificationClient.js)
class NotificationClient {
  constructor(userId) {
    this.userId = userId;
    this.sse = null;
  }

  connect() {
    this.sse = new EventSource(`/api/notifications?userId=${this.userId}`);

    this.sse.addEventListener('new-comment', (event) => {
      const data = JSON.parse(event.data);
      this.showToast(`Postda yangi izoh: ${data.commenterName}`);
    });

    this.sse.addEventListener('like', (event) => {
      this.showToast(`Sizning postingizga kimdir like bosdi!`);
    });

    this.sse.onerror = () => {
      console.log("Qayta ulanish kutilmoqda...");
    };
  }

  showToast(message) {
    // UI-ga toast bildirishnomasini chiqarish
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  disconnect() {
    if (this.sse) {
      this.sse.close();
      console.log("Bildirishnomalar oqimi yopildi.");
    }
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **HTTP/2 majburiyligi:** Katta loyihalarda SSE-ni HTTP/2 orqali ishlatish tavsiya etiladi. Chunki HTTP/1.1 dagi 6 ta ulanish cheklovi foydalanuvchining ko'p tab ochganda sahifa ishlamay qolishiga olib kelishi mumkin.
* **Gzip/Brotli siqish (Compression):** SSE matnli format bo'lganligi sababli, gzip yoki Brotli siqish protokollari ma'lumot hajmini 70-80% gacha kamaytiradi.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| `new EventSource(url)` | Belgilangan URL bilan SSE oqimini ochish | `const sse = new EventSource('/stream')` |
| `sse.onmessage` | Standart server xabarini qabul qilish | `sse.onmessage = e => console.log(e.data)` |
| `sse.addEventListener(event, cb)` | Maxsus nomlangan hodisalarni tinglash | `sse.addEventListener('chat', cb)` |
| `sse.close()` | Ulanishni butunlay to'xtatish | `sse.close()` |
| `sse.readyState` | Ulanish holati (0 - Connecting, 1 - Open, 2 - Closed) | `console.log(sse.readyState)` |
| `Last-Event-ID` | Qayta ulanishda yuboriladigan so'nggi xabar ID-si | Server tomonidan yuborilgan `id: 123` orqali boshqariladi |
