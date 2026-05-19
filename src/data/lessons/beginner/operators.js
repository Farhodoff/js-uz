export const operators = {
  id: "operators",
  title: "Operatorlar: Taqqoslash va Mantiqiy",
  theory: `## 1. KIRISH
Dasturlashda qaror qabul qilish uchun bizga operatorlar kerak. Masalan, foydalanuvchi kiritgan parol to'g'rimi? Yoki foydalanuvchining balansi xarid uchun yetarlimi? Bularning hammasi taqqoslash operatorlari orqali amalga oshiriladi.

Dasturlashda ma'lumotlar ustida ish bajarish uchun **Operatorlar** kerak. Ular xuddi matematikadagi ishoralarga o'xshaydi.

## 1. NEGA kerak?
Hech bir dastur hisob-kitobsiz yoki solishtirishlarsiz ishlamaydi. Masalan, "Agar puli 100 dan ko'p bo'lsa" degan shartni yozish uchun bizga \`>\` operatori kerak bo'ladi.

## 2. SODDALIK (Analogiya)
Operatorlarni **asboblar qutisi** deb tasavvur qiling. Bolg'a (qo'shish) bilan biror narsani ulaymiz, arra (ayirish) bilan kesamiz, tarozi (solishtirish) bilan qaysi biri og'irligini aniqlaymiz.

## 3. STRUKTURA (Asosiy operatorlar)

### A. Arifmetik operatorlar
\`\`\`javascript
5 + 2; // 7 (qo'shish)
5 - 2; // 3 (ayirish)
5 * 2; // 10 (ko'paytirish)
5 / 2; // 2.5 (bo'lish)
5 % 2; // 1 (qoldiqni olish)
5 ** 2; // 25 (darajaga ko'tarish)
\`\`\`

### B. Solishtirish operatorlari
Bular doim \`true\` yoki \`false\` qaytaradi:
\`\`\`javascript
5 > 2;  // true
5 < 2;  // false
5 >= 5; // true
5 === 5; // true (qat'iy teng)
5 !== 3; // true (teng emas)
\`\`\`

### C. Mantiqiy operatorlar
Bir nechta shartni birlashtirish uchun:
- **&& (VA):** Ikkala tomon ham \`true\` bo'lishi shart.
- **|| (YOKI):** Bitta tomon \`true\` bo'lsa yetarli.
- **! (EMAS):** Qiymatni teskarisiga o'zgartiradi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let pul = 100;
let narx = 80;
let ochiq = true;

let sotibOladi = (pul >= narx) && ochiq;
console.log(sotibOladi); // true
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **= va === farqi:** \`=\` — qiymat berish uchun, \`===\` — solishtirish uchun!
2. **Qoldiq operatori (%):** Ko'pchilik buni foiz bilan adashtiradi. \`5 % 2\` — bu 5 ni 2 ga bo'lgandagi qoldiq (\`1\`) degani.

## 6. SAVOLLAR (12 ta)
1. Operator nima?
2. Arifmetik operatorlarni sanab bering.
3. \`%\` operatori nima vazifani bajaradi?
4. Solishtirish operatorlari natijasi qanday ma'lumot turida bo'ladi?
5. \`==\` va \`===\` farqi nima?
6. \`&&\` (VA) operatori qachon \`true\` qaytaradi?
7. \`||\` (YOKI) operatori qachon \`true\` qaytaradi?
8. \`!\` operatori nima qiladi?
9. \`5 ** 3\` natijasi nima bo'ladi?
10. \`"5" + 5\` natijasi nima?
11. \`"5" - 5\` natijasi nima?
12. Increment (\`++\`) va Decrement (\`--\`) nima?`,
  exercises: [
    {
      id: 1,
      title: "Matematik mashq",
      instruction: "10 ni 3 ga bo'lgandagi qoldiqni toping va 'rem' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet rem = ",
      hint: "let rem = 10 % 3;",
      test: "if (rem === 1) return null; return 'Qoldiq noto\\'g\\'ri topildi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da \`===\` (qat'iy tenglik) va \`==\` (oddiy tenglik) operatorlarining asosiy farqi nimada?",
      options: [
        "\`==\` faqat sonlarni solishtiradi, \`===\` esa faqat matnlarni solishtiradi",
        "\`===\` qiymatlarni ham, ularning ma'lumot turlarini ham qat'iy solishtiradi; \`==\` esa solishtirishdan oldin turlarni avtomatik o'zgartiradi (coercion)",
        "Ular o'rtasida hech qanday farq yo'q",
        "\`===\` faqat obyektlarni solishtirish uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "\`===\` operatori qiymat va tipni bir vaqtda tekshiradi. \`==\` esa tiplarni o'zgartirib taqqoslagani uchun \`5 == '5'\` true bersa, \`5 === '5'\` false beradi."
    },
    {
      id: 2,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\\n\`\"10\" - 2 + \"5\"\`",
      options: [
        "\`\"13\"\`",
        "\`\"85\"\` (chunki \"10\" - 2 sonli ayirish bajarilib 8 bo'ladi, keyin unga + \"5\" satri qo'shilib matnli birlashish yuz beradi)",
        "\`13\`",
        "\`NaN\`"
      ],
      correctAnswer: 1,
      explanation: "Ayirish \`-\` operatori faqat raqamlar bilan ishlaganligi uchun \`\"10\"\` matnini 10 soniga o'tkazadi va \`10 - 2 = 8\` bo'ladi. Qo'shish \`+\` operatori satr ishtirok etganda konkatensiya (birlashish) qiladi: \`8 + \"5\" = \"85\"\`."
    },
    {
      id: 3,
      question: "\`&&\` (Mantiqiy VA) operatori qanday holatda \`true\` qiymat qaytaradi?",
      options: [
        "Kamida bitta tomoni \`true\` bo'lsa",
        "Ikkala tomoni ham (barcha shartlar) \`true\` bo'lsagina",
        "Ikkala tomoni ham \`false\` bo'lsa",
        "Faqat chap tomoni \`true\` bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "\`&&\` (AND) mantiqiy operatori barcha berilgan shartlar to'liq \`true\` bo'lgandagina yakuniy \`true\` qiymatni beradi."
    },
    {
      id: 4,
      question: "\`5 % 2\` amali nimani qaytaradi?",
      options: [
        "\`2.5\`",
        "\`1\` (chunki 5 ni 2 ga bo'lgandagi qoldiq 1 dir)",
        "\`2\`",
        "\`0\`"
      ],
      correctAnswer: 1,
      explanation: "\`%\` operatori (modulo) bo'lishdan hosil bo'lgan butun qoldiqni qaytaradi. 5 ni 2 ga bo'lganda 2 tadan tegib, 1 qoldiq qoladi."
    },
    {
      id: 5,
      question: "\`!true && (false || !false)\` ifodasidan qanday mantiqiy natija chiqadi?",
      options: [
        "\`true\`",
        "\`false\` (chunki birinchi qism \`!true\` bo'lgani sababli u \`false\` bo'ladi va \`&&\` operatori zanjirni darhol false qiladi)",
        "\`undefined\`",
        "\`NaN\`"
      ],
      correctAnswer: 1,
      explanation: "\`!true\` bizga \`false\` ni beradi. \`false && (istalgan narsa)\` ifodasining natijasi doimo \`false\` bo'ladi, chunki VA operatorida bitta false butun zanjirni false qiladi."
    }
  ]
};", file_path: