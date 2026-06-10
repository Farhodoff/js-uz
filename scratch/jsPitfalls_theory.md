## 1. 💡 Sodda Tushuntirish va Analogiya

### JS Pitfalls (JavaScript Tuzoqlari) nima?
* **JS Pitfalls:** JavaScript dasturlash tilining tabiati, uning dinamik tiplanishi, tarixiy rivojlanishi va orqaga mos keluvchanlikni (backward compatibility) saqlash majburiyati tufayli kelib chiqqan g'alati, kutilmagan va chalkashtiruvchi xususiyatlaridir.
* Bular xatolar emas, balki tilning o'ziga xos ishlash mexanizmlari bo'lib, ular haqida bilmagan dasturchilar osongina tuzoqqa tushib, qiyin topiladigan xatolarga (bugs) uchrashadi.

### Real hayotiy analogiya
Tasavvur qiling, siz **yo'l harakati qoidalariga rioya qilib mashina haydayapsiz**:
* Ko'pgina mamlakatlarda yo'lning o'ng tarafidan harakatlaniladi.
* Lekin birdaniga yo'lda hech qanday ogohlantirishsiz **boshqa qoidalar ishlaydigan hududga** kirib qoldingiz (masalan, chorrahada o'ng tomondan kelgan mashina emas, chap tomondagi ustuvorlikka ega bo'ldi yoki chap tomondan haydash boshlandi). Agar siz bu mahalliy qoidalarni ("tuzoqlarni") bilmasangiz, qoidani buzmagan holda ham avariyaga uchraysiz.
* JavaScript-dagi tuzoqlar ham xuddi shunday: kod sintaktik jihatdan to'g'ri bo'lsa-da, til ichki qoidalari tufayli mutlaqo kutilmagan natija beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Turlarning avtomatik o'zgarishi / Coercion)
Silliq va ko'rinmas tur o'zgarishlari mantiqiy xatolarga olib kelishi:
```javascript
const x = "5";
const y = 2;

console.log(x + y); // "52" (satrga aylantirib birlashtiradi)
console.log(x - y); // 3 (songa aylantirib ayiradi!)
console.log(x * y); // 10 (ko'paytiradi)
```

### 2. Intermediate Example (Floating Point / Suzuvchi nuqta muammosi)
Matematik jihatdan to'g'ri bo'lgan tenglik JavaScript-da xato bo'lishi:
```javascript
const a = 0.1;
const b = 0.2;

if (a + b === 0.3) {
  console.log("Teng!");
} else {
  console.log("Teng emas!"); // Ekranga chiqadi!
  console.log(a + b); // 0.30000000000000004
}

// Tuzatish: Yaxlitlab olish
const preciseSum = parseFloat((a + b).toFixed(12));
console.log(preciseSum === 0.3); // true
```

### 3. Advanced Example (Object Key Coercion / Obyekt kalitlarining o'zgarishi)
Obyekt kalitlari har doim satrga (string) aylantirilishi tufayli yuzaga keladigan chalkashlik:
```javascript
const obj = {};
const key1 = { name: "Ali" };
const key2 = { name: "Vali" };

obj[key1] = 123; // key1.toString() -> "[object Object]"
obj[key2] = 456; // key2.toString() -> "[object Object]" (oldindagining ustiga yozadi!)

console.log(obj[key1]); // 456! (123 yo'qolib ketdi)
console.log(obj); // { "[object Object]": 456 }

// Tuzatish: Murakkab kalitlar uchun Map obyektidan foydalaning
const myMap = new Map();
myMap.set(key1, 123);
myMap.set(key2, 456);
console.log(myMap.get(key1)); // 123
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Dasturdagi qiyin topiladigan yashirin xatolarni oldini olish:** JS-dagi suzuvchi nuqta (0.1 + 0.2) xatosi moliyaviy dasturlarda pullarni noto'g'ri hisoblashga olib kelishi mumkin.
2. **Kodni xavfsizroq yozish:** JavaScript juda moslashuvchan til bo'lgani uchun, u ko'p xatolarda dasturni to'xtatmaydi, balki `NaN` yoki `undefined` bilan ishlashni davom ettiradi. Dasturchi tuzoqlarni bilsagina, kodni kutilmagan to'xtashlarsiz toza yozadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `==` (kuchsiz tenglik) operatorini ishlatish
Kuchsiz tenglik o'zgaruvchilar turini yashirin o'zgartiradi.
#### Xato:
```javascript
console.log("" == 0); // true (bo'sh satr 0 ga aylanib ketadi)
console.log(false == "0"); // true
console.log(null == undefined); // true
```
#### Tuzatish:
Har doim qiymat va turini bir xilda tekshiradigan `===` (qat'iy tenglik) dan foydalaning.
```javascript
console.log("" === 0); // false
console.log(false === "0"); // false
console.log(null === undefined); // false
```

### 2. Obyektlarni nusxalashda referensial bog'liqlik
Obyekt yoki massivni shunchaki boshqa o'zgaruvchiga tenglash yangi nusxa yaratmaydi.
#### Xato:
```javascript
const original = { score: 10 };
const copy = original;
copy.score = 20;

