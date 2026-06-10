## 1. 💡 Sodda Tushuntirish va Analogiya

### Closures (Yopilishlar) va Lexical Scope nima?
* **Lexical Scope (Leksik qamrov):** Bu JavaScript-da o'zgaruvchilarning kodda yozilgan joyiga qarab qamrab olinish qoidasidir. Ya'ni, ichki funksiya har doim o'zi yozilgan leksik muhit (tashqi funksiya va global qamrov) ichidagi o'zgaruvchilarga kirish huquqiga ega.
* **Closure (Yopilish):** Tashqi funksiya o'z ishini yakunlab, Call Stack-dan chiqib ketganidan keyin ham, uning ichida yaratilgan ichki funksiyaning o'sha tashqi o'zgaruvchilarni "eslab qolish" va ulardan foydalana olish qobiliyatidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **maktabni tamomladingiz**:
* **Tashqi funksiya:** Sizning maktabdagi davringiz.
* **O'zgaruvchilar:** Sizning sinfdoshlaringiz va maktabdagi xotiralar.
* **Ichki funksiya (Closure):** Siz maktabni bitirib ketganingizdan keyin ham (tashqi funksiya bajarilib bo'lgach), sizdagi **esdalik daftari** yoki xotiralaringiz. Siz uydasiz, lekin istalgan paytda daftarni ochib sinfdoshlaringiz ismlarini (tashqi o'zgaruvchilarni) o'qiy olasiz. Bu daftar siz bilan doimo yopiq holda yuradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda Yopilish)
```javascript
function greetOuter(greeting) {
  // greeting o'zgaruvchisi tashqi funksiya qamrovida
  return function greetInner(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

// greetOuter bajarilib tugadi va "Salom" so'zini yopib oldi
const sayHello = greetOuter("Salom");

sayHello("Jasur"); // "Salom, Jasur!"
sayHello("Lola");  // "Salom, Lola!"
```

### 2. Intermediate Example (Private Variables - Maxfiy ma'lumotlar)
Tashqaridan to'g'ridan-to'g'ri o'zgartirib bo'lmaydigan, faqat metodlar orqali boshqariladigan bank hisobi:
```javascript
function createBankAccount(ownerName, initialBalance) {
  let balance = initialBalance; // Tashqaridan yopiq o'zgaruvchi

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`${amount} UZS qo'shildi. Joriy balans: ${balance}`);
      }
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`${amount} UZS yechildi. Joriy balans: ${balance}`);
      } else {
        console.log("Mablag' yetarli emas!");
      }
    },
    getBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount("Farhod", 100000);
myAccount.deposit(50000); // 50000 UZS qo'shildi...
myAccount.withdraw(30000); // 30000 UZS yechildi...
console.log(myAccount.balance); // undefined (to'g'ridan-to'g'ri kirib bo'lmaydi)
console.log(myAccount.getBalance()); // 120000
```

### 3. Advanced Example (Function Currying va dynamic konfiguratsiya)
```javascript
const taxCalculator = (taxRate) => (amount) => amount * taxRate;

const calculateVAT = taxCalculator(0.12); // 12% QQS
const calculateIncomeTax = taxCalculator(0.12); // 12% daromad solig'i

