export const dbReplication = {
  id: "dbReplication",
  title: "Database Replication (Ma'lumotlar bazasi replikatsiyasi)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

Tasavvur qiling, siz katta bir kutubxona mudirisiz. Kutubxonangizda juda noyob va mashhur ma'lumotnoma kitobi bor. Har kuni yuzlab odamlar kelib ushbu kitobni o'qishni xohlashadi. 

Agar kitob bitta bo'lsa:
1. Odamlar navbatda turib qolishadi (Kechikish/Latency).
2. Agar o'sha yagona kitob ustiga tasodifan suv to'kilib yaroqsiz bo'lib qolsa, kutubxona ishdan to'xtaydi (Single Point of Failure).

Ushbu muammoni hal qilish uchun siz kitobdan yana 3 ta nusxa tayyorlaysiz va ularni turli xonalarga qo'yasiz. Endi odamlar nusxalarni parallel o'qiy olishadi. 

**Database Replication (Ma'lumotlar bazasi replikatsiyasi)** — bu ma'lumotlarni bir nechta serverlarda (tugunlarda) bir xil holatda saqlash jarayonidir. U tizimning tezligini (Read throughput) oshiradi va bitta server o'chib qolsa ham tizim ishlashini davom ettirishini kafolatlaydi (High Availability).

---

## 2. 💻 Real Kod Misoli (Replikatsiya Sinxronizatsiyasi)

Quyida Sodda Leader-Replica (Active-Passive) replikatsiya modeli keltirilgan:

\`\`\`javascript
class DatabaseNode {
  constructor(id, isLeader = false) {
    this.id = id;
    this.isLeader = isLeader;
    this.store = new Map();
  }

  write(key, value) {
    if (!this.isLeader) {
      throw new Error("Faqat Leader tugunga yozish mumkin!");
    }
    this.store.set(key, value);
  }

  read(key) {
    return this.store.get(key);
  }
}

class ReplicationManager {
  constructor(leader, replicas) {
    this.leader = leader;
    this.replicas = replicas;
  }

  // Sinxron replikatsiya: barcha replikalar tasdiqlamaguncha foydalanuvchiga muvaffaqiyat xabari berilmaydi
  async writeSynchronous(key, value) {
    // 1. Leader-ga yozish
    this.leader.write(key, value);

    // 2. Barcha replikalarga parallel ravishda yozish
    const promises = this.replicas.map(async (replica) => {
      // Simulyatsiya qilingan tarmoq kechikishi
      await new Promise(resolve => setTimeout(resolve, Math.random() * 50));
      replica.store.set(key, value);
    });

    await Promise.all(promises);
    return "Sinxron yozish muvaffaqiyatli yakunlandi";
  }

  // Asinxron replikatsiya: Leader-ga yozilgan zahoti javob qaytariladi, replikalarga fonda yuboriladi
  writeAsynchronous(key, value) {
    // 1. Leader-ga yozish
    this.leader.write(key, value);

    // 2. Replikalarga orqa fonda yuborish
    this.replicas.forEach(async (replica) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // kechikish
      replica.store.set(key, value);
    });

    return "Asinxron yozish qabul qilindi (fonda replikatsiya ketmoqda)";
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Replikatsiya mexanizmlari (Mechanics)
1. **Synchronous Replication (Sinxron):** Leader foydalanuvchidan yozish so'rovini olgach, uni barcha replikalarga yuboradi va ularning barchasidan "muvaffaqiyatli yozildi" degan tasdiq (ACK) kelmaguncha foydalanuvchiga javob qaytarmaydi.
   * *Afzalligi:* Ma'lumot yo'qolmaydi (Zero Data Loss), kuchli moslik (Strong Consistency).
   * *Kamchiligi:* Bitta replika sekin ishlasa yoki tarmoqdan uzilsa, butun yozish jarayoni to'xtab qoladi (High Latency & Low Availability).
2. **Asynchronous Replication (Asinxron):** Leader yozish so'rovini o'ziga yozadi va mijozga darhol "OK" javobini qaytaradi. Ma'lumotlar replikalarga fonda (background queue) yuboriladi.
   * *Afzalligi:* Yuqori tezlik (Low Write Latency).
   * *Kamchiligi:* Agar Leader ma'lumot replikalarga yetib bormasdan oldin o'chib qolsa (crash), yozilgan ma'lumotlar butunlay yo'qoladi.
3. **Semi-synchronous Replication (Yarim-sinxron):** Leader kamida bitta (yoki ma'lum bir miqdordagi) replikadan tasdiq olgach mijozga javob qaytaradi, qolganlariga esa asinxron replikatsiya qilinadi.

### Replikatsiya Topologiyalari
* **Single-Leader (Active-Passive):** Barcha yozishlar (write) faqat bitta Leader tugunga yuboriladi. Read so'rovlari esa yuklamani kamaytirish uchun replikalarga yo'naltirilishi mumkin.
* **Multi-Leader (Active-Active):** Bir nechta Leader tugunlar yozishlarni parallel qabul qiladi. Ular o'rtasida ma'lumotlarni sinxronlash va konfliktlarni (Conflict Resolution) hal qilish kerak bo'ladi.
* **Leaderless (Dynamo-style):** Aniq bir Leader yo'q. Har qanday yozish yoki o'qish so'rovi klasterdagi bir nechta tugunga parallel yuboriladi. Bu yerda **Quorum** tushunchasi ishlatiladi:
  $$R + W > N$$
  Bu yerda $N$ - replikalar soni, $W$ - muvaffaqiyatli yozilishi kerak bo'lgan tugunlar soni, $R$ - o'qilishi kerak bo'lgan tugunlar soni. Agar ushbu tengsizlik bajarilsa, o'qish paytida kamida bitta eng oxirgi yozilgan qiymatni o'qish kafolatlanadi.

### Replication Lag Guarantees (Kafolatlar)
Asinxron replikatsiyada replikalar ma'lum muddat sekinroq yangilanishi mumkin (Replication Lag). Bu quyidagi muammolarga olib keladi:
1. **Read-after-write Consistency:** Foydalanuvchi ma'lumotni o'zgartirgandan keyin sahifani yangilasa, o'zgarishini ko'ra olishi shart. Buni hal qilish uchun foydalanuvchining o'z profili kabi ma'lumotlarini har doim Leader-dan o'qish talab qilinishi mumkin.
2. **Monotonic Reads:** Agar foydalanuvchi bir necha marta sahifani yangilasa, vaqt orqaga ketib qolgandek tuyulmasligi kerak (ya'ni yangilangan ma'lumotni ko'rib, keyin yana eski ma'lumotga ega replica-dan ma'lumot o'qib qolmasligi lozim). Bunga mijozni har doim bitta replica-ga yo'naltirish (masalan, sessiya ID-ga qarab hashlash) orqali erishiladi.
3. **Consistent Prefix Reads:** Agar ma'lumotlar ma'lum bir ketma-ketlikda yozilsa (masalan, Savol va Javob), ular o'quvchiga ham o'sha tartibda ko'rinishi kerak.

### Failover va Split-brain xavfi
Agar Leader ishdan chiqsa, replikalardan biri yangi Leader etib saylanishi kerak (Failover). Agar tarmoq bo'linib qolsa (Network Partition) va ikki qism ham o'zini Leader deb hisoblasa, bu **Split-brain** muammosini keltirib chiqaradi.

---

## 4. ❌ Keng tarqalgan xatolar (Junior Mistakes)

1. **Replication Lag-ni hisobga olmaslik:** Asinxron replikada yozib bo'lingach, darhol replikadan o'qishga harakat qilish va ma'lumot topilmaganda dasturni xato berishi.
2. **Split-Brain e'tiborsiz qoldirilishi:** Ikkita Leader parallel ravishda bir xil primary key bilan yozishlarni qabul qilib, ma'lumotlar butunlay chalkashib ketishi.
3. **Quorum formulasini noto'g'ri hisoblash:** Leaderless tizimlarda $R + W \\le N$ qilib qo'yilsa, eskirgan ma'lumotlar o'qilishini (stale reads) hisobga olmaslik.

---

## 5. 🏢 Real tizimlarda qo'llanilishi

* **PostgreSQL Streaming Replication:** Tranzaksiyalar jurnali (Write-Ahead Log - WAL) yordamida sinxron yoki asinxron replikatsiyani amalga oshiradi.
* **Galera Cluster (MySQL):** Multi-leader synchronous replication taqdim qiladi.
* **Apache Cassandra va DynamoDB:** Leaderless arxitekturaga ega bo'lib, sozlanuvchan quorum (Tunable Quorum) va Merkle Tree yordamida Anti-Entropy sinxronizatsiyasidan foydalanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyida exercises bo'limida bajaring.

---

## 7. 📝 12 ta Mini Test

Bilimingizni testlar yordamida tekshiring.

---

## 8. 🎯 Real Project Case Study: GitHub-ning MySQL replikatsiya lag boshqaruvi

GitHub juda katta miqdorda o'qish yuklamasiga ega. Ular asinxron MySQL replikalaridan foydalanishadi. Agar replikatsiya lagi (lag) 1 soniyadan oshib ketsa, GitHub tizimi foydalanuvchilar uchun yozish-o'qish yo'llarini dinamik o'zgartiradi va ma'lumotlarni faqat Leader-dan o'qishga majburlaydi. Bu orqali foydalanuvchilarga eskirgan ma'lumot ko'rsatilishining oldi olinadi.

---

## 9. 🧠 Vizual Grafik / Mermaid diagramma

### Sinxron vs Asinxron replikatsiya vaqti
\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Leader
    participant Replica

    Note over Client, Replica: Sinxron Replikatsiya (Kechikish yuqori)
    Client->>Leader: Write(X)
    Leader->>Replica: Replicate(X)
    Replica-->>Leader: ACK(X)
    Leader-->>Client: Success OK

    Note over Client, Replica: Asinxron Replikatsiya (Tezkor javob)
    Client->>Leader: Write(Y)
    Leader-->>Client: Success OK
    Leader->>Replica: Replicate(Y) (Background)
    Replica-->>Leader: ACK(Y)
\`\`\`

### Leaderless Quorum Read/Write
\`\`\`mermaid
graph TD
    Client[Client] -->|1. Write W=2| NodeA(Node A)
    Client -->|1. Write W=2| NodeB(Node B)
    Client -.->|Fails to write| NodeC(Node C)
    
    style NodeA fill:#9f9,stroke:#333,stroke-width:2px
    style NodeB fill:#9f9,stroke:#333,stroke-width:2px
    style NodeC fill:#f99,stroke:#333,stroke-width:2px
\`\`\`

---

## 10. 📌 Cheat Sheet

| Atama | Ta'rifi | Asosiy xususiyati |
| :--- | :--- | :--- |
| **Sinxron Replikatsiya** | Barcha replica yozilishini kutadi | Xavfsiz, lekin sekin |
| **Asinxron Replikatsiya** | Yozish Leader-ga tushgach ACK qaytariladi | Juda tez, lekin data loss xavfi bor |
| **Read-after-write** | Yozgan ma'lumotini darhol o'qiy olish kafolati | O'qishni Leader-dan yoki cache orqali qilish |
| **Monotonic Reads** | Vaqt bo'yicha orqaga qaytmaslik kafolati | Foydalanuvchini faqat bitta replica-dan o'qitish |
| **Quorum Formula** | $R + W > N$ | Stale read bo'lmasligini kafolatlash formulasi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sinxron Replika Validatori (Synchronous Replica Validation)",
    "instruction": "Sinxron replikatsiyada yozish muvaffaqiyatli bo'lishi uchun barcha replikalar o'z vaqtida javob berishi kerak. `validateSyncReplicas(replicas, timeoutMs)` funksiyasini yozing. Har bir replika obyekti asinxron `write(data)` metodiga ega bo'lib, u Promise qaytaradi. Agar belgilangan `timeoutMs` vaqt ichida replika yozishni tugatmasa, u rad etilgan deb hisoblanadi. Agar kamida bitta replika rad etilsa (xato bersa yoki timeout bo'lsa), funksiya `'FAIL'` qaytarsin, aks holda barcha replikalar muvaffaqiyatli tugatsa `'SUCCESS'` qaytarsin. `Promise.race` yordamida timeout-ni amalga oshiring.",
    "startingCode": "async function validateSyncReplicas(replicas, timeoutMs) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Har bir replica yozish so'rovini timeout promise bilan poygaga (Promise.race) qo'ying. Agar birortasi yutqazsa yoki error bersa, u xato sifatida qaytadi.",
    "test": "if (typeof validateSyncReplicas !== 'function') return 'validateSyncReplicas funksiya emas';\nconst replica1 = { write: () => new Promise(res => setTimeout(res, 10)) };\nconst replica2 = { write: () => new Promise(res => setTimeout(res, 100)) };\nreturn validateSyncReplicas([replica1], 50).then(res1 => {\n  if (res1 !== 'SUCCESS') return '10ms replica 50ms ichida muvaffaqiyatli bo\\'lishi kerak edi';\n  return validateSyncReplicas([replica1, replica2], 30).then(res2 => {\n    if (res2 !== 'FAIL') return '100ms replica 30ms timeoutda FAIL bo\\'lishi kerak edi';\n    return null;\n  });\n});"
  },
  {
    "id": 2,
    "title": "Asinxron Replikatsiya Navbati (Async Replication Queue)",
    "instruction": "Asinxron replikatsiyada yozishlar Leader-ga bajarilib, replica-larga navbat (queue) orqali yuboriladi. `AsyncReplicationQueue` klassini yarating. Unda `enqueue(writeTx)` metodi bo'lsin. Navbat ketma-ket (sequentially) bitta-bitta qayta ishlanishi (process) lozim, ya'ni birinchi yozish replikaga yuborilib javobi olingamuncha ikkinchisi boshlanmasligi kerak. Buning uchun asinxron `processNext(replica)` metodini yozing. U navbatdagi elementlarni tugagunigacha replikaning `applyTx(tx)` metodiga yuborib qayta ishlaydi. Agar `applyTx` xato bersa, navbat to'xtab qolmasdan o'sha element tashlab yuborilib, keyingisi davom etsin.",
    "startingCode": "class AsyncReplicationQueue {\n  constructor() {\n    this.queue = [];\n    this.processing = false;\n  }\n\n  enqueue(writeTx) {\n    // Kodni shu yerda yozing\n  }\n\n  async processNext(replica) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "processing flag-dan foydalanib, processNext faqat bitta parallel oqimda ishlashini ta'minlang. while (this.queue.length > 0) siklidan foydalanib, elementlarni shift qilib oling.",
    "test": "if (typeof AsyncReplicationQueue !== 'function') return 'AsyncReplicationQueue klass bo\\'lishi kerak';\nconst q = new AsyncReplicationQueue();\nq.enqueue('tx1');\nq.enqueue('tx2');\nconst processed = [];\nconst replica = {\n  applyTx: async (tx) => { \n    processed.push(tx);\n    if (tx === 'tx1') throw new Error('fail');\n  }\n};\nreturn q.processNext(replica).then(() => {\n  if (processed.length !== 2 || processed[0] !== 'tx1' || processed[1] !== 'tx2') return 'Navbat to\\'g\\'ri qayta ishlanmadi yoki xato sababli to\\'xtab qoldi';\n  return null;\n});"
  },
  {
    "id": 3,
    "title": "Yarim-Sinxron Yo'naltiruvchi (Semi-Synchronous Router)",
    "instruction": "Yarim-sinxron yozishda Leader ma'lumotni o'zida saqlaydi va bir nechta replikaga yuboradi. Agar kamida `requiredAcks` miqdordagi replikalardan muvaffaqiyatli tasdiq kelsa, yozish muvaffaqiyatli (`true`) deb hisoblanadi. Qolgan replikalardagi replikatsiya esa fonda davom etaveradi. `routeSemiSyncWrite(leader, replicas, writeTx, requiredAcks)` funksiyasini yozing. Replikalar `replicate(tx)` asinxron metodini chaqiradi va u true/false qaytaradi. Leader-ga `leader.write(tx)` sinxron tarzda darhol yoziladi. Funksiya replikalarning parallel bajarilishini kutishi va kerakli ack-lar yetishi bilanoq darhol `true` yoki `false` qaytarishi kerak. (Acks yetmasa false qaytadi).",
    "startingCode": "async function routeSemiSyncWrite(leader, replicas, writeTx, requiredAcks) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Leader-ga yozgandan so'ng, barcha replikalarning replicate metodini chaqiring. Ular parallel ishga tushishi uchun Promise-larni kuzating. requiredAcks yetarli bo'lsa darhol true qaytarish uchun yordamchi hisoblagich va hal qiluvchi (resolver) mantiqdan foydalanish mumkin.",
    "test": "if (typeof routeSemiSyncWrite !== 'function') return 'routeSemiSyncWrite funksiya bo\\'lishi kerak';\nconst leader = { write: () => {} };\nconst reps = [\n  { replicate: async () => true },\n  { replicate: async () => new Promise(r => setTimeout(() => r(true), 10)) },\n  { replicate: async () => false }\n];\nreturn routeSemiSyncWrite(leader, reps, 'tx', 2).then(res => {\n  if (res !== true) return '2 ta muvaffaqiyatli javob borligida true bo\\'lishi kerak edi';\n  return routeSemiSyncWrite(leader, reps, 'tx', 3).then(res2 => {\n    if (res2 !== false) return '3 ta ack olinmaganda false bo\\'lishi kerak edi';\n    return null;\n  });\n});"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Synchronous replication (Sinxron replikatsiya) ning asosiy kamchiligi nima?",
    "options": [
      "Ma'lumotlar yo'qolish xavfi juda yuqori bo'ladi",
      "Yozish tezligi (latency) eng sekin replika tezligiga bog'liq bo'lib qoladi",
      "O'qish so'rovlari faqat bitta serverda bajariladi",
      "Faqat relational bo'lmagan (NoSQL) ma'lumotlar bazalarida ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Sinxron replikatsiyada Leader barcha replikalardan tasdiq (ACK) kelishini kutadi. Shu sababli sekin replica butun yozish jarayonini sekinlashtiradi."
  },
  {
    "id": 2,
    "question": "Asynchronous replication (Asinxron replikatsiya) da yozish qanday yakunlanadi?",
    "options": [
      "Barcha replikalar o'z xotirasiga yozib bo'lgandan so'ng",
      "Leader ma'lumotni o'ziga yozgan zahoti mijozga muvaffaqiyat xabarini qaytaradi",
      "Kamida bitta replika yozgandan so'ng",
      "Klasterdagi barcha tugunlar parallel o'qilgandan keyin"
    ],
    "correctAnswer": 1,
    "explanation": "Asinxron replikatsiyada Leader yozishni o'zida amalga oshirib mijozga tezda javob beradi. Replikatsiya esa fonda davom etadi."
  },
  {
    "id": 3,
    "question": "Semi-synchronous replication (Yarim-sinxron replikatsiya) deganda nima tushuniladi?",
    "options": [
      "Yozish faqat kunning birinchi yarmida sinxron, ikkinchi yarmida asinxron bo'ladi",
      "Faqat indekslar sinxron, ma'lumotlar asinxron ko'chiriladi",
      "Leader kamida belgilangan miqdordagi (masalan, 1 ta) replikadan tasdiq kutadi, qolganlariga esa asinxron replikatsiya qiladi",
      "Ma'lumotlar faqat matnli fayllar ko'rinishida replikatsiya qilinadi"
    ],
    "correctAnswer": 2,
    "explanation": "Yarim-sinxron uslub tezlik va ma'lumot xavfsizligi o'rtasidagi kelishuvdir: eng kamida bitta replikaga yozilgani kafolatlanadi."
  },
  {
    "id": 4,
    "question": "Split-brain muammosi nima?",
    "options": [
      "Server CPU xotirasi ikki qismga bo'linishi",
      "Tarmoq bo'linishi (network partition) natijasida ikkita tugun o'zini Leader deb hisoblab parallel yozishlarni qabul qilishi",
      "Dastur kodining sinxron va asinxron qismlarga ajralishi",
      "Replika va Leader ma'lumotlar bazasi jadvallarining har xil nomlanishi"
    ],
    "correctAnswer": 1,
    "explanation": "Tarmoq uzilishi sababli tugunlar bir-birini ko'rmay qolganda, ikkala guruh ham o'z liderini saylasa, split-brain yuzaga keladi va ma'lumotlar ziddiyatli holatga keladi."
  },
  {
    "id": 5,
    "question": "Read-after-write consistency (Yozgandan keyin o'qish mosligi) kafolati nima beradi?",
    "options": [
      "Foydalanuvchi yozgan ma'lumotlarini darhol o'zi o'qiganida yangilangan holatda ko'rishini kafolatlaydi",
      "Faqat o'qish amallari bajarilishini ta'minlaydi",
      "Yozishdan oldin o'qishni majburlaydi",
      "Barcha foydalanuvchilar bir vaqtning o'zida yozishlarini talab qiladi"
    ],
    "correctAnswer": 0,
    "explanation": "Bu kafolat foydalanuvchi o'zgartirgan ma'lumotni darhol yangilangan holatda ko'rishini ta'minlaydi. Odatda bunga foydalanuvchining o'z profilini faqat Leader-dan o'qitish orqali erishiladi."
  },
  {
    "id": 6,
    "question": "Monotonic Reads kafolati nimani oldini oladi?",
    "options": [
      "Ma'lumotlar bazasi hajmining cheksiz o'sishini",
      "Foydalanuvchi sahifani bir necha marta yangilaganda, vaqt bo'yicha orqaga qaytgan (ya'ni yangi ma'lumotdan so'ng eski replikadagi eskirgan ma'lumotni ko'rish) holatini",
      "Barcha tranzaksiyalarning bekor qilinishini",
      "Parallel yozishlar kelishini"
    ],
    "correctAnswer": 1,
    "explanation": "Monotonic Reads foydalanuvchining o'qish so'rovlari vaqt bo'yicha doimiy ravishda faqat oldinga siljishini yoki bir xil bo'lishini ta'minlaydi, ya'ni eskirgan replikaga ulanib qolishini oldini oladi."
  },
  {
    "id": 7,
    "question": "Leaderless (Dynamo-style) tizimda N=3 (replikalar soni), W=2 (yozish quorumi) bo'lsa, Strong Consistency-ni ta'minlash uchun R (o'qish quorumi) kamida nechaga teng bo'lishi kerak?",
    "options": [
      "R = 1",
      "R = 2",
      "R = 3",
      "R = 0"
    ],
    "correctAnswer": 1,
    "explanation": "Strong Consistency formulasi: R + W > N. Demak, R + 2 > 3 bo'lishi uchun R kamida 2 ga teng bo'lishi kerak."
  },
  {
    "id": 8,
    "question": "Last-Write-Wins (LWW) ziddiyatlarni hal qilish usulining asosiy kamchiligi nima?",
    "options": [
      "U faqat kichik hajmdagi ma'lumotlarda ishlaydi",
      "Taqsimlangan tizimlarda soatlar nomuvofiqligi (clock skew) tufayli ba'zi kechroq yozilgan haqiqiy ma'lumotlar o'chib ketishi mumkin",
      "U juda ko'p xotira talab qiladi",
      "Leader replikatsiyani butunlay to'xtatib qo'yadi"
    ],
    "correctAnswer": 1,
    "explanation": "LWW jismoniy vaqtga tayanadi. Taqsimlangan tizimlarda server soatlari hech qachon 100% bir xil bo'lmagani uchun, millisoniyalar farqi muhim yozishlarni yo'qotishi mumkin."
  },
  {
    "id": 9,
    "question": "Read Repair (O'qish paytidagi tuzatish) jarayoni qanday ishlaydi?",
    "options": [
      "Admin qo'lda xatoliklarni tuzatadi",
      "O'qish paytida eskirgan qiymat aniqlansa, client yoki coordinator fonda o'sha replikaga yangi qiymatni yozib qo'yadi",
      "Tizim barcha replikalarni o'chirib boshqatdan yuklaydi",
      "Faqat index fayllarini qayta yaratadi"
    ],
    "correctAnswer": 1,
    "explanation": "Read Repair leaderless tizimlarda o'qish paytida eskirgan replikani aniqlab, unga avtomatik tarzda eng so'nggi ma'lumotni push qilish orqali anti-entropy vazifasini bajaradi."
  },
  {
    "id": 10,
    "question": "Merkle Tree (Merkle Daraxti) replikatsiyada nima uchun ishlatiladi?",
    "options": [
      "Faqat parollarni shifrlash uchun",
      "Tugunlar orasidagi ma'lumotlarni solishtirishda butun bazani yubormasdan, faqat farqlangan diapazonlarni tezkor aniqlash (Anti-Entropy) uchun",
      "Fayllarni siqish (compress) uchun",
      "Barcha tranzaksiyalarni o'chirib yuborish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Merkle Tree - bu hash daraxti bo'lib, u ikki tugundagi ma'lumotlar mosligini minimal tarmoq trafigi orqali solishtirishga imkon beradi."
  },
  {
    "id": 11,
    "question": "Log Sequence Number (LSN) ning vazifasi nima?",
    "options": [
      "Replika serverlarining IP manzillarini saqlash",
      "Tranzaksiyalar jurnalidagi har bir yozuvning tartib raqami bo'lib, replika leader-dan qanchalik orqadaligini aniqlash imkonini beradi",
      "Klasterdagi serverlar sonini hisoblash",
      "Ma'lumotlar bazasi parolini saqlash"
    ],
    "correctAnswer": 1,
    "explanation": "LSN replika loglarining qay darajada yangilanganini va replikatsiya lagi (lag) hajmini o'lchash uchun mantiqiy ko'rsatkichdir."
  },
  {
    "id": 12,
    "question": "Consistent Prefix Reads kafolati nimani kafolatlaydi?",
    "options": [
      "Ma'lumotlarning faqat bosh harflari replikatsiya qilinishini",
      "Agar ma'lumotlar ma'lum bir ketma-ketlikda yozilgan bo'lsa, boshqa o'quvchi ham ularni aynan o'sha ketma-ketlikda o'qishini",
      "Barcha replikalar faqat bitta tranzaksiyani bajarishini",
      "Hech qanday ma'lumot o'zgartirilmasligini"
    ],
    "correctAnswer": 1,
    "explanation": "Consistent Prefix Reads mantiqiy sabab-oqibat (causal relation) zanjirini saqlab qoladi. Masalan, savoldan keyin javob kelishi zanjiri replikalarda buzilib qolmasligini ta'minlaydi."
  }
]

};
