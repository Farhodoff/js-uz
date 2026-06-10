export const regex = {
  id: "regex",
  title: "Muntazam Ifodalar (Regular Expressions)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Muntazam Ifoda (Regular Expression) nima?
* **Muntazam ifoda (RegEx):** Matnlar ichidan ma'lum bir andozaga (shablonga) mos keladigan qismlarni qidirish, mosligini tekshirish (validation) yoki almashtirish (replace) uchun ishlatiladigan maxsus qidiruv tili andozasidir.
* U JavaScript-da o'rnatilgan obyekt (\`RegExp\`) bo'lib, juda murakkab matnli vazifalarni bitta qatorda hal qilish imkonini beradi.

### Real hayotiy analogiya
Tasavvur qiling, sizda **minglab hujjatlar solingan quti** bor:
* **Oddiy usul (Muntazam ifodasiz):** Siz har bir qog'ozni ochib, undagi har bir so'zni ko'zdan kechirib chiqishingiz kerak. Agar sizga "telefon raqamlari" kerak bo'lsa, har bir raqamni qo'lda tekshirasiz.
* **Muntazam ifoda (RegEx) usuli:** Sizda sehrli skaner bor. Unga **"avval 3 ta raqam, keyin tire, keyin yana 2 ta raqam"** ko'rinishidagi qolipni (shablonni) o'rgatasiz. Skaner qutidagi barcha qog'ozlarni soniyalar ichida skanerdan o'tkazib, faqat shu qolipga mos keluvchi raqamlarni ajratib beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Satrdan raqamlarni qidirish)
Matn ichida raqamlar bor-yo'qligini tekshirish va ularni olish:
\`\`\`javascript
const text = "Mening telefon raqamim: 1234567";
const regex = /\\d+/; // \\d raqamni anglatadi, + esa kamida bitta yoki ko'p degani

console.log(regex.test(text)); // true (tekshirish)
console.log(text.match(regex)); // ["1234567"] (ajratib olish)
\`\`\`

### 2. Intermediate Example (Matndagi so'zlarni almashtirish)
RegEx yordamida barcha mos keladigan so'zlarni almashtirish:
\`\`\`javascript
const str = "Men olmani yaxshi ko'raman. Olma juda shirin.";
// 'g' flagi global qidirishni, 'i' esa katta-kichik harf farqlamaslikni bildiradi
const pattern = /olma/gi; 

const newStr = str.replace(pattern, "anor");
console.log(newStr); // "Men anorni yaxshi ko'raman. anor juda shirin."
\`\`\`

### 3. Advanced Example (Guruhlar yordamida sanani formatlash)
Sana formatini o'zgartirish (masalan, YYYY-MM-DD formatini DD/MM/YYYY ko'rinishiga keltirish):
\`\`\`javascript
const dateStr = "2026-06-10";
// 4 ta raqam, 2 ta raqam va yana 2 ta raqamni guruhlarga ajratamiz
const datePattern = /(\\d{4})-(\\d{2})-(\\d{2})/;

// $1, $2, $3 - mos ravishda dumaloq qavslar ichidagi guruhlarni bildiradi
const formattedDate = dateStr.replace(datePattern, "$3/$2/$1");
console.log(formattedDate); // "10/06/2026"
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Murakkab matn validatsiyasi:** Foydalanuvchi kiritgan email manzili, telefon raqami, pochta indeksi yoki parol xavfsizligini (kamida bitta katta harf, bitta raqam, bitta belgi bo'lishi shartligi) tekshirish uchun loops va if-shartlari yozilsa, kod yuzlab qator bo'lib ketadi va sekin ishlaydi. RegEx buni bitta shablon bilan tez va aniq bajaradi.
2. **Matnlarni qayta ishlash:** Log fayllaridan ma'lumotlarni yig'ish, matn ichidan URL havolalarini qidirib ajratib olish kabi ishlarni RegEx yordamida juda oson hal qilish mumkin.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`g\` (Global) flagini yozishni unutish
Agar \`g\` flagi qo'yilmasa, \`replace\` yoki \`match\` faqat birinchi duch kelgan moslikni oladi va to'xtaydi.
#### Xato:
\`\`\`javascript
const sentence = "cat, bat, rat, cat";
const result = sentence.replace(/cat/, "dog");
console.log(result); // "dog, bat, rat, cat" (ikkinchisi o'zgarmay qoldi)
\`\`\`
#### Tuzatish:
\`\`\`javascript
const result = sentence.replace(/cat/g, "dog");
console.log(result); // "dog, bat, rat, dog"
\`\`\`

### 2. Maxsus belgilarni ekranlashtirishni (escaping) unutish
\`.\`, \`?\`, \`*\`, \`+\`, \`(\`, \`)\` kabi belgilar RegEx-da maxsus ma'noga ega. Ularni oddiy matn sifatida qidirish uchun oldiga orqa chiziq \`\\\` (backslash) qo'yish shart.
#### Xato:
\`\`\`javascript
// Nuqta belgisi RegEx-da "istalgan belgi" degan ma'noni beradi
const fileRegex = /photo.jpg/; 
console.log(fileRegex.test("photoAxjpg")); // true qaytadi, chunki nuqta o'rnida A turibdi
\`\`\`
#### Tuzatish:
\`\`\`javascript
const fileRegex = /photo\\.jpg/; // Nuqta oldiga \\ qo'yildi
console.log(fileRegex.test("photoAxjpg")); // false
console.log(fileRegex.test("photo.jpg")); // true
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** RegEx-da \`test()\` va \`match()\` metodlarining farqi nimada?
   * **Javob:** \`test()\` metodi RegExp obyekti metodi bo'lib, true/false qaytaradi. \`match()\` esa String metodi bo'lib, mos keluvchi matnlarni massiv shaklida qaytaradi (topilmasa null).
2. **Savol:** RegEx flaglari nima va eng ko'p ishlatiladiganlarini ayting?
   * **Javob:** Flaglar qidiruv xatti-harakatini o'zgartiradi. \`g\` (global qidiruv), \`i\` (katta-kichik harf farqlamaslik), \`m\` (ko'p qatorli qidiruv).
3. **Savol:** \`\\d\` va \`\\D\` farqi nimada?
   * **Javob:** \`\\d\` istalgan bitta raqamga mos keladi, \`\\D\` esa raqam bo'lmagan istalgan belgiga mos keladi.
4. **Savol:** \`\\w\` belgilar sinfi nimalarni o'z ichiga oladi?
   * **Javob:** Alfanumerik belgilar: harflar (a-z, A-Z), raqamlar (0-9) va pastki chiziq (\`_\`).

### Middle (5–8)
5. **Savol:** RegEx-da ochko'zlik (greedy) va kamtar (lazy) qidiruv nima?
   * **Javob:** Greedy (masalan \`.*\`) maksimal darajada uzun matnni qamrab oladi. Lazy qilish uchun kvantifikatordan keyin \`?\` qo'yiladi (masalan \`.*?\`), u eng qisqa mos keluvchi matnni oladi.
6. **Savol:** Capturing group (guruhlash) nima va unga qanday murojaat qilinadi?
   * **Javob:** Shablon ichida qismlarni dumaloq qavs \`(...)\` ichiga olish orqali guruhlanadi. Ularga replace-da \`$1\`, \`$2\` kabi o'zgaruvchilar orqali murojaat qilish mumkin.
7. **Savol:** RegExp konstruktori \`new RegExp('pattern')\` va \`/pattern/\` literalining farqi nimada?
   * **Javob:** Literallar dastur yuklanganda kompiyatsiya qilinadi (statik). Konstruktor esa dinamik tarzda, masalan o'zgaruvchi qiymatidan shablon yasash uchun ishlatiladi.
8. **Savol:** \`^\` belgisi qachon satr boshini, qachon inkor etishni bildiradi?
   * **Javob:** Andoza boshida kelganda (\`/^abc/\`) satr boshini bildiradi. To'rtburchak qavslar ichida kelganda (\`/[^abc]/\`) a, b, c dan boshqa istalgan belgini bildiradi.

### Senior (9–12)
9. **Savol:** Lookahead (\`(?=...)\` va \`(?!...)\`) va Lookbehind (\`(?<=...)\` va \`(?<!...)\`) tushunchalarini tushuntiring.
   * **Javob:** Ular assertion (tasdiqlar) bo'lib, o'zidan oldin yoki keyin ma'lum bir matn bor yoki yo'qligini tekshiradi, lekin u matnni natijaga (match) qo'shmaydi.
10. **Savol:** RegEx-da "Catastrophic Backtracking" (Halokatli qaytish) nima va u qanday xavf tug'diradi?
    * **Javob:** Agar shablon juda murakkab va mos kelmaydigan matn uzun bo'lsa, RegEx dvigateli barcha kombinatsiyalarni tekshirish uchun juda ko'p vaqt sarflaydi. Bu CPU yuklamasini 100% ga chiqarib, dasturni qotirib qo'yishi mumkin (ReDoS hujumi).
11. **Savol:** RegExp obyektidagi \`lastIndex\` xususiyati nima va u qachon o'zgaradi?
    * **Javob:** Global (\`g\`) yoki yopishqoq (\`y\`) flaglari ishlatilganda, \`lastIndex\` keyingi qidiruv boshlanadigan indeksni ko'rsatadi. Har safar \`exec()\` yoki \`test()\` chaqirilganda u yangilanadi.
12. **Savol:** RegEx-da Unicode belgilar bilan ishlashda qaysi flag kerak va nima uchun?
    * **Javob:** \`u\` (unicode) flagi kerak. Chunki Emoji yoki maxsus belgilar 2-4 bayt joy egallaydi va \`u\` flagsiz ular noto'g'ri bo'laklarga bo'linib tekshiriladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Parol Kuchini Tekshiruvchi Algoritm (Password Validator)
Saytlarda ro'yxatdan o'tishda parollarni tekshirish uchun RegEx eng qulay vosita hisoblanadi.

\`\`\`javascript
function checkPasswordStrength(password) {
  // Shartlar:
  // 1. Kamida 8 ta belgi bo'lishi kerak
  // 2. Kamida bitta katta harf bo'lishi kerak
  // 3. Kamida bitta kichik harf bo'lishi kerak
  // 4. Kamida bitta raqam bo'lishi kerak
  // 5. Kamida bitta maxsus belgi (@, $, !, %, *, ?, &) bo'lishi kerak

  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

  if (strongPattern.test(password)) {
    return { status: "Kuchli", valid: true };
  } else {
    return {
      status: "Kuchsiz. Parolda kamida 8 belgi, katta-kichik harflar, raqam va maxsus belgi bo'lishi shart.",
      valid: false
    };
  }
}

console.log(checkPasswordStrength("Simple12")); // valid: false (maxsus belgi yo'q)
console.log(checkPasswordStrength("SecurePass123!")); // valid: true (Kuchli!)
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Sikl ichida \`new RegExp()\` yaratmang:** Agar andoza dinamik ravishda o'zgarmasa, uni sikl tashqarisida e'lon qiling. Har bir sikl aylanishida yangi obyekt yaratish xotira va vaqt talab qiladi.
* **Andozalarni soddalashtiring:** Juda murakkab va bir-birining ichiga kirgan kvantifikatorlardan (masalan \`(a+)+\`) qoching, chunki ular "Catastrophic Backtracking" xavfini tug'diradi.

---

## 10. 📌 Cheat Sheet

| Belgan / Sinf | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`.\` | Istalgan bitta belgi (yangi satrdan tashqari) | \`/a.c/\` -> "abc", "axc" |
| \`\\d\` | Istalgan bitta raqam | \`/\\d/\` -> "5" |
| \`\\w\` | Alfanumerik belgi (harf, raqam, \`_\`) | \`/\\w/\` -> "a", "3", "_" |
| \`\\s\` | Istalgan bo'shliq belgi (probel, tab) | \`/\\s/\` -> " " |
| \`^\` | Satr boshlanishi | \`/^Hello/\` -> "Hello World" |
| \`$\` | Satr tugashi | \`/World$/\` -> "Hello World" |
| \`*\` | 0 yoki undan ko'p marta takrorlanish | \`/ab*/\` -> "a", "ab", "abbb" |
| \`+\` | 1 yoki undan ko'p marta takrorlanish | \`/ab+/\` -> "ab", "abbb" |
| \`?\` | 0 yoki 1 marta takrorlanish (ixtiyoriy) | \`/ab?/\` -> "a", "ab" |
| \`{n,m}\` | Kamida n marta, ko'pi bilan m marta | \`/\\d{2,4}/\` -> "12", "1234" |
| \`[a-z]\` | Berilgan oraliqdagi istalgan belgi | \`/[a-c]/\` -> "a", "b", "c" |
| \`(abc)\` | Guruhlash (capturing group) | \`/(\\d{2})/\` -> guruh 1 |
`,
  exercises: [
  {
    "id": 1,
    "title": "Email Manzilini Tekshirish",
    "instruction": "Kiritilgan satrning haqiqiy email manzili ekanligini tekshiruvchi `validateEmail(email)` funksiyasini yozing. Funksiya to'g'ri bo'lsa `true`, noto'g'ri bo'lsa `false` qaytarsin.",
    "startingCode": "function validateEmail(email) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/ kabi muntazam ifoda va regex.test(email) metodidan foydalaning.",
    "test": "const sandbox = new Function(code + '; return validateEmail;');\nconst fn = sandbox();\nif (fn('test@example.com') !== true) return 'To\\'g\\'ri emailni tekshirishda false qaytdi';\nif (fn('invalid-email') !== false) return 'Noto\\'g\\'ri emailni tekshirishda true qaytdi';\nif (fn('abc@def') !== false) return 'Domeni yo\\'q emailni tekshirishda true qaytdi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Telefon Raqamini Formatlash",
    "instruction": "998901234567 ko'rinishidagi 12 ta raqamdan iborat O'zbekiston telefon raqamini regex yordamida guruhlarga ajratib, `+998 (90) 123-45-67` ko'rinishiga keltiruvchi `formatPhoneNumber(str)` funksiyasini yozing.",
    "startingCode": "function formatPhoneNumber(str) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "RegEx guruhlari (capturing groups) va `.replace()` metodidan foydalaning. Masalan: `str.replace(/(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})/, '+$1 ($2) $3-$4-$5')`.",
    "test": "const sandbox = new Function(code + '; return formatPhoneNumber;');\nconst fn = sandbox();\nconst res = fn('998901234567');\nif (res === '+998 (90) 123-45-67') return null;\nreturn 'Telefon raqamini formatlash xato: ' + res;"
  },
  {
    "id": 3,
    "title": "Hashtaglarni Ajratib Olish",
    "instruction": "Berilgan matndan barcha hashtaglarni (masalan, `#javascript`, `#code`) ajratib olib, massiv ko'rinishida qaytaruvchi `extractHashtags(text)` funksiyasini yozing. Agar matnda hashtaglar topilmasa, bo'sh massiv `[]` qaytishi kerak.",
    "startingCode": "function extractHashtags(text) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "/#[a-zA-Z0-9_]+/g yoki /#\\w+/g shablonidan va `.match()` metodidan foydalaning. Match natijasi `null` bo'lsa, `[]` qaytarishni unutmang.",
    "test": "const sandbox = new Function(code + '; return extractHashtags;');\nconst fn = sandbox();\nconst res = fn('Bugun #javascript va #regex o\\'rganamiz!');\nif (!Array.isArray(res) || res.length !== 2 || res[0] !== '#javascript' || res[1] !== '#regex') {\n  return 'Hashtaglarni ajratib olishda xatolik: ' + JSON.stringify(res);\n}\nconst empty = fn('Hech qanday hashtag yo\\'q');\nif (!Array.isArray(empty) || empty.length !== 0) {\n  return 'Topilmagan holatda bo\\'sh massiv qaytarilmadi';\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da muntazam ifodalar (Regular Expressions) nima uchun ishlatiladi?",
    "options": [
      "Faqat matematik hisob-kitoblarni tezlashtirish uchun",
      "Matnlar ichidan ma'lum bir andozaga (shablonga) mos keladigan qismlarni qidirish, almashtirish va tekshirish uchun",
      "CSS stillarini dinamik yuklash uchun",
      "Obyektlarni keshga saqlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Muntazam ifodalar (RegEx) matn ustida andozalar yordamida qidiruv, tekshirish (validation) va almashtirish amallarini bajarish uchun juda kuchli vositadir."
  },
  {
    "id": 2,
    "question": "Quyidagilardan qaysi biri RegEx literalini to'g'ri e'lon qilish usuli hisoblanadi?",
    "options": [
      "`const regex = 'abc';`",
      "`const regex = /abc/;`",
      "`const regex = #abc#;`",
      "`const regex = {abc};`"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da muntazam ifoda literali ikkita yonma-yon chiziq (slash) `/` belgisi orasida yoziladi: `/pattern/`."
  },
  {
    "id": 3,
    "question": "Muntazam ifodalardagi `\\d` maxsus belgisi nimani anglatadi?",
    "options": [
      "Istalgan harf (a-z, A-Z)",
      "Istalgan raqam (0-9)",
      "Bo'shliq (probel, tab)",
      "Satrning boshlanish qismi"
    ],
    "correctAnswer": 1,
    "explanation": "`\\d` (digit) - istalgan bitta raqamga mos keladi, ya'ni `[0-9]` to'plami bilan bir xil."
  },
  {
    "id": 4,
    "question": "Muntazam ifodadagi `^` belgisi nimani bildiradi?",
    "options": [
      "Satr oxirini belgilaydi",
      "Satr boshlanishini belgilaydi (yoki to'plam ichida rad etishni bildiradi)",
      "Belgi kamida bir marta takrorlanishini",
      "Istalgan belgini anglatadi"
    ],
    "correctAnswer": 1,
    "explanation": "Muntazam ifoda boshida kelgan `^` (caret) belgisi matn aynan shu andoza bilan boshlanishi kerakligini bildiradi."
  },
  {
    "id": 5,
    "question": "Muntazam ifodadagi `$` belgisi nimani bildiradi?",
    "options": [
      "Satr boshini belgilaydi",
      "Satr oxirini belgilaydi",
      "Valyuta belgilarini qidiradi",
      "Belgi 0 yoki 1 marta takrorlanishini bildiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Muntazam ifoda oxirida kelgan `$` (dollar) belgisi matn aynan shu andoza bilan tugashi kerakligini bildiradi."
  },
  {
    "id": 6,
    "question": "Muntazam ifodalarda belgi 0 yoki undan ko'p marta takrorlanishi mumkinligini ko'rsatish uchun qaysi belgi ishlatiladi?",
    "options": [
      "`?`",
      "`+`",
      "`*`",
      "`{1,}`"
    ],
    "correctAnswer": 2,
    "explanation": "`*` (yulduzcha) belgisi o'zidan oldin turgan belgi 0 marta (umuman qatnashmasligi) yoki istalgancha ko'p marta takrorlanishi mumkinligini bildiradi."
  },
  {
    "id": 7,
    "question": "Muntazam ifodalarda o'zidan oldingi belgi kamida 1 yoki undan ko'p marta takrorlanishini talab qiluvchi operator qaysi?",
    "options": [
      "`*`",
      "`?`",
      "`+`",
      "`.`"
    ],
    "correctAnswer": 2,
    "explanation": "`+` (plyus) operatori o'zidan oldingi belgi kamida 1 marta yoki undan ko'p marta takrorlanishi shartligini bildiradi."
  },
  {
    "id": 8,
    "question": "Satr ichida berilgan muntazam ifodaga mos keladigan qism bor-yo'qligini tekshirib, true yoki false qaytaruvchi RegExp metodi qaysi?",
    "options": [
      "`match()`",
      "`search()`",
      "`test()`",
      "`exec()`"
    ],
    "correctAnswer": 2,
    "explanation": "`regex.test(string)` metodi satrni tekshirib, agar andozaga mos keluvchi qism topilsa `true`, topilmasa `false` qaytaradi."
  },
  {
    "id": 9,
    "question": "Muntazam ifodada katta-kichik harflarni farqlamasdan (case-insensitive) qidirish uchun qaysi flag ishlatiladi?",
    "options": [
      "`g`",
      "`m`",
      "`i`",
      "`s`"
    ],
    "correctAnswer": 2,
    "explanation": "`i` flagi (insensitive) qidiruv paytida katta va kichik harflarni bir xil deb hisoblaydi (masalan, `/abc/i` andozasi 'ABC' matniga ham mos keladi)."
  },
  {
    "id": 10,
    "question": "Matn ichidagi faqat birinchi moslikni emas, balki barcha mosliklarni qidirib topish uchun qaysi flag ishlatiladi?",
    "options": [
      "`a`",
      "`g`",
      "`i`",
      "`y`"
    ],
    "correctAnswer": 1,
    "explanation": "`g` flagi (global) butun matn bo'ylab barcha mosliklarni qidirish uchun qo'llaniladi. Flag qo'yilmasa, faqat birinchi moslik topilgach qidiruv to'xtaydi."
  },
  {
    "id": 11,
    "question": "Muntazam ifodalarda probel, tab, yangi satr kabi barcha bo'shliq belgilarini topish uchun qaysi maxsus belgi ishlatiladi?",
    "options": [
      "`\\b`",
      "`\\s`",
      "`\\w`",
      "`\\d`"
    ],
    "correctAnswer": 1,
    "explanation": "`\\s` (space) - probel, tabulyatsiya (`\\t`), yangi satr (`\\n`) va boshqa bo'shliqlarga mos keluvchi belgidir."
  },
  {
    "id": 12,
    "question": "Muntazam ifodalarda guruhlarni shakllantirish (capturing groups) uchun qaysi qavslardan foydalaniladi?",
    "options": [
      "To'rtburchak qavslar `[...]`",
      "Gullik qavslar `{...}`",
      "Dumaloq qavslar `(...)`",
      "Burchakli qavslar `<...>`"
    ],
    "correctAnswer": 2,
    "explanation": "Dumaloq qavslar `(...)` muntazam ifodadagi bir nechta belgilarni bitta guruhga birlashtirish va keyinchalik `.replace()` yoki `.match()`-da ularni alohida ajratib olish (capturing) uchun ishlatiladi."
  }
]

};
