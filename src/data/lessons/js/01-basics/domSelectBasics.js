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
      id: 1,
      title: "ID bo'yicha elementni tanlash",
      instruction: "`document.getElementById(\"btn\")` yordamida elementni tanlang va `btn !== null` ekanligini konsolga chiqaring.",
      startingCode: "// document.getElementById(\"btn\") qiling va btn !== null ni chiqaring\n",
      hint: "const btn = document.getElementById(\"btn\");\nconsole.log(btn !== null);",
      test: "if (!code.includes('getElementById')) return 'getElementById ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry {\n  const mockElements = { btn: { id: 'btn' } };\n  const mockDoc = { getElementById: id => mockElements[id] || null };\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('document', code)(doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "querySelector bilan klass tanlash",
      instruction: "`document.querySelector(\".active\")` orqali elementni tanlang va `item !== null` ekanligini konsolga chiqaring.",
      startingCode: "// document.querySelector(\".active\") qiling va item !== null ni chiqaring\n",
      hint: "const item = document.querySelector(\".active\");\nconsole.log(item !== null);",
      test: "if (!code.includes('querySelector')) return 'querySelector ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry {\n  const mockElements = { '.active': { className: 'active' } };\n  const mockDoc = { querySelector: sel => mockElements[sel] || null };\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('document', code)(doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Topilmagan element (null)",
      instruction: "`document.getElementById(\"not-found\")` deb qidiring va olingan natijani konsolga chiqaring (`null` chiqishi kerak).",
      startingCode: "// document.getElementById(\"not-found\") ni oling va konsolga chiqaring\n",
      hint: "const item = document.getElementById(\"not-found\");\nconsole.log(item);",
      test: "if (!code.includes('getElementById')) return 'getElementById ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry {\n  const mockDoc = { getElementById: () => null };\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('document', code)(doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('null')) return null;\nreturn 'null konsolga chiqmadi';"
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
    }
  ]
};
