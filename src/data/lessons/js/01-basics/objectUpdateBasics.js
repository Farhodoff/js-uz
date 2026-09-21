export const objectUpdateBasics = {
  id: "objectUpdateBasics",
  title: "Obyektni O'zgartirish: Qo'shish, Yangilash, Delete",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda shaxsiy kundalik yoki do'stlaringizning telefon kitobchasi bor. Vaqt o'tishi bilan unga yangi yozuv kiritishingiz mumkin (masalan, yangi do'stingizning raqamini qo'shish), mavjud yozuvni yangilashingiz mumkin (do'stingiz raqamini o'zgartirganda yangisini yozish) yoki keraksiz bo'lib qolgan yozuvni o'chirg'ich bilan butunlay o'chirib tashlashingiz mumkin.
JavaScript da obyektlar ham xuddi shunday moslashuvchan: obyekt yaratilgach, unga xohlagan paytda yangi xususiyat qo'shish, mavjudini yangilash yoki o'chirish mumkin.

**Obyektni o'zgartirish** — mavjud obyektga yangi xususiyat qo'shish, bor xususiyatning qiymatini yangilash va \`delete\` kalit so'zi yordamida keraksiz xususiyatni butunlay olib tashlashdir.

*Yangi terminlar:*
- **Qo'shish va yangilash** — nuqta yoki kvadrat qavs orqali yangi qiymat tenglash (\`obyekt.kalit = qiymat\`).
- **delete operatori** — obyekt ichidagi xususiyatni butunlay o'chirib tashlovchi kalit so'z (\`delete obyekt.kalit\`).

---

## 2. Nega kerak?

Dastur ishlash davomida ma'lumotlar doimiy ravishda o'zgarib turadi: masalan, foydalanuvchi ball to'playdi, yoshi o'zgaradi yoki manzilini yangilaydi.

Agar obyektni o'zgartirish imkoni bo'lmaganida, har bir kichik o'zgarish uchun yangitdan butun obyektni qayta yozishga to'g'ri kelardi. JavaScript da esa mavjud obyekt ichidagi xususiyatlarni to'g'ridan-to'g'ri yangilash, yangi xususiyat kiritish yoki eskisini o'chirish nihoyatda oson.

---

## 3. Birinchi misol

Bu kod obyektga yangi xususiyat qo'shadi, mavjudini yangilaydi va bitta xususiyatni o'chiradi.

\`\`\`javascript
const user = { name: "Ali", age: 20 };

user.city = "Toshkent"; // yangi xususiyat qo'shish
user.age = 21; // mavjud qiymatni yangilash
delete user.name; // xususiyatni o'chirish

console.log(user); // { age: 21, city: 'Toshkent' }
\`\`\`

\`\`\`text
// Natija:
{ age: 21, city: 'Toshkent' }
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const user = { name: "Ali", age: 20 };\` — boshlang'ich obyekt yaratildi. Obyekt \`const\` bilan e'lon qilingan bo'lsa ham, uning ichidagi xususiyatlarni bemalol o'zgartirish mumkin!
- \`user.city = "Toshkent";\` — \`user\` ichida \`city\` degan kalit yo'q edi. JavaScript uni avtomatik ravishda obyektga yangi xususiyat qilib qo'shadi.
- \`user.age = 21;\` — \`age\` kaliti allaqachon bor edi. Uning eski qiymati (\`20\`) o'rniga yangi qiymat (\`21\`) yozildi (yangilandi).
- \`delete user.name;\` — \`delete\` kalit so'zi \`user\` obyektidan \`name\` kaliti va uning qiymatini butunlay o'chirib tashlaydi.
- \`console.log(user);\` — konsolda faqat yangilangan \`age\` va yangi qo'shilgan \`city\` qolganini ko'ramiz.

---

## 5. Qadamma-qadam (trace)

Obyekt holatining o'zgarishi:

| Qadam | Kod | Obyekt tarkibi (\`user\`) | Nima sodir bo'ldi? |
|---|---|---|---|
| 1 | Boshlang'ich | \`{ name: "Ali", age: 20 }\` | Obyekt yaratildi |
| 2 | \`user.city = "Toshkent";\` | \`{ name: "Ali", age: 20, city: "Toshkent" }\` | Yangi \`city\` qo'shildi |
| 3 | \`user.age = 21;\` | \`{ name: "Ali", age: 21, city: "Toshkent" }\` | \`age\` qiymati 21 ga yangilandi |
| 4 | \`delete user.name;\` | \`{ age: 21, city: "Toshkent" }\` | \`name\` butunlay o'chirildi |

---

## 6. Yana bitta misol

1-misoldan farqi: Kvadrat qavs \`[ ]\` yordamida qo'shish, yangilash va o'chirish.

\`\`\`javascript
const car = { brand: "Chevrolet" };

car["color"] = "Oq"; // kvadrat qavs orqali yangi xususiyat qo'shish
car["color"] = "Qora"; // mavjud xususiyatni yangilash
delete car["brand"]; // kvadrat qavs orqali o'chirish

console.log(car);
\`\`\`

\`\`\`text
// Natija:
{ color: 'Qora' }
\`\`\`

Tahlil:
- Nuqta orqali qanday o'zgartirilsa, kvadrat qavs \`["kalit"]\` orqali ham xuddi shunday qiymat berish va \`delete\` qilish mumkin.
- Oxirida faqat \`color: 'Qora'\` xususiyati qoladi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: delete o'rniga undefined tenglab qo'yish

\`\`\`javascript
const person = { name: "Ali", age: 20 };

person.age = undefined; // XATO: kalit o'chmadi!
console.log(person); // { name: 'Ali', age: undefined }
\`\`\`

**Nima bo'ladi:** \`age\` kaliti obyektda qolib ketadi, faqat uning qiymati \`undefined\` bo'lib turadi. Kalitni butunlay olib tashlash uchun faqat \`delete\` ishlatiladi.
**To'g'ri varianti:** \`delete person.age;\`.

### 2-xato: const bilan e'lon qilingan obyekt o'zgaruvchisiga yangi obyekt tenglash

\`\`\`javascript
const product = { title: "Kitob" };

product = { title: "Daftar" }; // XATO: TypeError: Assignment to constant variable.
\`\`\`

**Nima bo'ladi:** \`const\` o'zgaruvchisiga yangi obyekt tenglash mumkin emas. Faqat uning ichidagi xususiyatlarni o'zgartirish mumkin.
**To'g'ri varianti:** \`product.title = "Daftar";\`.

### 3-xato: delete dan keyin o'chirilgan xususiyatni qidirish

\`\`\`javascript
const item = { count: 5 };
delete item.count;

console.log(item.count); // undefined
\`\`\`

**Nima bo'ladi:** Xato bermaydi, lekin xususiyat o'chirilganligi sababli \`undefined\` chiqadi.
**To'g'ri varianti:** O'chirilgan xususiyat endi mavjud emasligini inobatga olish.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`laptop = { brand: "Lenovo" }\` obyekti berilgan. Unga \`ram: "16GB"\` xususiyatini qo'shing va \`laptop\` ni konsolga chiqaring.

### 2-mashq (o'rtacha)
\`player = { score: 10, lives: 3 }\` obyekti berilgan. Uning \`score\` qiymatini \`25\` ga yangilang, \`lives\` xususiyatini esa \`delete\` orqali o'chirib tashlang. \`player\` ni konsolga chiqaring (\`{ score: 25 }\`).

### 3-mashq (chegara holat)
\`settings = { theme: "light" }\` obyekti berilgan. \`let key = "theme";\` o'zgaruvchisidan foydalanib, kvadrat qavs orqali mavzuni \`"dark"\` ga o'zgartiring (\`settings[key] = "dark"\`). \`settings\` ni konsolga chiqaring.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const laptop = { brand: "Lenovo" };
laptop.ram = "16GB";

console.log(laptop); // { brand: 'Lenovo', ram: '16GB' }
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const player = { score: 10, lives: 3 };
player.score = 25;
delete player.lives;

console.log(player); // { score: 25 }
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const settings = { theme: "light" };
let key = "theme";
settings[key] = "dark";

console.log(settings); // { theme: 'dark' }
\`\`\`

---

## 9. Xulosa

1. Obyektga yangi xususiyat qo'shish va bor xususiyatni yangilash bir xil amalga oshiriladi: \`obyekt.kalit = yangiQiymat\`.
2. Xususiyatni butunlay yo'q qilish uchun \`delete obyekt.kalit\` operatori ishlatiladi.
3. \`const\` bilan yaratilgan obyekt ichidagi xususiyatlarni bemalol o'zgartirish, qo'shish va o'chirish mumkin.

Keyingi darsda: Obyekt kalitlari bo'ylab sikl aylanish — for...in sikli bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "laptop obyektiga ram qo'shish",
      instruction: "`laptop = { brand: \"Lenovo\" }` obyektiga `ram: \"16GB\"` xususiyatini qo'shing va `laptop` ni konsolga chiqaring.",
      startingCode: "const laptop = { brand: \"Lenovo\" };\n// ram xususiyatini qo'shing va laptop ni chiqaring\n",
      hint: "laptop.ram = \"16GB\";\nconsole.log(laptop);",
      test: "if (!code.includes('laptop')) return 'laptop obyekti ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('16GB'))) return null;\nreturn 'ram: \"16GB\" konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "player ballini yangilash va lives ni o'chirish",
      instruction: "`player = { score: 10, lives: 3 }` obyektining `score` qiymatini `25` ga yangilang, `lives` ni esa `delete` bilan o'chirib, `player` ni konsolga chiqaring.",
      startingCode: "const player = { score: 10, lives: 3 };\n// score ni 25 ga yangilang, lives ni delete qiling va player ni chiqaring\n",
      hint: "player.score = 25;\ndelete player.lives;\nconsole.log(player);",
      test: "if (!code.includes('delete')) return 'delete operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('25') && !m.includes('lives'))) return null;\nreturn 'player to\\'g\\'ri yangilanmadi yoki lives o\\'chirilmadi';"
    },
    {
      id: 3,
      title: "O'zgaruvchi orqali qiymatni yangilash",
      instruction: "`settings = { theme: \"light\" }` obyekti berilgan. `key = \"theme\"` o'zgaruvchisi orqali kvadrat qavsda mavzuni `\"dark\"` ga o'zgartiring va `settings` ni konsolga chiqaring.",
      startingCode: "const settings = { theme: \"light\" };\nlet key = \"theme\";\n// settings[key] orqali \"dark\" ga o'zgartiring va chiqaring\n",
      hint: "settings[key] = \"dark\";\nconsole.log(settings);",
      test: "if (!code.includes('settings[key]')) return 'settings[key] orqali yangilanmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('dark'))) return null;\nreturn 'settings ichida dark chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Obyektga yangi xususiyat qo'shish qanday amalga oshiriladi?",
      options: [
        "obyekt.yangiKalit = qiymat;",
        "obyekt.add(yangiKalit, qiymat);",
        "obyekt.push(yangiKalit);",
        "new obyekt.yangiKalit;"
      ],
      correctAnswer: 0,
      explanation: "Obyektga yangi xususiyat qo'shish uchun shunchaki obyekt.yangiKalit = qiymat deb yoziladi."
    },
    {
      id: 2,
      question: "Obyektdan ma'lum bir xususiyatni butunlay o'chirish uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "delete",
        "remove",
        "clear",
        "pop"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da xususiyatni o'chirish uchun delete operatori ishlatiladi: delete obyekt.kalit."
    },
    {
      id: 3,
      question: "const bilan e'lon qilingan obyekt ichidagi xususiyatlarni o'zgartirish mumkinmi?",
      options: [
        "Ha, const faqat o'zgaruvchini qayta tenglashni taqiqlaydi, ichidagi xususiyatlarni o'zgartirish mumkin",
        "Yo'q, const bo'lgani uchun hech narsani o'zgartirib bo'lmaydi",
        "Faqat yangi xususiyat qo'shish mumkin, eskilarini o'zgartirib bo'lmaydi",
        "Faqat o'chirish mumkin"
      ],
      correctAnswer: 0,
      explanation: "const bilan e'lon qilingan obyektning o'zini qayta tenglash mumkin emas, ammo uning ichidagi xususiyatlarini qo'shish, o'zgartirish va o'chirish mumkin."
    }
  ]
};
