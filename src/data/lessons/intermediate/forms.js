export const formsLesson = {
  id: "forms",
  title: "Formalar bilan ishlash",
  level: "O'rta daraja",
  description: "Inputlar, submit va validatsiya: foydalanuvchi ma'lumotlarini qabul qilish.",
  theory: `## 1. NEGA kerak?

Forma (\`form\`) — bu veb-saytlarda foydalanuvchidan ma'lumot to'plashning asosiy usuli. Ro'yxatdan o'tish, qidiruv tizimi, to'lov qilish, fikr-mulohaza qoldirish — bularning barchasi formalar orqali amalga oshiriladi. JavaScript yordamida biz foydalanuvchi kiritgan ma'lumotlarni serverga yuborishdan oldin tekshiramiz (validatsiya), xatolarni ko'rsatamiz va ma'lumotlarni xavfsiz formatda jo'natishga tayyorlaymiz.

## 2. SODDALIK (Analogiya)

Buni **rasmiy anketa to'ldirishga** o'xshatish mumkin:
- **Anketa varag'i:** HTML formasi.
- **Katakchalar (ism, yosh):** Inputlar.
- **Tugma (Submit):** Hujjatni topshirish.
- **JavaScript (Tekshiruvchi xodim):** Siz anketani topshirganingizda, u hamma narsa to'g'ri to'ldirilganini (masalan, yosh ustuniga raqam yozilganini, email to'g'ri formatdaligini) tekshiradi. Agar xato bo'lsa, anketani qaytarib beradi.

## 3. STRUKTURA

### A. submit hodisasi va preventDefault
Forma yuborilganda \`submit\` hodisasi yuz beradi. Brauzer sukut bo'yicha sahifani yangilab yuborishga harakat qiladi. Buning oldini olish uchun \`e.preventDefault()\` chaqiriladi:
\`\`\`javascript
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Sahifa yangilanishini to'xtatadi
  console.log("Forma topshirildi!");
});
\`\`\`

### B. Inputlardan qiymat olish (.value)
Matnli maydonlardan ma'lumotni \`.value\` xususiyati orqali olamiz:
\`\`\`javascript
const nameInput = document.querySelector("#username");
console.log(nameInput.value); // Foydalanuvchi kiritgan matn
\`\`\`
*Eslatma:* Hatto input turi \`type="number"\` bo'lsa ham, \`.value\` har doim string qaytaradi. Uni songa o'tkazish uchun \`Number()\` yoki \`parseInt()\` ishlatiladi.

### C. Checkbox va Radio button (.checked)
Tanlov elementlarida qiymat emas, balki ularning tanlanganlik holati (\`true\` / \`false\`) muhim:
\`\`\`javascript
const agreeCheckbox = document.querySelector("#agree");
console.log(agreeCheckbox.checked); // true yoki false
\`\`\`

### D. FormData API
Agar formada inputlar ko'p bo'lsa, ularni birma-bir yig'ish qiyin. \`FormData\` bizga butun formadagi ma'lumotlarni kalit-qiymat ko'rinishida yig'ib beradi:
\`\`\`javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  
  // Ma'lumotlarni olish
  const username = formData.get("username");
  const email = formData.get("email");
  
  console.log(username, email);
});
\`\`\`

### E. Formani tozalash (reset)
Formadagi barcha maydonlarni dastlabki holatiga keltirish:
\`\`\`javascript
form.reset(); // Barcha inputlarni tozalaydi
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **preventDefault ni yozishni unutish:**
   Agar preventDefault yozilmasa, forma submit bo'lganda sahifa tezda yangilanib ketadi va konsoldagi yoki JS xotirasidagi ma'lumotlar yo'qoladi.

2. **Element va uning qiymatini adashtirish:**
   \`\`\`javascript
   const input = document.querySelector("#name");
   // XATO:
   if (input === "") { ... } // input - bu DOM obyekti, u hech qachon bo'sh string bo'lmaydi.
   // TO'G'RI:
   if (input.value === "") { ... }
   \`\`\`

3. **Checkbox'lar uchun value tekshirish:**
   Checkbox tanlanganini bilish uchun \`checkbox.value\` emas, \`checkbox.checked\` ishlatilishi kerak.

## 5. AMALIYOT (Mashqlar)

## 6. SAVOLLAR VA JAVOBLAR

**1. Formaning eng muhim hodisasi (event) qaysi?**
\`submit\` event. U foydalanuvchi formani yubormoqchi bo'lganda (Enter bosganda yoki Submit tugmasini bosganda) ishga tushadi.

**2. preventDefault() nima uchun kerak?**
Brauzer formani yuborib sahifani qayta yuklashini to'xtatish va ma'lumotlarni JavaScript yordamida qayta ishlash uchun.

**3. Input'dan olingan qiymat har doim qaysi ma'lumot turida bo'ladi?**
Doimo \`string\` (matn) turida bo'ladi.

**4. Input qiymatini songa o'tkazishning qanday usullari bor?**
\`Number(input.value)\`, \`parseInt(input.value)\` yoki \`+input.value\`.

**5. Checkbox tanlanganligini qanday tekshiramiz?**
Elementning \`checked\` xususiyati orqali (agar tanlangan bo'lsa \`true\`, aks holda \`false\`).

**6. Formadagi barcha inputlarni dastlabki holatga keltirish uchun qaysi metod chaqiriladi?**
\`form.reset()\` metodi.

**7. FormData nima?**
Formadagi barcha ma'lumotlarni (input name va qiymatlarini) kalit-qiymat ko'rinishida avtomatik yig'ib beruvchi maxsus brauzer API'si.

**8. input event va change event farqi nima?**
\`input\` hodisasi foydalanuvchi har safar harf yozganda yoki o'chirganda real vaqtda ishlaydi. \`change\` esa elementdan fokus yo'qolganda va qiymat o'zgarganda ishga tushadi.

**9. HTML5 required atributi bo'la turib, nega baribir JS validatsiya kerak?**
HTML5 validatsiyasini foydalanuvchi devtools orqali oson o'chirib qo'yishi mumkin. JS validatsiyasi esa ishonchliroq va murakkab logikalarni (masalan, parollar mosligini tekshirish) bajarishga qodir.

**10. Textarea elementining qiymati qanday olinadi?**
Xuddi oddiy inputlar kabi \`textarea.value\` xususiyati orqali.

**11. Radio button'lardan tanlanganini qanday aniqlash mumkin?**
CSS selektor yordamida: \`document.querySelector('input[name="gender"]:checked')\` orqali joriy tanlangan radio tugmani topish mumkin.

**12. Formani tugma bosmasdan JS orqali qanday submit qilish mumkin?**
\`form.submit()\` metodini to'g'ridan-to'g'ri chaqirish orqali.`,
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
    },
    {
      id: 5,
      title: "Formani tozalash",
      instruction: "Formadagi barcha maydonlarni tozalash uchun uning reset() metodini chaqiring.",
      startingCode: "const myForm = { reset: () => myForm.cleaned = true };\n// Bu yerda reset() metodini chaqiring\n",
      hint: "myForm.reset();",
      test: "if (myForm.cleaned) return null; return 'reset() metodini chaqiring';"
    },
    {
      id: 6,
      title: "Checkbox holatini aniqlash",
      instruction: "'agree' checkbox elementining tanlangan (checked) holatini 'isAgree' o'zgaruvchisiga saqlang.",
      startingCode: "const agree = { checked: true };\n// Bu yerga yozing\n",
      hint: "const isAgree = agree.checked;",
      test: "if (typeof isAgree !== 'undefined' && isAgree === true) return null; return 'isAgree o\\'zgaruvchisiga checked qiymatini saqlang';"
    },
    {
      id: 7,
      title: "FormData yordamida qiymat olish",
      instruction: "'formData' obyektidan 'username' maydonini olish uchun get() metodini chaqiring va 'nameVal' o'zgaruvchisiga saqlang.",
      startingCode: "const formData = { get: (name) => name === 'username' ? 'Farhod' : null };\n// Bu yerga yozing\n",
      hint: "const nameVal = formData.get('username');",
      test: "if (typeof nameVal !== 'undefined' && nameVal === 'Farhod') return null; return 'get() metodi orqali username\\'ni oling';"
    },
    {
      id: 8,
      title: "Input sonlarini validatsiya qilish",
      instruction: "'ageInput' qiymatini songa o'tkazing va agar u 18 dan kichik bo'lsa konsolga 'Kichik' deb chiqaring.",
      startingCode: "const ageInput = { value: '16' };\n// Bu yerga yozing\n",
      hint: "if (Number(ageInput.value) < 18) console.log('Kichik');",
      test: "if (logs.includes('Kichik')) return null; return 'Yosh 18 dan kichik bo\\'lishini tekshiring';"
    },
    {
      id: 9,
      title: "Input qiymatini o'rnatish",
      instruction: "'emailInput' elementining qiymatini (value) 'test@test.com' ga o'rnating.",
      startingCode: "const emailInput = { value: '' };\n// Bu yerga yozing\n",
      hint: "emailInput.value = 'test@test.com';",
      test: "if (emailInput.value === 'test@test.com') return null; return 'emailInput qiymatini to\\'g\\'ri o\\'rnating';"
    },
    {
      id: 10,
      title: "Checkbox o'zgarishini tinglash",
      instruction: "'checkbox' elementining qiymati o'zgarganda (change), uning tanlangan (checked) holatini konsolga chiqaring.",
      startingCode: "const checkbox = { checked: true, addEventListener: (type, cb) => checkbox.onchange = cb };\n// Bu yerga yozing\n",
      hint: "checkbox.addEventListener('change', (e) => console.log(e.target.checked));",
      test: "if (typeof checkbox.onchange === 'function') { checkbox.onchange({ target: checkbox }); if (logs.includes('true')) return null; } return 'change eventini to\\'g\\'ri boshqaring';"
    },
    {
      id: 11,
      title: "FormData qiymat qo'shish",
      instruction: "'formData' obyektiga append() metodi orqali 'role' kalitiga 'admin' qiymatini qo'shing.",
      startingCode: "const formData = { append: (k, v) => { formData[k] = v; } };\n// Bu yerga yozing\n",
      hint: "formData.append('role', 'admin');",
      test: "if (formData.role === 'admin') return null; return 'append() orqali role: admin qo\\'shing';"
    },
    {
      id: 12,
      title: "Kompleks validatsiya funksiyasi",
      instruction: "'validateForm(user, pass)' funksiyasini yozing. Agar user.value bo'sh bo'lsa yoki pass.value uzunligi 6 dan kam bo'lsa false, aks holda true qaytarsin.",
      startingCode: "// Funksiyani yozing\n",
      hint: "function validateForm(user, pass) { return user.value !== '' && pass.value.length >= 6; }",
      test: "if (typeof validateForm === 'function' && validateForm({ value: '' }, { value: '123456' }) === false && validateForm({ value: 'admin' }, { value: '123' }) === false && validateForm({ value: 'admin' }, { value: '123456' }) === true) return null; return 'Validatsiya shartlarini to\\'g\\'ri bajaring';"
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
    },
    {
      id: 6,
      question: "HTML5 dagi qaysi atribut input maydoni majburiy to'ldirilishi kerakligini bildiradi?",
      options: [
        "`validate=\"true\"`",
        "`required`",
        "`mandatory`",
        "`strict`"
      ],
      correctAnswer: 1,
      explanation: "`required` atributi HTML5 da brauzer darajasida element bo'sh qoldirilishini taqiqlaydi."
    },
    {
      id: 7,
      question: "`<select>` drop-down elementida foydalanuvchi tanlagan variant (option) qiymatini qanday olish mumkin?",
      options: [
        "Select elementining `.value` xususiyati orqali",
        "Har bir option elementining `.checked` xususiyati orqali",
        "Select elementining `.getText()` metodi orqali",
        "Select elementining `.selectedOption` xususiyati orqali"
      ],
      correctAnswer: 0,
      explanation: "`<select>` elementining `.value` xususiyati joriy tanlangan `<option>` elementining `value` atributi qiymatini qaytaradi."
    },
    {
      id: 8,
      question: "`new FormData(myForm)` konstruktorida `myForm` parametridan nima talab etiladi?",
      options: [
        "HTMLFormElement (DOM-dan olingan haqiqiy form elementi)",
        "Oddiy JavaScript obyekti",
        "Formadagi faqat bitta input elementi",
        "Input elementlari ro'yxati (NodeList)"
      ],
      correctAnswer: 0,
      explanation: "`FormData` konstruktori parametr sifatida aynan HTML form elementini qabul qiladi va uning ichidagi barcha name'ga ega maydonlarni yig'ib beradi."
    },
    {
      id: 9,
      question: "Foydalanuvchi input maydoniga har bir belgini yozib borayotganda real vaqtda ishlaydigan hodisa qaysi?",
      options: [
        "`change`",
        "`input`",
        "`blur`",
        "`focus`"
      ],
      correctAnswer: 1,
      explanation: "`input` hodisasi qiymat har safar o'zgarganda (har bir harf yozilganda yoki o'chirilganda) real vaqtda ishga tushadi."
    },
    {
      id: 10,
      question: "Formadagi barcha maydonlarni boshlang'ich (default) qiymatlariga qaytarish va tozalash uchun qaysi metod ishlatiladi?",
      options: [
        "`form.clear()`",
        "`form.clean()`",
        "`form.reset()`",
        "`form.empty()`"
      ],
      correctAnswer: 2,
      explanation: "`form.reset()` metodi formadagi barcha input, select va checkbox maydonlarini boshlang'ich qiymatlariga qaytaradi."
    },
    {
      id: 11,
      question: "Radio button guruhidan tanlangan elementni CSS selector orqali qanday topish mumkin?",
      options: [
        "`document.querySelector('input[type=\"radio\"]:checked')`",
        "`document.querySelector('input[type=\"radio\"].selected')`",
        "`document.querySelector('input[type=\"radio\"]:active')`",
        "`document.querySelector('input[type=\"radio\"]:value')`"
      ],
      correctAnswer: 0,
      explanation: "`:checked` pseudo-klassi tanlangan radio yoki checkbox elementlarini topish uchun qo'llaniladi."
    },
    {
      id: 12,
      question: "`<textarea>` elementi ichidagi foydalanuvchi yozgan matnni olish uchun qaysi xususiyatdan foydalaniladi?",
      options: [
        "`textarea.textContent`",
        "`textarea.innerHTML`",
        "`textarea.value`",
        "`textarea.innerText`"
      ],
      correctAnswer: 2,
      explanation: "`<textarea>` xuddi oddiy `<input>` kabi form maydoni hisoblanadi. Shuning uchun uning ichidagi joriy matnni olish yoki o'zgartirish uchun `.value` xususiyati ishlatiladi."
    }
  ]
};