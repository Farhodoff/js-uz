export const jsWhat = {
  id: "js-introduction",
  title: "JavaScriptga Kirish",
  theory: `## JavaScript: Miya va Dvigatel

### 1. NEGA kerak?
Tasavvur qiling, sizda chiroyli mashina bor (bu HTML va CSS). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni harakatga keltirish uchun sizga dvigatel kerak. Saytlarda bu vazifani JavaScript bajaradi. Tugmalar bosilganda nima sodir bo'lishi, animatsiyalar, ma'lumotlarni yuklash — hammasi JS orqali qilinadi.

### 2. SODDALIK (Analogiya)
Saytni bir odam deb tasavvur qilsak:
- **HTML** — uning suyagi va tanasi.
- **CSS** — uning kiyimi va pardoz-andozi.
- **JavaScript** — uning miyasi va harakatlari (gapirish, yurish).

### 3. STRUKTURA

#### A. console.log() — Konsolga chiqarish
Bu buyruq kompyuterga: "Menga mana shu ma'lumotni ko'rsat!" degan ma'noni beradi.
\`\`\`javascript
console.log("Assalomu alaykum!");
\`\`\`

#### B. alert() — Oyna chiqarish
Foydalanuvchiga xabar ko'rsatuvchi kichik oyna.
\`\`\`javascript
alert("Salom!");
\`\`\`

### 4. AMALIYOT (Mashqlar pastda)

### 5. XATOLAR (Common mistakes)
1. **Katta-kichik harf:** \`Console.log\` xato ❌. Doim kichik harfda: \`console.log\` ✅.
2. **Qo'shtirnoqlar:** Matnlarni doim \`" "\` yoki \`' '\` ichiga oling. Bo'lmasa xato beradi.

### 6. SAVOLLAR (12 ta)
1. JavaScript nima?
2. Sayt qurilishida JSning o'rni qanday?
3. JS faqat brauzerdami?
4. \`console.log()\` nima uchun kerak?
5. \`alert()\` funksiyasi nima qiladi?
6. JS kodi qayerda yoziladi?
7. Brendan Eich kim?
8. Nima uchun JS "Dynamic" til deyiladi?
9. JS harflar farqiga boradimi (case-sensitive)?
10. \`console.error()\` nima uchun?
11. Matnni qo'shtirnoqsiz yozsa nima bo'ladi?
12. JS birinchi marta nechanchi yilda chiqqan?`,
  exercises: [
    {
      id: 1,
      title: "Birinchi qadam",
      instruction: "Konsolga 'Salom Dunyo' matnini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Salom Dunyo');",
      test: "if (logs.includes('Salom Dunyo')) return null; return 'Konsolga chiqmagan!';"
    },
    {
      id: 2,
      title: "Matematika",
      instruction: "Konsolga 5 va 10 sonlarining yig'indisini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(5 + 10);",
      test: "if (logs.includes('15')) return null; return 'Natija 15 chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Ism chiqish",
      instruction: "O'z ismingizni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('Ismingiz');",
      test: "if (logs.length > 0 && typeof logs[0] === 'string') return null; return 'Ismingizni matn ko\\'rinishida chiqaring!';"
    }
  ]
};
