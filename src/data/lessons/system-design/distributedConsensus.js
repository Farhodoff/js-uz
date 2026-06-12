export const distributedConsensus = {
  id: "distributedConsensus",
  title: "Distributed Consensus (Taqsimlangan Konsensus)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Taqsimlangan tizimlarda bir nechta mustaqil kompyuterlar (tugunlar yoki node'lar) umumiy bir qarorga kelishi kerak. Masalan, qaysi ma'lumot oxirgi va to'g'ri ekanligi yoki hozirda klasterda kim "Lider" ekanligini kelishib olish zarur. Bu jarayon **Distributed Consensus (Taqsimlangan Konsensus)** deb ataladi.

### Saylov Komissiyasi analogiyasi:
Tasavvur qiling, 5 ta hakamdan iborat hay'at a'zolari bor. Ular umumiy bayonnomaga yangi qoidalarni kiritishi kerak.
- Agar hakamlar o'rtasidagi telefon liniyasi uzilib qolsa va ular guruhlarga bo'linib ketsa (tarmoq bo'linishi - network partition), qanday qaror qabul qilinadi?
- Qoida oddiy: Qaror qabul qilinishi uchun kamida **Kvorum (ko'pchilik)**, ya'ni kamida 3 ta hakam (5 ning yarmidan ko'pi) rozilik berishi shart.
- Agar 2 ta hakam bir xonada, 3 ta hakam ikkinchi xonada qolib ketsa, faqat 3 ta hakam bo'lgan xonadagilar qaror qabul qila oladi, chunki ular ko'pchilikni tashkil etadi. 2 ta hakam bo'lgan xona esa qaror qabul qilishni to'xtatib turadi. Bu **Split-brain (ikki xil boshqaruv)** muammosini oldini oladi.

---

## 2. 💻 Real Kod Misollari

Quyida Raft konsensus algoritmining soddalashtirilgan Liderlik va Kvorumni aniqlash tizimi keltirilgan:

\\\`\\\`\\\`javascript
class RaftNode {
  constructor(id, totalNodes) {
    this.id = id;
    this.totalNodes = totalNodes;
    this.term = 0;
    this.state = "Follower"; // Follower, Candidate, Leader
    this.votesReceived = 0;
  }

  // Heartbeat kelganda Follower holatida qoladi yoki yangi termni qabul qiladi
  receiveHeartbeat(leaderId, leaderTerm) {
    if (leaderTerm >= this.term) {
      this.term = leaderTerm;
      this.state = "Follower";
      return true;
    }
    return false;
  }

  // Saylov boshlash
  startElection() {
    this.state = "Candidate";
    this.term += 1;
    this.votesReceived = 1; // o'ziga o'zi ovoz beradi
    console.log("Node " + this.id + " term " + this.term + " uchun saylov boshladi!");
  }

  // Ovoz berish qoidasi
  requestVote(candidateId, candidateTerm) {
    if (candidateTerm > this.term) {
      this.term = candidateTerm;
      this.state = "Follower";
      return true; // Ovoz beradi
    }
    return false; // Rad etadi
  }

  // Ovozlar kvorumga yetganini tekshirish
  checkQuorum() {
    const requiredVotes = Math.floor(this.totalNodes / 2) + 1;
    if (this.votesReceived >= requiredVotes) {
      this.state = "Leader";
      return true;
    }
    return false;
  }
}
\\\`\\\`\\\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Paxos vs Raft:
- **Paxos:** Birinchi keng tarqalgan konsensus algoritmi. Matematik jihatdan mukammal bo'lsa-da, uni tushunish va amalda qo'llash o'ta murakkab.
- **Raft:** Paxos bilan bir xil xavfsizlik va samaradorlikni ta'minlaydi, lekin tushunish va loyihalash oson bo'lishi uchun maxsus ishlab chiqilgan. Raft tizimni aniq qismlarga bo'ladi: Lider saylovi, Loglarni replikatsiya qilish va Xavfsizlik.

### 2. Raft Node Holatlari:
- **Follower (Ergashuvchi):** Lider yoki Candidate'lardan kelayotgan so'rovlarga faqat javob beradi. Agar belgilangan vaqt ichida heartbeat kelmasa, Candidate holatiga o'tadi.
- **Candidate (Nomzod):** Yangi saylov boshlaydi, boshqa tugunlardan ovoz so'raydi.
- **Leader (Lider):** Barcha mijoz so'rovlarini qabul qiladi, loglarni replikatsiya qiladi va vaqti-vaqti bilan Heartbeat yuboradi.

### 3. Log Replication (Loglarni nusxalash):
Mijoz Liderga buyruq yuborganda, Lider uni dastlab o'z logiga yozadi, lekin **commit** (yakuniy tasdiqlash) qilmaydi. U ushbu logni barcha Follower'larga AppendEntries RPC orqali yuboradi. Qachonki ko'pchilik (Kvorum) tugunlar logni muvaffaqiyatli saqlaganini tasdiqlasa, Lider logni commit qiladi va Follower'larga ham commit qilishni buyuradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Juft sonli tugunlar bilan klaster yaratish:** Klasterda 4 ta tugun bo'lsa, kvorum uchun 3 ta ovoz kerak. Agar tarmoq teng 2 ga bo'linsa (2 vs 2), hech bir taraf kvorum yig'a olmaydi va butun tizim ishdan to'xtaydi. Shuning uchun har doim toq sonli (3, 5, 7) tugunlardan foydalanish tavsiya etiladi.
2. **Split-brain sharoitida eski Liderni cheklamaslik:** Eski Lider tarmoq bo'linishi tufayli boshqa tugunlardan ajralib qolganda ham o'zini Lider deb hisoblab mijozlardan ma'lumot qabul qilaverishi mumkin. Raft buni term raqamlari orqali hal qiladi. Yangi tarmoq segmentida saylangan yangi Liderning term raqami baland bo'ladi va eski lider buni bilgan zaxoti Follower holatiga tushadi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Distributed Consensus nima?**
Taqsimlangan tizimda bir nechta mustaqil mashinalarning yagona holat yoki ma'lumot bo'yicha kelishuvga erishish jarayoni.

**2. Quorum (Kvorum) qanday hisoblanadi?**
Tizimdagi umumiy tugunlar sonining yarmidan ko'pini tashkil etuvchi minimal miqdor: $Q = \\\\lfloor N/2 \\\\rfloor + 1$.

**3. Split-brain ssenariysi nima?**
Tarmoq bo'linishi sababli klaster ikki guruhga ajralib, har bir guruh o'z liderini saylab, bir-biridan mustaqil ravishda ish yuritishi.

**4. Raft-da nomzod (Candidate) qanday qilib Lider bo'ladi?**
Tugunlarning ko'pchiligidan (Kvorumdan) tasdiqlovchi ovoz olganida.

**5. Paxos algoritmining Raft'dan farqi nimada?**
Paxos ancha murakkab tuzilishga ega va holatlarga bo'linmagan. Raft esa tushunarli va boshqarish oson bo'lishi uchun Leader saylovi va Log replikatsiyasini alohida bosqichlarga ajratgan.

**6. Heartbeat nima va u nima uchun kerak?**
Lider tomonidan o'zining tirik ekanligini bildirish va boshqa tugunlarni saylov boshlashdan to'xtatish uchun yuboriladigan bo'sh AppendEntries so'rovi.

**7. Raft-da loglar qachon commit qilingan hisoblanadi?**
Lider log nusxasini klasterdagi ko'pchilik (kvorum) tugunlarga muvaffaqiyatli replikatsiya qilgandan keyin.

**8. Nima uchun klasterda 3 yoki 5 ta tugun bo'lishi afzal, 4 ta esmas?**
Chunki 3 ta tugunda ham, 4 ta tugunda ham kvorum 3 ga teng. 4 ta tugunli tizim ortiqcha resurs talab qilsa-da, bardoshlilikni (fault tolerance) oshirmaydi.

**9. Zookeeper, etcd va Consul o'rtasidagi umumiylik nima?**
Ularning barchasi taqsimlangan konsensus algoritmlaridan (Raft yoki Zab) foydalanib, konfiguratsiya va service discovery uchun barqaror key-value ma'lumotlar omborini taqminlaydi.

**10. Saylov taymauti (Election Timeout) nima?**
Follower liderdan heartbeat kutadigan vaqt oralig'i. Agar shu vaqtda heartbeat kelmasa, u o'zini Candidate deb e'lon qiladi.

**11. Raft-da "term" (davr) nima vazifani bajaradi?**
Term - bu mantiqiy soat vazifasini bajaruvchi monoton o'sib boruvchi son bo'lib, eski va yangi ma'lumotlarni, shuningdek, eskirgan liderlarni aniqlashga yordam beradi.

**12. Agar Follower'ning logi Lidernikidan farq qilsa nima bo'ladi?**
Lider o'z logini to'g'ri deb hisoblaydi va Follower logidagi nomuvofiqliklarni o'z logi bilan majburiy ravishda qayta yozib to'g'rilaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyida exercises bo'limida bajaring.

---

## 7. 📝 12 ta Mini Test

Testlar orqali bilimingizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### etcd va Kubernetes Arxitekturasi
Kubernetes o'zining barcha holatlari, konfiguratsiyalari va metadata ma'lumotlarini saqlash uchun **etcd** key-value omboridan foydalanadi. etcd esa klaster barqarorligini ta'minlash uchun **Raft** konsensus algoritmidan foydalanadi. Agar etcd kvorumni yo'qotsa (masalan, 3 tadan 2 ta node o'chsa), Kubernetes yangi resurslar yaratish yoki holatni o'zgartirish so'rovlarini qabul qila olmay qoladi. Bu real loyihalarda konsensusning qanchalik muhimligini ko'rsatadi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\\\`\\\`\\\`mermaid
sequenceDiagram
    participant Follower A
    participant Candidate C
    participant Follower B
    Note over Candidate C: Election Timeout! State -> Candidate
    Candidate C->>Follower A: RequestVote(term=1)
    Candidate C->>Follower B: RequestVote(term=1)
    Follower A-->>Candidate C: VoteGranted
    Follower B-->>Candidate C: VoteGranted
    Note over Candidate C: Quorum reached (3/3 votes)
    Note over Candidate C: State -> Leader
    Candidate C->>Follower A: AppendEntries (Heartbeat, term=1)
    Candidate C->>Follower B: AppendEntries (Heartbeat, term=1)
\\\`\\\`\\\`

---

## 10. 📌 Cheat Sheet

| Atama | Ta'rif | Koddagi ifodasi |
| :--- | :--- | :--- |
| **Quorum** | Qaror qabul qilish uchun kerakli minimal ovoz | \\\`Math.floor(n / 2) + 1\\\` |
| **Heartbeat** | Liderning faolligini bildiruvchi davriy signal | \\\`setInterval(sendHeartbeat, interval)\\\` |
| **Split-Brain** | Tarmoq bo'linishi sababli ikkita lider paydo bo'lishi | \\\`partitionA.hasLeader && partitionB.hasLeader\\\` |
| **Term** | Raft-da saylov va liderlik davrini bildiruvchi son | \\\`node.term++\\\` |
`,
  exercises: [
    {
      id: 1,
      title: "State Machine Replication",
      instruction: "Taqsimlangan tizimda loglardagi buyruqlarni ketma-ket bajarib boruvchi state machine replikatsiyasini yarating. `applyLog(state, logEntry)` funksiyasini yozing. U berilgan `state` obyektiga `logEntry` ichidagi buyruqni qo'llashi kerak. `logEntry` formati: `{ command: 'SET'|'ADD'|'SUB', key: string, value: number }`. Agar command 'SET' bo'lsa key ga qiymatni o'rnating, 'ADD' bo'lsa qo'shing, 'SUB' bo'lsa ayiring. Yangilangan `state` obyektini qaytaring.",
      startingCode: "function applyLog(state, logEntry) {\n  // Kodni shu yerda yozing\n}",
      hint: "state obyektini o'zgartiring va oxirida uni qaytaring. switch yoki if shartlaridan foydalaning.",
      test: "const sandbox = new Function(code + '; return applyLog;');\nconst fn = sandbox();\nlet st = { x: 5 };\nst = fn(st, { command: 'SET', key: 'y', value: 10 });\nif (st.y !== 10) return 'SET buyrug\\'i ishlamadi!';\nst = fn(st, { command: 'ADD', key: 'x', value: 3 });\nif (st.x !== 8) return 'ADD buyrug\\'i ishlamadi!';\nst = fn(st, { command: 'SUB', key: 'x', value: 2 });\nif (st.x !== 6) return 'SUB buyrug\\'i ishlamadi!';\nreturn null;"
    },
    {
      id: 2,
      title: "Quorum Validator",
      instruction: "Klasterda qaror qabul qilish uchun yetarli ovoz yig'ilganligini tekshiruvchi `hasQuorum(totalNodes, votesGranted)` funksiyasini yozing. U ko'pchilik ovoz bergan bo'lsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function hasQuorum(totalNodes, votesGranted) {\n  // Kodni shu yerda yozing\n}",
      hint: "Kvorum formulasi: Math.floor(totalNodes / 2) + 1. votesGranted ushbu qiymatdan katta yoki teng bo'lishini tekshiring.",
      test: "const sandbox = new Function(code + '; return hasQuorum;');\nconst fn = sandbox();\nif (fn(5, 3) !== true) return '5 tadan 3 ta ovoz kvorum bo\\'lishi kerak!';\nif (fn(5, 2) !== false) return '5 tadan 2 ta ovoz kvorum emas!';\nif (fn(4, 2) !== false) return '4 tadan 2 ta ovoz kvorum emas (kvorum 3 bo\\'lishi kerak)!';\nif (fn(4, 3) !== true) return '4 tadan 3 ta ovoz kvorum bo\\'lishi kerak!';\nreturn null;"
    },
    {
      id: 3,
      title: "Heartbeat Tracker",
      instruction: "Follower'lar oxirgi marta qachon heartbeat olganligini tekshiruvchi `checkFollowersActive(nodes, now, timeout)` funksiyasini yozing. `nodes` massividagi har bir node `{ id: string, lastHeartbeat: number }` ko'rinishida bo'ladi. Agar `now - lastHeartbeat > timeout` bo'lsa, u node faol emas (dead) deb hisoblanadi. Faol bo'lmagan node'larning `id` ro'yxatidan iborat massiv qaytaring.",
      startingCode: "function checkFollowersActive(nodes, now, timeout) {\n  // Kodni shu yerda yozing\n}",
      hint: "nodes massivini filter qiling va map yordamida faqat id larni ajratib oling.",
      test: "const sandbox = new Function(code + '; return checkFollowersActive;');\nconst fn = sandbox();\nconst list = [\n  { id: 'node-1', lastHeartbeat: 100 },\n  { id: 'node-2', lastHeartbeat: 450 },\n  { id: 'node-3', lastHeartbeat: 500 }\n];\nconst dead = fn(list, 600, 200);\nif (!Array.isArray(dead) || dead.length !== 1 || dead[0] !== 'node-1') {\n  return 'Faol bo\\'lmagan tugunlar noto\\'g\\'ri aniqlandi!';\n}\nreturn null;"
    },
    {
      id: 4,
      title: "Raft Leader Election Vote Collection",
      instruction: "Candidate tuguni uchun ovozlarni yig'ib beruvchi `collectVotes(nodes, term)` funksiyasini yozing. `nodes` massividagi har bir node `requestVote(candidateTerm)` metodiga ega bo'lib, u `true` yoki `false` qaytaradi. Balla node'lardan ovoz so'rab chiqing (har bir node uchun `node.requestVote(term)` chaqiring). Olingan jami `true` ovozlar sonini qaytaring.",
      startingCode: "function collectVotes(nodes, term) {\n  // Kodni shu yerda yozing\n}",
      hint: "Tugunlarni aylanib chiqib, node.requestVote(term) chaqiring va true qaytarganlarini sanang.",
      test: "const sandbox = new Function(code + '; return collectVotes;');\nconst fn = sandbox();\nconst nodes = [\n  { requestVote: (t) => t === 2 },\n  { requestVote: (t) => t === 2 },\n  { requestVote: (t) => false }\n];\nif (fn(nodes, 2) !== 2) return 'Ovozlar soni xato hisoblandi!';\nif (fn(nodes, 1) !== 0) return 'Noto\\'g\\'ri term uchun ovoz berilmasligi kerak edi!';\nreturn null;"
    },
    {
      id: 5,
      title: "Split-Brain Network Partition Validator",
      instruction: "Tarmoq bo'linishi (network partition) sharoitida qaysi partition segmenti o'z ishini davom ettira olishini aniqlang. `canPartitionProgress(totalNodes, partitionNodes)` funksiyasini yozing. `partitionNodes` massivida o'sha tarmoq qismida bir-biri bilan aloqada bo'lgan tugunlar ro'yxati beriladi. Ushbu guruh o'z ishini davom ettira olishi (ya'ni kvorum tashkil qila olishi) uchun `true`, aks holda `false` qaytaring.",
      startingCode: "function canPartitionProgress(totalNodes, partitionNodes) {\n  // Kodni shu yerda yozing\n}",
      hint: "partitionNodes.length ko'pchilikni (totalNodes / 2 dan ko'p) tashkil etishini tekshiring.",
      test: "const sandbox = new Function(code + '; return canPartitionProgress;');\nconst fn = sandbox();\nif (fn(5, ['node-1', 'node-2', 'node-3']) !== true) return '3 ta tugun 5 tadan kvorum bera oladi!';\nif (fn(5, ['node-4', 'node-5']) !== false) return '2 ta tugun kvorum bera olmaydi!';\nreturn null;"
    },
    {
      id: 6,
      title: "Raft Log Commit Index Finder",
      instruction: "Raft-da Lider qaysi log indeksini commit qila olishini aniqlashi kerak. `getCommitIndex(matchIndexes, totalNodes)` funksiyasini yozing. Funksiyaga barcha tugunlarning (shu jumladan Liderning ham) ma'lum log indekslari massiv shaklida uzatiladi, masalan `[4, 3, 2, 4, 1]`. Kvorum (ko'pchilik) tomonidan qabul qilingan eng yuqori indeksni qaytaring.",
      startingCode: "function getCommitIndex(matchIndexes, totalNodes) {\n  // Kodni shu yerda yozing\n}",
      hint: "matchIndexes massivini kamayish tartibida saralang. Kvorum indeksini topish uchun saralangan massivdan Math.floor(totalNodes / 2) yoki shunga mos indeksni oling.",
      test: "const sandbox = new Function(code + '; return getCommitIndex;');\nconst fn = sandbox();\nif (fn([4, 3, 2, 4, 1], 5) !== 3) return '5 ta node uchun eng yuqori kvorumli indeks xato!';\nif (fn([1, 2, 1], 3) !== 1) return '3 ta node uchun kvorumli indeks xato!';\nreturn null;"
    },
    {
      id: 7,
      title: "Raft State Transitioner",
      instruction: "Raft tugunlarining holatlarini boshqaruvchi funksiyani yarating. `transitionState(currentNode, event)` funksiyasi berilgan `currentNode` obyekti (`{ state: 'Follower'|'Candidate'|'Leader', term: number }`) va `event` (`{ type: 'HEARTBEAT_TIMEOUT' | 'VOTE_GRANTED_QUORUM' | 'HIGHER_TERM_DETECTED', term: number }`) asosida yangi holatni qaytarishi kerak. Qoidalar:\n1. Agar 'HIGHER_TERM_DETECTED' bo'lsa, term yangi termga teng bo'ladi va state 'Follower' bo'ladi (avvalgi holatidan qat'iy nazar).\n2. Agar state 'Follower' bo'lsa va 'HEARTBEAT_TIMEOUT' bo'lsa, state 'Candidate' bo'ladi va term 1 taga oshadi.\n3. Agar state 'Candidate' bo'lsa va 'VOTE_GRANTED_QUORUM' bo'lsa, state 'Leader' bo'ladi.\nHar doim o'zgartirilgan yoki yangi `currentNode` obyektini qaytaring.",
      startingCode: "function transitionState(currentNode, event) {\n  // Kodni shu yerda yozing\n}",
      hint: "Shartlarni ketma-ket if operatorlari orqali tekshiring. HIGHER_TERM_DETECTED birinchi tekshirilishi kerak.",
      test: "const sandbox = new Function(code + '; return transitionState;');\nconst fn = sandbox();\nlet node = { state: 'Follower', term: 2 };\nnode = fn(node, { type: 'HEARTBEAT_TIMEOUT' });\nif (node.state !== 'Candidate' || node.term !== 3) return 'Heartbeat timeout bo\\'lganda Candidate holatiga o\\'tish xato!';\nnode = fn(node, { type: 'VOTE_GRANTED_QUORUM' });\nif (node.state !== 'Leader') return 'Ovozlar yetarli bo\\'lganda Leader bo\\'lishi kerak!';\nnode = fn(node, { type: 'HIGHER_TERM_DETECTED', term: 5 });\nif (node.state !== 'Follower' || node.term !== 5) return 'Kattaroq term aniqlanganda Follower holatiga qaytishi shart!';\nreturn null;"
    },
    {
      id: 8,
      title: "Log Compaction (Snapshotting)",
      instruction: "Raft-da log hajmini kamaytirish uchun ma'lum bir indeksgacha bo'lgan loglar o'chirilib, snapshot (holat surati) saqlanadi. `compactLog(logs, lastIncludedIndex)` funksiyasini yozing. U berilgan `logs` massividan faqat `lastIncludedIndex` dan keyingi barcha elementlarni qoldirishi kerak. Loglar 0-indeksdan boshlanadi deb hisoblang. Yangi log massivini qaytaring.",
      startingCode: "function compactLog(logs, lastIncludedIndex) {\n  // Kodni shu yerda yozing\n}",
      hint: "Array.prototype.slice metodidan foydalanib, lastIncludedIndex + 1 dan boshlab qolgan qismni kesib oling.",
      test: "const sandbox = new Function(code + '; return compactLog;');\nconst fn = sandbox();\nconst logs = [\n  { index: 0, term: 1, cmd: 'SET a 1' },\n  { index: 1, term: 1, cmd: 'SET b 2' },\n  { index: 2, term: 2, cmd: 'SET c 3' },\n  { index: 3, term: 2, cmd: 'SET d 4' }\n];\nconst compacted = fn(logs, 1);\nif (compacted.length !== 2 || compacted[0].index !== 2) {\n  return 'Log to\\'g\\'ri qisqartirilmadi!';\n}\nreturn null;"
    },
    {
      id: 9,
      title: "RequestVote RPC Validator",
      instruction: "Raft-da boshqa tugundan kelgan saylov so'rovini tekshiruvchi `validateRequestVote(node, candidateTerm, candidateLastLogIndex, candidateLastLogTerm)` funksiyasini yozing. Nomzodning ovoz so'rovini qabul qilish shartlari:\n1. `candidateTerm >= node.term` bo'lishi kerak.\n2. Nomzodning logi tugunning o'z logidan kamida bir xil darajada yangi bo'lishi kerak. Bu degani: `candidateLastLogTerm > node.lastLogTerm` bo'lishi yoki `candidateLastLogTerm === node.lastLogTerm` bo'lgan holda `candidateLastLogIndex >= node.lastLogIndex` bo'lishi kerak.\nAgar shartlar bajarilsa, `true`, aks holda `false` qaytaring. `node` obyekti format: `{ term: number, lastLogIndex: number, lastLogTerm: number }`.",
      startingCode: "function validateRequestVote(node, candidateTerm, candidateLastLogIndex, candidateLastLogTerm) {\n  // Kodni shu yerda yozing\n}",
      hint: "Avvalo term taqqoslang, so'ngra log yangiligini (lastLogTerm va lastLogIndex orqali) shartlarga muvofiq tekshiring.",
      test: "const sandbox = new Function(code + '; return validateRequestVote;');\nconst fn = sandbox();\nconst node = { term: 2, lastLogIndex: 3, lastLogTerm: 2 };\nif (fn(node, 1, 3, 2) !== false) return 'Eski term uchun ovoz berilmasligi kerak!';\nif (fn(node, 2, 2, 2) !== false) return 'Logi eskirgan nomzodga ovoz berilmasligi kerak!';\nif (fn(node, 2, 4, 2) !== true) return 'Logi yangi nomzodga ovoz berilishi kerak!';\nif (fn(node, 3, 1, 3) !== true) return 'Log termi kattaroq nomzodga ovoz berilishi kerak!';\nreturn null;"
    },
    {
      id: 10,
      title: "AppendEntries RPC Handler",
      instruction: "Raft log replikatsiyasini simulyatsiya qiling. `handleAppendEntries(node, leaderTerm, prevLogIndex, prevLogTerm, entries)` funksiyasini yozing. U quyidagi qoidalarga ko'ra `{ success: boolean, term: number }` obyektini qaytarsin:\n1. Agar `leaderTerm < node.term` bo'lsa, `success: false` va tugunning joriy `term`ini qaytaring.\n2. Agar `node.logs[prevLogIndex]` element mavjud bo'lmasa yoki uning termi `prevLogTerm`ga mos kelmasa, `success: false` va yangilangan term bilan qaytaring (bu holda tugun termini lider termiga tenglashtirib oladi).\n3. Agar shartlar bajarilsa, `success: true` qaytaring (loglarni replikatsiya qilishga ruxsat etiladi).\n`node` obyekti format: `{ term: number, logs: [{ term: number, cmd: string }] }`.",
      startingCode: "function handleAppendEntries(node, leaderTerm, prevLogIndex, prevLogTerm, entries) {\n  // Kodni shu yerda yozing\n}",
      hint: "Lider termi kichik bo'lsa rad eting. Lider termi kattaroq bo'lsa, node termini yangilang. prevLogIndex bo'yicha element mavjudligini va termi prevLogTerm ekanligini tekshiring.",
      test: "const sandbox = new Function(code + '; return handleAppendEntries;');\nconst fn = sandbox();\nconst node = {\n  term: 2,\n  logs: [{ term: 1, cmd: 'A' }, { term: 2, cmd: 'B' }]\n};\nif (fn(node, 1, 1, 2, []).success !== false) return 'Eski lider rad etilishi kerak!';\nif (fn(node, 2, 5, 2, []).success !== false) return 'Mavjud bo\\'lmagan oldingi log uchun rad etilishi kerak!';\nif (fn(node, 2, 1, 1, []).success !== false) return 'Termi mos kelmaydigan log uchun rad etilishi kerak!';\nif (fn(node, 2, 1, 2, []).success !== true) return 'To\\'g\\'ri so\\'rov muvaffaqiyatli qabul qilinishi kerak!';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Taqsimlangan konsensusning (Distributed Consensus) asosiy maqsadi nima?",
      options: [
        "Tarmoq ulanish tezligini oshirish",
        "Bir nechta mustaqil tugunlar o'rtasida yagona holat bo'yicha kelishuvga erishish",
        "Ma'lumotlar bazasini shifrlash",
        "Foydalanuvchi interfeysini render qilish"
      ],
      correctAnswer: 1,
      explanation: "Taqsimlangan konsensus bir-biridan mustaqil tugunlarning yagona umumiy ma'lumot yoki holat bo'yicha yakdil qarorga kelishini ta'minlaydi."
    },
    {
      id: 2,
      question: "Raft algoritmi bo'yicha, Follower qachon saylov boshlashga qaror qiladi?",
      options: [
        "Mijozdan to'g'ridan-to'g'ri so'rov olganida",
        "Belgilangan saylov taymauti (election timeout) ichida Liderdan heartbeat olmaganida",
        "Klasterga yangi tugun qo'shilganida",
        "Ma'lumotlar bazasi to'lib qolganida"
      ],
      correctAnswer: 1,
      explanation: "Follower ma'lum vaqt oralig'ida (election timeout) liderdan heartbeat olmasa, lider ishdan chiqdi deb hisoblaydi va yangi saylov boshlaydi."
    },
    {
      id: 3,
      question: "5 ta tugundan iborat klasterda kvorum (qaror qabul qilish uchun kerakli ko'pchilik) soni nechta?",
      options: [
        "2 ta",
        "3 ta",
        "4 ta",
        "5 ta"
      ],
      correctAnswer: 1,
      explanation: "Kvorum formulasi: Math.floor(5 / 2) + 1 = 3 ta. Ya'ni kamida 3 ta tugun faol bo'lishi shart."
    },
    {
      id: 4,
      question: "Split-brain (ikki xil boshqaruv) muammosi nima?",
      options: [
        "Lider tugun xotirasi to'lib qolishi",
        "Tarmoq bo'linishi natijasida bitta klasterda ikkita alohida guruh va ikkita lider paydo bo'lishi",
        "Bir vaqtda ikki xil dasturlash tilidan foydalanish",
        "Klasterdagi barcha tugunlarning o'chib qolishi"
      ],
      correctAnswer: 1,
      explanation: "Split-brain - tarmoq bo'linishi sababli tugunlar guruhlarga ajralib qolganda, har bir guruh o'z liderini saylab, mustaqil ish boshlashi va ma'lumotlar ziddiyatiga olib kelishi muammosidir."
    },
    {
      id: 5,
      question: "Raft va Paxos o'rtasidagi asosiy farq nimada?",
      options: [
        "Paxos faqat SQL ma'lumotlar bazalarida ishlaydi",
        "Raft tushunish va loyihalash osonroq bo'lishi uchun ishlab chiqilgan va tizimni saylov, replikatsiya kabi aniq bosqichlarga ajratgan",
        "Raft ancha sekin ishlaydi",
        "Paxos umuman xavfsiz emas"
      ],
      correctAnswer: 1,
      explanation: "Raft tushunarli bo'lishi va amaliy dasturlashda oson tatbiq etilishi uchun Paxos'ga muqobil sifatida yaratilgan."
    },
    {
      id: 6,
      question: "Raft algoritmidagi 'Term' (Davr) nima?",
      options: [
        "Tugunning ishlash muddati",
        "Lojik soat vazifasini bajaruvchi, saylovlar va liderlik davrini belgilovchi monoton o'sib boruvchi son",
        "Ma'lumotlar bazasining jadvali",
        "Tarmoq ulanishining ping vaqti"
      ],
      correctAnswer: 1,
      explanation: "Term - bu saylovlar va liderlik davrlarini aniqlash hamda eskirgan tugun so'rovlarini rad etish uchun ishlatiladigan mantiqiy vaqt birligidir."
    },
    {
      id: 7,
      question: "Nima uchun klasterda tugunlar soni toq (odd) bo'lishi tavsiya etiladi?",
      options: [
        "Chunki toq sonli tizimlar kamroq elektr sarflaydi",
        "Chunki toq sonli klasterlar tarmoq bo'linganda kvorumni saqlab qolish ehtimoli yuqori va juft songa qaraganda tejamkorroq",
        "Toq sonli tizimlarda log replikatsiya umuman ishlamaydi",
        "Bu shunchaki tarixiy an'ana xolos"
      ],
      correctAnswer: 1,
      explanation: "Masalan, 4 ta node va 3 ta node uchun kvorum baribir 3 ga teng. 4 ta node bo'lsa, xarajat ko'p lekin nosozlikka bardoshlilik oshmaydi (ikkalasida ham 1 ta node o'chishiga chidaydi)."
    },
    {
      id: 8,
      question: "etcd, Consul va ZooKeeper qaysi maqsadda ishlatiladi?",
      options: [
        "Faqat katta hajmli videofayllarni saqlash uchun",
        "Konsensusga asoslangan konfiguratsiyalarni boshqarish, klyuch-qiymat ombori va service discovery uchun",
        "Frontend animatsiyalarini yaratish uchun",
        "Elektron pochta xabarlarini yuborish uchun"
      ],
      correctAnswer: 1,
      explanation: "Ushbu vositalar konsensus algoritmlari yordamida klaster holatini, konfiguratsiyalarini va servislar koordinatalarini ishonchli saqlaydi."
    },
    {
      id: 9,
      question: "Raft-da Heartbeat o'zi nima?",
      options: [
        "Tizim xotirasini tozalovchi dastur",
        "Lider faol ekanligini ko'rsatish uchun yuboradigan bo'sh AppendEntries RPC xabari",
        "Saylov natijalarini e'lon qiluvchi xabar",
        "Mijoz so'rovini qabul qilish buyrug'i"
      ],
      correctAnswer: 1,
      explanation: "Heartbeat - bu Liderning tirik ekanligini Follower'larga eslatib turuvchi davriy, tarkibida yangi log yozuvlari bo'lmagan AppendEntries RPC so'rovidir."
    },
    {
      id: 10,
      question: "Raft-da yangi log yozuvi qachon 'committed' (yakuniy qabul qilingan) deb e'lon qilinadi?",
      options: [
        "Mijoz uni yuborgan zahoti",
        "Lider uni ko'pchilik (kvorum) tugunlarning loglariga muvaffaqiyatli nusxalaganidan keyin",
        "Tizim qayta ishga tushganida",
        "Faqat bitta Follower uni qabul qilganida"
      ],
      correctAnswer: 1,
      explanation: "Log yozuvi faqatgina kvorum (ko'pchilik) tugunlar tomonidan qabul qilinib, tasdiqlanganidan so'nggina Lider tomonidan commit qilinadi."
    },
    {
      id: 11,
      question: "Tarmoq bo'linishi (split-brain) vaqtida kvorumsiz qolgan segmentda nima sodir bo'ladi?",
      options: [
        "U yangi ma'lumotlarni yozish so'rovlarini qabul qila olmaydi va rad etadi (yoki kutishga qo'yadi)",
        "U klasterdagi barcha tugunlarni o'chirib yuboradi",
        "U avtomatik ravishda boshqa baksi serverlarni format qiladi",
        "U tezroq ishlay boshlaydi"
      ],
      correctAnswer: 0,
      explanation: "Kvorumsiz qolgan segment ko'pchilik ovozini yig'a olmaganligi sababli yangi yozish tranzaksiyalarini tasdiqlay olmaydi."
    },
    {
      id: 12,
      question: "Raft-da Candidate o'ziga kelgan boshqa Candidate'ning ovoz so'rovini qachon rad etadi?",
      options: [
        "Agar nomzodning term raqami o'zinikidan kichik bo'lsa yoki loglari o'zinikidan eskirgan bo'lsa",
        "Har doim rad etadi, chunki raqobatchi hisoblanadi",
        "Faqat tarmoq tezligi past bo'lganda",
        "Agar nomzodda ma'lumotlar bazasi bo'lmasa"
      ],
      correctAnswer: 0,
      explanation: "Raft qoidalariga ko'ra, agar nomzodning term raqami kichikroq bo'lsa yoki uning oxirgi log yozuvi eskirgan bo'lsa, ovoz so'rovi rad etiladi."
    }
  ]
};
