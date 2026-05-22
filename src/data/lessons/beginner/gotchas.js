export const jsGotchas = {
  id: "js-gotchas",
  title: "JS Tuzoqlari: Gotchas & Traps",
  level: "Beginner",
  description: "JavaScript-ning eng mashhur kutilmagan va 'mantiqsiz' tuyuladigan xususiyatlari, intervyu tuzoqlari.",
  theory: `## 1. NEGA kerak?
JavaScript juda tez fursatda va moslashuvchan qilib yaratilgani bois, unda ba'zi mantiqsiz tuyuladigan xatti-harakatlar mavjud. Loyihada kutilmagan xatoliklarga (bugs) duch kelmaslik va intervyularda qiynalmaslik uchun ushbu "tuzoqlar" (gotchas)ni yaxshi bilishimiz kerak.

## 2. SODDALIK (Analogiya)
Buni oshxonadagi pishiriq retseptiga o'xshatish mumkin. Agar retseptda "tuz" deb yozilgan bo'lsa-yu, lekin siz shakar solib yuborsangiz ham pechka pishirishdan to'xtamaydi. Faqat pishiriq ta'mi kutilgandek chiqmaydi. JavaScript ham xatolik berib dasturni to'xtatgandan ko'ra, tiplarni avtomatik o'zgartirib (\`type coercion\`) bo'lsa-da biror natija chiqarishga intiladi.

## 3. STRUKTURA (Mashhur tuzoqlar)

### A. Kasrli sonlar muammosi (Floating Point Precision)
Kasrli sonlar xotirada 2 lik sanoq tizimida cheksiz davriy ko'rinishda saqlangani bois yaxlitlash xatosi kelib chiqadi:
\`\`\`javascript
0.1 + 0.2 === 0.3; // false ❌ (chunki u aslida 0.30000000000000004 ga teng)
\`\`\`

### B. O'zaro hisoblash g'alatiliklari
\`\`\`javascript
[] + []; // "" (bo'sh matn)
[] + {}; // "[object Object]"
"5" - 3; // 2 (matn songa aylandi)
"5" + 3; // "53" (son matnga birlashdi)
\`\`\`

### C. null va NaN tuzoqlari
\`\`\`javascript
null == 0; // false
null >= 0; // true (taqqoslashda null 0 ga aylanadi)
NaN === NaN; // false (NaN hech qachon o'ziga teng bo'lolmaydi)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Kasrli sonlarni to'g'ridan-to'g'ri solishtirish:** Kasrli sonlarni solishtirishdan oldin ularni yaxlitlash lozim: \`(0.1 + 0.2).toFixed(1) === '0.3'\`.
2. **typeof massiv:** Massiv turi \`typeof\` bilan tekshirilganda \`"object"\` qaytadi. Massivni tekshirish uchun \`Array.isArray()\` metodidan foydalaning.

## 6. SAVOLLAR VA JAVOBLAR
**1. JS nima uchun kutilmagan natijalar beradi?**
Tizim dasturni xato bilan to'xtatish o'rniga tur o'zgarishi yordamida natija chiqarishga harakat qiladi.

**2. Nima uchun 0.1 + 0.2 aniq 0.3 ga teng emas?**
IEEE 754 kasrli sonlar standarti sababli ikkilik tizimdagi yaxlitlash tufayli.

**3. typeof NaN natijasi nima?**
\`"number"\` (texnik jihatdan u son turi hisoblanadi).

**4. NaN === NaN nima qaytaradi?**
\`false\`. Uni tekshirish uchun \`Number.isNaN()\` qo'llaniladi.

**5. [] + [] natijasi nima bo'ladi?**
Bo'sh matn \`""\` (string).

**6. "10" - "2" natijasi nima?**
\`8\` soni (ayirish operatori sonlar bilan ishlaydi).

**7. "10" + "2" natijasi nima?**
\`"102"\` matni (qo'shish amali satrlarni birlashtiradi).

**8. true + 5 natijasi nima?**
\`6\` soni (true qiymati 1 ga aylanadi).

**9. null == undefined nima qaytaradi?**
\`true\` qaytaradi.

**10. null === undefined nima qaytaradi?**
\`false\` (ma'lumot turlari har xil).

**11. Nima uchun JSda har doim === tavsiya qilinadi?**
Avtomatik yashirin tur o'zgarishlaridan qochish uchun.

**12. Massiv ekanligini qanday to'g'ri tekshirish mumkin?**
\`Array.isArray(arr)\` metodi orqali.
`,
  exercises: [
    {
      id: 1,
      title: "G'alatilikni toping",
      instruction: "Konsolga '5' + 5 va '5' - 5 natijalarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('5' + 5); console.log('5' - 5);",
      test: "if (logs.includes('55') && logs.includes(0)) return null; return 'Natija xato!';"
    },
    {
      id: 2,
      title: "Precision error",
      instruction: "res o'zgaruvchisiga 0.1 + 0.2 amalini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 0.1 + 0.2;",
      test: "if (res > 0.3 && res < 0.3000000000000001) return null; return 'Kasr qo\\'shish natijasini bering';"
    },
    {
      id: 3,
      title: "Boolean Addition",
      instruction: "res o'zgaruvchisiga true + true yig'indisini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = true + true;",
      test: "if (res === 2) return null; return 'true + true natijasi 2 bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Array Concatenation",
      instruction: "res o'zgaruvchisiga [] + [] ifodasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = [] + [];",
      test: "if (res === '') return null; return '[] + [] bo\\'sh string qaytarishi kerak!';"
    },
    {
      id: 5,
      title: "Object addition gotcha",
      instruction: "res o'zgaruvchisiga [] + {} ifodasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = [] + {};",
      test: "if (res === '[object Object]') return null; return '[] + {} ning natijasi [object Object] bo\\'lishi kerak';"
    },
    {
      id: 6,
      title: "Null compare gotchas",
      instruction: "res1 o'zgaruvchisiga null == 0, res2 ga esa null >= 0 natijalarini bering.",
      startingCode: "// Bu yerga yozing\nlet res1 = \nlet res2 = ",
      hint: "let res1 = null == 0; let res2 = null >= 0;",
      test: "if (res1 === false && res2 === true) return null; return 'null solishtirish qoidalari xato!';"
    },
    {
      id: 7,
      title: "Strict NaN check",
      instruction: "res o'zgaruvchisiga NaN === NaN ifodasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = NaN === NaN;",
      test: "if (res === false) return null; return 'NaN === NaN har doim false bo\\'lishi kerak';"
    },
    {
      id: 8,
      title: "String subtraction",
      instruction: "res o'zgaruvchisiga '10' - '2' ifodasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '10' - '2';",
      test: "if (res === 8) return null; return 'Ayirish amali sonlar bilan bajarilishi kerak';"
    },
    {
      id: 9,
      title: "String addition",
      instruction: "res o'zgaruvchisiga '10' + '2' ifodasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = '10' + '2';",
      test: "if (res === '102') return null; return 'Qo\\'shish amali satrlarni birlashtirishi kerak';"
    },
    {
      id: 10,
      title: "Undefined math",
      instruction: "res o'zgaruvchisiga undefined + 5 amalini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = undefined + 5;",
      test: "if (Number.isNaN(res)) return null; return 'undefined son bilan qo\\'shilsa NaN qaytadi';"
    },
    {
      id: 11,
      title: "Null math",
      instruction: "res o'zgaruvchisiga null + 5 amalini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = null + 5;",
      test: "if (res === 5) return null; return 'null son bilan qo\\'shilsa 0 deb hisoblanib 5 chiqadi';"
    },
    {
      id: 12,
      title: "Typeof Array gotcha",
      instruction: "res o'zgaruvchisiga typeof [] natijasini yuklang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof [];",
      test: "if (res === 'object') return null; return 'typeof [] har doim object qaytaradi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Kasrli sonlarni solishtirish bo'yicha quyidagi kod nima natija beradi?\n```javascript\nconsole.log(0.1 + 0.2 === 0.3);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "JavaScriptda kasrli sonlar IEEE 754 standarti bo'yicha saqlanadi. Ikkilik tizimdagi yaxlitlashlar tufayli 0.1 + 0.2 natijasi 0.30000000000000004 ga teng bo'lib, natija `false` bo'ladi."
    },
    {
      id: 2,
      question: "Quyidagi kod natijasini toping:\n```javascript\nconsole.log([] + []);\n```",
      options: ["[]", "bo'sh massiv", "\"\" (bo'sh string)", "undefined"],
      correctAnswer: 2,
      explanation: "Massivlar o'rtasida `+` operatori ishlatilganda, JavaScript ularni matnga (string) aylantiradi. Bo'sh massiv `[]` matnga aylanganda bo'sh string `\"\"` bo'ladi, shuning uchun `\"\" + \"\"` natijasi ham bo'sh string `\"\"` bo'ladi."
    },
    {
      id: 3,
      question: "Massiv va Obyektni qo'shish natijasi nima bo'ladi?\n```javascript\nconsole.log([] + {});\n```",
      options: ["\"[object Object]\"", "{}", "NaN", "TypeError"],
      correctAnswer: 0,
      explanation: "`+` operatori massiv `[]` ni bo'sh string `\"\"` ga, obyekt `{}` ni esa `\"[object Object]\"` ga aylantiradi. Ularning yig'indisi esa `\"[object Object]\"` matnini hosil qiladi."
    },
    {
      id: 4,
      question: "`typeof NaN` natijasi nima chiqadi?\n```javascript\nconsole.log(typeof NaN);\n```",
      options: ["\"nan\"", "\"undefined\"", "\"number\"", "\"null\""],
      correctAnswer: 2,
      explanation: "`NaN` (Not a Number) nomi 'son emas' bo'lsa ham, texnik jihatdan uning turi `\"number\"` hisoblanadi."
    },
    {
      id: 5,
      question: "`null` solishtirish jumboqlari haqidagi ushbu kod natijasini aniqlang:\n```javascript\nconsole.log(null == 0);\nconsole.log(null >= 0);\n```",
      options: ["false va false", "true va true", "false va true", "true va false"],
      correctAnswer: 2,
      explanation: "Yumshoq tenglikda (`==`) `null` songa o'girmaydi (shuning uchun `null == 0` -> `false`). Ammo solishtirish operatorlari (`>=`) ishga tushganda `null` son qiymati `0` ga aylanadi (shuning uchun `null >= 0` -> `true`)."
    },
    {
      id: 6,
      question: "`typeof null` JavaScriptda qanday natija beradi?",
      options: [
        "\"null\"",
        "\"undefined\"",
        "\"object\"",
        "\"number\""
      ],
      correctAnswer: 2,
      explanation: "`typeof null` har doim `\"object\"` qaytaradi. Bu tilning ilk yillaridan qolgan tarixiy xatodir."
    },
    {
      id: 7,
      question: "Quyidagi ifodaning natijasini toping:\n```javascript\ntrue + false\n```",
      options: [
        "1",
        "0",
        "NaN",
        "\"truefalse\""
      ],
      correctAnswer: 0,
      explanation: "`+` operatori bilan matematik amalda `true` qiymati `1` ga, `false` esa `0` ga aylanadi. Natijada `1 + 0 = 1` bo'ladi."
    },
    {
      id: 8,
      question: "JavaScriptda `Number.MIN_VALUE` noldan kattami yoki kichik?",
      options: [
        "Kichik (chunki u eng kichik manfiy son)",
        "Katta (chunki u noldan katta bo'lgan eng kichik musbat kasrli sondir, taxminan 5e-324)",
        "Nolga teng",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "`Number.MIN_VALUE` — JavaScriptda ifodalash mumkin bo'lgan eng kichik musbat sondir (0 ga juda yaqin, lekin 0 dan katta). Manfiy eng kichik son esa `-Number.MAX_VALUE` hisoblanadi."
    },
    {
      id: 9,
      question: "Massivning `sort()` metodi default holatda sonlarni qanday tartiblaydi?\n```javascript\n[1, 10, 2].sort()\n```",
      options: [
        "`[1, 2, 10]` son o'sishi bo'yicha",
        "`[1, 10, 2]` alifbo bo'yicha (chunki sonlar string ko'rinishida taqqoslanadi)",
        "`[10, 2, 1]`",
        "`TypeError` xatosi beradi"
      ],
      correctAnswer: 1,
      explanation: "`Array.prototype.sort()` parametri bo'lmaganda massiv elementlarini satr (string) sifatida taqqoslaydi. Shuning uchun `'10'` satri `'2'` dan oldin keladi va natija `[1, 10, 2]` bo'ladi."
    },
    {
      id: 10,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nparseInt(0.0000005)\n```",
      options: [
        "0",
        "5 (chunki son 5e-7 ko'rinishiga keladi va parseInt uni '5' dan boshlab o'qiydi)",
        "NaN",
        "0.0000005"
      ],
      correctAnswer: 1,
      explanation: "`0.0000005` soni stringga aylanganda `'5e-7'` ko'rinishiga keladi. `parseInt('5e-7')` esa birinchi uchragan raqam `'5'`ni songa o'girib beradi. Bu katta tuzoqlardan biridir!"
    },
    {
      id: 11,
      question: "Quyidagi ifoda nima qaytaradi?\n```javascript\n!!\"false\"\n```",
      options: [
        "false (chunki false yozilgan)",
        "true (chunki u bo'sh bo'lmagan satr bo'lib, truthy qiymat hisoblanadi)",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh bo'lmagan har qanday string (ichida nima yozilganidan qat'i nazar, masalan `'false'` ham) truthy hisoblanadi, shuning uchun uni bulian qiymatiga o'girsak (`!!`) `true` qaytaradi."
    },
    {
      id: 12,
      question: "Quyidagi ifodaning natijasini aniqlang:\n```javascript\n\"5\" + + \"5\"\n```",
      options: [
        "\"55\"",
        "10",
        "\"5 5\"",
        "\"55\" (chunki ikkinchi + ishorasi unar plyus bo'lib stringni songa aylantiradi, lekin birinchisi matnlarni birlashtiradi)"
      ],
      correctAnswer: 3,
      explanation: "`+ \"5\"` ikkinchi qismni `5` soniga aylantiradi. Keyin esa `\"5\" + 5` bo'lib, u ham matn birlashuvi tufayli `\"55\"` ga aylanadi."
    }
  ]
};
