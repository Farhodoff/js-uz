export const systemDesignQuiz = {
  id: "systemDesignQuiz",
  title: "Tizimli Dizayn Phase 1: Yakuniy Quiz (System Design Phase 1 Quiz)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tizimli dizayn (System Design) bo'yicha birinchi bosqichni muvaffaqiyatli yakunlaganingiz bilan tabriklaymiz! Ushbu yakuniy dars va quiz siz o'rgangan dastlabki 5 ta muhim darsning (O'rganish strategiyasi, Talablar tahlili, Taxminiy hisob-kitoblar, Intervyu xatoliklari va Yuk taqsimlash algoritmlari) xulosasidir.

Bu xuddi **haydovchilik imtihoniga** o'xshaydi:
- Dastlabki darslarda siz yo'l harakati qoidalarini (talablar, xatolardan qochish) va mashina qanday ishlashini (load balancing, taxminlar) o'rgandingiz.
- Endi esa ushbu yakuniy test orqali barcha qoidalarni amalda va vaziyatli savollar orqali qanchalik tushunganingizni sinab olasiz.

---

## 2. 💻 Real Kod Misollari

Quyida tizimning umumiy salomatligi va yukini tekshiruvchi hamda barcha mezonlarni jamlovchi yakuniy simulyator funksiyasi keltirilgan:

\`\`\`javascript
// Tizim holatini barcha parametrlarga ko'ra baholash
function evaluateSystemHealth(systemConfig) {
  const { qps, latency, isStateful, hasLoadBalancer, availability } = systemConfig;
  
  const issues = [];
  if (qps > 10000 && !hasLoadBalancer) {
    issues.push("Bottleneck: Yuqori yuklamada yuk taqsimlovchi (Load Balancer) yo'q!");
  }
  if (latency > 250) {
    issues.push("SLA Breach: Kechikish vaqti (latency) 250ms dan yuqori!");
  }
  if (availability < 99.9) {
    issues.push("Unreliable: Tizim ishonchliligi (availability) 99.9% dan past!");
  }
  if (isStateful && hasLoadBalancer && systemConfig.lbAlgorithm === "RoundRobin") {
    issues.push("Stateful Session Risk: Stateful tizimda RoundRobin ishlatilmoqda. Sticky session yoki IP Hash tavsiya etiladi.");
  }
  
  return {
    isHealthy: issues.length === 0,
    issues: issues.length > 0 ? issues : ["Tizim mukammal holatda!"]
  };
}

console.log(evaluateSystemHealth({
  qps: 15000,
  latency: 120,
  isStateful: true,
  hasLoadBalancer: true,
  lbAlgorithm: "RoundRobin",
  availability: 99.95
}));
// { isHealthy: false, issues: [ 'Stateful Session Risk: Stateful tizimda RoundRobin ishlatilmoqda...' ] }
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Yakuniy imtihon va quiz quyidagi fundamental mavzularni tekshiradi:

1. **System Design intervyu qoidalari:** Muloqot, trade-off tahlili va intervyuer bilan hamkorlik.
2. **Talablar (FR/NFR):** Tizim vazifalari va tizim sifat mezonlarini to'g'ri ajrata olish.
3. **Back-of-the-envelope estimation:** QPS, tarmoq o'tkazuvchanligi va disk xotiralarini tezkor hisoblash.
4. **Load Balancing:** Kerakli vaziyatda eng to'g'ri yuk taqsimlash algoritmini (Least Connections, Weighted Round Robin, IP Hash) tanlash.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Hisob-kitoblarda adashish:** Bit va Baytni (1 Bayt = 8 Bit) aralashtirib yuborish.
2. **Sticky session muammosi:** Sessiya ma'lumotlarini markazlashtirilgan keshda saqlamasdan, asossiz Round Robin-ga ishonish.
3. **Intervyuer ishoralarini rad etish:** "Men aytgan arxitektura 100% ishlaydi" deb o'z fikrida qotib qolish.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Tizim ishlashida eng sekin operatsiyalar qaysilar?**
Tarmoq orqali so'rov yuborish va diskdan ma'lumot o'qish (sequential read from disk).

**2. 99.9% availability bilan 99.99% farqi nimada?**
99.9% uptime yiliga 8.76 soat o'chishga ruxsat beradi, 99.99% esa atigi 52.6 daqiqa.

**3. "Pareto 80/20 qoidasi" tizimli dizaynda nimaga ta'sir qiladi?**
Kesh xotirasi hajmini rejalashtirishga. Trafigimizning 80% qismi ma'lumotlarimizning 20% faol qismiga tushadi.

**4. Stateful va Stateless tizim farqi nima?**
Stateless tizimda hech qaysi server foydalanuvchi sessiyasini eslab qolmaydi. Stateful-da esa foydalanuvchi holati ma'lum server xotirasida saqlanadi.

**5. Nima uchun faqat bitta ma'lumotlar bazasi intervyuda "silver bullet" bo'lolmaydi?**
Chunki NoSQL yozishda va masshtabda yaxshi bo'lsa, relyatsion bazalar ACID tranzaksiyalari kafolatini beradi. Tanlov talabga bog'liq.

**6. Round Robin va Least Connections qachon almashtiriladi?**
Serverlar har xil quvvatli bo'lganda, ularga mos ravishda Weighted Round Robin yoki Weighted Least Connections ishlatiladi.

**7. Kechikish (Latency) va Throughput (O'tkazuvchanlik) qanday bog'langan?**
Kechikish kamayishi throughput oshishiga yordam beradi, lekin ular alohida o'lchovlardir.

**8. Tizimdagi bottleneck-ni qanday aniqlash mumkin?**
Yuklama testlari (Load testing) va monitoring tizimlari (CPU, Memory, IOPS, Network bandwidth) orqali.

**9. Consistent Hashing nima uchun oddiy IP Hash-dan afzal?**
Server qo'shilganda yoki o'chirilganda foydalanuvchilar sessiyalari va keshlarining minimal darajada buzilishini ta'minlagani uchun.

**10. "Over-engineering" nima?**
Oddiy va kichik talabga ega loyiha uchun o'ta murakkab va qimmat yechimlarni loyihalash.

**11. SLA buzilsa nima sodir bo'ladi?**
Kompaniya shartnomaga binoan mijozga jarima yoki moliyaviy kompensatsiya to'lashiga to'g'ri keladi.

**12. SLA va SLO farqi nima?**
SLO — ichki texnik maqsad, SLA — mijoz oldidagi huquqiy shartnoma.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi exercises bo'limida bajarib, bilimingizni yakuniy sinovdan o'tkazing.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali birinchi bosqichni rasman yakunlang.

---

## 8. 🎯 Real Project Case Study

### Case Study: High Load System Evaluation
- **Kutilyotgan QPS:** 50,000 requests/sec.
- **Tahlil:** 50,000 QPS juda yuqori yuklama. Bitta server buni ko'tara olmaydi.
- **Yechim arxitekturasi:** 
  1. Oldinga yuk taqsimlovchi (Load Balancer - HAProxy) qo'yiladi.
  2. Stateless backend serverlari qo'shilib, **Least Connections** algoritmi orqali yuk taqsimlanadi.
  3. Kesh (Redis) va CDN orqali bazaga tushadigan read so'rovlar yuklamasi 80% ga qisqartiriladi.

---

## 9. 🧠 Vizual ko'rinish (Phase 1 Summary Mindmap)

\`\`\`mermaid
mindmap
  root((System Design Phase 1))
    Foundations
      Suhbat qoidalari
      Things to Avoid
    Talablar
      FR (Nima qiladi)
      NFR (Qanday sifatda)
    Taxminlar
      QPS hisoblash
      Storage hisoblash
      Bandwidth va Latency
    Load Balancing
      Algorithms
      Round Robin / Least Connections
      IP Hash / Consistent Hashing
\`\`\`

---

## 10. 📌 Cheat Sheet

| Mavzu | Asosiy formula / qoida | bottleneck nuqtasi |
| :--- | :--- | :--- |
| **QPS Hisoblash** | $DAU \\times So'rovlar / 86400$ | Yozish yuklamasi |
| **Availability** | $(Uptime / TotalTime) \\times 100$ | Single Point of Failure (SPOF) |
| **Load Balancing** | Stateful $\\rightarrow$ IP Hash; Stateless $\\rightarrow$ RoundRobin | LB o'zi SPOF bo'lib qolishi |
`,
  exercises: [
    {
      id: 1,
      title: "Uptime daqiqalarini hisoblash",
      instruction: "Berilgan availability foiziga (`availabilityPct` masalan: 99.9) ko'ra, bir yildagi maksimal o'chish (downtime) vaqtini daqiqalarda hisoblaydigan `getDowntimeMinutes(availabilityPct)` funksiyasini yozing. Bir yilda jami 525600 daqiqa bor deb hisoblang. Natijani eng yaqin butun songacha yaxlitlang.",
      startingCode: "function getDowntimeMinutes(availabilityPct) {\n  const totalMinutes = 525600;\n  // Kodni yozing\n}",
      hint: "downtime = totalMinutes * (1 - availabilityPct / 100) formulasidan foydalanib, Math.round ishlating.",
      test: "if (typeof getDowntimeMinutes !== 'function') return 'getDowntimeMinutes topilmadi'; if(getDowntimeMinutes(99.9) !== 526) return '99.9% uchun xato'; if(getDowntimeMinutes(100) !== 0) return '100% uchun xato'; return null;"
    },
    {
      id: 2,
      title: "LB Algorithm Selector",
      instruction: "Tizim holatiga qarab eng to'g'ri yuk taqsimlash algoritmini qaytaruvchi `selectAlgorithm(isStateful, hasHeterogeneousServers)` funksiyasini yozing. Agar `isStateful` true bo'lsa, 'IPHash' qaytaring. Agar stateful bo'lmasa va `hasHeterogeneousServers` (har xil quvvatli serverlar) true bo'lsa, 'WeightedRoundRobin' qaytaring. Aks holda 'RoundRobin' qaytaring.",
      startingCode: "function selectAlgorithm(isStateful, hasHeterogeneousServers) {\n  // Kodni yozing\n}",
      hint: "Ketma-ket if-else operatorlaridan foydalaning.",
      test: "if (typeof selectAlgorithm !== 'function') return 'selectAlgorithm topilmadi'; if (selectAlgorithm(true, false) !== 'IPHash') return 'Stateful holat xato'; if (selectAlgorithm(false, true) !== 'WeightedRoundRobin') return 'Har xil serverlar holati xato'; if (selectAlgorithm(false, false) !== 'RoundRobin') return 'Stateless oddiy holat xato'; return null;"
    },
    {
      id: 3,
      title: "Kesh hajmini aniqlash (Pareto 80/20)",
      instruction: "Bir kunlik to'planadigan ma'lumot hajmi Gigabaytda (`dailyDataGB`) berilgan. 80/20 qoidasiga ko'ra, kunlik eng faol 20% ma'lumotni keshda saqlash uchun qancha RAM xotirasi (GB da) kerakligini hisoblaydigan `getCacheSizeGB(dailyDataGB)` funksiyasini yozing. Natijani bitta kasr xonasi bilan (string formatida) qaytaring.",
      startingCode: "function getCacheSizeGB(dailyDataGB) {\n  // Kodni yozing\n}",
      hint: "dailyDataGB * 0.2 ko'paytmasini olib, .toFixed(1) metodidan foydalaning.",
      test: "if (typeof getCacheSizeGB !== 'function') return 'getCacheSizeGB topilmadi'; if(getCacheSizeGB(100) !== '20.0') return '100 GB uchun xato'; if(getCacheSizeGB(15) !== '3.0') return '15 GB uchun xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "Quyidagilardan qaysi biri nofunksional talab (Non-functional Requirement) hisoblanadi?",
      options: [
        "Foydalanuvchi yangi mahsulotlarni savatchaga qo'sha olishi kerak",
        "Tizimning p95 kechikish vaqti (latency) 150ms dan past bo'lishi shart",
        "Saytda foydalanuvchi profilini tahrirlash imkoniyati bo'lishi kerak",
        "Foydalanuvchi rasmni JPEG formatida yuklay olishi lozim"
      ],
      correctAnswer: 1,
      explanation: "Kechikish (latency) tizimning ishlash sifati va tezligiga oid nofunksional cheklovdir."
    },
    {
      id: 1,
      question: "SLA (Service Level Agreement) buzilgan taqdirda nima sodir bo'ladi?",
      options: [
        "Faqat kod qaytadan yoziladi",
        "Shartnomaga binoan mijozga huquqiy va moliyaviy kompensatsiya (jarima) to'lanadi",
        "Serverlar soni avtomatik ko'payadi",
        "Hech qanday oqibati bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "SLA — bu rasmiy shartnoma bo'lib, uning buzilishi moliyaviy jarimalarga sabab bo'ladi."
    },
    {
      id: 2,
      question: "Jeff Dean raqamlariga ko'ra, xotiradan (RAM) 1 MB ma'lumotni ketma-ket o'qish qancha vaqt oladi?",
      options: [
        "0.5 ns",
        "250 μs (0.25 ms)",
        "30 ms",
        "150 ms"
      ],
      correctAnswer: 1,
      explanation: "RAM dan 1 MB ma'lumotni o'qish taxminan 250 mikrosekund (0.25 millisekund) davom etadi."
    },
    {
      id: 3,
      question: "Uchta parallel so'rov yuborildi (100ms, 250ms va 500ms). Jami parallel latency vaqti qancha bo'ladi?",
      options: [
        "850 ms",
        "100 ms",
        "500 ms",
        "250 ms"
      ],
      correctAnswer: 2,
      explanation: "Parallel so'rovlar bir vaqtda bajarilganligi sababli, umumiy vaqt eng sekin so'rov latency vaqtiga ($max = 500ms$) teng."
    },
    {
      id: 4,
      question: "Round Robin yuk taqsimlash algoritmida server aylanma tartibda qanday tanlanadi?",
      options: [
        "Faol ulanishlari eng kam bo'lgan serverga qarab",
        "So'rov navbat indeksi bo'yicha ketma-ketlikda ($Index \\% Servers.length$)",
        "Serverdagi CPU foiziga qarab",
        "Tasodifiy sonlar generatori orqali"
      ],
      correctAnswer: 1,
      explanation: "Round Robin algoritmi hech qanday yuklamani tekshirmaydi, shunchaki navbat tartibi bo'yicha ketma-ket yo'naltiradi."
    },
    {
      id: 5,
      question: "IP Hash algoritmining eng katta afzalligi nimada?",
      options: [
        "U ma'lumotlarni shifrlaydi",
        "Foydalanuvchini har doim bir xil serverga bog'lab, Session Persistence-ni ta'minlaydi",
        "Server yuklamasini muvozanatlashtiradi",
        "Tezlikni 10 barobarga oshiradi"
      ],
      correctAnswer: 1,
      explanation: "IP Hash IP-manzildan olingan natijaga binoan foydalanuvchini doim o'sha serverga yo'naltiradi, bu stateful ilovalar uchun juda muhim."
    },
    {
      id: 6,
      question: "Consistent Hashing qaysi muammoni hal qilishga yordam beradi?",
      options: [
        "Parollarni saqlash muammosini",
        "Serverlar soni o'zgarganda (kengayish/qisqarish) kesh va sessiyalar buzilishini minimal darajada saqlashni",
        "DDoS hujumlarini oldini olishni",
        "Ma'lumotlar bazasida tranzaksiyalarni boshqarishni"
      ],
      correctAnswer: 1,
      explanation: "Consistent Hashing serverlar soni o'zgarganda faqat minimal kalitlar marshrutini o'zgartiradi va kesh qulashini oldini oladi."
    },
    {
      id: 7,
      question: "Intervyuda 'Over-engineering' deb nimaga aytiladi?",
      options: [
        "Kodda juda ko'p sintaktik xato bo'lishiga",
        "Oddiy va kichik miqyosdagi talablar uchun o'ta murakkab, qimmat va keraksiz arxitekturani loyihalashga",
        "Doskada rasmlarni chiroyli chizolmaslikka",
        "Savollarni juda ko'p berishga"
      ],
      correctAnswer: 1,
      explanation: "Junior dasturchilar ko'pincha keraksiz joyga taqsimlangan tizimlar murakkabligini tiqishtirib, over-engineering xatosiga yo'l qo'yadilar."
    },
    {
      id: 8,
      question: "Intervyuda intervyuer siz tanlagan ma'lumotlar bazasini o'zgartirishni taklif qilsa qanday yo'l tutish kerak?",
      options: [
        "MongoDB baribir eng yaxshisi deb turib olish",
        "Taklifni mantiqan ko'rib chiqib, moslashuvchanlik ko'rsatish va yangi yechim tradeofflarini tahlil qilish",
        "Bahslashish va o'z fikrini ma'qullash",
        "Savolga javob bermay jim turish"
      ],
      correctAnswer: 1,
      explanation: "Intervyuda qaysarlik qilish (inflexibility) eng yomon signallardan biridir. Nomzod moslashuvchan (flexible) bo'lishi shart."
    },
    {
      id: 9,
      question: "SUTKA davomidagi jami soniyalar soni nechaga teng?",
      options: [
        "100,000",
        "86,400",
        "3,600",
        "525,600"
      ],
      correctAnswer: 1,
      explanation: "Bir sutka $24 \\times 60 \\times 60 = 86,400$ soniyani tashkil qiladi."
    },
    {
      id: 10,
      question: "Pareto 80/20 qoidasidan kelib chiqib, kesh (Redis) xotira hajmi qanday hisoblanadi?",
      options: [
        "Kunlik to'planadigan ma'lumotlar hajmining 100% qismi olinadi",
        "Kunlik eng faol 20% ma'lumotlarni RAM keshida saqlash yetarli deb hisoblanadi",
        "Faqat 80 ta server sotib olinadi",
        "Baza xotirasining yarmi o'chiriladi"
      ],
      correctAnswer: 1,
      explanation: "Pareto qoidasiga ko'ra so'rovlarning 80% qismi 20% eng ommabop ma'lumotlarga tushadi, shuning uchun 20% ma'lumotni keshda saqlash optimal hisoblanadi."
    },
    {
      id: 11,
      question: "Siz loyihalayotgan tizim uchun avval talablarni (FR/NFR) so'rab aniqlashtirish nima uchun birinchi navbatda talab etiladi?",
      options: [
        "Vaqtni cho'zish uchun",
        "Muammoning to'g'ri miqyosini, maqsadini va texnologik cheklovlarini to'g'ri belgilab olish uchun",
        "Faqat kod yozishni kamaytirish uchun",
        "Buning ahamiyati yo'q"
      ],
      correctAnswer: 1,
      explanation: "Tizim talablarini bilmasdan loyiha tuzish yo'nalishsiz suzishga o'xshaydi. Talablar barcha keyingi arxitektura tanlovlarini belgilaydi."
    }
  ]
};