console.log(calculateVAT(100000)); // 12000
console.log(calculateVAT(250000)); // 30000
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Lexical Environment va Execution Context
JavaScript-da har bir ishga tushadigan blok va funksiya o'zining **Lexical Environment (Leksik Muhit)** obyektiga ega bo'ladi. U ikki qismdan iborat:
1. **Environment Record:** Hozirgi qamrovdagi barcha lokal o'zgaruvchilar va parametrlar saqlanadigan joy.
2. **Outer Reference:** Tashqi (ota) Leksik Muhitga havola (ko'rsatkich).

Qachonki funksiya chaqirilganda, u yangi execution context yaratadi, lekin uning `[[Environment]]` deb nomlanuvchi maxfiy ichki xossasi funksiya yaratilgan joydagi Lexical Environment-ni xotirada ushlab turadi.
Tashqi funksiya tugasa ham, ichki funksiya uning Lexical Environment-iga havola (`[[Environment]]`) saqlab turgani uchun, Garbage Collector (axlat yig'uvchi) tashqi funksiyaning xotirasini tozalab yubora olmaydi.

> [!IMPORTANT]
> Closures faqat funksiya bajarilayotganda emas, balki funksiya **e'lon qilinayotgan (yaratilayotgan) vaqtda** o'zining atrof-muhitini (lexical environment) muhrlab (yopib) oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Loop ichida `var` ishlatib closures yaratish
#### Xato:
```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Konsolga uch marta "4" chiqadi.
```
#### Nima uchun:
`var` block scope-ga ega emas, shuning uchun butun loop davomida bitta `i` o'zgaruvchisi ishlatiladi. `setTimeout` callbacki ishga tushganda `i` allaqachon 4 ga teng bo'lib qoladi.
#### To'g'ri usul:
```javascript
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Konsolga "1, 2, 3" chiqadi, chunki `let` har bir iteratsiya uchun alohida lexical scope yaratadi.
```

### 2. Xotira oqishi (Memory Leak) - closures havolasini uzmaslik
#### Muammo:
Agar yopilish funksiyasi juda katta hajmdagi ma'lumotlarni saqlasa va u global o'zgaruvchida saqlanib turaversa, xotira tozalansa ham u bo'shamaydi.
#### To'g'ri usul:
Ishlatib bo'lingach havolani `null` qilish:
```javascript
let heavyFn = (function() {
  let giantData = new Array(1000000).fill("data");
  return () => console.log(giantData.length);
})();
// Ishlatib bo'lingandan keyin:
heavyFn = null; // Endi xotira Garbage Collector tomonidan tozalanadi
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Closure nima?
   * **Javob:** Ichki funksiyaning o'zi yozilgan tashqi funksiya qamrovidagi o'zgaruvchilarga kirish huquqini saqlab qolishi.
2. **Savol:** Leksik qamrov (Lexical Scope) nima?
   * **Javob:** O'zgaruvchilar qamrovining kod yozilgan vaqtidagi joylashuviga qarab belgilanishi.
3. **Savol:** Quyidagi kod nima chiqaradi? `const add = x => y => x+y; console.log(add(2)(3));`
   * **Javob:** `5` chiqadi, currying va yopilish hisobiga.
4. **Savol:** Agar funksiya o'zgaruvchini o'zida topa olmasa nima qiladi?
   * **Javob:** Outer reference (tashqi havola) orqali ota qamrovlardan qidiradi (Scope Chain).

### Middle
5. **Savol:** Yopilishlar xotiraga qanday ta'sir qiladi?
   * **Javob:** Ular o'zgaruvchilarni Garbage Collector-dan himoya qilib, xotirada ushlab turadi, bu RAM sarfini oshiradi.
6. **Savol:** Module Pattern nima va uning closures ga qanday aloqasi bor?
   * **Javob:** Bu kodni alohida qismlarga ajratib, faqat kerakli metodlarni tashqariga ochib berish va o'zgaruvchilarni closure orqali private qilish usulidir.
7. **Savol:** `let` kalit so'zi qanday qilib loop-dagi closure muammosini hal qiladi?
   * **Javob:** Har bir sikl qadami uchun alohida block scope yaratadi va har safar o'zgaruvchining yangi nusxasi closure-ga bog'lanadi.
8. **Savol:** Immediately Invoked Function Expression (IIFE) nima va nima uchun u ilgari closures uchun ishlatilgan?
   * **Javob:** U darhol ishga tushadigan funksiya bo'lib, o'zgaruvchilarni global scope-dan himoyalash va scope-ni izolyatsiya qilish uchun ishlatilgan.

### Senior
9. **Savol:** V8 dvigateli closures xotirasini optimallashtiradimi?
   * **Javob:** Ha, V8 dvigateli ichki funksiyada umuman ishlatilmagan tashqi o'zgaruvchilarni xotirada saqlamaydi va ularni lexical scope-dan olib tashlaydi.
10. **Savol:** Detached DOM element va closure o'rtasidagi bog'liqlikni tushuntiring.
    * **Javob:** Agar yopilish ichida DOM elementi o'zgaruvchiga olingan bo'lsa va keyinchalik u DOM-dan o'chirilsa ham, closure uni xotirada ushlab turadi (Memory leak).
11. **Savol:** Bir vaqtda yaratilgan bir nechta closures bitta Lexical Environment obyekti bilan ulashadimi?
    * **Javob:** Ha, bitta tashqi funksiya ichida yaratilgan barcha ichki funksiyalar aynan o'sha bitta umumiy Lexical Environment obyekti bilan ulashadi (ya'ni bitta o'zgaruvchini hammasi o'zgartira oladi).
12. **Savol:** `new Function()` sintaksisi closures yaratadimi?
    * **Javob:** Yo'q, `new Function()` orqali yaratilgan funksiyalar har doim global scope-ni o'zlarining tashqi muhiti deb hisoblaydilar, yopilgan leksik muhitni emas.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz yopilishlar yordamida hisoblagich, inkapsulyatsiya va currying kabi amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi bilimingizni sinash uchun testlar.

---

## 8. 🎯 Real Project Case Study

### API So'rovlarini Cheklovchi (Rate Limiter) Tizim
Katta loyihalarda foydalanuvchining tugmani ko'p marta bosib yuborishidan (spamming) himoya qilish uchun ma'lum vaqt oralig'ida faqat bir marta so'rov yuborish funksiyasi kerak bo'ladi (Throttle/Debounce). Buni closures yordamida yozamiz:

```javascript
function throttle(func, limit) {
  let inThrottle = false; // Holat closure-da saqlanadi
  
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Amaliy qo'llanishi:
const handleScroll = () => console.log("Sahifa skrol qilindi!");
const optimizedScroll = throttle(handleScroll, 200);

window.addEventListener('scroll', optimizedScroll);
```

---

## 9. 🚀 Performance va Optimization

* **Ehtiyotkorlik bilan foydalaning:** Agar yopilish funksiyasi ko'p marta yaratilsa, har safar yangi xotira bloki ajratiladi.
* **Ishlatib bo'lgach tozalang:** closures saqlangan global o'zgaruvchilarni vaqti-vaqti bilan `null` qilib turing.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Qisqa Tavsif | Misol |
| :--- | :--- | :--- |
| **Lexical Scope** | Kod yozilgan joyga ko'ra scope belgilanishi | Ichki funksiya tashqarisini ko'ra oladi |
| **Closure** | Tashqi o'zgaruvchilarni "eslab qolgan" funksiya | `const fn = outer(); fn();` |
| **Private variable** | Tashqaridan berkitilgan ma'lumot | `let _secret = 123;` |
| **Currying** | Parametrlarni ketma-ket qabul qilish | `add(x)(y)` |
