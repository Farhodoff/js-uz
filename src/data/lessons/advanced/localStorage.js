export const localStorageLesson = {
  id: "a4",
  title: "Web Storage (LocalStorage va SessionStorage)",
  theory: `## Web Storage API

Web Storage brauzerda ma'lumotlarni kalit-qiymat (key-value) juftligi ko'rinishida saqlash imkonini beradi. Uning ikkita asosiy turi bor: **LocalStorage** va **SessionStorage**.

---

### 1. LocalStorage vs SessionStorage

| Xususiyat | LocalStorage | SessionStorage |
|-----------|--------------|----------------|
| **Muddati** | Ma'lumotlar o'chirilmaguncha saqlanadi. | Tab yoki brauzer yopilguncha saqlanadi. |
| **Qamrovi** | Barcha tablar va oynalarda bir xil (same origin). | Faqat ochilgan tab ichida amal qiladi. |
| **Hajmi** | Odatda 5MB - 10MB gacha. | Odatda 5MB gacha. |

---

### 2. Asosiy Metodlar

Ikkala storage ham bir xil metodlarga ega:

- \`setItem(key, value)\` – Ma'lumotni saqlash.
- \`getItem(key)\` – Kalit bo'yicha ma'lumotni olish.
- \`removeItem(key)\` – Kalit bo'yicha ma'lumotni o'chirish.
- \`clear()\` – Barcha ma'lumotlarni tozalash.
- \`key(index)\` – Indeks bo'yicha kalit nomini olish.
- \`length\` – Saqlangan elementlar soni.

### 3. Obyektlarni saqlash (JSON)
Web Storage faqat **string** qabul qiladi. Obyekt yoki massivlarni saqlash uchun ularni JSON formatiga o'tkazish kerak.

\`\`\`javascript
const user = { name: "Ali", age: 25 };

// Saqlash
localStorage.setItem("user", JSON.stringify(user));

// Olish
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // "Ali"
\`\`\`

---

### 4. Storage Event
Bitta oynada storage o'zgarganda, boshqa oynalarda (xuddi shu sayt ochilgan tablarda) \`storage\` hodisasi yuz beradi.

\`\`\`javascript
window.addEventListener('storage', (e) => {
  console.log(\`Kalit: \${e.key}, Eski: \${e.oldValue}, Yangi: \${e.newValue}\`);
});
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **LocalStorage va SessionStorage orasidagi farq nima?**
2. **Web Storage'da obyektlarni qanday saqlash mumkin?**
3. **Storage'dan barcha ma'lumotlarni qanday tozalash mumkin?**

### Middle daraja
4. **Cookies va LocalStorage farqi nimada? Qaysi biri xavfsizroq?**
5. **Storage limitidan oshib ketganda nima sodir bo'ladi?** (Javob: \`QuotaExceededError\`)
6. **XSS hujumlari va LocalStorage o'rtasidagi bog'liqlik nima?**`,
  task: `// 1. LocalStorage'ga "theme" kaliti bilan "dark" qiymatini saqlang.
// 2. SessionStorage'ga foydalanuvchi "session_id"sini (ixtiyoriy son) saqlang.
// 3. Quyidagi massivni LocalStorage'ga saqlang va qayta o'qib oling:
const colors = ["red", "green", "blue"];

// 4. "user_settings" nomli obyekt yarating va uni storage'ga saqlang.
// 5. Biror kalitni o'chiring va storage bo'shligini tekshiring.

// Kodingizni shu yerga yozing`,
  hint: `// 1 & 2. Simple storage
localStorage.setItem("theme", "dark");
sessionStorage.setItem("session_id", "12345");

// 3. Array in Storage
const colors = ["red", "green", "blue"];
localStorage.setItem("colors", JSON.stringify(colors));
const retrievedColors = JSON.parse(localStorage.getItem("colors"));

// 4. Object in Storage
const settings = { lang: "uz", fontSize: 16 };
localStorage.setItem("user_settings", JSON.stringify(settings));

// 5. Remove
localStorage.removeItem("theme");
console.log(localStorage.length);`
};
