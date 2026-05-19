export const primitivesVsObjects = {
  id: "primitives-vs-objects",
  title: "Primitivlar vs Obyektlar va Prototype",
  theory: `## Primitive Types vs Objects

JavaScriptda ma'lumotlar ikki guruhga bo'linadi: **Primitiv** (oddiy) va **Obyektlar** (murakkab). Bularning eng katta farqi ularning kompyuter xotirasida qanday saqlanishidadir.

## 1. NEGA kerak?
Bu mavzuni tushunmaslik juda ko'p xatolarga (bug) sabab bo'ladi. Masalan, bitta o'zgaruvchini o'zgartirsangiz, ikkinchisi ham o'z-o'zidan o'zgarib qolishi mumkin. Buning sababini bilish uchun xotira qanday ishlashini tushunish shart.

## 2. SODDALIK (Analogiya)
- **Primitiv (Qiymat):** Bu xuddi **qog'ozga yozilgan raqam** kabi. Agar siz do'stingizga o'sha raqamni bersangiz, u o'zining qog'oziga nusxa ko'chirib oladi. U o'z qog'ozini o'zgartirsa, sizniki o'zgarmaydi.
- **Obyekt (Manzil/Referens):** Bu esa **Google Docs** hujjatiga o'xshaydi. Siz do'stingizga hujjatning o'zini emas, unga boradigan **havolani (link)** berasiz. Do'stingiz hujjatni o'zgartirsa, siz ochganingizda ham u o'zgargan bo'ladi, chunki ikkingiz ham bitta narsaga qarayapsiz.

## 3. STRUKTURA

### A. Primitivlar (By Value)
String, Number, Boolean, Null, Undefined, Symbol, BigInt.
\`\`\`javascript
let a = 10;
let b = a; // nusxa olindi
b = 20;
console.log(a); // 10 (a o'zgarmadi!)
\`\`\`

### B. Obyektlar (By Reference)
Obyektlar, Massivlar, Funksiyalar.
\`\`\`javascript
let obj1 = { ism: "Ali" };
let obj2 = obj1; // manzil (havola) berildi
obj2.ism = "Vali";
console.log(obj1.ism); // "Vali" (obj1 ham o'zgarib qoldi!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let arr1 = [1, 2];
let arr2 = arr1;
arr2.push(3);
console.log(arr1); // [1, 2, 3] (chunki massiv ham obyektdir)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Solishtirish:** \`{} === {}\` har doim \`false\` beradi. Chunki JS ikkita alohida obyektni (hatto ichi bir xil bo'lsa ham) xotiradagi turli manzillar deb hisoblaydi.
2. **Nusxa olish:** Obyektni shunchaki \`obj2 = obj1\` deb nusxalamang, bu faqat manzilni ko'chiradi. Haqiqiy nusxa olish uchun spread \`{...obj1}\` ishlatiladi.

## 6. SAVOLLAR (12 ta)
1. Primitiv ma'lumot turlari qaysilar?
2. Obyektlar qaysi guruhga kiradi?
3. "By Value" (Qiymat bo'yicha) nima degani?
4. "By Reference" (Manzil bo'yicha) nima degani?
5. Nima uchun bitta massivni o'zgartirsak, uning nusxasi ham o'zgaradi?
6. \`let x = 5; let y = x;\` dan keyin y ni o'zgartirsak x o'zgaradimi?
7. \`{} == {}\` natijasi nima?
8. Obyektni xotiradagi manzili deganda nima tushuniladi?
9. Immutable (o'zgarmas) turlar qaysi guruhga kiradi?
10. Massivni qanday qilib "haqiqiy" nusxa olish mumkin?
11. Funksiyalar primitivmi yoki obektmi?
12. \`null\` va \`undefined\` qaysi guruhga kiradi?`,
  exercises: [
    {
      id: 1,
      title: "Manzilni tekshirish",
      instruction: "Ikkita bo'sh obyekt yaratib ularni '===' orqali solishtiring va natijani ko'ring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = {} === {};",
      test: "if (res === false) return null; return 'Obyektlar har doim false bo\\'lishi kerak!';"
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
      question: "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nlet user1 = { name: \"Ali\" };\nlet user2 = user1;\nuser2.name = \"Vali\";\nconsole.log(user1.name);\n```",
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
        "Chunki har safar `{}` yozilganda xotiradan yangi manzil ajratiladi va ular bir-biridan mutlaqo farq qiladi",
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
    }
  ]
};
