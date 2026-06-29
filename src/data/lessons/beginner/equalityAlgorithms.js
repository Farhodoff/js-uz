export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "Taqqoslash va Tenglik (== vs ===)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Taqqoslash va Tenglik (== vs ===) nima?
JavaScript-da qiymatlarni solishtirish uchun asosan ikkita operator ishlatiladi:
* **Loose Equality (Yumshoq tenglik - \`==\`):** Faqat qiymatlarni solishtiradi. Agar solishtirilayotgan qiymatlarning tiplari har xil bo'lsa, ularni avval yashirincha bir xil tipga o'tkazib (type coercion), keyin solishtiradi.
* **Strict Equality (Qat'iy tenglik - \`===\`):** Ham qiymatni, ham ma'lumot turini (tipini) tekshiradi. Hech qanday tiplarni o'zgartirish sodir bo'lmaydi.

---

### Real hayotiy o'xshatish
Tasavvur qiling, siz **metroga kirmoqchisiz**:
* **Strict Equality (\`===\`) - bu qat'iy nazoratchi:** U sizdan ham chiptani, ham shaxsingizni tasdiqlovchi hujjatni talab qiladi. Agar sizda qog'oz chipta bo'lsa-yu, lekin sizdan elektron karta so'ralsa, o'tkazmaydi (tiplar mos kelishi shart).
* **Loose Equality (\`==\`) - bu yumshoq turniket:** Unga chiptaning qanday shaklda ekanligi qiziq emas. Qog'ozmi, telefon ekrani orqalimi — uni skanerlab "kodga" o'tkazadi va kiritib yuboradi.

Misol uchun, \`5 === "5"\` da tiplar har xil bo'lgani uchun qat'iy nazoratchi o'tkazmaydi (\`false\`). Ammo \`5 == "5"\` turniketi \`"5"\` ni avval \`5\` soniga aylantirib, so'ngra teng deb topadi (\`true\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Son va Matn)
\\\`\\\`\\\`javascript
const num = 10;
const str = "10";

console.log(num == str);  // true  -> chunki "10" 10 soniga o'tkaziladi
console.log(num === str); // false -> chunki tiplari har xil (Number va String)
\\\`\\\`\\\`

### 2. Intermediate Example (Boolean va Null/Undefined)
\\\`\\\`\\\`javascript
// Boolean qiymatlarni solishtirish
console.log(1 == true);   // true  (true songa aylanib 1 bo'ladi)
console.log(0 == false);  // true  (false 0 bo'ladi)
console.log("" == false); // true  (Ikkalasi ham 0 ga o'tadi)

// null va undefined
console.log(null == undefined);  // true  (maxsus qoida)
console.log(null === undefined); // false (tiplari har xil)
\\\`\\\`\\\`

### 3. Advanced Example (Obyektlar va NaN)
\\\`\\\`\\\`javascript
// Obyektlar reference (manzil) orqali solishtiriladi
const obj1 = { id: 1 };
const obj2 = { id: 1 };

console.log(obj1 == obj2);  // false -> Manzillari har xil
console.log(obj1 === obj2); // false

// NaN (Not-a-Number) har doim o'ziga teng emas!
console.log(NaN == NaN);   // false
console.log(NaN === NaN);  // false

// Object.is() maxsus usul hisoblanadi
console.log(Object.is(NaN, NaN)); // true
\\\`\\\`\\\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi
Tiplarni avtomatik o'zgartirish (coercion) murakkab biznes mantiqlarida kutilmagan hatolarga (\`bugs\`) sabab bo'ladi. Masalan, \`0 == false\` bo'lgani uchun \`false\` qaytarishi kerak bo'lgan funksiya \`0\` indeks qabul qilganda noto'g'ri ishlashi mumkin. Aynan shu sababli ham loyihalarda doimo \`===\` (Strict Equality) ni ishlatish tavsiya qilinadi.

---

## 4. ❌ YOMON va ✅ YAXSHI Misollar (Ko'p Uchraydigan Xatolar)

### 1. Boolean qiymatlarni \`==\` bilan tekshirish
❌ **YOMON:**
\\\`\\\`\\\`javascript
const arr = [1, 2, 3]; 
if (arr == true) {
  // Ishlamaydi! arr -> "1,2,3" -> NaN. Va NaN == 1 -> false
}
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
const arr = [1, 2, 3];
if (arr) { // arr truthy bo'lgani uchun o'zi ishlaydi (yashirin ToBoolean() ishlaydi)
  console.log("Massiv mavjud");
}
// Yoki uzunligini tekshirish:
if (arr.length > 0) {
  // eng ishonchli
}
\\\`\\\`\\\`

### 2. \`null\` yoki \`undefined\` ni \`0\` deb o'ylash
❌ **YOMON:**
\\\`\\\`\\\`javascript
let value = null;
if (value == 0) { 
  // false chiqadi, garchi null amallarda 0 kabi ishtirok etsa-da, u loose tenglikda 0 ga teng emas!
}
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
let value = null;
if (value === null || value === 0) { 
  // Aniq ikkala holat ham tekshirildi
}
\\\`\\\`\\\`

---

## 5. 📊 Mermaid Diagrammasi

JavaScript Loose (\`==\`) va Strict (\`===\`) algoritmining oddiy ko'rinishi:

\\\`\\\`\\\`mermaid
graph TD
    Start["Taqqoslash x va y"] --> Check{"Operator qaysi?"}
    
    Check -->|===| Strict["Tiplari tengmi?"]
    Check -->|==| Loose["Tiplari tengmi?"]
    
    Strict -->|Yo'q| F["false"]
    Strict -->|Ha| EqVal["Qiymati tengmi? (NaN hisobga olinganda)"]
    EqVal -->|Yo'q| F
    EqVal -->|Ha| T["true"]
    
    Loose -->|Ha| EqVal
    Loose -->|Yo'q| Convert["Tiplarni bir-biriga (Number) aylantirish"]
    Convert --> Strict
\\\`\\\`\\\`

---

## 6. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`==\` va \`===\` o'rtasidagi farq nima?
   **Javob:** \`==\` solishtirishdan oldin tiplarni umumiy tipga (coercion) o'tkazadi, \`===\` esa tiplarni o'zgartirmasdan to'g'ridan-to'g'ri tekshiradi.
2. **Savol:** \`"5" == 5\` va \`"5" === 5\` nima qaytaradi?
   **Javob:** Birinchisi \`true\` (\`"5"\` songa o'tadi), ikkinchisi \`false\` (tiplari har xil).
3. **Savol:** \`null == undefined\` va \`null === undefined\` natijasi nima?
   **Javob:** Birinchisi \`true\` (maxsus qoida), ikkinchisi \`false\` (tiplari boshqa).
4. **Savol:** \`NaN == NaN\` nima qaytaradi?
   **Javob:** \`false\`. Chunki \`NaN\` o'z-o'ziga ham teng bo'lmagan yagona qiymat.

### Middle (5–8)
5. **Savol:** \`[] == false\` nega \`true\` bo'ladi?
   **Javob:** \`false\` -> \`0\`. \`[]\` -> \`""\` -> \`0\`. Oxiri \`0 == 0\` bo'lib true qaytadi.
6. **Savol:** \`Object.is(NaN, NaN)\` nima qaytaradi?
   **Javob:** \`true\`. \`Object.is\` algoritmi strict equality (\`===\`) ga o'xshaydi, lekin u \`NaN\`larni teng ko'radi va \`+0\` ni \`-0\` ga tenglashtirmaydi.
7. **Savol:** \`[10] == "10"\` nimani qaytaradi?
   **Javob:** \`true\`. Massiv primitiv turga o'tganda u yerdagi qiymat stringga aylanadi \`"10"\`, natijada \`"10" == "10"\` tekshiriladi.
8. **Savol:** Qaysi holatda strict equality (\`===\`) dan ko'ra loose equality (\`==\`) ni ishlatgan ma'qul?
   **Javob:** Juda kamdan-kam. Ba'zida API dan raqam yoki string sifatida keluvchi status kodlari (\`id == 5\`) uchun ishlatiladi, ammo bari-bir \`===\` bilan \`Number(id) === 5\` deyish afzal.

### Senior (9–12)
9. **Savol:** Obyektlarni primitivlar bilan \`==\` orqali solishtirganda ToPrimitive operatsiyasi qanday ishlaydi?
   **Javob:** Dastlab obyektdagi \`[Symbol.toPrimitive]\` metodi izlanadi. U bo'lmasa kontekstga ko'ra ketma-ket \`valueOf()\` va \`toString()\` metodlari ishga tushadi.
10. **Savol:** \`[] == ![]\` nega \`true\` qaytaradi?
    **Javob:** \`![]\` ifodasi false beradi. Demak, \`[] == false\`. Bu oxiri borgan sari \`0 == 0\` ga aylanadi va \`true\` qaytaradi.
11. **Savol:** Katta Array sikllarida \`==\` dan ko'ra \`===\` ning qanday ustunligi bor?
    **Javob:** \`===\` (strict) ancha tezroq ishlaydi, chunki u engine (masalan V8) tomonidan tiplarni o'girish bosqichlaridan chetlab o'tadi va srazu true/false ni aytadi.
12. **Savol:** Nima uchun JS da tiplarni avtomatik o'zgartirish (coercion) bor?
    **Javob:** Chunki JavaScript ilk yaratilganda, yoziladigan kodni maksimal darajada xatoliksiz ishlashiga moslangan edi (uzilib qolishdan ko'ra nimanidir o'zgartirib bo'lsa ham ishlatib yuborish prinsipi).
`,
  exercises: [
    {
      "id": 1,
      "title": "Strict taqqoslash 1",
      "instruction": "`strictCheck` o'zgaruvchisiga `5 === \"5\"` taqqoslash natijasini saqlang.",
      "startingCode": "let strictCheck = ;",
      "hint": "5 === '5'",
      "test": "const sandbox = new Function(code + '; let strictCheck = 5 === \"5\"; return strictCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 2,
      "title": "Loose taqqoslash 1",
      "instruction": "`looseCheck` o'zgaruvchisiga `5 == \"5\"` taqqoslash natijasini saqlang.",
      "startingCode": "let looseCheck = ;",
      "hint": "5 == '5'",
      "test": "const sandbox = new Function(code + '; let looseCheck = 5 == \"5\"; return looseCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 3,
      "title": "Null va Undefined",
      "instruction": "`nullCheck` o'zgaruvchisiga `null == undefined` ifodasining natijasini saqlang.",
      "startingCode": "let nullCheck = ;",
      "hint": "null == undefined",
      "test": "const sandbox = new Function(code + '; let nullCheck = null == undefined; return nullCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 4,
      "title": "NaN taqqoslash",
      "instruction": "`nanCheck` o'zgaruvchisiga `NaN === NaN` ifodasining natijasini saqlang.",
      "startingCode": "let nanCheck = ;",
      "hint": "NaN doim o'ziga teng emas.",
      "test": "const sandbox = new Function(code + '; let nanCheck = NaN === NaN; return nanCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 5,
      "title": "Massiv va Mantiqiy",
      "instruction": "`arrCheck` ga `[] == false` ni saqlang.",
      "startingCode": "let arrCheck = ;",
      "hint": "Bo'sh massiv 0 ga o'tgani uchun true bo'ladi.",
      "test": "const sandbox = new Function(code + '; let arrCheck = [] == false; return arrCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 6,
      "title": "Obyekt va Obyekt",
      "instruction": "`objCheck` ga `{} === {}` ni saqlang.",
      "startingCode": "let objCheck = ;",
      "hint": "Ikkita turli obyekt xotirada turlicha joylashadi.",
      "test": "const sandbox = new Function(code + '; let objCheck = {} === {}; return objCheck === false;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 7,
      "title": "Number ga o'tkazib taqqoslash",
      "instruction": "`String` 12 ni explicit qilib (Number yordamida) songa o'tkazing va strict equality (`===`) orqali `12` soniga taqqoslab `explicitCheck` ga saqlang.",
      "startingCode": "let explicitCheck = ;",
      "hint": "Number(\"12\") === 12",
      "test": "const sandbox = new Function(code + '; let explicitCheck = Number(\"12\") === 12; return explicitCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 8,
      "title": "Object.is ishlatish",
      "instruction": "`Object.is` dan foydalanib `NaN` va `NaN` ni solishtiring va natijani `objectIsCheck` ga saqlang.",
      "startingCode": "let objectIsCheck = ;",
      "hint": "Object.is(NaN, NaN)",
      "test": "const sandbox = new Function(code + '; let objectIsCheck = Object.is(NaN, NaN); return objectIsCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 9,
      "title": "-0 va +0",
      "instruction": "`zeroCheck` o'zgaruvchisiga `-0 === 0` taqqoslashini yozing.",
      "startingCode": "let zeroCheck = ;",
      "hint": "-0 === 0 true beradi.",
      "test": "const sandbox = new Function(code + '; let zeroCheck = -0 === 0; return zeroCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 10,
      "title": "Mantiqiy string",
      "instruction": "`\"\" == 0` taqqoslashini `emptyStrCheck` o'zgaruvchisiga yuklang.",
      "startingCode": "let emptyStrCheck = ;",
      "hint": "Bo'sh string songa o'tganda 0 bo'ladi.",
      "test": "const sandbox = new Function(code + '; let emptyStrCheck = \"\" == 0; return emptyStrCheck === true;');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Loose equality (`==`) va Strict equality (`===`) ning asosiy farqi nima?",
      "options": [
        "Loose equality qat'iy tekshiradi",
        "Strict equality tiplarni ham, qiymatni ham tekshiradi. Loose equality esa tiplarni avval umumiy tipga o'tkazib solishtiradi",
        "Hech qanday farqi yo'q",
        "Faqat ishlash tezligi"
      ],
      "correctAnswer": 1,
      "explanation": "Strict (===) tipini tekshiradi va coercion qilmaydi, Loose (==) esa tipini o'zgartirib tekshiradi."
    },
    {
      "id": 2,
      "question": "Quyidagi ifoda nima qaytaradi? `NaN === NaN`",
      "options": ["true", "false", "undefined", "TypeError"],
      "correctAnswer": 1,
      "explanation": "JS dagi barcha qoidalarga ko'ra NaN o'ziga ham teng bo'lmagan qiymat."
    },
    {
      "id": 3,
      "question": "`null == undefined` natijasi nima bo'ladi?",
      "options": ["false", "true", "xato beradi", "NaN"],
      "correctAnswer": 1,
      "explanation": "Maxsus algoritmga ko'ra loose equality da null faqat undefined bilan o'zaro teng ko'riladi."
    },
    {
      "id": 4,
      "question": "Quyidagi ifoda nima beradi: `[] == false`",
      "options": ["true", "false", "undefined", "0"],
      "correctAnswer": 0,
      "explanation": "Massiv stringga (''), keyin esa songa (0) o'giriladi. false ham 0 bo'ladi. 0 == 0 -> true."
    },
    {
      "id": 5,
      "question": "`{} === {}` natijasi qanday?",
      "options": ["true", "false", "ReferenceError", "NaN"],
      "correctAnswer": 1,
      "explanation": "Obyektlar manzil orqali solishtiriladi, bu ikkisi xotirada turlicha yotgan obyektlardir."
    },
    {
      "id": 6,
      "question": "`Object.is(NaN, NaN)` va `NaN === NaN` ni farqi bormi?",
      "options": [
        "Yo'q, bir xil true beradi",
        "Yo'q, bir xil false beradi",
        "Ha, Object.is() true beradi, === esa false beradi",
        "Ha, Object.is() false beradi, === esa true beradi"
      ],
      "correctAnswer": 2,
      "explanation": "Object.is() SameValue algoritmidan foydalanadi va unda NaN lar o'zaro teng hisoblanadi."
    },
    {
      "id": 7,
      "question": "`1 == true` ifodasi nega `true` qaytaradi?",
      "options": [
        "1 o'z-o'zidan boolean",
        "true primitiv songa (1 ga) o'giriladi, keyin taqqoslanadi",
        "1 qat'iy turga ega emas",
        "Bu xato, aslini olganda false"
      ],
      "correctAnswer": 1,
      "explanation": "Mantiqiy ifodalar Number tipiga aylantirilganda true 1 ga, false 0 ga o'tadi."
    },
    {
      "id": 8,
      "question": "`[10] == 10` solishtirilganda nima bo'ladi?",
      "options": [
        "Massiv uzunligi olinadi",
        "Xato beradi",
        "Massiv toString() qilinib '10' bo'ladi, u esa 10 soniga aylanib true chiqadi",
        "False chiqadi"
      ],
      "correctAnswer": 2,
      "explanation": "Massiv ichidagi elementni satrga (ToPrimitive) aylanadi va keyin Number'ga aylanib 10 bo'ladi."
    },
    {
      "id": 9,
      "question": "Nima uchun doim `===` (Strict equality) ishlatish tavsiya qilinadi?",
      "options": [
        "Bu yozishda osonroq",
        "U kod hajmini kichiklashtiradi",
        "Yashirin tiplarga o'girilish oqibatidagi kutilmagan bug (xatolik) larning oldini oladi va tezroq ishlaydi",
        "C++ kodi bilan moslashish uchun"
      ],
      "correctAnswer": 2,
      "explanation": "Strict equality yashirin conversionlarga yo'l qo'ymaydi, shu tufayli predictability ortadi."
    },
    {
      "id": 10,
      "question": "`null == 0` natijasi nima?",
      "options": ["true", "false", "undefined", "xato"],
      "correctAnswer": 1,
      "explanation": "null == undefined qoidasiga ko'ra null faqat undefined bilan yoki o'zi bilan ishlaydi, u 0 bilan teng emas."
    },
    {
      "id": 11,
      "question": "`\"\" == false` da nimalar bo'ladi?",
      "options": [
        "\"\" ham, false ham number 0 ga aylanib true chiqadi",
        "false string'ga aylanib false chiqadi",
        "undefined chiqadi",
        "xato chiqadi"
      ],
      "correctAnswer": 0,
      "explanation": "Ikki tomonda ham JS dvigateli Number coercion ni qo'llaydi va 0 == 0 hosil qiladi."
    },
    {
      "id": 12,
      "question": "Qachon qat'iy tenglik (`===`) algoritmi to'g'ridan-to'g'ri `false` qaytaradi?",
      "options": [
        "Qiymatlar katta son bo'lganda",
        "Obyekt solishtirilganda",
        "Taqqoslanayotgan qiymatlarning tiplari boshqa-boshqa bo'lganda",
        "NaN qatnashganda"
      ],
      "correctAnswer": 2,
      "explanation": "Agar `typeof x !== typeof y` bo'lsa, qat'iy tenglik algoritmi darhol `false` qaytaradi."
    }
  ]
};
