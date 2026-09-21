export const logicalAnd = {
  id: "logicalAnd",
  title: "Mantiqiy VA (&&)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz aeroportda samolyotga chiqish nazoratidasiz. Xodim sizdan ikkita narsani talab qiladi:
1. Pasportingiz bo'lishi kerak **VA**
2. Chiptangiz bo'lishi kerak.

Agar faqat pasport bo'lib, chipta bo'lmasa — sizni kiritishmaydi (\`false\`).
Agar faqat chipta bo'lib, pasport bo'lmasa — ham kiritishmaydi (\`false\`).
Faqat **ikkalasi ham** bor bo'lsagina samolyotga chiqishga ruxsat beriladi (\`true\`).

Mantiqiy VA (\`&&\`) operatori — ikkita shartni birlashtiradi va faqat ikkala tomon ham rost (\`true\`) bo'lgandagina \`true\` qaytaradi. Agar bittasi bo'lsa ham yolg'on (\`false\`) bo'lsa, butun natija \`false\` bo'ladi.

---

## 2. Nega kerak?

Dasturlarda bir vaqtning o'zida bir nechta shart bajarilishini tekshirish juda ko'p uchraydi:
- Foydalanuvchi tizimga kirishi uchun ham login, ham parol to'g'ri kiritilgan bo'lishi kerak.
- Tovarni sotib olish uchun xaridorning yoshi yetarli bo'lishi VA hisobida yetarli pul bo'lishi kerak.

\`&&\` operatori barcha shartlar birgalikda to'g'ri kelganini bitta qatorda tekshirish imkonini beradi.

---

## 3. Birinchi misol

Bu kod ikkala shart ham \`true\` bo'lganda \`&&\` operatori qanday ishlashini ko'rsatadi.

\`\`\`javascript
let hasPassport = true; // Pasporti bor
let hasTicket = true; // Chiptasi bor

let canBoard = hasPassport && hasTicket; // Ikkalasi ham true
console.log(canBoard);
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`hasPassport && hasTicket\` — \`&&\` (ikkita ampersand belgisi) mantiqiy VA operatoridir.
- Chapdagi qiymat (\`true\`) VA o'ngdagi qiymat (\`true\`) bo'lgani sababli, umumiy natija \`true\` bo'ladi.
- \`console.log(canBoard);\` — konsolga \`true\` chiqadi.

---

## 5. Yana bitta misol

Bu kod shartlardan biri \`false\` bo'lganda \`&&\` qanday ishlashini ko'rsatadi.

\`\`\`javascript
let userAge = 20;
let hasMoney = false;

let canBuy = (userAge >= 18) && hasMoney; // 20 >= 18 (true), lekin puli yo'q (false)
console.log(canBuy);
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

Qator-baqator tahlil:
- \`userAge >= 18\` — yoshi 18 dan katta yoki teng, bu qism \`true\`.
- \`hasMoney\` — puli yo'qligi sababli bu qism \`false\`.
- \`true && false\` — shartlardan biri \`false\` bo'lgani uchun umumiy natija \`false\` bo'ladi.
- \`console.log(canBuy);\` — konsolga \`false\` chiqadi.

Mantiqiy VA (\`&&\`) natijalari:
- \`true && true\` → \`true\`
- \`true && false\` → \`false\`
- \`false && true\` → \`false\`
- \`false && false\` → \`false\`

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta & belgisi yozib qo'yish
❌ Xato kod:
\`\`\`javascript
let canEnter = hasPassport & hasTicket;
\`\`\`
Nima bo'ladi: Bitta \`&\` belgisi mantiqiy VA emas, balki "bit operatori" (bitwise) hisoblanadi va butunlay boshqacha ishlaydi. Mantiqiy VA uchun har doim ikkita \`&&\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let canEnter = hasPassport && hasTicket;
\`\`\`

### 2. Belgilar orasiga probel qo'yish (& &)
❌ Xato kod:
\`\`\`javascript
let isAllowed = true & & false;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '&'\` xatoligi yuz beradi. \`&&\` bitta yaxlit operator, uning o'rtasida probel bo'lmasligi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let isAllowed = true && false;
\`\`\`

### 3. && bittagina true bilan ishlaydi deb o'ylash
❌ Xato tushuncha: Shartlarning bittasi \`true\` bo'lsa kifoya deb o'ylash.
Nima bo'ladi: \`&&\` juda qat'iy operator. Hatto bir nechta shartdan bittasi \`false\` bo'lsa ham, natija butunlay \`false\` bo'ladi.
✅ To'g'ri tushuncha: \`&&\` faqat HAMMA shartlar \`true\` bo'lgandagina \`true\` qaytaradi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`hasKey\` (\`true\`) va \`knowsCode\` (\`true\`) o'zgaruvchilarini yarating. Ikkala shart bajarilganligini (\`hasKey && knowsCode\`) tekshirib, natijani \`canOpen\` ga saqlang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`balance\` (\`50\`), \`price\` (\`30\`) va \`isStoreOpen\` (\`false\`) o'zgaruvchilarini yarating. Xarid qilish uchun pul yetarlimi va do'kon ochiqmi (\`(balance >= price) && isStoreOpen\`) ekanini tekshirib, natijani \`canPurchase\` ga saqlang va konsolga chiqaring (\`false\` chiqadi).

### 3-mashq (Xatoni topish)
Quyidagi koddagi sintaksis xatosini to'g'rilang, toki konsolga \`false\` chiqsin:
\`\`\`javascript
let isAvailable = true & & false;
console.log(isAvailable);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let hasKey = true;
let knowsCode = true;
let canOpen = hasKey && knowsCode;
console.log(canOpen);
\`\`\`
2.
\`\`\`javascript
let balance = 50;
let price = 30;
let isStoreOpen = false;
let canPurchase = (balance >= price) && isStoreOpen;
console.log(canPurchase);
\`\`\`
3.
\`\`\`javascript
let isAvailable = true && false; // & & o'rtasidagi probel olib tashlanadi
console.log(isAvailable);
\`\`\`

---

## 8. Xulosa

1. \`&&\` (mantiqiy VA) operatori bir vaqtning o'zida bir nechta shartni tekshirish uchun ishlatiladi.
2. Natija faqat barcha shartlar \`true\` bo'lgandagina \`true\` bo'ladi.
3. Agar shartlardan bittasi bo'lsa ham \`false\` bo'lsa, \`&&\` natijasi darhol \`false\` bo'ladi.

Keyingi darsda: Mantiqiy YOKI (||) operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "&& operatori bilan tekshirish",
      instruction: "`hasKey` (`true`) va `knowsCode` (`true`) o'zgaruvchilarini yarating. `hasKey && knowsCode` natijasini `canOpen` ga saqlab `console.log(canOpen);` orqali chiqaring.",
      startingCode: "let hasKey = true;\nlet knowsCode = true;\n// canOpen ga hasKey && knowsCode ni saqlang va chiqaring\n",
      hint: "let canOpen = hasKey && knowsCode;\nconsole.log(canOpen);",
      test: "if (!code.includes('&&')) return '&& operatori ishlatilmadi';\nif (!code.includes('canOpen')) return 'canOpen o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Murakkab shartli && amali",
      instruction: "`balance = 50;`, `price = 30;`, `isStoreOpen = false;` o'zgaruvchilarini yarating. `(balance >= price) && isStoreOpen` ifodasini `canPurchase` ga saqlang va konsolga chiqaring.",
      startingCode: "let balance = 50;\nlet price = 30;\nlet isStoreOpen = false;\n// canPurchase ga shartni saqlang va chiqaring\n",
      hint: "let canPurchase = (balance >= price) && isStoreOpen;\nconsole.log(canPurchase);",
      test: "if (!code.includes('&&')) return '&& operatori ishlatilmadi';\nif (!code.includes('canPurchase')) return 'canPurchase o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "SyntaxError ni to'g'rilash",
      instruction: "`let isAvailable = true & & false;` dagi probel xatosini tuzating, toki konsolga `false` chiqsin.",
      startingCode: "let isAvailable = true & & false;\nconsole.log(isAvailable);\n",
      hint: "let isAvailable = true && false;\nconsole.log(isAvailable);",
      test: "if (code.includes('& &')) return '& va & orasidagi probelni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(true && false);` kodi qanday natija beradi?",
      options: [
        "true",
        "false",
        "undefined",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "&& operatorida ikkala tomon ham true bo'lishi kerak; bittasi false bo'lsa natija false bo'ladi."
    },
    {
      id: 2,
      question: "&& operatori qachon true natija qaytaradi?",
      options: [
        "Faqat ikkala tomoni ham true bo'lganda",
        "Tomonlardan bittasi true bo'lsa kifoya",
        "Ikkala tomoni ham false bo'lganda",
        "Har doim true qaytaradi"
      ],
      correctAnswer: 0,
      explanation: "Mantiqiy VA (&&) faqat barcha shartlar rost (true) bo'lgandagina true qaytaradi."
    },
    {
      id: 3,
      question: "JavaScript'da mantiqiy VA operatori qaysi belgilar bilan yoziladi?",
      options: [
        "AND",
        "&",
        "&&",
        "+"
      ],
      correctAnswer: 2,
      explanation: "JavaScript'da mantiqiy VA amali ikkita ampersand (&&) bilan yoziladi."
    }
  ]
};
