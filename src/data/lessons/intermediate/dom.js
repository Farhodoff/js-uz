export const domBasics = {
  id: "m4",
  title: "DOM bilan ishlash (Document Object Model)",
  level: "O'rta daraja",
  description: "JavaScript orqali HTML elementlarini boshqarish: tanlash, o'zgartirish va bezash.",
  theory: `## 1. NEGA kerak?
HTML o'zi "o'lik" (statik) narsa. JavaScript orqali biz o'sha matnlarni o'zgartirishimiz, tugmalar bosilganda ranglarni almashtirishimiz yoki yangi elementlar qo'shishimiz mumkin. DOM bo'lmasa, saytlar shunchaki zerikarli gazeta bo'lib qolardi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, HTML — bu uyning chizmasi (proyekti). Uy bitganidan keyin siz uning devorini bo'yashingiz, mebellarini o'zgartirishingiz mumkin. DOM — bu sizning uydagi narsalarni "ushlab" o'zgartira olish qobiliyatingizdir.

## 3. STRUKTURA

### A. Elementlarni tanlash
\`\`\`javascript
const sarlavha = document.getElementById("title"); // ID orqali
const tugma = document.querySelector(".btn"); // CSS selektor orqali (eng qulay)
const hammaListlar = document.querySelectorAll("li"); // Hammasini olish
\`\`\`

### B. Elementlarni o'zgartirish
\`\`\`javascript
const el = document.querySelector("h1");
el.textContent = "Yangi sarlavha"; // Matnni o'zgartirish (xavfsiz)
el.innerHTML = "<span>Yangi sarlavha</span>"; // HTML kontent yozish
el.style.color = "red"; // Rang berish
el.classList.add("active"); // Class qo'shish
\`\`\`

### C. NodeList va HTMLCollection farqi
- **HTMLCollection:** Jonli (live) to'plam. DOM o'zgarganda avtomatik yangilanadi. \`getElementsByClassName\` yoki \`getElementsByTagName\` qaytaradi.
- **NodeList:** Statik (non-live) bo'ladi. \`querySelectorAll\` qaytaradi. Unda \`.forEach()\` metodi mavjud bo'lib, massivga o'xshash operatsiyalarni bajarish oson.

### D. DOM bilan ishlashda bilish kerak bo'lgan asosiy ko'nikmalar rejasi (DOM Skills Roadmap)
DOM bilan professional darajada ishlash uchun quyidagi 8 ta asosiy yo'nalishni bilish va amalda qo'llay olish zarur:

1. **Elementlarni Tanlash (Selection):**
   - \`document.querySelector\` va \`document.querySelectorAll\` yordamida har qanday murakkab CSS selektorlar orqali elementlarni topish.
   - \`getElementById\` va boshqa an'anaviy metodlardan unumli foydalanish.

2. **Daraxt Bo'ylab Harakatlanish (Traversal):**
   - Ota elementga (\`parentElement\`), bolalarga (\`children\`, \`firstElementChild\`, \`lastElementChild\`) va qo'shnilarga (\`nextElementSibling\`, \`previousElementSibling\`) o'tishni bilish.

3. **Elementlarni Yaratish va Joylashtirish (Creation & Insertion):**
   - \`document.createElement\` orqali yangi tugunlar yaratish.
   - \`append\`, \`prepend\`, \`before\`, \`after\` va \`insertAdjacentHTML\` yordamida elementlarni DOM-ning kerakli qismiga xavfsiz va to'g'ri joylashtirish.

4. **Klasslar va Atributlarni Boshqarish (Classes & Attributes):**
   - \`classList\` metodlari (\`add\`, \`remove\`, \`toggle\`, \`contains\`) yordamida stillarni dinamik boshqarish.
   - HTML standart atributlari va custom ma'lumotlar (\`data-*\` atributlari va \`dataset\` obyekti) bilan ishlash.

5. **Tarkib va Stillarni O'zgartirish (Content & Styles):**
   - \`textContent\` (xavfsiz matn) va \`innerHTML\` (HTML render qilish) farqini bilish va to'g'ri qo'llash.
   - Inline stillarni (\`element.style\`) va CSS o'zgaruvchilarini (CSS Variables) boshqarish.

6. **Hodisalar bilan Ishlash (Event Handling):**
   - \`addEventListener\` va \`removeEventListener\` yordamida foydalanuvchi harakatlarini eshitish.
   - Event Bubbling, Event Capturing va Event Delegation (hodisalar delegatsiyasi) mexanizmlarini tushunish.

7. **Geometriya va O'lchamlar (Geometry & Coordinates):**
   - Elementning o'lchamlari (\`offsetWidth/Height\`, \`clientWidth/Height\`) va skrol holatini (\`scrollTop/Left\`) aniqlash.
   - Ekrandagi joylashuvini (\`getBoundingClientRect()\`) olish va boshqarish.

8. **Samaradorlik va Optimallashtirish (Performance & DocumentFragment):**
   - Ko'p miqdordagi elementlarni qo'shishda DOM Reflow/Repaint yuklamasini kamaytirish uchun \`DocumentFragment\`-dan foydalanish.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **querySelector bilan nuqtani unutish:** \`document.querySelector("my-class")\` ishlamaydi, \`".my-class"\` bo'lishi shart.
2. **Style nomlari:** JSda CSS xususiyatlari \`camelCase\` yoziladi: \`background-color\` emas, \`backgroundColor\`.
3. **textContent o'rniga innerHTML-ni noto'g'ri ishlatish:** Xavfsiz bo'lmagan foydalanuvchi ma'lumotlarini to'g'ridan-to'g'ri \`innerHTML\`-ga yozish XSS xurujlariga yo'l ochadi.

## 6. SAVOLLAR VA JAVOBLAR

**1. DOM nima degani?**
Document Object Model (Hujjat Obyekt Modeli) - brauzer tomonidan yaratiladigan, HTML hujjatini daraxtsimon tuzilishda ifodalovchi va JS orqali boshqarishga imkon beruvchi obyektlar modeli.

**2. HTML va DOM farqi nima?**
HTML - bu boshlang'ich yozilgan statik matnli kod. DOM esa brauzer xotirasidagi o'sha kodning dinamik daraxtsimon obyekt ko'rinishidir.

**3. Elementni ID orqali tanlash metodi qaysi?**
\`document.getElementById()\` metodi faqat ID orqali elementni tanlaydi.

**4. querySelector va querySelectorAll farqi nima?**
\`querySelector\` faqat birinchi mos kelgan elementni, \`querySelectorAll\` esa barcha mos kelgan elementlarni NodeList to'plami ko'rinishida qaytaradi.

**5. textContent va innerHTML farqi nima?**
\`textContent\` HTML teglarni oddiy matn deb hisoblab xavfsiz yozadi. \`innerHTML\` esa berilgan matnni HTML kodi sifatida o'qib, render qiladi.

**6. JSda CSS style'lari qanday nomlanadi?**
camelCase formatida nomlanadi (masalan: backgroundColor, fontSize, marginTop).

**7. classList.toggle() nima qiladi?**
Agar klass elementda mavjud bo'lsa uni o'chiradi, agar mavjud bo'lmasa uni qo'shadi.

**8. document.body nima?**
DOM daraxtidagi \`<body>\` elementiga to'g'ridan-to'g'ri kirish imkonini beruvchi xususiyat.

**9. Ota elementni qanday topish mumkin?**
\`parentElement\` xususiyati yordamida ota elementga murojaat qilinadi.

**10. Class qo'shish metodi qaysi?**
\`classList.add('klass-nomi')\` metodi.

**11. Nima uchun JSda style berishdan ko'ra class qo'shish yaxshi?**
Chunki stillar CSS faylida qolishi (separation of concerns) va klasslarni dinamik almashtirish oson bo'lishi uchun.

**12. NodeList ustida forEach tsiklini ishlatsa bo'ladimi?**
Ha, modern brauzerlarda NodeList to'plami \`forEach\` metodini to'g'ridan-to'g'ri qo'llab-quvvatlaydi.`,
  exercises: [
    {
      id: 1,
      title: "Elementni tanlash",
      instruction: "querySelector yordamida 'h1' elementini tanlab oling va uni 'title' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni shu yerda yozing\n",
      hint: "const title = document.querySelector('h1');",
      test: "if (code.includes('document.querySelector') && code.includes('h1')) return null; return 'h1 tegini tanlang';"
    },
    {
      id: 2,
      title: "Matnni o'zgartirish",
      instruction: "O'zgaruvchi 'header' ning textContent xususiyatini 'Salom JS' ga o'zgartiring.",
      startingCode: "const header = { textContent: '' }; // Mock element\n// Kodni shu yerga yozing\n",
      hint: "header.textContent = 'Salom JS';",
      test: "if (header.textContent === 'Salom JS') return null; return 'Matn noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Style o'zgartirish",
      instruction: "Elementning fon rangini (backgroundColor) 'blue' qiling.",
      startingCode: "const el = { style: { backgroundColor: '' } };\n// Bu yerga yozing\n",
      hint: "el.style.backgroundColor = 'blue';",
      test: "if (el.style.backgroundColor === 'blue') return null; return 'Rang ko\\'k bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Class qo'shish",
      instruction: "Elementga 'highlight' klassini qo'shing.",
      startingCode: "const el = { classList: { add: (c) => el.className = c } };\n// Bu yerga yozing\n",
      hint: "el.classList.add('highlight');",
      test: "if (el.className === 'highlight') return null; return 'Class qo\\'shilmadi';"
    },
    {
      id: 5,
      title: "querySelectorAll ishlatish",
      instruction: "querySelectorAll yordamida barcha 'li' elementlarini tanlang va ularni 'listItems' o'zgaruvchisiga saqlang.",
      startingCode: "// Kodni shu yerda yozing\n",
      hint: "const listItems = document.querySelectorAll('li');",
      test: "if (code.includes('querySelectorAll') && code.includes('li')) return null; return 'querySelectorAll yordamida li elementlarini tanlang';"
    },
    {
      id: 6,
      title: "Class o'chirish",
      instruction: "Elementdan classList.remove yordamida 'hidden' klassini o'chiring.",
      startingCode: "const el = { classList: { remove: (c) => el.className = '' } };\n// Bu yerga yozing\n",
      hint: "el.classList.remove('hidden');",
      test: "if (code.includes('classList.remove') && code.includes('hidden')) return null; return 'hidden klassini o\\'chiring';"
    },
    {
      id: 7,
      title: "innerHTML orqali yozish",
      instruction: "Elementning innerHTML xususiyatiga '<span>Yangi</span>' matnini yozing.",
      startingCode: "const el = { innerHTML: '' };\n// Bu yerga yozing\n",
      hint: "el.innerHTML = '<span>Yangi</span>';",
      test: "if (el.innerHTML === '<span>Yangi</span>') return null; return 'innerHTML qiymati noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Class toggle qilish",
      instruction: "Elementning classList xususiyatidagi toggle metodi yordamida 'dark-mode' klassini almashtiring.",
      startingCode: "const el = { classList: { toggle: (c) => el.toggled = c } };\n// Bu yerga yozing\n",
      hint: "el.classList.toggle('dark-mode');",
      test: "if (el.toggled === 'dark-mode') return null; return 'classList.toggle yordamida dark-mode klassini ishlating';"
    },
    {
      id: 9,
      title: "Ota elementga murojaat",
      instruction: "Elementning ota elementini 'parent' o'zgaruvchisiga saqlang.",
      startingCode: "const el = { parentElement: { id: 'parent-id' } };\n// Bu yerga yozing\n",
      hint: "const parent = el.parentElement;",
      test: "if (code.includes('parentElement')) return null; return 'parentElement xususiyatidan foydalaning';"
    },
    {
      id: 10,
      title: "Qo'shni elementni topish",
      instruction: "Elementdan keyingi qo'shni elementni (nextElementSibling) 'nextEl' o'zgaruvchisiga saqlang.",
      startingCode: "const el = { nextElementSibling: { tagName: 'DIV' } };\n// Bu yerga yozing\n",
      hint: "const nextEl = el.nextElementSibling;",
      test: "if (code.includes('nextElementSibling')) return null; return 'nextElementSibling xususiyatidan foydalaning';"
    },
    {
      id: 11,
      title: "Bolalarini topish",
      instruction: "Elementning 'children' ro'yxatidan birinchi elementni (0-indeks) 'firstChildEl' o'zgaruvchisiga saqlang.",
      startingCode: "const el = { children: [{ text: 'child' }] };\n// Bu yerga yozing\n",
      hint: "const firstChildEl = el.children[0];",
      test: "if (code.includes('children[0]')) return null; return 'children massividan 0-indeksni oling';"
    },
    {
      id: 12,
      title: "Input qiymatini olish",
      instruction: "Element 'myInput' ning value xususiyatini 'inputValue' o'zgaruvchisiga saqlang.",
      startingCode: "const myInput = { value: 'Salom' };\n// Bu yerga yozing\n",
      hint: "const inputValue = myInput.value;",
      test: "if (code.includes('.value')) return null; return 'value xususiyatini o\\'qing';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "DOM (Document Object Model) deganda nimani tushunasiz?",
      options: [
        "HTML fayllarini serverda saqlash texnologiyasi",
        "Brauzer tomonidan yaratiladigan, HTML hujjatini daraxtsimon tuzilishda ifodalovchi va JavaScript orqali elementlarni boshqarishga imkon beruvchi obyektlar modeli",
        "Ma'lumotlar bazasini boshqarish tizimi",
        "CSS stillarini avtomatik optimallashtirish vositasi"
      ],
      correctAnswer: 1,
      explanation: "DOM - bu brauzer tomonidan HTML hujjatini o'qish paytida tuziladigan va sahifadagi har bir elementni o'zgartirish, o'chirish yoki yangi elementlar qo'shish imkonini beruvchi interfeys/obyektlar daraxtidir."
    },
    {
      id: 2,
      question: "`document.querySelector` va `document.querySelectorAll` metodlari o'rtasidagi asosiy farq nima?",
      options: [
        "`querySelector` faqat rasmlarni, `querySelectorAll` esa barcha teglarni tanlaydi",
        "`querySelector` CSS selektoriga mos keluvchi faqat birinchi elementni, `querySelectorAll` esa mos keluvchi barcha elementlarni NodeList to'plami ko'rinishida qaytaradi",
        "`querySelectorAll` tezroq ishlaydi",
        "Hech qanday farqi yo'q, ikkalasi ham bir xil natija beradi"
      ],
      correctAnswer: 1,
      explanation: "`querySelector` faqat bitta (birinchi mos kelgan) element obyektini, `querySelectorAll` esa barcha mos kelgan elementlarni o'z ichiga olgan NodeList ro'yxatini qaytaradi."
    },
    {
      id: 3,
      question: "JavaScript yordamida elementning CSS klassini qo'shish yoki o'chirish uchun qaysi metodlar eng to'g'ri va xavfsiz hisoblanadi?",
      options: [
        "`element.style.class = 'nom'`",
        "`element.classList.add('nom')` va `element.classList.remove('nom')`",
        "`element.setAttribute('class', 'nom')`",
        "`element.className = 'nom'` (oldingi klasslarni o'chirib yuboradi)"
      ],
      correctAnswer: 1,
      explanation: "`classList` obyekti ichidagi `add`, `remove`, `toggle` metodlari elementning boshqa klasslariga zarar yetkazmagan holda klasslarni xavfsiz boshqarish imkonini beradi."
    },
    {
      id: 4,
      question: "NodeList va HTMLCollection o'rtasidagi farq haqida qaysi tasdiq to'g'ri?",
      options: [
        "Ikkalasi ham oddiy JavaScript massivi (Array) bo'lib, barcha massiv metodlarini to'liq qo'llab-quvvatlaydi",
        "HTMLCollection faqat element tugunlarini (Element nodes) o'z ichiga oladi va jonli (live) bo'ladi; NodeList esa har qanday tugun turlarini (text, comment) o'z ichiga olishi mumkin va odatda statik (non-live) bo'ladi",
        "NodeList faqat Internet Explorer brauzerida ishlaydi",
        "HTMLCollection faqat rasmlar uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "HTMLCollection har doim jonli (live) bo'lib, DOM o'zgarganda avtomat yangilanadi. NodeList (masalan, querySelectorAll qaytargan ro'yxat) odatda statik (non-live) bo'ladi."
    },
    {
      id: 5,
      question: "JavaScript-da DOM elementining inline stillarini o'zgartirishda CSS xususiyati nomlari qanday yoziladi (masalan: background-color)?",
      options: [
        "`element.style['background-color']` yoki `element.style.backgroundColor` (camelCase formatida)",
        "Faqat `element.style.background-color` ko'rinishida",
        "Faqat katta harflarda: `element.style.BACKGROUND_COLOR`",
        "CSS stillarini JavaScript'da inline o'zgartirib bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "JavaScript style obyektida chiziqcha bilan yoziladigan CSS xususiyatlari camelCase formatida yoziladi (backgroundColor, fontSize), yoki qavslar ichida string sifatida `style['background-color']` ko'rinishida yozilishi mumkin."
    },
    {
      id: 6,
      question: "ID bo'yicha elementni tanlashda qaysi metod eng tez ishlaydi?",
      options: [
        "`document.getElementById('myId')`",
        "`document.querySelector('#myId')`",
        "Ikkalasi bir xil tezlikda ishlaydi",
        "`document.getElementsByTagName('myId')`"
      ],
      correctAnswer: 0,
      explanation: "`getElementById` faqat ID bo'yicha qidirishga moslashtirilgani uchun, brauzer darhol o'sha elementni topadi. `querySelector` esa CSS parseridan o'tgani sababli nazariy jihatdan biroz sekinroq ishlaydi."
    },
    {
      id: 7,
      question: "`textContent` o'rniga `innerHTML` ishlatilganda qanday xavf tug'ilishi mumkin?",
      options: [
        "Faqat CSS stillari buziladi",
        "Sayt tezligi 10 barobarga pasayadi",
        "XSS (Cross-Site Scripting) ya'ni sahifaga zararli skriptlar kiritib yuborish xavfi",
        "DOM butunlay bloklanadi"
      ],
      correctAnswer: 2,
      explanation: "`innerHTML` berilgan matn ichidagi HTML kodlarni (masalan `<script>`) ishga tushirishi mumkin. Shuning uchun foydalanuvchilar kiritgan ma'lumotlarni yozishda faqat `textContent` ishlatish xavfsizlik nuqtai nazaridan shart."
    },
    {
      id: 8,
      question: "querySelectorAll qaytargan NodeList ustida qaysi massiv metodini to'g'ridan-to'g'ri chaqirish mumkin?",
      options: [
        "`.map()`",
        "`.filter()`",
        "`.forEach()`",
        "`.reduce()`"
      ],
      correctAnswer: 2,
      explanation: "NodeList haqiqiy massiv bo'lmasa ham, brauzerlar unda `.forEach()` metodini to'g'ridan-to'g'ri chaqirish imkoniyatini yaratgan. Boshqa massiv metodlari (.map, .filter) uchun uni `Array.from(nodeList)` orqali haqiqiy massivga aylantirish kerak."
    },
    {
      id: 9,
      question: "DOM-da butun HTML hujjatining ildiz (root) elementini ifodalovchi obyekt nima?",
      options: [
        "`document.body`",
        "`document.documentElement` (ya'ni <html> tegi)",
        "`window.root`",
        "`document.head`"
      ],
      correctAnswer: 1,
      explanation: "`document.documentElement` DOM daraxtidagi eng ildiz element bo'lgan `<html>` tegini ifodalaydi."
    },
    {
      id: 10,
      question: "`parentElement` va `parentNode` o'rtasidagi farq nima?",
      options: [
        "Hech qanday farqi yo'q",
        "`parentElement` faqat element tugunini qaytaradi (yo'q bo'lsa null), `parentNode` esa hujjat tugunlarini (document node, text node) ham qaytarishi mumkin",
        "`parentNode` eski IE da ishlaydi, `parentElement` esa faqat Chrome da",
        "`parentElement` xotirani kamroq band qiladi"
      ],
      correctAnswer: 1,
      explanation: "`parentElement` har doim ota elementni (Element node) qaytaradi, agar u element bo'lmasa (masalan, root bo'lsa) null beradi. `parentNode` esa har qanday ota tugunni qaytaraveradi."
    },
    {
      id: 11,
      question: "`firstElementChild` va `firstChild` o'rtasidagi farq nima?",
      options: [
        "Ikkalasi ham mutlaqo bir xil narsani qaytaradi",
        "`firstElementChild` birinchi haqiqiy HTML elementini qaytaradi, `firstChild` esa birinchi tugunni (bu probel yoki matnli text node bo'lishi mumkin) qaytaradi",
        "`firstChild` tezroq ishlaydi",
        "`firstElementChild` faqat CSS stillarini ko'radi"
      ],
      correctAnswer: 1,
      explanation: "DOM-da bo'sh joylar va yangi qatorlar ham text node (matn tuguni) hisoblanadi. Shuning uchun `firstChild` ko'pincha bo'sh joyni qaytaradi. `firstElementChild` esa faqat haqiqiy HTML teglarni (elementlarni) qidiradi."
    },
    {
      id: 12,
      question: "Elementda ma'lum bir klass mavjudligini tekshirish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`element.classList.has('active')`",
        "`element.classList.contains('active')`",
        "`element.classList.check('active')`",
        "`element.classList.includes('active')`"
      ],
      correctAnswer: 1,
      explanation: "`element.classList.contains('klass')` elementi berilgan klass mavjud bo'lsa true, aks holda false qiymatini qaytaradi."
    }
  ]
};
