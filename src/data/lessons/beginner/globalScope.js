export const globalScopeLesson = {
  id: "global-scope",
  title: "Global Scope (Global doira)",
  theory: `## Global Scope – JavaScriptning eng tashqi darajasi

**Global Scope** (Umumiy doira) — bu JavaScript kodining eng tashqi qismidir. Bu yerda e'lon qilingan o'zgaruvchilar va funksiyalar dasturning istalgan joyidan (xohlagan funksiya yoki blok ichidan) ko'rinadi.

## 1. NEGA kerak?
Ba'zan bizga butun dastur davomida kerak bo'ladigan ma'lumotlar zarur bo'ladi. Masalan, foydalanuvchining tanlagan tili yoki dastur versiyasi. Bunday ma'lumotlarni globalda saqlash qulay.

## 2. SODDALIK (Analogiya)
Global doirani **shahar maydoni** deb tasavvur qiling. Maydon o'rtasida turgan soatni (global o'zgaruvchini) shahardagi barcha odamlar (hamma funksiyalar) ko'ra oladi. Local scope esa — uyingiz ichidagi soat, uni faqat uydagilar ko'radi.

## 3. STRUKTURA

### A. Global o'zgaruvchi yaratish
Hech qanday funksiya yoki blok ichida bo'lmagan o'zgaruvchi global hisoblanadi:
\`\`\`javascript
let til = "O'zbekcha"; // Global

function salomBer() {
  console.log("Til: " + til); // Global o'zgaruvchini funksiya ichida ishlatish ✅
}
salomBer();
\`\`\`

### B. Global Obyekt (window)
Brauzerda barcha global narsalar \`window\` obyektining ichida bo'ladi:
\`\`\`javascript
var ism = "Farhod";
console.log(window.ism); // "Farhod"
\`\`\`
*(Eslatma: let va const bilan yaratilgan global o'zgaruvchilar window'ga qo'shilmaydi).*

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = 10; // Global

function o'zgartir() {
  x = 20; // Global o'zgaruvchini funksiya ichida yangilash
}
o'zgartir();
console.log(x); // 20
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Global ifloslanish (Global Pollution):** Juda ko'p global o'zgaruvchi yaratmang! Agar ikki xil faylda bir xil nomli global o'zgaruvchi bo'lsa, ular bir-birini buzib qo'yadi.
2. **E'lonsiz o'zgaruvchi:** Funksiya ichida \`let/const\` yozishni unutsangiz (\`y = 5\`), JS uni avtomatik global qilib yuboradi. Bu juda yomon odat!

## 6. SAVOLLAR (12 ta)
1. Global Scope nima?
2. Qayerda e'lon qilingan o'zgaruvchilar global hisoblanadi?
3. Global o'zgaruvchini funksiya ichida ishlatsa bo'ladimi?
4. \`window\` obyekti nima?
5. Nima uchun global o'zgaruvchilar xavfli bo'lishi mumkin?
6. \`let\` va \`var\` global e'lon qilinganda nima farqi bor?
7. "Global Namespace Pollution" nima degani?
8. Funksiya ichida \`let\` ishlatmasdan o'zgaruvchi yaratsak nima bo'ladi?
9. Global o'zgaruvchini qachon ishlatish tavsiya etiladi?
10. Global doira faqat brauzerdami yoki Node.js'da ham bormi?
11. \`globalThis\` nima uchun kerak?
12. Qanday qilib global o'zgaruvchilar sonini kamaytirish mumkin?`,
  exercises: [
    {
      id: 1,
      title: "Global mashqi",
      instruction: "Global o'zgaruvchi yarating va uni funksiya ichida 1 ga oshiring.",
      startingCode: "let count = 0;\nfunction inc() {\n  // Bu yerda countni oshiring\n}\ninc();",
      hint: "count++;",
      test: "if (count === 1) return null; return 'O\\'zgaruvchi oshmadi!';"
    }
  ]
};
