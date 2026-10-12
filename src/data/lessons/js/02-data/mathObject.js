export const mathObject = {
  id: "mathObject",
  title: "Math: Tayyor Matematika",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, muhandis sumkasi bor. Ichida tayyor asboblar: chizg'ich, sirkul, transportir. Har safar yangisi yasalmaidagan — borini olasiz va ishlatasiz.

Dasturlashda Math xuddi shu asboblar sumkasi. Ichida tayyor matematik buyruqlar turibdi: yaxlitlash, daraja, ildiz, tasodifiy son.

Math — matematik amallar uchun tayyor buyruqlar to'plamidir.

---

## 2. Nega kerak?

Do'konda chegirma hisoblanmoqda: 99.99 narxdan 15% chegirma. Natija kasr chiqadi. Tiyin kerak emas — butun son kerak.

Muammo shunda: yaxlitlash qo'lda yozilsa, uzun va xato chiqadi. Yechim — tayyor buyruq:

\`\`\`javascript
let narx = 99.99;
console.log(Math.round(narx));
\`\`\`

Bitta qatorda tayyor javob: \`100\`.

---

## 3. Birinchi misol

Bu kod sonni eng yaqin butunga yaxlitlaydi.

\`\`\`javascript
let narx = 99.99; // Kasr narx
console.log(Math.round(narx)); // 100 chiqadi
\`\`\`

\`\`\`text
// Natija: 100
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let narx = 99.99;\` — kasr son saqlandi.
- \`Math.round(narx);\` — yaxlitlash buyrug'i chaqirildi. Nuqta orqali Math ichidan tanlandi.
- \`console.log(...);\` — natija \`100\` chiqadi.

---

## 5. Yana bitta misol

Bu kod pastga va tepaga yaxlitlashni ko'rsatadi.

\`\`\`javascript
console.log(Math.floor(4.9)); // 4 chiqadi
console.log(Math.ceil(4.1)); // 5 chiqadi
\`\`\`

\`\`\`text
// Natija:
4
5
\`\`\`

Qator-baqator tahlil:
- \`Math.floor\` — pastga qarab yaxlitlaydi. Har doim kichik butun.
- \`Math.ceil\` — tepaga qarab yaxlitlaydi. Har doim katta butun.

---

## 5.1. Eng katta, eng kichik, daraja

Uchta ko'p ishlatiladigan buyruq:

\`\`\`javascript
console.log(Math.max(3, 9, 5)); // 9 chiqadi
console.log(Math.min(3, 9, 5)); // 3 chiqadi
console.log(Math.pow(2, 3)); // 8 chiqadi
\`\`\`

\`\`\`text
// Natija:
9
3
8
\`\`\`

Qator-baqator tahlil:
- \`Math.max\` — berilganlar ichidan eng kattasini oladi.
- \`Math.min\` — eng kichigini oladi.
- \`Math.pow(2, 3)\` — darajaga ko'taradi: 2 * 2 * 2 = 8.

---

## 6. Ko'p uchraydigan xatolar

### 1. Nuqtani unutish
❌ Xato kod:
\`\`\`javascript
console.log(Mathround(5));
\`\`\`
Nima bo'ladi: \`ReferenceError: Mathround is not defined\` xatoligi yuz beradi. Buyruq Math ichida yashaydi. Nuqta bilan chaqiriladi.
✅ To'g'ri variant:
\`\`\`javascript
console.log(Math.round(5)); // 5 chiqadi
\`\`\`

### 2. Kichik harf bilan yozish
❌ Xato kod:
\`\`\`javascript
console.log(math.round(5));
\`\`\`
Nima bo'ladi: \`ReferenceError: math is not defined\` xatoligi yuz beradi. Nom katta harf bilan boshlanadi: \`Math\`.
✅ To'g'ri variant:
\`\`\`javascript
console.log(Math.round(5)); // 5 chiqadi
\`\`\`

### 3. Natijani saqlamaslik
❌ Xato tushuncha:
\`\`\`javascript
Math.round(4.5);
console.log(4.5);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`4.5\` chiqadi. Sababi: natija saqlanmagan. Buyruq hisoblab beradi, xolos. Natijani ushlash kerak.
✅ To'g'ri variant:
\`\`\`javascript
let butun = Math.round(4.5);
console.log(butun); // 5 chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`99.99\` ni yaxlitlang (\`Math.round\` bilan). \`100\` chiqishi kerak.

### 2-mashq (O'rtacha)
\`4.9\` ni pastga, \`4.1\` ni tepaga yaxlitlang. \`4\` va \`5\` chiqishi kerak.

### 3-mashq (Chegara holat)
\`3, 9, 5\` ichidan eng kattasini toping (\`Math.max\` bilan). \`9\` chiqishi kerak.

### Javoblar:
1.
\`\`\`javascript
console.log(Math.round(99.99));
\`\`\`
2.
\`\`\`javascript
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
\`\`\`
3.
\`\`\`javascript
console.log(Math.max(3, 9, 5));
\`\`\`

---

## 8. Xulosa

1. Math — tayyor matematik buyruqlar to'plami. Nuqta bilan chaqiriladi.
2. \`round\` (yaqin butun), \`floor\` (pastga), \`ceil\` (tepaga), \`max\`/\`min\`, \`pow\` (daraja).
3. Nom katta harf bilan boshlanadi. Natija saqlanmasa, yo'qoladi.

Keyingi darsda: matn bilan ishlaydigan metodlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Yaxlitlash",
      instruction: "`99.99` ni `Math.round` bilan yaxlitlang. `100` chiqishi kerak.",
      startingCode: "// Math.round bilan yaxlitlang va chiqaring\n",
      hint: "console.log(Math.round(99.99));",
      test: "if (!code.includes('Math.round')) return 'Math.round ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '100')) return null;\nreturn '100 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Pastga yaxlitlash",
      instruction: "`4.9` ni `Math.floor` bilan yaxlitlang. `4` chiqishi kerak.",
      startingCode: "// Math.floor bilan chiqaring\n",
      hint: "console.log(Math.floor(4.9));",
      test: "if (!code.includes('Math.floor')) return 'Math.floor ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '4')) return null;\nreturn '4 konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Tepaga yaxlitlash",
      instruction: "`4.1` ni `Math.ceil` bilan yaxlitlang. `5` chiqishi kerak.",
      startingCode: "// Math.ceil bilan chiqaring\n",
      hint: "console.log(Math.ceil(4.1));",
      test: "if (!code.includes('Math.ceil')) return 'Math.ceil ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Nuqta xatosini tuzatish",
      instruction: "`Mathround(5)` xato bermoqda. Nuqta bilan tuzating.",
      startingCode: "console.log(Mathround(5));\n",
      hint: "console.log(Math.round(5));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Katta harf xatosini tuzatish",
      instruction: "`math.round(5)` xato bermoqda. Katta harfga tuzating.",
      startingCode: "console.log(math.round(5));\n",
      hint: "console.log(Math.round(5));",
      test: "if (code.includes('math.round')) return 'Math ni katta harfda yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Eng kattasi (chegara)",
      instruction: "`3, 9, 5` ichidan eng kattasini toping (`Math.max` bilan). `9` chiqishi kerak.",
      startingCode: "// Math.max bilan chiqaring\n",
      hint: "console.log(Math.max(3, 9, 5));",
      test: "if (!code.includes('Math.max')) return 'Math.max ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '9')) return null;\nreturn '9 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Eng kichigi (chegara)",
      instruction: "`3, 9, 5` ichidan eng kichigini toping. `3` chiqishi kerak.",
      startingCode: "// Math.min bilan chiqaring\n",
      hint: "console.log(Math.min(3, 9, 5));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3')) return null;\nreturn '3 konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Daraja (chegara)",
      instruction: "`2 ** 3` ni `Math.pow` bilan hisoblang (`8` chiqishi kerak).",
      startingCode: "// Math.pow bilan chiqaring\n",
      hint: "console.log(Math.pow(2, 3));",
      test: "if (!code.includes('Math.pow')) return 'Math.pow ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '8')) return null;\nreturn '8 konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Saqlab chiqarish (chegara)",
      instruction: "`4.5` ni yaxlitlab, `butun` ga saqlang. Keyin chiqaring (`5` chiqishi kerak).",
      startingCode: "// Yaxlitlang, saqlang, chiqaring\n",
      hint: "let butun = Math.round(4.5);\nconsole.log(butun);",
      test: "if (!code.includes('butun')) return 'butun o\\'zgaruvchisi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Ildiz (chegara)",
      instruction: "`16` ning ildizini toping (`Math.sqrt` bilan). `4` chiqishi kerak.",
      startingCode: "// Math.sqrt bilan chiqaring\n",
      hint: "console.log(Math.sqrt(16));",
      test: "if (!code.includes('Math.sqrt')) return 'Math.sqrt ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '4')) return null;\nreturn '4 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(Math.round(99.99));` nima chiqaradi?",
      options: ["99.99", "100", "99", "Xatolik"],
      correctAnswer: 1,
      explanation: "Eng yaqin butunga yaxlitlanadi: 100."
    },
    {
      id: 2,
      question: "`console.log(Math.floor(4.9));` nima chiqaradi?",
      options: ["5", "4", "4.9", "Xatolik"],
      correctAnswer: 1,
      explanation: "Pastga qarab yaxlitlanadi: 4."
    },
    {
      id: 3,
      question: "`console.log(Math.ceil(4.1));` nima chiqaradi?",
      options: ["4", "5", "4.1", "Xatolik"],
      correctAnswer: 1,
      explanation: "Tepaga qarab yaxlitlanadi: 5."
    },
    {
      id: 4,
      question: "`console.log(Mathround(5));` nima qiladi?",
      options: ["5 chiqaradi", "ReferenceError beradi", "0 chiqaradi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Nuqtasiz nom tanilmaydi."
    },
    {
      id: 5,
      question: "`console.log(math.round(5));` nima qiladi?",
      options: ["5 chiqaradi", "ReferenceError beradi", "5.0 chiqaradi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "Nom katta harf bilan boshlanadi: Math."
    },
    {
      id: 6,
      question: "`console.log(Math.max(3, 9, 5));` nima chiqaradi?",
      options: ["3", "5", "9", "17"],
      correctAnswer: 2,
      explanation: "Eng kattasi tanlanadi: 9."
    },
    {
      id: 7,
      question: "`console.log(Math.min(3, 9, 5));` nima chiqaradi?",
      options: ["9", "5", "3", "0"],
      correctAnswer: 2,
      explanation: "Eng kichigi tanlanadi: 3."
    },
    {
      id: 8,
      question: "`console.log(Math.pow(2, 3));` nima chiqaradi?",
      options: ["6", "5", "8", "9"],
      correctAnswer: 2,
      explanation: "2 * 2 * 2 = 8."
    },
    {
      id: 9,
      question: "`Math.round(4.5); console.log(4.5);` nima chiqaradi?",
      options: ["5", "4.5", "Xatolik", "Hech narsa"],
      correctAnswer: 1,
      explanation: "Natija saqlanmagan. Eski qiymat chiqadi."
    },
    {
      id: 10,
      question: "`console.log(Math.sqrt(16));` nima chiqaradi?",
      options: ["8", "4", "2", "16"],
      correctAnswer: 1,
      explanation: "16 ning ildizi 4."
    },
    {
      id: 11,
      question: "Math ichidagi buyruq qanday chaqiriladi?",
      options: ["Mathround(5)", "Math.round(5)", "roundMath(5)", "Math-round(5)"],
      correctAnswer: 1,
      explanation: "Nuqta orqali tanlanadi."
    },
    {
      id: 12,
      question: "`let butun = Math.round(4.5); console.log(butun);` nima chiqaradi?",
      options: ["4.5", "5", "4", "Xatolik"],
      correctAnswer: 1,
      explanation: "Natija saqlangan: 5."
    }
  ]
};
