export const jsGotchas = {
  id: "jsGotchas",
  title: "JavaScript Gotchas (Tuzoqlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### JavaScript "Tuzoqlari" (Gotchas) nima?
JavaScript dunyodagi eng mashhur dasturlash tillaridan biri bo'lsa-da, u juda tez va shoshilinch ravishda (atigi 10 kunda) yaratilgan. Shuning uchun tilda ba'zi g'ayrioddiy, mantiqqa zid bo'lib tuyuladigan xususiyatlar yoki tarixiy xatolar mavjud. Dasturchilar bu xususiyatlarni ko'pincha **"tuzoqlar" (gotchas/pitfalls)** deb atashadi. 

Ular xato emas — ular til spetsifikatsiyasi bo'yicha shunday ishlashga mo'ljallangan, ammo inson mantig'iga to'g'ri kelmasligi sababli yosh dasturchilarni chalg'itadi.

### Real hayotiy analogiya
Tasavvur qiling, siz supermarketga kirib, **ikkita bo'sh savatni** birlashtirmoqchisiz. Siz ularni bir-birining ichiga kiydirsangiz, yana bir savat hosil bo'lishini kutasiz. Ammo kassir kelib: *"Qoidaga ko'ra, ikkita bo'sh savat birlashsa, ular havoga aylanib yo'q bo'lib ketadi (bo'sh matn bo'ladi)"* deydi. 

Yoki bo'lmasam, taroziga **olmani** qo'ysangiz, u sizga *"Bu meva emas, bu obyektdir"* deb javob beradi. 

JavaScript-dagi ba'zi qoidalar ham xuddi shunday g'alati va kutilmagan qoidalarga asoslangan. Ushbu darsda biz ana shunday "g'alati" qoidalarni o'rganamiz va ulardan qanday qochishni bilib olamiz.

---

## 2. 💻 Real Kod Misollari

### 1. Type Coercion (Tiplarni avtomatik o'zgartirish)
JavaScript ikki xil tipdagi ma'lumotlarni qo'shganda yoki solishtirganda ularni yashirincha bir xil tipga o'tkazishga harakat qiladi:
\`\`\`javascript
// Massivlar yig'indisi
console.log([] + []); // "" (Bo'sh satr)
// Tushuntirish: Massivlar satrga o'giriladi: String([]) + String([]) -> "" + "" -> ""

// Massiv va Obyekt
console.log([] + {}); // "[object Object]"
// Tushuntirish: Bo'sh massiv "" bo'ladi, obyekt esa "[object Object]" ga aylanadi.

// Zanjirli taqqoslash
console.log(1 < 2 < 3); // true  (Chunki: 1 < 2 -> true. Keyin true < 3 baholanadi. true -> 1 ga aylanadi va 1 < 3 -> true)
console.log(3 > 2 > 1); // false (Chunki: 3 > 2 -> true. Keyin true > 1 baholanadi. true -> 1 bo'ladi va 1 > 1 -> false)
\`\`\`

### 2. NaN (Not-a-Number) injiqliklari
\`NaN\` sonli tip bo'lsa-da, u o'ziga xos xususiyatlarga ega:
\`\`\`javascript
console.log(typeof NaN); // "number" (Garchi nomi "Son emas" bo'lsa ham!)

console.log(NaN === NaN); // false (JS-da o'z-o'ziga teng bo'lmagan yagona qiymat)

// NaN ni tekshirishning to'g'ri va noto'g'ri usuli:
console.log(isNaN("salom"));        // true  (Chunki an'anaviy isNaN() satrni songa o'girib tekshiradi)
console.log(Number.isNaN("salom")); // false (Faqatgina qiymat rostdan ham NaN bo'lsa true qaytaradi)
\`\`\`

### 3. null va 0 ning o'zaro munosabati
\`null\` solishtirilganda juda g'alati o'zini tutadi:
\`\`\`javascript
console.log(null > 0);  // false (null 0 ga o'giriladi: 0 > 0 -> false)
console.log(null == 0); // false (Tenglik tekshiruvida null faqat undefined bilan teng bo'la oladi)
console.log(null >= 0); // true  (Taqqoslovda null yana 0 ga o'girilib, 0 >= 0 -> true beradi)
\`\`\`

### 4. Floating Point (Suzuvchi nuqta) xatosi
Kompyuterlar sonlarni ikkilik tizimda saqlagani uchun o'nlik kasrlarni har doim ham aniq hisoblay olmaydi:
\`\`\`javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004

// Yechim:
const sum = 0.1 + 0.2;
console.log(Number(sum.toFixed(12)) === 0.3); // true
\`\`\`

### 5. Automatic Semicolon Insertion (ASI) tuzog'i
JS kodni o'qiyotganda qator oxiriga avtomatik ravishda nuqtali vergul (;) qo'yishi mumkin:
\`\`\`javascript
function getObject() {
  return // JS bu yerga avtomatik ravishda ';' qo'yadi
  {
    status: "success"
  };
}

console.log(getObject()); // undefined (Obyekt qaytmaydi!)

// Tuzatilgan shakli:
function getObjectFixed() {
  return {
    status: "success"
  };
}
console.log(getObjectFixed()); // { status: "success" }
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammolarni keltirib chiqaradi?
1. **Moliyaviy hisob-kitoblardagi xatolar:** Floating point xatosi tufayli onlayn do'konlarda mahsulot narxi noto'g'ri hisoblanib, kassa xarajatlari mos kelmay qolishi mumkin (\`0.1 + 0.2\` xatosi kabi).
2. **Kutilmagan shartlar bajarilishi:** \`null >= 0\` yoki \`1 < 2 < 3\` kabi ifodalar if-else shartlarida mutlaqo boshqa natija berib, dastur mantig'ini buzadi.
3. **Sinxronizatsiya va ma'lumot yo'qolishi:** ASI tuzog'iga tushib qolganda, funksiyalar \`undefined\` qaytarib, loyihada \`TypeError: Cannot read properties of undefined\` xatolarini keltirib chiqaradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`==\` (noqattiq tenglik) ishlatish
Junior dasturchilar ko'pincha tiplarni avtomatik o'zgartiruvchi \`==\` operatorini ishlatishadi.
* **Xato:** \`"" == 0\` -> \`true\`, \`[] == false\` -> \`true\`.
* **Tuzatish:** Har doim \`===\` (qattiq tenglik) operatoridan foydalaning. U qiymatdan tashqari ma'lumot tipini ham tekshiradi: \`"" === 0\` -> \`false\`.

### 2. \`typeof null\` natijasiga ishonish
* **Xato:** Obyektni tekshirish uchun \`if (typeof value === "object")\` deb yozish, agar \`value\` o'rniga \`null\` kelsa ham bu blok ishga tushib ketadi (chunki \`typeof null === "object"\`).
* **Tuzatish:** Obyektni tekshirishda \`null\` emasligini ham qo'shib tekshiring:
  \`\`\`javascript
  if (value !== null && typeof value === "object") { ... }
  \`\`\`

### 3. Loop ichida \`var\` ishlatish va asinxronlik
* **Xato:** \`for (var i = 0; i < 3; i++) { setTimeout(...) }\` kodida \`i\` global yoki funksiya scope-da bo'lgani uchun hamma asinxron chaqiriqlar oxirgi \`3\` qiymatini oladi.
* **Tuzatish:** Har doim \`let\` kalit so'zidan foydalaning. \`let\` blok scope-ga ega bo'lgani uchun har bir sikl bosqichida yangi o'zgaruvchi yaratadi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Nima uchun \`0.1 + 0.2 === 0.3\` ifodasi \`false\` qaytaradi?
   * **Javob:** Kompyuterlar kasr sonlarni IEEE 754 standarti bo'yicha ikkilik sanoq tizimida saqlaydi. Ba'zi o'nlik kasrlar ikkilikda cheksiz davriy bo'lganligi sababli, yaxlitlashda xatolik yuzaga keladi va natija \`0.30000000000000004\` bo'ladi.
2. **Savol:** JavaScript-da \`typeof null\` nima qaytaradi va nega?
   * **Javob:** \`"object"\` qaytaradi. Bu til yaratuvchilarining ilk versiyadagi xatosi bo'lib, eski kodlar ishlamay qolmasligi uchun tuzatishlarsiz qoldirilgan.
3. **Savol:** \`NaN === NaN\` ifodasi nima qaytaradi?
   * **Javob:** \`false\` qaytaradi. JavaScript-da \`NaN\` o'z-o'ziga teng bo'lmagan yagona qiymatdir.
4. **Savol:** Qiymat rostdan ham \`NaN\` ekanligini qanday qilib ishonchli aniqlash mumkin?
   * **Javob:** \`Number.isNaN(value)\` metodi yoki \`Object.is(value, NaN)\` yordamida aniqlash mumkin.

### Middle (5–8)
5. **Savol:** \`null == undefined\` va \`null === undefined\` natijalari qanday farq qiladi?
   * **Javob:** \`null == undefined\` -> \`true\` qaytaradi (chunki noqattiq tenglikda ular teng deb hisoblanadi). \`null === undefined\` -> \`false\` qaytaradi, chunki ularning ma'lumot tiplari har xil (\`Null\` va \`Undefined\`).
6. **Savol:** Nima uchun \`[] + []\` bo'sh satr beradi, \`[] + {}\` esa \`"[object Object]"\` beradi?
   * **Javob:** \`+\` operatori qo'llanilganda massivlar o'z-o'zidan satrga (\`""\`) aylanadi. Obyekt esa \`"[object Object]"\` satriga o'giriladi.
7. **Savol:** Nega \`null >= 0\` ifodasi \`true\` bo'lsa-da, \`null > 0\` va \`null == 0\` ifodalari \`false\` bo'ladi?
   * **Javob:** Relatsion operatorlar (\`>=\`, \`>\`) \`null\` qiymatini \`0\` soniga aylantiradi (shu sababli \`0 >= 0\` -> \`true\`). Lekin tenglik (\`==\`) tekshiruvi \`null\`ni raqamga aylantirmaydi, u faqat \`undefined\` bilan teng bo'la oladi.
8. **Savol:** \`3 > 2 > 1\` ifodasining natijasi nima bo'ladi va nima uchun?
   * **Javob:** Natija \`false\` bo'ladi. Avval \`3 > 2\` solishtirilib, \`true\` qiymatini beradi. Keyin \`true > 1\` baholanadi. \`true\` qiymati songa o'girilganda \`1\` bo'ladi va \`1 > 1\` ifodasi \`false\` qaytaradi.

### Senior (9–12)
9. **Savol:** Automatic Semicolon Insertion (ASI) nima va u qanday holatda kutilmagan bug (xatolik) hosil qilishi mumkin?
   * **Javob:** ASI — JavaScript interpretatori tomonidan qatorlar oxiriga nuqtali vergullarni avtomatik qo'yish mexanizmi. Masalan, \`return\` so'zidan keyingi qatorda obyekt yoki ifoda yozilsa, ASI \`return\` oxiriga \`;\` qo'yadi va funksiya \`undefined\` qaytaradi.
10. **Savol:** \`Object.is()\` metodining \`===\` operatoridan qanday farqlari bor?
    * **Javob:** \`Object.is()\` asosan ikkita holatda \`===\` dan farq qiladi:
      * \`Object.is(NaN, NaN)\` -> \`true\` (lekin \`NaN === NaN\` -> \`false\`)
      * \`Object.is(-0, +0)\` -> \`false\` (lekin \`-0 === +0\` -> \`true\`)
11. **Savol:** \`Array(5)\` orqali yaratilgan massiv va \`[undefined, undefined, undefined, undefined, undefined]\` o'rtasida qanday amaliy farq bor?
    * **Javob:** \`Array(5)\` massivining uzunligi 5 ga teng bo'lsa-da, uning ichida haqiqiy indekslar mavjud emas (sparse array — bo'sh slotlar). \`map()\` yoki \`forEach()\` metodlari bo'sh slotlarni aylanib o'tadi va ularga ishlov bermaydi. Ikkinchi massivda esa indekslar mavjud va ularning qiymati \`undefined\` ga teng, bu metodlar ularni to'liq qayta ishlaydi.
12. **Savol:** \`typeof\` operatori \`"function"\` qaytargan holda, nima uchun funksiyalar aslida alohida ma'lumot tipi emas?
    * **Javob:** JavaScript-da funksiyalar chaqiriluvchi obyektlar (callable objects) hisoblanadi. Ular ichki \`[[Call]]\` metodiga ega bo'lgan maxsus obyektlardir. \`typeof\` ularni dasturchilarga qulay bo'lishi uchun alohida tip sifatida ko'rsatadi, biroq ular baribir obyekt sinfiga tegishlidir.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz turli xil qiymatlarni solishtirish va ularni to'g'ri tekshirish ko'nikmalaringizni shakllantirasiz. Quyidagi diagrammada JavaScript-ning eng g'alati o'zgarishlarining (coercion) umumiy manzarasi keltirilgan:

\`\`\`mermaid
graph TD
    A[JavaScript Tuzoqlari / Coercion] --> B[Massivlar va Obyektlar]
    A --> C[NaN va typeof]
    A --> D[null va 0 Taqqoslash]

    B --> B1["[] + [] ==> '' (Bo'sh satr)"]
    B --> B2["[] + {} ==> '[object Object]'"]
    B --> B3["{} + [] ==> '[object Object]'"]

    C --> C1["NaN === NaN ==> false"]
    C --> C2["typeof NaN ==> 'number'"]
    C --> C3["Object.is(NaN, NaN) ==> true"]

    D --> D1["null == 0 ==> false (Tenglik algoritmi)"]
    D --> D2["null >= 0 ==> true (Taqqoslovda null -> 0 soniga o'tadi)"]
    D --> D3["null > 0 ==> false"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars yakunida bilimingizni tekshirish uchun testlarni topshiring va noto'g'ri javoblardagi tushuntirishlarni yaxshilab o'rganing.

---

## 8. 🎯 Real Project Case Study

### Elektron tijorat (E-commerce) savatidagi narxlarni aniq hisoblash
Agar siz xaridlar savatidagi tovarlar yig'indisini hisoblayotgan bo'lsangiz, suzuvchi nuqta xatosi foydalanuvchiga noto'g'ri narx chiqishiga sabab bo'ladi:

\`\`\`javascript
// Muammoli kod:
const items = [
  { name: "Qalam", price: 0.10 },
  { name: "O'chirg'ich", price: 0.20 }
];

const total = items.reduce((sum, item) => sum + item.price, 0);
console.log(total); // 0.30000000000000004

// YECHIM 1: Tiyinlar (cents) shaklida butun sonlar bilan ishlash
// Narxlar sent yoki tiyinlarda (butun son) saqlanadi: 10 tiyin va 20 tiyin
const totalInCents = items.reduce((sum, item) => sum + (item.price * 100), 0);
const finalTotal = totalInCents / 100;
console.log(finalTotal); // 0.3 (Mutlaqo aniq!)

// YECHIM 2: Yaxlitlash metodini qo'llash (Decimal rounding)
function roundTo(num, decimals = 2) {
  return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}
console.log(roundTo(total)); // 0.3
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Qattiq tenglikdan foydalaning (\`===\`):** Noqattiq tenglik (\`==\`) ishlatilganda brauzer JS dvigateli (V8 kabi) tiplarni o'zgartirish algoritmlarini (Abstract Equality Comparison) bajaradi. Bu esa qo'shimcha vaqt va resurs talab qiladi. Qattiq tenglikda esa tiplar mos kelmasa, tekshirish o'sha zahoti to'xtatiladi.
* **Katta aniqlikdagi matematik hisoblar uchun kutubxonalar:** Agar loyihangiz moliya yoki kriptovalyutalar bilan bog'liq bo'lsa, JS-ning standart arifmetikasiga ishonmang. \`decimal.js\`, \`big.js\` yoki \`bignumber.js\` kabi maxsus kutubxonalardan foydalaning.

---

## 10. 📌 Cheat Sheet

| Amal / Ifoda | Natija | Sabab / Izoh | Tavsiya / Yechim |
| :--- | :--- | :--- | :--- |
| \`0.1 + 0.2\` | \`0.30000000000000004\` | IEEE 754 ikkilik aniqlik xatosi | \`Number(sum.toFixed(10))\` |
| \`typeof null\` | \`"object"\` | Dastlabki JS versiyasidagi xato | \`val !== null && typeof val === 'object'\` |
| \`NaN === NaN\` | \`false\` | Specifikatsiyaga ko'ra o'ziga teng emas | \`Number.isNaN(val)\` |
| \`[] + []\` | \`""\` | Ikkita bo'sh massiv satrga o'tadi | Massivlarni \`concat\` qiling |
| \`null >= 0\` | \`true\` | Taqqoslovda \`null\` qiymati \`0\` bo'ladi | Tipini alohida tekshiring |
| \`return \\n { ... }\` | \`undefined\` | ASI avtomatik \`;\` qo'yib yuboradi | \`{\` qavsni return bilan bir qatorda yozing |
| \`typeof NaN\` | \`"number"\` | NaN raqamli ma'lumot tipiga kiradi | \`Number.isNaN()\` bilan aniqlang |
`,
  exercises: [
  {
    "id": 1,
    "title": "Suzuvchi nuqtali sonlar yig'indisi",
    "instruction": "JavaScript-da suzuvchi nuqtali sonlar bilan hisob-kitob qilishda aniqlik yo'qolishi mumkin (masalan, `0.1 + 0.2` natijasi `0.30000000000000004` bo'ladi). Berilgan ikkita `a` va `b` sonlarini qo'shib, natijani verguldan keyin ko'pi bilan 12 ta xona aniqligida yaxlitlab qaytaradigan `safeAdd(a, b)` funksiyasini yozing. Qaytarilgan qiymat son (number) tipida bo'lishi shart.",
    "startingCode": "function safeAdd(a, b) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "a + b yig'indisini hisoblab, toFixed(12) metodini qo'llang va natijani Number() orqali yana songa o'giring.",
    "test": "const sandbox = new Function(code + '; return safeAdd;');\nconst fn = sandbox();\nif (fn(0.1, 0.2) === 0.3 && fn(0.1, 0.7) === 0.8 && fn(1.000000000001, 2) === 3.000000000001) return null;\nreturn 'Natija suzuvchi nuqta aniqligi bo\\'yicha to\\'g\\'ri yaxlitlanmadi yoki qaytarilgan qiymat son tipi emas';"
  },
  {
    "id": 2,
    "title": "NaN qiymatini aniqlash",
    "instruction": "JavaScript-da `NaN === NaN` ifodasi `false` qaytaradi. `Number.isNaN()` yoki `Object.is()` metodlaridan foydalanmasdan, berilgan `value` qiymati aynan `NaN` ekanligini aniqlovchi `isExactlyNaN(value)` funksiyasini yozing.",
    "startingCode": "function isExactlyNaN(value) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "JavaScript-da faqat bitta qiymat o'z-o'ziga teng emas, u ham bo'lsa NaN. Ya'ni value !== value ifodasi faqat value NaN bo'lganda true beradi.",
    "test": "const sandbox = new Function(code + '; return isExactlyNaN;');\nconst fn = sandbox();\nif (fn(NaN) === true && fn(123) === false && fn('hello') === false && fn(undefined) === false) return null;\nreturn 'Aynan NaN qiymati to\\'g\\'ri aniqlanmadi';"
  },
  {
    "id": 3,
    "title": "Obyekt kalitiga xavfsiz murojaat",
    "instruction": "Obyektning ichki xususiyatlariga murojaat qilishda (masalan, `obj.user.profile.age`), agar yo'ldagi biror-bir xususiyat `null` yoki `undefined` bo'lsa, xatolik yuz beradi. Berilgan obyekt `obj` va nuqtalar bilan ajratilgan yo'l `path` (masalan, `'user.profile.age'`) bo'yicha xavfsiz qiymatni qaytaradigan `getSafeValue(obj, path)` funksiyasini yozing. Agar yo'l mavjud bo'lmasa yoki xatolik yuz berishi mumkin bo'lsa, `undefined` qaytaring.",
    "startingCode": "function getSafeValue(obj, path) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "path parametrini split('.') orqali massivga ajrating va reduce yordamida har bir qadamdagi qiymat null/undefined emasligini tekshirib borib yakuniy qiymatni oling.",
    "test": "const sandbox = new Function(code + '; return getSafeValue;');\nconst fn = sandbox();\nconst testObj = { a: { b: { c: 42 } }, x: null };\nif (fn(testObj, 'a.b.c') === 42 && fn(testObj, 'a.x.y') === undefined && fn(testObj, 'x.y') === undefined && fn(testObj, 'nonexistent') === undefined) return null;\nreturn 'Obyektdan xavfsiz qiymat olish funksiyasi to\\'g\\'ri ishlamadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "0.1 + 0.2 === 0.3 ifodasi nima qaytaradi va nega?",
    "options": [
      "true, chunki matematik hisob-kitoblar har doim to'g'ri bajariladi",
      "false, chunki JavaScript sonlarni IEEE 754 standartida saqlaydi va natija 0.30000000000000004 bo'ladi",
      "undefined, chunki bunday taqqoslash JavaScript-da taqiqlangan",
      "NaN, chunki o'nlik sonlarni to'g'ridan-to'g'ri taqqoslab bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript sonlarni 64-bitli ikkilik formatda saqlagani sababli, ba'zi kasr sonlarni cheksiz davriy ko'rinishda ifodalashga to'g'ri keladi va bu hisob-kitobda kichik noaniqlik (0.30000000000000004) hosil qiladi."
  },
  {
    "id": 2,
    "question": "typeof null ifodasining natijasi nimaga teng?",
    "options": [
      "\"null\"",
      "\"undefined\"",
      "\"object\"",
      "\"string\""
    ],
    "correctAnswer": 2,
    "explanation": "typeof null natijasi \"object\" bo'lishi JavaScript-ning birinchi versiyalaridan qolgan tarixiy xato (bug) hisoblanadi, biroq orqaga moslikni saqlash uchun o'zgartirilmagan."
  },
  {
    "id": 3,
    "question": "JavaScript-da [] + [] (ikkita bo'sh massiv yig'indisi) nima qaytaradi?",
    "options": [
      "[] (yangi bo'sh massiv)",
      "\"\" (bo'sh satr)",
      "\"[object Object]\"",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "+ operatori massivlarni string (satr)ga aylantiradi. Bo'sh massiv esa bo'sh satrga (\"\") aylanadi va ikkita bo'sh satr yig'indisi bo'sh satrni beradi."
  },
  {
    "id": 4,
    "question": "[] + {} (bo'sh massiv va bo'sh obyekt yig'indisi) ifodasi nimani qaytaradi?",
    "options": [
      "\"[object Object]\"",
      "0",
      "NaN",
      "\"{}\""
    ],
    "correctAnswer": 0,
    "explanation": "Massiv bo'sh satrga (\"\") aylanadi. Obyekt esa \"[object Object]\" satriga aylanadi. Ikkalasi birlashganda (concatenation) \"[object Object]\" hosil bo'ladi."
  },
  {
    "id": 5,
    "question": "{} + [] ifodasi (oddiy expression sifatida baholanganda) nima qaytaradi?",
    "options": [
      "\"[object Object]\"",
      "0",
      "NaN",
      "\"{}\""
    ],
    "correctAnswer": 0,
    "explanation": "Agar {} ifodasi ifoda (expression) sifatida baholansa (masalan, console.log({} + []) ichida), u \"[object Object]\" ga teng bo'ladi, chunki u ham string coercion qilinadi."
  },
  {
    "id": 6,
    "question": "JavaScript-da NaN === NaN ifodasi nima qaytaradi?",
    "options": [
      "true",
      "false",
      "TypeError",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "NaN (Not-a-Number) JavaScript-da o'z-o'ziga teng bo'lmagan yagona qiymatdir. Uni tekshirish uchun Number.isNaN() yoki Object.is() ishlatiladi."
  },
  {
    "id": 7,
    "question": "null >= 0 va null == 0 taqqoslashlarining natijasi qanday bo'ladi?",
    "options": [
      "null >= 0 -> false, null == 0 -> true",
      "null >= 0 -> true, null == 0 -> false",
      "Ikkalasi ham true qaytaradi",
      "Ikkalasi ham false qaytaradi"
    ],
    "correctAnswer": 1,
    "explanation": "Taqqoslash operatorlari (>=, <=, >, <) null qiymatini 0 soniga o'giradi (shuning uchun 0 >= 0 true beradi). Tenglik operatori (==) esa null-ni faqat undefined bilan teng deb hisoblaydi, boshqa hech narsaga o'girmaydi (shuning uchun null == 0 false bo'ladi)."
  },
  {
    "id": 8,
    "question": "3 > 2 > 1 ifodasi qanday natija beradi?",
    "options": [
      "true",
      "false",
      "NaN",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Taqqoslash chapdan o'ngga bajariladi. Avval 3 > 2 baholanib true beradi. So'ngra true > 1 baholanadi. true son ko'rinishida 1 ga teng bo'lgani uchun 1 > 1 ifodasi false natijasini qaytaradi."
  },
  {
    "id": 9,
    "question": "typeof NaN ifodasi nima qaytaradi?",
    "options": [
      "\"NaN\"",
      "\"undefined\"",
      "\"number\"",
      "\"object\""
    ],
    "correctAnswer": 2,
    "explanation": "Nomidan qat'i nazar (Not-a-Number), NaN JavaScript specifikatsiyasiga ko'ra raqamli ma'lumot tipi (numeric type) hisoblanadi."
  },
  {
    "id": 10,
    "question": "Quyidagi foo funksiyasi nimani qaytaradi?\n\nfunction foo() {\n  return\n  {\n    status: \"ok\"\n  };\n}",
    "options": [
      "{ status: \"ok\" }",
      "undefined",
      "null",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-dagi Automatic Semicolon Insertion (ASI) qoidasiga ko'ra return so'zidan keyingi yangi qatorga avtomat ravishda nuqtali vergul (;) qo'yiladi. Natijada funksiya undefined qaytaradi va undan keyingi blok bajarilmaydi."
  },
  {
    "id": 11,
    "question": "Quyidagi tsikl ishga tushsa, konsolga nima chiqadi?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
    "options": [
      "0, 1, 2 (alohida qatorlarda)",
      "3, 3, 3 (alohida qatorlarda)",
      "0, 0, 0 (alohida qatorlarda)",
      "Hech narsa chiqmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "var kalit so'zi blokli scope-ga ega emas, u funksiya yoki global scope-ga ega. setTimeout asinxron bo'lgani uchun, u ishga tushguncha tsikl tugab, i ning qiymati 3 ga yetib bo'lgan bo'ladi. Buni tuzatish uchun let ishlatish kerak."
  },
  {
    "id": 12,
    "question": "Array(3).map(x => 1) ifodasi bajarilganda qanday natija olinadi?",
    "options": [
      "[1, 1, 1]",
      "[undefined, undefined, undefined]",
      "[empty × 3] (bo'sh joyli massiv o'zgarishsiz qoladi)",
      "[NaN, NaN, NaN]"
    ],
    "correctAnswer": 2,
    "explanation": "Array(3) faqat massiv uzunligini (length: 3) belgilaydi, ammo uning ichi bo'sh slotlardan iborat bo'ladi (sparse array). map() va forEach() kabi metodlar bo'sh slotlarni aylanib o'tadi va ularni o'zgartirmaydi."
  }
]

};
