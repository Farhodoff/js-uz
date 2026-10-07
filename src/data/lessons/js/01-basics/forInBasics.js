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
    },
    {
      "id": 4,
      "title": "Kalit va qiymatni birga chiqarish",
      "instruction": "`const car = { brand: \"BMW\", year: 2020 };` obyektining har bir kaliti va qiymatini `\"brand: BMW\"` ko'rinishida `for...in` yordamida konsolga chiqaring.",
      "startingCode": "const car = { brand: \"BMW\", year: 2020 };\n// for...in bilan kalit: qiymat ko'rinishida chiqaring\n",
      "hint": "for (const key in car) {\n  console.log(key + \": \" + car[key]);\n}",
      "test": "if (!code.includes(\"for\") || !code.includes(\"in\")) return \"for...in sikli ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\"|\");\nif (all.includes(\"brand: BMW\") && all.includes(\"year: 2020\")) return null;\nreturn \"brand: BMW va year: 2020 konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Kalitlar sonini sanash",
      "instruction": "`const obj = { a: 1, b: 2, c: 3 };` obyektidagi kalitlar sonini `for...in` yordamida sanab, konsolga chiqaring (`3`).",
      "startingCode": "const obj = { a: 1, b: 2, c: 3 };\nlet count = 0;\n// for...in bilan kalitlarni sanang\n",
      "hint": "for (const key in obj) {\n  count++;\n}\nconsole.log(count);",
      "test": "if (!code.includes(\"in\")) return \"for...in ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"3\")) return null;\nreturn \"Kalitlar soni 3 konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Eng katta qiymatni topish",
      "instruction": "`const nums = { x: 2, y: 9, z: 4 };` obyektidagi eng katta qiymatni `for...in` yordamida topib, konsolga chiqaring.",
      "startingCode": "const nums = { x: 2, y: 9, z: 4 };\nlet max = 0;\n// for...in bilan eng katta qiymatni toping\n",
      "hint": "for (const key in nums) {\n  if (nums[key] > max) max = nums[key];\n}\nconsole.log(max);",
      "test": "if (!code.includes(\"in\")) return \"for...in ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"9\")) return null;\nreturn \"Eng katta qiymat 9 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Shartga mos kalitlarni chiqarish",
      "instruction": "`const inventory = { apples: 10, oranges: 5 };` obyektida qiymati `5` dan katta bo'lgan kalitlarni `for...in` bilan konsolga chiqaring.",
      "startingCode": "const inventory = { apples: 10, oranges: 5 };\n// qiymati 5 dan katta kalitlarni chiqaring\n",
      "hint": "for (const key in inventory) {\n  if (inventory[key] > 5) console.log(key);\n}",
      "test": "if (!code.includes(\"in\")) return \"for...in ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"apples\")) && !out.some((m) => m.includes(\"oranges\"))) return null;\nreturn \"Faqat apples chiqishi kerak\";"
    },
    {
      "id": 8,
      "title": "for...of xatosini tuzatish",
      "instruction": "Oddiy obyektda `for...of` ishlatilsa `TypeError` beradi. `for...of` ni `for...in` ga o'zgartirib, kalitlarni konsolga chiqaring.",
      "startingCode": "const user = { name: \"Ali\", age: 20 };\nfor (const k of user) {\n  console.log(k);\n}\n",
      "hint": "for (const k in user) {\n  console.log(k);\n}",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\"|\");\nif (all.includes(\"name\") && all.includes(\"age\")) return null;\nreturn \"name va age kalitlari konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Kalitlarni katta harflarga o'girish",
      "instruction": "`const flags = { on: true, off: false };` obyektining kalitlarini `for...in` va `toUpperCase()` yordamida katta harflarda konsolga chiqaring.",
      "startingCode": "const flags = { on: true, off: false };\n// kalitlarni katta harflarda chiqaring\n",
      "hint": "for (const key in flags) {\n  console.log(key.toUpperCase());\n}",
      "test": "if (!code.includes(\"in\")) return \"for...in ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\"|\");\nif (all.includes(\"ON\") && all.includes(\"OFF\")) return null;\nreturn \"ON va OFF konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Shartli kalitlar (chegara)",
      "instruction": "`const prices = { a: 500, b: 1500, c: 2000 };` obyektidan faqat `1000` dan katta narxlarning kalitlarini `for...in` bilan konsolga chiqaring (`b` va `c`).",
      "startingCode": "const prices = { a: 500, b: 1500, c: 2000 };\n// faqat 1000 dan katta narx kalitlarini chiqaring\n",
      "hint": "for (const key in prices) {\n  if (prices[key] > 1000) console.log(key);\n}",
      "test": "if (!code.includes(\"in\")) return \"for...in ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\"|\");\nif (all.includes(\"b\") && all.includes(\"c\") && !all.includes(\"a\")) return null;\nreturn \"Faqat b va c kalitlari chiqishi kerak\";"
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
    },
    {
      "id": 4,
      "question": "`for...in` massivda ishlatilsa, o'zgaruvchiga nima yuklanadi?",
      "options": [
        "Indekslar (0, 1, 2...)",
        "Element qiymatlari",
        "Massiv uzunligi",
        "Massiv nusxasi"
      ],
      "correctAnswer": 0,
      "explanation": "for...in massivda ham kalitlarni (indekslarni) beradi, qiymatlarni emas — massiv uchun for...of ishlatiladi."
    },
    {
      "id": 5,
      "question": "`for...in` siklida o'zgaruvchi obyektning qiymatini saqlaydimi?",
      "options": [
        "Yo'q, u faqat kalit (nom)ni saqlaydi",
        "Ha, to'g'ridan-to'g'ri qiymatni beradi",
        "Faqat sonli qiymatlarni beradi",
        "Faqat massiv elementlarini beradi"
      ],
      "correctAnswer": 0,
      "explanation": "for...in kalitlarni beradi; qiymatni olish uchun obj[key] ishlatiladi."
    },
    {
      "id": 6,
      "question": "`const o = { a: 1, b: 2 }; for (const k in o) console.log(k);` nima chiqaradi?",
      "options": [
        "a, b",
        "1, 2",
        "a b (bitta qatorda)",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "for...in kalitlarni navbat bilan beradi, shuning uchun a va b chiqadi."
    },
    {
      "id": 7,
      "question": "for...in va for...of o'rtasidagi asosiy farq nima?",
      "options": [
        "for...in kalitlarni, for...of qiymatlarni beradi",
        "Ikkalasi ham kalitlarni beradi",
        "for...of faqat obyektlar bilan ishlaydi",
        "for...in faqat sonlar bilan ishlaydi"
      ],
      "correctAnswer": 0,
      "explanation": "for...in kalit (indeks/nom) bo'ylab, for...of esa qiymat bo'ylab aylanadi."
    },
    {
      "id": 8,
      "question": "`const s = { math: 90 }; for (const k in s) console.log(s[k]);` nima chiqaradi?",
      "options": [
        "90",
        "math",
        "undefined",
        "{ }"
      ],
      "correctAnswer": 0,
      "explanation": "s[k] kalit orqali qiymatni oladi, shuning uchun 90 chiqadi."
    },
    {
      "id": 9,
      "question": "for...in orqali obyektdagi kalitlar sonini qanday sanash mumkin?",
      "options": [
        "Har aylanishda hisoblagichni (count++) oshirib",
        "obj.length dan foydalanib",
        "obj.size dan foydalanib",
        "Sanab bo'lmaydi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyektda length yo'q, shuning uchun for...in ichida hisoblagichni oshirib sanaladi."
    },
    {
      "id": 10,
      "question": "`for...in` faqat obyektning o'z kalitlarini emas, prototipdan meros kalitlarni ham olishi mumkinmi?",
      "options": [
        "Ha, shuning uchun hasOwnProperty tekshiruvi tavsiya etiladi",
        "Yo'q, hech qachon",
        "Faqat massivlarda",
        "Faqat const obyektlarda"
      ],
      "correctAnswer": 0,
      "explanation": "for...in meros olingan kalitlarni ham aylanib chiqishi mumkin; faqat o'z kalitlarini olish uchun hasOwnProperty ishlatiladi."
    },
    {
      "id": 11,
      "question": "`const o = { a: { x: 1 } }; for (const k in o) console.log(k);` nima chiqaradi?",
      "options": [
        "a",
        "x",
        "{ x: 1 }",
        "1"
      ],
      "correctAnswer": 0,
      "explanation": "for...in faqat yuqori darajadagi kalitlarni beradi: a. Ichki kalitga alohida murojaat qilinadi."
    },
    {
      "id": 12,
      "question": "`const n = { a: 1, b: 2, c: 3 }; for (const k in n) console.log(n[k]);` natijasi qanday?",
      "options": [
        "1, 2, 3",
        "a, b, c",
        "3",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "Har bir kalit orqali mos qiymat olinadi, natijada 1, 2, 3 chiqadi."
    }
  ]
};
