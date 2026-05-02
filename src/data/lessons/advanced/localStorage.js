export const localStorageLesson = {
  id: "a15",
  title: "Brauzer xotirasi (LocalStorage va SessionStorage)",
  theory: `
# Brauzer xotirasi – Bu nima va nima uchun kerak?

Veb-saytga kirganingizda, ba'zida sayt sizning tanlagan tilingizni yoki tungi rejim (dark mode) sozlamangizni eslab qoladi. Buning uchun brauzerning maxsus xotiralari — **LocalStorage** va **SessionStorage** ishlatiladi.

## 1. NEGA kerak?
Tasavvur qiling, foydalanuvchi saytingizda tilni "O'zbekcha"ga o'zgartirdi. Agar siz buni hech qayerda saqlamasangiz, sahifa yangilanganda yana "English" bo'lib qoladi. Ma'lumotlar bazasiga (Database) yozish esa har doim ham shart emas. Shunday kichik sozlamalar uchun brauzer xotirasi ideal joy.

## 2. SODDALIK (Analogiya)
- **LocalStorage:** Bu sizning shaxsiy daftarchangizga o'xshaydi. Unga yozilgan narsa siz uni o'chirmaguningizcha turaveradi (uyquga ketib tursangiz ham).
- **SessionStorage:** Bu esa o'qituvchi doskaga yozgan narsasiga o'xshaydi. Dars tugashi (tab yopilishi) bilan hammasi o'chib ketadi.

## 3. STRUKTURA

### A. LocalStorage (Doimiy xotira)
Hatto brauzerni yopib ochsangiz ham ma'lumot saqlanib qoladi.
\`\`\`javascript
localStorage.setItem("rang", "qizil"); // Saqlash
let r = localStorage.getItem("rang"); // Olish
localStorage.removeItem("rang"); // Bittasini o'chirish
localStorage.clear(); // Hammasini tozalash
\`\`\`

### B. SessionStorage (Vaqtinchalik xotira)
Faqat joriy tab (vkladka) ochiq turguncha saqlanadi. Metodlari xuddi LocalStorage bilan bir xil:
\`\`\`javascript
sessionStorage.setItem("tabID", "123");
\`\`\`

### C. Obyektlarni saqlash (JSON.stringify)
Xotira faqat **matn (string)** saqlay oladi. Obyekt saqlash uchun:
\`\`\`javascript
const user = { name: "Ali" };
localStorage.setItem("user", JSON.stringify(user)); // Stringga o'girish
const data = JSON.parse(localStorage.getItem("user")); // Obyektga qaytarish
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
localStorage.setItem("auth", "true");
console.log("Saqlandi: " + localStorage.getItem("auth"));
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Obyektni to'g'ridan-to'g'ri saqlash:** \`localStorage.setItem("u", user)\` qilsangiz, u \`"[object Object]"\` bo'lib qoladi. JSON ishlatishni unutmang!
2. **Xavfsizlik:** LocalStorage xavfsiz emas! U yerda parollar yoki bank karta ma'lumotlarini aslo saqlamang.

## 6. SAVOLLAR (12 ta)
1. LocalStorage va SessionStorage farqi nima?
2. LocalStorage'da necha MB gacha ma'lumot saqlash mumkin?
3. Ma'lumotni o'qish uchun qaysi metod ishlatiladi?
4. \`JSON.stringify\` nima uchun kerak?
5. \`JSON.parse\` qachon ishlatiladi?
6. Brauzer yopilganda qaysi xotira o'chib ketadi?
7. Xotiradagi barcha ma'lumotlarni qanday tozalash mumkin?
8. LocalStorage faqat string saqlashining sababi nima?
9. Xotirada maxfiy ma'lumotlarni saqlash mumkinmi?
10. \`localStorage.length\` nima qaytaradi?
11. Kompyuter o'chib yonsa LocalStorage o'chadimi?
12. SessionStorage qachon tozalanadi?`,

  exercises: [
    {
      id: 1,
      title: "Ma'lumot saqlash",
      instruction: "LocalStorage'ga 'theme' kaliti bilan 'dark' qiymatini saqlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "localStorage.setItem('theme', 'dark');",
      test: "if (code.includes('setItem')) return null; return 'setItem ishlatilmadi';"
    },
    {
      id: 2,
      title: "Obyektni saqlash",
      instruction: "JSON.stringify yordamida 'car' obyektini saqlang.",
      startingCode: "const car = { model: 'BYD' };\n// Saqlang\n",
      hint: "localStorage.setItem('car', JSON.stringify(car));",
      test: "if (code.includes('JSON.stringify')) return null; return 'JSON.stringify ishlatilmadi';"
    }
  ]
};
