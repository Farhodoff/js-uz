export const tryCatchBasics = {
  id: "tryCatchBasics",
  title: "Xatoni Ushlash: try...catch",
  language: "javascript",
  theory: `## 1. Bu nima?

Sirkda havoda sakrovchi gimnastikachilarni tasavvur qiling: ularning xavfsizligi uchun pastga mustahkam to'r (straxovka) tortib qo'yiladi. Agar gimnastikachi xatoga yo'l qo'yib yiqilib tushsa, to'r uni tutib qoladi — u shikastlanmaydi va butun tomosha to'xtab qolmaydi.

Dasturlashda **try...catch** xuddi shu xavfsizlik to'ri vazifasini bajaradi: u xato yuz berishi mumkin bo'lgan kodni sinab ko'radi va agar kutilmagan xatolik chiqsa, uni xavfsiz ushlab olib, butun dastur qulab (to'xtab) qolishining oldini oladi.

**try...catch** — dastur ishlayotgan paytda yuzaga kelishi mumkin bo'lgan xatoliklarni ushlab olish va dastur ishini to'xtatmasdan xavfsiz davom ettirish konstruksiyasidir.

*Yangi terminlar:*
- **try bloki** — "harakat qilib ko'rish" bloki. Bu blok ichiga xatolik berish ehtimoli bo'lgan kod yoziladi.
- **catch (error) bloki** — "ushlab olish" bloki. Agar \`try\` ichida xato ro'y bersa, dastur to'xtamay darhol shu blokga o'tadi va xato haqidagi ma'lumot \`error\` o'zgaruvchisiga tushadi.

---

## 2. Nega kerak?

JavaScript da bitta kichik xatolik (masalan, noto'g'ri shakldagi JSON matnini parse qilish) butun veb-sayt yoki dastur ishini birdaniga to'xtatib qo'yishi ("crash" qilishi) mumkin.

\`try...catch\` bo'lmasa:
\`\`\`javascript
const data = JSON.parse("noto'g'ri"); // Dastur shu yerda 'portlaydi' va to'xtaydi!
console.log("Bu qator hech qachon ishlamaydi");
\`\`\`

\`try...catch\` bilan esa:
Xatolik xavfsiz tutib olinadi, dasturchiga xabar beriladi va dasturning qolgan barcha qismlari o'z ishida davom etaveradi.

---

## 3. Birinchi misol

Bu kod noto'g'ri JSON matnini parse qilishdagi xatoni \`try...catch\` yordamida ushlab qoladi.

\`\`\`javascript
try {
  const data = JSON.parse("noto'g'ri"); // xato beradi
  console.log(data);
} catch (error) {
  console.log("Xatolik ushlandi!"); // dastur to'xtamadi
}

console.log("Dastur davom etmoqda...");
\`\`\`

\`\`\`text
// Natija:
Xatolik ushlandi!
Dastur davom etmoqda...
\`\`\`

---

## 4. Qator-baqator tahlil

- \`try {\` — xavfsiz sinov bloki ochildi.
- \`const data = JSON.parse("noto'g'ri");\` — \`"noto'g'ri"\` so'zi JSON qoidasiga to'g'ri kelmagani uchun \`JSON.parse\` xatolik chiqaradi.
- Xato yuz berishi bilan JavaScript keyingi \`console.log(data)\` qatorini tashlab ketadi va darhol \`catch\` blokiga o'tadi.
- \`} catch (error) {\` — xatolik muvaffaqiyatli ushlandi. Xato haqidagi barcha tafsilotlar \`error\` o'zgaruvchisiga berildi.
- \`console.log("Xatolik ushlandi!");\` — konsolga xabar chiqdi.
- \`console.log("Dastur davom etmoqda...");\` — eng muhim nuqta: dastur to'xtab qolmadi, keyingi kodlar bemalol ishladi!

---

## 5. Qadamma-qadam (trace)

Dastur qadamma-qadam qanday harakatlandi:

| Qadam | Bajarilgan qism | Nima sodir bo'ldi? |
|---|---|---|
| 1 | \`try\` bloki boshlanishi | Sinov kodi bajarilishga kirdi |
| 2 | \`JSON.parse("noto'g'ri")\` | Xatolik (\`SyntaxError\`) ro'y berdi |
| 3 | \`console.log(data)\` | Tashlab ketildi (ishlamadi) |
| 4 | \`catch (error)\` bloki | Xatolik ushlandi, xabar konsolga chiqdi |
| 5 | \`catch\` dan keyingi kod | Dastur to'xtamadi, keyingi kodlar odatdagidek ishladi |

---

## 6. Yana bitta misol

1-misoldan farqi: Xatoning aynan nima ekanligini \`error.message\` orqali bilib olish.

\`\`\`javascript
const invalidJson = "{ name: Ali }";

try {
  const user = JSON.parse(invalidJson);
  console.log(user);
} catch (error) {
  console.log("Xato sababi: " + error.message);
}
\`\`\`

\`\`\`text
// Natija:
Xato sababi: Expected property name or '}' in JSON at position 2 (line 1 column 3)
\`\`\`

Tahlil:
- \`error.message\` — JavaScript tomonidan berilgan rasmiy xatolik sababi matnini o'qib beradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: catch blokisiz faqat try yozish

\`\`\`javascript
try { // XATO: SyntaxError: Missing catch or finally after try
  JSON.parse("abc");
}
\`\`\`

**Nima bo'ladi:** \`try\` yolg'iz ishlamaydi, uning orqasidan albatta \`catch\` kelishi shart.
**To'g'ri varianti:** Har doim \`try { ... } catch (error) { ... }\` ko'rinishida yozing.

### 2-xato: error o'zgaruvchisiga catch dan tashqarida murojaat qilish

\`\`\`javascript
try {
  JSON.parse("abc");
} catch (error) {
  console.log("Ushlandi");
}

console.log(error); // XATO: ReferenceError: error is not defined
\`\`\`

**Nima bo'ladi:** \`error\` o'zgaruvchisi faqat \`catch\` blokining ichidagina mavjud bo'ladi.
**To'g'ri varianti:** \`error\` bilan faqat \`catch\` bloki ichida ishlang.

### 3-xato: Sintaktik yozuv xatolarini ushlaydi deb o'ylash

\`\`\`javascript
try {
  let a = ; // Sintaksis xatosi
} catch (error) { ... }
\`\`\`

**Nima bo'ladi:** Kodning o'zi noto'g'ri yozilgan bo'lsa (SyntaxError), dastur umuman ishga tusha olmaydi. \`try...catch\` faqat dastur ishlayotgan paytda (runtime) yuz beradigan amaliy xatolarni ushlaydi.
**To'g'ri varianti:** Kod sintaksisini to'g'ri yozish kerak.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`brokenString = "noto'g'ri"\` o'zgaruvchisi berilgan. \`try...catch\` ichida \`JSON.parse(brokenString)\` ni bajaring. \`catch\` blokida \`"Xatolik yuz berdi"\` deb konsolga chiqaring.

### 2-mashq (o'rtacha)
\`badJson = "{ age: 20 }"\` matni berilgan. \`try...catch\` yordamida uni parse qiling va \`catch (error)\` blokida konsolga \`error.message\` ni chiqaring.

### 3-mashq (chegara holat)
Agar xatolik bo'lmasa-chi? \`validJson = '{"count":5}'\` to'g'ri JSON matni berilgan. Uni \`try...catch\` ichida parse qiling va olingan obyektning \`count\` xususiyatini konsolga chiqaring (\`5\`). \`catch\` bloki ishlamay o'tib ketganiga guvoh bo'ling.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const brokenString = "noto'g'ri";

try {
  JSON.parse(brokenString);
} catch (error) {
  console.log("Xatolik yuz berdi");
}
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const badJson = "{ age: 20 }";

try {
  JSON.parse(badJson);
} catch (error) {
  console.log(error.message);
}
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const validJson = '{"count":5}';

try {
  const item = JSON.parse(validJson);
  console.log(item.count); // 5
} catch (error) {
  console.log("Xato yuz berdi");
}
\`\`\`

---

## 9. Xulosa

1. \`try...catch\` xatoliklarni xavfsiz ushlab, butun dastur to'xtab qolishining oldini oladi.
2. \`try\` bloki ichida xato bo'lsa, qolgan qatorlar tashlab ketiladi va darhol \`catch\` blokiga o'tiladi.
3. \`catch (error)\` ichidagi \`error.message\` orqali xatoning aniq sababini bilib olish mumkin.

Keyingi darsda: Global obyektlar — \`Math\` obyekti bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Xatolikni try...catch bilan ushlash",
      instruction: "`brokenString = \"noto'g'ri\"` berilgan. `try...catch` yordamida `JSON.parse(brokenString)` qiling va `catch` ichida `\"Xatolik yuz berdi\"` matnini konsolga chiqaring.",
      startingCode: "const brokenString = \"noto'g'ri\";\n// try...catch ichida JSON.parse qiling va catch da \"Xatolik yuz berdi\" chiqaring\n",
      hint: "try {\n  JSON.parse(brokenString);\n} catch (error) {\n  console.log(\"Xatolik yuz berdi\");\n}",
      test: "if (!code.includes('try') || !code.includes('catch')) return 'try...catch ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Xatolik yuz berdi'))) return null;\nreturn 'Xatolik yuz berdi matni chiqmadi';"
    },
    {
      id: 2,
      title: "Xato sababini chiqarish (error.message)",
      instruction: "`badJson = \"{ age: 20 }\"` berilgan. Uni `try...catch` da parse qiling va `catch (error)` blokida `error.message` ni konsolga chiqaring.",
      startingCode: "const badJson = \"{ age: 20 }\";\n// try...catch da parse qiling va error.message ni chiqaring\n",
      hint: "try {\n  JSON.parse(badJson);\n} catch (error) {\n  console.log(error.message);\n}",
      test: "if (!code.includes('try') || !code.includes('catch')) return 'try...catch ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.toLowerCase().includes('json') || m.toLowerCase().includes('token') || m.toLowerCase().includes('unexpected') || m.toLowerCase().includes('position') || m.toLowerCase().includes('property'))) return null;\nreturn 'error.message konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Xatosiz holatda try bloki",
      instruction: "`validJson = '{\"count\":5}'` berilgan. Uni `try...catch` ichida parse qilib, obyektning `count` qiymatini konsolga chiqaring.",
      startingCode: "const validJson = '{\"count\":5}';\n// try...catch da parse qilib, item.count ni konsolga chiqaring\n",
      hint: "try {\n  const item = JSON.parse(validJson);\n  console.log(item.count);\n} catch (error) {\n  console.log(\"Xato\");\n}",
      test: "if (!code.includes('try') || !code.includes('catch')) return 'try...catch ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('5'))) return null;\nreturn '5 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "try...catch konstruksiyasining asosiy vazifasi nima?",
      options: [
        "Xatoliklarni ushlab olib, butun dastur to'xtab qolishining oldini olish",
        "Kodni tezroq ishga tushirish",
        "Obyektlarni massivga aylantirish",
        "O'zgaruvchilarni global qilish"
      ],
      correctAnswer: 0,
      explanation: "try...catch xato yuz berishi mumkin bo'lgan kodni xavfsiz bajarib, dasturning to'xtamasligini ta'minlaydi."
    },
    {
      id: 2,
      question: "try bloki ichida xatolik yuz bersa, nima sodir bo'ladi?",
      options: [
        "try ichidagi keyingi qatorlar tashlab ketiladi va darhol catch blokiga o'tiladi",
        "Dastur darhol o'chadi",
        "try bloki qaytadan boshidan ishga tushadi",
        "Xatolik e'tiborga olinmay keyingi qator bajariladi"
      ],
      correctAnswer: 0,
      explanation: "try ichida xato bo'lishi bilan uning qolgan kodi to'xtatilib, boshqaruv darhol catch blokiga beriladi."
    },
    {
      id: 3,
      question: "Xatolik haqidagi tushuntirish matnini olish uchun error obyektining qaysi xususiyati ishlatiladi?",
      options: [
        "error.message",
        "error.text",
        "error.info",
        "error.reason"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da xatolik obyekti ichida xato sababini ifodalovchi error.message xususiyati mavjud."
    }
  ]
};
