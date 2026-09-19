export const mapSetWeak = {
  id: "map-set-weak",
  title: "Map, Set, WeakMap va WeakSet",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)\n\nTasavvur qiling, siz kutubxonachisiz.\n- **Object** bu sizning javoningiz. Unda kitoblarni faqat nomiga qarab taxlaysiz (kalit doim matn bo'ladi).\n- **Map** bu maxsus elektron katalog. Unda siz kitoblarni nafaqat nomi bilan, balki muallifning rasmi, kitobning og'irligi kabi har qanday ma'lumot (object, function, raqam) bilan topishingiz mumkin.\n- **Set** bu klub a'zolari ro'yxati. Bir odam (qiymat) ro'yxatga ikki marta yozila olmaydi, hamma unikal bo'lishi shart.\n- **WeakMap / WeakSet** bu maxsus "maxfiy agentlar" ro'yxati. Agar u odam (object) boshqa joyda yo'qolib qolsa (memory-dan o'chirilsa), u avtomatik ravishda bu ro'yxatdan ham o'chib ketadi. Biz ularni ushlab turolmaymiz.\n\n## 2. 🚀 Chuqur O'rganish (Deep Dive)\n\n### Under the hood & V8 Engine Performance\n- **Map va Object Farqi:** V8 engine (Chrome, Node.js) da oddiy Objectlar Hash Table ko'rinishida ishlaydi, ammo agar siz doimiy ravishda kalit qo'shib va o'chirsangiz, Object sekinlashadi ("dictionary mode" ga o'tadi). Map esa aynan shunday dinamik operasiyalar (add/remove) uchun maxsus optimizatsiya qilingan (odatda xesh-jadvallar va bog'langan ro'yxatlar gibridi yordamida).\n- **Xotira boshqaruvi va Garbage Collection (GC):** Oddiy Map o'z kalitlarini kuchli (strong reference) tarzda ushlab turadi. Ya'ni, map.set(obj, data) qilsangiz, obj ga boshqa hech qayerdan murojaat bo'lmasa ham, GC uni xotiradan tozalay olmaydi.\n- **WeakMap qanday ishlaydi?** WeakMap kalitlariga kuchsiz (weak) murojaat qiladi. Agar kalit bo'lgan obyektdan boshqa hecham havola qolmasa, V8 ning mark-and-sweep Garbage Collector-i keyingi tozalashda uni yo'q qiladi. Shu sababli WeakMap da .keys(), .values(), .size kabi xususiyatlar va metodlar yo'q — chunki GC qachon tozalashini biz oldindan bilmaymiz!\n\n\\\`\\\`\\\`javascript\n// Object - xotira muammosi\nlet user = { name: "Ali" };\nconst userStore = new Map();\nuserStore.set(user, "Aktiv");\n\nuser = null; // Obyekt xotiradan tozalanmaydi, chunki Map uni ushlab turibdi!\n\n// WeakMap - Xavfsiz\nlet admin = { name: "Vali" };\nconst weakStore = new WeakMap();\nweakStore.set(admin, "SuperAdmin");\n\nadmin = null; // Garbage Collector obyekti xotiradan tozalaydi, weakStore dan ham avtomatik o'chadi.\n\\\`\\\`\\\`\n\n## 3. ⚠️ Edge Cases va Senior Interview Savollari\n\n**1-savol: Map da kalit sifatida NaN ishlatsak nima bo'ladi? Object da-chi?**\n*Javob:* Object da kalit "NaN" (string) ga aylanadi. Map esa NaN ni to'g'ri tushunadi. Garchi JavaScript da NaN !== NaN bo'lsa ham, Map uchun ular bir xil deb o'ylanadi (SameValueZero algoritmi). Bitta Map da faqat bitta NaN kaliti bo'lishi mumkin.\n\n**2-savol: Massivdan takrorlangan elementlarni qanday qilib eng tez tozalash mumkin?**\n*Javob:* [...new Set(arr)]. Ammo edge case: agar massivda objectlar bo'lsa ([{a:1}, {a:1}]), Set ularni bir xil deb bilmaydi, chunki ular xotirada turli manzillarda joylashgan (reference type).\n\n**3-savol: WeakSet qachon kerak bo'ladi?**\n*Javob:* DOM elementlari bilan ishlashda. Masalan, biror tugmaga hodisa qo'shilganligini tekshirish uchun uni WeakSet ga solish mumkin. Agar element DOM dan o'chirilsa, xotirada qolib ketmaydi (Memory Leak ning oldi olinadi).\n\n## 4. 📊 Arxitektura va Tuzilma\n\\\`\\\`\\\`mermaid\ngraph TD\n    A[Data Structures] --> B(Map)\n    A --> C(Set)\n    A --> D(WeakMap)\n    A --> E(WeakSet)\n    \n    B --> B1[Key-Value pairs]\n    B --> B2[Keys can be Any Type]\n    \n    C --> C1[Unique Values only]\n    C --> C2[Iterables]\n    \n    D --> D1[Object Keys ONLY]\n    D --> D2[Garbage Collected]\n    D --> D3[Not Iterable]\n    \n    E --> E1[Object Values ONLY]\n    E --> E2[Garbage Collected]\n    E --> E3[Not Iterable]\n\\\`\\\`\\\`\n`,
  exercises: [
    {
      id: 1,
      title: "Unique Array Elementlari",
      instruction: "Berilgan massivdan takrorlanmas elementlarni ajratib oluvchi funksiya yarating.",
      startingCode: "function getUniqueValues(arr) {\n  // kodni yozing\n}",
      hint: "Set obyektidan va spread ... operatoridan foydalaning.",
      solution: "function getUniqueValues(arr) {\n  return [...new Set(arr)];\n}",
      test: "const fn = new Function(code + '; return getUniqueValues;')(); if (JSON.stringify(fn([1, 1, 2, 3])) !== JSON.stringify([1, 2, 3])) throw new Error('Test 1 failed');"
    },
    {
      id: 2,
      title: "Map yordamida lug'at yaratish",
      instruction: "Yangi Map yarating, 'hello' kalitiga 'salom' qiymatini o'rnating va Map obyektini qaytaring.",
      startingCode: "function createDictionary() {\n  // kodni yozing\n}",
      hint: "new Map() va .set() yordam beradi.",
      solution: "function createDictionary() {\n  const map = new Map();\n  map.set('hello', 'salom');\n  return map;\n}",
      test: "const fn = new Function(code + '; return createDictionary;')(); const m = fn(); if (!(m instanceof Map) || m.get('hello') !== 'salom') throw new Error('Test 2 failed');"
    },
    {
      id: 3,
      title: "Map o'lchamini topish",
      instruction: "Map obyektida nechta element borligini qaytaruvchi funksiya yozing.",
      startingCode: "function getMapSize(myMap) {\n  // kodni yozing\n}",
      hint: "Map da uzunlikni o'lchash uchun .size ishlatiladi.",
      solution: "function getMapSize(myMap) {\n  return myMap.size;\n}",
      test: "const fn = new Function(code + '; return getMapSize;')(); const m = new Map(); m.set(1, 1); if (fn(m) !== 1) throw new Error('Test 3 failed');"
    },
    {
      id: 4,
      title: "Set ichida element mavjudligini tekshirish",
      instruction: "Set obyekti va qiymat berilgan. Qiymat Set ichida borligini boolean ko'rinishida qaytaring.",
      startingCode: "function hasValueInSet(mySet, val) {\n  // kodni yozing\n}",
      hint: ".has() metodidan foydalaning.",
      solution: "function hasValueInSet(mySet, val) {\n  return mySet.has(val);\n}",
      test: "const fn = new Function(code + '; return hasValueInSet;')(); const s = new Set([10, 20]); if (!fn(s, 10) || fn(s, 30)) throw new Error('Test 4 failed');"
    },
    {
      id: 5,
      title: "Map dan kalit bo'yicha qiymat o'qish",
      instruction: "Map dan berilgan kalit bo'yicha qiymatni o'qib qaytaruvchi funksiya yozing.",
      startingCode: "function getValue(myMap, key) {\n  // kodni yozing\n}",
      hint: ".get() metodidan foydalaning.",
      solution: "function getValue(myMap, key) {\n  return myMap.get(key);\n}",
      test: "const fn = new Function(code + '; return getValue;')(); const m = new Map(); m.set('x', 99); if (fn(m, 'x') !== 99) throw new Error('Test 5 failed');"
    },
    {
      id: 6,
      title: "Set dan elementni o'chirish",
      instruction: "Berilgan Set dan kiritilgan elementni o'chiring va xuddi shu Set ni qaytaring.",
      startingCode: "function removeValue(mySet, val) {\n  // kodni yozing\n}",
      hint: ".delete() metodini ishlating.",
      solution: "function removeValue(mySet, val) {\n  mySet.delete(val);\n  return mySet;\n}",
      test: "const fn = new Function(code + '; return removeValue;')(); const s = new Set([1, 2]); fn(s, 1); if (s.has(1)) throw new Error('Test 6 failed');"
    },
    {
      id: 7,
      title: "Map ni butunlay tozalash",
      instruction: "Map ni barcha elementlardan tozalab tashlang va uni qaytaring.",
      startingCode: "function clearAll(myMap) {\n  // kodni yozing\n}",
      hint: ".clear() metodidan foydalaning.",
      solution: "function clearAll(myMap) {\n  myMap.clear();\n  return myMap;\n}",
      test: "const fn = new Function(code + '; return clearAll;')(); const m = new Map([[1,2]]); fn(m); if (m.size !== 0) throw new Error('Test 7 failed');"
    },
    {
      id: 8,
      title: "WeakMap ga ma'lumot saqlash",
      instruction: "Yangi WeakMap yarating. Berilgan obyektni (obj) kalit sifatida qilib, 'secret' degan stringni saqlang va WeakMap ni qaytaring.",
      startingCode: "function createWeakStore(obj) {\n  // kodni yozing\n}",
      hint: "new WeakMap() bilan yarating va obj ni kalit qiling.",
      solution: "function createWeakStore(obj) {\n  const wm = new WeakMap();\n  wm.set(obj, 'secret');\n  return wm;\n}",
      test: "const fn = new Function(code + '; return createWeakStore;')(); const o = {}; const wm = fn(o); if (wm.get(o) !== 'secret') throw new Error('Test 8 failed');"
    },
    {
      id: 9,
      title: "Map dagi barcha kalitlarni Array ko'rinishida olish",
      instruction: "Map obyektidagi barcha kalitlarni o'z ichiga olgan massiv qaytaring.",
      startingCode: "function getAllKeys(myMap) {\n  // kodni yozing\n}",
      hint: "Array.from() va myMap.keys() ni qo'llang.",
      solution: "function getAllKeys(myMap) {\n  return Array.from(myMap.keys());\n}",
      test: "const fn = new Function(code + '; return getAllKeys;')(); const m = new Map([['a',1], ['b',2]]); const res = fn(m); if (res.join('') !== 'ab') throw new Error('Test 9 failed');"
    },
    {
      id: 10,
      title: "WeakSet yaratish va obyekt qo'shish",
      instruction: "Yangi WeakSet yarating, unga berilgan obj ni qo'shing va WeakSet ni qaytaring.",
      startingCode: "function buildWeakSet(obj) {\n  // kodni yozing\n}",
      hint: "new WeakSet() va .add() metodidan foydalaning.",
      solution: "function buildWeakSet(obj) {\n  const ws = new WeakSet();\n  ws.add(obj);\n  return ws;\n}",
      test: "const fn = new Function(code + '; return buildWeakSet;')(); const o = {}; const ws = fn(o); if (!ws.has(o)) throw new Error('Test 10 failed');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Map va oddiy Object ning asosiy farqi nimada?",
      options: [
        "Object faqat nomlarni array sifatida saqlaydi",
        "Map kalit sifatida har qanday turdagi qiymatni qabul qila oladi",
        "Map da elementlar tartibi saqlanmaydi",
        "Map faqat stringlarni kalit qiladi"
      ],
      correctAnswer: 1,
      explanation: "Object kalitlari faqat String yoki Symbol bo'lishi mumkin. Map esa obyektdan tortib funksiyagacha har qanday narsani kalit qila oladi."
    },
    {
      id: 2,
      question: "Set to'plamida asosan qanday qoida ishlaydi?",
      options: [
        "Faqat raqamlarni saqlash",
        "Barcha elementlar noyob (unique) bo'lishi kerak",
        "Faqat obyektlarni saqlash mumkin",
        "Elementlar avtomatik ravishda alfavit bo'yicha saralanadi"
      ],
      correctAnswer: 1,
      explanation: "Set to'plamida bir xil qiymat ikki marta mavjud bo'lolmaydi."
    },
    {
      id: 3,
      question: "WeakMap nima maqsadda eng ko'p ishlatiladi?",
      options: [
        "Matnlarni shifrlash uchun",
        "Xotira sizib chiqishining (Memory Leak) oldini olish uchun",
        "Massivlarni tezroq saralash uchun",
        "Ma'lumotlar bazasiga to'g'ridan-to'g'ri bog'lanish uchun"
      ],
      correctAnswer: 1,
      explanation: "WeakMap kalitlarni kuchsiz (weak) bog'lanishda saqlaydi, obyektga boshqa murojaat qolmasa u avtomatik ravishda xotiradan tozalanadi."
    },
    {
      id: 4,
      question: "WeakMap kalit sifatida qanday ma'lumot turlarini qabul qila oladi?",
      options: [
        "Faqat raqamlarni",
        "Faqat obyektlarni",
        "Har qanday qiymatni",
        "Faqat string va booleanlarni"
      ],
      correctAnswer: 1,
      explanation: "WeakMap faqat obyektlarni (va ayrim hollarda ro'yxatdan o'tmagan symbollarni) kalit sifatida qabul qiladi."
    },
    {
      id: 5,
      question: "Map dagi elementlar sonini qanday bilsak bo'ladi?",
      options: [
        "map.length",
        "map.count()",
        "map.size",
        "map.getSize"
      ],
      correctAnswer: 2,
      explanation: "Map da .length emas, .size xususiyati mavjud."
    },
    {
      id: 6,
      question: "Set ichida biror qiymat mavjudligini tezkor tekshirish qaysi metod bilan amalga oshadi?",
      options: [
        "set.includes(val)",
        "set.contains(val)",
        "set.has(val)",
        "set.find(val)"
      ],
      correctAnswer: 2,
      explanation: "Set va Map larda element bor-yo'qligini tekshirish uchun .has() metodi ishlatiladi."
    },
    {
      id: 7,
      question: "Map obyektidagi barcha elementlarni birdan o'chirish uchin nima qilinadi?",
      options: [
        "map.clear()",
        "map.empty()",
        "map.delete()",
        "map = new Map()"
      ],
      correctAnswer: 0,
      explanation: "Map va Set dagi barcha qiymatlarni o'chirish uchun .clear() metodi mavjud."
    },
    {
      id: 8,
      question: "Qaysi to'plam turlarini for...of sikli orqali aylanib chiqib (iterate qilib) bo'lmaydi?",
      options: [
        "Map va Set",
        "Faqat WeakSet",
        "WeakMap va WeakSet",
        "Faqat Set"
      ],
      correctAnswer: 2,
      explanation: "WeakMap va WeakSet da iteration (aylanib chiqish) va ularning kalitlarini ro'yxatini olish (.keys()) imkoniyati yo'q, chunki elementlar har lahzada Garbage Collector tomonidan o'chirilishi mumkin."
    },
    {
      id: 9,
      question: "Map da NaN ni kalit sifatida ishlatsak nima bo'ladi?",
      options: [
        "Syntax error yuz beradi",
        "Ikkita NaN xilma xil hisoblanib, ko'p qatlamli bo'lib ketadi",
        "Map SameValueZero algoritmini ishlatgani uchun faqat bitta NaN kalit bo'la oladi",
        "NaN string ga o'zgaradi"
      ],
      correctAnswer: 2,
      explanation: "JavaScript da odatda NaN === NaN false bo'lsa-da, Map ular bir xil qiymat deb taniydi va faqat bir marta yozadi."
    },
    {
      id: 10,
      question: "WeakMap da mavjud bo'lmagan metodni toping:",
      options: [
        "get",
        "set",
        "delete",
        "clear"
      ],
      correctAnswer: 3,
      explanation: "WeakMap da .clear() metodi yo'q."
    },
    {
      id: 11,
      question: "Obyekt kalitlarida qanday tur ishlatilishi xato yozilishlarga olib kelishi mumkin (lekin Map da emas)?",
      options: [
        "String",
        "Symbol",
        "Massiv",
        "Bo'sh string"
      ],
      correctAnswer: 2,
      explanation: "Oddiy obyekt kalitiga massiv kiritilsa, u avtomatik ravishda yozuvga (string) o'giriladi, Map esa massivning o'zini referens shaklida saqlay oladi."
    },
    {
      id: 12,
      question: "Set ga bitta obyektning nusxasini ikki xil o'zgaruvchidan bersak qanday natija chiqadi? (masalan a={x:1}, b={x:1})",
      options: [
        "Set ular aynan bir xil tuzilishga ega bo'lgani uchun bittasini o'chiradi",
        "Ikkalasi ham qo'shiladi, chunki ularning xotiradagi manzillari (reference) turlicha",
        "Set faqat raqamlarni qabul qiladi, error qaytaradi",
        "Avtomatik tarzda JSON.stringify() dan o'tkazadi"
      ],
      correctAnswer: 1,
      explanation: "Obyektlarning ichki xossalari o'xshash bo'lsa-da, ular xotirada turli joylarda turadi (reference types). Shuning uchun Set ikkalasini alohida qiymat sifatida saqlaydi."
    }
  ]
};
