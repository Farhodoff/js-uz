export const formsLesson = {
  id: "forms",
  title: "Formalar bilan ishlash",
  level: "O'rta daraja",
  description: "Inputlar, submit va validatsiya: foydalanuvchi ma'lumotlarini qabul qilish.",
  theory: `
# Formalar — Bu nima va nima uchun kerak?

**Forma** (\`form\`) — bu veb-saytlarda ma'lumot to'plashning asosiy usuli. Ro'yxatdan o'tish, qidiruv yoki xabar yuborish — hammasi formalar orqali qilinadi.

## 1. NEGA kerak?
Saytingiz foydalanuvchidan ma'lumot olishi kerak bo'lsa (masalan, login/parol), sizga formalar kerak bo'ladi. JS orqali biz o'sha ma'lumotlarni serverga yuborishdan oldin tekshiramiz (validatsiya).

## 2. SODDALIK (Analogiya)
Buni **anketa to'ldirishga** o'xshatish mumkin. Siz qog'ozdagi katakchalarni to'ldirasiz (Input) va uni qabulxonaga topshirasiz (Submit). Qabulxona xodimi (JS) hamma joyi to'ldirilganini tekshiradi.

## 3. STRUKTURA

### A. submit hodisasi
Forma yuborilganda \`submit\` hodisasi yuz beradi. Uni doim \`preventDefault()\` bilan to'xtatish kerak:
\`\`\`javascript
const myForm = document.querySelector("form");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Forma yuborildi!");
});
\`\`\`

### B. Qiymatni olish (.value)
Input ichidagi matnni olish:
\`\`\`javascript
const ismInput = document.querySelector("#name");
console.log(ismInput.value); // Matnni qaytaradi
\`\`\`

### C. Validatsiya (Tekshirish)
\`\`\`javascript
if (ismInput.value === "") {
  alert("Ismingizni yozing!");
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **preventDefault ni unutish:** Agar buni yozmasangiz, forma yuborilganda sahifa yangilanib ketadi va JS kodlaringiz ishlamay qoladi.
2. **value va elementni adashtirish:** \`console.log(input)\` elementni o'zini chiqaradi, \`console.log(input.value)\` esa ichidagi matnni.

## 6. SAVOLLAR VA JAVOBLAR
**1. Formaning asosiy hodisasi (event) qaysi?**
submit


**2. event.preventDefault() nima uchun shart?**
Sahifani yangilanib ketishini to'xtatish uchun.


**3. Input ichidagi matnni qanday olamiz?**
element.value xususiyati orqali.


**4. Validatsiya nima?**
Ma'lumotlarning to'g'ri to'ldirilganligini tekshirish jarayoni.


**5. Input qiymati har doim qaysi turda (string) bo'ladi?**
String turida.


**6. Checkbox tanlanganini qanday bilamiz?**
.checked xususiyati orqali (true/false).


**7. reset() metodi nima qiladi?**
Formani tozalaydi.


**8. required atributi va JS validatsiya farqi?**
required — HTML tarafidan, JS validatsiya — murakkabroq mantqiy tekshiruv uchun.


**9. Radio button qiymatini qanday olamiz?**
Tanlangan radioga murojaat qilib .value orqali.


**10. input va change eventlari farqi nima?**
input — yozish jarayonida, change — yozib bo'lib fokus chiqqanda.


**11. Formani tugma bosmasdan qanday yuborsa bo'ladi?**
form.submit() metodi orqali.


**12. Xatolik matnini ekranda ko'rsatish uchun nima qilish kerak?**
DOM orqali alohida biror div ga matn yozish.
`,
  exercises: [
    {
      id: 1,
      title: "Submitni to'xtatish",
      instruction: "Forma yuborilganda sahifa yangilanmasligi uchun kerakli metodni chaqiring.",
      startingCode: "const event = { preventDefault: () => event.done = true };\nfunction handleSubmit(e) {\n  // Bu yerda chaqiring\n}\nhandler(event);",
      hint: "e.preventDefault();",
      test: "if (event.done) return null; return 'event.preventDefault() chaqirilmadi';"
    },
    {
      id: 2,
      title: "Qiymatni olish",
      instruction: "'user' o'zgaruvchisidan uning qiymatini (value) oling va 'val' o'zgaruvchisiga saqlang.",
      startingCode: "const user = { value: 'Ali' };\n// Bu yerga yozing\n",
      hint: "const val = user.value;",
      test: "if (code.includes('.value')) return null; return 'value xususiyatini ishlating';"
    },
    {
      id: 3,
      title: "Bo'shliqni tekshirish",
      instruction: "Agar 'msg' inputining qiymati bo'sh bo'lsa 'Bo'sh' so'zini konsolga chiqaring.",
      startingCode: "const msg = { value: '' };\n// Bu yerga yozing\n",
      hint: "if (msg.value === '') console.log('Bo'sh');",
      test: "if (logs.includes('Bo\\'sh')) return null; return 'Xato tekshiruv';"
    },
    {
      id: 4,
      title: "Parol uzunligi",
      instruction: "Parol (pass.value) 8 tadan kam bo'lsa 'Kisqa' so'zini chiqaring.",
      startingCode: "const pass = { value: '123' };\n// Bu yerga yozing\n",
      hint: "if (pass.value.length < 8) console.log('Kisqa');",
      test: "if (logs.includes('Kisqa')) return null; return 'Uzunlikni tekshiring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Veb-sahifalardagi formalarni (forms) yuborishda (submit event) `event.preventDefault()` chaqirish nima uchun muhim hisoblanadi?",
      options: [
        "Chunki u ma'lumotlarni serverga avtomatik yuboradi",
        "Chunki u formani tozalab yuboradi (reset)",
        "Chunki aks holda brauzer sahifani to'liq qayta yuklaydi, natijada barcha JavaScript holati (state) va konsoldagi ma'lumotlar o'chib ketadi",
        "Bu CSS stillarining buzilmasligi uchun kerak"
      ],
      correctAnswer: 2,
      explanation: "Standart bo'yicha HTML formalari yuborilganda sahifani yangilaydi (action atributidagi URL'ga o'tishga urinadi). Biz asinxron (AJAX) ma'lumot jo'natishimiz uchun `preventDefault()` orqali bu standart amaldan voz kechishimiz zarur."
    },
    {
      id: 2,
      question: "Oddiy input elementidan olingan qiymat (`input.value`) har doim qaysi ma'lumot turida (data type) bo'ladi?",
      options: [
        "Faqat `number` turida",
        "Faqat `boolean` turida",
        "Doimo `string` (matn) turida (hatto input turi `type=\"number\"` bo'lsa ham)",
        "Faqat `object` turida"
      ],
      correctAnswer: 2,
      explanation: "Input maydonidan olingan barcha qiymatlar, hatto raqamli yoki sanali bo'lsa ham, har doim string turida bo'ladi. Ulardan matematik amallarda foydalanishdan avval `Number()` yoki `parseInt()` yordamida o'zgartirib olish lozim."
    },
    {
      id: 3,
      question: "Checkbox yoki Radio button elementlarining foydalanuvchi tomonidan tanlangan yoki tanlanmaganligini JavaScript-da qanday aniqlash mumkin?",
      options: [
        "`element.value` xususiyati orqali",
        "`element.checked` boolean xususiyati orqali",
        "`element.selected` xususiyati orqali",
        "`element.status` xususiyati orqali"
      ],
      correctAnswer: 1,
      explanation: "Checkbox va Radio button elementlari uchun ularning tanlanganlik holati `checked` nomli xususiyatida true yoki false boolean qiymat sifatida saqlanadi."
    },
    {
      id: 4,
      question: "HTML formadagi barcha input va tanlov qiymatlarini bitta joyda oson to'plab, serverga yuborishga tayyorlash uchun mo'ljallangan maxsus brauzer klassi (API) qaysi?",
      options: [
        "`FormCollector`",
        "`FormData`",
        "`FormParser`",
        "`FormSerializer`"
      ],
      correctAnswer: 1,
      explanation: "`FormData` obyekti (masalan: `new FormData(formElement)`) formadagi barcha elementlarning `name` va `value` qiymatlarini avtomatik to'plab beradi va uni fetch so'rovlarida to'g'ridan-to'g'ri jo'natish mumkin."
    },
    {
      id: 5,
      question: "Input elementlaridagi `input` va `change` hodisalari (events) o'rtasidagi asosiy farq nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "`input` hodisasi foydalanuvchi har bir harfni kiritganda real-vaqtda ishlaydi; `change` esa faqat foydalanuvchi inputdan chiqqanda (focus yo'qolganda) va qiymat o'zgarganda ishga tushadi",
        "`change` hodisasi faqat server bilan ishlaydi",
        "`input` hodisasi faqat rasmlar uchun ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`input` event har bir klavish bosilganda (qiymat har safar o'zgarganda) darhol ishga tushadi. `change` event esa foydalanuvchi qiymatni o'zgartirib, input elementini tark etganidan keyingina ishlaydi."
    }
  ]
};