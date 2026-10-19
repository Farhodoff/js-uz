export const booleanBasics = {
  id: "booleanBasics",
  title: "Boolean: true va false",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, devordagi chiroq yoqgichida (kalitida) faqat 2 ta holat bor:
- Yoqilgan (chiroq yonadi)
- O'chirilgan (chiroq o'chadi)

Uchinchisi yo'q: u yarimta yoqilgan bo'lolmaydi.

Dasturlashda Boolean turi xuddi shu ikki holatli chiroq kalitiga o'xshaydi.

Boolean (mantiqiy tur) — faqat ikkita qiymatdan birini: \`true\` (rost / ha) yoki \`false\` (yolg'on / yo'q) qabul qiladigan ma'lumot turidir.

---

## 2. Nega kerak?

Dasturlarda ko'pincha "Ha" yoki "Yo'q" degan aniq savollarga javob saqlash kerak bo'ladi:
- Foydalanuvchi tizimga kirganmi?
- Tovarlar omborda bormi?
- Tovush yoqilganmi?

Bunday ma'lumotlarni matn yoki son bilan saqlash noaniq bo'ladi. Boolean turi esa aniq \`true\` yoki \`false\` orqali bu savollarga javob saqlaydi.

---

## 3. Birinchi misol

Bu kod \`isOnline\` o'zgaruvchisiga \`true\` qiymatini beradi va konsolga chiqaradi.

\`\`\`javascript
let isOnline = true; // Foydalanuvchi tarmoqda (rost)
console.log(isOnline);
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isOnline = true;\` — \`isOnline\` nomli o'zgaruvchiga \`true\` mantiqiy qiymati berildi. \`true\` qo'shtirnoqsiz yoziladi.
- Nomlash uslubi: Boolean o'zgaruvchilari odatda savol ma'nosini beruvchi \`is...\` (\`isOnline\`, \`isCold\`) yoki \`has...\` (\`hasAccess\`) so'zlari bilan boshlanadi.
- \`console.log(isOnline);\` — konsolga \`true\` qiymati chiqadi.

---

## 5. Yana bitta misol

Bu kod \`isLoaded\` o'zgaruvchisiga \`false\` qiymatini beradi va konsolga chiqaradi.

\`\`\`javascript
let isLoaded = false; // Hali yuklanmagan (yolg'on)
console.log(isLoaded);
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

---

## 5.1. Bir nechta holatni birdan saqlash

Haqiqiy dasturda bitta holat emas, bir nechta holat bir vaqtda kuzatiladi. Har biri alohida o'zgaruvchida saqlanadi.

\`\`\`javascript
let isLightOn = true;    // yorug'lik yoqilgan
let hasPaid = false;     // to'lov hali bajarilmagan
let isCompleted = false; // vazifa tugallanmagan
console.log(isLightOn);
console.log(hasPaid);
console.log(isCompleted);
\`\`\`

\`\`\`text
// Natija:
true
false
false
\`\`\`

Nomlar inglizcha va holatni ochiq aytadi: isLightOn, hasPaid, isCompleted. Har biri o'z ma'nosi bilan yozilgani uchun kod keyin ham o'qilishi oson.

---

## 6. Ko'p uchraydigan xatolar

### 1. true yoki false ni qo'shtirnoqqa olish
❌ Xato tushuncha:
\`\`\`javascript
let isOnline = "true";
\`\`\`
Nima bo'ladi: \`isOnline\` Boolean bo'lmay qoladi, balki oddiy matn (String) bo'lib qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let isOnline = true;
\`\`\`

### 2. Katta harflar bilan yozish
❌ Xato kod:
\`\`\`javascript
let isOnline = True;
\`\`\`
Nima bo'ladi: \`ReferenceError: True is not defined\` xatoligi yuz beradi. JavaScript'da \`true\` va \`false\` faqat kichik harflar bilan yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let isOnline = true;
\`\`\`

### 3. False deb yozish
❌ Xato kod:
\`\`\`javascript
let isReady = False;
\`\`\`
Nima bo'ladi: \`ReferenceError: False is not defined\` xatoligi yuz beradi.
✅ To'g'ri variant:
\`\`\`javascript
let isReady = false;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`isLightOn\` nomli o'zgaruvchi yarating, unga \`true\` qiymatini bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`hasPaid\` nomli o'zgaruvchi yarating, unga \`false\` qiymatini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`ReferenceError\` xatosini to'g'rilang:
\`\`\`javascript
let isCompleted = True;
console.log(isCompleted);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let isLightOn = true;
console.log(isLightOn);
\`\`\`
2.
\`\`\`javascript
let hasPaid = false;
console.log(hasPaid);
\`\`\`
3.
\`\`\`javascript
let isCompleted = true; // True kichik harfda yoziladi
console.log(isCompleted);
\`\`\`

---

## 8. Xulosa

1. Boolean — faqat ikkita qiymatdan: \`true\` (ha/rost) yoki \`false\` (yo'q/yolg'on) dan iborat ma'lumot turi.
2. \`true\` va \`false\` har doim kichik harflar bilan va qo'shtirnoqsiz yoziladi.
3. Boolean o'zgaruvchilari odatda \`is...\` yoki \`has...\` so'zlari bilan nomlanadi (masalan, \`isOnline\`).

Keyingi darsda: qiymat berilmagan o'zgaruvchining avtomatik qiymati \`undefined\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "true qiymatli boolean yaratish",
      instruction: "`isLightOn` nomli o'zgaruvchi yarating (`let` bilan), unga `true` qiymatini bering va `console.log(isLightOn);` orqali chiqaring.",
      startingCode: "// isLightOn o'zgaruvchisini yarating va chiqaring\n",
      hint: "let isLightOn = true;\nconsole.log(isLightOn);",
      test: "if (code.includes('\"true\"') || code.includes(\"'true'\")) return 'true so\\'zini qo\\'shtirnoqsiz yozing';\nif (!code.includes('isLightOn')) return 'isLightOn nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true qiymati konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "false qiymatli boolean yaratish",
      instruction: "`hasPaid` nomli o'zgaruvchi yarating (`let` bilan), unga `false` qiymatini bering va konsolga chiqaring.",
      startingCode: "// hasPaid o'zgaruvchisini yarating va chiqaring\n",
      hint: "let hasPaid = false;\nconsole.log(hasPaid);",
      test: "if (code.includes('\"false\"') || code.includes(\"'false'\")) return 'false so\\'zini qo\\'shtirnoqsiz yozing';\nif (!code.includes('hasPaid')) return 'hasPaid nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false qiymati konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Katta harf xatosini tuzatish",
      instruction: "`let isCompleted = True;` dagi katta harf xatosini tuzating, toki konsolga `true` chiqsin.",
      startingCode: "let isCompleted = True;\nconsole.log(isCompleted);\n",
      hint: "let isCompleted = true;\nconsole.log(isCompleted);",
      test: "if (code.includes('True')) return 'True ni kichik harflar bilan true deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true qiymati konsolga chiqmadi';"
    },
    {
      "id": 4,
      "title": "Ikkita holatni bitta chiqarish",
      "instruction": "`isSunny = true` va `isRaining = false` o'zgaruvchilari berilgan. Ikkalasini AYNAN BIRTA `console.log` bilan chiqaring: konsolda `true false` ko'rinishida.",
      "startingCode": "let isSunny = true;\nlet isRaining = false;\n// Ikkalasini bitta console.log bilan chiqaring\n",
      "hint": "console.log(isSunny, isRaining);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'BIRTA console.log bilan chiqaring';\nif (out[0].trim() === 'true false') return null;\nreturn \"Natija 'true false' bolishi kerak\";"
    },
    {
      "id": 5,
      "title": "TRUE katta harfini tuzatish",
      "instruction": "`TRUE` katta harflarda yozilgan va xato bermoqda. JavaScript'da faqat kichik `true` bor. Tuzating: konsolga `true` chiqsin.",
      "startingCode": "let isWeekend = TRUE;\nconsole.log(isWeekend);\n",
      "hint": "TRUE ni kichik harflar bilan true deb yozing.",
      "test": "if (code.includes('TRUE')) return 'TRUE ni kichik harflar bilan true deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'true')) return null;\nreturn 'true qiymati konsolga chiqmadi';"
    },
    {
      "id": 6,
      "title": "Matndani boolean qilish",
      "instruction": "`isDone` hozir matn (`\"false\"`). Uni qo'shtirnoqsiz, haqiqiy boolean `false` ko'rinishida yozing va konsolga chiqaring.",
      "startingCode": "let isDone = \"false\";\nconsole.log(isDone);\n",
      "hint": "let isDone = false;",
      "test": "if (code.includes('\"false\"') || code.includes(\"'false'\")) return \"Qo'shtirnoqni olib tashlang\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return 'Qiymat chiqmadi';\nconst v = out[out.length - 1][0];\nif (typeof v !== 'boolean') return 'Qiymat boolean emas';\nif (v === false) return null;\nreturn 'Qiymat false bolishi kerak';"
    },
    {
      "id": 7,
      "title": "E'lon qilinmagan o'zgaruvchini tuzatish",
      "instruction": "`shopActive` e'lon qilinmaganligi uchun kod xato bermoqda. `let shopActive = true;` qatorini qo'shing: konsolga `true` va `true` ikkalasi ham chiqsin.",
      "startingCode": "let isReady = true;\nconsole.log(isReady);\nconsole.log(shopActive);\n",
      "hint": "let shopActive = true; — console.log lardan oldin yozing.",
      "test": "if (!code.includes('shopActive = true')) return 'let shopActive = true; qatorini qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki qiymat ham chiqishi kerak';\nif (out[1][0] !== true) return 'Ikkinchi qiymat true bolishi kerak';\nreturn null;"
    },
    {
      "id": 8,
      "title": "O'zgaruvchini nusxalash",
      "instruction": "`isRaining = false` berilgan. `sameWeather` nomli yangi o'zgaruvchi yarating va unga `isRaining` ning O'ZINI bering (nusxa). Ikkalasini ham chiqaring.",
      "startingCode": "let isRaining = false;\n// sameWeather ni yarating va isRaining ni bering\nconsole.log(isRaining);\nconsole.log(sameWeather);\n",
      "hint": "let sameWeather = isRaining;",
      "test": "if (!code.includes('sameWeather = isRaining')) return 'sameWeather = isRaining deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkala qiymat ham chiqishi kerak';\nif (out[0][0] !== false || out[1][0] !== false) return 'Ikkalasi ham false bolishi kerak';\nreturn null;"
    },
    {
      "id": 9,
      "title": "Ikki xato bitta kodda (chegara)",
      "instruction": "Ikki xato bor: `a` katta harfda yozilgan (`true` bo'lsin), `b` qo'shtirnoqda (`true` boolean bo'lsin). Ikkalasini ham tuzatib chiqaring.",
      "startingCode": "let a = True;\nlet b = \"true\";\nconsole.log(a);\nconsole.log(b);\n",
      "hint": "a = true (kichik harf, qo'shtirnoqsiz), b = true (qo'shtirnoqsiz).",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length < 2) return 'Ikkala qiymat ham chiqishi kerak';\nconst last2 = out.slice(-2);\nif (last2.some(x => typeof x[0] !== 'boolean')) return 'Ikkalasi ham boolean bolishi kerak';\nif (last2.every(x => x[0] === true)) return null;\nreturn 'Ikkalasi ham true bolishi kerak';"
    },
    {
      "id": 10,
      "title": "Holat o'zgarishini ko'rsatish (chegara)",
      "instruction": "`isLoading` ni `false` ga o'zgartiring va qayta chiqaring. Konsolda avval `true`, keyin `false` bo'lsin (ikki qator).",
      "startingCode": "let isLoading = true;\nconsole.log(isLoading); // hozir true\n// isLoading ni false qiling va yana chiqaring\n",
      "hint": "isLoading = false; — keyin console.log(isLoading); yana bir marta.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki marta chiqaring: avval true, keyin false';\nif (out[0][0] !== true) return 'Birinchi qiymat true bolishi kerak';\nif (out[1][0] !== false) return 'Ikkinchi qiymat false bolishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Boolean ma'lumot turida nechta mumkin bo'lgan qiymat bor?",
      options: [
        "Cheksiz ko'p",
        "Faqat ikkita: true va false",
        "Uchta: true, false, null",
        "Faqat 0 va 1"
      ],
      correctAnswer: 1,
      explanation: "Boolean turi faqat ikkita qiymatni qabul qiladi: true (rost) yoki false (yolg'on)."
    },
    {
      id: 2,
      question: "`let isOnline = \"true\";` qatoridagi `isOnline` qaysi ma'lumot turiga tegishli?",
      options: [
        "Boolean",
        "String (matn)",
        "Number (son)",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichiga yozilgan har qanday qiymat, hatto u \"true\" bo'lsa ham, String (matn) hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri JavaScript'da to'g'ri Boolean qiymat hisoblanadi?",
      options: [
        "True",
        "FALSE",
        "false",
        "\"false\""
      ],
      correctAnswer: 2,
      explanation: "JavaScript harflar registriga sezgir: Boolean qiymatlar faqat kichik harflar bilan true va false shaklida yoziladi."
    },
    {
      "id": 4,
      "question": "Boolean o'zgaruvchilari nomi odatda qanday boshlanadi?",
      "options": [
        "num yoki str bilan",
        "is yoki has bilan (isOnline, hasPaid)",
        "let yoki const bilan",
        "barchasi to'g'ri"
      ],
      "correctAnswer": 1,
      "explanation": "Holatni bildiruvchi nomlar odatda is... (isOnline, isCold) yoki has... (hasPaid, hasAccess) so'zlari bilan yoziladi. Bu kodni o'qilishini osonlashtiradi."
    },
    {
      "id": 5,
      "question": "`let isWeekend = TRUE;` qatorida nima bo'ladi?",
      "options": [
        "Ishlaydi, TRUE ham true",
        "ReferenceError: TRUE is not defined",
        "Matn bo'lib qoladi",
        "SyntaxError beradi"
      ],
      "correctAnswer": 1,
      "explanation": "JavaScript'da `true` va `false` faqat kichik harflarda mavjud. TRUE degan qiymat yo'q, shuning uchun ReferenceError chiqadi."
    },
    {
      "id": 6,
      "question": "Boolean qachon ishlatiladi?",
      "options": [
        "Faqat sonlarni saqlashda",
        "Ha/yo'q kabi ikki xolatli holatni aniq saqlashda",
        "Matn yozishda",
        "Faqat sanashda"
      ],
      "correctAnswer": 1,
      "explanation": "Boolean — ikki xolatli gap: yoqilganmi yoki yoqilmagan, to'laganmi yoki to'lamagan. Bunday holatlar true/false bilan saqlanadi."
    },
    {
      "id": 7,
      "question": "```javascript\nlet isOnline = true;\nisOnline = false;\nconsole.log(isOnline);\n```\nKonsolga nima chiqadi?",
      "options": [
        "true",
        "false",
        "true false",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "let bilan e'lon qilingan o'zgaruvchi qayta yozilishi mumkin. Oxirgi qiymat false bo'lgani uchun konsolga false chiqadi."
    },
    {
      "id": 8,
      "question": "```javascript\nlet isSunny = true;\nlet isRaining = false;\nconsole.log(isSunny, isRaining);\n```\nKonsolga nima chiqadi?",
      "options": [
        "true false",
        "truefalse",
        "true, false",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "console.log ichidagi vergul orasiga bo'sh joy qo'yiladi, qo'shtirnoq emas. Natija: true false."
    },
    {
      "id": 9,
      "question": "```javascript\nlet isRaining = false;\nlet sameWeather = isRaining;\nconsole.log(sameWeather);\n```\nNima chiqadi?",
      "options": [
        "isRaining",
        "false",
        "undefined",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "O'zgaruvchi o'rniga boshqa o'zgaruvchi yozilsa, uning qiymati olinadi. sameWeather ham false bo'ladi."
    },
    {
      "id": 10,
      "question": "`let count = 0;` qiymati booleanmi?",
      "options": [
        "Ha, false ga teng",
        "Yo'q — 0 son (Number), boolean faqat true va false",
        "Ha, true ga teng",
        "Yo'q, bu matn"
      ],
      "correctAnswer": 1,
      "explanation": "Boolean turida faqat ikkita qiymat bor: true va false. 0 — bu ham son, boolean emas."
    },
    {
      "id": 11,
      "question": "```javascript\nlet a = true;\nlet b = false;\nlet c = true;\nconsole.log(a, b, c);\n```\nKonsolga nima chiqadi?",
      "options": [
        "true false true",
        "true,false,true",
        "truefalse true",
        "Xato beradi"
      ],
      "correctAnswer": 0,
      "explanation": "Uchta qiymat vergul bilan yoziladi, konsol ularni bo'sh joy bilan ajratib chiqaradi: true false true."
    },
    {
      "id": 12,
      "question": "Qaysi koddagi qiymat xatolik bermaydi, lekin boolean emas?",
      "options": [
        "let x = TRUE;",
        "let x = False;",
        "let x = \"false\";",
        "Ikkalasi ham xato beradi"
      ],
      "correctAnswer": 2,
      "explanation": "\"false\" — oddiy matn. Kod ishlaydi, lekin x qatoridagi qiymat boolean emas. TRUE va False esa ReferenceError beradi."
    }
  ]
};
