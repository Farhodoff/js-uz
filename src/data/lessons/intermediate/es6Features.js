export const es6Features = {
  id: "es6-features",
  title: "ES6+ Yangi Xususiyatlari",
  level: "O'rta daraja",
  description: "JavaScript evolyutsiyasi: ES6 dan boshlab eng so'nggi ECMAScript versiyalarigacha qo'shilgan eng qulay va zamonaviy imkoniyatlar.",
  theory: `## 1. NEGA kerak?
JavaScript (ECMAScript) doimiy ravishda rivojlanib boradi. 2015-yilda chiqarilgan **ES6 (ES2015)** versiyasi tildagi eng katta va inqilobiy yangilanish bo'ldi. Undan keyin ham har yili (ES2016, ES2017, ... ES2024) dasturchilar ishini osonlashtirishga qaratilgan kichik va foydalanuvchi uchun juda qulay sintaksis yangiliklari qo'shilib kelmoqda.

Ushbu yangiliklarni bilish:
- Kodimizni 2-3 barobar qisqartiradi va o'qishni osonlashtiradi.
- Xavfsiz kod yozishga yordam beradi (masalan, \`undefined\` xatolardan himoyalanish).
- Zamonaviy kutubxonalar (React, Vue, Node.js) bilan ishlashda qulaylik yaratadi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, siz **oddiy mexanik velosipedda** yurasiz. Har bir tepalikka chiqishda juda ko'p kuch sarflashingiz (ko'p kod yozishingiz) kerak edi.
Modern JavaScript (ES6+) esa xuddi **aqlli elektr velosipedga** o'xshaydi:
- **Optional Chaining (\`?.\`):** Bu xuddi sensorli tormoz tizimi kabi - yo'lda to'siq (undefined/null) ko'rsa, avtomatik tormoz berib, yiqilib tushishdan (dastur sinib qolishidan) asraydi.
- **Nullish Coalescing (\`??\`):** Zaxira akkumulyator kabi - agar asosiy tok butunlay o'chsa (null/undefined bo'lsa), zaxirani ishga tushiradi, lekin shunchaki sekinlashsa (0 yoki false bo'lsa) o'chirmaydi.
- **Spread/Rest (\`...\`):** Bu xuddi sig'imli ryukzak kabi - xohlasangiz ichidagi narsalarni sochib yuborasiz (spread), xohlasangiz hammasini bitta qilib yig'ib olasiz (rest).

## 3. ASOSIY MODERN XUSUSIYATLAR

### A. Optional Chaining (\`?.\`)
Obyekt ichidagi chuqur xususiyatlarga murojaat qilishda zanjirning o'rtasidagi biror xossa \`null\` yoki \`undefined\` bo'lsa, xato otmasdan (\`Cannot read properties of undefined\`) shunchaki \`undefined\` qaytaradi:

\`\`\`javascript
const user = {
  name: "Ali",
  address: {
    city: "Toshkent"
  }
};

// Eski usul:
const city1 = user.address ? user.address.city : undefined;

// Zamonaviy usul:
const city2 = user.address?.city; // "Toshkent"
const zip = user.address?.zip; // undefined (xato bermaydi!)
\`\`\`

### B. Nullish Coalescing (\`??\`)
Faqatgina qiymat \`null\` yoki \`undefined\` bo'lgandagina o'ng tomondagi qiymatni qaytaradi. Eski \`||\` operatoridan farqi - u \`0\`, \`false\` va bo'sh satr \`""\` ni "notog'ri qiymat" deb hisoblamaydi:

\`\`\`javascript
const count = 0;

const res1 = count || 10; // 10 (chunki 0 falsy)
const res2 = count ?? 10; // 0 (chunki 0 null/undefined emas!)
\`\`\`

### C. Logical Assignment Operatorlari (Mantiqiy o'zlashtirishlar)
O'zlashtirish va shartni birlashtiradi (\`||=\`, \`&&=\`, \`??=\`):

\`\`\`javascript
const options = { title: "Dars" };

// title bo'sh bo'lsa yoki null/undefined bo'lsa yangi qiymat berish:
options.title ??= "Default Title"; 
options.count ??= 5; // options.count null/undefined bo'lgani uchun 5 o'zlashtiriladi.
\`\`\`

### D. String Metodlari: \`padStart\` va \`padEnd\`
Satr boshiga yoki oxiriga belgilangan uzunlikka yetguncha boshqa belgilarni qo'shib chiqadi:

\`\`\`javascript
const cardNumber = "4232";
const masked = cardNumber.padStart(16, "*");
console.log(masked); // "************4232" (kartani yashirish)
\`\`\`

### E. Obyektlarni guruhlash: \`Object.groupBy\` (ES2024)
Massiv elementlarini ma'lum shart asosida guruhlab, obyektga aylantiradi:

\`\`\`javascript
const products = [
  { name: "Olma", category: "meva" },
  { name: "Bodring", category: "sabzavot" },
  { name: "Banan", category: "meva" }
];

const grouped = Object.groupBy(products, p => p.category);
/* Natija:
{
  meva: [{ name: "Olma", ... }, { name: "Banan", ... }],
  sabzavot: [{ name: "Bodring", ... }]
}
*/
\`\`\`

## 4. NIMA UCHUN MUHIM?
- **Xatolardan himoya:** \`?.\` va \`??\` asosan tashqi API ma'lumotlari bilan ishlashda xavfsizlikni ta'minlaydi (agar API ba'zi maydonlarni qaytarmasa, dastur sinib qolmaydi).
- **Kod o'qiluvchanligi:** Qatorlab yoziladigan if/else shartlari o'rniga qisqa va tushunarli operatorlarni taqdim etadi.

## 5. KO'P UCHRAYDIGAN XATOLAR
1. **Optional chainingni funksiya chaqiruvlarida xato ishlatish:**
   \`\`\`javascript
   const user = { getProfile: null };
   user.getProfile(); // TypeError: user.getProfile is not a function ❌
   
   // TO'G'RI:
   user.getProfile?.(); // undefined qaytadi, lekin dastur sinmaydi ✅
   \`\`\`
2. **\`||\` va \`??\` ni adashtirish:**
   Agar foydalanuvchi sozlamalarida \`volume: 0\` berilgan bo'lsa, \`volume || 50\` natijasi \`50\` bo'ladi (foydalanuvchi sozlamasi buziladi), \`volume ?? 50\` esa to'g'ri ravishda \`0\` ni saqlab qoladi.

## 6. INTERVIEW SAVOLLAR (Junior -> Middle -> Senior)
1. **ES6 da qo'shilgan asosiy o'zgarishlar nimalar? (Junior)**
   - \`let\`/\`const\`, arrow functions, template literals, destructuring, spread/rest, classes, promises.
2. **Optional Chaining (\`?.\`) nima va u qachon ishlatiladi? (Junior)**
   - Obyekt ichidagi zanjirlangan xossalar mavjud bo'lmaganda ReferenceError/TypeError oldini olish va xavfsiz o'qish uchun.
3. **Nullish Coalescing (\`??\`) operatorining \`||\` dan farqi nima? (Middle)**
   - \`||\` operatori falsy qiymatlarni (0, false, "") bekor qiladi. \`??\` esa faqat \`null\` va \`undefined\` bo'lgandagina o'ng tomondagi qiymatni qaytaradi.
4. **Logical Assignment operatorlari qanday ishlaydi? (Middle)**
   - \`x ||= y\` -> faqat x falsy bo'lsa x-ga y ni o'zlashtiradi. \`x ??= y\` -> faqat x null/undefined bo'lsa y ni o'zlashtiradi.
5. **Array.prototype.at() metodi nima va uning massiv[index] dan afzalligi nimada? (Junior)**
   - U massiv oxiridan elementlarni olish imkonini beradi (masalan, \`arr.at(-1)\` oxirgi elementni beradi, \`arr[arr.length - 1]\` o'rniga).
6. **Object.groupBy() metodi qaysi versiyada qo'shildi va u nima vazifani bajaradi? (Middle)**
   - ES2024 da qo'shildi, massiv elementlarini callback funksiya belgilab bergan kalit bo'yicha guruhlaydi.
7. **ECMAScript standarti qanchalik tez-tez yangilanadi va bu brauzerlarga qanday ta'sir qiladi? (Middle)**
   - Har yili yangilanadi. Brauzerlar yangi sintaksisni qo'llab-quvvatlashi uchun vaqt ketadi, shuning uchun eski brauzerlar tushunishi uchun kodlar \`Babel\` orqali transpayl qilinadi.
8. **Optional chaining yordamida dinamik metodlarni qanday chaqirish mumkin? (Senior)**
   - \`obj?.[methodName]?.()\` ko'rinishida kalit nomi dynamic bo'lganda ham xavfsiz chaqirish mumkin.
9. **Nullish coalescing operatorini mantiqiy and (\`&&\`) yoki or (\`||\`) operatorlari bilan qavslarsiz aralashtirib yozish mumkinmi? (Senior)**
   - Yo'q, qavslarsiz \`a ?? b || c\` sintaksis xatosi (SyntaxError) beradi, chunki ustuvorlik tartibi chalkash bo'ladi. Qavslar majburiy: \`(a ?? b) || c\`.
10. **String.prototype.replaceAll() nima va u replace() dan nimasi bilan farq qiladi? (Junior)**
    - \`replaceAll()\` berilgan matndagi barcha mos keladigan satrlarni o'zgartiradi, regex ishlatmasdan ham. \`replace()\` esa faqat birinchi uchraganini o'zgartiradi.
11. **Promise.any() va Promise.race() farqi nima? (Senior)**
    - \`Promise.race()\` birinchi bo'lib yakunlangan (resolve yoki reject) promisni qaytaradi. \`Promise.any()\` esa birinchi bo'lib muvaffaqiyatli resolved bo'lgan promisni qaytaradi, hammasi rejected bo'lsagina xato qaytaradi.
12. **Top-level await nima va u qayerda ishlaydi? (Senior)**
    - ES modullar (ESM) ichida asinxron \`await\`ni \`async\` funksiya ichiga o'ramay, to'g'ridan-to'g'ri faylning yuqori qismida ishlatish imkoniyati.
`
  ,
  exercises: [
    {
      id: 1,
      title: "Optional Chaining & Nullish Coalescing",
      instruction: "Foydalanuvchi `user` obyektini qabul qilib, uning `address.city` qiymatini qaytaruvchi, agar shahar mavjud bo'lmasa 'Noma'lum shahar' fallback qiymatini qaytaruvchi `getCity(user)` funksiyasini yozing. Optional chaining va nullish coalescing operatorlaridan foydalaning.",
      startingCode: "function getCity(user) {\n  // Kodni yozing\n}",
      hint: "return user?.address?.city ?? 'Noma\\'lum shahar';",
      test: "if (typeof getCity !== 'function') return 'getCity topilmadi'; const u1 = { address: { city: 'Toshkent' } }; const u2 = { name: 'Ali' }; if (getCity(u1) !== 'Toshkent' || getCity(u2) !== 'Noma\\'lum shahar') return 'Xavfsiz olish xato ishladi'; return null;"
    },
    {
      id: 2,
      title: "Logical Assignment",
      instruction: "Konfiguratsiya obyektidagi `port` sozlamasi mavjud bo'lmasa (null/undefined bo'lsa), unga 8080 standart port qiymatini beruvchi `setupConfig(config)` funksiyasini yozing. Buning uchun `??=` operatorini ishlating va yangilangan config obyektini qaytaring.",
      startingCode: "function setupConfig(config) {\n  // ??= operatorini ishlating va config qaytaring\n}",
      hint: "config.port ??= 8080; return config;",
      test: "if (typeof setupConfig !== 'function') return 'setupConfig topilmadi'; const c1 = { host: 'localhost' }; const c2 = { host: 'localhost', port: 3000 }; if (setupConfig(c1).port !== 8080 || setupConfig(c2).port !== 3000) return 'Config to\\'g\\'ri yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "String Padding (Karta yashirish)",
      instruction: "Karta raqamining oxirgi 4 ta raqamini qabul qilib, uning boshiga '*' belgisini qo'shish orqali jami 16 xonali qilib qaytaradigan `maskCard(last4)` funksiyasini yozing. Buning uchun `padStart` metodidan foydalaning.",
      startingCode: "function maskCard(last4) {\n  // padStart ishlating\n}",
      hint: "return last4.padStart(16, '*');",
      test: "if (typeof maskCard !== 'function') return 'maskCard topilmadi'; if (maskCard('4232') !== '************4232') return 'Karta raqami noto\\'g\\'ri maskalandi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Optional Chaining (`?.`) operatori qanday asosiy vazifani bajaradi?",
      options: [
        "Matnlarni bir-biriga ulash",
        "Obyekt ichidagi chuqur xossalar mavjud bo'lmaganda xato otmasdan undefined qaytarish",
        "Obyektni to'liq o'chirish",
        "Asinxron promisni kutish"
      ],
      correctAnswer: 1,
      explanation: "Optional chaining zanjir davomidagi xossa null/undefined bo'lsa, xato tashlash o'rniga zanjirni erta to'xtatib undefined qaytaradi."
    },
    {
      id: 2,
      question: "Nullish Coalescing (`??`) operatori qachon o'ng tarafdagi qiymatni qaytaradi?",
      options: [
        "Chap tarafdagi qiymat har qanday falsy (0, false, '') bo'lsa",
        "Faqat chap tarafdagi qiymat null yoki undefined bo'lsa",
        "Faqat chap tarafdagi qiymat true bo'lsa",
        "Hech qachon o'ng tarafdagi qiymatni qaytarmaydi"
      ],
      correctAnswer: 1,
      explanation: "`??` faqat `null` va `undefined` qiymatlar uchun ishlaydi, `0`, `false`, `\"\"` kabi boshqa falsy qiymatlarni o'zgarishsiz qoldiradi."
    },
    {
      id: 3,
      question: "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nlet volume = 0;\nconsole.log(volume ?? 100);\n```",
      options: ["100", "0", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "volume qiymati 0 (null/undefined emas), shuning uchun nullish coalescing operatori 0 ning o'zini qaytaradi."
    },
    {
      id: 4,
      question: "Logical Nullish Assignment (`??=`) operatori qanday vazifani bajaradi?",
      options: [
        "O'zgaruvchi faqat 0 bo'lganda yangi qiymat beradi",
        "O'zgaruvchi faqat null yoki undefined bo'lgandagina yangi qiymatni o'zlashtiradi",
        "O'zgaruvchini mutlaqo o'chirib yuboradi",
        "Ikkita obyektni solishtiradi"
      ],
      correctAnswer: 1,
      explanation: "`x ??= y` faqat `x` qiymati null yoki undefined bo'lsagina `x = y` amalini bajaradi."
    },
    {
      id: 5,
      question: "String boshiga belgilangan uzunlikka yetguncha boshqa belgilarni to'ldirishda qaysi metod ishlatiladi?",
      options: ["padStart()", "padEnd()", "fillStart()", "align()"],
      correctAnswer: 0,
      explanation: "`padStart()` metodi joriy satr boshiga kerakli uzunlikka yetguncha belgilangan simvollarni qo'shadi."
    },
    {
      id: 6,
      question: "Massiv elementlarini ma'lum guruhlash sharti asosida to'plovchi ES2024 metodini aniqlang.",
      options: ["Object.groupBy()", "Array.prototype.group()", "Object.entries()", "Map.prototype.group()"],
      correctAnswer: 0,
      explanation: "`Object.groupBy()` massiv elementlarini berilgan callback sharti bo'yicha guruhlab obyekt shaklida qaytaradigan yangi metoddir."
    },
    {
      id: 7,
      question: "Optional chaining yordamida mavjud bo'lmasligi mumkin bo'lgan funksiyani qanday chaqirish to'g'ri hisoblanadi?",
      options: [
        "obj.method?.()",
        "obj.method?()",
        "obj?.method()",
        "obj.method.call?.()"
      ],
      correctAnswer: 0,
      explanation: "Funksiyani xavfsiz chaqirish uchun metod nomidan keyin `?.()` yozilishi kerak."
    },
    {
      id: 8,
      question: "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst arr = [10, 20, 30];\nconsole.log(arr.at(-1));\n```",
      options: ["10", "30", "undefined", "NaN"],
      correctAnswer: 1,
      explanation: "at() metodi salbiy indekslarni qabul qiladi, -1 indeks massivning eng oxirgi elementi ya'ni 30 ni beradi."
    }
  ]
};
