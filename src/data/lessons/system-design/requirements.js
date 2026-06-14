export const requirements = {
  id: "requirements",
  title: "Funksional va Nofunksional Talablar (Functional vs. Non-functional Requirements)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tizim loyihalashni boshlashdan oldin, biz nima qurayotganimizni va u qanday ishlashi kerakligini aniq bilishimiz kerak. Dasturiy ta'minot muhandisligida barcha talablar ikki toifaga bo'linadi: **Funksional talablar (Functional Requirements)** va **Nofunksional talablar (Non-functional Requirements)**.

Tasavvur qiling, siz yangi **mashina** sotib olmoqchisiz:
- **Funksional talablar (U nima qila oladi?):** Mashina yura olishi, odamlarni tashiy olishi, tormoz bosa olishi, eshiklari ochilishi kerak. Bu mashinaning asosiy vazifalari.
- **Nofunksional talablar (U buni qanday bajaradi?):** Mashinaning tezligi soatiga 200 km gacha chiqa olishi (Performance), u juda xavfsiz bo'lishi (Security), yo'lovchilar soni ko'paysa ham qiynalmay yura olishi (Scalability) va har kuni buzilib qolmasligi (Availability).

Veb-tizim misolida:
- **Funksional:** "Foydalanuvchi rasmni yuklay olishi va izoh yozishi kerak."
- **Nofunksional:** "Rasm 2 soniya ichida yuklanishi va tizim 99.9% vaqt davomida o'chiq qolmasdan ishlashi kerak."

---

## 2. 💻 Real Kod Misollari

Tizimli dizayn intervyularida siz ko'pincha tizimning **Availability (foydalanishga tayyorlik darajasi)** va **SLA (hizmat ko'rsatish shartnomasi)** parametrlarini hisoblashingiz kerak bo'ladi. Quyida tizimning bir yildagi o'chish vaqti (downtime) bo'yicha uning foiz ko'rsatkichini hisoblovchi kod keltirilgan:

