## 1. 💡 Sodda Tushuntirish va Analogiya

### Prototypes (Prototiplar) va Vorislik (Inheritance) nima?
* **Prototype (Prototip):** Bu JavaScript-da obyektlar o'rtasida metodlar va xossalarni ulashish uchun ishlatiladigan maxsus mexanizm (ya'ni boshqa obyektga havola). Har bir obyekt yashirin `[[Prototype]]` (ko'pincha `__proto__` deb ko'rsatiladi) xossasiga ega bo'lib, u orqali o'z ota-onasidan meros oladi.
* **Prototip zanjiri (Prototype Chain):** Agar obyektning o'zidan biron bir xossa qidirilsa va topilmasa, JavaScript uni avtomatik tarzda uning prototipidan qidirishni boshlaydi. Bu qidiruv zanjiri oxir-oqibat `null` qiymatiga yetganda to'xtaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **uy qurmoqchisiz**:
* **Chizma (Blueprint):** Sizda tayyor uy chizmasi bor (Konstruktor / Class).
* **Nusxalar (Objects):** Siz shu chizma asosida bir nechta uylarni qurasiz.
* **Prototip (Meros):** Tasavvur qiling, har bir uyda alohida **generator (elektr manbai)** o'rnatish o'rniga, butun mahalla uchun bitta umumiy **katta transformator (Prototype)** o'rnatildi. Har bir uy elektr kerak bo'lganda o'zidan qidirmaydi, balki umumiy transformatordan (prototipdan) oqim oladi. Bu xotira va mablag'ni tejaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy prototip ulash)
`Object.create` yordamida prototip zanjiri hosil qilish:
```javascript
const car = {
  hasEngine: true,
  drive() {
    console.log("Mashina harakatlanmoqda...");
  }
};

// tesla obyekti prototipi car ga teng bo'ladi
const tesla = Object.create(car);
tesla.model = "Model S";

console.log(tesla.model);      // "Model S" (shaxsiy xossasi)
console.log(tesla.hasEngine);  // true (prototipdan olindi)
tesla.drive();                 // "Mashina harakatlanmoqda..." (prototip metodi)
```

### 2. Intermediate Example (ES5 Constructor Function va Prototip)
Konstruktor funksiyalar yordamida metodlarni prototipga biriktirish:
```javascript
function User(name, role) {
  this.name = name;
  this.role = role;
}

// Metodni prototipga yuklaymiz (Xotirani tejash uchun)
User.prototype.sayHello = function() {
  return `Salom, mening ismim ${this.name}. Roli: ${this.role}`;
};

const user1 = new User("Jasur", "Admin");
const user2 = new User("Zilola", "User");

console.log(user1.sayHello()); // "Salom, mening ismim Jasur..."
console.log(user2.sayHello()); // "Salom, mening ismim Zilola..."
```

### 3. Advanced Example (Constructor Inheritance - Konstruktorli Vorislik)
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  console.log(`${this.name} ovqatlanmoqda.`);
};

function Bird(name, canFly) {
  // 1. Ota konstruktorni chaqirish (super call)
  Animal.call(this, name);
  this.canFly = canFly;
}

// 2. Prototip zanjirini ulash
Bird.prototype = Object.create(Animal.prototype);

// 3. Constructor xossasini o'ziga qaytarish (tuzatish)
Bird.prototype.constructor = Bird;

Bird.prototype.fly = function() {
  if (this.canFly) {
    console.log(`${this.name} uchmoqda!`);
  } else {
    console.log(`${this.name} ucha olmaydi.`);
  }
};

