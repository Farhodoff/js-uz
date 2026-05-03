export const functionScopeLesson = {
  id: "function-scope",
  title: "Function Scope: Xona sirlari",
  theory: `## 1. KIRISH
Tasavvur qiling, har bir funksiya — bu bitta alohida **xona**. Xona ichida nima sodir bo'layotganini tashqaridagilar ko'rmaydi. Bu o'zgaruvchilarni xavfsiz saqlashning eng oson usuli.

**Function Scope** — bu o'zgaruvchining faqat funksiya ichida "yashashi" va ishlatilishidir. Funksiya tugashi bilan uning ichidagi hamma o'zgaruvchilar o'chib ketadi.

## 1. NEGA kerak?
Tasavvur qiling, har bir funksiyada bir xil nomli o'zgaruvchi (\`count\`) ishlatmoqchisiz. Agar "funksiya doirasi" bo'lmaganda edi, barcha funksiyalar bir-birining o'zgaruvchisini o'zgartirib yuborar edi. Scope bizga har bir funksiya uchun "shaxsiy hudud" yaratadi.

## 2. SODDALIK (Analogiya)
Funksiyani alohida bir **xona** deb tasavvur qiling. Xona ichida nima sodir bo'layotganini ko'chada (globalda) turganlar ko'rmaydi. Xona ichidagi shaxsiy kundalikni (o'zgaruvchini) faqat o'sha xonaga kirganlar o'qiy oladi.

## 3. STRUKTURA

### A. Funksiya ichidagi o'zgaruvchi
\`\`\`javascript
function xona() {
  let sir = "Maxfiy";
  console.log(sir); // Xona ichida ko'rinadi ✅
}
xona();
console.log(sir); // Xato! ❌ (Xonadan tashqarida ko'rinmaydi)
\`\`\`

### B. var, let va const farqi
Funksiya ichida e'lon qilingan bo'lsa, uchalasi ham tashqariga chiqolmaydi:
\`\`\`javascript
function test() {
  var a = 1;
  let b = 2;
  const c = 3;
}
// a, b, c - hech biri tashqarida yo'q!
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let ism = "Ali"; // Global
function salom() {
  let ism = "Vali"; // Local (shaxsiy)
  console.log("Salom, " + ism);
}
salom(); // Salom, Vali
console.log(ism); // Ali (Global ism o'zgarmadi!)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Kalit so'zsiz o'zgaruvchi:** Funksiya ichida \`let/const\` ishlatmasdan o'zgaruvchi yaratsangiz (\`x = 10\`), u avtomatik ravishda **Global** bo'lib qoladi va boshqa joylarga xalaqit beradi. Doim \`let\` yoki \`const\` ishlating!
2. **E'lon qilishdan oldin ishlatish:** O'zgaruvchini funksiya oxirida e'lon qilib, boshida ishlatsangiz xato beradi (let/const bilan).

## 6. SAVOLLAR (12 ta)
1. Function Scope nima?
2. O'zgaruvchi funksiya ichida yaratilsa nima deyiladi?
3. Nima uchun funksiya ichidagi o'zgaruvchi tashqarida ko'rinmaydi?
4. Funksiya ichida \`var\` ishlatsa u tashqarida ko'rinadimi?
5. Funksiya tugaganidan keyin uning ichidagi o'zgaruvchilar nima bo'ladi?
6. Global scope va Local scope farqi nima?
7. "Lexical Scope" nima degani?
8. Funksiya ichida \`let\` ishlatishning afzalligi nimada?
9. Bir xil nomli global va local o'zgaruvchi bo'lsa, funksiya qaysi birini birinchi oladi?
10. Kalit so'zsiz (let/const/var) o'zgaruvchi yaratilsa nima bo'ladi?
11. Funksiya ichidagi funksiya (nested) tashqi funksiya o'zgaruvchisini ko'radimi?
12. "Namespace pollution" nima va scope uni qanday hal qiladi?`,
  exercises: [
    {
      id: 1,
      title: "Scope mashqi",
      instruction: "Funksiya ichida 'msg' o'zgaruvchisini yarating va uni faqat funksiya ichida chiqaring.",
      startingCode: "function show() {\n  // Bu yerda yarating\n}\nshow();",
      hint: "let msg = 'Salom';",
      test: "if (code.includes('msg')) return null; return 'O\\'zgaruvchi yaratilmadi!';"
    }
  ]
};
