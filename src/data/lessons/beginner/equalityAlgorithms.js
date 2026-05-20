export const equalityAlgorithms = {
  id: "equality-algorithms",
  title: "Tenglik Operatorlari (Equality)",
  theory: `## 1. LOOSE EQUALITY (==) — YUMSHOQ TENGLIK
\`==\` operatori solishtirishdan oldin operandlarning **tiplarini avtomatik o‘zgartiradi** (type coercion). Qiymatlar bir xil bo‘lsa \`true\` qaytaradi.

JavaScriptda ikkita qiymatni solishtirish uchun bir nechta usul bor. Eng ko'p ishlatiladiganlari \`==\` (yumshoq tenglik) va \`===\` (qat'iy tenglik).

## 1. NEGA kerak?
Agar biz foydalanuvchi kiritgan raqamni (\`"10"\`) bizdagi raqam (\`10\`) bilan solishtirmoqchi bo'lsak, JS ularni qanday tushunishini bilishimiz kerak. Noto'g'ri solishtirish dasturda kutilmagan xatolarga sabab bo'ladi.

## 2. SODDALIK (Analogiya)
- **== (Yumshoq):** Bu xuddi **egizaklarga** o'xshaydi. Kiyimi har xil bo'lsa ham (turi har xil), yuzi bir xil bo'lsa "ha, bular bir xil" deydi.
- **=== (Qat'iy):** Bu esa **pasport tekshiruvi** kabi. Ham yuzi, ham kiyimi (turi) aynan bir xil bo'lishi shart.

## 3. STRUKTURA

### A. Yumshoq tenglik (==)
Solishtirishdan oldin turlarni bir xil qilishga harakat qiladi (Coercion):
\`\`\`javascript
5 == "5"; // true (matnni songa aylantirdi)
1 == true; // true (trueni 1 ga aylantirdi)
0 == false; // true
\`\`\`

### B. Qat'iy tenglik (===)
Hech narsani o'zgartirmaydi. Agar turlari har xil bo'lsa — darhol \`false\`:
\`\`\`javascript
5 === "5"; // false (chunki biri son, biri matn)
1 === true; // false
\`\`\`

### C. Object.is() – Eng aniq usul
Ba'zi g'alati holatlar (\`NaN\` kabi) uchun ishlatiladi:
\`\`\`javascript
NaN === NaN; // false (JSdagi g'alati qoida)
Object.is(NaN, NaN); // true (mana bu to'g'ri!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **== ishlatish:** Ko'p hollarda \`==\` kutilmagan natija beradi. Shuning uchun professional dasturchilar har doim \`===\` ishlatishni maslahat berishadi.
2. **NaN bilan solishtirish:** \`if (x === NaN)\` hech qachon ishlamaydi. Buning o'rniga \`isNaN(x)\` ishlatish kerak.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. == va === farqi nimada?**
\`==\` (yumshoq tenglik) solishtirishdan oldin turlarni avtomatik o'zgartiradi (\`coercion\`). \`===\` (qat'iy tenglik) esa turlarni o'zgartirmaydi va qiymat hamda tur bir xil bo'lsagina \`true\` beradi.


**2. Coercion (avtomatik tur o'zgarishi) qaysi tenglikda sodir bo'ladi?**
Faqat yumshoq tenglikda (\`==\`) sodir bo'ladi. Qat'iy tenglikda (\`===\`) esa turlar o'zgarmasdan solishtiriladi.


**3. Nima uchun 5 === "5" false qaytaradi?**
Chunki chap tomondagi \`5\` son (\`number\`) turida, o'ng tomondagi \`"5"\` esa matn (\`string\`) turida bo'lib, ularning turlari mos kelmaydi.


**4. null == undefined natijasi nima?**
Natija \`true\` bo'ladi. Yumshoq tenglik qoidalariga ko'ra, \`null\` va \`undefined\` faqat bir-biri bilan teng deb hisoblanadi.


**5. null === undefined natijasi nima?**
Natija \`false\` bo'ladi, chunki ularning ma'lumot turlari farq qiladi (\`null\` — \`object\`, \`undefined\` — \`undefined\`).


**6. NaN == NaN natijasi nima bo'ladi?**
Natija \`false\` bo'ladi. JavaScript-da \`NaN\` (Not a Number) o'ziga o'zi teng bo'lmagan yagona qiymatdir.


**7. Object.is() nima uchun kerak?**
\`Object.is()\` — qiymatlarni solishtirishning eng aniq va mukammal algoritmidir. U hatto \`NaN === NaN\` (\`false\` qaytaradigan) va \`-0 === +0\` (\`true\` qaytaradigan) kabi o'ziga xos holatlarni ham to'g'ri baholaydi.


**8. 0 == "" (bo'sh matn) natijasi nima?**
Natija \`true\` bo'ladi, chunki \`==\` solishtiruvida ikkala tomon ham son (\`0\`) ko'rinishiga o'giriladi.


**9. 0 === "" natijasi nima?**
Natija \`false\` bo'ladi, chunki ularning turlari har xil (\`number\` va \`string\`).


**10. Nima uchun har doim === ishlatish tavsiya etiladi?**
Chunki u avtomatik tur o'zgarishlaridan kelib chiqadigan kutilmagan mantiqiy xatolarning oldini oladi va kodni yanada tushunarli va ishonchli qiladi.


**11. false == "0" natijasi nima?**
Natija \`true\` bo'ladi. Chunki solishtirish paytida \`false\` ham, \`"0"\` ham avtomatik ravishda \`0\` soniga aylantiriladi.


**12. Massivlarni === bilan solishtirsa bo'ladimi? (Diqqat: Reference!)**
Massivlar murakkab (reference) ma'lumot turi bo'lgani uchun, ularni \`===\` bilan solishtirganda faqatgina xotiradagi manzillari solishtiriladi. Shuning uchun tarkibi bir xil bo'lsaga ham, ikki alohida massiv (masalan, \`[] === []\`) doimo \`false\` beradi.
`,
  exercises: [
    {
      id: 1,
      title: "Tenglikni tekshiring",
      instruction: "100 sonini '100' matni bilan qat'iy tenglik (===) orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 100 === '100';",
      test: "if (res === false) return null; return 'Solishtirish noto\\'g\\'ri!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `NaN === NaN` va `Object.is(NaN, NaN)` amallari qanday qiymatlarni qaytaradi?",
      options: [
        "`true` va `true`",
        "`false` va `true` (chunki NaN o'z-o'ziga teng bo'lmagan yagona qiymatdir, lekin Object.is() algoritmi ularni aniq teng deb biladi)",
        "`true` va `false`",
        "`false` va `false`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript IEEE 754 standarti bo'yicha `NaN` qiymatini o'z-o'ziga teng emas deb hisoblaydi (`NaN === NaN` - false). Ammo ES6 da qo'shilgan `Object.is()` metodi bu g'alati qoidani to'g'irlab, `true` qaytaradi."
    },
    {
      id: 2,
      question: "Quyidagi loose equality (yumshoq tenglik) solishtiruvlaridan qaysi biri `false` qaytaradi?",
      options: [
        "`null == undefined`",
        "`0 == \"\"`",
        "`false == \"0\"`",
        "`null == 0` (null faqat undefined bilan == taqqoslanganda true qaytaradi, boshqa falsy qiymatlar bilan false beradi)"
      ],
      correctAnswer: 3,
      explanation: "`null` va `undefined` o'zaro teng deb olingan. Shuningdek `0`, `\"\"` va `\"0\"` solishtirilganda avtomatik ravishda bir xil turga o'tib `true` beradi. Biroq `null` hech qanday boshqa falsy qiymatga (masalan, `0` yoki `false`) `==` operatori orqali teng bo'la olmaydi."
    },
    {
      id: 3,
      question: "Ikki alohida bo'sh massiv `[] == []` yoki `[] === []` shaklida solishtirilsa, natija nima bo'ladi va nima uchun?",
      options: [
        "`true` (chunki ikkalasi ham bo'sh massivlar)",
        "`false` (chunki massivlar reference (havola) turiga kiradi va xotiradagi har xil manzillarga ishora qiladi, shuning uchun ular hech qachon teng bo'lmaydi)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Reference (havola) tipli ma'lumotlar (massivlar, obyektlar) solishtirilayotganda ularning ichki tarkibi emas, balki xotiradagi manzillari solishtiriladi. Ikki alohida massiv xotirada turlicha joylashgani uchun teng emas."
    },
    {
      id: 4,
      question: "JavaScript-da `Object.is(-0, +0)` ifodasi nima qaytaradi?",
      options: [
        "`true` (chunki 0 ning ishorasi farq qilmaydi)",
        "`false` (chunki Object.is() matematik jihatdan manfiy nol va musbat nolni alohida ajratib tekshiradi)",
        "`NaN`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "Qat'iy tenglik `===` operatori `-0 === +0` ni `true` deb baholasada, `Object.is()` algoritmi ularning ishorasini farqlab, aniq va qat'iy `false` qaytaradi."
    },
    {
      id: 5,
      question: "`isNaN(x)` funksiyasi nima uchun kerak?",
      options: [
        "Qiymat string ekanligini tekshirish uchun",
        "Qiymat haqiqatan ham `NaN` (son emas) ekanligini tekshirish uchun, chunki `x === NaN` solishtiruvi har doim false beradi",
        "Faqat manfiy sonlarni aniqlash uchun",
        "Qiymatni songa o'tkazish uchun"
      ],
      correctAnswer: 1,
      explanation: "Chunki `NaN` o'z-o'ziga teng emasligi sababli, biror o'zgaruvchining qiymati son emasligini (`NaN` ligini) oddiy tenglik orqali tekshirib bo'lmaydi. Buning uchun maxsus `isNaN()` yoki `Number.isNaN()` funksiyasi ishlatiladi."
    }
  ]
};
