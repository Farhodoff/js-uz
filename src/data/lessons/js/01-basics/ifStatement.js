export const ifStatement = {
  id: "ifStatement",
  title: "if Shart Operatori",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, ikki yo'lli chorrahadasiz. Belgida yozilgan: "Agar yomg'ir yog'ayotgan bo'lsa — chapga. Aks holda — to'g'ri." Siz avval shartni tekshirasiz. Keyin yo'lni tanlaysiz.

Dasturlashda \`if\` (agar) xuddi shu yo'l belgisi. Oldin qavs ichidagi shart tekshiriladi. Rost bo'lsa — jingalak qavs ichidagi kod ishlaydi.

if — shart rost (true) bo'lganda, belgilangan kod blokini ishga tushiradigan operatordir.

---

## 2. Nega kerak?

O'yinda sovg'a bor. Lekin hamma ham olmaydi. Faqat ball yetganlar oladi.

Muammo shunda: kod ba'zan ishlashi, ba'zan ishlamasligi kerak — shartga qarab. Hamma qator har safar ishlasa, tanlov bo'lmaydi. Yechim — \`if\`:

\`\`\`javascript
let ball = 120;
if (ball > 100) {
  console.log("Sovg'a sizniki!");
}
\`\`\`

Shart rost. Shuning uchun xabar chiqadi. Ball kam bo'lsa — sukunat.

---

## 3. Birinchi misol

Bu kod sovuq bo'lganda kiyim haqida eslatma chiqaradi.

\`\`\`javascript
let isCold = true; // Tashqarida sovuq
if (isCold) { // Savol: sovuqmi?
  console.log("Kurtka kiying!"); // Ha bo'lsa chiqadi
}
\`\`\`

\`\`\`text
// Natija: Kurtka kiying!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isCold = true;\` — holat saqlandi: tashqarida sovuq.
- \`if (isCold) {\` — savol berildi. Qavs ichida shart turadi. Javob \`true\`.
- \`console.log("Kurtka kiying!");\` — javob rost bo'lgani uchun bu qator ishladi.
- \`}\` — blok tugadi. Javob yolg'on bo'lsa, blok ichi o'tkazib yuboriladi.

---

## 5. Qadamma-qadam (trace)

Kompyuter qatorlarni qanday bosib o'tadi:

| Qadam | Kod qatori | Tekshiruv | Natija |
|---|---|---|---|
| 1 | \`let isCold = true;\` | — | \`isCold\` true bo'ldi |
| 2 | \`if (isCold) {\` | \`isCold\` true mi? Ha | Blok ichiga kirildi |
| 3 | \`console.log(...);\` | — | "Kurtka kiying!" chiqdi |

Agar \`isCold\` false bo'lsa, 2-qadamda javob "Yo'q" bo'ladi. 3-qadam tashlab ketiladi. Hech narsa chiqmaydi.

---

## 6. Yana bitta misol

Bu kod taqqoslash natijasini shart sifatida ishlatadi.

\`\`\`javascript
let age = 20; // Yosh
if (age >= 18) { // 18 dan katta yoki tengmi?
  console.log("Kirish mumkin!"); // Ha bo'lsa chiqadi
}
\`\`\`

\`\`\`text
// Natija: Kirish mumkin!
\`\`\`

Qator-baqator tahlil:
- \`age >= 18\` — taqqoslash. Natijasi \`true\`.
- \`if (true) {\` — javob rost. Blok ichi ishladi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let isCold = true;
if isCold {
  console.log("Kurtka kiying!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'isCold'\` xatoligi yuz beradi. Shart har doim yumaloq qavs ichida yoziladi: \`if (isCold)\`.
✅ To'g'ri variant:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka kiying!");
}
\`\`\`

### 2. Shartdan keyin nuqta-vergul
❌ Xato kod:
\`\`\`javascript
let isCold = false;
if (isCold); {
  console.log("Kurtka kiying!");
}
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin xabar baribir chiqadi. Sababi: \`;\` if ni yakunlaydi. Jingalak qavs endi shartga tegishli emas — u har doim ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let isCold = false;
if (isCold) {
  console.log("Kurtka kiying!");
}
\`\`\`

### 3. Nomni xato yozish
❌ Xato kod:
\`\`\`javascript
let iscold = true;
if (isCold) {
  console.log("Kurtka kiying!");
}
\`\`\`
Nima bo'ladi: \`ReferenceError: isCold is not defined\` xatoligi yuz beradi. Katta-kichik harf farq qiladi: \`iscold\` bilan \`isCold\` ikki xil nom.
✅ To'g'ri variant:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka kiying!");
}
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`isSunny\` ga \`true\` bering. \`if\` bilan tekshiring: rost bo'lsa \`"Ko'zoynak taqing!"\` chiqsin.

### 2-mashq (O'rtacha)
\`ball\` ga \`120\` bering. \`ball > 100\` rost bo'lsa \`"Sovg'a sizniki!"\` chiqsin.

### 3-mashq (Chegara holat)
\`isCold\` ga \`false\` bering. \`if\` yozing. Hech narsa chiqmasligini tasdiqlang (bo'sh natija ham to'g'ri javob).

### Javoblar:
1.
\`\`\`javascript
let isSunny = true;
if (isSunny) {
  console.log("Ko'zoynak taqing!");
}
\`\`\`
2.
\`\`\`javascript
let ball = 120;
if (ball > 100) {
  console.log("Sovg'a sizniki!");
}
\`\`\`
3.
\`\`\`javascript
let isCold = false;
if (isCold) {
  console.log("Kurtka kiying!");
}
\`\`\`

---

## 9. Xulosa

1. \`if\` — shart rost bo'lganda blokni ishga tushiradi. Yolg'on bo'lsa, blok tashlab ketiladi.
2. Shart yumaloq qavsda, kod jingalak qavsda yoziladi. Shartdan keyin \`;\` qo'yilmaydi.
3. Shart o'rnida o'zgaruvchi ham, taqqoslash ham bo'lishi mumkin.

Keyingi darsda: shart bajarilmaganda ishlaydigan \`else\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sovuq eslatmasi",
      instruction: "`isCold` ga `true` bering. `if` bilan tekshiring: rost bo'lsa `\"Sovuq!\"` chiqsin.",
      startingCode: "let isCold = true;\n// if bilan tekshirib chiqaring\n",
      hint: "if (isCold) {\n  console.log(\"Sovuq!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Sovuq'))) return null;\nreturn 'Sovuq xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Ball sovg'asi",
      instruction: "`ball` ga `120` bering. `ball > 100` rost bo'lsa `\"Sovg'a!\"` chiqsin.",
      startingCode: "let ball = 120;\n// if bilan tekshirib chiqaring\n",
      hint: "if (ball > 100) {\n  console.log(\"Sovg'a!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Sovg'a\"))) return null;\nreturn 'Sovg\\'a xabari chiqmadi';"
    },
    {
      id: 3,
      title: "Qavs xatosini tuzatish",
      instruction: "`if isCold {` dagi qavs xatosini tuzating (`isCold = true` berilgan). `\"Ha!\"` chiqsin.",
      startingCode: "let isCold = true;\nif isCold {\n  console.log(\"Ha!\");\n}\n",
      hint: "if (isCold) {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ha'))) return null;\nreturn 'Ha xabari chiqmadi';"
    },
    {
      id: 4,
      title: "Nuqta-vergul xatosini tuzatish",
      instruction: "`if (isCold);` dagi ortiqcha `;` ni olib tashlang (`isCold = false` berilgan). Hech narsa chiqmasligi kerak.",
      startingCode: "let isCold = false;\nif (isCold); {\n  console.log(\"Xato!\");\n}\n",
      hint: "if (isCold) { — nuqta-vergulsiz.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak (false da blok ishlamaydi)';"
    },
    {
      id: 5,
      title: "False da sukunat",
      instruction: "`isRain` ga `false` bering. `if` yozing. Hech narsa chiqmasin — bu to'g'ri natija.",
      startingCode: "let isRain = false;\n// if yozing\n",
      hint: "if (isRain) {\n  console.log(\"Soyabon oling!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'False da hech narsa chiqmasligi kerak';"
    },
    {
      id: 6,
      title: "Yosh chegarasi",
      instruction: "`age = 16` berilgan. `age >= 18` rost bo'lsa `\"Kirish mumkin!\"` chiqsin (false bo'lgani uchun sukunat).",
      startingCode: "let age = 16;\n// if bilan tekshiring\n",
      hint: "if (age >= 18) {\n  console.log(\"Kirish mumkin!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn '16 da hech narsa chiqmasligi kerak';"
    },
    {
      id: 7,
      title: "Tenglik sharti",
      instruction: "`x = 5` berilgan. `x === 5` rost bo'lsa `\"Teng!\"` chiqsin.",
      startingCode: "let x = 5;\n// if bilan tekshiring\n",
      hint: "if (x === 5) {\n  console.log(\"Teng!\");\n}",
      test: "if (!code.includes('if')) return 'if operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Teng'))) return null;\nreturn 'Teng xabari chiqmadi';"
    },
    {
      id: 8,
      title: "Nom xatosini tuzatish (chegara)",
      instruction: "`iscold` bilan `isCold` aralashtirilgan. Bir xil nomga keltiring: `\"Ha!\"` chiqsin.",
      startingCode: "let iscold = true;\nif (isCold) {\n  console.log(\"Ha!\");\n}\n",
      hint: "Ikkalasini ham isCold deb yozing.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ha'))) return null;\nreturn 'Ha xabari chiqmadi';"
    },
    {
      id: 9,
      title: "Mantiqiy shart (chegara)",
      instruction: "`a = true`, `b = true` berilgan. `a && b` rost bo'lsa `\"Ikkalasi ham!\"` chiqsin.",
      startingCode: "let a = true;\nlet b = true;\n// if bilan tekshiring\n",
      hint: "if (a && b) {\n  console.log(\"Ikkalasi ham!\");\n}",
      test: "if (!code.includes('if') || !code.includes('&&')) return 'if va && ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ikkalasi'))) return null;\nreturn 'Xabar chiqmadi';"
    },
    {
      id: 10,
      title: "EMAS sharti (chegara)",
      instruction: "`isFull = false` berilgan. `!isFull` rost bo'lsa `\"Joy bor!\"` chiqsin.",
      startingCode: "let isFull = false;\n// if bilan tekshiring\n",
      hint: "if (!isFull) {\n  console.log(\"Joy bor!\");\n}",
      test: "if (!code.includes('if') || !code.includes('!')) return 'if va ! ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Joy'))) return null;\nreturn 'Xabar chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let isCold = true; if (isCold) { console.log(\"Ha!\"); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Ha!",
        "Xatolik",
        "true"
      ],
      correctAnswer: 1,
      explanation: "Shart rost, shuning uchun blok ichi ishlaydi."
    },
    {
      id: 2,
      question: "`let isCold = false; if (isCold) { console.log(\"Ha!\"); }` nima chiqaradi?",
      options: [
        "Ha!",
        "Hech narsa",
        "Xatolik",
        "false"
      ],
      correctAnswer: 1,
      explanation: "Shart yolg'on, blok tashlab ketiladi."
    },
    {
      id: 3,
      question: "`if isCold { console.log(\"Ha!\"); }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Hech narsa chiqmaydi",
        "true chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Shart qavs ichida bo'lishi shart: if (isCold)."
    },
    {
      id: 4,
      question: "`let isCold = false; if (isCold); { console.log(\"Ha!\"); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Ha! (xatolik sababli)",
        "Xatolik beradi",
        "false"
      ],
      correctAnswer: 1,
      explanation: "; if ni yakunlaydi. Qavs endi shartsiz ishlaydi."
    },
    {
      id: 5,
      question: "`let ball = 120; if (ball > 100) { console.log(\"Zo'r!\"); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Zo'r!",
        "120",
        "true"
      ],
      correctAnswer: 1,
      explanation: "120 > 100 true, blok ishlaydi."
    },
    {
      id: 6,
      question: "`let age = 16; if (age >= 18) { console.log(\"Kira!\"); }` nima chiqaradi?",
      options: [
        "Kira!",
        "Hech narsa",
        "16",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "16 >= 18 false, blok tashlab ketiladi."
    },
    {
      id: 7,
      question: "Shart qayerda yoziladi?",
      options: [
        "Jingalak qavs ichida",
        "Yumaloq qavs ichida",
        "Nuqta-verguldan keyin",
        "Qayerda bo'lsa ham"
      ],
      correctAnswer: 1,
      explanation: "Shart har doim if dan keyingi yumaloq qavsda."
    },
    {
      id: 8,
      question: "`let x = 5; if (x === 5) { console.log(\"Teng!\"); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Teng!",
        "5",
        "true"
      ],
      correctAnswer: 1,
      explanation: "x === 5 true, blok ishlaydi."
    },
    {
      id: 9,
      question: "`let iscold = true; if (isCold) { console.log(\"Ha!\"); }` nima qiladi?",
      options: [
        "Ha! chiqaradi",
        "ReferenceError beradi",
        "Hech narsa chiqarmaydi",
        "true chiqaradi"
      ],
      correctAnswer: 1,
      explanation: "iscold bilan isCold ikki xil nom. Ikkinchisi e'lon qilinmagan."
    },
    {
      id: 10,
      question: "`let a = true; let b = false; if (a && b) { console.log(\"Ha!\"); }` nima chiqaradi?",
      options: [
        "Ha!",
        "Hech narsa",
        "true",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "true && false = false, blok ishlamaydi."
    },
    {
      id: 11,
      question: "`let isFull = false; if (!isFull) { console.log(\"Joy!\"); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Joy!",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "!false = true, blok ishlaydi."
    },
    {
      id: 12,
      question: "if bloki qachon tashlab ketiladi?",
      options: [
        "Shart rost bo'lganda",
        "Shart yolg'on bo'lganda",
        "Har doim",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "Yolg'on shartda blok ichi bajarilmaydi."
    }
  ]
};
