# 📚 JavaScript Variantli Testlar (Output Challenges) Tayyorgarlik Rejasi

Ushbu reja loyihani yangilash va unda o'quvchilarni intervyularda eng ko'p so'raladigan **"Bu kod nima chiqaradi?" (Output)** va variantli (MCQ) testlariga tayyorlash uchun tuzilgan.

---

## 🧐 Nega "Output" Testlari Intervyularda Ko'p So'raladi?

**Bu nima va nima uchun kerak?**
* **Nega:** Intervyularda dasturchining faqat sintaksisni bilishi emas, balki **JavaScript dvigateli (V8 Engine) kodni sahna ortida qanday bajarishini** tushunishi tekshiriladi.
* **Maqsad:** Bunday testlar orqali nomzodning xotira bilan ishlash (references), asinxronlik ketma-ketligi (event loop) va tildagi yashirin "tuzoqlar" (gotchas) bo'yicha tushunchasi aniqlanadi.

---

## 🛠️ Urg'u Berish Kerak Bo'lgan 8 Ta Asosiy Mavzu

Quyidagi jadvalda intervyu testlarida 90% holatda tushadigan asosiy mavzular keltirilgan:

| # | Mavzu | Urg'u beriladigan qism (Focus) | Test Savoli Yo'nalishi |
|---|---|---|---|
| 1 | **Scope, Hoisting & TDZ** | `var`, `let`, `const` farqlari, Temporal Dead Zone | Variable va Function hoisting aralash savollar |
| 2 | **`this` Keyword & Binding** | Dynamic binding vs Lexical binding (Arrow functions) | `call`, `apply`, `bind` va method yo'qotish holatlari |
| 3 | **Event Loop & Asynchronous** | Call Stack, Microtask vs Macrotask Queue, `async/await` | `setTimeout`, `Promise` va sinxron kod aralash kelishi |
| 4 | **Object References & Mutation** | Xotirada saqlanishi, shallow vs deep clone, object methodlari | Obyektni funksiyaga uzatib mutatsiya qilish |
| 5 | **Type Coercion & Equality** | `==` vs `===`, implicit type conversion (+, -, * , /) | `[] + []`, `NaN === NaN`, `null == undefined` kabi holatlar |
| 6 | **Closures (Yopilishlar)** | Lexical environment, looplar ichida closure yaratish | Loop ichidagi `var` va `let` bilan `setTimeout` |
| 7 | **Prototypes & Classes** | Prototip zanjiri (`__proto__`), `new` operatorining ishlashi | Prototipga yangi metod qo'shish va vorislik |
| 8 | **Array Methods Mutability** | Mutating vs Non-mutating metodlar, array length | `splice` vs `slice`, `sort()` default tabiati |

---

## 📖 Darslarni Qayta Shakllantirish (Mavzular bo'yicha namunalar)

Har bir mavzuni o'quvchiga tushuntirishda quyidagi pedagogik strukturani qo'llaymiz.

---

### 1. Scope, Hoisting & Temporal Dead Zone (TDZ)

* **Nega kerak?** JS kodni tepadan pastga o'qishdan oldin o'zgaruvchilarni ro'yxatga oladi (Hoisting). Bu narsani bilmaslik kutilmagan `undefined` yoki `ReferenceError` xatolariga sabab bo'ladi.
* **Hayotiy Analogiya:** Biror restoranga kirib, ovqat buyurtma qilishdan oldin uni tayyor deb o'ylash (hoisting). `var` - stolda suvi bor, lekin taom yo'q (`undefined`), `let`/`const` esa - stol band qilingan, lekin unga tegish mumkin emas (TDZ).

#### 🚨 Tuzoq (Gotcha) Test Misoli:
```javascript
var x = 10;
function test() {
  console.log(x);
  var x = 20;
}
test();
```
* **Variantlar:**
  * A) `10`
  * B) `20`
  * C) `undefined` ✅
  * D) `ReferenceError`
* **Javob tushuntirishi:** Funksiya ichidagi `var x` hoisting bo'ladi va funksiyaning eng tepasiga ko'tariladi, lekin qiymati berilmaydi (`var x;`). Shuning uchun `console.log(x)` bajarilganda u tashqaridagi `x` ni emas, ichkaridagi hali qiymat berilmagan `x` ni ko'rib `undefined` chiqaradi.

---

### 2. `this` Kalit So'zi va Dynamic Binding

* **Nega kerak?** `this` funksiya qayerda yozilganiga emas, **qanday chaqirilganiga** qarab o'zgaradi. Arrow functionlarda esa `this` har doim statik (lexical scope) bo'ladi.
* **Hayotiy Analogiya:** "Men" (this) so'zi. Agar siz uyda turib "men" desangiz, bu sizga ishora qiladi. Lekin telefon orqali do'stingizga gapirsangiz, do'stingiz uchun "men" u o'zini bildiradi. Kontekst o'zgaradi!

#### 🚨 Tuzoq (Gotcha) Test Misoli:
```javascript
const user = {
  name: "Farhodoff",
  greet() {
    console.log(`Salom, ${this.name}`);
  },
  greetArrow: () => {
    console.log(`Salom, ${this.name}`);
  }
};

const myGreet = user.greet;
myGreet(); 
user.greetArrow();
```
* **Variantlar:**
  * A) `Salom, Farhodoff` va `Salom, Farhodoff`
  * B) `Salom, undefined` va `Salom, undefined` ✅
  * C) `Salom, Farhodoff` va `Salom, undefined`
  * D) `TypeError`
