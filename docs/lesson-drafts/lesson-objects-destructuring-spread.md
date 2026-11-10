# 📚 Obyektlar: Destructuring, Spread/Rest, Optional Chaining — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**Obyekt** — kalit (key) qiymat (value) juftliklar to'plami. `const obj = { name: "Ali", age: 25, address: { city: "Toshkent" } }`.

- **Destructuring (massiv va obyekt):** `const { name, age } = obj;` — obyektdan o'z-o'zini olish. Xos qilib olish: `const { name: userName } = obj;` — `name` → `userName`. Varsiyalar: `const { name, age, address: { city } } = obj;`. Default qiymat: `const { name, role = "user" } = obj;`. `const [a, b, ...rest] = arr;` — massiv destructuring.

- **Spread/Rest (...) — obyekt:** Spread — obyektni "yoyish" yoki qo'shish: `{ ...obj1, ...obj2 }`. Rest — funksiya parametrlarida hamda obyekt destructuringda qolgan qismlarni yig'ish: `const { a, ...rest } = obj;`.

- **Optional Chaining (?.):** `obj?.address?.city` — agar `obj` yoki `address` `null`/`undefined` bo'lsa, xato bo'lmaydi, `undefined` qaytaradi. `obj?.method?.()`. `arr?.[0]`.

- **Nullish Coalescing (??):** `val ?? "default"` — `val` `null` yoki `undefined` bo'lsa "default". `val || "default"` farqli — `0`, `""`, `false` ham falsy, `??` faqat `null`/`undefined`.

- **Obyekt metodlari:** `Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)`, `Object.assign({}, obj)`, `Object.freeze(obj)`, `Object.seal(obj)`, `Object.hasOwn(obj, key)`.

- **Shallow copy vs Deep copy:** `{ ...obj }` — qat'iy nusxa (shallow) — ichki obyektlar ref ekanligi saqlanadi. Deep copy — barcha ichki obyektlar ham yangi. `structuredClone(obj)` — zamonaviy deep copy (brauzer/Node).

- **Obyektlar — ref qilardi:** `obj1 = obj2` — ref teng, `obj1 === obj2` — `true`. Yangi obyekt — `{}`, Spread — yangi obyekt (ref o'zgarmaydi).

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Destructuring — obyekt
const user = { id: 1, name: "Ali", age: 25, role: "admin" };
const { name, age, role } = user;
console.log(name, age, role); // "Ali" 25 "admin"

// Rename + default
const { name: userName, age: userAge, role: userRole = "user" } = user;
console.log(userName, userRole); // "Ali" "admin"

// Nested destructuring
const profile = { user: { name: "Ali", address: { city: "Toshkent", zip: "100000" } } };
const { user: { name, address: { city } } } = profile;
console.log(city); // "Toshkent"

// Massiv destructuring + rest
const nums = [1, 2, 3, 4, 5];
const [first, second, ...rest] = nums;
console.log(first, second, rest); // 1, 2, [3,4,5]

// 2. Spread — qo'shish, merge
const defaults = { theme: "dark", lang: "uz" };
const userSettings = { lang: "uz", fontSize: 16 };
const merged = { ...defaults, ...userSettings }; // lang userSettings dan
console.log(merged); // { theme:"dark", lang:"uz", fontSize:16 }

// Spread — array merge
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1,2,3,4]

// Spread — qiymat o'zgartirish (immutable)
const updatedUser = { ...user, age: 26, status: "active" };
// user o'zgarmadi, yangi obyekt

// 3. Optional Chaining
const data = { user: { profile: null } };
console.log(data?.user?.profile?.name); // undefined — xato bo'lmaydi
console.log(data?.user?.profile?.name ?? "Noma'lum"); // "Noma'lum"

const items = [{ id: 1 }, null, { id: 3 }];
items.forEach(item => console.log(item?.id)); // 1, undefined, 3

// Method chaqiruvi
const obj = { greet: () => "Salom" };
obj?.greet?.(); // "Salam"
obj?.missingMethod?.(); // undefined (xato bo'lmaydi)

// 4. Nullish Coalescing
const count = 0;
console.log(count ?? 10);   // 0 (null/undefined emas)
console.log(count || 10);   // 10 (0 falsy)

const text = "";
console.log(text ?? "default"); // ""
console.log(text || "default"); // "default"

// 5. Object metodlari
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj));   // ['a','b','c']
console.log(Object.values(obj)); // [1,2,3]
console.log(Object.entries(obj)); // [['a',1],['b',2],['c',3]]

// Entries orqali aylanish
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});
// a 1
// b 2
// c 3

