export const callbackBasics = {
  id: "callbackBasics",
  title: "Callback Funksiyalar",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz ustaxonaga mashinangizni topshirdingiz va ustaga: "Mashinani tuzatib bo'lgach, menga qo'ng'iroq qiling" dedingiz. Siz ustaga tayyor natija emas, ish bitganda bajarishi kerak bo'lgan vazifani (yo'riqnomani) topshirasiz.
JavaScript da ham xuddi shunday: biz bitta funksiyaga boshqa bir funksiyani topshiriq (vazifa) sifatida berib yuborishimiz mumkin.

**Callback (qayta chaqiriluvchi funksiya)** — boshqa bir funksiyaga argument (qiymat) sifatida uzatiladigan va o'sha funksiya ichida chaqiriladigan funksiyadir.

*Yangi terminlar:*
- **Callback (callback funksiya)** — boshqa funksiyaga argument sifatida beriladigan funksiya.
- **Higher-order function (yuqori tartibli funksiya)** — o'ziga boshqa funksiyani parametr sifatida qabul qiluvchi funksiya.

---

## 2. Nega kerak?

Agar funksiyamiz ichidagi harakat oldindan qotib qolgan bo'lsa, har bir yangi vazifa uchun qaytadan yangi funksiya yozishga to'g'ri kelardi:

