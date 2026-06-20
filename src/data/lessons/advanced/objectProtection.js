export const objectProtection = {
  title: "Obyektlarni Himoyalash: Freeze va Seal",
  content: `
Obyektlarni qattiq himoyalash orqali siz ularni dasturning boshqa qismlarida (yoki boshqa dasturchilar tomonidan) kutilmaganda o'zgartirib qo'yishdan asraysiz. JavaScript buning uchun uch xil darajadagi himoya metodlarini taqdim etadi.

### 1. Object.preventExtensions(obj)
Eng yumshoq himoya. Obyektga **yangi xususiyatlar qo'shishni taqiqlaydi**. Lekin mavjudlarini o'chirish yoki o'zgartirish mumkin.

\`\`\`javascript
const user = { name: "Ali" };

Object.preventExtensions(user);

user.age = 25; // Xato (yangi narsa qo'shib bo'lmaydi)
user.name = "Vali"; // Ishlaydi (borini o'zgartirish mumkin)
delete user.name;   // Ishlaydi (borini o'chirish mumkin)

console.log(Object.isExtensible(user)); // false
\`\`\`

### 2. Object.seal(obj)
O'rta darajali himoya. Obyektni "muhrlaydi". **Yangi xususiyat qo'shish va mavjudlarini o'chirish mumkin emas**. Lekin borlarining qiymatlarini o'zgartirishga ruxsat beriladi.
(Orqa fonda u hamma kalitlarni \`configurable: false\` qilib chiqadi).

\`\`\`javascript
const config = { apiEndpoint: "https://api.com", timeout: 5000 };

Object.seal(config);

config.timeout = 10000; // Ishlaydi (qiymat o'zgaradi)
config.version = "1.0"; // Xato (yangi qo'shib bo'lmaydi)
delete config.apiEndpoint; // Xato (o'chirib bo'lmaydi)

console.log(Object.isSealed(config)); // true
\`\`\`

### 3. Object.freeze(obj)
Eng qattiq himoya (Muzlatish). **Mutlaqo hech narsa qilib bo'lmaydi**. Yangi narsa qo'shilmaydi, o'chirilmaydi, o'zgartirilmaydi. Obyekt to'liq "Read-only" (faqat o'qish uchun) holatga keladi.
(Orqa fonda u hamma kalitlarni \`configurable: false\` va \`writable: false\` qilib chiqadi).

\`\`\`javascript
const Constants = { PI: 3.14, MAX_USERS: 100 };

Object.freeze(Constants);

Constants.PI = 3.1415; // Xato!
Constants.MIN_USERS = 0; // Xato!
delete Constants.MAX_USERS; // Xato!

console.log(Object.isFrozen(Constants)); // true
\`\`\`

**Muhim ogohlantirish (Shallow Freeze):**
\`Object.freeze()\` qilingan obyekt ichida boshqa ichki obyekt yoki massiv bo'lsa, o'sha **ichki obyektlar muzlamaydi**! 
Buning uchun maxsus "Deep Freeze" rekursiv funksiyasi yozilishi kerak bo'ladi.

### 4. Object.is() (Bonus taqqoslash)
Taqqoslashlar darsida biz \`===\` ni eng ishonchli degan edik. Lekin \`===\` ning 2 ta g'alati xatosi bor:
1. U \`NaN === NaN\` ni \`false\` deydi.
2. U \`+0 === -0\` ni \`true\` deydi (vaxolanki bular matematikada va binar xotirada har xil).

Shu kichik xatolarni tuzatib, **mukammal taqqoslash** qilish uchun ECMAScript 6 da \`Object.is(a, b)\` qo'shilgan:

\`\`\`javascript
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(0 === -0);              // true
console.log(Object.is(0, -0));      // false
\`\`\`

### Xulosa
React va Redux kabi zamonaviy texnologiyalarda "Immutability" (o'zgarmaslik) eng katta qoida hisoblanadi. Siz doim eski state ni mutate (o'zgartirish) qilmasdan, yangisini yaratishingiz kerak. Dastur rivojlanganda aynan shu \`Object.freeze()\` lar orqali qoida buzilishining oldi olinadi.
  `,
  exercises: [
    {
      id: "protect-1",
      title: "Obyektni muzlatish",
      description: `Funksiya qabul qilgan obyektni muzlatib (\`Object.freeze\`), uni qaytarishi kerak.`,
      initialCode: `function makeImmutable(obj) {
  // muzlating va qaytaring
  
}`,
      solution: `function makeImmutable(obj) {
  return Object.freeze(obj);
}`,
      tests: [
        {
          test: `
          const o = { a: 1 };
          makeImmutable(o);
          return Object.isFrozen(o) === true;`,
          description: "Obyekt isFrozen holatiga o'tishi kerak"
        }
      ]
    }
  ]
};
