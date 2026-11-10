# 📚 TypeScript asoslari — tip, interface, type alias — JS keyingi bosqich

## 📦 Tushunchalarning sodda izohi

JavaScriptda o'zgaruvchilar **qiymatni saqlamaydi**, balki **qaysi joyga yo'nalganligini (reference) yoki qiymatni o'zi** saqlaydi. Ikki xil:

- **Primitivlar (Primitive types)** — qiymat bo'yicha saqlanadi: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. Bir obyektning qiymati o'zgarganda — boshqasi o'zgarmaydi.
- **Rahbarli obyektlar (Reference types)** — `object`, `array`, `function` — **reference** (xotiradagi manzil) saqlanadi. `const arr1 = [1,2]; const arr2 = arr1;` — `arr2` ham xotiradagi **bir xil joy**ni ko'zatadi. O'zgarganda ikkalasi ham o'zgardi.

Masalan: `let a = 10; let b = a; b = 20;` — `a` o'zgarmaydi (10). `const obj1 = { x: 1 }; const obj2 = obj1; obj2.x = 2;` — `obj1.x` ham 2 ga o'zgardi (bir xil obyektni ko'zatgan).

### **Immutability (O'zgarmaslik)** — qiymat o'zgarmasligi. }
- **Primitive** — o'zgarmas (immutable): `10` o'zgarmaydi — yangi qiymat yaratiladi.
- **Obyekt/array** — o'zgaruvchan (mutable): `obj.prop = "y"` yoki `arr.push(5)` — original o'zgardi.
- **Draft promise / Draft immutable** — immutable uslubda yozish (yangilik yangi obyekt yaratish, original o'zgarmaydi).

### **Nusxa (Copy)** — obyektning nusxasini yaratish. }
- **Shallow copy (Qat'iy nusxa)** — dastlabki prop lar nusxalanadi, lekin ichki obyektlar **reference** (ref) tarafidan saqlanadi. Masalan: `{ ...obj }`, `Object.assign({}, obj)`. Ichki obyekt o'zgarganda original ham o'zgaradi.
- **Deep copy (To'liq nusxa)** — barcha ichki obyektlar ham yangi nusxa (qayta yaratilgandi). Masalan: `structuredClone(obj)`, `JSON.parse(JSON.stringify(obj))`.

### **Copy qachon kerak?}
- Obyektni o'zgartirmaslik (immutable) — originalni saqlash.
- React state — immutable update ( newState = { ...state, prop: value } ).
- Debugging — original o'zgarmasligi kerak.

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Primitiv — qiymat (value)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (o'zgarmadi)
console.log(b); // 20

// 2. Reference — ikkalasi ham bir xil
const obj1 = { x: 1 };
const obj2 = obj1;          // reference (manzil) nusxa
obj2.x = 2;
console.log(obj1.x);        // 2 — ham o'zgardi!
console.log(obj1 === obj2); // true (bir xil ref)

// 3. Shallow copy (qat'iy nusxa)
const user = { name: "Ali", address: { city: "Toshkent" } };
const shallow = { ...user }; // yoki Object.assign({}, user)
shallow.name = "Vali";       // name o'zgardi (primitiv)
shallow.address.city = "Samarqand"; // ichki obyekt ref — original ham o'zgardi!
console.log(user.address.city); // "Samarqand" — original ham o'zgardi!
console.log(user === shallow); // false (yangi obyekt)

// 4. Deep copy — structuredClone
const data = { users: [{ name: "Ali" }, { name: "Vali" }] };
const deep = structuredClone(data); // zamonaviy, ichki barchasi yangi
deep.users[0].name = "Olim";
console.log(data.users[0].name); // "Ali" (original o'zgarmadi!)
console.log(data === deep);      // false

// 5. Deep copy — JSON way (cheklovlar bilan)
const obj = { a: 1, b: [1, 2], c: { d: true } };
const jsonCopy = JSON.parse(JSON.stringify(obj)); // funksiya, Date, undefined yo'q
jsonCopy.b.push(3);
console.log(obj.b); // [1,2] (original o'zgarmadi!)

// 6. Immutable update (yangi obyekt)
const state = { count: 0, user: { name: "Ali" } };
// NOTO'GR: state.user.name = "Vali"; // original o'zgardi
// TO'G'RI:
const newState = { ...state, user: { ...state.user, name: "Vali" } };
console.log(state.user.name);  // "Ali"
console.log(newState.user.name); // "Vali"

// 7. Array — shu xil (reference)
const arr1 = [1, 2, [3, 4]];
const arr2 = arr1;             // ref
arr2.push(5);
console.log(arr1); // [1,2,[3,4],5] — original ham o'zgardi!
console.log(arr1 === arr2); // true

// Array shallow copy
const arrCopy = [...arr1];     // yoki arr1.slice(), arr1.toSpliced()
arrCopy.push(6);
console.log(arr1); // [1,2,[3,4],5] (o'zgarmadi)
arrCopy[2].push(99); // ichki array — ref!
console.log(arr1[2]); // [3,4,99] (original ham o'zgardi!)

// 8. QA: Object.keys, values, entries — nusxa emas, faqat ma'lumot
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj); // ['a', 'b'] — nusxa emas, faqat kalitlar ro'yxati
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Reference bilan ishlashda original o'zgarishi mumkin
function updateUser(user) {
  user.name = "NewName"; // original o'zgardi!
  return user;
}
const u = { name: "Ali" };
updateUser(u);
console.log(u.name); // "NewName" (xato!)

// XATO 2: Shallow copy ichki obyektni qoplamaydi
const obj = { nested: { val: 10 } };
const copy = { ...obj };
copy.nested.val = 20;
console.log(obj.nested.val); // 20 — xato (original o'zgardi!)

// XATO 3: JSON.stringify — funksiya, Date, undefined yo'qotadi
const obj = { name: "Ali", fn: () => 1, date: new Date(), nothing: undefined };
const copy = JSON.parse(JSON.stringify(obj));
console.log(copy); // { name: "Ali", date: (string) } — funksiya, undefined yo'q!

// XATO 4: "=" bilan "copy" xato
const arr1 = [1, 2, 3];
const arr2 = arr1; // // ref!
arr2.length = 0;
console.log(arr1); // [] — original ham bo'sh!

// XATO 5: Deep copy ni ishlatmaslik — ichki obyekt o'zgaradi
const data = { items: [{ id: 1 }] };
const copy = { ...data }; // shallow
copy.items[0].id = 99;
console.log(data.items[0].id); // 99 — original o'zgardi!

// XATO 6: Immutable ga ishonmaslik
const arr = [1, 2, 3];
const sorted = arr.sort(); // original o'zgardi!
// arr = [1,2,3] (to'g'ri tartibda) lekin original o'zgardi!
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Primitiv qiymat** — `let a = 10; let b = a;` — o'zgaruvchan emas (o'zgarish boshqa o'zgaruvchiga ta'sir qilmaydi).
- **Reference** — `arr1 = arr2` — bir xil obyektni ko'zatadi, o'zgarganda ikkalasi ham o'zgardi.
- **Shallow copy** — `{ ...obj }`, `Object.assign({}, obj)`, `arr.slice()`, `[...arr]` — dastlabki prop lar nusxa, lekin ichki obyektlar ref.
- **Deep copy** — `structuredClone(obj)` (zamonaviy, funksiya/Dates yo'q), `JSON.parse(JSON.stringify(obj))` (funksiya yo'q, Date string ga o'giriladi).
- **Immutable update** — yangi obyekt yaratish: `{ ...state, prop: value }`, `arr.toSpliced()`.
- **Copy kerakligini anglash** — original o'zgarishi kerakmasa, copy qilish.
- **Array.sort() original o'zgartiradi** — `[...arr].sort()` yoki `arr.toSorted()` (ES2023) copy bilan.
- **QA: keys/values/entries** — nusxa emas, faqat ma'lumot.

### ❌ Noto'g'ri:

- **Reference bilan originalni o'zgartirish** — `obj.prop = "y"` original ham o'zgardi.
- **Shallow copy ichki obyektni qoplamaydi** — `copy.inner.prop = "x"` original ham o'zgardi.
- **JSON.stringify** — funksiya, Date, undefined, symbol yo'qotiladi, Date string ga o'giriladi (xato).
- **bach "=" bilan nusxa** — ref, original o'zgarishi mumkin.
- **sort original o'zgartiradi** — qo'lda emas `[...arr].sort()` yoki `toSorted()`.
- **Immutable ga ishonmaslik** — originalni o'zgarmaydigan deb hisoblamaslik.

## 🎩 Hayotiy o'xshatishlar

- **Qiymat (Primitive)** — "haqiqat raqami": `10` raqam o'zgarmaydi — yangi raqam yaratiladi. `a = 10`, `b = a`, `b = 20` — `a` hammasiga raqam saqlanadi, `b` yangi raqamga yo'naltirilmoqda, `a` eski raqam.
- **Reference (Obyekt/Array)** — "hajm uchun kofsh (quloch)": `obj1 = { x: 1 }` — "zaxira (bolim) hosil qilingan". `obj2 = obj1` — ikkala "keshish" (reference) bir xil "boshqaruvchi" (hajm) ni ko'zatadi. `obj2.x = 2` — hajm ichidagi qiymat o'zgardi, ikkalasi ham "bir xil narsa"ni ko'zatadi.
- **Shallow copy vs Deep copy:** "Qalqon nusxa" — tashqi qavat nusxa (ichki qavatlar esa "ojima" qilib, bir xil). "To'liq nusxa" — barcha ichki qavatlar ham yangi.
- **Immutability:** "Kitob" o'zi o'zgarmas (immutable) — yangi "qo'shimcha" yaratish, eski "kitob" saqlanib qoladi (state). React va zamonaviy uslubda — "state update" yangi obyekt yaratish (original saqlanadi).

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ O'zgaruvchi ] --> B{ Tur turi }
    B --> C1[ Primitiv (string, number, boolean, null, undefined, symbol, bigint) ]
    B --> C2[ Reference (object, array, function) ]
    
    C1 --> D1[ Qiymat saqlanadi (xotirada o'zi) ]
    C1 --> E1[ b = a; b = 20 --> a o'zgarmaydi ]
    
    C2 --> D2[ Reference (xotira manzil) saqlanadi ]
    C2 --> E2[ obj2 = obj1; obj2.x = 2 --> obj1.x ham o'zgardi ]
    
    D1 --> F[ IMMUTABLE — qiymat o'zgarmaydi ]
    D2 --> G1[ Mutable — o'zgarmaslik kerak bo'lsa ]
    G1 --> H1[ Shallow copy: {...obj}, Object.assign, arr.slice(), [...arr] ]
    G1 --> H2[ Deep copy: structuredClone(obj), JSON.parse(JSON.stringify(obj)) ]
    
    H1 --> I1[ Ichki obyektlar ref — original ham o'zgardi ]
    H2 --> I2[ Barcha ichki obyektlar yangi — original o'zgarmaydi ]
    
    I1 --> J1[ Originalni saqlash kerak bo'lsa: Deep copy ]
    I2 --> J2[ State (React) — immutable update\\n    newState = { ...state, prop: 1 } ]
    
    style F fill:#c8e6c9,stroke:#2e7d32
    style G1 fill:#fff3e0,stroke:#e65100
    style H1 fill:#e3f2fd,stroke:#1976d2
    style H2 fill:#f3e5f5,stroke:#7b1fa2
    style I1 fill:#ffebee,stroke:#c62828
    style I2 fill:#e8f5e9,stroke:#2e7d32
```

**Diagrama tushuntirishi:** Qiymat (primitive) va reference (object/array) farqi:
- **Primitiv** — qiymat o'zi saqlanadi — `b = a; b = 20` — `a` o'zgarmaydi (immutable).
- **Reference** — xotira manzil saqlanadi — `obj2 = obj1` bir xil obyektni ko'zatadi — o'zgarganda ikkalasi ham o'zgardi (mutable).
- **Shallow copy** — prop lar nusxa, ichki obyektlar ref — ichki o'zgarish originalni ham o'zgartiradi.
- **Deep copy** — barcha ichki obyektlar ham yangi nusxa — original o'zgarmaydi.
- **State (React)** — immutable update — yangi obyekt yaratish.

## 🎙 Intervyu savollari va javoblari

### S1: Primitive va Reference farqi nima? Misol yozing.

**Javob:** Primitive (string, number, boolean, null, undefined, symbol, bigint) — qiymat (value) bo'yicha saqlanadi. `let a = 10; let b = a; b = 20;` — `a` o'zgarmaydi (10). Reference (object, array, function) — xotiradagi "manzil" (reference) saqlanadi. `const obj1 = { x: 1 }; const obj2 = obj1; obj2.x = 2;` — `obj1.x` ham 2 ga o'zgardi (bir xil obyekt). Shunday qilib, primitive o'zgarmaydi, reference o'zgarganda original ham o'zgaradi.

### S2: Shallow copy va Deep copy farqi? Qanday qilish mumkin?

**Javob:** Shallow copy — dastlabki prop lar nusxalanadi, lekin ichki obyektlar "reference" shaklida saqlanadi. Masalan: `{ ...obj }`, `Object.assign({}, obj)` — `copy.nested.val = 10` original ham o'zgardi. Deep copy — ichki barcha obyektlar ham yangi nusxa. `structuredClone(obj)` (zamonaviy, brauzer/Node) yoki `JSON.parse(JSON.stringify(obj))` (funksiya, Date, undefined yo'q).

### S3: `const user = { name: "Ali" }; const copy = { ...user }; copy.name = "Vali"; console.log(user.name);` — qanday chiqadi?

**Javob:** "Ali" — `copy.name` o'zgardi (local prop), `user.name` o'zgarmadi (spread — yangi obyekt, `name` primitiv). Lekin agar `user.address = { city: "Toshkent" }` bo'lsa va `copy.address.city = "Samarqand"` bo'lsa — original ham o'zgardi (ichki ref).

### S4: `const arr = [1, [2, 3]]; const copy = [...arr]; copy[1].push(4); console.log(arr[1]);` — qanday chiqadi?

**Javob:** `[2, 3, 4]` — spread — yangi array, lekin ichki array `[2,3]` ref. `copy[1].push(4)` orqali ichki ref o'zgaradi, original `arr[1]` ham o'zgardi ([2,3,4]).

### S5: `structuredClone` nima va qanday holatlarda foydali?

**Javob:** `structuredClone(obj)` — zamonaviy deep copy (chuqur nusxa). Ichki barcha obyektlar ham yangi. `undefined`, `function`, `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer` — barchasi yaxshi ishlaydi (ba'zi cheklovlar). `JSON.parse(JSON.stringify(obj))` dan farqli o'laroq — funksiya, Date, `undefined` saqlanadi (Date yagona "string" qilmaydi, obyekt bo'lishi shart). Lekin `structuredClone` ishonchli, zamonaviy.

### S6: JSON.stringify yordamida deep copy qilishda muammolar nima?

**Javob:** `JSON.parse(JSON.stringify(obj))` — funksiya, Symbol, `undefined` yo'qotiladi. `Date` — string ga o'giriladi (`"2026-10-17T00:00:00.000Z"`). `Map`, `Set`, `RegExp`, `ArrayBuffer`, `BigInt` — qayta yaratilmaydi, xato yoki "object" bo'lib qoladi. Shuning uchun zamonaviy `structuredClone` yaxshiroq; yoki `JSON` holda faqat "simple" obyektlar (primitivlar, ichki obyektlar).

### S7: React state da immutable update nima uchun muhim?

**Javob:** React `state` o'zgarganda — yangi obyekt/array yaqinlashtirish (shallow compare) bilan "o'zgarishni aniqlaydi". Agar original obyekt o'zgarsa (ref o'zgarmaydi), React o'zgarishni "ko'rmaz" — UI yangilanganda "qayta render" bo'lmaydi. Shuning uchun `setState(newState)` — yangi obyekt (reference o'zgarmoqchi). Masalan: `setUsers([...users, newUser])` — yoki `setState({ ...state, count: state.count + 1 })`. Shunday qilib React o'zgarishni ko'radi, UI yangilanganda.

### S8: `Array.sort()` original o'zgartiradi — qanday o'lchash mumkin?

**Javob:** `sort()` — original array ni tartiblaydi (o'zgarmaydi). Agar original saqlanishi kerak bo'lsa — `[...arr].sort()` yoki `arr.toSorted()` (ES2023 — yangi array qaytaradi, original o'zgarmaydi). Shunday qilib, `sort()` — mutatsion (o'zgaruvchan), `toSorted()` — immutable.

### S9: `Object.keys`, `Object.values`, `Object.entries` nusxa beradimi?

**Javob:** Yo'q — barchasi nusxa emas. `Object.keys(obj)` — kalitlar array qaytaradi (yagona "natija", boshqa ref yo'q). `Object.values(obj)` — qiymatlar array. `Object.entries(obj)` — `[[key, value], ...]` array. Bular `obj` ni o'zgartirmaydi, faqat "qo'sh" (qiymatlar yoki kalitlar). Shunday qilib, nusxa emas — faqat "ma'lumot" yig'ish.

### S10: Immutability saqlashda qanday yondashuv (praktika)?

**Javob:** Immutability — obyekt/array o'zgarmaslik. Praktiqa: `const newState = { ...state, prop: value };` (yoki `structuredClone` yoki `Object.freeze` yordamida himoya). Arrayda: `arr.toSpliced()`, `[...arr]`, `arr.filter()`, `arr.map()` — barchasi yangi array qaytaradi. Shunday qilib, original o'zgarmaydi — saqlash. Zamonaviy React, Zustand, Redux — barchasi immutable uslubida yoziladi.

### 📌 Xulosa:

- **Primitiv** — qiymat, `b = a` — boshqa o'zgaruvchi o'zgarganda a o'zgarmaydi.
- **Reference** — `obj2 = obj1` — ikkalasi ham bir xil obyekt — o'zgarganda ikkalasi ham o'zgardi.
- **Shallow copy** — prop lar nusxa, ichki obyektlar ref (ichki o'zgarganda original ham o'zgardi).
- **Deep copy** — `structuredClone` yoki JSON (cheklovlar bilan).
- **Immutable update** — yangi obyekt yaratish, original saqlanadi.
- `sort()`, `push()`, `splice()` — original o'zgartiradi — copy bilan ishlash.
- React state — immutable (yangi obyekt yaratish).

---

**Keyingi darslar (o'rta daraja) — ketma-ketlik:**
1. ✅ Value vs Reference (bu dars)
2. **Event Loop (Task Queue, Microtask, setTimeout vs Promise, event loop mexanizmi)**
3. **Error Handling — Custom Error, Error Types, Debugging usullari**
4. **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying**
5. **this keyword va Context Binding — call, apply, bind, arrow functions, method borrowing**

Qaysi mavzu keyingi? Raqam (2, 3, 4, 5) yoki nom.