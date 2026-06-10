export const timers = {
  id: "timers",
  title: "Vaqt funksiyalari (Timers)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Vaqt funksiyalari (Timers) nima?
**Vaqt funksiyalari (Timers)** — bu JavaScript kodini ma'lum bir vaqtdan keyin ishga tushirish (kechiktirish) yoki ma'lum bir vaqt oralig'ida takroriy ravishda bajarish imkonini beruvchi asinxron mexanizmdir. Brauzer muhiti va Node.js bizga kod oqimini vaqtinchalik to'xtatmasdan, ma'lum vazifalarni kelajakka rejalashtirish uchun ushbu taymerlarni taqdim etadi.

### Real hayotiy analogiya
Tasavvur qiling, siz oshxonada **ovqat pishiryapsiz**:
* **Budilnik (setTimeout):** Pechga pirogni qo'yib, taymerni 45 daqiqaga o'rnatdingiz. Vaqt tugagach, budilnik bir marta jiringlaydi va siz pirogni olasiz. Bu faqat bir marta sodir bo'ladigan jarayon.
* **Metronom (setInterval):** Siz har 10 soniyada qozondagi ovqatni aralashtirib turishingiz kerak. Har 10 soniyada qo'ng'iroq chalinadi, aralashtirasiz va bu jarayon siz gazni o'chirmaguningizcha (\`clearInterval\`) cheksiz takrorlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (setTimeout va clearTimeout)
Kodni bir marta kechiktirib ishga tushirish va zarurat tug'ilganda uni bekor qilish:
\`\`\`javascript
// 3 soniyadan keyin ishga tushadigan taymer
const welcomeTimer = setTimeout(() => {
  console.log("Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.");
}, 3000);

// Agar foydalanuvchi sahifadan tezda chiqib ketsa, taymerni bekor qilamiz:
const cancelBtn = document.querySelector("#cancel-btn");
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    clearTimeout(welcomeTimer);
    console.log("Taymer bekor qilindi, xabar ko'rsatilmaydi.");
  });
}
\`\`\`

### 2. Intermediate Example (setInterval va clearInterval)
Har soniyada vaqtni ko'rsatib turuvchi sekundomer (soat) yaratish va uni to'xtatish:
\`\`\`javascript
let seconds = 0;
const timeDisplay = document.querySelector("#time");

const counterInterval = setInterval(() => {
  seconds++;
  if (timeDisplay) {
    timeDisplay.textContent = \`O'tgan vaqt: \${seconds} soniya\`;
  }
  
  // 10 soniyadan keyin avtomatik to'xtatamiz
  if (seconds >= 10) {
    clearInterval(counterInterval);
    console.log("Sanoq yakunlandi.");
  }
}, 1000);
\`\`\`

### 3. Advanced Example (Rekursiv setTimeout orqali barqaror interval yaratish)
\`setInterval\` o'zgaruvchan tarmoq so'rovlari yoki og'ir hisob-kitoblar tufayli bir-birini bosib ketishi mumkin. Buning oldini olish uchun rekursiv \`setTimeout\` ishlatiladi:
\`\`\`javascript
let delay = 1000;

function sendPingToServer() {
  console.log("Serverga ping yuborildi...");
  
  // So'rov tugagach yoki ma'lum shart ostida keyingi taymerni o'rnatamiz
  // Bu orqali oldingi kod to'liq bajarilishi kafolatlanadi
  setTimeout(sendPingToServer, delay);
}

// Birinchi marta ishga tushirish
setTimeout(sendPingToServer, delay);
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Event Loop va Timers
JavaScript — **single-threaded** (bir oqimli) til. Bu degani, u bir vaqtning o'zida faqat bitta amalni bajara oladi. Taymerlar qanday qilib asinxron ishlaydi?

1. **Web APIs:** \`setTimeout\` yoki \`setInterval\` chaqirilganda, brauzer (yoki Node.js) taymerni o'zining ichki tizimida (Web API) hisoblashni boshlaydi. JS asosiy oqimi esa bloklanmasdan o'z ishini davom ettiradi.
2. **Callback Queue (Macrotask Queue):** Taymer belgilangan vaqtga yetganda, uning callback funksiyasi **Callback Queue** (navbat)ga joylashtiriladi.
3. **Event Loop:** Event Loop doimiy ravishda **Call Stack** (bajarilish darchasi) bo'shligini tekshiradi. Call Stackdagi barcha sinxron kodlar tugab bo'lingachgina, navbatdagi callback funksiyasini Stackka olib kiradi va bajaradi.

> [!IMPORTANT]
> \`setTimeout(() => {}, 0)\` kodni darhol bajarmaydi. U faqat joriy sinxron kodlar (Call Stack) to'liq bajarilib bo'lingandan so'ng, callbackni navbatdagi birinchi imkoniyatda ishga tushirishni rejalashtiradi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchining kiritishini kutish (Debounce) loyihasi
Foydalanuvchi qidiruv maydoniga yozayotganda, har bir harfda serverga so'rov yubormaslik uchun kiritish tugagandan so'ng 500ms kutib, keyin so'rov yuborish (Debounce) taymerini yaratamiz.

#### HTML Tuzilmasi:
\`\`\`html
<input type="text" id="search" placeholder="Qidiruv matnini kiriting..." />
<p id="status">Kiritish kutilmoqda...</p>
\`\`\`

#### JavaScript Kodu:
\`\`\`javascript
let debounceTimer;
const searchInput = document.getElementById("search");
const statusText = document.getElementById("status");

searchInput.addEventListener("input", (event) => {
  statusText.textContent = "Yozilmoqda...";
  
  // Oldingi taymerni o'chirib yuboramiz
  clearTimeout(debounceTimer);
  
  // Yangi 500ms lik taymer o'rnatamiz
  debounceTimer = setTimeout(() => {
    const query = event.target.value;
    statusText.textContent = \`Serverga so'rov yuborildi: "\${query}"\`;
  }, 500);
});
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`setInterval\`ni to'xtatishni unutish (Memory Leak)
Agar interval keraksiz bo'lib qolganda to'xtatilmasa, u sahifa yopilguncha xotirani egallab, ishlayveradi.
* **Noto'g'ri:**
  \`\`\`javascript
  // Foydalanuvchi sahifani tark etsa ham ishlayveradi
  setInterval(() => {
    console.log("Ma'lumotlar yangilanmoqda...");
  }, 5000);
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const updateInterval = setInterval(() => {
    console.log("Ma'lumotlar yangilanmoqda...");
  }, 5000);
  
  // Sahifa tark etilayotganda yoki shart bajarilganda:
  clearInterval(updateInterval);
  \`\`\`

### 2. Taymerga funksiyani noto'g'ri uzatish
Taymerga funksiyaning o'zini (reference) emas, balki uni chaqirib natijasini uzatib yuborish.
* **Noto'g'ri:**
  \`\`\`javascript
  // sayHello() darhol ishlaydi va uning qaytargan undefined qiymati setTimeoutga uzatiladi
  setTimeout(sayHello(), 2000);
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  // Funksiya sarlavhasi uzatiladi yoki arrow funksiya ichiga olinadi
  setTimeout(sayHello, 2000);
  // Yoki:
  setTimeout(() => sayHello(), 2000);
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod | Vazifasi | Qaytaradigan Qiymati | Bekor qilish usuli |
| :--- | :--- | :--- | :--- |
| \`setTimeout(callback, delay, ...args)\` | Kodni \`delay\` millisekunddan keyin **bir marta** bajaradi | Unikal taymer ID (raqam) | \`clearTimeout(id)\` |
| \`setInterval(callback, delay, ...args)\` | Kodni har \`delay\` millisekundda **takroran** bajaradi | Unikal interval ID (raqam) | \`clearInterval(id)\` |
| \`requestAnimationFrame(callback)\` | Ekranni keyingi yangilanishiga (FPS) moslab chaqiradi | Animatsiya IDsi | \`cancelAnimationFrame(id)\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Nega ba'zida \`setTimeout(() => {}, 1000)\` roppa-rosa 1 soniyada ishlamaydi, sal kechikadi?
Chunki JavaScript bir oqimli. Agar joriy paytda Call Stackda og'ir hisob-kitoblar bajarilayotgan bo'lsa, taymer tugaganidan keyin ham callback navbatda (Queue) stack bo'shashini kutib turishga majbur bo'ladi.

### 2. Taymer IDsi nima va u nega kerak?
Taymer ID — bu \`setTimeout\` yoki \`setInterval\` chaqirilganda qaytariladigan musbat butun sondir. U yordamida brauzer xotirasida rejalashtirilgan shu taymerni topib, \`clearTimeout\` yoki \`clearInterval\` yordamida o'chirib yuborish mumkin.

### 3. Taymerga qo'shimcha parametrlar uzatsa bo'ladimi?
Ha, uchinchi va undan keyingi argumentlar sifatida uzatilgan qiymatlar callback funksiyaga argument bo'lib boradi: \`setTimeout((name) => console.log(name), 1000, "Ali")\`.

### 4. \`setTimeout\` ichidagi \`this\` qaysi obyektga ishora qiladi?
Oddiy funksiya ishlatilganda \`this\` global \`window\` obyektiga ishora qiladi. Agar \`this\`ni saqlab qolmoqchi bo'lsangiz, arrow funksiyalardan (\`() => {}\`) foydalanishingiz kerak.

---

## 8. 🧠 O'z-o'zini Tekshirish uchun Testlar

1. \`setTimeout\` va \`setInterval\` o'rtasidagi asosiy farq nima?
2. \`setTimeout(() => {}, 0)\` nima vazifani bajaradi?
3. Nima uchun taymerlarni to'xtatish (clear qilish) muhim?
4. Call Stack band bo'lsa, taymer callbacki qayerda kutib turadi?

---

## 9. 🚀 Amaliy Topsiriqlar (Ko'rsatma)

Ushbu bo'lim ostida taqdim etilgan amaliy mashqlar yordamida taymerlar bilan ishlash, intervallarni o'rnatish va vaqtni boshqarish ko'nikmalaringizni sinab ko'ring. Har bir mashq kodni to'g'ri va xavfsiz boshqarishga qaratilgan.
`,
  exercises: [
  {
    "id": 1,
    "title": "Kechiktirilgan Xabar (setTimeout)",
    "instruction": "Taqdim etilgan `showMessage` funksiyasini 1.5 soniyadan (1500 millisekund) keyin ishga tushiradigan kod yozing. Chaqiriq vaqtida birinchi argument sifatida `\"Muvaffaqiyatli!\"` matnini uzating.",
    "startingCode": "function showMessage(text) {\n  console.log(text);\n}\n\n// Kodni shu yerda yozing\n",
    "hint": "setTimeout(showMessage, 1500, \"Muvaffaqiyatli!\") yoki setTimeout(() => showMessage(\"Muvaffaqiyatli!\"), 1500)",
    "test": "const sandbox = new Function('setTimeout', 'showMessage', code);\nlet called = false;\nlet delayVal = 0;\nlet argVal = '';\nconst mockSetTimeout = (cb, delay, ...args) => {\n  called = true;\n  delayVal = delay;\n  argVal = args[0] || '';\n  if (typeof cb === 'function') cb(...args);\n};\nconst mockShowMessage = (text) => {};\nsandbox(mockSetTimeout, mockShowMessage);\nif (!called) return 'setTimeout funksiyasi chaqirilmadi';\nif (delayVal !== 1500) return 'Kechikish vaqti 1500 millisekund bo\\'lishi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Intervalni To'xtatish (clearInterval)",
    "instruction": "Har soniyada `counter` qiymatini 1 ga oshiruvchi interval o'rnatilgan. `counter` qiymati 5 ga yetganida (ya'ni 5 marta oshgandan keyin) joriy intervalni to'liq to'xtatuvchi (bekor qiluvchi) kod yozing.",
    "startingCode": "let counter = 0;\nconst intervalId = setInterval(() => {\n  counter++;\n  // Kodni shu yerda yozing\n  \n}, 1000);",
    "hint": "if (counter === 5) { clearInterval(intervalId); }",
    "test": "if (!code.includes('clearInterval')) return 'clearInterval funksiyasi ishlatilmadi';\nif (!code.includes('intervalId')) return 'clearInterval-ga to\\'g\\'ri intervalId uzatilmadi';\nif (!code.includes('counter === 5') && !code.includes('counter >= 5')) return 'counter 5 ga tengligi tekshirilmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Debounce Taymeri (clearTimeout)",
    "instruction": "Har safar input yozilganda ishlaydian `processInput` nomli funksiyani rejalashtirishimiz kerak. Agar avval rejalashtirilgan taymer (`searchTimer`) mavjud bo'lsa, uni to'xtatib (clear qilib), keyin yangi 300 millisekundlik taymerni `searchTimer`ga saqlaydigan funksiya yarating.",
    "startingCode": "let searchTimer = null;\nfunction processInput() {\n  console.log(\"Qidirilmoqda...\");\n}\n\nfunction handleSearch() {\n  // Kodni shu yerda yozing\n  \n}",
    "hint": "clearTimeout(searchTimer); searchTimer = setTimeout(processInput, 300);",
    "test": "if (!code.includes('clearTimeout(searchTimer)')) return 'Avvalgi searchTimer bekor qilinmadi (clearTimeout)';\nif (!code.includes('setTimeout') || !code.includes('300')) return 'Yangi 300ms lik setTimeout rejalashtirilmadi';\nif (!code.includes('searchTimer = setTimeout')) return 'Yangi taymer ID si searchTimer o\\'zgaruvchisiga saqlanmadi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "`setTimeout` va `setInterval` funksiyalari o'rtasidagi asosiy farq nimada?",
    "options": [
      "`setTimeout` ma'lum vaqtdan keyin kodni faqat bir marta ishga tushiradi, `setInterval` esa ko'rsatilgan vaqt oralig'ida uni takrorlab turadi",
      "`setInterval` faqat soniyalar bilan, `setTimeout` esa millisekundlar bilan ishlaydi",
      "`setTimeout` asinxron, `setInterval` esa sinxron ishlaydi",
      "Ular mutlaqo bir xil ishlaydi, faqat nomlanishi farq qiladi"
    ],
    "correctAnswer": 0,
    "explanation": "`setTimeout` berilgan callback funksiyasini faqat bir marta belgilangan vaqtdan keyin bajaradi. `setInterval` esa har safar belgilangan vaqt oralig'i o'tganda funksiyani takroran chaqiraveradi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod ishga tushgandan so'ng, konsolga xabarlar qaysi tartibda chiqadi?\n```javascript\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');\n```",
    "options": [
      "1, 2, 3",
      "1, 3, 2",
      "2, 1, 3",
      "3, 1, 2"
    ],
    "correctAnswer": 1,
    "explanation": "`setTimeout` kechikishi `0` bo'lsa ham, u asinxron vazifa (macrotask) bo'lgani uchun Callback Queue-ga qo'shiladi va faqat joriy sinxron kodlar (Call Stack) to'liq bajarib bo'lingandan keyingina ishlaydi."
  },
  {
    "id": 3,
    "question": "`setInterval` taymerini butunlay to'xtatish uchun qaysi funksiyadan foydalaniladi?",
    "options": [
      "`stopInterval()`",
      "`clearInterval()`",
      "`clearTimeout()`",
      "`deleteInterval()`"
    ],
    "correctAnswer": 1,
    "explanation": "`setInterval` chaqirilganda qaytarilgan unikal ID raqamini `clearInterval(id)` funksiyasiga uzatish orqali takroriy taymer bekor qilinadi."
  },
  {
    "id": 4,
    "question": "JavaScript taymerlarida vaqtni belgilash uchun qaysi o'lchov birligidan foydalaniladi?",
    "options": [
      "Soniya (Seconds)",
      "Millisekund (Milliseconds) — ya'ni 1 soniya 1000 millisekundga teng",
      "Mikrosekund (Microseconds)",
      "Daqiqa (Minutes)"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da vaqt parametrlari har doim millisekundlarda beriladi (masalan, 2 soniya = 2000 ms)."
  },
  {
    "id": 5,
    "question": "Agar takroriy amallar bajarilishi uzoq cho'zilsa va navbatdagi qadam avvalgisi tugagandan so'ng aniq vaqt o'tib boshlanishi kafolatlanishi kerak bo'lsa, qaysi usul tavsiya etiladi?",
    "options": [
      "Katta kechikish vaqti bilan `setInterval` ishlatish",
      "Rekursiv `setTimeout` (ya'ni funksiya ichida o'zini yangi `setTimeout` orqali qayta chaqirish)",
      "`while` siklidan foydalanish",
      "`requestAnimationFrame`ni cheksiz tsiklda ishlatish"
    ],
    "correctAnswer": 1,
    "explanation": "Rekursiv `setTimeout` oldingi callback to'liq bajarilib bo'lingachgina navbatdagi taymerni o'rnatadi. Bu orqali intervallarning bir-birini bosib ketishi (overlapping) oldi olinadi."
  },
  {
    "id": 6,
    "question": "`setTimeout` chaqirilganda qaytariladigan qiymat nima?",
    "options": [
      "Taymer natijasini saqlovchi Promise obyekti",
      "Taymerni to'xtatish uchun ishlatiladigan unikal taymer ID si (raqam yoki obyekt)",
      "Callback funksiyasining nusxasi",
      "`undefined`"
    ],
    "correctAnswer": 1,
    "explanation": "Taymer funksiyalari (`setTimeout` / `setInterval`) chaqirilganda musbat butun son (brauzerlarda) yoki taymer obyekti (Node.js da) qaytaradi. Bu ID orqali taymerni keyinchalik bekor qilish mumkin."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda `show` metodi chaqirilganda konsolga nima chiqadi?\n```javascript\nconst user = {\n  name: 'Asad',\n  show() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 1000);\n  }\n};\nuser.show();\n```",
    "options": [
      "'Asad'",
      "undefined (yoki strict rejimda xatolik)",
      "TypeError",
      "null"
    ],
    "correctAnswer": 1,
    "explanation": "Oddiy funksiyalar (regular function) setTimeout ichida global contextda ishlaydi, shuning uchun `this` global `window`ga yoki strict mode-da `undefined`ga ishora qiladi. `this.name` esa mavjud emas."
  },
  {
    "id": 8,
    "question": "`setTimeout(callback)` chaqirilsa-yu, kechikish vaqti ko'rsatilmasa, default holatda qancha vaqt olinadi?",
    "options": [
      "0 millisekund (yoki minimal 4ms brauzer cheklovlariga ko'ra)",
      "1000 millisekund",
      "Sinxron tarzda darhol ishlaydi",
      "Taymer ishlamaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Kechikish vaqti ko'rsatilmaganda u default ravishda `0` millisekund deb olinadi va birinchi imkoniyatda bajarilishi uchun Callback Queue-ga qo'shiladi."
  },
  {
    "id": 9,
    "question": "`setTimeout` yordamida callback funksiyaga parametrlarni qanday uzatish mumkin?",
    "options": [
      "Faqat global o'zgaruvchilardan foydalanish orqali",
      "Uchinchi va undan keyingi argumentlar sifatida uzatish orqali: `setTimeout(callback, delay, arg1, arg2)`",
      "Faqat `bind` metodi orqali",
      "Buning iloji yo'q, callback har doim parametrsiz bo'lishi shart"
    ],
    "correctAnswer": 1,
    "explanation": "`setTimeout` va `setInterval` funksiyalari uchinchi argumentdan boshlab barcha qiymatlarni callback funksiyasiga argument qilib uzatadi."
  },
  {
    "id": 10,
    "question": "JavaScript Event Loop tizimida taymer callbacklari qaysi navbatda qayta ishlanadi?",
    "options": [
      "Microtask Queue",
      "Macrotask Queue (Task Queue)",
      "Call Stack",
      "Render Queue"
    ],
    "correctAnswer": 1,
    "explanation": "Taymer callbacklari (setTimeout, setInterval), DOM hodisalari va tarmoq so'rovlari macrotask hisoblanadi va Macrotask Queue-da navbatini kutadi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilganda konsolda qanday natija ko'rinadi?\n```javascript\nlet x = 10;\nsetTimeout(() => {\n  x += 5;\n}, 1000);\nconsole.log(x);\n```",
    "options": [
      "15",
      "10",
      "NaN",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "`console.log(x)` sinxron kod bo'lib, darhol ishlaydi. `setTimeout` esa asinxron rejalashtirilganligi sababli uning ichidagi o'zgarish 1 soniyadan keyin yuz beradi. Shuning uchun konsolga dastlab `10` chiqadi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst timer = setTimeout(() => console.log('A'), 2000);\nclearTimeout(timer);\n```",
    "options": [
      "Konsolga 'A' yozuvi chiqadi",
      "Konsolga hech narsa chiqmaydi, chunki taymer ishlashidan oldin bekor qilindi",
      "Xatolik yuz beradi",
      "Taymer 2 soniya o'rniga 0 soniyada ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`clearTimeout` funksiyasi taymer ishga tushishidan oldin uning ID sini bekor qiladi, natijada rejalashtirilgan callback funksiyasi hech qachon bajarilmaydi."
  }
]

};
