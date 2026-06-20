export const strictMode = {
  title: "Qat'iy Rejim (Strict Mode): 'use strict'",
  content: `
JavaScript dastlab juda yumshoq tillardan biri edi. Ya'ni, u ko'plab kichik xatolarga ko'z yumar va dastur ishini davom ettiraverardi. Bu kichik loyihalarda oson tuyulsa-da, katta loyihalarda juda ko'p "topib bo'lmas" xatolarga sabab bo'lardi.
ES5 (2009-yil) bilan birga JavaScript'da **Qat'iy rejim (Strict Mode)** joriy etildi.

### 1. Uni qanday yoqish kerak?
Qat'iy rejimni yoqish uchun faylning yoki funksiyaning eng boshiga \`"use strict";\` (qo'shtirnoq ichida) yozib qo'yish kerak.

\`\`\`javascript
"use strict";

// Bu fayldagi barcha kodlar qat'iy rejimda ishlaydi
let message = "Hello";
\`\`\`

Agar siz faqat bitta funksiya ichida yoqmoqchi bo'lsangiz:
\`\`\`javascript
function strictFunction() {
  "use strict";
  // faqat shu funksiya qat'iy
}
\`\`\`

*(ES6 Modullar \`import/export\` va \`class\` lar avtomatik tarzda qat'iy rejimda ishlaydi. Shuning uchun React yoki Node.js loyihalarda ko'pincha qo'lda "use strict" yozilmaydi).*

### 2. Strict Mode nimalarni o'zgartiradi?

**A. E'lon qilinmagan o'zgaruvchilarni taqiqlaydi (Accidental Globals)**
Oddiy rejimda agar \`let\` yoki \`const\` yozish esdan chiqsa, u yashirincha \`window\` obyektiga qo'shilib qolardi. Strict rejim buni darhol to'xtatadi.

\`\`\`javascript
"use strict";

userAge = 25; // XATOLIK! (ReferenceError: userAge is not defined)
// chunki oldiga let yoki var yozilmagan.
\`\`\`

**B. O'chirib bo'lmaydigan narsalarni o'chirishga ruxsat bermaydi**
\`delete\` operatori orqali o'zgaruvchilarni, funksiyalarni yoki muzlatilgan obyektlarni (Object.freeze) o'chirishga harakat qilsangiz, strict rejim jim turmasdan xato tashlaydi.

\`\`\`javascript
"use strict";

const person = Object.freeze({ name: "Ali" });
delete person.name; // XATOLIK! (TypeError)
\`\`\`

**C. Parametrlarda bir xil nomlarni taqiqlaydi**
Oddiy rejimda funksiyaga bitta ismli ikki xil parametr berib yuborish mumkin edi.
\`\`\`javascript
"use strict";

function sum(a, a, c) { // XATOLIK! Duplicate parameter name
  return a + a + c;
}
\`\`\`

**D. \`this\` kalit so'zi \`window\` ga emas, \`undefined\` ga teng bo'ladi**
Oddiy rejimda oddiy funksiya chaqirilganda ichidagi \`this\` to'g'ridan-to'g'ri \`window\` (global obyekt) ga ishora qilardi. Strict rejimda u global o'zgaruvchilarni tasodifan buzib qo'ymaslik uchun \`undefined\` ga o'zgaradi.

\`\`\`javascript
"use strict";

function showThis() {
  console.log(this);
}
showThis(); // undefined
\`\`\`

### Xulosa
"Strict Mode" zamonaviy dasturlashda doimo faol turishi kerak bo'lgan "xavfsizlik kamari"dir. U sizning xatolaringizni kod ishga tushishidanoq (ko'zdan qochmasidan oldin) aniqlashga yordam beradi.
  `,
  exercises: [
    {
      id: "strict-1",
      title: "Strict mode va o'zgaruvchilar",
      description: `'use strict' yoqilgan kodda let/const ishlatmasdan o'zgaruvchi yaratilsa xato tashlanadi. Quyidagi funksiyani shunday o'zgartiring-ki, u to'g'ri ishlasin (xato tashlamasin).`,
      initialCode: `function createName() {
  "use strict";
  name = "JS Dasturchi";
  return name;
}`,
      solution: `function createName() {
  "use strict";
  const name = "JS Dasturchi";
  return name;
}`,
      tests: [
        {
          test: `
          const res = createName();
          return res === "JS Dasturchi";`,
          description: "O'zgaruvchi e'lon qilinib (let yoki const) to'g'ri qiymat qaytishi kerak"
        }
      ]
    }
  ]
};
