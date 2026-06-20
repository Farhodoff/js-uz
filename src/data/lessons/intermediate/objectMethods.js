export const objectMethods = {
  title: "Object Metodlari: keys, values va entries",
  content: `
Obyektlarni (Objects) aylanib chiqish va ulardagi ma'lumotlarni massiv (Array) ko'rinishiga o'tkazish uchun JavaScript bir nechta kuchli static metodlarni taqdim etadi. Bu metodlar backenddan kelgan ma'lumotlarni qayta ishlashda (masalan, ro'yxat chiqarishda) juda ko'p ishlatiladi.

### 1. Object.keys(obj)
Obyektning faqat **kalitlarini (keys)** o'ziga yig'ib, massiv qilib qaytaradi.

\`\`\`javascript
const user = { name: "Ali", age: 25, role: "Admin" };

const keys = Object.keys(user);
console.log(keys); // ["name", "age", "role"]

// Array metodlaridan bemalol foydalanish mumkin
keys.forEach(key => console.log(key));
\`\`\`

### 2. Object.values(obj)
Obyektning faqat **qiymatlarini (values)** o'ziga yig'ib, massiv qilib qaytaradi.

\`\`\`javascript
const salaries = { john: 1000, pete: 1600, mary: 2500 };

const values = Object.values(salaries);
console.log(values); // [1000, 1600, 2500]

// Masalan, barcha oyliklarni qo'shish:
const total = values.reduce((sum, val) => sum + val, 0);
console.log(total); // 5100
\`\`\`

### 3. Object.entries(obj)
Eng ko'p ishlatiladigan metod. U obyektning har bir kalit-qiymat juftligini alohida massiv \`[key, value]\` qilib, barchasini bitta katta massiv ichida qaytaradi. Obyekt ustida \`for...of\` tsiklini ishlatish uchun ideal.

\`\`\`javascript
const car = { brand: "BMW", year: 2023, color: "Black" };

const entries = Object.entries(car);
// [ ["brand", "BMW"], ["year", 2023], ["color", "Black"] ]

// for...of va Destructuring orqali qulay o'qish
for (const [key, value] of Object.entries(car)) {
  console.log(\`Mashina \${key}i: \${value}\`);
}
\`\`\`

### 4. Object.fromEntries(iterable)
Agar sizda \`[key, value]\` ko'rinishidagi massivlar yig'indisi bo'lsa, uni qaytadan to'laqonli Obyektga aylantirish uchun ishlatiladi. Bu \`Object.entries()\` ning to'liq teskarisidir.

\`\`\`javascript
const arr = [
  ["name", "Hasan"],
  ["age", 30]
];

const newObj = Object.fromEntries(arr);
console.log(newObj); // { name: "Hasan", age: 30 }
\`\`\`

**Amaliy misol (Map va Filter):**
Faraz qiling, oyliklar ro'yxatidan faqat katta oyliklarni qoldirmoqchimiz. Obyektda \`.filter()\` metodi yo'q. Biz uni avval massivga aylantirib (entries), keyin filtrlashimiz va oxirida qayta obyektga aylantirishimiz (fromEntries) mumkin:

\`\`\`javascript
const prices = { apple: 10, banana: 5, cherry: 20 };

// 1. entries: [["apple", 10], ["banana", 5], ...]
// 2. filter: 10 dan qimmatlarini qoldiramiz
// 3. fromEntries: qayta obyektga yig'amiz
const expensiveFruits = Object.fromEntries(
  Object.entries(prices).filter(([fruit, price]) => price > 10)
);

console.log(expensiveFruits); // { cherry: 20 }
\`\`\`
  `,
  exercises: [
    {
      id: "obj-methods-1",
      title: "Obyekt uzunligini aniqlash",
      description: `JavaScript-da obyektlarning '.length' xususiyati yo'q. Berilgan obyektda nechta kalit borligini hisoblovchi 'countProperties' funksiyasini yozing.`,
      initialCode: `function countProperties(obj) {
  // Object.keys dan foydalaning
  
}`,
      solution: `function countProperties(obj) {
  return Object.keys(obj).length;
}`,
      tests: [
        {
          test: `
          const o1 = { a: 1, b: 2 };
          const o2 = {};
          return countProperties(o1) === 2 && countProperties(o2) === 0;`,
          description: "Obyektdagi kalitlar sonini to'g'ri sanashi kerak"
        }
      ]
    },
    {
      id: "obj-methods-2",
      title: "Qiymatlarni ikki baravar oshirish",
      description: `Berilgan obyektning (masalan: { a: 1, b: 2 }) barcha qiymatlarini 2 marta oshirib, yangi obyekt ({ a: 2, b: 4 }) qaytaruvchi 'doubleValues' funksiyasini tuzing. Object.entries va Object.fromEntries dan foydalaning.`,
      initialCode: `function doubleValues(obj) {
  // 1. Obyektni [key, value] massiviga aylantiring
  // 2. Array.map yordamida qiymatni ko'paytiring
  // 3. Qayta obyekt qilib qaytaring
  
}`,
      solution: `function doubleValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value * 2])
  );
}`,
      tests: [
        {
          test: `
          const res = doubleValues({ x: 5, y: 10 });
          return res.x === 10 && res.y === 20;`,
          description: "Barcha qiymatlar ikkiga ko'paytirilishi kerak"
        }
      ]
    }
  ]
};
