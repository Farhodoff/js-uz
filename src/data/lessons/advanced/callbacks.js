export const callbacks = {
  id: "callbacks",
  title: "Callbacks va Asinxronlik asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Callback va Asinxronlik nima?
* **Callback funksiya:** Boshqa funksiyaga argument (parametr) sifatida uzatiladigan va ma'lum bir hodisa sodir bo'lgandan yoki biror amal bajarilgandan keyin chaqiriladigan funksiyadir.
* **Asinxronlik:** Dasturning biror vaqt talab qiladigan vazifa (masalan, internetdan ma'lumot yuklash) tugashini kutmasdan, keyingi kodlarni bajarishni davom ettirish xususiyatidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoranga borib taom buyurtma qildingiz**:
* **Sinxron usul:** Siz buyurtmani berasiz va taom tayyor bo'lmaguncha kassa oldida kutib turasiz. Orqangizdagi navbatdagilar ham siz tufayli kutaveradi (dastur bloklanadi).
* **Asinxron va Callback usuli:** Siz buyurtmani berasiz va kassir sizga **pager (qo'ng'iroqcha)** berib, stolga o'tirishingizni aytadi. Siz bemalol telefoningizni titib o'tiraverasiz (bloklanmagan asinxron harakat). Taom tayyor bo'lganda, pager chalinsa (callback chaqiriladi), borib taomni olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sinxron Callback)
Hech qanday kutishlarsiz, massiv metodlarida darhol ishlaydigan callback:
\`\`\`javascript
const numbers = [1, 2, 3];

// map metodiga callback funksiya uzatilmoqda
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6]
\`\`\`

### 2. Intermediate Example (Asinxron Callback - setTimeout)
Vaqt o'tgandan keyin ishga tushuvchi callback:
\`\`\`javascript
console.log("Buyurtma berildi...");

// 2 soniyadan keyin ishlovchi asinxron callback
setTimeout(() => {
  console.log("Taom tayyor bo'ldi! (Callback ishga tushdi)");
}, 2000);

console.log("Do'stlar bilan suhbat davom etmoqda...");
// Natija tartibi:
// 1. Buyurtma berildi...
// 2. Do'stlar bilan suhbat davom etmoqda...
// 3. (2 soniyadan keyin) Taom tayyor bo'ldi!
\`\`\`

### 3. Advanced Example (Callback Hell / Pyramid of Doom)
Bir asinxron operatsiya ikkinchisiga bog'liq bo'lsa, kod bir-birining ichiga kirib ketadi:
\`\`\`javascript
getUser(1, (user) => {
  console.log("Foydalanuvchi:", user.name);
  getPosts(user.id, (posts) => {
    console.log("Postlar olindi:", posts);
    getComments(posts[0].id, (comments) => {
      console.log("Izohlar:", comments);
      // Va hokazo... kod o'ng tomonga qarab surilib ketadi (Callback Hell)
    });
  });
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Event Loop va Web APIs
JavaScript **Single-Threaded** (bir oqimli) til bo'lib, bir vaqtning o'zida faqat bitta vazifani bajara oladi. Asinxron operatsiyalar quyidagicha boshqariladi:
1. **Call Stack:** Kod bajarilayotgan joy. Asinxron funksiya (masalan, \`setTimeout\`) stack-ga tushadi va darhol brauzerga (Web API) topshirilib, stack-dan chiqib ketadi.
2. **Web APIs:** Brauzer orqa fonda taymerni hisoblaydi yoki tarmoq so'rovini bajaradi.
3. **Callback Queue (Task Queue):** Taymer tugagach yoki so'rov javobi kelgach, callback funksiyasi navbatga (Queue) yuboriladi.
4. **Event Loop:** Stack butunlay bo'shaganligini tekshiradi. Agar stack bo'sh bo'lsa, Callback Queue-dagi birinchi callbackni olib, bajarish uchun Stack-ga yuklaydi.

> [!WARNING]
> Agar sinxron kodda cheksiz sikl yoki og'ir operatsiya bajarilsa, Call Stack bo'shamaydi va asinxron callbacklar xizmat navbatida abadiy qolib ketadi (sahifa qotib qoladi).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Foydalanuvchi ma'lumotlarini bazadan olish simulyatsiyasi
Keling, bazadan asinxron tarzda ma'lumot oluvchi va natijani callback orqali qaytaruvchi dasturcha yozamiz.

\`\`\`javascript
// 1. Asinxron tarzda foydalanuvchini oluvchi funksiya
function fetchUserFromDB(userId, callback) {
  console.log("Ma'lumotlar bazasiga so'rov yuborildi...");
  
  setTimeout(() => {
    const mockUser = { id: userId, name: "Farhod", role: "Admin" };
    // Muvaffaqiyatli yakunlangach callback chaqiriladi va ma'lumot uzatiladi
    callback(mockUser);
  }, 1500);
}

// 2. Callback funksiya sifatida ishlatiladigan qism
const displayUser = (user) => {
  console.log(\`Foydalanuvchi olindi: \${user.name}, Roli: \${user.role}\`);
};

// 3. Funksiyani ishga tushiramiz
fetchUserFromDB(101, displayUser);
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Callback funksiyani uzatish o'rniga chaqirib yuborish
* **Noto'g'ri:**
  \`\`\`javascript
  // Funksiya zudlik bilan ishga tushib ketadi, setTimeout esa uning natijasini kutadi
  setTimeout(sayHello(), 1000); 
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  // Funksiya reference-i uzatiladi, u 1 soniyadan keyin chaqiriladi
  setTimeout(sayHello, 1000);
  
  // Yoki arrow funksiya ichida chaqirish:
  setTimeout(() => sayHello(), 1000);
  \`\`\`

### 2. Yo'qolgan \`this\` konteksti (Loss of 'this')
Obyekt metodini callback sifatida boshqa joyga berib yuborganda \`this\` yo'qoladi.
* **Noto'g'ri:**
  \`\`\`javascript
  const user = {
    name: "Sardor",
    greet() { console.log(\`Salom, \${this.name}\`); }
  };
  setTimeout(user.greet, 1000); // "Salom, undefined" chiqadi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  // bind yordamida context-ni yopishtirib uzatamiz
  setTimeout(user.greet.bind(user), 1000); 
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tushuncha | Nima uchun kerak | Misol |
| :--- | :--- | :--- |
| **Sinxron Callback** | Massivlarni qayta ishlash, tartiblash | \`arr.forEach(item => console.log(item))\` |
| **Asinxron Callback** | Vaqtinchalik kechikishlar, tarmoq so'rovlari | \`setTimeout(cb, 1000)\` |
| **Callback Hell** | Ketma-ket asinxron operatsiyalarni bog'lash | \`step1(x, () => step2(y, () => step3(z)))\` |
| **Event Loop** | Asinxron vazifalarni Stack-ga olib kelish | Call Stack bo'shaganda Callbacklarni navbatdan oladi |

---

## 7. ❓ Savollar va Javoblar

### 1. Callback funksiyaning oddiy funksiyadan farqi nimada?
Aslida hech qanday farqi yo'q. Istalgan funksiya boshqasiga parametr sifatida berilsa, u callback nomini oladi.

### 2. Callback Hell muammosini qanday hal qilish mumkin?
Uni Promises (Va'dalar) yoki \`async/await\` sintaksisi orqali chiroyli va o'qishli ko'rinishga keltirish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`setTimeout(() => console.log("A"), 0)\` va \`console.log("B")\` kodlaridan qaysi biri birinchi bajariladi va nima uchun? (B, chunki stack bo'shamaguncha A navbatda kutadi).
2. Callback funksiya nima uchun "Inversion of Control" (Boshqaruvni yo'qotish) muammosiga sabab bo'lishi mumkin?
3. Sinxron va asinxron callbacklarning xotirada ishlash farqi nimada?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Callbacks va asinxron JavaScript asoslari bo'yicha ko'nikmalaringizni tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Oddiy Callback",
    "instruction": "Foydalanuvchi ismini olib, uni tabriklovchi callback funksiyasini chaqiradigan `greetUser(name, callback)` funksiyasini yozing. Callback funksiyaga argument sifatida ism uzatilishi kerak.",
    "startingCode": "function greetUser(name, callback) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "callback(name); ko'rinishida chaqiring.",
    "test": "let namePassed = '';\nconst sandbox = new Function(code + '; return greetUser;');\nconst fn = sandbox();\nfn('Jasur', (n) => namePassed = n);\nif (namePassed === 'Jasur') return null;\nreturn 'greetUser callback funksiyasini to\\'g\\'ri chaqirmadi yoki ismni uzatmadi';"
  },
  {
    "id": 2,
    "title": "Asinxron Hisoblagich",
    "instruction": "2 soniyadan (2000 ms) keyin callback funksiyasini ishga tushiradigan `delayExecution(callback)` funksiyasini yozing. Buning uchun `setTimeout` funksiyasidan foydalaning.",
    "startingCode": "function delayExecution(callback) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "setTimeout(callback, 2000);",
    "test": "if (!code.includes('setTimeout')) return 'setTimeout funksiyasidan foydalanilmadi';\nif (!code.includes('2000')) return 'Kutish vaqti 2000 ms qilib belgilanmadi';\nconst sandbox = new Function(code + '; return delayExecution;');\nconst fn = sandbox();\nlet called = false;\nfn(() => called = true);\nif (typeof fn === 'function') return null;\nreturn 'delayExecution funksiyasida xatolik';"
  },
  {
    "id": 3,
    "title": "Massiv elementlarini filtrlash",
    "instruction": "O'zingizning shaxsiy massiv filtrlovchi funksiyangizni yarating. `customFilter(arr, callback)` funksiyasi berilgan `arr` massividan faqat `callback(element)` true qaytargan elementlarni yangi massivga yig'ib qaytarsin.",
    "startingCode": "function customFilter(arr, callback) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Massiv bo'ylab aylanib chiqib, callback(arr[i]) true bo'lsa, elementni yangi massivga push qiling.",
    "test": "const sandbox = new Function(code + '; return customFilter;');\nconst fn = sandbox();\nconst res = fn([1, 2, 3, 4], (x) => x % 2 === 0);\nif (Array.isArray(res) && res.length === 2 && res[0] === 2 && res[1] === 4) return null;\nreturn 'customFilter to\\'g\\'ri filtrlamadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Callback funksiya nima?",
    "options": [
      "Faqat matematik hisob-kitoblarni amalga oshiradigan maxsus ichki funksiya",
      "Boshqa bir funksiyaga argument (parametr) sifatida uzatiladigan va ma'lum bir hodisa sodir bo'lgandan keyin chaqiriladigan funksiya",
      "Brauzer oynasi yopilganda avtomatik ishlaydigan dastur qismi",
      "Faqat xatolarni aniqlaydigan catch bloki"
    ],
    "correctAnswer": 1,
    "explanation": "Callback funksiya boshqa funksiyaga parametr qilib yuboriladi va u funksiya o'z ishini tugatgach yoki biror hodisa bo'lgach (masalan, vaqt tugagach), ushbu callbackni chaqiradi."
  },
  {
    "id": 2,
    "question": "Quyidagi kodda sinxron va asinxron bajarilish sababli konsolga qaysi tartibda javob chiqadi?\n```javascript\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');\n```",
    "options": [
      "`A`, `B`, `C`",
      "`A`, `C`, `B`",
      "`B`, `A`, `C`",
      "`C`, `A`, `B`"
    ],
    "correctAnswer": 1,
    "explanation": "`A` va `C` sinxron kod bo'lib, darhol bajariladi. `setTimeout` esa asinxron vazifadir va u 0 millisekund berilgan bo'lsa ham, Call Stack bo'shagandan keyingina (Event Loop orqali) ishga tushadi. Shuning uchun natija A, C, B bo'ladi."
  },
  {
    "id": 3,
    "question": "Callback Hell (Callback jahannami) iborasi nimani anglatadi?",
    "options": [
      "Ko'p miqdordagi funksiyalar serverda xotira yetishmasligiga olib kelishini",
      "Asinxron operatsiyalarni bajarishda callbacklar bir-birining ichiga juda chuqur joylashib ketishi (nesting) va kodning o'qilishini qiyinlashtirishi",
      "Callback funksiyasi ichida `return` ishlatib bo'lmasligini",
      "Xatolar yuz berganda sahifaning qotib qolishini"
    ],
    "correctAnswer": 1,
    "explanation": "Bir nechta asinxron vazifalar zanjirini callbacks yordamida yozganda, ular bir-birining ichiga kirib ketib, kod o'ngga qarab siljiydi va piramida shaklini oladi (`Pyramid of Doom`), bu Callback Hell deyiladi."
  },
  {
    "id": 4,
    "question": "JavaScript massivlarining qaysi o'rnatilgan metodi callback funksiyani qabul qilmaydi?",
    "options": [
      "`.forEach()`",
      "`.map()`",
      "`.filter()`",
      "`.push()`"
    ],
    "correctAnswer": 3,
    "explanation": "`.push()` metodi massiv oxiriga yangi elementlarni qo'shadi va callback qabul qilmaydi. `.forEach()`, `.map()` va `.filter()` esa har bir element uchun callback funksiyasini ishga tushiradi."
  },
  {
    "id": 5,
    "question": "Sinxron callback nima?",
    "options": [
      "Faqat internet tez bo'lganda ishlaydigan callback",
      "Boshqa funksiya ichida darhol, hech qanday kutishlarsiz, ketma-ketlik bo'yicha bajariladigan callback",
      "Faqat `setTimeout` ichida yoziladigan callback",
      "Kelajakda ma'lum bir voqea sodir bo'lganda ishlaydigan callback"
    ],
    "correctAnswer": 1,
    "explanation": "Sinxron callback hech qanday asinxron kutishlarsiz, chaqirgan funksiya bajarilayotgan paytda darhol ishga tushadi (masalan, `Array.prototype.map` callbacki)."
  },
  {
    "id": 6,
    "question": "Node.js va eski JS kodlarida ko'p qo'llanilgan 'Error-First Callback' patterns nima?",
    "options": [
      "Xatolik yuz berganda dasturni to'xtatuvchi sintaktik qoida",
      "Callback funksiyasining birinchi argumenti har doim xatolik obyekti (`err`) bo'lishi, muvaffaqiyatli natija esa ikkinchi argument bo'lib kelishi",
      "Faqat xato ma'lumotlarni qaytaradigan callback",
      "Brauzer konsoliga birinchi bo'lib xatoni chiqarish usuli"
    ],
    "correctAnswer": 1,
    "explanation": "Error-First callback qoidasiga ko'ra, funksiya tugagach callback chaqirilganda, agar xato bo'lsa `callback(err)`, xato bo'lmasa `callback(null, data)` shaklida birinchi parametrda xatolik tekshiriladi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda `process` funksiyasining callbacki qanday chaqirilgan?\n```javascript\nfunction process(num, cb) {\n  cb(num * 2);\n}\n```",
    "options": [
      "Asinxron tarzda Event Loop yordamida",
      "Sinxron tarzda zudlik bilan",
      "Ma'lum bir vaqt o'tgandan keyin",
      "Faqat xato yuz berganda"
    ],
    "correctAnswer": 1,
    "explanation": "Ushbu funksiya ichida hech qanday asinxron API (`setTimeout`, `fetch` va h.k.) ishlatilmagan. Shuning uchun `cb` sinxron ravishda darhol bajariladi."
  },
  {
    "id": 8,
    "question": "Callback funksiyani argument qilib yuborishda qaysi xato eng ko'p uchraydi?",
    "options": [
      "Funksiya nomini yozish o'rniga uni qavslar bilan chaqirib yuborish (masalan: `setTimeout(myFunc(), 1000)`)",
      "Funksiyani o'zgaruvchiga tenglash",
      "Callback ichida `let` o'rniga `const` ishlatish",
      "Funksiyaga parametr bermaslik"
    ],
    "correctAnswer": 0,
    "explanation": "`myFunc()` deb yozilsa, funksiya zudlik bilan ishga tushadi va uning qaytargan qiymati (ko'pincha `undefined`) argument sifatida uzatiladi. Callback sifatida funksiyaning o'zini uzatish kerak: `setTimeout(myFunc, 1000)`."
  },
  {
    "id": 9,
    "question": "Asinxron callbacklar JavaScript dvigatelining qaysi qismida navbatda (queue) turadi?",
    "options": [
      "Call Stack",
      "Memory Heap",
      "Callback Queue (Task Queue)",
      "Global Context"
    ],
    "correctAnswer": 2,
    "explanation": "Asinxron operatsiya yakunlangach, uning callback funksiyasi Callback Queue-ga joylashtiriladi va Call Stack bo'shagach, u yerga o'tkaziladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nconst doSomething = (cb) => {\n  cb(10);\n};\ndoSomething(val => console.log(val + 5));\n```",
    "options": [
      "`10`",
      "`15`",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 1,
    "explanation": "`doSomething` funksiyasi `cb` ga 10 qiymatini uzatadi. Biz parametr sifatida `val => console.log(val + 5)` funksiyasini yubordik. Natijada `10 + 5 = 15` ekranga chiqadi."
  },
  {
    "id": 11,
    "question": "Callbacks bilan ishlashda 'Inversion of Control' (Boshqaruvning yo'qolishi) muammosi nima?",
    "options": [
      "Dastur yopilib qolishi",
      "Callback funksiyani uchinchi tomon kutubxonasiga topshirganimizda, u callbackni qachon, necha marta va qanday sharoitda chaqirishini o'zimiz to'liq nazorat qila olmasligimiz",
      "Brauzerning callbacklarni o'chirib yuborishi",
      "Dasturning faqat bitta CPU yadrosida ishlashi"
    ],
    "correctAnswer": 1,
    "explanation": "Boshqaruvning yo'qolishi (Inversion of Control) — biz o'z kodimizni (callbackni) boshqa tizim (kutubxona) chaqirishiga ishonib topshiramiz, bu esa xavfsizlik va nazoratni kamaytiradi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nfunction run(callback) {\n  if (callback) {\n    callback();\n  }\n}\nrun();\n```",
    "options": [
      "`TypeError: callback is not a function` xatoligi beradi",
      "Dastur hech qanday xatosiz tugaydi",
      "`undefined` deb yozib chiqadi",
      "Dastur cheksiz siklga tushib qoladi"
    ],
    "correctAnswer": 1,
    "explanation": "`if (callback)` sharti callback uzatilganligini tekshiradi. Biz `run()` ni argumentsiz chaqirganimiz uchun `callback` qiymati `undefined` bo'ladi va shart bajarilmay, xatosiz tugaydi."
  }
]

};
