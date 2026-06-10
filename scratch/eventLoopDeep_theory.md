## 1. 💡 Sodda Tushuntirish va Analogiya

### Microtasks va Macrotasks nima?
Event Loop ishlashini sodda tushunganimizdan so'ng, asinxron vazifalar ham o'z ichida ikki xil turga bo'linishini bilishimiz lozim:
1. **Macrotask (yoki shunchaki Task):** Bu brauzer yoki Node.js tomonidan rejalashtiriladigan yirikroq asinxron vazifalar (masalan: `setTimeout`, `setInterval`, I/O operatsiyalari, foydalanuvchi kliklari).
2. **Microtask (yoki Job):** Bular to'g'ridan-to'g'ri JavaScript kodi ichidan kelib chiquvchi, o'ta yuqori ustuvorlikka ega bo'lgan kichik vazifalar (masalan: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`).

### Real hayotiy analogiya
Tasavvur qiling, siz **bank kassirisiz**:
* **Macrotasks (Tashqaridagi navbat):** Bank eshigi oldida turgan mijozlar. Ularning har biri bittadan kelib, o'z pul amallarini bajaradi (bitta macrotask).
* **Microtasks (Kassa oldidagi shoshilinch ishlar):** Birinchi mijoz kassaga keldi (macrotask boshlandi). U pulini o'tkazdi va kassirdan kvitansiyani muhrlab berishni so'radi. Kassir mijozga javob berayotganida, mijoz: "Voy, shoshilmang, yana bitta to'lovim bor edi, shuni ham qo'shib yubora olasizmi?" dedi (microtask yaratildi). Kassir navbatdagi tashqaridagi mijozni chaqirishdan oldin, kassa oldida turgan joriy mijozning barcha qo'shimcha mayda iltimoslarini (barcha microtask-larni) bajarib bo'lishi shart.
* **Rendering (Hujjatlarni tartiblash):** Kassa oldida hech kim qolmaganidan so'ng (stack va microtask-lar bo'shagach), kassir stolidagi qog'ozlarni tartiblab joyiga qo'yadi (UI chiziladi). Keyin navbatdagi tashqaridagi mijoz chaqiriladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Ustuvorlikni solishtirish)
```javascript
console.log("1. Sinxron");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("4. Sinxron tugadi");

// Natija:
// 1. Sinxron
// 4. Sinxron tugadi
// 3. Microtask (Promise)
// 2. Macrotask (setTimeout)
```

### 2. Intermediate Example (queueMicrotask ishlatilishi)
`queueMicrotask` yordamida Promise yaratmasdan kodni microtask-ga qo'shish:
```javascript
console.log("Start");

queueMicrotask(() => {
  console.log("Microtask 1");
  queueMicrotask(() => {
    console.log("Ichki Microtask 1.1");
  });
});

setTimeout(() => {
  console.log("Macrotask (setTimeout)");
}, 0);

console.log("End");

// Natija:
// Start
// End
// Microtask 1
// Ichki Microtask 1.1 (Macrotask-dan oldin bajariladi, chunki u ham microtask zanjiri)
// Macrotask (setTimeout)
```

### 3. Advanced Example (Promise konstruktori va Await ketma-ketligi)
```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

async function asyncFn() {
  console.log("3");
  await Promise.resolve(); // Await-dan keyingi barcha kodlar microtask-ga aylanadi
  console.log("4");
}

new Promise((resolve) => {
  console.log("5"); // Promise executor sinxron ishlaydi
  resolve();
}).then(() => {
  console.log("6");
});

asyncFn();

console.log("7");

// Bajarilish tartibi:
// 1. console.log("1") -> Ekranga: 1
// 2. setTimeout -> Web API orqali Macrotask queue-ga.
// 3. new Promise executor ishlaydi -> Ekranga: 5. `.then()` callback-i Microtask queue-ga [6].
// 4. asyncFn() chaqiriladi -> Ekranga: 3. Await-dan keyingi kod Microtask queue-ga [6, 4].
// 5. console.log("7") -> Ekranga: 7
// 6. Sinxron oqim tugadi. Stack bo'sh. Microtask-lar navbati bajariladi:
//    - Birinchi microtask [6] -> Ekranga: 6
//    - Ikkinchi microtask [4] -> Ekranga: 4
// 7. Microtask navbati bo'shadi. Keyingi macrotask [2] bajariladi -> Ekranga: 2
// Yakuniy Natija: 1, 5, 3, 7, 6, 4, 2
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Harakatlar tartibini kafolatlash:** Ba'zida bizga ma'lum bir kod sinxron koddan keyin, lekin sahifa qayta chizilishidan va yangi kliklar eshitilishidan oldin ishlashi shart bo'ladi. Microtask-lar bunga 100% kafolat beradi.
* **UI Barqarorligi:** Agar biz asinxron vazifani macrotask (masalan `setTimeout`) orqali bajarsak, brauzer oraliqda sahifani qayta chizib yuborishi mumkin. Bu ekranda elementlarning "miltillab" (flickering) ko'rinishiga olib keladi. Microtask-da bajarilgan o'zgarishlar esa vizual renderdan oldin yakunlanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `new Promise()` ichidagi kod asinxron ishlaydi deb o'ylash
#### Xato:
```javascript
new Promise((resolve) => {
  heavyComputation(); // Bu baribir sinxron va oqimni bloklaydi!
  resolve();
});
```
#### To'g'ri tushuncha:
Promise faqat `.then()`/`.catch()` chaqirilgandagina asinxron microtask yaratadi, uning konstruktori esa sinxron bajariladi.

### 2. Microtask-larda cheksiz rekursiya yaratish (Starvation)
#### Muammo:
```javascript
function run() {
  Promise.resolve().then(run); // Cheksiz microtask zanjiri
}
```
Bu kod brauzer sahifasini butunlay muzlatib qo'yadi. Chunki microtask navbati hech qachon bo'shamaydi va Event Loop macrotask-larga yoki Render-ga o'ta olmaydi. `setTimeout` bilan qilingan cheksiz chaqiruvda esa bunday bo'lmaydi, chunki u har safar yangi macrotask bo'lib navbat oxiriga tushadi va oraliqda render ishlashiga yo'l qo'yadi.

### 3. Microtask va Macrotask navbatlarini chalkashtirib yuborish
#### Muammo:
Ularning ustuvorligini farqlay olmaslik oqibatida ma'lumotlar bazasiga so'rovlar yoki interfeys o'zgarishlari noto'g'ri ketma-ketlikda ishlab ketadi.

### 4. Await-dan keyingi kodning bajarilish joyini tushunmaslik
#### Xato:
```javascript
async function foo() {
  console.log("A");
  await bar();
  console.log("B"); // Bu qism microtask ekanini bilmaslik
}
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Microtask va Macrotask o'rtasidagi asosiy farq nima?
   * **Javob:** Microtask-lar oliy ustuvorlikka ega bo'lib, har qanday macrotask-dan oldin bajariladi. Macrotask-lar esa har bir Event Loop aylanishida (tick) faqat bittadan bajariladi.
2. **Savol:** Qaysi asinxron operatsiyalar Microtask hisoblanadi?
   * **Javob:** Promise `.then()/.catch()/.finally()` callback-lari, `queueMicrotask()` va `MutationObserver`.
3. **Savol:** Qaysi operatsiyalar Macrotask hisoblanadi?
   * **Javob:** `setTimeout`, `setInterval`, `setImmediate` (Node.js da), I/O (fayl/tarmoq amallari) va foydalanuvchi interfeysi hodisalari (click, keydown).
4. **Savol:** Job Queue nima?
   * **Javob:** Bu ECMA standarti bo'yicha Microtask Queue-ga berilgan rasmiy nomdir.

### Middle (5–8)
5. **Savol:** Event Loop bitta aylanishida (tick) nechta macrotask va nechta microtask bajara oladi?
   * **Javob:** Event Loop har bir aylanishida faqat **bitta** macrotask-ni bajaradi (agar u navbatda bo'lsa), shundan so'ng navbatda turgan **barcha** microtask-larni oxirigacha bajarib bo'shatadi.
6. **Savol:** `queueMicrotask` nima va u qachon ishlatiladi?
   * **Javob:** Bu funksiyani microtask navbatiga to'g'ridan-to'g'ri qo'shish uchun ishlatiladi. Promise yozish shart bo'lmagan, lekin microtask ustuvorligi kerak bo'lgan holatlarda qulay.
7. **Savol:** Nima uchun cheksiz `setTimeout` zanjiri sahifani qotirmaydi, lekin cheksiz `Promise.then` zanjiri sahifani qotiradi?
   * **Javob:** `setTimeout` har safar yangi macrotask yaratib navbat oxiriga qo'yiladi. Event Loop har bir macrotask orasida renderlash imkoniga ega bo'ladi. `Promise.then` esa joriy microtask navbati ichida qayta-qayta yangi microtask yarataveradi va stack hech qachon renderlash bosqichiga o'ta olmaydi.
8. **Savol:** `requestAnimationFrame` (rAF) qayerda joylashadi va uning macrotask-dan farqi nima?
   * **Javob:** rAF rendering bosqichidan oldin ishlaydigan alohida navbat hisoblanadi. U brauzer ekran yangilanishi (odatda 60Hz da 16.6ms) bilan sinxron ishlaydi, oddiy macrotask-lar esa bunga bog'liq bo'lmagan tezlikda bajarilaveradi.

### Senior (9–12)
9. **Savol:** Event Loop tsiklida rendering (UI update) qaysi nuqtada sodir bo'ladi?
   * **Javob:** Call Stack bo'shagach va Microtask Queue butunlay bo'shatilganidan keyin, keyingi macrotask-ga o'tishdan oldin rendering (Render Queue) amalga oshadi.
10. **Savol:** Node.js da `process.nextTick` va `setImmediate` Event Loop-da qanday farq qiladi?
    * **Javob:** `process.nextTick` eng yuqori ustuvorlikka ega microtask bo'lib, oddiy Promiselardan ham oldin ishlaydi. `setImmediate` esa macrotask bo'lib, Event Loop-ning 'check' fazasida (poll fazasi tugagach) bajariladi.
11. **Savol:** Veb-sahifadagi klik hodisasi (click event) ham macrotask-mi? Uni JS orqali trigger qilish bilan foydalanuvchi bosishi farq qiladimi?
    * **Javob:** Ha, haqiqiy foydalanuvchi kliki — bu macrotask. Agar ikkita listener bo'lsa va ularda microtasklar bo'lsa, foydalanuvchi bosganda listenerlar orasida microtasklar bajariladi. Lekin `.click()` deb dasturiy chaqirilsa, u sinxron chaqiruvga aylanadi va stack bo'shamasdan ikkala listener ketma-ket ishlaydi.
12. **Savol:** `MutationObserver` nima va u nega microtask tarkibiga kiritilgan?
    * **Javob:** U DOM daraxtidagi o'zgarishlarni kuzatish uchun ishlatiladi. DOM o'zgarishi bilan unga javob qaytarish brauzer sahifani render qilishidan oldin yakunlanishi shart bo'lgani uchun u microtask sifatida ishlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv platforma orqali amalga oshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi bilimni sinovchi testlar.

---

## 8. 🎯 Real Project Case Study

### Keshlanadigan ma'lumotlarni asinxron tartibda qaytarish kafolati
Loyihada foydalanuvchi ma'lumotlarini serverdan tortuvchi yoki keshdan oluvchi funksiya bor. Agar ma'lumot keshda bo'lsa, u sinxron javob beradi. Agar keshda bo'lmasa, serverdan asinxron (fetch) oladi. Bu kod ishlash tartibini chalkashtirib yuboradi. Biz barcha holatda asinxron (microtask) tartibni saqlashimiz kerak.

#### Muammo (Sinxron va Asinxron aralashishi):
```javascript
const cache = new Map();

function getUserData(id, callback) {
  if (cache.has(id)) {
    // Keshdan olinganda sinxron ishlaydi!
    callback(cache.get(id));
  } else {
    // Serverdan olinganda asinxron ishlaydi!
    fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        cache.set(id, data);
        callback(data);
      });
  }
}
```

#### Yechim (queueMicrotask yordamida izchillikni saqlash):
```javascript
function getUserDataSafe(id, callback) {
  if (cache.has(id)) {
    // Keshda bo'lsa ham kodni microtask-ga o'tkazib, asinxronlikni kafolatlaymiz
    queueMicrotask(() => {
      callback(cache.get(id));
    });
  } else {
    fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        cache.set(id, data);
        callback(data);
      });
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **Rendering bloklanishining oldini olish:** Vizual o'zgarishlar bilan ishlaydigan asinxron amallarni microtask-da emas, balki `requestAnimationFrame` ichida yozish lozim. Bu animatsiyalar qotishini va ortiqcha CPU yuklamasini kamaytiradi.
* **Microtask hajmini nazorat qilish:** Microtask ichida og'ir tsikllardan foydalanmang, aks holda sahifa render bo'la olmay (UI block) qolib ketadi.

---

## 10. 📌 Cheat Sheet

| Navbat Turi | Bajarilish ustuvorligi | Tegishli API / Amallar | Cheksiz zanjir ta'siri |
| :--- | :--- | :--- | :--- |
| **Sinxron Kod** | 1-o'rin (Stack) | Asosiy kod oqimi | Sahifani bloklaydi |
| **Microtasks** | 2-o'rin (Job Queue) | `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver` | Sahifani butunlay muzlatadi (Starvation) |
| **UI Rendering**| 3-o'rin (Render phase) | Layout, Paint, `requestAnimationFrame` | Sahifada tasvir yangilanishi |
| **Macrotasks** | 4-o'rin (Task Queue) | `setTimeout`, `setInterval`, I/O, DOM Events | Sahifani qotirmaydi (har doim oraliqda renderga yo'l beradi) |
