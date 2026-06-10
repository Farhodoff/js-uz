## 1. 💡 Sodda Tushuntirish va Analogiya

### Event Loop nima?
**JavaScript** — bu **bir oqimli (single-threaded)** dasturlash tili. Bu degani, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Unda nega biz bir vaqtda ham taymerlarni ishlatamiz, ham serverdan ma'lumot yuklaymiz va sahifadagi tugmalarni bosamiz? Sahifamiz qotib qolmaydi? 
Buning siri **Event Loop (Hodisalar sikli)** mexanizmidir. Event Loop — bu JavaScript-ning bir oqimli tabiatiga qaramay, asinxron (parallel) ishlarni bajarishiga imkon beruvchi brauzer (yoki Node.js) tarkibidagi ko'prikdir.

### Real hayotiy analogiya
Tasavvur qiling, siz **oshxonadagi yagona bosh oshpazsiz** (JavaScript Call Stack):
1. **Sinxron buyurtma:** Sizga "Salat tayyorlang" deyishdi. Siz sabzavotlarni to'g'rab, salatni darhol topshirdingiz.
2. **Asinxron buyurtma:** Sizga "Tovuq pishiring" deyishdi. Tovuq duxovkada 30 daqiqa pishishi kerak. Siz duxovka yonida 30 daqiqa hech narsa qilmay qarab turmaysiz (oqimni bloklamaysiz). Siz tovuqni duxovkaga solasiz va taymer qo'yasiz (Web API-ga topshiriq berasiz).
3. **Boshqa ishlar:** Tovuq duxovkada pishguncha, siz boshqa tezkor salatlar tayyorlashda davom etasiz.
4. **Taymer jiringlashi (Event Loop faoliyati):** Duxovka taymeri jiringlaganda (Task Queue-ga vazifa kelganda), siz qo'lingizdagi salatni tugatib bo'lingach (Call Stack bo'shagach), borib tovuqni olasiz va mijozga taqdim etasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sinxron va Asinxron navbat)
```javascript
console.log("1. Boshlanishi"); // Sinxron

setTimeout(() => {
  console.log("2. Taymer bajarildi (asinxron)");
}, 0); // Vaqti 0ms bo'lsa ham asinxron

console.log("3. Tugashi"); // Sinxron

// Natija:
// 1. Boshlanishi
// 3. Tugashi
// 2. Taymer bajarildi (asinxron)
```

### 2. Intermediate Example (Stack-ni bloklovchi og'ir kod)
Sinxron og'ir kod asinxron kodlarni qanday kechiktirishini ko'ramiz:
```javascript
console.log("Start");

// 100ms dan keyin ishlashi kerak bo'lgan taymer
setTimeout(() => {
  console.log("Taymer ishladi!");
}, 100);

// Stack-ni bloklovchi 1 soniyalik sikl (og'ir ish)
const start = Date.now();
while (Date.now() - start < 1000) {
  // 1 soniya kutib turadi
}

console.log("End");

// Natija:
// Start
// (1 soniya o'tadi)
// End
// Taymer ishladi! (Garchi 100ms da tayyor bo'lsa ham, stack bo'shashini 1 soniya kutdi)
```

### 3. Advanced Example (Event Loop simulyatsiyasi)
JavaScript-da asinxronlikni boshqarish:
```javascript
function main() {
  console.log("A");
  
  setTimeout(function cb1() {
    console.log("B");
  }, 1000);
  
  setTimeout(function cb2() {
    console.log("C");
  }, 0);
  
  console.log("D");
}

main();

// Bajarilish bosqichlari:
// 1. main() stack-ga tushadi.
// 2. console.log("A") stack-ga kiradi, ekranga 'A' chiqadi va stack-dan chiqadi.
// 3. cb1 taymeri Web API-ga yuboriladi (1 soniya kutiladi).
// 4. cb2 taymeri Web API-ga yuboriladi (0 soniya kutiladi va darhol Task Queue-ga tushadi).
// 5. console.log("D") ekranga 'D' chiqaradi.
// 6. main() tugaydi va stack-dan chiqadi (Stack bo'shadi).
// 7. Event Loop stack bo'shligini ko'rib, Task Queue-dan cb2 ni olib stack-ga qo'yadi. Ekranga 'C' chiqadi.
// 8. 1 soniyadan keyin cb1 Task Queue-ga keladi, Event Loop uni stack-ga qo'yadi. Ekranga 'B' chiqadi.
// Yakuniy Natija: A, D, C, B
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Muzlab qolish (UI Blocking):** Agar Event Loop bo'lmaganda va JS faqat sinxron ishlaganda, har safar serverdan rasm yuklanganda sahifa butunlay muzlab qolar edi (tugmalar bosilmasdi, animatsiyalar to'xtardi). Web API va Event Loop yordamida brauzer og'ir ishlarni orqa fonda (background) bajaradi.
* **Resurslardan samarali foydalanish:** Ko'p oqimli tillarda (Java, C++) har bir so'rov uchun alohida oqim (thread) ochiladi. JS esa bitta oqimda Event Loop yordamida minglab asinxron so'rovlarni juda kam resurs sarflab bajara oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `setTimeout(..., 0)` zudlik bilan ishlaydi deb o'ylash
#### Xato:
Juniorlar 0ms berilgani uchun bu kod keyingi satrdan oldin ishlaydi deb o'ylashadi.
#### To'g'ri tushuncha:
Har qanday setTimeout (hatto 0ms bo'lsa ham) Web API-ga o'tadi va Task Queue orqali faqat stack bo'shagachgina ishlaydi.

### 2. Stack-ni og'ir hisob-kitoblar bilan to'ldirib qo'yish (Blocking the Event Loop)
#### Muammo:
Katta massivlarni sinxron aylanib chiqish taymerlar va klik hodisalari ishlashini to'xtatib qo'yadi.
#### To'g'ri yechim:
Og'ir ishlarni mayda bo'laklarga bo'lish yoki Web Workers (alohida fon oqimi) ishlatish.

### 3. Rekursiyada chiqish shartini yozmaslik (Stack Overflow)
#### Muammo:
`function foo() { foo(); }` stack-ni cheksiz to'ldirib, brauzerni sindiradi.

### 4. Asinxron funksiyani sinxron o'zgaruvchiga tenglash
#### Xato:
```javascript
let data = setTimeout(() => { return "ma'lumot"; }, 100);
console.log(data); // taymer ID-sini chiqaradi, ma'lumotni emas!
```
#### To'g'ri usul:
Callback, Promise yoki Async/Await ishlatish.

### 5. Web API va JS Dvigateli farqini bilmaslik
#### Muammo:
`setTimeout` yoki `fetch` JavaScript tilining o'zida bor deb o'ylash. Aslida bular brauzer (yoki Node.js) taqdim etadigan tashqi muhit API-laridir.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript bir oqimli (single-threaded) deganda nimani tushunasiz?
   * **Javob:** Bir vaqtning o'zida faqat bitta operatsiya/kod satri bajarilishini va bitta Call Stack mavjudligini anglatadi.
2. **Savol:** Call Stack nima?
   * **Javob:** Dasturdagi funksiyalar chaqiruvini va ularning bajarilish navbatini (LIFO - Last In First Out qoidasi bilan) saqlovchi xotira tuzilmasi.
3. **Savol:** Callback Queue nima?
   * **Javob:** Asinxron amallar tugagandan keyin, ularga tegishli callback funksiyalar bajarilishini kutib turadigan navbat (FIFO - First In First Out qoidasi).
4. **Savol:** JS dvigateli (Engine) va brauzer muhiti (Runtime) farqi nima?
   * **Javob:** Dvigatel (masalan V8) kodni o'qiydi va bajaradi. Brauzer muhiti esa dvigatelni o'rab turadi va qo'shimcha asboblarni (DOM, setTimeout, fetch, Event Loop) taqdim etadi.

### Middle (5–8)
5. **Savol:** `setTimeout(() => {}, 1000)` aynan 1 soniyadan keyin ishlashini kafolatlaydimi?
   * **Javob:** Yo'q. U kamida 1 soniyadan keyin Task Queue-ga o'tishini kafolatlaydi xolos. Agar o'sha paytda Call Stack-da og'ir sinxron kod ishlayotgan bo'lsa, stack bo'shaguncha taymer kutib turadi.
6. **Savol:** Nega `while(true) {}` sikli turgan kodda asinxron taymerlar hech qachon ishlamaydi?
   * **Javob:** Chunki cheksiz sikl Call Stack-ni abadiy band qiladi. Call Stack bo'shamas ekan, Event Loop navbatdagi taymerlarni stack-ga o'tkaza olmaydi.
7. **Savol:** LIFO va FIFO prinsiplari Event Loop-da qanday qo'llaniladi?
   * **Javob:** Call Stack LIFO (Last In First Out) asosida ishlaydi, Callback Queue esa FIFO (First In First Out) navbat tizimida ishlaydi.
8. **Savol:** Event Loop har bir aylanishida (tick) nima ish qiladi?
   * **Javob:** U birinchi bo'lib Call Stack-ni tekshiradi. Stack bo'sh bo'lsa, Callback Queue-dagi birinchi vazifani olib Stack-ga tashlaydi.

### Senior (9–12)
9. **Savol:** Node.js va Brauzer Event Loop arxitekturasining asosiy farqi nimada?
   * **Javob:** Brauzerda bitta asosiy Event Loop bor (HTML5 standarti). Node.js esa libuv kutubxonasiga asoslangan va Event Loop bir necha maxsus fazalardan (poll, check, close callback va hk) iborat.
10. **Savol:** UI rendering (sahifani qayta chizish) Event Loop bilan qanday bog'langan?
    * **Javob:** Brauzer odatda har 16.6ms da (60 FPS uchun) sahifani qayta chizadi (render). Render faqat Call Stack bo'sh bo'lganda va microtask-lar bajarilib bo'linganida amalga oshadi.
11. **Savol:** Agar sizda Event Loop-ni bloklamasdan juda og'ir matematik hisob-kitob bajarish topshirig'i bo'lsa, uni qanday hal qilasiz?
    * **Javob:** Web Workers yordamida ishni alohida fon oqimiga o'tkazish yoki `setTimeout` yordamida hisob-kitobni mayda qismlarga (chunks) bo'lib asinxron bajarish.
12. **Savol:** Memory Heap-dagi ma'lumotlar bilan Call Stack-dagilarning bog'liqligi qanday?
    * **Javob:** Call Stack-da primitiv qiymatlar va Heap-dagi obyektlarga havolalar (references) saqlanadi. Stack-dagi funksiya tugagach, undagi reference-lar o'chadi va Heap-dagi yetib bo'lmas obyektlar keyinchalik Garbage Collector tomonidan tozalanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod tekshiruvchi orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Sahifa muzlashini (UI Freezing) oldini olish
Foydalanuvchi katta hajmdagi ma'lumotlarni (masalan 1,000,000 ta qator) filtrlash tugmasini bosganda, sahifa qotib qolmasligi uchun Event Loop-dan unumli foydalanish.

#### Yechim (Hisob-kitobni bo'laklarga bo'lish - Chunking):
```javascript
function processLargeArray(items, processItem) {
  let index = 0;

  function doChunk() {
    const chunkSize = 1000; // Har bir tick-da 1000 ta element
    const end = Math.min(index + chunkSize, items.length);

    for (let i = index; i < end; i++) {
      processItem(items[i]);
    }

    index = end;

    if (index < items.length) {
      // Keyingi bo'lakni keyingi Event Loop tick-ga rejalashtiramiz
      // Bu orqali brauzer kadr chizishga va tugma bosishlarini eshitishga ulguradi
      setTimeout(doChunk, 0);
    } else {
      console.log("Barcha ma'lumotlar qayta ishlandi!");
    }
  }

  doChunk();
}

// Ishlatilishi:
const giantList = new Array(50000).fill(0);
processLargeArray(giantList, (item) => {
  // Har bir element ustidagi og'ir amal
});
```

---

## 9. 🚀 Performance va Optimization

* **Stack hajmini saqlash:** Rekursiv funksiyalarni asinxron zanjirga o'tkazish orqali `RangeError: Maximum call stack size exceeded` xatosidan qutulish mumkin.
* **Sinxron blokirovkani kamaytirish:** Katta JSON parse amallarini (`JSON.parse`) kichik qismlarda qilish yoki Web Worker-larga topshirish interaktivlikni (FID - First Input Delay) yaxshilaydi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Vazifasi / Qoidasi | Misol |
| :--- | :--- | :--- |
| **Call Stack** | Funksiya chaqiriqlarini LIFO qoidasida saqlash | `function a() { b() }` |
| **Web API** | Brauzer taqdim etgan parallel fon ishlari | `setTimeout`, `fetch`, `DOM Events` |
| **Task Queue** | Asinxron callback-larni navbatda saqlash | `() => console.log('Hi')` |
| **Event Loop** | Stack bo'shashini kutib, Queue-dan kod o'tkazish | Har doim ishlovchi ichki mexanizm |
| **setTimeout(fn, 0)** | Kodni darhol emas, eng kamida joriy stack tugagach bajarish | `setTimeout(cb, 0)` |
