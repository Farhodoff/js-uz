export const nullLesson = {
  id: "nullLesson",
  title: "null: Ataylab Bo'sh Qiymat",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, omborda bo'sh quti turibdi. Ikki xil holat bo'lishi mumkin:
- Quti shunchaki bo'sh. Hech kim uni tekshirmagan. Balki nimadir solish unutilgan.
- Qutiga "BO'SH" degan yorliq yopishtirilgan. Kimdir uni tekshirgan va ataylab "bu quti bo'sh" deb belgilagan.

Birinchi holat — \`undefined\` (o'tgan dars). Ikkinchi holat — \`null\`.

null — dasturchi tomonidan ataylab qo'yiladigan "qiymat yo'q" belgisidir.

---

## 2. Nega kerak?

Dasturda shunday holat bo'ladi: foydalanuvchining mashinasi yo'q. Siz buni kodda saqlashingiz kerak.

Agar shunday yozsangiz:

\`\`\`javascript
let car;
console.log(car);
\`\`\`

Konsolga \`undefined\` chiqadi. Bu "qiymat berish unutilgan" degani. Lekin siz unutganingiz yo'q. Siz aniq bilasiz: mashina YO'Q.

Muammo shunda: "unutildi" bilan "yo'q" ni farqlash kerak. Yechim — \`null\`:

\`\`\`javascript
let car = null; // Mashina yo'qligi ataylab belgilandi
console.log(car);
\`\`\`

Endi kod aniq gapiradi: "tekshirdim, mashina yo'q".

---

## 3. Birinchi misol

Bu kod \`car\` o'zgaruvchisiga ataylab \`null\` beradi va konsolga chiqaradi.

\`\`\`javascript
let car = null; // Mashina yo'qligi ataylab belgilandi
console.log(car); // null chiqadi
\`\`\`

\`\`\`text
// Natija: null
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let car = null;\` — \`car\` nomli o'zgaruvchi yaratildi. Unga \`null\` qiymati berildi. Bu "bo'sh" degan aniq belgi.
- \`// Mashina yo'qligi ataylab belgilandi\` — izoh. Nima uchun \`null\` tanlanganini tushuntiradi.
- \`console.log(car);\` — konsolga \`null\` chiqadi.

---

## 5. Yana bitta misol

Bu kod ikkita "yo'q" holatni yonma-yon chiqaradi. Sababi har xil.

\`\`\`javascript
let phone; // Qiymat berilmadi (unutildi)
let car = null; // Yo'qligi ataylab belgilandi
console.log(phone); // undefined chiqadi
console.log(car); // null chiqadi
\`\`\`

\`\`\`text
// Natija:
undefined
null
\`\`\`

Qator-baqator tahlil:
- \`let phone;\` — qiymat berilmadi. JavaScript avtomatik \`undefined\` beradi.
- \`let car = null;\` — dasturchi o'zi \`null\` yozdi. Bu ataylab belgi.
- Ikkalasi ham "yo'q". Lekin biri unutilgan, biri ataylab belgilangan.

---

## 6. Ko'p uchraydigan xatolar

### 1. Null ni katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
let car = Null;
\`\`\`
Nima bo'ladi: \`ReferenceError: Null is not defined\` xatoligi yuz beradi. Faqat kichik harfdagi \`null\` to'g'ri.
✅ To'g'ri variant:
\`\`\`javascript
let car = null; // Kichik harfda yoziladi
console.log(car); // null chiqadi
\`\`\`

### 2. null ni qo'shtirnoqqa olish
❌ Xato kod:
\`\`\`javascript
let car = "null"; // Qo'shtirnoq xato
console.log(car); // null ko'rinadi
\`\`\`
Nima bo'ladi: xato bermaydi, lekin \`car\` endi maxsus belgi emas. U oddiy matn (String) bo'lib qoladi. Konsolda bir xil ko'rinsa ham, ma'nosi boshqa.
✅ To'g'ri variant:
\`\`\`javascript
let car = null; // Qo'shtirnoqsiz yoziladi
console.log(car); // null chiqadi
\`\`\`

### 3. "Yo'q" ni matn bilan yozish
❌ Xato kod:
\`\`\`javascript
let car = "yo'q"; // Matn bilan belgilash
console.log(car);
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin bu oddiy matn. Dastur buni "qiymat yo'q" belgisi deb tushunmaydi. Har kim har xil yozadi: "yo'q", "mavjud emas", "bo'sh". Yagona standart yo'qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let car = null; // Hamma uchun bir xil belgi
console.log(car); // null chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`pet\` nomli o'zgaruvchi yarating. Unga ataylab \`null\` bering. Konsolga chiqaring.

### 2-mashq (O'rtacha)
\`car\` ga \`null\` bering. Template literal bilan chiqaring. Konsolda \`Mashina: null\` ko'rinishi kerak.

### 3-mashq (Chegara holat)
\`null\` vaqtinchalik belgi bo'lishi mumkin. Avval \`gift\` ga \`null\` bering. Keyin unga \`"kitob"\` qiymatini bering. Konsolga chiqaring. Natija \`kitob\` bo'lsin.

### Javoblar:
1.
\`\`\`javascript
let pet = null;
console.log(pet);
\`\`\`
2.
\`\`\`javascript
let car = null;
console.log(\`Mashina: \${car}\`);
\`\`\`
3.
\`\`\`javascript
let gift = null; // Hozircha bo'sh
gift = "kitob"; // Endi qiymat bor
console.log(gift);
\`\`\`

---

## 8. Xulosa

1. \`null\` — dasturchi ataylab qo'yadigan "qiymat yo'q" belgisi.
2. \`null\` kichik harflar bilan va qo'shtirnoqsiz yoziladi. Qo'shtirnoq uni oddiy matnga aylantiradi.
3. \`undefined\` (unutilgan) bilan \`null\` (ataylab belgilangan) — sababi har xil ikki "yo'q".

Keyingi darsda: qiymatning turini aniqlaydigan \`typeof\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Ataylab bo'sh belgilash",
      instruction: "`pet` nomli o'zgaruvchi yarating (`let` bilan). Unga ataylab `null` bering. `console.log(pet);` orqali chiqaring.",
      startingCode: "// pet o'zgaruvchisini yarating va null bering\n",
      hint: "let pet = null;\nconsole.log(pet);",
      test: "if (!code.includes('pet')) return 'pet nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === null)) return null;\nreturn 'null konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkita yo'q yonma-yon",
      instruction: "`phone` ni qiymatsiz e'lon qiling. `car` ga `null` bering. Ikkalasini tartib bilan chiqaring: avval `undefined`, keyin `null`.",
      startingCode: "// phone ni qiymatsiz e'lon qiling, car ga null bering\n",
      hint: "let phone;\nlet car = null;\nconsole.log(phone);\nconsole.log(car);",
      test: "if (!code.includes('phone') || !code.includes('car')) return 'phone va car o\\'zgaruvchilari kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkala qiymat ham chiqishi kerak';\nif (out[0][0] !== undefined) return 'Birinchi qiymat undefined bolishi kerak';\nif (out[1][0] !== null) return 'Ikkinchi qiymat null bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "Katta harf xatosini tuzatish",
      instruction: "`let car = Null;` xato bermoqda. Kichik harfga tuzating: konsolga `null` chiqsin.",
      startingCode: "let car = Null;\nconsole.log(car);\n",
      hint: "let car = null; — kichik harfda yozing.",
      test: "if (code.includes('Null')) return 'Null ni kichik harfda null deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === null)) return null;\nreturn 'null konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Matn tuzog'ini tuzatish",
      instruction: "`bag` hozir matn (`\"null\"`). Qo'shtirnoqni olib tashlang: `bag` haqiqiy `null` bo'lsin.",
      startingCode: "let bag = \"null\";\nconsole.log(bag);\n",
      hint: "let bag = null; — qo'shtirnoq kerak emas.",
      test: "if (code.includes('\"null\"') || code.includes(\"'null'\")) return 'Qo\\'shtirnoqni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v === 'string') return 'Bu hali matn, haqiqiy null emas';\nif (v === null) return null;\nreturn 'null bolishi kerak';"
    },
    {
      id: 5,
      title: "Matn ichida null",
      instruction: "`car` ga `null` bering. Template literal bilan chiqaring: konsolda `Mashina: null` ko'rinsin.",
      startingCode: "let car = null;\n// Bitta matnda chiqaring\n",
      hint: "console.log(`Mashina: ${car}`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Mashina: null')) return null;\nreturn \"Natija 'Mashina: null' bolishi kerak\";"
    },
    {
      id: 6,
      title: "null ni nusxalash",
      instruction: "`a = null` berilgan. `b` nomli yangi o'zgaruvchi yarating va unga `a` ning O'ZINI bering. Ikkalasini ham chiqaring.",
      startingCode: "let a = null;\n// b ni yarating va a ni bering\nconsole.log(a);\nconsole.log(b);\n",
      hint: "let b = a;",
      test: "if (!code.includes('b = a')) return 'b = a deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkala qiymat ham chiqishi kerak';\nif (out[0][0] !== null || out[1][0] !== null) return 'Ikkalasi ham null bolishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "null o'rniga qiymat qo'yish",
      instruction: "`car` hozir `null`. Unga `\"Spark\"` qiymatini bering va chiqaring: konsolda `Spark` chiqsin.",
      startingCode: "let car = null;\n// car ga Spark bering va chiqaring\n",
      hint: "car = \"Spark\";\nconsole.log(car);",
      test: "if (!code.includes('car = \"Spark\"') && !code.includes(\"car = 'Spark'\")) return 'car ga Spark qiymatini bering';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Spark')) return null;\nreturn 'Spark konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Sovg'a keldi (chegara)",
      instruction: "`gift` ga avval `null` bering. Keyin unga `\"kitob\"` bering. Konsolga chiqaring: `kitob` chiqsin.",
      startingCode: "let gift = null;\n// gift ga kitob bering va chiqaring\n",
      hint: "gift = \"kitob\";\nconsole.log(gift);",
      test: "if (!code.includes('gift')) return 'gift o\\'zgaruvchisi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'kitob')) return null;\nreturn 'kitob konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Bitta qatorda ikkita null",
      instruction: "`a = null` va `b = null` berilgan. Ikkalasini AYNAN BIRTA `console.log` bilan chiqaring: `null null` ko'rinsin.",
      startingCode: "let a = null;\nlet b = null;\n// Ikkalasini bitta console.log bilan chiqaring\n",
      hint: "console.log(a, b);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'BIRTA console.log bilan chiqaring';\nif (out[0].trim() === 'null null') return null;\nreturn \"Natija 'null null' bolishi kerak\";"
    },
    {
      id: 10,
      title: "Ikki xato bitta kodda (chegara)",
      instruction: "Ikki xato bor: `x` katta harfda (`null` bo'lsin), `y` qo'shtirnoqda (`null` bo'lsin). Ikkalasini ham tuzatib chiqaring.",
      startingCode: "let x = Null;\nlet y = \"null\";\nconsole.log(x);\nconsole.log(y);\n",
      hint: "x = null (kichik harf), y = null (qo'shtirnoqsiz).",
      test: "if (code.includes('Null')) return 'Null ni kichik harfda yozing';\nif (code.includes('\"null\"') || code.includes(\"'null'\")) return 'Qo\\'shtirnoqni olib tashlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length < 2) return 'Ikkala qiymat ham chiqishi kerak';\nconst last2 = out.slice(-2);\nif (last2.some(x => typeof x[0] === 'string')) return 'Ikkalasi ham matn emas, null bolishi kerak';\nif (last2.every(x => x[0] === null)) return null;\nreturn 'Ikkalasi ham null bolishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let car = null; console.log(car);` nima chiqaradi?",
      options: [
        "Xatolik beradi",
        "null",
        "undefined",
        "Bo'sh qator"
      ],
      correctAnswer: 1,
      explanation: "car ga ataylab null berilgani uchun konsolga null chiqadi."
    },
    {
      id: 2,
      question: "null qiymatini kim qo'yadi?",
      options: [
        "JavaScript avtomatik",
        "Dasturchi ataylab yozadi",
        "Brauzer o'zi",
        "Hech kim — o'zi paydo bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "null ni har doim dasturchi ataylab yozadi. Avtomatik qo'yilmaydi."
    },
    {
      id: 3,
      question: "`let car = Null;` qatorida nima bo'ladi?",
      options: [
        "car null bo'ladi",
        "ReferenceError: Null is not defined",
        "car matnga aylanadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript katta harfni tanimaydi: faqat kichik null to'g'ri."
    },
    {
      id: 4,
      question: "`let car = \"null\";` qatorida `car` qaysi turga tegishli?",
      options: [
        "Maxsus bo'sh tur",
        "String (matn)",
        "Number (son)",
        "Boolean"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichidagi har qanday yozuv, hatto null so'zi ham, oddiy matn hisoblanadi."
    },
    {
      id: 5,
      question: "undefined bilan null ning farqi nima?",
      options: [
        "Farqi yo'q, bir xil",
        "undefined — unutilgan, null — ataylab belgilangan",
        "null — unutilgan, undefined — ataylab belgilangan",
        "Ikkalasi ham xatolik"
      ],
      correctAnswer: 1,
      explanation: "undefined JavaScript avtomatik beradi (qiymat berilmagan). null ni dasturchi o'zi yozadi."
    },
    {
      id: 6,
      question: "`let phone; let car = null;` — qaysi biri avtomatik bo'sh?",
      options: [
        "car",
        "phone",
        "Ikkalasi ham",
        "Hech biri"
      ],
      correctAnswer: 1,
      explanation: "phone ga qiymat berilmagan — undefined avtomatik. car ga null ataylab yozilgan."
    },
    {
      id: 7,
      question: "`let car = null; car = \"Spark\"; console.log(car);` natijasi nima?",
      options: [
        "null",
        "Spark",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Keyin qiymat berilsa, null o'rnini yangi qiymat egallaydi."
    },
    {
      id: 8,
      question: "`let car = null; console.log(`Mashina: ${car}`);` nima chiqaradi?",
      options: [
        "Mashina:",
        "Mashina: null",
        "Mashina: undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Matn ichidagi null o'z nomi bilan yoziladi: Mashina: null."
    },
    {
      id: 9,
      question: "`let a = null; let b = a;` qatorlaridan keyin `b` ning qiymati nima?",
      options: [
        "Xatolik",
        "undefined",
        "null",
        "Bo'sh matn"
      ],
      correctAnswer: 2,
      explanation: "a null bo'lgani uchun, uning nusxasi b ham null bo'ladi."
    },
    {
      id: 10,
      question: "Qaysi o'zgaruvchi null bo'ladi?",
      options: [
        "let x = 5;",
        "let y = null;",
        "let z;",
        "let w = \"salom\";"
      ],
      correctAnswer: 1,
      explanation: "Faqat ataylab null berilgan y null bo'ladi. z esa undefined."
    },
    {
      id: 11,
      question: "`let pet = null; console.log(pet, pet);` natijasi nima?",
      options: [
        "null",
        "null null",
        "Xatolik",
        "undefined undefined"
      ],
      correctAnswer: 1,
      explanation: "Ikkala o'rin ham bir xil null o'zgaruvchi, shuning uchun ikki marta null chiqadi."
    },
    {
      id: 12,
      question: "Nega `let car;` o'rniga `let car = null;` yoziladi?",
      options: [
        "Qisqaroq bo'lgani uchun",
        "Mashina yo'qligini aniq bildirish uchun (unutilgan bilan adashmaslik uchun)",
        "Tezroq ishlashi uchun",
        "Farqi yo'q, xohlaganni yozsa bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "null — 'tekshirdim, yo'q' degan aniq javob. Qiymatsiz qoldirish esa 'unutilgan' degani."
    }
  ]
};
