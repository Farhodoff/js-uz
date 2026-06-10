## 1. 💡 Sodda Tushuntirish va Analogiya

### Promise nima?
**Promise (Va'da)** — asinxron operatsiyaning kelajakda olinadigan natijasini (muvaffaqiyatli yoki xato bilan tugashini) ifodalovchi maxsus JavaScript obyektidir. U callback funksiyalar yordamida yoziladigan murakkab asinxron kodlarni ancha soddaroq va o'qishli zanjir ko'rinishida yozish imkonini beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz do'kondan **onlayn buyurtma (masalan, telefon)** qildingiz:
* **Buyurtma berilgan lahza:** Do'kon sizga telefonni darhol bermaydi, lekin u telefonni yetkazib berish haqida **va'da (Promise)** beradi. Hozirda va'da **Kutilmoqda (Pending)** holatida.
* **Telefon muvaffaqiyatli yetib kelganda:** Va'da **Bajarildi (Fulfilled)** holatiga o'tadi. Siz telefonni olasiz (`.then()`).
* **Telefon omborda tugab qolsa yoki yo'lda yo'qolsa:** Va'da **Rad etildi (Rejected)** holatiga o'tadi. Sizga pulingiz qaytariladi yoki sababi tushuntiriladi (`.catch()`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Promise yaratish va uni tinglash)
```javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  
  if (success) {
    resolve("Muvaffaqiyatli yakunlandi!");
  } else {
    reject("Xatolik yuz berdi!");
  }
});

// Promiseni ishlatish
myPromise
  .then((data) => console.log("Natija:", data))  // resolve uchun
  .catch((error) => console.error("Xato:", error)) // reject uchun
  .finally(() => console.log("Amal tugadi."));     // Har doim ishlaydi
```

### 2. Intermediate Example (Promise Chaining - Zanjir hosil qilish)
Bitta asinxron operatsiya natijasini keyingisiga uzatish:
```javascript
function getUserId() {
  return Promise.resolve(101); // Tayyor resolved promise
}

getUserId()
  .then((id) => {
    console.log("Foydalanuvchi ID:", id);
    return id * 2; // Keyingi .then ga qiymat qaytariladi
  })
  .then((doubledId) => {
    console.log("Ikki barobar oshirilgan ID:", doubledId);
    return Promise.resolve("Yangi ma'lumot"); // Yoki yangi Promise qaytarish
  })
  .then((msg) => {
    console.log("Xabar:", msg);
  });
```

### 3. Advanced Example (Promise Kombinatorlari - Promise.all)
Bir nechta asinxron amallarni parallel parallel boshqarish:
```javascript
const fetchUsers = () => new Promise(res => setTimeout(() => res(["Ali", "Vali"]), 1000));
const fetchPosts = () => new Promise(res => setTimeout(() => res(["Post 1", "Post 2"]), 1500));

// Ikkala so'rov parallel boshlanadi va ikkalasi ham tugagach ishlaydi
Promise.all([fetchUsers(), fetchPosts()])
  .then(([users, posts]) => {
    console.log("Foydalanuvchilar:", users);
    console.log("Postlar:", posts);
  })
  .catch((err) => {
    console.error("Biror so'rovda xato bo'ldi:", err);
  });
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Microtask Queue (Mikrovazifalar navbati)
JavaScript asinxron kodlarni boshqarishda navbatlardan foydalanadi:
1. **Macrotasks (Task Queue):** `setTimeout`, `setInterval`, DOM hodisalari.
2. **Microtasks (Job Queue):** Promise `.then()`, `.catch()`, `.finally()` va `MutationObserver`.

> [!IMPORTANT]
> **Ustuvorlik qoidasi:** Call Stack bo'shashi bilan Event Loop birinchi navbatda **Microtask Queue** ichidagi barcha vazifalarni bajarib bo'ladi, shundan keyingina **Macrotask Queue**ga o'tadi.

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("Promise (Microtask)"));

console.log("End");

// Natija tartibi:
// 1. Start
// 2. End
// 3. Promise (Microtask)
// 4. Timeout (Macrotask)
```

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Promisification (Callbackni Promise-ga o'tkazish)
Eski callback ko'rinishidagi `setTimeout`ni zamonaviy Promise shakliga o'tkazamiz.

```javascript
// 1. Kechikish hosil qiluvchi dynamic promise funksiyasi
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Kutish tugadi: ${ms} ms`);
    }, ms);
  });
}

