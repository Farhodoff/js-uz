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

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. Template Literals qaysi belgilar bilan yoziladi?</summary>
Template Literals klaviaturadagi \`Esc\` tugmasi ostida joylashgan backtick (\` \` \` - teskari qo'shtirnoq) belgilari bilan yoziladi.
</details>

<details>
<summary>2. \${} belgisi nima vazifani bajaradi?</summary>
\`\${}\` (interpolatsiya) belgisi matn ichiga istalgan JavaScript o'zgaruvchisi, hisob-kitob amali yoki ifodasini to'g'ridan-to'g'ri joylashtirish (tarjima qilish) uchun xizmat qiladi.
</details>

<details>
<summary>3. Backtick ichida yangi qatorga o'tish uchun nima qilish kerak?</summary>
Hech qanday maxsus belgi (masalan, \`\\n\`) yozish shart emas. Shunchaki klaviaturadagi "Enter" tugmasini bosib yangi qatorga o'tish kifoya.
</details>

<details>
<summary>4. Eski + usulining asosiy kamchiligi nima?</summary>
Ko'p o'zgaruvchilar va uzun matnlarni birlashtirishda qo'shtirnoqlar hamda \`+\` belgilarining ko'pligi sababli sintaktik xatolarga yo'l qo'yish juda oson bo'lgan.
</details>

<details>
<summary>5. \${} ichida ternary operator ishlatsa bo'ladimi?</summary>
Ha, \`\${}\` ichida har qanday JavaScript ifodasi (expression), jumladan ternary (uchlik) shart operatori (\`shart ? true : false\`) ham to'liq ishlaydi.
</details>

<details>
<summary>6. Nima uchun bu usul "Template" deb ataladi?</summary>
Chunki u matn uchun andoza (shablon) vazifasini bajaradi va undagi o'zgaruvchilar o'rni dinamik tarzda to'ldiriladi.
</details>

<details>
<summary>7. JSning qaysi versiyasida bu xususiyat qo'shilgan?</summary>
Bu xususiyat JavaScript-ning ES6 (ECMAScript 2015) versiyasida qo'shilgan.
</details>

<details>
<summary>8. \${2 + 2} natijasi nima bo'ladi?</summary>
Natija \`4\` (matn ko'rinishida) bo'ladi, chunki ifoda bajarilib, natija stringga o'giriladi.
</details>

<details>
<summary>9. Backtick ichida oddiy qo'shtirnoq ishlatish mumkinmi?</summary>
Ha, backtick bilan o'ralgan matn ichida hech qanday muammosiz oddiy \`'\` va ikkitalik \`"\` qo'shtirnoqlardan foydalanish mumkin (ularni escape qilish shart emas).
</details>

<details>
<summary>10. HTML elementlarini backtick bilan yasash qulaymi?</summary>
Ha, o'ta qulay. Ko'p qatorli HTML tuzilmalarini va ulardagi dinamik qiymatlarni backtick yordamida juda oson va toza yaratish mumkin.
</details>

<details>
<summary>11. Matnni bir nechta o'zgaruvchidan tashkil qilish misolini keltiring.</summary>
\`\`\`javascript
let ism = "Ali", yosh = 20;
let gap = \`Ism: \${ism}, Yosh: \${yosh}\`;
\`\`\`
</details>

<details>
<summary>12. Backtick ichida funksiya chaqirish mumkinmi?</summary>
Ha, \`\${}\` ichida har qanday funksiyani chaqirish mumkin va funksiya qaytargan qiymat matn ichiga joylashtiriladi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "O'zingizni tanishtiring",
      instruction: "Name, Age o'zgaruvchilarini template literal orqali 'Mening ismim ... yoshim ...da' ko'rinishida chiqaring.",
      startingCode: "const name = 'Farhod';\nconst age = 25;\n// Kodni shu yerda yozing\nconst result = ``;\nconsole.log(result);",
      hint: "result = `Mening ismim ${name}, yoshim ${age}da`;",
      test: "if (code.includes('${name}') && code.includes('${age}')) return null; return 'Template literals ishlatilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Template Literals (andoza matnlar) JavaScript-da qaysi maxsus belgilar yordamida yaratiladi?",
      options: [
        "Oddiy qo'shtirnoqlar (`' '`)",
        "Ikkitalik qo'shtirnoqlar (`\" \"`)",
        "Grave accent / Backticks (`` ` ` ``)",
        "Qavslar (`( )`)"
      ],
      correctAnswer: 2,
      explanation: "Template Literals klaviaturadagi `Esc` tugmasi ostida joylashgan yordamchi backtick (`` ` ``) belgilari bilan o'rab olinadi."
    },
    {
      id: 2,
      question: "Template Literals ichida o'zgaruvchi yoki matematik ifodalarni joylashtirish uchun qaysi sintaksis ishlatiladi?",
      options: [
        "`#{expression}`",
        "`${expression}`",
        "`{{expression}}`",
        "`[expression]`"
      ],
      correctAnswer: 1,
      explanation: "`Dollar` belgisi va undan keyin jingalak qavslar `${...}` yordamida matn ichiga istalgan JavaScript o'zgaruvchisini yoki hisob-kitob amalini joylashtirish mumkin."
    },
    {
      id: 3,
      question: "Eski string birlashtirish (`+` operatori) usuli bilan solishtirganda, Backticks (`` ` ``) yordamida ko'p qatorli (multi-line) matnlarni qanday yozish mumkin?",
      options: [
        "Faqat `\\n` belgisini qo'shib yozish orqali",
        "Hech qanday maxsus belgisiz, shunchaki kodda \"Enter\" tugmasini bosib yangi qatorga o'tish orqali",
        "Har bir qator oxirida `+` belgisini qo'yish orqali",
        "Ko'p qatorli matnlarni backtick bilan yozib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Backticks ishlatilganda yangi qatorlar avtomatik tarzda satr tarkibiga qo'shiladi va hech qanday `\\n` kabi belgilarni yozish shart emas."
    },
    {
      id: 4,
      question: "Quyidagi template literal ifodasi konsolda nima natija qaytaradi: `` `Jami: ${5 + 5}` ``?",
      options: [
        "`\"Jami: 5 + 5\"`",
        "`\"Jami: 10\"`",
        "`\"Jami: ${5 + 5}\"`",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar ichidagi `5 + 5` ifodasi dastur tomonidan bajariladi va uning natijasi (`10`) matnga birlashtiriladi."
    },
    {
      id: 5,
      question: "Template literal ichidagi `${expression}` qismi qanday ishlaydi?",
      options: [
        "U faqat oddiy matnlarni o'zgarishsiz chop etadi",
        "Uning ichidagi JavaScript kodi (ifoda) bajariladi va natijasi avtomatik ravishda satrga (string) o'girilib, o'sha joyga joylashtiriladi",
        "U if-else va for looplarini bajarishga mo'ljallangan",
        "U faqat CSS o'zgaruvchilarini yuklaydi"
      ],
      correctAnswer: 1,
      explanation: "Tizim jingalak qavslar ichida yozilgan kodni oddiy JavaScript kodi sifatida bajaradi va hosil bo'lgan qiymatni stringga aylantiradi."
    }
  ]
};
