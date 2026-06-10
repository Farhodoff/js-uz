## 1. 💡 Sodda Tushuntirish va Analogiya

### Fetch API nima?
**Fetch API** — bu brauzerga o'rnatilgan, JavaScript orqali tarmoq (network) so'rovlarini yuborish va serverdan ma'lumotlarni yuklab olish uchun ishlatiladigan modern funksionallikdir. Uning yordamida sahifani to'liq yangilamasdan (refresh) turib, fonda API-lar bilan muloqot qilish mumkin.

### Real hayotiy analogiya
Tasavvur qiling, siz **kuryerlik xizmatidan foydalanyapsiz**:
* **Eski XMLHttpRequest usuli:** Kuryerni chaqirish uchun juda uzun qog'ozbozlik shartnomasini to'ldirasiz, qayerga borishi, qanday borishi, agar xato bo'lsa nima qilishini har bir bosqichini chigal kodlar bilan belgilaysiz.
* **Fetch API usuli:** Siz kuryerlik kompaniyasiga telefon qilib, shunchaki manzilni (`url`) va nima yubormoqchi ekanligingizni (`body`) aytasiz. Kuryer borib kelishni o'z zimmasiga oladi va sizga elektron va'da (Promise) beradi. Vaqt kelib u eshikni taqillatadi va ichida sovg'asi (Response) bo'lgan qutini uzatadi. Siz shunchaki qutini ochib ichidagidan foydalanasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (GET so'rovi yordamida JSON olish)
```javascript
// Oddiy ma'lumot yuklab olish
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // response.json() ham asinxron ishlaydi
    const users = await response.json();
    console.log(users.slice(0, 2)); // Dastlabki 2 ta foydalanuvchini chiqaradi
  } catch (error) {
    console.error("Tarmoq xatosi:", error);
  }
}

getUsers();
```

### 2. Intermediate Example (POST so'rovi yordamida ma'lumot yuborish)
Serverga yangi ma'lumot qo'shish uchun so'rov tanasi (body) va sarlavhalari (headers) sozlanadi:
```javascript
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST", // HTTP metodi
      headers: {
        "Content-Type": "application/json" // Yuborilayotgan ma'lumot turi JSON ekanligi
      },
      body: JSON.stringify(userData) // Obyektni string (matn) holiga keltiramiz
    });

    const result = await response.json();
    console.log("Muvaffaqiyatli yaratildi:", result);
  } catch (error) {
    console.error("Yuborishda xato:", error);
  }
}

createUser({ name: "Farhod", username: "farrux" });
```

### 3. Advanced Example (So'rovni bekor qilish - AbortController)
Agar foydalanuvchi sahifadan chiqib ketsa yoki so'rov juda cho'zilib ketsa, uni to'xtatish (abort qilish):
```javascript
const controller = new AbortController();
const signal = controller.signal;

async function fetchWithTimeout() {
  // 3 soniyadan keyin so'rovni bekor qiladigan taymer
  setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch("https://httpbin.org/delay/5", { signal });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("So'rov vaqt o'tganligi sababli bekor qilindi (Timeout)!");
    } else {
      console.log("Boshqa xatolik:", error);
    }
  }
}

fetchWithTimeout();
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **XMLHttpRequest chigalligi:** Avvalgi XMLHttpRequest (XHR) obyekti callbacks tizimiga asoslangan bo'lib, uning yozilishi va boshqarilishi juda murakkab edi. Fetch esa toza Promise-larga asoslangan.
* **SPA (Single Page Application) ekotizimi:** Fetch sahifa to'liq qayta yuklanmasdan faqat uning kerakli qismini dinamik yangilash imkonini berdi (Gmail, Facebook kabi tezkor ilovalar).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. HTTP xatolarida (404, 500) fetch xato otadi deb o'ylash
#### Muammo:
Serverdan 404 yoki 500 qaytsa ham tarmoq aloqasi buzilmagani uchun `fetch` Promise-ni "fulfilled" (hal qilingan) qiladi, catch bloki ishlamaydi.
#### Tuzatish:
Har doim `response.ok` xossasini tekshirish lozim:
```javascript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP xatosi! Status: ${response.status}`);
}
```

### 2. `response.json()` ni `await` qilishni unutish
`json()` metodi ham Promise qaytaradi. `const data = response.json()` deb yozilsa, uning ichida qiymat emas, Promise saqlanib qoladi. Har doim `await response.json()` deb yozish kerak.

### 3. `JSON.stringify` qilmasdan obyektni to'g'ridan-to'g'ri body-ga berish
#### Xato:
`body: { name: "Ali" }`
#### Tuzatish:
`body: JSON.stringify({ name: "Ali" })`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Fetch API nima va u qanday HTTP metodlarini qo'llab-quvvatlaydi?
   * **Javob:** Fetch tarmoq so'rovlarini yuborish vositasi bo'lib, barcha standart metodlarni (GET, POST, PUT, DELETE, PATCH va boshqalar) qo'llab-quvvatlaydi.
2. **Savol:** `fetch()` qachon reject (rad etilgan) holatiga o'tadi?
   * **Javob:** Faqatgina tarmoq mutlaqo uzilganda yoki DNS topilmay serverga so'rov yetib bormagandagina. HTTP status kodlari 404/500 bo'lsa resolve bo'laveradi.
3. **Savol:** Response obyektining `ok` xossasi nima uchun kerak?
   * **Javob:** U HTTP status kodi 200–299 oralig'ida bo'lsa true, aks holda false qiymatini qaytaradi.
4. **Savol:** Nima uchun POST so'rov yuborganda `Content-Type` headeri kerak?
   * **Javob:** Serverga biz yuborayotgan ma'lumot qaysi formatda ekanligini (odatda `application/json`) bildirish uchun.

### Middle (5–8)
5. **Savol:** CORS (Cross-Origin Resource Sharing) xatosi nima va u qanday hal qilinadi?
   * **Javob:** Bu brauzerning xavfsizlik to'sig'i bo'lib, boshqa domendagi ma'lumotlarni ruxsatsiz olishga yo'l qo'ymaydi. Uni hal qilish uchun server o'z javobida `Access-Control-Allow-Origin` sarlavhasini qaytarishi kerak.
6. **Savol:** `response.json()` va `response.text()` farqi nimada?
   * **Javob:** `json()` kelgan ma'lumotni JavaScript obyektiga o'giradi. `text()` esa kelgan ma'lumotni oddiy string ko'rinishida o'qiydi.
7. **Savol:** Bitta response obyektida `response.json()` va `response.text()` ni ketma-ket chaqirish mumkinmi?
   * **Javob:** Yo'q. Brauzer body oqimini (stream) faqat bir marta o'qiy oladi. Ikkinchi marta chaqirganda `TypeError: body stream already read` xatosi chiqadi.
8. **Savol:** So'rov bilan birga cookie-larni boshqa domendagi API serverga yuborish qanday sozlanadi?
   * **Javob:** Fetch options qismida `credentials: 'include'` parametri berilishi kerak.

### Senior (9–12)
9. **Savol:** So'rov yuborishda vaqt cheklovini (Timeout) Fetch yordamida qanday amalga oshiramiz?
   * **Javob:** `AbortController` yaratib, uning `signal`ini fetch parametriga beramiz va `setTimeout` yordamida kerakli vaqtda `controller.abort()` chaqiramiz.
10. **Savol:** Fetch orqali yuklanish jarayonini (Upload/Download progress) kuzatish mumkinmi?
    * **Javob:** Fetch yuklash (upload) progressini kuzata olmaydi (buning uchun XHR kerak). Ammo yuklab olish (download) progressini `response.body` oqimidan (ReadableStream) baytlarni o'qib borish orqali kuzatish mumkin.
11. **Savol:** Fetch so'rovini keshlash (caching) siyosatini qanday boshqaramiz?
    * **Javob:** Options ichidagi `cache` parametri orqali (`'no-store'`, `'reload'`, `'force-cache'`, `'only-if-cached'`).
12. **Savol:** Axios kutubxonasi va o'rnatilgan Fetch API o'rtasidagi asosiy farqlar nimada?
    * **Javob:** Axios avtomatik ravishda HTTP xatolarda reject qiladi, JSON-ga o'gira oladi (transform), so'rovlarni abort qilish qulayroq va yuklash progressini qo'llab-quvvatlaydi. Fetch esa brauzerga o'rnatilgan bo'lib, loyihaga ortiqcha yuklama qo'shmaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Dinamik Ob-havo Ma'lumotlarini Yuklash
API orqali shahar nomini yuborib ob-havo ma'lumotini yuklaymiz. HTTP xatolarini va tarmoq uzilishlarini to'g'ri boshqaramiz.

```javascript
async function getWeather(city) {
  const apiKey = "demo_key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    
    // 1. HTTP status xatolarini tekshiramiz
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Shahar topilmadi!");
      }
      throw new Error("Server xatosi!");
    }
    
    // 2. JSON-ga o'giramiz
    const data = await response.json();
    return {
      temp: data.main.temp - 273.15, // Kelvinni Selsiyga o'tkazamiz
      description: data.weather[0].description
    };
  } catch (error) {
    // Tarmoq uzilishi yoki qo'lda otilgan xatolar shu yerga tushadi
    console.error("Ob-havo olishda xato:", error.message);
    return null;
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **Keshlashdan foydalaning:** Agar tez-tez o'zgarmaydigan ma'lumot bo'lsa (masalan davlatlar ro'yxati), `cache: 'force-cache'` sozlamasi bilan so'rovni keshdan tezkor o'qing.
* **Keep-Alive:** Bir nechta ketma-ket qisqa so'rovlar yuborilganda tarmoq ulanishini ochiq saqlash uchun `keepalive: true` opsiyasidan foydalaning.

---

## 10. 📌 Cheat Sheet

| Metod / Option | Vazifasi | Misol / Sintaksis |
| :--- | :--- | :--- |
| **fetch(url)** | GET so'rovi yuborish | `await fetch('/api')` |
| **response.ok** | Muvaffaqiyatni tekshirish (2xx) | `if (res.ok) { ... }` |
| **response.json()** | Body-ni JSON formatda o'qish | `await res.json()` |
| **response.text()** | Body-ni oddiy matn ko'rinishida o'qish | `await res.text()` |
| **body** | POST so'rovida yuboriladigan ma'lumot | `body: JSON.stringify(data)` |
| **headers** | So'rov sarlavhalari | `headers: { 'Content-Type': 'application/json' }` |
| **AbortController** | So'rovni bekor qilish | `controller.abort()` |
