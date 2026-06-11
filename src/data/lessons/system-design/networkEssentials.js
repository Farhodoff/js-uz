export const networkEssentials = {
  id: "networkEssentials",
  title: "Tarmoq Asoslari (TCP/UDP, HTTP, Proxy)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Internet orqali kompyuterlar bir-biri bilan bog'lanishi uchun ma'lum qoidalar — **tarmoq protokollari (Network Protocols)** kerak. Bular ma'lumotlarni qanday formatda jo'natish, yo'ldagi xatolarni qanday tekshirish va manzillarni qanday aniqlashni belgilaydi.

Eng mashhur va muhim protokollar: **TCP (Transmission Control Protocol)** va **UDP (User Datagram Protocol)**.

### Maktub va Ratsiya analogiyasi:
- **TCP (Kafolatlangan xat):** Siz do'stingizga muhim hujjatlarni pochta orqali yuboryapsiz. Har bir sahifa raqamlangan. Agar bitta sahifa yetib bormasa, pochta uni qayta jo'natadi. Oxirida barcha sahifalar to'liq va tartib bilan yig'ilgandagina qabul qilinadi. Bu xavfsiz va ishonchli, ammo sekinroq.
- **UDP (Ratsiya/Jonli efir):** Siz do'stingiz bilan ratsiya orqali gaplashyapsiz. Gapirayotganingizda 1-2 ta tovush tushib qolsa ham, siz gapirishni davom ettirasiz. Aloqani uzib, tushib qolgan harflarni qaytadan talaffuz qilmaysiz. Bu o'ta tezkor, ammo ba'zi ma'lumotlar yo'qolishi mumkin.

---

## 2. 💻 Real Kod Misollari

Node.js-da HTTP va UDP serverlarini yaratish va solishtirish:

### TCP/HTTP Server:
\`\`\`javascript
const http = require('http');

// HTTP server yaratish (TCP asosida ishlaydi)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Salom, TCP dunyosi!');
});

server.listen(3000, () => {
  console.log('HTTP Server 3000-portda ishlamoqda');
});
\`\`\`

### UDP Server:
\`\`\`javascript
const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
  console.log(\`Kelgan xabar: \${msg} (\${rinfo.address}:\${rinfo.port})\`);
});

udpServer.bind(41234, () => {
  console.log('UDP Server 41234-portda eshitmoqda');
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 3-Way Handshake (TCP ulanish):
TCP-da ulanish o'rnatish uchun server va mijoz 3 bosqichli salomlashishni amalga oshiradi:
1. **SYN (Synchronize):** Client serverga ulanish so'rovini yuboradi.
2. **SYN-ACK:** Server so'rovni qabul qilib, o'zining tasdig'ini yuboradi.
3. **ACK (Acknowledge):** Client server tasdig'ini qabul qilib, ulanish tayyorligini bildiradi. Shundan so'ng ma'lumot uzatiladi.

### Proxies (Vositachilar):
- **Forward Proxy:** Mijoz (Client) tomonida turib, uning shaxsini (IP-sini) serverlardan yashiradi. Masalan, VPN yoki ofis ichidagi tarmoq filtrlovchisi.
- **Reverse Proxy:** Server tomonida turib, kelgan so'rovlarni ichki serverlarga yo'naltiradi, yuklamani taqsimlaydi va xavfsizlikni ta'minlaydi (masalan, Nginx).

### HTTP Versiyalari:
- **HTTP/1.1:** Har bir so'rov uchun alohida TCP ulanish ochishga harakat qiladi (Keep-Alive bo'lsa ham navbat bilan). Head-of-line blocking muammosi bor.
- **HTTP/2:** Bitta TCP ulanish orqali ko'plab so'rovlarni parallel yuborish (Multiplexing) va sarlavhalarni siqish.
- **HTTP/3:** TCP-dan voz kechib, tezkor UDP asosidagi **QUIC** protokoliga o'tgan. Yo'qotishlar bitta oqim bilan cheklanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Video/O'yinlar uchun TCP tanlash:** Juda yuqori tezlik talab etiladigan real-time o'yinlar yoki jonli efirlarda TCP ishlatish kechikishlarga sabab bo'ladi. UDP afzal.
2. **Faqat HTTP-ga ishonish:** HTTP ma'lumotlarni ochiq yuboradi. Maxfiy tokenlar, parollarni faqat shifrlangan HTTPS protokoli orqali uzatish shart.
3. **Reverse Proxy-ni noto'g'ri sozlash:** Nginx orqali so'rov yuborilganda foydalanuvchining real IP-sini o'tkazib yubormaslik (serverga hamma so'rovlar \`127.0.0.1\` dan kelayotgandek ko'rinishi). Buning uchun \`X-Forwarded-For\` sarlavhasini yoqish kerak.

---

## 5. 💬 12 ta Intervyu Savollari

**1. TCP va UDP o'rtasidagi asosiy farqlar nima?**
TCP ishonchli, ulanishni tekshiradi, tartibni kafolatlaydi, lekin sekinroq. UDP tezkor, ulanishni tekshirmaydi, paketlar yo'qolishiga ruxsat beradi.

**2. Port nima va u nima uchun kerak?**
Bitta operatsion tizimda ishlayotgan turli dasturlarni (xizmatlarni) ajratib olish uchun ishlatiladigan raqamli manzil (masalan, HTTP uchun 80, HTTPS uchun 443).

**3. Forward Proxy va Reverse Proxy farqi nimada?**
Forward Proxy mijozlarni himoya qiladi (client IP-ni yashiradi). Reverse Proxy serverlarni himoya qiladi va so'rovlarni taqsimlaydi.

**4. HTTP 3-way handshake qanday ishlaydi?**
Client SYN yuboradi -> Server SYN-ACK qaytaradi -> Client ACK yuboradi. TCP aloqa o'rnatiladi.

**5. Nima uchun HTTP/3 protokolida TCP o'rniga UDP tanlandi?**
TCP-dagi ulanish o'rnatish vaqti (handshake) va paket yo'qolganda barcha oqimlarning to'xtab qolishi (Head-of-Line blocking) muammolarini bartaraf etish uchun.

**6. HTTP va HTTPS farqi nimada?**
HTTP ma'lumotlarni shifrlamaydi. HTTPS esa SSL/TLS qatlami orqali barcha ma'lumotlarni shifrlab yuboradi.

**7. Nginx nima va u qanday maqsadlarda ishlatiladi?**
Reverse proxy, yuk taqsimlovchi (Load Balancer), kesh serveri va statik fayllarni tarqatuvchi yuqori samarali serverdir.

**8. TCP-da 'Flow Control' nima?**
Qabul qiluvchi server kelayotgan ma'lumotlar oqimiga dosh bera olmay qolganda, jo'natuvchi tezligini pasaytirish mexanizmi.

**9. HTTP/2 dagi 'Multiplexing' nima?**
Bitta TCP ulanish orqali bir vaqtning o'zida bir nechta so'rov va javoblarni aralash (parallel) holatda uzatish imkoniyati.

**10. DNS qaysi port orqali ishlaydi?**
DNS odatda 53-port (UDP) orqali ishlaydi.

**11. WebSockets va HTTP protokoli farqi nimada?**
HTTP bir tomonlama so'rov-javob shaklida ishlaydi. WebSockets esa bitta ulanish ustida doimiy ikki tomonlama (Full-Duplex) aloqani ta'minlaydi.

**12. HTTPS sertifikati qanday ishlaydi?**
Sertifikat asimmetrik shifrlashdan (ochiq va yopiq kalitlar) foydalanib, mijoz va server o'rtasida simmetrik kalit almashishni xavfsiz amalga oshiradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlarni bajarib bilimingizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Test savollariga javob bering va o'zingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Nginx orqali API Load Balancing va SSL Termination
Katta loyihalarda tashqi HTTPS so'rovlari birinchi bo'lib Nginx (Reverse Proxy) ga keladi. Nginx SSL shifrlashni echadi (SSL termination) va so'rovlarni ichki tarmoqdagi HTTP orqali ishlaydigan tezkor backend serverlariga (Node.js/Go) yo'naltiradi. Bu backend serverlaridan shifrlash yukini olib tashlaydi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    Client1[Client A] -->|Requests| Proxy[Forward Proxy]
    Proxy -->|Hides Client IP| Internet((Internet))
    
    Internet -->|Incoming Traffic| RProxy[Reverse Proxy - Nginx]
    RProxy -->|Load Balance| App1[App Server 1]
    RProxy -->|Load Balance| App2[App Server 2]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Protokol / Texnologiya | Port | Xususiyati |
| :--- | :--- | :--- |
| **HTTP** | 80 | Shifrlanmagan matnli aloqa |
| **HTTPS** | 443 | SSL/TLS shifrlangan xavfsiz aloqa |
| **TCP** | - | Ishonchli, 3-way handshake, sekinroq |
| **UDP** | - | Tezkor, oqimli (Streaming), yo'qotishlar bo'lishi mumkin |
| **Reverse Proxy** | - | Server tomonida yuklamani bo'lish, SSL yechish |
`,
  exercises: [
    {
      id: 1,
      title: "Protokolni aniqlash",
      instruction: "Berilgan URL manzilidan foydalanib protokolni (http yoki https) ajratib oluvchi `getProtocol(url)` funksiyasini yozing.",
      startingCode: "function getProtocol(url) {\n  // Protokolni qaytaring\n}",
      hint: "new URL(url).protocol orqali protocolni oling va oxiridagi ikki nuqtani olib tashlang.",
      test: "if (typeof getProtocol !== 'function') return 'getProtocol topilmadi'; if (getProtocol('https://example.com') !== 'https') return 'https xato'; if (getProtocol('http://test.uz') !== 'http') return 'http xato'; return null;"
    },
    {
      id: 2,
      title: "Port raqamini default qilish",
      instruction: "Berilgan URL-da agar port ko'rsatilmagan bo'lsa, protokolga qarab default portni (http -> 80, https -> 443) qaytaruvchi `getPortOrDefault(url)` funksiyasini yozing. Agar port ko'rsatilgan bo'lsa, o'sha portni raqam ko'rinishida qaytaring.",
      startingCode: "function getPortOrDefault(url) {\n  // Portni aniqlang\n}",
      hint: "new URL(url) obyektining port va protocol atributlaridan foydalaning.",
      test: "if (typeof getPortOrDefault !== 'function') return 'getPortOrDefault topilmadi'; if (getPortOrDefault('https://site.com') !== 443) return 'HTTPS port xato'; if (getPortOrDefault('http://site.com:8080') !== 8080) return 'Maxsus port xato'; if (getPortOrDefault('http://site.com') !== 80) return 'HTTP port xato'; return null;"
    },
    {
      id: 3,
      title: "IP-manzil Validatsiyasi",
      instruction: "Berilgan satr to'g'ri IPv4 manzil ekanligini tekshiruvchi `isValidIPv4(ip)` funksiyasini yozing (true/false).",
      startingCode: "function isValidIPv4(ip) {\n  // 4 ta son nuqta bilan ajratilgan va har biri 0-255 oralig'ida bo'lishi kerak\n}",
      hint: "Satrni nuqta bo'yicha bo'lib, har bir qism son ekanligi va 0 dan 255 gacha ekanligini tekshiring.",
      test: "if (typeof isValidIPv4 !== 'function') return 'isValidIPv4 topilmadi'; if (isValidIPv4('192.168.1.1') !== true) return 'To\\'g\\'ri IP rad etildi'; if (isValidIPv4('256.100.0.1') !== false) return '256 xato tekshirilmadi'; if (isValidIPv4('192.168.1') !== false) return 'Qismlar soni yetarli emas'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TCP protokolining UDP dan asosiy ustunligi nimada?",
      options: [
        "Juda yuqori tezlikda ishlashi",
        "Paketlar yetkazib berilishini kafolatlashi va to'g'ri tartibda yig'ishi",
        "Ulanishlarsiz darhol ma'lumot jo'natishi",
        "Kattaroq portlardan foydalanishi"
      ],
      correctAnswer: 1,
      explanation: "TCP ma'lumot uzatish ishonchliligini, paketlar yo'qolmasligini va to'g'ri tartibda yetib borishini ta'minlaydi."
    },
    {
      id: 2,
      question: "TCP-da ulanish o'rnatish uchun ishlatiladigan jarayon qanday ataladi?",
      options: [
        "4-Way Termination",
        "3-Way Handshake",
        "DNS Lookup",
        "SSL Decryption"
      ],
      correctAnswer: 1,
      explanation: "TCP aloqani boshlash uchun SYN, SYN-ACK, va ACK bosqichlaridan iborat 3-Way Handshake mexanizmidan foydalanadi."
    },
    {
      id: 3,
      question: "Nima uchun onlayn o'yinlar va video striminglarda asosan UDP ishlatiladi?",
      options: [
        "UDP xavfsizroq bo'lgani uchun",
        "Minimal kechikish (low latency) va yuqori tezlik kerakligi uchun",
        "UDP paketlarni shifrlagani uchun",
        "TCP orqali video jo'natib bo'lmagani uchun"
      ],
      correctAnswer: 1,
      explanation: "UDP ulanishni tekshirmaydi va xatolarni qayta jo'natmaydi, bu esa ortiqcha kechikishlarsiz tezkor oqim uzatish imkonini beradi."
    },
    {
      id: 4,
      question: "HTTPS port raqami qaysi?",
      options: [
        "80",
        "8080",
        "443",
        "21"
      ],
      correctAnswer: 2,
      explanation: "Standart bo'yicha HTTP 80-portda, xavfsiz shifrlangan HTTPS esa 443-portda ishlaydi."
    },
    {
      id: 5,
      question: "Forward Proxy-ning asosiy vazifasi nima?",
      options: [
        "Mijozning shaxsini va IP-manzilini tashqi serverlardan yashirish",
        "Serverdagi yuklamani serverlar o'rtasida bo'lish",
        "Barcha ma'lumotlarni ommaga ochiq qilish",
        "Kodni xatolardan tozalash"
      ],
      correctAnswer: 0,
      explanation: "Forward Proxy mijoz (client) tomonida bo'lib, uning so'rovlarini o'z nomidan yuboradi va mijozning IP-sini yashiradi."
    },
    {
      id: 6,
      question: "Reverse Proxy nima?",
      options: [
        "Faqat ichki tarmoq fayllarini o'chirish tizimi",
        "Server tomonida turib, kelgan so'rovlarni ichki backend serverlariga xavfsiz taqsimlovchi vositachi",
        "Brauzerning keshini tozalaydigan plagin",
        "IP-manzillarni bloklaydigan provayder"
      ],
      correctAnswer: 1,
      explanation: "Reverse Proxy serverlar oldida turib, yuklamalarni bo'lish (Load Balancing), xavfsizlik va kesh yuritish bilan shug'ullanadi."
    },
    {
      id: 7,
      question: "HTTP/2 versiyasining HTTP/1.1 dan asosiy afzalligi nimada?",
      options: [
        "U faqat matnlarni ko'rsatadi",
        "Bitta TCP ulanish orqali ko'plab so'rovlarni parallel yuborish (Multiplexing) va header siqish",
        "Unda portlar ishlatilmaydi",
        "U internet provayderni chetlab o'tadi"
      ],
      correctAnswer: 1,
      explanation: "HTTP/2 bitta TCP kanali ichida ko'plab resurslarni parallel yuklash (Multiplexing) orqali sayt tezligini juda oshiradi."
    },
    {
      id: 8,
      question: "HTTP/3 qaysi protokol asosida ishlaydi?",
      options: [
        "Yangi TCP/2",
        "UDP (QUIC protokoli orqali)",
        "FTP",
        "WebSocket"
      ],
      correctAnswer: 1,
      explanation: "HTTP/3 tezlikni maksimal qilish va TCP kamchiliklarini tuzatish uchun UDP ustiga qurilgan QUIC protokolini ishlatadi."
    },
    {
      id: 9,
      question: "VPN qaysi proxy turiga o'xshab ishlaydi?",
      options: [
        "Forward Proxy",
        "Reverse Proxy",
        "DNS Proxy",
        "Bunday proxy yo'q"
      ],
      correctAnswer: 0,
      explanation: "VPN mijozning trafigini o'ziga olib, boshqa serverlarga yo'naltiradi, ya'ni Forward Proxy kabi mijoz shaxsini yashiradi."
    },
    {
      id: 10,
      question: "TCP-da 'Head-of-Line Blocking' muammosi nima?",
      options: [
        "Birinchi paket yo'qolganda yoki kechikkanida uning ortidagi barcha paketlar navbatda to'xtab qolishi",
        "Barcha xotiraning to'lib qolishi",
        "DNS server javob bermay qolishi",
        "Brauzer oynasining qotib qolishi"
      ],
      correctAnswer: 0,
      explanation: "TCP paketlarning qat'iy tartibda yig'ilishini talab qilgani sababli, 1-paket yo'qolsa, qolgan hamma paketlar yetib kelgan bo'lsa ham kutiladi."
    },
    {
      id: 11,
      question: "HTTPS-dagi SSL Handshake asosiy maqsadi nima?",
      options: [
        "Serverni o'chirib yoqish",
        "Mijoz va server o'rtasida shifrlash kalitlarini xavfsiz almashib olish va tomonlarni tasdiqlash",
        "IP manzilni o'zgartirish",
        "HTML kodni optimallashtirish"
      ],
      correctAnswer: 1,
      explanation: "SSL/TLS Handshake jarayonida tomonlar bir-birini sertifikat orqali tekshiradi va kelgusi so'rovlarni shifrlash uchun umumiy maxfiy kalit yaratadi."
    },
    {
      id: 12,
      question: "Tarmoqda 8080 porti odatda nima uchun ishlatiladi?",
      options: [
        "Faqat elektron pochta uchun",
        "Muqobil (alternative) HTTP porti sifatida, odatda local development yoki proxy-lar uchun",
        "Tizim xatolarini tuzatish uchun",
        "Internet tezligini cheklash uchun"
      ],
      correctAnswer: 1,
      explanation: "8080 porti rasmiy bo'lmagan, lekin dasturchilar tomonidan local serverlarni sinash va muqobil HTTP ulanishlar uchun keng qo'llaniladi."
    }
  ]
};
