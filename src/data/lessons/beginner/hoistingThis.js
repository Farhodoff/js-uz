export const hoistingThisLesson = {
  id: "b13",
  title: "Hoisting va 'this' kalit so'zi",
  theory: `## 1. Hoisting (Ko‘tarilish)

**Hoisting** – JavaScriptning o‘zgaruvchi va funksiya e’lonlarini ularning scope’ining **yuqorisiga ko‘tarish** mexanizmi.

### var, let va const bilan hoisting
- **var**: E’lon ko‘tariladi, lekin qiymati \`undefined\` bo‘ladi.
- **let/const**: Hoisting bo‘ladi, lekin **Temporal Dead Zone (TDZ)** tufayli e’lon qilinishidan oldin ishlatilsa xato beradi.

### Funksiyalarda hoisting
- **Function Declaration**: To‘liq (tanasi bilan) ko‘tariladi. Uni e’lon qilishdan oldin chaqirish mumkin.
- **Function Expression**: O'zgaruvchi kabi hoisting bo'ladi (agar \`var\` bo'lsa \`undefined\`, \`let\` bo'lsa TDZ).

---

## 2. 'this' kalit so‘zi

**this** – hozirgi bajarilayotgan kontekstni (obyektni) ko‘rsatadi. Qiymati funksiya **qayerda va qanday chaqirilganiga** qarab o'zgaradi.

### Asosiy qoidalar:
1. **Global kontekst:** Brauzerda \`this\` – \`window\` obyektini ko‘rsatadi.
2. **Obyekt metodi:** Metod ichida \`this\` o'sha obyektning o'zini ko'rsatadi.
3. **Arrow funksiyalari:** O'zining \`this\`iga ega emas, tashqi (lexical) scope'dagi \`this\`ni oladi.
4. **Constructor:** \`new\` bilan chaqirilganda \`this\` yangi yaratilgan obyektni ko'rsatadi.

### call, apply, bind
Ushbu metodlar funksiyaning \`this\` kontekstini qo'lda (manually) belgilash uchun ishlatiladi:
- **call/apply:** Funksiyani darhol yangi kontekst bilan chaqiradi.
- **bind:** Yangi funksiya qaytaradi, lekin uni darhol chaqirmaydi.`,
  task: `// 1. Hoisting: Funksiya deklaratsiyasini u e'lon qilinishidan oldin chaqirib ko'ring. Keyin funksiya ifodasi (expression) bilan ham shuni qilib ko'ring va farqni ko'ring.
// 2. this: Obyekt yarating va uning metodida "this.name"ni konsolga chiqaring.
// 3. Arrow function: Obyekt ichida arrow function yarating va unda "this" nima ekanini tekshiring.
// 4. call/bind: Bitta funksiyani ikki xil obyekt bilan "call" va "bind" yordamida bog'lab ishlating.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Hoisting
sayHi(); // Ishlaydi
function sayHi() { console.log("Hi"); }

// 2 & 3. this context
const user = {
  name: "Ali",
  regular: function() { console.log(this.name); },
  arrow: () => { console.log(this.name); }
};
user.regular(); // "Ali"
user.arrow();   // undefined (yoki window.name)

// 4. call
function greet() { console.log(this.name); }
greet.call({name: "Vali"});`
};
