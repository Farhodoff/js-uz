export const templateLiterals = {
  id: "template-literals",
  title: "Template Literals (Backticks)",
  level: "Beginner",
  description: "Stringlarni birlashtirishning eng zamonaviy va qulay usuli - Backticks (``) bilan tanishamiz.",
  theory: `
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
Bu ikkinchi qator.\`;
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const user = "Farhodoff";
const balance = 1000000;
console.log(\`Assalomu alaykum, \${user}!\`);
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Qo'shtirnoqlar bilan adashtirish:** \`'\` yoki \`"\` emas, \` \` \` ishlatish shart.
2.  **Sintaksis:** \`\${}\` ichida faqat ifodalar (expressions) yoziladi, \`if/for\` kabi bloklarni yozib bo'lmaydi.

## 6. SAVOLLAR (12 ta)
1. Template Literals qaysi belgilar bilan yoziladi?
2. \`\${}\` belgisi nima vazifani bajaradi?
3. Backtick ichida yangi qatorga o'tish uchun nima qilish kerak?
4. Eski \`+\` usulining asosiy kamchiligi nima?
5. \`\${}\` ichida ternary operator ishlatsa bo'ladimi?
6. Nima uchun bu usul "Template" deb ataladi?
7. JSning qaysi versiyasida bu xususiyat qo'shilgan?
8. \`\${2 + 2}\` natijasi nima bo'ladi?
9. Backtick ichida oddiy qo'shtirnoq ishlatish mumkinmi?
10. HTML elementlarini backtick bilan yasash qulaymi?
11. Matnni bir nechta o'zgaruvchidan tashkil qilish misolini keltiring.
12. Backtick ichida funksiya chaqirish mumkinmi?`,
  exercises: [
    {
      id: 1,
      title: "O'zingizni tanishtiring",
      instruction: "Name, Age o'zgaruvchilarini template literal orqali 'Mening ismim ... yoshim ...da' ko'rinishida chiqaring.",
      startingCode: "const name = 'Farhod';\nconst age = 25;\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      hint: "result = `Mening ismim ${name}, yoshim ${age}da`;",
      test: "if (code.includes('${name}') && code.includes('${age}')) return null; return 'Template literals ishlatilmadi';"
    }
  ]
};
