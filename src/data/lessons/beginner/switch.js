export const switchLesson = {
  id: "switch",
  title: "Switch operatori",
  level: "Beginner",
  description: "Ko'p shartli vaziyatlarda if...else o'rniga ishlatiladigan qulay operator.",
  theory: `
# Switch operatori – Bu nima va nima uchun kerak?

**Switch** — bu bitta o'zgaruvchining bir nechta holatlarini (qiymatlarini) tekshirish uchun ishlatiladigan operator. U asosan juda ko'p \`if...else if\` yozishdan qochish uchun kerak.

## 1. NEGA kerak?
Tasavvur qiling, sizga hafta kunini raqamiga qarab nomini chiqarish kerak. Agar siz \`if\` ishlatsangiz, 7 marta \`else if\` yozasiz. Bu kodni o'qishni qiyinlashtiradi. \`switch\` bilan esa hammasi tartibli bo'ladi.

## 2. SODDALIK (Analogiya)
Buni **avtomat telefonga (ATC)** o'xshatish mumkin. Siz bitta raqamni terasiz (o'zgaruvchi), telefon tarmog'i esa sizni o'sha raqamga mos keladigan "liniya"ga (case) ulab beradi.

## 3. STRUKTURA

### A. Asosiy sintaksis
\`\`\`javascript
let meva = "olma";
switch (meva) {
  case "olma":
    console.log("Narxi 12 000");
    break;
  case "banan":
    console.log("Narxi 20 000");
    break;
  default:
    console.log("Bunday meva yo'q");
}
\`\`\`

### B. break va default
- **break:** Bu "to'xta" degani. Agar uni yozmasangiz, JS keyingi \`case\`larni ham bajarib ketadi (**Fall-through**).
- **default:** Agar birorta \`case\` mos kelmasa, mana shu qism ishlaydi (xuddi \`else\` kabi).

## 4. AMALIYOT (Mashq)
Bir nechta \`case\` uchun bitta natija:
\`\`\`javascript
let oy = 4;
switch (oy) {
  case 3:
  case 4:
  case 5:
    console.log("Bahor");
    break;
  default:
    console.log("Boshqa fasl");
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **breakni unutish:** Eng ko'p uchraydigan xato. Agar \`break\` qo'ymasangiz, dastur to'xtamay hamma \`case\`larni chiqarib yuboradi.
2. **Strict Equality:** \`switch\` solishtirishda \`===\` (qat'iy tenglik) ishlatadi. Ya'ni \`switch(5)\` bo'lsa-yu, siz \`case "5":\` deb yozsangiz (matn), u ishlamaydi.

## 6. SAVOLLAR (12 ta)
1. \`switch\` operatori nima vazifani bajaradi?
2. Qachon \`if...else\` o'rniga \`switch\` ishlatgan ma'qul?
3. \`case\` so'zining ma'nosi nima?
4. \`break\` kalit so'zi nima uchun shart?
5. \`default\` bloki nima vazifani bajaradi?
6. \`switch\` qanday tenglik operatoridan foydalanadi (\`==\` yoki \`===\`)?
7. "Fall-through" nima degani?
8. \`default\` har doim oxirida bo'lishi shartmi?
9. Bitta \`case\` ichida bir nechta amal bajarish mumkinmi?
10. \`switch\` ichida boshqa \`switch\` ishlatish mumkinmi?
11. Matnli qiymatlarni \`switch\`da tekshirsa bo'ladimi?
12. \`switch(true)\` usuli nima uchun ishlatiladi?`,
  exercises: [
    {
      id: 1,
      title: "Kunni toping",
      instruction: "'day' 1 bo'lsa 'Dushanba', 2 bo'lsa 'Seshanba' deb chiqaring.",
      startingCode: "let day = 1;\n// Bu yerga yozing\n",
      hint: "switch(day) { case 1: console.log('Dushanba'); break; ... }",
      test: "if (logs.includes('Dushanba')) return null; return 'Break yoki case xato!';"
    }
  ]
};
