export const cachingScalability = {
  id: "cachingScalability",
  title: "Keshlash va Tizim Kengayuvchanligi (Caching & Scalability)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Loyiha foydalanuvchilari soni 100 tadan 1 milliontagacha ko'payganda, server va ma'lumotlar bazasi (database) juda katta yuklama ostida qoladi. So'rovlarga javob qaytarish vaqti soniyalargacha uzayadi va tizim butunlay qulashi mumkin.
Tizimni kengaytirish (Scalability) va tezkorligini ta'minlash uchun dasturchilar ikki xil yondashuvni bilishi kerak: **Keshlash (Caching)** (ma'lumotlarni tez o'qiladigan vaqtinchalik xotirada saqlash) va **Masshtablash** (gorizontal/vertikal kengayish, Load Balancers). Bular orqali server yuklamasini 90% gacha kamaytirish va javob vaqtini millisekundlargacha qisqartirish mumkin.

Siz har kuni ertalab dars tayyorlash uchun **kutubxonaga borib, qalin ensiklopediya** kitobidan ma'lumot qidirasiz ($O(n)$ vaqt, og'ir yuklama).
- **Keshlash:** Kerakli ma'lumotlarni daftaringizga ko'chirib, **ish stolingizga** qo'yib qo'yasiz. Endi kutubxonaga borish shart emas, stolingizdan darhol olasiz ($O(1)$ tezlik, minimal harakat).
- **Gorizontal Masshtablash (Horizontal Scaling):** Kutubxonada navbat ko'payib ketganda, bitta kutubxonachi o'rniga 5 ta kutubxonachi ishga olinishi va navbat taqsimlanishi.

---

## 2. 💻 Real Kod Misollari



---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Keshlash va kengaytirishning asosiy darajalari:

#

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Keshni yangilay olmaslik (Cache Invalidation):** "Kompyuter fanidagi eng qiyin ikki muammoning biri keshni tozalashdir". Bazada ma'lumot o'zgarganda keshni yangilamaslik foydalanuvchiga eski ma'lumotlar ko'rsatilishiga (stale data) sabab bo'ladi.
2. **Kesh qulashi (Cache Stampede):** Keshning muddati tugashi bilan (TTL) bir vaqtda minglab so'rovlar bazaga borib, bazani qotirib qo'yishi.
3. **Sessiyalarni noto'g'ri saqlash:** Gorizontal kengayganda, foydalanuvchi sessiya ma'lumotlari faqat 1-serverda saqlansa va Load Balancer keyingi so'rovni 2-serverga yuborsa, foydalanuvchi tizimdan chiqib ketadi (logout). Sessiyalarni umumiy keshda (masalan, Redis) yoki stateless JWT orqali boshqarish shart.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Kesh (Cache) nima?**
Tez-tez so'raladigan og'ir ma'lumotlarni tezkor va qimmat xotirada (odatda RAM) vaqtinchalik saqlash orqali kirish vaqtini qisqartirish texnologiyasi.

**2. Vertikal va Gorizontal kengaytirish (Scaling) farqi nimada?**
Vertikal — mavjud server xotirasi va protsessorini kuchaytirish. Gorizontal — ko'plab yangi serverlarni parallel ulash va yuklamani bo'lish.

