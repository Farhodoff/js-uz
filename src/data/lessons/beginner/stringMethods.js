export const stringMethods = {
  id: "stringMethods",
  title: "String Metodlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### String Metodlari nima?
Tasavvur qiling, siz poyezd yo'lovchisisiz. Chiptangizda sizning ismingiz xato yozilgan. Siz bu chiptani o'zgartira olmaysiz (chunki chipta qog'ozga chop etilgan va uni o'chirib bo'lmaydi). Siz faqat kassaga borib, ismingiz to'g'ri yozilgan **yangi chipta** olishingiz mumkin.
JavaScript-da string (matn)lar ham xuddi shunday. Ular **immutable** (o'zgarmas). Ularni o'zgartira olmaysiz, lekin string metodlari yordamida eskisidan yangi, o'zgartirilgan nusxani yaratishingiz mumkin.

---

## 2. ⚙️ Qanday Ishlaydi (Under the Hood)

### Primitive Wrapper Objects (Boxing)
JavaScript-da stringlar **primitiv** ma'lumot turidir, ya'ni ularda obyektlardek metodlar bo'lmasligi kerak.
Ammo \\\`"salom".toUpperCase()\\\` qanday ishlaydi?
Siz stringda metod chaqirganingizda, V8 dvigateli (yoki istalgan JS engine) vaqtinchalik \\\`String\\\` obyektini (\\\`new String("salom")\\\`) yaratadi, metodni ishlatadi, natijani qaytaradi va bu vaqtinchalik obyektni tezda xotiradan tozalaydi (Garbage Collector). Bu jarayon **Boxing** deb ataladi.

### String Interning (Xotira)
Xotirani tejash uchun JavaScript dvigatellari **String Interning** usulidan foydalanadi. Agar siz 10 ta o'zgaruvchiga bir xil matnni biriktirsangiz, ular xotirada faqat bitta joyni egallaydi. Barcha o'zgaruvchilar o'sha yagona xotira manziliga havola qilinadi.

---

## 3. ⚠️ Edge Cases va Senior Interview Savollari

### Edge Cases (Chekka holatlar)
1. **replace() faqat birinchisini o'zgartiradi:**
   \\\`/regex/g\\\` ishlatmasangiz yoki \\\`replaceAll()\\\` ishlatmasangiz, faqat matndagi birinchi moslik o'zgaradi.
2. **Manfiy indekslar:**
   \\\`slice(-3)\\\` matn oxiridan 3 ta belgi oladi, lekin \\\`substring(-3)\\\` manfiy sonlarni \\\`0\\\` ga tenglashtiradi.
3. **charAt vs [] bracket notation:**
   Agar indeks matn uzunligidan katta bo'lsa, \\\`charAt()\\\` bo'sh string \\\`""\\\` qaytaradi. Lekin \\\`str[index]\\\` \\\`undefined\\\` qaytaradi.

### Senior Interview Questions
1. **String o'zgarmasligining (immutability) foydasi nimada?**
   **Javob:** Immutability sababli "String Interning" imkoniyati tug'iladi (xotira tejaladi) va ko'p ipli yoki parallellikka asoslangan tizimlarda (masalan, Web Workers) stringlarni sinxronizatsiyasiz ishonchli ishlatish mumkin.
2. **Katta hajmdagi matnlarni qo'shishda \\\`+\\\` operatori tezmi yoki \\\`Array.join()\\\`?**
   **Javob:** Zamonaviy V8 dvigatellarida \\\`+\\\` juda yaxshi optimallashtirilgan, lekin qatorlar soni millionlab bo'lsa, avval massivga yig'ib \\\`join\\\` qilish memory allocation'ni (xotira ajratishni) kamaytirishi mumkin.
3. **UTF-16 va Emojilar bilan ishlashdagi muammolar?**
   **Javob:** Ba'zi emojilar 2 ta UTF-16 blokini egallaydi. Shuning uchun emoji uzunligi \\\`length\\\` da 2 bo'lib qoladi. Emojilarni to'g'ri kesish uchun iteratordan (spread operatori \\\`[...str]\\\`) foydalanish kerak.

---

## 4. 📊 Vizual Diagramma

\\\`\\\`\\\`mermaid
graph TD
    A[String JavaScript] -->|Immutability| B(str.toUpperCase)
    B --> C[JAVASCRIPT - Yangi joy xotirada]
    A --> D[JavaScript - Eski joyda qoladi]
    
    style A fill:#f9d0c4,stroke:#333,stroke-width:2px
    style C fill:#d4f1f4,stroke:#333,stroke-width:2px
    style D fill:#d4f1f4,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
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
