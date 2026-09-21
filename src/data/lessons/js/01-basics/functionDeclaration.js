export const functionDeclaration = {
  id: "functionDeclaration",
  title: "Funksiyani E'lon Qilish va Chaqirish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, uyingizdagi elektr choynak yoki blender: uning maxsus "Qaynatish" yoki "Aralashtirish" degan tugmasi bor. Muhandislar bu qurilmani bir marta yasab qo'ygan, siz esa xohlagan paytingizda tugmasini bosib, uni qayta-qayta ishga tushirasiz. Tugmani bosmaguningizcha u o'z-o'zidan ishlamaydi.
Dasturlashda ham xuddi shunday: ma'lum bir vazifani bajaradigan kodni oldindan tayyorlab qo'yib, kerak bo'lganda tugmasini bosib (chaqirib) ishlatamiz.

**Funksiya (function)** — ma'lum bir vazifani bajaruvchi, nomi orqali istalgan paytda qayta-qayta chaqirib ishlatish mumkin bo'lgan kod blokidir.

*Yangi terminlar:*
- **E'lon qilish (declare/define)** — funksiyaga nom berib, u qanday vazifani bajarishini yozib qo'yish (retsept yozish).
- **Chaqirish (call/invoke)** — funksiyani nomidan aytib, uning ichidagi kodni ishga tushirish (retsept bo'yicha taom tayyorlash).

---

## 2. Nega kerak?

Agar dasturimizda bir xil xabarlar yoki buyruqlar kodning 5 ta har xil joyida kerak bo'lsa, o'sha kodni har safar qaytadan nusxalab yozishga (copy-paste) to'g'ri kelardi:

\`\`\`javascript
console.log("Xush kelibsiz!");
console.log("Tizimga muvaffaqiyatli kirdingiz.");
\`\`\`

Agar bu matnni o'zgartirish kerak bo'lsa, kodning hamma joyidan bittalab tuzatib chiqishga to'g'ri kelardi.

Funksiya orqali bu kodni bir joyda saqlaymiz va kerakli paytda atigi bitta qator orqali — uning nomini yozib chaqiramiz. Kod qisqaradi va uni boshqarish juda osonlashadi.

---

## 3. Birinchi misol

Bu kod konsolga salom xabarini chiqaruvchi funksiya yaratadi va uni chaqirib ishga tushiradi.

\`\`\`javascript
function sayHello() { // funksiyani e'lon qilish
  console.log("Salom, dunyo!"); // funksiya bajaradigan vazifa
}

sayHello(); // funksiyani chaqirish (ishga tushirish)
\`\`\`

\`\`\`text
// Natija:
Salom, dunyo!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function sayHello() {\` —
  - \`function\` — yangi funksiya e'lon qilinayotganini bildiruvchi kalit so'z.
  - \`sayHello\` — funksiyaning nomi (o'zgaruvchilar kabi har doim kichik harf bilan boshlanadi).
  - \`()\` — qavslar (funksiya e'lonida qavslar bo'lishi shart).
  - \`{\` — funksiya tanasining (body) ochilishi.
- \`console.log("Salom, dunyo!");\` — funksiya bajarishi kerak bo'lgan kod. Bu kod funksiya chaqirilgandagina ishlaydi.
- \`}\` — funksiya tanasining yopilishi.
- \`sayHello();\` — funksiyani chaqirish. Funksiya nomidan keyin \`()\` qo'yish "shu funksiyadagi kodni hozir ishga tushir!" degan buyruqdir.

---

## 5. Qadamma-qadam (trace)

Bajarilish tartibini qadamma-qadam kuzatamiz:

| Qadam | Kod qatori | Nima sodir bo'ladi? | Konsol |
|---|---|---|---|
| 1 | \`function sayHello() { ... }\` | Funksiya xotirada saqlandi, lekin hali ishga tushmadi | (bo'sh) |
| 2 | \`sayHello();\` | Funksiya chaqirildi, boshqaruv funksiya ichiga o'tdi | (bo'sh) |
| 3 | \`console.log("Salom, dunyo!");\` | Funksiya tanasidagi buyruq bajarildi | "Salom, dunyo!" |
| 4 | \`}\` | Funksiya yakunlandi, boshqaruv yana tashqariga qaytdi | "Salom, dunyo!" |

*Muhim qoida:* Funksiya faqat e'lon qilingani bilan o'z-o'zidan ishlamaydi! Uni albatta qavslar bilan chaqirish (\`nomi()\`) shart.

---

## 6. Yana bitta misol

1-misoldan farqi: bir marta yaratilgan funksiyani bir necha marta qayta-qayta chaqiramiz.

\`\`\`javascript
function ringBell() { // qo'ng'iroq chalish funksiyasi
  console.log("Jiring!"); // ovoz chiqarish
}

ringBell(); // 1-marta chaqirish
ringBell(); // 2-marta chaqirish
\`\`\`

\`\`\`text
// Natija:
Jiring!
Jiring!
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Chaqirishda qavslarni () unutib qoldirish

\`\`\`javascript
function sayHello() {
  console.log("Salom!");
}
sayHello; // XATO: qavslar qo'yilmadi!
\`\`\`

**Nima bo'ladi:** Konsolga hech narsa chiqmaydi va funksiya ishlamaydi. Chunki qavssiz yozilgan \`sayHello\` funksiyaning o'zini bildiradi xolos. Uni ishga tushirish uchun esa har doim qavslar kerak: \`sayHello()\`.
**To'g'ri varianti:** Har doim chaqirishda qavslarni qo'ying: \`sayHello();\`.

### 2-xato: E'lon qilinmagan nomni chaqirish

\`\`\`javascript
showInfo(); // XATO: bunday nomli funksiya yaratilmagan!
\`\`\`

**Nima bo'ladi:** \`ReferenceError: showInfo is not defined\` xatosi yuzaga keladi.
**To'g'ri varianti:** Funksiyani chaqirishdan oldin uning to'g'ri e'lon qilinganiga va nomida imlo xatosi yo'qligiga ishonch hosil qiling.

### 3-xato: Funksiya nomini noto'g'ri belgilash
Funksiya nomida raqam bilan boshlash (masalan, \`function 1test() {}\`) yoki kalit so'zlarni ishlatish (masalan, \`function let() {}\`) taqiqlanadi va \`SyntaxError\` beradi.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`showSuccess\` nomli funksiya e'lon qiling. U konsolga \`"Amal bajarildi!"\` deb chiqarsin. So'ngra ushbu funksiyani chaqiring.

### 2-mashq (o'rtacha)
\`sayHi\` nomli funksiya yarating, u konsolga \`"Salom!"\` deb chiqarsin. Keyin ushbu funksiyani 2 marta ketma-ket chaqiring.

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nimalar chiqadi?
\`\`\`javascript
function printMessage() {
  console.log("Xabar 1");
}
console.log("Boshlanish");
printMessage();
console.log("Tugash");
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function showSuccess() {
  console.log("Amal bajarildi!");
}
showSuccess();
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function sayHi() {
  console.log("Salom!");
}
sayHi();
sayHi();
\`\`\`

**3-mashq javobi:**
Konsolga ketma-ket:
\`\`\`text
Boshlanish
Xabar 1
Tugash
\`\`\`
chiqadi (chunki dastur yuqoridan pastga o'qiladi, \`printMessage()\` chaqirilganda esa funksiya ichidagi kod bajariladi).

---

## 9. Xulosa

1. Funksiya — \`function nomi() { ... }\` ko'rinishida e'lon qilinadi va ma'lum bir vazifani bajaruvchi kodni saqlaydi.
2. Funksiyani ishga tushirish uchun nomidan keyin albatta qavslar qo'yib chaqiriladi: \`nomi()\`.
3. Bitta e'lon qilingan funksiyani dastur davomida istalgancha marta chaqirish mumkin.

Keyingi darsda: Funksiyaga tashqaridan ma'lumot uzatish uchun Parametr va Argumentlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "showSuccess funksiyasini e'lon qilish va chaqirish",
      instruction: "\`showSuccess\` nomli parametrsiz funksiya e'lon qiling. U konsolga \`\"Amal bajarildi!\"\` deb chiqarsin. So'ngra funksiyani chaqiring.",
      startingCode: "// showSuccess funksiyasini e'lon qiling va chaqiring\n",
      hint: "function showSuccess() {\n  console.log(\"Amal bajarildi!\");\n}\nshowSuccess();",
      test: "if (!code.includes('function')) return 'function kalit so\\'zi ishlatilmadi';\nif (!code.includes('showSuccess')) return 'showSuccess funksiya nomi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Amal bajarildi!'))) return null;\nreturn 'Konsolga \"Amal bajarildi!\" xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Funksiyani 2 marta chaqirish",
      instruction: "\`sayHi\` nomli funksiya yarating, u \`\"Salom!\"\` deb chiqarsin. Keyin ushbu funksiyani 2 marta chaqiring.",
      startingCode: "// sayHi funksiyasini yarating va 2 marta chaqiring\n",
      hint: "function sayHi() {\n  console.log(\"Salom!\");\n}\nsayHi();\nsayHi();",
      test: "if (!code.includes('function')) return 'function ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length >= 2 && out.every(m => m.includes('Salom!'))) return null;\nreturn 'Funksiya 2 marta chaqirilmadi yoki xabar to\\'g\\'ri chiqmadi';"
    },
    {
      id: 3,
      title: "Chaqirishdagi xatoni tuzatish",
      instruction: "Quyidagi kodda funksiya chaqirilgan, lekin qavslar unutilgan. Funksiyani to'g'ri chaqiring (\`playGame()\`).",
      startingCode: "function playGame() {\n  console.log(\"O'yin boshlandi\");\n}\n// Funksiyani chaqiring:\nplayGame;\n",
      hint: "playGame();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"O'yin boshlandi\"))) return null;\nreturn 'Funksiya chaqirilmadi, qavslarni unutmang: playGame();';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Funksiyani ishga tushirish (chaqirish) qanday amalga oshiriladi?",
      options: [
        "Funksiya nomidan keyin qavslar qo'yib: nomi()",
        "Faqat nomini yozib: nomi",
        "function nomi deb yozib",
        "let nomi deb yozib"
      ],
      correctAnswer: 0,
      explanation: "Funksiyani chaqirish va uning ichidagi kodni bajarish uchun nomidan keyin albatta qavslar qo'yiladi: nomi()."
    },
    {
      id: 2,
      question: "Agar funksiya faqat e'lon qilinsa, lekin biror marta ham chaqirilmasa nima bo'ladi?",
      options: [
        "Uning ichidagi kod biror marta ham ishlamaydi",
        "Xato beradi",
        "Avtomatik 1 marta ishlaydi",
        "Cheksiz ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Funksiya faqat e'lon qilinganda xotirada saqlanadi, chaqirilmaguncha uning ichidagi kodlar ishlamaydi."
    },
    {
      id: 3,
      question: "E'lon qilinmagan (mavjud bo'lmagan) funksiyani chaqirishga urinish qanday xatolik beradi?",
      options: [
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "Xato bermaydi"
      ],
      correctAnswer: 0,
      explanation: "Mavjud bo'lmagan nomga murojaat qilganda JavaScript ReferenceError (havola xatosi) beradi."
    }
  ]
};
