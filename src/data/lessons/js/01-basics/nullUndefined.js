export const nullUndefined = {
  id: "nullUndefined",
  title: "undefined: Qiymat Berilmagan O'zgaruvchi",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, do'kondan yangi quti sotib oldingiz. Quti o'zi bor. Lekin ichiga hali hech narsa solinmagan. Quti bo'sh.

Dasturlashda e'lon qilingan, lekin qiymat berilmagan o'zgaruvchi xuddi shu bo'sh qutiga o'xshaydi.

undefined — o'zgaruvchi yaratilgan, lekin unga hali hech qanday qiymat berilmaganligini bildiruvchi avtomatik qiymatdir.

---

## 2. Nega kerak?

Dasturda shunday holat bo'ladi: o'zgaruvchini e'lon qilasiz, lekin qiymat berishni unutasiz.

\`\`\`javascript
let phone;
console.log(phone);
\`\`\`

Konsolda notanish so'z chiqadi: \`undefined\`. Bu so'zni bilmasangiz, uni xato deb o'ylaysiz. Kodni buzib qayta yozasiz. Vaqtingiz ketadi.

Aslida \`undefined\` xato emas. Bu JavaScript'ning xabari: "bu o'zgaruvchiga hali qiymat berilmagan". Bu xabarni tanisangiz, muammoni bir soniyada topasiz: qiymat berish unutilgan.

---

## 3. Birinchi misol

Bu kod \`nickname\` o'zgaruvchisini qiymatsiz e'lon qiladi va konsolga chiqaradi.

\`\`\`javascript
let nickname; // Nickname e'lon qilindi, qiymat berilmadi
console.log(nickname); // undefined chiqadi
\`\`\`

\`\`\`text
// Natija: undefined
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let nickname;\` — \`nickname\` nomli o'zgaruvchi yaratildi. \`=\` belgisi yo'q. Qiymat berilmadi.
- \`// Nickname e'lon qilindi, qiymat berilmadi\` — izoh. Kod nima qilayotganini o'zbekcha tushuntiradi.
- \`console.log(nickname);\` — JavaScript qiymat berilmagan o'zgaruvchini ko'rib, avtomatik ravishda \`undefined\` chiqaradi.

---

## 5. Yana bitta misol

Bu kod ikkita o'zgaruvchini yonma-yon chiqaradi. Biriga qiymat berilgan, ikkinchisiga berilmagan.

\`\`\`javascript
let age = 25; // Yosh berildi
let city; // Shahar berilmadi
console.log(age); // 25 chiqadi
console.log(city); // undefined chiqadi
\`\`\`

\`\`\`text
// Natija:
25
undefined
\`\`\`

Qator-baqator tahlil:
- \`let age = 25;\` — \`age\` ga \`25\` qiymati berildi. Shuning uchun \`25\` chiqadi.
- \`let city;\` — \`city\` ga hech narsa berilmadi. Shuning uchun \`undefined\` chiqadi.
- Bir darsda ikki holat ko'rinadi: qiymatli o'zgaruvchi o'z qiymatini beradi, qiymatsiz o'zgaruvchi \`undefined\` beradi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Undefined ni katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
let nickname = Undefined;
\`\`\`
Nima bo'ladi: \`ReferenceError: Undefined is not defined\` xatoligi yuz beradi. JavaScript bu so'zni kichik harfda, qo'shtirnoqsiz yozilgandagina taniydi.
✅ To'g'ri variant:
\`\`\`javascript
let nickname; // Hech narsa berilmaydi
\`\`\`

### 2. undefined ni qo'shtirnoqqa olish
❌ Xato kod:
\`\`\`javascript
let status = "undefined"; // Qo'shtirnoq xato
console.log(status); // undefined ko'rinadi
\`\`\`
Nima bo'ladi: xato bermaydi, lekin \`status\` endi maxsus qiymat emas. U oddiy matn (String) bo'lib qoladi. Konsolda bir xil ko'rinsa ham, ma'nosi boshqa.
✅ To'g'ri variant:
\`\`\`javascript
let status; // Qo'shtirnoqsiz, hech narsa berilmaydi
console.log(status); // undefined chiqadi
\`\`\`

### 3. E'lon qilinmagan nomni chiqarish
❌ Xato kod:
\`\`\`javascript
console.log(orderId);
\`\`\`
Nima bo'ladi: \`ReferenceError: orderId is not defined\` xatoligi yuz beradi. Bu \`undefined\` emas. Farqi katta: \`undefined\` — e'lon qilingan, lekin qiymatsiz o'zgaruvchi. Bu xato — umuman e'lon qilinmagan nom.
✅ To'g'ri variant:
\`\`\`javascript
let orderId; // Oldin e'lon qilinadi
console.log(orderId); // undefined chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`book\` nomli o'zgaruvchi yarating. Qiymat bermang. Konsolga chiqaring.

### 2-mashq (O'rtacha)
\`ism\` ga \`"Ali"\` qiymatini bering. \`familiya\` ni qiymatsiz e'lon qiling. Ikkalasini bitta matnda chiqaring. Konsolda \`Ali undefined\` ko'rinishi kerak.

### 3-mashq (Chegara holat)
\`undefined\` ni to'g'ridan-to'g'ri, ataylab yozish mumkinmi? Sinab ko'ring:
\`\`\`javascript
let x = undefined;
console.log(x);
\`\`\`
Bu ishlaydi. Lekin ortiqcha: hech narsa yozmaslik kifoya qiladi.

### Javoblar:
1.
\`\`\`javascript
let book;
console.log(book);
\`\`\`
2.
\`\`\`javascript
let ism = "Ali";
let familiya;
console.log(\`\${ism} \${familiya}\`);
\`\`\`
3.
\`\`\`javascript
let x = undefined; // Mumkin, lekin shart emas
console.log(x);
\`\`\`

---

## 8. Xulosa

1. \`undefined\` — qiymat berilmagan o'zgaruvchining avtomatik qiymati.
2. \`undefined\` kichik harflar bilan va qo'shtirnoqsiz yoziladi. Qo'shtirnoq uni oddiy matnga aylantiradi.
3. \`undefined\` (qiymatsiz, lekin e'lon qilingan) bilan e'lon qilinmagan nom xatosi (\`ReferenceError\`) — ikki xil narsa.

Keyingi darsda: qiymatni ataylab bo'sh deb belgilaydigan \`null\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Qiymatsiz o'zgaruvchini chiqarish",
      instruction: "`phone` nomli o'zgaruvchi yarating (`let` bilan). Qiymat bermang. `console.log(phone);` orqali chiqaring.",
      startingCode: "// phone o'zgaruvchisini yarating va chiqaring\n",
      hint: "let phone;\nconsole.log(phone);",
      test: "if (!code.includes('phone')) return 'phone nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === undefined)) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Qiymatli va qiymatsiz yonma-yon",
      instruction: "`age` ga `30` bering. `city` ni qiymatsiz e'lon qiling. Ikkalasini tartib bilan chiqaring: avval `30`, keyin `undefined`.",
      startingCode: "// age ga 30 bering, city ni qiymatsiz e'lon qiling\n",
      hint: "let age = 30;\nlet city;\nconsole.log(age);\nconsole.log(city);",
      test: "if (!code.includes('age') || !code.includes('city')) return 'age va city o\\'zgaruvchilari kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkala qiymat ham chiqishi kerak';\nif (out[0][0] !== 30) return 'Birinchi qiymat 30 bolishi kerak';\nif (out[1][0] !== undefined) return 'Ikkinchi qiymat undefined bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "Katta harf xatosini tuzatish",
      instruction: "`let nickname = Undefined;` xato bermoqda. Katta harfni olib tashlang: `nickname` qiymatsiz e'lon qilinsin va konsolga `undefined` chiqsin.",
      startingCode: "let nickname = Undefined;\nconsole.log(nickname);\n",
      hint: "let nickname; — tenglik va qiymatni olib tashlang.",
      test: "if (code.includes('Undefined')) return 'Undefined ni olib tashlang, let nickname; deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === undefined)) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Matn tuzog'ini tuzatish",
      instruction: "`status` hozir matn (`\"undefined\"`). Qo'shtirnoqni olib tashlang: `status` qiymatsiz e'lon qilinsin.",
      startingCode: "let status = \"undefined\";\nconsole.log(status);\n",
      hint: "let status; — qo'shtirnoq ham, qiymat ham kerak emas.",
      test: "if (code.includes('\"undefined\"') || code.includes(\"'undefined'\")) return 'Qo\\'shtirnoqni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v === 'string') return 'Bu hali matn, haqiqiy undefined emas';\nif (v === undefined) return null;\nreturn 'undefined bolishi kerak';"
    },
    {
      id: 5,
      title: "E'lon qilinmagan nomni tuzatish",
      instruction: "`console.log(orderId);` xato bermoqda. Oldiniga `let orderId;` qatorini qo'shing: konsolga `undefined` chiqsin.",
      startingCode: "console.log(orderId);\n",
      hint: "let orderId; — chiqarishdan oldin yozing.",
      test: "if (!code.includes('let orderId')) return 'let orderId; qatorini qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === undefined)) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Qiymatsizni nusxalash",
      instruction: "`a` qiymatsiz e'lon qilingan. `b` nomli yangi o'zgaruvchi yarating va unga `a` ning O'ZINI bering. Ikkalasini ham chiqaring.",
      startingCode: "let a;\n// b ni yarating va a ni bering\nconsole.log(a);\nconsole.log(b);\n",
      hint: "let b = a;",
      test: "if (!code.includes('b = a')) return 'b = a deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkala qiymat ham chiqishi kerak';\nif (out[0][0] !== undefined || out[1][0] !== undefined) return 'Ikkalasi ham undefined bolishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Matn ichida undefined",
      instruction: "`ism` ga `\"Ali\"` bering. `familiya` ni qiymatsiz e'lon qiling. Template literal bilan chiqaring: konsolda `Ali undefined` ko'rinsin.",
      startingCode: "let ism = \"Ali\";\n// familiya ni e'lon qiling va bitta matnda chiqaring\n",
      hint: "let familiya;\nconsole.log(`${ism} ${familiya}`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Ali undefined')) return null;\nreturn \"Natija 'Ali undefined' bolishi kerak\";"
    },
    {
      id: 8,
      title: "Keyin qiymat berish",
      instruction: "`score` ni avval qiymatsiz e'lon qiling. Keyin unga `100` bering. Konsolga chiqaring: `100` chiqsin.",
      startingCode: "let score;\n// score ga 100 bering va chiqaring\n",
      hint: "score = 100;\nconsole.log(score);",
      test: "if (!code.includes('score = 100')) return 'score = 100 deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v !== 'number') return 'Qiymat son emas';\nif (v === 100) return null;\nreturn 'Natija 100 bolishi kerak';"
    },
    {
      id: 9,
      title: "Ataylab undefined yozish",
      instruction: "`x` ga ataylab `undefined` yozing (`let x = undefined;`) va konsolga chiqaring. Bu ishlaydi, lekin keyingi safar shunchaki qiymat bermang.",
      startingCode: "// x ga ataylab undefined bering va chiqaring\n",
      hint: "let x = undefined;\nconsole.log(x);",
      test: "if (!code.includes('undefined')) return 'undefined sozi qatnashishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === undefined)) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Uch xil qiymat ketma-ket (chegara)",
      instruction: "`count = 5`, `nick` (qiymatsiz), `isVip = true` berilgan. Uchalasini tartib bilan chiqaring: `5`, `undefined`, `true`.",
      startingCode: "let count = 5;\nlet nick;\nlet isVip = true;\n// Uchalasini tartib bilan chiqaring\n",
      hint: "console.log(count);\nconsole.log(nick);\nconsole.log(isVip);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 3) return 'Uchala qiymat ham chiqishi kerak';\nif (out[0][0] !== 5) return 'Birinchi qiymat 5 bolishi kerak';\nif (out[1][0] !== undefined) return 'Ikkinchi qiymat undefined bolishi kerak';\nif (out[2][0] !== true) return 'Uchinchi qiymat true bolishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let a;` qatoridan keyin `console.log(a);` nima chiqaradi?",
      options: [
        "Xatolik beradi",
        "undefined",
        "null",
        "Bo'sh qator"
      ],
      correctAnswer: 1,
      explanation: "Qiymat berilmagan o'zgaruvchi avtomatik undefined bo'ladi."
    },
    {
      id: 2,
      question: "undefined qachon paydo bo'ladi?",
      options: [
        "O'zgaruvchi e'lon qilinib, qiymat berilmaganda",
        "O'zgaruvchi o'chirilganda",
        "Kodda xato bo'lganda",
        "Sahifa yangilanganda"
      ],
      correctAnswer: 0,
      explanation: "undefined — qiymat hali berilmaganining belgisi."
    },
    {
      id: 3,
      question: "`let a = Undefined;` qatorida nima bo'ladi?",
      options: [
        "a undefined bo'ladi",
        "ReferenceError: Undefined is not defined",
        "a matnga aylanadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript katta harfni tanimaydi: faqat kichik undefined to'g'ri."
    },
    {
      id: 4,
      question: "`let a = \"undefined\";` qatorida `a` qaysi turga tegishli?",
      options: [
        "Maxsus bo'sh tur",
        "String (matn)",
        "Number (son)",
        "Boolean"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichidagi har qanday yozuv, hatto undefined so'zi ham, oddiy matn hisoblanadi."
    },
    {
      id: 5,
      question: "`let a; a = 10; console.log(a);` natijasi nima?",
      options: [
        "undefined",
        "10",
        "Xatolik",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Keyin qiymat berilsa, undefined o'rnini yangi qiymat egallaydi."
    },
    {
      id: 6,
      question: "E'lon qilinmagan `b` uchun `console.log(b);` nima qiladi?",
      options: [
        "undefined chiqaradi",
        "ReferenceError: b is not defined",
        "null chiqaradi",
        "0 chiqaradi"
      ],
      correctAnswer: 1,
      explanation: "E'lon qilinmagan nom — xato. undefined esa e'lon qilingan, lekin qiymatsiz o'zgaruvchi."
    },
    {
      id: 7,
      question: "`let a; let b = a;` qatorlaridan keyin `b` ning qiymati nima?",
      options: [
        "Xatolik",
        "undefined",
        "null",
        "Bo'sh matn"
      ],
      correctAnswer: 1,
      explanation: "a undefined bo'lgani uchun, uning nusxasi b ham undefined bo'ladi."
    },
    {
      id: 8,
      question: "`let ism; console.log(`Salom ${ism}`);` nima chiqaradi?",
      options: [
        "Salom",
        "Salom undefined",
        "Salom null",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Matn ichidagi qiymatsiz o'zgaruvchi o'rniga undefined so'zi tushadi."
    },
    {
      id: 9,
      question: "`let x = undefined;` yozish mumkinmi?",
      options: [
        "Yo'q, xato beradi",
        "Ha, ishlaydi — lekin ortiqcha, qiymat bermaslik kifoya",
        "Ha, va bu eng to'g'ri uslub",
        "Faqat const bilan mumkin"
      ],
      correctAnswer: 1,
      explanation: "Ataylab yozish mumkin, lekin odatda shunchaki qiymat berilmaydi."
    },
    {
      id: 10,
      question: "Qaysi o'zgaruvchi undefined bo'ladi?",
      options: [
        "let x = 5;",
        "let y;",
        "let z = \"salom\";",
        "let w = true;"
      ],
      correctAnswer: 1,
      explanation: "Faqat qiymat berilmagan y undefined bo'ladi."
    },
    {
      id: 11,
      question: "`let a; console.log(a, a);` natijasi nima?",
      options: [
        "undefined",
        "undefined undefined",
        "Xatolik",
        "null null"
      ],
      correctAnswer: 1,
      explanation: "Ikkala o'rin ham bir xil qiymatsiz o'zgaruvchi, shuning uchun ikki marta undefined chiqadi."
    },
    {
      id: 12,
      question: "`let nick = \"undefined\";` dagi muammo nima?",
      options: [
        "Hech qanday muammo yo'q",
        "nick matn bo'lib qolgan, haqiqiy undefined emas",
        "Xatolik beradi",
        "nick null bo'lib qolgan"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq maxsus qiymatni oddiy matnga aylantiradi."
    }
  ]
};
