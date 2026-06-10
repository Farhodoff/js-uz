## 1. 💡 Sodda Tushuntirish va Analogiya

### Kengaytirilgan Web Storage: Cookies va IndexedDB nima?
Brauzerda ma'lumot saqlashning bir nechta usullari bor. Agar bizga juda kichik, xavfsiz va server bilan aloqa qiladigan ma'lumot kerak bo'lsa **Cookies (Pechenyelar)** dan, agar juda katta, murakkab va indekslangan ma'lumotlar ombori kerak bo'lsa **IndexedDB** dan foydalanamiz.

### Real hayotiy analogiya
Tasavvur qiling, siz **mehmonxonaga joylashdingiz**:
* **Cookies (Ruxsatnoma Beyjigi):** Bu sizga berilgan kichkina beyjik. Unda sizning ismingiz va xona raqamingiz yozilgan. Siz har safar oshxonaga yoki basseynga borganingizda, xizmatchilar sizdan beyjikni ko'rsatishni so'rashadi (har bir HTTP so'rovda serverga yuborilishi). Beyjik kichik va u ma'lum kundan keyin amal qilish muddatini yo'qotadi (Expires).
* **IndexedDB (Shaxsiy Seyf):** Bu sizning xonangizdagi katta seyf (baza). Uning ichiga siz kiyimlar, hujjatlar, kitoblar va og'ir narsalarni tartib bilan joylashtirishingiz mumkin. U uydan ketguningizcha sizga xizmat qiladi. Unga kirish uchun faqat sizda kalit bor va mehmonxona xodimlari (server) uning ichidagi narsalarni siz olib chiqib ko'rsatmaguningizcha ko'ra olmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Cookies bilan ishlash (Yozish, O'qish va O'chirish)
```javascript
// 1. Cookie o'rnatish
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  // Secure va SameSite=Lax xavfsizlik atributlari bilan birga yozish
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax; Secure`;
}

// 2. Cookie qiymatini olish
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