\`\`\`javascript
// Tizim availability (ishlash) foizini hisoblash
function calculateAvailability(downtimeHoursPerYear) {
  const totalHoursInYear = 365 * 24; // 8760 soat
  const uptimeHours = totalHoursInYear - downtimeHoursPerYear;
  const availabilityPercentage = (uptimeHours / totalHoursInYear) * 100;
  
  return {
    percentage: availabilityPercentage.toFixed(3) + "%",
    status: availabilityPercentage >= 99.9 ? "SLA talablariga javob beradi" : "SLA buzildi!"
  };
}

console.log(calculateAvailability(8.76)); 
// { percentage: "99.900%", status: "SLA talablariga javob beradi" } (Bu "3 ta to'qqizlik" deb ataladi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

System Design intervyularida intervyuerlar savolni ataylab juda noaniq va qisqa berishadi (Masalan: "Design YouTube"). Siz darhol chizmasdan, talablarni guruhlashingiz shart:

### 1. Funksional Talablar (Core Features)
Siz foydalanuvchilar qila oladigan **asosiy harakatlarni** ro'yxat qilasiz. Ko'p vaqt sarflamang, 3-4 ta eng muhimini tanlang:
- Foydalanuvchi video yuklay olishi kerak.
- Foydalanuvchi videolarni ko'ra olishi kerak.
- Videolarga izoh va layk bosish imkoniyati.

### 2. Nofunksional Talablar (System Quality)
Tizimning ishlash parametrlari va sifat ko'rsatkichlari:
- **Scalability (Kengayuvchanlik):** Kuniga 100 million faol foydalanuvchi (DAU).
- **Latency (Kechikish):** Video yuklanishi silliq va kechikish 200 millisekunddan kam bo'lishi lozim.
- **Availability (Tayyorlik):** Tizim 99.99% vaqt ish holatida bo'lishi (High Availability).
- **Consistency vs Availability:** Videolarni yuklashda ma'lumotlar yo'qolmasligi (durability) va tizim har doim foydalanishga ochiq bo'lishi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Nofunksional talablarni e'tiborsiz qoldirish:** Faqat "Foydalanuvchi rasm yuklaydi va ko'radi" deb kod yozish va uning millionlab odamlar kelganda qanday ishlashini (miqyosini) o'ylamaslik.
2. **Hamma narsani mukammal qilishga urinish:** Ham 100% konsistent (consistency), ham 100% ochiq (availability) tizim yaratishga urinish. CAP teoremasiga ko'ra bu imkonsiz.
3. **Noaniq raqamlar ishlatish:** "Tizim tez ishlashi kerak" deyish noto'g'ri. Buning o'rniga: "Tizimning p99 kechikish vaqti (latency) 200ms dan kam bo'lishi kerak" deb aniq o'lchov qo'yish lozim.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Funksional talab nima?**
Tizim foydalanuvchi uchun bajarishi shart bo'lgan aniq funksiyalar va biznes-vazifalar.

**2. Nofunksional talab nima?**
Tizimning sifati, xavfsizligi, tezligi, kengayuvchanligi va ishonchliligini belgilovchi cheklovlar.

**3. Tizimning "High Availability" (Yuqori tayyorlik) ko'rsatkichi qanday o'lchanadi?**
Odatda "to'qqizliklar" foizi bilan. Masalan, 99.9% (3 ta to'qqizlik) yilda 8.76 soat o'chishga ruxsat beradi, 99.99% (4 ta to'qqizlik) esa yiliga 52.6 daqiqa o'chishni anglatadi.

**4. SLA va SLO farqi nima?**
SLO (Service Level Objective) — bu jamoa erishmoqchi bo'lgan ichki maqsad (masalan, 99.9% uptime). SLA (Service Level Agreement) — bu mijoz bilan tuzilgan rasmiy shartnoma bo'lib, SLO buzilgan taqdirda moliyaviy jarimalarni ko'zda tutadi.

**5. Latency (Kechikish) nima?**
Bitta so'rov yuborilgandan boshlab unga javob qaytib kelguncha ketgan vaqt (millisekundlarda o'lchanadi).

**6. Throughput (O'tkazuvchanlik) nima?**
Tizim muayyan vaqt oralig'ida (masalan, 1 soniyada) qayta ishlay oladigan jami so'rovlar yoki ma'lumotlar hajmi (QPS yoki Bytes/sec).

**7. Nima uchun har doim kuchli konsistentlikdan (Strong Consistency) foydalana olmaymiz?**
Chunki kuchli konsistentlik barcha serverlarda ma'lumot bir vaqtda yangilanishini talab qiladi, bu esa yozish tezligini juda sekinlashtiradi va tarmoq bo'linganda tizimni butunlay to'xtatib qo'yishi mumkin.

**8. CAP teoremasi nima?**
Taqsimlangan tizimlarda bir vaqtning o'zida Konsistentlik (Consistency), Ochiqlik (Availability) va Bo'linishga chidamlilik (Partition Tolerance) xususiyatlarining faqat ikkitasini ta'minlash mumkinligi haqidagi qoida.

**9. Read-heavy va Write-heavy tizim nima?**
Read-heavy tizimda o'qish so'rovlari yozishga qaraganda ancha ko'p bo'ladi (masalan, Twitter - 99% o'qish, 1% yozish). Write-heavy tizimda esa ma'lumot yozish ko'p bo'ladi (masalan, IoT sensorlaridan log to'plash).

**10. Durability (Bardoshlilik) nima?**
Tizimga yozilgan ma'lumot server qulab tushgan yoki elektr uzilgan taqdirda ham yo'qolib ketmasligi kafolati.

**11. Nima uchun intervyuda nofunksional talablarni yozish muhim?**
Chunki bu sizga qaysi texnologiyani (SQL vs NoSQL, keshlash darajasi, sharding strategiyasi) tanlashni aniqlab beradi.

**12. P99 Latency nima?**
So'rovlarning 99% foizi belgilangan vaqtdan tezroq bajarilganini va faqat eng sekin 1% so'rovlargina undan ko'p vaqt olganini ko'rsatadigan ko'rsatkich.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi exercises bo'limida bajarib, bilimingizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali darajangizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Case Study: E-commerce Product Inventory Consistency vs Availability
Katta onlayn do'konda (masalan, Amazon):
- **Funksional talab:** Mijoz mahsulotni savatchaga qo'shishi va sotib olishi kerak.
- **Nofunksional talab:** Savatchadagi tovarlar soni real vaqtda bazadan tekshirilishi kerak. Mahsulot zaxirasini (Inventory) boshqarishda **Consistency** muhimroq (chunki bitta tovarni ikki kishi bir vaqtda sotib olib qo'ymasligi kerak). Shuning uchun bu yerda tranzaksiyaviy relyatsion bazalar ishlatiladi. Lekin mahsulot rasmlari va tavsiflarini o'qishda **Availability** ustuvor, shuning uchun statik kontent CDN va keshlarda saqlanadi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    SystemRequirements[Tizim Talablari] --> FR[Funksional Talablar - NIMA qiladi?]
    SystemRequirements --> NFR[Nofunksional Talablar - QANDAY ishlaydi?]
    
    FR --> FR1[Rasm yuklash]
    FR --> FR2[Do'stlashish]
    FR --> FR3[Chat yozish]
    
    NFR --> NFR1[Performance / Latency < 200ms]
    NFR --> NFR2[Scalability / 10M+ DAU]
    NFR --> NFR3[Availability / 99.99% Uptime]
    NFR --> NFR4[Security / JWT + HTTPS]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Talab turi | Savol | Misollar | Intervyudagi o'rni |
| :--- | :--- | :--- | :--- |
| **Funksional (FR)** | Tizim nima ish bajaradi? | Video ko'rish, API yaratish, ro'yxatdan o'tish | Boshlang'ich komponentlar va sxemalarni aniqlaydi |
| **Nofunksional (NFR)** | Tizim qanday sifatda ishlaydi? | Latency < 100ms, 99.9% Uptime, SQL/NoSQL tanlovi | Kengaytirish va masshtablash strategiyasini aniqlaydi |
`,
  exercises: [
    {
      id: 1,
      title: "Availability Foizini Hisoblash",
      instruction: "Bir yildagi o'chish daqiqalari (downtimeMinutes) berilganda, tizimning uptime foizini hisoblaydigan `getAvailability(downtimeMinutes)` funksiyasini yozing. Bir yilda jami 525600 daqiqa bor deb hisoblang. Natijani string ko'rinishida to'rtta kasr raqami bilan qaytaring (masalan: `\"99.9990\"`).",
      startingCode: "function getAvailability(downtimeMinutes) {\n  const totalMinutes = 525600;\n  // Kodni shu yerga yozing\n}",
      hint: "Uptime daqiqasini jami daqiqaga bo'ling, 100 ga ko'paytiring va .toFixed(4) ishlating.",
      test: "if (typeof getAvailability !== 'function') return 'getAvailability topilmadi'; if(getAvailability(52.56) !== '99.9900') return '99.99% uchun xato'; if(getAvailability(0) !== '100.0000') return '100% uchun xato'; return null;"
    },
    {
      id: 2,
      title: "SLA Kechikishini Tekshirish",
      instruction: "SLA kelishuviga ko'ra so'rov latency muddati 200ms dan oshmasligi kerak. Berilgan `latencyMs` millisekundda SLA buzilgan yoki yo'qligini aniqlaydigan `isSLABreached(latencyMs)` funksiyasini yozing (buzilgan bo'lsa true, aks holda false).",
      startingCode: "function isSLABreached(latencyMs) {\n  // Kodni yozing\n}",
      hint: "latencyMs > 200 tekshiruvi yetarli.",
      test: "if (typeof isSLABreached !== 'function') return 'isSLABreached topilmadi'; if(isSLABreached(150) !== false) return '150ms uchun xato'; if(isSLABreached(201) !== true) return '201ms uchun xato'; return null;"
    },
    {
      id: 3,
      title: "Throughput (Hajm) Hisoblash",
      instruction: "Soniyadagi so'rovlar soni (`qps`) va bitta so'rovning o'rtacha hajmi (`averageRequestSizeBytes`) berilganda, tizimning o'tkazuvchanligini (Throughput) soniyadagi baytlar hisobida qaytaruvchi `getBytesPerSecond(qps, averageRequestSizeBytes)` funksiyasini yozing.",
      startingCode: "function getBytesPerSecond(qps, averageRequestSizeBytes) {\n  // Kodni yozing\n}",
      hint: "QPS va o'rtacha bayt hajmini ko'paytiring.",
      test: "if (typeof getBytesPerSecond !== 'function') return 'getBytesPerSecond topilmadi'; if(getBytesPerSecond(100, 1024) !== 102400) return 'Hisoblash xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "Quyidagilardan qaysi biri Funksional talab (Functional Requirement) hisoblanadi?",
      options: [
        "Tizimning p99 kechikish vaqti 200ms dan oshmasligi kerak",
        "Foydalanuvchi do'stlariga shaxsiy xabar yubora olishi kerak",
        "Barcha ma'lumotlar bazada shifrlangan bo'lishi kerak",
        "Tizim 99.99% uptime-ga ega bo'lishi kerak"
      ],
      correctAnswer: 1,
      explanation: "Foydalanuvchi qila oladigan biznes-funksiya (masalan, xabar yuborish) funksional talabdir. Qolganlari esa nofunksional sifat talablaridir."
    },
    {
      id: 1,
      question: "Nofunksional talablar (Non-functional Requirements) nimani belgilaydi?",
      options: [
        "Tizim nima ish qilishini",
        "Tizim qanday sifat ko'rsatkichlari (tezlik, xavfsizlik, kengayuvchanlik) ostida ishlashini",
        "Dasturchilarning ish haqini",
        "Faqat dizayn ranglarini"
      ],
      correctAnswer: 1,
      explanation: "Nofunksional talablar tizim funksiyalarining qanday sifat ko'rsatkichlarida bajarilishini (how the system behaves) belgilaydi."
    },
    {
      id: 2,
      question: "Tizimning availability (ish holatida bo'lish) darajasidagi 'to'rtta to'qqizlik' (99.99%) nimani anglatadi?",
      options: [
        "Tizim yiliga 4 kun o'chiq qolishi mumkinligini",
        "Tizim yiliga maksimal 52.6 daqiqa o'chiq qolishi mumkinligini",
        "Tizimda 99.99 ta server borligini",
        "Faqat 99.99% foydalanuvchilar kira olishini"
      ],
      correctAnswer: 1,
      explanation: "99.99% uptime tizimning yiliga taxminan 52.56 daqiqa (yoki kuniga 8.6 soniya) davomida o'chishi (downtime) mumkinligini kafolatlaydi."
    },
    {
      id: 3,
      question: "SLA (Service Level Agreement) nima?",
      options: [
        "Faqat dasturchilar uchun yozilgan kod hujjati",
        "Mijoz va xizmat ko'rsatuvchi o'rtasidagi rasmiy shartnoma bo'lib, u yuridik va moliyaviy javobgarlikni belgilaydi",
        "Yangi ma'lumotlar bazasi nomi",
        "Faqat parollarni shifrlash qoidasi"
      ],
      correctAnswer: 1,
      explanation: "SLA — bu xizmat ko'rsatish darajasi buzilsa, jarimalar va huquqiy oqibatlarni o'z ichiga oluvchi biznes shartnomasidir."
    },
    {
      id: 4,
      question: "Throughput (O'tkazuvchanlik) deganda nimani tushunasiz?",
      options: [
        "Bitta so'rovning boshlanishidan tugashigacha bo'lgan vaqt",
        "Tizim soniyasiga qayta ishlay oladigan jami so'rovlar yoki ma'lumotlar hajmi (QPS, Bytes/s)",
        "Bazada saqlangan fayllar soni",
        "Sessiyalar muddati"
      ],
      correctAnswer: 1,
      explanation: "Throughput tizimning ma'lum bir vaqt ichida qancha yuklamani ko'tara olish qobiliyatidir (masalan, Queries Per Second)."
    },
    {
      id: 5,
      question: "Taqsimlangan tizimlarda bir vaqtning o'zida ham 100% Availability, ham 100% Consistency ta'minlash nima uchun imkonsiz?",
      options: [
        "Chunki serverlar narxi juda qimmat",
        "CAP teoremasiga ko'ra, tarmoq bo'linganida (Partition) ikkisidan birini tanlash shart",
        "Chunki dasturchilar buni xohlamaydi",
        "Bu imkoniyat SQL bazalarda bor"
      ],
      correctAnswer: 1,
      explanation: "CAP teoremasi taqsimlangan tarmoq buzilganda (P) yo tizim ochiqligini (A) yo ma'lumotlar mosligini (C) tanlashga majbur qiladi."
    },
    {
      id: 6,
      question: "Read-heavy tizimga qaysi loyiha misol bo'la oladi?",
      options: [
        "IoT datchiklaridan tinimsiz ma'lumot yozadigan monitoring tizimi",
        "Foydalanuvchilar 99% vaqtda faqat postlarni o'qiydigan va kam yozadigan ijtimoiy tarmoq",
        "Bank tranzaksiyalarini qayd etish tizimi",
        "Faqat fayl yuklaydigan bulutli arxiv"
      ],
      correctAnswer: 1,
      explanation: "Ijtimoiy tarmoqlar (Twitter, Instagram) odatda o'qish (read-heavy) so'rovlariga yo'naltirilgan bo'ladi."
    },
    {
      id: 7,
      question: "Latency (kechikish) nima?",
      options: [
        "Tizimning bir soniyadagi jami so'rovlari",
        "So'rov yuborilgandan javob olingungacha bo'lgan vaqt oralig'i (ms)",
        "Serverning jismoniy vazni",
        "Ma'lumotlar bazasining hajmi"
      ],
      correctAnswer: 1,
      explanation: "Latency — bu so'rovning kechikish vaqti, ya'ni tizim qanchalik tez javob berishining o'lchovidir."
    },
    {
      id: 8,
      question: "Nofunksional talablar ichidagi 'Durability' nimani kafolatlaydi?",
      options: [
        "Sayt chiroyli ko'rinishda saqlanib qolishini",
        "Baza yoki server qulagan taqdirda ham tasdiqlangan ma'lumotlar yo'qolmasligini",
        "Tizim tezkor ishlashini",
        "Faqat foydalanuvchilar parollari o'zgarmasligini"
      ],
      correctAnswer: 1,
      explanation: "Durability (bardoshlilik) yozilgan ma'lumotning xotirada jismoniy saqlanib qolishini kafolatlaydi (masalan, diskka yozilish orqali)."
    },
    {
      id: 9,
      question: "P99 latency 300ms degani nimani anglatadi?",
      options: [
        "Barcha so'rovlarning 99% qismi 300ms ichida yoki undan tezroq bajarilgan",
        "Faqat 99 ta so'rov 300ms davom etgan",
        "Tizim soniyasiga 99 ta so'rov qabul qiladi",
        "SLA 99% ga buzilgan"
      ],
      correctAnswer: 0,
      explanation: "Percentile (p99) so'rovlarning 99 foizi 300ms dan kam vaqt olganini, faqat eng sekin 1% so'rovlargina 300ms dan sekin ishlaganini bildiradi."
    },
    {
      id: 10,
      question: "System Design intervyusida nima uchun 'Scalability' (masshtablash) talabi muhim?",
      options: [
        "Tizim o'zgaruvchan foydalanuvchilar oqimi va yuklamasiga qanday moslashishini bilish uchun",
        "Kod chiroyli yozilishi uchun",
        "CSS animatsiyalari ishlashi uchun",
        "Faqat loyiha bepul bo'lishi uchun"
      ],
      correctAnswer: 0,
      explanation: "Masshtablash talabi tizim yuklama ortganda (foydalanuvchilar soni oshganda) qanday kengayishini (gorizontal/vertikal) aniqlab beradi."
    },
    {
      id: 11,
      question: "Nima uchun intervyuda noaniq talablar bilan ishlash kerak?",
      options: [
        "Chunki bu dasturchini chalg'itadi",
        "Chunki real hayotda ham mijozlar talablarni noaniq beradi va muhandis ularni aniqlashtira olishi kerak",
        "Chunki intervyuerlar savol tuzishni bilmaydi",
        "Talablar umuman muhim emas"
      ],
      correctAnswer: 1,
      explanation: "Real muammolarni hal qilishda noaniqlikni yo'qotib, aniq texnik talablar (FR/NFR) ishlab chiqish muhandislikning eng muhim qismidir."
    }
  ]
};
