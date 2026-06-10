## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Workers nima?
JavaScript sukut bo'yicha **Single-Threaded** (bir oqimli) tildir. Bu degani, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Agar siz saytda juda og'ir matematik hisob-kitob bajarsangiz (masalan, 10 millionta sonni saralash yoki rasmni qayta ishlash), foydalanuvchi interfeysi (UI) qotib qoladi, tugmalar bosilmaydi va sahifa muzlaydi.

**Web Workers** — brauzerda asosiy oqimdan (Main Thread) alohida, orqa fonda (background thread) ishlaydigan mustaqil JavaScript oqimidir. U orqa fonda og'ir ishlarni bajaradi va asosiy sahifaga xalal bermaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoran bosh oshpazisiz (Main Thread)**:
* **Workersiz usul:** Siz mijozlar buyurtmasini qabul qilasiz, ovqat pishirasiz, idishlarni yuvasiz va pollarni artasiz. Siz bitta og'ir ishni (masalan, idish yuvishni) boshlasangiz, yangi mijozlar kelganda ularga xizmat ko'rsata olmaysiz (UI qotib qoladi).
* **Workerli usul:** Siz faqat buyurtma olasiz va taom tayyorlaysiz (Main Thread - UI tezkor). Idishlarni yuvish va pollarni artish uchun **yordamchi ishchi yollaysiz (Web Worker)**. Yordamchi orqa xonada o'z ishi bilan band bo'ladi, siz esa mijozlarga xizmat ko'rsatishda davom etaverasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Worker yaratish va bog'lanish)
Asosiy sahifada workerni ishga tushirish:
```javascript
// 1. Yangi worker yaratamiz
const myWorker = new Worker('worker.js');

// 2. Workerga ma'lumot jo'natamiz
myWorker.postMessage({ number: 40 });

// 3. Workerdan natijani kutib olamiz
myWorker.onmessage = (event) => {
  console.log("Workerdan kelgan natija:", event.data);
};
```

`worker.js` faylining ichki kodi (fondagi oqim):
```javascript
// Worker ichida 'message' hodisasini tinglaymiz
self.onmessage = (event) => {
  const num = event.data.number;
  
  // Og'ir hisob-kitob (masalan, Fibonachchi soni)
  const result = fibonacci(num);
  
  // Natijani asosiy oqimga qaytaramiz
  self.postMessage(result);
};

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### 2. Intermediate Example (Xatoliklarni boshqarish va to'xtatish)
Agar worker ichida xatolik yuz bersa, uni asosiy oqimda ushlash va ishni to'xtatish:
```javascript
const worker = new Worker('heavy-task.js');

// Xatoliklarni tinglash
worker.onerror = (error) => {
  console.error("Workerda xatolik yuz berdi:", error.message);
  console.error("Fayl:", error.filename, "Qator:", error.lineno);
  
  // Workerni zudlik bilan to'xtatamiz
  worker.terminate();
};

// Kerak bo'lsa ma'lum vaqtdan keyin majburiy o'chirish
setTimeout(() => {
  console.log("Vaqt tugadi, worker o'chirilmoqda...");
  worker.terminate(); // Worker ishi butunlay yakunlanadi
}, 5000);
```

### 3. Advanced Example (Transferable Objects orqali tezkor uzatish)
Katta hajmdagi ma'lumotlarni structured clone qilmasdan tez uzatish:
```javascript
const worker = new Worker('image-worker.js');

// Katta 32MB hajmli bufer yaratamiz
const buffer = new ArrayBuffer(32 * 1024 * 1024);

// Ikkinchi parametr sifatida buferni o'zini uzatamiz (Transferable)
// Bu orqali bufer nusxalanmaydi, uning egalik huquqi workerga o'tadi.
// Asosiy oqimda bufer bo'shab qoladi (hajmi 0 bo'ladi).
worker.postMessage(buffer, [buffer]);