\`\`\`javascript
// Muammo: Qat'iy yozilgan funksiyalar
function doWorkWithHello() {
  console.log("Ish bajarildi!");
  console.log("Salom!");
}

function doWorkWithBye() {
  console.log("Ish bajarildi!");
  console.log("Xayr!");
}
\`\`\`

Callback yordamida biz asosiy jarayonni bitta umumiy funksiyada yozamiz, o'zgaruvchan qismini esa tashqaridan funksiya ko'rinishida uzatamiz. Bu kodni nihoyatda qisqa, moslashuvchan va toza qiladi.

---

## 3. Birinchi misol

Bu kod bitta funksiyaga boshqa funksiyani argument qilib berish va uni ichkarida chaqirishni ko'rsatadi.

\`\`\`javascript
function askUser(action) { // action — callback funksiya
  action(); // parametr sifatida kelgan funksiyani chaqirish
}

function sayHello() { // oddiy funksiya
  console.log("Salom!");
}

askUser(sayHello); // sayHello ni argument sifatida berish (qavslarsiz!)
\`\`\`

\`\`\`text
// Natija:
Salom!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function askUser(action) {\` — \`askUser\` nomli funksiya e'lon qilindi. U \`action\` degan parametr qabul qiladi.
- \`action();\` — kelgan \`action\` parametri oddiy son yoki matn emas, funksiya bo'lgani sababli uni qavslar \`()\` orqali ishga tushiramiz (chaqiramiz).
- \`function sayHello() { console.log("Salom!"); }\` — oddiy funksiya yaratildi.
- \`askUser(sayHello);\` — **Eng muhim joyi:** biz \`sayHello\` ni qavslarsiz (\`()\` qo'ymasdan) yozamiz! Chunki biz funksiyani darhol chaqirib natijasini emas, balki funksiyaning o'zini uzatyapmiz.

---

## 5. Qadamma-qadam (trace)

Bajarilish jarayoni jadvali:

| Qadam | Kod | Nima sodir bo'ladi? |
|---|---|---|
| 1 | \`function askUser(action) { ... }\` | \`askUser\` funksiyasi xotirada yaratildi |
| 2 | \`function sayHello() { ... }\` | \`sayHello\` funksiyasi xotirada yaratildi |
| 3 | \`askUser(sayHello);\` | \`askUser\` chaqirildi, \`action\` parametriga \`sayHello\` funksiyasi o'rnatildi |
| 4 | \`action();\` | \`action\` chaqirilganda aslida \`sayHello()\` ishga tushadi |
| 5 | \`console.log("Salom!");\` | Konsolga "Salom!" chiqadi |

---

## 6. Yana bitta misol

1-misoldan farqi: Callback funksiyaga ichkaridan ma'lumot (argument) uzatish.

\`\`\`javascript
function processNumber(num, operation) {
  let result = operation(num); // callback ga num uzatiladi
  console.log(result);
}

function double(n) {
  return n * 2;
}

processNumber(5, double); // 5 soni va double funksiyasi berildi
\`\`\`

\`\`\`text
// Natija:
10
\`\`\`

Tahlil:
- \`processNumber\` funksiyasi \`num = 5\` va \`operation = double\` qiymatlarini oladi.
- Ichkarida \`operation(5)\` chaqiriladi, bu esa \`double(5)\` ni ishga tushirib \`10\` qaytaradi.
- Natijada konsolga \`10\` chiqadi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Argument sifatida berayotganda qavslarni () qo'yib yuborish

\`\`\`javascript
function run(action) {
  action();
}

function greet() {
  console.log("Salom");
}

run(greet()); // XATO: greet() chaqirilib ketadi!
\`\`\`

**Nima bo'ladi:** \`greet()\` funksiyasi uzatilishdan oldinoq darhol ishlab ketadi va \`undefined\` qaytaradi. \`run\` esa \`undefined()\` ni chaqirishga urinib \`TypeError: action is not a function\` xatosini beradi.
**To'g'ri varianti:** Har doim qavslarsiz funksiya nomini yozing: \`run(greet);\`.

### 2-xato: Callback ni funksiya ichida chaqirishda qavslarni () unutish

\`\`\`javascript
function execute(action) {
  action; // XATO: qavslar unutilgan!
}

function sayHi() {
  console.log("Salom");
}

execute(sayHi); // Hech qanday natija bo'lmaydi!
\`\`\`

**Nima bo'ladi:** Funksiya shunchaki turadi, lekin chaqirilmaydi (ishga tushmaydi). Konsol bo'sh qoladi.
**To'g'ri varianti:** Funksiyani ishlatish uchun doimo qavs qo'ying: \`action();\`.

### 3-xato: Callback kutilgan parametrga oddiy qiymat berib yuborish

\`\`\`javascript
function doTask(callback) {
  callback();
}

doTask("Salom"); // XATO: TypeError: callback is not a function
\`\`\`

**Nima bo'ladi:** Matn (string) chaqirib bo'ladigan funksiya emas, shu sababli dastur \`TypeError\` xatosi bilan to'xtaydi.
**To'g'ri varianti:** Callback sifatida faqat funksiya uzatish lozim.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`runTwice(action)\` nomli funksiya yozing. U berilgan \`action\` callback funksiyasini ketma-ket 2 marta chaqirsin (\`action(); action();\`). Konsolga \`"Salom"\` chiqaruvchi \`sayHi\` funksiyasini yozib, uni \`runTwice(sayHi)\` orqali ishga tushiring.

### 2-mashq (o'rtacha)
\`calculate(a, b, operation)\` nomli funksiya yozing. U \`operation(a, b)\` natijasini qaytarsin (\`return operation(a, b);\`). Ikkita sonni qo'shuvchi \`add(x, y)\` funksiyasini yozing (\`return x + y;\`). \`calculate(4, 6, add)\` orqali natijani hisoblab, konsolga chiqaring.

### 3-mashq (chegara holat)
\`calculate\` funksiyasiga alohida nomli funksiya o'rniga to'g'ridan-to'g'ri arrow funksiyani callback qilib uzating: \`calculate(10, 2, (x, y) => { return x - y; })\` va natijani konsolga chiqaring.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function runTwice(action) {
  action();
  action();
}

function sayHi() {
  console.log("Salom");
}

runTwice(sayHi);
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function calculate(a, b, operation) {
  return operation(a, b);
}

function add(x, y) {
  return x + y;
}

let sum = calculate(4, 6, add);
console.log(sum); // 10
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
let diff = calculate(10, 2, (x, y) => {
  return x - y;
});
console.log(diff); // 8
\`\`\`

---

## 9. Xulosa

1. Callback — boshqa funksiyaga argument sifatida uzatiladigan va ichkarida chaqiriladigan funksiyadir.
2. Callback uzatilganda qavslarsiz (\`nomi\`), chaqirilganda esa qavslar bilan (\`nomi()\`) yoziladi.
3. Callback kodni takrorlamasdan, moslashuvchan va qayta ishlatiluvchan qilish imkonini beradi.

Keyingi darsda: Ichki funksiya tashqi o'zgaruvchilarni eslab qolishi — Closure (yopilish) mavzusi bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "runTwice callback funksiyasi",
      instruction: "`runTwice(action)` nomli funksiya yozing: u berilgan `action` callback funksiyasini 2 marta ketma-ket chaqirsin (`action(); action();`). Konsolga `\"Salom\"` chiqaruvchi `sayHi` funksiyasini yozib, uni `runTwice(sayHi)` orqali ishga tushiring.",
      startingCode: "// runTwice va sayHi funksiyalarini yozing\n",
      hint: "function runTwice(action) {\n  action();\n  action();\n}\nfunction sayHi() {\n  console.log(\"Salom\");\n}\nrunTwice(sayHi);",
      test: "if (!code.includes('runTwice')) return 'runTwice funksiyasi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nlet salomCount = out.filter(m => m.includes('Salom')).length;\nif (salomCount >= 2) return null;\nreturn 'Konsolga 2 marta \"Salom\" chiqmadi';"
    },
    {
      id: 2,
      title: "calculate va add callback",
      instruction: "`calculate(a, b, operation)` funksiyasini yozing (`return operation(a, b);`). Ikkita sonni qo'shuvchi `add(x, y)` funksiyasini yozing (`return x + y;`). `calculate(4, 6, add)` orqali hisoblab, natijani konsolga chiqaring.",
      startingCode: "// calculate va add funksiyalarini yozing\n",
      hint: "function calculate(a, b, operation) {\n  return operation(a, b);\n}\nfunction add(x, y) {\n  return x + y;\n}\nconsole.log(calculate(4, 6, add));",
      test: "if (!code.includes('calculate')) return 'calculate funksiyasi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('10'))) return null;\nreturn 'Konsolga 10 chiqmadi';"
    },
    {
      id: 3,
      title: "Arrow funksiyani callback sifatida berish",
      instruction: "`calculate(a, b, operation)` funksiyasidan foydalanib, unga uchinchi argument sifatida ayirmani hisoblovchi arrow funksiya bering: `calculate(10, 2, (x, y) => { return x - y; })`. Natijani konsolga chiqaring.",
      startingCode: "function calculate(a, b, operation) {\n  return operation(a, b);\n}\n\n// calculate ga arrow funksiya berib natijani konsolga chiqaring\n",
      hint: "console.log(calculate(10, 2, (x, y) => { return x - y; }));",
      test: "if (!code.includes('=>')) return 'Arrow funksiya ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('8'))) return null;\nreturn 'Konsolga 8 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Callback funksiya nima?",
      options: [
        "Boshqa bir funksiyaga argument sifatida uzatiladigan funksiya",
        "Faqat xato berganda ishlaydigan funksiya",
        "O'zini o'zi qayta chaqiradigan sikl",
        "Faqat bitta son qaytaradigan funksiya"
      ],
      correctAnswer: 0,
      explanation: "Boshqa bir funksiyaga argument (qiymat) sifatida berilgan va o'sha funksiya ichida chaqiriladigan funksiya callback deyiladi."
    },
    {
      id: 2,
      question: "Callback funksiya boshqa funksiyaga argument qilib berilayotganda qanday yoziladi?",
      options: [
        "Qavslarsiz, faqat funksiya nomi: doWork(myCallback)",
        "Qavslar bilan: doWork(myCallback())",
        "Qo'shtirnoq ichida: doWork(\"myCallback\")",
        "Kvadrat qavsda: doWork([myCallback])"
      ],
      correctAnswer: 0,
      explanation: "Funksiyaning o'zini uzatish uchun uni qavslarsiz yozish kerak. Agar qavs () qo'yilsa, u darhol bajarilib ketadi."
    },
    {
      id: 3,
      question: "Quyidagi kodda qanday xatolik yuz beradi?\nfunction test(fn) { fn(); }\ntest(123);",
      options: [
        "TypeError: fn is not a function",
        "ReferenceError",
        "SyntaxError",
        "Hech qanday xato bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "123 bu son, funksiya emas. Sonni esa qavslar bilan chaqirib bo'lmaydi, shuning uchun TypeError yuz beradi."
    }
  ]
};
