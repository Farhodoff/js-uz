## 1. 💡 Sodda Tushuntirish va Analogiya

### V8 Garbage Collection nima?
JavaScript-da biz obyektlar, massivlar va funksiyalar yaratganimizda, ular kompyuter xotirasidan (Heap) joy oladi. Ammo bizga bu obyektlar kerak bo'lmay qolganda, ularni qo'lda o'chirib, xotirani bo'shatishimiz shart emas. Google Chrome va Node.js ning yuragi bo'lgan **V8 dvigateli** xotirani avtomatik boshqaradi. Bu jarayon **Garbage Collection (GC - chiqindilarni yig'ish)** deb ataladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **ofisda qog'ozlar ustida ishlayapsiz**:
* **New Space (Yangi hudud):** Bu sizning stolingiz usti. Yangi yozilgan eslatmalar, qog'ozlar darhol stol ustiga tushadi. Stol tez to'lib qoladi. Siz tez-tez stol ustini tozalab, kerakmas qog'ozlarni axlatga tashlaysiz (Minor GC / Scavenger).
* **Old Space (Eski hudud):** Agar stol ustidagi ba'zi hujjatlar juda muhim bo'lsa va ulardan bir necha marta foydalangan bo'lsangiz, ularni stol ustida qoldirmay, javondagi **arxiv papkasiga** joylaysiz (Promotion / Tenuring). Arxiv papkasi sekinroq to'ladi, ammo vaqti-vaqti bilan u yerda ham katta tozalash o'tkaziladi (Major GC / Mark-Sweep-Compact).
* **Large Object Space (Katta obyektlar hududi):** Bu ofis burchagidagi ulkan doska yoki mebel. Uni stol ustiga sig'dirib bo'lmaydi va jismonan arxivga ham joylab bo'lmaydi. Shuning uchun u alohida joyda turadi.

---

## 2. 💻 Real Kod Misollari

### 1. Kuchsiz havolalar (WeakRefs)
`WeakRef` xotira tozalagichga to'sqinlik qilmasdan obyektga havola qilish imkonini beradi.
```javascript
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
```

### 2. Resurslarni tozalash (FinalizationRegistry)
Obyekt xotiradan o'chirilganda resurslarni avtomat tozalash:
```javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Obyekt o'chirildi. Tizim resursi yopildi: ${heldValue}`);
});

let dbConnection = { query: () => {} };
// Obyektni ro'yxatdan o'tkazamiz va unga bog'liq ma'lumotni beramiz
registry.register(dbConnection, "db_connection_01");

// Havolani uzamiz
dbConnection = null;
// GC ishlagandan so'ng, callback chaqiriladi
```

### 3. Xotira oqishi (Memory Leak) misoli
```javascript
// Noto'g'ri yozilgan kod - xotira sizib chiqishi (leak)
function startTracking() {
  const largeData = new Array(1000000).fill("data");
  setInterval(() => {
    // largeData yopiq closure ichida qolib ketgan va hech qachon tozalangmaydi
    console.log(largeData.length);
  }, 1000);
}
```

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

```mermaid
graph TD
    subgraph New Space (Nursery)
        From[From-Space] -->|Minor GC - Scavenger| To[To-Space]
    end
    To -->|Age >= 2 (Survival)| Old[Old Space]
    Old -->|Major GC - Mark-Sweep-Compact| Clean[Clean/Compacted Old Space]
```

1. Yangi obyektlar **From-space**-da ajratiladi.
2. From-space to'lganda, Minor GC ishga tushadi. U `Root` pointerlardan boshlab faol (reachable) obyektlarni aniqlaydi.
3. Faol obyektlar **To-space**-ga nusxalanadi (zichlangan holda).
4. From-space-dagi qolgan barcha nofaol (dead) obyektlar o'chiriladi.
5. Keyin From va To-space joylari (rollari) almashadi.
6. Agar obyekt ushbu tozalashdan 2 marta omon qolsa (survive), u **Old Space**-ga o'tkaziladi (**Promotion**).

### 4. Major GC (Mark-Sweep-Compact)
Old Space to'lganda butun heap-ni tozalash uchun **Major GC** ishga tushadi:
* **Marking (Belgilash):** `Root` obyektdan boshlab barcha yetib borish mumkin bo'lgan obyektlar uchburchakli rang berish tizimi (White-Grey-Black) yordamida belgilanadi.
* **Sweeping (Tozalash):** Belgilanmagan (oq rangli) obyektlar xotira ro'yxatidan o'chiriladi va bo'sh xotira manzillari (free list) ro'yxatiga qo'shiladi.
* **Compacting (Zichlashtirish):** Xotira fragmentatsiyasini (bo'shliqlar qolib ketishini) oldini olish uchun faol obyektlar bir joyga surib jamlanadi.

### 5. Write Barrier (Yozish to'sig'i)
Minor GC paytida faqat New Space tekshiriladi. Ammo Old Space-dagi eski obyekt New Space-dagi yangi obyektga havola qilsa-chi? Butun Old Space-ni qidirib chiqish qimmatga tushadi. V8 bunga **Write Barrier** yordamida yechim topgan: har safar eski obyektga yangi obyekt havolasi yozilganda, dvigatel uni **Remembered Set** ga yozib qo'yadi. Minor GC faqat shu eslab qolingan to'plamni tekshiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tasodifiy global o'zgaruvchilar
Sinxron kod ichida `var`, `let` yoki `const` kalit so'zlarisiz o'zgaruvchi yaratilsa, u global `window` yoki `global` obyektiga birikib qoladi va hech qachon GC tomonidan o'chirilmaydi.
```javascript
function createData() {
  // global o'zgaruvchiga aylanib qoladi
  myData = new Array(1000000).fill("leak");
}
createData();
```

### 2. O'chirilmagan taymerlar (setInterval)
Taymer ichidagi callback o'zgaruvchilarni closure orqali ushlab turadi. Taymer to'xtatilmasa, xotira to'lib boradi.
```javascript
let element = document.getElementById("button");
const intervalId = setInterval(() => {
  // agar element DOM dan o'chirilsa ham, taymer uni xotirada ushlab turadi
  if (element) {
    element.innerHTML = new Date().toString();
  }
}, 1000);

