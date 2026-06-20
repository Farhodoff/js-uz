export const objectChallenges = {
  title: "Object (Obyekt) Masalalari",
  content: `
Obyektlar — JavaScript dagi eng muhim tuzilmalardandir. Ushbu masalalar orqali siz obyekt ichidan ma'lumot izlash, kalitlar va qiymatlar ustida amallar bajarish va ma'lumotlarni guruhlash kabi operatsiyalarni mashq qilasiz.
`,
  exercises: [
    {
      id: "obj-chal-1",
      title: "Bo'sh obyektni tekshirish",
      description: "Berilgan obyekt bo'sh (ichida hech qanday property yo'q) ekanligini aniqlovchi `isEmptyObject(obj)` funksiyasini yozing.",
      initialCode: "function isEmptyObject(obj) {\n  // kodni yozing\n}",
      solution: "function isEmptyObject(obj) {\n  return Object.keys(obj).length === 0;\n}",
      tests: [
        { test: "return isEmptyObject({}) === true;", description: "{} uchun true qaytishi kerak" },
        { test: "return isEmptyObject({ a: 1 }) === false;", description: "Bo'sh bo'lmasa false qaytishi kerak" }
      ]
    },
    {
      id: "obj-chal-2",
      title: "Obyekt kalitlari (Keys)",
      description: "Berilgan obyektning barcha kalitlarini (keys) massiv ko'rinishida qaytaruvchi `getObjectKeys(obj)` funksiyasini yozing.",
      initialCode: "function getObjectKeys(obj) {\n  // kodni yozing\n}",
      solution: "function getObjectKeys(obj) {\n  return Object.keys(obj);\n}",
      tests: [
        { test: "return getObjectKeys({name: 'Ali', age: 20}).join(',') === 'name,age';", description: "['name', 'age'] qaytishi kerak" }
      ]
    },
    {
      id: "obj-chal-3",
      title: "Obyekt qiymatlari (Values)",
      description: "Berilgan obyektning barcha qiymatlarini (values) massiv ko'rinishida qaytaruvchi `getObjectValues(obj)` funksiyasini yozing.",
      initialCode: "function getObjectValues(obj) {\n  // kodni yozing\n}",
      solution: "function getObjectValues(obj) {\n  return Object.values(obj);\n}",
      tests: [
        { test: "return getObjectValues({name: 'Ali', age: 20}).join(',') === 'Ali,20';", description: "['Ali', 20] qaytishi kerak" }
      ]
    },
    {
      id: "obj-chal-4",
      title: "Obyektlar birlashmasi (Merge)",
      description: "Ikkita obyekt qabul qilib, ularning xususiyatlarini yagona obyektda birlashtiruvchi `mergeObjects(obj1, obj2)` funksiyasini yozing.",
      initialCode: "function mergeObjects(obj1, obj2) {\n  // kodni yozing\n}",
      solution: "function mergeObjects(obj1, obj2) {\n  return { ...obj1, ...obj2 };\n}",
      tests: [
        { test: "return mergeObjects({a: 1}, {b: 2}).b === 2;", description: "Natija {a:1, b:2} bo'lishi kerak" }
      ]
    },
    {
      id: "obj-chal-5",
      title: "Propertini o'chirish",
      description: "Berilgan obyekt ichidan ko'rsatilgan `key` (kalit) li propertini o'chirib, o'zgargan obyektni qaytaruvchi `removeProperty(obj, key)` funksiyasini tuzing.",
      initialCode: "function removeProperty(obj, key) {\n  // kodni yozing\n}",
      solution: "function removeProperty(obj, key) {\n  const newObj = {...obj};\n  delete newObj[key];\n  return newObj;\n}",
      tests: [
        { test: "const res = removeProperty({name: 'A', age: 2}, 'age'); return res.age === undefined && res.name === 'A';", description: "'age' o'chirilishi kerak" }
      ]
    },
    {
      id: "obj-chal-6",
      title: "Property mavjudligini tekshirish",
      description: "Obyektda kiritilgan `key` nomli xususiyat bor-yo'qligini tekshirib true/false qaytaruvchi `hasKey(obj, key)` funksiyasini yozing.",
      initialCode: "function hasKey(obj, key) {\n  // kodni yozing\n}",
      solution: "function hasKey(obj, key) {\n  return key in obj;\n}",
      tests: [
        { test: "return hasKey({a: 1}, 'a') === true;", description: "'a' mavjud" },
        { test: "return hasKey({a: 1}, 'b') === false;", description: "'b' mavjud emas" }
      ]
    },
    {
      id: "obj-chal-7",
      title: "Nusxa ko'chirish (Clone)",
      description: "Berilgan obyektning sayoz nusxasini (shallow clone) yaratib qaytaruvchi `cloneObject(obj)` funksiyasini yozing (Spread operatordan foydalaning).",
      initialCode: "function cloneObject(obj) {\n  // kodni yozing\n}",
      solution: "function cloneObject(obj) {\n  return { ...obj };\n}",
      tests: [
        { test: "const o = {a: 1}; const c = cloneObject(o); c.a = 2; return o.a === 1 && c.a === 2;", description: "Asl obyekt o'zgarmasligi kerak" }
      ]
    },
    {
      id: "obj-chal-8",
      title: "Qiymatlar yig'indisi",
      description: "Barcha xususiyatlari faqat sonlardan iborat bo'lgan obyekt berilgan. Shu sonlar yig'indisini qaytaruvchi `sumObjectValues(obj)` funksiyasini yozing.",
      initialCode: "function sumObjectValues(obj) {\n  // kodni yozing\n}",
      solution: "function sumObjectValues(obj) {\n  return Object.values(obj).reduce((sum, val) => sum + val, 0);\n}",
      tests: [
        { test: "return sumObjectValues({ a: 10, b: 20, c: 30 }) === 60;", description: "Yig'indi 60 chiqishi kerak" }
      ]
    },
    {
      id: "obj-chal-9",
      title: "Obyektni muzlatish (Freeze)",
      description: "Berilgan obyektga hech qanday xususiyat qo'shib, o'zgartirib yoki o'chirib bo'lmaydigan qilib muzlatuvchi va uni qaytaruvchi `freezeObject(obj)` funksiyasini yozing.",
      initialCode: "function freezeObject(obj) {\n  // kodni yozing\n}",
      solution: "function freezeObject(obj) {\n  return Object.freeze(obj);\n}",
      tests: [
        { test: "const obj = freezeObject({a:1}); try { obj.a = 2; } catch(e){} return Object.isFrozen(obj) && obj.a === 1;", description: "Obyekt muzlatilishi kerak" }
      ]
    },
    {
      id: "obj-chal-10",
      title: "Massivdan Obyekt yaratish",
      description: "Ikki o'lchamli massiv berilgan (masalan: `[['a', 1], ['b', 2]]`). Buni obyektga aylantiruvchi (`{a: 1, b: 2}`) `arrayToObject(arr)` funksiyasini yozing.",
      initialCode: "function arrayToObject(arr) {\n  // kodni yozing\n}",
      solution: "function arrayToObject(arr) {\n  return Object.fromEntries(arr);\n}",
      tests: [
        { test: "return arrayToObject([['key1', 'val1'], ['key2', 2]]).key1 === 'val1';", description: "Massiv to'g'ri obyektga aylanishi kerak" }
      ]
    },
    {
      id: "obj-chal-11",
      title: "Obyektdan Massivga",
      description: "Obyekt berilgan (masalan `{a: 1}`). Buni `[['a', 1]]` formatiga o'tkazuvchi `objectToArray(obj)` funksiyasini yozing.",
      initialCode: "function objectToArray(obj) {\n  // kodni yozing\n}",
      solution: "function objectToArray(obj) {\n  return Object.entries(obj);\n}",
      tests: [
        { test: "return objectToArray({a: 1})[0][0] === 'a';", description: "To'g'ri formatga o'tkazilishi kerak" }
      ]
    },
    {
      id: "obj-chal-12",
      title: "Obyektlarning o'zaro tengligi",
      description: "Ikkita oddiy obyekt (bir qavatli) qabul qilib, ularning xususiyatlari va qiymatlari bir xil ekanligini aniqlovchi `isEqualObjects(obj1, obj2)` funksiyasini yozing.",
      initialCode: "function isEqualObjects(obj1, obj2) {\n  // kodni yozing\n}",
      solution: "function isEqualObjects(obj1, obj2) {\n  const keys1 = Object.keys(obj1);\n  const keys2 = Object.keys(obj2);\n  if (keys1.length !== keys2.length) return false;\n  for (let key of keys1) {\n    if (obj1[key] !== obj2[key]) return false;\n  }\n  return true;\n}",
      tests: [
        { test: "return isEqualObjects({a:1, b:2}, {b:2, a:1}) === true;", description: "Kalitlari joylashuvi farqli bo'lsa ham true bo'lishi kerak" },
        { test: "return isEqualObjects({a:1}, {a:2}) === false;", description: "Qiymati farqli bo'lsa false" }
      ]
    },
    {
      id: "obj-chal-13",
      title: "Satr belgilari chastotasi",
      description: "Berilgan matndagi (string) har bir harf/belgi necha marta takrorlanganini obyekt ko'rinishida qaytaruvchi `charFrequency(str)` funksiyasini yozing (masalan, 'aba' -> `{a: 2, b: 1}`).",
      initialCode: "function charFrequency(str) {\n  // kodni yozing\n}",
      solution: "function charFrequency(str) {\n  const freq = {};\n  for(let char of str) {\n    freq[char] = (freq[char] || 0) + 1;\n  }\n  return freq;\n}",
      tests: [
        { test: "return charFrequency('aba').a === 2 && charFrequency('aba').b === 1;", description: "Chastota to'g'ri bo'lishi kerak" }
      ]
    },
    {
      id: "obj-chal-14",
      title: "Qiymati bo'yicha filter",
      description: "Berilgan obyekt ichidan faqat `typeof` 'string' bo'lgan propertylarni ajratib, yangi obyekt qilib qaytaruvchi `filterStringValues(obj)` funksiyasini yozing.",
      initialCode: "function filterStringValues(obj) {\n  // kodni yozing\n}",
      solution: "function filterStringValues(obj) {\n  const result = {};\n  for(let key in obj) {\n    if(typeof obj[key] === 'string') result[key] = obj[key];\n  }\n  return result;\n}",
      tests: [
        { test: "const res = filterStringValues({a: 1, b: 'hi'}); return res.b === 'hi' && !res.a;", description: "Faqat string tiplilar olinishi kerak" }
      ]
    },
    {
      id: "obj-chal-15",
      title: "Nested propertini xavfsiz olish",
      description: "Obyekt qabul qilib, uning `obj.user.address.city` qismi mavjud bo'lsa uni qaytaruvchi, mavjud bo'lmasa `'Unknown'` qaytaruvchi `getCity(obj)` funksiyasini yozing (Optional Chaining - `?.` ishlating).",
      initialCode: "function getCity(obj) {\n  // kodni yozing\n}",
      solution: "function getCity(obj) {\n  return obj?.user?.address?.city || 'Unknown';\n}",
      tests: [
        { test: "return getCity({user: {address: {city: 'Tashkent'}}}) === 'Tashkent';", description: "Tashkent qaytishi kerak" },
        { test: "return getCity({user: {}}) === 'Unknown';", description: "Xato bermay 'Unknown' qaytishi kerak" }
      ]
    },
    {
      id: "obj-chal-16",
      title: "Kalit va qiymat o'rnini almashtirish",
      description: "Obyektning kalitlari va qiymatlari o'rnini almashtirib yangi obyekt qilib qaytaruvchi `invertObject(obj)` funksiyasini tuzing (Masalan: `{a: 'b'} -> {b: 'a'}`).",
      initialCode: "function invertObject(obj) {\n  // kodni yozing\n}",
      solution: "function invertObject(obj) {\n  const res = {};\n  for(let key in obj) {\n    res[obj[key]] = key;\n  }\n  return res;\n}",
      tests: [
        { test: "return invertObject({name: 'ali'}).ali === 'name';", description: "To'g'ri o'rin almashishi kerak" }
      ]
    },
    {
      id: "obj-chal-17",
      title: "Xususiyatlarni qo'shish xavfsizligi",
      description: "Agar obyektdan belgilangan `key` mavjud bo'lmasa, uni `value` qilib qo'shuvchi, agar mavjud bo'lsa o'zgartirmaydigan `addIfNotExists(obj, key, value)` funksiyasini yozing.",
      initialCode: "function addIfNotExists(obj, key, value) {\n  // kodni yozing\n}",
      solution: "function addIfNotExists(obj, key, value) {\n  if(!(key in obj)) {\n    obj[key] = value;\n  }\n  return obj;\n}",
      tests: [
        { test: "const o = {a: 1}; addIfNotExists(o, 'a', 2); return o.a === 1;", description: "Mavjud bo'lsa o'zgarmaydi" },
        { test: "const o = {a: 1}; addIfNotExists(o, 'b', 2); return o.b === 2;", description: "Mavjud bo'lmasa qo'shiladi" }
      ]
    },
    {
      id: "obj-chal-18",
      title: "Ko'p obyektlarni birlashtirish",
      description: "Massiv ichidagi barcha obyektlarni bitta obyekt qilib birlashtiruvchi `mergeAll(arr)` funksiyasini yozing (masalan: `[{a:1}, {b:2}] -> {a:1, b:2}`). Object.assign ishlating.",
      initialCode: "function mergeAll(arr) {\n  // kodni yozing\n}",
      solution: "function mergeAll(arr) {\n  return Object.assign({}, ...arr);\n}",
      tests: [
        { test: "return mergeAll([{a: 1}, {b: 2}]).a === 1 && mergeAll([{a: 1}, {b: 2}]).b === 2;", description: "Hamma xususiyatlar jamlanishi kerak" }
      ]
    },
    {
      id: "obj-chal-19",
      title: "Ma'lumotlar bilan boyitish",
      description: "User obyekti berilgan, u erga doimiy tarzda `isActive: true` va `createdAt: 2026` ni qo'shib, yangi obyekt ko'rinishida qaytaruvchi `enrichUser(user)` funksiyasini yozing.",
      initialCode: "function enrichUser(user) {\n  // kodni yozing\n}",
      solution: "function enrichUser(user) {\n  return { ...user, isActive: true, createdAt: 2026 };\n}",
      tests: [
        { test: "const res = enrichUser({name: 'A'}); return res.name === 'A' && res.isActive === true;", description: "Obyekt yangi qiymatlar bilan to'lishi kerak" }
      ]
    },
    {
      id: "obj-chal-20",
      title: "Kalit nomlarini o'zgartirish",
      description: "Obyekt kalitlarining barchasini katta harflarga (uppercase) o'zgartirib yangi obyekt qilib qaytaradigan `uppercaseKeys(obj)` funksiyasini yozing.",
      initialCode: "function uppercaseKeys(obj) {\n  // kodni yozing\n}",
      solution: "function uppercaseKeys(obj) {\n  const res = {};\n  for(let key in obj) {\n    res[key.toUpperCase()] = obj[key];\n  }\n  return res;\n}",
      tests: [
        { test: "return uppercaseKeys({name: 'Ali'}).NAME === 'Ali';", description: "NAME kaliti mavjud bo'lishi kerak" }
      ]
    }
  ]
};
