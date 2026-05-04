export const objects = {
  id: "objects",
  title: "Obyektlar (Objects): Ma'lumotlar xazinasi",
  level: "Boshlang'ich",
  description: "Ma'lumotlarni tartibli saqlash: kalit va qiymat juftligi haqida.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, sizda foydalanuvchi ma'lumotlari bor: \`ism\`, \`yosh\`, \`shahar\`. Ularni alohida o'zgaruvchilarda saqlasangiz, kimning yoshi kimga tegishli ekanligini adashtirib yuborasiz. Obyekt esa ularni bitta butun narsa (shaxs) sifatida birlashtiradi.

## 2. SODDALIK (Analogiya)
Obyektni **shkaf** deb tasavvur qiling. Shkafning har bir tortmasida (kalitida) o'z narsasi (qiymati) bor. Masalan: "paypoqlar" tortmasida — paypoqlar, "ko'ylaklar" tortmasida — ko'ylaklar. Siz shkafdan narsalarni olishingiz, qo'shishingiz yoki o'chirishingiz mumkin.

## 3. STRUKTURA

### A. Obyekt yaratish
\`\`\`javascript
const shaxs = {
  ism: "Ali", // ism - kalit (key), "Ali" - qiymat (value)
  yosh: 25,
  shahar: "Toshkent"
};
\`\`\`

### B. Ma'lumotni o'qish (Ikki xil usul)
1. **Dot notation (Nuqta):** \`shaxs.ism\`
2. **Bracket notation (Qavs):** \`shaxs["yosh"]\` (Agarda kalit nomida bo'sh joy bo'lsa yoki o'zgaruvchida kelsa ishlatiladi).

### C. O'zgartirish va Qo'shish
\`\`\`javascript
shaxs.yosh = 26; // Qiymatni yangilash
shaxs.kasb = "Dasturchi"; // Yangi kalit qo'shish
delete shaxs.shahar; // Kalitni o'chirish
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Vergulni unutish:** Har bir xususiyatdan (property) keyin vergul qo'yishni unutmang.
2. **this so'zini adashtirish:** Obyekt metodlari ichida obyektning o'ziga murojaat qilish uchun \`this\` ishlatiladi.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Obyekt nima?</summary>
Kalit va qiymat juftliklaridan tashkil topgan murakkab ma'lumot turi.
</details>

<details>
<summary>2. Kalit (key) nima?</summary>
Obyekt ichidagi ma'lumotning nomi.
</details>

<details>
<summary>3. Obyekt yaratishda qaysi qavslar ishlatiladi?</summary>
Figurali qavslar \`{ }\`.
</details>

<details>
<summary>4. Dot notation (.) nima?</summary>
Obyekt xususiyatiga nuqta orqali murojaat qilish usuli.
</details>

<details>
<summary>5. Bracket notation ([]) qachon ishlatiladi?</summary>
Kalit nomi o'zgaruvchida bo'lsa yoki kalit nomida maxsus belgilar (bo'sh joy, chiziqcha) bo'lsa.
</details>

<details>
<summary>6. Obyektga yangi xususiyat qanday qo'shiladi?</summary>
\`obyekt.yangiKalit = qiymat\` shaklida.
</details>

<details>
<summary>7. Obyektdagi xususiyatni qanday o'chirish mumkin?</summary>
\`delete\` kalit so'zi orqali.
</details>

<details>
<summary>8. Obyekt ichidagi funksiya nima deyiladi?</summary>
Metod (Method).
</details>

<details>
<summary>9. Object.keys() nima qaytaradi?</summary>
Obyektning barcha kalitlaridan iborat massiv.
</details>

<details>
<summary>10. Object.values() nima qaytaradi?</summary>
Obyektning barcha qiymatlaridan iborat massiv.
</details>

<details>
<summary>11. Obyekt ichida boshqa obyekt bo'lishi mumkinmi?</summary>
Ha, buni nested objects (ichma-ich obyektlar) deyiladi.
</details>

<details>
<summary>12. Obyektni nusxalashda spread (...) qanday ishlatiladi?</summary>
\`const yangi = {...eski}\` — bu eski obyektning nusxasini yaratadi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Obyekt yaratish",
      instruction: "'book' obyekti yarating, ichida 'title' va 'author' bo'lsin.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const book = { title: 'JS', author: 'Farhod' };",
      test: "if (code.includes('title') && code.includes('author')) return null; return 'Obyektni to\\'g\\'ri yarating';"
    },
    {
      id: 2,
      title: "Qiymatni o'qish",
      instruction: "'car' obyektidan 'model' qiymatini konsolga chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerga yozing\n",
      hint: "console.log(car.model);",
      test: "if (logs.includes('Tesla')) return null; return 'car.model ni chiqaring';"
    },
    {
      id: 3,
      title: "Metod qo'shish",
      instruction: "'user' obyektiga 'sayHi' metodi qo'shing, u konsolga 'Salom' chiqarsin.",
      startingCode: "const user = {};\n// Bu yerga yozing\n",
      hint: "user.sayHi = function() { console.log('Salom'); };",
      test: "if (typeof user.sayHi === 'function') { user.sayHi(); if (logs.includes('Salom')) return null; } return 'Metod noto\\'g\\'ri';"
    }
  ]
};
