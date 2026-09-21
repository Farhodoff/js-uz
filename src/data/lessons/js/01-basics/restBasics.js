export const restBasics = {
  id: "restBasics",
  title: "Rest (...) Operatori: Argumentlarni Yig'ish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz musobaqa g'oliblarini taqdirlayapsiz. 1-o'rin sohibiga shaxsan oltin medal topshirasiz, qolgan barcha ishtirokchilarning sovg'alarini esa bitta umumiy savatga (massivga) yig'ib qo'yasiz.

JavaScript da **Rest operatori (\`...\`)** aynan shunday vazifani bajaradi: u funksiyaga uzatilgan bir nechta yoki qolgan barcha argumentlarni bitta massiv ichiga to'plab oladi.

**Rest operatori (\`...\`)** — funksiya parametrlarida ishlatilib, uzatilgan ortiqcha yoki barcha argumentlarni bitta massivga yig'ib beruvchi maxsus sintaksisdir (\`function fn(...items) { }\`).

*Yangi terminlar:*
- **Rest parametri** — funksiya parametrlar ro'yxatida uchta nuqta (\`...\`) bilan yoziladigan va qolgan argumentlarni bitta massiv qilib beruvchi parametr.
- **Rest so'zi ma'nosi** — inglizcha "the rest" (qolganlari) so'zidan olingan bo'lib, "qolgan barcha argumentlar" degan ma'noni bildiradi.

---

## 2. Nega kerak?

Ba'zida funksiyamizga foydalanuvchi nechta argument uzatishini oldindan bilmaymiz. Masalan, xohlagancha sonlarni qabul qilib ularni konsolga chiqarish kerak bo'lsin.

Agar rest operatori bo'lmasa, har bir argument uchun alohida parametr e'lon qilishga to'g'ri kelardi:
\`\`\`javascript
function print(a, b, c, d, e) { ... }
\`\`\`
Bu usul cheklangan bo'lib, agar kimdir 6-argumentni yuborsa, uni ushlab bo'lmaydi.

Rest operatori bilan funksiya istalgancha argument qabul qiladi va ularning hammasi bitta qulay massivga yig'iladi:
\`\`\`javascript
function print(...items) { ... }
\`\`\`

---

## 3. Birinchi misol

Bu kod istalgancha argumentlarni qabul qilib, ularni bitta massiv sifatida konsolga chiqaradi.

\`\`\`javascript
function printAll(...items) {
  console.log(items); // barcha argumentlar bitta massivda yig'iladi
}

printAll("Olma", "Banan", "Nok");
\`\`\`

\`\`\`text
// Natija:
[ 'Olma', 'Banan', 'Nok' ]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function printAll(...items)\` — funksiya e'lon qilindi. Parametrdagi \`...items\` ifodasi chaqiruv paytida yuborilgan barcha argumentlarni bitta yangi massivga to'playdi.
- \`console.log(items);\` — funksiya tanasi ichida \`items\` oddiy JavaScript massivi sifatida ishlaydi.
- \`printAll("Olma", "Banan", "Nok");\` — funksiya uchta alohida argument bilan chaqirildi va ularning barchasi \`['Olma', 'Banan', 'Nok']\` massiviga aylanib chiqdi.

---

## 5. Qadamma-qadam (trace)

Funksiya chaqiruvi: \`showLeader("Ali", "Vali", "Gani")\`  
Funksiya imzosi: \`function showLeader(winner, ...others)\`

| Parametr | Qaysi argument berildi? | Olingan qiymat | Turi |
|---|---|---|---|
| \`winner\` | 1-argument (\`"Ali"\`) | \`"Ali"\` | Satr (string) |
| \`...others\` | Qolgan barcha argumentlar | \`["Vali", "Gani"]\` | Massiv (array) |

---

## 6. Yana bitta misol

1-misoldan farqi: Birinchi argumentni alohida parametrga olib, qolganlarini rest orqali to'plash.

\`\`\`javascript
function showTeam(leader, ...members) {
  console.log("Yetakchi: " + leader);
  console.log("A'zolar:", members);
}

showTeam("Ali", "Vali", "Sami", "Doston");
\`\`\`

\`\`\`text
// Natija:
Yetakchi: Ali
A'zolar: [ 'Vali', 'Sami', 'Doston' ]
\`\`\`

Tahlil:
- Birinchi uzatilgan \`"Ali"\` qiymati \`leader\` parametriga tushdi.
- Qolgan barcha argumentlar (\`"Vali"\`, \`"Sami"\`, \`"Doston"\`) esa \`members\` nomli massivga yig'ildi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Rest parametrini oxirida emas, boshida yoki o'rtasida yozish

\`\`\`javascript
function test(...items, last) { // XATO: Rest parameter must be last formal parameter
  console.log(items);
}
\`\`\`

**Nima bo'ladi:** Rest parametri faqat "qolgan" argumentlarni yig'gani sababli, u doimo eng oxirgi parametr bo'lishi shart. Aks holda dastur ishga tushmaydi va \`SyntaxError\` beradi.
**To'g'ri varianti:** \`function test(first, ...items)\`.

### 2-xato: Bir nechta rest parametr ishlatish

\`\`\`javascript
function test(...firstList, ...secondList) { // XATO
  console.log(firstList);
}
\`\`\`

**Nima bo'ladi:** Bitta funksiyada faqat bitta rest parametri bo'lishi mumkin.
**To'g'ri varianti:** Barcha argumentlarni bitta rest ga yig'ish: \`function test(...allList)\`.

### 3-xato: Spread va Rest ni adashtirish

- **Spread (\`...\`)** — to'plamni (massivni) alohida bo'laklarga **yoyadi**: \`[...a, ...b]\`.
- **Rest (\`...\`)** — alohida argumentlarni bitta massivga **yig'adi**: \`function fn(...args)\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
Istalgancha sonlarni qabul qilib, ularni bitta massiv sifatida konsolga chiqaruvchi \`showNumbers(...numbers)\` funksiyasini yozing. Funksiyani \`showNumbers(10, 20, 30)\` deb chaqiring.

### 2-mashq (o'rtacha)
Birinchi argument sifatida \`title\` (matn), qolgan argumentlar sifatida esa \`...items\` ni qabul qiluvchi \`printList(title, ...items)\` funksiyasini yozing. Funksiya ichida \`items.length\` (a'zolar soni) ni konsolga chiqaring. \`printList("Meva", "Olma", "Nok")\` chaqiruvi bilan \`2\` natijasi chiqsin.

### 3-mashq (chegara holat)
Rest parametri argument berilmaganda nima bo'ladi? \`collectItems(first, ...rest)\` funksiyasini tuzing va uni faqat bitta argument bilan: \`collectItems("Salom")\` deb chaqiring. Funksiya ichida \`rest\` massivini konsolga chiqaring (\`[]\` bo'sh massiv chiqadi).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function showNumbers(...numbers) {
  console.log(numbers);
}

showNumbers(10, 20, 30); // [10, 20, 30]
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function printList(title, ...items) {
  console.log(items.length);
}

printList("Meva", "Olma", "Nok"); // 2
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
function collectItems(first, ...rest) {
  console.log(rest);
}

collectItems("Salom"); // []
\`\`\`

---

## 9. Xulosa

1. Rest operatori (\`...\`) funksiya parametrlarida ishlatilib, bir nechta argumentlarni bitta massivga to'playdi.
2. Rest parametri parametrlar ro'yxatining doimo eng oxirida turishi shart.
3. Agar rest ga mos qo'shimcha argumentlar yuborilmasa, u xato bermaydi, balki bo'sh massiv (\`[]\`) qaytaradi.

Keyingi darsda: Xatolar bilan ishlash — \`console.error\` va \`console.warn\` xabarlari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sonlarni rest orqali qabul qilish",
      instruction: "Istalgancha sonlarni qabul qilib massiv ko'rinishida chiqaruvchi `showNumbers(...numbers)` funksiyasini yozing va uni `showNumbers(10, 20, 30)` deb chaqiring.",
      startingCode: "// showNumbers(...numbers) funksiyasini yozing va 10, 20, 30 bilan chaqiring\n",
      hint: "function showNumbers(...numbers) {\n  console.log(numbers);\n}\nshowNumbers(10, 20, 30);",
      test: "if (!code.includes('...')) return 'Rest (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('[10,20,30]') || m.includes('10, 20, 30'))) return null;\nreturn 'Massiv [10, 20, 30] konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Qolgan elementlar sonini hisoblash",
      instruction: "`printList(title, ...items)` funksiyasini yozing va ichida `items.length` ni konsolga chiqaring. So'ng `printList(\"Meva\", \"Olma\", \"Nok\")` deb chaqiring.",
      startingCode: "// printList(title, ...items) funksiyasini tuzing va items.length ni chiqaring\n",
      hint: "function printList(title, ...items) {\n  console.log(items.length);\n}\nprintList(\"Meva\", \"Olma\", \"Nok\");",
      test: "if (!code.includes('...')) return 'Rest (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('2')) return null;\nreturn '2 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Bo'sh rest massivini tekshirish",
      instruction: "`collectItems(first, ...rest)` funksiyasini yozing va ichida `rest` ni konsolga chiqaring. Funksiyani faqat bitta argument bilan `collectItems(\"Salom\")` deb chaqiring.",
      startingCode: "// collectItems(first, ...rest) funksiyasini yozing va collectItems(\"Salom\") deb chaqiring\n",
      hint: "function collectItems(first, ...rest) {\n  console.log(rest);\n}\ncollectItems(\"Salom\");",
      test: "if (!code.includes('...')) return 'Rest (...) operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('[]'))) return null;\nreturn 'Bo\\'sh massiv [] konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Rest operatori funksiya parametrlarida qayerda joylashishi shart?",
      options: [
        "Doimo parametrlarning eng oxirida",
        "Doimo eng birinchi o'rinda",
        "O'rtasida ham bo'lishi mumkin",
        "Ixtiyoriy joyda bo'lishi mumkin"
      ],
      correctAnswer: 0,
      explanation: "Rest operatori qolgan barcha argumentlarni yig'ishi uchun parametrlarning eng oxirida turishi shart."
    },
    {
      id: 2,
      question: "function sum(a, ...others) funksiyasi sum(1, 2, 3) deb chaqirilsa, others qanday qiymat oladi?",
      options: [
        "[2, 3]",
        "[1, 2, 3]",
        "2",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "1-argument a ga o'tadi, qolgan 2 va 3 esa others massiviga [2, 3] shaklida yig'iladi."
    },
    {
      id: 3,
      question: "Rest parametriga mos argument uzatilmasa, u qanday qiymatga ega bo'ladi?",
      options: [
        "Bo'sh massiv: []",
        "undefined",
        "null",
        "Xatolik yuz beradi"
      ],
      correctAnswer: 0,
      explanation: "Agar rest ga qo'shimcha argumentlar uzatilmasa, u xato bermaydi va bo'sh massiv [] bo'ladi."
    }
  ]
};
