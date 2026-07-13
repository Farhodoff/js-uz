export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: Qutilar va Ularning Turlari",
  language: "javascript",
  theory: `# O'zgaruvchilar (Variables)

Aksariyat hollarda JavaScript ilovalari qandaydir ma'lumotlar bilan ishlashiga to'g'ri keladi. Bunga ikkita oddiy misol keltiramiz:
1. Onlayn do'kon – ma'lumotlar sotilayotgan tovarlar va xaridlar savatchasini (shopping cart) o'z ichiga olishi mumkin.
2. Chat ilovasi – ma'lumotlar foydalanuvchilar, xabarlar va boshqalarni o'z ichiga oladi.

Aynan shu ma'lumotlarni saqlab turish uchun **o'zgaruvchilar** ishlatiladi.

## 📦 O'zgaruvchi nima o'zi?

O'zgaruvchi bu — ma'lumot saqlanadigan "nomlangan quti" (named storage). Biz bu qutidan tovarlar, tashrif buyuruvchilar va boshqa ma'lumotlarni saqlash uchun foydalanamiz.

JavaScript-da o'zgaruvchi yaratish uchun \`let\` kalit so'zidan foydalanamiz.

Quyidagi qator "message" nomli o'zgaruvchi yaratadi (boshqacha aytganda e'lon qiladi - declares):

\`\`\`javascript
let message;
\`\`\`

Endi uning ichiga o'zlashtirish operatori (\`=\`) yordamida qandaydir ma'lumot solishimiz mumkin:

\`\`\`javascript
let message;
message = 'Salom'; // 'Salom' qatorini message nomli o'zgaruvchida saqlaymiz
\`\`\`

Endi bu satr o'zgaruvchi bilan bog'langan xotira qismida saqlanmoqda. Biz o'zgaruvchining nomidan foydalanib uni o'qishimiz mumkin:

\`\`\`javascript
let message = 'Salom!';
alert(message); // o'zgaruvchi ichidagi ma'lumotni ekranga chiqaradi
\`\`\`

Qisqa bo'lishi uchun o'zgaruvchini yaratish (e'lon qilish) va unga qiymat berishni bitta qatorda yozsak ham bo'ladi:

\`\`\`javascript
let message = 'Salom!'; // o'zgaruvchi yaratish va qiymat berish
alert(message); // Salom!
\`\`\`

Shuningdek, bitta qatorda bir nechta o'zgaruvchilarni e'lon qilishimiz ham mumkin:

\`\`\`javascript
let user = 'John', age = 25, message = 'Hello';
\`\`\`

Bu qisqaroq ko'rinishi mumkin, lekin biz buni **tavsiya qilmaymiz**. O'qishga qulay bo'lishi uchun, iltimos, har bir o'zgaruvchi uchun alohida qator ishlating:

✅ **YAXSHI YONDASHUV**
\`\`\`javascript
let user = 'John';
let age = 25;
let message = 'Hello';
\`\`\`

---

## 🎩 Hayotiy O'xshatish (Analogy)

O'zgaruvchini **"ma'lumot solingan va ustiga noyob yorliq (stiker) yopishtirilgan quti"** deb tasavvur qilsangiz, uni tushunish juda oson kechadi.

Masalan, \`message\` o'zgaruvchisini ustiga "message" deb yozilgan va ichida "Salom!" qiymati bor quti sifatida ko'rish mumkin. Biz qutiga xohlagan qiymatimizni solishimiz va uni xohlagancha o'zgartirishimiz mumkin:

\`\`\`javascript
let message;

message = 'Salom!';
message = 'Dunyo!'; // qiymat o'zgartirildi

alert(message); // Dunyo!
\`\`\`
Qiymat o'zgarganda, qutidagi oldingi ma'lumot o'chib ketadi.

### ❌ YOMON: Ikki marta e'lon qilish
O'zgaruvchi faqat bir marta \`let\` bilan e'lon qilinishi kerak. Bitta nomli o'zgaruvchini qayta \`let\` bilan e'lon qilish xatolikka olib keladi:

\`\`\`javascript
let message = "Bu";
// takroriy 'let' xatolik chaqiradi
let message = "Anavu"; // SyntaxError: 'message' has already been declared
\`\`\`
Shunday ekan, o'zgaruvchini bir marta e'lon qilib, keyin unga faqat \`let\` so'zisiz murojaat qilishimiz kerak.

---

## 📜 To'g'ri Nomlash (Naming)

O'zgaruvchilarga nom berishda ikkita qoida bor:
1. Nom faqat harflar, raqamlar, yoki \`$\` va \`_\` belgilaridan iborat bo'lishi mumkin.
2. Nomning birinchi belgisi **raqam bo'lishi mumkin emas**.

Agar nom bir nechta so'zdan iborat bo'lsa, odatda **camelCase** (tuya-yozuv) ishlatiladi: masalan, \`myVeryLongName\`.

❌ **YOMON NOMLAR**
\`\`\`javascript
let 1a; // raqam bilan boshlanishi mumkin emas
let my-name; // tire '-' ishlatish mumkin emas
\`\`\`

### Katta-Kichik harflar farq qiladi
\`apple\` va \`APPLE\` nomli o'zgaruvchilar — ikkita mutlaqo boshqa-boshqa o'zgaruvchilardir.

### Zaxiralangan so'zlar (Reserved words)
Ba'zi so'zlar dasturlash tilining o'zi tomonidan ishlatilgani uchun ularni o'zgaruvchi nomi qilib ololmaysiz. Masalan: \`let\`, \`class\`, \`return\`, \`function\`.

---

## 🧱 O'zgarmaslar (Constants)

Agar qutidagi narsa hech qachon o'zgarmasligiga ishonchingiz komil bo'lsa, \`let\` o'rniga **\`const\`** ishlating:

\`\`\`javascript
const myBirthday = '18.04.1982';
\`\`\`

\`const\` yordamida e'lon qilingan o'zgaruvchilar "konstantalar" (o'zgarmaslar) deyiladi. Ularning qiymatini qayta o'zgartirib bo'lmaydi:

\`\`\`javascript
myBirthday = '01.01.2001'; // XATO! Konstantani o'zgartirib bo'lmaydi!
\`\`\`

**Katta harfli konstantalar (Uppercase Constants)**
Dastur ishlashidan oldin oldindan ma'lum bo'lgan qiyin eslab qolinadigan qiymatlarni saqlash uchun doim katta harf ishlatish qabul qilingan:

\`\`\`javascript
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_ORANGE;
\`\`\`
\`#FF7F00\` ni yodlashdan ko'ra \`COLOR_ORANGE\` deb chaqirish ming marta oson.

---

## 🎨 Narsalarni to'g'ri nomlang! (Name things right)

O'zgaruvchi nomi juda tushunarli bo'lishi va ichida nima borligini aytib turishi kerak. O'zgaruvchiga to'g'ri nom topish dasturlashdagi eng qiyin va muhim malakalardan biridir.

✅ \`userName\` yoki \`shoppingCart\` kabi o'qilishi oson nomlar bering.
❌ \`a\`, \`b\`, \`c\` kabi qisqartmalardan qoching.
❌ \`data\` yoki \`value\` kabi mavhum nomlarni ishlatmang. Axir qutining ustiga "narsa" deb yozib qo'ymaysiz-ku? Unda nima narsaligi aniq yozilishi kerak!

Va oxirgi maslahat: **O'zgaruvchilarni qayta ishlatavermang!** Yalqov bo'lmang, yangi quti kerak bo'lsa yangi \`let\` yarating. Bitta qutiga avval olma, keyin olma o'rniga paypoq tiqib qo'ymang. Bu keyinchalik xatolarni qidirishda miyangizni portlatishi aniq!

---

## Mermaid Diagramma (Qutidagi holatlar)

O'zgaruvchi o'zgarishi va konstanta farqi:

\`\`\`mermaid
sequenceDiagram
    participant Code as Dasturchi
    participant Box1 as let message
    participant Box2 as const PI

    Code->>Box1: let message = 'Salom' (Ichiga 'Salom' soldik)
    Code->>Box1: message = 'Xayr' (Eskisi axlatga, ichiga 'Xayr' tushdi)
    Code->>Box2: const PI = 3.14 (Zavoddan muhrlandi)
    Note over Box2: PI qiymati endi toshga yozildi!
    Code--xBox2: PI = 3 (XATOLIK! O'zgartirib bo'lmaydi)
\`\`\`

---

## 🎙 Intervyu savollari

**1. \`let\` va \`const\` o'rtasidagi asosiy farq nima?**
**Javob:** \`let\` bilan yaratilgan o'zgaruvchining qiymatini xohlagancha o'zgartirish (reassign) mumkin. Lekin \`const\` o'zgaruvchining qiymatini dastur davomida umuman o'zgartirib bo'lmaydi. U o'zgaruvchan emas, konstanta (o'zgarmas).

**2. O'zgaruvchi nomlari raqam bilan boshlanishi mumkinmi?**
**Javob:** Yo'q, JavaScript-da o'zgaruvchi nomlari raqam bilan boshlanishi mumkin emas. Ularning birinchi belgisi harf, \`$\` yoki \`_\` bo'lishi shart.

**3. "use strict" yo'q holatda o'zgaruvchini \`let\` yoki \`var\` siz qanday e'lon qilish mumkin va nega bu yomon?**
**Javob:** Qadimgi skriptlarda \`num = 5;\` deb to'g'ridan-to'g'ri qiymat berish o'zgaruvchi yaratib yuborar edi. Lekin bu juda yomon amaliyot (Bad Practice), chunki xatoliklarni kuzatish qiyinlashadi. Agar skript boshida \`"use strict"\` yozilsa, bunday xatoliklar qat'iy tekshiriladi va xato (ReferenceError) qaytariladi. Shuning uchun har doim e'lon qilish kalit so'zlaridan foydalanish shart.`,
  exercises: [
    {
      id: 1,
      title: "admin va name",
      instruction: "Ikkita o'zgaruvchi e'lon qiling: 'admin' va 'name'. 'name' ga \"John\" degan qiymat bering. Keyin 'name' dagi qiymatni 'admin' ga nusxalang (tenglang). Natijada 'admin' ning qiymati ham \"John\" bo'lishi kerak.",
      startingCode: "let admin;\nlet name;\n// Qolganini o'zingiz yozing",
      hint: "Avval name = 'John' deb yozing, keyin admin = name;",
      test: "let admin, name; name = 'John'; admin = name; if(admin !== 'John') throw new Error('admin qiymati John emas');"
    },
    {
      id: 2,
      title: "Sayyoramiz nomi",
      instruction: "Bizning sayyoramiz nomini saqlaydigan o'zgaruvchi yarating. O'zgaruvchiga iloji boricha tushunarli va to'g'ri nom bering. Masalan: 'ourPlanetName' va qiymatiga \"Yer\" deb yozing.",
      startingCode: "// Sayyoramiz nomi uchun o'zgaruvchi yarating\n",
      hint: "let ourPlanetName = 'Yer'; deb ishlatsangiz bo'ladi.",
      test: "let ourPlanetName = 'Yer'; if(typeof ourPlanetName === 'undefined') throw new Error('ourPlanetName e\'lon qilinmagan');"
    },
    {
      id: 3,
      title: "Joriy mehmon",
      instruction: "Vebsaytga hozirgina kirgan foydalanuvchining (mehmonning) ismini saqlaydigan o'zgaruvchi yarating. Masalan: 'currentUserName' va uni \"Ali\" ga tenglang.",
      startingCode: "// Joriy foydalanuvchi nomini saqlang\n",
      hint: "let currentUserName = 'Ali';",
      test: "let currentUserName = 'Ali'; if(typeof currentUserName === 'undefined') throw new Error('currentUserName e\'lon qilinmagan');"
    },
    {
      id: 4,
      title: "Konstantani tekshirish",
      instruction: "O'z tug'ilgan yilingizni (yoki ixtiyoriy yilni) o'zgartirib bo'lmaydigan qilib 'const' yordamida 'BIRTH_YEAR' o'zgaruvchisiga saqlang. (Masalan: 1990)",
      startingCode: "// const yordamida BIRTH_YEAR e'lon qiling\n",
      hint: "const BIRTH_YEAR = 1990; (raqam ko'rinishida)",
      test: "const BIRTH_YEAR = 1990; if(BIRTH_YEAR !== 1990) throw new Error('BIRTH_YEAR to\'g\'ri emas');"
    },
    {
      id: 5,
      title: "Bir xil qatorda bir nechta o'zgaruvchi",
      instruction: "Lekin biz bunga tavsiya qilmagan bo'lsak ham, sintaksisni sinash uchun 'x', 'y', 'z' larni bitta 'let' kalit so'zi yordamida vergul bilan e'lon qilib chiqing. Qiymatlari mos ravishda 10, 20, 30 bo'lsin.",
      startingCode: "// bitta let ishlating\n",
      hint: "let x = 10, y = 20, z = 30;",
      test: "let x = 10, y = 20, z = 30; if(x+y+z !== 60) throw new Error('Qiymatlar xato yig\'ildi');"
    },
    {
      id: 6,
      title: "Qiymatni qayta tayinlash",
      instruction: "'color' degan o'zgaruvchi yarating ('let' bilan) va unga \"Qizil\" qiymatini bering. Keyingi qatorda o'sha o'zgaruvchining qiymatini \"Yashil\" deb o'zgartiring.",
      startingCode: "// color o'zgaruvchisini yarating va o'zgartiring\n",
      hint: "let color = 'Qizil'; color = 'Yashil';",
      test: "let color = 'Qizil'; color = 'Yashil'; if(color !== 'Yashil') throw new Error('Qiymat o\'zgarmadi');"
    },
    {
      id: 7,
      title: "Qattiq konstanta",
      instruction: "O'zgaruvchi ranglar palitrasida 'COLOR_BLUE' ni '\"#00F\"' ga tenglab o'zgarmas holatda e'lon qiling.",
      startingCode: "// COLOR_BLUE e'lon qiling\n",
      hint: "const COLOR_BLUE = '#00F';",
      test: "const COLOR_BLUE = '#00F'; if(COLOR_BLUE !== '#00F') throw new Error('COLOR_BLUE xato');"
    },
    {
      id: 8,
      title: "Matematik o'zgaruvchi",
      instruction: "Ikkita o'zgaruvchi 'a' va 'b' yarating (qiymatlari mos ravishda 5 va 7). Uchinchi 'sum' o'zgaruvchisini yarating va uni 'a' va 'b' ning yig'indisiga tenglang.",
      startingCode: "let a = 5;\nlet b = 7;\n// sum yaratamiz",
      hint: "let sum = a + b;",
      test: "let a = 5; let b = 7; let sum = a + b; if(sum !== 12) throw new Error('Yig\'indi xato');"
    },
    {
      id: 9,
      title: "Ruxsat etilgan belgilar",
      instruction: "'$' va '_' belgilaridan iborat nomli o'zgaruvchilar yarating: 'let $ = 10;' va 'let _ = 20;'. Va keyin ularni yig'indisini 'result' o'zgaruvchisiga saqlang.",
      startingCode: "// $, _, va result",
      hint: "let $ = 10; let _ = 20; let result = $ + _;",
      test: "let $ = 10; let _ = 20; let result = $ + _; if(result !== 30) throw new Error('Xato hisob kitob');"
    },
    {
      id: 10,
      title: "Boshlang'ich holatni tekshirish",
      instruction: "'emptyBox' nomli o'zgaruvchini 'let' orqali yarating lekin hecham qiymat O'ZLASHTIRMANG. Ya'ni '=' ni ishlatmang. Bunda u 'undefined' qiymatini oladi.",
      startingCode: "// emptyBox",
      hint: "Faqatgina: let emptyBox;",
      test: "let emptyBox; if(typeof emptyBox !== 'undefined') throw new Error('Qiymat berish kerak emas edi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da quti nima (analogiya bo'yicha)?",
      options: [
        "Faqat raqamlar saqlovchi joy",
        "Ma'lumot solinadigan o'zgaruvchi",
        "Ekranga matn chiqaruvchi funksiya",
        "HTML elementi"
      ],
      correctAnswer: 1,
      explanation: "O'zgaruvchilar ma'lumotlarni saqlab turuvchi nomlangan qutilardir."
    },
    {
      id: 2,
      question: "Qaysi kalit so'z qiymati qayta o'zgarmaydigan quti (konstanta) yaratadi?",
      options: [
        "let",
        "var",
        "const",
        "static"
      ],
      correctAnswer: 2,
      explanation: "const bilan e'lon qilingan o'zgaruvchini qayta tayinlash mumkin emas."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri o'zgaruvchiga TO'G'RI nom berilgan?",
      options: [
        "1stUser",
        "user-name",
        "let",
        "userName"
      ],
      correctAnswer: 3,
      explanation: "O'zgaruvchi raqam bilan boshlanmaydi, defis mumkin emas, 'let' kabi so'zlar esa zaxiralangan."
    },
    {
      id: 4,
      question: "Bir marta let bilan e'lon qilingan o'zgaruvchini yana qaytadan xuddi shu nomda let bilan e'lon qilsa nima bo'ladi?",
      options: [
        "Eski qiymat o'chiriladi",
        "Yangi quti paydo bo'ladi",
        "Hech narsa bo'lmaydi",
        "Xatolik (SyntaxError) kelib chiqadi"
      ],
      correctAnswer: 3,
      explanation: "Aynan bir xil nom bilan let yordamida ikki marta e'lon qilish mumkin emas."
    },
    {
      id: 5,
      question: "Oldindan ma'lum, yodlash qiyin bo'lgan doimiy o'zgaruvchilarga qanday nom berish tavsiya qilinadi?",
      options: [
        "kichik harflar va sonlar",
        "KATTA_HARFLAR_BILAN (Underscore bilan)",
        "camelCase usulida",
        "Xohlagan tilning alfavitida"
      ],
      correctAnswer: 1,
      explanation: "Odatda COLOR_RED kabi hard-coded konstantalar katta harfda nomlanadi."
    },
    {
      id: 6,
      question: "O'zgaruvchilar o'rni qachon bo'shaydi (qiymat o'zgartirilganda)?",
      options: [
        "Yangi qiymat solinganda eskisi butunlay o'chib ketadi",
        "Ikkala qiymat birga saqlanadi",
        "Faqat typeof ishlatganda o'chadi",
        "JavaScript o'zi yashirincha faylga saqlab qo'yadi"
      ],
      correctAnswer: 0,
      explanation: "O'zlashtirish (=) yangi qiymatni saqlaydi va qutidagi eski narsani axlatga tashlaydi."
    },
    {
      id: 7,
      question: "O'zgaruvchi nomiga $ yoki _ belgilarini qanday holatda qo'llash mumkin?",
      options: [
        "Ular maxfiy parollar uchun",
        "Faqat raqamlardan oldin",
        "Ularni xuddi oddiy harflardek bemalol nomda ishlatish mumkin",
        "Ularni umuman ishlatib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "$ va _ belgilari harflarga teng huquqli bo'lib, o'zgaruvchi nomida cheklovsiz ishlatiladi."
    },
    {
      id: 8,
      question: "let o'rniga var ishlatish qanday oqibatga olib kelishi mumkin?",
      options: [
        "Dastur 10 barobar tezroq ishlaydi",
        "Blok doirasiga bo'ysunmagani uchun kutilmagan xatoliklarga (baglarga) olib kelishi mumkin",
        "Faqat raqamlar saqlashga ruxsat beradi",
        "Bu eng zamonaviy va zo'r yondashuv"
      ],
      correctAnswer: 1,
      explanation: "var eski format bo'lib, u funksiya bo'ylab amal qiladi va ba'zida kod mantiqini buzishi mumkin."
    },
    {
      id: 9,
      question: "O'zgaruvchiga ma'nosiz (masalan 'data' yoki 'a') nom berish haqida qanday xulosa qilingan?",
      options: [
        "Bu eng oson yo'l, shunday qilish kerak",
        "Kod yozishni tezlashtiradi",
        "Kontekst yashirinib qolsa bu juda YOMON oqibatga olib keladi (tushunish qiyinlashadi)",
        "Faqat var bilan tushunish mumkin"
      ],
      correctAnswer: 2,
      explanation: "Ma'nosiz nomlar boshqa dasturchilarga yoki sizga keyinchalik kodni o'qishda katta noqulaylik tug'diradi."
    },
    {
      id: 10,
      question: "O'zgaruvchi nomlarida katta-kichik harflar (case) ahamiyatlimi?",
      options: [
        "Yo'q, ikkalasi ham bir xil quti",
        "Faqat const ishlatganda ahamiyatli",
        "Ha, masalan 'apple' va 'APPLE' ikkita umuman boshqa o'zgaruvchi hisoblanadi",
        "Katta harflar faqat O'zbek tilida mumkin"
      ],
      correctAnswer: 2,
      explanation: "JavaScript 'case-sensitive' (registrga sezgir), shuning uchun bosh-harf yoki kichik harf boshqa ob'ektni bildiradi."
    },
    {
      id: 11,
      question: "E'lon qilish kalit so'zisiz (let yoki var yo'q) yaratilgan o'zgaruvchilar...",
      options: [
        "Zamonaviy kodlash standarti",
        "Dastur xavfsizligini oshiradi",
        "Yomon amaliyot, va 'use strict' holatida xato (error) beradi",
        "Juda tez ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Eski JS-da ishlasa-da, bu xavfli deb topilgan va 'use strict' yozilsa, bunday xatolikka umuman yo'l qo'yilmaydi."
    },
    {
      id: 12,
      question: "Nega ba'zi dasturchilar yangi o'zgaruvchi e'lon qilishdan erinib eskisini qayta ishlataveradi va bu nega yomon?",
      options: [
        "Xotirani tejash uchun yaxshi yo'l",
        "Bu ularning professional ekanligini bildiradi",
        "Ular quti ichidagi turli ma'lumotlarni aralashtirib tashlaydi, natijada kodni debag qilish (xato qidirish) 10 barobar qiyinlashadi",
        "Foydalanuvchiga yaxshi ta'sir qiladi"
      ],
      correctAnswer: 2,
      explanation: "O'zgaruvchining maqsadini o'zgartiraverish uni o'qish va tushunishni chigallashtirib tashlaydi."
    }
  ]
};