// Tuzatish: element keraksiz bo'lganda clearInterval(intervalId) chaqirish lozim.
```

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
   * *Javob:* U Old Space-dan New Space-ga bo'lgan havolalarni Remembered Set-da saqlaydi, natijada Minor GC butun Old Space xotirasini qidirib chiqishdan qutuladi.
8. **WeakMap va WeakSet-ning oddiy Map va Set-dan xotira boshqaruvidagi farqi nimada?**
   * *Javob:* WeakMap/WeakSet kalitlari faqat kuchsiz havolalarni saqlaydi. Agar kalit obyektga boshqa kuchli havola qolmasa, u GC tomonidan tozalab yuborilishi mumkin.

### Senior
9. **GC jank (pauza) nima va V8 uni kamaytirish uchun qanday texnikalarni qo'llaydi?**
   * *Javob:* GC pauzasi — tozalash paytida JS bajarilishi to'xtab qolishi. V8 buni kamaytirish uchun Incremental marking, Concurrent marking va Parallel GC usullarini qo'llaydi.
10. **Incremental Marking qanday ishlaydi?**
    * *Javob:* Dvigatel marking (belgilash) ishini yirik bir pauzada emas, balki JS kodi bajarilishi orasida kichik bo'laklarga (chunki segmentlar) bo'lib amalga oshiradi.
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
4. Snapshot 2 va Snapshot 1 solishtiriladi (Comparison mode). Unda o'chirilgan (Detached) DOM elementlari hamon xotirada saqlanib qolgani aniqlanadi.

### Yechim:
Xotirada qolgan hodisalar tinglovchilarini (event listeners) sahifa yopilayotganda tozalash:
```javascript
class ChartComponent {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
  }
  
  mount() {
    window.addEventListener("resize", this.handleResize);
  }
  
  unmount() {
    // Junior dasturchilar buni yozishni unutadi!
    window.removeEventListener("resize", this.handleResize);
  }
  
  handleResize() {
    // O'lchamlarni o'zgartirish logikasi
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **Obyektlar hovuzi (Object Pool):** Agar tez-tez o'yinlar yoki real-time dasturlarda soniyasiga minglab obyekt yaratilsa, har safar yangi obyekt yaratmasdan, avvaldan tayyorlangan obyektlar hovuzidan foydalanib, ularni qayta ishlatish (recycle) GC yuklamasini kamaytiradi.
* **Hot funksiyalarda obyekt yaratmaslik:** Tsikl (loop) ichida yangi obyekt yoki massiv yaratishdan qoching. Ularni tsikldan tashqarida e'lon qilib, qayta ishlating.
* **WeakMap dan kesh sifatida foydalanish:** Kesh obyektlarini xotirada ushlab qolmaslik uchun kuchsiz havolalardan foydalaning.

---

## 10. 📌 Cheat Sheet

| Atama | Nima degani | Vazifasi / Muhimligi |
| :--- | :--- | :--- |
| **New Space** | Yosh avlod hududi | Yangi yaratilgan qisqa umr ko'ruvchi obyektlar uchun (Scavenger ishlaydi). |
| **Old Space** | Eski avlod hududi | Ko'p yashagan va New space-dan ko'chirilgan obyektlar. |
| **Scavenger** | Minor GC algoritmi | From/To bo'limlari orqali faol obyektlarni nusxalab, tez tozalaydi. |
| **Mark-Sweep-Compact** | Major GC algoritmi | Butun heap-ni tozalaydi, bo'shliqlarni zichlaydi (fragmentatsiyani oldini oladi). |
| **Write Barrier** | Yozish to'sig'i | Old-to-New havolalarni eslab qolib, GC tezligini oshiradi. |
| **WeakRef** | Kuchsiz havola | Obyektni xotirada ushlab turmaydigan havola yaratadi. |
| **FinalizationRegistry** | Tozalash registri | Obyekt GC tomonidan yig'ilganda callback chaqirish imkonini beradi. |
