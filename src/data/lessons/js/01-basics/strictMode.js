export const strictMode = {
  id: "strictMode",
  title: "Qat'iy Rejim (Strict Mode)",
  language: "javascript",
  theory: `## 1. Bu nima?

Maktabdagi juda qattiq nazoratchi o'qituvchini tasavvur qiling. Siz doskaga yozasiz, u esa xatoni ko'rib darhol: "To'xta, bu xato!" deydi. Boshqa o'qituvchi esa indamay o'tkazib yuboradi va xato faqat bahongizda bilinadi.

JavaScript ham xuddi shunday: odatda u ba'zi xatolarni indamay kechib yuboradi. Fayl boshiga \`"use strict"\` yozsangiz, til qattiq nazoratga o'tadi va xatolar darhol ko'rinadi.

**Qat'iy rejim (strict mode)** — bu JavaScript ni jimgina kechib yuboradigan xatolarni zudlik bilan xato sifatida ko'rsatishga majbur qiluvchi rejim.

*Yangi tushuncha:*

- **"use strict"** — fayl yoki funksiya boshiga yoziladigan maxsus ko'rsatma (direktiva) bo'lib, qat'iy rejimni yoqadi.

---

## 2. Nega kerak?

Muammo: qat'iy rejimsiz e'lon qilinmagan o'zgaruvchi jimgina yaratiladi va xatoni topish juda qiyinlashadi.

\`\`\`javascript
function hisobla() {
  natija = 10; // e'lon qilinmagan: indamay global o'zgaruvchi bo'lib qoldi
  return natija;
}

console.log(hisobla());
console.log(natija); // kutilmagan global o'zgaruvchi paydo bo'ldi
\`\`\`

\`\`\`text
// Natija:
10
10
\`\`\`

Katta loyihada bunday yashirin o'zgaruvchi boshqa joydagi qiymatni buzib qo'yishi mumkin. Bunday xatoni topish uchun kodni uzoq qidirishga to'g'ri keladi.

Yechim: fayl boshiga \`"use strict";\` yozish. Shundan keyin o'sha qator darhol \`ReferenceError\` beradi va xato qayerdaligini bir zumda bilasiz.

---

## 3. Birinchi misol

Bu kod qat'iy rejimni yoqadi va to'g'ri e'lon qilingan o'zgaruvchini ishlatadi.

\`\`\`javascript
"use strict"; // fayl boshida qat'iy rejim yoqildi

let ism = "Ali"; // to'g'ri: o'zgaruvchi e'lon qilindi
console.log(ism); // qiymatni chiqaramiz
\`\`\`

\`\`\`text
// Natija:
Ali
\`\`\`

---

## 4. Qator-baqator tahlil

- \`"use strict";\` — faylning birinchi qatoriga yozilgan ko'rsatma. U qat'iy rejimni yoqadi.
- \`let ism = "Ali";\` — o'zgaruvchi nomi bilan e'lon qilindi, shuning uchun qat'iy rejim ham uni qabul qiladi.
- \`console.log(ism);\` — o'zgaruvchining qiymati konsolga chiqarildi.

Diqqat: ko'rsatma faqat **eng boshida** tursa ishlaydi. Undan oldin biror kod bajarilsa, u oddiy matn bo'lib qoladi.

---

## 5. Yana bitta misol

1-misoldan farqi: endi e'lon qilinmagan o'zgaruvchi jimgina o'tmaydi, dastur xato berib to'xtaydi.

\`\`\`javascript
"use strict";

try {
  hisob = 5; // e'lon qilinmagan o'zgaruvchi
} catch (xato) {
  console.log(xato.name); // xato nomini chiqaramiz
}
\`\`\`

\`\`\`text
// Natija:
ReferenceError
\`\`\`

Tahlil:

- \`try\` ichidagi qator xato beradi, chunki \`hisob\` hech qayerda e'lon qilinmagan.
- \`catch (xato)\` ushlab olgan xatoni \`xato.name\` orqali ko'rsatadi: \`ReferenceError\`.

---

## 6. Ko'p uchraydigan xatolar

### 1-xato: "use strict" ni fayl o'rtasiga yozish

❌ Xato kod:

\`\`\`javascript
console.log("Salom");
"use strict"; // endi bu ko'rsatma e'tiborsiz qoladi
\`\`\`

**Nima bo'ladi:** Ko'rsatma birinchi bo'lib turmasa, u oddiy matn kabi o'qiladi va qat'iy rejim yoqilmaydi.
**To'g'ri varianti:** \`"use strict";\` ni faylning birinchi qatori qilib yozing.

### 2-xato: qat'iy rejimda takroriy parametr

❌ Xato kod (natijada SyntaxError chiqadi):

\`\`\`javascript
"use strict";
function yigindi(a, a) { return a + a; } // takroriy parametr
\`\`\`

**Nima bo'ladi:** Qat'iy rejimda bir xil nomli ikki parametr taqiqlangan, shuning uchun kod umuman ishga tushmaydi (SyntaxError).
**To'g'ri varianti:** Parametrlarga har xil nom bering: \`function yigindi(a, b) { return a + b; }\`.

### 3-xato: kelajakdagi kalit so'zni o'zgaruvchi nomi qilish

❌ Xato kod (SyntaxError chiqadi):

\`\`\`javascript
"use strict";
let public = 5; // "public" kelajak uchun band qilingan so'z
\`\`\`

**Nima bo'ladi:** Qat'iy rejimda band qilingan so'zlarni o'zgaruvchi nomi qilish mumkin emas.
**To'g'ri varianti:** Ma'noli nom tanlang: \`let publicName = 5;\`.

---

## 7. Tekshiruv

### 1-mashq (oson)

\`"use strict";\` ni kodning eng boshiga yozing va \`let ism = "Ali";\` deb e'lon qilib, \`ism\` ni qaytaring.

### 2-mashq (o'rtacha)

\`xatoBer()\` funksiyasini yozing: ichida \`"use strict";\` bo'lsin, e'lon qilinmagan \`y = 1;\` qatori \`try/catch\` bilan ushlansin va ushlangan xato nomi (\`e.name\`) qaytarilsin.

### 3-mashq (chegara holat)

\`notStrict()\` funksiyasini yozing: ichida avval \`let son = 2;\` bajarilib, keyin \`"use strict";\` yozilsin va \`y = son;\` bajarilsin. Bu yerda ko'rsatma birinchi bo'lmagani uchun qat'iy rejim yoqilmaydi va \`y\` oddiy global o'zgaruvchi bo'lib qoladi. Funksiya \`typeof y\` qiymatini qaytarsin (\`"number"\`).

---

### Javoblar

**1-mashq javobi:**

\`\`\`javascript
"use strict";
let ism = "Ali";
\`\`\`

**2-mashq javobi:**

\`\`\`javascript
function xatoBer() {
  "use strict";
  try {
    y = 1;
  } catch (e) {
    return e.name;
  }
}
\`\`\`

**3-mashq javobi:**

\`\`\`javascript
function notStrict() {
  let son = 2;
  "use strict";
  y = son;
  return typeof y;
}
\`\`\`

---

## 8. Xulosa

1. \`"use strict";\` — eng boshida yozilsa, qat'iy rejimni yoqadi va xatolar darhol ko'rinadi.
2. Qat'iy rejim e'lon qilinmagan o'zgaruvchini \`ReferenceError\` ga aylantiradi.
3. Modullar (\`import/export\`) va class'lar avtomatik qat'iy rejimda ishlaydi, ularga qo'shimcha qator yozish shart emas.

Keyingi darsda: JavaScript'ning mashhur tuzoqlari (gotchas) — \`0.1 + 0.2\`, \`NaN\` va boshqa kutilmagan holatlar.
`,
exercises: [
    {
      id: 1,
      title: "Strict yoqish",
      instruction: "Kod boshida `\"use strict\";` yozing va `let ism = \"Ali\";` e'lon qiling.",
      startingCode: "// \"use strict\" yozing\n",
      hint: "\"use strict\";\nlet ism = \"Ali\";",
      test: "if (!code.trim().startsWith('\"use strict\"') && !code.trim().startsWith(\"'use strict'\")) return 'Eng boshida \"use strict\"; bo\\'lishi kerak';\nconst v = new Function(code + '; return ism;')();\nif (v === 'Ali') return null;\nreturn 'ism = Ali bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "To'g'ri e'lon",
      instruction: "`hisob()` funksiyasini yozing: ichida `\"use strict\";` va `let jami = 10 + 5;` bo'lsin, `jami` qaytarilsin.",
      startingCode: "function hisob() {\n  // strict + let\n}\n",
      hint: "\"use strict\"; let jami = 10 + 5; return jami;",
      test: "const fn = new Function(code + '; return hisob;')();\nif (fn() === 15) return null;\nreturn '15 qaytarishi kerak';"
    },
    {
      id: 3,
      title: "Xatoni ushlash",
      instruction: "`safeRun()` funksiyasi yozing: ichida `\"use strict\";` bilan e'lon qilinmagan o'zgaruvchiga (`x = 5;`) murojaat qilib XATO chiqishini ta'minlang. Funksiya xatoni `try/catch` bilan ushlab `\"Xato ushlandi\"` qaytarsin.",
      startingCode: "function safeRun() {\n  \"use strict\";\n  // try/catch yozing\n}\n",
      hint: "try { x = 5; } catch (e) { return \"Xato ushlandi\"; }",
      test: "const fn = new Function(code + '; return safeRun;')();\nif (fn() === 'Xato ushlandi') return null;\nreturn 'try/catch bilan xatoni ushlang';"
    },
    {
      id: 4,
      title: "Strict solishtirish",
      instruction: "`demo()` funksiyasi `\"use strict\";` bilan ishlab, `[1, 2]` massivini qaytarsin — strict rejimda ham kod to'g'ri ishlashini ko'ring.",
      startingCode: "function demo() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "\"use strict\"; let a = 1; let b = 2; return [a, b];",
      test: "const fn = new Function(code + '; return demo;')();\nif (JSON.stringify(fn()) === JSON.stringify([1,2])) return null;\nreturn '[1,2] qaytarishi kerak';"
    },
    {
      "id": 5,
      "title": "Strict boshida bo'lishi shart",
      "instruction": "Kodning eng boshida `\"use strict\";` yozing, `let son = 7;` deb e'lon qiling va `son` ni qaytaring (javob 7 bo'lishi uchun oxiriga `son` yozing).",
      "startingCode": "// \"use strict\" yozing, son ni e'lon qiling va oxirida son ni yozing\n",
      "hint": "\"use strict\";\nlet son = 7;\nson;",
      "test": "if (code.trim().indexOf('\"use strict\"') !== 0 && code.trim().indexOf(\"'use strict'\") !== 0) return 'Eng boshida \"use strict\"; bo\\'lishi kerak';\nconst v = new Function(code + \"; return son;\")();\nif (v === 7) return null;\nreturn \"son 7 bo'lishi kerak\";"
    },
    {
      "id": 6,
      "title": "Funksiya ichida strict rejim",
      "instruction": "`ichida()` funksiyasini yozing: ichida `\"use strict\";` va `let x = 3;` bo'lsin va `x * 2` qaytarilsin (natija 6).",
      "startingCode": "function ichida() {\n  // strict + let\n}\n",
      "hint": "function ichida() {\n  \"use strict\";\n  let x = 3;\n  return x * 2;\n}",
      "test": "const fn = new Function(code + \"; return ichida;\")();\nif (fn() === 6) return null;\nreturn \"6 qaytarishi kerak\";"
    },
    {
      "id": 7,
      "title": "Xato nomini aniqlash",
      "instruction": "`xatoBer()` funksiyasini yozing: `\"use strict\";` bilan e'lon qilinmagan `y = 1;` qatorini `try/catch` ichida bajarib, ushlangan xato nomini (`e.name`) qaytaring (\"ReferenceError\").",
      "startingCode": "function xatoBer() {\n  // strict + try/catch\n}\n",
      "hint": "function xatoBer() {\n  \"use strict\";\n  try {\n    y = 1;\n  } catch (e) {\n    return e.name;\n  }\n}",
      "test": "const fn = new Function(code + \"; return xatoBer;\")();\nif (fn() === \"ReferenceError\") return null;\nreturn \"ReferenceError qaytarishi kerak\";"
    },
    {
      "id": 8,
      "title": "Global o'zgaruvchi paydo bo'lmasligi",
      "instruction": "`tekshir()` funksiyasini yozing: `\"use strict\";` bilan `z = 5;` ni `try/catch` ichida bajarib, oxirida `typeof z` ni qaytaring. Strict rejimda `z` umuman yaratilmaydi (\"undefined\").",
      "startingCode": "function tekshir() {\n  // strict + try/catch, so'ng typeof z qaytaring\n}\n",
      "hint": "function tekshir() {\n  \"use strict\";\n  try {\n    z = 5;\n  } catch (e) {}\n  return typeof z;\n}",
      "test": "const fn = new Function(code + \"; return tekshir;\")();\nif (fn() === \"undefined\") return null;\nreturn 'strict rejimda z yaratilmaydi, \"undefined\" kerak';"
    },
    {
      "id": 9,
      "title": "Strict rejimda to'g'ri kod ishlashda davom etadi",
      "instruction": "`engKatta()` funksiyasini yozing: ichida `\"use strict\";` bo'lsin va `Math.max(1, 5, 3)` qaytarilsin (natija 5).",
      "startingCode": "function engKatta() {\n  // strict + Math.max\n}\n",
      "hint": "function engKatta() {\n  \"use strict\";\n  return Math.max(1, 5, 3);\n}",
      "test": "const fn = new Function(code + \"; return engKatta;\")();\nif (fn() === 5) return null;\nreturn \"5 qaytarishi kerak\";"
    },
    {
      "id": 10,
      "title": "Chegara: o'rtadagi direktiva ishlamaydi",
      "instruction": "`notStrict()` funksiyasini yozing: avval `let son = 2;`, keyin `\"use strict\";`, so'ng `y = son;` bajarilsin. Direktiva birinchi bo'lmagani uchun qat'iy rejim yoqilmaydi va `y` global o'zgaruvchi bo'lib qoladi. Funksiya `typeof y` ni qaytarsin (\"number\").",
      "startingCode": "function notStrict() {\n  // let son = 2; \"use strict\"; y = son; return typeof y;\n}\n",
      "hint": "function notStrict() {\n  let son = 2;\n  \"use strict\";\n  y = son;\n  return typeof y;\n}",
      "test": "const fn = new Function(code + \"; return notStrict;\")();\nif (fn() === \"number\") return null;\nreturn '\"number\" qaytarishi kerak (direktiva ishlamadi)';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`\"use strict\"` qayerga yoziladi?",
      options: [
        "Fayl oxiriga",
        "Fayl yoki funksiyaning eng boshiga",
        "Istalgan joyga",
        "Faqat izohga"
      ],
      correctAnswer: 1,
      explanation: "Boshida bo'lmasa — e'tiborsiz qoladi."
    },
    {
      id: 2,
      question: "Strict rejimda `x = 5;` (e'lonsiz) nima bo'ladi?",
      options: [
        "O'zgaruvchi yaratiladi",
        "ReferenceError beradi",
        "Jimgina o'tadi",
        "undefined bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Strict yashirin xatolarni ushlaydi."
    },
    {
      id: 3,
      question: "Modullarda `\"use strict\"` yozish kerakmi?",
      options: [
        "Ha, shart",
        "Yo'q — avtomatik strict",
        "Faqat React'da",
        "Faqat Node'da"
      ],
      correctAnswer: 1,
      explanation: "import/export va class avtomatik strict."
    },
    {
      id: 4,
      question: "Strict rejimning asosiy foydasi?",
      options: [
        "Kod tezlashadi",
        "Xatolar indamay o'tmaydi — erta ushlanadi",
        "Kod qisqaradi",
        "Rangli bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Yashirin buglar oshkor bo'ladi."
    },
    {
      "id": 5,
      "question": "Qat'iy rejim qaysi qator bilan yoqiladi?",
      "options": [
        "\"use strict\";",
        "strict(true);",
        "\"strict mode on\";",
        "useStrict();"
      ],
      "correctAnswer": 0,
      "explanation": "Qat'iy rejim aynan \"use strict\"; ko'rsatmasi bilan yoqiladi."
    },
    {
      "id": 6,
      "question": "Qat'iy rejimda e'lon qilinmagan o'zgaruvchiga qiymat berilsa nima bo'ladi?",
      "options": [
        "Jimgina global o'zgaruvchi yaratiladi",
        "ReferenceError beradi",
        "undefined bo'ladi",
        "Kod sekinroq ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Qat'iy rejim yashirin xatoni yashirmaydi: e'lonsiz o'zgaruvchi ReferenceError beradi."
    },
    {
      "id": 7,
      "question": "`\"use strict\";` fayl o'rtasiga yozilsa nima bo'ladi?",
      "options": [
        "Baribir ishlaydi",
        "E'tiborsiz qoladi, chunki ko'rsatma faqat eng boshida ishlaydi",
        "Dastur qayta boshlanadi",
        "Xato chiqadi"
      ],
      "correctAnswer": 1,
      "explanation": "Birinchi bo'lmagan ko'rsatma oddiy matn sifatida o'qiladi."
    },
    {
      "id": 8,
      "question": "Qat'iy rejimda `function yigindi(a, a) { ... }` yozilsa qanday xato bo'ladi?",
      "options": [
        "SyntaxError — kod umuman ishga tushmaydi",
        "ReferenceError",
        "Xato bo'lmaydi, ikkinchi parametr ustun turadi",
        "TypeError"
      ],
      "correctAnswer": 0,
      "explanation": "Takroriy parametr qat'iy rejimda taqiqlangan, shuning uchun sintaksis xatosi bo'ladi."
    },
    {
      "id": 9,
      "question": "Modul (`import`/`export`) va class'lar uchun `\"use strict\";` yozish kerakmi?",
      "options": [
        "Ha, albatta",
        "Yo'q — ular avtomatik qat'iy rejimda ishlaydi",
        "Faqat Node.js da kerak",
        "Faqat brauzerda kerak"
      ],
      "correctAnswer": 1,
      "explanation": "Modul va class'lar o'z-o'zidan qat'iy rejimda bo'ladi."
    },
    {
      "id": 10,
      "question": "Qat'iy rejim kodni sekinlashtiradimi?",
      "options": [
        "Ha, sezilarli sekinlashtiradi",
        "Yo'q — u faqat xatolarni erta ko'rsatadi",
        "Faqat brauzerda sekinlashtiradi",
        "Faqat katta fayllarda sekinlashtiradi"
      ],
      "correctAnswer": 1,
      "explanation": "Qat'iy rejimning maqsadi xavfsizlik: yashirin xatolar darhol ko'rinadi."
    },
    {
      "id": 11,
      "question": "Qat'iy rejimda o'chirib bo'lmaydigan xususiyatni `delete` bilan o'chirishga urinilsa nima bo'ladi?",
      "options": [
        "Jimgina o'tadi",
        "TypeError beradi",
        "ReferenceError beradi",
        "Qiymat null bo'ladi"
      ],
      "correctAnswer": 1,
      "explanation": "Qat'iy rejimda bunday o'chirish jimgina o'tmaydi, TypeError beradi."
    },
    {
      "id": 12,
      "question": "Eski koddagi `\"use strict\";` yoqilganda nima sodir bo'ladi?",
      "options": [
        "Kod avtomatik tuzatiladi",
        "Yashirin xatolar oshkor bo'ladi va ularni tuzatish kerak bo'ladi",
        "Kod o'chib ketadi",
        "Hech narsa o'zgarmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Qat'iy rejim yangi xato yaratmaydi, u mavjud yashirin xatolarni ko'rsatadi."
    }
  ]
};
