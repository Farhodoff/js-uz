export const mapSetWeak = {
  id: "map-set-weak",
  title: "Map, Set, WeakMap va WeakSet",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

JavaScriptda oddiy Object va Arraylardan tashqari maxsus ma'lumotlar tuzilmalari mavjud: \`Map\`, \`Set\`, \`WeakMap\` va \`WeakSet\`.

- **Map**: Kalit-qiymat (key-value) ko'rinishidagi kolleksiya. Objectdan farqi - kalit sifatida har qanday turdagi (hatto object, function) qiymatni qabul qila oladi va elementlar tartibi saqlanadi.
- **Set**: Faqat noyob (unique) qiymatlarni saqlovchi kolleksiya. Bir xil qiymatni ikki marta qo'shib bo'lmaydi.
- **WeakMap va WeakSet**: Bular "kuchsiz" (weak) bog'lanishga ega. Ya'ni, agar ularning ichidagi object boshqa joyda ishlatilmasa, Garbage Collector (xotira tozalagich) ularni avtomatik o'chirib yuboradi. Faqat objectlarni qabul qiladi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**YOMON:** Massivdagi takrorlanuvchi elementlarni \`for\` tsikli bilan olib tashlash.
\`\`\`javascript
const arr = [1, 2, 2, 3, 4, 4];
const uniqueArr = [];
for (let i = 0; i < arr.length; i++) {
  if (!uniqueArr.includes(arr[i])) {
    uniqueArr.push(arr[i]);
  }
}
\`\`\`

**YAXSHI:** \`Set\` yordamida buni bir qatorda yozish.
\`\`\`javascript
const arr = [1, 2, 2, 3, 4, 4];
const uniqueArr = [...new Set(arr)];
\`\`\`

**YOMON:** DOM elementiga ma'lumot ulash uchun Objectdan foydalanish (xotira sizib chiqishiga (memory leak) olib keladi).
\`\`\`javascript
const nodeData = {};
let element = document.getElementById("my-btn");
nodeData[element] = { clicks: 0 }; 
// element o'chirilsa ham nodeData uni xotirada ushlab qoladi
\`\`\`

**YAXSHI:** \`WeakMap\` yordamida xotirani himoyalash.
\`\`\`javascript
const nodeData = new WeakMap();
let element = document.getElementById("my-btn");
nodeData.set(element, { clicks: 0 });
// element o'chirilsa, xotiradan avtomatik tozalanadi
\`\`\`

## 🎤 Intervyu Savollari

1. **Map va Objectning asosiy farqi nimada?**
   - Object kalitlari faqat String yoki Symbol bo'lishi mumkin. Map kalitlari esa har qanday turda (object, array, function) bo'lishi mumkin. Map'da \`.size\` xossasi bor, object'da yo'q.
2. **Set qachon ishlatiladi?**
   - Massivdan takrorlangan elementlarni olib tashlash kerak bo'lganda, yoki biror elementlar ro'yxatida tezkor qidiruv (\`has\`) qilish kerak bo'lganda.
3. **WeakMap nima uchun kerak?**
   - Xotira sizib chiqishining (Memory Leak) oldini olish uchun. Vaqtinchalik ma'lumotlarni obyektlarga bog'lash uchun ishlatiladi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD
    A[Data Structures] --> B(Map)
    A --> C(Set)
    A --> D(WeakMap)
    A --> E(WeakSet)
    B --> F[Key-Value, Any Key]
    C --> G[Unique Values]
    D --> H[Object Keys, Garbage Collected]
    E --> I[Object Values, Garbage Collected]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Unique Array",
      instruction: "Berilgan massivdan faqat noyob (unique) elementlarni qaytaruvchi funksiya yarating. Set'dan foydalaning.",
      startingCode: "function getUniqueValues(arr) {\n  // kodni bu yerda yozing\n}",
      hint: "Spread operatori `...` va `new Set(arr)` ni birgalikda ishlating.",
      solution: "function getUniqueValues(arr) {\n  return [...new Set(arr)];\n}",
      test: "const fn = new Function(code + '; return getUniqueValues;')(); if (JSON.stringify(fn([1, 1, 2, 3, 3])) !== JSON.stringify([1, 2, 3])) throw new Error('Test 1 failed');"
    },
    {
      id: 2,
      title: "Map yordamida lug'at",
      instruction: "Bo'sh Map yarating, unga 'hello' kaliti bilan 'salom' qiymatini qo'shing va Map ni qaytaring.",
      startingCode: "function createDictionary() {\n  // kodni bu yerda yozing\n}",
      hint: "new Map() dan foydalaning va .set() orqali ma'lumot qo'shing.",
      solution: "function createDictionary() {\n  const map = new Map();\n  map.set('hello', 'salom');\n  return map;\n}",
      test: "const fn = new Function(code + '; return createDictionary;')(); const map = fn(); if (!(map instanceof Map) || map.get('hello') !== 'salom') throw new Error('Map xato yaratildi');"
    },
    {
      id: 3,
      title: "Map o'lchami",
      instruction: "Map obyektining nechta elementdan iborat ekanligini qaytaruvchi funksiya yozing.",
      startingCode: "function getMapSize(myMap) {\n  // kodni bu yerda yozing\n}",
      hint: "Map ning `.size` xossasi mavjud.",
      solution: "function getMapSize(myMap) {\n  return myMap.size;\n}",
      test: "const fn = new Function(code + '; return getMapSize;')(); const map = new Map(); map.set(1, 1); if (fn(map) !== 1) throw new Error('Size noto\\'g\\'ri');"
    },
    {
      id: 4,
      title: "Element mavjudligini tekshirish (Set)",
      instruction: "Berilgan Set ichida ma'lum bir qiymat bor-yo'qligini tekshirib (true/false) qaytaruvchi funksiya yozing.",
      startingCode: "function checkInSet(mySet, val) {\n  // kodni bu yerda yozing\n}",
      hint: "Set ning `.has()` metodidan foydalaning.",
      solution: "function checkInSet(mySet, val) {\n  return mySet.has(val);\n}",
      test: "const fn = new Function(code + '; return checkInSet;')(); const set = new Set([1,2]); if(fn(set, 2) !== true || fn(set, 3) !== false) throw new Error('Has xato ishladi');"
    },
    {
      id: 5,
      title: "Mapdan qiymat o'qish",
      instruction: "Map va kalit beriladi. O'sha kalitdagi qiymatni qaytaring.",
      startingCode: "function getValueFromMap(myMap, key) {\n  // kodni bu yerda yozing\n}",
      hint: "Map ning `.get()` metodini ishlating.",
      solution: "function getValueFromMap(myMap, key) {\n  return myMap.get(key);\n}",
      test: "const fn = new Function(code + '; return getValueFromMap;')(); const m = new Map(); m.set('a', 10); if(fn(m, 'a') !== 10) throw new Error('Get xato');"
    },
    {
      id: 6,
      title: "Setdan element o'chirish",
      instruction: "Berilgan Setdan ma'lum bir qiymatni o'chiring va o'sha Set ni qaytaring.",
      startingCode: "function removeFromSet(mySet, val) {\n  // kodni bu yerda yozing\n}",
      hint: "Set ning `.delete()` metodidan foydalaning.",
      solution: "function removeFromSet(mySet, val) {\n  mySet.delete(val);\n  return mySet;\n}",
      test: "const fn = new Function(code + '; return removeFromSet;')(); const s = new Set([1,2,3]); fn(s, 2); if(s.has(2)) throw new Error('O\\'chirilmadi');"
    },
    {
      id: 7,
      title: "Map ni tozalash",
      instruction: "Berilgan Map dagi barcha elementlarni tozalab (bo'sh qilib), uni qaytaring.",
      startingCode: "function clearMap(myMap) {\n  // kodni bu yerda yozing\n}",
      hint: "Map ning `.clear()` metodi bor.",
      solution: "function clearMap(myMap) {\n  myMap.clear();\n  return myMap;\n}",
      test: "const fn = new Function(code + '; return clearMap;')(); const m = new Map(); m.set('x', 1); fn(m); if(m.size !== 0) throw new Error('Tozalanmadi');"
    },
    {
      id: 8,
      title: "WeakMap ga object qo'shish",
      instruction: "Bo'sh WeakMap yarating. Berilgan `obj` ni kalit qilib, unga 'secret' degan string qiymatni saqlang va WeakMap ni qaytaring.",
      startingCode: "function createWeakMap(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "new WeakMap() va .set(obj, 'secret')",
      solution: "function createWeakMap(obj) {\n  const wm = new WeakMap();\n  wm.set(obj, 'secret');\n  return wm;\n}",
      test: "const fn = new Function(code + '; return createWeakMap;')(); const o = {}; const wm = fn(o); if(wm.get(o) !== 'secret') throw new Error('WeakMap xato');"
    },
    {
      id: 9,
      title: "Map kalitlarini ro'yxatga olish",
      instruction: "Map obyekti beriladi. Uning barcha kalitlarini Array ko'rinishida qaytaring.",
      startingCode: "function getMapKeys(myMap) {\n  // kodni bu yerda yozing\n}",
      hint: "myMap.keys() iterator qaytaradi. Uni Arrayga aylantirish uchun Array.from() yoki ... operatori ishlating.",
      solution: "function getMapKeys(myMap) {\n  return Array.from(myMap.keys());\n}",
      test: "const fn = new Function(code + '; return getMapKeys;')(); const m = new Map(); m.set('x', 1); m.set('y', 2); if(fn(m).join('') !== 'xy') throw new Error('Keys array xato');"
    },
    {
      id: 10,
      title: "WeakSet yaratish",
      instruction: "Bo'sh WeakSet yarating va unga berilgan objectni qo'shib, WeakSetni qaytaring.",
      startingCode: "function createWeakSet(obj) {\n  // kodni bu yerda yozing\n}",
      hint: "new WeakSet() va .add() dan foydalaning.",
      solution: "function createWeakSet(obj) {\n  const ws = new WeakSet();\n  ws.add(obj);\n  return ws;\n}",
      test: "const fn = new Function(code + '; return createWeakSet;')(); const o = {}; const ws = fn(o); if(!ws.has(o)) throw new Error('WeakSet xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Map obyektida ma'lumotlar qanday tuzilmada saqlanadi?",
      options: ["Faqat massiv ko'rinishida", "Kalit-qiymat ko'rinishida", "Faqat qiymatlar ko'rinishida", "Ierarxik daraxt ko'rinishida"],
      correctAnswer: 1,
      explanation: "Map ma'lumotlarni xuddi Object kabi key-value (kalit-qiymat) shaklida saqlaydi."
    },
    {
      id: 2,
      question: "Set ichida bir xil qiymatni ikki marta saqlash mumkinmi?",
      options: ["Ha, albatta", "Yo'q, Set faqat noyob qiymatlarni saqlaydi", "Ha, agar ular raqam bo'lsa", "Faqat stringlar uchun ruxsat berilgan"],
      correctAnswer: 1,
      explanation: "Set to'plami har doim faqat unique (takrorlanmas) qiymatlarni saqlaydi."
    },
    {
      id: 3,
      question: "WeakMap da kalit (key) sifatida nima ishlatilishi mumkin?",
      options: ["Faqat stringlar", "Har qanday qiymat", "Faqat Objectlar", "Faqat raqamlar"],
      correctAnswer: 2,
      explanation: "WeakMap va WeakSet da faqat objectlar (yoki garbage collect bo'la oladigan turlar) kalit vazifasini o'tashi mumkin."
    },
    {
      id: 4,
      question: "Map ning o'lchamini (elementlar sonini) qanday bilish mumkin?",
      options: ["map.length", "map.size", "map.count", "map.getSize()"],
      correctAnswer: 1,
      explanation: "Map va Set obyektlari .length emas, balki .size xossasiga ega."
    },
    {
      id: 5,
      question: "WeakSet ning qanday ustunligi bor?",
      options: ["Elementlar avtomatik sortlanadi", "Garbage Collector tomonidan obyekti o'chirilsa, xotira bo'shatiladi", "Xohlagan turdagi ma'lumot qabul qiladi", "Barcha elementlarni tsiklda aylanib chiqish oson"],
      correctAnswer: 1,
      explanation: "Weak bog'lanish obyektning xotiradan tozalanishiga (Garbage Collection) to'sqinlik qilmaydi."
    },
    {
      id: 6,
      question: "Map ichidan ma'lum bir kalit borligini qanday aniqlaymiz?",
      options: ["map.contains(key)", "map.includes(key)", "map.has(key)", "map.exists(key)"],
      correctAnswer: 2,
      explanation: "Map obyektida kalit borligini tekshirish uchun .has() metodidan foydalaniladi."
    },
    {
      id: 7,
      question: "Object kalitlari sifatida massiv ishlatilsa nima bo'ladi?",
      options: ["Xato yuz beradi", "Massiv avtomatik ravishda String ga o'girilib ketadi", "Massiv aslicha kalit bo'ladi", "Faqat birinchi elementi kalit bo'ladi"],
      correctAnswer: 1,
      explanation: "Object kalitlari faqat string yoki symbol bo'lishi mumkin. Massiv stringga (toString) aylanib ketadi."
    },
    {
      id: 8,
      question: "Map da kalit sifatida massiv ishlatsak nima bo'ladi?",
      options: ["Stringga o'giriladi", "Xato yuz beradi", "Massivning o'zi (referensi) kalit sifatida saqlanadi", "Map buni qabul qilmaydi"],
      correctAnswer: 2,
      explanation: "Map har qanday turni aslicha qabul qiladi, shuning uchun massiv reference (manzil) asosida kalit bo'ladi."
    },
    {
      id: 9,
      question: "Qaysi tuzilmani for...of bilan aylanib chiqib bo'lmaydi (iterable emas)?",
      options: ["Map", "Set", "Array", "WeakMap"],
      correctAnswer: 3,
      explanation: "WeakMap va WeakSet iteratorga ega emas, ya'ni ularni for...of bilan aylanib bo'lmaydi."
    },
    {
      id: 10,
      question: "Set ga bitta obyektni ikki marta qo'shsak nima bo'ladi? const obj={}; set.add(obj); set.add(obj);",
      options: ["Set da 2 ta obyekt bo'ladi", "Set da 1 ta obyekt bo'ladi", "Xato beradi", "Eski obyekt o'chib yangisi yoziladi"],
      correctAnswer: 1,
      explanation: "Set o'zgaruvchining referensini tekshiradi, obj ayni bir xil bo'lgani uchun uni bir marta saqlaydi."
    },
    {
      id: 11,
      question: "Quyidagilardan qaysi birining .clear() metodi yo'q?",
      options: ["Map", "Set", "WeakMap", "Ularning barchasida bor"],
      correctAnswer: 2,
      explanation: "WeakMap va WeakSet da barcha elementlarni birdan tozalab tashlaydigan .clear() metodi yo'q."
    },
    {
      id: 12,
      question: "Map dan ma'lumotni qanday o'qiymiz?",
      options: ["map.read('key')", "map['key']", "map.get('key')", "map.value('key')"],
      correctAnswer: 2,
      explanation: "Map obyekti uchun qiymatlarni o'qish asosan .get() metodi orqali amalga oshiriladi."
    }
  ]
};
