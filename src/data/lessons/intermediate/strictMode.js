export const strictMode = {
  id: "strictMode",
  title: "Strict Mode (Qat'iy Rejim)",
  language: "javascript",
  theory: `
## 1. 💡 Beginner Analogy
Tasavvur qiling, siz avtomobil boshqaryapsiz. Oddiy rejimda siz xavfsizlik kamarini taqmasdan yoki tezlikni sal oshirib haydasangiz, yo'l politsiyasi sizni darhol to'xtatmaydi, ba'zan kechiradi. Ammo bu xavfli! Strict Mode (\\\`"use strict";\\\`) esa xuddi qattiqqo'l politsiyachi yoki haydovchi imtihoni kabi ishlaydi — eng kichik xatoda ham chipta yozadi (Error tashlaydi) va sizni to'xtatadi. Bu sizning kodingiz xavfsizroq va ishonchliroq bo'lishini ta'minlaydi.

## 2. 🚀 Deep Dive (Under the hood, memory, V8 engine, performance)
Strict mode V8 dvigateli va JavaScript compiler'i uchun qanday ahamiyatga ega?
1. **Optimizatsiya (Performance):** Oddiy rejimda (Sloppy mode) JS dvigateli ko'plab "taxminlar" qilishiga to'g'ri keladi. Masalan, \\\`this\\\` konteksti o'zgarishi yoki \\\`arguments\\\` obyekti o'zgaruvchilar bilan bog'langanligi optimizatsiyani qiyinlashtiradi. Strict Mode JIT (Just-In-Time) compiler uchun kodni tezroq optimizatsiya qilishga yordam beradi, chunki unda xavfsizroq va qat'iy qoidalar mavjud.
2. **Xotira va Scope (Memory):** E'lon qilinmagan o'zgaruvchilarga qiymat berilganda, oddiy rejim avtomatik ravishda Global obyektga (window yoki global) yozadi. Bu **memory leak** (xotiradan sizib chiqish) ga olib keladi. Strict mode buni butunlay bloklaydi (\\\`ReferenceError\\\`).
3. **Zaxiralangan so'zlar (Keywords):** Strict mode \\\`implements\\\`, \\\`interface\\\`, \\\`let\\\`, \\\`package\\\`, \\\`private\\\`, \\\`protected\\\`, \\\`public\\\`, \\\`static\\\`, \\\`yield\\\` kabi so'zlarni band qiladi, bu esa kelajakdagi JS versiyalariga moslashishni osonlashtiradi.
4. **\\\`arguments\\\` obyekti optimizatsiyasi:** Strict mode'da \\\`arguments\\\` o'zgaruvchilarga referens sifatida bog'lanmaydi va \\\`arguments.callee\\\` o'chirilgan, bu esa xotirani tejaydi va dvigatelni chalg'itmaydi.

## 3. ⚠️ Edge Cases and Senior Interview Questions
**Senior Intervyu Savollari:**

1. **Savol:** \\\`eval()\\\` ichida yaratilgan o'zgaruvchi strict mode'da qanday ishlaydi?
   **Javob:** Strict mode \\\`eval()\\\` uchun alohida lexical scope yaratadi. Oddiy rejimda \\\`eval("var x = 10")\\\` tashqi scope'ni o'zgartiradi. Strict mode'da esa \\\`x\\\` faqat \\\`eval\\\` ichida qoladi.
2. **Savol:** \\\`delete\\\` operatori strict mode'da qanday ishlaydi?
   **Javob:** Agar non-configurable (o'chirish mumkin bo'lmagan) obyekt xususiyatini yoki oddiy o'zgaruvchini o'chirmoqchi bo'lsangiz, \\\`TypeError\\\` yoki \\\`SyntaxError\\\` qaytaradi.
3. **Savol:** \\\`this\\\` ning qiymati oddiy funksiyada nima bo'ladi?
   **Javob:** Oddiy rejimda \\\`window\\\` (browser) yoki \\\`global\\\` (Node.js). Strict mode'da esa aniq \\\`undefined\\\` bo'ladi. Agar \\\`apply\\\`/\\\`call\\\` orqali \\\`null\\\` yoki \\\`undefined\\\` berilsa, u avtomatik global obyektga o'girilmaydi.
4. **Savol:** Read-only xususiyatlarga qiymat yozish qanday ta'sir qiladi?
   **Javob:** Oddiy rejimda jimgina e'tiborsiz qoldiriladi. Strict mode'da esa \\\`TypeError\\\` otadi (masalan, \\\`Object.freeze()\\\` qilingan obyektga yozish).

## 4. 📊 Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[JS Engine Parsing] --> B{Is use strict declared?}
    B -- Yes --> C[Strict Mode Engine]
    B -- No --> D[Sloppy Mode Engine]
    C --> E[Blocks Global Variables]
    C --> F[this defaults to undefined]
    C --> G[Throws TypeError on read-only assignment]
    D --> H[Allows silent failures]
    D --> I[this defaults to Global Object]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "strict_ex_1",
      title: "Strict mode yoqish",
      instruction: "Qat'iy rejimni yoqing va `x` o'zgaruvchisini to'g'ri e'lon qilib (const), unga 50 qiymatini bering.",
      startingCode: `// Bu yerda strict mode yoqing\nx = 50;\n`,
      hint: "Fayl boshiga 'use strict'; yozing va x oldidan const/let qo'ying.",
      test: `
        const codeString = code.trim();
        expect(codeString.startsWith('"use strict";') || codeString.startsWith("'use strict';")).toBe(true);
        expect(codeString.includes('const x') || codeString.includes('let x')).toBe(true);
      `
    },
    {
      id: "strict_ex_2",
      title: "Undeclared Variables",
      instruction: "Qat'iy rejimda e'lon qilinmagan o'zgaruvchidan foydalanish xato berishidan qochish uchun funksiya ichidagi `message` ni to'g'ri e'lon qiling.",
      startingCode: `function greet() {\n  "use strict";\n  message = "Hello World";\n  return message;\n}`,
      hint: "message dan oldin let yoki const qo'yish kerak.",
      test: `
        const result = greet();
        expect(result).toBe("Hello World");
        expect(code.includes('const message') || code.includes('let message')).toBe(true);
      `
    },
    {
      id: "strict_ex_3",
      title: "this qiymatini tushunish",
      instruction: "`getThis` funksiyasi Strict Mode'da `this` ni qaytaradi. U global kontekstda nimani qaytarishini kutilgan javobga (expectedValue) yozing.",
      startingCode: `"use strict";\nfunction getThis() {\n  return this;\n}\n\nconst expectedValue = null; // o'zgartiring`,
      hint: "Strict Mode'da this global ob'yektga (window) emas, undefined ga teng bo'ladi.",
      test: `
        expect(expectedValue).toBeUndefined();
      `
    },
    {
      id: "strict_ex_4",
      title: "Takrorlanuvchi parametrlar",
      instruction: "Quyidagi funksiyadagi parametrlarni shunday to'g'rilangki, Strict Mode xato bermasin. Parametrlar `a` va `b` bo'lsin.",
      startingCode: `"use strict";\nfunction sum(a, a) {\n  return a + a;\n}`,
      hint: "Ikkinchi 'a' parametrini 'b' ga o'zgartiring va 'a + b' qaytaring.",
      test: `
        expect(sum(5, 10)).toBe(15);
        expect(code.includes('a, b') || code.includes('a,b')).toBe(true);
      `
    },
    {
      id: "strict_ex_5",
      title: "Octal Literals (Sakkizlik sanoq)",
      instruction: "Strict Mode'da `010` (octal) yozish xato beradi. Uni ES6 dagi to'g'ri sakkizlik yozish uslubi (`0o10`) bilan yoki oddiy o'nlik (8) soniga almashtiring.",
      startingCode: `"use strict";\nconst num = 010; // bu xato`,
      hint: "ES6 da octal sonlar 0o bilan boshlanadi: 0o10. Yoki oddiygina 8 deb yozishingiz mumkin.",
      test: `
        expect(num).toBe(8);
        expect(!code.includes('010')).toBe(true);
      `
    },
    {
      id: "strict_ex_6",
      title: "Read-only property",
      instruction: "Quyidagi ob'yektning yozish taqiqlangan (`writable: false`) xususiyatini o'zgartirishga urinish Strict Mode'da xato beradi. O'zgartirish qatorini o'chirib tashlang.",
      startingCode: `"use strict";\nconst obj = {};\nObject.defineProperty(obj, "prop", { value: 1, writable: false });\nobj.prop = 2; // bu qatorni o'chiring\n`,
      hint: "Read-only bo'lgan 'obj.prop = 2' qatorini butunlay olib tashlang.",
      test: `
        expect(obj.prop).toBe(1);
        expect(!code.includes('obj.prop = 2')).toBe(true);
      `
    },
    {
      id: "strict_ex_7",
      title: "O'chirish (delete) cheklovi",
      instruction: "Strict Mode'da o'zgaruvchilarni `delete` bilan o'chirib bo'lmaydi. Xato qatorini olib tashlang.",
      startingCode: `"use strict";\nlet myVar = 10;\ndelete myVar; // bu xato`,
      hint: "'delete myVar' qatorini o'chiring.",
      test: `
        expect(myVar).toBe(10);
        expect(!code.includes('delete myVar')).toBe(true);
      `
    },
    {
      id: "strict_ex_8",
      title: "Reserved words (Zaxiralangan so'zlar)",
      instruction: "Strict Mode'da `public` kabi zaxiralangan so'zlardan o'zgaruvchi nomi sifatida foydalanib bo'lmaydi. O'zgaruvchi nomini `isPublic` ga o'zgartiring.",
      startingCode: `"use strict";\nconst public = true; // xato`,
      hint: "'public' o'rniga 'isPublic' nomidan foydalaning.",
      test: `
        expect(isPublic).toBe(true);
        expect(!code.includes('const public')).toBe(true);
      `
    },
    {
      id: "strict_ex_9",
      title: "eval() o'ziga xosligi",
      instruction: "Strict Mode'da `eval` ichidagi o'zgaruvchilar tashqariga chiqmaydi. `evalResult` ga eval ishlaganda try/catch orqali nima xato qaytishi yoki qanday baholanishini tushunish uchun kodni yozing.",
      startingCode: `"use strict";\nlet evalResult;\ntry {\n  eval("var x = 10;");\n  evalResult = x;\n} catch (e) {\n  evalResult = "Error";\n}`,
      hint: "Strict Mode'da x ko'rinmasligi uchun catch ishlaydi va evalResult 'Error' bo'ladi.",
      test: `
        expect(evalResult).toBe("Error");
      `
    },
    {
      id: "strict_ex_10",
      title: "with statement taqiqi",
      instruction: "Strict Mode'da `with` taqiqlangan. Kodni `with` ishlatmasdan obyekt xususiyatiga to'g'ridan-to'g'ri murojaat qiladigan qilib yozing.",
      startingCode: `"use strict";\nconst math = { pi: 3.14 };\nlet radius = 2;\nlet area;\nwith(math) {\n  area = pi * radius * radius;\n}`,
      hint: "with bloğini o'chirib, area = math.pi * radius * radius; deb yozing.",
      test: `
        expect(area).toBe(12.56);
        expect(!code.includes('with')).toBe(true);
      `
    }
  ],
  quizzes: [
    {
      id: "strict_q_1",
      question: "JavaScript-da Strict Mode qanday yoqiladi?",
      options: [
        "use strict();",
        "\"use strict\";",
        "strict-mode: on;",
        "enable strict;"
      ],
      correctAnswer: "\"use strict\";",
      explanation: "Fayl boshiga yoki funksiya boshiga string shaklida 'use strict'; yoki \"use strict\"; yoziladi."
    },
    {
      id: "strict_q_2",
      question: "Strict mode qanday xatoning oldini oladi?",
      options: [
        "Sintaksis xatolarni butunlay yo'q qiladi",
        "E'lon qilinmagan o'zgaruvchilarga qiymat berishni cheklaydi",
        "Kodning bajarilishini 10 marta tezlashtiradi",
        "Faillarni avtomatik saqlaydi"
      ],
      correctAnswer: "E'lon qilinmagan o'zgaruvchilarga qiymat berishni cheklaydi",
      explanation: "Oddiy rejimda e'lon qilinmagan o'zgaruvchi (x = 10) global ob'yektga yozilib ketsa, qat'iy rejimda xato (ReferenceError) beradi."
    },
    {
      id: "strict_q_3",
      question: "Strict Mode'da global 'this' funksiya ichida qanday qiymatga ega?",
      options: [
        "window obyekti",
        "null",
        "undefined",
        "String"
      ],
      correctAnswer: "undefined",
      explanation: "Oddiy rejimda this window (yoki global) obyektni ko'rsatadi, qat'iy rejimda u undefined bo'ladi (agar metod bo'lmasa)."
    },
    {
      id: "strict_q_4",
      question: "ES6 Modullar (import/export) ichida Strict Mode-ni qo'lda yoqish shartmi?",
      options: [
        "Ha, har doim",
        "Yo'q, faqat eski browserlar uchun",
        "Yo'q, ES6 modullari doim avtomatik qat'iy rejimda ishlaydi",
        "Ha, faqat React loyihalarda"
      ],
      correctAnswer: "Yo'q, ES6 modullari doim avtomatik qat'iy rejimda ishlaydi",
      explanation: "Agar kodingiz type=\"module\" bo'lsa yoki ES6 modullarida ishlasa, 'use strict' avtomatik yoqiladi."
    },
    {
      id: "strict_q_5",
      question: "Quyidagi parametrlar bilan funksiya qat'iy rejimda ishlaydimi? function(a, a) { }",
      options: [
        "Ha, a ning so'nggi qiymati olinadi",
        "Yo'q, SyntaxError beradi",
        "Ha, lekin a undefined bo'ladi",
        "Yo'q, ReferenceError beradi"
      ],
      correctAnswer: "Yo'q, SyntaxError beradi",
      explanation: "Strict Mode-da funksiya parametrlari nomlari takrorlanishi mumkin emas."
    },
    {
      id: "strict_q_6",
      question: "Qaysi amaliyot qat'iy rejimda taqiqlanadi?",
      options: [
        "O'zgaruvchini var bilan e'lon qilish",
        "delete operatori bilan obyektni (o'zgaruvchini) o'chirish",
        "Funksiyalar ichida funksiya yaratish",
        "console.log ishlatish"
      ],
      correctAnswer: "delete operatori bilan obyektni (o'zgaruvchini) o'chirish",
      explanation: "delete variableName yoki delete functionName kabi amallar qat'iy rejimda xato beradi."
    },
    {
      id: "strict_q_7",
      question: "Class'lar ichida qat'iy rejim qanday holatda bo'ladi?",
      options: [
        "Faqat qo'lda yoqilsa ishlaydi",
        "Constructor ichidagina ishlaydi",
        "Class'larning barcha qismlari avtomatik qat'iy rejimda bo'ladi",
        "Class'larda qat'iy rejimni o'chirib qo'yish mumkin"
      ],
      correctAnswer: "Class'larning barcha qismlari avtomatik qat'iy rejimda bo'ladi",
      explanation: "Class tana qismi har doim (avtomatik ravishda) Strict Mode'da bo'ladi."
    },
    {
      id: "strict_q_8",
      question: "Qat'iy rejimda zaxiralangan so'zlardan o'zgaruvchi sifatida foydalanish...",
      options: [
        "Mumkin emas",
        "Faqat var bilan mumkin",
        "Mumkin",
        "Faqat let bilan mumkin"
      ],
      correctAnswer: "Mumkin emas",
      explanation: "public, private, interface kabi zaxiralangan so'zlar qat'iy rejimda taqiqlanadi."
    },
    {
      id: "strict_q_9",
      question: "Read-only (yozish ruxsat etilmagan) xususiyatga qiymat bersak Strict mode'da nima bo'ladi?",
      options: [
        "Qiymat jimgina o'zgarmay qoladi",
        "TypeError otiladi",
        "SyntaxError otiladi",
        "Qiymat baribir o'zgaradi"
      ],
      correctAnswer: "TypeError otiladi",
      explanation: "Oddiy rejimda e'tiborsiz qoldiriladigan bu holat Strict Mode'da Type Error chiqaradi."
    },
    {
      id: "strict_q_10",
      question: "Qat'iy rejimni butun loyiha o'rniga faqat bitta funksiyada yoqish mumkinmi?",
      options: [
        "Yo'q, faqat eng tepada yozilishi shart",
        "Ha, funksiyaning birinchi qatoriga 'use strict' yozib",
        "Ha, lekin faqat arrow funksiyalarda",
        "Yo'q, qat'iy rejim global bo'lishi kerak"
      ],
      correctAnswer: "Ha, funksiyaning birinchi qatoriga 'use strict' yozib",
      explanation: "Siz ma'lum bir funksiyani ichiga 'use strict' yozib, qat'iy rejimni faqat shu funksiya muhitida (scope) yoqishingiz mumkin."
    },
    {
      id: "strict_q_11",
      question: "Octal (sakkizlik) literal yozuvi `010` qat'iy rejimda ruxsat etiladimi?",
      options: [
        "Ha, u 8 degan sonni anglatadi",
        "Yo'q, SyntaxError beradi",
        "Ha, qat'iy rejim bunga e'tibor bermaydi",
        "Yo'q, u avtomatik o'nlikka aylanadi"
      ],
      correctAnswer: "Yo'q, SyntaxError beradi",
      explanation: "Köhnə uslubdagi octal literal (0 bilan boshlanadigan, masalan 010) qat'iy rejimda ruxsat etilmaydi. Buning o'rniga ES6 da 0o10 (nol va 'o') ishlatiladi."
    },
    {
      id: "strict_q_12",
      question: "'with' ifodasini qat'iy rejimda ishlata olamizmi?",
      options: [
        "Ha, tezroq ishlash uchun",
        "Yo'q, u xato (SyntaxError) beradi",
        "Ha, faqat ob'yektlar bilan",
        "Yo'q, chunki u eskirgan (lekin xato bermaydi)"
      ],
      correctAnswer: "Yo'q, u xato (SyntaxError) beradi",
      explanation: "Qat'iy rejimda kodni tahlil qilishni qiyinlashtirgani va scope chalkashligini keltirib chiqargani uchun 'with' butunlay taqiqlangan."
    }
  ]
};
