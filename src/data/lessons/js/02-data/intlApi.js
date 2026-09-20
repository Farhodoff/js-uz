export const intlApi = {
  id: "intlApi",
  title: "Internationalization (Intl) API",
  language: "javascript",
  theory: `## 1-Qism: Sodda Tushuntirish

**Intl (Internationalization) API** — JavaScriptning tilga bog'liq satr taqqoslash, son hamda sana/vaqt formatlash imkonini beruvchi ichki (built-in) obyekti.

### Real hayotiy o'xshatish
O'zingizni xalqaro sayyohlik gidi deb tasavvur qiling.
Eski usul (moment.js kabi kutubxonalar): Etnizda dunyodagi har bir til uchun ulkan, og'ir lug'at ko'tarasiz. Bu sekin va charchatadi.
Yangi usul (Intl API): Qulagingizda barcha tillarni va qoidalarni allaqachon biladigan bir zum tarjimon ulangan — ortiqcha yuk ko'tarmaysiz. Brauzerda barcha madaniy qoidalar (CLDR) allaqachon ichki mavjud — siz unga faqat qaysi tilda gaplashmoqchi ekaningizni aytasiz.

\\\`\\\`\\\`javascript
// Eski usul: og'ir kutubxona import qilish
// import moment from 'moment';

// Yangi usul: ichki (built-in) Intl API
const formatter = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' });
console.log(formatter.format(1200000)); // "1 200 000,00 UZS"
\\\`\\\`\\\`

## 2-Qism: Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, unumdorlik)

### Ichki ishlash
Intl API **CLDR** (Common Locale Data Repository)ga tayanadi. Bu ma'lumot to'g'ridan-to'g'ri brauzerga (yoki Node.js muhitiga) ichilgan — ya'ni katta lokalizatsiya fayllarini tarmoq orqali yuklab berish shart emas.

### V8 dvigateli va unumdorlik

Chaqirilganda \\\`new Intl.NumberFormat()\\\` V8 locale satrini parse qiladi, ICU (International Components for Unicode)dan locale ma'lumotini oladi va formatlash qoidalarini sozlaydi. Bu initsializatsiya — qimmat operatsiya.

**Unumdorlik maslahati:** Intl formatter instansiyalarini sikl ichida yaratish o'rniga doim keshlang (memoize).

\\\`\\\`\\\`javascript
// ❌ YOMON: Instansiyani sikl ichida yaratish
const prices = [100, 200, 300];
prices.forEach(price => {
  console.log(new Intl.NumberFormat('en-US').format(price));
});

// ✅ YAXSHI: Instansiyani keshlash
const formatter = new Intl.NumberFormat('en-US');
prices.forEach(price => {
  console.log(formatter.format(price));
});
\\\`\\\`\\\`

## 3-Qism: Chekka holatlar va Senior Intervyu Savollari

### Chekka holatlar
1. **Noto'g'ri locale'lar:** Noto'g'ri locale bersangiz, butunlay buzilgan satr bo'maguncha standart locale ishlatiladi; to'liq noto'g'ri bo'lsa, natijada \\\`RangeError\\\`.
2. **Valyuta kodi yetishmasa:** Agar \\\`style: 'currency'\\\` bersangiz, albatta \\\`currency\\\` opsiyasini ham berishingiz kerak, aks holda \\\`TypeError\\\` tashlanadi.

### Senior Intervyu Savollari
**S: Intl API Server-Side Rendering (SSR) hydration nomutanosibligini qanday hal qiladi?**
J: Hydration nomutanosibligi server bir locale (masalan, UTC server vaqti yoki en-US) bilan sana/sonlarni formatlasa, mijoz brauzeri boshqasini (masalan, uz-UZ) ishlatsa yuz beradi. Yechim: serverda doim qat'iy bir locale asosida formatlang va birinchi renderdan keyin mijozda yangilang, yoki formatlashni faqat mijoz tomonda bajaring.

**S: Quyidagining vazifasi nima: \\\`formatToParts()\\\`?**
J: U formatlangan satrni qismlarga ajratib, obyektlar massivini qaytaradi. Bu formatlangan qiymatning turli qismlariga alohida stil berish uchun juda foydali (masalan, valyuta belgisini qalin, sonni oddiy qilish).

## Mermaid Diagrammasi

\\\`\\\`\\\`mermaid
graph TD;
    A[JavaScript kodi] -->|new Intl.DateTimeFormat| B(V8 dvigateli / ICU);
    B -->|Locale qoidalarini oladi| C[(CLDR ma'lumot bazasi)];
    C --> B;
    B -->|Formatlangan satrni qaytaradi| D[Foydalanuvchi interfeysi];
    D -->|Hydration nomutanosiblik xavfi| E[Server va mijoz locale];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy son formatlash",
      instruction: "'formatNumber(num)' funksiyasini yozing — berilgan sonni 'uz-UZ' locale'ida formatlasin.",
      startingCode: "function formatNumber(num) {\n  \n}",
      hint: "Buning uchun new Intl.NumberFormat('uz-UZ').format(num); yozing.",
      test: "const fn = new Function(code + '; return formatNumber;')(); if (fn(1000).replace(/\\s/g, '') === '1000') return null; return 'Formatlash noto\u2019g\u2019ri';"
    },
    {
      id: 2,
      title: "Valyuta formatlash",
      instruction: "'formatCurrency(amount)' funksiyasini yozing — sonni 'en-US' locale'ida AQSh dollari ('USD') shaklida formatlasin.",
      startingCode: "function formatCurrency(amount) {\n  \n}",
      hint: "Buning uchun { style: 'currency', currency: 'USD' } opsiyalarini bering.",
      test: "const fn = new Function(code + '; return formatCurrency;')(); if (fn(100) === '$100.00') return null; return 'Valyuta formati noto\u2019g\u2019ri';"
    },
    {
      id: 3,
      title: "Sana formatlash",
      instruction: "'formatDate(date)' funksiyasini yozing — Date obyektini 'en-GB' locale'ida 'short' dateStyle bilan formatlasin.",
      startingCode: "function formatDate(date) {\n  \n}",
      hint: "Buning uchun new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }) yozing.",
      test: "const fn = new Function(code + '; return formatDate;')(); if (fn(new Date('2023-01-01')).includes('/')) return null; return 'Sana formati noto\u2019g\u2019ri';"
    },
    {
      id: 4,
      title: "Nisbiy vaqt formatlash",
      instruction: "'formatRelative(days)' funksiyasini yozing — kunlar sonini (o'tgan kun uchun manfiy) 'uz-UZ' locale'ida 'auto' numeric opsiyasi bilan formatlasin.",
      startingCode: "function formatRelative(days) {\n  \n}",
      hint: "Buning uchun new Intl.RelativeTimeFormat('uz-UZ', { numeric: 'auto' }).format(days, 'day'); yozing.",
      test: "const fn = new Function(code + '; return formatRelative;')(); if (fn(-1) === 'kecha') return null; return 'Nisbiy vaqt noto\u2019g\u2019ri';"
    },
    {
      id: 5,
      title: "Ro'yxat formatlash",
      instruction: "'formatList(list)' funksiyasini yozing — satrlar massivini 'en-US' locale'ida 'conjunction' turi bilan formatlasin.",
      startingCode: "function formatList(list) {\n  \n}",
      hint: "Buning uchun new Intl.ListFormat('en-US', { type: 'conjunction' }).format(list); yozing.",
      test: "const fn = new Function(code + '; return formatList;')(); if (fn(['A', 'B', 'C']).includes('and')) return null; return 'Ro\u2019yxat formatlash noto\u2019g\u2019ri';"
    },
    {
      id: 6,
      title: "Foiz formatlash",
      instruction: "'formatPercent(num)' funksiyasini yozing — o'nlik sonni (masalan 0.5) foizga (masalan 50%) 'uz-UZ' locale'ida aylantirsin.",
      startingCode: "function formatPercent(num) {\n  \n}",
      hint: "Buning uchun Intl.NumberFormat ichida { style: 'percent' } bering.",
      test: "const fn = new Function(code + '; return formatPercent;')(); if (fn(0.5).includes('50%')) return null; return 'Foiz formati noto\u2019g\u2019ri';"
    },
    {
      id: 7,
      title: "Birlik formatlash",
      instruction: "'formatUnit(val)' funksiyasini yozing — sonni 'en-US' locale'ida 'kilometer' birlikida formatlasin.",
      startingCode: "function formatUnit(val) {\n  \n}",
      hint: "Buning uchun { style: 'unit', unit: 'kilometer' } bering.",
      test: "const fn = new Function(code + '; return formatUnit;')(); if (fn(5).includes('km')) return null; return 'Birlik formatlash noto\u2019g\u2019ri';"
    },
    {
      id: 8,
      title: "Qismlarga formatlash (formatToParts)",
      instruction: "'getParts(amount)' funksiyasini yozing — amount qiymatining 'USD' valyutasi ('en-US' locale) bo'yicha formatlangan qismlarini qaytarsin.",
      startingCode: "function getParts(amount) {\n  \n}",
      hint: "Buning uchun new Intl.NumberFormat(...).formatToParts(amount); yozing.",
      test: "const fn = new Function(code + '; return getParts;')(); const res = fn(100); if (Array.isArray(res) && res[0].type === 'currency') return null; return 'Qismlar massivi qaytmadi';"
    },
    {
      id: 9,
      title: "Hafta kuni nomi",
      instruction: "'getWeekday(date)' funksiyasini yozing — 'uz-UZ' locale'idagi sana uchun 'long' hafta kuni nomini qaytarsin.",
      startingCode: "function getWeekday(date) {\n  \n}",
      hint: "Buning uchun Intl.DateTimeFormat ichida { weekday: 'long' } bering.",
      test: "const fn = new Function(code + '; return getWeekday;')(); if (typeof fn(new Date()) === 'string') return null; return 'Hafta kuni formati noto\u2019g\u2019ri';"
    },
    {
      id: 10,
      title: "Collator bilan satr taqqoslash",
      instruction: "'compareStrings(a, b)' funksiyasini yozing — ikki satrni 'uz-UZ' locale'idagi collator bilan taqqoslasin.",
      startingCode: "function compareStrings(a, b) {\n  \n}",
      hint: "Buning uchun new Intl.Collator('uz-UZ').compare(a, b); yozing.",
      test: "const fn = new Function(code + '; return compareStrings;')(); if (typeof fn('a', 'b') === 'number') return null; return 'Collator taqqoslash noto\u2019g\u2019ri';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Intl API qisqartmasi nimani anglatadi?",
      options: [
        "Internalization API",
        "Internationalization API",
        "Interlink API",
        "Interpolation API"
      ],
      correctAnswer: 1,
      explanation: "Intl — Internationalization (xalqaroaroqlik) so‘zining qisqartmasi."
    },
    {
      id: 2,
      question: "Intl API ichki ishlashda qaysi ma’lumot bazasidan foydalanadi?",
      options: [
        "SQL",
        "MongoDB",
        "CLDR",
        "JSON"
      ],
      correctAnswer: 2,
      explanation: "U Common Locale Data Repository (CLDR)dan foydalanadi."
    },
    {
      id: 3,
      question: "Intl formatter instansiyasini nega keshlash kerak?",
      options: [
        "Xotira tejash uchun",
        "Chunki uni yaratish CPU uchun qimmat operatsiya",
        "Tarmoq kechikishidan qochish uchun",
        "Chunki sintaksis buni talab qiladi"
      ],
      correctAnswer: 1,
      explanation: "Yangi Intl formatter yaratish locale qoidalarini parse qiladi — bu qimmat operatsiya."
    },
    {
      id: 4,
      question: "Nisbiy vaqtni (masalan, ‘2 kun oldin’) qaysi obyekt formatlaydi?",
      options: [
        "Intl.DateTimeFormat",
        "Intl.RelativeTimeFormat",
        "Intl.TimeFormat",
        "Intl.Duration"
      ],
      correctAnswer: 1,
      explanation: "Nisbiy vaqtlarni Intl.RelativeTimeFormat formatlaydi."
    },
    {
      id: 5,
      question: "Intl.NumberFormat’ga noto‘g‘ri valyuta kodi bersak nima bo‘ladi?",
      options: [
        "RangeError tashlaydi",
        "USD’ga qaytadi",
        "Valyuta stilini e’tiborsiz qoldiradi",
        "null qaytaradi"
      ],
      correctAnswer: 0,
      explanation: "Noto‘g‘ri valyuta kodi RangeError tashlaydi."
    },
    {
      id: 6,
      question: "Formatlangan satr qismlarini massiv shaklida olish uchun qaysi metod kerak?",
      options: [
        "format()",
        "formatToParts()",
        "split()",
        "parse()"
      ],
      correctAnswer: 1,
      explanation: "formatToParts() formatlangan satrni qismlar ko‘rinishida ifodalovchi obyektlar massivini qaytaradi."
    },
    {
      id: 7,
      question: "Tilga bog‘liq satr taqqoslash uchun qaysi obyekt ishlatiladi?",
      options: [
        "Intl.StringFormat",
        "Intl.Compare",
        "Intl.Collator",
        "String.prototype.localeCompare"
      ],
      correctAnswer: 2,
      explanation: "Tilga bog‘liq satr taqqoslashni Intl.Collator ta’minlaydi."
    },
    {
      id: 8,
      question: "Intl.ListFormat nima qiladi?",
      options: [
        "Satrlar massivini saralaydi",
        "Satrlar massivini bog‘lovchi (va/yoki) bilan formatlaydi",
        "Ro‘yxatlarni HTML’da formatlaydi",
        "Ro‘yxatdagi unikal elementlarni filtrlaydi"
      ],
      correctAnswer: 1,
      explanation: "U massivlarni locale’ga mos bog‘lovchilar (masalan, ‘va’ yoki ‘yoki’) bilan satrga aylantiradi."
    },
    {
      id: 9,
      question: "Foydalanuvchining afzal ko‘rgan locale’ini qanday aniqlaymiz?",
      options: [
        "window.locale",
        "navigator.language",
        "document.lang",
        "Intl.locale()"
      ],
      correctAnswer: 1,
      explanation: "navigator.language foydalanuvchining afzal ko‘rgan brauzer tilini qaytaradi."
    },
    {
      id: 10,
      question: "SSR’da server va mijoz locale’lari farq qilsa qanday muammo yuz beradi?",
      options: [
        "SyntaxError",
        "Tarmoq timeout’i",
        "Hydration nomutanosibligi",
        "Xotira sizishi"
      ],
      correctAnswer: 2,
      explanation: "Hydration nomutanosibligi server va mijoz locale’lari turlicha bo‘lganda, server yaratgan HTML mijoznikiga mos kelmasligidan yuz beradi."
    },
    {
      id: 11,
      question: "NumberFormat’da style 'currency' bo‘lganda qaysi opsiya majburiy?",
      options: [
        "locale",
        "currency",
        "currencyDisplay",
        "maximumFractionDigits"
      ],
      correctAnswer: 1,
      explanation: "style 'currency' bo‘lsa, 'currency' opsiyasi albatta berilishi shart."
    },
    {
      id: 12,
      question: "Sana va vaqtni qaysi konstruktor formatlaydi?",
      options: [
        "Intl.DateTimeFormat",
        "Intl.DateFormat",
        "Intl.TimeFormat",
        "Intl.Calendar"
      ],
      correctAnswer: 0,
      explanation: "Sana va vaqtni formatlash uchun Intl.DateTimeFormat ishlatiladi."
    }
  ]
};
