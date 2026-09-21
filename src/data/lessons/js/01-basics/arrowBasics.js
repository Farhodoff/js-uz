export const arrowBasics = {
  id: "arrowBasics",
  title: "Arrow Funksiya: () => {}",
  language: "javascript",
  theory: `## 1. Bu nima?

Xabarlashuvda biz ko'pincha uzun so'zlar o'rniga qisqartma yoki ko'rsatkich belgilaridan foydalanamiz: masalan, yo'nalishni uzun matn bilan tushuntirish o'rniga shunchaki o'q / ko'rsatkich belgisi (\`=>\`) qo'yamiz.
Arrow funksiya ham xuddi shunday: an'anaviy \`function\` so'zi o'rniga zamonaviy \`=>\` (o'q) belgisidan foydalanib yoziladigan ixcham funksiyadir.

**Arrow funksiya (arrow function / o'qsimon funksiya)** — JavaScript da \`function\` kalit so'zi o'rniga \`=>\` belgisi yordamida yoziladigan zamonaviy va ixcham funksiya sintaksisidir.

*Yangi terminlar:*
- **Arrow funksiya (arrow function)** — \`() => {}\` ko'rinishida yoziladigan funksiya shakli.
- **O'q belgisi (\`=>\`)** — tenglik va kattalik belgilaridan (\`=\` va \`>\`) tashkil topgan maxsus ko'rsatkich belgisi ("fat arrow").

---

## 2. Nega kerak?

An'anaviy usulda har safar \`function\` degan uzun so'zni yozish talab qilinardi:

\`\`\`javascript
function multiply(a, b) {
  return a * b;
}
\`\`\`

Dasturimizda o'nlab funksiyalar kerak bo'lganda, \`function\` so'zini qayta-qayta yozish kodni cho'zib yuboradi.

Arrow funksiya orqali kod ancha ixcham, zamonaviy va o'qish uchun toza ko'rinishga keladi:

\`\`\`javascript
const multiply = (a, b) => {
  return a * b;
};
\`\`\`

---

## 3. Birinchi misol

Bu kod ikkita sonni ko'paytiruvchi arrow funksiyani yaratadi va uni chaqiradi.

\`\`\`javascript
const multiply = (a, b) => { // arrow funksiyani e'lon qilish
  return a * b; // natijani qaytarish
};

let result = multiply(3, 4); // chaqirish
console.log(result); // natijani chiqarish
\`\`\`

\`\`\`text
// Natija:
12
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const multiply =\` — funksiya \`multiply\` nomli o'zgarmas o'zgaruvchiga yuklanadi (funksiya tasodifan boshqa qiymatga o'zgarib ketmasligi uchun har doim \`const\` ishlatiladi).
- \`(a, b)\` — funksiya qabul qiladigan parametrlar (xuddi oddiy funksiyadagi kabi qavs ichida yoziladi).
- \`=>\` — o'q (arrow) belgisi. U parametrlarni funksiya tanasiga bog'lab beradi.
- \`{ return a * b; };\` — jingalak qavs ichida funksiya tanasi yoziladi.
- \`let result = multiply(3, 4);\` — arrow funksiyani chaqirish usuli oddiy funksiya bilan mutlaqo bir xil: \`nomi(argumentlar)\`.

---

## 5. Qadamma-qadam (trace)

Oddiy funksiya va Arrow funksiyaning yonma-yon tuzilishi:

\`\`\`javascript
// 1. An'anaviy funksiya:
function add(a, b) {
  return a + b;
}

// 2. Zamonaviy arrow funksiya:
const add = (a, b) => {
  return a + b;
};
\`\`\`

Bajarilish jarayoni jadvali:

| Qadam | Kod | Nima sodir bo'ladi? | result |
|---|---|---|---|
| 1 | \`const multiply = (a, b) => { ... };\` | Arrow funksiya yaratildi va \`multiply\` o'zgaruvchisiga saqlandi | hali mavjud emas |
| 2 | \`multiply(3, 4)\` chaqirildi | \`a = 3, b = 4\` parametrlariga uzatildi | hali mavjud emas |
| 3 | \`return a * b;\` | 3 * 4 = 12 hisoblandi va tashqariga qaytarildi | 12 |
| 4 | \`console.log(result);\` | Konsolga 12 chiqarildi | 12 |

---

## 6. Yana bitta misol

1-misoldan farqi: parametrsiz arrow funksiya (qavslar bo'sh \`()\` qoladi).

\`\`\`javascript
const sayHello = () => { // parametrsiz arrow funksiya
  return "Salom, dunyo!";
};

console.log(sayHello());
\`\`\`

\`\`\`text
// Natija:
Salom, dunyo!
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: O'q belgisida oraliq probel qo'yish yoki noto'g'ri belgi yozish

\`\`\`javascript
const add = (a, b) = > { // XATO: = va > orasida probel bor
  return a + b;
};
\`\`\`

**Nima bo'ladi:** \`SyntaxError\` xatosi yuz beradi. \`=>\` belgisi bir butun bo'lib, orasida probel bo'lmasligi kerak hamda \`->\` kabi boshqa belgilar bilan almashtirib bo'lmaydi.
**To'g'ri varianti:** Har doim \`=>\` deb yozing: \`const add = (a, b) => { ... };\`.

### 2-xato: Arrow funksiyani e'lon qilinishidan oldin chaqirish

\`\`\`javascript
greet(); // XATO: ReferenceError: Cannot access 'greet' before initialization
const greet = () => {
  console.log("Salom");
};
\`\`\`

**Nima bo'ladi:** Oddiy \`function\` dan farqli o'laroq, arrow funksiya \`const\` o'zgaruvchisiga yuklangani sababli uni e'londan oldin chaqirib bo'lmaydi.
**To'g'ri varianti:** Arrow funksiyani avval e'lon qilib, keyin pastroqda chaqirish kerak.

### 3-xato: Parametrsiz holatda qavslarni () tashlab ketish

\`\`\`javascript
const sayHi = => { // XATO: qavslar unutilgan!
  console.log("Salom");
};
\`\`\`

**Nima bo'ladi:** \`SyntaxError\` xatosi chiqadi. Parametr bo'lmaganda ham har doim bo'sh qavslar \`()\` qo'yilishi shart.
**To'g'ri varianti:** \`const sayHi = () => { ... };\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`double\` nomli arrow funksiya yozing. U bitta \`n\` parametrini qabul qilib, \`n * 2\` qiymatini qaytarsin (\`return n * 2;\`). Funksiyani \`7\` bilan chaqirib, natijani konsolga chiqaring.

### 2-mashq (o'rtacha)
\`getFullName\` nomli arrow funksiya yarating, u \`firstName\` va \`lastName\` parametrlarini qabul qilib, ularni probel bilan birlashtirib qaytarsin (\`return firstName + " " + lastName;\`). Funksiyani \`"Ali"\` va \`"Valiyev"\` bilan chaqirib, natijani ekranga chiqaring.

### 3-mashq (chegara holat)
Quyidagi an'anaviy funksiyani aynan shunday ishlaydigan arrow funksiyaga aylantiring:
\`\`\`javascript
function getStatus() {
  return "Faol";
}
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
const double = (n) => {
  return n * 2;
};
console.log(double(7)); // 14
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const getFullName = (firstName, lastName) => {
  return firstName + " " + lastName;
};
console.log(getFullName("Ali", "Valiyev")); // Ali Valiyev
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const getStatus = () => {
  return "Faol";
};
\`\`\`

---

## 9. Xulosa

1. Arrow funksiya — \`const nomi = (parametrlar) => { ... };\` ko'rinishida yoziladigan zamonaviy funksiyadir.
2. Arrow funksiyada \`function\` so'zi o'rniga \`=>\` (o'q) belgisi ishlatiladi.
3. Arrow funksiya \`const\` o'zgaruvchisiga saqlangani sababli, uni e'lon qilishdan oldin chaqirib bo'lmaydi.

Keyingi darsda: O'zgaruvchilar qayerda ko'rinishi va ishlashini belgilovchi Scope (ko'lam) qoidalari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "double arrow funksiyasi",
      instruction: "\`double\` nomli arrow funksiya yozing. U \`n\` parametrini qabul qilib, \`n * 2\` ni qaytarsin (\`return n * 2;\`). Funksiyani \`7\` bilan chaqirib, konsolga chiqaring.",
      startingCode: "// double arrow funksiyasini yozing\n",
      hint: "const double = (n) => {\n  return n * 2;\n};\nconsole.log(double(7));",
      test: "if (!code.includes('=>')) return '=> (arrow) belgisi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('14'))) return null;\nreturn 'Konsolga 14 chiqmadi';"
    },
    {
      id: 2,
      title: "Matnlarni birlashtiruvchi arrow funksiya",
      instruction: "\`getFullName\` nomli arrow funksiya yozing: \`firstName\` va \`lastName\` qabul qilib, ularni probel bilan birlashtirib qaytarsin (\`return firstName + \" \" + lastName;\`). Uni \`\"Ali\"\` va \`\"Valiyev\"\` bilan chaqirib, konsolga chiqaring.",
      startingCode: "// getFullName arrow funksiyasini yozing\n",
      hint: "const getFullName = (firstName, lastName) => {\n  return firstName + \" \" + lastName;\n};\nconsole.log(getFullName(\"Ali\", \"Valiyev\"));",
      test: "if (!code.includes('=>')) return '=> (arrow) belgisi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali Valiyev'))) return null;\nreturn 'Konsolga \"Ali Valiyev\" chiqmadi';"
    },
    {
      id: 3,
      title: "Oddiy funksiyani arrow funksiyaga aylantirish",
      instruction: "Quyidagi an'anaviy funksiyani arrow funksiyaga aylantiring (\`const getStatus = () => { return \"Faol\"; };\`).",
      startingCode: "function getStatus() {\n  return \"Faol\";\n}\nconsole.log(getStatus());\n",
      hint: "const getStatus = () => {\n  return \"Faol\";\n};",
      test: "if (!code.includes('=>')) return '=> belgisi ishlatilmadi';\nif (code.includes('function getStatus')) return 'function o\\'rniga arrow sintaksis ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Faol'))) return null;\nreturn 'Konsolga \"Faol\" chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Arrow funksiyaning asosiy belgisi nima?",
      options: [
        "=> (tenglik va kattalik belgisi)",
        "-> (chiziqcha va kattalik belgisi)",
        "== (tenglik)",
        "function (kalit so'zi)"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da arrow funksiya har doim => belgisi orqali yoziladi."
    },
    {
      id: 2,
      question: "Nima uchun arrow funksiyani e'lon qilinishidan oldin chaqirib bo'lmaydi?",
      options: [
        "U const yoki let o'zgaruvchisiga yuklanganligi sababli, e'londan oldin mavjud bo'lmaydi",
        "Arrow funksiyani umuman chaqirib bo'lmaydi",
        "Faqat bir marta chaqirish mumkin bo'lgani uchun",
        "Parametrlari bo'lmagani uchun"
      ],
      correctAnswer: 0,
      explanation: "const yoki let bilan yaratilgan o'zgaruvchilarga e'lon qilinishidan oldin murojaat qilib bo'lmaydi (temporal dead zone)."
    },
    {
      id: 3,
      question: "Arrow funksiya parametrsiz bo'lsa, qavslar qanday yoziladi?",
      options: [
        "Bo'sh qavslar qo'yilishi shart: () => { ... }",
        "Qavslar butunlay tashlab ketiladi: => { ... }",
        "Kvadrat qavs qo'yiladi: [] => { ... }",
        "Jingalak qavs qo'yiladi: {} => { ... }"
      ],
      correctAnswer: 0,
      explanation: "Parametr bo'lmagan holatda ham doimo bo'sh oddiy qavslar () qo'yilishi shart: () => {}."
    }
  ]
};
