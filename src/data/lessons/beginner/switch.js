export const switchLesson = {
  id: "switchLesson",
  title: "Switch-Case Operatorlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Switch-Case nima?
* **\`switch-case\` operatori** — bu dasturdagi ma'lum bir o'zgaruvchi yoki ifodaning qiymatiga qarab, kodning turli tarmoqlarini (bloklarini) ishga tushirish imkonini beruvchi boshqaruv operatoridir. 
* Agar sizda bitta o'zgaruvchini ko'plab aniq qiymatlar bilan solishtirish kerak bo'lsa, ketma-ket yozilgan \`if-else if-else\` zanjiri o'rniga \`switch-case\` operatoridan foydalanish kodni ancha sodda va o'qilishi oson holga keltiradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **vending avtomatidan (ichimlik sotadigan apparat)** foydalanyapsiz:
* **\`if-else\` usuli:** Siz apparatdan ichimlik tanlash uchun har bir tugmani birma-bir tekshirib chiqasiz: "Bu tugma kofemi? Yo'q. Bu tugma sharbatmi? Yo'q. Bu tugma suvmi? Ha!" (Bu juda ko'p vaqt va energiya oladi).
* **\`switch-case\` usuli:** Siz apparat panelidagi kerakli kodni kiritasiz (masalan, \`B4\`). Apparat kiritilgan kodni qabul qiladi va to'g'ridan-to'g'ri \`B4\` kamerasidagi ichimlikni chiqarib beradi (hech qanday ketma-ket savollarsiz, aniq va tez).

Biz kiritgan kod (\`B4\`) — bu **switch ifodasi**, har bir alohida kamera — **case (holat)**, avtomatning mos keluvchi ichimlikni chiqarishi — **bajariladigan kod bloki**, agar mavjud bo'lmagan kod kiritilsa rad etishi esa — **default (standart holat)** hisoblanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Switch-Case va Break)
Hafta kunining raqamiga qarab nomini aniqlash. Bunda har bir holat qat'iy tenglik bilan tekshiriladi va \`break\` orqali switch yakunlanadi:
\`\`\`javascript
function getDayName(dayNumber) {
  let dayName;
  
  switch (dayNumber) {
    case 1:
      dayName = "Dushanba";
      break;
    case 2:
      dayName = "Seshanba";
      break;
    case 3:
      dayName = "Chorshanba";
      break;
    case 4:
      dayName = "Payshanba";
      break;
    case 5:
      dayName = "Juma";
      break;
    case 6:
      dayName = "Shanba";
      break;
    case 7:
      dayName = "Yakshanba";
      break;
    default:
      dayName = "Noto'g'ri kun raqami";
  }
  
  return dayName;
}

console.log(getDayName(1)); // "Dushanba"
console.log(getDayName(5)); // "Juma"
console.log(getDayName(9)); // "Noto'g'ri kun raqami"
\`\`\`

### 2. Intermediate Example (Fall-Through / Guruhlash)
Agar bir nechta case bloklari uchun bir xil kod bajarilishi kerak bo'lsa, ularni ketma-ket yozish (guruhlash) mumkin. Bunga \`break\`ni ataylab yozmaslik orqali erishiladi:
\`\`\`javascript
function getDayType(dayNumber) {
  let type;
  
  switch (dayNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      type = "Ish kuni";
      break; // Faqat beshinchi case'dan keyin chiqib ketiladi
    case 6:
    case 7:
      type = "Dam olish kuni";
      break;
    default:
      type = "Noma'lum kun";
  }
  
  return type;
}

console.log(getDayType(3)); // "Ish kuni"
console.log(getDayType(6)); // "Dam olish kuni"
\`\`\`

### 3. Advanced Example (\`switch(true)\` Patterni)
Agar biz aniq qiymatni emas, balki ma'lum bir diapazon yoki oraliqlarni tekshirmoqchi bo'lsak, \`switch(true)\` yondashuvidan foydalanamiz:
\`\`\`javascript
function categorizeAge(age) {
  if (typeof age !== "number" || age < 0) {
    return "Noto'g'ri yosh kiritildi";
  }

  // switch ifodasi sifatida true beriladi va case'larda shartlar baholanadi
  switch (true) {
    case age < 13:
      return "Bola";
    case age >= 13 && age < 20:
      return "O'smir";
    case age >= 20 && age < 60:
      return "Kattalar";
    default:
      return "Keksalar";
  }
}

console.log(categorizeAge(8));   // "Bola"
console.log(categorizeAge(16));  // "O'smir"
console.log(categorizeAge(65));  // "Keksalar"
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **If-Else Spaghetti (Kodni chalkashligi):** Agar sizda 10 xil holat bo'lsa va ularni \`if (x === 1) {} else if (x === 2) {} ...\` ko'rinishida tekshirsangiz, kod vizual jihatdan juda og'irlashadi. \`switch-case\` ushbu jarayonni vizual ravishda ustun shaklida toza va tartibli ko'rinishga keltiradi.
2. **Kodni takrorlanishi:** Guruhlanadigan shartlarda if-else operatorlari ichida \`||\` (OR) larni juda ko'p yozishga to'g'ri keladi. \`switch\` orqali case'larni shunchaki ketma-ket yopishtirib yozish bu muammoni hal qiladi.
3. **Konstruktiv boshqaruv:** Qat'iy tenglik tekshiruvi orqali kutilmagan tiplarni avtomatik tarzda \`default\` bloki yordamida ushlab qolishni osonlashtiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`break\` operatorini yozishni unutish (Kutilmagan Fall-through)
Eng ko'p uchraydigan xato. Agar \`break\` qo'yilmasa, dastur keyingi shartlar mos keladimi yoki yo'qmi, ularga qaramasdan keyingi case kodlarini ham bajarib yuboradi.
* **Xato:**
  \`\`\`javascript
  const role = "admin";
  switch (role) {
    case "admin":
      console.log("Tizimga to'liq kirish huquqi");
    case "user":
      console.log("Faqat o'qish huquqi"); // Bu ham bajarilib ketadi!
  }
  \`\`\`
* **To'g'ri usul:**
  \`\`\`javascript
  const role = "admin";
  switch (role) {
    case "admin":
      console.log("Tizimga to'liq kirish huquqi");
      break;
    case "user":
      console.log("Faqat o'qish huquqi");
      break;
  }
  \`\`\`

### 2. Tiplarni noto'g'ri solishtirish (Strict Equality tuzog'i)
\`switch\` operatori solishtirishda qat'iy tenglikdan (\`===\`) foydalanadi. Satr tipidagi qiymatni son bilan solishtirsangiz moslik topilmaydi.
* **Xato:**
  \`\`\`javascript
  const count = "2"; // String
  switch (count) {
    case 2: // Number - solishtirish: "2" === 2 (false)
      console.log("Ikki element");
      break;
    default:
      console.log("Topilmadi"); // Default blok ishga tushadi
  }
  \`\`\`
* **To'g'ri usul:** Tiplar bir xil bo'lishi kerak yoki solishtirishdan oldin tipni o'zgartirish (cast qilish) zarur:
  \`\`\`javascript
  const count = "2";
  switch (Number(count)) {
    case 2:
      console.log("Ikki element"); // Muvaffaqiyatli ishlaydi
      break;
  }
  \`\`\`

### 3. Case bloklarida o'zgaruvchilarni qayta e'lon qilish (Scope to'qnashuvi)
Butun switch operatori bitta umumiy blok scope hisoblangani uchun, turli case-lar ichida bir xil nomli o'zgaruvchini \`let\` yoki \`const\` bilan e'lon qilib bo'lmaydi.
* **Xato:**
  \`\`\`javascript
  switch (action) {
    case "create":
      let message = "Yaratildi";
      console.log(message);
      break;
    case "delete":
      let message = "O'chirildi"; // SyntaxError: Identifier 'message' has already been declared
      console.log(message);
      break;
  }
  \`\`\`
* **To'g'ri usul:** Har bir case blokini jingalak qavslar \`{}\` ichiga olib, alohida local scope yaratish lozim:
  \`\`\`javascript
  switch (action) {
    case "create": {
      let message = "Yaratildi";
      console.log(message);
      break;
    }
    case "delete": {
      let message = "O'chirildi"; // Xatoliksiz ishlaydi
      console.log(message);
      break;
    }
  }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`switch-case\` operatorida \`default\` bloki majburiymi?
   * **Javob:** Yo'q, u majburiy emas. Agar yozilmasa va hech bir case sharti mos kelmasa, switch hech qanday kod ishlatmasdan tugaydi.
2. **Savol:** \`switch\` operatori case qiymatlarini tekshirishda qanday solishtirish operatoridan foydalanadi?
   * **Javob:** U qat'iy tenglik (\`===\`) operatoridan foydalanadi, ya'ni qiymatlarning tipi ham, o'zi ham teng bo'lishi shart.
3. **Savol:** \`break\` operatori yozilmasa nima sodir bo'ladi?
   * **Javob:** "Fall-through" effekti yuz beradi, ya'ni mos kelgan case bajarilgach, dastur pastga qarab keyingi case shartlarini tekshirmasdan ularning kodlarini ham ishga tushirib ketadi.
4. **Savol:** Obyektlarni \`switch\` operatori yordamida to'g'ridan-to'g'ri solishtirsa bo'ladimi?
   * **Javob:** Solishtirsa bo'ladi, lekin JavaScript obyektlarni reference (havola) bo'yicha solishtirgani sababli, qiymatlari bir xil bo'lsa ham turli xil yaratilgan obyektlar teng bo'lmaydi va \`default\`ga o'tib ketadi.

### Middle (5–8)
5. **Savol:** \`switch\` operatorining ketma-ket yozilgan \`if-else\`dan afzalliklari nimada?
   * **Javob:** O'qilishi ancha oson (cleaner code), holatlarni guruhlash qulay va u ko'p sonli case'lar mavjud bo'lgan holatlarda JS dvigatellari tomonidan optimallashtiriladi.
6. **Savol:** Bir nechta case uchun bitta kod bajarilishini qanday yozamiz?
   * **Javob:** Case kalit so'zlarini ketma-ket yozib, eng oxirgisida kod va break qo'yamiz. Masalan: \`case 'A': case 'B': runCode(); break;\`.
7. **Savol:** \`switch(true)\` sintaksisining maqsadi nima?
   * **Javob:** Case qismlarida diapazonlar (masalan: \`score > 80\`) yoki boshqa dinamik boolean ifodalarni tekshirish uchun ishlatiladi.
8. **Savol:** Nima uchun case ichida \`let x = 5\` deb yozganimizda xatolik beradi va uni qanday yechish mumkin?
   * **Javob:** Chunki butun switch bitta scope-ga ega va boshqa case-da \`let x\` qayta e'lon qilinsa ziddiyat yuzaga keladi. Buni hal qilish uchun har bir case kodini \`{}\` blok qavsga olish kerak.

### Senior (9–12)
9. **Savol:** JavaScript dvigatellari (V8 kabi) \`switch\` operatorini qanday optimallashtiradi?
   * **Javob:** Agar case'lar soni ko'p (masalan, 10-20 tadan ko'p) va ular izchil sonlar yoki satrlardan iborat bo'lsa, dvigatel uni xotirada \`jump table\` (sakrash jadvali) yoki \`lookup table\`ga aylantiradi. Bu orqali qidirish tezligi O(N) chiziqli vaqtdan O(1) konstant vaqtga kamayadi.
10. **Savol:** \`switch\` va \`if-else\` ishlash tezligi o'rtasidagi farq qachon sezilarli bo'ladi?
    * **Javob:** Holatlar soni o'ta katta bo'lganda (masalan, 50+ holat). Oddiy kundalik loyihalarda bu farq amalda sezilmaydi va tanlov faqat kodning o'qiluvchanligiga (readability) qarab qilinadi.
11. **Savol:** JavaScript-dagi \`switch\` operatorini boshqa tillardagi Pattern Matching (masalan, Rust yoki Scala) bilan solishtiring.
    * **Javob:** JS-dagi \`switch\` juda sodda va faqat qiymat tengligini tekshira oladi. U destructuring, tiplar mosligi yoki murakkab naqshlar bo'yicha pattern matching-ni qo'llab-quvvatlamaydi (biz faqat \`switch(true)\` orqali buni simulyatsiya qilishimiz mumkin).
12. **Savol:** Tizimda xavfsizlik va xatolarni oldini olish uchun \`default\` blokidan qanday foydalanish tavsiya etiladi?
    * **Javob:** Dasturga yangi turdagi qiymatlar qo'shilganda ularni esdan chiqarmaslik uchun, \`default\` blokida kutilmagan holat bo'yicha maxsus xatolik otish (throw error) tavsiya etiladi (Exhaustive checking).

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi oqim diagrammasi (flowchart) \`switch-case\` operatorining ishlash mexanizmini, ya'ni qat'iy tenglik tekshiruvi, \`break\` operatori mavjudligi va \`default\` blokiga o'tish jarayonini ko'rsatib beradi:

\`\`\`mermaid
flowchart TD
    Start(["Boshlash: switch (ifoda)"]) --> Eval["ifoda qiymatini hisoblash"]
    Eval --> Case1{"ifoda === qiymat1 ?"}
    
    Case1 -->|Ha| Code1["Case 1 kodini bajarish"]
    Code1 --> Break1{"break bormi?"}
    Break1 -->|Ha| End(["Switch dan chiqish"])
    Break1 -->|Yo'q| Code2["Case 2 kodini bajarish (Fall-through)"]
    
    Case1 -->|Yo'q| Case2{"ifoda === qiymat2 ?"}
    Case2 -->|Ha| Code2
    Code2 --> Break2{"break bormi?"}
    Break2 -->|Ha| End
    Break2 -->|Yo'q| DefaultCode["Default kodini bajarish (Fall-through)"]
    
    Case2 -->|Yo'q| DefaultCheck{"Default bloki bormi?"}
    DefaultCheck -->|Ha| DefaultCode
    DefaultCheck -->|Yo'q| End
    DefaultCode --> End
\`\`\`

---

## 7. 📝 12 ta Mini Test

Ushbu mavzu bo'yicha bilimingizni sinash uchun dars oxiridagi quizzes faylida tayyorlangan 12 ta savoldan iborat mini testni yechib ko'ring.

---

## 8. 🎯 Real Project Case Study

### Redux/State Management yoki Event Dispatcher loyihalarida qo'llanilishi
Haqiqiy loyihalarda \`switch-case\` operatori eng ko'p ishlatiladigan joylardan biri — bu **state management** (holatni boshqarish) va **event routing** (voqealarni yo'naltirish) hisoblanadi. Masalan, foydalanuvchilar to'lov tizimida har xil to'lov turlarini ("uzcard", "humo", "visa") tanlaganda quyidagicha yo'naltiriladi.

#### To'lovlarni xavfsiz marshrutlash misoli (Clean Code):
\`\`\`javascript
// Har xil to'lov provayderlarini boshqarish funksiyasi
function processPayment(paymentMethod, amount) {
  let statusMessage;

  switch (paymentMethod) {
    case "uzcard": {
      // Alohida blok yaratamiz
      const commission = amount * 0.01;
      statusMessage = \`UzCard orqali \${amount} UZS to'landi. Komissiya: \${commission} UZS\`;
      break;
    }
    case "humo": {
      const commission = amount * 0.005;
      statusMessage = \`Humo orqali \${amount} UZS to'landi. Komissiya: \${commission} UZS\`;
      break;
    }
    case "visa": {
      const commission = amount * 0.02;
      statusMessage = \`Visa orqali \${amount} UZS to'landi. Komissiya: \${commission} UZS\`;
      break;
    }
    default:
      // Kutilmagan to'lov turi bo'lganda dastur xavfsizligi uchun xatolik beramiz
      throw new Error(\`Tizimda qo'llab-quvvatlanmaydigan to'lov turi: \${paymentMethod}\`);
  }

  return statusMessage;
}

try {
  console.log(processPayment("humo", 100000)); // "Humo orqali 100000 UZS to'landi. Komissiya: 500 UZS"
  console.log(processPayment("payme", 50000)); // Xatolik otadi
} catch (error) {
  console.error("Xatolik:", error.message);
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

### Linear Search (If-Else) vs Jump Table (Switch)
JavaScript kompilyatorlari (JIT Compiler) switch tarkibida ko'plab case'lar mavjud bo'lganda kod ishlashini optimallashtirishga harakat qiladi:
* **If-Else (O(N)):** Dastur har safar har bir shartni yuqoridan pastga chiziqli tartibda tekshirib chiqadi. Agar eng oxirgi shart to'g'ri bo'lsa, u barcha oldingi noto'g'ri shartlarni ham baholashga vaqt sarflaydi.
* **Switch-Case (O(1)):** Agar case qiymatlari sodda va son jihatdan ko'p bo'lsa, V8 dvigateli case qiymatlarining xotiradagi manzillarini bog'lab, **Jump Table** (o'tish jadvali) yaratadi. Kiruvchi qiymat to'g'ridan-to'g'ri jadval orqali kerakli manzilga sakraydi. Bu O(1) tezlikni beradi, ya'ni case'lar soni ortishi dastur tezligiga ta'sir qilmaydi.

### Optimallashtirish bo'yicha tavsiyalar:
1. **Tez-tez uchraydigan holatlarni tepaga joylashtiring:** Agar dvigatel Jump Table yarata olmasa (masalan, case'lar juda murakkab yoki aralash bo'lsa), u holda eng ko'p bajariladigan holatlarni switch'ning yuqori qismiga qo'ygan ma'qul. Bu orqali keraksiz solishtirishlar soni qisqaradi.
2. **Qat'iy taqqoslashdan unumli foydalaning:** Switch ichida tiplarni avtomatik o'zgartirish sodir bo'lmasligi (\`===\` ishlatilishi) uning ishlash tezligini if-else da yozilgan \`==\` solishtirishlariga qaraganda ancha tezlashtiradi.

---

## 10. 📌 Cheat Sheet

| Kalit so'z / Usul | Vazifasi | Misol ko'rinishi | Eslatma |
| :--- | :--- | :--- | :--- |
| **\`switch (ifoda)\`** | Baholanuvchi asosiy ifoda yoki o'zgaruvchini belgilash | \`switch (status) { ... }\` | Qat'iy tenglik (\`===\`) asosida ishlaydi. |
| **\`case qiymat:\`** | Ifoda mos kelishi mumkin bo'lgan holat (qiymat) | \`case "success":\` | Agar mos kelsa, pastdagi kod bloki ishga tushadi. |
| **\`break\`** | Switch operatori blokidan darhol chiqish | \`break;\` | Yozilmasa, "fall-through" yuz berib, keyingi case'lar ham bajariladi. |
| **\`default\`** | Hech bir case mos kelmaganda ishlovchi zaxira bloki | \`default: doFallback();\` | Majburiy emas, lekin xavfsizlik uchun tavsiya etiladi. |
| **\`switch (true)\`** | Diapazonlar va murakkab shartlar bo'yicha tekshirish | \`switch (true) { case age > 18: ... }\` | Case qismlarida boolean qiymat beruvchi ifodalar yoziladi. |
| **\`case qiymat: { }\`** | Case ichida o'zgaruvchi e'lon qilishda scope ziddiyatlarini yechish | \`case 1: { let x = 10; break; }\` | Jingalak qavslar alohida block scope yaratadi. |
`,
  exercises: [
  {
    "id": 1,
    "title": "Fasllarni aniqlash",
    "instruction": "Berilgan oy raqamiga (1 dan 12 gacha) qarab tegishli fasl nomini (\"Qish\", \"Bahor\", \"Yoz\", \"Kuz\") qaytaruvchi va noto'g'ri oy raqami berilsa \"Noto'g'ri oy\" deb qaytaruvchi `getSeason(monthNumber)` funksiyasini switch-case operatori yordamida yozing. Oy raqamlarini quyidagicha guruhlang:\n- 12, 1, 2: \"Qish\"\n- 3, 4, 5: \"Bahor\"\n- 6, 7, 8: \"Yoz\"\n- 9, 10, 11: \"Kuz\"",
    "startingCode": "function getSeason(monthNumber) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Har bir fasl uchun case-larni ketma-ket joylashtirib (fall-through), bitta return yoki break yordamida guruhlang. Masalan:\ncase 12:\ncase 1:\ncase 2:\n  return \"Qish\";",
    "test": "const sandbox = new Function(code + '; return getSeason;');\nconst fn = sandbox();\nif (fn(12) !== 'Qish' || fn(1) !== 'Qish' || fn(2) !== 'Qish') return 'Qish fasli uchun oylar noto\\'g\\'ri tekshirildi';\nif (fn(3) !== 'Bahor' || fn(4) !== 'Bahor' || fn(5) !== 'Bahor') return 'Bahor fasli uchun oylar noto\\'g\\'ri tekshirildi';\nif (fn(6) !== 'Yoz' || fn(7) !== 'Yoz' || fn(8) !== 'Yoz') return 'Yoz fasli uchun oylar noto\\'g\\'ri tekshirildi';\nif (fn(9) !== 'Kuz' || fn(10) !== 'Kuz' || fn(11) !== 'Kuz') return 'Kuz fasli uchun oylar noto\\'g\\'ri tekshirildi';\nif (fn(0) !== \"Noto'g'ri oy\" || fn(13) !== \"Noto'g'ri oy\") return 'Noto\\'g\\'ri oy raqamlari to\\'g\\'ri aniqlanmadi';\nif (!code.includes('switch')) return 'switch-case operatoridan foydalanilmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Oddiy Kalkulyator",
    "instruction": "Uchta argument qabul qiladigan `calculator(num1, num2, operator)` funksiyasini yozing. `operator` argumenti string bo'lib, quyidagi qiymatlarni qabul qilishi mumkin: \"+\", \"-\", \"*\", \"/\". Funksiya switch-case yordamida tegishli matematik amalni bajarib natijani qaytarsin. Agar nolga bo'lish holati yuz bersa (\"/\" va num2 === 0 bo'lsa), \"Nolga bo'lish mumkin emas!\" deb qaytarsin. Noto'g'ri operator kiritilganda \"Noto'g'ri operator\" deb qaytarsin.",
    "startingCode": "function calculator(num1, num2, operator) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "switch(operator) yordamida case \"+\":, case \"-\": va boshqalarni tekshiring. Bo'lish case-ida num2 nolga tengligini if orqali tekshiring va tegishli satrni qaytaring.",
    "test": "const sandbox = new Function(code + '; return calculator;');\nconst fn = sandbox();\nif (fn(10, 5, '+') !== 15) return 'Qo\\'shish amali noto\\'g\\'ri bajarildi';\nif (fn(10, 5, '-') !== 5) return 'Ayirish amali noto\\'g\\'ri bajarildi';\nif (fn(10, 5, '*') !== 50) return 'Ko\\'paytirish amali noto\\'g\\'ri bajarildi';\nif (fn(10, 5, '/') !== 2) return 'Bo\\'lish amali noto\\'g\\'ri bajarildi';\nif (fn(10, 0, '/') !== 'Nolga bo\\'lish mumkin emas!') return 'Nolga bo\\'lish holati to\\'g\\'ri tekshirilmadi';\nif (fn(10, 5, '%') !== 'Noto\\'g\\'ri operator') return 'Noto\\'g\\'ri operator holati to\\'g\\'ri tekshirilmadi';\nif (!code.includes('switch')) return 'switch-case operatoridan foydalanilmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Baholash Tizimi (switch(true) patterni)",
    "instruction": "Foydalanuvchining imtihon baliga (0 dan 100 gacha son) qarab baho harfini qaytaruvchi `getGradeScore(score)` funksiyasini yozing. Baholar quyidagicha aniqlanadi:\n- 90 va undan yuqori: \"A\"\n- 80 dan 89 gacha: \"B\"\n- 70 dan 79 gacha: \"C\"\n- 60 dan 69 gacha: \"D\"\n- 60 dan past: \"F\"\n- 0 dan kichik yoki 100 dan katta bo'lsa: \"Noto'g'ri ball\"\nBunda switch-case operatorini ishlatishingiz va switch(true) yondashuvidan foydalanishingiz kerak.",
    "startingCode": "function getGradeScore(score) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "switch(true) dan foydalanib, har bir case-da shartlarni kiriting, masalan: case (score >= 90 && score <= 100): return \"A\";",
    "test": "const sandbox = new Function(code + '; return getGradeScore;');\nconst fn = sandbox();\nif (fn(95) !== 'A' || fn(90) !== 'A') return '90-100 ball oralig\\'i noto\\'g\\'ri baholandi';\nif (fn(85) !== 'B' || fn(80) !== 'B') return '80-89 ball oralig\\'i noto\\'g\\'ri baholandi';\nif (fn(75) !== 'C' || fn(70) !== 'C') return '70-79 ball oralig\\'i noto\\'g\\'ri baholandi';\nif (fn(65) !== 'D' || fn(60) !== 'D') return '60-69 ball oralig\\'i noto\\'g\\'ri baholandi';\nif (fn(50) !== 'F' || fn(0) !== 'F') return '0-59 ball oralig\\'i noto\\'g\\'ri baholandi';\nif (fn(-5) !== \"Noto'g'ri ball\" || fn(105) !== \"Noto'g'ri ball\") return 'Noto\\'g\\'ri ball holatlari to\\'g\\'ri tekshirilmadi';\nif (!code.includes('switch') || !code.includes('true')) return 'switch(true) operatoridan foydalanilmadi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "`switch` operatori solishtirishni amalga oshirganda qaysi tenglik operatoridan (taqqoslash usulidan) foydalanadi?",
    "options": [
      "Qat'iy bo'lmagan tenglik (`==`), ya'ni tiplarni avtomatik o'zgartiradi (type coercion)",
      "Qat'iy tenglik (`===`), ya'ni qiymat va tipni qat'iy solishtiradi",
      "Faqat qiymatni tekshiradi, o'zgaruvchi tiplariga umuman e'tibor bermaydi",
      "Faqat obyekt xossalarining mavjudligini tekshiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`switch` operatori ifoda va case qiymatlarini solishtirishda har doim qat'iy tenglik (`===`) operatoridan foydalanadi. Bunda tiplar avtomatik ravishda o'zgartirilmaydi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod bajarilganda konsolga nima chop etiladi?\n```javascript\nconst value = \"5\";\nswitch(value) {\n  case 5:\n    console.log(\"Son besh\");\n    break;\n  case \"5\":\n    console.log(\"Satr besh\");\n    break;\n  default:\n    console.log(\"Hech biri\");\n}\n```",
    "options": [
      "\"Son besh\"",
      "\"Satr besh\"",
      "\"Hech biri\"",
      "TypeError sintaktik xatoligi yuz beradi"
    ],
    "correctAnswer": 1,
    "explanation": "`value` o'zgaruvchisining qiymati `\"5\"` (string) ga teng. `switch` qat'iy tenglikdan foydalanganligi sababli, `\"5\" === 5` false bo'ladi va `case 5` bajarilmaydi. `\"5\" === \"5\"` true bo'lganligi uchun esa `case \"5\"` ishlaydi."
  },
  {
    "id": 3,
    "question": "`switch-case` operatorida `break` kalit so'zi tushirib qoldirilsa nima sodir bo'ladi?",
    "options": [
      "Sintaktik xatolik (SyntaxError) sodir bo'ladi va dastur to'xtaydi",
      "Dastur avtomatik ravishda `default` holatiga sakrab o'tadi",
      "Mos kelgan case bloki bajariladi va `break` uchramaguncha keyingi barcha case bloklari ham shart tekshirilmasdan bajarilaveradi (fall-through)",
      "Switch operatori o'sha zahoti o'z ishini to'xtatadi va hech narsa bajarmaydi"
    ],
    "correctAnswer": 2,
    "explanation": "Agar `break` yozilmasa, JavaScript mos kelgan case kodini bajaradi va shundan keyingi case'larning shartiga qaramasdan, ularning ichidagi kodlarni ham navbatma-navbat bajarib ketadi (bunga fall-through deyiladi)."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilganda konsolga qaysi javoblar chiqadi?\n```javascript\nconst color = \"yashil\";\nswitch (color) {\n  case \"qizil\":\n    console.log(\"To'xtang\");\n  case \"yashil\":\n    console.log(\"O'ting\");\n  case \"sariq\":\n    console.log(\"Tayyorlaning\");\n  default:\n    console.log(\"Noma'lum rang\");\n}\n```",
    "options": [
      "\"O'ting\"",
      "\"O'ting\" va keyin \"Tayyorlaning\"",
      "\"O'ting\", \"Tayyorlaning\" va keyin \"Noma'lum rang\"",
      "Faqat \"Noma'lum rang\""
    ],
    "correctAnswer": 2,
    "explanation": "`color` qiymati `\"yashil\"` bo'lgani uchun kod `case \"yashil\"`dan boshlab bajariladi. Case ichida `break` yo'qligi sababli, uning ostidagi barcha bloklar (`case \"sariq\"` va `default`) ham ketma-ket bajariladi va uchta xabar ham chop etiladi."
  },
  {
    "id": 5,
    "question": "`switch` operatorida `default` bloki haqida qaysi tasdiq to'g'ri?",
    "options": [
      "U switch tarkibida har doim eng birinchi bo'lib yozilishi shart",
      "U mutlaqo majburiy bo'lib, yozilmasa switch operatori ishlamaydi",
      "Hech bir case mos kelmagan holatda ishga tushadigan ixtiyoriy (optional) blokdir",
      "Uni faqat if-else operatorlari ichida ishlatish mumkin"
    ],
    "correctAnswer": 2,
    "explanation": "`default` bloki mutlaqo ixtiyoriy. Agar u yozilmasa va hech qaysi case sharti bajarilmasa, switch shunchaki hech qanday kod ishga tushirmasdan o'z ishini tugatadi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nconst num = 10;\nswitch (num) {\n  default:\n    console.log(\"Default blok\");\n    break;\n  case 5:\n    console.log(\"Besh\");\n    break;\n}\n```",
    "options": [
      "Hech narsa chiqmaydi, chunki default case'lardan oldin yozilgan",
      "\"Default blok\"",
      "\"Besh\"",
      "SyntaxError xatoligi beradi, chunki default boshida kela olmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da `default` bloki switch ichida istalgan joyda (hatto boshida ham) yozilishi mumkin. Agar barcha case'lar mos kelmasa (10 === 5 false), JavaScript baribir `default` blokini topadi va bajaradi."
  },
  {
    "id": 7,
    "question": "Switch operatorida bir nechta case uchun bitta umumiy kod bajarilishini qanday yozish to'g'ri bo'ladi?",
    "options": [
      "Case qiymatlarini vergul bilan ajratib yozish orqali, masalan: `case 1, 2, 3:`",
      "Case shartlarini ketma-ket yozib, ular orasiga `break` qo'ymasdan (fall-through orqali)",
      "Switch operatorida bunday imkoniyat yo'q, har biriga alohida kod yozish kerak",
      "Qiymatlarni massiv ichida berish orqali, masalan: `case [1, 2, 3]:`"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da bir nechta case bloklarini ketma-ket yozib, faqat eng oxirgisiga kod va `break` yozish orqali guruhlash mumkin. Masalan, `case 1: case 2: console.log('ok'); break;` kodida 1 yoki 2 qiymat kelsa ham 'ok' yozuvi chiqadi."
  },
  {
    "id": 8,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst x = 1;\nswitch (x) {\n  case 1:\n    let y = 10;\n    console.log(y);\n    break;\n  case 2:\n    let y = 20;\n    console.log(y); \n    break;\n}\n```",
    "options": [
      "`10` chiqadi va dastur muvaffaqiyatli tugaydi",
      "`10` va keyin `20` chiqadi",
      "`SyntaxError: Identifier 'y' has already been declared` xatoligi yuz beradi",
      "`undefined` chiqadi"
    ],
    "correctAnswer": 2,
    "explanation": "Butun switch bloki yagona blokli qamrovni (block scope) hosil qiladi. Shuning uchun bitta switch ichida `let` yoki `const` yordamida bir xil nomli o'zgaruvchini turli case'larda qayta e'lon qilish sintaktik xatoga (`SyntaxError`) olib keladi."
  },
  {
    "id": 9,
    "question": "Case ichida o'zgaruvchi e'lon qilishdagi `SyntaxError` (Identifier has already been declared) xatoligini qanday hal qilish mumkin?",
    "options": [
      "O'zgaruvchilarni `let` o'rniga `const` bilan e'lon qilish orqali",
      "Case blokidagi kodlarni jingalak qavslar `{}` ichiga olib, alohida blok qamrovi (block scope) yaratish orqali",
      "Har doim `default` blokini eng oxirida yozish orqali",
      "O'zgaruvchini `break` operatoridan keyin e'lon qilish orqali"
    ],
    "correctAnswer": 1,
    "explanation": "Case'dan keyin jingalak qavslar `{}` ishlatilganda yangi blok qamrovi yaratiladi: `case 1: { let y = 10; break; } case 2: { let y = 20; break; }`. Bu orqali o'zgaruvchilar to'qnashuvining oldi olinadi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst score = 85;\nswitch (true) {\n  case score > 90:\n    console.log(\"A\");\n    break;\n  case score > 80:\n    console.log(\"B\");\n    break;\n  default:\n    console.log(\"F\");\n}\n```",
    "options": [
      "\"B\"",
      "\"A\" va keyin \"B\"",
      "\"F\"",
      "Sintaktik xatolik (SyntaxError)"
    ],
    "correctAnswer": 0,
    "explanation": "`switch(true)` yondashuvida shartlar baholanadi va qaysi case sharti `true` qiymat bersa, o'sha case ishga tushadi. `85 > 80` sharti `true` bo'lgani sababli `case score > 80` bloki bajariladi va konsolga \"B\" chiqadi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilganda konsolga nima chop etiladi?\n```javascript\nconst obj1 = { name: \"Ali\" };\nconst obj2 = { name: \"Ali\" };\nswitch (obj1) {\n  case obj2:\n    console.log(\"Teng\");\n    break;\n  default:\n    console.log(\"Teng emas\");\n}\n```",
    "options": [
      "\"Teng\"",
      "\"Teng emas\"",
      "TypeError xatoligi yuz beradi",
      "Hech narsa chop etilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da obyektlar qiymatlari bo'yicha emas, balki xotiradagi manzili (reference) bo'yicha solishtiriladi. `obj1 === obj2` har doim `false` bo'ladi, chunki ular ikki xil obyektdir. Shuning uchun default bloki bajariladi va \"Teng emas\" chiqadi."
  },
  {
    "id": 12,
    "question": "JavaScript dvigatellari (masalan, V8) juda ko'p sondagi case'larga ega switch operatorlarini qanday optimallashtiradi?",
    "options": [
      "Switch operatorini avtomatik ravishda asinxron rejimga o'tkazish orqali",
      "Case shartlari ko'p va izchil bo'lganda, chiziqli (if-else kabi) qidirish o'rniga, O(1) vaqtda kerakli blokni topish uchun lookup jadvali yoki jump table yaratish orqali",
      "Kod ishlash vaqtida barcha case'larni bitta global obyektga aylantirish orqali",
      "Barcha case'larni o'chira oladigan sun'iy intellekt modulini ishga tushirish orqali"
    ],
    "correctAnswer": 1,
    "explanation": "Agar switch ichida bir xil tipdagi (masalan, sonlar yoki satrlar) case'lar ko'p bo'lsa, JIT-kompilyator chiziqli solishtirishdan voz kechadi va qiymat bo'yicha to'g'ridan-to'g'ri kod manziliga o'tish jadvalini (jump table) tuzadi. Bu amal tezligini O(1) ga yaqinlashtiradi."
  }
]

};
