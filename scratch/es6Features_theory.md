## 1. 💡 Sodda Tushuntirish va Analogiya

### ES6+ Yangi Xususiyatlari nima?
**ES6+ (ECMAScript 2015 va undan keyingi versiyalar)** — bu JavaScript dasturlash tilining rivojlanish jarayonida qo'shilgan eng zamonaviy, qulay va qisqa sintaktik imkoniyatlaridir. Ular kod hajmini sezilarli darajada qisqartirib, xavfsiz va oson o'qiladigan dasturlar yozishga yordam beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **eski mexanik velosiped haydayapsiz**:
* Har safar tepalikka chiqishda juda ko'p kuch (ortiqcha kod) sarflaysiz.
* **ES6+ (Aqlli elektr velosiped):** Endi sizda tepalikka chiqish uchun yordamchi motor (arrow funksiyalar), yiqilishdan asraydigan sensorli tormoz (optional chaining `?.`), va avtomatik chiroqlar (template literals) bor. Siz kamroq jismoniy kuch sarflaysiz, lekin tezroq va xavfsizroq yurasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Object Property Shorthand va Template Literals)
```javascript
const name = "Ali";
const age = 25;

// Eski usul:
// const user = { name: name, age: age };
// const info = "Ismi: " + name + ", Yoshi: " + age;

// ES6+ usuli:
const user = { name, age }; // Shorthand
const info = `Ismi: ${name}, Yoshi: ${age}`; // Template Literal
```

### 2. Intermediate Example (Logical Assignment Operators: `||=`, `&&=`, `??=`)
Qiymatlarni shartli tekshirib o'zlashtirishni juda qisqa yozish:
```javascript
const config = { theme: "dark" };

// Agar count mavjud bo'lmasa yoki nullish bo'lsa, default 10 beraiz:
config.count ??= 10; 

// Agar theme bor bo'lsa, uni log qilamiz (&&=)
config.theme &&= "light"; 
```

### 3. Advanced Example (Array findLast va Object.fromEntries)
ES2022+ va ES2019+ yordamida obyektlar va massivlarni professional boshqarish:
```javascript
const records = [10, 5, 8, 20, 15];

// Massiv oxiridan shartga mos birinchi elementni topish (findLast)
const lastLarge = records.findLast(x => x > 10); // 15

// Key-value juftliklar massivini obyektga o'girish
const entries = [["name", "Bobur"], ["role", "admin"]];
const obj = Object.fromEntries(entries); // { name: "Bobur", role: "admin" }
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Syntactic Sugar va TC39 Komiteti
JavaScript-ga har yili qo'shiladigan yangi imkoniyatlar **TC39** (Ecma International texnik komiteti) tomonidan 4 bosqichli sinovdan o'tkazilib, standartga kiritiladi. Bu yangi sintaksislar brauzer dvigatelida (masalan, V8) optimallashtirilgan C++ funksiyalariga tarjima qilinadi.
* **Transpiling (Babel):** Eski brauzerlar tushunishi uchun yangi ES6+ kodlari odatda **Babel** yordamida ES5 (eski JS) formatiga o'giriladi (masalan, `let/const` -> `var`).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### API response'dan kelgan ma'lumotlarni zamonaviy formatlash
Keling, bir nechta ES6+ imkoniyatlarini birlashtirib, ma'lumotlarni tozalaymiz.

```javascript
const rawUser = {
  id: 101,
  details: {
    first_name: "Farhod",
    last_name: "Umarov"
  },
  roles: null
};

// 1. Destructuring va Default qiymat
const { details: { first_name: firstName }, roles } = rawUser;

// 2. Nullish Coalescing
const activeRoles = roles ?? ["guest"];

// 3. String interpolatsiyasi
const welcomeMessage = `Salom, ${firstName}! Roli: ${activeRoles.join(", ")}`;

console.log(welcomeMessage); // "Salom, Farhod! Roli: guest"
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. `??` o'rniga `||` ishlatish xavfi
* **Noto'g'ri:**
  ```javascript
  const volume = 0;
  const finalVolume = volume || 50; // 50 (chunki 0 falsy. Lekin foydalanuvchi ovozni o'chirgan edi!)
  ```
* **To'g'ri:**
  ```javascript
  const volume = 0;
  const finalVolume = volume ?? 50; // 0 (chunki 0 null/undefined emas, u saqlab qolinadi)
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyati | Sintaksis | Vazifasi | Qo'shilgan yili |
| :--- | :--- | :--- | :--- |
| **Object property shorthand** | `{ name }` | Kalit va qiymat nomi bir xil bo'lsa qisqartirish | ES6 (2015) |
| **Template Literals** | `` `Hello ${name}` `` | Matn va o'zgaruvchilarni dinamik ulash | ES6 (2015) |
| **Logical Assignment** | `a ??= b` | Faqat nullish bo'lsa o'zlashtirish | ES2021 |
| **Object.fromEntries** | `Object.fromEntries(arr)` | Array-entry formatni obyektga o'girish | ES2019 |
| **Array findLast** | `arr.findLast(fn)` | Oxiridan boshlab qidirish | ES2023 |

---

## 7. ❓ Savollar va Javoblar

### 1. Nega ES6 JavaScript tarixidagi eng muhim yangilanish hisoblanadi?
Chunki ES6 da tilga butunlay yangi arxitekturalar: `let/const`, Arrow funksiyalar, Klasslar, Modullar, Promise-lar, Destructuring va Spread/Rest kabi fundamental mexanizmlar olib kirildi.

### 2. `let/const` va `var` farqi nimada?
`var` funksiyaviy scope (scope)ga ega va hoisted bo'ladi. `let/const` esa bloki doirasida (block scope) ishlaydi, hoisted bo'lmaydi (TDZda bo'ladi) va qayta e'lon qilishni taqiqlaydi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `??=` operatori qachon o'zlashtirish bajaradi?
2. `[...arr]` spread operatori qaysi yili standartga kirgan? (ES6 - 2015, obyekt spread esa ES2018 da).
3. JavaScript-dagi yangi xususiyatlar taklifini qaysi komitet boshqaradi? (TC39 komiteti).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida modern JavaScript imkoniyatlaridan foydalanish bo'yicha ko'nikmalaringizni tekshiring.
