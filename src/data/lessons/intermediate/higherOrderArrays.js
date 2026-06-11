export const higherOrderArrays = {
  id: "higherOrderArrays",
  title: "Massivlar uchun Higher Order Metodlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Higher-Order Array Methods (Massivlar uchun Yuqori Tartibli Metodlar) nima?
Higher-order array metodlari — bu massiv elementlarini aylanish (iteratsiya qilish) jarayonini avtomatlashtiradigan va parametr sifatida boshqa funksiyani (callback) qabul qiladigan metodlardir. Oldin biz massiv elementlarini aylanish uchun \`for\` yoki \`while\` tsikllaridan foydalangan bo'lsak, endi maxsus tayyor metodlar orqali kodni qisqaroq, o'qilishi osonroq va xatolardan xoli qilamiz.

### Real hayotiy analogiya
Tasavvur qiling, siz **maktab direktorisiz** va sizda **o'quvchilar ro'yxati** bor:
* **\`forEach\` (Shunchaki tanishish):** Siz sinfdagi har bir o'quvchining oldiga borib salomlashib chiqasiz, lekin ulardan hech narsa talab qilmaysiz va yangi ro'yxat tuzmaysiz.
* **\`map\` (Kiyintirish):** Siz har bir o'quvchiga yangi maktab formasini berib, kiyintirib, **yangi formadagi o'quvchilar ro'yxatini** yaratasiz. Asl o'quvchilar o'zgargani yo'q, lekin sizda yangi ko'rinishdagi o'quvchilar ro'yxati paydo bo'ldi.
* **\`filter\` (Saralash):** Siz ro'yxatdan faqat a'lochi o'quvchilarni alohida ajratib, **a'lochilarning yangi ro'yxatini** tuzasiz.
* **\`reduce\` (Birlashtirish/Jamlash):** Siz har bir o'quvchidan darsliklar uchun to'lov pullarini yig'ib olasiz va oxirida bitta umumiy jamg'armani (bitta qiymat: summani) olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (forEach va map metodlari)
Massiv elementlari bilan ishlash va ularni o'zgartirib yangi massiv olish:
\`\`\`javascript
const numbers = [1, 2, 3, 4];

// 1. forEach() - shunchaki har bir elementni konsolga chiqarish
numbers.forEach(num => console.log(num * 2)); 
// Konsol: 2, 4, 6, 8 (lekin forEach o'zidan hech narsa qaytarmaydi, ya'ni undefined)

// 2. map() - elementlarni 2 ga ko'paytirib yangi massiv olish
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (asl massiv o'zgarmadi!)
\`\`\`

### 2. Intermediate Example (filter va find metodlari)
Massiv ichidan ma'lumotlarni saralash va qidirish:
\`\`\`javascript
const users = [
  { id: 1, name: 'Ali', age: 17 },
  { id: 2, name: 'Vali', age: 20 },
  { id: 3, name: 'Sardor', age: 25 }
];

// 1. filter() - yoshi 18 dan katta bo'lgan barcha foydalanuvchilarni olish
const adults = users.filter(user => user.age >= 18);
console.log(adults); 
// [{ id: 2, name: 'Vali', age: 20 }, { id: 3, name: 'Sardor', age: 25 }]

// 2. find() - IDsi 2 ga teng bo'lgan birinchi foydalanuvchini olish (obyektning o'zi qaytadi)
const userVali = users.find(user => user.id === 2);
console.log(userVali); // { id: 2, name: 'Vali', age: 20 }

// 3. findIndex() - yoshi 20 ga teng bo'lgan element indeksini topish
const index = users.findIndex(user => user.age === 20);
console.log(index); // 1
\`\`\`

### 3. Advanced Example (reduce va zanjir hosil qilish - Pipeline Chaining)
Reduce yordamida yig'indini hisoblash hamda map va filter metodlarini zanjir shaklida ketma-ket ulash:
\`\`\`javascript
const cart = [
  { name: 'Noutbuk', price: 1000, category: 'tech' },
  { name: 'Telefon', price: 500, category: 'tech' },
  { name: 'Kitob', price: 20, category: 'books' }
];

// 1. reduce() - barcha mahsulotlar narxi yig'indisini hisoblash
const totalSum = cart.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.price;
}, 0); // 0 - accumulator ning boshlang'ich qiymati
console.log(totalSum); // 1520

// 2. Chaining (Zanjirlash) - texnik mahsulotlarni filtrlab, ularga 10% chegirma berish va narxlarini olish
const discountedTech = cart
  .filter(item => item.category === 'tech')
  .map(item => item.price * 0.9);

console.log(discountedTech); // [900, 450]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Callback funksiyalarning bajarilish mexanizmi
Higher-order metodlar chaqirilganda, JS dvigateli massiv elementi ustida ichki tsikl (loop) hosil qiladi. Dvigatel har bir qadamda biz taqdim etgan callback funksiyani chaqiradi va unga quyidagi 3 ta argumentni uzatadi:
1. \`currentValue\` (Hozirgi element)
2. \`index\` (Hozirgi element indeksi)
3. \`array\` (Metod chaqirilgan asl massivning o'zi)

Masalan, \`.map(item => item * 2)\` yozganimizda, dvigatel orqa fonda quyidagiga o'xshash operatsiyani bajaradi:
\`\`\`javascript
// Map metodining soddalashtirilgan polyfill (orqa fonda ishlash prinsipi)
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Callback chaqirilib, natijasi yangi massivga qo'shiladi
    result.push(callback(this[i], i, this));
  }
  return result;
};
\`\`\`

### Reduce metodidagi akkumulyator (Accumulator) qanday ishlaydi?
\`.reduce()\` metodining ishlashi boshqacha. U massivni aylanib chiqib, yagona yakuniy qiymat (son, string, obyekt yoki boshqa massiv) hosil qiladi.
* **Boshlang'ich qiymat (initialValue) berilganda:** Akkumulyator (\`acc\`) ushbu boshlang'ich qiymatga teng bo'ladi va tsikl 0-indeksdagi elementdan boshlanadi.
* **Boshlang'ich qiymat berilmaganda:** Akkumulyator massivning 0-indeksdagi elementiga teng bo'lib qoladi va tsikl 1-indeksdan boshlanadi. *Agarda massiv bo'sh bo'lsa va boshlang'ich qiymat berilmagan bo'lsa, TypeError xatosi sodir bo'ladi.*

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`.map()\` callback funksiyasida \`return\` yozishni unutib qo'yish
* **Noto'g'ri (Qiymatlar undefined bo'lib qoladi):**
  \`\`\`javascript
  const numbers = [1, 2, 3];
  const doubled = numbers.map(num => {
    num * 2; // return yozilmadi!
  });
  console.log(doubled); // [undefined, undefined, undefined]
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const numbers = [1, 2, 3];
  // Arrow funksiyada figurali qavssiz yozilsa, return avtomatik bajariladi:
  const doubled = numbers.map(num => num * 2);
  // Yoki figurali qavs bilan:
  // const doubled = numbers.map(num => { return num * 2; });
  console.log(doubled); // [2, 4, 6]
  \`\`\`

### 2. Har doim \`.map()\` ishlatish (hatto yangi massiv kerak bo'lmasa ham)
* **Noto'g'ri (Samarasiz xotira sarfi):**
  \`\`\`javascript
  const numbers = [1, 2, 3];
  // Maqsad faqat konsolga chiqarish, lekin map yangi massiv yaratib xotirani band qiladi:
  numbers.map(num => console.log(num));
  \`\`\`
* **To'g'ri (Faqat tsikl kerak bo'lsa \`forEach\` yoki \`for...of\` ishlating):**
  \`\`\`javascript
  const numbers = [1, 2, 3];
  numbers.forEach(num => console.log(num));
  \`\`\`

### 3. Callback ichida asl massivni yoki akkumulyatorni mutatsiyaga (o'zgarishga) uchratish
* **Noto'g'ri (Asl ma'lumotlar buziladi):**
  \`\`\`javascript
  const users = [{ name: 'Ali' }, { name: 'Vali' }];
  const updated = users.map(user => {
    user.name = user.name.toUpperCase(); // Asl obyektdagi name ham o'zgarib ketadi!
    return user;
  });
  \`\`\`
* **To'g'ri (Nusxa olib o'zgartirish - Immutability):**
  \`\`\`javascript
  const users = [{ name: 'Ali' }, { name: 'Vali' }];
  const updated = users.map(user => ({
    ...user,
    name: user.name.toUpperCase()
  })); // Yangi obyekt nusxasi qaytadi
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1–4)
1. **Savol:** Higher-order array metodlari nima va ular oddiy \`for\` tsiklidan nimasi bilan farq qiladi?
   * **Javob:** Bu metodlar o'ziga argument sifatida boshqa bir funksiyani (callback) qabul qiladi. Ular deklarativ (declarative) yozuv uslubini ta'minlaydi, ya'ni biz qanday aylanishni emas, balki element ustida nima amal bajarilishini yozamiz. Bu kodni o'qish va yuritishni osonlashtiradi.
2. **Savol:** \`.map()\` va \`.forEach()\` metodlarining asosiy farqi nimada?
   * **Javob:** \`.map()\` har bir element uchun callback bajarib, natijalardan yangi massiv qaytaradi (immutability). \`.forEach()\` esa shunchaki elementlarni aylanib chiqadi va har doim \`undefined\` qaytaradi.
3. **Savol:** \`.filter()\` metodi shartga mos element topa olmasa nima qaytaradi? \`.find()\`chi?
   * **Javob:** \`.filter()\` shartga mos hech narsa topilmasa bo'sh massiv \`[]\` qaytaradi. \`.find()\` esa shartga mos birinchi elementni topsa o'sha element qiymatini, topa olmasa \`undefined\` qaytaradi.
4. **Savol:** Arrow funksiyani \`.map()\` ichida qisqa yozganda nima uchun figurali qavslar \`{}\` ishlatsak \`return\` yozishimiz shart?
   * **Javob:** Strelkali funksiyalarda figurali qavs blok (body) ochadi. Agar blok ochilsa, JavaScript natijani qaytarish uchun aniq \`return\` kalit so'zini talab qiladi. Qavslarsiz yozilganda esa \`return\` avtomatik (implicit return) tarzda sodir bo'ladi.

### Middle Darajasi (5–8)
5. **Savol:** \`.reduce()\` metodidagi accumulator (akkumulyator) nima vazifani bajaradi va boshlang'ich qiymat (initialValue) berish nega muhim?
   * **Javob:** Akkumulyator oldingi iteratsiyadan qaytgan natijani o'zida yig'ib boradi. Boshlang'ich qiymat berish akumulyatorning ilk holatini va o'zgaruvchi turini (son, massiv, obyekt va h.k.) belgilaydi. Agar boshlang'ich qiymat berilmasa, u massivning birinchi elementiga teng bo'lib qoladi va bo'sh massivlar holatida TypeError xatosi sodir bo'ladi.
6. **Savol:** \`.some()\` va \`.every()\` metodlari nima qaytaradi va ular qanday optimallashtirilgan?
   * **Javob:** Ikkala metod ham boolean (\`true\`/\`false\`) qiymat qaytaradi. Ular short-circuit (qisqa tutashuv) mexanizmi bilan ishlaydi: \`.some()\` massivda kamida bitta true shartni topsa, aylanishni to'xtatadi; \`.every()\` esa bitta false shartni topsa, zudlik bilan aylanishni to'xtatib false qaytaradi.
7. **Savol:** Chaining (zanjirlash) nima va uning qanday salbiy tomonlari bo'lishi mumkin?
   * **Javob:** Chaining — bu massiv metodlarini (masalan, \`filter().map().reduce()\`) ketma-ket ulashdir. Salbiy tomoni shundaki, har bir oraliq metod (filter, map) xotirada yangi oraliq massiv yaratadi, bu juda katta hajmdagi massivlarda performance (samaradorlik) va xotira muammolariga olib kelishi mumkin.
8. **Savol:** \`const arr = [1, 2, 3]; arr.map(parseInt)\` kodi bajarilganda natija qanday bo'ladi va nega?
   * **Javob:** Natija \`[1, NaN, NaN]\` bo'ladi. Sababi \`.map()\` callback funksiyasiga 3 ta argument uzatadi: \`(element, index, array)\`. \`parseInt\` esa ikkita argument qabul qiladi: \`parseInt(string, radix)\`. Natijada \`parseInt(1, 0)\` -> \`1\`, \`parseInt(2, 1)\` -> \`NaN\` (radix 1 bo'lolmaydi), \`parseInt(3, 2)\` -> \`NaN\` (2 lik sanoq tizimida 3 raqami yo'q) bo'lib ishlaydi.

### Senior Darajasi (9–12)
9. **Savol:** Higher-order metodlaridagi callback ichida asinxron amallar (masalan \`async/await\` yoki \`Promise\`) ishlatilsa nima sodir bo'ladi?
   * **Javob:** Higher-order metodlar (masalan \`map\`, \`forEach\`) asinxron callbacklar tugashini kutmaydi. \`.map(async x => ...)\` chaqirilsa, u darhol Promise'lar massivini (\`Promise[]\`) qaytaradi. Asinxron massiv aylanishlarida ketma-ketlikni kutish uchun \`for...of\` tsikli yoki parallel bajarish uchun \`Promise.all(arr.map(...))\` ishlatish kerak.
10. **Savol:** Massivlarni transformatsiya qilishda nima uchun \`.reduce()\` metodini eng universal metod deb atashadi?
    * **Javob:** Chunki \`.reduce()\` yordamida qolgan barcha yuqori tartibli metodlarni (map, filter, find, forEach, every, some) qayta yozish va modellashtirish mumkin. U har qanday ma'lumot turini boshqa har qanday ma'lumot turiga (yagona son, massiv, murakkab obyekt) transformatsiya qilish kuchiga ega.
11. **Savol:** Katta hajmdagi ma'lumotlarni qayta ishlashda zanjirli metodlar (map, filter) o'rniga qanday optimallash usullarini qo'llash mumkin?
    * **Javob:** Zanjirlarni bitta \`.reduce()\` ga birlashtirish orqali massivni faqat bir marotaba aylanish mumkin. Yoki klassik \`for\` tsiklidan foydalanish eng yuqori tezlikni beradi. Bundan tashqari, Generatorlardan yoki transducer (transductions) yondashuvidan foydalanib oraliq massivlar yaratilishining oldini olish mumkin.
12. **Savol:** \`thisArg\` parametri nima va uni strelkali callback funksiyalar bilan birga ishlatishda qanday muammo bor?
    * **Javob:** \`thisArg\` — ko'pgina massiv metodlarining ikkinchi ixtiyoriy argumenti bo'lib, callback funksiya ichidagi \`this\` kalit so'zi qaysi obyektga ishora qilishini belgilaydi. Muammo shundaki, arrow funksiyalar o'zining shaxsiy \`this\` kontekstiga ega emas (leksik context), shuning uchun arrow funksiya ishlatilganda \`thisArg\` mutlaqo ishlamaydi. Buni faqat klassik \`function()\` kalit so'zi yordamida yozilgan callbacklar bilan ishlatish lozim.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi massiv ma'lumotlarini transformatsiya qilish (Pipeline) jarayonini tasvirlaydi. Bu yerda dastlabki massiv filter orqali saralanadi, map orqali shakli o'zgartiriladi va reduce yordamida yakuniy yagona qiymatga jamlanadi. Callback funksiyalar har bir bosqichda qanday rol o'ynashini ko'rishingiz mumkin:

\`\`\`mermaid
graph TD
    subgraph Input [Boshlang'ich Massiv]
        Start["[ {price: 10, type: 'A'}, {price: 25, type: 'B'}, {price: 30, type: 'A'} ]"]
    end

    subgraph FilterStage [1-bosqich: filter]
        FilterCB["Callback: item => item.type === 'A'"]
        FilterRes["[ {price: 10, type: 'A'}, {price: 30, type: 'A'} ]"]
    end

    subgraph MapStage [2-bosqich: map]
        MapCB["Callback: item => item.price"]
        MapRes["[ 10, 30 ]"]
    end

    subgraph ReduceStage [3-bosqich: reduce]
        ReduceCB["Callback: (acc, curr) => acc + curr <br/> (Boshlang'ich qiymat: 0)"]
        FinalValue["40"]
    end

    Start -->|1. Massivni uzatish| FilterCB
    FilterCB -->|2. Shart bo'yicha saralash| FilterRes
    FilterRes -->|3. Yangi massivni uzatish| MapCB
    MapCB -->|4. Elementlarni o'zgartirish| MapRes
    MapRes -->|5. Sonli massivni uzatish| ReduceCB
    ReduceCB -->|6. Yig'indini hisoblash| FinalValue

    style Start fill:#f9f9f9,stroke:#333,stroke-width:1px
    style FilterRes fill:#e6f7ff,stroke:#1890ff,stroke-width:1px
    style MapRes fill:#fff7e6,stroke:#ffa940,stroke-width:1px
    style FinalValue fill:#f6ffed,stroke:#52c41a,stroke-width:2px
\`\`\`

* **Filter:** Callback har bir element uchun rostlik qiymatini qaytaradi. Rost (\`true\`) bo'lsa element qoladi, aks holda tushib qoladi.
* **Map:** Callback har bir elementni oladi va uning o'rniga yangi qiymat qaytaradi. Massiv uzunligi o'zgarmaydi.
* **Reduce:** Callback akkumulyator va joriy elementni qabul qilib, ularni bitta yakuniy qiymatga jamlaydi.

---

## 7. 📝 12 ta Mini Test

Darsimizning quizzes bo'limida higher-order metodlar, xotira optimizatsiyasi va callback kontekstlari bo'yicha tayyorlangan 12 ta test savolini yechib, bilimingizni sinab ko'ring. Har bir savolda to'g'ri javob bilan birga batafsil tushuntirish berilgan.

---

## 8. 🎯 Real Project Case Study

### Elektron do'kon uchun Buyurtma ma'lumotlarini qayta ishlash (Analytics Pipeline)
Katta hajmdagi tranzaksiyalar va buyurtmalarni tahlil qilishda higher-order array metodlarini zanjir shaklida ishlatish juda qo'l keladi. Quyidagi misolda biz tranzaksiyalar ro'yxatidan faqat muvaffaqiyatli yakunlangan (\`completed\`) va ma'lum bir sana doirasidagi buyurtmalarni olamiz, so'ngra foydalanuvchilar sotib olgan mahsulotlar bo'yicha umumiy daromadni kategoriyalar kesimida hisoblaymiz:

\`\`\`javascript
const orders = [
  { id: 101, status: 'completed', category: 'electronics', amount: 1200, tax: 50 },
  { id: 102, status: 'pending', category: 'clothing', amount: 150, tax: 10 },
  { id: 103, status: 'completed', category: 'electronics', amount: 800, tax: 30 },
  { id: 104, status: 'completed', category: 'books', amount: 45, tax: 2 },
  { id: 105, status: 'failed', category: 'electronics', amount: 500, tax: 20 },
  { id: 106, status: 'completed', category: 'clothing', amount: 300, tax: 15 }
];

// Bizga faqat 'completed' bo'lgan buyurtmalar bo'yicha umumiy sof daromad (amount + tax) kerak.
// Buni ketma-ket filter va reduce yordamida toza usulda bajaramiz:

const completedRevenue = orders
  .filter(order => order.status === 'completed')
  .reduce((acc, order) => {
    const totalAmount = order.amount + order.tax;
    
    // Kategoriya bo'yicha guruhlaymiz va yig'indini hisoblaymiz
    if (!acc[order.category]) {
      acc[order.category] = 0;
    }
    acc[order.category] += totalAmount;
    
    // Umumiy summana ham hisoblab boramiz
    acc.grandTotal = (acc.grandTotal || 0) + totalAmount;
    
    return acc;
  }, {});

console.log("Kategoriyalar bo'yicha hisobot:", completedRevenue);
/*
Natija:
{
  electronics: 2080,
  books: 47,
  clothing: 315,
  grandTotal: 2442
}
*/
\`\`\`

---

## 9. 🚀 Performance va Optimization

Massivlar ustida yuqori tartibli metodlarni qo'llashda quyidagi qoidalarga rioya qilish kod tezligini sezilarli darajada oshiradi:

1. **Zanjirlashning xotira qiymati (Intermediate Arrays memory allocation):**
   Agarda sizda 100,000 ta elementdan iborat massiv bo'lsa, \`.filter().map()\` zanjirini bajarish xotirada yana ikkita yangi massiv yaratilishiga sabab bo'ladi.
   * **Yechim:** Bir necha bosqichli amallarni bitta \`.reduce()\` ichiga jamlang. Shunda massiv faqat 1 marta aylanadi va ortiqcha xotira ajratilmaydi.
2. **Klassik Looplar vs Higher Order ($O(N)$ vs $O(N)$):**
   Algoritmik jihatdan ikkalasi ham chiziqli vaqt oladi. Biroq, micro-benchmarklarda klassik \`for\` tsikli higher-order metodlariga qaraganda 2–10 baravar tezroq ishlashi mumkin. Sababi, higher-order metodlar har bir element uchun yangi funksiya chaqiruvi (function call overhead) va stack'ni band qilishni talab qiladi.
3. **Short-Circuit funksiyalaridan unumli foydalanish:**
   Agar sizga massivda shartga mos keladigan bitta element bor-yo'qligi kerak bo'lsa, \`.filter().length > 0\` deb yozmang! U butun massivni aylanib chiqadi. Buning o'rniga \`.some()\` ishlating. U shart bajarilishi bilanoq tsiklni to'xtatadi.

> [!TIP]
> Agar loyihangiz real-time ma'lumotlar yoki o'ta katta massivlar (masalan, Canvas grafik chizmalari yoki katta ma'lumotlar bazasi replikatsiyasi) bilan ishlayotgan bo'lsa, higher-order metodlar o'rniga oddiy \`for\` tsiklidan foydalanish maqsadga muvofiq. Kundalik veb-ilovalarda esa o'qilishi oson bo'lganligi sababli \`map\`/\`filter\`/\`reduce\` metodlaridan foydalangan ma'qul.

---

## 10. 📌 Cheat Sheet

| Metod | Asosiy Vazifasi | Callback Qaytarishi Kerak Bo'lgan Qiymat | Metod Qaytaradigan Yakuniy Qiymat | Asl Massivni O'zgartiradimi? | Short-Circuit (Tez To'xtash)? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **\`forEach\`** | Elementlarni shunchaki aylanib chiqish | Kerak emas (inobatga olinmaydi) | \`undefined\` | Yo'q | Yo'q |
| **\`map\`** | Elementlarni o'zgartirib yangi massiv hosil qilish | Yangi element qiymati | Yangi o'zgartirilgan massiv | Yo'q | Yo'q |
| **\`filter\`** | Shartga mos keladigan elementlarni saralash | Truthy / Falsy (rost yoki yolg'on) | Saralangan yangi massiv | Yo'q | Yo'q |
| **\`reduce\`** | Elementlarni bitta yagona qiymatga yig'ish | Navbatdagi akkumulyator qiymati | Yig'ilgan yakuniy qiymat | Yo'q | Yo'q |
| **\`find\`** | Shartga mos birinchi elementni qidirish | Truthy / Falsy | Topilgan element qiymati yoki \`undefined\` | Yo'q | **Ha** (topishi bilan to'xtaydi) |
| **\`findIndex\`**| Shartga mos birinchi element indeksini qidirish | Truthy / Falsy | Topilgan element indeksi yoki \`-1\` | Yo'q | **Ha** (topishi bilan to'xtaydi) |
| **\`some\`** | Shartga mos kamida bitta element borligini tekshirish | Truthy / Falsy | \`true\` yoki \`false\` | Yo'q | **Ha** (\`true\` topilsa darhol to'xtaydi) |
| **\`every\`** | Barcha elementlar shartga mos kelishini tekshirish | Truthy / Falsy | \`true\` yoki \`false\` | Yo'q | **Ha** (\`false\` topilsa darhol to'xtaydi) |
`,
  exercises: [
  {
    "id": 1,
    "title": "Foydalanuvchilarni Filtrlash va Ismlarini Olish",
    "instruction": "Sizga foydalanuvchilar obyekti massivi beriladi. Har bir foydalanuvchi `name` (ism), `age` (yosh) va `isActive` (faol) xususiyatlariga ega. Siz faol bo'lgan (`isActive: true`) va yoshi 18 dan katta yoki teng bo'lgan foydalanuvchilarning faqat ismlarini massiv ko'rinishida qaytaruvchi `getActiveAdultNames(users)` funksiyasini yozishingiz kerak. Buni `.filter()` va `.map()` metodlaridan foydalanib bajaring.",
    "startingCode": "function getActiveAdultNames(users) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "users.filter(user => user.isActive && user.age >= 18).map(user => user.name) orqali yechishingiz mumkin.",
    "test": "const sandbox = new Function(code + '; return getActiveAdultNames;');\nconst fn = sandbox();\nconst testUsers = [\n  { name: 'Ali', age: 20, isActive: true },\n  { name: 'Vali', age: 16, isActive: true },\n  { name: 'Sardor', age: 25, isActive: false },\n  { name: 'Olim', age: 18, isActive: true }\n];\nconst result = fn(testUsers);\nif (!Array.isArray(result)) return 'Natija massiv bo\\'lishi kerak';\nif (result.length !== 2) return 'Natijadagi elementlar soni noto\\'g\\'ri';\nif (result[0] !== 'Ali' || result[1] !== 'Olim') return 'Natijadagi ismlar noto\\'g\\'ri. Kutilgan: [\"Ali\", \"Olim\"], Olingan: ' + JSON.stringify(result);\nreturn null;"
  },
  {
    "id": 2,
    "title": "Kategoriyalar Bo'yicha Mahsulotlar Narxini Jamlash",
    "instruction": "Sizga mahsulotlar ro'yxati (massiv) beriladi. Har bir mahsulot `name`, `category` (kategoriya) va `price` (narx) xususiyatlariga ega. Berilgan kategoriya bo'yicha barcha mahsulotlar narxining umumiy yig'indisini hisoblaydigan `getTotalPriceByCategory(products, category)` funksiyasini yozing. Buning uchun `.filter()` va `.reduce()` yoki faqat `.reduce()` metodidan foydalaning. Agar mahsulotlar topilmasa, `0` qaytarsin.",
    "startingCode": "function getTotalPriceByCategory(products, category) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Avval berilgan kategoriya bo'yicha filter qiling, so'ngra reduce yordamida price larni jamlang. reduce boshlang'ich qiymatini 0 qilib belgilashni unutmang.",
    "test": "const sandbox = new Function(code + '; return getTotalPriceByCategory;');\nconst fn = sandbox();\nconst products = [\n  { name: 'Telefon', category: 'electronics', price: 500 },\n  { name: 'Kitob', category: 'books', price: 15 },\n  { name: 'Noutbuk', category: 'electronics', price: 1200 },\n  { name: 'Ruchka', category: 'books', price: 2 }\n];\nconst sumElec = fn(products, 'electronics');\nconst sumBooks = fn(products, 'books');\nconst sumEmpty = fn(products, 'clothing');\nif (sumElec !== 1700) return 'Electronics kategoriyasi bo\\'yicha yig\\'indi xato. Kutilgan: 1700, Olingan: ' + sumElec;\nif (sumBooks !== 17) return 'Books kategoriyasi bo\\'yicha yig\\'indi xato. Kutilgan: 17, Olingan: ' + sumBooks;\nif (sumEmpty !== 0) return 'Mavjud bo\\'lmagan kategoriya uchun 0 qaytishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Talabalarni Guruhlash",
    "instruction": "Sizga talabalar massivi beriladi. Har bir talaba `name` (ism) va `grade` (baho: 'A', 'B', 'C' va h.k.) xususiyatlariga ega. Talabalarni baholari bo'yicha guruhlaydigan `groupStudentsByGrade(students)` funksiyasini yozing. Funksiya qaytaradigan obyekt kalitlari baholar bo'lishi va qiymatlari o'sha bahoni olgan talabalarning ismlari massividan iborat bo'lishi kerak. Buning uchun `.reduce()` metodidan foydalaning.",
    "startingCode": "function groupStudentsByGrade(students) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "reduce metodining boshlang'ich qiymatini bo'sh obyekt `{}` qilib oling. reduce ichida, agar `acc[student.grade]` mavjud bo'lmasa, uni bo'sh massiv `[]` sifatida e'lon qiling, keyin talabaning ismini unga push qiling.",
    "test": "const sandbox = new Function(code + '; return groupStudentsByGrade;');\nconst fn = sandbox();\nconst students = [\n  { name: 'Ali', grade: 'A' },\n  { name: 'Vali', grade: 'B' },\n  { name: 'Sardor', grade: 'A' },\n  { name: 'Olim', grade: 'C' },\n  { name: 'Eldor', grade: 'B' }\n];\nconst result = fn(students);\nif (typeof result !== 'object' || result === null) return 'Natija obyekt bo\\'ish kerak';\nif (!result.A || !result.B || !result.C) return 'Natija obyektida barcha baholar kalit sifatida mavjud emas';\nif (result.A.length !== 2 || !result.A.includes('Ali') || !result.A.includes('Sardor')) return 'A baho guruhi xato';\nif (result.B.length !== 2 || !result.B.includes('Vali') || !result.B.includes('Eldor')) return 'B baho guruhi xato';\nif (result.C.length !== 1 || result.C[0] !== 'Olim') return 'C baho guruhi xato';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da massivlar uchun 'Higher Order' (yuqori tartibli) metodlar nima?",
    "options": [
      "Faqat massivning uzunligini qaytaradigan metodlar",
      "Boshqa bir funksiyani (callback) parametr sifatida qabul qiladigan yoki funksiya qaytaradigan metodlar",
      "Faqat asinxron ishlaydigan massiv metodlari",
      "Massiv elementlarini butunlay o'chirib tashlaydigan metodlar"
    ],
    "correctAnswer": 1,
    "explanation": "Higher-order funksiyalar yoki metodlar boshqa funksiyalarni parametr (argument) sifatida qabul qiladi yoki natija sifatida funksiya qaytaradi. `.map()`, `.filter()`, `.reduce()` kabilar bunga misoldir."
  },
  {
    "id": 2,
    "question": "Quyidagi metodlardan qaysi biri chaqirilganda asl massivni o'zgartirmaydi va yangi massiv qaytaradi?",
    "options": [
      "`.forEach()`",
      "`.push()`",
      "`.map()`",
      "`.splice()`"
    ],
    "correctAnswer": 2,
    "explanation": "`.map()` metodi asl massiv elementlarini o'zgartirmasdan, har bir element ustida callback funksiyani bajaradi va natijalardan iborat yangi massiv qaytaradi. `forEach` undefined qaytaradi, `push` va `splice` esa asl massivni mutatsiyaga uchratadi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst nums = [1, 2, 3];\nconst res = nums.map(x => { x * 2 });\nconsole.log(res);\n```",
    "options": [
      "`[2, 4, 6]`",
      "`[undefined, undefined, undefined]`",
      "`[1, 2, 3]`",
      "`TypeError`"
    ],
    "correctAnswer": 1,
    "explanation": "Callback funksiyada figurali qavslar `{}` ishlatilganda, qiymatni qaytarish uchun aniq `return` kalit so'zi yozilishi shart. Aks holda callback `undefined` qaytaradi va yangi massiv `[undefined, undefined, undefined]` bo'ladi."
  },
  {
    "id": 4,
    "question": "Massivdan shartga mos keladigan birinchi elementning o'zini topish uchun qaysi metod eng qulay?",
    "options": [
      "`.filter()`",
      "`.findIndex()`",
      "`.find()`",
      "`.some()`"
    ],
    "correctAnswer": 2,
    "explanation": "`.find()` metodi shartga mos keladigan birinchi elementning qiymatini qaytaradi. Agar mos element topilmasa, `undefined` qaytaradi. `.filter()` esa barcha mos elementlardan iborat massiv qaytaradi."
  },
  {
    "id": 5,
    "question": "Bo'sh massivda boshlang'ich qiymat (initial value) ko'rsatmasdan `.reduce()` metodini chaqirish nima bilan yakunlanadi?",
    "options": [
      "`0` qaytaradi",
      "`undefined` qaytaradi",
      "`TypeError` xatoligini beradi",
      "Bo'sh massiv `[]` qaytaradi"
    ],
    "correctAnswer": 2,
    "explanation": "Agar massiv bo'sh bo'lsa va `.reduce()` metodiga boshlang'ich qiymat berilmagan bo'lsa, JavaScript `TypeError: Reduce of empty array with no initial value` xatoligini tashlaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst arr = [1, 2, 3, 4];\nconst val = arr.reduce((acc, curr) => acc + curr, 10);\nconsole.log(val);\n```",
    "options": [
      "`10`",
      "`20`",
      "`14`",
      "`24`"
    ],
    "correctAnswer": 1,
    "explanation": "`.reduce()` metodiga boshlang'ich qiymat sifatida `10` berilgan. Shunda akumulyator (`acc`) 10 dan boshlanadi va unga massiv elementlari (1, 2, 3, 4) qo'shib chiqiladi. Jami: 10 + 10 = 20."
  },
  {
    "id": 7,
    "question": "`.some()` va `.every()` metodlarining asosiy farqi nimada?",
    "options": [
      "`.some()` yangi massiv qaytaradi, `.every()` esa bitta qiymat qaytaradi",
      "`.some()` shartga kamida bitta element mos kelganda `true` qaytaradi, `.every()` esa barcha elementlar shartga mos kelgandagina `true` qaytaradi",
      "`.every()` shartga kamida bitta element mos kelganda `true` qaytaradi, `.some()` esa barcha elementlar mos kelganda",
      "Ular o'rtasida farq yo'q, ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`.some()` (ba'zi) kamida bitta element shartni bajarsa `true` qaytaradi. `.every()` (barcha) esa faqat va faqat massivdagi barcha elementlar shartni bajargandagina `true` qaytaradi."
  },
  {
    "id": 8,
    "question": "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst items = [1, 2, 3];\nconst res = items.forEach(x => x * 2);\nconsole.log(res);\n```",
    "options": [
      "`[2, 4, 6]`",
      "`undefined`",
      "`[1, 2, 3]`",
      "`null`"
    ],
    "correctAnswer": 1,
    "explanation": "`.forEach()` metodi har doim `undefined` qaytaradi. U massiv elementlarini shunchaki aylanib chiqish (tsikl) uchun mo'ljallangan va `.map()` kabi yangi massiv hosil qilmaydi."
  },
  {
    "id": 9,
    "question": "`.filter()` metodining callback funksiyasi elementni natijaviy massivda saqlab qolish uchun qanday qiymat qaytarishi kerak?",
    "options": [
      "Faqat `1` sonini",
      "Truthy (rost) qiymat",
      "Falsy (yolg'on) qiymat",
      "Yangi massiv obyekti"
    ],
    "correctAnswer": 1,
    "explanation": "`.filter()` callback funksiyasi har bir element uchun 'truthy' (yoki `true`) qiymat qaytarsa, o'sha element yangi massivga kiritiladi, aks holda (falsy yoki `false` bo'lsa) tashlab yuboriladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst numbers = [10, 5, 8];\nconst double = numbers.map(function(num) {\n  return num * this.factor;\n}, { factor: 2 });\nconsole.log(double);\n```",
    "options": [
      "`[20, 10, 16]`",
      "`[NaN, NaN, NaN]`",
      "`TypeError: Cannot read properties of undefined`",
      "`[10, 5, 8]`"
    ],
    "correctAnswer": 0,
    "explanation": "Ko'pgina higher-order massiv metodlari (`map`, `filter`, `forEach` va h.k.) ikkinchi argument sifatida `thisArg`ni qabul qiladi. Biz bu yerda `{ factor: 2 }` obyektini uzatdik, shuning uchun callback ichidagi `this.factor` to'g'ri ishlab `2` ga ko'paytirildi."
  },
  {
    "id": 11,
    "question": "Higher-order massiv metodlariga `thisArg` (ikkinchi argument) uzatishda arrow function (strelkali funksiya) ishlatishning qanday salbiy oqibati bor?",
    "options": [
      "Kodni sekinlashtiradi",
      "Arrow funksiyalar o'zining shaxsiy `this` kontekstiga ega emas, shuning uchun `thisArg` inobatga olinmaydi va tashqi kontekstdagi `this` ishlatiladi",
      "Sintaktik xato (`SyntaxError`) beradi",
      "Hech qanday salbiy oqibati yo'q, mukammal ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda `this` leksik ravishda bog'lanadi (lexical binding). Ya'ni ular o'z `this`iga ega emas va `thisArg` argumentini mutlaqo inobatga olmaydi. Shuning uchun bunday holatlarda oddiy `function` kalit so'zidan foydalanish shart."
  },
  {
    "id": 12,
    "question": "Qaysi massiv metodlari 'short-circuit evaluation' (natija aniq bo'lishi bilan zudlik bilan aylanishni to'xtatish) xususiyatiga ega?",
    "options": [
      "Faqat `.map()` va `.filter()`",
      "`.forEach()` va `.reduce()`",
      "`.some()`, `.every()`, `.find()` va `.findIndex()`",
      "Barcha yuqori tartibli metodlar oxirigacha aylanadi"
    ],
    "correctAnswer": 2,
    "explanation": "`.some()` bitta true topishi bilan, `.every()` bitta false topishi bilan, `.find()` va `.findIndex()` esa mos elementni topishi bilan tsiklni darhol to'xtatadi. Bu performance (samaradorlik) jihatidan juda foydalidir."
  }
]

};
