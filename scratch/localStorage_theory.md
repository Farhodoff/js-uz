## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Storage API nima?
Brauzer foydalanuvchiga tegishli ma'lumotlarni (masalan, sozlamalar, tanlangan mahsulotlar, til yoki ekran rejimini) foydalanuvchi kompyuterida saqlab qolishi uchun **Web Storage API**-dan foydalaniladi. U ikki xil saqlagichni taqdim etadi:
* **localStorage:** Ma'lumotlar brauzer yopilganda ham, kompyuter o'chib yongan bo'lsa ham abadiy saqlanadi (dasturchi yoki foydalanuvchi qo'lda o'chirib yubormaguncha).
* **sessionStorage:** Ma'lumotlar faqat joriy sahifa oynasi (tab) ochiq turganda saqlanadi. Oyna yopilishi bilan ma'lumotlar o'chib ketadi.

### Real hayotiy analogiya
* **localStorage (Shaxsiy daftar):** Siz o'zingizning shaxsiy daftaringizga qaydlar yozasiz. Uyquga ketib uyg'onsangiz ham, daftarni javonga qo'yib 1 yildan keyin ochsangiz ham yozuvlar joyida turadi.
* **sessionStorage (Mehmonxona shkafi):** Mehmonxonaga joylashganingizda narsalaringizni shkafga qo'yasiz. Mehmonxonani tark etib (check-out) xonani topshirganingizdan so'ng, shkaf ichi butunlay tozalanadi (kelgusi safar kelganingizda u bo'sh bo'ladi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Matnli ma'lumot saqlash va o'qish)
localStorage-ga ma'lumot yozish, o'qish va o'chirish:
```javascript
// 1. Kalit-qiymat juftligini yozish
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'uz');

// 2. Qiymatni kalit orqali o'qish
const currentTheme = localStorage.getItem('theme');
console.log(currentTheme); // "dark"

// 3. Alohida kalitni o'chirish
localStorage.removeItem('language');

// 4. Barcha ma'lumotlarni tozalash
localStorage.clear();
```

### 2. Intermediate Example (Obyektlar va Massivlarni saqlash)
Web Storage faqat **satr (string)** turidagi ma'lumotlarni saqlay oladi. Obyektlarni saqlash uchun ularni JSON formatiga o'girish kerak:
```javascript
const user = {
  id: 1,
  name: "Farhod",
  roles: ["admin", "editor"]
};

// Noto'g'ri:
// localStorage.setItem('currentUser', user); // Brauzerda "[object Object]" bo'lib qoladi

// To'g'ri usul:
// 1. JSON.stringify orqali stringga aylantirib yozamiz
localStorage.setItem('currentUser', JSON.stringify(user));

// 2. O'qishda esa JSON.parse yordamida qaytadan obyektga o'giramiz
const storedData = localStorage.getItem('currentUser');
if (storedData) {
  const parsedUser = JSON.parse(storedData);
  console.log(parsedUser.name); // "Farhod"
}
```

