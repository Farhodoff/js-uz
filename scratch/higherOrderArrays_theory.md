## 1. 💡 Sodda Tushuntirish va Analogiya

### Massiv Helper Metodlari nima?
**Massiv Helper Metodlari (Higher-Order Array Methods)** — bu massivlar ustida turli xil operatsiyalarni (saralash, qidirish, o'zgartirish va yig'ish) sikllarsiz (`for` yoki `while`) va osonroq bajarish uchun xizmat qiladigan o'rnatilgan JavaScript funksiyalaridir. Ular callback funksiyalarni qabul qiladi.

### Real hayotiy analogiya
Tasavvur qiling, sizda **maktab o'quvchilari ro'yxati** bor:
* **`map` (Sertifikat berish):** Har bir o'quvchining ismini olib, unga moslab chiroyli tabriknoma (yangi massiv) yaratib chiqasiz.
* **`filter` (Saralash):** Ro'yxatdan faqat a'lochi o'quvchilarni ajratib olasiz.
* **`reduce` (Yig'indi):** Hamma o'quvchilarning imtihon ballarini qo'shib, bitta umumiy o'rtacha ballni hisoblaysiz.
* **`find` (Qidiruv):** Ro'yxatdan birinchi bo'lib ismi "Ali" bo'lgan o'quvchini topasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (map va filter)
```javascript
const numbers = [1, 2, 3, 4, 5];

// Har bir sonni 2 ga ko'paytirish (map)
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// Faqat juft sonlarni ajratish (filter)
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
```

### 2. Intermediate Example (reduce yordamida yig'indini hisoblash)
```javascript
const cart = [
  { name: "Telefon", price: 300 },
  { name: "G'ilof", price: 20 },
  { name: "Shisha", price: 10 }
];

// Savatchadagi umumiy summani hisoblash
const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log(total); // 330
```

### 3. Advanced Example (find, some, every va sort)
```javascript
const users = [
  { name: "Ali", age: 25 },
  { name: "Zara", age: 17 },
  { name: "Bobur", age: 30 }
];

// Birinchi 18 yoshdan oshgan foydalanuvchini topish (find)
const adult = users.find(u => u.age > 18); // { name: "Ali", age: 25 }

// Ro'yxatda voyaga yetmaganlar bormi? (some)
const hasMinors = users.some(u => u.age < 18); // true

// Yosh bo'yicha o'sish tartibida saralash (sort)
const sorted = [...users].sort((a, b) => a.age - b.age);
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Callback Context va Declarative Programming
Ushbu metodlar **declarative (tavsiflovchi)** dasturlash uslubiga kiradi. Biz JSga massiv elementlarini qanday aylanib chiqishni (`for` kabi) buyurmaymiz, balki natija qanday bo'lishi kerakligini yozamiz.
* **`map` va `filter`** har doim **yangi massiv** qaytaradi (original massiv o'zgarmaydi - immutability).
* **`reduce`** bitta yakuniy qiymat (son, string, obyekt yoki boshqa massiv) qaytaradi. U akkumulyatordan (yig'uvchi) foydalanadi.

> [!IMPORTANT]
> `sort()` metodi original massivni o'zgartiradi (mutable). Original massiv saqlanib qolishi uchun spread operatoridan nusxa olish tavsiya etiladi: `[...arr].sort()`.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Savatchadagi tovarlar uchun Chegirma va Filtrlash
Keling, narxi 100 dan katta tovarlarga 10% chegirma beramiz va umumiy summani hisoblaymiz.

```javascript
const products = [
  { id: 1, name: "Noutbuk", price: 1000 },
  { id: 2, name: "Klaviatura", price: 80 },
  { id: 3, name: "Monitor", price: 200 }
];

// 1. Narxi 100 dan yuqori tovarlarni olish
const expensive = products.filter(p => p.price > 100);

// 2. Ularga 10% chegirma berish
const discounted = expensive.map(p => ({
  ...p,
  price: p.price * 0.9
}));

// 3. Chegirmali tovarlar umumiy narxini hisoblash
const grandTotal = discounted.reduce((sum, p) => sum + p.price, 0);

console.log(grandTotal); // 1080 (900 + 180)
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. `map` ichida `return` yozishni unutish (jingalak qavslar bilan)
* **Noto'g'ri:**
  ```javascript
  const squares = [1, 2].map(n => { n * n }); // [undefined, undefined]
  ```
* **To'g'ri:**
  ```javascript
  const squares = [1, 2].map(n => n * n);
  // Yoki:
  const squares = [1, 2].map(n => { return n * n; });
  ```

### 2. `reduce` metodiga boshlang'ich qiymat bermaslik
Agar boshlang'ich qiymat berilmasa, massivning birinchi elementi akkumulyator bo'lib qoladi.
* **Noto'g'ri:**
  ```javascript
  const total = [{price: 10}].reduce((sum, item) => sum + item.price); // "[object Object]"
  ```
* **To'g'ri:**
  ```javascript
  const total = [{price: 10}].reduce((sum, item) => sum + item.price, 0); // 10
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod | Vazifasi | Qaytaradigan Natijasi | Originalni o'zgartiradimi? |
| :--- | :--- | :--- | :--- |
| `map` | Har bir elementni o'zgartirish | Yangi massiv | Yo'q |
| `filter` | Shartga moslarini ajratish | Yangi massiv | Yo'q |
| `reduce` | Elementlarni bitta qiymatga yig'ish | Yagona qiymat | Yo'q |
| `find` | Shartga mos birinchi elementni topish | Element yoki `undefined` | Yo'q |
| `some` | Kamida bitta mos element bormi? | `true` / `false` | Yo'q |
| `every` | Barcha elementlar mosmi? | `true` / `false` | Yo'q |
| `sort` | Elementlarni tartiblash | Tartiblangan massiv | **Ha** |

---

## 7. ❓ Savollar va Javoblar

### 1. `forEach` va `map` farqi nima?
`map` har doim o'zgartirilgan elementlardan iborat yangi massiv qaytaradi. `forEach` esa shunchaki elementlarni aylanib chiqadi va hech narsa qaytarmaydi (`undefined`).

### 2. `sort()` nima uchun sonlarni noto'g'ri saralaydi? (masalan, [10, 2] ni [10, 2] ko'rinishida qoldiradi)
Chunki `sort()` default holatda elementlarni string (matn) deb o'ylaydi va alifbo bo'yicha saralaydi. Sonlarni to'g'ri saralash uchun taqqoslovchi funksiya uzatish kerak: `.sort((a, b) => a - b)`.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qaysi metodlar original massivni o'zgartiradi?
2. `filter` metodi shartga mos element topa olmasa nima qaytaradi? (Bo'sh massiv `[]`).
3. `reduce` qanday ishlaydi va uning callback funksiyasi qanday parametrlarni oladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi topshiriqlarni bajarib, massiv metodlaridan foydalanish bo'yicha bilimlaringizni amalda tekshiring.
