export const systemDesignQuiz2 = {
  id: "systemDesignQuiz2",
  title: "Tizimli Dizayn Phase 2: Yakuniy Test (Quiz & JS Challenges)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tizimli dizaynning 2-bosqichida biz tarmoq asoslari, DNS, API Gateway va taqsimlangan tizimlar xususiyatlarini o'rgandik. Ushbu dars — o'rganilgan mavzularni amaliy JavaScript algoritmlari yordamida mustahkamlash va yakuniy bilimingizni sinab ko'rish uchun mo'ljallangan.

### Imtihon o'xshatishi:
Siz haydovchilik guvohnomasini olish uchun test topshiryapsiz.
- Nazariy savollar sizning yo'l qoidalarini (DNS, HTTP/3, CDN, API Gateway) qanchalik bilishingizni aniqlaydi.
- Amaliy mashqlar esa sizning mashinani real boshqara olishingizni (JS yordamida request router, cache va latency helper yozish) sinovdan o'tkazadi.

---

## 2. 💻 Real Kod Misollari

Topshiriqlarda ishlatiladigan asosiy yordamchi kod namunasi:

\`\`\`javascript
// API Gateway marshrutini tekshirish
const routes = new Map([
  ['/users', 'UserService'],
  ['/products', 'ProductService']
]);

function getService(path) {
  for (let [route, service] of routes) {
    if (path.startsWith(route)) return service;
  }
  return '404_SERVICE';
}
console.log(getService('/users/123')); // 'UserService'
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Ushbu bo'limda siz pastdagi 3 ta amaliy JS algoritmini va 12 ta testni yechishingiz kerak. Ular orqali tarmoq darajasidagi operatsiyalarning kod darajasidagi analogini yaxshiroq his qilasiz.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **DNS kesh muddatini (TTL) hisobga olmaslik:** Kesh doimiy saqlanib qolsa, IP o'zgarganda xatolik yuz beradi.
2. **Kechikish (latency) o'lchashda xatolik:** Vaqtni o'lchashda \`Date.now()\` ishlatish (u millisekund aniqligida ishlaydi va tizim soatiga bog'liq). Buning o'rniga aniqroq bo'lgan \`performance.now()\` ishlatilishi lozim.

---

## 5. 💬 12 ta Intervyu Savollari

**1. DNS so'rovi yo'lida qaysi serverlar ishtirok etadi?**
Recursive Resolver, Root Nameserver, TLD Nameserver va Authoritative Nameserver.

**2. HTTP/2 va HTTP/3 orasidagi asosiy farq nima?**
HTTP/2 bitta TCP ulanish ustida multiplexing qiladi (Head-of-Line blocking xavfi bor). HTTP/3 esa UDP ustiga qurilgan QUIC protokoli orqali ishlaydi va bu muammoni hal qiladi.

**3. API Gateway va Load Balancer farqi nimada?**
Load Balancer transport/tarmoq (L4/L7) darajasida yuk taqsimlaydi. API Gateway esa application darajasida avtorizatsiya, rate limiting va routing mantiqlarini bajaradi.

**4. 99.99% Availability nima va u yiliga qancha downtime beradi?**
Bu "Four Nines" deb ataladi va tizim yiliga maksimal 52.6 daqiqa ishlamay qolishi (downtime) mumkinligini kafolatlaydi.

**5. Fault Tolerance nima?**
Tizimdagi biron bir apparat yoki tarmoq komponenti buzilganda, foydalanuvchiga hech qanday uzilishsiz (zero downtime) xizmat ko'rsatish qobiliyati.

**6. Circuit Breaker nima uchun ishlatiladi?**
Tizimdagi kaskadli buzilishlarni (Cascading Failures) oldini olish uchun nosoz mikroxizmatga so'rov yuborishni vaqtincha to'xtatib turish mexanizmi.

**7. Rate Limiting nima?**
Muayyan foydalanuvchi yoki IP-dan belgilangan vaqt ichida keladigan so'rovlar sonini cheklash (DDoS va brute-force dan himoya).

**8. CORS nima?**
Cross-Origin Resource Sharing — brauzerga boshqa origin-dan kelayotgan resurslarni o'qishga ruxsat berish yoki cheklashni boshqaruvchi mexanizm.

**9. forward Proxy va Reverse Proxy farqi nimada?**
Forward proxy mijoz tomonini (client IP), Reverse proxy esa serverlar tomonini (backend arxitekturasini) tashqi dunyodan yashiradi va himoya qiladi.

**10. Anycast DNS qanday ishlaydi?**
Bitta IP manzil dunyoning turli nuqtalaridagi DNS serverlariga beriladi va foydalanuvchi so'rovi eng yaqin serverga yo'naltiriladi.

**11. SQL va NoSQL ma'lumotlar bazalari qachon tanlanadi?**
Moliyaviy va tranzaksion reliesion ma'lumotlar uchun SQL, yuqori masshtablanuvchi va sxemasiz katta ma'lumotlar uchun esa NoSQL mos keladi.

**12. SLA va SLO farqi nima?**
SLO (Objective) — bu erishish ko'zlangan aniq maqsad (masalan, 99.9% uptime). SLA (Agreement) — SLO bajarilmagan taqdirda mijozga beriladigan moliyaviy yoki huquqiy kafolat.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar quyida exercises bo'limida berilgan. Ularni bajaring va kod darajasidagi ko'nikmalaringizni tekshiring.

---

## 7. 📝 12 ta Mini Test

Testlarni yechib, Phase 2 ni yakunlang. Testlar pastdagi quizzes bo'limida keltirilgan.

---

## 8. 🎯 Real Project Case Study

### Case Study: API Gateway orqali xavfsiz marshrutlash va Auth markazlashtirish
Katta loyihalarda har bir mikroxizmat (UserService, PaymentService) alohida avtorizatsiya va token tekshirish bilan shug'ullansa, kod takrorlanishi ko'payadi va tarmoq yuklamasi oshadi.
API Gateway loyihasini o'rnatish orqali barcha kiruvchi so'rovlar dastlab shu yerda to'xtatiladi. Gateway token mavjudligi va yaroqliligini tekshiradi, so'ngra so'rov sarlavhasiga (\`headers\`) decodlangan \`X-User-Id\` ma'lumotini yozib, ichki xizmatlarga marshrutlaydi. Bu orqali ichki xizmatlar token tekshirish yukidan butunlay xalos bo'ladi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Client[Mijoz] -->|URL /users/list| Router[API Gateway - Router]
    Router -->|DNS Resolve| Cache{Keshda bormi?}
    Cache -->|Yes| FastRoute[Resolve to IP directly]
    Cache -->|No| Resolv[Perform DNS Lookup]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Mavzu | Asosiy Tushuncha | Koddagi analogi |
| :--- | :--- | :--- |
| **DNS Cache** | IP-larni keshda saqlash | Map obyektida key-value |
| **API Gateway** | Kiruvchi so'rovni yo'naltirish | switch/case yoki Map routing |
| **Latency** | So'rov davomiyligi | performance.now() farqi |
`,
  exercises: [
    {
      id: 1,
      title: "API Gateway Oddiy Router",
      instruction: "Berilgan marshrutlar xaritasi (`routeMap` obyekti) va kelayotgan yo'l (`path`) bo'yicha to'g'ri xizmat nomini qaytaradigan `routeRequest(routeMap, path)` funksiyasini yozing. Agar path birorta kalit bilan boshlansa, mos keluvchi qiymatni qaytarsin. Agar mos kelmasa `'404'` qaytarsin.",
      startingCode: "function routeRequest(routeMap, path) {\n  // Marshrutni aniqlang\n}",
      hint: "Object.keys(routeMap) yoki loop orqali string startsWith metodini tekshiring.",
      test: "if (typeof routeRequest !== 'function') return 'routeRequest topilmadi'; const map = { '/api/v1/users': 'UserService', '/api/v1/auth': 'AuthService' }; if (routeRequest(map, '/api/v1/users/create') !== 'UserService') return 'Noto\\'g\\'ri yo\\'naltirish'; if (routeRequest(map, '/api/v1/products') !== '404') return '404 xato ishlamadi'; return null;"
    },
    {
      id: 2,
      title: "DNS Kesh Resolver",
      instruction: "Kichik DNS kesh mexanizmini yarating. Domen nomi (`domain`) keshda (`dnsCache` obyekti) mavjud bo'lsa va uning TTL muddati tugamagan bo'lsa IP manzilini qaytaradigan, aks holda `'RESOLVE_NEEDED'` qaytaradigan `resolveDNS(dnsCache, domain)` funksiyasini yozing. `dnsCache` tarkibi: `{ 'example.com': { ip: '1.1.1.1', expiresAt: 1718000000000 } }`. Hozirgi vaqtni olish uchun `Date.now()` dan foydalaning.",
      startingCode: "function resolveDNS(dnsCache, domain) {\n  // Kesh va vaqtni tekshiring\n}",
      hint: "dnsCache[domain] borligi va expiresAt > Date.now() shartini tekshiring.",
      test: "if (typeof resolveDNS !== 'function') return 'resolveDNS topilmadi'; const cache = { 'a.com': { ip: '1.2.3.4', expiresAt: Date.now() + 5000 }, 'b.com': { ip: '5.6.7.8', expiresAt: Date.now() - 1000 } }; if (resolveDNS(cache, 'a.com') !== '1.2.3.4') return 'Amaldagi kesh qaytarilmadi'; if (resolveDNS(cache, 'b.com') !== 'RESOLVE_NEEDED') return 'Muddati o\\'tgan kesh rad etilmadi'; if (resolveDNS(cache, 'c.com') !== 'RESOLVE_NEEDED') return 'Mavjud bo\\'lmagan domen xato'; return null;"
    },
    {
      id: 3,
      title: "Ulanish Kechikishini Mock qilish",
      instruction: "Berilgan asynchronous callback funksiyasining (`fetchCallback`) bajarilish vaqtini (latency) millisekundlarda o'lchaydigan va natijani `{ data: result, latencyMs: number }` formatida qaytaradigan `measureLatency(fetchCallback)` asinxron funksiyasini yozing. Vaqtni o'lchash uchun `performance.now()` dan foydalaning.",
      startingCode: "async function measureLatency(fetchCallback) {\n  // Boshlanish va tugash vaqtlarini o'lchab, farqini hisoblang\n}",
      hint: "const start = performance.now(); const res = await fetchCallback(); const end = performance.now(); farqi end - start.",
      test: "if (typeof measureLatency !== 'function') return 'measureLatency topilmadi'; const mock = async () => new Promise(r => setTimeout(() => r('ok'), 20)); return measureLatency(mock).then(res => { if (res.data !== 'ok') return 'Ma\\'lumot noto\\'g\\'ri qaytdi'; if (typeof res.latencyMs !== 'number' || res.latencyMs < 10) return 'Latency noto\\'g\\'ri o\\'lchandi'; return null; }).catch(e => 'Xatolik yuz berdi: ' + e.message);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "DNS rezolyutsiyasida TLD (Top-Level Domain) serverlari qaysi domenlar uchun mas'ul?",
      options: [
        "Faqat ichki tarmoq domenlari uchun",
        "Domen nomining oxiridagi qismlar (masalan, .com, .org, .uz) uchun",
        "Faqat IP manzillarni shifrlash uchun",
        "Saytning rasmlarini yuklash uchun"
      ],
      correctAnswer: 1,
      explanation: "TLD serverlar .com, .net, .uz kabi yuqori darajadagi domen zonalariga tegishli Nameserverlar lokatsiyasini saqlaydi."
    },
    {
      id: 2,
      question: "HTTP/3 protokoli HTTP/2 dan farqli o'laroq nega tezroq ulanish o'rnatadi?",
      options: [
        "U TCP ustiga qurilgan",
        "U 3-way handshake talab qilmaydigan UDP (QUIC) ustiga qurilgan",
        "U faqat kichik rasmlarni o'qiydi",
        "U portlardan foydalanmaydi"
      ],
      correctAnswer: 1,
      explanation: "HTTP/3 QUIC (UDP) protokoli orqali ishlaydi, bu esa ulanish o'rnatish va handshake kechikishlarini minimal darajaga tushiradi."
    },
    {
      id: 3,
      question: "SLA shartnomasida 'High Availability' ko'rsatkichi 99.9% deb belgilansa, yillik downtime (sayt o'chib qolish vaqti) taxminan qancha bo'ladi?",
      options: [
        "Maksimal 5 daqiqa",
        "Maksimal 8.76 soat",
        "Kamida 1 oy",
        "Unda downtime umuman bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "99.9% uptime ko'rsatkichi yiliga taxminan 8.76 soatlik maksimal ruxsat etilgan nosozlik vaqtini bildiradi."
    },
    {
      id: 4,
      question: "Reverse Proxy-ning API Gateway-dan asosiy farqi nimada?",
      options: [
        "Reverse proxy faqat frontend dasturini ishga tushiradi",
        "API Gateway tarmoq so'rovlarini yo'naltirishdan tashqari dasturiy biznes mantiqni (rate limiting, orchestration) ham bajaradi",
        "Reverse proxy faqat xakerlar hujumiga moslangan",
        "Ular mutlaqo bir xil narsa"
      ],
      correctAnswer: 1,
      explanation: "Reverse Proxy asosan tarmoq darajasida so'rov yo'naltiradi, API Gateway esa ko'proq application darajasida biznes logikalar bilan ishlaydi."
    },
    {
      id: 5,
      question: "TCP-dagi 'Flow Control' mexanizmi nima vazifani bajaradi?",
      options: [
        "Internet tezligini cheklash",
        "Qabul qiluvchi tomondagi buffer to'lib qolmasligi uchun jo'natuvchi tezligini boshqarish",
        "DNS keshni tozalash",
        "IP-ni yashirish"
      ],
      correctAnswer: 1,
      explanation: "Flow Control qabul qiluvchi qurilma qabul qila oladigan tezlikka qarab jo'natuvchi tezligini moslashtiradi."
    },
    {
      id: 6,
      question: "Anycast DNS tizimi qanday afzallikka ega?",
      options: [
        "Faqat bitta serverda xavfsizlikni ta'minlaydi",
        "So'rovlarni eng yaqin serverga yo'naltirish orqali kechikish (latency) vaqtini pasaytiradi",
        "IP manzillarni shifrlaydi",
        "DDoS hujumini amalga oshiradi"
      ],
      correctAnswer: 1,
      explanation: "Anycast marshrutlash yordamida dunyoning turli joyidagi foydalanuvchilar o'zlariga geografik jihatdan eng yaqin DNS serverlariga ulanadilar."
    },
    {
      id: 7,
      question: "SQL va NoSQL ma'lumotlar bazalarini taqqoslaganda qaysi bayonot noto'g'ri?",
      options: [
        "SQL ma'lumotlar jadvallardan iborat",
        "NoSQL tranzaksiyalar uchun doimo qat'iy ACID kafolatlarini beradi",
        "NoSQL gorizontal kengayishga juda mos",
        "SQL ma'lumotlari relyatsion bog'liqlikka ega"
      ],
      correctAnswer: 1,
      explanation: "NoSQL bazalar odatda qat'iy ACID o'rniga BASE (Eventually Consistent) modelidan foydalanadi va har doim qat'iy ACID kafolatini bermaydi."
    },
    {
      id: 8,
      question: "Fault Tolerance va High Availability o'rtasidagi asosiy farq nima?",
      options: [
        "Ular orasida farq yo'q",
        "Fault Tolerance tizimdagi nosozlikda umuman uzilish (downtime) bo'lmasligini ta'minlaydi, HA esa tezkor tiklanishni kafolatlaydi",
        "HA tizimi qimmatroq",
        "Fault Tolerance faqat ma'lumotlar bazasiga tegishli"
      ],
      correctAnswer: 1,
      explanation: "Fault Tolerance nosozlik yuz berganda ham tizimni mutlaqo uzilishsiz ishlashini ta'minlaydi (odatda zaxira parallel tizimlar orqali)."
    },
    {
      id: 9,
      question: "Circuit Breaker patterni qachon 'Open' (Ochiq) holatiga o'tadi?",
      options: [
        "Server ish faoliyati normal holatda bo'lganda",
        "Nishondagi mikroxizmat doimiy ravishda xatolik berib, belgilangan limitdan oshganda",
        "Foydalanuvchi tizimga login qilganda",
        "Har doim open holatda turadi"
      ],
      correctAnswer: 1,
      explanation: "Nishondagi servis doimiy ravishda xato berganda, Circuit Breaker 'Open' holatga o'tib, u tomonga so'rov yuborishni bloklaydi."
    },
    {
      id: 10,
      question: "gRPC protokoli ma'lumot uzatishda JSON o'rniga qaysi formatdan foydalanadi?",
      options: [
        "XML",
        "Protocol Buffers (Protobuf - binary format)",
        "Plain Text",
        "HTML"
      ],
      correctAnswer: 1,
      explanation: "gRPC Google tomonidan ishlab chiqilgan Protocol Buffers formatidan foydalanib, ma'lumotlarni ixcham binary holatda uzatadi."
    },
    {
      id: 11,
      question: "DNS keshidagi TTL (Time to Live) tugashidan oldin IP manzil o'zgarsa nima sodir bo'ladi?",
      options: [
        "IP manzil avtomatik ravishda brauzerda yangilanadi",
        "Foydalanuvchilar brauzeri eski keshdagi IP ga murojaat qilib, saytga kira olmay qolishadi (kesh eskirguncha)",
        "DNS server o'chib qoladi",
        "TTL muddati avtomatik nolga tushadi"
      ],
      correctAnswer: 1,
      explanation: "Brauzer va resolverlar TTL muddati tugamaguncha eski IP manzilni keshdan o'qishda davom etadi, bu esa saytga kirishda uzilishga sabab bo'ladi."
    },
    {
      id: 12,
      question: "SOP (Same-Origin Policy) xavfsizlik qoidasi brauzerda qanday ishlaydi?",
      options: [
        "Faqat rasmlarni bloklaydi",
        "Bir xil Origin-ga (protokol, domen, port) ega bo'lmagan saytlarga bir-birining resurslarini to'g'ridan-to'g'ri o'qishni taqiqlaydi",
        "Baza parollarini tekshiradi",
        "Kompyuterdagi fayllarni brauzerdan himoya qiladi"
      ],
      correctAnswer: 1,
      explanation: "SOP - bu brauzerning asosiy xavfsizlik modeli bo'lib, har xil origin-ga ega bo'lgan saytlar o'rtasida resurs almashishni cheklaydi (CORS orqali boshqariladi)."
    }
  ]
};
