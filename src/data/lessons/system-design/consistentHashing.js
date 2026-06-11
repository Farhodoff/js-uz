export const consistentHashing = {
  id: "consistentHashing",
  title: "Consistent Hashing (Barqaror Hashing)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Taqsimlangan tizimlarda ma'lumotlarni bir nechta serverlar o'rtasida taqsimlashda an'anaviy hashing (masalan, \`hash(key) % server_count\`) ishlatiladi. Biroq, serverlar soni o'zgarganda (yangi server qo'shilsa yoki mavjud server buzilsa), deyarli barcha kalitlar boshqa serverlarga yo'naltirilib ketadi. Bu kesh tizimlarida (masalan, Redis kesh) keskin kesh qulashi (cache miss bo'roni)ga olib keladi.

**Consistent Hashing (Barqaror Hashing)** — bu serverlar soni o'zgarganda faqat minimal miqdordagi kalitlarning yo'nalishini o'zgartiruvchi maxsus hashing algoritmidir.

### Doiraviy Stol analogiyasi:
Tasavvur qiling, doiraviy stol atrofida 4 ta do'st (serverlar) o'tiribdi. Ularning har biri stolda ma'lum burchakda joylashgan.
Siz stoldagi tasodifiy nuqtaga olma (kalit)larni qo'yasiz. Har bir olma soat mili yo'nalishi bo'ylab eng yaqin turgan do'stga tegishli bo'ladi.
- Agarda yangi do'st (5-server) kelib stolga o'tirsa, faqatgina uning yonidagi bir nechta olmalargina yangi do'stga o'tadi. Qolgan barcha do'stlarning olmalari o'z joyida qoladi.
- Agarda an'anaviy usul bo'lsa, stol o'lchami o'zgargani uchun hammadan olmalar tortib olinib, qaytadan hisoblab taqsimlangan bo'lardi.

---

## 2. 💻 Real Kod Misollari

JavaScript-da Consistent Hashing halqasini (Hash Ring) yaratish misoli:

\`\`\`javascript
// CRC32 yoki oddiy satr hashlovchi helper
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // 32bit integer holatiga keltirish
  }
  return Math.abs(hash);
}

class HashRing {
  constructor() {
    this.ring = []; // [{ hashVal: number, node: string }]
    this.nodes = new Set();
  }

  addNode(node) {
    this.nodes.add(node);
    const hashVal = simpleHash(node);
    this.ring.push({ hashVal, node });
    this.ring.sort((a, b) => a.hashVal - b.hashVal);
  }

  getNode(key) {
    if (this.ring.length === 0) return null;
    const keyHash = simpleHash(key);
    // Halqa bo'yicha soat mili bo'yicha birinchi katta hashga ega serverni topish
    for (let i = 0; i < this.ring.length; i++) {
      if (this.ring[i].hashVal >= keyHash) {
        return this.ring[i].node;
      }
    }
    // Agar oxiridan oshib ketsa, doiraning boshidagi serverga qaytiladi
    return this.ring[0].node;
  }
}

const hr = new HashRing();
hr.addNode("Server_A");
hr.addNode("Server_B");
hr.addNode("Server_C");

console.log(hr.getNode("user_session_123")); // Serverlardan biriga barqaror yo'naltiradi
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Hashing Ring (Halqa):
Ushbu algoritmda sonlar o'qi aylana (doira) ko'rinishida tasavvur qilinadi. Misol uchun, $0$ dan $2^{32}-1$ gacha bo'lgan sonlar aylanada joylashadi. Serverlar va kalitlar (keys) bir xil hash funksiya yordamida shu halqaga joylashtiriladi.

### 2. Virtual Nodes (Virtual Tugunlar):
Agar serverlar soni kam bo'lsa, ular halqa bo'ylab notekis tarqalib qolishi va bitta serverga haddan tashqari ko'p yuklama tushishi mumkin (Hotspots). Buning oldini olish uchun har bir server uchun bir nechta virtual nusxalar (masalan, \`Server_A#1\`, \`Server_A#2\`) yaratilib halqaning turli nuqtalariga qo'yiladi. Bu yuklamani mutlaqo teng taqsimlashga yordam beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Virtual tugunlarsiz halqa yaratish:** Buning oqibatida serverlar o'rtasida yuklama notekis taqsimlanib, ayrim serverlar qulab tushadi (unbalanced distribution).
2. **Qidirish jarayonini optimallashtirmaslik:** Ring juda kattalashganda oddiy chiziqli qidiruv ($O(n)$) sekinlashadi. Buning o'rniga Binary Search ($O(\log n)$) dan foydalanish to'g'ri bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Consistent Hashing o'zi nima va u an'anaviy modul hashingdan nimasi bilan farq qiladi?**
Consistent Hashing serverlar soni o'zgarganda faqat minimal miqdordagi kalitlarni qayta taqsimlaydigan hashing usulidir. An'anaviy usulda esa deyarli hamma kalitlar qayta taqsimlanadi.

**2. Consistent Hashing qaysi tizimlarda keng qo'llaniladi?**
Taqsimlangan kesh tizimlarida (Memcached, Redis Cluster), yuk taqsimlovchilarda va taqsimlangan ma'lumotlar omborlarida (DynamoDB, Cassandra).

**3. Ring (Halqa) konsepsiyasi nima?**
Hash qiymatlar maydoni ($0$ dan $2^{32}-1$ gacha) aylanma zanjir shaklida tasavvur qilinadi, serverlar va kalitlar shu aylanaga joylashtiriladi.

**4. Kalit (Key) qaysi qoida bo'yicha serverga biriktiriladi?**
Kalitning hash burchagidan boshlab soat mili yo'nalishi bo'yicha harakat qilganda birinchi uchragan server tuguniga biriktiriladi.

**5. Virtual Nodes (Virtual Tugunlar) nima va ular qanday muammoni hal qiladi?**
Bitta serverning halqadagi bir nechta virtual nusxalari. Ular kalitlarning serverlar bo'ylab notekis tarqalishi va yuklama muvozanatsizligini (hotspots) bartaraf qiladi.

**6. Server o'chirilganda (Node failure) Consistent Hashing qanday yo'l tutadi?**
Faqat o'sha o'chirilgan serverga tegishli bo'lgan kalitlargina soat mili bo'yicha undan keyingi turgan serverga o'tadi. Qolgan serverlardagi keshlar buzilmaydi.

**7. Consistent Hashing-da binary search qachon kerak bo'ladi?**
Virtual tugunlar soni minglab bo'lganda, halqadan mos serverni tezroq topish ($O(\log n)$) uchun binar qidiruv algoritmi qo'llaniladi.

**8. Kesh qulashi (Cache stampede / Cache miss storm) nima?**
Server qo'shilganida yoki o'chganida barcha keshlar yo'qolib, so'rovlar bir vaqtda asosiy bazaga borib yopirilishi va tizimni qulatishi.

**9. Consistent Hashing buni qanday kamaytiradi?**
Server o'zgarganda faqat $k/n$ miqdordagi keshlar yo'qoladi (bu yerda $k$ - kalitlar, $n$ - serverlar soni), qolgan barcha keshlar saqlanadi.

**10. Server quvvati har xil bo'lsa (Heterogeneous servers) Consistent Hashing qanday moslashtiriladi?**
Kuchli serverlarga ko'proq virtual tugunlar (Virtual Nodes), kuchsizlariga esa kamroq virtual tugunlar biriktiriladi.

**11. Hash funksiyaning tekisligi (Uniformity) Consistent Hashing uchun nega muhim?**
Agar hash funksiya qiymatlarni doira bo'ylab bir tekis taqsimlamasa, ma'lum serverlar hududi judayam yuklanib ketadi.

**12. MD5 yoki SHA-256 algoritmlarini Consistent Hashing-da ishlatsa bo'ladimi?**
Ha, ulardan keng foydalaniladi (masalan, MD5 128-bitli butun son hosil qiladi va uni halqaga joylashtirish mumkin).

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyida exercises bo'limida bajaring.

---

## 7. 📝 12 ta Mini Test

Testlar orqali bilimingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Amazon DynamoDB va Cassandra Arxitekturasi
Ushbu NoSQL ma'lumotlar bazalarida ma'lumotlarni klasterdagi serverlar bo'ylab taqsimlash va saqlash to'liq Consistent Hashing halqasiga asoslangan. Bu klasterga dinamik ravishda yangi serverlar qo'shish imkonini beradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    subgraph Hash Ring 0 to 2^32-1
        A[Node A - Hash 1000] -->|Clockwise| K1[Key 1 - Hash 1500]
        K1 -->|Assigned to| B[Node B - Hash 3000]
        B -->|Clockwise| K2[Key 2 - Hash 4000]
        K2 -->|Assigned to| C[Node C - Hash 6000]
        C -->|Clockwise| A
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

| Atama | Ta'rif | Koddagi ifodasi |
| :--- | :--- | :--- |
| **Hash Ring** | Tartiblangan hash qiymatlari massivi | \`ring.sort((a,b) => a.hash - b.hash)\` |
| **Virtual Node** | Serverning bir nechta nuqtadagi nusxasi | \`Server_A#1\`, \`Server_A#2\` |
| **Lookup** | Kalitdan keyingi birinchi katta elementni topish | Binary Search yoki Array.find |
`,
  exercises: [
    {
      id: 1,
      title: "Simple String Hash Funksiyasi",
      instruction: "Berilgan satrdan (`str`) 32-bitli musbat butun son ko'rinishidagi hash qiymatini hisoblaydigan `calculateHash(str)` funksiyasini yozing.",
      startingCode: "function calculateHash(str) {\n  let hash = 0;\n  for (let i = 0; i < str.length; i++) {\n    hash = (hash << 5) - hash + str.charCodeAt(i);\n    hash |= 0;\n  }\n  return Math.abs(hash);\n}",
      hint: "Barcha amallar tayyor, shunchaki berilgan logikani qaytarib tekshiring.",
      test: "if (typeof calculateHash !== 'function') return 'calculateHash topilmadi'; if (calculateHash('Server1') === calculateHash('Server2')) return 'Hash har xil qiymatlar uchun bir xil bo\\'lmasligi kerak'; if (calculateHash('A') < 0) return 'Hash musbat bo\\'lishi shart'; return null;"
    },
    {
      id: 2,
      title: "Halqadan Serverni topish (Lookup)",
      instruction: "Tartiblangan `ring` massivi va berilgan kalit hash qiymati `keyHash` bo'yicha soat mili bo'yicha birinchi to'g'ri keluvchi server nomini qaytaruvchi `lookupNode(ring, keyHash)` funksiyasini yozing. Agar mos hash topilmasa (ya'ni barcha server hashlaridan katta bo'lsa), halqaning boshidagi (0-indeksdagi) serverni qaytarsin. `ring` formati: `[{ hash: 100, node: 'S1' }, { hash: 200, node: 'S2' }]`.",
      startingCode: "function lookupNode(ring, keyHash) {\n  // Halqani aylanib mos serverni toping\n}",
      hint: "Halqada chiziqli aylanib, element.hash >= keyHash shartini tekshiring, agar topilmasa ring[0].node qaytaring.",
      test: "if (typeof lookupNode !== 'function') return 'lookupNode topilmadi'; const ring = [{ hash: 100, node: 'S1' }, { hash: 300, node: 'S2' }, { hash: 500, node: 'S3' }]; if (lookupNode(ring, 150) !== 'S2') return 'S2 topilmadi'; if (lookupNode(ring, 600) !== 'S1') return 'Doira boshi xato'; return null;"
    },
    {
      id: 3,
      title: "Virtual Tugunlar Generatorini yaratish",
      instruction: "Berilgan haqiqiy server nomi (`nodeName`) va virtual tugunlar soni (`vNodeCount`) bo'yicha virtual tugunlar nomlaridan iborat massiv qaytaradigan `generateVirtualNodes(nodeName, vNodeCount)` funksiyasini yozing (masalan, S1 va 3 bo'lsa `['S1#0', 'S1#1', 'S1#2']`).",
      startingCode: "function generateVirtualNodes(nodeName, vNodeCount) {\n  // Massiv qaytaring\n}",
      hint: "Loop yordamida har bir indeks uchun nodeName + '#' + i ko'rinishida string yig'ing.",
      test: "if (typeof generateVirtualNodes !== 'function') return 'generateVirtualNodes topilmadi'; const res = generateVirtualNodes('ServerA', 3); if (res.length !== 3 || res[1] !== 'ServerA#1') return 'Virtual node format xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Consistent Hashing-ning an'anaviy hashingdan (mod hashing) asosiy ustunligi nimada?",
      options: [
        "U faqat frontend dasturlari uchun ishlaydi",
        "Serverlar soni o'zgarganda faqat minimal miqdordagi keshlar yo'qolishini ta'minlaydi",
        "Barcha ma'lumotlarni shifrlab beradi",
        "Tranzaksiyalarni tezlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Consistent Hashing kesh serverlari soni o'zgarganda (tugun qo'shilganda yoki o'chganda) kesh miss bo'ronini oldini olib, minimal taqsimotni ta'minlaydi."
    },
    {
      id: 2,
      question: "Consistent Hashing halqasida (Hash Ring) kalitlar serverga qanday yo'nalish bo'yicha biriktiriladi?",
      options: [
        "Tasodifiy ravishda",
        "Soat mili yo'nalishi bo'yicha eng yaqin bo'lgan serverga",
        "Har doim eng katta serverga",
        "Faqat birinchi serverga"
      ],
      correctAnswer: 1,
      explanation: "Kalitning hashi hisoblangach, u aylanada soat mili bo'yicha o'zidan keyingi birinchi uchragan server tuguniga biriktiriladi."
    },
    {
      id: 3,
      question: "Consistent Hashing-dagi 'Virtual Nodes' (Virtual Tugunlar) nima?",
      options: [
        "Internetda ishlamaydigan soxta serverlar",
        "Haqiqiy serverning halqa bo'ylab har xil nuqtalarda joylashgan ko'plab virtual nusxalari",
        "Baza jadvallarining nusxalari",
        "IP manzillarni yashiruvchi proxy"
      ],
      correctAnswer: 1,
      explanation: "Virtual Nodes - bitta jismoniy serverning halqadagi bir nechta hash nuqtalari bo'lib, ular yuklamani serverlar o'rtasida teng taqsimlash uchun zarur."
    },
    {
      id: 4,
      question: "Virtual tugunlar ishlatilmaganda Consistent Hashing-da qanday muammo yuzaga kelishi mumkin?",
      options: [
        "Sayt dizayni buzilishi",
        "Trafik serverlar orasida notekis taqsimlanib, ayrim serverlarga haddan tashqari ko'p yuklama tushishi (Hotspots)",
        "DNS kesh o'chib qolishi",
        "Ulanish butunlay to'xtashi"
      ],
      correctAnswer: 1,
      explanation: "Agar virtual tugunlar bo'lmasa, serverlar halqa bo'ylab notekis joylashadi va keshlar taqsimoti muvozanatsiz bo'lib qoladi."
    },
    {
      id: 5,
      question: "Server o'chib qolganda (Node Failure), Consistent Hashing qanday yo'l tutadi?",
      options: [
        "Barcha serverlardagi ma'lumotlarni o'chirib yuboradi",
        "Faqat o'sha o'chgan serverga tegishli kalitlar soat mili bo'yicha undan keyingi serverga o'tkaziladi, qolganlar o'zgarishsiz qoladi",
        "Butun klaster faoliyatini to'xtatadi",
        "Yangi server avtomatik sotib olinadi"
      ],
      correctAnswer: 1,
      explanation: "Bu Consistent Hashing-ning kuchi: nosozlik yuz berganda faqat o'sha o'chgan serverdagi kalitlarnigina boshqa serverga o'tkazadi, qolgan serverlar keshiga tegilmaydi."
    },
    {
      id: 6,
      question: "Consistent Hashing-da nima uchun MD5 yoki SHA-1 kabi kriptografik hashlardan foydalaniladi?",
      options: [
        "Ular faqat rasmlarni siqish uchun kerak",
        "Chunki ular qiymatlarni butun doira bo'ylab yuqori darajada bir tekis taqsimlaydi",
        "Ular ma'lumotlarni tezroq o'chiradi",
        "Ular faqat SQL bazalarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Kriptografik hashlarning bir tekis tarqatish (uniformity) xususiyati serverlarning halqada muvozanatli joylashishini ta'minlaydi."
    },
    {
      id: 7,
      question: "Halqa (Ring) bo'yicha mos serverni tezkor topish uchun qaysi qidiruv algoritmidan foydalanish eng to'g'ri yo'l?",
      options: [
        "Linear Search ($O(n)$)",
        "Binary Search ($O(\\log n)$)",
        "Bubble Sort",
        "Depth First Search (DFS)"
      ],
      correctAnswer: 1,
      explanation: "Tartiblangan halqa massivida kalitga mos serverni tezkor qidirish uchun Binar Qidiruv algoritmi eng samarali usul hisoblanadi."
    },
    {
      id: 8,
      question: "Consistent Hashing-da serverlar soni o'zgarganda kesh o'zgarishi nisbati qanday hisoblanadi (bu yerda K - kalitlar, N - serverlar)?",
      options: [
        "Barcha keshlar o'chadi",
        "Taxminan K/N miqdordagi kalitlar qayta taqsimlanadi",
        "Hech qaysi kalit o'zgarmaydi",
        "K*N kalitlar o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "Serverlar soni o'zgarganda faqat umumiy keshning 1/N qismigina (minimal darajada) qayta taqsimlanib yo'qoladi."
    },
    {
      id: 9,
      question: "Yangi server qo'shilganda (Node Add) Consistent Hashing-da nima yuz beradi?",
      options: [
        "Sayt vaqtincha yopiladi",
        "Yangi server halqadagi joyiga qarab faqat o'zidan oldin turgan ba'zi kalitlarni o'ziga oladi, qolgan serverlar yukiga ta'sir qilmaydi",
        "Barcha keshlar yangi serverga ko'chadi",
        "Eski serverlar o'chib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Yangi server halqadagi o'z pozitsiyasiga ko'ra ba'zi kalitlar yukini o'ziga olib, boshqa serverlarning keshiga zarar yetkazmaydi."
    },
    {
      id: 10,
      question: "Consistent Hashing-da serverlarning quvvati har xil bo'lsa (masalan, RAM 4GB vs 32GB) nima qilinadi?",
      options: [
        "Barcha serverlar kuchi tenglashtiriladi",
        "Kuchliroq serverlarga ko'proq virtual tugunlar (Virtual Nodes) biriktiriladi",
        "Kuchli server halqadan olib tashlanadi",
        "Faqat bitta server ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Quvvati yuqori serverlarga ko'proq virtual tugunlar berish orqali ularga halqaning kattaroq qismini egallash va ko'proq yuklama olish imkoni beriladi."
    },
    {
      id: 11,
      question: "Consistent Hashing o'quv zanjirida '$0$ dan $2^{32}-1$' sonlar diapazoni nimani anglatadi?",
      options: [
        "Tizimdagi maksimal foydalanuvchilar sonini",
        "Hash funksiyasi hosil qilishi mumkin bo'lgan 32-bitli butun sonlar maydoni (burchaklari) hajmini",
        "Baza jadvallari sonini",
        "Dars davomiyligini"
      ],
      correctAnswer: 1,
      explanation: "Bu 32-bitli unsigned integerlarning eng katta diapazoni bo'lib, Consistent Hashing aylanasi (halqasi)ning burchaklar o'lchamini ifodalaydi."
    },
    {
      id: 12,
      question: "DynamoDB kabi taqsimlangan bazalarda Consistent Hashing nimaga xizmat qiladi?",
      options: [
        "Faqat parollarni hashlash uchun",
        "Ma'lumotlar klasterdagi serverlar (shards) o'rtasida gorizontal teng va dinamik taqsimlanishi uchun",
        "Faqat SQL so'rovlarini tahlil qilish uchun",
        "Frontend dizaynini sozlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Taqsimlangan NoSQL bazalar ma'lumotlarni turli serverlar o'rtasida dinamik, uzilishlarsiz va adolatli joylashtirish uchun ushbu algoritmdan keng foydalanadi."
    }
  ]
};
