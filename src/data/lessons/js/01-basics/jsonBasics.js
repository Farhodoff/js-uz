export const jsonBasics = {
  id: "jsonBasics",
  title: "JSON Asoslari: JSON.stringify va JSON.parse",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'stingizga pochta orqali chiroyli yig'ilgan mebel (masalan, stul) yubormoqchisiz. Lekin butun stulni pochta qutisiga sig'dirib bo'lmaydi. Uni qismlarga ajratib, qutiga tekis qilib joylaysiz va jo'natasiz. Do'stingiz esa posilkani qabul qilib, qutini ochadi va qismlardan yana o'sha stulni tiklab oladi.

Internet va dasturlar olamida ham xuddi shunday: kompyuter xotirasidagi murakkab obyektlarni tarmoq orqali to'g'ridan-to'g'ri uzatib bo'lmaydi. Ularni avval bitta tekis matn (satr) ko'rinishiga keltirish kerak bo'ladi.

**JSON (JavaScript Object Notation)** — ma'lumotlarni saqlash va turli dasturlar yoki serverlar o'rtasida matn (string) ko'rinishida almashish uchun ishlatiladigan eng mashhur formatdir.

*Yangi terminlar:*
- **JSON** — JavaScript obyektiga juda o'xshash, lekin sof matn shaklidagi ma'lumot formati.
- **JSON.stringify()** — JavaScript obyektini yoki massivini JSON matniga (satrga) aylantiruvchi metod.
- **JSON.parse()** — JSON matnini qaytadan JavaScript obyektiga yoki massiviga aylantiruvchi metod.

---

## 2. Nega kerak?

Foydalanuvchi ma'lumotlarini serverga yuborish, faylga saqlash yoki brauzer xotirasiga yozib qo'yish kerak bo'lganda, JavaScript obyektlarini to'g'ridan-to'g'ri saqlab bo'lmaydi — tarmoq va fayllar faqat matn (satr) bilan ishlaydi.

JSON bu muammoni hal qiladi:
- \`JSON.stringify()\` bilan obyektni bir zumda matnga o'giramiz.
- \`JSON.parse()\` bilan esa o'sha matndan yana to'liq ishlaydigan obyekt hosil qilamiz.

---

## 3. Birinchi misol

Bu kod obyektni JSON matniga aylantiradi va keyin yana qaytadan obyektga o'giradi.

\`\`\`javascript
const user = { name: "Ali", age: 25 };

const jsonString = JSON.stringify(user); // obyektni matnga aylantirish
console.log(jsonString); // '{"name":"Ali","age":25}'

const parsedUser = JSON.parse(jsonString); // matnni yana obyektga aylantirish
console.log(parsedUser.name); // "Ali"
\`\`\`

\`\`\`text
// Natija:
{"name":"Ali","age":25}
Ali
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const user = { name: "Ali", age: 25 };\` — oddiy JavaScript obyekti e'lon qilindi.
- \`const jsonString = JSON.stringify(user);\` — \`JSON.stringify()\` metodi \`user\` obyektini matnga aylantirdi. JSON formatida barcha kalit nomlari majburiy ravishda qo'shtirnoq \`"\` ichiga olinadi (\`"name"\`, \`"age"\`).
- \`console.log(jsonString);\` — konsolga sof matn (string) chiqdi.
- \`const parsedUser = JSON.parse(jsonString);\` — \`JSON.parse()\` metodi JSON matnini o'qib, uni yana haqiqiy JavaScript obyektiga aylantirib berdi.
- \`console.log(parsedUser.name);\` — endi \`parsedUser\` oddiy obyekt bo'lgani uchun, uning xususiyatini nuqta orqali bemalol o'qiy olamiz.

---

## 5. Qadamma-qadam (trace)

Obyektning o'zgarish bosqichlari:

| Bosqich | Kod | Turi (\`typeof\`) | Qiymat | Izoh |
|---|---|---|---|---|
| 1 | Boshlang'ich obyekt | \`object\` | \`{ name: "Ali", age: 25 }\` | Xotiradagi JS obyekti |
| 2 | \`JSON.stringify(user)\` | \`string\` | \`'{"name":"Ali","age":25}'\` | Matnga aylandi |
| 3 | \`JSON.parse(jsonString)\` | \`object\` | \`{ name: "Ali", age: 25 }\` | Yana JS obyektiga aylandi |

---

## 6. Yana bitta misol

1-misoldan farqi: Massivni JSON matniga aylantirish va qaytarib olish.

\`\`\`javascript
const fruits = ["Olma", "Nok", "Anor"];

const jsonArray = JSON.stringify(fruits);
console.log(jsonArray); // '["Olma","Nok","Anor"]'

const parsedFruits = JSON.parse(jsonArray);
console.log(parsedFruits[0]); // "Olma"
\`\`\`

\`\`\`text
// Natija:
["Olma","Nok","Anor"]
Olma
\`\`\`

Tahlil:
- JSON faqat obyektlar bilan emas, balki massivlar bilan ham birdek ishlaydi.
- \`parsedFruits[0]\` — qayta tiklangan massivning birinchi elementiga indeks orqali murojaat qildik.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: JSON matnidagi xususiyatga nuqta orqali to'g'ridan-to'g'ri murojaat qilish

\`\`\`javascript
const jsonString = '{"name":"Ali"}';

console.log(jsonString.name); // XATO: undefined
\`\`\`

**Nima bo'ladi:** \`jsonString\` bu oddiy matn (string), obyekt emas. Matnda \`.name\` xususiyati yo'qligi sababli \`undefined\` chiqadi.
**To'g'ri varianti:** Avval \`JSON.parse()\` orqali obyektga aylantiring:
\`\`\`javascript
const user = JSON.parse(jsonString);
console.log(user.name); // "Ali"
\`\`\`

### 2-xato: Noto'g'ri JSON formatidagi matnni parse qilish

\`\`\`javascript
const brokenJson = "{ name: 'Ali' }"; // XATO: kalit qo'shtirnoqsiz, qiymat bittalik tirnoqda

JSON.parse(brokenJson); // SyntaxError: Unexpected token
\`\`\`

**Nima bo'ladi:** JSON qoidasiga ko'ra kalitlar va matnli qiymatlar FAQAT qo'shtirnoq \`"\` bilan yozilishi shart. Aks holda \`SyntaxError\` yuzaga keladi.
**To'g'ri varianti:** \`'{"name":"Ali"}'\`.

### 3-xato: Obyektga to'g'ridan-to'g'ri JSON.parse() qo'llash

\`\`\`javascript
const person = { age: 20 };

JSON.parse(person); // XATO: SyntaxError
\`\`\`

**Nima bo'ladi:** \`JSON.parse()\` faqat matn qabul qiladi. Unga allaqachon obyekt bo'lgan o'zgaruvchini berib bo'lmaydi.
**To'g'ri varianti:** Obyektni avval matnga o'girish uchun \`JSON.stringify()\` ishlatiladi.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`car = { brand: "Tesla", year: 2023 }\` obyekti berilgan. \`JSON.stringify(car)\` yordamida uni JSON matniga aylantiring va natijani konsolga chiqaring.

### 2-mashq (o'rtacha)
\`data = '{"city":"Samarqand","temp":28}'\` ko'rinishidagi JSON matni berilgan. Uni \`JSON.parse(data)\` orqali obyektga aylantiring va uning \`city\` xususiyatini konsolga chiqaring (\`"Samarqand"\`).

### 3-mashq (chegara holat)
\`items = ["kitob", "qalam"]\` massivi berilgan. Uni avval \`JSON.stringify\` qilib matnga aylantiring, so'ng olingan matnni \`JSON.parse\` qilib yangi massivga o'giring va uning birinchi elementini (\`[0]\`) konsolga chiqaring (\`"kitob"\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const car = { brand: "Tesla", year: 2023 };
const jsonString = JSON.stringify(car);

console.log(jsonString);
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const data = '{"city":"Samarqand","temp":28}';
const obj = JSON.parse(data);

console.log(obj.city);
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const items = ["kitob", "qalam"];
const jsonArray = JSON.stringify(items);
const parsedItems = JSON.parse(jsonArray);

console.log(parsedItems[0]); // "kitob"
\`\`\`

---

## 9. Xulosa

1. JSON — ma'lumotlarni matn shaklida saqlash va dasturlar o'rtasida almashish uchun standart formatdir.
2. \`JSON.stringify(obj)\` — JavaScript obyekt yoki massivini JSON matniga aylantiradi.
3. \`JSON.parse(str)\` — JSON matnini o'qib, uni qaytadan JavaScript obyekt yoki massiviga aylantiradi.

Keyingi darsda: ES6 yangiliklari — massiv elementlarini qulay ajratib olish (Destructuring) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Obyektni JSON matniga aylantirish",
      instruction: "`car = { brand: \"Tesla\", year: 2023 }` obyekti berilgan. `JSON.stringify(car)` yordamida uni JSON matniga aylantiring va natijani konsolga chiqaring.",
      startingCode: "const car = { brand: \"Tesla\", year: 2023 };\n// car obyektini JSON.stringify orqali matnga aylantiring va konsolga chiqaring\n",
      hint: "const jsonString = JSON.stringify(car);\nconsole.log(jsonString);",
      test: "if (!code.includes('JSON.stringify')) return 'JSON.stringify ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('\"Tesla\"') && m.includes('2023'))) return null;\nreturn 'Natijada JSON matni chiqmadi';"
    },
    {
      id: 2,
      title: "JSON matnini obyektga aylantirish",
      instruction: "`data = '{\"city\":\"Samarqand\",\"temp\":28}'` matni berilgan. `JSON.parse(data)` yordamida obyektga aylantiring va uning `city` xususiyatini konsolga chiqaring.",
      startingCode: "const data = '{\"city\":\"Samarqand\",\"temp\":28}';\n// JSON.parse orqali obyektga o'giring va city qiymatini chiqaring\n",
      hint: "const obj = JSON.parse(data);\nconsole.log(obj.city);",
      test: "if (!code.includes('JSON.parse')) return 'JSON.parse ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('Samarqand')) return null;\nreturn 'city xususiyati (\"Samarqand\") to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Massivni JSON orqali nusxalash",
      instruction: "`items = [\"kitob\", \"qalam\"]` massivini avval `JSON.stringify` orqali matnga, so'ng uni `JSON.parse` orqali qayta massivga aylantiring va birinchi elementini (`[0]`) konsolga chiqaring.",
      startingCode: "const items = [\"kitob\", \"qalam\"];\n// JSON.stringify va JSON.parse qo'llang va birinchi elementni chiqaring\n",
      hint: "const str = JSON.stringify(items);\nconst parsed = JSON.parse(str);\nconsole.log(parsed[0]);",
      test: "if (!code.includes('JSON.stringify') || !code.includes('JSON.parse')) return 'JSON.stringify va JSON.parse ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.includes('kitob')) return null;\nreturn 'Massivning birinchi elementi (\"kitob\") chiqmadi';"
    },
    {
      "id": 4,
      "title": "Massivni JSON matniga aylantirish",
      "instruction": "`const nums = [1, 2, 3];` massivini `JSON.stringify` yordamida JSON matniga aylantirib, natijani konsolga chiqaring.",
      "startingCode": "const nums = [1, 2, 3];\n// JSON.stringify bilan matnga aylantiring va chiqaring\n",
      "hint": "const json = JSON.stringify(nums);\nconsole.log(json);",
      "test": "if (!code.includes(\"JSON.stringify\")) return \"JSON.stringify ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"[1,2,3]\"))) return null;\nreturn \"JSON matni [1,2,3] konsolga chiqmadi\";"
    },
    {
      "id": 5,
      "title": "JSON matnidan qiymat olish",
      "instruction": "`const json = '{\"a\": 1, \"b\": 2}';` matnini `JSON.parse` yordamida obyektga aylantirib, `b` qiymatini konsolga chiqaring.",
      "startingCode": "const json = '{\"a\": 1, \"b\": 2}';\n// JSON.parse qilib b qiymatini chiqaring\n",
      "hint": "const obj = JSON.parse(json);\nconsole.log(obj.b);",
      "test": "if (!code.includes(\"JSON.parse\")) return \"JSON.parse ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"2\")) return null;\nreturn \"b qiymati 2 konsolga chiqmadi\";"
    },
    {
      "id": 6,
      "title": "JSON massiv uzunligini olish",
      "instruction": "`const json = '[10, 20, 30]';` matnini `JSON.parse` qilib, hosil bo'lgan massiv uzunligini konsolga chiqaring (`3`).",
      "startingCode": "const json = '[10, 20, 30]';\n// JSON.parse qilib uzunlikni chiqaring\n",
      "hint": "const arr = JSON.parse(json);\nconsole.log(arr.length);",
      "test": "if (!code.includes(\"JSON.parse\")) return \"JSON.parse ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"3\")) return null;\nreturn \"Massiv uzunligi 3 konsolga chiqmadi\";"
    },
    {
      "id": 7,
      "title": "Yaroqsiz JSONni tuzatish",
      "instruction": "`const bad = \"{name: 'Ali'}\";` matni yaroqli JSON emas (kalitlar qo'shtirnoqsiz). Uni to'g'ri JSON matniga `'{\"name\":\"Ali\"}'` o'zgartirib, `JSON.parse` qilib `name` ni chiqaring.",
      "startingCode": "const bad = \"{name: 'Ali'}\";\n// bad ni to'g'ri JSON matniga o'zgartiring va name ni chiqaring\n",
      "hint": "const json = '{\"name\":\"Ali\"}';\nconst obj = JSON.parse(json);\nconsole.log(obj.name);",
      "test": "if (!code.includes(\"JSON.parse\")) return \"JSON.parse ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Hali xato bor: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.includes(\"Ali\"))) return null;\nreturn \"name qiymati Ali konsolga chiqmadi\";"
    },
    {
      "id": 8,
      "title": "Obyektni JSON matniga aylantirish",
      "instruction": "`const book = { title: \"Kitob\", pages: 100 };` obyektini `JSON.stringify` qilib, natijani konsolga chiqaring.",
      "startingCode": "const book = { title: \"Kitob\", pages: 100 };\n// JSON.stringify natijasini chiqaring\n",
      "hint": "console.log(JSON.stringify(book));",
      "test": "if (!code.includes(\"JSON.stringify\")) return \"JSON.stringify ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nconst all = out.join(\"|\");\nif (all.includes(\"title\") && all.includes(\"100\")) return null;\nreturn \"JSON matnida title va 100 chiqmadi\";"
    },
    {
      "id": 9,
      "title": "Parse qilib hisoblash",
      "instruction": "`const json = '{\"x\": 5, \"y\": 3}';` matnini `JSON.parse` qilib, `x + y` natijasini konsolga chiqaring (`8`).",
      "startingCode": "const json = '{\"x\": 5, \"y\": 3}';\n// parse qilib x + y ni chiqaring\n",
      "hint": "const obj = JSON.parse(json);\nconsole.log(obj.x + obj.y);",
      "test": "if (!code.includes(\"JSON.parse\")) return \"JSON.parse ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"8\")) return null;\nreturn \"Natija 8 konsolga chiqmadi\";"
    },
    {
      "id": 10,
      "title": "Massivni parse qilib yig'indi (chegara)",
      "instruction": "`const json = '[1, 2, 3, 4]';` matnini `JSON.parse` qilib, massivdagi barcha sonlar yig'indisini konsolga chiqaring (`10`).",
      "startingCode": "const json = '[1, 2, 3, 4]';\n// parse qilib yig'indini chiqaring\n",
      "hint": "const arr = JSON.parse(json);\nlet sum = 0;\nfor (const n of arr) sum += n;\nconsole.log(sum);",
      "test": "if (!code.includes(\"JSON.parse\")) return \"JSON.parse ishlatilmadi\";\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(\" \"));\ntry { new Function(code)(); } catch (e) { return \"Xato: \" + e.message; } finally { console.log = orig; }\nif (out.some((m) => m.trim() === \"10\")) return null;\nreturn \"Yig'indi 10 konsolga chiqmadi\";"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript obyektini JSON matniga aylantirish uchun qaysi metod ishlatiladi?",
      options: [
        "JSON.stringify(obj)",
        "JSON.parse(obj)",
        "JSON.toText(obj)",
        "obj.toJSON()"
      ],
      correctAnswer: 0,
      explanation: "JSON.stringify() metodi har qanday JavaScript obyekti yoki massivini JSON standartidagi matnga (satrga) aylantiradi."
    },
    {
      id: 2,
      question: "JSON matnini yana qaytadan JavaScript obyektiga aylantirish uchun qaysi metod ishlatiladi?",
      options: [
        "JSON.parse(jsonString)",
        "JSON.stringify(jsonString)",
        "JSON.toObject(jsonString)",
        "JSON.convert(jsonString)"
      ],
      correctAnswer: 0,
      explanation: "JSON.parse() metodi JSON matnini o'qib, uni JavaScript obyekti yoki massiviga aylantirib beradi."
    },
    {
      id: 3,
      question: "JSON formatida kalit nomlari qanday yozilishi shart?",
      options: [
        "Faqat qo'shtirnoq ichida (\"kalit\")",
        "Tirnoqsiz (kalit)",
        "Bittalik tirnoqda ('kalit')",
        "Ixtiyoriy shaklda"
      ],
      correctAnswer: 0,
      explanation: "JSON qat'iy standartiga ko'ra, barcha kalit nomlari va matnli qiymatlar faqat qo'shtirnoq (\") ichida yozilishi shart."
    },
    {
      "id": 4,
      "question": "JSON qanday ma'lumot turlarini saqlay oladi?",
      "options": [
        "String, number, boolean, null, massiv va obyekt",
        "Faqat string va number",
        "Funksiya va metodlar",
        "Faqat massivlar"
      ],
      "correctAnswer": 0,
      "explanation": "JSON string, number, boolean, null, massiv va obyektni qo'llab-quvvatlaydi; funksiya va undefined kirmaydi."
    },
    {
      "id": 5,
      "question": "`JSON.stringify([1, 2])` natijasi nima?",
      "options": [
        "\"[1,2]\" matni",
        "[1, 2] massivi",
        "1, 2",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "JSON.stringify massivni JSON matniga aylantiradi: [1,2]."
    },
    {
      "id": 6,
      "question": "`JSON.parse('{\"a\": 1}').a` natijasi nima?",
      "options": [
        "1",
        "\"1\"",
        "undefined",
        "a"
      ],
      "correctAnswer": 0,
      "explanation": "JSON.parse matnni obyektga aylantiradi; .a orqali uning qiymati — 1 raqami olinadi."
    },
    {
      "id": 7,
      "question": "JSON formatida kalit nomlari qanday yozilishi shart?",
      "options": [
        "Har doim qo'shtirnoq ichida",
        "Tirnoqsiz bo'lishi mumkin",
        "Faqat bittalik tirnoqda",
        "Ixtiyoriy shaklda"
      ],
      "correctAnswer": 0,
      "explanation": "JSON standartida kalitlar har doim qo'sh tirnoq ichida yoziladi; JavaScript obyektidagi tirnoqsiz kalitga yo'l qo'yilmaydi."
    },
    {
      "id": 8,
      "question": "Obyekt ichida funksiya (metod) bo'lsa, `JSON.stringify` uni qanday aks ettiradi?",
      "options": [
        "Funksiya matnga kiritilmaydi",
        "Funksiya kodi matn bo'lib qo'shiladi",
        "Xato beradi",
        "null bo'lib qoladi"
      ],
      "correctAnswer": 0,
      "explanation": "JSON funksiyalarni qo'llab-quvvatlamaydi, shuning uchun JSON.stringify ularni natijaga kiritmaydi."
    },
    {
      "id": 9,
      "question": "`JSON.stringify(obj, null, 2)` dagi uchinchi argument nima vazifani bajaradi?",
      "options": [
        "Matnni chiroyli, bo'sh joy bilan formatlaydi",
        "Obyektni o'chiradi",
        "Kalitlarni teskari qiladi",
        "Matnni parse qiladi"
      ],
      "correctAnswer": 0,
      "explanation": "Uchinchi argument (indent) JSON natijasini o'qish uchun chiroyli bo'shliqlar bilan formatlaydi."
    },
    {
      "id": 10,
      "question": "`JSON.parse('[1, 2]').length` natijasi nima?",
      "options": [
        "2",
        "1",
        "[1, 2]",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "JSON.parse massivni qaytaradi, uning length xususiyati esa 2 ga teng."
    },
    {
      "id": 11,
      "question": "JSON va oddiy JavaScript obyekti o'rtasidagi asosiy farq nima?",
      "options": [
        "JSON kalitlari majburiy qo'shtirnoqda, izoh va funksiyaga yo'l qo'yilmaydi",
        "Ularning farqi yo'q",
        "JSON faqat sonlarni saqlaydi",
        "JavaScript obyektida kalit bo'lmaydi"
      ],
      "correctAnswer": 0,
      "explanation": "JSON matn formatidir: kalitlar qo'shtirnoqda, izohlar va funksiyalar yo'q; JavaScript obyekti bularning barchasini qo'llab-quvvatlaydi."
    },
    {
      "id": 12,
      "question": "`const s = JSON.stringify({ a: 1 }); console.log(typeof s);` nima chiqaradi?",
      "options": [
        "string",
        "object",
        "number",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "JSON.stringify natijasi har doim matn (string) bo'ladi, hatto kiritilgan qiymat obyekt bo'lsa ham."
    }
  ]
};
