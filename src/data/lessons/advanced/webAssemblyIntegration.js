export const webAssemblyIntegration = {
  id: "webAssemblyIntegration",
  title: "WebAssembly Integration va Parallel Dasturlash",
  language: "uz",
  theory: `## 1. 💡 Sodda Tushuntirish

### WebAssembly (Wasm) nima?
JavaScript brauzerda dinamik va moslashuvchan tillardan biridir. Ammo u juda murakkab matematik hisob-kitoblar, video/audio tahrirlash, 3D o'yinlar yoki kriptografiya kabi ishlakni bajarganda sekinlashishi mumkin. 
**WebAssembly (Wasm)** — bu brauzerlar va Node.js muhitida JavaScript bilan yonma-yon, deyarli mahalliy (native) protsessor tezligida ishlash imkonini beruvchi quyi darajali (low-level) ikkilik (binary) formatdir. Siz Rust, C++ yoki Go tillarida kod yozasiz, uni \`.wasm\` formatiga kompilyatsiya qilasiz va JavaScript orqali chaqirasiz.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **yirik qurilish kompaniyasi boshlig'isiz (JavaScript)**:
* Siz mijozlar bilan muzokara qilasiz, dizaynni tanlaysiz va umumiy ishlarni boshqarasiz. Siz juda moslashuvchansiz va odamlar bilan yaxshi muloqot qilasiz.
* Lekin poydevor uchun chuqur qazish yoki og'ir yuklarni ko'tarish kerak bo'lganda, siz o'zingiz belkurak olib ishlamaysiz. Buning o'rniga, maxsus **og'ir ekskavator va kranlarni (WebAssembly)** ishga solasiz.
* Ular gapira olmaydi (DOM yoki UI bilan ishlamaydi), lekin o'zlarining og'ir vazifalarini sizdan 100 baravar tezroq va samaraliroq bajarishadi. Siz (JS) ularga qayerda ishlashni buyurasiz, ular (Wasm) ishni tugatib javob berishadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Wasm Instantiating va Linear Memory)
Wasm baytlarni yuklash va uning chiziqli xotirasidan (Linear Memory) ma'lumot o'qish:
\`\`\`javascript
// Oddiy 2 ta sonni qo'shuvchi WASM modulini yuklash
const wasmCode = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 3, 2, 1, 0,
  7, 7, 1, 3, 97, 100, 100, 0, 0, 10, 9, 1, 7, 0, 32, 0, 32, 1, 106, 11
]); // Magic bytes + simple add funksiyasi

async function runWasm() {
  const { instance } = await WebAssembly.instantiate(wasmCode);
  console.log("Add natijasi:", instance.exports.add(5, 10)); // 15
}
runWasm();
\`\`\`

### 2. Intermediate Example (Wasm.Memory va UTF-8 String o'qish)
Wasm faqat sonlar bilan ishlaydi. String uzatish uchun biz Wasmning chiziqli xotirasiga (Linear Memory) yozishimiz va u yerdan o'qishimiz kerak:
\`\`\`javascript
// Chiziqli xotira (Linear Memory) yaratish (1 page = 64KB)
const memory = new WebAssembly.Memory({ initial: 1 });

function writeStringToMemory(str, memory) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const uint8 = new Uint8Array(memory.buffer);
  
  // Ma'lumotni xotiraning boshiga yozamiz
  uint8.set(bytes, 0);
  return bytes.length; // Stringning bayt hajmi
}

function readStringFromMemory(offset, length, memory) {
  const uint8 = new Uint8Array(memory.buffer, offset, length);
  const decoder = new TextDecoder();
  return decoder.decode(uint8);
}

const len = writeStringToMemory("Salom Dunyo!", memory);
console.log(readStringFromMemory(0, len, memory)); // "Salom Dunyo!"
\`\`\`

### 3. Advanced Example (SharedArrayBuffer va Atomics yordamida oqimlararo sinxronizatsiya)
Web Worker va Asosiy oqim o'rtasida umumiy xotirada xavfsiz hisob-kitob qilish:
\`\`\`javascript
// 1. Umumiy xotira maydoni (SharedArrayBuffer) yaratamiz (4 bayt = 1 ta 32-bit butun son)
const sab = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sab);

// 2. Workerga sab ni yuboramiz
// worker.postMessage({ sab });

// 3. Atomics yordamida xavfsiz increment qilish (Race Condition oldini oladi)
function safeIncrement() {
  Atomics.add(sharedArray, 0, 1);
  console.log("Joriy qiymat:", Atomics.load(sharedArray, 0));
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Bridge Bottleneck (Ko'prik to'sig'i):** JS va C++/Rust o'rtasida har safar ma'lumot uzatilganda, u serializatsiya qilinadi. Katta hajmli ma'lumotlarni nusxalash sekinlashuvga olib keladi. Buni hal qilish uchun \`WebAssembly.Memory\` yoki \`SharedArrayBuffer\` yordamida to'g'ridan-to'g'ri umumiy xotiraga pointer beriladi (Zero-Copy).
* **Race Condition (Oqimlar poygasi):** Parallel ishlayotgan Web Workerlar bir vaqtda xotiradagi bitta o'zgaruvchini o'zgartirmoqchi bo'lganda, ma'lumotlar buziladi. \`Atomics\` obyekti (masalan, \`Atomics.compareExchange\`, \`Atomics.wait\`, \`Atomics.notify\`) CPU darajasidagi atomik amallar orqali parallel oqimlarni sinxronlashtiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. SharedArrayBuffer va oddiy ArrayBuffer-ni adashtirish
#### Xato:
\`ArrayBuffer\` oqimlararo \`postMessage\` qilinganda structured clone bo'ladi. Uni bir vaqtda parallel o'zgartirib bo'lmaydi.
#### To'g'ri:
Faqat \`SharedArrayBuffer\` bir vaqtda bir nechta oqimlar tomonidan xotirada ulashiladi.

### 2. Atomics ishlatmasdan SharedArrayBuffer-ga to'g'ridan-to'g'ri yozish
#### Xato:
\`sharedArray[0]++;\` // Xavfli! Race condition kelib chiqadi.
#### To'g'ri:
\`Atomics.add(sharedArray, 0, 1);\` // Xavfsiz, atomik amal.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** WebAssembly (Wasm) nima?
   * **Javob:** Wasm — brauzerda JavaScript bilan parallel ravishda deyarli mahalliy tezlikda quyi darajali kodlarni bajarish imkonini beruvchi ikkilik formatdir.
2. **Savol:** Wasm DOM-ni to'g'ridan-to'g'ri o'zgartira oladimi?
   * **Javob:** Yo't, Wasm bevosita DOM-ga kira olmaydi. U barcha DOM amallarini JavaScript orqali bajaradi.
3. **Savol:** WebAssembly.Memory nima?
   * **Javob:** Bu Wasm modulining chiziqli xotirasi (Linear Memory) bo'lib, uning tarkibida JS va Wasm o'rtasida ma'lumot almashish uchun ishlatiladigan ArrayBuffer saqlanadi.
4. **Savol:** SharedArrayBuffer nima?
   * **Javob:** Bu bir nechta oqimlar o'rtasida nusxalamasdan, umumiy foydalaniladigan xotira buferidir.

### Middle (5–8)
5. **Savol:** Atomics obyekti nima va u nima uchun kerak?
   * **Javob:** \`Atomics\` — umumiy xotiraga xavfsiz yozish va o'qish amallarini ta'minlovchi global obyekt. U oqimlar poygasi (Race Conditions) oldini oladi.
6. **Savol:** Nima uchun \`Atomics.wait()\` asosiy oqimda ishlay olmaydi?
   * **Javob:** Chunki asosiy oqim (Main UI Thread) foydalanuvchi interfeysini boshqaradi. Uni bloklash butun sahifani muzlatib qo'yadi.
7. **Savol:** Wasm chiziqli xotirasining sahifa o'lchami qancha?
   * **Javob:** WebAssembly-da 1 sahifa xotira har doim aniq 64 KB (65,536 bayt) ga teng bo'ladi.
8. **Savol:** JS-dan WASM funksiyasiga string uzatish qanday bajariladi?
   * **Javob:** TextEncoder yordamida satr baytlarga o'giriladi, so'ng WASM chiziqli xotirasiga yoziladi va uning boshlang'ich adresi (offset) hamda uzunligi WASM funksiyasiga uzatiladi.

### Senior (9–12)
9. **Savol:** WASM instansiyasini yuklashda \`WebAssembly.instantiateStreaming\` va \`WebAssembly.instantiate\` farqi nimada va qaysi biri afzal?
   * **Javob:** \`instantiateStreaming\` tarmoqdan yuklanayotgan vaqtning o'zidayoq uni kompilyatsiya qiladi, bu yuklash va kompilyatsiya vaqtini parallel bajarish evaziga tezlikni oshiradi.
10. **Savol:** \`SharedArrayBuffer\`dan foydalanishda brauzerlardagi eng katta xavfsizlik cheklovi nima?
    * **Javob:** Spectre hujumi xavfi tufayli SharedArrayBuffer faqatgina COOP (Cross-Origin-Opener-Policy) va COEP (Cross-Origin-Embedder-Policy) sarlavhalari o'rnatilgan xavfsiz muhitda (Cross-Origin Isolated) ishlaydi.
11. **Savol:** \`Atomics.compareExchange\` qanday ishlaydi va uning afzalligi nimada?
    * **Javob:** U massiv indeksidagi qiymatni kutilgan qiymat bilan solishtiradi; agar ular teng bo'lsa, yangi qiymatni yozadi va eski qiymatni qaytaradi. Bu lock-free algoritmlar yaratish asosi hisoblanadi.
12. **Savol:** WebAssembly Garbage Collection (WasmGC) nima?
    * **Javob:** WasmGC Wasm modullariga brauzerning ichki Garbage Collector tizimi bilan integratsiya qilish imkonini beradi, bu esa xotirani avtomatlashtiradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Web Workers va SharedArrayBuffer yordamida parallel Matrix Multiplication
Katta hajmli matritsalarni ko'paytirish hisob-kitobini 4 ta Web Workerga bo'lib berish va natijani bitta SharedArrayBufferda jamlash.

\`\`\`mermaid
sequenceDiagram
    participant Main as Asosiy Oqim (Main Thread)
    participant Worker as Web Worker
    participant SAB as SharedArrayBuffer (Xotira)

    Note over Main,SAB: SharedArrayBuffer yaratish va Workerga yuborish
    Main->>SAB: Xotira ajratish (SharedArrayBuffer)
    Main->>Worker: postMessage(sab)
    
    Note over Worker: Fondagi hisob-kitob boshlanishi
    Worker->>SAB: Hisoblash natijasini yozish (Atomics.add / store)
    Worker->>Main: Atomics.notify() yoki postMessage('tayyor')
    
    Note over Main: Asosiy oqim natijalarni darhol o'qiydi (Zero-Copy)
    Main->>SAB: Atomics.load() orqali ma'lumotni o'qish
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Zero-Copy Architecture:** Ma'lumotlarni har safar Wasm va JS o'rtasida nusxalamaslik uchun \`SharedArrayBuffer\` yoki \`WebAssembly.Memory\` ko'rsatkichidan foydalaning.
* **Avoid Small Imports/Exports Calls:** JS dan WASM funksiyasini har mikrosekundda chaqirish overhead (qo'shimcha vaqt sarfi) keltirib chiqaradi. Yaxshisi, bitta chaqiruvda katta hajmdagi massivni WASM ga bering va u uzoqroq ishlab natijani qaytarsin.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`WebAssembly.Memory\` | Chiziqli xotira yaratish | \`new WebAssembly.Memory({ initial: 10 })\` |
| \`SharedArrayBuffer\` | Oqimlararo umumiy xotira | \`new SharedArrayBuffer(1024)\` |
| \`Atomics.add(arr, idx, val)\` | Massiv indeksiga qiymatni atomik qo'shish | \`Atomics.add(sharedArr, 0, 5)\` |
| \`Atomics.wait(arr, idx, val)\` | Indeksdagi qiymat val bo'lsa, oqimni to'xtatib turish | \`Atomics.wait(sharedArr, 0, 0)\` |
| \`Atomics.notify(arr, idx, count)\` | Kutayotgan oqimlarni uyg'otish | \`Atomics.notify(sharedArr, 0, 1)\` |
| \`Atomics.load(arr, idx)\` | Indeksdagi qiymatni xavfsiz o'qish | \`Atomics.load(sharedArr, 0)\` |
`,
  exercises: [
    {
      id: 1,
      title: "Web Assembly signature verification",
      instruction: "Berilgan `ArrayBuffer` tarkibidagi birinchi 4 baytni tekshirib, u WebAssembly faylining sehrli imzosi (magic bytes: `\\0asm` yoki hex ko'rinishida `0x00, 0x61, 0x73, 0x6d`) ekanligini tasdiqlovchi `verifyWasmSignature(buffer)` funksiyasini yozing. Agar imzo to'g'ri bo'lsa `true`, aks holda `false` qaytarsin. Agar bufer 4 baytdan kichik bo'lsa ham `false` qaytarsin.",
      startingCode: "function verifyWasmSignature(buffer) {\n  // Kodni shu yerda yozing\n}",
      hint: "`Uint8Array` yarating va birinchi 4 ta bayt: `[0x00, 0x61, 0x73, 0x6d]` ga tengligini tekshiring.",
      test: "if (typeof verifyWasmSignature !== 'function') return 'verifyWasmSignature funksiya bo\\'lishi kerak';\ntry {\n  const wasmHeader = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]).buffer;\n  const badHeader = new Uint8Array([0x11, 0x22, 0x33, 0x44]).buffer;\n  const shortHeader = new Uint8Array([0x00, 0x61]).buffer;\n  if (verifyWasmSignature(wasmHeader) !== true) return 'To\\'g\\'ri Wasm sarlavhasi rad etildi';\n  if (verifyWasmSignature(badHeader) !== false) return 'Noto\\'g\\'ri Wasm sarlavhasi qabul qilindi';\n  if (verifyWasmSignature(shortHeader) !== false) return 'Kalta sarlavha rad etilishi kerak edi';\n} catch (e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 2,
      title: "WebAssembly.Instance instantiation simulation",
      instruction: "Berilgan `wasmBytes` (Uint8Array) va import obyektlari `importObject` asosida WebAssembly modulini kompilyatsiya qiluvchi va instansiya (instance) qaytaruvchi asinxron `simulateInstantiation(wasmBytes, importObject)` funksiyasini yozing. (Eslatma: Test muhitida haqiqiy instantiate ni simulyatsiya qilish uchun `WebAssembly.instantiate` ishlatilishi kerak).",
      startingCode: "async function simulateInstantiation(wasmBytes, importObject) {\n  // Kodni shu yerda yozing\n}",
      hint: "`await WebAssembly.instantiate(wasmBytes, importObject)` ni chaqiring va natijaning `.instance` xossasini qaytaring.",
      test: "if (typeof simulateInstantiation !== 'function') return 'simulateInstantiation funksiya bo\\'lishi kerak';\ntry {\n  const mockWasm = new Uint8Array([\n    0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 4, 1, 2, 0, 11\n  ]);\n  return simulateInstantiation(mockWasm, {}).then(instance => {\n    if (instance && typeof instance.exports === 'object') return null;\n    return 'Muvaffaqiyatli instansiya qaytarilmadi';\n  }).catch(e => 'Xato: ' + e.message);\n} catch(e) {\n  return 'Xato: ' + e.message;\n}"
    },
    {
      id: 3,
      title: "Wasm memory reader/writer simulator",
      instruction: "Berilgan `ArrayBuffer` ichidagi `offset` (bayt offsets) manzilidan 32-bitli to'g'ri ishorasiz butun sonni (`Uint32`) o'quvchi va yozuvchi ikkita metodga ega bo'lgan obyektsiz oddiy funksiyalarni: `readUint32(buffer, offset)` va `writeUint32(buffer, offset, value)` yozing. Xotira tartibi Big-Endian yoki Little-Endian bo'lishi muhim emas, lekin ikkala funksiya ham DataView yoki Uint32Array yordamida bir xil tizimda ishlashi kerak.",
      startingCode: "function readUint32(buffer, offset) {\n  // Kodni shu yerda yozing\n}\n\nfunction writeUint32(buffer, offset, value) {\n  // Kodni shu yerda yozing\n}",
      hint: "`DataView` obyekti va uning `getUint32(offset, true)` hamda `setUint32(offset, value, true)` metodlaridan foydalaning.",
      test: "if (typeof readUint32 !== 'function') return 'readUint32 funksiya bo\\'lishi kerak';\nif (typeof writeUint32 !== 'function') return 'writeUint32 funksiya bo\\'lishi kerak';\ntry {\n  const buffer = new ArrayBuffer(16);\n  writeUint32(buffer, 4, 4294967290);\n  const val = readUint32(buffer, 4);\n  if (val !== 4294967290) return 'Uint32 o\\'qish yoki yozish noto\\'g\\'ri: ' + val;\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 4,
      title: "Wasm linear memory string encoder/decoder",
      instruction: "Wasm chiziqli xotirasini simulyatsiya qilib, berilgan `ArrayBuffer`ga berilgan `offset`dan boshlab UTF-8 satrini yozuvchi va o'quvchi ikkita funksiyani: `writeStringToMemory(buffer, offset, str)` (yozilgan baytlar sonini qaytaradi) va `readStringFromMemory(buffer, offset, length)` (o'qilgan satrni qaytaradi) yozing.",
      startingCode: "function writeStringToMemory(buffer, offset, str) {\n  // Kodni shu yerda yozing\n}\n\nfunction readStringFromMemory(buffer, offset, length) {\n  // Kodni shu yerda yozing\n}",
      hint: "`TextEncoder` yordamida satrni baytlar massiviga o'giring, uni Uint8Array orqali `offset`dan boshlab buferga yozing. O'qishda `TextDecoder` ishlatib, buferning `offset`dan boshlab `length` uzunlikdagi qismini o'qing.",
      test: "if (typeof writeStringToMemory !== 'function') return 'writeStringToMemory funksiya bo\\'lishi kerak';\nif (typeof readStringFromMemory !== 'function') return 'readStringFromMemory funksiya bo\\'lishi kerak';\ntry {\n  const buffer = new ArrayBuffer(64);\n  const written = writeStringToMemory(buffer, 10, 'Hello Wasm');\n  if (written !== 10) return 'Hello Wasm 10 ta bayt yozishi kerak edi, lekin: ' + written;\n  const result = readStringFromMemory(buffer, 10, written);\n  if (result !== 'Hello Wasm') return 'O\\'qilgan string to\\'g\\'ri emas: ' + result;\n} catch (e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 5,
      title: "Safe concurrent counter",
      instruction: "Bir vaqtda parallel oqimlarda xavfsiz sonni oshirish uchun `SharedArrayBuffer` va `Atomics` ishlatuvchi `safeIncrement(sharedArray, index)` funksiyasini yozing. U berilgan `sharedArray` (Int32Array) massivining `index` indeksidagi qiymatini atomik ravishda 1 taga oshirishi kerak.",
      startingCode: "function safeIncrement(sharedArray, index) {\n  // Kodni shu yerda yozing\n}",
      hint: "`Atomics.add(sharedArray, index, 1)` metodidan foydalaning.",
      test: "if (typeof safeIncrement !== 'function') return 'safeIncrement funksiya bo\\'lishi kerak';\ntry {\n  const sab = new SharedArrayBuffer(16);\n  const sharedArray = new Int32Array(sab);\n  safeIncrement(sharedArray, 2);\n  safeIncrement(sharedArray, 2);\n  const val = Atomics.load(sharedArray, 2);\n  if (val !== 2) return 'Qiymat 2 bo\\'lishi kerak edi, lekin: ' + val;\n} catch (e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 6,
      title: "Atomics thread wait/notify coordinator",
      instruction: "Web Worker oqimini sinxronlashtirish uchun foydalaniladigan `waitForStatus(sharedArray, index, expectedValue, timeout)` asinxron funksiyasini yozing. Agar belgilangan vaqt (`timeout` millisekund) ichida massivning `index` indeksidagi qiymat `expectedValue`ga teng bo'lmasa, `false` bilan reject yoki resolve bo'lsin. UI oqimini bloklamaslik uchun `Atomics.waitAsync` (yoki agar u mavjud bo'lmasa, davriy `setInterval` / `setTimeout` tekshiruvi) ishlatilsin. U `Promise` qaytarishi lozim.",
      startingCode: "function waitForStatus(sharedArray, index, expectedValue, timeout) {\n  // Kodni shu yerda yozing\n}",
      hint: "`Atomics.waitAsync` mavjud bo'lsa uni ishlating, aks holda davriy ravishda `Atomics.load` orqali qiymatni tekshirib turadigan Promise qaytaring.",
      test: "if (typeof waitForStatus !== 'function') return 'waitForStatus funksiya bo\\'lishi kerak';\ntry {\n  const sab = new SharedArrayBuffer(16);\n  const sharedArray = new Int32Array(sab);\n  const p = waitForStatus(sharedArray, 0, 5, 200);\n  setTimeout(() => {\n    Atomics.store(sharedArray, 0, 5);\n    if (typeof Atomics.notify === 'function') Atomics.notify(sharedArray, 0, 1);\n  }, 50);\n  return p.then(res => {\n    if (res === true || res === undefined || res === null) return null;\n    return 'Kutilgan natija true bo\\'lishi lozim';\n  }).catch(e => 'Xato: ' + e.message);\n} catch(e) {\n  return 'Xato: ' + e.message;\n}"
    },
    {
      id: 7,
      title: "Atomics lock implementation",
      instruction: "Int32Array yordamida oqimlararo qulflash (`lock` va `unlock`) mexanizmini yarating. `acquireLock(sharedArray, index)` va `releaseLock(sharedArray, index)` funksiyalarini yozing. `acquireLock` funksiyasi indeksdagi qiymat 0 bo'lgandagina uni 1 ga o'zgartirishi (qulflashi) va muvaffaqiyatli bo'lsa `true`, aks holda `false` qaytarishi kerak (`Atomics.compareExchange` yordamida). `releaseLock` esa qiymatni 0 ga qaytarsin.",
      startingCode: "function acquireLock(sharedArray, index) {\n  // Kodni shu yerda yozing\n}\n\nfunction releaseLock(sharedArray, index) {\n  // Kodni shu yerda yozing\n}",
      hint: "`Atomics.compareExchange(sharedArray, index, 0, 1)` metodidan foydalanib qulfni oling. Bo'shatishda `Atomics.store(sharedArray, index, 0)` dan foydalaning.",
      test: "if (typeof acquireLock !== 'function' || typeof releaseLock !== 'function') return 'Funksiyalar aniqlanmagan';\ntry {\n  const sab = new SharedArrayBuffer(16);\n  const sharedArray = new Int32Array(sab);\n  if (acquireLock(sharedArray, 0) !== true) return 'Qulf olinmadi';\n  if (acquireLock(sharedArray, 0) !== false) return 'Band qulf qayta berildi';\n  releaseLock(sharedArray, 0);\n  if (acquireLock(sharedArray, 0) !== true) return 'Bo\\'shatilgan qulfni qayta olib bo\\'lmadi';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 8,
      title: "SharedArrayBuffer message queue",
      instruction: "`SharedArrayBuffer` ustida ishlovchi oddiy bir tomonlama xabarlar navbatini (`pushMessage` va `popMessage`) yarating. Massivning 0-indeksi navbatdagi elementlar sonini (length) ko'rsatadi. Navbat sig'imi 10 tagacha. Yangi xabar yozilganda uning qiymatini massivga yozib, elementlar sonini oshiring.",
      startingCode: "function pushMessage(sharedArray, val) {\n  // Kodni shu yerda yozing\n}\n\nfunction popMessage(sharedArray) {\n  // Kodni shu yerda yozing\n}",
      hint: "`Atomics.load` orqali navbat hajmini oling, yangi qiymatni yozishda `Atomics.store` yoki `Atomics.compareExchange` yordamida uzunlikni boshqaring.",
      test: "if (typeof pushMessage !== 'function' || typeof popMessage !== 'function') return 'Metodlar aniqlanmagan';\ntry {\n  const sab = new SharedArrayBuffer(64);\n  const sharedArray = new Int32Array(sab);\n  pushMessage(sharedArray, 100);\n  pushMessage(sharedArray, 200);\n  if (popMessage(sharedArray) !== 200) return 'Navbatdan oxirgi element noto\\'g\\'ri qaytdi';\n  if (popMessage(sharedArray) !== 100) return 'Navbatdan birinchi element noto\\'g\\'ri qaytdi';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 9,
      title: "Dynamic float32 multi-threaded array processing",
      instruction: "Katta `Float32Array` massivini chunklarga bo'lib qayta ishlovchi va har bir elementni kvadratga oshiruvchi `processArrayChunk(array, startIdx, endIdx)` funksiyasini yozing. Ushbu funksiya to'g'ridan-to'g'ri berilgan massiv indekslari oralig'ini o'zgartirishi kerak.",
      startingCode: "function processArrayChunk(array, startIdx, endIdx) {\n  // Kodni shu yerda yozing\n}",
      hint: "Oddiy sikl yordamida massivning `startIdx`dan `endIdx`gacha bo'lgan har bir elementini kvadratga oshiring (`array[i] = array[i] * array[i]`).",
      test: "if (typeof processArrayChunk !== 'function') return 'processArrayChunk funksiya bo\\'lishi kerak';\ntry {\n  const arr = new Float32Array([1, 2, 3, 4, 5]);\n  processArrayChunk(arr, 1, 4);\n  if (arr[0] !== 1 || arr[1] !== 4 || arr[2] !== 9 || arr[3] !== 16 || arr[4] !== 5) return 'Massiv hisob-kitobi xato: ' + arr.toString();\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 10,
      title: "Binary memory pool allocator",
      instruction: "Berilgan `ArrayBuffer` ustida oddiy xotira taqsimlovchi pool yaratuvchi `SimpleAllocator` klassini yozing. Uning konstruktori bufer hajmini qabul qilsin va `allocate(bytes)` hamda `free(offset)` metodlariga ega bo'lsin. Allocation uchun xotirada bo'sh joy topishda faqat oddiy ketma-ketlik algoritmidan foydalanish yetarli.",
      startingCode: "class SimpleAllocator {\n  constructor(buffer) {\n    this.buffer = buffer;\n    this.allocated = []; // { offset, size } formatida\n  }\n  allocate(bytes) {\n    // Kodni yozing\n  }\n  free(offset) {\n    // Kodni yozing\n  }\n}",
      hint: "Bo'sh joyni topish uchun `allocated` ro'yxatidan foydalanib `offset = 0`dan boshlab tekshiring. Topilgach, band joylar ro'yxatiga qo'shing va offsetni qaytaring. Bo'shatishda ro'yxatdan o'chirib tashlang.",
      test: "if (typeof SimpleAllocator !== 'function') return 'SimpleAllocator klass bo\\'lishi kerak';\ntry {\n  const buffer = new ArrayBuffer(100);\n  const allocator = new SimpleAllocator(buffer);\n  const addr1 = allocator.allocate(20);\n  const addr2 = allocator.allocate(30);\n  if (addr1 === addr2) return 'Turli allocationlar bir xil manzilga ega bo\\'la olmaydi';\n  allocator.free(addr1);\n  const addr3 = allocator.allocate(20);\n  if (addr3 !== addr1) return 'Bo\\'shatilgan xotira qayta ishlatilmadi';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "WebAssembly (Wasm) nima?",
      options: [
        "Brauzerda deyarli mahalliy tezlikda quyi darajali kodlarni bajarish imkonini beruvchi ikkilik format",
        "JavaScript-dagi asinxron so'rovlarni boshqaruvchi kutubxona",
        "Faqat CSS va animatsiyalar uchun mo'ljallangan grafik dvigatel",
        "Node.js serverini avtomatik sozlaydigan tizim"
      ],
      correctAnswer: 0,
      explanation: "WebAssembly — brauzerda yuqori tezlik talab etadigan operatsiyalarni bajarish uchun C++, Rust yoki Go kabi tillardan kompilyatsiya qilinadigan quyi darajali ikkilik formatdir."
    },
    {
      id: 2,
      question: "WebAssembly moduli DOM (Document Object Model) elementlariga to'g'ridan-to'g'ri kirishi mumkinmi?",
      options: [
        "Yo'q, WebAssembly DOM elementlariga bevosita kira olmaydi, u JS orqali aloqa qiladi",
        "Ha, u window va document obyektlariga to'liq kira oladi",
        "Ha, lekin faqat read-only (faqat o'qish) rejimida",
        "Faqat Web Worker tarkibida bo'lsa kirishi mumkin"
      ],
      correctAnswer: 0,
      explanation: "Wasm to'g'ridan-to'g'ri DOM bilan ishlay olmaydi. U har qanday DOM manipulyatsiyasini JavaScript-dan yordamchi funksiyalarni import qilish orqali bajaradi."
    },
    {
      id: 3,
      question: "WebAssembly.Memory obyekti nima vazifani bajaradi?",
      options: [
        "Wasm modulining chiziqli xotirasi (Linear Memory) bo'bir, ArrayBuffer-ni o'zida saqlaydi",
        "Faqat modul xatoliklarini log qiluvchi xotira buferi",
        "CPU keshlash mexanizmini boshqaradigan API",
        "Avtomatik axlat yig'uvchi (Garbage Collector) tizimi"
      ],
      correctAnswer: 0,
      explanation: "`WebAssembly.Memory` moduli chiziqli xotira (Linear Memory) hisoblanib, undagi ma'lumotlar JS massivlari (TypedArrays) ko'rinishida o'qiladi yoki yoziladi."
    },
    {
      id: 4,
      question: "WebAssembly chiziqli xotirasining 1 sahifasi (1 page) necha baytga teng?",
      options: [
        "64 KB (65,536 bayt)",
        "1 MB (1,048,576 bayt)",
        "4 KB (4,096 bayt)",
        "256 KB (262,144 bayt)"
      ],
      correctAnswer: 0,
      explanation: "WebAssembly arxitekturasida chiziqli xotira sahifalarga bo'linadi va 1 sahifa har doim 64 KB (65,536 bayt) ga tengdir."
    },
    {
      id: 5,
      question: "Bir vaqtda bir nechta oqimlar (Workers) o'rtasida nusxalanmasdan umumiy foydalaniladigan xotira buferi qaysi?",
      options: [
        "SharedArrayBuffer",
        "ArrayBuffer",
        "Uint8ClampedArray",
        "DataView"
      ],
      correctAnswer: 0,
      explanation: "`SharedArrayBuffer` yordamida oqimlar o'rtasida ma'lumot ko'chirilmasdan, xotiraning ayni bir xil manzili parallel ravishda ulashiladi."
    },
    {
      id: 6,
      question: "Atomics obyekti nima uchun kerak?",
      options: [
        "SharedArrayBuffer ustida bajariladigan operatsiyalarning oqimlararo xavfsizligini ta'minlash uchun",
        "Wasm faylini siqish va tarmoq trafigini kamaytirish uchun",
        "Sinxron kodlarni asinxron qilish uchun",
        "CPU yadrolarini dinamik o'chirish uchun"
      ],
      correctAnswer: 0,
      explanation: "`Atomics` obyekti oqimlararo umumiy xotiraga murojaat qilganda to'qnashuvlar (Race Conditions) yuzaga kelmasligi uchun atomik va xavfsiz operatsiyalarni taqdim etadi."
    },
    {
      id: 7,
      question: "Nima uchun brauzerning asosiy oqimida (Main UI Thread) `Atomics.wait()` metodini ishlatish taqiqlangan?",
      options: [
        "UI oqimini bloklash butun sahifani muzlatib qo'yishi sababli",
        "Asosiy oqimda Atomics obyekti mavjud bo'lmagani sababli",
        "Asosiy oqim xotirasi SharedArrayBuffer-ni qo'llab-quvvatlamagani uchun",
        "Bu metod faqat Node.js uchun yaratilgani sababli"
      ],
      correctAnswer: 0,
      explanation: "`Atomics.wait` oqimni to'xtatib (sleep rejimida) kutib turadi. Agar u asosiy oqimda chaqirilsa, foydalanuvchi interfeysi muzlab qoladi, shuning uchun brauzerlar bunga ruxsat bermaydi."
    },
    {
      id: 8,
      question: "JS va WASM o'rtasida katta hajmli ma'lumotlar almashishda qaysi yondashuv eng tezkor hisoblanadi?",
      options: [
        "WASM chiziqli xotirasiga pointerlar orqali to'g'ridan-to'g'ri o'qish/yozish (Zero-Copy)",
        "Ma'lumotlarni JSON formatiga o'girib, string sifatida uzatish",
        "Wasm funksiyasini har bir element uchun alohida chaqirish",
        "Base64 formatiga o'girib yuborish"
      ],
      correctAnswer: 0,
      explanation: "Zero-Copy yondashuvi yordamida Wasm xotirasiga pointerlar orqali to'g'ridan-to'g'ri murojaat qilinadi, bu ma'lumot nusxalash xarajatlarini butunlay yo'q qiladi."
    },
    {
      id: 9,
      question: "Atomics.compareExchange metodi qanday ishlaydi?",
      options: [
        "Indeksdagi joriy qiymat kutilgan qiymatga teng bo'lsa, uni yangisiga almashtiradi va eski qiymatni qaytaradi",
        "Indeksdagi qiymatni hech qanday shartsiz yangi qiymatga almashtiradi",
        "Ikki xil massivdagi ma'lumotlarni o'zaro solishtirib, ularni birlashtiradi",
        "Kutayotgan oqimlarni darhol uyg'otadi"
      ],
      correctAnswer: 0,
      explanation: "`Atomics.compareExchange` bu atomik \"solishtirish va almashtirish\" (Compare-And-Swap) operatsiyasi bo'lib, sinxronizatsiya va qulflar (locks) yaratish uchun juda muhimdir."
    },
    {
      id: 10,
      question: "Wasm modulini yuklashda tarmoqdan yuklanish jarayoni bilan parallel ravishda kompilyatsiya qilish imkonini beruvchi metod qaysi?",
      options: [
        "WebAssembly.instantiateStreaming",
        "WebAssembly.instantiate",
        "WebAssembly.compile",
        "WebAssembly.loadStreaming"
      ],
      correctAnswer: 0,
      explanation: "`WebAssembly.instantiateStreaming` moduli o'rnatilayotgan response-dan to'g'ridan-to'g'ri kompilyatsiya boshlaydi va yuklash vaqtini tejaydi."
    },
    {
      id: 11,
      question: "Atomics.notify(sharedArray, 0, 1) metodi nima vazifani bajaradi?",
      options: [
        "sharedArray-ning 0-indeksida kutib turgan ko'pi bilan 1 ta oqimni (Worker) uyg'otadi",
        "Barcha oqimlarga push xabarnomasini yuboradi",
        "Wasm modulidan yangi hodisalarni tinglaydi",
        "Indeksdagi qiymatni 1 ga oshiradi"
      ],
      correctAnswer: 0,
      explanation: "`Atomics.notify` ma'lum indeksda `Atomics.wait` orqali bloklangan oqimlardan belgilangan miqdordagisini uyg'otadi."
    },
    {
      id: 12,
      question: "SharedArrayBuffer-dan foydalanish uchun brauzerda qanday xavfsizlik talablari muzqaymoq?",
      options: [
        "Sahifada Cross-Origin isolation sarlavhalari (COOP va COEP) o'rnatilgan bo'lishi shart",
        "Sayt faqat HTTP protokoli ostida ishlashi shart",
        "Foydalanuvchidan maxsus pop-up orqali ruxsat olinishi kerak",
        "Hech qanday cheklovlar yo'q, u har doim ochiq bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Spectre hujumining oldini olish uchun SharedArrayBuffer faqatgina Cross-Origin Isolated sharoitidagina (maxsus COOP va COEP HTTP sarlavhalari o'rnatilganda) ishlaydi."
    }
  ]
};