// Object hasOwn (yoki Object.prototype.hasOwnProperty)
console.log(Object.hasOwn(obj, "a")); // true
console.log(Object.hasOwn(obj, "x")); // false

// 6. Freeze / Seal
const frozen = Object.freeze({ name: "Ali", age: 25 });
frozen.name = "Vali"; // xato (strict mode da) yoki xotirada o'zgarmaydi
console.log(frozen.name); // "Ali"

const sealed = Object.seal({ name: "Ali" });
sealed.name = "Vali"; // ishlaydi (o'zgarish)
sealed.newProp = "x"; // qo'shish mumkin emas
delete sealed.name; // o'chirish mumkin emas
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Shallow copy — ichki obyekt ref
const obj = { user: { name: "Ali" } };
const copy = { ...obj };
copy.user.name = "Vali"; // original ham o'zgardi!
console.log(obj.user.name); // "Vali" — xato!

// XATO 2: Optional chaining orqali ushbu qiymatni assign qilish
const data = { user: null };
data?.user?.name = "Ali"; // xato! — data.user null, assignment qilmaydi

// XATO 3: ?? bilan || almashtirish
const count = 0;
const safeCount = count ?? 10;   // 0 — to'g'ri
const safeCount2 = count || 10;  // 10 — xato (0 bo'lsa ham!)

// XATO 4: Destructuring orqali re-assign bermoqchilik
const { name } = user;
// name = "Vali"; // ishlaydi, lekin bu original obyektni o'zgartirmaydi, local qiymatni o'zgartiradi (confusing!)

// XATO 5: Object.assign bilan keyingi qiymatlarni qo'shish
const obj = { a: 1 };
const copy = Object.assign({}, obj, { a: 2, b: 3 });
// a: 2 (qayerdan), b: 3 — o'qilishi oson, lekin spread ko'proq foydali

// XATO 6: Optional chaining mantiqiy operator bilan aralashtirish
const val = data?.user?.name || "Noma'lum";
// agar name "" (bo'sh satr) bo'lsa — "Noma'lum" qaytaradi — xato!
// To'g'ri: ?? or "Noma'lum"

