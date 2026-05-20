export const ifElseLesson = {
  id: "if-else",
  title: "Shartli Operatorlar: if...else va switch",
  theory: `## 1. NEGA kerak?
Shartlarsiz dastur shunchaki ketma-ket buyruqlar to'plami bo'lib qoladi. Shartlar esa dasturni "aqlli" qiladi, u vaziyatga qarab o'z qarorlarini o'zgartiradi.

## 2. SODDALIK (Analogiya)
Buni **svetoforga** o'xshatish mumkin:
- **Agar (if)** chiroq yashil bo'lsa — yur.
- **Aks holda (else)** — to'xta.

## 3. STRUKTURA

### A. if...else
\`\`\`javascript
let yosh = 20;
if (yosh >= 18) {
  console.log("Ruxsat berildi ✅");
} else {
  console.log("Ruxsat yo'q ❌");
}
\`\`\`

### B. switch (Tanlov operatori)
Agar bitta o'zgaruvchini ko'p qiymatlarga solishtirish kerak bo'lsa (\`if else if else if...\` o'rniga), \`switch\` qulayroq:
\`\`\`javascript
let kun = "Dushanba";
switch (kun) {
  case "Dushanba":
    console.log("Ish kuni");
    break;
  case "Yakshanba":
    console.log("Dam olish kuni");
    break;
  default:
    console.log("Oddiy kun");
}
\`\`\`

### C. Ternary operator (Qisqa if)
\`\`\`javascript
let xabar = (yosh >= 18) ? "Katta" : "Kichik";
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Solishtirish o'rniga qiymat berish:** \`if (x = 5)\` xato ❌. Doim \`===\` ishlatiladi: \`if (x === 5)\`.
2. **break ni unutish:** \`switch\` ichida \`break\` yozmasangiz, JS keyingi \`case\`larni ham bajarib ketaveradi.
3. **Truthy/Falsy:** JavaScriptda \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\` doim **false** (falsy) deb hisoblanadi. Qolgan hamma narsa **true** (truthy).

## 6. SAVOLLAR VA JAVOBLAR
**1. Shartli operator nima uchun kerak?**
Dasturga mantiq qo'shish va vaziyatga qarab har xil kodlarni ishga tushirish uchun.


**2. if so'zining ma'nosi nima?**
Inglizchadan "Agar" degan ma'noni anglatadi.


**3. else qachon ishga tushadi?**
\`if\` ichidagi shart noto'g'ri (false) bo'lgan holatda.


**4. else if nima vazifani bajaradi?**
Asosiy \`if\` sharti bajarilmaganda, boshqa bir aniq shartni tekshirish uchun.


**5. Ternary operator qanday tuzilgan?**
\`shart ? rost bo'lsa : yolg'on bo'lsa\`


**6. Bir nechta shartni birlashtirish belgilarini ayting.**
\`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS).


**7. switch operatorida default nima uchun kerak?**
Hech bir \`case\` mos kelmagan holatda ishlaydigan kodni belgilash uchun.


**8. Truthy va Falsy qiymatlar farqi nima?**
Mantiqiy shart ichida o'zini \`true\` yoki \`false\` kabi tutadigan qiymatlar.


**9. if ("") ishlaydimi?**
Yo'q, chunki bo'sh matn - falsy qiymat.


**10. switchda break yozmasak nima bo'ladi?**
Kod keyingi \`case\`lar ichiga ham kirib ketadi (fall-through).


**11. Shart ichida shart (Nested if) yozish mumkinmi?**
Ha, lekin kod o'qilishini qiyinlashtirgani uchun ehtiyot bo'lish kerak.


**12. switch va if...else o'rtasidagi asosiy farq nima?**
\`if\` diapazonlar bilan (x > 10) yaxshi ishlaydi, \`switch\` esa aniq qiymatlar bilan (kun === "Dushanba").
`,
  exercises: [
    {
      id: 1,
      title: "Yoshni tekshirish",
      instruction: "Agar 'age' 18 dan kichik bo'lsa 'Kichik', aks holda 'Katta' deb chiqaring.",
      startingCode: "let age = 15;\n// Bu yerga yozing\n",
      hint: "if (age < 18) { console.log('Kichik'); } else { console.log('Katta'); }",
      test: "if (logs.includes('Kichik')) return null; return 'Xato xabar chiqyapti';"
    },
    {
      id: 2,
      title: "Switch bilan kunlar",
      instruction: "O'zgaruvchi 'day' 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' chiqaring (switch ishlatib).",
      startingCode: "let day = 1;\n// Bu yerga yozing\n",
      hint: "switch(day) { case 1: console.log('Dushanba'); break; ... }",
      test: "if (code.includes('switch') && logs.includes('Dushanba')) return null; return 'Switch-ni to\\'g\\'ri ishlating';"
    },
    {
      id: 3,
      title: "Ternary mashqi",
      instruction: "Ternary operator yordamida 'a' 0 dan katta bo'lsa 'Musbat', bo'lmasa 'Manfiy' deb chiqaring.",
      startingCode: "let a = 10;\n// Bu yerga yozing\n",
      hint: "console.log(a > 0 ? 'Musbat' : 'Manfiy');",
      test: "if (code.includes('?') && logs.includes('Musbat')) return null; return 'Ternary operatorni ishlating';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da \`if (x = 5)\` yozilishi qanday natijaga olib keladi?",
      options: [
        "Xatolik yuz beradi",
        "\`x\` o'zgaruvchisiga \`5\` qiymatini o'zlashtiradi va \`5\` truthy bo'lgani uchun shart har doim bajariladi",
        "\`x\` ning qiymati \`5\` ga teng yoki teng emasligini solishtiradi",
        "Hech narsa sodir bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Yagona barobar \`=\` o'zlashtirish operatori hisoblanadi. Shart ichida \`x = 5\` yozilsa, \`x\` ga 5 yuklanadi va shart \`if (5)\` ga aylanadi. 5 soni esa rost (truthy) bo'lgani uchun shart doim to'g'ri deb baholanadi. Solishtirish uchun \`===\` ishlatish kerak."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri ternary (uchlik) operatorining to'g'ri sintaksisi hisoblanadi?",
      options: [
        "\`shart ? agar rost : agar yolg'on\`",
        "\`shart : agar rost ? agar yolg'on\`",
        "\`if (shart) ? rost : yolg'on\`",
        "\`shart ? agar rost\`"
      ],
      correctAnswer: 0,
      explanation: "Ternary operatori shartdan so'ng so'roq belgisi \`?\`, rost bo'lgandagi qiymat, keyin ikki nuqta \`:\` va yolg'on bo'lgandagi qiymat ko'rinishida yoziladi."
    },
    {
      id: 3,
      question: "\`switch\` operatorida bitta \`case\` bajarilgandan keyin \`break\` yozilmasa nima sodir bo'ladi?",
      options: [
        "Dastur xatolik berib to'xtaydi",
        "Keyingi \`case\`larning shartlari to'g'ri yoki noto'g'ri bo'lishidan qat'iy nazar, to navbatdagi \`break\` uchramaguncha yoki switch tugamaguncha bajarilib ketaveradi (fall-through)",
        "Switch avtomatik ravishda tugaydi",
        "Faqat default qismi ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "\`break\` kalit so'zi switch operatoridan chiqib ketishni ta'minlaydi. U yozilmasa, kod shart bajarilgan joydan boshlab pastdagi barcha case kodlarini ketma-ket bajarib ketadi."
    },
    {
      id: 4,
      question: "Diapazonlar (masalan: \`x > 10\` va \`x < 20\`) bilan ishlashda qaysi shart operatori qulayroq va to'g'ri keladi?",
      options: [
        "\`switch-case\`",
        "\`if...else\`",
        "\`while\`",
        "Bunday shartlarni tekshirib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "\`if...else\` har xil diapazonlar va mantiqiy operatorlar bilan tekshirish uchun moslashuvchan. \`switch\` esa aniq va qat'iy qiymatlarni solishtirish uchun ishlatiladi."
    },
    {
      id: 5,
      question: "Quyidagi shart ifodasi bajarilganda nima natija chiqadi: \`if (\"salom\") { console.log(\"ishladi\"); } else { console.log(\"ishlamadi\"); }\`?",
      options: [
        "Konsolda hech narsa chiqmaydi",
        "\`\"ishladi\"\` (chunki bo'sh bo'lmagan string truthy qiymat hisoblanadi)",
        "\`\"ishlamadi\"\`",
        "\`TypeError\` yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da bo'sh bo'lmagan har qanday satr (string) rost (truthy) deb baholanadi, shuning uchun \`if\` bloki ishga tushib, konsolga \`\"ishladi\"\` chiqadi."
    }
  ]
};