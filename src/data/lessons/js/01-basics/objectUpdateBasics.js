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
      test: "if (!code.includes('laptop')) return 'laptop obyekti ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('16GB'))) return null;\nreturn 'ram: \"16GB\" konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "player ballini yangilash va lives ni o'chirish",
      instruction: "`player = { score: 10, lives: 3 }` obyektining `score` qiymatini `25` ga yangilang, `lives` ni esa `delete` bilan o'chirib, `player` ni konsolga chiqaring.",
      startingCode: "const player = { score: 10, lives: 3 };\n// score ni 25 ga yangilang, lives ni delete qiling va player ni chiqaring\n",
      hint: "player.score = 25;\ndelete player.lives;\nconsole.log(player);",
      test: "if (!code.includes('delete')) return 'delete operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('25') && !m.includes('lives'))) return null;\nreturn 'player to\\'g\\'ri yangilanmadi yoki lives o\\'chirilmadi';"
    },
    {
      id: 3,
      title: "O'zgaruvchi orqali qiymatni yangilash",
      instruction: "`settings = { theme: \"light\" }` obyekti berilgan. `key = \"theme\"` o'zgaruvchisi orqali kvadrat qavsda mavzuni `\"dark\"` ga o'zgartiring va `settings` ni konsolga chiqaring.",
      startingCode: "const settings = { theme: \"light\" };\nlet key = \"theme\";\n// settings[key] orqali \"dark\" ga o'zgartiring va chiqaring\n",
      hint: "settings[key] = \"dark\";\nconsole.log(settings);",
      test: "if (!code.includes('settings[key]')) return 'settings[key] orqali yangilanmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('dark'))) return null;\nreturn 'settings ichida dark chiqmadi';"
    },
    {
      "id": 4,
      "title": "Xususiyat qiymatini yangilash",
      "instruction": "`const user = { name: \"Ali\", age: 20 };` obyektining `age` qiymatini `21` ga yangilab, `user` ni konsolga chiqaring.",
      "startingCode": "const user = { name: \"Ali\", age: 20 };\n// age ni 21 ga yangilang va user ni chiqaring\n",
      "hint": "user.age = 21;\nconsole.log(user);",
      "test": "if (!code.includes(\"user\")) return \"user obyekti topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"21\"))) return null;\nreturn \"Yangi qiymat 21 konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Xususiyatni delete bilan o'chirish",
      "instruction": "`const car = { brand: \"BMW\", color: \"red\" };` obyektidan `color` xususiyatini `delete` bilan o'chirib, `car` ni konsolga chiqaring.",
      "startingCode": "const car = { brand: \"BMW\", color: \"red\" };\n// color ni delete qiling va car ni chiqaring\n",
      "hint": "delete car.color;\nconsole.log(car);",
      "test": "if (!code.includes(\"delete\")) return \"delete operatori ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"BMW\") && !m.includes(\"red\"))) return null;\nreturn \"brand qoldi, color o'chirilishi kerak edi\";"
    },
    {
      "id": 6,
      "title": "Bo'sh obyektga xususiyat qo'shish",
      "instruction": "`const config = {};` bo'sh obyektiga `host: \"localhost\"` va `port: 3000` xususiyatlarini qo'shib, `config` ni konsolga chiqaring.",
      "startingCode": "const config = {};\n// host va port qo'shing va chiqaring\n",
      "hint": "config.host = \"localhost\";\nconfig.port = 3000;\nconsole.log(config);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"localhost\") && m.includes(\"3000\"))) return null;\nreturn \"host va port konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Boolean xususiyatni yangilash",
      "instruction": "`const todo = { title: \"Ish\", done: false };` obyektining `done` qiymatini `true` ga o'zgartirib, `todo` ni konsolga chiqaring.",
      "startingCode": "const todo = { title: \"Ish\", done: false };\n// done ni true qiling va chiqaring\n",
      "hint": "todo.done = true;\nconsole.log(todo);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"true\"))) return null;\nreturn \"done qiymati true konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "const qayta tenglash xatosini tuzatish",
      "instruction": "Quyidagi kodda `const` obyekt qayta tenglanmoqda — bu xato. Obyektning ichidagi xususiyatni o'zgartirib, `o.a` ni `2` ga yetkazing.",
      "startingCode": "const o = { a: 1 };\no = { a: 2 };\nconsole.log(o.a);\n",
      "hint": "o = {...} o'rniga o.a = 2; deb yozing.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"2\")) return null;\nreturn \"o.a qiymati 2 konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Qiymatni hisoblab yangilash",
      "instruction": "`const inventory = { apples: 5 };` obyektidagi `apples` sonini `5` taga oshirib (`apples: 10`), `inventory` ni konsolga chiqaring.",
      "startingCode": "const inventory = { apples: 5 };\n// apples ni 5 taga oshiring va chiqaring\n",
      "hint": "inventory.apples = inventory.apples + 5;\nconsole.log(inventory);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"10\") && !m.includes(\"5 \"))) return null;\nreturn \"apples qiymati 10 konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Ichki xususiyatni yangilash (chegara)",
      "instruction": "`const user = { profile: { city: \"Nukus\" } };` obyektidagi ichki `city` qiymatini `\"Toshkent\"` ga o'zgartirib, `user` ni konsolga chiqaring.",
      "startingCode": "const user = { profile: { city: \"Nukus\" } };\n// profile.city ni Toshkent ga o'zgartiring va chiqaring\n",
      "hint": "user.profile.city = \"Toshkent\";\nconsole.log(user);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((a) => (typeof a === \"object\" && a !== null ? JSON.stringify(a) : String(a))).join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Toshkent\") && !m.includes(\"Nukus\"))) return null;\nreturn \"city qiymati Toshkent konsolga chiqmadi\";"
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
    },
    {
      "id": 4,
      "question": "Obyektdan xususiyatni butunlay o'chirish uchun nima ishlatiladi?",
      "options": [
        "delete operatori",
        "remove metodi",
        "o.set(null)",
        "o.clear()"
      ],
      "correctAnswer": 0,
      "explanation": "delete operatori xususiyatni obyektdan butunlay olib tashlaydi: delete obj.key."
    },
    {
      "id": 5,
      "question": "`const o = { a: 1 }; o.a = 5; console.log(o.a);` nima chiqaradi?",
      "options": [
        "5",
        "1",
        "Xato beradi",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "const faqat o'zgaruvchini qayta tenglashni taqiqlaydi; obyekt ichidagi xususiyatni o'zgartirish mumkin, shuning uchun 5 chiqadi."
    },
    {
      "id": 6,
      "question": "`const o = { a: 1 }; delete o.a; console.log(o.a);` nima chiqaradi?",
      "options": [
        "undefined",
        "1",
        "null",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "a xususiyati o'chirilgach, unga murojaat mavjud bo'lmagan kalit kabi undefined qaytaradi."
    },
    {
      "id": 7,
      "question": "`const o = { a: 1 }; o.b = 2;` dan keyin o obyektida nechta xususiyat bor?",
      "options": [
        "Ikkita: a va b",
        "Bitta: b",
        "Bitta: a",
        "Nol"
      ],
      "correctAnswer": 0,
      "explanation": "Yangi kalit qo'shilsa, mavjudlari saqlanadi — natijada ikkita xususiyat bo'ladi."
    },
    {
      "id": 8,
      "question": "Kalit o'zgaruvchida saqlanib, qiymatni yangilash kerak bo'lsa qaysi sintaksis ishlatiladi?",
      "options": [
        "`obj[key] = yangiQiymat;`",
        "`obj.key = yangiQiymat;`",
        "`obj.push(key, qiymat);`",
        "`key = obj;`"
      ],
      "correctAnswer": 0,
      "explanation": "Kalit o'zgaruvchida bo'lsa, kvadrat qavs ishlatiladi: obj[key] = yangiQiymat."
    },
    {
      "id": 9,
      "question": "`const o = { a: { b: 1 } }; o.a.b = 5;` dan keyin o.a.b nima bo'ladi?",
      "options": [
        "5",
        "1",
        "undefined",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Ichki obyektning xususiyati nuqta orqali yangilanadi: o.a.b = 5."
    },
    {
      "id": 10,
      "question": "Mavjud bo'lmagan kalitni `delete` qilishga urinsak nima bo'ladi?",
      "options": [
        "Xato bermaydi, natija true bo'ladi",
        "TypeError beradi",
        "Obyekt o'chib ketadi",
        "undefined qaytaradi"
      ],
      "correctAnswer": 0,
      "explanation": "Mavjud bo'lmagan xususiyatni delete qilish xato bermaydi; amal muvaffaqiyatli deb hisoblanadi."
    },
    {
      "id": 11,
      "question": "`const p = { x: 1, y: 2 };` da x va y qiymatlarini almashtirish uchun to'g'ri kod qaysi?",
      "options": [
        "`const t = p.x; p.x = p.y; p.y = t;`",
        "`p.x = p.y; p.y = p.x;`",
        "`p.swap();`",
        "`p = [p.y, p.x];`"
      ],
      "correctAnswer": 0,
      "explanation": "Almashtirish uchun vaqtinchalik o'zgaruvchi kerak: aks holda birinchi qiymat yo'qoladi."
    },
    {
      "id": 12,
      "question": "`const o = { n: 1 }; o.n += 2; console.log(o.n);` nima chiqaradi?",
      "options": [
        "3",
        "1",
        "2",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "o.n += 2 — mavjud qiymatga 2 qo'shadi va natija 3 bo'ladi."
    }
  ]
};
