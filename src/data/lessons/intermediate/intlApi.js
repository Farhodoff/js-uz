export const intlApi = {
  id: "intlApi",
  title: "Internationalization (Intl) API",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Intl API nima?
**Intl (Internationalization) API** — bu JavaScript-ga o'rnatilgan va veb-ilovani turli davlatlar (lokallar) madaniy formatlariga avtomatik tarzda moslashtiruvchi maxsus obyektdir. U raqamlar, valyutalar, sanalar, nisbiy vaqtlar va ro'yxatlarni hech qanday tashqi kutubxonalarsiz (masalan, og'ir \`moment.js\`iz) formatlab beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **xalqaro tarjimonisiz**:
* **Kutubxonalardan foydalanish (Eski/Og'ir usul):** Har bir davlatdan (AQSH, Germaniya, Yaponiya) kelgan sayyoh bilan gaplashish uchun uyingizdan qalin tarjima lug'atlarini (70KB lik og'ir JS paketlarini) yuklab ko'tarib yurasiz.
* **Intl API (Modern/Optimal usul):** Sizning miyangizda barcha tillar va ularning madaniy qoidalari (sanalar, raqamlar yozilishi) oldindan o'rnatilgan. Sayyoh kelib pasportidagi kodini (masalan, \`uz-UZ\` yoki \`en-US\`) ko'rsatishi bilan u tushunadigan tilda va pul birligida gapirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sonlarni mingliklarga bo'lish - NumberFormat)
\`\`\`javascript
const number = 1250500.75;

// O'zbekiston formati (bo'shliq va vergul bilan)
const uzFormatter = new Intl.NumberFormat("uz-UZ");
console.log(uzFormatter.format(number)); // "1 250 500,75"

// AQSH formati (vergul va nuqta bilan)
const usFormatter = new Intl.NumberFormat("en-US");
console.log(usFormatter.format(number)); // "1,250,500.75"
\`\`\`

### 2. Intermediate Example (Valyutalarni formatlash - Currency)
Narxlarni davlat valyutasiga mos formatlash:
\`\`\`javascript
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
\`\`\`

### 3. Advanced Example (DateTimeFormat va RelativeTimeFormat)
\`\`\`javascript
// 1. Sana formatlash
const today = new Date("2026-06-10");
const uzDate = new Intl.DateTimeFormat("uz-UZ", { dateStyle: "full" });
console.log(uzDate.format(today)); // "chorshanba, 2026-yil 10-iyun"

// 2. Nisbiy vaqt formatlash ("2 daqiqa oldin")
const rtf = new Intl.RelativeTimeFormat("uz-UZ", { numeric: "auto" });
console.log(rtf.format(-5, "minute")); // "5 daqiqa oldin"
console.log(rtf.format(-1, "day"));    // "kecha"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### CLDR (Common Locale Data Repository)
Intl API brauzerning o'ziga o'rnatilgan **CLDR** (Unicode Common Locale Data Repository) ma'lumotlar bazasidan foydalanadi. Ushbu baza dunyodagi deyarli barcha tillar, sanalar va valyuta qoidalarini o'z ichiga oladi. Dasturchi kod yozganida, JS dvigateli ushbu lokal ma'lumotlarini to'g'ridan-to'g'ri tizim xotirasidan o'qiydi.

> [!IMPORTANT]
> \`new Intl.NumberFormat\` yoki \`new Intl.DateTimeFormat\` obyektlarini yaratish CPU resursi uchun ancha og'ir jarayondir. Shuning uchun, ularni loop (tsikl) ichida qayta-qayta yaratmasdan, loop-dan tashqarida bir marta yaratib keshlab qo'yish (Memoization) shart.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi brauzeri tilini aniqlash va formatlash
Foydalanuvchining shaxsiy tilidan kelib chiqib dynamic valyuta formatlovchi yozamiz.

\`\`\`javascript
// 1. Foydalanuvchi brauzer tilini aniqlaymiz (default: uz-UZ)
const userLocale = navigator.language || "uz-UZ";

// 2. Formatterni keshlaymiz
const currencyFormatter = new Intl.NumberFormat(userLocale, {
  style: "currency",
  currency: "USD"
});

console.log(currencyFormatter.format(100)); // Masalan: "$100.00" (en-US bo'lsa)
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Valyuta belgilashda ISO kodlaridan foydalanmaslik
* **Noto'g'ri:**
  \`\`\`javascript
  const formatter = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "som" }); // RangeError!
  \`\`\`
* **To'g'ri (ISO 4217 standarti bo'yicha 3 harfli kodlar):**
  \`\`\`javascript
  const formatter = new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS" });
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Konstruktor | Options xossasi | Asosiy Vazifasi |
| :--- | :--- | :--- |
| \`Intl.NumberFormat\` | \`style: 'currency'\`, \`currency: 'UZS'\` | Sonlar va valyutalarni formatlash |
| \`Intl.DateTimeFormat\` | \`dateStyle: 'full'\`, \`timeStyle: 'short'\` | Sanalarni formatlash |
| \`Intl.RelativeTimeFormat\` | \`numeric: 'auto'\` | Nisbiy vaqtlar ("kecha", "5 daqiqa oldin") |
| \`Intl.ListFormat\` | \`type: 'conjunction'\` | Massivni matnga aylantirish ("va" bilan) |
| \`Intl.Collator\` | - | Tillarga xos to'g'ri saralash |

---

## 7. ❓ Savollar va Javoblar

### 1. SSR (Server-Side Rendering) tizimlarida Intl API ishlatganda qanday xato yuz berishi mumkin?
Server va mijoz (client) brauzeri tillari har xil bo'lsa, "Hydration Mismatch" xatosi kelib chiqadi. Buni oldini olish uchun tilni Next.js/React render bo'lgandan keyin (client-side) aniqlash kerak.

### 2. \`formatToParts()\` metodi nima uchun kerak?
U formatlangan natijani shunchaki string emas, balki bo'laklarga bo'lingan obyektlar massivi ko'rinishida qaytaradi (masalan, valyuta belgisi alohida, butun qism alohida). Bu dizaynda valyuta belgisini boshqa rang yoki shriftda ko'rsatishda juda qulaydir.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qaysi xossa orqali foydalanuvchining brauzer tilini aniqlaymiz?
2. \`Intl.ListFormat\` massivdagi oxirgi elementdan oldin qaysi so'zni avtomatik qo'shib beradi? (Lokalga qarab: 'va', 'and', 'or').
3. Nima uchun \`new Intl\` obyektlarini loop ichida yaratish tavsiya etilmaydi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida lokalizatsiya API-si bilan ishlash ko'nikmalaringizni sinab ko'ring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Valyutani Formatlash (NumberFormat)",
    "instruction": "Taqdim etilgan sonni ('amount') 'uz-UZ' lokali va 'UZS' valyuta kodi yordamida formatlovchi 'formatUZS(amount)' funksiyasini yozing.",
    "startingCode": "function formatUZS(amount) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(amount);",
    "test": "if (!code.includes('NumberFormat')) return 'NumberFormat ishlatilmadi';\nconst sandbox = new Function(code + '; return formatUZS;');\nconst fn = sandbox();\nconst res = fn(1000);\nif (typeof res === 'string' && (res.includes('UZS') || res.includes('so\\'m'))) return null;\nreturn 'UZS formatlash noto\\'g\\'ri';"
  },
  {
    "id": 2,
    "title": "Nisbiy Vaqt (RelativeTimeFormat)",
    "instruction": "Berilgan minutlar sonini ('minutes') 'uz-UZ' lokalida 'auto' numeric ko'rinishida formatlovchi 'formatMinutesAgo(minutes)' funksiyasini yozing. U manfiy qiymat bilan format qilishi kerak (ya'ni -minutes soniya/daqiqa oldin).",
    "startingCode": "function formatMinutesAgo(minutes) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const rtf = new Intl.RelativeTimeFormat('uz-UZ', { numeric: 'auto' }); return rtf.format(-minutes, 'minute');",
    "test": "if (!code.includes('RelativeTimeFormat')) return 'RelativeTimeFormat ishlatilmadi';\nconst sandbox = new Function(code + '; return formatMinutesAgo;');\nconst fn = sandbox();\nconst res = fn(5);\nif (typeof res === 'string' && res.includes('daqiqa')) return null;\nreturn 'Nisbiy vaqt noto\\'g\\'ri formatlandi';"
  },
  {
    "id": 3,
    "title": "Sana Formatlash (DateTimeFormat)",
    "instruction": "Berilgan Date obyektini ('date') 'uz-UZ' lokalida 'long' dateStyle bo'yicha formatlovchi 'formatToUzbekDate(date)' funksiyasini yozing.",
    "startingCode": "function formatToUzbekDate(date) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'long' }).format(date);",
    "test": "if (!code.includes('DateTimeFormat')) return 'DateTimeFormat ishlatilmadi';\nconst sandbox = new Function(code + '; return formatToUzbekDate;');\nconst fn = sandbox();\nconst res = fn(new Date('2026-06-10'));\nif (typeof res === 'string' && res.includes('2026') && res.includes('iyun')) return null;\nreturn 'Sana formatlash xato';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Intl API nima maqsadda ishlatiladi?",
    "options": [
      "Veb-ilovada internet tezligini oshirish uchun",
      "Sana, raqam va valyutalarni foydalanuvchi tiliga mos ravishda formatlash (lokalizatsiya) uchun",
      "Kutubxonalarning hajmini siqish uchun",
      "Matnlar ustida regex qidiruvini tezlashtirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Intl API xalqaro standartlarga (CLDR) asoslanib, ilovani turli davlatlar (lokallar) madaniy qoidalariga mos formatlashga xizmat qiladi."
  },
  {
    "id": 2,
    "question": "Sanalarni formatlashda moment.js o'rniga Intl API ishlatishning asosiy afzalligi nimada?",
    "options": [
      "Moment.js o'zbek tilini tushunmaydi",
      "Intl API brauzerga o'rnatilgan bo'lib, loyiha hajmini (bundle size) tejaydi",
      "Intl API sinxron emas, asinxron ishlaydi",
      "Intl API xotirani avtomatik tozalaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Intl API brauzer ichida vaqtinchalik tayyor turgani sababli tashqi yirik kutubxonalarga ehtiyoj qolmaydi va bundle hajmini 0 KB ga kamaytiradi."
  },
  {
    "id": 3,
    "question": "Qaysi Intl sinfi katta sonlarni minglik guruhlarga bo'lish uchun ishlatiladi?",
    "options": [
      "Intl.DateTimeFormat",
      "Intl.NumberFormat",
      "Intl.ListFormat",
      "Intl.RelativeTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.NumberFormat sonlar va pul birliklarini berilgan lokal bo'yicha chiroyli formatlash uchun qo'llaniladi."
  },
  {
    "id": 4,
    "question": "'5 daqiqa oldin' kabi nisbiy vaqtlarni formatlovchi Intl obyekti qaysi?",
    "options": [
      "Intl.TimeSpan",
      "Intl.RelativeTimeFormat",
      "Intl.DurationFormat",
      "Intl.DateTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.RelativeTimeFormat berilgan son va o'lchov birligidan (masalan, -5 va 'minute') kelib chiqib dynamic nisbiy vaqt matnini yasaydi."
  },
  {
    "id": 5,
    "question": "Intl.NumberFormat-da valyutani ko'rsatish (style: 'currency') uchun yana qaysi parametr majburiy hisoblanadi?",
    "options": [
      "currency (masalan, 'USD')",
      "currencySymbol (masalan, '$')",
      "localeSymbol",
      "formatType"
    ],
    "correctAnswer": 0,
    "explanation": "Valyuta uslubi tanlansa, albatta ISO 4217 standarti bo'yicha 3 harfli valyuta kodi (currency) ko'rsatilishi shart (masalan: UZS, USD, EUR)."
  },
  {
    "id": 6,
    "question": "Foydalanuvchi brauzerining asosiy tilini dynamic aniqlash uchun qaysi brauzer API-sidan foydalaniladi?",
    "options": [
      "window.locale",
      "navigator.language",
      "document.language",
      "navigator.userAgent"
    ],
    "correctAnswer": 1,
    "explanation": "navigator.language foydalanuvchi brauzerining asosiy interfeys tilini (masalan, 'uz-UZ' yoki 'en-US') qaytaradi."
  },
  {
    "id": 7,
    "question": "Massiv elementlarini grammatik jihatdan to'g'ri (masalan, 'Olma, Banan va Uzum') birlashtiruvchi Intl obyekti qaysi?",
    "options": [
      "Intl.ArrayFormat",
      "Intl.ListFormat",
      "Intl.StringJoiner",
      "Intl.Collator"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.ListFormat berilgan lokal qoidalariga mos keladigan bog'lovchilar ('va', 'and', 'or') bilan massivlarni birlashtirib beradi."
  },
  {
    "id": 8,
    "question": "Matnlarni yoki alifbo harflarini (masalan, o'zbekcha 'o'g' yoki 'o'') tillarga xos tartibda to'g'ri saralash (sorting) uchun nima ishlatiladi?",
    "options": [
      "Array.prototype.sort()",
      "Intl.Collator",
      "Intl.StringFormatter",
      "Intl.DateTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.Collator har bir tilning o'ziga xos alifbo qoidalarini (masalan, umlautlar, tutuq belgilari) hisobga olgan holda matnlarni to'g'ri solishtiradi."
  },
  {
    "id": 9,
    "question": "Jadvaldagi 10 000 ta qatorni render qilishda Intl.NumberFormat ishlatishda eng to'g'ri optimallashtirish usuli qaysi?",
    "options": [
      "Har bir qatorda 'new Intl.NumberFormat()' chaqirish",
      "Loop-dan tashqarida bitta formatlovchi obyekt yaratib, uni loop ichida qayta-qayta ishlatish (Keshlash)",
      "Loop o'rniga setTimeout ishlatish",
      "Intl API dan butunlay voz kechish va string operatsiyalardan foydalanish"
    ],
    "correctAnswer": 1,
    "explanation": "Intl formatlovchi obyektlarini yaratish CPU uchun og'ir bo'lgani sababli, uni bir marta yaratib keshlab qo'yish (Memoization) unumdorlikni sezilarli oshiradi."
  },
  {
    "id": 10,
    "question": "Intl.NumberFormat.prototype.formatToParts() metodi oddiy format() metodidan nima bilan farq qiladi?",
    "options": [
      "U faqat sonlarni JSON formatida qaytaradi",
      "U formatlangan matnni alohida bo'laklarga ajratilgan obyektlar massivi shaklida qaytaradi (masalan, butun qism, valyuta belgisi, minglik ajratuvchi)",
      "U faqat asinxron ishlaydi",
      "U hech qanday farq qilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "formatToParts() yordamida har bir bo'lakka (valyuta belgisi, son, ajratuvchi) alohida CSS stillari berish yoki UI elementlarni moslashuvchan boshqarish mumkin."
  },
  {
    "id": 11,
    "question": "Hafta kunini matn ko'rinishida chiqarish uchun Intl.DateTimeFormat options qismida qaysi xususiyat beriladi?",
    "options": [
      "day: 'string'",
      "weekday: 'long' yoki 'short'",
      "week: 'text'",
      "dayOfWeek: 'full'"
    ],
    "correctAnswer": 1,
    "explanation": "weekday xossasiga 'long' (chorshanba) yoki 'short' (chor.) qiymati berilib, hafta kunini olish mumkin."
  },
  {
    "id": 12,
    "question": "SSR (Server-Side Rendering) ilovalarda Intl ishlaganda nima uchun 'Hydration Mismatch' xatosi yuzaga keladi?",
    "options": [
      "Server va brauzer vaqt zonalari yoki lokallari bir-biridan farq qilganligi uchun",
      "Serverda JavaScript ishlamasligi sababli",
      "Brauzer dynamic animatsiyalarni qo'llab-quvvatlamagani uchun",
      "Serverda Intl API mavjud emasligi sababli"
    ],
    "correctAnswer": 0,
    "explanation": "Agar serverda HTML boshqa lokalda (masalan, 'en-US' / UTC) chizilsa va foydalanuvchida boshqa lokalda ('uz-UZ') hydration bo'lsa, struktura mos kelmay mismatch yuz beradi."
  }
]

};
