export const comparisonOperators = {
  id: "comparisonOperators",
  title: "Taqqoslash Operatorlari (>, <, >=, <=)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz attraksionga kirish joyidasiz. U yerda nazoratchi bolalarning bo'yini maxsus o'lchagich bilan tekshiradi: "Bo'yingiz 120 sm dan balandmi?"
Bu savolga javob faqat ikki xil bo'lishi mumkin: Ha (\`true\`) yoki Yo'q (\`false\`).

Taqqoslash operatorlari (\`>\`, \`<\`, \`>=\`, \`<=\`) — ikkita qiymatni o'zaro solishtirish uchun ishlatiladi va natija har doim Boolean (\`true\` yoki \`false\`) bo'ladi.

---

## 2. Nega kerak?

Dasturlarda har doim qiymatlarni solishtirishga to'g'ri keladi:
- Foydalanuvchining yoshi 18 dan kattami?
- Hisobdagi pul mahsulot narxidan ko'pmi yoki yetarlimi?
- Harorat noldan pastmi?

Taqqoslash operatorlari yordamida dastur qiymatlarni solishtirib, qaror qabul qilish uchun aniq \`true\` yoki \`false\` javobini oladi.

---

## 3. Birinchi misol

Bu kod katta (\`>\`) va kichik (\`<\`) operatorlari yordamida ikkita sonni solishtiradi.

\`\`\`javascript
let userAge = 20;
let isAdult = userAge > 18; // 20 > 18 (ha, katta)
let isChild = userAge < 10; // 20 < 10 (yo'q, kichik emas)

console.log(isAdult);
console.log(isChild);
\`\`\`

\`\`\`text
// Natija: true
// Natija: false
\`\`\`

---

## 4. Qator-baqator tahlil

- \`userAge > 18\` — \`>\` (katta) operatori chapdagi son o'ngdagi sondan kattami deb tekshiradi. \`20\` soni \`18\` dan katta bo'lgani uchun natija \`true\` bo'ladi.
- \`userAge < 10\` — \`<\` (kichik) operatori chapdagi son o'ngdagi sondan kichikmi deb tekshiradi. \`20\` soni \`10\` dan kichik bo'lmagani uchun natija \`false\` bo'ladi.
- Natijalar \`isAdult\` va \`isChild\` o'zgaruvchilariga saqlanadi (ular Boolean turida bo'ladi).
- \`console.log(isAdult);\` — konsolga \`true\` chiqadi.
- \`console.log(isChild);\` — konsolga \`false\` chiqadi.

---

## 5. Yana bitta misol

Bu kod katta yoki teng (\`>=\`) hamda kichik yoki teng (\`<=\`) operatorlarini tekshiradi.

\`\`\`javascript
let passScore = 70;
let userScore = 70;

let isPassed = userScore >= passScore; // 70 >= 70 (teng bo'lsa ham true)
let isFailed = userScore <= 50; // 70 <= 50 (false)

console.log(isPassed);
console.log(isFailed);
\`\`\`

\`\`\`text
// Natija: true
// Natija: false
\`\`\`

Qator-baqator tahlil:
- \`userScore >= passScore\` — \`>=\` operatori chapdagi son kattaroq YOKI teng bo'lsa \`true\` qaytaradi. \`70 >= 70\` holatida sonlar teng bo'lgani uchun \`true\` chiqadi. (Agar oddiy \`>\` ishlatilsa, \`70 > 70\` yolg'on / \`false\` bo'lardi).
- \`userScore <= 50\` — \`<=\` operatori chapdagi son kichikroq yoki teng bo'lsa \`true\` beradi, aks holda \`false\` qaytaradi.

---

## 6. Ko'p uchraydigan xatolar

### 1. >= o'rniga => yozib qo'yish
❌ Xato kod:
\`\`\`javascript
let score = 50;
console.log(score => 50);
\`\`\`
Nima bo'ladi: Taqqoslash natijasi o'rniga \`[Function (anonymous)]\` chiqadi! Chunki JavaScript'da \`=>\` belgisi taqqoslash emas, balki funksiya belgisi hisoblanadi. Taqqoslashda har doim burchakli belgi birinchi yoziladi: \`>=\` va \`<=\`.
✅ To'g'ri variant:
\`\`\`javascript
let score = 50;
console.log(score >= 50); // true
\`\`\`

### 2. Belgilar orasiga probel qo'yish (> =)
❌ Xato kod:
\`\`\`javascript
let score = 50;
console.log(score > = 50);
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '='\` xatoligi yuz beradi. \`>=\` va \`<=\` yaxlit operator, ularning o'rtasida bo'sh joy bo'lmasligi kerak.
✅ To'g'ri variant:
\`\`\`javascript
console.log(score >= 50);
\`\`\`

### 3. > bilan >= farqini unutish (chegara qiymatda)
❌ Xato tushuncha: \`18 > 18\` ni \`true\` deb hisoblash.
Nima bo'ladi: \`18 > 18\` amali \`false\` qaytaradi, chunki 18 soni 18 dan katta emas, unga teng! Agar chegara soni ham qabul qilinishi kerak bo'lsa, \`>=\` ishlatiladi.
✅ To'g'ri tushuncha:
\`\`\`javascript
console.log(18 > 18);  // false
console.log(18 >= 18); // true
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`price\` nomli o'zgaruvchi yarating (\`let price = 40;\`). Narx 50 dan kichikmi (\`price < 50\`) deb tekshiring va natijani \`isCheap\` o'zgaruvchisiga saqlab konsolga chiqaring.

### 2-mashq (O'rtacha)
\`speed\` nomli o'zgaruvchi yarating (\`let speed = 60;\`). Tezlik 60 dan oshmaganmi yoki tengmi (\`speed <= 60\`) deb tekshiring, natijani \`isAllowed\` o'zgaruvchisiga saqlang va konsolga chiqaring.

### 3-mashq (Chegara holat)
\`userAge\` (\`18\`) o'zgaruvchisi berilgan. U 18 ga teng yoki kattaligini (\`userAge >= 18\`) tekshirib, natijani \`canEnter\` o'zgaruvchisiga saqlang va konsolga chiqaring (\`true\` chiqadi).

### Javoblar:
1.
\`\`\`javascript
let price = 40;
let isCheap = price < 50;
console.log(isCheap);
\`\`\`
2.
\`\`\`javascript
let speed = 60;
let isAllowed = speed <= 60;
console.log(isAllowed);
\`\`\`
3.
\`\`\`javascript
let userAge = 18;
let canEnter = userAge >= 18;
console.log(canEnter);
\`\`\`

---

## 8. Xulosa

1. Taqqoslash operatorlari (\`>\`, \`<\`, \`>=\`, \`<=\`) ikkita sonni solishtiradi va natija har doim Boolean (\`true\` yoki \`false\`) bo'ladi.
2. \`>=\` (katta yoki teng) va \`<=\` (kichik yoki teng) operatorlarida teng bo'lgan holatda ham \`true\` chiqadi (\`10 >= 10\` bu \`true\`).
3. Taqqoslash belgisi har doim birinchi, tenglik ikkinchi yoziladi: \`>=\` va \`<=\`.

Keyingi darsda: Tenglikni tekshirish (== va ===) operatorlari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Kichiklikni tekshirish (<)",
      instruction: "`price` nomli o'zgaruvchi yarating (`let price = 40;`). Narx 50 dan kichikligini tekshirib, natijani `isCheap` o'zgaruvchisiga saqlang va `console.log(isCheap);` orqali chiqaring.",
      startingCode: "let price = 40;\n// isCheap o'zgaruvchisiga price < 50 ni saqlang va chiqaring\n",
      hint: "let isCheap = price < 50;\nconsole.log(isCheap);",
      test: "if (!code.includes('<')) return '< operatori ishlatilmadi';\nif (!code.includes('isCheap')) return 'isCheap o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Kichik yoki tenglikni tekshirish (<=)",
      instruction: "`speed` nomli o'zgaruvchi yarating (`let speed = 60;`). Tezlik 60 dan kichik yoki tengligini tekshirib, natijani `isAllowed` ga saqlang va konsolga chiqaring.",
      startingCode: "let speed = 60;\n// isAllowed ga speed <= 60 ni saqlang va chiqaring\n",
      hint: "let isAllowed = speed <= 60;\nconsole.log(isAllowed);",
      test: "if (!code.includes('<=')) return '<= operatori ishlatilmadi';\nif (!code.includes('isAllowed')) return 'isAllowed o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Katta yoki tenglik chegarasini tekshirish (>=)",
      instruction: "`userAge` o'zgaruvchisiga `18` qiymatini bering. `userAge >= 18` ekanini tekshirib, `canEnter` ga saqlang va konsolga chiqaring.",
      startingCode: "let userAge = 18;\n// canEnter ga userAge >= 18 ni saqlang va chiqaring\n",
      hint: "let canEnter = userAge >= 18;\nconsole.log(canEnter);",
      test: "if (!code.includes('>=')) return '>= operatori ishlatilmadi';\nif (!code.includes('canEnter')) return 'canEnter o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(15 > 20);` kodi konsolga nima chiqaradi?",
      options: [
        "true",
        "false",
        "15",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "15 soni 20 dan katta emas, shuning uchun natija false bo'ladi."
    },
    {
      id: 2,
      question: "Quyidagi taqqoslashlardan qaysi biri `true` natijasini beradi?",
      options: [
        "10 < 5",
        "10 > 15",
        "10 >= 10",
        "10 <= 9"
      ],
      correctAnswer: 2,
      explanation: ">= operatori agar sonlar teng bo'lsa ham true qaytaradi: 10 >= 10 rostdir."
    },
    {
      id: 3,
      question: "Katta yoki tenglikni tekshirish uchun qaysi belgi to'g'ri yozilgan?",
      options: [
        "=>",
        ">=",
        "> =",
        "= >"
      ],
      correctAnswer: 1,
      explanation: "Taqqoslash belgisi birinchi, tenglik ikkinchi va probelsiz yoziladi: >=."
    }
  ]
};