**3. Cache-Control sarlavhasidagi \`max-age=3600\` nimani anglatadi?**
Brauzerga ushbu resursni (rasm/fayl) 3600 soniya (1 soat) davomida o'z keshidan qayta ishlatishga, serverga qayta so'rov yubormaslikka ruxsat beradi.

**4. TTL (Time To Live) nima?**
Ma'lumotning keshda qancha vaqt yashash muddati. TTL tugagach, kesh o'chiriladi va yangi so'rov to'g'ridan-to'g'ri bazaga yuboriladi.

**5. Redis nima?**
Xotirada ishlaydigan (In-memory), kalit-qiymat (Key-Value) ko'rinishidagi o'ta tezkor ma'lumotlar bazasi bo'lib, asosan kesh yuritish va sessiyalarni saqlashda ishlatiladi.

**6. Load Balancer (Yuk taqsimlovchi) nima?**
Kelayotgan tarmoq trafigini bir nechta backend serverlar o'rtasida teng taqsimlab beruvchi qurilma yoki dasturiy ta'minot (masalan, Nginx, HAProxy).

**7. CDN (Content Delivery Network) vazifasi nimada?**
Statik fayllarni (CSS, JS, rasmlar) foydalanuvchiga geografik yaqin bo'lgan serverlar tarmog'ida keshlab saqlash orqali sayt tezligini oshirish.

**8. ETag nima?**
Server tomonidan fayl versiyasiga beriladigan unikal identifikator (hash). Brauzer keyingi safar so'rov yuborganda \`If-None-Match\` sarlavhasida ETag-ni yuboradi, agar fayl o'zgarmagan bo'lsa server \`304 Not Modified\` qaytaradi.

**9. LRU Cache (Least Recently Used) o'chirish qoidasi qanday?**
Kesh to'lib ketganda, eng uzoq vaqt davomida ishlatilmagan (eskirgan) elementni o'chirib, o'rniga yangi elementni yozish algoritmi.

**10. Database Connection Pool nima uchun kerak?**
Har bir so'rov uchun bazaga qaytadan yangi ulanish (connection) ochish o'rniga, oldindan ochib qo'yilgan tayyor ulanishlar ro'yxatidan foydalanib vaqtni va server resursini tejash.

**11. Round Robin yuk taqsimlash algoritmi qanday ishlaydi?**
Kelayotgan so'rovlarni serverlar ro'yxatiga tartib bo'yicha ketma-ket (1-so'rov 1-serverga, 2-so'rov 2-serverga va h.k.) navbatma-navbat yo'naltirish.

**12. Cache Busting nima?**
Loyihaning yangi versiyasi chiqqanda brauzer keshidagi eski CSS/JS fayllarni majburiy yangilash uchun fayl nomiga unikal hash qo'shish (masalan, \`main.d5g7s2.js\`).

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Redis Caching for User Profiles
Katta yuklama ostidagi foydalanuvchi profillarini Redis kesh yordamida tezlashtirish:
\`\`\`javascript
async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}:profile\`;
  
  // 1. Keshdan tekshirish
  const cachedProfile = await redis.get(cacheKey);
  if (cachedProfile) {
    return JSON.parse(cachedProfile); // Cache Hit
  }
  
  // 2. Keshda yo'q bo'lsa bazadan olish (Cache Miss)
  const profile = await db.users.findUnique({ where: { id: userId } });
  if (profile) {
    // 3. Kelajak uchun 1 soat (3600s) TTL bilan keshga yozish
    await redis.setex(cacheKey, 3600, JSON.stringify(profile));
  }
  
  return profile;
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Client[Client Request] --> CacheCheck{Cache-da mavjudmi?}
    CacheCheck -->|Yes: Cache Hit| ReturnCache[Cache-dan qaytarish - O(1) tezlik]
    CacheCheck -->|No: Cache Miss| DBQuery[Ma'lumotlar bazasidan o'qish - O(N) yuklama]
    DBQuery --> SaveToCache[Cache-ga yozish - TTL sozlash]
    SaveToCache --> ReturnClient[Foydalanuvchiga qaytarish]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Konsept | Maqsadi | Natijasi |
| :--- | :--- | :--- |
| **Brauzer Kesh** | Fayllarni brauzer xotirasida saqlash | \`Cache-Control: max-age=3600\` |
| **CDN** | Statik fayllarni geografik yaqin tarqatish | Yuklanish vaqti qisqaradi |
| **Redis** | In-memory RAM kesh bazasi | Bazaga yuklama 90% kamayadi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Cache-Control sarlavhasi",
    "instruction": "Resursni 1 soat (3600s) davomida har qanday keshda (public) saqlashga ruxsat beruvchi `Cache-Control` sarlavhasi qiymatini `cacheControlHeader` o'zgaruvchisiga string ko'rinishida yozing.",
    "startingCode": "const cacheControlHeader = ",
    "hint": "'public, max-age=3600'",
    "test": "if (typeof cacheControlHeader === 'undefined') return 'cacheControlHeader topilmadi'; if(!cacheControlHeader.includes('max-age=3600') || !cacheControlHeader.includes('public')) return 'Sarlavha qiymati noto\\'g\\'ri'; return null;"
  },
  {
    "id": 2,
    "title": "Kesh unumdorligi (Cache Hit Ratio)",
    "instruction": "Jami so'rovlar (`total`) va keshdan topilgan so'rovlar (`hits`) berilgan holatda kesh unumdorligi foizini (0 dan 100 gacha butun son ko'rinishida) hisoblaydigan `getHitRatio(hits, total)` funksiyasini yozing.",
    "startingCode": "function getHitRatio(hits, total) {\n  if (total === 0) return 0;\n  // Foizni hisoblang\n}",
    "hint": "return Math.round((hits / total) * 100);",
    "test": "if (typeof getHitRatio !== 'function') return 'getHitRatio topilmadi'; if(getHitRatio(80, 100) !== 80) return 'Hisoblash xato'; if(getHitRatio(1, 3) !== 33) return 'Yaxlitlashda xatolik'; return null;"
  },
  {
    "id": 3,
    "title": "Vaqtinchalik mahalliy kesh (LocalStorage TTL)",
    "instruction": "LocalStorage-da ma'lumotni kesh muddati (`ttl` millisekundlarda) tugash vaqti bilan birga saqlaydigan `setWithExpiry(key, value, ttl)` funksiyasini yozing.",
    "startingCode": "function setWithExpiry(key, value, ttl) {\n  const now = new Date().getTime();\n  const item = {\n    value: value,\n    expiry: now + ttl\n  };\n  // localStorage-ga JSON ko'rinishida saqlang\n}",
    "hint": "localStorage.setItem(key, JSON.stringify(item));",
    "test": "if (typeof setWithExpiry !== 'function') return 'setWithExpiry topilmadi'; let savedKey, savedVal; const mockStore = {}; global.localStorage = { setItem: (k, v) => { savedKey = k; savedVal = v; } }; setWithExpiry('user', 'Ali', 5000); if (savedKey !== 'user' || !savedVal.includes('expiry') || !savedVal.includes('Ali')) return 'LocalStorage-ga ma\\'lumot to\\'g\\'ri yozilmadi'; return null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Keshlash (Caching) ning eng asosiy vazifasi nima?",
    "options": [
      "Foydalanuvchilar parollarini shifrlab saqlash",
      "Tez-tez so'raladigan og'ir ma'lumotlarni RAM kabi tezkor xotiraga vaqtinchalik yozib, tizim javob tezligini oshirish va bazaga yuklamani kamaytirish",
      "Sayt dizaynini chiroyli qilish",
      "DDoS hujumlarini uyushtirish"
    ],
    "correctAnswer": 1,
    "explanation": "Keshlash ma'lumotlarni sekinroq ishlaydigan ma'lumotlar bazasidan emas, balki tezkor operativ xotiradan (RAM) o'qib olish imkonini beradi."
  },
  {
    "id": 2,
    "question": "Gorizontal kengaytirish (Horizontal Scaling) nima?",
    "options": [
      "Mavjud bitta serverning xotirasini (RAM) 2 barobarga oshirish",
      "Tizimga yangi arzon serverlar qo'shish va trafigini load balancer yordamida bo'lish",
      "Barcha ma'lumotlarni bitta bazada saqlash",
      "Saytdagi sahifalar sonini ko'paytirish"
    ],
    "correctAnswer": 1,
    "explanation": "Gorizontal masshtablash parallel ravishda yangi server qurilmalarini qo'shib tizim yuklamasini taqsimlashni anglatadi."
  },
  {
    "id": 3,
    "question": "Kesh yashash muddati tugaganligini anglatuvchi qisqartma nom qaysi?",
    "options": [
      "API",
      "TTL (Time To Live)",
      "CORS",
      "DNS"
    ],
    "correctAnswer": 1,
    "explanation": "TTL (Time To Live) kesh xotirasidagi ma'lumot qaysi vaqt oralig'ida yashashini belgilaydi."
  },
  {
    "id": 4,
    "question": "CDN (Content Delivery Network) sayt tezligini oshirishga qanday hissa qo'shadi?",
    "options": [
      "Barcha so'rovlarni bitta serverga yo'naltirish orqali",
      "Statik resurslarni (CSS, JS, rasmlar) foydalanuvchiga eng yaqin masofadagi serverlarda keshlab saqlash va uzatish orqali",
      "Sayt parolini shifrlash orqali",
      "Daraxt ko'rinishida qidiruvni optimallash orqali"
    ],
    "correctAnswer": 1,
    "explanation": "CDN tarmoqlari geografik joylashuv bo'yicha foydalanuvchiga eng yaqin tugundan (node) fayllarni tez yetkazib beradi."
  },
  {
    "id": 5,
    "question": "Redis qanday ma'lumotlar bazasi hisoblanadi va asosan nima maqsadda qo'llaniladi?",
    "options": [
      "Faqat jadvallar (relational) bilan ishlaydi va audit uchun",
      "RAM-da tezkor ishlaydigan Key-Value kesh tizimi sifatida foydalaniladi",
      "Hujjatli ma'lumotlar bazasi",
      "Operatsion tizim fayllarini saqlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Redis (Remote Dictionary Server) in-memory (xotiradagi) ma'lumotlar tuzilmasini saqlaydigan o'ta tezkor kesh va bazadir."
  },
  {
    "id": 6,
    "question": "HTTP ETag sarlavhasi qanday ishlaydi?",
    "options": [
      "U parolni hashlashda salt qo'shadi",
      "U fayl mazmuniga mos keladigan unikal hash qiymat yaratadi, keyingi safar fayl o'zgarmagan bo'lsa server 304 qaytarib tarmoq trafigini tejaydi",
      "Faqat rasmlarni siqish uchun ishlatiladi",
      "Cookie-larni tozalaydi"
    ],
    "correctAnswer": 1,
    "explanation": "ETag brauzerga resursning holatini bildiradi. Agar resurs o'zgarmasa, uni internetdan qayta yuklamay keshdan o'qiydi."
  },
  {
    "id": 7,
    "question": "Kesh to'lib ketganda, eng uzoq vaqt foydalanilmagan elementni birinchi o'chiradigan algoritm nima deyiladi?",
    "options": [
      "FIFO Cache",
      "LRU (Least Recently Used)",
      "LIFO Cache",
      "Random Eviction"
    ],
    "correctAnswer": 1,
    "explanation": "LRU (Least Recently Used) algoritmi kesh sig'imi to'lganda eng oxirgi marta ishlatilgan (eng eskirgan) ma'lumotni keshdan chiqarib tashlaydi."
  },
  {
    "id": 8,
    "question": "Load Balancer-ning (Yuk taqsimlovchi) asosiy vazifasi nima?",
    "options": [
      "Bazadagi ma'lumotlar zaxirasini olish",
      "Kelayotgan tarmoq trafigini bir nechta backend serverlar o'rtasida teng taqsimlash va serverlar holatini tekshirish",
      "Faqat parollarni tekshirish",
      "CSS fayllarini birlashtirish"
    ],
    "correctAnswer": 1,
    "explanation": "Load Balancer foydalanuvchilar oqimini bir nechta serverlarga bo'lib yuborib, hech bir server ortiqcha yuklanib qolmasligini ta'minlaydi."
  },
  {
    "id": 9,
    "question": "Kesh muddati tugagan paytda (TTL = 0) birdaniga minglab foydalanuvchilar kelishi va bazani qotirib qo'yishi muammosi nima deyiladi?",
    "options": [
      "Stack Overflow",
      "Cache Stampede (Kesh shovqini/bo'roni)",
      "Cache Miss Error",
      "DDoS Failure"
    ],
    "correctAnswer": 1,
    "explanation": "Cache Stampede (yoki Cache Dog-piling) kesh yangilanayotgan qisqa vaqt oralig'ida barcha so'rovlarning bir vaqtda bazaga ta'sir qilishi muammosidir."
  },
  {
    "id": 10,
    "question": "Database Connection Pool nima?",
    "options": [
      "Faqat rasmlar saqlaydigan xotira havzasi",
      "Bazaga ulanishlarni har safar qayta ochmasdan, oldindan tayyorlangan ochiq ulanishlar to'plamidan qayta-qayta foydalanish tizimi",
      "Xavfsiz proxy server",
      "SQL injection-ni tozalaydigan filtr"
    ],
    "correctAnswer": 1,
    "explanation": "Ulanishlar puli (Connection Pool) ulanishlar yaratish va yopishdagi og'ir vaqt yo'qotilishini oldini oladi."
  },
  {
    "id": 11,
    "question": "Sessiyalarni keshda saqlamasdan gorizontal kengayganda (Horizontal Scaling) qanday xavf yuzaga keladi?",
    "options": [
      "Sayt dizayni yo'qoladi",
      "Foydalanuvchi keyingi so'rovida boshqa serverga yo'naltirilsa, uning sessiyasi topilmay tizimdan chiqib ketishi mumkin",
      "Internet butunlay uzilib qoladi",
      "Parollar bazada o'zgarib ketadi"
    ],
    "correctAnswer": 1,
    "explanation": "Har bir server o'z xotirasida (RAM) sessiyani saqlasa, foydalanuvchi boshqa serverga borganda 'tizimga kirmagan' deb hisoblanadi. Buning uchun umumiy kesh (Redis) ishlatiladi."
  },
  {
    "id": 12,
    "question": "Loyiha yangilanganda brauzerlar keshidagi eski fayllarni tozalash (Cache Invalidation) uchun qo'llaniladigan usul qanday ataladi?",
    "options": [
      "Cache Busting",
      "Same-Origin Policy",
      "DNS Spoofing",
      "SQL Filtering"
    ],
    "correctAnswer": 0,
    "explanation": "Cache Busting yangi versiya chiqqanda JS/CSS fayllar nomiga hash qo'shadi (masalan, script.v2.js), natijada brauzer uni yangi fayl sifatida serverdan yuklaydi."
  }
]
};
