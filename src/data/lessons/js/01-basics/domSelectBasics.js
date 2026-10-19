export const domSelectBasics = {
  id: "domSelectBasics",
  title: "DOM: Elementni Tanlash (getElementById va querySelector)",
  language: "javascript",
  theory: `## 1. Bu nima?

Katta bir ombordan qutini qidirib topishni tasavvur qiling: har bir qutiga uning maxsus unikal raqami (ID) yoki toifasi (klassi) yopishtirilgan. Siz omborchiga "Menga ID raqami 105 bo'lgan qutini topib ber" deysiz, u esa borib aynan o'sha qutini topib olib keladi.

JavaScript da **elementni tanlash** aynan shunday ishlaydi: u sahifadagi kerakli HTML elementini (tugma, sarlavha, rasm) uning ID si yoki klassi bo'yicha topib, JavaScript o'zgaruvchisiga ushlab beradi.

**Elementni tanlash** — sahifadagi HTML elementiga murojaat qilish va u bilan ishlash uchun uni JavaScript obyektiga biriktirib olish jarayonidir.

*Yangi metodlar:*
- **document.getElementById("idNomi")** — ko'rsatilgan ID ga ega bo'lgan bitta elementni topadi.
- **document.querySelector("selektor")** — CSS selektoriga (\`#id\`, \`.klass\` yoki \`teg\`) mos keluvchi eng birinchi elementni topadi.
- Agar qidirilgan element sahifada topilmasa, ikkala metod ham **null** qaytaradi.

---

## 2. Nega kerak?

Sahifadagi tugmani bosganda nimadir sodir bo'lishi yoki biror matnni o'zgartirish uchun avval JavaScript o'sha tugma yoki matn sahifaning qayerida turganini aniqlashi, ya'ni uni "ushlab olishi" kerak.

Elementni tanlash orqali biz HTML va JavaScript o'rtasida ko'prik o'rnatamiz. Busiz veb-sahifadagi hech bir elementni boshqarib bo'lmaydi.

---

## 3. Birinchi misol

Oddiy HTML kodi:
\`\`\`html
<h1 id="title">Salom Dunyo</h1>
\`\`\`

JavaScript kodi:
\`\`\`javascript
const heading = document.getElementById("title"); // ID bo'yicha topish

console.log(heading !== null); // true (element topildi)
\`\`\`

\`\`\`text
// Natija:
true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`document.getElementById("title");\` — \`document\` dan \`id="title"\` bo'lgan elementni qidirib topishni so'radik. Diqqat: metod ichida panjara (\`#\`) belgisi yozilmaydi, faqat ID ning toza nomi yoziladi!
- \`const heading = ...;\` — topilgan HTML element JavaScript da alohida obyekt sifatida \`heading\` o'zgaruvchisiga biriktirildi.
- \`heading !== null;\` — element muvaffaqiyatli topilgani sababli u \`null\` emas. Agar bunday ID sahifada bo'lmaganida, natija \`null\` bo'lardi.

---

## 5. Qadamma-qadam (solishtirish jadvali)

\`getElementById\` va \`querySelector\` ning farqlari:

| Xususiyat | \`getElementById("nom")\` | \`querySelector("selektor")\` |
|---|---|---|
| Qanday qidiradi? | Faqat ID bo'yicha | Har qanday CSS selektor bo'yicha |
| Maxsus belgilar | Panjara (\`#\`) qo'yilmaydi | CSS kabi: \`"#id"\`, \`".btn"\`, \`"h1"\` |
| Topilmasa nima qaytadi? | \`null\` | \`null\` |
| Mos elementlar ko'p bo'lsa | ID odatda bitta bo'ladi | Eng birinchi uchragan bittasini oladi |

---

## 6. Yana bitta misol

1-misoldan farqi: \`querySelector\` yordamida klass (\`.\`) bo'yicha tanlash va topilmagan element holati.

Oddiy HTML kodi:
\`\`\`html
<p class="description">Bu matn</p>
\`\`\`

JavaScript kodi:
\`\`\`javascript
const textElement = document.querySelector(".description"); // klass bo'yicha topish
console.log(textElement !== null); // true

const missingElement = document.querySelector(".mavjud-emas"); // yo'q element
console.log(missingElement); // null
\`\`\`

\`\`\`text
// Natija:
true
null
\`\`\`

Tahlil:
- \`querySelector(".description")\` — xuddi CSS dagi kabi klass oldiga nuqta (\`.\`) qo'yiladi.
- Agar ko'rsatilgan klass sahifada bo'lmasa, dastur xato bermaydi, balki \`null\` qaytaradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: getElementById ichiga panjara (#) belgisini yozish

\`\`\`javascript
const el = document.getElementById("#title"); // XATO!
console.log(el); // null
\`\`\`

**Nima bo'ladi:** \`getElementById\` o'zi ID qidirishini biladi. Agar \`#\` qo'ysangiz, u aynan \`id="#title"\` degan g'alati nomni qidirib, hech narsa topolmaydi (\`null\` qaytadi).
**To'g'ri varianti:** Har doim panjarasiz yozing: \`document.getElementById("title");\`.

### 2-xato: querySelector da nuqta yoki panjarani unutib qoldirish

\`\`\`javascript
const btn = document.querySelector("submit-btn"); // XATO: <submit-btn> degan teg qidiradi
\`\`\`

**Nima bo'ladi:** Belgisiz yozilsa, CSS qoidasiga ko'ra HTML teg nomi deb tushuniladi va element topilmay qoladi.
**To'g'ri varianti:** Klass uchun nuqta: \`document.querySelector(".submit-btn")\`, ID uchun esa: \`document.querySelector("#submit-btn")\`.

### 3-xato: null qaytgan element ustida amallar bajarish

\`\`\`javascript
const el = document.getElementById("mavjudEmas");
console.log(el.textContent); // TypeError: Cannot read properties of null
\`\`\`

**Nima bo'ladi:** Agar element sahifada bo'lmasa, u \`null\` bo'ladi. \`null\` ning esa hech qanday xususiyati yo'q, natijada dastur xato beradi.
**To'g'ri varianti:** Har doim element topilganiga ishonch hosil qiling: \`if (el !== null) { ... }\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`document.getElementById("btn")\` orqali elementni tanlang va u \`null\` emasligini (\`btn !== null\`) konsolga chiqaring (\`true\`).

### 2-mashq (o'rtacha)
\`document.querySelector(".active")\` orqali \`.active\` klassli elementni tanlab oling va uning mavjudligini (\`item !== null\`) konsolga chiqaring (\`true\`).

### 3-mashq (chegara holat)
Sahifada yo'q bo'lgan ID ni: \`document.getElementById("not-found")\` deb qidiring va qaytgan natijani konsolga chiqaring (\`null\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const btn = document.getElementById("btn");

console.log(btn !== null); // true
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const item = document.querySelector(".active");

console.log(item !== null); // true
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const item = document.getElementById("not-found");

console.log(item); // null
\`\`\`

---

## 9. Xulosa

1. \`document.getElementById("id")\` — sahifadagi aynan shu ID ga ega bitta elementni topadi (panjarasiz yoziladi).
2. \`document.querySelector("selektor")\` — har qanday CSS selektori (\`#id\`, \`.class\`, \`teg\`) bo'yicha mos keluvchi birinchi elementni oladi.
3. Agar ko'rsatilgan element sahifada mavjud bo'lmasa, ikkala metod ham \`null\` qaytaradi.

Keyingi darsda: Elementni o'zgartirish — \`textContent\` va \`classList\` bilan tanishamiz.
`,
  exercises: [
    {
      "id": 1,
      "title": "ID bo'yicha elementni topish",
      "instruction": "`findTitle()` funksiyasi `document.getElementById(\"title\")` bilan elementni topib, uni qaytarsin. Diqqat: metod ichida panjara (`#`) yozilmaydi.",
      "startingCode": "function findTitle() {\n  // document.getElementById bilan toping\n}\n",
      "hint": "function findTitle() {\n  return document.getElementById(\"title\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (code.includes(\"getElementById(\\\"#\")) return \"Panjara (#) kerak emas\";\nif (!code.includes(\"getElementById\")) return \"getElementById ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findTitle()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija && natija.id === \"title\") return null;\nreturn \"title elementi topilmadi\";"
    },
    {
      "id": 2,
      "title": "Klass bo'yicha elementni topish",
      "instruction": "`findSaveByClass()` funksiyasi `document.querySelector(\".btn\")` bilan elementni topib qaytarsin.",
      "startingCode": "function findSaveByClass() {\n  // querySelector bilan .btn toping\n}\n",
      "hint": "function findSaveByClass() {\n  return document.querySelector(\".btn\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"querySelector\") || !code.includes(\".btn\")) return \"querySelector(\\'.btn\\') ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findSaveByClass()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija && natija.id === \"save\") return null;\nreturn \"save elementi topilmadi\";"
    },
    {
      "id": 3,
      "title": "Topilmagan element: null",
      "instruction": "`findMissing()` funksiyasi `document.getElementById(\"missing\")` natijasini qaytarsin — element yo'q bo'lgani uchun natija `null` bo'ladi.",
      "startingCode": "function findMissing() {\n  // mavjud bo'lmagan elementni qidiring\n}\n",
      "hint": "function findMissing() {\n  return document.getElementById(\"missing\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"getElementById\")) return \"getElementById ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findMissing()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija === null) return null;\nreturn \"null qaytarilishi kerak\";"
    },
    {
      "id": 4,
      "title": "querySelector bilan ID tanlash",
      "instruction": "`findByHash()` funksiyasi `document.querySelector(\"#title\")` bilan elementni topib qaytarsin (bu yerda panjara kerak!).",
      "startingCode": "function findByHash() {\n  // querySelector(\"#title\") ishlating\n}\n",
      "hint": "function findByHash() {\n  return document.querySelector(\"#title\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"#title\")) return \"\\\"#title\\\" selektori ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findByHash()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija && natija.id === \"title\") return null;\nreturn \"title elementi topilmadi\";"
    },
    {
      "id": 5,
      "title": "Teg nomi bo'yicha tanlash",
      "instruction": "`findButton()` funksiyasi `document.querySelector(\"button\")` bilan sahifadagi tugmani topib qaytarsin.",
      "startingCode": "function findButton() {\n  // querySelector(\"button\") ishlating\n}\n",
      "hint": "function findButton() {\n  return document.querySelector(\"button\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"button\")) return \"button selektori ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findButton()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija && natija.id === \"save\") return null;\nreturn \"button tegidagi element topilmadi\";"
    },
    {
      "id": 6,
      "title": "Mavjud bo'lmagan klass: null",
      "instruction": "`missingClass()` funksiyasi `document.querySelector(\".yoq\")` natijasini qaytarsin (`null`).",
      "startingCode": "function missingClass() {\n  // mavjud bo'lmagan klassni qidiring\n}\n",
      "hint": "function missingClass() {\n  return document.querySelector(\".yoq\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\".yoq\")) return \"\\\".yoq\\\" selektori ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"missingClass()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija === null) return null;\nreturn \"null qaytarilishi kerak\";"
    },
    {
      "id": 7,
      "title": "h1 tegini tanlash",
      "instruction": "`findByTag()` funksiyasi `document.querySelector(\"h1\")` bilan sarlavha elementini topib qaytarsin.",
      "startingCode": "function findByTag() {\n  // querySelector(\"h1\") ishlating\n}\n",
      "hint": "function findByTag() {\n  return document.querySelector(\"h1\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"h1\")) return \"h1 selektori ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"findByTag()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija && natija.id === \"title\") return null;\nreturn \"h1 elementi topilmadi\";"
    },
    {
      "id": 8,
      "title": "Chegara: ikki xil yo'l bilan bir element",
      "instruction": "`sameElement()` funksiyasi `document.querySelector(\".btn\") === document.getElementById(\"save\")` natijasini qaytarsin (`true`).",
      "startingCode": "function sameElement() {\n  // ikkala usul bilan bir elementni topib solishtiring\n}\n",
      "hint": "function sameElement() {\n  return document.querySelector(\".btn\") === document.getElementById(\"save\");\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"querySelector\") || !code.includes(\"getElementById\")) return \"Ikkala metod ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"sameElement()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija === true) return null;\nreturn \"true qaytarilishi kerak\";"
    },
    {
      "id": 9,
      "title": "Element borligini tekshirish",
      "instruction": "`hasTitle()` funksiyasi `document.getElementById(\"title\") !== null` natijasini qaytarsin (`true`).",
      "startingCode": "function hasTitle() {\n  // element null emasligini tekshiring\n}\n",
      "hint": "function hasTitle() {\n  return document.getElementById(\"title\") !== null;\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"getElementById\")) return \"getElementById ishlatilmadi\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"hasTitle()\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (natija === true) return null;\nreturn \"true qaytarilishi kerak\";"
    },
    {
      "id": 10,
      "title": "Chegara: xavfsiz qidiruv funksiyasi",
      "instruction": "`safeFind(id)` funksiyasi `document.getElementById(id)` bilan qidirsin: element topilsa uning `id` sini, topilmasa `\"Element topilmadi\"` matnini qaytarsin.",
      "startingCode": "function safeFind(id) {\n  // if bilan null ni tekshirib, id yoki xabar qaytaring\n}\n",
      "hint": "function safeFind(id) {\n  const el = document.getElementById(id);\n  if (el === null) {\n    return \"Element topilmadi\";\n  }\n  return el.id;\n}",
      "test": "const titleEl = { id: \"title\" };\nconst saveEl = { id: \"save\" };\nconst mockDoc = {\n  getElementById: (id) => (id === \"title\" ? titleEl : id === \"save\" ? saveEl : null),\n  querySelector: (sel) => ({ \"#title\": titleEl, \".btn\": saveEl, \"button\": saveEl, \"h1\": titleEl }[sel] || null)\n};\nif (!code.includes(\"getElementById\")) return \"getElementById ishlatilmadi\";\nif (!code.includes(\"if\")) return \"if bilan tekshirish kerak\";\nlet natija;\ntry { natija = new Function(\"document\", code + \"; return \" + \"[safeFind(\\\"title\\\"), safeFind(\\\"missing\\\")]\" + \";\")(mockDoc); } catch (e) { return \"Xato: \" + e.message; }\nif (Array.isArray(natija) && natija[0] === \"title\" && natija[1] === \"Element topilmadi\") return null;\nreturn \"\\\"title\\\" va \\\"Element topilmadi\\\" kutilgan\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "document.getElementById() metodiga ID nomi qanday uzatiladi?",
      options: [
        "Panjarasiz, faqat nomi: getElementById('title')",
        "Panjara bilan: getElementById('#title')",
        "Nuqta bilan: getElementById('.title')",
        "Qavssiz: getElementById title"
      ],
      correctAnswer: 0,
      explanation: "getElementById metodi o'zi ID qidirishini biladi, shuning uchun unga '#' belgisi qo'yilmaydi."
    },
    {
      id: 2,
      question: "document.querySelector() yordamida klass bo'yicha element qanday qidiriladi?",
      options: [
        "Nuqta bilan: querySelector('.my-class')",
        "Panjara bilan: querySelector('#my-class')",
        "Belgisiz: querySelector('my-class')",
        "class so'zi bilan: querySelector('class:my-class')"
      ],
      correctAnswer: 0,
      explanation: "querySelector CSS selektorlari bilan ishlaydi, shuning uchun klasslar oldiga nuqta (.my-class) qo'yiladi."
    },
    {
      id: 3,
      question: "Qidirilgan element sahifada mavjud bo'lmasa, getElementById nima qaytaradi?",
      options: [
        "null",
        "undefined",
        "false",
        "Xatolik (Error) beradi"
      ],
      correctAnswer: 0,
      explanation: "Agar element HTML sahifada topilmasa, metod xato bermaydi, balki null qiymatini qaytaradi."
    },
    {
      "id": 4,
      "question": "`document.getElementById(\"#title\")` deb panjara bilan yozilsa nima bo'ladi?",
      "options": [
        "Element topiladi",
        "null qaytadi, chunki u `#title` nomli ID ni qidiradi",
        "Xatolik chiqadi",
        "Sahifa yangilanadi"
      ],
      "correctAnswer": 1,
      "explanation": "getElementById faqat ID ning toza nomini oladi; panjara qo'yilsa mos element topilmaydi."
    },
    {
      "id": 5,
      "question": "`document.querySelector(\".menu\")` qanday elementni qidiradi?",
      "options": [
        "id=\"menu\" bo'lgan elementni",
        "class=\"menu\" bo'lgan elementni",
        "<menu> tegini",
        "Faqat tugmalarni"
      ],
      "correctAnswer": 1,
      "explanation": "querySelector CSS selektorlari bilan ishlaydi: nuqta (.) klass ma'nosini bildiradi."
    },
    {
      "id": 6,
      "question": "querySelector ga bir nechta element mos kelsa, qaysi biri tanlanadi?",
      "options": [
        "Eng birinchi uchragan element",
        "Eng oxirgi element",
        "Hammasi massiv bo'lib qaytadi",
        "Hech biri, null qaytadi"
      ],
      "correctAnswer": 0,
      "explanation": "querySelector hujjat tartibida birinchi mos elementni oladi; hammasi kerak bo'lsa boshqa metod kerak."
    },
    {
      "id": 7,
      "question": "`getElementById` va `querySelector` orasidagi asosiy farq nima?",
      "options": [
        "getElementById faqat ID bo'yicha, querySelector esa har qanday CSS selektor bo'yicha qidiradi",
        "querySelector faqat ID bo'yicha qidiradi",
        "Ikkalasi faqat klass bo'yicha qidiradi",
        "Farqi yo'q"
      ],
      "correctAnswer": 0,
      "explanation": "getElementById faqat ID oladi (panjarasiz), querySelector esa #id, .klass va teg kabi selektorlarni tushunadi."
    },
    {
      "id": 8,
      "question": "Sahifada mos element bo'lmasa `querySelector` nima qaytaradi?",
      "options": [
        "undefined",
        "false",
        "null",
        "Xatolik (Error)"
      ],
      "correctAnswer": 2,
      "explanation": "Elementni tanlash metodlari topilmasa xato bermaydi, null qaytaradi."
    },
    {
      "id": 9,
      "question": "`document.querySelector(\"h1\")` selektori nimani bildiradi?",
      "options": [
        "id=\"h1\" bo'lgan elementni",
        "class=\"h1\" bo'lgan elementni",
        "`<h1>` tegini",
        "h1 nomli o'zgaruvchini"
      ],
      "correctAnswer": 2,
      "explanation": "Hech qanday belgi qo'yilmasa, selektor teg nomi sifatida o'qiladi."
    },
    {
      "id": 10,
      "question": "Tanlangan elementni o'zgaruvchiga saqlash nega foydali?",
      "options": [
        "Elementni bir marta topib, keyin bir necha marta ishlatish uchun",
        "Faqat chiroyli ko'rinishi uchun",
        "Elementni sahifadan o'chirish uchun",
        "Saqlash shart emas, har doim qaytadan yozish kerak"
      ],
      "correctAnswer": 0,
      "explanation": "Bir marta tanlab o'zgaruvchiga olsak, keyingi qatorlarda uni qayta qidirmasdan ishlatamiz."
    },
    {
      "id": 11,
      "question": "`document.querySelector(\"#save\")` va `document.getElementById(\"save\")` bir xil elementni bersa, ularning taqqoslashi (`===`) qanday natija beradi?",
      "options": [
        "true — ikkalasi bir xil elementga havola qiladi",
        "false — har safar yangi obyekt yaratiladi",
        "undefined",
        "Xatolik chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "Ikki metod ham sahifadagi o'sha bir elementni qaytaradi, shuning uchun havolalar teng."
    },
    {
      "id": 12,
      "question": "Elementni tanlab olmasdan turib uni o'zgartirish mumkinmi?",
      "options": [
        "Ha, JavaScript elementni o'zi topadi",
        "Yo'q, avval elementi tanlab olish kerak",
        "Faqat CSS orqali mumkin",
        "Ha, faqat tugmalar uchun mumkin"
      ],
      "correctAnswer": 1,
      "explanation": "HTML va JavaScript o'rtasidagi ko'prik — elementni tanlash; usiz hech narsani boshqarib bo'lmaydi."
    }
  ]
};
