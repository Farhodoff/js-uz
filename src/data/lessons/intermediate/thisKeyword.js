export const thisKeyword = {
  id: "this-keyword",
  title: "this kaliti va Kontekst",
  level: "Intermediate",
  description: "JavaScriptdagi eng ko'p tushunmovchilikka sabab bo'ladigan 'this' kalit so'zini o'rganamiz.",
  theory: `
# this kalit so'zi – Bu nima va nima uchun kerak?

JavaScriptda **this** kalit so'zi funksiya qaysi obyektdan turib chaqirilayotganiga ishora qiladi. U har doim "kim haqida gapiryapmiz?" degan savolga javob beradi.

## 1. NEGA kerak?
Tasavvur qiling, sizda mingta foydalanuvchi obyekti bor. Ularning har biri uchun alohida "salom berish" funksiyasini yozish xotirani band qiladi. Bitta funksiya yozib, \`this\` orqali "shu foydalanuvchining ismini ol" deyish ancha aqlli yechimdir.

## 2. SODDALIK (Analogiya)
Siz "Mening ismim Farhod" deganingizda, "mening" so'zi Farhodga tegishli. Agar boshqa odam "Mening ismim Ali" desa, "mening" so'zi Aliga tegishli. \`this\` — bu JSdagi "mening" yoki "o'zimning" degan so'zdir.

## 3. STRUKTURA

### A. Global kontekstda
Agar \`this\` hech qanday obyekt ichida bo'lmasa, u global obyektga (\`window\`) ishora qiladi:
\`\`\`javascript
console.log(this); // window (brauzerda)
\`\`\`

### B. Obyekt ichida (Method)
Metod ichida \`this\` o'sha obyektning o'ziga ishora qiladi:
\`\`\`javascript
const user = {
  name: "Farhod",
  sayHi() {
    console.log("Salom, " + this.name);
  }
};
user.sayHi(); // Salom, Farhod
\`\`\`

### C. Arrow functions
**Muhim!** Arrow funksiyalarda o'zining \`this\`i bo'lmaydi. U o'zidan tepasidagi (parent) \`this\`ni oladi:
\`\`\`javascript
const user = {
  name: "Ali",
  hi: () => console.log(this.name) // window.name ni qidiradi
};
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const mashina = {
  model: "Tesla",
  start() {
    console.log(this.model + " o't oldi!");
  }
};
mashina.start();
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Yo'qotilgan kontekst:** Funksiyani o'zgaruvchiga saqlab, keyin chaqirsangiz \`this\` yo'qoladi.
2.  **Arrow functions metod sifatida:** Obyekt metodlarini yozishda arrow funksiya ishlatmang, aks holda \`this\` ishlamaydi.

## 6. SAVOLLAR (12 ta)
1. \`this\` so'zining asosiy ma'nosi nima?
2. Global kontekstda \`this\` nima qaytaradi?
3. Obyekt metodida \`this\` nimaga teng?
4. Arrow funksiyalarda \`this\` bormi?
5. \`strict mode\`da global \`this\` nima bo'ladi (\`undefined\`)?
6. \`bind\`, \`call\`, \`apply\` nima uchun kerak?
7. Nima uchun arrow funksiyani obyekt metodi qilib ishlatmaslik kerak?
8. \`setTimeout\` ichidagi \`this\` muammosini qanday hal qilish mumkin?
9. "Context" (Kontekst) nima?
10. \`new\` kalit so'zi bilan chaqirilgan funksiyada \`this\` nima bo'ladi?
11. \`this\`ning qiymati funksiya yozilganda aniqlanadimi yoki chaqirilgandami?
12. HTML eventlarida (masalan, \`onclick\`) \`this\` nimaga ishora qiladi?`,
  exercises: [
    {
      id: 1,
      title: "This mashqi",
      instruction: "Obekt ichidagi 'name'ni 'this' orqali qaytaradigan metod yozing.",
      startingCode: "const obj = {\n  name: 'Loyiha',\n  getName() {\n    // Bu yerga yozing\n  }\n};",
      hint: "return this.name;",
      test: "if (obj.getName() === 'Loyiha') return null; return 'this.name ishlatilmadi';"
    }
  ]
};
