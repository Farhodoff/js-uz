export const a11yAria = {
  id: "a11y-aria",
  title: "Accessibility (A11y) va ARIA DOM",
  theory: `
## Part 1: Beginner Analogy

Tasavvur qiling, siz ko'zi ojiz insonlar uchun mo'ljallangan muzeydasiz. Agar muzeyda faqatgina "bu yerda rasm bor" deb yozilgan bo'lsa va uni ushlab his qilish yoki ovozli izoh bo'lmasa, ular hech narsa tushunishmaydi. Veb-saytlarimiz ham xuddi shunday: ko'rishda yoki harakatlanishda muammosi bor insonlar maxsus yordamchi dasturlar (Screen Readers - ekranni o'qib beruvchilar) orqali saytni "ko'radilar". Agar biz oddiy \\\`<div>\\\` yoki \\\`<span>\\\` elementlarini tugma sifatida ishlatsak, u dasturlar buni oddiy matn deb o'ylaydi. 

Biz kod orqali "bu tugma, bosish mumkin" yoki "bu oyna ochiq" deb to'g'ri "etiketkalar" yopishtirishimiz kerak. Bu jarayonni **Accessibility (A11y)**, ishlatiladigan vositalarni esa **ARIA (Accessible Rich Internet Applications)** deb ataymiz.

## Part 2: Deep Dive

### Accessibility Tree (Kirish imkoniyati daraxti)
Brauzer HTML ni o'qigach, DOM (Document Object Model) daraxtini quradi. Shu bilan birga, yordamchi texnologiyalar uchun **Accessibility Tree** (AOM) ham yaratiladi. Screen Reader'lar to'g'ridan-to'g'ri HTML'ni emas, balki aynan shu Accessibility Tree'ni o'qiydi.

\\\`\\\`\\\`mermaid
graph TD
    A[HTML Code] --> B[DOM Tree]
    B --> C[Accessibility Tree]
    C --> D[Screen Readers]
    C --> E[Assistive Technologies]
\\\`\\\`\\\`

### ARIA Roles, States, and Properties
HTML5 o'zining ichki (native) semantik elementlariga ega (\\\`<button>\\\`, \\\`<nav>\\\`, \\\`<header>\\\`). Ulardan foydalanish har doim eng yaxshi yo'l! Lekin o'zimiz murakkab komponent (masalan, kastom Dropdown yoki Modal) yasaganimizda brauzer buni tushunmaydi. Shunda **ARIA** yordamga keladi.

- **Roles (Rollar):** Element nima ekanligini bildiradi. Masalan: \\\`role="dialog"\\\`, \\\`role="alert"\\\`, \\\`role="checkbox"\\\`.
- **States (Holatlar):** Elementning hozirgi holatini bildiradi va JS orqali dinamik o'zgaradi. Masalan: \\\`aria-expanded="true"\\\`, \\\`aria-checked="false"\\\`, \\\`aria-disabled="true"\\\`.
- **Properties (Xususiyatlar):** Elementning qo'shimcha xususiyatlarini beradi. Masalan: \\\`aria-label="Yopish"\\\` (vizual ko'rinmaydigan, lekin o'qib beriladigan matn), \\\`aria-controls="menu-id"\\\`.

### Fokusni Boshqarish (Keyboard Navigation)
Sichqoncha ishlata olmaydiganlar saytda \\\`Tab\\\` va \\\`Shift + Tab\\\` orqali harakatlanishadi. 
- Standart interaktiv elementlar (\\\`<button>\\\`, \\\`<a>\\\`, \\\`<input>\\\`) avtomatik ravishda \\\`Tab\\\` orqali fokusni qabul qiladi.
- \\\`tabindex="0"\\\` - Oddiy elementni (masalan, \\\`div\\\`) fokus oladigan qiladi.
- \\\`tabindex="-1"\\\` - Elementga faqat JS orqali \\\`.focus()\\\` qaratish mumkin.
- **Focus Trap (Fokus qopqoni):** Modal darcha ochilganda, foydalanuvchi \\\`Tab\\\` bosganda fokus faqat modal ichida aylanib yurishi kerak. U modal ortidagi fon elementlariga o'tib ketmasligi shart.

Misol:
\\\`\\\`\\\`javascript
const modal = document.getElementById("myModal");
// Modal ochilganda fokus uning ichidagi birinchi interaktiv elementga qaratiladi
function openModal() {
  modal.removeAttribute("hidden");
  modal.querySelector("button").focus();
}
\\\`\\\`\\\`

## Part 3: Edge Cases and Senior Interview Questions

**Q: \\\`aria-hidden="true"\\\` va CSS \\\`display: none\\\` ning farqi nima?**
- \\\`display: none\\\` elementni vizual yashiradi va Accessibility Tree'dan ham olib tashlaydi. Screen Reader uni mutlaqo ko'rmaydi.
- \\\`aria-hidden="true"\\\` elementni vizual ko'rsatib turadi, lekin Screen Reader uni o'qib bermaydi (masalan, vizual bezak uchun qo'yilgan ikonkalarni yashirish uchun).

**Q: \\\`aria-live\\\` atributi qachon ishlatiladi?**
Sahifada dinamik o'zgarishlar (masalan, AJAX orqali kelgan xabar, toast notification yoki chat xabari) paydo bo'lganda, ko'zi ojiz inson buni bilmay qolishi mumkin. Shunda \\\`aria-live="polite"\\\` (foydalanuvchini chalg'itmay o'qish) yoki \\\`aria-live="assertive"\\\` (darhol, hamma narsani to'xtatib o'qish) ishlatiladi.

**Q: Nega "Native HTML > ARIA" deyishadi?**
O'z qo'lingiz bilan \\\`<div role="button" tabindex="0">\\\` yasash va unga JS'da \\\`click\\\` va \\\`keydown (Enter/Space)\\\` event'larini qo'shishdan ko'ra, tayyor \\\`<button>\\\` ishlatish xavfsizroq va qulayroq. HTML taglari barcha qulayliklarni (avtomatik fokus, enter tugmasini eshitish) o'zida saqlaydi.
`,
  exercises: [
    {
      id: 1,
      title: "aria-expanded o'rnatish",
      description: "Funksiya qabul qilgan elementga 'aria-expanded' atributini isExpanded parametriga qarab ('true' yoki 'false' string shaklida) o'rnating.",
      initialCode: `function setExpanded(element, isExpanded) {\n  \n}`,
      solution: `function setExpanded(element, isExpanded) {\n  element.setAttribute('aria-expanded', String(isExpanded));\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            setExpanded(el, true);
            if (el.attrs['aria-expanded'] !== 'true') return false;
            setExpanded(el, false);
            return el.attrs['aria-expanded'] === 'false';
          `,
          description: "Elementga to'g'ri string ko'rinishida qiymat qo'yilishi kerak."
        }
      ]
    },
    {
      id: 2,
      title: "Toggle aria-checked",
      description: "Checkbox (yoki shunga o'xshash element) bosilganda uning 'aria-checked' qiymatini teskarisiga o'zgartiruvchi funksiya yozing. Agar qiymat 'true' bo'lsa 'false' ga, aks holda 'true' ga o'zgarsin.",
      initialCode: `function toggleChecked(element) {\n  \n}`,
      solution: `function toggleChecked(element) {\n  const current = element.getAttribute('aria-checked') === 'true';\n  element.setAttribute('aria-checked', String(!current));\n}`,
      tests: [
        {
          test: `
            const el = { 
              attrs: { 'aria-checked': 'false' }, 
              getAttribute(k) { return this.attrs[k]; },
              setAttribute(k, v) { this.attrs[k] = v; } 
            };
            toggleChecked(el);
            if (el.attrs['aria-checked'] !== 'true') return false;
            toggleChecked(el);
            return el.attrs['aria-checked'] === 'false';
          `,
          description: "aria-checked atributi holati toggle bo'lishi kerak."
        }
      ]
    },
    {
      id: 3,
      title: "Rol va tabindex qo'shish",
      description: "Berilgan elementni klaviatura orqali ishlatiladigan tugmaga aylantirish uchun unga role='button' va tabindex='0' atributlarini qo'shuvchi funksiya yozing.",
      initialCode: `function makeButton(element) {\n  \n}`,
      solution: `function makeButton(element) {\n  element.setAttribute('role', 'button');\n  element.setAttribute('tabindex', '0');\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            makeButton(el);
            return el.attrs['role'] === 'button' && el.attrs['tabindex'] === '0';
          `,
          description: "role va tabindex to'g'ri o'rnatilishi kerak."
        }
      ]
    },
    {
      id: 4,
      title: "Elementni focus qilish",
      description: "Funksiya qabul qilgan modal oyna elementining ichidan '.close-btn' klassiga ega birinchi elementni topib, unga fokus yarating (.focus() chaqiring).",
      initialCode: `function focusCloseButton(modal) {\n  \n}`,
      solution: `function focusCloseButton(modal) {\n  const btn = modal.querySelector('.close-btn');\n  if(btn) btn.focus();\n}`,
      tests: [
        {
          test: `
            let focused = false;
            const btn = { focus: () => { focused = true; } };
            const modal = { querySelector: (sel) => sel === '.close-btn' ? btn : null };
            focusCloseButton(modal);
            return focused === true;
          `,
          description: ".close-btn ni topib focus() chaqirilishi kerak."
        }
      ]
    },
    {
      id: 5,
      title: "Screen readerdan yashirish",
      description: "Vizual ikonkani (elementni) screen reader dasturlar o'qimasligi uchun unga tegishli ARIA atributni ('aria-hidden') 'true' qilib qo'ying.",
      initialCode: `function hideFromScreenReader(iconElement) {\n  \n}`,
      solution: `function hideFromScreenReader(iconElement) {\n  iconElement.setAttribute('aria-hidden', 'true');\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            hideFromScreenReader(el);
            return el.attrs['aria-hidden'] === 'true';
          `,
          description: "aria-hidden atributi 'true' qiymat bilan o'rnatilishi kerak."
        }
      ]
    },
    {
      id: 6,
      title: "Live Region yaratish",
      description: "Xabar ko'rsatuvchi element (alert-box) o'zgarganda Screen Reader avtomatik uni o'qishi uchun 'aria-live' atributini 'polite' qilib belgilang.",
      initialCode: `function makeLiveRegion(element) {\n  \n}`,
      solution: `function makeLiveRegion(element) {\n  element.setAttribute('aria-live', 'polite');\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            makeLiveRegion(el);
            return el.attrs['aria-live'] === 'polite';
          `,
          description: "aria-live atributi 'polite' qilib belgilanadi."
        }
      ]
    },
    {
      id: 7,
      title: "ARIA Label o'rnatish",
      description: "Icon tugmasi matnga ega emas. Unga screen reader o'qib berishi uchun 'aria-label' atributini labelStr orqali bering.",
      initialCode: `function setAriaLabel(element, labelStr) {\n  \n}`,
      solution: `function setAriaLabel(element, labelStr) {\n  element.setAttribute('aria-label', labelStr);\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            setAriaLabel(el, 'Yopish');
            return el.attrs['aria-label'] === 'Yopish';
          `,
          description: "aria-label atributi to'g'ri o'rnatilishi lozim."
        }
      ]
    },
    {
      id: 8,
      title: "aria-labelledby orqali ulash",
      description: "Elementni boshqa sarlavha elementi bilan bog'lash uchun 'aria-labelledby' ga ID ni (labelId) bering.",
      initialCode: `function linkLabel(element, labelId) {\n  \n}`,
      solution: `function linkLabel(element, labelId) {\n  element.setAttribute('aria-labelledby', labelId);\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            linkLabel(el, 'title1');
            return el.attrs['aria-labelledby'] === 'title1';
          `,
          description: "aria-labelledby orqali boshqa ID ga ulanishi kerak."
        }
      ]
    },
    {
      id: 9,
      title: "tabindex ni olib tashlash",
      description: "Element endi interaktiv bo'lmaganda klaviatura fokusini olmasligi uchun uning 'tabindex' atributini o'chiring (removeAttribute dan foydalaning).",
      initialCode: `function removeFocusable(element) {\n  \n}`,
      solution: `function removeFocusable(element) {\n  element.removeAttribute('tabindex');\n}`,
      tests: [
        {
          test: `
            let removed = '';
            const el = { removeAttribute(k) { removed = k; } };
            removeFocusable(el);
            return removed === 'tabindex';
          `,
          description: "tabindex atributi olib tashlanishi kerak."
        }
      ]
    },
    {
      id: 10,
      title: "Disable qilish",
      description: "Tugma ishlamayotganligini ko'rsatish uchun unga 'aria-disabled' atributini 'true' qilib qo'ying.",
      initialCode: `function disableElement(element) {\n  \n}`,
      solution: `function disableElement(element) {\n  element.setAttribute('aria-disabled', 'true');\n}`,
      tests: [
        {
          test: `
            const el = { attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
            disableElement(el);
            return el.attrs['aria-disabled'] === 'true';
          `,
          description: "aria-disabled atributi true bo'lishi kerak."
        }
      ]
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "A11y (Accessibility) nima maqsadda ishlatiladi?",
      options: [
        "Saytni barcha foydalanuvchilar (jumladan nuqsoni bor insonlar) uchun qulaylashtirish",
        "Saytning ishlash tezligini oshirish",
        "Sayt xavfsizligini kuchaytirish",
        "Mobil qurilmalarga moslashtirish (Responsive qilish)"
      ],
      answer: "Saytni barcha foydalanuvchilar (jumladan nuqsoni bor insonlar) uchun qulaylashtirish"
    },
    {
      id: 2,
      question: "ARIA nimaning qisqartmasi?",
      options: [
        "Accessible Rich Internet Applications",
        "Advanced Responsive Internet Attributes",
        "Application Rules Interface API",
        "Accessibility Rendering in Applications"
      ],
      answer: "Accessible Rich Internet Applications"
    },
    {
      id: 3,
      question: "Screen Reader'lar sahifani o'qishda nimaga asoslanadi?",
      options: [
        "Accessibility Tree (AOM)",
        "Faqat CSS stiliga",
        "JavaScript kodining logikasiga",
        "Database'dagi ma'lumotlarga"
      ],
      answer: "Accessibility Tree (AOM)"
    },
    {
      id: 4,
      question: "tabindex='0' ning vazifasi nima?",
      options: [
        "Elementni klaviatura orqali fokus olishiga imkon beradi",
        "Elementni eng birinchi fokus olinadigan qiladi",
        "Elementni fokus olishdan chiqarib tashlaydi",
        "Sayt yuklanganda avtomatik fokusni qaratadi"
      ],
      answer: "Elementni klaviatura orqali fokus olishiga imkon beradi"
    },
    {
      id: 5,
      question: "tabindex='-1' qachon ishlatiladi?",
      options: [
        "Elementga faqat JS orqali (masalan .focus()) fokus o'tkazish kerak bo'lganda",
        "Element umuman ekranda ko'rinmasligi uchun",
        "Tab tugmasini cheksiz marta bosishni to'xtatish uchun",
        "Elementga sichqoncha bosilishini taqiqlash uchun"
      ],
      answer: "Elementga faqat JS orqali (masalan .focus()) fokus o'tkazish kerak bo'lganda"
    },
    {
      id: 6,
      question: "aria-hidden='true' atributi nimani anglatadi?",
      options: [
        "Element Screen Reader tomonidan o'qilmaydi",
        "Element ekrandan yo'qoladi (display: none)",
        "Element JS orqali o'chirilganini",
        "Element barcha uchun ko'rinmasligini"
      ],
      answer: "Element Screen Reader tomonidan o'qilmaydi"
    },
    {
      id: 7,
      question: "aria-expanded atributi odatda nima uchun ishlatiladi?",
      options: [
        "Akkordeon yoki ochiladigan (dropdown) elementning ochilgan/yopilgan holatini bildirish",
        "Element hajmi qancha kattalashganini CSS'ga aytish",
        "Matnni katta harflarda yozish",
        "Fokus qaysi elementda ekanligini ko'rsatish"
      ],
      answer: "Akkordeon yoki ochiladigan (dropdown) elementning ochilgan/yopilgan holatini bildirish"
    },
    {
      id: 8,
      question: "aria-live='polite' qanday ishlaydi?",
      options: [
        "Dinamik o'zgarishlarni ekranni o'qib beruvchi joriy gapni tugatgandan so'ng o'qiydi",
        "Screen Reader darhol bor narsani to'xtatib matnni o'qib beradi",
        "Faqat sichqoncha bilan bosilganda ishlaydi",
        "Element vizual ravishda paydo bo'lib asta yashirinadi"
      ],
      answer: "Dinamik o'zgarishlarni ekranni o'qib beruvchi joriy gapni tugatgandan so'ng o'qiydi"
    },
    {
      id: 9,
      question: "Nima uchun <div role='button'> o'rniga <button> tagini ishlatish tavsiya qilinadi?",
      options: [
        "Chunki <button> o'zida native fokus va enter/space bosish eventlarini olib yuradi",
        "Chunki <div> elementini CSS orqali tugmaga aylantirib bo'lmaydi",
        "Chunki role atributi eskirgan va ishlatilmaydi",
        "Chunki <div> ga JS qo'shib bo'lmaydi"
      ],
      answer: "Chunki <button> o'zida native fokus va enter/space bosish eventlarini olib yuradi"
    },
    {
      id: 10,
      question: "Focus Trap (Fokus qopqoni) nima?",
      options: [
        "Fokusning faqat bitta komponent (masalan modal) ichida cheklanib, orqa fonga o'tmasligi",
        "Klaviatura umuman ishlamay qolishi",
        "Tab bosilganda brauzerni qotib qolishi",
        "Fokusning faqat sichqoncha ko'rsatkichi turgan joyga bog'lanib qolishi"
      ],
      answer: "Fokusning faqat bitta komponent (masalan modal) ichida cheklanib, orqa fonga o'tmasligi"
    },
    {
      id: 11,
      question: "Ko'rinmas tugmaga ekranni o'qib beruvchi uchun nom qanday beriladi?",
      options: [
        "aria-label orqali",
        "class='hidden-name' orqali",
        "name atributi orqali",
        "title atributi orqali"
      ],
      answer: "aria-label orqali"
    },
    {
      id: 12,
      question: "aria-disabled='true' va HTML'dagi disabled atributining farqi nimada?",
      options: [
        "aria-disabled elementga hamon focus o'tishi mumkin, lekin Screen Reader uni 'o'chirilgan' deb o'qiydi",
        "Ularning hech qanday farqi yo'q",
        "aria-disabled HTML5'da olib tashlangan",
        "disabled faqat linklar uchun ishlaydi"
      ],
      answer: "aria-disabled elementga hamon focus o'tishi mumkin, lekin Screen Reader uni 'o'chirilgan' deb o'qiydi"
    }
  ]
};
