export const scopeLesson = {
  id: "scopeLesson",
  title: "Scope (Ko'rinish Sohalari)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish: Yangi Boshlovchilar Uchun O'xshatish

Tasavvur qiling, siz katta bir ofis binosidasiz. Bu bino sizning JavaScript dasturingizdir. Ushbu binoda turli xil ruxsat darajalari mavjud:

1. **Global Scope (Umumiy Qabulxona)**: Binodagi har bir xodim va mehmon kira oladigan joy. Agar siz e'lonni (o'zgaruvchini) shu yerga osib qo'ysangiz, hamma uni o'qiydi. Lekin bu xavfli bo'lishi mumkin, chunki kimdir kelib, bexosdan boshqa qog'ozga almashtirib qo'yishi mumkin.

2. **Function yoki Local Scope (Alohida Ofis Xonasi)**: Bu yerga faqat o'sha xonaga kaliti bor odamlargina (funksiya ichidagilar) kira oladi. Xonadagi hujjatlarni (o'zgaruvchilarni) tashqaridagi odamlar ko'ra olmaydi. 

3. **Block Scope (Xonadagi Qulflangan Seyf)**: Bu seyf faqatgina if, for yoki while kabi "{}" (gullar qavs) bloklarida saqlanadi va uning ichiga faqat \\\`let\\\` yoki \\\`const\\\` turidagi ma'lumotlarni solamiz. Qadimgi \\\`var\\\` o'zgaruvchisi esa xavfsizlikni mensimaydi va seyfdan doimo chiqib ketadi!

## 2. 🚀 Chuqurlashtirilgan O'rganish: Dvigatel Ostida (Under the Hood)

JavaScript motori (masalan, V8 Engine) o'zgaruvchilarni "Lexical Environment" deb nomlanuvchi maxsus obyektdagi xotirada saqlaydi. Dastur ishlash vaqtida qamrov quyidagicha ishlaydi:

* **Execution Context (Bajarilish Konteksti):** Har safar funksiya chaqirilganda yangi kontekst yaratiladi va unga o'zining "Lexical Environment"i ulanadi.
* **Scope Chain (Qamrov Zanjiri):** Agar V8 Engine o'zgaruvchini joriy muhitdan topolmasa, u darhol "Outer Lexical Environment"ga (tashqi muhitga) yuzlanadi. Bu zanjir toki Global muhitgacha boradi. Agar u yerda ham topilmasa, \\\`ReferenceError\\\` qaytaradi.
* **Garbage Collection va Xotira:** Agar funksiya ichidagi o'zgaruvchilarga qayta murojaat qilinmasa, V8 ning "Garbage Collector"i ularni xotiradan o'chiradi. Lekin funksiya ichidan boshqa funksiya qaytarilsa va u o'zgaruvchidan foydalansa (Closure), u xotirada uzoqroq yashaydi. Bu xotira sizib chiqishi (Memory Leak) kabi muammolarni ham keltirib chiqarishi mumkin.

## 3. ⚠️ Chekka Holatlar (Edge Cases) va Senior Intervyu Savollari

1. **Temporal Dead Zone (TDZ) nima va u qanday ishlaydi?**
   - Javob: \\\`let\\\` va \\\`const\\\` qatorlari hoist bo'ladi, lekin e'lon qilingan qatorgacha ularni o'qib bo'lmaydi. Bu hudud TDZ deyiladi. 
   - \\\`\\\`\\\`javascript
   console.log(a); // ReferenceError
   let a = 10;
   \\\`\\\`\\\`

2. **Variable Shadowing qachon muammo tug'dirishi mumkin?**
   - Javob: Agar tashqi o'zgaruvchi bilan aynan bir xil nomda ichki o'zgaruvchi e'lon qilsangiz, tashqi o'zgaruvchi e'tibordan chetda qoladi.
   - \\\`\\\`\\\`javascript
   let count = 0;
   function increase() {
     let count = 1; // Tashqi count "soya" ostida qoldi!
     return count;
   }
   \\\`\\\`\\\`

3. **Closure va Scope aloqasini qanday tushuntirasiz?**
   - Javob: Closure bu funksiya o'zi yozilgan leksik qamrovni eslab qolishidir. U Garbage Collector-dan eski scope'ni himoya qilib ushlab qoladi.

## 📊 Qamrov Zanjiri (Scope Chain) Diagrammasi

\\\`\\\`\\\`mermaid
flowchart TD
    A[Izlash Boshlandi] --> B[Joriy Block Scope]
    B -->|Topilmadi| C[Tashqi Muhit]
    C -->|Topilmadi| D[Global Scope]
    D -->|Topilmadi| F[ReferenceError]
    C -->|Topildi| E[Qiymat Qaytariladi]
    B -->|Topildi| E
    D -->|Topildi| E
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Blok Qamrovi va Soya Solish (Shadowing)",
      instruction: "Berilgan `x` parametrini qabul qiluvchi `getShadowedValue(x)` funksiyasini yozing. Funksiya ichida alohida blok (`{ }`) oching. Blok ichida `let x = 100;` qilib yangi `x` e'lon qiling (soyalash). Blok tugagach, asl funksiya parametri bo'lgan `x` ga 5 ni qo'shib qaytaring.",
      startingCode: "function getShadowedValue(x) {\n  // Kodni yozing\n}",
      hint: "{ let x = 100; } blokidan so'ng return x + 5; deb yozing.",
      test: "const fn = new Function(code + '; return getShadowedValue;')(); if(fn(10) !== 15) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Global va Lokal Qamrov Farqi",
      instruction: "Tashqarida global `count = 0;` mavjud. Funksiya chaqirilganda o'sha global `count` ni 1 taga oshiradigan va uning qiymatini qaytaruvchi `incrementCounter()` funksiyasini yozing. Ichkarida yangi `count` e'lon qilmang.",
      startingCode: "let count = 0;\nfunction incrementCounter() {\n  // Kodni yozing\n}",
      hint: "count += 1; return count;",
      test: "const sandbox = new Function(code + '; return incrementCounter;'); const fn = sandbox(); fn(); if(fn() !== 2) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Leksik Qamrov Zanjiri",
      instruction: "Parametr `a` qabul qilib, ichki `nested(b)` funksiyasini qaytaruvchi va u funksiya ham `deep(c)` funksiyasini qaytaruvchi `chain(a)` yozing. `deep(c)` funksiyasi `a+b+c` qaytarsin.",
      startingCode: "function chain(a) {\n  // Kodni yozing\n}",
      hint: "return function(b) { return function(c) { return a+b+c; } }",
      test: "const fn = new Function(code + '; return chain;')(); if(fn(1)(2)(3) !== 6) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Block doirasidagi tasdiq",
      instruction: "Funksiya if bloki ichida `let val = 1;` va blokdan tashqarida xuddi shu blokdan qiymat olishga urinib ko'rsin. Bizga shunchaki typeof qanday bo'lishini `return typeof val;` sifatida try/catch qilib oling yoki shunchaki 'undefined' qaytaring.",
      startingCode: "function checkBlockScope() {\n  if(true) {\n    let val = 1;\n  }\n  // Kodni yozing: try { return typeof val; } catch(e) { return 'undefined'; }\n}",
      hint: "O'zgaruvchi blokdan tashqarida ko'rinmaydi. try catch yordamida 'undefined' qaytaring.",
      test: "const fn = new Function(code + '; return checkBlockScope;')(); if(fn() !== 'undefined') throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Var xususiyati",
      instruction: "Funksiya ichida bitta if bloki yarating va uning ichida `var message = 'Salom';` deng. Blok tashqarisida (lekin funksiya ichida) o'sha message ni qaytaruvchi `testVarScope()` yozing.",
      startingCode: "function testVarScope() {\n  // Kodni yozing\n}",
      hint: "var blok doirasiga (block scope) ega emas, shuning uchun tashqaridan uqish mumkin.",
      test: "const fn = new Function(code + '; return testVarScope;')(); if(fn() !== 'Salom') throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Lokal o'zgaruvchiga murojaat",
      instruction: "Funksiya ichida parametr sifatida ism qabul qiling, ichkarida o'sha ismga qarab xabar tayyorlaydigan lokal funksiya ishlatib o'sha xabarni qaytaring. Masalan `localFunc()`.",
      startingCode: "function greeting(name) {\n  // Kodni yozing\n}",
      hint: "function localFunc() { return 'Hi ' + name; }; return localFunc();",
      test: "const fn = new Function(code + '; return greeting;')(); if(fn('Ali') !== 'Hi Ali') throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Const block doirasi",
      instruction: "For tsikli ichida const e'lon qilib bo'ladimi? Aslida tsikl tana blokida mumkin. Siz 1 dan 3 gacha tsikl aylantirib yig'indini qaytaruvchi `sumToThree()` yozing, summani lokal let o'zgaruvchisi sifatida saqlang.",
      startingCode: "function sumToThree() {\n  // Kodni yozing\n}",
      hint: "let sum = 0; for(let i=1; i<=3; i++) sum+=i; return sum;",
      test: "const fn = new Function(code + '; return sumToThree;')(); if(fn() !== 6) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Closure va xotira saqlanishi",
      instruction: "Har safar chaqirilganda o'zining qiymatini bittaga oshiruvchi funksiya yaratadigan `makeCounter()` yozing.",
      startingCode: "function makeCounter() {\n  // Kodni yozing\n}",
      hint: "let c = 0; return function() { return ++c; };",
      test: "const fn = new Function(code + '; return makeCounter;')(); const c = fn(); if(c()!==1 || c()!==2) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Argumentlar soyasi (Parameter Shadowing)",
      instruction: "Global miqyosda qanaqadir x bor deylik. Funksiya argumenti ham x. Funksiya o'zining x iga 10 ni ko'paytirib qaytarsin. `multiplyByTen(x)`",
      startingCode: "function multiplyByTen(x) {\n  // Kodni yozing\n}",
      hint: "return x * 10;",
      test: "const fn = new Function(code + '; return multiplyByTen;')(); if(fn(2) !== 20) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Temporal Dead Zone",
      instruction: "`a` ni ishlatgandan so'ng let bilan e'lon qiladigan funksiya ichida qanday xatolik qaytishini tekshirish uchun try-catch yozing va catch blokida 'ReferenceError' ni string qilib qaytaruvchi `checkTDZ()` yozing.",
      startingCode: "function checkTDZ() {\n  // Kodni yozing\n}",
      hint: "try { console.log(val); let val = 1; } catch(e) { return e.name; }",
      test: "const fn = new Function(code + '; return checkTDZ;')(); if(fn() !== 'ReferenceError') throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da \"Scope\" (Ko'rinish sohasi) nima?",
      options: [
        "Tezlikni o'lchovchi birlik",
        "O'zgaruvchilar va funksiyalarning kodning qaysi qismlarida ko'rinishi va ularning ishlash muddati",
        "Brauzer aynasining o'lchamlarini aniqlaydigan xossa",
        "Server qismidagi protokol"
      ],
      correctAnswer: 1,
      explanation: "Scope o'zgaruvchilarning ko'rinishi va ularga kirish huquqini belgilaydi."
    },
    {
      id: 2,
      question: "JavaScript-da qaysi turdagi ko'rinish sohalari mavjud?",
      options: [
        "Faqat Global va Local",
        "Global, Function va Block scope",
        "Window va Document scope",
        "Static va Dynamic scope"
      ],
      correctAnswer: 1,
      explanation: "Global, function, va ES6 dan boshlab block scope (let/const bilan)."
    },
    {
      id: 3,
      question: "Qaysi o'zgaruvchi e'lon qilish turlari \"Block Scope\" ga ega?",
      options: [
        "Faqat var",
        "let va const",
        "var va let",
        "Hammasi"
      ],
      correctAnswer: 1,
      explanation: "let va const faqat blok ichida yashaydi. var esa block scope-ni tan olmaydi."
    },
    {
      id: 4,
      question: "if(true) { var x=5; let y=10; } console.log(x); natijasi?",
      options: [
        "ReferenceError",
        "5",
        "undefined",
        "null"
      ],
      correctAnswer: 1,
      explanation: "var block scope'ni bilmaydi, u blok tashqarisiga sizib chiqadi."
    },
    {
      id: 5,
      question: "if(true) { let y=10; } console.log(y); natijasi?",
      options: [
        "10",
        "undefined",
        "ReferenceError",
        "null"
      ],
      correctAnswer: 2,
      explanation: "let blok qamroviga ega bo'lgani uchun, blokdan tashqarida ReferenceError beradi."
    },
    {
      id: 6,
      question: "Leksik qamrov (Lexical Scope) nima?",
      options: [
        "Dinamik ravishda aniqlanadi",
        "Kodning e'lon qilinish (yozilish) vaqtidagi joylashuviga ko'ra statik tarzda aniqlanadi",
        "Faqat strict mode da ishlaydi",
        "Harflardan tuzilishi kerak"
      ],
      correctAnswer: 1,
      explanation: "Leksik qamrov o'zgaruvchi va funksiyalarni e'lon qilingan qavatma-qavat joylashuviga ko'ra yechadi."
    },
    {
      id: 7,
      question: "Scope Chain nima?",
      options: [
        "Funksiyalarni ulash protokoli",
        "O'zgaruvchini avval o'zining, keyin tashqi muhitining leksik muhitidan qidirish zanjiri",
        "Massivlarni ulovchi metod",
        "Elementlarni bog'lash mexanizmi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript qidiruvni ichkaridan tashqariga global scope'gacha ketma-ket bajarganligi Scope Chain deyiladi."
    },
    {
      id: 8,
      question: "Variable Shadowing (Soyalash) nima?",
      options: [
        "O'zgaruvchini o'chirib tashlash",
        "Ichki scope'dagi o'zgaruvchi bilan tashqi scope'dagi o'sha nomdagi o'zgaruvchini vaqtincha to'sib qo'yish",
        "O'zgaruvchini rangi",
        "Ularni yashirish API-si"
      ],
      correctAnswer: 1,
      explanation: "Bir xil ismli o'zgaruvchilardan ichkaridagisi ustuvor bo'ladi va tashqarisidagisini to'sadi."
    },
    {
      id: 9,
      question: "Temporal Dead Zone (TDZ) qachon hosil bo'ladi?",
      options: [
        "var bilan",
        "let yoki const bilan e'lon qilinguncha (tepadagi hudud)",
        "Dastur tugaganda",
        "Obyektlarda"
      ],
      correctAnswer: 1,
      explanation: "let va const hoisted (yuqoriga ko'tariladi) bo'lsa ham e'lon qilinish qatorigacha ishlatilmaydi. Bu hudud TDZ dir."
    },
    {
      id: 10,
      question: "let a=1; function s() { let a=2; console.log(a); } s(); console.log(a); Nima chiqadi?",
      options: [
        "2 keyin 2",
        "1 keyin 2",
        "2 keyin 1",
        "undefined"
      ],
      correctAnswer: 2,
      explanation: "Funksiya o'zining ichidagi a=2 ni chiqaradi, keyin global a=1 o'zgarmasdan 1 chiqadi."
    },
    {
      id: 11,
      question: "Global Scope Pollution nima?",
      options: [
        "Tezlik oshishi",
        "Keraksiz global o'zgaruvchilar ko'payib nomlar to'qnashuviga olib kelishi",
        "Kesh to'lishi",
        "Izohlar ko'pligi"
      ],
      correctAnswer: 1,
      explanation: "Global qamrovni o'zgaruvchilar bilan to'ldirib yuborish tizim ishlashini murakkablashtiradi."
    },
    {
      id: 12,
      question: "Strict Mode (`'use strict'`) da let va var siz o'zgaruvchi e'lon qilsa nima bo'ladi?",
      options: [
        "Global o'zgaruvchi bo'ladi",
        "Hech narsa bo'lmaydi",
        "ReferenceError beradi",
        "Lokal bo'ladi"
      ],
      correctAnswer: 2,
      explanation: "Strict Mode himoyalangan kod yozishni ta'minlaydi va e'lon qilinmagan o'zgaruvchiga qiymat yuklashda ReferenceError beradi."
    }
  ]
};