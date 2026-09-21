export const logicalNot = {
  id: "logicalNot",
  title: "Mantiqiy EMAS (!)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, uyingizdagi chiroq kaliti: siz uni bosganingizda, holat aynan teskarisiga o'zgaradi.
- Agar yoqilgan bo'lsa — o'chadi.
- Agar o'chirilgan bo'lsa — yonadi.

Yoki siz nima desangiz, ataylab teskarisini aytadigan qaysar do'stingiz kabi: siz "ha" desangiz, u "yo'q" deydi. Siz "yo'q" desangiz, u "ha" deydi.

Mantiqiy EMAS (\`!\`) operatori (inkor operatori) — mantiqiy qiymatni aynan teskarisiga aylantiradi: \`true\` ni \`false\` ga, \`false\` ni esa \`true\` ga o'zgartiradi.

---

## 2. Nega kerak?

Dasturlarda ko'pincha qandaydir holatning bo'lmaganini yoki yo'qligini tekshirish kerak bo'ladi:
- Foydalanuvchi tizimga kirmaganmi? (\`!isLoggedIn\`)
- Forma to'ldirilmaganmi? (\`!isCompleted\`)
- Mahsulot tugaganmi (omborda mavjud emasmi)? (\`!inStock\`)

\`!\` operatori har qanday mantiqiy qiymat oldiga qo'yilib, uning inkorini (teskarisini) bir zumda olish imkonini beradi.

---

## 3. Birinchi misol

Bu kod \`!\` operatori orqali \`true\` qiymatini \`false\` ga aylantiradi.

\`\`\`javascript
let isOnline = true; // Tarmoqda (rost)
let isOffline = !isOnline; // Teskarisi: false

console.log(isOffline);
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isOnline = true;\` — o'zgaruvchiga \`true\` qiymati yuklandi.
- \`!isOnline\` — \`!\` (undov belgisi) o'zgaruvchi oldiga qo'yilib, uning qiymatini teskarisiga aylantirdi (\`!true\` → \`false\`).
- \`console.log(isOffline);\` — konsolga \`false\` chiqadi.

---

## 5. Yana bitta misol

Bu kod \`false\` qiymatini \`true\` ga aylantiradi.

\`\`\`javascript
let hasError = false; // Xatolik yo'q
let isSuccess = !hasError; // Teskarisi: true

console.log(isSuccess);
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

Qator-baqator tahlil:
- \`!hasError\` — \`hasError\` qiymati \`false\` edi. Undov belgisi uni inkor qilib, \`true\` ga aylantirdi (\`!false\` → \`true\`).
- \`console.log(isSuccess);\` — konsolga \`true\` chiqadi.

Inkor jadvali:
- \`!true\` → \`false\`
- \`!false\` → \`true\`

---

## 6. Ko'p uchraydigan xatolar

### 1. Undov belgisini o'zgaruvchidan keyin qo'yish
❌ Xato kod:
\`\`\`javascript
let isReady = false;
let isNotReady = isReady!;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '!'\` xatoligi yuz beradi. Inkor operatori har doim qiymat yoki o'zgaruvchining OLDIGA qo'yilishi shart: \`!isReady\`.
✅ To'g'ri variant:
\`\`\`javascript
let isNotReady = !isReady;
\`\`\`

### 2. Ikkita inkor (!!) nima qilishini tushunmaslik
❌ Xato tushuncha: \`!!\` belgisi xatolik beradi deb o'ylash.
Nima bo'ladi: \`!!\` qiymatni ikki marta inkor qiladi va asl mantiqiy holatiga qaytaradi (masalan, \`!!true\` amali yana \`true\` bo'ladi).
✅ To'g'ri tushuncha:
\`\`\`javascript
let isOnline = true;
console.log(!isOnline);  // false
console.log(!!isOnline); // true
\`\`\`

### 3. Taqqoslash ifodasini qavssiz inkor qilish
❌ Xato kod:
\`\`\`javascript
let age = 15;
console.log(!age >= 18); // Kutilmagan natija: false
\`\`\`
Nima bo'ladi: \`!\` amali taqqoslashdan oldin bajariladi: \`!15\` avval \`false\` ga aylanadi, keyin esa \`false >= 18\` hisoblanib \`false\` chiqadi. Butun ifodani inkor qilish uchun qavs ishlatiladi: \`!(age >= 18)\`.
✅ To'g'ri variant:
\`\`\`javascript
let age = 15;
console.log(!(age >= 18)); // true (18 dan katta emas)
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`isLocked\` nomli o'zgaruvchi yarating (\`let isLocked = true;\`). Uning teskarisini \`!\` yordamida oling, \`isUnlocked\` ga saqlang va konsolga chiqaring (\`false\` chiqadi).

### 2-mashq (O'rtacha)
\`hasFinished\` nomli o'zgaruvchi yarating (\`let hasFinished = false;\`). Uni \`!\` bilan inkor qilib, natijani \`isRunning\` ga saqlang va konsolga chiqaring (\`true\` chiqadi).

### 3-mashq (Chegara holat)
\`userScore\` ga \`45\` sonini bering. U 50 dan katta yoki teng emasligini (\`!(userScore >= 50)\`) tekshiring, natijani \`isFailed\` ga saqlang va konsolga chiqaring (\`true\` chiqadi).

### Javoblar:
1.
\`\`\`javascript
let isLocked = true;
let isUnlocked = !isLocked;
console.log(isUnlocked);
\`\`\`
2.
\`\`\`javascript
let hasFinished = false;
let isRunning = !hasFinished;
console.log(isRunning);
\`\`\`
3.
\`\`\`javascript
let userScore = 45;
let isFailed = !(userScore >= 50);
console.log(isFailed);
\`\`\`

---

## 8. Xulosa

1. \`!\` (mantiqiy EMAS) operatori Boolean qiymatini aynan teskarisiga aylantiradi (\`!true\` → \`false\`, \`!false\` → \`true\`).
2. \`!\` belgisi har doim o'zgaruvchi yoki qiymatning OLDIGA qo'yiladi.
3. Murakkab ifodalarni inkor qilish uchun ularni qavsga olish kerak: masalan, \`!(x >= 10)\`.

Keyingi darsda: Shart operatorlari: if va else bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "true qiymatini inkor qilish",
      instruction: "`isLocked` nomli o'zgaruvchi yarating (`let isLocked = true;`). `!isLocked` natijasini `isUnlocked` ga saqlab `console.log(isUnlocked);` orqali chiqaring.",
      startingCode: "let isLocked = true;\n// isUnlocked ga !isLocked ni saqlang va chiqaring\n",
      hint: "let isUnlocked = !isLocked;\nconsole.log(isUnlocked);",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nif (!code.includes('isUnlocked')) return 'isUnlocked o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "false qiymatini inkor qilish",
      instruction: "`hasFinished` nomli o'zgaruvchi yarating (`let hasFinished = false;`). Uni inkor qilib, `isRunning` ga saqlang va konsolga chiqaring.",
      startingCode: "let hasFinished = false;\n// isRunning ga !hasFinished ni saqlang va chiqaring\n",
      hint: "let isRunning = !hasFinished;\nconsole.log(isRunning);",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nif (!code.includes('isRunning')) return 'isRunning o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Ifodani qavs bilan inkor qilish",
      instruction: "`userScore = 45;` o'zgaruvchisi berilgan. `!(userScore >= 50)` ifodasini `isFailed` ga saqlang va konsolga chiqaring.",
      startingCode: "let userScore = 45;\n// isFailed ga !(userScore >= 50) ni saqlang va chiqaring\n",
      hint: "let isFailed = !(userScore >= 50);\nconsole.log(isFailed);",
      test: "if (!code.includes('!')) return '! operatori ishlatilmadi';\nif (!code.includes('isFailed')) return 'isFailed o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`!true` ifodasi qanday natija beradi?",
      options: [
        "true",
        "false",
        "undefined",
        "0"
      ],
      correctAnswer: 1,
      explanation: "! (mantiqiy inkor) operatori true qiymatini aynan teskarisiga — false ga aylantiradi."
    },
    {
      id: 2,
      question: "Mantiqiy inkor operatori (!) qanday vazifani bajaradi?",
      options: [
        "Qiymatni songa aylantiradi",
        "Mantiqiy qiymatni aynan teskarisiga aylantiradi",
        "O'zgaruvchini o'chiradi",
        "Xatolik yuzaga keltiradi"
      ],
      correctAnswer: 1,
      explanation: "! operatori true ni false ga, false ni esa true ga almashtiradi."
    },
    {
      id: 3,
      question: "`let isClosed = false; console.log(!isClosed);` kodi konsolga nima chiqaradi?",
      options: [
        "false",
        "true",
        "null",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "!false ifodasi true qiymatini qaytaradi."
    }
  ]
};
