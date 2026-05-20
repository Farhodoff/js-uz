export const typeConversionLesson = {
  id: "type-conversion",
  title: "Type Conversion (Tiplarni o'zgartirish)",
  theory: `## Type Conversion (Tiplarni o‘zgartirish)

JavaScriptda ba'zan bir turdagi ma'lumotni boshqa turga o'tkazish kerak bo'ladi. Masalan, foydalanuvchi saytda yoshini yozsa, u bizga **matn** bo'lib keladi, biz esa uni **son**ga aylantirib hisob-kitob qilishimiz kerak.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`"5"\` (matn) va \`5\` (son) bor. Agar ularni qo'shsangiz:
\`"5" + 5 = "55"\` bo'lib qoladi.
Bizga esa natija \`10\` bo'lishi kerak. Buning uchun biz matnni songa o'tkazib olishimiz shart.

## 2. SODDALIK (Analogiya)
Buni **tarjimonlikka** o'xshatish mumkin. Ingliz tilidagi so'zni o'zbekchaga tarjima qilsangiz, ma'nosi bir xil qoladi, lekin shakli o'zgaradi. Ma'lumotlarni o'zgartirish ham shunday — qiymat o'sha-o'sha, faqat "kiyimi" (turi) o'zgaradi.

## 3. STRUKTURA (Qo'lda o'zgartirish - Explicit)

### A. String'ga o'tkazish (Matn qilish)
\`\`\`javascript
let son = 100;
let matn = String(son); // "100"
// yoki
let matn2 = son.toString(); // "100"
\`\`\`

### B. Number'ga o'tkazish (Son qilish)
\`\`\`javascript
let matn = "25";
let son = Number(matn); // 25
// Qisqa usuli (+)
let son2 = +matn; // 25
\`\`\`

### C. Boolean'ga o'tkazish (Mantiqiy qilish)
\`\`\`javascript
Boolean(1); // true
Boolean(0); // false
Boolean(""); // false (bo'sh matn - yolg'on)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let a = "10";
let b = "20";
console.log(Number(a) + Number(b)); // 30
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **NaN xatosi:** Agar matn ichida harf bo'lsa va uni songa o'tkazmoqchi bo'lsangiz, natija \`NaN\` chiqadi: \`Number("salom")\` — \`NaN\` ❌.
2. **Bo'sh joy:** \`Number("  ")\` natijasi \`0\` bo'ladi. Bu g'alati, lekin JS shunday ishlaydi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. Turni o'zgartirish (Type Conversion) nima?</summary>
Type Conversion (tiplarni o'zgartirish) — bu qiymatni bir ma'lumot turidan boshqasiga o'tkazish jarayonidir (masalan, \`"5"\` ni \`5\` ga yoki aksincha).
</details>

<details>
<summary>2. Nima uchun "5" + 5 natijasi 55 chiqadi?</summary>
Chunki JavaScriptda plus (\`+\`) belgisi ham qo'shish, ham satrlarni birlashtirish (concatenation) amalini bajaradi. Agar operanlardan biri satr bo'lsa, JS sonni satrga aylantirib, ularni yopishtirib qo'yadi.
</details>

<details>
<summary>3. Qo'lda (Explicit) va Avtomatik (Implicit) o'zgartirish farqi nima?</summary>
Qo'lda (Explicit) o'zgartirish dasturchi tomonidan aniq buyruqlar (\`Number()\`, \`String()\`) yordamida bajariladi. Avtomatik (Implicit) o'zgartirish esa JS dvigateli tomonidan fonda avtomatik ravishda bajariladi (masalan, \`"5" * 2\` natijasi \`10\` bo'lishi).
</details>

<details>
<summary>4. Sonni matnga o'tkazishning 2 ta usulini ayting.</summary>
1. \`String(son)\` global funksiyasidan foydalanish.  
2. \`son.toString()\` metodidan foydalanish.
</details>

<details>
<summary>5. Matnni songa o'tkazishning eng qisqa usuli qaysi (+)?</summary>
Unary plus (\`+\`) operatoridan foydalanish. Masalan: \`let son = +"42"\`.
</details>

<details>
<summary>6. parseInt() va Number() farqi nimada?</summary>
\`Number()\` matn to'liq raqamlardan iborat bo'lsagina songa o'giradi (aks holda \`NaN\`). \`parseInt()\` esa matnning boshidagi sonlarni ajratib oladi (\`"12px"\` dan \`12\` ajratadi).
</details>

<details>
<summary>7. Boolean(0) natijasi nima bo'ladi?</summary>
Natija \`false\` bo'ladi.
</details>

<details>
<summary>8. Boolean("0") natijasi nima bo'ladi? (Diqqat!)</summary>
Natija \`true\` bo'ladi. Chunki \`"0"\` bo'sh bo'lmagan matn (string) bo'lib, har qanday bo'sh bo'lmagan matn JSda rost (\`truthy\`) qiymat hisoblanadi.
</details>

<details>
<summary>9. Falsy (yolg'on) qiymatlarni sanab bering.</summary>
JavaScriptda faqatgina 6 ta falsy qiymat bor: \`false\`, \`0\` (va \`-0\`, \`0n\`), \`""\` (bo'sh string), \`null\`, \`undefined\`, va \`NaN\`. Boshqa barcha qiymatlar \`truthy\` hisoblanadi.
</details>

<details>
<summary>10. Number(null) natijasi nima bo'ladi?</summary>
Natija \`0\` bo'ladi.
</details>

<details>
<summary>11. Number(undefined) natijasi nima bo'ladi?</summary>
Natija \`NaN\` bo'ladi.
</details>

<details>
<summary>12. String(true) natijasi nima bo'ladi?</summary>
Natija \`"true"\` (string tipidagi matn) bo'ladi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Son qilish",
      instruction: "'str' o'zgaruvchisini songa o'tkazing va 'num' o'zgaruvchisiga saqlang.",
      startingCode: "let str = '123';\n// Bu yerga yozing\nlet num = ",
      hint: "let num = Number(str); yoki let num = +str;",
      test: "if (typeof num === 'number' && num === 123) return null; return 'Noto\\'g\\'ri o\\'tkazildi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`Boolean(\"0\")` va `Boolean(\"\")` qiymatlarining natijasi nima bo'ladi?",
      options: [
        "`false` va `false`",
        "`true` va `false` (chunki ichida belgi bor string har doim truthy, bo'sh string esa falsy)",
        "`true` va `true`",
        "`TypeError` yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh bo'lmagan har qanday satr, hatto u nol belgisi `\"0\"` yoki bo'sh joy `\" \"` bo'lsa ham truthy (rost) hisoblanadi. Mutlaqo bo'sh satr `\"\"` esa falsy (yolg'on) qiymat beradi."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri matn ko'rinishidagi sonni eng qisqa usulda Number turiga o'zgartiradi?",
      options: [
        "`Number(str)`",
        "`parseInt(str)`",
        "`+str`",
        "`str.toNumber()`"
      ],
      correctAnswer: 2,
      explanation: "Unary plus (`+`) operatori o'zgaruvchidan oldin qo'yilganda, uni juda tez va qisqa usulda songa o'tkazish imkonini beradi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri mantiqiy false (falsy) qiymat hisoblanmaydi?",
      options: [
        "`0`",
        "`null`",
        "`\" \"` (ichida bo'sh joy bo'lgan string)",
        "`undefined`"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da 6 ta falsy qiymat bor: `false`, `0`, `\"\"` (bo'sh string), `null`, `undefined`, va `NaN`. Ichida bo'sh joy bo'lgan string `\" \"` bo'sh hisoblanmaydi va u rost (truthy) qiymat qaytaradi."
    },
    {
      id: 4,
      question: "`Number(null)` va `Number(undefined)` chaqirilganda qanday qiymatlar hosil bo'ladi?",
      options: [
        "`0` va `NaN`",
        "`NaN` va `0`",
        "`0` va `0`",
        "`NaN` va `NaN`"
      ],
      correctAnswer: 0,
      explanation: "`null` obyekti sonli qiymat sifatida `0` ga aylanadi, lekin aniqlanmagan qiymat bo'lgan `undefined` esa songa o'girilganda mantiqan `NaN` (Not a Number) beradi."
    },
    {
      id: 5,
      question: "`String(true)` metodidan qaytadigan natijaning turi va qiymati qanday?",
      options: [
        "Boolean turidagi `true`",
        "String turidagi `\"true\"`",
        "Number turidagi `1`",
        "Undefined"
      ],
      correctAnswer: 1,
      explanation: "`String()` metodi uzatilgan boolean rostlik qiymatini shunchaki harfli matnga aylantiradi, ya'ni natija string turidagi `\"true\"` bo'ladi."
    }
  ]
};
