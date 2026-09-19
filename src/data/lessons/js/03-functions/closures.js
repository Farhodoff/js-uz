export const closures = {
  id: "closures",
  title: "Scope va Closure: Ryukzak qoidasi",
  language: "javascript",
  theory: `
# Scope (Qamrov) va Closure (Yopilish)

## Part 1: Beginner Analogy
JavaScript-da **Scope** (Qamrov) va **Closure** (Yopilish) muhim tushunchalardir.
Tasavvur qiling, siz tog'ga sayohatga chiqyapsiz. Uydan chiqishdan oldin kerakli barcha narsalarni ryukzagingizga (sumkaga) solib oldingiz. Endi tog'ga chiqsangiz ham, uyda qolgan narsalaringiz doim orqangizdagi sumkada siz bilan yuradi.
Dasturlashda ham funksiya boshqa joyda chaqirilish uchun o'zining asl tug'ilgan joyidan chiqib ketganida, u tug'ilgan vaqtdagi barcha ko'ra olgan o'zgaruvchilarini "ryukzak"ka solib o'zi bilan olib ketadi! Ana shu ryukzak — **Closure** deb ataladi.

\\\`\\\`\\\`javascript
function uy() {
  let ovqat = "Osh";
  
  return function tog() {
    console.log("Tog'da yeyapmiz: " + ovqat);
  }
}

const sayohat = uy();
sayohat(); // "Tog'da yeyapmiz: Osh"
\\\`\\\`\\\`

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)
Closure qanday ishlaydi? V8 dvigateli har bir ishga tushgan funksiya uchun **Execution Context** yaratadi. Uning ichida **Lexical Environment** mavjud bo'lib, u o'zgaruvchilarni saqlaydi.
Agar ichki funksiya tashqi o'zgaruvchilarni ishlatsa, V8 bu o'zgaruvchilarni oddiy *Stack* o'rniga *Heap* xotirasida saqlaydi. Bu **Escape Analysis** deyiladi.
Shunday qilib, tashqi funksiya tugaganidan keyin ham, ichki funksiya bu o'zgaruvchilarga Heap orqali murojaat qila oladi va ular Garbage Collector tomonidan o'chirib yuborilmaydi.

**Performance (Ishlash tezligi):**
Closure-lar xotiradan (Memory) joy oladi. Agar siz juda ko'p closure-lar yaratsangiz va ularni tozalamasangiz, **Memory Leak** (Xotira sizib chiqishi) muammosiga duch kelasiz. Shuning uchun kerak bo'lmagan closure-larni oxirida null qilib axlat yig'ishtiruvchiga yordam berish maqsadga muvofiq.

\\\`\\\`\\\`javascript
function createCounter() {
  let count = 0; // Heap xotirada qoladi
  return function() {
    count++;
    return count;
  }
}
\\\`\\\`\\\`

## Part 3: Edge Cases and Senior Interview Questions
Senior intervyularida ko'p so'raladigan klassik muammo — bu Loop ichida Closure ishlatishdir.

\\\`\\\`\\\`javascript
// Xato ('var' bilan)
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // Natija: 4, 4, 4
  }, 1000);
}
\\\`\\\`\\\`
**Nima uchun?** 'var' ning block-scope-i yo'q. Barcha funksiyalar bitta umumiy 'i' ni ulashadi. Sikl 1 soniya o'tguncha 4 bo'lib bo'lgan bo'ladi.

\\\`\\\`\\\`javascript
// To'g'ri ('let' bilan)
for (let i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // Natija: 1, 2, 3
  }, 1000);
}
\\\`\\\`\\\`
**Yechim:** 'let' har bir loop qadami uchun o'zining mustaqil Leksik Muhitini yaratadi.

## Mermaid Diagram

\\\`\\\`\\\`mermaid
flowchart TD
    A[createCounter Yaratildi] --> B[count = 0 Heap Xotirada]
    B --> C[Ichki funksiya qaytarildi]
    C --> D[Closure Ryukzagi shakllandi]
    D -. Ryukzak Ichida .-> E[count = 0]
    D --> F[const counter = ichki_funksiya]
    F --> G[counter chaqirildi]
    G --> H[Ryukzakdagi count 1 ga oshdi]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Scope qoidasi: Ichki ko'rish",
      instruction: "Tashqarida 'message = \"Salom\"' bor. 'sayHi' funksiyasini yozing, u o'sha xabarni qaytarsin (return). Funksiyani chaqirib 'res' ga tenglang.",
      startingCode: "let message = 'Salom';\n// sayHi funksiyasini yozing\n\n// chaqirib res ga bering",
      hint: "function sayHi() { return message; } let res = sayHi();",
      test: "if(typeof res === 'undefined' || res !== 'Salom') throw new Error('sayHi message ni qaytarmadi');"
    },
    {
      id: 2,
      title: "Block Scope: Kichik quti",
      instruction: "if bloki ichida 'let a = 5' yozilgan. Uni tashqarida console.log qilmoqchimiz. Xatoni to'g'irlash uchun 'a' ni tashqariga olib chiqing va 5 ga tenglang.",
      startingCode: "let res;\nif (true) {\n  let a = 5;\n}\n// res = a; yozsak xato bo'ladi, kodni to'g'irlang",
      hint: "let a; if(true){ a=5; } res=a;",
      test: "if(typeof res === 'undefined' || res !== 5) throw new Error('Block scope muammosi yechilmadi');"
    },
    {
      id: 3,
      title: "Oddiy Closure: Salomlashuv",
      instruction: "'greeting(salomlashuv)' funksiyasini yarating, u ichki funksiyani qaytarsin: 'return function(ism) { return salomlashuv + \" \" + ism; }'. Uni chaqirib sinab ko'ring.",
      startingCode: "function greeting(salomlashuv) {\n  // ichki funksiyani qaytaring\n}\nlet sayHello = greeting('Salom');\nlet res = sayHello('Ali');",
      hint: "return function(ism) { return salomlashuv + ' ' + ism; }",
      test: "if(typeof res === 'undefined' || res !== 'Salom Ali') throw new Error('Closure xato yozilmadi');"
    },
    {
      id: 4,
      title: "Maxfiy Counter",
      instruction: "'createCounter' funksiyasini yozing, 'count=0' ni yashirib, har safar chaqirilganda 'count' ni 1 ga oshirib qaytaruvchi funksiyani (closure) return qilsin.",
      startingCode: "function createCounter() {\n  let count = 0;\n  // shunday funksiya qaytaringki, count oshaversin\n}\nlet counter = createCounter();\nlet first = counter();\nlet second = counter();",
      hint: "return function() { count++; return count; }",
      test: "if(first !== 1 || second !== 2) throw new Error('Counter xato oshmadi');"
    },
    {
      id: 5,
      title: "Bank hisobi (Private Variable)",
      instruction: "Bank funksiyasini yozing. Uning 'balance = 100' yashirin o'zgaruvchisi bor. U obyekt qaytarsin: '{ deposit: function(amount){}, getBalance: function(){} }'. 'deposit' pul qoshib, 'getBalance' pulni ko'rsatsin.",
      startingCode: "function Bank() {\n  let balance = 100;\n  // return obyekt qiling\n}\nlet myBank = Bank();\nmyBank.deposit(50);\nlet current = myBank.getBalance();",
      hint: "return { deposit: function(v){ balance+=v; }, getBalance: function(){ return balance; } }",
      test: "if(typeof current === 'undefined' || current !== 150) throw new Error('Bank obyekti xato yozilgan');"
    },
    {
      id: 6,
      title: "Lexical Scope Shadowing",
      instruction: "Global 'let color = \"qizil\" '. Funksiya ichida ham aynan shu nomda 'let color = \"yashil\" ' yozing va uni qaytaring. Soya qoidasiga ko'ra ichki rang qaytishi kerak.",
      startingCode: "let color = 'qizil';\nfunction getColor() {\n  // shu yerda yashil color yarating va return qiling\n}\nlet res = getColor();",
      hint: "let color = 'yashil'; return color;",
      test: "if(typeof res === 'undefined' || res !== 'yashil') throw new Error('Shadowing ishlamadi');"
    },
    {
      id: 7,
      title: "Funksiya ichida Funksiya",
      instruction: "'multiplyBy(x)' funksiyasi yarating u '(y) ni x*y qaytaradigan' funksiya qaytarsin. 'double = multiplyBy(2)' yarating.",
      startingCode: "function multiplyBy(x) {\n  // return funksiya(y)\n}\nlet double = multiplyBy(2);\nlet res = double(5);",
      hint: "return function(y) { return x * y; }",
      test: "if(res !== 10) throw new Error('multiplyBy xato');"
    },
    {
      id: 8,
      title: "Mustaqil Closure",
      instruction: "Agar ikkita counter obyekti bir xil createCounter dan olingan bo'lsa: 'let c1 = createCounter(); let c2 = createCounter();'. c1.count() va c2.count() bir-biriga bog'liqmi yo'qmi tekshiring.",
      startingCode: "function createCounter() { let c = 0; return function(){ return ++c; } }\nlet c1 = createCounter();\nlet c2 = createCounter();\nlet v1 = c1();\nlet v2 = c2();",
      hint: "Ikkalasi mustaqil xotira oladi. v1=1, v2=1;",
      test: "if(v1 !== 1 || v2 !== 1) throw new Error('Ikkita closure mustaqil bolishi kerak edi');"
    },
    {
      id: 9,
      title: "Loop tuzog'ini to'g'irlash",
      instruction: "Quyidagi for siklida 'var' o'rniga shunday kalit so'z yozingki, funksiyalar chaqirilganda 0, 1, 2 chiqsin.",
      startingCode: "let arr = [];\nfor (/* var ni to'g'irlang */ i = 0; i < 3; i++) {\n  arr.push(function() { return i; });\n}\nlet res0 = arr[0]();\nlet res2 = arr[2]();",
      hint: "var ni let ga almashtiring.",
      test: "if(res0 !== 0 || res2 !== 2) throw new Error('var orniga let yozilmadi');"
    },
    {
      id: 10,
      title: "Yashirin parol",
      instruction: "Parolni tekshiruvchi funksiya yozing: 'secretKeeper(secret)'. U qabul qilgan parolni ryukzakda yashiradi va funksiya qaytaradi: agar argument sirga teng bo'lsa true, yo'qsa false.",
      startingCode: "function secretKeeper(secret) {\n  // shunday funksiya qaytaring u (guess) qabul qilib secret bilan tenglashtirsin\n}\nlet check = secretKeeper('1234');\nlet res = check('0000');\nlet res2 = check('1234');",
      hint: "return function(guess) { return guess === secret; }",
      test: "if(res !== false || res2 !== true) throw new Error('Closure xato tekshirdi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Lexical Scope (Leksik Qamrov) nima degani?",
      options: [
        "Funksiyalar faqat brauzerda ishlashi mumkin",
        "O'zgaruvchilar o'sha koddagi yozilgan joyiga qarab qamrab olinadi",
        "Funksiyalar faqat raqam qabul qilishi mumkin",
        "Eng tezkor scope turi"
      ],
      correctAnswer: 1,
      explanation: "Leksik so'zi 'matn bo'yicha', ya'ni kod qayerda e'lon qilingan bo'lsa shu joy atrofiga tegishliligini bildiradi."
    },
    {
      id: 2,
      question: "JavaScriptda ichki funksiya tashqi o'zgaruvchilarni ko'ra oladimi?",
      options: [
        "Yo'q, faqat o'zining ichidagilarini ko'radi",
        "Ha, kichik quti tashqaridagini bemalol o'qiy oladi",
        "Faqat 'use strict' yozilmaganda ko'radi",
        "Ha, lekin o'zgartira olmaydi"
      ],
      correctAnswer: 1,
      explanation: "Scope chaining (zanjiri) doim ichkaridan tashqariga qarab izlab boradi."
    },
    {
      id: 3,
      question: "Closure ning hayotiy o'xshatishi qanday?",
      options: [
        "Uchib ketgan qush",
        "Sayohatchining Ryukzagi - o'zi bilan tug'ilgan joyidagi kerakli xotiralarni olib ketishi",
        "Zanglab qolgan temir",
        "Komp'yuterni o'chirib yoqish"
      ],
      correctAnswer: 1,
      explanation: "Funksiya qayerda bajarilishidan qat'i nazar, yaratilgan vaqtidagi muhit (o'zgaruvchilar) ni yodida saqlab 'ryukzakka' solib yuradi."
    },
    {
      id: 4,
      question: "Closure qachon paydo bo'ladi?",
      options: [
        "Faqat for sikli yozilganda",
        "Faqat class larda",
        "Funksiya o'zining leksik muhitidan tashqariga yetkazilganda",
        "Obyekt e'lon qilinganda"
      ],
      correctAnswer: 2,
      explanation: "Tashqi funksiya return orqali ichki funksiyani olib chiqib ketganda closure ayniqsa yorqin namoyon bo'ladi."
    },
    {
      id: 5,
      question: "Closure qanday amaliy muammoni hal qiladi?",
      options: [
        "HTML taglarini chiroyli qiladi",
        "O'zgaruvchilarni maxfiylashtirish (Encapsulation) ga imkon beradi",
        "Fayl hajmini qisqartiradi",
        "Xotirani tejaydi"
      ],
      correctAnswer: 1,
      explanation: "Qamrab olingan o'zgaruvchiga to'g'ridan-to'g'ri yetib bo'lmaydi, faqat closure orqali muloqot qilinadi."
    },
    {
      id: 6,
      question: "'let c1 = createCounter(); let c2 = createCounter();' Bu holatda ularning Closure (xotirasi) bittami yoki alohida?",
      options: [
        "Bittasini ishlatsa ikkinchisi ham o'zgaradi",
        "Mutlaqo ikkita alohida va mustaqil xotira yaratiladi",
        "Faqat oxirgisi ishlaydi",
        "Xato beradi"
      ],
      correctAnswer: 1,
      explanation: "Har safar createCounter chaqirilganda funksiyaning mutlaqo yangi leksik muhiti noldan tug'iladi."
    },
    {
      id: 7,
      question: "for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i)); } Nega natija doim 3 bo'ladi?",
      options: [
        "Chunki setTimeout juda sekin ishlaydi",
        "var ning blok qamrovi (block scope) yo'qligi va barcha sikl bitta umumiy 'i' xotirasini bo'lishgani uchun",
        "console.log ni funksiya ichiga yozish xato",
        "Brauzer xatosi tufayli"
      ],
      correctAnswer: 1,
      explanation: "var bilan yozilgan i global yoki funksiya darajasida ochiq bo'ladi. Sikl tugagach u 3 ga teng bo'lib bo'ladi."
    },
    {
      id: 8,
      question: "Oldingi muammoni qanday qilib oson yechish mumkin?",
      options: [
        "var ni let ga o'zgartirish orqali, u har siklda yangi xotira bloki yaratadi",
        "setTimeout ni o'chirib tashlash",
        "var i ni const ga o'zgartirish",
        "Loop o'rniga if ishlatish"
      ],
      correctAnswer: 0,
      explanation: "let blok doirasida ishlagani uchun loopning har bir qadamida 'i' ning yangi nusxasi ryukzakka xavfsiz joylanadi."
    },
    {
      id: 9,
      question: "Lexical Scope-da o'zgaruvchini izlash qanday tartibda ketadi?",
      options: [
        "Globaldan izlab ichkariga kirib keladi",
        "Birinchi bo'lib Globalni qaraydi",
        "Avval o'zining ichini izlaydi, topolmasa tashqi qutiga qaraydi, toki Globalga yetguncha",
        "Faqat o'zinikini izlaydi, topolmasa xato beradi"
      ],
      correctAnswer: 2,
      explanation: "Scope zanjiri doim ichkaridan tashqariga tomon harakatlanadi."
    },
    {
      id: 10,
      question: "Closure larning potensial xavfi nimada?",
      options: [
        "Ular API-ni buzib tashlaydi",
        "Keraksiz closure lar xotirani to'ldirishi (Memory leak) mumkin",
        "Foydalanuvchilar maxfiy ma'lumotlarni o'qishi mumkin bo'ladi",
        "Haddan tashqari ko'p rang talab qiladi"
      ],
      correctAnswer: 1,
      explanation: "Agar closure keraksiz ob'ektlarni yopib qo'ysa, Garbage Collector ularni o'chira olmaydi."
    },
    {
      id: 11,
      question: "V8 Engine Closure-ni xotirada qanday boshqaradi?",
      options: [
        "O'zgaruvchilarni Stack-da qoldiradi",
        "Escape Analysis yordamida o'zgaruvchilarni Heap xotiraga o'tkazadi",
        "Hard Drive-ga saqlaydi",
        "Xotiradan darhol o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "V8 dvigateli yashirin havola qilingan o'zgaruvchilarni Stack o'rniga Heap-ga o'tkazadi, toki ular uzoq yashay bilsin."
    },
    {
      id: 12,
      question: "Global Scope dagi o'zgaruvchi bilan Closure da yashiringan o'zgaruvchini nima farqi bor?",
      options: [
        "Farqi yo'q",
        "Global o'zgaruvchini har kim o'zgartirishi mumkin, Closure dagi esa 'himoyalangan'",
        "Global o'zgaruvchi faqat 1 marta yaratiladi, closure umuman yaratilmaydi",
        "Closure tezroq yoziladi"
      ],
      correctAnswer: 1,
      explanation: "Aynan himoya! Boshqa kod qismlari closure ichidagi holatga to'g'ridan to'g'ri aralashib zarar yetkaza olmaydi."
    }
  ]
};
