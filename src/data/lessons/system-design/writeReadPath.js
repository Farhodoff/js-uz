export const writeReadPath = {
  id: "writeReadPath",
  title: "Yozish va O'qish Yo'llarini Optimallashtirish (Write Path vs Read Path)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Har qanday ma'lumotlar bazasi yoki saqlash tizimining arxitekturasini loyihalashda eng asosiy savol ko'ndalang bo'ladi: **Biz ko'proq ma'lumot yozamizmi yoki o'qiymizmi?** Shu sababli yozish yo'li (**Write Path**) va o'qish yo'li (**Read Path**) alohida optimallashtiriladi.

### Real hayotiy o'xshatish

Tasavvur qiling, siz **kutubxonachisiz**:
* **B-Tree (In-place update) yondashuvi:** Har safar yangi kitob kelganda, siz uni kutubxonaning o'z javoniga, alifbo tartibiga ko'ra kerakli joyga borib joylashtirasiz. 
  * *O'qish (Read Path):* Juda oson va tez! Kitobxon kelganda uni qayerdaligini aniq bilasiz va darhol olib berasiz.
  * *Yozish (Write Path):* Juda qiyin va sekin! Agar javon to'lib qolsa, kitoblarni surish yoki boshqa javonga bo'lish kerak bo'ladi (Random I/O).
* **LSM-Tree (Append-only) yondashuvi:** Yangi kitob kelganda, siz uni darhol stol ustidagi **qabul qutisi (MemTable)**ga tashlaysiz va daftar (**WAL**)ga yozib qo'yasiz. Quti to'lganda, undagi kitoblarni saralab, alohida bir qutiga (**SSTable**) solib diskka qo'yasiz.
  * *Yozish (Write Path):* O'ta tez! Kitob kelishi bilan tezda stolga qo'yasiz va sarguzasht tugaydi.
  * *O'qish (Read Path):* Qiyinroq! Kitobni topish uchun avval stol ustini, keyin barcha alohida qutilarni birma-bir qidirishingiz kerak. Bmini tezlashtirish uchun qutilarda nimalar borligini taxminiy ko'rsatadigan tezkor ro'yxat (**Bloom Filter**) tutasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Bloom Filter yordamida tezkor tekshiruv (JSda simulyatsiya)
Bloom Filter o'qish yo'lida diskka keraksiz so'rov yuborishdan saqlaydi.
\`\`\`javascript
class SimpleBloomFilter {
  constructor(size = 100) {
    this.bitArray = new Array(size).fill(0);
    this.size = size;
  }

  // Hash funksiya 1
  _hash1(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  // Hash funksiya 2
  _hash2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return Math.abs(hash % this.size);
  }

  add(key) {
    this.bitArray[this._hash1(key)] = 1;
    this.bitArray[this._hash2(key)] = 1;
  }

  maybeExists(key) {
    const idx1 = this._hash1(key);
    const idx2 = this._hash2(key);
    // Agar ikkala bit ham 1 bo'lsa, element bor bo'lishi mumkin
    return this.bitArray[idx1] === 1 && this.bitArray[idx2] === 1;
  }
}
\`\`\`

### 2. SSTable-larni Multi-way Merge yordamida birlashtirish (Compaction)
\`\`\`javascript
function mergeTwoSSTables(sst1, sst2) {
  const result = [];
  let i = 0, j = 0;

  while (i < sst1.length && j < sst2.length) {
    if (sst1[i].key < sst2[j].key) {
      result.push(sst1[i++]);
    } else if (sst1[i].key > sst2[j].key) {
      result.push(sst2[j++]);
    } else {
      // Bir xil kalit bo'lsa, eng yangi timestamp yoki keyingisini olamiz
      result.push(sst1[i].timestamp >= sst2[j].timestamp ? sst1[i] : sst2[j]);
      i++;
      j++;
    }
  }

  while (i < sst1.length) result.push(sst1[i++]);
  while (j < sst2.length) result.push(sst2[j++]);

  return result;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### B-Tree vs LSM-Tree Solishtirma Tahlili

| Xususiyati | B-Trees (InnoDB) | LSM-Trees (RocksDB, Cassandra) |
| :--- | :--- | :--- |
| **Yozish arxitekturasi** | In-place Updates (Joyida yangilash) | Append-only (Ketma-ket qo'shib borish) |
| **I/O turi** | Random I/O (Diskning turli joylariga yozish) | Sequential I/O (Faqat oxiriga ketma-ket yozish) |
| **Yozish tezligi** | Sekinroq (B-Tree barglarini qayta tartiblash) | O'ta tez (RAM bufferga yozib diskka sequential flush qilish) |
| **O'qish tezligi** | O'ta tez (Aniq 1 yoki bir nechta sahifani o'qish) | Sekinroq (MemTable + SSTables + Bloom Filters tekshiruvi) |
| **Compaction (Zichlashtirish)**| Kerak emas (Faqat sahifalarni birlashtirish) | Doimiy kerak (Eski ma'lumotlarni o'chirish uchun) |

### LSM-Tree Arxitekturasi Qismlari

1. **WAL (Write-Ahead Log):** Tizim o'chib qolsa ma'lumot yo'qolmasligi uchun diskka yoziladigan append-only jurnal.
2. **MemTable:** RAM dagi tartiblangan xotira (odatda SkipList yoki Red-Black Tree yordamida yuritiladi). Banya yozishlar birinchi shu yerga keladi.
3. **SSTables (Sorted String Tables):** MemTable to'lganida diskka yoziladigan o'zgarmas (immutable) va kalitlari saralangan fayllar.
4. **Bloom Filters:** Kalit ma'lum bir SSTable-da bor yoki yo'qligini tekshiradigan ehtimollik algoritmi. Diskka kirishni 90%+ holatda chetlab o'tadi.
5. **Compaction:** Diskdagi ko'plab SSTable-larni birlashtirib, takrorlangan va o'chirilgan (tombstone) yozuvlarni tozalab tashlovchi fon jarayoni.

---

## 4. 🧠 Vizual Ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    subgraph B-Tree [B-Tree Architecture - Random Write]
        B_Write[Write Request] --> B_Buf[Buffer Pool - RAM]
        B_Buf -->|In-place Random I/O| B_Disk[Disk Pages - leaf nodes]
        B_Read[Read Request] --> B_Search[Root to Leaf Traversal]
        B_Search -->|Direct Page Read| B_Disk
    end

    subgraph LSM-Tree [LSM-Tree Architecture - Sequential Write]
        L_Write[Write Request] -->|1. Append log| L_WAL[WAL - Append-Only Disk]
        L_Write -->|2. Insert| L_Mem[MemTable - RAM SkipList]
        L_Mem -->|3. Flush when full| L_SST[SSTables - Sorted Immutable Disk Files]
        
        L_Read[Read Request] -->|1. Query| L_Mem
        L_Mem -->|If Miss, 2. Check| L_Bloom[Bloom Filters]
        L_Bloom -->|If true, 3. Read| L_SST
        L_Bloom -->|If false| L_Skip[Skip SSTable File]
    end
\`\`\`

---

## 5. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. B-Tree-da cheksiz Random I/O yuklamasi
Junior dasturchilar yuqori yozish yuklamasi bor tizimlarda (masalan, loglar yoki IoT sensor ma'lumotlari) MySQL/PostgreSQL-dan foydalanib, bazaning qotib qolishiga sabab bo'lishadi.
* *Nega?* B-Tree har safar indekslarni diskda yangilashi kerak. Bu juda ko'p random disk aylanmalarini talab qiladi.
* *Yechim:* Bunday holatlarda Cassandra, RocksDB yoki ClickHouse kabi LSM-Tree arxitekturasidagi bazalarni tanlash lozim.

### 2. LSM-Tree Compaction tufayli yuzaga keladigan Write Stall
Compaction jarayoni fon rejimidan chiqib disk resursini butunlay egallab olganda, bazaga yozish tezligi keskin tushib ketadi (Write Stall).
* *Tuzatish:* Compaction konfiguratsiyalarini (Leveled vs Size-Tiered) va disk I/O limitlarini to'g'ri sozlash zarur.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar bo'limida siz quyidagi vazifalarni bajarasiz:
1. Bloom Filter element qo'shish va tekshirish algoritmini yozish.
2. MemTable flush threshold simulyatorini yaratish.
3. WAL loglaridan holatni tiklovchi parser yozish.
4. SSTable larni birlashtiruvchi merge algoritmini tuzish.
5. LSM Read Path marshrutizatorini yaratish.

---

## 7. 📝 Mini Testlar

Dars yakunidagi testlar orqali ushbu tushunchalarni mustahkamlab oling.`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Bloom Filter: Elementni qo'shish va tekshirish",
      instruction: "Sodda `BloomFilter` klassini yakunlang. `add(key)` metodi berilgan ikkita hash funksiyasi (`hash1` va `hash2`) yordamida kalit indekslarini aniqlab, `storage` bit massivida ushbu indekslarni `1` qilsin. `maybeExists(key)` esa ushbu ikkala indeksdagi bitlar `1` ekanligini tekshirib `true` yoki `false` qaytarsin.",
      startingCode: "class BloomFilter {\n  constructor(size = 32) {\n    this.size = size;\n    this.storage = new Array(size).fill(0);\n  }\n\n  hash1(str) {\n    let hash = 0;\n    for (let i = 0; i < str.length; i++) {\n      hash = (hash * 31 + str.charCodeAt(i)) % this.size;\n    } \n    return Math.abs(hash);\n  }\n\n  hash2(str) {\n    let hash = 5381;\n    for (let i = 0; i < str.length; i++) {\n      hash = ((hash << 5) + hash) + str.charCodeAt(i);\n    } \n    return Math.abs(hash % this.size);\n  }\n\n  add(key) {\n    const idx1 = this.hash1(key);\n    const idx2 = this.hash2(key);\n    this.storage[idx1] = 1;\n    this.storage[idx2] = 1;\n  }\n\n  maybeExists(key) {\n    const idx1 = this.hash1(key);\n    const idx2 = this.hash2(key);\n    return this.storage[idx1] === 1 && this.storage[idx2] === 1;\n  }\n}",
      hint: "add() ichida hash1(key) va hash2(key) qiymatlarini storage massivida indeks sifatida olib, qiymatini 1 qiling. maybeExists() esa ikkala indeks ham 1 ekanligini tekshiradi.",
      test: "if (typeof BloomFilter !== 'function') return 'BloomFilter klass emas';\nconst bf = new BloomFilter(32);\nbf.add('apple');\nif (!bf.maybeExists('apple')) return 'Qo\\'shilgan element topilmadi';\nbf.add('banana');\nif (!bf.maybeExists('banana')) return 'banana topilmadi';\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ MemTable: SSTable-ga Flush qilish simulyatori",
      instruction: "MemTable dagi ma'lumotlar hajmi `maxSize` dan oshganda flush qiluvchi `MemTable` klassini yakunlang. `put(key, value)` metodida har safar hajm (`key.length + value.length`) hisoblab boriladi. Agar umumiy hajm `maxSize` ga yetsa yoki oshsa, barcha saqlangan ma'lumotlar kalit bo'yicha alifbo tartibida saralanib, `{ key, value }` massivi shaklida flush qilinishi, xotira tozalanishi va ushbu massiv qaytarilishi kerak. Aks holda `null` qaytadi.",
      startingCode: "class MemTable {\n  constructor(maxSize) {\n    this.maxSize = maxSize;\n    this.currentSize = 0;\n    this.data = new Map();\n  }\n\n  put(key, value) {\n    this.data.set(key, value);\n    this.currentSize += key.length + value.length;\n    if (this.currentSize >= this.maxSize) {\n      return this.flush();\n    }\n    return null;\n  }\n\n  flush() {\n    const sorted = [...this.data.entries()]\n      .map(([k, v]) => ({ key: k, value: v }))\n      .sort((a, b) => a.key.localeCompare(b.key));\n    this.data.clear();\n    this.currentSize = 0;\n    return sorted;\n  }\n}",
      hint: "put ichida avval data.set(key, value) qiling va currentSize ga key.length + value.length qo'shing. Agar currentSize >= maxSize bo'lsa, flush() metodini chaqiring va natijasini qaytaring. flush() ichida ma'lumotlarni saralab, tozalab, massivni qaytaring.",
      test: "if (typeof MemTable !== 'function') return 'MemTable klass emas';\nconst mem = new MemTable(20);\nlet f1 = mem.put('c', '3');\nlet f2 = mem.put('a', '1');\nlet f3 = mem.put('b', '2000000000000000000');\nif (!f3) return 'Flush sodir bo\\'lmadi';\nif (f3[0].key !== 'a' || f3[1].key !== 'b' || f3[2].key !== 'c') return 'SSTable kalitlari saralanmagan';\nif (mem.currentSize !== 0) return 'Flushdan keyin xotira tozalanmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ WAL: Tizim xatoligidan keyin holatni tiklash (Recovery)",
      instruction: "Qatorlardan iborat WAL loglarini o'qib, yakuniy holatni obyekt shaklida qaytaruvchi `recoverFromWAL(logLines)` funksiyasini yozing. To'g'ri formatlar: `SET key:value` va `DEL key`. Noto'g'ri qatorlarni o'tkazib yuboring.",
      startingCode: "function recoverFromWAL(logLines) {\n  const db = {};\n  for (const line of logLines) {\n    const parts = line.split(' ');\n    if (parts.length < 2) continue;\n    const op = parts[0];\n    if (op === 'SET') {\n      const kv = parts[1].split(':');\n      if (kv.length >= 2 && kv[0]) {\n        db[kv[0]] = kv.slice(1).join(':');\n      }\n    } else if (op === 'DEL') {\n      const key = parts[1];\n      if (key) {\n        delete db[key];\n      }\n    }\n  }\n  return db;\n}",
      hint: "Har bir qatorni split(' ') yordamida bo'ling. Agar birinchi so'z 'SET' bo'lsa va uning qiymat qismida ':' bo'lsa, split(':') qilib key va value ni oling. Agar 'DEL' bo'lsa kalitni o'chiring.",
      test: "if (typeof recoverFromWAL !== 'function') return 'recoverFromWAL funksiya emas';\nconst log = ['SET name:Ali', 'SET age:25', 'DEL age', 'SET city:Tashkent', 'SET invalid', 'SET name:Vali'];\nconst state = recoverFromWAL(log);\nif (state.name !== 'Vali') return 'Oxirgi yozilgan qiymat tiklanmadi';\nif ('age' in state) return 'DEL qilingan kalit o\\'chirilmadi';\nif (state.city !== 'Tashkent') return 'city tiklanmadi';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ SSTable Merging: Ko'p sonli SSTable-larni birlashtirish",
      instruction: "Bir nechta saralangan SSTable massivlarini bitta umumiy saralangan massivga birlashtiruvchi `mergeSSTables(sstables)` funksiyasini yozing. Takrorlangan kalitlar uchrasa, faqat eng katta `timestamp`ga ega bo'lganini saqlang. Agar timestamp bir xil bo'lsa, massivlar ro'yxatida keyinroq kelgan sstable ustunlikka ega bo'ladi.",
      startingCode: "function mergeSSTables(sstables) {\n  const keyMap = new Map();\n  sstables.forEach((sstable, sstIdx) => {\n    sstable.forEach(item => {\n      const existing = keyMap.get(item.key);\n      if (!existing || item.timestamp > existing.timestamp || (item.timestamp === existing.timestamp && sstIdx > existing.sstIdx)) {\n        keyMap.set(item.key, { value: item.value, timestamp: item.timestamp, sstIdx });\n      }\n    });\n  });\n  return [...keyMap.entries()]\n    .map(([key, data]) => ({ key, value: data.value, timestamp: data.timestamp }))\n    .sort((a, b) => a.key.localeCompare(b.key));\n}",
      hint: "SSTable lardagi barcha elementlarni bitta tekis massivga yig'ing va kalit hamda timestamp bo'yicha saralang. So'ngra har bir kalit uchun eng yangi timestamp ga ega bo'lganini filtrlangan natijaga saqlang.",
      test: "const sst1 = [{ key: 'a', value: '1', timestamp: 10 }, { key: 'c', value: '3', timestamp: 10 }];\nconst sst2 = [{ key: 'b', value: '2', timestamp: 20 }, { key: 'c', value: '33', timestamp: 30 }];\nconst merged = mergeSSTables([sst1, sst2]);\nif (merged.length !== 3) return 'Birlashtirilgan ma\\'lumotlar soni xato';\nconst cNode = merged.find(x => x.key === 'c');\nif (!cNode || cNode.value !== '33') return 'Eski ma\\'lumot yangisi bilan almashtirilmadi';\nif (merged[0].key !== 'a' || merged[1].key !== 'b' || merged[2].key !== 'c') return 'Natija kalitlar bo\\'yicha tartiblanmagan';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ LSM Read Path: O'qish so'rovini yo'naltirish",
      instruction: "LSM Read Path yo'lini simulyatsiya qiling. Avval `memtable` (Map) dan kalitni qidiring, topilsa qiymatini qaytaring. Topilmasa, `sstablesWithBF` (massiv) ichidagi SSTable-larni boshidan boshlab ko'rib chiqing. Lekin har safar SSTable ma'lumotlarini qidirishdan oldin uning `bloomFilter`i orqali `maybeExists(key)` ni tekshiring. Agar u false bo'lsa, ushbu SSTable ni umuman o'qimasdan keyingisiga o'ting.",
      startingCode: "function lsmRead(key, memtable, sstablesWithBF) {\n  if (memtable.has(key)) return memtable.get(key);\n  for (const item of sstablesWithBF) {\n    if (item.bloomFilter.maybeExists(key)) {\n      const found = item.sstable.find(entry => entry.key === key);\n      if (found) return found.value;\n    }\n  }\n  return null;\n}",
      hint: "Map.has(key) va Map.get(key) yordamida memtable ni tekshiring. So'ngra for logikasi bilan sstablesWithBF elementlarini aylanib, Bloom Filter true qaytargandagina sstable massivi ichidan target kalitni qidiring.",
      test: "const mem = new Map([['x', 'mem_x']]);\nclass MockBF {\n  constructor(has) { this.has = has; }\n  maybeExists(k) { return this.has; }\n}\nconst sst1 = { sstable: [{ key: 'y', value: 'sst1_y' }], bloomFilter: new MockBF(true) };\nconst sst2 = { sstable: [{ key: 'z', value: 'sst2_z' }], bloomFilter: new MockBF(false) };\nconst ssts = [sst1, sst2];\nif (lsmRead('x', mem, ssts) !== 'mem_x') return 'MemTable-dan o\\'qish xato';\nif (lsmRead('y', mem, ssts) !== 'sst1_y') return 'SSTable-dan o\\'qish xato';\nif (lsmRead('z', mem, ssts) !== null) return 'Bloom Filter false qaytargan SSTable chetlab o\\'tilmadi';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Compaction: Tombstone-larni o'chirish va zichlashtirish",
      instruction: "LSM-Tree compaction jarayonini simulyatsiya qiling. Berilgan saralangan `{ key, value, isDeleted }` yozuvlaridan iborat massivni zichlashtiring. Har bir kalit uchun faqat eng oxirgi (massivda keyinroq uchragan) yozuvni qoldiring. Agar eng oxirgi yozuvda `isDeleted: true` bo'lsa, ushbu kalitni butunlay natijadan o'chirib tashlang.",
      startingCode: "function compactData(records) {\n  const map = new Map();\n  for (const r of records) {\n    map.set(r.key, r);\n  }\n  return [...map.values()]\n    .filter(r => !r.isDeleted)\n    .sort((a, b) => a.key.localeCompare(b.key));\n}",
      hint: "Massivni boshidan oxirigacha aylanib o'tib, key bo'yicha oxirgi holatni Map yordamida saqlab boring. Oxirida Map dagi elementlarni filtrlab (isDeleted: false bo'lganlarini) massiv ko'rinishida qaytaring.",
      test: "const recs = [\n  { key: 'a', value: '1', isDeleted: false },\n  { key: 'a', value: '2', isDeleted: false },\n  { key: 'b', value: 'old', isDeleted: false },\n  { key: 'b', value: '', isDeleted: true }\n];\nconst res = compactData(recs);\nif (res.length !== 1 || res[0].key !== 'a' || res[0].value !== '2') return 'Compaction noto\\'g\\'ri ishladi';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Sparse Index: Blokni Binary Search orqali qidirish",
      instruction: "SSTable-ning sparse indeksi (`sparseIndex` - saralangan `{ key, offset }` elementlar massivi) va izlanayotgan `targetKey` berilgan. Binary search yordamida targetKey joylashgan blokning boshlang'ich offsetini toping. TargetKey birinchi kalitdan ham kichik bo'lsa `-1` qaytaring. Aks holda, unga teng yoki undan kichik bo'lgan eng katta kalitning offsetini qaytaring.",
      startingCode: "function findBlockOffset(sparseIndex, targetKey) {\n  let low = 0;\n  let high = sparseIndex.length - 1;\n  let ans = -1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (sparseIndex[mid].key.localeCompare(targetKey) <= 0) {\n      ans = sparseIndex[mid].offset;\n      low = mid + 1;\n    } else {\n      high = mid - 1;\n    }\n  }\n  return ans;\n}",
      hint: "Binary search algoritmini qo'llang. Agar o'rtadagi kalit targetKey dan kichik yoki teng bo'lsa, bu potensial javob bo'ladi. Izlanishni o'ng tomonda davom ettiring. Aks holda chap tomonda davom ettiring.",
      test: "const index = [\n  { key: 'apple', offset: 0 },\n  { key: 'cherry', offset: 100 },\n  { key: 'grape', offset: 200 },\n  { key: 'orange', offset: 300 }\n];\nif (findBlockOffset(index, 'banana') !== 0) return 'banana uchun offset 0 bo\\'lishi kerak';\nif (findBlockOffset(index, 'grape') !== 200) return 'Mos kelgan kalit offset xato';\nif (findBlockOffset(index, 'peach') !== 300) return 'peach uchun offset 300 bo\\'lishi kerak';\nif (findBlockOffset(index, 'a') !== -1) return 'Judayam kichik kalit uchun -1 qaytishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Bloom Filter: Optimal bit o'lchamini hisoblash",
      instruction: "Elementlar soni $n$ va istalgan xato ehtimolligi (False Positive Probability) $p$ berilgan bo'lsa, Bloom Filter uchun eng optimal bitlar soni $m$ va kerakli hash funksiyalar soni $k$ ni hisoblovchi `calculateBloomParams(n, p)` funksiyasini yozing. Qiymatlarni butun songa yaxlitlab (`Math.round`), `{ m, k }` ko'rinishida qaytaring.",
      startingCode: "function calculateBloomParams(n, p) {\n  const m = Math.round(- (n * Math.log(p)) / Math.pow(Math.log(2), 2));\n  const k = Math.round((m / n) * Math.log(2));\n  return { m, k };\n}",
      hint: "Formulalar: m = Math.round(- (n * Math.log(p)) / Math.pow(Math.log(2), 2)); k = Math.round((m / n) * Math.log(2));",
      test: "const params = calculateBloomParams(10000, 0.01);\nif (params.k !== 7) return 'k qiymati noto\\'g\\'ri';\nif (Math.abs(params.m - 95850) > 100) return 'm qiymati noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ Sparse Index: Siyrak indeks generatori",
      instruction: "Katta tartiblangan key-value yozuvlaridan iborat massiv berilgan. Har $N$-chi elementni tanlab olib, `{ key, offset }` ko'rinishidagi sparse index yaratuvchi `generateSparseIndex(records, N)` funksiyasini yozing. Birinchi element (index `0`) har doim birinchi element sifatida indeksga kirishi kerak.",
      startingCode: "function generateSparseIndex(records, N) {\n  const index = [];\n  for (let i = 0; i < records.length; i += N) {\n    index.push({ key: records[i].key, offset: i });\n  }\n  return index;\n}",
      hint: "i = 0 dan boshlab, records.length gacha har safar i ni N taga oshirib boring va records[i] elementining key hamda i (offset) qiymatini natija massiviga push qiling.",
      test: "const recs = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'e' }, { key: 'f' }];\nconst idx = generateSparseIndex(recs, 3);\nif (idx.length !== 2) return 'Indekslangan elementlar soni noto\\'g\\'ri';\nif (idx[0].key !== 'a' || idx[0].offset !== 0) return 'Birinchi element xato';\nif (idx[1].key !== 'd' || idx[1].offset !== 3) return 'Siyraklik qadami xato';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 WAF: Yozish yuklamasi koeffitsiyentini hisoblash",
      instruction: "Foydalanuvchi yozgan ma'lumot hajmi `logicalBytes` va compaction davomida yozuvning qayta yozilish koeffitsiyenti `compactionMultiplier` berilgan. WAF ni hisoblab raqam (float) ko'rinishida qaytaruvchi `calculateWAF(logicalBytes, compactionMultiplier)` funksiyasini yozing. Formula: WAF = (logicalBytes + logicalBytes + logicalBytes * compactionMultiplier) / logicalBytes. Kasr qismini 2 xona aniqlikda yaxlitlang.",
      startingCode: "function calculateWAF(logicalBytes, compactionMultiplier) {\n  const waf = (logicalBytes + logicalBytes + logicalBytes * compactionMultiplier) / logicalBytes;\n  return parseFloat(waf.toFixed(2));\n}",
      hint: "Matematik formulani hisoblang, so'ngra toFixed(2) orqali string olib, uni parseFloat yordamida raqamga o'tkazing.",
      test: "if (calculateWAF(100, 3) !== 5) return 'WAF xato hisoblandi';\nif (calculateWAF(500, 0.5) !== 2.5) return 'Kasrli multiplier xato';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "B-Tree va LSM-Tree tizimlarining eng asosiy farqi nimada?",
      options: [
        "B-Tree faqat ma'lumotlarni o'chirish uchun ishlatiladi, LSM-Tree esa faqat qo'shish uchun",
        "B-Tree in-place (joyida yangilash) va random I/O ga asoslangan, LSM-Tree esa append-only (ketma-ket yozish) va sequential I/O ga asoslangan",
        "B-Tree tezkor xotirada ishlaydi, LSM-Tree esa faqat diskda ishlaydi",
        "LSM-Tree relyatsion ma'lumotlar bazalarining yagona standarti hisoblanadi"
      ],
      correctAnswer: 1,
      explanation: "B-Tree diskdagi sahifalarni joyida yangilaydi (Random I/O). LSM-Tree esa ma'lumotlarni faqat oxiriga ketma-ket yozib boradi (Sequential I/O), keyin ularni zichlashtiradi."
    },
    {
      id: 2,
      question: "LSM-Tree-da WAL (Write-Ahead Log) ning vazifasi nima?",
      options: [
        "Ma'lumotlarni tartiblangan holda diskda saqlash",
        "RAMdagi MemTable ma'lumotlari crash tufayli yo'qolganda tizimni qayta tiklash (Durability)",
        "O'qish operatsiyalarini keshlash va tezlashtirish",
        "Eski SSTable fayllarini zichlashtirish"
      ],
      correctAnswer: 1,
      explanation: "MemTable faqat RAM da yashaydi. Tizim o'chib qolsa ma'lumotlar yo'qolmasligi uchun har bir yozish avval diskdagi append-only WAL fayliga yoziladi."
    },
    {
      id: 3,
      question: "Bloom Filter o'qish yo'lida (Read Path) qanday yordam beradi?",
      options: [
        "U ma'lumotni diskdan o'qib keshga yozib qo'yadi",
        "U kalit ma'lum bir SSTable-da umuman yo'qligini aniq aytib, keraksiz disk I/O ni oldini oladi",
        "U ma'lumotlar bazasini avtomatik shifrlaydi",
        "U o'chirilgan ma'lumotlarni tiklaydi"
      ],
      correctAnswer: 1,
      explanation: "Bloom Filter ehtimollik algoritmi bo'lib, kalit to'plamda mavjud emasligini 100% ishonch bilan aytadi. Agar u yo'q desa, biz SSTable faylini o'qishdan butunlay qochamiz."
    },
    {
      id: 4,
      question: "Write Amplification Factor (WAF) nima?",
      options: [
        "O'qilgan baytlar sonining yozilgan baytlar soniga nisbati",
        "Diskka haqiqatda yozilgan baytlar hajmining foydalanuvchi yuborgan ma'lumotlar hajmiga nisbati",
        "Ma'lumotlar bazasi indekslarining umumiy soni",
        "CPU yuklamasining tranzaksiyalar soniga ko'paytmasi"
      ],
      correctAnswer: 1,
      explanation: "WAF - foydalanuvchi yozgan 1 bayt ma'lumot orqa fonda (WAL, Flush, Compaction tufayli) diskka necha bayt bo'lib yozilishini ko'rsatadigan koeffitsiyentdir."
    },
    {
      id: 5,
      question: "MemTable to'lganda nima sodir bo'ladi?",
      options: [
        "Barcha ma'lumotlar o'chib ketadi",
        "Ma'lumotlar saralangan holatda yangi SSTable sifatida diskka yoziladi (Flush) va MemTable tozalanadi",
        "Ma'lumotlar to'g'ridan-to'g'ri WAL logiga yuboriladi",
        "Baza vaqtincha faqat o'qish rejimiga o'tadi"
      ],
      correctAnswer: 1,
      explanation: "MemTable hajmi belgilangan thresholdga yetganda, u o'zgarmas (immutable) holatga keltiriladi va diskka yangi SSTable fayli sifatida yoziladi (Flush)."
    },
    {
      id: 6,
      question: "SSTable (Sorted String Table) dagi ma'lumotlar qanday tuzilishga ega?",
      options: [
        "Tartibsiz va istalgan vaqtda o'zgartirish mumkin bo'lgan JSON formatida",
        "Kalitlari saralangan va tarkibi o'zgarmas (immutable) fayl ko'rinishida",
        "Faqat relational SQL jadvallari ko'rinishida",
        "Faqat in-memory saqlanadigan ma'lumotlar to'plami"
      ],
      correctAnswer: 1,
      explanation: "SSTables diskdagi tartiblangan va mutlaqo o'zgarmas (immutable) kalit-qiymat juftliklaridir. Ularni o'zgartirish uchun yangi fayllar yoziladi."
    },
    {
      id: 7,
      question: "LSM-Tree-da element qanday o'chiriladi?",
      options: [
        "Diskdagi SSTable ichidan tegishli qator topilib darhol o'chiriladi",
        "Kalit uchun maxsus tombstone (o'chirilganlik belgisi) yoziladi va u keyingi compaction jarayonida tozalanadi",
        "Faqat WAL faylini o'chirish orqali",
        "MemTable butunlay o'chiriladi"
      ],
      correctAnswer: 1,
      explanation: "LSM-Tree da ma'lumotni to'g'ridan-to'g'ri o'chirib bo'lmaydi chunki SSTables o'zgarmasdir. Shuning uchun o'chirish belgisi - tombstone yoziladi."
    },
    {
      id: 8,
      question: "Siyrak Indeks (Sparse Index) ning asosiy maqsadi nima?",
      options: [
        "Diskdagi barcha kalitlarni RAMga yuklash",
        "Faqat ma'lum bir oraliqdagi (masalan, har N-chi) kalitlar offsetini RAMda saqlab, diskdagi bloklarni tezroq binary search qilish",
        "Ma'lumotlarni shifrlash kalitlarini saqlash",
        "SSTables fayllarini avtomatik ravishda siqish"
      ],
      correctAnswer: 1,
      explanation: "Sparse index barcha kalitlarni RAMda saqlamasdan, xotirani tejaydi va kerakli kalit qaysi disk blokida joylashganini tez aniqlash imkonini beradi."
    },
    {
      id: 9,
      question: "MySQL InnoDB saqlash dvigateli (Storage Engine) qaysi arxitekturaga asoslangan?",
      options: [
        "LSM-Tree",
        "B+ Tree",
        "Hash Index",
        "Graph Database Model"
      ],
      correctAnswer: 1,
      explanation: "MySQL InnoDB va PostgreSQL relyatsion bazalari o'qish operatsiyalarini o'ta tez va in-place yangilashga moslashgan B/B+ Tree tuzilmalaridan foydalanadi."
    },
    {
      id: 10,
      question: "RocksDB va Cassandra qaysi arxitekturadan foydalanadi?",
      options: [
        "Faqat B-Tree",
        "LSM-Tree (Log-Structured Merge-Tree)",
        "R-Tree",
        "Heap Files"
      ],
      correctAnswer: 1,
      explanation: "Cassandra, RocksDB, LevelDB kabi yozish operatsiyalari o'ta ko'p va tezkor bo'lishi kerak bo'lgan bazalar LSM-Tree tizimlaridan foydalanadi."
    },
    {
      id: 11,
      question: "LSM Compaction turlaridan biri bo'lgan Leveled Compaction ning afzalligi nimada?",
      options: [
        "Yozish tezligini maksimal darajaga ko'tarishi",
        "O'qish tezligini oshirishi va Space Amplification (ortiqcha joy egallash) ni kamaytirishi",
        "WAL hajmini kichraytirishi",
        "Bloom Filter ishini butunlay to'xtatishi"
      ],
      correctAnswer: 1,
      explanation: "Leveled Compaction diskdagi ma'lumotlarni qatlamlarga bo'lib zichlaydi. Bu takrorlanishlarni keskin kamaytirib, o'qish samaradorligini oshiradi."
    },
    {
      id: 12,
      question: "Bloom Filter 'False Positive' natija berganda nima sodir bo'ladi?",
      options: [
        "Baza butunlay ishdan chiqadi va xatolik beradi",
        "Element mavjud emas deb hisoblanib, qidiruv to'xtatiladi",
        "Filtr element bor deb taxmin qiladi, lekin diskdan qidirilganda u aslida topilmaydi (ortiqcha disk I/O)",
        "Tombstone avtomatik o'chiriladi"
      ],
      correctAnswer: 2,
      explanation: "Bloom Filter 'False Positive' bo'lishi mumkin - ya'ni element yo'q bo'lsa ham bor deyishi mumkin. Bu holatda biz baribir diskni o'qiymiz va vaqt yo'qotamiz, lekin natija to'g'ri (topilmadi) bo'lib qolaveradi."
    }
  ]
};
