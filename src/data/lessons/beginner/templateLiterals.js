export const templateLiterals = {
  id: "templateLiterals",
  title: "Template Literals (Backticks)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Template Literals (Shablonli Satrlar) nima?
**Template Literals** — bu JavaScript-da satrlar (stringlar) bilan ishlashning zamonaviy va qulay usuli bo'lib, ES6 (ES2015) standartida taqdim etilgan. Odatda satrlar yozish uchun yakkalik (\`' '\`) yoki qo'shaloq (\`" "\`) tirnoqlardan foydalanardik. Template Literals esa klaviaturadagi \`Esc\` tugmasining ostida joylashgan **backtick (bektik, \` \`)** belgisi yordamida yaratiladi. 

U uchta asosiy afzallikka ega:
1. **Interpolatsiya (String Interpolation):** Satr ichiga o'zgaruvchilar va ifodalarni \`+\` belgisisiz, to'g'ridan-to'g'ri \`\${o'zgaruvchi}\` ko'rinishida joylashtirish.
2. **Ko'p satrlilik (Multiline Strings):** Matnni qo'shimcha birlashtirishlarsiz yoki \`\\n\` (yangi qator) belgilarisiz to'g'ridan-to'g'ri yangi satrdan yozib ketish.
3. **Tegli shablonlar (Tagged Templates):** Satrlarni maxsus funksiyalar yordamida tahlil qilish va qayta ishlash.

### Real hayotiy analogiya
Tasavvur qiling, siz **taklifnoma xati** yozyapsiz:
* **Eski (konkatenatsiya) usuli:** Sizda tayyor matnlar bor. Har bir taklifnoma uchun ism va manzilni alohida qog'ozchalarga yozib, qaychi bilan qirqib, asosiy matnga kley (ya'ni \`+\` operatori) yordamida yopishtirib chiqasiz. Bu juda ko'p vaqt va tartibsizlikka olib keladi.
* **Yangi (Template Literals) usuli:** Sizda bitta shablon varaq bor va unda maxsus bo'sh joylar (placeholderlar) mavjud. Siz shunchaki ism va manzilni o'sha shablondagi bo'shliqlarga to'g'ridan-to'g'ri yozib qo'yasiz. Hech qanday qaychi va kley kerak emas!

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (O'zgaruvchilarni interpolatsiya qilish)
O'zgaruvchilarni satr ichida ishlatish:
\`\`\`javascript
const name = "Sardor";
const age = 22;

// Eski usul (Konkatenatsiya)
const messageOld = "Salom, mening ismim " + name + " va yoshim " + age + "da.";
console.log(messageOld); // "Salom, mening ismim Sardor va yoshim 22da."

// Yangi usul (Template Literals)
const messageNew = \`Salom, mening ismim \${name} va yoshim \${age}da.\`;
console.log(messageNew); // "Salom, mening ismim Sardor va yoshim 22da."
\`\`\`

### 2. Intermediate Example (Ko'p satrli matnlar va ifodalar)
Matnni yangi qatorga o'tkazish va \`\${}\` ichida arifmetik amallar yoki ternary operatorlardan foydalanish:
\`\`\`javascript
// Ko'p satrli matn (Multiline string)
const htmlMarkup = \`
  <div class="user-card">
    <h2>Foydalanuvchi ma'lumotlari</h2>
  </div>
\`;
console.log(htmlMarkup);

// \`\${}\` ichida ifoda (expression) bajarish
const price = 500;
const taxRate = 0.12;

const receipt = \`Jami: \${price} UZS (QQS bilan: \${price + (price * taxRate)} UZS)\`;
console.log(receipt); // "Jami: 500 UZS (QQS bilan: 560 UZS)"

// Ternary operator yordamida shart tekshirish
const score = 85;
const resultMsg = \`Siz imtihondan \${score >= 60 ? 'o\\'tdingiz' : 'yiqildingiz'}.\`;
console.log(resultMsg); // "Siz imtihondan o'tdingiz."
\`\`\`

### 3. Advanced Example (Tagged Template Literals)
Tagged templates yordamida shablon satrini maxsus funksiya (tag funksiya) orqali qayta ishlash:
\`\`\`javascript
// Tag funksiyasi yaratamiz
function highlight(strings, ...values) {
  // strings: ['Mening ismim ', ', yoshim ', 'da.']
  // values: ['Asad', 25]
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    const highlightedValue = typeof value === 'string' ? \`<b>\${value}</b>\` : value;
    return result + highlightedValue + str;
  });
}

const userName = "Asad";
const userAge = 25;

// Funksiyani qavslarsiz, to'g'ridan-to'g'ri shablon oldida chaqiramiz:
const output = highlight\`Mening ismim \${userName}, yoshim \${userAge}da.\`;
console.log(output); 
// Natija: "Mening ismim <b>Asad</b>, yoshim 25da."
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Satrlarni birlashtirishda V8 Dvigatelining ishlashi
JavaScript-ni ishga tushiradigan V8 dvigateli (yoki boshqa dvigatellar) satrlar bilan ishlaganda xotira unumdorligiga katta e'tibor qaratadi:
1. **Intermediate Objects (Vaqtinchalik obyektlar):** Eski usuldagi \`'A' + b + 'C'\` kodida dvigatel avval \`'A'\` va \`b\` ni birlashtirib, yangi vaqtinchalik satr yaratadi, so'ngra unga \`'C'\` ni qo'shib, yakuniy satrni yaratadi. Bu xotirada keraksiz joy band qiladi va Garbage Collector (axlat yig'uvchi) uchun ortiqcha yuklama hisoblanadi.
2. **Template Literal optimizatsiyasi:** \`Hello \${name}!\` yozilganda, dvigatel sintaktik tahlil (parsing) bosqichida buni statik matn qismlari va o'zgaruvchilarga ajratadi. Keyin xotiradan yagona satr uchun buffer (joy) ajratib, barcha qiymatlarni bir urinishda o'sha yerga birlashtiradi. Bu operatsiyani juda tezlashtiradi.

### Tagged Templates va Caching (Keshlashtirish)
Tegli shablon funksiyasi chaqirilganda, unga uzatiladigan birinchi argument (\`strings\` massivi) V8 dvigateli tomonidan keshlanadi. Masalan, sikl ichida har safar bir xil shablon ishga tushganda, dvigatel yangi massiv yaratib o'tirmaydi, balki xotiradagi o'sha strings massivi havolasini (reference) qayta ishlatadi. Bu ham unumdorlikni oshiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Oddiy tirnoqlar ichida \`\${}\` ishlatish
Eng keng tarqalgan xato — o'zgaruvchini interpolatsiya qilmoqchi bo'lib, backtick o'rniga oddiy tirnoqlardan foydalanish.
* **❌ Noto'g'ri:**
  \`\`\`javascript
  const user = "Anvar";
  console.log('Salom, \${user}!'); // "Salom, \${user}!" chiqadi (interpolatsiya ishlamaydi)
  \`\`\`
* **✅ To'g'ri:**
  \`\`\`javascript
  const user = "Anvar";
  console.log(\`Salom, \${user}!\`); // "Salom, Anvar!" chiqadi
  \`\`\`

### 2. Shablon ichida keraksiz konkatenatsiya qilish
Ko'pchilik backticks ishlatsa ham, baribir eski odatga ko'ra \`+\` operatoridan foydalanishda davom etadi.
* **❌ Noto'g'ri:**
  \`\`\`javascript
  const msg = \`Salom \` + name + \`! Sizning balingiz: \` + score;
  \`\`\`
* **✅ To'g'ri:**
  \`\`\`javascript
  const msg = \`Salom \${name}! Sizning balingiz: \${score}\`;
  \`\`\`

### 3. \`\${}\` ichiga o'ta murakkab mantiqni yozib yuborish
Shablon ichida kod yozish mumkin bo'lgani uchun, ba'zida dasturchilar juda uzun ifodalarni yoki bir necha qatorlik ifodalarni u yerga tiqib yuborishadi. Bu kod o'qilishini qiyinlashtiradi.
* **❌ Noto'g'ri:**
  \`\`\`javascript
  console.log(\`Foydalanuvchi: \${user.status === 'active' ? user.role === 'admin' ? 'Admin (Faol)' : 'User (Faol)' : 'Nofaol'}\`);
  \`\`\`
* **✅ To'g'ri (Mantiqni oldindan hisoblab olish):**
  \`\`\`javascript
  let userStatusText = 'Nofaol';
  if (user.status === 'active') {
    userStatusText = user.role === 'admin' ? 'Admin (Faol)' : 'User (Faol)';
  }
  console.log(\`Foydalanuvchi: \${userStatusText}\`);
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1–4)
1. **Savol:** Template literals (shablonli satrlar) nima va u oddiy satrlardan nimasi bilan farq qiladi?
   * **Javob:** Template literals — bu backticks (\`\` \` \`\`) belgisi yordamida yoziladigan satr turi. U satr ichida o'zgaruvchilarni \`\${}\` yordamida to'g'ridan-to'g'ri ishlatish (interpolatsiya) va ko'p satrli matnlarni oson yozish imkonini beradi.
2. **Savol:** Multiline (ko'p satrli) matnlarni yaratishda template literals qanday yordam beradi?
   * **Javob:** Oddiy satrlarda yangi qatorga o'tish uchun \`\\n\` va satrlarni birlashtirish uchun \`+\` kerak edi. Template literalsda esa shunchaki kodda pastga tushib yozish kifoya, yangi qator belgilari avtomatik saqlanib qoladi.
3. **Savol:** \`\${}\` ichiga qanday qiymatlar yoki ifodalarni yozish mumkin?
   * **Javob:** Istalgan valid JavaScript ifodasini (expression): o'zgaruvchilar, arifmetik hisob-kitoblar, funksiya chaqiriqlari, ternary operatorlar va boshqalar. Ammo shartli o'tish operatorlari (\`if\`, \`for\` kabi statementlar) bu yerda to'g'ridan-to'g'ri ishlamaydi.
4. **Savol:** Template literal ichida obyektni interpolatsiya qilsak nima natija chiqadi?
   * **Javob:** Obyekt avtomatik ravishda satrga o'giriladi (type coercion) va uning \`.toString()\` metodi chaqiriladi. Natijada \`[object Object]\` degan matn chiqadi.

### Middle Darajasi (5–8)
5. **Savol:** Tagged template literals nima va u qanday vaziyatlarda qo'llaniladi?
   * **Javob:** Bu shablonli satrni parse qiluvchi funksiya orqali chaqirish usulidir. Bunda funksiya nomi qavslarsiz shablon oldiga yoziladi. U tarjima qilish (i18n), HTML kodlarni xavfsiz qilish (XSS himoyasi) va CSS-in-JS (masalan, styled-components) kutubxonalarida keng qo'llaniladi.
6. **Savol:** Tagged template funksiyasining birinchi va keyingi parametrlari nimalardan iborat?
   * **Javob:** Birinchi parametr shablon ichidagi barcha statik matnli qismlardan iborat massiv (\`strings\`). Keyingi parametrlar esa \`\${}\` ichida uzatilgan dinamik ifodalar qiymatlaridir (ularni \`...values\` rest operatori orqali massiv qilib olish qulay).
7. **Savol:** \`String.raw\` nima va u nima uchun kerak?
   * **Javob:** Bu JavaScript-dagi standart tegli shablon funksiyasi bo'lib, u satr ichidagi escape belgilarini (masalan \`\\n\`, \`\\t\`) interpretatsiya qilmasdan, xom (raw) holatida o'qish imkonini beradi.
8. **Savol:** Template literals orqali HTML shablonlarini dinamik yaratishda qanday xavfsizlik muammosi (masalan, XSS) yuzaga kelishi mumkin va uni qanday hal qilsa bo'ladi?
   * **Javob:** Agar foydalanuvchi yuborgan zararli skript (masalan \`<script>alert('xss')</script>\`) to'g'ridan-to'g'ri interpolatsiya orqali DOM-ga joylashtirilsa, brauzer uni ishga tushirib yuboradi. Buni oldini olish uchun maxsus tegli shablon yozib, barcha kelgan qiymatlarni HTML-escaped holatga keltirish lozim.

### Senior Darajasi (9–12)
9. **Savol:** V8 dvigateli tagged template funksiyasining birinchi argumentini qanday optimallashtiradi?
   * **Javob:** V8 dvigateli o'zgarmas \`strings\` massivini cache (kesh) qilib qo'yadi. Agar dasturda o'sha shablon qayta chaqirilsa, dvigatel har safar yangi massiv yaratmaydi, balki o'sha keshdagi havolani qaytaradi. \`strings\` obyekti muzlatilgan (\`Object.isFrozen(strings) === true\`) bo'ladi.
10. **Savol:** \`strings\` massividagi oddiy elementlar va \`strings.raw\` farqini tushuntiring.
    * **Javob:** \`strings\` massividagi elementlar escape belgilarni qayta ishlangan holda saqlaydi (masalan, \`\\n\` haqiqiy yangi qatorga aylanadi). \`strings.raw\` esa o'sha satrlarning xom ko'rinishini saqlaydi (ya'ni \`\\n\` ikkita alohida belgi: \`\\\` va \`n\` ko'rinishida qoladi).
11. **Savol:** Nima uchun \`['a', 'b'].join('')\` usulidan ko'ra template literals yordamida satrlarni birlashtirish tezroq va samaraliroq?
    * **Javob:** Chunki \`join\` metodi massiv yaratishni, elementlarni aylanishni va yangi obyekt yaratishni talab qiladi. Template literals esa sintaktik darajada qo'llab-quvvatlanadi va dvigatel xotirani oldindan bilgan holda optimallashgan yagona qadamda ajratadi.
12. **Savol:** Katta hajmdagi HTML kodlarni template literals yordamida yig'ib \`innerHTML\` ga berish va Virtual DOM renderlash tizimlari o'rtasidagi performance (unumdorlik) farqini tushuntiring.
    * **Javob:** Template literals matnni juda tez yig'adi, biroq uni \`innerHTML\` orqali DOM-ga qo'shganda brauzer butun daraxtni qaytadan tahlil qiladi (Reflow/Repaint), bu esa sekin. Virtual DOM esa faqat o'zgargan kichik elementlarni aniqlab, faqat o'sha yerning o'zini o'zgartiradi (Reconciliation).

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi diagrammada standart satr konkatenatsiyasi (qo'shish) va template literalsning JavaScript dvigatelida qayta ishlanish jarayoni va xotiradagi farqi tasvirlangan:

\`\`\`mermaid
graph TD
    subgraph StandartKonkatenatsiya [Standart Konkatenatsiya: 'Hello ' + name + '!']
        direction TB
        C1["'Hello '"] --> Op["+ operatori"]
        Val1["name ('Farhod')"] --> Op
        Op --> Op2["+ operatori"]
        C2["'!'"] --> Op2
        Op2 --> Res1["'Hello Farhod!' <br/> (Har bir qadamda yangi vaqtinchalik satr yaratiladi)"]
    end

    subgraph TemplateLiteral [Template Literal: \`Hello \${name}!\`]
        direction TB
        TL["\`Hello \${name}!\`"] --> Parse["JS Dvigateli parse qiladi"]
        Parse --> Parts["Statik qismlar: ['Hello ', '!'] <br/> Dinamik qiymatlar: ['Farhod']"]
        Parts --> Build["V8 Interpolatsiya Dvigateli"]
        Build --> Res2["'Hello Farhod!' <br/> (Xotirada optimallashgan, yagona yakuniy satr)"]
    end
\`\`\`

### Amaliy topshiriqlarni boshlash
Ushbu dars uchun tayyorlangan 3 ta amaliy mashqni bajarish uchun \`templateLiterals_exercises.json\` faylini oching. Mashqlar:
1. \`formatFullName\` — ism va familiyani backtick yordamida birlashtirish.
2. \`sumFormula\` — shablon ichida matematik hisoblashlar va natijani formula ko'rinishida chiqarish.
3. \`renderProfile\` — o'zgaruvchilardan foydalanib multiline HTML profil shablonini generatsiya qilish.

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'zlashtirgan bilimlaringizni mustahkamlash uchun \`templateLiterals_quizzes.json\` faylidagi 12 ta test topshiriqlarini yeching. Savollar sodda interpolatsiyadan boshlab, tagged templates va \`String.raw\` ning ishlash tamoyillarigacha bo'lgan mavzularni qamrab oladi.

---

## 8. 🎯 Real Project Case Study

### HTML Escaping va XSS Himoyasi
Haqiqiy loyihalarda foydalanuvchilar tomonidan yozilgan izohlar yoki xabarlarni saytga chiqarishda xavfsizlik juda muhim. Agar foydalanuvchi izoh maydoniga HTML teglarini yozsa va biz uni to'g'ridan-to'g'ri shablon yordamida sahifaga chiqarsak, bu XSS (Cross-Site Scripting) hujumiga olib kelishi mumkin.

Biz tagged template literal yordamida xavfli belgilarni zararsizlantiruvchi \`safeHTML\` tegi funksiyasini yozamiz:

\`\`\`javascript
// 1. HTML xavfli belgilarini almashtiruvchi funksiya
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 2. Tagged Template funksiyasi
function safeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let value = values[i - 1];
    
    // Agar qiymat satr bo'lsa, uni escape qilamiz
    if (typeof value === 'string') {
      value = escapeHTML(value);
    }
    
    return result + value + str;
  });
}

// 3. Foydalanish
const userInput = "<script>alert('Hacked!');</script>";
const cleanOutput = safeHTML\`<div>Izoh: \${userInput}</div>\`;

console.log(cleanOutput);
// Natija: "<div>Izoh: &lt;script&gt;alert(&#39;Hacked!&#39;);&lt;/script&gt;</div>"
// Bu matn brauzerda skript sifatida ishlamaydi, shunchaki xavfsiz matn bo'lib ko'rinadi!
\`\`\`

---

## 9. 🚀 Performance va Optimization

Template literals zamonaviy dvigatellarda juda yaxshi optimallashtirilgan bo'lsa-da, eng yaxshi natijaga erishish uchun quyidagi qoidalarga amal qilish tavsiya etiladi:

1. **Sikl ichida tagged templates ishlatish:** Agar siz sikl ichida har safar tagged templates ishlatsangiz, uning statik matn qismlari (strings massivi) xotirada faqat bir marta keshlanadi. Bu dynamic ravishda satrlarni yig'ib \`join()\` qilishdan ko'ra ancha kamroq xotira sarflaydi.
2. **Katta hajmdagi matnlar:** Agar sizga bir necha megabaytlik juda katta matnlarni dinamik yig'ish kerak bo'lsa, har safar shablonga o'zgartirish kiritish o'rniga, matn bo'laklarini massivga yig'ib, eng oxirida birlashtirish samaraliroq bo'lishi mumkin.
3. **Hisoblashlarni tashqariga chiqarish:** \`\${}\` ichida og'ir matematik yoki sikl operatsiyalarini yozishdan qoching. Ularni shablondan oldin alohida o'zgaruvchida hisoblab, shablon ichiga faqat tayyor natijani bering. Bu kodning tez ishlashi va oson o'qilishini ta'minlaydi.

---

## 10. 📌 Cheat Sheet

| Xususiyat / Usul | Eski (Legacy) usul | Yangi (ES6) usul | Eslatma |
| :--- | :--- | :--- | :--- |
| **Satrlarni yaratish** | \`'Salom'\` yoki \`"Salom"\` | \`\` \`Salom\` \`\` | Backtick ishlatiladi |
| **Interpolatsiya** | \`'Salom ' + name + '!'\` | \`\` \`Salom \${name}!\` \`\` | \`\${}\` ichiga expression yoziladi |
| **Ko'p satrlilik** | \`'Line1\\n' + 'Line2'\` | <pre>\`Line1<br>Line2\`</pre> | Kodda Enter bosish orqali yoziladi |
| **Matnni toza (raw) o'qish** | Mavjud emas | \`\` String.raw\`Hello\\nWorld\` \`\` | Escape belgilarini o'z holicha qoldiradi |
| **Tegli shablonlar** | Oddiy funksiya chaqiruvi | \`\` tag\`Matn \${qiymat}\` \`\` | Funksiya qavslarsiz chaqiriladi |
`,
  exercises: [
  {
    "id": 1,
    "title": "O'zgaruvchilarni interpolatsiya qilish",
    "instruction": "Foydalanuvchining `firstName` va `lastName` o'zgaruvchilarini qabul qilib, ularni template literal (backtick) yordamida bitta satrga bo'sh joy (space) bilan ajratib birlashtiruvchi `formatFullName(firstName, lastName)` funksiyasini yozing. Masalan: `formatFullName('Ali', 'Valiyev')` chaqirilganda `'Ali Valiyev'` qaytishi kerak.",
    "startingCode": "function formatFullName(firstName, lastName) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Backtick (`) belgisidan foydalaning va o'zgaruvchilarni ${firstName} ko'rinishida yozing.",
    "test": "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return formatFullName;');\nconst fn = sandbox();\nconst res = fn('Olim', 'Sodiqov');\nif (res === 'Olim Sodiqov') return null;\nreturn 'formatFullName funksiyasi ism va familiyani to\\'g\\'ri birlashtirmadi';"
  },
  {
    "id": 2,
    "title": "Matematik ifodani formatlash",
    "instruction": "Ikkita `a` va `b` sonlarini qabul qilib, ularning yig'indisini quyidagi ko'rinishda shablonli satr sifatida qaytaruvchi `sumFormula(a, b)` funksiyasini yozing: `'a + b = yig'indi'`. Masalan: `sumFormula(3, 4)` chaqirilganda `'3 + 4 = 7'` qaytishi kerak.",
    "startingCode": "function sumFormula(a, b) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Shablon ichida ${a} va ${b} ni o'zaro qo'shib ketishingiz mumkin: `${a} + ${b} = ${a + b}`",
    "test": "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return sumFormula;');\nconst fn = sandbox();\nconst res = fn(10, 20);\nif (res === '10 + 20 = 30') return null;\nreturn 'sumFormula funksiyasi formulani to\\'g\\'ri formatlamadi';"
  },
  {
    "id": 3,
    "title": "HTML Shabloni yaratish",
    "instruction": "Foydalanuvchi obyekti (`user` - `name` va `age` xossalari bor) va rolni (`role` - satr) qabul qilib, ularni HTML ko'rinishida formatlovchi `renderProfile(user, role)` funksiyasini yozing. Qaytadigan matn aynan mana shunday multiline (ko'p satrli) bo'lishi kerak:\n```html\n<div class=\"profile\">\n  <h2>Name: ${user.name}</h2>\n  <p>Age: ${user.age}</p>\n  <span class=\"role\">${role}</span>\n</div>\n```\nE'tibor bering: qatorlar va bo'sh joylar formatga mos tushishi lozim.",
    "startingCode": "function renderProfile(user, role) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Ko'p satrli matn hosil qilish uchun backtickdan foydalaning va shablon ichida tegishli o'zgaruvchilarni joylashtiring: `${user.name}`, `${user.age}` va `${role}`.",
    "test": "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return renderProfile;');\nconst fn = sandbox();\nconst res = fn({ name: 'Jasur', age: 25 }, 'Developer');\nconst clean = (str) => str.replace(/\\s+/g, '');\nconst expectedClean = clean('<div class=\"profile\"><h2>Name:Jasur</h2><p>Age:25</p><span class=\"role\">Developer</span></div>');\nif (clean(res) === expectedClean) return null;\nreturn 'renderProfile qaytargan HTML to\\'g\\'ri formatda emas';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Template literals (shablonli satrlar) yaratish uchun qaysi belgidan foydalaniladi?",
    "options": [
      "Yakkalik tirnoq (' ')",
      "Qo'shaloq tirnoq (\" \")",
      "Backtick (bek-tik, ` `)",
      "Qavslar ( )"
    ],
    "correctAnswer": 2,
    "explanation": "Template literals JavaScript-da backtick (bektik, ya'ni klaviaturadagi 'Esc' tugmasining ostidagi belgi) yordamida yoziladi."
  },
  {
    "id": 2,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nconst name = 'Ali';\nconsole.log('Salom ${name}');\n```",
    "options": [
      "Salom Ali",
      "Salom ${name}",
      "Salom undefined",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "O'zgaruvchini interpolatsiya qilish uchun oddiy tirnoqlar emas, balki backticks (`) ishlatilishi shart. Oddiy tirnoqlar ichida yozilgan ${name} oddiy matn deb hisoblanadi."
  },
  {
    "id": 3,
    "question": "Template literals yordamida ko'p satrli (multiline) matnlarni qanday yozish mumkin?",
    "options": [
      "Har bir satr oxiriga \\n va + belgisini qo'yish orqali",
      "Satr oxiriga faqat \\ qo'yish orqali",
      "Hech qanday maxsus belgisiz, shunchaki kodda yangi satrga o'tish orqali",
      "Faqat String.multiline() metodidan foydalanib"
    ],
    "correctAnswer": 2,
    "explanation": "Template literals backticklar ichida yozilganda, qo'shimcha \\n yoki satrlarni birlashtiruvchi + belgisiz bevosita kodning o'zida Enter yordamida yangi satrga o'tish imkonini beradi."
  },
  {
    "id": 4,
    "question": "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nconst a = 5;\nconst b = 10;\nconsole.log(`Javob: ${a + b}`);\n```",
    "options": [
      "Javob: 510",
      "Javob: 15",
      "Javob: a + b",
      "Javob: ${15}"
    ],
    "correctAnswer": 1,
    "explanation": "${} ichidagi JavaScript ifodasi (expression) bajariladi. a + b arifmetik qo'shish bo'lib, uning natijasi 15 matnga birlashtiriladi."
  },
  {
    "id": 5,
    "question": "Template literal ichida ternary (uchlik) operatorini ishlatish mumkinmi?",
    "options": [
      "Yo'q, shablon ichida faqat oddiy o'zgaruvchilarni ko'rsatish mumkin",
      "Ha, chunki ternary operator qiymat qaytaruvchi ifoda (expression) hisoblanadi",
      "Faqat agar ternary operator oldindan qavs ichiga olingan bo'lsa",
      "Ha, lekin faqat sonli qiymatlarni solishtirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "${} ichiga istalgan valid JavaScript ifodasini (expression) yozish mumkin. Ternary operator qiymat qaytargani uchun uni bemalol shablon ichida ishlatish mumkin."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nconst user = { name: 'Vali' };\nconsole.log(`Foydalanuvchi: ${user}`);\n```",
    "options": [
      "Foydalanuvchi: Vali",
      "Foydalanuvchi: { name: 'Vali' }",
      "Foydalanuvchi: [object Object]",
      "TypeError"
    ],
    "correctAnswer": 2,
    "explanation": "Obyekt shablon satriga kiritilganda u avtomatik ravishda satrga o'giriladi (coerced). Obyektlarning sukut bo'yicha .toString() metodi [object Object] qiymatini qaytaradi."
  },
  {
    "id": 7,
    "question": "Tagged template literal (teg belgilangan shablon) nima?",
    "options": [
      "Shablonli satrni maxsus funksiya yordamida chaqirish va uning qismlarini qayta ishlash usuli",
      "HTML-dagi <template> tegi bilan bir xil narsa",
      "Shablon ichida faqat XML teglarini ishlatish qoidasi",
      "Stringlarni kesib oluvchi metod"
    ],
    "correctAnswer": 0,
    "explanation": "Tagged template — shablonli satrni tahlil qilish imkonini beruvchi ilg'or usul. Bunda maxsus funksiya (teg funksiya) yoziladi va u shablonli satrdagi matnlar hamda interpolatsiya qilingan qiymatlarni alohida argument sifatida qabul qiladi."
  },
  {
    "id": 8,
    "question": "Quyidagi tagged template funksiyasida `strings` argumenti nimani anglatadi?\n```javascript\nfunction myTag(strings, ...values) {\n  return strings;\n}\nconst name = 'Rustam';\nmyTag`Salom ${name}! Qalaysan?`;\n```",
    "options": [
      "['Rustam']",
      "['Salom ', '! Qalaysan?']",
      "['Salom Rustam! Qalaysan?']",
      "['Salom', 'Rustam', 'Qalaysan']"
    ],
    "correctAnswer": 1,
    "explanation": "Teg funksiyasining birinchi argumenti — shablonli satr ichidagi barcha statik matnli qismlardan (interpolatsiyadan tashqarida bo'lgan) tuzilgan massivdir. Shuning uchun ['Salom ', '! Qalaysan?'] massivi qaytadi."
  },
  {
    "id": 9,
    "question": "`String.raw` tegi nima vazifani bajaradi?",
    "options": [
      "Satr ichidagi barcha harflarni kichik harfga o'tkazadi",
      "Satrdagi escape belgilarini (masalan, \\n, \\t) o'z holicha, interpretatsiya qilmasdan oddiy matn sifatida saqlaydi",
      "Satr ichidagi o'zgaruvchilarni butunlay o'chirib yuboradi",
      "Satrni massivga aylantiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`String.raw` o'rnatilgan teg funksiyasi bo'lib, u escape belgilarini (masalan \\n) yangi satrga o'tkazmasdan, aynan \\ va n harflari ko'rinishida 'xom' (raw) holatda qaytaradi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nconst show = () => 'Salom';\nconsole.log(`${show()}`);\n```",
    "options": [
      "show()",
      "() => 'Salom'",
      "Salom",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "${} ichida funksiya chaqirilgan: show(). Bu funksiya 'Salom' qiymatini qaytaradi, shuning uchun natija 'Salom' bo'ladi."
  },
  {
    "id": 11,
    "question": "Shablonli satrlar yordamida funksiya chaqirilganda (tagged template), `strings.raw` xossasi nima beradi?",
    "options": [
      "Shablonli satrning original matn uzunligini",
      "Satrdagi barcha interpolatsiya qilingan qiymatlarni",
      "Escape belgilar (masalan \\n) interpretatsiya qilinmasdan saqlangan 'xom' matnlar massivini",
      "HTML xavfsizligini ta'minlovchi metodni"
    ],
    "correctAnswer": 2,
    "explanation": "Teg funksiyasiga uzatiladigan birinchi argument (strings massivi) `raw` nomli xususiyatga ega. U o'z ichida escape belgilari qayta ishlanmagan original matn qismlarini saqlaydi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(`Natija: ${(() => {\n  let x = 2;\n  return x * 3;\n})()}`);\n```",
    "options": [
      "Natija: 6",
      "Natija: x * 3",
      "Natija: undefined",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "${} ichida darhol ishga tushuvchi arrow funksiya (IIFE) yozilgan. U bajarilib, 2 * 3 = 6 qiymatini qaytaradi. Satr natijasi 'Natija: 6' bo'ladi."
  }
]

};
