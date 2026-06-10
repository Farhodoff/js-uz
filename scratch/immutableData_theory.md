## 1. 💡 Sodda Tushuntirish va Analogiya

### Immutability nima?
**Immutability (O'zgarmaslik)** — bu ma'lumotlar strukturasini (obyektlar va massivlarni) xotirada to'g'ridan-to'g'ri o'zgartirmaslik (mutatsiya qilmaslik) tamoyilidir. Agar ma'lumotga o'zgartirish kiritish kerak bo'lsa, asl ma'lumot saqlanib qolib, undan nusxa olinadi va o'zgartirilgan yangi nusxa yaratiladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **shartnoma yozyapsiz**:
* **Mutatsiya (Mutable - O'zgaruvchan):** Siz yozilgan qog'ozdagi shartnoma matnini ruchka bilan chizib, ustidan yangi so'zlarni yozasiz. Eskisi buziladi va aslini qayta tiklab bo'lmaydi.
* **O'zgarmaslik (Immutable - O'zgarmas):** Siz eski shartnomadan printer orqali nusxa (copy) olasiz. Yangi qog'oz nusxasiga o'zgartirish kiritasiz. Natijada sizda eski shartnoma ham asl holida, yangi shartnoma ham o'zgartirilgan holida saqlanib qoladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Shallow Copy va Mutatsiya muammosi)
```javascript
const user = { name: "Ali", age: 25 };

// Mutatsiya (Yomon amaliyot - asl obyektni buzadi):
// user.age = 26;

// Immutable yangilash (Yaxshi amaliyot - yangi nusxa oladi):
const updatedUser = { ...user, age: 26 };

console.log(user.age);        // 25 (Asli o'zgarmadi!)
console.log(updatedUser.age); // 26 (Yangisi o'zgardi)
```

### 2. Intermediate Example (Deep Copy - structuredClone)
Spread operatori faqat birinchi darajali nusxa oladi (Shallow Copy). Ichki obyektlarni to'liq nusxalash uchun `structuredClone` ishlatiladi:
```javascript
const original = {
  name: "Ali",
  address: { city: "Tashkent" }
};

// Chuqur nusxa olish
const deepCopy = structuredClone(original);
deepCopy.address.city = "Samarkand";

console.log(original.address.city); // "Tashkent" (Asli xavfsiz!)
console.log(deepCopy.address.city); // "Samarkand"
```

### 3. Advanced Example (Massivlarni xavfsiz o'zgarmas yangilash)
Asl massivni o'zgartiruvchi metodlar (`push`, `splice`, `sort`) o'rniga, yangi massiv qaytaruvchilarni ishlatish:
```javascript
const list = [1, 2, 3];

// 1. Element qo'shish (Add)
const added = [...list, 4]; // [1, 2, 3, 4]

// 2. Element o'chirish (Remove)
const removed = list.filter(item => item !== 2); // [1, 3]

// 3. Element o'zgartirish (Update)
const updated = list.map(item => item === 3 ? 30 : item); // [1, 2, 30]
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Reference vs Value (Manzil va Qiymat)
JavaScript-da primitiv turlar (Number, String, Boolean, null, undefined) qiymat bo'yicha solishtiriladi va nusxalanadi. Obyektlar va massivlar esa xotiradagi manzili (**Reference**) bo'yicha ishlaydi.
Agar siz `const copy = original` deb yozsangiz, yangi obyekt yaratilmaydi, shunchaki xotiradagi bitta manzilga ikkinchi ishora yaratiladi.

> [!IMPORTANT]
> `JSON.parse(JSON.stringify(obj))` orqali deep copy qilish funksiyalar va Date obyektlari bilan ishlashda xatoliklar beradi. Zamonaviy JavaScript-da har doim `structuredClone()` tavsiya etiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Ichma-ich joylashgan state'ni xavfsiz yangilash
React-da holatni (state) boshqarishda nested obyektni o'zgarmas yangilash:

```javascript
const state = {
  theme: "dark",
  user: {
    name: "Farhod",
    profile: {
      score: 10
    }
  }
};

// Profil score qiymatini 15 ga o'zgarmas usulda oshiramiz
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      score: 15
    }
  }
};

console.log(state.user.profile.score);    // 10 (asli saqlandi)
console.log(newState.user.profile.score); // 15
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. `sort()` original massivni o'zgartirishini bilmaslik
* **Noto'g'ri:**
  ```javascript
  const numbers = [3, 1, 2];
  const sorted = numbers.sort(); // numbers ham [1, 2, 3] bo'lib o'zgarib ketdi!
  ```
* **To'g'ri:**
  ```javascript
  const numbers = [3, 1, 2];
  const sorted = [...numbers].sort(); // nusxa olib keyin saralash
  ```

### 2. Shallow copy yordamida nested obyektni o'zgartirish
* **Noto'g'ri:**
  ```javascript
  const copy = { ...user };
  copy.address.city = "Bukhara"; // original user.address.city ham o'zgaradi!
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Operatsiya | Mutatsiya qiluvchi (Yomon) | Immutable (Yaxshi) |
| :--- | :--- | :--- |
| Element qo'shish | `arr.push(x)` | `[...arr, x]` |
| Element o'chirish | `arr.splice(i, 1)` | `arr.filter((_, idx) => idx !== i)` |
| Element o'zgartirish | `arr[i] = new` | `arr.map((val, idx) => idx === i ? new : val)` |
| Obyekt nusxalash (Deep) | - | `structuredClone(obj)` |
| Muzlatish | - | `Object.freeze(obj)` (Shallow) |

---

## 7. ❓ Savollar va Javoblar

### 1. React-da nega o'zgarmaslik (immutability) o'ta muhim?
React holat o'zgarganini tezkor tekshirish uchun xotiradagi manzillarni solishtiradi (`oldState === newState`). Agar mutatsiya qilsak, manzil o'zgarmaydi va React sahifani qayta render qilmaydi.

### 2. `Object.freeze()` chuqur (deep) muzlatadimi?
Yo'q, u faqat sayoz (shallow) muzlatadi. Obyekt ichidagi boshqa ichki obyektlarni o'zgartirish imkoniyati saqlanib qoladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `[1, 2] === [1, 2]` nima uchun false qaytaradi?
2. `structuredClone` qaysi ma'lumot turlarini nusxalay olmaydi? (Funksiyalar va DOM elementlari).
3. Massivdan sayoz nusxa olishning 3 xil usulini ayting.

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy topshiriqlarni bajarib, immutability va nusxalash bo'yicha ko'nikmalaringizni sinab ko'ring.
