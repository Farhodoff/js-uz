export const parametersLesson = {
  id: "parametersLesson",
  title: "Parametr va Argument",
  language: "javascript",
  theory: `## 1. Bu nima?

O'tgan darsda ko'rganimizdek, parametrsiz funksiya — faqat bitta belgilangan ishni qiluvchi oddiy choynak edi: har doim bir xil natija berardi.
Endi tasavvur qiling, sharbat chiqargich (sokovijimalka): uning yuqorisida meva solinadigan bo'sh teshigi bor.
- **Parametr** — sharbat chiqargichning meva solinadigan bo'sh idishi (o'rni).
- **Argument** — siz o'sha idishga tashlagan haqiqiy meva: "olma" yoki "apelsin".
Olma tashlasangiz — olma sharbati chiqadi, apelsin tashlasangiz — apelsin sharbati chiqadi!

**Parametr** — funksiya e'lon qilinayotganda tashqaridan keladigan ma'lumotni kutib olish uchun belgilangan o'zgaruvchidir.
**Argument** — funksiya chaqirilayotganda unga uzatilgan haqiqiy qiymatdir.

*Yangi terminlar:*
- **Parametr (parameter)** — funksiya e'lonidagi qavs ichiga yoziladigan qabul qiluvchi o'zgaruvchi.
- **Argument (argument)** — funksiya chaqiruvida qavs ichiga beriladigan aniq qiymat.

---

## 2. Nega kerak?

Parametrsiz funksiya har doim bir xil natija beradi (masalan, faqat \`"Salom, Ali!"\` deb chiqaradi). Agar 10 xil odamga alohida salom bermoqchi bo'lsak, 10 ta alohida funksiya yozishga to'g'ri kelardi.

Parametr yordamida bitta umumiy \`greet(name)\` funksiyasi yoziladi. Unga kimning ismini uzatsak (argument sifatida), aynan o'sha odamga mos xabar chiqaradi. Kodimiz moslashuvchan va universal bo'ladi.

---

## 3. Birinchi misol

Bu kod kiritilgan ismga qarab moslashtirilgan salom xabarini konsolga chiqaradi.

\`\`\`javascript
function greet(name) { // name — parametr (qabul qiluvchi)
  console.log("Salom, " + name + "!"); // parametr qiymatini ishlatish
}

greet("Ali"); // "Ali" — argument (haqiqiy qiymat)
\`\`\`

\`\`\`text
// Natija:
Salom, Ali!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function greet(name) {\` — \`greet\` nomli funksiya e'lon qilindi. Qavs ichidagi \`name\` — bu **parametr**. U funksiya ichida xuddi oddiy o'zgaruvchi kabi ishlaydi, lekin o'z qiymatini tashqaridan (chaqiruvdan) oladi.
- \`console.log("Salom, " + name + "!");\` — \`"Salom, "\` matni va \`name\` parametri qiymati birlashtirilib ekranga chiqariladi.
- \`}\` — funksiya tanasining yopilishi.
- \`greet("Ali");\` — funksiya chaqirildi. Qavs ichida berilgan \`"Ali"\` matni — bu **argument**. Dastur \`"Ali"\` qiymatini \`name\` parametriga joylaydi va funksiyani ishga tushiradi.

---

## 5. Qadamma-qadam (trace)

Har xil argumentlar berilganda parametrlar qanday o'zgarishini jadvalda kuzatamiz:

| Qadam | Chaqiruv | Argument (berilgan qiymat) | Parametr (\`name\`) | console.log natijasi |
|---|---|---|---|---|
| 1 | \`greet("Ali");\` | \`"Ali"\` | \`name = "Ali"\` | \`"Salom, Ali!"\` |
| 2 | \`greet("Zuhra");\` | \`"Zuhra"\` | \`name = "Zuhra"\` | \`"Salom, Zuhra!"\` |

*Eslab qolish uchun formula:*
- **Parametr** = e'londagi bo'sh o'rin (retseptdagi masalliq nomi).
- **Argument** = chaqiruvdagi aniq qiymat (qozonga solingan haqiqiy masalliq).

---

## 6. Yana bitta misol

1-misoldan farqi: funksiyaga bittadan ortiq parametr (ikkita parametr, vergul bilan ajratilgan) beramiz.

\`\`\`javascript
function printSum(a, b) { // ikkita parametr: a va b
  let total = a + b; // yig'indini hisoblash
  console.log("Yig'indi: " + total); // natijani chiqarish
}

printSum(5, 3); // ikkita argument: a = 5, b = 3
\`\`\`

\`\`\`text
// Natija:
Yig'indi: 8
\`\`\`

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Argument berishni unutib qoldirish

\`\`\`javascript
function greet(name) {
  console.log("Salom, " + name);
}
greet(); // XATO: argument berilmadi!
\`\`\`

**Nima bo'ladi:** Konsolga \`"Salom, undefined"\` deb chiqadi. Chunki parametr qiymatsiz chaqirilsa, uning qiymati avtomatik ravishda \`undefined\` bo'lib qoladi.
**To'g'ri varianti:** Chaqirishda parametrga mos argument uzatish kerak: \`greet("Ali");\`.

### 2-xato: Argumentlar tartibini adashtirish

\`\`\`javascript
function printFullName(firstName, lastName) {
  console.log(firstName + " " + lastName);
}
printFullName("Karimov", "Anvar"); // XATO: familiya va ism o'rni almashib ketdi
\`\`\`

**Nima bo'ladi:** Konsolga \`"Karimov Anvar"\` chiqadi. Chunki JavaScript argumentlarni parametrlar nomi bo'yicha emas, faqat qavs ichidagi yozilish tartibi bo'yicha parametrga yuklaydi.
**To'g'ri varianti:** Argumentlarni parametrlarning asl tartibiga mos uzating: \`printFullName("Anvar", "Karimov");\`.

### 3-xato: Parametrni funksiya ichida qayta let bilan e'lon qilish

\`\`\`javascript
function greet(name) {
  let name = "Ali"; // XATO: name allaqachon parametr sifatida mavjud!
  console.log(name);
}
\`\`\`

**Nima bo'ladi:** \`SyntaxError: Identifier 'name' has already been declared\` xatosi chiqadi.
**To'g'ri varianti:** Parametr o'zi o'zgaruvchi hisoblanadi, uni funksiya ichida qayta \`let\` bilan e'lon qilmang.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`showScore\` nomli bitta \`points\` parametrli funksiya yarating. U konsolga \`"Ball: " + points\` deb chiqarsin. Funksiyani \`100\` argumenti bilan chaqiring.

### 2-mashq (o'rtacha)
\`printMultiplication(x, y)\` nomli funksiya e'lon qiling. U \`x * y\` natijasini konsolga chiqarsin. Funksiyani \`4\` va \`5\` argumentlari bilan chaqiring.

### 3-mashq (chegara holat)
Quyidagi kod ishlaganda konsolga nima chiqadi?
\`\`\`javascript
function checkValue(x) {
  console.log(x);
}
checkValue();
\`\`\`

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function showScore(points) {
  console.log("Ball: " + points);
}
showScore(100);
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function printMultiplication(x, y) {
  console.log(x * y);
}
printMultiplication(4, 5);
\`\`\`

**3-mashq javobi:**
\`undefined\` chiqadi. Chunki chaqirishda argument berilmagan, parametr esa avtomatik \`undefined\` bo'ladi.

---

## 9. Xulosa

1. Parametr — funksiya e'lonida qavs ichida kutiladigan o'zgaruvchi, argument — chaqiruvda uzatiladigan haqiqiy qiymatdir.
2. Bir nechta parametrlar va argumentlar vergul (\`,\`) bilan ajratiladi va ketma-ketlik bo'yicha mos keladi.
3. Argument berilmagan parametr avtomatik ravishda \`undefined\` qiymatini oladi.

Keyingi darsda: Funksiya bajargan ish natijasini tashqariga qaytarish uchun \`return\` operatorini o'rganamiz.
`,
  exercises: [
    {
      id: 1,
      title: "showScore funksiyasiga parametr berish",
      instruction: "\`points\` parametrini qabul qiluvchi \`showScore\` nomli funksiya e'lon qiling. U konsolga \`\"Ball: \" + points\` deb chiqarsin. Funksiyani \`100\` argumenti bilan chaqiring.",
      startingCode: "// showScore funksiyasini yozing va chaqiring\n",
      hint: "function showScore(points) {\n  console.log(\"Ball: \" + points);\n}\nshowScore(100);",
      test: "if (!code.includes('function')) return 'function kalit so\\'zi ishlatilmadi';\nif (!code.includes('points')) return 'points parametri ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ball: 100'))) return null;\nreturn 'Konsolga \"Ball: 100\" xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkita parametrli funksiya",
      instruction: "\`printMultiplication(x, y)\` nomli funksiya yozing, u konsolga \`x * y\` natijasini chiqarsin. Funksiyani \`4\` va \`5\` argumentlari bilan chaqiring.",
      startingCode: "// printMultiplication funksiyasini yozing va chaqiring\n",
      hint: "function printMultiplication(x, y) {\n  console.log(x * y);\n}\nprintMultiplication(4, 5);",
      test: "if (!code.includes('function')) return 'function kalit so\\'zi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('20'))) return null;\nreturn 'Konsolga 20 chiqmadi';"
    },
    {
      id: 3,
      title: "Argument berishdagi xatoni to'g'rilash",
      instruction: "Quyidagi kodda \`greet\` chaqirilgan, lekin argument berilmagan. Unga \`\"Farhod\"\` argumentini uzating, toki \`\"Salom, Farhod!\"\` chiqsin.",
      startingCode: "function greet(name) {\n  console.log(\"Salom, \" + name + \"!\");\n}\n// Argument bering:\ngreet();\n",
      hint: "greet(\"Farhod\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom, Farhod!'))) return null;\nreturn 'Konsolga \"Salom, Farhod!\" chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Parametr va argument orasidagi asosiy farq nima?",
      options: [
        "Parametr — e'lon qilinadigan qabul qiluvchi o'zgaruvchi, argument — chaqiruvda beriladigan haqiqiy qiymat",
        "Parametr chaqirishda beriladi, argument e'londa yoziladi",
        "Hech qanday farqi yo'q, ikkalasi bir xil narsa",
        "Parametr faqat son bo'ladi, argument faqat matn bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Funksiya qavsida e'lon qilingan o'rin egasi parametr (parameter) deyiladi, uni chaqirganda uzatilgan aniq qiymat esa argument deyiladi."
    },
    {
      id: 2,
      question: "Agar funksiya parametr kutsa, lekin uni chaqirganda argument berilmasa, parametr qiymati nima bo'ladi?",
      options: [
        "undefined",
        "null",
        "0",
        "Dastur darhol xato beradi"
      ],
      correctAnswer: 0,
      explanation: "JavaScript da argument berilmagan parametrlar avtomatik ravishda undefined qiymatini oladi."
    },
    {
      id: 3,
      question: "Bir nechta parametr yoki argumentlar bir-biridan qaysi belgi bilan ajratiladi?",
      options: [
        ", (vergul)",
        "; (nuqta-vergul)",
        ": (ikki nuqta)",
        "Probel bilan"
      ],
      correctAnswer: 0,
      explanation: "Qavs ichidagi parametrlar ham, chaqiruvdagi argumentlar ham doimo vergul (,) bilan ajratiladi."
    }
  ]
};
