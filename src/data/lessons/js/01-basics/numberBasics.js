export const numberBasics = {
  id: "numberBasics",
  title: "Number: Butun va O'nlik Sonlar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'kondagi elektron taroziga qaraysiz.
Tarozi butun narsalarni ham (masalan, \`3\` dona tarvuz), o'nlik kasr ko'rinishidagi og'irlikni ham (masalan, \`2.5\` kg olma) sonlar bilan aniq ko'rsatadi.

Dasturlashda sonlar xuddi shu tarozidagi raqamlar kabi ishlaydi.

Number (son) — JavaScript'da butun va o'nlik (kasr) sonlarni ifodalash uchun ishlatiladigan asosiy ma'lumot turidir.

### JavaScript'da sonlarning 2 xil ko'rinishi bor:
1. **Butun sonlar (integers):** masalan, \`10\`, \`42\`, \`0\`, \`-5\`.
2. **O'nlik sonlar (decimals):** masalan, \`3.14\`, \`0.75\`, \`9.99\`.

> **Muhim qoida:** O'nlik sonlarda kasr qism vergul bilan emas, faqat nuqta (\`.\`) bilan ajratiladi!

---

## 2. Nega kerak?

Agar sonlarni qo'shtirnoq ichida yozsak (\`"25"\`), kompyuter ularni son deb emas, oddiy matn deb tushunadi.

Number turi sonlarni haqiqiy matematik miqdor sifatida kompyuter xotirasida saqlash imkonini beradi.

---

## 3. Birinchi misol

Bu kod butun son va o'nlik son yaratib, ularni konsolga chiqaradi.

\`\`\`javascript
let age = 20; // Butun son
let price = 19.99; // O'nlik son (nuqta bilan)
console.log(age);
console.log(price);
\`\`\`

\`\`\`text
// Natija:
20
19.99
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let age = 20;\` — \`age\` nomli o'zgaruvchiga \`20\` butun soni berildi. Sonlar har doim qo'shtirnoqsiz yoziladi.
- \`let price = 19.99;\` — \`price\` nomli o'zgaruvchiga \`19.99\` o'nlik soni berildi. Butun va kasr qism nuqta (\`.\`) bilan ajratildi.
- \`console.log(age);\` va \`console.log(price);\` — sonlar konsolga chop etildi.

---

## 5. Yana bitta misol

Bu kod manfiy va noldan kichik o'nlik sonlarni konsolga chiqaradi.

\`\`\`javascript
let temperature = -10; // Manfiy butun son
let discount = 0.5; // Noldan kichik o'nlik son
console.log(temperature);
console.log(discount);
\`\`\`

\`\`\`text
// Natija:
-10
0.5
\`\`\`

---

## 6. Ko'p uchraydigan xatolar

### 1. O'nlik sonda nuqta o'rniga vergul ishlatish
❌ Xato kod:
\`\`\`javascript
let price = 19,99;
console.log(price);
\`\`\`
Nima bo'ladi: Vergul JavaScript'da maxsus operator hisoblanadi. O'nlik son hosil bo'lmaydi va xato berishi mumkin.
✅ To'g'ri variant:
\`\`\`javascript
let price = 19.99;
console.log(price);
\`\`\`

### 2. Sonni qo'shtirnoqqa olib qo'yish
❌ Xato tushuncha:
\`\`\`javascript
let age = "25";
\`\`\`
Nima bo'ladi: \`age\` son (Number) emas, balki matn (String) bo'lib qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let age = 25;
\`\`\`

### 3. O'nlik sonda ikkita nuqta ishlatish
❌ Xato kod:
\`\`\`javascript
let version = 1.2.3;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected number\` xatoligi yuz beradi. Sonda faqat bitta nuqta bo'lishi mumkin. Dastur versiyalari matn bo'lishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let version = "1.2.3";
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`year\` nomli o'zgaruvchi yarating, unga joriy yilni butun son ko'rinishida bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`pi\` nomli \`const\` yarating, unga \`3.14\` o'nlik sonini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi vergul xatosini to'g'rilang:
\`\`\`javascript
let weight = 65,5;
console.log(weight);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let year = 2026;
console.log(year);
\`\`\`
2.
\`\`\`javascript
const pi = 3.14;
console.log(pi);
\`\`\`
3.
\`\`\`javascript
let weight = 65.5; // vergul o'rniga nuqta qo'yiladi
console.log(weight);
\`\`\`

---

## 8. Xulosa

1. Number — butun va o'nlik sonlarni ifodalaydigan ma'lumot turi.
2. Sonlar har doim qo'shtirnoqsiz yoziladi.
3. O'nlik sonlarda kasr qism nuqta (\`.\`) bilan ajratiladi.

Keyingi darsda: Sonlar ustida arifmetik amallar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Butun son yaratish",
      instruction: "`year` nomli o'zgaruvchi yarating (`let` bilan), unga `2026` sonini bering va `console.log(year);` orqali chiqaring.",
      startingCode: "// year o'zgaruvchisini yarating va chiqaring\n",
      hint: "let year = 2026;\nconsole.log(year);",
      test: "if (code.includes('\"2026\"') || code.includes(\"'2026'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nif (!code.includes('year')) return 'year nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2026'))) return null;\nreturn '2026 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "O'nlik son yaratish",
      instruction: "`pi` nomli `const` yarating, unga `3.14` o'nlik sonini bering va konsolga chiqaring.",
      startingCode: "// pi nomli const yarating va chiqaring\n",
      hint: "const pi = 3.14;\nconsole.log(pi);",
      test: "if (code.includes('\"3.14\"') || code.includes(\"'3.14'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nif (code.includes('3,14')) return 'Vergul o\\'rniga nuqta ishlating: 3.14';\nif (!code.includes('const')) return 'const kalit so\\'zi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('3.14'))) return null;\nreturn '3.14 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Vergul xatosini to'g'rilash",
      instruction: "`weight = 65,5;` dagi vergulni nuqta bilan almashtiring, toki konsolga `65.5` chiqsin.",
      startingCode: "let weight = 65,5;\nconsole.log(weight);\n",
      hint: "let weight = 65.5;\nconsole.log(weight);",
      test: "if (code.includes('65,5')) return 'Vergul o\\'rniga nuqta qo\\'ying';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('65.5'))) return null;\nreturn '65.5 soni konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da o'nlik (kasr) sonlar qanday yoziladi?",
      options: [
        "Vergul bilan: 19,99",
        "Nuqta bilan: 19.99",
        "Teskari chiziq bilan: 19/99",
        "Faqat qo'shtirnoqda: \"19.99\""
      ],
      correctAnswer: 1,
      explanation: "JavaScript'da o'nlik sonlar har doim nuqta (.) bilan yoziladi: 19.99"
    },
    {
      id: 2,
      question: "`let x = 25;` va `let y = \"25\";` o'rtasidagi farq nima?",
      options: [
        "Hech qanday farqi yo'q",
        "x — son (Number), y esa matn (String)",
        "x — matn, y esa son",
        "y da xatolik bor"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqsiz yozilgan 25 — son (Number). Qo'shtirnoqdagi \"25\" esa matn (String) hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagi sonlardan qaysi biri JavaScript'da to'g'ri yozilgan?",
      options: [
        "let price = 12,50;",
        "let price = 12.50;",
        "let price = 12..50;",
        "let price = .12.50;"
      ],
      correctAnswer: 1,
      explanation: "O'nlik sonlar butun va kasr qismi bitta nuqta bilan ajratilgan holda yoziladi: 12.50"
    }
  ]
};
