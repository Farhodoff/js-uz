export const propertyDescriptors = {
  title: "Property Descriptors (Xususiyatlarni sozlash)",
  content: `
Odatda biz obyektga xususiyatni shunchaki \`obj.name = "Ali"\` qilib qo'shamiz. Lekin buning ortida brauzer bu xususiyat uchun maxsus ko'rinmas "sozlamalar" (Descriptors) yaratadi. JavaScript bizga ushbu sozlamalarga kirish va ularni o'zgartirish imkonini beradi.

### 1. Descriptor nima o'zi?
Obyektdagi har bir kalit-qiymat juftligi faqat qiymatdan emas, balki 3 ta yashirin bayroqchadan (flags) ham iborat bo'ladi:
* **\`writable\`** – Agar \`true\` bo'lsa, qiymatni o'zgartirish mumkin. \`false\` bo'lsa faqat o'qiladi (read-only).
* **\`enumerable\`** – Agar \`true\` bo'lsa, bu kalit \`for...in\` tsiklida va \`Object.keys()\` da ko'rinadi.
* **\`configurable\`** – Agar \`true\` bo'lsa, ushbu xususiyatni o'chirib tashlash (delete) yoki uning descriptorlarini qayta o'zgartirish mumkin.

Barcha bayroqchalar odatiy tarzda xususiyat qo'shganda **\`true\`** bo'ladi.

### 2. Sozlamalarni o'qish
Ushbu yashirin bayroqlarni ko'rish uchun \`Object.getOwnPropertyDescriptor(obj, propName)\` ishlatiladi.

\`\`\`javascript
const user = { name: "John" };

const descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
/* 
{
  value: "John",
  writable: true,
  enumerable: true,
  configurable: true
}
*/
\`\`\`

### 3. Sozlamalarni o'zgartirish (defineProperty)
Maxsus sozlamalari bo'lgan yangi xususiyat qo'shish yoki borini o'zgartirish uchun \`Object.defineProperty(obj, propName, descriptor)\` dan foydalanamiz.
**Muhim:** Agar \`defineProperty\` orqali mutlaqo yangi xususiyat qo'shsangiz, ko'rsatilmagan bayroqchalar avtomatik **\`false\`** deb o'rnatiladi!

**Misol: Faqat o'qish uchun (Read-only) qilib qo'yish:**
\`\`\`javascript
const user = {};

Object.defineProperty(user, "name", {
  value: "John",
  writable: false // O'zgartirish mumkin emas
  // enumerable: false, configurable: false (avtomatik shunday bo'ladi)
});

user.name = "Pete"; // Xato (Strict rejimda xato tashlaydi, oddiy rejimda shunchaki ishlamaydi)
console.log(user.name); // "John"
\`\`\`

**Misol: Tsikllardan yashirish (enumerable: false):**
\`\`\`javascript
const user = {
  name: "John",
  toString() { return this.name; }
};

// "toString" funksiyasini for...in da ko'rinmaydigan qilib qo'yamiz
Object.defineProperty(user, "toString", {
  enumerable: false
});

for(let key in user) {
  console.log(key); // Faqat "name" chiqadi
}
\`\`\`

### 4. Getters va Setters
Descriptorlar nafaqat qiymat (value), balki maxsus funksiyalar (get/set) orqali ishlashi ham mumkin. Bular **Accessor properties** deyiladi. Ular oddiy xususiyatdek o'qiladi/yoziladi, lekin orqa fonda funksiya ishlaydi.

\`\`\`javascript
const user = {
  firstName: "John",
  lastName: "Smith",
  
  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  },
  
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};

console.log(user.fullName); // "John Smith" (get ishladi)

user.fullName = "Alice Cooper"; // (set ishladi)
console.log(user.firstName); // "Alice"
\`\`\`
*(Izoh: Agar descriptor ichida \`get\` yoki \`set\` ishlatsangiz, u yerda \`value\` yoki \`writable\` yozib bo'lmaydi)*

### Xulosa
Library yoki Framework (Vue, MobX) yozayotganda, yoki API lardan olinayotgan obyektlarning ba'zi muhim ID larini odamlar tasodifan o'zgartirib yubormasligi (read-only) uchun Property Descriptors eng zo'r quroldir.
  `,
  exercises: [
    {
      id: "descriptor-1",
      title: "Read-only xususiyat yaratish",
      description: `Funksiya obyekt va kalit/qiymat qabul qiladi. Shu kalit bilan obyektga qiymatni qo'shing, lekin uni keyinchalik o'zgartirib bo'lmaydigan (read-only) qilib sozlang. \`Object.defineProperty\` dan foydalaning.`,
      initialCode: `function addReadOnlyProperty(obj, key, value) {
  // defineProperty orqali writable: false qilib sozlang
  
}`,
      solution: `function addReadOnlyProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: false,
    enumerable: true,
    configurable: true
  });
}`,
      tests: [
        {
          test: `
          const o = {};
          addReadOnlyProperty(o, "id", 123);
          const desc = Object.getOwnPropertyDescriptor(o, "id");
          return desc.value === 123 && desc.writable === false;`,
          description: "xususiyat o'zgartirib bo'lmaydigan (writable: false) bo'lishi kerak"
        }
      ]
    }
  ]
};
