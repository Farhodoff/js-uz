export const primitivesVsObjects = {
  id: "primitives-vs-objects",
  title: "Primitivlar vs Obyektlar",
  level: "Beginner",
  description: "JavaScriptda ma'lumotlarning xotirada saqlanish tamoyillari: qiymat bo'yicha (by value) va havola bo'yicha (by reference) ishlash.",
  theory: `## 1. NEGA kerak?
JavaScriptda bu mavzuni yaxshi tushunmaslik dasturda kutilmagan va aniqlash qiyin bo'lgan xatolarga (bug) sabab bo'ladi. Masalan, bitta obyekt o'zgaruvchisini o'zgartirsangiz, ikkinchi unga bog'liq bo'lgan o'zgaruvchi ham o'z-o'zidan o'zgarib ketadi. Buni tushunish va oldini olish uchun xotirada qiymatlar qanday saqlanishini bilish shart.

## 2. SODDALIK (Analogiya)
- **Primitiv (Qiymat bo'yicha):** Bu xuddi **qog'ozga yozilgan raqam** kabi. Agar do'stingizga o'sha raqamni bersangiz, u o'z qog'oziga nusxa ko'chiradi. U o'z qog'ozidagi yozuvni o'zgartirgani bilan sizning qog'ozingiz o'zgarmasdan qoladi.
- **Obyekt (Havola/Manzil bo'yicha):** Bu esa **Google Docs** hujjatiga o'xshaydi. Siz do'stingizga hujjatning o'zini emas, unga olib boradigan **havolani (link)** berasiz. Do'stingiz havola orqali kirib hujjatni o'zgartirsa, siz ochganingizda ham u o'zgargan bo'ladi, chunki ikkalangiz ham bitta umumiy obyektdan foydalanyapsiz.

## 3. STRUKTURA

### A. Primitivlar (By Value - Qiymat bo'yicha)
String, Number, Boolean, Null, Undefined, Symbol, BigInt turlari primitivdir va ular stack xotirada saqlanadi:
\`\`\`javascript
let a = 10;
let b = a; // qiymat nusxalandi
b = 20;
console.log(a); // 10 (a o'zgarmadi!)
\`\`\`

### B. Obyektlar (By Reference - Havola bo'yicha)
Obyektlar, Massivlar va Funksiyalar murakkab turlar bo'lib, heap xotirada saqlanadi. O'zgaruvchining o'zida esa faqat manzil ko'rsatkichi saqlanadi:
\`\`\`javascript
let obj1 = { ism: "Ali" };
let obj2 = obj1; // manzil nusxalandi
obj2.ism = "Vali";
console.log(obj1.ism); // "Vali" (obj1 ham o'zgarib qoldi!)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Mustaqil nusxa (Spread operator orqali shallow copy):
\`\`\`javascript
let original = { yosh: 25 };
let nusxa = { ...original }; // yangi obyekt yaratildi
nusxa.yosh = 30;
console.log(original.yosh); // 25 (o'zgarmasdan qoldi)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Obyektlarni taqqoslash:** \`{} === {}\` har doim \`false\` beradi. Chunki ular xotiradagi mutlaqo boshqa-boshqa manzillardir.
2. **Shunchaki tenglash:** \`obj2 = obj1\` deb obyektni ko'chirib bo'lmaydi, bu faqat manzilni ko'chirib, ikkala o'zgaruvchini bitta obyektga bog'laydi.
3. **Muzlatilgan obyekt:** \`Object.freeze(obj)\` qilingan obyektni o'zgartirishga harakat qilganda xato yuz beradi (strict mode da) yoki o'zgarish kuchga kirmaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Primitiv ma'lumot turlari qaysilar?**
String, Number, Boolean, Null, Undefined, Symbol va BigInt.

**2. Obyektlar qaysi guruhga kiradi?**
Murakkab (havola orqali uzatiladigan - reference types) ma'lumotlar guruhiga.

**3. "By Value" nima degani?**
O'zgaruvchilar nusxalanganda, xotirada haqiqiy qiymatning yangi nusxasi olinishini bildiradi.

**4. "By Reference" nima degani?**
O'zgaruvchi nusxalanganda, qiymat emas, balki uning xotiradagi havolasi (manzili) ko'chirilishini bildiradi.

**5. Nima uchun bitta massivni o'zgartirsak, ikkinchisi ham o'zgaradi?**
Chunki massivlar ham obyekt kabi reference turi hisoblanadi va manzili nusxalanadi.

**6. let x = 5; let y = x; y = 10; dan keyin x o'zgaradimi?**
Yo'q, chunki sonlar primitiv hisoblanadi va stackda alohida qiymat sifatida nusxalanadi.

**7. {} == {} natijasi nima?**
\`false\`, chunki ular xotiradagi ikkita turli bo'sh manzillardir.

**8. Obyekt xotira manzili nima?**
Obyekt Heap xotirasida saqlanadigan joyning ko'rsatkichi (havolasi).

**9. Immutable (o'zgarmas) turlar qaysi guruhga kiradi?**
Barcha primitiv turlar o'zgarmas hisoblanadi.

**10. Massivni qanday mustaqil nusxalash mumkin?**
Spread operatori yordamida: \`let nusxa = [...aslMassiv]\`.

**11. Funksiyalar primitivmi yoki obyekt?**
Funksiyalar chaqirilishi mumkin bo'lgan maxsus obyektlar (callable objects) hisoblanadi.

**12. null va undefined primitivmi?**
Ha, ikkalasi ham primitiv ma'lumot turlari guruhiga kiradi.
`,
  exercises: [
    {
      id: 1,
      title: "Manzilni tekshirish",
      instruction: "Ikkita yangi bo'sh obyekt yaratib ularni qat'iy tenglik (===) orqali solishtiring va natijani res o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = ({} === {});",
      test: "if (res === false) return null; return 'Obyektlar har doim alohida xotirada bo\\'ladi, natija false bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Primitiv nusxasi",
      instruction: "x o'zgaruvchisini y o'zgaruvchisiga o'zlashtiring va keyin y ning qiymatini 20 qiling. x o'zgaruvchisini o'z holicha qoldiring.",
      startingCode: "let x = 10;\n// Bu yerga yozing\nlet y = ",
      hint: "let y = x; y = 20;",
      test: "if (x === 10 && y === 20) return null; return 'x ning qiymati 10 bo\\'lib qolishi shart!';"
    },
    {
      id: 3,
      title: "Obyekt havolasi",
      instruction: "user obyektini admin o'zgaruvchisiga o'zlashtiring. Keyin admin.name qiymatini 'Vali' ga o'zgartiring.",
      startingCode: "let user = { name: 'Ali' };\n// Bu yerga yozing\nlet admin = ",
      hint: "let admin = user; admin.name = 'Vali';",
      test: "if (user.name === 'Vali' && admin.name === 'Vali') return null; return 'admin o\\'zgarganda user.name ham Vali bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Mustaqil obyekt nusxasi",
      instruction: "Spread operatoridan (...) foydalanib original obyektining nusxasini yarating va uni copy o'zgaruvchisiga saqlang. Keyin copy.age ni 30 qiling.",
      startingCode: "let original = { age: 25 };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = { ...original }; copy.age = 30;",
      test: "if (original.age === 25 && copy.age === 30) return null; return 'original.age 25 bo\\'lib qolishi shart!';"
    },
    {
      id: 5,
      title: "Massiv havolasi",
      instruction: "list1 massivini list2 o'zgaruvchisiga tenglang. Keyin list2 massiviga push() yordamida 3 sonini qo'shing.",
      startingCode: "let list1 = [1, 2];\n// Bu yerga yozing\nlet list2 = ",
      hint: "let list2 = list1; list2.push(3);",
      test: "if (list1.length === 3 && list1[2] === 3) return null; return 'list1 massiviga ham 3 soni qo\\'shilib qolishi kerak!';"
    },
    {
      id: 6,
      title: "Massiv nusxasi",
      instruction: "Spread operatori yordamida originalList massivining mustaqil nusxasini yarating va uni newList o'zgaruvchisiga saqlang. Keyin newList massiviga 3 sonini qo'shing.",
      startingCode: "let originalList = [1, 2];\n// Bu yerga yozing\nlet newList = ",
      hint: "let newList = [...originalList]; newList.push(3);",
      test: "if (originalList.length === 2 && newList.length === 3) return null; return 'originalList o\\'zgarmasdan qolishi kerak!';"
    },
    {
      id: 7,
      title: "Teng manzillar",
      instruction: "obj1 ni obj2 ga o'zlashtiring. Keyin ularni qat'iy tenglik (===) orqali tekshirib natijani res o'zgaruvchisiga saqlang.",
      startingCode: "let obj1 = { val: 10 };\n// Bu yerga yozing\nlet obj2 = \nlet res = ",
      hint: "let obj2 = obj1; let res = (obj1 === obj2);",
      test: "if (res === true) return null; return 'Havolalar bitta bo\\'lgani sababli res true bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Obyektni muzlatish",
      instruction: "Object.freeze() yordamida obj obyektini o'zgartirib bo'lmaydigan qilib muzlating.",
      startingCode: "let obj = { x: 5 };\n// Bu yerga yozing\n",
      hint: "Object.freeze(obj);",
      test: "if (Object.isFrozen(obj)) return null; return 'obj obyekti muzlatilishi shart!';"
    },
    {
      id: 9,
      title: "String o'zgarmasligi",
      instruction: "Matnlarning (string) o'zgarmasligini (immutability) tekshiring. str massiv kabi indeks orqali str[0] = 'S' deb o'zgartirib ko'ring (o'zgarmaydi) va uni chop eting.",
      startingCode: "let str = 'salom';\n// Bu yerga yozing\n",
      hint: "str[0] = 'S'; console.log(str);",
      test: "if (code.includes('[0]') && str === 'salom') return null; return 'String o\\'zgarib qolmasligini indeks orqali tekshiring!';"
    },
    {
      id: 10,
      title: "Havolaning uzilishi",
      instruction: "b o'zgaruvchisiga a obyektini o'zlashtiring. Keyin a o'zgaruvchisini butunlay yangi obyekt { n: 2 } ga o'zgartiring (buning natijasida b o'zgarmaydi).",
      startingCode: "let a = { n: 1 };\n// Bu yerga yozing\nlet b = ",
      hint: "let b = a; a = { n: 2 };",
      test: "if (b.n === 1 && a.n === 2) return null; return 'a yangilanganda b o\\'zgaruvchisi eski obyektda qolishi kerak!';"
    },
    {
      id: 11,
      title: "Shallow copy muammosi",
      instruction: "Spread yordamida user obyektini copy ga nusxalang. Keyin copy.info.age ni 25 qiling. Buning natijasida original ham o'zgarib qolishini ko'rasiz.",
      startingCode: "let user = { info: { age: 20 } };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = { ...user }; copy.info.age = 25;",
      test: "if (user.info.age === 25 && copy.info.age === 25) return null; return 'copy.info.age o\\'zgarganda user.info.age ham o\\'zgarib qolishi shart (shallow copy)!';"
    },
    {
      id: 12,
      title: "JSON Deep copy",
      instruction: "JSON.parse(JSON.stringify()) yordamida user obyektining to'liq chuqur nusxasini oling va uni copy o'zgaruvchisiga saqlang. Keyin copy.info.age ni 25 qiling.",
      startingCode: "let user = { info: { age: 20 } };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = JSON.parse(JSON.stringify(user)); copy.info.age = 25;",
      test: "if (user.info.age === 20 && copy.info.age === 25) return null; return 'Deep copy natijasida original obyekt o\\'zgarmasdan qolishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da primitiv (primitive) turlar va obyektlar (objects) xotirada qanday saqlanadi?",
      options: [
        "Primitivlar call stack-da qiymat bo'yicha (by value), obyektlar esa heap xotirada joylashib, stack-da ularga havola (by reference) saqlanadi",
        "Ikkalasi ham faqat call stack-da saqlanadi",
        "Ikkalasi ham faqat heap xotirada saqlanadi",
        "Obyektlar qiymat bo'yicha saqlanadi"
      ],
      correctAnswer: 0,
      explanation: "Primitiv turlar xotira hajmi kamligi va tezkorligi uchun bevosita call stack-da qiymat sifatida saqlanadi. Obyektlar kabi kattaroq ma'lumotlar esa heap xotirada saqlanadi va stack-da ularning faqat xotiradagi manzili (reference) saqlanib turadi."
    },
    {
      id: 2,
      question: "Quyidagilardan qanday natija qaytadi:\n```javascript\nlet user1 = { name: \"Ali\" };\nlet user2 = user1;\nuser2.name = \"Vali\";\nconsole.log(user1.name);\n```",
      options: [
        "`\"Ali\"`",
        "`\"Vali\"` (chunki user2 ga user1 ning xotiradagi havolasi berilgan, shuning uchun bitta obyektni ikkala o'zgaruvchi ham o'zgartiradi)",
        "`undefined`",
        "`TypeError` xatoligi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "`user2 = user1` qilinganda yangi obyekt yaratilmaydi, balki `user1` ga tegishli havola nusxalanadi. Natijada ikkala o'zgaruvchi xotiradagi bitta obyektga bog'lanadi va biridagi o'zgarish ikkinchisida ham aks etadi."
    },
    {
      id: 3,
      question: "Obyektni xotiradagi havolasini shunchaki ko'chirmasdan, uning tarkibidan yangi mustaqil nusxa (shallow copy) olishning eng oddiy usuli qaysi?",
      options: [
        "`let newObj = obj;`",
        "`let newObj = {...obj};` (spread operatori yordamida obyektning barcha xususiyatlarini yoyib nusxalash)",
        "`let newObj = Object.assign(obj);`",
        "`let newObj = obj.clone();`"
      ],
      correctAnswer: 1,
      explanation: "Spread `...` (yoyish) operatori orqali obyekt xususiyatlarini yangi yaratilgan obyekt jingalak qavslari ichiga ko'chirib, uning mustaqil nusxasini (shallow copy) olish mumkin."
    },
    {
      id: 4,
      question: "Nima uchun `{} === {}` solishtiruvi `false` qaytaradi?",
      options: [
        "Chunki obyektlar bo'sh bo'lganida teng hisoblanmaydi",
        "Chunki har safar `{}` yozilganda xotiradan yeni manzil ajratiladi va ular bir-biridan mutlaqo farq qiladi",
        "Bu JavaScript-dagi xatodir",
        "Obyektlarni qat'iy tenglik bilan solishtirib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Obyektlar qiymati bo'yicha emas, xotiradagi manzillari (reference) bo'yicha solishtiriladi. Ikki marta `{}` yozish xotirada ikkita alohida bo'sh obyekt yaratilishini bildiradi, shuning uchun ular teng emas."
    },
    {
      id: 5,
      question: "Quyidagilardan qaysi biri to'liq o'zgarmas (immutable - qiymati xotirada qayta yozilmaydigan) ma'lumot turlari guruhiga kiradi?",
      options: [
        "Faqat massivlar (Arrays)",
        "Barcha primitiv ma'lumot turlari (String, Number, Boolean, Null, Undefined, Symbol, BigInt)",
        "Faqat funksiyalar (Functions)",
        "Barcha obyektlar (Objects)"
      ],
      correctAnswer: 1,
      explanation: "Primitiv turlar immutable (o'zgarmas) hisoblanadi. Masalan, matn yoki sonning o'zini o'zgartirib bo'lmaydi, o'zgaruvchiga faqat yangi qiymat yuklanishi mumkin xolos. Obyektlar va massivlar esa mutable (o'zgaruvchan) hisoblanadi."
    },
    {
      id: 6,
      question: "Object.freeze(obj) metodi nima vazifani bajaradi?",
      options: [
        "Obyektni o'chirib yuboradi",
        "Obyektni muzlatadi, ya'ni unga yangi xususiyat qo'shish, o'chirish yoki mavjudlarini o'zgartirishni butunlay taqiqlaydi",
        "Obyekt manzillarini tozalaydi",
        "Obyektni satrga (JSON) o'tkazadi"
      ],
      correctAnswer: 1,
      explanation: "Object.freeze() metodi obyektni muzlatadi, uni o'zgartirib bo'lmaydigan holga keltiradi. Muzlatilgandan keyin obyekt tarkibi o'zgarmay qoladi."
    },
    {
      id: 7,
      question: "`let a = [1, 2]; let b = [1, 2]; console.log(a === b);` nima qaytaradi?",
      options: [
        "`true`",
        "`false` (chunki massivlar ham obyekt hisoblanib, xotirada turli manzillarda joylashgan)",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "Massivlar ham obyektlar kabi reference type (havola turi). `a` va `b` massivlari bir xil elementlarga ega bo'lsa-da, ularning xotiradagi manzili alohida, shuning uchun ular teng emas."
    },
    {
      id: 8,
      question: "String primitiv bo'lishiga qaramay, qanday qilib unda `.toUpperCase()` kabi obyekt metodlarini chaqirish mumkin?",
      options: [
        "String aslida obyekt turiga kiradi",
        "JavaScript kod ishga tushayotganda primitivni avtomatik ravishda vaqtinchalik 'Wrapper object'ga o'raydi va metodni bajarib, so'ngra obyektni yo'qotadi",
        "Buning uchun HTML kutubxonasi kerak bo'ladi",
        "Faqat maxsus brauzerlarda bu ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript string, number va boolean primitivlari uchun vaqtinchalik o'rab turuvchi obyektlar (String, Number, Boolean obyektlari) yaratadi, metod chaqirilgach esa ularni o'chirib tashlaydi."
    },
    {
      id: 9,
      question: "Obyektlar kompyuterning qaysi xotira sohasida saqlanadi?",
      options: [
        "Stack xotirasida",
        "Heap xotirasida (chunki ularning hajmi oldindan ma'lum emas va dinamik ravishda o'zgarishi mumkin)",
        "Faqat kesh xotirada",
        "Qattiq diskda"
      ],
      correctAnswer: 1,
      explanation: "Stack xotirasi kichik va tezkor bo'lib, primitivlarni saqlaydi. Heap xotirasi esa o'zgaruvchan o'lchamdagi obyektlarni va massivlarni saqlash uchun mo'ljallangan kengroq xotiradir."
    },
    {
      id: 10,
      question: "Obyektning o'zgaruvchisida stack xotirasida nima saqlanadi?",
      mtdoptions: [
        "Obyektning to'liq nusxasi",
        "Hech narsa saqlanmaydi",
        "Obyektning heap xotirasidagi joylashuv manzili (reference)",
        "Faqat uning kalitlari"
      ],
      options: [
        "Obyektning to'liq nusxasi",
        "Hech narsa saqlanmaydi",
        "Obyektning heap xotirasidagi joylashuv manzili (reference)",
        "Faqat uning kalitlari"
      ],
      correctAnswer: 2,
      explanation: "O'zgaruvchi e'lon qilinganda stack xotirasida uning nomi va heap xotiradagi haqiqiy obyekt manzili (havolasi) yozib qo'yiladi."
    },
    {
      id: 11,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nlet s = \"hello\";\ns.x = 5;\nconsole.log(s.x);\n```",
      options: [
        "`5`",
        "`undefined` (chunki wrapper obyekt metod tugashi bilanoq yo'q qilinadi va yangi xususiyat primitiv ustida qolmaydi)",
        "`TypeError`",
        "`hello`"
      ],
      correctAnswer: 1,
      explanation: "`s.x = 5` yozilganda JS vaqtinchalik string wrapper obyekt yaratib unga `x` xususiyatini beradi, lekin keyingi qatorda u o'chib ketadi. Shuning uchun `s.x` ni qayta chaqirganda u `undefined` bo'ladi."
    },
    {
      id: 12,
      question: "Obyektning 'Deep copy' (chuqur nusxalash) deganda nima tushuniladi?",
      options: [
        "Obyekt nomini o'zgartirish",
        "Obyektni stack xotiradan butunlay o'chirish",
        "Obyektning va undagi barcha ichma-ich (nested) obyektlarning ham xotirada yangi manzildagi to'liq nusxalarini yaratish",
        "Faqat birinchi darajadagi kalitlarni nusxalash"
      ],
      correctAnswer: 2,
      explanation: "Deep copy (chuqur nusxa) obyekt zanjirini to'liqligicha pastki qavatlarigacha nusxalaydi va xotiradagi manzillarni to'liq uzadi. Buni `JSON.parse(JSON.stringify(obj))` yoki `structuredClone(obj)` orqali qilish mumkin."
    }
  ]
};
