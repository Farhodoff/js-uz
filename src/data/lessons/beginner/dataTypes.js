export const dataTypesLesson = {
  id: "data-types",
  title: "Ma'lumot turlari",
  level: "Beginner",
  description: "JavaScriptda qanday ma'lumotlar bor? Sonlar, matnlar va boshqalar haqida gaplashamiz.",
  theory: `
# Ma'lumot turlari – Bu nima va nima uchun kerak?

JavaScriptda har bir ma'lumotning o'z turi bo'ladi. Xuddi hayotda mevalar, sabzavotlar va ichimliklar alohida bo'lganidek, JSda ham sonlar, matnlar va mantiqiy qiymatlar alohida ajratiladi.

## 1. NEGA kerak?
Tasavvur qiling, sizga ikkita sonni qo'shish kerak: \`5 + 5\`. JS buni \`10\` deb hisoblaydi. Lekin agar siz "matn" va "son"ni qo'shmoqchi bo'lsangiz (\`"5" + 5\`), natija butunlay boshqacha bo'ladi. Kompyuter adashib ketmasligi uchun biz unga qaysi turdagi ma'lumot bilan ishlayotganimizni aytishimiz kerak.

## 2. SODDALIK (Analogiya)
Buni **oshxona idishlari** deb tasavvur qiling:
- **String (Matn):** Bu xuddi choynakka o'xshaydi, ichiga faqat suyuqlik (harflar) quyiladi.
- **Number (Son):** Bu likopcha, unga faqat ovqat (sonlar) qo'yiladi.
- **Boolean:** Bu chiroq yoqgichi (vkluchatel), u yoki yoniq (\`true\`), yoki o'chiq (\`false\`) bo'ladi.

## 3. STRUKTURA (Asosiy turlar)

### A. Primitiv turlar (Oddiy)
1. **Number:** Hamma sonlar (5, 3.14, -10).
2. **String:** Qo'shtirnoq ichidagi matnlar ("Salom", 'JS').
3. **Boolean:** Faqat ikkita qiymat: \`true\` (ha/rost) yoki \`false\` (yo'q/yolg'on).
4. **Undefined:** O'zgaruvchi bor, lekin qiymati yo'q.
5. **Null:** Ataylab "bo'sh" qilib qo'yilgan qiymat.

### B. typeof operatori
O'zgaruvchining turini bilish uchun ishlatiladi:
\`\`\`javascript
let yosh = 25;
console.log(typeof yosh); // "number"

let ism = "Farhod";
console.log(typeof ism); // "string"
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = 100;
let y = "100";
console.log(typeof x); // number
console.log(typeof y); // string
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **typeof null:** JSda \`typeof null\` qilsangiz, u \`"object"\` qaytaradi. Bu JS tarixidagi eng mashhur xato (bug), lekin uni o'zgartirib bo'lmaydi.
2. **NaN (Not a Number):** Agar matnni songa ko'paytirsangiz (\`"olma" * 5\`), JS \`NaN\` qaytaradi. G'alati tomoni, \`typeof NaN\` baribir \`"number"\` chiqadi!

## 6. SAVOLLAR (12 ta)
1. Ma'lumot turi nima?
2. JavaScriptda nechta asosiy ma'lumot turi bor?
3. Primitiv va Murakkab (Reference) turlar farqi nima?
4. \`Number\` turiga misollar keltiring.
5. \`String\` yaratishda qaysi qo'shtirnoqlar ishlatiladi?
6. \`Boolean\` nima degani?
7. \`undefined\` va \`null\` o'rtasidagi farq nima?
8. \`typeof\` operatori nima vazifani bajaradi?
9. \`typeof "123"\` natijasi nima bo'ladi?
10. \`NaN\` nima degani va uning turi nima?
11. Nima uchun \`typeof null\` obekt chiqadi?
12. \`BigInt\` turi nima uchun kerak?`,
  exercises: [
    {
      id: 1,
      title: "Turini aniqlang",
      instruction: "'age' o'zgaruvchisining turini konsolga chiqaring.",
      startingCode: "let age = 20;\n// Bu yerga yozing\n",
      hint: "console.log(typeof age);",
      test: "if (logs.includes('number')) return null; return 'typeof ishlatilmadi!';"
    }
  ]
};
