export const moreDataTypesLesson = {
  id: "more-data-types",
  title: "Ma'lumotlar Turlari: Null, Symbol, BigInt",
  theory: `## Ma'lumotlar Turlari: Null, Symbol, BigInt

Oldingi darsda biz eng ko'p ishlatiladigan turlarni ko'rdik. Endi esa JavaScriptning biroz "maxsus" turlari haqida gaplashamiz.

## 1. NEGA kerak?
- **Null:** Ba'zan biz o'zgaruvchi borligini, lekin uning ichi bo'shligini ataylab aytishimiz kerak.
- **BigInt:** Oddiy \`Number\` turi ma'lum bir kattalikdagi sonlardan keyin xato hisoblashni boshlaydi. Juda katta sonlar (masalan, koinotdagi atomlar soni) uchun \`BigInt\` kerak.
- **Symbol:** Obyektlar ichida bir-biriga o'xshamaydigan, mutlaqo unikal (yagona) kalitlar yaratish uchun ishlatiladi.

## 2. SODDALIK (Analogiya)
- **Null:** Bu xuddi bo'sh **suv shishasiga** o'xshaydi. Shisha bor, lekin ichida suv yo'q. (\`Undefined\` esa — shishaning o'zi ham yo'qligi).
- **BigInt:** Oddiy kalkulyator sig'maydigan juda uzun **chek** yoki raqam deb tasavvur qiling.
- **Symbol:** Bu har bir insonga beriladigan **pasport seriyasi** kabi. Ikki kishining ismi bir xil bo'lishi mumkin, lekin pasport seriyasi (Symbol) doim boshqa-boshqa bo'ladi.

## 3. STRUKTURA

### A. Null (Ataylab bo'shatish)
\`\`\`javascript
let foydalanuvchi = null; // Hozircha foydalanuvchi yo'q
\`\`\`

### B. BigInt (Katta sonlar)
Son oxiriga \`n\` harfi qo'shiladi:
\`\`\`javascript
let kattaSon = 9007199254740991n;
let yanaBir = BigInt("12345678901234567890");
\`\`\`

### C. Symbol (Yagona belgi)
\`\`\`javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (nomi bir xil bo'lsa ham, o'zlari boshqa-boshqa!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const shaxs = {
  ism: "Ali"
};
const ID = Symbol("shaxsiy_id");
shaxs[ID] = 12345;
console.log(shaxs[ID]); // 12345
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **BigInt va Numberni aralashtirish:** \`10n + 5\` — Xato! ❌ BigIntni faqat BigInt bilan qo'shish mumkin. (\`10n + BigInt(5)\` ✅).
2. **typeof null:** Yana bir bor eslatamiz, bu \`"object"\` chiqadi, lekin u aslida Primitiv tur.

## 6. SAVOLLAR (12 ta)
1. \`null\` va \`undefined\` farqi nimada?
2. Nima uchun \`null\` primitiv tur bo'lsa ham \`object\` qaytaradi?
3. \`BigInt\` qachon kerak bo'ladi?
4. \`BigInt\` son yaratishning 2 xil usulini ayting.
5. \`Number.MAX_SAFE_INTEGER\` nima?
6. \`Symbol\` nima vazifani bajaradi?
7. Ikki xil \`Symbol("a")\` bir-biriga tengmi?
8. \`BigInt\` va \`Number\`ni birga qo'shsa bo'ladimi?
9. Obyekt ichida \`Symbol\`ni qanday kalit qilib ishlatish mumkin?
10. \`Symbol.description\` nima qaytaradi?
11. \`null == undefined\` natijasi nima bo'ladi?
12. \`null === undefined\` natijasi nima bo'ladi?`,
  exercises: [
    {
      id: 1,
      title: "BigInt mashqi",
      instruction: "Son oxiriga 'n' qo'shish orqali bitta BigInt son yarating.",
      startingCode: "// Bu yerda yarating\nconst big = ",
      hint: "const big = 100n;",
      test: "if (typeof big === 'bigint') return null; return 'BigInt yaratilmadi!';"
    }
  ]
};
