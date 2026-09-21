export const consoleLog = {
  id: "consoleLog",
  title: "console.log Asoslari",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sizda ovoz kuchaytirgich (megafon) bor:
Siz megafon orqali xohlagan so'zingizni yoki sonni baland ovozda e'lon qilasiz.

Dasturlashda \`console.log()\` xuddi shu megafonga o'xshaydi: u kompyuter xotirasidagi ma'lumotni ekranga chiqarib ko'rsatadi.

\`console.log()\` — JavaScript'da matn yoki sonni ekranga (konsolga) chiqarish uchun ishlatiladigan buyruqdir.

---

## 2. Nega kerak?

Kompyuter kodni o'z ichida jim bajaradi. Agar biz unga natijani ko'rsatishni buyurmasak, dastur nima qilayotganini va hisob-kitob to'g'ri ishlayotganini bilolmaymiz.

\`console.log()\` dasturchiga kod qanday ishlayotganini va ekranda qanday ma'lumot borligini ko'rsatib turadi.

---

## 3. Birinchi misol

Bu kod konsolga matn chiqaradi.

\`\`\`javascript
console.log("Salom!"); // Matnni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`console\` — natijalar ko'rinadigan maxsus oyna (konsol).
- \`.log(...)\` — qavs ichidagi ma'lumotni shu oynaga chiqarish buyrug'i.
- \`"Salom!"\` — qo'shtirnoq ichidagi matn (text).
- \`;\` — qator tugaganini bildiruvchi belgi (nuqta-vergul).

---

## 5. Yana bitta misol

Bu kod konsolga son chiqaradi.

\`\`\`javascript
console.log(25); // Sonni ekranga chiqarish
\`\`\`

\`\`\`text
// Natija: 25
\`\`\`

Sonlar (raqamlar) qo'shtirnoqsiz yoziladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Matnni qo'shtirnoqsiz yozish
❌ Xato kod:
\`\`\`javascript
console.log(Salom);
\`\`\`
Nima bo'ladi: \`ReferenceError: Salom is not defined\` xatoligi yuz beradi. Matn har doim qo'shtirnoq ichida yozilishi shart. Faqat sonlarni qo'shtirnoqsiz yozish mumkin.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

### 2. Qo'shtirnoqni yopmaslik
❌ Xato kod:
\`\`\`javascript
console.log("Salom);
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi yuz beradi. Matn boshlangan qo'shtirnoq oxirida yopilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

### 3. Katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
Console.log(100);
\`\`\`
Nima bo'ladi: \`ReferenceError: Console is not defined\` xatoligi yuz beradi. JavaScript katta-kichik harfni farqlaydi. Buyruq kichik harf bilan yozilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log(100);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Konsolga \`"JavaScript"\` matnini chiqaruvchi kod yozing.

### 2-mashq (O'rtacha)
Konsolga \`42\` sonini chiqaruvchi kod yozing (qo'shtirnoqsiz).

### 3-mashq (Xatoni topish)
Quyidagi koddagi xatoni toping va to'g'rilang:
\`\`\`javascript
console.log(Salom);
\`\`\`

### Javoblar:
1. \`console.log("JavaScript");\`
2. \`console.log(42);\`
3. \`console.log("Salom");\` (\`Salom\` so'zi matn bo'lgani uchun qo'shtirnoq ichida bo'lishi kerak).

---

## 8. Xulosa

1. \`console.log()\` — matn va sonlarni ekranga (konsolga) chiqarish buyrug'i.
2. Matnlar har doim qo'shtirnoq ichida yoziladi: \`"Salom"\`.
3. Sonlar qo'shtirnoqsiz to'g'ridan-to'g'ri yoziladi: \`25\`.

Keyingi darsda: Kod ichida tushuntirish va eslatmalar qoldirish uchun sharhlar (comments) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Matn chiqarish",
      instruction: "Konsolga `\"Dasturlash\"` matnini chiqaring. `console.log` dan foydalaning.",
      startingCode: "// Dasturlash matnini chiqaring\n",
      hint: "console.log(\"Dasturlash\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Dasturlash'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi. \"Dasturlash\" chiqishi kerak';"
    },
    {
      id: 2,
      title: "Son chiqarish",
      instruction: "Konsolga `100` sonini chiqaring (qo'shtirnoqsiz).",
      startingCode: "// 100 sonini chiqaring\n",
      hint: "console.log(100);",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nif (code.includes('\"100\"') || code.includes(\"'100'\")) return 'Sonni qo\\'shtirnoqsiz yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('100'))) return null;\nreturn '100 soni chiqmadi.';"
    },
    {
      id: 3,
      title: "Xatoni tuzatish",
      instruction: "`console.log(Salom);` kodidagi xatoni tuzating (matn qo'shtirnoqda bo'lishi kerak).",
      startingCode: "console.log(Salom);\n",
      hint: "console.log(\"Salom\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Salom'))) return null;\nreturn 'Matn chiqmadi.';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Konsolga son chiqarishda u qanday yoziladi?",
      options: [
        "Har doim qo'shtirnoq ichida",
        "To'g'ridan-to'g'ri raqam holida (qo'shtirnoqsiz)",
        "Katta harflar bilan",
        "Sonlarni konsolga chiqarib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Sonlar JavaScript'da to'g'ridan-to'g'ri raqam ko'rinishida qo'shtirnoqsiz yoziladi: console.log(42);"
    },
    {
      id: 2,
      question: "`console.log(Salom);` kodi nima uchun xato beradi?",
      options: [
        "Nuqta-vergul qo'yilmagan",
        "Salom so'zi qo'shtirnoqsiz yozilgan, matn doim qo'shtirnoqda bo'lishi kerak",
        "console so'zi noto'g'ri",
        "Xato bermaydi"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoqsiz yozilgan so'z o'zgaruvchi deb qabul qilinadi va ReferenceError xatoligi kelib chiqadi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri to'g'ri yozilgan?",
      options: [
        "Console.log(\"Salom\")",
        "console.log(2026)",
        "console.log(\"Salom)",
        "log.console(2026)"
      ],
      correctAnswer: 1,
      explanation: "console.log(2026) — to'g'ri variant. console kichik harfda va son qo'shtirnoqsiz yozilgan."
    }
  ]
};
