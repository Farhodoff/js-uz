export const jsWhat = {
  id: "jsWhat",
  title: "JavaScript'nima va qayerda ishlaydi",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz uy quryapsiz:
- G'ishtlar va devorlar — bu veb-sahifaning tuzilishi (HTML).
- Bo'yoq, pardalar va mebel — bu sahifaning tashqi ko'rinishi (CSS).
- Elektr va suv tizimi — bu JavaScript. Chiroq tugmasini bossangiz chiroq yonadi, jo'mrakni ochsangiz suv oqadi.

JavaScript — veb-sahifalarga harakat va jon bag'ishlaydigan dasturlash tili (programming language).

### Qayerda ishlaydi?
JavaScript kodi asosan ikki muhitda ishlaydi:
1. **Brauzerda (Browser):** Chrome, Safari yoki Firefox kabi dasturlar ichida. Saytdagi tugmalar bosilishi, animatsiyalar va foydalanuvchi bilan muloqot brauzerda kechadi.
2. **Node.js muhitida (Node.js):** Kompyuter yoki serverda (server). JavaScript kodini brauzersiz, to'g'ridan-to'g'ri kompyuter tizimida ishga tushirish uchun xizmat qiladi.

---

## 2. Nega kerak?

Faqat devor va bo'yoqdan iborat uyda yashab bo'lmaydi — chiroq yoqilmaydi, eshik qulfi ishlamaydi.

Xuddi shunday, JavaScript bo'lmasa, veb-sahifa shunchaki qotib qolgan gazetaga o'xshab qoladi. Tugmani bosganda hech narsa yuz bermaydi, hisob-kitoblar qilinmaydi. JavaScript sahifani tirik tizimga aylantirish uchun kerak.

---

## 3. Birinchi misol

Bu kod ekranga salomlashuv matnini chiqaradi.

\`\`\`javascript
console.log("Salom, dunyo!"); // Matnni konsolga chop etish
\`\`\`

\`\`\`text
// Natija: Salom, dunyo!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`console.log(...)\` — ma'lumotni ekranga yoki dasturchi konsoliga (console) chiqarish buyrug'i.
- \`"Salom, dunyo!"\` — chiqarilayotgan matn (har doim qo'shtirnoq ichida bo'ladi).
- \`;\` — ko'rsatma tugaganini bildiruvchi belgi (nuqta-vergul).

---

## 5. Yana bitta misol

Bu kod ekranga dastur ishga tushgani haqida boshqa matnni chiqaradi.

\`\`\`javascript
console.log("JavaScript ishga tushdi!"); // Yangi matnni konsolga chop etish
\`\`\`

\`\`\`text
// Natija: JavaScript ishga tushdi!
\`\`\`

---

## 6. Ko'p uchraydigan xatolar

### 1. Buyruqni katta harf bilan yozish
❌ Xato kod:
\`\`\`javascript
Console.log("Salom, dunyo!");
\`\`\`
Nima bo'ladi: \`ReferenceError: Console is not defined\` xatoligi yuz beradi. JavaScript katta va kichik harflarni qat'iy farqlaydi. Buyruq faqat kichik harflar bilan yozilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom, dunyo!");
\`\`\`

### 2. Matnni qo'shtirnoqsiz yozish
❌ Xato kod:
\`\`\`javascript
console.log(Salom);
\`\`\`
Nima bo'ladi: \`ReferenceError: Salom is not defined\` xatoligi yuz beradi. Qo'shtirnoqsiz yozilgan so'zni JavaScript oldindan mavjud nom deb o'ylaydi va topolmay qoladi.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

### 3. Qo'shtirnoqni yopmaslik
❌ Xato kod:
\`\`\`javascript
console.log("Salom);
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid or unexpected token\` xatoligi yuz beradi. Ochilgan qo'shtirnoq oxirida yopilishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log("Salom");
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Konsolga \`"Salom!"\` matnini chiqaruvchi 1 qator JavaScript kodini yozing.

### 2-mashq (O'rtacha)
Konsolga \`"Node.js"\` matnini chiqaruvchi kod yozing.

### 3-mashq (Xatoni topish)
Quyidagi xato kodni to'g'rilang:
\`\`\`javascript
Console.log("Dasturlash");
\`\`\`

### Javoblar:
1. \`console.log("Salom!");\`
2. \`console.log("Node.js");\`
3. \`console.log("Dasturlash");\` (\`console\` so'zi kichik harf bilan boshlanadi).

---

## 8. Xulosa

1. JavaScript — veb-sahifalarni harakatga keltiradigan va tirik qiladigan dasturlash tili.
2. U asosan ikki joyda: brauzerda (foydalanuvchi tomonida) va Node.js vositasida serverda ishlaydi.
3. \`console.log("...")\` — ekranga matn chiqarish uchun ishlatiladigan eng asosiy 1 qatorlik buyruq.

Keyingi darsda: Ekranga matn va sonlarni chiqarish uchun \`console.log\` buyrug'i bilan batafsil tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Salom, Dunyo!",
      instruction: "Konsolga `Salom, Dunyo!` matnini chiqaring. `console.log` dan foydalaning.",
      startingCode: "// Salom, Dunyo! matnini konsolga chiqaring\n",
      hint: "console.log(\"Salom, Dunyo!\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Salom, Dunyo!'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi. \"Salom, Dunyo!\" chiqishi kerak';"
    },
    {
      id: 2,
      title: "Node.js matnini chiqarish",
      instruction: "Konsolga `Node.js` matnini chiqaring.",
      startingCode: "// Node.js matnini konsolga chiqaring\n",
      hint: "console.log(\"Node.js\");",
      test: "if (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Node.js'))) return null;\nreturn 'Matn to\\'g\\'ri chiqmadi. \"Node.js\" chiqishi kerak';"
    },
    {
      id: 3,
      title: "Katta harf xatosini to'g'rilash",
      instruction: "`Console.log(\"Salom\");` kodidagi katta harf xatosini to'g'rilang.",
      startingCode: "Console.log(\"Salom\");\n",
      hint: "console.log(\"Salom\"); (console kichik harflar bilan yoziladi)",
      test: "if (code.includes('Console.log')) return 'Console katta harf bilan yozilgan, kichik harf qiling';\nif (!code.includes('console.log')) return 'console.log ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(msg => msg.includes('Salom'))) return null;\nreturn 'Matn chiqmadi';"
    },
    {
      id: 4,
      title: "Son chiqarish",
      instruction: "Konsolga 2026 sonini chiqaring. Matn emas, son yozing (qo'shtirnoqsiz).",
      startingCode: "// 2026 sonini konsolga chiqaring\n",
      hint: "console.log(2026);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2026')) return null;\nreturn 'Konsolga 2026 soni chiqishi kerak edi';"
    },
    {
      id: 5,
      title: "Ikki qator chiqarish",
      instruction: "Bitta kodda ikkita console.log bilan avval Salom, keyin Dunyo so'zlarini chiqaring (har biri alohida qatorda).",
      startingCode: "// Avval Salom, keyin Dunyo\n",
      hint: "Ikkita console.log yozing: birinchisida Salom, ikkinchisida Dunyo.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst i1 = out.findIndex(m => m.includes('Salom'));\nconst i2 = out.findIndex(m => m.includes('Dunyo'));\nif (i1 === -1 || i2 === -1) return 'Ikki matn ham chiqmadi';\nif (i1 > i2) return 'Avval Salom, keyin Dunyo chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "Katta harf xatosini topish",
      instruction: "Quyidagi kodda bitta xato bor: console so'zi katta harf bilan boshlangan. Uni to'g'rilang.",
      startingCode: "Console.log(\"test\");\n",
      hint: "console.log(\"test\"); — console doim kichik harf bilan.",
      test: "if (/Console\.log/.test(code)) return 'Console katta harf bilan qolgan';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('test'))) return null;\nreturn 'test matni chiqmadi';"
    },
    {
      id: 7,
      title: "Qo'shtirnoqni yopish",
      instruction: "Quyidagi kodda ochilgan qo'shtirnoq yopilmagan. Xatoni topib tuzating.",
      startingCode: "console.log(\"Salom);\n",
      hint: "Salom so'zining oxiriga ikkinchi qo'shtirnoqni qo'ying.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom matni chiqmadi';"
    },
    {
      id: 8,
      title: "Matn ichida raqam",
      instruction: "Konsolga quyidagi matnni aynan shunday chiqaring: Javobim 42 (matn ko'rinishida, bitta qatorda).",
      startingCode: "// Matnni konsolga chiqaring\n",
      hint: "console.log(\"Javobim 42\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'Javobim 42')) return null;\nreturn 'Aynan \"Javobim 42\" deb chiqishi kerak';"
    },
    {
      id: 9,
      title: "Chiqish tartibi",
      instruction: "Konsolga avval Birinchi, keyin Ikkinchi so'zlarini chiqaradigan kod yozing. Tartib muhim!",
      startingCode: "// Avval Birinchi, keyin Ikkinchi\n",
      hint: "Ikkita console.log yozing: birinchisida \"Birinchi\", ikkinchisida \"Ikkinchi\".",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nconst flat = out.join('|');\nconst i1 = flat.indexOf('Birinchi');\nconst i2 = flat.indexOf('Ikkinchi');\nif (i1 === -1 || i2 === -1) return 'Ikki matn ham chiqmadi';\nif (i1 > i2) return 'Avval Birinchi chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "Bo'sh qator chiqarish (chegara)",
      instruction: "Konsolga bo'sh qator chiqaruvchi kod yozing — console.log ichida hech narsa yozmang.",
      startingCode: "// Bo'sh qator\n",
      hint: "console.log(\"\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length >= 1) return null;\nreturn 'console.log bir marta chaqirilishi kerak (bosh bolsa ham)';"
    },
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'ning asosiy vazifasi nima?",
      options: [
        "Sahifaga rang va dizayn berish",
        "Veb-sahifalarga harakat va interaktivlik qo'shish",
        "Faqat matnlarni qalin qilish",
        "Kompyuterni o'chirib yoqish"
      ],
      correctAnswer: 1,
      explanation: "HTML sahifaning tuzilishi, CSS uning ko'rinishi, JavaScript esa harakat va mantiq qo'shadi."
    },
    {
      id: 2,
      question: "JavaScript qayerlarda ishlaydi?",
      options: [
        "Faqat kalkulyatorda",
        "Brauzerda va Node.js yordamida kompyuter/serverda",
        "Faqat printerda",
        "Hech qayerda ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript brauzer ichida foydalanuvchi bilan muloqot qiladi, Node.js orqali esa server va kompyuterda ishlaydi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri konsolga to'g'ri matn chiqaradi?",
      options: [
        "Console.log(\"Salom\")",
        "console.log(\"Salom\")",
        "console.log(Salom)",
        "print(\"Salom\")"
      ],
      correctAnswer: 1,
      explanation: "JavaScript harflar registriga sezgir (console kichik harflar bilan yoziladi) va matn doim qo'shtirnoq ichida bo'lishi shart."
    },
    {
      id: 4,
      question: "Veb-sahifaning tuzilishiga (skeletga) nima javob beradi?",
      options: ["CSS", "HTML", "JavaScript", "SQL"],
      correctAnswer: 1,
      explanation: "HTML — sahifaning tuzilishi va mazmuni (skelet). CSS — ko'rinishi, JavaScript — harakati."
    },
    {
      id: 5,
      question: "Veb-sahifaning tashqi ko'rinishi (rang, shrift, joylashuv) nimaga bog'li?",
      options: ["HTML", "CSS", "Node.js", "console.log"],
      correctAnswer: 1,
      explanation: "CSS (Cascading Style Sheets) sahifaning rangini, shriftini va umumiy ko'rinishini beradi."
    },
    {
      id: 6,
      question: "JavaScript kodini brauzersiz, to g ridan to g ri kompyuterning o zida ishga tushirsa bo'ladimi?",
      options: ["Yo'q, hech qanday holatda", "Ha, Node.js yordamida", "Faqat telefonda", "Faqat printerda"],
      correctAnswer: 1,
      explanation: "Node.js — JavaScript'ni brauzerdan tashqarida, kompyuter va serverda ishga tushiradigan muhit."
    },
    {
      id: 7,
      question: "JavaScript bo'lmasa veb-sahifa qanday bo lib qoladi?",
      options: ["Tirik va interaktiv", "Qotib qolgan gazetaga o'xshab qoladi", "Yana tezroq ishlaydi", "O'chib ketadi"],
      correctAnswer: 1,
      explanation: "JavaScriptsiz tugmalar bosilmaydi va animatsiyalar ishlamaydi — sahifa statik (jonlanmagan) bo lib qoladi."
    },
    {
      id: 8,
      question: "console.log buyrug'i nima qiladi?",
      options: ["Kodni o'chiradi", "Ma'lumotni konsolga chiqaradi", "Sahifani yangilaydi", "Internetga ulanadi"],
      correctAnswer: 1,
      explanation: "console.log — dasturchi konsoliga matn yoki qiymat chiqaradigan eng asosiy buyruq."
    },
    {
      id: 9,
      question: "Quyidagi kodda xato qayerda?  Console.log(\"Salom\");",
      options: ["Qo'shtirnoq yopilmagan", "Console katta harf bilan yozilgan", "Nokoma vergul qo'yilgan", "Xato yo'q"],
      correctAnswer: 1,
      explanation: "console doim kichik harf bilan boshlanadi. JavaScript harflarni qat iy farqlaydi, shuning uchun Console.log xato beradi."
    },
    {
      id: 10,
      question: "console.log(Salom) kodida nima uchun xato beradi?",
      options: ["Salom matni uchun qo shtirnoq kerak", "console noto'g'ri buyruq", "Nokoma vergul yetishmayapti", "Salom doim xato"],
      correctAnswer: 0,
      explanation: "Qo'shtirnoqsiz yozilgan so'z nom (variable) deb tushuniladi. Matnni har doim qo shtirnoq ichida yozish kerak."
    },
    {
      id: 11,
      question: "JavaScript qaysi ikki asosiy muhitda ishlaydi?",
      options: ["Faqat brauzerda", "Faqat serverda", "Brauzerda va Node.js da", "Printerda va brauzerda"],
      correctAnswer: 2,
      explanation: "JavaScript asosan brauzerda (Chrome, Firefox) va Node.js orqali server/kompyutarda ishlaydi."
    },
    {
      id: 12,
      question: "Konsolga ketma-ket ikki qator chiqarish uchun nima qilinadi?",
      options: ["Bitta console.log ichiga ikki qator yoziladi", "Ikki marta console.log chaqiriladi", "console.log dan foydalanib bo'lmaydi", "Faqat HTML kerak"],
      correctAnswer: 1,
      explanation: "Har bir qator uchun alohida console.log yoziladi: chaqiruvlar tartibda bajarilib, natija ham ketma-ket chiqadi."
    },
  ]
};
