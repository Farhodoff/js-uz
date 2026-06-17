export const stringMethods = {
  id: "stringMethods",
  title: "String Metodlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### String Metodlari nima?
JavaScript-da har qanday matn (tirnoq ichidagi belgilar ketma-ketligi) **String** ma'lumot turi hisoblanadi. String metodlari — bu matnlar bilan ishlash (masalan, ularni kesish, harflarini kattalashtirish, qidirish yoki almashtirish) uchun oldindan tayyorlab qo'yilgan maxsus asboblar to'plamidir.

### Real hayotiy o'xshatish
Tasavvur qiling, sizda **gil (loy)** bor:
* Agar siz undan ko'za yasamoqchi bo'lsangiz, uni ezib, shakl berasiz. Ammo JavaScript stringlari gilga emas, balki **toshga o'yilgan yozuvga** o'xshaydi.
* Agar toshdagi yozuvni o'zgartirmoqchi bo'lsangiz, mavjud toshni o'zgartira olmaysiz (chunki stringlar o'zgarmasdir - **immutable**). Siz faqat boshqa toshni olib, unga yangi matnni o'yib yozishingiz mumkin.
* Matn metodlari ham xuddi shunday ishlaydi: ular mavjud matnni o'zgartirmaydi, balki berilgan buyruq asosida mutlaqo yangi matn nusxasini yaratib qaytaradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda misol)
Matn harflari registrini o'zgartirish va bo'shliqlarni tozalash:
\`\`\`javascript
const greeting = "   Assalomu Alaykum!   ";

// Boshidagi va oxiridagi bo'shliqlarni olib tashlaymiz
const cleanGreeting = greeting.trim();
console.log(cleanGreeting); // "Assalomu Alaykum!"

// Barcha harflarni katta yoki kichik qilamiz
console.log(cleanGreeting.toUpperCase()); // "ASSALOMU ALAYKUM!"
console.log(cleanGreeting.toLowerCase()); // "assalomu alaykum!"
\`\`\`

### 2. Intermediate Example (O'rtacha misol)
Matn ichidan qismlarni kesib olish va qidirish:
\`\`\`javascript
const sentence = "JavaScript juda ajoyib til!";

// includes() - matnda biror so'z borligini tekshiradi
console.log(sentence.includes("ajoyib")); // true
console.log(sentence.includes("Python")); // false

// indexOf() - so'zning indeksini (boshlanish joyini) qaytaradi
console.log(sentence.indexOf("juda")); // 11

// slice(start, end) - matnning ma'lum qismini kesib oladi
// 0-indeksdan 10-indeksgacha bo'lgan qism (10-indeks kirmaydi)
console.log(sentence.slice(0, 10)); // "JavaScript"
\`\`\`

### 3. Advanced Example (Murakkab misol)
Metodlarni zanjir (chaining) ko'rinishida ulash va matnlarni formatlash:
\`\`\`javascript
const rawInput = "   admin_user_name   ";

// Zanjir usulida metodlarni chaqirish:
// 1. Bo'shliqlarni tozalaydi
// 2. "_" belgilarini bo'sh joyga almashtiradi
// 3. Har bir so'zning bosh harfini katta qiladi (split va map orqali)
const formatted = rawInput
  .trim()
  .replaceAll("_", " ")
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

console.log(formatted); // "Admin User Name"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Primitive Wrapper Objects (Boxing)
JavaScript-da stringlar **primitiv** ma'lumot turi hisoblanadi. Primitiv turlar esa obyekt bo'lmagani uchun ularda o'z-o'zidan xossa (property) yoki metodlar bo'lishi mumkin emas. Unda qanday qilib \`'salom'.toUpperCase()\` kodi ishlamoqda?

Siz string metodini chaqirganingizda, JavaScript orqa fonda quyidagi amallarni bajaradi:
1. **Boxing (Qobiqqa o'rash):** Vaqtinchalik maxsus \`String\` obyektini (\`new String()\`) yaratadi va primitiv matnni uning ichiga o'raydi. Bu obyekt matn metodlariga ega bo'ladi.
2. **Metodni bajarish:** Vaqtinchalik obyektdagi metod ishga tushiriladi va natija qaytariladi.
3. **Unboxing (Qobiqdan chiqarish):** Natija qaytganidan so'ng, ushbu vaqtinchalik obyekt xotiradan (Garbage Collector yordamida) darhol o'chirib yuboriladi va bizda yana oddiy primitiv string qoladi.

### String Interning (Xotirani optimallashtirish)
Dvigatel (masalan, V8) xotirani tejash uchun bir xil string literallarini bitta xotira manzilida saqlaydi. Agar siz dasturda bir xil matnli 10 ta o'zgaruvchi yaratsangiz ham, ular xotirada faqat bitta joyni egallaydi. Stringlar o'zgarmas bo'lgani uchun bu xavfsizdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Immutability (O'zgarmaslik) qoidasini unutish
#### Xato:
\`\`\`javascript
let nickname = "nodir";
nickname.toUpperCase(); // Kutish: nickname "NODIR" bo'lib qoladi
console.log(nickname); // Natija: "nodir" (o'zgarmagan!)
\`\`\`
#### Nima uchun:
String o'zgarmas bo'lganligi sababli, \`toUpperCase()\` o'zgaruvchining qiymatini o'zgartirmaydi, balki yangi matn qaytaradi.
#### To'g'ri usul:
Natijani yangi o'zgaruvchiga o'zlashtirish yoki o'zini qayta yozish kerak:
\`\`\`javascript
nickname = nickname.toUpperCase();
console.log(nickname); // "NODIR"
\`\`\`

### 2. \`length\`ni metod sifatida chaqirish
#### Xato:
\`\`\`javascript
const text = "Salom";
console.log(text.length()); // TypeError: text.length is not a function
\`\`\`
#### Nima uchun:
\`length\` bu string metodi emas, uning xususiyatidir (property).
#### To'g'ri usul:
Qavslarsiz yoziladi:
\`\`\`javascript
console.log(text.length); // 5
\`\`\`

### 3. \`replace()\` faqat birinchi moslikni o'zgartirishini bilmaslik
#### Xato:
\`\`\`javascript
const list = "olma, olma, olma";
const result = list.replace("olma", "anor");
console.log(result); // "anor, olma, olma" (faqat birinchisi o'zgardi)
\`\`\`
#### To'g'ri usul:
Barcha mosliklarni o'zgartirish uchun \`replaceAll()\` yoki global RegEx ishlatish kerak:
\`\`\`javascript
const result = list.replaceAll("olma", "anor"); // "anor, anor, anor"
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior darajasi uchun
1. **Savol:** JavaScript-da stringlar o'zgaruvchanmi (mutable) yoki o'zgarmasmi (immutable)?
   * **Javob:** Stringlar mutlaqo o'zgarmasdir (immutable). Bir marta yaratilgan stringni ichidan o'zgartirib bo'lmaydi, har doim yangisi yaratiladi.
2. **Savol:** \`str.length\` nima va u qanday hisoblanadi?
   * **Javob:** U stringdagi UTF-16 belgilar sonini qaytaradigan xususiyatdir.
3. **Savol:** Boshidagi va oxiridagi bo'shliqlarni qaysi metod olib tashlaydi?
   * **Javob:** \`trim()\` metodi. Shuningdek \`trimStart()\` va \`trimEnd()\` ham mavjud.
4. **Savol:** \`indexOf()\` metodi qidirilayotgan qiymat topilmasa nima qaytaradi?
   * **Javob:** \`-1\` qaytaradi.

### Middle darajasi uchun
5. **Savol:** \`slice(start, end)\` va \`substring(start, end)\` orasidagi farq nima?
   * **Javob:** \`slice()\` manfiy indekslarni qabul qiladi va ularni matn oxiridan boshlab hisoblaydi. \`substring()\` esa manfiy indekslarni \`0\` deb hisoblaydi. Shuningdek, \`substring\`da agar \`start > end\` bo'lsa, argumentlar o'rni avtomatik almashadi.
6. **Savol:** \`str.charAt(index)\` va \`str[index]\` o'rtasidagi farq nima?
   * **Javob:** Agar berilgan indeks mavjud bo'lmasa (chegaradan tashqarida bo'lsa), \`charAt()\` bo'sh string \`""\` qaytaradi, \`str[index]\` esa \`undefined\` beradi.
7. **Savol:** \`includes()\` va \`indexOf()\` farqi nimada?
   * **Javob:** \`includes()\` faqat mantiqiy qiymat (\`true/false\`) qaytaradi, \`indexOf()\` esa mos keluvchi birinchi belgining indeksini yoki \`-1\` qaytaradi.
8. **Savol:** \`replace()\` metodiga birinchi argument sifatida satr (string) berilsa nima bo'ladi?
   * **Javob:** Faqat birinchi uchragan moslik almashtiriladi, qolganlari o'zgarishsiz qoladi.

### Senior darajasi uchun
9. **Savol:** String Boxing nima va u ishlash tezligiga (performance) ta'sir qiladimi?
   * **Javob:** Boxing — primitiv stringda metod chaqirilganda vaqtinchalik obyekt yaratilishi. Bu qisqa muddatli xotira bandligini yaratadi. Katta tsikllarda (millionlab marta) keraksiz metod chaqirishdan qochish kerak.
10. **Savol:** String Interning qanday ishlaydi?
    * **Javob:** JS dvigateli bir xil string literallari uchun xotirada bitta joy ajratadi va ularga bir xil pointer beradi. Bu xotirani tejaydi va solishtirish tezligini oshiradi.
11. **Savol:** Matnlarni alifbo tartibida to'g'ri solishtirish uchun qaysi metoddan foydalaniladi?
    * **Javob:** \`localeCompare()\` metodi. U turli tillardagi o'ziga xos harflarni (masalan, o'zbek tilidagi \`o'\`, \`g'\`) to'g'ri tartiblash imkonini beradi.
12. **Savol:** Ko'p sonli matnlarni birlashtirishda \`+\` operatori va \`Array.join()\` orasida qaysi biri samaraliroq?
    * **Javob:** Zamonaviy dvigatellarda \`+\` operatori juda yaxshi optimallashtirilgan bo'lib, oddiy birlashtirishlarda tezroq ishlaydi. Ammo juda ko'p dinamik stringlar yig'ilayotganda \`Array.push()\` va keyin \`join()\` xotirani kamroq band qiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi diagrammada string o'zgarmasligi (immutability) ko'rsatilgan. E'tibor bering, operatsiyalar original stringni o'zgartirmasdan, xotirada yangi stringlar hosil qiladi:

\`\`\`mermaid
graph LR
    A["Original String: 'hello'"] -->|str.toUpperCase()| B["Yangi String: 'HELLO'"]
    A -->|str.slice(1, 4)| C["Yangi String: 'ell'"]
    A -->|O'zgarishsiz qoladi| D["Original String: 'hello' (xotirada saqlanadi)"]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style C fill:#bbf,stroke:#333,stroke-width:1px
    style D fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

### Amaliy topshiriq variantlari:
1. Foydalanuvchining telefon raqamini formatlang: \`+998901234567\` matnini olib, \`+998 (90) 123-45-67\` shakliga keltiring.
2. Berilgan matndagi barcha probellarni olib tashlab, harflar sonini hisoblang.

---

## 7. 📝 12 ta Mini Test

Ushbu dars uchun maxsus tayyorlangan 12 ta test yordamida o'z bilimingizni sinab ko'ring. Testlar primitiv turlar, xotirada ishlash va metodlarning o'ziga xos jihatlarini qamrab olgan.

---

## 8. 🎯 Real Project Case Study

### URL Slug Generator (Maqola sarlavhasini URL manziliga o'tkazish)
Haqiqiy loyihalarda (masalan, blog yoki yangiliklar saytida) maqola sarlavhasini chiroyli URL manziliga o'tkazish talab qilinadi. Buni string metodlari zanjiri orqali amalga oshiramiz:

\`\`\`javascript
function generateSlug(title) {
  return title
    .trim()                     // 1. Boshidagi va oxiridagi bo'shliqlarni tozalaydi
    .toLowerCase()              // 2. Kichik harflarga o'tkazadi
    .replace(/[^a-z0-9\\s-]/g, '') // 3. Maxsus belgilarni (nuqta, undov, so'roq) o'chiradi
    .replace(/\\s+/g, '-')       // 4. Barcha bo'shliqlarni bitta chiziqchaga almashtiradi
    .slice(0, 50);              // 5. URL uzunligini 50 belgidan oshirmaydi
}

const articleTitle = " JavaScript-da String Metodlari! (To'liq qo'llanma) ";
const slug = generateSlug(articleTitle);

console.log(slug); // "javascript-da-string-metodlari-toliq-qollanma"
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Primitiv turlarni afzal ko'ring:** Hech qachon \`new String("matn")\` shaklida string yaratmang. Bu keraksiz obyektlarni yaratib, xotirani band qiladi va \`typeof\` tekshiruvida \`'object'\` qaytarib chalkashlik yuzaga keltiradi.
* **Qidiruv operatsiyalari tezligi:** \`includes()\` va \`startsWith()\` metodlari o'rnatilgan C++ kodlarida ishlaydi, shuning uchun ular qo'lda yozilgan \`for\` sikllariga qaraganda ancha tez va optimaldir.
* **Matn tozalash:** Matnni tekshirishdan oldin har doim \`trim()\` va \`toLowerCase()\` metodlarini ishlatish xatolarni keskin kamaytiradi (ayniqsa login va email validatsiyasida).

---

## 10. 📌 Cheat Sheet

| Metod | Parametrlari | Qaytaradigan Qiymati | Vazifasi / Izoh |
| :--- | :--- | :--- | :--- |
| \`trim()\` | yo'q | \`string\` | Boshidagi va oxiridagi bo'shliqlarni tozalaydi |
| \`toUpperCase()\` | yo'q | \`string\` | Barcha harflarni kattalashtiradi |
| \`toLowerCase()\` | yo'q | \`string\` | Barcha harflarni kichiklashtiradi |
| \`slice(start, end)\` | \`start (number)\`, \`end? (number)\` | \`string\` | Ko'rsatilgan indekslar bo'yicha matnni kesib oladi |
| \`indexOf(val)\` | \`value (string)\` | \`number\` | Qiymatning birinchi uchragan indeksini qaytaradi (topilmasa \`-1\`) |
| \`includes(val)\` | \`value (string)\` | \`boolean\` | Matn ichida qidirilayotgan qiymat borligini tekshiradi |
| \`replace(search, repl)\`| \`search (string/regex)\`, \`repl (string)\` | \`string\` | Birinchi mos kelgan qiymatni almashtiradi |
| \`replaceAll(search, repl)\`| \`search (string/regex)\`, \`repl (string)\` | \`string\` | Barcha mos kelgan qiymatlarni almashtiradi |
| \`split(separator)\` | \`separator (string)\` | \`array\` | Stringni bo'laklarga bo'lib, massiv qaytaradi |
| \`repeat(count)\` | \`count (number)\` | \`string\` | Matnni berilgan marta takrorlab birlashtiradi |
`,
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
    "test": "const sandbox = new Function(code + '; return truncateText;');\nconst fn = sandbox();\nconst res1 = fn('Salom Dunyo', 5);\nconst res2 = fn('Salom', 10);\nif (res1 === 'Salom...' && res2 === 'Salom') return null;\nreturn 'Matn to\\'g\\'ri qisqartirilmadi. slice yoki substring metodidan foydalanib tekshiring.';"
  },
  {
    "id": 3,
    "title": "Kredit kartani maskalash",
    "instruction": "Kredit karta raqamining oxirgi 4 ta raqamidan tashqari barcha raqamlarini yashiruvchi `maskCreditCard(cardNumber)` funksiyasini yozing. Masalan, `'8600123456789012'` berilsa, u `'************9012'` qaytarishi kerak. Karta raqami har doim 16 ta belgidan iborat bo'ladi deb hisoblang.",
    "startingCode": "function maskCreditCard(cardNumber) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`repeat` metodi bilan 12 ta yulduzcha yarating va unga karta raqamining oxirgi 4 ta raqamini `slice(-4)` orqali olib qo'shing.",
    "test": "const sandbox = new Function(code + '; return maskCreditCard;');\nconst fn = sandbox();\nconst res = fn('8600123456789012');\nif (res === '************9012') return null;\nreturn 'Kredit karta raqami to\\'g\\'ri maskalanmadi. repeat va slice metodlaridan foydalaning.';"
  }
]
,
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
