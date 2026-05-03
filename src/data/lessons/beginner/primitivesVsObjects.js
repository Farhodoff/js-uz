export const primitivesVsObjects = {
  id: "primitives-vs-objects",
  title: "Primitivlar vs Obyektlar va Prototype",
  theory: `## Primitive Types vs Objects

JavaScriptda ma’lumot turlari ikki toifaga bo‘linadi: **Primitive** va **Object**.

### 1. Primitive Types (Primitiv turlar)
Primitive – bu oddiy, o‘zgarmas (immutable) qiymat. 
- **Turlari:** string, number, boolean, undefined, null, symbol, bigint.
- **Xususiyati:** Qiymat bo‘yicha saqlanadi (by value).
\`\`\`javascript
let a = 10;
let b = a; // nusxalandi
b = 20;
console.log(a); // 10 (o'zgarmadi)
\`\`\`

### 2. Object (Murakkab tur)
Object – bir nechta xususiyat va metodlarni o‘z ichiga olgan kollektsiya.
- **Turlari:** obyektlar, massivlar, funksiyalar.
- **Xususiyati:** Referens bo‘yicha saqlanadi (by reference).
\`\`\`javascript
let obj1 = { val: 10 };
let obj2 = obj1; // bir xil referens
obj2.val = 20;
console.log(obj1.val); // 20 (o'zgardi!)
\`\`\`

---

## 3. Object Prototype

**Prototype** – JavaScriptda meros (inheritance) mexanizmi. Har bir obyektning o‘ziga xos **prototype** (asl nusxa) deb ataladigan yashirin xususiyati bor.

### Prototype Chain (Zanjir):
Obyekt xususiyatiga murojaat qilganingizda, JS avval obyektning o‘zidan, topmasa prototype zanjiri bo‘ylab yuqoridan qidiradi.

\`\`\`javascript
let animal = { eats: true };
let rabbit = { jumps: true };
rabbit.__proto__ = animal; // meros olish

console.log(rabbit.eats); // true (prototypedan olindi)
\`\`\`

### Nima uchun prototype muhim?
- **Xotirani tejaydi:** Metodlar har bir obyektda emas, bitta prototypeda saqlanadi.
- **Meros olish:** Obyektlar boshqa obyektlardan xususiyatlarni “meros” oladi.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Primitive va object farqini ayting.**
2. **Object referens bo'yicha saqlanishi nimani anglatadi?**
3. **Object prototypi nima?**

### Middle daraja
4. **Prototype chain qanday ishlaydi?**
5. **Object.create(null) nima qiladi va u qayerda foydali?**
6. **"__proto__" va "prototype" farqi nimada?**`,
  task: `// 1. Primitive vs Object: O'zgaruvchi qiymatini nusxalang (number) va o'zgartiring. Keyin obyektni nusxalab, uning xususiyatini o'zgartiring. Farqni ko'ring.
// 2. Prototype: "car" obyektini yarating (brand: "Tesla"). Keyin "myCar" obyektini yaratib, uning prototipi qilib "car"ni belgilang.
// 3. Constructor funksiya yarating: "Person(name)". Uning prototype qismiga "sayHello" metodini qo'shing.
// 4. Taqqoslash: {} === {} nima qaytaradi va nega?

// Kodingizni shu yerga yozing`,
  hint: `// 1. Reference
let user1 = { name: "Ali" };
let user2 = user1;
user2.name = "Vali";
console.log(user1.name); // "Vali"

// 2. Prototype
let car = { brand: "Tesla" };
let myCar = Object.create(car);
console.log(myCar.brand); // "Tesla"

// 3. Constructor Prototype
function Person(name) { this.name = name; }
Person.prototype.sayHello = function() { console.log("Salom, " + this.name); };
let ali = new Person("Ali");
ali.sayHello();`
};
