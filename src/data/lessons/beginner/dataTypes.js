export const dataTypesLesson = {
  id: "data-types",
  title: "Ma'lumotlar Turlari (Data Types)",
  theory: `## 1. NEGA kerak?
Kompyuter adashib ketmasligi uchun biz unga qaysi turdagi ma'lumot bilan ishlayotganimizni aytishimiz kerak. Masalan, sonlar bilan hisob-kitob qilinadi, matnlar bilan esa qidiruv yoki tahrirlash amallari bajariladi.

## 2. SODDALIK (Analogiya)
Buni **oshxona idishlari** deb tasavvur qiling:
- **String (Matn):** Choynak, ichiga faqat harflar quyiladi.
- **Number (Son):** Likopcha, unga faqat sonlar qo'yiladi.
- **Boolean:** Chiroq yoqgichi, yoki yoniq (\`true\`), yoki o'chiq (\`false\`).

## 3. STRUKTURA (Asosiy turlar)

### A. Primitiv turlar (Oddiy)
1. **Number:** Hamma sonlar (5, 3.14, -10). Maxsus qiymatlar: \`Infinity\`, \`-Infinity\`, \`NaN\`.
2. **String:** Qo'shtirnoq ichidagi matnlar (\`"Salom"\`, \`'JS'\`, \` \`Backtick\` \`).
3. **Boolean:** Faqat \`true\` yoki \`false\`.
4. **Undefined:** O'zgaruvchi e'lon qilingan, lekin qiymat berilmagan.
5. **Null:** Ataylab "bo'sh" qilib qo'yilgan qiymat.
6. **Symbol:** Unikal identifikatorlar uchun.
7. **BigInt:** Juda katta sonlar uchun.

### B. typeof operatori (Detektor)
O'zgaruvchining turini aniqlash uchun ishlatiladi.
\`\`\`javascript
console.log(typeof 42);         // "number"
console.log(typeof "JS");       // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (Bug! ⚠️)
console.log(typeof NaN);        // "number" (G'alati! ⚠️)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **typeof null:** JSda \`typeof null\` natijasi \`"object"\` chiqadi. Bu JS yaratilgandagi xato bo'lib, hozirda uni tuzatib bo'lmaydi.
2. **NaN (Not a Number):** Matematik xatolar natijasi (masalan, \`"abc" / 2\`). Uning turi **number** hisoblanadi.
3. **Qo'shtirnoqlarni adashtirish:** \`"Salom'\` (boshida qo'sh, oxirida bittalik) xatoga olib keladi.

## 6. SAVOLLAR VA JAVOBLAR
<details>
<summary>1. Ma'lumot turi nima?</summary>
Qiymatning qaysi turga (son, matn va h.k.) tegishli ekanligini belgilovchi belgi.
</details>

<details>
<summary>2. JavaScriptda nechta primitiv ma'lumot turi bor?</summary>
7 ta: String, Number, Boolean, Undefined, Null, Symbol, BigInt.
</details>

<details>
<summary>3. typeof operatori nima qaytaradi?</summary>
Ma'lumot turining nomini matn (string) ko'rinishida qaytaradi.
</details>

<details>
<summary>4. undefined va null farqi nima?</summary>
\`undefined\` — qiymat hali berilmaganligini anglatadi. \`null\` — qiymat ataylab bo'sh qilib qo'yilganini bildiradi.
</details>

<details>
<summary>5. NaN nima degani?</summary>
"Not a Number" (Son emas). Matematik xato yuz berganda qaytadigan maxsus qiymat.
</details>

<details>
<summary>6. typeof null natijasi nima va nima uchun?</summary>
\`"object"\`. Bu JSning tarixiy xatosi hisoblanadi.
</details>

<details>
<summary>7. BigInt nima uchun kerak?</summary>
Standart \`Number\` turi sig'dira olmaydigan juda katta butun sonlar bilan ishlash uchun.
</details>

<details>
<summary>8. String yaratishning 3 xil usuli qaysi?</summary>
Bittalik qo'shtirnoq (\`'\`), qo'sh qo'shtirnoq (\`"\`) va backtick (\` \` \`).
</details>

<details>
<summary>9. Booleanning qanday qiymatlari bor?</summary>
Faqat ikkita: \`true\` va \`false\`.
</details>

<details>
<summary>10. typeof NaN natijasi nima?</summary>
\`"number"\`.
</details>

<details>
<summary>11. Primitiv va Reference (Object) turlar farqi nima?</summary>
Primitiv turlar qiymatni o'zida saqlaydi, Reference turlar esa xotiradagi manzilni (link) saqlaydi.
</details>

<details>
<summary>12. Symbol nima uchun ishlatiladi?</summary>
Obyektlar uchun takrorlanmas, unikal kalitlar yaratish uchun.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Turini aniqlang",
      instruction: "'age' o'zgaruvchisining turini konsolga chiqaring.",
      startingCode: "let age = 20;\n// Bu yerga yozing\n",
      hint: "console.log(typeof age);",
      test: "if (logs.includes('number')) return null; return 'typeof ishlatilmadi!';"
    },
    {
      id: 2,
      title: "G'alati holat",
      instruction: "null qiymatining turini (typeof) konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof null);",
      test: "if (logs.includes('object')) return null; return 'null turi object chiqishi kerak!';"
    }
  ]
};
