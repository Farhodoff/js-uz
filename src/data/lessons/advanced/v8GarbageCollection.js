export const v8GarbageCollection = {
  id: "v8GarbageCollection",
  title: "V8 Garbage Collection va Xotira Boshqaruvi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### V8 Garbage Collection nima?
JavaScript-da biz obyektlar, massivlar va funksiyalar yaratganimizda, ular kompyuter xotirasidan (Heap) joy oladi. Ammo bizga bu obyektlar kerak bo'lmay qolganda, ularni qo'lda o'chirib, xotirani bo'shatishimiz shart emas. Google Chrome va Node.js ning yuragi bo'lgan **V8 dvigateli** xotirani avtomatik boshqaradi. Bu jarayon **Garbage Collection (GC - chiqindilarni yig'ish)** deb ataladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ofisda qog'ozlar ustida ishlayapsiz**:
* **New Space (Yangi hudud):** Bu sizning stolingiz usti. Yangi yozilgan eslatmalar, qog'ozlar darhol stol ustiga tushadi. Stol tez to'lib qoladi. Siz tez-tez stol ustini tozalab, kerakmas qog'ozlarni axlatga tashlaysiz (Minor GC / Scavenger).
* **Old Space (Eski hudud):** Agar stol ustidagi ba'zi hujjatlar juda muhim bo'lsa va ulardan bir necha marta foydalangan bo'lsangiz, ularni stol ustida qoldirmay, javondagi **arxiv papkasiga** joylaysiz (Promotion / Tenuring). Arxiv papkasi sekinroq to'ladi, ammo vaqti-vaqti bilan u yerda ham katta tozalash o'tkaziladi (Major GC / Mark-Sweep-Compact).
* **Large Object Space (Katta obyektlar hududi):** Bu ofis burchagidagi ulkan doska yoki mebel. Uni stol ustiga sig'dirib bo'lmaydi va jismonan arxivga ham joylab bo'lmaydi. Shuning uchun u alohida joyda turadi.

---

## 2. 💻 Real Kod Misollari

