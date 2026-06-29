export const ifElseLesson = {
  id: "ifElseLesson",
  title: "Shart Operatorlari: if, else",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Shart Operatorlari nima?
Dasturlashda ko'pincha ma'lum bir sharoitga qarab turli xil harakatlarni amalga oshirish kerak bo'ladi. JavaScript-da buni amalga oshirish uchun **shart operatorlari (\`if\`, \`else if\`, \`else\`)** ishlatiladi. Ular kompyuterga: "Agar mana bu shart to'g'ri bo'lsa, bu ishni qil, aks holda boshqa ishni bajar" degan ko'rsatmani beradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ertalab ko'chaga chiqmoqchisiz**:
* **\`if\` (Agar):** Ob-havo yomg'irli bo'lsa, soyabon olasiz (\`if (yomg'ir) { soyabon_ol() }\`).
* **\`else if\` (Yoki bo'lmasa):** Yomg'ir yog'mayotgan bo'lsa-yu, lekin qor bo'lsa, issiq kiyinasiz (\`else if (qor) { issiq_kiyin() }\`).
* **\`else\` (Aks holda):** Agar yuqoridagilarning hech biri bo'lmasa (masalan, havo shunchaki quyoshli bo'lsa), oddiy kiyimda chiqaverasiz (\`else { oddiy_chiq() }\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy \`if-else\` tekshiruvi)
Foydalanuvchining yoshiga qarab kirish ruxsatini tekshirish:
\`\`\`javascript
const age = 19;

if (age >= 18) {
  console.log("Xush kelibsiz! Tizimga kirishga ruxsat berildi.");
} else {
  console.log("Kechirasiz, tizimga kirish uchun yoshingiz yetarli emas.");
}
\`\`\`

### 2. Intermediate Example (Bir nechta shartlar: \`else if\`)
Talabaning bahosini foiziga qarab aniqlash:
\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("Sizning bahongiz: A");
} else if (score >= 80) {
  console.log("Sizning bahongiz: B");
} else if (score >= 70) {
  console.log("Sizning bahongiz: C");
} else {
  console.log("Siz imtihondan o'ta olmadingiz.");
}
\`\`\`

### 3. Advanced Example (Nested shartlar va Ternary / Short-circuit kombinatsiyasi)
Foydalanuvchining hisobidagi mablag'ni tekshirish va xaridni amalga oshirish:
\`\`\`javascript
const user = {
  isVIP: true,
  balance: 150,
  hasActiveDiscount: false
};

const price = 100;

// Shartli narxni belgilash (Ternary operator)
const finalPrice = user.isVIP ? price * 0.8 : price;

if (user.balance >= finalPrice) {
  // Nested (ichma-ich) shart
  if (user.hasActiveDiscount) {
    console.log("Xarid amalga oshdi va qo'shimcha bonus taqdim etildi!");
  } else {
    console.log("Xarid muvaffaqiyatli yakunlandi.");
  }
} else {
  console.log("Hisobingizda mablag' yetarli emas.");
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Truthy va Falsy tushunchasi
JavaScript \`if (shart)\` ichidagi ifodani baholayotganda, natijani avtomatik ravishda **Boolean** (\`true\` yoki \`false\`) turiga o'tkazadi. Bu jarayon **Type Coercion** (tur majburlash) deb ataladi.

Tizimda shart doimo \`false\` deb qabul qiladigan sanoqli qiymatlar mavjud, ular **Falsy qiymatlar** deyiladi:
1. \`false\` (boolean false)
2. \`0\` va \`-0\` (raqam nol)
3. \`0n\` (BigInt nol)
4. \`""\`, \`''\`, \`\\\`\` (bo'sh satr)
5. \`null\` (qiymat mavjud emasligi)
6. \`undefined\` (aniqlanmagan qiymat)
7. \`NaN\` (Not-a-Number, raqam emas)

Qolgan barcha qiymatlar, jumladan bo'sh massiv \`[]\`, bo'sh obyekt \`{}\`, har qanday matn (hatto ichida bo'shliq bo'lsa ham \`" "\`), manfiy sonlar ham **Truthy qiymatlar** hisoblanadi va \`if\` blokini ishga tushiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Qiymat yuklash (\`=\`) bilan taqqoslash operatorini (\`===\`) adashtirish
* **YOMON:**
  \`\`\`javascript
  let isAdmin = false;
  if (isAdmin = true) { // '=' ishlatildi! Bu amal har doim 'true' qaytaradi
    console.log("Siz adminsiz."); // Bu har doim ishlaydi!
  }
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  let isAdmin = false;
  if (isAdmin === true) { // Yoki shunchaki if (isAdmin)
    console.log("Siz adminsiz.");
  }
  \`\`\`

### 2. Ortiqcha shartli nesting (Nested if-else) yaratish
* **YOMON:**
  \`\`\`javascript
  if (user) {
    if (user.isLoggedIn) {
      if (user.hasAccess) {
        showDashboard();
      }
    }
  }
  \`\`\`
* **YAXSHI (Guard Clauses / Mantiqiy VA yordamida optimallashtirish):**
  \`\`\`javascript
  if (user && user.isLoggedIn && user.hasAccess) {
    showDashboard();
  }
  \`\`\`

### 3. Jingalak qavslarsiz yozilgan kodda ikkinchi buyruqni shartga bog'liq deb o'ylash
* **YOMON:**
  \`\`\`javascript
  let loggedIn = false;
  if (loggedIn)
    console.log("Tizimdasiz!");
    showMenu(); // Qavslar yo'qligi sababli bu shartga bog'liq emas va har doim ishlaydi!
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  let loggedIn = false;
  if (loggedIn) {
    console.log("Tizimdasiz!");
    showMenu();
  }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior level
1. **Savol:** JavaScript-da qaysi qiymatlar \`falsy\` (noto'g'ri) deb baholanadi?
   * **Javob:** \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\` (bo'sh satr), \`null\`, \`undefined\` va \`NaN\`.
2. **Savol:** Bo'sh massiv \`[]\` va bo'sh obyekt \`{}\` truthymi yoki falsy?
   * **Javob:** Ikkalasi ham \`truthy\` (to'g'ri). Shart ichiga qo'yilsa, shart bajariladi.
3. **Savol:** \`if (x === 5)\` va \`if (x = 5)\` o'rtasidagi farq nima?
   * **Javob:** Birinchisi \`x\` ning qiymati 5 ga teng yoki teng emasligini solishtiradi. Ikkinchisi \`x\` ga 5 qiymatini yuklaydi va u har doim truthy deb baholanib, shart bajariladi.
4. **Savol:** Ternary (uchlik) operatori nima?
   * **Javob:** Bu \`if-else\` ning qisqacha yozilishidir. Sintaksisi: \`shart ? to'g'ri_bo'lsa : noto'g'ri_bo'lsa\`.

### Middle level
5. **Savol:** Nima uchun \`if ("0")\` sharti bajariladi?
   * **Javob:** Chunki \`"0"\` bo'sh bo'lmagan matndir (string). Har qanday bo'sh bo'lmagan satr truthy hisoblanadi.
6. **Savol:** Guard Clause (himoya sharti) nima va u qanday foyda beradi?
   * **Javob:** Bu funksiya boshida noto'g'ri shartlarni tekshirib, darhol funksiyani tugatish (\`return\`) usuli hisoblanadi. Bu kodning nesting (ichma-ich joylashishi) darajasini kamaytiradi.
7. **Savol:** Short-circuit evaluation (qisqa zanjirli baholash) nima va uni shartlar o'rniga ishlatsa bo'ladimi?
   * **Javob:** Ha. Masalan, \`isUserLoggedIn && showProfile()\` kodi \`isUserLoggedIn\` true bo'lsagina \`showProfile()\` ni chaqiradi.
8. **Savol:** \`if-else\` zanjiri va \`switch-case\` o'rtasidagi asosiy farq nima?
   * **Javob:** \`if-else\` har qanday mantiqiy va diapazonli shartlarni tekshira oladi. \`switch-case\` esa faqat aniq qiymatlar ustida qat'iy tenglikni (\`===\`) tekshirish uchun qulayroqdir.

### Senior level
9. **Savol:** JavaScript dvigateli (V8 kabi) shart operatorlarini qanday optimallashtiradi?
   * **Javob:** Dvigatel "Branch Prediction" (tarmoqni oldindan bashorat qilish) texnikasidan foydalanadi. Agar shart ko'p hollarda true bo'lsa, u kesh orqali tezroq bajaradi.
10. **Savol:** Quyidagi kod bajarilganda nima sodir bo'ladi va nima uchun? \`if (new Boolean(false)) { console.log("Salom"); }\`
    * **Javob:** "Salom" chiqadi. Chunki bu obyekt. Obyektlar esa truthy.
11. **Savol:** Deeply nested \`if-else\` kodlarini qanday qilib refaktoring qilish mumkin?
    * **Javob:** Guard clauses, Lookup Table (obyektlar xaritasi) yoki alohida funksiyalarga bo'lish orqali.
12. **Savol:** Mantiqiy \`||\` va \`??\` operatorlarining shart tekshirishdagi farqi nimada?
    * **Javob:** \`||\` barcha falsy qiymatlarda default qiymatga o'tadi. \`??\` (Nullish coalescing) esa faqat \`null\` yoki \`undefined\` bo'lgandagina ishlatiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

### Shartli Oqim Diagrammasi (Flowchart)

\`\`\`mermaid
graph TD
    Start["Shart Boshlanishi"] --> CheckIf{"if (shart1)"}
    CheckIf -->|Truthy| ExecIf["if bloki kodi bajariladi"]
    CheckIf -->|Falsy| CheckElseIf{"else if (shart2)"}
    
    CheckElseIf -->|Truthy| ExecElseIf["else if kodi bajariladi"]
    CheckElseIf -->|Falsy| CheckElse{"else mavjudmi?"}
    
    CheckElse -->|Ha| ExecElse["else kodi bajariladi"]
    CheckElse -->|Yo'q| Skip["Hech narsa bajarilmaydi"]
    
    ExecIf --> End["Keyingi kodga o'tiladi"]
    ExecElseIf --> End
    ExecElse --> End
    Skip --> End
    
    subgraph Truthy vs Falsy Yo'li
        Val["Qiymat (Value)"] --> Cast["Boolean ga o'tkazish"]
        Cast --> FalsyCheck{"Qiymat: false, 0, null, undefined, NaN, bo'sh string?"}
        FalsyCheck -->|Ha| FalsyPath["Falsy (Shart bajarilmaydi)"]
        FalsyCheck -->|Yo'q| TruthyPath["Truthy (Shart bajariladi)"]
    end
\`\`\`

> [!TIP]
> Tizimda shartlarni yozayotganda, kutilmagan tiplar aralashib ketmasligi uchun har doim qat'iy tenglik (\`===\` yoki \`!==\`) operatorlaridan foydalaning.

---

## 7. 📝 12 ta Mini Test

Mavzu bo'yicha bilimlaringizni sinab ko'rish uchun testlardan o'ting. Testlarda shartli oqim, falsy va truthy qiymatlar o'rin olgan.

---

## 8. 🎯 Real Project Case Study

### Xarid Savatchasi va Chegirmalarni Hisoblash Tizimi

\`\`\`javascript
const currentCart = { itemsCount: 5, totalAmount: 250, promoCode: "SUMMER20" };
const userAccount = { isPremium: true, verifiedEmail: true };

function calculateFinalTotal(cart, user) {
  if (!user.verifiedEmail) return 0;
  
  let discount = 0;
  if (user.isPremium) discount += 15;
  
  if (cart.promoCode === "SUMMER20") discount += 20;

  let shippingCost = (cart.totalAmount >= 200 || user.isPremium) ? 0 : 15;

  const discountAmount = (cart.totalAmount * discount) / 100;
  return cart.totalAmount - discountAmount + shippingCost;
}
console.log(calculateFinalTotal(currentCart, userAccount)); // 162.5
\`\`\`

---

## 9. 🚀 Performance va Optimization
- Guard Clauses ishlatish.
- Ko'p to'g'ri keladigan shartni birinchi o'ringa qo'yish.
- Murakkab ifodalarda operatorlar ustuvorligi.

---

## 10. 📌 Cheat Sheet
| Shart turi / Operator | Sintaksis | Ishlash vaqti / Maqsadi |
| :--- | :--- | :--- |
| **\`if\`** | \`if (shart) { ... }\` | Shart to'g'ri (truthy) bo'lganda kodni bajarish uchun |
| **\`else\`** | \`else { ... }\` | \`if\` sharti noto'g'ri (falsy) bo'lganda |
| **Ternary Operator** | \`shart ? ifoda1 : ifoda2\` | Qisqa \`if-else\` yozilishi va qiymat qaytarish |
| **Falsy qiymatlar** | \`false, 0, -0, 0n, "", null, undefined, NaN\` | Shart har doim bajarilmaydi |
`,
  exercises: [
    {
      "id": 1,
      "title": "Harorat Tavsifi",
      "instruction": "Berilgan `temp` (harorat) bo'yicha matnlarni qaytaruvchi funksiyani yozing: 0 dan past bo'lsa: 'Juda sovuq'; 0 dan 15 gacha: 'Salqin'; 16 dan 30 gacha: 'Iliq'; 30 dan yuqori: 'Issiq'.",
      "startingCode": "function getTemperatureStatus(temp) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "if (temp < 0) return 'Juda sovuq'; else if (temp <= 15)...",
      "test": "const fn = new Function(code + '; return getTemperatureStatus;')(); if (fn(-5) !== 'Juda sovuq' || fn(10) !== 'Salqin' || fn(25) !== 'Iliq' || fn(35) !== 'Issiq') return 'Xato'; return null;"
    },
    {
      "id": 2,
      "title": "Foydalanuvchi Huquqlari",
      "instruction": "Foydalanuvchining yoshi (`age`) va ruxsatnomasi borligi (`hasPermission`) bo'yicha: agar yosh < 18 bo'lsa 'Taqiqlangan', agar yosh >= 18 bo'lib hasPermission true bo'lsa 'Ruxsat berildi', aks holda 'Ruxsatnoma kerak' qaytarsin.",
      "startingCode": "function checkAccess(age, hasPermission) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Avval age < 18 tekshiring.",
      "test": "const fn = new Function(code + '; return checkAccess;')(); if (fn(15, true) !== 'Taqiqlangan' || fn(20, true) !== 'Ruxsat berildi' || fn(20, false) !== 'Ruxsatnoma kerak') return 'Xato'; return null;"
    },
    {
      "id": 3,
      "title": "Falsy va Truthy Tekshiruvi",
      "instruction": "Agar `username` falsy bo'lsa 'Noma\\'lum foydalanuvchi' qaytarsin, truthy bo'lsa o'zini qaytarsin.",
      "startingCode": "function validateUsername(username) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "if (!username) return 'Noma\\'lum foydalanuvchi';",
      "test": "const fn = new Function(code + '; return validateUsername;')(); if (fn('') !== 'Noma\\'lum foydalanuvchi' || fn('nodir') !== 'nodir') return 'Xato'; return null;"
    },
    {
      "id": 4,
      "title": "Musbat yoki Manfiy",
      "instruction": "Son qabul qilib, agar u noldan katta bo'lsa 'Musbat', kichik bo'lsa 'Manfiy', nolga teng bo'lsa 'Nol' qaytaring.",
      "startingCode": "function checkSign(n) {\n  // Kodni yozing\n}",
      "hint": "if, else if, va else lardan foydalaning.",
      "test": "const fn = new Function(code + '; return checkSign;')(); if(fn(5) !== 'Musbat' || fn(-2) !== 'Manfiy' || fn(0) !== 'Nol') return 'Xato'; return null;"
    },
    {
      "id": 5,
      "title": "Parolni Tekshirish",
      "instruction": "Parol uzunligi 8 dan kichik bo'lsa 'Kuchsz', aks holda 'Kuchli' deb qaytarsin.",
      "startingCode": "function checkPassword(pwd) {\n  // Kodni yozing\n}",
      "hint": "pwd.length tekshiring.",
      "test": "const fn = new Function(code + '; return checkPassword;')(); if(fn('1234567') !== 'Kuchsz' || fn('12345678') !== 'Kuchli') return 'Xato'; return null;"
    },
    {
      "id": 6,
      "title": "Katta Yosh (Adult)",
      "instruction": "Yosh parametrini (age) oladigan `isAdult(age)` yozing. 18 va undan katta bo'lsa `true`, bo'lmasa `false` qaytarsin.",
      "startingCode": "function isAdult(age) {\n  // Kodni yozing\n}",
      "hint": "return age >= 18;",
      "test": "const fn = new Function(code + '; return isAdult;')(); if(fn(18) !== true || fn(17) !== false) return 'Xato'; return null;"
    },
    {
      "id": 7,
      "title": "Eng Katta Ikki Son",
      "instruction": "Ikkita son olib `a` va `b`, ularning eng kattasini `if/else` orqali qaytaruvchi `maxTwo(a, b)` yozing.",
      "startingCode": "function maxTwo(a, b) {\n  // Kodni yozing\n}",
      "hint": "Agar a > b bo'lsa a ni qaytaring, aks holda b ni.",
      "test": "const fn = new Function(code + '; return maxTwo;')(); if(fn(10, 5) !== 10 || fn(3, 7) !== 7) return 'Xato'; return null;"
    },
    {
      "id": 8,
      "title": "Baho Baholash",
      "instruction": "Talaba bali (score) qabul qilib baho qaytaruvchi `getGrade(score)` yozing. 90-100 'A', 80-89 'B', 70-79 'C', 60-69 'D', qolganiga 'F'.",
      "startingCode": "function getGrade(score) {\n  // Kodni yozing\n}",
      "hint": "if (score >= 90) return 'A'; else if (score >= 80)...",
      "test": "const fn = new Function(code + '; return getGrade;')(); if(fn(85) !== 'B' || fn(50) !== 'F') return 'Xato'; return null;"
    },
    {
      "id": 9,
      "title": "Kabisa Yilini Aniqlash",
      "instruction": "Berilgan yil kabisa (leap year) yili bo'lsa `true` yo'qsa `false` qaytaruvchi `isLeapYear(year)` yozing.",
      "startingCode": "function isLeapYear(year) {\n  // Kodni yozing\n}",
      "hint": "4 ga bo'linadigan va 100 ga bo'linmaydigan YOKI 400 ga bo'linadigan.",
      "test": "const fn = new Function(code + '; return isLeapYear;')(); if(fn(2020) !== true || fn(2021) !== false) return 'Xato'; return null;"
    },
    {
      "id": 10,
      "title": "Ternary Operatori",
      "instruction": "`isRaining` mantiqiy qiymatini olib, agar rost bo'lsa 'Soyabon oling', yolg'on bo'lsa 'Kerak emas' qaytaruvchi `checkWeather(isRaining)` yozing.",
      "startingCode": "function checkWeather(isRaining) {\n  // Kodni yozing\n}",
      "hint": "return isRaining ? 'Soyabon oling' : 'Kerak emas';",
      "test": "const fn = new Function(code + '; return checkWeather;')(); if(fn(true) !== 'Soyabon oling' || !code.includes('?')) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "`if` operatori JavaScript-da nima uchun ishlatiladi?",
      "options": [
        "Dasturni cheksiz takrorlash uchun",
        "Ma'lum bir qismni faqat berilgan shart to'g'ri bo'lgandagina bajarish uchun",
        "O'zgaruvchilar turini aniqlash uchun",
        "Obyektlarni massivga aylantirish uchun"
      ],
      "correctAnswer": 1,
      "explanation": "`if` operatori shartni tekshiradi va to'g'ri bo'lsa ishlaydi."
    },
    {
      "id": 2,
      "question": "Qaysi kalit so'z `if` sharti noto'g'ri bo'lganda ishlatiladi?",
      "options": ["`then`", "`elseif`", "`else`", "`otherwise`"],
      "correctAnswer": 2,
      "explanation": "else bloki if bajarilmasa ishlaydi."
    },
    {
      "id": 3,
      "question": "Bir nechta shartlarni ketma-ket tekshirish uchun qaysi sintaksis to'g'ri?",
      "options": ["`else if (shart)`", "`elseif (shart)`", "`else(shart)`", "`if else (shart)`"],
      "correctAnswer": 0,
      "explanation": "To'g'ri sintaksis else if (shart)."
    },
    {
      "id": 4,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nconst score = 75;\\nif (score > 80) console.log('A');\\nelse if (score > 60) console.log('B');\\nelse console.log('C');\\n```",
      "options": ["`A`", "`B`", "`C`", "Hech narsa"],
      "correctAnswer": 1,
      "explanation": "75 > 60 bo'lgani uchun B."
    },
    {
      "id": 5,
      "question": "Qaysi biri falsy hisoblanmaydi?",
      "options": ["`0`", "`\"\"` (bo'sh satr)", "`[]` (bo'sh massiv)", "`undefined`"],
      "correctAnswer": 2,
      "explanation": "Bo'sh massiv truthy."
    },
    {
      "id": 6,
      "question": "Quyidagi kod bajarilganda nima chop etiladi?\\n```javascript\\nif ('0') console.log('Salom');\\nelse console.log('Xayr');\\n```",
      "options": ["`Xayr`", "`Salom`", "`undefined`", "Xatolik"],
      "correctAnswer": 1,
      "explanation": "'0' truthy satr."
    },
    {
      "id": 7,
      "question": "Ternary (uchlik) operatori qanday yoziladi?",
      "options": [
        "`shart ? ifoda1 : ifoda2`",
        "Uchta if",
        "Faqat uchta o'zgaruvchi",
        "`if { else }` sinonimi"
      ],
      "correctAnswer": 0,
      "explanation": "To'g'ri sintaksis."
    },
    {
      "id": 8,
      "question": "Quyidagi kod konsolga nima chiqadi?\\n```javascript\\nconst age = 20;\\nconsole.log(age >= 18 ? 'Kattalar' : 'Bolalar');\\n```",
      "options": ["`Bolalar`", "`Kattalar`", "`true`", "`undefined`"],
      "correctAnswer": 1,
      "explanation": "20 >= 18 to'g'ri."
    },
    {
      "id": 9,
      "question": "Qaysi holatda if va else da {} larni tushirib qoldirish mumkin?",
      "options": [
        "Mumkin emas",
        "Solishtirish bo'lsa",
        "Bitta operator bo'lsa",
        "let e'lon qilinganda"
      ],
      "correctAnswer": 2,
      "explanation": "Bitta qator bo'lsa qavs yozmaslik mumkin."
    },
    {
      "id": 10,
      "question": "if (x = 5) qanday natija beradi?",
      "options": ["`false`", "`Teng` (5 truthy bo'lgani uchun)", "SyntaxError", "Hech narsa"],
      "correctAnswer": 1,
      "explanation": "x ga 5 qiymati berilib, truthy bo'lgani uchun shart ishlaydi."
    },
    {
      "id": 11,
      "question": "Short-circuit qanday yoziladi?\\n```javascript\\nif (isLoggedIn) showDashboard();\\n```",
      "options": ["isLoggedIn || showDashboard()", "isLoggedIn && showDashboard()", "?", "=="],
      "correctAnswer": 1,
      "explanation": "&& ishlatiladi."
    },
    {
      "id": 12,
      "question": "null va undefined ifodada qanday farq qiladi?",
      "options": [
        "Farq qilmaydi",
        "null falsy, lekin === tekshirilganda faqat o'ziga teng",
        "Ikkalasi truthy",
        "undefined true ga o'tadi"
      ],
      "correctAnswer": 1,
      "explanation": "null === undefined false beradi."
    }
  ]
};
