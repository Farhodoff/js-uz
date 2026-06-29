export const jsWhat = {
  id: "jsWhat",
  title: "JavaScriptga Kirish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### JavaScript nima?
* **JavaScript (JS):** Bu veb-sahifalarni jonlantirish, ularga dinamik xatti-harakatlar va interaktivlik qo'shish uchun ishlatiladigan dasturlash tilidir. Dastlab faqat brauzerlar ichida ishlash uchun mo'ljallangan bo'lsa, bugungi kunda serverlardan tortib sun'iy intellekt tizimlarigacha qo'llaniladi.
* **ECMAScript:** Bu JavaScript tili asoslangan standartdir. Brauzerlar bir xil standartdagi kodlarni tushunishi uchun ushbu standart qoidalari yangilanib turadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **inson tanasini yaratmoqchisiz**:
* **HTML (Suyak karkasi):** Bu insonning skeleti. Unda ko'zlar, qo'llar va oyoqlar qayerda joylashishi ko'rsatiladi, lekin ular hali harakatlanmaydi va chiroyga ega emas.
* **CSS (Kiyim va Teri):** Bu insonning tashqi ko'rinishi. Ko'zining rangi, sochlarining turi, kiygan kiyimlari. Bu dizayn va uslubdir.
* **JavaScript (Miya va Muskullar):** Bu insonning harakatlanishi, gapirishi, o'ylashi va atrof-muhit bilan muloqot qilishi. Tugma bosilganda qo'lning ko'tarilishi yoki savolga miya orqali javob berilishi JavaScript hisoblanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda o'zgaruvchi va konsol xabari)
O'zgaruvchilar yaratish va ma'lumotlarni konsolga chop etish:
\`\`\`javascript
// O'zgaruvchilar e'lon qilish
const userName = "Sardor";
let attemptCount = 3;

// let yordamida yaratilgan o'zgaruvchini o'zgartirish mumkin
attemptCount = attemptCount - 1;

console.log(\`Salom, \${userName}! Sizda \${attemptCount}ta urinish qoldi.\`);
// Natija: Salom, Sardor! Sizda 2ta urinish qoldi.
\`\`\`

### 2. Intermediate Example (Tugma bosilganda sahifani o'zgartirish)
Foydalanuvchi interaktivligi bilan ishlash (DOM manipulyatsiyasi):
\`\`\`javascript
// HTML-dagi tugma va matn elementlarini aniqlaymiz
const subscribeBtn = document.getElementById("sub-btn");
const statusText = document.getElementById("status-text");

// Tugma bosilganda ishga tushadigan funksiya
subscribeBtn.addEventListener("click", () => {
  statusText.textContent = "Siz kanalga muvaffaqiyatli obuna bo'ldingiz! 🎉";
  subscribeBtn.textContent = "Obuna bo'lindi";
  subscribeBtn.disabled = true; // Tugmani faolsizlantirish
});
\`\`\`

### 3. Advanced Example (API-dan ma'lumot yuklash va sahifaga chiqarish)
Asinxron Fetch so'rovi orqali ma'lumotlarni yuklab olish:
\`\`\`javascript
async function fetchWeather() {
  try {
    console.log("Ob-havo ma'lumotlari yuklanmoqda...");
    const response = await fetch("https://api.weatherapi.com/v1/current.json?q=Tashkent");
    
    if (!response.ok) throw new Error("Tarmoq xatosi!");
    
    const data = await response.json();
    document.getElementById("temp").textContent = \`\${data.current.temp_c}°C\`;
    console.log("Ma'lumot ekranga chiqarildi.");
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

fetchWeather();
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Engine va JIT kompilyatsiyasi
JavaScript kodi oddiy matn ko'rinishida yoziladi. Kompyuter yoki brauzer uni bevosita tushunmaydi. Kodni ishga tushirish uchun brauzer ichidagi **JavaScript Dvigatellari** (masalan, Google Chrome va Node.js uchun **V8**, Firefox uchun **SpiderMonkey**) ishlaydi.

Dvigatel ishlash bosqichlari:
1. **Parsing (Tahlil qilish):** Kod satrma-satr o'qilib, uning sintaktik daraxti — **AST (Abstract Syntax Tree)** yaratiladi.
2. **Kompilyatsiya (JIT - Just-In-Time):** JavaScript nafaqat interpretator, balki JIT kompilyatordan foydalanadi. Kod bajarilayotgan paytning o'zida tezda mashina kodiga o'giriladi. Bu tilning juda tez ishlashiga yordam beradi.
3. **Execution (Bajarilish):** Call Stack va Memory Heap yordamida funksiyalar va xotira boshqariladi.

> [!NOTE]
> JavaScript **Single-Threaded** (bir oqimli) tildir, ya'ni bir vaqtda faqat bitta vazifani bajara oladi. Asinxron operatsiyalar brauzerning Web API qismiga topshiriladi va Event Loop orqali boshqariladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Skriptni HTML hujjat boshida defer/async-siz chaqirish
🔴 **YOMON:**
\`\`\`html
<head>
  <script src="main.js"></script>
</head>
\`\`\`
Bu holda brauzer skriptni to'liq yuklab, ishga tushirgunicha HTML sahifa yuklanishi to'xtab qoladi (render-blocking). Skript DOM elementlarini topa olmay xato berishi mumkin.

🟢 **YAXSHI:**
\`\`\`html
<head>
  <script src="main.js" defer></script>
</head>
\`\`\`
\`defer\` atributi skriptni orqa fonda yuklab, faqat butun HTML tahlil qilinib bo'lingach ishga tushiradi.

### 2. \`const\` bilan yaratilgan o'zgaruvchini qayta o'zgartirishga urinish
🔴 **YOMON:**
\`\`\`javascript
const userRole = "user";
userRole = "admin"; // TypeError: Assignment to constant variable.
\`\`\`

🟢 **YAXSHI:**
Qiymati keyinchalik o'zgaradigan o'zgaruvchilar uchun har doim \`let\` kalit so'zidan foydalaning:
\`\`\`javascript
let userRole = "user";
userRole = "admin";
\`\`\`

### 3. \`undefined\` va \`null\` qiymatlarini chalkashtirish
* \`undefined\` — o'zgaruvchi e'lon qilingan, lekin unga hali hech qanday qiymat berilmaganligini bildiradi (avtomatik beriladi).
* \`null\` — dasturchi tomonidan ataylab berilgan bo'sh, yo'q qiymatdir.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript nima va u qaysi standartga asoslangan?
   * **Javob:** JavaScript — bu veb-sahifalarga dinamiklik va interaktivlik beruvchi til bo'lib, u ECMAScript (ES) standartiga asoslanadi.
2. **Savol:** \`let\`, \`const\` va \`var\` farqlari nimada?
   * **Javob:** \`var\` global yoki funksiya scope-ga ega va hoist bo'ladi. \`let\` va \`const\` esa block scope-ga ega. \`const\` qiymatini qayta e'lon qilib yoki o'zgartirib bo'lmaydi.
3. **Savol:** JavaScript-da qanday ibtidoiy (primitive) ma'lumot turlari bor?
   * **Javob:** 7 ta primitive tur mavjud: String, Number, Boolean, Null, Undefined, Symbol va BigInt.
4. **Savol:** \`typeof\` operatori nima vazifani bajaradi?
   * **Javob:** \`typeof\` o'zgaruvchi yoki qiymatning ma'lumot turini matn ko'rinishida qaytaradi (masalan: \`"string"\`, \`"number"\`).

### Middle (5–8)
5. **Savol:** Dynamic Typing (Dinamik tiplash) nima degani?
   * **Javob:** O'zgaruvchi yaratilayotganda uning turi aniq ko'rsatilmaydi. Uning turi ichiga yuklangan qiymatga qarab dinamik ravishda aniqlanadi va ish jarayonida o'zgarishi mumkin.
6. **Savol:** \`==\` va \`===\` operatorlarining farqi nimada?
   * **Javob:** \`==\` (loosely equal) solishtirishdan oldin tiplarni bir xil ko'rinishga keltirib tekshiradi. \`===\` (strictly equal) esa ham turni, ham qiymatni qat'iy tekshiradi.
7. **Savol:** Nima uchun \`typeof null\` ning javobi \`"object"\` chiqadi?
   * **Javob:** Bu JavaScript tili ilk yaratilgan vaqtda yuz bergan va keyinchalik eski kodlar buzilib ketmasligi uchun o'zgartirilmagan tarixiy bug (xatolik) hisoblanadi.
8. **Savol:** \`defer\` va \`async\` atributlarining farqi nimada?
   * **Javob:** Ikkisi ham skriptni parallel yuklaydi. \`async\` skript tayyor bo'lishi bilanoq ishga tushadi va HTML tahlilini to'xtatib qo'yishi mumkin. \`defer\` esa faqat HTML hujjat to'liq yuklangandan so'ng kodlarni ketma-ket bajaradi.

### Senior (9–12)
9. **Savol:** Just-In-Time (JIT) kompilyatsiyasi qanday ishlaydi?
   * **Javob:** JS Dvigateli kod bajarilishi jarayonida tez-tez chaqiriladigan funksiyalarni (hot functions) kuzatadi va ularni interpretatordan to'g'ridan-to'g'ri tezkor mashina kodiga o'tkazadi (profiling va kompilyatsiya qorishmasi).
10. **Savol:** Garbage Collector xotirani qanday tozalaydi?
    * **Javob:** Asosan "Mark-and-Sweep" algoritmi orqali. Global obyekt (root) dan boshlab bog'lanishlar bo'ylab obyeklar tekshiriladi. Kirish imkoni bo'lmagan (erishib bo'lmaydigan) obyektlar xotiradan tozalanadi.
11. **Savol:** Nima uchun JavaScript Single-Threaded bo'lsa ham non-blocking (qotib qolmaydigan) hisoblanadi?
    * **Javob:** Chunki og'ir asinxron topshiriqlar (taymerlar, API so'rovlari) brauzerning Web API qismiga uzatiladi. Ular tugagach Event Loop orqali asinxron callbacklar Call Stack bo'shaganda ishga tushiriladi.
12. **Savol:** Strict Mode (\`'use strict'\`) nima va u qanday foyda beradi?
    * **Javob:** Kodni qat'iy rejimda ishlatish uchun mo'ljallangan. U e'lon qilinmagan o'zgaruvchilardan foydalanishni taqiqlaydi, xavfsiz bo'lmagan amallarda xatolik otadi va JS dvigateliga kodni yaxshiroq optimallashtirishga imkon beradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

JavaScript veb-sahifadagi HTML elementlarni manipulyatsiya qilish va CSS stillarini dinamik boshqarish orqali haqiqiy "miya" va boshqaruvchi rolimni bajaradi. Quyidagi diagrammada HTML, CSS va JavaScript o'rtasidagi munosabat tasvirlangan:

\`\`\`mermaid
graph TD
    WebPage[Veb-sahifa] --> HTML[HTML: Struktura va Tarkib suyak karkasi]
    WebPage --> CSS[CSS: Stil va Tashqi ko'rinish kiyimlar/chiroy]
    WebPage --> JS[JavaScript: Miya va Interaktivlik muloqot/xulq-atvor]
    JS -->|Tarkibni o'zgartiradi / DOM manipulyatsiyasi| HTML
    JS -->|Dinamik uslub beradi / Stil manipulyatsiyasi| CSS
\`\`\`

Ushbu darsning amaliy topshiriqlari yordamida o'zingizning ilk JS funksiyangizni yozasiz, o'zgaruvchilarni e'lon qilasiz va ma'lumot turlarini \`typeof\` operatori bilan aniqlashni o'rganasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi interaktiv testlar orqali JavaScript asoslari, sintaksis, ma'lumot turlari va brauzerda skript yuklanish tartiblari haqida olgan bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Tungi/Kunduzgi rejim (Dark/Light Mode) almashtirgichi
Haqiqiy loyihalarda foydalanuvchiga qulaylik yaratish uchun qorong'u fon rejimini yoqish imkoniyati qo'shiladi. Bu butunlay JavaScript boshqaruvida bo'ladi.

#### Kod yechimi:
\`\`\`javascript
// 1. O'zgartiruvchi tugmani va sahifa tanasini (body) olamiz
const toggleBtn = document.querySelector(".theme-toggle");

// 2. Tugma bosilishini doimiy eshitamiz
toggleBtn.addEventListener("click", () => {
  // 3. body elementining 'dark-theme' klassini o'zgartiramiz
  document.body.classList.toggle("dark-theme");
  
  // 4. Holatni tekshirib konsolda aks ettiramiz
  const isDarkMode = document.body.classList.contains("dark-theme");
  console.log(\`Tizim rejimi: \${isDarkMode ? "Qorong'u" : "Yorug'"}\`);
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **defer yordamida yuklash:** Sahifa yuklanish tezligini (LCP ko'rsatkichini) oshirish uchun har doim JavaScript fayllarini \`<script defer>\` atributi bilan yuklang.
* **Minifikatsiya qilish:** Ishlab chiqarishga (production) yuborishdan oldin keraksiz bo'shliqlar va izohlardan tozalash orqali JavaScript fayllarining hajmini kamaytiring.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Dastur (Hello World)",
      instruction: "Foydalanuvchiga salom berish uchun `sayHello()` nomli funksiya yozing. U har doim `'Hello, World!'` satrini qaytarishi kerak.",
      startingCode: "function sayHello() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`return 'Hello, World!';` deb yozing.",
      test: "const sandbox = new Function(code + '; return sayHello;');\nconst fn = sandbox();\nconst res = fn();\nif (res === 'Hello, World!') return null;\nreturn 'sayHello funksiyasi \"Hello, World!\" matnini qaytarmadi';"
    },
    {
      id: 2,
      title: "O'zgaruvchilarni E'lon Qilish",
      instruction: "JavaScript-da o'zgaruvchilar bilan ishlashni mashq qilamiz. `sum(a, b)` funksiyasini yozing. U ikkita sonni qabul qiladi, ularning yig'indisini `result` nomli o'zgaruvchida saqlaydi va ushbu `result`ni qaytaradi.",
      startingCode: "function sum(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`let result = a + b;` deb o'zgaruvchi e'lon qiling va uni `return result;` orqali qaytaring.",
      test: "if (!code.includes('result')) return 'Kodingizda result nomli o\\'zgaruvchi e\\'lon qilinishi shart';\nconst sandbox = new Function(code + '; return sum;');\nconst fn = sandbox();\nif (fn(5, 10) === 15 && fn(-1, 1) === 0) return null;\nreturn 'sum funksiyasi yig\\'indini to\\'g\\'ri hisoblab qaytarmadi';"
    },
    {
      id: 3,
      title: "Turlarni Aniqlash (typeof)",
      instruction: "Berilgan qiymatning ma'lumot turini (data type) aniqlab beruvchi `getType(value)` funksiyasini yozing. Buning uchun `typeof` operatoridan foydalaning.",
      startingCode: "function getType(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`return typeof value;` ko'rinishida yozing.",
      test: "const sandbox = new Function(code + '; return getType;');\nconst fn = sandbox();\nif (fn(42) === 'number' && fn('Salom') === 'string' && fn(true) === 'boolean') return null;\nreturn 'getType funksiyasi ma\\'lumot turini to\\'g\\'ri qaytarmadi';"
    },
    {
      id: 4,
      title: "O'zgarmaslar (const)",
      instruction: "`getPi()` funksiyasini yozing. Uning ichida `PI` nomli o'zgarmas `const` e'lon qilib, unga `3.14` qiymatini bering va uni qaytaring.",
      startingCode: "function getPi() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "const PI = 3.14; qilib uni return qiling.",
      test: "if (!code.includes('const PI')) return 'const PI e\\'lon qilinishi kerak';\nconst fn = new Function(code + '; return getPi;')();\nif (fn() === 3.14) return null;\nreturn 'Funksiya 3.14 qaytarishi kerak';"
    },
    {
      id: 5,
      title: "Bo'sh qiymat (null)",
      instruction: "Foydalanuvchini tizimdan chiqaruvchi `logout()` funksiyasini tuzing. U shunchaki `null` qiymatini qaytarsin (ya'ni foydalanuvchi yo'q).",
      startingCode: "function logout() {\n  // Kodni yozing\n}",
      hint: "return null; ishlating.",
      test: "const fn = new Function(code + '; return logout;')();\nif (fn() === null) return null;\nreturn 'null qaytarilmadi';"
    },
    {
      id: 6,
      title: "Qiymat berilmaganlik (undefined)",
      instruction: "`getUndefined()` funksiyasi hech narsa qaytarmasligini (yoki to'g'ridan to'g'ri `undefined` qaytarishini) ta'minlang.",
      startingCode: "function getUndefined() {\n  // Kodni yozing\n}",
      hint: "Shunchaki funksiya ichini bo'sh qoldiring yoki return undefined; yozing.",
      test: "const fn = new Function(code + '; return getUndefined;')();\nif (fn() === undefined) return null;\nreturn 'undefined qaytmadi';"
    },
    {
      id: 7,
      title: "Ikki xil o'zgaruvchi",
      instruction: "`createVariables()` funksiyasida bitta `let age = 20;` va bitta `const name = \"Ali\";` yarating va ularni massivda `[age, name]` ko'rinishida qaytaring.",
      startingCode: "function createVariables() {\n  // Kodni yozing\n}",
      hint: "let va const e'lon qilib return [age, name] qiling.",
      test: "const fn = new Function(code + '; return createVariables;')();\nconst res = fn();\nif (res[0] === 20 && res[1] === 'Ali') return null;\nreturn 'Natija noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Matnlarni qo'shish (String concatenation)",
      instruction: "`greet(name)` funksiyasi foydalanuvchi ismini qabul qilib, unga salom matnini qo'shib qaytarsin. Masalan: greet('Sardor') => 'Salom Sardor'",
      startingCode: "function greet(name) {\n  // Kodni yozing\n}",
      hint: "return 'Salom ' + name; dan foydalaning.",
      test: "const fn = new Function(code + '; return greet;')();\nif (fn('Ali') === 'Salom Ali') return null;\nreturn 'Salomlashuv formati xato';"
    },
    {
      id: 9,
      title: "Boolean qiymatlar",
      instruction: "`isAdult(age)` funksiyasi yosh 18 yoki undan katta bo'lsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function isAdult(age) {\n  // Kodni yozing\n}",
      hint: "return age >= 18; deb yozsangiz kifoya.",
      test: "const fn = new Function(code + '; return isAdult;')();\nif (fn(18) === true && fn(17) === false) return null;\nreturn 'Yoshni tekshirish xato ishladi';"
    },
    {
      id: 10,
      title: "Solishtirish (== va ===)",
      instruction: "Kiritilgan ikki son qat'iy tengligini (type ham, qiymat ham bir xil) tekshiruvchi `isStrictlyEqual(a, b)` yozing.",
      startingCode: "function isStrictlyEqual(a, b) {\n  // Kodni yozing\n}",
      hint: "return a === b; ishlating.",
      test: "const fn = new Function(code + '; return isStrictlyEqual;')();\nif (fn(5, '5') === false && fn(5, 5) === true) return null;\nreturn 'Qat\\'iy tenglik noto\\'g\\'ri ishladi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript nima?",
      options: [
        "Faqat ma'lumotlar bazasini boshqarish uchun ishlatiladigan server tili",
        "Veb-sahifalarga interaktivlik va dinamik xatti-harakatlar qo'shish uchun ishlatiladigan dasturlash tili",
        "Faqat sahifaning dizayni va ranglarini sozlash uchun ishlatiladigan uslublar jadvali",
        "Brauzer o'rnatish dasturi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript — bu veb-sahifalarga jon kirituvchi, ularni interaktiv va dinamik qiluvchi asosiy dasturlash tilidir."
    },
    {
      id: 2,
      question: "HTML, CSS va JavaScript o'rtasidagi bog'liqlikni qaysi analogiya eng yaxshi tushuntiradi?",
      options: [
        "HTML — kiyim, CSS — miya, JavaScript — suyak karkasi",
        "HTML — suyak karkasi, CSS — tashqi ko'rinish (kiyim), JavaScript — miya (harakat)",
        "HTML — dvigatel, CSS — yoqilg'i, JavaScript — g'ildiraklar",
        "Ular o'rtasida hech qanday bog'liqlik yo'q"
      ],
      correctAnswer: 1,
      explanation: "HTML sahifaning tuzilishini (suyagini) yaratadi, CSS unga chiroy (kiyim) beradi, JavaScript esa sahifani harakatga keltiradi."
    },
    {
      id: 3,
      question: "JavaScript-ni veb-sahifaga ulash uchun qaysi tegdan foydalaniladi?",
      options: [
        "<style>",
        "<link>",
        "<script>",
        "<javascript>"
      ],
      correctAnswer: 2,
      explanation: "Tashqi yoki ichki JavaScript kodlarini HTML sahifaga ulash uchun <script> tegi ishlatiladi."
    },
    {
      id: 4,
      question: "Quyidagi yuklash usullaridan qaysi biri HTML to'liq yuklangandan keyingina skriptni bajaradi, lekin skriptni parallel ravishda yuklaydi?",
      options: [
        "<script> (oddiy yuklash)",
        "<script async>",
        "<script defer>",
        "<script inline>"
      ],
      correctAnswer: 2,
      explanation: "defer atributi skriptni fonda yuklaydi va faqatgina butun HTML hujjat to'liq tahlil qilingach ishga tushiradi."
    },
    {
      id: 5,
      question: "JavaScript tilini dastlab kim va qancha vaqtda yaratgan?",
      options: [
        "Brendan Eich tomonidan 10 kunda yaratilgan",
        "James Gosling tomonidan 1 yilda yaratilgan",
        "Guido van Rossum tomonidan 3 oyda yaratilgan",
        "Dennis Ritchie tomonidan 5 yilda yaratilgan"
      ],
      correctAnswer: 0,
      explanation: "JavaScript tili 1995-yilda Netscape kompaniyasida Brendan Eich tomonidan atigi 10 kun ichida yaratilgan."
    },
    {
      id: 6,
      question: "JavaScript-da qiymati keyinchalik o'zgarmaydigan o'zgaruvchini (konstanta) e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "let",
        "var",
        "const",
        "static"
      ],
      correctAnswer: 2,
      explanation: "const (constant) kalit so'zi qiymati o'zgarmaydigan, faqat o'qish uchun mo'ljallangan o'zgaruvchilarni e'lon qilishda ishlatiladi."
    },
    {
      id: 7,
      question: "JavaScript-da ma'lumot turlarini aniqlash uchun qaysi operatordan foydalaniladi?",
      options: [
        "typeof",
        "instanceof",
        "typeOf",
        "checkType"
      ],
      correctAnswer: 0,
      explanation: "typeof operatori uzatilgan qiymat yoki o'zgaruvchining ma'lumot turini matn ko'rinishida qaytaradi."
    },
    {
      id: 8,
      question: "JavaScript dynamic (dinamik) yoki static (statik) tiplashga ega tilmi?",
      options: [
        "Statik tiplashga ega, o'zgaruvchi turini oldindan e'lon qilish shart",
        "Dinamik tiplashga ega, o'zgaruvchining turi unga yuklangan qiymatga qarab o'zgarishi mumkin",
        "Tiplar umuman mavjud emas",
        "Faqat obyektlar va massivlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript dinamik tiplangan tildir (dynamically typed). O'zgaruvchi turi ichidagi qiymatga qarab belgilanadi va o'zgarishi mumkin."
    },
    {
      id: 9,
      question: "JavaScript brauzerda qanday bajariladi (under the hood)?",
      options: [
        "Faqat HTML kodi kabi bevosita o'qiladi, kompilyatsiya qilinmaydi",
        "JIT (Just-In-Time) kompilyatori yordamida mashina kodiga o'girilib, tezkor ishga tushiriladi",
        "Faqat serverga yuborilib, u yerda bajariladi",
        "Maxsus Java virtual mashinasida (JVM) ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Brauzerdagi JavaScript dvigatellari kodni JIT kompilyatsiyasi yordamida tezkorlik bilan mashina kodiga o'tkazib bajaradi."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(typeof null);\n```",
      options: [
        "'null'",
        "'undefined'",
        "'object'",
        "'error'"
      ],
      correctAnswer: 2,
      explanation: "Tarixiy xatolik (bug) tufayli JavaScript-da typeof null ning natijasi 'object' deb qaytadi."
    },
    {
      id: 11,
      question: "Nima uchun <script> tegini defer yoki asyncsiz sahifaning eng tepasiga (<head> ichiga) joylashtirish tavsiya etilmaydi?",
      options: [
        "Skript ishlamay qoladi va xato beradi",
        "Skript sahifa yuklanishini bloklab qo'yadi va DOM elementlari hali yaratilmasdan skript bajarilib, xatolar kelib chiqadi",
        "Brauzer xavfsizlik nuqtai nazaridan uni taqiqlaydi",
        "Bu sahifaning ranglarini o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Sukut bo'yicha skript HTML tahlilini to'xtatadi. Agar u tepada bo'lsa, skript pastdagi elementlarni topa olmaydi va sahifa sekinlashadi."
    },
    {
      id: 12,
      question: "ECMA nima va ECMAScript nima uchun kerak?",
      options: [
        "Bu JavaScript-ning yangi raqobatchisi bo'lgan boshqa bir til",
        "Bu JavaScript tilining standartlashtirilgan qoidalari bo'lib, turli brauzerlarda bir xil ishlashini ta'minlaydi",
        "Bu ma'lumotlar bazasini boshqaruvchi dastur",
        "Faqat animatsiyalar yaratish uchun standart"
      ],
      correctAnswer: 1,
      explanation: "ECMAScript — bu standart bo'lib, JavaScript tili shu standart qoidalari asosida rivojlanadi va barcha brauzerlar unga amal qilishga harakat qiladi."
    }
  ]
};