### 1. Kuchsiz havolalar (WeakRefs)
\`WeakRef\` xotira tozalagichga to'sqinlik qilmasdan obyektga havola qilish imkonini beradi.
\`\`\`javascript
let user = { name: "Farhod", age: 30 };
const weakUser = new WeakRef(user);

// Obyektga bo'lgan kuchli havolani o'chiramiz
user = null;

// Birozdan keyin xotira tozalansa, deref() undefined qaytaradi
setTimeout(() => {
  const cachedUser = weakUser.deref();
  if (cachedUser) {
    console.log("Foydalanuvchi hamon xotirada:", cachedUser.name);
  } else {
    console.log("Foydalanuvchi xotiradan o'chirildi (GC yig'ib ketdi).");
  }
}, 1000);
\`\`\`

### 2. Resurslarni tozalash (FinalizationRegistry)
Obyekt xotiradan o'chirilganda resurslarni avtomat tozalash:
\`\`\`javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Obyekt o'chirildi. Tizim resursi yopildi: \${heldValue}\`);
});

let dbConnection = { query: () => {} };
// Obyektni ro'yxatdan o'tkazamiz va unga bog'liq ma'lumotni beramiz
registry.register(dbConnection, "db_connection_01");

// Havolani uzamiz
dbConnection = null;
// GC ishlagandan so'ng, callback chaqiriladi
\`\`\`

### 3. Xotira oqishi (Memory Leak) misoli
\`\`\`javascript
// Noto'g'ri yozilgan kod - xotira sizib chiqishi (leak)
function startTracking() {
  const largeData = new Array(1000000).fill("data");
  setInterval(() => {
    // largeData yopiq closure ichida qolib ketgan va hech qachon tozalangmaydi
    console.log(largeData.length);
  }, 1000);
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. V8 Heap Spaces (Xotira hududlari)
V8 dvigateli heap-ni bir nechta mustaqil hududlarga (spaces) bo'ladi:
* **New Space (Nursery):** Yangi yaratilgan obyektlar uchun kichik hudud (odatda 1-64MB). U ikki qismga bo'linadi: **From-Space** va **To-Space**.
* **Old Space:** Ko'p yashagan va New Space-dan o'tkazilgan (promoted) obyektlar.
* **Large Object Space:** Boshqa space-lar limitiga sig'maydigan juda katta obyektlar uchun. GC ularni ko'chirib yurmaydi.
* **Code Space:** JIT kompilyator tomonidan tayyorlangan bajariluvchi (executable) mashina kodlari.
* **Map Space (Cell Space/Property Cell Space):** Yashirin klaslar (Hidden Classes / Shapes) uchun.

### 2. Avlodlar Gipotezasi (Generational Hypothesis)
Dasturlashda ko'p obyektlar yaratilganidan so'ng juda qisqa vaqt ichida o'ladi (keraksiz bo'ladi). Shu sababli xotira ikki avlodga ajratiladi:
1. **Young Generation (Minor GC / Scavenger):** Tez-tez va juda tez ishlaydi.
2. **Old Generation (Major GC / Full Mark-Sweep-Compact):** Kamdan-kam, lekin uzoqroq ishlaydi.

### 3. Minor GC (Scavenger): Cheney nusxalash algoritmi
Minor GC New Space-ni tozalash uchun **Cheney's copying algorithm**-ni qo'llaydi:

\`\`\`mermaid
graph TD
    subgraph New Space (Nursery)
        From[From-Space] -->|Minor GC - Scavenger| To[To-Space]
    end
    To -->|Age >= 2 (Survival)| Old[Old Space]
    Old -->|Major GC - Mark-Sweep-Compact| Clean[Clean/Compacted Old Space]
\`\`\`

1. Yangi obyektlar **From-space**-da ajratiladi.
2. From-space to'lganda, Minor GC ishga tushadi. U \`Root\` pointerlardan boshlab faol (reachable) obyektlarni aniqlaydi.
3. Faol obyektlar **To-space**-ga nusxalanadi (zichlangan holda).
4. From-space-dagi qolgan barcha nofaol (dead) obyektlar o'chiriladi.
5. Keyin From va To-space joylari (rollari) almashadi.
6. Agar obyekt ushbu tozalashdan 2 marta omon qolsa (survive), u **Old Space**-ga o'tkaziladi (**Promotion**).

### 4. Major GC (Mark-Sweep-Compact)
Old Space to'lganda butun heap-ni tozalash uchun **Major GC** ishga tushadi:
* **Marking (Belgilash):** \`Root\` obyektdan boshlab barcha yetib borish mumkin bo'lgan obyektlar uchburchakli rang berish tizimi (White-Grey-Black) yordamida belgilanadi.
* **Sweeping (Tozalash):** Belgilanmagan (oq rangli) obyektlar xotira ro'yxatidan o'chiriladi va bo'sh xotira manzillari (free list) ro'yxatiga qo'shiladi.
* **Compacting (Zichlashtirish):** Xotira fragmentatsiyasini (bo'shliqlar qolib ketishini) oldini olish uchun faol obyektlar bir joyga surib jamlanadi.

### 5. Write Barrier (Yozish to'sig'i)
Minor GC paytida faqat New Space tekshiriladi. Ammo Old Space-dagi eski obyekt New Space-dagi yangi obyektga havola qilsa-chi? Butun Old Space-ni qidirib chiqish qimmatga tushadi. V8 bunaqa holatlarga **Write Barrier** yordamida yechim topgan: har safar eski obyektga oily yangi obyekt havolasi yozilganda, dvigatel uni **Remembered Set** ga yozib qo'yadi. Minor GC faqat shu eslab qolingan to'plamni tekshiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tasodifiy global o'zgaruvchilar
Sinxron kod ichida \`var\`, \`let\` yoki \`const\` kalit so'zlarisiz o'zgaruvchi yaratilsa, u global \`window\` yoki \`global\` obyektiga birikib qoladi va hech qachon GC tomonidan o'chirilmaydi.
\`\`\`javascript
function createData() {
  // global o'zgaruvchiga aylanib qoladi
  myData = new Array(1000000).fill("leak");
}
createData();
\`\`\`

### 2. O'chirilmagan taymerlar (setInterval)
Taymer ichidagi callback o'zgaruvchilarni closure orqali ushlab turadi. Taymer to'xtatilmasa, xotira to'lib boradi.
\`\`\`javascript
let element = document.getElementById("button");
const intervalId = setInterval(() => {
  if (element) {
    element.innerHTML = new Date().toString();
  }
}, 1000);
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Garbage Collector nima va u qanday ishlaydi?**
   * *Javob:* GC — bu foydalanilmayotgan xotirani avtomatik aniqlab bo'shatuvchi dvigatel qismidir. U havolasi qolmagan (unreachable) obyektlarni tozalaydi.
2. **JavaScript-da xotira qachon ajratiladi va qachon bo'shatiladi?**
   * *Javob:* Obyektlar yaratilganda xotira ajratiladi, ularga bo'lgan havolalar (references) uzilganda va GC ishlaganda bo'shatiladi.
3. **Memory Leak (Xotira oqishi) nima?**
   * *Javob:* Dasturda endi kerak bo'lmagan obyektlar xotirada saqlanib qolishi va GC ularni o'chira olmasligi natijasida xotira tugab borish muammosi.
4. **V8 dvigatelida yosh avlod (young generation) va eski avlod (old generation) farqi nimada?**
   * *Javob:* Yosh avlod yangi yaratilgan qisqa umr ko'ruvchi obyektlar uchun bo'lib, Minor GC tomonidan tez-tez tozalanadi. Eski avlod ko'p yashagan obyektlar uchun bo'lib, Major GC tomonidan boshqariladi.

### Middle
5. **Cheney nusxalash algoritmi qanday ishlaydi?**
   * *Javob:* New Space-ni From va To-space ga bo'lib, faol obyektlarni From-dan To-ga zichlab ko'chiradi va From-dagi qolgan axlatlarni darhol o'chiradi.
6. **Mark-Sweep-Compact fazalarini tushuntiring.**
   * *Javob:* Mark — faol obyektlarni belgilaydi, Sweep — nofaol obyektlarni o'chiradi, Compact — xotira bo'laklanishini yo'qotish uchun faol obyektlarni bir joyga zichlaydi.
7. **Write Barrier mexanizmi nima uchun muhim?**
   * *Javob:* U Old Space-dan New Space-ga bo'lgan havolalarni Remembered Set-da saqlaydi, natijada Minor GC ka butun Old Space xotirasini qidirib chiqishdan qutuladi.
8. **WeakMap va WeakSet-ning oddiy Map va Set-dan xotira boshqaruvidagi farqi nimada?**
   * *Javob:* WeakMap/WeakSet kalitlari faqat kuchsiz havolalarni saqlaydi. Agar kalit obyektga boshqa kuchli havola qolmasa, u GC tomonidan tozalab yuborilishi mumkin.

### Senior
9. **GC jank (pauza) nima va V8 uni kamaytirish uchun qanday texnikalarni qo'llaydi?**
   * *Javob:* GC pauzasi — tozalash paytida JS bajarilishi to'xtab qolishi. V8 buni kamaytirish uchun Incremental marking, Concurrent marking va Parallel GC usullarini qo'llaydi.
10. **Incremental Marking qanday ishlaydi?**
    * *Javob:* Dvigatel marking (belgilash) ishini yirik bir pauzada emas, balki JS kodi bajarilishi orasida kichik bo'laklarga bo'lib amalga oshiradi.
11. **V8-da Large Object Space-ning o'rni va GC unga qanday ta'sir qilishi haqida gapiring.**
    * *Javob:* Katta obyektlar (masalan, yirik typed massivlar) Large Object Space-ga joylashadi. GC ularni xotirada jismonan ko'chirmaydi (nusxalamaydi), faqat havolasi qolmaganda o'chiradi.
12. **Dasturdagi xotira oqishini Chrome DevTools yordamida qanday tashxislash mumkin?**
    * *Javob:* Performance paneli yoki Memory panelida "Heap Snapshot" olib, obektlar o'sishini solishtirish yoki "Allocation instrumentation on timeline" orqali xotira o'sish dinamikasini kuzatish mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar
Quyidagi interaktiv amaliy topshiriqlar yordamida V8 Garbage Collection mexanizmlari va xotira strukturalari bo'yicha bilimlaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test
Dars so'ngidagi test savollari orqali o'zlashtirish darajangizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Muammo: Katta hajmli SPA ilovasida sahifalar almashganda xotira o'sib borishi
Foydalanuvchi sahifalar bo'ylab o'tganda (SPA router orqali) xotira hajmi har safar o'sib boradi va ma'lum vaqt o'tganidan keyin brauzer tabining qotib qolishiga yoki yopilishiga sabab bo'ladi.

### Tashxislash:
1. Chrome DevTools -> Memory -> Heap Snapshot olinadi.
2. Sahifalar 5-6 marta almashtiriladi.
3. Yana bitta Heap Snapshot olinadi.
4. Snapshot 2 va Snapshot 1 solishtiriladi. Unda o'chirilgan (Detached) DOM elementlari hamon xotirada saqlanib qolgani aniqlanadi.

### Yechim:
Xotirada qolgan hodisalar tinglovchilarini (event listeners) sahifa yopilayotganda tozalash:
\`\`\`javascript
class ChartComponent {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
  }
  mount() {
    window.addEventListener("resize", this.handleResize);
  }
  unmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {}
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Obyektlar hovuzi (Object Pool):** Agar tez-tez o'yinlar yoki real-time dasturlarda soniyasiga minglab obyekt yaratilsa, har safar yangi obyekt yaratmasdan, avvaldan tayyorlangan obyektlar hovuzidan foydalanib, ularni qayta ishlatish (recycle) GC yuklamasini kamaytiradi.
* **Hot funksiyalarda obyekt yaratmaslik:** Tsikl (loop) ichida oily yangi obyekt yoki massiv yaratishdan qoching.
* **WeakMap dan kesh sifatida foydalanish:** Kesh obyektlarini xotirada ushlab qolmaslik uchun kuchsiz havolalardan foydalaning.

---

## 10. 📌 Cheat Sheet

| Atama | Nima degani | Vazifasi / Muhimligi |
| :--- | :--- | :--- |
| **New Space** | Yosh avlod hududi | Yangi yaratilgan qisqa umr ko'ruvchi obyektlar uchun. |
| **Old Space** | Eski avlod hududi | Ko'p yashagan va New space-dan ko'chirilgan obyektlar. |
| **Scavenger** | Minor GC algoritmi | From/To bo'limlari orqali faol obyektlarni nusxalab, tez tozalaydi. |
| **Mark-Sweep-Compact** | Major GC algoritmi | Butun heap-ni tozalaydi, bo'shliqlarni zichlaydi. |
| **Write Barrier** | Yozish to'sig'i | Old-to-New havolalarni eslab qolib, GC tezligini oshiradi. |
| **WeakRef** | Kuchsiz havola | Obyektni xotirada ushlab turmaydigan havola yaratadi. |
| **FinalizationRegistry** | Tozalash registri | Obyekt GC tomonidan yig'ilganda callback chaqirish imkonini beradi. |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Cheney's copying GC simulator",
      instruction: "`scavenge(fromSpace, rootPointers)` funksiyasini yozing. U faqat rootPointers orqali borish mumkin bo'lgan (reachable) obyektlarni `fromSpace` dan yangi yaratilgan `toSpace` (yoki qaytariladigan toza massiv/obyekt) ga nusxalashtirishi kerak. Obyektlar `fromSpace` xaritasida (key: id, value: { id, value, refs }) ko'rinishida berilgan. `rootPointers` - bu boshlang'ich obyekt id-lari ro'yxati (massiv). Agar obyektdan boshqa obyektga havola (refs - id-lar massivi) bo'lsa, ularni ham rekursiv/iterativ ravishda To-Space ga nusxalash lozim. Funksiya faqat To-Space (nusxalangan obyektlar) xaritasini qaytarishi kerak.",
      startingCode: "function scavenge(fromSpace, rootPointers) {\n  const toSpace = {};\n  // Kodni shu yerda yozing\n  return toSpace;\n}",
      hint: "`rootPointers` massividan boshlab navbat (queue) orqali kiring. Har bir id uchun `fromSpace[id]` ni olib, `toSpace[id]` ga nusxalang va uning `refs` massividagi elementlarni ham queue-ga qo'shing (agar ular hali `toSpace` ga kiritilmagan bo'lsa).",
      test: "const fromSpace = {\n  1: { id: 1, value: 'A', refs: [2] },\n  2: { id: 2, value: 'B', refs: [] },\n  3: { id: 3, value: 'C', refs: [] }\n};\nconst sandbox = new Function(code + '; return scavenge;');\nconst fn = sandbox();\nconst result = fn(fromSpace, [1]);\nif (!result['1'] || !result['2']) return 'Reachable obyektlar nusxalanmadi';\nif (result['3']) return 'Unreachable obyekt nusxalanmasligi kerak edi';\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ Sweep phase compaction simulator",
      instruction: "`compactHeap(heap)` funksiyasini yozing. `heap` massivining har bir elementi obyekt yoki `null` bo'ladi. Barcha `null` (keraksiz, o'chirilgan) qiymatlarni olib tashlab, qolgan obyektlarni massiv boshiga suring (zichlang) va massiv oxirini `null` bilan to'ldiring. Asl massivni joyida (in-place) o'zgartiring va uni qaytaring.",
      startingCode: "function compactHeap(heap) {\n  // Kodni shu yerda yozing\n  return heap;\n}",
      hint: "`filter` yoki ikki pointer usulidan foydalanib, barcha no-null obyektlarni yig'ing, so'ngra massiv elementlarini yangilang va oxirini `null` bilan to'ldiring.",
      test: "const sandbox = new Function(code + '; return compactHeap;');\nconst fn = sandbox();\nconst heap = [{id: 1}, null, {id: 2}, null, {id: 3}];\nconst result = fn(heap);\nif (result[0].id !== 1 || result[1].id !== 2 || result[2].id !== 3) return 'Zichlash noto\\'g\\'ri';\nif (result[3] !== null || result[4] !== null) return 'Massiv oxiri null bilan to\\'ldirilmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ WeakRef caching repository",
      instruction: "Kuchsiz havolalarni qo'llab-quvvatlaydigan `WeakRefCache` klassini yozing. Unda `set(key, value)` va `get(key)` metodlari bo'lsin. Qiymat keshda `WeakRef` orqali saqlanishi kerak: `new WeakRef(value)`. `get(key)` chaqirilganda, keshdagi `WeakRef` dan `deref()` orqali qiymat olinsin. Agar qiymat o'chirilgan bo'lsa (ya'ni `deref()` `undefined` bo'lsa), keshdan o'sha kalit o'chirilsin va `undefined` qaytarilsin.",
      startingCode: "class WeakRefCache {\n  constructor() {\n    this.cache = new Map();\n  }\n  set(key, value) {\n    // Kodni shu yerda yozing\n  }\n  get(key) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "`set` ichida `new WeakRef(value)` ishlating. `get` ichida `deref()` qiymatini tekshiring. Agar u `undefined` bo'lsa, `this.cache.delete(key)` bajaring.",
      test: "const sandbox = new Function(code + '; return WeakRefCache;');\nconst Cls = sandbox();\nconst myCache = new Cls();\nconst obj = { data: 'test' };\nmyCache.set('x', obj);\nif (myCache.get('x') !== obj) return 'WeakRef get to\\'g\\'ri qiymat qaytarmadi';\nmyCache.cache.set('y', { deref: () => undefined });\nif (myCache.get('y') !== undefined) return 'O\\'chirilgan obyekt uchun undefined qaytishi kerak';\nif (myCache.cache.has('y')) return 'Mavjud bo\\'lmagan obyekt keshdan o\\'chirilishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ Write barrier verification",
      instruction: "V8 da har safar eski obyektga (`generation: 'old'`) oily yangi obyekt (`generation: 'new'`) havolasi biriktirilganda, write barrier mexanizmi uni `rememberedSet` to'plamiga qo'shadi. `writeBarrier(sourceObj, key, targetObj, rememberedSet)` funksiyasini yozing. Agar `sourceObj.generation === 'old'` bo'lsa va `targetObj.generation === 'new'` bo'lsa, `rememberedSet.add(sourceObj)` chaqirilsin. Shuningdek, `sourceObj[key] = targetObj` havola o'rnatilishi lozim.",
      startingCode: "function writeBarrier(sourceObj, key, targetObj, rememberedSet) {\n  // Kodni shu yerda yozing\n}",
      hint: "`sourceObj.generation` va `targetObj.generation` qiymatlarini tekshiring hamda `rememberedSet.add(sourceObj)` chaqiring.",
      test: "const rememberedSet = new Set();\nconst source = { generation: 'old' };\nconst target = { generation: 'new' };\nconst sandbox = new Function(code + '; return writeBarrier;');\nconst fn = sandbox();\nfn(source, 'ref', target, rememberedSet);\nif (source.ref !== target) return 'Havola o\\'rnatilmadi';\nif (!rememberedSet.has(source)) return 'rememberedSet-ga qo\\'shilmadi';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Object age tracking",
      instruction: "Minor GC (Scavenger) dan omon qolgan har bir obyektning yoshi (age) 1 ga oshadi. Agar uning yoshi 2 ga yetsa, u Old Space-ga o'tkaziladi (promoted). `promoteObjects(nursery, oldSpace)` funksiyasini yozing. `nursery` - hozirgi New Space obyektlari massivi. Ularning har birida `age` xossasi mavjud. Funksiya har bir obyekt yoshini 1 taga oshirishi, yoshi 2 va undan yuqori bo'lgan obyektlarni `oldSpace` massiviga push qilishi va `nursery` massividan o'chirishi kerak.",
      startingCode: "function promoteObjects(nursery, oldSpace) {\n  // Kodni shu yerda yozing\n}",
      hint: "nursery massivi bo'ylab teskari tartibda (yoki filter yordamida) aylanib, age ni oshiring. Agar age >= 2 bo'lsa oldSpace-ga o'tkazing va nursery-dan splice qiling.",
      test: "const nursery = [{ id: 1, age: 1 }, { id: 2, age: 0 }];\nconst oldSpace = [];\nconst sandbox = new Function(code + '; return promoteObjects;');\nconst fn = sandbox();\nfn(nursery, oldSpace);\nif (oldSpace.length !== 1 || oldSpace[0].id !== 1) return 'Old space-ga noto\\'g\\'ri o\\'tkazildi';\nif (nursery.length !== 1 || nursery[0].id !== 2 || nursery[0].age !== 1) return 'Nursery-da qolgan obyektlar noto\\'g\\'ri yangilandi';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Memory leak analyzer",
      instruction: "`analyzeMemoryLeak(snapshots)` funksiyasini yozing. U heap hajmi (raqamlar) yozilgan snapshotlar massivini qabul qiladi. Agar ketma-ket 3 yoki undan ortiq snapshotlar davomida xotira miqdori tinimsiz o'sib borsa (kamaymasa yoki teng qolmasa, faqat `snapshots[i] > snapshots[i-1]` bo'lsa), xotira oqishi xavfini aniqlab, `true` qaytarsin. Aks holda `false` qaytarsin.",
      startingCode: "function analyzeMemoryLeak(snapshots) {\n  // Kodni shu yerda yozing\n  return false;\n}",
      hint: "Ketma-ket uchinchi o'sish holatini tekshirish uchun loop yozing: `snapshots[i] > snapshots[i-1] && snapshots[i-1] > snapshots[i-2]`.",
      test: "const sandbox = new Function(code + '; return analyzeMemoryLeak;');\nconst fn = sandbox();\nif (fn([10, 20, 30]) !== true) return 'O\\'sish dinamikasi uchun true chiqishi kerak';\nif (fn([10, 20, 15, 25]) !== false) return 'Kamayish bo\\'lsa false chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ FinalizationRegistry callback simulation",
      instruction: "`MockRegistry` klassini yozing. Unda `register(obj, heldValue)` metodi bo'lsin. Shuningdek, ro'yxatdan o'tishda `constructor(cleanupCallback)` qabul qilinsin. Obyektning xotiradan o'chirilishini simulyatsiya qilish uchun klassda `gcCleanup(objId)` metodi bo'lsin. Agar ro'yxatdan o'tgan obyektning `id` si (obyekt xossasi) `gcCleanup` ga yuborilsa, `cleanupCallback(heldValue)` chaqirilsin.",
      startingCode: "class MockRegistry {\n  constructor(cleanupCallback) {\n    this.cleanupCallback = cleanupCallback;\n    this.registry = new Map();\n  }\n  register(obj, heldValue) {\n    // Kodni shu yerda yozing\n  }\n  gcCleanup(objId) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "`register` ichida `this.registry.set(obj.id, heldValue)` yozing. `gcCleanup` ichida kalitni tekshirib, callbackni chaqiring va mapdan o'chiring.",
      test: "let cleanedValue = null;\nconst sandbox = new Function(code + '; return MockRegistry;');\nconst Cls = sandbox();\nconst reg = new Cls((val) => cleanedValue = val);\nconst myObj = { id: 'user_123' };\nreg.register(myObj, 'cleaned_res');\nreg.gcCleanup('user_123');\nif (cleanedValue !== 'cleaned_res') return 'Callback heldValue bilan chaqirilmadi';\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Old-to-New reference checker",
      instruction: "Old-space dan New-space dagi obyektga bog'langan barcha havolalarni aniqlovchi `findOldToNewReferences(heap)` funksiyasini yozing. `heap` - bu obyektlar ro'yxati. Funksiya Old-space dagi obyektlardan New-space dagi obyektlarga bo'lgan havolalar ro'yxatini qaytarsin (har bir element `{ sourceId, targetId }` shaklida bo'lsin).",
      startingCode: "function findOldToNewReferences(heap) {\n  const result = [];\n  // Kodni shu yerda yozing\n  return result;\n}",
      hint: "Old space obyektlarni toping, ularning `refs` massividagi har bir element ID si bo'yicha heap-dan new space obyektini qidiring. Topilsa, natijaga push qiling.",
      test: "const heap = [\n  { id: 1, generation: 'old', refs: [2, 3] },\n  { id: 2, generation: 'new', refs: [] },\n  { id: 3, generation: 'old', refs: [] }\n];\nconst sandbox = new Function(code + '; return findOldToNewReferences;');\nconst fn = sandbox();\nconst refs = fn(heap);\nif (refs.length !== 1 || refs[0].sourceId !== 1 || refs[0].targetId !== 2) return 'Noto\\'g\\'ri aniqlandi';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ Allocation limit guard",
      instruction: "Yangi xotira ajratishni nazorat qiluvchi `allocateMemory(size, limit, triggerGC)` funksiyasini yozing. Agar so'ralgan `size` qiymati limitning `80%` idan (`limit * 0.8`) ko'p yoki unga teng bo'lsa, avval `triggerGC()` funksiyasini chaqiring. Agar tozalashdan keyin ham `size >= limit` bo'lsa, `throw new Error('OOM')` xatosini tashlang. Aks holda `true` qaytaring.",
      startingCode: "function allocateMemory(size, limit, triggerGC) {\n  // Kodni shu yerda yozing\n}",
      hint: "Avval `size >= limit * 0.8` ekanligini tekshiring, undan so'ng triggerGC() ni chaqiring. Keyin `size >= limit` shartini tekshiring.",
      test: "let gcCalled = false;\nconst triggerGC = () => { gcCalled = true; };\nconst sandbox = new Function(code + '; return allocateMemory;');\nconst fn = sandbox();\nif (fn(50, 100, triggerGC) !== true) return 'Oddiy allocation true qaytarishi kerak';\nif (fn(85, 100, triggerGC) !== true || !gcCalled) return 'GC chaqirilmadi';\ntry {\n  fn(120, 100, triggerGC);\n  return 'OOM xatosi tashlanmadi';\n} catch (e) {\n  if (e.message !== 'OOM') return 'Xato xabari OOM bo\\'lishi kerak';\n}\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 GC cycle statistics log",
      instruction: "GC statistikasini yurituvchi `GCStatsLogger` klassini yozing. Unda `logCycle(gcType, beforeMemory, afterMemory)` metodi bo'lsin. Har bir chaqiruv xotiraning qancha hajmi bo'shaganini (`beforeMemory - afterMemory`) hisoblasa hamda jami necha marta `minor` va `major` GC ishlaganini, hamda jami qancha xotira bo'shatilganini kuzatsin. Klassda `getStats()` metodi bo'lsin, u `{ minorCount, majorCount, totalFreed }` obyektini qaytarsin.",
      startingCode: "class GCStatsLogger {\n  constructor() {\n    // Kodni shu yerda yozing\n  }\n  logCycle(gcType, beforeMemory, afterMemory) {\n    // Kodni shu yerda yozing\n  }\n  getStats() {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Konstruktorda o'zgaruvchilarni 0 ga tenglang va har safar logCycle chaqirilganda ularni mos ravishda yangilab boring.",
      test: "const sandbox = new Function(code + '; return GCStatsLogger;');\nconst Cls = sandbox();\nconst logger = new Cls();\nlogger.logCycle('minor', 100, 80);\nlogger.logCycle('major', 200, 120);\nconst stats = logger.getStats();\nif (stats.minorCount !== 1 || stats.majorCount !== 1 || stats.totalFreed !== 100) return 'Statistika xato!';\nreturn null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "V8 dvigatelidagi \"Generation Hypothesis\" (Avlodlar gipotezasi) nimani anglatadi?",
      "options": [
        "Ko'p obyektlar uzoq yashaydi va ularni tez-tez tekshirish kerak.",
        "Dasturdagi ko'p obyektlar yaratilganidan so'ng juda qisqa vaqt ichida \"o'ladi\" (keraksiz bo'lib qoladi).",
        "Yangi obyektlar har doim eski obyektlardan ko'ra ko'proq xotira egallaydi.",
        "Xotira tozalagich faqat eski obyektlarni tozalashi kerak."
      ],
      "correctAnswer": 1,
      "explanation": "Avlodlar gipotezasiga ko'ra, dasturdagi ko'p obyektlar juda qisqa muddat yashaydi (masalan, funksiya ichidagi lokal o'zgaruvchilar). V8 xotira boshqaruvi shu gipotezaga tayanib, xotirani New Space va Old Space ga ajratadi."
    },
    {
      "id": 2,
      "question": "V8 xotira modelidagi \"New Space\" (Nursery) nima uchun ishlatiladi?",
      "options": [
        "Katta hajmdagi massivlar va kodlarni saqlash uchun.",
        "Faqat global o'zgaruvchilarni saqlash uchun.",
        "Yangi yaratilgan, qisqa umr ko'radigan kichik obyektlarni saqlash uchun.",
        "Faqat compiled (optimallashtirilgan) mashina kodini saqlash uchun."
      ],
      "correctAnswer": 2,
      "explanation": "Yangi yaratilgan barcha kichik obyektlar avval New Space (nursery) ga tushadi. U yerda xotirani tozalash juda tez amalga oshadi."
    },
    {
      "id": 3,
      "question": "Minor GC (Scavenger) qanday algoritmga asoslangan?",
      "options": [
        "Cheney's copying algorithm (From-Space va To-Space yordamida).",
        "Mark-Sweep-Compact.",
        "Reference Counting (Havolalarni hisoblash).",
        "Generational sweep."
      ],
      "correctAnswer": 0,
      "explanation": "Minor GC Cheney nusxalash algoritmini ishlatib, faol obyektlarni From-Space-dan To-Space-ga ko'chiradi va From-Space-ni butunlay tozalaydi."
    },
    {
      "id": 4,
      "question": "Major GC (Mark-Sweep-Compact) asosan qaysi xotira hududida ishlaydi?",
      "options": [
        "New Space",
        "Large Object Space",
        "Code Space",
        "Old Space"
      ],
      "correctAnswer": 3,
      "explanation": "Major GC uzoq yashovchi obyektlar saqlanadigan Old Space-ni tozalash va u yerdagi xotirani zichlash (compaction) uchun javobgardir."
    },
    {
      "id": 5,
      "question": "V8-dagi \"Write Barrier\" (Yozish to'sig'i) nima uchun kerak?",
      "options": [
        "Xotiraga ma'lumot yozishni taqiqlash uchun.",
        "Old Space-dan New Space-dagi obyektlarga bo'lgan havolalarni (references) kuzatish va Minor GC paytida butun Old Space-ni qidirib chiqmaslik uchun.",
        "Dasturdagi xatoliklarni yozib borish uchun.",
        "Obyektlarni faqat muzlatilgan (frozen) holatda saqlash uchun."
      ],
      "correctAnswer": 1,
      "explanation": "Write Barrier har safar eski obyektga yangi obyekt havolasi yozilganda buni qayd etadi. Bu Minor GC ga butun Old Space-ni aylanib chiqmasdan, faqat Remembered Set-dan foydalanish imkonini beradi."
    },
    {
      "id": 6,
      "question": "JS-dagi `WeakRef` obyekti nima vazifani bajaradi?",
      "options": [
        "Obyektni xotirada abadiy ushlab turadi.",
        "Obyektga kuchsiz havola yaratadi, bu havola obyektning Garbage Collector tomonidan o'chirilishiga to'sqinlik qilmaydi.",
        "Xotiradagi obyektni majburiy o'chirib yuboradi.",
        "Obyektning nusxasini yaratadi."
      ],
      "correctAnswer": 1,
      "explanation": "`WeakRef` obyekti yordamida yaratilgan havolalar GC uchun to'siq bo'lmaydi. Agar obyektga boshqa kuchli havola qolmagan bo'lsa, GC uni xotiradan tozalab yuboradi."
    },
    {
      "id": 7,
      "question": "`FinalizationRegistry` nima uchun qo'llaniladi?",
      "options": [
        "Obyekt GC tomonidan xotiradan tozalangandan so'ng biror tozalash yoki resurslarni yopish callback funksiyasini ishga tushirish uchun.",
        "Yangi obyektlarni xotirada ro'yxatdan o'tkazish uchun.",
        "Dasturni to'xtatish (shutdown) jarayonini boshqarish uchun.",
        "Obyektning o'lchamini o'lchash uchun."
      ],
      "correctAnswer": 0,
      "explanation": "`FinalizationRegistry` obyektlar axlatga aylanganda ularga bog'liq resurslarni (fayl deskriptorlari, tarmoq ulanishlari) yopish uchun cleanup callback ro'yxatdan o'tkazish imkonini beradi."
    },
    {
      "id": 8,
      "question": "Qaysi xotira hududi V8-da JIT-kompilyator tomonidan yaratilgan mashina kodlarini saqlaydi?",
      "options": [
        "Old Data Space",
        "Large Object Space",
        "Code Space",
        "Map Space"
      ],
      "correctAnswer": 2,
      "explanation": "Code Space optimallashtirilgan mashina kodlarini (JIT compiler tomonidan ishlab chiqilgan kodlarni) saqlash uchun mo'ljallangan va xavfsizlik uchun faqat bajariluvchi (executable) rejimda ishlaydi."
    },
    {
      "id": 9,
      "question": "V8 dvigatelida \"GC pauses\" (Jank) muammosini kamaytirish uchun qaysi usul qo'llanilmaydi?",
      "options": [
        "Incremental marking (Bosqichma-bosqich belgilash).",
        "Concurrent marking (Parallel oqimda belgilash).",
        "Parallel compaction (Bir vaqtda zichlash).",
        "Ilova oqimini butunlay va abadiy to'xtatib qo'yuvchi sinxron bloklash."
      ],
      "correctAnswer": 3,
      "explanation": "V8 dasturning to'xtab qolish vaqtini kamaytirish uchun GC vazifalarini kichik bo'laklarga bo'ladi (incremental) yoki orqa fonda (concurrent) bajaradi, lekin dasturni abadiy bloklamaydi."
    },
    {
      "id": 10,
      "question": "Obyekt qachon New Space-dan Old Space-ga o'tkaziladi (Tenuring/Promotion)?",
      "options": [
        "Uning hajmi 1MB dan oshganda.",
        "Minor GC (Scavenger) tsikllaridan (odatda 2 marta) omon qolganda.",
        "Unga global o'zgaruvchi bog'langanda.",
        "Uni `WeakMap` ichiga joylashtirganda."
      ],
      "correctAnswer": 1,
      "explanation": "New Space-dagi obyekt bir yoki ikki marta Minor GC tozalashidan omon qolsa (ya'ni hamon unga havolalar mavjud bo'lsa), u omon qoluvchi (survivor) deb topilib, Old Space-ga ko'chiriladi."
    },
    {
      "id": 11,
      "question": "Quyidagi holatlardan qaysi biri JavaScript-da xotira sizib chiqishiga (memory leak) sabab bo'lmaydi?",
      "options": [
        "Tasodifan yaratilgan global o'zgaruvchilar.",
        "Tozalanmagan `setInterval` yoki `setTimeout` taymerlari.",
        "Kerak bo'lmagan obyektlarni o'z ichiga olgan `WeakMap` kalitlari.",
        "O'chirilgan DOM elementlariga bog'langan va xotirada qolgan hodisalar tinglovchilari (event listeners)."
      ],
      "correctAnswer": 2,
      "explanation": "`WeakMap` kalitlari kuchsiz bog'langanligi sababli, agar u yerdagi obyekt kalitiga boshqa kuchli havola qolmasa, u GC tomonidan tozalab yuboriladi va xotira sizib chiqishiga yo'l qo'ymaydi."
    },
    {
      "id": 12,
      "question": "V8-dagi Large Object Space nima uchun ajratilgan?",
      "options": [
        "Hajmi juda katta bo'lgan va boshqa space-larga sig'maydigan obyektlarni saqlash va ularni GC paytida nusxalamaslik (ko'chirmaslik) uchun.",
        "Faqat murakkab klasslarni saqlash uchun.",
        "HTML sahifasidagi barcha rasmlarni saqlash uchun.",
        "Faqat global callbacklarni saqlash uchun."
      ],
      "correctAnswer": 0,
      "explanation": "Katta obyektlarni Minor GC (Scavenger) From/To bo'limlariga nusxalash juda qimmatga tushadi. Shuning uchun ular Large Object Space-da alohida saqlanadi va GC ularni jismonan ko'chirmasdan boshqaradi."
    }
  ]
};
