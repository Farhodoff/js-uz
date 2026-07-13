export const closures = {
  id: "closures",
  title: "Scope va Closure: Ryukzak qoidasi",
  language: "javascript",
  theory: `# Scope (Qamrov) va Closure (Yopilish)

Tasavvur qiling, JavaScript sizdan ikkita muhim narsani bilishingizni talab qiladi:
1. **Scope:** Kim nimani ko'ra oladi? (Matryoshka qoidasi)
2. **Closure:** Funksiya uzoqqa ketganda nimalarni o'zi bilan olib ketadi? (Ryukzak qoidasi)

---

## 1. Scope (Leksik Qamrov / Matryoshka)

**Scope** — bu kodning ma'lum bir qismida qaysi o'zgaruvchilarga ruxsat borligini belgilaydigan hudud.

JavaScript-da hududlar **Matryoshka qo'g'irchoqlari** kabi ishlaydi. 
Eng kichik qo'g'irchoq (ichki funksiya) o'zidan kattaroq bo'lgan barcha qo'g'irchoqlarni (tashqi funksiyalar va global hududni) "ko'ra oladi". Lekin tashqi qo'g'irchoqlar o'zidan kichkina qo'g'irchoq ichidagi narsani ko'ra olmaydi!

\`\`\`javascript
let globalName = "Yer yuzi"; // Eng katta matryoshka (Global)

function outherFunction() {
  let outerName = "O'zbekiston"; // O'rtacha matryoshka

  function innerFunction() {
    let innerName = "Toshkent"; // Eng kichik matryoshka
    
    // Eng kichik quti hammaga yetib bora oladi:
    console.log(innerName + ", " + outerName + ", " + globalName);
  }
  
  innerFunction();
  // console.log(innerName); // XATO! Katta quti kichkinasini ko'rolmaydi.
}

outherFunction();
\`\`\`

### Leksik Qamrov (Lexical Scope)
JavaScriptda "Leksik" so'zi funksiyaning **qayerda yozilganligini** bildiradi. Funksiya kodda qayerda e'lon qilingan bo'lsa, o'z atrofiga shu joydagi o'zgaruvchilarni qamrab oladi. Uni qayerdan chaqirishingiz muhim emas, u tug'ilgan joyini eslab qoladi.

---

## 2. Closure (Ryukzak qoidasi)

Endi asosiy qismga keldik. **Closure nima o'zi?**

Tasavvur qiling, siz tog'ga sayohatga chiqyapsiz. Uydan chiqishdan oldin kerakli barcha narsalarni ryukzagingizga (sumkaga) solib oldingiz. Endi tog'ga chiqsangiz ham, uyda qolgan narsalaringiz doim orqangizdagi sumkada siz bilan yuradi.

Dasturlashda ham funksiya boshqa joyda (masalan, global qamrovda) chaqirilish uchun o'zining asl tug'ilgan joyidan chiqib ketganida, **u tug'ilgan vaqtdagi barcha ko'ra olgan o'zgaruvchilarini ryukzakka solib o'zi bilan olib ketadi!** Ana shu ryukzak — **Closure** deb ataladi.

\`\`\`javascript
function uy() {
  let ovqat = "Osh"; // Uyda pishirilgan ovqat

  function tog() {
    console.log("Tog'da yeyapmiz: " + ovqat); // Ovqatni sumkadan olyapti
  }

  return tog; // Tog funksiyasini qaytarib yubordik (uydan ketdi!)
}

// sayohat = tog funksiyasining o'zi
let sayohat = uy(); 

// Uy funksiyasi allaqachon ishlab bo'lgan, xotiradan tozalangan.
// Ammo 'sayohat' funksiyasi chaqirilganda 'ovqat' ni topa oladi:
sayohat(); // "Tog'da yeyapmiz: Osh"
\`\`\`

Nima bo'ldi? \`uy()\` funksiyasi o'z ishini tugatdi. Odatda funksiya tugagach, uning ichidagi o'zgaruvchilar o'lib ketishi kerak. Lekin \`tog\` funksiyasi \`ovqat\`ni o'zining "closure" (ryukzak)sida saqlab qolgani uchun ovqat axlatga tashlanmadi!

---

## 3. Nima uchun Closure kerak? (Amaliy misol)

Closure ning eng katta foydasi — o'zgaruvchilarni himoya qilish (Encapsulation). Birov tegishini xohlamagan o'zgaruvchilarni "yashirish" uchun ishlatiladi.

### ❌ YOMON: Global o'zgaruvchi (Xavfli)
Masalan, biz saytdagi tugma necha marta bosilganini sanamoqchimiz:
\`\`\`javascript
let count = 0; // Hammaga ochiq! Kimdir console dan count = 1000 deb o'zgartirishi mumkin

function increment() {
  count++;
  console.log(count);
}
increment(); // 1
increment(); // 2
\`\`\`

### ✅ YAXSHI: Closure orqali yashirish
Endi \`count\` ni yashiramiz. Hech kim uni tashqaridan o'zgartira olmaydi.
\`\`\`javascript
function createCounter() {
  let count = 0; // Maxfiy o'zgaruvchi (yopiq)
  
  return function() {
    count++; // Closure yordamida ryukzakdagi count'ni o'zgartiryapti
    console.log(count);
  }
}

const counter = createCounter();
counter(); // 1
counter(); // 2
console.log(count); // ERROR! Tashqaridan kirib bo'lmaydi.
\`\`\`
Mana buni "Private variables" (Maxfiy o'zgaruvchilar) deyiladi!

---

## Mermaid Diagramma (Ryukzak xaritasi)

Closure qanday saqlanishi vizual ko'rinishda:

\`\`\`mermaid
flowchart TD
    A[createCounter tug'ildi] --> B[count = 0 yaratildi]
    B --> C[Ichki funksiya qaytarildi]
    C --> D[Ichki funksiyada 'Ryukzak' paydo bo'ldi]
    D -.-> |Ryukzak ichida| E[count = 0]
    D --> F[const counter = ichki_funksiya]
    F --> G[counter() chaqirildi]
    G --> H[Ryukzakdagi count = 1 ga o'zgardi]
\`\`\`

---

## 4. Eng ko'p uchraydigan Xato (Loop tuzog'i)

Junior dasturchilar ko'pincha \`for\` sikli va \`var\` bilan xatoga yo'l qo'yishadi:

\`\`\`javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // Loop bitgandan keyin ishlaydi
  }, 1000);
}
// Natija: 4, 4, 4
\`\`\`
**Nega 4, 4, 4?** Chunki \`var\` ning block scope-i yo'q. Hammasi bitta \`i\` qutisini ulashadi (share qiladi). 1 soniya kutguncha \`i\` allaqachon 4 bo'lib bo'lgan edi! Barcha 3 ta ryukzakka ham oxirgi quti tiqilib qolgan.

**Yechim:** Qutini har bir qadamda yangitdan yasash uchun **\`let\`** ishlatish kerak!
\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Natija: 1, 2, 3
\`\`\`
\`let\` har bir aylanishda yangi quti yasaydi va o'sha qutini aniq o'zining alohida ryukzagiga solib oladi!

---

## 🎙 Intervyu savollari

**1. Closure nima o'zi? (Bir jumlada tushuntiring)**
**Javob:** Closure — bu funksiyaning o'zi yozilgan leksik muhitni eslab qolishi va undan chiqib ketganidan keyin ham shu hududdagi o'zgaruvchilarga kira olish xususiyatidir (ya'ni ryukzakdagi o'zgaruvchilar).

**2. Lexical Scope va Dynamic Scope ning farqi nima?**
**Javob:** JS-da Lexical Scope ishlatiladi. Bu funksiyaning tashqi o'zgaruvchilarga qayerda **chaqirilganiga** qarab emas, balki qayerda **yozilganiga** (tug'ilgan joyiga) qarab ulanishini anglatadi.

**3. JS-da private (maxfiy) o'zgaruvchilarni class-siz qanday qilsa bo'ladi?**
**Javob:** Aynan Closure yordamida! O'zgaruvchini funksiya ichiga qamrab, tashqariga faqatgina u bilan ishlaydigan ichki funksiyani qaytarsak, asosiy o'zgaruvchiga to'g'ridan-to'g'ri kirish imkonsiz bo'lib qoladi. Bu "Module Pattern" deb ham ataladi.

**4. Closure larning salbiy tomoni bormi? (Kamchiligi)**
**Javob:** Ha, chunki Closure o'zgaruvchilarni xotirada ushlab turadi (ryukzakni hech qachon axlatga tashlamaydi). Agar juda ko'p closure lar yaratilsa, bu xotiraning to'lishiga (Memory Leak) sabab bo'lishi mumkin.`,
  exercises: [
    {
      id: 1,
      title: "Scope qoidasi: Ichki ko'rish",
      instruction: "Tashqarida 'message = 'Salom'' bor. 'sayHi' funksiyasini yozing, u o'sha xabarni qaytarsin (return). Funksiyani chaqirib 'res' ga tenglang.",
      startingCode: "let message = 'Salom';\n// sayHi funksiyasini yozing\n\n// chaqirib res ga bering",
      hint: "function sayHi() { return message; } let res = sayHi();",
      test: "if(typeof res === 'undefined' || res !== 'Salom') throw new Error('sayHi message ni qaytarmadi');"
    },
    {
      id: 2,
      title: "Block Scope: Kichik quti",
      instruction: "if bloki ichida 'let a = 5' yozilgan. Uni tashqarida console.log qilmoqchimiz. Kod xato bo'ladi. Xatoni to'g'irlash uchun 'a' ni 'let' o'rniga nima bilan e'lon qilish mumkin (yoki let ni tashqariga chiqarish)? Bu testda shunchaki 'a' ni tashqariga olib chiqing va 5 ga tenglang.",
      startingCode: "let res;\nif (true) {\n  let a = 5;\n}\n// res = a; yozsak xato bo'ladi, kodni to'g'irlang",
      hint: "let a; if(true){ a=5; } res=a;",
      test: "const ast=arguments[0]; if(!ast.includes('res') || typeof res === 'undefined' || res !== 5) throw new Error('Block scope muammosi yechilmadi');"
    },
    {
      id: 3,
      title: "Oddiy Closure: Salomlashuv",
      instruction: "'greeting(salomlashuv)' funksiyasini yarating, u ichki funksiyani qaytarsin: 'return function(ism) { return salomlashuv + \\' \\' + ism; }'. Uni chaqirib sinab ko'ring.",
      startingCode: "function greeting(salomlashuv) {\\n  // ichki funksiyani qaytaring\\n}\\nlet sayHello = greeting('Salom');\\nlet res = sayHello('Ali');",
      hint: "return function(ism) { return salomlashuv + ' ' + ism; }",
      test: "if(typeof res === 'undefined' || res !== 'Salom Ali') throw new Error('Closure to\'g\'ri yozilmadi');"
    },
    {
      id: 4,
      title: "Maxfiy Counter",
      instruction: "'createCounter' funksiyasini yozing, 'count=0' ni yashirib, har safar chaqirilganda 'count' ni 1 ga oshirib qaytaruvchi funksiyani (closure) return qilsin.",
      startingCode: "function createCounter() {\n  let count = 0;\n  // shunday funksiya qaytaringki, count oshaversin\n}\nlet counter = createCounter();\nlet first = counter();\nlet second = counter();",
      hint: "return function() { count++; return count; }",
      test: "if(first !== 1 || second !== 2) throw new Error('Counter to\'g\'ri oshmadi');"
    },
    {
      id: 5,
      title: "Bank hisobi (Private Variable)",
      instruction: "Bank funksiyasini yozing. Uning 'balance = 100' yashirin o'zgaruvchisi bor. U obyekt qaytarsin: '{ deposit: function(amount){}, getBalance: function(){} }'. 'deposit' pul qoshib, 'getBalance' pulni ko'rsatsin.",
      startingCode: "function Bank() {\n  let balance = 100;\n  // return obyekt qiling\n}\nlet myBank = Bank();\nmyBank.deposit(50);\nlet current = myBank.getBalance();",
      hint: "return { deposit: function(v){ balance+=v; }, getBalance: function(){ return balance; } }",
      test: "if(typeof current === 'undefined' || current !== 150) throw new Error('Bank obyekti noto\'g\'ri yozilgan');"
    },
    {
      id: 6,
      title: "Lexical Scope Shadowing (Soya qilish)",
      instruction: "Global 'let color = \'qizil\' '. Funksiya ichida ham aynan shu nomda 'let color = \'yashil\' ' yozing va uni qaytaring. Soya qoidasiga ko'ra ichki rang qaytishi kerak.",
      startingCode: "let color = 'qizil';\nfunction getColor() {\n  // shu yerda yashil color yarating va return qiling\n}\nlet res = getColor();",
      hint: "let color = 'yashil'; return color;",
      test: "if(typeof res === 'undefined' || res !== 'yashil') throw new Error('Shadowing ishlamadi');"
    },
    {
      id: 7,
      title: "Funksiya ichida Funksiya zavodi",
      instruction: "'multiplyBy(x)' funksiyasi yarating u '(y) ni x*y qaytaradigan' funksiya qaytarsin. 'double = multiplyBy(2)' yarating.",
      startingCode: "function multiplyBy(x) {\n  // return funksiya(y)\n}\nlet double = multiplyBy(2);\nlet res = double(5);",
      hint: "return function(y) { return x * y; }",
      test: "if(res !== 10) throw new Error('multiplyBy xato');"
    },
    {
      id: 8,
      title: "Bitta Ryukzak (Shared Closure)",
      instruction: "Agar ikkita counter obyekti bir xil createCounter dan olingan bo'lsa: 'let c1 = createCounter(); let c2 = createCounter();'. c1.count() va c2.count() bir-biriga bog'liqmi yo'qmi tekshiring.",
      startingCode: "function createCounter() { let c = 0; return function(){ return ++c; } }\nlet c1 = createCounter();\nlet c2 = createCounter();\nlet v1 = c1();\nlet v2 = c2(); // qanday bo'ladi?",
      hint: "Ikkalasi mustaqil xotira oladi. v1=1, v2=1;",
      test: "if(v1 !== 1 || v2 !== 1) throw new Error('Ikkita closure mustaqil bo\'lishi kerak edi');"
    },
    {
      id: 9,
      title: "Loop tuzog'ini to'g'irlash",
      instruction: "Quyidagi for siklida 'var' o'rniga shunday kalit so'z yozingki, funksiyalar chaqirilganda 1, 2, 3 chiqsin (0,1,2 massiv indekslariga qarab).",
      startingCode: "let arr = [];\nfor (/* var ni to'g'irlang */ i = 0; i < 3; i++) {\n  arr.push(function() { return i; });\n}\nlet res0 = arr[0]();\nlet res2 = arr[2]();",
      hint: "var ni let ga almashtiring.",
      test: "if(res0 !== 0 || res2 !== 2) throw new Error('var o\'rniga let yozilmadi');"
    },
    {
      id: 10,
      title: "Yashirin parol",
      instruction: "Parolni tekshiruvchi funksiya yozing: 'secretKeeper(secret)'. U qabul qilgan parolni ryukzakda yashiradi va faqat funksiya qaytaradi: agar argument sirga teng bo'lsa true, yo'qsa false.",
      startingCode: "function secretKeeper(secret) {\n  // shunday funksiya qaytaring u (guess) qabul qilib secret bilan tenglashtirsin\n}\nlet check = secretKeeper('1234');\nlet res = check('0000');\nlet res2 = check('1234');",
      hint: "return function(guess) { return guess === secret; }",
      test: "if(res !== false || res2 !== true) throw new Error('Closure to\'g\'ri tekshirmadi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Lexical Scope (Leksik Qamrov) nima degani?",
      options: [
        "Funksiyalar faqat brauzerda ishlashi mumkin",
        "O'zgaruvchilar o'sha koddagi yozilgan joyiga (matniga) qarab qamrab olinadi",
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
        "Ha, chunki matryoshka qoidasi bo'yicha kichik quti tashqaridagini bemalol o'qiy oladi",
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
        "Funksiya o'zining leksik muhitidan tashqariga (boshqa scope-ga) yetkazilganda",
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
        "O'zgaruvchilarni maxfiylashtirish (Data Privacy / Encapsulation) ga imkon beradi",
        "Fayl hajmini qisqartiradi",
        "Xotirani tejaydi"
      ],
      correctAnswer: 1,
      explanation: "Qamrab olingan o'zgaruvchiga to'g'ridan-to'g'ri (nuqta qo'yib) yetib bo'lmaydi, faqat closure orqali muloqot qilinadi."
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
        "var ni let ga o'zgartirish orqali, u har siklda yangi xotira bloki (yangi i) yaratadi",
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
        "Avval o'zining ichini izlaydi, topolmasa tashqi matryoshkaga qaraydi, toki Globalga yetguncha zanjir orqali ketadi",
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
        "Keraksiz closure lar tashqi muhitni ushlab qolib Xotira To'lishiga (Memory leak) sabab bo'lishi mumkin",
        "Foydalanuvchilar maxfiy ma'lumotlarni bemalol o'qishi mumkin bo'lib qoladi",
        "Haddan tashqari ko'p rang talab qiladi"
      ],
      correctAnswer: 1,
      explanation: "Agar closure keraksiz ob'ektlarni yopib qo'ysa va xotiradan tozalanmasa, Garbage Collector ularni o'chira olmaydi."
    },
    {
      id: 11,
      question: "JavaScriptda qachon closure paydo bo'lishini to'g'ri ta'riflang?",
      options: [
        "Har qanday oddiy 'var x = 5' e'lonida",
        "Faqat React frameworkida",
        "Bir funksiya ichida boshqa bir funksiya yozilsa va u tashqi o'zgaruvchini ishlatsa avtomatik ravishda closure paydo bo'ladi",
        "Buni dasturchi o'zi alohida 'new Closure()' kodini yozib hosil qiladi"
      ],
      correctAnswer: 2,
      explanation: "JavaScriptda biz maxsus kod yozmaymiz, ichki funksiya atrof muhitdan narsa olgan zahoti tabiiy ravishda closure ga aylanadi."
    },
    {
      id: 12,
      question: "Global Scope dagi o'zgaruvchi bilan Closure da yashiringan o'zgaruvchini nima farqi bor?",
      options: [
        "Farqi yo'q",
        "Global o'zgaruvchini har kim kodi istalgan joyidan o'zgartirishi mumkin, Closure dagi esa 'himoyalangan' qutida",
        "Global o'zgaruvchi faqat 1 marta yaratiladi, closure umuman yaratilmaydi",
        "Closure tezroq yoziladi"
      ],
      correctAnswer: 1,
      explanation: "Aynan himoya! Boshqa kod qismlari closure ichidagi holatga to'g'ridan to'g'ri aralashib zarar yetkaza olmaydi."
    }
  ]
};
