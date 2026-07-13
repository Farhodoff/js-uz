export const hoistingThisLesson = {
  id: "hoistingThisLesson",
  title: "Hoisting (Yuqoriga ko'tarilish) va TDZ",
  language: "javascript",
  theory: `# Hoisting nima?

Tasavvur qiling, JavaScript sizning kodingizni o'qishdan oldin **Geliyli sharlar (Helium balloons)** bayramini o'tkazadi. 

Dastur (kod) tepadan pastga qarab ishlashni boshlashidan avval, JS dvigateli (Engine) butun faylni tezkorlik bilan aylanib chiqadi va ba'zi so'zlarni (masalan \`var\`, \`function\`) geliyli shar kabi **eng tepaga ko'tarib qo'yadi**. Ana shu jarayon — **Hoisting** (Yuqoriga tortish) deb ataladi.

Ammo har bir shar har xil xususiyatga ega:
1. **\`function\` shari:** Eng zo'r shar! U o'zi bilan butun boshli "tana"sini olib tepaga uchadi.
2. **\`var\` shari:** Qalbakiroq shar. U tepaga uchadi, lekin ichidagi qiymati yerdagi qutida qolib ketadi (tepada u "undefined" bo'ladi).
3. **\`let\` va \`const\` sharlari:** Ular ham tepaga uchadi, lekin kiyimi ko'rinmas qilingan! Ularga teginsangiz qo'lingiz kuyadi (Error!). Bunga **Temporal Dead Zone (TDZ)** deyiladi.

---

## 1. Funksiyalar (Eng mukammal Hoisting)

Function Declaration (oddiy funksiya) koddagi hamma narsadan ustun va birinchi bo'lib tepaga uchadi.

✅ **YAXSHI:**
\`\`\`javascript
uchish(); // "Men uchdim!" chiqadi. Hech qanday xatolik yo'q.

function uchish() {
  console.log("Men uchdim!");
}
\`\`\`
Kod shunday yozilgan bo'lsa ham, JS uni ishga tushirishdan avval funksiyani faylning 1-qatoriga ko'tarib oladi. Shuning uchun uni bemalol tepadanoq chaqira olamiz.

---

## 2. 'var' bilan Hoisting (G'alati xulq)

\`var\` bilan o'zgaruvchi yaratilganda uning "nomi" tepaga uchadi, lekin "qiymati" yozilgan qatorda qolib ketadi.

❌ **YOMON (Chalkashlik):**
\`\`\`javascript
console.log(ism); // ERROR emas, lekin 'undefined' (bo'sh) chiqadi.

var ism = "Ali"; 

console.log(ism); // Endi "Ali" chiqadi.
\`\`\`

**Bunga nima sabab bo'ldi?** JS buni aslida bunday tushundi:
\`\`\`javascript
var ism; // Tepaga uchdi (qiymatsiz)
console.log(ism); // ism bor, lekin bo'sh = undefined
ism = "Ali"; // Qiymat berildi
\`\`\`
Bunday holat kattaroq loyihalarda juda katta chalkashliklarni keltirib chiqaradi, chunki dastur to'xtab qolmaydi, faqatgina qiymatni xato beradi!

---

## 3. 'let' va 'const' (Qat'iy Hoisting - TDZ)

Modern JavaScript (ES6) bu chalkashlikni tuzatish uchun \`let\` va \`const\` ni yaratdi. Ular ham tepaga uchadi (Hoisted), lekin ularni yozilgan qatorigacha ishlatishga qat'iyan man etiladi! Bu "o'lik hudud" **TDZ (Temporal Dead Zone)** deyiladi.

✅ **YAXSHI (Qat'iy va Xavfsiz):**
\`\`\`javascript
console.log(yosh); // ERROR! Cannot access 'yosh' before initialization

let yosh = 20; 
\`\`\`
Bu xato emas, bu **himoya!** Dasturchi xato qilib e'lon qilinmagan o'zgaruvchini ishlatmoqchi bo'lsa, JS uni "undefined" deb jim turmasdan darhol to'xtatadi. Shuning uchun doim \`let\` yoki \`const\` ishlatish kerak.

---

## 4. Function Expression va Arrow Function-da Hoisting

Agar siz funksiyani \`var\`, \`let\` yoki \`const\` qutisiga (o'zgaruvchiga) solib yozsangiz (Expression), funksiya qoidasi emas, o'zgaruvchi qoidasi ishlay boshlaydi!

\`\`\`javascript
// Arrow function:
sayHi(); // ERROR!

const sayHi = () => {
  console.log("Salom!");
};
\`\`\`
Quti (sayHi) const bo'lgani uchun TDZ ishga tushadi va kod to'xtaydi. Bu o'zingizni xavfsiz his qilishingiz uchun juda yaxshi amaliyot!

---

## Mermaid Diagramma (JS Qanday o'qiydi?)

JS dvigateli faylni ikki marta o'qiydi:
1. **Creation Phase (Yaratish bosqichi):** O'zgaruvchi va funksiyalarni xotiraga yozish (Hoisting).
2. **Execution Phase (Bajarish bosqichi):** Kodni qatorma-qator o'qib, ularga qiymat berish.

\`\`\`mermaid
flowchart TD
    A[Kodni ishga tushirish] --> B[Creation Phase - Xotira ajratish]
    B --> C[Hoisting: function -> to'liq xotiraga kiradi]
    B --> D[Hoisting: var -> nomi kiradi = undefined]
    B --> E[Hoisting: let/const -> nomi kiradi, lekin TDZ ga qulflanadi]
    
    C --> F[Execution Phase - Kodni tepadan pastga o'qish]
    D --> F
    E --> F
    
    F --> G{O'zgaruvchi ishlatilsa}
    G -- function -> --> H[Ishlaydi ✅]
    G -- var -> --> I[undefined qaytadi ⚠️]
    G -- let/const (TDZ ichida) -> --> J[ReferenceError Xatosi ❌]
\`\`\`

---

## 🎙 Intervyu savollari

**1. Hoisting o'zi nima?**
**Javob:** Hoisting bu JavaScript dvigateli kodni qatorma-qator bajarishdan avval (kompilyatsiya fazasida) barcha o'zgaruvchi va funksiya e'lonlarini o'z scope (hudud)larining eng yuqorisiga "ko'tarib" xotirada joy ajratish mexanizmidir.

**2. let va const hoisting bo'ladimi?**
**Javob:** Ha, bo'ladi! Lekin ular TDZ (Temporal Dead Zone) deb ataluvchi holatga tushadi. Ya'ni xotirada joy ajratiladiyu, lekin koddagi e'lon qilingan qatorigacha ularni o'qish yoki yozish xato (ReferenceError) beradi.

**3. "Temporal Dead Zone" (TDZ) degani nima?**
**Javob:** Bu block scope ichida o'zgaruvchining e'lon qilingan joyidan to u yozilgan qatoriga (initialization) qadar bo'lgan masofa. Shu masofada o'zgaruvchiga murojaat qilib bo'lmaydi.

**4. Nega var o'rniga let ishlatish tavsiya etiladi?**
**Javob:** \`var\` block-scope ni hurmat qilmaydi (funksiya scope) va hoisting paytida 'undefined' bilan qotadi, bu kutilmagan bug (xato) larga sabab bo'ladi. \`let\` esa block-scope ga ega va TDZ yordamida undefined bo'lish xavfini yo'q qilib dasturni mustahkamlaydi.`,
  exercises: [
    {
      id: 1,
      title: "Function Hoisting",
      instruction: "Koddagi chaqiruvdan (play()) pastda 'play' nomli Function Declaration yarating, u 'Game Over' stringini qaytarsin.",
      startingCode: "let res = play();\n// play funksiyasini yozing",
      hint: "function play() { return 'Game Over'; }",
      test: "if (typeof res === 'undefined' || res !== 'Game Over') throw new Error('Hoisting xato ishladi');"
    },
    {
      id: 2,
      title: "var va Hoisting",
      instruction: "'score' nomli var o'zgaruvchisini yarating va unga 100 qiymatini bering. Ammo uni console.log qilishdan KEYIN yarating.",
      startingCode: "let res = score; // Bu yerda score undefined bo'ladi\n// score ni var bilan yarating va 100 ga tenglang",
      hint: "var score = 100;",
      test: "if (typeof score === 'undefined' || score !== 100 || res !== undefined) throw new Error('var hoisting qilinmadi yoki noto\'g\'ri yozildi');"
    },
    {
      id: 3,
      title: "TDZ va let",
      instruction: "Quyidagi try/catch blokini o'zgartirmang. Faqatgina 'let age = 25;' ni catch tugaganidan keyin (eng pastga) yozing. Shu orqali TDZ ni test qilamiz.",
      startingCode: "let errMsg = '';\ntry {\n  let res = age;\n} catch(err) {\n  errMsg = err.name;\n}\n// shu yerga let age = 25; deb yozing",
      hint: "let age = 25;",
      test: "if (errMsg !== 'ReferenceError' || age !== 25) throw new Error('TDZ xatosi chiqishi kerak edi');"
    },
    {
      id: 4,
      title: "Function Expression Hoisting (Xato izlash)",
      instruction: "'walk' nomli Function Expression var orqali yaratilgan. Uni chaqirishga harakat qiling. Uning qiymati qanday xato beradi?",
      startingCode: "let errorType = '';\ntry {\n  walk();\n} catch(err) {\n  // err.name yoki xususiyatini oling\n  errorType = err.name;\n}\nvar walk = function() { return 'Walking...'; };",
      hint: "O'zi to'g'ri yozilgan, shunchaki ishga tushiring.",
      test: "if (errorType !== 'TypeError') throw new Error('var bilan yozilgan funksiya TypeError (walk is not a function) berishi kerak');"
    },
    {
      id: 5,
      title: "Blok ichidagi Hoisting",
      instruction: "if bloki ichida var ishlatilsa, u tashqariga ham chiqib ketadi. If (true) ichida 'var color = \\'qizil\\'' deb yozing va res ga color ni tenglang.",
      startingCode: "if (true) {\n  // var bilan color yarating\n}\nlet res = color;",
      hint: "var color = 'qizil';",
      test: "if (typeof color === 'undefined' || res !== 'qizil') throw new Error('var blok scope dan qochishi kerak edi');"
    },
    {
      id: 6,
      title: "Blok ichida TDZ",
      instruction: "Tashqarida 'let x = 10;'. If bloki ichida 'let x = 20;'. Agar if bloki ichida x ni tepada log qilsak TDZ ga uchraydimi? Sinab ko'rish uchun koddagi xatoni ushlab xatoni nomini saqlang.",
      startingCode: "let x = 10;\nlet xato = '';\nif (true) {\n  try {\n    let y = x; // Bu TDZ xato beradi, chunki pastda let x=20 turibdi\n  } catch (e) {\n    xato = e.name;\n  }\n  let x = 20;\n}",
      hint: "Kodni faqat yurgizib ko'ring.",
      test: "if (xato !== 'ReferenceError') throw new Error('Block ichidagi let o\'z TDZ siga tushishi kerak');"
    },
    {
      id: 7,
      title: "Class va Hoisting",
      instruction: "ES6 da yaratilgan Class lar ham hoisting bo'ladi lekin let kabi TDZ ga tushadi. 'new Car()' qiling va u ReferenceError berishiga ishonch hosil qiling.",
      startingCode: "let errName = '';\ntry {\n  let myCar = new Car();\n} catch (e) {\n  errName = e.name;\n}\nclass Car { }",
      hint: "Kodni o'zgartirmang, u to'g'ri yozilgan",
      test: "if(errName !== 'ReferenceError') throw new Error('Classlar ham let kabi ishlaydi');"
    },
    {
      id: 8,
      title: "Ikki xil Hoisting (Priority)",
      instruction: "Bir xil nomda ham var, ham function e'lon qilingan. Dvigatel qaysi biriga ustunlik beradi? var myName = 'Ali'; function myName(){} ni yozib natijani res ga saqlang.",
      startingCode: "var myName;\nfunction myName() { return 'Function'; }\nmyName = 'Ali';\nlet res = typeof myName; // qanday type qoladi?",
      hint: "Function declaration dastlab ko'tariladi, keyin var o'zgaruvchi uning ustidan 'Ali' qiymatini yozib yuboradi (string). Kodga tegmasdan yurgizing.",
      test: "if(res !== 'string') throw new Error('var o\'z qiymatini berganidan keyin function ustidan yoziladi');"
    },
    {
      id: 9,
      title: "Arrow Function va const",
      instruction: "Arrow funksiyani const bilan yuqorida ishlatish mumkinmi? Yo'q, TDZ ishlaydi. 'const getSpeed = () => 100;' deb eng pastga yozing.",
      startingCode: "let ok = false;\ntry { getSpeed(); } catch(e) { ok = true; }\n// getSpeed ni const arrow bilan yozing",
      hint: "const getSpeed = () => 100;",
      test: "if (!ok || typeof getSpeed !== 'function') throw new Error('Arrow Function TDZ xato ushlanmadi');"
    },
    {
      id: 10,
      title: "Function Scope va var",
      instruction: "var faqatgina funksiya doirasida (function scope) yopiladi. test() funksiyasi ichida var a = 1 yaratilsa, tashqarida u undefined bo'ladimi yoki xatomi? Try catch orqali buni ushlang.",
      startingCode: "function test() { var abc = 123; }\ntest();\nlet errorMsg = '';\n// try ichida abc ni chaqiring, catch da errorMsg ga saqlang",
      hint: "try { let res = abc; } catch(e) { errorMsg = e.name; }",
      test: "if(errorMsg !== 'ReferenceError') throw new Error('var funksiyadan tashqariga chiqa olmaydi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Hoisting nima?",
      options: [
        "Veb-sahifani serverga yuklash jarayoni",
        "O'zgaruvchi va funksiya e'lonlarini bajarilishdan oldin o'z muhitining yuqorisiga ko'tarish mexanizmi",
        "CSS dagi elementlarni tepaga surish amali",
        "Fayl hajmini siqish"
      ],
      correctAnswer: 1,
      explanation: "Kompilyator (JS dvigateli) kod ishlashidan oldin xotira ajratish bosqichida barcha e'lonlarni 'tepaga' tortib qo'yadi."
    },
    {
      id: 2,
      question: "'console.log(x); var x = 5;' kodida natija nima chiqadi?",
      options: [
        "5",
        "ReferenceError: x is not defined",
        "undefined",
        "Null"
      ],
      correctAnswer: 2,
      explanation: "Hoisting paytida faqatgina 'var x' qismi (nomi) tepaga ko'tariladi, uning '= 5' qiymati o'z joyida qoladi."
    },
    {
      id: 3,
      question: "'console.log(y); let y = 10;' kodida natija nima chiqadi?",
      options: [
        "10",
        "undefined",
        "ReferenceError: Cannot access 'y' before initialization",
        "NaN"
      ],
      correctAnswer: 2,
      explanation: "let va const ham hoisted bo'ladi, biroq ular yozilgan qatorgacha 'TDZ' (Temporal Dead Zone) deb ataluvchi qulfga tushadi va unga murojaat xatolik beradi."
    },
    {
      id: 4,
      question: "TDZ qachon tugaydi?",
      options: [
        "Faylning oxirida",
        "Hech qachon",
        "JS dvigateli koddagi o'zgaruvchi e'lon qilingan qatorga yetib kelib, unga qiymat berilganda (yoki undefined yozilganda)",
        "Sahifa refresh qilinganda"
      ],
      correctAnswer: 2,
      explanation: "TDZ - bu blokning boshidan to e'lon qilingan nuqtasigacha bo'lgan taqiqlangan hudud."
    },
    {
      id: 5,
      question: "Qaysi biri to'liq tanasi bilan (hoisted intact) tepaga ko'tariladi va istalgan joydan ishlatsa bo'ladi?",
      options: [
        "var",
        "Function Declaration (function doSomething() {...})",
        "Arrow Function",
        "const"
      ],
      correctAnswer: 1,
      explanation: "Oddiy funksiya e'lonlari (declaration) eng zo'r hoisitingga ega, u ichidagi kodi bilan to'liq tepadanoq foydalanishga tayyor bo'ladi."
    },
    {
      id: 6,
      question: "'var sayHi = function() { console.log(\\'Hi\\'); };' deb yozsak, 'sayHi();' ni bu qatordan tepada ishlata olamizmi?",
      options: [
        "Ha, chunki bu funksiya",
        "Yo'q, 'TypeError: sayHi is not a function' xatosi beradi, chunki sayHi undefined qilib ko'tarilgan bo'ladi",
        "Ha, var hamma joyda ishlaydi",
        "ReferenceError beradi"
      ],
      correctAnswer: 1,
      explanation: "var hoisted bo'lib 'undefined' qiymatini oladi. Undefined ni funksiya kabi chaqirmoqchi bo'lsak Type Error yuzaga keladi."
    },
    {
      id: 7,
      question: "let va const da nega TDZ mavjud?",
      options: [
        "Chunki ular JS dvigatelini sekinlashtirish uchun o'ylab topilgan",
        "Kodning yanada qat'iy va xatosiz ishlashini ta'minlash uchun (e'lon qilinmasdan turib ishlatilishining oldini oladi)",
        "var ni olib tashlash uchun",
        "Ular faqat raqam qabul qilgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Bu 'best practice' uchun qo'shilgan himoya mexanizmi bo'lib, tasodifan hali mavjud bo'lmagan qiymatlarni o'qib chalkashmasligimiz uchun kerak."
    },
    {
      id: 8,
      question: "Nima uchun Arrow Function hoistingga eskicha deklaratsiya kabi to'liq dosh bera olmaydi?",
      options: [
        "Arrow funksiya const, let yoki var bilan oddiy o'zgaruvchi sifatida e'lon qilinadi, shuning uchun ular o'zgaruvchilarning hoisting qoidasiga bo'ysunadi",
        "Arrow funksiya ES6 dagi xato hisoblanadi",
        "Arrow function asosan classlar uchun ishlagani sababli",
        "Chunki => belgisi compiler ga xalaqit beradi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyaning alohida o'z qoidasi yo'q, uni qaysi (let/const/var) xaltaga solishingizga qarab o'sha xaltaning xususiyatini oladi."
    },
    {
      id: 9,
      question: "'var' faqat qaysi scope ni hurmat qiladi (qayerdan tashqariga chiqa olmaydi)?",
      options: [
        "Block scope (if, for)",
        "Function scope (faqat funksiya ichida e'lon qilinsa tashqariga chiqmaydi)",
        "Global scope",
        "Hech qanday scope ni hurmat qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "var faqatgina funksiya (function) tanasi ichidagina chegaralanadi. Lekin oddiy if {} yoki for {} lardan tashqariga oqib chiqib ketadi."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi amaliyot Zamonaviy JavaScriptda ✅ YAXSHI (Best Practice) hisoblanadi?",
      options: [
        "Hamma joyda 'var' ishlatish va funksiyalarni pastda yozib, eng tepada chaqirish",
        "O'zgaruvchilarni har doim ishlatishdan oldin (tepada) e'lon qilish, hamda var o'rniga doim let/const ishlatish",
        "Barcha o'zgaruvchilarni undefined qilib qoldirish",
        "O'zgaruvchilarni faylning eng pastki qismida e'lon qilish"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy kod har doim ishonchli (predictable) bo'lishi kerak. Avval yozing, keyin ishlating qoidasi TDZ orqali mustahkamlangan."
    },
    {
      id: 11,
      question: "Class e'lonlari hoisting qilinadimi?",
      options: [
        "Yo'q, mutlaqo qilinmaydi",
        "Ha qilinadi, lekin ular ham 'let' kabi TDZ qoidasiga bo'ysunadi (tepada chaqirib bo'lmaydi)",
        "Ha qilinadi va bemalol tepadan obyekt yasasa bo'ladi",
        "Faqat Constructor ko'tariladi"
      ],
      correctAnswer: 1,
      explanation: "Class e'lonlari (class MyClass {}) hoisting qilinadi, lekin uni yozilgan joyidan tepada new MyClass() qilsangiz ReferenceError beradi."
    },
    {
      id: 12,
      question: "Tushunarli va bug(xato)siz dastur tuzishda nimalarga ko'proq e'tibor qaratish kerak?",
      options: [
        "Iloji boricha hamma joyda faqat 'var' ni qo'llash",
        "Hoisting qanday ishlashini to'liq anglash va o'zgaruvchilarni to'g'ri block-scopelarda let va const yordamida izolyatsiya qilish",
        "O'zgaruvchilarni nomlashni qisqartirish (masalan, a, b, c, d)",
        "Barcha o'zgaruvchilarni global qilib qo'yish"
      ],
      correctAnswer: 1,
      explanation: "Xavfsiz scope yuritish loyiha xajmi kattalashganda uning qulab tushmasligi kafolatidir."
    }
  ]
};
