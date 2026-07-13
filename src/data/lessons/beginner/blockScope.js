export const blockScopeLesson = {
  id: "blockScopeLesson",
  title: "Blok Ko'lami (Block Scope)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Blok Ko'lami (Block Scope) nima?
Blok ko'lami — bu o'zgaruvchining faqat o'zi e'lon qilingan figurali qavslar \\\`{ ... }\\\` (blok) ichida ko'rinishi va undan tashqarida mavjud bo'lmasligidir. JavaScript-da \\\`let\\\` va \\\`const\\\` yordamida e'lon qilingan o'zgaruvchilar blok ko'lamiga ega. O'z navbatida, \\\`var\\\` kalit so'zi blok ko'lamini mutlaqo hisobga olmaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz ko'p xonali **shaxsiy uyda** yashayapsiz:
* **\\\`let\\\` va \\\`const\\\` (Xonadagi shaxsiy buyumlar):** Siz xonangizning ichiga seyf qo'ydingiz va u yerda shaxsiy kundaligingizni saqlaysiz. Uyning boshqa xonasidagi odamlar u yerga kira olmaydi va u buyumni ko'ra olmaydi. Agar kimdir tashqaridan kundalikni so'rasa, "bunday buyum yo'q" deb javob beriladi (ReferenceError).
* **\\\`var\\\` (Megafonli odam):** Siz xonangiz ichida turib megafonda baqiryapsiz. Garchi siz xona ichida bo'lsangiz ham, ovozingiz butun uyga tarqaladi. Uyning istalgan burchagidagi odam sizni eshitishi mumkin, chunki ovoz xona chegarasidan (blokdan) tashqariga sizib chiqqan.

## 2. ⚙️ Qanday Ishlaydi (Under the Hood)

### Leksik Muhit (Lexical Environment) va Bloklar
JavaScript dvigateli (masalan, Chrome brauzeridagi V8) kodni bajarishda **Bajarilish Konteksti (Execution Context)** va **Leksik Muhit (Lexical Environment)** konsepsiyalaridan foydalanadi:

1. **Blokga kirish:** Dvigatel biror blokni \\\`{\\\` boshlaganda, joriy leksik muhitni vaqtincha muzlatib, blok uchun yangi alohida leksik muhit yaratadi.
2. **Environment Record:** Blok uchun ochilgan muhit ikki qismdan iborat:
   * **Declarative Environment Record:** Blok doirasidagi \\\`let\\\`, \\\`const\\\`, \\\`class\\\` e'lonlarini saqlaydi.
   * **Outer reference (Tashqi havola):** Ota (tashqi) blok yoki funktsiyaning leksik muhitiga ishora qiladi.
3. **Hoisting va TDZ:** Blok ichidagi \\\`let\\\` va \\\`const\\\` o'zgaruvchilari ham hoist qilinadi (tepaga ko'tariladi), lekin ularga boshlang'ich qiymat berilmaydi. Ular **Temporal Dead Zone (TDZ)** da qoladi va e'lon qilingan qatordan oldin ishlatilsa \\\`ReferenceError\\\` beradi.
4. **\\\`var\\\` ning chetlab o'tishi:** \\\`var\\\` kalit so'zi blok muhitini chetlab o'tadi va global yoki funksiya muhitiga (Variable Environment) tushadi. Shuning uchun u blokdan sizib chiqadi.
5. **Blokdan chiqish:** Blok tugagach \\\`}\\\`, uning shaxsiy leksik muhiti xotiradan o'chadi va ichidagi \\\`let\\\`/\\\`const\\\` o'zgaruvchilar tozalanadi (Garbage Collection).

### Xotira (Memory) va Performance
* **Garbage Collector (Axlat yig'uvchi):** Blok ko'lami xotira (RAM) sarfini tejaydi. Blok yopilishi bilan ichidagi o'zgaruvchilarga bo'lgan havolalar o'chadi va tezda xotiradan tozalanadi.
* **V8 Optimallashtirishlari:** Zamonaviy V8 dvigatellari \\\`let\\\` va \\\`const\\\` ga asoslangan kodni tezroq va xavfsizroq tahlil qiladi. O'zgarmas \\\`const\\\` lar dvigatelga optimizatsiya qilishda qulayroq imkoniyat beradi.

## 3. 🛡️ Edge Cases and Senior Interview Questions

### Edge Cases
1. **Asinxron Tsikl Muammosi:**
\\\`\\\`\\\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}
// Natija: 3, 3, 3
\\\`\\\`\\\`
Chunki \\\`var\\\` bitta umumiy o'zgaruvchi yaratadi va asinxron funksiyalar qiymat o'qigunicha u oxirgi 3 ga yetib qoladi.
2. **Switch Blokidagi o'zgaruvchilar:**
\\\`\\\`\\\`javascript
switch(x) {
  case 1:
    let a = 10;
    break;
  case 2:
    // let a = 20; // SyntaxError: Identifier 'a' has already been declared
    break;
}
\\\`\\\`\\\`
\\\`switch\\\` da bitta katta blok mavjud. Agar har bir \\\`case\\\` uchun mustaqil blok kerak bo'lsa, ularni \\\`{\\\` va \\\`}\\\` bilan o'rash kerak.

### Senior Interview Questions
1. **Savol:** Temporal Dead Zone (TDZ) nima va u qachon sodir bo'ladi?
   * **Javob:** TDZ — bu blok boshlangan joydan to o'zgaruvchi (\\\`let\\\`/\\\`const\\\`) haqiqiy e'lon qilingan satrgacha bo'lgan oraliq. Bu hududda o'zgaruvchiga murojaat qilish \\\`ReferenceError\\\` xatosiga sabab bo'ladi.
2. **Savol:** Variable Shadowing (soya qilish) nima?
   * **Javob:** Variable Shadowing — ichki blok doirasida tashqi doiradagi o'zgaruvchi bilan bir xil nomdagi yangi o'zgaruvchining e'lon qilinishi. Bunda ichki doiradagi o'zgaruvchi tashqarisidagisini yashirib turadi.
3. **Savol:** Nima uchun ES6 dan keyin IIFE (Immediately Invoked Function Expressions) dan foydalanish kamaydi?
   * **Javob:** IIFE asosan \\\`var\\\` o'zgaruvchilarini ma'lum bir doirada yashirish va global sohaga sizib chiqishini oldini olish uchun ishlatilgan. ES6 blok ko'lami va oddiy bloklar (\\\`{}\\\`) bilan IIFE ga ehtiyoj deyarli yo'qoldi.
4. **Savol:** Global doirada \\\`var\\\` va \\\`let\\\` o'rtasida window obyekti nuqtai nazaridan qanday farq bor?
   * **Javob:** Global ko'lamda \\\`var\\\` yordamida yaratilgan o'zgaruvchi brauzerda \\\`window\\\` obyektining xususiyatiga aylanadi (\\\`window.x\\\`). \\\`let\\\` esa global doirada e'lon qilinsa ham \\\`window\\\` ga birikmaydi.

## 4. 📊 Bajarilish Oqimi Diagrammasi (Control Flow)

\\\`\\\`\\\`mermaid
graph TD
    ScopeStart[Kodni Bajarish: Global yoki Funktsiya Doirasi] --> BlockStart[Blok Boshi: block ochilishi]
    BlockStart --> ScopeSplit{O'zgaruvchi Turi}
    
    ScopeSplit -- let / const --> BlockBound[Blok Ichida Cheklangan]
    ScopeSplit -- var --> EscapesBlock[Blokdan Tashqariga Sizadi]
    
    BlockBound --> BlockEnd[Blok Tugashi: Xotiradan ochadi]
    EscapesBlock --> OuterScopeAccess[Tashqi Scope-da saqlanib qoladi]
    
    BlockEnd --> RefErr[Tashqaridan chaqirilganda: ReferenceError]
    OuterScopeAccess --> SuccessVal[Tashqaridan chaqirilganda: Muvaffaqiyatli chop etiladi]
\\\`\\\`\\\`
`,
  exercises: [
    {
      "id": 1,
      "title": "Tsikl ichida Block Scope",
      "instruction": "Berilgan sonlar massividagi faqat musbat sonlar kvadratlarining yig'indisini hisoblaydigan \`sumOfPositiveSquares(numbers)\` funksiyasini yozing. Tsikl va uning ichidagi \`if\` sharti ichida o'zgaruvchilarni e'lon qilishda faqat \`let\` yoki \`const\` kalit so'zlaridan foydalaning (umuman \`var\` kalit so'zini ishlatmang). Har bir musbat son kvadratini alohida block scope ichida \`square\` o'zgaruvchisiga yuklab, keyin yig'indiga qo'shing.",
      "startingCode": "function sumOfPositiveSquares(numbers) {\n  let total = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    // Kodni shu yerda yozing\n  }\n  return total;\n}",
      "hint": "if (numbers[i] > 0) { const square = numbers[i] * numbers[i]; total += square; } blokidan foydalaning.",
      "test": "if (code.includes('var')) return \"Kodingizda 'var' kalit so'zidan foydalanmang! Block scope ta'sirini ko'rsatish uchun faqat let yoki const ishlating.\";\nconst sandbox = new Function(code + '; return sumOfPositiveSquares;');\nconst fn = sandbox();\nconst res1 = fn([2, -3, 4]);\nconst res2 = fn([-1, -2, -5]);\nconst res3 = fn([1, 2, 3]);\nif (res1 === 20 && res2 === 0 && res3 === 14) return null;\nreturn 'Kalkulyatsiya xato yoki kutilgan natija olinmadi. Musbat sonlar kvadratlarini to\\'g\\'ri hisoblang.';"
    },
    {
      "id": 2,
      "title": "Asinxron Tsikl Muammosi",
      "instruction": "Massivga 3 ta callback funksiyani joylashtirib qaytaruvchi \`createDelayedCallbacks()\` funksiyasini yozing. Har bir callback funksiya chaqirilganda o'zining tsikldagi indeksini (0, 1, 2) qaytarishi kerak. Tsikl o'zgaruvchisini block scope da saqlab qolish uchun \`let\` dan to'g'ri foydalaning.",
      "startingCode": "function createDelayedCallbacks() {\n  const callbacks = [];\n  // Tsiklni block scope-dan foydalanib yozing\n  for (let i = 0; i < 3; i++) {\n    callbacks.push(function() {\n      // Kodni shu yerda yozing\n    });\n  }\n  return callbacks;\n}",
      "hint": "Callback funksiya ichida shunchaki \`return i;\` qiling. Tsikl boshida \`let i\` yozilgani sababli, har bir callback o'zining shaxsiy block-scoped \`i\` nusxasini saqlab qoladi.",
      "test": "if (code.includes('var')) return \"Kodingizda var ishlatmang! Har bir iteratsiya uchun alohida block scope yaratish uchun faqat let ishlatilishi shart.\";\nconst sandbox = new Function(code + '; return createDelayedCallbacks;');\nconst fn = sandbox();\nconst cbList = fn();\nif (cbList.length !== 3) return 'Massivda ro\\'ppa-rosa 3 ta callback bo\\'lishi kerak.';\nif (cbList[0]() === 0 && cbList[1]() === 1 && cbList[2]() === 2) return null;\nreturn 'Callbacklar noto\\'g\\'ri indekslarni qaytardi. Block scope muammosini let yordamida hal qiling.';"
    },
    {
      "id": 3,
      "title": "O'zgaruvchini Soya Qilish (Shadowing)",
      "instruction": "Sizga global (yoki tashqi doiradagi) o'zgaruvchi \`value = 10\` berilgan. Funksiya ichida yangi blok \`{}\` oching. Ushbu blok ichida \`value\` o'zgaruvchisini \`let\` orqali qayta e'lon qilib, unga \`20\` qiymatini bering va bu qiymatni tashqaridagi \`innerValue\` o'zgaruvchisiga o'zlashtiring. Blokdan chiqilganda, tashqi \`value\` qiymati o'zgarmasdan \`10\`ligicha qolishi kerak.",
      "startingCode": "function testShadowing() {\n  let value = 10;\n  let innerValue;\n  \n  // Kodni shu yerda yozing\n  \n  return [innerValue, value];\n}",
      "hint": "{\n  let value = 20;\n  innerValue = value;\n} ko'rinishidagi blokdan foydalaning.",
      "test": "if (!code.includes('{') || !code.includes('}')) return \"Blokdan (curly braces) foydalanilmagan!\";\nif (code.includes('var')) return \"Kodingizda 'var' ishlatmang!\";\nconst sandbox = new Function(code + '; return testShadowing;');\nconst fn = sandbox();\nconst res = fn();\nif (res[0] === 20 && res[1] === 10) return null;\nreturn \"Natija kutilgandek emas. Blok ichida 'value' o'zgaruvchisini soya qilib (shadowing) uni 20 ga tenglang.\";"
    },
    {
      "id": 4,
      "title": "TDZ (Temporal Dead Zone) ni to'g'irlash",
      "instruction": "\`getScore\` funksiyasida \`score\` o'zgaruvchisi TDZ da turib chaqirilganligi xatoga olib keladi. Buni to'g'irlab, \`score\` 100 qiymatini qaytaring.",
      "startingCode": "function getScore() {\n  return score;\n  let score = 100;\n}",
      "hint": "\`let score = 100;\` e'lonini \`return\` qatoridan oldinga oling.",
      "test": "try {\n  const fn = new Function(code + '; return getScore;');\n  const res = fn()();\n  if (res === 100) return null;\n  return 'Funksiya 100 qaytarishi kerak.';\n} catch(e) {\n  return 'Xato bor: ' + e.message;\n}"
    },
    {
      "id": 5,
      "title": "If-else Block Scope",
      "instruction": "\`getUserRole(isAdmin)\` funksiyasida \`role\` tashqarida \`'guest'\` deb o'rnatilgan. \`if(isAdmin)\` bloki ichida yangi \`role\` o'zgaruvchisini soya qilish (shadowing) orqali \`'admin'\` qilib e'lon qiling, lekin tashqaridagi \`role\` o'zgarmasin.",
      "startingCode": "function getUserRole(isAdmin) {\n  let role = 'guest';\n  if (isAdmin) {\n    // Shu yerda role ni admin qilib shadowing qiling\n  }\n  return role;\n}",
      "hint": "if blokining ichida \`let role = 'admin';\` deb yozing.",
      "test": "if (!code.includes('let role')) return 'let bilan o\\'zgaruvchi yarating';\nconst fn = new Function(code + '; return getUserRole;');\nconst res1 = fn()(true);\nconst res2 = fn()(false);\nif (res1 === 'guest' && res2 === 'guest') return null;\nreturn 'Tashqaridagi role har doim guest bo\\'lib qolishi kerak (shadowing to\\'g\\'ri qilinmagan).';"
    },
    {
      "id": 6,
      "title": "Switch Blokidagi Xatolikni Tuzatish",
      "instruction": "\`getAccessLevel\` funksiyasida switch blokida o'zgaruvchini qayta e'lon qilish xatosi mavjud. Ikkita \`case\` da \`level\` nomli o'zgaruvchi ishlatilgan, buning oldini olish uchun har bir \`case\` ga \`{}\` (blok) qo'shing.",
      "startingCode": "function getAccessLevel(type) {\n  switch(type) {\n    case 'admin':\n      let level = 10;\n      return level;\n    case 'user':\n      let level = 5;\n      return level;\n    default:\n      return 0;\n  }\n}",
      "hint": "Har bir case dan keyin figurali qavslar \`{ ... }\` ochib blok yarating.",
      "test": "try {\n  const fn = new Function(code + '; return getAccessLevel;');\n  if (fn()('admin') === 10 && fn()('user') === 5) return null;\n  return 'Noto\\'g\\'ri natija qaytdi.';\n} catch (e) {\n  return 'Sintaktik xato hal qilinmagan. case dan so\\'ng blok ochiqmi?';\n}"
    },
    {
      "id": 7,
      "title": "Const Blokda O'zlashtirish",
      "instruction": "\`getBlockConfig\` funksiyasida blok \`{}\` ichida \`config\` nomli o'zgarmas (\`const\`) obyekt yarating va unga \`{ active: true }\` qiymatini bering. Uni \`return\` yordamida tashqariga chiqarib yuboradigan result o'zgaruvchisiga tenglang. (Tashqaridagi \`config\` ga tegmang).",
      "startingCode": "function getBlockConfig() {\n  const config = { active: false };\n  let result;\n  {\n    // Shu yerda yangi const config = { active: true } e'lon qiling\n    // result o'zgaruvchisiga o'zlashtiring\n  }\n  return result;\n}",
      "hint": "Blok ichida \`const config = { active: true }; result = config;\` deb yozing.",
      "test": "const fn = new Function(code + '; return getBlockConfig;');\nconst res = fn()();\nif (res && res.active === true) return null;\nreturn 'Natija kutilgandek emas. const shadowing to\\'g\\'ri qiling.';"
    },
    {
      "id": 8,
      "title": "For loop ichida Const Shadowing",
      "instruction": "Massiv elementlarini aylantiruvchi \`processItems\` funksiyasida loop ichida har bir iteratsiya uchun o'zgarmas \`item\` o'zgaruvchisini yarating va uni yangi massivga yig'ing.",
      "startingCode": "function processItems(arr) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    // item nomli const yarating va arr[i] ga tenglang\n    \n    result.push(item);\n  }\n  return result;\n}",
      "hint": "const item = arr[i];",
      "test": "const fn = new Function(code + '; return processItems;');\nconst res = fn()([1,2,3]);\nif (res.join(',') === '1,2,3' && code.includes('const item')) return null;\nreturn 'Loop ichida const yordamida o\\'zgaruvchi olinganligiga ishonch hosil qiling.';"
    },
    {
      "id": 9,
      "title": "Var sizib chiqishini to'xtatish",
      "instruction": "\`varLeak\` funksiyasida blok \`{}\` ichida e'lon qilingan \`message\` o'zgaruvchisi tashqariga sizib chiqyapti. Uni blok doirasida saqlash uchun kalit so'zni o'zgartiring va funksiya tashqarisidagi qismda xatolik bersin.",
      "startingCode": "function varLeak() {\n  {\n    var message = \"Secret!\";\n  }\n  try {\n    return message;\n  } catch (e) {\n    return \"Blocked!\";\n  }\n}",
      "hint": "\`var\` o'rniga \`let\` yoki \`const\` ishlating.",
      "test": "const fn = new Function(code + '; return varLeak;');\nif (fn()() === 'Blocked!') return null;\nreturn 'message o\\'zgaruvchisi hali ham sizib chiqyapti. let ishlating.';"
    },
    {
      "id": 10,
      "title": "Catch blokidagi xato o'zgaruvchisi",
      "instruction": "\`handleError\` funksiyasida \`try-catch\` dan foydalaning. \`catch (err)\` bloki o'ziga xos blok ko'lamiga ega. Xato sodir bo'lganda \`err.message\` ni qaytaring, aks holda \`'Success'\` qaytaring.",
      "startingCode": "function handleError(throwError) {\n  try {\n    if (throwError) throw new Error(\"Something went wrong\");\n    return \"Success\";\n  } catch (err) {\n    // Xato yuz berganda err.message ni qaytaring\n  }\n}",
      "hint": "return err.message;",
      "test": "const fn = new Function(code + '; return handleError;');\nif (fn()(true) === 'Something went wrong' && fn()(false) === 'Success') return null;\nreturn 'Catch blokidan xato xabarini to\\'g\\'ri qaytarish kerak.';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript-da blok ko'lami (block scope) nima bilan aniqlanadi?",
      "options": [
        "Figurali qavslar \`{}\` yordamida yaratilgan har qanday blok bilan",
        "Faqat \`function\` kalit so'zi bilan",
        "Faqat dumaloq qavslar \`()\` bilan",
        "Maxsus \`scope\` kalit so'zi bilan"
      ],
      "correctAnswer": 0,
      "explanation": "JavaScript-da blok doirasi figurali qavslar \`{}\` yordamida belgilanadi. Bloklar \`if\`, \`for\`, \`while\` yoki shunchaki bare block (oddiy bloklar) bo'lishi mumkin."
    },
    {
      "id": 2,
      "question": "Quyidagi o'zgaruvchilardan qaysi biri blok ko'lamiga (block scope) ega?",
      "options": [
        "\`let\` va \`const\`",
        "Faqat \`var\`",
        "\`var\` va \`let\`",
        "\`var\`, \`let\` va \`const\`"
      ],
      "correctAnswer": 0,
      "explanation": "ES6 (ES2015) da joriy qilingan \`let\` va \`const\` o'zgaruvchilari blok ko'lamiga ega. O'z navbatida \`var\` funktsional yoki global ko'lamga ega."
    },
    {
      "id": 3,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nif (true) {\\n  var a = 5;\\n  let b = 10;\\n}\\nconsole.log(a);\\nconsole.log(b);\\n```",
      "options": [
        "Avval \`5\` chiqadi, so'ng \`ReferenceError: b is not defined\` xatosi yuz beradi",
        "\`5\` va \`10\` chiqadi",
        "\`ReferenceError: a is not defined\` xatosi yuz beradi",
        "\`undefined\` va \`undefined\` chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "\`var\` blok ko'lamini hisobga olmaydi, shuning uchun \`a\` o'zgaruvchisiga blok tashqarisidan ham kirish mumkin. \`let b\` esa faqat \`if\` bloki ichida mavjud, shuning uchun tashqarida \`ReferenceError\` xatosi chiqadi."
    },
    {
      "id": 4,
      "question": "Temporal Dead Zone (Vaqtinchalik O'lik Zona - TDZ) nima?",
      "options": [
        "Blok boshlanishidan to o'zgaruvchi (\`let\`/\`const\`) e'lon qilingan qatorgacha bo'lgan, o'zgaruvchiga kirish taqiqlangan hudud",
        "Sikl ishlashni to'xtatgan paytdagi vaqt oralig'i",
        "Xotirada foydalanilmaydigan o'zgaruvchilar o'chib ketadigan vaqt",
        "\`setTimeout\` ishlashini kutish vaqti"
      ],
      "correctAnswer": 0,
      "explanation": "TDZ — bu blok boshidan o'zgaruvchi e'lon qilinadigan satrgacha bo'lgan vaqt oralig'i. Bu hududda \`let\` yoki \`const\` o'zgaruvchisidan foydalanish \`ReferenceError\` xatosini beradi."
    },
    {
      "id": 5,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\n{\\n  let x = 1;\\n  {\\n    let x = 2;\\n    console.log(x);\\n  }\\n  console.log(x);\\n}\\n```",
      "options": [
        "\`2\` va \`1\`",
        "\`1\` va \`2\`",
        "\`2\` va \`2\`",
        "\`ReferenceError\` xatosi chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "Ichki blokdagi \`let x = 2\` o'zgaruvchisi tashqi blokdagi \`x\`ni soya qiladi (shadowing). Ichki blok tugagach, yana tashqi blokdagi \`x\` (ya'ni 1) ko'rinadi."
    },
    {
      "id": 6,
      "question": "Quyidagi kodda qanday muammo yuz beradi?\\n```javascript\\nconsole.log(myVar);\\nconsole.log(myLet);\\nvar myVar = 'A';\\nlet myLet = 'B';\\n```",
      "options": [
        "Avval \`undefined\` chiqadi, keyin \`ReferenceError\` xatosi beradi",
        "Ikkalasida ham \`undefined\` chiqadi",
        "Ikkalasida ham \`ReferenceError\` beradi",
        "\`'A'\` va \`'B'\` chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "\`var\` o'zgaruvchisi hoist qilinib, \`undefined\` qiymatini oladi. \`let\` o'zgaruvchisi ham hoist qilinadi, lekin u TDZ da bo'lgani sababli e'londan oldin chaqirilsa \`ReferenceError\` xatosi chiqadi."
    },
    {
      "id": 7,
      "question": "Nima uchun \`for (var i = 0; i < 3; i++)\` tsikli ichidagi \`setTimeout\` callbacklari faqat oxirgi qiymatni chop etadi?",
      "options": [
        "Chunki \`var\` blok ko'lamiga ega emas va banyan iteratsiyalar bitta umumiy \`i\` o'zgaruvchisini ulashadi",
        "Chunki \`setTimeout\` doimo oxirgi elementni tanlaydi",
        "Chunki \`i++\` operatsiyasi juda sekin ishlaydi",
        "Chunki tsikl faqat 3 marta aylanadi"
      ],
      "correctAnswer": 0,
      "explanation": "\`var\` blok ko'lamiga ega bo'lmagani uchun butun tsikl davomida faqat bitta \`i\` o'zgaruvchisi mavjud bo'ladi. Asinxron \`setTimeout\` ishlaguncha \`i\` ning qiymati allaqachon 3 ga teng bo'lib bo'ladi. \`let\` ishlatilganda esa, har bir iteratsiya uchun alohida blok doirasi va shaxsiy \`i\` o'zgaruvchisi yaratiladi."
    },
    {
      "id": 8,
      "question": "Quyidagi qaysi blok turi o'zgaruvchilar doirasi uchun alohida blok (block scope) hisoblanadi?",
      "options": [
        "\`if-else\` blocklari, \`for\`/\`while\` loop blocklari va bare blocklar \`{}\`",
        "Faqat funktsiya bloklari",
        "Faqat \`switch\` bloklari",
        "Faqat class ta'riflari"
      ],
      "correctAnswer": 0,
      "explanation": "Qavslar \`{}\` yordamida yozilgan barcha \`if\`, \`else\`, \`for\`, \`while\` bloklari va shunchaki mustaqil (bare) bloklar \`let\` va \`const\` uchun yangi blok ko'lamini (block scope) hosil qiladi."
    },
    {
      "id": 9,
      "question": "Quyidagi kodning natijasi nima bo'ladi?\\n```javascript\\nconst user = { name: \\\"Ali\\\" };\\n{\\n  user.name = \\\"Vali\\\";\\n}\\nconsole.log(user.name);\\n```",
      "options": [
        "\`\"Vali\"\` chiqadi",
        "\`\"Ali\"\` chiqadi",
        "\`TypeError: Assignment to constant variable\`",
        "\`undefined\` chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "\`const\` o'zgaruvchining qayta o'zlashtirilishini (re-assignment) cheklaydi, ammo obyektning ichki xususiyatlarini (properties) o'zgartirishga to'sqinlik qilmaydi. Blok ichida uning xususiyati o'zgartirilishi mumkin."
    },
    {
      "id": 10,
      "question": "Global ko'lamda (global scope) \`var\` va \`let\` o'rtasidagi farq nima?",
      "options": [
        "\`var\` global \`window\` obyektida xususiyat yaratadi, \`let\` esa yaratmaydi",
        "\`let\` global doirada ishlamaydi",
        "\`var\` global doirada xato beradi",
        "Hech qanday farqi yo'q"
      ],
      "correctAnswer": 0,
      "explanation": "Brauzer muhitida global doirada \`var x = 5\` deb e'lon qilinsa, u \`window.x\` ga birikadi. \`let y = 10\` esa global doirada e'lon qilinsa ham \`window.y\` ga birikmaydi."
    },
    {
      "id": 11,
      "question": "\`try-catch\` blokidagi qaysi qism o'zining maxsus blok ko'lamiga ega bo'lib, undagi o'zgaruvchiga tashqaridan kirib bo'lmaydi?",
      "options": [
        "\`catch(error)\` qismidagi \`error\` argumenti",
        "\`try\` bloki ichidagi barcha \`var\` o'zgaruvchilar",
        "\`finally\` bloki ichidagi barcha o'zgaruvchilar",
        "Bunday maxsus doira mavjud emas"
      ],
      "correctAnswer": 0,
      "explanation": "\`catch(error)\` blokidagi \`error\` parametrining o'zi catch bloki uchun alohida blok doirasini hosil qiladi va faqat o'sha catch bloki ichida mavjud bo'ladi."
    },
    {
      "id": 12,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nlet x = 10;\\n{\\n  console.log(x);\\n  let x = 20;\\n}\\n```",
      "options": [
        "\`ReferenceError: Cannot access 'x' before initialization\`",
        "\`10\` chiqadi",
        "\`undefined\` chiqadi",
        "\`20\` chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "Blok ichida \`let x = 20\` e'lon qilingan. Bu blok ichidagi \`x\` tashqi doiradagi \`x\`ni yashiradi. Ammo \`console.log(x)\` bajarilganda, blok ichidagi \`x\` hali e'lon qilinmagan va u TDZ da joylashgan. Shuning uchun \`ReferenceError\` xatosi chiqadi."
    }
  ]
};
