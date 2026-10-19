export const typeofLesson = {
  id: "typeofLesson",
  title: "typeof: Qiymat Turini Aniqlash",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, supermarket kassasidasiz. Kassir mahsulotni skanerga tutadi. Ekranda uning turi chiqadi: "sut", "non" yoki "meva". Quti yopiq bo'lsa ham, skaner ichidagini aytadi.

Dasturlashda \`typeof\` xuddi shu skanerga o'xshaydi. Qiymatni bersangiz, uning turini aytadi.

typeof — qiymat yoki o'zgaruvchining ma'lumot turini (data type) aniqlaydigan operatordir.

---

## 2. Nega kerak?

Dasturda shunday holat bo'ladi: ikkita yozuv ko'zga bir xil ko'rinadi.

\`\`\`javascript
let a = "100"; // Matn
let b = 100; // Son
\`\`\`

Ikkalasi ham \`100\` ga o'xshaydi. Lekin biri matn, biri son. Qaysi ekanini ko'z bilan ajratib bo'lmaydi.

Muammo shunda: turini bilmasdan ishlatsangiz, natija kutilmagan bo'ladi. Yechim — \`typeof\` bilan tekshirish:

\`\`\`javascript
console.log(typeof a); // string chiqadi
console.log(typeof b); // number chiqadi
\`\`\`

Bir qarashda aniq javob: biri matn, biri son.

---

## 3. Birinchi misol

Bu kod sonli o'zgaruvchining turini aniqlaydi va konsolga chiqaradi.

\`\`\`javascript
let age = 25; // Son saqlandi
console.log(typeof age); // number chiqadi
\`\`\`

\`\`\`text
// Natija: number
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let age = 25;\` — \`age\` nomli o'zgaruvchiga \`25\` soni berildi.
- \`// Son saqlandi\` — izoh. O'zgaruvchida nima turganini eslatadi.
- \`console.log(typeof age);\` — \`typeof\` turini tekshiradi. Natija (\`number\` so'zi) konsolga chiqadi.

---

## 5. Yana bitta misol

Bu kod uch xil turdagi qiymatni tekshiradi. Har biri o'z nomini beradi.

\`\`\`javascript
let ism = "Ali"; // Matn saqlandi
let isVip = true; // Mantiqiy qiymat saqlandi
let city; // Qiymat berilmadi
console.log(typeof ism); // string chiqadi
console.log(typeof isVip); // boolean chiqadi
console.log(typeof city); // undefined chiqadi
\`\`\`

\`\`\`text
// Natija:
string
boolean
undefined
\`\`\`

Qator-baqator tahlil:
- \`typeof ism\` — matn uchun \`string\` so'zini beradi.
- \`typeof isVip\` — mantiqiy qiymat uchun \`boolean\` so'zini beradi.
- \`typeof city\` — qiymatsiz o'zgaruvchi uchun \`undefined\` so'zini beradi.
- Natija har doim kichik harfli matn bo'ladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Typeof ni katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
let ism = "Ali";
console.log(Typeof(ism));
\`\`\`
Nima bo'ladi: \`ReferenceError: Typeof is not defined\` xatoligi yuz beradi. Faqat kichik harfdagi \`typeof\` to'g'ri.
✅ To'g'ri variant:
\`\`\`javascript
let ism = "Ali";
console.log(typeof ism); // string chiqadi
\`\`\`

### 2. typeof ni ikki so'z qilib yozish
❌ Xato kod:
\`\`\`javascript
console.log(type of "Ali");
\`\`\`
Nima bo'ladi: \`SyntaxError: missing ) after argument list\` xatoligi yuz beradi. \`typeof\` bitta so'z. Orasiga bo'sh joy qo'yilmaydi.
✅ To'g'ri variant:
\`\`\`javascript
console.log(typeof "Ali"); // string chiqadi
\`\`\`

### 3. typeof dan keyin hech narsa yozmaslik
❌ Xato kod:
\`\`\`javascript
console.log(typeof);
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token ')'\` xatoligi yuz beradi. \`typeof\` nimanidir tekshirishi kerak. Bo'sh qolishi mumkin emas.
✅ To'g'ri variant:
\`\`\`javascript
console.log(typeof "Ali"); // string chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`ism\` ga \`"Ali"\` bering. \`typeof\` bilan turini konsolga chiqaring. Natija \`string\` bo'lsin.

### 2-mashq (O'rtacha)
Uchta qiymat turini tekshiring: \`25\` (son), \`true\` (mantiqiy), \`nick\` (qiymatsiz o'zgaruvchi). Har birini alohida chiqaring. Natijalar \`number\`, \`boolean\`, \`undefined\` bo'lsin.

### 3-mashq (Chegara holat)
E'lon qilinmagan nomni \`typeof\` bilan tekshiring:
\`\`\`javascript
console.log(typeof mehmon);
\`\`\`
Bu xato bermaydi. Natija \`undefined\` chiqadi. Sababi: \`typeof\` tekshirishdan oldin nom bor-yo'qligini o'zi biladi.

### Javoblar:
1.
\`\`\`javascript
let ism = "Ali";
console.log(typeof ism);
\`\`\`
2.
\`\`\`javascript
console.log(typeof 25);
console.log(typeof true);
let nick;
console.log(typeof nick);
\`\`\`
3.
\`\`\`javascript
console.log(typeof mehmon); // undefined chiqadi, xato bermaydi
\`\`\`

---

## 8. Xulosa

1. \`typeof\` — qiymat turini aniqlaydigan operator. Natija har doim kichik harfli matn.
2. \`typeof\` bitta so'z bo'lib yoziladi. Katta harf yoki oraliq xato beradi.
3. \`typeof\` dan keyin albatta tekshiriladigan qiymat bo'lishi kerak.

Keyingi darsda: bir turni ikkinchisiga aylantirish (type conversion) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matn turini aniqlash",
      instruction: "`\"Salom\"` matnining turini `typeof` bilan konsolga chiqaring. Natija `string` bo'lsin.",
      startingCode: "// typeof bilan \"Salom\" turini chiqaring\n",
      hint: "console.log(typeof \"Salom\");",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Son turini aniqlash",
      instruction: "`100` sonining turini `typeof` bilan konsolga chiqaring. Natija `number` bo'lsin.",
      startingCode: "// typeof bilan 100 turini chiqaring\n",
      hint: "console.log(typeof 100);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'number')) return null;\nreturn 'number konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Mantiqiy turini aniqlash",
      instruction: "`false` qiymatining turini `typeof` bilan konsolga chiqaring. Natija `boolean` bo'lsin.",
      startingCode: "// typeof bilan false turini chiqaring\n",
      hint: "console.log(typeof false);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'boolean')) return null;\nreturn 'boolean konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Qiymatsiz o'zgaruvchi turi",
      instruction: "`nick` ni qiymatsiz e'lon qiling. `typeof` bilan turini chiqaring. Natija `undefined` bo'lsin.",
      startingCode: "// nick ni e'lon qiling va turini chiqaring\n",
      hint: "let nick;\nconsole.log(typeof nick);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nif (!code.includes('nick')) return 'nick o\\'zgaruvchisi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'undefined')) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Ikkita tur bitta qatorda",
      instruction: "`\"Ali\"` va `10` turlarini AYNAN BIRTA `console.log` bilan chiqaring: `string number` ko'rinsin.",
      startingCode: "// Ikkala turni bitta console.log bilan chiqaring\n",
      hint: "console.log(typeof \"Ali\", typeof 10);",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'BIRTA console.log bilan chiqaring';\nif (out[0].trim() === 'string number') return null;\nreturn \"Natija 'string number' bolishi kerak\";"
    },
    {
      id: 6,
      title: "Katta harf xatosini tuzatish",
      instruction: "`console.log(Typeof(ism));` xato bermoqda. `ism = \"Ali\"` berilgan. Kichik harfga tuzating: `string` chiqsin.",
      startingCode: "let ism = \"Ali\";\nconsole.log(Typeof(ism));\n",
      hint: "Typeof o'rniga typeof yozing.",
      test: "if (code.includes('Typeof')) return 'Typeof ni kichik harfda typeof deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Oraliq xatosini tuzatish",
      instruction: "`console.log(type of \"Ali\");` xato bermoqda. Bitta so'z qilib tuzating: `string` chiqsin.",
      startingCode: "console.log(type of \"Ali\");\n",
      hint: "type of o'rniga typeof yozing.",
      test: "if (!code.includes('typeof')) return 'typeof deb bitta soz bilan yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Qo'shtirnoqli son tuzog'i",
      instruction: "`\"25\"` ning turini tekshiring. E'tibor bering: bu son emas, matn. Natija `string` bo'lsin.",
      startingCode: "// \"25\" turini chiqaring\n",
      hint: "console.log(typeof \"25\");",
      test: "if (!code.includes('typeof')) return 'typeof operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'string')) return null;\nreturn 'string konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "O'zgaruvchi orqali tekshirish",
      instruction: "`isVip = true` berilgan. `typeof` bilan turini chiqaring: `boolean` chiqsin.",
      startingCode: "let isVip = true;\n// typeof bilan turini chiqaring\n",
      hint: "console.log(typeof isVip);",
      test: "if (!code.includes('typeof isVip')) return 'typeof isVip deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'boolean')) return null;\nreturn 'boolean konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "E'lon qilinmagan nom (chegara)",
      instruction: "`mehmon` hech qayerda e'lon qilinmagan. Shunday bo'lsa ham `typeof` xato bermaydi. Tekshiring: `undefined` chiqsin.",
      startingCode: "// mehmon ni typeof bilan tekshiring\n",
      hint: "console.log(typeof mehmon);",
      test: "if (!code.includes('typeof mehmon')) return 'typeof mehmon deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor (typeof xato bermasligi kerak): ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'undefined')) return null;\nreturn 'undefined konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(typeof 25);` nima chiqaradi?",
      options: [
        "25",
        "number",
        "string",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "typeof qiymatning turini aytadi: 25 son, shuning uchun number."
    },
    {
      id: 2,
      question: "`console.log(typeof \"Ali\");` nima chiqaradi?",
      options: [
        "Ali",
        "string",
        "text",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqdagi qiymat matn, shuning uchun string chiqadi."
    },
    {
      id: 3,
      question: "`let a; console.log(typeof a);` nima chiqaradi?",
      options: [
        "Xatolik",
        "undefined",
        "null",
        "Bo'sh qator"
      ],
      correctAnswer: 1,
      explanation: "Qiymatsiz o'zgaruvchining turi ham undefined deb ataladi."
    },
    {
      id: 4,
      question: "`console.log(Typeof(10));` qatorida nima bo'ladi?",
      options: [
        "number chiqadi",
        "ReferenceError: Typeof is not defined",
        "string chiqadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript katta harfni tanimaydi: faqat kichik typeof to'g'ri."
    },
    {
      id: 5,
      question: "`console.log(type of 10);` qatorida nima bo'ladi?",
      options: [
        "number chiqadi",
        "SyntaxError beradi",
        "string chiqadi",
        "undefined chiqadi"
      ],
      correctAnswer: 1,
      explanation: "typeof bitta so'z. Oraliq qo'yilsa, yozuv qoidasi buziladi."
    },
    {
      id: 6,
      question: "`console.log(typeof \"25\");` nima chiqaradi?",
      options: [
        "number (son bo'lgani uchun)",
        "string (qo'shtirnoq bo'lgani uchun)",
        "Xatolik",
        "25"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichidagi raqam ham matn hisoblanadi."
    },
    {
      id: 7,
      question: "`console.log(typeof true);` nima chiqaradi?",
      options: [
        "true",
        "boolean",
        "1",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "true mantiqiy qiymat, uning turi boolean."
    },
    {
      id: 8,
      question: "`console.log(typeof);` qatorida nima bo'ladi?",
      options: [
        "undefined chiqadi",
        "SyntaxError beradi",
        "null chiqadi",
        "Bo'sh qator chiqadi"
      ],
      correctAnswer: 1,
      explanation: "typeof nimanidir tekshirishi shart. Bo'sh qolishi mumkin emas."
    },
    {
      id: 9,
      question: "E'lon qilinmagan `mehmon` uchun `console.log(typeof mehmon);` nima qiladi?",
      options: [
        "ReferenceError beradi",
        "undefined chiqaradi, xato bermaydi",
        "null chiqaradi",
        "Dasturni to'xtatadi"
      ],
      correctAnswer: 1,
      explanation: "typeof nom bor-yo'qligini o'zi tekshiradi, shuning uchun xato bermaydi."
    },
    {
      id: 10,
      question: "Qaysi yozuv turini to'g'ri aniqlaydi?",
      options: [
        "console.log(Typeof \"Ali\");",
        "console.log(typeof \"Ali\");",
        "console.log(type of \"Ali\");",
        "console.log(typeof);"
      ],
      correctAnswer: 1,
      explanation: "Faqat kichik harfli, bitta so'zli va qiymatli yozuv to'g'ri."
    },
    {
      id: 11,
      question: "`let x = \"5\"; console.log(typeof x);` nima chiqaradi?",
      options: [
        "number",
        "string",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "x da matn turibdi, shuning uchun string chiqadi."
    },
    {
      id: 12,
      question: "typeof natijasi har doim qanday ko'rinishda bo'ladi?",
      options: [
        "Katta harfli matn",
        "Kichik harfli matn",
        "Son",
        "Mantiqiy qiymat"
      ],
      correctAnswer: 1,
      explanation: "Natija har doim kichik harflar bilan yozilgan matn: string, number, boolean, undefined."
    }
  ]
};
