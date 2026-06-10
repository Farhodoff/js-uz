export const forms = {
  id: "forms",
  title: "Formalar bilan Ishlash, Validatsiya va FormData API (Forms)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Formalar va Validatsiya nima?
* **Formalar (Forms)** — bu veb-sahifada foydalanuvchidan ma'lumot (matn, raqam, fayl, tanlovlar) yig'ishning va ularni tizimga (serverga) yuborishning asosiy interfeysidir.
* **Validatsiya (Validation)** — foydalanuvchi kiritgan ma'lumotlar to'g'riligini (masalan: email formatidami, parol yetarlicha uzunmi, majburiy katakchalar to'ldirilganmi) serverga yuborishdan oldin tekshirish jarayonidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **xalqaro pasport olish uchun ariza topshiryapsiz**:
* **Ariza anketasi:** HTML formasi (\`<form>\`).
* **Input katakchalari:** Ism, yosh yoki rasm yuklash joylari.
* **Hujjat topshirish:** Submit tugmasi.
* **Tekshiruvchi xodim (JavaScript):** Siz arizani topshirgan zahotingiz u anketani ko'zdan kechiradi. Agar yoshingizni yozmagan bo'lsangiz yoki imzo qo'yishni unutgan bo'lsangiz, u arizani qabul qilmaydi va xatolarni ko'rsatib qaytarib beradi. Siz hamma narsani to'g'ri to'ldirmaguningizcha, anketangiz elchixonaga (serverga) yuborilmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Shaklni Yuborish va preventDefault)
Forma yuborilganda sahifaning yangilanib ketishini to'xtatish va input qiymatini olish:
\`\`\`javascript
const myForm = document.querySelector('#contact-form');

myForm.addEventListener('submit', (event) => {
  // preventDefault() sahifa yangilanishini to'xtatadi
  event.preventDefault();
  
  const username = myForm.querySelector('#username').value;
  console.log('Username kiritildi:', username);
});
\`\`\`

### 2. Intermediate Example (Checkbox va Radio dynamic holatlari)
Tanlov maydonlari bilan ishlashda \`.checked\` xossasidan foydalanish:
\`\`\`javascript
const agreeCheckbox = document.querySelector('#agree-terms');
const registerBtn = document.querySelector('#register-btn');

agreeCheckbox.addEventListener('change', (event) => {
  // checked true yoki false qiymat qaytaradi
  const isChecked = event.target.checked;
  
  // Agar shartga rozilik berilmagan bo'lsa, tugmani bloklab qo'yamiz (disabled)
  registerBtn.disabled = !isChecked;
});
\`\`\`

### 3. Advanced Example (FormData API va dynamic yig'ish)
Bir nechta inputlarga ega formadagi ma'lumotlarni oson va avtomatlashtirilgan tarzda yig'ib olish:
\`\`\`javascript
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // FormData formadagi name atributiga ega barcha qiymatlarni yig'adi
  const formData = new FormData(signupForm);
  
  // get() orqali aniq kalit qiymatini olish
  const email = formData.get('email');
  const role = formData.get('role');
  
  console.log(\`Email: \${email}, Role: \${role}\`);
  
  // Barcha ma'lumotlarni obyekt ko'rinishiga o'tkazish
  const data = Object.fromEntries(formData.entries());
  console.log('JSON uchun tayyor obyekt:', data);
});
\`\`\`

### 4. Production Example (Toliq Client-side Validatsiya)
Real vaqtda xatoliklarni ko'rsatuvchi dynamic forma validatsiyasi:
\`\`\`javascript
const form = document.querySelector('#val-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const errorEl = form.querySelector('.error-msg');
  
  let errors = [];
  
  // Email formatini regex orqali tekshirish
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    errors.push('Iltimos, to\\'g\\'ri email kiriting.');
  }
  
  // Parol uzunligi
  if (passwordInput.value.length < 8) {
    errors.push('Parol kamida 8 ta belgidan iborat bo\\'lishi shart.');
  }
  
  if (errors.length > 0) {
    errorEl.textContent = errors.join(' ');
    errorEl.style.color = 'red';
  } else {
    errorEl.textContent = 'Muvaffaqiyatli o\\'tdi!';
    errorEl.style.color = 'green';
    // Serverga yuborish mantiqi
    form.reset(); // Formani tozalash
  }
});
\`\`\`

### 5. Enterprise Example (Asinxron File & Data Upload)
Forma ma'lumotlari va tanlangan faylni dynamic tarzda serverga AJAX (Fetch) orqali yuborish:
\`\`\`javascript
const profileForm = document.querySelector('#profile-form');

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(profileForm);
  
  try {
    const response = await fetch('https://api.example.com/profile', {
      method: 'POST',
      // Multipart/form-data yuborishda body-ga to'g'ridan-to'g'ri formData beriladi. 
      // Headers-ga 'Content-Type' yozish SHART EMAS, brauzer o'zi boundary bilan avtomat yozadi.
      body: formData
    });
    
    if (response.ok) {
      alert('Profil muvaffaqiyatli yangilandi!');
    } else {
      throw new Error('Serverda xatolik yuz berdi');
    }
  } catch (err) {
    console.error('Xatolik:', err.message);
  }
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Foydalanuvchi tajribasi (UX):** Foydalanuvchi noto'g'ri yozgan ma'lumotlarni sahifa qayta yuklanmasdan oldin ko'rsatib beradi. Bu esa ortiqcha tarmoq so'rovlarini (network requests) tejaydi.
* **Xavfsizlik (Security):** Client-side validatsiya yomon niyatli foydalanuvchilarning noto'g'ri formatdagi ma'lumotlarni yuborishini oldini oladi (Garchi server-side validatsiya ham majburiy bo'lsa-da).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`preventDefault\`ni chaqirishni unutish
#### Muammo:
Submit bo'lganda sahifa yangilanib, barcha JS o'zgaruvchilari o'chib ketadi.
#### To'g'ri usul:
\`event.preventDefault();\` yozish.

### 2. Input obyekti bilan uning qiymatini (value) adashtirib yuborish
#### Xato:
\`const username = document.querySelector("#user"); if (username === "") { ... }\` // username - bu DOM element!
#### To'g'ri usul:
\`if (username.value === "") { ... }\`

### 3. Checkbox va Radio qiymatlarini \`.value === "on"\` deb tekshirish
#### Xato:
\`if (agreeCheckbox.value === true)\` (Har doim dynamic string qaytishi mumkin).
#### To'g'ri usul:
\`if (agreeCheckbox.checked)\` orqali tekshirish.

### 4. \`type="number"\`li input qiymatini avtomatik Number deb o'ylash
#### Muammo:
Hatto raqamli input qiymati ham string bo'ladi, uni qo'shish amallari bajarilganda matn bo'lib birlashib ketadi.
#### To'g'ri usul:
\`Number(input.value)\` yoki \`parseInt(input.value)\` yordamida o'zgartirish.

### 5. \`FormData\` orqali ma'lumot olishda inputlarga \`name\` atributi berishni unutish
#### Muammo:
Agar inputda \`name\` bo'lmasa, \`FormData\` uni topa olmaydi va \`formData.get('myInput')\` undefined qaytaradi.
#### To'g'ri usul:
HTML-da \`<input name="email" />\` ko'rinishida yozish.

### 6. HTML5 \`required\` atributiga 100% ishonib qolish
#### Muammo:
Foydalanuvchi Chrome DevTools orqali elementdan \`required\`ni osongina o'chirib yuborishi mumkin.
#### To'g'ri yechim:
Har doim JavaScript orqali qo'shimcha validatsiya qilish (va albatta Backend serverda ham tekshirish).

### 7. Parollar mosligini (confirm password) tekshirmaslik
#### Muammo:
Foydalanuvchi 2 ta har xil parol kiritganda ham forma yuborilib ketaverishi.

### 8. Fayl yuklashda (file upload) dynamic input faylini massiv sifatida o'qimaslik
#### Xato:
\`fileInput.value\` faqat fayl yo'li stringini beradi, faylning o'zini (Blob) emas.
#### To'g'ri usul:
\`fileInput.files[0]\` orqali birinchi yuklangan faylni o'qish.

### 9. dynamic input maydonlaridan bo'shliqlarni tozalashni unutish (trim)
#### Muammo:
Foydalanuvchi faqat bo'shliqlar (spaces) kiritganda validatsiya o'tib ketishi.
#### To'g'ri usul:
\`input.value.trim() === ""\` ko'rinishida bo'shliqlardan tozalab tekshirish.

### 10. \`FormData\` bilan fayl yuborishda \`Content-Type\`ni qo'lda \`multipart/form-data\` deb belgilash
#### Muammo:
Headers-da Content-Type-ni qo'lda yozish brauzerning avtomatik yaratadigan "boundary" (fayllarni ajratuvchi maxsus kod) xossasini buzadi va server fayllarni qabul qilmaydi.
#### To'g'ri yechim:
Headers-da Content-Type-ni yozmaslik, brauzerning o'ziga topshirish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Formadagi \`submit\` hodisasi qachon ishga tushadi?
   * **Javob:** Foydalanuvchi formadagi submit tugmasini bosganda yoki input ichida Enter tugmasini bosganda.

2. **Savol:** Input elementidan foydalanuvchi yozgan qiymatni qanday o'qiymiz?
   * **Javob:** Elementning \`.value\` xususiyati (property) orqali.

3. **Savol:** Checkbox tanlanganligini qanday aniqlash mumkin?
   * **Javob:** Elementning \`.checked\` xossasi orqali (tanlangan bo'lsa true, aks holda false qaytadi).

4. **Savol:** Formadagi barcha ma'lumotlarni oson tozalash (dastlabki holatiga keltirish) metodi qaysi?
   * **Javob:** Form elementining \`.reset()\` metodi orqali.

### Middle (5–8)
5. **Savol:** \`FormData\` API nima va u qachon ishlatiladi?
   * **Javob:** Formadagi barcha input elementlari qiymatlarini (\`name\` atributlari bo'yicha) dynamic ravishda kalit-qiymat shaklida yig'ib beruvchi brauzer klassi. U dynamic fayl va ma'lumotlarni fetch orqali yuborishda keng qo'llaniladi.

6. **Savol:** input hodisasi (input event) va change hodisasi (change event) o'rtasidagi mantiqiy farq nima?
   * **Javob:** \`input\` hodisasi foydalanuvchi har bir harfni kiritganda real-vaqtda ishlaydi. \`change\` esa qiymat o'zgartirilib, elementdan fokus yo'qolgandagina (blur bo'lganda) trigger bo'ladi.

7. **Savol:** dynamic input qiymatlaridan bo'shliqlarni tozalash nega muhim va u qanday bajariladi?
   * **Javob:** Foydalanuvchi faqat probellar yozib validatsiyadan o'tib ketmasligi uchun. Buning uchun stringning \`.trim()\` metodidan foydalaniladi (masalan: \`input.value.trim()\`).

8. **Savol:** Foydalanuvchi tanlagan faylni (File upload) JS orqali qanday o'qiymiz?
   * **Javob:** Fayl input elementining \`.files\` (FileList) massivsimon obyekti orqali. Masalan, birinchi tanlangan faylni olish uchun: \`fileInput.files[0]\`.

### Senior (9–12)
9. **Savol:** FormData obyektini oddiy JSON formatiga qanday o'tkazamiz va bunda qaysi modern JS metodi yordam beradi?
   * **Javob:** \`Object.fromEntries(formData.entries())\` yordamida. Bu metod key-value formatidagi entries massivini toza JavaScript obyektiga o'tkazib beradi, so'ng uni \`JSON.stringify()\` qilish oson.

10. **Savol:** Fayl yuklashda (File upload) dynamic progress bar yaratish uchun \`XMLHttpRequest\` va \`fetch\` API farqi nimada?
    * **Javob:** \`fetch\` API-da fayl yuklash (upload progress) foizini aniqlash imkoni standart tarzda yo'q (ReadableStream faqat download uchun ishlaydi). Shuning uchun upload progress bar yaratishda \`xhr.upload.onprogress\` tinglovchisiga ega \`XMLHttpRequest\` ishlatish majburiydir.

11. **Savol:** Client-side validatsiya bo'la turib, nima uchun server-side (backend) validatsiya ham 100% majburiy hisoblanadi?
    * **Javob:** Chunki client-side validatsiyani foydalanuvchi brauzerda JS-ni o'chirib qo'yish, devtools orqali elementlarni tahrirlash yoki to'g'ridan-to'g'ri API-ga (Postman/cURL orqali) so'rov yuborish orqali osongina chetlab o'ta oladi. JS faqat UX-ni yaxshilaydi, xavfsizlik esa backendda hal bo'ladi.

12. **Savol:** Katta formalarda dynamic validatsiya bajarilganda performance (unumdorlik) muammolarini (masalan, har bir keyup-da og'ir regex ishlashi) qanday hal qilasiz?
    * **Javob:** Debouncing texnikasini qo'llash orqali. Foydalanuvchi yozishdan to'xtaganidan so'ng (masalan 300ms o'tgach) validatsiya funksiyasini ishga tushiramiz, bu esa CPU yuklamasini sezilarli kamaytiradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### AJAX orqali dynamic Xarid savatchasi buyurtma shaklini yuborish
Foydalanuvchi ism, telefon raqam va yetkazib berish manzilini yozadi. Hamma maydonlar to'g'ri bo'lsa, ma'lumotlar asinxron yuboriladi va forma tozalanadi.

#### Yechim (Asinxron yuborish va validatsiya):
\`\`\`javascript
const orderForm = document.querySelector('#checkout-form');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const phone = orderForm.querySelector('#phone').value.trim();
  const address = orderForm.querySelector('#address').value.trim();
  
  // Oddiy telefon validatsiyasi (FAQAT sonlar bo'lishi kerak)
  const phoneRegex = /^\\+?[0-9]{9,15}$/;
  
  if (!phoneRegex.test(phone) || address === '') {
    alert('Iltimos, telefon raqami va manzilni to\\'g\\'ri kiriting.');
    return;
  }
  
  const data = { phone, address };
  
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      alert('Buyurtmangiz qabul qilindi!');
      orderForm.reset();
    }
  } catch (error) {
    console.error('So\\'rov yuborishda xato:', error);
  }
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Form Input Debouncing:** Autocomplete yoki dynamic username checking so'rovlarida input hodisasini debouncing qilish performance uchun o'ta muhimdir.

---

## 10. 📌 Cheat Sheet

| Atribut / Metod | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **value** | \`input.value\` | Maydon qiymatini o'qiydi/yozadi | Doimo string qaytaradi |
| **checked** | \`checkbox.checked\` | Tanlanganlik holatini o'qiydi | true yoki false |
| **submit** | \`form.addEventListener('submit', cb)\`| Yuborilishni eshitadi | preventDefault() shart |
| **reset()** | \`form.reset()\` | Formani tozalaydi | Dastlabki holatga qaytadi |
| **FormData** | \`new FormData(form)\` | Barcha inputlarni to'playdi | Inputlarda name bo'lishi shart |
| **files** | \`fileInput.files[0]\` | Tanlangan faylni o'qiydi | FileList qaytaradi |
| **trim()** | \`str.trim()\` | Bo'shliqlarni tozalaydi | Validatsiya uchun muhim |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sahifa yangilanishining oldini olish (preventDefault)",
    "instruction": "Forma yuborilganida (`submit` event yuz berganda) standart sahifa yangilanishini to'xtatuvchi `preventSubmit(event)` funksiyasini yozing.",
    "startingCode": "function preventSubmit(event) {\n  // Kodni yozing\n}",
    "hint": "event.preventDefault();",
    "test": "try { let prevented = false; const mockEvent = { preventDefault: () => prevented = true }; preventSubmit(mockEvent); if (!prevented) return 'preventDefault() chaqirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Input qiymatini tozalab olish (value & trim)",
    "instruction": "Berilgan `input` elementining qiymatini (`value`) olib, boshidagi va oxiridagi bo'shliqlarni olib tashlab (trim) qaytaruvchi `getCleanValue(input)` funksiyasini yozing.",
    "startingCode": "function getCleanValue(input) {\n  // Kodni yozing\n}",
    "hint": "return input.value.trim();",
    "test": "try { const mockInput = { value: '  Salom JS  ' }; const res = getCleanValue(mockInput); if (res !== 'Salom JS') return 'Bo\\'shliqlar tozalab qaytarilmadi: ' + res; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "FormData orqali Obyektga o'tkazish",
    "instruction": "Berilgan HTML `form` elementini qabul qilib, undagi ma'lumotlarni `FormData` yordamida yig'ib, toza JavaScript obyektiga (JSON yuborishga tayyor holga) o'tkazib qaytaruvchi `serializeForm(form)` funksiyasini yozing.",
    "startingCode": "function serializeForm(form) {\n  // Kodni yozing\n}",
    "hint": "const formData = new FormData(form); return Object.fromEntries(formData.entries());",
    "test": "try { const form = document.createElement('form'); const input = document.createElement('input'); input.name = 'role'; input.value = 'admin'; form.appendChild(input); const res = serializeForm(form); if (!res || res.role !== 'admin') return 'FormData to\\'g\\'ri obyektga o\\'tkazilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Forma yuborilganda (submit event yuz berganda) standart sahifa yangilanishining oldi qanday olinadi?",
    "options": [
      "event.stopPropagation() orqali",
      "event.preventDefault() orqali",
      "form.reset() orqali",
      "button.remove() orqali"
    ],
    "correctAnswer": 1,
    "explanation": "`event.preventDefault()` brauzerning submit bo'lganda sahifani serverga yuborib qayta yuklash bo'yicha standart xatti-harakatini to'xtatadi."
  },
  {
    "id": 2,
    "question": "Hatto `type=\"number\"` bo'lgan input elementining qiymati (`value`) JavaScript-da qaysi turda olinadi?",
    "options": [
      "number",
      "string",
      "boolean",
      "object"
    ],
    "correctAnswer": 1,
    "explanation": "Input elementlaridan olinadigan `.value` xossasi har doim string (matn) qiymat qaytaradi. Undan son sifatida foydalanish uchun uni Number() kabi metodlar yordamida o'zgartirib olish kerak."
  },
  {
    "id": 3,
    "question": "Checkbox elementining tanlangan (belgilangan) yoki belgilanmaganligini qaysi xususiyat orqali tekshiramiz?",
    "options": [
      "value (agar u 'on' bo'lsa)",
      "checked (true yoki false)",
      "selected (true yoki false)",
      "active"
    ],
    "correctAnswer": 1,
    "explanation": "Checkbox elementlarining belgilanganlik holati true yoki false qaytaruvchi `.checked` xossasida saqlanadi."
  },
  {
    "id": 4,
    "question": "FormData API ning asosiy afzalligi nimada?",
    "options": [
      "Formadagi barcha input elementlarini o'chirib yuboradi",
      "Formadagi `name` atributiga ega bo'lgan barcha maydonlar qiymatlarini avtomatik ravishda kalit-qiymat ko'rinishida yig'ib beradi",
      "Formani CSS yordamida chiroyli qiladi",
      "Ma'lumotlar bazasini yangilaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`new FormData(form)` formadagi barcha elementlarni avtomatik dynamic yig'ib beradi, bu esa inputlarni bitta-bitta qo'lda o'qib chiqish ehtiyojini yo'qotadi."
  },
  {
    "id": 5,
    "question": "Foydalanuvchi klaviaturadan input maydoniga har bir belgini yozayotgan lahzada trigger bo'ladigan event qaysi?",
    "options": [
      "change",
      "input",
      "blur",
      "focus"
    ],
    "correctAnswer": 1,
    "explanation": "`input` hodisasi qiymat har safar o'zgarganda (har bir harf yozilganda yoki o'chirilganda) real vaqtda trigger bo'ladi. `change` esa elementdan fokus yo'qolgandan keyin ishlaydi."
  },
  {
    "id": 6,
    "question": "HTML5 required atributi bo'la turib, nima uchun JavaScript orqali ham validatsiya yoziladi?",
    "options": [
      "JS validatsiya required-ga qaraganda tezroq ishlaydi",
      "Required atributini foydalanuvchi devtools orqali o'chirib yuborishi oson, JS validatsiyasi esa ishonchliroq va murakkab logikalarni tekshira oladi",
      "Required atributi mobil telefonlarda ishlamaydi",
      "Required faqat CSS-ni o'zgartiradi xolos"
    ],
    "correctAnswer": 1,
    "explanation": "HTML5 required xavfsizlikni kafolatlamaydi. JS validatsiyasi hamda backend validatsiyasi ishonchli tekshiruvlar uchun majburiydir."
  },
  {
    "id": 7,
    "question": "Katta shakldagi (form) dynamic username check yoki autocomplete so'rovlarida input hodisasini qanday optimallashtirish kerak?",
    "options": [
      "Hech qanday optimallashtirish kerak emas",
      "Debouncing (kechiktirib chaqirish) yordamida so'rovlar sonini cheklash",
      "Faqat `change` event ishlatish",
      "Inputni required qilish"
    ],
    "correctAnswer": 1,
    "explanation": "Debouncing foydalanuvchi yozishdan to'xtagachgina (masalan 300ms o'tgach) 1 marta so'rov yuborib, server va brauzer yuklamasini kamaytiradi."
  },
  {
    "id": 8,
    "question": "FormData-dan olingan ma'lumotlarni qanday qilib oddiy JSON obyektiga o'tkazish mumkin?",
    "options": [
      "JSON.stringify(formData)",
      "Object.fromEntries(formData.entries())",
      "formData.toJSON()",
      "Array.from(formData)"
    ],
    "correctAnswer": 1,
    "explanation": "`Object.fromEntries(formData.entries())` entries iteratorini toza JavaScript obyektiga o'giradi, keyin uni serverga JSON yuborish uchun stringify qilish mumkin."
  },
  {
    "id": 9,
    "question": "Formadagi barcha inputlarni va tanlovlarni tozalab, ularni dastlabki (default) holatiga keltiruvchi metod qaysi?",
    "options": [
      "form.clear()",
      "form.reset()",
      "form.empty()",
      "form.clean()"
    ],
    "correctAnswer": 1,
    "explanation": "`form.reset()` formadagi barcha maydonlarni boshlang'ich qiymatlariga qaytaradi."
  },
  {
    "id": 10,
    "question": "Tanlangan `<option>` qiymatini `<select>` elementidan JavaScript-da qanday olamiz?",
    "options": [
      "select.value",
      "select.checked",
      "select.textContent",
      "select.options[0].checked"
    ],
    "correctAnswer": 0,
    "explanation": "select elementining `.value` xossasi joriy tanlangan option qiymatini beradi."
  },
  {
    "id": 11,
    "question": "Foydalanuvchi tanlagan faylni (file upload) JS orqali qanday o'qiymiz?",
    "options": [
      "fileInput.value (to'liq fayl)",
      "fileInput.files[0] (birinchi yuklangan fayl obyekti)",
      "fileInput.src",
      "fileInput.textContent"
    ],
    "correctAnswer": 1,
    "explanation": "Fayl input maydonlarida `.files` xossasi yuklangan barcha fayllar ro'yxatini (FileList) saqlaydi."
  },
  {
    "id": 12,
    "question": "`<textarea>` elementi ichidagi matnni dynamic o'zgartirish yoki olish uchun qaysi xususiyat ishlatiladi?",
    "options": [
      "textarea.textContent",
      "textarea.innerHTML",
      "textarea.value",
      "textarea.innerText"
    ],
    "correctAnswer": 2,
    "explanation": "Textarea ham inputlar kabi form maydoni hisoblangani uchun, uning ichidagi matn bilan ishlashda `.value` xususiyati qo'llaniladi."
  }
]

};
