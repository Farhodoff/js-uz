export const returnLesson = {
  id: "returnLesson",
  title: "return (Qiymat Qaytarish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz do'konga ukangizni non olib kelishga yubordingiz. Siz unga pul berasiz (argument). U do'konga borib nonni sotib oladi va uni **sizga qaytarib olib keladi** (return). Agar u nonni o'zi yeb qo'ysa yoki do'konda tashlab kelsa, siz nonga ega bo'lolmaysiz!
Shu paytgacha yozgan funksiyalarimiz faqat o'z ichida \`console.log\` qilib natijani ekranda ko'rsatardi xolos (xuddi nonni sizga ko'rsatib, lekin qo'lingizga bermagandek).
\`return\` esa natijani funksiya chaqirilgan joyga **qaytarib beradi**, toki biz uni o'zgaruvchida saqlab, boshqa hisob-kitoblarda ishlata olaylik!

\`return\` (qaytarish) — funksiya bajargan amal natijasini tashqariga qaytaruvchi va funksiya ishini shu zahoti yakunlovchi operatoridir.

*Yangi termin:* **Qaytariladigan qiymat (return value)** — funksiya bajarilib bo'lgach, uni chaqirgan kodga uzatiladigan yakuniy natija.

---

## 2. Nega kerak?

Agar funksiya ichida faqat \`console.log\` yozsak, natija faqat ekranda ko'rinadi xolos. Uni yangi o'zgaruvchiga yuklab yoki boshqa amallarda (masalan, yana qo'shish yoki solishtirishda) ishlatib bo'lmaydi:

\`\`\`javascript
function add(a, b) {
  console.log(a + b);
}
let result = add(2, 3); // ekranga 5 chiqadi, lekin...
console.log(result); // undefined! Chunki add hech narsa qaytarmadi
\`\`\`

\`return\` orqali natijani tashqariga chiqaramiz va uni xohlagan o'zgaruvchiga saqlab olib, keyinchalik dasturning boshqa qismlarida erkin ishlatamiz:

\`\`\`javascript
function add(a, b) {
  return a + b;
}
let result = add(2, 3); // result endi 5 ga teng!
console.log(result); // 5
\`\`\`

---

## 3. Birinchi misol

Bu kod ikkita sonning yig'indisini hisoblab, natijani \`return\` orqali qaytaradi.

\`\`\`javascript
function add(a, b) { // a va b parametrlar
  return a + b; // yig'indini tashqariga qaytarish
}

let sum = add(3, 4); // qaytgan 7 qiymati sum o'zgaruvchisiga saqlanadi
console.log(sum); // natijani ekranga chiqarish
\`\`\`

\`\`\`text
// Natija:
7
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function add(a, b) {\` — \`add\` nomli ikkita parametrli funksiya e'lon qilindi.
- \`return a + b;\` — \`return\` kalit so'zi. U \`a + b\` (3 + 4 = 7) hisobini chiqaradi va bu \`7\` qiymatini funksiyadan tashqariga uzatadi. Shu bilan birga, funksiya ishi darhol yakunlanadi.
- \`}\` — funksiya tanasining yopilishi.
- \`let sum = add(3, 4);\` — \`add(3, 4)\` chaqiriladi. U \`7\` qiymatini qaytargani uchun, bu qator go'yo \`let sum = 7;\` kabi ishlaydi va \`sum\` ga \`7\` qiymati yuklanadi.
- \`console.log(sum);\` — saqlab olingan natija konsolga chiqadi.

---

## 5. Qadamma-qadam (trace)

Bajarilish tartibini jadvalda kuzatamiz:

| Qadam | Kod qatori | Bajarilish jarayoni | sum qiymati |
|---|---|---|---|
| 1 | \`add(3, 4)\` chaqirildi | \`a = 3, b = 4\` berildi | hali mavjud emas |
| 2 | \`return a + b;\` | \`3 + 4 = 7\` hisoblandi va 7 tashqariga qaytarildi | hali mavjud emas |
| 3 | \`let sum = 7;\` | Qaytgan 7 qiymati \`sum\` o'zgaruvchisiga saqlandi | 7 |
| 4 | \`console.log(sum);\` | Konsolga 7 soni chiqarildi | 7 |

### console.log va return farqi:
- \`console.log\` — natijani faqat ekranda **ko'rsatadi** (inson ko'rishi uchun).
- \`return\` — natijani kodning o'ziga **beradi** (dastur o'zgaruvchida saqlab ishlatishi uchun).

---

## 6. Yana bitta misol

1-misoldan farqi: qaytgan qiymatni boshqa arifmetik ifodaning ichida to'g'ridan-to'g'ri ishlatamiz.

\`\`\`javascript
function square(num) { // sonning kvadratini hisoblash
  return num * num; // natijani qaytarish
}

let total = square(5) + 10; // square(5) o'rniga 25 qaytadi: 25 + 10 = 35
console.log(total);
\`\`\`

\`\`\`text
// Natija:
35
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: return dan keyin kod yozish (unreachable code)

\`\`\`javascript
function add(a, b) {
  return a + b;
  console.log("Hisoblandi!"); // XATO: bu qator hech qachon ishlamaydi!
}
\`\`\`

**Nima bo'ladi:** \`return\` bajarilishi bilan funksiya darhol to'xtaydi va undan chiqib ketiladi. \`return\` dan keyingi qatorlarga navbat hech qachon yetib bormaydi.
**To'g'ri varianti:** Agar xabar chiqarish kerak bo'lsa, uni \`return\` dan oldingi qatorlarga yozing.

### 2-xato: return o'rniga faqat console.log yozib qo'yish

\`\`\`javascript
function multiply(a, b) {
  console.log(a * b); // XATO: return yozilmagan!
}
let result = multiply(3, 3);
console.log(result); // undefined!
\`\`\`

**Nima bo'ladi:** Funksiya ekranga 9 chiqaradi, lekin \`result\` o'zgaruvchisiga hech narsa qaytmaydi (\`undefined\` bo'lib qoladi). Agar funksiyada \`return\` bo'lmasa, u har doim \`undefined\` qaytaradi.
**To'g'ri varianti:** Natijani o'zgaruvchiga qaytarish uchun \`return a * b;\` deb yozish shart.

### 3-xato: return so'zidan keyin qiymatni yangi qatorga tushirib yuborish

\`\`\`javascript
function getNumber() {
  return
  10; // XATO: return dan keyin yangi qatorda yozilgan
}
\`\`\`

**Nima bo'ladi:** JavaScript \`return\` so'zidan keyin avtomatik nuqta-vergul qo'yadi (\`return;\`) va \`undefined\` qaytaradi.
**To'g'ri varianti:** Qaytariladigan ifodani har doim \`return\` bilan bir xil qatorda boshlang: \`return 10;\`.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`double(n)\` funksiyasini yozing. U berilgan sonni 2 ga ko'paytirib qaytarsin (\`return\`). Funksiyani \`6\` soni bilan chaqirib, natijani \`res\` o'zgaruvchisiga saqlang va konsolga chiqaring.

### 2-mashq (o'rtacha)
\`getFullGreeting(name)\` funksiyasi berilgan ismga qarab \`"Salom, " + name\` matnini qaytarsin. Natijani \`message\` o'zgaruvchisiga saqlang va ekranga chiqaring.

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nima chiqadi?
\`\`\`javascript
function test() {
  return 5;
  return 10;
}
console.log(test());
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function double(n) {
  return n * 2;
}
let res = double(6);
console.log(res); // 12
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function getFullGreeting(name) {
  return "Salom, " + name;
}
let message = getFullGreeting("Zuhra");
console.log(message); // Salom, Zuhra
\`\`\`

**3-mashq javobi:**
Konsolga \`5\` chiqadi. Chunki birinchi \`return 5;\` ishlashi bilan funksiya darhol to'xtaydi, ikkinchi \`return 10;\` ga navbat yetib bormaydi.

---

## 9. Xulosa

1. \`return\` operatori funksiya bajargan hisob-kitob natijasini chaqirilgan joyga qaytaradi.
2. \`return\` bajarilishi bilan funksiya ishi darhol tugaydi, uning pastidagi kodlar ishlamaydi.
3. Agar funksiyada \`return\` yozilmasa, u avtomatik ravishda \`undefined\` qaytaradi.

Keyingi darsda: Funksiyalarni yanada qisqa va zamonaviy yozish usuli — Arrow Funksiyalar (\`() => {}\`) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "double funksiyasidan return qaytarish",
      instruction: "\`double(n)\` funksiyasini yozing. U berilgan sonni 2 ga ko'paytirib qaytarsin (\`return n * 2;\`). Funksiyani \`6\` bilan chaqirib, natijani \`res\` o'zgaruvchisiga saqlang va konsolga chiqaring.",
      startingCode: "// double funksiyasini yozing\n",
      hint: "function double(n) {\n  return n * 2;\n}\nlet res = double(6);\nconsole.log(res);",
      test: "if (!code.includes('return')) return 'return ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('12'))) return null;\nreturn 'Konsolga 12 chiqmadi';"
    },
    {
      id: 2,
      title: "Matn qaytaruvchi funksiya",
      instruction: "\`getFullGreeting(name)\` funksiyasini yozing, u \`\"Salom, \" + name\` matnini qaytarsin. Natijani \`message\` o'zgaruvchisiga saqlab, konsolga chiqaring (\`getFullGreeting(\"Zuhra\")\`).",
      startingCode: "// getFullGreeting funksiyasini yozing\n",
      hint: "function getFullGreeting(name) {\n  return \"Salom, \" + name;\n}\nlet message = getFullGreeting(\"Zuhra\");\nconsole.log(message);",
      test: "if (!code.includes('return')) return 'return ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom, Zuhra'))) return null;\nreturn 'Konsolga \"Salom, Zuhra\" chiqmadi';"
    },
    {
      id: 3,
      title: "console.log o'rniga return ishlatish",
      instruction: "Quyidagi \`multiply\` funksiyasida \`console.log\` o'rniga \`return\` ishlating, toki \`result\` o'zgaruvchisiga \`9\` soni qaytib, konsolga chiqsin.",
      startingCode: "function multiply(a, b) {\n  console.log(a * b); // buni return ga almashtiring\n}\nlet result = multiply(3, 3);\nconsole.log(result);\n",
      hint: "function multiply(a, b) {\n  return a * b;\n}",
      test: "if (!code.includes('return')) return 'return ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('9')) && !out.some(m => m.includes('undefined'))) return null;\nreturn 'Funksiya natijani to\\'g\\'ri qaytarmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "return operatorining asosiy vazifasi nima?",
      options: [
        "Funksiya hisoblagan natijani tashqariga qaytaradi va funksiya ishini darhol yakunlaydi",
        "Natijani faqat ekranga chiqaradi",
        "Funksiyani qayta boshidan ishga tushiradi",
        "O'zgaruvchi yaratadi"
      ],
      correctAnswer: 0,
      explanation: "return qiymatni chaqiruvchi kodga qaytaradi va funksiya bajarilishini o'sha zahoti to'xtatadi."
    },
    {
      id: 2,
      question: "Agar funksiya tanasida return yozilmagan bo'lsa, u chaqirilganda qanday qiymat qaytaradi?",
      options: [
        "undefined",
        "0",
        "null",
        "false"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da return buyrug'i bo'lmagan har qanday funksiya avtomatik ravishda undefined qiymatini qaytaradi."
    },
    {
      id: 3,
      question: "Quyidagi kod konsolga nima chiqaradi?\nfunction getNumber() {\n  return 10;\n  return 20;\n}\nconsole.log(getNumber());",
      options: [
        "10",
        "20",
        "30",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "Birinchi return 10; ishlashi bilan funksiya darhol to'xtaydi, shuning uchun 10 chiqadi; ikkinchi return ga navbat kelmaydi."
    }
  ]
};
