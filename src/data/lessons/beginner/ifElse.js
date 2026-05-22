export const ifElseLesson = {
  id: "if-else",
  title: "Shartli Operatorlar: if...else va switch",
  level: "Beginner",
  description: "JavaScript-da shartlar bilan ishlash, tarmoqlanuvchi algoritmlar, if-else, switch va ternary operatorlar.",
  theory: `## 1. NEGA kerak?
Shartlarsiz dastur shunchaki ketma-ket buyruqlar to'plami bo'lib qoladi. Shartlar esa dasturni "aqlli" qiladi, u vaziyatga qarab o'z qarorlarini va bajaradigan kod bloklarini o'zgartiradi. Masalan, foydalanuvchi tizimga kirgan bo'lsa shaxsiy profilni, aks holda login sahifasini ko'rsatish shartlar orqali amalga oshiriladi.

## 2. SODDALIK (Analogiya)
Buni hayotiy svetofor qoidasiga o'xshatish mumkin:
- **Agar (if)** chiroq yashil bo'lsa — yur.
- **Aks holda, agar (else if)** sariq bo'lsa — tayyorlan.
- **Aks holda (else)** — to'xta.

## 3. STRUKTURA

### A. if...else
Eng ko'p ishlatiladigan mantiqiy tarmoqlanish:
\`\`\`javascript
let yosh = 20;
if (yosh >= 18) {
  console.log("Ruxsat berildi ✅");
} else {
  console.log("Ruxsat yo'q ❌");
}
\`\`\`

### B. switch (Tanlov operatori)
Bitta o'zgaruvchini ko'p aniq qiymatlarga solishtirish kerak bo'lsa, ketma-ket \`if else\` yozishdan ko'ra \`switch\` qulayroq. Solishtirish qat'iy tenglik (\`===\`) orqali bajariladi:
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

### C. Ternary operator (Uchlik operator)
Qisqa shartlarni bir qatorda yozish uchun:
\`\`\`javascript
let xabar = (yosh >= 18) ? "Katta" : "Kichik";
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Taqqoslash o'rniga o'zlashtirish:** \`if (x = 5)\` xato! Bu \`x\`ga 5 ni yuklab yuboradi. To'g'ri ko'rinishi: \`if (x === 5)\`.
2. **switch ichida breakni unutish:** \`break\` yozilmasa, dastur shart to'g'ri kelgan \`case\`dan keyingi barcha bloklarni ham bajarib ketadi (fall-through).
3. **Falsy qiymatlarni unutish:** JSda faqatgina 6 ta qiymat shart ichida \`false\` beradi: \`false\`, \`0\`, \`""\` (bo'sh string), \`null\`, \`undefined\`, \`NaN\`. Qolgan barcha qiymatlar (jumladan \`[]\` va \`{}\`) \`true\` beradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Shartli operator nima uchun kerak?**
Dasturga mantiq qo'shish va shartga qarab har xil kodlarni bajarish uchun.

**2. else kalit so'zi nima qiladi?**
\`if\` sharti bajarilmaganda (false bo'lganda) ishlaydigan kod blokini belgilaydi.

**3. else if nimaga kerak?**
Birinchi shart bajarilmaganda, boshqa bir aniq shartni tekshirish uchun.

**4. Ternary operatorining strukturasi qanday?**
\`shart ? rost bo'lganda : yolg'on bo'lganda\` shaklida.

**5. Mantiqiy operatorlarni shartda qanday birlashtirish mumkin?**
\`&&\` (VA), \`||\` (YOKI) va \`!\` (EMAS) operatorlari orqali.

**6. switchda default qismi shartmi?**
Majburiy emas, lekin hech bir \`case\` bajarilmagan holatni ushlash uchun tavsiya etiladi.

**7. Bo'sh massiv [] shart ichida true beradimi yoki false?**
\`true\` beradi, chunki massiv truthy obyekt hisoblanadi.

**8. switch case-larni solishtirishda qanday tenglikdan foydalanadi?**
Qat'iy tenglik (\`===\`) operatoridan foydalanadi.

**9. if ("") ishlaydimi?**
Yo'q, chunki bo'sh matn - falsy qiymatdir.

**10. switchda break ishlatmaslikning qanday foydali tomoni bor?**
Agar bir nechta \`case\` uchun bir xil kod ishga tushishi kerak bo'lsa, \`break\` qo'ymasdan guruhlash mumkin.

**11. Shart ichida yana if yozsa bo'ladimi?**
Ha, buni "Nested if" deyiladi, lekin kod o'qilishini qiyinlashtiradi.

**12. switch va if...else ning asosiy farqi nima?**
\`if\` har qanday mantiqiy diapazonlar bilan ishlaydi, \`switch\` esa faqat aniq qiymatlar bilan ishlay oladi.
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
      hint: "switch(day) { case 1: console.log('Dushanba'); break; case 2: console.log('Seshanba'); break; }",
      test: "if (code.includes('switch') && logs.includes('Dushanba')) return null; return 'Switch-ni to\\'g\\'ri ishlating';"
    },
    {
      id: 3,
      title: "Ternary mashqi",
      instruction: "Ternary operator yordamida 'a' 0 dan katta bo'lsa 'Musbat', bo'lmasa 'Manfiy' deb chiqaring.",
      startingCode: "let a = 10;\n// Bu yerga yozing\n",
      hint: "console.log(a > 0 ? 'Musbat' : 'Manfiy');",
      test: "if (code.includes('?') && logs.includes('Musbat')) return null; return 'Ternary operatorni ishlating';"
    },
    {
      id: 4,
      title: "Juft yoki toq",
      instruction: "num juft bo'lsa 'Juft', aks holda 'Toq' deb chiqaring.",
      startingCode: "const num = 7;\n// Bu yerga yozing\n",
      hint: "if (num % 2 === 0) { console.log('Juft'); } else { console.log('Toq'); }",
      test: "if (logs.includes('Toq')) return null; return 'Son juft yoki toq ekanligini to\\'g\\'ri aniqlang!';"
    },
    {
      id: 5,
      title: "Bahoni aniqlash",
      instruction: "score 90 va undan yuqori bo'lsa 'A', 80 va undan yuqori bo'lsa 'B', aks holda 'C' deb log qiling.",
      startingCode: "const score = 85;\n// Bu yerga yozing\n",
      hint: "if (score >= 90) { console.log('A'); } else if (score >= 80) { console.log('B'); } else { console.log('C'); }",
      test: "if (logs.includes('B') && !logs.includes('C')) return null; return 'Baholash shartlarini tekshiring!';"
    },
    {
      id: 6,
      title: "Ternary yosh cheklovi",
      instruction: "age 18 yoki undan katta bo'lsa yields o'zgaruvchisiga true, aks holda false qiymatini ternary orqali yuklang.",
      startingCode: "const age = 20;\nlet yields = // Bu yerga yozing\n",
      hint: "let yields = age >= 18 ? true : false;",
      test: "if (yields === true && code.includes('?')) return null; return 'Ternary operator yordamida yields ga qiymat yuklang!';"
    },
    {
      id: 7,
      title: "Falsy tekshiruvi",
      instruction: "value o'zgaruvchisi truthy bo'lsa 'Rost', aks holda 'Yolg\\'on' deb chop eting.",
      startingCode: "const value = '';\n// Bu yerga yozing\n",
      hint: "if (value) { console.log('Rost'); } else { console.log('Yolg\\'on'); }",
      test: "if (logs.includes('Yolg\\'on')) return null; return 'Bo\\'sh string falsy qiymat ekanligini hisobga oling';"
    },
    {
      id: 8,
      title: "Switch fasl nomi",
      instruction: "month o'zgaruvchisi 12, 1, 2 bo'lsa 'Qish', 3, 4, 5 bo'lsa 'Bahor' deb chiqaring.",
      startingCode: "const month = 3;\n// Bu yerga yozing\n",
      hint: "switch(month) { case 12: case 1: case 2: console.log('Qish'); break; case 3: case 4: case 5: console.log('Bahor'); break; }",
      test: "if (logs.includes('Bahor') && code.includes('switch')) return null; return 'Switch orqali oylarni faslga ajrating';"
    },
    {
      id: 9,
      title: "Odd Even Ternary",
      instruction: "res o'zgaruvchisiga x juft bo'lsa 'Even', toq bo'lsa 'Odd' matnini ternary orqali yuklang.",
      startingCode: "const x = 12;\nlet res = // Bu yerga yozing\n",
      hint: "let res = x % 2 === 0 ? 'Even' : 'Odd';",
      test: "if (res === 'Even' && code.includes('?')) return null; return 'Ternary orqali Even yoki Odd yozing';"
    },
    {
      id: 10,
      title: "Qiyosiy kattalik",
      instruction: "x va y sonlaridan qaysi biri katta bo'lsa o'shani chiqaring, teng bo'lsa 'Teng' deb log qiling.",
      startingCode: "const x = 8, y = 8;\n// Bu yerga yozing\n",
      hint: "if (x > y) { console.log(x); } else if (y > x) { console.log(y); } else { console.log('Teng'); }",
      test: "if (logs.includes('Teng')) return null; return 'Tenglik holatini ham inobatga oling';"
    },
    {
      id: 11,
      title: "Login tekshiruvi",
      instruction: "username admin bo'lsa va password 12345 bo'lsa 'Xush kelibsiz', aks holda 'Xato' deb chop eting.",
      startingCode: "const username = 'admin', password = 'wrong';\n// Bu yerga yozing\n",
      hint: "if (username === 'admin' && password === '12345') { console.log('Xush kelibsiz'); } else { console.log('Xato'); }",
      test: "if (logs.includes('Xato')) return null; return 'Login parolni tekshirish shartini to\\'g\\'ri yozing';"
    },
    {
      id: 12,
      title: "Switch default holati",
      instruction: "role o'zgaruvchisi 'admin' yoki 'user' bo'lmasa, default ravishda 'Mehmon' deb log qiluvchi switch yozing.",
      startingCode: "const role = 'editor';\n// Bu yerga yozing\n",
      hint: "switch(role) { case 'admin': console.log('Admin'); break; case 'user': console.log('User'); break; default: console.log('Mehmon'); }",
      test: "if (logs.includes('Mehmon') && code.includes('default')) return null; return 'Switch default qismini yozing!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `if (x = 5)` yozilishi qanday natijaga olib keladi?",
      options: [
        "Xatolik yuz beradi",
        "`x` o'zgaruvchisiga `5` qiymatini o'zlashtiradi va `5` truthy bo'lgani uchun shart har doim bajariladi",
        "`x` ning qiymati `5` ga teng yoki teng emasligini solishtiradi",
        "Hech narsa sodir bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Yagona barobar `=` o'zlashtirish operatori hisoblanadi. Shart ichida `x = 5` yozilsa, `x` ga 5 yuklanadi va shart `if (5)` ga aylanadi. 5 soni esa rost (truthy) bo'lgani uchun shart doim to'g'ri deb baholanadi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri ternary (uchlik) operatorining to'g'ri sintaksisi hisoblanadi?",
      options: [
        "`shart ? agar rost : agar yolg'on`",
        "`shart : agar rost ? agar yolg'on`",
        "`if (shart) ? rost : yolg'on`",
        "`shart ? agar rost`"
      ],
      correctAnswer: 0,
      explanation: "Ternary operatori shartdan so'ng so'roq belgisi `?`, rost bo'lgandagi qiymat, keyin ikki nuqta `:` va yolg'on bo'lgandagi qiymat ko'rinishida yoziladi."
    },
    {
      id: 3,
      question: "`switch` operatorida bitta `case` bajarilgandan keyin `break` yozilmasa nima sodir bo'ladi?",
      options: [
        "Dastur xatolik berib to'xtaydi",
        "Keyingi `case`larning shartlari to'g'ri yoki noto'g'ri bo'lishidan qat'iy nazar, to navbatdagi `break` uchramaguncha yoki switch tugamaguncha bajarilib ketaveradi (fall-through)",
        "Switch avtomatik ravishda tugaydi",
        "Faqat default qismi ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`break` kalit so'zi switch operatoridan chiqib ketishni ta'minlaydi. U yozilmasa, kod shart bajarilgan joydan boshlab pastdagi barcha case kodlarini ketma-ket bajarib ketadi."
    },
    {
      id: 4,
      question: "Diapazonlar (masalan: `x > 10` va `x < 20`) bilan ishlashda qaysi shart operatori qulayroq va to'g'ri keladi?",
      options: [
        "`switch-case`",
        "`if...else`",
        "`while`",
        "Bunday shartlarni tekshirib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "`if...else` har xil diapazonlar va mantiqiy operatorlar bilan tekshirish uchun moslashuvchan. `switch` esa aniq va qat'iy qiymatlarni solishtirish uchun ishlatiladi."
    },
    {
      id: 5,
      question: "Quyidagi shart ifodasi bajarilganda nima natija chiqadi: `if (\"salom\") { console.log(\"ishladi\"); } else { console.log(\"ishlamadi\"); }`?",
      options: [
        "Konsolda hech narsa chiqmaydi",
        "`\"ishladi\"` (chunki bo'sh bo'lmagan string truthy qiymat hisoblanadi)",
        "`\"ishlamadi\"`",
        "`TypeError` yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da bo'sh bo'lmagan har qanday satr (string) rost (truthy) deb baholanadi, shuning uchun `if` bloki ishga tushib, konsolga `\"ishladi\"` chiqadi."
    },
    {
      id: 6,
      question: "`switch (true)` sintaksisidan nima uchun foydalaniladi?",
      options: [
        "Xatolik yuz beradi, bunday yozib bo'lmaydi",
        "Switch ichida qiymatlarni emas, balki if-else kabi shartlarni va diapazonlarni tekshirish uchun",
        "Dasturni tezlashtirish uchun",
        "Faqat true qiymatlarini sanash uchun"
      ],
      correctAnswer: 1,
      explanation: "`switch (true)` yozganda biz case qismida aniq qiymatlar emas, balki `case x > 10:` kabi mantiqiy ifodalarni yozib, ularni tekshirishimiz mumkin."
    },
    {
      id: 7,
      question: "Quyidagi qiymatlardan qaysi biri shart operatorida `true` (truthy) deb baholanadi?",
      options: [
        "`NaN`",
        "`[]` (bo'sh massiv)",
        "`\"\"` (bo'sh string)",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da bo'sh massivlar va bo'sh obyektlar o'zgaruvchi sifatida truthy (rost) hisoblanadi. `NaN`, bo'sh string va `undefined` esa falsy hisoblanadi."
    },
    {
      id: 8,
      question: "Ternary operatorlarni zanjir (chain) shaklida ketma-ket yozish qanday nomlanadi?",
      options: [
        "Nested ternary (ichma-ich ternary)",
        "Ternary loop",
        "Double ternary",
        "Ternary strict"
      ],
      correctAnswer: 0,
      explanation: "Bir nechta ternary operatorlarni birlashtirish `condition ? value1 : condition2 ? value2 : value3` nested ternary deyiladi. Lekin kod o'qilishini qiyinlashtiradi."
    },
    {
      id: 9,
      question: "Mantiqiy short-circuit (qisqa tutashuv) `&&` operatori qanday ishlaydi?",
      options: [
        "Doim ikkala tomonni tekshiradi",
        "Agar birinchi qiymat falsy bo'lsa, ikkinchi tomonni tekshirib o'tirmay darhol o'sha falsy qiymatni qaytaradi",
        "Faqat true qiymatni qaytaradi",
        "Xatolarni yashiradi"
      ],
      correctAnswer: 1,
      explanation: "`&&` operatori birinchi qiymat false/falsy bo'lsa, keyingi shartlarni tekshirish ma'nosiz bo'lganligi uchun darhol ishlashni to'xtatadi."
    },
    {
      id: 10,
      question: "switch operatori qiymatlarni solishtirishda qaysi tenglik algoritmidan foydalanadi?",
      options: [
        "Loose equality (`==`)",
        "Strict equality (`===`)",
        "`Object.is()`",
        "Hech qanday, u faqat stringlarni solishtiradi"
      ],
      correctAnswer: 1,
      explanation: "`switch` har bir case qiymatini qat'iy tenglik (`===`) orqali solishtiradi. Ya'ni tur va qiymat mos kelishi shart."
    },
    {
      id: 11,
      question: "Quyidagi kod nimani chop etadi?\n```javascript\nlet x = 10;\nif (x > 5)\n  console.log(\"A\");\n  console.log(\"B\");\n```",
      options: [
        "Faqat A",
        "Faqat B",
        "A va B (chunki figurali qavslar qo'yilmaganligi sababli faqat birinchi log if tarkibiga kiradi, ikkinchi log esa mustaqil ravishda doimo bajariladi)",
        "Hech narsa"
      ],
      correctAnswer: 2,
      explanation: "JavaScriptda block qavslari `{}` bo'lmasa, `if` o'zidan keyingi faqat bitta satrni boshqaradi. Ikkinchi `console.log(\"B\")` shartga bog'liq bo'lmay har doim ishlaydi."
    },
    {
      id: 12,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\nlet x = 0;\nconsole.log(x || 5);\n```",
      options: [
        "0",
        "5 (chunki 0 falsy bo'lgani uchun || operatori ikkinchi qiymatni tanlaydi)",
        "true",
        "false"
      ],
      correctAnswer: 1,
      explanation: "`||` operatori birinchi qiymat falsy bo'lsa, ikkinchi qiymatni qaytaradi. `0` falsy bo'lgani uchun `5` qaytadi."
    }
  ]
};