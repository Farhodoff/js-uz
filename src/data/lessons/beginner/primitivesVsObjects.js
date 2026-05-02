export const primitivesVsObjects = {
  id: "primitives-objects",
  title: "Primitivlar vs Obyektlar",
  level: "Beginner",
  description: "JavaScriptda ma'lumotlar xotirada qanday saqlanadi? Qiymat vs Manzil haqida.",
  theory: `
# Primitiv va Murakkab turlar – Bu nima va nima uchun kerak?

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
  ]
};