* **Javob tushuntirishi:** 
  1. `myGreet = user.greet` qilinganda funksiya obyektdan ajralib chiqadi va mustaqil (standalone) chaqiriladi. Bu holda `this` global obyektga (window/global) teng bo'ladi, globalda esa `name` yo'q, shuning uchun `undefined`.
  2. `greetArrow` bu arrow function. U o'zining `this` iga ega emas va o'zidan tepada turgan global scope kontekstini oladi, global scope'da esa `name` yo'q.

---

### 3. Event Loop va Asinxron Ketma-ketlik

* **Nega kerak?** JavaScript bir vaqtda faqat bitta ishni bajaradi (single-threaded). Lekin asinxron amallar (Promise, API, timer) qanday tartibda ishlashini bilish juda muhim.
* **Hayotiy Analogiya:** Do'konda navbat kutayotgan mijozlar. Sinxron kodlar - asosiy navbat. `Promise` (Microtask) - oldindan navbat olib qo'ygan VIP mijozlar. `setTimeout` (Macrotask) - tashqarida kutib turgan navbatdagilar. Dvigatel VIP navbatni to'liq tugatmaguncha keyingi macrotask'ga o'tmaydi.

#### 🚨 Tuzoq (Gotcha) Test Misoli:
```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```
* **Natija:** `Start` -> `End` -> `Promise` -> `Timeout`
* **Tushuntirish:** 
  1. `Start` va `End` sinxron kod bo'lib, darhol ishlaydi.
  2. `setTimeout` asinxron macrotask hisoblanadi va 0ms bo'lsa ham Task Queue ga yuboriladi.
  3. `Promise.resolve().then()` esa microtask bo'lib, Call Stack bo'shashi bilan macrotask'dan oldin bajariladi.

---

### 4. Object References va Mutatsiya (Mutation)

* **Nega kerak?** Obyektlar xotiradagi manzili orqali uzatiladi. Buni bilmaslik, bir o'zgaruvchini o'zgartirganda boshqasi ham o'zgarib ketishi kabi jiddiy xatolarga olib keladi.
* **Hayotiy Analogiya:** Google Drive hujjatining havolasi. Agar siz havolani do'stingizga bersangiz va u hujjatni tahrirlasa, sizda ham u o'zgaradi, chunki hujjat bitta.

#### 🚨 Tuzoq (Gotcha) Test Misoli:
```javascript
let user1 = { name: "Ali", age: 22 };
let user2 = user1;
user2.age = 25;

function updateAge(obj) {
  obj = { name: "Ali", age: 30 };
}
updateAge(user1);
console.log(user1.age);
```
* **Variantlar:**
  * A) `22`
  * B) `25` ✅
  * C) `30`
  * D) `undefined`
* **Javob tushuntirishi:**
  1. `user2 = user1` qilinganda ikkala o'zgaruvchi xotiradagi bitta obyekt manziliga ega bo'ladi. `user2.age = 25` obyektning o'zini o'zgartiradi.
  2. `updateAge(user1)` funksiyasiga havola uzatiladi. Lekin funksiya ichida `obj = { ... }` deb yangi obyekt yaratilganda havola uziladi. Tashqaridagi `user1` ga bu ta'sir qilmaydi va u `25` ligicha qoladi.

---

## 🏗️ Platformani Variantli Testlar Bilan Yangilash Taklifi

Hozirgi kunda platformamizda faqat **Kod yozish (Practice)** va **Nazariya (Theory)** mavjud. Variantli testlarni o'rgatish uchun platformaga quyidagi yangiliklarni qo'shishni taklif qilaman:

### 1. Dars Kontentiga `quizzes` Maydonini Qo'shish
Har bir dars obyekti tarkibida endi variantli testlar to'plami bo'lishi mumkin:
```javascript
export const thisKeyword = {
  id: "this-keyword",
  title: "this Kalit So'zi",
  theory: "...",
  exercises: [...],
  // Yangi qo'shiladigan testlar qismi:
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nconst a = { f() { return this; } };\nconsole.log(a.f() === a);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 0, // Options index
      explanation: "a.f() metod shaklida chaqirildi, shuning uchun 'this' obyekti 'a' ga ishora qiladi."
    }
  ]
};
```

### 2. Frontendda `QuizTab` yaratish
`PracticeTab` yoniga yangi tab qo'shiladi va u yerda o'quvchi variantlarni belgilab, o'z bilimini tekshiradi va har bir savol uchun batafsil javobni ("Nega?") o'qib o'rganadi.

---

## 🎯 Navbatdagi Qadamlar va Amalga Oshirish

Ushbu rejani quyidagi bosqichlarda amalga oshiramiz:
1. **Darslarni qayta shakllantirish:** Mavjud `interviewQuestions.js` fayllarini (Boshlang'ich, O'rta, Murakkab) yuqoridagi 8 ta fundamental mavzu asosida boyitish va har biriga 12 tadan variantli savollar tushuntirishi bilan qo'shish.
2. **`curriculum.js` ga yangi "Output Challenges" darsini qo'shish:** Faqat variantli testlar va tuzoqlarga bag'ishlangan alohida dars sahifasini yaratish.
3. **Quiz interfeysi:** Agar loyihani interaktiv testlar bilan boyitmoqchi bo'lsak, `QuizTab` UI komponentini yaratish va `App.jsx`ga integratsiya qilish.
