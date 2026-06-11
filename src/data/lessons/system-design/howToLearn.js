export const howToLearn = {
  id: "howToLearn",
  title: "System Design-ni qanday o'rganish kerak? (How to Learn System Design?)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tizimli dizayn (System Design) — bu dasturlash emas, balki **shaharsozlik** kabi san'atdir. Tasavvur qiling, sizga uy qurishni topshirishdi. Agar siz oddiy bir xonali kulba qurmoqchi bo'lsangiz (Junior darajasida), sizga g'isht, qum va sement yetarli. Lekin sizga 100 qavatli osmono'par bino yoki butun boshli mega-polis shahar qurish topshirilsa (Senior/Staff darajasida), siz faqat g'isht terish bilan cheklana olmaysiz. Sizga transport yo'llari, elektr tarmoqlari, kanalizatsiya va xavfsizlik tizimlarini rejalashtirish — ya'ni tizimli yondashuv kerak bo'ladi.

System Design intervyulari sizning bitta kod funksiyasini yozishingizni emas, balki cheklangan resurslar (vaqt, xotira, pul) ostida to'g'ri qarorlar qabul qila olishingizni va muammolarni kichik qismlarga (primitivlarga) bo'la olishingizni sinaydi.

---

## 2. 💻 Real Kod Misollari

Tizimli dizaynda biz ko'pincha tizimning yuklamasini va parametrlarini hisoblab chiqamiz. Quyida foydalanuvchilar soni va so'rovlar soniga qarab tizim darajasini baholovchi oddiy funksiya keltirilgan:

\`\`\`javascript
// Tizim yuklamasini baholash va kerakli masshtablash turini aniqlash
function evaluateSystemScale(qps) {
  if (qps < 100) {
    return {
      tier: "Sodda (Low Load)",
      action: "Bitta server va oddiy ma'lumotlar bazasi yetarli. Kesh shart emas."
    };
  } else if (qps >= 100 && qps < 5000) {
    return {
      tier: "O'rta (Medium Load)",
      action: "Gorizontal kengayish, Read-Replica bazalar va Redis keshni qo'shish lozim."
    };
  } else {
    return {
      tier: "Yuqori (High Load / FAANG Scale)",
      action: "Sharding, yuk taqsimlovchi (Load Balancer), xabarlar navbati (Message Queue) va CDN."
    };
  }
}

console.log(evaluateSystemScale(1500));
// { tier: "O'rta (Medium Load)", action: "Gorizontal kengayish, Read-Replica bazalar va Redis keshni qo'shish lozim." }
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

System Design intervyusi sizdan 10 xil mukammal arxitekturani yodlab olishingizni talab qilmaydi. U asosan quyidagi 4 ta asosiy qadam orqali ishlaydi:

1. **Talablarni aniqlashtirish (Clarify Requirements):** Dastlabki 5 daqiqada foydalanuvchilar soni, so'rovlar soni, kechikish vaqti (latency) va xavfsizlik talablarini aniqlab olish.
2. **Yuqori darajadagi dizayn (High-level Architecture):** Umumiy tizimni 5-8 ta asosiy komponentdan (Client, CDN, Load Balancer, API Gateway, DB, Cache) iborat qilib oqimini chizish.
3. **Chuqur tahlil (Deep-Dive):** Tizimning eng og'ir yoki eng muhim 1-2 ta muammosiga (masalan: mashhurlar muammosi - "celebrity problem", tranzaksiyalar konsistentligi) e'tibor qaratib, chuqur tahlil qilish.
4. **Baholash va Trade-offs (Evaluate):** Tanlangan arxitekturaning kamchiliklarini tan olish va yechimlarni taqqoslash (masalan: tezlik uchun kuchli konsistentlikdan voz kechish).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Yodlab olingan dizaynlarni tiqishtirish:** "Chat ilovasi uchun faqat WebSockets va Cassandra ishlatish kerak" deb aytish noto'g'ri. Agar talabda kuniga 10 ta xabar yuborilsa, WebSockets ortiqcha (over-engineering).
2. **Savol berishdan oldin chizishni boshlash:** Talablarni (foydalanuvchilar soni, kutilyotgan yuklama va h.k.) bilmasdan turib bazani tanlash yoki serverlarni joylashtirish.
3. **Trade-offs (ijobiy va salbiy tomonlar) tahlilini unutish:** Har bir tanlovning narxi borligini ko'rsatmaslik. Masalan, NoSQL ma'lumotlar bazasini tanlab, uning tranzaksiyalar xavfsizligini ta'minlay olmasligini aytmaslik.

---

## 5. 💬 12 ta Intervyu Savollari

**1. System Design intervyusida eng ko'p baholanadigan narsa nima?**
Nomzodning cheklovlar ostida muammolarni qanday tahlil qilishi, qarorlarini qanday asoslashi va trade-off (yutuq va yo'qotishlar)ni qanday muvozanatlashidir.

**2. Junior muhandisdan nima kutiladi?**
Kliyent-server asoslari, relyatsion ma'lumotlar bazasi tuzilishi, oddiy API-lar va kesh nima uchun kerakligini tushunish.

**3. Mid-level muhandisdan nima kutiladi?**
Asosiy arxitektura elementlarini (queues, sharding, replication, caching) birlashtirib, o'rta darajadagi yuklamaga bardosh beradigan tizim tuza olish.

**4. Senior muhandisdan nima kutiladi?**
Noaniq (ambiguous) savollarni mustaqil ravishda aniqlashtirish, tizimdagi muammolarni oldindan ko'rish va murakkab yechimlarni chuqur tahlil qila olish.

**5. Staff muhandisdan nima kutiladi?**
Arxitekturadan tashqari, uning jamoaga, migration (migratsiya) jarayoniga, 5 yillik rivojlanishga va tashkiliy masalalarga ta'sirini baholay olish.

**6. "Active recall" tizimli dizaynda qanday qo'llaniladi?**
Mavzuni shunchaki o'qib ketmasdan, kitobni yopib, o'z so'zlari bilan kesh yoki sharding ishlash tamoyilini yozib/gapirib berish.

**7. Nima uchun faqat matn muharririda tayyorlanish yomon?**
Chunki real intervyu virtual yoki real doska (whiteboard)da chizish orqali o'tadi, doskada ishlash alohida ko'nikma talab qiladi.

**8. Tizimli dizaynni o'rganishning 3 ta fazasi qaysilar?**
Foundations (Asoslar), Composition (Kompozitsiya/Patternlar) va Practice (Amaliyot/Mocks).

**9. "High-level design" nima?**
Tizimning asosiy oqimini ko'rsatuvchi, murakkab detallardan xoli bo'lgan 5-8 ta asosiy komponentlar chizmasi.

**10. Celebrity Problem nima?**
Ijtimoiy tarmoqlarda juda ko'p obunachiga ega foydalanuvchilar (masalan, Ronaldu) yozgan xabarlarini barcha obunachilarga tarqatishda tizim yuklamasining keskin ortib ketishi.

**11. "Do not trust user input" tizimli dizaynda nimani anglatadi?**
Kelayotgan har qanday so'rovni ma'lumotlar bazasiga yuborishdan oldin front-end va back-end tizimlarida qat'iy tekshirish lozimligi.

**12. Mock intervyular nima uchun muhim?**
Vaqt bosimi ostida gapirish, chizish va savollarga javob berish ko'nikmasini shakllantirish uchun.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi exercises bo'limida bajarib, bilimingizni mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali darajangizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Case Study: Time-boxing and Scoping a Design under 45 mins
Haqiqiy intervyuda vaqtni boshqarish:
- **0-5 daqiqa:** Functional va Non-functional talablarni aniqlash.
- **5-15 daqiqa:** High-level diagramma chizish.
- **15-35 daqiqa:** Deep-dive (eng qiyin 1-2 muammo tahlili).
- **35-45 daqiqa:** Xatolar, kamchiliklar va monitoring haqida gapirish.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Start[O'rganishni boshlash] --> Phase1[Faza 1: Foundations / Primitivlar]
    Phase1 -->|Graduation: Kesh, DB, Sharding tushunildi| Phase2[Faza 2: Composition / Patternlar]
    Phase2 -->|Graduation: Social feed, Chat arxitekturasi bilindi| Phase3[Faza 3: Practice / Whiteboard va Mocks]
    Phase3 --> Ready[Intervyuga tayyor!]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Daraja | Tayyorgarlik vaqti | Kutilyotgan asosiy bilim |
| :--- | :--- | :--- |
| **Junior (L3)** | 4-6 hafta | Kliyent-server, oddiy DB, kesh |
| **Mid-level (L4)** | 8-12 hafta | Caching, sharding, basic scaling |
| **Senior (L5)** | 12-16 hafta | Trade-offs, high scale, deep-dive |
| **Staff (L6+)** | Doimiy | 5 yillik rivojlanish, migration, jamoa unumdorligi |
`,
  exercises: [
    {
      id: 1,
      title: "Tayyorgarlik vaqtini hisoblash",
      instruction: "Dasturchi tajribasiga (Junior, Mid, Senior, Staff) qarab tavsiya etiladigan tayyorgarlik haftalari sonini qaytaruvchi `getPrepWeeks(level)` funksiyasini yozing. (Junior -> 6, Mid -> 12, Senior -> 16, Staff -> 24. Noma'lum bo'lsa 0).",
      startingCode: "function getPrepWeeks(level) {\n  // Kodni shu yerga yozing\n}",
      hint: "Switch yoki object mapping yordamida bajaring.",
      test: "if (typeof getPrepWeeks !== 'function') return 'getPrepWeeks topilmadi'; if(getPrepWeeks('Junior') !== 6) return 'Junior xato'; if(getPrepWeeks('Senior') !== 16) return 'Senior xato'; if(getPrepWeeks('Other') !== 0) return 'Noma\\'lum xato'; return null;"
    },
    {
      id: 2,
      title: "Yuklamani tasniflash",
      instruction: "Tizimning soniyadagi so'rovlar soniga (QPS) qarab yuklama turini qaytaradigan `classifyTraffic(qps)` funksiyasini yozing. 1000 dan kam bo'lsa 'Low', 50000 dan kam bo'lsa 'Medium', aks holda 'High'.",
      startingCode: "function classifyTraffic(qps) {\n  // Kodni yozing\n}",
      hint: "if-else operatorlaridan foydalaning.",
      test: "if (typeof classifyTraffic !== 'function') return 'classifyTraffic topilmadi'; if (classifyTraffic(500) !== 'Low') return 'Low yuklama xato'; if (classifyTraffic(10000) !== 'Medium') return 'Medium yuklama xato'; if (classifyTraffic(60000) !== 'High') return 'High yuklama xato'; return null;"
    },
    {
      id: 3,
      title: "Tradeoff balansi",
      instruction: "Kechikish (latency, ms) va narxni (cost, $) inobatga olib, tizimning tradeoff reytingini hisoblaydigan `evaluateTradeoff(latency, cost)` funksiyasini yozing. Formuladir: `latency * 0.6 + cost * 0.4`. Natijani eng yaqin butun songacha yaxlitlang.",
      startingCode: "function evaluateTradeoff(latency, cost) {\n  // Kodni yozing\n}",
      hint: "Math.round-dan foydalaning.",
      test: "if (typeof evaluateTradeoff !== 'function') return 'evaluateTradeoff topilmadi'; if (evaluateTradeoff(10, 20) !== 14) return '10 va 20 uchun xato'; if (evaluateTradeoff(100, 5) !== 62) return '100 va 5 uchun xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "System Design intervyusining eng asosiy maqsadi nima?",
      options: [
        "Nomzodning kod yozish tezligini tekshirish",
        "Nomzodning cheklovlar va talablar ostida tradeofflarni qanday tahlil qilishini baholash",
        "Eng zamonaviy texnologiyalar nomlarini so'rash",
        "Faqat bitta to'g'ri arxitekturani topishni talab qilish"
      ],
      correctAnswer: 1,
      explanation: "Tizimli dizayn intervyusida to'g'ri yoki noto'g'ri yechim bo'lmaydi, eng muhimi muayyan sharoitda eng yaxshi tradeofflarni tanlashdir."
    },
    {
      id: 1,
      question: "Junior (L3) darajasidagi nomzoddan tizimli dizaynda nima kutiladi?",
      options: [
        "Globally distributed ma'lumotlar bazasini loyihalash",
        "Kliyent-server asoslari, oddiy relyatsion sxema va caching tushunchalari",
        "Consensus algoritmlarini yozib berish",
        "Hech qanday dizayn bilim kutilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Junior nomzodlar uchun murakkab taqsimlangan tizimlar shart emas, asosiy kliyent-server va sodda ma'lumotlar oqimini bilish kifoya."
    },
    {
      id: 2,
      question: "Mid-Level (L4) dasturchi intervyusida yuklama va miqyos (scale) qanday bo'ladi?",
      options: [
        "Faqat bitta foydalanuvchi uchun tizim",
        "Minglab yoki millionlab foydalanuvchilar, aniq QPS raqamlari bilan o'rta yuklama",
        "Milliardlab foydalanuvchilar va 10 ta hududdan iborat tizim",
        "Yuklama ahamiyatsiz"
      ],
      correctAnswer: 1,
      explanation: "L4 darajada tizim miqyosi o'rta darajaga ko'tariladi va nomzod asosiy masshtablash primitivlarini qo'llay olishi talab etiladi."
    },
    {
      id: 3,
      question: "Senior (L5) muhandislar intervyuda qanday xatodan qochishlari kerak?",
      options: [
        "Dizaynning eng qiyin 1-2 muammosiga kirmasdan, hamma komponentni sayoz chizib chiqish",
        "Savollarni juda ko'p berish",
        "Faqat bitta ma'lumotlar bazasini bilish",
        "Kod yozishni boshlash"
      ],
      correctAnswer: 0,
      explanation: "Senior muhandislar sayoz dizayn o'rniga eng muhim muammolarni (masalan, celebrity problem yoki konsistentlik) aniqlab, chuqur tahlil qila olishlari kerak."
    },
    {
      id: 4,
      question: "Staff (L6+) darajasidagi intervyuda qanday ikkinchi darajali masalalar so'raladi?",
      options: [
        "Kod sinflarining nomi",
        "Tashkiliy tuzilma, tizim evolyutsiyasi, migratsiya narxi va 5 yillik reja",
        "Faqat CSS va HTML sozlamalari",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Staff darajasida dasturiy arxitekturadan tashqari uning tashkilotga va tizimning kelajakdagi rivojlanishiga ta'siri (second-order effects) muhim hisoblanadi."
    },
    {
      id: 5,
      question: "System Design intervyusini boshlashda eng birinchi qilinadigan ish nima?",
      options: [
        "Load Balancer-ni chizish",
        "Talablarni va tizim cheklovlarini savollar orqali aniqlashtirish",
        "Postgres bazasini tanlash",
        "Darhol whiteboardni to'ldirish"
      ],
      correctAnswer: 1,
      explanation: "Muammoni va uning miqyosini bilmasdan yechim chizish eng katta xatodir. Avval talablar aniqlashtiriladi."
    },
    {
      id: 6,
      question: "Tizimli dizaynni o'rganishning Phase 1 (Foundations) bosqichida nima o'rganiladi?",
      options: [
        "Butun boshli Uber tizimini chizish",
        "Taxminan 10 ta asosiy arxitektura primitivlari (caching, sharding, queues va h.k.)",
        "Faqat algoritmlar",
        "React state management"
      ],
      correctAnswer: 1,
      explanation: "Birinchi bosqichda tizimning poydevori bo'lgan ma'lumotlar saqlash, keshlash va tarmoq trafigini taqsimlash kabi primitivlar o'rganiladi."
    },
    {
      id: 7,
      question: "Tizimli dizaynni o'rganishning Phase 2 (Composition) bosqichining maqsadi nima?",
      options: [
        "Faqat yangi dasturlash tillarini o'rganish",
        "Primitivlar qanday qilib canonical patternlarga (Feed, Chat, Map) birlashishini tushunish",
        "Docker konteynerlarini sozlash",
        "Git buyruqlarini yodlash"
      ],
      correctAnswer: 1,
      explanation: "Composition bosqichida foundations-da o'rganilgan primitivlar qanday qilib yirik va tayyor andozalarga (patterns) aylanishi o'rganiladi."
    },
    {
      id: 8,
      question: "Phase 3 (Practice) bosqichida qaysi usul eng samarali hisoblanadi?",
      options: [
        "Matn muharririda shunchaki o'qib chiqish",
        "Vaqt taymerini qo'yib, doskada yoki qog'ozda tizimni noldan loyihalash va mock intervyular qilish",
        "YouTube-dagi videolarni passiv tomosha qilish",
        "Faqat intervyu savollarini yodlash"
      ],
      correctAnswer: 1,
      explanation: "Taymer ostida whiteboardda noldan chizish va uni kimgadir tushuntirib himoya qilish eng yuqori natijani beradi."
    },
    {
      id: 9,
      question: "System Design intervyusida nima uchun yodlab olingan dizaynlar tez fosh bo'ladi?",
      options: [
        "Chunki intervyuerlar har doim boshqa tilda so'rashadi",
        "Chunki intervyuerlar talablarni biroz o'zgartiradi va nomzod moslasha olmaydi",
        "Chunki intervyu faqat kod yozishdan iborat",
        "Ular fosh bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar nomzod dizaynni shunchaki yodlagan bo'lsa, talablardagi kichik o'zgarish (masalan: offline rejim yoki boshqa QPS) butun dizaynni qaytadan o'ylashni talab qilganda nomzod qolib ketadi."
    },
    {
      id: 10,
      question: "Active Recall (Faol eslash) usulining mohiyati nima?",
      options: [
        "Matnni qayta-qayta 10 marta o'qish",
        "O'qilgan mavzuni manbaga qaramasdan o'z so'zlari bilan tushuntirish yoki yozish",
        "Mavzuni ovoz chiqarib o'qish",
        "Hech narsani eslamaslik"
      ],
      correctAnswer: 1,
      explanation: "Faol eslash passiv o'qishni faol bilimga aylantiradi. Agar manbaga qaramay kesh strategiyasini tushuntira olmasangiz, demak hali to'liq o'rganmagansiz."
    },
    {
      id: 11,
      question: "Junior nomzodlar intervyuda qanday xatoga yo'l qo'yib jazolanishi mumkin?",
      options: [
        "Tizimni juda oddiy loyihalash",
        "Kichik vazifaga ulkan va keraksiz murakkabliklarni (D taqsimlangan tizimlar) qo'shish (Over-engineering)",
        "Database sxemasini chizish",
        "Savol berish"
      ],
      correctAnswer: 1,
      explanation: "Junior muhandislar talab qilinmagan joyga o'ta murakkab arxitekturalarni qo'shsa (over-engineering), intervyuerlar buni salbiy baholaydi."
    }
  ]
};
