## 1. 💡 Sodda Tushuntirish va Analogiya

### Map, Set, WeakMap va WeakSet nima?
ES6 versiyasida JavaScriptga ma'lumotlarni yanada samaraliroq saqlash va boshqarish uchun 4 ta yangi ma'lumotlar tuzilmasi qo'shildi:
* **Map (Lug'at):** Kalit-qiymat (key-value) juftliklarini saqlaydi. Obyektdan farqi - istalgan turdagi qiymatni (hatto boshqa obyektni ham) kalit sifatida ishlata oladi.
* **Set (Unikal to'plam):** Faqat takrorlanmaydigan (unikal) qiymatlarni saqlaydi.
* **WeakMap (Kuchsiz lug'at):** Kaliti faqat obyekt bo'lishi mumkin va u xotirada kuchsiz saqlanadi (agar obyektga boshqa ishora qolmasa, u avtomatik xotiradan o'chadi).
* **WeakSet (Kuchsiz to'plam):** Faqat obyektlarni unikal va kuchsiz tarzda saqlaydi.

### Real hayotiy analogiya
* **Map:** Telefon kitobchasi. Odamning ismi (kalit) va uning raqami (qiymat). Obyektdan farqi - odamning rasmini (obyekt) ham kalit qilib yopishtirish mumkin!
* **Set:** Imtihonga kirgan talabalar ro'yxati. Bir talaba imtihonga 3 marta kelgan bo'lsa ham, ro'yxatda uning ismi faqat 1 marta unikal bo'lib qoladi.
* **WeakMap:** Vaqtincha saqlash kamerasi. Agar mehmon mehmonxonadan chiqib ketsa (obyekt xotiradan o'chirilsa), kameradagi uning yuklari (qiymat) ham avtomatik axlatga tashlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Map va Set yaratish)
```javascript
// Map yaratish
const userRoles = new Map();
const user = { name: "Ali" };
userRoles.set(user, "admin");
console.log(userRoles.get(user)); // "admin"

// Set yaratish va duplikatlarni tozalash
const numbers = new Set([1, 2, 2, 3, 3, 4]);
console.log([...numbers]); // [1, 2, 3, 4]
```

### 2. Intermediate Example (WeakMap va Xotira boshqaruvi)
```javascript
let guest = { name: "Zara" };
const guestVisits = new WeakMap();

// Obyektni kalit sifatida saqlaymiz
guestVisits.set(guest, 5);

// Agar guest obyektini o'chirsak:
guest = null;
// Endi guestVisits ichidagi ma'lumot ham avtomatik ravishda xotiradan o'chadi.
```

### 3. Advanced Example (WeakSet orqali faol ulanishlarni kuzatish)
```javascript
const activeConnections = new WeakSet();

let socket1 = { id: "ws_1" };
let socket2 = { id: "ws_2" };

activeConnections.add(socket1);
activeConnections.add(socket2);

console.log(activeConnections.has(socket1)); // true

// Socket yopilganda va xotiradan o'chirilganda:
socket1 = null; 
// activeConnections ichidan ham avtomatik o'chadi
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Hash Tables va Garbage Collection
* **Map/Set** elementlarni **Hash Table** orqali tartiblaydi, bu esa elementlarni qidirishni (`has`), o'chirishni (`delete`) va qo'shishni (`set`/`add`) massivlar kabi $O(N)$ emas, balki juda tezkor $O(1)$ tezlikda bajarish imkonini beradi.
* **WeakMap/WeakSet** Garbage Collector (axlat yig'uvchi) uchun to'siq bo'lmaydi. Oddiy `Map`da obyekt o'chirilgan taqdirda ham, u Map ichida kalit sifatida turgani uchun xotiradan butunlay o'chib ketmaydi (Memory Leak). `WeakMap` esa bu muammoni hal qiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Massivdagi takrorlangan ma'lumotlarni tozalash loyihasi
Foydalanuvchilar tomonidan kiritilgan unikal teglar (tags) ro'yxatini shakllantirish:

```javascript
const userTags = ["js", "react", "js", "html", "react", "css"];

// 1. Set yordamida unikal qilamiz
const uniqueTagsSet = new Set(userTags);

// 2. Set ni qaytadan massivga aylantiramiz (spread yordamida)
const cleanTags = [...uniqueTagsSet];

console.log(cleanTags); // ["js", "react", "html", "css"]
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. WeakMap ichida ibtidoiy (primitive) tiplarni kalit qilish
* **Noto'g'ri:**
  ```javascript
  const wm = new WeakMap();
  wm.set("key", 100); // TypeError: Invalid value used as weak map key
  ```
* **To'g'ri:**
  ```javascript
  const wm = new WeakMap();
  const keyObj = {};
  wm.set(keyObj, 100);
  ```

### 2. Obyekt kalitlarida reference farqini hisobga olmaslik
* **Noto'g'ri:**
  ```javascript
  const map = new Map();
  map.set({ id: 1 }, "Ma'lumot");
  console.log(map.get({ id: 1 })); // undefined! Chunki ikkita {} xotirada har xil manzilda.
  ```
* **To'g'ri:**
  ```javascript
  const map = new Map();
  const userKey = { id: 1 };
  map.set(userKey, "Ma'lumot");
  console.log(map.get(userKey)); // "Ma'lumot"
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyati | Map | Set | WeakMap | WeakSet |
| :--- | :--- | :--- | :--- | :--- |
| **Kalit turi** | Istalgan tip | Faqat qiymat | Faqat obyekt | Faqat obyekt |
| **Iteratsiya** | Mavjud | Mavjud | Yo'q | Yo'q |
| **size xossasi** | Mavjud | Mavjud | Yo'q | Yo'q |
| **Garbage Collected** | Yo'q | Yo'q | Ha | Ha |

---

## 7. ❓ Savollar va Javoblar

### 1. `Map` va `Object` farqi nimada?
Obyekt kalitlari faqat string yoki symbol bo'ladi, Map esa har qanday ma'lumot turini kalit qila oladi. Mapda elementlar sonini `size` orqali tezda olish mumkin.

### 2. Nima uchun WeakMap-ni loop orqali aylanib chiqib bo'lmaydi?
Chunki Garbage Collector fonda istalgan vaqtda kalit obyektlarni xotiradan o'chirib yuborishi mumkin. Bu esa aylanib chiqish jarayonida kutilmagan xatoliklar keltirib chiqaradi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. `Set` ichiga ikkita bo'sh obyekt `{}` qo'shilsa, uning `size` qiymati nechaga teng bo'ladi? (2 ga, chunki ular reference bo'yicha farq qiladi).
2. Qaysi holatlarda `Map`ni oddiy `Object`dan ko'ra afzal ko'rish kerak?
3. `WeakSet` qaysi muammoni hal qilishda qo'llaniladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar va testlar yordamida to'plamlar bilan ishlash ko'nikmalaringizni mustahkamlang.
