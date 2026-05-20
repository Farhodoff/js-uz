export const jsGotchas = {
  id: "js-gotchas",
  title: "JS Tuzoqlari: Gotchas & Traps",
  theory: `## 1. KIRISH
JavaScript — juda moslashuvchan, lekin ba'zida "mantiqsiz" tuyuladigan til. Bu darsda biz intervyularda eng ko'p so'raladigan va juniorlarni "chuv tushiradigan" g'alati holatlarni ko'rib chiqamiz.

JavaScript juda moslashuvchan til, lekin ba'zida uning mantiqi sizni hayron qoldirishi mumkin. Bu "g'alatiliklar" (gotchas) ko'pincha intervyularda o'quvchilarni chuv tushirish uchun so'raladi.

## 1. NEGA kerak?
Bu narsalarni bilish kodingizda kutilmagan xatolarni (bugs) oldini olishga yordam beradi. Tajribali dasturchi JSning "minus" tomonlarini ham yaxshi biladi.

## 2. SODDALIK (Analogiya)
Buni **pishiriq retseptiga** o'xshatish mumkin. Retseptda "tuz" deb yozilgan, lekin siz tuz o'rniga shakar solsangiz ham, pechka uni "pishiraveradi", faqat ta'mi g'alati chiqadi. JS ham xatoni yuzingizga solmasdan, "amallab" biror natija chiqarishga harakat qiladi.

## 3. STRUKTURA (Eng mashhur g'alatiliklar)

### A. Matematika muammosi
\`\`\`javascript
console.log(0.1 + 0.2 === 0.3); // false ❌
// Nega? Chunki natija aslida 0.30000000000000004 chiqadi.
\`\`\`

### B. Qo'shish jumboqlari
\`\`\`javascript
[] + []; // "" (bo'sh matn)
[] + {}; // "[object Object]"
{} + []; // 0 (ba'zi joylarda)
\`\`\`

### C. Mantiqiy chalkashliklar
\`\`\`javascript
"5" - 3; // 2 (matnni songa aylantirdi)
"5" + 3; // "53" (sonni matnga aylantirdi)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log(true + true); // 2 (chunki true = 1)
console.log(true + false); // 1
console.log(false - true); // -1
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Solishtirishda e'tiborsizlik:** \`null == 0\` har doim \`false\` beradi, lekin \`null >= 0\` — \`true\` beradi! Buning sababi JSning ichki solishtirish algoritmlari.
2. **NaN tekshiruvi:** \`NaN === NaN\` natijasi \`false\`! NaN ni o'z-o'ziga solishtirib bo'lmaydi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. JS nima uchun "g'alati" til hisoblanadi?**
Chunki JavaScript dastlab juda qisqa vaqt ichida brauzerlar uchun moslashuvchan qilib yaratilgan. U xatolarni ko'rsatib dasturni to'xtatgandan ko'ra, tiplarni avtomatik o'zgartirib (\`type coercion\`) bo'lsa ham biror natija qaytarishga harakat qiladi.


**2. Nima uchun 0.1 + 0.2 aniq 0.3 ga teng emas?**
Chunki JavaScript kasrli sonlarni kompyuter xotirasida ikkilik sanoq tizimida (IEEE 754 standarti) saqlaydi. Ikkilik tizimda ba'zi o'nlik kasrlar (\`0.1\` va \`0.2\` kabi) cheksiz davriy kasr bo'lib qoladi va yaxlitlash natijasida \`0.30000000000000004\` hosil bo'ladi.


**3. typeof NaN natijasi nima?**
Natija \`"number"\` chiqadi. \`NaN\` (Not a Number — Son emas) nomi shunday bo'lsa-da, u JavaScript-da matematik jihatdan noto'g'ri bajarilgan amal natijasini bildiruvchi sonli qiymatdir.


**4. NaN === NaN nima qaytaradi?**
Natija \`false\` qaytaradi. \`NaN\` o'z-o'ziga teng bo'lmagan JavaScript-dagi yagona qiymatdir. Uni tekshirish uchun \`isNaN()\` yoki \`Number.isNaN()\` funksiyalaridan foydalanish shart.


**5. [] + [] natijasi nima bo'ladi?**
Natija bo'sh matn \`""\` (string) bo'ladi. Qo'shish (\`+\`) operatori ishlaganda massivlar avtomatik tarzda string ko'rinishiga keladi va ikkita bo'sh string birlashib yana bo'sh string hosil qiladi.


**6. "10" - "2" natijasi nima?**
Natija \`8\` (son) bo'ladi. Ayirish (\`-\`) operatori faqat raqamlar bilan ishlagani uchun ikkala matn ham avtomatik songa aylantiriladi.


**7. "10" + "2" natijasi nima?**
Natija \`"102"\` (string) bo'ladi. \`+\` operatori matn ishtirok etganda konkatensiya (satrlarni birlashtirish) amalini bajaradi.


**8. true + 5 natijasi nima?**
Natija \`6\` (son) bo'ladi. Matematik amallarda \`true\` avtomatik ravishda \`1\` soniga aylantiriladi.


**9. null == undefined nima qaytaradi?**
Natija \`true\` qaytaradi. Yumshoq tenglik qoidasiga ko'ra, \`null\` va \`undefined\` faqat o'zaro teng deb olingan.


**10. null === undefined nima qaytaradi?**
Natija \`false\` qaytaradi. Chunki ularning ma'lumot turlari turlicha (\`null\` — \`object\` tipida, \`undefined\` — \`undefined\` tipida).


**11. Nima uchun JSda har doim === ishlatish tavsiya etiladi?**
Chunki \`===\` (qat'iy tenglik) avtomatik tur o'zgarishlariga (\`coercion\`) yo'l qo'ymaydi va kutilmagan mantiqiy xatolarning oldini oladi.


**12. Kasrli sonlar bilan ishlaganda JSda qanday muammo bor?**
Yaxlitlash va aniqlik xatosi (precision error) mavjud. Buning oldini olish uchun hisob-kitobdan keyin \`.toFixed(N)\` yoki \`Math.round()\` kabi metodlardan foydalaniladi.
`,
  exercises: [
    {
      id: 1,
      title: "G'alatilikni toping",
      instruction: "Konsolga '5' + 5 va '5' - 5 natijalarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('5' + 5); console.log('5' - 5);",
      test: "if (logs.includes('55') && logs.includes(0)) return null; return 'Natija xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Kasrli sonlarni solishtirish bo'yicha quyidagi kod nima natija beradi?\n```javascript\nconsole.log(0.1 + 0.2 === 0.3);\n```",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "JavaScriptda kasrli sonlar IEEE 754 ikki sanoq tizimi formati bo'yicha saqlanadi. Bu formatda `0.1` va `0.2` cheksiz kasrli ko'rinishda bo'ladi, shuning uchun `0.1 + 0.2` aniq qiymati `0.30000000000000004` ga teng bo'lib, natija `false` bo'ladi."
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
      explanation: "`NaN` (Not a Number) nomi 'son emas' bo'lsa ham, texnik jihatdan u hisoblash natijasida hosil bo'ladigan noaniq son qiymatini anglatadi. Shuning uchun uning turi `\"number\"` hisoblanadi."
    },
    {
      id: 5,
      question: "`null` solishtirish jumboqlari haqidagi ushbu kod natijasini aniqlang:\n```javascript\nconsole.log(null == 0);\nconsole.log(null >= 0);\n```",
      options: ["false va false", "true va true", "false va true", "true va false"],
      correctAnswer: 2,
      explanation: "Oddiy solishtirishda `==` algoritmi `null`ni songa o'girmaydi va u faqat `undefined`ga teng bo'ladi (shuning uchun `null == 0` -> `false`). Ammo solishtirish operatorlari (`>=`, `<=`) ishlaganda `null` son qiymatiga, ya'ni `0` ga aylanadi (shuning uchun `null >= 0` -> `true`)."
    }
  ]
};
