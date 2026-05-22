export const metaprogramming = {
  id: "a23",
  title: "Metaprogramming: Proxy va Reflect",
  theory: `## 1. NEGA kerak?
Metadasturlash (Metaprogramming) - bu dasturning o'zini o'zi o'zgartirishi, tahlil qilishi yoki boshqa kodning xatti-harakatlarini boshqarishidir. JavaScript-da obyektlar va funksiyalarning ichki xulq-atvorini (masalan, qiymat o'qish, yozish, o'chirish) nazorat qilish juda qiyin edi. Proxy va Reflect API obyektlar ustidan to'liq nazorat o'rnatish, ma'lumotlarni validatsiya qilish, reaktivlik (reactivity) yaratish va log yozish uchun kuchli vosita bo'lib xizmat qiladi.

## 2. SODDALIK (Analogiya)
Buni **binoning kirish qismidagi qo'riqchi va qabulxona (reception)** deb tasavvur qiling:
- **Asl obyekt (Target):** Bino ichidagi xonalar yoki ma'lumotlar ombori.
- **Proxy:** Kirish eshigidagi qo'riqchi. Har bir kiruvchi va chiquvchi (obyektdan ma'lumot oluvchi/yozuvchi) uning nazoratidan o'tishi kerak.
- **Reflect:** Binoning ichki telefon tizimi. Qo'riqchi ma'lumotni tekshirgach, Reflect orqali ichkariga xavfsiz murojaat qiladi.

## 3. STRUKTURA
Metaprogramming tizimi asosan ikki qismdan iborat:
1. **Proxy:** Asl obyekt va handler (tuzoqlar - traps) qabul qiladi.
   \`\`\`javascript
   const proxy = new Proxy(target, handler);
   \`\`\`
2. **Reflect:** Obyekt metodlarini chaqirishning funksional usuli bo'lib, uning har bir metodi mos ravishda Proxy'ning trap metodlari bilan bir xil parametrlarga ega.

Asosiy tuzoqlar (traps):
- \`get(target, prop, receiver)\` — xususiyat o'qilganda.
- \`set(target, prop, value, receiver)\` — xususiyat o'zgartirilganda yoki qo'shilganda.
- \`has(target, prop)\` — \`in\` operatori ishlatilganda.
- \`deleteProperty(target, prop)\` — \`delete\` operatori ishlatilganda.

## 4. AMALIYOT (Mashqlar pastda)
Quyida foydalanuvchi ma'lumotlarini tekshiruvchi sodda va ishonchli Proxy misoli ko'rsatilgan:
\`\`\`javascript
const user = { name: "Ali", age: 25 };

const secureUser = new Proxy(user, {
  set(target, prop, value) {
    if (prop === "age" && (typeof value !== "number" || value < 0)) {
      throw new Error("Yosh faqat musbat son bo'lishi kerak!");
    }
    return Reflect.set(target, prop, value);
  }
});

secureUser.age = 30; // Muvaffaqiyatli o'zgaradi
// secureUser.age = -5; // Xatolik yuz beradi!
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Trap-da true qaytarmaslik:** \`set\` trap-i muvaffaqiyatli bajarilganda \`true\` qaytarmasa, strict mode rejimida \`TypeError\` xatosi yuzaga keladi.
- **Cheksiz rekursiya:** Trap ichida yana shu proxy'ning o'ziga murojaat qilish cheksiz aylanma chaqiruvga va xotira to'lishiga olib keladi. Asl obyektga (\`target\`) yoki \`Reflect\`-ga murojaat qilish kerak.
- **new Symbol() yozish:** \`Symbol\` konstruktor emas, uni yaratishda \`new\` kalit so'zi ishlatilmaydi: \`const sym = Symbol()\` (xato emas, to'g'ri shakl).

## 6. SAVOLLAR VA JAVOBLAR
**1. Trap (tuzoq) nima?**
Obyekt ustida biror amal bajarilganda (masalan, \`get\`, \`set\`) uni tutib qoluvchi Proxy handler metodlari.

**2. Reflect API nima uchun kerak?**
Obyektlar bilan ishlashda xavfsiz va funksional kod yozish uchun. U har doim natijani \`boolean\` yoki aniq qiymat ko'rinishida qaytaradi.

**3. Proxy.revocable() nima qiladi?**
Keyinchalik o'chirib qo'yish (yopish) mumkin bo'lgan vaqtinchalik Proxy yaratish imkonini beradi.
`,
  exercises: [
    {
      id: 1,
      title: "Proxy Validatsiya",
      instruction: "Obyektga yangi xususiyat qo'shishni taqiqlovchi Proxy yozing (faqat mavjud xususiyatni o'zgartirishga ruxsat bersin).",
      startingCode: "const data = { name: 'JS' };\nconst proxy = new Proxy(data, {\n  set(target, prop, value) {\n    // faqat bor xususiyatni o'zgartirishga ruxsat bering\n  }\n});",
      hint: "if (!(prop in target)) return false; target[prop] = value; return true;",
      test: "if (code.includes('in target')) return null; return 'In operatoridan foydalanib tekshiring';"
    },
    {
      id: 2,
      title: "ReadOnly Proxy",
      instruction: "Obyekt xususiyatlarini o'zgartirishni yoki yangi qo'shishni butunlay taqiqlab, faqat o'qishga (read-only) ruxsat beruvchi Proxy yarating.",
      startingCode: "const user = { role: 'admin' };\nconst readOnlyUser = new Proxy(user, {\n  // set trap-ni to'ldiring\n});",
      hint: "set(target, prop, value) { return false; }",
      test: "if (code.includes('return false')) return null; return 'Set trap-i ichida doim false qaytaring';"
    },
    {
      id: 3,
      title: "Property Logger",
      instruction: "Obyekt xususiyati o'qilganda, uning nomini console-ga chiqaradigan get trap-ni yozing.",
      startingCode: "const obj = { secret: '123' };\nconst loggedObj = new Proxy(obj, {\n  // get trap-ni yozing\n});",
      hint: "get(target, prop) { console.log(prop); return target[prop]; }",
      test: "if (code.includes('console.log') && code.includes('target[prop]')) return null; return 'get trap ichida console.log(prop) va qiymatni qaytarishni yozing';"
    },
    {
      id: 4,
      title: "Default Value (Fallback)",
      instruction: "Obyektda mavjud bo'lmagan xususiyat o'qilganda undefined o'rniga doim 'Not Found' qaytaradigan Proxy yarating.",
      startingCode: "const settings = { theme: 'dark' };\nconst safeSettings = new Proxy(settings, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { return prop in target ? target[prop] : 'Not Found'; }",
      test: "if (code.includes('in target') && code.includes('Not Found')) return null; return 'Mavjud bo\\'lmagan kalitlar uchun \\'Not Found\\' qaytaring';"
    },
    {
      id: 5,
      title: "Private Property",
      instruction: "Agar xususiyat nomi ostki chiziq (_) bilan boshlansa (masalan _id), unga tashqaridan kirishni (get) taqiqlab undefined qaytaradigan Proxy yarating.",
      startingCode: "const account = { username: 'john', _id: 'acc_999' };\nconst secureAccount = new Proxy(account, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { if (prop.startsWith('_')) return undefined; return target[prop]; }",
      test: "if (code.includes('startsWith') || code.includes('_[0]') || code.includes(\"'_'\")) return null; return 'Ostki chiziq (_) bilan boshlangan xususiyatlarga ruxsat bermang';"
    },
    {
      id: 6,
      title: "Reflect.get ishlatish",
      instruction: "Proxy get trap-i ichida obyekt xususiyatini o'qish uchun Reflect.get()-dan foydalaning.",
      startingCode: "const user = { name: 'Ali' };\nconst proxyUser = new Proxy(user, {\n  get(target, prop, receiver) {\n    // Reflect.get orqali qiymatni qaytaring\n  }\n});",
      hint: "return Reflect.get(target, prop, receiver);",
      test: "if (code.includes('Reflect.get')) return null; return 'Reflect.get metodidan foydalaning';"
    },
    {
      id: 7,
      title: "Delete Property Trap",
      instruction: "Ostki chiziq bilan boshlangan xususiyatlarni o'chirishni (delete) taqiqlovchi Proxy yarating (boshqalarini esa o'chirishga ruxsat bersin).",
      startingCode: "const data = { _id: 1, age: 20 };\nconst proxyData = new Proxy(data, {\n  deleteProperty(target, prop) {\n    // Trap-ni yozing\n  }\n});",
      hint: "if (prop.startsWith('_')) return false; return Reflect.deleteProperty(target, prop);",
      test: "if (code.includes('deleteProperty') && (code.includes('startsWith') || code.includes('_[0]'))) return null; return 'deleteProperty tuzog\\'i va startsWith dan foydalaning';"
    },
    {
      id: 8,
      title: "Negative Index Array",
      instruction: "Manfiy indekslarni qo'llab-quvvatlaydigan (masalan, [-1] massivning oxirgi elementini qaytarsin) massiv uchun Proxy yaratuvchi createSmartArray funksiyasini yozing.",
      startingCode: "function createSmartArray(arr) {\n  return new Proxy(arr, {\n    get(target, prop) {\n      // Manfiy indekslarni tekshiring\n    }\n  });\n}",
      hint: "let index = Number(prop); if (index < 0) index = target.length + index; return target[index];",
      test: "if (code.includes('length') && code.includes('Number')) return null; return 'Smart array manfiy indekslarni to\\'g\\'ri hisoblamadi';"
    },
    {
      id: 9,
      title: "Reflect.has operatori",
      instruction: "in operatori xatti-harakatini boshqaruvchi has trap-i ichida Reflect.has() operatoridan foydalaning.",
      startingCode: "const user = { name: 'Ali', role: 'guest' };\nconst proxy = new Proxy(user, {\n  has(target, prop) {\n    // has trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.has(target, prop);",
      test: "if (code.includes('Reflect.has') && code.includes('has')) return null; return 'has trap va Reflect.has metodidan foydalaning';"
    },
    {
      id: 10,
      title: "Only Numbers Object",
      instruction: "Obyektga faqat sonli qiymatlarni yozishga ruxsat beruvchi Proxy yarating. Agar qiymat son bo'lmasa, TypeError tashlasin (throw).",
      startingCode: "const score = { points: 10 };\nconst numericScore = new Proxy(score, {\n  set(target, prop, value) {\n    // set trap-ni to'ldiring\n  }\n});",
      hint: "if (typeof value !== 'number') throw new TypeError(); target[prop] = value; return true;",
      test: "if (code.includes('TypeError') && code.includes('typeof')) return null; return 'Son bo\\'lmagan qiymatlar uchun TypeError tashlang';"
    },
    {
      id: 11,
      title: "Reflect.ownKeys operatori",
      instruction: "Obyekt kalitlarini ro'yxat qilganda ostki chiziq bilan boshlangan xususiyatlarni yashirish uchun ownKeys trap-ni yozing.",
      startingCode: "const user = { _password: '123', name: 'Ali' };\nconst proxy = new Proxy(user, {\n  ownKeys(target) {\n    // ownKeys trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.ownKeys(target).filter(key => typeof key !== 'string' || !key.startsWith('_'));",
      test: "if (code.includes('Reflect.ownKeys') && code.includes('filter')) return null; return 'ownKeys va filter yordamida ostki chiziqli kalitlarni yashiring';"
    },
    {
      id: 12,
      title: "Proxy Revocable",
      instruction: "Proxy.revocable yordamida bekor qilinadigan proxy yarating. Funksiya obyekt va uning proxy'sini bekor qilish funksiyasini (revoke) qaytarsin.",
      startingCode: "function createRevocable(target) {\n  // Proxy.revocable ishlatib qaytaring\n}",
      hint: "return Proxy.revocable(target, {});",
      test: "if (code.includes('Proxy.revocable')) return null; return 'Proxy.revocable orqali obekt va revoke funksiyasini qaytaring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da Metadasturlash (Metaprogramming) deganda nima tushuniladi?",
      options: [
        "HTML elementlarini JavaScript yordamida tezkor render qilish",
        "Kodni o'zini o'zi tahlil qiladigan, o'zgartiradigan yoki boshqa kodning xatti-harakatlarini nazorat qiladigan dasturlar yozish san'ati",
        "Ma'lumotlar bazasidan ma'lumotlarni meta-taglar yordamida qidirish",
        "Kodni faqat CSS stillari bilan bog'lash"
      ],
      correctAnswer: 1,
      explanation: "Metadasturlash — bu dasturning boshqa dasturlarni (yoki o'zining xatti-harakatlarini) ma'lumot sifatida qabul qilib, ularni o'zgartira olish qobiliyatidir. JavaScriptda bunga Proxy va Reflect yordamida erishiladi."
    },
    {
      id: 2,
      question: "Proxy obyektini yaratishda `handler` obyekti ichidagi `get` va `set` kabi maxsus metodlar nima deb ataladi?",
      options: [
        "Filters (Filtrlar)",
        "Traps (Tuzoqlar)",
        "Listeners (Eshituvchilar)",
        "Interceptors (To'suvchilar)"
      ],
      correctAnswer: 1,
      explanation: "Proxy'da obyekt ustidagi operatsiyalarni (murojaat, o'zgartirish va h.k.) tutib oluvchi bu metodlar rasmiy ravishda 'traps' (tuzoqlar) deb ataladi."
    },
    {
      id: 3,
      question: "Proxy yordamida obyektning biror xususiyatini o'chirish (`delete obj.prop`) harakatini tutib qolish uchun qaysi trap (tuzoq) metodidan foydalaniladi?",
      options: [
        "`delete()`",
        "`deleteProperty()`",
        "`removeProperty()`",
        "`unset()`"
      ],
      correctAnswer: 1,
      explanation: "Obyekt xususiyatini o'chirish operatsiyasini nazorat qilish va taqiqlash yoki o'zgartirish uchun `deleteProperty(target, prop)` trap funksiyasidan foydalaniladi."
    },
    {
      id: 4,
      question: "Reflect obyekti nima va u asosan nima uchun ishlatiladi?",
      options: [
        "Brauzer oynasini aks ettiruvchi (iframe) yaratish vositasi",
        "Obyektlar bilan ishlashda uning standart metodlarini (masalan, get, set, defineProperty) sodda, xavfsiz va funksional ko'rinishda chaqirish imkonini beruvchi, hamda true/false natija qaytaruvchi o'rnatilgan obyekt",
        "Ma'lumotlarni shifrlash klassi",
        "Serverga so'rov yuborish kutubxonasi"
      ],
      correctAnswer: 1,
      explanation: "Reflect — bu obyektlarning ichki operatsiyalari uchun tayyor metodlar to'plamidir. Masalan, `try/catch` bloklarisiz `Reflect.set()` true/false qaytarib xavfsiz qiymat belgilash imkonini beradi va u Proxy trap metodlari bilan bir xil parametrlarga ega."
    },
    {
      id: 5,
      question: "Quyidagi kod e'lon qilingandan so'ng, `proxy.age` qiymati consolega nima deb chiqadi?\n```javascript\nconst target = { name: 'Ali' };\nconst proxy = new Proxy(target, {\n  get(target, prop) {\n    return prop in target ? target[prop] : 'Yo\\'q';\n  }\n});\nconsole.log(proxy.age);\n```",
      options: [
        "`undefined`",
        "`\"Yo'q\"`",
        "`ReferenceError` xatoligi beradi",
        "`\"Ali\"`"
      ],
      correctAnswer: 1,
      explanation: "Proxy'dagi `get` trap metodi `target` obyektda so'ralgan xususiyat bor-yo'qligini `in` operatori orqali tekshiradi. `age` xususiyati yo'qligi sababli `'Yo\\'q'` qiymati qaytariladi."
    },
    {
      id: 6,
      question: "Proxy'da construct(target, args) trap-i nima uchun ishlatiladi?",
      options: [
        "Obyektni o'chirish uchun",
        "Funksiyani construct operatori (new) bilan chaqirishni tutib olish uchun",
        "Metodlarni qayta yozish uchun",
        "Massiv elementlarini saralash uchun"
      ],
      correctAnswer: 1,
      explanation: "`construct` trap-i new kalit so'zi bilan funksiya (klass) instance yaratilishini tutib olish uchun foydalaniladi."
    },
    {
      id: 7,
      question: "Reflect.ownKeys(obj) metodi qanday kalitlarni qaytaradi?",
      options: [
        "Faqat string kalitlarni",
        "Faqat Symbol kalitlarni",
        "Obyektning barcha o'zining (string va Symbol) kalitlarini (enumerable bo'lmaganlarini ham)",
        "Faqat prototipdan meros qolgan kalitlarni"
      ],
      correctAnswer: 2,
      explanation: "`Reflect.ownKeys` obyektdagi barcha o'ziga tegishli kalitlarni, xoh string, xoh Symbol, enumerable yoki enumerable bo'lmasin, barchasini massiv ko'rinishida qaytaradi."
    },
    {
      id: 8,
      question: "Proxy.revocable() nimasi bilan oddiy Proxy-dan farq qiladi?",
      options: [
        "U tezroq ishlaydi",
        "U keyinchalik o'chirib qo'yilishi (revoke qilinishi) mumkin bo'lgan proxy va revoke funksiyasini qaytaradi",
        "U faqat massivlar bilan ishlaydi",
        "U xotirani ko'proq egallaydi"
      ],
      correctAnswer: 1,
      explanation: "`Proxy.revocable()` yordamida yaratilgan proxy-ni `revoke()` funksiyasini chaqirish orqali butunlay o'chirib qo'yish mumkin, shundan so'ng proxy-ga har qanday murojaat TypeError xatoligini beradi."
    },
    {
      id: 9,
      question: "Proxy obyektini target obyekti bilan qanday bog'lash mumkin?",
      options: [
        "`const p = new Proxy(target, handler)`",
        "`const p = Proxy.create(target)`",
        "`const p = Object.createProxy(target)`",
        "`const p = target.toProxy()`"
      ],
      correctAnswer: 0,
      explanation: "Proxy yaratish uchun `new Proxy(target, handler)` sintaksisidan foydalaniladi. Bunda target asl obyekt, handler esa tuzoqlar (traps) obyektidir."
    },
    {
      id: 10,
      question: "Proxy handler-idagi `has(target, prop)` trap-i qaysi operator ishlatilganda chaqiriladi?",
      options: [
        "`typeof`",
        "`instanceof`",
        "`in`",
        "`delete`"
      ],
      correctAnswer: 2,
      explanation: "`has` tuzog'i obyektda ma'lum bir xususiyat bor yoki yo'qligini tekshiruvchi `prop in proxy` ifodasi bajarilganda ishga tushadi."
    },
    {
      id: 11,
      question: "`set` trap-i muvaffaqiyatli qiymat o'rnatilganini bildirish uchun qanday qiymat qaytarishi shart?",
      options: [
        "`undefined`",
        "`true` (yoki haqiqatga yaqin qiymat), aks holda strict rejimda TypeError beradi",
        "Asl obyektning o'zini",
        "O'rnatilgan qiymatni"
      ],
      correctAnswer: 1,
      explanation: "Proxy `set` tuzog'i qiymat muvaffaqiyatli o'rnatilganini bildirish uchun `true` (yoki true-like) qaytarishi shart. Agar `false` qaytarsa, strict rejimda 'trap returned falsish' deb TypeError yuzaga keladi."
    },
    {
      id: 12,
      question: "Reflect metodlari va Proxy trap-lari o'rtasida qanday moslik bor?",
      options: [
        "Ular o'rtasida hech qanday moslik yo'q",
        "Reflect metodlarining parametrlari mos keladigan Proxy trap-larining parametrlari bilan aynan bir xildir",
        "Reflect faqat set va get uchun mos keladi",
        "Proxy trap-lari Reflect metodlaridan ko'ra ko'proq parametrlarga ega"
      ],
      correctAnswer: 1,
      explanation: "Reflect obyekti Proxy-ni soddalashtirish uchun yaratilgan bo'lib, uning har bir metodi mos keluvchi Proxy trap parametrlari bilan 1-ga-1 bir xil tuzilishga ega."
    }
  ]
};
