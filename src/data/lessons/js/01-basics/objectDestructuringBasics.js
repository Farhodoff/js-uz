export const objectDestructuringBasics = {
  id: "objectDestructuringBasics",
  title: "Obyekt Destructuring: Xususiyatlarni Ajratib Olish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda bir xodimning shaxsiy kartochkasi bor. Kartochkada yozuvlar bor: "name: Ali", "age: 25", "city: Toshkent". Sizga kartochkadagi barcha ma'lumotlar kerak emas, faqat \`name\` va \`age\` qismlarini ko'chirib, o'zingizning alohida daftaringizga (o'zgaruvchilarga) yozib olmoqchisiz.

JavaScript da **obyekt destructuring** aynan shunday ishlaydi: u obyektdagi kerakli xususiyatlarni kalit nomlari bo'yicha alohida yangi o'zgaruvchilarga ajratib beradi.

**Obyekt destructuring (destrukturizatsiya)** — obyektdan xususiyatlarni ularning kalit nomlari orqali yangi o'zgaruvchilarga bitta qatorda ajratib olish sintaksisidir (\`const { name, age } = user;\`).

*Yangi terminlar:*
- **Obyekt destructuring sintaksisi** — tenglikning chap tomonida figurali qavs \`{ name, age }\` qo'llash orqali obyekt xususiyatlariga mos nomli yangi o'zgaruvchilar e'lon qilish.
- **Qayta nomlash (aliasing)** — obyektdagi kalit nomini boshqa yangi nomli o'zgaruvchiga biriktirish (\`{ title: bookTitle }\`).

---

## 2. Nega kerak?

Ilgari obyektdan bir nechta qiymatni o'zgaruvchilarga olish uchun nuqta orqali qayta-qayta yozishga to'g'ri kelardi:
\`\`\`javascript
const user = { name: "Ali", age: 25 };
const name = user.name;
const age = user.age;
\`\`\`
Bu usulda \`user.\` so'zini har safar qayta yozish kerak edi.

Obyekt destructuring yordamida buni bitta qisqa qatorda yozish mumkin:
\`\`\`javascript
const { name, age } = user;
\`\`\`
Massiv destructuring dan farqi: massivda tartib (indeks) muhim bo'lsa, obyekt destructuring da **kalit nomlarining mos kelishi** muhim!

---

## 3. Birinchi misol

Bu kod obyektdan \`name\` va \`age\` xususiyatlarini alohida o'zgaruvchilarga ajratib oladi.

\`\`\`javascript
const user = { name: "Ali", age: 25 };

const { name, age } = user; // obyektdan xususiyatlarni ajratib olish

console.log(name); // "Ali"
console.log(age); // 25
\`\`\`

\`\`\`text
// Natija:
Ali
25
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const user = { name: "Ali", age: 25 };\` — ikkita xususiyatga ega obyekt yaratildi.
- \`const { name, age } = user;\` — obyekt destructuring sintaksisi. Chap tomondagi figurali qavs ichidagi \`name\` va \`age\` yangi o'zgaruvchilar hisoblanadi. JavaScript \`user\` obyekti ichidan aynan shu nomli kalitlarni qidiradi va ularning qiymatlarini mos ravishda yangi o'zgaruvchilarga yuklaydi.
- \`console.log(name);\` — konsolga \`"Ali"\` chiqadi.
- \`console.log(age);\` — konsolga \`25\` chiqadi.

---

## 5. Qadamma-qadam (trace)

O'zgaruvchilarga qiymat taqsimlanishi:

| O'zgaruvchi nomi | Obyekt kaliti | Qiymat | Qoida |
|---|---|---|---|
| \`name\` | \`user.name\` | \`"Ali"\` | Kalit nomi to'liq mos keldi |
| \`age\` | \`user.age\` | \`25\` | Kalit nomi to'liq mos keldi |

---

## 6. Yana bitta misol

1-misoldan farqi: Obyektdagi kalit nomini yangi nomli o'zgaruvchiga biriktirish (\`kalit: yangiNom\`).

\`\`\`javascript
const book = { title: "JavaScript Asoslari" };

const { title: bookTitle } = book; // title xususiyatini bookTitle o'zgaruvchisiga olish

console.log(bookTitle); // "JavaScript Asoslari"
\`\`\`

\`\`\`text
// Natija:
JavaScript Asoslari
\`\`\`

Tahlil:
- Agar siz o'zgaruvchiga obyektdagi kalitdan boshqacha nom bermoqchi bo'lsangiz, ikki nuqta (\`:\`) qo'yib yangi nom yozasiz: \`{ title: bookTitle }\`.
- Natijada \`bookTitle\` nomli yangi o'zgaruvchi yaratiladi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Obyektda yo'q bo'lgan kalit nomini ajratishga urinish

\`\`\`javascript
const user = { name: "Ali" };
const { score } = user;

console.log(score); // undefined
\`\`\`

**Nima bo'ladi:** \`user\` obyektida \`score\` kaliti yo'q, shuning uchun \`score\` o'zgaruvchisi \`undefined\` qiymatini oladi.
**To'g'ri varianti:** Obyektda mavjud kalit nomini yozish kerak.

### 2-xato: Obyekt uchun kvadrat qavs ishlatish

\`\`\`javascript
const car = { brand: "BMW" };
const [brand] = car; // XATO: TypeError: car is not iterable
\`\`\`

**Nima bo'ladi:** Obyektlar massiv emas, shuning uchun kvadrat qavs \`[ ]\` bilan ajratib bo'lmaydi.
**To'g'ri varianti:** Obyektlar uchun har doim figurali qavs \`{ }\` ishlatiladi: \`const { brand } = car;\`.

### 3-xato: Qayta nomlagandan keyin eski nomni chaqirish

\`\`\`javascript
const car = { brand: "BMW" };
const { brand: carBrand } = car;

console.log(brand); // XATO: ReferenceError: brand is not defined
\`\`\`

**Nima bo'ladi:** \`brand: carBrand\` deb yozilganda faqat \`carBrand\` degan yangi o'zgaruvchi yaratiladi, \`brand\` esa o'zgaruvchi bo'lib qolmaydi.
**To'g'ri varianti:** Yangi nomni chaqirish: \`console.log(carBrand);\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`product = { name: "Noutbuk", price: 800 }\` obyekti berilgan. Destructuring yordamida \`name\` va \`price\` o'zgaruvchilarini ajratib oling va \`price\` ni konsolga chiqaring (\`800\`).

### 2-mashq (o'rtacha)
\`city = { title: "Toshkent", population: 3 }\` obyekti berilgan. Destructuring orqali \`title\` xususiyatini \`cityName\` degan yangi nom bilan oling (\`{ title: cityName }\`) va \`cityName\` ni konsolga chiqaring (\`"Toshkent"\`).

### 3-mashq (chegara holat)
\`player = { username: "Sher", score: 50 }\` obyekti berilgan. Destructuring orqali \`username\` va mavjud bo'lmagan \`level\` xususiyatini ajratib oling (\`const { username, level } = player;\`) hamda \`level\` ni konsolga chiqaring (\`undefined\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const product = { name: "Noutbuk", price: 800 };
const { name, price } = product;

console.log(price); // 800
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const city = { title: "Toshkent", population: 3 };
const { title: cityName } = city;

console.log(cityName); // "Toshkent"
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const player = { username: "Sher", score: 50 };
const { username, level } = player;

console.log(level); // undefined
\`\`\`

---

## 9. Xulosa

1. Obyekt destructuring — \`const { a, b } = obj\` orqali obyektdan xususiyatlarni bitta qatorda o'zgaruvchilarga ajratib olish usulidir.
2. Qiymatlar tartib bo'yicha emas, balki kalit nomlarining mos kelishi bo'yicha taqsimlanadi.
3. O'zgaruvchiga yangi nom berish uchun \`{ eskiNom: yangiNom }\` sintaksisi ishlatiladi.

Keyingi darsda: Massiv va obyektlarni yoyish — Spread operatori (\`...\`) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Obyektdan xususiyatlarni ajratib olish",
      instruction: "`product = { name: \"Noutbuk\", price: 800 }` obyekti berilgan. Destructuring orqali `name` va `price` o'zgaruvchilarini ajrating va `price` ni konsolga chiqaring.",
      startingCode: "const product = { name: \"Noutbuk\", price: 800 };\n// Destructuring orqali { name, price } ni oling va price ni chiqaring\n",
      hint: "const { name, price } = product;\nconsole.log(price);",
      test: "if (!code.includes('{') || !code.includes('}')) return 'Obyekt destructuring ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('800'))) return null;\nreturn '800 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "O'zgaruvchiga yangi nom berish",
      instruction: "`city = { title: \"Toshkent\", population: 3 }` obyekti berilgan. `title` xususiyatini `cityName` nomi bilan ajratib oling va `cityName` ni konsolga chiqaring.",
      startingCode: "const city = { title: \"Toshkent\", population: 3 };\n// { title: cityName } orqali ajrating va cityName ni chiqaring\n",
      hint: "const { title: cityName } = city;\nconsole.log(cityName);",
      test: "if (!code.includes(':') || !code.includes('cityName')) return 'title: cityName orqali yangi nom berilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('Toshkent')) return null;\nreturn 'Toshkent konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Mavjud bo'lmagan xususiyatni ajratish",
      instruction: "`player = { username: \"Sher\", score: 50 }` obyekti berilgan. Destructuring orqali `username` va `level` ni ajrating (`const { username, level } = player;`) hamda `level` ni konsolga chiqaring.",
      startingCode: "const player = { username: \"Sher\", score: 50 };\n// username va level ni ajrating hamda level ni chiqaring\n",
      hint: "const { username, level } = player;\nconsole.log(level);",
      test: "if (!code.includes('level')) return 'level o\\'zgaruvchisi ajratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('undefined')) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Standart qiymat (default)",
      "instruction": "`const settings = { theme: \"dark\" };` obyektidan `{ theme, fontSize = 16 }` destructuring orqali ajratib, `fontSize` ni konsolga chiqaring (xususiyat yo'q, shuning uchun `16`).",
      "startingCode": "const settings = { theme: \"dark\" };\n// { theme, fontSize = 16 } ajrating va fontSize ni chiqaring\n",
      "hint": "const { theme, fontSize = 16 } = settings;\nconsole.log(fontSize);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"16\")) return null;\nreturn \"Standart qiymat 16 konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Ichma-ich obyektni ajratish",
      "instruction": "`const user = { name: \"Ali\", address: { city: \"Toshkent\" } };` obyektidan ichma-ich destructuring (`{ address: { city } }`) orqali `city` ni ajratib, konsolga chiqaring.",
      "startingCode": "const user = { name: \"Ali\", address: { city: \"Toshkent\" } };\n// { address: { city } } orqali city ni chiqaring\n",
      "hint": "const { address: { city } } = user;\nconsole.log(city);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Toshkent\"))) return null;\nreturn \"city qiymati Toshkent konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Funksiya parametrida destructuring",
      "instruction": "`greet` nomli funksiya yarating: obyekt qabul qilib (`{ name }` parametr), `\"Salom, \" + name` matnini qaytarsin. `greet({ name: \"Ali\" })` natijasini konsolga chiqaring.",
      "startingCode": "// greet funksiyasini obyekt destructuring parametr bilan yozing\n",
      "hint": "function greet({ name }) {\n  return \"Salom, \" + name;\n}\nconsole.log(greet({ name: \"Ali\" }));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Salom, Ali\"))) return null;\nreturn \"Salom, Ali matni konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "null xatosini tuzatish",
      "instruction": "`const { theme } = null;` kodi `TypeError` beradi. O'ng tomonni obyektga (`{ theme: \"dark\" }`) o'zgartirib, `theme` ni konsolga chiqaring.",
      "startingCode": "const { theme } = null;\nconsole.log(theme);\n",
      "hint": "const { theme } = { theme: \"dark\" };\nconsole.log(theme);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"dark\"))) return null;\nreturn \"theme qiymati dark konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Ichma-ich obyektni yangi nom bilan olish",
      "instruction": "`const data = { user: { name: \"Ali\" } };` obyektidan `{ user: { name: userName } }` orqali `userName` o'zgaruvchisini oling va konsolga chiqaring.",
      "startingCode": "const data = { user: { name: \"Ali\" } };\n// { user: { name: userName } } orqali userName ni chiqaring\n",
      "hint": "const { user: { name: userName } } = data;\nconsole.log(userName);",
      "test": "if (!code.includes(\"userName\")) return \"userName o'zgaruvchisi yaratilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Ali\"))) return null;\nreturn \"userName qiymati Ali konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Massiv ichidagi obyektni ajratish",
      "instruction": "`const list = [{ name: \"Ali\" }, { name: \"Vali\" }];` massividan birinchi elementdagi `name` ni `const [{ name }] = list;` orqali ajratib, konsolga chiqaring.",
      "startingCode": "const list = [{ name: \"Ali\" }, { name: \"Vali\" }];\n// [{ name }] orqali birinchi element nomini chiqaring\n",
      "hint": "const [{ name }] = list;\nconsole.log(name);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"Ali\")) return null;\nreturn \"name qiymati Ali konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Ichma-ich parametr destructuring (chegara)",
      "instruction": "`getCity` nomli funksiya yarating: `{ address: { city } }` parametr bilan shahar nomini qaytarsin. `getCity({ address: { city: \"Buxoro\" } })` natijasini konsolga chiqaring.",
      "startingCode": "// getCity funksiyasini ichma-ich destructuring bilan yozing\n",
      "hint": "function getCity({ address: { city } }) {\n  return city;\n}\nconsole.log(getCity({ address: { city: \"Buxoro\" } }));",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => String(v)).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Buxoro\"))) return null;\nreturn \"Buxoro konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Obyekt destructuring da qiymatlar o'zgaruvchilarga qanday qoida asosida taqsimlanadi?",
      options: [
        "Kalit nomlarining mos kelishi bo'yicha",
        "Obyektdagi indeks tartibi bo'yicha",
        "Qiymatlarning kattaligi bo'yicha",
        "Tasodifiy tartibda"
      ],
      correctAnswer: 0,
      explanation: "Obyekt destructuring obyektdagi kalit nomlari bilan bir xil bo'lgan nomlarni qidiradi va qiymatlarni shunga qarab taqsimlaydi."
    },
    {
      id: 2,
      question: "Obyekt xususiyatini boshqa yangi nomli o'zgaruvchiga olish sintaksisi qaysi?",
      options: [
        "const { title: bookTitle } = book;",
        "const { title as bookTitle } = book;",
        "const { title -> bookTitle } = book;",
        "const { bookTitle = title } = book;"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da { eskiKalit: yangiO'zgaruvchiNomi } ko'rinishida yozish orqali yangi nomli o'zgaruvchi ochiladi."
    },
    {
      id: 3,
      question: "const { age } = { name: 'Ali' }; kodida age o'zgaruvchisining qiymati nima bo'ladi?",
      options: [
        "undefined",
        "null",
        "0",
        "Xatolik yuz beradi"
      ],
      correctAnswer: 0,
      explanation: "Obyektda ajratilayotgan kalit mavjud bo'lmasa, dastur xato bermaydi, balki o'zgaruvchi undefined qiymatini oladi."
    },
    {
      "id": 4,
      "question": "`const { a, b } = { a: 1, b: 2, c: 3 };` dan keyin `a` va `b` nima?",
      "options": [
        "a = 1, b = 2",
        "a = 1, b = 3",
        "a = 2, b = 3",
        "ikkalasi ham undefined"
      ],
      "correctAnswer": 0,
      "explanation": "Obyekt destructuring faqat ko'rsatilgan kalitlarni oladi: a = 1, b = 2."
    },
    {
      "id": 5,
      "question": "`const { x = 5 } = {};` dan keyin `x` qiymati nima?",
      "options": [
        "5",
        "undefined",
        "null",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyektda x kaliti yo'q, shuning uchun standart qiymat 5 ishlatiladi."
    },
    {
      "id": 6,
      "question": "Obyekt xususiyatini boshqa nomdagi o'zgaruvchiga olish sintaksisi qaysi?",
      "options": [
        "`const { title: bookTitle } = book;`",
        "`const { title as bookTitle } = book;`",
        "`const { title = bookTitle } = book;`",
        "`const { bookTitle: title } = book;`"
      ],
      "correctAnswer": 0,
      "explanation": "Ikki nuqtadan keyin yangi nom yoziladi: { eskiKalit: yangiNom }."
    },
    {
      "id": 7,
      "question": "`const { age } = { name: \"Ali\" };` da `age` qiymati nima?",
      "options": [
        "undefined",
        "null",
        "0",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyektda age kaliti yo'q, shuning uchun undefined olinadi."
    },
    {
      "id": 8,
      "question": "`const { a: { b } } = { a: { b: 7 } };` dan keyin `b` nima?",
      "options": [
        "7",
        "undefined",
        "{ b: 7 }",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Ichma-ich obyekt ham ochiladi: a ning ichidagi b qiymati olinadi, natijada 7."
    },
    {
      "id": 9,
      "question": "Massiv ichidagi birinchi obyektning `name` xususiyatini qanday ajratib olinadi?",
      "options": [
        "`const [{ name }] = list;`",
        "`const { name } = list[0];` faqat shu ishlaydi, boshqasi yo'q",
        "`const [name] = list;`",
        "`const list.name;`"
      ],
      "correctAnswer": 0,
      "explanation": "Massiv va obyekt destructuring aralashishi mumkin: const [{ name }] = list."
    },
    {
      "id": 10,
      "question": "`const { x } = null;` kodi nima qiladi?",
      "options": [
        "TypeError beradi",
        "x = null bo'ladi",
        "x = undefined bo'ladi",
        "Xatosiz ishlaydi"
      ],
      "correctAnswer": 0,
      "explanation": "null yoki undefined dan destructuring qilishga urinilsa TypeError yuz beradi."
    },
    {
      "id": 11,
      "question": "`const { length } = \"abc\"; console.log(length);` nima chiqaradi?",
      "options": [
        "3",
        "abc",
        "undefined",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Matn ham length xususiyatiga ega, shuning uchun destructuring orqali 3 olinadi."
    },
    {
      "id": 12,
      "question": "Funksiya parametrida obyekt destructuring qanday ko'rinadi?",
      "options": [
        "`function f({ name }) { ... }`",
        "`function f([name]) { ... }`",
        "`function f(name.obj) { ... }`",
        "`function f(name = { name }) { ... }`"
      ],
      "correctAnswer": 0,
      "explanation": "Parametr joyida jingalak qavs ichida kalit yoziladi: function f({ name }) { }."
    }
  ]
};
