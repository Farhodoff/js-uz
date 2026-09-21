export const operators = {
  id: "operators",
  title: "Arifmetik Operatorlar (+, -, *, /, %, **)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz qo'lingizda oddiy kalkulyator ushlab turibsiz. Unda sonlarni qo'shish (\`+\`), ayirish (\`-\`), ko'paytirish (\`*\`) va bo'lish (\`/\`) tugmalari bor. 
Dasturlashda ham hisob-kitoblar xuddi shu kabi maxsus belgilar orqali amalga oshiriladi.

Arifmetik operatorlar — sonlar ustida matematik amallar (qo'shish, ayirish, ko'paytirish, bo'lish, qoldiq olish va darajaga ko'tarish) bajarish uchun ishlatiladigan belgilardir.

---

## 2. Nega kerak?

Dasturlarda deyarli barcha amaliyotlar hisob-kitob bilan bog'liq:
- Internet do'konda mahsulotlarning umumiy narxini hisoblash (\`+\`).
- Chegirma miqdorini narxdan ayirib tashlash (\`-\`).
- Mahsulot narxini uning soniga ko'paytirish (\`*\`).
- Umumiy summani bo'lib to'lash oylariga bo'lish (\`/\`).

Arifmetik operatorlar kompyuterga bu hisob-kitoblarni tez va xatosiz bajarish imkonini beradi.

---

## 3. Birinchi misol

Bu kod asosiy to'rtta arifmetik amalni bajaradi va natijalarni konsolga chiqaradi.

\`\`\`javascript
let total = 10 + 5; // Qo'shish: 15
let difference = 10 - 4; // Ayirish: 6
let product = 6 * 7; // Ko'paytirish: 42
let quotient = 20 / 4; // Bo'lish: 5

console.log(total);
console.log(difference);
console.log(product);
console.log(quotient);
\`\`\`

\`\`\`text
// Natija: 15
// Natija: 6
// Natija: 42
// Natija: 5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`10 + 5\` — \`+\` operatori ikkita sonni bir-biriga qo'shadi.
- \`10 - 4\` — \`-\` operatori ayirish amalini bajaradi.
- \`6 * 7\` — dasturlashda ko'paytirish belgisi sifatida yulduzcha (\`*\`) ishlatiladi.
- \`20 / 4\` — bo'lish belgisi sifatida o'ngga yotiq chiziq (slash \`/\`) ishlatiladi.

---

## 5. Yana bitta misol

Bu kod qoldiq olish (\`%\`) va darajaga ko'tarish (\`**\`) operatorlarini bajaradi.

\`\`\`javascript
let remainder = 10 % 3; // Qoldiq: 1
let power = 2 ** 3; // Daraja: 8 (2 * 2 * 2)

console.log(remainder);
console.log(power);
\`\`\`

\`\`\`text
// Natija: 1
// Natija: 8
\`\`\`

Qator-baqator tahlil:
- \`10 % 3\` — \`%\` belgisi foiz emas, balki qoldiq topish operatoridir (modulus). \`10\` soni ichida uchta \`3\` bor (\`9\`), qoldiq esa \`1\` qoladi.
- \`2 ** 3\` — \`**\` (ikkita yulduzcha) darajaga ko'tarish operatoridir. \`2 ** 3\` amali \`2 * 2 * 2 = 8\` natijasini beradi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Matn bilan sonni qo'shib yuborish (+ tuzog'i)
❌ Xato kod:
\`\`\`javascript
let total = "10" + 5;
console.log(total);
\`\`\`
Nima bo'ladi: \`15\` emas, \`"105"\` matni chiqadi! Chunki \`+\` operatori agar bitta tomoni matn bo'lsa, ularni qo'shmaydi, balki bir-biriga ulab qo'yadi.
✅ To'g'ri variant:
\`\`\`javascript
let total = Number("10") + 5;
console.log(total); // 15
\`\`\`

### 2. Ko'paytirish uchun x harfini ishlatish
❌ Xato kod:
\`\`\`javascript
let area = 5 x 10;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'x'\` xatoligi yuz beradi. JavaScript'da ko'paytirish faqat yulduzcha \`*\` bilan yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let area = 5 * 10;
\`\`\`

### 3. Nolga bo'lish (cheksizlik)
❌ Xato tushuncha: \`10 / 0\` amali xatolik berib dasturni to'xtatadi deb o'ylash.
Nima bo'ladi: JavaScript'da nolga bo'linsa dastur to'xtamaydi, balki maxsus \`Infinity\` (cheksizlik) qiymati chiqadi.
✅ To'g'ri tushuncha:
\`\`\`javascript
let result = 10 / 0;
console.log(result); // Infinity
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`apples\` nomli o'zgaruvchiga \`12\`, \`oranges\` nomli o'zgaruvchiga \`8\` sonini bering. Ularning yig'indisini \`+\` operatori orqali \`totalFruits\` o'zgaruvchisiga saqlang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`width\` (\`5\`) va \`height\` (\`4\`) nomli o'zgaruvchilar yarating. Ularning ko'paytmasini (\`*\`) hisoblab, \`area\` o'zgaruvchisiga saqlang va konsolga chiqaring.

### 3-mashq (Chegara holat)
\`17\` sonini \`5\` ga bo'lgandagi qoldiqni (\`%\`) hisoblab, uni \`remainder\` o'zgaruvchisiga saqlang va konsolga chiqaring.

### Javoblar:
1.
\`\`\`javascript
let apples = 12;
let oranges = 8;
let totalFruits = apples + oranges;
console.log(totalFruits);
\`\`\`
2.
\`\`\`javascript
let width = 5;
let height = 4;
let area = width * height;
console.log(area);
\`\`\`
3.
\`\`\`javascript
let remainder = 17 % 5;
console.log(remainder);
\`\`\`

---

## 8. Xulosa

1. Asosiy arifmetik operatorlar: \`+\` (qo'shish), \`-\` (ayirish), \`*\` (ko'paytirish) va \`/\` (bo'lish).
2. \`%\` operatori bo'linmaning qoldig'ini hisoblaydi, \`**\` esa sonni darajaga ko'taradi.
3. Agar \`+\` operatori matn (string) bilan ishlatilsa, sonlar qo'shilmaydi, balki matnlar ulanib ketadi (\`"10" + 5 = "105"\`).

Keyingi darsda: O'zlashtirish va qisqartirilgan operatorlar (+=, -=, *=, /=) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Yig'indini hisoblash",
      instruction: "`apples` (`12`) va `oranges` (`8`) o'zgaruvchilarini yarating. Ularning yig'indisini `totalFruits` o'zgaruvchisiga saqlang va `console.log(totalFruits);` orqali chiqaring.",
      startingCode: "let apples = 12;\nlet oranges = 8;\n// totalFruits o'zgaruvchisiga yig'indini saqlang va chiqaring\n",
      hint: "let totalFruits = apples + oranges;\nconsole.log(totalFruits);",
      test: "if (!code.includes('+')) return '+ operatori ishlatilmadi';\nif (!code.includes('totalFruits')) return 'totalFruits o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('20'))) return null;\nreturn '20 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "To'g'ri to'rtburchak yuzasini hisoblash",
      instruction: "`width` (`5`) va `height` (`4`) o'zgaruvchilarini yarating. Ko'paytirish (`*`) orqali `area` o'zgaruvchisiga yuzani saqlang va konsolga chiqaring.",
      startingCode: "let width = 5;\nlet height = 4;\n// area ga width * height ni saqlang va chiqaring\n",
      hint: "let area = width * height;\nconsole.log(area);",
      test: "if (!code.includes('*')) return '* operatori ishlatilmadi';\nif (!code.includes('area')) return 'area o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('20'))) return null;\nreturn '20 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Qoldiqni topish",
      instruction: "`17 % 5` ifodasini hisoblab, natijani `remainder` o'zgaruvchisiga saqlang va konsolga chiqaring.",
      startingCode: "// remainder o'zgaruvchisiga 17 % 5 ni saqlang va chiqaring\n",
      hint: "let remainder = 17 % 5;\nconsole.log(remainder);",
      test: "if (!code.includes('%')) return '% operatori ishlatilmadi';\nif (!code.includes('remainder')) return 'remainder o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2'))) return null;\nreturn '2 qoldig\\'i konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(7 * 3);` kodi qanday natija beradi?",
      options: [
        "\"7*3\"",
        "21",
        "10",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "* operatori sonlarni bir-biriga ko'paytiradi: 7 * 3 = 21."
    },
    {
      id: 2,
      question: "Bo'linmaning qoldig'ini topish uchun qaysi operator ishlatiladi?",
      options: [
        "/",
        "//",
        "%",
        "mod"
      ],
      correctAnswer: 2,
      explanation: "% (modulus) operatori bir sonni ikkinchisiga bo'lgandagi qoldiqni hisoblaydi."
    },
    {
      id: 3,
      question: "`console.log(3 ** 2);` ifodasi nimani anglatadi va natijasi nima?",
      options: [
        "3 ni 2 ga ko'paytiradi, natija 6",
        "3 ning 2-darajasi (3 * 3), natija 9",
        "3 dan 2 ni ayiradi, natija 1",
        "SyntaxError beradi"
      ],
      correctAnswer: 1,
      explanation: "** operatori darajaga ko'tarish operatoridir: 3 ** 2 = 3 * 3 = 9."
    }
  ]
};
