export const consoleLog = {
  id: "consoleLog",
  title: "console.log Asoslari",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda ovoz kuchaytirgich (megafon) bor:
Siz megafon orqali xohlagan so'zingizni yoki sonni baland ovozda e'lon qilasiz.

Dasturlashda \`console.log()\` xuddi shu megafonga o'xshaydi: u kompyuter xotirasidagi ma'lumotni ekranga chiqarib ko'rsatadi.

\`console.log()\` — JavaScript'da matn yoki sonni ekranga (konsolga) chiqarish uchun ishlatiladigan buyruqdir.

---

## 2. Nega kerak?

Kompyuter kodni o'z ichida jim bajaradi. Agar biz unga natijani ko'rsatishni buyurmasak, dastur nima qilayotganini va hisob-kitob to'g'ri ishlayotganini bilolmaymiz.

\`console.log()\` dasturchiga kod qanday ishlayotganini va ekranda qanday ma'lumot borligini ko'rsatib turadi.

---

## 3. Birinchi misol

Bu kod konsolga matn chiqaradi.

\`\`\`javascript
console.log("Salom!"); // Matnni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`console\` — natijalar ko'rinadigan maxsus oyna (konsol).
- \`.log(...)\` — qavs ichidagi ma'lumotni shu oynaga chiqarish buyrug'i.
- \`"Salom!"\` — qo'shtirnoq ichidagi matn (text).
- \`;\` — qator tugaganini bildiruvchi belgi (nuqta-vergul).

---

## 5. Yana bitta misol

Bu kod konsolga son chiqaradi.

\`\`\`javascript
console.log(25); // Sonni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 25
\`\`\`

Sonlar (raqamlar) qo'shtirnoqsiz yoziladi.

---

## 5.1. Birdan chiqarish

\`\`\`javascript
console.log("Yosh:", 25); // Ikkita qiymatni birdan chiqarish
console.log(1, 2, 3);     // Uchta sonni birdan chiqarish
\`\`\`

\`\`\`text
// Natija: Yosh: 25
// Natija: 1 2 3
\`\`\`

Qator-baqator tahlil:
- \`console.log("Yosh:", 25)\` — bitta buyruqda ikkita qiymat berildi. JavaScript ularni orasida bo'sh joy qo'yib chiqaradi.
- \`console.log(1, 2, 3)\` — uchta qiymat ham bir qatorda chiqadi: \`1 2 3\`.
- Har bir qiymat o'z turida (matn matn, son son) ko'rinishida saqlanadi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Matnni qo'shtirnoqsiz yozish
❌ Xato kod:
\`\`\`javascript
console.log(Salom);
\`\`\`
Nima bo'ladi: \`ReferenceError: Salom is not defined\` xatoligi yuz beradi. Matn har doim qo'shtirnoq ichida yozilishi shart. Faqat sonlarni qo'shtirnoqsiz yozish mumkin.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

### 2. Qo'shtirnoqni yopmaslik
❌ Xato kod:
\`\`\`javascript
console.log("Salom);
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi yuz beradi. Matn boshlangan qo'shtirnoq oxirida yopilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

### 3. Katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
Console.log(100);
\`\`\`
Nima bo'ladi: \`ReferenceError: Console is not defined\` xatoligi yuz beradi. JavaScript katta-kichik harfni farqlaydi. Buyruq kichik harf bilan yozilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log(100);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Konsolga \`"JavaScript"\` matnini chiqaruvchi kod yozing.

### 2-mashq (O'rtacha)
Konsolga \`42\` sonini chiqaruvchi kod yozing (qo'shtirnoqsiz).

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni toping va to'g'rilang:
\`\`\`javascript
console.log(Salom);
\`\`\`

### Javoblar:
1. \`console.log("JavaScript");\`
2. \`console.log(42);\`
3. \`console.log("Salom");\` (\`Salom\` so'zi matn bo'lgani uchun qo'shtirnoq ichida bo'lishi kerak).

---

## 8. Xulosa

1. \`console.log()\` — matn va sonlarni ekranga (konsolga) chiqarish buyrug'i.
2. Matnlar har doim qo'shtirnoq ichida yoziladi: \`"Salom"\`.
3. Sonlar qo'shtirnoqsiz to'g'ridan-to'g'ri yoziladi: \`25\`.

Keyingi darsda: Kod ichida tushuntirish va eslatmalar qoldirish uchun sharhlar (comments) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matn chiqarish",
      instruction: "Konsolga `\"Dasturlash\"` matnini chiqaring. `console.log` dan foydalaning.",
      startingCode: "// Dasturlash matnini chiqaring\n",
      hint: "console.log(\"Dasturlash\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Dasturlash'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi. \"Dasturlash\" chiqishi kerak';"
    },
    {
      id: 2,
      title: "Son chiqarish",
      instruction: "Konsolga `100` sonini chiqaring (qo'shtirnoqsiz).",
      startingCode: "// 100 sonini chiqaring\n",
      hint: "console.log(100);",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nif (code.includes('\"100\"') || code.includes(\"'100'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('100'))) return null;\nreturn '100 soni chiqmadi.';"
    },
    {
      id: 3,
      title: "Xatoni tuzatish",
      instruction: "`console.log(Salom);` kodidagi xatoni tuzating (matn qo'shtirnoqda bo'lishi kerak).",
      startingCode: "console.log(Salom);\n",
      hint: "console.log(\"Salom\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Salom'))) return null;\nreturn 'Matn chiqmadi.';"
    },
    {
      "id": 4,
      "title": "Ikkita qiymat birdan chiqarish",
      "instruction": "Konsolga bitta console.log bilan `Yosh:` matni va `25` sonini birdan chiqaring (vergul bilan ajratib).",
      "startingCode": "// Yosh: va 25 ni birdan chiqaring\n",
      "hint": "console.log(\"Yosh:\", 25);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.replace(/\\s+/g, ' ').trim() === 'Yosh: 25')) return null;\nreturn 'Natija \"Yosh: 25\" bolishi kerak (orchada bosh joy bilan)';"
    },
    {
      "id": 5,
      "title": "Uchta sonni birdan chiqarish",
      "instruction": "Bitta console.log bilan 1, 2, 3 sonlarini chiqaring.",
      "startingCode": "// 1, 2, 3 ni birdan chiqaring\n",
      "hint": "console.log(1, 2, 3);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.replace(/\\s+/g, ' ').trim() === '1 2 3')) return null;\nreturn 'Natija \"1 2 3\" bolishi kerak';"
    },
    {
      "id": 6,
      "title": "Matn va sonni alohida qatorda",
      "instruction": "Birinchi qatorda `Salom` matnini, ikkinchi qatorda `100` sonini chiqaring (ikki alohida console.log).",
      "startingCode": "// Avval Salom, keyin 100\n",
      "hint": "Ikki marta console.log yozing.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst i1 = out.findIndex(m => m.trim() === 'Salom');\nconst i2 = out.findIndex(m => m.trim() === '100');\nif (i1 === -1) return 'Birinchi qatorda Salom chiqmadi';\nif (i2 === -1) return 'Ikkinchi qatorda 100 chiqmadi';\nif (i1 > i2) return 'Avval Salom, keyin 100 chiqishi kerak';\nreturn null;"
    },
    {
      "id": 7,
      "title": "Savol belgisi bilan chiqarish",
      "instruction": "Konsolga quyidagi matnni aynan shunday chiqaring: Necha yoshdasiz?",
      "startingCode": "// Savolni chiqaring\n",
      "hint": "console.log(\"Necha yoshdasiz?\");",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Necha yoshdasiz?')) return null;\nreturn 'Aynan \"Necha yoshdasiz?\" chiqishi kerak';"
    },
    {
      "id": 8,
      "title": "Katta harf xatosini topish",
      "instruction": "Quyidagi kodda Console.log katta harf bilan yozilgan. Xatoni to'g'rilang.",
      "startingCode": "Console.log(\"test\");\n",
      "hint": "console har doim kichik harf bilan boshlanadi.",
      "test": "if (/Console\\.log/.test(code)) return 'Console katta harf bilan qolgan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('test'))) return null;\nreturn 'test matni chiqmadi';"
    },
    {
      "id": 9,
      "title": "Qator raqamlarini chiqarish",
      "instruction": "Sakkizdan boshlab kamayib borib 5 da to'xtaydigan kod yozing: har bir raqam alohida qatorda chiqsin (4 ta console.log).",
      "startingCode": "// 8, 7, 6, 5 — har biri alohida qatorda\n",
      "hint": "To'rtta ta console.log: 8, 7, 6, 5.",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst nums = out.map(m => m.trim()).filter(m => /^\\d+$/.test(m));\nif (nums.join(',') === '8,7,6,5') return null;\nreturn '8, 7, 6, 5 tartibida har biri alohida qatorda chiqishi kerak; hozir: ' + nums.join(',');"
    },
    {
      "id": 10,
      "title": "Ikki qiymatli gap (chegara)",
      "instruction": "console.log ichida matn va sonni birlashtirib, quyidagi natijani chiqaring: Mening yoshim 10 (bitta console.log, ikki argument).",
      "startingCode": "// Mening yoshim 10 natijasini chiqaring\n",
      "hint": "console.log(\"Mening yoshim\", 10);",
      "test": "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.replace(/\\s+/g, ' ').trim() === 'Mening yoshim 10')) return null;\nreturn 'Natija \"Mening yoshim 10\" bolishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Konsolga son chiqarishda u qanday yoziladi?",
      options: [
        "Har doim qo'shtirnoq ichida",
        "To'g'ridan-to'g'ri raqam holida (qo'shtirnoqsiz)",
        "Katta harflar bilan",
        "Sonlarni konsolga chiqarib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Sonlar JavaScript'da to'g'ridan-to'g'ri raqam ko'rinishida qo'shtirnoqsiz yoziladi: console.log(42);"
    },
    {
      id: 2,
      question: "`console.log(Salom);` kodi nima uchun xato beradi?",
      options: [
        "Nuqta-vergul qo'yilmagan",
        "Salom so'zi qo'shtirnoqsiz yozilgan, matn doim qo'shtirnoqda bo'lishi kerak",
        "console so'zi noto'g'ri",
        "Xato bermaydi"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqsiz yozilgan so'z o'zgaruvchi deb qabul qilinadi va ReferenceError xatoligi kelib chiqadi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri to'g'ri yozilgan?",
      options: [
        "Console.log(\"Salom\")",
        "console.log(2026)",
        "console.log(\"Salom)",
        "log.console(2026)"
      ],
      correctAnswer: 1,
      explanation: "console.log(2026) — to'g'ri variant. console kichik harfda va son qo'shtirnoqsiz yozilgan."
    },
    {
      "id": 4,
      "question": "console.log ichiga bitta vergul bilan ikkita qiymat berilsa nima bo'?",
      "options": [
        "Faqat birinchisi chiqadi",
        "Ikkalasi ham orasida bo'sh joy bilan chiqadi",
        "Xato beradi",
        "Ikkalasi qo'shib yuboriladi"
      ],
      "correctAnswer": 1,
      "explanation": "console.log bir nechta argumentni qabul qiladi: ular orasida avtomatik bo'sh joy qo'shib chiqariladi."
    },
    {
      "id": 5,
      "question": "console.log(1, 2, 3) natijasi nima?",
      "options": [
        "123",
        "1 2 3",
        "1, 2, 3",
        "Xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "Uchta argument ham chiqadi, oralarida bitta bo'sh joy bo'ladi: 1 2 3."
    },
    {
      "id": 6,
      "question": "Konsolga ketma-ket ikki alohida qator chiqarish uchun nima yoziladi?",
      "options": [
        "Bitta console.log ichida ikki qator",
        "Ikki marta console.log",
        "console.log kerak emas",
        "Faqat HTML kerak"
      ],
      "correctAnswer": 1,
      "explanation": "Har bir qator uchun alohida console.log yoziladi. Chaqiruvlar tartibda bajariladi."
    },
    {
      "id": 7,
      "question": "console.log(25) ichidagi 25 uchun nima kerak?",
      "options": [
        "Qo'shtirnoq",
        "Hech narsa — sonlar qo'shtirnoqsiz yoziladi",
        "Asterisk",
        "Qavs"
      ],
      "correctAnswer": 1,
      "explanation": "Sonlar (raqamlar) qo' yoziladi. Qo'shtirnoq ichidagi 25 esa matn bo'lib hisoblanadi."
    },
    {
      "id": 8,
      "question": "Quyidagi kodda xato qayerda?  Console.log(\"Salom\");",
      "options": [
        "Qo'shtirnoq yopilmagan",
        "Console katta harf bilan yozilgan",
        "Notog'ri vergul yo'",
        "Xato yo'"
      ],
      "correctAnswer": 1,
      "explanation": "console doim kichik harf bilan boshlanadi. JavaScript harflarni qat'iy farqlaydi."
    },
    {
      "id": 9,
      "question": "console.log dan foydalanish uchun maxsus kutubxona kerakmi?",
      "options": [
        "Ha, uni ulash kerak",
        "Yo'q, u JavaScript muhitining o'zi mavjud",
        "Faqat Node.js da kerak",
        "Faqat brauzerda kerak"
      ],
      "correctAnswer": 1,
      "explanation": "console.log — JavaScript muhitida (brauzer va Node.js) oldindan mavjud buyruq, qo'shimcha o'rnatish shart emas."
    },
    {
      "id": 10,
      "question": "console.log(\"A\", \"B\") natijasi qanday?",
      "options": [
        "AB",
        "A B",
        "A, B",
        "\"A\" \"B\""
      ],
      "correctAnswer": 1,
      "explanation": "Ikkita matn argument orasida bitta bo'sh joy bilan chiqadi: A B."
    },
    {
      "id": 11,
      "question": "Konsolga chiqariladigan qiymat matnga aylantiriladimi?",
      "options": [
        "Ha, barcha qiymatlar matn bo'lib chiqadi",
        "Yo', sonlar son ko'rinishida, matnlar matn ko'rinishida chiqadi",
        "Faqat sonlar matn bo'lib chiqadi",
        "Bu muhim emas"
      ],
      "correctAnswer": 1,
      "explanation": "console.log qiymatni o'z turida chiqaradi: son son, matn matn ko'rinishida saqlanadi."
    },
    {
      "id": 12,
      "question": "console.log(\"Salom\") bilan console.log(\"Salom\"); orasida farq bormi?",
      "options": [
        "Bir xil ishlaydi, farq yo'q",
        "Semikolon — buyrug'i tugaganini bildiradi, kod to'g'roq o'qiladi",
        "Semikolonsiz kod ishlamaydi",
        "Semikolon xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "Semikolon (;) buyruqning tugaganini bildiradi. Aksariyat holatda semikolonsiz ham ishlaydi, lekin yozuvchi uchun aniq chegaradir."
    }
  ]
};
