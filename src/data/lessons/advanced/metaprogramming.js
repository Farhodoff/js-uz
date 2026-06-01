export const metaprogramming = {
  id: "a23",
  title: "Metaprogramming: Proxy va Reflect",
  theory: `## 1. NEGA kerak?
Metadasturlash (Metaprogramming) - bu dasturning o'zini o'zi o'zgartirishi, tahlil qilishi yoki boshqa kodning xatti-harakatlarini boshqarishidir. JavaScript-da obyektlar va funksiyalarning ichki xulq-atvorini (masalan, qiymat o'qish, yozish, o'chirish) nazorat qilish va boshqarish an'anaviy ravishda qiyin bo'lgan. Proxy va Reflect API obyektlar ustidan to'liq nazorat o'rnatish, ma'lumotlarni validatsiya qilish, reaktivlik (reactivity) yaratish va log yozish uchun kuchli vosita bo'lib xizmat qiladi. Proxy va Reflect obyektlar ustidan to'liq va tizimli nazorat o'rnatish imkoniyatini beradi.

## 2. SODDALIK (Analogiya)
Buni **binoning kirish qismidagi qo'riqchi va qabulxona (reception)** deb tasavvur qiling:
- **Asl obyekt (Target):** Bino ichidagi xonalar yoki ma'lumotlar ombori.
- **Proxy:** Kirish eshigidagi qo'riqchi. Har bir kiruvchi va chiquvchi (obyektdan ma'lumot oluvchi/yozuvchi) uning nazoratidan o'tishi kerak. Qo'riqchi siz kimligingiz va nimani maqsad qilganingizni so'raydi, tekshiradi va shunga qarab ruxsat beradi yoki rad etadi.
- **Reflect:** Binoning ichki telefon tizimi yoki administrator qo'llanmasi. Qo'riqchi ma'lumotni tekshirgach, Reflect orqali ichkariga xavfsiz murojaat qiladi. Reflect o'rnatilgan amallarni to'g'ridan-to'g'ri asl obyektda bajaradi.

## 3. STRUKTURA VA PRINSIPLAR
Metaprogramming tizimi asosan ikki qismdan iborat:

### 1. Proxy
Asl obyekt (target) va uning ustida bajariladigan amallarni boshqaradigan boshqaruvchi (handler) qabul qiluvchi wrapper (qobiq) obyektdir.
\`\`\`javascript
const proxy = new Proxy(target, handler);
\`\`\`

### 2. Reflect
Reflect - bu obyektlarning ichki amallarini (masalan, xususiyatni olish, o'rnatish, o'chirish) funksional tarzda chaqirishga yordam beruvchi global obyekt. U Proxy tuzoqlari (traps) bilan bir xil metodlar va parametrlarga ega.

### Asosiy tuzoqlar (Traps):
- **get(target, prop, receiver):** Obyektdan xususiyat o'qilayotganda ishga tushadi.
- **set(target, prop, value, receiver):** Obyektga qiymat yozilayotganda yoki o'zgartirilayotganda ishga tushadi. Muvaffaqiyatli bajarilganda \`true\`, aks holda \`false\` qaytarishi shart (strict mode-da \`false\` qaytarilsa TypeError tashlaydi).
- **has(target, prop):** \`in\` operatori qo'llanilganda ishga tushadi.
- **deleteProperty(target, prop):** \`delete\` operatori yordamida obyekt xususiyati o'chirilayotganda chaqiriladi.
- **ownKeys(target):** \`Object.keys()\`, \`Reflect.ownKeys()\`, \`for...in\` kabi obyekt kalitlarini ro'yxat qiluvchi metodlar ishlatilganda ishga tushadi.

\`\`\`mermaid
graph TD
    User([Foydalanuvchi/Kod]) -->|Murojaat: get / set / delete| Proxy[Proxy Obyekti]
    Proxy -->|Tuzoqlarni tekshiradi| HasTrap{Trap aniqlanganmi?}
    HasTrap -->|Ha| ExecTrap[Trap funksiyasi ishlaydi]
    HasTrap -->|Yo'q| DirectTarget[Target obyektiga yo'naltiradi]
    ExecTrap -->|Validatsiya/Loglash| Validation{Validatsiya to'g'rimi?}
    Validation -->|Ha| ReflectCall[Reflect orqali Target-ga yozish/o'qish]
    Validation -->|Yo'q| ThrowError[TypeError / Xatolik tashlanadi]
    ReflectCall --> Target[(Target Obyekti)]
    DirectTarget --> Target
    style Proxy fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style Target fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style ExecTrap fill:#d35400,stroke:#e67e22,stroke-width:2px,color:#fff
    style ReflectCall fill:#2980b9,stroke:#3498db,stroke-width:2px,color:#fff
\`\`\`

## 4. CHUQUR TUSHUNCHALAR VA ILG'OR MAVZULAR

### A. Reflect API va uning afzalliklari
Nega Reflect ishlatamiz?
1. **Xavfsiz va aniq qaytish qiymatlari:** \`Object.defineProperty(obj, prop, desc)\` xatolik yuz berganda xato (throw Error) tashlaydi. \`Reflect.defineProperty(obj, prop, desc)\` esa shunchaki muvaffaqiyatli bajarilgan bo'lsa \`true\`, aks holda \`false\` qaytargani uchun xatolarni boshqarish oson.
2. **Bir xillik (Consistency):** Standard amallarni operator ko'rinishida yozish o'rniga (\`delete obj.prop\` yoki \`prop in obj\`), ularni funksiya shaklida yozish imkonini beradi (\`Reflect.deleteProperty(obj, prop)\`, \`Reflect.has(obj, prop)\`).
3. **Qabul qiluvchini saqlash (Receiver):** \`Reflect.get(target, prop, receiver)\` yoki \`Reflect.set(target, prop, value, receiver)\` trap-larda asl getter/setter'larga to'g'ri \`this\` (receiver) kontekstini uzatishga yordam beradi.

### B. Revocable Proxies (Bekor qilinadigan Proxy'lar)
Ba'zi holatlarda siz boshqa kod bo'limiga yoki uchinchi tomon kutubxonasiga obyekt ustidan vaqtinchalik nazorat berishingiz kerak bo'ladi. Operatsiya tugagandan so'ng, siz kirishni butunlay yopmoqchi bo'lasiz. Buning uchun \`Proxy.revocable()\` ishlatiladi:

\`\`\`javascript
const { proxy, revoke } = Proxy.revocable(target, handler);

// Proxy bilan ishlash
console.log(proxy.name);

// Nazoratni butunlay bekor qilish
revoke();

// Keyingi murojaat TypeError xatoligini keltirib chiqaradi
console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
\`\`\`

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as Kod/Foydalanuvchi
    participant RP as Revocable Proxy
    participant Revoke as revoke() funksiyasi
    participant Target as Target Obyekti

    Note over Client, Target: 1-Bosqich: Proxy Faol Holatda
    Client->>RP: get/set operatsiyasi
    RP->>Target: So'rovni Reflect orqali yuborish
    Target-->>RP: Qiymat qaytarish
    RP-->>Client: Natija

    Note over Client, Target: 2-Bosqich: Proxy-ni Bekor Qilish (Revocation)
    Client->>Revoke: revoke() funksiyasini chaqirish
    Note over RP: Proxy o'chirildi (Revoked status)

    Note over Client, Target: 3-Bosqich: Bekor qilingandan so'ng
    Client->>RP: get/set operatsiyasi
    RP-->>Client: TypeError (Cannot perform 'get' on a proxy that has been revoked)
\`\`\`

## 5. XATOLAR (Common mistakes)
- **set trap ichida true qaytarmaslik:** Agar set trap-da \`true\` qaytarmasangiz va dastur qat'iy rejimda (\`"use strict"\`) bo'lsa, \`TypeError\` xatosi yuzaga keladi.
- **Cheksiz Rekursiya (Infinite Recursion):**
  \`\`\`javascript
  const p = new Proxy(target, {
    get(target, prop) {
      return p[prop]; // Xato! Proxy-ning o'ziga murojaat qilish get trap-ini cheksiz chaqiradi.
    }
  });
  \`\`\`
  To'g'risi: \`Reflect.get(target, prop)\` yoki \`target[prop]\` ishlatishdir.

## 6. SAVOLLAR VA JAVOBLAR
**1. Proxy orqali obyektlarni to'liq himoya qila olamizmi?**
Ha, xususan \`set\`, \`deleteProperty\`, \`defineProperty\` va \`preventExtensions\` kabi tuzoqlarni qo'llab, obyektdagi ma'lumotlarni o'zgartirishdan butunlay saqlash mumkin.

**2. Reflect obyekti nima uchun konstruktorga ega emas?**
Reflect — Math yoki JSON kabi statik yordamchi obyekt hisoblanadi. Undan \`new\` kalit so'zi bilan yangi nusxa (instance) yaratib bo'lmaydi.

**3. Proxy obyekti target obyektining prototipiga ta'sir qiladimi?**
Proxy o'zi orqali amalga oshiriladigan barcha prototip so'rovlarini (masalan, \`getPrototypeOf\`) ham \`getPrototypeOf\` tuzog'i orqali tutib qolishi mumkin.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Proxy Validatsiya",
      instruction: "Obyektga yangi xususiyat qo'shishni taqiqlovchi Proxy yozing (faqat mavjud xususiyatni o'zgartirishga ruxsat bersin).",
      startingCode: "const data = { name: 'JS' };\nconst proxy = new Proxy(data, {\n  set(target, prop, value) {\n    // faqat bor xususiyatni o'zgartirishga ruxsat bering\n  }\n});",
      hint: "if (!(prop in target)) return false; target[prop] = value; return true;",
      test: "if (code.includes('in target')) return null; return 'In operatoridan foydalanib tekshiring';"
    },
    {
      id: 2,
      title: "2️⃣ ReadOnly Proxy",
      instruction: "Obyekt xususiyatlarini o'zgartirishni yoki yangi qo'shishni butunlay taqiqlab, faqat o'qishga (read-only) ruxsat beruvchi Proxy yarating.",
      startingCode: "const user = { role: 'admin' };\nconst readOnlyUser = new Proxy(user, {\n  // set trap-ni to'ldiring\n});",
      hint: "set(target, prop, value) { return false; }",
      test: "if (code.includes('return false')) return null; return 'Set trap-i ichida doim false qaytaring';"
    },
    {
      id: 3,
      title: "3️⃣ Property Logger",
      instruction: "Obyekt xususiyati o'qilganda, uning nomini console-ga chiqaradigan get trap-ni yozing.",
      startingCode: "const obj = { secret: '123' };\nconst loggedObj = new Proxy(obj, {\n  // get trap-ni yozing\n});",
      hint: "get(target, prop) { console.log(prop); return target[prop]; }",
      test: "if (code.includes('console.log') && code.includes('target[prop]')) return null; return 'get trap ichida console.log(prop) va qiymatni qaytarishni yozing';"
    },
    {
      id: 4,
      title: "4️⃣ Default Value (Fallback)",
      instruction: "Obyektda mavjud bo'lmagan xususiyat o'qilganda undefined o'rniga doim 'Not Found' qaytaradigan Proxy yarating.",
      startingCode: "const settings = { theme: 'dark' };\nconst safeSettings = new Proxy(settings, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { return prop in target ? target[prop] : 'Not Found'; }",
      test: "if (code.includes('in target') && code.includes('Not Found')) return null; return 'Mavjud bo\\'lmagan kalitlar uchun \\'Not Found\\' qaytaring';"
    },
    {
      id: 5,
      title: "5️⃣ Private Property",
      instruction: "Agar xususiyat nomi ostki chiziq (_) bilan boshlansa (masalan _id), unga tashqaridan kirishni (get) taqiqlab undefined qaytaradigan Proxy yarating.",
      startingCode: "const account = { username: 'john', _id: 'acc_999' };\nconst secureAccount = new Proxy(account, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { if (prop.startsWith('_')) return undefined; return target[prop]; }",
      test: "if (code.includes('startsWith') || code.includes('_[0]') || code.includes(\"'_'\")) return null; return 'Ostki chiziq (_) bilan boshlangan xususiyatlarga ruxsat bermang';"
    },
    {
      id: 6,
      title: "6️⃣ Reflect.get ishlatish",
      instruction: "Proxy get trap-i ichida obyekt xususiyatini o'qish uchun Reflect.get()-dan foydalaning.",
      startingCode: "const user = { name: 'Ali' };\nconst proxyUser = new Proxy(user, {\n  get(target, prop, receiver) {\n    // Reflect.get orqali qiymatni qaytaring\n  }\n});",
      hint: "return Reflect.get(target, prop, receiver);",
      test: "if (code.includes('Reflect.get')) return null; return 'Reflect.get metodidan foydalaning';"
    },
    {
      id: 7,
      title: "7️⃣ Delete Property Trap",
      instruction: "Ostki chiziq bilan boshlangan xususiyatlarni o'chirishni (delete) taqiqlovchi Proxy yarating (boshqalarini esa o'chirishga ruxsat bersin).",
      startingCode: "const data = { _id: 1, age: 20 };\nconst proxyData = new Proxy(data, {\n  deleteProperty(target, prop) {\n    // Trap-ni yozing\n  }\n});",
      hint: "if (prop.startsWith('_')) return false; return Reflect.deleteProperty(target, prop);",
      test: "if (code.includes('deleteProperty') && (code.includes('startsWith') || code.includes('_[0]'))) return null; return 'deleteProperty tuzog\\'i va startsWith dan foydalaning';"
    },
    {
      id: 8,
      title: "8️⃣ Negative Index Array",
      instruction: "Manfiy indekslarni qo'llab-quvvatlaydigan (masalan, [-1] massivning oxirgi elementini qaytarsin) massiv uchun Proxy yaratuvchi createSmartArray funksiyasini yozing.",
      startingCode: "function createSmartArray(arr) {\n  return new Proxy(arr, {\n    get(target, prop) {\n      // Manfiy indekslarni tekshiring\n    }\n  });\n}",
      hint: "let index = Number(prop); if (index < 0) index = target.length + index; return target[index];",
      test: "if (code.includes('length') && code.includes('Number')) return null; return 'Smart array manfiy indekslarni to\\'g\\'ri hisoblamadi';"
    },
    {
      id: 9,
      title: "9️⃣ Reflect.has operatori",
      instruction: "in operatori xatti-harakatini boshqaruvchi has trap-i ichida Reflect.has() operatoridan foydalaning.",
      startingCode: "const user = { name: 'Ali', role: 'guest' };\nconst proxy = new Proxy(user, {\n  has(target, prop) {\n    // has trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.has(target, prop);",
      test: "if (code.includes('Reflect.has') && code.includes('has')) return null; return 'has trap va Reflect.has metodidan foydalaning';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Only Numbers Object",
      instruction: "Obyektga faqat sonli qiymatlarni yozishga ruxsat beruvchi Proxy yarating. Agar qiymat son bo'lmasa, TypeError tashlasin (throw).",
      startingCode: "const score = { points: 10 };\nconst numericScore = new Proxy(score, {\n  set(target, prop, value) {\n    // set trap-ni to'ldiring\n  }\n});",
      hint: "if (typeof value !== 'number') throw new TypeError(); target[prop] = value; return true;",
      test: "if (code.includes('TypeError') && code.includes('typeof')) return null; return 'Son bo\\'lmagan qiymatlar uchun TypeError tashlang';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Reflect.ownKeys operatori",
      instruction: "Obyekt kalitlarini ro'yxat qilganda ostki chiziq bilan boshlangan xususiyatlarni yashirish uchun ownKeys trap-ni yozing.",
      startingCode: "const user = { _password: '123', name: 'Ali' };\nconst proxy = new Proxy(user, {\n  ownKeys(target) {\n    // ownKeys trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.ownKeys(target).filter(key => typeof key !== 'string' || !key.startsWith('_'));",
      test: "if (code.includes('Reflect.ownKeys') && code.includes('filter')) return null; return 'ownKeys va filter yordamida ostki chiziqli kalitlarni yashiring';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Proxy Revocable",
      instruction: "Proxy.revocable yordamida bekor qilinadigan proxy yarating. Funksiya obyekt va uning proxy'sini bekor qilish funksiyasini (revoke) qaytarsin.",
      startingCode: "function createRevocable(target) {\n  // Proxy.revocable ishlatib qaytaring\n}",
      hint: "return Proxy.revocable(target, {});",
      test: "if (code.includes('Proxy.revocable')) return null; return 'Proxy.revocable orqali obekt va revoke funksiyasini qaytaring';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ To'liq read-only Proxy (createReadOnlyProxy)",
      instruction: "Obyektga har qanday yangi qiymat yozish (`set`) yoki o'chirish (`deleteProperty`) harakatlarida xatolik (`Error`) tashlaydigan to'liq read-only Proxy qaytaruvchi `createReadOnlyProxy(obj)` funksiyasini yozing. O'chirish va yozish rad etilganda `'Bu obyekt faqat o\\'qish uchun!'` xabari bilan Error tashlanishi shart.",
      startingCode: "function createReadOnlyProxy(obj) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Proxy(obj, {\n  set() { throw new Error(\"Bu obyekt faqat o'qish uchun!\"); },\n  deleteProperty() { throw new Error(\"Bu obyekt faqat o'qish uchun!\"); }\n});",
      test: "if (typeof createReadOnlyProxy !== 'function') return 'createReadOnlyProxy funksiya emas';\nconst o = { a: 1 };\nconst p = createReadOnlyProxy(o);\ntry {\n  p.a = 2;\n  return 'Qiymat yozishda xato tashlanmadi';\n} catch (e) {\n  if (e.message !== \"Bu obyekt faqat o'qish uchun!\") return 'Xato xabari noto\\'g\\'ri';\n}\ntry {\n  delete p.a;\n  return 'Qiymat o\\'chirishda xato tashlanmadi';\n} catch (e) {\n  if (e.message !== \"Bu obyekt faqat o'qish uchun!\") return 'Xato xabari noto\\'g\\'ri';\n}\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Schema bo'yicha validatsiya (createValidationProxy)",
      instruction: "Berilgan `target` obyekti va `schema` (kalit-turlar juftligi) bo'yicha qiymatlarni validatsiya qiluvchi `createValidationProxy(target, schema)` funksiyasini yozing. Agar o'rnatilayotgan qiymat turi `schema`-dagi turga mos kelmasa (va kalit schema-da mavjud bo'lsa), `TypeError` tashlang. Agarda kalit schema ichida bo'lmasa, yoki tur to'g'ri bo'lsa, qiymatni asl obyektga o'rnating. O'rnatish muvaffaqiyatli bo'lsa `Reflect.set` yordamida haqiqiy holatni qaytaring.",
      startingCode: "function createValidationProxy(target, schema) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Proxy(target, {\n  set(tar, prop, val) {\n    if (prop in schema && typeof val !== schema[prop]) {\n      throw new TypeError(`Noto'g'ri tur`);\n    }\n    return Reflect.set(tar, prop, val);\n  }\n});",
      test: "if (typeof createValidationProxy !== 'function') return 'createValidationProxy funksiya emas';\nconst schema = { name: 'string', age: 'number' };\nconst target = { name: 'Ali', age: 20 };\nconst p = createValidationProxy(target, schema);\ntry {\n  p.age = 'yosh';\n  return 'Noto\\'g\\'ri tur o\\'rnatilganda TypeError tashlanmadi';\n} catch (e) {\n  if (!(e instanceof TypeError)) return 'Xato turi TypeError bo\\'lishi kerak';\n}\np.age = 25;\nif (target.age !== 25) return 'To\\'g\\'ri qiymat o\\'rnatilmadi';\np.role = 'admin';\nif (target.role !== 'admin') return 'Schema-da bo\\'lmagan kalit o\\'rnatilmadi';\nreturn null;"
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
    },
    {
      id: 13,
      question: "Proxy.revocable() orqali bekor qilingan (revoked) proxy ustida get yoki set amallarini bajarishga urinilganda qanday xatolik yuz beradi?",
      options: [
        "ReferenceError",
        "TypeError",
        "RangeError",
        "Hech qanday xato bermaydi, shunchaki undefined qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Bekor qilingan proxy ustida har qanday get, set, deleteProperty va boshqa operatsiyalarni bajarishga urinilganda har doim TypeError xatoligi tashlanadi."
    },
    {
      id: 14,
      question: "Strict mode (qat'iy rejim) faollashtirilgan holatda, Proxy set trap-i false qaytarsa nima yuz beradi?",
      options: [
        "Obyekt qiymati o'zgarmasdan qoladi, lekin hech qanday xato tashlanmaydi",
        "TypeError xatoligi tashlanadi",
        "Dastur cheksiz siklga kiradi",
        "O'rnatilgan qiymat o'chirib yuboriladi"
      ],
      correctAnswer: 1,
      explanation: "Strict mode ostida Proxy set trap-i false (yoki boshqa falsy qiymat) qaytarsa, JS dvigateli darhol TypeError xatoligini ko'taradi."
    }
  ]
};
