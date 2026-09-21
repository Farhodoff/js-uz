export const forInBasics = {
  id: "forInBasics",
  title: "for...in Sikli: Obyekt Kalitlari Ustida Sikl",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda bir shaxsning to'ldirilgan anketasi yoki pasport ma'lumotlari yozilgan kartochka bor. Kartochkada turli bo'limlar nomi bor: "Ism", "Yosh", "Shahar". Siz kartochkani qo'lga olib, yuqoridan pastga har bir bo'lim nomini birma-bir o'qib, uning to'g'risidagi yozuvni tekshirib chiqasiz.

JavaScript da **for...in** sikli xuddi shunday ishlaydi: u obyekt ichidagi har bir xususiyatning nomi (kaliti) bo'yicha birma-bir aylanib chiqadi.

**for...in sikli** — obyektning barcha kalitlari (xususiyat nomlari) bo'ylab ketma-ket yurib chiqish uchun mo'ljallangan maxsus sikldir.

*Yangi terminlar:*
- **for...in** — obyekt xususiyatlarining kalitlari bo'ylab aylanuvchi sikl sintaksisi (\`for (let key in object)\`).

---

## 2. Nega kerak?

Obyekt ichida qanday kalitlar borligini oldindan bilmasak yoki ularning soni juda ko'p bo'lsa, har birini alohida qo'lda yozib chiqish (\`user.name\`, \`user.age\`, \`user.city\`...) juda noqulay va xatolarga olib keladi.

\`for...in\` sikli obyekt ichidagi barcha kalitlarni avtomatik ravishda bittadan olib beradi. Natijada siz bitta kichik kod bilan obyektning butun tarkibini ko'rib chiqishingiz mumkin.

---

## 3. Birinchi misol

Bu kod obyekt ichidagi barcha kalit nomlarini birma-bir konsolga chiqaradi.

\`\`\`javascript
const user = { name: "Ali", age: 25 };

for (let key in user) {
  console.log(key); // har bir kalit nomini chiqaradi
}
\`\`\`

\`\`\`text
// Natija:
name
age
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const user = { name: "Ali", age: 25 };\` — ikkita xususiyatga ega obyekt e'lon qilindi.
- \`for (let key in user)\` — \`for...in\` sikli boshlandi. Har bir aylanishda \`user\` obyektining navbatdagi kaliti (satr shaklida) \`key\` o'zgaruvchisiga beriladi.
- \`console.log(key);\` — sikl tanasi har bir kalit uchun alohida ishga tushadi va kalit nomini konsolga chiqaradi (avval \`"name"\`, keyin \`"age"\`).

---

## 5. Qadamma-qadam (trace)

Sikl qanday ishlashini qadamma-qadam kuzatamiz:

| Qadam | \`key\` o'zgaruvchisi | Konsolga nima chiqadi? | Holat |
|---|---|---|---|
| 1 | \`"name"\` | \`name\` | Birinchi xususiyat kaliti olindi |
| 2 | \`"age"\` | \`age\` | Ikkinchi xususiyat kaliti olindi |
| 3 | — | — | Kalitlar tugadi, sikl yakunlandi |

---

## 6. Yana bitta misol

1-misoldan farqi: Kalit nomidan tashqari, kvadrat qavs orqali unga mos **qiymatni** ham o'qib olish.

\`\`\`javascript
const car = { brand: "BMW", color: "Qora" };

for (let key in car) {
  console.log(key + ": " + car[key]); // kalit va uning qiymatini chiqarish
}
\`\`\`

\`\`\`text
// Natija:
brand: BMW
color: Qora
\`\`\`

Tahlil:
- \`car[key]\` — o'tgan darslarda o'rganganimizdek, o'zgaruvchidagi kalit orqali qiymat olish uchun faqat kvadrat qavs \`[ ]\` ishlatiladi.
- 1-aylanishda: \`key\` = \`"brand"\`, \`car["brand"]\` = \`"BMW"\`.
- 2-aylanishda: \`key\` = \`"color"\`, \`car["color"]\` = \`"Qora"\`.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: O'zgaruvchi bilan nuqta orqali murojaat qilish (obj.key)

\`\`\`javascript
const user = { name: "Ali", age: 25 };

for (let key in user) {
  console.log(user.key); // XATO: undefined
}
\`\`\`

**Nima bo'ladi:** \`user.key\` degani \`user\` obyekti ichidan aynan \`"key"\` degan xususiyatni qidiradi. Bunday xususiyat bo'lmagani uchun \`undefined\` qaytadi.
**To'g'ri varianti:** O'zgaruvchi ichidagi kalitga murojaat qilish uchun kvadrat qavs ishlatiladi: \`user[key]\`.

### 2-xato: Obyektga nisbatan for...of ishlatish

\`\`\`javascript
const user = { name: "Ali", age: 25 };

for (let item of user) {
  console.log(item); // XATO: TypeError: user is not iterable
}
\`\`\`

**Nima bo'ladi:** Oddiy obyektlar massiv emas, shuning uchun \`for...of\` ularda ishlamaydi va xatolik beradi.
**To'g'ri varianti:** Obyekt kalitlari ustida yurish uchun \`for...in\` ishlatiladi: \`for (let key in user)\`.

### 3-xato: Sikl o'zgaruvchisini let siz e'lon qilish

\`\`\`javascript
const book = { title: "JavaScript" };

for (key in book) { // XATO: let yo'q
  console.log(key);
}
\`\`\`

**Nima bo'ladi:** \`let\` yoki \`const\` qo'yilmasa, \`key\` kutilmaganda global o'zgaruvchiga aylanib ketadi va boshqa kodlar bilan to'qnashuv keltirib chiqarishi mumkin.
**To'g'ri varianti:** Har doim \`for (let key in book)\` deb yozing.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`person = { name: "Zuhra", age: 22 }\` obyekti berilgan. \`for...in\` sikli yordamida uning faqat kalitlarini (\`name\`, keyin \`age\`) konsolga chiqaring.

### 2-mashq (o'rtacha)
\`scores = { math: 90, english: 85 }\` obyekti berilgan. \`for...in\` yordamida har bir fanning ballini (faqat qiymatlarni: \`scores[subject]\`) konsolga chiqaring (\`90\`, keyin \`85\`).

### 3-mashq (chegara holat)
\`prices = { apple: 5000, banana: 12000, orange: 8000 }\` obyekti berilgan. \`for...in\` sikli orqali barcha mahsulotlar narxining umumiy yig'indisini (\`total\`) hisoblang va \`total\` ni konsolga chiqaring (\`25000\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const person = { name: "Zuhra", age: 22 };

for (let key in person) {
  console.log(key);
}
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const scores = { math: 90, english: 85 };

for (let subject in scores) {
  console.log(scores[subject]);
}
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const prices = { apple: 5000, banana: 12000, orange: 8000 };
let total = 0;

for (let item in prices) {
  total += prices[item];
}

console.log(total); // 25000
\`\`\`

---

## 9. Xulosa

1. \`for...in\` sikli obyekt ichidagi barcha xususiyatlarning kalitlari (nomlari) bo'yicha birma-bir aylanib chiqadi.
2. Sikl ichida kalitga mos qiymatni o'qish uchun faqat kvadrat qavsdan foydalaniladi: \`obyekt[key]\`.
3. \`for...of\` massivlar uchun mo'ljallangan bo'lsa, \`for...in\` obyekt kalitlari ustida aylanish uchun ishlatiladi.

Keyingi darsda: Ma'lumotlarni almashish va saqlash formati — JSON bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Obyekt kalitlarini chiqarish",
      instruction: "`person = { name: \"Zuhra\", age: 22 }` obyekti berilgan. `for...in` sikli yordamida uning kalitlarini (`name` va `age`) konsolga chiqaring.",
      startingCode: "const person = { name: \"Zuhra\", age: 22 };\n// for...in sikli yordamida kalitlarni chiqaring\n",
      hint: "for (let key in person) {\n  console.log(key);\n}",
      test: "if (!code.includes('for') || !code.includes('in')) return 'for...in sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('name') && out.includes('age')) return null;\nreturn 'Kalitlar (name, age) to\\'g\\'ri chiqmadi';"
    },
    {
      id: 2,
      title: "Obyekt qiymatlarini chiqarish",
      instruction: "`scores = { math: 90, english: 85 }` obyekti berilgan. `for...in` sikli yordamida har bir fanning ballini (`scores[subject]`) konsolga chiqaring.",
      startingCode: "const scores = { math: 90, english: 85 };\n// for...in yordamida ballarni konsolga chiqaring\n",
      hint: "for (let subject in scores) {\n  console.log(scores[subject]);\n}",
      test: "if (!code.includes('for') || !code.includes('in')) return 'for...in sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('90') && out.includes('85')) return null;\nreturn 'Fan ballari (90, 85) to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Narxlar yig'indisini hisoblash",
      instruction: "`prices = { apple: 5000, banana: 12000, orange: 8000 }` obyekti berilgan. `for...in` sikli orqali barcha narxlar yig'indisini (`total`) hisoblab, konsolga chiqaring.",
      startingCode: "const prices = { apple: 5000, banana: 12000, orange: 8000 };\nlet total = 0;\n// for...in orqali total ga qo'shing va chiqaring\n",
      hint: "for (let item in prices) {\n  total += prices[item];\n}\nconsole.log(total);",
      test: "if (!code.includes('for') || !code.includes('in')) return 'for...in sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('25000'))) return null;\nreturn 'Umumiy summa 25000 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "for...in sikli obyekt ustida aylanganda o'zgaruvchiga nima yuklanadi?",
      options: [
        "Obyektning xususiyat kaliti (nomi)",
        "Obyektning qiymati",
        "Obyektning indeksi (raqam)",
        "Butun obyektning nusxasi"
      ],
      correctAnswer: 0,
      explanation: "for...in siklida o'zgaruvchiga obyektning har bir xususiyatining nomi (kaliti) satr sifatida beriladi."
    },
    {
      id: 2,
      question: "for...in sikli ichida o'zgaruvchidagi kalit orqali qiymatni qanday olamiz?",
      options: [
        "obyekt[key]",
        "obyekt.key",
        "obyekt(key)",
        "obyekt->key"
      ],
      correctAnswer: 0,
      explanation: "O'zgaruvchi ichidagi kalit nomi orqali qiymat olish uchun kvadrat qavs obyekt[key] ishlatiladi. obyekt.key deb yozilsa, aynan 'key' degan nom qidiriladi."
    },
    {
      id: 3,
      question: "Oddiy obyekt ustida for...of siklini ishlatish mumkinmi?",
      options: [
        "Yo'q, oddiy obyektlar for...of bilan aylanmaydi (TypeError beradi)",
        "Ha, hech qanday xatosiz ishlaydi",
        "Faqat raqamli qiymatlar bo'lsa ishlaydi",
        "Faqat 1 ta xususiyati bo'lsa ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Oddiy obyektlar iterable (aylanuvchi) emas, shuning uchun for...of TypeError xatosini keltirib chiqaradi. Obyektlar uchun for...in ishlatiladi."
    }
  ]
};
