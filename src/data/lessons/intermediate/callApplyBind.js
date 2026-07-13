export const callApplyBind = {
  id: "callApplyBind",
  title: "Call, Apply va Bind Metodlari",
  language: "javascript",
  theory: `# Call, Apply va Bind nima?

JavaScriptda ba'zida bir obyektning funksiyasini (metodini) o'g'irlab, uni mutlaqo boshqa obyekt uchun ishlatish kerak bo'lib qoladi. Ya'ni, kimningdir "this" ini boshqa "this" bilan vaqtincha yoki butunlay almashtirish zarurati tug'iladi.

Aynan shu ishni bajarish uchun JS bizga 3 ta "Sehrli Metod" ni beradi: **call()**, **apply()** va **bind()**.

### Hayotiy o'xshatish: Ijaraga olingan avtomobil (Rent a Car)

Tasavvur qiling, **Ali** degan haydovchining zo'r funksiyasi (haydash qobiliyati) bor. Ammo uning mashinasi yo'q. **Vali**ning esa zo'r mashinasi (obyekti / "this") bor, lekin haydashni bilmaydi. Alini Valining mashinasiga qanday qilib o'tqazamiz?

* **.call()** — "Mashinangni hoziroq ber, men bitta-bitta odam (parametr) mindirib haydayman."
* **.apply()** — "Mashinangni hoziroq ber, lekin men odamlarni bitta katta avtobusga (Massivga / Arrayga) solib mindiraman."
* **.bind()** — "Mashinangning kalitidan nusxa yasab ber, uni o'zim bilan olib ketib, xohlagan paytim minaman."

---

## 1. call() metodi (Darhol chaqirish)

\`call()\` funksiyani **darhol ishga tushiradi** va uning ichidagi \`this\` ni birinchi argument qilib ko'rsatilgan obyektga tenglashtiradi. Qolgan argumentlar ketma-ket (vergul bilan) beriladi.

\`\`\`javascript
const person1 = { name: "Ali" };
const person2 = { name: "Vali" };

function introduce(age, job) {
  console.log(\`Men \${this.name}, yoshim \${age} da va men \${job}man.\`);
}

// introduce() ni to'g'ridan to'g'ri chaqirsak xato beradi (this = undefined/window).
// Lekin call bilan qilsak:

introduce.call(person1, 20, "Dasturchi"); 
// Natija: "Men Ali, yoshim 20 da va men Dasturchiman."

introduce.call(person2, 25, "Dizayner");
// Natija: "Men Vali, yoshim 25 da va men Dizaynerman."
\`\`\`
**Qoidasi:** \`fn.call(Obyekt_This, arg1, arg2, arg3)\`

---

## 2. apply() metodi (Darhol, lekin Array bilan)

\`apply()\` xuddi \`call()\` bilan bir xil ishlaydi, ya'ni darhol ishga tushadi. Yagona farqi shundaki, argumentlarni ketma-ket yozish o'rniga ularni bitta **Massivga (Array)** o'rab berishingiz kerak. (A - apply = A - Array).

\`\`\`javascript
const person3 = { name: "Hasan" };

function introduce(age, job) {
  console.log(\`Men \${this.name}, \${age} yoshdaman, \${job}man.\`);
}

// call() dagi kabi vergul bilan emas, [] massiv bilan jo'natamiz:
introduce.apply(person3, [30, "Buxgalter"]); 
// Natija: "Men Hasan, 30 yoshdaman, Buxgalterman."
\`\`\`

✅ **YAXSHI Tomoni:** Agar sizda allaqachon argumentlar massiv ro'yxatida bo'lsa (masalan API dan kelgan), uni \`apply\` ga tiqib yuborish juda oson.
Masalan: \`Math.max.apply(null, [1, 5, 2, 9])\` qilib massivdagi eng kattasini topsangiz bo'ladi (Garchi hozirgi kunda Spread \`...\` osonroq bo'lsa ham).

---

## 3. bind() metodi (Kechiktirib chaqirish)

\`bind()\` yuqoridagilarga o'xshamaydi! U funksiyani **darhol ishga tushirmaydi**. Buning o'rniga u o'sha siz bergan obyektga qulflangan **yangi funksiya (nusxa)** qaytaradi. Buni xohlagan paytingizda (masalan tugma bosilganda) ishlata olasiz.

\`\`\`javascript
const person4 = { name: "Zuhra" };

function sayHi() {
  console.log("Salom, " + this.name);
}

// bind darhol ishlamaydi, u faqat YANGI funksiya yasab beradi:
const sayHiToZuhra = sayHi.bind(person4);

// xohlagan paytda ishlating:
sayHiToZuhra(); // "Salom, Zuhra"
\`\`\`

❌ **YOMON (Context yo'qotish):**
\`\`\`javascript
const buttonClick = {
  clickName: "Tugma",
  click() {
    console.log(this.clickName + " bosildi!");
  }
};
// Agar setTimeout ga to'g'ridan to'g'ri bersak:
setTimeout(buttonClick.click, 1000); // "undefined bosildi!" (this yo'qoldi)
\`\`\`

✅ **YAXSHI (bind orqali qutqarish):**
\`\`\`javascript
// Endi this ni buttonClick obyektiga butunlay qulflab beramiz
setTimeout(buttonClick.click.bind(buttonClick), 1000); // "Tugma bosildi!"
\`\`\`

---

## Mermaid Diagramma (Farqlari)

Quyidagi chizmada uchtasining bir-biridan qanday farq qilishi oson tushuntirilgan:

\`\`\`mermaid
flowchart TD
    A[Obyekt contextini almashtirish usullari]
    
    A --> B(call)
    A --> C(apply)
    A --> D(bind)
    
    B --> B1[Darhol ishga tushadi]
    B1 --> B2[Argumentlar: arg1, arg2, arg3...]
    
    C --> C1[Darhol ishga tushadi]
    C1 --> C2[Argumentlar massivda:  arg1, arg2 ]
    
    D --> D1[Darhol ishlamaydi!]
    D1 --> D2[Yangi bog'langan funksiya qaytaradi]
    D2 --> D3[Keyinchalik ishlatiladi]
\`\`\`

---

## 🎙 Intervyu savollari

**1. Call, Apply va Bind o'rtasidagi asosiy farq nima?**
**Javob:** \`call\` va \`apply\` funksiyani darhol chaqiradi va bajaradi. Farqi \`call\` parametrlarini vergul bilan, \`apply\` esa massiv qilib kutadi. \`bind\` esa funksiyani bajarmaydi, u kelajakda ishlatish uchun context (this) ga qulflangan yangi funksiya nusxasini qaytaradi.

**2. Obyektning metodini setTimeout ichiga berganda nega undefined chiqadi va yechim nima?**
**Javob:** Callback funksiya sifatida metod uzatilganda uning "this" qismi yo'qoladi va window ga qulflanadi. Yechimi: \`setTimeout(obj.method.bind(obj), 1000)\` orqali context ni bog'lab (qulflab) qaytarish.

**3. Arrow function larda call, apply yoki bind ishlata olamizmi?**
**Javob:** Yo'q! Arrow funksiyalarning o'zining mutlaqo "this" i yo'q bo'lganligi sababli, siz ularni call/apply/bind yordamida ham zo'rlab almashtira olmaysiz. Ular doim e'lon qilingan paytdagi tashqi this ni ishlatishadi.`,
  exercises: [
    {
      id: 1,
      title: "Call metodidan foydalanish",
      instruction: "'person' obyekti bor ({name: 'Vali'}). 'sayName' funksiyasi ichidagi this.name ni 'person' obyekti orqali call qilib chaqiring va res ga o'zlashtiring.",
      startingCode: "const person = { name: 'Vali' };\nfunction sayName() { return this.name; }\nlet res = // shu yerda call() ishlating",
      hint: "sayName.call(person);",
      test: "if (typeof res === 'undefined' || res !== 'Vali') throw new Error('Call metodi noto\'g\'ri ishlatildi');"
    },
    {
      id: 2,
      title: "Call va Argumentlar",
      instruction: "Endi funksiya ismdan tashqari yosh (age) ni ham qabul qiladi. 'Vali' (person obyekti) va '25' (age) ni call orqali yuboring.",
      startingCode: "const person = { name: 'Vali' };\nfunction introduce(age) { return this.name + ' ' + age; }\nlet res = // call() ni 25 argumenti bilan ishlating",
      hint: "introduce.call(person, 25);",
      test: "if (typeof res === 'undefined' || res !== 'Vali 25') throw new Error('Argumentlar call da noto\'g\'ri uzatildi');"
    },
    {
      id: 3,
      title: "Apply metodidan foydalanish (Massiv bilan)",
      instruction: "Xuddi shu introduce funksiyasi, lekin endi apply ishlatishingiz kerak. person ni uzating, 25 yoshni esa massiv ichida yozing [25].",
      startingCode: "const person = { name: 'Vali' };\nfunction introduce(age) { return this.name + ' ' + age; }\nlet res = // apply() ishlating",
      hint: "introduce.apply(person, [25]);",
      test: "if (typeof res === 'undefined' || res !== 'Vali 25') throw new Error('Apply metodi yoki massiv noto\'g\'ri yozildi');"
    },
    {
      id: 4,
      title: "Math.max va Apply hiylasi",
      instruction: "Bizda oddiy massiv arr = [5, 2, 9, 1] bor. Math.max ga apply orqali shu massivni jo'nating. Math.max ning 'this' qismiga null yozishingiz mumkin (chunki unga this kerak emas).",
      startingCode: "let arr = [5, 2, 9, 1];\nlet maxNum = // Math.max.apply(null, arr) kabi ishlating",
      hint: "Math.max.apply(null, arr)",
      test: "if (typeof maxNum === 'undefined' || maxNum !== 9) throw new Error('Math.max.apply ishlamadi');"
    },
    {
      id: 5,
      title: "Bind - Kalitdan nusxa olish",
      instruction: "'sayMyName' funksiyasiga 'person' obyektini bind orqali qulflab, qaytgan YANGI funksiyani 'boundFunc' degan o'zgaruvchiga saqlang. (Uni chaqirmang!)",
      startingCode: "const person = { name: 'Jamshid' };\nfunction sayMyName() { return this.name; }\nlet boundFunc = // bind ishlating",
      hint: "sayMyName.bind(person);",
      test: "if (typeof boundFunc !== 'function' || boundFunc() !== 'Jamshid') throw new Error('Bind yangi funksiya qaytarishi kerak edi');"
    },
    {
      id: 6,
      title: "Bind orqali yashiringan argumentlar (Currying)",
      instruction: "Bind nafaqat this ni, balki argumentlarni ham qulflashi mumkin! multiply funksiyasiga null (this uchun) va 2 raqamini bind qiling. Endi u doim 2 ga ko'paytiradigan double funksiyasiga aylanadi.",
      startingCode: "function multiply(a, b) { return a * b; }\nlet double = multiply.bind(null, 2);\nlet res = // double ni 5 bilan chaqiring",
      hint: "double(5)",
      test: "if (res !== 10) throw new Error('Bind orqali currying noto\'g\'ri ishlatildi');"
    },
    {
      id: 7,
      title: "O'zining kontekstini asrash",
      instruction: "setTimeout ichida obyekt metodini ishlatish qiyin bo'lishini ko'rdik. 'obj.greet' metodini setTimeout ga uzatayotib uning oxirida .bind(obj) ni tirkab keting (setTimeout 100ms bo'lsin).",
      startingCode: "let success = false;\nconst obj = { name: 'A', greet() { if(this.name === 'A') success = true; } };\n// setTimeout ga obj.greet ni qulflab yuboring\nsetTimeout(/* yozing */, 100);",
      hint: "setTimeout(obj.greet.bind(obj), 100)",
      test: "const ast = arguments[0]; if(!ast.includes('.bind(')) throw new Error('bind ishlatilmadi');"
    },
    {
      id: 8,
      title: "Boshqa obyekt usulini \\'o\\'g\\'irlash\\'",
      instruction: "Davlating yordamchi metodini boshqa davlat uchun call qiling. 'uzb.say()' ni 'eng' obyekti bilan chaqiring.",
      startingCode: "const uzb = { lang: 'UZ', say() { return this.lang; } };\nconst eng = { lang: 'EN' };\nlet res = // call orqali eng obyektiga moslashtiring",
      hint: "uzb.say.call(eng);",
      test: "if (typeof res === 'undefined' || res !== 'EN') throw new Error('Method borrowing (o\'g\'irlash) ishlamadi');"
    },
    {
      id: 9,
      title: "Arrow function va Call (Xato kutish)",
      instruction: "Arrow function larda call() ishlata olamizmi? Kodda sinab ko'ramiz. 'arrowFunc.call(person)' orqali chaqiring va natijani res ga tenglang. Natija 'Bob' emas, 'undefined' chiqadi.",
      startingCode: "const person = { name: 'Bob' };\nconst arrowFunc = () => { return this.name; };\nlet res = // arrowFunc ni call orqali chaqiring",
      hint: "arrowFunc.call(person);",
      test: "if (res === 'Bob') throw new Error('Arrow function this ni olmaydi!'); if (res !== undefined) throw new Error('call ishlating');"
    },
    {
      id: 10,
      title: "Ko'p argumentlar va Apply",
      instruction: "'concatWords' uchta argument kutadi. 'apply' yordamida 'words' massivini uchinchi parametr emas, balki to'g'ridan to'g'ri to'kib (apply xususiyati orqali) jo'nating. Context qismiga null yozing.",
      startingCode: "function concatWords(a, b, c) { return a + b + c; }\nconst words = ['A', 'B', 'C'];\nlet res = // apply() dan foydalaning",
      hint: "concatWords.apply(null, words);",
      test: "if (res !== 'ABC') throw new Error('apply argumentlarni yoymadi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Call va Apply o'rtasidagi asosiy farq nima?",
      options: [
        "Call tezroq ishlaydi",
        "Call argumentlarni ketma-ket qabul qiladi (arg1, arg2), Apply esa massiv qabul qiladi ([arg1, arg2])",
        "Apply faqat Arrow funksiyalar bilan ishlaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "A harfi bilan eslab qoling: Apply = Array. Qolgan hamma narsasi bir xil, ikkalasi ham darhol ishlaydi."
    },
    {
      id: 2,
      question: "Bind() qanday ishlaydi?",
      options: [
        "Funksiyani o'chirib yuboradi",
        "Funksiyani darhol ishga tushiradi",
        "Funksiyani bajarmasdan, unga this ni qulflab YANGI funksiya nusxasini qaytaradi",
        "Faqat obyektlarni nusxalaydi"
      ],
      correctAnswer: 2,
      explanation: "Bind ni xuddi mashinaning zaxira kalitini yasashdek eslab qolamiz. Sizga kalitni beradi, lekin siz uni o'zingiz xohlagan payt ishlatasiz."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri 'this' ni muvaffaqiyatli almashtiradi?",
      options: [
        "Arrow funksiya .bind() orqali",
        "Obyekt nomini .call() birinchi parametriga berish orqali",
        "if blokida yozish orqali",
        "Arrow funksiyada .apply() orqali"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarni aslo o'zgartirib bo'lmaydi. Faqat oddiy (regular) funksiyalar call, apply, bind ga quloq soladi."
    },
    {
      id: 4,
      question: "Qachon apply() ishlatish qulay bo'ladi?",
      options: [
        "Qachonki bizda argumentlar allaqachon bitta massiv shaklida bo'lsa va funksiya esa alohida argumentlar kutayotgan bo'lsa",
        "Faqat bitta argument bo'lsa",
        "Tugmani bosganda ishlaydigan eventListener yozayotganda",
        "Xatolar oldini olish uchun"
      ],
      correctAnswer: 0,
      explanation: "Masalan Math.max() ga array yuborib bo'lmaydi, lekin uni apply orqali Math.max.apply(null, massiv) qilib jo'natsa, apply uni o'zi to'kib beradi."
    },
    {
      id: 5,
      question: "Event listener yoki setTimeout larda callback yo'qolib qolmasligi uchun nima ishlatiladi?",
      options: [
        ".call()",
        ".apply()",
        ".bind()",
        "Hammasi mos keladi"
      ],
      correctAnswer: 2,
      explanation: "Chunki setTimeout ga funksiya natijasi emas, funksiyaning O'ZI (nusxasi) berilishi kerak. Shuning uchun call emas, aynan bind ishlashi shart."
    },
    {
      id: 6,
      question: "fn.bind(null, 1, 2) deb yozishning ma'nosi nima?",
      options: [
        "Xatolik berish uchun qilingan atayin ish",
        "Bu 'Currying' (qisman qo'llash) deb ataladi - ya'ni this ahamiyatsiz, lekin 1 va 2 argumentlarini doimiy qilib funksiyaga qulflab qo'yish",
        "Funksiyani 1 marta ishlashga dasturlash",
        "Hech qanday ma'no bildirmaydi"
      ],
      correctAnswer: 1,
      explanation: "Bind orqali nafaqat 'this' ni, balki doimiy bo'lishi kerak bo'lgan argumentlarni ham biriktirib, shablon funksiyalar yozish mumkin."
    },
    {
      id: 7,
      question: "Agar .call(null) deyilgan bo'lsa nima bo'ladi (non-strict modeda)?",
      options: [
        "Funksiya ishlamay qoladi",
        "Bu funksiya 'this' sifatida global obyektni (window) ishlatishni boshlaydi",
        "Bu undefined error beradi",
        "Array kabi ishlay boshlaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar context o'rniga null yoki undefined berilsa (qattiq rejim - strict modedan tashqarida), dvigatel avtomatik ravishda Global Obyekt (Window) ga qaytadi."
    },
    {
      id: 8,
      question: "Metod o'g'irlash (Method borrowing) nima degani?",
      options: [
        "Bir kutubxonani qaroqchilik yo'li bilan yuklab olish",
        "Boshqa bir obyektdagi metodni call, apply orqali mutlaqo boshqa obyekt foydasi uchun vaqtincha ishlatib turish",
        "Obyektni Delete qilib boshqa joyga yozish",
        "Internetdan tayyor kod copy-paste qilish"
      ],
      correctAnswer: 1,
      explanation: "Masalan: arrayga xos metodlarni qanaqadir arguments kabi array-like (massivga o'xshash) obyektdan call orqali chaqirib olish xuddi o'g'irlab ishlatganga o'xshaydi."
    },
    {
      id: 9,
      question: "Nega Arrow functionda bind ishlab ketmaydi?",
      options: [
        "Chunki arrow functionda function so'zi yozilmagan",
        "Arrow functionlarning qat'iy qoidasi bor: ularning o'zining this tushunchasi mavjud emas, har doim Lexical scope (qayerda yozilgan bo'lsa o'sha yerdagi) this ni ishlatadi",
        "Chunki arrow funksiyalar tezroq",
        "Faqat IE browserida ishlamaydi xolos"
      ],
      correctAnswer: 1,
      explanation: "Bu ularning eng asosiy dizayn qarori - this ga egalik qilinmaydi va uni o'zgartirishni iloji yo'q."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri ES6+ (Spread syntax) kelgandan keyin apply() o'rnini ko'proq bosa boshladi?",
      options: [
        "Function Declaration",
        "Array Spread operator (...) ya'ni Math.max(...arr) kabi ishlatish",
        "let keyword",
        "For Loop"
      ],
      correctAnswer: 1,
      explanation: "Oldin massivdagi narsalarni argumentga parchalash (to'kish) uchun doim apply ishlatilardi. Hozir uchta nuqta (...) buni chiroyliroq bajaradi."
    },
    {
      id: 11,
      question: "Function prototype-iga ulangan ushbu metodlar qaysilar?",
      options: [
        ".map(), .filter(), .reduce()",
        ".forEach(), .every()",
        ".call(), .apply(), .bind()",
        ".hasOwnProperty(), .toString()"
      ],
      correctAnswer: 2,
      explanation: "Bu uchtasi JavaScript-dagi barcha funksiyalarning prototipida, ya'ni Function.prototype xotirasida saqlanadigan standart maxsus metodlardir."
    },
    {
      id: 12,
      question: "Call() ni zanjir qilib chaqirsa nima bo'ladi (fn.call.call.call)?",
      options: [
        "Komp'yuter qotib qoladi",
        "Birinchi obyektdan keyingilariga aylanib yuradi",
        "JavaScript sintaksis xatosi beradi",
        "Oxir-oqibat eng so'nggi uzatilgan obyekt asosida qaysidir funksiyaning o'zi call qilinadi (Juda murakkablashadi lekin ruxsat bor)"
      ],
      correctAnswer: 3,
      explanation: "Bunday amaliyot tavsiya qilinmaydi lekin ishlashi jihatidan JS bu zanjirlarni Function.prototype.call ustida bajarib ketaveradi."
    }
  ]
};
