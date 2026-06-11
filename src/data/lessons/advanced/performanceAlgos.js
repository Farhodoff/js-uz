export const performanceAlgos = {
  id: "performanceAlgos",
  title: "Samaradorlik va Optimallashtirish Algoritmlari (Caching & Limits)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

JavaScript dasturlari va veb-saytlar tez ishlashi uchun xotirani tejash hamda takroriy so'rovlar oqimini cheklash juda muhim. Buning uchun tizimli va kod darajasida optimallashtirish usullaridan foydalanamiz: **LRU Cache** (eng kam ishlatilgan ma'lumotlarni o'chirish), **Debounce** va **Throttle** (hodisalar chastotasini cheklash).

### Restoran va Oqim analogiyalari:
- **LRU Cache (Tezkor kesh stoli):** Restoranda stol ustiga faqat odamlar hozirgina va eng ko'p so'ragan 5 ta taom menyusi qo'yiladi. Agarda yangi turdagi taom so'ralsa va stolda joy bo'lmasa, eng uzoq vaqt davomida hech kim so'ramagan menyu stoldan olib tashlanadi (joy ochish uchun).
- **Debounce (Kutuvchi lift):** Lift eshigi ochildi. Lift ichkaridagi odamlarni olib ketishdan oldin har safar yangi odam kelganda yana 5 soniya kutadi. Yangi odam kelishi to'xtagandan keyingina lift yo'lga tushadi (tugma tez-tez bosilganda oxirgisini kutish).
- **Throttle (Dozator):** Shishadagi suv dozatori. Siz uni qanchalik tez-tez bossangiz ham, u har 2 soniyada faqat bir tomchi suv beradi (tezkor bosishlarni belgilangan vaqt oralig'ida faqat bir marta bajarish).

---

## 2. 💻 Real Kod Misollari

Sodda debounce helper funksiyasining realizatsiyasi:

\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Foydalanilishi (Input yozilayotganda API so'rovini kechiktirish)
const searchAPI = debounce((query) => {
  console.log("API so'rov yuborildi:", query);
}, 500);
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### LRU Cache (Least Recently Used):
Keshda elementlarni saqlash tezligi $O(1)$ bo'lishi kerak. Buning uchun JS \`Map\` obyektidan foydalanish eng yaxshi yo'l. Map elementlarni qo'shilgan tartibda saqlaydi. Agar element o'qilsa yoki o'zgartirilsa, u xotiradan o'chirilib, boshiga qayta qo'shiladi. Kesh sig'imi to'lganda esa Map-ning birinchi (eng eski) elementi o'chiriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Debounce o'rniga Throttle ishlatish (va aksincha):** Qidiruv maydonida input yozilayotganda throttle ishlatish, bu foydalanuvchi yozib tugatmasdan turib chala API so'rovlari ketishiga sabab bo'ladi. Har bir holat uchun to'g'risini tanlash shart.
2. **Kesh hajmini cheklamaslik:** Oddiy Map kesh yaratib uning hajmini cheklamaslik, vaqt o'tishi bilan xotiraning to'lib qolishiga (Out of Memory) olib keladi.

---

## 5. 💬 12 ta Intervyu Savollari

Testlar yordamida intervyu savollariga tayyorgarlik ko'rasiz.

---

## 8. 🎯 Real Project Case Study

### Google Search Autocomplete
Google qidiruv maydonida har bir harfni yozganingizda serverga so'rov ketmaydi. Buning o'rniga yozishdan to'xtaganingizdan so'ng (masalan, 300ms kutib - Debounce) tavsiyalar ro'yxatini olish uchun bitta so'rov jo'natiladi. Bu server yuklamasini 90% gacha kamaytiradi.
`,
  exercises: [
    {
      id: 1,
      title: "LRU Cache (Least Recently Used) yozish",
      instruction: "Belgilangan sig'imga (`capacity`) ega bo'lgan `LRUCache` klassini yarating. U quyidagi metodlarga ega bo'lsin:\\n1. `get(key)`: Kalit bo'yicha qiymatni qaytarsin. Agar kalit bor bo'lsa, uni 'eng ko'p ishlatilgan' qilib belgilasin (Map boshiga o'tkazsin). Kalit bo'lmasa `-1` qaytarsin.\\n2. `put(key, value)`: Qiymatni yozsin. Agar kalit mavjud bo'lsa o'zgartirib xotirada yangilasin. Agar sig'im to'lgan bo'lsa, eng uzoq vaqt ishlatilmagan (Map boshidagi) elementni o'chirib, keyin yangisini qo'shsin.",
      startingCode: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  // Metodlarni yozing\n}",
      hint: "Map o'qilganda: const val = this.cache.get(key); this.cache.delete(key); this.cache.set(key, val); set-da esa agar cache.size >= capacity bo'lsa, birinchi elementni (this.cache.keys().next().value) o'chiring.",
      test: "if (typeof LRUCache !== 'function') return 'LRUCache topilmadi'; const cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); if (cache.get(1) !== 1) return 'Element topilmadi'; cache.put(3, 3); if (cache.get(2) !== -1) return 'Eski element o\\'chmadi'; if (cache.get(3) !== 3) return 'Yangi element topilmadi'; return null;"
    },
    {
      id: 2,
      title: "Throttle Funksiyasini yozish",
      instruction: "Belgilangan vaqt oralig'ida (`limit`) callback funksiyasini faqat bir marta chaqirishga ruxsat beruvchi `throttle(func, limit)` funksiyasini yozing.",
      startingCode: "function throttle(func, limit) {\n  let inThrottle;\n  return function(...args) {\n    // Yozing\n  }\n}",
      hint: "inThrottle bayrog'i false bo'lgandagina func.apply(this, args) chaqirilsin va inThrottle=true qilinib, setTimeout orqali limit tugagach false qilinsin.",
      test: "if (typeof throttle !== 'function') return 'throttle topilmadi'; let count = 0; const fn = throttle(() => { count++; }, 50); fn(); fn(); fn(); if (count !== 1) return 'Throttle birinchi chaqiruvlarni cheklamadi'; return new Promise(resolve => { setTimeout(() => { fn(); if (count === 2) resolve(null); else resolve('Limit tugagach ishlamadi'); }, 60); });"
    },
    {
      id: 3,
      title: "Advanced Debounce (with immediate flag)",
      instruction: "Standart debounce funksiyasini yozing. U `debounce(func, delay)` ko'rinishida bo'lsin va chaqiriqlar tezlashganda oxirgisini belgilangan delay-dan keyin ishga tushirsin.",
      startingCode: "function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    // Yozing\n  }\n}",
      hint: "clearTimeout(timeoutId) qilib, timeoutId = setTimeout(() => func(...args), delay) qiling.",
      test: "if (typeof debounce !== 'function') return 'debounce topilmadi'; let count = 0; const fn = debounce(() => { count++; }, 30); fn(); fn(); fn(); if (count !== 0) return 'Immediate kutish xato'; return new Promise(resolve => { setTimeout(() => { if (count === 1) resolve(null); else resolve('Debounce chaqirilmadi, count: ' + count); }, 50); });"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "LRU Cache (Least Recently Used) kesh tozalash algoritmi qanday ishlaydi?",
      options: [
        "Eng katta hajmli fayllarni o'chiradi",
        "Sig'im to'lganida eng uzoq vaqt davomida ishlatilmagan (o'qilmagan/yozilmagan) elementni xotiradan o'chiradi",
        "Faqat tasodifiy elementlarni o'chiradi",
        "Hech narsani o'chirmasdan xotirani kengaytiradi"
      ],
      correctAnswer: 1,
      explanation: "LRU algoritmi xotira to'lganda eng uzoq vaqtdan beri murojaat qilinmagan elementlarni birinchi bo'lib tozalaydi."
    },
    {
      id: 2,
      question: "JavaScript Map obyekti nima uchun LRU Cache yaratish uchun juda mos keladi?",
      options: [
        "Chunki u ma'lumotlarni shifrlaydi",
        "Chunki Map kiritilgan elementlar ketma-ketligi (insert order) tartibini qat'iy saqlaydi",
        "Chunki u faqat sonlarni o'qiydi",
        "Unda o'chirish operatsiyasi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Map kalitlar qo'shilgan ketma-ketlikni eslab qoladi. Map.keys().next().value orqali har doim eng birinchi qo'shilgan (eng eski) element kalitini osongina olish mumkin."
    },
    {
      id: 3,
      question: "Debounce va Throttle farqi nimada?",
      options: [
        "Ular mutlaqo bir xil vazifani bajaradi",
        "Debounce chaqiriqlar to'xtaganidan so'ng ma'lum vaqt kutib ishlaydi. Throttle esa tez-tez chaqirilganda ham belgilangan vaqt oralig'ida faqat bir marta ishlaydi",
        "Throttle faqat sinxron kodlarda ishlaydi",
        "Debounce faqat rasmlarni siqish uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Debounce yozish to'xtashini kutadi (masalan, input auto-search). Throttle esa oqim tezligini cheklaydi (masalan, scroll eventini 100ms da faqat bir marta tutish)."
    },
    {
      id: 4,
      question: "Foydalanuvchi sahifani pastga aylantirganda (scroll) yuz beradigan yuklamani kamaytirish uchun qaysi birini ishlatish to'g'riroq?",
      options: [
        "Debounce",
        "Throttle",
        "Promise.all",
        "Hech qaysinisini"
      ],
      correctAnswer: 1,
      explanation: "Scroll hodisasi juda tez-tez sodir bo'ladi. Throttle yordamida scroll callback funksiyasini har 100-200 millisekundda faqat bir marta chaqirib, brauzer yuklamasini keskin kamaytirish mumkin."
    },
    {
      id: 5,
      question: "Inputga matn yozilayotganda autocomplete takliflarini olish uchun qaysi biridan foydalanish ma'qul?",
      options: [
        "Throttle",
        "Debounce",
        "Consistent Hashing",
        "Event Emitter"
      ],
      correctAnswer: 1,
      explanation: "Debounce foydalanuvchi harflarni yozib tugatishini (masalan, 300ms to'xtashini) kutadi, bu esa chala so'rovlar ketishini oldini oladi."
    },
    {
      id: 6,
      question: "Nima uchun LRU Cache dagi elementlar o'qilganda (get) ularni o'chirish va qayta qo'shish kerak?",
      options: [
        "Xatoliklarni oldini olish uchun",
        "O'qilgan elementni 'eng ko'p/yaqinda ishlatilgan' deb belgilab, uni tartib bo'yicha Map-ning oxiriga o'tkazish uchun",
        "Map obyektida buni qilish shart",
        "U elementni yangilamaslik uchun"
      ],
      correctAnswer: 1,
      explanation: "Element o'qilganda u yangilangan hisoblanadi. Map-dan o'chirib qayta set qilish uni eng oxirgi (eng yangi) elementga aylantiradi, kesh boshidagi esa o'chiriladigan eski element bo'lib qolaveradi."
    },
    {
      id: 7,
      question: "LRU Cache-da get va put operatsiyalari uchun vaqt murakkabligi (Time Complexity) qanday bo'lishi kerak?",
      options: [
        "$O(n)$",
        "$O(1)$",
        "$O(n \\log n)$",
        "$O(n^2)$"
      ],
      correctAnswer: 1,
      explanation: "LRU Cache samarali ishlashi uchun uning o'qish (get) va yozish (put) tezligi doimiy vaqt, ya'ni $O(1)$ bo'lishi shart."
    },
    {
      id: 8,
      question: "Debounce funksiyasida 'clearTimeout' nima uchun ishlatiladi?",
      options: [
        "Taymerlarni o'chirish orqali o'tgan safar rejalashtirilgan ishni bekor qilish va kutish vaqtini noldan boshlash uchun",
        "Dasturni to'xtatish uchun",
        "Xotirani butunlay tozalash uchun",
        "Faqat bir marta ishlatish uchun"
      ],
      correctAnswer: 0,
      explanation: "Foydalanuvchi tugmani tez-tez bossa, clearTimeout oldingi rejalashtirilgan timeoutni o'chirib, yangidan delay kutishni boshlaydi."
    },
    {
      id: 9,
      question: "Veb-saytlardagi 'Search Input' tugmasi tez bosilganda double-submit (ikki marta jo'natish) oldini olishda qaysi usul yordam beradi?",
      options: [
        "Sinxron kodlar",
        "Debounce yoki Throttle",
        "SQL Transactions",
        "NoSQL Sharding"
      ],
      correctAnswer: 1,
      explanation: "Debounce yoki Throttle tugma ko'p marta bosilganida faqat birinchi yoki oxirgi so'rovni yuborish orqali serverga soxta buyurtmalar ketishini oldini oladi."
    },
    {
      id: 10,
      question: "Throttle ichidagi 'inThrottle' bayrog'i (flag) qanday rol o'ynaydi?",
      options: [
        "Faqat rang beradi",
        "Belgilangan cheklov muddati davomida boshqa so'rovlarni o'tkazmay turadigan qulf (lock) vazifasini o'taydi",
        "Tizimni o'chiradi",
        "Faqat ma'lumotlarni hashlash uchun"
      ],
      correctAnswer: 1,
      explanation: "inThrottle qulf bo'lib, u true bo'lganida callback ishlamaydi. Belgilangan delay tugagach qulf yana ochiladi (false bo'ladi)."
    },
    {
      id: 11,
      question: "LRU Cache-da Map o'rniga oddiy JS obyektidan ({}) foydalanishning qanday kamchiligi bor?",
      options: [
        "Obyektdan foydalanish taqiqlangan",
        "Oddiy obyekt elementlar qo'shilish tartibini (insertion order) qat'iy saqlamaydi, bu esa eng eski elementni $O(1)$ da topishni qiyinlashtiradi",
        "Obyektlar sekinroq ishlaydi",
        "Bunday kamchilik yo'q"
      ],
      correctAnswer: 1,
      explanation: "Oddiy JS obyekti kalitlar tartibini saqlamaydi, Map esa insertion tartibini saqlagani uchun eng mos tuzilmadir."
    },
    {
      id: 12,
      question: "Katta ma'lumotlar oqimida (masalan, real-time mouse drag) throttle ishlatilganda nima yuz beradi?",
      options: [
        "Sichqoncha harakati butunlay to'xtaydi",
        "Harakat silliqligini yo'qotmasdan, so'rovlar soni belgilangan limitgacha (masalan, soniyasiga 10 marta) kamayadi",
        "Sahifa butunlay qulaydi",
        "Hech qanday o'zgarish bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Throttle sichqoncha harakati koordinatalarini har millisekundda emas, masalan, har 100ms da bir marta olib, grafik yuklamani sezilarli kamaytiradi."
    }
  ]
};
