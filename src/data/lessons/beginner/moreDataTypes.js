export const moreDataTypesLesson = {
  id: "b3",
  title: "Ma'lumotlar Turlari: Null, Symbol, BigInt",
  theory: `## Ma'lumotlar Turlari: Null, Symbol, BigInt

JavaScriptda 8 ta ma’lumot turi mavjud. Oldingi darsda **String, Number, Boolean, Undefined** ni ko‘rdik. Endi qolgan primitiv turlarni ko‘ramiz.

### 1. Null
**null** – “hech narsa”, “bo‘sh”, “qiymat yo‘q” degan ma’noni **dasturchi o‘zi ataylab** beradigan qiymat.
- \`typeof null\` → \`"object"\` (JavaScriptning mashhur xatosi).
- \`null\` vs \`undefined\`: \`undefined\` – JS avtomatik beradi, \`null\` – dasturchi beradi.

### 2. Symbol (ES6)
**Symbol** – **unikal** (takrorlanmaydigan) va **o‘zgarmas** qiymat yaratish uchun ishlatiladi. 
- Asosan obyektlarning **maxfiy kalitlari** yoki nomlar to‘qnashuvining oldini olish uchun ishlatiladi.
- \`let sym1 = Symbol("id"); let sym2 = Symbol("id");\` – \`sym1 === sym2\` har doim \`false\`.

### 3. BigInt (ES2020)
**BigInt** – juda katta butun sonlar bilan ishlash uchun (\`2^53 - 1\` dan katta sonlar).
- Yaratish: Son oxiriga \`n\` qo‘yiladi: \`9007199254740991n\` yoki \`BigInt()\` funksiyasi.
- **Qoida:** \`BigInt\` va \`Number\` ni to‘g‘ridan-to‘g‘ri aralashtirib (qo'shib, ayirib) bo‘lmaydi.

### 4. Object (Murakkab tur)
**Object** – primitiv bo‘lmagan, bir nechta qiymatlarni (xususiyat va metodlarni) o‘z ichiga oladi. Keyingi darslarda batafsil to'xtalamiz.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **null va undefined o‘rtasidagi asosiy farqni ayting.**
2. **typeof null nima qaytaradi va nega?**
3. **Symbol nima va u qayerda ishlatiladi?**

### Middle daraja
4. **Symbol.for() va Symbol() farqi nimada?**
5. **Nima uchun BigInt kerak? Oddiy Number yetarli emasmi?**
6. **BigInt bilan ishlaganda bo'lish (division) natijasi qanday bo'ladi?**`,
  task: `// 1. null va undefined o'rtasidagi farqni == va === operatorlari bilan tekshiring.
// 2. Ikkita bir xil tavsifli Symbol yarating va ularni solishtiring.
// 3. Symbol yordamida obyektda "yashirin" xususiyat yarating.
// 4. Number.MAX_SAFE_INTEGER dan katta son yarating (BigInt yordamida).
// 5. BigInt sonni oddiy Numberga o'tkazib ko'ring va aksincha.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Equality
console.log(null == undefined); // true
console.log(null === undefined); // false

// 2. Symbols
let s1 = Symbol("id");
let s2 = Symbol("id");
console.log(s1 === s2); // false

// 3. Hidden property
const ID = Symbol("id");
let user = { [ID]: 1, name: "Ali" };
console.log(user[ID]);

// 4. BigInt
let big = 123456789012345678901234567890n;
let alsoBig = BigInt("999999999999999999");`
};
