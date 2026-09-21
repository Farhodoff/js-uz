export const switchLesson = {
  id: "switchLesson",
  title: "switch (Ko'p yo'lli tanlov)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz ko'p qavatli binoda lift ichidasiz. Lift panelida har xil raqamli tugmalar bor: 1, 2, 3...
Siz qaysi qavat tugmasini bossangiz, lift to'g'ri o'sha qavatga borib to'xtaydi. Agar mavjud bo'lmagan raqamni bossangiz, panelda "Bunday qavat yo'q" degan standart xabar chiqadi (\`default\`).

\`switch\` (almashtirgich / tanlov) — bitta o'zgaruvchining qiymatini oldindan ma'lum bo'lgan aniq variantlar (\`case\`) bilan solishtirib, mos kelgan kod blokini ishga tushiruvchi tanlash operatoridir.

---

## 2. Nega kerak?

Bitta o'zgaruvchini bir nechta aniq qiymatlarga tekshirish kerak bo'lganda:
\`if (day === 1) ... else if (day === 2) ... else if (day === 3)...\`
deb yozish juda uzun va chalkash bo'lib ketadi.

Bunday vaziyatda \`switch\` operatori ancha qisqa, tartibli va o'qish uchun juda qulay tuzilma taqdim etadi.

---

## 3. Birinchi misol

Bu kod hafta kuni raqamiga qarab uning nomini konsolga chiqaradi.

\`\`\`javascript
let dayNumber = 2; // Hafta kuni raqami

switch (dayNumber) {
  case 1:
    console.log("Dushanba");
    break;
  case 2:
    console.log("Seshanba"); // dayNumber === 2 bo'lgani uchun shu ishlaydi
    break;
  default:
    console.log("Boshqa kun");
}
\`\`\`

\`\`\`text
// Natija: Seshanba
\`\`\`

---

## 4. Qator-baqator tahlil

- \`switch (dayNumber)\` — tekshiriladigan o'zgaruvchi \`switch\` qavsiga yoziladi.
- \`case 2:\` — agar \`dayNumber === 2\` bo'lsa, shu yerdan boshlab kod bajariladi.
- \`break;\` — to'xtash buyrug'i. U \`switch\` blokidan darhol tashqariga chiqishni bildiradi.
- \`default:\` — agar birorta ham \`case\` mos kelmasa, zaxira varianti sifatida \`default\` bloki ishlaydi (xuddi \`else\` kabi).

---

## 5. Qadamma-qadam (trace)

Bajarilish ketma-ketligi jadvali:

| Qadam | Kod qatori | Taqqoslash / Holat | Natija |
|---|---|---|---|
| 1 | \`let dayNumber = 2;\` | \`dayNumber = 2\` | O'zgaruvchi yuklandi |
| 2 | \`case 1:\` | \`2 === 1\` → \`false\` | Mos kelmadi, keyingi case'ga o'tildi |
| 3 | \`case 2:\` | \`2 === 2\` → \`true\` | Mos keldi! Blok ichiga kirildi |
| 4 | \`console.log("Seshanba");\` | Xabar chiqarildi | Seshanba konsolga chiqdi |
| 5 | \`break;\` | To'xtash buyrug'i | switch yakunlandi, default tekshirilmaydi |

---

## 6. Yana bitta misol

Bu kodda qiymat birorta ham \`case\` ga mos kelmaydi va \`default\` ishga tushadi.

\`\`\`javascript
let dayNumber = 9; // Mavjud bo'lmagan kun raqami

switch (dayNumber) {
  case 1:
    console.log("Dushanba");
    break;
  case 2:
    console.log("Seshanba");
    break;
  default:
    console.log("Noto'g'ri kun raqami!"); // Hech biri mos kelmagani uchun shu ishlaydi
}
\`\`\`

\`\`\`text
// Natija: Noto'g'ri kun raqami!
\`\`\`

Qator-baqator tahlil:
- \`dayNumber\` qiymati \`9\`.
- \`case 1\` va \`case 2\` tekshiriladi, ikkalasi ham \`false\` bo'ladi.
- Barcha variantlar rad etilgani uchun avtomatik ravishda \`default\` bloki ishga tushadi.
- Konsolga \`"Noto'g'ri kun raqami!"\` chiqadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. break ni unutish (pastga oqib ketish)
❌ Xato kod:
\`\`\`javascript
let role = "admin";
switch (role) {
  case "admin":
    console.log("Admin"); // break yo'q!
  case "user":
    console.log("Foydalanuvchi");
    break;
}
\`\`\`
Nima bo'ladi: Konsolga HAM \`"Admin"\`, HAM \`"Foydalanuvchi"\` chiqib ketadi! Chunki \`break\` qo'yilmasa, JavaScript to'xtamay keyingi \`case\` ni ham bajarib yuboradi.
✅ To'g'ri variant:
\`\`\`javascript
switch (role) {
  case "admin":
    console.log("Admin");
    break;
  case "user":
    console.log("Foydalanuvchi");
    break;
}
\`\`\`

### 2. switch qat'iy tenglik (===) ishlatishini unutish
❌ Xato tushuncha:
\`\`\`javascript
let code = "1"; // Matn
switch (code) {
  case 1: // Son
    console.log("Bir");
    break;
}
\`\`\`
Nima bo'ladi: Konsolga hech narsa chiqmaydi! Chunki \`switch\` qat'iy tenglik (\`"1" === 1\`) bilan tekshiradi. Biri matn, biri son bo'lgani sababli ular teng emas.
✅ To'g'ri variant:
\`\`\`javascript
switch (code) {
  case "1":
    console.log("Bir");
    break;
}
\`\`\`

### 3. case dan keyin ikki nuqta (:) o'rniga nuqta-vergul (;) qo'yish
❌ Xato kod:
\`\`\`javascript
case 1;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token ';'\` xatoligi yuz beradi. \`case\` va \`default\` dan keyin har doim ikki nuqta (\`:\`) qo'yiladi.
✅ To'g'ri variant:
\`\`\`javascript
case 1:
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`grade = "B";\` berilgan. \`switch\` orqali: \`"A"\` bo'lsa \`"A'lo"\`, \`"B"\` bo'lsa \`"Yaxshi"\`, qolgan hollarda (\`default\`) \`"Boshqa baho"\` deb konsolga chiqaruvchi kod yozing.

### 2-mashq (O'rtacha)
\`action = "stop";\` berilgan. \`switch\` orqali: \`"start"\` bo'lsa \`"Boshlash"\`, \`"stop"\` bo'lsa \`"To'xtatish"\`, aks holda \`"Noma'lum buyruq"\` deb konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi kodda \`break\` qolib ketgani tufayli ikkala rang ham chiqib ketyapti. Unga \`break;\` qo'shib xatoni to'g'rilang:
\`\`\`javascript
let color = "red";
switch (color) {
  case "red":
    console.log("Qizil");
  case "blue":
    console.log("Ko'k");
    break;
}
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let grade = "B";
switch (grade) {
  case "A":
    console.log("A'lo");
    break;
  case "B":
    console.log("Yaxshi");
    break;
  default:
    console.log("Boshqa baho");
}
\`\`\`
2.
\`\`\`javascript
let action = "stop";
switch (action) {
  case "start":
    console.log("Boshlash");
    break;
  case "stop":
    console.log("To'xtatish");
    break;
  default:
    console.log("Noma'lum buyruq");
}
\`\`\`
3.
\`\`\`javascript
let color = "red";
switch (color) {
  case "red":
    console.log("Qizil");
    break; // break qo'shildi
  case "blue":
    console.log("Ko'k");
    break;
}
\`\`\`

---

## 9. Xulosa

1. \`switch (qiymat)\` bitta o'zgaruvchini aniq variantlar (\`case\`) bilan solishtirish uchun ishlatiladi.
2. Har bir \`case\` oxiriga \`break;\` qo'yish shart, aks holda keyingi \`case\` ham ishlab ketadi.
3. Hech bir \`case\` to'g'ri kelmaganda zaxira varianti sifatida \`default\` bloki ishlaydi.

Keyingi darsda: Sikllar (Loops) — kodni qayta-qayta takrorlash operatorlari bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Bahoni switch orqali tekshirish",
      instruction: "`let grade = \"B\";` berilgan. `switch` orqali: `\"A\"` bo'lsa `\"A'lo\"`, `\"B\"` bo'lsa `\"Yaxshi\"`, aks holda `\"Boshqa baho\"` deb chiqaring.",
      startingCode: "let grade = \"B\";\n// switch yozing\n",
      hint: "switch (grade) {\n  case \"A\":\n    console.log(\"A'lo\");\n    break;\n  case \"B\":\n    console.log(\"Yaxshi\");\n    break;\n  default:\n    console.log(\"Boshqa baho\");\n}",
      test: "if (!code.includes('switch')) return 'switch ishlatilmadi';\nif (!code.includes('case')) return 'case ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yaxshi'))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Buyruqni aniqlash",
      instruction: "`let action = \"stop\";` berilgan. `switch` orqali: `\"start\"` bo'lsa `\"Boshlash\"`, `\"stop\"` bo'lsa `\"To'xtatish\"`, aks holda `\"Noma'lum buyruq\"` deb chiqaring.",
      startingCode: "let action = \"stop\";\n// switch yozing\n",
      hint: "switch (action) {\n  case \"start\":\n    console.log(\"Boshlash\");\n    break;\n  case \"stop\":\n    console.log(\"To'xtatish\");\n    break;\n  default:\n    console.log(\"Noma'lum buyruq\");\n}",
      test: "if (!code.includes('switch')) return 'switch ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('To\\'xtatish'))) return null;\nreturn 'Kutilgan xabar konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "break xatosini to'g'rilash",
      instruction: "`case \"red\":` dan keyin `break;` qo'shing, toki konsolga faqat `\"Qizil\"` chiqsin.",
      startingCode: "let color = \"red\";\nswitch (color) {\n  case \"red\":\n    console.log(\"Qizil\");\n  case \"blue\":\n    console.log(\"Ko'k\");\n    break;\n}\n",
      hint: "case \"red\":\n    console.log(\"Qizil\");\n    break;",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length === 1 && out[0].includes('Qizil')) return null;\nreturn 'Faqat bitta xabar (Qizil) chiqishi kerak, break qo\\'shing';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "switch operatorida har bir case blokidan keyin nima uchun break; yoziladi?",
      options: [
        "Keyingi case ga o'tib ketmasdan, switch dan darhol chiqish uchun",
        "Dasturni butunlay to'xtatish uchun",
        "Yangi o'zgaruvchi yaratish uchun",
        "Bu ixtiyoriy belgi bo'lib, hech narsaga ta'sir qilmaydi"
      ],
      correctAnswer: 0,
      explanation: "break buyrug'i case bajarilgandan so'ng switch dan chiqishni ta'minlaydi; aks holda keyingi case ham ishlab ketadi."
    },
    {
      id: 2,
      question: "switch tekshiruvida birorta ham case mos kelmasa, qaysi blok ishlaydi?",
      options: [
        "Hech narsa ishlamaydi va xato beradi",
        "Birinchi case",
        "default bloki",
        "Oxirgi case"
      ],
      correctAnswer: 2,
      explanation: "Agar hech bir case mos kelmasa, zaxira varianti sifatida default bloki ishga tushadi."
    },
    {
      id: 3,
      question: "switch qiymatlarni solishtirganda qaysi tenglik algoritmidan foydalanadi?",
      options: [
        "== (erkin tenglik)",
        "=== (qat'iy tenglik — qiymat va turni birga tekshiradi)",
        "= (qiymat yuklash)",
        "!="
      ],
      correctAnswer: 1,
      explanation: "switch har doim qat'iy tenglik (===) orqali tekshiradi, turlarni avtomatik o'zgartirmaydi."
    }
  ]
};
