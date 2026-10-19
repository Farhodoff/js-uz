export const callbackBasics = {
  id: "callbackBasics",
  title: "Callback Funksiyalar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, usta shogirdiga asbob qutisini beradi. Quti ichida bolg'a bor. Shogird qutini ochib, bolg'ani ishlatadi. Quti — tashuvchi. Bolg'a — ishchi.

Dasturlashda funksiyani ham qiymat sifatida uzatish mumkin. O'zgaruvchiga yoziladi. Boshqa funksiyaga beriladi. U yerda chaqiriladi.

Callback — boshqa funksiyaga argument sifatida berilib, keyin chaqiriladigan funksiyadir.

---

## 2. Nega kerak?

Ikkita ish bor: salom berish va xayrlashish. Ikkalasini ham "ikki marta takrorla" qoidasi bilan bajarish kerak:

\`\`\`javascript
function salom() {
  console.log("Salom!");
}
function xayr() {
  console.log("Xayr!");
}
salom();
salom();
xayr();
xayr();
\`\`\`

Takrorlash mantig'i ikki joyda yozildi.

Muammo shunda: "takrorlash" ishini bir joyga yig'ish kerak. Yechim — funksiyani argument qilish:

\`\`\`javascript
function ikkiMarta(vazifa) {
  vazifa();
  vazifa();
}
ikkiMarta(salom);
ikkiMarta(xayr);
\`\`\`

Bitta takrorlash qoidasi. Har xil ishlar.

---

## 3. Birinchi misol

Bu kod funksiyani o'zgaruvchiga saqlaydi va chaqiradi.

\`\`\`javascript
function salom() { // Asosiy funksiya
  console.log("Salom!"); // Ichidagi ish
}
let ish = salom; // Qavssiz saqlandi
ish(); // Saqlangan nom bilan chaqirildi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function salom() {\` ... — funksiya e'lon qilindi.
- \`let ish = salom;\` — qavs YO'Q. Funksiya ishlamaydi. Uning o'zi saqlanadi. Endi \`ish\` ham o'sha funksiya.
- \`ish();\` — qavs bor. Saqlangan funksiya chaqirildi. Natija chiqdi.

---

## 5. Qadamma-qadam (trace)

Nom qanday uzatiladi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`function salom() {...}\` | E'lon | Saqlandi |
| 2 | \`let ish = salom;\` | Saqlash | ish ham o'sha funksiya |
| 3 | \`ish();\` | Chaqiruv | Salom! chiqdi |

---

## 6. Yana bitta misol

Bu kod funksiyani boshqa funksiyaga beradi.

\`\`\`javascript
function bajar(vazifa) { // Parametr — funksiya
  vazifa(); // Kelgan funksiya chaqirildi
}
function salom() { // Beriladigan funksiya
  console.log("Salom!");
}
bajar(salom); // Nomi bilan berildi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

Qator-baqator tahlil:
- \`bajar(vazifa)\` — parametr oddiy nom. Lekin unga funksiya keladi.
- \`bajar(salom);\` — qavs YO'Q. Funksiya ishlamaydi. Nomi uzatiladi.
- \`vazifa();\` — ichkarida qavs bor. Kelgan funksiya chaqirildi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Berishda qavs qo'yish
❌ Xato kod:
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
function salom() {
  console.log("Salom!");
}
bajar(salom());
\`\`\`
Nima bo'ladi: avval "Salom!" chiqadi. Keyin \`TypeError: vazifa is not a function\` xatoligi yuz beradi. Sababi: \`salom()\` darhol ishlagan. Natijasi (\`undefined\`) uzatilgan. Ichkarida \`undefined()\` chaqirilmoqchi bo'lgan.
✅ To'g'ri variant:
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
function salom() {
  console.log("Salom!");
}
bajar(salom); // Qavssiz beriladi
\`\`\`

### 2. Matn uzatish
❌ Xato kod:
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
bajar("salom");
\`\`\`
Nima bo'ladi: \`TypeError: vazifa is not a function\` xatoligi yuz beradi. Matnni chaqirib bo'lmaydi. Faqat funksiya chaqiriladi.
✅ To'g'ri variant:
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
function salom() {
  console.log("Salom!");
}
bajar(salom);
\`\`\`

### 3. Chaqirmasdan qoldirish
❌ Xato tushuncha:
\`\`\`javascript
function bajar(vazifa) {
  console.log(vazifa);
}
function salom() {
  console.log("Salom!");
}
bajar(salom);
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin funksiya kodi matn bo'lib chiqadi! Sababi: \`vazifa\` chaqirilmagan. Faqat ko'rsatilgan. Chaqirish uchun qavs shart.
✅ To'g'ri variant:
\`\`\`javascript
function bajar(vazifa) {
  vazifa(); // Qavs bilan chaqiriladi
}
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`salom\` funksiyasini e'lon qiling. Uni \`ish\` ga saqlang (qavssiz). \`ish()\` bilan chaqiring.

### 2-mashq (O'rtacha)
\`bajar(vazifa)\` funksiyasini e'lon qiling (ichida \`vazifa();\` bo'lsin). \`salom\` ni e'lon qiling. \`bajar(salom)\` bilan chaqiring.

### 3-mashq (Chegara holat)
Qavs xatosini toping: \`bajar(salom())\` dagi qavsni olib tashlang. Faqat bitta \`"Salom!"\` chiqsin (xatosiz).

### Javoblar:
1.
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
let ish = salom;
ish();
\`\`\`
2.
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
function salom() {
  console.log("Salom!");
}
bajar(salom);
\`\`\`
3.
\`\`\`javascript
function bajar(vazifa) {
  vazifa();
}
function salom() {
  console.log("Salom!");
}
bajar(salom); // Qavssiz
\`\`\`

---

## 9. Xulosa

1. Funksiya nomini qavssiz yozish — uni saqlash va uzatish. Qavs bilan yozish — chaqirish.
2. Callback — boshqa funksiyaga berilib, ichkarida chaqiriladigan funksiya.
3. Berishda qavs bo'lsa, funksiya darhol ishlaydi. Natijasi (\`undefined\`) uzatiladi.

Keyingi darsda: o'zgaruvchini eslab qoladigan closure bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Nomni saqlash",
      instruction: "`salom` funksiyasini e'lon qiling. Uni `ish` ga saqlang (qavssiz). `ish()` bilan chaqiring.",
      startingCode: "function salom() {\n  console.log(\"Salom!\");\n}\n// ish ga saqlang va chaqiring\n",
      hint: "let ish = salom;\nish();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom chiqmadi';"
    },
    {
      id: 2,
      title: "Funksiyaga berish",
      instruction: "`bajar(vazifa)` ni e'lon qiling (ichida `vazifa();` bo'lsin). `salom` ni e'lon qiling. `bajar(salom)` bilan chaqiring.",
      startingCode: "// bajar(vazifa) va salom ni e'lon qiling\n",
      hint: "function bajar(vazifa) {\n  vazifa();\n}\nfunction salom() {\n  console.log(\"Salom!\");\n}\nbajar(salom);",
      test: "if (!code.includes('bajar(salom)')) return 'bajar(salom) deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom chiqmadi';"
    },
    {
      id: 3,
      title: "Qavs xatosini tuzatish",
      instruction: "`bajar(salom())` dagi qavsni olib tashlang. Faqat bitta `\"Salom!\"` chiqsin (xatosiz).",
      startingCode: "function bajar(vazifa) {\n  vazifa();\n}\nfunction salom() {\n  console.log(\"Salom!\");\n}\nbajar(salom());\n",
      hint: "bajar(salom); — qavssiz.",
      test: "if (code.includes('bajar(salom())')) return 'Qavsni olib tashlang: bajar(salom)';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Salom!') return null;\nreturn 'Faqat bitta Salom! chiqishi kerak';"
    },
    {
      id: 4,
      title: "Matn uzatish xatosi",
      instruction: "`bajar(\"salom\")` xato bermoqda. Haqiqiy funksiya uzating (`\"Salom!\"` chiqsin).",
      startingCode: "function bajar(vazifa) {\n  vazifa();\n}\nbajar(\"salom\");\n",
      hint: "function salom() {\n  console.log(\"Salom!\");\n}\nbajar(salom);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom chiqmadi';"
    },
    {
      id: 5,
      title: "Chaqiruv qo'shish",
      instruction: "`vazifa` chaqirilmayapti (faqat ko'rsatilmoqda). `vazifa();` qilib tuzating.",
      startingCode: "function bajar(vazifa) {\n  console.log(vazifa);\n}\nfunction salom() {\n  console.log(\"Salom!\");\n}\nbajar(salom);\n",
      hint: "vazifa();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m === 'Salom!')) return null;\nreturn 'Aynan Salom! chiqishi kerak';"
    },
    {
      id: 6,
      title: "Ikki marta bajarish (chegara)",
      instruction: "`ikki(vazifa)` ni e'lon qiling (ichida ikki marta `vazifa();` bo'lsin). `salom` bilan chaqiring (ikkita chiqsin).",
      startingCode: "// ikki(vazifa) ni e'lon qiling\nfunction salom() {\n  console.log(\"Salom!\");\n}\n// ikki(salom) bilan chaqiring\n",
      hint: "function ikki(vazifa) {\n  vazifa();\n  vazifa();\n}\nikki(salom);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki marta chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Xayr callback (chegara)",
      instruction: "`xayr` funksiyasini e'lon qiling (`\"Xayr!\"` chiqsin). `bajar` orqali chaqiring.",
      startingCode: "function bajar(vazifa) {\n  vazifa();\n}\n// xayr ni e'lon qiling va bajar(xayr) bilan chaqiring\n",
      hint: "function xayr() {\n  console.log(\"Xayr!\");\n}\nbajar(xayr);",
      test: "if (!code.includes('bajar(xayr)')) return 'bajar(xayr) deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Xayr'))) return null;\nreturn 'Xayr chiqmadi';"
    },
    {
      id: 8,
      title: "Saqlangan ikki chaqiruv (chegara)",
      instruction: "`olqish` ni e'lon qiling. `ish` ga saqlang. Ikki marta chaqiring (`\"Zor!\"` ikki marta chiqsin).",
      startingCode: "function olqish() {\n  console.log(\"Zor!\");\n}\n// ish ga saqlang va ikki marta chaqiring\n",
      hint: "let ish = olqish;\nish();\nish();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki marta chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "Qiymatli callback (chegara)",
      instruction: "`yman` funksiyasini e'lon qiling (`\"Olma!\"` chiqsin). `bajar` orqali chaqiring.",
      startingCode: "function bajar(vazifa) {\n  vazifa();\n}\n// yman ni e'lon qiling va bajar(yman) bilan chaqiring\n",
      hint: "function yman() {\n  console.log(\"Olma!\");\n}\nbajar(yman);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Olma'))) return null;\nreturn 'Olma chiqmadi';"
    },
    {
      id: 10,
      title: "Zanjirli uzatish (chegara)",
      instruction: "`salom` ni `a` ga, `a` ni `b` ga saqlang (qavssiz). `b()` bilan chaqiring.",
      startingCode: "function salom() {\n  console.log(\"Salom!\");\n}\n// a ga, keyin b ga saqlang va b() bilan chaqiring\n",
      hint: "let a = salom;\nlet b = a;\nb();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`function salom() { console.log(\"S\"); } let ish = salom; ish();` nima chiqaradi?",
      options: [
        "Hech narsa",
        "S",
        "ish",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "ish ham o'sha funksiya. Chaqiruv ishladi."
    },
    {
      id: 2,
      question: "Qavssiz yozish nimani bildiradi?",
      options: [
        "Chaqirish",
        "Saqlash va uzatish",
        "O'chirish",
        "Hech narsani"
      ],
      correctAnswer: 1,
      explanation: "Qavs bo'lmasa, funksiya ishlamaydi. Uning o'zi uzatiladi."
    },
    {
      id: 3,
      question: "`function bajar(vazifa) { vazifa(); } function salom() { console.log(\"S\"); } bajar(salom());` nima qiladi?",
      options: [
        "Faqat S chiqaradi",
        "S chiqaradi, keyin xato beradi",
        "Hech narsa chiqarmaydi",
        "Ikki marta S chiqaradi"
      ],
      correctAnswer: 1,
      explanation: "salom() darhol ishlaydi. Keyin undefined() chaqirilmoqchi bo'ladi."
    },
    {
      id: 4,
      question: "Callback nima?",
      options: [
        "Orqaga qaytadigan sikl",
        "Boshqa funksiyaga berilib chaqiriladigan funksiya",
        "Xato turi",
        "O'zgaruvchi turi"
      ],
      correctAnswer: 1,
      explanation: "Callback — uzatiladigan va keyin chaqiriladigan funksiya."
    },
    {
      id: 5,
      question: "`function bajar(vazifa) { vazifa(); } bajar(\"salom\");` nima qiladi?",
      options: [
        "salom chiqaradi",
        "TypeError beradi",
        "Hech narsa chiqarmaydi",
        "Bo'sh qator chiqaradi"
      ],
      correctAnswer: 1,
      explanation: "Matnni chaqirib bo'lmaydi. Faqat funksiya chaqiriladi."
    },
    {
      id: 6,
      question: "`function bajar(vazifa) { console.log(vazifa); } function salom() { console.log(\"S\"); } bajar(salom);` nima chiqaradi?",
      options: [
        "S",
        "Funksiya matni",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Chaqiruv bo'lmagan. Funksiya ko'rsatildi, xolos."
    },
    {
      id: 7,
      question: "`function ikki(vazifa) { vazifa(); vazifa(); } function salom() { console.log(\"S\"); } ikki(salom);` nima chiqaradi?",
      options: [
        "S (bir marta)",
        "S, S (ikki marta)",
        "Xatolik",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Kelgan funksiya ikki marta chaqirildi."
    },
    {
      id: 8,
      question: "`let a = salom; let b = a; b();` (salom e'lon qilingan) nima qiladi?",
      options: [
        "Xatolik beradi",
        "salom ichidagi kodni bajaradi",
        "Hech narsa qilmaydi",
        "a ni qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Nom zanjir bo'lib uzatiladi. Oxirgi chaqiruv ishlaydi."
    },
    {
      id: 9,
      question: "`bajar(salom)` da qavs qayerda bo'lishi kerak?",
      options: [
        "Berishda: bajar(salom())",
        "Ichkarida: vazifa()",
        "Hech qayerda",
        "Ikkalasida ham"
      ],
      correctAnswer: 1,
      explanation: "Berishda qavs bo'lmaydi. Chaqiruv ichkarida bo'ladi."
    },
    {
      id: 10,
      question: "`function xayr() { console.log(\"X\"); } function bajar(vazifa) { vazifa(); } bajar(xayr);` nima chiqaradi?",
      options: [
        "X",
        "xayr",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "xayr uzatildi va ichkarida chaqirildi."
    },
    {
      id: 11,
      question: "`let ish = salom;` qatoridan keyin `ish` nima?",
      options: [
        "Matn",
        "Funksiya",
        "Natija",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "ish endi funksiyaning o'zi. Chaqirsa bo'ladi."
    },
    {
      id: 12,
      question: "Nega funksiya uzatiladi?",
      options: [
        "Tezroq ishlashi uchun",
        "Bir qoidani har xil ish bilan ishlatish uchun",
        "Xatolar uchun",
        "Hech qanday sababsiz"
      ],
      correctAnswer: 1,
      explanation: "Bitta qoida (ikki marta takrorlash) har xil ish bilan ishlaydi."
    }
  ]
};