console.log("Asosiy oqimdagi bufer hajmi:", buffer.byteLength); // 0
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Muzlab qolgan foydalanuvchi interfeysi (UI Blocking):** Brauzerda barcha JS kodlari, DOM renderlash va foydalanuvchi harakatlari bitta asosiy oqimda bajariladi. Agar JS og'ir hisob-kitob bilan band bo'lsa, brauzer ekraniga hech narsa chizib berolmaydi (Jank / Lag). Web Workers bu og'ir ishlarni fon rejimiga olib o'tadi.
* **Ko'p yadroli protsessorlardan (CPU Multi-core) unumli foydalanish:** Hozirgi qurilmalarda 4, 8 yoki undan ko'p CPU yadrolari bor. Oddiy JS faqat 1 ta yadrodan foydalanadi. Web Workers yordamida parallel oqimlar yaratib, protsessor kuchidan to'liq foydalanish mumkin.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Worker ichida `window` yoki `document`ni ishlatishga urinish
#### Xato:
Worker alohida kontekstda ishlaydi, unda DOM mavjud emas. Shuning uchun `document.getElementById` yoki `window.location` kabi kodlar xatolik beradi.
```javascript
// Worker ichida (Noto'g'ri)
const title = document.querySelector('h1'); // TypeError!
```
#### To'g'ri yechim:
Ma'lumotlarni `postMessage` orqali asosiy oqimga yuborish va DOM o'zgarishlarini asosiy oqimda amalga oshirish.

### 2. Har safar tugma bosilganda yangi Worker yaratish
#### Xato:
Har safar `new Worker()` chaqirilganda, brauzer yangi OS oqimini ochadi. Bu xotira va vaqt talab qiladi. Agar foydalanuvchi tugmani ko'p bossa, kompyuter qotib qolishi mumkin.
```javascript
// Noto'g'ri
button.onclick = () => {
  const w = new Worker('task.js'); // Xavfli!
  w.postMessage('run');
};
```
#### To'g'ri yechim:
Workerni bir marta global miqyosda yaratib qo'yish va undan qayta-qayta foydalanish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Web Worker nima va u nima uchun kerak?
   * **Javob:** Web Worker — bu brauzerning asosiy oqimini band qilmagan holda, fonda parallel ravishda ishlovchi JavaScript oqimidir. U sahifaning tezkorligini ta'minlash uchun kerak.
2. **Savol:** Worker ichida DOM bilan ishlab bo'ladimi?
   * **Javob:** Yo'q, worker ichida `window` va `document` obyektlariga kirish taqiqlangan. DOM bilan faqat asosiy oqim ishlay oladi.
3. **Savol:** Worker va asosiy oqim qanday muloqot qiladi?
   * **Javob:** Ular bir-biri bilan `postMessage()` metodi va `onmessage` hodisasi orqali xabarlar almashadi.
4. **Savol:** Workerni qanday to'xtatish mumkin?
   * **Javob:** Asosiy oqimdan `worker.terminate()` yoki worker ichidan `self.close()` metodini chaqirish orqali.

### Middle (5–8)
5. **Savol:** Worker ichida qaysi global obyektlar va API-lardan foydalanish mumkin?
   * **Javob:** `self`, `navigator`, `location`, `setTimeout`, `setInterval`, `fetch`, `IndexedDB` va `WebSocket`lardan foydalanish mumkin.
6. **Savol:** Structured Clone algoritmi nima va uning Web Workers-ga qanday aloqasi bor?
   * **Javob:** Bu JS obyektlarini xavfsiz va chuqur nusxalash algoritmi. `postMessage` orqali yuborilgan ma'lumotlar ushbu algoritm yordamida nusxalanib workerga o'tkaziladi.
7. **Savol:** SharedWorker va oddiy (Dedicated) Worker farqi nimada?
   * **Javob:** Dedicated Worker faqat uni yaratgan bitta sahifa (tab) uchun xizmat qiladi. SharedWorker esa bir xil domendagi bir nechta tablar va iframe-lar o'rtasida umumiy bo'lishi mumkin.
