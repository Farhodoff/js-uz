## 1. 💡 Sodda Tushuntirish va Analogiya

### Intl API nima?
**Intl (Internationalization) API** — bu JavaScript-ga o'rnatilgan va veb-ilovani turli davlatlar (lokallar) madaniy formatlariga avtomatik tarzda moslashtiruvchi maxsus obyektdir. U raqamlar, valyutalar, sanalar, nisbiy vaqtlar va ro'yxatlarni hech qanday tashqi kutubxonalarsiz (masalan, og'ir `moment.js`iz) formatlab beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **xalqaro tarjimonisiz**:
* **Kutubxonalardan foydalanish (Eski/Og'ir usul):** Har bir davlatdan (AQSH, Germaniya, Yaponiya) kelgan sayyoh bilan gaplashish uchun uyingizdan qalin tarjima lug'atlarini (70KB lik og'ir JS paketlarini) yuklab ko'tarib yurasiz.
* **Intl API (Modern/Optimal usul):** Sizning miyangizda barcha tillar va ularning madaniy qoidalari (sanalar, raqamlar yozilishi) oldindan o'rnatilgan. Sayyoh kelib pasportidagi kodini (masalan, `uz-UZ` yoki `en-US`) ko'rsatishi bilan u tushunadigan tilda va pul birligida gapirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sonlarni mingliklarga bo'lish - NumberFormat)
```javascript
const number = 1250500.75;

// O'zbekiston formati (bo'shliq va vergul bilan)
const uzFormatter = new Intl.NumberFormat("uz-UZ");
console.log(uzFormatter.format(number)); // "1 250 500,75"

// AQSH formati (vergul va nuqta bilan)
const usFormatter = new Intl.NumberFormat("en-US");
console.log(usFormatter.format(number)); // "1,250,500.75"
```

### 2. Intermediate Example (Valyutalarni formatlash - Currency)
Narxlarni davlat valyutasiga mos formatlash:
```javascript
const price = 450000;

// O'zbek so'mida formatlash
const sumFormatter = new Intl.NumberFormat("uz-UZ", {
  style: "currency",
  currency: "UZS"
});
console.log(sumFormatter.format(price)); // "450 000,00 UZS"

// AQSH dollarida formatlash
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
console.log(usdFormatter.format(120.50)); // "$120.50"
```

### 3. Advanced Example (DateTimeFormat va RelativeTimeFormat)
```javascript
// 1. Sana formatlash
const today = new Date("2026-06-10");
const uzDate = new Intl.DateTimeFormat("uz-UZ", { dateStyle: "full" });
console.log(uzDate.format(today)); // "chorshanba, 2026-yil 10-iyun"

// 2. Nisbiy vaqt formatlash ("2 daqiqa oldin")
const rtf = new Intl.RelativeTimeFormat("uz-UZ", { numeric: "auto" });
console.log(rtf.format(-5, "minute")); // "5 daqiqa oldin"
console.log(rtf.format(-1, "day"));    // "kecha"
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### CLDR (Common Locale Data Repository)
Intl API brauzerning o'ziga o'rnatilgan **CLDR** (Unicode Common Locale Data Repository) ma'lumotlar bazasidan foydalanadi. Ushbu baza dunyodagi deyarli barcha tillar, sanalar va valyuta qoidalarini o'z ichiga oladi. Dasturchi kod yozganida, JS dvigateli ushbu lokal ma'lumotlarini to'g'ridan-to'g'ri tizim xotirasidan o'qiydi.

> [!IMPORTANT]
> `new Intl.NumberFormat` yoki `new Intl.DateTimeFormat` obyektlarini yaratish CPU resursi uchun ancha og'ir jarayondir. Shuning uchun, ularni loop (tsikl) ichida qayta-qayta yaratmasdan, loop-dan tashqarida bir marta yaratib keshlab qo'yish (Memoization) shart.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi brauzeri tilini aniqlash va formatlash
Foydalanuvchining shaxsiy tilidan kelib chiqib dynamic valyuta formatlovchi yozamiz.

```javascript
// 1. Foydalanuvchi brauzer tilini aniqlaymiz (default: uz-UZ)
const userLocale = navigator.language || "uz-UZ";

// 2. Formatterni keshlaymiz
const currencyFormatter = new Intl.NumberFormat(userLocale, {
  style: "currency",
  currency: "USD"
});

console.log(currencyFormatter.format(100)); // Masalan: "$100.00" (en-US bo'lsa)
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Valyuta belgilashda ISO kodlaridan foydalanmaslik
* **Noto'g'ri:**
  ```javascript
  const formatter = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "som" }); // RangeError!
  ```
* **To'g'ri (ISO 4217 standarti bo'yicha 3 harfli kodlar):**
  ```javascript
  const formatter = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS" });
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Konstruktor | Options xossasi | Asosiy Vazifasi |
| :--- | :--- | :--- |
| `Intl.NumberFormat` | `style: 'currency'`, `currency: 'UZS'` | Sonlar va valyutalarni formatlash |
| `Intl.DateTimeFormat` | `dateStyle: 'full'`, `timeStyle: 'short'` | Sanalarni formatlash |
| `Intl.RelativeTimeFormat` | `numeric: 'auto'` | Nisbiy vaqtlar ("kecha", "5 daqiqa oldin") |
| `Intl.ListFormat` | `type: 'conjunction'` | Massivni matnga aylantirish ("va" bilan) |
| `Intl.Collator` | - | Tillarga xos to'g'ri saralash |

---

## 7. ❓ Savollar va Javoblar

### 1. SSR (Server-Side Rendering) tizimlarida Intl API ishlatganda qanday xato yuz berishi mumkin?
Server va mijoz (client) brauzeri tillari har xil bo'lsa, "Hydration Mismatch" xatosi kelib chiqadi. Buni oldini olish uchun tilni Next.js/React render bo'lgandan keyin (client-side) aniqlash kerak.

### 2. `formatToParts()` metodi nima uchun kerak?
U formatlangan natijani shunchaki string emas, balki bo'laklarga bo'lingan obyektlar massivi ko'rinishida qaytaradi (masalan, valyuta belgisi alohida, butun qism alohida). Bu dizaynda valyuta belgisini boshqa rang yoki shriftda ko'rsatishda juda qulaydir.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qaysi xossa orqali foydalanuvchining brauzer tilini aniqlaymiz?
2. `Intl.ListFormat` massivdagi oxirgi elementdan oldin qaysi so'zni avtomatik qo'shib beradi? (Lokalga qarab: 'va', 'and', 'or').
3. Nima uchun `new Intl` obyektlarini loop ichida yaratish tavsiya etilmaydi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida lokalizatsiya API-si bilan ishlash ko'nikmalaringizni sinab ko'ring.