const eagle = new Bird("Burgut", true);
eagle.eat(); // "Burgut ovqatlanmoqda." (Animal prototipidan)
eagle.fly(); // "Burgut uchmoqda!" (Bird prototipidan)
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Prototypes Mechanics
Har bir funksiya yaratilganda avtomatik ravishda uning ichida `prototype` deb nomlangan obyekt ham yaratiladi. Uning ichida `constructor` xossasi bo'lib, u funksiyaning o'ziga qayta havola beradi.
Qachonki biz `new` kalit so'zi bilan yangi obyekt yaratsak, JavaScript orqa fonda quyidagi ishlarni bajaradi:
1. Yangi bo'sh obyekt yaratadi.
2. Obyektning `__proto__` yashirin xossasini konstruktor funksiyaning `prototype` obyektiga bog'laydi.
3. Konstruktor funksiyani `this` kalit so'zini shu yangi obyektga qaratib ishga tushiradi.
4. Obyektni qaytaradi.

```
[ eagle ] ──__proto__──> [ Bird.prototype ] ──__proto__──> [ Animal.prototype ] ──__proto__──> [ Object.prototype ] ──__proto__──> null
```

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `prototype` va `__proto__` ni adashtirib yuborish
* **`prototype`** — bu faqat konstruktor funksiyalar (va klasslar)da mavjud bo'lgan xossa bo'lib, u orqali yaratiladigan obyektlarga andoza beriladi.
* **`__proto__`** — bu yaratilgan obyekt nusxasining haqiqiy prototipiga ishora qiluvchi yashirin havoladir.

### 2. Prototipni butunlay almashtirganda `constructor` xossasini tuzatishni unutish
#### Xato:
```javascript
function Cat() {}
Cat.prototype = {
  meow() { console.log("Meow"); }
};
const myCat = new Cat();
console.log(myCat.constructor === Cat); // false! constructor yo'qoldi (Object bo'lib qoldi)
```
#### Tuzatish:
```javascript
Cat.prototype = {
  constructor: Cat, // constructor havolasini qo'lda tiklash
  meow() { console.log("Meow"); }
};
```

### 3. Prototip zanjirini dynamic ravishda `__proto__` orqali o'zgartirish
#### Xato:
```javascript
obj.__proto__ = newProto; // Juda sekin ishlaydi va xavfli!
```
#### Tuzatish:
Prototipni dynamic o'zgartirishdan qoching, uning o'rniga boshidanoq `Object.create(proto)` yordamida to'g'ri yarating.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Prototip nima?
   * **Javob:** Obyektlar o'rtasida metodlar va xossalarni ulashish imkonini beruvchi andoza (havola).
2. **Savol:** Prototip zanjiri qayerda tugaydi?
   * **Javob:** `Object.prototype.__proto__` da, ya'ni `null` qiymatida.
3. **Savol:** `Object.create(proto)` nima qiladi?
   * **Javob:** Berilgan `proto` obyektini prototip qilib olgan yangi bo'sh obyekt yaratadi.
