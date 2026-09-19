export const executionContextLesson = {
  id: "executionContextLesson",
  title: "Bajarilish Konteksti (Execution Context)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Bajarilish Konteksti (Execution Context) nima?
**Bajarilish Konteksti** — bu JavaScript kodi qayerda ishlayotgani va uning o'zgaruvchilari qayerda saqlanayotganini bildiruvchi maxsus ichki muhit (kontekst).
JavaScript-da har qanday kod bajarilayotganda doimo biror-bir kontekst ichida bo'ladi.
Asosiy turlari:
1. **Global Bajarilish Konteksti (GEC):** Siz dasturni ishga tushirishingiz bilan yaratiladi. U bitta bo'ladi va barcha funksiyalar uchun yagona asos vazifasini bajaradi.
2. **Funksiya Bajarilish Konteksti (FEC):** Har safar biror funksiya chaqirilganda, JS aynan o'sha funksiya uchun alohida yangi kontekst yaratadi.

---

### Real hayotiy o'xshatish: Oshpaz va Oshxona
* **Global Kontekst (GEC):** Bu **katta oshxona**. Oshxonada qozon, tuz, shakar kabi hamma uchun umumiy anjomlar (global o'zgaruvchilar) bor. Dastur yopilmaguncha oshxona doim ishlaydi.
* **Funksiya Konteksti (FEC):** Siz maxsus **"Tort"** tayyorlashingiz kerak. Siz alohida kichik stolga o'tasiz va shu tort uchun tuxum, un kabi ingrediyentlarni tayyorlaysiz (mahalliy o'zgaruvchilar). Tort bitishi bilan bu stol tozalanadi (kontekst yo'q qilinadi).
* **Call Stack (Kontekstlar to'plami):** Siz tortni tayyorlayotganda ichida **"Krem"** yasashingiz kerak bo'lib qoldi. Tort tayyorlashni vaqtincha pauza qilib, kremni yasaysiz, keyin yana tortga qaytasiz. Mana shu jarayonlarni yozib, qaysi biri birinchi bajarilishini tartibga soluvchi mexanizm - Call Stack hisoblanadi.

---

## 2. 🔬 Chuqur Tahlil (Deep Dive)

### Under the Hood: Qanday ishlaydi?
Bajarilish konteksti ikki bosqichda yaratiladi va ishlaydi:
1. **Creation Phase (Yaratish bosqichi):**
   - **Lexical Environment** va **Variable Environment** yaratiladi.
   - **Hoisting** sodir bo'ladi: o'zgaruvchilar (\\\`var\\\`) xotirada joy ajratilib, \\\`undefined\\\` bilan to'ldiriladi. Funksiya deklaratsiyalari esa to'liq xotiraga olinadi. \\\`let\\\` va \\\`const\\\` uchun xotirada joy ochiladi, biroq Temporal Dead Zone (TDZ) da qoladi.
   - **this** kalit so'zi bog'lanadi (bind).
2. **Execution Phase (Bajarish bosqichi):**
   - Kod qatorma-qator o'qiladi. O'zgaruvchilarga asl qiymatlari biriktiriladi.
   - Funksiyalar chaqirilganida yangi FEC yaratilib, Call Stack-ga qo'shiladi.

### Memory va V8 Engine
V8 Engine kontekstni boshqarish uchun **Stack** va **Heap** dan foydalanadi.
- **Call Stack:** Primitive qiymatlar (raqamlar, stringlar) va funksiyalarning bajarilish tartibini saqlaydi. Tezkor lekin hajmi chegaralangan.
- **Memory Heap:** Katta obyektlar, massivlar va funksiya tanalari saqlanadigan joy. Garbage Collector (Axlat yig'uvchi) aynan shu yerda tozlash ishlarini olib boradi.

### Performance (Samaradorlik)
Call Stack hajmi chegaralangan (odatda 10,000 atrofida chaqiruv). Agar rekursiv funksiya to'xtash shartisiz yozilsa, **Stack Overflow** (Stack to'lib ketishi) xatosi yuz beradi. V8 engineda bu darhol \\\`RangeError: Maximum call stack size exceeded\\\` xatosini keltirib chiqaradi.

---

## 3. ⚠️ Edge Cases (Noodatiy holatlar) va Senior Darajasidagi Savollar

### Edge Cases
1. **Temporal Dead Zone (TDZ) va Hoisting:**
   \\\`let\\\` va \\\`const\\\` hoisting qilinadi, lekin o'qishga urinilganda TDZ tufayli \\\`ReferenceError\\\` beradi. Bu xatolarning oldini olish uchun ularni faqat e'lon qilingandan so'ng ishlatish shart.
2. **Closure Memory Leak:**
   Yopilma (closure) lar eski kontekstning Leksik muhitini saqlab qoladi. Agar yirik obyektlar closure ichida qolib ketsa, Garbage Collector ularni tozalay olmaydi va Memory Leak (xotira sizib chiqishi) sodir bo'ladi.

### Senior Interview Savollari
1. **Q:** Nima uchun \\\`var\\\` ishlatsak \\\`undefined\\\` qaytadi, lekin \\\`let\\\` xato beradi?
   **A:** Creation phase da \\\`var\\\` xotiradan joy oladi va qiymati \\\`undefined\\\` bo'ladi. \\\`let\\\` va \\\`const\\\` ham joy oladi, lekin uninitialized (ishga tushmagan) holatda TDZ (Temporal Dead Zone) deb nomlangan himoyalangan zonada turadi.
2. **Q:** Asinxron kodlar Call Stack da qanday boshqariladi?
   **A:** Asinxron operatsiyalar (setTimeout, fetch) Web API orqali fonda ishlaydi. Ular tugagach, callback funksiyalari Task Queue yoki Microtask Queue ga o'tadi. Event Loop Call Stack bo'sh bo'lgandagina (GEC gacha hamma narsa pop qilinganda) navbatdagi vazifani Call Stack ga suradi.
3. **Q:** Blok scope (\\\`{...}\\\`) yangi Bajarilish Konteksti (FEC) yaratadimi?
   **A:** Yo'q. Bloklar faqat yangi Lexical Environment yaratadi, lekin yangi Execution Context yaratmaydi. Kontekst faqat Global miqyosda yoki Funksiya chaqirilganda yaratiladi.

---

## 4. 📊 Call Stack va Kontekst Diagrammasi

\\\`\\\`\\\`mermaid
graph TD
    subgraph Call Stack LIFO
        direction TB
        S1["Empty Stack"]
        S2["Global Execution Context"]
        S3["first() <br/> Global Context"]
        S4["second() <br/> first() <br/> Global Context"]
        
        S1 -->|Program Starts| S2
        S2 -->|first called Push| S3
        S3 -->|second called Push| S4
        S4 -.->|second finishes Pop| S3
        S3 -.->|first finishes Pop| S2
        S2 -.->|Program Exits Pop| S1
    end
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchi yaratish",
      instruction: "`appVersion` nomli o'zgaruvchi e'lon qiling va unga `\"1.0.0\"` qiymatini biriktiring.",
      startingCode: "let appVersion = ;",
      hint: "\"1.0.0\"",
      test: "const sandbox = new Function(code + '; let appVersion = \"1.0.0\"; return appVersion === \"1.0.0\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 2,
      title: "Local o'zgaruvchi funksiya ichida",
      instruction: "`getName` funksiyasi ichida `name` nomli mahalliy (local) o'zgaruvchi yaratib, unga `\"Sardor\"` biriktiring va qaytaring.",
      startingCode: "function getName() {\n  // local let name yarating\n  return name;\n}",
      hint: "let name = \"Sardor\";",
      test: "const sandbox = new Function(code + '; function getName(){ let name = \"Sardor\"; return name; } return getName() === \"Sardor\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 3,
      title: "Block scope",
      instruction: "Biror if blogi ichida `const` dan foydalanib `blockVar` deb nomlangan o'zgaruvchiga 5 sonini yuklang.",
      startingCode: "if(true){\n  // const blockVar yarating\n}",
      hint: "const blockVar = 5;",
      test: "const sandbox = new Function(code + '; if(true){ const blockVar = 5; if(blockVar!==5) throw new Error(\"xato\"); } return true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 4,
      title: "Rekursiya to'xtash sharti (Base Case)",
      instruction: "`countdown(n)` funksiyasida shunday shart qo'shingki, agar `n <= 0` bo'lsa darhol `return` qilsin. Aks holda o'zini chaqirsin.",
      startingCode: "function countdown(n) {\n  // shu yerga if shartini yozing\n  countdown(n - 1);\n}",
      hint: "if (n <= 0) return;",
      test: "const sandbox = new Function(code + '; function countdown(n){ if(n<=0) return \"done\"; return countdown(n-1); } return countdown(3) === \"done\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 5,
      title: "Var hoisting xatosi",
      instruction: "`hoistedVar` o'zgaruvchisini `var` yordamida qiymatini lentalab 10 deb pastda qoldiring. Uni qanday qilib `undefined` berishini eslang. Siz shunchaki e'lonni yozib qo'ying.",
      startingCode: "console.log(hoistedVar);\n// var bilan hoistedVar ni 10 ga tenglashtiring\n",
      hint: "var hoistedVar = 10;",
      test: "const sandbox = new Function(code + '; var hoistedVar = 10; return hoistedVar === 10;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 6,
      title: "Let (TDZ) xatosi tasavvuri",
      instruction: "Kodni to'g'irlang. `console.log(x); let x = 5;` xato (TDZ) beradi. Buni to'g'irlash uchun log'ni e'londan pastga tushiring.",
      startingCode: "console.log(x);\nlet x = 5;",
      hint: "let x = 5; console.log(x);",
      test: "const sandbox = new Function(code + '; let x = 5; let r = x; return r===5;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 7,
      title: "Nested funksiya chaqiruvi",
      instruction: "`first()` funksiyasi ichidan `second()` funksiyasini chaqiring, shunda u stakka tushadi.",
      startingCode: "function second() { return 2; }\nfunction first() {\n  // second() ni qaytaring\n}",
      hint: "return second();",
      test: "const sandbox = new Function(code + '; function second(){return 2;} function first(){return second();} return first()===2;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 8,
      title: "Funksiya deklaratsiyasi hoisting'i",
      instruction: "Tepa qismda ishlatilgan bo'lishiga qaramay, pastda `hello()` degan oddiy funksiya yozib, ichida `\"Hi\"` qaytaradigan qiling.",
      startingCode: "const x = hello();\n// hello() funksiyasini shu yerga yozing",
      hint: "function hello() { return 'Hi'; }",
      test: "const sandbox = new Function(code + '; function hello(){return \"Hi\";} return hello() === \"Hi\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 9,
      title: "Closure yordamida Scope'ni saqlash",
      instruction: "Tashqi funksiya `outer()` ichida `count` ni e'lon qilib, uning ichida qiymatni oshiradigan ichki funksiya qaytaring.",
      startingCode: "function outer() {\n  let count = 0;\n  return function() {\n    // count ni oshiring va qaytaring\n  }\n}",
      hint: "count++; return count;",
      test: "const sandbox = new Function(code + '; function outer(){let count = 0; return function(){count++; return count;}} let c = outer(); return c()===1;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      id: 10,
      title: "Limit qo'shish orqali rekursiyani himoyalash",
      instruction: "`factorial(n)` funksiyasida `n === 0` sharti uchun `1` qaytarilishini (base case) yozing.",
      startingCode: "function factorial(n) {\n  // agar n === 0 bo'lsa return 1;\n  return n * factorial(n - 1);\n}",
      hint: "if (n === 0) return 1;",
      test: "const sandbox = new Function(code + '; function factorial(n){ if(n===0) return 1; return n*factorial(n-1); } return factorial(3)===6;');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript kodida funksiya o'z ishini tugatganda nima bo'ladi?",
      options: [
        "Call Stack dan o'chirilib (pop qilinib) kontekst yo'qoladi",
        "Stack tagiga tushiriladi",
        "U cheksiz xotirada qoladi",
        "Funksiyalar o'chirilmaydi"
      ],
      correctAnswer: 0,
      explanation: "Funksiya tugashi bilan uning FEC (Function Execution Context) qismi Call Stack dan pop qilinadi va xotira tozalanadi."
    },
    {
      id: 2,
      question: "JavaScript Call Stack qaysi tamoyil asosida ishlaydi?",
      options: ["LIFO (Oxirgi kirdi, Birinchi chiqdi)", "FIFO (Birinchi kirdi, Birinchi chiqdi)", "Random", "Eng tez ishlaydigani oldin"],
      correctAnswer: 0,
      explanation: "Call stack LIFO (Last In First Out) prinsipi orqali oxirgi chaqirilgan funksiyani birinchi bo'lib o'qiydi."
    },
    {
      id: 3,
      question: "JavaScript-dagi o'zgaruvchi va funksiyalarning deklaratsiya qilinishidan avval ham mavjud bo'lib turishi nima deb ataladi?",
      options: ["Hoisting", "Lexical Scoping", "Execution", "Stacking"],
      correctAnswer: 0,
      explanation: "Dvigatel creation fazasida e'lonlarni oldindan xotiraga yuklab olishi Hoisting deb ataladi."
    },
    {
      id: 4,
      question: "Var va Let hoisting jihatdan qanday farq qiladi?",
      options: [
        "Faqat var hoisting bo'ladi",
        "Var ga undefined qiymati beriladi, Let esa Temporal Dead Zone'da qolib ketadi",
        "Hech qanday farqi yo'q",
        "Let to'liq hoisting bo'ladi, var esa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Ikkisi ham hoisting bo'ladi, biroq var ga engine undefined beradi. Let esa TDZ da ushlanib o'qishga ruxsat etilmaydi."
    },
    {
      id: 5,
      question: "Global Bajarilish Konteksti qachon yaratiladi?",
      options: ["Funksiya chaqirilganda", "Kod yuklanib eng birinchi ishga tushganda", "Xatolik bo'lganda", "API dan malumot kelganda"],
      correctAnswer: 1,
      explanation: "GEC JS dagi asosiy baza hisoblanadi va fayl ishga tushishi bilan bir marta yaratiladi."
    },
    {
      id: 6,
      question: "Lexical Environment o'z ichiga nimalarni oladi?",
      options: [
        "Faqat var o'zgaruvchilarni",
        "Funksiya, o'zgaruvchilar va ularning tashqi qobiq (outer scope) ga bo'lgan havolasini",
        "Tarmoq ma'lumotlarini",
        "Faqat HTML dom-ni"
      ],
      correctAnswer: 1,
      explanation: "Lexical Environment bu scope'lar zanjirini tuzuvchi mexanizm bo'lib o'zgaruvchilar va parent scope referenceni ushlab turadi."
    },
    {
      id: 7,
      question: "Stack Overflow nima sababdan sodir bo'ladi?",
      options: [
        "Xotira yetishmovchiligidan",
        "Ko'p o'zgaruvchi elon qilingandan",
        "Rekursiya sharti noto'g'ri yozilib funksiyalar Call Stack-ga to'xtovsiz qo'shilaverganda",
        "Tarmoq uzilib qolganda"
      ],
      correctAnswer: 2,
      explanation: "Rekursiya bazaviy cheklovga (base case) ega bo'lmasa cheksiz ishga tushib stack to'lib ketishiga olib keladi."
    },
    {
      id: 8,
      question: "Tashqi funksiyadagi local o'zgaruvchining ichki (nested) funksiya orqali xotirada qulflanib qolishi nima deyiladi?",
      options: ["Closure (Yopilma)", "Hoisting", "Context", "Execution"],
      correctAnswer: 0,
      explanation: "Closure tufayli, ota funksiya tugagan taqdirda ham uning Lexical Environment'ini ichki funksiya ushlab tura oladi."
    },
    {
      id: 9,
      question: "Bajarilish Kontekstining ikkita bosqichi qaysi?",
      options: [
        "Loading va Saving",
        "Creation (Yaratish) va Execution (Bajarish)",
        "Compiling va Rendering",
        "Pushing va Popping"
      ],
      correctAnswer: 1,
      explanation: "Har bir kontekst oldin yaratiladi (Creation) va keyin u yerdagi kod bajariladi (Execution)."
    },
    {
      id: 10,
      question: "this qiymati qachon aniqlanadi?",
      options: [
        "Kod yozilayotgan paytda yozilgan joyiga (scope) ko'ra",
        "Funksiya chaqirilgan usuliga va Kontekst bosqichiga qarab dinamik tarzda",
        "Faqat o'zgaruvchi ishlatilganda",
        "Ixtiyoriy o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "this doimo execution kontekstiga moslashadi, ya'ni qanday ob'yekt orqali yoki qayerda chaqirilganligiga qarab uning qiymati belgilanadi."
    },
    {
      id: 11,
      question: "Asinxron kodlar qayerda navbat kutadi?",
      options: ["Call Stack'da kutib o'tiradi", "Event Queue (yoki Callback Queue) va Microtask Queue'da", "Global scope'da", "Xotira keshida"],
      correctAnswer: 1,
      explanation: "Asinxron kod Call stack ni band qilmaydi. Web API ishlab bo'lgach Queue'ga tushadi, va Call Stack bo'shaganda Event loop uni ichkariga kiritadi."
    },
    {
      id: 12,
      question: "{...} kabi if yoki for bloklari alohida Kontekst (FEC) yaratadimi?",
      options: [
        "Ha, har bir qavs alohida FEC",
        "Yo'q, FEC faqat funksiyalar uchun yaratiladi. Ular faqat Lexical Environment ni hosil qiladi xolos.",
        "Yo'q, ularni scope'i yo'q",
        "Ha, Globalni to'xtatadi"
      ],
      correctAnswer: 1,
      explanation: "Bloklar alohida Context (Execution Context) yaratmaydi, ular shunchaki o'zining Lexical scope block'iga ega bo'lishadi."
    }
  ]
};
