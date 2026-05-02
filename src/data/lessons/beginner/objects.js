export const objects = {
  id: "objects",
  title: "Obyektlar (Objects)",
  level: "Beginner",
  description: "Ma'lumotlarni tartibli saqlash: kalit va qiymat juftligi haqida.",
  theory: `
# Obyektlar – Bu nima va nima uchun kerak?

**Obyekt** — bu bir-biriga bog'liq bo'lgan ma'lumotlarni bitta "konteyner" ichida saqlash usulidir. Ular **kalit: qiymat** (key: value) ko'rinishida yoziladi.

## 1. NEGA kerak?
Tasavvur qiling, sizda foydalanuvchi ma'lumotlari bor: \`ism\`, \`yosh\`, \`shahar\`. Ularni alohida o'zgaruvchilarda saqlasangiz, tartibsizlik bo'ladi. Obyekt esa ularni bitta butun narsa (shaxs) sifatida birlashtiradi.

## 2. SODDALIK (Analogiya)
Obyektni **shkaf** deb tasavvur qiling. Shkafning har bir tortmasida (kalitida) o'z narsasi (qiymati) bor. Masalan: "paypoqlar" tortmasida — paypoqlar, "ko'ylaklar" tortmasida — ko'ylaklar.

## 3. STRUKTURA

### A. Obyekt yaratish
\`\`\`javascript
const shaxs = {
  ism: "Ali", // ism - kalit, "Ali" - qiymat
  yosh: 25,
  shahar: "Toshkent"
};
\`\`\`

### B. Ma'lumotni o'qish (Dot va Bracket notation)
\`\`\`javascript
console.log(shaxs.ism); // Ali (Dot notation)
console.log(shaxs["yosh"]); // 25 (Bracket notation)
\`\`\`

### C. O'zgartirish va Qo'shish
\`\`\`javascript
shaxs.yosh = 26; // Qiymatni yangilash
shaxs.kasb = "Dasturchi"; // Yangi kalit qo'shish
delete shaxs.shahar; // Kalitni o'chirish
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const mashina = {
  model: "Tesla",
  yurish() {
    console.log("Mashina yurmoqda...");
  }
};
mashina.yurish();
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Vergulni unutish:** Har bir qatordan keyin vergul qo'yishni unutmang.
2. **Bracket notation qachon kerak:** Agar kalit nomi o'zgaruvchida bo'lsa yoki ichida bo'sh joy bo'lsa, \`[]\` ishlatish shart.

## 6. SAVOLLAR (12 ta)
1. Obyekt nima?
2. Kalit va qiymat nima?
3. Obyekt yaratishda qaysi qavslar ishlatiladi?
4. Dot notation (\`.\`) nima?
5. Bracket notation (\`[]\`) qachon ishlatiladi?
6. Obyektga yangi xususiyat qanday qo'shiladi?
7. Obyektdagi xususiyatni qanday o'chirish mumkin?
8. Obyekt ichidagi funksiya nima deyiladi (Metod)?
9. \`Object.keys()\` nima qaytaradi?
10. \`Object.values()\` nima qaytaradi?
11. Obyekt ichida boshqa obyekt bo'lishi mumkinmi?
12. Obyektni nusxalashda spread (\`...\`) qanday ishlatiladi?`,
  exercises: [
    {
      id: 1,
      title: "Obyekt mashqi",
      instruction: "'book' obyekti yarating, ichida 'title' va 'author' bo'lsin.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const book = { title: 'JS', author: 'Farhod' };",
      test: "if (result.title && result.author) return null; return 'Obyekt noto\\'g\\'ri';"
    }
  ]
};
