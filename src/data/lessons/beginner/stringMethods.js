export const stringMethods = {
  id: "string-methods",
  title: "Matn metodlari (String Methods)",
  level: "Beginner",
  description: "Matnlar bilan ishlash san'ati: kesish, o'zgartirish, qidirish va boshqalar.",
  theory: `
# Matn metodlari – Bu nima va nima uchun kerak?

JavaScriptda matnlar (stringlar) bilan ishlash uchun juda ko'p tayyor funksiyalar mavjud. Bular **String Metodlari** deb ataladi.

## 1. NEGA kerak?
Tasavvur qiling, foydalanuvchi ismini "  aLi  " deb yozdi. Sizga esa uni bazaga "Ali" ko'rinishida saqlash kerak. Matnning boshidagi bo'shliqlarni qanday o'chirasiz? Birinchi harfni qanday katta qilasiz? Metodlarsiz buni qilish juda qiyin bo'lardi.

## 2. SODDALIK (Analogiya)
Buni **sartaroshxona** deb tasavvur qiling. Matn — bu mijoz. Sartarosh (metodlar) mijozning sochidan kesishi (\`slice\`), bo'yashi (\`toUpperCase\`) yoki soqolini olib tozalashi (\`trim\`) mumkin. Mijoz o'sha-o'sha, lekin ko'rinishi o'zgaradi.

## 3. STRUKTURA (Asosiy metodlar)

### A. Kattalashtirish va Kichiklashtirish
\`\`\`javascript
let matn = "JavaScript";
console.log(matn.toUpperCase()); // "JAVASCRIPT"
console.log(matn.toLowerCase()); // "javascript"
\`\`\`

### B. Kesib olish (slice)
\`\`\`javascript
let meva = "Olmaxon";
console.log(meva.slice(0, 4)); // "Olma" (0 dan 4-gacha)
\`\`\`

### C. Bo'shliqlarni tozalash (trim)
\`\`\`javascript
let user = "  Farhod  ";
console.log(user.trim()); // "Farhod"
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let xabar = "Bugun havo issiq";
let yangi = xabar.replace("issiq", "zo'r");
console.log(yangi); // "Bugun havo zo'r"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Asl matn o'zgarmaydi:** Matn metodlari asl o'zgaruvchini o'zgartirmaydi, ular har doim **yangi matn** qaytaradi.
   \`\`\`javascript
   let ism = "ali";
   ism.toUpperCase(); 
   console.log(ism); // hali ham "ali"! ❌
   ism = ism.toUpperCase(); // mana endi "ALI" ✅
   \`\`\`
2. **Indeks sanash:** Sanoq doim 0 dan boshlanadi. 1-harf bu 0-indeksdir.

## 6. SAVOLLAR (12 ta)
1. Matn metodlari nima?
2. \`.length\` nima qaytaradi?
3. \`.toUpperCase()\` va \`.toLowerCase()\` farqi nima?
4. \`.slice()\` metodining birinchi va ikkinchi parametrlari nimani anglatadi?
5. \`.trim()\` metodi nima uchun kerak?
6. Matndagi biror so'zni boshqasiga almashtirish metodini ayting (\`replace\`).
7. \`.includes()\` metodi nima qaytaradi?
8. \`.startsWith()\` va \`.endsWith()\` qachon ishlatiladi?
9. Matnning 3-harfini qanday olish mumkin?
10. Nima uchun string metodlari asl matnni o'zgartirmaydi?
11. \`.split()\` metodi matnni nimaga aylantiradi?
12. \`.repeat(3)\` nima ish bajaradi?`,
  exercises: [
    {
      id: 1,
      title: "Matnni o'zgartirish",
      instruction: "'  js  ' matnidagi bo'shliqlarni o'chiring va hamma harflarni katta qiling.",
      startingCode: "let word = '  js  ';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = word.trim().toUpperCase();",
      test: "if (res === 'JS') return null; return 'Xato bajardingiz!';"
    }
  ]
};
