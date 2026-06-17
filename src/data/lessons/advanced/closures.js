export const closures = {
  id: "closures",
  title: "Closures (Yopilishlar) va Lexical Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Closures (Yopilishlar) va Lexical Scope nima?
* **Lexical Scope (Leksik qamrov):** Bu JavaScript-da o'zgaruvchilarning kodda yozilgan joyiga qarab qamrab olinish qoidasidir. Ya'ni, ichki funksiya har doim o'zi yozilgan leksik muhit (tashqi funksiya va global qamrov) ichidagi o'zgaruvchilarga kirish huquqiga ega.
* **Closure (Yopilish):** Tashqi funksiya o'z ishini yakunlab, Call Stack-dan chiqib ketganidan keyin ham, uning ichida yaratilgan ichki funksiyaning o'sha tashqi o'zgaruvchilarni "eslab qolish" va ulardan foydalana olish qobiliyatidir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **maktabni tamomladingiz**:
* **Tashqi funksiya:** Sizning maktabdagi davringiz.
* **O'zgaruvchilar:** Sizning sinfdoshlaringiz va maktabdagi xotiralar.
* **Ichki funksiya (Closure):** Siz maktabni bitirib ketganingizdan keyin ham (tashqi funksiya bajarilib bo'lgach), sizdagi **esdalik daftari** yoki xotiralaringiz. Siz uydasiz, lekin istalgan paytda daftarni ochib sinfdoshlaringiz ismlarini (tashqi o'zgaruvchilarni) o'qiy olasiz. Bu daftar siz bilan doimo yopiq holda yuradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda Yopilish)
\`\`\`javascript
function greetOuter(greeting) {
  // greeting o'zgaruvchisi tashqi funksiya qamrovida
  return function greetInner(name) {
    console.log(\`\${greeting}, \${name}!\`);
  };
}

// greetOuter bajarilib tugadi va "Salom" so'zini yopib oldi
const sayHello = greetOuter("Salom");

sayHello("Jasur"); // "Salom, Jasur!"
sayHello("Lola");  // "Salom, Lola!"
\`\`\`

### 2. Intermediate Example (Private Variables - Maxfiy ma'lumotlar)
Tashqaridan to'g'ridan-to'g'ri o'zgartirib bo'lmaydigan, faqat metodlar orqali boshqariladigan bank hisobi:
\`\`\`javascript
function createBankAccount(ownerName, initialBalance) {
  let balance = initialBalance; // Tashqaridan yopiq o'zgaruvchi

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(\`\${amount} UZS qo'shildi. Joriy balans: \${balance}\`);
      }
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(\`\${amount} UZS yechildi. Joriy balans: \${balance}\`);
      } else {
        console.log("Mablag' yetarli emas!");
      }
    },
    getBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount("Farhod", 100000);
myAccount.deposit(50000); // 50000 UZS qo'shildi...
myAccount.withdraw(30000); // 30000 UZS yechildi...
console.log(myAccount.balance); // undefined (to'g'ridan-to'g'ri kirib bo'lmaydi)
console.log(myAccount.getBalance()); // 120000
\`\`\`

### 3. Advanced Example (Function Currying va dynamic konfiguratsiya)
\`\`\`javascript
const taxCalculator = (taxRate) => (amount) => amount * taxRate;

const calculateVAT = taxCalculator(0.12); // 12% QQS
const calculateIncomeTax = taxCalculator(0.12); // 12% daromad solig'i

console.log(calculateVAT(100000)); // 12000
console.log(calculateVAT(250000)); // 30000
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Lexical Environment va Execution Context
JavaScript-da har bir ishga tushadigan blok va funksiya o'zining **Lexical Environment (Leksik Muhit)** obyektiga ega bo'ladi. U ikki qismdan iborat:
1. **Environment Record:** Hozirgi qamrovdagi barcha lokal o'zgaruvchilar va parametrlar saqlanadigan joy.
2. **Outer Reference:** Tashqi (ota) Leksik Muhitga havola (ko'rsatkich).

Qachonki funksiya chaqirilganda, u yangi execution context yaratadi, lekin uning \`[[Environment]]\` deb nomlanuvchi maxfiy ichki xossasi funksiya yaratilgan joydagi Lexical Environment-ni xotirada ushlab turadi.
Tashqi funksiya tugasa ham, ichki funksiya uning Lexical Environment-iga havola (\`[[Environment]]\`) saqlab turgani uchun, Garbage Collector (axlat yig'uvchi) tashqi funksiyaning xotirasini tozalab yubora olmaydi.

> [!IMPORTANT]
> Closures faqat funksiya bajarilayotganda emas, balki funksiya **e'lon qilinayotgan (yaratilayotgan) vaqtda** o'zining atrof-muhitini (lexical environment) muhrlab (yopib) oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Loop ichida \`var\` ishlatib closures yaratish
#### Xato:
\`\`\`javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Konsolga uch marta "4" chiqadi.
\`\`\`
#### Nima uchun:
\`var\` block scope-ga ega emas, shuning uchun butun loop davomida bitta \`i\` o'zgaruvchisi ishlatiladi. \`setTimeout\` callbacki ishga tushganda \`i\` allaqachon 4 ga teng bo'lib qoladi.
#### To'g'ri usul:
\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Konsolga "1, 2, 3" chiqadi, chunki \`let\` har bir iteratsiya uchun alohida lexical scope yaratadi.
\`\`\`

### 2. Xotira oqishi (Memory Leak) - closures havolasini uzmaslik
#### Muammo:
Agar yopilish funksiyasi juda katta hajmdagi ma'lumotlarni saqlasa va u global o'zgaruvchida saqlanib turaversa, xotira tozalansa ham u bo'shamaydi.
#### To'g'ri usul:
Ishlatib bo'lingach havolani \`null\` qilish:
\`\`\`javascript
let heavyFn = (function() {
  let giantData = new Array(1000000).fill("data");
  return () => console.log(giantData.length);
})();
// Ishlatib bo'lingandan keyin:
heavyFn = null; // Endi xotira Garbage Collector tomonidan tozalanadi
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Closure nima?
   * **Javob:** Ichki funksiyaning o'zi yozilgan tashqi funksiya qamrovidagi o'zgaruvchilarga kirish huquqini saqlab qolishi.
2. **Savol:** Leksik qamrov (Lexical Scope) nima?
   * **Javob:** O'zgaruvchilar qamrovining kod yozilgan vaqtidagi joylashuviga qarab belgilanishi.
3. **Savol:** Quyidagi kod nima chiqaradi? \`const add = x => y => x+y; console.log(add(2)(3));\`
   * **Javob:** \`5\` chiqadi, currying va yopilish hisobiga.
4. **Savol:** Agar funksiya o'zgaruvchini o'zida topa olmasa nima qiladi?
   * **Javob:** Outer reference (tashqi havola) orqali ota qamrovlardan qidiradi (Scope Chain).

### Middle
5. **Savol:** Yopilishlar xotiraga qanday ta'sir qiladi?
   * **Javob:** Ular o'zgaruvchilarni Garbage Collector-dan himoya qilib, xotirada ushlab turadi, bu RAM sarfini oshiradi.
6. **Savol:** Module Pattern nima va uning closures ga qanday aloqasi bor?
   * **Javob:** Bu kodni alohida qismlarga ajratib, faqat kerakli metodlarni tashqariga ochib berish va o'zgaruvchilarni closure orqali private qilish usulidir.
7. **Savol:** \`let\` kalit so'zi qanday qilib loop-dagi closure muammosini hal qiladi?
   * **Javob:** Har bir sikl qadami uchun alohida block scope yaratadi va har safar o'zgaruvchining yangi nusxasi closure-ga bog'lanadi.
8. **Savol:** Immediately Invoked Function Expression (IIFE) nima va nima uchun u ilgari closures uchun ishlatilgan?
   * **Javob:** U darhol ishga tushadigan funksiya bo'lib, o'zgaruvchilarni global scope-dan himoyalash va scope-ni izolyatsiya qilish uchun ishlatilgan.

### Senior
9. **Savol:** V8 dvigateli closures xotirasini optimallashtiradimi?
   * **Javob:** Ha, V8 dvigateli ichki funksiyada umuman ishlatilmagan tashqi o'zgaruvchilarni xotirada saqlamaydi va ularni lexical scope-dan olib tashlaydi.
10. **Savol:** Detached DOM element va closure o'rtasidagi bog'liqlikni tushuntiring.
    * **Javob:** Agar yopilish ichida DOM elementi o'zgaruvchiga olingan bo'lsa va keyinchalik u DOM-dan o'chirilsa ham, closure uni xotirada ushlab turadi (Memory leak).
11. **Savol:** Bir vaqtda yaratilgan bir nechta closures bitta Lexical Environment obyekti bilan ulashadimi?
    * **Javob:** Ha, bitta tashqi funksiya ichida yaratilgan barcha ichki funksiyalar aynan o'sha bitta umumiy Lexical Environment obyekti bilan ulashadi (ya'ni bitta o'zgaruvchini hammasi o'zgartira oladi).
12. **Savol:** \`new Function()\` sintaksisi closures yaratadimi?
    * **Javob:** Yo'q, \`new Function()\` orqali yaratilgan funksiyalar har doim global scope-ni o'zlarining tashqi muhiti deb hisoblaydilar, yopilgan leksik muhitni emas.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz yopilishlar yordamida hisoblagich, inkapsulyatsiya va currying kabi amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi bilimingizni sinash uchun testlar.

---

## 8. 🎯 Real Project Case Study

### API So'rovlarini Cheklovchi (Rate Limiter) Tizim
Katta loyihalarda foydalanuvchining tugmani ko'p marta bosib yuborishidan (spamming) himoya qilish uchun ma'lum vaqt oralig'ida faqat bir marta so'rov yuborish funksiyasi kerak bo'ladi (Throttle/Debounce). Buni closures yordamida yozamiz:

\`\`\`javascript
function throttle(func, limit) {
  let inThrottle = false; // Holat closure-da saqlanadi
  
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Amaliy qo'llanishi:
const handleScroll = () => console.log("Sahifa skrol qilindi!");
const optimizedScroll = throttle(handleScroll, 200);

window.addEventListener('scroll', optimizedScroll);
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Ehtiyotkorlik bilan foydalaning:** Agar yopilish funksiyasi ko'p marta yaratilsa, har safar yangi xotira bloki ajratiladi.
* **Ishlatib bo'lgach tozalang:** closures saqlangan global o'zgaruvchilarni vaqti-vaqti bilan \`null\` qilib turing.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Qisqa Tavsif | Misol |
| :--- | :--- | :--- |
| **Lexical Scope** | Kod yozilgan joyga ko'ra scope belgilanishi | Ichki funksiya tashqarisini ko'ra oladi |
| **Closure** | Tashqi o'zgaruvchilarni "eslab qolgan" funksiya | \`const fn = outer(); fn();\` |
| **Private variable** | Tashqaridan berkitilgan ma'lumot | \`let _secret = 123;\` |
| **Currying** | Parametrlarni ketma-ket qabul qilish | \`add(x)(y)\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "Sodda Hisoblagich",
    "instruction": "Har safar chaqirilganda qiymati 1 taga oshib boradigan funksiyani qaytaruvchi `createCounter()` funksiyasini yozing. Qiymat 1 dan boshlanishi kerak.",
    "startingCode": "function createCounter() {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Ichki o'zgaruvchi `let count = 0;` yarating va ichki funksiya qaytaring, u `count`ni oshirib qaytarsin.",
    "test": "const sandbox = new Function(code + '; return createCounter;');\nconst fn = sandbox();\nconst counter = fn();\nif (typeof counter !== 'function') return 'createCounter funksiya qaytarishi kerak';\nif (counter() !== 1) return 'Birinchi chaqiruvda 1 qaytishi kerak';\nif (counter() !== 2) return 'Ikkinchi chaqiruvda 2 qaytishi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Maxfiy Kalit Saqlovchi (Encapsulation)",
    "instruction": "Berilgan `secret` qiymatini yashirin holda saqlovchi va uni boshqarish uchun `getSecret()` hamda `setSecret(newSecret)` metodlariga ega bo'lgan obyekt qaytaruvchi `createSecretHolder(secret)` funksiyasini yozing.",
    "startingCode": "function createSecretHolder(secret) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Obyekt qaytaring: `{ getSecret: () => ..., setSecret: (val) => ... }` ko'rinishida yozing va `secret` o'zgaruvchisini yopilishda saqlang.",
    "test": "const sandbox = new Function(code + '; return createSecretHolder;');\nconst fn = sandbox();\nconst holder = fn('maxfiy');\nif (typeof holder !== 'object') return 'Obyekt qaytarilishi kerak';\nif (typeof holder.getSecret !== 'function' || typeof holder.setSecret !== 'function') return 'getSecret va setSecret metodlari bo\\'lishi kerak';\nif (holder.getSecret() !== 'maxfiy') return 'Boshlang\\'ich maxfiy qiymat xato';\nholder.setSecret('yangi');\nif (holder.getSecret() !== 'yangi') return 'setSecret metodi qiymatni o\\'zgartirmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Ko'paytiruvchi Funksiya (Currying)",
    "instruction": "Birinchi bosqichda `multiplier` (ko'paytiruvchi) sonini oladigan va ikkinchi bosqichda boshqa bir son olib, ularning ko'paytmasini qaytaradigan funksiya yozing.",
    "startingCode": "function multiplyBy(multiplier) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "multiplier-ni yopilish orqali saqlovchi va boshqa `num` parametrini qabul qiluvchi ichki funksiya qaytaring.",
    "test": "const sandbox = new Function(code + '; return multiplyBy;');\nconst fn = sandbox();\nconst double = fn(2);\nif (typeof double !== 'function') return 'multiplyBy funksiya qaytarishi kerak';\nif (double(5) !== 10) return '2 ga ko\\'paytirish xato bajarildi';\nconst triple = fn(3);\nif (triple(4) !== 12) return '3 ga ko\\'paytirish xato bajarildi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Lexical Scope (Leksik qamrov) deganda nima tushuniladi?",
    "options": [
      "Funksiyaning qayerda chaqirilganiga qarab o'zgaruvchilarni qidirish qoidasi",
      "Funksiya yozilgan (e'lon qilingan) joydagi jismoniy joylashuviga ko'ra o'zgaruvchilar qamrovining belgilanishi",
      "Faqat `global` kontekstda mavjud bo'lgan o'zgaruvchilar to'plami",
      "Dastur ishga tushganda dynamic o'zgaradigan vaqtinchalik xotira"
    ],
    "correctAnswer": 1,
    "explanation": "Lexical Scope — bu funksiya qayerda chaqirilganidan qat'i nazar, uning e'lon qilingan joyidagi o'zgaruvchilar qamroviga kirish huquqidir."
  },
  {
    "id": 2,
    "question": "Closure (Yopilish) nima?",
    "options": [
      "Funksiyani bajarilishini majburiy to'xtatuvchi kalit so'z",
      "JavaScript-da barcha o'zgaruvchilarni o'chirish jarayoni",
      "Ichki funksiyaning o'zidan tashqaridagi (leksik atrof-muhitdagi) o'zgaruvchilarni eslab qolishi va ulardan foydalana olish xususiyati",
      "Faqat matematik funksiyalarni bog'lovchi zanjir"
    ],
    "correctAnswer": 2,
    "explanation": "Closure ichki funksiya o'zining tashqi funksiyasi bajarilib bo'lingandan keyin ham tashqi qamrovdagi o'zgaruvchilarni eslab qolishi va ishlata olishidir."
  },
  {
    "id": 3,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nfunction outer() {\n  let x = 10;\n  return function inner() {\n    console.log(x);\n  };\n}\nconst fn = outer();\nfn();\n```",
    "options": [
      "`undefined`",
      "`ReferenceError`",
      "`10`",
      "`null`"
    ],
    "correctAnswer": 2,
    "explanation": "`fn` o'zgaruvchisi `inner` funksiyasini ushlab turibdi. `outer` bajarilib bo'lsa ham, `inner` yopilish (closure) tufayli `x = 10` qiymatini eslab qolgan va 10 ni chiqaradi."
  },
  {
    "id": 4,
    "question": "JavaScript-da closures qanday holatda avtomatik ravishda hosil bo'ladi?",
    "options": [
      "Faqat `class` e'lon qilinganda",
      "Ichki funksiya o'zining tashqi leksik qamrovidagi o'zgaruvchilardan foydalangan holda tashqariga uzatilganda (yoki saqlanganda)",
      "Har safar `if-else` shart operatori yozilganda",
      "Faqat `use strict` rejimi yoqilganda"
    ],
    "correctAnswer": 1,
    "explanation": "Ichki funksiya tashqi funksiya qamrovidagi o'zgaruvchilarga murojaat qilganda va tashqi funksiya tugaganidan keyin ham chaqirilganda closure vujudga keladi."
  },
  {
    "id": 5,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nfunction makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = makeCounter();\nconst c2 = makeCounter();\nconsole.log(c1());\nconsole.log(c1());\nconsole.log(c2());\n```",
    "options": [
      "`1, 2, 3`",
      "`1, 1, 1`",
      "`1, 2, 1`",
      "`1, 2, 2`"
    ],
    "correctAnswer": 2,
    "explanation": "`makeCounter()` har safar chaqirilganda yangi xotira muhiti (lexical environment) va yangi `count` o'zgaruvchisi yaratiladi. Shuning uchun `c1` va `c2` o'zlarining mustaqil hisoblagichlariga ega. `c1` ikki marta chaqirilib `1, 2` bo'lsa, `c2` birinchi chaqiruvda `1` qaytaradi."
  },
  {
    "id": 6,
    "question": "Closures yordamida obyektga xos qanday muhim konseptni simulyatsiya qilish mumkin?",
    "options": [
      "Polimorfizm",
      "Ko'p tarmoqli vorislik",
      "Inkapsulyatsiya (Encapsulation) va xususiy (private) o'zgaruvchilar yaratish",
      "Xotirani majburiy tozalash"
    ],
    "correctAnswer": 2,
    "explanation": "Closures yordamida tashqaridan to'g'ridan-to'g'ri kirib bo'lmaydigan, faqat maxsus metodlar orqali boshqariladigan private (xususiy) o'zgaruvchilarni yaratib, inkapsulyatsiyani amalga oshirish mumkin."
  },
  {
    "id": 7,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet a = 5;\nfunction printA() {\n  console.log(a);\n}\nfunction test() {\n  let a = 10;\n  printA();\n}\ntest();\n```",
    "options": [
      "`10`",
      "`5`",
      "`undefined`",
      "`ReferenceError`"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript leksik qamrovga ega. `printA` e'lon qilingan joyda `a` o'zgaruvchisi global qamrovdagi `5` ga teng. `test` funksiyasi ichida `printA` chaqirilganda, u baribir o'zining yaratilgan joyidagi `a = 5` qiymatini oladi (chaqirilgan joydagini emas)."
  },
  {
    "id": 8,
    "question": "Nima uchun closures xotira sarfini (Memory usage) oshiradi?",
    "options": [
      "Chunki ular JS fayl hajmini kattalashtiradi",
      "Chunki yopilish saqlanib turgan muddatda uning tashqi muhitidagi o'zgaruvchilar Garbage Collector (axlat yig'uvchi) tomonidan xotiradan o'chirilmaydi",
      "Chunki ular faqat RAM xotiraning eng qimmat qismida ishlaydi",
      "Bu noto'g'ri ma'lumot, closures xotira sarfini kamaytiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Leksik atrof-muhitdagi o'zgaruvchilarga bo'lgan havolalar (references) ichki funksiya yashar ekan saqlanib qoladi, bu Garbage Collector-ga ularni tozalashga yo'l qo'ymaydi."
  },
  {
    "id": 9,
    "question": "Quyidagi loop muammosi qanday natija beradi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
    "options": [
      "`0, 1, 2` ketma-ketlikda",
      "`3, 3, 3` ketma-ketlikda",
      "`0, 0, 0` ketma-ketlikda",
      "`undefined, undefined, undefined`"
    ],
    "correctAnswer": 1,
    "explanation": "`var` kalit so'zi block scope-ga ega bo'lmagani uchun butun sikl davomida bitta umumiy `i` ishlatiladi. 100ms o'tgach callbacklar ishlaganda, `i` ning qiymati allaqachon `3` ga yetib bo'lgan bo'ladi. Har bir callback o'sha global `i` ning oxirgi qiymatini (3) o'qiydi."
  },
  {
    "id": 10,
    "question": "Yuqoridagi loop-da `0, 1, 2` chiqishi uchun qaysi o'zgartirishni kiritish eng oson yo'ldir?",
    "options": [
      "`var` so'zini `let` ga almashtirish",
      "`setTimeout` vaqtini `0` qilish",
      "`console.log` o'rniga `alert` yozish",
      "Siklni teskari tomonga aylantirish"
    ],
    "correctAnswer": 0,
    "explanation": "`let` kalit so'zi block scope-ga ega bo'lib, har bir sikl iteratsiyasi uchun yangi o'zgaruvchi va yangi leksik qamrov (scope) yaratadi. Natijada har bir callback o'zining shaxsiy `i` qiymatini saqlab qoladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod natijasini aniqlang:\n```javascript\nconst add = x => y => x + y;\nconsole.log(add(10)(20));\n```",
    "options": [
      "`NaN`",
      "`undefined`",
      "`30`",
      "`TypeError: add(...) is not a function`"
    ],
    "correctAnswer": 2,
    "explanation": "Bu Currying usulidir. `add(10)` chaqirilganda `x = 10` qiymatini yopilishda saqlab qolgan yangi funksiya qaytadi. Uni keyin `(20)` bilan chaqirganda natija `10 + 20 = 30` bo'ladi."
  },
  {
    "id": 12,
    "question": "Yopilishlardan foydalangandan so'ng xotirada ortiqcha havola (Memory leak) qolmasligi uchun nima qilish kerak?",
    "options": [
      "Funksiyani har doim `use strict` ichida yozish",
      "Yopilishni ushlab turgan tashqi o'zgaruvchi havolasini `null` ga tenglash yoki o'chirish",
      "Dasturni qayta yuklash",
      "`delete` operatorini funksiyaga nisbatan ishlatish"
    ],
    "correctAnswer": 1,
    "explanation": "Agar yopilish funksiyasiga havola qiluvchi o'zgaruvchini `null` qilsangiz, Garbage Collector unga bog'liq butun leksik qamrovni xotiradan tozalab yuboradi."
  }
]

};
