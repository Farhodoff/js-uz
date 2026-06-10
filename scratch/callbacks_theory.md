## 1. 💡 Sodda Tushuntirish va Analogiya

### Callback va Asinxronlik nima?
* **Callback funksiya:** Boshqa funksiyaga argument (parametr) sifatida uzatiladigan va ma'lum bir hodisa sodir bo'lgandan yoki biror amal bajarilgandan keyin chaqiriladigan funksiyadir.
* **Asinxronlik:** Dasturning biror vaqt talab qiladigan vazifa (masalan, internetdan ma'lumot yuklash) tugashini kutmasdan, keyingi kodlarni bajarishni davom ettirish xususiyatidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranga borib taom buyurtma qildingiz**:
* **Sinxron usul:** Siz buyurtmani berasiz va taom tayyor bo'lmaguncha kassa oldida kutib turasiz. Orqangizdagi navbatdagilar ham siz tufayli kutaveradi (dastur bloklanadi).
* **Asinxron va Callback usuli:** Siz buyurtmani berasiz va kassir sizga **pager (qo'ng'iroqcha)** berib, stolga o'tirishingizni aytadi. Siz bemalol telefoningizni titib o'tiraverasiz (bloklanmagan asinxron harakat). Taom tayyor bo'lganda, pager chalinsa (callback chaqiriladi), borib taomni olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sinxron Callback)
Hech qanday kutishlarsiz, massiv metodlarida darhol ishlaydigan callback:
```javascript
const numbers = [1, 2, 3];

// map metodiga callback funksiya uzatilmoqda
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6]
```

### 2. Intermediate Example (Asinxron Callback - setTimeout)
Vaqt o'tgandan keyin ishga tushuvchi callback:
```javascript
console.log("Buyurtma berildi...");

// 2 soniyadan keyin ishlovchi asinxron callback
setTimeout(() => {
  console.log("Taom tayyor bo'ldi! (Callback ishga tushdi)");
}, 2000);

console.log("Do'stlar bilan suhbat davom etmoqda...");
// Natija tartibi:
// 1. Buyurtma berildi...
// 2. Do'stlar bilan suhbat davom etmoqda...
// 3. (2 soniyadan keyin) Taom tayyor bo'ldi!
```

### 3. Advanced Example (Callback Hell / Pyramid of Doom)
Bir asinxron operatsiya ikkinchisiga bog'liq bo'lsa, kod bir-birining ichiga kirib ketadi:
```javascript
getUser(1, (user) => {
  console.log("Foydalanuvchi:", user.name);
  getPosts(user.id, (posts) => {
    console.log("Postlar olindi:", posts);
    getComments(posts[0].id, (comments) => {
      console.log("Izohlar:", comments);
      // Va hokazo... kod o'ng tomonga qarab surilib ketadi (Callback Hell)
    });
  });
});
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Event Loop va Web APIs
JavaScript **Single-Threaded** (bir oqimli) til bo'lib, bir vaqtning o'zida faqat bitta vazifani bajara oladi. Asinxron operatsiyalar quyidagicha boshqariladi:
1. **Call Stack:** Kod bajarilayotgan joy. Asinxron funksiya (masalan, `setTimeout`) stack-ga tushadi va darhol brauzerga (Web API) topshirilib, stack-dan chiqib ketadi.
2. **Web APIs:** Brauzer orqa fonda taymerni hisoblaydi yoki tarmoq so'rovini bajaradi.
3. **Callback Queue (Task Queue):** Taymer tugagach yoki so'rov javobi kelgach, callback funksiyasi navbatga (Queue) yuboriladi.
4. **Event Loop:** Stack butunlay bo'shaganligini tekshiradi. Agar stack bo'sh bo'lsa, Callback Queue-dagi birinchi callbackni olib, bajarish uchun Stack-ga yuklaydi.

> [!WARNING]
> Agar sinxron kodda cheksiz sikl yoki og'ir operatsiya bajarilsa, Call Stack bo'shamaydi va asinxron callbacklar xizmat navbatida abadiy qolib ketadi (sahifa qotib qoladi).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi ma'lumotlarini bazadan olish simulyatsiyasi
Keling, bazadan asinxron tarzda ma'lumot oluvchi va natijani callback orqali qaytaruvchi dasturcha yozamiz.

```javascript
// 1. Asinxron tarzda foydalanuvchini oluvchi funksiya
function fetchUserFromDB(userId, callback) {
  console.log("Ma'lumotlar bazasiga so'rov yuborildi...");
  
  setTimeout(() => {
    const mockUser = { id: userId, name: "Farhod", role: "Admin" };
    // Muvaffaqiyatli yakunlangach callback chaqiriladi va ma'lumot uzatiladi
    callback(mockUser);
  }, 1500);
}

// 2. Callback funksiya sifatida ishlatiladigan qism
const displayUser = (user) => {
  console.log(`Foydalanuvchi olindi: ${user.name}, Roli: ${user.role}`);
};

// 3. Funksiyani ishga tushiramiz
fetchUserFromDB(101, displayUser);
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Callback funksiyani uzatish o'rniga chaqirib yuborish
* **Noto'g'ri:**
  ```javascript
  // Funksiya zudlik bilan ishga tushib ketadi, setTimeout esa uning natijasini kutadi
  setTimeout(sayHello(), 1000); 
  ```
* **To'g'ri:**
  ```javascript
  // Funksiya reference-i uzatiladi, u 1 soniyadan keyin chaqiriladi
  setTimeout(sayHello, 1000);
  
  // Yoki arrow funksiya ichida chaqirish:
  setTimeout(() => sayHello(), 1000);
  ```

### 2. Yo'qolgan `this` konteksti (Loss of 'this')
Obyekt metodini callback sifatida boshqa joyga berib yuborganda `this` yo'qoladi.
* **Noto'g'ri:**
  ```javascript
  const user = {
    name: "Sardor",
    greet() { console.log(`Salom, ${this.name}`); }
  };
  setTimeout(user.greet, 1000); // "Salom, undefined" chiqadi
  ```
* **To'g'ri:**
  ```javascript
  // bind yordamida context-ni yopishtirib uzatamiz
  setTimeout(user.greet.bind(user), 1000); 
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tushuncha | Nima uchun kerak | Misol |
| :--- | :--- | :--- |
| **Sinxron Callback** | Massivlarni qayta ishlash, tartiblash | `arr.forEach(item => console.log(item))` |
| **Asinxron Callback** | Vaqtinchalik kechikishlar, tarmoq so'rovlari | `setTimeout(cb, 1000)` |
| **Callback Hell** | Ketma-ket asinxron operatsiyalarni bog'lash | `step1(x, () => step2(y, () => step3(z)))` |
| **Event Loop** | Asinxron vazifalarni Stack-ga olib kelish | Call Stack bo'shaganda Callbacklarni navbatdan oladi |

---

## 7. ❓ Savollar va Javoblar

### 1. Callback funksiyaning oddiy funksiyadan farqi nimada?
Aslida hech qanday farqi yo'q. Istalgan funksiya boshqasiga parametr sifatida berilsa, u callback nomini oladi.

### 2. Callback Hell muammosini qanday hal qilish mumkin?
Uni Promises (Va'dalar) yoki `async/await` sintaksisi orqali chiroyli va o'qishli ko'rinishga keltirish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `setTimeout(() => console.log("A"), 0)` va `console.log("B")` kodlaridan qaysi biri birinchi bajariladi va nima uchun? (B, chunki stack bo'shamaguncha A navbatda kutadi).
2. Callback funksiya nima uchun "Inversion of Control" (Boshqaruvni yo'qotish) muammosiga sabab bo'lishi mumkin?
3. Sinxron va asinxron callbacklarning xotirada ishlash farqi nimada?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Callbacks va asinxron JavaScript asoslari bo'yicha ko'nikmalaringizni tekshiring.
