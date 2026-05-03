export const typeCasting = {
  id: "type-casting",
  title: "Explicit Type Casting (Aniq tiplarni o'zgartirish)",
  theory: `## 1. KIRISH
**Explicit Type Casting** – dasturchi tomonidan ma’lumot turini **aniq**, o‘zi yozgan kod orqali bir turdan boshqasiga o‘tkazish. JavaScriptda buning uchun maxsus funksiyalar va operatorlar mavjud.

**Type Casting** (yoki Explicit Conversion) — bu dasturchi o'z xohishi bilan bir turdagi ma'lumotni boshqa turga o'zgartirishidir. Bu "avtomatik" emas, balki "buyruq" asosida sodir bo'ladi.

## 1. NEGA kerak?
Ba'zan JS avtomatik ravishda turni noto'g'ri o'zgartirishi mumkin. Xatolarni oldini olish va natija aniq bo'lishi uchun biz o'zimiz "mana shu o'zgaruvchi hozir son bo'lsin" deb buyruq beramiz.

## 2. SODDALIK (Analogiya)
Buni **plastilin (loy)** deb tasavvur qiling. Plastilin o'zi bir shaklda turibdi, lekin siz uni qo'lingiz bilan ezib, yangi shakl (masalan, koptok) yasaysiz. Siz unga o'zingiz shakl berasiz.

## 3. STRUKTURA (Asosiy funksiyalar)

### A. Number() – Songa o'tkazish
Hammasini songa aylantirishga harakat qiladi:
\`\`\`javascript
Number("123"); // 123
Number("12.5"); // 12.5
Number("abc"); // NaN
\`\`\`

### B. String() – Matnga o'tkazish
Istalgan narsani matn qiladi:
\`\`\`javascript
String(100); // "100"
String(true); // "true"
String(null); // "null"
\`\`\`

### C. Boolean() – Mantiqiy qiymatga o'tkazish
\`\`\`javascript
Boolean(1); // true
Boolean(0); // false
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let r = "50.5px";
console.log(parseFloat(r)); // 50.5 (son qismini oladi)
console.log(parseInt(r));   // 50 (faqat butun qismini oladi)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **.toString() va null:** \`null.toString()\` deb yozsangiz xato (Error) beradi. Lekin \`String(null)\` xato bermaydi, shunchaki \`"null"\` matnini qaytaradi. Har doim \`String()\` ishlatish xavfsizroq.
2. **Bo'sh massiv:** \`Number([])\` natijasi \`0\` bo'ladi. Bu kutilmagan natija bo'lishi mumkin!

## 6. SAVOLLAR (12 ta)
1. Type Casting (Aniq o'zgartirish) nima?
2. \`Number()\` va \`parseInt()\` farqi nimada?
3. \`parseFloat()\` qachon ishlatiladi?
4. \`String()\` va \`.toString()\` farqi nimada?
5. Nima uchun \`null.toString()\` ishlamaydi?
6. Unary plus (\`+\`) operatori nima qiladi?
7. \`Boolean(undefined)\` natijasi nima bo'ladi?
8. \`Number(true)\` natijasi nima bo'ladi?
9. \`Number(false)\` natijasi nima bo'ladi?
10. Matn ichida raqamdan keyin harf bo'lsa (\`"100kg"\`), \`Number()\` nima qaytaradi?
11. \`parseInt("100kg")\` nima qaytaradi?
12. "Double bang" (\`!!\`) operatori nima vazifani bajaradi?`,
  exercises: [
    {
      id: 1,
      title: "Butun sonni olish",
      instruction: "'100px' matnidan faqat butun son qismini ajratib oling.",
      startingCode: "let val = '100px';\n// Bu yerda yozing\nlet res = ",
      hint: "let res = parseInt(val);",
      test: "if (res === 100) return null; return 'Faqat 100 chiqishi kerak!';"
    }
  ]
};