### 3. Advanced Example (Barcha kalitlarni aylanib chiqish va storage hodisasi)
Storage ichidagi barcha elementlarni indeks bo'yicha olish:
```javascript
function listAllStorageItems() {
  console.log(`Jami elementlar soni: ${localStorage.length}`);
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
}

// Boshqa oyna yoki tabda ma'lumot o'zgarganini eshitish (cross-tab event listener)
window.addEventListener('storage', (event) => {
  console.log('Ma'lumot o'zgardi!');
  console.log('Kalit:', event.key);
  console.log('Eski qiymat:', event.oldValue);
  console.log('Yangi qiymat:', event.newValue);
  console.log('Qaysi sahifada:', event.url);
});
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Holatni saqlash (State Persistence):** Foydalanuvchi sahifani yangilaganda (F5 yoki reload) barcha JS o'zgaruvchilari nolga aylanadi. Web Storage yordamida muhim holat ma'lumotlarini saqlab qolish mumkin.
* **Katta sig'im (~5MB):** Eski Cookie (kuki) texnologiyasi har bir sahifa so'rovida serverga ma'lumot jo'natardi va uning hajmi juda kichik (faqat 4KB) edi. Web Storage ma'lumotlarni faqat brauzerda lokal saqlaydi va uning hajmi ancha katta (~5MB gacha).
* **Tarmoq trafigini tejash:** Serverga har gal yuklashni kamaytirib, foydalanuvchining lokal qurilmasidan ma'lumot olish orqali ilova tezligini oshiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Obyektlarni to'g'ridan-to'g'ri yozib ketish
#### Xato:
`localStorage.setItem('profile', { id: 1 });` // O'qilganda "[object Object]" matni keladi.
#### Tuzatish:
`localStorage.setItem('profile', JSON.stringify({ id: 1 }));`

### 2. Maxfiy tokenlar va parollarni saqlash
#### Xato:
localStorage-ga foydalanuvchi parolini yoki muhim shaxsiy ma'lumotlarni saqlash.
*Tushuntirish:* localStorage ichidagi ma'lumotlarni sahifada ishlayotgan har qanday uchinchi tomon JavaScript kodi (masalan, XSS hujumi yoki zararli kutubxona orqali) osongina o'qib olishi mumkin. Maxfiy tokenlar uchun `HttpOnly` kuki fayllaridan foydalanish tavsiya etiladi.

### 3. QuotaExceededError xatoligini inobatga olmaslik
#### Xato:
localStorage limiti (~5MB) to'lib qolganda yoki xususiy rejimda (Incognito) saqlash taqiqlanganda dastur qulashi mumkin.
#### Tuzatish:
```javascript
try {
  localStorage.setItem('large_data', dataString);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.warn("Storage limiti to'lib ketdi!");
  }
}
```

### 4. Storage API sinxron ekanligini unutish
Web Storage operatsiyalari **sinxrondir**. Agar siz localStorage-ga juda katta hajmli matnni yoki JSON-ni qayta-qayta yozsangiz/o'qisangiz, bu brauzerning asosiy oqimini (Main Thread) bloklaydi va foydalanuvchi interfeysi qotib qoladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** `localStorage` va `sessionStorage` o'rtasidagi asosiy farq nima?
   * **Javob:** `localStorage`-dagi ma'lumotlar abadiy saqlanadi, `sessionStorage`-da esa faqat joriy oyna/tab ochiq turguncha saqlanadi.
2. **Savol:** Web Storage-da qanday turdagi ma'lumotlarni saqlash mumkin?
   * **Javob:** Faqat matnli (string) ma'lumotlarni. Murakkab tiplarni (obyekt, massiv) avval JSON formatiga o'tkazish lozim.
3. **Savol:** LocalStorage-da ma'lumot saqlash limiti taxminan qancha?
   * **Javob:** Ko'pchilik brauzerlarda har bir domen (origin) uchun taxminan 5 megabayt (5MB).
4. **Savol:** Ma'lumotni storage-dan qanday to'liq o'chirib tashlash mumkin?
   * **Javob:** Bitta elementni o'chirish uchun `removeItem(key)`, barcha elementlarni tozalash uchun `clear()` metodi chaqiriladi.

### Middle (5–8)
5. **Savol:** Nima uchun cookies o'rniga localStorage ishlatiladi?
   * **Javob:** Cookies limiti juda kichik (4KB) va u har bir HTTP so'rov bilan birga serverga yuborilib, tarmoqni band qiladi. LocalStorage esa 5MB gacha sig'imga ega va faqat brauzerda lokal saqlanadi.
6. **Savol:** `storage` hodisasi (event) nima va u qachon ishga tushadi?
   * **Javob:** Bir domendagi boshqa oyna yoki tablarda localStorage o'zgarganda ishga tushadigan hodisadir. U o'zgarishni amalga oshirgan joriy tabning o'zida ishlamaydi, faqat boshqa parallel ochiq tablarda ishlaydi.
7. **Savol:** Nega localStorage-ga foydalanuvchining session JWT tokenini saqlash xavfli hisoblanadi?
   * **Javob:** Chunki localStorage JavaScript orqali ochiq o'qiladi. Agar saytda XSS (Cross-Site Scripting) zaifligi bo'lsa, tajovuzkor tokenlarni osongina o'g'irlab oladi.
8. **Savol:** Brauzer inkognito (Private) rejimida bo'lganda localStorage qanday ishlaydi?
   * **Javob:** Aksar zamonaviy brauzerlar inkognito rejimida storage uchun vaqtinchalik xotira ajratadi va yopilganda o'chirib yuboradi, ba'zi eski brauzerlar esa unga yozmoqchi bo'lganda xatolik otadi.

### Senior (9–12)
9. **Savol:** Nima uchun Web Storage API asinxron emas? Bu qanday muammoga sabab bo'ladi?
   * **Javob:** Chunki u eski spetsifikatsiya asosida yaratilgan sinxron bloklovchi API. Katta hajmdagi ma'lumotlarni ketma-ket yozish yoki o'qish Main Thread-ni bloklab, interfeys FPS tushishiga olib kelishi mumkin. Katta hajmlar uchun IndexedDB ishlatish afzal.
10. **Savol:** LocalStorage-dagi ma'lumotlarning amal qilish muddatini (expiration date) qanday yaratish mumkin?
    * **Javob:** Buni qo'lda obyekt ichida kiritish kerak: ma'lumot bilan birga `timestamp` (yaratilgan vaqti) va `ttl` (yashash muddati) saqlanadi. Keyin getItem qilganda joriy vaqt bilan solishtirib, muddati o'tgan bo'lsa removeItem qilinadi.
11. **Savol:** `JSON.parse` va `JSON.stringify` operatsiyalari localStorage bilan ishlashda qanday performance muammolarini keltirib chiqarishi mumkin?
    * **Javob:** Katta obyektlarni har safar o'qishda va yozishda parse/stringify qilish CPU bloklanishiga olib keladi. Buni oldini olish uchun ma'lumotlarni mayda kalitlarga bo'lib saqlash yoki memory caching usulidan foydalanish zarur.
12. **Savol:** subdomain.example.com sahifasi example.com ning localStorage ma'lumotlaridan foydalana oladimi?
    * **Javob:** Yo'q. Web Storage **Same-Origin Policy** (bir xil kelib chiqish qoidasi) asosida ishlaydi. Ya'ni protokol (http/https), domen (subdomenlar ham alohida) va port mutloq bir xil bo'lishi shart.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Dark Mode / Light Mode sozlamasini brauzerda saqlash
Foydalanuvchi o'ziga ma'qul bo'lgan tema (qorong'u yoki yorug' rejim)ni tanlaganda, sahifa yangilansa ham tema saqlanib qolishi kerak.

```javascript
// 1. Temani yuklash funksiyasi
function applyTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'light';
  document.body.className = savedTheme;
  console.log(`Faollashtirilgan tema: ${savedTheme}`);
}