// XATO 7: hasOwn ishlatmaslik — __proto__ charkashtirish
const obj = Object.create(null); // prototype yo'q
obj.hasOwnProperty("a"); // crash! — hasOwnProperty yo'q (null prototype)
// To'g'ri: Object.hasOwn(obj, "a")
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Destructuring** — obyekt/massivdan qismini olish, default qiymat, rename.
- **Nested destructuring** — ichki obyektlarga kirish, lekin errorga imlanmaslik (optional chaining bilan).
- **Spread** — merge, immutability (qiymat o'zgartirishda yangi obyekt), array merge.
- **Rest** — qolgan qismlarni yig'ish (`{ a, ...rest } = obj`).
- **Optional Chaining (?.)** — null/undefined xavfsiz o'tkazish.
- **Nullish Coalescing (??)** — `null`/`undefined` fallback, `||` emas.
- **Object metodlari** — `keys`, `values`, `entries`, `hasOwn`.
- **Deep copy** — `structuredClone(obj)` (ichki obyektlar ham), yoki JSON.parse/stringify (primitivlar, funksiya yo'q).
- **hasOwn** — `__proto__` charkashtirmaslik uchun.
- **Immutability** — yangi obyekt yaratish (spread), original saqlash.

### ❌ Noto'g'ri:

- **Shallow copy ichki obyektlarni qoplamaydi** — deep copy kerak.
- **Optional chaining assignment** — `?.` bilan assignment qilmaydi (xato).
- **?? vs ||** — `||` falsy qiymatlarni ham o'zgartiradi (`0`, `""`, `false`).
- **Destructuring assign qiymat lokal** — originalni o'zgartirmaydi (confusing).
- **hasOwnProperty** — `Object.create(null)` da crash. `Object.hasOwn` yoki `Object.prototype.hasOwnProperty.call(obj, key)` ishlatish.
- **Object.assign** qo'shimcha `{}` — spread ko'proq qulay.
- **Immutable ga ishonmaslik** — `user.age = 26` originalni o'zgartiradi, yoki `const user` bo'lsa ham ichki qiymat o'zgarishi mumkin.

## 🎩 Hayotiy o'xshatishlar

- **Destructuring = "Chiqishga samolyot":** Boshqacha qilib, obyekt yoki massiv "chin" belgilarni ajratib olish — `const { name } = obj` — "Menga faqat name ber" (qolganlari qoladi).
- **Spread = "Tushirish/mo'yash":** Bir to'plamlarni boshqasiga "yoyish" — `...defaults` + `...userSettings` = birgalikdagi to'plam.
- **Optional Chaining = "Yo'l bilan o'tkazish":** "Agar yo'l yo'q bo'lsa (null) — keyinchalik", xato qilmaydi — `data?.user?.profile?.name`.
- **Nullish Coalescing = "Zaxira option":** Agar qiymat mavjud emas (`null`/`undefined`) — "boshqa variant". Lekin `0` yoki `""` qiymatlar mavjud (empty).
- **Shallow vs Deep copy:** "Faxriy nusxa" — sirtgi miqdor (prop) nusxa — ichki obyektlar ref bo'lishi mumkin. "To'liq nusxa" — asboblar ham yangi.
- **Freeze/Seal:** "Mojekni qoplashing" (freeze) — hech qanday o'zgarish mumkin emas. "Hujjatni qoplashi" (seal) — yangi prop qo'shish va o'chirish mumkin emas, lekin mavjud prop o'zgarsa mumkin.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Obyekt ] --> B{ Qanday amal? }
    B --> B1[ Destructuring:\nconst {name, age} = obj\nconst [a, ...rest] = arr ]
    B --> B2[ Spread: { ...obj1, ...obj2 }\n[ ...arr1, ...arr2 ]\nconst {a, ...rest} = obj ]
    B --> B3[ Optional Chaining: obj?.prop?.method?.()\narr?.[0]\nfunc?.(args) ]
    B --> B4[ Nullish Coalescing: val ?? "default" ]
    B --> B5[ Object Metodlari:\nkeys/values/entries\nhasOwn, freeze, seal ]
    B --> B6[ Immutability:\nspread copy (shallow)\nstructuredClone (deep) ]
    
    B1 --> B1A[ O'z-o'zini olish\ndefault, rename ]
    B2 --> B2A[ Merge, array merge\nrest yig'ish ]
    B3 --> B3A[ Xavfsiz o'tkazish\nundefined qaytaradi ]
    B4 --> B4A[ null/undefined fallback\n0/""/false o'zgarish yo'q ]
    B5 --> B5A[ Ma'lumot, himoya ]
    B6 --> B6A[ original saqlash\nichki obyektlar ham ]\n\n
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
    style B6 fill:#e0f2f1,stroke:#00897b
```

**Diagrama tushuntirishi:** Obyekt bilan ishlash 6 ta asosiy usul:
1. **Destructuring** — obyekt/massivdan qismini olish (default, rename).
2. **Spread/Rest** — merge, array merge, rest yig'ish.
3. **Optional Chaining (?.)** — null/undefined xavfsiz o'tkazish.
4. **Nullish Coalescing (??)** — `null`/`undefined` fallback, `||` dan farqli.
5. **Object Metodlari** — `keys`, `values`, `entries`, `hasOwn`, `freeze`, `seal`.
6. **Immutability** — `spread` (shallow copy), `structuredClone` (deep copy).

## 🎙 Intervyu savollari va javoblari

### S1: Destructuring nima? Massiv va obyektda farqi?

**Javob:** Destructuring — obyekt yoki massivdan qiymatlarni ajratib olish sintaksisi. Obyektda `{ name, age } = obj` — kalit bilan. Massivda `[a, b, c] = arr` — indeks bilan. Obyektda rename ulushi bor: `{ name: userName } = obj`. Massivda rest ulushi: `[first, ...rest] = arr`.

### S2: Spread va Rest operatori (. . .) farqi?

**Javob:** Spread — "yoyish" (expand): `{ ...obj }`, `[...arr]`, funksiya arguments: `fn(...args)`. Rest — "yig'ish" (collect): funksiya parametrda `function fn(...args)`, destructuringda `const { a, ...rest } = obj`. Shunday qilib, spread o'rniga yoyish, rest o'rniga yig'ish.

### S3: Optional Chaining (?.) nima va qachon foydali?

**Javob:** `?.` — agar oldingi qiymat `null` yoki `undefined` bo'lsa, keyingi xossa/qidiruv yoki chaqiruv xato qilmaydi, `undefined` qaytaradi. `obj?.prop`, `obj?.method?.()`, `arr?.[0]`. Ko'p marta chiroqlashtirish (e.g., `data.user.profile.name`) xavfsiz qilish uchun foydali.

### S4: ?? (nullish coalescing) va || farqi?

**Javob:** `??` — `null` va `undefined` faqat! `val ?? "default"` — val null/undefined bo'lsa "default". `||` — barcha falsy qiymatlar (`0`, `""`, `false`, `null`, `undefined`, `NaN`). `val || "default"` — 0, "", false ham "default". Shuning uchun bazavson qiymatlar uchun `??` to'g'ri, boshqa holatlarda `||`.

### S5: Shallow copy va Deep copy farqi? Qanday qilish mumkin?

**Javob:** Shallow copy — qat'iy nusxa, `Object.assign({}, obj)` yoki `{ ...obj }`. Hozirgi prop qiymatlarni nusxa qiladi, lekin ichki obyektlar ref tarafidan saqlanib qoladi — `copy.inner.prop = "x"` original ham o'zgaradi. Deep copy — barcha ichki obyektlar ham yangi nusxa: `structuredClone(obj)` (zamonaviy brauzer/Node), yoki `JSON.parse(JSON.stringify(obj))` (funksiya, Date, RegExp yo'q). Shallow copy ko'p, deep copy faqat kerak bo'lsa.

### S6: Object.freeze va Object.seal farqi?

**Javob:** `Object.freeze(obj)` — prop larni o'zgarmas (read-only), qo'shish/qaytaoyish/o'chirish — xato (strict mode da). `Object.seal(obj)` — yangi prop qo'shish va existent prop o'chirish mumkin emas, lekin mavjud prop qiymatlarini o'zgartirish mumkin. Shuning uchun freeze — to'liq o'zgarmas; seal — faqat qo'shish/qaytaoyish/chiqarish garovi.

### S7: `Object.hasOwn` va `Object.prototype.hasOwnProperty` farqi?

**Javob:** `Object.hasOwn(obj, key)` — `Object.create(null)` bo'lgan obyektda ham ishlaydi (prototype yo'q bo'lsa ham). `obj.hasOwnProperty(key)` — `Object.create(null)` da crash (prototype yo'q, `hasOwnProperty` yo'q). Shuning uchun `Object.hasOwn` zamonaviy yondashuv; qadimgi `hasOwnProperty.call(obj, key)` ham mumkin. `__proto__` charkashtirmaslik uchun `Object.hasOwn`.

### S8: Object.entries qanday ishlaydi? Misol yozing.

**Javob:** `Object.entries(obj)` — `[[key, value], ...]` array qaytaradi. Masalan: `Object.entries({ a: 1, b: 2 })` → `[['a',1],['b',2]]`. Shunday qilib `Object.entries(obj).forEach(([key, value]) => ...)` yoki `Object.fromEntries(entries)` orqali obyektga qaytarish.

### S9: Destructuring qo'shimcha qo'shimcha bo'lishi mumkinmi (nested)?

**Javob:** Ha — `const { user: { name, address: { city } } } = obj;` — nested destructuring. Shunday qilib ichki obyektlarga mos ravishda kirish. Lekin `obj.user` null bo'lsa — chalkashlik (destructuring xato beradi). Shuning uchun ko'p marta optional chaining bilan: `const { user } = obj; const name = user?.name;` yoki `const { user } = obj || {};`.

### S10: `const { a, ...rest } = obj` qanday ishlaydi?

**Javob:** `const { a, ...rest } = obj` — `a` qiymatni ajratadi, `...rest` — qolgan barcha prop lar (a tashlab, qolganlar). Masalan: `const obj = { a:1, b:2, c:3 }; const { a, ...rest } = obj;` → `a = 1`, `rest = { b:2, c:3 }`. Shunday qilib rest — qolgan obyekt. Spread bilan mos keladi.

### 📌 Xulosa:

- **Destructuring** — obyekt/massivdan qismini olish (default, rename, nested).
- **Spread/Rest** — merge, array merge, rest yig'ish.
- **Optional Chaining (?.)** — null/undefined xavfsiz o'tkazish.
- **Nullish Coalescing (??)** — `null`/`undefined` fallback (0, "", false saqlanadi).
- **Shallow vs Deep copy** — `{...obj}` shallow, `structuredClone` deep.
- **Object metodlari** — `keys`, `values`, `entries`, `hasOwn`, `freeze`, `seal`.
- **Immutability** — spread bilan yangi obyekt, original o'zgarmaydi.

---

**Keyingi darslar (o'rta daraja):**
1. **Type System: Value vs Reference, Immutability, Shallow/Deep Copy (qo'shimcha chuqurlik)**
2. **Event Loop va Task Queue (Microtask vs Macrotask, setTimeout vs Promise)**
3. **Error Handling — Custom Error, Error Types, Debugging usullari**
4. **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying**
5. **this keyword va Context Binding — call, apply, bind, arrow functions, method borrowing**

Qaysi mavzuni keyingi dars qilishimiz kerak? Raqam yoki nom: 1, 2, 3, 4, 5.