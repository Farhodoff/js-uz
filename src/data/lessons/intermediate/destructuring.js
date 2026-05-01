export const destructuring = {
  id: "m1",
  title: "Destructuring - Ma'lumotlarni qutidan chiqarish",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda katta bir sovg'a qutisi (obyekt) bor. Ichidagi o'yinchoqlarni olish uchun har safar qutini ochib, "quti ichidagi ayiqcha", "quti ichidagi koptok" deb chaqirish noqulay.

**Destructuring** (Ochish) — bu qutini bir marta ochib, ichidagi hamma narsani alohida o'zgaruvchilarga olib chiqish usulidir.

---

## 2. OBYEKTNI OCHISH (Tushuntir → Ko'rsat → Bajartir)
Obyekt ichidagi ma'lumotlarni kalit so'zlari orqali ajratib olamiz.

**Ko'rsat:**
\`\`\`javascript
const user = { name: "Ali", age: 25 };
const { name, age } = user;
console.log(name); // "Ali"
\`\`\`

**Mashq:** \`mashina\` obyektidan \`model\` va \`yil\`ni ajratib oling.

---

## 3. MASSIVNI OCHISH
Massivlarda tartib (index) muhim. Birinchi element birinchi o'zgaruvchiga tushadi.

**Ko'rsat:**
\`\`\`javascript
const ranglar = ["qizil", "yashil"];
const [r1, r2] = ranglar;
console.log(r1); // "qizil"
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Noto'g'ri qavslar:** Obyekt uchun \`{ }\`, massiv uchun \`[ ]\` ishlatish shart!
2.  **Mavjud bo'lmagan kalit:** Agar obyektda kalit bo'lmasa, o'zgaruvchi \`undefined\` bo'ladi.

---

## 5. BUZIB KO'RISH 🧐
**Nima bo'ladi agar bizga faqat massivning 3-elementi kerak bo'lsa?**
\`\`\`javascript
const sonlar = [10, 20, 30, 40];
const [, , uchinchi] = sonlar; // Birinchi ikkitasini vergul bilan tashlab ketamiz
console.log(uchinchi); // 30
\`\`\`

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **Destructuring nima? (Junior)**
   *Javob:* Obyekt yoki massiv ichidagi qiymatlarni o'zgaruvchilarga ajratib olish sintaksisi.

2. **O'zgaruvchi nomini o'zgartirish. (Junior - Amaliy)**
   *Vazifa:* \`{ name: ism }\` ko'rinishida nomini o'zgartirib oling.

3. **Default qiymat berish. (Junior - Amaliy)**
   *Vazifa:* Agar obyektda \`job\` bo'lmasa, default "Ishsiz" bo'lsin: \`{ job = "Ishsiz" }\`.

4. **Nested (Ichma-ich) destructuring. (Middle - Amaliy)**
   *Vazifa:* \`user.address.city\` ni bitta qatorda ajratib oling.

5. **Funksiya parametrida destructuring. (Middle - Amaliy)**
   *Vazifa:* Funksiyaga obyekt yuboring va parametrning o'zida uni oching: \`function test({ name }) { ... }\`.

6. **Massivdan qolgan hamma elementni olish. (Junior)**
   *Javob:* Rest \`...\` operatori orqali: \`const [bir, ...qolgan] = arr;\`.

7. **Ikki o'zgaruvchi qiymatini almashtirish (Swap). (Middle)**
   *Vazifa:* \`[a, b] = [b, a]\` orqali uchinchi o'zgaruvchisiz qiymatni almashtiring.

8. **Stringni destructuring qilish mumkinmi? (Junior)**
   *Javob:* Ha, \`const [h1, h2] = "JS"\` -> h1="J", h2="S".

9. **Obyekt destructuringda tartib muhimmi? (Junior)**
   *Javob:* Yo'q, kalit nomi to'g'ri bo'lsa kifoya.

10. **Null yoki Undefined ni ochishga urinsa nima bo'ladi? (Middle)**
    *Javob:* Xato beradi (\`TypeError\`).

11. **Dinamik kalit orqali ochish. (Middle - Amaliy)**
    *Vazifa:* O'zgaruvchi ichidagi matn orqali obyektni oching: \`const { [key]: val } = obj;\`.

12. **Massiv destructuringda default qiymat. (Junior - Amaliy)**
    *Vazifa:* \`const [a = 1] = []\` -> a=1 bo'lsin.

---

## 7. CHALLENGE 🏆
Foydalanuvchi obyekti berilgan: uning ismi, yoshi va joylashgan shahri (address ichida) bor. Bitta qatorda ismini \`ism\` o'zgaruvchisiga, shaharni esa \`shahar\` o'zgaruvchisiga ajratib oling.

---

## 8. XULOSA
Siz endi murakkab ma'lumotlarni osongina "bo'laklarga" bo'lishni o'rgandingiz!
`,
  exercises: [
    {
      id: 1,
      title: "Obyektni ochish",
      instruction: "Berilgan 'car' obyektidan 'model' va 'year' ni ajrating.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerga yozing\n",
      hint: "const { model, year } = car;",
      test: "if (logs.includes('Tesla') || result?.model === 'Tesla') return null; return 'Tesla ajratib olinmadi';"
    },
    {
      id: 2,
      title: "Massivni ochish",
      instruction: "Massivdan 2-elementni 'rang' o'zgaruvchisiga oling.",
      startingCode: "const colors = ['red', 'green', 'blue'];\n// Bu yerda oling\n",
      hint: "const [, rang] = colors;",
      test: "if (logs.includes('green') || result === 'green') return null; return 'green olinmadi';"
    }
  ]
};
