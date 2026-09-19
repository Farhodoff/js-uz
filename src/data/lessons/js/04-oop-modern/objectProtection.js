export const objectProtection = {
  id: "object-protection",
  title: "Obyektlarni Himoyalash: Freeze va Seal",
  theory: `
Obyektlarni himoyalash - bu obyektlarning noto'g'ri o'zgartirilishi yoki xavfsizlik muammolarining oldini olish usulidir. JavaScriptda obyektlarni himoyalashning 3 xil darajasi mavjud.

### 1-qism: Boshlang'ich Tushuntirish (Hayotiy o'xshatish)

Tasavvur qiling, sizda bir quti (obyekt) va uning ichida hujjatlar (xususiyatlar) bor.
- **preventExtensions**: Qutiga yangi hujjat solish mumkin emas, lekin ichidagilarni o'zgartirish yoki olib tashlash mumkin. (Yangi xususiyat qo'shib bo'lmaydi).
- **seal (muhrlash)**: Quti muhrlangan. Unga na yangi hujjat solish mumkin, na ichidagilarni olib tashlash. Lekin ichidagi hujjatlarning ustiga yozish (o'zgartirish) ruxsat etiladi.
- **freeze (muzlatish)**: Quti muzlatilgan. Unga hech narsa qo'shib bo'lmaydi, olib tashlab bo'lmaydi va o'zgartirib bo'lmaydi. Bu qutini faqat o'qish mumkin.

### 2-qism: Chuqurlashtirilgan o'rganish (Deep Dive)

JavaScriptda obyektlarning himoya darajasini boshqaradigan maxsus metodlar mavjud:
1. **Object.preventExtensions(obj)**: Obyektga yangi xususiyat qo'shishni to'xtatadi. Uni \\\`Object.isExtensible(obj)\\\` orqali tekshirish mumkin.
2. **Object.seal(obj)**: Obyektni kengaytirishni to'xtatadi va barcha mavjud xususiyatlarni konfiguratsiya qilib bo'lmaydigan holatga (\\\`configurable: false\\\`) keltiradi. \\\`Object.isSealed(obj)\\\` bilan tekshiriladi.
3. **Object.freeze(obj)**: Eng yuqori daraja. Obyektning barcha xususiyatlarini o'zgartirib bo'lmaydigan (\\\`writable: false\\\`) va konfiguratsiya qilib bo'lmaydigan (\\\`configurable: false\\\`) qiladi. \\\`Object.isFrozen(obj)\\\` orqali tekshiriladi.

**Xotira va Immutability (O'zgarmaslik)**:
Obyektni \\\`freeze\\\` qilish uni C++ kabi tillardagidek to'liq xotira sathida "read-only" qilmaydi, balki JavaScript dvigateli yozish amallarini inkor qiladi (strict rejimda xato beradi). 
Buning ustiga, bu **Shallow (Yuza) Freeze** hisoblanadi. Agar obyekt ichida boshqa ichki obyekt yoki massiv bo'lsa, o'sha ichki obyekt muzlamaydi! Uni to'liq muzlatish uchun **Deep Freeze** yozish talab etiladi.

\\\`\\\`\\\`javascript
// Deep Freeze funksiyasiga misol
function deepFreeze(obj) {
  Object.keys(obj).forEach(name => {
    const prop = obj[name];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}
\\\`\\\`\\\`

### 3-qism: Chekka holatlar va Senior darajasidagi intervyu savollari (Edge Cases)

**Savol 1:** \\\`Object.freeze()\\\` va \\\`const\\\` ning farqi nima?
**Javob:** \\\`const\\\` o'zgaruvchining manzilini (reference) o'zgartirishni taqiqlaydi, lekin obyekt ichidagi qiymatlarni o'zgartirishga to'sqinlik qilmaydi. \\\`Object.freeze\\\` esa obyektning o'zini o'zgartirishni to'xtatadi, lekin referens o'zgarishiga aralashmaydi (agar u \\\`let\\\` bo'lsa).

**Savol 2:** Muzlatilgan obyektning prototipini o'zgartirish mumkinmi?
**Javob:** Yo'q, \\\`Object.freeze()\\\` qilingan obyektning prototipini ham o'zgartirib bo'lmaydi (\\\`Object.setPrototypeOf\\\` xato beradi).

**Savol 3:** Massivni muzlatish mumkinmi?
**Javob:** Ha, massivlar ham obyektdir. Muzlatilgan massivga \\\`push\\\` qilsangiz yoki elementini o'zgartirmoqchi bo'lsangiz \\\`TypeError\\\` olasiz.

### Vizual ketma-ketlik (Mermaid Diagram)

\\\`\\\`\\\`mermaid
graph TD;
    A[Obyekt] -->|Object.preventExtensions| B[Yangi property qo'shib bo'lmaydi];
    B -->|Object.seal| C[Property o'chirib bo'lmaydi];
    C -->|Object.freeze| D[Property o'zgartirib bo'lmaydi];
    D --> E[Obyekt to'liq Immutable];
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: "protect-ex-1",
      title: "Muzlatish (Freeze)",
      description: "Berilgan obyektni to'liq muzlatib (freeze) qaytaruvchi funksiya yozing.",
      initialCode: "function freezeObj(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function freezeObj(obj) {\n  return Object.freeze(obj);\n}",
      tests: [
        {
          test: "\n            const obj = {a: 1};\n            freezeObj(obj);\n            return Object.isFrozen(obj) === true;\n          ",
          description: "Obyekt muzlatilgan bo'lishi kerak (Object.isFrozen)"
        }
      ]
    },
    {
      id: "protect-ex-2",
      title: "Muhrlash (Seal)",
      description: "Berilgan obyektni muhrlovchi (seal) funksiya yozing. Obyekt seal qilinganligini tekshirish uchun u o'sha obyektni qaytarishi kerak.",
      initialCode: "function sealObj(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function sealObj(obj) {\n  return Object.seal(obj);\n}",
      tests: [
        {
          test: "\n            const obj = {x: 10};\n            sealObj(obj);\n            return Object.isSealed(obj) === true;\n          ",
          description: "Obyekt muhrlangan bo'lishi kerak (Object.isSealed)"
        }
      ]
    },
    {
      id: "protect-ex-3",
      title: "Kengaytirishni taqiqlash",
      description: "Berilgan obyektga yangi xususiyat qo'shishni taqiqlovchi (preventExtensions) funksiya yozing.",
      initialCode: "function noExtensions(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function noExtensions(obj) {\n  return Object.preventExtensions(obj);\n}",
      tests: [
        {
          test: "\n            const obj = {y: 5};\n            noExtensions(obj);\n            return Object.isExtensible(obj) === false;\n          ",
          description: "Obyektni kengaytirib bo'lmaydigan holatga kelishi kerak"
        }
      ]
    },
    {
      id: "protect-ex-4",
      title: "Muzlatilganligini tekshirish",
      description: "Funksiya obyekt qabul qiladi. Agar u muzlatilgan bo'lsa true, aks holda false qaytarsin.",
      initialCode: "function isItFrozen(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function isItFrozen(obj) {\n  return Object.isFrozen(obj);\n}",
      tests: [
        {
          test: "\n            return isItFrozen(Object.freeze({})) === true && isItFrozen({}) === false;\n          ",
          description: "Obyekt muzlatilganini to'g'ri aniqlashi kerak"
        }
      ]
    },
    {
      id: "protect-ex-5",
      title: "Muhrlanganligini tekshirish",
      description: "Funksiya obyekt qabul qiladi va u muhrlanganligini tekshirib mantiqiy qiymat qaytaradi.",
      initialCode: "function isItSealed(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function isItSealed(obj) {\n  return Object.isSealed(obj);\n}",
      tests: [
        {
          test: "\n            return isItSealed(Object.seal({})) === true && isItSealed({}) === false;\n          ",
          description: "Obyekt muhrlanganligini to'g'ri aniqlashi kerak"
        }
      ]
    },
    {
      id: "protect-ex-6",
      title: "Kengaytirishni tekshirish",
      description: "Funksiya obyektni qabul qiladi. Agar obyektga yangi xususiyat qo'shish MUMKIN bo'lsa true, aks holda false qaytaradi.",
      initialCode: "function isItExtensible(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function isItExtensible(obj) {\n  return Object.isExtensible(obj);\n}",
      tests: [
        {
          test: "\n            return isItExtensible({}) === true && isItExtensible(Object.preventExtensions({})) === false;\n          ",
          description: "Obyektga yangi xususiyat qo'shish mumkinligini to'g'ri aniqlashi kerak"
        }
      ]
    },
    {
      id: "protect-ex-7",
      title: "Obyektlarni ehtiyotkorlik bilan o'zgartirish",
      description: "Berilgan obyektga faqat agar u muzlatilmagan bo'lsa 'updated' degan kalit (qiymati true) qo'shing va obyektni qaytaring. Agar muzlatilgan bo'lsa, xuddi o'zini o'zgarishsiz qaytaring.",
      initialCode: "function safeUpdate(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function safeUpdate(obj) {\n  if(!Object.isFrozen(obj)) {\n    obj.updated = true;\n  }\n  return obj;\n}",
      tests: [
        {
          test: "\n            const obj1 = {a: 1};\n            const obj2 = Object.freeze({b: 2});\n            safeUpdate(obj1);\n            try { safeUpdate(obj2); } catch(e) {}\n            return obj1.updated === true && obj2.updated === undefined;\n          ",
          description: "Faqat muzlatilmagan obyektlarga qiymat qo'shilishi kerak"
        }
      ]
    },
    {
      id: "protect-ex-8",
      title: "Deep Freeze tayyorgarlik",
      description: "Obyekt berilgan. Uning barcha to'g'ridan-to'g'ri kalitlarini aylanib, agar qiymati obyekt bo'lsa, o'sha ichki obyektni muzlating (Object.freeze). Funksiya obyektni qaytarsin.",
      initialCode: "function shallowInnerFreeze(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function shallowInnerFreeze(obj) {\n  for(let key in obj) {\n    if(typeof obj[key] === 'object' && obj[key] !== null) {\n      Object.freeze(obj[key]);\n    }\n  }\n  return obj;\n}",
      tests: [
        {
          test: "\n            const o = { inner: { a: 1 }, num: 2 };\n            shallowInnerFreeze(o);\n            return Object.isFrozen(o.inner) === true && Object.isFrozen(o) === false;\n          ",
          description: "Ichki obyektlar muzlatilishi, tashqisi esa ochiq qolishi kerak"
        }
      ]
    },
    {
      id: "protect-ex-9",
      title: "Barchasini himoyalash",
      description: "Sizga 3 ta obyekt massivi beriladi. Ularning birinchisini preventExtensions qiling, ikkinchisini seal qiling, uchinchisini freeze qiling. So'ngra massivni qaytaring.",
      initialCode: "function protectAll(arr) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function protectAll(arr) {\n  if(arr[0]) Object.preventExtensions(arr[0]);\n  if(arr[1]) Object.seal(arr[1]);\n  if(arr[2]) Object.freeze(arr[2]);\n  return arr;\n}",
      tests: [
        {
          test: "\n            const a = [{}, {}, {}];\n            protectAll(a);\n            return Object.isExtensible(a[0])===false && Object.isSealed(a[1])===true && Object.isFrozen(a[2])===true;\n          ",
          description: "Uchta obyekt kerakli darajada himoyalanishi kerak"
        }
      ]
    },
    {
      id: "protect-ex-10",
      title: "Mukammal deep freeze (Rekursiv)",
      description: "Funksiya obyektdagi barcha ichki obyektlarni ham to'liq muzlatuvchi rekursiv deepFreeze amalini bajarsin va muzlatilgan obyektni qaytarsin.",
      initialCode: "function deepFreeze(obj) {\n  // kodingizni bu yerga yozing\n}",
      solution: "function deepFreeze(obj) {\n  Object.keys(obj).forEach(name => {\n    const prop = obj[name];\n    if (typeof prop === 'object' && prop !== null) {\n      deepFreeze(prop);\n    }\n  });\n  return Object.freeze(obj);\n}",
      tests: [
        {
          test: "\n            const obj = { a: { b: { c: 1 } } };\n            deepFreeze(obj);\n            return Object.isFrozen(obj) && Object.isFrozen(obj.a) && Object.isFrozen(obj.a.b);\n          ",
          description: "Barcha darajadagi obyektlar muzlatilgan bo'lishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "protect-quiz-1",
      question: "Object.freeze() qilingan obyekt bilan nima qilish mumkin?",
      options: [
        "Faqat o'qish (Read-only)",
        "Yangi xususiyat qo'shish",
        "Mavjud xususiyatni o'chirish",
        "Mavjud xususiyat qiymatini o'zgartirish"
      ],
      correctAnswer: "Faqat o'qish (Read-only)",
      explanation: "Muzlatilgan obyektni faqat o'qish mumkin, o'zgartirish, o'chirish yoki yangi xususiyat qo'shish taqiqlanadi."
    },
    {
      id: "protect-quiz-2",
      question: "Object.seal(obj) qilinganda quyidagilardan qaysi biri RUXSAT etiladi?",
      options: [
        "Mavjud xususiyatning qiymatini o'zgartirish",
        "Yangi xususiyat qo'shish",
        "Mavjud xususiyatni o'chirish",
        "Xususiyatlarni configurable: true qilish"
      ],
      correctAnswer: "Mavjud xususiyatning qiymatini o'zgartirish",
      explanation: "Muhrlangan (seal) obyektda xususiyat qo'shish yoki o'chirish taqiqlanadi, biroq ularning qiymatini o'zgartirish mumkin."
    },
    {
      id: "protect-quiz-3",
      question: "Object.preventExtensions nima qiladi?",
      options: [
        "Obyektga yangi xususiyat qo'shishni taqiqlaydi",
        "Obyektni butunlay o'chirishdan saqlaydi",
        "Mavjud xususiyatlarni muzlatadi",
        "Obyektning nusxasini oladi"
      ],
      correctAnswer: "Obyektga yangi xususiyat qo'shishni taqiqlaydi",
      explanation: "Ushbu metod faqatgina obyektning kengayishini, ya'ni yangi xususiyat qo'shilishini to'xtatadi."
    },
    {
      id: "protect-quiz-4",
      question: "Obyekt to'liq muzlatilganligini tekshirish uchun qaysi metod ishlatiladi?",
      options: [
        "Object.isFrozen()",
        "Object.isSealed()",
        "Object.isExtensible()",
        "Object.checkFreeze()"
      ],
      correctAnswer: "Object.isFrozen()",
      explanation: "Object.isFrozen() obyekt muzlatilgan bo'lsa true qaytaradi."
    },
    {
      id: "protect-quiz-5",
      question: "Agar obyekt freeze qilingan bo'lsa, Object.isSealed(obj) qanday natija beradi?",
      options: [
        "true",
        "false",
        "undefined",
        "Xato (Error) beradi"
      ],
      correctAnswer: "true",
      explanation: "Muzlatilgan (freeze) obyekt avtomatik ravishda muhrlangan (seal) talablariga ham javob beradi (ya'ni unga yangi xususiyat qo'shib va o'chirib bo'lmaydi)."
    },
    {
      id: "protect-quiz-6",
      question: "Muzlatilgan (frozen) obyekt ichidagi boshqa obyekt (nested object) o'zgartirilishi mumkinmi?",
      options: [
        "Ha, chunki freeze faqat shallow (yuza) darajada ishlaydi",
        "Yo'q, u avtomatik ravishda to'liq muzlaydi",
        "Ha, lekin faqat massiv bo'lsa",
        "Yo'q, buni JavaScript xato deb qabul qiladi"
      ],
      correctAnswer: "Ha, chunki freeze faqat shallow (yuza) darajada ishlaydi",
      explanation: "Object.freeze() ichki obyektlarga ta'sir qilmaydi, buni Shallow Freeze deyiladi."
    },
    {
      id: "protect-quiz-7",
      question: "Massivlarni (Array) Object.freeze() orqali muzlatish mumkinmi?",
      options: [
        "Ha, massivlar ham obyektdir va ularni muzlatish mumkin",
        "Yo'q, faqat obyektlarni muzlatish mumkin",
        "Ha, lekin uni faqat o'qish va push qilish mumkin",
        "Yo'q, massivlar uchun alohida Array.freeze() bor"
      ],
      correctAnswer: "Ha, massivlar ham obyektdir va ularni muzlatish mumkin",
      explanation: "JavaScript-da massivlar ham obyekt hisoblanadi, Object.freeze() massivlarni ham o'zgartirishdan to'liq himoya qiladi."
    },
    {
      id: "protect-quiz-8",
      question: "Object.preventExtensions() qilingan obyektda isExtensible() qanday qiymat qaytaradi?",
      options: [
        "false",
        "true",
        "null",
        "undefined"
      ],
      correctAnswer: "false",
      explanation: "Obyekt kengayishdan to'xtatilganligi uchun isExtensible false qaytaradi."
    },
    {
      id: "protect-quiz-9",
      question: "const bilan e'lon qilingan obyekt va Object.freeze() qilingan obyekt o'rtasidagi asosiy farq nima?",
      options: [
        "const o'zgaruvchi referensini taqiqlaydi, freeze esa qiymatlar o'zgarishini taqiqlaydi",
        "Ikkalasi ham bir xil ishlaydi",
        "const qiymatni, freeze referensni himoyalaydi",
        "const faqat string va number uchun ishlaydi"
      ],
      correctAnswer: "const o'zgaruvchi referensini taqiqlaydi, freeze esa qiymatlar o'zgarishini taqiqlaydi",
      explanation: "const orqali yaratilgan obyektga boshqa qiymat (yangi obyekt) tenglash taqiqlanadi, lekin ichidagi propertylar o'zgarishi mumkin. freeze esa aynan ichidagi propertylarni himoyalaydi."
    },
    {
      id: "protect-quiz-10",
      question: "deepFreeze nima maqsadda ishlatiladi?",
      options: [
        "Barcha ichki obyektlarni ham rekursiv muzlatish uchun",
        "Obyektni xotiradan butunlay o'chirish uchun",
        "Faqat massivlarni muzlatish uchun",
        "Obyektni serverga yuborish uchun"
      ],
      correctAnswer: "Barcha ichki obyektlarni ham rekursiv muzlatish uchun",
      explanation: "Shallow freeze tufayli ichki obyektlar muzlamay qoladi, shuning uchun deepFreeze yozilib ularni ham muzlatish ta'minlanadi."
    },
    {
      id: "protect-quiz-11",
      question: "Muzlatilgan obyektning prototipini o'zgartirish (Object.setPrototypeOf) mumkinmi?",
      options: [
        "Yo'q, xato beradi (TypeError)",
        "Ha, prototip obyektga bog'liq emas",
        "Ha, faqat strict rejim bo'lmasa",
        "Yo'q, chunki JavaScript-da prototiplar bo'lmaydi"
      ],
      correctAnswer: "Yo'q, xato beradi (TypeError)",
      explanation: "Object.freeze() qilingan obyektning nafaqat xususiyatlari, balki uning prototipi ham qulflanadi va o'zgartirishga yo'l qo'yilmaydi."
    },
    {
      id: "protect-quiz-12",
      question: "Obyektni 'seal' qilsak, uning barcha xususiyatlari orqa fonda qaysi holatga o'tadi?",
      options: [
        "configurable: false",
        "writable: false",
        "enumerable: false",
        "value: null"
      ],
      correctAnswer: "configurable: false",
      explanation: "Object.seal() barcha xususiyatlarning konfiguratsiyasini o'chiradi (ya'ni ularni o'chirib yuborish yoki turini o'zgartirishni taqiqlaydi), lekin writable saqlanib qoladi."
    }
  ]
};
