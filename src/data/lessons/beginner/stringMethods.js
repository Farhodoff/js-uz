export const stringMethods = {
  id: "string-methods",
  title: "String Metodlari",
  level: "Beginner",
  description: "JavaScriptda matnlar (stringlar) bilan ishlash, ularni tahrirlash, qidirish va kesib olish metodlari.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, foydalanuvchi tizimda ro'yxatdan o'tayotganda o'z ismini "   aLi  " deb yozdi. Siz uni bazaga ortiqcha bo'shliqlarsiz va birinchi harfini katta qilib "Ali" shaklida saqlashingiz kerak. Matn ustida bunday amallarni bajarish uchun JavaScript taqdim etgan string metodlari yordamga keladi.

## 2. SODDALIK (Analogiya)
Matnni **mijoz**, string metodlarini esa **sartaroshxona** asboblari deb tasavvur qiling. Sartarosh mijozning sochini qisqartirishi (\`slice\`), bo'yashi (\`toUpperCase\`) yoki soqolini olib ortiqcha qismlarini tozalashi (\`trim\`) mumkin. Mijoz o'sha-o'sha odam bo'lib qoladi, lekin uning ko'rinishi o'zgaradi va biz yangi ko'rinishni olamiz.

## 3. STRUKTURA (Asosiy metodlar)

### A. Registrni o'zgartirish
- **toUpperCase():** Barcha harflarni katta qiladi.
- **toLowerCase():** Barcha harflarni kichik qiladi.
\`\`\`javascript
let til = "JavaScript";
console.log(til.toUpperCase()); // "JAVASCRIPT"
console.log(til.toLowerCase()); // "javascript"
\`\`\`

### B. Kesib olish (slice)
\`slice(start, end)\` - start indeksidan boshlab end indeksigacha bo'lgan qismini kesib oladi (end indeksining o'zi kirmaydi):
\`\`\`javascript
let meva = "Olmaxon";
console.log(meva.slice(0, 4)); // "Olma"
console.log(meva.slice(4));    // "xon" (oxirigacha)
\`\`\`

### C. Bo'shliqlarni tozalash (trim)
\`trim()\` - matnning boshi va oxiridagi bo'shliqlarni olib tashlaydi:
\`\`\`javascript
let ism = "   Anvar   ";
console.log(ism.trim()); // "Anvar"
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Matn ichidan so'z qidirish va almashtirish:
\`\`\`javascript
let xabar = "Bugun kun issiq";
console.log(xabar.includes("kun")); // true
console.log(xabar.replace("issiq", "salqin")); // "Bugun kun salqin"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Asl matn o'zgarmasligi:** Stringlar primitiv va o'zgarmas (\`immutable\`) hisoblanadi. Metodlar asl o'zgaruvchini o'zgartirmaydi, balki **yangi matn** qaytaradi.
   \`\`\`javascript
   let ism = "ali";
   ism.toUpperCase(); // Xato! Asl ism o'zgarmaydi.
   ism = ism.toUpperCase(); // Mana endi to'g'ri ✅.
   \`\`\`
2. **Indeksni 1 dan boshlab sanash:** JavaScriptda birinchi belgi har doim 0-indeksda turadi.
3. **includes() case-sensitivity:** Katta va kichik harflarni farqlaydi. \`"Salom".includes("salom")\` natijasi \`false\` bo'ladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. String metodlari nima?**
Matnlar ustida kesish, qidirish va boshqa tahrirlash amallarini bajarish uchun maxsus tayyor funksiyalar.

**2. .length xususiyati nima qaytaradi?**
Matndagi barcha belgilar (harf, raqam, belgi, bo'shliqlar) sonini qaytaradi.

**3. toUpperCase() va toLowerCase() farqi nima?**
\`toUpperCase()\` hamma harflarni katta qilsa, \`toLowerCase()\` barchasini kichik qiladi.

**4. slice(start, end) metodida end indeksidagi belgi kiradimi?**
Yo'q, \`end\` indeksigacha bo'lgan belgilar olinadi, lekin shu indeksdagi belgi kirmaydi.

**5. trim() nima qiladi?**
Matnning ikki chetidagi barcha bo'shliqlarni o'chirib tashlaydi.

**6. Matndagi biror so'zni boshqasiga almashtirish qanday bajariladi?**
\`replace(eski, yangi)\` yoki barcha mosliklar uchun \`replaceAll()\` metodi orqali.

**7. includes() nima qaytaradi?**
Qidirilayotgan so'z matn ichida bo'lsa \`true\`, bo'lmasa \`false\` qaytaradi.

**8. startsWith() va endsWith() nima qiladi?**
Matn ma'lum bir so'z yoki belgi bilan boshlanishi yoki tugashini tekshirib, boolean natija beradi.

**9. Matnning ma'lum bir indeksidagi harfni qanday olsak bo'ladi?**
\`charAt(index)\` metodi yoki kvadrat qavslar \`matn[index]\` yordamida.

**10. Nima uchun string metodlari asl qiymatni o'zgartirmaydi?**
Chunki JavaScriptda matnlar immutable (o'zgarmas) primitiv tur hisoblanadi.

**11. split() metodi nima qaytaradi?**
Matnni berilgan ajratuvchi bo'yicha bo'laklarga ajratib, massiv (array) hosil qiladi.

**12. repeat(n) nima vazifani bajaradi?**
Matnni kiritilgan \`n\` marta takrorlab, yangi bitta matn hosil qiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Matnni tozalash va kattalashtirish",
      instruction: "word matnidagi ikki chetidagi bo'shliqlarni olib tashlang va hamma harflarini katta qilib res o'zgaruvchisiga saqlang.",
      startingCode: "let word = '  js  ';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = word.trim().toUpperCase();",
      test: "if (res === 'JS') return null; return 'res o\\'zgaruvchisi \\'JS\\' bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Kichik harflarga o'tkazish",
      instruction: "name o'zgaruvchisidagi matnni to'liq kichik harflarga o'tkazing va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let name = 'TEMUR';\n// Bu yerga yozing\nlet result = ",
      hint: "let result = name.toLowerCase();",
      test: "if (result === 'temur') return null; return 'Natija \\'temur\\' bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Matn uzunligi",
      instruction: "text o'zgaruvchisidagi belgilar sonini (uzunligini) aniqlang va uni len o'zgaruvchisiga saqlang.",
      startingCode: "let text = 'JavaScript';\n// Bu yerga yozing\nlet len = ",
      hint: "let len = text.length;",
      test: "if (len === 10) return null; return 'Uzunligi 10 bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "So'z mavjudligini tekshirish",
      instruction: "text matnida 'love' so'zi qatnashganligini includes() yordamida tekshiring va natijani check o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let text = 'I love coding';\n// Bu yerga yozing\nlet check = ",
      hint: "let check = text.includes('love');",
      test: "if (check === true) return null; return 'love so\\'zi mavjud, check true bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Boshlanishini tekshirish",
      instruction: "doc o'zgaruvchisi 'index' so'zi bilan boshlanishini startsWith() orqali tekshiring va natijani check o'zgaruvchisiga saqlang.",
      startingCode: "let doc = 'index.html';\n// Bu yerga yozing\nlet check = ",
      hint: "let check = doc.startsWith('index');",
      test: "if (check === true) return null; return 'check true bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Tugashini tekshirish",
      instruction: "file o'zgaruvchisi '.js' bilan tugashini endsWith() orqali tekshiring va natijani check o'zgaruvchisiga saqlang.",
      startingCode: "let file = 'app.js';\n// Bu yerga yozing\nlet check = ",
      hint: "let check = file.endsWith('.js');",
      test: "if (check === true) return null; return 'check true bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "So'zni almashtirish",
      instruction: "msg matnidagi 'World' so'zini 'Uzbekistan' so'ziga replace() yordamida almashtiring va natijani newMsg o'zgaruvchisiga saqlang.",
      startingCode: "let msg = 'Hello World';\n// Bu yerga yozing\nlet newMsg = ",
      hint: "let newMsg = msg.replace('World', 'Uzbekistan');",
      test: "if (newMsg === 'Hello Uzbekistan') return null; return 'newMsg \\'Hello Uzbekistan\\' bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Matnni takrorlash",
      instruction: "str o'zgaruvchisini repeat() yordamida 3 marta takrorlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let str = 'Ha';\n// Bu yerga yozing\nlet result = ",
      hint: "let result = str.repeat(3);",
      test: "if (result === 'HaHaHa') return null; return 'Natija \\'HaHaHa\\' bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Matnni massivga ajratish",
      instruction: "cities matnini vergul (',') belgisi bo'yicha split() yordamida massivga ajrating va uni arr o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let cities = 'Tashkent,Samarkand,Bukhara';\n// Bu yerga yozing\nlet arr = ",
      hint: "let arr = cities.split(',');",
      test: "if (Array.isArray(arr) && arr.length === 3 && arr[1] === 'Samarkand') return null; return 'split yordamida massivga ajrating!';"
    },
    {
      id: 10,
      title: "Muayyan harfni olish",
      instruction: "charAt() yordamida word o'zgaruvchisining 4-indeksdagi (beshinchi harf) belgisini olib, char o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let word = 'Programmer';\n// Bu yerga yozing\nlet char = ",
      hint: "let char = word.charAt(4);",
      test: "if (char === 'r') return null; return '4-indeksdagi harf r bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Indeksni aniqlash",
      instruction: "indexOf() yordamida text matnidan 'Dev' so'zining birinchi boshlanish indeksini toping va uni idx o'zgaruvchisiga saqlang.",
      startingCode: "let text = 'Web Development';\n// Bu yerga yozing\nlet idx = ",
      hint: "let idx = text.indexOf('Dev');",
      test: "if (idx === 4) return null; return 'Dev so\\'zining indeksi 4 bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Slice bilan kesib olish",
      instruction: "slice() metodiga manfiy indeks (-6) berib, str matnining oxirgi 6 ta belgisini kesib oling va res o'zgaruvchisiga saqlang.",
      startingCode: "let str = 'HelloFriend';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = str.slice(-6);",
      test: "if (res === 'Friend') return null; return 'Kesib olingan matn \\'Friend\\' bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da string (matn) metodlari ishlatilganda asl o'zgaruvchi qiymati qanday o'zgaradi?",
      options: [
        "Asl o'zgaruvchi avtomatik ravishda yangi qiymatga almashadi",
        "Asl o'zgaruvchi umuman o'zgarmaydi, chunki stringlar immutable (o'zgarmas) hisoblanadi va metodlar yangi string qaytaradi",
        "Asl o'zgaruvchi xotiradan butunlay o'chib ketadi",
        "Faqat `.replace()` ishlatilganda o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da satrlar (stringlar) immutable, ya'ni o'zgarmasdir. Istalgan string metodi mavjud satr ustida bajarilganda asl qiymatni o'zgartirmaydi, balki yangilangan yangi satrni qaytaradi."
    },
    {
      id: 2,
      question: "`let txt = \"Frontend\"; txt.slice(0, 4)` ifodasidan qanday natija qaytadi?",
      options: [
        "`\"Fron\"` (chunki 0-indeksdan 4-indeksgacha bo'lgan belgilarni kesib oladi, 4-indeksning o'zi kirmaydi)",
        "`\"Front\"`",
        "`\"tend\"`",
        "`\"Frontend\"`"
      ],
      correctAnswer: 0,
      explanation: "`.slice(start, end)` metodi ko'rsatilgan `start` indeksidan boshlab `end` indeksigacha bo'lgan qismni kesib oladi, lekin oxirgi ko'rsatilgan indeksdagi belgini o'z ichiga olmaydi."
    },
    {
      id: 3,
      question: "Foydalanuvchi kiritgan matn boshidagi va oxiridagi bo'shliqlarni olib tashlash (tozalash) uchun qaysi metoddan foydalaniladi?",
      options: [
        "`.clean()`",
        "`.trim()`",
        "`.sliceSpace()`",
        "`.clear()`"
      ],
      correctAnswer: 1,
      explanation: "`.trim()` metodi satrning boshi va oxiridagi barcha ortiqcha bo'shliqlarni o'chirib tashlaydi."
    },
    {
      id: 4,
      question: "Matnni ma'lum bir belgi (masalan, bo'sh joy yoki vergul `,`) bo'yicha bo'laklarga ajratib, massivga (array) o'tkazish uchun qaysi metod qo'llaniladi?",
      options: [
        "`.slice()`",
        "`.split()`",
        "`.join()`",
        "`.divide()`"
      ],
      correctAnswer: 1,
      explanation: "`.split()` metodi berilgan ajratuvchi (separator) belgi asosida matnni qismlarga bo'lib, massivga aylantirib qaytaradi."
    },
    {
      id: 5,
      question: "`let code = \"JavaScript\"; console.log(code.includes(\"java\"))` natijasi nima bo'ladi va nima uchun?",
      options: [
        "`true`",
        "`false` (chunki string metodlari harflarning katta-kichikligiga sezgir (case-sensitive) hisoblanadi, shuning uchun 'Java' va 'java' har xil)",
        "`undefined`",
        "`TypeError` xatosi kelib chiqadi"
      ],
      correctAnswer: 1,
      explanation: "String metodlari katta va kichik harflarni farqlaydi (case-sensitive). \"JavaScript\" so'zida kichik harflar bilan yozilgan \"java\" so'zi qatnashmaganligi sababli `.includes(\"java\")` false qaytaradi."
    },
    {
      id: 6,
      question: "`let text = \"Hello\"; text[0] = \"h\"; console.log(text);` bajarilganda nima chiqadi?",
      options: [
        "`\"hello\"`",
        "`\"Hello\"` (chunki stringlar immutable bo'lib, uning alohida belgilarini indeks orqali to'g'ridan-to'g'ri o'zgartirib bo'lmaydi)",
        "`\"h\"`",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Stringlar butunlay o'zgarmas (immutable). Indeks orqali belgilarni o'zgartirishga urinish (`text[0] = \"h\"`) JS tomonidan e'tiborsiz qoldiriladi va matn o'zgarmasdan `\"Hello\"` bo'lib qolaveradi."
    },
    {
      id: 7,
      question: "Matnda qidirilayotgan so'z yoki belgining birinchi uchragan indeks raqamini topuvchi metod qaysi?",
      options: [
        "indexOf()",
        "searchIndex()",
        "findIndex()",
        "charAt()"
      ],
      correctAnswer: 0,
      explanation: "`indexOf()` metodi qidirilayotgan qiymat matnda birinchi marta uchragan joy indeksini qaytaradi."
    },
    {
      id: 8,
      question: "indexOf() metodiga yozilgan qiymat matnda umuman mavjud bo'lmasa, metod qanday natija beradi?",
      options: [
        "`false`",
        "`0`",
        "`-1` (chunki indeks har doim 0 va undan katta bo'ladi, -1 esa topilmaganini bildiradi)",
        "`undefined`"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da agar qidirilgan element/so'z topilmasa, indeks qaytaruvchi metodlar (masalan `indexOf`) har doim `-1` sonini qaytaradi."
    },
    {
      id: 9,
      question: "Matnni ma'lum indeksidan boshlab oxirigacha kesib olish uchun nima qilinadi?",
      options: [
        "slice() metodiga faqat bitta boshlanish indeksi beriladi (masalan: slice(3))",
        "slice() metodiga (3, 100) kabi juda katta son beriladi",
        "split() metodidan foydalaniladi",
        "trim() metodi ishlatiladi"
      ],
      correctAnswer: 0,
      explanation: "`.slice()` metodiga faqat bitta argument berilsa, u o'sha indeksdan boshlab butun matn oxirigacha bo'lgan qismni kesib oladi."
    },
    {
      id: 10,
      question: "slice() metodida manfiy sonlardan parametr sifatida foydalanish nimani anglatadi?",
      options: [
        "Bu xatolikka olib keladi",
        "U matnning oxirgi belgisidan boshlab (o'ngdan chapga) teskari tartibda sanashni bildiradi",
        "Matnni tozalashni bildiradi",
        "Matnni teskari aylantirishni bildiradi"
      ],
      correctAnswer: 1,
      explanation: "Manfiy parametr berilganda `.slice(-n)` matnning oxiridan boshlab `n` ta belgini hisoblab kesib olishini ta'minlaydi (masalan, `-1` oxirgi belgi)."
    },
    {
      id: 11,
      question: "Matndagi belgilar sonini bildiruvchi `.length` xususiyati nima uchun qavslarsiz `()` chaqiriladi?",
      options: [
        "Chunki u funksiya/metod emas, balki string obyektining ichki o'zgarmas xususiyati (property) hisoblanadi",
        "Chunki brauzer shunday talab qiladi",
        "Qavs bilan chaqirsa ham farqi yo'q",
        "Chunki u massiv hisoblanadi"
      ],
      correctAnswer: 0,
      explanation: "Metodlar (funksiyalar) qavslar bilan chaqiriladi (masalan, `trim()`), lekin xususiyatlar (properties) shunchaki qiymat bo'lgani uchun qavssiz yoziladi (masalan, `length`)."
    },
    {
      id: 12,
      question: "`let str = \"A,B,C\"; str.split(\"\")` chaqirilganda qanday natija olinadi?",
      options: [
        "`[\"A\", \"B\", \"C\"]`",
        "`[\"A\", \",\", \"B\", \",\", \"C\"]` (chunki splitga bo'sh string berilganda u har bir belgini, jumladan vergullarni ham alohida massiv elementiga aylantiradi)",
        "`\"A B C\"`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "`split(\"\")` (bo'sh ajratuvchi) matndagi har bir belgini (harf, belgi, bo'shliq va h.k.) alohida-alohida qilib massivga yoyib chiqadi."
    }
  ]
};
