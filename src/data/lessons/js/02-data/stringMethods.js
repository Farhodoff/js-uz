export const stringMethods = {
  id: "stringMethods",
  title: "String Metodlari",
  language: "javascript",
  theory: `## 1. Bu nima?

Poyezd chiptangizda ismingiz xato yozilgan deb tasavvur qiling. Chipta qog'ozga chop etilgan — uni joyida o'chirib, qayta yozib bo'lmaydi. Siz kassaga borib, to'g'ri yozilgan **yangi chipta** olasiz.

JavaScript'dagi matnlar (string) ham shunday: ular **o'zgarmas (immutable)**. \`toUpperCase()\` kabi metodlar asl matnni o'zgartirmaydi, balki undan yangi matn yasab qaytaradi.

**String metodi** — matn ustida ishlash uchun tayyor berilgan funksiya. U matnni qirqadi, almashtiradi, qidiradi yoki formatlaydi.

---

## 2. Nega kerak?

Matn bilan ishlashda deyarli har doim shu amallar kerak bo'ladi:

- Foydalanuvchi kiritgan emailning boshidagi probelni olib tashlash.
- Qidiruv so'zini matn ichidan topish.
- Telefon raqamini bir xil ko'rinishga keltirish.
- Uzun matnni qisqartirib, oxiriga \`...\` qo'shish.

Bularning har birini qo'lda, sikl bilan yozish mumkin. Lekin tayyor metodlar buni bir qatorda bajaradi va xato qilish ehtimolini kamaytiradi.

---

## 3. Birinchi misol

\`toUpperCase()\` matnning barcha harflarini katta harfga aylantiradi.

\`\`\`javascript
let msg = 'salom';          // oddiy matn
msg.toUpperCase();          // yangi matn qaytaradi
console.log(msg);           // asl matnni tekshiramiz
\`\`\`

Natija:

\`\`\`text
salom
\`\`\`

Nega \`SALOM\` chiqmadi? Chunki \`toUpperCase()\` natijani **qaytardi**, lekin uni hech qayerga saqlamadik. Matnning o'zi o'zgarmadi.

---

## 4. Qator-baqator tahlil

- \`let msg = 'salom'\` — \`msg\` nomli o'zgaruvchiga matn saqlanadi.
- \`msg.toUpperCase()\` — matn ustida metod chaqiriladi. Metod yangi matn (\`'SALOM'\`) qaytaradi, lekin bu natija hech qayerga yozilmaydi.
- \`console.log(msg)\` — \`msg\` hali ham \`'salom'\`, chunki stringlar o'zgarmas.
- Natijani saqlash uchun \`const upper = msg.toUpperCase();\` yozish kerak.

---

## 5. Yana bitta misol

Endi ikkita metodni **zanjir** qilib ishlatamiz: avval bo'shliqlarni olib tashlaymiz, keyin harflarni kichraytiramiz.

\`\`\`javascript
const email = '  User@Example.Com  ';        // atrofida probel bor
const clean = email.trim().toLowerCase();    // avval trim, keyin kichik harf
console.log(clean);                          // Natija: user@example.com
\`\`\`

Bu misol avvalgisidan bitta narsa bilan farq qiladi: metod natijasi darhol keyingi metodga uzatiladi. \`trim()\` yangi matn qaytaradi, \`toLowerCase()\` esa o'sha yangi matn ustida ishlaydi.

---

## 6. Ko'p uchraydigan xatolar

**1-xato: \`replace()\` faqat birinchi moslikni almashtiradi.**

❌ Quyidagi kod barcha \`olma\` so'zlarini almashtiradi deb o'ylash oson:

\`\`\`javascript
const text = 'olma olma olma';
console.log(text.replace('olma', 'anor')); // Natija: anor olma olma
\`\`\`

Sabab: oddiy matn bilan chaqirilganda \`replace()\` faqat birinchi moslikni almashtiradi. Barchasini almashtirish uchun \`replaceAll('olma', 'anor')\` yoki \`/olma/g\` regex ishlatiladi.

**2-xato: \`substring()\` manfiy sonni tushunmaydi.**

\`\`\`javascript
const word = 'JavaScript';
console.log(word.slice(-3));      // Natija: ipt
console.log(word.substring(-3));  // Natija: JavaScript
\`\`\`

\`slice(-3)\` oxiridan sanaydi. \`substring(-3)\` esa manfiy sonni \`0\` deb qabul qiladi, shuning uchun boshidan boshlaydi.

**3-xato: \`length\` — metod emas, xususiyat.**

❌ \`word.length()\` deb yozilsa, \`TypeError: word.length is not a function\` xatosi chiqadi. To'g'ri yozuv: \`word.length\` (qavssiz).

---

## 7. Tekshiruv

1. \`'  Salom  '.trim()\` natijasi nima?
2. \`'banana'.replace('a', 'o')\` natijasi nima? Barcha \`a\` ni almashtirish uchun nima qilish kerak?
3. \`'kitob'.slice(-2)\` va \`'kitob'.substring(-2)\` natijalari farq qiladimi?

**Javoblar:**

1. \`'Salom'\` — bosh va oxirdagi probellar olib tashlanadi, o'rtadagi matn o'zgarmaydi.
2. \`'bonana'\` — faqat birinchi \`a\` almashadi. Barchasi uchun \`replaceAll('a', 'o')\` yoki \`replace(/a/g, 'o')\`.
3. Ha: \`slice(-2)\` → \`'ob'\`; \`substring(-2)\` → \`'kitob'\` (manfiy son \`0\` ga aylanadi).

---

## 8. Xulosa

- Stringlar o'zgarmas: har bir metod asl matnni emas, yangi matn qaytaradi.
- Metodlarni zanjirlash mumkin: \`email.trim().toLowerCase()\`.
- \`replace()\` birinchi moslikni, \`replaceAll()\` barcha mosliklarni almashtiradi.

**Keyingi darsda:** massivlar bilan tanishamiz va ularning elementlarini qanday saqlashni o'rganamiz.`,
  exercises: [
  {
    "id": 1,
    "title": "Email formatlash",
    "instruction": "Email manzilini formatlash uchun `formatEmail(email)` funksiyasini yozing. U berilgan email'ning boshidagi va oxiridagi bo'sh joylarni olib tashlasin (`trim()`) va barcha harflarini kichik harflarga o'tkazsin (`toLowerCase()`).",
    "startingCode": "function formatEmail(email) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "email.trim().toLowerCase() dan foydalaning.",
    "test": "const sandbox = new Function(code + '; return formatEmail;');\nconst fn = sandbox();\nconst res = fn('  User@Example.Com  ');\nif (res === 'user@example.com') return null;\nreturn 'Email to\\'g\\'ri formatlanmadi. trim() va toLowerCase() ishlatilganini tekshiring.';"
  },
  {
    "id": 2,
    "title": "Matnni qisqartirish (Truncate)",
    "instruction": "Matnni qisqartirish uchun `truncateText(text, maxLength)` funksiyasini yozing. Agar matn uzunligi (`text.length`) `maxLength` dan katta bo'lsa, uni `maxLength` gacha kesib (`slice` yoki `substring` yordamida) va oxiriga `...` qo'shib qaytaring. Aks holda matnning o'zini qaytaring.",
    "startingCode": "function truncateText(text, maxLength) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Kattalikni tekshirish uchun `if` shartidan, kesish uchun esa `slice(0, maxLength)` metodidan foydalaning.",
    "test": "const sandbox = new Function(code + '; return truncateText;');\nconst fn = sandbox();\nconst res1 = fn('Salom Dunyo', 5);\nconst res2 = fn('Salom', 10);\nif (res1 === 'Salom...' && res2 === 'Salom') return null;\nreturn 'Matn to\\'g\\'ri qisqartirilmadi. slice yoki substring metodidan foydalaning.';"
  },
  {
    "id": 3,
    "title": "Kredit kartani maskalash",
    "instruction": "Kredit karta raqamining oxirgi 4 ta raqamidan tashqari barcha raqamlarini yashiruvchi `maskCreditCard(cardNumber)` funksiyasini yozing. Masalan, `'8600123456789012'` berilsa, u `'************9012'` qaytarishi kerak. Karta raqami har doim 16 ta belgidan iborat deb hisoblang.",
    "startingCode": "function maskCreditCard(cardNumber) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`repeat` metodi bilan 12 ta yulduzcha yarating va unga oxirgi 4 ta raqamni `slice(-4)` orqali qo'shing.",
    "test": "const sandbox = new Function(code + '; return maskCreditCard;');\nconst fn = sandbox();\nconst res = fn('8600123456789012');\nif (res === '************9012') return null;\nreturn 'Kredit karta raqami to\\'g\\'ri maskalanmadi. repeat va slice metodlaridan foydalaning.';"
  },
  {
    "id": 4,
    "title": "So'zning birinchi harfini kattalashtirish",
    "instruction": "`capitalize(word)` funksiyasini yarating. U kiritilgan so'zning birinchi harfini katta qilib, qolganlarini kichik qilib qaytarsin.",
    "startingCode": "function capitalize(word) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`word.charAt(0).toUpperCase()` va `word.slice(1).toLowerCase()` ni birlashtiring.",
    "test": "const sandbox = new Function(code + '; return capitalize;');\nconst fn = sandbox();\nif (fn('jAVAsCript') !== 'Javascript') return 'Katta-kichik harflar noto\\'g\\'ri formatlandi';\nreturn null;"
  },
  {
    "id": 5,
    "title": "Ma'lum so'z borligini tekshirish",
    "instruction": "`containsWord(text, word)` funksiyasi berilgan `text` ichida `word` qatnashganligini qaytarsin (boolean).",
    "startingCode": "function containsWord(text, word) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`includes()` metodidan foydalaning.",
    "test": "const sandbox = new Function(code + '; return containsWord;');\nconst fn = sandbox();\nif (fn('Assalomu alaykum', 'alaykum') !== true) return 'includes() dan to\\'g\\'ri foydalaning';\nreturn null;"
  },
  {
    "id": 6,
    "title": "Barcha bo'shliqlarni olib tashlash",
    "instruction": "`removeAllSpaces(text)` funksiyasi berilgan matndagi barcha bo'shliqlarni olib tashlasin.",
    "startingCode": "function removeAllSpaces(text) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`replaceAll(' ', '')` ishlatishingiz mumkin.",
    "test": "const sandbox = new Function(code + '; return removeAllSpaces;');\nconst fn = sandbox();\nif (fn('a b c') !== 'abc') return 'Probellar to\\'g\\'ri o\\'chirilmadi';\nreturn null;"
  },
  {
    "id": 7,
    "title": "Ism va familiyani ajratish",
    "instruction": "`splitName(fullName)` funksiyasi berilgan to'liq ismni massiv ko'rinishida `['Ism', 'Familiya']` qaytarsin.",
    "startingCode": "function splitName(fullName) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`split(' ')` metodidan foydalaning.",
    "test": "const sandbox = new Function(code + '; return splitName;');\nconst fn = sandbox();\nconst res = fn('Ali Valiyev');\nif (!Array.isArray(res) || res[0] !== 'Ali' || res[1] !== 'Valiyev') return 'split metodidan noto\\'g\\'ri foydalanildi';\nreturn null;"
  },
  {
    "id": 8,
    "title": "URL manzilni tozalash",
    "instruction": "`cleanUrl(url)` funksiyasi URL manzil oxiridagi slash `/` belgisini olib tashlasin (agar bor bo'lsa).",
    "startingCode": "function cleanUrl(url) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Oxirgi belgi `/` ekanini `endsWith()` bilan tekshirib, `slice(0, -1)` qiling.",
    "test": "const sandbox = new Function(code + '; return cleanUrl;');\nconst fn = sandbox();\nif (fn('https://site.com/') !== 'https://site.com' || fn('https://site.uz') !== 'https://site.uz') return 'URL to\\'g\\'ri tozalanmadi';\nreturn null;"
  },
  {
    "id": 9,
    "title": "Fayl kengaytmasini topish",
    "instruction": "`getExtension(filename)` funksiyasi berilgan fayl nomining kengaytmasini (nuqtadan keyingi qismini) topib bersin.",
    "startingCode": "function getExtension(filename) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`split('.')` yordamida massivga ajratib, oxirgi elementini oling yoki `indexOf` va `slice` dan foydalaning.",
    "test": "const sandbox = new Function(code + '; return getExtension;');\nconst fn = sandbox();\nif (fn('document.pdf') !== 'pdf' || fn('image.jpeg') !== 'jpeg') return 'Kengaytma noto\\'g\\'ri aniqlandi';\nreturn null;"
  },
  {
    "id": 10,
    "title": "Raqamni formatlash (Padding)",
    "instruction": "`padNumber(num)` funksiyasi kiritilgan raqamni oldidan kerakli miqdorda nollar qo'shib, doim 5 xonali matn ko'rinishida qaytarsin.",
    "startingCode": "function padNumber(num) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Raqamni stringga o'girib (`String(num)`), so'ngra `padStart(5, '0')` dan foydalaning.",
    "test": "const sandbox = new Function(code + '; return padNumber;');\nconst fn = sandbox();\nif (fn(42) !== '00042' || fn(12345) !== '12345') return 'padStart dan foydalanishda xatolik';\nreturn null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da stringlar o'zgarmas (immutable) hisoblanadi. Quyidagi koddan keyin konsolga nima chiqadi?\n```javascript\nlet str = 'salom';\nstr.toUpperCase();\nconsole.log(str);\n```",
    "options": [
      "'SALOM'",
      "'salom'",
      "TypeError xatoligi yuz beradi",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da stringlar o'zgarmasdir. Har qanday string metodi original stringni o'zgartirmaydi, balki yangi string qaytaradi. Shuning uchun `str` o'zgarishsiz 'salom' bo'lib qoladi."
  },
  {
    "id": 2,
    "question": "Stringning uzunligini (belgilar sonini) aniqlash uchun qaysi xususiyatdan foydalaniladi?",
    "options": [
      "str.length()",
      "str.getLength()",
      "str.length",
      "str.size"
    ],
    "correctAnswer": 2,
    "explanation": "`length` stringning metodi emas, balki xususiyatidir (property). Shuning uchun u qavslarsiz chaqiriladi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod bajarilgandan keyin konsolda nima chiqadi?\n```javascript\nconst word = 'JavaScript';\nconsole.log(word.slice(4, 10));\n```",
    "options": [
      "'Script'",
      "'Java'",
      "'aScrip'",
      "'S'"
    ],
    "correctAnswer": 0,
    "explanation": "`slice(start, end)` metodi `start` indeksidan `end` indeksigacha bo'lgan qismni kesib oladi (lekin `end` indeksining o'zi natijaga kirmaydi). 4-indeks 'S', 10-indeks esa oxiri bo'lgani sababli 'Script' qaytadi."
  },
  {
    "id": 4,
    "question": "`slice()` metodiga manfiy son berilsa nima bo'ladi? Masalan: `'salom'.slice(-3)`",
    "options": [
      "Bo'sh string ('') qaytaradi",
      "Xatolik (Error) beradi",
      "Matnning oxiridan boshlab hisoblab, oxirgi 3 ta belgini qaytaradi ('lom')",
      "Matnning boshidan boshlab 3 ta belgini olib tashlaydi ('om')"
    ],
    "correctAnswer": 2,
    "explanation": "`slice()` metodida manfiy indeks matnning oxiridan boshlab hisoblanadi. -3 oxirgi 3 ta belgini bildiradi, ya'ni 'lom' qaytadi."
  },
  {
    "id": 5,
    "question": "`indexOf()` metodi qidirilayotgan belgi yoki so'zni matn ichidan topa olmasa, qanday qiymat qaytaradi?",
    "options": [
      "null",
      "undefined",
      "false",
      "-1"
    ],
    "correctAnswer": 3,
    "explanation": "Agar qidirilayotgan qiymat string ichida mavjud bo'lmasa, `indexOf` metodi har doim -1 sonini qaytaradi."
  },
  {
    "id": 6,
    "question": "`str.charAt(index)` va `str[index]` o'rtasidagi asosiy farq nima?",
    "options": [
      "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi",
      "Ko'rsatilgan indeks string chegarasidan tashqarida bo'lsa, `str[index]` undefined qaytaradi, `str.charAt(index)` esa bo'sh string (\"\") qaytaradi",
      "str[index] faqat eski brauzerlarda ishlaydi, charAt esa zamonaviy usul",
      "charAt matnni o'zgartira oladi, index esa faqat o'qish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Chegaradan tashqaridagi indeks so'ralganda, qavs sintaksisi (`str[index]`) undefined beradi. `charAt(index)` esa har doim string turi qaytishini kafolatlash uchun bo'sh string (\"\") beradi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nconst text = 'olma olma olma';\nconsole.log(text.replace('olma', 'anor'));\n```",
    "options": [
      "'anor anor anor'",
      "'anor olma olma'",
      "'olma olma anor'",
      "'olma anor olma'"
    ],
    "correctAnswer": 1,
    "explanation": "`replace()` metodiga birinchi argument sifatida oddiy string uzatilsa, u faqat birinchi uchragan moslikni o'zgartiradi. Barcha mosliklarni o'zgartirish uchun `replaceAll()` yoki global regex `/olma/g` ishlatish kerak."
  },
  {
    "id": 8,
    "question": "`'J-A-V-A'.split('-')` ifodasi qanday natija qaytaradi?",
    "options": [
      "'JAVA'",
      "['J', 'A', 'V', 'A']",
      "'J,A,V,A'",
      "['J-A-V-A']"
    ],
    "correctAnswer": 1,
    "explanation": "`split(separator)` metodi stringni berilgan separator bo'yicha bo'laklarga ajratib, ulardan iborat yangi massiv (array) qaytaradi."
  },
  {
    "id": 9,
    "question": "`trim()` metodi nima vazifani bajaradi?",
    "options": [
      "Matn o'rtasidagi barcha bo'shliqlarni o'chiradi",
      "Matn boshidagi va oxiridagi bo'shliqlarni (probellarni) olib tashlaydi",
      "Matndagi barcha harflarni kichiklashtiradi",
      "Matnning faqat o'ng tomonidagi bo'shliqlarni olib tashlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`trim()` metodi matn boshlanishi va oxiridagi barcha bo'shliqlarni (probel, tab, yangi qator) o'chiradi, lekin matn o'rtasidagi bo'shliqlarga tegmaydi."
  },
  {
    "id": 10,
    "question": "`substring()` va `slice()` metodlarining manfiy argumentlar bilan ishlashdagi farqi nimada?",
    "options": [
      "substring() manfiy indekslarni 0 deb hisoblaydi, slice() esa ularni oxiridan boshlab hisoblaydi",
      "slice() manfiy indekslarni 0 deb hisoblaydi, substring() esa oxiridan boshlab hisoblaydi",
      "Ikkalasi ham manfiy indekslarni xuddi shunday qabul qiladi",
      "substring() manfiy indeks berilganda xatolik (Error) beradi"
    ],
    "correctAnswer": 0,
    "explanation": "`substring(start, end)` metodiga manfiy son berilsa, u avtomatik ravishda 0 ga tenglashtiriladi. `slice()` esa manfiy qiymatlarni string oxiridan boshlab hisoblaydi."
  },
  {
    "id": 11,
    "question": "`includes()` metodi haqidagi qaysi tasdiq to'g'ri?",
    "options": [
      "Matn ichidagi birinchi moslik indeksini qaytaradi va registrga sezgir emas",
      "Boolean (true/false) qiymat qaytaradi va registrga sezgir (case-sensitive) hisoblanadi",
      "Boolean (true/false) qiymat qaytaradi va registrga sezgir emas",
      "Matn ichidan qidirilgan so'zni qaytaradi va registrga sezgir"
    ],
    "correctAnswer": 1,
    "explanation": "`includes()` metodi string ichida qidirilayotgan matn bor yoki yo'qligini tekshirib, true yoki false qaytaradi hamda registrga sezgir (katta-kichik harflarni farqlaydi) hisoblanadi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod natijasi nima bo'ladi?\n```javascript\n'JS'.repeat(3);\n```",
    "options": [
      "'JS JS JS'",
      "['JS', 'JS', 'JS']",
      "'JSJSJS'",
      "'JS 3'"
    ],
    "correctAnswer": 2,
    "explanation": "`repeat(count)` metodi berilgan stringni count marta takrorlab, ularni hech qanday qo'shimcha belgi yoki bo'shliqsiz birlashtirib, bitta string sifatida qaytaradi."
  }
]
};
