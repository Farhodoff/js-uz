export const classesLesson = {
  id: "i7",
  title: "Klasslar (Classes - ES6)",
  theory: `## JavaScriptda Klasslar (Classes)

JavaScriptda **class** – obyektlarni yaratish uchun shablon (template). Ular prototype-based inheritance uchun qulayroq sintaksis (syntactic sugar) hisoblanadi.

---

### 1. Class e’lon qilish
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log("Salom, ismim " + this.name);
  }
}
let ali = new Person("Ali", 25);
ali.greet();
\`\`\`

### 2. Meros olish (Inheritance) – extends
\`extends\` yordamida bir klass boshqa klassdan meros olishi mumkin. \`super()\` parent klass constructorini chaqirish uchun ishlatiladi.
\`\`\`javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // majburiy
    this.breed = breed;
  }
}
\`\`\`

### 3. Statik metodlar (static)
\`static\` metodlar klassning o‘ziga tegishli, obyektga emas.
\`\`\`javascript
class MathUtils {
  static add(a, b) { return a + b; }
}
console.log(MathUtils.add(5, 10));
\`\`\`

### 4. Private (maxfiy) maydonlar – #
\`#\` belgisi bilan boshlanadigan xususiyatlar klassdan tashqarida ko‘rinmaydi.
\`\`\`javascript
class BankAccount {
  #balance = 0;
  deposit(m) { this.#balance += m; }
}
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **JavaScript class nima?**
2. **constructor metodi nima vazifani bajaradi?**
3. **extends va super() farqi nimada?**

### Middle daraja
4. **Nima uchun klasslar "syntactic sugar" deyiladi?**
5. **Private (#) maydonlar qanday afzallik beradi?**
6. **static metod bilan oddiy metod farqi nimada?**`,
  task: `// 1. "Car" klassini yarating: brand, year xususiyatlari va getInfo() metodi bo'lsin.
// 2. "ElectricCar" klassini yarating, u "Car"dan meros olsin va batteryCapacity qo'shimcha xususiyati bo'lsin.
// 3. getInfo() metodini "ElectricCar"da override qilib, batareya quvvatini ham chiqaring.
// 4. "Rectangle" klassida "area" getter metodini yarating (width * height).
// 5. Private maydon "#id" bo'lgan "User" klassini yarating va unga faqat ichki metod orqali qiymat bering.

// Kodingizni shu yerga yozing`,
  hint: `// 1 & 2. Classes and Inheritance
class Car {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }
  getInfo() { return this.brand + " " + this.year; }
}

class ElectricCar extends Car {
  constructor(brand, year, battery) {
    super(brand, year);
    this.battery = battery;
  }
  getInfo() { return super.getInfo() + " Battery: " + this.battery; }
}

// 4. Getter
class Rectangle {
  constructor(w, h) { this.w = w; this.h = h; }
  get area() { return this.w * this.h; }
}`
};