4. **Savol:** Barcha funksiyalarda `prototype` xossasi bormi?
   * **Javob:** Arrow (o'q) funksiyalarda `prototype` mavjud emas va ularni `new` bilan chaqirib bo'lmaydi.

### Middle
5. **Savol:** `__proto__` va `prototype` farqi nimada?
   * **Javob:** `prototype` konstruktorda yangi nusxalarga andoza berish uchun xizmat qiladi. `__proto__` esa obyekt nusxasining o'z prototipiga bo'lgan real havolasidir.
6. **Savol:** Prototipdagi xossani obyektning o'zidagi xossa bilan to'sib qo'yish (Shadowing) nima?
   * **Javob:** Obyektning o'zida prototipdagi xossa bilan bir xil nomli xossa yaratish. JS uni birinchi topadi va prototipdagini to'sib qo'yadi.
7. **Savol:** `hasOwnProperty` metodi nima uchun kerak?
   * **Javob:** Obyektda xossa prototip zanjiridan olinmayotganini, balki obyektning shaxsiy xossasi ekanini aniqlash uchun.
8. **Savol:** `Object.create(null)` yordamida yaratilgan obyektning afzalligi nimada?
   * **Javob:** Unda mutlaqo prototip va standart metodlar (masalan `toString`, `hasOwnProperty`) bo'lmaydi. Bu uni kesh yoki toza lug'at sifatida xavfsiz qiladi.

### Senior
9. **Savol:** Prototype Pollution (Prototiplarni ifloslantirish) zaifligi nima va undan qanday himoyalanish mumkin?
   * **Javob:** Dynamic obyektlarni birlashtirishda tajovuzkor `__proto__` yoki `constructor.prototype` orqali global `Object.prototype`ga zararli xossalar qo'shib yuborishi. Himoyalanish uchun `Object.create(null)` ishlatish, kirish ma'lumotlarini filtrlash yoki `Object.freeze(Object.prototype)` qilish mumkin.
10. **Savol:** Nima uchun dynamic prototip o'zgartirish (`Object.setPrototypeOf`) sekin ishlaydi?
    * **Javob:** JS dvigateli (V8) obyektlar strukturasini tezlashtirish uchun Inline Cache va Hidden Classes (Map) tizimidan foydalanadi. Prototip o'zgarganda bu optimallashtirishlar butunlay bekor qilinadi va qayta quriladi.
11. **Savol:** Prototip zanjirini tekshirish uchun `instanceof` qanday ishlaydi?
    * **Javob:** U o'ng tomondagi konstruktorning `prototype` xossasi chap tomondagi obyektning `__proto__` prototip zanjirida bor yoki yo'qligini tekshiradi.
12. **Savol:** ES6 klasslaridagi `super` kalit so'zi prototiplarda qanday ishlaydi?
    * **Javob:** Orqa fonda u joriy obyekt prototipining prototipidagi (`Object.getPrototypeOf(Proto)`) mos metodni chaqiradi va `this` kontekstini saqlab qoladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Prototip zanjirini ulash, global obyekt prototiplarini kengaytirish va Object.create bilan ishlash bo'yicha amaliy topshiriqlarni bajaring.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi prototiplar va vorislik bo'yicha testlar.

---

## 8. 🎯 Real Project Case Study

### Kengaytiriladigan Log Tizimi (Extensible Logging Plugin)
Katta loyihalarda umumiy bazaviy loger tuzib, keyinchalik turli xizmatlar uchun uning prototipini buzmasdan yangi metodlar bilan kengaytirilgan variantlarini yaratish kerak bo'ladi.

```javascript
// Bazaviy loger
const baseLogger = {
  log(message) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  },
  error(message) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }
};

// Maxsus xizmat loggeri
const paymentLogger = Object.create(baseLogger);

// Yangi metod qo'shamiz
paymentLogger.logPayment = function(amount, currency) {
  this.log(`To'lov amalga oshirildi: ${amount} ${currency}`);
};

// Foydalanish:
paymentLogger.logPayment(150, "USD"); // [LOG] 2026-06-10T...: To'lov amalga oshirildi...
paymentLogger.error("Tizimda xato!"); // Ota metod ishlamoqda
```

---

## 9. 🚀 Performance va Optimization

* **Metodlarni prototipda saqlang:** Agar bir nechta obyektlar yaratilsa, ularning metodlarini konstruktor ichida emas, prototipida yozing. Bu RAM sarfini sezilarli tejaydi.
* **Zanjir chuqurligiga e'tibor bering:** Agar prototip zanjiri juda uzun bo'lsa (5 tadan ko'p ota-ona), xossa qidirish vaqti ortadi.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| **`__proto__`** | Obyekt nusxasining haqiqiy prototip havolasi | `obj.__proto__` |
| **`prototype`** | Konstruktor orqali beriladigan andoza xossasi | `Constructor.prototype` |
| **`Object.create(proto)`** | Berilgan prototip bilan yangi obyekt yaratadi | `Object.create(baseObj)` |
| **`hasOwnProperty(prop)`** | Xossa obyektning shaxsiy o'zinikimi yoki yo'qligini tekshiradi | `obj.hasOwnProperty("name")` |
| **`Object.getPrototypeOf(obj)`**| Obyektning prototipini qaytaradi (Modern usul) | `Object.getPrototypeOf(obj)` |
| **`Object.create(null)`** | Prototipsiz, toza obyekt yaratadi | `const dict = Object.create(null)` |
