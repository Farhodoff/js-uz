export const forms = {
  id: "forms",
  title: "Formalar bilan Ishlash, Validatsiya va FormData API (Forms)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

### Formalar va Validatsiya nima?
Tasavvur qiling, siz **xalqaro pasport olish uchun elchixonaga ariza topshiryapsiz**:
* **Ariza anketasi:** Bu HTML formasi (\\\`<form>\\\`).
* **Input katakchalari:** Ism, yosh yoki rasm yuklash joylari.
* **Hujjat topshirish:** Submit tugmasi.
* **Tekshiruvchi xodim (JavaScript):** Siz arizani topshirgan zahotingiz u anketani ko'zdan kechiradi. Agar yoshingizni yozmagan bo'lsangiz yoki imzo qo'yishni unutgan bo'lsangiz, u arizani qabul qilmaydi va xatolarni ko'rsatib qaytarib beradi. Siz hamma narsani to'g'ri to'ldirmaguningizcha, anketangiz elchixonaga (serverga) yuborilmaydi.

Bu jarayon mijoz (client) va xizmat ko'rsatuvchi (server) o'rtasida noto'g'ri ma'lumotlar almashinuvining oldini oladi.

---

## 2. 🧠 Deep Dive: Under the Hood, Memory, V8 Engine va Performance

Forma ishlashi va validatsiyasi brauzerda qanday ishlaydi?

### 1. Event Loop va Submit Hodisasi
Forma yuborilganda brauzer standart (default) xatti-harakatini bajarishga urinadi: sahifani yangilash va ma'lumotlarni serverga yuborish.
Buni to'xtatish uchun \\\`event.preventDefault()\\\` ishlatiladi. Bu funksiya C++ darajasida brauzerning ichki ishlov berish ssenariysini bloklaydi va JavaScript Event Loop orqali boshqaruvni V8 dvigateliga qaytaradi.

### 2. FormData API xotira boshqaruvi
\\\`FormData\\\` klassi C++ dagi maxsus xotira tuzilmasidir. JavaScript uni chaqirganda (\\\`new FormData(form)\\\`), brauzer formadagi barcha input elementlarini iteratsiya qiladi va ularni "key-value" juftligi sifatida C++ xotirasida (heap) saqlaydi.
Bu juda optimallashtirilgan bo'lib, katta fayllarni yuborishda (masalan, \\\`File\\\` yoki \\\`Blob\\\` obyekti) faylning o'zini to'liq xotiraga yuklamasdan stream ko'rinishida serverga uzatishga imkon beradi.

### 3. Performance: Debouncing validatsiyasi
Agar siz real-vaqt validatsiyasini (masalan, har bir harf kiritilganda parolni tekshirish) \\\`input\\\` event'i orqali qilsangiz, V8 engine har bir millisoniyada funksiyani ishga tushirishga majbur bo'ladi. Bu "jank" (qotib qolish) ga olib keladi.
Buning oldini olish uchun "Debouncing" texnikasi qo'llaniladi. V8 faqat belgilangan vaqt (masalan, 300ms) o'tgandan keyin oxirgi call'ni bajaradi, Call Stack esa bo'sh va qulay turadi.

\\\`\\\`\\\`javascript
// Debounce funksiyasiga misol
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Noaniq holatlar)
1. **\\\`type="number"\\\` bo'lgan inputlarning matn qaytarishi:**
   Garchi HTML input \\\`type="number"\\\` bo'lsa-da, uning \\\`.value\\\` xususiyati har doim \\\`String\\\` qaytaradi. Uni matematik hisoblashdan oldin \\\`Number(input.value)\\\` ga o'girish shart, aks holda "1" + "1" = "11" bo'lib qoladi.
2. **Checkbox va Radio tugmalarining qiymatlari:**
   Checkbox'ning qiymatini tekshirishda \\\`value\\\` emas, balki \\\`.checked\\\` xususiyati ishlatilishi kerak.
3. **Trim qilinmagan matnlar:**
   Foydalanuvchi "   " (bo'shliqlar) kiritganda, oddiy validatsiyadan o'tib ketadi. Har doim \\\`.trim()\\\` ishlatish kerak.

### Senior Interview Questions
1. **Savol:** Nima uchun FormData obyektini konsolga chiqarish bo'sh obyekt ko'rsatadi va qanday qilib uning ichidagi qiymatlarni ko'rish mumkin?
   **Javob:** FormData obyekti qiymatlarni o'z ichida yashirin iteratorlar sifatida saqlaydi. Uni ko'rish uchun \\\`formData.entries()\\\` yoki \\\`Object.fromEntries(formData.entries())\\\` dan foydalanish kerak.
2. **Savol:** Client-side validatsiya 100% xavfsiz emas deb aytiladi. Nima uchun va qanday himoyalanish kerak?
   **Javob:** Chunki foydalanuvchi DevTools orqali HTML atributlarni o'zgartirishi, JS ni o'chirib qo'yishi yoki to'g'ridan-to'g'ri API yordamida serverga so'rov yuborishi mumkin. Shuning uchun Backend validatsiyasi doim majburiydir. JS faqat UX (User Experience) ni yaxshilash uchun qilinadi.

---

## 4. 📊 Arxitektura va Vizualizatsiya (Mermaid)

\\\`\\\`\\\`mermaid
graph TD
    A[Foydalanuvchi Formani To'ldiradi] -->|Submit tugmasini bosadi| B(submit event trigger bo'ladi)
    B --> C{preventDefault chaqirildimi?}
    C -- Yoq --> D[Sahifa yangilanadi va ozgaruvchilar ochadi]
    C -- Ha --> E[JavaScript validatsiyani boshlaydi]
    E --> F{Barcha malumot togrimi?}
    F -- Yoq --> G[Xatoliklarni Ekranda korsatish]
    G --> A
    F -- Ha --> H[FormData orqali yigish va Fetch bilan serverga yuborish]
    H --> I[Backend server validatsiya qiladi va javob qaytaradi]
\\\`\\\`\\\`
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
      instruction: "Agar 'msg' inputining qiymati bo'sh bo'lsa 'Bosh' so'zini konsolga chiqaring.",
      startingCode: "const msg = { value: '' };\n// Bu yerga yozing\n",
      hint: "if (msg.value === '') console.log('Bosh');",
      test: "if (logs.includes('Bosh')) return null; return 'Xato tekshiruv';"
    },
    {
      id: 4,
      title: "Parol uzunligi",
      instruction: "Parol (pass.value) 8 tadan kam bo'lsa 'Qisqa' so'zini chiqaring.",
      startingCode: "const pass = { value: '123' };\n// Bu yerga yozing\n",
      hint: "if (pass.value.length < 8) console.log('Qisqa');",
      test: "if (logs.includes('Qisqa')) return null; return 'Uzunlikni tekshiring';"
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
      test: "if (typeof isAgree !== 'undefined' && isAgree === true) return null; return 'isAgree ozgaruvchisiga checked qiymatini saqlang';"
    },
    {
      id: 7,
      title: "FormData yordamida qiymat olish",
      instruction: "'formData' obyektidan 'username' maydonini olish uchun get() metodini chaqiring va 'nameVal' o'zgaruvchisiga saqlang.",
      startingCode: "const formData = { get: (name) => name === 'username' ? 'Farhod' : null };\n// Bu yerga yozing\n",
      hint: "const nameVal = formData.get('username');",
      test: "if (typeof nameVal !== 'undefined' && nameVal === 'Farhod') return null; return 'get() metodi orqali username ni oling';"
    },
    {
      id: 8,
      title: "Input sonlarini validatsiya qilish",
      instruction: "'ageInput' qiymatini songa o'tkazing va agar u 18 dan kichik bo'lsa konsolga 'Kichik' deb chiqaring.",
      startingCode: "const ageInput = { value: '16' };\n// Bu yerga yozing\n",
      hint: "if (Number(ageInput.value) < 18) console.log('Kichik');",
      test: "if (logs.includes('Kichik')) return null; return 'Yosh 18 dan kichik bolishini tekshiring';"
    },
    {
      id: 9,
      title: "FormData qiymat qo'shish",
      instruction: "'formData' obyektiga append() metodi orqali 'role' kalitiga 'admin' qiymatini qo'shing.",
      startingCode: "const formData = { append: (k, v) => { formData[k] = v; } };\n// Bu yerga yozing\n",
      hint: "formData.append('role', 'admin');",
      test: "if (formData.role === 'admin') return null; return 'append() orqali role: admin qoshing';"
    },
    {
      id: 10,
      title: "Kompleks validatsiya funksiyasi",
      instruction: "'validateForm(user, pass)' funksiyasini yozing. Agar user.value bo'sh bo'lsa yoki pass.value uzunligi 6 dan kam bo'lsa false, aks holda true qaytarsin.",
      startingCode: "// Funksiyani yozing\n",
      hint: "function validateForm(user, pass) { return user.value !== '' && pass.value.length >= 6; }",
      test: "if (typeof validateForm === 'function' && validateForm({ value: '' }, { value: '123456' }) === false && validateForm({ value: 'admin' }, { value: '123' }) === false && validateForm({ value: 'admin' }, { value: '123456' }) === true) return null; return 'Validatsiya shartlarini togri bajaring';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Forma yuborilganda (submit event yuz berganda) standart sahifa yangilanishining oldi qanday olinadi?",
      options: [
        "event.stopPropagation() orqali",
        "event.preventDefault() orqali",
        "form.reset() orqali",
        "button.remove() orqali"
      ],
      correctAnswer: 1,
      explanation: "event.preventDefault() brauzerning submit bo'lganda sahifani serverga yuborib qayta yuklash bo'yicha standart xatti-harakatini to'xtatadi."
    },
    {
      id: 2,
      question: "Hatto type=\"number\" bo'lgan input elementining qiymati (value) JavaScript-da qaysi turda olinadi?",
      options: [
        "number",
        "string",
        "boolean",
        "object"
      ],
      correctAnswer: 1,
      explanation: "Input elementlaridan olinadigan .value xossasi har doim string (matn) qaytaradi. Undan son sifatida foydalanish uchun uni Number() yordamida o'zgartirib olish kerak."
    },
    {
      id: 3,
      question: "Checkbox elementining tanlangan (belgilangan) yoki belgilanmaganligini qaysi xususiyat orqali tekshiramiz?",
      options: [
        "value (agar u 'on' bo'lsa)",
        "checked (true yoki false)",
        "selected (true yoki false)",
        "active"
      ],
      correctAnswer: 1,
      explanation: "Checkbox elementlarining belgilanganlik holati true yoki false qaytaruvchi .checked xossasida saqlanadi."
    },
    {
      id: 4,
      question: "FormData API ning asosiy afzalligi nimada?",
      options: [
        "Formadagi barcha input elementlarini o'chirib yuboradi",
        "Formadagi name atributiga ega bo'lgan barcha maydonlar qiymatlarini avtomatik ravishda yig'ib beradi",
        "Formani CSS yordamida chiroyli qiladi",
        "Ma'lumotlar bazasini yangilaydi"
      ],
      correctAnswer: 1,
      explanation: "new FormData(form) formadagi barcha elementlarni avtomatik dynamic yig'ib beradi, bu esa ularni bitta-bitta qo'lda o'qib chiqish ehtiyojini yo'qotadi."
    },
    {
      id: 5,
      question: "Foydalanuvchi klaviaturadan input maydoniga har bir belgini yozayotgan lahzada trigger bo'ladigan event qaysi?",
      options: [
        "change",
        "input",
        "blur",
        "focus"
      ],
      correctAnswer: 1,
      explanation: "input hodisasi qiymat har safar o'zgarganda real vaqtda trigger bo'ladi. change esa elementdan fokus yo'qolgandan keyin ishlaydi."
    },
    {
      id: 6,
      question: "HTML5 required atributi bo'la turib, nima uchun JavaScript orqali ham validatsiya yoziladi?",
      options: [
        "JS validatsiya required-ga qaraganda tezroq ishlaydi",
        "Required atributini devtools orqali o'chirib yuborish oson, JS validatsiyasi esa murakkab logikalarni tekshira oladi",
        "Required atributi mobil telefonlarda ishlamaydi",
        "Required faqat CSS-ni o'zgartiradi xolos"
      ],
      correctAnswer: 1,
      explanation: "HTML5 required xavfsizlikni kafolatlamaydi. JS validatsiyasi ishonchli tekshiruvlar uchun foydalidir."
    },
    {
      id: 7,
      question: "Katta shakldagi dynamic username check so'rovlarida input hodisasini qanday optimallashtirish kerak?",
      options: [
        "Hech qanday optimallashtirish kerak emas",
        "Debouncing (kechiktirib chaqirish) yordamida so'rovlar sonini cheklash",
        "Faqat change event ishlatish",
        "Inputni required qilish"
      ],
      correctAnswer: 1,
      explanation: "Debouncing foydalanuvchi yozishdan to'xtagachgina so'rov yuborib, server yuklamasini kamaytiradi."
    },
    {
      id: 8,
      question: "FormData-dan olingan ma'lumotlarni qanday qilib oddiy JSON obyektiga o'tkazish mumkin?",
      options: [
        "JSON.stringify(formData)",
        "Object.fromEntries(formData.entries())",
        "formData.toJSON()",
        "Array.from(formData)"
      ],
      correctAnswer: 1,
      explanation: "Object.fromEntries(formData.entries()) entries iteratorini toza JavaScript obyektiga o'giradi."
    },
    {
      id: 9,
      question: "Formadagi barcha inputlarni va tanlovlarni tozalab, ularni dastlabki (default) holatiga keltiruvchi metod qaysi?",
      options: [
        "form.clear()",
        "form.reset()",
        "form.empty()",
        "form.clean()"
      ],
      correctAnswer: 1,
      explanation: "form.reset() formadagi barcha maydonlarni boshlang'ich qiymatlariga qaytaradi."
    },
    {
      id: 10,
      question: "Tanlangan <option> qiymatini <select> elementidan JavaScript-da qanday olamiz?",
      options: [
        "select.value",
        "select.checked",
        "select.textContent",
        "select.options[0].checked"
      ],
      correctAnswer: 0,
      explanation: "select elementining .value xossasi joriy tanlangan option qiymatini beradi."
    },
    {
      id: 11,
      question: "Foydalanuvchi tanlagan faylni (file upload) JS orqali qanday o'qiymiz?",
      options: [
        "fileInput.value",
        "fileInput.files[0]",
        "fileInput.src",
        "fileInput.textContent"
      ],
      correctAnswer: 1,
      explanation: "Fayl input maydonlarida .files xossasi yuklangan barcha fayllar ro'yxatini saqlaydi."
    },
    {
      id: 12,
      question: "<textarea> elementi ichidagi matnni dynamic o'zgartirish yoki olish uchun qaysi xususiyat ishlatiladi?",
      options: [
        "textarea.textContent",
        "textarea.innerHTML",
        "textarea.value",
        "textarea.innerText"
      ],
      correctAnswer: 2,
      explanation: "Textarea ham inputlar kabi form maydoni hisoblangani uchun, uning ichidagi matn bilan ishlashda .value xususiyati qo'llaniladi."
    }
  ]
};
