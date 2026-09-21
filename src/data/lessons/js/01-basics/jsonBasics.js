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
    }
  ]
};
