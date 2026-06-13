export const dbReplication = {
  id: "dbReplication",
  title: "Database Replication (Ma'lumotlar bazasi replikatsiyasi)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tasavvur qiling, siz katta bir kutubxona mudirisiz. Kutubxonangizda juda noyob va mashhur ma'lumotnoma kitobi bor. Har kuni yuzlab odamlar kelib ushbu kitobni o'qishni xohlashadi. 

Agar kitob bitta bo'lsa:
1. Odamlar navbatda turib qolishadi (Kechikish/Latency).
2. Agar o'sha yagona kitob ustiga tasodifan suv to'kilib yaroqsiz bo'lib qolsa, kutubxona ishdan to'xtaydi (Single Point of Failure).

Ushbu muammoni hal qilish uchun siz kitobdan yana 3 ta nusxa tayyorlaysiz va ularni turli xonalarga qo'yasiz. Endi odamlar nusxalarni parallel o'qiy olishadi. 

**Database Replication (Ma'lumotlar bazasi replikatsiyasi)** — bu ma'lumotlarni bir nechta serverlarda (tugunlarda) bir xil holatda saqlash jarayonidir. U tizimning tezligini (Read throughput) oshiradi va bitta server o'chib qolsa ham tizim ishlashini davom ettirishini kafolatlaydi (High Availability).

---

## 2. 💻 Real Kod Misoli (Replikatsiya Sinxronizatsiyasi)

Quyida Sodda Leader-Replica (Active-Passive) replikatsiya modeli keltirilgan:

\\\`\\\`\\\`javascript
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

  // Sinxron replikatsiya: balla replikalar tasdiqlamaguncha foydalanuvchiga muvaffaqiyat xabari berilmaydi
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
\\\`\\\`\\\`

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
3. **Quorum formulasini noto'g'ri hisoblash:** Leaderless tizimlarda $R + W \\le N$ qibly qo'yilsa, eskirgan ma'lumotlar o'qilishini (stale reads) hisobga olmaslik.

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
\\\`\\\`\\\`mermaid
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
\\\`\\\`\\\`

### Leaderless Quorum Read/Write
\\\`\\\`\\\`mermaid
graph TD
    Client[Client] -->|1. Write W=2| NodeA(Node A)
    Client -->|1. Write W=2| NodeB(Node B)
    Client -.->|Fails to write| NodeC(Node C)
    
    style NodeA fill:#9f9,stroke:#333,stroke-width:2px
    style NodeB fill:#9f9,stroke:#333,stroke-width:2px
    style NodeC fill:#f99,stroke:#333,stroke-width:2px
\\\`\\\`\\\`

---

## 10. 📌 Cheat Sheet

| Atama | Ta'rifi | Asosiy xususiyati |
| :--- | :--- | :--- |
| **Sinxron Replikatsiya** | Barcha replica yozilishini kutadi | Xavfsiz, lekin sekin |
| **Asinxron Replikatsiya** | Yozish Leader-ga tushgach ACK qaytariyaldi | Juda tez, lekin data loss xavfi bor |
| **Read-after-write** | Yozgan ma'lumotini darhol o'qiy olish kafolati | O'qishni Leader-dan yoki cache orqali qilish |
| **Monotonic Reads** | Vaqt bo'yicha orqaga qaytmaslik kafolati | Foydalanuvchini faqat bitta replica-dan o'qitish |
| **Quorum Formula** | $R + W > N$ | Stale read bo'lmasligini kafolatlash formulasi |
`,
  exercises: [
    {
      id: 1,
      title: "Sinxron Replika Validatori (Synchronous Replica Validation)",
      instruction: "Sinxron replikatsiyada yozish muvaffaqiyatli bo'lishi uchun barcha replikalar o'z vaqtida javob berishi kerak. `validateSyncReplicas(replicas, timeoutMs)` funksiyasini yozing. Har bir replika obyekti asinxron `write(data)` metodiga ega bo'lib, u Promise qaytaradi. Agar belgilangan `timeoutMs` vaqt ichida replika yozishni tugatmasa, u rad etilgan deb hisoblanadi. Agar kamida bitta replika rad etilsa (xato bersa yoki timeout bo'lsa), funksiya `'FAIL'` qaytarsin, aks holda barcha replikalar muvaffaqiyatli tugatsa `'SUCCESS'` qaytarsin. `Promise.race` yordamida timeout-ni amalga oshiring.",
      startingCode: "async function validateSyncReplicas(replicas, timeoutMs) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir replica yozish so'rovini timeout promise bilan poygaga (Promise.race) qo'ying. Agar birortasi yutqazsa yoki error bersa, u xato sifatida qaytadi.",
      test: "if (typeof validateSyncReplicas !== 'function') return 'validateSyncReplicas funksiya emas';\nconst replica1 = { write: () => new Promise(res => setTimeout(res, 10)) };\nconst replica2 = { write: () => new Promise(res => setTimeout(res, 100)) };\nreturn validateSyncReplicas([replica1], 50).then(res1 => {\n  if (res1 !== 'SUCCESS') return '10ms replica 50ms ichida muvaffaqiyatli bo\\'lishi kerak edi';\n  return validateSyncReplicas([replica1, replica2], 30).then(res2 => {\n    if (res2 !== 'FAIL') return '100ms replica 30ms timeoutda FAIL bo\\'lishi kerak edi';\n    return null;\n  });\n});"
    },
    {
      id: 2,
      title: "Asinxron Replikatsiya Navbati (Async Replication Queue)",
      instruction: "Asinxron replikatsiyada yozishlar Leader-ga bajarilib, replica-larga navbat (queue) orqali yuboriladi. `AsyncReplicationQueue` klassini yarating. Unda `enqueue(writeTx)` metodi bo'lsin. Navbat ketma-ket (sequentially) bitta-bitta qayta ishlanishi (process) lozim, ya'ni birinchi yozish replikaga yuborilib javobi olimaguncha ikkinchisi boshlanmasligi kerak. Buning uchun asinxron `processNext(replica)` metodini yozing. U navbatdagi elementlarni tugagunigacha replikaning `applyTx(tx)` metodiga yuborib qayta ishlaydi. Agar `applyTx` xato bersa, navbat to'xtab qolmasdan o'sha element tashlab yuborilib, keyingisi davom etsin.",
      startingCode: "class AsyncReplicationQueue {\n  constructor() {\n    this.queue = [];\n    this.processing = false;\n  }\n\n  enqueue(writeTx) {\n    // Kodni shu yerda yozing\n  }\n\n  async processNext(replica) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "processing flag-dan foydalanib, processNext faqat bitta parallel oqimda ishlashini ta'minlang. while (this.queue.length > 0) siklidan foydalanib, elementlarni shift qilib oling.",
      test: "if (typeof AsyncReplicationQueue !== 'function') return 'AsyncReplicationQueue klass bo\\'lishi kerak';\nconst q = new AsyncReplicationQueue();\nq.enqueue('tx1');\nq.enqueue('tx2');\nconst processed = [];\nconst replica = {\n  applyTx: async (tx) => { \n    processed.push(tx);\n    if (tx === 'tx1') throw new Error('fail');\n  }\n};\nreturn q.processNext(replica).then(() => {\n  if (processed.length !== 2 || processed[0] !== 'tx1' || processed[1] !== 'tx2') return 'Navbat to\\'g\\'ri qayta ishlanmadi yoki xato sababli to\\'xtab qoldi';\n  return null;\n});"
    },
    {
      id: 3,
      title: "Yarim-Sinxron Yo'naltiruvchi (Semi-Synchronous Router)",
      instruction: "Yarim-sinxron yozishda Leader ma'lumotni o'zida saqlaydi va bir nechta replikaga yuboradi. Agar kamida `requiredAcks` miqdordagi replikalardan muvaffaqiyatli tasdiq kelsa, yozish muvaffaqiyatli (`true`) deb hisoblanadi. Qolgan replikalardagi replikatsiya esa fonda davom etaveradi. `routeSemiSyncWrite(leader, replicas, writeTx, requiredAcks)` funksiyasini yozing. Replikalar `replicate(tx)` asinxron metodini chaqiradi va u true/false qaytaradi. Leader-ga `leader.write(tx)` sinxron tarzda darhol yoziladi. Funksiya replikalarning parallel bajarilishini kutishi va kerakli ack-lar yetishi bilanoq darhol `true` yoki `false` qaytarishi kerak. (Acks yetmasa false qaytadi).",
      startingCode: "async function routeSemiSyncWrite(leader, replicas, writeTx, requiredAcks) {\n  // Kodni shu yerda yozing\n}",
      hint: "Leader-ga yozgandan so'ng, barcha replikalarning replicate metodini chaqiring. Ular parallel ishga tushishi uchun Promise-larni kuzating. requiredAcks yetarli bo'lsa darhol true qaytarish uchun yordamchi hisoblagich va hal qiluvchi (resolver) mantiqdan foydalanish mumkin.",
      test: "if (typeof routeSemiSyncWrite !== 'function') return 'routeSemiSyncWrite funksiya bo\\'lishi kerak';\nconst leader = { write: () => {} };\nconst reps = [\n  { replicate: async () => true },\n  { replicate: async () => new Promise(r => setTimeout(() => r(true), 10)) },\n  { replicate: async () => false }\n];\nreturn routeSemiSyncWrite(leader, reps, 'tx', 2).then(res => {\n  if (res !== true) return '2 ta muvaffaqiyatli javob borligida true bo\\'lishi kerak edi';\n  return routeSemiSyncWrite(leader, reps, 'tx', 3).then(res2 => {\n    if (res2 !== false) return '3 ta ack olinmaganda false bo\\'lishi kerak edi';\n    return null;\n  });\n});"
    },
    {
      id: 4,
      title: "Read-After-Write Kafolati (Local Lease Fallback)",
      instruction: "Foydalanuvchi ma'lumot yozgandan keyin `leaseDurationMs` millisoniya davomida o'qish so'rovlari faqat Leader-ga yoki eng oxirgi yozilgan mahalliy holatga yo'naltirilishi kerak. Shundan so'ng u xohlagan replica-dan o'qishi mumkin. `ReplicationClient` klassini yozing. U constructor-da `leader`, `replicas` (massiv) va `leaseDurationMs` ni qabul qiladi. `write(key, val)` metodi leader-ga yozadi va oxirgi yozish vaqtini (timestamp) eslab qoladi. `read(key)` metodi agar oxirgi yozishdan boshlab `leaseDurationMs` vaqt o'tmagan bo'lsa `leader.read(key)`-ni chaqiradi, aks holda replikalardan tasodifiy birini tanlab `replica.read(key)`-ni chaqiradi.",
      startingCode: "class ReplicationClient {\n  constructor(leader, replicas, leaseDurationMs) {\n    this.leader = leader;\n    this.replicas = replicas;\n    this.leaseDurationMs = leaseDurationMs;\n    this.lastWriteTime = 0;\n  }\n\n  write(key, val) {\n    // Kodni shu yerda yozing\n  }\n\n  read(key) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "write ichida leader.write(key, val) chaqiring va Date.now() yordamida timestamp saqlang. read ichida esa Date.now() - lastWriteTime < leaseDurationMs shartini tekshiring.",
      test: "if (typeof ReplicationClient !== 'function') return 'ReplicationClient klass emas';\nconst leader = { write: (k, v) => leader[k] = v, read: (k) => leader[k] };\nconst replica = { read: (k) => 'replica_' + k };\nconst client = new ReplicationClient(leader, [replica], 50);\nclient.write('x', 'value1');\nif (client.read('x') !== 'value1') return 'Lease muddati tugamasdan replikadan o\\'qildi yoki xato qiymat o\\'qildi';\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (client.read('x') !== 'replica_x') resolve('Lease muddati tugagandan keyin replica-dan o\\'qilmadi');\n    else resolve(null);\n  }, 60);\n});"
    },
    {
      id: 5,
      title: "Monotonik O'qish Validatori (Monotonic Read Validator)",
      instruction: "Monotonik o'qish (Monotonic Reads) foydalanuvchi ma'lumotlarni o'qiganda vaqt orqaga qaytmasligini (ya'ni eskirgan replikani o'qib qolmasligini) kafolatlaydi. `validateMonotonicRead(clientLastSeenTxId, replicaTxLogs)` funksiyasini yozing. `replicaTxLogs` - bu replikada mavjud bo'lgan tranzaksiyalar ID lari massivi (tartiblangan, masalan: `['tx1', 'tx2', 'tx3']`). `clientLastSeenTxId` - mijoz oxirgi ko'rgan tranzaksiya IDsi. Agar replika logida `clientLastSeenTxId` mavjud bo'lsa (yoki mijoz hali hech narsa ko'rmagan bo'lsa, ya'ni `null` bo'lsa) funksiya `true` qaytarsin. Aks holda, replika orqada qolgan deb hisoblanib, funksiya `false` qaytarsin.",
      startingCode: "function validateMonotonicRead(clientLastSeenTxId, replicaTxLogs) {\n  // Kodni shu yerda yozing\n}",
      hint: "Agar clientLastSeenTxId null bo'lsa, har qanday replika mos keladi. Aks holda replicaTxLogs ichida clientLastSeenTxId bor-yo'qligini tekshiring.",
      test: "if (typeof validateMonotonicRead !== 'function') return 'validateMonotonicRead funksiya emas';\nif (validateMonotonicRead('tx2', ['tx1', 'tx2']) !== true) return 'Replika logida mijoz ko\\'rgan tx2 bor bo\\'lsa true bo\\'lishi kerak';\nif (validateMonotonicRead('tx3', ['tx1', 'tx2']) !== false) return 'Replika logida tx3 bo\\'lmasa false bo\\'lishi kerak';\nif (validateMonotonicRead(null, ['tx1']) !== true) return 'Mijoz logi null bo\\'lganda true bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "LWW Konflikt Hali (Last-Write-Wins Resolver)",
      instruction: "Multi-leader tizimlarda bir xil kalitga turli tugunlarda parallel yozishlar kelishi mumkin. Konfliktlarni hal qilish uchun Last-Write-Wins (LWW) algoritmi qo'llaniladi. `resolveLWWConflict(writeA, writeB)` funksiyasini yozing. Har bir yozish obyekti format: `{ val: string, timestamp: number, nodeId: string }`. Funksiya timestamp qiymati kattaroq bo'lgan yozishni g'olib deb topsin va uni qaytarsin. Agar timestamp-lar teng bo'lsa, `nodeId` qiymati alifbo tartibida kattaroq bo'lganini (leksikografik solishtirish) g'olib deb tanlang.",
      startingCode: "function resolveLWWConflict(writeA, writeB) {\n  // Kodni shu yerda yozing\n}",
      hint: "Avval timestamp-larni solishtiring. Agar ular teng bo'lsa, writeA.nodeId > writeB.nodeId shartini tekshiring.",
      test: "if (typeof resolveLWWConflict !== 'function') return 'resolveLWWConflict funksiya emas';\nconst wA = { val: 'A', timestamp: 1000, nodeId: 'node1' };\nconst wB = { val: 'B', timestamp: 1001, nodeId: 'node2' };\nif (resolveLWWConflict(wA, wB) !== wB) return 'Kattaroq timestamp g\\'olib bo\\'lishi kerak';\nconst wC = { val: 'C', timestamp: 1000, nodeId: 'node_a' };\nconst wD = { val: 'D', timestamp: 1000, nodeId: 'node_b' };\nif (resolveLWWConflict(wC, wD) !== wD) return 'Timestamp tengligida nodeId bo\\'yicha kattasi g\\'olib bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Leaderless Quorum Tekshiruvi (Quorum Read Resolver)",
      instruction: "Leaderless tizimda o'qish paytida $R$ ta replikadan javob olinadi. O'qilgan qiymatlar ichida eng oxirgi yozilganini aniqlash va qolgan eskirgan replikalarni yangilash (Read Repair) kerak. `checkLeaderlessQuorum(readResults, rQuorum, lwwResolver)` funksiyasini yozing. `readResults` - bu har bir replikadan olingan natijalar massivi, har bir element `{ replicaId: string, data: { val, timestamp, nodeId } }` formatida. Agar o'qilgan javoblar soni `rQuorum` dan kam bo'lsa, funksiya `'INSUFFICIENT_QUORUM'` matnini qaytarsin. Agar yetarli bo'lsa, `lwwResolver` yordamida eng yangi ma'lumotni aniqlang va u bilan farqlanuvchi (eskirgan qiymatga ega bo'lgan yoki ma'lumoti yo'q) replikalarning ID larini `{ winner: data, staleReplicaIds: [] }` formatida qaytaring.",
      startingCode: "function checkLeaderlessQuorum(readResults, rQuorum, lwwResolver) {\n  // Kodni shu yerda yozing\n}",
      hint: "readResults uzunligini rQuorum bilan solishtiring. So'ngra barcha data elementlarni lwwResolver yordamida solishtirib g'olibni toping. G'olibning timestamp va nodeId ko'rsatkichlariga mos kelmaydigan replikalarni aniqlang.",
      test: "if (typeof checkLeaderlessQuorum !== 'function') return 'checkLeaderlessQuorum funksiya emas';\nconst lww = (a, b) => (!a || b.timestamp > a.timestamp) ? b : a;\nconst results = [\n  { replicaId: 'R1', data: { val: 'X', timestamp: 10, nodeId: 'N1' } },\n  { replicaId: 'R2', data: { val: 'Y', timestamp: 12, nodeId: 'N2' } },\n  { replicaId: 'R3', data: { val: 'X', timestamp: 10, nodeId: 'N1' } }\n];\nconst res = checkLeaderlessQuorum(results, 3, lww);\nif (res === 'INSUFFICIENT_QUORUM') return 'Quorum yetarli bo\\'lishi kerak edi';\nif (res.winner.val !== 'Y') return 'G\\'olib noto\\'g\\'ri aniqlandi';\nif (res.staleReplicaIds.length !== 2 || !res.staleReplicaIds.includes('R1') || !res.staleReplicaIds.includes('R3')) return 'Eskirgan replikalar aniqlanmadi';\nreturn null;"
    },
    {
      id: 8,
      title: "Avtomatik Failover Koordinator (Leader Election)",
      instruction: "Leader ishdan chiqqanida, replikalardan biri yangi Leader etib saylanishi kerak. Yangi Leader eng yangi ma'lumotlarga (eng katta Log Sequence Number - LSN) va eng yangi saylov davriga (term) ega bo'lishi shart. `electNewLeader(candidates)` funksiyasini yozing. `candidates` - replikalar massivi, har biri: `{ id: string, lsn: number, term: number, status: 'healthy'|'unhealthy' }` ko'rinishida. Saylanadigan replica statusi albatta `'healthy'` bo'lishi kerak. Avval `term` solishtiriladi (qanchalik katta bo'lsa shuncha yaxshi), agar term-lar teng bo'lsa, `lsn` solishtiriladi (qanchalik katta bo'lsa shuncha yaxshi). Agar term va lsn ham teng bo'lsa, IDsi bo'yicha alfavit tartibida birinchisi (leksikografik eng kichik) tanlanadi. Mos replica topilmasa `null` qaytariladi.",
      startingCode: "function electNewLeader(candidates) {\n  // Kodni shu yerda yozing\n}",
      hint: "Sog'lom (healthy) replikalarni filtrlang. Keyin ularni term bo'yicha kamayish, lsn bo'yicha kamayish va id bo'yicha o'sish tartibida sort qiling va birinchisini oling.",
      test: "if (typeof electNewLeader !== 'function') return 'electNewLeader funksiya emas';\nconst cand = [\n  { id: 'repA', lsn: 150, term: 2, status: 'healthy' },\n  { id: 'repB', lsn: 200, term: 1, status: 'healthy' },\n  { id: 'repC', lsn: 150, term: 2, status: 'healthy' },\n  { id: 'repD', lsn: 300, term: 2, status: 'unhealthy' }\n];\nconst res = electNewLeader(cand);\nif (!res || res.id !== 'repA') return 'repA g\\'olib bo\\'lishi kerak edi (term=2, lsn=150, repC dan leksikografik kichik)';\nreturn null;"
    },
    {
      id: 9,
      title: "Replikatsiya Lag Kuzatuvchisi (LSN Lag Tracker)",
      instruction: "Replikatsiyaning sekinlashishini kuzatish uchun Leader o'zining LSN qiymati va replikalardan olingan LSNlarni solishtirib turadi. `trackReplicationLag(leaderLsn, replicas)` funksiyasini yozing. `replicas` - bu `{ id: string, lastAppliedLsn: number }` obyekti shaklidagi replikalar massivi. Funksiya har bir replika uchun lag miqdorini (`leaderLsn - lastAppliedLsn`) hisoblab, natijani obyektdagi Map yoki oddiy obyekt `{ replicaId: lag }` ko'rinishida qaytarishi lozim.",
      startingCode: "function trackReplicationLag(leaderLsn, replicas) {\n  // Kodni shu yerda yozing\n}",
      hint: "Replicas massivini aylanib chiqib, har bir element uchun lag-ni hisoblang va uni natijaviy obyektga kalit sifatida replica ID-sini berib saqlang.",
      test: "if (typeof trackReplicationLag !== 'function') return 'trackReplicationLag funksiya emas';\nconst reps = [\n  { id: 'R1', lastAppliedLsn: 100 },\n  { id: 'R2', lastAppliedLsn: 90 }\n];\nconst res = trackReplicationLag(110, reps);\nif (res.R1 !== 10 || res.R2 !== 20) return 'Lag miqdorlari xato hisoblandi';\nreturn null;"
    },
    {
      id: 10,
      title: "Merkle Tree Anti-Entropy Farq Topuvchi (Anti-Entropy Diff)",
      instruction: "Leaderless replikatsiyada tugunlar o'zlaridagi ma'lumotlarni to'liq solishtirish uchun Merkle Tree-dan foydalanishadi. Agar hash-lar mos kelmasa, faqat farqlangan qismlar uzatiladi. Har bir vaqtda daraxt ko'rinishidagi tuzilma bor: `{ hash: string, left: Node, right: Node, range: [number, number] }`. Agar tugun leaf (barg) bo'lsa, unda `left` va `right` bo'lmaydi. `findMerkleDiff(treeA, treeB)` funksiyasini yozing. U ikki daraxtni solishtiradi va bir-biriga mos kelmagan barcha leaf (barg) tugunlarning `range` qiymatlarini bitta massivda qaytarasi. Daraxtlar strukturasi bir xil (simmetrik) deb hisoblang.",
      startingCode: "function findMerkleDiff(treeA, treeB) {\n  // Kodni shu yerda yozing\n}",
      hint: "Rekursiv funksiya yozing. Agar joriy tugunlarning hash-lari teng bo'lsa, farq yo'q, rekursiyani to'xtating. Agar hash-lar farqli bo'lsa va bu leaf tugun bo'lsa, range-ni massivga qo'shing. Agar leaf bo'lmasa, left va right shoxlarni rekursiv tekshiring va natijalarni birlashtiring.",
      test: "if (typeof findMerkleDiff !== 'function') return 'findMerkleDiff funksiya emas';\nconst leaf1A = { hash: 'h1', range: [0, 5] };\nconst leaf2A = { hash: 'h2', range: [6, 10] };\nconst rootA = { hash: 'root_a', left: leaf1A, right: leaf2A, range: [0, 10] };\nconst leaf1B = { hash: 'h1', range: [0, 5] };\nconst leaf2B = { hash: 'h_diff', range: [6, 10] };\nconst rootB = { hash: 'root_b', left: leaf1B, right: leaf2B, range: [0, 10] };\nconst diffs = findMerkleDiff(rootA, rootB);\nif (diffs.length !== 1 || diffs[0][0] !== 6 || diffs[0][1] !== 10) return 'Mos kelmagan leaf range aniqlanmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Synchronous replication (Sinxron replikatsiya) ning asosiy kamchiligi nima?",
      options: [
        "Ma'lumotlar yo'qolish xavfi juda yuqori bo'ladi",
        "Yozish tezligi (latency) eng sekin replika tezligiga bog'liq bo'lib qoladi",
        "O'qish so'rovlari faqat bitta serverda bajariladi",
        "Faqat relational bo'lmagan (NoSQL) ma'lumotlar bazalarida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Sinxron replikatsiyada Leader barcha replikalardan tasdiq (ACK) kelishini kutadi. Shu sababli sekin replica butun yozish jarayonini sekinlashtiradi."
    },
    {
      id: 2,
      question: "Asynchronous replication (Asinxron replikatsiya) da yozish qanday yakunlanadi?",
      options: [
        "Barcha replikalar o'z xotirasiga yozib bo'lgandan so'ng",
        "Leader ma'lumotni o'ziga yozgan zahoti mijozga muvaffayat xabarini qaytaradi",
        "Kamida bitta replika yozgandan so'ng",
        "Klasterdagi barcha tugunlar parallel o'qilgandan keyin"
      ],
      correctAnswer: 1,
      explanation: "Asinxron replikatsiyada Leader yozishni o'zida amalga oshirib mijozga tezda javob beradi. Replikatsiya esa fonda davom etadi."
    },
    {
      id: 3,
      question: "Semi-synchronous replication (Yarim-sinxron replikatsiya) deganda nima tushuniladi?",
      options: [
        "Yozish faqat kunning birinchi yarmida sinxron, ikkinchi yarmida asinxron bo'ladi",
        "Faqat indekslar sinxron, ma'lumotlar asinxron ko'chiriladi",
        "Leader kamida belgilangan miqdordagi (masalan, 1 ta) replikadan tasdiq kutadi, qolganlariga esa asinxron replikatsiya qiladi",
        "Ma'lumotlar faqat matnli fayllar ko'rinishida replikatsiya qilinadi"
      ],
      correctAnswer: 2,
      explanation: "Yarim-sinxron uslub tezlik va ma'lumot xavfsizligi o'rtasidagi kelishuvdir: eng kamida bitta replikaga yozilgani kafolatlanadi."
    },
    {
      id: 4,
      question: "Split-brain muammosi nima?",
      options: [
        "Server CPU xotirasi ikki qismga bo'linishi",
        "Tarmoq bo'linishi (network partition) natijasida ikkita tugun o'zini Leader deb hisoblab parallel yozishlarni qabul qilishi",
        "Dastur kodining sinxron va asinxron qismlarga ajralishi",
        "Replika va Leader ma'lumotlar bazasi jadvallarining har xil nomlanishi"
      ],
      correctAnswer: 1,
      explanation: "Tarmoq uzilishi sababli tugunlar bir-birini ko'rmay qolganda, ikkala guruh ham o'z liderini saylasa, split-brain yuzaga keladi va ma'lumotlar ziddiyatli holatga keladi."
    },
    {
      id: 5,
      question: "Read-after-write consistency (Yozgandan keyin o'qish mosligi) kafolati nima beradi?",
      options: [
        "Foydalanuvchi yozgan ma'lumotlarini darhol o'zi o'qiganida yangilangan holatda ko'rishini kafolatlaydi",
        "Faqat o'qish amallari bajarilishini ta'minlaydi",
        "Yozishdan oldin o'qishni majburlaydi",
        "Barcha foydalanuvchilar bir vaqtning o'zida yozishlarini talab qiladi"
      ],
      correctAnswer: 0,
      explanation: "Bu kafolat foydalanuvchi o'zgartirgan ma'lumotni darhol yangilangan holatda ko'rishini ta'minlaydi. Odatda bunga foydalanuvchining o'z profilini faqat Leader-dan o'qitish orqali erishiladi."
    },
    {
      id: 6,
      question: "Monotonic Reads kafolati nimani oldini oladi?",
      options: [
        "Ma'lumotlar bazasi hajmining cheksiz o'sishini",
        "Foydalanuvchi sahifani bir necha marta yangilaganda, vaqt bo'yicha orqaga qaytgan (ya'ni yangi ma'lumotdan so'ng eski replikadagi eskirgan ma'lumotni ko'rish) holatini",
        "Barcha tranzaksiyalarning bekor qilinishini",
        "Parallel yozishlar kelishini"
      ],
      correctAnswer: 1,
      explanation: "Monotonic Reads foydalanuvchining o'qish so'rovlari vaqt bo'yicha doimiy ravishda faqat oldinga siljishini yoki bir xil bo'lishini ta'minlaydi, ya'ni eskirgan replikaga ulanib qolishini oldini oladi."
    },
    {
      id: 7,
      question: "Leaderless (Dynamo-style) tizimda N=3 (replikalar soni), W=2 (yozish quorumi) bo'lsa, Strong Consistency-ni ta'minlash uchun R (o'qish quorumi) kamida nechaga teng bo'lishi kerak?",
      options: [
        "R = 1",
        "R = 2",
        "R = 3",
        "R = 0"
      ],
      correctAnswer: 1,
      explanation: "Strong Consistency formulasi: R + W > N. Demak, R + 2 > 3 bo'lishi uchun R kamida 2 ga teng bo'lishi kerak."
    },
    {
      id: 8,
      question: "Last-Write-Wins (LWW) ziddiyatlarni hal qilish usulining asosiy kamchiligi nima?",
      options: [
        "U faqat kichik hajmdagi ma'lumotlarda ishlaydi",
        "Taqsimlangan tizimlarda soatlar nomuvofiqligi (clock skew) tufayli ba'zi kechroq yozilgan haqiqiy ma'lumotlar o'chib ketishi mumkin",
        "U juda ko'p xotira talab qiladi",
        "Leader replikatsiyani butunlay to'xtatib qo'yadi"
      ],
      correctAnswer: 1,
      explanation: "LWW jismoniy vaqtga tayanadi. Taqsimlangan tizimlarda server soatlari hech qachon 100% bir xil bo'lmagani uchun, millisoniyalar farqi muhim yozishlarni yo'qotishi mumkin."
    },
    {
      id: 9,
      question: "Read Repair (O'qish paytidagi tuzatish) jarayoni qanday ishlaydi?",
      options: [
        "Admin qo'lda xatoliklarni tuzatadi",
        "O'qish paytida eskirgan qiymat aniqlansa, client yoki coordinator fonda o'sha replikaga yangi qiymatni yozib qo'yadi",
        "Tizim barcha replikalarni o'chirib boshqatdan yuklaydi",
        "Faqat index fayllarini qayta yaratadi"
      ],
      correctAnswer: 1,
      explanation: "Read Repair leaderless tizimlarda o'qish paytida eskirgan replikani aniqlab, unga avtomatik tarzda eng so'nggi ma'lumotni push qilish orqali anti-entropy vazifasini bajaradi."
    },
    {
      id: 10,
      question: "Merkle Tree (Merkle Daraxti) replikatsiyada nima uchun ishlatiladi?",
      options: [
        "Faqat parollarni shifrlash uchun",
        "Tugunlar orasidagi ma'lumotlarni solishtirishda butun bazani yubormasdan, faqat farqlangan diapazonlarni tezkor aniqlash (Anti-Entropy) uchun",
        "Fayllarni siqish (compress) uchun",
        "Barcha tranzaksiyalarni o'chirib yuborish uchun"
      ],
      correctAnswer: 1,
      explanation: "Merkle Tree - bu hash daraxti bo'lib, u ikki tugundagi ma'lumotlar mosligini minimal tarmoq trafigi orqali solishtirishga imkon beradi."
    },
    {
      id: 11,
      question: "Log Sequence Number (LSN) ning vazifasi nima?",
      options: [
        "Replika serverlarining IP manzillarini saqlash",
        "Tranzaksiyalar jurnalidagi har bir yozuvning tartib raqami bo'lib, replika leader-dan qanchalik orqadaligini aniqlash imkonini beradi",
        "Klasterdagi serverlar sonini hisoblash",
        "Ma'lumotlar bazasi parolini saqlash"
      ],
      correctAnswer: 1,
      explanation: "LSN replika loglarining qay darajada yangilanganini va replikatsiya lagi (lag) hajmini o'lchash uchun mantiqiy ko'rsatkichdir."
    },
    {
      id: 12,
      question: "Consistent Prefix Reads kafolati nimani kafolatlaydi?",
      options: [
        "Ma'lumotlarning faqat bosh harflari replikatsiya qilinishini",
        "Agar ma'lumotlar ma'lum bir ketma-ketlikda yozilgan bo'lsa, boshqa o'quvchi ham ularni aynan o'sha ketma-ketlikda o'qishini",
        "Barcha replikalar faqat bitta tranzaksiyani bajarishini",
        "Hech qanday ma'lumot o'zgartirilmasligini"
      ],
      correctAnswer: 1,
      explanation: "Consistent Prefix Reads mantiqiy sabab-oqibat (causal relation) zanjirini saqlab qoladi. Masalan, savoldan keyin javob kelishi zanjiri replikalarda buzilib qolmasligini ta'minlaydi."
    }
  ]
};
