## 1. 💡 Sodda Tushuntirish va Analogiya

### Higher-Order Functions va Currying nima?
* **Higher-Order Functions (HOF - Oliy tartibli funksiyalar):** Argument sifatida boshqa funksiyani qabul qiladigan yoki o'zidan yangi funksiya qaytaradigan funksiyadir. JavaScript-da funksiyalar "birinchi darajali obyektlar" (First-Class Citizens) bo'lgani uchun ularni o'zgaruvchidek boshqarish mumkin.
* **Currying (Karring):** Bir nechta argument oladigan funksiyani faqat bittadan argument qabul qiladigan zanjirli funksiyalar ketma-ketligiga aylantirish usulidir.

### Real hayotiy analogiya
* **Higher-Order Function (Ish boshqaruvchi):** Tashkilot direktori o'zi jismoniy ish qilmaydi. U bir ishchini (funksiyani) chaqirib unga topshiriq beradi (callback qabul qiladi) yoki yangi bo'lim boshlig'ini (funksiya) tayinlaydi (qaytaradi).
* **Currying (Muddatli to'lov):** Siz do'kondan qimmatbaho noutbuk sotib olmoqchisiz. Hamma summani birdaniga to'lash o'rniga, har oy ma'lum bir qismini to'laysiz (birinchi oy `a`, keyingi oy `b` argumentlarini berasiz) va to'liq to'lab bo'lingach, noutbuk sizniki bo'ladi (yakuniy natija qaytadi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Funksiya qabul qiluvchi HOF)
```javascript
// Boshqa funksiyani qabul qiluvchi oddiy HOF
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i); 
  }
}

repeat(3, (index) => console.log(`Qadam: ${index}`)); 
// Qadam: 0
// Qadam: 1
// Qadam: 2
```

### 2. Intermediate Example (Funksiya qaytaruvchi HOF va Currying)
```javascript
// O'zidan funksiya qaytaruvchi HOF:
function multiplyCreator(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}

const double = multiplyCreator(2);
console.log(double(5)); // 10

// Arrow syntax yordamida Currying:
const add = a => b => a + b;
console.log(add(5)(3)); // 8
```

### 3. Advanced Example (Funksiyalar kompozitsiyasi - Pipe)
Bir nechta funksiyalarni ketma-ket zanjir qilib ulash (konveyer kabi):
```javascript
const lowercase = str => str.toLowerCase();
const shout = str => `${str}!`;
const repeatTwo = str => `${str} ${str}`;

// Oliy tartibli compose funksiyasi:
const pipe = (...funcs) => (val) => funks.reduce((acc, fn) => fn(acc), val);

const formatText = pipe(lowercase, shout, repeatTwo);
console.log(formatText("HELLO")); // "hello! hello!"
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### First-Class Functions va Closures (Yopilishlar)
* **First-Class Functions:** JavaScript dvigateli funksiyalarni obyektlar kabi xotiraning **Heap** qismida saqlaydi va ularning reference-larini uzatishga yo'l qo'yadi.
* **Closures (Yopilishlar):** Funksiya qaytarilganda, u o'zi yaratilgan tashqi muhitdagi o'zgaruvchilarni (masalan, `multiplier` yoki `a`) xotirada saqlab qoladi. Currying to'liq closures imkoniyatlariga tayanib ishlaydi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Logging tizimi uchun dinamik funksiya yaratish
Turli xil log darajalari (INFO, ERROR, WARN) uchun oldindan sozlangan funksiyalar yaratamiz.

```javascript
// HOF yordamida log yaratuvchi:
const logger = level => message => `[${level.toUpperCase()}] ${message}`;

// Karring yordamida ixtisoslashgan funksiyalarni olamiz:
const infoLog = logger("info");
const errorLog = logger("error");

console.log(infoLog("Tizim ishga tushdi")); // "[INFO] Tizim ishga tushdi"
console.log(errorLog("Ulanishda xatolik"));  // "[ERROR] Ulanishda xatolik"
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Zanjirli chaqiriq (Currying) qavslarini unutish
* **Noto'g'ri:**
  ```javascript
  const add = a => b => a + b;
  console.log(add(5, 3)); // b => a + b funksiyasini qaytaradi (xato!)
  ```
* **To'g'ri:**
  ```javascript
  console.log(add(5)(3)); // 8
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tushuncha | Ta'rifi | Misol |
| :--- | :--- | :--- |
| **HOF (Callback qabul qiluvchi)** | Callback olib ishlatadigan funksiya | `arr.map(x => x * 2)` |
| **HOF (Funksiya qaytaruvchi)** | Ichki funksiyani qaytaradi | `const f = () => () => 5` |
| **Currying (Karring)** | `f(a, b)` ni `f(a)(b)` ga o'girish | `const add = a => b => a + b` |
| **Partial Application** | Argumentlarning bir qismini oldindan bog'lash | `const addFive = add(5)` |

---

## 7. ❓ Savollar va Javoblar

### 1. Currying nima uchun kerak?
U kodni qayta ishlatish (reusability) va argumentlarni oldindan sozlab qo'yish (partial application) uchun juda qulay. Masalan, bir xil birinchi argumentli chaqiriqlarni qayta-qayta yozishni oldini oladi.

### 2. Har qanday funksiyani karring qilsa bo'ladimi?
Ha, buning uchun yordamchi `curry` funksiyalarini yozish yoki Lodash kutubxonasining `_.curry` metodidan foydalanish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `arr.filter()` funksiyasi Higher-Order Function hisoblanadimi? (Ha, chunki u argument sifatida boshqa funksiyani qabul qiladi).
2. Currying qanday qilib yopilishlar (closures) orqali ishlaydi?
3. Partial Application va Currying farqi nima? (Currying funksiyani faqat bittadan argument oladigan zanjirga aylantiradi, Partial Application esa bir nechta argumentni birdaniga bog'lab qo'ya oladi).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida funksiyalar bilan ishlash ko'nikmalaringizni tekshiring.
