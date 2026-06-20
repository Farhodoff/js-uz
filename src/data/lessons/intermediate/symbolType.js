export const symbolType = {
  title: "Symbol Ma'lumot Turi va Yashirin Xususiyatlar",
  content: `
JavaScript-da \`Symbol\` ES6 (2015) da qo'shilgan **yettinchi primitiv** ma'lumot turidir. U odatda obyektlar uchun yashirin, boshqalar tasodifan o'zgartirib qo'ymaydigan **noyob (unique) kalitlar** yaratish uchun ishlatiladi.

### 1. Symbol Yaratish
Symbol obyekti emas, u primitivdir. Shuning uchun \`new Symbol()\` deb yozilmaydi.
U har safar yangi chaqirilganda **mutlaqo noyob (unique)** qiymat qaytaradi.

\`\`\`javascript
const sym1 = Symbol();
const sym2 = Symbol();

console.log(sym1 === sym2); // false (Ikkisi butunlay boshqa)

// Yaratishda unga "tavsif" (description) berish mumkin (faqat debug uchun)
const id = Symbol("Foydalanuvchi IDsi");
console.log(id.description); // "Foydalanuvchi IDsi"
\`\`\`

### 2. Obyektlarda Yashirin Kalit Sifatida
Odatda obyekt kalitlari faqat \`String\` (satr) bo'ladi. Agar siz begona kutubxonadan (library) obyekt olsangiz va unga o'zingizning qandaydir ma'lumotingizni qo'shmoqchi bo'lsangiz, asl kalitlar bilan to'qnashib ketmasligi uchun Symbol dan foydalanasiz.

\`\`\`javascript
const user = { name: "John", age: 30 };

// Kutubxona obyektiga o'zimizning ID ni qo'shamiz
const myId = Symbol("id");
user[myId] = 12345;

console.log(user[myId]); // 12345
\`\`\`

**Nega u yashirin?**
Symbol bilan yaratilgan kalitlar \`for...in\` tsiklida yoki \`Object.keys()\` da ko'rinmaydi. Ular xuddi ko'rinmas plash kiygan xususiyatlarga o'xshaydi:
\`\`\`javascript
for (let key in user) {
  console.log(key); // faqat "name" va "age" chiqadi
}
console.log(Object.keys(user)); // ["name", "age"]
\`\`\`
Uni topish uchun ataylab \`Object.getOwnPropertySymbols(user)\` ni ishlatish kerak.

### 3. Global Symbol Registry
Ba'zida siz dastur bo'ylab (hatto boshqa fayllarda ham) aynan bitta bir xil Symbol ni ishlatishingizga to'g'ri keladi. Buning uchun Global Registry (\`Symbol.for()\`) dan foydalanamiz.

\`\`\`javascript
// Global ro'yxatdan "app.id" nomli symbolni o'qiydi (yo'q bo'lsa yaratadi)
const id1 = Symbol.for("app.id");
const id2 = Symbol.for("app.id");

console.log(id1 === id2); // true! Ikkisi endi mutlaqo bir xil.
\`\`\`

### 4. Tizim Symbollari (Well-known Symbols)
JavaScript o'zining ichki mexanizmlari qanday ishlashini belgilash uchun tayyor tizim symbollaridan foydalanadi (Ular \`Symbol.*\` orqali chaqiriladi).
Eng mashhuri \`Symbol.iterator\`. 
Masalan, bizning oddiy obyektni \`for...of\` tsiklida aylantirib bo'lmaydi. Ammo unga \`Symbol.iterator\` xususiyatini qo'shib, o'zimizning maxsus aylanish mantiqimizni yozsak, u xuddi massivdek aylanadigan bo'lib qoladi.

\`\`\`javascript
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// Endi bu obyekt ustida tsikl ishlaydi!
for (let num of range) {
  console.log(num); // 1, 2, 3
}
\`\`\`

### Xulosa
Symbol asosan murakkab kutubxonalar yozayotganda kalit nomlari bir-biriga to'qnashib ketmasligi uchun (Collision), obyekt ichiga "ko'rinmas" qo'shimcha xususiyatlar yozishda va JavaScript-ning standart xatti-harakatlarini (iterator, toPrimitive) o'zgartirishda ishlatiladi.
  `,
  exercises: [
    {
      id: "symbol-1",
      title: "Symbol xususiyatini qo'shish",
      description: `Funksiyaga 'obj' va bitta string parametr keladi. Shu string parametridan foydalanib global Symbol yarating (Symbol.for) va shu obyektga 100 qiymatini tenglab qo'ying. Funksiya o'zgartirilgan obyektni qaytarsin.`,
      initialCode: `function addGlobalSymbol(obj, symbolKey) {
  // 1. Symbol.for orqali symbol yarating
  // 2. obj[sym] = 100
  // 3. return obj;
  
}`,
      solution: `function addGlobalSymbol(obj, symbolKey) {
  const sym = Symbol.for(symbolKey);
  obj[sym] = 100;
  return obj;
}`,
      tests: [
        {
          test: `
          const o = {};
          addGlobalSymbol(o, 'testKey');
          const sym = Symbol.for('testKey');
          return o[sym] === 100 && Object.keys(o).length === 0;`,
          description: "Obyektga global symbol bilan 100 qiymati biriktirilishi va u Object.keys da ko'rinmasligi kerak"
        }
      ]
    }
  ]
};
