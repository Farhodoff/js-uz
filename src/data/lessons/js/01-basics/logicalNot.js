export const logicalNot = {
  id: "logicalNot",
  title: "Mantiqiy EMAS (!)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, eshikda teskari yozuv bor: "Kirmang!" Bu "Kiring!" ning teskarisi. Bitta belgi butun ma'noni aylantiradi.

Dasturlashda undov belgisi (\`!\`) xuddi shu teskari yozuvga o'xshaydi. Oldiga qo'yilsa, mantiqiy qiymatni aylantiradi: \`true\` ni \`false\` ga, \`false\` ni \`true\` ga.

Mantiqiy EMAS (\`!\`) — qiymatni teskarisiga ayltiradigan operatordir.

---

## 2. Nega kerak?

O'yinda qoida bor: yomg'ir yog'MAYOTGAN bo'lsa, sayrga chiqiladi. Dasturda saqlangan holat — teskari:

\`\`\`javascript
let isRaining = true; // Yomg'ir yog'yapti
\`\`\`

Savol esa "yog'mayaptimi?" Bizda bor javob — "yog'yapti". Uni aylantirish kerak:

\`\`\`javascript
console.log(!isRaining);
\`\`\`

Natija \`false\`. Demak, sayrga chiqilmaydi.

Muammo shunda: bor qiymatning teskarisi kerak bo'ladi. Yechim — \`!\` bilan aylantirish.

---

## 3. Birinchi misol

Bu kod \`true\` qiymatni teskarisiga aylantiradi.

\`\`\`javascript
let isOpen = true; // Do'kon ochiq
console.log(!isOpen); // false chiqadi
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isOpen = true;\` — holat saqlandi: do'kon ochiq.
- \`!isOpen\` — savol: "teskarisi nima?" \`true\` ning teskarisi \`false\`.
- \`console.log(!isOpen);\` — teskari javob (\`false\`) konsolga chiqadi.

---

## 5. Yana bitta misol

Bu kod \`false\` qiymatni teskarisiga aylantiradi.

\`\`\`javascript
let isClosed = false; // Do'kon yopiq emas
console.log(!isClosed); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

Qator-baqator tahlil:
- \`isClosed\` — \`false\`. Do'kon yopiq emas.
- \`!isClosed\` — teskarisi so'raldi. \`false\` ning teskarisi \`true\`.
- Natija \`true\` chiqadi.

---

## 5.1. Ikki marta aylantirish

\`!\` ni ikki marta yozilsa, qiymat ikki marta aylanadi — asl holiga qaytadi:

\`\`\`javascript
console.log(!!true); // true chiqadi
console.log(!!false); // false chiqadi
\`\`\`

\`\`\`text
// Natija:
true
false
\`\`\`

Qator-baqator tahlil:
- \`!!true\` — birinchi \`!\` uni \`false\` qiladi. Ikkinchi \`!\` yana \`true\` qiladi.
- Ikki marta aylantirish — asl qiymatning o'zi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Bo'sh undov
❌ Xato kod:
\`\`\`javascript
console.log(!);
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token ')'\` xatoligi yuz beradi. \`!\` nimanidir ayltirishi kerak. Bo'sh qolishi mumkin emas.
✅ To'g'ri variant:
\`\`\`javascript
console.log(!true); // false chiqadi
\`\`\`

### 2. Oddiy so'z bilan yozish
❌ Xato kod:
\`\`\`javascript
let r = not true;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'true'\` xatoligi yuz beradi. JavaScript inglizcha so'zlarni tushunmaydi. Faqat \`!\` belgisi ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let r = !true; // false bo'ladi
console.log(r);
\`\`\`

### 3. Saqlanmasdan aylantirish
❌ Xato kod:
\`\`\`javascript
let isVip = true;
!isVip;
console.log(isVip);
\`\`\`
Nima bo'ladi: \`true\` chiqadi! \`!isVip\` teskari qiymatni hisoblaydi, lekin uni hech qayerga yozmaydi. \`isVip\` ning o'zi o'zgarmaydi.
✅ To'g'ri variant:
\`\`\`javascript
let isVip = true;
isVip = !isVip; // Natija saqlanadi
console.log(isVip); // false chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`isOpen\` ga \`true\` bering. Teskarisini chiqaring (\`false\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`isClosed\` ga \`false\` bering. Teskarisini chiqaring (\`true\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`isVip\` (\`true\`) ni teskarisiga aylantirib, O'ZIGA saqlang. Keyin chiqaring (\`false\` chiqishi kerak).

### Javoblar:
1.
\`\`\`javascript
let isOpen = true;
console.log(!isOpen);
\`\`\`
2.
\`\`\`javascript
let isClosed = false;
console.log(!isClosed);
\`\`\`
3.
\`\`\`javascript
let isVip = true;
isVip = !isVip;
console.log(isVip);
\`\`\`

---

## 8. Xulosa

1. \`!\` — mantiqiy EMAS. \`true\` ni \`false\` ga, \`false\` ni \`true\` ga aylantiradi.
2. \`!\` dan keyin albatta qiymat bo'lishi kerak. Bo'sh qolmaydi.
3. Aylantirish o'zgaruvchini o'zgartirmaydi. Saqlash uchun \`=\` bilan yoziladi.

Keyingi darsda: shart bo'yicha ish bajaradigan \`if\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Trueni aylantirish",
      instruction: "`isOpen` ga `true` bering. Teskarisini (`!isOpen`) chiqaring (`false` chiqishi kerak).",
      startingCode: "let isOpen = true;\n// !isOpen ni chiqaring\n",
      hint: "console.log(!isOpen);",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Falseni aylantirish",
      instruction: "`isClosed` ga `false` bering. Teskarisini chiqaring (`true` chiqishi kerak).",
      startingCode: "let isClosed = false;\n// !isClosed ni chiqaring\n",
      hint: "console.log(!isClosed);",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Taqqoslashni aylantirish",
      instruction: "`age = 20` berilgan. `!(age > 18)` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let age = 20;\n// !(age > 18) ni chiqaring\n",
      hint: "console.log(!(age > 18));",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Bo'sh undovni tuzatish",
      instruction: "`console.log(!);` xato bermoqda. `!true` qilib tuzating (`false` chiqsin).",
      startingCode: "console.log(!);\n",
      hint: "console.log(!true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "not so'zini tuzatish",
      instruction: "`not true` xato bermoqda. `!true` bilan tuzating.",
      startingCode: "console.log(not true);\n",
      hint: "console.log(!true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Saqlab aylantirish",
      instruction: "`isVip = true` berilgan. Teskarisini O'ZIGA saqlang (`isVip = !isVip;`) va chiqaring (`false` chiqishi kerak).",
      startingCode: "let isVip = true;\n// Teskarisini oziga saqlang va chiqaring\n",
      hint: "isVip = !isVip;\nconsole.log(isVip);",
      test: "if (!code.includes('= !')) return 'isVip = !isVip deb saqlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ikki marta aylantirish",
      instruction: "`!!true` va `!!false` ni chiqaring (`true` va `false`).",
      startingCode: "// !!true va !!false ni chiqaring\n",
      hint: "console.log(!!true);\nconsole.log(!!false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0][0] !== true || out[1][0] !== false) return 'true va false chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "Tenglikni aylantirish (chegara)",
      instruction: "`x = 5` berilgan. `!(x === 5)` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let x = 5;\n// !(x === 5) ni chiqaring\n",
      hint: "console.log(!(x === 5));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Noto'g'rini to'g'rilash (chegara)",
      instruction: "`isRaining = true` berilgan. `!isRaining` ni chiqaring (`false` — sayrga chiqilmaydi).",
      startingCode: "let isRaining = true;\n// !isRaining ni chiqaring\n",
      hint: "console.log(!isRaining);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Zanjirli aylantirish (chegara)",
      instruction: "`a = false` berilgan. `b = !a` yarating. `!b` ni chiqaring (`false` chiqishi kerak: false→true→false).",
      startingCode: "let a = false;\n// b = !a yarating va !b ni chiqaring\n",
      hint: "let b = !a;\nconsole.log(!b);",
      test: "if (!code.includes('!a') || !code.includes('!b')) return '!a va !b ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(!true);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "! teskarisiga aylantiradi: true ning teskarisi false."
    },
    {
      id: 2,
      question: "`console.log(!false);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Xatolik",
        "0"
      ],
      correctAnswer: 1,
      explanation: "false ning teskarisi true."
    },
    {
      id: 3,
      question: "`console.log(!);` qatorida nima bo'ladi?",
      options: [
        "false chiqadi",
        "SyntaxError beradi",
        "true chiqadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "! nimanidir ayltirishi kerak. Bo'sh qolishi mumkin emas."
    },
    {
      id: 4,
      question: "`let r = not true;` qatorida nima bo'ladi?",
      options: [
        "false bo'ladi",
        "SyntaxError beradi",
        "true bo'ladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript inglizcha so'zlarni tushunmaydi. Faqat ! ishlaydi."
    },
    {
      id: 5,
      question: "`let isVip = true; !isVip; console.log(isVip);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Aylantirish saqlanmagan. isVip ning o'zi o'zgarmagan: true."
    },
    {
      id: 6,
      question: "`let isVip = true; isVip = !isVip; console.log(isVip);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Teskari qiymat saqlangan: isVip endi false."
    },
    {
      id: 7,
      question: "`console.log(!!false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Ikki marta aylantirish asl holiga qaytaradi: false."
    },
    {
      id: 8,
      question: "`let age = 20; console.log(!(age > 18));` nima chiqaradi?",
      options: [
        "true",
        "false",
        "20",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "age > 18 true, uning teskarisi false."
    },
    {
      id: 9,
      question: "`let x = 5; console.log(!(x === 5));` nima chiqaradi?",
      options: [
        "true",
        "false",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "x === 5 true, teskarisi false."
    },
    {
      id: 10,
      question: "`let a = false; let b = !a; console.log(!b);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "b true bo'ladi. !b esa false."
    },
    {
      id: 11,
      question: "Mantiqiy EMAS belgisi qaysi?",
      options: [
        "not",
        "!",
        "~",
        "¡"
      ],
      correctAnswer: 1,
      explanation: "Faqat undov belgisi (!) mantiqiy EMAS."
    },
    {
      id: 12,
      question: "`console.log(!!true);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Ikki marta aylantirish asl holiga qaytaradi: true."
    }
  ]
};
