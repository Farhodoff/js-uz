export const templateLiterals = {
  id: "template-literals",
  title: "Template Literals (Backticks)",
  level: "Beginner",
  description: "Stringlarni birlashtirishning eng zamonaviy va qulay usuli - Backticks (``) bilan tanishamiz.",
  theory: `## 1. NEGA kerak?

Oldinlari biz stringlarni (matnlarni) birlashtirish uchun \`+\` belgisidan foydalanardik. Bu juda noqulay edi, ayniqsa matn uzun bo'lsa yoki ichida o'zgaruvchilar ko'p bo'lsa. **Template Literals** (Backticks) bu muammoni hal qildi.

**Eski usul (+):**
\`\`\`javascript
let gap = "Mening ismim " + ism + ". Men " + yosh + " yoshdaman va " + shahar + "da yashayman.";
\`\`\`
Bu usulda doim qo'shtirnoqlar va \`+\` bilan adashib ketish oson.

**Yangi usul (Template Literals):**
\`\`\`javascript
let gap = \`Mening ismim \${ism}. Men \${yosh} yoshdaman va \${shahar}da yashayman.\`;
\`\`\`

## 2. SODDALIK (Analogiya)

Buni bir **tayyor blanka** deb tasavvur qiling. Eski usulda siz xatni bo'lak-bo'lak qilib alohida qog'ozlarga yozib, ularni yelim bilan yopishtirib chiqasiz. Template Literals esa – tayyor shablon bo'lib, siz shunchaki kerakli joylarga (\`\${...}\`) kerakli ma'lumotlarni yozib (joylashtirib) qo'yasiz.

## 3. STRUKTURA (Imkoniyatlari)

### A. O'zgaruvchi va Ifodalarni kiritish (\`\${expression}\`)
Deyarli har qanday JavaScript ifodasini \`\${}\` ichiga yozish mumkin:
\`\`\`javascript
let narx = 5000;
let soni = 3;
console.log(\`Jami: \${narx * soni} so'm\`); // Jami: 15000 so'm
\`\`\`

### B. Ko'p qatorli matnlar (Multi-line)
Eski usulda yangi qatorga o'tish uchun \`\\n\` ishlatilardi. Backticks bilan shunchaki "Enter"ni bossangiz kifoya:
\`\`\`javascript
let matn = \`Bu birinchi qator.
Bu ikkinchi qator.
Bu uchinchi qator.\`;
\`\`\`

### C. Shartli ifodalar (Ternary Operator)
\`\${}\` ichida ternary (uchlik) operator yordamida shartli matnlarni chiqarish mumkin:
\`\`\`javascript
let ball = 85;
console.log(\`Imtihon natijasi: \${ball >= 60 ? "O'tdi" : "Yiqildi"}\`);
\`\`\`

### D. Ichma-ich joylashgan Template Literals (Nesting)
Siz bitta backtick shabloni ichida yana boshqa backtick shablonini yozishingiz mumkin:
\`\`\`javascript
const user = { name: "Ali", isVip: true };
const msg = \`Foydalanuvchi: \${user.name}\${user.isVip ? \` (VIP a'zo)\` : ""}\`;
\`\`\`

---

## 4. XATOLAR (Common mistakes)

1. **Qo'shtirnoqlar bilan adashtirish:** \`'\` yoki \`"\` qo'yilganda interpolatsiya ishlamaydi. Albatta backtick \` \` \` ishlatish shart.
   \`\`\`javascript
   // XATO:
   let gap = "Salom \${name}"; // Natija: "Salom \${name}"
   \`\`\`
2. **Ifodalar o'rniga bloklarni yozish:** \`\${}\` ichida faqat ifodalar (expressions) yoziladi. U yerda to'g'ridan-to'g'ri \`if\`, \`for\`, \`while\` kabi bloklarni yozib bo'lmaydi.
3. **Backtick-larni to'g'ri yopmaslik:** Jingalak qavslar yoki backtick juftligini yopishni unutish natijasida SyntaxError kelib chiqadi.

---

## 5. AMALIYOT (Mashqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

**1. Template Literals qaysi belgilar bilan yoziladi?**
Klaviaturadagi \`Esc\` tugmasi ostida joylashgan backtick (\` \` \` - teskari qo'shtirnoq) belgilari bilan o'raladi.

**2. \${} belgisi nima vazifani bajaradi?**
Matn ichiga istalgan JavaScript o'zgaruvchisi, hisob-kitob amali yoki funksiya qaytargan qiymatni to'g'ridan-to'g'ri joylashtirish (interpolatsiya qilish) uchun ishlatiladi.

**3. Backtick ichida yangi qatorga o'tish uchun nima qilish kerak?**
Hech qanday maxsus belgi (masalan, \`\\n\`) yozish shart emas. Shunchaki klaviaturadagi "Enter" tugmasini bosib yangi qatorga o'tish kifoya.

**4. Eski string birlashtirish (+) usulining asosiy kamchiligi nima?**
Ko'p o'zgaruvchilar va uzun matnlarni birlashtirishda qo'shtirnoqlar hamda \`+\` belgilarining ko'pligi sababli sintaktik xatolarga yo'l qo'yish juda oson bo'lgan.

**5. \${} ichida ternary operator ishlatsa bo'ladimi?**
Ha, ternary (uchlik) shart operatori (\`shart ? true : false\`) ham to'liq ishlaydi va natijani matnga aylantiradi.

**6. Nima uchun bu usul "Template" deb ataladi?**
Chunki u matn andozasi (shabloni) vazifasini bajaradi va undagi dinamik qiymatlar o'rni dastur ishlashi davomida to'ldiriladi.

**7. JavaScript-ning qaysi versiyasida bu xususiyat qo'shilgan?**
Bu xususiyat JavaScript-ning ES6 (ECMAScript 2015) versiyasida taqdim etilgan.

**8. \${2 + 2} natijasi nima bo'ladi?**
Natija \`4\` (matn ko'rinishida) bo'ladi, chunki ifoda bajarilib, natija stringga o'giriladi.

**9. Backtick ichida oddiy qo'shtirnoqlardan qanday foydalaniladi?**
Backticks bilan o'ralgan matn ichida hech qanday muammosiz oddiy \`'\` va ikkitalik \`"\` qo'shtirnoqlardan foydalanish mumkin (ularni escape qilish shart emas).

**10. HTML elementlarini backtick bilan yasash qulaymi?**
Ha, o'ta qulay. Ko'p qatorli HTML tuzilmalarini va ulardagi dinamik qiymatlarni backtick yordamida juda oson va toza yaratish mumkin.

**11. Backtick ichida funksiya chaqirish mumkinmi?**
Ha, \`\${}\` ichida har qanday funksiyani chaqirish mumkin va funksiya qaytargan qiymat matn ichiga joylashtiriladi.

**12. Backtick belgisining o'zini matnda qanday ko'rsatamiz?**
Backtick belgisining o'zini ko'rsatish uchun uning oldiga teskari slash (\`\\\`) qo'yiladi: \`\\\` \`.
`,
  exercises: [
    {
      id: 1,
      title: "O'zingizni tanishtiring",
      instruction: "Name, Age o'zgaruvchilarini template literal orqali 'Mening ismim ... yoshim ...da' ko'rinishida chiqaring.",
      startingCode: "const name = 'Farhod';\nconst age = 25;\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      hint: "result = `Mening ismim ${name}, yoshim ${age}da`;",
      test: "if (code.includes('${name}') && code.includes('${age}')) return null; return 'Template literals ishlatilmadi';"
    },
    {
      id: 2,
      title: "Matnlarni birlashtirish",
      instruction: "'firstName' va 'lastName' o'zgaruvchilarini template literal yordamida birlashtirib, bitta 'fullName' o'zgaruvchisiga yozing.",
      startingCode: "const firstName = 'Farhod';\nconst lastName = 'Soylir';\n// Kodni shu yerda yozing\nconst fullName = ``;\nconsole.log(fullName);",
      hint: "const fullName = `${firstName} ${lastName}`;",
      test: "if (fullName === 'Farhod Soylir' && code.includes('${firstName}') && code.includes('${lastName}')) return null; return 'Matnlar to\\'g\\'ri birlashtirilmadi';"
    },
    {
      id: 3,
      title: "Hisob-kitob ifodasi",
      instruction: "'a' va 'b' sonlarini ko'paytmasini template literal yordamida 'Kopaytma: [natija]' ko'rinishida 'result' o'zgaruvchisiga yuklang.",
      startingCode: "const a = 6;\nconst b = 7;\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      hint: "const result = `Kopaytma: ${a * b}`;",
      test: "if (result === 'Kopaytma: 42' && code.includes('${a * b}')) return null; return 'Ko\\'paytma natijasi xato';"
    },
    {
      id: 4,
      title: "Ternary operator matnda",
      instruction: "'isGoldMember' boolean qiymatiga qarab, agar true bo'lsa 'VIP', aks holda 'Oddiy' so'zini 'statusMsg'ga yozing.",
      startingCode: "const isGoldMember = true;\n// Kodni shu yerda yozing\nconst statusMsg = ``;\nconsole.log(statusMsg);",
      hint: "const statusMsg = `${isGoldMember ? 'VIP' : 'Oddiy'}`;",
      test: "if (statusMsg === 'VIP' && code.includes('?')) return null; return 'Status noto\\'g\\'ri aniqlandi';"
    },
    {
      id: 5,
      title: "Ko'p qatorli matn yaratish",
      instruction: "Backtick yordamida ko'p qatorli manzil formatini hosil qiling (yangi qatorga o'tish bilan).",
      startingCode: "const street = 'Amir Temur';\nconst city = 'Toshkent';\n// Multi-line matn yarating\nconst address = ``;\nconsole.log(address);",
      hint: "const address = `${city}\n${street}`;",
      test: "if (address.includes('\\n') && address.includes('Toshkent')) return null; return 'Ko\\'p qatorli matn yaratilmadi';"
    },
    {
      id: 6,
      title: "Funksiya chaqirish matnda",
      instruction: "'word' o'zgaruvchisini template literal ichida `.toUpperCase()` orqali katta harfga o'giring va log qiling.",
      startingCode: "const word = 'javascript';\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      hint: "const result = `${word.toUpperCase()}`;",
      test: "if (result === 'JAVASCRIPT' && code.includes('toUpperCase')) return null; return 'Funksiya chaqirilmadi';"
    },
    {
      id: 7,
      title: "HTML shablon yaratish",
      instruction: "'title' o'zgaruvchisini HTML '<h1>' teglari ichiga joylashtirib, 'html' o'zgaruvchisiga yozing.",
      startingCode: "const title = 'Darslik';\n// HTML shablon yarating\nconst html = ``;\nconsole.log(html);",
      hint: "const html = `<h1>${title}</h1>`;",
      test: "if (html === '<h1>Darslik</h1>') return null; return 'HTML shablon noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Qo'shtirnoqlardan qochish",
      instruction: "Backtick ichida ham oddiy (') ham ikkitalik (\") qo'shtirnoq qatnashgan 'Men \"JS\"ni o'rganyapman' matnini yarating.",
      startingCode: "// Qo'shtirnoqlar bilan yozing\nconst quote = ``;\nconsole.log(quote);",
      hint: "const quote = `Men \"JS\"ni o'rganyapman`;",
      test: "if (quote.includes('\"JS\"') && quote.includes('o\\'rganyapman')) return null; return 'Matn kutilganidek emas';"
    },
    {
      id: 9,
      title: "Dinamik URL yaratish",
      instruction: "'userId' va 'postId' o'zgaruvchilaridan foydalanib 'https://api.com/users/[userId]/posts/[postId]' dinamik URL hosil qiling.",
      startingCode: "const userId = 45;\nconst postId = 102;\n// URL yarating\nconst url = ``;\nconsole.log(url);",
      hint: "const url = `https://api.com/users/${userId}/posts/${postId}`;",
      test: "if (url === 'https://api.com/users/45/posts/102') return null; return 'Dinamik URL noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Object xususiyatini ko'rsatish",
      instruction: "'user' obyektining 'brand' va 'model' xususiyatlarini template literal orqali 'Mashina: [brand] [model]' ko'rinishida yozing.",
      startingCode: "const car = { brand: 'BYD', model: 'Song Plus' };\n// Obyekt qiymatlarini ishlating\nconst message = ``;\nconsole.log(message);",
      hint: "const message = `Mashina: ${car.brand} ${car.model}`;",
      test: "if (message === 'Mashina: BYD Song Plus' && code.includes('car.brand')) return null; return 'Obyekt qiymatlari noto\\'g\\'ri chiqdi';"
    },
    {
      id: 11,
      title: "Massivni matnga aylantirish",
      instruction: "'tags' massivini template literal ichida `.join(', ')` orqali birlashtirib 'Kalit so'zlar: [tags]' ko'rinishiga keltiring.",
      startingCode: "const tags = ['js', 'html', 'css'];\n// Massivni birlashtiring\nconst result = ``;\nconsole.log(result);",
      hint: "const result = `Kalit so'zlar: ${tags.join(', ')}`;",
      test: "if (result === 'Kalit so\\'zlar: js, html, css' && code.includes('tags.join')) return null; return 'Massiv noto\\'g\\'ri birlashtirildi';"
    },
    {
      id: 12,
      title: "Kompleks - Xarid Cheki",
      instruction: "'item', 'price', va 'qty' yordamida ko'p qatorli chek matnini tayyorlang va oxirida jami summani hisoblang.",
      startingCode: "const item = 'Kitob';\nconst price = 25000;\nconst qty = 3;\n// Chek matnini yozing\nconst receipt = ``;\nconsole.log(receipt);",
      hint: "const receipt = `Nomi: ${item}\nSoni: ${qty}\nJami: ${price * qty}`;",
      test: "if (receipt.includes('Kitob') && receipt.includes('75000') && receipt.includes('\\n')) return null; return 'Chek matni noto\\'g\\'ri';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Template Literals (andoza matnlar) JavaScript-da qaysi maxsus belgilar yordamida yaratiladi?",
      options: [
        "Oddiy qo'shtirnoqlar (`' '`)",
        "Ikkitalik qo'shtirnoqlar (`\" \"`)",
        "Grave accent / Backticks (`` ` ` ``)",
        "Qavslar (`( )`)"
      ],
      correctAnswer: 2,
      explanation: "Template Literals klaviaturadagi `Esc` tugmasi ostida joylashgan yordamchi backtick (`` ` ``) belgilari bilan o'rab olinadi."
    },
    {
      id: 2,
      question: "Template Literals ichida o'zgaruvchi yoki matematik ifodalarni joylashtirish uchun qaysi sintaksis ishlatiladi?",
      options: [
        "`#{expression}`",
        "`${expression}`",
        "`{{expression}}`",
        "`[expression]`"
      ],
      correctAnswer: 1,
      explanation: "`Dollar` belgisi va undan keyin jingalak qavslar `${...}` yordamida matn ichiga istalgan JavaScript o'zgaruvchisini yoki hisob-kitob amalini joylashtirish mumkin."
    },
    {
      id: 3,
      question: "Eski string birlashtirish (`+` operatori) usuli bilan solishtirganda, Backticks (`` ` ``) yordamida ko'p qatorli (multi-line) matnlarni qanday yozish mumkin?",
      options: [
        "Faqat `\\n` belgisini qo'shib yozish orqali",
        "Hech qanday maxsus belgisiz, shunchaki kodda \"Enter\" tugmasini bosib yangi qatorga o'tish orqali",
        "Har bir qator oxirida `+` belgisini qo'yish orqali",
        "Ko'p qatorli matnlarni backtick bilan yozib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Backticks ishlatilganda yangi qatorlar avtomatik tarzda satr tarkibiga qo'shiladi va hech qanday `\\n` kabi belgilarni yozish shart emas."
    },
    {
      id: 4,
      question: "Quyidagi template literal ifodasi konsolda nima natija qaytaradi: `` `Jami: ${5 + 5}` ``?",
      options: [
        "`\"Jami: 5 + 5\"`",
        "`\"Jami: 10\"`",
        "`\"Jami: ${5 + 5}\"`",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar ichidagi `5 + 5` ifodasi dastur tomonidan bajariladi va uning natijasi (`10`) matnga birlashtiriladi."
    },
    {
      id: 5,
      question: "Template literal ichidagi `${expression}` qismi qanday ishlaydi?",
      options: [
        "U faqat oddiy matnlarni o'zgarishsiz chop etadi",
        "Uning ichidagi JavaScript kodi (ifoda) bajariladi va natijasi avtomatik ravishda satrga (string) o'girilib, o'sha joyga joylashtiriladi",
        "U if-else va for looplarini bajarishga mo'ljallangan",
        "U faqat CSS o'zgaruvchilarini yuklaydi"
      ],
      correctAnswer: 1,
      explanation: "Tizim jingalak qavslar ichida yozilgan kodni oddiy JavaScript kodi sifatida bajaradi va hosil bo'lgan qiymatni stringga aylantiradi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet check = false;\nconsole.log(`Holat: ${check ? 'Faol' : 'Nofaol'}`);\n```",
      options: [
        "`Holat: check`",
        "`Holat: Nofaol` (ternary operator shartga ko'ri Nofaol qaytaradi)",
        "`Holat: Faol`",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "`check` o'zgaruvchisi `false` bo'lganligi uchun ternary operator `Nofaol` qiymatini qaytaradi va u matnga qo'shiladi."
    },
    {
      id: 7,
      question: "Template literals yordamida HTML teglari bilan ishlashning qulayligi nimada?",
      options: [
        "U HTML elementlarini CSS-ga avtomatik bog'laydi",
        "Hech qanday `+` belgilarisiz, ko'p qatorli struktura va o'zgaruvchilarni toza va oson yozish imkonini beradi",
        "Brauzer yuklanishini tezlashtiradi",
        "Faqat server tomonida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Template literals ko'p qatorli HTML andozalarini yozishda eng toza sintaksisni taqdim qiladi, chunki `+` yoki `\\n` ishlatish shart bo'lmaydi."
    },
    {
      id: 8,
      question: "Backtick ichida backtick belgisini (` ` `) matn sifatida ko'rsatish uchun qaysi sintaksisdan foydalaniladi?",
      options: [
        "`/``",
        "`\\`` (backslash bilan escape qilish)",
        "`^``",
        "Grave accentni to'g'ridan-to'g'ri yozib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Teskari slash (`\\`) belgisi yordamida maxsus vazifaga ega backtickni oddiy matn sifatida escape qilish mumkin."
    },
    {
      id: 9,
      question: "Quyidagi yozuvlarning qaysi birida `name` o'zgaruvchisining qiymati to'g'ri ko'rsatiladi?",
      options: [
        "`'Salom, ${name}'`",
        "`\"Salom, ${name}\"`",
        "`` `Salom, ${name}` `` (backticks qo'llanilganda)",
        "`(Salom, ${name})`"
      ],
      correctAnswer: 2,
      explanation: "Faqat backticks (`` ` ``) bilan o'ralgan stringdagina `${}` interpolatsiyasi ishlaydi. Oddiy qo'shtirnoqlarda u shunchaki matn hisoblanadi."
    },
    {
      id: 10,
      question: "Template literal ichida `${}` qavslar orasida qanday kod bloklarini to'g'ridan-to'g'ri yozib bo'lmaydi?",
      options: [
        "Matematik hisoblar",
        "Ternary operatorlar",
        "`if` yoki `for` kabi to'liq shart/sikl statementlarini (bloklarini)",
        "O'zgaruvchi nomlarini"
      ],
      correctAnswer: 2,
      explanation: "`${}` faqat ifoda (expression) qabul qiladi. Statement-lar (if, for) qiymat qaytarmaydigan kod bloklari bo'lgani uchun SyntaxError beradi. Ularning o'rniga ternary yoki funksiyalar ishlatiladi."
    },
    {
      id: 11,
      question: "Template literal ichida `${undefined}` yoki `${null}` yozilsa, nima chop etiladi?",
      options: [
        "Xatolik yuz beradi",
        "Bo'sh joy qoladi",
        "`'undefined'` va `'null'` so'zlari matn ko'rinishida chiqadi",
        "Natija 0 bo'ladi"
      ],
      correctAnswer: 2,
      explanation: "JavaScript `${}` ichidagi har qanday qiymatni implicitly stringga o'gira oladi. `undefined` va `null` qiymatlari mos ravishda `'undefined'` va `'null'` so'zlariga aylanadi."
    },
    {
      id: 12,
      question: "Tagged Template Literals nima?",
      options: [
        "Faqat CSS-da ishlaydigan template turi",
        "Template literalni maxsus funksiya yordamida parse (tahlil) qilish va qayta ishlash imkonini beruvchi mexanizm",
        "HTML teglarini tozalovchi validator",
        "Faqat JSON formatini o'quvchi metod"
      ],
      correctAnswer: 1,
      explanation: "Tagged templates yordamida template literal boshiga maxsus funksiya nomini yozib, stringni va uning ichidagi ifodalarni massiv holida qabul qilib qayta ishlash mumkin."
    }
  ]
};
