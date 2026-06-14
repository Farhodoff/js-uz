export const batchStreamProcessing = {
  id: "batchStreamProcessing",
  title: "Batch va Stream Processing (Katta ma'lumotlarni qayta ishlash)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tizimlar juda katta hajmdagi ma'lumotlar bilan ishlaganda (Big Data), ularni qayta ishlashning ikki xil asosiy falsafasi yuzaga keladi: **Batch (Guruhli) Processing** va **Stream (Oqimli) Processing**.

### Real hayotiy o'xshatish:
*   **Batch Processing (Paqirda suv tashish):** Tasavvur qiling, sizda katta hovuz bor. Uni to'ldirish uchun siz chelakni (paqirni) quduqqa olib borib, suv to'ldirib, hovuzga quyasiz. Suv faqat paqir to'lgandan keyingina yetib keladi. Bu xuddi kunlik tranzaksiyalarni tun yarmida yig'ib hisoblashga o'xshaydi.
*   **Stream Processing (Vodoprovod quvuri):** Bu safar siz quduqdan hovuzgacha to'g'ridan-to'g'ri quvur tortib qo'yasiz. Suv doimiy ravishda oqib turadi. Har bir tomchi suv real vaqtda hovuzga yetib keladi. Bu real vaqtdagi foydalanuvchilar oqimini har soniyada tahlil qilishdir.

---

## 2. 💻 Real Kod Misollari

### 1. Oddiy MapReduce Paradigmasi
MapReduce — bu katta ma'lumotlarni parallel qayta ishlash modeli. Keling, JavaScript-da matndagi so'zlar sonini hisoblash misolida Map, Shuffle va Reduce bosqichlarini simulyatsiya qilamiz:

\\\`javascript
// 1. Map bosqichi: Matnni so'zlarga ajratib, har biri uchun [key, 1] juftligini yaratadi
function mapStep(text) {
  return text.toLowerCase().split(/\\s+/).map(word => {
    // Tinish belgilarini tozalash
    const cleanWord = word.replace(/[.,/#!$%\\^&*;:{}=\\-_\`~()]/g, "");
    return [cleanWord, 1];
  }).filter(pair => pair[0].length > 0);
}

// 2. Shuffle bosqichi: Bir xil kalitli qiymatlarni guruhlaydi
function shuffleStep(mappedPairs) {
  const grouped = {};
  mappedPairs.forEach(([word, count]) => {
    if (!grouped[word]) grouped[word] = [];
    grouped[word].push(count);
  });
  return grouped; // { 'hello': [1, 1], 'world': [1] }
}

// 3. Reduce bosqichi: Guruhlangan qiymatlarni yig'ib natijani chiqaradi
function reduceStep(groupedData) {
  const result = {};
  for (const [word, counts] of Object.entries(groupedData)) {
    result[word] = counts.reduce((acc, curr) => acc + curr, 0);
  }
  return result; // { 'hello': 2, 'world': 1 }
}

// Birlashtirilgan MapReduce zanjiri
const text = "Hello world! Hello node.";
const mapped = mapStep(text);
const shuffled = shuffleStep(mapped);
const reduced = reduceStep(shuffled);

console.log(reduced); // { hello: 2, world: 1, node: 1 }
\\\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. MapReduce Paradigm
*   **Map:** Ma'lumotlarni filtrlash va transformatsiya qilish (parallel bajariladi).
*   **Shuffle (va Sort):** Ma'lumotlarni kaliti bo'yicha tarmoq orqali qayta taqsimlash (Eng qimmat operatsiya, chunki disk I/O va Network I/O talab qiladi).
*   **Reduce:** Guruhlangan ma'lumotlarni agregatsiya qilish (yig'indi, o'rtacha qiymat va hokazo).

### 2. Apache Spark (Micro-batch) vs Apache Flink (Real-time Stream)
*   **Apache Spark Streaming:** Oqimni juda kichik guruhlarga (micro-batches, masalan, har 500ms dagi eventlar) bo'ladi va ularni batch dvigateli yordamida qayta ishlaydi.
*   **Apache Flink:** Har bir event kelishi bilan uni zudlik bilan qayta ishlaydi (Native Streaming). Kechikish muddati (latency) mikrosaniyalarda o'lchanadi.

### 3. Oyna Turlari (Windowing)
Oqimli ma'lumotlar cheksiz bo'lgani uchun, ularni agregatsiya qilishda vaqtinchalik oynalar ishlatiladi:
*   **Tumbling Window (Kesishmaydigan oyna):** Ruxsat etilgan statik vaqt oralig'i (masalan, har 5 daqiqalik oyna: 10:00-10:05, 10:05-10:10).
*   **Sliding Window (Siljuvchi oyna):** Oyna hajmi va siljish qadamiga ega (masalan, oyna hajmi 5 daqiqa, har 1 daqiqada siljiydi). Oynalar ustma-ust tushishi mumkin.
*   **Session Window (Sessiya oynasi):** Foydalanuvchi faolligiga qarab dynamic o'zgaradi. Agar foydalanuvchi ma'lum bir vaqt (inactivity gap) davomida hech narsa qilmasa, oyna yopiladi.

### 4. Event Time vs Processing Time, Watermarks
*   **Event Time (Hodisa vaqti):** Event foydalanuvchi qurilmasida haqiqatda sodir bo'lgan vaqt.
*   **Processing Time (Qayta ishlash vaqti):** Event serverga yetib kelib, dastur tomonidan o'qilgan vaqt.
*   **Late Data & Watermarks:** Tarmoq kechikishi sababli ba'zi eventlar kech yetib keladi. **Watermark** — bu Event Time bo'yicha tizim qanchalik orqada qolayotganini belgilovchi vaqt ko'rsatkichi. Masalan, \`Watermark = MaxEventTime - AllowedLateness\`. Watermarkdan kichik bo'lgan eventlar "Late Data" (kechikkan) deb hisoblanadi va odatda maxsus qayta ishlanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1.  **Shuffle operatsiyalarini haddan tashqari ko'p ishlatish:** Shuffle tarmoq orqali ma'lumotlarni uzatadi va diskka yozadi. Spark/MapReduce dasturlarida keraksiz joyda \`groupByKey\` ishlatish o'rniga \`reduceByKey\` kabi lokal agregatsiya qiluvchi metodlardan foydalanish lozim.
2.  **Oqim drayverida state xotirasini cheklamang:** Session window yoki stateful oqimlarda eski holatlarni (state) tozalab turish (TTL o'rnatish) esdan chiqsa, xotira to'lib \`OutOfMemory\` xatoligi yuzaga keladi.
3.  **Processing Time-ni Event Time o'rniga ishlatish:** Tarmoq uzilishi tufayli foydalanuvchi telefonidagi 5 ta hodisa 1 soatdan keyin serverga birga yetib kelsa va siz Processing Time ishlatsangiz, barcha 5 ta event noto'g'ri tarzda joriy oyna uchun hisoblanadi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Batch processing nima va u qachon qo'llaniladi?**
Tarixiy, katta hajmdagi ma'lumotlarni bloklarga bo'lib, past kechikish talab etilmaydigan holatlarda (masalan, kunlik hisobotlar, oylik tahlillar) qayta ishlash.

**2. Stream processing nima va uning asosiy qiyinchiligi nimada?**
Cheksiz ma'lumotlar oqimini real vaqtda qayta ishlash. Asosiy qiyinchiligi — ma'lumotlarning tartibsiz kelishi (out-of-order) va tizim holatini (state) xotirada saqlash.

**3. Apache Spark Streaming va Apache Flink o'rtasidagi asosiy farq nima?**
Spark asosan micro-batching modeliga asoslangan, Flink esa har bir elementni individual ravishda qayta ishlovchi continuous event-driven stream processing dvigatelidir.

**4. MapReduce modelidagi Shuffle qadami nima uchun eng og'ir hisoblanadi?**
Chunki u barcha node-lardagi ma'lumotlarni kalitlar bo'yicha guruhlash uchun tarmoq (network) orqali yuboradi va diskka vaqtinchalik yozadi.

**5. Watermark nima va u kechikkan ma'lumotlarni qanday hal qiladi?**
Watermark — oqimli tizimda Event Time vaqtining borishini kuzatuvchi ko'rsatkich. U kechikkan ma'lumotlar (late data) qachongacha qabul qilinishini belgilaydi. Undan keyin kelgan ma'lumotlar rad etiladi yoki DLQ ga o'tkaziladi.

**6. Lambda arxitekturasi nima va uning kamchiligi nimada?**
Lambda arxitekturasi ma'lumotlarni parallel ravishda ham Batch Layer-ga (aniqlik uchun), ham Speed Layer-ga (tezlik uchun) yuboradi. Kamchiligi — bitta biznes mantiqni (business logic) ikki xil texnologiyada (masalan, Spark va Storm/Flink) yozish va saqlash majburiyati.

**7. Kappa arxitekturasi qanday ishlaydi?**
Kappa arxitekturasi batch layerdan butunlay voz kechib, barcha ma'lumotlarni yagona oqimli (stream) dvigatel yordamida qayta ishlaydi. Tarixiy ma'lumotlarni qayta ishlash uchun esa log brokeridan (Kafka) ma'lumotlar boshidan qayta oqiziladi (replay).

**8. At-least-once, At-most-once va Exactly-once delivery semantics farqlari nimada?**
*   **At-most-once:** Xabar 0 yoki 1 marta yetib boradi (yo'qolishi mumkin, dublikat bo'lmaydi).
*   **At-least-once:** Xabar kamida 1 marta yetib boradi (yo'qolmaydi, lekin dublikat bo'lishi mumkin).
*   **Exactly-once:** Xabar aniq 1 marta yetkaziladi va qayta ishlanadi (tranzaksiyalar va idempotentlik yordamida erishiladi).

**9. Stateful vs Stateless stream processing nima?**
Stateless-da har bir event mustaqil qayta ishlanadi. Stateful-da esa tizim o'tgan eventlar tarixini (masalan, oxirgi 1 soatdagi tranzaksiyalar summasini) xotirada saqlab turishi kerak.

**10. Tumbling Window va Sliding Window o'rtasidagi farqni chizib bering.**
Tumbling Window oynalari bir-biri bilan kesishmaydi (10:00-10:05, 10:05-10:10). Sliding Window oynalari esa siljish qadami tufayli ustma-ust tushishi mumkin (10:00-10:05 oyna 1 daqiqadan keyin 10:01-10:06 bo'lib o'zgaradi).

**11. Nega oqimli tizimlarda ma'lumotlar tartibsiz (out-of-order) kelib qoladi?**
Tarmoq uzilishlari, qurilmalarning oflayn rejimda ishlashi va yuklamalar muvozanati tufayli eventlar yaratilgan vaqtidan ancha kech yetib kelishi mumkin.

**12. Backpressure nima va u oqimli ishlov berishda nega zarur?**
Agar ma'lumotlar oqimi tezligi Consumer-ning qayta ishlash tezligidan yuqori bo'lsa, tizim qulamasligi uchun brokerga xabarlar tezligini pasaytirish haqida signal yuboriladi. Bu Backpressure deyiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Dars doirasida siz MapReduce simulyatsiyasi, oynali agregatorlar (Tumbling, Sliding, Session), Watermark trekeri va Lambda/Kappa arxitekturasi elementlarini yozasiz. Har bir topshiriq real ma'lumotlar oqimini simulyatsiya qiladi.

---

## 7. 📝 12 ta Mini Test

Bilimingizni tekshirish uchun quyidagi testlarni bajaring. Savollar asosiy tushunchalar, intervyu savollari va real tizim dizayniga asoslangan.

---

## 8. 🎯 Real Project Case Study

### Netflix Real-Time Recommendation System
Netflix foydalanuvchilar qaysi videoni tomosha qilayotganini real vaqtda kuzatish uchun **Apache Flink** va **Apache Kafka** dan foydalanadi.
*   **Muammo:** Foydalanuvchi sahifasini tark etmasdan oldin unga mos tavsiyalarni 1 soniya ichida chiqarish kerak edi. An'anaviy batch processing (Hadoop) buni bajara olmas edi.
*   **Yechim:** Foydalanuvchi bosgan har bir tugma (clickstream) Kafka orqali Flink-ga keladi. Flink dynamic Session Window yordamida foydalanuvchi faolligini kuzatib boradi va uning joriy qiziqishlari asosida tavsiyalarni o'zgartiradi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyida Lambda va Kappa arxitekturasining taqqoslanishi hamda oynalash turlari tasvirlangan:

\\\`mermaid
flowchart TD
    subgraph LambdaArchitecture [Lambda Architecture]
        Source1[Ma'lumotlar Manbasi] --> BatchLayer[Batch Layer - Hadoop/Spark]
        Source1 --> SpeedLayer[Speed Layer - Storm/Flink]
        BatchLayer --> ServingLayer[(Batch Views)]
        SpeedLayer --> ServingLayer2[(Real-time Views)]
        ServingLayer --> Query[Mijoz So'rovi Consolidation]
        ServingLayer2 --> Query
    end

    subgraph KappaArchitecture [Kappa Architecture]
        Source2[Ma'lumotlar Manbasi] --> LogBroker[(Kafka / Append-only Log)]
        LogBroker --> StreamEngine[Stream Engine - Flink/Spark Streaming]
        StreamEngine --> ServingDB[(Real-time Serving DB)]
        ServingDB --> Query2[Mijoz So'rovi]
    end
\\\`

---

## 10. 📌 Cheat Sheet

| Xususiyat | Batch Processing | Stream Processing |
| :--- | :--- | :--- |
| **Ma'lumotlar hajmi** | Cheklangan, statik | Cheksiz, dinamik |
| **Kechikish (Latency)** | Daqiqalar / Soatlar | Millisekund / Soniyalar |
| **Dvigatellar** | Hadoop MapReduce, Spark | Apache Flink, Kafka Streams |
| **Oynalash (Windowing)** | Ishlatilmaydi (yoki statik) | Tumbling, Sliding, Session |
| **Holat (State)** | Saqlanmaydi (tarixiy) | Stateful (xotirada saqlanadi) |
`,
  exercises: [
    {
      id: 1,
      title: "MapReduce Matn Protsessori",
      instruction: "Berilgan matn satrini Map va Reduce bosqichlaridan o'tkazib, undagi so'zlarning umumiy sonini hisoblaydigan `mapReduce(text)` funksiyasini yozing. Matndagi tinish belgilarini yo'qoting va harflar registrini kichiklashtiring. Natija obyekt ko'rinishida bo'lsin.",
      startingCode: "function mapReduce(text) {\n  // Kodni shu yerda yozing\n}",
      hint: "replace() yordamida tinish belgilarini olib tashlang, split() orqali so'zlarga bo'ling va reduce orqali sanang.",
      test: "if (typeof mapReduce !== 'function') return 'mapReduce topilmadi'; const res = mapReduce('Hello, world! Hello.'); if (res.hello !== 2 || res.world !== 1) return 'Hisoblash xato'; return null;"
    },
    {
      id: 2,
      title: "Tumbling Window Agregatori",
      instruction: "Oqimdagi eventlarni `windowSize` (millisekund) bo'yicha Tumbling Window (kesishmaydigan oynalar)ga guruhlab summani hisoblovchi `tumbleAggregate(events, windowSize)` funksiyasini yozing. Eventlar `{ timestamp, value }` shaklida bo'ladi. Har bir oyna boshlanishi: `Math.floor(timestamp / windowSize) * windowSize` ga teng. Natijani oyna boshlanish vaqti bo'yicha o'sish tartibida saralab, `{ windowStart, sum }` ko'rinishidagi massiv sifatida qaytaring.",
      startingCode: "function tumbleAggregate(events, windowSize) {\n  // Kodni shu yerda yozing\n}",
      hint: "Eventlarni windowStart kaliti bilan guruhlang, so'ngra massivga aylantirib saralang.",
      test: "if (typeof tumbleAggregate !== 'function') return 'tumbleAggregate topilmadi'; const evs = [{ timestamp: 12, value: 5 }, { timestamp: 18, value: 3 }, { timestamp: 25, value: 10 }]; const res = tumbleAggregate(evs, 10); if (res.length !== 2) return 'Oynalar soni noto\\'g\\'ri'; if (res[0].windowStart !== 10 || res[0].sum !== 8) return 'Birinchi oyna xato'; if (res[1].windowStart !== 20 || res[1].sum !== 10) return 'Ikkinchi oyna xato'; return null;"
    },
    {
      id: 3,
      title: "Sliding Window Agregatori",
      instruction: "Sliding Window (siljuvchi oyna) yordamida oqimdagi ma'lumotlarni hisoblang. `slideAggregate(events, windowSize, slideSize)` funksiyasi oyna hajmi (`windowSize`) va siljish qadami (`slideSize`) bo'yicha eventlarni guruhlaydi. Oyna boshlanish vaqtlari `0` dan boshlanib, maksimal timestampga yetguncha `slideSize` qadami bilan o'sadi. Oynada kamida bitta event bo'lishi va faqat `sum > 0` bo'lgan faol oynalar `windowStart` bo'yicha saralangan massivda qaytarilishi kerak.",
      startingCode: "function slideAggregate(events, windowSize, slideSize) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir oyna [start, start + windowSize) oralig'ini qamrab oladi. start qiymatlarini 0 dan boshlab maxTimestamp gacha siljiting.",
      test: "if (typeof slideAggregate !== 'function') return 'slideAggregate topilmadi'; const evs = [{ timestamp: 5, value: 10 }, { timestamp: 12, value: 20 }]; const res = slideAggregate(evs, 10, 5); const w5 = res.find(w => w.windowStart === 5); if (!w5 || w5.sum !== 30) return 'Siljuvchi oyna hisobi xato'; return null;"
    },
    {
      id: 4,
      title: "Late-data Watermark Tracker",
      instruction: "Kechikkan ma'lumotlarni aniqlash uchun `WatermarkTracker` klassini yozing. U quyidagi metodlarga ega bo'lsin:\n1. `updateWatermark(eventTimestamp)`: Tizim ko'rgan eng yuqori timestampdan `allowedLateness`ni chegirib watermarkni yangilaydi (lekin watermark hech qachon kamaymaydi).\n2. `isLate(timestamp)`: Berilgan timestamp joriy watermarkdan kichik bo'lsa `true`, aks holda `false` qaytaradi.\n3. `getWatermark()`: Joriy watermarkni qaytaradi.",
      startingCode: "class WatermarkTracker {\n  constructor(allowedLateness) {\n    this.allowedLateness = allowedLateness;\n    this.watermark = 0;\n    this.maxTime = 0;\n  }\n  // Metodlarni yozing\n}",
      hint: "maxTime = Math.max(maxTime, eventTimestamp); watermark = Math.max(watermark, maxTime - allowedLateness);",
      test: "if (typeof WatermarkTracker !== 'function') return 'WatermarkTracker topilmadi'; const tracker = new WatermarkTracker(5); tracker.updateWatermark(10); if (tracker.getWatermark() !== 5) return 'Boshlang\\'ich watermark xato'; if (tracker.isLate(4) !== true) return 'Kechikkan event noto\\'g\\'ri aniqlandi'; tracker.updateWatermark(8); if (tracker.getWatermark() !== 5) return 'Watermark pasaymasligi kerak'; return null;"
    },
    {
      id: 5,
      title: "Session Window Dinamik Guruhlovchi",
      instruction: "Foydalanuvchilarning faoliyatini vaqt bo'yicha tahlil qilish uchun `sessionAggregate(events, inactivityGap)` funksiyasini yozing. Agar foydalanuvchining ketma-ket kelgan ikki eventi orasidagi vaqt farqi `inactivityGap` dan katta bo'lsa, yangi sessiya ochiladi. Natijada `{ userId, sessionStart, sessionEnd, count }` formatidagi massiv `userId` va `sessionStart` bo'yicha saralab qaytarilsin.",
      startingCode: "function sessionAggregate(events, inactivityGap) {\n  // Kodni shu yerda yozing\n}",
      hint: "Eventlarni foydalanuvchilar bo'yicha guruhlang, timestamp bo'yicha saralang, so'ngra farqni hisoblab sessiyalarga bo'ling.",
      test: "if (typeof sessionAggregate !== 'function') return 'sessionAggregate topilmadi'; const evs = [{ userId: 'A', timestamp: 10 }, { userId: 'A', timestamp: 15 }, { userId: 'A', timestamp: 30 }]; const res = sessionAggregate(evs, 10); if (res.length !== 2) return 'Sessiyalar soni xato'; if (res[0].sessionEnd !== 15 || res[1].sessionStart !== 30) return 'Sessiya chegaralari xato'; return null;"
    },
    {
      id: 6,
      title: "Micro-batch Engine Simulyatori",
      instruction: "Apache Spark Streaming kabi micro-batch modelini yozing. `MicroBatchEngine` klassi `batchSize` va `processor` funksiyasini qabul qiladi. Metodlari:\n1. `push(item)`: Elementni buferga qo'shadi, agar bufer hajmi `batchSize`ga yetsa darhol `processor`ni chaqirib buferni tozalaydi.\n2. `flush()`: Buferda qolgan barcha elementlarni processorga uzatib, buferni tozalaydi.",
      startingCode: "class MicroBatchEngine {\n  constructor(batchSize, processor) {\n    this.batchSize = batchSize;\n    this.processor = processor;\n    this.buffer = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "push() ichida buffer.length === batchSize shartini tekshiring va flush() metodini chaqiring.",
      test: "if (typeof MicroBatchEngine !== 'function') return 'MicroBatchEngine topilmadi'; let processed = []; const engine = new MicroBatchEngine(2, (batch) => processed.push(batch)); engine.push(1); engine.push(2); if (processed.length !== 1) return 'Batch to\\'lganda ishlamadi'; engine.push(3); engine.flush(); if (processed.length !== 2 || processed[1][0] !== 3) return 'Flush xato'; return null;"
    },
    {
      id: 7,
      title: "Lambda Arxitekturasi So'rov Consolidation",
      instruction: "Batch view (tarixiy aniq ma'lumotlar) va Real-time view (tezkor ma'lumotlar)ni birlashtiruvchi `consolidateQueries(batchView, realTimeView)` funksiyasini yozing. Har bir view `{ key: string, count: number }` ko'rinishidagi massiv. Umumiy hisobni kalit bo'yicha qo'shib, kalit bo'yicha alifbo tartibida saralangan massiv qaytaring.",
      startingCode: "function consolidateQueries(batchView, realTimeView) {\n  // Kodni shu yerda yozing\n}",
      hint: "Map yoki obyekt yordamida ikkala massivdagi count qiymatlarini key bo'yicha jamlang.",
      test: "if (typeof consolidateQueries !== 'function') return 'consolidateQueries topilmadi'; const res = consolidateQueries([{ key: 'a', count: 10 }], [{ key: 'a', count: 2 }, { key: 'b', count: 5 }]); if (res.length !== 2 || res[0].count !== 12 || res[1].key !== 'b') return 'Consolidation xato'; return null;"
    },
    {
      id: 8,
      title: "Chronological Event Validator",
      instruction: "Eventlar oqimida tartibsizlik darajasini tekshiruvchi `validateEventOrder(events, threshold)` funksiyasini yozing. Kelgan event timestampi oldin ko'rilgan eng yuqori timestampdan `threshold` qiymatidan ko'proq orqada bo'lsa (ya'ni `timestamp < maxTimestamp - threshold`), u invalid deb hisoblanadi. Valid bo'lgan eventlarni qaytaring. Maksimal timestamp faqat valid eventlar orqali yangilanadi.",
      startingCode: "function validateEventOrder(events, threshold) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ketma-ketlikda valid eventlar uchun maxTimestamp-ni yangilab boring.",
      test: "if (typeof validateEventOrder !== 'function') return 'validateEventOrder topilmadi'; const evs = [{ id: 1, timestamp: 10 }, { id: 2, timestamp: 4 }, { id: 3, timestamp: 12 }]; const res = validateEventOrder(evs, 5); if (res.length !== 2 || res.find(e => e.id === 2)) return 'Kechikkan event noto\\'g\\'ri filtrlandi'; return null;"
    },
    {
      id: 9,
      title: "Kappa Replay State Builder",
      instruction: "Kappa arxitekturasida barcha holat logni qayta o'qish orqali shakllanadi. `buildStateFromLog(log, initialState)` funksiyasini yozing. Har bir log elementi `{ type: 'ADD' | 'SUBTRACT' | 'MULTIPLY', value: number }` ko'rinishida bo'lib, `initialState` soniga qo'llaniladi va yakuniy son qiymati qaytariladi.",
      startingCode: "function buildStateFromLog(log, initialState) {\n  // Kodni shu yerda yozing\n}",
      hint: "Array.prototype.reduce yordamida har bir log turiga mos arifmetik amalni bajaring.",
      test: "if (typeof buildStateFromLog !== 'function') return 'buildStateFromLog topilmadi'; const log = [{ type: 'ADD', value: 5 }, { type: 'MULTIPLY', value: 2 }]; if (buildStateFromLog(log, 10) !== 30) return 'Log replay hisobi noto\\'g\\'ri'; return null;"
    },
    {
      id: 10,
      title: "At-least-once Stream Deduplicator",
      instruction: "Dublikatlarni tozalovchi `StreamDeduplicator` klassini yozing. U `processor` funksiyasini qabul qiladi. Metodlari:\n1. `receive(message)`: message `{ id: string, payload: any }` shaklida. Agar `id` birinchi marta kelayotgan bo'lsa, `processor(message.payload)`ni chaqiradi va `true` qaytaradi. Dublikat bo'lsa `false` qaytaradi.\n2. `clearHistory()`: Avval ko'rilgan xabarlar tarixini tozalaydi.",
      startingCode: "class StreamDeduplicator {\n  constructor(processor) {\n    this.processor = processor;\n    this.seen = new Set();\n  }\n  // Metodlarni yozing\n}",
      hint: "Set.prototype.has va Set.prototype.add-dan foydalaning.",
      test: "if (typeof StreamDeduplicator !== 'function') return 'StreamDeduplicator topilmadi'; let count = 0; const dedup = new StreamDeduplicator((p) => { count += p; }); dedup.receive({ id: '1', payload: 10 }); dedup.receive({ id: '1', payload: 10 }); if (count !== 10) return 'Dublikat filtrlanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Batch processing va Stream processing o'rtasidagi asosiy farq nima?",
      options: [
        "Batch processing real vaqtda ishlaydi, Stream processing esa ma'lumotlarni to'plab keyin qayta ishlaydi",
        "Batch processing to'plangan tarixiy ma'lumotlarni guruhlab (offline) ishlaydi, Stream processing esa ma'lumotlar oqimini doimiy ravishda real vaqtda qayta ishlaydi",
        "Batch processing faqat ma'lumotlar bazasida ishlaydi, Stream processing esa faqat brauzerda",
        "Stream processing faqat video formatdagi fayllarni qayta ishlay oladi"
      ],
      correctAnswer: 1,
      explanation: "Batch processing ma'lumotlarni to'plab, ma'lum bir vaqt oralig'ida (masalan, kunda bir marta) qayta ishlaydi. Stream processing esa ma'lumotlar paydo bo'lishi bilan ularni darhol (real vaqtda) qayta ishlaydi."
    },
    {
      id: 2,
      question: "MapReduce paradigmida 'Shuffle' qadami nima vazifani bajaradi?",
      options: [
        "Ma'lumotlarni jismonan o'chirib yuboradi",
        "Map bosqichida hosil bo'lgan kalit-qiymat (key-value) juftliklarini kalitlari bo'yicha guruhlab, tegishli Reduce tugunlariga (nodes) tarqatadi",
        "Faqat tasodifiy sonlarni generatsiya qiladi",
        "Ma'lumotlarni siqib (compress) diskka yozadi"
      ],
      correctAnswer: 1,
      explanation: "Shuffle bosqichi Map natijalarini kaliti bo'yicha guruhlab, tarmoq orqali kerakli Reduce node-lariga yuborish vazifasini bajaradi."
    },
    {
      id: 3,
      question: "Apache Spark va Apache Flink o'rtasidagi qayta ishlash modeli bo'yicha asosiy farq nima?",
      options: [
        "Spark faqat SQL so'rovlarni qo'llab-quvvatlaydi, Flink esa yo'q",
        "Spark oqimni micro-batch (kichik guruhlar) ko'rinishida qayta ishlaydi, Flink esa har bir elementni real vaqtda (native stream) alohida qayta ishlaydi",
        "Flink faqat Hadoop ustida ishlaydi, Spark esa mustaqil ishlaydi",
        "Spark faqat offline rejimda ishlay oladi, Flink esa faqat online"
      ],
      correctAnswer: 1,
      explanation: "Apache Spark oqimni micro-batchlarga bo'lib qayta ishlasa, Apache Flink har bir elementni alohida, real vaqtda (real streaming) qayta ishlaydi."
    },
    {
      id: 4,
      question: "Tumbling Window (kesishmaydigan oyna) qanday ishlaydi?",
      options: [
        "Oynalar bir-birining ustiga tushadi va umumiy elementlarga ega bo'ladi",
        "Ruxsat etilgan kechikish vaqti tugagandan so'ng oynalar yopiladi",
        "Ruxsat etilgan oyna o'lchami bo'yicha ma'lumotlarni kesishmaydigan va bir-biri bilan ustma-ust tushmaydigan vaqt intervallariga bo'ladi",
        "Faqat sessiya vaqtiga qarab oyna hajmini dinamik o'zgartiradi"
      ],
      correctAnswer: 2,
      explanation: "Tumbling window oynalari qat'iy vaqt oraliqlarida kesishmaydi va ustma-ust tushmaydi (masalan: 0-5 daqiqa, 5-10 daqiqa)."
    },
    {
      id: 5,
      question: "Sliding Window (siljuvchi oyna) ning Tumbling Window dan asosiy farqi nima?",
      options: [
        "Sliding window oynalari bir-biri bilan ustma-ust (overlap) tushishi mumkin, chunki ular oyna hajmi (window size) va siljish qadami (slide interval) orqali aniqlanadi",
        "Sliding window faqat foydalanuvchi tizimdan chiqqanda ishlaydi",
        "Sliding window ma'lumotlarni faqat bitta serverda saqlaydi",
        "Sliding windowda hech qachon kechikkan ma'lumotlar qayta ishlanmaydi"
      ],
      correctAnswer: 0,
      explanation: "Sliding window oynalari ma'lum bir siljish qadami bo'yicha siljiydi va ular bir-biri bilan kesishishi yoki ustma-ust tushishi mumkin."
    },
    {
      id: 6,
      question: "Event Time va Processing Time farqi nimada?",
      options: [
        "Event Time - event serverga yetib kelgan vaqt, Processing Time - event hosil bo'lgan vaqt",
        "Event Time - hodisa (event) manbada sodir bo'lgan jismoniy vaqt, Processing Time - tizim/server ushbu eventni qayta ishlayotgan vaqt",
        "Ikkalasi ham bir xil vaqtni anglatadi, faqat turli kutubxonalarda boshqacha nomlanadi",
        "Event Time faqat brauzerda, Processing Time esa faqat ma'lumotlar bazasida hisoblanadi"
      ],
      correctAnswer: 1,
      explanation: "Event Time hodisa haqiqatda sodir bo'lgan vaqt (smartfon yoki datchikda), Processing Time esa server ushbu hodisani qayta ishlayotgan vaqtdir."
    },
    {
      id: 7,
      question: "Oqimli ma'lumotlarda Watermark nima vazifani bajaradi?",
      options: [
        "Ma'lumotlarni shifrlash kaliti",
        "Tizimga event vaqti (Event Time) bo'yicha ma'lumotlar ma'lum bir vaqtgacha to'liq yetib kelganini va undan oldingi oynalarni yopish mumkinligini bildiruvchi temporal chegara",
        "Foydalanuvchilar sessiyasini tugatish signali",
        "Ma'lumotlar bazasini tozalash funksiyasi"
      ],
      correctAnswer: 1,
      explanation: "Watermark oqimli tizimga 'ushbu vaqtgacha bo'lgan barcha eventlar yetib keldi' deb signal beradi va oynalarni yopishga yordam beradi."
    },
    {
      id: 8,
      question: "Lambda arxitekturasi nima va uning tarkibiy qismlari qanday?",
      options: [
        "Faqat Lambda funksiyalaridan (Serverless) foydalangan holda ilova yaratish",
        "Tarixiy aniqlik uchun Batch Layer va past kechikish (low latency) uchun Speed Layer (real-time) ni parallel ishlatib, so'rov paytida ularni Serving Layer-da birlashtirish",
        "Ma'lum ma'lumotlarni faqat bitta oqimli broker orqali qayta o'qish",
        "SQL bazalarini NoSQL bazalariga replikatsiya qilish"
      ],
      correctAnswer: 1,
      explanation: "Lambda batch va speed layerlarni parallel ishlatadi va ularni serving layerda birlashtiradi."
    },
    {
      id: 9,
      question: "Kappa arxitekturasining Lambda arxitekturasidan asosiy ustunligi nimada?",
      options: [
        "U batch layer-ni butunlay olib tashlab, barcha ma'lumotlarni yagona oqimli (stream) dvigatel yordamida qayta ishlaydi va kodning takrorlanishini (ikki marta yozishni) oldini oladi",
        "U faqat SQL tilidan foydalanadi",
        "U ma'lumotlarni hech qachon diskda saqlamaydi",
        "U faqat Hadoop bilan mos keladi"
      ],
      correctAnswer: 0,
      explanation: "Kappa arxitekturasida kod va infratuzilmani ikki xil yozish kerak emas, chunki batch va real-time uchun faqat bitta streaming dvigateli ishlatiladi."
    },
    {
      id: 10,
      question: "At-least-once (kamida bir marta) yetkazib berish modelida duch kelinadigan eng katta xavf nima?",
      options: [
        "Ma'lumotlarning butunlay yo'qolib qolishi",
        "Bir xil xabarning qayta-qayta kelishi (duplicates) tufayli tizimda takroriy operatsiyalar bajarilishi",
        "Tarmoq tezligining juda pasayib ketishi",
        "Serverning doimiy ravishda o'chib qolishi"
      ],
      correctAnswer: 1,
      explanation: "At-least-once yetkazib berishda xabarlar yo'qolmaydi, biroq tarmoq xatoliklari sababli dublikatlar kelishi mumkin. Shu sababli consumer idempotent bo'lishi shart."
    },
    {
      id: 11,
      question: "Session Window (sessiya oynasi) boshqa oynalardan qaysi xususiyati bilan farq qiladi?",
      options: [
        "U har doim 1 soat davom etadi",
        "U statik vaqt oralig'iga ega emas, balki foydalanuvchining ma'lum vaqt davomida faolsizligi (inactivity gap) asosida dinamik ravishda hosil bo'ladi va yopiladi",
        "U faqat tranzaksiyalar uchun ishlatiladi",
        "Uni faqat Apache Spark qo'llab-quvvatlaydi"
      ],
      correctAnswer: 1,
      explanation: "Session Window statik o'lchamga ega emas, u foydalanuvchining faolsizlik davriga (inactivity gap) qarab dinamik ochiladi va yopiladi."
    },
    {
      id: 12,
      question: "Katta hajmdagi ma'lumotlar oqimida 'Late Data' (kechikkan ma'lumot) deb nimaga aytiladi?",
      options: [
        "Tarmoq yoki qurilmalar uzilishi sababli Event Time bo'yicha watermark o'tib ketgandan so'ng tizimga yetib kelgan hodisalar",
        "Serverda kechasi soat 12 dan keyin qayta ishlangan fayllar",
        "Faol foydalanuvchi bekor qilgan tranzaksiyalar",
        "Formatida xatolik bo'lgan JSON xabarlar"
      ],
      correctAnswer: 0,
      explanation: "Late Data - bu joriy watermark vaqtidan kichik timestamp bilan kechikib kelgan ma'lumotlardir."
    }
  ]
};
