export const implicitCasting = {
  id: "implicit-casting",
  title: "Implicit Type Casting (Avtomatik o'zgarishlar)",
  theory: `## 1. KIRISH
**Implicit Type Casting** (yoki **Coercion**) – JavaScriptning o‘zining operatorlar va kontekstga qarab, qiymatlarni bir turdan boshqasiga **avtomatik** o‘zgartirishi. Bu dasturchi aralashuvisiz sodir bo‘ladi.

**Implicit Coercion** (Avtomatik o'zgartirish) — bu JavaScriptning operatorlar (masalan, \`+\`, \`-\`) ishlatilganda ma'lumot turlarini o'zi xohlagandek o'zgartirib yuborishidir.

## 1. NEGA kerak?
Aslida bu tilning "qulayligi" uchun qilingan, lekin ko'pincha dasturchilar boshini og'ritadi. JS harakat qiladi-ki, qanday bo'lmasin amallarni bajarishga (xato bermasdan).

## 2. SODDALIK (Analogiya)
Buni **moslashuvchan sim (adapter)** deb tasavvur qiling. Sizda uch burchakli rozetka bor, lekin sim ikki burchakli. JS o'zi simni biroz bukab, "amallab" rozetkaga tiqib yuboradi.

## 3. STRUKTURA (Asosiy qoidalar)

### A. Qo'shish operatori (+) – Matnga moyil
Agar amalda bitta bo'lsa ham **matn (string)** qatnashsa, JS hammasini matnga aylantiradi:
\`\`\`javascript
"5" + 2; // "52"
1 + 1 + "2"; // "22" (oldin 1+1=2 bo'ladi, keyin "22" bo'ladi)
\`\`\`

### B. Boshqa arifmetik amallar (-, *, /) – Songa moyil
Bu operatorlar faqat sonlar bilan ishlaydi, shuning uchun JS matnlarni ham songa aylantiradi:
\`\`\`javascript
"10" - 5; // 5
"5" * "2"; // 10
\`\`\`

### C. Mantiqiy qiymatlar (Boolean)
\`true\` son sifatida \`1\` ga, \`false\` esa \`0\` ga teng bo'ladi:
\`\`\`javascript
true + 1; // 2
false * 10; // 0
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log("20" / 2); // 10
console.log("5" + "5" - 5); // 50 (Chunki "5" + "5" = "55", keyin 55 - 5 = 50)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **== va === farqi:** \`==\` (double equals) avtomatik turni o'zgartiradi (\`5 == "5"\` is true). \`===\` esa o'zgartirmaydi (\`5 === "5"\` is false). Doim \`===\` ishlating!
2. **Bo'sh massivlar:** \`[] + []\` natijasi bo'sh matn \`""\` bo'ladi. Bu ko'pchilikni hayron qoldiradi.

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Coercion (Avtomatik o'zgartirish) nima?**
Coercion (yoki Implicit Type Casting) — JavaScript dvigateli tomonidan, kontekst va operatorlarga qarab, ma'lumot turlarining avtomatik ravishda biridan boshqasiga o'tkazilishidir (dasturchi aralashuvisiz).


**2. Nima uchun "10" + 2 natijasi "102" chiqadi?**
Chunki plus (\`+\`) operatori ishtirok etganda va operanlardan biri matn (string) bo'lganda, JS ustuvorlikni matnga beradi va sonni matnga aylantirib, ularni birlashtiradi.


**3. Nima uchun "10" - 2 natijasi 8 chiqadi?**
Chunki minus (\`-\`) operatori faqat matematik sonlar bilan ishlaydi. JS avtomatik tarzda \`"10"\` matnini songa (\`10\`) aylantiradi va ayirish amalini bajaradi.


**4. true + true natijasi nima bo'ladi?**
Natija \`2\` bo'ladi. Matematik amallarda \`true\` qiymati \`1\` ga aylantirilagi (\`1 + 1 = 2\`).


**5. [] == 0 natijasi nima bo'ladi?**
Natija \`true\` bo'ladi. Bo'sh massiv \`[]\` solishtirilganda avtomatik ravishda bo'sh matn \`""\` ga, keyin esa \`0\` soniga aylantiriladi.


**6. !!"" (ikki marta inkor) nima qaytaradi?**
Natija \`false\` bo'ladi. Bo'sh matn \`""\` falsy qiymat hisoblanadi. Uni bir marta inkor qilsak \`true\`, yana bir marta inkor qilsak esa yana \`false\` bo'ladi.


**7. "5" * "5" natijasi nima?**
Natija \`25\` soni bo'ladi. Ko'paytirish operatori (\`*\`) matnlarni avtomatik ravishda sonlarga aylantiradi.


**8. Nima uchun JSda === ishlatish tavsiya etiladi?**
Chunki qat'iy tenglik (\`===\`) qiymatlarni ham, ularning tiplarini ham avtomatik o'zgartirmasdan (\`coercion\`-larsiz) solishtiradi, bu esa kutilmagan mantiqiy xatolarning oldini oladi.


**9. null + 5 natijasi nima bo'ladi?**
Natija \`5\` bo'ladi. Matematik amallarda \`null\` avtomatik ravishda \`0\` soniga o'giriladi.


**10. undefined + 5 natijasi nima bo'ladi? (Diqqat: NaN)**
Natija \`NaN\` (Not a Number) bo'ladi. Chunki \`undefined\` songa aylantirilganda \`NaN\` beradi va har qanday songa \`NaN\` qo'shilganda natija baribir \`NaN\` bo'lib qolaveradi.


**11. 1 < 2 < 3 natijasi nima?**
Natija \`true\` bo'ladi. Chapdan o'ngga bajarilganda \`1 < 2\` ifodasi \`true\` beradi. Keyin \`true < 3\` taqqoslanadi va \`true\` son sifatida \`1\` ga aylanib, \`1 < 3\` bajariladi (natija \`true\`).


**12. 3 > 2 > 1 natijasi nima? (Mantiqan o'ylab ko'ring)**
Natija \`false\` bo'ladi. Chapdan o'ngga bajarilganda \`3 > 2\` ifodasi \`true\` (1) beradi. Keyin \`true > 1\` ya'ni \`1 > 1\` taqqoslanadi va natija \`false\` chiqadi.
`,
  exercises: [
    {
      id: 1,
      title: "Coercion sinovi",
      instruction: "Konsolga '5' + 5 va '5' - 5 natijalarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('5' + 5); console.log('5' - 5);",
      test: "if (logs.includes('55') && logs.includes(0)) return null; return 'Natija noto\\'g\\'ri!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `true + true` va `undefined + 5` amallari qanday natijalarni qaytaradi?",
      options: [
        "`\"truetrue\"` va `\"undefined5\"`",
        "`2` va `NaN` (chunki true son sifatida 1 ga aylanadi, undefined esa songa o'girilganda NaN bo'lib, unga har qanday sonni qo'shish NaN qaytaradi)",
        "`2` va `5`",
        "`TypeError` xatoligi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "`true` mantiqiy qiymati arifmetik amallarda `1` soniga aylanadi, shu sababli `true + true` natijasi `2` dir. `undefined` esa songa o'girilganda `NaN` bo'ladi, `NaN` ga esa har qanday son qo'shilsa natija `NaN` bo'lib qoladi."
    },
    {
      id: 2,
      question: "Quyidagi kod solishtiruvi qanday natija qaytaradi va mantiqan uning sababi nima: `3 > 2 > 1`?",
      options: [
        "`true` (chunki matematika bo'yicha 3 katta 2 dan va 2 katta 1 dan)",
        "`false` (chunki chapdan o'ngga bajarilganda `3 > 2` `true` qaytaradi, so'ng `true > 1` taqqoslanadi va true son sifatida 1 ga aylanib `1 > 1` natijasi false bo'ladi)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Taqqoslash chapdan o'ngga bajariladi: `3 > 2` natijasi `true` bo'ladi. Keyin `true > 1` taqqoslanadi. `true` avtomatik tarzda `1` soniga o'girilib, `1 > 1` sharti tekshiriladi va javob `false` chiqadi."
    },
    {
      id: 3,
      question: "Quyidagi amal bajarilganda konsolga nima chiqadi: `console.log(\"5\" + \"5\" - 5)`?",
      options: [
        "`\"555\"`",
        "`50` (chunki dastlab `\"5\" + \"5\"` matnlari birlashib `\"55\"` stringini hosil qiladi, so'ngra `-` operatori kelganligi sababli u songa aylanib `55 - 5 = 50` bo'ladi)",
        "`5`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "Birinchi navbatda `+` operatori satrlar bilan ishlagani uchun ularni birlashtiradi (`\"55\"`). Keyingi `-` operatori esa faqat sonlar bilan ishlagani bois, satrni avtomatik songa aylantiradi va `55 - 5 = 50` natijasi chiqadi."
    },
    {
      id: 4,
      question: "`null + 5` ifodasi bajarilganda qanday natija hosil bo'ladi va nima sababdan?",
      options: [
        "`5` (chunki implicit coercion paytida `null` avtomatik tarzda `0` soniga aylanadi va `0 + 5 = 5` bo'ladi)",
        "`\"null5\"` (chunki null matn sifatida o'zlashtiriladi)",
        "`NaN` (chunki null son emas)",
        "`TypeError`"
      ],
      correctAnswer: 0,
      explanation: "`null` obyekti arifmetik amallarda va songa avtomatik o'tkazilganda (implicit coercion) har doim `0` soniga tenglashtiriladi."
    },
    {
      id: 5,
      question: "Nima uchun JavaScript-da ikkitalik tenglik `==` o'rniga qat'iy tenglik `===` ishlatish tavsiya qilinadi?",
      options: [
        "`==` faqat raqamlarni solishtiradi, `===` esa matnlarni solishtiradi",
        "`==` avtomatik turni o'zgartirish (coercion) xususiyatiga ega bo'lib, kutilmagan natijalarga olib kelishi mumkin; `===` esa qiymatni ham, uning turini ham o'zgartirmasdan solishtiradi",
        "`===` tezroq ishlaydi",
        "Ikkalasi o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "`==` taqqoslash operatori turlar har xil bo'lsa, ularni avtomatik bir xil turga keltirib taqqoslaydi (masalan, `[] == 0` yoki `true == 1` rost qaytaradi). Bu esa xatolarga sabab bo'lgani uchun qat'iy tenglik `===` tavsiya etiladi."
    }
  ]
};
