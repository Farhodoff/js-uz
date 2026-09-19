export const objectMethods = {
  id: "object-methods",
  title: "Object Metodlari: keys, values va entries",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: Shkaf va Qutilar

Tasavvur qiling, sizda bitta katta shkaf bor (Object) va uning ichida bir nechta tortmalar mavjud. Har bir tortmaning ustida yozuv qog'ozi (Key - kalit) bor va ichida buyum (Value - qiymat) yotibdi.

- **Object.keys()** - Bu faqatgina tortmalar ustidagi barcha yozuv qog'ozlarini yig'ib olishga o'xshaydi. Sizda qanday tortmalar borligini bilasiz, lekin ichida nima borligini ko'rmaysiz.
- **Object.values()** - Bu faqat tortmalar ichidagi buyumlarni olib chiqib, yig'ishga o'xshaydi. Nimaga tegishli ekanligini bilmaysiz, faqat buyumlarni o'zi.
- **Object.entries()** - Har bir tortmani yozuvi va ichidagi buyumini bitta qilib (juftlik qilib) yig'ib olishdir.
- **Object.fromEntries()** - Agar sizda shu yozuv va buyum juftliklari bo'lsa, ularni qaytadan bitta shkafga joylashtirib chiqishdir.

## 2. 🧠 Deep Dive: Under the Hood (V8 Engine va Performance)

JavaScript (ayniqsa V8 dvigateli) obyektlarni xotirada qanday saqlashini tushunish, bu metodlarning ishlash tezligini (performance) baholashda juda muhim.

V8 obyekt xususiyatlarini saqlash uchun ikki xil yondashuvdan foydalanadi:
1. **Named properties (Lug'at yoki Hidden Classes - Shapes):** Odatdagi string kalitlar uchun V8 **Hidden Classes** yaratadi. Bu obyekt xususiyatlariga tezkor kirishni ta'minlaydi.
2. **Elements (Massiv indekslari):** Raqamli kalitlar (masalan: \\\`{ 1: "a", 2: "b" }\\\`) massiv kabi xotirada ketma-ket joylashadi.

\\\`Object.keys()\\\`, \\\`Object.values()\\\`, va \\\`Object.entries()\\\` metodlarini ishga tushirganingizda, dvigatel obyektning ichki "Enumerable" (aylanish mumkin bo'lgan) xususiyatlarini qidirib chiqadi. Bu esa **O(N)** vaqtni oladi (N - xususiyatlar soni).

Xotira nuqtai nazaridan:
- \\\`Object.keys()\\\` yangi massiv yaratadi, lekin faqat string (yoki stringga aylantirilgan raqamlar) kalitlarni o'z ichiga oladi.
- \\\`Object.entries()\\\` eng ko'p xotira sarflaydi, chunki u nafaqat asosiy massivni, balki har bir kalit-qiymat uchun kichik ikki elementli massivlarni ham xotirada yaratishi kerak.

## 3. ⚠️ Edge Cases va Senior Interview Questions

**Edge Case 1: Raqamli kalitlar tartibi (Property Order)**
JavaScriptda obyekt kalitlari har doim ham yaratilgan tartibda chiqmaydi! Agar kalitlar butun raqamlar (integer) bo'lsa, ular o'sish tartibida saralanadi.
\\\`\\\`\\\`javascript
const obj = { "3": "c", "1": "a", "2": "b" };
console.log(Object.keys(obj)); // Natija: ["1", "2", "3"]
\\\`\\\`\\\`

**Edge Case 2: Symbol kalitlar va Enumerable bo'lmagan xususiyatlar**
\\\`Object.keys()\\\` va boshqa statik metodlar **Symbol** kalitlarni va enumerable bo'lmagan xususiyatlarni ko'rmaydi.
\\\`\\\`\\\`javascript
const id = Symbol("id");
const user = { name: "Ali", [id]: 123 };
Object.defineProperty(user, "age", { value: 25, enumerable: false });

console.log(Object.keys(user)); // Natija: ["name"]
\\\`\\\`\\\`

**Senior Interview Question:**
*Savol:* Nega katta hajmdagi ma'lumotlarni ishlashda \\\`Object.entries()\\\` o'rniga oddiy \\\`for...in\\\` samaraliroq bo'lishi mumkin?
*Javob:* Chunki \\\`Object.entries()\\\` har bir kalit-qiymat juftligi uchun xotirada yangi massiv ajratadi. Katta obyektlarda bu Garbage Collector ga og'irlik tushiradi va Memory Spike ni keltirib chiqaradi. Bunday holatda \\\`for...in\\\` tsikli (yoki \\\`for...of\\\` \\\`Object.keys\\\` bilan) orqali mutatsiya qilish xotira tejamkorroqdir. Ammo \\\`for...in\\\` prototip zanjirini ham tekshirganligi sababli, \\\`Object.hasOwn()\\\` bilan birga ishlatilishi shart.

## 📊 Obyekt Metodlari Sxemasi

\\\`\\\`\\\`mermaid
graph TD
    Start[Boshlangich Obyekt]
    Start --> Keys[Object.keys]
    Start --> Values[Object.values]
    Start --> Entries[Object.entries]
    
    Keys --> KeysResult([Kalitlar massivi])
    Values --> ValuesResult([Qiymatlar massivi])
    Entries --> EntriesResult([Juftliklar massivi])
    
    EntriesResult --> FromEntries[Object.fromEntries]
    FromEntries --> FinalResult[{Boshlangich Obyekt}]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Obyekt uzunligini aniqlash",
      instruction: "JavaScript-da obyektlarning '.length' xususiyati yo'q. Berilgan obyektda nechta kalit borligini hisoblovchi funksiyani yozing.",
      startingCode: "function countProperties(obj) {\n  // Object.keys dan foydalaning\n}",
      hint: "Object.keys(obj).length orqali kalitlar sonini bilsa bo'ladi.",
      solution: "function countProperties(obj) {\n  return Object.keys(obj).length;\n}",
      test: "const fn = new Function(code + '; return countProperties;')(); if (fn({a:1, b:2}) !== 2 || fn({}) !== 0) throw new Error('Test failed');"
    },
    {
      id: 2,
      title: "Barcha kalitlarni katta harflarga o'tkazish",
      instruction: "Berilgan obyektning faqat kalitlarini (keys) olib, barchasini katta harflarga (toUpperCase) o'tkazib yangi massiv qaytaring.",
      startingCode: "function getUppercaseKeys(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.keys() va array.map() ishlating.",
      solution: "function getUppercaseKeys(obj) {\n  return Object.keys(obj).map(k => k.toUpperCase());\n}",
      test: "const fn = new Function(code + '; return getUppercaseKeys;')(); const res = fn({name:'Ali', age:25}); if (res.join(',') !== 'NAME,AGE') throw new Error('Test failed');"
    },
    {
      id: 3,
      title: "Oyliklar yig'indisi",
      instruction: "Obyektda xodimlarning ismlari va oylik maoshlari berilgan. Barcha xodimlarning maoshlari yig'indisini hisoblovchi funksiya yozing.",
      startingCode: "function sumSalaries(salaries) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.values() dan foydalaning va elementlarni qo'shing.",
      solution: "function sumSalaries(salaries) {\n  return Object.values(salaries).reduce((acc, val) => acc + val, 0);\n}",
      test: "const fn = new Function(code + '; return sumSalaries;')(); if (fn({john: 100, pete: 200}) !== 300) throw new Error('Test failed');"
    },
    {
      id: 4,
      title: "Qiymatlarni tekshirish",
      instruction: "Berilgan obyekt ichida bironta qiymat 'admin' ga teng yoki yo'qligini tekshiruvchi (true/false) funksiya yarating.",
      startingCode: "function hasAdminValue(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.values(obj).includes('admin') dan foydalaning.",
      solution: "function hasAdminValue(obj) {\n  return Object.values(obj).includes('admin');\n}",
      test: "const fn = new Function(code + '; return hasAdminValue;')(); if (fn({role1:'user', role2:'admin'}) !== true || fn({role:'user'}) !== false) throw new Error('Test failed');"
    },
    {
      id: 5,
      title: "Entries ni formatlash",
      instruction: "Obyekt berilgan. Har bir kalit-qiymat uchun 'kalit: qiymat' degan stringlardan iborat massiv qaytaring.",
      startingCode: "function formatEntries(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.entries(obj).map(([k, v]) => `${k}: ${v}`) ishlating.",
      solution: "function formatEntries(obj) {\n  return Object.entries(obj).map(([k, v]) => `${k}: ${v}`);\n}",
      test: "const fn = new Function(code + '; return formatEntries;')(); const res = fn({a:1, b:2}); if (res[0] !== 'a: 1' || res[1] !== 'b: 2') throw new Error('Test failed');"
    },
    {
      id: 6,
      title: "Qiymatlarni ikki baravar oshirish",
      instruction: "Obyektning barcha qiymatlarini (raqam deb tasavvur qiling) 2 marta oshirib, yangi obyekt qaytaring.",
      startingCode: "function doubleValues(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.entries(obj).map(([key, value]) => [key, value * 2]) va Object.fromEntries ishlating.",
      solution: "function doubleValues(obj) {\n  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v * 2]));\n}",
      test: "const fn = new Function(code + '; return doubleValues;')(); const res = fn({x: 5, y: 10}); if (res.x !== 10 || res.y !== 20) throw new Error('Test failed');"
    },
    {
      id: 7,
      title: "Obyektni filtrlash",
      instruction: "Mahsulotlar narxlari berilgan obyekt qabul qiladigan va faqat narxi 10 dan katta bo'lganlarini qayta obyekt qilib qaytaradigan funksiya yozing.",
      startingCode: "function filterExpensiveItems(prices) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.entries(), .filter(([k, v]) => v > 10) va Object.fromEntries()",
      solution: "function filterExpensiveItems(prices) {\n  return Object.fromEntries(Object.entries(prices).filter(([k, v]) => v > 10));\n}",
      test: "const fn = new Function(code + '; return filterExpensiveItems;')(); const res = fn({apple: 5, banana: 15, cherry: 8, mango: 20}); if (!res.banana || !res.mango || res.apple) throw new Error('Test failed');"
    },
    {
      id: 8,
      title: "Obyektni tersiga o'girish",
      instruction: "Obyektning kalitlarini qiymat, qiymatlarini esa kalit qilib (swap keys and values) yangi obyekt qaytaruvchi funksiya yozing. (Qiymatlar string ekanligi kafolatlangan)",
      startingCode: "function invertObject(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.entries orqali massivga olib, map da [value, key] qilib almashtiring va fromEntries orqali obyektga yig'ing.",
      solution: "function invertObject(obj) {\n  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));\n}",
      test: "const fn = new Function(code + '; return invertObject;')(); const res = fn({a:'1', b:'2'}); if (res['1'] !== 'a' || res['2'] !== 'b') throw new Error('Test failed');"
    },
    {
      id: 9,
      title: "Kichik harflarga o'tkazish",
      instruction: "Berilgan obyektdagi barcha STRING turidagi qiymatlarni kichik harflarga (toLowerCase) o'tkazuvchi funksiya yozing. Boshqa turdagi qiymatlarga tegmang.",
      startingCode: "function lowercaseValues(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "Object.entries da typeof v === 'string' ekanligini tekshiring.",
      solution: "function lowercaseValues(obj) {\n  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? v.toLowerCase() : v]));\n}",
      test: "const fn = new Function(code + '; return lowercaseValues;')(); const res = fn({n:'ALI', age:25}); if (res.n !== 'ali' || res.age !== 25) throw new Error('Test failed');"
    },
    {
      id: 10,
      title: "Kalit prefiksini qidirish",
      instruction: "Obyekt berilgan. Faqatgina kalitlari 'is' bilan boshlanadiganlarini qoldirib yangi obyekt qaytaruvchi funksiya yozing. (masalan: {isActive: true, name: 'John'}) -> {isActive: true}",
      startingCode: "function filterByPrefix(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "key.startsWith('is') ni filter ichida ishlating.",
      solution: "function filterByPrefix(obj) {\n  return Object.fromEntries(Object.entries(obj).filter(([k]) => k.startsWith('is')));\n}",
      test: "const fn = new Function(code + '; return filterByPrefix;')(); const res = fn({isActive: true, age: 20, isDeleted: false}); if(res.age !== undefined || !('isActive' in res)) throw new Error('Test failed');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Object.keys() metodining vazifasi nima?",
      options: ["Obyektning faqat qiymatlarini massivga qaytaradi", "Obyektning faqat kalitlarini massivga qaytaradi", "Obyekt kalitlarini o'chiradi", "Kalit va qiymatlarni birlashtiradi"],
      correctAnswer: 1,
      explanation: "Object.keys(obj) obyektning barcha o'ziga tegishli sanaladigan kalitlarini (xususiyatlarini) array qilib qaytaradi."
    },
    {
      id: 2,
      question: "Object.entries({a: 1}) qanday natija qaytaradi?",
      options: ["['a', 1]", "[ ['a', 1] ]", "{'a': 1}", "undefined"],
      correctAnswer: 1,
      explanation: "Object.entries har bir juftlik uchun alohida massiv yaratadi, shuning uchun massiv ichida massiv qaytadi: [['a', 1]]."
    },
    {
      id: 3,
      question: "Qaysi tsikl Object.entries bilan birga ishlatishga juda mos tushadi?",
      options: ["for...in", "while", "do...while", "for...of"],
      correctAnswer: 3,
      explanation: "for (const [key, value] of Object.entries(obj)) tsikli obyektni bevosita kalit/qiymat juftligi bilan aylanishning eng oson usulidir."
    },
    {
      id: 4,
      question: "Obyekt kalitlarining sonini topishning to'g'ri usuli qaysi?",
      options: ["obj.length", "obj.size", "Object.keys(obj).length", "Object.entries().count"],
      correctAnswer: 2,
      explanation: "Obyektlarda .length yoki .size xossasi mavjud emas. Uni massivga o'girib (Object.keys orqali), keyin massiv uzunligini olish kerak."
    },
    {
      id: 5,
      question: "Object.values({x: 10, y: 20}) ning natijasi nima?",
      options: ["['x', 'y']", "[10, 20]", "[['x', 10], ['y', 20]]", "30"],
      correctAnswer: 1,
      explanation: "Object.values() faqat qiymatlarni massiv qilib ajratib beradi, shuning uchun [10, 20] bo'ladi."
    },
    {
      id: 6,
      question: "Massiv ichida massivlarni obyektga o'girish uchun qaysi metod ishlatiladi? (masalan, [['name', 'Ali']] -> {name: 'Ali'})",
      options: ["Object.assign()", "Object.entries()", "Object.create()", "Object.fromEntries()"],
      correctAnswer: 3,
      explanation: "Object.fromEntries() xuddi Object.entries ning teskarisi kabi ishlaydi, u array(lar)ni obyektga yig'ib beradi."
    },
    {
      id: 7,
      question: "Object.fromEntries() ishlashi uchun nima berish kerak?",
      options: ["Oddiy obyekt", "Iterable ob'ekt (masalan, ichida ikki elementli massivlar bo'lgan massiv, Map)", "Faqat massiv", "String"],
      correctAnswer: 1,
      explanation: "U xohlagan iterableni (array of arrays, Map) qabul qiladi, asosiysi har bir element [kalit, qiymat] shaklida bo'lishi kerak."
    },
    {
      id: 8,
      question: "for...in tsiklining Object.keys() dan asosiy kamchiligi nima bo'lishi mumkin?",
      options: ["Xotira ko'p yeydi", "Sintaksisi uzun", "Prototipdan meros o'tgan xossalarni ham aylanib chiqadi", "Faqat arraylarda ishlaydi"],
      correctAnswer: 2,
      explanation: "for...in prototip zanjiridagi metodlar va xossalarni ham ko'rsatib qo'yishi mumkin. Object.keys esa faqat obyektning o'ziniki bo'lgan kalitlarni oladi."
    },
    {
      id: 9,
      question: "Agar obyektda Symbol turidagi kalit bo'lsa, Object.keys() uni massivga qo'shadimi?",
      options: ["Ha, doim qo'shadi", "Yo'q, e'tiborga almaydi", "Faqat qat'iy rejimda (strict mode) qo'shadi", "Xato beradi"],
      correctAnswer: 1,
      explanation: "Object.keys() o'z ichiga Symbol tipidagi kalitlarni olmaydi. Ularni ko'rish uchun Object.getOwnPropertySymbols() ishlatish kerak."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri obyektni map() yoki filter() orqali tahrirlashning to'g'ri sxemasi?",
      options: ["obj.map() -> Object.fromEntries()", "Object.keys(obj) -> obj.filter()", "Object.entries() -> map/filter -> Object.fromEntries()", "Object.fromEntries() -> filter -> Object.entries()"],
      correctAnswer: 2,
      explanation: "Avval obyekt massivga aylanadi (entries), so'ng array metodlari yordamida (map/filter) filtrlanadi, oxirida yana obyektga yig'iladi (fromEntries)."
    },
    {
      id: 11,
      question: "Agar Object.fromEntries() ga bir xil kalitli ikki juftlik yuborilsa (masalan: [['a', 1], ['a', 2]]), natija qanday bo'ladi?",
      options: ["Xato beradi", "{ a: 1 } (birinchisi saqlanadi)", "{ a: 2 } (oxirgisi avvalgisini ustidan yozib yuboradi)", "{ a: [1, 2] }"],
      correctAnswer: 2,
      explanation: "Obyektlarda bir xil kalit bo'lishi mumkin emas. Oxirgi berilgan juftlik o'zidan oldingisini ustidan yozib (overwrite) yuboradi."
    },
    {
      id: 12,
      question: "Object.keys(null) ishga tushsa nima bo'ladi?",
      options: ["[] qaytaradi", "null qaytaradi", "undefined qaytaradi", "TypeError xatosini yuzaga keltiradi"],
      correctAnswer: 3,
      explanation: "null yoki undefined kabi primitiv qiymatlar ustida Object metodlarini chaqirish xatoga (TypeError: Cannot convert undefined or null to object) olib keladi."
    }
  ]
};
