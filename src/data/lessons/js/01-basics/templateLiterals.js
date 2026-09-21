export const templateLiterals = {
  id: "templateLiterals",
  title: "Template Literals (Backticks)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda tayyor taklifnoma blankasi bor:
"Hurmatli [bu yerga ism yoziladi], sizni bayramga taklif qilamiz!"
Siz qog'ozni qirqib yopishtirmaysiz, balki bo'sh joyga kerakli ismni yozib qo'yasiz.

Template literals (shablonli satrlar) — xuddi shu blankaga o'xshaydi: matn ichiga o'zgaruvchilarni qulay joylashtirish uchun qiya qo'shtirnoq (backtick \\\`\\\`) va \\\`\${}\\\` belgisidan foydalanadigan zamonaviy usuldir.

---

## 2. Nega kerak?

Avvalgi darsda o'rgangan \`+\` belgisi bilan bir nechta o'zgaruvchini ulashda (\`"Salom, " + name + "! Sizning ballingiz: " + score\`) qo'shtirnoqlar ko'payib, bo'sh joylar (probellar) tushib qolishi va kod chalkashib ketishi oson.

Template literals bilan bitta butun matn yoziladi va o'zgaruvchilar kerakli joyga \\\`\${o'zgaruvchi}\\\` shaklida kiritiladi.

---

## 3. Birinchi misol

Bu kod \`name\` o'zgaruvchisini matn ichiga kiritadi va konsolga chiqaradi.

\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`; // Matn ichiga o'zgaruvchini joylashtirish
console.log(message);
\`\`\`

\`\`\`text
// Natija: Salom, Ali!
\`\`\`

---

## 4. Qator-baqator tahlil

- \\\`Salom, \${name}!\\\` — butun matn qiya qo'shtirnoq (backtick) ichiga olingan.
- \`\${name}\` — \`name\` o'zgaruvchisining qiymati (\`"Ali"\`) aynan shu yerga avtomatik qo'yiladi.
- \`console.log(message);\` — hosil bo'lgan matn ekranga chiqadi.

---

## 5. Qadamma-qadam (trace)

| Qadam | Kod qatori | Natija | Izoh |
| :--- | :--- | :--- | :--- |
| 1 | \`let name = "Ali";\` | \`"Ali"\` | Ism saqlandi |
| 2 | \\\`Salom, \${name}!\\\` | \`"Salom, Ali!"\` | \`\${name}\` o'rniga \`"Ali"\` qo'yildi |
| 3 | \`console.log(message);\` | \`"Salom, Ali!"\` | Konsolga chiqdi |

---

## 6. Yana bitta misol

Bu kod matn va son o'zgaruvchilarini bitta gapga joylashtiradi.

\`\`\`javascript
let user = "Vali";
let score = 95;
let result = \`Foydalanuvchi: \${user}, Ball: \${score}\`;
console.log(result);
\`\`\`

\`\`\`text
// Natija: Foydalanuvchi: Vali, Ball: 95
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1. Backtick o'rniga oddiy qo'shtirnoq ishlatish
❌ Xato kod:
\`\`\`javascript
let name = "Ali";
let message = "Salom, \${name}!";
console.log(message);
\`\`\`
Nima bo'ladi: Ekranga \`Salom, \${name}!\` deb so'zma-so'z chiqadi. Chunki \`\${}\` faqat backtick (\\\`\\\`) ichida ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`;
console.log(message);
\`\`\`

### 2. Dollar belgisini unutish
❌ Xato kod:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, {name}!\`;
console.log(message);
\`\`\`
Nima bo'ladi: Ekranga \`Salom, {name}!\` deb chiqadi. O'zgaruvchini joylash uchun albatta \`\$\` belgisi bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let name = "Ali";
let message = \`Salom, \${name}!\`;
console.log(message);
\`\`\`

### 3. Mavjud bo'lmagan o'zgaruvchini yozish
❌ Xato kod:
\`\`\`javascript
let message = \`Salom, \${age}!\`;
\`\`\`
Nima bo'ladi: \`ReferenceError: age is not defined\` xatoligi yuz beradi. \`\${}\` ichida faqat oldindan e'lon qilingan o'zgaruvchilar yozilishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let age = 20;
let message = \`Salom, \${age}!\`;
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`city\` o'zgaruvchisi (\`"Buxoro"\`) qiymatini backtick va \`\${city}\` yordamida \\\`Men \${city} shahrida yashayman\\\` matniga joylang va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`item\` (\`"Kitob"\`) va \`price\` (\`50\`) o'zgaruvchilaridan foydalanib, \\\`Mahsulot: \${item}, Narxi: \${price}\\\` matnini konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni tuzating (ekranga \`Salom, Olim!\` chiqishi kerak):
\`\`\`javascript
let name = "Olim";
let text = "Salom, \${name}!";
console.log(text);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let city = "Buxoro";
let text = \`Men \${city} shahrida yashayman\`;
console.log(text);
\`\`\`
2.
\`\`\`javascript
let item = "Kitob";
let price = 50;
let text = \`Mahsulot: \${item}, Narxi: \${price}\`;
console.log(text);
\`\`\`
3.
\`\`\`javascript
let name = "Olim";
let text = \`Salom, \${name}!\`;
console.log(text);
\`\`\`

---

## 9. Xulosa

1. Template literals — qiya qo'shtirnoq (backtick \\\`\\\`) yordamida yoziladigan zamonaviy matn ko'rinishi.
2. Matn ichiga o'zgaruvchini joylash uchun \`\${o'zgaruvchi}\` sintaksisi ishlatiladi.
3. Bu usul \`+\` belgisi bilan ulashdan ko'ra ancha toza, o'qilishi qulay va xatosizdir.

Keyingi darsda: JavaScript'da sonlar (Number) va ular ustida asosiy amallar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Shablonli satr yaratish",
      instruction: "`city` o'zgaruvchisi berilgan (`\"Buxoro\"`). Backtick va `${city}` yordamida `Men ${city} shahrida yashayman` matnini tuzing va konsolga chiqaring.",
      startingCode: "let city = \"Buxoro\";\n// Backtick va ${city} bilan chiqaring\n",
      hint: "console.log(`Men ${city} shahrida yashayman`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Men Buxoro shahrida yashayman'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkita o'zgaruvchini joylash",
      instruction: "`item` (`\"Kitob\"`) va `price` (`50`) o'zgaruvchilarini backtick yordamida `Mahsulot: ${item}, Narxi: ${price}` ko'rinishida konsolga chiqaring.",
      startingCode: "let item = \"Kitob\";\nlet price = 50;\n// Natijani chiqaring\n",
      hint: "console.log(`Mahsulot: ${item}, Narxi: ${price}`);",
      test: "if (!code.includes('`') || !code.includes('${')) return 'Backtick va ${} ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Mahsulot: Kitob, Narxi: 50'))) return null;\nreturn 'Kutilgan matn to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Oddiy qo'shtirnoq xatosini tuzatish",
      instruction: "Quyidagi koddagi oddiy qo'shtirnoqni backtick (qiya qo'shtirnoq) ga almashtiring, toki ekranga `Salom, Olim!` chiqsin.",
      startingCode: "let name = \"Olim\";\nlet text = \"Salom, ${name}!\";\nconsole.log(text);\n",
      hint: "let name = \"Olim\";\nlet text = `Salom, ${name}!`;\nconsole.log(text);",
      test: "if (code.includes('\"Salom, ${name}!\"') || code.includes(\"'Salom, ${name}! '\")) return 'Oddiy qo\\'shtirnoq o\\'rniga backtick (`) ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom, Olim!'))) return null;\nreturn 'Salom, Olim! matni chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Template literals qaysi belgi yordamida yoziladi?",
      options: [
        "Qo'sh qo'shtirnoq (\")",
        "Qiya qo'shtirnoq (backtick `)",
        "Bittalik qo'shtirnoq (')",
        "Kichik-katta belgilari (< >)"
      ],
      correctAnswer: 1,
      explanation: "Template literals faqat qiya qo'shtirnoq (backtick `) bilan ochilib, u bilan yopiladi."
    },
    {
      id: 2,
      question: "Template literal ichiga o'zgaruvchi qanday joylashtiriladi?",
      options: [
        "&{o'zgaruvchi}",
        "${o'zgaruvchi}",
        "#{o'zgaruvchi}",
        "[o'zgaruvchi]"
      ],
      correctAnswer: 1,
      explanation: "${o'zgaruvchi} sintaksisi orqali o'zgaruvchining qiymati matn ichiga avtomatik qo'yiladi."
    },
    {
      id: 3,
      question: "Quyidagi kod natijasida konsolga nima chiqadi?\n```javascript\nlet user = \"Ali\";\nconsole.log(\"Salom, ${user}\");\n```",
      options: [
        "Salom, Ali",
        "Salom, ${user}",
        "Xatolik beradi",
        "Salom, user"
      ],
      correctAnswer: 1,
      explanation: "Oddiy qo'shtirnoq ishlatilgani uchun ${user} o'zgaruvchi deb tanilmaydi va ekranga aynan \"Salom, ${user}\" deb chiqadi."
    }
  ]
};
