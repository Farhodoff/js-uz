export const scrollingApis = {
  id: "scrolling-apis",
  title: "Scrolling API: Silliq Harakat va Skroll o'lchovlari",
  theory: `
### Part 1: Beginner Analogy

Tasavvur qiling, siz katta kutubxonadasiz va uzun javondagi kitoblarni qidiryapsiz. Javon butunlay devorni egallagan, shuning uchun siz faqat o'z oldingizdagi qismini ko'ra olasiz. 
- **Oyna (Window)** — bu sizning ko'rish maydoningiz (Viewport).
- **Skroll** — bu sizning qadam tashlab javon bo'ylab yurishingiz.
- **\\\`scrollTo\\\`** — sizga aniq aytishdi: "3-javon, 5-qatorga bor" (aniq koordinataga sakrash).
- **\\\`scrollBy\\\`** — "Yana 2 qadam o'ngga yur" (hozirgi joydan biroz siljish).
- **\\\`scrollIntoView\\\`** — do'stingiz sizga "Qara, mana bu Garri Potter kitobi!" deb o'zining yoniga chaqirishi. Siz darhol u ko'rsatgan kitob oldiga kelasiz.

### Part 2: Deep Dive

DOM skroll xususiyatlari brauzerni boshqarish va sahifadagi elementlarning kadrga qanchalik yaqinlashganini bilish uchun juda muhimdir. Bular oddiy interfeysni interaktiv tajribaga aylantiradi.

#### 1. Skroll API lar
Brauzer ikkita asosiy ob'ekt bilan ishlash imkonini beradi:
- Butun oyna (\\\`window\\\`)
- Ichki scroll xususiyati bor (\\\`overflow: auto\\\` yoki \\\`scroll\\\`) element (\\\`HTMLElement\\\`)

\\\`\\\`\\\`javascript
// Elementni ko'rinadigan joyga silliq olib kelish
document.getElementById('target').scrollIntoView({
  behavior: 'smooth',
  block: 'center', // Elementni vertikal markazda tekislash
  inline: 'nearest'
});

// Oynani aynan berilgan (x, y) piksel koordinatalariga siljitish
window.scrollTo({
  top: 500,
  left: 0,
  behavior: 'smooth'
});

// Joriy joylashuvdan yana (x, y) qadar surish
window.scrollBy({
  top: window.innerHeight, // Yana bitta ekran bo'yi pastga siljish
  behavior: 'smooth'
});
\\\`\\\`\\\`

#### 2. Element balandligi va skroll miqdori
Dasturchilar \\\`Infinite Scroll\\\` yasashda elementlarning aniq balandligini bilishlari kerak:
- \\\`clientHeight\\\` / \\\`clientWidth\\\`: Elementning ko'rinib turgan, ekranga sig'gan qismi (chegarasiz, borderlarsiz).
- \\\`scrollHeight\\\` / \\\`scrollWidth\\\`: Elementning butunlay (scroll bo'lishi mumkin bo'lgan barcha qismi bilan qo'shilgan) uzunligi.
- \\\`scrollTop\\\` / \\\`scrollLeft\\\`: Element qancha piksellarga tepaga/chapga surilganligi.

\\\`\\\`\\\`javascript
const container = document.querySelector('.scrollable');
// Oxiriga yetib kelganini tekshirish (1-2px xatolik bilan):
const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 2;
\\\`\\\`\\\`

#### 3. Scroll Performansi va Passive Event Listeners
\\\`scroll\\\` hodisasini kuzatish (event listener) har doim brauzerni juda ko'p ishlatadi (chunki skroll har bir necha millisekundda ishlaydi).
Brauzer silliq skroll qilish uchun siz \\\`preventDefault()\\\` ishlatmasligingizga ishonch hosil qilishi kerak. Buning uchun **passive event listener** ishlatiladi:
\\\`\\\`\\\`javascript
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
}, { passive: true });
\\\`\\\`\\\`
*(Bu orqali siz brauzerga "Men default scroll ni to'xtatmayman (preventDefault qilmayman), bemalol scroll qilaver" deysiz. Natijada scroll silliq qotmasdan ishlaydi).*

#### 4. requestAnimationFrame yordamida optimallashtirish
Agar scroll bo'lganda og'ir operatsiyalar qilsangiz, brauzer kadrlar sonini (FPS) tushirib yuboradi (Jank effect). Buning oldini olish uchun \\\`requestAnimationFrame\\\` (rAF) va "debouncing" (yoki "throttling") qilinadi:

\\\`\\\`\\\`javascript
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Skroll bo'lganda DOM ni yangilash kodini faqat ekranning rasm chizish siklida (60FPS) chaqirish
      // doSomethingWith(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
\\\`\\\`\\\`

#### 5. Intersection Observer Internals
\\\`scroll\\\` event listener o'rniga bugungi kunda "Biror element ekranga kirdimi yo'qmi?" deb tekshirish uchun \\\`IntersectionObserver\\\` API ishlatiladi.
Intersection Observer brauzerni "Main Thread" (asosiy oqimi) ni band qilmaydi, u asinxron ravishda va C++ brauzer darajasida ishlaydi!
\\\`\\\`\\\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element ekranda ko'rindi!');
      // Element ko'ringandan so'ng kuzatishni to'xtatish (masalan Lazy Loading da)
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null, // by default window
  rootMargin: '0px', // Ekranga kirishidan oldinroq ishlashi uchun kengaytirish
  threshold: 0.5 // Elementning 50% ko'rinsa ishlaydi
});

observer.observe(document.querySelector('.lazy-image'));
\\\`\\\`\\\`

### Part 3: Edge Cases and Senior Interview Questions

1. **"ScrollIntoView ishlatganda nima edge caselar chiqishi mumkin?"**
   Agar element scroll qilinadigan "modal" ichida bo'lsa va birdaniga window o'zi ham scroll bo'ladigan bo'lsa, \\\`scrollIntoView\\\` butun oynani o'sha modal elementiga moslab siljitib yuborishi mumkin. Bu sahifa dizaynini buzib ko'rsatadi.
2. **"Sticky navbar yaratish uchun scroll voqeasini qanday optimallashtirasiz?"**
   \\\`.addEventListener("scroll")\\\` ga tayanmasdan, yangi yo'li — \\\`IntersectionObserver\\\` yordamida navbar ustidagi ko'rinmas bir \\\`div\\\` qo'yiladi. U ekrandan yo'qolganda navbarga "sticky" klassini qo'shiladi. Bu performanceni juda oshiradi.
3. **"Nima uchun \\\`scrollTop\\\` qiymati har xil qurilmalarda ongli tushunarsiz nuqtalarda to'xtaydi (Fractional values)?"**
   Chunki hozirgi yuqori ekranli qurilmalarda (Retina Display) piksellar qismlarga (masalan 1.5px) bo'linishi mumkin. Shuning uchun matematik hisob-kitoblarda \\\`Math.ceil(scrollTop)\\\` ishlatish kerak.

### Mermaid Diagram: Intersection Observer Lifecycle

\\\`\\\`\\\`mermaid
graph TD;
    A[Observer Yaratish] --> B[Elementlarni Observe qilish];
    B --> C{Element ekranga kirdimi?};
    C -- Ha --> D[Callback funksiyani ishga tushirish];
    C -- Yo'q --> E[Kuzatishda davom etish];
    D --> F{Lazy Load/Boshqa amal};
    F --> G[Unobserve qilish/Yoki kuzatishda davom etish];
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "ScrollToEnd mantig'i",
      description: "Funksiyaga DOM elementi beriladi. Shu elementning ichki skrollini uning eng pastiga tushiradigan mantiqni yozing.",
      initialCode: "function scrollToBottom(el) {\n  // el ning jami balandligini uning joriy skroll qismiga tenglang\n  \n}",
      solution: "function scrollToBottom(el) {\n  el.scrollTop = el.scrollHeight;\n}",
      tests: [
        {
          test: "const el = { scrollHeight: 500, scrollTop: 0 };\nscrollToBottom(el);\nreturn el.scrollTop === 500;",
          description: "scrollTop qiymati scrollHeight ga tenglashtirilishi kerak"
        }
      ]
    },
    {
      id: 2,
      title: "Elementni ko'rinadigan joyga silliq olib kelish",
      description: "Funksiyaga element ID'si beriladi. O'sha elementni ekran markazida ko'rinadigan qilib, silliq harakat bilan olib keling (smooth, center).",
      initialCode: "function smoothScrollToCenter(id) {\n  // scrollIntoView dan foydalaning\n  \n}",
      solution: "function smoothScrollToCenter(id) {\n  const el = document.getElementById(id);\n  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });\n}",
      tests: [
        {
          test: "let isCalled = false; let b = '', bl = ''; const mockEl = { scrollIntoView: (opts) => { isCalled = true; b = opts.behavior; bl = opts.block; } }; const originalGet = document.getElementById; document.getElementById = () => mockEl; smoothScrollToCenter('test'); document.getElementById = originalGet; return isCalled && b === 'smooth' && bl === 'center';",
          description: "scrollIntoView silliq ('smooth') va markaz ('center') sozlamalari bilan chaqirilishi kerak"
        }
      ]
    },
    {
      id: 3,
      title: "Sahifani boshiga silliq qaytarish",
      description: "Tepaga qaytish tugmasi uchun funksiya yozing. U sahifani eng boshiga (top: 0) silliq ('smooth') harakat bilan qaytarishi kerak.",
      initialCode: "function scrollToTop() {\n  // window.scrollTo dan foydalaning\n  \n}",
      solution: "function scrollToTop() {\n  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });\n}",
      tests: [
        {
          test: "let isCalled = false; let t = -1, b = ''; const originalScrollTo = window.scrollTo; window.scrollTo = (opts) => { isCalled = true; t = opts.top; b = opts.behavior; }; scrollToTop(); window.scrollTo = originalScrollTo; return isCalled && t === 0 && b === 'smooth';",
          description: "window.scrollTo {top: 0, behavior: 'smooth'} bilan chaqirilishi kerak"
        }
      ]
    },
    {
      id: 4,
      title: "Hozirgi joydan yana 200px pastga tushish",
      description: "Funksiya chaqirilganda, ekranni hozirgi joyidan silliq qilib 200 piksel pastga siljitsin.",
      initialCode: "function scrollDownBy200() {\n  // window.scrollBy dan foydalaning\n  \n}",
      solution: "function scrollDownBy200() {\n  window.scrollBy({ top: 200, behavior: 'smooth' });\n}",
      tests: [
        {
          test: "let isCalled = false; let t = -1, b = ''; const originalScrollBy = window.scrollBy; window.scrollBy = (opts) => { isCalled = true; t = opts.top; b = opts.behavior; }; scrollDownBy200(); window.scrollBy = originalScrollBy; return isCalled && t === 200 && b === 'smooth';",
          description: "window.scrollBy {top: 200, behavior: 'smooth'} bilan chaqirilishi kerak"
        }
      ]
    },
    {
      id: 5,
      title: "Is at Bottom?",
      description: "Funksiyaga DOM elementi beriladi. Shu elementni foydalanuvchi eng pastgacha scroll qilgan bo'lsa (yoki 1 piksel xatolik bilan) true, aks holda false qaytarsin.",
      initialCode: "function isAtBottom(el) {\n  // el.scrollTop, el.clientHeight va el.scrollHeight dan foydalaning\n  \n}",
      solution: "function isAtBottom(el) {\n  return el.scrollTop + el.clientHeight >= el.scrollHeight - 1;\n}",
      tests: [
        {
          test: "return isAtBottom({ scrollTop: 400, clientHeight: 100, scrollHeight: 500 }) === true;",
          description: "Oxiriga yetganda true qaytishi kerak"
        },
        {
          test: "return isAtBottom({ scrollTop: 300, clientHeight: 100, scrollHeight: 500 }) === false;",
          description: "Oxiriga yetmaganda false qaytishi kerak"
        }
      ]
    },
    {
      id: 6,
      title: "Passive Event Listener sozlash",
      description: "Funksiyaga event target va callback beriladi. Scroll voqeasiga shu callback ni 'passive' (to'xtatib bo'lmaydigan, performansni oshiruvchi) tarzda qo'shing.",
      initialCode: "function addPassiveScroll(target, callback) {\n  // target.addEventListener dan foydalaning\n  \n}",
      solution: "function addPassiveScroll(target, callback) {\n  target.addEventListener('scroll', callback, { passive: true });\n}",
      tests: [
        {
          test: "let type='', cb=null, opts=null; const mockTarget = { addEventListener: (t, c, o) => { type = t; cb = c; opts = o; } }; addPassiveScroll(mockTarget, () => {}); return type === 'scroll' && opts && opts.passive === true;",
          description: "Event listener 'scroll' va { passive: true } bilan qo'shilishi kerak"
        }
      ]
    },
    {
      id: 7,
      title: "Intersection Observer - Yaratish",
      description: "Ekranga kirgan elementlarni konsolga chiqaruvchi oddiy Intersection Observer yarating. Uni qaytaring.",
      initialCode: "function createObserver() {\n  // new IntersectionObserver qaytaring\n  \n}",
      solution: "function createObserver() {\n  return new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n      if (entry.isIntersecting) console.log('Visible', entry.target);\n    });\n  });\n}",
      tests: [
        {
          test: "const obs = createObserver(); return obs && typeof obs.observe === 'function' && typeof obs.unobserve === 'function';",
          description: "IntersectionObserver obyektini qaytarishi kerak"
        }
      ]
    },
    {
      id: 8,
      title: "Intersection Observer - Root Margin",
      description: "Xuddi shu Observerni shunday yaratingki, u elementlar ekranga (window ga) 100px qolganda ishga tushsin (lazy loading uchun). rootMargin = '100px' ishlating.",
      initialCode: "function createLazyObserver() {\n  // new IntersectionObserver(callback, { rootMargin: '100px' }) yarating\n  \n}",
      solution: "function createLazyObserver() {\n  return new IntersectionObserver((entries) => {}, { rootMargin: '100px' });\n}",
      tests: [
        {
          test: "const obs = createLazyObserver(); return obs && typeof obs.observe === 'function';",
          description: "IntersectionObserver obyekti qaytarilishi kerak"
        }
      ]
    },
    {
      id: 9,
      title: "Skroll tepaga ekanini aniqlash",
      description: "Funksiya oldingi scrollTop va hozirgi scrollTop ni qabul qiladi. Agar foydalanuvchi yuqoriga (tepaga) scroll qilgan bo'lsa true, aks holda false qaytarsin.",
      initialCode: "function isScrollingUp(prevScrollTop, currentScrollTop) {\n  \n}",
      solution: "function isScrollingUp(prevScrollTop, currentScrollTop) {\n  return currentScrollTop < prevScrollTop;\n}",
      tests: [
        {
          test: "return isScrollingUp(200, 150) === true;",
          description: "Joriy qiymat oldingisidan kichik bo'lsa, tepaga chiqqan hisoblanadi"
        },
        {
          test: "return isScrollingUp(200, 250) === false;",
          description: "Joriy qiymat oldingisidan katta bo'lsa, pastga tushgan hisoblanadi"
        }
      ]
    },
    {
      id: 10,
      title: "Element qancha ko'rindi (Threshold)",
      description: "Funksiya ob'ekt sifatida { threshold: value } xossasini qaytarsin. Element o'zining kamida chorak (25%) qismi ekranga kirgandagina observer ishlasin. value nima bo'ladi?",
      initialCode: "function getThreshold() {\n  return { threshold: /* qiymat */ };\n}",
      solution: "function getThreshold() {\n  return { threshold: 0.25 };\n}",
      tests: [
        {
          test: "return getThreshold().threshold === 0.25;",
          description: "Threshold 0.25 bo'lishi kerak (25%)"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi xususiyat element ichidagi barcha scroll qilinadigan (ko'rinmas) qismning balandligini bildiradi?",
      options: [
        "scrollHeight",
        "clientHeight",
        "offsetHeight",
        "scrollTop"
      ],
      answer: "scrollHeight"
    },
    {
      id: 2,
      question: "Foydalanuvchi sahifani qanchalik pastga tushirganini oynaga (window) nisbatan bilish uchun nima ishlatiladi?",
      options: [
        "window.scrollY",
        "window.scrollHeight",
        "window.clientHeight",
        "window.scrollTop"
      ],
      answer: "window.scrollY"
    },
    {
      id: 3,
      question: "Elementni ekran markazida silliq qilib ko'rsatish uchun qaysi xususiyatlar to'g'ri kiritilgan?",
      options: [
        "{ behavior: 'smooth', block: 'center' }",
        "{ behavior: 'linear', block: 'middle' }",
        "{ scroll: 'smooth', position: 'center' }",
        "{ animate: true, align: 'center' }"
      ],
      answer: "{ behavior: 'smooth', block: 'center' }"
    },
    {
      id: 4,
      question: "Nima uchun scroll voqeasi (event) o'zgarishlarida { passive: true } ni qo'shish tavsiya qilinadi?",
      options: [
        "Brauzerga eventning default holatini to'xtatmasligini bildirib scroll tezligini oshiradi",
        "Scroll ni umuman ishlamasligini ta'minlaydi",
        "Elementning orqa fonini o'zgartirish uchun kerak",
        "Faqat sichqoncha ishlatilganda scroll bo'lishi uchun"
      ],
      answer: "Brauzerga eventning default holatini to'xtatmasligini bildirib scroll tezligini oshiradi"
    },
    {
      id: 5,
      question: "Biror element ekranga kirdi-chiqdi ekanini tekshirishning eng zamonaviy va optimal usuli nima?",
      options: [
        "Intersection Observer API",
        "window.onscroll dagi getBoundingClientRect",
        "setInterval yordamida ekranni har sekund tekshirish",
        "MutationObserver API"
      ],
      answer: "Intersection Observer API"
    },
    {
      id: 6,
      question: "window.scrollTo() nima ish qiladi?",
      options: [
        "Brauzer oynasini ko'rsatilgan aniq x va y koordinatalariga olib boradi",
        "Brauzerni joriy joyidan ko'rsatilgan miqdorga suradi",
        "Boshqa sahifaga yo'naltiradi (redirect)",
        "Sahifadagi hamma animatsiyalarni to'xtatadi"
      ],
      answer: "Brauzer oynasini ko'rsatilgan aniq x va y koordinatalariga olib boradi"
    },
    {
      id: 7,
      question: "window.scrollBy() ning vazifasi nima?",
      options: [
        "Oynani hozirgi joylashuviga nisbatan ko'rsatilgan piksellarga suradi",
        "Faqat oynaning chap qismiga qarab suradi",
        "Sahifaning boshiga sakraydi",
        "Aniq (top:0, left:0) nuqtaga qaytaradi"
      ],
      answer: "Oynani hozirgi joylashuviga nisbatan ko'rsatilgan piksellarga suradi"
    },
    {
      id: 8,
      question: "Infinite Scroll (cheksiz skroll) qachon ishga tushishi kerakligini aniqlaydigan eng to'g'ri ifoda qaysi?",
      options: [
        "scrollTop + clientHeight >= scrollHeight - 2",
        "scrollTop > scrollHeight",
        "clientHeight > scrollHeight",
        "scrollTop + scrollHeight === clientHeight"
      ],
      answer: "scrollTop + clientHeight >= scrollHeight - 2"
    },
    {
      id: 9,
      question: "IntersectionObserver da 'threshold: 1.0' nimani anglatadi?",
      options: [
        "Element to'liq 100% ekranda ko'ringandagina callback ishlaydi",
        "Elementning 1 pikseli ko'rinsa ham callback ishlaydi",
        "Observer umuman ishlamaydi (1 o'chirilganini bildiradi)",
        "Root element 1 marta surilganda ishlaydi"
      ],
      answer: "Element to'liq 100% ekranda ko'ringandagina callback ishlaydi"
    },
    {
      id: 10,
      question: "IntersectionObserver da 'rootMargin' xususiyati nimaga xizmat qiladi?",
      options: [
        "Element aslida ekranga kirmasidan oldin yoki keyinroq observer ishlashi uchun sohani kengaytirish/qisqartirish",
        "Elementning margin qiymatlarini CSS orqali o'zgartirish",
        "Oyna kengligini hisoblab chiqish",
        "Elementni to'liq ekrandan tashqariga chiqarib yuborish"
      ],
      answer: "Element aslida ekranga kirmasidan oldin yoki keyinroq observer ishlashi uchun sohani kengaytirish/qisqartirish"
    },
    {
      id: 11,
      question: "Scroll eventida og'ir funksiyalarni ishlatganda brauzer qotib qolmasligi uchun nima qo'llaniladi?",
      options: [
        "requestAnimationFrame, debouncing yoki throttling",
        "setTimeout yordamida funksiyani cheksiz halqaga kiritish",
        "event.stopPropagation()",
        "IntersectionObserver-ni 0.0 threshold bilan chaqirish"
      ],
      answer: "requestAnimationFrame, debouncing yoki throttling"
    },
    {
      id: 12,
      question: "Nima uchun scrollTop qiymati ba'zida butun bo'lmagan (kasr) son bo'lishi mumkin?",
      options: [
        "Retina va yuqori zichlikdagi ekranlarda piksellar qismlarga (fractional) bo'linishi hisobiga",
        "Brauzer xatosi tufayli",
        "CSS-da margin-bottom ishlatilgani uchun",
        "Sichqoncha bilan scroll qilingani uchun"
      ],
      answer: "Retina va yuqori zichlikdagi ekranlarda piksellar qismlarga (fractional) bo'linishi hisobiga"
    }
  ]
};
