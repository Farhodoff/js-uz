export const windowDocumentBasics = {
  id: "windowDocumentBasics",
  title: "DOM Asoslari: window va document",
  language: "javascript",
  theory: `## 1. Bu nima?

Katta bir ko'rgazma binosini tasavvur qiling: butun bino, uning devorlari, eshik-derazalari va qoidalari — bu **window** (oyna / bino). Binoning ichida devorga osilgan va tashrif buyuruvchilar o'qiydigan rasmlar hamda matnlar yozilgan ko'rgazma varag'i (ekponat) — bu **document** (hujjat).

JavaScript da ham xuddi shunday:
- **window** — butun brauzer oynasini ifodalovchi eng oliy (global) obyekt.
- **document** — o'sha oyna ichida ochilgan veb-sahifaning (HTML hujjatining) o'zi.

**window va document** — JavaScript brauzer oynasi va unda ochilgan veb-sahifa bilan muloqot qilishi uchun xizmat qiladigan ikkita asosiy global kirish eshigidir.

*Yangi terminlar:*
- **window** — brauzer oynasining o'zi va JavaScript ning brauzerdagi eng yuqori global obyekti.
- **document** — oyna ichidagi veb-sahifa (HTML hujjati). U \`window\` obyektining ichida joylashgan (\`window.document\`).
- **DOM (Document Object Model)** — HTML hujjatining JavaScript tushunadigan obyektlar ko'rinishidagi tuzilmasi.

---

## 2. Nega kerak?

Shu paytgacha biz faqat konsol (\`console.log\`) bilan ishladik. Ammo haqiqiy veb-saytlar va dasturlarda foydalanuvchi ko'rib turgan sahifa sarlavhasini o'zgartirish, brauzer oynasining o'lchamini bilish yoki sahifadagi yozuvlarni yangilash kerak bo'ladi.

Bularning barchasiga kirish uchun JavaScript ga bitta boshlang'ich nuqta kerak — bu nuqta aynan \`document\` va \`window\` obyektlaridir.

---

## 3. Birinchi misol

Bu kod sahifa sarlavhasini o'qiydi va \`window\` hamda \`document\` obyekt ekanligini ko'rsatadi (brauzer konsolida):

\`\`\`javascript
console.log(document.title); // sahifa sarlavhasini o'qiydi (masalan: "Bosh sahifa")
console.log(typeof window); // "object" (butun brauzer oynasi)
console.log(typeof document); // "object" (veb-sahifa hujjati)
\`\`\`

\`\`\`text
// Natija (brauzerda):
Bosh sahifa
object
object
\`\`\`

---

## 4. Qator-baqator tahlil

- \`document.title;\` — \`document\` obyekti orqali ochilgan sahifaning tepasida (brauzer tab'ida) yozilgan sarlavhani o'qib oldik. Uni \`document.title = "Yangi nom";\` deb o'zgartirish ham mumkin!
- \`typeof window;\` — \`window\` brauzerning eng katta global obyekti bo'lib, uning turi \`object\` dir.
- \`typeof document;\` — \`document\` ham obyekt bo'lib, u \`window.document\` ning qisqartirilgan ko'rinishidir.

---

## 5. Qadamma-qadam (solishtirish jadvali)

\`window\` va \`document\` ning farqlari:

| Obyekt | Bu nima? | Mas'uliyat sohasi | Misollar |
|---|---|---|---|
| \`window\` | Butun brauzer oynasi | Oyna o'lchami, brauzer oynasi bilan bog'liq amallar | \`window.innerWidth\`, \`window.alert\` |
| \`document\` | Veb-sahifa (HTML) | Sahifadagi matnlar, tugmalar, sarlavhalar | \`document.title\`, \`document.body\` |

Iyerarxiya: \`window\` eng tepada turadi, uning ichida esa \`document\` joylashgan: \`window.document === document\` (\`true\`).

---

## 6. Yana bitta misol

1-misoldan farqi: Sahifa sarlavhasini JavaScript orqali yangilash va oyna kengligini bilish.

\`\`\`javascript
console.log("Eski sarlavha: " + document.title);

document.title = "Mening Yangi Saytim"; // sarlavhani yangilash
console.log("Yangi sarlavha: " + document.title);

console.log("Oyna kengligi: " + window.innerWidth); // oyna kengligi (pikselda)
\`\`\`

\`\`\`text
// Natija:
Eski sarlavha: Bosh sahifa
Yangi sarlavha: Mening Yangi Saytim
Oyna kengligi: 1200
\`\`\`

Tahlil:
- \`document.title = ...\` orqali brauzer tab'idagi nom darhol o'zgaradi.
- \`window.innerWidth\` esa ayni damda brauzer oynasi necha piksel kenglikda ekanligini aytib beradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Node.js muhitida window yoki document ni ishlatishga urinish

\`\`\`javascript
console.log(window); // ReferenceError: window is not defined
\`\`\`

**Nima bo'ladi:** \`window\` va \`document\` faqat brauzerda (veb-saytda) mavjud. Node.js da brauzer oynasi yo'qligi sababli bu obyektlar topilmaydi.
**To'g'ri varianti:** Bu obyektlar veb-brauzer muhitida ishlatiladi.

### 2-xato: Har safar window.document deb yozish shart deb o'ylash

\`\`\`javascript
window.document.title = "Salom"; // to'g'ri, lekin ortiqcha uzun
\`\`\`

**Nima bo'ladi:** \`window\` global bo'lgani uchun uning ichidagi barcha narsalarga to'g'ridan-to'g'ri \`window.\` siz murojaat qilish mumkin.
**To'g'ri varianti:** Qisqagina \`document.title = "Salom";\` deb yozing.

### 3-xato: document.title ga matn o'rniga obyekt berib qo'yish

\`\`\`javascript
document.title = { name: "Sayt" };
console.log(document.title); // "[object Object]"
\`\`\`

**Nima bo'ladi:** Sarlavha doimo matn (satr) bo'lishi kerak.
**To'g'ri varianti:** \`document.title = "Mening Saytim";\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`window\` va \`document\` bir-biriga bog'liqligini (\`window.document === document\`) tekshirib, natijasini konsolga chiqaring (\`true\`).

### 2-mashq (o'rtacha)
\`document.title = "Darslar ro'yxati"\` deb sahifa sarlavhasini o'zgartiring va \`document.title\` ni konsolga chiqaring.

### 3-mashq (chegara holat)
Brauzer oynasi kengligi noldan kattaligini (\`window.innerWidth > 0\`) tekshiring va natijani konsolga chiqaring (\`true\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
console.log(window.document === document); // true
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
document.title = "Darslar ro'yxati";
console.log(document.title);
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
console.log(window.innerWidth > 0); // true
\`\`\`

---

## 9. Xulosa

1. \`window\` — butun brauzer oynasini ifodalovchi eng yuqori global obyekt.
2. \`document\` — oyna ichida ochilgan HTML veb-sahifasini ifodalovchi obyekt.
3. \`document.title\` orqali sahifa sarlavhasini o'qish va JavaScript yordamida o'zgartirish mumkin.

Keyingi darsda: Sahifadagi HTML elementlarni tanlab olish — \`getElementById\` va \`querySelector\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "window va document bog'liqligi",
      instruction: "`window.document === document` tengligini tekshirib, natijasini konsolga chiqaring.",
      startingCode: "// window.document === document ni konsolga chiqaring\n",
      hint: "console.log(window.document === document);",
      test: "if (!code.includes('document')) return 'document ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry {\n  const mockDoc = { title: 'Bosh sahifa' };\n  const mockWin = { document: mockDoc, innerWidth: 1200 };\n  const win = typeof window !== 'undefined' ? window : mockWin;\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('window', 'document', code)(win, doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "document.title ni o'zgartirish",
      instruction: "`document.title` ni `\"Darslar ro'yxati\"` ga o'zgartiring va `document.title` ni konsolga chiqaring.",
      startingCode: "// document.title ni \"Darslar ro'yxati\" ga o'zgartiring va chiqaring\n",
      hint: "document.title = \"Darslar ro'yxati\";\nconsole.log(document.title);",
      test: "if (!code.includes('document.title')) return 'document.title ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry {\n  const mockDoc = { title: 'Bosh sahifa' };\n  const mockWin = { document: mockDoc, innerWidth: 1200 };\n  const win = typeof window !== 'undefined' ? window : mockWin;\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('window', 'document', code)(win, doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Darslar'))) return null;\nreturn \"Darslar sarlavhasi chiqmadi\";"
    },
    {
      id: 3,
      title: "Oyna kengligini tekshirish",
      instruction: "`window.innerWidth > 0` shartini tekshirib, natijani konsolga chiqaring.",
      startingCode: "// window.innerWidth > 0 ekanligini konsolga chiqaring\n",
      hint: "console.log(window.innerWidth > 0);",
      test: "if (!code.includes('innerWidth')) return 'innerWidth ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry {\n  const mockDoc = { title: 'Bosh sahifa' };\n  const mockWin = { document: mockDoc, innerWidth: 1200 };\n  const win = typeof window !== 'undefined' ? window : mockWin;\n  const doc = typeof document !== 'undefined' ? document : mockDoc;\n  new Function('window', 'document', code)(win, doc);\n} catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('true')) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Sarlavhani o'qish",
      "instruction": "Brauzer tab'idagi sarlavhani (mock: `\"Bosh sahifa\"`) `document.title` orqali o'qib, konsolga chiqaring.",
      "startingCode": "// document.title ni o'qib, konsolga chiqaring\n",
      "hint": "console.log(document.title);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"document.title\")) return \"document.title ishlatilmadi\";\nif (out.some((m) => m.includes(\"Bosh sahifa\"))) return null;\nreturn \"Sarlavha konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "Sarlavhaga qo'shimcha yozish",
      "instruction": "`document.title` ni o'qib, oxiriga `\" — Darslar\"` qo'shib qayta yozing va yangi sarlavhani konsolga chiqaring.",
      "startingCode": "// sarlavhani o'qib, \" — Darslar\" qo'shib qayta yozing va chiqaring\n",
      "hint": "document.title = document.title + \" — Darslar\";\nconsole.log(document.title);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"document.title\")) return \"document.title ishlatilmadi\";\nif (out.some((m) => m.includes(\"Bosh sahifa\") && m.includes(\"Darslar\"))) return null;\nreturn \"Yangi sarlavha konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "window.document orqali murojaat",
      "instruction": "`document` aslida `window` ning ichida turishini ko'rsating: sarlavhani `window.document.title` orqali o'qib, konsolga chiqaring.",
      "startingCode": "// window.document.title ni konsolga chiqaring\n",
      "hint": "console.log(window.document.title);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"window.document\")) return \"window.document ishlatilmadi\";\nif (out.some((m) => m.includes(\"Bosh sahifa\"))) return null;\nreturn \"Sarlavha konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Oyna kengligini matn bilan chiqarish",
      "instruction": "`window.innerWidth` qiymatini `\"Kenglik: \"` matni bilan qo'shib, konsolga chiqaring (mock: 1200).",
      "startingCode": "// \"Kenglik: \" matnini window.innerWidth bilan qo'shib chiqaring\n",
      "hint": "console.log(\"Kenglik: \" + window.innerWidth);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"innerWidth\")) return \"innerWidth ishlatilmadi\";\nif (out.some((m) => m.includes(\"Kenglik\") && m.includes(\"1200\"))) return null;\nreturn \"Kenglik konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Eski sarlavhani o'zgaruvchida saqlash",
      "instruction": "Avval `document.title` ni `oldTitle` o'zgaruvchisiga saqlang, keyin sarlavhani `\"Yangi sahifa\"` ga o'zgartiring va `oldTitle` ni konsolga chiqaring.",
      "startingCode": "// oldTitle ga saqlang, sarlavhani o'zgartiring, oldTitle ni chiqaring\n",
      "hint": "const oldTitle = document.title;\ndocument.title = \"Yangi sahifa\";\nconsole.log(oldTitle);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"document.title\")) return \"document.title ishlatilmadi\";\nif (out.some((m) => m.includes(\"Bosh sahifa\"))) return null;\nreturn \"Eski sarlavha konsolga chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Chegara: ikkala obyektni birga tekshirish",
      "instruction": "`window.innerWidth` noldan katta **va** `document.title` bo'sh emasligini bitta shartda (`&&`) tekshirib, natijani konsolga chiqaring (`true`).",
      "startingCode": "// innerWidth > 0 && document.title !== \"\" ni chiqaring\n",
      "hint": "console.log(window.innerWidth > 0 && document.title !== \"\");",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"innerWidth\") || !code.includes(\"title\")) return \"innerWidth va title ishlatilmadi\";\nif (out.includes(\"true\")) return null;\nreturn \"true konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Chegara: sarlavhaga faqat matn yoziladi",
      "instruction": "Sarlavhaga `42` sonini `String(42)` orqali matn qilib yozing va `document.title` bilan uning `typeof` turini konsolga chiqaring (mock sarlavhasi `\"Bosh sahifa\"`).",
      "startingCode": "// String(42) ni document.title ga yozib, qiymat va typeof ni chiqaring\n",
      "hint": "document.title = String(42);\nconsole.log(document.title, typeof document.title);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map((v) => (v === null ? \"null\" : typeof v === \"object\" ? JSON.stringify(v) : String(v))).join(\" \"));\ntry {\n  const mockDoc = { title: \"Bosh sahifa\" };\nconst mockWin = { document: mockDoc, innerWidth: 1200, innerHeight: 800, alert: function () {} };\nnew Function(\"window\", \"document\", code)(mockWin, mockDoc);\n} catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (!code.includes(\"String(\") || !code.includes(\"document.title\")) return \"String() va document.title ishlatilmadi\";\nif (out.some((m) => m.includes(\"42\") && m.includes(\"string\"))) return null;\nreturn \"42 va string konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Brauzerda window va document obyektlarining o'zaro iyerarxiyasi qanday?",
      options: [
        "window eng yuqori obyekt, document esa window ning ichida joylashgan",
        "document eng yuqori obyekt, window uning ichida joylashgan",
        "Ikkalasi mutlaqo bir-biriga bog'liq bo'lmagan alohida obyektlar",
        "window faqat Node.js da, document esa faqat brauzerda bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Brauzerda window butun oynani boshqaruvchi global obyekt, document esa uning ichidagi veb-sahifa (window.document) hisoblanadi."
    },
    {
      id: 2,
      question: "Veb-sahifaning brauzer tab'idagi sarlavhasini o'qish va o'zgartirish uchun qaysi xususiyat ishlatiladi?",
      options: [
        "document.title",
        "window.name",
        "document.header",
        "window.caption"
      ],
      correctAnswer: 0,
      explanation: "Sahifa sarlavhasi document.title xususiyati orqali o'qiladi va yangilanadi."
    },
    {
      id: 3,
      question: "Nima sababdan Node.js muhitida window yoki document ni chaqirib bo'lmaydi?",
      options: [
        "Chunki Node.js server muhiti bo'lib, unda brauzer oynasi va HTML hujjati mavjud emas",
        "Chunki Node.js faqat sonlar bilan ishlaydi",
        "Chunki ularni maxsus install qilish kerak",
        "Chunki ular faqat CSS da ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "window va document faqat veb-brauzer muhitiga tegishli API'lar bo'lib, serverda (Node.js da) ular mavjud emas."
    },
    {
      "id": 4,
      "question": "`window` obyekti nimani ifodalaydi?",
      "options": [
        "Sahifadagi faqat bitta HTML elementni",
        "CSS stillar to'plamini",
        "Butun brauzer oynasini boshqaruvchi eng yuqori global obyektni",
        "Serverdagi ma'lumotlar bazasini"
      ],
      "correctAnswer": 2,
      "explanation": "window — brauzer oynasining o'zi; uning ichida document, innerWidth kabi narsalar turadi."
    },
    {
      "id": 5,
      "question": "`window.document === document` ifodasi brauzerda qanday natija beradi?",
      "options": [
        "true — chunki document window ning ichidagi o'sha obyektning o'zi",
        "false — ikkalasi har xil obyekt",
        "undefined",
        "Xatolik (Error)"
      ],
      "correctAnswer": 0,
      "explanation": "document window obyektining ichida turadi, shuning uchun ikkala nom bir xil obyektga ishora qiladi."
    },
    {
      "id": 6,
      "question": "Brauzer oynasining kengligini qaysi xususiyat beradi?",
      "options": [
        "window.width",
        "window.innerWidth",
        "document.width",
        "window.size"
      ],
      "correctAnswer": 1,
      "explanation": "Oynaning ko'rinadigan kengligi pikselda window.innerWidth orqali olinadi."
    },
    {
      "id": 7,
      "question": "`window` global obyekt bo'lsa, uning ichidagi narsalarga qanday murojaat qilinadi?",
      "options": [
        "Har doim window. prefiksi bilan yozilishi shart",
        "To'g'ridan-to'g'ri nom bilan ham yozish mumkin (masalan, document.title)",
        "Faqat [] kvadrat qavs bilan",
        "Hech qanday yo'l bilan"
      ],
      "correctAnswer": 1,
      "explanation": "window global bo'lgani uchun uning ichidagi nomlarni window. siz ham ishlatish mumkin."
    },
    {
      "id": 8,
      "question": "`document.title = { name: \"Sayt\" }` kabi obyekt berilsa konsolda nima ko'rinadi?",
      "options": [
        "[object Object]",
        "{ name: 'Sayt' }",
        "Sayt",
        "Xatolik chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "Sarlavha matn bo'lishi kerak; obyekt berilsa u matnga aylanib [object Object] bo'lib qoladi."
    },
    {
      "id": 9,
      "question": "Node.js muhitida `window` ga murojaat qilinsa nima bo'ladi?",
      "options": [
        "Bo'sh obyekt qaytadi",
        "ReferenceError: window is not defined",
        "Avtomatik brauzer ochiladi",
        "window bo'sh matnga aylanadi"
      ],
      "correctAnswer": 1,
      "explanation": "window va document faqat brauzerda mavjud; server muhitida ular yo'q."
    },
    {
      "id": 10,
      "question": "`document` obyekti nimani ifodalaydi?",
      "options": [
        "Brauzer oynasining o'lchamini",
        "Foydalanuvchi kompyuterini",
        "Oyna ichida ochilgan HTML veb-sahifani",
        "JavaScript faylini"
      ],
      "correctAnswer": 2,
      "explanation": "document — window ichidagi HTML hujjat; sarlavha, body va boshqa elementlar shu yerda."
    },
    {
      "id": 11,
      "question": "Sahifa sarlavhasini JavaScript orqali o'zgartirganda brauzerda nima o'zgaradi?",
      "options": [
        "Sahifadagi barcha matnlar o'chib ketadi",
        "Brauzer tab'idagi nom darhol yangilanadi",
        "Faqat konsol tozalanadi",
        "Hech narsa o'zgarmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "document.title ga yangi matn yozilishi bilan tab nomi yangilanadi."
    },
    {
      "id": 12,
      "question": "`window.alert(\"Salom\")` chaqiruvining vazifasi nima?",
      "options": [
        "Konsolga matn chiqarish",
        "Sahifaga matn yozish",
        "Brauzerda foydalanuvchiga xabar oynasini ko'rsatish",
        "Sahifani yangilash"
      ],
      "correctAnswer": 2,
      "explanation": "alert — brauzerdagi xabar oynasi; u ham window ning ichida turadi (window.alert)."
    }
  ]
};