// 2. Temani o'zgartirish va saqlash
function toggleTheme() {
  const currentTheme = localStorage.getItem('app-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  localStorage.setItem('app-theme', newTheme);
  document.body.className = newTheme;
}

// Sahifa yuklanganda avtomatik ishlaydi
window.onload = applyTheme;
```

---

## 9. 🚀 Performance va Optimization

* **IndexedDB-ni o'rganing:** Agar saqlamoqchi bo'lgan ma'lumotingiz 5MB dan ko'p bo'lsa yoki tez-tez o'zgarib tursa, asinxron ishlovchi tranzaksiyaviy ma'lumotlar bazasi — **IndexedDB**-dan foydalaning.
* **Debouncing (Kechiktirib yozish):** Foydalanuvchi matn yozayotganda har bir harfda localStorage-ga yozish o'rniga, yozish tugagandan so'ng 500ms kutib, keyin bitta yozish operatsiyasini bajaring.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| `localStorage.setItem(key, value)` | Kalit bo'yicha qiymat yozish | `localStorage.setItem('role', 'user')` |
| `localStorage.getItem(key)` | Kalit bo'yicha qiymatni o'qish | `localStorage.getItem('role')` |
| `localStorage.removeItem(key)` | Belgilangan kalitni o'chirish | `localStorage.removeItem('role')` |
| `localStorage.clear()` | Butun storageni tozalash | `localStorage.clear()` |
| `localStorage.length` | Saqlangan elementlar soni | `console.log(localStorage.length)` |
| `localStorage.key(index)` | Indeks bo'yicha kalit nomini olish | `const firstKey = localStorage.key(0)` |
