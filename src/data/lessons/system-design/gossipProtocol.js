export const gossipProtocol = {
  id: "gossipProtocol",
  title: "Gossip Protocol (Mish-mish Protokoli)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Taqsimlangan tizimlarda yuzlab yoki minglab serverlar (tugunlar) mavjud bo'lganda, ularning qaysi biri ishlayotgani va qaysi biri o'chganini (membership) aniqlash yoki yangi ma'lumotlarni barcha tugunlarga tezkor yetkazish juda qiyin. Agar bitta markaziy serverdan foydalanilsa, u tizimning zaif nuqtasi (single point of failure) va yuklama yuqori nuqtasiga (bottleneck) aylanadi.

**Gossip Protocol (Mish-mish Protokoli)** — bu markazlashtirilmagan, Peer-to-Peer (P2P) aloqa usuli bo'lib, u xuddi jamiyatda mish-mishlar qanday tarqalsa, ma'lumotlarni klaster bo'ylab shunday tarqatadi.

### Mish-mish o'xshatishi:
Tasavvur qiling, maktabda 100 ta o'quvchi bor. Bir o'quvchi juda qiziq yangilik (mish-mish) bildi.
1. U tasodifiy 3 ta do'stiga borib bu gapni aytadi (Fan-out = 3).
2. O'sha 3 do'stning har biri yana o'z navbatida tasodifiy 3 tadan boshqa do'stlariga aytishadi.
3. Juda qisqa vaqt ichida deyarli butun maktab bu yangilikdan xabardor bo'ladi.
Hatto ba'zi do'stlar bu gapni boshqa joyda band bo'lgani yoki maktabga kelmagani uchun eshitmay qolsa ham, keyingi safar boshqalardan baribir eshitib oladi. Bu tizim juda bardoshli va hech qanday direktor (markaziy server) boshqaruvini talab qilmaydi.

---

## 2. 💻 Real Kod Misoli (Sodda Gossip Simulyatori)

Quyida tugunlarning tasodifiy sherik tanlab ma'lumot almashishi simulyatsiyasi keltirilgan:

\\\`\\\`\\\`javascript
class GossipNode {
  constructor(id, allNodeIds) {
    this.id = id;
    this.allNodeIds = allNodeIds;
    this.store = {}; // Tugun saqlayotgan ma'lumotlar
  }

  // Yangi ma'lumot qabul qilish yoki yangilash
  updateData(key, value, version) {
    const current = this.store[key];
    if (!current || current.version < version) {
      this.store[key] = { value, version };
      return true; // Ma'lumot yangilandi
    }
    return false;
  }

  // Tasodifiy bitta tugunni tanlash (o'zidan tashqari)
  selectRandomPeer() {
    const peers = this.allNodeIds.filter(peerId => peerId !== this.id);
    if (peers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * peers.length);
    return peers[randomIndex];
  }

  // Gossip yuborish (Rumor Mongering)
  gossip(nodesMap, key) {
    const peerId = this.selectRandomPeer();
    if (!peerId) return;

    const peerNode = nodesMap.get(peerId);
    const localData = this.store[key];

    if (localData && peerNode) {
      // Sherik tugunga mahalliy ma'lumotni push qiladi
      peerNode.updateData(key, localData.value, localData.version);
    }
  }
}

// Klasterni sinab ko'rish
const nodeIds = ["Node_A", "Node_B", "Node_C", "Node_D"];
const nodes = new Map();

nodeIds.forEach(id => {
  nodes.set(id, new GossipNode(id, nodeIds));
});

// Node_A yangi ma'lumot oladi
nodes.get("Node_A").updateData("config_v1", "active", 1);

// Gossip jarayoni bir necha raund davom etadi
for (let round = 1; round <= 3; round++) {
  nodes.forEach(node => {
    node.gossip(nodes, "config_v1");
  });
}

console.log("Node_D holati:", nodes.get("Node_D").store["config_v1"]);
\\\`\\\`\\\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Epidemic Broadcast Models
Gossip protokoli **Epidemiya (virus tarqalishi)** matematik modellariga asoslanadi. Klasterdagi tugunlar 3 ta holatda bo'lishi mumkin:
1. **Susceptible (Yuqishi mumkin):** Ma'lumotdan hali bexabar tugun.
2. **Infective (Yuqtiruvchi/Faol):** Ma'lumotni biladi va uni boshqalarga faol tarqatmoqda (Rumor Mongering).
3. **Removed (Sog'aygan/Nofaol):** Ma'lumotni biladi, lekin endi uni tarqatishni to'xtatgan.

### Anti-Entropy vs Rumor Mongering
* **Rumor Mongering (Mish-mish tarqatish):** Yangi ma'lumot kelganda, tugun uni tasodifiy $k$ ta tugunga yuboradi. Har safar allaqachon ma'lumotni biladigan tugunga duch kelganda, tarqatish ishtiyoqi kamayadi va ma'lum bir ehtimollik bilan tarqatish to'xtatiladi. Tarmoq trafigi minimal bo'ladi, lekin ba'zi tugunlar ma'lumotni ololmay qolish ehtimoli bor.
* **Anti-Entropy (Sinxronizatsiya):** Tugunlar davriy ravishda tasodifiy sherik tanlaydi va butun ma'lumotlar omborini solishtiradi (ko'pincha **Merkle Tree** yordamida). Bu barcha tugunlarning 100% bir xil ma'lumotga ega bo'lishini (eventual consistency) kafolatlaydi, ammo tarmoqqa yuqori yuklama beradi.

### SWIM Protocol (Structured Weakness-isolation Membership)
SWIM — bu tarmoq xizmatlarida a'zolikni (membership) saqlash va nosozliklarni aniqlash (failure detection) uchun ishlatiladigan juda mashhur gossip protokolidir. U 2 ta asosiy komponentdan iborat:

1. **Failure Detector (Nosozlikni aniqlash):**
   * **Ping:** $A$ tuguni $B$ tuguniga to'g'ridan-to'g'ri ping yuboradi. Agar javob (Ack) kelmasa, $A$ uni darhol o'chgan deb hisoblamaydi (tarmoq muammosi bo'lishi mumkin).
   * **Ping-Req (Indirect Ping):** $A$ tuguni bir nechta tasodifiy yordamchi tugunlarga ($C$ va $D$) so'rov yuboradi: *"Iltimos, sizlar ham B ga ping yuborib ko'ringlar-chi"*. Agar hech kim $B$ dan javob ololmasa, $B$ shubhali (\`Suspect\`) deb e'lon qilinadi.
2. **Suspicion Mechanism (Shubha mexanizmi):**
   * Agar tugun shubhali deb hisoblansa, unga ma'lum vaqt beriladi. Agar bu vaqt ichida tugun o'zining tirikligini isbotlovchi xabar yubormasa, u klasterdan o'chirilagi. Bu noto'g'ri xatolik signalini (false positive) kamaytiradi.

\\\`\\\`\\\`mermaid
sequenceDiagram
    participant Node A
    participant Node B (Target)
    participant Node C (Helper)
    
    Note over Node A, Node B: 1. To'g'ridan-to'g'ri Ping
    Node A->>Node B: Ping
    Note right of Node B: Javob bermadi (Packet loss yoki band)
    
    Note over Node A, Node C: 2. Indirect Ping (Ping-Req)
    Node A->>Node C: Ping-Req(B)
    Node C->>Node B: Ping
    Node B-->>Node C: Ack
    Node C-->>Node A: Ack(B orqali)
    Note over Node A: Node A B-ni tirik deb biladi!
\\\`\\\`\\\`

### Vector Clocks / Lamport Timestamps
Taqsimlangan tizimda global soat (real time clock) bo'lmagani uchun ma'lumotlarning qay biri yangi ekanligini bilish qiyin. Gossip protokollarida har bir ma'lumot o'zgarishi mantiqiy soat yoki versiya raqami bilan belgilanadi. **Vector Clocks** har bir tugunning klaster haqidagi soatlar ro'yxatini saqlaydi va konfliktlarni hal qilishga yordam beradi.

---

## 4. ❌ Keng tarqalgan xatolar (Junior Mistakes)

1. **Cheksiz tarqalish (Broadcast Storm):** Mish-mishlarni tarqatishda cheklov (TTL yoki max spread counter) qo'yilmasa, vaqtinchalik xabarlar ham cheksiz aylanib, tarmoqni to'ldirib yuboradi.
2. **TCP-ni haddan ortiq ishlatish:** Gossip xabarlari juda kichik va tez-tez bo'lgani uchun TCP handshake qo'shimcha yuklama (overhead) yaratadi. Shu sababli ko'pgina gossip protokollari UDP transportidan foydalanadi.
3. **Static Peer Lists:** Barcha tugunlar ro'yxatini statik qilish. Real klasterda tugunlar dinamik ravishda qo'shiladi va o'chadi. Shuning uchun membership gossip orqali bu ro'yxatni yangilab turish kerak.

---

## 5. 🏢 Real tizimlarda qo'llanilishi

* **Apache Cassandra:** Klaster a'zolarini aniqlash, ma'lumotlarni replikatsiya qilish va tugunlarning yuklamasini bilish uchun Gossip-dan foydalanadi.
* **HashiCorp Consul:** Klaster a'zoligi va nosozliklarni aniqlash uchun SWIM protokoliga asoslangan **Serf** kutubxonasidan foydalanadi.
* **Redis Cluster:** Tugunlar o'rtasida konfiguratsiya almashish va avtomatik nosozliklarni aniqlash (failover) uchun gossip aloqasini qo'llaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyida exercises bo'limida bajaring.

---

## 7. 📝 12 ta Mini Test

Testlar orqali bilimingizni tekshiring.

---

## 8. 🎯 Real Project Case Study: Consul va Serf failure detection

Consul tizimida har bir server va agent har soniyada tasodifiy tugunlarga UDP paketlari orqali ping yuboradi. Agar javob ololmasa, u 3 ta tasodifiy tugunga \`ping-req\` yuboradi. Bu tarmoqning mahalliy uzilishlari tufayli noto'g'ri ogohlantirishlar (false alarms) berilishini oldini oladi.

---

## 9. 🧠 Klasterda Gossip Tarqalishi

\\\`\\\`\\\`mermaid
graph TD
    A[Node A: Yangi yangilik] -->|Gossip| B[Node B]
    A -->|Gossip| C[Node C]
    B -->|Gossip| D[Node D]
    C -->|Gossip| E[Node E]
    D -.->|Allaqachon biladi| C
    E -->|Gossip| F[Node F]
\\\`\\\`\\\`

---

## 10. 📌 Cheat Sheet

| Tushuncha | Vazifasi | Asosiy xususiyati |
| :--- | :--- | :--- |
| **Rumor Mongering** | Mish-mish tarqatish | Tez tarqalish, kam trafik |
| **Anti-Entropy** | To'liq holat sinxronizatsiyasi | Merkle daraxtlari yordamida to'liq mustahkamlik |
| **SWIM** | A'zolik va xatoliklarni aniqlash | Ping + Ping-Req orqali shubha hosil qilish |
| **Fan-out** | Bitta raundda tanlanadigan sheriklar soni | O(log N) tarqalish tezligini belgilaydi |
`,
  exercises: [
    {
      id: 1,
      title: "Sherik tanlash logikasi (Peer Target Selection)",
      instruction: "Klasterdagi tugun o'zidan boshqa va berilgan cheklov (`maxCount`) gacha bo'lgan tasodifiy tugunlar ro'yxatini tanlashi kerak. `selectGossipTargets(currentNodeId, allNodeIds, maxCount)` funksiyasini yozing. Tanlangan tugunlar takrorlanmasligi kerak.",
      startingCode: "function selectGossipTargets(currentNodeId, allNodeIds, maxCount) {\n  // Kodni shu yerda yozing\n}",
      hint: "currentNodeId ni filtrlang, keyin qolgan massivni aralashtiring (shuffle) yoki tasodifiy indekslar yordamida maxCount gacha element oling.",
      test: "if (typeof selectGossipTargets !== 'function') return 'selectGossipTargets funksiya bo\\'lishi kerak';\nconst list = ['A', 'B', 'C', 'D'];\nconst res = selectGossipTargets('A', list, 2);\nif (res.includes('A')) return 'Joriy tugun tanlanmasligi kerak';\nif (res.length > 2) return 'maxCount dan ko\\'p element tanlandi';\nif (new Set(res).size !== res.length) return 'Tugunlar takrorlanmasligi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "Versiyaga asoslangan ma'lumotlarni solishtirish (State Reconciliation)",
      instruction: "Taqsimlangan ma'lumotlar omborida ma'lumotlarning eng yangi versiyasi qolishi shart. `reconcileState(localState, remoteState)` funksiyasini yozing. U mahalliy va masofaviy holatni birlashtiradi. Har bir kalit uchun `{ value: any, version: number }` ko'rinishida ma'lumot saqlanadi. Agar versiya teng bo'lsa, local qiymat ustuvor bo'ladi.",
      startingCode: "function reconcileState(localState, remoteState) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ikkala obyektning kalitlarini oling va har bir kalit uchun versiyalarni solishtiring. Katta versiyali qiymatni natijada saqlang.",
      test: "if (typeof reconcileState !== 'function') return 'reconcileState funksiya emas';\nconst local = { name: { value: 'A', version: 1 }, age: { value: 20, version: 3 } };\nconst remote = { name: { value: 'B', version: 2 }, age: { value: 25, version: 2 }, city: { value: 'Tashkent', version: 1 } };\nconst res = reconcileState(local, remote);\nif (res.name.value !== 'B' || res.name.version !== 2) return 'Katta versiya qabul qilinmadi';\nif (res.age.value !== 20 || res.age.version !== 3) return 'Mahalliy kattaroq versiya saqlanmadi';\nif (!res.city || res.city.value !== 'Tashkent') return 'Yangi kalit qo\\'shilmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "SWIM Indirect Ping Simulyatsiyasi",
      instruction: "Agar tugunga to'g'ridan-to'g'ri ping muvaffaqiyatsiz bo'lsa, boshqa yordamchi tugunlar orqali ping yuborish kerak. `sendIndirectPing(targetId, helpers, pingFn)` funksiyasini yozing. `pingFn(helperId, targetId)` asinxron funksiya bo'lib, `true` yoki `false` qaytaradi. Agar yordamchi tugunlardan kamida bittasi maqsadli tugunni tirik deb topsa (`true`), funksiya ham `true` qaytarsin. Agar barchasi `false` bo'lsa yoki yordamchilar bo'lmasa, `false` qaytarsin. Qidiruvni parallel bajarish tavsiya etiladi.",
      startingCode: "async function sendIndirectPing(targetId, helpers, pingFn) {\n  // Kodni shu yerda yozing\n}",
      hint: "Promise.all yordamida helpers massividagi har bir helper uchun pingFn ni ishga tushiring va natijalarni tekshiring.",
      test: "if (typeof sendIndirectPing !== 'function') return 'sendIndirectPing funksiya emas';\nconst pingFn = async (h, t) => h === 'C';\nreturn sendIndirectPing('target', ['B', 'C', 'D'], pingFn).then(res => {\n  if (res !== true) return 'Indirect ping muvaffaqiyatli bo\\'lishi kerak edi';\n  return sendIndirectPing('target', ['B', 'D'], pingFn).then(res2 => {\n    if (res2 !== false) return 'Barcha helperlar javob bermasa false bo\\'lishi kerak';\n    return null;\n  });\n});"
    },
    {
      id: 4,
      title: "Klaster A'zoligi Yangilanishi (Membership Updates)",
      instruction: "SWIM protokolida a'zolik holatlari o'zgarishini boshqarish qoidalari mavjud. `updateMembership(localMembership, update)` funksiyasini yozing. Har bir tugun holati `{ status: 'alive'|'suspect'|'dead', incarnation: number }` ko'rinishida bo'ladi. Qoidalar:\n1. Yangi ma'lumotning `incarnation` qiymati kattaroq bo'lsa, har doim yangilansin.\n2. Agar `incarnation` teng bo'lsa, ustuvorlik: `dead` > `suspect` > `alive` bo'ladi.\n3. Agar `incarnation` kichik bo'lsa, yangilanish inkor qilinadi.",
      startingCode: "function updateMembership(localState, update) {\n  // Kodni shu yerda yozing\n}",
      hint: "Avval localState da tugun bor-yo'qligini tekshiring, agar yo'q bo'lsa darhol qo'shing. Agar bor bo'lsa, incarnation va status ustuvorligini solishtiring.",
      test: "if (typeof updateMembership !== 'function') return 'updateMembership funksiya emas';\nconst local = { 'node1': { status: 'alive', incarnation: 1 } };\nupdateMembership(local, { nodeId: 'node1', status: 'suspect', incarnation: 1 });\nif (local['node1'].status !== 'suspect') return 'Teng incarnationda suspect ustun bo\\'lishi kerak';\nupdateMembership(local, { nodeId: 'node1', status: 'alive', incarnation: 2 });\nif (local['node1'].status !== 'alive' || local['node1'].incarnation !== 2) return 'Katta incarnation yangilanishi kerak';\nupdateMembership(local, { nodeId: 'node1', status: 'dead', incarnation: 1 });\nif (local['node1'].status !== 'alive') return 'Kichik incarnationdagi dead e\\'tiborga olinmasligi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "Mish-mishlarni tarqatishni to'xtatish (Rumor Mongering Termination)",
      instruction: "Mish-mish klaster bo'ylab tarqalayotganda cheksiz aylanib qolmasligi uchun uni tarqatish sonini cheklash lozim. `shouldStopGossiping(rumorKey, activeRumors, maxSpreads)` funksiyasini yozing. `activeRumors` bu xabarlarni necha marta jo'natilganini hisoblovchi Map obyekti. Xabar har safar yuborilganda hisoblagichni 1 ga oshiring. Agar hisoblagich `maxSpreads` dan oshsa yoki teng bo'lsa, `true` qaytaring (tarqatish to'xtaydi), aks holda `false`.",
      startingCode: "function shouldStopGossiping(rumorKey, activeRumors, maxSpreads) {\n  // Kodni shu yerda yozing\n}",
      hint: "Map.get(rumorKey) orqali qiymatni oling, uni 1 ga oshirib Map-ga qayta saqlang va keyin maxSpreads bilan taqqoslang.",
      test: "if (typeof shouldStopGossiping !== 'function') return 'shouldStopGossiping funksiya emas';\nconst map = new Map();\nif (shouldStopGossiping('rumor_1', map, 2) !== false) return 'Birinchi yuborishda to\\'xtamasligi kerak';\nif (shouldStopGossiping('rumor_1', map, 2) !== true) return 'Ikkinchi yuborishda (limitga yetganda) to\\'xtashi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "Tarmoq Yo'qotishlarini Simulyatsiya Qilish (Packet Loss Simulator)",
      instruction: "Gossip protokollari UDP orqali ishlashi sababli paket yo'qolishiga duch keladi. Paket yuborilishini simulyatsiya qiluvchi `reliableGossipSend(packet, lossRate, sendFn)` funksiyasini yozing. Funksiya tasodifiy son generatsiya qilib, agar u `lossRate` (0 va 1 oralig'idagi son) dan katta bo'lsa, `sendFn(packet)` ni ishga tushirsin va `true` qaytarsin. Agar paket yo'qolsa, `false` qaytarsin.",
      startingCode: "function reliableGossipSend(packet, lossRate, sendFn) {\n  // Kodni shu yerda yozing\n}",
      hint: "Math.random() dan foydalanib, natija lossRate dan katta yoki kichikligini tekshiring.",
      test: "if (typeof reliableGossipSend !== 'function') return 'reliableGossipSend funksiya emas';\nlet sent = false;\nconst res = reliableGossipSend('hello', 0, () => { sent = true; });\nif (!res || !sent) return '0% loss bo\\'lganda paket albatta yetib borishi shart';\nlet sent2 = false;\nconst res2 = reliableGossipSend('hello', 1.0, () => { sent2 = true; });\nif (res2 || sent2) return '100% loss bo\\'lganda paket yuborilmasligi shart';\nreturn null;"
    },
    {
      id: 7,
      title: "Shubha Taymeri (Suspicion Tracker)",
      instruction: "SWIM-da tugun shubhali deb belgilangach, ma'lum muddat ichida o'zini tirikligini isbotlamasa, o'lik deb e'lon qilinadi. `SuspicionTracker` klassini yarating. U `suspectNode(nodeId, timeoutMs, onDead)` va `confirmAlive(nodeId)` metodlariga ega bo'lsim. Agar `confirmAlive` belgilangan vaqtdan oldin chaqirilsa, taymer bekor qilinsin va `onDead` chaqirilmasin.",
      startingCode: "class SuspicionTracker {\n  constructor() {\n    this.timers = new Map();\n  }\n\n  suspectNode(nodeId, timeoutMs, onDead) {\n    // Kodni shu yerda yozing\n  }\n\n  confirmAlive(nodeId) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "suspectNode ichida setTimeout yarating va uning IDsini timers Map-da saqlang. confirmAlive chaqirilganda clearTimeout orqali taymerni o'chiring.",
      test: "if (typeof SuspicionTracker !== 'function') return 'SuspicionTracker klass bo\\'lishi kerak';\nconst tracker = new SuspicionTracker();\nlet deadNodes = [];\ntracker.suspectNode('nodeA', 20, (id) => deadNodes.push(id));\ntracker.suspectNode('nodeB', 20, (id) => deadNodes.push(id));\ntracker.confirmAlive('nodeA');\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (deadNodes.includes('nodeB') && !deadNodes.includes('nodeA')) resolve(null);\n    else resolve('Taymerlar yoki tasdiqlash to\\'g\\'ri ishlamadi');\n  }, 30);\n});"
    },
    {
      id: 8,
      title: "Anti-Entropy Farqlarni Aniqlash (Consistency Check)",
      instruction: "Anti-entropy jarayonida ikki tugun o'z holatlarini solishtiradi va farqli kalitlarni topadi. `antiEntropyCheck(nodeAState, nodeBState)` funksiyasini yozing. U ikki holatda mavjud bo'lmagan yoki har xil versiyaga ega bo'lgan kalitlar ro'yxatini (massiv) qaytarsin. Holat formati: `{ key: { value, version } }`.",
      startingCode: "function antiEntropyCheck(nodeAState, nodeBState) {\n  // Kodni shu yerda yozing\n}",
      hint: "Barcha kalitlar to'plamini (Set) yarating, keyin har bir kalit uchun versiyalarni taqqoslang va mos kelmaganlarini massivga qo'shing.",
      test: "if (typeof antiEntropyCheck !== 'function') return 'antiEntropyCheck funksiya emas';\nconst stateA = { a: { version: 1 }, b: { version: 2 } };\nconst stateB = { b: { version: 2 }, c: { version: 1 } };\nconst diff = antiEntropyCheck(stateA, stateB);\nif (!diff.includes('a') || !diff.includes('c') || diff.includes('b')) return 'Farqlar noto\\'g\\'ri hisoblandi';\nreturn null;"
    },
    {
      id: 9,
      title: "Lamport Mantiqiy Soati (Logical Clock Update)",
      instruction: "Taqsimlangan hodisalarni tartiblash uchun har safar yangi hodisa yuz berganda mantiqiy soat oshiriladi. `updateLogicalClock(localClock, incomingClock)` funksiyasini yozing. U yangi soat qiymatini qaytarsin. Qoida: `Math.max(localClock, incomingClock) + 1`.",
      startingCode: "function updateLogicalClock(localClock, incomingClock) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ikkita raqamni solishtirib eng kattasini oling va unga 1 qo'shing.",
      test: "if (typeof updateLogicalClock !== 'function') return 'updateLogicalClock topilmadi';\nif (updateLogicalClock(5, 8) !== 9) return 'Soat yangilash xato';\nif (updateLogicalClock(10, 4) !== 11) return 'Mahalliy soat katta bo\\'lgan holat xato';\nreturn null;"
    },
    {
      id: 10,
      title: "Gossip Klasterida Ma'lumot Tarqatish (Simulation Tick)",
      instruction: "Gossip-da ma'lumot tarqatish har bir tugunning o'zidan boshqa bitta tasodifiy tugunni tanlab, agar unda ushbu `key` bo'lsa, sherigining holatini yangilashini (push-based) simulyatsiya qilish orqali amalga oshadi. `simulateGossipTick(nodes, key)` funksiyasini yozing. State reconcile qoidalari (katta versiya ustun) amal qilsin.",
      startingCode: "function simulateGossipTick(nodes, key) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir tugun uchun tasodifiy peer tanlang. Agar joriy tugunda key bo'lsa, peer.store dagi key ning versiyasi bilan solishtirib yangilang.",
      test: "if (typeof simulateGossipTick !== 'function') return 'simulateGossipTick funksiya emas';\nconst nodes = new Map([\n  ['A', { id: 'A', store: { val: { value: 'X', version: 2 } } }],\n  ['B', { id: 'B', store: {} }]\n]);\n// A faqat B ni tanlay oladi\nnodes.get('A').selectRandomPeer = () => 'B';\nnodes.get('B').selectRandomPeer = () => 'A';\nsimulateGossipTick(nodes, 'val');\nif (!nodes.get('B').store['val'] || nodes.get('B').store['val'].value !== 'X') return 'Gossip tikda ma\\'lumot tarqalmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Gossip Protokolining asosiy g'oyasi nima?",
      options: [
        "Klasterdagi tugunlar tasodifiy sherik tanlab ma'lumot almashadi",
        "Markaziy server barcha tugunlarga ma'lumotlarni ketma-ket tarqatadi",
        "Ma'lumotlar faqat bitta tugunda shifrlanadi",
        "Faqat ma'lumotlar bazasini optimallashtirish uchun SQL yozadi"
      ],
      correctAnswer: 0,
      explanation: "Gossip protokoli insonlar orasidagi mish-mishlar kabi ishlaydi: har bir tugun davriy ravishda tasodifiy sherik tanlab, u bilan ma'lumot almashadi."
    },
    {
      id: 2,
      question: "Anti-Entropy gossip modelining asosiy xususiyati nimada?",
      options: [
        "U faqat kichik xabarlarni tezkor tarqatish uchun ishlatiladi",
        "U ikki tugunning butun holatini solishtirib, farqlarni to'liq bartaraf etadi",
        "U faqat xatoliklarni aniqlaydi, ma'lumot tarqatmaydi",
        "U klasterdagi barcha tugunlarni o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Anti-Entropy modeli davriy ravishda tugunlarning butun holatini solishtiradi va to'liq sinxronizatsiyani (eventual consistency) kafolatlaydi."
    },
    {
      id: 3,
      question: "Rumor Mongering uslubida xabarning tarqalishi qanday to'xtatiladi?",
      options: [
        "Tizim admini qo'lda to'xtatadi",
        "Xabar allaqachon ma'lumotdan xabardor tugunga yuborilganda, tarqatish ehtimolligi kamaytiriladi",
        "Faqat server xotirasi to'lganda to'xtaydi",
        "Klasterdagi barcha tugunlar o'chganda"
      ],
      correctAnswer: 1,
      explanation: "Rumor Mongering-da xabar oluvchi tugun allaqachon ma'lumotga ega bo'lsa, yuboruvchi buni 'mish-mish eskirgan' deb biladi va uni tarqatishni ma'lum ehtimollik bilan to'xtatadi."
    },
    {
      id: 4,
      question: "SWIM protokolida Ping-Req (Indirect Ping) qanday muammoni bartaraf qiladi?",
      options: [
        "Trafikni shifrlash muammosini",
        "Tarmoqning mahalliy uzilishlari tufayli tugunni noto'g'ri 'o'lik' deb e'lon qilishni",
        "Klasterda yangi IP manzillar yetishmasligini",
        "Ma'lumotlar replikatsiyasi konfliktlarini"
      ],
      correctAnswer: 1,
      explanation: "Agar A dan B ga ping bormasa, A boshqa tugunlardan B ni tekshirishni so'raydi. Bu tarmoqning mahalliy uzilishlari sababli noto'g'ri xatolik aniqlanishini kamaytiradi."
    },
    {
      id: 5,
      question: "SWIM protokolida 'Suspicion' (shubha) mexanizmi nima?",
      options: [
        "Tugunlar bir-biriga ruxsatsiz so'rov yuborganda xavfsizlik blokirovkasini yoqish",
        "Ping javob bermagan tugunni darhol o'chirmay, ma'lum vaqt 'shubhali' deb belgilash va unga o'zining tirikligini isbotlashga imkon berish",
        "SQL tranzaksiyalarini bekor qilish",
        "Klasterdagi shubhali paketlarni o'chirib tashlash"
      ],
      correctAnswer: 1,
      explanation: "Suspicion mexanizmi vaqtinchalik tarmoq kechikishi yoki band bo'lgan tugunlarni darhol o'lik deb e'lon qilmaslik uchun shubhali davr yaratadi."
    },
    {
      id: 6,
      question: "Gossip protokollarining tarqalish vaqti (propagation time) qanday o'sadi?",
      options: [
        "Klaster hajmi N ga nisbatan logarifmik: O(log N)",
        "Klaster hajmi N ga nisbatan chiziqli: O(N)",
        "Klaster hajmi N ga nisbatan kvadratik: O(N^2)",
        "Tugunlar soniga bog'liq bo'lmagan o'zgarmas: O(1)"
      ],
      correctAnswer: 0,
      explanation: "Epidemik tarqalish logarifmik tezlikka ega. Ya'ni klaster tugunlari soni eksponental ravishda oshsa ham, tarqalish vaqti chiziqli (yoki logarifmik raundlarda) oshadi."
    },
    {
      id: 7,
      question: "Gossip protokoli tarmoq transporti sifatida nega asosan UDP ni afzal ko'radi?",
      options: [
        "Chunki UDP tranzaksiyalarni qo'llab-quvvatlaydi",
        "Chunki u TCP handshake va ulanishni saqlash overheadlaridan qochib, tez va yengil aloqa beradi",
        "Chunki UDP faqat xavfsiz shifrlangan tarmoqlarda ishlaydi",
        "Chunki brauzerlar faqat UDP ni tushunadi"
      ],
      correctAnswer: 1,
      explanation: "Gossip paketlari tez-tez va kichik bo'ladi. TCP handshake va qayta yuborish mexanizmlari klasterda juda katta tarmoq yuki yaratadi, shuning uchun UDP afzal ko'riladi."
    },
    {
      id: 8,
      question: "Taqsimlangan tizimlarda vaqt konfliktlarini hal qilishda Lamport Timestamps qanday vazifani bajaradi?",
      options: [
        "Tugunlar o'rtasida hodisalarning mantiqiy tartibini belgilaydi",
        "Serverlarning jismoniy soatini mikrosaniyagacha sinxronlaydi",
        "Foydalanuvchi tizimga kirgan vaqtini tekshiradi",
        "Ma'lumotlar bazasini avtomatik zaxira nusxalaydi"
      ],
      correctAnswer: 0,
      explanation: "Mantiqiy soatlar jismoniy vaqtga bog'lanmagan holda, taqsimlangan tizimda qaysi hodisa qaysi biridan oldin yuz berganini (causal ordering) aniqlash uchun xizmat qiladi."
    },
    {
      id: 9,
      question: "Junior dasturchilar gossip tizimlarini yozishda yo'l qo'yadigan 'Broadcast Storm' xatosi nima?",
      options: [
        "Faqat bitta tugunga barcha ma'lumotlarni yuborish",
        "Mish-mish tarqalishiga cheklov qo'ymay, tarmoqni cheksiz takroriy xabarlar bilan to'ldirib yuborish",
        "SQL ma'lumotlar bazasini noto'g'ri sozlash",
        "Klasterda IP manzillarni noto'g'ri taqsimlash"
      ],
      correctAnswer: 1,
      explanation: "Broadcast Storm xabarning tarqalish limitlari (max transmission count) bo'lmaganda yuz beradi va klasterdagi barcha tugunlar bir-biriga tinimsiz eski ma'lumotlarni yuboraveradi."
    },
    {
      id: 10,
      question: "Consul va Redis Cluster kabi arxitekturalarda gossip qayerda qo'llaniladi?",
      options: [
        "Tugunlarning a'zolik holati va xatoliklarini markazsiz aniqlashda",
        "Faqat foydalanuvchilar parolini tekshirishda",
        "Rasmlarni keshlash va qayta ishlashda",
        "Frontend fayllarini yetkazib berishda (CDN)"
      ],
      correctAnswer: 0,
      explanation: "Consul (Serf orqali) va Redis Cluster o'z klasteridagi tugunlar qachon qo'shilgani yoki o'chganini markazsiz holda kuzatish uchun gossip xabarlaridan foydalanadi."
    },
    {
      id: 11,
      question: "SWIM failure detector arxitekturasining asosiy maqsadi nima?",
      options: [
        "Ma'lumotlarni to'liq replikatsiya qilish",
        "Klaster a'zoligi ro'yxatini va nosoz tugunlarni tezkor hamda minimal resurs sarflab aniqlash",
        "Tugunlar orasidagi ma'lumotlarni shifrlash",
        "Ma'lumotlar omborini sharding qilish"
      ],
      correctAnswer: 1,
      explanation: "SWIM protokoli minimal tarmoq trafigi bilan klasterdagi barcha tugunlar holatini aniq va barqaror kuzatish imkonini beradi."
    },
    {
      id: 12,
      question: "Gossip-da Fan-out parametri nimani anglatadi?",
      options: [
        "O'chiriladigan tugunlar sonini",
        "Har bir raundda ma'lumot yuboriladigan tasodifiy sherik tugunlar sonini",
        "Mish-mishning baytlardagi o'lchamini",
        "Klasterdagi jami tugunlar sonini"
      ],
      correctAnswer: 1,
      explanation: "Fan-out — bir tugun o'z navbatida necha dona tasodifiy tugunga gossip xabarini tarqatishini belgilaydigan koeffitsiyentdir."
    }
  ]
};
