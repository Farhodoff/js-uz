export const vectorClocks = {
  id: "vectorClocks",
  title: "Vector Clocks va Taqsimlangan Tizimlarda Logical Clocks",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Jismoniy Soatlar Muammosi (Physical Clock Drift)
Kundalik hayotimizda soat necha bo'lganini bilish uchun telefonga yoki devordagi soatga qaraymiz. Lekin taqsimlangan kompyuter tizimlarida (Distributed Systems) serverlarning ichki jismoniy soatlariga ishonib bo'lmaydi. Har bir serverdagi soat o'zining kvars rezonatori (quartz crystal) chastotasidagi mikroskopik farqlar tufayli bir-biridan orqada qoladi yoki oldinga o'tib ketadi. Bu holat **Clock Drift (Soat og'ishi)** deb ataladi. 

NTP (Network Time Protocol) soatlarni sinxronlashtirishga harakat qilsa ham, u tarmoqdagi kechikishlar tufayli hech qachon millisekund darajasida mutlaq aniqlikni kafolatlay olmaydi. Agar biz "qaysi voqea oldin sodir bo'ldi?" degan savolga jismoniy vaqt orqali javob izlasak, bu bizni katta xatoliklarga olib keladi.

### Lamport Timestamps (Mantiqiy Soat)
10-iyul 1978-yilda Leslie Lamport ismli olim mantiqiy tartibni aniqlash uchun jismoniy vaqt shart emasligini isbotladi. Buning o'rniga, voqealarning ketma-ketlik bog'liqligi (causality - sabab-oqibat aloqasi) muhimroq.
* **Qoida:** Har bir tugun (node) bitta o'suvchi hisoblagich (counter) saqlaydi. Har bir mahalliy voqea sodir bo'lganda counter $1$ taga oshadi. Xabar boshqa serverga yuborilganda, bu counter xabar ichiga qo'shib yuboriladi. Qabul qiluvchi tugun o'zining local counter-i bilan xabar ichidagi counter-ni solishtirib, kattasini tanlaydi va unga $1$ qo'shadi.

### Vector Clocks nima?
Lamport soatlari bitta jiddiy kamchilikka ega: agar $A$ voqeaning Lamport vaqti $3$ bo'lsa va $B$ voqeaning Lamport vaqti $4$ bo'lsa, bu $A$ albatta $B$ dan oldin sodir bo'lganini **bildirmaydi** (ular parallel va mustaqil bo'lishi ham mumkin). Sabab-oqibat zanjirini mukammal aniqlash uchun **Vector Clocks (Vektor Soatlari)** kashf qilindi.

* **Tuzilishi:** Vector clock — bu tizimdagi barcha tugunlarning mantiqiy soatlari ro'yxatidir (odatda Map/Obyekt ko'rinishida: \`{ NodeA: 3, NodeB: 1 }\`).
* **Real hayotiy analogiya (Google Docs / Figma):**
  Tasavvur qiling, siz va do'stingiz bitta hujjat ustida ishlayapsiz.
  - Siz 3-versiyadasiz (\`{ Siz: 3, Do'st: 0 }\`).
  - Do'stingiz esa parallel ravishda o'z kompyuterida 2 ta o'zgarish qildi (\`{ Siz: 0, Do'st: 2 }\`).
  - Hujjatlar birlashtirilganda (merge), tizim ikkala o'zgarish ham parallel (concurrent) sodir bo'lganini tushunadi. Chunki sizda uning o'zgarishlari yo'q, unda esa sizniki yo'q. Bu yerda konflikt yuzaga keladi.

---

## 2. 💻 Real Kod Misollari

Quyida sodda Vector Clock tizimining JavaScript-dagi realizatsiyasi keltirilgan:

\`\`\`javascript
class VectorClock {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.clock = {}; // { nodeId: counter }
    this.clock[this.nodeId] = 0;
  }

  // 1. Mahalliy voqea (Local Event) yuz berganda
  tick() {
    this.clock[this.nodeId] = (this.clock[this.nodeId] || 0) + 1;
  }

  // 2. Xabar yuborishdan oldin holatni olish
  send() {
    this.tick();
    return { ...this.clock };
  }

  // 3. Masofaviy xabarni qabul qilish (Merge va Tick)
  receive(remoteClock) {
    // Har bir tugunning maksimal qiymatini tanlash
    const keys = new Set([...Object.keys(this.clock), ...Object.keys(remoteClock)]);
    for (const node of keys) {
      this.clock[node] = Math.max(this.clock[node] || 0, remoteClock[node] || 0);
    }
    // Mahalliy soatni oshirish
    this.tick();
  }

  // 4. Sabab-oqibat bog'liqligini solishtirish
  static compare(vc1, vc2) {
    const keys = new Set([...Object.keys(vc1), ...Object.keys(vc2)]);
    let lessOrEqual = true;
    let greaterOrEqual = true;

    for (const key of keys) {
      const v1 = vc1[key] || 0;
      const v2 = vc2[key] || 0;
      if (v1 > v2) lessOrEqual = false;
      if (v1 < v2) greaterOrEqual = false;
    }

    if (lessOrEqual && !greaterOrEqual) return "BEFORE";   // vc1 oldin sodir bo'lgan
    if (greaterOrEqual && !lessOrEqual) return "AFTER";    // vc1 keyin sodir bo'lgan
    if (lessOrEqual && greaterOrEqual) return "EQUAL";     // Ikkalasi bir xil
    return "CONCURRENT";                                   // Konflikt (Parallel o'zgarishlar)
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Mantiqiy Qiyoslash Matritsasi
Vector clock-lar yordamida ikkita holat solishtirilganda quyidagi mantiqiy qoidalar ishlaydi:

1. **Sababiy Bog'liqlik ($V_1 < V_2$):**
   Agar $V_1$ vektoridagi barcha tugunlarning qiymatlari $V_2$ dagi mos qiymatlardan kichik yoki teng bo'lsa ($\forall k: V_1[k] \le V_2[k]$) va kamida bitta tugunda qat'iy kichik bo'lsa ($\exists k: V_1[k] < V_2[k]$), demak $V_1$ voqeasi $V_2$ dan **oldin** sodir bo'lgan ($V_1$ causes $V_2$).
   
2. **Parallellik ($V_1 \parallel V_2$):**
   Agar $V_1$ da ba'zi tugunlarning qiymati $V_2$ dan katta bo'lsa, lekin boshqa tugunlarniki kichik bo'lsa, u holda bu ikki voqea **parallel (concurrent)** deb hisoblanadi va tizimda konflikt mavjudligini bildiradi.

---

## 4. 📊 Mantiqiy Soatlar Divergensiyasi (Mermaid Diagram)

Quyidagi diagrammada uchta alohida tugun (A, B, C) o'rtasidagi xabarlar almashinuvi va ularning Vector Clock qiymatlari qanday o'zgarishi tasvirlangan:

\`\`\`mermaid
sequenceDiagram
    participant A as Node A
    participant B as Node B
    participant C as Node C

    Note over A,C: Boshlang'ich holat: barcha tugunlar [0, 0, 0] da
    A->>A: Local Event (A:1) [1,0,0]
    A->>B: Send Message with [1,0,0]
    Note over B: Receive: max([0,0,0], [1,0,0]) + B:1 -> [1,1,0]
    B->>B: Local Event (B:2) [1,2,0]
    
    C->>C: Local Event (C:1) [0,0,1]
    
    Note over B,C: Parallel (Concurrent) holatlar: B has [1,2,0] vs C has [0,0,1]
    B->>C: Send Message with [1,2,0]
    Note over C: Receive B's clock: max([0,0,1], [1,2,0]) + C:1 -> [1,2,2]
\`\`\`

---

## 5. 🛡️ Konfliktlarni Hal Qilish Strategiyalari

Parallel o'zgarishlar aniqlanganda tizimlar quyidagi usullardan foydalanadi:

### 1. Last-Write-Wins (LWW)
Jismoniy vaqt (NTP) bo'yicha eng oxirgi kelgan o'zgarish saqlab qolinadi, qolganlari o'chiriladi. 
* **Kamchiligi:** Soatlar to'liq sinxron bo'lmagani uchun foydalanuvchining haqiqatda kechroq qilgan o'zgarishi yo'qolib ketishi mumkin.

### 2. Siblinglar (Tarmoqlanish)
Riak yoki eski Amazon Dynamo tizimlarida konflikt bo'lsa, ikkala qiymat ham **Sibling** (aka-uka nusxalar) sifatida saqlanadi. Keyingi safar ma'lumot o'qilganda, mijozga (client) ikkala versiya ham qaytariladi va mijoz ularni qo'lda birlashtirishi (merge) kerak bo'ladi.

### 3. CRDTs (Conflict-free Replicated Data Types)
Matematik jihatdan konflikt yuzaga kelmaydigan ma'lumotlar turlari.
* **G-Counter (Grow-Only Counter):** Faqat qo'shish (increment) mumkin bo'lgan hisoblagich.
* **PN-Counter (Positive-Negative Counter):** Qo'shish va ayirish imkonini beruvchi hisoblagich.
* **OR-Set (Observed-Remove Set):** Elementlarni unikal ID/Tag orqali qo'shish va o'chirishni ta'minlovchi to'plam.

---

## 6. ❌ Junior Mistakes (Ko'p Uchraydigan Xatolar)

1. **Jismoniy vaqtga mutlaq ishonish:** Taqsimlangan ma'lumotlar bazasida tranzaksiyalar ketma-ketligini faqat jismoniy timestamp bilan tartiblashga urinish. Bu ma'lumotlar yo'qolishiga (silent data corruption) olib keladi.
2. **Vector Clock o'lchami cheksiz o'sishi (Vector Explosion):** Har safar yangi mijoz yoki tugun qo'shilganda vektor hajmi kattalashadi. Buning oldini olish uchun ma'lum vaqtdan keyin vektorlarni qisqartirish (pruning) yoki eskirgan tugunlarni o'chirib tashlash kerak.
3. **Lamport soati yordamida konfliktlarni aniqlashga urinish:** Lamport soatlari ($L(A) < L(B)$) faqat qisman tartib beradi, lekin ular parallel voqealarni ajrata olmaydi.

---

## 7. 🏢 Real Dunyo Tizimlarida Ishlatilishi

* **Amazon DynamoDB & Riak:** NoSQL bazalarda ma'lumotlarni replikatsiya qilish va tarmoq uzilishlarida (network partition) yuzaga keladigan versiyalar to'qnashuvini boshqarish uchun Vector Clock-lardan foydalanilgan.
* **Figma & Google Docs:** Foydalanuvchilarning real vaqtdagi birgalikdagi tahrirlarini (collaborative editing) CRDT va OT (Operational Transformation) orqali mantiqiy tartiblash.

---

## 8. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyat | Lamport Timestamps | Vector Clocks | Physical Clocks (NTP) |
| :--- | :--- | :--- | :--- |
| **Kattaligi** | 1 ta integer ($O(1)$) | Tugunlar soniga teng ($O(N)$) | 64-bit butun son ($O(1)$) |
| **Kafolat** | Sabab-oqibatni qisman tartiblaydi | Sabab-oqibatni mukammal aniqlaydi | Haqiqiy vaqtni taxminiy ko'rsatadi |
| **Konflikt aniqlash** | Mumkin emas | Kafolatlangan | Mumkin emas (LWW ishlatishga majbur) |

---

## 9. ❓ Intervyu Savollari

1. **Nima uchun taqsimlangan tizimlarda jismoniy soatlar ishonchsiz?**
   Jismoniy soatlar harorat, kvars sifati va NTP sinxronizatsiyasidagi kechikishlar tufayli "og'ib" ketadi (Clock Drift).
2. **Lamport va Vector clock-larning asosiy farqi nimada?**
   Lamport soatlari faqat bitta son bo'lgani uchun vaqt ketma-ketligini to'liq ifodalay olmaydi va parallel voqealarni ajrata olmaydi. Vector clock esa barcha tugunlarning holatini saqlash orqali konfliktlarni aniqlay oladi.
3. **Vector Clock-larda "pruning" nima va u nima uchun kerak?**
   Katta klasterlarda vektor hajmi cheksiz o'sib ketmasligi uchun eng eski faol bo'lmagan tugunlarning mantiqiy soatlarini vektordan o'chirish jarayoni.

---

## 10. 🧠 O'z-o'zini Tekshirish

1. Agar $V_1 = \{A: 2, B: 1\}$ va $V_2 = \{A: 1, B: 3\}$ bo'lsa, ular orasidagi mantiqiy aloqa qanday? (Javob: Concurrent, ya'ni parallel/konflikt).
2. Nima uchun G-Counter-da decrement amalini bajarib bo'lmaydi? (Javob: Chunki u monoton o'suvchi hisoblagich, kamaytirish uchun PN-Counter ishlatilishi shart).
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Lamport Mantiqiy Soat Tick Simulyatsiyasi (Boshlang'ich)",
      instruction: "Mahalliy va masofaviy soatlarni solishtirib, Lamport mantiqiy soatining yangi qiymatini qaytaruvchi `lamportTick(localClock, remoteClock)` funksiyasini yozing. Agar `remoteClock` berilmagan bo'lsa, shunchaki mahalliy soatni 1 taga oshiring.",
      startingCode: "function lamportTick(localClock, remoteClock) {\n  // Kodni shu yerda yozing\n}",
      hint: "Agar remoteClock aniqlanmagan bo'lsa, localClock + 1. Aks holda, Math.max(localClock, remoteClock) + 1.",
      test: "if (typeof lamportTick !== 'function') return 'lamportTick funksiya emas';\nif (lamportTick(5) !== 6) return 'Mahalliy voqeada xato!';\nif (lamportTick(5, 8) !== 9) return 'Masofaviy xabarni qabul qilishda xato!';\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ Vector Clock Mahalliy Increment (Boshlang'ich)",
      instruction: "Berilgan `clock` (Vector Clock obyekti) va `nodeId` bo'yicha mahalliy hodisa uchun soatni 1 taga oshiring. Agar ushbu tugun obyekti ichida mavjud bo'lmasa, uni 1 dan boshlang. Obyektning o'zini qaytaring.",
      startingCode: "function incrementVector(clock, nodeId) {\n  // Kodni shu yerda yozing\n}",
      hint: "clock[nodeId] = (clock[nodeId] || 0) + 1; return clock;",
      test: "if (typeof incrementVector !== 'function') return 'incrementVector funksiya emas';\nconst vc = { A: 1 };\nincrementVector(vc, 'A');\nincrementVector(vc, 'B');\nif (vc.A !== 2 || vc.B !== 1) return 'Vektor yangilanishi noto\\'g\\'ri!';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Vector Clock Merge (O'rta)",
      instruction: "Ikkita vector clock (`local` va `remote` obyektlari)ni qabul qilib, ularni birlashtiruvchi `mergeVectors(local, remote)` funksiyasini yozing. Har bir tugunning maksimal qiymati saqlanishi kerak. Yangi obyekt qaytarilsin.",
      startingCode: "function mergeVectors(local, remote) {\n  // Kodni shu yerda yozing\n}",
      hint: "Barcha kalitlarni Set orqali yig'ib oling va har birining maksimalini Math.max orqali tanlang.",
      test: "if (typeof mergeVectors !== 'function') return 'mergeVectors funksiya emas';\nconst res = mergeVectors({ A: 2, B: 5 }, { B: 3, C: 1 });\nif (res.A !== 2 || res.B !== 5 || res.C !== 1) return 'Vektorlar to\\'g\\'ri birlashtirilmadi!';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ Vector Causality Comparison (O'rta)",
      instruction: "Ikkita vector clock (`vc1` va `vc2`)ni qiyoslovchi `compareVectors(vc1, vc2)` funksiyasini yozing. U quyidagi qiymatlarni qaytarsin:\n- `'BEFORE'`: agar vc1 vc2 dan oldin bo'lsa\n- `'AFTER'`: agar vc1 vc2 dan keyin bo'lsa\n- `'EQUAL'`: agar ikkalasi teng bo'lsa\n- `'CONCURRENT'`: agar ular parallel va konfliktli bo'lsa",
      startingCode: "function compareVectors(vc1, vc2) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ikki vektordagi barcha kalitlar uchun qiymatlarni (mavjud bo'lmasa 0 deb olib) solishtiring. Agar hamma elementlar bo'yicha vc1 <= vc2 bo'lsa va kamida bittasida vc1 < vc2 bo'lsa, BEFORE qaytariladi.",
      test: "if (typeof compareVectors !== 'function') return 'compareVectors funksiya emas';\nif (compareVectors({A:1}, {A:2}) !== 'BEFORE') return 'BEFORE holatida xatolik';\nif (compareVectors({A:2, B:1}, {A:1, B:2}) !== 'CONCURRENT') return 'CONCURRENT holatida xatolik';\nif (compareVectors({A:1}, {A:1}) !== 'EQUAL') return 'EQUAL holatida xatolik';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Last-Write-Wins (LWW) Register (O'rta)",
      instruction: "`LWWRegister` klassini yarating. Unda `value`, `timestamp` va `nodeId` bo'lishi lozim. `update(value, timestamp, nodeId)` metodi orqali yangi yozuv kelganda, joriy timestamp-dan katta bo'lsa yoki timestamp-lar teng bo'lib nodeId alifbo bo'yicha katta bo'lsa (`nodeId > this.nodeId`), qiymat va meta-ma'lumotlarni yangilang.",
      startingCode: "class LWWRegister {\n  constructor(value, timestamp, nodeId) {\n    this.value = value;\n    this.timestamp = timestamp;\n    this.nodeId = nodeId;\n  }\n  update(value, timestamp, nodeId) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Shart yozing: timestamp > this.timestamp || (timestamp === this.timestamp && nodeId > this.nodeId)",
      test: "if (typeof LWWRegister !== 'function') return 'LWWRegister klassi topilmadi';\nconst reg = new LWWRegister('old', 100, 'nodeA');\nreg.update('new', 90, 'nodeB');\nif (reg.value !== 'old') return 'Eski timestamp qiymatni o\\'zgartirib yubordi';\nreg.update('newer', 100, 'nodeB');\nif (reg.value !== 'newer') return 'Teng timestamp va katta nodeId bilan yangilanmadi';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ CRDT G-Counter (Grow-Only Counter) (O'rta)",
      instruction: "Faqat o'suvchi mantiqiy hisoblagich `GCounter` klassini yozing. U tugunlar bo'yicha qiymatlarni `state` obyektida saqlasin. `increment(node, amount)` qiymatni oshiradi. `value` getter-i joriy summana hisoblaydi. `merge(other)` esa boshqa G-Counter holati bilan maksimal qiymatlarni birlashtiradi.",
      startingCode: "class GCounter {\n  constructor() {\n    this.state = {};\n  }\n  increment(node, amount = 1) {\n    // Kodni shu yerda yozing\n  }\n  get value() {\n    // Kodni shu yerda yozing\n  }\n  merge(other) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Increment-da `this.state[node] = (this.state[node] || 0) + amount`. Merge-da `Math.max` yordamida `other.state` qiymatlarini oling.",
      test: "if (typeof GCounter !== 'function') return 'GCounter topilmadi';\nconst c1 = new GCounter(); c1.increment('A', 5); c1.increment('B', 3);\nconst c2 = new GCounter(); c2.increment('B', 7); c2.increment('C', 2);\nc1.merge(c2);\nif (c1.value !== 14) return 'Hisoblagich qiymati noto\\'g\\'ri, 14 bo\\'lishi kerak!';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ CRDT PN-Counter (Positive-Negative) (Qiyin)",
      instruction: "Qo'shish va ayirish imkonini beruvchi `PNCounter` klassini yarating. U ikkita ichki `P` va `N` obyektlarini (G-Counter-lar kabi) ishlatsin. `increment` P ni, `decrement` esa N ni oshiradi. `value` o'zgaruvchisi `sum(P) - sum(N)` ni qaytaradi. `merge(other)` esa ikkala counter holatlarini birlashtiradi.",
      startingCode: "class PNCounter {\n  constructor() {\n    this.P = {};\n    this.N = {};\n  }\n  increment(node, amount = 1) {\n    // Kodni shu yerda yozing\n  }\n  decrement(node, amount = 1) {\n    // Kodni shu yerda yozing\n  }\n  get value() {\n    // Kodni shu yerda yozing\n  }\n  merge(other) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "P va N holatlarini mos ravishda merge qiling va summalarni ayiring.",
      test: "if (typeof PNCounter !== 'function') return 'PNCounter topilmadi';\nconst pn = new PNCounter();\npn.increment('A', 10);\npn.decrement('B', 3);\nconst pn2 = new PNCounter();\npn2.increment('B', 2);\npn2.decrement('B', 5);\npn.merge(pn2);\nif (pn.value !== 5) return 'PN-Counter merge qiymati xato!';\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Vector Clock Pruning (Qiyin)",
      instruction: "Vector Clock hajmini cheklash uchun `pruneVector(clock, maxNodes, lastActiveTimes)` funksiyasini yozing. U `clock` obyektidagi kalitlar sonini `maxNodes` gacha qisqartirsin. Bunda `lastActiveTimes` (har bir tugunning oxirgi faollik timestamp-i) bo'yicha eng eskirgan (eng kichik faollik vaqtiga ega) tugunlar olib tashlanishi kerak. Yangi qisqartirilgan obyekt qaytarilsin.",
      startingCode: "function pruneVector(clock, maxNodes, lastActiveTimes) {\n  // Kodni shu yerda yozing\n}",
      hint: "Kalitlarni active vaqti bo'yicha kamayish tartibida saralab oling (most active first) va faqat dastlabki maxNodes tasini saqlab qoling.",
      test: "if (typeof pruneVector !== 'function') return 'pruneVector funksiya emas';\nconst vc = { A: 10, B: 5, C: 2 };\nconst active = { A: 1600000, B: 1500000, C: 1700000 };\nconst res = pruneVector(vc, 2, active);\nif (res.B !== undefined || res.A !== 10 || res.C !== 2) return 'Eskirgan tugun to\\'g\\'ri o\\'chirilmagan!';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ CRDT OR-Set (Observed-Remove Set) (Qiyin)",
      instruction: "Elementlarni unikal mantiqiy taglar orqali qo'shish va o'chirish imkonini beruvchi `ORSet` sinfini yarating. `add(element, tag)` elementi tag bilan `addSet` massiviga qo'shiladi. `remove(element)` metodi elementga tegishli barcha taglarni joriy `addSet`dan aniqlab `removeSet`ga qo'shadi. `elements()` metodi faqat `removeSet`da bo'lmagan tagga ega bo'lgan unikal elementlar massivini qaytarsin. `merge(other)` esa ikkala to'plamni birlashtiradi.",
      startingCode: "class ORSet {\n  constructor() {\n    this.addSet = []; // [{ element, tag }]\n    this.removeSet = []; // [tag]\n  }\n  add(element, tag) {\n    // Kodni yozing\n  }\n  remove(element) {\n    // Kodni yozing\n  }\n  elements() {\n    // Kodni yozing\n  }\n  merge(other) {\n    // Kodni yozing\n  }\n}",
      hint: "elements metodida, addSet dan shunday elementlarni olingki, ularning tagi removeSet tarkibida bo'lmasin.",
      test: "if (typeof ORSet !== 'function') return 'ORSet topilmadi';\nconst s1 = new ORSet();\ns1.add('apple', 't1');\nconst s2 = new ORSet();\ns2.add('apple', 't2');\ns1.merge(s2);\ns1.remove('apple');\nif (s1.elements().includes('apple')) return 'O\\'chirilgan element hali ham mavjud!';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Siblinglarni Birlashtirish (Eng Qiyin)",
      instruction: "Riak/Dynamo kabi bazalardan olingan parallel versiyalar (`records`) ichidan, boshqa hech qaysi versiya tomonidan bosib ketilmagan (obsolete bo'lmagan) faol versiyalarni tanlab oluvchi `resolveSiblings(records)` funksiyasini yozing. Har bir record `{ value, vc }` formatida. Agar birorta record-ning vector clock-i ikkinchisidan kichik bo'lsa (ya'ni vc1 vc2 dan BEFORE bo'lsa), vc1 eskirgan deb hisoblanadi va natijadan chiqarib tashlanadi.",
      startingCode: "function resolveSiblings(records) {\n  // compareVectors(vc1, vc2) funksiyasi mavjud\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir element uchun uni bosib ketadigan (ya'ni vc2 > vc1) boshqa record bor-yo'qligini tekshiring va shunday record-larni filter qiling.",
      test: "if (typeof resolveSiblings !== 'function') return 'resolveSiblings funksiya emas';\n// compareVectors ni global test muhitiga moslab yaratamiz\nglobalThis.compareVectors = function(vc1, vc2) {\n  const keys = new Set([...Object.keys(vc1), ...Object.keys(vc2)]);\n  let lessOrEqual = true; let greaterOrEqual = true;\n  for (const k of keys) {\n    const v1 = vc1[k] || 0; const v2 = vc2[k] || 0;\n    if (v1 > v2) lessOrEqual = false;\n    if (v1 < v2) greaterOrEqual = false;\n  }\n  if (lessOrEqual && !greaterOrEqual) return 'BEFORE';\n  if (greaterOrEqual && !lessOrEqual) return 'AFTER';\n  if (lessOrEqual && greaterOrEqual) return 'EQUAL';\n  return 'CONCURRENT';\n};\nconst records = [\n  { value: 'v1', vc: { A: 1 } },\n  { value: 'v2', vc: { A: 2, B: 1 } },\n  { value: 'v3', vc: { A: 1, B: 2 } }\n];\nconst res = resolveSiblings(records);\nif (res.length !== 2) return 'Faqat concurrent (parallel) siblinglar qolishi kerak edi!';\nif (res.some(r => r.value === 'v1')) return 'Eski versiya o\\'chirilmadi!';\ndelete globalThis.compareVectors;\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima uchun taqsimlangan tizimlarda jismoniy soatlar (Physical Clocks) ketma-ketlikni aniqlashda ishonchsiz hisoblanadi?",
      options: [
        "Chunki ular juda ko'p elektr energiyasini sarflaydi",
        "Chunki kvars rezonatorlarining farqi va tarmoq kechikishlari tufayli har xil tugunlarda soatlar og'ib ketadi (Clock Drift)",
        "Chunki jismoniy soatlar faqat SQL bazalarida ishlaydi",
        "Chunki brauzerlar jismoniy vaqtni qo'llab-quvvatlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Clock drift muammosi tufayli tarmoqdagi serverlarning jismoniy soatlari har doim bir-biridan farq qiladi, bu esa voqealar ketma-ketligini mutlaq aniqlashga to'sqinlik qiladi."
    },
    {
      id: 2,
      question: "Lamport mantiqiy soatlarining asosiy kamchiligi nimada?",
      options: [
        "Ular faqat 64-bitli tizimlarda ishlaydi",
        "L(A) < L(B) bo'lgan taqdirda ham, A voqea B dan oldin sodir bo'lganligini aniq aytib bo'lmaydi (parallel voqealarni aniqlay olmaydi)",
        "Ular juda ko'p xotira egallaydi",
        "Ular faqat bitta server ichida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Lamport soati faqat qisman tartib (partial order) beradi. Agar bitta son boshqasidan kichik bo'lsa, bu sababiy bog'liqlikni kafolatlamaydi (voqealar parallel yuz bergan bo'lishi mumkin)."
    },
    {
      id: 3,
      question: "Vector Clock o'zi nima?",
      options: [
        "Grafik kartalar uchun maxsus vaqt drayveri",
        "Tizimdagi barcha tugunlarning mantiqiy soatlari ro'yxatini (vektorini) saqlovchi mantiqiy soat turi",
        "Ma'lumotlar bazasining zaxira nusxasi",
        "NTP protokoli bilan ishlaydigan server turi"
      ],
      correctAnswer: 1,
      explanation: "Vector Clock — bu har bir tugunning o'zi bilgan barcha boshqa tugunlar mantiqiy soatlari qiymatini saqlovchi mantiqiy tuzilmadir."
    },
    {
      id: 4,
      question: "Vector Clock-da ikkita holat qachon parallel/konfliktli (concurrent) deb hisoblanadi?",
      options: [
        "Ikkala vektordagi barcha elementlar mutlaq teng bo'lganda",
        "Vektorlarning birortasi ham ikkinchisidan to'liq katta yoki kichik bo'lmaganda (ba'zi tugunlarda vc1 katta, ba'zilarida esa vc2)",
        "Faqat bitta tugun mantiqiy soati nolga teng bo'lganda",
        "Ular turli xil tarmoqlarda joylashganda"
      ],
      correctAnswer: 1,
      explanation: "Agar vc1 ning ba'zi tugunlari vc2 dan katta, boshqalari esa kichik bo'lsa, bu ikki voqea parallel yuz berganini va ular orasida konflikt mavjudligini bildiradi."
    },
    {
      id: 5,
      question: "Last-Write-Wins (LWW) konfliktlarni hal qilish strategiyasining asosiy kamchiligi nima?",
      options: [
        "U faqat kichik hajmli ma'lumotlarda ishlaydi",
        "U jismoniy soatlarga tayanganligi uchun soat og'ishi tufayli foydalanuvchining so'nggi o'zgarishlarini yo'qotib yuborishi mumkin (data loss)",
        "U hech qachon konfliktni hal qilmaydi",
        "U faqat Node.js-da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "LWW jismoniy soat timestamps-lariga tayanadi. Agar serverlar soati mukammal sinxron bo'lmasa, haqiqiy oxirgi o'zgarish o'chib ketishi mumkin."
    },
    {
      id: 6,
      question: "Riak va Dynamo ma'lumotlar bazalarida konfliktlar yuz berganda yuzaga keladigan parallel nusxalar nima deb ataladi?",
      options: [
        "Branches",
        "Siblings (Aka-ukalar)",
        "Tombstones",
        "Conflicts"
      ],
      correctAnswer: 1,
      explanation: "Riak kabi tizimlar parallel o'zgarishlarni o'chirib tashlamay, sibling (aka-uka) nusxalar sifatida saqlaydi va konfliktni yechishni mijoz ilovasiga yuklaydi."
    },
    {
      id: 7,
      question: "CRDT (Conflict-free Replicated Data Type) nima?",
      options: [
        "Faqat rasmlarni siqish algoritmi",
        "Parallel ravishda yangilanganda ham konfliktlarsiz, matematik qonunlar asosida avtomatik birlasha oladigan ma'lumotlar tuzilmasi",
        "Xatoliklarni tuzatuvchi tarmoq routeri",
        "Klaster monitoring tizimi"
      ],
      correctAnswer: 1,
      explanation: "CRDT — matematik qoidalar (commutative, associative va idempotent) asosida har qanday replikalar o'rtasida avtomatik ravishda konfliktlarsiz birlashadigan ma'lumotlar turidir."
    },
    {
      id: 8,
      question: "PN-Counter (Positive-Negative Counter) qanday ishlaydi?",
      options: [
        "U faqat musbat sonlarni hisoblaydi",
        "U ikkita alohida G-Counter (biri qo'shish, ikkinchisi ayirish uchun) yordamida qiymatni hisoblaydi",
        "U faqat xatoliklarni sanaydi",
        "U har bir tugun uchun tasodifiy sonlarni generatsiya qiladi"
      ],
      correctAnswer: 1,
      explanation: "PN-Counter ikkita G-Counter (P va N) yordamida ishlaydi. Yakuniy qiymat P counterlar yig'indisidan N counterlar yig'indisini ayirish orqali olinadi."
    },
    {
      id: 9,
      question: "Vector Clock-larda 'Vector Explosion' yoki cheksiz o'sish muammosi qanday hal qilinadi?",
      options: [
        "Barcha eski ma'lumotlarni o'chirish orqali",
        "Eskirgan yoki nofaol tugunlarni vektordan tozalash (Pruning) orqali",
        "Klaster serverlarini almashtirish orqali",
        "Faqat bitta tugun ishlatish orqali"
      ],
      correctAnswer: 1,
      explanation: "Pruning (kesish) jarayoni orqali eng kam faol bo'lgan yoki eng eski tugunlar ma'lumotlari vektordan olib tashlanib, uning hajmi cheklanadi."
    },
    {
      id: 10,
      question: "OR-Set (Observed-Remove Set) tarkibida elementni o'chirish qanday amalga oshiriladi?",
      options: [
        "Elementni butunlay xotiradan o'chirish orqali",
        "Element qo'shilganda berilgan barcha unikal taglarni o'chirilganlar ro'yxatiga (removeSet) qo'shish orqali",
        "Barcha tugunlarni qayta ishga tushirish orqali",
        "Faqat administrator ruxsati bilan"
      ],
      correctAnswer: 1,
      explanation: "OR-Set elementni o'chirish uchun o'sha paytgacha qo'shilgan elementning barcha unikal taglarini maxsus removeSet-ga yozib qo'yadi (tombstone)."
    },
    {
      id: 11,
      question: "Figma va Google Docs kabi real vaqtda tahrirlash dasturlarida mantiqiy tartib qanday hal qilinadi?",
      options: [
        "NTP yordamida jismoniy vaqt bo'yicha",
        "CRDT va Operational Transformation (OT) kabi mantiqiy muvofiqlashtirish algoritmlari orqali",
        "Faqat bitta foydalanuvchiga yozish huquqini berish orqali",
        "Saytni har soniyada yangilash orqali"
      ],
      correctAnswer: 1,
      explanation: "Bunday tizimlar parallel o'zgarishlarni to'g'ri tartibda birlashtirish uchun CRDT yoki OT kabi mantiqiy muvofiqlashtirish va mantiqiy soat mexanizmlaridan foydalanadi."
    },
    {
      id: 12,
      question: "Quyidagi vector clock-larni solishtiring: vc1={A: 3, B: 2} va vc2={A: 3, B: 2, C: 1}. Mantiqiy aloqa qanday?",
      options: [
        "vc1 keyin sodir bo'lgan (vc1 > vc2)",
        "vc1 oldin sodir bo'lgan (vc1 < vc2)",
        "Ular parallel (concurrent) sodir bo'lgan",
        "Ular umuman teng emas va taqqoslab bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "vc1 dagi barcha mavjud elementlar vc2 dagi mos elementlarga teng (A:3=3, B:2=2) va C tuguni vc2 da 1 ga oshgan. Demak, vc1 mantiqan vc2 dan oldin sodir bo'lgan (BEFORE)."
    }
  ]
};