// 2. Undan zanjir sifatida foydalanamiz
console.log("Kutish boshlandi...");

wait(1000)
  .then((res) => {
    console.log(res); // "Kutish tugadi: 1000 ms"
    return wait(2000); // Yana 2 soniya kutamiz
  })
  .then((res) => {
    console.log(res); // "Kutish tugadi: 2000 ms"
    console.log("Barcha jarayon muvaffaqiyatli tugadi!");
  });
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Promise zanjirida `return` qilishni unutish
Agar `.then()` ichida return yozilmasa, keyingi `.then()` ga qiymat o'tmaydi (`undefined` bo'ladi).
* **Noto'g'ri:**
  ```javascript
  Promise.resolve(5)
    .then(val => { val * 2 }) // return yo'q
    .then(res => console.log(res)); // undefined chiqadi
  ```
* **To'g'ri:**
  ```javascript
  Promise.resolve(5)
    .then(val => val * 2) // Qavssiz arrow funksiya avtomatik return qiladi
    .then(res => console.log(res)); // 10 chiqadi
  ```

### 2. Xatolarni ushlamaslik (Unhandled Promise Rejection)
Agarda Promise rad etilsa va uning `.catch()` handlerlari yozilmagan bo'lsa, dasturda jiddiy xato yuz beradi.
* **Tuzatish:** Har doim Promise zanjiri oxiriga `.catch()` qo'shishni unutmang.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xususiyat | Tavsifi | Misol |
| :--- | :--- | :--- |
| **`new Promise((res, rej) => {})`** | Yangi va'da (Promise) yaratish | `new Promise(res => res(1))` |
| **`.then(successCb)`** | Resolve bo'lganda natijani olish | `.then(val => console.log(val))` |
| **`.catch(errorCb)`** | Reject yoki xatoliklarni tutish | `.catch(err => console.log(err))` |
| **`Promise.all([...])`** | Parallel bajarish (bittasi xato bo'lsa hammasi rad etiladi) | `Promise.all([p1, p2])` |
| **`Promise.allSettled([...])`** | Barcha promislar holati tugashini kutadi (xato bo'lsa ham) | `Promise.allSettled([p1, p2])` |
| **`Promise.race([...])`** | Poyga: birinchi bo'lib tugagani qaytadi | `Promise.race([p1, p2])` |
| **`Promise.any([...])`** | Birinchi muvaffaqiyatli resolved promisni qaytaradi | `Promise.any([p1, p2])` |

---

## 7. ❓ Savollar va Javoblar

### 1. Promise va oddiy Callback farqi nimada?
Callback funksiya boshqa kodga parametr sifatida beriladi va boshqaruv uchinchi tomonga topshiriladi. Promise esa asinxron operatsiya natijasini obyekt sifatida qaytaradi va biz uning ustidan to'liq nazoratga ega bo'lamiz (boshqaruv bizda qoladi).

### 2. resolved bo'lgan Promisega `.then()` ulansa nima bo'ladi?
Promise holati allaqachon bajarilgan bo'lsa ham, `.then()` ulanishi bilanoq uning ichidagi handler Microtask Queue-ga qo'shiladi va asinxron tarzda qiymatni oladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `Promise.all` va `Promise.allSettled` metodlarining asosiy farqi nimada?
2. Microtask Queue va Macrotask Queue navbatlarining qaysi biri birinchi bajariladi?
3. Nima uchun Promise holati bir marta o'zgargandan keyin qayta o'zgarmas (immutable) bo'ladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Promises (Va'dalar) va asinxron zanjirlar bo'yicha ko'nikmalaringizni tekshiring.
