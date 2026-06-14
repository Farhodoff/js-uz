export const bloomFilters = {
  id: "bloomFilters",
  title: "Bloom Filters va Ehtimolli Ma'lumotlar (Probabilistic Data Structures)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Tizimlar o'ta yiriklashib borganda, millionlab yoki milliardlab ma'lumotlar elementining mavjudligini tezkor tekshirish an'anaviy ma'lumotlar tuzilmalari (masalan, Set, Hash Map) uchun juda qimmatga tushadi. Chunki vaqt o'tishi bilan ular har bir elementni xotirada to'liq saqlashni talab qiladi.

**Bloom Filter (Blum Filtri)** — bu elementning to'plamda mavjudligini tekshirish uchun ishlatiladigan, xotirani o'ta tejaydigan ehtimolli ma'lumotlar tuzilmasidir. U elementni o'zini saqlamaydi, balki bitlar massivi (bit array) va hash funksiyalaridan foydalanadi.

### Mehmonlar Ro'yxati Analogiyasi:
Tasavvur qiling, siz juda katta tantanali kecha tashkil qilyapsiz va mehmonlar ro'yxatida 1 million odam bor. Har safar eshik tagiga kelgan odam ro'yxatda bor-yo'qligini qog'ozdan qidirish juda uzoq vaqt oladi.
Buning o'rniga siz devorga 1000 ta chiroqchadan iborat panel o'rnatasiz (barcha chiroqlar dastlab o'chirilgan - 0). Har bir kelishi kutilayotgan mehmonga 3 tadan chiroq raqamini biriktirasiz (hash funksiyalar). Mehmon tasdiqlanganda, uning 3 ta chirog'ini yoqib qo'yasiz (1 ga o'zgartirasiz).
* **Lookup (Tekshirish):** Yangi odam kelganda, uning 3 ta chirog'ini tekshirasiz.
  * Agar chiroqlarning kamida bittasi o'chgan bo'lsa: demak, bu odam ro'yxatda **mutlaqo yo'q** (False Negative bo'lishi mumkin emas, aniq 100% yo'q).
  * Agar barcha 3 ta chiroq yonib turgan bo'lsa: demak, bu odam ro'yxatda **bo'lishi mumkin** (lekin 100% kafolat emas, chunki boshqa mehmonlarning chiroqlari tasodifan aynan shu kombinatsiyani yoqib qo'ygan bo'lishi mumkin - bu **False Positive** deyiladi).

---

## 2. 💻 Real Kod Misollari

JavaScript-da sodda Bloom Filter klassi:

\`\`\`javascript
class SimpleBloomFilter {
  constructor(size = 1000, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Array(size).fill(0);
  }

  // MurmurHash yoki FNV-1a o'rniga sodda hashlar generatori
  _hashes(element) {
    const hashes = [];
    let h1 = 0;
    let h2 = 0;
    
    for (let i = 0; i < element.length; i++) {
      h1 = (h1 * 31 + element.charCodeAt(i)) % this.size;
      h2 = (h2 * 37 + element.charCodeAt(i)) % this.size;
    }
    
    // Kirill-Mitzenmacher texnikasi yordamida k ta hash hosil qilish
    for (let i = 0; i < this.hashCount; i++) {
      hashes.push(Math.abs((h1 + i * h2) % this.size));
    }
    return hashes;
  }

  add(element) {
    const indices = this._hashes(element);
    for (const index of indices) {
      this.bitArray[index] = 1;
    }
  }

  maybeContains(element) {
    const indices = this._hashes(element);
    for (const index of indices) {
      if (this.bitArray[index] === 0) {
        return false; // Aniq mavjud emas (False Negative yo'q)
      }
    }
    return true; // Bo'lishi mumkin (False Positive ehtimoli bor)
  }
}

const filter = new SimpleBloomFilter(100, 3);
filter.add("user_123");
console.log(filter.maybeContains("user_123")); // true
console.log(filter.maybeContains("user_456")); // false (yoki kam ehtimol bilan true)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Bit Array (Bitlar Massivi):
Bloom Filter faqat 0 va 1 qiymatlardan tashkil topgan bitlar ketma-ketligidir. Dastlab barcha bitlar 0 bo'ladi.

### 2. Hash Funksiyalari (k count):
Har bir elementni bitlar massividagi bir nechta indeksga o'tkazish uchun k ta mustaqil va tekis taqsimlanadigan hash funksiyalari kerak. 
* Agar k juda kichik bo'lsa, kolliziyalar (to'qnashuvlar) ko'payib, False Positive darajasi oshadi.
* Agar k juda katta bo'lsa, bitlar tez to'lib ketadi va tekshirish sekinlashadi.

Optimal formula:
k = (m / n) * ln(2)
Bu yerda m - bitlar soni, n - kiritiladigan elementlar soni.

### 3. False Positive vs False Negative:
* **False Positive (Xato ijobiy javob):** Element ro'yxatda aslida yo'q bo'lsa-da, filter "ha, bor" deb javob berishi. Bu bitlar to'qnashuvi natijasida yuz beradi.
* **False Negative (Xato salbiy javob):** Element ro'yxatda bor bo'lsa-da, filter "yo'q" deb javob berishi. **Bloom Filter-da bu holat mutlaqo sodir bo'lmaydi**, chunki element qo'shilganda uning bitlari albatta 1 qilinadi va hech qachon o'chirilmaydi.

### 4. Elementlarni O'chirish Muammosi (Deleting Elements):
Standart Bloom Filter-dan elementni o'chirib bo'lmaydi. Chunki bitta bit bir nechta har xil elementlar uchun 1 qilingan bo'lishi mumkin. Agar uni 0 qibo'ysangiz, boshqa elementlarning mavjudlik tekshiruvi buziladi.
* **Counting Bloom Filter:** Har bir bit o'rniga sonli hisoblagich (counter) ishlatadi. Element qo'shilganda hisoblagich oshiriladi, o'chirilganda kamaytiriladi. Bu o'chirishni ta'minlaydi, ammo xotirani 3-4 barobar ko'proq yeydi.
* **Cuckoo Filter:** Bloom Filter-ning zamonaviy muqobili. U elementlarning qisqacha barmoq izlarini (fingerprints) saqlash orqali elementlarni o'chirish imkonini beradi va keshni o'ta optimal boshqaradi (Cuckoo hashing yordamida).

### 5. Boshqa Probabilistic Ma'lumotlar Tuzilmalari:
* **HyperLogLog (HLL):** O'ta ulkan oqimlardagi (stream) unikal elementlar sonini (cardinality estimation) hisoblash uchun ishlatiladi. Masalan, 10 million unikal IP-manzillarni atigi 12KB xotirada, log-log darajali hash bitlarini sanash orqali 99% aniqlikda hisoblay oladi.
* **Count-Min Sketch:** Oqimdagi elementlarning takrorlanish chastotasini (frequency estimation) aniqlash uchun chastotalar matritsasini yurituvchi tuzilma.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Standart Bloom Filter-dan element o'chirishga urinish:** Junior dasturchilar bitni shunchaki 0 ga almashtirib qo'yishadi. Bu butun filtrni korruptsiya qiladi. O'chirish kerak bo'lsa, **Cuckoo Filter** yoki **Counting Bloom Filter** ishlatish shart.
2. **Kriptografik hash funksiyalarni ishlatish (SHA-256, MD5):** Bu funksiyalar xavfsizlik uchun mo'ljallangan va o'ta sekin ishlaydi. Bloom Filter uchun MurmurHash, FNV-1a yoki xxHash kabi tezkor, kriptografik bo'lmagan hashlar ishlatilishi kerak.
3. **Bitlar soni (m) va elementlar soni (n) formulasini hisobga olmaslik:** Filtr hajmini juda kichik olish tezda bitlar massivining 1 lar bilan to'lishiga va False Positive darajasining 100% ga yaqinlashishiga olib keladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Bloom Filter nima?**
Bu ma'lumotlar to'plamida element bor-yo'qligini aniqlash uchun ishlatiladigan, xotirani tejaydigan ehtimolli ma'lumotlar tuzilmasi.

**2. Bloom Filter qanday holatlarda False Negative berishi mumkin?**
Hech qachon. Agar element kiritilgan bo'lsa, unga mos bitlar albatta 1 bo'ladi, shuning uchun filtr hech qachon bor narsani yo'q demaydi.

**3. False Positive qanday yuzaga keladi?**
Turli xil elementlarning hash qiymatlari bir xil bit indekslariga to'g'ri kelib qolganda (kolliziya), filtr element aslida yo'q bo'lsa ham "bor" deb xato hisoblaydi.

**4. Nima uchun standart Bloom Filter-dan elementni o'chirib bo'lmaydi?**
Chunki bitlar bir nechta element o'rtasida umumiy bo'lishi mumkin. Bitni o'chirish boshqa elementlarning borligini inkor etib qo'yadi.

**5. Elementlarni o'chirish zarur bo'lsa, qaysi tuzilmalardan foydalaniladi?**
Counting Bloom Filter yoki Cuckoo Filter.

**6. Counting Bloom Filter-ning kamchiligi nimada?**
Bitlar o'rniga hisoblagichlar (masalan, 4-bitli counter) ishlatilgani sababli xotira hajmi bir necha barobarga ko'payadi.

**7. Cuckoo Filter-ning Bloom Filter-dan afzalligi nimada?**
Elementlarni o'chirishni qo'llab-quvvatlaydi, yuqori yuklamada False Positive ehtimoli pastroq bo'ladi va CPU keshidan samarali foydalanadi.

**8. HyperLogLog algoritmi qachon ishlatiladi?**
Juda yirik ma'lumotlar oqimida (masalan, kunlik tashrif buyuruvchilar soni) unikal elementlar sonini (cardinality) o'ta kichik xotira yordamida hisoblash uchun.

**9. Count-Min Sketch nima uchun kerak?**
Katta ma'lumot oqimlarida har bir element necha marta takrorlanganini (frequency) taxminiy hisoblash uchun.

**10. Bloom Filter uchun qaysi hash algoritmlari tavsiya etiladi?**
MurmurHash3, FNV-1a, xxHash. Ular kriptografik emas va juda tez hisoblanadi.

**11. Redis Bloom moduli nima?**
Redis bazasiga Bloom Filter va Cuckoo Filter buyruqlarini (masalan, \`BF.ADD\`, \`BF.EXISTS\`) qo'shadigan rasmiy kengaytma.

**12. Kirill-Mitzenmacher optimizatsiyasi nima?**
Faqatgina 2 ta hash funksiya yordamida k ta hash indeksini hisoblash usuli (g_i(x) = h1(x) + i * h2(x) % m). Bu hashing hisob-kitoblarini keskin tezlashtiradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar bo'limida 10 ta algoritmik topshiriqni muvaffaqiyatli yakunlang.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali bilimingizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Cassandra SSTable va PostgreSQL-da Disk Operatsiyalarini Optimallashtirish

Katta hajmdagi ma'lumotlar bazalarida (masalan, Apache Cassandra yoki BigTable) ma'lumotlar diskdagi **SSTable** deb ataluvchi fayllarda saqlanadi. Foydalanuvchi ma'lum bir kalit bo'yicha so'rov yuborganda, agar kalit bazada yo'q bo'lsa, tizim diskdagi barcha SSTable fayllarini qidirib chiqishga majbur bo'ladi (bu o'ta sekin Disk I/O degani).

**Yechim:** Har bir SSTable uchun xotirada (RAM) kichik Bloom Filter saqlanadi.
1. So'rov kelganda, avval RAM-dagi Bloom Filter-dan kalit tekshiriladi.
2. Agar Bloom Filter "yo'q" deb qaytarsa, diskka murojaat qilinmaydi (darhol 404 yoki bo'sh natija qaytadi). Bu disk I/O ni 90%+ ga kamaytiradi.
3. Faqat filtr "bor bo'lishi mumkin" degandagina, diskdagi SSTable fayli o'qiladi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyida Bloom Filter orqali ma'lumotlar bazasini aylanib o'tish (bypass) zanjiri ko'rsatilgan:

\`\`\`mermaid
graph TD
    User([Foydalanuvchi So'rovi]) --> BF{Bloom Filter RAM}
    BF -->|DEFINITELY NOT - 0| FastFail[Tezkor Javob: Topilmadi / 404]
    BF -->|MAYBE EXISTS - 1| DiskIO[Disk / SQL Database O'qish]
    DiskIO --> RealCheck{Haqiqatan ham bormi?}
    RealCheck -->|Ha| Success[Ma'lumot qaytarish]
    RealCheck -->|Yo'q - False Positive| NotFound[Topilmadi / Disk I/O baribir bajarildi]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Algoritm / Konsept | Maqsadi | Xotira Sarfi | O'chirishni qo'llaydimi? | Real Tizimlar |
| :--- | :--- | :--- | :--- | :--- |
| **Bloom Filter** | Element bor/yo'qligini tekshirish | Bir necha bit (juda kichik) | Yo'q | Cassandra, Postgres, Redis |
| **Counting Bloom** | Element borligini tekshirish + o'chirish | Bir necha nibble/bayt (o'rta) | Ha | Tarmoq marshrutizatorlari |
| **Cuckoo Filter** | O'chirishni qo'llaydigan zamonaviy filter | Bloom filterdan ham kamroq (yuqori yuklamada) | Ha | Kesh tizimlari |
| **HyperLogLog** | Unikal elementlar sonini sanash (Cardinality) | Ruxsat etilgan 12KB | N/A | Redis HLL, Google BigQuery |
| **Count-Min Sketch** | Element takrorlanish sonini hisoblash | Matritsa o'lchamiga qarab (belgilangan) | Yo'q | Trafik monitoringi, IP limit |
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Optimal parameters calculator",
    "instruction": "Kutilayotgan elementlar soni (`n`) va kerakli False Positive ehtimoli (`p`, masalan, 0.01) berilganda, optimal bit array hajmi `m` va optimal hash funksiyalar soni `k` ni hisoblaydigan `optimalParams(n, p)` funksiyasini yozing. Natijani `{ m, k }` ko'rinishida qaytaring. `m` ni Math.ceil, `k` ni esa Math.round yordamida yaxlitlang.",
    "startingCode": "function optimalParams(n, p) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Formulalar: m = - (n * ln(p)) / (ln(2)^2), k = (m / n) * ln(2). JavaScriptda ln uchun Math.log funksiyasidan foydalaniladi.",
    "test": "if (typeof optimalParams !== 'function') return 'optimalParams funksiya emas';\nconst res = optimalParams(1000, 0.01);\nif (res.m !== 9586 || res.k !== 7) return 'Hisob-kitob xato: ' + JSON.stringify(res);\nreturn null;"
  },
  {
    "id": 2,
    "title": "2️⃣ Bloom Filter Membership Checker",
    "instruction": "Sodda Bloom Filter a'zolik tekshiruvchisini yozing. `add(item)` va `maybeContains(item)` metodlarini to'ldiring.",
    "startingCode": "class BloomFilter {\n  constructor(m, k) {\n    this.m = m;\n    this.k = k;\n    this.bitArray = new Array(m).fill(0);\n  }\n\n  getHashIndices(item) {\n    let h1 = 0;\n    let h2 = 0;\n    for (let i = 0; i < item.length; i++) {\n      h1 = (h1 * 31 + item.charCodeAt(i)) % this.m;\n      h2 = (h2 * 37 + item.charCodeAt(i)) % this.m;\n    }\n    const indices = [];\n    for (let i = 0; i < this.k; i++) {\n      indices.push(Math.abs((h1 + i * h2) % this.m));\n    }\n    return indices;\n  }\n\n  add(item) {\n    // Kodni shu yerda yozing\n  }\n\n  maybeContains(item) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "add metodida elementning getHashIndices indekslarini bitArrayda 1 ga sozlang. maybeContains metodida indekslardan birortasi 0 bo'lsa false, hammasi 1 bo'lsa true qaytaring.",
    "test": "if (typeof BloomFilter !== 'function') return 'BloomFilter klass emas';\nconst bf = new BloomFilter(100, 3);\nbf.add('apple');\nif (!bf.maybeContains('apple')) return 'Qo\\'shilgan element topilmadi';\nif (bf.maybeContains('banana')) {\n  const iA = bf.getHashIndices('apple');\n  const iB = bf.getHashIndices('banana');\n  if (!iA.every(x => iB.includes(x))) {\n    return 'Mavjud bo\\'lmagan elementga noto\\'g\\'ri true qaytarildi';\n  }\n}\nreturn null;"
  },
  {
    "id": 3,
    "title": "3️⃣ Counting Bloom Filter (supporting removals)",
    "instruction": "Elementni o'chirishni qo'llab-quvvatlaydigan `CountingBloomFilter` klassini yarating.",
    "startingCode": "class CountingBloomFilter {\n  constructor(m, k) {\n    this.m = m;\n    this.k = k;\n    this.storage = new Array(m).fill(0);\n  }\n\n  getHashIndices(item) {\n    let h1 = 0;\n    let h2 = 0;\n    for (let i = 0; i < item.length; i++) {\n      h1 = (h1 * 31 + item.charCodeAt(i)) % this.m;\n      h2 = (h2 * 37 + item.charCodeAt(i)) % this.m;\n    }\n    const indices = [];\n    for (let i = 0; i < this.k; i++) {\n      indices.push(Math.abs((h1 + i * h2) % this.m));\n    }\n    return indices;\n  }\n\n  add(item) {\n    // Kodni shu yerda yozing\n  }\n\n  remove(item) {\n    // Kodni shu yerda yozing\n  }\n\n  maybeContains(item) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "add qilinganda hisoblagichlarni 1 ga oshiring, remove da 1 ga kamaytiring. maybeContains barcha indekslardagi hisoblagichlar > 0 ekanligini tekshiradi.",
    "test": "if (typeof CountingBloomFilter !== 'function') return 'CountingBloomFilter topilmadi';\nconst cbf = new CountingBloomFilter(50, 2);\ncbf.add('hello');\ncbf.add('hello');\nif (!cbf.maybeContains('hello')) return 'Element topilmadi';\ncbf.remove('hello');\nif (!cbf.maybeContains('hello')) return 'Bir marta o\\'chirilganda element hali ham qolishi kerak edi';\ncbf.remove('hello');\nif (cbf.maybeContains('hello')) return 'To\\'liq o\\'chirilgandan keyin ham bor deb ko\\'rsatilmoqda';\nreturn null;"
  },
  {
    "id": 4,
    "title": "4️⃣ Cuckoo Filter bucket slotting",
    "instruction": "Sodda chelakli `CuckooFilter` kiritish funksiyasini yozing. Agar bucket 1 bo'sh bo'lsa, barmoq izini shunga qo'ying, aks holda bucket 2 bo'sh bo'lsa, shunga qo'ying, agar ikkala chelak ham to'la bo'lsa, false qaytaring.",
    "startingCode": "class CuckooFilter {\n  constructor(bucketCount, bucketSize) {\n    this.bucketCount = bucketCount;\n    this.bucketSize = bucketSize;\n    this.buckets = Array.from({ length: bucketCount }, () => []);\n  }\n\n  getFingerprint(item) {\n    let hash = 0;\n    for (let i = 0; i < item.length; i++) {\n      hash = (hash * 31 + item.charCodeAt(i)) | 0;\n    }\n    return String(Math.abs(hash) % 256);\n  }\n\n  hash1(item) {\n    let hash = 5381;\n    for (let i = 0; i < item.length; i++) {\n      hash = (hash * 33) ^ item.charCodeAt(i);\n    }\n    return Math.abs(hash) % this.bucketCount;\n  }\n\n  hash2(i1, fingerprint) {\n    let hash = 17;\n    for (let i = 0; i < fingerprint.length; i++) {\n      hash = (hash * 37) ^ fingerprint.charCodeAt(i);\n    }\n    return Math.abs(i1 ^ hash) % this.bucketCount;\n  }\n\n  insert(item) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "Item fingerprinti va ikkita bucket indeksini hisoblang. Buckets uzunligi bucketSize dan kichik bo'lsa fingerprintni qo'shing.",
    "test": "if (typeof CuckooFilter !== 'function') return 'CuckooFilter topilmadi';\nconst cf = new CuckooFilter(4, 1);\nif (!cf.insert('apple')) return 'Birinchi kiritish muvaffaqiyatsiz';\nconst fp = cf.getFingerprint('apple');\nconst idx1 = cf.hash1('apple');\nconst idx2 = cf.hash2(idx1, fp);\nif (!cf.buckets[idx1].includes(fp) && !cf.buckets[idx2].includes(fp)) return 'Barmoq izi kiritilmadi';\nreturn null;"
  },
  {
    "id": 5,
    "title": "5️⃣ HyperLogLog cardinality estimator",
    "instruction": "Ma'lumotlar oqimidagi unikal elementlar sonini hisoblaydigan `estimateCardinality(stream, m)` funksiyasini yozing.",
    "startingCode": "function estimateCardinality(stream, m) {\n  const registers = new Array(m).fill(0);\n  const p = Math.round(Math.log2(m));\n  \n  function hash32(str) { \n    let hash = 0;\n    for (let i = 0; i < str.length; i++) {\n      hash = (hash * 31 + str.charCodeAt(i)) | 0;\n    }\n    return hash >>> 0;\n  }\n\n  // Oqimdagi har bir item uchun registerlarni to'ldiring va taxminni hisoblang\n}",
    "hint": "Bit shifting yordamida index va w ni oling, w dagi yetakchi nollar sonini hisoblab registerlarni yangilang.",
    "test": "if (typeof estimateCardinality !== 'function') return 'estimateCardinality topilmadi';\nconst stream = ['user1', 'user2', 'user1', 'user3', 'user4', 'user2'];\nconst est = estimateCardinality(stream, 4);\nif (typeof est !== 'number' || est <= 0) return 'Taxmin noto\\'g\\'ri';\nreturn null;"
  },
  {
    "id": 6,
    "title": "6️⃣ Count-Min Sketch frequency tracker",
    "instruction": "Chastotalarni taxminiy kuzatuvchi `CountMinSketch` klassini implement qiling.",
    "startingCode": "class CountMinSketch {\n  constructor(w, d) {\n    this.w = w;\n    this.d = d;\n    this.matrix = Array.from({ length: d }, () => new Array(w).fill(0));\n  }\n\n  hash(item, i) {\n    let hash = 0;\n    const seed = i * 17;\n    for (let j = 0; j < item.length; j++) {\n      hash = (hash * 31 + item.charCodeAt(j) + seed) | 0;\n    }\n    return Math.abs(hash) % this.w;\n  }\n\n  update(item, count = 1) {\n    // Kodni shu yerda yozing\n  }\n\n  query(item) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "update metodida har bir hash funktsiya uchun mos ustundagi qiymatni count ga oshiring. query da esa barcha hash ustunlaridagi qiymatlarning minimalini toping.",
    "test": "if (typeof CountMinSketch !== 'function') return 'CountMinSketch topilmadi';\nconst cms = new CountMinSketch(10, 3);\ncms.update('a', 5);\ncms.update('b', 2);\ncms.update('a', 3);\nif (cms.query('a') < 8) return 'Chastota xato';\nreturn null;"
  },
  {
    "id": 7,
    "title": "7️⃣ Hash Collision percentage evaluator",
    "instruction": "Berilgan parametrlar bo'yicha Bloom Filtrining tasodifiy to'qnashuvlar foizini hisoblovchi `evaluateCollisionRate(m, k, insertCount)` funksiyasini yozing.",
    "startingCode": "function evaluateCollisionRate(m, k, insertCount) {\n  // Bloom filter simulyatsiyasi va foizni qaytarish (0 dan 100 gacha)\n}",
    "hint": "insertCount ta element qo'shilgandan keyin, boshqa unikal elementlar tekshirilganda necha foizi 'mavjud' deb noto'g'ri topilishini hisoblang.",
    "test": "if (typeof evaluateCollisionRate !== 'function') return 'evaluateCollisionRate topilmadi';\nconst rate = evaluateCollisionRate(100, 3, 20);\nif (typeof rate !== 'number' || rate < 0 || rate > 100) return 'Foiz diapazoni xato';\nreturn null;"
  },
  {
    "id": 8,
    "title": "8️⃣ Bloom filter SQL database bypass router",
    "instruction": "Bloom Filter yordamida og'ir ma'lumotlar bazasi so'rovlarini chetlab o'tadigan `databaseRouter(bloomFilter, mockDb, queryKey)` funksiyasini yozing.",
    "startingCode": "function databaseRouter(bloomFilter, mockDb, queryKey) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Agar bloomFilter maybeContains false bo'lsa, db ga kirmasdan { status: 404, source: 'bloom_filter', data: null } qaytaring.",
    "test": "if (typeof databaseRouter !== 'function') return 'databaseRouter topilmadi';\nconst bf = { maybeContains: (k) => k === 'user_1' };\nconst db = new Map([['user_1', 'Ali']]);\nconst res = databaseRouter(bf, db, 'user_2');\nif (res.source !== 'bloom_filter' || res.status !== 404) return 'SQL bypass xato';\nreturn null;"
  },
  {
    "id": 9,
    "title": "9️⃣ HyperLogLog merge streams utility",
    "instruction": "Ikkita HyperLogLog registerlarini birlashtiruvchi `mergeHLLRegisters(registersA, registersB)` funksiyasini yozing.",
    "startingCode": "function mergeHLLRegisters(registersA, registersB) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Har bir indeks bo'yicha Math.max qiymatini oling.",
    "test": "if (typeof mergeHLLRegisters !== 'function') return 'mergeHLLRegisters topilmadi';\nconst r = mergeHLLRegisters([1, 2], [0, 3]);\nif (r[0] !== 1 || r[1] !== 3) return 'Birlashtirish xato';\nreturn null;"
  },
  {
    "id": 10,
    "title": "🔟 Cuckoo hashing kick-out resolver",
    "instruction": "Cuckoo hashing-da to'qnashuv paytida elementni siqib chiqarish (kick-out) jarayonini simulyatsiya qiluvchi funksiyani yozing. `maxKicks` urinishlardan so'ng joy topilmasa `false`, muvaffaqiyatli bo'lsa `true` qaytarsin.",
    "startingCode": "function cuckooInsertWithKickout(table1, table2, item, maxKicks) {\n  function hash1(val) {\n    let hash = 0;\n    for (let i = 0; i < val.length; i++) hash = (hash * 31 + val.charCodeAt(i)) | 0;\n    return Math.abs(hash);\n  }\n  function hash2(val) {\n    let hash = 0;\n    for (let i = 0; i < val.length; i++) hash = (hash * 37 + val.charCodeAt(i)) | 0;\n    return Math.abs(hash);\n  }\n\n  // Kodni shu yerda yozing\n}",
    "hint": "Loop ichida table1 da bo'sh joy bo'lsa joylang, bo'lmasa elementni kick qilib table2 dan qidiring va buni maxKicks gacha takrorlang.",
    "test": "if (typeof cuckooInsertWithKickout !== 'function') return 'cuckooInsertWithKickout topilmadi';\nconst t1 = [null, null];\nconst t2 = [null, null];\nconst ok = cuckooInsertWithKickout(t1, t2, 'test', 2);\nif (!ok) return 'Kiritish xato';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Bloom Filter-ning eng asosiy xususiyati nimada?",
    "options": [
      "Ma'lumotlar mavjudligini xotirani o'ta tejagan holda, ammo False Positive ehtimoli bilan tekshirish",
      "Elementlarni kalitlar bo'yicha saralab saqlash",
      "Faqat satrli ma'lumotlarni shifrlab diskda saqlash",
      "Ma'lumotlarni o'chirish tezligini O(1) qilish"
    ],
    "correctAnswer": 0,
    "explanation": "Bloom Filter elementlarni o'zini saqlamay bitlar va hash funksiyalar yordamida tekshiradi. Bunda False Positive (xato ijobiy javob) bo'lishi mumkin, ammo False Negative (xato inkor) bo'lmaydi."
  },
  {
    "id": 2,
    "question": "Bloom Filter-da 'False Positive' nima degani?",
    "options": [
      "Element filtrda bor bo'lsa-da, filtr uni yo'q deb xato topishi",
      "Element aslida to'plamda yo'q bo'lsa-da, filtr uni 'bo'lishi mumkin' (bor) deb xato javob berishi",
      "Bitlar massividagi barcha bitlarning 0 bo'lib qolishi",
      "Hash funksiyalarining cheksiz siklga tushib qolishi"
    ],
    "correctAnswer": 1,
    "explanation": "False Positive - element aslida mavjud bo'lmasa ham, bitlar to'qnashuvi tufayli filtr uni 'bor bo'lishi mumkin' deb xato xulosa qilishi."
  },
  {
    "id": 3,
    "question": "Nima uchun standart Bloom Filter-dan elementni o'chirib bo'lmaydi?",
    "options": [
      "Chunki u faqat o'qish uchun mo'ljallangan fayl tizimida yashaydi",
      "Chunki elementlar shifrlangan bo'ladi",
      "Chunki bir nechta element bitta bit indeksini birgalikda 1 ga o'zgartirgan bo'lishi mumkin, uni o'chirish boshqalarni ham yo'q qiladi",
      "Chunki o'chirish operatsiyasi O(N^2) vaqt oladi"
    ],
    "correctAnswer": 2,
    "explanation": "Bitlar birgalikda foydalanilganligi sababli, bitta element bitini o'chirish boshqa elementlarning tekshiruvini ham buzadi."
  },
  {
    "id": 4,
    "question": "Optimal hash funksiyalar sonini (k) hisoblash formulasi qaysi?",
    "options": [
      "k = m * n * ln(2)",
      "k = (m / n) * ln(2)",
      "k = (n / m) * ln(2)",
      "k = m / (n * ln(2))"
    ],
    "correctAnswer": 1,
    "explanation": "k = (m / n) * ln(2) formulasi eng minimal False Positive darajasini beruvchi optimal hash funksiyalari sonini hisoblaydi."
  },
  {
    "id": 5,
    "question": "Standart bitlar o'rniga sonli hisoblagichlarni ishlatib, o'chirishni qo'llaydigan tuzilma qaysi?",
    "options": [
      "Counting Bloom Filter",
      "Cuckoo Filter",
      "HyperLogLog",
      "Count-Min Sketch"
    ],
    "correctAnswer": 0,
    "explanation": "Counting Bloom Filter har bir bit uchun hisoblagich (counter) saqlaydi va qo'shganda oshirib, o'chirganda kamaytiradi."
  },
  {
    "id": 6,
    "question": "HyperLogLog algoritmining asosiy vazifasi nima?",
    "options": [
      "Elementlar chastotasini hisoblash",
      "Yirik oqimlardagi unikal elementlar sonini (cardinality estimation) o'ta kam xotira bilan hisoblash",
      "Ma'lumotlarni shifrlash",
      "Serverlar o'rtasida yuklamani taqsimlash"
    ],
    "correctAnswer": 1,
    "explanation": "HyperLogLog (HLL) o'ta yirik ma'lumotlar oqimida (masalan, kunlik unikal foydalanuvchilar) unikal elementlar sonini juda kam xotira sarflab baholaydi."
  },
  {
    "id": 7,
    "question": "Count-Min Sketch chastotani qanday baholaydi?",
    "options": [
      "Barcha hash qiymatlarini qo'shish orqali",
      "Faqat bitta hash funksiya yordamida",
      "Elementning o'zini saqlab sanash orqali",
      "Bir nechta hash funksiyalardan olingan indekslardagi qiymatlarning eng kichigini (minimum) olish orqali"
    ],
    "correctAnswer": 3,
    "explanation": "Count-Min Sketch element chastotasini aniqlashda to'qnashuvlar tufayli qiymat oshib ketishini hisobga olib, barcha hashlar bo'yicha eng kichik qiymatni qaytaradi."
  },
  {
    "id": 8,
    "question": "Cuckoo Hashing algoritmining o'ziga xosligi nimada?",
    "options": [
      "To'qnashuv paytida mavjud elementni boshqa jadvalga siqib chiqarish (kick-out) va zanjir hosil qilish",
      "Faqat bitta hash funksiyasidan foydalanish",
      "Hech qachon to'qnashuv sodir bo'lmasligi",
      "Faqat diskda ishlashi"
    ],
    "correctAnswer": 0,
    "explanation": "Cuckoo Hashing to'qnashuv bo'lganda eski elementni o'z uyasidan siqib chiqarib, muqobil uyasiga o'tkazadi."
  },
  {
    "id": 9,
    "question": "Agar Bloom Filter ma'lumot 'yo'q' deb javob bersa, uning haqiqatda mavjud bo'lish ehtimoli qancha?",
    "options": [
      "50% ehtimol bilan bor",
      "0% (ya'ni mutlaqo yo'q, False Negative imkonsiz)",
      "10% ehtimol bilan bor",
      "Faqat kesh tozalangandan keyin bor"
    ],
    "correctAnswer": 1,
    "explanation": "Bloom Filter hech qachon bor elementni yo'q demaydi. Shuning uchun filtr 'yo'q' desa, bu 100% aniq haqiqatdir."
  },
  {
    "id": 10,
    "question": "Bloom Filter uchun qaysi hash funksiyalari eng to'g'ri tanlov hisoblanadi?",
    "options": [
      "SHA-256 va bcrypt",
      "AES va RSA",
      "MurmurHash3, FNV-1a, yoki xxHash kabi kriptografik bo'lmagan tezkor hashlar",
      "Faqat oddiy string uzunligi"
    ],
    "correctAnswer": 2,
    "explanation": "Kriptografik bo'lmagan hashlar o'ta tez ishlaydi va Bloom Filter uchun eng mosidir. Kriptografik hashlar (SHA-256 kabi) tizimni sekinlashtiradi."
  },
  {
    "id": 11,
    "question": "Cassandra yoki BigTable kabi bazalarda Bloom Filter qanday yordam beradi?",
    "options": [
      "Bazadagi SQL xatolarni tuzatadi",
      "Mavjud bo'lmagan kalitlar uchun diskdagi SSTable fayllarini qidirishni (Disk I/O) aylanib o'tish orqali tezlashtiradi",
      "Tranzaksiyalarni avtomatik bekor qiladi",
      "Faqat administrator parollarini saqlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "RAM-da turuvchi Bloom Filter diskdagi SSTable ichida kalit bor-yo'qligini tezda tekshiradi va diskka keraksiz murojaatlarni kamaytiradi."
  },
  {
    "id": 12,
    "question": "HyperLogLog taxminan qancha xotira bilan millionlab unikal elementlarni sanay oladi?",
    "options": [
      "Atigi 12KB atrofida",
      "Kamida 1GB",
      "Har bir element uchun 8 baytdan",
      "Filtr o'lchami o'zgarmas 512MB bo'ladi"
    ],
    "correctAnswer": 0,
    "explanation": "HyperLogLog o'ta kichik xotirada (odatda 12KB) log-log hashing va yetakchi nollarni hisoblash yordamida o'ta aniq hisoblab bera oladi."
  }
]

};
