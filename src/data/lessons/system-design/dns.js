export const dns = {
  id: "dns",
  title: "Domain Name System (DNS) va URL Manzillar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Har bir veb-sayt internetda o'zining noyob raqamli manziliga ega bo'lib, u **IP manzil (IP Address)** deb ataladi (masalan, \`142.250.190.46\`). Kompyuterlar bir-biri bilan shu raqamlar orqali bog'lanadi. Biroq, insonlar uchun bunday murakkab raqamlarni eslab qolish juda qiyin. Bizga \`google.com\` yoki \`youtube.com\` kabi so'zlardan iborat nomlar qulayroq.

**DNS (Domain Name System)** — bu internetning telefon kitobi (kontaktlar ro'yxati). U siz brauzerga yozgan domen nomini (masalan, \`js-uz.uz\`) kompyuter tushunadigan IP manzilga (\`185.178.104.12\`) tarjima qilib beradi.

### Telefon kontaktlari analogiyasi:
Siz do'stingiz "Ali"ga qo'ng'iroq qilmoqchisiz. Telefoningiz Alining haqiqiy raqamini (+998901234567) bilishi kerak. Siz kontaktlar ro'yxatidan "Ali" ismini qidirasiz va tugmani bosasiz. Telefon orqa fonda bu ismni raqamga aylantirib bog'lanadi. Bu yerda kontaktlar ro'yxati — **DNS**, "Ali" — **Domen nomi**, telefon raqami esa — **IP manzil** hisoblanadi.

---

## 2. 💻 Real Kod Misollari

Node.js muhitida domen nomini IP manzilga aylantirish (DNS lookup) misoli:

\`\`\`javascript
const dns = require('dns');

// Domen nomidan IP manzilni aniqlash (Resolve)
dns.lookup('google.com', (err, address, family) => {
  if (err) throw err;
  console.log('IP Manzil:', address); // Masalan: 142.250.190.46
  console.log('IP Turi: IPv', family);   // IPv4 yoki IPv6
});

// IP manzildan domenni aniqlash (Reverse Lookup)
dns.reverse('8.8.8.8', (err, hostnames) => {
  if (err) throw err;
  console.log('Domen nomi:', hostnames); // ['dns.google']
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Siz brauzerga \`https://sub.example.com\` yozganingizda, DNS so'rovi quyidagi ketma-ketlikda (rezolyutsiya jarayoni) amalga oshadi:

1. **Browser Cache & OS Cache:** Birinchi bo'lib brauzer va operatsion tizim o'z keshidan bu domenga tegishli IP-ni qidiradi.
2. **DNS Resolver (ISP - Provayder):** Agar keshda bo'lmasa, so'rov provayderning DNS serveriga boradi.
3. **Root Nameserver (.):** Resolver IP-ni bilmasa, u dunyo bo'yicha eng yuqori bo'lgan Root serverga murojaat qiladi. Root server \`.com\` zonasi qayerdaligini ko'rsatadi.
4. **TLD Nameserver (.com):** Root yo'naltirgan \`.com\` TLD (Top-Level Domain) serveriga boriladi. U \`example.com\` ning mualliflik serverini ko'rsatadi.
5. **Authoritative Nameserver (example.com):** Bu server domenning haqiqiy IP manzilini biladi va uni qaytaradi.
6. **Resolver va Brauzer:** Resolver javobni brauzerga beradi va uni keshlab qo'yadi.

### URL vs. URI vs. URN:
- **URI (Uniform Resource Identifier):** Resursni aniqlashning umumiy standarti.
- **URL (Uniform Resource Locator):** Resursni qanday topish (lokatsiyasi va protokoli) ko'rsatilgan URI (masalan, \`https://site.com/page.html\`).
- **URN (Uniform Resource Name):** Resursning manzilsiz, faqat doimiy nomi (masalan, kitob kodi: \`urn:isbn:0451524934\`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **TTL (Time to Live) qiymatini haddan tashqari uzoq qilish:** IP manzil o'zgarganda, eski keshlar yangilanmay qoladi va foydalanuvchilar saytingizga kira olmay qolishadi.
2. **DNS yuklamasini hisobga olmaslik:** Agar uchinchi tomon API-lariga har safar domen orqali so'rov yuborilsa, DNS rezolyutsiyasi har doim vaqt oladi. Mahalliy kesh yuritish lozim.
3. **URL va URI farqini bilmaslik:** Har qanday URL — URI hisoblanadi, lekin har qanday URI — URL emas.

---

## 5. 💬 12 ta Intervyu Savollari

**1. DNS nima va u qanday muammoni hal qiladi?**
Domen nomlarini IP manzillarga aylantirib beradi. Insonlarga raqamlarni emas, nomlarni eslab qolish imkonini beradi.

**2. DNS so'rovi qaysi transport protokolidan foydalanadi?**
Asosan UDP (53-port) orqali ishlaydi, chunki u tezroq. Ammo ma'lumot hajmi 512 baytdan oshganda yoki zona uzatishda TCP-ga o'tadi.

**3. Root Nameserver nima?**
DNS ierarxiyasining eng yuqori cho'qqisi bo'lib, TLD (.com, .uz) serverlar lokatsiyasini ko'rsatadi.

**4. DNS Caching deganda nima tushuniladi?**
Saytga kirish tezligini oshirish va DNS serverlari yukini kamaytirish uchun IP manzillarni brauzer, OS va ISP resolver darajasida vaqtincha saqlash.

**5. TTL (Time to Live) nima?**
DNS yozuvining keshda qancha soniya davomida saqlanishini belgilaydigan qiymat.

**6. A record va CNAME record farqi nimada?**
A record domenni to'g'ridan-to'g'ri IPv4 manzilga bog'laydi. CNAME esa domenni boshqa domen nomiga (taxallusiga) yo'naltiradi.

**7. MX record nima uchun ishlatiladi?**
Domen nomiga keladigan elektron xatlarni qaysi pochta serveri (Mail Server) qabul qilishini belgilaydi.

**8. DNS orqali Load Balancing qilish mumkinmi?**
Ha, bitta domen nomiga bir nechta A record (har xil IP manzillar) biriktirilsa, DNS server har xil foydalanuvchilarga turli IP-larni (Round-Robin usulida) qaytaradi.

**9. URL va URI farqini tushuntiring.**
URI umumiy resurs identifikatori. URL esa resursga qanday kirish protokoli (http, ftp) va uning manzilini aniq ko'rsatuvchi URI turidir.

**10. Anycast DNS nima?**
Bitta DNS IP-manzilini dunyoning turli nuqtalaridagi serverlarga tarqatish. So'rov geografik jihatdan eng yaqin serverga boradi, bu esa tezlikni oshiradi.

**11. DNS Spoofing (Cache Poisoning) nima?**
DNS server keshiga soxta IP kiritish orqali foydalanuvchini soxta (fishing) saytga yo'naltirish.

**12. NS record nima?**
Domen uchun qaysi Nameserverlar mualliflik (Authoritative) server ekanligini ko'rsatadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar bilan quyidagi mashqlarni bajarib ko'ring.

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun pastdagi testlarni yeching.

---

## 8. 🎯 Real Project Case Study

### DNS Load Balancing (Geografik Router)
Katta loyihalarda (masalan, Netflix) foydalanuvchi qayerdan so'rov yuborganiga qarab unga eng yaqin ma'lumot markazi (Data Center) IP-manzilini qaytaruvchi GeoDNS tizimi qo'llaniladi. Bu kechikish (latency) vaqtini sezilarli darajada kamaytiradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
sequenceDiagram
    participant B as Browser
    participant R as DNS Resolver (ISP)
    participant Root as Root Server (.)
    participant TLD as TLD Server (.com)
    participant Auth as Authoritative Server

    B->>R: google.com IP manzili qani?
    Note over R: Keshda yo'q
    R->>Root: google.com qayerda?
    Root-->>R: .com serverlariga bor
    R->>TLD: google.com qayerda?
    TLD-->>R: google.com Nameserveriga bor
    R->>Auth: google.com IP-si qani?
    Auth-->>R: IP: 142.250.190.46
    R->>B: IP: 142.250.190.46 (Va keshlaydi)
\`\`\`

---

## 10. 📌 Cheat Sheet

| Record Turi | Vazifasi | Misol |
| :--- | :--- | :--- |
| **A** | Domen nomini IPv4 ga o'tkazadi | \`example.com -> 93.184.216.34\` |
| **AAAA** | Domen nomini IPv6 ga o'tkazadi | \`example.com -> 2606:2800:220:1:248:1893:25c8:1946\` |
| **CNAME** | Domenni boshqa domenga bog'laydi | \`www.example.com -> example.com\` |
| **MX** | Pochta serverini belgilaydi | \`mail.example.com\` |
| **TXT** | Sayt egasini tasdiqlash uchun matn | \`v=spf1 include:_spf.google.com\` |
`,
  exercises: [
    {
      id: 1,
      title: "URL hostini aniqlash",
      instruction: "Berilgan to'liq URL manzilidan faqat domen nomini (hostname) ajratib oluvchi `getHost(url)` funksiyasini yozing.",
      startingCode: "function getHost(url) {\n  // URL obyekti yoki regex yordamida domen nomini oling\n}",
      hint: "new URL(url).hostname dan foydalanishingiz mumkin.",
      test: "if (typeof getHost !== 'function') return 'getHost topilmadi'; if (getHost('https://js-uz.uz/courses/1') !== 'js-uz.uz') return 'Noto\\'g\\'ri hostname'; if (getHost('http://sub.example.com:8080/path') !== 'sub.example.com') return 'Port va path tozalanmadi'; return null;"
    },
    {
      id: 2,
      title: "Query parametrlarini parse qilish",
      instruction: "URL ichidagi query parametrlarini (search params) obyekt ko'rinishida qaytaruvchi `getQueryParams(url)` funksiyasini yozing.",
      startingCode: "function getQueryParams(url) {\n  // Obyekt ko'rinishida qaytaring\n}",
      hint: "URLSearchParams klassidan foydalaning.",
      test: "if (typeof getQueryParams !== 'function') return 'getQueryParams topilmadi'; const params = getQueryParams('https://test.uz?page=2&limit=10'); if (params.page !== '2' || params.limit !== '10') return 'Parametrlar noto\\'g\\'ri parse qilindi'; return null;"
    },
    {
      id: 3,
      title: "Protocol tekshiruvi",
      instruction: "URL faqat xavfsiz `https` protokolidan foydalanayotganini tekshiruvchi `isSecure(url)` funksiyasini yozing (true/false).",
      startingCode: "function isSecure(url) {\n  // Tekshiring\n}",
      hint: "URL.startsWith('https://') yoki new URL(url).protocol === 'https:' orqali tekshirish mumkin.",
      test: "if (typeof isSecure !== 'function') return 'isSecure topilmadi'; if (isSecure('https://example.com') !== true) return 'HTTPS xatolik'; if (isSecure('http://example.com') !== false) return 'HTTP rad etilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "DNS (Domain Name System) ning asosiy vazifasi nima?",
      options: [
        "Veb-saytlarni xakerlardan himoya qilish",
        "Domen nomlarini kompyuter tushunadigan IP manzillarga aylantirish",
        "Foydalanuvchilarga IP manzillarni yashirish imkonini berish",
        "Internet tezligini oshirish"
      ],
      correctAnswer: 1,
      explanation: "DNS domen nomlarini (masalan, google.com) tegishli IP manzillarga (masalan, 142.250.190.46) aylantiradi."
    },
    {
      id: 2,
      question: "Domen nomini to'g'ridan-to'g'ri IPv4 manziliga bog'laydigan DNS yozuvi qaysi?",
      options: [
        "CNAME",
        "AAAA",
        "A record",
        "MX record"
      ],
      correctAnswer: 2,
      explanation: "A (Address) yozuvi domenni IPv4 manziliga yo'naltiradi. AAAA esa IPv6 uchun."
    },
    {
      id: 3,
      question: "CNAME yozuvi nima vazifani bajaradi?",
      options: [
        "Elektron pochta marshrutini belgilaydi",
        "Bitta domenni boshqa domen nomiga (taxallusi) yo'naltiradi",
        "IPv6 manzilini aniqlaydi",
        "Zona ma'lumotlarini nusxalaydi"
      ],
      correctAnswer: 1,
      explanation: "CNAME (Canonical Name) bir domen nomini boshqasiga yo'naltiruvchi taxallus yozuvidir."
    },
    {
      id: 4,
      question: "DNS rezolyutsiya jarayonida eng yuqori darajada turadigan server nomi nima?",
      options: [
        "TLD Nameserver",
        "Root Nameserver",
        "Authoritative Nameserver",
        "ISP Resolver"
      ],
      correctAnswer: 1,
      explanation: "Root Nameserver (ildiz serveri) ierarxiyaning eng yuqori nuqtasi bo'lib, u so'rovlarni tegishli TLD (Top-Level Domain) serverlariga yo'naltiradi."
    },
    {
      id: 5,
      question: "DNS so'rovlari asosan qaysi transport protokoli va port orqali ishlaydi?",
      options: [
        "TCP, 80-port",
        "UDP, 53-port",
        "TCP, 443-port",
        "UDP, 8080-port"
      ],
      correctAnswer: 1,
      explanation: "DNS tezkorlik uchun asosan UDP protokolining 53-portidan foydalanadi."
    },
    {
      id: 6,
      question: "TTL (Time to Live) nima?",
      options: [
        "Sayt serverining ishlash kafolati muddati",
        "DNS yozuvining keshda saqlanish muddati (soniyalarda)",
        "Sessiya kalitining amal qilish vaqti",
        "IP manzil o'zgarish chastotasi"
      ],
      correctAnswer: 1,
      explanation: "TTL (Time to Live) yozuvning keshda qancha vaqt davomida yangilanmasdan saqlanishi kerakligini bildiradi."
    },
    {
      id: 7,
      question: "Anycast DNS nima?",
      options: [
        "Barcha so'rovlarni faqat bitta serverga yuborish",
        "Dunyoning turli hududlarida bir xil IP ga ega DNS serverlarni joylashtirish va eng yaqiniga yo'naltirish",
        "Faqat ichki tarmoqda ishlaydigan DNS",
        "IP manzilni shifrlash usuli"
      ],
      correctAnswer: 1,
      explanation: "Anycast routing yordamida bitta IP dunyo bo'ylab tarqatiladi va foydalanuvchining so'rovi eng yaqin serverga boradi."
    },
    {
      id: 8,
      question: "URL, URI va URN munosabati haqida qaysi tasdiq to'g'ri?",
      options: [
        "URI va URL umuman farq qiladi",
        "Har qanday URL bir vaqtda URI hisoblanadi",
        "URN bu URL-ning eski nomi",
        "Faqat URN-lar brauzerda ochiladi"
      ],
      correctAnswer: 1,
      explanation: "URI resursni identifikatsiya qilishning umumiy nomi bo'lib, URL va URN uning turlaridir. Shu bois har qanday URL o'z-o'zidan URI hisoblanadi."
    },
    {
      id: 9,
      question: "https://sub.example.com/index.html URL manzilida 'sub' nima deb ataladi?",
      options: [
        "Path (yo'l)",
        "Protocol (protokol)",
        "Subdomain (ichki domen)",
        "Top-Level Domain (TLD)"
      ],
      correctAnswer: 2,
      explanation: "sub - subdomain (ichki domen) hisoblanadi. example.com esa asosiy domen, .com esa TLD."
    },
    {
      id: 10,
      question: "DNS Spoofing (Cache Poisoning) nima?",
      options: [
        "DNS serverdagi ma'lumotlarni o'chirib yuborish",
        "Keshga soxta IP yozib, foydalanuvchini firgarlik saytiga yo'naltirish",
        "Domen nomini o'g'irlab olish",
        "Server yuklamasini oshirish"
      ],
      correctAnswer: 1,
      explanation: "DNS Cache Poisoning — bu keshlovchi resolverga soxta DNS javoblarini kiritish orqali foydalanuvchilarni noto'g'ri manzillarga yuborish hujumidir."
    },
    {
      id: 11,
      question: "MX record (Mail Exchange) vazifasi nima?",
      options: [
        "Domen nomini almashtirish",
        "Domen uchun elektron pochta xabarlarini qabul qiluvchi serverlarni ko'rsatish",
        "Fayl almashishni yo'lga qo'yish",
        "Xavfsiz ulanishni tekshirish"
      ],
      correctAnswer: 1,
      explanation: "MX yozuvlari domen uchun kelayotgan elektron xatlarni qayta ishlaydigan pochta serverlarini belgilaydi."
    },
    {
      id: 12,
      question: "URN (Uniform Resource Name) ning asosiy farqi nimada?",
      options: [
        "U faqat rasm fayllari uchun ishlatiladi",
        "U resursning joylashgan manzilini emas, faqat uning doimiy nomini aniqlaydi",
        "U faqat HTTPS orqali ishlaydi",
        "U har doim IP manzilni o'z ichiga oladi"
      ],
      correctAnswer: 1,
      explanation: "URN resursning lokatsiyasidan (qayerdaligidan) qat'i nazar uning noyob va doimiy nomini aniqlaydi (masalan, urn:isbn:0451524934)."
    }
  ]
};