console.log(original.score); // 20! (original ham o'zgarib ketdi)
```
#### Tuzatish:
Sayoz nusxa (shallow copy) uchun spread operator `...`, chuqur nusxa (deep copy) uchun esa `structuredClone` yoki `JSON` metodlaridan foydalaning:
```javascript
const copy = { ...original }; // Sayoz nusxa
// Yoki
const deepCopy = structuredClone(original); // Chuqur nusxa
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** `NaN` nima va u bilan bog'liq eng katta tuzoq qaysi?
   * **Javob:** `NaN` (Not-a-Number) raqamli xatoliklarni bildiradi. Uning asosiy tuzog'i - u o'z-o'ziga ham teng emas (`NaN === NaN` -> `false`). Uni tekshirish uchun `Number.isNaN()` ishlatiladi.
2. **Savol:** `typeof null` nima uchun `'object'` qaytaradi?
   * **Javob:** Bu JavaScript tilining ilk versiyasidan qolgan tarixiy xato bo'lib, orqaga mos keluvchanlik buzilmasligi uchun tuzatilmagan.
3. **Savol:** `==` va `===` operatorlarining farqi nimada?
   * **Javob:** `==` taqqoslashdan oldin qiymatlarni bitta turga o'giradi (coercion), `===` esa turlarni o'zgartirmasdan, ham qiymatni, ham turni tekshiradi.
4. **Savol:** `const` bilan e'lon qilingan massiv elementlarini o'zgartirsa bo'ladimi?
   * **Javob:** Ha, bo'ladi. `const` faqat o'zgaruvchiga yangi xotira manzili (reference) yuklashni taqiqlaydi. Massiv ichidagi elementlarni o'zgartirish (masalan `push`) taqiqlanmaydi.

### Middle (5–8)
5. **Savol:** `parseInt('0.0000005')` nima uchun `5` qaytaradi?
   * **Javob:** `parseInt` o'z argumentini string-ga o'giradi. `0.0000005` string bo'lganda `'5e-7'` (ilmiy format) ko'rinishiga o'tadi. `parseInt` birinchi belgini (`'5'`) o'qib, uni son sifatida qaytaradi.
6. **Savol:** Automatic Semicolon Insertion (ASI) bilan bog'liq `return` tuzog'ini tushuntiring.
   * **Javob:** Agar `return`dan keyin yangi satr boshlansa, JS avtomatik ravishda `return;` deb nuqtali vergul qo'yadi. Natijada funksiya quyidagi kodni bajarmay `undefined` qaytaradi.
7. **Savol:** `1 < 2 < 3` va `3 > 2 > 1` ifodalari natijasi qanday bo'ladi?
   * **Javob:** `1 < 2 < 3` -> `true < 3` -> `1 < 3` -> `true`. `3 > 2 > 1` -> `true > 1` -> `1 > 1` -> `false`.
8. **Savol:** Massivdagi empty slotlar (masalan `Array(3)` yaratganda) va `undefined` qiymatli elementlar farqi nimada?
   * **Javob:** Empty slotlar massivda mavjud bo'lmagan indekslardir. `.map()`, `.forEach()` kabi iteratorlar empty slotlarni o'tkazib yuboradi, lekin `undefined` qiymatli elementlarni qayta ishlaydi.

### Senior (9–12)
9. **Savol:** `Math.min() > Math.max()` nima uchun `true` qaytaradi?
   * **Javob:** Argumentsiz chaqirilganda `Math.min()` taqqoslashni boshlash uchun eng katta son bo'lgan `Infinity`ni, `Math.max()` esa eng kichik son `-Infinity`ni qaytaradi. `Infinity > -Infinity` sharti esa `true` bo'ladi.
