export const heartbeatsLeases = {
  id: "heartbeatsLeases",
  title: "Heartbeats va Leases (Taqsimlangan Tizimlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Taqsimlangan tizimlarda (Distributed Systems) serverlar, ma'lumotlar bazalari va mikroservislar doimiy ravishda bir-biri bilan aloqa qilib turadi. Biroq, tarmoq nosozliklari yoki serverlarning to'satdan qulashi (crash) sababli, qaysi server "tirik" (alive) va qaysi biri "o'lik" (dead) ekanligini aniqlash juda qiyin. Ushbu muammoni hal qilish uchun **Heartbeats** (Yurak urishi) va **Leases** (Ijara) mexanizmlari ishlatiladi.

### Oddiy Analogiya:

*   **Heartbeats (Yurak urishi):** Tasavvur qiling, siz qorovulxona bilan har 10 soniyada ratsiya orqali gaplashib turibsiz. Siz shunchaki "Men shu yerdaman, hammasi yaxshi" deb turasiz. Agar qorovul sizdan 30 soniya davomida hech qanday signal olmasa, u sizni hushidan ketgan yoki biror falokatga uchragan deb hisoblaydi va qutqaruvchilarni chaqiradi.
*   **Leases (Ijara):** Tasavvur qiling, siz kutubxonadan juda noyob kitobni faqat 1 soatga ijaraga oldingiz. Agar siz uni yana ishlatmoqchi bo'lsangiz, 1 soat tugashidan oldin ijara muddatini uzaytirishingiz (renew) kerak. Agar belgilangan vaqt tugasa va siz kelmasangiz, kutubxonachi kitobni boshqa odamga berib yuboradi. Siz kitobni ushlab turgan bo'lsangiz ham, endi unga egalik huquqingiz yo'q.

---

## 2. 💻 Real Kod Misollari

JavaScript (Node.js) orqali Heartbeat va Lease mexanizmlarini modellashtirish:

### 1. Heartbeat Tracker (Tugun holatini kuzatuvchi)
\`\`\`javascript
class HeartbeatTracker {
  constructor(timeoutMs) {
    this.timeoutMs = timeoutMs;
    this.nodes = new Map(); // nodeId -> lastHeartbeatTimestamp
  }

  // Tugundan kelgan heartbeat signalini qayd etish
  ping(nodeId) {
    this.nodes.set(nodeId, Date.now());
  }

  // Barcha faol bo'lmagan (o'lik) tugunlarni aniqlash
  checkFailures() {
    const now = Date.now();
    const deadNodes = [];
    for (const [nodeId, lastSeen] of this.nodes.entries()) {
      if (now - lastSeen > this.timeoutMs) {
        deadNodes.push(nodeId);
      }
    }
    return deadNodes;
  }
}
\`\`\`

### 2. Lease Manager (Ijara mexanizmi)
\`\`\`javascript
class LeaseManager {
  constructor() {
    this.lease = null; // { ownerId, expiresAt }
  }

  // Ijarani olish yoki yangilashga urinish
  acquireOrRenew(ownerId, ttlMs) {
    const now = Date.now();
    if (!this.lease || now > this.lease.expiresAt) {
      // Ijara bo'sh yoki muddati tugagan bo'lsa yangi egaga beriladi
      this.lease = { ownerId, expiresAt: now + ttlMs };
      return true;
    } else if (this.lease.ownerId === ownerId) {
      // Eski ega muddati tugamasdan turib ijarani uzaytiradi (Keep-alive)
      this.lease.expiresAt = now + ttlMs;
      return true;
    }
    return false; // Ijara boshqa birovda va hali muddati tugamagan
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Heartbeats vs Leases: Farqlar jadvali
| Xususiyat | Heartbeats | Leases |
| :--- | :--- | :--- |
| **Maqsad** | Tugunning tirikligini aniqlash (Failure Detection) | Resursga egalik qilish huquqini boshqarish (Resource Allocation / Lock) |
| **Tashabbuskor** | Asosan kuzatiluvchi tugun (push) yoki monitor (pull) | Ijarani oluvchi mijoz (Client) |
| **Vaqt bo'yicha cheklov** | Mavjud emas (faqat signal yuboriladi) | Aniq muddat (TTL - Time To Live) muddatiga ega |
| **Xavfsizlik** | Split-brain holatida resurslarni himoya qilolmaydi | Fencing token bilan birga split-brain xavfini yo'qotadi |

### Phi Accrual Failure Detector (Shubha shkalasi)
An'anaviy failure detector'lar qat'iy timeout (masalan, 5 soniya) ishlatadi. Tarmoqda yuklama oshganda bu noto'g'ri signallarga (false positive) sabab bo'ladi.
**Phi Accrual Failure Detector** (Cassandra va Akka tizimlarida qo'llanilari) kelgan heartbeat'lar orasidagi interval tarixiga asoslanib, tugunning o'chganlik ehtimolini (\\Phi - Phi shkalasi bo'yicha) dinamik hisoblab boradi. Tizim doimiy o'zgaruvchan tarmoq sharoitlariga moslashadi.

### Clock Drift (Soatlar og'ishi) muammosi
Lease mexanizmi vaqtga (TTL) tayanadi. Taqsimlangan tizimlarda turli mashinalarning tizim soatlari (system clocks) bir oz farq qilishi mumkin. Agar ijarani beruvchi va oluvchining soatlari bir xil bo'lmasa, bir tugun ijarani hali tugamadi deb o'ylasa, boshqasi uni allaqachon muddati o'tgan deb boshqa tugunga berib yuborishi mumkin. Buni oldini olish uchun soat og'ishi xatolik chegarasidan katta bo'lgan **Fencing Tokens** (oshib boruvchi raqamlar) qo'shiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Juda qisqa Heartbeat Timeout belgilash:** Tarmoq bir soniyaga sekinlashsa yoki Garbage Collection (GC) ishga tushsa, sog'lom tugunlar ham "o'lik" deb e'lon qilinadi va tizimda behuda qayta yuklash (failover storms) boshlanadi.
2. **Fencing Token'larsiz Lease'dan foydalanish:** Junior dasturchilar lock yoki lease muddati tugagach, eski lider boshqa yozish amallarini bajarmaydi deb taxmin qilishadi. Lekin u tarmoq tormozlanishi sababli kechikib, yangi lider yozgan ma'lumotlar ustidan yozib yuborishi mumkin (Dirty write).
3. **Keep-alive loopini asinxron boshqarmaslik:** Ijara yangilash so'rovlari navbatda turib qolsa va o'z vaqtida yuborilmasa, tugun hali ishlayotgan bo'lsa ham ijarani yo'qotadi.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Heartbeat nima va u qanday muammoni hal qiladi?**
   Tugunning ishlayotganini davriy ravishda xabar berish orqali tarmoqdagi nosozliklar va qulashlarni aniqlash imkonini beradi.
2. **Lease (Ijara) an'anaviy Lock'dan nimasi bilan farq qiladi?**
   An'anaviy lock egasi qulab tushsa, lock abadiy qulflanib qolishi mumkin. Lease esa aniq TTL (vaqt cheklovi)ga ega bo'lib, egasi qulasa ham vaqt o'tishi bilan avtomat bo'shaydi.
3. **Fencing Token nima va u nima uchun kerak?**
   Bu har bir ijara yangilanganda oshib boruvchi monoton hisoblagich. U split-brain holatida eski liderning bazaga eski ma'lumot yozishini taqiqlash uchun xizmat qiladi.
4. **Phi Accrual Failure Detector qanday ishlaydi?**
   U qat'iy timeout o'rniga, kelgan signallar intervalining statistik tahliliga ko'ra tugunning qulash ehtimolini foizda (Phi) hisoblaydi.
5. **Clock Drift (Soatlar farqi) Leases tizimiga qanday ta'sir qiladi?**
   Tugunlar orasidagi soatlar mutanosib bo'lmasa, ijara muddatini hisoblashda xatolik yuz beradi va bir vaqtda ikki lider paydo bo'lishiga olib kelishi mumkin.
6. **etcd ephemeral keys konsepsiyasi nima?**
   etcd-dagi kalitlar ma'lum bir lease'ga bog'lanadi. Agar lease yangilanmay muddati tugasa, shu lease'ga ulangan barcha kalitlar avtomatik o'chib ketadi.
7. **Keep-alive nima?**
   Ijara muddati tugashidan oldin uni davriy ravishda uzaytirish uchun yuboriladigan so'rovlar zanjiri.
8. **Consul-da session qanday yaratiladi va boshqariladi?**
   Mijoz Consul-da session ochadi va unga TTL biriktiradi. Mijoz har safar keep-alive yuborganida session faol bo'lib turadi, aks holda u bilan bog'liq lock'lar yechiladi.
9. **Kubernetes-da Node Lease qayerda ishlatiladi?**
   Klasterdagi Node'larning holatini tekshirish va boshqaruv paneli (Control Plane)ga o'zining sog'lom ekanligini tez-tez va kam trafik bilan bildirish uchun ishlatiladi.
10. **Garbage Collection (GC) pauzalari failure detection'ga qanday xalaqit beradi?**
    GC ishga tushganda dasturning barcha oqimlari (threads) to'xtaydi ("Stop-the-world"). Bu vaqtda heartbeat yuborilmaydi va boshqa tugunlar uni o'lik deb o'ylashi mumkin.
11. **Split-Brain holati nima?**
    Tarmoq ikkiga bo'linib qolishi natijasida, har ikkala bo'lingan qism o'zini mustaqil lider deb e'lon qilishi va bir vaqtning o'zida qarama-qarshi qarorlar qabul qilishi.
12. **Master-Worker arxitekturasida Heartbeat qaysi yo'nalishda yuboriladi?**
    Odatda Worker tugunlar Master tugunga davriy ravishda push (Heartbeat) yuborishadi, ba'zida Master o'zi so'rov yuborib turadi (Pull).

---

## 6. 🛠️ Amaliy Topshiriqlar

Topshiriqlarni bajarish uchun pastdagi mashqlar bo'limiga o'ting.

---

## 7. 📝 12 ta Mini Test

Test savollariga javob berish orqali olingan bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Kubernetes Node Leases
Eski Kubernetes versiyalarida har bir Node o'z holatini \`NodeStatus\` orqali API Serverga yuborar edi. Bu juda katta ob'ekt bo'lib, klasterda minglab Node'lar bo'lganda etcd omborini va tarmoqni haddan tashqari yuklab yuborardi.
Hozirgi Kubernetes tizimida har bir Node uchun maxsus kichik hajmli \`Lease\` ob'ekti (\`coordination.k8s.io\` API guruhi) yaratilgan. Node'lar o'zlarining tirikliklarini shu kichik ob'ekt muddatini uzaytirish orqali tasdiqlaydi. Bu tarmoq trafigini va etcd yuklamasini 90% dan ko'proqqa kamaytirdi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant ClientA as Lider (Client A)
    participant Coordinator as etcd / Coordinator
    participant DB as Storage (Database)
    
    ClientA->>Coordinator: Lease olish (TTL = 10s)
    Coordinator-->>ClientA: Lease berildi (Fencing Token = 101)
    ClientA->>DB: Ma'lumot yozish (Token = 101)
    DB->>DB: Token 101 ni eng oxirgi deb saqlaydi va yozadi
    Note over ClientA,Coordinator: Tarmoq tiqilishi (Network Partition) yoki GC pauzasi
    Coordinator->>Coordinator: 10s kutadi (Lease muddati tugadi)
    
    participant ClientB as Yangi Lider (Client B)
    ClientB->>Coordinator: Lease olish (TTL = 10s)
    Coordinator-->>ClientB: Lease berildi (Fencing Token = 102)
    
    ClientB->>DB: Ma'lumot yozish (Token = 102)
    DB->>DB: 102 > 101 -> Qabul qiladi va yozadi
    
    ClientA->>DB: Kechikkan so'rovni yuborish (Token = 101)
    DB-->>ClientA: Rad etildi! (Eski Fencing Token 101 < 102)
\`\`\`

---

## 10. 📌 Cheat Sheet

| Atama | Kalit So'z | Asosiy Vazifasi |
| :--- | :--- | :--- |
| **Heartbeat** | Status, Ping | Tugunning ishlayotganligini aniqlash |
| **Lease** | TTL, Auto-release | Resursni xavfsiz va vaqtinchalik ijaraga berish |
| **Fencing Token** | Monotonic ID | Eskirgan ijara egalarining yozishlarini rad etish |
| **Clock Drift** | Soatlar og'ishi | Tizimlar o'rtasidagi vaqt farqi xavfi |
| **Keep-alive** | Refresh Loop | Ijara tugamasdan turib uni yangilab turish |
`,
  exercises: [
    {
      id: 1,
      title: "Heartbeat Status Tracker",
      instruction: "Tugunlar ro'yxati (`nodes`), joriy vaqt (`currentTime`) va ruxsat berilgan maksimal kechikish (`timeout`) berilgan. Agar tugun oxirgi marta yuborgan heartbeat vaqtidan beri o'tgan vaqt `timeout` dan katta bo'lsa, uning holatini `'DEAD'` deb belgilang, aks holda `'ALIVE'` bo'lsin. Natijani `{ nodeId: 'ALIVE'|'DEAD' }` ko'rinishida qaytaring.",
      startingCode: "function checkNodesStatus(nodes, currentTime, timeout) {\n  // nodes: { nodeA: lastHeartbeatTime, nodeB: lastHeartbeatTime }\n  // Kodni shu yerda yozing\n}",
      hint: "nodes ob'ekti kalitlarini aylanib chiqish uchun Object.keys(nodes) yoki for...in ishlating va currentTime - lastHeartbeatTime > timeout shartini tekshiring.",
      test: "if (typeof checkNodesStatus !== 'function') return 'checkNodesStatus funksiyasi aniqlanmagan'; const res = checkNodesStatus({ n1: 1000, n2: 2500 }, 3000, 1000); if (res.n1 !== 'DEAD') return 'n1 DEAD bo\\'lishi kerak'; if (res.n2 !== 'ALIVE') return 'n2 ALIVE bo\\'lishi kerak'; return null;"
    },
    {
      id: 2,
      title: "Lease Acquire with TTL",
      instruction: "Ijara holati (`leaseState`), mijoz IDsi (`clientId`), joriy vaqt (`currentTime`) va TTL (`ttl`) berilgan. Agar ijara bo'sh bo'lsa (ya'ni `owner` qiymati `null` bo'lsa) yoki ijarani oldingi egasi olgan muddat o'tib ketgan bo'lsa (ya'ni `currentTime > expiresAt`), unda ijarani yangi mijozga berib `expiresAt` ni `currentTime + ttl` qiling va `true` qaytaring. Aks holda `false` qaytaring.",
      startingCode: "function acquireLease(leaseState, clientId, currentTime, ttl) {\n  // leaseState: { owner: string|null, expiresAt: number }\n  // Kodni shu yerda yozing\n}",
      hint: "if (leaseState.owner === null || currentTime > leaseState.expiresAt) shartini tekshiring va mos ravishda ob'ektni yangilab true qaytaring.",
      test: "if (typeof acquireLease !== 'function') return 'acquireLease funksiyasi aniqlanmagan'; const state = { owner: 'client1', expiresAt: 1000 }; if (!acquireLease(state, 'client2', 1200, 500)) return 'Muddati o\\'tgan lease qayta olinishi kerak'; if (state.owner !== 'client2' || state.expiresAt !== 1700) return 'Lease yangilanishida xato'; if (acquireLease(state, 'client3', 1500, 500)) return 'Faol lease olinmasligi kerak'; return null;"
    },
    {
      id: 3,
      title: "Lease Renewal Loop Simulator",
      instruction: "Ijara ob'ekti (`lease`), joriy vaqt (`currentTime`), yangilash chegarasi (`threshold`) va uzaytirish vaqti (`extendBy`) berilgan. Agar ijara tugashiga qolgan vaqt (`expiresAt - currentTime`) `threshold` dan kichik yoki teng bo'lsa, unda `expiresAt` ni `extendBy` qiymatiga oshiring va `true` qaytaring. Agar hali muddat yetarli bo'lsa, hech narsa o'zgartirmang va `false` qaytaring.",
      startingCode: "function shouldRenewAndExtend(lease, currentTime, threshold, extendBy) {\n  // lease: { owner: string, expiresAt: number }\n  // Kodni shu yerda yozing\n}",
      hint: "expiresAt dan currentTime ni ayiring va threshold bilan solishtiring. Shart bajarilsa, expiresAt ni extendBy ga oshiring.",
      test: "if (typeof shouldRenewAndExtend !== 'function') return 'shouldRenewAndExtend topilmadi'; const lease = { owner: 'n1', expiresAt: 1500 }; if (!shouldRenewAndExtend(lease, 1000, 600, 1000)) return 'Ijara yangilanishi kerak edi'; if (lease.expiresAt !== 2500) return 'expiresAt yangilanmadi'; if (shouldRenewAndExtend(lease, 1100, 300, 1000)) return 'Ijara muddat yetarli bo\\'lsa yangilanmasligi kerak'; return null;"
    },
    {
      id: 4,
      title: "Ephemeral Keys Cleanup",
      instruction: "etcd kabi kalit-qiymat omborlarida kiritilgan kalitlar ma'lum bir lease'ga bog'lanadi. Agar lease muddati tugasa, ushbu kalitlar o'chib ketishi kerak (ephemeral key cleanup). Berilgan `store` va `leases` bo'yicha joriy `currentTime` da muddati tugagan leaseId ga bog'langan kalitlarni `store` dan o'chiring va yangi store'ni qaytaring. `store` formati: `{ key1: { value: 'val1', leaseId: 'L1' } }`, `leases` esa: `{ L1: expiresAtTime }`.",
      startingCode: "function cleanupExpiredKeys(store, leases, currentTime) {\n  // Kodni shu yerda yozing\n}",
      hint: "store nusxasini oling va har bir kalit uchun leases[key.leaseId] <= currentTime ekanligini tekshiring, agar to'g'ri kelsa key'ni o'chiring.",
      test: "if (typeof cleanupExpiredKeys !== 'function') return 'cleanupExpiredKeys topilmadi'; const store = { k1: { value: 'A', leaseId: 'L1' }, k2: { value: 'B', leaseId: 'L2' } }; const leases = { L1: 1000, L2: 3000 }; const res = cleanupExpiredKeys(store, leases, 2000); if (res.k1) return 'k1 o\\'chishi kerak edi'; if (!res.k2) return 'k2 qolishi kerak edi'; return null;"
    },
    {
      id: 5,
      title: "Phi Accrual Failure Detector Calculation",
      instruction: "Phi Accrual Failure Detector soddalashtirilgan formulasini hisoblang: `phi = t / meanInterval`, bu yerda `t` - oxirgi heartbeat'dan beri o'tgan vaqt (`currentTime - lastHeartbeatTime`), `meanInterval` - o'rtacha heartbeat oralig'i. Agar `phi > threshold` bo'lsa `true` (tugun ishlamayapti deb shubha qilinadi), aks holda `false` qaytaring.",
      startingCode: "function isNodeSuspected(lastHeartbeatTime, currentTime, meanInterval, threshold) {\n  // Kodni shu yerda yozing\n}",
      hint: "Avval t = currentTime - lastHeartbeatTime ni toping. Keyin t / meanInterval ni hisoblab threshold dan kattaligini tekshiring.",
      test: "if (typeof isNodeSuspected !== 'function') return 'isNodeSuspected topilmadi'; if (!isNodeSuspected(1000, 9000, 1000, 7.0)) return 'Phi = 8 bo\\'lganda shubha ostiga olinishi kerak edi'; if (isNodeSuspected(1000, 3000, 1000, 4.0)) return 'Phi = 2 bo\\'lganda shubha qilinmasligi kerak edi'; return null;"
    },
    {
      id: 6,
      title: "Fencing Token Validation on Database Writes",
      instruction: "Split-brain muammosini oldini olish uchun yozish so'rovidagi token tekshiriladi. Baza (`db`) ob'ektida `lastToken` va `data` mavjud. Agar so'rovdagi `request.token` qiymati `db.lastToken` dan kichik bo'lsa xato deb hisoblab `false` qaytaring. Aks holda `db.data = request.payload` va `db.lastToken = request.token` qilib o'zgartiring hamda `true` qaytaring.",
      startingCode: "function writeToDatabase(db, request) {\n  // Kodni shu yerda yozing\n}",
      hint: "request.token < db.lastToken bo'lsa darhol false qaytaring, aks holda db ob'ektini yangilab true qaytaring.",
      test: "if (typeof writeToDatabase !== 'function') return 'writeToDatabase topilmadi'; const db = { lastToken: 5, data: 'hello' }; if (writeToDatabase(db, { token: 4, payload: 'old' })) return 'Eski token rad etilishi shart'; if (!writeToDatabase(db, { token: 6, payload: 'new' })) return 'Yangi token qabul qilinishi kerak'; if (db.data !== 'new' || db.lastToken !== 6) return 'Baza holati to\\'g\\'ri yangilanmadi'; return null;"
    },
    {
      id: 7,
      title: "Heartbeats Packet Jitter Threshold Controller",
      instruction: "Kelgan heartbeat oraliqlari massivi `intervals` berilgan. O'rtacha intervalni hisoblang, so'ng har bir intervalning o'rtachadan mutloq og'ishining o'rtacha qiymatini (Jitter) hisoblang. Agar hisoblangan jitter `maxJitter` dan katta bo'lsa `true` (tarmoqda yuqori jitter borligini ko'rsatadi), aks holda `false` qaytaring.",
      startingCode: "function detectJitterAnomaly(intervals, maxJitter) {\n  // Kodni shu yerda yozing\n}",
      hint: "1. O'rtachani toping: sum / len. 2. Og'ishlarni toping: abs(x - mean). 3. Og'ishlarning o'rtachasini maxJitter bilan solishtiring.",
      test: "if (typeof detectJitterAnomaly !== 'function') return 'detectJitterAnomaly topilmadi'; const i1 = [1000, 1010, 990, 1000]; const i2 = [1000, 1200, 800, 1000]; if (detectJitterAnomaly(i1, 20)) return 'Kichik jitter uchun false bo\\'lishi kerak'; if (!detectJitterAnomaly(i2, 50)) return 'Katta jitter uchun true bo\\'lishi kerak'; return null;"
    },
    {
      id: 8,
      title: "Consul-like Session TTL Tracker",
      instruction: "Mijoz sessiyalari (`sessions`) va ularga biriktirilgan locklar (`locks`) berilgan. Agar sessiyaning muddati o'tib ketgan bo'lsa (`currentTime > sessions[sessionId]`), ushbu sessiya egasi tomonidan band qilingan barcha resurs locklarini `locks` ob'ektidan o'chirib yuboring va tozalangan yangi `locks` ob'ektini qaytaring. `sessions`: `{ s1: expiresAt }`, `locks`: `{ resA: sessionId }`.",
      startingCode: "function checkSessions(sessions, locks, currentTime) {\n  // Kodni shu yerda yozing\n}",
      hint: "Sessiyalar ro'yxatidan muddati o'tgan sessiyalar ID'larini aniqlang, so'ng locks ob'ektidan shu sessiyaga tegishli kalitlarni o'chirib tashlang.",
      test: "if (typeof checkSessions !== 'function') return 'checkSessions topilmadi'; const sessions = { s1: 1500, s2: 2500 }; const locks = { resA: 's1', resB: 's2' }; const res = checkSessions(sessions, locks, 2000); if (res.resA) return 's1 lock yechilmadi'; if (res.resB !== 's2') return 's2 lock o\\'chmasligi kerak edi'; return null;"
    },
    {
      id: 9,
      title: "Lease-based Leader Election",
      instruction: "Klaster holati (`clusterState`) va nomzod IDsi (`candidateId`) berilgan. Agar klasterda lider yo'cligi yoki liderning lease muddati tugagan bo'lsa (`currentTime > expiresAt`), joriy nomzodni yangi lider qilib belgilang va `expiresAt` ni `currentTime + leaseDuration` ga tenglang va yangi holatni qaytaring. Aks holda holatni o'zgarishsiz qaytaring.",
      startingCode: "function electLeader(clusterState, candidateId, currentTime, leaseDuration) {\n  // clusterState: { leaderId: string|null, expiresAt: number }\n  // Kodni shu yerda yozing\n}",
      hint: "clusterState.leaderId === null || currentTime > clusterState.expiresAt shartini tekshiring va yangi liderni belgilang.",
      test: "if (typeof electLeader !== 'function') return 'electLeader topilmadi'; const state = { leaderId: 'node1', expiresAt: 1000 }; const next = electLeader(state, 'node2', 1200, 500); if (next.leaderId !== 'node2' || next.expiresAt !== 1700) return 'Lider almashmadi'; const stable = electLeader(next, 'node3', 1500, 500); if (stable.leaderId !== 'node2') return 'Barqaror lider o\\'zgarmasligi kerak'; return null;"
    },
    {
      id: 10,
      title: "Dynamic Heartbeat Interval Adjuster",
      instruction: "Xatolar foizi (`errorRate`)ga qarab heartbeat intervalini dinamik tarzda moslashtiring. Agar `errorRate > 0.5` bo'lsa (yuqori yuklama/xato), `currentInterval` ni 1.5 barobarga oshiring (`maxInterval` dan oshmasligi kerak). Agar `errorRate <= 0.1` bo'lsa (barqaror aloqa), intervalni 0.8 barobarga kamaytiring (`minInterval` dan past bo'lmasligi kerak). Boshqa holatlarda o'zgartirmang va yangi intervalni qaytaring.",
      startingCode: "function adjustHeartbeatInterval(currentInterval, errorRate, minInterval, maxInterval) {\n  // Kodni shu yerda yozing\n}",
      hint: "Matematik Math.min va Math.max metodlaridan foydalanib interval chegaralarini nazorat qiling.",
      test: "if (typeof adjustHeartbeatInterval !== 'function') return 'adjustHeartbeatInterval topilmadi'; if (adjustHeartbeatInterval(1000, 0.6, 500, 2000) !== 1500) return 'Ko\\'paytirishda xatolik'; if (adjustHeartbeatInterval(1000, 0.05, 500, 2000) !== 800) return 'Kamaytirishda xatolik'; if (adjustHeartbeatInterval(1000, 0.3, 500, 2000) !== 1000) return 'O\\'zgarmasligi kerak edi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Heartbeats (Yurak urishi) mexanizmining asosiy vazifasi nima?",
      options: [
        "Taqsimlangan tizimda tugunlarning tirikligini va tarmoq orqali bog'lanishini aniqlash",
        "Ma'lumotlar bazasida tranzaksiyalarni boshqarish",
        "Kalit-qiymat omborida kalitlarni shifrlash",
        "Yuklamani serverlar orasida teng taqsimlash"
      ],
      correctAnswer: 0,
      explanation: "Heartbeat - bu tugunning faol (tirik) ekanligini bildirish uchun davriy ravishda yuboriladigan signal bo'lib, uning asosiy maqsadi nosozliklarni aniqlashdir."
    },
    {
      id: 2,
      question: "Lease (Ijara) tushunchasining an'anaviy Lock (Qulf)dan asosiy farqi nimada?",
      options: [
        "Lease aniq vaqt bo'yicha cheklangan (TTL) bo'lib, egasi qulasa ham avtomatik bo'shaydi",
        "Lease faqat SQL ma'lumotlar bazalarida ishlatiladi",
        "Lease hech qachon muddati tugamaydigan qulfdir",
        "Lease faqat bitta kompyuter ichida ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "An'anaviy Lock egasi o'chib qolsa abadiy band bo'lib qolishi mumkin, Lease esa TTL muddati tugashi bilan o'z-o'zidan bekor bo'ladi."
    },
    {
      id: 3,
      question: "Split-brain holatida eski lider yozgan noto'g'ri ma'lumotlardan saqlanish uchun nima ishlatiladi?",
      options: [
        "Fencing Token (ortib boruvchi hisoblagich)",
        "Faqat IP manzillarni tekshirish",
        "Kattaroq operativ xotira (RAM)",
        "DNS keshlarini tozalash"
      ],
      correctAnswer: 0,
      explanation: "Fencing token - har safar yangi lease berilganda ortib boruvchi raqam bo'lib, baza eski tokenga ega kechikkan liderlarning yozish so'rovlarini rad etish uchun ishlatadi."
    },
    {
      id: 4,
      question: "Phi Accrual Failure Detector algoritmining afzalligi nimada?",
      options: [
        "Ruxsat etilgan kechikishni qat'iy timeout bilan cheklamay, tarmoq holatiga qarab shubha darajasini dinamik hisoblaydi",
        "Ma'lumotlarni tezroq shifrlaydi",
        "Faqat Kubernetes klasterlarida ishlaydi",
        "Ulanish tezligini sun'iy ravishda oshiradi"
      ],
      correctAnswer: 0,
      explanation: "Ushbu algoritm qat'iy timeout'dan voz kechib, tarmoqning jitteri va yuklamasiga moslashgan holda shubha shkalasini hisoblab chiqadi."
    },
    {
      id: 5,
      question: "Clock Drift (soatlar og'ishi) muammosi deganda nima tushuniladi?",
      options: [
        "Taqsimlangan tizimdagi turli serverlarning ichki tizim soatlari orasidagi vaqt farqi",
        "Ma'lumotlar bazasi indekslarining eskirishi",
        "Dastur kodi bajarilish tezligining pasayishi",
        "Brauzer keshining noto'g'ri ishlashi"
      ],
      correctAnswer: 0,
      explanation: "Clock Drift - har xil jismoniy serverlarning soatlari vaqt o'tishi bilan turlicha o'zgarishi natijasida yuzaga keladigan vaqt tafovutidir."
    },
    {
      id: 6,
      question: "etcd omboridagi ephemeral (vaqtinchalik) kalitlar qanday o'chiriladi?",
      options: [
        "Ular bog'langan Lease muddati yangilanmay tugagandan so'ng avtomatik o'chadi",
        "Faqat foydalanuvchi qo'lda DELETE buyrug'ini berganda o'chadi",
        "Har safar server o'chib yonganida o'chadi",
        "Ma'lumotlar bazasi to'lib ketganda o'chadi"
      ],
      correctAnswer: 0,
      explanation: "etcd tizimida ephemeral kalitlar muayyan lease-ga biriktiriladi. Agar lease muddati tugasa, bog'liq kalitlar ham o'chib ketadi."
    },
    {
      id: 7,
      question: "Taqsimlangan tizimda keep-alive nima maqsadda ishlatiladi?",
      options: [
        "Mavjud ijara (lease) muddatini uzaytirish uchun davriy so'rovlar yuborish",
        "Yangi serverlarni klasterga qo'shish",
        "Klasterdagi barcha loglarni tozalash",
        "Ma'lumotlarni boshqa klasterga nusxalash"
      ],
      correctAnswer: 0,
      explanation: "Keep-alive - ijarani o'z vaqtida yangilab, uning muddati tugashining oldini olish uchun yuboriladigan uzaytirish signallari mexanizmidir."
    },
    {
      id: 8,
      question: "Kubernetes-da Node Leases mexanizmi qaysi resursni tejash uchun joriy qilingan?",
      options: [
        "API Server va etcd ustidagi yuklama hamda tarmoq trafigini tejash",
        "Ishlatiladigan umumiy RAM hajmini kamaytirish",
        "Konteynerlar ichidagi xotirani optimallashtirish",
        "Faqat IP manzillar sonini kamaytirish"
      ],
      correctAnswer: 0,
      explanation: "Kubernetes-da Node statuslarini katta ob'ekt ko'rinishida yuborish o'rniga, kichik Lease ob'ekti orqali ping yuborish etcd yuklamasini kamaytiradi."
    },
    {
      id: 9,
      question: "Garbage Collection (GC) jarayonidagi 'Stop-the-world' failure detection-ga qanday ta'sir qiladi?",
      options: [
        "Dastur faoliyatini vaqtincha to'xtatgani sababli heartbeat yuborilmay qoladi va monitor uni 'o'lik' deb o'ylaydi",
        "Ulanish tezligini oshiradi",
        "Serverdagi barcha tugunlarni qayta ishga tushiradi",
        "Ma'lumotlar bazasini avtomatik tozalaydi"
      ],
      correctAnswer: 0,
      explanation: "GC pauzasi paytida barcha oqimlar to'xtashi sababli heartbeat yuborish to'xtaydi va tizim noto'g'ri nosozlik signali berishi mumkin."
    },
    {
      id: 10,
      question: "Consul-da session o'chganda nima sodir bo'ladi?",
      options: [
        "Session yaratgan mijozga tegishli barcha lock-lar avtomatik yechiladi",
        "Barcha serverlar o'chadi",
        "Faqat IP manzillar o'zgaradi",
        "Ma'lumotlar bazasi to'liq tozalab yuboriladi"
      ],
      correctAnswer: 0,
      explanation: "Consul sessionlari TTL muddati tugasa, ularga biriktirilgan barcha distributed lock va ephemeral keylar o'chirib yuboriladi."
    },
    {
      id: 11,
      question: "Juda qisqa heartbeat timeout muddati belgilashning salbiy oqibati nima?",
      options: [
        "Tarmoqdagi kichik kechikishlar tufayli ham noto'g'ri xatoliklar aniqlanib, klasterda to'xtovsiz qayta saylovlar boshlanishi",
        "Serverning jismoniy yonib ketishi",
        "Barcha ma'lumotlarning shifrsiz qolishi",
        "Foydalanuvchilarning parollari o'chib ketishi"
      ],
      correctAnswer: 0,
      explanation: "Kichik kechikishlar yoki yuklamalar tugunlarni 'DEAD' deb baholanishiga olib kelib, asossiz failover storms (qayta saylovlar) paydo qiladi."
    },
    {
      id: 12,
      question: "Fencing token qiymati qanday o'zgaradi?",
      options: [
        "Har safar yangi ijara (lease) berilganda yoki yangilanganda qiymati monoton ravishda oshib boradi",
        "Har doim 0 ga qaytadi",
        "Tasodifiy string ko'rinishida generatsiya bo'ladi",
        "Faqat kamayib boradi"
      ],
      correctAnswer: 0,
      explanation: "Fencing token har safar yangilanganda qiymat ortib boruvchi raqam bo'ladi, shunda eski so'rovlarni oson aniqlash mumkin."
    }
  ]
};