8. **Savol:** Worker yaratishda qanday cheklovlar bor (masalan, fayl yo'li)?
   * **Javob:** Worker fayli **Same-Origin Policy** (bir xil kelib chiqish) shartiga bo'ysunishi kerak. Ya'ni uni boshqa domendagi URL orqali to'g'ridan-to'g'ri yaratib bo'lmaydi (CORS cheklovi).

### Senior (9–12)
9. **Savol:** Transferable Objects nima va ular qachon ishlatiladi?
   * **Javob:** Transferable Objects (masalan, `ArrayBuffer`, `MessagePort`) — ma'lumotni nusxalamasdan, uning egalik huquqini (pointerini) bir oqimdan ikkinchisiga o'tkazuvchi obyektlardir. Ular juda katta hajmli ma'lumotlarni nol kechikish (zero-copy) bilan uzatishda qo'llaniladi.
10. **Savol:** SharedArrayBuffer va Atomics nima va ular Web Workers-da qanday qo'llaniladi?
    * **Javob:** `SharedArrayBuffer` yordamida bir nechta workerlar va asosiy oqim bir xil xotira maydonidan nusxasiz birgalikda foydalanishi mumkin. `Atomics` esa ushbu umumiy xotiraga yozish va o'qishda oqimlar to'qnashuvini (race conditions) oldini olish uchun sinxronizatsiya beradi.
11. **Savol:** inline Web Worker nima va uni qanday yaratish mumkin?
    * **Javob:** Alohida `.js` fayli ochmasdan, kod ichida Blob va URL.createObjectURL yordamida dinamik ravishda worker yaratish usulidir.
12. **Savol:** Web Workers yordamida parallel hisoblashlarni (MapReduce) brauzerda qanday amalga oshirish mumkin?
    * **Javob:** Vazifani mayda bo'laklarga bo'lib, bir nechta workerlarga yuborish (Map), barcha workerlar natijalarni hisoblab qaytargandan so'ng ularni asosiy oqimda jamlash (Reduce) orqali amalga oshiriladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Rasm filtrlarini qo'llash (Image Processing Pipeline)
Foydalanuvchi katta rasmni yuklaganda unga kulrang (grayscale) yoki blur filtrini qo'shish og'ir hisob-kitob talab qiladi.

#### Yechim (FilterWorker):
```javascript
// main.js
const imgWorker = new Worker('filter-worker.js');

function applyGrayscale(canvas, ctx) {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Rasm piksellarini workerga yuboramiz
  imgWorker.postMessage({
    pixels: imgData.data.buffer,
    width: canvas.width,
    height: canvas.height
  }, [imgData.data.buffer]); // Transferable sifatida beramiz

  imgWorker.onmessage = (event) => {
    const outputBuffer = event.data.pixels;
    const outputData = new ImageData(
      new Uint8ClampedArray(outputBuffer),
      event.data.width,
      event.data.height
    );
    // Filtr surtilgan rasmni chizamiz
    ctx.putImageData(outputData, 0, 0);
    console.log("Rasm filtri fonda muvaffaqiyatli bajarildi!");
  };
}
```

---

## 9. 🚀 Performance va Optimization

* **Oqimlar sonini cheklash:** Tizimda cheksiz worker ochmang. Odatda protsessor yadrolari soniga qarab (`navigator.hardwareConcurrency` marta) worker ochish tavsiya etiladi.
* **Worker-ni reuse (qayta ishlash) qilish:** Yangi worker yaratish qimmatga tushadi. Worker-pool arxitekturasini yarating, ya'ni tayyor workerlarni navbat bilan ishlating.

---

## 10. 📌 Cheat Sheet

| Metod / Obyekt | Qayerda ishlaydi | Vazifasi |
| :--- | :--- | :--- |
| `new Worker('path.js')` | Asosiy Oqim | Yangi fondagi worker obyektini yaratadi |
| `worker.postMessage(data)` | Asosiy Oqim | Worker-ga ma'lumot jo'natadi (Structured Clone) |
| `worker.terminate()` | Asosiy Oqim | Workerni majburiy to'xtatadi |
| `self.postMessage(data)` | Worker Oqimi | Asosiy oqimga ma'lumot yuboradi |
| `self.close()` | Worker Oqimi | Workerni o'z ichidan yopadi |
| `importScripts('lib.js')` | Worker Oqimi | Worker ichiga tashqi JS kutubxonalarini yuklaydi |
