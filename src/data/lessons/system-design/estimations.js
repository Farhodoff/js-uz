export const estimations = {
  id: "estimations",
  title: "Tizim O'lchamlarini Taxmin Qilish (Back-of-the-Envelope Estimations)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tizimli dizayn intervyularida **Back-of-the-envelope estimation** (tavakkal yoki "salfetka ustidagi" hisob-kitoblar) — bu murakkab va aniq matematik formulalarsiz, taxminiy va tezkor hisoblash texnikasidir. Bu xuddi tushlik paytida kafeda salfetka orqasiga qalam bilan yozib, yangi biznes g'oyaning rentabelligini chamalashga o'xshaydi.

Tasavvur qiling, siz **to'y marosimi uchun oziq-ovqat** buyurtma qilmoqchisiz:
- Siz har bir mehmonning aniq necha gramm go'sht yoki necha millilitr suv ichishini oxirgi grammgacha o'lchab o'tirmaysiz.
- Buning o'rniga, taxminan "1 ta mehmonga 500 gramm taom va 1 litr ichimlik" deb olasiz (qoida/rule of thumb). Mehmonlar soni 200 ta bo'lsa, sizga 100 kg taom va 200 litr ichimlik kerakligini soniyalar ichida hisoblaysiz.

Tizimli dizaynda ham 100 million foydalanuvchi uchun qancha disk xotirasi, qancha server protsessori (cores) va qancha tarmoq kengligi (bandwidth) kerakligini xuddi shunday oddiy arifmetika bilan hisoblab olasiz.

---

## 2. 💻 Real Kod Misollari

Intervyuda hisob-kitoblarni tekshirish va tezkor dasturlash uchun quyidagi yordamchi hisoblagichlardan foydalanishingiz mumkin:

\`\`\`javascript
// QPS va kunlik xabarlar soniga qarab doimiy saqlash hajmini (Storage) GB da taxminlash
function estimateDailyStorageGB(qps, averageMessageSizeBytes) {
  // 1 kun = 86,400 soniya
  const dailyRequests = qps * 86400;
  const totalBytes = dailyRequests * averageMessageSizeBytes;
  
  // Baytdan Gigabaytga o'tkazish (1 GB = 10^9 bayt deb yaxlitlaymiz)
  const totalGB = totalBytes / 1e9;
  
  return Math.round(totalGB * 100) / 100; // 2 ta kasr xonali GB
}

console.log(estimateDailyStorageGB(10000, 500)); 
// 10,000 QPS va 500 baytli xabar uchun: ~432 GB/kunlik xotira kerak
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Hisob-kitoblarni amalga oshirishda quyidagi 4 ta asosiy usul qo'llaniladi:

1. **Rule of thumb (Tajribaga asoslangan qoidalar):** Sanoatda qabul qilingan o'rtacha qiymatlar. Masalan, "bitta rasm o'rtacha 2 MB", "video oqimi soniyasiga 4 Mbps yuk yeydi" deb qabul qilish.
2. **Approximation (Yaxlitlash):** Hisobni osonlashtirish uchun sonlarni yaxlitlab olasiz. Kunlik soniyalar soni **86,400** ni **90,000** yoki **100,000** deb olish orqali miyangizda tezroq hisoblaysiz. 1 KB ni 1000 bayt (1024 o'rniga) deb olasiz.
3. **Breakdown and aggregation (Bo'laklash va jamlash):** Muammoni qismlarga ajratasiz. Masalan, ijtimoiy tarmoq xotirasini hisoblashda: Matnli postlar xotirasi + Rasmlar xotirasi + Videolar xotirasini alohida hisoblab, keyin qo'shasiz.
4. **Sanity check (Mantiqiy tekshiruv):** Topilgan natijani real hayot bilan solishtirasiz. Agar siz hisoblagan xotira hajmi butun dunyodagi internet xotirasidan ko'p chiqsa, demak qayerdadir xato qilgansiz.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **O'ta aniqlikka intilish:** Intervyuda 1024 ga ko'paytirib vaqt yo'qotish va xato qilish. Intervyuerga aniq raqam emas, balki taxminiy tartib (order of magnitude) muhim. Masalan, 10 GB o'rniga 10.24 GB deb hisoblash shart emas.
2. **O'lchov birliklarini aralashtirib yuborish:** Gigabit (Gb - tarmoq tezligi uchun) va Gigabayt (GB - disk uchun) farqiga bormaslik (1 Bayt = 8 Bit).
3. **Sukut saqlab hisoblash:** Whiteboard oldida jim qolib, ichingizda matematik hisoblar qilish. Har bir taxminingiz va ko'paytirishingizni intervyuerga ovoz chiqarib tushuntirishingiz kerak.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Back-of-the-envelope estimation nima uchun kerak?**
Tizim arxitekturasining hayotiyligini tekshirish, bottleneck (tiqilinchlar)ni aniqlash va qancha server yoki xotira sotib olish kerakligini bilish uchun.

**2. 1 million QPS ga ega tizim uchun kesh xotirasi qancha bo'lishi kerak?**
80/20 qoidasiga ko'ra (so'rovlarning 80% qismi 20% ma'lumotlarga keladi), kunlik faol ma'lumotlarning 20% qismini RAM keshda saqlash tavsiya etiladi.

**3. Latency estimation-da ketma-ket va parallel so'rovlar qanday hisoblanadi?**
Ketma-ket so'rovlar latency yig'indisiga teng ($T_1 + T_2 + T_3$). Parallel so'rovlar esa eng sekin ishlovchi manba latency vaqtiga teng ($max(T_1, T_2, T_3)$).

**4. 1 million faol foydalanuvchidan kuniga necha so'rov keladi?**
Agar har bir foydalanuvchi kuniga 10 ta so'rov amalga oshirsa, kuniga 10 million so'rov keladi. Bu soniyasiga taxminan 115 requests/sec (QPS).

**5. L1 cache va RAM (Main memory) o'rtasidagi tezlik farqi qancha?**
L1 keshga kirish 0.5 ns (nanosekund), asosiy xotiraga (RAM) kirish esa 100 ns oladi. RAM keshdan 200 barobar sekinroq.

**6. Diskdan ketma-ket 1 MB o'qish (sequential read) qancha vaqt oladi?**
Taxminan 30 ms (millisekund) yoki 30,000,000 ns.

**7. Memory va Network orqali 1 MB o'qish farqi qanday?**
Xotiradan (RAM) 1 MB o'qish 0.25 ms (250 μs) olsa, tarmoqdan (1 Gbps) o'qish 10 ms oladi. RAM tarmoqdan 40 barobar tez.

**8. Bandwidth estimation nima?**
Tizimning foydalanuvchilar oqimini ko'tarish uchun soniyasiga tarmoq kanali orqali o'tishi kerak bo'lgan ma'lumot oqimi tezligi (bps yoki B/s).

**9. "Jeff Dean latency raqamlari" nima?**
Dasturchilar bilishi kerak bo'lgan, turli kompyuter operatsiyalari (L1, L2 kesh, RAM, Disk, Tarmoq) bajarilish tezliklarining taxminiy standart jadvali.

**10. Yaxlitlashda 1 sutkani necha soniya deb olish qulayroq?**
Aslida 86,400 soniya. Lekin tezkor hisoblash uchun uni 90,000 yoki 100,000 soniya deb olish oson.

**11. QPS va TPS farqi nima?**
QPS (Queries Per Second) — o'qish va yozish so'rovlari soni. TPS (Transactions Per Second) — faqat yozish yoki to'lov tranzaksiyalari kabi yakuniy amallar soni.

**12. Hisoblashda foydalaniladigan 80/20 qoidasi nima?**
Ma'lumotlar oqimining 80% qismi foydalanuvchilarning eng faol 20% qismi tomonidan generatsiya qilinishi yoki o'qilishi haqidagi empirik qonuniyat.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi exercises bo'limida bajarib, bilimingizni tekshirib oling.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Case Study: WhatsApp-like Messenger Storage Planning
- **FR:** Matnli xabarlar yuborish.
- **NFR/Scale:** 1 milliard foydalanuvchi, kuniga 50 ta xabar yuboradi. Bitta xabar o'rtacha 100 bayt.
- **Hisoblash:**
  1. Kunlik xabarlar jami: $10^9 \\times 50 = 5 \\times 10^{10}$ xabar.
  2. Kunlik xotira: $5 \\times 10^{10} \\times 100$ bayt = $5 \\times 10^{12}$ bayt = 5 Terabayt (TB).
  3. 1 yillik xotira: $5 \\text{ TB} \\times 365 \\approx 1825 \\text{ TB} \\approx 1.8 \\text{ Petabayt (PB)}$.
  - Natija: Server sotib olishda bizga 1 yillik xabarlarni saqlash uchun 1.8 PB jismoniy sig'im kerak bo'ladi (replica va indekslar bilan bu raqam 2-3 barobar ortishi mumkin).

---

## 9. 🧠 Vizual ko'rinish (Latency Comparison Diagram)

\`\`\`mermaid
gantt
    title Latency Taqqoslashi (Parallel vs Sequential)
    dateFormat  X
    axisFormat %s
    
    section Sequential (Ketma-ket)
    Service A (50ms) :active, a1, 0, 50
    Service B (100ms) :active, a2, 50, 150
    Service C (200ms) :active, a3, 150, 350
    
    section Parallel (Bir vaqtda)
    Service A (50ms) :active, p1, 0, 50
    Service B (100ms) :active, p2, 0, 100
    Service C (200ms) :active, p3, 0, 200
\`\`\`

---

## 10. 📌 Cheat Sheet

| Operatsiya turi | Taxminiy kechikish vaqti | Izoh |
| :--- | :--- | :--- |
| **L1 kesh o'qish** | 0.5 ns | Eng tezkor RAM ichidagi kesh |
| **Main memory (RAM)** | 100 ns | Operativ xotiradan ma'lumot olish |
| **1 MB RAM dan o'qish** | 250 μs (0.25 ms) | RAM ichida ketma-ket nusxalash |
| **Datacenter RTT** | 500 μs (0.5 ms) | Bitta markazdagi serverlar aloqasi |
| **Disk seek** | 10 ms | Mexanik diskning qidirish vaqti |
| **1 MB Diskdan o'qish** | 30 ms | SSD disklarida bu ancha tezroq |
`,
  exercises: [
    {
      id: 1,
      title: "QPS hisoblash",
      instruction: "Kunlik faol foydalanuvchilar soni (`dau`) va har bir foydalanuvchi kuniga bajaradigan o'rtacha amallar soni (`actionsPerUser`) berilgan. Tizimning soniyadagi o'rtacha so'rovlar sonini (QPS) hisoblaydigan `calculateQPS(dau, actionsPerUser)` funksiyasini yozing. Kun davomidagi jami soniyalarni 86400 deb oling va natijani eng yaqin butun songacha yaxlitlang.",
      startingCode: "function calculateQPS(dau, actionsPerUser) {\n  // Kodni yozing\n}",
      hint: "Jami so'rovlarni 86400 ga bo'lib yaxlitlang.",
      test: "if (typeof calculateQPS !== 'function') return 'calculateQPS topilmadi'; if(calculateQPS(1000000, 10) !== 116) return 'Hisoblash xato'; return null;"
    },
    {
      id: 2,
      title: "Yillik xotirani taxminlash",
      instruction: "Tizim uchun kunlik yoziladigan ma'lumot hajmi Gigabaytda (`dailyStorageGB`) berilgan. 1 yilda (365 kun) to'planadigan jami xotira hajmini Terabaytda (TB) hisoblaydigan `getStorageForYear(dailyStorageGB)` funksiyasini yozing. Hisoblashni osonlashtirish uchun 1 Terabaytni 1024 Gigabayt deb oling va natijani eng yaqin butun songacha yaxlitlang.",
      startingCode: "function getStorageForYear(dailyStorageGB) {\n  // Kodni yozing\n}",
      hint: "(dailyStorageGB * 365) / 1024 formulasidan foydalanib, yaxlitlang.",
      test: "if (typeof getStorageForYear !== 'function') return 'getStorageForYear topilmadi'; if(getStorageForYear(10) !== 4) return '10 GB uchun xato'; if(getStorageForYear(100) !== 36) return '100 GB uchun xato'; return null;"
    },
    {
      id: 3,
      title: "Parallel latency hisoblash",
      instruction: "Bir nechta uchinchi tomon API-laridan ma'lumot yig'ish kerak. API kechikish vaqtlari (millisekundda) massiv ko'rinishida berilgan. Agar so'rovlar parallel ravishda yuborilsa, jami kutish vaqti eng sekin so'rovga teng bo'ladi. Ushbu parallel latency-ni aniqlovchi `getParallelLatency(latencies)` funksiyasini yozing.",
      startingCode: "function getParallelLatency(latencies) {\n  // Kodni yozing\n}",
      hint: "Math.max-dan foydalaning.",
      test: "if (typeof getParallelLatency !== 'function') return 'getParallelLatency topilmadi'; if(getParallelLatency([50, 120, 80]) !== 120) return 'Parallel hisoblash xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "System Design-da 'Back-of-the-envelope estimation' nima degani?",
      options: [
        "Salfetka ustida chiziladigan murakkab arxitektura diagrammasi",
        "Tizim feasibility (amalga oshirilishi)ni tekshirish uchun oddiy arifmetika bilan qilinadigan taxminiy hisob-kitoblar",
        "Elektron pochta xabarlarini shifrlash usuli",
        "Serverdagi xotirani avtomatik tozalash tizimi"
      ],
      correctAnswer: 1,
      explanation: "Ushbu texnika intervyularda tizim talablari va resurslarini juda tezkor va taxminiy baholash imkonini beradi."
    },
    {
      id: 1,
      question: "Hisoblashda yaxlitlash (Approximation) nima uchun kerak?",
      options: [
        "Matematik qoidalarni buzish uchun",
        "Miyada hisoblashni osonlashtirish va intervyuda vaqtni tejash uchun",
        "Faqat NoSQL bazalarni ishlatish uchun",
        "Kodni tezroq yozish uchun"
      ],
      correctAnswer: 1,
      explanation: "1024 o'rniga 1000 yoki 86400 o'rniga 90000 deb yaxlitlash miyadagi arifmetikani tezlashtiradi va bu intervyuda normal qabul qilinadi."
    },
    {
      id: 2,
      question: "Kuniga 100 million faol foydalanuvchi kuniga 10 tadan post yozsa, o'rtacha yozish QPS ko'rsatkichi qancha bo'ladi?",
      options: [
        "Taxminan 1,150 requests/sec",
        "Taxminan 11,570 requests/sec",
        "Taxminan 115,700 requests/sec",
        "Taxminan 115 requests/sec"
      ],
      correctAnswer: 1,
      explanation: "(100,000,000 * 10) / 86400 = 1,000,000,000 / 86,400 ≈ 11,574 requests/sec."
    },
    {
      id: 3,
      question: "Taqsimlangan tizimlarda 'Sanity check' nima uchun o'tkaziladi?",
      options: [
        "Barcha kodlarni github-ga yuklash uchun",
        "Topilgan taxminiy natijaning mantiqan to'g'ri va real ekanligini tezkor tekshirib olish uchun",
        "Serverni o'chirib yoqish uchun",
        "Parollar xavfsizligini tekshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Hisob-kitob tugagach, u mantiqan to'g'riligini amaliyotdagi mavjud tizimlar bilan solishtirish 'sanity check' deb ataladi."
    },
    {
      id: 4,
      question: "Jeff Dean raqamlariga ko'ra, L1 Cache-dan ma'lumot o'qish qancha kechikish (latency) oladi?",
      options: [
        "0.5 ns (nanosekund)",
        "7 ns",
        "100 ns",
        "10 ms"
      ],
      correctAnswer: 0,
      explanation: "L1 kesh xotirasi protsessor ichidagi eng yaqin xotira bo'lib, unga kirish atigi 0.5 nanosekund vaqt oladi."
    },
    {
      id: 5,
      question: "Relyatsion bazada ishlatiladigan RAM (Main memory) dan ma'lumot olish tezligi taxminan qancha?",
      options: [
        "0.5 ns",
        "100 ns",
        "10 ms",
        "150 ms"
      ],
      correctAnswer: 1,
      explanation: "Asosiy operativ xotiraga (RAM) kirish tezligi o'rtacha 100 nanosekundni tashkil qiladi."
    },
    {
      id: 6,
      question: "Diskdan 1 MB ma'lumotni ketma-ket o'qish (Read 1 MB sequentially from disk) qancha vaqt oladi?",
      options: [
        "100 ns",
        "250 μs",
        "30 ms",
        "150 ms"
      ],
      correctAnswer: 2,
      explanation: "SSD yoki mexanik diskdan 1 MB ma'lumotni ketma-ket o'qish taxminan 30 millisekund (30,000,000 ns) vaqt oladi."
    },
    {
      id: 7,
      question: "Uchta parallel xizmatdan so'rov yuborildi (50ms, 150ms va 300ms). Jami parallel latency qancha bo'ladi?",
      options: [
        "500 ms",
        "50 ms",
        "300 ms",
        "150 ms"
      ],
      correctAnswer: 2,
      explanation: "Parallel so'rovlar bir vaqtda bajarilganligi sababli, umumiy kutish vaqti eng sekin ishlovchi xizmat vaqtiga ($max = 300ms$) teng bo'ladi."
    },
    {
      id: 8,
      question: "Throughput hisoblashda 1 Gbps (Gigabit per second) tarmoq tezligi necha MB/s (Megabayt soniyada) ga to'g'ri keladi?",
      options: [
        "1000 MB/s",
        "125 MB/s",
        "10 MB/s",
        "1024 MB/s"
      ],
      correctAnswer: 1,
      explanation: "1 Bayt = 8 Bit bo'lgani uchun, 1 Gbps = 1000 Mbps. Uni baytga o'tkazish uchun 8 ga bo'lamiz: 1000 / 8 = 125 Megabayt soniyada (MB/s)."
    },
    {
      id: 9,
      question: "Kesh xotira hajmini hisoblashda eng ko'p ishlatiladigan 80/20 Pareto qoidasi nimani anglatadi?",
      options: [
        "Serverlarning 80% qismi o'chiq bo'lishini",
        "So'rovlarning 80% qismi ma'lumotlarning 20% faol qismiga kelishini",
        "Loyiha 80 kunda tugashini",
        "RAM-ning 20% qismi keshga ajratilishini"
      ],
      correctAnswer: 1,
      explanation: "80/20 qoidasiga ko'ra, eng ko'p so'raladigan 20% ma'lumotni RAM keshiga qo'yish orqali 80% yuklamani bartaraf etish mumkin."
    },
    {
      id: 10,
      question: "Intervyuda estimation hisob-kitoblarini qilishda qaysi xatodan ehtiyot bo'lish kerak?",
      options: [
        "Raqamlarni juda ko'p yaxlitlashdan",
        "Doskada jim qolib hisoblash va ovoz chiqarib tushuntirmaslikdan",
        "Foydalanuvchilar sonini so'rashdan",
        "Oddiy arifmetikadan foydalanishdan"
      ],
      correctAnswer: 1,
      explanation: "Intervyu muloqot jarayonidir. Nomzod qanday hisoblayotgani va qanday assumption (taxmin) qilayotganini tushuntirib borishi shart."
    },
    {
      id: 11,
      question: "Yillik xotira sig'imini Terabaytlarda baholash nega muhim?",
      options: [
        "Dastur yozish tezligini oshirish uchun",
        "Kelajakdagi ma'lumot o'sishi va server resurslari (sig'imi) byudjetini rejalashtirish uchun",
        "CSS animatsiyalari sig'imini o'lchash uchun",
        "Faqat ma'lumotlar bazasini o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Loyiha kelajakda qancha server yoki bulutli xotira sotib olishi kerakligini rejalashtirish uchun yillik sig'imni oldindan bilish zarur."
    }
  ]
};