// 3. Cookie o'chirish (amal qilish muddatini o'tgan sanaga sozlash)
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// Ishlatilishi:
setCookie("username", "Farhod", 7);
console.log(getCookie("username")); // "Farhod"
```

### 2. IndexedDB: Ma'lumotlar bazasini sozlash va tranzaksiyalar
```javascript
// 1. Bazani ochish
const request = indexedDB.open("StoreDB", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  // Yangi object store (jadval) yaratish
  if (!db.objectStoreNames.contains("products")) {
    db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function (event) {
  const db = event.target.result;
  console.log("IndexedDB muvaffaqiyatli ochildi.");
  
  // Ma'lumot qo'shish tranzaksiyasini boshlaymiz
  addProduct(db, { name: "Noutbuk", price: 12000000 });
};

request.onerror = function (event) {
  console.error("Xatolik:", event.target.error);
};

// 2. Ma'lumot qo'shish funksiyasi (Tranzaksiya)
function addProduct(db, product) {
  // 'readwrite' huquqi bilan tranzaksiya ochamiz
  const transaction = db.transaction(["products"], "readwrite");
  const store = transaction.objectStore("products");
  
  const addRequest = store.add(product);
  
  addRequest.onsuccess = function () {
    console.log("Mahsulot qo'shildi, ID:", addRequest.result);
  };
  
  transaction.oncomplete = function () {
    console.log("Tranzaksiya muvaffaqiyatli yakunlandi.");
  };
}
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Cookie Atributlari va Xavfsizlik Qalqoni
Cookie yozilganda brauzer quyidagi sarlavhalarga (headers) e'tibor qaratadi:
* **HttpOnly:** Ushbu bayroq qo'yilsa, JavaScript-dagi `document.cookie` orqali uni o'qib bo'lmaydi. Bu XSS (Cross-Site Scripting) hujumlarida tokenlarni o'g'irlashdan saqlaydi.
* **Secure:** Faqat HTTPS (shifrlangan) tarmoq orqali uzatiladi.
* **SameSite:**
  * `Strict`: Uchinchi tomon saytlaridan kelgan havolalarda cookie mutlaqo yuborilmaydi (eng xavfsiz).
  * `Lax`: Havola orqali boshqa saytdan kirganda yuboriladi, lekin rasmlar/iframe so'rovlarida yuborilmaydi (sukut bo'yicha standart holat).
  * `None`: Har qanday holatda ham yuboriladi (`Secure` ham yoqilgan bo'lishi shart).

### 2. IndexedDB Tranzaksiyalari (Transactions)
IndexedDB-da har qanday o'qish va yozish amali **tranzaksiya** ichida bajariladi.
* Tranzaksiyalar tranzaksiyaga tegishli amallarning hammasi muvaffaqiyatli bajarilishini ta'minlaydi (Atomicity). Agar biror qadamda xato chiqsa, tranzaksiya to'liq to'xtatiladi va baza eski holiga qaytariladi (Abort/Rollback).
* Bu ma'lumotlar butunligini (integrity) saqlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Cookies ichida maxfiy tokenlarni `HttpOnly`siz saqlash
Agar foydalanuvchining shaxsiy sessiya tokeni (JWT) `HttpOnly` flagisiz oddiy cookie-da saqlansa, bu saytga qilingan har qanday XSS hujumi tokenni osongina o'g'irlab ketishga imkon beradi.
```javascript
// XATO:
document.cookie = "sessionToken=secret123; path=/;"; // JS orqali o'qish mumkin

// TO'G'RI:
// Bu server tomonidan o'rnatilishi lozim:
// Set-Cookie: sessionToken=secret123; Path=/; Secure; HttpOnly; SameSite=Lax
```

### 2. IndexedDB-da tranzaksiyani noto'g'ri vaqtda chaqirish
`onsuccess` hodisasi yuz bermasdan oldin bazaga murojaat qilish.
```javascript
// XATO:
const req = indexedDB.open("MyDb", 1);
// db hali tayyor bo'lmasdan tranzaksiya ochish xatoga olib keladi:
const tx = req.result.transaction(["users"], "readwrite"); 

// TO'G'RI:
req.onsuccess = function(event) {
  const db = event.target.result;
  const tx = db.transaction(["users"], "readwrite");
};
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Cookie va LocalStorage o'rtasidagi farq nima?
   * **Javob:** Cookie hajmi juda kichik (~4KB) va u har bir HTTP so'rovda serverga avtomat yuboriladi. LocalStorage esa 5-10MB gacha saqlaydi va faqat brauzerda qoladi.
2. **Savol:** Cookie-larning amal qilish muddati (Expiration) qanday belgilanadi?
   * **Javob:** `Expires` (sana ko'rinishida) yoki `Max-Age` (sekundlar soni ko'rinishida) atributlari orqali belgilanadi.
3. **Savol:** `HttpOnly` atributi nima uchun kerak?
   * **Javob:** XSS hujumlari orqali JavaScript yordamida maxfiy cookielarni (masalan, sessiya tokeni) o'g'irlanishini oldini olish uchun.
4. **Savol:** IndexedDB nima va u qachon ishlatiladi?
   * **Javob:** Brauzer ichidagi katta hajmdagi murakkab NoSQL bazasi. LocalStorage sig'imi yetmaganda yoki ma'lumotlarni indekslash kerak bo'lganda ishlatiladi.

### Middle
5. **Savol:** CSRF (Cross-Site Request Forgery) nima va unga qarshi Cookie qanday himoyalana oladi?
   * **Javob:** CSRF — foydalanuvchi nomidan uning cookielaridan foydalanib ruxsatsiz so'rov yuborish. Bunga qarshi cookielarda `SameSite=Lax` yoki `SameSite=Strict` atributlarini qo'llash orqali himoyalaniladi.
6. **Savol:** IndexedDB-da `onupgradeneeded` hodisasi qachon ishga tushadi?
   * **Javob:** Baza birinchi marta yaratilayotganda yoki uning versiya raqami oshirilganda (masalan, `indexedDB.open(name, 2)`).
7. **Savol:** IndexedDB tranzaksiyalarining afzalligi nimada?
   * **Javob:** Ular atomar ishlashni ta'minlaydi. Agar ketma-ket amallardan biri xato bo'lsa, baza holati orqaga qaytariladi va ma'lumotlar buzilishi oldi olinadi.
8. **Savol:** Session Cookie va Persistent Cookie o'rtasidagi farq nima?
   * **Javob:** Session cookie-ning muddati belgilanmagan bo'ladi va u brauzer/tab yopilganda o'chadi. Persistent cookie esa belgilangan `Expires`/`Max-Age` muddati tugagunicha saqlanib qoladi.

### Senior
9. **Savol:** IndexedDB-da indekslar (Indexes) nima uchun kerak va ularni qanday yaratamiz?
   * **Javob:** Indekslar kalit bo'lmagan boshqa xususiyatlar bo'yicha (masalan, foydalanuvchining `email`i) tezkor qidiruvni amalga oshirish uchun kerak. Ular `onupgradeneeded` ichida `store.createIndex('email', 'email', { unique: true })` orqali yaratiladi.
10. **Savol:** IndexedDB tranzaksiya turlari (readonly, readwrite, versionchange) haqida gapirib bering.
    * **Javob:** `readonly` faqat o'qish uchun (parallel ishlashi mumkin); `readwrite` o'qish va yozish uchun; `versionchange` esa faqat schema o'zgartirish vaqtida (upgrade-da) avtomatik ochiladigan eng yuqori darajali tranzaksiya turi.
11. **Savol:** Katta loyihalarda IndexedDB-dan to'g'ridan-to'g'ri foydalanish qanday qiyinchiliklar tug'diradi va qanday yechimlar mavjud?
    * **Javob:** IndexedDB-ning past darajali event-based API-si murakkab kod yozishga majbur qiladi. Yechim sifatida uni Promise-ga o'ragan kutubxonalar (masalan, **idb** yoki **Dexie.js**) ishlatiladi.
12. **Savol:** Nima uchun IndexedDB-da `cursor` (kursor) ishlatiladi?
    * **Javob:** Barcha ma'lumotlarni birdaniga xotiraga yuklab yubormasdan, bazadagi yozuvlarni birma-bir o'qib chiqish va xotira (RAM) sarfini kamaytirish uchun kursor (`openCursor`) ishlatiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar `/Users/farhod/Desktop/github/js-uz/scratch/advancedWebStorage_exercises.json` faylida berilgan. Ularni ishlab ko'rib, Cookie va IndexedDB bilan amaliy ishlash malakangizni oshiring.

---

## 7. 📝 12 ta Mini Test

Test savollari `/Users/farhod/Desktop/github/js-uz/scratch/advancedWebStorage_quizzes.json` faylida joylashgan. 12 ta savoldan iborat testni yechib, darsni qay darajada o'zlashtirganingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Oflayn rejimda ishlovchi savatcha (Offline Shopping Cart)

Foydalanuvchining interneti bo'lmagan vaqtda ham savatchasidagi mahsulotlarni saqlab turish uchun IndexedDB-dan foydalanamiz. Internet ulanganda ushbu ma'lumotlar serverga sinxronizatsiya qilinadi:

```javascript
// Baza boshqaruvchi obyekt
const cartDB = {
  db: null,
  
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ShopDB", 1);
      
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore("cart", { keyPath: "productId" });
      };
      
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };
      
      request.onerror = (e) => reject(e.target.error);
    });
  },

  // Savatchaga mahsulot qo'shish
  async addToCart(product) {
    const tx = this.db.transaction("cart", "readwrite");
    const store = tx.objectStore("cart");
    await new Promise((resolve, reject) => {
      const req = store.put(product); // bor bo'lsa yangilaydi, yo'qsa qo'shadi
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  // Savatchadagi barcha mahsulotlarni olish
  async getCartItems() {
    const tx = this.db.transaction("cart", "readonly");
    const store = tx.objectStore("cart");
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
};

// Amaliy qo'llanishi:
(async () => {
  await cartDB.init();
  await cartDB.addToCart({ productId: 101, title: "Telefon", quantity: 1 });
  
  const items = await cartDB.getCartItems();
  console.log("Savatchadagi mahsulotlar:", items);
})();
```

---

## 9. 🚀 Performance va Optimization

* **Tranzaksiyalarni yoping:** Tranzaksiyalarni faqat kerakli vaqtda oching va ularni tezroq yopilishiga yo'l qo'ying. Ortiqcha vaqt ochiq qolgan tranzaksiyalar bazani qulflab qo'yishi mumkin.
* **Kursorlardan foydalaning:** Katta hajmdagi ma'lumotlar to'plamini olishda `getAll()` o'rniga `openCursor()` dan foydalanib, ma'lumotlarni oqim (stream) ko'rinishida bo'lib-bo'lib oling.

---

## 10. 📌 Cheat Sheet

| Xususiyat | Cookies | LocalStorage | IndexedDB |
| :--- | :--- | :--- | :--- |
| **Hajmi** | ~4 KB | ~5-10 MB | Brauzer diskining 50% gacha (yuzlab MB/GB) |
| **Server aloqasi** | Har bir so'rovda avtomat yuboriladi | Yuborilmaydi | Yuborilmaydi |
| **Ma'lumot turi** | Faqat satrlar (Strings) | Faqat satrlar (Strings) | Har qanday JS obyekti, Blob, fayllar |
| **API turi** | Murakkab (matn parser) | Sinxron (oddiy key-value) | Asinxron (tranzaksiyali NoSQL) |
| **Muddat** | Expires/Max-Age bilan sozlanadi | Abadiy saqlanadi | Abadiy saqlanadi |
| **Asosiy maqsad** | Sessiya ID, Tokenlar | Oddiy sozlamalar, kichik kesh | Katta oflayn ma'lumotlar, PWA ilovalar |
