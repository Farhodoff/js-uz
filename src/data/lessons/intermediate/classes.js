export const classesLesson = {
  id: "classes",
  title: "Klasslar (Classes)",
  level: "Intermediate",
  description: "Obyektlar yaratish uchun zamonaviy qoliplar (shablonlar) bilan tanishamiz.",
  theory: `
# Klasslar – Bu nima va nima uchun kerak?

**Class** (Klass) — bu obyektlar yaratish uchun tayyor qolip (shablon). JavaScriptda klasslar prototiplar asosida ishlaydi, lekin ularni yozish ancha oson va tushunarli.

## 1. NEGA kerak?
Tasavvur qiling, sizga 100 ta "Mashina" obyekti kerak. Har biri uchun alohida obyekt yozish o'rniga, bitta "Mashina" klassini yaratasiz va undan istalgancha nusxa olasiz. Bu kodni tartibli va qayta ishlatiladigan qiladi.

## 2. SODDALIK (Analogiya)
Klassni **pechenye qolipi** (forma) deb tasavvur qiling. Obyektlar esa o'sha qolipdan chiqqan **pechenyelar**. Qolip bitta, lekin pechenyelar ko'p bo'lishi mumkin.

## 3. STRUKTURA

### A. Klass yaratish
\`\`\`javascript
class Shaxs {
  constructor(ism, yosh) { // Yangi obyekt yaratilganda birinchi ishlaydi
    this.ism = ism;
    this.yosh = yosh;
  }

  salomBer() { // Metod
    console.log("Salom, " + this.ism);
  }
}
const ali = new Shaxs("Ali", 25);
ali.salomBer();
\`\`\`

### B. Meros olish (Inheritance)
Bir klass boshqa klassning xususiyatlarini olishi mumkin:
\`\`\`javascript
class Talaba extends Shaxs {
  constructor(ism, yosh, kurs) {
    super(ism, yosh); // Ota klassning constructorini chaqirish
    this.kurs = kurs;
  }
}
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
class Mashina {
  constructor(model) {
    this.model = model;
  }
}
const myCar = new Mashina("Tesla");
console.log(myCar.model);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **constructor'ni unutish:** Ma'lumotlarni qabul qilish uchun \`constructor\` shart.
2.  **super()'ni unutish:** Meros olganda (extends), \`super()\` chaqirilmasa \`this\` ishlamaydi.

## 6. SAVOLLAR (12 ta)
1. Klass (Class) nima?
2. \`constructor\` nima vazifani bajaradi?
3. Yangi obyekt yaratishda qaysi kalit so'z ishlatiladi (\`new\`)?
4. Klass ichidagi funksiya nima deyiladi?
5. Meros olish uchun qaysi kalit so'z ishlatiladi (\`extends\`)?
6. \`super()\` nima uchun kerak?
7. Klasslar va Prototiplar farqi nima?
8. Statik metod (\`static\`) nima?
9. Private (#) maydonlar nima uchun kerak?
10. Klass nomi qanday harf bilan boshlanishi tavsiya etiladi (Katta)?
11. Bitta klassdan nechta obyekt olish mumkin?
12. Klasslar JSga qachon qo'shilgan (ES6)?`,
  exercises: [
    {
      id: 1,
      title: "Klass yaratish",
      instruction: "'Car' klassini yarating, unda 'model' xususiyati bo'lsin.",
      startingCode: "// Bu yerga yozing\n",
      hint: "class Car { constructor(model) { this.model = model; } }",
      test: "const c = new result('Test'); if (c.model === 'Test') return null; return 'Klass noto\\'g\\'ri';"
    }
  ]
};
