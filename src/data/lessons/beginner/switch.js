export const switchLesson = {
  id: "switchLesson",
  title: "Switch-Case Operatorlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Switch-Case nima?
* **\\\`switch-case\\\` operatori** — bu dasturdagi ma'lum bir o'zgaruvchining qiymatiga qarab, kodning turli bloklarini ishga tushiruvchi operator.
* Agar sizda 1 ta o'zgaruvchini juda ko'p xil qiymatlar bilan solishtirish zarurati bo'lsa, uzun \\\`if-else if-else\\\` zanjirini yozgandan ko'ra \\\`switch-case\\\` yozish ancha toza va o'qishli (clean) bo'ladi.

### 🏢 Real hayotiy o'xshatish: Vending Avtomati
Tasavvur qiling, siz ichimlik sotadigan avtomat (Vending Machine) dan foydalanyapsiz:
* **\\\`if-else\\\` usuli:** Siz har bir ichimlikni birma-bir tekshirasiz: "Bu kofemi? Yo'q. Sharbatmi? Yo'q. Suvmi? Ha!" (Bu uzoq davom etadi).
* **\\\`switch-case\\\` usuli:** Siz apparat panelida kerakli kodni terasiz (masalan, \\\`C4\\\`). Apparat kiritilgan kodni qabul qiladi va to'g'ridan-to'g'ri \\\`C4\\\` kamerani topib ichimlikni chiqaradi. Hech qanday ketma-ket izlashlarsiz, tez va aniq.

---

## 2. 🧠 Deep Dive: Under the hood (Xotira va V8 Engine)

### Jump Table va O(1) Tezlik
JavaScript dvigateli (masalan, V8 Engine) qanday qilib \\\`switch\\\` ni ishlatadi? Nima uchun u \\\`if-else\\\` dan farq qiladi?
Agar sizda juda ko'p \\\`case\\\` lar mavjud bo'lsa (ayniqsa ular izchil sonlar yoki ma'lum tartibdagi satrlar bo'lsa), V8 kompilyatori xotirada **Jump Table** (Sakrash jadvali) yoki **Lookup Table** yaratadi. 

* \\\`if-else\\\` zanjiri yuqoridan pastga barcha shartlarni birma-bir tekshiradi. Shartlar soni qancha ko'p bo'lsa, shuncha sekinlashadi (**O(N)** vaqt).
* \\\`switch\\\` operatori (Jump Table orqali) kerakli qiymat manziliga to'g'ridan-to'g'ri sakraydi (**O(1)** vaqt). Bu degani yuzlab case'lar bo'lsa ham tezlik tushib ketmaydi.

\\\`\\\`\\\`javascript
// V8 dvigateli buni avtomat Jump Table sifatida ko'radi:
const statusCode = 404;
switch (statusCode) {
  case 400: return 'Bad Request';
  case 401: return 'Unauthorized';
  case 403: return 'Forbidden';
  case 404: return 'Not Found'; // Darhol topadi, tepadagilarni baholab o'tirmaydi
  case 500: return 'Server Error';
}
\\\`\\\`\\\`

### Qat'iy Tenglik (Strict Equality)
\\\`switch\\\` ifodasi har doim qat'iy tenglik \\\`===\\\` (strict equality) yordamida tekshiradi. Bu degani type coercion (tiplarni avtomatik o'zgarishi) umuman sodir bo'lmaydi. \\\`"5" === 5\\\` bo'lmagani uchun quyidagi kodda \\\`default\\\` blok ishlaydi:

\\\`\\\`\\\`javascript
const id = "5";
switch (id) {
  case 5:
    console.log("Son ko'rinishidagi 5");
    break;
  default:
    console.log("Topilmadi"); // Shu ishlaydi
}
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases & Senior Interview Questions

### 1. Fall-through (Qasddan tushib ketish) va \\\`break\\\` unutilishi
Eng ko'p uchraydigan junior xatoligi — \\\`break\\\` qolib ketishi. Lekin ba'zida biz buni bir nechta holat uchun bitta kod bajarish maqsadida ataylab qilamiz (Fall-through):

\\\`\\\`\\\`javascript
const role = 'admin';
switch(role) {
  case 'admin':
  case 'superadmin':
    console.log('To\\'liq huquq berildi'); // Ikkala holat uchun ham ishlaydi
    break; // Shundan keyingina switch to'xtaydi
  case 'user':
    console.log('Cheklangan huquq');
    break;
}
\\\`\\\`\\\`

### 2. Block Scope ziddiyatlari (Scope Clash)
Butun \\\`switch\\\` ifodasi o'zining yagona blok qamroviga (block scope) ega. Bu shuni anglatadiki, siz bitta switch ichidagi ikkita turli case'da bir xil nomli o'zgaruvchini \\\`let\\\` yoki \\\`const\\\` bilan e'lon qila olmaysiz. Ziddiyat chiqadi!

**Yechim:** Har bir case uchun kodni jingalak qavslar \\\`{}\\\` ichiga olish kerak:

\\\`\\\`\\\`javascript
const action = 'add';
switch (action) {
  case 'add': {
    let msg = 'Qo\\'shildi'; // Faqat shu block ichida mavjud
    console.log(msg);
    break;
  }
  case 'delete': {
    let msg = 'O\\'chirildi'; // Ziddiyat yo'q, xatosiz ishlaydi
    console.log(msg);
    break;
  }
}
\\\`\\\`\\\`

### 3. \\\`switch(true)\\\` Patterni
Senior dasturchilar ko'pincha oraliq diapazonlarni (ranges) va murakkab logikani toza yozish uchun bu patterndan foydalanishadi:

\\\`\\\`\\\`javascript
const score = 85;
switch (true) {
  case score >= 90:
    console.log('A baho');
    break;
  case score >= 80:
    console.log('B baho'); // Ishlaydi: 85 >= 80 (true)
    break;
  default:
    console.log('F baho');
}
\\\`\\\`\\\`

---

## 📊 4. Oqim diagrammasi (Mermaid Diagram)

\\\`\\\`\\\`mermaid
flowchart TD
    Start([Boshlash: switch ifoda]) --> Eval[ifoda qiymatini hisoblash]
    Eval --> Case1{ifoda === qiymat1 ?}
    
    Case1 -->|Ha| Code1[Case 1 kodini bajarish]
    Code1 --> Break1{break bormi?}
    Break1 -->|Ha| End([Switch dan chiqish])
    Break1 -->|Yo'q| Code2[Case 2 kodini bajarish - Fall-through]
    
    Case1 -->|Yo'q| Case2{ifoda === qiymat2 ?}
    Case2 -->|Ha| Code2
    Code2 --> Break2{break bormi?}
    Break2 -->|Ha| End
    Break2 -->|Yo'q| DefaultCode[Default kodini bajarish - Fall-through]
    
    Case2 -->|Yo'q| DefaultCheck{Default bloki bormi?}
    DefaultCheck -->|Ha| DefaultCode
    DefaultCheck -->|Yo'q| End
    DefaultCode --> End
\\\`\\\`\\\`
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
    },
    {
      "id": 4,
      "title": "Hafta kuni",
      "instruction": "Hafta kuni raqamiga (1-7) qarab nomini (\"Dushanba\", \"Seshanba\" va hokazo) qaytaruvchi funksiya `getDay(num)` ni switch yordamida yozing. Boshqa holatlar uchun \"Noma'lum\" deb qaytaring.",
      "startingCode": "function getDay(num) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "case 1:, case 2: ... default: ishlating.",
      "test": "const sandbox = new Function(code + '; return getDay;');\nconst fn = sandbox();\nif(fn(1)!=='Dushanba' || fn(7)!=='Yakshanba' || fn(8)!=='Noma\\'lum') return 'switch operatori orqali to\\'g\\'ri kunlarni qaytarmadi';\nreturn null;"
    },
    {
      "id": 5,
      "title": "Hayvon ovozi",
      "instruction": "Berilgan hayvon nomi (\"it\", \"mushuk\", \"sigir\") ga mos ravishda ularning ovozini (\"Vov\", \"Miyov\", \"Moo\") qaytaruvchi `getAnimalSound(animal)` yozing. Qolgan hayvonlarga \"Bilmayman\" yozing.",
      "startingCode": "function getAnimalSound(animal) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "case 'it': return 'Vov'; kabi yozing.",
      "test": "const sandbox = new Function(code + '; return getAnimalSound;');\nconst fn = sandbox();\nif(fn('it')!=='Vov' || fn('mushuk')!=='Miyov' || fn('qush')!=='Bilmayman') return 'Hayvon ovozi noto\\'g\\'ri qaytdi';\nreturn null;"
    },
    {
      "id": 6,
      "title": "Svetofor ranglari",
      "instruction": "`trafficLight(color)` yozing. \"qizil\" bo'lsa \"To'xtang\", \"sariq\" -> \"Tayyorlaning\", \"yashil\" -> \"Yuring\", boshqa holatlarda \"Buzilgan\" deb qaytarsin.",
      "startingCode": "function trafficLight(color) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Uchta asosiy holatni case bilan yozing va break/return qiling.",
      "test": "const sandbox = new Function(code + '; return trafficLight;');\nconst fn = sandbox();\nif(fn('qizil')!=='To\\'xtang' || fn('yashil')!=='Yuring' || fn('ko\\'k')!=='Buzilgan') return 'Svetofor mantig\\'i noto\\'g\\'ri';\nreturn null;"
    },
    {
      "id": 7,
      "title": "Yo'nalish komandasi",
      "instruction": "Foydalanuvchi yo'nalishini (\"N\", \"S\", \"E\", \"W\") olib, \"Shimol\", \"Janub\", \"Sharq\", \"G'arb\" qiymatlarini beruvchi `getDirection(dir)` yozing. Noto'g'ri bo'lsa, \"Xato\" qaytarsin.",
      "startingCode": "function getDirection(dir) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Harfni tekshirish uchun case ishlatish kerak.",
      "test": "const sandbox = new Function(code + '; return getDirection;');\nconst fn = sandbox();\nif(fn('N')!=='Shimol' || fn('S')!=='Janub' || fn('A')!=='Xato') return 'Yo\\'nalish noto\\'g\\'ri';\nreturn null;"
    },
    {
      "id": 8,
      "title": "Foydalanuvchi roliklari",
      "instruction": "`getRole(role)` funksiyasi role (\"admin\", \"editor\", \"viewer\") qabul qiladi va mos ravishda \"To'liq huquq\", \"O'zgartirish huquqi\", \"Faqat o'qish\" qaytaradi. Qolgan hollarda \"Mehmon\".",
      "startingCode": "function getRole(role) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "case \"admin\": ...",
      "test": "const sandbox = new Function(code + '; return getRole;');\nconst fn = sandbox();\nif(fn('admin')!=='To\\'liq huquq' || fn('mehmon')!=='Mehmon') return 'Rol xatosi';\nreturn null;"
    },
    {
      "id": 9,
      "title": "Buyurtma holati",
      "instruction": "`getOrderStatus(status)` kodi 1 bo'lsa \"Qabul qilindi\", 2 -> \"Tayyorlanmoqda\", 3 -> \"Yetkazilmoqda\", qolganlarga \"Noma'lum\".",
      "startingCode": "function getOrderStatus(status) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Sonlarni qat'iy tipda tekshiradi (masalan case 1:).",
      "test": "const sandbox = new Function(code + '; return getOrderStatus;');\nconst fn = sandbox();\nif(fn(1)!=='Qabul qilindi' || fn(3)!=='Yetkazilmoqda' || fn(5)!=='Noma\\'lum') return 'Buyurtma holati noto\\'g\\'ri';\nreturn null;"
    },
    {
      "id": 10,
      "title": "Oyliklar chegarasi",
      "instruction": "Foydalanuvchi mablag'iga ko'ra darajasini aniqlovchi `getSalaryLevel(amount)` ni switch(true) orqali yozing: > 1000 - 'Yuqori', > 500 - 'O'rta', qolgani 'Past'.",
      "startingCode": "function getSalaryLevel(amount) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "switch (true) { case amount > 1000: ... }",
      "test": "const sandbox = new Function(code + '; return getSalaryLevel;');\nconst fn = sandbox();\nif(fn(1500)!=='Yuqori' || fn(700)!=='O\\'rta' || fn(200)!=='Past') return 'Oylik darajalari hisobi xato';\nreturn null;"
    }
  ],
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