10. **Savol:** `this` kalit so'zi yo'qolishi (loss of this) qachon yuz beradi va qanday oldi olinadi?
    * **Javob:** Obyekt metodi callback sifatida boshqa funksiyaga (masalan `setTimeout`) uzatilganda `this` konteksti global obyektga (yoki strict mode-da `undefined`ga) o'zgarib qoladi. Buning oldini olish uchun arrow funksiyalar yoki `.bind(obj)` ishlatiladi.
11. **Savol:** JavaScript-da obyektdan nusxa olishda `structuredClone` ning `JSON.parse(JSON.stringify(obj))` dan afzalliklari nimada?
    * **Javob:** `JSON` metodlari `Date`, `RegExp`, `Map`, `Set` kabi maxsus obyektlarni, funksiyalarni va siklik havolalarni (circular references) nusxalay olmaydi (ma'lumot yo'qoladi). `structuredClone` esa ularni to'g'ri nusxalay oladi.
12. **Savol:** Temporal Dead Zone (TDZ) nima va u `var` hamda `let`/`const` farqlariga qanday bog'liq?
    * **Javob:** TDZ - bu o'zgaruvchi e'lon qilingan qatorgacha bo'lgan hudud. `var` o'zgaruvchilar hoisting bo'lganda `undefined` qiymatini oladi, `let` va `const` esa hoisting bo'lsa-da, e'lon qilinmaguncha ularni o'qib bo'lmaydi (TDZ zonada bo'ladi) va murojaat qilinganda `ReferenceError` tashlanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Moliyaviy tizimlarda tranzaksiyalarni hisoblash xavfsizligi
Moliyaviy ilovalarda suzuvchi nuqta tuzog'iga tushmaslik uchun barcha hisob-kitoblarni tiyinlarda (butun sonlarda) bajarib, faqat ko'rsatish paytida so'm/dollarga o'tkazish eng xavfsiz yechim hisoblanadi.

```javascript
// Noto'g'ri (Tuzoqqa tushish):
function calculateTotalDirect(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}
console.log(calculateTotalDirect([19.99, 9.99, 0.02])); // 30.000000000000004

// To'g'ri (Butun sonlarga o'tib hisoblash):
function calculateTotalSafe(prices) {
  // Qiymatlarni 100 ga ko'paytirib (tiyinlarga o'tib) butun son qilamiz
  const totalCents = prices.reduce((sum, price) => {
    return sum + Math.round(price * 100);
  }, 0);
  
  // Natijani yana 100 ga bo'lamiz
  return totalCents / 100;
}
console.log(calculateTotalSafe([19.99, 9.99, 0.02])); // 30.00 (Aniq!)
```

---

## 9. 🚀 Performance va Optimization

* **`===` ni odat qiling:** `===` operatori turlarni tekshirib o'tirmasdan, turli xil bo'lsa zudlik bilan `false` qaytargani uchun `==` operatoriga qaraganda tezroq ishlaydi.
* **Obyektlarni nusxalashda ehtiyot bo'ling:** `JSON.parse(JSON.stringify())` juda og'ir operatsiya bo'lib, katta obyektlarda ishlash tezligini keskin tushirib yuboradi. Agar faqat sayoz nusxa kifoya bo'lsa, spread operator (`{...}`) yoki `Object.assign()` dan foydalaning.

---

## 10. 📌 Cheat Sheet

| Tuzoq / Amaliyot | Natija / Muammo | Yechim |
| :--- | :--- | :--- |
| `0.1 + 0.2` | `0.30000000000000004` | `.toFixed(12)` va `parseFloat()` |
| `typeof null` | `'object'` | `val === null` orqali tekshirish |
| `NaN === NaN` | `false` | `Number.isNaN(val)` |
| `"" == 0` | `true` | `===` qat'iy tenglikdan foydalanish |
| `[1, 2] + [3, 4]` | `'1,23,4'` (string concatenation) | `.concat()` yoki spread operator |
| `Object` kaliti | Obyektlar satrga o'tadi (`[object Object]`) | `Map` obyektidan foydalanish |
| construct `Array(3)` | Bo'sh slotlar yaratiladi | `Array.from({ length: 3 })` yoki `.fill()` |
