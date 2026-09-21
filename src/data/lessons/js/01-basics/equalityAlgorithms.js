export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "== va === (Tenglik va Qat'iy Tenglik)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz bank kassiriga 100 dollar uzatyapsiz:
- Biri haqiqiy qog'oz kupyura (son).
- Ikkinchisi esa oddiy oq qog'ozga "100 dollar" deb yozilgan matn (string).

Uzoqdan qaragan odam (\`==\`) "ikkalasida ham 100 yozilgan ekan, teng" deb o'ylashi mumkin.
Lekin sinchkov bank xodimi (\`===\`) tekshirganda, ularning turi har xil ekanini ko'radi: biri haqiqiy pul, ikkinchisi oddiy qog'oz!

JavaScript'da:
- \`==\` (erkin tenglik) — faqat qiymatni tekshiradi, turlarni e'tiborsiz qoldirib, ularni orqada o'zgartiradi.
- \`===\` (qat'iy tenglik) — qiymatni HAM, ma'lumot turini HAM tekshiradi.

---

## 2. Nega kerak?

\`==\` operatori turlarni o'zboshimchalik bilan o'zgartirib yuboradi:
- \`5 == "5"\` → \`true\` (son matnga teng deb topiladi!)
- \`0 == false\` → \`true\` (son mantiqiy turga teng deb topiladi!)
- \`"" == false\` → \`true\`

Bunday kutilmagan "yashirin o'zgarishlar" dasturda juda xavfli xatolarni keltirib chiqaradi.

Shuning uchun zamonaviy JavaScript'da doimo \`===\` (qat'iy tenglik) ishlatiladi. U ikkala tomonning turi ham, qiymati ham bir xil bo'lgandagina \`true\` qaytaradi.

---

## 3. Birinchi misol

Bu kod bir xil son va matnni \`==\` hamda \`===\` yordamida solishtiradi.

\`\`\`javascript
let numberVal = 5; // Son (number)
let textVal = "5"; // Matn (string)

console.log(numberVal == textVal); // Faqat qiymat: true
console.log(numberVal === textVal); // Qiymat va tur: false
\`\`\`

\`\`\`text
// Natija: true
// Natija: false
\`\`\`

---

## 4. Qator-baqator tahlil

- \`numberVal == textVal\` — \`==\` operatori matn ichidagi \`"5"\` ni avtomatik ravishda songa aylantiradi va \`5 == 5\` deb hisoblab, \`true\` qaytaradi.
- \`numberVal === textVal\` — \`===\` operatori avval ularning ma'lumot turlarini tekshiradi: biri \`number\`, ikkinchisi esa \`string\`. Turlar bir xil bo'lmagani uchun darhol \`false\` qaytaradi.

---

## 5. Yana bitta misol

Bu kod \`0\` soni va \`false\` mantiqiy qiymatini solishtiradi.

\`\`\`javascript
let zeroNum = 0; // Son
let isFalse = false; // Boolean

console.log(zeroNum == isFalse); // Kutilmagan natija: true
console.log(zeroNum === isFalse); // Kutilgan qat'iy natija: false
\`\`\`

\`\`\`text
// Natija: true
// Natija: false
\`\`\`

Qator-baqator tahlil:
- \`0 == false\` — \`==\` operatori \`false\` ni \`0\` ga aylantirib yuboradi va natija \`true\` bo'lib qoladi.
- \`0 === isFalse\` — \`===\` turlarni tekshiradi (biri \`number\`, ikkinchisi \`boolean\`), shuning uchun to'g'ri va xavfsiz \`false\` qaytaradi.

Xulosa: Dasturingiz xatosiz ishlashi uchun har doim \`===\` ishlating.

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta = bilan === ni adashtirish
❌ Xato kod:
\`\`\`javascript
let score = 10;
console.log(score = 20);
\`\`\`
Nima bo'ladi: Bu yerda taqqoslash bo'lmaydi! Aksincha, \`score\` o'zgaruvchisiga yangi \`20\` qiymati yuklanadi va konsolga \`20\` chiqadi. Taqqoslash uchun doim \`===\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let score = 10;
console.log(score === 20); // false
\`\`\`

### 2. == ning null == undefined tuzog'i
❌ Xato tushuncha:
\`\`\`javascript
console.log(null == undefined); // true
\`\`\`
Nima bo'ladi: \`==\` operatori \`null\` bilan \`undefined\` ni bir-biriga teng deb hisoblaydi. Holbuki ular turli qiymatlar.
✅ To'g'ri variant:
\`\`\`javascript
console.log(null === undefined); // false
\`\`\`

### 3. To'rtta tenglik (====) yozish
❌ Xato kod:
\`\`\`javascript
let age = 18;
console.log(age ==== 18);
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '='\` xatoligi yuz beradi. JavaScript'da to'rtta tenglik yo'q, eng qat'iy tenglik bu uchta tenglikdir (\`===\`).
✅ To'g'ri variant:
\`\`\`javascript
console.log(age === 18);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`codeA\` (\`100\`) va \`codeB\` (\`"100"\`) o'zgaruvchilarini yarating. Ularni \`===\` bilan solishtirib, natijani \`isStrictEqual\` o'zgaruvchisiga saqlang va konsolga chiqaring (\`false\` chiqadi).

### 2-mashq (O'rtacha)
\`status\` nomli o'zgaruvchi berilgan (\`let status = "active";\`). U \`"active"\` so'ziga qat'iy tengmi (\`===\`) deb tekshiring va natijani konsolga chiqaring (\`true\` chiqadi).

### 3-mashq (Xatoni topish)
Quyidagi kodda taqqoslash o'rniga bitta \`=\` yozilgan xatoni \`===\` bilan to'g'rilang:
\`\`\`javascript
let userAge = 18;
let isEighteen = userAge = 18;
console.log(isEighteen);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let codeA = 100;
let codeB = "100";
let isStrictEqual = codeA === codeB;
console.log(isStrictEqual);
\`\`\`
2.
\`\`\`javascript
let status = "active";
console.log(status === "active");
\`\`\`
3.
\`\`\`javascript
let userAge = 18;
let isEighteen = userAge === 18;
console.log(isEighteen);
\`\`\`

---

## 8. Xulosa

1. \`==\` (erkin tenglik) faqat qiymatga qaraydi va turlarni avtomatik o'zgartiradi (\`5 == "5"\` bu \`true\`).
2. \`===\` (qat'iy tenglik) qiymatni HAM, ma'lumot turini HAM tekshiradi (\`5 === "5"\` bu \`false\`).
3. Dasturda kutilmagan xatolardan qochish uchun doimo \`===\` operatoridan foydalanish kerak.

Keyingi darsda: Mantiqiy operatorlar: VA (&&), YOKI (||) va EMAS (!) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Qat'iy tenglikni tekshirish (===)",
      instruction: "`codeA` (`100`) va `codeB` (`\"100\"`) o'zgaruvchilarini yarating. Ularni `===` bilan solishtirib, `isStrictEqual` ga saqlang va `console.log(isStrictEqual);` orqali chiqaring.",
      startingCode: "let codeA = 100;\nlet codeB = \"100\";\n// isStrictEqual ga codeA === codeB ni saqlang va chiqaring\n",
      hint: "let isStrictEqual = codeA === codeB;\nconsole.log(isStrictEqual);",
      test: "if (!code.includes('===')) return '=== operatori ishlatilmadi';\nif (!code.includes('isStrictEqual')) return 'isStrictEqual o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matnlarning qat'iy tengligi",
      instruction: "`status` nomli o'zgaruvchi berilgan (`let status = \"active\";`). Uning `\"active\"` ga qat'iy tengligini (`===`) tekshirib, natijani konsolga chiqaring.",
      startingCode: "let status = \"active\";\n// status === \"active\" ekanini konsolga chiqaring\n",
      hint: "console.log(status === \"active\");",
      test: "if (!code.includes('===')) return '=== operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Bitta tenglik xatosini to'g'rilash",
      instruction: "`let isEighteen = userAge = 18;` dagi bitta `=` ni `===` ga o'zgartiring, toki natija Boolean bo'lib konsolga chiqsin.",
      startingCode: "let userAge = 18;\nlet isEighteen = userAge = 18;\nconsole.log(isEighteen);\n",
      hint: "let isEighteen = userAge === 18;\nconsole.log(isEighteen);",
      test: "if (!code.includes('===')) return '=== operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(10 == \"10\");` va `console.log(10 === \"10\");` qanday natija beradi?",
      options: [
        "true va true",
        "false va false",
        "true va false",
        "false va true"
      ],
      correctAnswer: 2,
      explanation: "== turlarni avtomatik moslashtirib true beradi, === esa turlar (son va matn) har xilligi sababli false beradi."
    },
    {
      id: 2,
      question: "Nega zamonaviy JavaScript'da doimo === operatoridan foydalanish tavsiya qilinadi?",
      options: [
        "=== tezroq yoziladi",
        "=== ma'lumot turlarini yashirin o'zgartirmaydi va kutilmagan xatolardan asraydi",
        "== umuman xatolik beradi",
        "=== faqat matnlarni solishtiradi"
      ],
      correctAnswer: 1,
      explanation: "=== qat'iy tekshiruv o'tkazadi va yashirin tur o'zgarishi tufayli kelib chiqadigan xatolarning oldini oladi."
    },
    {
      id: 3,
      question: "`0 === false` ifodasi nega false natija beradi?",
      options: [
        "Chunki ularning ma'lumot turlari har xil: 0 son (number), false esa mantiqiy tur (boolean)",
        "Chunki 0 qiymati false ga teng emas",
        "Chunki bu ifoda xatolik beradi",
        "Chunki false har doim 1 ga teng"
      ],
      correctAnswer: 0,
      explanation: "=== operatorida agar ma'lumot turlari har xil bo'lsa, natija har doim false bo'ladi."
    }
  ]
};
