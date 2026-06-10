## 1. 💡 Sodda Tushuntirish va Analogiya

### Advanced Fetch va Aborting nima?
**Fetch API** — bu brauzerdan serverga tarmoq so'rovlarini (HTTP so'rovlari) yuborish uchun ishlatiladigan zamonaviy interfeysdir. Odatda biz `fetch(url)` orqali oddiy so'rovlar yuboramiz, biroq katta loyihalarda so'rovlarni boshqarish (masalan: ma'lumotlar yuborishda sarlavhalar sozlash, so'rov juda cho'zilib ketganda uni to'xtatish yoki foydalanuvchi sahifadan chiqib ketganda so'rovni bekor qilish) talab etiladi. Buning uchun bizga **AbortController** va ilg'or `fetch` sozlamalari yordam beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranda taom buyurtma qildingiz**:
* **Oddiy Fetch:** Ofitsiantga "menga pitssa olib keling" dedingiz, u ketdi va pitssa tayyor bo'lishini kuta boshladingiz.
* **Headers (Sarlavhalar):** Ofitsiantga "menga pitssa olib keling, faqat piyozsiz bo'lsin va achchiq sous bilan" deb qo'shimcha shartlar (sarlavhalar) berishingiz.
* **AbortController (Buyurtmani bekor qilish):** Buyurtma berganingizdan keyin to'satdan shoshilinch ish chiqib qoldi va ketishingiz kerak. Siz ofitsiantni chaqirib: "Aka, buyurtmani bekor qiling (Abort), men ketishim kerak!" deysiz. Agar taom hali tayyor bo'lmagan bo'lsa, jarayon to'xtatiladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Headers va POST so'rovi sozlamalari)
Yangi foydalanuvchini ro'yxatdan o'tkazish uchun POST so'rovi yuborish:
```javascript
async function registerUser(username, email) {
  const url = 'https://api.example.com/users';
  
  const response = await fetch(url, {
    method: 'POST', // HTTP metodi
    headers: {
      'Content-Type': 'application/json', // Yuborilayotgan ma'lumot turi
      'Accept': 'application/json',       // Qabul qiluvchi ma'lumot turi
      'Authorization': 'Bearer my-token-123' // Avtorizatsiya tokeni
    },
    body: JSON.stringify({
      username: username,
      email: email
    }) // JS obyektini stringga aylantiramiz
  });

  if (!response.ok) {
    throw new Error(`Xatolik: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

### 2. Intermediate Example (AbortController yordamida so'rovni bekor qilish)
Foydalanuvchi tugmani bosganda boshlangan so'rovni ikkinchi marta bosganda bekor qilish:
```javascript
let controller;

function startDownload() {
  // Agar oldingi so'rov faol bo'lsa, uni bekor qilamiz
  if (controller) {
    controller.abort();
    console.log('Oldingi yuklash bekor qilindi.');
  }

  // Yangi AbortController yaratamiz
  controller = new AbortController();
  const signal = controller.signal;

  fetch('https://api.example.com/large-file', { signal })
    .then(response => response.blob())
    .then(blob => console.log('Yuklash tayyor:', blob))
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Yuklash foydalanuvchi tomonidan bekor qilindi.');
      } else {
        console.error('Yuklashda boshqa xatolik:', error);
      }
    });
}
```

### 3. Advanced Example (Fetch so'roviga Timeout o'rnatish)
Agar so'rov 5 soniyadan ko'p vaqt olsa, uni avtomatik abort qilish:
```javascript
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options; // Default 5 soniya timeout
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id); // Agar so'rov tez tugasa, taymerni tozalaymiz
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('So\'rov belgilangan vaqt ichida javob bermadi (Timeout)');
    }
    throw error;
  }
}
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Keraksiz tarmoq trafigi va xotira sarfi:** Foydalanuvchi qidiruv maydoniga yozganda (Autocomplete) har bir harfda fetch ketadi. Eski harflarga ketgan fetch so'rovlarini bekor qilmasak, tarmoq band bo'ladi va eng oxirgi so'rov natijasi emas, balki eng kech kelgan eski so'rov natijasi ekranga chiqib qolishi mumkin (Race Condition).
* **Cheksiz kutish (Timeout):** Agar serverda muammo bo'lsa, so'rov juda uzoq kutish rejimida qolib ketadi va foydalanuvchi interfeysi muzlaydi. Timeout qo'shish dastur barqarorligini ta'minlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `JSON.stringify` qilishni unutish
#### Xato:
`fetch(url, { method: 'POST', body: { name: 'Ali' } })` // Obyekt to'g'ridan-to'g'ri jo'natilmaydi!
#### To'g'ri usul:
`fetch(url, { method: 'POST', body: JSON.stringify({ name: 'Ali' }) })`

### 2. `Content-Type: application/json` sarlavhasini bermaslik
#### Xato:
JSON string jo'natib, sarlavhada uning turi ko'rsatilmasa, server uni tushunmaydi va so'rovni rad etadi.
#### To'g'ri usul:
`headers: { 'Content-Type': 'application/json' }` sozlamasini qo'shish.

### 3. HTTP xato statuslarida (masalan 404 yoki 500) catch blokiga tushadi deb o'ylash
#### Xato:
`fetch(url).catch(err => console.log('Xato!'))` // 404 yoki 500 da catch ishlamaydi, chunki server javob bergan!
#### To'g'ri usul:
`response.ok` xossasini tekshirish.

### 4. Har safar yangi fetch uchun bitta global AbortController ishlatish
#### Xato:
Bitta controllerni qayta-qayta ishlatish. U bir marta abort bo'lgach, keyingi barcha so'rovlar ham darhol bekor bo'ladi.
#### To'g'ri usul:
Har bir yangi fetch so'rovi uchun yangi `new AbortController()` yaratish.

### 5. `clearTimeout()` chaqirishni unutish
#### Xato:
Timeout funksiyasini yozib, fetch muvaffaqiyatli tugagandan keyin taymerni o'chirmaslik. Bu keyinchalik xotira muammolariga olib keladi.
#### To'g'ri usul:
`try` bloki ichida javob olinganidan keyin `clearTimeout(id)` ni chaqirish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** `fetch()` nima va u qanday qiymat qaytaradi?
   * **Javob:** `fetch()` — bu HTTP so'rovlar yuborish uchun asinxron funksiya bo'lib, u Response obyektiga resolve bo'luvchi Promise qaytaradi.
2. **Savol:** Nega `fetch` so'rovida 404 status kodi kelganda `.catch()` bloki ishga tushmaydi?
   * **Javob:** Chunki server bilan ulanish muvaffaqiyatli amalga oshgan va javob olingan. `.catch()` faqat tarmoq butunlay uzilib qolsa yoki ulanish imkonsiz bo'lsa ishlaydi.
3. **Savol:** POST so'rovida `body` nima va u qanday formatda uzatiladi?
   * **Javob:** `body` — bu serverga yuboriladigan ma'lumotlar tanasi. Odatda u `JSON.stringify(obyekt)` yordamida JSON satri ko'rinishida uzatiladi.
4. **Savol:** Fetch-da sarlavhalar (headers) nima uchun kerak?
   * **Javob:** Serverga so'rov haqida qo'shimcha metadata (ma'lumot turi, avtorizatsiya tokeni, kesh sozlamalari) uzatish uchun kerak.

### Middle (5–8)
5. **Savol:** `AbortController` nima va uning `signal` xossasi nima vazifani bajaradi?
   * **Javob:** `AbortController` — so'rovlarni bekor qilish imkonini beruvchi obyekt. Uning `signal` xossasi `fetch` sozlamalariga uzatiladi va controller abort bo'lganda so'rovni to'xtatish uchun aloqa kanali bo'lib xizmat qiladi.
6. **Savol:** `response.json()` va `response.text()` farqi nimada?
   * **Javob:** `json()` kelgan matnni avtomatik ravishda parse qilib JS obyektiga o'giradi. `text()` esa kelgan ma'lumotni o'zgarmagan oddiy satr sifatida qaytaradi.
7. **Savol:** Qanday qilib `fetch` so'rovida bir nechta so'rovlar poygasini (Race Condition) oldini olish mumkin?
   * **Javob:** Yangi so'rov jo'natishdan oldin, oldingi faol so'rovning `AbortController`ini chaqirib, abort qilish orqali.
8. **Savol:** `response.ok` nima va u qanday ishlaydi?
   * **Javob:** Bu Response obyektining o'qiladigan xossasi bo'lib, HTTP status 200 va 299 oralig'ida bo'lsa `true`, aks holda `false` bo'ladi.

### Senior (9–12)
9. **Savol:** AbortController xotira sizib chiqishini (memory leaks) qanday hal qiladi?
   * **Javob:** Sahifadan chiqib ketganda yakunlanmagan tarmoq so'rovlarini bekor qilish orqali u yopilmagan Promise-lar va ulanishlar xotirada ushlanib qolishining oldini oladi.
10. **Savol:** `headers` tarkibidagi `Keep-Alive` xossasi va fetch aloqasi qanday ishlaydi?
    * **Javob:** U HTTP ulanishni har bir so'rov uchun qayta ochmasdan, ochiq holda saqlab turishni ta'minlaydi. Modern brauzerlar buni sukut bo'yicha boshqaradi.
11. **Savol:** Custom AbortController signallari yordamida bir vaqtda 5 ta fetch so'rovidan faqat bittasini yoki hammasini qanday bekor qilish mumkin?
    * **Javob:** Agar barcha 5 ta fetch so'roviga bitta `controller.signal` berilgan bo'lsa, `controller.abort()` chaqirilganda barchasi birdaniga bekor bo'ladi. Agar alohida nazorat kerak bo'lsa, alohida controllerlar yaratilishi lozim.
12. **Savol:** Fetch API bilan Axios kutubxonasi o'rtasidagi asosiy arxitekturaviy farqlar nimada?
    * **Javob:** Axios sukut bo'yicha xato HTTP statuslarda reject bo'ladi, so'rovlarni bekor qilish uchun o'zining CancelToken-lariga ega (hozirda u ham AbortController ishlatadi), avtomatik ravishda JSON parse qiladi va Interceptor-larni qo'llab-quvvatlaydi. Fetch esa brauzer ichki standart API-si bo'lib, qo'shimcha yuklamalarsiz ishlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Qidiruv tizimida (Typeahead / Autocomplete) yuklamani kamaytirish
Foydalanuvchi inputga tez yozganda serverga ketma-ket so'rov ketadi. Biz faqat eng so'nggi so'rov javobini kutamiz, eskilarini esa bekor qilamiz.

#### Yechim (Race condition oldini olish):
```javascript
class SearchService {
  constructor() {
    this.controller = null;
  }

  async search(query) {
    // Oldingi so'rovni bekor qilamiz
    if (this.controller) {
      this.controller.abort();
    }

    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`, { signal });
      if (!response.ok) throw new Error('Qidiruvda xatolik');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log(`"${query}" so'rovi bekor qilindi (eski so'rov).`);
        return null; // Hech narsa qaytarmaymiz
      }
      throw error;
    }
  }
}

const searchService = new SearchService();
// Foydalanuvchi tez yozmoqda:
searchService.search('a');
searchService.search('ab');
searchService.search('abc'); // Faqat mana shu so'rov natijasi ekranga chiqadi
```

---

## 9. 🚀 Performance va Optimization

* **Keshdan foydalanish:** Fetch opsiyalarida `cache: 'force-cache'` berish orqali tez-tez o'zgarmaydigan ma'lumotlarni tarmoqdan qayta tortmasdan brauzer keshidan olish mumkin.
* **Ulanishlarni o'chirish (Aborting):** Sahifa almashganda (SPA) o'sha sahifadagi barcha yakunlanmagan fetch so'rovlarini abort qilish mijoz kompyuteri va tarmoq resurslarini tejaydi.

---

## 10. 📌 Cheat Sheet

| Sozlama / Metod | Vazifasi | Misol |
| :--- | :--- | :--- |
| `method` | HTTP metodini tanlash (GET, POST, PUT, DELETE) | `method: 'POST'` |
| `headers` | So'rov sarlavhalarini belgilash | `headers: { 'Content-Type': 'application/json' }` |
| `body` | Serverga yuboriladigan ma'lumot | `body: JSON.stringify(data)` |
| `signal` | AbortController signalini bog'lash | `signal: controller.signal` |
| `controller.abort()` | Bog'langan so'rovni zudlik bilan to'xtatish | `controller.abort()` |
| `cache` | Kesh strategiyasini belgilash | `cache: 'no-store'` |
