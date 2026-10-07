export const objectBasics = {
  id: "objectBasics",
  title: "Obyekt Yaratish va Murojaat",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda shaxsiy pasport yoki ID karta bor. Unda shunchaki tartiblangan raqamlar ro'yxati emas, balki aniq nomlangan ma'lumotlar bor: "Ismi: Ali", "Yoshi: 20", "Shahri: Toshkent". Har bir ma'lumotning o'z maxsus nomi (kaliti) mavjud.
JavaScript da obyekt ham xuddi shunday: u ma'lumotlarni tartib raqami (indeks) bilan emas, balki nomlangan kalit-qiymat juftliklari ko'rinishida saqlaydi.

**Obyekt (object)** — ma'lumotlarni tartiblangan indekslar bilan emas, balki nomlangan kalit-qiymat (\`key: value\`) juftliklari ko'rinishida saqlaydigan maxsus ma'lumot tuzilmasidir.

*Yangi terminlar:*
- **Obyekt (object)** — jingalak qavslar \`{ }\` ichida saqlanadigan xususiyatlar to'plami.
- **Kalit (key / property)** — xususiyatning nomi (masalan: \`name\`, \`age\`).
- **Qiymat (value)** — kalitga tegishli bo'lgan ma'lumot (masalan: \`"Ali"\`, \`20\`).
- **Nuqta orqali murojaat (dot notation)** — xususiyatni \`obyekt.kalit\` shaklida o'qish.
- **Kvadrat qavs orqali murojaat (bracket notation)** — xususiyatni \`obyekt["kalit"]\` shaklida o'qish.

---

## 2. Nega kerak?

Bitta narsa (masalan, foydalanuvchi yoki avtomobil) haqidagi turli ma'lumotlarni massivda saqlash noqulaylik tug'diradi:

\`\`\`javascript
// Noqulay usul (massiv):
const user = ["Ali", 20, "Toshkent"];
console.log(user[0]); // "Ali"
console.log(user[1]); // 20 (bu nima ekanini eslab qolish qiyin)
\`\`\`

Obyekt yordamida har bir ma'lumotga aniq va tushunarli nom beriladi:

\`\`\`javascript
const user = {
  name: "Ali",
  age: 20,
  city: "Toshkent"
};
console.log(user.name); // Ali
console.log(user.age); // 20
\`\`\`

Bu kodni o'qish va tushunishni juda osonlashtiradi.

---

## 3. Birinchi misol

Bu kod foydalanuvchi obyekti yaratadi va uning xususiyatlarini nuqta hamda kvadrat qavs orqali o'qib beradi.

\`\`\`javascript
const user = {
  name: "Ali",
  age: 20,
  city: "Toshkent"
};

console.log(user.name); // nuqta orqali o'qish
console.log(user["age"]); // kvadrat qavs orqali o'qish
\`\`\`

\`\`\`text
// Natija:
Ali
20
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const user = { ... };\` — obyekt jingalak qavs \`{\` bilan boshlanib, \`}\` bilan yopiladi. Obyektlar uchun odatda \`const\` ishlatiladi.
- \`name: "Ali",\` — \`name\` bu kalit (xususiyat nomi), \`"Ali"\` esa uning qiymati. Ular o'rtasida ikki nuqta \`:\` qo'yiladi. Har bir xususiyatdan keyin vergul yoziladi.
- \`user.name\` — nuqta orqali o'qish (dot notation). Bu eng ko'p ishlatiladigan, toza va tezkor usuldir.
- \`user["age"]\` — kvadrat qavs orqali o'qish (bracket notation). Bunda kalit nomi qo'shtirnoq ichida yoziladi.

---

## 5. Qadamma-qadam (trace)

Obyekt tuzilishi jadvali:

| Kalit (\`key\`) | Qiymat (\`value\`) | Nuqta orqali o'qish | Kvadrat qavs orqali o'qish |
|---|---|---|---|
| \`name\` | "Ali" | \`user.name\` | \`user["name"]\` |
| \`age\` | 20 | \`user.age\` | \`user["age"]\` |
| \`city\` | "Toshkent" | \`user.city\` | \`user["city"]\` |

---

## 6. Yana bitta misol

1-misoldan farqi: Kalit nomini o'zgaruvchi orqali dinamik o'qish faqat \`[ ]\` (kvadrat qavs) yordamida amalga oshiriladi.

\`\`\`javascript
const car = {
  brand: "Chevrolet",
  model: "Cobalt"
};

let keyName = "brand";
console.log(car[keyName]); // Chevrolet (o'zgaruvchi orqali o'qildi)
console.log(car.keyName); // undefined (chunki "keyName" degan kalit yo'q)
\`\`\`

\`\`\`text
// Natija:
Chevrolet
undefined
\`\`\`

Tahlil:
- \`car[keyName]\` yozilganda, JavaScript \`keyName\` o'zgaruvchisining ichidagi qiymatni oladi (\`"brand"\`) va \`car["brand"]\` ni qidiradi.
- \`car.keyName\` yozilganda esa, u to'g'ridan-to'g'ri \`keyName\` degan kalitni qidiradi va topolmagach \`undefined\` beradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Kvadrat qavsda qo'shtirnoqni unutib qo'yish

\`\`\`javascript
const person = { name: "Vali" };

console.log(person[name]); // XATO: ReferenceError: name is not defined
\`\`\`

**Nima bo'ladi:** Qo'shtirnoqsiz \`name\` deb yozilsa, JavaScript uni o'zgaruvchi deb o'ylaydi va u topilmagach \`ReferenceError\` xatosi chiqadi.
**To'g'ri varianti:** Qo'shtirnoq bilan yozing: \`person["name"]\` yoki oddiygina \`person.name\`.

### 2-xato: Mavjud bo'lmagan kalitga murojaat qilish

\`\`\`javascript
const book = { title: "Alkimyogar" };

console.log(book.price); // undefined
\`\`\`

**Nima bo'ladi:** Obyektda \`price\` kaliti yo'q bo'lsa, dastur to'xtab qolmaydi, balki \`undefined\` qaytaradi.
**To'g'ri varianti:** Kalit nomini to'g'ri yozganingizga ishonch hosil qiling.

### 3-xato: Obyekt ichida : o'rniga = belgisini qo'yish

❌ Xato kod:
\`\`\`javascript
const student = {
  name = "Sami" // XATO: SyntaxError: Unexpected token '='
};
\`\`\`

**Nima bo'ladi:** Obyekt xususiyatlarida tenglik (\`=\`) emas, faqat ikki nuqta (\`:\`) ishlatiladi.
**To'g'ri varianti:** \`name: "Sami"\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`book\` nomli obyekt yarating: \`title: "O'tkan kunlar"\`, \`author: "Abdulla Qodiriy"\`. Nuqta orqali uning \`title\` xususiyatini konsolga chiqaring.

### 2-mashq (o'rtacha)
\`phone\` nomli obyekt yarating: \`brand: "Samsung"\`, \`price: 300\`. Kvadrat qavs orqali (\`phone["price"]\`) telefon narxini konsolga chiqaring.

### 3-mashq (chegara holat)
\`laptop = { ram: "16GB", cpu: "Intel" }\` obyekti berilgan. \`let property = "ram";\` nomli o'zgaruvchi orqali operativ xotira qiymatini dinamik ravishda konsolga chiqaring (\`laptop[property]\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const book = {
  title: "O'tkan kunlar",
  author: "Abdulla Qodiriy"
};

console.log(book.title); // O'tkan kunlar
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const phone = {
  brand: "Samsung",
  price: 300
};

console.log(phone["price"]); // 300
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const laptop = {
  ram: "16GB",
  cpu: "Intel"
};

let property = "ram";
console.log(laptop[property]); // 16GB
\`\`\`

---

## 9. Xulosa

1. Obyekt — ma'lumotlarni nomlangan kalit-qiymat (\`key: value\`) juftliklari ko'rinishida saqlaydi.
2. Obyekt xususiyatlarini o'qishning 2 xil usuli bor: nuqta (\`obyekt.kalit\`) va kvadrat qavs (\`obyekt["kalit"]\`).
3. Kalit nomi o'zgaruvchida saqlangan bo'lsa, uni faqat kvadrat qavs orqali dinamik o'qish mumkin (\`obyekt[ozgaruvchi]\`).

Keyingi darsda: Obyektga yangi xususiyat qo'shish, qiymatini yangilash va o'chirish (delete) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "book obyekti va title xususiyati",
      instruction: "`book` nomli obyekt yarating: `title: \"O'tkan kunlar\"`, `author: \"Abdulla Qodiriy\"`. Nuqta orqali uning `title` xususiyatini konsolga chiqaring.",
      startingCode: "// book obyektini yarating va title ni konsolga chiqaring\n",
      hint: "const book = {\n  title: \"O'tkan kunlar\",\n  author: \"Abdulla Qodiriy\"\n};\nconsole.log(book.title);",
      test: "if (!code.includes('book')) return 'book obyekti yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"O'tkan kunlar\"))) return null;\nreturn 'Konsolga \"O\\'tkan kunlar\" chiqmadi';"
    },
    {
      id: 2,
      title: "phone obyekti va kvadrat qavs",
      instruction: "`phone` nomli obyekt yarating: `brand: \"Samsung\"`, `price: 300`. Kvadrat qavs orqali (`phone[\"price\"]`) konsolga narxni chiqaring.",
      startingCode: "// phone obyektini yarating va kvadrat qavs bilan narxni chiqaring\n",
      hint: "const phone = {\n  brand: \"Samsung\",\n  price: 300\n};\nconsole.log(phone[\"price\"]);",
      test: "if (!code.includes('phone')) return 'phone obyekti yaratilmadi';\nif (!code.includes('[\"price\"]') && !code.includes(\"['price']\")) return 'Kvadrat qavs orqali murojaat qilinmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('300'))) return null;\nreturn 'Konsolga 300 chiqmadi';"
    },
    {
      id: 3,
      title: "O'zgaruvchi orqali dinamik o'qish",
      instruction: "`laptop = { ram: \"16GB\", cpu: \"Intel\" }` obyekti berilgan. `property = \"ram\"` o'zgaruvchisi orqali xotirani (`laptop[property]`) konsolga chiqaring.",
      startingCode: "const laptop = { ram: \"16GB\", cpu: \"Intel\" };\nlet property = \"ram\";\n// property o'zgaruvchisi yordamida laptopdan o'qing va chiqaring\n",
      hint: "console.log(laptop[property]);",
      test: "if (!code.includes('laptop[property]')) return 'laptop[property] shaklida dinamik murojaat qilinmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('16GB'))) return null;\nreturn 'Konsolga 16GB chiqmadi';"
    },
    {
      "id": 4,
      "title": "Nuqta orqali xususiyat o'qish",
      "instruction": "`const car = { brand: \"Toyota\", year: 2020 };` obyektining `year` xususiyatini nuqta orqali konsolga chiqaring.",
      "startingCode": "const car = { brand: \"Toyota\", year: 2020 };\n// year xususiyatini konsolga chiqaring\n",
      "hint": "console.log(car.year);",
      "test": "if (!code.includes(\"car\")) return \"car obyekti topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"2020\"))) return null;\nreturn \"Konsolga 2020 chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Yangi xususiyat qo'shish",
      "instruction": "`const user = { name: \"Ali\" };` obyektiga `age: 25` xususiyatini qo'shib, `user.age` ni konsolga chiqaring.",
      "startingCode": "const user = { name: \"Ali\" };\n// age: 25 xususiyatini qo'shing va chiqaring\n",
      "hint": "user.age = 25;\nconsole.log(user.age);",
      "test": "if (!code.includes(\"user\")) return \"user obyekti topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"25\"))) return null;\nreturn \"Konsolga 25 chiqmadi\";"
    },
    {
      "id": 6,
      "title": "Ichki xususiyatga murojaat",
      "instruction": "`const person = { name: \"Ali\", address: { city: \"Toshkent\" } };` obyektidan ichki `city` xususiyatini (`person.address.city`) konsolga chiqaring.",
      "startingCode": "const person = { name: \"Ali\", address: { city: \"Toshkent\" } };\n// person.address.city ni chiqaring\n",
      "hint": "console.log(person.address.city);",
      "test": "if (!code.includes(\"person\")) return \"person obyekti topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Toshkent\"))) return null;\nreturn \"Konsolga Toshkent chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Metodni chaqirish",
      "instruction": "`const dog = { name: \"Rex\", bark() { return \"Vov\"; } };` obyektining `bark()` metodini chaqirib, natijasini konsolga chiqaring.",
      "startingCode": "const dog = { name: \"Rex\", bark() { return \"Vov\"; } };\n// bark() metodini chaqirib chiqaring\n",
      "hint": "console.log(dog.bark());",
      "test": "if (!code.includes(\"bark\")) return \"bark metodi chaqirilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Vov\"))) return null;\nreturn \"Konsolga Vov chiqmadi\";"
    },
    {
      "id": 8,
      "title": "= xatosini tuzatish",
      "instruction": "Quyidagi obyektda xususiyatlar `=` bilan ajratilgan — bu sintaksis xatosi. `=` belgilarini `:` ga o'zgartirib, `point.x` ni konsolga chiqaring.",
      "startingCode": "const point = {\n  x = 5,\n  y = 10\n};\nconsole.log(point.x);\n",
      "hint": "x: 5 va y: 10 ko'rinishida yozing.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"5\")) return null;\nreturn \"Konsolga 5 chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Ikki xususiyatni bitta chiqarish",
      "instruction": "`const book = { title: \"Kitob\", pages: 200 };` obyektining `title` va `pages` xususiyatlarini AYNAN BIRTA `console.log` bilan chiqaring.",
      "startingCode": "const book = { title: \"Kitob\", pages: 200 };\n// ikkalasini bitta console.log bilan chiqaring\n",
      "hint": "console.log(book.title, book.pages);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return \"Bitta console.log bilan chiqaring\";\nif (out[0].includes(\"Kitob\") && out[0].includes(\"200\")) return null;\nreturn \"Kitob va 200 birga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Hisoblangan kalit (chegara)",
      "instruction": "`let key = \"name\";` va `let value = \"Ali\";` berilgan. `obj` nomli obyekt yarating: `key` o'zgaruvchisining qiymati kalit, `value` esa qiymat bo'lsin (`{ [key]: value }`). So'ng `obj.name` ni konsolga chiqaring.",
      "startingCode": "let key = \"name\";\nlet value = \"Ali\";\n// obj yarating va obj.name ni chiqaring\n",
      "hint": "const obj = { [key]: value };\nconsole.log(obj.name);",
      "test": "if (!code.includes(\"obj\")) return \"obj obyekti topilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Ali\"))) return null;\nreturn \"Konsolga Ali chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Obyekt qaysi qavslar yordamida yaratiladi?",
      options: [
        "{ } (jingalak qavslar)",
        "[ ] (kvadrat qavslar)",
        "( ) (oddiy qavslar)",
        "< > (burchakli qavslar)"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da obyektlar jingalak qavslar { } ichida kalit-qiymat juftliklari sifatida yaratiladi."
    },
    {
      id: 2,
      question: "Kalit nomi o'zgaruvchida saqlangan bo'lsa (let k = 'age'), unga qanday murojaat qilinadi?",
      options: [
        "obyekt[k]",
        "obyekt.k",
        "obyekt.'k'",
        "obyekt(k)"
      ],
      correctAnswer: 0,
      explanation: "O'zgaruvchi ichidagi kalit nomi bo'yicha qiymatni dinamik o'qish uchun faqat kvadrat qavs ishlatiladi: obyekt[k]."
    },
    {
      id: 3,
      question: "Obyektda mavjud bo'lmagan kalitga murojaat qilinsa nima qaytadi?",
      options: [
        "undefined",
        "null",
        "0",
        "ReferenceError"
      ],
      correctAnswer: 0,
      explanation: "Obyektda yo'q bo'lgan xususiyat chaqirilganda JavaScript xatolik bermaydi, balki undefined qaytaradi."
    },
    {
      "id": 4,
      "question": "Obyekt xususiyatlari bir-biridan qanday belgi bilan ajratiladi?",
      "options": [
        "Vergul bilan",
        "Nuqta bilan",
        "Nuqtali vergul bilan",
        "Qo'shtirnoq bilan"
      ],
      "correctAnswer": 0,
      "explanation": "Obyekt ichidagi xususiyatlar (kalit: qiymat juftliklari) bir-biridan vergul bilan ajratiladi."
    },
    {
      "id": 5,
      "question": "`const o = { a: 1, b: 2 }; console.log(o.b);` kodi nima chiqaradi?",
      "options": [
        "2",
        "1",
        "b",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "o.b — b kalitiga mos qiymat, ya'ni 2 ni qaytaradi."
    },
    {
      "id": 6,
      "question": "Mavjud obyektga yangi xususiyat qanday qo'shiladi?",
      "options": [
        "`o.yangi = qiymat;`",
        "`o[qo'shish] = qiymat;`",
        "`o.push(qiymat);`",
        "Faqat qayta yaratish orqali"
      ],
      "correctAnswer": 0,
      "explanation": "Mavjud obyektga yangi kalit nuqta orqali qiymat berib qo'shiladi: o.yangi = qiymat."
    },
    {
      "id": 7,
      "question": "Qaysi holatda nuqta o'rniga kvadrat qavs ishlatish shart?",
      "options": [
        "Kalit nomida bo'shliq yoki maxsus belgi bo'lsa",
        "Kalit son bo'lmaganda",
        "Obyekt bo'sh bo'lsa",
        "Hech qachon"
      ],
      "correctAnswer": 0,
      "explanation": "Kalit nomida bo'shliq, chiziqcha yoki boshqa maxsus belgi bo'lsa, kvadrat qavs ishlatiladi: o[\"first name\"]."
    },
    {
      "id": 8,
      "question": "`const o = {}; o.x = 5; console.log(o.x);` nima chiqaradi?",
      "options": [
        "5",
        "undefined",
        "null",
        "{}"
      ],
      "correctAnswer": 0,
      "explanation": "Bo'sh obyektga x kaliti qo'shildi va uning qiymati 5 — konsolga 5 chiqadi."
    },
    {
      "id": 9,
      "question": "`const o = { a: { b: 1 } }; console.log(o.a.b);` nima chiqaradi?",
      "options": [
        "1",
        "undefined",
        "{ b: 1 }",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Ichki obyektga zanjir bo'yicha murojaat qilinadi: o.a.b — birinchi a, so'ng uning ichidagi b."
    },
    {
      "id": 10,
      "question": "Metod nima?",
      "options": [
        "Obyekt ichida saqlangan funksiya",
        "Obyektning kaliti",
        "Obyektning uzunligi",
        "Massiv elementi"
      ],
      "correctAnswer": 0,
      "explanation": "Obyekt ichidagi funksiya metod deb ataladi va u nuqta orqali chaqiriladi: obyekt.metod()."
    },
    {
      "id": 11,
      "question": "`const o = { name: \"Ali\" }; console.log(o.name);` kodi nima qaytaradi?",
      "options": [
        "Ali",
        "name",
        "undefined",
        "null"
      ],
      "correctAnswer": 0,
      "explanation": "o.name — name kalitining qiymati, ya'ni \"Ali\" matni."
    },
    {
      "id": 12,
      "question": "`const laptop = { ram: \"16GB\" }; let p = \"ram\"; console.log(laptop[p]);` nima chiqaradi?",
      "options": [
        "16GB",
        "ram",
        "undefined",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Kvadrat qavs ichidagi o'zgaruvchi uning qiymatiga (\"ram\") aylanadi, shuning uchun laptop[\"ram\"] = 16GB olinadi."
    }
  ]
};
