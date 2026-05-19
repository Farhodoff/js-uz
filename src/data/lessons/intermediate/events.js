export const events = {
  id: "events",
  title: "Hodisalar (Events)",
  level: "O'rta daraja",
  description: "Foydalanuvchi harakatlarini (klik, yozish, yuborish) JS orqali boshqarish.",
  theory: `
# Events (Hodisalar) — Bu nima va nima uchun kerak?

**Event** — bu foydalanuvchi yoki brauzer tomonidan qilingan harakat. Masalan: klik, tugma bosilishi, formani yuborish.

## 1. NEGA kerak?
Saytingiz "jonli" bo'lishi uchun u foydalanuvchi bilan muloqot qilishi kerak. Eventsiz sayt shunchaki qog'ozdagi rasmdek gap.

## 2. SODDALIK (Analogiya)
Buni xuddi uydagi chiroq tugmasi (vyklyuchatel) deb tasavvur qiling. Siz uni bosasiz (Event), natijada chiroq yonadi (Callback funksiya).

## 3. STRUKTURA

### A. addEventListener
\`\`\`javascript
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  console.log("Tugma bosildi!");
});
\`\`\`

### B. Event Obyekti (e)
\`\`\`javascript
btn.addEventListener("click", (e) => {
  console.log(e.target); // Bosilgan element
  e.preventDefault(); // Standart amalni to'xtatish
});
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Qavslarni qo'yish:** \`addEventListener("click", func())\` xato ❌. Doim qavssiz: \`addEventListener("click", func)\` ✅.
2. **Event nomi:** \`onclick\` emas, shunchaki \`click\`.

## 6. SAVOLLAR (12 ta)
1. Event nima?
2. \`addEventListener\` nima uchun?
3. 3 ta eng ko'p ishlatiladigan event?
4. \`event.target\` nima?
5. \`event.preventDefault()\` nima uchun?
6. Bitta elementga ko'p listener qo'shsa bo'ladimi?
7. \`click\` va \`dblclick\` farqi?
8. Input o'zgarganda qaysi event ishlaydi (\`input\`)?
9. Event bubbling nima?
10. Event listenerni o'chirish metodi?
11. \`DOMContentLoaded\` nima?
12. Keyboard eventlari nima uchun?`,
  exercises: [
    {
      id: 1,
      title: "Click Event",
      instruction: "Berilgan 'btn' obyektiga 'click' eventini qo'shing va u bosilganda consolega 'OK' chiqaring.",
      startingCode: "const btn = { addEventListener: (type, cb) => btn.click = cb }; // Mock\n// Bu yerga yozing\n",
      hint: "btn.addEventListener('click', () => console.log('OK'));",
      test: "if (typeof btn.click === 'function') { btn.click(); if (logs.includes('OK')) return null; } return 'Consolega OK chiqmadi';"
    },
    {
      id: 2,
      title: "Input Event",
      instruction: "Inputga biror narsa yozilganda uning qiymatini (value) konsolga chiqaring.",
      startingCode: "const input = { value: 'test', addEventListener: (type, cb) => input.oninput = cb };\n// Bu yerga yozing\n",
      hint: "input.addEventListener('input', (e) => console.log(e.target.value));",
      test: "if (typeof input.oninput === 'function') { input.oninput({target: input}); if (logs.includes('test')) return null; } return 'Input qiymati chiqmadi';"
    },
    {
      id: 3,
      title: "Prevent Default",
      instruction: "Eventning standart harakatini to'xtatuvchi metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.stopped = true };\nfunction handler(e) {\n  // Bu yerga yozing\n}\nhandler(event);",
      hint: "e.preventDefault();",
      test: "if (event.stopped) return null; return 'preventDefault() chaqirilmadi';"
    },
    {
      id: 4,
      title: "Double Click",
      instruction: "'img' elementiga ikki marta bosilganda (dblclick) 'Rasm' so'zini chiqaring.",
      startingCode: "const img = { addEventListener: (type, cb) => img.ondblclick = cb };\n// Bu yerga yozing\n",
      hint: "img.addEventListener('dblclick', () => console.log('Rasm'));",
      test: "if (typeof img.ondblclick === 'function') { img.ondblclick(); if (logs.includes('Rasm')) return null; } return 'Double click ishlamadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`addEventListener('click', myFunc)` chaqirishda `myFunc` funksiyasi oxiriga nima uchun qavslar `()` qo'yilmaydi?",
      options: [
        "Chunki qavslar qo'yilsa, funksiya tugma bosilganda emas, balki kod o'qilgan vaqtda darhol ishga tushib ketadi",
        "Chunki JavaScript sintaksisida funksiyalar hech qachon qavslar bilan chaqirilmaydi",
        "Bu CSS selektori bilan to'qnashuvni oldini olish uchun kerak",
        "Qavslar qo'yilganda kod tezroq ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Agar funksiya oxiriga qavs `()` qo'ysangiz, JavaScript uni o'sha satr o'qilishi bilanoq darhol chaqiradi. Biz esa tugma bosilganda uning callback sifatida (keyinroq) chaqirilishini istaymiz. Shuning uchun faqat funksiyaning nomi (havolasi) uzatiladi."
    },
    {
      id: 2,
      question: "Hodisa (Event) sodir bo'lganda, foydalanuvchining ayni vaqtda aynan qaysi element ustida klik qilganini aniqlash uchun event obyektining qaysi xususiyatidan foydalaniladi?",
      options: [
        "`event.name`",
        "`event.target`",
        "`event.type`",
        "`event.element`"
      ],
      correctAnswer: 1,
      explanation: "`event.target` xususiyati ayni vaqtda foydalanuvchi ta'sir qilgan (masalan, bosgan) haqiqiy DOM elementiga ishora qiladi."
    },
    {
      id: 3,
      question: "Brauzerning standart harakatlarini (masalan, formadagi submit tugmasi bosilganda sahifani qayta yuklash yoki a-link bosilganda yangi URL-ga o'tish) bekor qilish uchun qaysi metod ishlatiladi?",
      options: [
        "`event.stopPropagation()`",
        "`event.preventDefault()`",
        "`event.stopImmediatePropagation()`",
        "`event.cancelBubbling()`"
      ],
      correctAnswer: 1,
      explanation: "`event.preventDefault()` metodi brauzerning har bir hodisa uchun sukut bo'yicha belgilangan standart harakatini to'xtatadi."
    },
    {
      id: 4,
      question: "JavaScript-da Event Bubbling (hodisaning ko'pirib ko'tarilishi) deganda nimani tushunasiz?",
      options: [
        "Hodisa faqat eng tepa ota elementda boshlanib, pastki ichki bolalarga qarab tarqalishi",
        "Hodisaning eng ichki (eng chuqur joylashgan) elementda ishga tushib, so'ngra uning barcha ota elementlari (ancestors) bo'ylab yuqoriga qarab bosqichma-bosqich tarqalishi",
        "Xotirada eventlarning haddan tashqari to'lib ketishi va xatolik berishi",
        "Hodisaning bir vaqtda barcha ochiq sahifalarda tarqalishi"
      ],
      correctAnswer: 1,
      explanation: "Event Bubbling - hodisalarning eng quyidagi elementdan boshlanib, asta-sekin DOM daraxti bo'ylab eng yuqorigacha (`window`gacha) ota elementlar orqali ko'tarilish jarayonidir."
    },
    {
      id: 5,
      question: "Hodisaning ota elementlarga qarab yuqoriga tarqalishini (bubbling) to'xtatish uchun qaysi metod ishlatiladi?",
      options: [
        "`event.preventDefault()`",
        "`event.stopPropagation()`",
        "`event.cancel()`",
        "`event.freeze()`"
      ],
      correctAnswer: 1,
      explanation: "`event.stopPropagation()` metodi joriy hodisaning ota elementlarga o'tib bubbling bo'lishini (yuqoriga qarab tarqalishini) butunlay to'xtatib qo'yadi."
    }
  ]
};
