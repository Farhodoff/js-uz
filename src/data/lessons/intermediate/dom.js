export const domBasics = {
  id: "m4",
  title: "DOM bilan ishlash (Document Object Model)",
  level: "O'rta daraja",
  description: "JavaScript orqali HTML elementlarini boshqarish: tanlash, o'zgartirish va bezash.",
  theory: `
# DOM — Bu nima va nima uchun kerak?

**DOM** (Document Object Model) — bu HTML hujjatining brauzer ichidagi daraxtsimon ko'rinishi. Oddiyroq aytsak, bu JavaScript va HTML o'rtasidagi "ko'prik".

## 1. NEGA kerak?
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
el.textContent = "Yangi sarlavha"; // Matnni o'zgartirish
el.style.color = "red"; // Rang berish
el.classList.add("active"); // Class qo'shish
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **querySelector bilan nuqtani unutish:** \`document.querySelector("my-class")\` ishlamaydi, \`".my-class"\` bo'lishi shart.
2. **Style nomlari:** JSda CSS xususiyatlari \`camelCase\` yoziladi: \`background-color\` emas, \`backgroundColor\`.

## 6. SAVOLLAR (12 ta)
1. DOM nima degani?
2. HTML va DOM farqi nima?
3. Elementni ID orqali tanlash metodi?
4. \`querySelector\` va \`querySelectorAll\` farqi?
5. \`textContent\` va \`innerHTML\` farqi?
6. JSda CSS style'lari qanday nomlanadi?
7. \`classList.toggle()\` nima qiladi?
8. \`document.body\` nima?
9. Ota elementni qanday topish mumkin?
10. Class qo'shish metodi?
11. Nima uchun JSda style berishdan ko'ra class qo'shish yaxshi?
12. Bir nechta elementni tanlaganda u nima qaytaradi (NodeList)?`,
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
    }
  ]
};
