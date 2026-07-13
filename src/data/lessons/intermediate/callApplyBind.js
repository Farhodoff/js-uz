export const callApplyBind = {
  id: "callApplyBind",
  title: "Call, Apply va Bind (Deep Dive, Polyfills va Memory)",
  language: "javascript",
  theory: `# Call, Apply va Bind nima?

Dasturlashda ko'pincha bitta obyekt uchun yozilgan metodni boshqa obyekt uchun ishlatish ("Method Borrowing" - metod o'g'irlash) zarurati tug'iladi. Buning uchun JavaScriptda 3 ta tayanch metod mavjud: **call()**, **apply()** va **bind()**.

Avvalgi tushuncha:
* **.call(context, arg1, arg2)** — Funksiyani darhol chaqiradi va argumentlarni ketma-ket qabul qiladi.
* **.apply(context, [arg1, arg2])** — Funksiyani darhol chaqiradi va argumentlarni massivda qabul qiladi.
* **.bind(context, arg1)** — Funksiyani darhol chaqirmaydi, balki kelajakda ishlatish uchun context va argumentlar qulflangan **yangi funksiya nusxasini** qaytaradi.

Bu boshlang'ich daraja edi. Keling, endi haqiqiy muhandis (Engineer) kabi Engine darajasiga sho'ng'iymiz!

---

## 🔬 Deep Dive 1: O'zimizning Polyfill'ni yaratamiz (Under the hood)

JavaScript dvigateli (V8) ichida bu metodlar qanday yozilgan? Nega biz funksiyaga boshqa obyektni majburlab tiqa olamiz? Buni tushunishning eng yaxshi yo'li - noldan o'zimizning \`myCall\`, \`myApply\` va \`myBind\` metodlarimizni yaratishdir!

### 1.1 Array.prototype.myCall ni yaratish

Bizga ma'lumki, obyekt ichidagi metod chaqirilganda, \`this\` o'sha obyektning o'zini bildiradi (nuqtadan oldingi narsani). Demak, funksiyani uzatilgan obyekt ichiga "vaqtincha metod" qilib qo'shsak, va uni chaqirib keyin o'chirib tashlasak — maqsadga erishamiz!

\`\`\`javascript
Function.prototype.myCall = function(context, ...args) {
  // 1. Agar context null yoki undefined bo'lsa, global obyekt (window/global) ni olamiz
  context = context || globalThis; 

  // 2. Obyekt ichidagi boshqa propertylar bilan to'qnashib ketmasligi uchun 
  // takrorlanmas noyob kalit (Symbol) yaratamiz
  const uniqueId = Symbol();

  // 3. Funksiyaning O'ZINI (this) shu vaqtinchalik kalitga tenglaymiz
  context[uniqueId] = this;

  // 4. Funksiyani shu obyekt orqali ishga tushiramiz (context endi shu obyektga qulflanadi!)
  const result = context[uniqueId](...args);

  // 5. Izni yo'qotamiz (axlatni tozalaymiz)
  delete context[uniqueId];

  return result;
};

// TEST QILAMIZ:
const obj = { a: 100 };
function getA(b) { return this.a + b; }

console.log(getA.myCall(obj, 50)); // Natija: 150
\`\`\`
Mana, siz hozirgina JavaScriptning eng markaziy API laridan birini noldan kodladingiz! Bu haqiqiy "Method Borrowing" mexanizmi qanday ishlashini to'liq tushuntiradi.

### 1.2 Function.prototype.myBind ni yaratish (Eng ko'p so'raladigan Intervyu savoli)

Bind darhol ishlamaydi, u funksiya qaytarishi kerak. Shuningdek, u oldindan berilgan argumentlarni ham (Currying) yig'ib borishi kerak.

\`\`\`javascript
Function.prototype.myBind = function(context, ...boundArgs) {
  const originalFunc = this;
  
  return function(...callArgs) {
    // Ikkala argumentlarni birlashtirib chaqiramiz
    return originalFunc.apply(context, [...boundArgs, ...callArgs]);
  };
};
\`\`\`

---

## 🧠 Deep Dive 2: V8 Engine, Xotira va Performance (Memory Leaks)

Ajam dasturchilar \`bind()\` ni hamma joyda, ayniqsa React renderlari yoki tsikllar ichida juda ko'p ishlatishadi. Bu xotiraga qanday ta'sir qiladi?

\`bind()\` chaqirilganda V8 dvigateli har doim **Heap (Xotira)** dan yangi joy ajratadi va yangi **Function Object** yaratadi. U asl funksiyaga pointer (yo'llanma) ni va contextni **Closure** sifatida saqlab qoladi.

❌ **YOMON (Memory Leak xavfi):**
\`\`\`javascript
function UserList() {
  for(let i=0; i<10000; i++) {
    // Har bir aylanishda XOTIRADAN YANGI FUNKSIYA UCHUN JOY OLINADI!
    document.getElementById(\`btn-\${i}\`).addEventListener('click', this.handleClick.bind(this));
  }
}
\`\`\`
Agar bu jarayon ko'p marta takrorlansa, Garbage Collector (xotira tozalagich) qiynalib qoladi va sahifa qota boshlaydi. 

✅ **YAXSHI (Reference saqlash):**
\`\`\`javascript
class UserList {
  constructor() {
    // Faqat 1 marta yaratiladi va xotirada joy tejaydi
    this.handleClick = this.handleClick.bind(this); 
  }
  
  render() {
    for(let i=0; i<10000; i++) {
      // Yangi funksiya yaratilmaydi, xuddi o'sha joyga pointer beriladi
      document.getElementById(\`btn-\${i}\`).addEventListener('click', this.handleClick);
    }
  }
}
\`\`\`
> **Muhim:** Arrow functionlar ham xuddi shunday. Render ichida yozilgan \`() => this.handleClick()\` ham xuddi \`bind()\` kabi har safar yangi nusxa (instance) yaratadi. 

---

## 🚨 Deep Dive 3: Qiyin holatlar (Edge Cases)

### Holat: bind() qilingan funksiyaga \\\`new\\\` qo\\'shilsa nima bo\\'ladi?
JavaScriptning qattiq bir qoidasi bor: **\\\`new\\\` operatori \\\`bind\\\` dan kuchliroq!**

\`\`\`javascript
function Animal(name) {
  this.name = name;
}

const fakeContext = { name: "Soxta Jonivor" };
const BoundAnimal = Animal.bind(fakeContext);

// 1. Oddiy chaqirsak, bind ishlaydi (fakeContext ga ta'sir qiladi)
BoundAnimal("Kuchuk"); 
console.log(fakeContext.name); // "Kuchuk"

// 2. Lekin \`new\` bilan chaqirsak, bind O'Z KUCHINI YO'QOTADI!
const cat = new BoundAnimal("Mushuk");
console.log(cat.name); // "Mushuk" (Yangi obyekt yaratildi, fakeContext ignor qilindi)
\`\`\`
**Sababi:** \`new\` arxitekturada har doim noldan bo'sh obyekt \`{}\` yaratishga va unga funksiyaning \`this\` ini burishga dasturlashtirilgan. Shuning uchun u vaqtincha biriktirilgan \`bind\` ni e'tiborsiz qoldiradi. Bu ayniqsa Class lar bilan ishlashda katta ahamiyatga ega.

---

## Mermaid Diagramma (Polyfill va Xotira Tahlili)

Quyida V8 dvigatelida \`.bind()\` ishlaganda xotirada qanday holat yuz berishi tasvirlangan:

\`\`\`mermaid
flowchart TD
    A[Asl Funksiya (Xotirada 1 ta joy)] --> B(bind chaqirildi)
    
    B --> C{Memory Heap}
    C -->|Loop ichida chaqirilsa| D[10000 ta Yangi Funksiya Obyektlari yaratiladi ⚠️]
    C -->|Constructor da 1 marta| E[1 ta Yangi Funksiya Obyekti yaratiladi ✅]
    
    D --> F[Garbage Collector qiyinchilikka uchraydi (Performance drop)]
    E --> G[Optimization va barqarorlik]
\`\`\`

---

## 🎙 Murakkab Intervyu Savollari (Senior daraja)

**1. apply va call qaysi holatlarda bir-biridan sekinroq yoki tezroq ishlaydi?**
**Javob:** Tarixan \`apply\` ga qaraganda \`call\` biroz tezroq (micro-optimizations) ishlagan, chunki dvigatel massivni iteratsiya qilib ochishga vaqt sarflamas edi. Ammo hozirgi zamonaviy V8 dvigatellari (TurboFan va hokazo) ularning ikkalasini ham inline darajasida optimallashtiradi, shuning uchun tezlikdagi farq sezilarli emas. Asosiy e'tiborni qulaylikka (Spread operator yoki Massiv kerakligiga) qaratish lozim.

**2. Ikkita .bind() ni ketma-ket yozsak qaysi biri ishlaydi? ( Masalan: fn.bind(A).bind(B) )**
**Javob:** Faqatgina BIRINCHI \`bind\` ishlaydi! JS da birinchi marta \`bind\` chaqirilganda u o'sha contextga qulflangan yopiq closure funksiyasini qaytaradi. Keyingi chaqirilgan \`bind\`lar bu qulfni ocha olmaydi, ular shunchaki avvalgi bind qilingan funksiyani boshqa context bilan ishga tushirishga urinadi, lekin asl kontekst o'zgarmay qoladi.

**3. Arrow funksiyani call orqali o'zgartira olasizmi? Unda myCall qanday reaksiya qiladi?**
**Javob:** Yo'q, o'zgartirib bo'lmaydi. Arrow funksiyalarning \`this\` pointeri yo'q, u leksikal jihatdan yuqoridagi contextni oladi. Agar \`myCall\` polyfill ni ishlatib qarasak, arrow funksiya chaqirilganda, garchi biz uni o'z obyektimizga biriktirib chaqirsak ham, arrow funksiya baribir tashqi (lexical) \`this\` ni qaytaraveradi. 
`,
  exercises: [
    {
      id: 1,
      title: "myCall yaratilishi tushunchasi",
      instruction: "Aytaylik, obj.myMethod() ni ishga tushirish orqali this = obj bo'ladi. myCall mexanizmini to'g'ri ishlashi uchun getAge funksiyasini user obyektiga qo'shish va uni ishga tushirish kerak. Resutl (res) o'zgaruvchisiga natijani tenglang.",
      startingCode: "const user = { age: 30 };\nfunction getAge() { return this.age; }\n// QADAM 1: getAge ni user ga vaqtinchalik xususiyat (fn) qilib qo'shing.\n// QADAM 2: user.fn() ni chaqirib res ga saqlang.",
      hint: "user.fn = getAge; let res = user.fn();",
      test: "if(typeof res === 'undefined' || res !== 30) throw new Error('Polyfill asosini noto\'g\'ri tushundingiz');"
    },
    {
      id: 2,
      title: "myApply polyfill simulyatsiyasi",
      instruction: "Function.prototype ga myApply metodini yozamiz. U array kutadi. Kodni o'zgartiring va args orqali kelgan massivni yoyib (...) chaqiring.",
      startingCode: "Function.prototype.myApply = function(ctx, argsArray = []) {\n  ctx.fn = this;\n  // ctx.fn ni argsArray bilan qanday chaqirasiz? Natijani qaytaring (return)\n  \n};\nlet r = function(a, b) { return a + b + this.v; }.myApply({v: 10}, [5, 5]);",
      hint: "return ctx.fn(...argsArray);",
      test: "if(r !== 20) throw new Error('Spread operatoridan noto\'g\'ri foydalandingiz');"
    },
    {
      id: 3,
      title: "Ikki marta bind qulflanishi",
      instruction: "Savollarda ko'rganimizdek, fn.bind(A).bind(B) holatida this faqat A ga qulflanadi. Buni test qilamiz. Natijani getName() dan kelayotgan res o'zgaruvchisiga tekshiring.",
      startingCode: "const A = { name: 'A' };\nconst B = { name: 'B' };\nfunction fn() { return this.name; }\nconst bound = fn.bind(A).bind(B);\nlet res = // bound ni chaqiring",
      hint: "bound()",
      test: "if(res !== 'A') throw new Error('Ikkinchi bind e\'tiborsiz qolishini tushunmadingiz');"
    },
    {
      id: 4,
      title: "new operatori va Bind to'qnashuvi",
      instruction: "Bu juda og'ir edge case! Bind qilingan funksiyani new bilan chaqirganda context o'lishini o'rgandik. Kod ishlashi uchun newBound ga new kalit so'zi bilan murojaat qiling va uning color xususiyatini oling.",
      startingCode: "function Car(color) { this.color = color; }\nconst ctx = { color: 'Red' };\nconst boundCar = Car.bind(ctx);\nlet res = // boundCar orqali Blue mashina yasang va uning color ini oling (new operatorini unutmang)",
      hint: "new boundCar('Blue').color",
      test: "if(res !== 'Blue') throw new Error('new operatori qanday qilib bind ni yo\'q qilishini tushunmadingiz');"
    },
    {
      id: 5,
      title: "Hard-Binding Pattern (Qattiq biriktirish)",
      instruction: "Bind metodisiz, closure yordamida funksiyani ma'lum bir contextga qattiq biriktiradigan 'hardBind' funksiyasini yozing. U qabul qilgan fn va ctx ni closure ichida call bilan chaqirishi kerak.",
      startingCode: "function hardBind(fn, ctx) {\n  return function(...args) {\n    // fn ni ctx da call/apply orqali ishga tushiring va qaytaring\n    \n  }\n}\nconst res = hardBind(function(a) { return this.x + a; }, {x: 10})(5);",
      hint: "return fn.apply(ctx, args);",
      test: "if(res !== 15) throw new Error('Hard binding mexanizmini to\'g\'ri amalga oshirmadingiz');"
    },
    {
      id: 6,
      title: "Memory leak oldini olish",
      instruction: "Har safar render chaqirilganda .bind(this) yozish yomon dedik. Class ichida render ishlatganda handleClick metodiga bind funksiyasi konstruktorda BIR marta qulflanishini yozing.",
      startingCode: "class UI {\n  constructor() {\n    // shu yerda this.click ni qulflang\n    \n  }\n  click() { return this.id; }\n}\nlet obj = new UI();",
      hint: "this.click = this.click.bind(this);",
      test: "const ast = arguments[0]; if(!ast.includes('this.click = this.click.bind(this)')) throw new Error('Konstruktorda bind yozish amaliyoti tushirib qoldirildi');"
    },
    {
      id: 7,
      title: "Currying myBind ichida",
      instruction: "bind nafaqat this ni saqlaydi, balki args larni ham biriktiradi (Currying). myBind da args qanday birlashishini tekshiring. a massiv va b massivni yig'indi qilib qaytaring.",
      startingCode: "function sum(a, b) { return a + b; }\n// Faraz qilaylik, myBind ichidamiz\nlet boundArgs = [10]; // birinchi o'tilgan parametr\nlet callArgs = [20];  // keyin chaqirilgan parametr\nlet finalArgs = // ikkala massivni Spread bilan bitta massivga birlashtiring",
      hint: "[...boundArgs, ...callArgs]",
      test: "if(finalArgs.length !== 2 || finalArgs[0]!==10 || finalArgs[1]!==20) throw new Error('Massivlarni birlashtirishda xato (Spread operatori kerak)');"
    },
    {
      id: 8,
      title: "Method Borrowing Arrays",
      instruction: "NodeList yoki Arguments kabi objectlardan oddiy Array ga tegishli .slice() ni qanday ishlatamiz? [].slice.call() usulini sinab ko'ramiz. obj array-like, unga slice qo'llang.",
      startingCode: "const obj = { 0: 'A', 1: 'B', length: 2 };\nlet res = // [].slice ni call bilan obj ga yuboring",
      hint: "[].slice.call(obj);",
      test: "if(!Array.isArray(res) || res[0] !== 'A') throw new Error('Method borrowing arraylarda xato qilingan');"
    },
    {
      id: 9,
      title: "setTimeout va This qutqaruv operatsiyasi",
      instruction: "setTimeout API o'ziga berilgan callbackni darhol ishga tushirmasdan, global muhitda yurgizadi. Qanday qilib uni asrab qolasiz?",
      startingCode: "let ok = false;\nconst timer = { val: true, run() { ok = this.val; } };\n// setTimeout ga run metodini asralgan(bind) holatda bering\nsetTimeout(/* yozing */, 10);",
      hint: "setTimeout(timer.run.bind(timer), 10)",
      test: "const ast = arguments[0]; if(!ast.includes('bind(')) throw new Error('bind yozish esdan chiqdi');"
    },
    {
      id: 10,
      title: "Context null bo'lganda (Edge Case)",
      instruction: "Agar call() dagi birinchi argument null bo'lsa qat'iy (strict mode) bo'lmagan holatda kimning obyekti this ga aylanadi? Javob: globalThis/window. return globalThis === this; ni qaytaradigan funksiyani null bilan call qiling.",
      startingCode: "function checkGlobal() { return this === globalThis; }\nlet res = // checkGlobal ni null context bilan call qiling",
      hint: "checkGlobal.call(null);",
      test: "if(res !== true) throw new Error('Null berilganda Global window obyekt bo\'lishi kerak');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Method Borrowing (Metod o'g'irlash) deganda dvigatel (Engine) darajasida aslida nima sodir bo'ladi?",
      options: [
        "Metod jismonan boshqa obyektga ko'chirib yoziladi",
        "Funksiya ishga tushirilayotgan paytda faqatgina uning Execution Context idagi 'this' ko'rsatkichi (pointer) boshqa obyekt manziliga burib qo'yiladi xolos",
        "Bu xavfli xakerlik hujumi (XSS) turiga kiradi",
        "Yangi Class yaratiladi"
      ],
      correctAnswer: 1,
      explanation: "Funksiyaning xotiradagi o'zgarishi yo'q. Shunchaki call/apply Engine ga 'Hozir shu funksiyani bajarayotganda this so'zini ko'rib qolsang, falon obyektga qara' deb ko'rsatma beradi xolos."
    },
    {
      id: 2,
      question: "Nega Loop (sikl) yoki React Render ichida inline .bind() ni ko'p yozish yomon amaliyot (Anti-pattern) deyiladi?",
      options: [
        "Sintaksis xato bergani uchun",
        "Chunki u ishlamaydi",
        "Chunki .bind() har bir aylanishda V8 dvigateliga YANGI funksiya obyektini Xotiradan (Heap) ajratishga majbur qiladi, bu esa xotirani keraksiz narsalarga to'ldiradi",
        "Sikl (loop) tezligi oshib ketib CPU ni kuydiradi"
      ],
      correctAnswer: 2,
      explanation: "Har qanday .bind() yoki ()=>{} ishlatish sizga toza va yangi funksiya yasab beradi. Render qilingan har bir tugma uchun millionta yangi funksiya yasalishi Performance ni o'ldiradi. Shuning uchun ular bitta qulflangan nusxaga qarashi lozim."
    },
    {
      id: 3,
      question: "O'zimiz yasagan 'myCall' polyfilli ichida context[Symbol()] = this; nega aynan Symbol ishlatiladi?",
      options: [
        "Javascriptda faqat Symbol yordamida funksiya chaqiriladi",
        "Chunki Symbol xavfsiz va obyektdagi allaqachon bor bo'lgan ismlar (kalitlar) bilan tasodifan to'qnashib, ularni ustidan yozib yubormaslikni (Overriding) ta'minlaydi",
        "Shunchaki ko'zga chiroyli ko'rinish uchun",
        "Symbol faqat arraylar uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar context['fn'] qilsak, mabodo obyektda avvaldan 'fn' degan kalit bo'lsa u o'chib ketardi. Symbol esa mutlaqo noyobligi uchun xavfsiz."
    },
    {
      id: 4,
      question: "Agar fn.bind(A).bind(B) deb ikki marta chaqirilsa nima bo'ladi?",
      options: [
        "this A ga emas, eng oxirgi B ga teng bo'ladi",
        "this birinchi berilgan A ga qulflanadi va keyingi bind'lar uni o'zgartira olmaydi",
        "Ikki obyekt birlashib (A+B) ketadi",
        "TypeError berib dastur to'xtaydi"
      ],
      correctAnswer: 1,
      explanation: "Bind bu closure. U o'zining argumentlarini yopib, qulflab qo'yadi. Bir marta qulflangan qulfni boshqa context orqali o'zgartirib bo'lmaydi."
    },
    {
      id: 5,
      question: "Javascriptda qaysi birining kuchi eng ustun?",
      options: [
        "call()",
        "apply()",
        "bind()",
        "new operatori"
      ],
      correctAnswer: 3,
      explanation: "Agar siz funksiyani new so'zi bilan chaqirsangiz, u hatto .bind() qilingan kontekstni ham buzib tashlab, avtomatik ravishda mutlaqo yangi {} obyektga ulanib ketadi."
    },
    {
      id: 6,
      question: "MyBind polyfill ida return qilingan funksiya ichida nega .apply ishlatiladi?",
      options: [
        "apply yozilishi shart emas",
        "Chunki qaytarilgan funksiyaga o'zidan keyin ham cheksiz argumentlar (massiv ko'rinishida) kelib qolishi mumkin, bu argumentlarni saqlab qolingan context ga chiroyli yoyib uzatish uchun",
        "Boshqa ishlash yo'li yo'q",
        "Bu ES6 ning talabi"
      ],
      correctAnswer: 1,
      explanation: "myBind qaytargan funksiyani kim, qachon, qanday argumentlar bilan chaqirishi noma'lum. Shuning uchun ...args massivini eng oson apply qabul qilib oladi."
    },
    {
      id: 7,
      question: "Currying tushunchasi bind bilan qanday aloqador?",
      options: [
        "Hech qanday aloqasi yo'q",
        "Bind orqali funksiyaning argumentlarini avvaldan biriktirib qulflab qoldirish va faqat yetishmayotgan qolgan argumentlarni keyinchalik berish aynan Currying amaliyotidir",
        "Currying faqat async funksiyalar uchun",
        "React dagi component turi"
      ],
      correctAnswer: 1,
      explanation: "Kattaroq arxitekturalarda bind(null, 10) orqali funksiyani har doim birinchi parametrga 10 kiritilgan qisqaroq versiyaga aylantirish (partial application/currying) juda keng qo'llaniladi."
    },
    {
      id: 8,
      question: "Arrow function larda nega myCall ishlatsangiz ham this almashmaydi?",
      options: [
        "Bu Chrome browserning bug'i",
        "Arrow function execution context (bajarilish muhiti) da umuman this, arguments degan yozuvlarga ega emas. U call ni qabul qilsa ham ignor qilib lexical scope'dan topadi",
        "myCall da xatolik bor",
        "Unda class ishlatish kerak"
      ],
      correctAnswer: 1,
      explanation: "Arrow function this ga pointer yaratmaslik orqali memory (xotira) tejaydi, shuning uchun uni context binding metodlari umuman qiziqtirmaydi."
    },
    {
      id: 9,
      question: "Method Borrowing ni Array larda qanday qo'llaymiz?",
      options: [
        "[].concat.call()",
        "[].slice.call(arguments) kabi usul orqali massivlarga tegishli mukammal metodlarni massivga o'xshash (length xususiyati bor) obyektlar ustida yuritish uchun ishlatamiz",
        "Faqat String obyekti bilan ishlaganda",
        "Borrowing ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "DOM dan qaytgan NodeList yoxud arguments obyekti huddi massivga o'xshaydi lekin unda filter, map lar yo'q. Aynan call/apply orqali Array prototype dan ularga metod o'g'irlab beramiz."
    },
    {
      id: 10,
      question: "Strict Mode (Qat'iy rejim) da .call(null) deyilsa context nima bo'ladi?",
      options: [
        "Global window ga aylanadi",
        "Aynan null bo'lib qoladi, uni avtomatik ravishda Global obyektga (window) o'g'irlamaydi",
        "Reference Error beradi",
        "Undefined qaytadi"
      ],
      correctAnswer: 1,
      explanation: "Eskicha javascriptda this bo'sh (null/undefined) bo'lsa uni window ga almashtirib qo'yish kabi xavfli yondashuv bor edi. 'use strict' bu ishni bloklaydi."
    },
    {
      id: 11,
      question: "setTimeout ichidagi yo'qolgan context (Losing this) sababi nimada?",
      options: [
        "Sababi setTimeout qabul qilib olgan funksiyani chaqirayotganda oldida hech qanday obyekt nuqtasi bo'lmaydi (oddiy cb() qilib chaqiradi), bu qoida this ni globalga tortib ketishidir",
        "Vaqt hisoblagichi this ni tozalaydi",
        "Bu Javascriptda doimiy error",
        "Obyekt setTimeout dan oldin o'lib ketadi"
      ],
      correctAnswer: 0,
      explanation: "Qoida aniq: metod funksiya() qilib ochiq chaqirilsa window, obyekt.metod() qilib chaqirilsa this obyekt bo'ladi. setTimeout qabul qilgan funksiyani birinchi yo'l bilan yashirincha chaqiradi."
    },
    {
      id: 12,
      question: "Dasturchi muhandis (Engineer) sifatida darslar sayoz yoki chuqur ekanligini qayerdan bilamiz?",
      options: [
        "Kodning yuzaki yozilishi yoki o'xshatishlar ko'pligiga qarab",
        "Bitta metod qachon va qanday ishlashini (API usage) bilishdan tashqari, uning xotirada qancha joy olishi, polyfill asoslari, garbage collection ta'siri va Engine (V8) dagi harakatlarini ongli tushunish farqi orqali",
        "Faqat katta so'zlar bilan tushuntirilishidan",
        "Inglizcha dokumintatsiyasi uzunligidan"
      ],
      correctAnswer: 1,
      explanation: "Siz chuqur (Deep dive) darajani tanladingiz. Bu daraja o'z navbatida Javascript ning har qanday Senior darajadagi intervyusiga bemalol kirib borishga poydevor hisoblanadi."
    }
  ]
};
