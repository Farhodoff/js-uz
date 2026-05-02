export const templateLiterals = {
  id: "template-literals",
  title: "Template Literals (Backticks)",
  level: "Beginner",
  description: "Stringlarni birlashtirishning eng zamonaviy va qulay usuli - Backticks (``) bilan tanishamiz.",
  content: `
# Template Literals – Bu nima va nima uchun kerak?

Oldinlari biz stringlarni (matnlarni) birlashtirish uchun \`+\` belgisidan foydalanardik. Bu juda noqulay edi, ayniqsa matn uzun bo'lsa yoki ichida o'zgaruvchilar ko'p bo'lsa. **Template Literals** (Backticks) bu muammoni hal qildi.

## 1. NEGA kerak?
Tasavvur qiling, sizda \`ism\`, \`yosh\` va \`shahar\` degan o'zgaruvchilar bor.
**Eski usul (+):**
\`\`\`javascript
let gap = "Mening ismim " + ism + ". Men " + yosh + " yoshdaman va " + shahar + "da yashayman.";
\`\`\`
Bu usulda doim qo'shtirnoqlar va \`+\` bilan adashib ketish oson.

**Yangi usul (Template Literals):**
\`\`\`javascript
let gap = \`Mening ismim \${ism}. Men \${yosh} yoshdaman va \${shahar}da yashayman.\`;
\`\`\`
Ko'rib turganingizdek, kod ancha toza va o'qishga oson!

## 2. SODDALIK (Analogiya)
Buni bir xat deb tasavvur qiling. Eski usulda siz xatni bo'lak-bo'lak qilib qog'ozlarga yozib, ularni yelim bilan yopishtirib chiqasiz. Template Literals esa – tayyor blanka, siz shunchaki kerakli joylarga (\${...}) kerakli ma'lumotlarni yozib qo'yasiz.

## 3. STRUKTURA (Imkoniyatlari)

### A. O'zgaruvchilarni kiritish (\${expression})
Deyarli har qanday JS ifodasini \`\${}\` ichiga yozish mumkin:
\`\`\`javascript
let narx = 5000;
let soni = 3;
console.log(\`Jami: \${narx * soni} so'm\`); // Jami: 15000 so'm
\`\`\`

### B. Ko'p qatorli matnlar (Multi-line)
Eski usulda yangi qatorga o'tish uchun \`\\n\` ishlatilardi. Backticks bilan shunchaki "Enter"ni bossangiz kifoya:
\`\`\`javascript
let matn = \`Bu birinchi qator.
Bu ikkinchi qator.
Bu esa uchinchi qator.\`;
\`\`\`

## 4. AMALIYOT (Mashq)
Quyidagi kodni konsolda sinab ko'ring:
\`\`\`javascript
const user = "Farhodoff";
const balance = 1000000;
const message = \`Assalomu alaykum, \${user}! Sizning hisobingizda \${balance.toLocaleString()} so'm bor.\`;
console.log(message);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Qo'shtirnoqlar bilan adashtirish:** \`'\` (yoki \`"\`) o'rniga doim \` \` \` (backtick) ishlating.
2.  **Belgini noto'g'ri yozish:** \`\${}\` o'rniga \`$\{\}\` (dollardan keyin bo'sh joy) yozib qo'ymang.

## 6. SAVOLLAR (12 ta)

### Nazariy savollar:
1. Template Literals JSning qaysi versiyasida (ES...) kiritilgan?
2. Backtick belgisi klaviaturada qayerda joylashgan?
3. Eski \`+\` usuli va Backtick o'rtasidagi asosiy farq nima?
4. \`\${}\` ichida arifmetik amallar bajarish mumkinmi?
5. Backticks ichida funksiyalarni chaqirsa bo'ladimi?
6. Ko'p qatorli matn yozganda \`\\n\` ishlatish shartmi?

### Amaliy savollar (Junior/Middle):
7. Ikki sonni qo'shib, natijani "Natija: X" ko'rinishida Template Literal orqali chiqaring.
8. Biror foydalanuvchining ismi va familiyasini bitta string qilib yasang.
9. Obekt ichidagi ma'lumotni (masalan, \`car.model\`) matnga qo'shing.
10. Shartli operatorni (ternary operator) \`\${}\` ichida ishlatib ko'ring (masalan, \`\${yosh >= 18 ? 'Kattasiz' : 'Kichiksiz'}\`).
11. HTML teglarini (\`<div>\`, \`<h1>\`) o'z ichiga olgan backtick matn yasang.
12. String metodlarini (masalan, \`.toUpperCase()\`) backtick ichida o'zgaruvchiga qo'llang.
`,
  practice: [
    {
      id: "template-1",
      task: "O'zingiz haqingizda ma'lumot bering (ism, yosh, kasb) va ularni template literals orqali bitta matnga jamlang.",
      initialCode: "const name = '';\nconst age = 0;\nconst job = '';\n\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      answer: "const name = 'Farhod';\nconst age = 25;\nconst job = 'Dasturchi';\nconst result = `Mening ismim ${name}, yoshim ${age}da va men ${job}man.`;\nconsole.log(result);"
    }
  ]
};
