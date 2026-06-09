export const mapSetWeak = {
  id: "map-set-weak",
  title: "Map, Set, WeakMap va WeakSet",
  level: "O'rta daraja",
  description: "JavaScript-dagi zamonaviy kalit-qiymatli va unikal to'plamlar, ularning afzalliklari va xotira boshqaruvi.",
  theory: `## 1. NEGA kerak?
JavaScript-da an'anaviy ravishda ma'lumotlarni kalit-qiymat (key-value) juftligida saqlash uchun **Object** (Obyekt) dan, samarasiz bo'lsa-da ro'yxat shaklida saqlash uchun esa **Array** (Massiv) dan foydalanib kelingan.
Biroq, obyektlar va massivlarning ma'lum cheklovlari bor:
- Obyekt kalitlari faqat \`String\` yoki \`Symbol\` bo'lishi mumkin. Obyekt kaliti sifatida boshqa bir obyekt yoki funksiyani ishlata olmaymiz.
- Obyektda elementlar sonini (\`size\`) olish qiyin (avval kalitlarni massivga olib, keyin uzunligini tekshirish kerak).
- Massivlarda takrorlanuvchi elementlarni avtomatik ravishda tozalash mexanizmi yo'q.

Shu sababli, ES6 (2015) versiyasida JavaScript-ga yangi va mukammal ma'lumotlar tuzilmalari: **Map**, **Set**, **WeakMap** va **WeakSet** qo'shildi. Ular ma'lumotlar bilan ishlashni yanada tezroq, xavfsizroq va xotira jihatidan samaraliroq qiladi.

## 2. SODDALIK (Analogiya)
- **Map (Lug'at):** Buni xuddi **telefon kitobchasi** deb tasavvur qiling. Unda ism (kalit) va telefon raqami (qiymat) juftligi saqlanadi. Obyektdan farqi - telefon kitobchasi kaliti sifatida insonning rasmini (obyekt) ham yopishtirib qo'yish mumkin!
- **Set (Unikal to'plam):** Buni xuddi **imtihon topshirganlar ro'yxati** deb tasavvur qiling. Agar bir o'quvchi imtihondan 3 marta o'tgan bo'lsa ham, uning ismi ro'yxatda faqat bir marta yoziladi. Takrorlanishlarga yo'l qo'yilmaydi.
- **WeakMap (Vaqtinchalik seyf):** Bu xuddi mehmonxonadagi **vaqtincha saqlash kamerasi** kabi. Agar mehmon mehmonxonani tark etsa (obyekt xotiradan o'chirilsa), u kameraga topshirgan buyumlar ham avtomatik ravishda axlat qutisiga tashlanadi (Garbage Collected bo'ladi).

## 3. STRUKTURA VA QO'LLANILISHI

### A. Map
\`Map\` — kalit-qiymat juftligini saqlaydigan to'plam. Uning obyektdan farqi - kalit sifatida istalgan turdagi qiymatni (obyekt, funksiya, raqam) ishlatish mumkin.

Asosiy metodlari:
- \`new Map()\` – map yaratish.
- \`map.set(key, value)\` – kalit bo'yicha qiymat saqlash.
- \`map.get(key)\` – kalit bo'yicha qiymatni olish (\`undefined\` qaytarishi mumkin).
- \`map.has(key)\` – kalit mavjudligini tekshirish (\`true\` / \`false\`).
- \`map.delete(key)\` – kalit bo'yicha o'chirish.
- \`map.clear()\` – hamma narsani o'chirish.
- \`map.size\` – elementlar soni.

\`\`\`javascript
const userRoles = new Map();

const ali = { name: "Ali" };
const adminRole = { role: "Administrator" };

// Obyektni kalit sifatida ishlatamiz!
userRoles.set(ali, adminRole);
userRoles.set("status", "active");

console.log(userRoles.get(ali)); // { role: "Administrator" }
console.log(userRoles.size); // 2
\`\`\`

### B. Set
\`Set\` — faqat unikal (takrorlanmas) qiymatlarni saqlaydigan maxsus to'plam. Unda har bir qiymat faqat bir marta bo'lishi mumkin.

Asosiy metodlari:
- \`new Set([iterable])\` – set yaratish.
- \`set.add(value)\` – qiymat qo'shish (agar qiymat allaqachon bo'lsa, hech narsa o'zgarmaydi).
- \`set.has(value)\` – qiymat borligini tekshirish.
- \`set.delete(value)\` – o'chirish.
- \`set.clear()\` – tozalash.
- \`set.size\` – elementlar soni.

\`\`\`javascript
const numbers = new Set([1, 2, 3, 3, 2, 1, 4]);
console.log(numbers); // Set(4) { 1, 2, 3, 4 } (duplikatlar o'chib ketdi!)

// Massivdagi duplikatlarni tozalashning eng tezkor usuli:
const uniqueArray = [...new Set([1, 1, 2, 2, 3])]; // [1, 2, 3]
\`\`\`

### C. WeakMap
\`WeakMap\` — bu \`Map\` ning maxsus turi bo'lib, quyidagi cheklovlarga ega:
1. Kalit sifatida **faqat obyektlar** ishlatilishi mumkin (ibtidoiy turlar - string, number mumkin emas).
2. Obyekt-kalitlar xotirada **kuchsiz ushlab turiladi (weak references)**. Agar obyektga boshqa hech qayerdan havola (reference) qolmasa, u Garbage Collector (axlat yig'uvchi) tomonidan xotiradan avtomatik o'chiriladi.
3. Elementlarni aylanib chiqish (iteration) va \`size\` xossasi yo'q.

\`\`\`javascript
let user = { name: "John" };
const visitsCountMap = new WeakMap();

visitsCountMap.set(user, 12);

user = null; // Havola o'chirildi!
// Endi { name: "John" } obyekti va visitsCountMap ichidagi ma'lumot xotiradan to'liq o'chib ketadi.
\`\`\`

### D. WeakSet
\`WeakSet\` — faqat unikal obyektlarni saqlaydigan to'plam.
- Kalitlar faqat obyektlar bo'lishi kerak.
- Obyektlar kuchsiz saqlanadi.
- Iteratsiya (aylanib chiqish) metodlari va \`size\` yo'q.

\`\`\`javascript
const activeUsers = new WeakSet();
let bob = { name: "Bob" };

activeUsers.add(bob);
console.log(activeUsers.has(bob)); // true

bob = null; // Bob obyekti faol foydalanuvchilar ro'yxatidan va xotiradan o'chiriladi.
\`\`\`

## 4. NIMA UCHUN MUHIM?
- **Tezkorlik:** Map va Set elementlarni qidirishda (\`has\`), o'chirishda (\`delete\`) va qo'shishda (\`set\` / \`add\`) obyekt va massivlarga qaraganda ancha tez ishlaydi (ayniqsa katta ma'lumotlar bilan ishlaganda O(1) murakkablikda).
- **Metadata qo'shish:** WeakMap uchinchi tomon kutubxonalari yaratgan obyektlarga qo'shimcha metadata yozishda xotira sizib chiqishi (memory leak) oldini oladi.

## 5. KO'P UCHRAYDIGAN XATOLAR
1. **WeakMap ichida string kalit ishlatish:**
   \`\`\`javascript
   const wm = new WeakMap();
   wm.set("key", 1); // TypeError: Invalid value used as weak map key ❌
   \`\`\`
2. **Obyekt kalitlarini tekshirishda havola (reference) farqini unutish:**
   \`\`\`javascript
   const map = new Map();
   map.set({ id: 1 }, "Foydalanuvchi");
   console.log(map.get({ id: 1 })); // undefined! ❌ Chunki ikkita alohida obyekt {} xotirada boshqa manzilda joylashgan.
   
   // TO'G'RI:
   const keyObj = { id: 1 };
   map.set(keyObj, "Foydalanuvchi");
   console.log(map.get(keyObj)); // "Foydalanuvchi" ✅
   \`\`\`

## 6. INTERVIEW SAVOLLARI (Junior -> Middle -> Senior)
1. **Map va Object farqi nima? (Junior)**
   - Obyekt kalitlari faqat string/symbol bo'ladi, Map-da esa istalgan tip. Map elementlar sonini \`size\` orqali beradi, obyektda esa bunday xossa yo'q. Map iteratsiya uchun qulay.
2. **Set yordamida massivdagi duplikatlarni qanday yo'qotish mumkin? (Junior)**
   - \`[...new Set(array)]\` sintaksisi orqali.
3. **WeakMap va Map o'rtasidagi farq nimada? (Middle)**
   - WeakMap kalitlari faqat obyekt bo'lishi shart va ular xotirada kuchsiz saqlanadi. WeakMap-da iteratsiya metodlari va size xossasi mavjud emas.
4. **WeakSet qachon ishlatiladi? (Middle)**
   - Obyektlar guruhini (masalan, faol websocket ulanishlari yoki DOM tugunlari) kuzatib borishda va ularni xotiradan avtomatik o'chishini ta'minlashda.
5. **Set-da element bor-yo'qligini tekshirish massivning \`includes\` metodidan nega tezroq? (Middle)**
   - Chunki Set ichida qiymatlar hash-table yordamida indekslanadi, bu esa O(1) tezlikda tekshirish imkonini beradi. Massiv esa O(N) vaqt sarflaydi.
6. **Map-ni obyektga va aksincha qanday o'tkazamiz? (Middle)**
   - Obyektni Map-ga: \`new Map(Object.entries(obj))\`.
   - Map-ni obyektga: \`Object.fromEntries(map)\`.
7. **WeakMap qanday qilib xotira sizib chiqishini (memory leak) oldini oladi? (Senior)**
   - WeakMap-dagi kalit obyektga boshqa havola qolmasa, Garbage Collector uni va unga bog'liq qiymatni avtomatik o'chiradi. Map-da esa obyekt o'chsa ham, u Map ichida kalit sifatida saqlanib qolaveradi va xotira bo'shamaydi.
8. **WeakMap yordamida klasslarda private xususiyatlarni qanday yaratish mumkin? (Senior)**
   - Klassdan tashqarida \`const privateFields = new WeakMap()\` yaratiladi. Konstruktorda \`privateFields.set(this, { secret: 123 })\` deb yoziladi. Bu ma'lumot faqat klass ichida o'qiladi va obyektdan tashqarida ko'rinmaydi.
9. **Map elementlarining tartibi qanday saqlanadi? (Junior)**
   - Map elementlari unga qo'shilgan ketma-ketlikda (insertion order) saqlanadi va iteratsiya qilinganda shu tartibda chiqadi.
10. **Set ichida \`{}\` va \`{}\` bir xil element deb hisoblanadimi? (Junior)**
    - Yo'q, Set ikkita alohida bo'sh obyektni saqlab qoladi, chunki ularning havolalari (references) boshqa-boshqa.
11. **Nega WeakMap-ni loop orqali aylanib chiqish (iterate qilish) mumkin emas? (Senior)**
    - Chunki Garbage Collector fonda istalgan vaqtda kalit obyektlarni xotiradan o'chirib yuborishi mumkin. Bu esa iteratsiya paytida elementlar soni kutilmaganda o'zgarishiga olib keladi.
12. **Map kaliti sifatida NaN ishlatsa bo'ladimi? (Middle)**
    - Ha, Map-da \`NaN\` kaliti o'ziga teng deb hisoblanadi (ya'ni \`NaN === NaN\` kabi ishlaydi) va uni bitta kalit sifatida saqlaydi.
`
  ,
  exercises: [
    {
      id: 1,
      title: "Set: Unikal elementlar",
      instruction: "Berilgan sonlar massividagi barcha takrorlanuvchi elementlarni Set yordamida o'chirib tashlang va natijani oddiy massiv ko'rinishida qaytaruvchi `removeDuplicates(arr)` funksiyasini yozing.",
      startingCode: "function removeDuplicates(arr) {\n  // Kodni yozing\n}",
      hint: "Set yaratib, uni spread operator orqali massivga o'giring: return [...new Set(arr)];",
      test: "if (typeof removeDuplicates !== 'function') return 'removeDuplicates topilmadi'; if (JSON.stringify(removeDuplicates([1,2,2,3,1])) !== '[1,2,3]') return 'Duplikatlar to\\'g\\'ri tozalanmadi'; return null;"
    },
    {
      id: 2,
      title: "Map: Foydalanuvchi qidirish",
      instruction: "Map obyektini (`userMap`) va foydalanuvchi `id` (kalit) sini qabul qilib, agar foydalanuvchi mavjud bo'lsa uning ismini qaytaruvchi, aks holda 'Topilmadi' satrini qaytaruvchi `getUserName(userMap, id)` funksiyasini yozing.",
      startingCode: "function getUserName(userMap, id) {\n  // Map metodlarini ishlating\n}",
      hint: "userMap.has(id) orqali tekshirib, userMap.get(id) ni qaytaring yoki 'Topilmadi'.",
      test: "if (typeof getUserName !== 'function') return 'getUserName topilmadi'; const myMap = new Map([[1, 'Ali'], [2, 'Vali']]); if (getUserName(myMap, 1) !== 'Ali' || getUserName(myMap, 3) !== 'Topilmadi') return 'Map-dan qidirish xato ishladi'; return null;"
    },
    {
      id: 3,
      title: "WeakMap: Yashirin Metadata",
      instruction: "WeakMap yordamida berilgan `obj` obyektiga `metadata` qiymatini biriktiruvchi va keyinchalik uni o'qib qaytaruvchi `attachMetadata(weakMap, obj, metadata)` funksiyasini yozing.",
      startingCode: "function attachMetadata(weakMap, obj, metadata) {\n  // WeakMap-ga yozing va keyin o'sha qiymatni qaytaring\n}",
      hint: "weakMap.set(obj, metadata); return weakMap.get(obj);",
      test: "if (typeof attachMetadata !== 'function') return 'attachMetadata topilmadi'; const wm = new WeakMap(); const o = {}; if (attachMetadata(wm, o, 'secret') !== 'secret') return 'WeakMap-da metadata to\\'g\\'ri saqlanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Obyekt (Object) va Map o'rtasidagi eng asosiy farqlardan biri nima?",
      options: [
        "Obyektlar faqat sonlarni kalit qiladi, Map esa satrlarni",
        "Map kaliti sifatida har qanday turdagi qiymatni (shu jumladan obyektlarni ham) ishlatish mumkin",
        "Map faqat local storage-da saqlanadi",
        "Obyektlar Map-ga qaraganda doimo tezroq ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Obyektlarda kalitlar faqat String yoki Symbol bo'lishi mumkin, Map-da esa istalgan tip (obyekt, funksiya, raqam) kalit bo'la oladi."
    },
    {
      id: 2,
      question: "Set to'plamining o'ziga xosligi nimada?",
      options: [
        "U ma'lumotlarni kalit-qiymat shaklida saqlaydi",
        "U faqat takrorlanmaydigan (unikal) elementlarni saqlaydi",
        "U faqat asinxron funksiyalarni qabul qiladi",
        "U massivlardan ko'ra ko'proq xotira egallaydi"
      ],
      correctAnswer: 1,
      explanation: "Set - faqat unikal elementlarni saqlaydigan to'plam bo'lib, unga takroriy qiymat qo'shilganda u inkor qilinadi."
    },
    {
      id: 3,
      question: "Set ichida elementlar sonini olish uchun qaysi xossadan foydalaniladi?",
      options: ["length", "size", "count", "keys.length"],
      correctAnswer: 1,
      explanation: "Set va Map to'plamlarida elementlar sonini olish uchun maxsus `size` xossasi ishlatiladi."
    },
    {
      id: 4,
      question: "WeakMap-da kalit sifatida nimalardan foydalanish mumkin?",
      options: [
        "Faqat string va number turlari",
        "Faqat obyektlar (objects)",
        "Istalgan ma'lumot turi",
        "Faqat funksiyalar"
      ],
      correctAnswer: 1,
      explanation: "WeakMap and WeakSet faqat obyektlar bilan ishlaydi. Ular ibtidoiy turlarni (string, number, boolean) kalit qibly qabul qilmaydi."
    },
    {
      id: 5,
      question: "WeakMap qanday qilib xotira sizib chiqishini (memory leaks) oldini oladi?",
      options: [
        "U xotirani vaqti-vaqti bilan avtomatik o'chirib turadi",
        "Undagi obyekt-kalitlarga boshqa havola qolmasa, u Garbage Collector tomonidan xotiradan avtomatik o'chiriladi",
        "U ma'lumotlarni qattiq diskda saqlaydi",
        "U faqat asinxron operatsiyalarni bloklaydi"
      ],
      correctAnswer: 1,
      explanation: "WeakMap obyekt-kalitlarni kuchsiz ushlab turadi (weak references). Agar dasturda obyektga boshqa reference qolmasa, u xotiradan to'liq o'chib ketadi."
    },
    {
      id: 6,
      question: "WeakSet va WeakMap to'plamlarini loop (for...of, forEach) yordamida aylanib chiqish mumkinmi?",
      options: [
        "Ha, cheklovlarsiz",
        "Yo'q, ularda aylanib chiqish (iteratsiya) metodlari mavjud emas",
        "Faqat browser konsolida aylanib chiqish mumkin",
        "Faqat maxsus generatorlar yordamida"
      ],
      correctAnswer: 1,
      explanation: "WeakMap va WeakSet tarkibi Garbage Collector tomonidan istalgan vaqtda o'zgarishi mumkinligi sababli, ularni iterate qilish (for...of) taqiqlangan."
    },
    {
      id: 7,
      question: "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst set = new Set();\nset.add({});\nset.add({});\nconsole.log(set.size);\n```",
      options: ["1", "2", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "Ikkita alohida bo'sh obyekt `{}` xotirada boshqa havolalarga (references) ega, shuning uchun Set ularni unikal deb hisoblaydi va ikkalasini ham saqlaydi. Natija: 2."
    },
    {
      id: 8,
      question: "Map tarkibidagi barcha elementlarni butunlay o'chirish uchun qaysi metod chaqiriladi?",
      options: ["delete()", "clear()", "reset()", "remove()"],
      correctAnswer: 1,
      explanation: "Map va Set to'plamlaridagi barcha elementlarni to'liq tozalash uchun `clear()` metodi ishlatiladi."
    }
  ]
};
