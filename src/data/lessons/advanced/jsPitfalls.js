export const jsPitfalls = {
  id: "js-pitfalls",
  title: "JS Tuzoqlari va Xatolari (Common Pitfalls)",
  level: "Murakkab",
  description: "== vs ===, typeof null, forEach ichida async, reference/mutation xatolari, closure va this chalkashliklari kabi klassik JS tuzoqlari.",
  theory: `## 1. NEGA kerak?
Dasturlash davomida ba'zi xatolar sintaktik jihatdan to'g'ri bo'lsa-da, mantiqiy jihatdan kutilmagan natijalar beradi. JavaScript moslashuvchan va dinamik til bo'lganligi sababli, unda shunday "tuzoqlari" (pitfalls) juda ko'p. Ushbu dars kodingiz xavfsiz, barqaror va intervyularda beriladigan chalkash savollarga tayyor bo'lishi uchun juda muhimdir.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, siz ko'chada ketyapsiz va yo'lda **"yashirin chuqur"** bor. Uni ustidan barglar bilan yopib qo'yishgan. Agar siz yo'lni yaxshi bilmasangiz, barglarni bosib chuqurga yiqilasiz. JS-dagi tuzoqlar ham shunday: kod tashqi tomondan chiroyli va to'g'ri ko'rinadi (barglar), lekin ishga tushganda kutilmagan xatolik (chuqur) yuz beradi. Ushbu dars sizga barglar ostidagi chuqurlarni ko'rishni o'rgatadi.

## 3. STRUKTURA VA CHALKAShLIKLAR

### A. == va === Farqi (Type Coercion)
- \`==\` (noqat'iy tenglik): Solishtirishdan oldin ikkala qiymatni bir xil tipga o'tkazishga harakat qiladi (Coercion).
- \`===\` (qat'iy tenglik): Tiplarni o'zgartirmaydi. Ham qiymatni, ham tipni solishtiradi.
\`\`\`javascript
5 == "5";   // true (chunki string 5 songa aylandi)
5 === "5";  // false (chunki biri number, ikkinchisi string)
\`\`\`
*Tuzoq:* Obyektlar va massivlar solishtirilganda xotiradagi reference (ishora) solishtiriladi, tarkibi emas!
\`\`\`javascript
[] == [];   // false (chunki xotiradagi manzillari har xil)
{} === {};  // false
\`\`\`

### B. typeof null anomalisi
Tarixiy sabablarga ko'ra, \`typeof null\` qiymati \`"object"\` qaytaradi. Bu JS-ning ilk versiyasidagi xato bo'lib, o'zgaruvchining turi null ekanini aniqlashda chalkashlik yaratadi.
\`\`\`javascript
const x = null;
console.log(typeof x === "object"); // true ❌
// To'g'ri tekshirish:
console.log(x === null); // true ✅
\`\`\`

### C. forEach ichida asinxron amallar (Async inside forEach)
\`Array.prototype.forEach\` asinxron chaqiriqlarni kutish uchun mo'ljallanmagan. U shunchaki callback funksiyani massiv a'zolariga ketma-ket chaqiradi va \`await\` amalini e'tiborsiz qoldiradi (kutmasdan o'tib ketadi).
\`\`\`javascript
// ❌ Kutilganidek ishlamaydi:
urls.forEach(async (url) => {
  await fetchData(url); // Hammasi parallel va tartibsiz boshlanib ketadi
});

// ✅ To'g'ri yechim (Sequential - ketma-ket):
for (const url of urls) {
  await fetchData(url);
}

// ✅ Yoki Parallel kutish uchun:
await Promise.all(urls.map(url => fetchData(url)));
\`\`\`

### D. Reference va Mutation buglari (Shallow vs Deep Copy)
JavaScript primitiv bo'lmagan tiplarni (obyekt, massiv) reference (ishora) orqali uzatadi. Spread operatori (\`...\`) faqat sayoz (shallow) nusxa yaratadi, ichki obyektlarni o'zgartirsangiz asl obyekt ham o'zgarib ketadi.

\`\`\`mermaid
graph TD
    %% Styling
    classDef origStyle fill:#2ecc71,stroke:#fff,stroke-width:2px,color:#fff;
    classDef copyStyle fill:#3498db,stroke:#fff,stroke-width:2px,color:#fff;
    classDef nestedStyle fill:#9b59b6,stroke:#fff,stroke-width:2px,color:#fff;

    subgraph Memory_Stack ["Memory Stack"]
        VarOrig["Original User Obj (Reference X)"]:::origStyle
        VarShallow["Shallow Copy Obj (Reference Y)"]:::copyStyle
        VarDeep["Deep Copy Obj (Reference Z)"]:::copyStyle
    end

    subgraph Memory_Heap ["Memory Heap"]
        ObjOrig["{ name: 'Ali', details: Ref-A }"]:::origStyle
        ObjNested["{ age: 25 } (Address Ref-A)"]:::nestedStyle
        
        ObjShallow["{ name: 'Ali', details: Ref-A }"]:::copyStyle
        
        ObjDeep["{ name: 'Ali', details: Ref-B }"]:::copyStyle
        ObjNestedDeep["{ age: 25 } (Address Ref-B)"]:::nestedStyle
    end

    VarOrig --> ObjOrig
    VarShallow --> ObjShallow
    VarDeep --> ObjDeep
    
    ObjOrig --> ObjNested
    ObjShallow --> ObjNested
    
    ObjDeep --> ObjNestedDeep
\`\`\`

\`\`\`javascript
const user = { name: "Ali", role: "admin" };
const copy = user; // Reference ko'chirildi
copy.name = "Vali";
console.log(user.name); // "Vali" ❌ (Asl obyekt o'zgarib ketdi!)

// Spread operatori (\`...\`) faqat 1-darajali (shallow) nusxa oladi:
const profile = { name: "Ali", social: { twitter: "@ali" } };
const shallowCopy = { ...profile };
shallowCopy.social.twitter = "@vali";
console.log(profile.social.twitter); // "@vali" ❌ (Nested obyekt hamon bitta ishorada!)
\`\`\`

### E. Floating-Point Precision (Suzuvchi nuqta muammosi)
JavaScriptda barcha sonlar IEEE 754 double-precision 64-bit formatida saqlanadi. 0.1 va 0.2 kabi ba'zi o'nlik sonlar binary (ikki o'lchovli) tizimda cheksiz davriy kasrga aylanadi va yaxlitlash xatoligi tufayli kutilmagan natija beradi:
\`\`\`javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false ❌

// Yechim: Epsilon yoki toFixed orqali solishtirish
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true ✅
console.log(parseFloat((0.1 + 0.2).toFixed(12)) === 0.3); // true ✅
\`\`\`

### F. Closure-da eski qiymat (Stale Closure) va Loop chalkashligi
\`var\` yordamida e'lon qilingan o'zgaruvchilar funksiya doirasiga (function scope) ega bo'lgani uchun, tsikllar ichida closure yaratilganda oxirgi qiymat saqlanib qoladi.
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 ❌
}
// let ishlatilganda block scope tufayli har safar yangi nusxa olinadi:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 ✅
}
\`\`\`

### G. this yo'qolishi va chalkashliklar
Oddiy funksiyalarda \`this\` funksiya qanday chaqirilganiga bog'liq (dinamik). Arrow funksiyalarda esa \`this\` o'zi yaratilgan lexical muhitga bog'liq (statik).
\`\`\`javascript
const obj = {
  name: "Ali",
  greet() {
    setTimeout(function() {
      console.log(this.name); // undefined ❌ (chunki setTimeout ichidagi callback global window/undefined-ga tegishli)
    }, 100);
  }
};
\`\`\`
Yechim: Arrow funksiya ishlatish (this lexical scope orqali ota elementnikini oladi) yoki \`.bind(this)\` qilish.

## 4. XATOLAR (Common mistakes)
1. **Obyektlarni taqqoslash:** \`JSON.stringify(obj1) === JSON.stringify(obj2)\` qilish faqat kalitlar tartibi bir xil bo'lgandagina ishlaydi. Eng xavfsiz usul - deep comparison yozish.
2. **Parametrlarni o'zgartirish (Parameter mutation):** Funksiyaga kelgan massiv yoki obyektni funksiya ichida push yoki mutate qilish clean code qoidalariga zid va kutilmagan buglarga sabab bo'ladi.
3. **forEach return-i:** \`forEach\` ichidan \`return\` qilish tsiklni to'xtatmaydi, u shunchaki callback funksiyadan chiqadi xolos.

## 5. SAVOLLAR VA JAVOBLAR

**1. Nima uchun null primitiv bo'lsa-da, typeof null object qaytaradi?**
Bug - bu JavaScript tilining ilk versiyasidagi xato bo'lib, keyinchalik tizimlar buzilmasligi uchun to'g'rilanmagan.

**2. Obyekt va massivlarni solishtirishda == yoki === nega har doim false beradi?**
Chunki JavaScript obyektlarni solishtirishda ularning qiymatini emas, balki xotiradagi manzillarini (reference) solishtiradi.

**3. NaN === NaN natijasi nima?**
Natija \`false\` bo'ladi. \`NaN\`ni tekshirish uchun \`Number.isNaN()\` metodidan foydalanish zarur.

**4. forEach ichidagi async callback nega await qilinmaydi?**
Chunki \`forEach\` o'zining ichki logikasida callback funksiyadan qaytgan Promise-ni await qilish mexanizmiga ega emas.

**5. Shadow copy va Deep copy farqi nima?**
Shallow copy faqat birinchi darajali xususiyatlarni nusxalaydi, Deep copy esa ichki obyektlarni ham rekursiv ravishda to'liq nusxalab chiqadi.

**6. Arrow funksiyaning this kalit so'zi oddiy funksiyanikidan nimasi bilan farq qiladi?**
Arrow funksiyada o'zining shaxsiy \`this\` konteksti bo'lmaydi. U o'zi yozilgan (lexical) tashqi muhitdagi \`this\` qiymatini oladi.
`,
  exercises: [
    {
      id: 1,
      title: "Strict Equality",
      instruction: "Taqqoslash algoritmini qat'iy tenglik (strict equality) ishlatadigan qilib to'g'rilang, toki u noo'rin coercion (tip o'zgarishi) ga yo'l qo'ymasin.",
      startingCode: "function isEqual(a, b) {\n  return a == b;\n}\n",
      hint: "=== operatorini ishlating.",
      test: "if (!code.includes('==') && code.includes('===')) return null; return 'Kat\\'iy tenglikdan foydalaning!';"
    },
    {
      id: 2,
      title: "Safe typeof null",
      instruction: "Foydalanuvchi bergan qiymat haqiqatan ham 'object' ekanini tekshiruvchi va null bo'lsa false qaytaruvchi xavfsiz funksiya yozing.",
      startingCode: "function isRealObject(val) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "typeof val === 'object' && val !== null",
      test: "if (isRealObject(null) === false && isRealObject({}) === true) return null; return 'Null qiymat ob\\'yekt emas deb topilishi kerak!';"
    },
    {
      id: 3,
      title: "forEach Async Tuzog'i",
      instruction: "forEach asinxron ishlamasligini bilgan holda, berilgan urls massividagi har bir manzilni ketma-ket (sequential) fetch qiluvchi sequentialFetch funksiyasini for...of yordamida yozing.",
      startingCode: "async function sequentialFetch(urls, fetcher) {\n  // Kodni for...of yordamida yozing\n}\n",
      hint: "for (const url of urls) { await fetcher(url); }",
      test: "if (code.includes('for') && code.includes('await')) return null; return 'for...of va await ishlating';"
    },
    {
      id: 4,
      title: "Nested Object Copy (Shallow vs Deep)",
      instruction: "JSON.parse/JSON.stringify yoki boshqa deep copy usuli yordamida nested obyektni to'liq nusxalang, toki uning ichki qismini o'zgartirganda original o'zgarmasin.",
      startingCode: "function deepCopy(obj) {\n  // Kodni yozing\n}\n",
      hint: "return JSON.parse(JSON.stringify(obj));",
      test: "const orig = { a: { b: 1 } }; const cp = deepCopy(orig); cp.a.b = 2; if (orig.a.b === 1) return null; return 'Deep copy to\\'g\\'ri amalga oshmadi';"
    },
    {
      id: 5,
      title: "Massiv Mutation-siz Saralash",
      instruction: "Massivni o'zgartirmasdan, uning elementlarini o'sib borish tartibida saralangan yangi nusxasini qaytaruvchi safeSort funksiyasini yozing.",
      startingCode: "function safeSort(arr) {\n  // Kodni yozing\n}\n",
      hint: "return [...arr].sort((a,b) => a-b);",
      test: "const a = [3, 1, 2]; const res = safeSort(a); if (a[0] === 3 && res[0] === 1) return null; return 'Original massiv o\\'zgarmasligi shart';"
    },
    {
      id: 6,
      title: "Immutable Update",
      instruction: "User obyektini o'zgartirmagan holda, uning ichidagi 'role' qiymatini 'moderator' qilib yangilovchi va yangi obyekt qaytaruvchi updateUser funksiyasini yozing.",
      startingCode: "function updateUser(user) {\n  // Kodni yozing\n}\n",
      hint: "return { ...user, role: 'moderator' };",
      test: "const u = { name: 'Ali', role: 'user' }; const updated = updateUser(u); if (u.role === 'user' && updated.role === 'moderator') return null; return 'User ob\\'yekti o\\'zgarib ketdi yoki role yangilanmadi';"
    },
    {
      id: 7,
      title: "Closure in Loop (let fix)",
      instruction: "Berilgan loop-da var o'rniga let ishlatib, callbacks massividagi funksiyalar chaqirilganda har bir i qiymatini (0, 1, 2) to'g'ri qaytarishini ta'minlang.",
      startingCode: "function createCallbacks() {\n  const callbacks = [];\n  for (var i = 0; i < 3; i++) {\n    callbacks.push(function() {\n      return i;\n    });\n  }\n  return callbacks;\n}\n",
      hint: "var i o'rniga let i ishlating.",
      test: "const fns = createCallbacks(); if (fns[0]() === 0 && fns[2]() === 2) return null; return 'Loopda closure xato ishlayapti';"
    },
    {
      id: 8,
      title: "Safe NaN Check",
      instruction: "Berilgan qiymat NaN ekanini aniqlaydigan xavfsiz isItNaN funksiyasini yozing (NaN === NaN ishlamasligini yodda tuting).",
      startingCode: "function isItNaN(val) {\n  // Kodni yozing\n}\n",
      hint: "Number.isNaN(val)",
      test: "if (isItNaN(NaN) === true && isItNaN(5) === false) return null; return 'NaN qiymatni to\\'g\\'ri aniqlang';"
    },
    {
      id: 9,
      title: "this context binding",
      instruction: "Obyekt metodini callback qilib uzatganda this yo'qolishining oldini olish uchun greet metodini person obyektiga bind qiling.",
      startingCode: "const person = {\n  name: 'Ali',\n  greet() {\n    return 'Salom ' + this.name;\n  }\n};\nconst unboundGreet = person.greet;\n// bind yordamida bog'lang\nconst boundGreet = unboundGreet; \n",
      hint: "unboundGreet.bind(person)",
      test: "if (code.includes('bind') || (typeof boundGreet === 'function' && boundGreet() === 'Salom Ali')) return null; return 'greet metodini bind orqali bog\\'lang';"
    },
    {
      id: 10,
      title: "Fix Arrow Function this",
      instruction: "Quyidagi obyektda user.getName() ishlashi uchun uning arrow funksiya bo'lgan metodini oddiy funksiyaga o'zgartiring (Arrow funksiyalarda dynamic this yo'qligi sababli).",
      startingCode: "const user = {\n  name: 'Vali',\n  getName: () => {\n    return this.name;\n  }\n};\n",
      hint: "getName() { return this.name; } ko'rinishida yozing.",
      test: "if (!code.includes('=>')) return null; return 'Metodda arrow funksiyadan voz keching';"
    },
    {
      id: 11,
      title: "Array clear mutation danger",
      instruction: "Massivni yangi massivga bog'lamagan holda (chunki boshqa reference-lar bo'lishi mumkin), uning ichidagi barcha elementlarni xavfsiz va to'liq o'chirib tashlang.",
      startingCode: "function clearArray(arr) {\n  // Kodni yozing\n}\n",
      hint: "arr.length = 0;",
      test: "const list = [1, 2, 3]; const ref = list; clearArray(list); if (list.length === 0 && ref.length === 0) return null; return 'Massiv toliq tozalanmadi yoki reference buzildi';"
    },
    {
      id: 12,
      title: "Stale closure fix via object ref",
      instruction: "Callback ichida state o'zgaruvchisining eng yangi qiymatini o'qish uchun uni ref.current kabi obyekt ichida saqlang va callback ichida shu obyekt orqali o'qing.",
      startingCode: "function setupCallback(refObj) {\n  return function() {\n    // refObj.current ni qaytaring\n  };\n}\n",
      hint: "return refObj.current;",
      test: "const ref = { current: 1 }; const fn = setupCallback(ref); ref.current = 2; if (fn() === 2) return null; return 'Eski qiymat qaytarilmoqda, reference-dan o\\'qing';"
    },
    {
      id: 13,
      title: "Floating-point xatolarini to'g'rilash",
      instruction: "JavaScriptda floating-point sonlarni qo'shishda kelib chiqadigan xatolarni (masalan, `0.1 + 0.2` natijasi `0.30000000000000004` bo'lishini) bartaraf etuvchi va aniq yig'indini qaytaruvchi `safeAdd(a, b)` funksiyasini yozing.",
      startingCode: "function safeAdd(a, b) {\n  // a va b yig'indisini floating-point xatolarisiz qaytaring\n}",
      hint: "return parseFloat((a + b).toFixed(12));",
      test: "if (safeAdd(0.1, 0.2) === 0.3 && safeAdd(0.1, 0.7) === 0.8) return null;\nreturn 'safeAdd funksiyasi to\\'g\\'ri yig\\'indi qaytarmadi';"
    },
    {
      id: 14,
      title: "Obyektni chuqur muzlatish (Deep Freeze)",
      instruction: "Berilgan obyektni va uning barcha ichki nested obyektlarini rekursiv tarzda to'liq muzlatib (immutable), o'zgartirishlardan saqlovchi va xavfsiz qiluvchi `deepFreeze(obj)` funksiyasini yozing.",
      startingCode: "function deepFreeze(obj) {\n  // Obyekt va uning ichidagi barcha obyektlarni muzlating\n}",
      hint: "Object.freeze(obj);\nObject.keys(obj).forEach(key => {\n  if (typeof obj[key] === 'object' && obj[key] !== null) {\n    deepFreeze(obj[key]);\n  }\n});\nreturn obj;",
      test: "const o = { a: { b: 1 } };\ndeepFreeze(o);\nif (Object.isFrozen(o) && Object.isFrozen(o.a)) return null;\nreturn 'deepFreeze funksiyasi obyektni chuqur muzlatmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi solishtirish nima qaytaradi?\n```javascript\nconsole.log([] == ![]);\n```",
      options: ["true", "false", "TypeError", "undefined"],
      correctAnswer: 0,
      explanation: "![] false qaytaradi. Keyin [] == false taqqoslanadi. Ikkalasi ham songa o'girilib 0 == 0 ga aylanadi va natija true bo'ladi."
    },
    {
      id: 2,
      question: "JavaScriptda `typeof null` nima uchun 'object' qaytaradi?",
      options: [
        "Chunki null aslida obyektning bir turi hisoblanadi",
        "Bug - bu JavaScript tilining ilk versiyasidagi xato bo'lib, keyinchalik tizimlar buzilmasligi uchun to'g'rilanmagan",
        "Null xotirada eng ko'p joy oladigan ma'lumot turi bo'lgani uchun",
        "Bu ES6 spetsifikatsiyasida kiritilgan yangi qoida"
      ],
      correctAnswer: 1,
      explanation: "JS-ning dastlabki versiyasida qiymatlar turlari xotira bitlari bo'yicha aniqlangan. Obyektlar uchun oxirgi bitlar '000' bo'lgan, null qiymati ham hammasi '0' bo'lganligi sababli xatolik tufayli obyekt deb topilgan."
    },
    {
      id: 3,
      question: "Asinxron funksiyalar bilan ishlashda quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst arr = [1, 2, 3];\narr.forEach(async (num) => {\n  await new Promise(r => setTimeout(r, 100));\n  console.log(num);\n});\nconsole.log('Tugadi');\n```",
      options: [
        "1, 2, 3 va keyin 'Tugadi' chiqadi",
        "Avval 'Tugadi' chiqadi, keyin esa 100ms dan so'ng 1, 2, 3 chiqadi",
        "Kod xatolik berib to'xtaydi",
        "Faqat 'Tugadi' chiqadi, 1, 2, 3 chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "`forEach` asinxron callback-larni await qilmaydi. Shuning uchun u darhol ishga tushib, sinxron tarzda 'Tugadi'ni chiqaradi, callback va'dalari esa fonda bajarilib keyinroq natija beradi."
    },
    {
      id: 4,
      question: "Quyidagi kod bajarilgandan keyin `user` obyektining holati qanday bo'ladi?\n```javascript\nconst user = { name: 'Ali', details: { age: 25 } };\nconst copy = { ...user };\ncopy.details.age = 30;\n```",
      options: [
        "`user.details.age` qiymati 25 ligicha qoladi",
        "`user.details.age` qiymati 30 ga o'zgarib qoladi",
        "TypeError xatoligi yuz beradi",
        "`copy` obyekti butunlay nollanib ketadi"
      ],
      correctAnswer: 1,
      explanation: "Spread operatori (`...`) faqat 1-darajali (shallow) nusxa oladi. `details` ichki obyekti esa reference (ishora) bo'yicha nusxalanadi, shuning uchun `copy` orqali uni o'zgartirish `user`ga ham ta'sir qiladi."
    },
    {
      id: 5,
      question: "Massiv elementlarini o'zgartiradigan (mutating) metodni aniqlang.",
      options: ["`Array.prototype.slice()`", "`Array.prototype.concat()`", "`Array.prototype.splice()`", "`Array.prototype.map()`"],
      correctAnswer: 2,
      explanation: "`splice()` metodi original massiv tarkibini o'zgartiradi (elementlarni o'chiradi/qo'shadi). `slice`, `concat` va `map` esa original massivni o'zgartirmasdan har doim yangi massiv qaytaradi."
    },
    {
      id: 6,
      question: "Quyidagi kod tsikl tugagandan so'ng chaqirilganda nima chop etadi?\n```javascript\nconst list = [];\nfor (var i = 0; i < 3; i++) {\n  list.push(() => i);\n}\nconsole.log(list[0]());\n```",
      options: ["0", "1", "2", "3"],
      correctAnswer: 3,
      explanation: "`var` o'zgaruvchisi function/global scope bo'lgani uchun barcha callback funksiyalar bitta umumiy `i` o'zgaruvchisini closure qiladi. Tsikl tugagach, `i` qiymati `3` bo'ladi va barcha funksiyalar `3` qaytaradi."
    },
    {
      id: 7,
      question: "Obyekt metodini o'zgaruvchiga o'zlashtirib chaqirganda nima sodir bo'ladi?\n```javascript\nconst cat = {\n  sound: 'Meow',\n  makeSound() { return this.sound; }\n};\nconst speak = cat.makeSound;\nconsole.log(speak());\n```",
      options: ["'Meow'", "undefined", "TypeError", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Metod o'zgaruvchiga o'zlashtirilganda uning `this` konteksti yo'qoladi. Chaqirish vaqtida `speak()` global scope-da chaqirilgani uchun `this` global obyektga (yoki strict mode-da undefined-ga) ishora qilib `undefined` qaytaradi."
    },
    {
      id: 8,
      question: "Arrow funksiyalardagi `this` konteksti haqida qaysi fikr to'g'ri?",
      options: [
        "Arrow funksiyalarda `this` har doim global obyektga teng bo'ladi",
        "Arrow funksiyalar shaxsiy dynamic `this`ga ega emas, u yaratilgan vaqtdagi lexical (tashqi) context-dagi `this`ni oladi",
        "`bind()` yordamida arrow funksiyaning `this`ini istalgancha o'zgartirish mumkin",
        "Arrow funksiya ichida `this` ishlatilsa har doim sintaktik xato yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar shaxsiy `this` doirasiga ega emas va ularda `bind`, `call`, `apply` ishlamaydi. Ular har doim o'zi yozilgan lexical scope doirasidagi `this`ni ishlatishadi."
    },
    {
      id: 9,
      question: "Quyidagi taqqoslashlardan qaysi biri true natija beradi?",
      options: [
        "`NaN === NaN`",
        "`Object.is(NaN, NaN)`",
        "`null === undefined`",
        "`[] === []`"
      ],
      correctAnswer: 1,
      explanation: "`Object.is()` metodi ES6 da kiritilgan bo'lib, u `NaN`ni to'g'ri solishtiradi va `Object.is(NaN, NaN)` har doim `true` beradi. Qolgan solishtirishlar false beradi."
    },
    {
      id: 10,
      question: "Funksiyada `arguments` obyekti bilan ishlashda qaysi tuzoq mavjud?",
      options: [
        "U haqiqiy massiv emas (array-like), shuning uchun unda forEach yoki map metodlari mavjud emas",
        "U faqat arrow funksiyalarda ishlaydi",
        "U funksiyaga faqat bitta argument kelgandagina ishlaydi",
        "U xotirani to'liq nollab yuboradi"
      ],
      correctAnswer: 0,
      explanation: "`arguments` - bu funksiyaga uzatilgan barcha argumentlarni o'z ichiga olgan massivsimon obyekt (array-like), lekin u haqiqiy massiv emas. Massiv metodlarini ishlatish uchun uni `Array.from(arguments)` qilish kerak."
    },
    {
      id: 11,
      question: "Quyidagi kod bajarilgandan keyin `numbers` massivi qanday ko'rinishda bo'ladi?\n```javascript\nconst numbers = [1, 2, 3];\nnumbers.length = 1;\n```",
      options: [
        "[1, 2, 3] (hech narsa o'zgarmaydi)",
        "[1]",
        "[1, undefined, undefined]",
        "[] (bo'shab qoladi)"
      ],
      correctAnswer: 1,
      explanation: "Massivning `length` xususiyati nafaqat o'qish uchun, balki massivni qisqartirish uchun ham ishlatiladi. `length`ni kichik songa o'zgartirish massiv elementlarini o'chirib yuboradi."
    },
    {
      id: 12,
      question: "Quyidagi kod konsolga nima chop etadi?\n```javascript\nconsole.log(typeof typeof null);\n```",
      options: ["'object'", "'null'", "'string'", "'undefined'"],
      correctAnswer: 2,
      explanation: "`typeof null` qiymati `'object'` (string) qaytaradi. Keyin `'object'` matniga typeof qo'llanilganda u string bo'lganligi sababli `'string'` natijasi chiqadi."
    },
    {
      id: 13,
      question: "Floating-point (suzuvchi nuqtali) sonlar bilan ishlashda 0.1 + 0.2 === 0.3 ifodasi nega false qaytaradi?",
      options: [
        "Chunki JavaScript sonlarni 2 lik sanoq tizimida (binary IEEE 754 standarti) saqlaydi, ba'zi o'nlik kasrlar binary tizimda cheksiz davriy kasr bo'lib qoladi va natijada kichik yaxlitlash xatoligi yuz beradi",
        "Chunki JS sonlarni faqat satr (string) ko'rinishida saqlaydi",
        "Chunki 0.1 va 0.2 primitiv sonlar emas",
        "Chunki JavaScriptda 0.3 degan qiymat mavjud emas"
      ],
      correctAnswer: 0,
      explanation: "V8 dvigateli barcha sonlarni IEEE 754 double-precision standardida saqlaydi. 0.1 va 0.2 ni binary ko'rinishga o'tkazganda cheksiz davriy kasr hosil bo'ladi va yaxlitlash natijasida 0.1 + 0.2 = 0.30000000000000004 bo'lib qoladi."
    },
    {
      id: 14,
      question: "Object.freeze() va biz yozgan deepFreeze() funksiyalari o'rtasidagi asosiy farq nima?",
      options: [
        "Object.freeze() faqat sayoz (shallow) muzlatadi (ichki obyektlar o'zgarishi mumkin), deepFreeze() esa ichki obyektlarni ham rekursiv muzlatib, ularni ham o'zgarishlardan to'liq himoya qiladi",
        "Object.freeze() faqat massivlarda, deepFreeze() esa obyektlarda ishlaydi",
        "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi",
        "Object.freeze() xotirani tozalaydi, deepFreeze() esa xotirani band qiladi"
      ],
      correctAnswer: 0,
      explanation: "Object.freeze() faqat obyektning birinchi darajali xossalarini muzlatadi. Ichki obyektlar (nested properties) o'zgarishi mumkin. deepFreeze() esa rekursiv ravishda obyekt ichidagi barcha obyektlarni ham muzlatadi."
    }
  ]
};
