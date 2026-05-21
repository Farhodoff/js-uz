export const executionContextLesson = {
  id: "execution-context",
  title: "Execution Context (Bajarilish Konteksti)",
  level: "Beginner",
  description: "JavaScript kod qanday o'qilishi va xotira bilan qanday ishlashining ichki sirlari.",
  theory: `
# Execution Context – Bu nima va nima uchun kerak?

**Execution Context** (Bajarilish Konteksti) — bu JavaScript kodi o'qiladigan, tahlil qilinadigan va bajariladigan muhitdir. JavaScript-da har qanday kod har doim ma'lum bir kontekst ichida ishlaydi.

## 1. NEGA kerak?
Tasavvur qiling, siz yangi uyga ko'chib o'tdingiz. Jihozlarni joylashtirishdan oldin xonalarni rejalashtirish (qayerga nima qo'yiladi) va keyin ularni haqiqatda olib kirish kerak. JS ham kodni bajarishdan oldin xuddi shunday rejani tayyorlashi kerak. Execution Context bizga o'zgaruvchilar va funksiyalar qachon va qanday tartibda xotiradan joy olishini tushunish uchun kerak.

## 2. SODDALIK (Analogiya)
Buni **teatr sahnasiga** o'xshatish mumkin:
- **Creation Phase (Tayyorgarlik):** Spektakl boshlanishidan oldin dekoratsiyalar o'rnatiladi, aktyorlar sahna orqasiga yig'iladi va chiroqlar to'g'rilanadi. Hech kim hali gapirmayapti (kod bajarilmayapti), lekin hamma narsa tayyor.
- **Execution Phase (Spektakl):** Parda ochiladi va aktyorlar o'z rollarini ketma-ket ijro etishadi (kod qator-ma-qator ishga tushadi).

---

## 3. STRUKTURA VA BOSQICHLAR

Execution Context har doim **2 ta bosqichdan** o'tadi:

### A. Creation Phase (Yaratilish bosqichi)
JS dvigateli kodni hali ishga tushirmasdan, birinchi marta ko'z yugurtirib chiqadi:
1. **Global Object** (window yoki global) yaratiladi.
2. **this** kalit so'zi mos obyektga bog'lanadi.
3. **Hoisting** sodir bo'ladi:
   - Funksiya e'lonlari (Function declarations) xotiraga to'liq yozib olinadi.
   - \`var\` o'zgaruvchilari xotiradan joy oladi va ularga boshlang'ich \`undefined\` qiymati beriladi.
   - \`let\` va \`const\` o'zgaruvchilari xotirada yaratiladi, lekin ularga kirish taqiqlanadi (bu hudud **Temporal Dead Zone - TDZ** deyiladi).

### B. Execution Phase (Bajarilish bosqichi)
Tayyorgarlik tugagach, JS dvigateli kodni yuqoridan pastga, qator-ma-qator bajarishni boshlaydi:
- O'zgaruvchilarga haqiqiy qiymatlar yuklanadi.
- Funksiyalar ishga tushiriladi.

---

## 4. CALL STACK (Chaqiruvlar steki)
JavaScript faqat bitta ishni bajara oladigan (single-threaded) tildir. Dvigatel qaysi funksiya hozir bajarilayotganini va undan keyin qayerga qaytish kerakligini **Call Stack** orqali boshqaradi. U **LIFO** (Last In, First Out - Oxirgi kirgan, birinchi chiqadi) printsipi asosida ishlaydi.

\`\`\`javascript
function birinchi() {
  ikkinchi();
  console.log("Birinchi bajarildi");
}

function ikkinchi() {
  console.log("Ikkinchi bajarildi");
}

birinchi();
\`\`\`

**Call Stack ishlash ketma-ketligi:**
1. Global kontekst stakka qo'shiladi.
2. \`birinchi()\` chaqiriladi va stakka qo'shiladi.
3. \`birinchi()\` ichida \`ikkinchi()\` chaqiriladi va stakka qo'shiladi.
4. \`ikkinchi()\` bajarilib bo'lib, stakdan chiqib ketadi (pop).
5. \`birinchi()\` qolgan qismi bajariladi va stakdan chiqib ketadi.
6. Global kod tugaydi.

---

## 5. XATOLAR (Common mistakes)

1. **Stack Overflow (Stekning to'lib ketishi):** Agar funksiya o'zini o'zi cheksiz chaqirsa (rekursiyada to'xtash sharti bo'lmasa), Call Stack to'lib ketadi va \`RangeError: Maximum call stack size exceeded\` xatosi chiqadi.
2. **TDZ ichida o'zgaruvchiga murojaat:** Creation phase paytida \`let\` va \`const\` e'lon qilingan qatorgacha o'lik hududda bo'ladi. Unga oldindan murojaat qilish \`ReferenceError\` beradi.

---

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Execution Context nima?**
Execution Context (Bajarilish Konteksti) — bu JavaScript kodi tahlil qilinadigan va bajariladigan muhit (o'ziga xos xotira qutisi).

**2. Loyiha boshlanganda birinchi bo'lib qaysi context yaratiladi?**
Loyihada birinchi bo'lib har doim bitta Global Execution Context (GEC) yaratiladi.

**3. Function Execution Context (FEC) qachon yaratiladi?**
Har safar funksiya chaqirilganda (faqat chaqirilgandagina) yangi Function Execution Context yaratiladi.

**4. Creation Phase (Yaratilish bosqichi) nima vazifani bajaradi?**
Ushbu bosqichda kod hali bajarilmaydi, faqat o'zgaruvchilar va funksiyalar uchun xotiradan joy ajratiladi, \`this\` bog'lanadi va scope chain tayyorlanadi.

**5. Execution Phase (Bajarilish bosqichi) nima qiladi?**
Dastur kodini yuqoridan pastga, qator-ma-qator o'qib, o'zgaruvchilarga haqiqiy qiymatlarni yuklaydi va funksiyalarni bajaradi.

**6. Creation phase bosqichida var o'zgaruvchilariga qanday qiymat beriladi?**
\`var\` o'zgaruvchilari \`undefined\` qiymati bilan xotirada tayyorlab qo'yiladi.

**7. Creation phase bosqichida let va const o'zgaruvchilariga nima bo'ladi?**
Ular xotirada yaratiladi, lekin boshlang'ich qiymatsiz qoladi va ularga kirish taqiqlanadi (TDZ - Temporal Dead Zone).

**8. Call Stack (Chaqiruv steki) nima uchun kerak?**
JS dvigateli qaysi funksiya hozir bajarilayotganini va undan keyin qaysi funksiyaga qaytish kerakligini kuzatib borishi uchun kerak.

**9. Call Stack qaysi printsip asosida ishlaydi?**
LIFO (Last In, First Out) — oxirgi kirgan funksiya birinchi bo'lib stekdan chiqib ketadi.

**10. Stack Overflow (Stek to'lishi) nima va u qachon yuz beradi?**
Bu stekdagi funksiyalar soni kompyuter xotirasi ruxsat bergan chegaradan oshib ketganda yuz beradi. Ko'pincha cheksiz rekursiya tufayli sodir bo'ladi.

**11. JavaScript nega single-threaded (yagona oqimli) til deyiladi?**
Chunki unda faqat bitta Call Stack bor va u bir vaqtda faqat bitta amalni bajarish imkoniyatiga ega.

**12. Scope Chain (Sohalar zanjiri) Execution Context bilan qanday bog'liq?**
Har bir kontekst yaratilayotganda o'zining tashqi muhitiga (outer environment) havola (reference) oladi. Bu havolalar zanjiri ichki context tashqi o'zgaruvchilarni topishiga yordam beradi.
`,
  exercises: [
    {
      id: 1,
      title: "Stek to'lishini aniqlash",
      instruction: "Cheksiz rekursiya yarating, bu orqali Stack Overflow xatosini ko'rsating.",
      startingCode: "function recurse() {\n  // O'zini chaqirish yozing\n}\ntry {\n  recurse();\n} catch (e) {\n  console.log(e.name);\n}",
      hint: "recurse() funksiyasini o'z tanasida chaqiring: recurse();",
      test: "if (code.includes('recurse()') && logs.includes('RangeError')) return null; return 'Cheksiz rekursiya yaratilmadi yoki RangeError ushlanmadi!';"
    },
    {
      id: 2,
      title: "Temporal Dead Zone tekshiruvi",
      instruction: "let o'zgaruvchisini e'lon qilishdan oldin murojaat qilib, ReferenceError xatosini ushlang.",
      startingCode: "try {\n  // E'lon qilishdan oldin murojaat qiling\n  \n  let x = 10;\n} catch (e) {\n  console.log(e.name);\n}",
      hint: "let x = 10 dan oldin console.log(x) deb yozing.",
      test: "if (code.includes('ReferenceError') || logs.includes('ReferenceError')) return null; return 'ReferenceError aniqlanmadi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da kod bajariladigan muhit nima deb ataladi?",
      options: [
        "Call Stack",
        "Execution Context",
        "Global Object",
        "Scope Chain"
      ],
      correctAnswer: 1,
      explanation: "Execution Context — bu JavaScript kodini tahlil qilish va bajarish uchun dvigatel tomonidan yaratiladigan maxsus muhitdir."
    },
    {
      id: 2,
      question: "JavaScript kodi ishga tushishi bilan eng birinchi bo'lib qaysi kontekst yaratiladi?",
      options: [
        "Function Execution Context",
        "Eval Execution Context",
        "Global Execution Context",
        "Block Execution Context"
      ],
      correctAnswer: 2,
      explanation: "Har qanday JS kodi bajarilishni boshlaganda eng birinchi bo'lib bitta yagona Global Execution Context yaratiladi."
    },
    {
      id: 3,
      question: "Execution Context yaratilishining birinchi bosqichi (Creation Phase)da nima sodir bo'ladi?",
      options: [
        "Kod to'liq bajarib bo'linadi",
        "O'zgaruvchilar va funksiyalar uchun xotiradan joy ajratiladi, this bog'lanadi",
        "Faqat matematik amallar bajariladi",
        "Brauzer oynasi yopiladi"
      ],
      correctAnswer: 1,
      explanation: "Creation phase — tayyorgarlik bosqichi bo'lib, unda xotira tayyorlanadi (hoisting), `this` bog'lanadi va global obyekt yaratiladi."
    },
    {
      id: 4,
      question: "Creation Phase bosqichida `var` yordamida yaratilgan o'zgaruvchilarga qanday boshlang'ich qiymat beriladi?",
      options: [
        "`null`",
        "`0`",
        "`undefined`",
        "Ular qiymatsiz qoladi"
      ],
      correctAnswer: 2,
      explanation: "`var` o'zgaruvchilari hoist bo'lganda, ularga sukut bo'yicha `undefined` qiymati berib qo'yiladi."
    },
    {
      id: 5,
      question: "Creation Phase bosqichida `let` va `const` o'zgaruvchilariga nima bo'ladi?",
      options: [
        "Ular ham `undefined` bo'lib xotirada tayyorlanadi",
        "Ular xotirada yaratiladi, lekin qiymat tayinlanguncha kirish taqiqlangan (TDZ - Temporal Dead Zone) holatida bo'ladi",
        "Ular umuman xotiraga olinmaydi",
        "Ular avtomatik global o'zgaruvchiga aylanadi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` hoist bo'lsa-da, e'lon qilingunga qadar ularga kirib bo'lmaydi va bu holat Temporal Dead Zone (TDZ) deb ataladi."
    },
    {
      id: 6,
      question: "Function Execution Context qachon yaratiladi?",
      options: [
        "Funksiya e'lon qilingan (yozilgan) vaqtda",
        "Funksiya chaqirilgan (ishga tushirilgan) vaqtda",
        "Sahifa yuklanganda",
        "Faqat `return` kalit so'zi ishlatilganda"
      ],
      correctAnswer: 1,
      explanation: "Function Execution Context faqat va faqat o'sha funksiya chaqirilganda (invoke qilinganda) yaratiladi."
    },
    {
      id: 7,
      question: "JavaScript dvigateli bajarilayotgan funksiyalarning navbatini qayerda nazorat qiladi?",
      options: [
        "Call Stack",
        "Heap xotira",
        "Callback Queue",
        "Event Loop"
      ],
      correctAnswer: 0,
      explanation: "Call Stack (Chaqiruv Steki) — dasturda funksiyalarning bajarilish navbatini va oqimini boshqaradigan maxsus ma'lumotlar tuzilmasidir."
    },
    {
      id: 8,
      question: "Call Stack qanday printsip bo'yicha ishlaydi?",
      options: [
        "FIFO (First In, First Out)",
        "LIFO (Last In, First Out)",
        "Tasodifiy tartibda",
        "Alifbo tartibida"
      ],
      correctAnswer: 1,
      explanation: "Call Stack LIFO (Oxirgi kirgan, birinchi chiqadi) printsipida ishlaydi. Stekning eng tepasidagi funksiya bajarilib bo'lgach, birinchi bo'lib chiqib ketadi."
    },
    {
      id: 9,
      question: "JavaScript-ning single-threaded (yagona oqimli) ekanligi nimani anglatadi?",
      options: [
        "U faqat bitta fayldan iborat koddni o'qiy oladi",
        "U bir vaqtning o'zida faqat bitta amalni (funksiyani) bajara oladi, chunki unda faqat bitta Call Stack bor",
        "Undagi barcha o'zgaruvchilar faqat bir marta e'lon qilinadi",
        "U faqat bitta brauzerda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Yagona oqimli (single-threaded) bo'lish bir vaqtning o'zida faqat bitta Call Stack orqali bitta vazifani navbat bilan bajarishni bildiradi."
    },
    {
      id: 10,
      question: "Stek to'lib ketganda (masalan cheksiz rekursiya sababli) qanday xatolik yuz beradi?",
      options: [
        "TypeError",
        "SyntaxError",
        "RangeError (Maximum call stack size exceeded)",
        "ReferenceError"
      ],
      correctAnswer: 2,
      explanation: "Stek hajmi cheklangan. U to'lib ketsa, JavaScript `RangeError: Maximum call stack size exceeded` (Stack Overflow) xatosini tashlaydi."
    },
    {
      id: 11,
      question: "Execution Phase (Bajarilish bosqichi) davomida kod qanday tartibda bajariladi?",
      options: [
        "Barcha funksiyalar parallel ravishda",
        "Qator-ma-qator, yuqoridan pastga qarab",
        "Tasodifiy qatorlar bo'yicha",
        "Faqat eng oxirgi qatordan boshlab"
      ],
      correctAnswer: 1,
      explanation: "Bajarilish bosqichida kod qator-ma-qator, sinxron tarzda yuqoridan pastga qarab ijro etiladi."
    },
    {
      id: 12,
      question: "Funksiya ichidagi o'zgaruvchi topilmasa, u qayerdan qidiriladi?",
      options: [
        "Call Stack-dan",
        "Tashqi (parent) kontekstlardan Scope Chain (sohalar zanjiri) bo'yicha",
        "Faqat global context-dan to'g'ridan-to'g'ri",
        "Qidirilmaydi, darhol TypeError beradi"
      ],
      correctAnswer: 1,
      explanation: "Agar joriy context ichida o'zgaruvchi topilmasa, Scope Chain orqali tashqi o'rab turgan kontekstlardan (o'zining parent kontekstlaridan) qidirib boriladi."
    }
  ]
};
