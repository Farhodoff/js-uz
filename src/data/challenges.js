export const challenges = [
  {
    id: "str-manipulation-1",
    title: "Murakkab satr va massiv metodlari",
    difficulty: "medium",
    category: "arrays",
    code: `const str = "  Hello, World!  ";

const result = str
  .trim()
  .split(", ")
  .map((word, i) => {
    return i === 0
      ? word.toUpperCase()
      : word.replace(/!\$/, "").split("").reverse().join("") + "?";
  })
  .join(" | ");

const [first, ...rest] = result.split(" | ");
const final = \`\${first} | \${rest.join(" & ")}\`;

console.log(final);`,
    options: [
      "HELLO | World!?",
      "HELLO | dlroW?",
      "  HELLO  | dlroW!?",
      "HELLO | !dlroW?"
],
    correctAnswer: "HELLO | dlroW?",
    explanation: `**Qadam-baqadam tahlil:**
1. \`str.trim()\` satr boshidagi va oxiridagi bo'shliqlarni olib tashlaydi: \`"Hello, World!"\`.
2. \`.split(", ")\` satrni vergul va bo'shliq bo'yicha massivga ajratadi: \`["Hello", "World!"]\`.
3. \`.map()\` har bir elementni o'zgartiradi:
   - Birinchi element uchun (\`i === 0\`): \`"Hello"\` katta harflarga o'tadi -> \`"HELLO"\`.
   - Ikkinchi element uchun (\`i === 1\`): \`word.replace(/!\$/, "")\` oxiridagi \`!\` belgisini o'chiradi -> \`"World"\`. Keyin \`.split("").reverse().join("")\` yordamida teskari o'giriladi -> \`"dlroW"\`. Yakunda unga \`"?"\` qo'shiladi -> \`"dlroW?"\`.
   - Natijada massiv: \`["HELLO", "dlroW?"]\`.
4. \`.join(" | ")\` massivni satrga birlashtiradi: \`"HELLO | dlroW?"\`.
5. \`const [first, ...rest] = result.split(" | ")\` satrni \`" | "\` orqali bo'ladi va destructuring (qismlarga ajratish) qiladi:
   - \`first\` = \`"HELLO"\`
   - \`rest\` = \`["dlroW?"]\`
6. \`rest.join(" & ")\` massivda faqat bitta element bo'lgani uchun shunchaki \`"dlroW?"\` ni qaytaradi.
7. Yakuniy satr \`\${first} | \${rest.join(" & ")}\` ko'rinishida yig'iladi va natija: \`"HELLO | dlroW?"\` bo'ladi.`
  },
  {
    id: "hoisting-1",
    title: "O'zgaruvchilar va funksiyalar Hoistingi",
    difficulty: "easy",
    category: "scope",
    code: `var x = 10;
function test() {
  console.log(x);
  var x = 20;
  console.log(x);
}
test();`,
    options: [
      "10 va 20",
      "undefined va 20",
      "ReferenceError va 20",
      "10 va undefined"
],
    correctAnswer: "undefined va 20",
    explanation: `**Qadam-baqadam tahlil:**
1. JavaScript-da \`var\` yordamida e'lon qilingan o'zgaruvchilar o'zining funktsional doirasi (scope) tepasiga olib chiqiladi (**hoisting**).
2. \`test()\` funksiyasi ichida \`var x = 20;\` e'lon qilingan. Hoisting tufayli bu xuddi quyidagidek talqin qilinadi:
   \`\`\`javascript
   function test() {
     var x; // x e'lon qilindi, qiymati undefined
     console.log(x); // undefined chiqadi
     x = 20; // x ga qiymat berildi
     console.log(x); // 20 chiqadi
   }
   \`\`\`
3. Shuning uchun birinchi konsol \`undefined\`, ikkinchisi esa \`20\` ni chiqaradi.`
  },
  {
    id: "closure-setTimeout",
    title: "Sikl ichida let vs var va asinxronlik",
    difficulty: "medium",
    category: "async",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 1);
}`,
    options: [
      "0, 1, 2 keyin 0, 1, 2",
      "3, 3, 3 keyin 0, 1, 2",
      "3, 3, 3 keyin 3, 3, 3",
      "0, 1, 2 keyin 3, 3, 3"
],
    correctAnswer: "3, 3, 3 keyin 0, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. **Birinchi sikl (\`var i\`):** \`var\` kalit so'zi blokli doiraga (block scope) ega emas, balki funksiyaviy/global doiraga ega. \`setTimeout\` asinxron kod bo'lib, uning ichidagi funksiya sikl to'liq aylanib bo'lingach ishga tushadi. Sikl tugaganda global \`i\` ning qiymati \`3\` bo'ladi. Uchala taymer ham bitta global \`i\` o'zgaruvchisiga ishora qilgani uchun ekranga uch marta \`3\` chiqadi.
2. **Ikkinchi sikl (\`let j\`):** \`let\` kalit so'zi blokli doiraga (block scope) ega. Siklning har bir iteratsiyasi (aylanishi) uchun alohida, mustaqil \`j\` o'zgaruvchisi yaratiladi. Har bir \`setTimeout\` o'zining iteratsiyasidagi o'sha \`j\` qiymatini (mos ravishda \`0\`, \`1\` va \`2\`) saqlab qoladi (closure yaratadi).
3. Natijada avval uchta \`3\`, keyin esa \`0, 1, 2\` ketma-ket chiqadi.`
  },
  {
    id: "this-arrow",
    title: "this kalit so'zi va Arrow funksiyalar",
    difficulty: "medium",
    category: "objects",
    code: `const obj = {
  name: "JS-UZ",
  getName1: function() {
    return this.name;
  },
  getName2: () => {
    return this.name;
  }
};
console.log(obj.getName1());
console.log(obj.getName2());`,
    options: [
      "JS-UZ va JS-UZ",
      "JS-UZ va undefined",
      "undefined va JS-UZ",
      "JS-UZ va TypeError"
],
    correctAnswer: "JS-UZ va undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. \`getName1\` — bu oddiy funksiya (regular function). Oddiy funksiyalarda \`this\` kalit so'zi funksiya qaysi ob'ekt ustida chaqirilganiga bog'liq bo'ladi. Uni \`obj.getName1()\` deb chaqirganimiz uchun \`this\` ob'ektning o'ziga (\`obj\`) teng va \`this.name\` bizga \`"JS-UZ"\` ni qaytaradi.
2. \`getName2\` — bu arrow funksiya (o'q funksiya). Arrow funksiyalarda o'zining shaxsiy \`this\` konteksti bo'lmaydi. Ular \`this\` ni o'zi yozilgan tashqi o'rab turgan muhitdan (lexical scope) oladi. Ob'ektning o'zi (\`obj\`) yangi scope yaratmaydi, shuning uchun tashqi muhit global ob'ekt hisoblanadi (brauzerda \`window\`, Node.js da esa bo'sh ob'ekt). Global doirada esa \`name\` o'zgaruvchisi yo'q, shuning uchun \`undefined\` qaytadi.`
  },
  {
    id: "event-loop",
    title: "Event Loop: Microtasks va Macrotasks",
    difficulty: "hard",
    category: "async",
    code: `console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");`,
    options: [
      "Start -> Timeout -> Promise -> End",
      "Start -> End -> Timeout -> Promise",
      "Start -> End -> Promise -> Timeout",
      "Start -> Promise -> Timeout -> End"
],
    correctAnswer: "Start -> End -> Promise -> Timeout",
    explanation: `**Qadam-baqadam tahlil:**
1. JavaScript sinxron kodlarni navbatma-navbat Call Stack-da bajaradi. Shuning uchun birinchi bo'lib \`Start\` va kod oxiridagi \`End\` sinxron ravishda ekranga chiqadi.
2. Asinxron operatsiyalar navbatga qo'yiladi:
   - \`setTimeout\` callback funksiyasi **Macrotask Queue** (Makrotasklar navbati) ga joylashadi.
   - \`Promise.resolve().then()\` callback funksiyasi **Microtask Queue** (Mikrotasklar navbati) ga joylashadi.
3. Event Loop qoidasiga ko'ra, Call Stack bo'shagach, birinchi bo'lib barcha mikrotasklar bajariladi, so'ngra navbat makrotasklarga beriladi.
4. Shuning uchun, Call Stack bo'shagach, mikrotask bo'lgan \`Promise\` ishga tushadi, eng oxirida esa makrotask bo'lgan \`Timeout\` bajariladi.
5. Yakuniy tartib: \`Start\` -> \`End\` -> \`Promise\` -> \`Timeout\`.`
  },
  {
    id: "coercion-1",
    title: "JavaScript-da tiplarni avtomatik o'zgartirish",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1 + "2" - 1);
console.log([] == ![]);`,
    options: [
      "11 va false",
      "12 va true",
      "11 va true",
      "12 va false"
],
    correctAnswer: "11 va true",
    explanation: `**Qadam-baqadam tahlil:**
1. \`1 + "2"\` ifodasi: JavaScript-da son va satr qo'shilsa (\`+\`), son satrga aylantiriladi va birlashtiriladi (concatenation). Natija: \`"12"\`.
2. Keyin \`"12" - 1\` bajariladi. Ayirish (\`-\`) operatori faqat sonlar bilan ishlaydi, shuning uchun \`"12"\` satri songa aylantirilagi va \`12 - 1 = 11\` bo'ladi.
3. \`[] == ![]\` ifodasi:
   - Birinchi bo'lib inkor operatori (\`!\`) bajariladi. Bo'sh massiv \`[]\` truthy (haqiqiy) qiymat hisoblanadi. Uni inkor etsak (\`![]\`), \`false\` ga aylanadi. Endi ifoda: \`[] == false\`.
   - JavaScript taqqoslash (\`==\`) paytida turlarni o'zgartiradi. Bo'sh massiv songa aylantirilganda \`0\` bo'ladi. \`false\` ham songa aylantirilganda \`0\` bo'ladi.
   - Natijada \`0 == 0\` bo'lib qoladi, bu esa \`true\` ni qaytaradi.`
  },
  {
    id: "reference-1",
    title: "Obyektlarning xotiradagi manzili (Reference)",
    difficulty: "easy",
    category: "objects",
    code: `const a = { x: 1 };
const b = a;
b.x = 2;
const c = { x: 2 };
console.log(a.x === b.x, a === c);`,
    options: [
      "true va true",
      "false va false",
      "true va false",
      "false va true"
],
    correctAnswer: "true va false",
    explanation: `**Qadam-baqadam tahlil:**
1. JavaScript-da primitiv bo'lmagan turlar (obyektlar, massivlar) xotirada qiymat emas, balki referens (manzil) orqali saqlanadi va uzatiladi.
2. \`const b = a;\` yozganimizda, biz \`a\` nusxasining xotiradagi manzilini \`b\` ga nusxaladik. Endi ikkala o'zgaruvchi ham bitta obyektga ishora qiladi.
3. Shuning uchun \`b.x = 2;\` o'zgartirilsa, \`a.x\` ning qiymati ham \`2\` ga o'zgaradi (\`a.x === b.x\` -> \`2 === 2\` ya'ni \`true\`).
4. \`const c = { x: 2 };\` yozganda esa, xotirada mutlaqo yangi manzilga ega yangi obyekt yaratiladi. Garchi uning ichidagi qiymat ham \`x: 2\` bo'lsa-da, xotiradagi manzillari har xil bo'lgani uchun \`a === c\` taqqoslaganda \`false\` qaytaradi.`
  },
  {
    id: "map-foreach",
    title: "Array.prototype.map vs forEach",
    difficulty: "easy",
    category: "arrays",
    code: `const arr = [1, 2, 3];
const double = arr.map(x => x * 2);
const each = arr.forEach(x => x * 2);
console.log(double, each);`,
    options: [
      "[2, 4, 6] va [2, 4, 6]",
      "[2, 4, 6] va undefined",
      "undefined va [2, 4, 6]",
      "[2, 4, 6] va []"
],
    correctAnswer: "[2, 4, 6] va undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. \`arr.map()\` metodi massivning har bir elementiga funksiyani qo'llaydi va har bir elementdan qaytgan yangi qiymatlardan iborat **yangi massiv** hosil qiladi. Shuning uchun \`double\` massivi \`[2, 4, 6]\` bo'ladi.
2. \`arr.forEach()\` metodi esa shunchaki massiv elementlarini aylanib chiqish uchun ishlatiladi va o'zidan hech qanday qiymat qaytarmaydi (sukut bo'yicha \`undefined\` qaytaradi). Uning ichidagi \`return x * 2\` hech qayerga saqlanmaydi. Shuning uchun \`each\` ning qiymati \`undefined\` bo'ladi.`
  },
  {
    id: "strict-mode",
    title: "Qat'iy rejim (Strict Mode) xususiyatlari",
    difficulty: "medium",
    category: "basics",
    code: `"use strict";
function init() {
  message = "Salom Dunyo";
  console.log(message);
}
init();`,
    options: [
      "Salom Dunyo",
      "undefined",
      "ReferenceError",
      "TypeError"
],
    correctAnswer: "ReferenceError",
    explanation: `**Qadam-baqadam tahlil:**
1. Koddagi \`"use strict";\` qatori JavaScript-ni qat'iy rejimda (Strict Mode) ishlashga majbur qiladi.
2. Strict Mode-ning eng asosiy qoidalaridan biri — o'zgaruvchilarni e'lon qilmasdan (\`let\`, \`const\` yoki \`var\` ishlatmasdan) ulardan foydalanishni taqiqlashdir.
3. \`message = "Salom Dunyo"\` qatorida \`message\` o'zgaruvchisi e'lon qilinmagan.
4. Agar qat'iy rejim bo'lmaganida, JS uni avtomatik ravishda global o'zgaruvchi qilib yaratgan bo'lardi. Lekin Strict Mode-da bu holat xatolik deb hisoblanadi va brauzer yoki Node.js tomonidan \`ReferenceError\` xatoligi yuzaga keladi.`
  },
  {
    id: "freeze-strict",
    title: "Object.freeze va Massiv mutatsiyasi",
    difficulty: "medium",
    category: "objects",
    code: `"use strict";
const numbers = [1, 2, 3];
Object.freeze(numbers);
numbers[0] = 99;
console.log(numbers);`,
    options: [
      "[99, 2, 3]",
      "[1, 2, 3]",
      "TypeError",
      "SyntaxError"
],
    correctAnswer: "TypeError",
    explanation: ``
  },
  {
    id: "tg-create-module",
    title: "Closure, IIFE va WeakMap bilan ishlash",
    difficulty: "hard",
    category: "scope",
    code: `const createModule = (() => {
  const privateCache = new WeakMap();

  return function(name) {
    const state = { name, version: 1, active: true };
    privateCache.set(state, { accessCount: 0 });

    return {
      getInfo() {
        const meta = privateCache.get(state);
        meta.accessCount++;
        return \`\${state.name}@v\${state.version}\`;
      },
      getAccessCount() {
        return privateCache.get(state).accessCount;
      },
      upgrade() {
        state.version++;
        return this;
      }
    };
  };
})();

const mod = createModule("auth");
mod.upgrade().upgrade();
console.log(mod.getInfo());
console.log(mod.getAccessCount());`,
    options: [
      "auth@v3 va 1",
      "auth@v1 va 1",
      "auth@v3 va 0",
      "auth@v2 va 2"
],
    correctAnswer: "auth@v3 va 1",
    explanation: `**Qadam-baqadam tahlil:**
1. \`createModule\` — bu darhol ishga tushuvchi funksiya (IIFE). U bitta global \`WeakMap\` obyektini (\`privateCache\`) yaratadi va yangi funksiya qaytaradi.
2. \`const mod = createModule("auth")\` chaqirilganda:
   - \`state\` obyekti yaratiladi: \`{ name: "auth", version: 1, active: true }\`.
   - \`privateCache\` ga \`state\` kaliti bilan \`{ accessCount: 0 }\` qiymati saqlanadi.
   - Obyekt qaytariladi: ichida \`getInfo\`, \`getAccessCount\` va \`upgrade\` metodlari bor.
3. \`mod.upgrade().upgrade()\` chaqirilishi zanjir (chaining) usulida ishlaydi:
   - Birinchi \`upgrade()\` metodida \`state.version\` 1 dan 2 ga oshadi va \`this\` (ya'ni \`mod\` obyekti) qaytariladi.
   - Ikkinchi \`upgrade()\` metodida \`state.version\` 2 dan 3 ga oshadi.
4. \`mod.getInfo()\` chaqirilganda:
   - \`privateCache\` dan \`state\` uchun bog'langan ma'lumot olinadi va \`accessCount\` qiymati 1 taga oshadi (\`accessCount\`: 1).
   - Bizga \`"auth@v3"\` satri qaytadi va konsolga chiqariladi.
5. \`mod.getAccessCount()\` chaqirilganda:
   - \`privateCache\` dan \`accessCount\` olinadi, uning hozirgi qiymati \`1\` ga teng.
6. Natijada konsolga \`auth@v3\` va \`1\` chiqadi.`
  },
  {
    id: "tg-map-reverse",
    title: "Satrni bo'lish, o'zgartirish va teskari o'girish",
    difficulty: "medium",
    category: "arrays",
    code: `const str = "JavaScript is Awesome!";

const result = str
  .split(" ")
  .map((word, i) => 
    i % 2 === 0
      ? word.toUpperCase()
      : word.toLowerCase()
  )
  .join("-");

const reversed = result
  .split("")
  .reduce((acc, char) => char + acc, "");

console.log(reversed);`,
    options: [
      "!EMOSEWA-si-TPIRCSAVAJ",
      "!EMOSEWA-si-javascript",
      "JAVASCRIPT-is-AWESOME!",
      "!awesome-si-JAVASCRIPT"
],
    correctAnswer: "!EMOSEWA-si-TPIRCSAVAJ",
    explanation: `**Qadam-baqadam tahlil:**
1. \`str.split(" ")\` bo'shliq bo'yicha satrni massivga ajratadi: \`["JavaScript", "is", "Awesome!"]\`.
2. \`.map()\` har bir elementni o'zgartiradi:
   - \`i === 0\` (juft indeks): \`"JavaScript"\` katta harfga o'tadi -> \`"JAVASCRIPT"\`.
   - \`i === 1\` (toq indeks): \`"is"\` kichik harfga o'tadi -> \`"is"\`.
   - \`i === 2\` (juft indeks): \`"Awesome!"\` katta harfga o'tadi -> \`"AWESOME!"\`.
3. \`.join("-")\` ularni chiziqcha bilan birlashtiradi: \`"JAVASCRIPT-is-AWESOME!"\`.
4. \`reversed\` qismida: \`result.split("")\` belgilar massivini hosil qiladi va \`.reduce((acc, char) => char + acc, "")\` yordamida har bir yeni belgi to'plangan qiymatning boshiga qo'shiladi. Bu satrni teskari tartibda yig'ish (reverse) hisoblanadi.
5. Natija: \`"!EMOSEWA-si-TPIRCSAVAJ"\` bo'ladi.`
  },
  {
    id: "tg-async-generator",
    title: "Async Generators va Promise.all concurrent navbati",
    difficulty: "hard",
    category: "async",
    code: `const delay = (ms, val) => new Promise(res => setTimeout(res, ms, val));

async function* asyncGen() {
  yield await delay(10, "alpha");
  yield await delay(10, "beta");
  yield await delay(10, "gamma");
}

async function run() {
  const results = [];

  const gen = asyncGen();
  const [first, , third] = await Promise.all([
    gen.next(),
    gen.next(),
    gen.next()
  ]);

  results.push(first.value, third.value);

  const p1 = Promise.resolve("x").then(v => v + "1");
  const p2 = Promise.reject("err").catch(e => e + "2");

  results.push(...(await Promise.all([p1, p2])));
  console.log(results);
}

run();`,
    options: [
      "['alpha', 'gamma', 'x1', 'err2']",
      "['alpha', 'beta', 'x1', 'err2']",
      "['alpha', 'gamma', 'x', 'err']",
      "TypeError: gen.next is not a function"
],
    correctAnswer: "['alpha', 'gamma', 'x1', 'err2']",
    explanation: `**Qadam-baqadam tahlil:**
1. \`asyncGen\` asinxron generator hisoblanadi. Unda har safar \`yield\` chaqirilganda \`delay\` funksiyasi yordamida qiymatlar asinxron kutiladi.
2. \`Promise.all([gen.next(), gen.next(), gen.next()])\` chaqirilganda uchta \`next()\` va'dalari parallel ishga tushadi:
   - Birinchi \`gen.next()\` birinchi \`yield\`ni qaytaradi: \`{ value: "alpha", done: false }\`.
   - Ikkinchi \`gen.next()\` ikkinchi \`yield\`ni qaytaradi: \`{ value: "beta", done: false }\`.
   - Uchinchisi esa \`{ value: "gamma", done: false }\` ni qaytaradi.
3. \`const [first, , third] = await Promise.all(...)\` asinxron natijalarni destructuring (qismlarga ajratish) qiladi:
   - \`first\` = \`{ value: "alpha", done: false }\`
   - Ikkinchi element (beta) tashlab ketiladi.
   - \`third\` = \`{ value: "gamma", done: false }\`.
4. \`results.push(first.value, third.value)\` natijasida \`results\` massivi \`["alpha", "gamma"]\` ko'rinishiga keladi.
5. Keyin asinxron \`p1\` (\`"x1"\` qaytaradi) va xatolikni ushlab oluvchi \`p2\` (\`"err2"\` qaytaradi) parallel \`Promise.all\` orqali kutiladi.
6. \`results\` massiviga ular ham qo'shiladi va yakuniy natija: \`['alpha', 'gamma', 'x1', 'err2']\` chiqadi.`
  },
  {
    id: "tg-tagged-templates",
    title: "Tagged Template Literals va reduce o'zgarishi",
    difficulty: "medium",
    category: "basics",
    code: `const tag = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    const transformed =
      typeof value === "number" ? \`[\${value ** 2}]\` : \`{\${value}}\`;
    return result + transformed + str;
  });
};

const name = "Sofia";
const score = 4;
const level = "gold";

const output = tag\`Player: \${name}, Score: \${score}, Rank: \${level}\`;
console.log(output);`,
    options: [
      "Player: {Sofia}, Score: [16], Rank: {gold}",
      "Player: Sofia, Score: 16, Rank: gold",
      "Player: {Sofia}, Score: {4}, Rank: {gold}",
      "TypeError: Cannot reduce empty array"
],
    correctAnswer: "Player: {Sofia}, Score: [16], Rank: {gold}",
    explanation: `**Qadam-baqadam tahlil:**
1. Kodda **Tagged Template Literal** (yorliqli shablon) ishlatilmoqda. \`tag\` funksiyasi shablon ichidagi matn qismlari (\`strings\`) va u yerga kiritilgan o'zgaruvchilar qiymatlarini (\`values\`) qabul qiladi:
   - \`strings\` = \`["Player: ", ", Score: ", ", Rank: ", ""]\`
   - \`values\` = \`["Sofia", 4, "gold"]\`
2. \`strings.reduce\` orqali bu qismlar birlashtiriladi:
   - \`strings.reduce\` ikkinchi argumenti bo'lmagani uchun birinchi qadamda \`result\` birinchi elementga teng bo'ladi: \`result = "Player: "\`, \`i = 1\`.
   - \`i = 1\` uchun: \`value = values[0]\` (ya'ni \`"Sofia"\`). Satr bo'lgani uchun u \`"{Sofia}"\` ga o'zgaradi. \`result = "Player: " + "{Sofia}" + ", Score: "\`.
   - \`i = 2\` uchun: \`value = values[1]\` (ya'ni \`4\`). Son bo'lgani uchun u \`[values[1] ** 2]\` ya'ni \`[16]\` ga o'zgaradi. \`result = "Player: {Sofia}, Score: " + "[16]" + ", Rank: "\`.
   - \`i = 3\` uchun: \`value = values[2]\` (ya'ni \`"gold"\`). Satr bo'lgani uchun u \`"{gold}"\` ga o'zgaradi. Yakuniy natija yig'iladi.
3. Natijada konsolga: \`Player: {Sofia}, Score: [16], Rank: {gold}\` chiqadi.`
  },
  {
    id: "tg-computed-properties",
    title: "Computed Property Keys va this konteksti",
    difficulty: "medium",
    category: "objects",
    code: `const prefix = "get";
const suffix = "Name";

const registry = {
  [\`\${prefix}Full\${suffix}\`]: function () {
    return \`\${this.first} \${this.last}\`;
  },
  [\`\${prefix}Short\${suffix}\`]: function () {
    return this.first[0] + ". " + this.last;
  },
};

const person = {
  first: "Leonardo",
  last: "Fibonacci",
  ...registry,
};

const key = ["Full", "Short"][1];
console.log(person[\`\${prefix}\${key}\${suffix}\`]());`,
    options: [
      "L. Fibonacci",
      "Leonardo Fibonacci",
      "undefined undefined",
      "TypeError: person[...] is not a function"
],
    correctAnswer: "L. Fibonacci",
    explanation: `**Qadam-baqadam tahlil:**
1. \`registry\` obyektida hisoblanadigan kalitlar (computed property keys) ishlatilgan:
   - \`[\`\${prefix}Full\${suffix}\`]\` kaliti \`"getFullName"\` metodiga aylanadi.
   - \`[\`\${prefix}Short\${suffix}\`]\` kaliti \`"getShortName"\` metodiga aylanadi.
2. \`person\` obyekti yaratilib, unga \`first\`, \`last\` va \`registry\` ichidagi metodlar spread (\`...\`) operatori orqali nusxalanadi.
3. \`const key = ["Full", "Short"][1]\` qatori \`key\` o'zgaruvchisiga \`"Short"\` qiymatini beradi.
4. Oxirgi qatorda: \`person[\`\${prefix}\${key}\${suffix}\`]()\` ifodasi \`person["getShortName"]()\` ni chaqiradi.
5. Ushbu metod oddiy funksiya bo'lgani uchun uning ichidagi \`this\` ob'ektning o'ziga (\`person\`) ishora qiladi.
6. \`this.first[0]\` bizga \`"Leonardo"\` ning birinchi harfi \`"L"\` ni beradi, unga \`". "\` va \`this.last\` (ya'ni \`"Fibonacci"\`) qo'shilib, natijada \`"L. Fibonacci"\` ekranga chiqadi.`
  },
  {
    id: "tg-freeze-seal",
    title: "Object.freeze vs Object.seal va sayoz muzlatish",
    difficulty: "hard",
    category: "objects",
    code: `const config = {
  db: { host: "localhost", port: 5432 },
  cache: { ttl: 300 },
};

Object.freeze(config);

config.debug = true;
config.db.port = 9999;
config.cache = { ttl: 600 };

const sealed = Object.seal({ version: "1.0", meta: { build: 42 } });

sealed.version = "2.0";
sealed.author = "devteam";
sealed.meta.build = 99;

console.log(
  config.debug,
  config.db.port,
  config.cache.ttl,
  sealed.version,
  sealed.author,
  sealed.meta.build
);`,
    options: [
      "undefined 9999 300 2.0 undefined 99",
      "true 5432 300 1.0 undefined 42",
      "undefined 5432 600 2.0 devteam 99",
      "TypeError: Cannot assign to read only property"
],
    correctAnswer: "undefined 9999 300 2.0 undefined 99",
    explanation: `**Qadam-baqadam tahlil:**
1. \`Object.freeze(config)\` obyektni muzlatadi (yangi xossa qo'shib bo'lmaydi, borini o'zgartirib bo'lmaydi). Lekin bu **sayoz (shallow)** ishlaydi, ya'ni ichki obyektlarga ta'sir qilmaydi:
   - \`config.debug = true;\` bajarilmaydi (Strict mode-dan tashqarida xatosiz o'tib ketadi, debug \`undefined\` bo'lib qoladi).
   - \`config.db.port = 9999;\` muvaffaqiyatli o'zgaradi, chunki \`config.db\` ichki obyekti muzlatilmagan!
   - \`config.cache = { ttl: 600 };\` bajarilmaydi, chunki tashqi \`config\` ning o'zi muzlatilgan. Shuning uchun \`cache.ttl\` qiymati \`300\` bo'lib qolaveradi.
2. \`Object.seal(...)\` esa obyektni muhrlaydi (yangi xossalar qo'shish taqiqlanadi, lekin bor xossalarni o'zgartirish mumkin):
   - \`sealed.version = "2.0";\` o'zgaradi (chunki mavjud xossa).
   - \`sealed.author = "devteam";\` bajarilmaydi (yangi xossa bo'lgani uchun).
   - \`sealed.meta.build = 99;\` o'zgaradi, chunki \`meta\` ichki obyekti muhrlanmagan.
3. Natijada konsolga mos ravishda: \`undefined 9999 300 2.0 undefined 99\` chiqadi.`
  },
  {
    id: "tg-3206",
    title: "JS Challenge #3206",
    difficulty: "medium",
    category: "basics",
    code: `function processData(value) {  let result = "start";  try {    result += " -> try";    if (value === null) throw new TypeError("Null value");    if (value < 0) throw new RangeError("Negative value");    result += " -> success";    return result;  } catch (e) {    result += \` -> catch(\${e.constructor.name})\`;    return result;  } finally {    result += " -> finally";    console.log(result);  }}console.log(processData(null));`,
    options: [
      "start -> try -> catch(TypeError) start -> try -> catch(TypeError) -> finally",
      "start -> try -> success -> finally start -> try -> success",
      "start -> try -> catch(TypeError) -> finally start -> try -> catch(TypeError)",
      "start -> try -> finally start -> try -> catch(TypeError)"
],
    correctAnswer: "start -> try -> catch(TypeError) -> finally start -> try -> catch(TypeError)",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3206).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start -> try -> catch(TypeError) -> finally
start -> try -> catch(TypeError)\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3209",
    title: "JS Challenge #3209",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment() { count++; },    decrement() { count--; },    getCount() { return count; },    reset: () => { count = 0; }  };}const counter = createCounter();counter.increment();counter.increment();counter.increment();counter.decrement();const { getCount, reset } = counter;console.log(counter.getCount());reset();console.log(getCount());`,
    options: [
      "undefined 0",
      "2 1",
      "2 0",
      "3 0"
],
    correctAnswer: "2 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3209).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3211",
    title: "JS Challenge #3211",
    difficulty: "medium",
    category: "basics",
    code: `class Pipeline {  #value;  #log = [];  constructor(value) {    this.#value = value;  }  map(fn) {    this.#value = fn(this.#value);    this.#log.push(\`map:\${this.#value}\`);    return this;  }  filter(fn) {    if (Array.isArray(this.#value)) {      this.#value = this.#value.filter(fn);      this.#log.push(\`filter:\${this.#value}\`);    }    return this;  }  reduce(fn, init) {    if (Array.isArray(this.#value)) {      this.#value = this.#value.reduce(fn, init);      this.#log.push(\`reduce:\${this.#value}\`);    }    return this;  }  result() {    console.log(this.#log.join(' | '));    return this.#value;  }}new Pipeline([1, 2, 3, 4, 5, 6])  .filter(n => n % 2 === 0)  .map(arr => arr.map(n => n ** 2))  .reduce((acc, n) => acc + n, 0)  .result();`,
    options: [
      "filter:2,4,6 | map:4,16,36 | reduce:56",
      "filter:2,4,6 | map:4,16,36 | reduce:52",
      "filter:1,3,5 | map:1,9,25 | reduce:35",
      "map:4,16,36 | filter:2,4,6 | reduce:56"
],
    correctAnswer: "filter:2,4,6 | map:4,16,36 | reduce:56",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3211).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`filter:2,4,6 | map:4,16,36 | reduce:56\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3214",
    title: "JS Challenge #3214",
    difficulty: "medium",
    category: "basics",
    code: `const name = "Taylor";const age = 28;const role = "engineer";const user = {  name,  age,  role,  greet() {    return \`Hi, I'm \${this.name}, age \${this.age}\`;  },  get info() {    return \`\${this.role.toUpperCase()} @ \${this.age}\`;  }};const { name: userName, info, greet } = user;console.log(userName);console.log(info);console.log(greet.call({ name: "Jordan", age: 35 }));`,
    options: [
      "Taylor ENGINEER @ 28 Hi, I'm Taylor, age 28",
      "Taylor ENGINEER @ 28 Hi, I'm Jordan, age 35",
      "Taylor engineer @ 28 Hi, I'm Jordan, age 35",
      "undefined ENGINEER @ 28 Hi, I'm Jordan, age 35"
],
    correctAnswer: "Taylor ENGINEER @ 28 Hi, I'm Jordan, age 35",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3214).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Taylor
ENGINEER @ 28
Hi, I'm Jordan, age 35\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3217",
    title: "JS Challenge #3217",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get(target, prop, receiver) {    if (prop in target) {      const value = Reflect.get(target, prop, receiver);      return typeof value === "number" ? value * 2 : value;    }    return \`Property "\${prop}" not found\`;  },  set(target, prop, value) {    if (typeof value !== "number") {      throw new TypeError("Only numbers allowed");    }    Reflect.set(target, prop, value ** 2);    return true;  },  has(target, prop) {    return prop.startsWith("_") ? false : prop in target;  },};const store = new Proxy({ _secret: 99, score: 5 }, handler);store.level = 3;console.log(store.score);console.log(store.level);console.log("_secret" in store);console.log("score" in store);console.log(store._secret);`,
    options: [
      "10 18 false true 198",
      "5 9 false true 198",
      "10 9 false true Property \"_secret\" not found",
      "10 9 true false 198"
],
    correctAnswer: "10 18 false true 198",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3217).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
18
false
true
198\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3219",
    title: "JS Challenge #3219",
    difficulty: "medium",
    category: "basics",
    code: `class Range {  constructor(start, end, step = 1) {    this.start = start;    this.end = end;    this.step = step;  }  [Symbol.iterator]() {    let current = this.start;    const { end, step } = this;    return {      next() {        if (current <= end) {          const value = current;          current += step;          return { value, done: false };        }        return { value: undefined, done: true };      }    };  }}const range = new Range(1, 10, 3);const result = [...range].map(n => n ** 2);console.log(result);`,
    options: [
      "[ 1, 9, 25, 49 ]",
      "[ 1, 16, 49, 100 ]",
      "[ 1, 9, 49 ]",
      "[ 1, 9, 25, 49, 81 ]"
],
    correctAnswer: "[ 1, 16, 49, 100 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3219).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,16,49,100]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3221",
    title: "JS Challenge #3221",
    difficulty: "medium",
    category: "basics",
    code: `const p1 = new Promise((resolve) => {  console.log("A");  resolve("B");});const p2 = p1.then((val) => {  console.log(val);  return "C";});p2.then((val) => console.log(val));console.log("D");`,
    options: [
      "D A B C",
      "A B D C",
      "A D B C",
      "A B C D"
],
    correctAnswer: "A D B C",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3221).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
D\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3223",
    title: "JS Challenge #3223",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  #listeners = new Map();  on(event, listener) {    if (!this.#listeners.has(event)) {      this.#listeners.set(event, []);    }    this.#listeners.get(event).push(listener);    return this;  }  emit(event, ...args) {    const handlers = this.#listeners.get(event) ?? [];    handlers.forEach(fn => fn(...args));    return this;  }}const emitter = new EventEmitter();const log = [];emitter  .on("data", val => log.push(\`A:\${val}\`))  .on("data", val => log.push(\`B:\${val * 2}\`))  .on("end",  ()  => log.push("done"));emitter.emit("data", 5).emit("data", 3).emit("end");console.log(log.join(","));`,
    options: [
      "A:5,B:10,A:3,B:6,done",
      "A:5,A:3,B:6,B:10,done",
      "A:5,B:10,done,A:3,B:6",
      "A:5,B:25,A:3,B:9,done"
],
    correctAnswer: "A:5,B:10,A:3,B:6,done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3223).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A:5,B:10,A:3,B:6,done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3186",
    title: "JS Challenge #3186",
    difficulty: "medium",
    category: "basics",
    code: `class Vehicle {  #speed = 0;  constructor(brand) {    this.brand = brand;  }  accelerate(amount) {    this.#speed += amount;    return this;  }  getSpeed() {    return this.#speed;  }  toString() {    return \`\${this.brand} @ \${this.#speed}km/h\`;  }}class Car extends Vehicle {  #gear = 1;  constructor(brand, model) {    super(brand);    this.model = model;  }  shiftUp() {    this.#gear++;    return this;  }  toString() {    return \`\${super.toString()} [Gear \${this.#gear}]\`;  }}const car = new Car("Toyota", "Supra");car.accelerate(60).accelerate(40).shiftUp().shiftUp();console.log(car.toString());console.log(car instanceof Car);console.log(car instanceof Vehicle);console.log(Object.getPrototypeOf(Car) === Vehicle);`,
    options: [
      "Toyota @ 100km/h [Gear 3] true true true",
      "Toyota @ 60km/h [Gear 3] true true false",
      "Toyota @ 100km/h [Gear 2] true false true",
      "Toyota Supra @ 100km/h [Gear 3] true true true"
],
    correctAnswer: "Toyota @ 100km/h [Gear 3] true true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3186).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Toyota @ 100km/h [Gear 3]
true
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3188",
    title: "JS Challenge #3188",
    difficulty: "medium",
    category: "basics",
    code: `const delay = (ms, val) => new Promise(res => setTimeout(res, ms, val));async function pipeline(...fns) {  return async (input) => {    let result = input;    for (const fn of fns) {      result = await fn(result);    }    return result;  };}const double  = async (x) => delay(10, x * 2);const addTen  = async (x) => delay(10, x + 10);const square  = async (x) => delay(10, x ** 2);(async () => {  const process = await pipeline(double, addTen, square);  const output  = await process(3);  console.log(output);})();`,
    options: [
      "256",
      "1024",
      "196",
      "324"
],
    correctAnswer: "256",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3188).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3190",
    title: "JS Challenge #3190",
    difficulty: "medium",
    category: "basics",
    code: `const inventory = new Map([  ["sword", { quantity: 3, weight: 15 }],  ["shield", { quantity: 1, weight: 25 }],  ["potion", { quantity: 10, weight: 2 }],]);inventory.set("bow", { quantity: 2, weight: 8 });inventory.delete("shield");const totalWeight = [...inventory.entries()].reduce((acc, [item, { quantity, weight }]) => {  return acc + quantity * weight;}, 0);const heaviestItem = [...inventory.entries()].reduce((max, [item, data]) =>  data.weight > max.weight ? { name: item, ...data } : max,  { name: "", weight: 0 });console.log(inventory.size, totalWeight, heaviestItem.name);`,
    options: [
      "3 71 sword",
      "4 71 sword",
      "4 91 bow",
      "3 81 sword"
],
    correctAnswer: "3 81 sword",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3190).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 81 sword\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3192",
    title: "JS Challenge #3192",
    difficulty: "medium",
    category: "basics",
    code: `const ops = {  add: (a, b) => a + b,  subtract: (a, b) => a - b,  multiply: (a, b) => a * b,  divide: (a, b) => b !== 0 ? a / b : NaN,};const pipeline = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);const double  = (x) => ops.multiply(x, 2);const addTen  = (x) => ops.add(x, 10);const halve   = (x) => ops.divide(x, 2);const subtractThree = (x) => ops.subtract(x, 3);const transform = pipeline(double, addTen, halve, subtractThree);const results = [5, 0, -4].map(transform);console.log(results);`,
    options: [
      "[ 9, 2, -2 ]",
      "[ 7, 5, -3 ]",
      "[ 12, 5, 1 ]",
      "[ 7, 2, -2 ]"
],
    correctAnswer: "[ 7, 2, -2 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3192).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[7,2,-2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3194",
    title: "JS Challenge #3194",
    difficulty: "medium",
    category: "basics",
    code: `const values = [0.1 + 0.2, NaN, Infinity, -0, 42.6789];const results = values.map((v, i) => {  if (i === 0) return Number.isInteger(v) + " | " + v.toFixed(2);  if (i === 1) return Number.isFinite(v) + " | " + Number.isNaN(v);  if (i === 2) return Number.isFinite(v) + " | " + Number.MAX_SAFE_INTEGER;  if (i === 3) return Object.is(v, -0) + " | " + (v === 0);  if (i === 4) return v.toFixed(2) + " | " + v.toPrecision(4);});results.forEach(r => console.log(r));`,
    options: [
      "false | 0.30 true | false false | 9007199254740990 false | true 42.68 | 42.68",
      "true | 0.30 false | true false | 9007199254740991 true | false 42.68 | 42.68",
      "false | 0.30 false | true false | 9007199254740991 true | true 42.68 | 42.68",
      "false | 0.30 false | true false | 9007199254740991 true | true 42.68 | 42.69"
],
    correctAnswer: "false | 0.30 false | true false | 9007199254740991 true | true 42.68 | 42.68",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3194).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false | 0.30
false | true
false | 9007199254740991
true | true
42.68 | 42.68\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3197",
    title: "JS Challenge #3197",
    difficulty: "medium",
    category: "basics",
    code: `const items = [  { name: "banana", price: 1.5, qty: 10 },  { name: "apple",  price: 1.5, qty: 5  },  { name: "cherry", price: 3.0, qty: 8  },  { name: "date",   price: 2.0, qty: 8  },];const sorted = [...items].sort((a, b) => {  if (a.price !== b.price) return a.price - b.price;  if (a.qty   !== b.qty)   return b.qty   - a.qty;  return a.name.localeCompare(b.name);});console.log(sorted.map(i => \`\${i.name}:\${i.qty}\`).join(", "));`,
    options: [
      "banana:10, apple:5, cherry:8, date:8",
      "apple:5, banana:10, cherry:8, date:8",
      "banana:10, apple:5, date:8, cherry:8",
      "apple:5, banana:10, date:8, cherry:8"
],
    correctAnswer: "banana:10, apple:5, date:8, cherry:8",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3197).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`banana:10, apple:5, date:8, cherry:8\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3200",
    title: "JS Challenge #3200",
    difficulty: "medium",
    category: "basics",
    code: `class DatabaseError extends Error {  constructor(message, code) {    super(message);    this.name = "DatabaseError";    this.code = code;  }}class ConnectionError extends DatabaseError {  constructor(host) {    super(\`Failed to connect to \${host}\`, 503);    this.name = "ConnectionError";    this.host = host;  }}const err = new ConnectionError("db.server.io");console.log([  err instanceof ConnectionError,  err instanceof DatabaseError,  err instanceof Error,  err.name,  err.code,  err.message,].join(" | "));`,
    options: [
      "true | true | false | ConnectionError | 503 | Failed to connect to db.server.io",
      "true | true | true | DatabaseError | 503 | Failed to connect to db.server.io",
      "true | false | true | ConnectionError | 503 | Failed to connect to db.server.io",
      "true | true | true | ConnectionError | 503 | Failed to connect to db.server.io"
],
    correctAnswer: "true | true | true | ConnectionError | 503 | Failed to connect to db.server.io",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3200).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true | true | true | ConnectionError | 503 | Failed to connect to db.server.io\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3203",
    title: "JS Challenge #3203",
    difficulty: "medium",
    category: "basics",
    code: `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);const double = (x) => x * 2;const addTen = (x) => x + 10;const square = (x) => x ** 2;const negate = (x) => -x;const transform1 = compose(negate, square, addTen, double);const transform2 = pipe(double, addTen, square, negate);const memoize = (fn) => {  const cache = new Map();  return (x) => {    if (!cache.has(x)) cache.set(x, fn(x));    return cache.get(x);  };};const memoTransform1 = memoize(transform1);console.log(transform1(3));console.log(transform2(3));console.log(memoTransform1(3) === transform1(3));`,
    options: [
      "256 -256 true",
      "-256 256 false",
      "-64 -256 true",
      "-256 -256 true"
],
    correctAnswer: "256 -256 true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3203).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-256
-256
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3165",
    title: "JS Challenge #3165",
    difficulty: "medium",
    category: "basics",
    code: `const partial = (fn, ...presetArgs) => {  return function partiallyApplied(...laterArgs) {    return fn(...presetArgs, ...laterArgs);  };};const calculateTax = (taxRate, discount, price) => {  const discounted = price - (price * discount) / 100;  return parseFloat((discounted + (discounted * taxRate) / 100).toFixed(2));};const withVAT = partial(calculateTax, 20);const withVATandDiscount = partial(withVAT, 15);console.log(withVAT(0, 100));console.log(withVATandDiscount(200));console.log(partial(calculateTax, 10, 5)(50));`,
    options: [
      "120 204 52.25",
      "120 170 47.5",
      "100 204 52.25",
      "120 204 47.5"
],
    correctAnswer: "120 204 52.25",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3165).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`120
204
52.25\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3168",
    title: "JS Challenge #3168",
    difficulty: "medium",
    category: "basics",
    code: `const values = [0.1 + 0.2, NaN, Infinity, -0, 42.6789];const results = values.map((v, i) => {  if (i === 0) return v.toFixed(2);  if (i === 1) return Number.isFinite(v) + " " + Number.isNaN(v);  if (i === 2) return Number.isFinite(v) + " " + isFinite(v);  if (i === 3) return Object.is(v, 0) + " " + Object.is(v, -0);  if (i === 4) return v.toPrecision(4);});console.log(results.join(" | "));`,
    options: [
      "0.30 | false true | false false | false true | 42.68",
      "0.30 | false true | false false | false true | 42.67",
      "0.30 | false true | false true | true false | 42.68",
      "0.31 | false true | false false | false true | 42.68"
],
    correctAnswer: "0.30 | false true | false false | false true | 42.68",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3168).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0.30 | false true | false false | false true | 42.68\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3171",
    title: "JS Challenge #3171",
    difficulty: "medium",
    category: "basics",
    code: `async function* paginate(items, pageSize) {  for (let i = 0; i < items.length; i += pageSize) {    const page = items.slice(i, i + pageSize);    yield await Promise.resolve(page);  }}async function* transform(source, fn) {  for await (const chunk of source) {    yield fn(chunk);  }}async function run() {  const data = [10, 20, 30, 40, 50, 60];  const pages = paginate(data, 2);  const mapped = transform(pages, (page) => page.map((x) => x * 2));  const results = [];  for await (const page of mapped) {    results.push(page.reduce((a, b) => a + b, 0));  }  console.log(results);}run();`,
    options: [
      "[ 20, 40, 60, 80, 100, 120 ]",
      "[ 30, 70, 110 ]",
      "[ 60, 140, 220 ]",
      "[ 10, 20, 30, 40, 50, 60 ]"
],
    correctAnswer: "[ 20, 40, 60, 80, 100, 120 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3171).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3174",
    title: "JS Challenge #3174",
    difficulty: "medium",
    category: "basics",
    code: `class ValidationError extends Error {  constructor(message, field) {    super(message);    this.name = "ValidationError";    this.field = field;  }}class NetworkError extends ValidationError {  constructor(message, field, statusCode) {    super(message, field);    this.name = "NetworkError";    this.statusCode = statusCode;  }}const err = new NetworkError("Not Found", "endpoint", 404);console.log([  err instanceof NetworkError,  err instanceof ValidationError,  err instanceof Error,  err instanceof TypeError,].join(", "));`,
    options: [
      "true, true, false, false",
      "true, false, true, false",
      "true, true, true, false",
      "false, true, true, false"
],
    correctAnswer: "true, true, true, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3174).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true, true, true, false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3177",
    title: "JS Challenge #3177",
    difficulty: "medium",
    category: "basics",
    code: `function* counter(start, end) {  for (let i = start; i <= end; i++) {    yield i;  }}function* pipeline() {  const first = yield* counter(1, 3);  console.log("Counter done:", first);  yield "bridge";  const second = yield* counter(7, 9);  console.log("Counter done:", second);}const gen = pipeline();const results = [];let next = gen.next();while (!next.done) {  results.push(next.value);  next = gen.next();}console.log(results);`,
    options: [
      "[1, 2, 3, 'bridge', 7, 8, 9] Counter done: undefined Counter done: undefined",
      "[1, 2, 3, 'bridge', 7, 8, 9] Counter done: 3 Counter done: 9",
      "Counter done: undefined Counter done: undefined [ 1, 2, 3, 'bridge', 7, 8, 9 ]",
      "Counter done: 3 Counter done: 9 [1, 2, 3, 'bridge', 7, 8, 9]"
],
    correctAnswer: "Counter done: undefined Counter done: undefined [ 1, 2, 3, 'bridge', 7, 8, 9 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3177).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Counter done: undefined
Counter done: undefined
[1,2,3,"bridge",7,8,9]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3179",
    title: "JS Challenge #3179",
    difficulty: "medium",
    category: "basics",
    code: `const config = {  host: "localhost",  port: 3000,  db: {    name: "mydb",    maxConnections: 10  }};Object.freeze(config);config.port = 9999;config.db.maxConnections = 99;config.newProp = "surprise";delete config.host;const sealed = Object.seal({ x: 1, y: 2 });sealed.x = 100;sealed.z = 999;delete sealed.y;console.log(config.port, config.db.maxConnections, config.host);console.log(sealed.x, sealed.y, sealed.z);`,
    options: [
      "3000 10 localhost",
      "9999 10 undefined",
      "9999 99 undefined",
      "3000 99 localhost 100 2 undefined"
],
    correctAnswer: "3000 99 localhost 100 2 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3179).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3000 99 localhost
100 2 undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3181",
    title: "JS Challenge #3181",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData(id) {  if (id < 0) throw new Error("Invalid ID");  return { id, value: id * 10 };}async function process() {  const results = await Promise.allSettled([    fetchData(1),    fetchData(-1),    fetchData(3),  ]);  results.forEach(({ status, value, reason }) => {    if (status === "fulfilled") {      console.log(\`fulfilled: \${value.id} -> \${value.value}\`);    } else {      console.log(\`rejected: \${reason.message}\`);    }  });}process();`,
    options: [
      "fulfilled: 1 -> 10 fulfilled: 3 -> 30 rejected: Invalid ID",
      "fulfilled: 1 -> 10 rejected: Invalid ID fulfilled: 3 -> 30",
      "Error: Invalid ID fulfilled: 1 -> 10 fulfilled: 3 -> 30",
      "fulfilled: 1 -> 10 rejected: Error: Invalid ID fulfilled: 3 -> 30"
],
    correctAnswer: "fulfilled: 1 -> 10 fulfilled: 3 -> 30 rejected: Invalid ID",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3181).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3150",
    title: "JS Challenge #3150",
    difficulty: "medium",
    category: "basics",
    code: `const prefix = 'user';const id = 42;const role = 'admin';const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);const profile = {  [\`\${prefix}_\${id}\`]: 'Marcus',  [Symbol.iterator]: null,  [\`get\${capitalize(role)}\`]: () => 'full-access',  [\`\${prefix}Count\`]: 3,};const dynamicKey = \`\${prefix}_\${id}\`;console.log(  profile[dynamicKey],  profile[\`get\${capitalize(role)}\`](),  profile[\`\${prefix}Count\`] * id,  Object.keys(profile).length);`,
    options: [
      "Marcus full-access 126 3",
      "Marcus full-access 42 3",
      "undefined full-access 126 4",
      "Marcus full-access 126 4"
],
    correctAnswer: "Marcus full-access 126 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3150).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Marcus full-access 126 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3153",
    title: "JS Challenge #3153",
    difficulty: "medium",
    category: "basics",
    code: `const values = [0.1 + 0.2, NaN, Infinity, -0, 42.6789];const results = values.map((v, i) => {  if (i === 0) return Number.isInteger(v) + " " + v.toFixed(1);  if (i === 1) return Number.isFinite(v) + " " + Number.isNaN(v);  if (i === 2) return Number.isFinite(v) + " " + isFinite(v);  if (i === 3) return Object.is(v, -0) + " " + (v === 0);  if (i === 4) return v.toPrecision(4) + " " + Math.trunc(v);});results.forEach(r => console.log(r));`,
    options: [
      "false 0.3 false true false false true true 42.68 42",
      "false 0.3 false true false false true true 42.68 42",
      "false 0.3 false true false false true true 42.68 42",
      "false 0.3 false true false false true true 42.68 42"
],
    correctAnswer: "false 0.3 false true false false true true 42.68 42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3153).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false 0.3
false true
false false
true true
42.68 42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3156",
    title: "JS Challenge #3156",
    difficulty: "medium",
    category: "basics",
    code: `class Animal {  #sound;  constructor(name, sound) {    this.name = name;    this.#sound = sound;  }  speak() {    return \`\${this.name} says \${this.#sound}\`;  }  static create(name, sound) {    return new this(name, sound);  }}class Dog extends Animal {  #tricks = [];  constructor(name) {    super(name, "woof");  }  learn(trick) {    this.#tricks.push(trick);    return this;  }  perform() {    return \`\${this.name} performs: \${this.#tricks.join(", ")}\`;  }}const rex = Dog.create("Rex", "bark");rex.learn("sit").learn("shake").learn("roll over");console.log(rex.speak());console.log(rex.perform());console.log(rex instanceof Animal);console.log(rex instanceof Dog);`,
    options: [
      "Rex says woof Rex performs: sit, shake, roll over true true",
      "Rex says woof Rex performs: sit - shake - roll over true true",
      "Rex says bark Rex performs: sit, shake, roll over false true",
      "Rex says bark Rex performs: sit, shake, roll over true true"
],
    correctAnswer: "Rex says woof Rex performs: sit, shake, roll over true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3156).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Rex says woof
Rex performs: sit, shake, roll over
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3159",
    title: "JS Challenge #3159",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    name: "Marcus",    score: 0,    nickname: null,    bio: undefined,  },};user.profile.nickname ??= "Anonymous";user.profile.bio ??= "No bio provided";user.profile.score ??= 100;user.profile.rank ??= "Beginner";const { name, score, nickname, bio, rank } = user.profile;console.log(\`\${name} | \${score} | \${nickname} | \${bio} | \${rank}\`);`,
    options: [
      "Marcus | 0 | Anonymous | undefined | Beginner",
      "Marcus | 0 | Anonymous | No bio provided | Beginner",
      "Marcus | 0 | null | No bio provided | Beginner",
      "Marcus | 100 | Anonymous | No bio provided | Beginner"
],
    correctAnswer: "Marcus | 0 | Anonymous | No bio provided | Beginner",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3159).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Marcus | 0 | Anonymous | No bio provided | Beginner\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3162",
    title: "JS Challenge #3162",
    difficulty: "medium",
    category: "basics",
    code: `const counter = (function () {  let count = 0;  const history = [];  return {    increment(step = 1) {      count += step;      history.push(count);      return this;    },    decrement(step = 1) {      count -= step;      history.push(count);      return this;    },    getHistory: () => history,    getCount: () => count,  };})();counter.increment(5).increment(3).decrement(2);console.log(counter.getCount(), counter.getHistory().join(" -> "));`,
    options: [
      "8 5 -> 8 -> 6",
      "6 5 -> 8 -> 6",
      "5 5 -> 8",
      "6 -> 5 -> 8 -> 6"
],
    correctAnswer: "6 5 -> 8 -> 6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3162).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6 5 -> 8 -> 6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3126",
    title: "JS Challenge #3126",
    difficulty: "medium",
    category: "basics",
    code: `const config = {  host: "localhost",  port: 3000,  db: {    name: "mydb",    retries: 5  }};Object.freeze(config);config.port = 9999;config.newProp = "injected";config.db.retries = 99;delete config.host;console.log(  config.port,  config.newProp,  config.db.retries,  config.host);`,
    options: [
      "3000 undefined 5 localhost",
      "9999 injected 99 undefined",
      "3000 undefined 99 localhost",
      "3000 injected 5 undefined"
],
    correctAnswer: "3000 undefined 99 localhost",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3126).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3000 undefined 99 localhost\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3129",
    title: "JS Challenge #3129",
    difficulty: "medium",
    category: "basics",
    code: `const memoize = (fn) => {  const cache = new Map();  return (...args) => {    const key = JSON.stringify(args);    if (cache.has(key)) {      return cache.get(key);    }    const result = fn(...args);    cache.set(key, result);    return result;  };};let callCount = 0;const expensiveMultiply = memoize((a, b) => {  callCount++;  return a * b;});console.log(expensiveMultiply(3, 4));console.log(expensiveMultiply(3, 4));console.log(expensiveMultiply(2, 5));console.log(expensiveMultiply(3, 4));console.log(\`calls: \${callCount}\`);`,
    options: [
      "12 12 10 12 calls: 2",
      "12 undefined 10 12 calls: 3",
      "12 12 10 12 calls: 3",
      "12 12 10 12 calls: 4"
],
    correctAnswer: "12 12 10 12 calls: 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3129).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12
12
10
12
calls: 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3131",
    title: "JS Challenge #3131",
    difficulty: "medium",
    category: "basics",
    code: `const config = {  version: 1,  settings: { theme: "dark", fontSize: 14 },  tags: ["beta", "v1"],};Object.seal(config);Object.freeze(config.settings);config.version = 99;config.newProp = "ignored";delete config.tags;config.settings.theme = "light";config.settings.newKey = "ignored";config.tags.push("v2");config.tags[0] = "stable";console.log(  config.version,  config.newProp,  config.settings.theme,  config.tags);`,
    options: [
      "99 undefined light [ 'beta', 'v1', 'v2' ]",
      "99 undefined dark [ 'stable', 'v1', 'v2' ]",
      "99 undefined dark [ 'stable', 'v1' ]",
      "1 undefined dark [ 'beta', 'v1' ]"
],
    correctAnswer: "99 undefined dark [ 'stable', 'v1', 'v2' ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3131).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`99 undefined dark ["stable","v1","v2"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3133",
    title: "JS Challenge #3133",
    difficulty: "medium",
    category: "basics",
    code: `"use strict";function createCounter() {  let count = 0;  return {    increment() { count++; },    get value() { return count; },    reset: function() { count = 0; }  };}const counter = createCounter();counter.increment();counter.increment();counter.increment();const { value, reset } = counter;reset();console.log(counter.value, value);`,
    options: [
      "3 3",
      "0 0",
      "0 3",
      "TypeError: Cannot read properties of undefined"
],
    correctAnswer: "0 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3133).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3135",
    title: "JS Challenge #3135",
    difficulty: "medium",
    category: "basics",
    code: `const delay = (val) => Promise.resolve(val);async function pipeline(input) {  const result = await delay(input)    .then((v) => v * 2)    .then((v) => v + 10)    .then((v) => {      if (v > 20) throw new Error(\`Too large: \${v}\`);      return v;    })    .catch((e) => \`Caught: \${e.message}\`)    .then((v) => (typeof v === "string" ? v.toUpperCase() : v * 3));  return result;}Promise.all([pipeline(4), pipeline(8)]).then(([a, b]) => {  console.log(a);  console.log(b);});`,
    options: [
      "54 CAUGHT: TOO LARGE: 26",
      "CAUGHT: TOO LARGE: 26 18",
      "18 CAUGHT: TOO LARGE: 26",
      "18 Caught: Too large: 26"
],
    correctAnswer: "54 CAUGHT: TOO LARGE: 26",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3135).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3138",
    title: "JS Challenge #3138",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get(target, prop, receiver) {    if (prop in target) {      return Reflect.get(target, prop, receiver) * 2;    }    return \`\${prop} not found\`;  },  set(target, prop, value) {    if (typeof value !== "number") {      throw new TypeError("Only numbers allowed");    }    target[prop] = value + 10;    return true;  },  has(target, prop) {    return prop.startsWith("x") ? false : prop in target;  },};const obj = new Proxy({ score: 5, xp: 100 }, handler);obj.level = 3;console.log(obj.score);console.log(obj.level);console.log("xp" in obj);console.log("score" in obj);console.log(obj.rank);`,
    options: [
      "10 26 true false rank not found",
      "5 13 true true undefined",
      "10 13 false true rank not found",
      "10 26 false true rank not found"
],
    correctAnswer: "10 26 false true rank not found",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3138).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
26
false
true
rank not found\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3141",
    title: "JS Challenge #3141",
    difficulty: "medium",
    category: "basics",
    code: `const curry = (fn) => {  const arity = fn.length;  return function curried(...args) {    if (args.length >= arity) {      return fn(...args);    }    return (...moreArgs) => curried(...args, ...moreArgs);  };};const volume = (l, w, h) => l * w * h;const curriedVolume = curry(volume);const withLength5 = curriedVolume(5);const withLength5Width3 = withLength5(3);console.log(typeof withLength5);console.log(typeof withLength5Width3);console.log(withLength5Width3(2));console.log(curriedVolume(4)(6)(2));`,
    options: [
      "undefined function 15 48",
      "function function 30 48",
      "function function 30 24",
      "function number 30 48"
],
    correctAnswer: "function function 30 48",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3141).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`function
function
30
48\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3143",
    title: "JS Challenge #3143",
    difficulty: "medium",
    category: "basics",
    code: `function checkTDZ() {  console.log(typeof undeclaredVar);  try {    console.log(typeof letVar);  } catch (e) {    console.log(\`Caught: \${e.constructor.name}\`);  }  let letVar = "initialized";  const result = (() => {    let x = 10;    return function () {      let x = x + 5;      return x;    };  })();  try {    console.log(result());  } catch (e) {    console.log(\`Caught: \${e.constructor.name}\`);  }}checkTDZ();`,
    options: [
      "undefined Caught: SyntaxError Caught: ReferenceError",
      "undefined Caught: ReferenceError Caught: ReferenceError",
      "undefined undefined Caught: ReferenceError",
      "undefined Caught: ReferenceError 15"
],
    correctAnswer: "undefined Caught: ReferenceError Caught: ReferenceError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3143).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
Caught: ReferenceError
Caught: ReferenceError\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3105",
    title: "JS Challenge #3105",
    difficulty: "medium",
    category: "basics",
    code: `function highlight(strings, ...values) {  return strings.reduce((result, str, i) => {    const value = values[i - 1];    const formatted =      typeof value === "number"        ? \`[\${value * 2}]\`        : \`<\${String(value).toUpperCase()}>\`;    return result + formatted + str;  });}const language = "javascript";const year = 2015;const feature = "templates";const output = highlight\`Language: \${language}, introduced in \${year}, feature: \${feature}!\`;console.log(output);`,
    options: [
      "Language: <JAVASCRIPT>, introduced in [2015], feature: <TEMPLATES>!",
      "Language: JAVASCRIPT, introduced in 4030, feature: TEMPLATES!",
      "Language: <javascript>, introduced in [4030], feature: <templates>!",
      "Language: <JAVASCRIPT>, introduced in [4030], feature: <TEMPLATES>!"
],
    correctAnswer: "Language: <javascript>, introduced in [4030], feature: <templates>!",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3105).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Language: <JAVASCRIPT>, introduced in [4030], feature: <TEMPLATES>!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3107",
    title: "JS Challenge #3107",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get(target, prop, receiver) {    if (prop in target) {      return Reflect.get(target, prop, receiver) * 2;    }    return \`Missing: \${prop}\`;  },  set(target, prop, value) {    if (typeof value !== "number") {      throw new TypeError("Only numbers allowed");    }    return Reflect.set(target, prop, Math.abs(value));  },};const store = new Proxy({ gold: 10, silver: 5 }, handler);store.bronze = -42;console.log(store.gold);console.log(store.bronze);console.log(store.platinum);`,
    options: [
      "20 42 Missing: platinum",
      "10 42 Missing: platinum",
      "20 -84 undefined",
      "20 84 Missing: platinum"
],
    correctAnswer: "20 84 Missing: platinum",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3107).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20
84
Missing: platinum\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3109",
    title: "JS Challenge #3109",
    difficulty: "medium",
    category: "basics",
    code: `function* range(start, end) {  while (start < end) {    yield start++;  }}function* evens(iter) {  for (const val of iter) {    if (val % 2 === 0) yield val;  }}function* take(n, iter) {  let count = 0;  for (const val of iter) {    if (count++ >= n) return;    yield val;  }}function* pipeline() {  yield* take(3, evens(range(1, 20)));  yield* take(2, range(10, 15));}const result = [...pipeline()];console.log(result);`,
    options: [
      "[ 2, 4, 6, 10, 11 ]",
      "[ 2, 4, 6, 8, 10, 11, 12 ]",
      "[ 2, 4, 6, 10, 11, 12 ]",
      "[ 1, 2, 3, 10, 11 ]"
],
    correctAnswer: "[ 2, 4, 6, 10, 11 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3109).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,4,6,10,11]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3112",
    title: "JS Challenge #3112",
    difficulty: "medium",
    category: "basics",
    code: `const delay = (ms, val) => new Promise(res => setTimeout(res, ms, val));const p1 = delay(300, "alpha");const p2 = Promise.reject("network error");const p3 = delay(100, "gamma");const p4 = Promise.reject("timeout");Promise.allSettled([p1, p2, p3, p4]).then(results => {  const summary = results.map(r =>    r.status === "fulfilled"      ? \`ok:\${r.value}\`      : \`fail:\${r.reason}\`  );  console.log(summary.join(" | "));});`,
    options: [
      "ok:alpha | fail:network error | fail:timeout | ok:gamma",
      "fail:network error | fail:timeout | ok:alpha | ok:gamma",
      "ok:alpha | fail:network error | ok:gamma | fail:timeout",
      "ok:alpha | ok:gamma | fail:network error | fail:timeout"
],
    correctAnswer: "ok:alpha | fail:network error | fail:timeout | ok:gamma",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3112).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3114",
    title: "JS Challenge #3114",
    difficulty: "medium",
    category: "basics",
    code: `const str = "  Hello, World!  ";const result = str  .trim()  .split(", ")  .map((word, i) => {    if (i % 2 === 0) return word.toUpperCase();    return word.toLowerCase().replace("!", "@");  })  .reverse()  .join(" | ");console.log(result);`,
    options: [
      "HELLO | world@",
      "HELLO | WORLD!",
      "hello | WORLD@",
      "world@ | HELLO"
],
    correctAnswer: "world@ | HELLO",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3114).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`world@ | HELLO\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3117",
    title: "JS Challenge #3117",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(make, model, year) {  this.make = make;  this.model = model;  this.year = year;  this.speed = 0;}Vehicle.prototype.accelerate = function (amount) {  this.speed += amount;  return this;};Vehicle.prototype.describe = function () {  return \`\${this.year} \${this.make} \${this.model} going \${this.speed}km/h\`;};function ElectricVehicle(make, model, year, range) {  Vehicle.call(this, make, model, year);  this.range = range;}ElectricVehicle.prototype = Object.create(Vehicle.prototype);ElectricVehicle.prototype.constructor = ElectricVehicle;ElectricVehicle.prototype.describe = function () {  return Vehicle.prototype.describe.call(this) + \` | Range: \${this.range}km\`;};const car = new ElectricVehicle("Tesla", "Model 3", 2023, 500);car.accelerate(60).accelerate(40);console.log(car.describe());console.log(car instanceof ElectricVehicle);console.log(car instanceof Vehicle);console.log(car.constructor === ElectricVehicle);`,
    options: [
      "2023 Tesla Model 3 going 100km/h | Range: 500km true true false",
      "2023 Tesla Model 3 going 100km/h | Range: 500km true false true",
      "2023 Tesla Model 3 going 60km/h | Range: 500km true true true",
      "2023 Tesla Model 3 going 100km/h | Range: 500km true true true"
],
    correctAnswer: "2023 Tesla Model 3 going 100km/h | Range: 500km true true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3117).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2023 Tesla Model 3 going 100km/h | Range: 500km
true
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3120",
    title: "JS Challenge #3120",
    difficulty: "medium",
    category: "basics",
    code: `function createUser(  name,  role = "viewer",  permissions = [role],  metadata = { createdBy: name, level: permissions.length }) {  return { name, role, permissions, metadata };}const user1 = createUser("Carlos");const user2 = createUser("Diana", "admin", ["read", "write", "delete"]);const user3 = createUser("Eve", "editor", undefined, { createdBy: "system", level: 99 });console.log(user1.role, user1.permissions, user1.metadata.level);console.log(user2.metadata.createdBy, user2.permissions.length);console.log(user3.permissions[0], user3.metadata.level);`,
    options: [
      "viewer [ 'viewer' ] 1 Carlos 3 editor 99",
      "viewer [ 'role' ] 1 Diana 3 editor 1",
      "viewer [ 'viewer' ] 1 Diana 3 editor 99",
      "viewer [ 'viewer' ] 0 Diana 3 editor 99"
],
    correctAnswer: "viewer [ 'viewer' ] 1 Diana 3 editor 99",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3120).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`viewer ["viewer"] 1
Diana 3
editor 99\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3123",
    title: "JS Challenge #3123",
    difficulty: "medium",
    category: "basics",
    code: `const name = "Carlos";const age = 28;const score = 95;const player = {  name,  age,  score,  greet() {    return \`\${this.name} (\${this.age}) scored \${this.score}\`;  },  get rank() {    return this.score >= 90 ? "Gold" : "Silver";  }};const { name: playerName, rank, greet } = player;console.log(\`\${playerName} | \${rank} | \${greet.call(player)}\`);`,
    options: [
      "Carlos | Silver | Carlos (28) scored 95",
      "Carlos | undefined | Carlos (28) scored 95",
      "Carlos | Gold | Carlos (28) scored 95",
      "Carlos | Gold | undefined (undefined) scored undefined"
],
    correctAnswer: "Carlos | Gold | Carlos (28) scored 95",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3123).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Carlos | Gold | Carlos (28) scored 95\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3086",
    title: "JS Challenge #3086",
    difficulty: "medium",
    category: "basics",
    code: `const temperature = {  celsius: 22,  [Symbol.toPrimitive](hint) {    if (hint === 'number') {      return this.celsius;    }    if (hint === 'string') {      return \`\${this.celsius}°C\`;    }    return this.celsius + 273.15;  }};console.log(\`Temp: \${temperature}\`);console.log(temperature + 0);console.log(temperature * 2);console.log(+temperature);`,
    options: [
      "Temp: 22 295.15 590.3 22",
      "Temp: 22°C 295.15 590.3 22",
      "Temp: 22°C 295.15 44 22",
      "Temp: 22°C 22 44 22"
],
    correctAnswer: "Temp: 22°C 295.15 44 22",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3086).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Temp: 22°C
295.15
44
22\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3089",
    title: "JS Challenge #3089",
    difficulty: "medium",
    category: "basics",
    code: `const a = 10n ** 3n;const b = BigInt(Number.MAX_SAFE_INTEGER) + 1n;const c = b + 1n;console.log(typeof a);console.log(a === 1000n);console.log(b === c);console.log(5n / 2n);`,
    options: [
      "bigint true true 2.5n",
      "number true false 2n",
      "bigint true false 2n",
      "bigint false false 2n"
],
    correctAnswer: "bigint true false 2n",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3089).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`bigint
true
false
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3091",
    title: "JS Challenge #3091",
    difficulty: "medium",
    category: "basics",
    code: `const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));const double  = x => x * 2;const addTen  = x => x + 10;const square  = x => x * x;const negate  = x => -x;const transform1 = compose(negate, square, addTen, double);const transform2 = pipe(double, addTen, square, negate);const val = 3;console.log(transform1(val), transform2(val));`,
    options: [
      "-64 -256",
      "-256 -256",
      "256 -256",
      "-256 64"
],
    correctAnswer: "-256 -256",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3091).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-256 -256\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3094",
    title: "JS Challenge #3094",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: "Orion",  greet() {    const inner = () => {      console.log(this.name);    };    inner();  },  greetRegular: function () {    const inner = function () {      console.log(this?.name ?? "undefined");    };    inner();  },};obj.greet();obj.greetRegular();`,
    options: [
      "Orion Orion",
      "Orion undefined",
      "undefined Orion",
      "undefined undefined"
],
    correctAnswer: "Orion undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3094).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Orion
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3097",
    title: "JS Challenge #3097",
    difficulty: "medium",
    category: "basics",
    code: `const operations = {  add: (a, b) => a + b,  subtract: (a, b) => a - b,  multiply: (a, b) => a * b,  divide: (a, b) => b !== 0 ? a / b : null,};const pipeline = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);const double  = (x) => operations.multiply(x, 2);const addTen  = (x) => operations.add(x, 10);const halve   = (x) => operations.divide(x, 2);const subtractThree = (x) => operations.subtract(x, 3);const transform = pipeline(double, addTen, halve, subtractThree);console.log(transform(5));`,
    options: [
      "10",
      "7",
      "12",
      "15"
],
    correctAnswer: "7",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3097).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`7\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3099",
    title: "JS Challenge #3099",
    difficulty: "medium",
    category: "basics",
    code: `"use strict";function createCounter() {  let count = 0;  return {    increment() { count++; },    getCount() { return count; },    reset: function() { count = 0; }  };}const counter = createCounter();counter.increment();counter.increment();counter.increment();const { getCount, reset } = counter;try {  reset();  console.log("After reset:", counter.getCount());} catch (e) {  console.log("Error:", e.message);}console.log("Direct call:", counter.getCount());`,
    options: [
      "Error: Cannot set properties of undefined",
      "Error: count is not defined",
      "After reset: 3 Direct call: 3",
      "After reset: 0 Direct call: 0"
],
    correctAnswer: "After reset: 0 Direct call: 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3099).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`After reset: 0
Direct call: 0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3101",
    title: "JS Challenge #3101",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: "Quantum",  regular: function () {    return this.name;  },  arrow: () => {    return this?.name;  },  nested: function () {    const inner = () => this.name;    return inner();  },};console.log(obj.regular());console.log(obj.arrow());console.log(obj.nested());`,
    options: [
      "Quantum Quantum Quantum",
      "undefined undefined Quantum",
      "Quantum undefined Quantum",
      "Quantum undefined undefined"
],
    correctAnswer: "Quantum undefined Quantum",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3101).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Quantum
undefined
Quantum\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3103",
    title: "JS Challenge #3103",
    difficulty: "medium",
    category: "basics",
    code: `const curry = (fn) => {  const arity = fn.length;  return function curried(...args) {    if (args.length >= arity) {      return fn(...args);    }    return (...moreArgs) => curried(...args, ...moreArgs);  };};const volume = (l, w, h) => l * w * h;const curriedVolume = curry(volume);const withLength5 = curriedVolume(5);const withLength5Width3 = withLength5(3);console.log(typeof withLength5);console.log(typeof withLength5Width3);console.log(withLength5Width3(4));console.log(curriedVolume(2)(6)(7));`,
    options: [
      "function function 15 84",
      "function function 60 84",
      "function number 60 84",
      "function function 60 84"
],
    correctAnswer: "function function 60 84",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3103).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`function
function
60
84\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3064",
    title: "JS Challenge #3064",
    difficulty: "medium",
    category: "basics",
    code: `const str = "JavaScript is Awesome!";const result = str  .split(" ")  .map((word, i) => {    if (i % 2 === 0) return word.toUpperCase();    return word.toLowerCase();  })  .map((word) => [...word].reverse().join(""))  .join("-");console.log(result);`,
    options: [
      "tpircsavaj-SI-!emosewa",
      "TPIRCSAVAJ-si-!EMOSEWA",
      "TPIRCSAVAJ-is-!EMOSEWA",
      "TPIRCSVAJ-si-EMOSEWA!"
],
    correctAnswer: "tpircsavaj-SI-!emosewa",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3064).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`TPIRCSAVAJ-si-!EMOSEWA\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3066",
    title: "JS Challenge #3066",
    difficulty: "medium",
    category: "basics",
    code: `const person = { name: "Carlos", scores: [10, 20, 30] };const clone = { ...person };clone.name = "Diana";clone.scores.push(40);const snapshot = Object.assign({}, person);snapshot.name = "Elena";snapshot.scores.push(50);console.log(person.name);console.log(person.scores.length);console.log(clone.name);console.log(clone.scores === person.scores);`,
    options: [
      "Carlos 5 Diana true",
      "Carlos 4 Diana false",
      "Carlos 3 Diana false",
      "Diana 5 Diana true"
],
    correctAnswer: "Carlos 5 Diana true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3066).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Carlos
5
Diana
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3069",
    title: "JS Challenge #3069",
    difficulty: "medium",
    category: "basics",
    code: `"use strict";function createCounter() {  let count = 0;  return {    increment() { count++; },    decrement() { count--; },    getCount() { return count; },    reset: () => { count = 0; }  };}const counter = createCounter();counter.increment();counter.increment();counter.increment();counter.decrement();const { getCount, reset } = counter;console.log(getCount());reset();console.log(counter.getCount());`,
    options: [
      "2 0",
      "2 undefined",
      "TypeError: getCount is not a function",
      "3 3"
],
    correctAnswer: "2 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3069).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3071",
    title: "JS Challenge #3071",
    difficulty: "medium",
    category: "basics",
    code: `const p1 = new Promise((resolve) => {  console.log("A");  resolve("X");});const p2 = p1.then((val) => {  console.log("B");  return val + "Y";});const p3 = p2.then((val) => {  console.log("C:", val);});console.log("D");`,
    options: [
      "D A B C: XY",
      "A D C: XY B",
      "A D B C: XY",
      "A B C: XY D"
],
    correctAnswer: "A D C: XY B",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3071).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
D\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3073",
    title: "JS Challenge #3073",
    difficulty: "medium",
    category: "basics",
    code: `class AppError extends Error {  constructor(message, statusCode) {    super(message);    this.name = this.constructor.name;    this.statusCode = statusCode;  }}class ValidationError extends AppError {  constructor(message) {    super(message, 400);    this.fields = [];  }}function riskyOperation(value) {  if (value === null) throw new ValidationError("Null value");  if (value < 0) throw new AppError("Negative value", 422);  return value * 2;}const results = [];for (const val of [10, null, -5, 3]) {  try {    results.push(riskyOperation(val));  } catch (e) {    if (e instanceof ValidationError) {      results.push(\`Validation:\${e.statusCode}\`);    } else if (e instanceof AppError) {      results.push(\`App:\${e.statusCode}\`);    } else {      results.push("Unknown");    }  }}console.log(results.join(" | "));`,
    options: [
      "20 | Unknown | App:422 | 6",
      "20 | Validation:400 | App:422 | 6",
      "20 | App:400 | App:422 | 6",
      "20 | Validation:400 | Validation:422 | 6"
],
    correctAnswer: "20 | Validation:400 | App:422 | 6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3073).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20 | Validation:400 | App:422 | 6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3077",
    title: "JS Challenge #3077",
    difficulty: "medium",
    category: "basics",
    code: `const p1 = new Promise((resolve) => {  console.log("A");  resolve("B");});const p2 = p1.then((val) => {  console.log(val);  return "C";});p2.then((val) => {  console.log(val);});console.log("D");`,
    options: [
      "A B C D",
      "A D B C",
      "D A B C",
      "A B D C"
],
    correctAnswer: "A D B C",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3077).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
D\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3080",
    title: "JS Challenge #3080",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(make, model, year) {  this.make = make;  this.model = model;  this.year = year;  this.describe = function () {    return \`\${this.year} \${this.make} \${this.model}\`;  };}Vehicle.prototype.age = function (currentYear) {  return currentYear - this.year;};const car = new Vehicle("Toyota", "Supra", 1998);const bike = new Vehicle("Harley", "Sportster", 2005);console.log(car.describe());console.log(bike.age(2025));console.log(car.constructor === Vehicle);console.log(Object.getPrototypeOf(car) === Vehicle.prototype);`,
    options: [
      "1998 Toyota Supra 27 false true",
      "1998 Toyota Supra 20 true true",
      "1998 Toyota Supra 20 true false",
      "Toyota Supra 1998 27 true true"
],
    correctAnswer: "1998 Toyota Supra 20 true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3080).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1998 Toyota Supra
20
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3045",
    title: "JS Challenge #3045",
    difficulty: "medium",
    category: "basics",
    code: `const a = 10n ** 3n;const b = BigInt(Number.MAX_SAFE_INTEGER) + 1n;const c = b - BigInt(Number.MAX_SAFE_INTEGER);const results = {  power: a,  safe: c,  type: typeof a,  equal: 10n == 10,  strict: 10n === 10,};console.log(  results.power,  results.safe,  results.type,  results.equal,  results.strict);`,
    options: [
      "1000n 0n bigint true true",
      "1000n 1n number true false",
      "1000n 1n bigint true false",
      "1000 1 bigint false false"
],
    correctAnswer: "1000n 0n bigint true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3045).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1000 1 bigint true false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3048",
    title: "JS Challenge #3048",
    difficulty: "medium",
    category: "basics",
    code: `class Registry {  static #cache = new Map();  static #instanceCount = 0;  static defaultTTL;  static {    Registry.#cache.set("base", { value: 42, active: true });    Registry.#instanceCount = 1;    Registry.defaultTTL = 3600;    console.log("Static block 1:", Registry.#instanceCount, Registry.defaultTTL);  }  static {    const base = Registry.#cache.get("base");    Registry.#cache.set("derived", { value: base.value * 2, active: false });    Registry.#instanceCount++;    console.log("Static block 2:", Registry.#instanceCount, Registry.#cache.size);  }  static getSnapshot() {    return [...Registry.#cache.entries()]      .map(([k, v]) => \`\${k}:\${v.value}\`)      .join(", ");  }}console.log("Snapshot:", Registry.getSnapshot());console.log("TTL:", Registry.defaultTTL);`,
    options: [
      "Static block 1: 1 3600 Static block 2: 3 2 Snapshot: base:42, derived:84 TTL: 3600",
      "Static block 1: 1 3600 Static block 2: 2 2 Snapshot: base:42, derived:84 TTL: 3600",
      "Static block 1: 0 undefined Static block 2: 1 2 Snapshot: base:42, derived:84 TTL: 3600",
      "Static block 1: 1 3600 Static block 2: 2 2 Snapshot: base:42, derived:84 TTL: undefined"
],
    correctAnswer: "Static block 1: 1 3600 Static block 2: 2 2 Snapshot: base:42, derived:84 TTL: 3600",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3048).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Static block 1: 1 3600
Static block 2: 2 2
Snapshot: base:42, derived:84
TTL: 3600\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3051",
    title: "JS Challenge #3051",
    difficulty: "medium",
    category: "basics",
    code: `const engine = {  type: "V8",  displacement: 4.0,  getInfo() {    return \`\${this.type} - \${this.displacement}L\`;  },  turbo: {    boost: 12,    getBoost() {      return \`\${this.type ?? "Unknown"} boosted at \${this.boost} psi\`;    },  },};const detached = engine.getInfo;const turboInfo = engine.turbo.getBoost;console.log(engine.getInfo());console.log(engine.turbo.getBoost());console.log(turboInfo());`,
    options: [
      "V8 - 4L Unknown boosted at 12 psi Unknown boosted at undefined psi",
      "V8 - 4.0L Unknown boosted at 12 psi V8 boosted at 12 psi",
      "V8 - 4.0L V8 boosted at 12 psi Undefined boosted at 12 psi",
      "V8 - 4.0L Unknown boosted at 12 psi Unknown boosted at undefined psi"
],
    correctAnswer: "V8 - 4L Unknown boosted at 12 psi Unknown boosted at undefined psi",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3051).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`V8 - 4L
Unknown boosted at 12 psi
Unknown boosted at undefined psi\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3053",
    title: "JS Challenge #3053",
    difficulty: "medium",
    category: "basics",
    code: `const product = {  name: "Laptop",  price: 1299,  stock: 42,  discount: 0,  category: "Electronics",};const filtered = Object.entries(product)  .filter(([key, value]) => Boolean(value))  .reduce((acc, [key, value]) => {    acc[key] = value;    return acc;  }, {});console.log(Object.keys(filtered).length);console.log(Object.values(filtered).includes(0));console.log(Object.keys(filtered).join(", "));`,
    options: [
      "5 true name, price, stock, discount, category",
      "4 true name, price, stock, category",
      "3 false name, price, category",
      "4 false name, price, stock, category"
],
    correctAnswer: "4 false name, price, stock, category",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3053).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4
false
name, price, stock, category\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3055",
    title: "JS Challenge #3055",
    difficulty: "medium",
    category: "basics",
    code: `const transactions = [  { id: 1, type: "credit", amount: 200 },  { id: 2, type: "debit",  amount: 50  },  { id: 3, type: "credit", amount: 150 },  { id: 4, type: "debit",  amount: 30  },  { id: 5, type: "credit", amount: 100 },];const result = transactions  .filter(tx => tx.type === "credit")  .map(tx => ({ ...tx, amount: tx.amount * 1.1 }))  .reduce((acc, tx) => acc + tx.amount, 0);console.log(result.toFixed(2));`,
    options: [
      "450.00",
      "500.00",
      "385.00",
      "495.00"
],
    correctAnswer: "495.00",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3055).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`495.00\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3057",
    title: "JS Challenge #3057",
    difficulty: "medium",
    category: "basics",
    code: `class AppError extends Error {  constructor(message, code) {    super(message);    this.name = "AppError";    this.code = code;  }}function riskyOperation(value) {  if (value === null) throw new AppError("Null value", 404);  if (typeof value !== "number") throw new TypeError("Not a number");  if (value < 0) throw new RangeError("Negative value");  return value * 2;}const inputs = [42, null, "hello", -5];const results = inputs.map((input) => {  try {    return riskyOperation(input);  } catch (err) {    if (err instanceof AppError) return \`AppError:\${err.code}\`;    if (err instanceof TypeError) return \`TypeError\`;    if (err instanceof RangeError) return \`RangeError\`;    return \`UnknownError\`;  }});console.log(results);`,
    options: [
      "[ 84, 'AppError:404', 'UnknownError', 'RangeError' ]",
      "[ 42, 'AppError:404', 'TypeError', 'RangeError' ]",
      "[ 84, 'AppError:null', 'TypeError', 'RangeError' ]",
      "[ 84, 'AppError:404', 'TypeError', 'RangeError' ]"
],
    correctAnswer: "[ 84, 'AppError:404', 'TypeError', 'RangeError' ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3057).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[84,"AppError:404","TypeError","RangeError"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3060",
    title: "JS Challenge #3060",
    difficulty: "medium",
    category: "basics",
    code: `const inventory = {  apples: 5,  bananas: 12,  cherries: 0,  dates: 8,};const result = Object.entries(inventory)  .filter(([_, qty]) => qty > 0)  .reduce((acc, [fruit, qty]) => {    acc[fruit] = qty * 2;    return acc;  }, {});const keys = Object.keys(result);const values = Object.values(result);console.log(keys.length, values.reduce((sum, v) => sum + v, 0));`,
    options: [
      "4 50",
      "3 60",
      "4 60",
      "3 50"
],
    correctAnswer: "3 50",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3060).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 50\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3023",
    title: "JS Challenge #3023",
    difficulty: "medium",
    category: "basics",
    code: `class Vehicle {  constructor(type) {    this.type = type;  }  describe() {    return \`I am a \${this.type}\`;  }}class Car extends Vehicle {  constructor(brand) {    super("car");    this.brand = brand;  }  describe() {    return \`\${super.describe()} made by \${this.brand}\`;  }}const myCar = new Car("Toyota");console.log(myCar.describe());console.log(myCar instanceof Car);console.log(myCar instanceof Vehicle);console.log(Object.getPrototypeOf(Car) === Vehicle);`,
    options: [
      "I am a car made by Toyota true true true",
      "I am a car made by Toyota true true false",
      "I am a Vehicle made by Toyota true true true",
      "I am a car made by Toyota true false true"
],
    correctAnswer: "I am a car made by Toyota true true true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3023).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`I am a car made by Toyota
true
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3026",
    title: "JS Challenge #3026",
    difficulty: "medium",
    category: "basics",
    code: `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);const double = (x) => x * 2;const addTen = (x) => x + 10;const square = (x) => x * x;const negate = (x) => -x;const transform1 = compose(negate, square, addTen, double);const transform2 = pipe(double, addTen, square, negate);const input = 3;console.log(transform1(input));console.log(transform2(input));console.log(transform1(input) === transform2(input));`,
    options: [
      "-256 -256 false",
      "-256 -256 true",
      "-256 -36 false",
      "-36 -256 false"
],
    correctAnswer: "-256 -256 true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3026).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-256
-256
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3029",
    title: "JS Challenge #3029",
    difficulty: "medium",
    category: "basics",
    code: `class Session {  #id;  constructor(id) {    this.#id = id;  }  getId() { return this.#id; }}const activeSessions = new WeakSet();const s1 = new Session("user_42");const s2 = new Session("user_99");let s3 = new Session("user_07");activeSessions.add(s1);activeSessions.add(s2);activeSessions.add(s3);console.log(activeSessions.has(s1));         // line Aconsole.log(activeSessions.has(s3));         // line Bs3 = null;console.log(activeSessions.has(s3));         // line CactiveSessions.delete(s2);console.log(activeSessions.has(s2));         // line Dconsole.log(activeSessions.size);            // line E`,
    options: [
      "true true false false 0",
      "true true false false undefined",
      "true true true false undefined",
      "true true false true undefined"
],
    correctAnswer: "true true false false 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3029).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3032",
    title: "JS Challenge #3032",
    difficulty: "medium",
    category: "basics",
    code: `const inventory = {  apples: 5,  bananas: 0,  cherries: 12,  dates: undefined,  elderberries: null,};const summary = Object.entries(inventory)  .filter(([_, value]) => value)  .reduce((acc, [key, value]) => {    acc[key] = value * 2;    return acc;  }, {});console.log(Object.keys(summary).length);console.log(Object.values(summary).every(v => v > 10));console.log(Object.keys(inventory).length === Object.keys(summary).length);`,
    options: [
      "3 true false",
      "2 false false",
      "2 true false",
      "3 false false"
],
    correctAnswer: "2 false false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3032).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
false
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3035",
    title: "JS Challenge #3035",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    getName: () => "Marcus",    getAge: () => 30,  },  settings: null,};const name = user.profile?.getName?.();const age = user.profile?.getAge?.();const theme = user.settings?.getTheme?.() ?? "dark";const lang = user.address?.getLocale?.() ?? "en-US";console.log(\`\${name} | \${age} | \${theme} | \${lang}\`);`,
    options: [
      "Marcus | 30 | undefined | en-US",
      "Marcus | 30 | null | en-US",
      "Marcus | 30 | dark | en-US",
      "undefined | undefined | dark | en-US"
],
    correctAnswer: "Marcus | 30 | dark | en-US",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3035).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Marcus | 30 | dark | en-US\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3038",
    title: "JS Challenge #3038",
    difficulty: "medium",
    category: "basics",
    code: `let x = 'global';function testScope() {  console.log(x);    if (true) {    let x = 'block';    var y = 'function';    console.log(x);  }    console.log(x);  console.log(y);}testScope();`,
    options: [
      "global block global function",
      "global block block function",
      "global block global undefined",
      "undefined block global function"
],
    correctAnswer: "global block global function",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3038).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`global
block
global
function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3005",
    title: "JS Challenge #3005",
    difficulty: "medium",
    category: "basics",
    code: `const cache = new Map();function memoize(fn) {  return function(...args) {    const key = JSON.stringify(args);    if (cache.has(key)) {      return cache.get(key);    }    const result = fn(...args);    cache.set(key, result);    return result;  };}const fibonacci = memoize((n) => {  if (n <= 1) return n;  return fibonacci(n - 1) + fibonacci(n - 2);});console.log(fibonacci(5));console.log(cache.size);`,
    options: [
      "5 5",
      "5 6",
      "8 6",
      "8 5"
],
    correctAnswer: "5 6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3005).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5
6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3009",
    title: "JS Challenge #3009",
    difficulty: "medium",
    category: "basics",
    code: `class CustomError extends Error {  constructor(message) {    super(message);    this.name = this.constructor.name;  }}try {  throw new CustomError("Something went wrong");} catch (error) {  console.log(error.name);  console.log(error instanceof Error);  console.log(error instanceof CustomError);  console.log(typeof error.stack);}`,
    options: [
      "CustomError true true string",
      "CustomError true true undefined",
      "Error true false string",
      "CustomError false true undefined"
],
    correctAnswer: "CustomError true true string",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3009).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`CustomError
true
true
string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3012",
    title: "JS Challenge #3012",
    difficulty: "medium",
    category: "basics",
    code: `function createUser(name = 'Guest', age = 0, active = true) {  return { name, age, active };}const users = [  createUser('Sarah', 25),  createUser('Mike'),  createUser('Emma', undefined, false),  createUser(null, 30)];console.log(users.map(u => \`\${u.name}-\${u.age}-\${u.active}\`).join('|'));`,
    options: [
      "Sarah-25-true|Mike-0-true|Emma-0-false|null-30-true",
      "Guest-0-true|Mike-0-true|Emma-undefined-false|null-30-true",
      "Sarah-25-true|Mike-0-true|Emma-0-false|Guest-30-true",
      "Sarah-25-true|Guest-0-true|Emma-undefined-false|null-30-true"
],
    correctAnswer: "Sarah-25-true|Mike-0-true|Emma-0-false|null-30-true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3012).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah-25-true|Mike-0-true|Emma-0-false|null-30-true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3016",
    title: "JS Challenge #3016",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Sarah',  age: 25,  greet() {    return \`Hello, I'm \${this.name}\`;  }};const keys = Object.keys(user);const values = Object.values(user);const entries = Object.entries(user);console.log(keys.length);console.log(values.includes('Sarah'));console.log(entries[2][0]);`,
    options: [
      "2 false name",
      "3 true greet",
      "2 true age",
      "3 false greet"
],
    correctAnswer: "3 true greet",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3016).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
true
greet\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3018",
    title: "JS Challenge #3018",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Sarah',  profile: {    settings: {      theme: 'dark'    }  }};const config = {  name: 'John',  profile: null};console.log(user.profile?.settings?.theme);console.log(config.profile?.settings?.theme);console.log(user.profile?.preferences?.language);console.log(config.profile?.settings?.theme ?? 'light');`,
    options: [
      "dark undefined null light",
      "dark null undefined light",
      "dark undefined undefined light",
      "Sarah undefined undefined light"
],
    correctAnswer: "dark undefined undefined light",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3018).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`dark
undefined
undefined
light\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3020",
    title: "JS Challenge #3020",
    difficulty: "medium",
    category: "basics",
    code: `function testScope() {  var x = 'outer';  let y = 'outer';    if (true) {    var x = 'inner';    let y = 'inner';    console.log(x, y);  }    console.log(x, y);}testScope();`,
    options: [
      "inner inner outer outer",
      "inner inner inner outer",
      "inner inner inner inner",
      "outer outer inner inner"
],
    correctAnswer: "inner inner inner outer",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3020).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`inner inner
inner outer\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2982",
    title: "JS Challenge #2982",
    difficulty: "medium",
    category: "basics",
    code: `class DataProcessor {  static #cache = new Map();  static #initialized = false;    static {    console.log('First block');    this.#cache.set('default', 'value1');  }    static {    console.log('Second block');    this.#cache.set('config', 'value2');    this.#initialized = true;  }    static getStatus() {    return \`\${this.#cache.size}-\${this.#initialized}\`;  }}console.log(DataProcessor.getStatus());`,
    options: [
      "Second block First block 2-true",
      "First block Second block 2-false",
      "2-true First block Second block",
      "First block Second block 2-true"
],
    correctAnswer: "First block Second block 2-true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2982).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`First block
Second block
2-true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2985",
    title: "JS Challenge #2985",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1, b: { c: 2 } };const obj2 = { ...obj1 };const obj3 = obj1;obj2.a = 10;obj2.b.c = 20;obj3.b.c = 30;console.log(obj1.a);console.log(obj1.b.c);console.log(obj2.a);console.log(obj2.b.c);console.log(obj3.a);console.log(obj3.b.c);`,
    options: [
      "1 30 10 30 1 30",
      "1 20 10 20 1 20",
      "1 2 10 20 1 2",
      "10 20 10 20 10 20"
],
    correctAnswer: "1 30 10 30 1 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2985).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
30
10
30
1
30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2988",
    title: "JS Challenge #2988",
    difficulty: "medium",
    category: "basics",
    code: `function memoize(fn) {  const cache = new Map();  return function(...args) {    const key = JSON.stringify(args);    if (cache.has(key)) {      return cache.get(key);    }    const result = fn.apply(this, args);    cache.set(key, result);    return result;  };}const fibonacci = memoize(function(n) {  if (n <= 1) return n;  return fibonacci(n - 1) + fibonacci(n - 2);});console.log(fibonacci(10));console.log(fibonacci.cache?.size || 'undefined');`,
    options: [
      "89 undefined",
      "55 11",
      "55 undefined",
      "55 10"
],
    correctAnswer: "55 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2988).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`55
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2991",
    title: "JS Challenge #2991",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');setTimeout(() => console.log('2'), 0);Promise.resolve().then(() => console.log('3'));console.log('4');Promise.resolve().then(() => {  console.log('5');  setTimeout(() => console.log('6'), 0);});console.log('7');`,
    options: [
      "1 4 7 5 3 6 2",
      "1 7 4 3 5 2 6",
      "1 4 7 3 5 2 6",
      "1 4 7 2 3 5 6"
],
    correctAnswer: "1 4 7 5 3 6 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2991).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
4
7\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2996",
    title: "JS Challenge #2996",
    difficulty: "medium",
    category: "basics",
    code: `const operations = {  value: 10,  multiply: function(x) {    return this.value * x;  },  arrow: (x) => {    return this.value * x;  },  nested: function() {    const inner = () => this.value * 2;    return inner();  }};console.log(operations.multiply(3));console.log(operations.arrow(3));console.log(operations.nested());`,
    options: [
      "30 30 20",
      "NaN NaN NaN",
      "30 undefined 20",
      "30 NaN 20"
],
    correctAnswer: "30 NaN 20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2996).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`30
NaN
20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2999",
    title: "JS Challenge #2999",
    difficulty: "medium",
    category: "basics",
    code: `class Calculator {  constructor(value) {    this.value = value;  }    add(num) {    this.value += num;    return this;  }    getValue = () => this.value;}const calc = new Calculator(10);const addMethod = calc.add;const getValueMethod = calc.getValue;addMethod.call({value: 5}, 3);console.log(calc.getValue());console.log(getValueMethod());`,
    options: [
      "10 8",
      "10 10",
      "8 10",
      "13 13"
],
    correctAnswer: "10 10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2999).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2961",
    title: "JS Challenge #2961",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    settings: {      theme: 'dark',      notifications: null    }  }};const getNotificationSound = (user) => {  return user?.profile?.settings?.notifications?.sound ?? 'default';};console.log(getNotificationSound(user));console.log(getNotificationSound(null));console.log(getNotificationSound({ profile: {} }));`,
    options: [
      "default default undefined",
      "undefined undefined undefined",
      "null default default",
      "default default default"
],
    correctAnswer: "default default default",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2961).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`default
default
default\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2963",
    title: "JS Challenge #2963",
    difficulty: "medium",
    category: "basics",
    code: `function processData() {  try {    console.log('start');    throw new Error('oops');    console.log('unreachable');  } catch (e) {    console.log('caught');    return 'error';  } finally {    console.log('cleanup');  }  console.log('end');}const result = processData();console.log(result);`,
    options: [
      "start oops cleanup undefined",
      "start caught cleanup error",
      "start caught end error",
      "start caught cleanup undefined"
],
    correctAnswer: "start caught cleanup error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2963).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
caught
cleanup
error\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2965",
    title: "JS Challenge #2965",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Sarah', age: 25 };const handler = {  get(obj, prop) {    if (prop === 'toString') {      return () => \`Person: \${obj.name}\`;    }    return Reflect.get(obj, prop);  },  set(obj, prop, value) {    if (prop === 'age' && value < 0) {      return false;    }    return Reflect.set(obj, prop, value);  }};const proxy = new Proxy(target, handler);proxy.age = -5;proxy.location = 'NYC';console.log(proxy.toString());console.log(proxy.age);console.log(proxy.location);`,
    options: [
      "Person: Sarah 25 NYC",
      "Person: Sarah undefined NYC",
      "Person: Sarah 25 undefined",
      "Person: Sarah -5 NYC"
],
    correctAnswer: "Person: Sarah 25 NYC",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2965).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Person: Sarah
25
NYC\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2967",
    title: "JS Challenge #2967",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Sarah',  greet() {    console.log(\`Hello, \${this.name}\`);  }};const person = { name: 'Mike' };const func = obj.greet;obj.greet();func();func.call(person);person.hello = obj.greet;person.hello();`,
    options: [
      "Hello, Sarah Hello, Sarah Hello, Mike Hello, Sarah",
      "Hello, Sarah Hello, Mike Hello, Mike Hello, Mike",
      "Hello, Sarah Hello,  Hello, Mike Hello, Mike",
      "Hello, Sarah Hello, undefined Hello, Mike Hello, Mike"
],
    correctAnswer: "Hello, Sarah Hello, undefined Hello, Mike Hello, Mike",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2967).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, Sarah
Hello, undefined
Hello, Mike
Hello, Mike\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2969",
    title: "JS Challenge #2969",
    difficulty: "medium",
    category: "basics",
    code: `const source = { a: 1, b: { c: 2 } };const target1 = Object.assign({}, source);const target2 = { ...source };source.b.c = 99;target1.a = 10;target2.b.c = 50;console.log(source.a);console.log(source.b.c);console.log(target1.a);console.log(target1.b.c);console.log(target2.a);console.log(target2.b.c);`,
    options: [
      "1 50 10 50 1 50",
      "10 99 10 99 10 99",
      "1 2 10 2 1 2",
      "1 99 10 99 1 99"
],
    correctAnswer: "1 50 10 50 1 50",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2969).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
50
10
50
1
50\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2972",
    title: "JS Challenge #2972",
    difficulty: "medium",
    category: "basics",
    code: `const memoize = (fn) => {  const cache = new Map();  return (...args) => {    const key = JSON.stringify(args);    if (cache.has(key)) return cache.get(key);    const result = fn(...args);    cache.set(key, result);    return result;  };};const fibonacci = memoize((n) => {  if (n <= 1) return n;  return fibonacci(n - 1) + fibonacci(n - 2);});console.log(fibonacci(10));console.log(fibonacci(5));console.log(fibonacci(10));`,
    options: [
      "89 5 89",
      "55 5 55",
      "55 5 21",
      "55 8 55"
],
    correctAnswer: "55 5 55",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2972).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`55
5
55\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2975",
    title: "JS Challenge #2975",
    difficulty: "medium",
    category: "basics",
    code: `let counter = 0;const increment = () => ++counter;const getValue = () => counter;const obj = {  get value() {     increment();    return getValue();  }};console.log(obj.value);console.log(obj.value);console.log(counter);`,
    options: [
      "1 1 1",
      "2 4 4",
      "0 1 2",
      "1 2 2"
],
    correctAnswer: "1 2 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2975).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2978",
    title: "JS Challenge #2978",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: "Sarah", age: 25 };const handler = {  get(obj, prop) {    if (prop === 'greeting') {      return \`Hello, I'm \${obj.name}\`;    }    return obj[prop]?.toString().toUpperCase() || 'UNKNOWN';  },    set(obj, prop, value) {    if (typeof value === 'string') {      obj[prop] = value.toLowerCase();    } else {      obj[prop] = value * 2;    }    return true;  }};const proxy = new Proxy(target, handler);console.log(proxy.name);proxy.city = "Boston";proxy.score = 15;console.log(proxy.greeting);console.log(proxy.city + " " + proxy.score);`,
    options: [
      "SARAH Hello, I'm Sarah boston 30",
      "sarah Hello, I'm Sarah boston 15",
      "SARAH Hello, I'm sarah boston 30",
      "SARAH Hello, I'm Sarah BOSTON 30"
],
    correctAnswer: "SARAH Hello, I'm Sarah boston 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2978).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`SARAH
Hello, I'm Sarah
BOSTON 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2943",
    title: "JS Challenge #2943",
    difficulty: "medium",
    category: "basics",
    code: `class Calculator {  constructor(value) {    this.value = value;  }    add(num) {    this.value += num;    return this;  }    multiply(num) {    this.value *= num;    return this;  }}const calc = new Calculator(5);const addMethod = calc.add;const result = addMethod.call(calc, 3).multiply(2);console.log(result.value);`,
    options: [
      "8",
      "NaN",
      "16",
      "undefined"
],
    correctAnswer: "16",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2943).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`16\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2945",
    title: "JS Challenge #2945",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  constructor() {    this.events = new Map();  }    on(event, callback) {    if (!this.events.has(event)) {      this.events.set(event, []);    }    this.events.get(event).push(callback);    return this;  }    emit(event, ...args) {    const callbacks = this.events.get(event);    if (callbacks) {      callbacks.forEach(cb => cb(...args));    }    return this;  }}const emitter = new EventEmitter();emitter.on('test', x => console.log(x * 2))       .on('test', x => console.log(x + 10))       .emit('test', 5);`,
    options: [
      "5 5",
      "15 10",
      "undefined undefined",
      "10 15"
],
    correctAnswer: "10 15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2945).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2947",
    title: "JS Challenge #2947",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  data: ['x', 'y', 'z'],  *[Symbol.iterator]() {    for (let i = this.data.length - 1; i >= 0; i--) {      yield this.data[i].toUpperCase();    }  }};const result = [];for (const item of obj) {  result.push(item);  if (result.length === 2) break;}console.log(result.join('-'));`,
    options: [
      "Z-Y",
      "x-y",
      "z-y",
      "X-Y"
],
    correctAnswer: "Z-Y",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2947).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Z-Y\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2949",
    title: "JS Challenge #2949",
    difficulty: "medium",
    category: "basics",
    code: `const x = 15;const y = 10;const z = 3;const result1 = x & y;const result2 = x | y;const result3 = x ^ y;const result4 = ~x;const result5 = y << z;const result6 = y >> 1;console.log(\`\${result1},\${result2},\${result3},\${result4},\${result5},\${result6}\`);`,
    options: [
      "5,15,10,-15,80,5",
      "10,14,5,-16,80,5",
      "10,15,5,-16,80,5",
      "10,15,5,-15,80,5"
],
    correctAnswer: "10,15,5,-16,80,5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2949).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10,15,5,-16,80,5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2952",
    title: "JS Challenge #2952",
    difficulty: "medium",
    category: "basics",
    code: `const wm = new WeakMap();let obj1 = { name: 'John' };let obj2 = { name: 'Jane' };wm.set(obj1, 'developer');wm.set(obj2, 'designer');console.log(wm.get(obj1));console.log(wm.has(obj2));obj1 = null;console.log(wm.get(obj1));const normalObj = {};try {  wm.set('string', 'value');} catch (e) {  console.log('error');}`,
    options: [
      "developer true null error",
      "John true undefined error",
      "developer false undefined error",
      "developer true undefined error"
],
    correctAnswer: "developer true undefined error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2952).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`developer
true
undefined
error\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2955",
    title: "JS Challenge #2955",
    difficulty: "medium",
    category: "basics",
    code: `console.log('start');Promise.resolve().then(() => {  console.log('promise 1');});setTimeout(() => {  console.log('timeout');}, 0);Promise.resolve().then(() => {  console.log('promise 2');}).then(() => {  console.log('promise 3');});console.log('end');`,
    options: [
      "start timeout end promise 1 promise 2 promise 3",
      "start end promise 1 promise 2 promise 3 timeout",
      "start promise 1 promise 2 promise 3 end timeout",
      "start end timeout promise 1 promise 2 promise 3"
],
    correctAnswer: "start end promise 1 promise 2 promise 3 timeout",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2955).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
end\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2958",
    title: "JS Challenge #2958",
    difficulty: "medium",
    category: "basics",
    code: `const nums = [1, 2, 3];const obj = { a: 1, b: 2 };const newObj = { ...obj, b: 3, ...obj };const arr1 = [4, 5];const arr2 = [6, 7];const combined = [...nums, ...arr1, ...arr2];const [first, ...rest] = combined;const { a, ...remaining } = newObj;console.log(newObj.b);console.log(rest.length);console.log(remaining.b);`,
    options: [
      "3 5 3",
      "2 6 2",
      "3 6 3",
      "2 5 2"
],
    correctAnswer: "2 6 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2958).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
6
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2920",
    title: "JS Challenge #2920",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Calculator',  values: [1, 2, 3, 4, 5],    regular: function() {    return this.values.filter(function(x) {      return x > 2;    }).length;  },    arrow: function() {    return this.values.filter(x => x > 2).length;  },    broken: () => {    return this.values.filter(x => x > 2).length;  }};console.log(obj.regular());console.log(obj.arrow());try {  console.log(obj.broken());} catch(e) {  console.log('Error');}`,
    options: [
      "undefined undefined undefined",
      "Error Error Error",
      "3 3 Error",
      "3 3 3"
],
    correctAnswer: "3 3 Error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2920).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
3
Error\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2923",
    title: "JS Challenge #2923",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5, 6];const result = numbers  .map(x => x * 2)  .filter(x => x > 6)  .reduce((acc, x) => {    console.log(\`Processing \${x}, acc: \${acc}\`);    return acc + x;  }, 0);console.log(\`Final result: \${result}\`);`,
    options: [
      "Processing 10, acc: 8 Processing 12, acc: 18 Final result: 30",
      "Processing 8, acc: 0 Processing 10, acc: 8 Final result: 18",
      "Processing 4, acc: 0 Processing 5, acc: 4 Processing 6, acc: 9 Final result: 15",
      "Processing 8, acc: 0 Processing 10, acc: 8 Processing 12, acc: 18 Final result: 30"
],
    correctAnswer: "Processing 10, acc: 8 Processing 12, acc: 18 Final result: 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2923).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Processing 8, acc: 0
Processing 10, acc: 8
Processing 12, acc: 18
Final result: 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2928",
    title: "JS Challenge #2928",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 42,  [Symbol.toPrimitive](hint) {    if (hint === 'number') return this.value * 2;    if (hint === 'string') return \`Value: \${this.value}\`;    return this.value + 10;  }};console.log(+obj);console.log(\`\${obj}\`);console.log(obj + 5);console.log(Number(obj));`,
    options: [
      "84 Value: 42 57 84",
      "84 Value: 42 52 84",
      "42 42 47 84",
      "42 Value: 42 47 42"
],
    correctAnswer: "84 Value: 42 57 84",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2928).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`84
Value: 42
57
84\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2931",
    title: "JS Challenge #2931",
    difficulty: "medium",
    category: "basics",
    code: `function mysteryFunction() {  console.log(x);  console.log(y);  console.log(z);    var x = 'declared';  let y = 'block-scoped';  const z = 'constant';    console.log(x);  console.log(y);  console.log(z);}mysteryFunction();`,
    options: [
      "ReferenceError: x is not defined",
      "declared block-scoped constant declared block-scoped constant",
      "undefined ReferenceError: Cannot access 'y' before initialization",
      "undefined undefined undefined declared block-scoped constant"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2931).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Cannot access 'y' before initialization\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2934",
    title: "JS Challenge #2934",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(type) {  this.type = type;  this.wheels = 4;}Vehicle.prototype.getInfo = function() {  return \`\${this.type} with \${this.wheels} wheels\`;};const car = new Vehicle('sedan');const bike = Vehicle('motorcycle');console.log(car.getInfo());console.log(typeof bike);console.log(bike?.type || 'undefined');`,
    options: [
      "sedan with 4 wheels undefined motorcycle",
      "sedan with 4 wheels undefined undefined",
      "sedan with 4 wheels object undefined",
      "sedan with 4 wheels object motorcycle"
],
    correctAnswer: "sedan with 4 wheels undefined undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2934).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`sedan with 4 wheels
undefined
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2937",
    title: "JS Challenge #2937",
    difficulty: "medium",
    category: "basics",
    code: `function* innerGenerator() {  yield 1;  yield 2;  return 'inner-done';}function* outerGenerator() {  yield 'start';  const result = yield* innerGenerator();  yield result;  yield 'end';}const gen = outerGenerator();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "start 1 inner-done end undefined",
      "start 1 2 inner-done end",
      "start 1 2 undefined end",
      "start undefined undefined inner-done end"
],
    correctAnswer: "start 1 2 inner-done end",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2937).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
1
2
inner-done
end\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2901",
    title: "JS Challenge #2901",
    difficulty: "medium",
    category: "basics",
    code: `const config = { api: 'v1', timeout: 5000 };Object.seal(config);const settings = { theme: 'dark', lang: 'en' };Object.freeze(settings);config.api = 'v2';config.retries = 3;settings.theme = 'light';settings.debug = true;console.log(config.api);console.log(config.retries);console.log(settings.theme);console.log(settings.debug);`,
    options: [
      "v2 undefined dark undefined",
      "v1 undefined light true",
      "v2 3 dark undefined",
      "v1 3 light true"
],
    correctAnswer: "v2 undefined dark undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2901).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`v2
undefined
dark
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2904",
    title: "JS Challenge #2904",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof myVar);console.log(typeof myFunc);console.log(typeof myArrow);var myVar = 'initialized';function myFunc() {  return 'function declaration';}var myArrow = () => 'arrow function';console.log(typeof myVar);console.log(typeof myFunc);console.log(typeof myArrow);`,
    options: [
      "ReferenceError function ReferenceError string function function",
      "undefined undefined undefined string function function",
      "undefined function function string function function",
      "undefined function undefined string function function"
],
    correctAnswer: "undefined function undefined string function function",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2904).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
function
undefined
string
function
function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2907",
    title: "JS Challenge #2907",
    difficulty: "medium",
    category: "basics",
    code: `const data = [  { type: 'income', amount: 1000, category: 'salary' },  { type: 'expense', amount: 200, category: 'food' },  { type: 'income', amount: 500, category: 'freelance' },  { type: 'expense', amount: 150, category: 'transport' }];const result = data.reduce((acc, item) => {  const key = item.type;  acc[key] = (acc[key] || 0) + item.amount;  return acc;}, {});console.log(result.income - result.expense);`,
    options: [
      "undefined",
      "1150",
      "1500",
      "350"
],
    correctAnswer: "1150",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2907).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1150\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2909",
    title: "JS Challenge #2909",
    difficulty: "medium",
    category: "basics",
    code: `async function processData() {  const promise1 = Promise.resolve('first');  const promise2 = Promise.reject('error');  const promise3 = Promise.resolve('third');    try {    const result = await Promise.allSettled([promise1, promise2, promise3]);    console.log(result[0].status);    console.log(result[1].reason);    console.log(result[2].value);  } catch (error) {    console.log('caught:', error);  }}processData();`,
    options: [
      "fulfilled error third",
      "caught: error",
      "first error third",
      "fulfilled undefined third"
],
    correctAnswer: "fulfilled error third",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2909).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`fulfilled
error
third\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2911",
    title: "JS Challenge #2911",
    difficulty: "medium",
    category: "basics",
    code: `function highlight(strings, ...values) {  return strings.reduce((result, str, i) => {    const value = values[i] ? \`<em>\${values[i]}</em>\` : '';    return result + str + value;  }, '');}const name = 'Sarah';const score = 95;const message = highlight\`Hello \${name}, your score is \${score}!\`;console.log(message);`,
    options: [
      "Hello <em>Sarah</em>, your score is <em>95</em>!",
      "Hello Sarah, your score is 95!",
      "Hello <em>Sarah, your score is </em>95!",
      "<em>Hello Sarah, your score is 95!</em>"
],
    correctAnswer: "Hello <em>Sarah</em>, your score is <em>95</em>!",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2911).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello <em>Sarah</em>, your score is <em>95</em>!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2913",
    title: "JS Challenge #2913",
    difficulty: "medium",
    category: "basics",
    code: `class Counter {  #value = 0;    get count() {    console.log('Getting count');    return this.#value;  }    set count(val) {    console.log('Setting count to', val);    this.#value = Math.max(0, val);  }}const counter = new Counter();counter.count = -5;console.log(counter.count);`,
    options: [
      "Setting count to -5 Getting count -5",
      "Getting count Setting count to -5 -5",
      "Getting count Setting count to -5 0",
      "Setting count to -5 Getting count 0"
],
    correctAnswer: "Setting count to -5 Getting count 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2913).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Setting count to -5
Getting count
0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2915",
    title: "JS Challenge #2915",
    difficulty: "medium",
    category: "basics",
    code: `const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);const add = (x) => (y) => x + y;const multiply = (x) => (y) => x * y;const subtract = (x) => (y) => y - x;const transform = pipe(  add(5),  multiply(3),  subtract(2));console.log(transform(4));console.log(transform(0));`,
    options: [
      "27 15",
      "25 13",
      "27 13",
      "25 15"
],
    correctAnswer: "25 13",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2915).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`25
13\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2918",
    title: "JS Challenge #2918",
    difficulty: "medium",
    category: "basics",
    code: `const user = { name: 'Sarah', age: 0 };const config = { theme: '', debug: false };const result1 = user.age || 25;const result2 = user.name && user.name.toUpperCase();const result3 = config.theme || 'light';const result4 = config.debug && console.log('Debug mode') || 'disabled';console.log(result1);console.log(result2);console.log(result3);console.log(result4);`,
    options: [
      "25 SARAH light disabled",
      "0 SARAH  disabled",
      "0 undefined light disabled",
      "25 SARAH light undefined"
],
    correctAnswer: "25 SARAH light disabled",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2918).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`25
SARAH
light
disabled\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2888",
    title: "JS Challenge #2888",
    difficulty: "medium",
    category: "basics",
    code: `class Vehicle {  #engine = 'V6';  static count = 0;    constructor(type) {    this.type = type;    Vehicle.count++;  }    static getCount() {    return this.count;  }    get info() {    return \`\${this.type} with \${this.#engine}\`;  }}class Car extends Vehicle {  static count = 0;    constructor(brand) {    super('car');    this.brand = brand;    Car.count++;  }}const tesla = new Car('Tesla');const ford = new Car('Ford');console.log(Vehicle.getCount());console.log(Car.getCount());console.log(tesla.info);`,
    options: [
      "2 0 car with V6",
      "2 2 Tesla with V6",
      "0 2 car with V6",
      "2 2 car with V6"
],
    correctAnswer: "2 2 car with V6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2888).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
2
car with V6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2890",
    title: "JS Challenge #2890",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  return Promise.resolve('data');}async function processData() {  console.log('start');  const result = fetchData();  console.log(typeof result);  const data = await fetchData();  console.log(typeof data);  console.log('end');}processData();`,
    options: [
      "start object string end",
      "start object data end",
      "start string object end",
      "start function string end"
],
    correctAnswer: "start object string end",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2890).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
object
string
end\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2892",
    title: "JS Challenge #2892",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let a = 0, b = 1;  yield a;  yield b;  while (true) {    let next = a + b;    yield next;    a = b;    b = next;  }}const gen = fibonacci();const results = [];for (let i = 0; i < 6; i++) {  results.push(gen.next().value);}console.log(results.join(','));`,
    options: [
      "1,2,3,5,8,13",
      "0,1,1,2,3,5",
      "0,1,2,3,5,8",
      "1,1,2,3,5,8"
],
    correctAnswer: "0,1,1,2,3,5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2892).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0,1,1,2,3,5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2894",
    title: "JS Challenge #2894",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Sarah',  age: 28,  getName() {    return this.name;  }};const { getName } = user;const boundGetName = user.getName.bind(user);console.log(getName());console.log(boundGetName());console.log(user.getName());`,
    options: [
      "undefined undefined Sarah",
      "undefined Sarah Sarah",
      "TypeError Sarah Sarah",
      "Sarah Sarah Sarah"
],
    correctAnswer: "undefined Sarah Sarah",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2894).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
Sarah
Sarah\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2896",
    title: "JS Challenge #2896",
    difficulty: "medium",
    category: "basics",
    code: `function* outer() {  yield 1;  yield* inner();  yield 4;}function* inner() {  yield 2;  yield 3;}const gen = outer();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1 undefined undefined 4",
      "1 2 3 4",
      "1 [object Generator] 4 undefined",
      "1 2 3 undefined"
],
    correctAnswer: "1 2 3 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2896).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2898",
    title: "JS Challenge #2898",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2, c: 3 };const entries = Object.entries(obj);const keys = Object.keys(obj);const values = Object.values(obj);const result = {  entriesLength: entries.length,  keysJoined: keys.join('-'),  valuesSum: values.reduce((sum, val) => sum + val, 0),  firstEntry: entries[0]};console.log(result.entriesLength);console.log(result.keysJoined);console.log(result.valuesSum);console.log(result.firstEntry);`,
    options: [
      "3 a,b,c 6 [ 'a', 1 ]",
      "3 a-b-c 6 [ 'a', 1 ]",
      "3 'a-b-c' 6 [ 'a', 1 ]",
      "3 a-b-c 6 ['a', 1]"
],
    correctAnswer: "3 a-b-c 6 [ 'a', 1 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2898).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
a-b-c
6
["a",1]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2860",
    title: "JS Challenge #2860",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(type) {  this.type = type;  this.wheels = 4;}Vehicle.prototype.describe = function() {  return \`\${this.type} with \${this.wheels} wheels\`;};const car = new Vehicle('Car');const bike = Vehicle('Bike');console.log(car.describe());console.log(typeof bike);console.log(globalThis.type);`,
    options: [
      "Car with 4 wheels undefined Bike",
      "Car with 4 wheels undefined undefined",
      "Car with 4 wheels object undefined",
      "Car with 4 wheels object Bike"
],
    correctAnswer: "Car with 4 wheels undefined Bike",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2860).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Car with 4 wheels
undefined
Bike\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2862",
    title: "JS Challenge #2862",
    difficulty: "medium",
    category: "basics",
    code: `const json = '{"name":"Sarah","age":25,"active":true}';const obj = JSON.parse(json);obj.name = "Emma";obj.age++;const json2 = JSON.stringify(obj);const obj2 = JSON.parse(json2);obj.age = 100;console.log(obj2.age);`,
    options: [
      "25",
      "27",
      "100",
      "26"
],
    correctAnswer: "26",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2862).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`26\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2864",
    title: "JS Challenge #2864",
    difficulty: "medium",
    category: "basics",
    code: `const multiplier = 3;function createCounter() {  let count = 0;  const multiplier = 5;    return function() {    count++;    return count * multiplier;  };}const counter = createCounter();console.log(counter());console.log(counter());console.log(multiplier);`,
    options: [
      "3 6 3",
      "5 10 3",
      "5 10 5",
      "3 6 5"
],
    correctAnswer: "5 10 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2864).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5
10
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2868",
    title: "JS Challenge #2868",
    difficulty: "medium",
    category: "basics",
    code: `const x = 0.1 + 0.2;const y = 0.3;console.log(x === y);console.log(x.toFixed(1) === y.toFixed(1));console.log(+x.toFixed(1) === +y.toFixed(1));const num = 42;console.log(num.toString(2));console.log(parseInt('101010', 2));`,
    options: [
      "false false true 101010 42",
      "false true true 101010 101010",
      "true true true 101010 42",
      "false true true 101010 42"
],
    correctAnswer: "false true true 101010 42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2868).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
true
true
101010
42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2870",
    title: "JS Challenge #2870",
    difficulty: "medium",
    category: "basics",
    code: `const x = 5;const y = 10;const result = \`\${x + y}\`;const nested = \`Value: \${\`\${x}\` + \`\${y}\`}\`;const expr = \`\${x}\${y}\`;console.log(result);console.log(nested);console.log(expr);console.log(typeof result);`,
    options: [
      "15 Value: 15 510 string",
      "15 Value: 510 15 string",
      "510 Value: 15 510 string",
      "15 Value: 510 510 string"
],
    correctAnswer: "15 Value: 510 510 string",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2870).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`15
Value: 510
510
string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2872",
    title: "JS Challenge #2872",
    difficulty: "medium",
    category: "basics",
    code: `const obj = Object.seal({ a: 1, b: { c: 2 } });obj.a = 10;obj.b.c = 20;obj.d = 30;delete obj.a;const frozen = Object.freeze({ x: 5, y: { z: 10 } });frozen.x = 50;frozen.y.z = 100;delete frozen.y;console.log(obj.a, obj.b.c, obj.d, frozen.x, frozen.y.z);`,
    options: [
      "10 20 30 50 10",
      "10 20 undefined 5 100",
      "10 2 undefined 5 100",
      "1 2 undefined 5 10"
],
    correctAnswer: "10 20 undefined 5 100",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2872).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10 20 undefined 5 100\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2875",
    title: "JS Challenge #2875",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .filter(n => n % 2 === 0)  .map(n => n * 2)  .reduce((acc, curr) => acc + curr, 0);const original = numbers.slice();numbers.splice(2, 1, 99);console.log(result);console.log(numbers);console.log(original);`,
    options: [
      "8 [ 1, 2, 3, 99, 5 ] [ 1, 2, 99, 4, 5 ]",
      "12 [ 1, 2, 99, 4, 5 ] [ 1, 2, 3, 4, 5 ]",
      "12 [ 1, 2, 3, 99, 5 ] [ 1, 2, 3, 4, 5 ]",
      "8 [ 1, 2, 99, 4, 5 ] [ 1, 2, 3, 4, 5 ]"
],
    correctAnswer: "12 [ 1, 2, 99, 4, 5 ] [ 1, 2, 3, 4, 5 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2875).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12
[1,2,99,4,5]
[1,2,3,4,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2878",
    title: "JS Challenge #2878",
    difficulty: "medium",
    category: "basics",
    code: `const getValue = (x) => {  console.log(\`Getting: \${x}\`);  return x;};const obj = { name: null };const result = obj.name || getValue('default') && getValue('final');console.log(\`Result: \${result}\`);`,
    options: [
      "Getting: default Getting: final Result: final",
      "Getting: final Result: final",
      "Getting: default Result: default",
      "Result: null"
],
    correctAnswer: "Getting: default Getting: final Result: final",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2878).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Getting: default
Getting: final
Result: final\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2839",
    title: "JS Challenge #2839",
    difficulty: "medium",
    category: "basics",
    code: `const promise1 = Promise.resolve(10);const promise2 = promise1.then(x => x * 2);const promise3 = promise2.then(x => {  console.log(x);  return x + 5;});const promise4 = promise2.then(x => {  console.log(x);  return x * 3;});Promise.all([promise3, promise4]).then(results => {  console.log(results);});`,
    options: [
      "20 20 [25, 60]",
      "10 10 [15, 30]",
      "10 20 [25, 60]",
      "20 25 [25, 60]"
],
    correctAnswer: "20 20 [25, 60]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2839).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20
20
[25,60]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2841",
    title: "JS Challenge #2841",
    difficulty: "medium",
    category: "basics",
    code: `const x = 5;const y = 10;const obj = {  x,  y,  z: x + y,  calculate() {    return this.x * this.y;  },  [x + y]: 'computed'};console.log(obj.calculate() + obj[15] + obj.z);`,
    options: [
      "NaN",
      "50computed15",
      "50computedundefined",
      "50"
],
    correctAnswer: "50computed15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2841).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`50computed15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2843",
    title: "JS Challenge #2843",
    difficulty: "medium",
    category: "basics",
    code: `const curry = (fn) => {  return function curried(...args) {    if (args.length >= fn.length) {      return fn.apply(this, args);    }    return (...nextArgs) => curried(...args, ...nextArgs);  };};const multiply = (a, b, c) => a * b * c;const curriedMultiply = curry(multiply);const step1 = curriedMultiply(2);const step2 = step1(3);const result = step2(4);console.log(result);`,
    options: [
      "function",
      "9",
      "24",
      "undefined"
],
    correctAnswer: "24",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2843).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`24\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2845",
    title: "JS Challenge #2845",
    difficulty: "medium",
    category: "basics",
    code: `const a = { x: 1 };const b = a;const c = { x: 1 };b.x = 2;const d = b;d.x = 3;console.log(a.x);console.log(b.x);console.log(c.x);console.log(a === b);console.log(a === c);`,
    options: [
      "2 2 1 false false",
      "3 3 1 true false",
      "1 2 1 true false",
      "3 3 3 true true"
],
    correctAnswer: "3 3 1 true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2845).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
3
1
true
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2848",
    title: "JS Challenge #2848",
    difficulty: "medium",
    category: "basics",
    code: `class Subject {  constructor() {    this.observers = [];  }  attach(observer) {    this.observers.push(observer);  }  notify(data) {    this.observers.forEach(obs => obs.update(data));  }}const subject = new Subject();subject.attach({ update: (d) => console.log(d * 2) });subject.attach({ update: (d) => console.log(d + 5) });subject.notify(10);`,
    options: [
      "20 25",
      "10 15",
      "15 20",
      "20 15"
],
    correctAnswer: "20 15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2848).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20
15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2851",
    title: "JS Challenge #2851",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2, c: 3 };Object.defineProperty(obj, 'd', {   value: 4,   enumerable: false });const entries = Object.entries(obj);const keys = Object.keys(obj);const values = Object.values(obj);console.log(entries.length + keys.length + values.length);`,
    options: [
      "6",
      "12",
      "9",
      "10"
],
    correctAnswer: "9",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2851).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`9\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2855",
    title: "JS Challenge #2855",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(type) {  this.type = type;}Vehicle.prototype.wheels = 4;Vehicle.prototype.getInfo = function() {  return \`\${this.type}: \${this.wheels}\`;};const car = new Vehicle('Car');const bike = Object.create(car);bike.type = 'Bike';bike.wheels = 2;console.log(car.getInfo() + ' | ' + bike.getInfo());`,
    options: [
      "Car: 4 | Bike: 2",
      "Car: 4 | Bike: undefined",
      "TypeError: bike.getInfo is not a function",
      "Car: 4 | undefined: 2"
],
    correctAnswer: "Car: 4 | Bike: 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2855).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Car: 4 | Bike: 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2819",
    title: "JS Challenge #2819",
    difficulty: "medium",
    category: "basics",
    code: `const original = {  name: 'Sarah',  hobbies: ['reading', 'coding'],  address: { city: 'Portland', zip: 97201 }};const shallow = { ...original };const deep = JSON.parse(JSON.stringify(original));shallow.name = 'Emma';shallow.hobbies.push('hiking');shallow.address.city = 'Seattle';deep.hobbies.push('swimming');deep.address.zip = 98101;console.log(original.hobbies.length, original.address.city);`,
    options: [
      "2 Portland",
      "3 Seattle",
      "3 Portland",
      "2 Seattle"
],
    correctAnswer: "3 Seattle",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2819).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 Seattle\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2822",
    title: "JS Challenge #2822",
    difficulty: "medium",
    category: "basics",
    code: `class SimpleObservable {  constructor(subscribeFn) {    this.subscribeFn = subscribeFn;  }    subscribe(observer) {    return this.subscribeFn(observer);  }}const obs = new SimpleObservable(observer => {  observer.next('first');  observer.next('second');  observer.complete();});const results = [];obs.subscribe({  next: val => results.push(val),  complete: () => results.push('done')});console.log(results.join('-'));`,
    options: [
      "first-second-done",
      "first-second-complete",
      "first-done-second",
      "done-first-second"
],
    correctAnswer: "first-second-done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2822).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`first-second-done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2825",
    title: "JS Challenge #2825",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3];const obj = { valueOf: () => 4, toString: () => '5' };const result1 = arr + obj;const result2 = +obj;const result3 = String(obj);const result4 = obj == 4;const result5 = obj === 4;console.log(\`\${result1}|\${result2}|\${result3}|\${result4}|\${result5}\`);const weird = [] + [] + 'hello';const weirder = [] + {} + [];const weirdest = {} + [] + {};console.log(\`\${weird}|\${weirder}|\${weirdest}\`);const final = !!'0' + !!'' + !!null + !!undefined;console.log(final);`,
    options: [
      "1,2,3,4|4|5|true|false hello|[object Object]|[object Object][object Object] 2",
      "1,2,34|4|5|true|false hello|[object Object]|[object Object][object Object] 1",
      "1,2,35|5|5|false|false hello|[object Object]|[object Object][object Object] 1",
      "1,2,34|4|4|true|false hello|[object Object]|[object Object][object Object] 1"
],
    correctAnswer: "1,2,34|4|5|true|false hello|[object Object]|[object Object][object Object] 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2825).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1,2,34|4|5|true|false
hello|[object Object]|[object Object][object Object]
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2828",
    title: "JS Challenge #2828",
    difficulty: "medium",
    category: "basics",
    code: `const data = '{"users": [{"name": "Sarah", "age": 25}, {"name": "Mike", "age": null}]}';try {  const parsed = JSON.parse(data);  const result = parsed.users.map(user => {    return user.age ?? 'unknown';  });  console.log(result.join(' - '));} catch (error) {  console.log('Parse error occurred');}const invalidJson = '{"name": "John", age: 30}';try {  JSON.parse(invalidJson);  console.log('Success');} catch {  console.log('Invalid');}`,
    options: [
      "Parse error occurred, Invalid",
      "25 - null, Success",
      "25 - unknown",
      "25 - unknown, Invalid"
],
    correctAnswer: "25 - unknown",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2828).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`25 - unknown
Invalid\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2830",
    title: "JS Challenge #2830",
    difficulty: "medium",
    category: "basics",
    code: `class Logger {  log(msg) {    return \`[LOG]: \${msg}\`;  }}class Formatter {  format(text) {    return text.toUpperCase();  }}class Service {  constructor(logger, formatter) {    this.logger = logger;    this.formatter = formatter;  }    process(data) {    const formatted = this.formatter.format(data);    return this.logger.log(formatted);  }}const service = new Service(new Logger(), new Formatter());console.log(service.process('hello world'));`,
    options: [
      "[LOG]: HELLO WORLD",
      "HELLO WORLD",
      "hello world",
      "[LOG]: hello world"
],
    correctAnswer: "[LOG]: HELLO WORLD",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2830).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[LOG]: HELLO WORLD\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2832",
    title: "JS Challenge #2832",
    difficulty: "medium",
    category: "basics",
    code: `let obj1 = { name: 'Sarah' };let obj2 = { name: 'Mike' };obj1.ref = obj2;obj2.ref = obj1;let weakRef = new WeakRef(obj1);let registry = new FinalizationRegistry((value) => {  console.log(\`Cleanup: \${value}\`);});registry.register(obj1, 'obj1-cleaned');obj1 = null;obj2 = null;console.log(weakRef.deref()?.name || 'undefined');console.log('Script completed');`,
    options: [
      "Sarah Script completed",
      "undefined Script completed Cleanup: obj1-cleaned",
      "Sarah Script completed Cleanup: obj1-cleaned",
      "undefined Script completed"
],
    correctAnswer: "Sarah Script completed",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2832).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah
Script completed\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2834",
    title: "JS Challenge #2834",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  constructor() {    this.events = {};  }    on(event, callback) {    this.events[event] = this.events[event] || [];    this.events[event].push(callback);    return this;  }    emit(event, data) {    if (this.events[event]) {      this.events[event].forEach(cb => cb(data));    }    return this;  }}const emitter = new EventEmitter();emitter.on('test', x => console.log(x * 2))       .on('test', x => console.log(x + 5))       .emit('test', 10);`,
    options: [
      "15 20",
      "20 15",
      "25",
      "10 10"
],
    correctAnswer: "20 15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2834).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20
15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2798",
    title: "JS Challenge #2798",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');setTimeout(() => console.log('2'), 0);Promise.resolve().then(() => console.log('3'));queueMicrotask(() => console.log('4'));setTimeout(() => {  console.log('5');  Promise.resolve().then(() => console.log('6'));}, 0);console.log('7');`,
    options: [
      "1 7 3 4 2 5 6",
      "1 7 3 4 5 2 6",
      "1 7 2 3 4 5 6",
      "1 3 4 7 2 5 6"
],
    correctAnswer: "1 7 3 4 2 5 6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2798).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
3
4
2
5
6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2804",
    title: "JS Challenge #2804",
    difficulty: "medium",
    category: "basics",
    code: `const Flyable = {  fly() { return 'flying'; }};const Swimmable = {  swim() { return 'swimming'; }};function applyMixins(target, ...mixins) {  mixins.forEach(mixin => {    Object.assign(target.prototype, mixin);  });}class Bird {}class Fish {}applyMixins(Bird, Flyable, Swimmable);applyMixins(Fish, Swimmable);const eagle = new Bird();const shark = new Fish();console.log(eagle.swim());console.log(shark.fly?.() || 'undefined method');`,
    options: [
      "swimming undefined method",
      "flying swimming",
      "undefined method swimming",
      "swimming flying"
],
    correctAnswer: "swimming undefined method",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2804).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`swimming
undefined method\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2809",
    title: "JS Challenge #2809",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof myFunction);console.log(typeof myVar);console.log(typeof myLet);console.log(typeof myConst);var myVar = 'hello';let myLet = 'world';const myConst = 'test';function myFunction() {  return 'hoisted';}console.log(myFunction());console.log(myVar);`,
    options: [
      "function undefined undefined undefined hoisted hello",
      "undefined undefined undefined undefined undefined hello",
      "ReferenceError: Cannot access 'myLet' before initialization",
      "function undefined ReferenceError ReferenceError hoisted hello"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2809).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Cannot access 'myLet' before initialization\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2816",
    title: "JS Challenge #2816",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    settings: {      theme: 'dark',      notifications: null    }  }};const result1 = user?.profile?.settings?.theme;const result2 = user?.profile?.settings?.notifications?.email;const result3 = user?.profile?.preferences?.language ?? 'en';const result4 = user?.profile?.settings?.notifications?.push?.('test');console.log(result1, result2, result3, result4);`,
    options: [
      "dark undefined en undefined",
      "dark undefined en null",
      "undefined undefined en undefined",
      "dark null en undefined"
],
    correctAnswer: "dark undefined en undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2816).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`dark undefined en undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2779",
    title: "JS Challenge #2779",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  constructor() {    this.events = {};  }    on(event, callback) {    this.events[event] = this.events[event] || [];    this.events[event].push(callback);    return this;  }    emit(event, data) {    if (this.events[event]) {      this.events[event].forEach(cb => cb(data));    }    return this;  }}class Logger {  log(msg) { console.log(\`[LOG]: \${msg}\`); }}class DataProcessor {  constructor(emitter, logger) {    this.emitter = emitter;    this.logger = logger;    this.emitter.on('process', (data) => {      this.logger.log(data.toUpperCase());    });  }    process(data) {    this.emitter.emit('process', data);  }}const emitter = new EventEmitter();const logger = new Logger();const processor = new DataProcessor(emitter, logger);processor.process('hello world');emitter.emit('process', 'composition rocks');`,
    options: [
      "[LOG]: HELLO WORLD [LOG]: COMPOSITION ROCKS",
      "[LOG]: COMPOSITION ROCKS [LOG]: hello world",
      "[LOG]: composition rocks [LOG]: HELLO WORLD",
      "[LOG]: hello world [LOG]: composition rocks"
],
    correctAnswer: "[LOG]: HELLO WORLD [LOG]: COMPOSITION ROCKS",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2779).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[LOG]: HELLO WORLD
[LOG]: COMPOSITION ROCKS\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2782",
    title: "JS Challenge #2782",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { count: 0 };const arr = [obj, obj, obj];function increment(item) {  item.count++;  return item;}const results = arr.map(increment);console.log(obj.count);console.log(results[0] === results[1]);console.log(results.length);console.log(arr[0].count);`,
    options: [
      "3 false 3 3",
      "1 false 3 1",
      "3 true 3 3",
      "0 false 3 0"
],
    correctAnswer: "3 true 3 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2782).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
true
3
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2786",
    title: "JS Challenge #2786",
    difficulty: "medium",
    category: "basics",
    code: `const data = '{"name":"Sarah","age":25,"skills":["JavaScript","Python"]}'const parsed = JSON.parse(data)const stringified = JSON.stringify(parsed, null, 0)const reparsed = JSON.parse(stringified)try {  const invalid = '{name:"John","incomplete":}'  JSON.parse(invalid)} catch (e) {  console.log(e.name)}console.log(typeof parsed.age)console.log(reparsed.skills.length)console.log(JSON.stringify({a: undefined, b: null, c: 0}))`,
    options: [
      "SyntaxError number 2 {\"b\":null,\"c\":0}",
      "TypeError string 2 {\"a\":undefined,\"b\":null,\"c\":0}",
      "SyntaxError number 2 {\"a\":null,\"b\":null,\"c\":0}",
      "ReferenceError number 2 {\"b\":null,\"c\":0}"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2786).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected token 'const'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2789",
    title: "JS Challenge #2789",
    difficulty: "medium",
    category: "basics",
    code: `const user = { name: 'Sarah', age: 28 };const greeting = 'Hello';const template = \`\${greeting}, \${user.name}! You are \${user.age} years old.\`;function createMessage(strings, ...values) {  return strings.reduce((result, string, i) => {    return result + string + (values[i] ? \`[\${values[i]}]\` : '');  }, '');}const tagged = createMessage\`Welcome \${user.name}, age: \${user.age}!\`;console.log(template);console.log(tagged);`,
    options: [
      "Hello, Sarah! You are 28 years old. Welcome Sarah, age: 28!",
      "Hello, Sarah! You are 28 years old. Welcome [Sarah], age: [28]",
      "Hello, Sarah! You are 28 years old. Welcome [Sarah], age: [28]!",
      "Hello, undefined! You are undefined years old. Welcome [Sarah], age: [28]!"
],
    correctAnswer: "Hello, Sarah! You are 28 years old. Welcome [Sarah], age: [28]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2789).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, Sarah! You are 28 years old.
Welcome [Sarah], age: [28]!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2792",
    title: "JS Challenge #2792",
    difficulty: "medium",
    category: "basics",
    code: `const wm = new WeakMap();const obj1 = { name: 'first' };const obj2 = { name: 'second' };wm.set(obj1, 'value1');wm.set(obj2, 'value2');const keys = [];for (let key of wm) {  keys.push(key);}console.log(keys.length);console.log(wm.has(obj1));console.log(wm.get(obj2));`,
    options: [
      "TypeError: wm is not iterable",
      "2 true value2",
      "undefined false undefined",
      "0 true value2"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2792).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: wm is not iterable\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2795",
    title: "JS Challenge #2795",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Sarah', age: 25 };const handler = {  get(obj, prop) {    if (prop === 'info') {      return \`\${obj.name} is \${obj.age}\`;    }    return Reflect.get(obj, prop);  },  has(obj, prop) {    return prop !== 'age' && Reflect.has(obj, prop);  }};const proxy = new Proxy(target, handler);console.log(proxy.info);console.log('age' in proxy);console.log('name' in proxy);`,
    options: [
      "Sarah is 25, true, false",
      "Sarah is 25, false, true",
      "undefined, false, true",
      "Sarah is 25, false, false"
],
    correctAnswer: "Sarah is 25, true, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2795).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah is 25
false
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2759",
    title: "JS Challenge #2759",
    difficulty: "medium",
    category: "basics",
    code: `try {  const obj = null;  obj.property = 'value';} catch (e) {  console.log(e.name);}try {  undeclaredVariable;} catch (e) {  console.log(e.name);}try {  JSON.parse('invalid json');} catch (e) {  console.log(e.name);}`,
    options: [
      "ReferenceError TypeError SyntaxError",
      "SyntaxError ReferenceError TypeError",
      "TypeError SyntaxError ReferenceError",
      "TypeError ReferenceError SyntaxError"
],
    correctAnswer: "TypeError ReferenceError SyntaxError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2759).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`TypeError
ReferenceError
SyntaxError\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2762",
    title: "JS Challenge #2762",
    difficulty: "medium",
    category: "basics",
    code: `const source = {  value: 1,  subscribers: new Set(),  subscribe(fn) {    this.subscribers.add(fn);    return () => this.subscribers.delete(fn);  },  next(newValue) {    this.value = newValue;    this.subscribers.forEach(fn => fn(this.value));  }};const mapped = {  value: undefined,  source,  transform: x => x * 2,  init() {    this.source.subscribe(val => {      this.value = this.transform(val);      console.log(\`Mapped: \${this.value}\`);    });  }};mapped.init();source.next(3);source.next(5);console.log(\`Final: \${mapped.value}\`);source.next(2);`,
    options: [
      "Mapped: 6 Mapped: 10 Mapped: 4 Final: 10",
      "Final: 10 Mapped: 4",
      "Mapped: 6 Mapped: 10 Final: 10 Mapped: 4",
      "Mapped: 6 Final: 10 Mapped: 10 Mapped: 4"
],
    correctAnswer: "Final: 10 Mapped: 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2762).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Mapped: 6
Mapped: 10
Final: 10
Mapped: 4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2765",
    title: "JS Challenge #2765",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'John', age: 30 };const handler = {  get(obj, prop) {    if (prop in obj) {      return \`[\${obj[prop]}]\`;    }    return \`missing: \${prop}\`;  },  set(obj, prop, value) {    obj[prop] = value.toUpperCase();    return true;  }};const proxy = new Proxy(target, handler);proxy.city = 'paris';console.log(proxy.name);console.log(proxy.city);console.log(proxy.country);`,
    options: [
      "John PARIS undefined",
      "[John] [PARIS] undefined",
      "[John] [paris] missing: country",
      "[John] [PARIS] missing: country"
],
    correctAnswer: "[John] [paris] missing: country",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2765).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[John]
[PARIS]
missing: country\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2769",
    title: "JS Challenge #2769",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    settings: {      theme: 'dark'    }  }};const getTheme = (obj) => obj?.profile?.settings?.theme ?? 'light';const getLanguage = (obj) => obj?.profile?.settings?.language ?? 'en';const getNotifications = (obj) => obj?.profile?.notifications?.enabled ?? true;console.log(getTheme(user));console.log(getLanguage(user));console.log(getNotifications(user));console.log(getTheme(null));`,
    options: [
      "dark, en, true, undefined",
      "dark, en, true, light",
      "dark, undefined, true, undefined",
      "dark, en, undefined, light"
],
    correctAnswer: "dark, en, true, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2769).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`dark
en
true
light\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2771",
    title: "JS Challenge #2771",
    difficulty: "medium",
    category: "basics",
    code: `const moduleMap = new Map();async function loadModule(name) {  if (moduleMap.has(name)) {    return moduleMap.get(name);  }    const module = await Promise.resolve({    default: () => \`Module \${name} loaded\`,    version: '1.0.0'  });    moduleMap.set(name, module);  return module;}loadModule('auth').then(m => console.log(m.default()));loadModule('auth').then(m => console.log(m.version));loadModule('db').then(m => console.log(m.default()));`,
    options: [
      "Module db loaded 1.0.0 Module auth loaded",
      "undefined undefined undefined",
      "Module auth loaded 1.0.0 Module db loaded",
      "Module auth loaded Module auth loaded Module db loaded"
],
    correctAnswer: "Module auth loaded 1.0.0 Module db loaded",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2771).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Module auth loaded
1.0.0
Module db loaded\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2773",
    title: "JS Challenge #2773",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment: () => ++count,    decrement: () => --count,    getValue: () => count  };}const counter1 = createCounter();const counter2 = createCounter();counter1.increment();counter1.increment();counter2.increment();console.log(counter1.getValue(), counter2.getValue());counter1.decrement();console.log(counter1.getValue(), counter2.getValue());`,
    options: [
      "1 1 0 0",
      "2 1 1 0",
      "2 1 1 1",
      "3 2 2 1"
],
    correctAnswer: "2 1 1 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2773).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2 1
1 1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2775",
    title: "JS Challenge #2775",
    difficulty: "medium",
    category: "basics",
    code: `const wm = new WeakMap();const obj1 = { name: 'first' };const obj2 = { name: 'second' };const obj3 = obj1;wm.set(obj1, 'value1');wm.set(obj2, 'value2');wm.set(obj3, 'value3');console.log(wm.get(obj1));console.log(wm.get(obj2));console.log(wm.get(obj3));console.log(wm.has(obj1));console.log(wm.size);`,
    options: [
      "value3 value2 value3 true 3",
      "value3 value2 value3 true undefined",
      "value1 value2 value1 true undefined",
      "value1 value2 value3 true 2"
],
    correctAnswer: "value3 value2 value3 true undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2775).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value3
value2
value3
true
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2740",
    title: "JS Challenge #2740",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  return Promise.resolve('data');}async function processData() {  const result = await fetchData();  console.log('Processing:', result);  return result.toUpperCase();}const promise = processData();console.log('Promise:', promise);promise.then(value => {  console.log('Final:', value);});`,
    options: [
      "Processing: data Promise: Promise { <pending> } Final: DATA",
      "Promise: Promise { <pending> } Processing: data Final: DATA",
      "Promise: Promise { <pending> } Final: DATA Processing: data",
      "Processing: data Final: DATA Promise: Promise { <pending> }"
],
    correctAnswer: "Processing: data Promise: Promise { <pending> } Final: DATA",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2740).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Promise: {}
Processing: data
Final: DATA\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2742",
    title: "JS Challenge #2742",
    difficulty: "medium",
    category: "basics",
    code: `class DataProcessor {  constructor(transform) {    this.transform = transform;  }    process(data) {    return this.transform(data);  }}const multiply = x => x * 2;const addTen = x => x + 10;const toString = x => \`Result: \${x}\`;const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);const processor = new DataProcessor(compose(toString, addTen, multiply));console.log(processor.process(5));`,
    options: [
      "5",
      "Result: 20",
      "Result: 25",
      "Result: 30"
],
    correctAnswer: "Result: 20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2742).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Result: 20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2745",
    title: "JS Challenge #2745",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Sarah', age: 25 };const handler = {  get(obj, prop) {    if (prop in obj) {      return obj[prop].toString().toUpperCase();    }    return \`Property \${prop} not found\`;  },  set(obj, prop, value) {    obj[prop] = value * 2;    return true;  }};const proxy = new Proxy(target, handler);proxy.salary = 50000;console.log(proxy.name);console.log(proxy.age);console.log(proxy.salary);console.log(proxy.city);`,
    options: [
      "SARAH 25 100000 Property city not found",
      "SARAH 25 50000 Property city not found",
      "Sarah 25 50000 undefined",
      "Sarah age salary city"
],
    correctAnswer: "SARAH 25 100000 Property city not found",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2745).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`SARAH
25
100000
Property city not found\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2747",
    title: "JS Challenge #2747",
    difficulty: "medium",
    category: "basics",
    code: `function highlight(strings, ...values) {  return strings.reduce((result, string, i) => {    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';    return result + string + value;  }, '');}const name = 'Sarah';const skill = 'React';const template = highlight\`Hello \${name}, you're great at \${skill}!\`;console.log(template);`,
    options: [
      "Hello ${name}, you're great at ${skill}!",
      "Hello <mark>Sarah</mark>, you're great at <mark>React</mark>!",
      "<mark>Hello Sarah, you're great at React!</mark>",
      "Hello Sarah, you're great at React!"
],
    correctAnswer: "Hello <mark>Sarah</mark>, you're great at <mark>React</mark>!",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2747).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello <mark>Sarah</mark>, you're great at <mark>React</mark>!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2749",
    title: "JS Challenge #2749",
    difficulty: "medium",
    category: "basics",
    code: `const str = 'JavaScript';const result1 = str.slice(-6, -2);const result2 = str.substring(-6, -2);const result3 = str.substr(-6, 4);const combined = [result1, result2, result3];const final = combined.map(s => s || 'empty').join(' | ');console.log(final);`,
    options: [
      "Scri | JavaScript | Scri",
      "Script | empty | Script",
      "Scri | empty | Scri",
      "Scri |  | Scri"
],
    correctAnswer: "Scri | empty | Scri",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2749).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Scri | empty | Scri\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2753",
    title: "JS Challenge #2753",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Sarah',  age: 28,  city: 'Boston'};const keys = Object.keys(user);const values = Object.values(user);const entries = Object.entries(user);const result = entries.map(([key, value]) => {  return typeof value === 'string' ? key.toUpperCase() : value * 2;});console.log(result);`,
    options: [
      "['SARAH', 28, 'BOSTON']",
      "['NAME', 56, 'CITY']",
      "[undefined, 56, undefined]",
      "['NAME', 'CITY', 56]"
],
    correctAnswer: "['NAME', 56, 'CITY']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2753).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["NAME",56,"CITY"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2756",
    title: "JS Challenge #2756",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .filter(n => n % 2 === 0)  .map(n => n * 2)  .reduce((acc, n) => acc + n, 0);const original = numbers.slice();original.reverse();const flattened = [[1, 2], [3], [4, 5]].flat();const found = flattened.find(n => n > 3);console.log(result);console.log(original.length);console.log(found);`,
    options: [
      "12 5 3",
      "8 5 4",
      "12 5 4",
      "8 5 5"
],
    correctAnswer: "12 5 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2756).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12
5
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2718",
    title: "JS Challenge #2718",
    difficulty: "medium",
    category: "basics",
    code: `class Observable {  constructor(subscriber) {    this.subscriber = subscriber;  }    subscribe(observer) {    return this.subscriber(observer);  }    map(fn) {    return new Observable(observer => {      return this.subscribe({        next: value => observer.next(fn(value)),        error: err => observer.error(err),        complete: () => observer.complete()      });    });  }}const source = new Observable(observer => {  observer.next(1);  observer.next(2);  observer.complete();});const doubled = source.map(x => x * 2);doubled.subscribe({  next: value => console.log(value),  complete: () => console.log('done')});`,
    options: [
      "1 2 done",
      "2 4 done",
      "undefined undefined done",
      "[object Object] [object Object] done"
],
    correctAnswer: "2 4 done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2718).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
4
done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2721",
    title: "JS Challenge #2721",
    difficulty: "medium",
    category: "basics",
    code: `const a = 9007199254740991n;const b = BigInt(9007199254740991);const c = 9007199254740992;const d = BigInt(9007199254740992);console.log(a === b);console.log(Number(a) === c);console.log(c === Number.MAX_SAFE_INTEGER + 1);console.log(d > a);console.log(typeof (a + 1n));console.log(Number(d) === c);`,
    options: [
      "true true true true bigint true",
      "true false true true bigint true",
      "false true true false number true",
      "true true false true bigint false"
],
    correctAnswer: "true false true true bigint true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2721).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
false
true
true
bigint
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2723",
    title: "JS Challenge #2723",
    difficulty: "medium",
    category: "basics",
    code: `const userInput = "<script>alert('xss')</script>";const sanitized = userInput  .replace(/</g, '<')  .replace(/>/g, '>')  .replace(/"/g, '"')  .replace(/'/g, '&#x27;');const credentials = {  username: 'admin',  password: 'secret123'};const safeLog = (obj) => {  const { password, ...safe } = obj;  return JSON.stringify(safe);};console.log(sanitized);console.log(safeLog(credentials));`,
    options: [
      "<script>alert(\"xss\")</script> {\"username\":\"admin\"}",
      "<script>alert('xss')</script> {\"username\":\"admin\",\"password\":\"secret123\"}",
      "<script>alert(&#x27;xss&#x27;)</script> {\"username\":\"admin\"}",
      "{\"username\":\"admin\"}"
],
    correctAnswer: "<script>alert(&#x27;xss&#x27;)</script> {\"username\":\"admin\"}",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2723).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`<script>alert(&#x27;xss&#x27;)</script>
{"username":"admin"}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2725",
    title: "JS Challenge #2725",
    difficulty: "medium",
    category: "basics",
    code: `const wm = new WeakMap();const obj1 = {};const obj2 = {};const obj3 = obj1;wm.set(obj1, 'first');wm.set(obj2, 'second');wm.set(obj3, 'third');console.log(wm.get(obj1));console.log(wm.get(obj2));console.log(wm.get(obj3));console.log(wm.has(obj1));console.log(wm.size);`,
    options: [
      "third second third true undefined",
      "third second first true 2",
      "first second third true 3",
      "first second first false undefined"
],
    correctAnswer: "third second third true undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2725).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`third
second
third
true
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2727",
    title: "JS Challenge #2727",
    difficulty: "medium",
    category: "basics",
    code: `const data = '{"name": "Maria", "age": 25, "skills": ["JavaScript", "Python"]}';try {  const parsed = JSON.parse(data);  const modified = {    ...parsed,    age: parsed.age + 5,    skills: [...parsed.skills, "TypeScript"]  };    const serialized = JSON.stringify(modified, null, 0);  const reparsed = JSON.parse(serialized);    console.log(reparsed.skills.length);  console.log(typeof reparsed.age);} catch (error) {  console.log('Parse error');}`,
    options: [
      "4, number",
      "2, string",
      "3, string",
      "3, number"
],
    correctAnswer: "4, number",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2727).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
number\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2729",
    title: "JS Challenge #2729",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const pipeline = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);const multiply = (x) => (y) => x * y;const add = (x) => (y) => x + y;const square = (x) => x * x;const transform = pipeline(  multiply(2),  add(3),  square);const result = numbers.map(transform);console.log(result);`,
    options: [
      "[4, 16, 36, 64, 100]",
      "[25, 49, 81, 121, 169]",
      "[16, 36, 64, 100, 144]",
      "[9, 25, 49, 81, 121]"
],
    correctAnswer: "[25, 49, 81, 121, 169]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2729).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[25,49,81,121,169]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2732",
    title: "JS Challenge #2732",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(type) {  this.type = type;}Vehicle.prototype.describe = function() {  return \`This is a \${this.type}\`;};function Car(brand) {  Vehicle.call(this, 'car');  this.brand = brand;}Car.prototype = Object.create(Vehicle.prototype);Car.prototype.constructor = Car;Car.prototype.describe = function() {  return Vehicle.prototype.describe.call(this) + \` made by \${this.brand}\`;};const tesla = new Car('Tesla');console.log(tesla.describe());console.log(tesla.constructor.name);`,
    options: [
      "This is a Tesla made by Tesla Car",
      "This is a car made by Tesla Car",
      "This is a Tesla Vehicle",
      "This is a car made by Tesla Vehicle"
],
    correctAnswer: "This is a car made by Tesla Car",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2732).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`This is a car made by Tesla
Car\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2735",
    title: "JS Challenge #2735",
    difficulty: "medium",
    category: "basics",
    code: `const Maybe = {  of: (value) => ({ value, map: f => value == null ? Maybe.nothing() : Maybe.of(f(value)) }),  nothing: () => ({ value: null, map: () => Maybe.nothing() })};const result = Maybe.of(5)  .map(x => x * 2)  .map(x => x > 15 ? null : x)  .map(x => x + 1)  .map(x => x.toString());console.log(result.value);`,
    options: [
      "undefined",
      "11",
      "null",
      "NaN"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2735).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2696",
    title: "JS Challenge #2696",
    difficulty: "medium",
    category: "basics",
    code: `const multiply = (a) => (b) => (c) => a * b * c;const step1 = multiply(2);const step2 = step1(3);const result1 = step2(4);const partialMult = multiply(5)(6);const result2 = partialMult(7);const directResult = multiply(1)(8)(9);console.log(result1);console.log(result2);console.log(directResult);console.log(typeof step1);console.log(typeof partialMult);`,
    options: [
      "24 210 72 object object",
      "6 18 9 function function",
      "NaN NaN NaN function function",
      "24 210 72 function function"
],
    correctAnswer: "24 210 72 function function",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2696).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`24
210
72
function
function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2699",
    title: "JS Challenge #2699",
    difficulty: "medium",
    category: "basics",
    code: `function mystery(arr, depth = 0) {  if (arr.length <= 1) return arr;    const mid = Math.floor(arr.length / 2);  const left = mystery(arr.slice(0, mid), depth + 1);  const right = mystery(arr.slice(mid), depth + 1);    const result = [];  let i = 0, j = 0;    while (i < left.length && j < right.length) {    result.push(left[i] <= right[j] ? left[i++] : right[j++]);  }    return result.concat(left.slice(i)).concat(right.slice(j));}const arr = [3, 1, 4, 1, 5];console.log(mystery(arr));`,
    options: [
      "[5, 4, 3, 1, 1]",
      "[1, 1, 3, 4, 5]",
      "[1, 3, 1, 4, 5]",
      "[3, 1, 4, 1, 5]"
],
    correctAnswer: "[1, 1, 3, 4, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2699).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,1,3,4,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2702",
    title: "JS Challenge #2702",
    difficulty: "medium",
    category: "basics",
    code: `const ws = new WeakSet();const obj1 = { name: 'first' };const obj2 = { name: 'second' };const obj3 = obj1;ws.add(obj1);ws.add(obj2);ws.add(obj3);console.log(ws.has(obj1));console.log(ws.has(obj3));console.log(ws.has({ name: 'first' }));console.log(ws.size);`,
    options: [
      "true false false undefined",
      "true true false 3",
      "true true true undefined",
      "true true false undefined"
],
    correctAnswer: "true true false undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2702).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
true
false
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2705",
    title: "JS Challenge #2705",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Sarah',  greet: () => {    console.log(\`Hello, \${this.name}\`);  },  sayHi: function() {    const inner = () => {      console.log(\`Hi, \${this.name}\`);    };    inner();  }};obj.greet();obj.sayHi();`,
    options: [
      "Hello, Sarah Hi, undefined",
      "Hello, undefined Hi, Sarah",
      "Hello, undefined Hi, undefined",
      "Hello, Sarah Hi, Sarah"
],
    correctAnswer: "Hello, undefined Hi, Sarah",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2705).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, undefined
Hi, Sarah\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2707",
    title: "JS Challenge #2707",
    difficulty: "medium",
    category: "basics",
    code: `class Observable {  constructor(subscribe) {    this.subscribe = subscribe;  }    map(fn) {    return new Observable(observer => {      return this.subscribe({        next: value => observer.next(fn(value)),        error: err => observer.error(err),        complete: () => observer.complete()      });    });  }}const source = new Observable(observer => {  observer.next(1);  observer.next(2);  observer.complete();});const doubled = source.map(x => x * 2);doubled.subscribe({  next: value => console.log(value),  complete: () => console.log('done')});`,
    options: [
      "2 4 done",
      "2 4 complete",
      "undefined undefined done",
      "1 2 done"
],
    correctAnswer: "2 4 done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2707).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
4
done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2712",
    title: "JS Challenge #2712",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Sarah',  greet() {    return \`Hello, \${this.name}\`;  },  delayedGreet() {    const fn = function() {      return this.greet();    };    return fn.call(this);  }};const result = obj.delayedGreet();console.log(result);`,
    options: [
      "Hello, undefined",
      "TypeError: this.greet is not a function",
      "Hello, Sarah",
      "undefined"
],
    correctAnswer: "Hello, Sarah",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2712).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, Sarah\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2715",
    title: "JS Challenge #2715",
    difficulty: "medium",
    category: "basics",
    code: `class Calculator {  static multiply(a, b) {    return a * b;  }    static add = (a, b) => {    return a + b;  }}class ScientificCalculator extends Calculator {  static multiply(a, b) {    return super.multiply(a, b) * 2;  }}console.log(Calculator.multiply(3, 4));console.log(ScientificCalculator.add(5, 6));console.log(ScientificCalculator.multiply(2, 3));`,
    options: [
      "12 11 6",
      "12 11 24",
      "12 11 12",
      "12 undefined 12"
],
    correctAnswer: "12 11 12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2715).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12
11
12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2676",
    title: "JS Challenge #2676",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');Promise.resolve().then(() => {  console.log('2');  Promise.resolve().then(() => console.log('3'));});Promise.resolve().then(() => {  console.log('4');});setTimeout(() => console.log('5'), 0);console.log('6');`,
    options: [
      "1 2 4 3 6 5",
      "1 6 2 3 4 5",
      "1 6 4 2 3 5",
      "1 6 2 4 3 5"
],
    correctAnswer: "1 6 2 4 3 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2676).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
6
2
4
3
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2679",
    title: "JS Challenge #2679",
    difficulty: "medium",
    category: "basics",
    code: `function processData() {  try {    console.log('processing');    return 'success';  } catch (error) {    console.log('error caught');    return 'failed';  } finally {    console.log('cleanup');  }}const result = processData();console.log('result:', result);`,
    options: [
      "error caught cleanup result: failed",
      "processing cleanup result: success",
      "processing cleanup result: undefined",
      "processing result: success cleanup"
],
    correctAnswer: "processing cleanup result: success",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2679).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`processing
cleanup
result: success\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2682",
    title: "JS Challenge #2682",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  constructor() { this.events = {}; }  on(event, fn) { (this.events[event] ||= []).push(fn); }  emit(event, data) { this.events[event]?.forEach(fn => fn(data)); }}class Logger {  log(msg) { console.log(\`LOG: \${msg}\`); }}class Counter {  constructor() { this.count = 0; }  increment() { this.count++; console.log(this.count); }}function withLogging(target) {  const logger = new Logger();  return new Proxy(target, {    get(obj, prop) {      if (typeof obj[prop] === 'function') {        return function(...args) {          logger.log(\`calling \${prop}\`);          return obj[prop].apply(obj, args);        };      }      return obj[prop];    }  });}const emitter = withLogging(new EventEmitter());const counter = new Counter();emitter.on('tick', () => counter.increment());emitter.emit('tick');emitter.emit('tick');`,
    options: [
      "LOG: on LOG: emit 1 LOG: emit 2",
      "LOG: calling on 1 2 LOG: calling emit LOG: calling emit",
      "calling on calling emit 1 calling emit 2",
      "LOG: calling on LOG: calling emit 1 LOG: calling emit 2"
],
    correctAnswer: "LOG: calling on LOG: calling emit 1 LOG: calling emit 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2682).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`LOG: calling on
LOG: calling emit
1
LOG: calling emit
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2684",
    title: "JS Challenge #2684",
    difficulty: "medium",
    category: "basics",
    code: `class Animal {  constructor(name) {    this.name = name;  }  speak() {    return \`\${this.name} makes a sound\`;  }}class Dog extends Animal {  speak() {    return super.speak() + ' and barks';  }}const pet = new Dog('Rex');console.log(pet.speak());console.log(pet instanceof Animal);console.log(pet.constructor.name);`,
    options: [
      "Rex makes a sound and barks true Dog",
      "Rex barks false Dog",
      "Rex makes a sound and barks true Animal",
      "Rex makes a sound true Dog"
],
    correctAnswer: "Rex makes a sound and barks true Dog",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2684).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Rex makes a sound and barks
true
Dog\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2687",
    title: "JS Challenge #2687",
    difficulty: "medium",
    category: "basics",
    code: `class DataProcessor {  constructor(value) {    this.value = value;  }    transform(fn) {    return new DataProcessor(fn(this.value));  }    getValue() {    return this.value;  }}const multiply = x => x * 2;const add = x => x + 10;const square = x => x * x;const result = new DataProcessor(5)  .transform(multiply)  .transform(add)  .transform(square)  .getValue();console.log(result);`,
    options: [
      "300",
      "100",
      "400",
      "625"
],
    correctAnswer: "400",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2687).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`400\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2689",
    title: "JS Challenge #2689",
    difficulty: "medium",
    category: "basics",
    code: `const Flyable = {  fly() { return 'flying'; }};const Swimmable = {  swim() { return 'swimming'; }};function mixin(Base, ...mixins) {  mixins.forEach(mixin => Object.assign(Base.prototype, mixin));  return Base;}class Bird {}class Fish {}const FlyingFish = mixin(class extends Fish {}, Flyable, Swimmable);const instance = new FlyingFish();console.log(instance.swim());console.log(instance.fly());console.log(instance instanceof Fish);`,
    options: [
      "flying, swimming, false",
      "swimming, flying, true",
      "undefined, undefined, true",
      "swimming, flying, false"
],
    correctAnswer: "flying, swimming, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2689).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`swimming
flying
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2691",
    title: "JS Challenge #2691",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return function(increment = 1) {    count += increment;    return count;  };}const counter1 = createCounter();const counter2 = createCounter();console.log(counter1());console.log(counter1(5));console.log(counter2(3));console.log(counter1());console.log(counter2());`,
    options: [
      "1 6 3 6 3",
      "0 5 3 6 4",
      "1 5 3 6 3",
      "1 6 3 7 4"
],
    correctAnswer: "1 6 3 7 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2691).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
6
3
7
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2693",
    title: "JS Challenge #2693",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3, 4, 5];const obj = { a: 1, b: 2, c: 3 };const result1 = Object.keys(obj).length;const result2 = arr.length;delete obj.b;obj.d = 4;const result3 = Object.keys(obj).length;const result4 = arr.push(6);arr.length = 3;const result5 = arr.length;const result6 = Object.keys(obj).join('');console.log(result1, result2, result3, result4, result5, result6);`,
    options: [
      "2 5 3 6 3 acd",
      "3 5 2 6 3 adc",
      "3 5 3 7 3 acd",
      "3 5 3 6 3 acd"
],
    correctAnswer: "3 5 3 6 3 acd",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2693).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 5 3 6 3 acd\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2656",
    title: "JS Challenge #2656",
    difficulty: "medium",
    category: "basics",
    code: `const sym1 = Symbol('test');const sym2 = Symbol('test');const obj = {  [sym1]: 'value1',  [sym2]: 'value2',  regular: 'value3'};const sym3 = Symbol.for('global');const sym4 = Symbol.for('global');console.log(sym1 === sym2);console.log(sym3 === sym4);console.log(Object.keys(obj).length);console.log(Object.getOwnPropertySymbols(obj).length);`,
    options: [
      "false false 3 0",
      "true false 1 2",
      "false true 1 2",
      "true true 0 2"
],
    correctAnswer: "false true 1 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2656).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
true
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2659",
    title: "JS Challenge #2659",
    difficulty: "medium",
    category: "basics",
    code: `const pattern = /(?<=d)(?=(?:d{3})+(?!d))/g;const str = '1234567890';const result = str.replace(pattern, ',');console.log(result);const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}\$/;const tests = ['Password1', 'password', 'PASSWORD1', 'Pass1'];tests.forEach(test => {  console.log(\`\${test}: \${regex.test(test)}\`);});const capture = /([a-z]+)(d+)/g;const text = 'item123 product456';const matches = [...text.matchAll(capture)];console.log(matches[1][1]);`,
    options: [
      "1,234,567,890 Password1: false password: false PASSWORD1: false Pass1: true 456",
      "1,234,567,890 Password1: true password: false PASSWORD1: false Pass1: false product",
      "1234,567,890 Password1: true password: false PASSWORD1: true Pass1: false product",
      "1234567890 Password1: false password: true PASSWORD1: true Pass1: true item"
],
    correctAnswer: "1,234,567,890 Password1: true password: false PASSWORD1: false Pass1: false product",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2659).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1,234,567,890
Password1: true
password: false
PASSWORD1: false
Pass1: false
product\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2662",
    title: "JS Challenge #2662",
    difficulty: "medium",
    category: "basics",
    code: `let cache = new Map();let obj = { name: 'Emma', age: 28 };function memoize(fn) {  return function(...args) {    const key = JSON.stringify(args);    if (cache.has(key)) {      console.log('Cache hit');      return cache.get(key);    }    const result = fn.apply(this, args);    cache.set(key, result);    return result;  };}const process = memoize((data) => {  console.log('Processing:', data.name);  return data.age * 2;});process(obj);process(obj);obj.age = 30;process(obj);console.log('Cache size:', cache.size);`,
    options: [
      "Processing: Emma Cache hit Cache hit Cache size: 1",
      "Processing: Emma Cache hit Processing: Emma Cache size: 2",
      "Processing: Emma Cache hit Processing: Emma Cache size: 1",
      "Processing: Emma Processing: Emma Cache hit Cache size: 2"
],
    correctAnswer: "Processing: Emma Cache hit Processing: Emma Cache size: 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2662).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Processing: Emma
Cache hit
Processing: Emma
Cache size: 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2664",
    title: "JS Challenge #2664",
    difficulty: "medium",
    category: "basics",
    code: `class CustomError extends Error {  constructor(message, code) {    super(message);    this.name = 'CustomError';    this.code = code;  }}try {  throw new CustomError('Something went wrong', 500);} catch (error) {  console.log(error instanceof Error);  console.log(error instanceof CustomError);  console.log(error.name);  console.log(typeof error.code);}`,
    options: [
      "true, true, CustomError, number",
      "false, false, CustomError, number",
      "true, true, Error, number",
      "true, false, Error, string"
],
    correctAnswer: "true, true, CustomError, number",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2664).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
true
CustomError
number\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2666",
    title: "JS Challenge #2666",
    difficulty: "medium",
    category: "basics",
    code: `class ValidationError extends Error {  constructor(message, code) {    super(message);    this.name = 'ValidationError';    this.code = code;  }}function processData(data) {  try {    if (!data) throw new ValidationError('Data required', 'MISSING_DATA');    return data.toUpperCase();  } catch (error) {    if (error instanceof ValidationError) {      console.log(\`\${error.name}: \${error.message} (\${error.code})\`);    } else {      console.log(\`Unexpected error: \${error.message}\`);    }  }}processData(null);processData(42);`,
    options: [
      "ValidationError: Data required (MISSING_DATA) TypeError: data.toUpperCase is not a function",
      "Error: Data required (MISSING_DATA) TypeError: data.toUpperCase is not a function",
      "MISSING_DATA: Data required Unexpected error: data.toUpperCase is not a function",
      "ValidationError: Data required (MISSING_DATA) Unexpected error: data.toUpperCase is not a function"
],
    correctAnswer: "ValidationError: Data required (MISSING_DATA) Unexpected error: data.toUpperCase is not a function",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2666).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`ValidationError: Data required (MISSING_DATA)
Unexpected error: data.toUpperCase is not a function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2669",
    title: "JS Challenge #2669",
    difficulty: "medium",
    category: "basics",
    code: `class StateMachine {  constructor() {    this.state = 'idle';    this.transitions = {      idle: { start: 'running', reset: 'idle' },      running: { pause: 'paused', stop: 'stopped' },      paused: { resume: 'running', stop: 'stopped' },      stopped: { reset: 'idle' }    };  }    transition(action) {    const nextState = this.transitions[this.state]?.[action];    if (nextState) {      this.state = nextState;      return true;    }    return false;  }}const sm = new StateMachine();console.log(sm.transition('start'));console.log(sm.state);console.log(sm.transition('reset'));console.log(sm.state);`,
    options: [
      "true running true idle",
      "true started false started",
      "true running false running",
      "false idle true idle"
],
    correctAnswer: "true running false running",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2669).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
running
false
running\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2671",
    title: "JS Challenge #2671",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Sarah', age: 25 };const handler = {  get(obj, prop) {    if (prop === 'toString') {      return () => \`Person: \${obj.name}\`;    }    return Reflect.get(obj, prop);  },  has(obj, prop) {    return prop !== 'age' && Reflect.has(obj, prop);  }};const proxy = new Proxy(target, handler);console.log(proxy.name);console.log('age' in proxy);console.log(proxy.toString());`,
    options: [
      "Sarah false [object Object]",
      "Sarah true [object Object]",
      "Sarah false Person: Sarah",
      "undefined false Person: Sarah"
],
    correctAnswer: "Sarah false Person: Sarah",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2671).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah
false
Person: Sarah\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2673",
    title: "JS Challenge #2673",
    difficulty: "medium",
    category: "basics",
    code: `async function processData() {  console.log('Start');    const promise1 = new Promise(resolve => {    console.log('Promise 1 executor');    resolve('Result 1');  });    const promise2 = Promise.resolve('Result 2');  console.log('After promises created');    const result1 = await promise1;  console.log(result1);    const result2 = await promise2;  console.log(result2);    return 'Done';}processData().then(result => console.log(result));`,
    options: [
      "Start Promise 1 executor After promises created Result 1 Result 2 Done",
      "Promise 1 executor Start After promises created Result 1 Result 2 Done",
      "Start Promise 1 executor Result 1 After promises created Result 2 Done",
      "Start After promises created Promise 1 executor Result 1 Result 2 Done"
],
    correctAnswer: "Start Promise 1 executor After promises created Result 1 Result 2 Done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2673).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Promise 1 executor
After promises created
Result 1
Result 2
Done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2638",
    title: "JS Challenge #2638",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');setTimeout(() => console.log('2'), 0);Promise.resolve().then(() => console.log('3'));setTimeout(() => console.log('4'), 0);console.log('5');Promise.resolve().then(() => {  console.log('6');  return Promise.resolve();}).then(() => console.log('7'));queueMicrotask(() => console.log('8'));console.log('9');`,
    options: [
      "1 5 9 2 4 3 6 7 8",
      "1 5 9 3 8 6 7 2 4",
      "1 9 5 3 6 7 8 2 4",
      "1 5 9 3 6 8 7 2 4"
],
    correctAnswer: "1 5 9 3 6 8 7 2 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2638).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
5
9
3
6
8
7
2
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2641",
    title: "JS Challenge #2641",
    difficulty: "medium",
    category: "basics",
    code: `class EventManager {  constructor() {    this.listeners = new Map();  }    addListener(event, callback) {    if (!this.listeners.has(event)) {      this.listeners.set(event, new Set());    }    this.listeners.get(event).add(callback);  }}const manager = new EventManager();const obj = { name: 'Component' };manager.addListener('click', () => console.log(obj.name));obj = null;console.log(manager.listeners.get('click').size);`,
    options: [
      "0",
      "TypeError: Assignment to constant variable.",
      "1",
      "undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2641).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Assignment to constant variable.\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2644",
    title: "JS Challenge #2644",
    difficulty: "medium",
    category: "basics",
    code: `const multiply = (a) => (b) => (c) => a * b * c;const step1 = multiply(2);const step2 = step1(3);const result1 = step2(4);const result2 = multiply(2)(3)(4);const partialMultiply = multiply(5);const result3 = partialMultiply(2)(3);const doubler = multiply(2)(1);const result4 = doubler(7);console.log(result1, result2, result3, result4);`,
    options: [
      "8 24 30 14",
      "24 24 15 7",
      "24 24 30 7",
      "24 24 30 14"
],
    correctAnswer: "24 24 30 14",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2644).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`24 24 30 14\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2647",
    title: "JS Challenge #2647",
    difficulty: "medium",
    category: "basics",
    code: `const moduleCache = new Map();async function loadModule(name) {  if (moduleCache.has(name)) {    return moduleCache.get(name);  }    const module = await Promise.resolve({    default: () => \`Module \${name} loaded\`,    version: '1.0.0'  });    moduleCache.set(name, module);  return module;}const results = [];loadModule('auth').then(m => results.push(m.default()));loadModule('auth').then(m => results.push(m.version));loadModule('utils').then(m => results.push(m.default()));setTimeout(() => console.log(results.join(', ')), 0);`,
    options: [
      "Module auth loaded, 1.0.0, Module utils loaded",
      "Module auth loaded, Module utils loaded, 1.0.0",
      "1.0.0, Module auth loaded, Module utils loaded",
      "Module utils loaded, 1.0.0, Module auth loaded"
],
    correctAnswer: "Module auth loaded, 1.0.0, Module utils loaded",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2647).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Module auth loaded, 1.0.0, Module utils loaded\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2650",
    title: "JS Challenge #2650",
    difficulty: "medium",
    category: "basics",
    code: `const nums = [1, 2, 3, 4, 5];const result = nums  .filter(n => n > 2)  .map(n => n * 2)  .reduce((acc, n) => {    acc.push(n + 1);    return acc;  }, [])  .slice(1);console.log(result);console.log(nums);`,
    options: [
      "[ 9, 11 ] [ 3, 4, 5 ]",
      "[ 7, 9, 11 ] [ 1, 2, 3, 4, 5 ]",
      "[ 9, 11 ] [ 1, 2, 3, 4, 5 ]",
      "[ 6, 8, 10 ] [ 1, 2, 3, 4, 5 ]"
],
    correctAnswer: "[ 9, 11 ] [ 1, 2, 3, 4, 5 ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2650).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[9,11]
[1,2,3,4,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2653",
    title: "JS Challenge #2653",
    difficulty: "medium",
    category: "basics",
    code: `const cache = new Map();function createHandler(id) {  const data = { id, value: new Array(1000).fill(id) };  cache.set(id, data);    return function(action) {    if (action === 'get') return data;    if (action === 'clear') cache.delete(id);  };}const handler1 = createHandler('user-1');const handler2 = createHandler('user-2');handler1('clear');console.log(cache.size);console.log(handler1('get').id);`,
    options: [
      "1, user-1",
      "0, undefined",
      "1, undefined",
      "2, user-1"
],
    correctAnswer: "1, user-1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2653).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
user-1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2618",
    title: "JS Challenge #2618",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');setTimeout(() => console.log('2'), 0);Promise.resolve().then(() => console.log('3'));queueMicrotask(() => console.log('4'));setTimeout(() => console.log('5'), 0);Promise.resolve().then(() => {  console.log('6');  return Promise.resolve();}).then(() => console.log('7'));console.log('8');`,
    options: [
      "1 8 3 4 6 7 2 5",
      "1 8 4 3 6 2 7 5",
      "1 8 3 6 4 7 2 5",
      "1 2 3 4 5 6 7 8"
],
    correctAnswer: "1 8 3 4 6 7 2 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2618).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
8
3
4
6
7
2
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2621",
    title: "JS Challenge #2621",
    difficulty: "medium",
    category: "basics",
    code: `class CustomError extends Error {  constructor(message) {    super(message);    this.name = 'CustomError';  }}try {  try {    throw new CustomError('inner error');  } catch (e) {    console.log(e.name);    throw new Error('outer error');  }} catch (e) {  console.log(e.message);  console.log(e instanceof CustomError);}`,
    options: [
      "CustomError outer error false",
      "CustomError inner error true",
      "Error outer error false",
      "CustomError outer error true"
],
    correctAnswer: "CustomError outer error false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2621).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`CustomError
outer error
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2624",
    title: "JS Challenge #2624",
    difficulty: "medium",
    category: "basics",
    code: `const original = {  name: 'Sarah',  scores: [85, 92, 78],  details: {    age: 25,    city: 'Portland'  }};const copy1 = { ...original };const copy2 = JSON.parse(JSON.stringify(original));copy1.name = 'Emma';copy1.scores.push(95);copy1.details.age = 30;console.log(original.name, original.scores.length, original.details.age);`,
    options: [
      "Emma 3 30",
      "Emma 4 30",
      "Sarah 3 25",
      "Sarah 4 30"
],
    correctAnswer: "Sarah 4 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2624).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah 4 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2627",
    title: "JS Challenge #2627",
    difficulty: "medium",
    category: "basics",
    code: `const createLogger = (prefix) => (message) => \`\${prefix}: \${message}\`;const createCounter = () => {  let count = 0;  return () => ++count;};const withLogging = (fn) => (...args) => {  const result = fn(...args);  console.log(\`Called with: \${args}, Result: \${result}\`);  return result;};const counter = createCounter();const loggedCounter = withLogging(counter);const logger = createLogger('INFO');console.log(loggedCounter());console.log(logger(loggedCounter()));`,
    options: [
      "Called with: , Result: 1 1 INFO: Called with: , Result: 2",
      "Called with: , Result: 1 1 Called with: , Result: 2 INFO: 2",
      "Called with: , Result: 1 1 INFO: Called with: , Result: 2 2",
      "1 Called with: , Result: 1 INFO: 2 Called with: , Result: 2"
],
    correctAnswer: "Called with: , Result: 1 1 Called with: , Result: 2 INFO: 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2627).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Called with: , Result: 1
1
Called with: , Result: 2
INFO: 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2629",
    title: "JS Challenge #2629",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment: () => ++count,    decrement: () => --count,    getValue: () => count  };}const counter1 = createCounter();const counter2 = createCounter();counter1.increment();counter1.increment();counter2.increment();console.log(counter1.getValue() + counter2.getValue());`,
    options: [
      "4",
      "1",
      "3",
      "2"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2629).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2632",
    title: "JS Challenge #2632",
    difficulty: "medium",
    category: "basics",
    code: `const original = {  name: 'Emma',  skills: ['JavaScript', 'Python'],  config: { theme: 'dark', notifications: true }};const copy1 = { ...original };const copy2 = JSON.parse(JSON.stringify(original));const copy3 = Object.assign({}, original);copy1.name = 'Sarah';copy1.skills.push('React');copy1.config.theme = 'light';console.log(original.name);console.log(original.skills.length);console.log(original.config.theme);`,
    options: [
      "Emma, 3, light",
      "Sarah, 2, dark",
      "Emma, 2, dark",
      "Sarah, 3, light"
],
    correctAnswer: "Emma, 3, light",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2632).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Emma
3
light\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2597",
    title: "JS Challenge #2597",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: { c: 2 } };const frozen = Object.freeze(obj);frozen.a = 99;frozen.b.c = 88;frozen.d = 77;const sealed = Object.seal({ x: 10, y: 20 });sealed.x = 30;sealed.z = 40;delete sealed.y;console.log(obj.a, obj.b.c, obj.d);console.log(sealed.x, sealed.y, sealed.z);`,
    options: [
      "99 88 77, 30 20 40",
      "1 88 undefined, 30 20 undefined",
      "1 2 undefined, 10 20 undefined",
      "99 2 77, 30 undefined 40"
],
    correctAnswer: "99 88 77, 30 20 40",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2597).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 88 undefined
30 20 undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2599",
    title: "JS Challenge #2599",
    difficulty: "medium",
    category: "basics",
    code: `class StateMachine {  constructor() {    this.state = 'idle';    this.transitions = {      idle: { start: 'running' },      running: { pause: 'paused', stop: 'idle' },      paused: { resume: 'running', stop: 'idle' }    };  }    transition(action) {    const validTransitions = this.transitions[this.state];    if (validTransitions && validTransitions[action]) {      this.state = validTransitions[action];      return true;    }    return false;  }}const machine = new StateMachine();console.log(machine.transition('pause'));console.log(machine.state);console.log(machine.transition('start'));console.log(machine.state);`,
    options: [
      "true paused false paused",
      "false idle true running",
      "false paused true running",
      "true running false running"
],
    correctAnswer: "false idle true running",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2599).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
idle
true
running\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2601",
    title: "JS Challenge #2601",
    difficulty: "medium",
    category: "basics",
    code: `const userInput = "<script>alert('xss')</script>";const sanitized = userInput.replace(/<script[^>]*>.*?</script>/gi, '');const users = new Map();users.set('admin', { password: 'secret123', role: 'admin' });users.set('guest', { password: 'guest', role: 'user' });function authenticate(username, password) {  const user = users.get(username);  return user && user.password === password ? user.role : null;}const role1 = authenticate('admin', 'secret123');const role2 = authenticate('guest', 'wrong');const role3 = authenticate('hacker', 'secret123');console.log(sanitized);console.log(role1, role2, role3);`,
    options: [
      "'' null null null",
      "admin null null",
      "'' admin null null",
      "<script>alert('xss')</script> admin null null"
],
    correctAnswer: "admin null null",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2601).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`admin null null\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2604",
    title: "JS Challenge #2604",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Sarah',  getName() { return this.name; },  getNameArrow: () => this.name};const { getName, getNameArrow } = obj;const boundGetName = obj.getName.bind(obj);console.log(getName());console.log(getNameArrow());console.log(boundGetName());console.log(obj.getName());console.log(obj.getNameArrow());`,
    options: [
      "undefined undefined Sarah Sarah undefined",
      "Sarah Sarah Sarah Sarah Sarah",
      "Sarah undefined undefined Sarah Sarah",
      "undefined Sarah Sarah Sarah undefined"
],
    correctAnswer: "undefined undefined Sarah Sarah undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2604).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
undefined
Sarah
Sarah
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2607",
    title: "JS Challenge #2607",
    difficulty: "medium",
    category: "basics",
    code: `function processData() {  try {    console.log('start');    throw new Error('oops');    console.log('after throw');  } catch (e) {    console.log('catch');    return 'caught';  } finally {    console.log('finally');  }  console.log('end');}const result = processData();console.log(result);`,
    options: [
      "start catch finally caught",
      "start catch finally end caught",
      "start after throw catch finally caught",
      "start catch end finally caught"
],
    correctAnswer: "start catch finally caught",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2607).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
catch
finally
caught\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2610",
    title: "JS Challenge #2610",
    difficulty: "medium",
    category: "basics",
    code: `function highlight(strings, ...values) {  return strings.reduce((result, string, i) => {    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';    return result + string + value;  }, '');}const name = 'Sarah';const age = 25;const template = highlight\`Hello \${name}, you are \${age} years old!\`;console.log(template);const empty = highlight\`No interpolation here\`;console.log(empty);`,
    options: [
      "Hello Sarah, you are 25 years old! No interpolation here",
      "Hello <mark>Sarah</mark>, you are <mark>25</mark> years old! <mark>No interpolation here</mark>",
      "Hello <mark>Sarah</mark>, you are <mark>25</mark> years old! No interpolation here",
      "<mark>Hello Sarah, you are 25 years old!</mark> <mark>No interpolation here</mark>"
],
    correctAnswer: "Hello <mark>Sarah</mark>, you are <mark>25</mark> years old! No interpolation here",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2610).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello <mark>Sarah</mark>, you are <mark>25</mark> years old!
No interpolation here\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2612",
    title: "JS Challenge #2612",
    difficulty: "medium",
    category: "basics",
    code: `class EventManager {  constructor() {    this.listeners = new Map();  }    addListener(event, callback) {    if (!this.listeners.has(event)) {      this.listeners.set(event, new Set());    }    this.listeners.get(event).add(callback);  }    removeListener(event, callback) {    this.listeners.get(event)?.delete(callback);  }}const manager = new EventManager();const handler = () => console.log('handled');manager.addListener('click', handler);manager.removeListener('click', () => console.log('handled'));console.log(manager.listeners.get('click').size);`,
    options: [
      "0",
      "TypeError: Cannot read properties of undefined of 'size'",
      "1",
      "undefined"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2612).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2577",
    title: "JS Challenge #2577",
    difficulty: "medium",
    category: "basics",
    code: `let obj1 = { name: 'Sarah' };let obj2 = { name: 'Mike' };let obj3 = { ref: obj1 };obj1.circular = obj1;obj2.partner = obj3;obj3.partner = obj2;let weakMap = new WeakMap();weakMap.set(obj1, 'data1');weakMap.set(obj2, 'data2');obj1 = null;obj2 = null;console.log(weakMap.has(obj3.ref));console.log(obj3.partner.name);`,
    options: [
      "false Mike",
      "true undefined",
      "true Mike",
      "false undefined"
],
    correctAnswer: "true Mike",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2577).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
Mike\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2580",
    title: "JS Challenge #2580",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment: () => ++count,    decrement: () => --count,    get: () => count  };}const counter1 = createCounter();const counter2 = createCounter();counter1.increment();counter1.increment();counter2.increment();console.log(counter1.get(), counter2.get());const { increment, get } = counter1;increment();console.log(get());`,
    options: [
      "2 1 3",
      "2 1 4",
      "3 1 4",
      "3 2 3"
],
    correctAnswer: "2 1 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2580).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2 1
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2582",
    title: "JS Challenge #2582",
    difficulty: "medium",
    category: "basics",
    code: `const promise1 = Promise.resolve('first');const promise2 = new Promise(resolve => {  resolve('second');});const promise3 = Promise.resolve().then(() => 'third');async function test() {  console.log('start');    const result1 = await promise1;  console.log(result1);    const result2 = await promise2;  console.log(result2);    const result3 = await promise3;  console.log(result3);    console.log('end');}test();`,
    options: [
      "start first end second third",
      "start end first second third",
      "start first second third end",
      "first second third start end"
],
    correctAnswer: "start first second third end",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2582).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
first
second
third
end\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2585",
    title: "JS Challenge #2585",
    difficulty: "medium",
    category: "basics",
    code: `class EventBus {  constructor() {    this.events = new Map();  }    on(event, callback) {    if (!this.events.has(event)) {      this.events.set(event, []);    }    this.events.get(event).push(callback);  }    emit(event, data) {    if (this.events.has(event)) {      this.events.get(event).forEach(callback => callback(data));    }  }}const bus = new EventBus();bus.on('user', name => console.log(\`Hello \${name}\`));bus.on('user', name => console.log(\`Welcome \${name}\`));bus.emit('user', 'Sarah');bus.emit('admin', 'John');`,
    options: [
      "Hello Sarah Welcome Sarah",
      "Welcome Sarah",
      "Hello Sarah Welcome Sarah Hello John Welcome John",
      "Hello Sarah"
],
    correctAnswer: "Hello Sarah Welcome Sarah",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2585).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello Sarah
Welcome Sarah\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2588",
    title: "JS Challenge #2588",
    difficulty: "medium",
    category: "basics",
    code: `const original = { a: 1, b: { c: 2 } };const shallow = { ...original };const deep = JSON.parse(JSON.stringify(original));shallow.a = 10;shallow.b.c = 20;deep.a = 100;deep.b.c = 200;const frozen = Object.freeze({ x: 1, y: { z: 2 } });frozen.x = 99;frozen.y.z = 99;console.log(original.a, original.b.c, frozen.x, frozen.y.z);`,
    options: [
      "10 2 1 99",
      "1 2 99 99",
      "1 20 1 99",
      "10 20 1 2"
],
    correctAnswer: "1 20 1 99",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2588).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 20 1 99\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2591",
    title: "JS Challenge #2591",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  console.log('1');  return Promise.resolve('data');}async function processData() {  console.log('2');  const result = await fetchData();  console.log('3');  return result;}console.log('4');processData().then(() => console.log('5'));console.log('6');`,
    options: [
      "4 6 2 1 3 5",
      "4 2 6 1 3 5",
      "1 2 3 4 5 6",
      "4 2 1 6 3 5"
],
    correctAnswer: "4 2 1 6 3 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2591).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4
2
1
6
3
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2594",
    title: "JS Challenge #2594",
    difficulty: "medium",
    category: "basics",
    code: `const arr = new Array(1000000).fill(0).map((_, i) => i);const results = [];function method1() {  return arr.filter(x => x % 2 === 0).map(x => x * 2).slice(0, 3);}function method2() {  const result = [];  for (let i = 0; i < arr.length && result.length < 3; i++) {    if (arr[i] % 2 === 0) {      result.push(arr[i] * 2);    }  }  return result;}console.log(method1().join(','));console.log(method2().join(','));`,
    options: [
      "0,2,4",
      "0,4,8 0,4,8",
      "2,4,6",
      "0,4,8"
],
    correctAnswer: "0,4,8 0,4,8",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2594).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0,4,8
0,4,8\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2558",
    title: "JS Challenge #2558",
    difficulty: "medium",
    category: "basics",
    code: `const values = [null, undefined, '', 0, false, NaN];const results = [];for (let val of values) {  results.push({    value: val,    boolean: !!val,    string: String(val),    number: Number(val)  });}console.log(results[2].boolean);console.log(results[3].string);console.log(results[1].number);`,
    options: [
      "false 0 undefined",
      "false 0 NaN",
      "true 0 NaN",
      "false '0' undefined"
],
    correctAnswer: "false 0 NaN",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2558).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
0
NaN\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2561",
    title: "JS Challenge #2561",
    difficulty: "medium",
    category: "basics",
    code: `class StateMachine {  constructor() {    this.state = 'idle';    this.transitions = {      idle: { start: 'running' },      running: { pause: 'paused', stop: 'stopped' },      paused: { resume: 'running', stop: 'stopped' },      stopped: { reset: 'idle' }    };  }    transition(action) {    const next = this.transitions[this.state]?.[action];    if (next) this.state = next;    return this.state;  }}const sm = new StateMachine();console.log(sm.transition('start'));console.log(sm.transition('invalid'));console.log(sm.transition('pause'));console.log(sm.transition('resume'));console.log(sm.transition('stop'));console.log(sm.transition('reset'));`,
    options: [
      "start invalid pause resume stop reset",
      "running running running running stopped stopped",
      "running idle paused running stopped idle",
      "running running paused running stopped idle"
],
    correctAnswer: "running running paused running stopped idle",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2561).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`running
running
paused
running
stopped
idle\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2564",
    title: "JS Challenge #2564",
    difficulty: "medium",
    category: "basics",
    code: `console.log('1');setTimeout(() => console.log('2'), 0);Promise.resolve().then(() => console.log('3'));setTimeout(() => console.log('4'), 0);Promise.resolve().then(() => {  console.log('5');  return Promise.resolve();}).then(() => console.log('6'));console.log('7');`,
    options: [
      "1 7 3 5 6 2 4",
      "1 7 3 5 2 4 6",
      "1 7 2 4 3 5 6",
      "1 3 5 6 7 2 4"
],
    correctAnswer: "1 7 3 5 6 2 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2564).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
3
5
6
2
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2567",
    title: "JS Challenge #2567",
    difficulty: "medium",
    category: "basics",
    code: `const nums = [1, 2, 3];const obj = { a: 1, b: 2, c: 3 };function process(...args) {  const [first, ...rest] = args;  const { a, ...others } = obj;  return { first, rest, a, others };}const result = process(...nums);console.log(result.first);console.log(result.rest.length);console.log(result.others.b);console.log(Object.keys(result.others).join(''));console.log(result.a === nums[0]);`,
    options: [
      "1 3 2 bc true",
      "3 2 2 bc true",
      "1 2 2 bc false",
      "1 2 2 bc true"
],
    correctAnswer: "1 2 2 bc true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2567).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
2
bc
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2569",
    title: "JS Challenge #2569",
    difficulty: "medium",
    category: "basics",
    code: `let obj = { name: 'Sarah', age: 25 };let weakMap = new WeakMap();let map = new Map();weakMap.set(obj, 'weak reference');map.set(obj, 'strong reference');console.log(weakMap.has(obj));console.log(map.has(obj));obj = null;console.log(weakMap.has(null));console.log(map.has(null));console.log(map.size);`,
    options: [
      "true true true true 1",
      "true true false false 1",
      "true true false false 0",
      "false false false false 0"
],
    correctAnswer: "true true false false 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2569).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
true
false
false
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2571",
    title: "JS Challenge #2571",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let [a, b] = [0, 1];  while (true) {    yield a;    [a, b] = [b, a + b];  }}function* takeWhile(generator, predicate) {  for (const value of generator) {    if (!predicate(value)) break;    yield value;  }}const fib = fibonacci();const smallFibs = takeWhile(fib, x => x < 20);console.log([...smallFibs].join(','));`,
    options: [
      "1,1,2,3,5,8,13,21",
      "0,1,1,2,3,5,8,13,21",
      "0,1,1,2,3,5,8,13",
      "0,1,2,3,5,8,13"
],
    correctAnswer: "0,1,1,2,3,5,8,13,21",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2571).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0,1,1,2,3,5,8,13\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2574",
    title: "JS Challenge #2574",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Sarah',  age: 25,  getName() { return this.name; },  getAge: () => this.age};const methods = {  regular: user.getName,  arrow: user.getAge};console.log(methods.regular());console.log(methods.arrow());console.log(user.getName());console.log(user.getAge());`,
    options: [
      "Sarah undefined Sarah 25",
      "undefined undefined Sarah undefined",
      "Sarah 25 Sarah 25",
      "undefined 25 Sarah undefined"
],
    correctAnswer: "undefined undefined Sarah undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2574).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
undefined
Sarah
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2537",
    title: "JS Challenge #2537",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .map(n => n * 2)  .filter(n => n > 5)  .reduce((acc, n, index) => {    acc.sum += n;    acc.indices.push(index);    return acc;  }, { sum: 0, indices: [] });console.log(result.sum);console.log(result.indices);`,
    options: [
      "18 [2, 3, 4]",
      "18 [0, 1, 2]",
      "20 [0, 1, 2]",
      "20 [2, 3, 4]"
],
    correctAnswer: "18 [2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2537).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`24
[0,1,2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2540",
    title: "JS Challenge #2540",
    difficulty: "medium",
    category: "basics",
    code: `function processData(data) {  try {    if (!data) {      throw new TypeError('Data is missing');    }        const result = data.process();    return result;  } catch (error) {    console.log(error instanceof ReferenceError ? 1 :               error instanceof TypeError ? 2 :               error instanceof SyntaxError ? 3 : 4);  }}processData(null);`,
    options: [
      "1",
      "2",
      "undefined",
      "4"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2540).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2544",
    title: "JS Challenge #2544",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Sarah',  getName() {    return this.name;  },  getNameArrow: () => {    return this.name;  }};const getName = obj.getName;const getNameArrow = obj.getNameArrow;console.log(obj.getName());console.log(getName());console.log(getNameArrow());console.log(obj.getNameArrow());`,
    options: [
      "Sarah, undefined, undefined, undefined",
      "Sarah, undefined, Sarah, Sarah",
      "Sarah, Sarah, undefined, undefined",
      "undefined, undefined, undefined, undefined"
],
    correctAnswer: "Sarah, undefined, undefined, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2544).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah
undefined
undefined
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2547",
    title: "JS Challenge #2547",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Maya', age: 25 };const handler = {  get(obj, prop) {    if (prop in obj) {      return obj[prop];    }    return \`Property '\${prop}' not found\`;  },  set(obj, prop, value) {    if (typeof value === 'string') {      obj[prop] = value.toUpperCase();    } else {      obj[prop] = value;    }    return true;  }};const proxy = new Proxy(target, handler);proxy.city = 'tokyo';console.log(proxy.name);console.log(proxy.city);console.log(proxy.country);`,
    options: [
      "Maya TOKYO undefined",
      "MAYA TOKYO Property 'country' not found",
      "Maya tokyo undefined",
      "Maya TOKYO Property 'country' not found"
],
    correctAnswer: "MAYA TOKYO Property 'country' not found",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2547).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Maya
TOKYO
Property 'country' not found\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2550",
    title: "JS Challenge #2550",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .map(x => x * 2)  .filter(x => x > 5)  .reduce((acc, x) => {    acc.push(x.toString());    return acc;  }, [])  .map(x => x + '!')  .join(' | ');console.log(result);console.log(typeof result);`,
    options: [
      "6! | 8! | 10! string",
      "12 | 16 | 20 string",
      "[\"6!\", \"8!\", \"10!\"] object",
      "6! | 8! | 10! object"
],
    correctAnswer: "6! | 8! | 10! string",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2550).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6! | 8! | 10!
string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2553",
    title: "JS Challenge #2553",
    difficulty: "medium",
    category: "basics",
    code: `const data = {  name: '',  age: 0,  city: null,  country: undefined,  isActive: false};const getName = () => data.name || 'Unknown';const getAge = () => data.age ?? 25;const getCity = () => data.city || 'Default City';const getCountry = () => data.country ?? 'Default Country';const getStatus = () => data.isActive || 'inactive';console.log(\`\${getName()}-\${getAge()}-\${getCity()}-\${getCountry()}-\${getStatus()}\`);`,
    options: [
      "Unknown-25-Default City-Default Country-inactive",
      "Unknown-0-Default City-Default Country-inactive",
      "-0--Default Country-false",
      "-25-Default City-Default Country-inactive"
],
    correctAnswer: "Unknown-0-Default City-Default Country-inactive",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2553).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Unknown-0-Default City-Default Country-inactive\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2517",
    title: "JS Challenge #2517",
    difficulty: "medium",
    category: "basics",
    code: `class ChatServer {  constructor() {    this.clients = new Set();    this.messageLog = [];  }    connect(client) {    this.clients.add(client);    return () => this.clients.delete(client);  }    broadcast(message, sender) {    this.messageLog.push(message);    this.clients.forEach(client => {      if (client !== sender) {        client.receive(message);      }    });  }}const server = new ChatServer();const david = { name: 'David', receive: msg => console.log(\`David got: \${msg}\`) };const sarah = { name: 'Sarah', receive: msg => console.log(\`Sarah got: \${msg}\`) };const emma = { name: 'Emma', receive: msg => console.log(\`Emma got: \${msg}\`) };const disconnectDavid = server.connect(david);server.connect(sarah);server.connect(emma);server.broadcast('Hello everyone!', david);disconnectDavid();server.broadcast('Is David still here?', sarah);console.log(server.clients.size);`,
    options: [
      "David got: Hello everyone! Sarah got: Hello everyone! Emma got: Is David still here! 2",
      "Sarah got: Hello everyone! Emma got: Hello everyone! Emma got: Is David still here? 2",
      "Sarah got: Hello everyone! Emma got: Hello everyone! David got: Is David still here? 2",
      "Sarah got: Hello everyone! Emma got: Hello everyone! Sarah got: Is David still here? 1"
],
    correctAnswer: "Sarah got: Hello everyone! Emma got: Hello everyone! Emma got: Is David still here? 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2517).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah got: Hello everyone!
Emma got: Hello everyone!
Emma got: Is David still here?
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2519",
    title: "JS Challenge #2519",
    difficulty: "medium",
    category: "basics",
    code: `class VideoCall {  constructor() {    this.pc = { iceConnectionState: 'new' };    this.streams = [];  }    async connect() {    this.pc.iceConnectionState = 'checking';    await Promise.resolve();    this.pc.iceConnectionState = 'connected';    this.streams.push('remote-video');    return this.pc.iceConnectionState;  }    handleConnectionChange() {    const states = ['new', 'checking', 'connected'];    return states.map(state => {      return this.pc.iceConnectionState === state ? \`Status: \${state}\` : null;    }).filter(Boolean);  }}const call = new VideoCall();call.connect().then(() => {  console.log(call.handleConnectionChange());});`,
    options: [
      "['Status: connected', 'Status: checking', 'Status: new']",
      "[]",
      "['Status: new', 'Status: checking', 'Status: connected']",
      "['Status: connected']"
],
    correctAnswer: "['Status: connected']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2519).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["Status: connected"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2522",
    title: "JS Challenge #2522",
    difficulty: "medium",
    category: "basics",
    code: `const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);const addPrefix = str => \`prefix_\${str}\`;const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);const addSuffix = str => \`\${str}_suffix\`;const process = compose(addSuffix, capitalize, addPrefix);console.log(process('data'));`,
    options: [
      "prefix_Data_suffix",
      "prefix_data_suffix",
      "data_suffix",
      "Prefix_data_suffix"
],
    correctAnswer: "prefix_Data_suffix",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2522).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Prefix_data_suffix\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2525",
    title: "JS Challenge #2525",
    difficulty: "medium",
    category: "basics",
    code: `const Flyable = {  fly() { return \`\${this.name} is flying\`; }};const Swimmable = {  swim() { return \`\${this.name} is swimming\`; }};function createDuck(name) {  return Object.assign({ name }, Flyable, Swimmable);}const duck = createDuck('Quackers');console.log(duck.fly());console.log(duck.swim());console.log(Object.getOwnPropertyNames(duck));`,
    options: [
      "undefined is flying undefined is swimming [ 'name', 'fly', 'swim' ]",
      "Quackers is flying Quackers is swimming [ 'name', 'fly', 'swim' ]",
      "Quackers is flying Quackers is swimming [ 'fly', 'swim', 'name' ]",
      "Quackers is flying Quackers is swimming [ 'name' ]"
],
    correctAnswer: "Quackers is flying Quackers is swimming [ 'name', 'fly', 'swim' ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2525).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Quackers is flying
Quackers is swimming
["name","fly","swim"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2527",
    title: "JS Challenge #2527",
    difficulty: "medium",
    category: "basics",
    code: `class Logger {  constructor(prefix) {    this.prefix = prefix;  }  log(message) {    console.log(\`\${this.prefix}: \${message}\`);  }}class Database {  constructor(logger) {    this.logger = logger;  }  save(data) {    this.logger.log(\`Saving \${data}\`);    return \`\${data}_saved\`;  }}const logger = new Logger('DB');const db = new Database(logger);const result = db.save('user');console.log(result);`,
    options: [
      "user_saved DB: Saving user",
      "DB: Saving user user_saved",
      "DB: Saving user user",
      "Saving user user_saved"
],
    correctAnswer: "DB: Saving user user_saved",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2527).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`DB: Saving user
user_saved\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2529",
    title: "JS Challenge #2529",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Sarah', age: 25 };const handler = {  get(obj, prop) {    if (prop in obj) {      return obj[prop];    }    return \`Property '\${prop}' not found\`;  },  set(obj, prop, value) {    obj[prop] = value.toString().toUpperCase();    return true;  }};const proxy = new Proxy(target, handler);proxy.city = 'boston';console.log(proxy.name);console.log(proxy.city);console.log(proxy.country);`,
    options: [
      "Sarah boston Property 'country' not found",
      "Sarah boston undefined",
      "Sarah BOSTON Property 'country' not found",
      "sarah BOSTON Property 'country' not found"
],
    correctAnswer: "Sarah boston Property 'country' not found",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2529).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sarah
BOSTON
Property 'country' not found\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2533",
    title: "JS Challenge #2533",
    difficulty: "medium",
    category: "basics",
    code: `class Counter {  constructor(max) {    this.max = max;  }    *[Symbol.iterator]() {    let current = 0;    while (current < this.max) {      yield current++;    }  }}const counter = new Counter(3);const result = [...counter, ...counter];console.log(result);`,
    options: [
      "[0, 1, 2]",
      "[0, 1, 2, 0, 1, 2]",
      "[]",
      "[0, 0, 1, 1, 2, 2]"
],
    correctAnswer: "[0, 1, 2, 0, 1, 2]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2533).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,1,2,0,1,2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2495",
    title: "JS Challenge #2495",
    difficulty: "medium",
    category: "basics",
    code: `function getOrder() {  console.log('1');    setTimeout(() => console.log('2'), 0);    Promise.resolve().then(() => {    console.log('3');    Promise.resolve().then(() => console.log('4'));  });    Promise.resolve().then(() => console.log('5'));    console.log('6');}getOrder();`,
    options: [
      "1 6 5 3 4 2",
      "1 6 3 5 4 2",
      "1 6 3 4 5 2",
      "1 3 5 6 4 2"
],
    correctAnswer: "1 6 3 5 4 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2495).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
6
3
5
4
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2498",
    title: "JS Challenge #2498",
    difficulty: "medium",
    category: "basics",
    code: `const scores = [85, 92, 78, 90];  const student = {  name: 'Jordan',  grade: 'A',  ...{ courses: ['Math', 'Science'] },  scores,  average: function() { return this.scores.reduce((a, b) => a + b) / this.scores.length }};const { name, ...details } = student;const [first, ...rest] = scores;console.log(details.scores[0], rest[0]);`,
    options: [
      "undefined 92",
      "undefined undefined",
      "85 92",
      "85 85"
],
    correctAnswer: "85 92",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2498).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`85 92\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2500",
    title: "JS Challenge #2500",
    difficulty: "medium",
    category: "basics",
    code: `function* createCounter() {  let count = 0;  while (true) {    const reset = yield ++count;    if (reset) {      count = 0;    }  }}const counter = createCounter();console.log(counter.next().value);console.log(counter.next().value);console.log(counter.next(true).value);console.log(counter.next().value);`,
    options: [
      "1 2 undefined 1",
      "1 2 1 2",
      "1 2 1 1",
      "1 2 0 1"
],
    correctAnswer: "1 2 1 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2500).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2503",
    title: "JS Challenge #2503",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    const counter = {    increment() {      count++;      return count;    },    getCount() {      return count;    }  };    return counter;}let c1 = createCounter();c1.increment();c1.increment();let c2 = c1;c1 = null;console.log(c2.getCount());`,
    options: [
      "null",
      "undefined",
      "ReferenceError: count is not defined",
      "2"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2503).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2506",
    title: "JS Challenge #2506",
    difficulty: "medium",
    category: "basics",
    code: `const weakSet = new WeakSet();const obj1 = { name: 'First' };const obj2 = { name: 'Second' };const obj3 = obj1;weakSet.add(obj1);weakSet.add(obj2);let result = '';result += weakSet.has(obj1) + ', ';result += weakSet.has(obj3) + ', ';obj2.name = 'Modified';result += weakSet.has(obj2) + ', ';weakSet.delete(obj1);result += weakSet.has(obj3);console.log(result);`,
    options: [
      "true, false, true, true",
      "true, true, true, undefined",
      "true, true, true, false",
      "true, false, true, false"
],
    correctAnswer: "true, true, true, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2506).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true, true, true, false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2509",
    title: "JS Challenge #2509",
    difficulty: "medium",
    category: "basics",
    code: `class LightMachine {  constructor() {    this.states = {      green: { next: 'yellow' },      yellow: { next: 'red' },      red: { next: 'green' }    };    this.currentState = 'green';  }  transition() {    this.currentState = this.states[this.currentState].next;    return this.currentState;  }}const lightMachine = new LightMachine();let result = '';for (let i = 0; i < 5; i++) {  result += lightMachine.transition() + ' ';}console.log(result.trim());`,
    options: [
      "yellow red green yellow red",
      "yellow red green red yellow",
      "red green yellow red green",
      "green yellow red green yellow"
],
    correctAnswer: "yellow red green yellow red",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2509).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`yellow red green yellow red\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2512",
    title: "JS Challenge #2512",
    difficulty: "medium",
    category: "basics",
    code: `async function processValues() {  try {    console.log('Start');    const a = await Promise.resolve('First');    console.log(a);    const b = await Promise.reject('Error');    console.log(b);    return 'Done';  } catch (err) {    console.log(err);    return 'Recovered';  } finally {    console.log('Finally');  }}processValues().then(result => console.log(result));`,
    options: [
      "Start First Error Finally Recovered",
      "Start First Finally Recovered",
      "Start First Error Recovered Finally",
      "Start First Finally Error Recovered"
],
    correctAnswer: "Start First Error Finally Recovered",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2512).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
First
Error
Finally
Recovered\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2475",
    title: "JS Challenge #2475",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    function increment() {    count += 1;    return count;  }    function decrement() {    count -= 1;    return count;  }    return { increment, decrement, value: () => count };}const counter = createCounter();counter.increment();counter.increment();counter.decrement();console.log(counter.value() + counter.increment());`,
    options: [
      "undefined",
      "2 + function increment() { count += 1; return count; }",
      "4",
      "3"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2475).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2478",
    title: "JS Challenge #2478",
    difficulty: "medium",
    category: "basics",
    code: `const memoryLeak = () => {  const cache = new Map();  const weakCache = new WeakMap();    const objKey = { id: 123 };  const data = { name: 'User data', value: 42 };    cache.set(objKey, data);  weakCache.set(objKey, data);    // Simulate removing reference to key  const result = { map: cache.has(objKey), weakMap: weakCache.has(objKey) };  // objKey = null; // This would be an error, as const can't be reassigned    return result;};console.log(memoryLeak());`,
    options: [
      "{ map: false, weakMap: false }",
      "ReferenceError: objKey is not defined",
      "{ map: true, weakMap: false }",
      "{ map: true, weakMap: true }"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2478).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected end of input\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2480",
    title: "JS Challenge #2480",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    return {    increment() {      return ++count;    },    reset() {      const oldCount = count;      count = 0;      return oldCount;    }  };}const counterA = createCounter();const counterB = createCounter();counterA.increment();counterA.increment();counterB.increment();const result = counterA.reset() + counterB.reset();console.log(result);`,
    options: [
      "undefined",
      "NaN",
      "3",
      "2"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2480).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2483",
    title: "JS Challenge #2483",
    difficulty: "medium",
    category: "basics",
    code: `const users = [  { id: 1, name: 'Sarah' },  { id: 2, name: 'Miguel' },  { id: 3, name: 'Jordan' }];const activeUsers = new WeakSet();activeUsers.add(users[0]);activeUsers.add(users[2]);users.splice(1, 1); // Remove Miguellet count = 0;for (const user of users) {  if (activeUsers.has(user)) count++;}console.log(count);`,
    options: [
      "2",
      "1",
      "ReferenceError: users is not defined",
      "TypeError: activeUsers.has is not a function"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2483).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2486",
    title: "JS Challenge #2486",
    difficulty: "medium",
    category: "basics",
    code: `function mystery() {  try {    console.log('A');    throw new Error('Oops');    console.log('B');  } catch (err) {    console.log('C');    return 'D';  } finally {    console.log('E');    return 'F';  }  console.log('G');  return 'H';}console.log(mystery());`,
    options: [
      "A C E D",
      "A C E undefined",
      "A C E G H",
      "A C E F"
],
    correctAnswer: "A C E F",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2486).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
C
E
F\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2489",
    title: "JS Challenge #2489",
    difficulty: "medium",
    category: "basics",
    code: `const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);const addTwo = num => num + 2;const multiplyByThree = num => num * 3;const subtractTen = num => num - 10;const calculate = compose(subtractTen, multiplyByThree, addTwo);console.log(calculate(5));`,
    options: [
      "7",
      "11",
      "((5 + 2) * 3) - 10 = 11",
      "(5 + 2) * 3 - 10 = 11"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2489).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2492",
    title: "JS Challenge #2492",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(wheels) {  this.wheels = wheels;}Vehicle.prototype.getWheels = function() {  return this.wheels;};function Car() {  Vehicle.call(this, 4);  this.doors = 4;}Car.prototype = Object.create(Vehicle.prototype);Car.prototype.constructor = Car;const myCar = new Car();console.log(myCar.getWheels(), myCar instanceof Vehicle);`,
    options: [
      "4 false",
      "4 true",
      "TypeError: myCar.getWheels is not a function",
      "undefined true"
],
    correctAnswer: "4 true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2492).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4 true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2455",
    title: "JS Challenge #2455",
    difficulty: "medium",
    category: "basics",
    code: `const map = new WeakMap();let obj1 = { name: 'user1' };let obj2 = { name: 'user2' };map.set(obj1, 'data for user1');map.set(obj2, 'data for user2');console.log(map.has(obj1));obj1 = null;// After garbage collection runsconsole.log(map.has(obj1));console.log(map.get(obj2));`,
    options: [
      "true ReferenceError: obj1 is not defined",
      "true false data for user2",
      "true false undefined",
      "true false 'data for user2'"
],
    correctAnswer: "true ReferenceError: obj1 is not defined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2455).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2458",
    title: "JS Challenge #2458",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    function increment() {    count++;    return count;  }    function decrement() {    count--;    return count;  }    return { increment, decrement, reset: () => count = 0 };}const counter = createCounter();counter.increment();counter.increment();counter.decrement();const { increment, reset } = counter;increment();reset();increment();console.log(counter.increment());`,
    options: [
      "1",
      "2",
      "3",
      "undefined"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2458).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2461",
    title: "JS Challenge #2461",
    difficulty: "medium",
    category: "basics",
    code: `function processUserData(data) {  try {    if (!data) {      throw new Error('No data provided');    }        if (!data.name) {      throw new TypeError('Name is required');    }        return { success: true, user: data.name };  } catch (err) {    if (err instanceof TypeError) {      return { success: false, reason: 'validation-failed' };    }    return { success: false, reason: 'unknown-error' };  }}console.log(processUserData({}));`,
    options: [
      "TypeError: Name is required",
      "{ success: false, reason: 'validation-failed' }",
      "{ success: false, reason: 'unknown-error' }",
      "{ success: true, user: undefined }"
],
    correctAnswer: "{ success: false, reason: 'validation-failed' }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2461).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"success":false,"reason":"validation-failed"}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2463",
    title: "JS Challenge #2463",
    difficulty: "medium",
    category: "basics",
    code: `const cache = new WeakMap();function expensiveOperation(obj) {  if (cache.has(obj)) {    console.log('Cache hit!');    return cache.get(obj);  }    console.log('Computing result...');  const result = obj.value * 2;  cache.set(obj, result);  return result;}const user = { value: 42 };expensiveOperation(user);expensiveOperation(user);expensiveOperation({ value: 42 });`,
    options: [
      "Computing result... Computing result... Computing result...",
      "Cache hit! Cache hit! Cache hit!",
      "Computing result... Cache hit! Cache hit!",
      "Computing result... Cache hit! Computing result..."
],
    correctAnswer: "Computing result... Cache hit! Computing result...",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2463).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Computing result...
Cache hit!
Computing result...\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2466",
    title: "JS Challenge #2466",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  return 'Data loaded';}async function processData() {  console.log('Starting...');  try {    const result = fetchData();    console.log(result);    console.log(await result);    return 'Processing complete';  } catch (error) {    return 'Error occurred';  } finally {    console.log('Cleanup');  }}processData().then(result => console.log(result));`,
    options: [
      "Starting... Promise { 'Data loaded' } Data loaded Cleanup Processing complete",
      "Starting... Promise { <pending> } Cleanup Processing complete",
      "Starting... Promise { <pending> } Data loaded Cleanup Processing complete",
      "Starting... Data loaded Cleanup Processing complete"
],
    correctAnswer: "Starting... Promise { 'Data loaded' } Data loaded Cleanup Processing complete",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2466).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Starting...
{}
Data loaded
Cleanup
Processing complete\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2469",
    title: "JS Challenge #2469",
    difficulty: "medium",
    category: "basics",
    code: `function outer() {  console.log(innerVar);  console.log(typeof innerFunc);    var innerVar = 42;    function innerFunc() {    return innerVar;  }    let anotherVar = 100;  console.log(typeof anotherVar);}outer();`,
    options: [
      "undefined 'undefined' 'number'",
      "undefined 'function' 'number'",
      "ReferenceError: innerVar is not defined",
      "42 'function' 'number'"
],
    correctAnswer: "undefined 'function' 'number'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2469).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
function
number\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2471",
    title: "JS Challenge #2471",
    difficulty: "medium",
    category: "basics",
    code: `function* rangeGenerator(start, end, step = 1) {  let current = start;  while (current <= end) {    yield current;    current += step;  }}const numbers = rangeGenerator(1, 10, 2);numbers.next();numbers.next();const values = [...numbers];console.log(values);`,
    options: [
      "[5, 7, 9]",
      "[1, 3, 5, 7, 9]",
      "[1, 3]",
      "[3, 5, 7, 9]"
],
    correctAnswer: "[5, 7, 9]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2471).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[5,7,9]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2435",
    title: "JS Challenge #2435",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];const result = numbers  .filter(num => num % 2 === 0)  .map(num => num * 2)  .reduce((acc, curr, idx, arr) => {    if (idx === arr.length - 1) {      return (acc + curr) / arr.length;    }    return acc + curr;  }, 0);console.log(result);`,
    options: [
      "13",
      "12",
      "10.5",
      "11"
],
    correctAnswer: "12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2435).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2438",
    title: "JS Challenge #2438",
    difficulty: "medium",
    category: "basics",
    code: `const cache = new WeakMap();const user1 = { name: 'Alice' };const user2 = { name: 'Bob' };cache.set(user1, { lastLogin: 'yesterday' });cache.set(user2, { lastLogin: 'today' });const result = [];result.push(cache.has(user1));result.push(cache.get(user2).lastLogin);let user3 = { name: 'Charlie' };cache.set(user3, { lastLogin: 'now' });result.push(cache.has(user3));user3 = null; // Removing the reference// Garbage collector might run here in real situationsconst user4 = { name: 'Charlie' }; // Same name, different objectresult.push(cache.has(user4));console.log(result);`,
    options: [
      "[false, 'today', true, false]",
      "[true, 'today', true, false]",
      "[true, undefined, true, false]",
      "[true, 'today', true, true]"
],
    correctAnswer: "[false, 'today', true, false]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2438).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2440",
    title: "JS Challenge #2440",
    difficulty: "medium",
    category: "basics",
    code: `const items = ['apple', 'banana', 'cherry', 'date'];  const result = items  .map(item => item.toUpperCase())  .filter(item => item.length > 5)  .reduce((acc, item, index) => {    return acc + (index === 0 ? '' : '-') + item.slice(0, 3);  }, '');console.log(result);`,
    options: [
      "BANANA-CHERRY-DATE",
      "BAN-CHE",
      "BANANA-CHERRY",
      "BAN-CHE-DAT"
],
    correctAnswer: "BAN-CHE",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2440).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`BAN-CHE\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2443",
    title: "JS Challenge #2443",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];const result = numbers  .filter(n => n % 2 === 0)  .map(n => n * 2)  .reduce((acc, curr, idx, arr) => {    if (idx === arr.length - 1) {      return (acc + curr) / arr.length;    }    return acc + curr;  }, 0);console.log(result);`,
    options: [
      "12",
      "11",
      "11.5",
      "44"
],
    correctAnswer: "12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2443).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2445",
    title: "JS Challenge #2445",
    difficulty: "medium",
    category: "basics",
    code: `const teams = [  { name: 'Warriors', players: ['Curry', 'Thompson'] },  { name: 'Lakers', players: ['James', 'Davis'] }];const newTeams = JSON.parse(JSON.stringify(teams));newTeams[0].players.push('Green');const shallowCopy = [...teams];shallowCopy[1].name = 'Clippers';const freezeTest = Object.freeze({nested: {value: 42}});freezeTest.nested.value = 100;console.log(teams[1].name, teams[0].players.length, freezeTest.nested.value);`,
    options: [
      "Clippers 2 100",
      "Lakers 2 100",
      "Lakers 3 42",
      "Clippers 3 100"
],
    correctAnswer: "Clippers 2 100",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2445).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Clippers 2 100\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2447",
    title: "JS Challenge #2447",
    difficulty: "medium",
    category: "basics",
    code: `let x = 5;function foo() {  console.log(x);  let x = 10;  console.log(x);}foo();`,
    options: [
      "ReferenceError: Cannot access 'x' before initialization",
      "undefined 10",
      "5 ReferenceError: x is not defined",
      "5 10"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2447).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Cannot access 'x' before initialization\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2450",
    title: "JS Challenge #2450",
    difficulty: "medium",
    category: "basics",
    code: `const fruits = ['apple', 'banana', 'cherry'];const newFruits = [...fruits];newFruits.push('date');const user = { name: 'Taylor', age: 30 };const updatedUser = { ...user, age: 31 };user.city = 'Seattle';console.log(fruits.length, newFruits.length, user.city, updatedUser.city);`,
    options: [
      "3 4 undefined undefined",
      "3 3 Seattle undefined",
      "3 4 Seattle undefined",
      "4 4 Seattle Seattle"
],
    correctAnswer: "3 4 Seattle undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2450).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 4 Seattle undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2452",
    title: "JS Challenge #2452",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get(target, prop) {    if (prop in target) {      return target[prop] * 2;    } else {      return \`Property \${prop} not found\`;    }  },  set(target, prop, value) {    if (typeof value === 'number') {      target[prop] = Math.round(value);      return true;    }    return false;  }};const obj = { a: 5, b: 10 };const proxy = new Proxy(obj, handler);proxy.c = 7.8;proxy.d = "hello";console.log(obj.c, proxy.a, proxy.x);`,
    options: [
      "8 10 \"Property x not found\"",
      "8 10 undefined",
      "8 10 Property x not found",
      "7.8 10 Property x not found"
],
    correctAnswer: "8 10 \"Property x not found\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2452).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`8 10 Property x not found\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2418",
    title: "JS Challenge #2418",
    difficulty: "medium",
    category: "basics",
    code: `const templateFn = (strings, ...values) => {  return strings.reduce((result, str, i) => {    const value = values[i] !== undefined ?       (typeof values[i] === 'number' ? values[i] * 2 : values[i]) : '';    return result + str + value;  }, '');};const num = 5;const str = 'world';const result = templateFn\`Hello \${str}, \${num} times \${'!'}\`;console.log(result);`,
    options: [
      "Hello world, 10 times !undefined",
      "Hello world, 5 times !undefined",
      "Hello world, 10 times !",
      "Hello world, 5 times !"
],
    correctAnswer: "Hello world, 10 times !undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2418).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello world, 10 times !\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2421",
    title: "JS Challenge #2421",
    difficulty: "medium",
    category: "basics",
    code: `function processConfig(config) {  const settings = {    timeout: config.timeout ?? 1000,    retries: config.retries ?? 3,    logging: config.logging ?? false,    debug: config.debug || true  };    return settings;}const userConfig = {  timeout: 0,  retries: null,  logging: false,  debug: false};console.log(processConfig(userConfig));`,
    options: [
      "{ timeout: 1000, retries: null, logging: false, debug: true }",
      "{ timeout: 1000, retries: 3, logging: false, debug: false }",
      "{ timeout: 0, retries: 3, logging: false, debug: true }",
      "{ timeout: 0, retries: 3, logging: false, debug: false }"
],
    correctAnswer: "{ timeout: 0, retries: 3, logging: false, debug: true }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2421).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"timeout":0,"retries":3,"logging":false,"debug":true}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2423",
    title: "JS Challenge #2423",
    difficulty: "medium",
    category: "basics",
    code: `const createMathOps = (base) => {  return {    add: (x) => base + x,    multiply: (x) => base * x  };};const createAdvancedMathOps = (base) => {  const basicOps = createMathOps(base);  return {    ...basicOps,    square: () => basicOps.multiply(base),    addThenSquare: (x) => {      const added = basicOps.add(x);      return added * added;    }  };};const calculator = createAdvancedMathOps(5);console.log(calculator.addThenSquare(3));`,
    options: [
      "64",
      "8",
      "64",
      "25"
],
    correctAnswer: "64",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2423).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`64\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2425",
    title: "JS Challenge #2425",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { name: 'Alice', age: 30 };  const handler = {  get(target, prop) {    return prop in target ? target[prop] : \`Property '\${prop}' doesn't exist\`;  }};const proxy = new Proxy(obj, handler);const descriptors = Object.getOwnPropertyDescriptors(obj);Reflect.defineProperty(obj, 'city', {  value: 'New York',  enumerable: false});console.log(proxy.city, proxy.country);`,
    options: [
      "New York Property 'country' doesn't exist",
      "New York undefined",
      "Property 'city' doesn't exist Property 'country' doesn't exist",
      "undefined Property 'country' doesn't exist"
],
    correctAnswer: "New York Property 'country' doesn't exist",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2425).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`New York Property 'country' doesn't exist\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2428",
    title: "JS Challenge #2428",
    difficulty: "medium",
    category: "basics",
    code: `const text = 'Today is 2023-12-31 and tomorrow is 2024-01-01';const dateRegex = /(d{4})-(d{2})-(d{2})/g;let result = '';let match;while ((match = dateRegex.exec(text)) !== null) {  const [fullMatch, year, month, day] = match;  result += \`\${day}/\${month}/\${year.slice(2)} \`;}console.log(result.trim());`,
    options: [
      "31/12/23 01/01/24",
      "2023-12-31 2024-01-01",
      "31/12/2023 01/01/2024",
      "31/12/23"
],
    correctAnswer: "31/12/23 01/01/24",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2428).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`31/12/23 01/01/24\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2432",
    title: "JS Challenge #2432",
    difficulty: "medium",
    category: "basics",
    code: `function outer() {  console.log(typeof inner);  console.log(typeof inner2);    var inner = function() {    return 'Inside inner';  };    function inner2() {    return 'Inside inner2';  }    console.log(typeof inner);  console.log(typeof inner2);}outer();`,
    options: [
      "function function function function",
      "undefined undefined function function",
      "function undefined function function",
      "undefined function function function"
],
    correctAnswer: "undefined function function function",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2432).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
function
function
function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2395",
    title: "JS Challenge #2395",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let [a, b] = [0, 1];  while (true) {    yield a;    [a, b] = [b, a + b];  }}const fib = fibonacci();const result = [];for (let i = 0; i < 4; i++) {  result.push(fib.next().value);}const sum = result.reduce((total, num) => total + num, 0);console.log(sum);`,
    options: [
      "3",
      "2",
      "4",
      "6"
],
    correctAnswer: "4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2395).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2397",
    title: "JS Challenge #2397",
    difficulty: "medium",
    category: "basics",
    code: `const date = new Date('2023-05-15T12:30:00Z');  // A specific UTC dateconst formatter = new Intl.DateTimeFormat('en-US', {  year: 'numeric',  month: 'long',  day: 'numeric',  hour: '2-digit',  minute: '2-digit',  timeZone: 'America/New_York'});const parts = formatter.formatToParts(date);const month = parts.find(part => part.type === 'month').value;const day = parts.find(part => part.type === 'day').value;const hour = parts.find(part => part.type === 'hour').value;console.log(\`\${month} \${day}, at \${hour}\`);`,
    options: [
      "May 15, at 8",
      "May 15, at 08",
      "May 15, at 08 AM",
      "May 15, at 12"
],
    correctAnswer: "May 15, at 8",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2397).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2400",
    title: "JS Challenge #2400",
    difficulty: "medium",
    category: "basics",
    code: `function processData(input) {  try {    if (typeof input !== 'string') {      throw new TypeError('Input must be a string');    }        if (input.length === 0) {      throw new Error('Input cannot be empty');    }        return input.toUpperCase();  } catch (error) {    if (error instanceof TypeError) {      return \`Type error: \${error.message}\`;    }    return \`Error: \${error.message}\`;  }}console.log(processData(''));`,
    options: [
      "Error: Input cannot be empty",
      "undefined",
      "''",
      "Type error: Input must be a string"
],
    correctAnswer: "Error: Input cannot be empty",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2400).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Input cannot be empty\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2403",
    title: "JS Challenge #2403",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Alice',  age: 30};const handler = {  get(target, prop) {    if (prop in target) {      return target[prop];    }    return \`Property '\${prop}' doesn't exist\`;  },  set(target, prop, value) {    if (prop === 'age' && typeof value !== 'number') {      console.log(\`Error: \${value} is not a valid age\`);      return false;    }    target[prop] = value;    return true;  }};const userProxy = new Proxy(user, handler);userProxy.age = '31';userProxy.job = 'Developer';console.log(userProxy.job);`,
    options: [
      "31 is not a valid age Developer",
      "Error: 31 is not a valid age Developer",
      "Error: 31 is not a valid age Property 'job' doesn't exist",
      "Error: 31 is not a valid age undefined"
],
    correctAnswer: "31 is not a valid age Developer",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2403).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: 31 is not a valid age
Developer\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2406",
    title: "JS Challenge #2406",
    difficulty: "medium",
    category: "basics",
    code: `function process(data) {  try {    if (!data) {      throw new TypeError('No data provided');    }        if (Array.isArray(data)) {      return data.map(item => item * 2);    }        if (typeof data === 'object') {      return Object.keys(data);    }        return data.toString();  } catch (error) {    if (error instanceof TypeError) {      return 'Type error occurred';    }    return 'Unknown error';  }}console.log(process(null));`,
    options: [
      "null",
      "TypeError: Cannot read properties of null (reading 'toString')",
      "Type error occurred",
      "Unknown error"
],
    correctAnswer: "Type error occurred",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2406).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Type error occurred\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2408",
    title: "JS Challenge #2408",
    difficulty: "medium",
    category: "basics",
    code: `function Animal(name) {  this.name = name;}Animal.prototype.speak = function() {  return \`\${this.name} makes a noise.\`;};function Dog(name) {  Animal.call(this, name);}Dog.prototype = Object.create(Animal.prototype);Dog.prototype.constructor = Dog;Dog.prototype.speak = function() {  return \`\${this.name} barks.\`;};const animal = new Animal('Rover');const dog = new Dog('Rex');console.log(dog instanceof Animal, dog.speak(), animal.speak(), Dog.prototype.isPrototypeOf(dog));`,
    options: [
      "true 'Rex barks.' 'Rover makes a noise.' true",
      "false 'Rex barks.' 'Rover makes a noise.' true",
      "true 'Rex makes a noise.' 'Rover makes a noise.' true",
      "true 'Rex barks.' 'Rover makes a noise.' false"
],
    correctAnswer: "true 'Rex barks.' 'Rover makes a noise.' true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2408).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true Rex barks. Rover makes a noise. true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2410",
    title: "JS Challenge #2410",
    difficulty: "medium",
    category: "basics",
    code: `function highlight(strings, ...values) {  return strings.reduce((result, str, i) => {    const value = values[i] ? \`<span>\${values[i]}</span>\` : '';    return result + str + value;  }, '');}const language = 'JavaScript';const years = 10;const result = highlight\`I have been coding in \${language} for \${years} years\`;console.log(result);`,
    options: [
      "I have been coding in <span>JavaScript</span> for <span>10</span>",
      "I have been coding in <span>JavaScript</span> for <span>10</span> years",
      "I have been coding in JavaScript for 10 years",
      "I have been coding in <span>JavaScript</span> for <span>10</span> yearsundefined"
],
    correctAnswer: "I have been coding in <span>JavaScript</span> for <span>10</span>",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2410).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`I have been coding in <span>JavaScript</span> for <span>10</span> years\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2412",
    title: "JS Challenge #2412",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    return {    increment() {      count++;      return count;    },    decrement() {      count--;      return count;    },    getValue() {      return count;    }  };}const counter1 = createCounter();const counter2 = createCounter();counter1.increment();counter1.increment();counter2.increment();counter1.decrement();console.log(counter1.getValue() + counter2.getValue());`,
    options: [
      "1",
      "undefined",
      "NaN",
      "2"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2412).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2375",
    title: "JS Challenge #2375",
    difficulty: "medium",
    category: "basics",
    code: `class EventEmitter {  constructor() {    this.events = {};  }    on(event, listener) {    if (!this.events[event]) {      this.events[event] = [];    }    this.events[event].push(listener);    return () => this.off(event, listener);  }    off(event, listener) {    if (!this.events[event]) return;    this.events[event] = this.events[event].filter(l => l !== listener);  }    emit(event, ...args) {    if (!this.events[event]) return false;    this.events[event].forEach(listener => listener(...args));    return true;  }}const emitter = new EventEmitter();const unsubscribe = emitter.on('message', data => console.log(data));emitter.emit('message', 'Hello');emitter.emit('message', 'World');unsubscribe();emitter.emit('message', 'Ignored');console.log(emitter.emit('message', 'Still ignored'));`,
    options: [
      "Hello World false",
      "Hello World true",
      "Hello World Ignored false",
      "Hello World Ignored true"
],
    correctAnswer: "Hello World true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2375).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello
World
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2378",
    title: "JS Challenge #2378",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];const result = numbers  .filter(num => num % 2 === 0)  .map(num => num * 2)  .reduce((acc, num, index, array) => {    if (index === array.length - 1) {      return (acc + num) / array.length;    }    return acc + num;  }, 0);console.log(result);`,
    options: [
      "12",
      "10",
      "8",
      "6"
],
    correctAnswer: "12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2378).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2381",
    title: "JS Challenge #2381",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  details: {    name: 'Alex',    contact: null,    preferences: {      theme: 'dark'    }  },  getInfo() {    return this?.details?.contact?.email ||            this?.details?.preferences?.theme ||            this?.details?.name ||            'Unknown';  }};console.log(user.getInfo());`,
    options: [
      "dark",
      "Unknown",
      "Alex",
      "null"
],
    correctAnswer: "dark",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2381).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`dark\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2384",
    title: "JS Challenge #2384",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment: () => ++count,    getCount: () => count  };}function compose(...fns) {  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);}const counter = createCounter();const double = x => x * 2;const addOne = x => x + 1;const incrementAndProcess = compose(double, addOne, counter.increment);counter.increment();const result = incrementAndProcess();console.log(result);`,
    options: [
      "6",
      "5",
      "3",
      "4"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2384).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2387",
    title: "JS Challenge #2387",
    difficulty: "medium",
    category: "basics",
    code: `const products = [  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },  { id: 2, name: 'Headphones', price: 100, category: 'Electronics' },  { id: 3, name: 'Book', price: 15, category: 'Books' },  { id: 4, name: 'Shirt', price: 25, category: 'Clothing' },  { id: 5, name: 'Coffee Mug', price: 10, category: 'Kitchen' }];const result = products  .filter(p => p.price > 20)  .map(p => ({ name: p.name, value: p.price * 0.9 }))  .reduce((acc, item) => {    acc.names.push(item.name);    acc.total += item.value;    return acc;  }, { names: [], total: 0 });console.log(result);`,
    options: [
      "{ names: ['Laptop', 'Headphones', 'Book', 'Shirt'], total: 1214 }",
      "{ names: ['Laptop', 'Headphones', 'Shirt'], total: 1192.5 }",
      "{ total: 1192.5, names: ['Laptop', 'Headphones', 'Shirt'] }",
      "{names: ['Laptop', 'Headphones', 'Shirt'], total: 1192.5}"
],
    correctAnswer: "{ names: ['Laptop', 'Headphones', 'Shirt'], total: 1192.5 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2387).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"names":["Laptop","Headphones","Shirt"],"total":1192.5}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2389",
    title: "JS Challenge #2389",
    difficulty: "medium",
    category: "basics",
    code: `const person = {  name: 'Alice',  greet() {    return \`Hello, I'm \${this.name}\`;  },  farewell: () => \`Goodbye from \${this.name}\`};const greetFn = person.greet;const farewellFn = person.farewell;console.log(person.greet());console.log(greetFn());console.log(farewellFn());`,
    options: [
      "Hello, I'm Alice TypeError: Cannot read property 'name' of undefined Goodbye from undefined",
      "Hello, I'm Alice Hello, I'm undefined Goodbye from undefined",
      "Hello, I'm Alice Hello, I'm  Goodbye from Alice",
      "Hello, I'm Alice Hello, I'm undefined Goodbye from Alice"
],
    correctAnswer: "Hello, I'm Alice Hello, I'm undefined Goodbye from undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2389).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, I'm Alice
Hello, I'm undefined
Goodbye from undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2392",
    title: "JS Challenge #2392",
    difficulty: "medium",
    category: "basics",
    code: `function task1() {  console.log('A');  setTimeout(() => console.log('B'), 0);  Promise.resolve().then(() => console.log('C'));  Promise.resolve().then(() => setTimeout(() => console.log('D'), 0));  Promise.resolve().then(() => console.log('E'));  setTimeout(() => console.log('F'), 0);  console.log('G');}task1();// What is the order of the console output?`,
    options: [
      "A G B F C E D",
      "A B G C E F D",
      "A G C E B F D",
      "A G C E B D F"
],
    correctAnswer: "A G C E B F D",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2392).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
G
C
E
B
F
D\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2355",
    title: "JS Challenge #2355",
    difficulty: "medium",
    category: "basics",
    code: `function compose(...funcs) {  return function(x) {    return funcs.reduceRight((acc, fn) => fn(acc), x);  };}const add10 = x => x + 10;const multiply2 = x => x * 2;const toString = x => \`Result: \${x}\`;const composed = compose(toString, multiply2, add10);console.log(composed(5));`,
    options: [
      "Result: 25",
      "Result: NaN",
      "Result: 20",
      "Result: 30"
],
    correctAnswer: "Result: 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2355).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Result: 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2357",
    title: "JS Challenge #2357",
    difficulty: "medium",
    category: "basics",
    code: `try {  try {    // Creating a custom error type    class CustomError extends Error {      constructor(message) {        super(message);        this.name = "CustomError";      }    }        const fn = () => {      throw new CustomError("Something went wrong");    };        try {      fn();    } catch (e) {      throw new TypeError("Type error occurred");    }  } catch (e) {    console.log(e instanceof Error, e.name, e instanceof TypeError);  }} catch (e) {  console.log("Outer catch", e.message);}`,
    options: [
      "true 'CustomError' false",
      "true 'TypeError' false",
      "false 'CustomError' false",
      "true 'TypeError' true"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2357).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected end of input\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2359",
    title: "JS Challenge #2359",
    difficulty: "medium",
    category: "basics",
    code: `function* counter() {  let i = 1;  while (true) {    const reset = yield i++;    if (reset) {      i = 1;    }  }}const gen = counter();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next(true).value);console.log(gen.next().value);`,
    options: [
      "1, 2, 1, 2",
      "1, 2, undefined, 1",
      "1, 2, 1, 1",
      "1, 2, 3, 4"
],
    correctAnswer: "1, 2, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2359).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2361",
    title: "JS Challenge #2361",
    difficulty: "medium",
    category: "basics",
    code: `const users = [  { id: 1, name: 'Alice' },  { id: 2, name: 'Bob' },  { id: 3, name: 'Charlie' }];const userScores = new WeakMap();// Set scores for usersuserScores.set(users[0], 95);userScores.set(users[1], 80);// Remove reference to Bobusers[1] = null;let sum = 0;for (const user of users) {  if (user && userScores.has(user)) {    sum += userScores.get(user);  }}console.log(sum);`,
    options: [
      "Error: Invalid value used as weak map key",
      "175",
      "95",
      "undefined"
],
    correctAnswer: "Error: Invalid value used as weak map key",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2361).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2367",
    title: "JS Challenge #2367",
    difficulty: "medium",
    category: "basics",
    code: `const team = {  lead: { name: 'Alice', projects: ['Alpha', 'Beta'] },  dev: { name: 'Bob', projects: ['Gamma'] },  tester: { name: 'Charlie', projects: [] }};const {   lead: { projects: [leadProject] },  dev: { projects: [devProject = 'Delta'] },  tester: { projects: [testerProject = 'Epsilon'] }} = team;console.log(\`\${leadProject}-\${devProject}-\${testerProject}\`);`,
    options: [
      "Alpha-Gamma-Epsilon",
      "Alpha-Gamma-undefined",
      "undefined-Gamma-Epsilon",
      "Alpha-Delta-Epsilon"
],
    correctAnswer: "Alpha-Gamma-Epsilon",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2367).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Alpha-Gamma-Epsilon\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2370",
    title: "JS Challenge #2370",
    difficulty: "medium",
    category: "basics",
    code: `const target = { a: 1, b: 2 };const handler = {  get(obj, prop) {    return prop in obj ? obj[prop] * 2 : 'not found';  },  set(obj, prop, value) {    if (typeof value !== 'number') {      return false;    }    obj[prop] = value + 10;    return true;  }};const proxy = new Proxy(target, handler);proxy.c = '5';proxy.d = 5;console.log(JSON.stringify({  a: proxy.a,  b: proxy.b,  c: proxy.c,  d: target.d,  hasC: Reflect.has(target, 'c')}));`,
    options: [
      "{\"a\":2,\"b\":4,\"c\":\"5\",\"d\":15,\"hasC\":false}",
      "{\"a\":1,\"b\":2,\"c\":\"not found\",\"d\":15,\"hasC\":false}",
      "{\"a\":2,\"b\":4,\"c\":\"not found\",\"d\":15,\"hasC\":false}",
      "{\"a\":2,\"b\":4,\"c\":\"not found\",\"d\":15,\"hasC\":true}"
],
    correctAnswer: "{\"a\":2,\"b\":4,\"c\":\"not found\",\"d\":15,\"hasC\":false}",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2370).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"a":2,"b":4,"c":"not found","d":15,"hasC":false}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2372",
    title: "JS Challenge #2372",
    difficulty: "medium",
    category: "basics",
    code: `function curry(fn) {  return function curried(...args) {    if (args.length >= fn.length) {      return fn.apply(this, args);    }    return function(...moreArgs) {      return curried.apply(this, [...args, ...moreArgs]);    };  };}const multiply = curry((a, b, c) => a * b * c);const double = multiply(2);const result = double(3)(4);console.log(result);`,
    options: [
      "NaN",
      "24",
      "undefined",
      "function"
],
    correctAnswer: "24",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2372).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`24\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2334",
    title: "JS Challenge #2334",
    difficulty: "medium",
    category: "basics",
    code: `function modify(obj) {  obj.a.push(4);  obj.b = 'changed';  return obj;}const original = { a: [1, 2, 3], b: 'original', c: { deep: true } };const copy1 = { ...original };const copy2 = JSON.parse(JSON.stringify(original));modify(copy1);console.log(original.a, original.b, copy2.c === original.c);`,
    options: [
      "[1, 2, 3] 'original' true",
      "[1, 2, 3] 'original' false",
      "[1, 2, 3, 4] 'original' false",
      "[1, 2, 3, 4] 'changed' false"
],
    correctAnswer: "[1, 2, 3, 4] 'original' false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2334).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4] original false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2336",
    title: "JS Challenge #2336",
    difficulty: "medium",
    category: "basics",
    code: `const result = (function() {  let count = 0;    return {    increment() {      return ++count;    },    get value() {      return count;    },    reset() {      const oldCount = count;      count = 0;      return oldCount;    }  };})();result.increment();result.increment();console.log(result.reset() + result.value + result.increment());`,
    options: [
      "3",
      "201",
      "2undefined1",
      "2"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2336).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2341",
    title: "JS Challenge #2341",
    difficulty: "medium",
    category: "basics",
    code: `try {  const arr = [1, 2, 3];    function processArray() {    try {      nonExistentFunction();    } catch (err) {      throw new TypeError('Invalid type');    }  }    try {    processArray();  } catch (err) {    console.log(err instanceof Error, err instanceof TypeError, err.message);  }} catch (finalError) {  console.log('Caught in outer block:', finalError);}`,
    options: [
      "true true Invalid type",
      "true false 'nonExistentFunction is not defined'",
      "true true 'Invalid type'",
      "false true 'Invalid type'"
],
    correctAnswer: "true true Invalid type",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2341).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true true Invalid type\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2347",
    title: "JS Challenge #2347",
    difficulty: "medium",
    category: "basics",
    code: `function analyze(...items) {  const [first, ...rest] = items;  const { length } = [...rest, 'bonus'];  const result = {    ...first,    count: length,  };    console.log(result);}analyze({ id: 42, name: 'Item' }, 'a', 'b');`,
    options: [
      "{ id: 42, count: 3 }",
      "{ id: 42, name: 'Item', count: 2 }",
      "{ id: 42, name: 'Item', count: 3 }",
      "{ count: 3 }"
],
    correctAnswer: "{ id: 42, name: 'Item', count: 3 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2347).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"id":42,"name":"Item","count":3}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2350",
    title: "JS Challenge #2350",
    difficulty: "medium",
    category: "basics",
    code: `const user = { id: 1, name: 'Alice' };const userData = new WeakMap();userData.set(user, { lastLogin: '2023-01-01' });const clone = { ...user };const originalData = userData.get(user);const cloneData = userData.get(clone);console.log(originalData, cloneData);`,
    options: [
      "{ lastLogin: '2023-01-01' } { lastLogin: '2023-01-01' }",
      "{ lastLogin: '2023-01-01' } undefined",
      "undefined undefined",
      "{ lastLogin: '2023-01-01' } Error: Invalid WeakMap key"
],
    correctAnswer: "{ lastLogin: '2023-01-01' } undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2350).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"lastLogin":"2023-01-01"} undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2313",
    title: "JS Challenge #2313",
    difficulty: "medium",
    category: "basics",
    code: `const calculator = {  value: 10,  add: function(x) {    return this.value + x;  },  multiply: function(x) {    return this.value * x;  }};const add5 = calculator.add;const double = calculator.multiply.bind(calculator);const triple = calculator.multiply.bind({value: 3});console.log(add5(2) + double(3) + triple(4));`,
    options: [
      "44",
      "NaN",
      "42",
      "undefined2310"
],
    correctAnswer: "NaN",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2313).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`NaN\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2316",
    title: "JS Challenge #2316",
    difficulty: "medium",
    category: "basics",
    code: `const a = 9007199254740991n; // MAX_SAFE_INTEGER as BigIntconst b = 2n;const c = a + b;const result = [  a === 9007199254740991,  a + 1n === 9007199254740992n,  typeof c,  c > Number.MAX_SAFE_INTEGER,  BigInt(9007199254740992) - BigInt(9007199254740991)];console.log(result);`,
    options: [
      "[false, true, 'object', true, 1n]",
      "[true, true, 'bigint', true, 1n]",
      "[false, true, 'bigint', true, 1n]",
      "[false, true, 'bigint', true, 1]"
],
    correctAnswer: "[false, true, 'object', true, 1n]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2316).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2318",
    title: "JS Challenge #2318",
    difficulty: "medium",
    category: "basics",
    code: `const team = {  name: 'Eagles',  players: ['Smith', 'Johnson', 'Williams'],  coach: { name: 'Brown', experience: 12 },  stats: { wins: 10, losses: 6 }};const {   name: teamName,   players: [firstPlayer, , thirdPlayer],  coach: { name },  stats: { wins, draws = 0 }} = team;console.log(\`\${teamName}-\${firstPlayer}-\${thirdPlayer}-\${name}-\${wins}-\${draws}\`);`,
    options: [
      "undefined-Smith-Williams-Brown-10-0",
      "Eagles-Smith-Williams-Brown-10-undefined",
      "Eagles-Smith-Williams-Brown-10-0",
      "Eagles-Smith-undefined-Brown-10-0"
],
    correctAnswer: "Eagles-Smith-Williams-Brown-10-0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2318).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Eagles-Smith-Williams-Brown-10-0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2325",
    title: "JS Challenge #2325",
    difficulty: "medium",
    category: "basics",
    code: `const weakSet = new WeakSet();let obj1 = { id: 1 };let obj2 = { id: 2 };let obj3 = obj1;weakSet.add(obj1);weakSet.add(obj2);const results = [  weakSet.has(obj1),  weakSet.has(obj3),  weakSet.has({ id: 2 }),  weakSet.has(obj2)];obj1 = null;console.log(results);`,
    options: [
      "[true, true, false, true]",
      "[true, false, false, true]",
      "[false, true, false, true]",
      "[true, true, true, false]"
],
    correctAnswer: "[true, true, false, true]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2325).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[true,true,false,true]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2328",
    title: "JS Challenge #2328",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1);setTimeout(() => {  console.log(2);  Promise.resolve().then(() => console.log(3));}, 0);Promise.resolve()  .then(() => {    console.log(4);    setTimeout(() => console.log(5), 0);  })  .then(() => console.log(6));console.log(7);`,
    options: [
      "1, 7, 4, 6, 2, 5, 3",
      "1, 7, 4, 2, 6, 3, 5",
      "1, 7, 4, 6, 2, 3, 5",
      "1, 4, 7, 6, 2, 3, 5"
],
    correctAnswer: "1, 7, 4, 6, 2, 5, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2328).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
4
6
2
3
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2330",
    title: "JS Challenge #2330",
    difficulty: "medium",
    category: "basics",
    code: `const user = { name: 'Alice' };const ratings = new WeakMap();ratings.set(user, 5);const result = [];result.push(ratings.has(user));result.push(ratings.get(user));// Create a reference-free objectlet tempUser = { name: 'Bob' };ratings.set(tempUser, 10);result.push(ratings.has(tempUser));// Remove the referencetempUser = null;// Try to iterate through WeakMapresult.push(typeof ratings[Symbol.iterator]);console.log(result);`,
    options: [
      "[true, 5, true, 'undefined']",
      "[true, 5, false, 'undefined']",
      "[true, 5, true, 'function']",
      "[true, 5, true, undefined]"
],
    correctAnswer: "[true, 5, true, 'undefined']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2330).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2332",
    title: "JS Challenge #2332",
    difficulty: "medium",
    category: "basics",
    code: `function processTransaction(amount) {  try {    if (typeof amount !== 'number') {      throw new TypeError('Amount must be a number');    }    if (amount <= 0) {      throw new RangeError('Amount must be positive');    }    return 'Transaction processed';  } catch (error) {    if (error instanceof TypeError) {      return { status: 'Type Error', message: error.message };    } else if (error instanceof RangeError) {      return { status: 'Range Error', message: error.message };    }    return { status: 'Unknown Error', message: error.message };  }}console.log(processTransaction(-50));`,
    options: [
      "Transaction processed",
      "RangeError: Amount must be positive",
      "{ status: 'Type Error', message: 'Amount must be a number' }",
      "{ status: 'Range Error', message: 'Amount must be positive' }"
],
    correctAnswer: "{ status: 'Range Error', message: 'Amount must be positive' }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2332).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"status":"Range Error","message":"Amount must be positive"}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2295",
    title: "JS Challenge #2295",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 42,  getValue() {    return this.value;  },  getArrowValue: () => {    return this.value;  },  getDelayedValue() {    setTimeout(function() {      console.log(this.value);    }, 0);  },  getFixedDelayedValue() {    setTimeout(() => {      console.log(this.value);    }, 0);  }};obj.getDelayedValue();`,
    options: [
      "TypeError: Cannot read property 'value' of undefined",
      "42",
      "undefined",
      "null"
],
    correctAnswer: "TypeError: Cannot read property 'value' of undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2295).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2298",
    title: "JS Challenge #2298",
    difficulty: "medium",
    category: "basics",
    code: `const target = { name: 'Alice' };const handler = {  get(obj, prop) {    return prop in obj ? obj[prop].toUpperCase() : 'NOT_FOUND';  },  set(obj, prop, value) {    if (typeof value !== 'string') {      return false;    }    obj[prop] = value.trim();    return true;  }};const proxy = new Proxy(target, handler);proxy.name = '  Bob  ';proxy.age = 30;console.log(\`\${proxy.name}-\${proxy.age}-\${proxy.job}\`);`,
    options: [
      "BOB  -30-NOT_FOUND",
      "Bob-30-undefined",
      "BOB-NOT_FOUND-NOT_FOUND",
      "BOB-30-NOT_FOUND"
],
    correctAnswer: "BOB-NOT_FOUND-NOT_FOUND",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2298).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`BOB-NOT_FOUND-NOT_FOUND\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2301",
    title: "JS Challenge #2301",
    difficulty: "medium",
    category: "basics",
    code: `const inventory = {  items: ['apple', 'banana', 'orange'],  [Symbol.iterator]: function() {    let index = 0;    const items = this.items;        return {      next: function() {        return index < items.length ?          { value: items[index++].toUpperCase(), done: false } :          { done: true };      }    };  }};const result = [...inventory].join(' + ');console.log(result);`,
    options: [
      "apple,banana,orange",
      "apple + banana + orange",
      "APPLE + BANANA + ORANGE",
      "[object Object]"
],
    correctAnswer: "apple + banana + orange",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2301).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`APPLE + BANANA + ORANGE\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2303",
    title: "JS Challenge #2303",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};const sym1 = Symbol('description');const sym2 = Symbol('description');obj[sym1] = 'Value 1';obj[sym2] = 'Value 2';obj.regularProp = 'Regular';const allKeys = Object.getOwnPropertySymbols(obj).length + Object.keys(obj).length;const comparison = sym1 === sym2;console.log(allKeys + ',' + comparison);`,
    options: [
      "3,true",
      "2,false",
      "3,false",
      "2,true"
],
    correctAnswer: "3,false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2303).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3,false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2305",
    title: "JS Challenge #2305",
    difficulty: "medium",
    category: "basics",
    code: `const team = {  members: ['Alice', 'Bob', 'Charlie'],  leader: 'Diana',  [Symbol.iterator]: function*() {    yield this.leader;    for(const member of this.members) {      yield member;    }  }};let names = [];for (const person of team) {  names.push(person);}console.log(names.join(', '));`,
    options: [
      "Alice, Bob, Charlie, Diana",
      "Diana, Alice, Bob, Charlie",
      "Diana, Alice, Bob, Charlie, undefined",
      "Alice, Bob, Charlie"
],
    correctAnswer: "Diana, Alice, Bob, Charlie",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2305).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Diana, Alice, Bob, Charlie\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2307",
    title: "JS Challenge #2307",
    difficulty: "medium",
    category: "basics",
    code: `function processData(data) {  try {    if (!data) {      throw new TypeError('Data is required');    }        if (data.status === 'error') {      throw new Error('Invalid status');    }        return data.value.toUpperCase();  } catch (err) {    if (err instanceof TypeError) {      return 'Type Error';    }    return err.message;  }}console.log(processData({ status: 'error', value: 'test' }));`,
    options: [
      "Type Error",
      "Invalid status",
      "TYPE ERROR",
      "TypeError: Cannot read property 'toUpperCase' of undefined"
],
    correctAnswer: "Invalid status",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2307).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Invalid status\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2310",
    title: "JS Challenge #2310",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  name: 'Original',  greet() {    return function() {      console.log(\`Hello, \${this.name}\`);    };  },  arrowGreet() {    return () => {      console.log(\`Hello, \${this.name}\`);    };  }};const globalThis = { name: 'Global' };const newObj = { name: 'New' };const regularFn = obj.greet();const arrowFn = obj.arrowGreet();regularFn.call(newObj);`,
    options: [
      "Hello, Original",
      "Hello, New",
      "Hello, undefined",
      "Hello, Global"
],
    correctAnswer: "Hello, New",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2310).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, New\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2274",
    title: "JS Challenge #2274",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  [Symbol('a')]: 'hidden',  a: 'visible',  [Symbol.for('b')]: 'registered',  b: 123};const symbol1 = Symbol.for('b');const symbol2 = Symbol.for('b');console.log(obj.a + ', ' +   obj[Symbol('a')] + ', ' +   obj[symbol1] + ', ' +   (symbol1 === symbol2));`,
    options: [
      "visible, hidden, registered, true",
      "visible, undefined, registered, true",
      "visible, undefined, registered, false",
      "visible, hidden, undefined, true"
],
    correctAnswer: "visible, undefined, registered, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2274).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`visible, undefined, registered, true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2277",
    title: "JS Challenge #2277",
    difficulty: "medium",
    category: "basics",
    code: `function* counter() {  let i = 0;  while (true) {    const direction = yield i;    if (direction === 'up') i += 2;    else if (direction === 'down') i -= 1;    else i += 1;  }}const count = counter();console.log(count.next().value);console.log(count.next('up').value);console.log(count.next('down').value);console.log(count.next().value);`,
    options: [
      "undefined 0 2 1",
      "0 2 1 2",
      "0 2 1 1",
      "0 0 2 1"
],
    correctAnswer: "0 2 1 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2277).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0
2
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2280",
    title: "JS Challenge #2280",
    difficulty: "medium",
    category: "basics",
    code: `function* genSequence() {  const result = yield 'first';  console.log(result);  yield* [1, 2];  return 'done';}const gen = genSequence();let next = gen.next('ignored');console.log(next.value);next = gen.next('second');next = gen.next();console.log(next.value);next = gen.next();console.log(next);`,
    options: [
      "first second 2 { value: 'done', done: true }",
      "first second 2 { value: undefined, done: true }",
      "first second 1 { value: undefined, done: true }",
      "first second 1 { value: 'done', done: true }"
],
    correctAnswer: "first second 2 { value: 'done', done: true }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2280).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`first
second
2
{"value":"done","done":true}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2283",
    title: "JS Challenge #2283",
    difficulty: "medium",
    category: "basics",
    code: `function Animal(name) {  this.name = name;}Animal.prototype.getName = function() {  return this.name;};function Dog(name, breed) {  Animal.call(this, name);  this.breed = breed;}Dog.prototype = Object.create(Animal.prototype);Dog.prototype.constructor = Dog;Dog.prototype.getName = function() {  return \`Dog called \${Animal.prototype.getName.call(this)}\`;};const myDog = new Dog('Rex', 'German Shepherd');console.log(myDog.getName());`,
    options: [
      "Rex",
      "Dog called Rex",
      "undefined",
      "[object Object]"
],
    correctAnswer: "Rex",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2283).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Dog called Rex\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2286",
    title: "JS Challenge #2286",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 42,  getValue() {    return this.value;  },  getValueArrow: () => this.value,  nested: {    value: 100,    getValue() {      return this.value;    }  }};const extractedMethod = obj.getValue;const boundMethod = obj.getValue.bind(obj);console.log(obj.getValue() + ',' + obj.getValueArrow() + ',' +             obj.nested.getValue() + ',' + extractedMethod() + ',' +             boundMethod());`,
    options: [
      "42,42,100,42,42",
      "42,undefined,100,42,42",
      "undefined,undefined,100,undefined,42",
      "42,undefined,100,undefined,42"
],
    correctAnswer: "42,undefined,100,undefined,42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2286).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`42,undefined,100,undefined,42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2289",
    title: "JS Challenge #2289",
    difficulty: "medium",
    category: "basics",
    code: `const target = { a: 1, b: 2 };const handler = {  get(obj, prop) {    return prop === 'sum' ? obj.a + obj.b : Reflect.get(obj, prop);  },  set(obj, prop, value) {    if (prop === 'a' && value < 0) {      return false;    }    return Reflect.set(obj, prop, value);  }};const proxy = new Proxy(target, handler);proxy.a = -5;proxy.b = 10;console.log(\`\${proxy.a}, \${proxy.b}, \${proxy.sum}\`);`,
    options: [
      "-5, 10, 5",
      "undefined, 10, NaN",
      "-5, 10, NaN",
      "1, 10, 11"
],
    correctAnswer: "1, 10, 11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2289).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1, 10, 11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2254",
    title: "JS Challenge #2254",
    difficulty: "medium",
    category: "basics",
    code: `function main() {  console.log(1);    setTimeout(() => console.log(2), 0);    Promise.resolve().then(() => {    console.log(3);    setTimeout(() => console.log(4), 0);  }).then(() => console.log(5));    Promise.resolve().then(() => console.log(6));    console.log(7);}main();`,
    options: [
      "1, 3, 5, 6, 7, 2, 4",
      "1, 7, 3, 6, 5, 2, 4",
      "1, 7, 6, 3, 5, 2, 4",
      "1, 7, 3, 5, 6, 2, 4"
],
    correctAnswer: "1, 3, 5, 6, 7, 2, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2254).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
3
6
5
2
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2257",
    title: "JS Challenge #2257",
    difficulty: "medium",
    category: "basics",
    code: `const team = {  members: ['Alice', 'Bob', 'Charlie'],  [Symbol.iterator]: function*() {    let index = 0;    while(index < this.members.length) {      yield this.members[index++].toUpperCase();    }  }};const result = [];for (const member of team) {  result.push(member);}console.log(result.join('-'));`,
    options: [
      "Alice-Bob-Charlie",
      "TypeError: team is not iterable",
      "ALICE-BOB-CHARLIE",
      "[object Object]"
],
    correctAnswer: "Alice-Bob-Charlie",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2257).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`ALICE-BOB-CHARLIE\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2260",
    title: "JS Challenge #2260",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    name: 'Alice',    settings: {      notifications: {        email: true,        sms: false      }    }  },  getPreference(type) {    return this.profile?.settings?.notifications?.[type] ?? 'not configured';  }};const admin = {  profile: {    name: 'Admin',    settings: null  },  getPreference: user.getPreference};console.log(admin.getPreference('email'));`,
    options: [
      "not configured",
      "true",
      "TypeError: Cannot read properties of null (reading 'notifications')",
      "undefined"
],
    correctAnswer: "not configured",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2260).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`not configured\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2263",
    title: "JS Challenge #2263",
    difficulty: "medium",
    category: "basics",
    code: `const companies = [  { name: 'TechCorp', founded: 2010 },  { name: 'DataSystems', founded: 2015 },  { name: 'WebSolutions', founded: 2008 }];const activeClients = new WeakSet();activeClients.add(companies[0]);activeClients.add(companies[2]);companies.pop();const result = [  activeClients.has(companies[0]),  activeClients.has(companies[1]),  typeof activeClients.size];console.log(result);`,
    options: [
      "[true, false, 'number']",
      "[true, true, 'undefined']",
      "[true, false, 'undefined']",
      "[false, true, 'undefined']"
],
    correctAnswer: "[true, false, 'undefined']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2263).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[true,false,"undefined"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2266",
    title: "JS Challenge #2266",
    difficulty: "medium",
    category: "basics",
    code: `function processConfig(config) {  const defaults = {    timeout: 1000,    retries: 3,    enabled: false,    count: 0  };    const settings = {    ...defaults,    ...config  };    const effectiveTimeout = settings.timeout ?? 500;  const effectiveRetries = settings.retries ?? 1;  const effectiveEnabled = settings.enabled ?? true;  const effectiveCount = settings.count ?? 5;    console.log([effectiveTimeout, effectiveRetries, effectiveEnabled, effectiveCount]);}processConfig({ timeout: null, retries: 0, enabled: undefined });`,
    options: [
      "[null, 0, true, 0]",
      "[500, 0, true, 0]",
      "[500, 1, true, 5]",
      "[null, 0, true, 5]"
],
    correctAnswer: "[500, 0, true, 0]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2266).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[500,0,true,0]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2269",
    title: "JS Challenge #2269",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');setTimeout(() => {  console.log('Timeout 1');}, 0);Promise.resolve().then(() => {  console.log('Promise 1');}).then(() => {  console.log('Promise 2');});setTimeout(() => {  console.log('Timeout 2');}, 0);console.log('End');`,
    options: [
      "Start, End, Timeout 1, Timeout 2, Promise 1, Promise 2",
      "Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2",
      "Start, Promise 1, Promise 2, End, Timeout 1, Timeout 2",
      "Start, Timeout 1, Timeout 2, End, Promise 1, Promise 2"
],
    correctAnswer: "Start, End, Timeout 1, Timeout 2, Promise 1, Promise 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2269).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2235",
    title: "JS Challenge #2235",
    difficulty: "medium",
    category: "basics",
    code: `const num1 = 9007199254740992n;const num2 = 1n;const result1 = num1 + num2;const result2 = Number(num1) + Number(num2);const result3 = num1 + BigInt(1);const result4 = String(num1) + String(num2);console.log(typeof result2 === typeof result1, result1 === result3, result4);`,
    options: [
      "false false \"90071992547409921\"",
      "true true \"90071992547409921\"",
      "false true 9007199254740993n",
      "false true \"90071992547409921\""
],
    correctAnswer: "false true \"90071992547409921\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2235).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false true 90071992547409921\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2238",
    title: "JS Challenge #2238",
    difficulty: "medium",
    category: "basics",
    code: `function createSymbolDemo() {  const obj = {};    const sym1 = Symbol('description');  const sym2 = Symbol('description');  const sym3 = Symbol.for('shared');  const sym4 = Symbol.for('shared');    obj[sym1] = 'Value 1';  obj[sym2] = 'Value 2';  obj[sym3] = 'Value 3';  obj[sym4] = 'Value 4';    console.log(Object.keys(obj).length, sym1 === sym2, sym3 === sym4, obj[sym3]);}createSymbolDemo();`,
    options: [
      "0 false true Value 4",
      "4 true true Value 4",
      "4 false false Value 3",
      "0 false true Value 3"
],
    correctAnswer: "0 false true Value 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2238).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0 false true Value 4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2241",
    title: "JS Challenge #2241",
    difficulty: "medium",
    category: "basics",
    code: `function* generateSequence() {  let i = 1;  while (i <= 3) {    yield i++;  }}function* extendSequence() {  yield* generateSequence();  yield* [4, 5];  yield 6;}const generator = extendSequence();const result = [];for (const value of generator) {  if (value % 2 === 0) {    result.push(value * 2);  } else {    result.push(value);  }}console.log(result);`,
    options: [
      "[1, 4, 3, 8, 5, 6]",
      "[1, 4, 3, 8, 5, 12]",
      "[1, 2, 3, 4, 5, 6]",
      "[1, 4, 3, 8, 10, 12]"
],
    correctAnswer: "[1, 4, 3, 8, 5, 12]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2241).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,4,3,8,5,12]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2244",
    title: "JS Challenge #2244",
    difficulty: "medium",
    category: "basics",
    code: `const privateData = new WeakMap();function Person(name) {  privateData.set(this, { name, secretCount: 0 });    this.greet = function() {    const data = privateData.get(this);    data.secretCount++;    return \`Hello, my name is \${data.name}\`;  };    this.getSecretCount = function() {    return privateData.get(this).secretCount;  };}const alice = new Person('Alice');alice.greet();alice.greet();const result = [  privateData.has(alice),  alice.name,  alice.getSecretCount()];console.log(result);`,
    options: [
      "[true, undefined, 2]",
      "[false, undefined, 2]",
      "[Object, undefined, 2]",
      "[true, 'Alice', 2]"
],
    correctAnswer: "[true, undefined, 2]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2244).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[true,null,2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2248",
    title: "JS Challenge #2248",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'Alice',  age: 30};const handler = {  get(target, prop) {    if (prop in target) {      return target[prop];    }    return \`Property '\${prop}' doesn't exist\`;  },  set(target, prop, value) {    if (prop === 'age' && typeof value !== 'number') {      console.log('Age must be a number');      return false;    }    target[prop] = value;    return true;  }};const proxy = new Proxy(user, handler);proxy.age = '32';proxy.age = 32;console.log(proxy.job);`,
    options: [
      "undefined",
      "Age must be a number Property 'job' doesn't exist",
      "Age must be a number",
      "Property 'job' doesn't exist"
],
    correctAnswer: "Age must be a number Property 'job' doesn't exist",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2248).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Age must be a number
Property 'job' doesn't exist\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2251",
    title: "JS Challenge #2251",
    difficulty: "medium",
    category: "basics",
    code: `function executePromises() {  console.log(1);    setTimeout(() => {    console.log(2);  }, 0);    Promise.resolve().then(() => {    console.log(3);    setTimeout(() => {      console.log(4);    }, 0);  }).then(() => {    console.log(5);  });    console.log(6);}executePromises();`,
    options: [
      "1, 6, 3, 2, 5, 4",
      "1, 6, 2, 3, 5, 4",
      "1, 3, 5, 6, 2, 4",
      "1, 6, 3, 5, 2, 4"
],
    correctAnswer: "1, 6, 3, 2, 5, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2251).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
6
3
5
2
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2215",
    title: "JS Challenge #2215",
    difficulty: "medium",
    category: "basics",
    code: `const p1 = Promise.resolve(1);const p2 = new Promise(resolve => resolve(2));const p3 = new Promise(resolve => setTimeout(() => resolve(3), 0));const p4 = Promise.reject(4).catch(err => err);Promise.all([p1, p2, p3, p4])  .then(values => {    const result = values.reduce((acc, val) => {      return acc + val;    }, 0);    console.log(result);  })  .catch(err => console.log('Error:', err));`,
    options: [
      "6 (after a delay)",
      "undefined",
      "10",
      "Error: 4"
],
    correctAnswer: "10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2215).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2217",
    title: "JS Challenge #2217",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  [Symbol('a')]: 'hidden',  [Symbol.for('b')]: 'registered',  c: 'normal'};const symbols = Object.getOwnPropertySymbols(obj);const keys = Object.keys(obj);const allProps = Reflect.ownKeys(obj);console.log(symbols.length, keys.length, allProps.length);`,
    options: [
      "2 3 5",
      "2 1 3",
      "3 1 3",
      "0 1 1"
],
    correctAnswer: "2 1 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2217).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2 1 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2223",
    title: "JS Challenge #2223",
    difficulty: "medium",
    category: "basics",
    code: `// What will be logged when this code runs?const counter = (() => {  let count = 0;    return {    increment() {      count += 1;      return this;    },    reset() {      count = 0;      return this;    },    get value() {      return count;    }  };})();const { increment, value } = counter;increment();counter.increment();console.log(value);`,
    options: [
      "undefined",
      "2",
      "0",
      "1"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2223).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2225",
    title: "JS Challenge #2225",
    difficulty: "medium",
    category: "basics",
    code: `function processConfig(config) {  const defaultPort = 8080;  const defaultTimeout = 5000;    const port = config?.port ?? defaultPort;  const timeout = config?.timeout ?? defaultTimeout;  const debug = config?.debug ?? false;    return {     summary: \`Port: \${port}, Timeout: \${timeout}, Debug: \${debug ? 'enabled' : 'disabled'}\`,    isUsingDefaults: port === defaultPort && timeout === defaultTimeout  };}const result = processConfig({ port: 0, timeout: null });console.log(result.summary);`,
    options: [
      "Port: 8080, Timeout: 5000, Debug: disabled",
      "Port: 0, Timeout: null, Debug: disabled",
      "Port: 0, Timeout: 5000, Debug: disabled",
      "Port: undefined, Timeout: null, Debug: disabled"
],
    correctAnswer: "Port: 0, Timeout: 5000, Debug: disabled",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2225).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Port: 0, Timeout: 5000, Debug: disabled\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2228",
    title: "JS Challenge #2228",
    difficulty: "medium",
    category: "basics",
    code: `function processUserData(data) {  const settings = {    theme: data.preferences?.theme ?? 'light',    notifications: data.preferences?.notifications ?? true,    fontSize: data.preferences?.fontSize ?? 16  };    let status = data.status ?? 'active';  let reputation = data.reputation ?? 0;    console.log(reputation || 'No reputation yet');  return settings;}processUserData({ status: '', reputation: 0 });`,
    options: [
      "0",
      "undefined",
      "No reputation yet",
      "null"
],
    correctAnswer: "No reputation yet",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2228).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`No reputation yet\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2232",
    title: "JS Challenge #2232",
    difficulty: "medium",
    category: "basics",
    code: `type User = {  id: number;  name: string;  email?: string;};function processUser<T extends User>(user: T): T & { processed: boolean } {  return { ...user, processed: true };}const partialUser = { id: 1, name: 'Alice' };const result = processUser(partialUser);console.log(typeof result.email);`,
    options: [
      "object",
      "string",
      "Error: Property 'email' does not exist on type 'User'",
      "undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2232).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected identifier 'User'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2194",
    title: "JS Challenge #2194",
    difficulty: "medium",
    category: "basics",
    code: `function processInput(userInput) {  const defaultValue = 'default';  const value1 = userInput?.value ?? defaultValue;  const value2 = userInput?.value || defaultValue;    const result = {    a: 0 ?? 'zero',    b: '' ?? 'empty',    c: null ?? 'null',    d: undefined ?? 'undefined',    comparison: value1 === value2  };    console.log(result);}processInput({ value: '' });`,
    options: [
      "{ a: 'zero', b: 'empty', c: 'null', d: 'undefined', comparison: false }",
      "{ a: 'zero', b: 'empty', c: null, d: undefined, comparison: true }",
      "{ a: 0, b: '', c: 'null', d: 'undefined', comparison: true }",
      "{ a: 0, b: '', c: 'null', d: 'undefined', comparison: false }"
],
    correctAnswer: "{ a: 0, b: '', c: 'null', d: 'undefined', comparison: false }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2194).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"a":0,"b":"","c":"null","d":"undefined","comparison":false}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2197",
    title: "JS Challenge #2197",
    difficulty: "medium",
    category: "basics",
    code: `class ShoppingCart {  constructor() {    if (ShoppingCart.instance) {      return ShoppingCart.instance;    }        this.items = [];    ShoppingCart.instance = this;  }    addItem(item) {    this.items.push(item);  }    getItems() {    return [...this.items];  }}const cart1 = new ShoppingCart();const cart2 = new ShoppingCart();cart1.addItem('Book');cart2.addItem('Laptop');console.log(cart1.getItems());`,
    options: [
      "['Laptop']",
      "['Book', 'Laptop']",
      "['Book']",
      "TypeError: Cannot read property 'push' of undefined"
],
    correctAnswer: "['Book', 'Laptop']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2197).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["Book","Laptop"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2200",
    title: "JS Challenge #2200",
    difficulty: "medium",
    category: "basics",
    code: `function Device(name) {  this.name = name;  this.isOn = false;}Device.prototype.turnOn = function() {  this.isOn = true;  return \`\${this.name} is now on\`;};function Smartphone(name, model) {  Device.call(this, name);  this.model = model;}Smartphone.prototype = Object.create(Device.prototype);Smartphone.prototype.constructor = Smartphone;Smartphone.prototype.turnOn = function() {  const result = Device.prototype.turnOn.call(this);  return \`\${result} (model: \${this.model})\`;};const myPhone = new Smartphone('iPhone', '13 Pro');console.log(myPhone.turnOn());`,
    options: [
      "iPhone is now on (model: 13 Pro)",
      "undefined",
      "iPhone is now on",
      "[object Object] is now on (model: 13 Pro)"
],
    correctAnswer: "iPhone is now on (model: 13 Pro)",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2200).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`iPhone is now on (model: 13 Pro)\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2203",
    title: "JS Challenge #2203",
    difficulty: "medium",
    category: "basics",
    code: `let obj1 = { id: 1 };let obj2 = { id: 2 };let obj3 = { id: 3 };const weakSet = new WeakSet([obj1, obj2]);weakSet.add(obj3);weakSet.delete(obj1);obj2 = null;const remainingObjects = [...weakSet];console.log(remainingObjects);`,
    options: [
      "[{ id: 3 }]",
      "TypeError: weakSet is not iterable",
      "[{ id: 2 }, { id: 3 }]",
      "[{ id: 3 }, { id: 2 }]"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2203).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: weakSet is not iterable\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2206",
    title: "JS Challenge #2206",
    difficulty: "medium",
    category: "basics",
    code: `const secretData = { password: 'abc123' };const mySet = new WeakSet();mySet.add(secretData);// Later in the codedelete secretData.password;const checkAccess = (obj) => {  console.log(mySet.has(obj));};checkAccess(secretData);checkAccess({ password: 'abc123' });`,
    options: [
      "true false",
      "false true",
      "true true",
      "false false"
],
    correctAnswer: "true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2206).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2209",
    title: "JS Challenge #2209",
    difficulty: "medium",
    category: "basics",
    code: `async function test() {  console.log('1');    setTimeout(() => {    console.log('2');  }, 0);    await Promise.resolve();  console.log('3');    new Promise(resolve => {    console.log('4');    resolve();  }).then(() => {    console.log('5');  });    console.log('6');}test();console.log('7');`,
    options: [
      "1 3 4 5 6 7 2",
      "1 7 3 4 6 5 2",
      "1 7 3 4 5 6 2",
      "1 3 4 6 5 7 2"
],
    correctAnswer: "1 7 3 4 6 5 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2209).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
3
4
6
5
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2212",
    title: "JS Challenge #2212",
    difficulty: "medium",
    category: "basics",
    code: `function getCity(person) {  return person?.address?.city ?? 'Unknown';}const data = [  null,  { name: 'Alice' },  { name: 'Bob', address: null },  { name: 'Charlie', address: { street: '123 Main' } },  { name: 'David', address: { city: 'Boston' } }];const cities = data.map(getCity);console.log(cities);`,
    options: [
      "['Unknown', 'Unknown', 'Unknown', 'Unknown', 'Boston']",
      "TypeError: Cannot read properties of null (reading 'address')",
      "[null, undefined, null, undefined, 'Boston']",
      "['Unknown', 'Unknown', 'Unknown', undefined, 'Boston']"
],
    correctAnswer: "['Unknown', 'Unknown', 'Unknown', 'Unknown', 'Boston']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2212).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["Unknown","Unknown","Unknown","Unknown","Boston"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2192",
    title: "JS Challenge #2192",
    difficulty: "medium",
    category: "basics",
    code: `function processConfig(config) {  const cache = config.cache ?? true;  const timeout = config.timeout ?? 1000;  const retries = config.retries ?? 3;    return {    useCache: cache,    timeoutMs: timeout,    maxRetries: retries  };}const result = processConfig({ timeout: 0, retries: false });console.log(result);`,
    options: [
      "{ useCache: undefined, timeoutMs: 0, maxRetries: false }",
      "{ useCache: true, timeoutMs: 0, maxRetries: false }",
      "{ useCache: true, timeoutMs: 1000, maxRetries: false }",
      "{ useCache: true, timeoutMs: 0, maxRetries: 3 }"
],
    correctAnswer: "{ useCache: true, timeoutMs: 0, maxRetries: false }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2192).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"useCache":true,"timeoutMs":0,"maxRetries":false}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2173",
    title: "JS Challenge #2173",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;    return function() {    count++;    return count;  };}const counter1 = createCounter();const counter2 = createCounter();counter1();counter1();counter2();const result = counter1() + counter2();console.log(result);`,
    options: [
      "6",
      "3",
      "4",
      "5"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2173).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2178",
    title: "JS Challenge #2178",
    difficulty: "medium",
    category: "basics",
    code: `function* counter() {  let count = 1;  while (true) {    const reset = yield count++;    if (reset) {      count = 1;    }  }}const gen = counter();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next(true).value);console.log(gen.next().value);`,
    options: [
      "1, 2, 0, 1",
      "1, 2, undefined, 1",
      "1, 2, 1, 2",
      "1, 2, 1, 1"
],
    correctAnswer: "1, 2, 0, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2178).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2181",
    title: "JS Challenge #2181",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    name: 'Alice',    social: null,    getDetails() {      return { verified: true };    }  }};const result = [  user?.profile?.name,  user?.profile?.social?.handle,  user.profile.getDetails?.()?.verified,  user?.nonExistent?.property];console.log(result);`,
    options: [
      "['Alice', null, true, null]",
      "['Alice', undefined, true, undefined]",
      "['Alice', null, true, undefined]",
      "TypeError: Cannot read properties of null (reading 'handle')"
],
    correctAnswer: "['Alice', null, true, null]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2181).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["Alice",null,true,null]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2184",
    title: "JS Challenge #2184",
    difficulty: "medium",
    category: "basics",
    code: `function Vehicle(type) {  this.type = type;}Vehicle.prototype.getType = function() {  return this.type;};function Car(make) {  this.make = make;}Car.prototype = Object.create(Vehicle.prototype);Car.prototype.constructor = Car;const myCar = new Car('Tesla');myCar.type = 'electric';console.log(myCar.getType(), myCar instanceof Vehicle, myCar.constructor.name);`,
    options: [
      "undefined true Car",
      "electric false Vehicle",
      "electric true Car",
      "electric true undefined"
],
    correctAnswer: "electric true Car",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2184).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`electric true Car\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2187",
    title: "JS Challenge #2187",
    difficulty: "medium",
    category: "basics",
    code: `const target = { a: 1, b: 2 };const handler = {  get(obj, prop) {    return prop in obj ? obj[prop] * 2 : 'Not found';  }};const proxy = new Proxy(target, handler);// Add a property to the original targettarget.c = 3;// Attempt to access properties through proxy and Reflectconsole.log([  proxy.a,  proxy.z,  Reflect.get(target, 'b'),  Reflect.get(proxy, 'c')]);`,
    options: [
      "[2, 'Not found', 2, 'Not found']",
      "[2, 'Not found', 2, 3]",
      "[2, undefined, 2, 6]",
      "[2, 'Not found', 2, 6]"
],
    correctAnswer: "[2, 'Not found', 2, 'Not found']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2187).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2189",
    title: "JS Challenge #2189",
    difficulty: "medium",
    category: "basics",
    code: `type User = {  id: number;  name: string;  role?: 'admin' | 'user';};function processUser(user: Partial<User>): string {  const defaultUser: User = {    id: 0,    name: 'Guest',    role: 'user'  };    const mergedUser = { ...defaultUser, ...user };    if (mergedUser.role === 'admin') {    return \`Admin: \${mergedUser.name}\`;  }    return \`User: \${mergedUser.name} (ID: \${mergedUser.id})\`;}console.log(processUser({ name: 'John', role: 'admin' }));`,
    options: [
      "User: John (ID: 0)",
      "Admin: John (ID: 0)",
      "User: John",
      "Admin: John"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2189).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected identifier 'User'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2153",
    title: "JS Challenge #2153",
    difficulty: "medium",
    category: "basics",
    code: `const ws = new WeakSet();const obj1 = { id: 1 };const obj2 = { id: 2 };ws.add(obj1);ws.add(obj2);ws.delete(obj1);const obj3 = { id: 2 };console.log([  ws.has(obj2),  ws.has(obj1),  ws.has(obj3),  ws.has({ id: 2 })]);`,
    options: [
      "[false, false, false, false]",
      "[true, false, false, false]",
      "[true, true, true, false]",
      "[true, false, true, true]"
],
    correctAnswer: "[true, false, false, false]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2153).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[true,false,false,false]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2156",
    title: "JS Challenge #2156",
    difficulty: "medium",
    category: "basics",
    code: `class Task {  constructor(name) {    this.name = name;  }  async execute() {    const result = await Promise.resolve(this.name);    return { result };  }}const task = new Task('test');task.execute().then(console.log);`,
    options: [
      "test",
      "{ result: undefined }",
      "Promise { <pending> }",
      "{ result: 'test' }"
],
    correctAnswer: "test",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2156).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"result":"test"}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2159",
    title: "JS Challenge #2159",
    difficulty: "medium",
    category: "basics",
    code: `const users = [  { id: 1, name: 'Alice', age: 25 },  { id: 2, name: 'Bob', age: 30 },  { id: 3, name: 'Charlie', age: 35 }];const result = users  .filter(user => user.age > 25)  .map(user => user.name.toUpperCase())  .reduce((acc, name) => acc + name[0], '');console.log(result);`,
    options: [
      "BC",
      "AliceBobCharlie",
      "undefined",
      "BOBCHARLIE"
],
    correctAnswer: "BC",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2159).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`BC\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2162",
    title: "JS Challenge #2162",
    difficulty: "medium",
    category: "basics",
    code: `async function getData() {  return Promise.resolve(1);}async function process() {  try {    const x = await getData();    const y = await Promise.resolve(x + 1);    console.log(y + await Promise.resolve(1));  } catch(err) {    console.log('Error');  }}process();`,
    options: [
      "3",
      "[object Promise]",
      "2",
      "undefined"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2162).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2164",
    title: "JS Challenge #2164",
    difficulty: "medium",
    category: "basics",
    code: `const cache = new WeakMap();const obj1 = { id: 1 };const obj2 = { id: 2 };cache.set(obj1, 'data1');cache.set(obj2, 'data2');obj2.newProp = 'test';console.log(cache.has(obj1), cache.has(obj2), cache.has({ id: 1 }));`,
    options: [
      "false true false",
      "true false true",
      "true true false",
      "true false false"
],
    correctAnswer: "true true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2164).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true true false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2167",
    title: "JS Challenge #2167",
    difficulty: "medium",
    category: "basics",
    code: `const counter = {  count: 0,  increment() {    this.count++;    return this.count;  }};const inc = counter.increment;const boundInc = counter.increment.bind(counter);console.log([  counter.increment(),  inc(),  boundInc(),  counter.count]);`,
    options: [
      "[1, 1, 2, 1]",
      "[1, NaN, 2, 2]",
      "[1, undefined, 2, 2]",
      "[1, NaN, 1, 1]"
],
    correctAnswer: "[1, 1, 2, 1]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2167).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,null,2,2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2132",
    title: "JS Challenge #2132",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  const promise = new Promise(resolve => {    setTimeout(() => resolve('first'), 2000);  });    console.log('start');  const result = await promise;  console.log(result);  console.log('end');}fetchData();const x = 'after';console.log(x);`,
    options: [
      "start after first end",
      "after start first end",
      "start first end after",
      "start end first after"
],
    correctAnswer: "start after first end",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2132).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`start
after\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2135",
    title: "JS Challenge #2135",
    difficulty: "medium",
    category: "basics",
    code: `function* counter() {  let count = 1;  while (true) {    const reset = yield count;    count = reset ? 1 : count + 1;  }}const gen = counter();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next(true).value);console.log(gen.next().value);`,
    options: [
      "1, 2, 1, 2",
      "1, undefined, 1, 2",
      "1, 2, true, 3",
      "1, 2, 3, 4"
],
    correctAnswer: "1, 2, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2135).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2138",
    title: "JS Challenge #2138",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  profile: {    name: "Alice",    settings: null  },  getPreferences() {    return this.profile.settings?.theme || "default";  }};const admin = {  profile: {    name: "Admin"  },  getPreferences() {    return this.profile.settings?.theme || "default";  }};console.log(user.getPreferences());console.log(admin.getPreferences());console.log(user.profile.extra?.id?.toString());`,
    options: [
      "default TypeError: Cannot read properties of undefined undefined",
      "default default undefined",
      "TypeError: Cannot read properties of null default undefined",
      "default default null"
],
    correctAnswer: "default default undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2138).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`default
default
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2141",
    title: "JS Challenge #2141",
    difficulty: "medium",
    category: "basics",
    code: `function Animal(name) {  this.name = name;}Animal.prototype.speak = function() {  return \`\${this.name} makes a noise\`;};function Dog(name) {  Animal.call(this, name);}Dog.prototype = Object.create(Animal.prototype);Dog.prototype.constructor = Dog;Dog.prototype.speak = function() {  return \`\${this.name} barks\`;};const animal = new Animal('Animal');const dog = new Dog('Rex');console.log(dog instanceof Animal);`,
    options: [
      "ReferenceError: Animal is not defined",
      "false",
      "TypeError: Animal.call is not a function",
      "true"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2141).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2144",
    title: "JS Challenge #2144",
    difficulty: "medium",
    category: "basics",
    code: `const company = {  name: 'TechCorp',  departments: {    engineering: {      head: { name: 'Alice', contact: null },      staff: 50    },    marketing: null  }};const engineeringContact = company.departments.engineering.head.contact;const marketingHead = company.departments.marketing?.head?.name;const financeStaff = company?.departments?.finance?.staff ?? 'Not available';console.log(\`\${engineeringContact} - \${marketingHead} - \${financeStaff}\`);`,
    options: [
      "null - undefined - undefined",
      "null - undefined - Not available",
      "TypeError: Cannot read property 'contact' of null",
      "TypeError: Cannot read properties of null (reading 'head')"
],
    correctAnswer: "null - undefined - Not available",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2144).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`null - undefined - Not available\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2147",
    title: "JS Challenge #2147",
    difficulty: "medium",
    category: "basics",
    code: `const userMap = new WeakMap();const user1 = { name: 'Alice' };const user2 = { name: 'Bob' };userMap.set(user1, { visits: 10 });userMap.set(user2, { visits: 5 });// Later in the code...const entries = [];for (const obj of [user1, null, user2]) {  if (obj !== null && userMap.has(obj)) {    entries.push(userMap.get(obj).visits);  }}console.log(entries.reduce((sum, visits) => sum + visits, 0));`,
    options: [
      "Error: Cannot use 'null' as a key in WeakMap",
      "10",
      "15",
      "[10, 5]"
],
    correctAnswer: "Error: Cannot use 'null' as a key in WeakMap",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2147).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2150",
    title: "JS Challenge #2150",
    difficulty: "medium",
    category: "basics",
    code: `function outer() {  let x = 10;    function inner() {    console.log(x);        if(true) {      let x = 20;      console.log(x);    }        console.log(x);  }    inner();}outer();`,
    options: [
      "undefined, 20, 10",
      "10, 20, undefined",
      "10, 20, 10",
      "10, 20, 20"
],
    correctAnswer: "undefined, 20, 10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2150).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
20
10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2112",
    title: "JS Challenge #2112",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3, 4, 5];const result = arr  .map(x => x * 2)  .filter(x => x > 5)  .reduce((acc, val) => {    return acc + (val % 3 === 0 ? val : 0);  }, 0);console.log(result);`,
    options: [
      "9",
      "6",
      "12",
      "18"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2112).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2115",
    title: "JS Challenge #2115",
    difficulty: "medium",
    category: "basics",
    code: `const items = new WeakSet();const obj1 = { id: 1 };const obj2 = { id: 2 };items.add(obj1);items.add(obj2);obj2.value = 'test';console.log(items.has(obj2));obj2 = null;setTimeout(() => {  console.log(items.has(obj2));}, 0);`,
    options: [
      "TypeError, TypeError",
      "true, undefined",
      "true, false",
      "true, TypeError"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2115).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Assignment to constant variable.\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2118",
    title: "JS Challenge #2118",
    difficulty: "medium",
    category: "basics",
    code: `function* range(start, end) {  let current = start;  while (current <= end) {    if (current % 3 === 0) {      current++;      continue;    }    yield current++;  }}const gen = range(4, 10);const result = [...gen];console.log(result);`,
    options: [
      "[4, 5, 6, 7, 8, 9, 10]",
      "[4, 5, 6, 7, 8, 10]",
      "[4, 5, 7, 8, 9, 10]",
      "[4, 5, 7, 8, 10]"
],
    correctAnswer: "[4, 5, 7, 8, 10]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2118).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[4,5,7,8,10]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2120",
    title: "JS Challenge #2120",
    difficulty: "medium",
    category: "basics",
    code: `async function demo() {  console.log('1');    setTimeout(() => console.log('2'), 0);    Promise.resolve().then(() => {    console.log('3');    setTimeout(() => console.log('4'), 0);  });    await Promise.resolve();  console.log('5');    queueMicrotask(() => console.log('6'));}demo();console.log('7');`,
    options: [
      "1, 7, 5, 3, 6, 2, 4",
      "1, 7, 3, 5, 6, 2, 4",
      "1, 3, 5, 6, 7, 2, 4",
      "1, 7, 3, 5, 2, 6, 4"
],
    correctAnswer: "1, 7, 5, 3, 6, 2, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2120).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
7
3
5
6
2
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2123",
    title: "JS Challenge #2123",
    difficulty: "medium",
    category: "basics",
    code: `const config = {  port: 0,  timeout: null,  retries: '',  cache: false,  debug: undefined};const port = config.port ?? 3000;const timeout = config.timeout ?? 5000;const retries = config.retries ?? 3;const cache = config.cache ?? true;const debug = config.debug ?? false;console.log([port, timeout, retries, cache, debug]);`,
    options: [
      "[3000, null, 3, false, false]",
      "[0, 5000, '', false, false]",
      "[0, 5000, '', false, true]",
      "[3000, 5000, 3, true, false]"
],
    correctAnswer: "[0, 5000, '', false, false]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2123).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,5000,"",false,false]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2126",
    title: "JS Challenge #2126",
    difficulty: "medium",
    category: "basics",
    code: `const team = {  captain: { name: 'Jack', age: 35 },  players: ['Bob', 'Alice', 'Mike'],  details: { founded: 2020, league: 'Premier' }};const {   captain: { name },   players: [, second],  details: { league: division = 'Amateur' } } = team;console.log(\`\${name}-\${second}-\${division}\`);`,
    options: [
      "undefined-Bob-Premier",
      "Jack-undefined-Premier",
      "undefined-Alice-Amateur",
      "Jack-Alice-Premier"
],
    correctAnswer: "Jack-Alice-Premier",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2126).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Jack-Alice-Premier\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2129",
    title: "JS Challenge #2129",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get: (target, prop) => {    if (prop in target) {      return target[prop] * 2;    }    return 100;  }};const nums = new Proxy({ a: 5, b: 10 }, handler);console.log(nums.a, nums.b, nums.c);`,
    options: [
      "10 20 undefined",
      "5 10 100",
      "5 10 undefined",
      "10 20 100"
],
    correctAnswer: "10 20 100",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2129).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10 20 100\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2093",
    title: "JS Challenge #2093",
    difficulty: "medium",
    category: "basics",
    code: `function trickyScope() {    let x = 10;    if (true) {        let x = 20;        console.log(x); // A    }    console.log(x); // B    {        let x = 30;        console.log(x); // C    }    console.log(x); // D}trickyScope();`,
    options: [
      "10, 20, 30, 10",
      "20, 10, 30, 10",
      "20, 20, 30, 10",
      "10, 10, 30, 10"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2093).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected end of input\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2096",
    title: "JS Challenge #2096",
    difficulty: "medium",
    category: "basics",
    code: `function trickyQuestion() {    var a = 1;    var b = 2;    return (function() {        delete a;        delete b;        return a + b;    })();}console.log(trickyQuestion());`,
    options: [
      "3",
      "undefined",
      "NaN",
      "ReferenceError"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2096).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2100",
    title: "JS Challenge #2100",
    difficulty: "medium",
    category: "basics",
    code: `let a = 5; // binary: 0101let b = 3; // binary: 0011let c = a & b; // binary: 0001let d = a | b; // binary: 0111let e = a ^ b; // binary: 0110console.log(c, d, e);`,
    options: [
      "5 3 2",
      "1 3 2",
      "1 7 6",
      "0 1 2"
],
    correctAnswer: "5 3 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2100).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2103",
    title: "JS Challenge #2103",
    difficulty: "medium",
    category: "basics",
    code: `function trickyFunction(a) {    a = a || 42;    let result = (function(a) {        return a * 2;    })(a);    return result;}console.log(trickyFunction(0));`,
    options: [
      "84",
      "0",
      "42",
      "2"
],
    correctAnswer: "84",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2103).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`84\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2106",
    title: "JS Challenge #2106",
    difficulty: "medium",
    category: "basics",
    code: `let x = 1;function outer() {  let x = 2;  function inner() {    console.log(x);    let x = 3;  }  inner();}outer();`,
    options: [
      "2",
      "ReferenceError: Cannot access 'x' before initialization",
      "1",
      "undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2106).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Cannot access 'x' before initialization\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2109",
    title: "JS Challenge #2109",
    difficulty: "medium",
    category: "basics",
    code: `const user = {  name: 'John',  greet() {    const getName = () => {      console.log(this.name);    };    getName();  },  farewell: function() {    function getName() {      console.log(this.name);    }    getName();  }};user.greet();user.farewell();`,
    options: [
      "John undefined",
      "John John",
      "undefined undefined",
      "undefined John"
],
    correctAnswer: "John undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2109).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`John
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2071",
    title: "JS Challenge #2071",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1, b: 2 };const obj2 = { b: 3, c: 4 };const mergedObj = { ...obj1, ...obj2 };console.log(mergedObj);`,
    options: [
      "{ a: 1, b: 2, c: 4 }",
      "{ a: 1, b: 2, c: 3 }",
      "{ a: 1, b: 3, c: 4 }",
      "{ a: 1, c: 4 }"
],
    correctAnswer: "{ a: 1, b: 3, c: 4 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2071).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"a":1,"b":3,"c":4}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2074",
    title: "JS Challenge #2074",
    difficulty: "medium",
    category: "basics",
    code: `let person = {  name: 'Alice',  age: 30,  valueOf: function() {    return this.age;  }};let result = person + 10;console.log(result);`,
    options: [
      "[object Object]10",
      "undefined",
      "30",
      "40"
],
    correctAnswer: "40",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2074).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`40\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2079",
    title: "JS Challenge #2079",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .filter(num => num % 2 === 0)  .map(num => num * num)  .reduce((acc, num) => acc + num, 0);console.log(result);`,
    options: [
      "30",
      "29",
      "9",
      "20"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2079).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2081",
    title: "JS Challenge #2081",
    difficulty: "medium",
    category: "basics",
    code: `const sym1 = Symbol('description');const sym2 = Symbol('description');const obj = {  [sym1]: 'value1',  [sym2]: 'value2'};console.log(obj[sym1]);`,
    options: [
      "undefined",
      "'value1'",
      "'description1'",
      "'value2'"
],
    correctAnswer: "'value1'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2081).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2084",
    title: "JS Challenge #2084",
    difficulty: "medium",
    category: "basics",
    code: `function trickyScope() {  var x = 10;  if (true) {    let x = 5;    console.log(x);  }  console.log(x);}trickyScope();`,
    options: [
      "5 10",
      "5 5",
      "10 10",
      "10 5"
],
    correctAnswer: "5 10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2084).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5
10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2087",
    title: "JS Challenge #2087",
    difficulty: "medium",
    category: "basics",
    code: `function trickyScope() {  var a = 10;  let b = 20;  const c = 30;  if (true) {    var a = 40;    let b = 50;    const c = 60;    console.log(a, b, c);  }  console.log(a, b, c);}trickyScope();`,
    options: [
      "40 50 60 10 50 60",
      "40 50 60 40 20 30",
      "40 50 60 10 20 30",
      "40 50 60 40 50 30"
],
    correctAnswer: "40 50 60 40 20 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2087).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`40 50 60
40 20 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2051",
    title: "JS Challenge #2051",
    difficulty: "medium",
    category: "basics",
    code: `'use strict';function strictModeExample() {  undeclaredVariable = 10;  try {    console.log(undeclaredVariable);  } catch (e) {    console.log('Error:', e.message);  }}strictModeExample();`,
    options: [
      "Error: undeclaredVariable is not defined",
      "undefined",
      "10",
      "Error: Cannot assign to undeclared variable 'undeclaredVariable'"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2051).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: undeclaredVariable is not defined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2053",
    title: "JS Challenge #2053",
    difficulty: "medium",
    category: "basics",
    code: `function* numberGenerator() {  yield 1;  yield 2;  yield 3;}const gen = numberGenerator();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, 2, 3, 3",
      "1, 2, undefined, undefined",
      "1, 2, 3, undefined",
      "1, 2, 3, 4"
],
    correctAnswer: "1, 2, 3, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2053).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2056",
    title: "JS Challenge #2056",
    difficulty: "medium",
    category: "basics",
    code: `const symbol1 = Symbol('symbol');const symbol2 = Symbol('symbol');const obj = {};obj[symbol1] = 'value1';obj[symbol2] = 'value2';console.log(obj[symbol1]);`,
    options: [
      "undefined",
      "'value2'",
      "Error",
      "'value1'"
],
    correctAnswer: "'value1'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2056).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2059",
    title: "JS Challenge #2059",
    difficulty: "medium",
    category: "basics",
    code: `function outerFunction() {  let x = 10;  function innerFunction() {    x += 5;    console.log(x);  }  return innerFunction;}const closureFunc = outerFunction();closureFunc();closureFunc();`,
    options: [
      "10, 15",
      "15, 20",
      "15, 15",
      "20, 25"
],
    correctAnswer: "10, 15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2059).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`15
20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2062",
    title: "JS Challenge #2062",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve, reject) => {  reject('Error occurred');});promise  .then(() => {    console.log('Promise resolved!');  })  .catch(error => {    console.log(error);  })  .then(() => {    console.log('Process completed');  });`,
    options: [
      "Error occurred -> Promise resolved! -> Process completed",
      "Error occurred -> Process completed",
      "Promise resolved! -> Error occurred -> Process completed",
      "Promise resolved! -> Process completed"
],
    correctAnswer: "Error occurred -> Promise resolved! -> Process completed",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2062).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error occurred
Process completed\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2065",
    title: "JS Challenge #2065",
    difficulty: "medium",
    category: "basics",
    code: `let weakmap = new WeakMap();let obj1 = {};let obj2 = {};weakmap.set(obj1, 'value1');weakmap.set(obj2, 'value2');obj1 = null;console.log(weakmap.has(obj1));`,
    options: [
      "undefined",
      "TypeError",
      "true",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2065).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2068",
    title: "JS Challenge #2068",
    difficulty: "medium",
    category: "basics",
    code: `function Person(name, age) {  this.name = name;  this.age = age;}Person.prototype.getDetails = function() {  return this.name + ' is ' + this.age + ' years old.';};const john = new Person('John', 25);console.log(john.getDetails());`,
    options: [
      "Error: Person is not a constructor.",
      "John is 25 years old.",
      "undefined is undefined years old.",
      "null is null years old."
],
    correctAnswer: "John is 25 years old.",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2068).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`John is 25 years old.\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2032",
    title: "JS Challenge #2032",
    difficulty: "medium",
    category: "basics",
    code: `const wm = new WeakMap();const obj1 = {};const obj2 = {};wm.set(obj1, 'object 1');wm.set(obj2, 'object 2');wm.delete(obj1);console.log(wm.has(obj1));`,
    options: [
      "undefined",
      "true",
      "false",
      "TypeError"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2032).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2035",
    title: "JS Challenge #2035",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers  .filter(n => n % 2 === 0)  .map(n => n * 2)  .reduce((acc, n) => acc + n, 0);console.log(result);`,
    options: [
      "8",
      "0",
      "12",
      "4"
],
    correctAnswer: "12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2035).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2037",
    title: "JS Challenge #2037",
    difficulty: "medium",
    category: "basics",
    code: `const person = {  name: 'Alice',  age: 25,  city: 'Wonderland'};const additionalInfo = {  age: 30,  occupation: 'Explorer'};const combined = {  ...person,  ...additionalInfo};console.log(combined.age);`,
    options: [
      "null",
      "25",
      "30",
      "undefined"
],
    correctAnswer: "30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2037).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2039",
    title: "JS Challenge #2039",
    difficulty: "medium",
    category: "basics",
    code: `function example() {  console.log(a);  var a = 10;  console.log(a);}example();`,
    options: [
      "10, undefined",
      "0, 10",
      "undefined, 10",
      "ReferenceError, 10"
],
    correctAnswer: "10, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2039).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2042",
    title: "JS Challenge #2042",
    difficulty: "medium",
    category: "basics",
    code: `const person = {  firstName: 'John',  lastName: 'Doe',  age: 30,  getFullName: function() {    return this.firstName + ' ' + this.lastName;  }};console.log(person.getFullName());`,
    options: [
      "John Doe",
      "30",
      "Doe John",
      "undefined undefined"
],
    correctAnswer: "John Doe",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2042).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`John Doe\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2045",
    title: "JS Challenge #2045",
    difficulty: "medium",
    category: "basics",
    code: `const a = '5';const b = 5;const c = 10;const result1 = a == b;const result2 = a === b;const result3 = b < c;const result4 = b >= c;console.log(result1, result2, result3, result4);`,
    options: [
      "false false true false",
      "true true true false",
      "true false true false",
      "false false false false"
],
    correctAnswer: "true false true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2045).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true false true false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2048",
    title: "JS Challenge #2048",
    difficulty: "medium",
    category: "basics",
    code: `let a = 5;let b = a++ + ++a;console.log(b);`,
    options: [
      "12",
      "11",
      "13",
      "10"
],
    correctAnswer: "12",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2048).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`12\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  }
,
  {
    id: "tg-3227",
    title: "JS Challenge #3227",
    difficulty: "medium",
    category: "basics",
    code: `const createModule = (() => {  const privateCache = new WeakMap();  return function(name) {    const state = { name, version: 1, active: true };    privateCache.set(state, { accessCount: 0 });    return {      getInfo() {        const meta = privateCache.get(state);        meta.accessCount++;        return \`\${state.name}@v\${state.version}\`;      },      getAccessCount() {        return privateCache.get(state).accessCount;      },      upgrade() {        state.version++;        return this;      }    };  };})();const mod = createModule("auth");mod.upgrade().upgrade();console.log(mod.getInfo());console.log(mod.getAccessCount());`,
    options: [
      "auth@v1 1",
      "auth@v3 1",
      "auth@v3 2",
      "auth@v2 1"
],
    correctAnswer: "auth@v3 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3227).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`auth@v3
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3230",
    title: "JS Challenge #3230",
    difficulty: "medium",
    category: "basics",
    code: `const str = "JavaScript is Awesome!";const result = str  .split(" ")  .map((word, i) =>     i % 2 === 0      ? word.toUpperCase()      : word.toLowerCase()  )  .join("-");const reversed = result  .split("")  .reduce((acc, char) => char + acc, "");console.log(reversed);`,
    options: [
      "!EMOSEWA-si-TPIRCSAVAJ",
      "!emosewa-is-tpircsavaj",
      "!EMOSEWA-IS-TPIRCSAVAJ",
      "!emosewa-IS-tpircsavaj"
],
    correctAnswer: "!EMOSEWA-si-TPIRCSAVAJ",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3230).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`!EMOSEWA-si-TPIRCSAVAJ\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3233",
    title: "JS Challenge #3233",
    difficulty: "medium",
    category: "basics",
    code: `const delay = (ms, val) => new Promise(res => setTimeout(res, ms, val));async function* asyncGen() {  yield await delay(10, "alpha");  yield await delay(10, "beta");  yield await delay(10, "gamma");}async function run() {  const results = [];  const gen = asyncGen();  const [first, , third] = await Promise.all([    gen.next(),    gen.next(),    gen.next()  ]);  results.push(first.value, third.value);  const p1 = Promise.resolve("x").then(v => v + "1");  const p2 = Promise.reject("err").catch(e => e + "2");  results.push(...(await Promise.all([p1, p2])));  console.log(results);}run();`,
    options: [
      "[ 'alpha', 'gamma', 'x1', 'err' ]",
      "[ 'alpha', 'beta', 'x1', 'err2' ]",
      "[ 'alpha', 'beta', 'x1', 'err' ]",
      "[ 'alpha', 'gamma', 'x1', 'err2' ]"
],
    correctAnswer: "[ 'alpha', 'gamma', 'x1', 'err2' ]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3233).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["alpha","gamma","x1","err2"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3236",
    title: "JS Challenge #3236",
    difficulty: "medium",
    category: "basics",
    code: `const tag = (strings, ...values) => {  return strings.reduce((result, str, i) => {    const value = values[i - 1];    const transformed =      typeof value === "number" ? \`[\${value ** 2}]\` : \`{\${value}}\`;    return result + transformed + str;  });};const name = "Sofia";const score = 4;const level = "gold";const output = tag\`Player: \${name}, Score: \${score}, Rank: \${level}\`;console.log(output);`,
    options: [
      "Player: Sofia, Score: 4, Rank: gold",
      "Player: {Sofia}, Score: 4, Rank: {gold}",
      "Player: {Sofia}, Score: [16], Rank: {gold}",
      "Player: Sofia, Score: [16], Rank: gold"
],
    correctAnswer: "Player: {Sofia}, Score: [16], Rank: {gold}",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3236).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Player: {Sofia}, Score: [16], Rank: {gold}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3239",
    title: "JS Challenge #3239",
    difficulty: "medium",
    category: "basics",
    code: `const prefix = "get";const suffix = "Name";const registry = {  [\`\${prefix}Full\${suffix}\`]: function () {    return \`\${this.first} \${this.last}\`;  },  [\`\${prefix}Short\${suffix}\`]: function () {    return this.first[0] + ". " + this.last;  },};const person = {  first: "Leonardo",  last: "Fibonacci",  ...registry,};const key = ["Full", "Short"][1];console.log(person[\`\${prefix}\${key}\${suffix}\`]());`,
    options: [
      "L. Fibonacci",
      "undefined",
      "Leonardo F.",
      "Leonardo Fibonacci"
],
    correctAnswer: "L. Fibonacci",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3239).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`L. Fibonacci\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3242",
    title: "JS Challenge #3242",
    difficulty: "medium",
    category: "basics",
    code: `const config = {  db: { host: "localhost", port: 5432 },  cache: { ttl: 300 },};Object.freeze(config);config.debug = true;config.db.port = 9999;config.cache = { ttl: 600 };const sealed = Object.seal({ version: "1.0", meta: { build: 42 } });sealed.version = "2.0";sealed.author = "devteam";sealed.meta.build = 99;console.log(  config.debug,  config.db.port,  config.cache.ttl,  sealed.version,  sealed.author,  sealed.meta.build);`,
    options: [
      "undefined 9999 300 '1.0' undefined 42",
      "undefined 9999 300 2.0 undefined 99",
      "true 5432 300 '2.0' undefined 99",
      "undefined 5432 600 '1.0' 'devteam' 99"
],
    correctAnswer: "undefined 9999 300 2.0 undefined 99",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3242).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined 9999 300 2.0 undefined 99\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-3145",
    title: "JS Challenge #3145",
    difficulty: "medium",
    category: "basics",
    code: `const str = "  Hello, World!  ";const result = str  .trim()  .split(", ")  .map((word, i) => {    return i === 0      ? word.toUpperCase()      : word.replace(/!\$/, "").split("").reverse().join("") + "?";  })  .join(" | ");const [first, ...rest] = result.split(" | ");const final = \`\${first} | \${rest.join(" & ")}\`;console.log(final);`,
    options: [
      "Hello | WORLD!",
      "HELLO | World?",
      "HELLO | dlroW?",
      "HELLO | dlroW!"
],
    correctAnswer: "HELLO | dlroW?",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 3145).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`HELLO | dlroW?\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  }
,
  {
    id: "tg-2012",
    title: "JS Challenge #2012",
    difficulty: "medium",
    category: "basics",
    code: `const person = {  name: "Alice",  age: 30,  city: "New York"};const keys = Object.keys(person);const values = Object.values(person);const result = keys.map((key, index) => \`\${key}: \${values[index]}\`);console.log(result);`,
    options: [
      "[\"name: Alice\", \"city: New York\", \"age: 30\"]",
      "[\"Alice: name\", \"30: age\", \"New York: city\"]",
      "[\"Alice\", 30, \"New York\"]",
      "[\"name: Alice\", \"age: 30\", \"city: New York\"]"
],
    correctAnswer: "[\"name: Alice\", \"age: 30\", \"city: New York\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2012).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["name: Alice","age: 30","city: New York"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2015",
    title: "JS Challenge #2015",
    difficulty: "medium",
    category: "basics",
    code: `var arr = Array.from({ length: 5 }, (v, i) => i * 2);console.log(arr);`,
    options: [
      "[0, 2, 4, 6, 8]",
      "[2, 4, 6, 8, 10]",
      "[1, 3, 5, 7, 9]",
      "[0, 1, 2, 3, 4]"
],
    correctAnswer: "[0, 2, 4, 6, 8]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2015).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,2,4,6,8]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2018",
    title: "JS Challenge #2018",
    difficulty: "medium",
    category: "basics",
    code: `function trickyCount(n) {  if (n <= 1) return n;  return trickyCount(n - 1) + trickyCount(n - 2);}function wrapCount(n) {  return trickyCount(n) - trickyCount(n - 4);}console.log(wrapCount(6));`,
    options: [
      "7",
      "6",
      "4",
      "5"
],
    correctAnswer: "7",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2018).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`7\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2021",
    title: "JS Challenge #2021",
    difficulty: "medium",
    category: "basics",
    code: `function mystery(x) {  return (function(y) {    return x + y;  })(x * 2);}const result1 = mystery(2);const result2 = mystery(5);const result3 = mystery(-1);console.log(result1, result2, result3);`,
    options: [
      "6, 15, -3",
      "6, 20, -2",
      "4, 10, -1",
      "8, 25, -1"
],
    correctAnswer: "6, 15, -3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2021).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6 15 -3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2024",
    title: "JS Challenge #2024",
    difficulty: "medium",
    category: "basics",
    code: `function mysteriousFunction(a) {  let result = 0;  for (let i = 1; i <= a; i++) {    if (i % 3 === 0 && i % 5 === 0) {      result += i * 2;    } else if (i % 3 === 0) {      result += i;    } else if (i % 5 === 0) {      result -= i;    }  }  return result;}console.log(mysteriousFunction(15));`,
    options: [
      "60",
      "45",
      "15",
      "30"
],
    correctAnswer: "45",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2024).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`45\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2026",
    title: "JS Challenge #2026",
    difficulty: "medium",
    category: "basics",
    code: `function tricky() {  let a = 1;  let b = 2;  const result = (function(a) {    a = 3;    return a + b;  })(a);  return result;}console.log(tricky());`,
    options: [
      "4",
      "ReferenceError",
      "3",
      "5"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2026).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2029",
    title: "JS Challenge #2029",
    difficulty: "medium",
    category: "basics",
    code: `let symbol1 = Symbol('description');let symbol2 = Symbol('description');const obj = {  [symbol1]: 'value1',  [symbol2]: 'value2'};console.log(obj[symbol1]);console.log(symbol1 === symbol2);`,
    options: [
      "'value1' false",
      "'value2' true",
      "'value1' true",
      "'value2' false"
],
    correctAnswer: "'value1' false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2029).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1993",
    title: "JS Challenge #1993",
    difficulty: "medium",
    category: "basics",
    code: `var obj = {  a: 10,  b: 20};with (obj) {  var result = a + b;}console.log(result);`,
    options: [
      "30",
      "ReferenceError: a is not defined",
      "undefined",
      "NaN"
],
    correctAnswer: "30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1993).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1996",
    title: "JS Challenge #1996",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [2, 4, 6, 8, 10];const allEven = numbers.every(function(num) {    return num % 2 === 0;});console.log(allEven);`,
    options: [
      "true",
      "undefined",
      "false",
      "TypeError"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1996).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1999",
    title: "JS Challenge #1999",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [10, 23, 45, 60, 78];const isDivisibleByFive = numbers.some(num => num % 5 === 0);if (isDivisibleByFive) {  console.log('Some numbers are divisible by 5');} else {  console.log('No numbers are divisible by 5');}`,
    options: [
      "No numbers are divisible by 5",
      "Error: num is not defined",
      "Undefined",
      "Some numbers are divisible by 5"
],
    correctAnswer: "Some numbers are divisible by 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1999).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Some numbers are divisible by 5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2003",
    title: "JS Challenge #2003",
    difficulty: "medium",
    category: "basics",
    code: `const students = [  { name: 'Alice', age: 20 },  { name: 'Bob', age: 22 },  { name: 'Charlie', age: 23 }];const studentToFind = { name: 'Bob', age: 22 };const isIncluded = students.includes(studentToFind);console.log(isIncluded);`,
    options: [
      "false",
      "Error",
      "undefined",
      "true"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2003).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2006",
    title: "JS Challenge #2006",
    difficulty: "medium",
    category: "basics",
    code: `let arr = [1, 2, 3, 4, 5];arr.length = 3;arr.push(6, 7);console.log(arr.length);`,
    options: [
      "7",
      "4",
      "3",
      "5"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2006).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-2009",
    title: "JS Challenge #2009",
    difficulty: "medium",
    category: "basics",
    code: `let arr = [1, 2, 3, 4, 5];arr.length = 3;console.log(arr.length);console.log(arr);`,
    options: [
      "3 [1, 2, 3]",
      "5 [1, 2, 3, 4, 5]",
      "3 [1, 2, 3, 4, 5]",
      "5 [1, 2, 3]"
],
    correctAnswer: "3 [1, 2, 3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 2009).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
[1,2,3]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  }
,
  {
    id: "tg-1973",
    title: "JS Challenge #1973",
    difficulty: "medium",
    category: "basics",
    code: `let str = "Hello, World!";let result = str.substring(7, 12);console.log(result);`,
    options: [
      "lo, Wo",
      "Hello",
      "World",
      ", Worl"
],
    correctAnswer: "World",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1973).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`World\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1976",
    title: "JS Challenge #1976",
    difficulty: "medium",
    category: "basics",
    code: `const a = '10';const b = 20;const c = '30.5';const result = Number(a) + b + Number.parseFloat(c);console.log(result);`,
    options: [
      "'60.5'",
      "1020",
      "60.5",
      "3050"
],
    correctAnswer: "'60.5'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1976).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`60.5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1979",
    title: "JS Challenge #1979",
    difficulty: "medium",
    category: "basics",
    code: `function multiply(a, b = a * 2) {  return a * b;}console.log(multiply(3));`,
    options: [
      "6",
      "18",
      "12",
      "9"
],
    correctAnswer: "18",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1979).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`18\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1982",
    title: "JS Challenge #1982",
    difficulty: "medium",
    category: "basics",
    code: `class Vehicle {  static type() {    return "Generic Vehicle";  }}class Car extends Vehicle {  static type() {    return "Car";  }}console.log(Car.type());`,
    options: [
      "Vehicle",
      "Undefined",
      "Car",
      "Generic Vehicle"
],
    correctAnswer: "Car",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1982).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Car\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1985",
    title: "JS Challenge #1985",
    difficulty: "medium",
    category: "basics",
    code: `function trickyArgs(a, b, c) {  arguments[0] = 10;  arguments[1] = 20;  arguments[2] = 30;  console.log(a + b + c);}trickyArgs(1, 2, 3);`,
    options: [
      "6",
      "30",
      "60",
      "10"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1985).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`60\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1988",
    title: "JS Challenge #1988",
    difficulty: "medium",
    category: "basics",
    code: `function* numberGenerator() {  for (let i = 0; i < 3; i++) {  yield i * 2;  } } const numbers = [...numberGenerator()]; console.log(numbers);`,
    options: [
      "[1, 2, 3]",
      "[2, 4, 6]",
      "[0, 2, 4]",
      "[0, 1, 2]"
],
    correctAnswer: "[0, 2, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1988).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,2,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1991",
    title: "JS Challenge #1991",
    difficulty: "medium",
    category: "basics",
    code: `function getNextWeekday(dateString) {    const date = new Date(dateString);    const day = date.getDay();    const diff = (day === 0 ? 1 : 8) - day;    date.setDate(date.getDate() + diff);    return date.toDateString();}console.log(getNextWeekday('2023-10-20'));`,
    options: [
      "'Mon Oct 23 2023'",
      "'Fri Oct 20 2023'",
      "'Sat Oct 21 2023'",
      "'Sun Oct 22 2023'"
],
    correctAnswer: "'Mon Oct 23 2023'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1991).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Mon Oct 23 2023\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1955",
    title: "JS Challenge #1955",
    difficulty: "medium",
    category: "basics",
    code: `const WM = new WeakMap();let obj = {};let anotherObj = {};WM.set(obj, 'object data');WM.set(anotherObj, 'another object data');obj = null;// Let's check what's loggedconsole.log(WM.has(obj));console.log(WM.has(anotherObj));`,
    options: [
      "true false",
      "true true",
      "false false",
      "false true"
],
    correctAnswer: "true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1955).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1957",
    title: "JS Challenge #1957",
    difficulty: "medium",
    category: "basics",
    code: `const mySet = new Set();mySet.add(10);mySet.add(20);mySet.add(10);mySet.add(30);console.log(mySet.size);`,
    options: [
      "3",
      "4",
      "2",
      "1"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1957).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1959",
    title: "JS Challenge #1959",
    difficulty: "medium",
    category: "basics",
    code: `function* customGenerator() {    yield 'Hello';    yield 'World';    return 'Done';}const gen = customGenerator();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "Hello, World, undefined",
      "Hello, World, Done",
      "Hello, World, undefined",
      "Hello, undefined, undefined"
],
    correctAnswer: "Hello, World, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1959).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello
World
Done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1961",
    title: "JS Challenge #1961",
    difficulty: "medium",
    category: "basics",
    code: `const myObject = {  a: 1,  b: 2,  c: 3,  [Symbol.iterator]: function* () {    for (let key of Object.keys(this)) {      yield this[key];    }  }};const iter = myObject[Symbol.iterator]();console.log(iter.next().value);console.log(iter.next().value);console.log(iter.next().value);`,
    options: [
      "1 2 3",
      "1 1 1",
      "2 3 undefined",
      "undefined undefined undefined"
],
    correctAnswer: "1 2 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1961).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1967",
    title: "JS Challenge #1967",
    difficulty: "medium",
    category: "basics",
    code: `function trickyFunction() {  let a = 5;  let b = '5';  let c = 5;  if (a == b && b === c) {    console.log('Condition 1');  } else if (a === c || b == c) {    console.log('Condition 2');  } else {    console.log('Condition 3');  }}trickyFunction();`,
    options: [
      "Condition 3",
      "No output",
      "Condition 2",
      "Condition 1"
],
    correctAnswer: "Condition 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1967).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Condition 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1970",
    title: "JS Challenge #1970",
    difficulty: "medium",
    category: "basics",
    code: `function displayArguments() {  console.log(arguments.length);  console.log(arguments[0]);  console.log(arguments[2]);}displayArguments('Hello', 'World', 'JavaScript', 'Quiz');`,
    options: [
      "3 Hello undefined",
      "4 World Quiz",
      "4 Hello JavaScript",
      "4 Hello Quiz"
],
    correctAnswer: "4 Hello JavaScript",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1970).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4
Hello
JavaScript\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1939",
    title: "JS Challenge #1939",
    difficulty: "medium",
    category: "basics",
    code: `function combine(...arrays) {  return arrays.reduce((acc, arr) => [...acc, ...arr], []);}const result = combine([1, 2], [3, 4], [5, 6]);console.log(result);`,
    options: [
      "[]",
      "[[1, 2], [3, 4], [5, 6]]",
      "[1, 2, 3, 4, 5, 6]",
      "[1, [2, 3], 4, [5, 6]]"
],
    correctAnswer: "[1, 2, 3, 4, 5, 6]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1939).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4,5,6]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1941",
    title: "JS Challenge #1941",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  valueOf() {    return 42;  }};const result = obj + 8;console.log(result);`,
    options: [
      "object Object8",
      "42",
      "50",
      "undefined"
],
    correctAnswer: "50",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1941).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`50\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1943",
    title: "JS Challenge #1943",
    difficulty: "medium",
    category: "basics",
    code: `function trickyFunction() {    var a = 10;    var b = a;    b = 15;    const obj1 = { x: 1 };    const obj2 = obj1;    obj2.x = 5;    console.log(a + ' ' + b + ' ' + obj1.x);}trickyFunction();`,
    options: [
      "10 15 1",
      "15 15 5",
      "10 15 5",
      "10 10 1"
],
    correctAnswer: "10 15 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1943).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10 15 5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1946",
    title: "JS Challenge #1946",
    difficulty: "medium",
    category: "basics",
    code: `function trickyFunction() {  var x = 10;  if (x > 5) {    let y = x * 2;    x = y;  }  return x;}console.log(trickyFunction());`,
    options: [
      "20",
      "undefined",
      "10",
      "ReferenceError"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1946).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1949",
    title: "JS Challenge #1949",
    difficulty: "medium",
    category: "basics",
    code: `function trickyFunction() {  var obj = { a: 1 };  var anotherObj = obj;  obj.a = 2;  obj = { a: 3 };  anotherObj.a = 4;  return obj.a + anotherObj.a;}console.log(trickyFunction());`,
    options: [
      "6",
      "7",
      "8",
      "5"
],
    correctAnswer: "7",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1949).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`7\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1916",
    title: "JS Challenge #1916",
    difficulty: "medium",
    category: "basics",
    code: `const defaultSettings = {  theme: 'light',  notifications: true,  location: 'USA'};const userSettings = {  theme: 'dark',  location: 'Canada'};const finalSettings = {  ...defaultSettings,  ...userSettings};console.log(finalSettings);`,
    options: [
      "{ theme: 'light', notifications: true, location: 'USA' }",
      "{ theme: 'dark', notifications: true, location: 'Canada' }",
      "{ theme: 'light', notifications: true, location: 'Canada' }",
      "{ theme: 'dark', notifications: false, location: 'USA' }"
],
    correctAnswer: "{ theme: 'dark', notifications: true, location: 'Canada' }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1916).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"theme":"dark","notifications":true,"location":"Canada"}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1895",
    title: "JS Challenge #1895",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  0: "zero",  1: "one",  length: 2};console.log(Array.from(obj));`,
    options: [
      "[“zero”, “one”]",
      "[0,1]",
      "[undefined, undefined]",
      "[]"
],
    correctAnswer: "[“zero”, “one”]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1895).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["zero","one"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1898",
    title: "JS Challenge #1898",
    difficulty: "medium",
    category: "basics",
    code: `const map = new Map();map.set("key", undefined);console.log(map.has("key"), map.get("key"));`,
    options: [
      "false, undefined",
      "true, null",
      "false, null",
      "true, undefined"
],
    correctAnswer: "false, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1898).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1901",
    title: "JS Challenge #1901",
    difficulty: "medium",
    category: "basics",
    code: `class MyClass {  constructor() {    this.a = 10;  }}MyClass.prototype.b = 20;const obj = new MyClass();delete obj.b;console.log(obj.b);`,
    options: [
      "undefined",
      "20",
      "Error",
      "null"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1901).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1904",
    title: "JS Challenge #1904",
    difficulty: "medium",
    category: "basics",
    code: `const symbol1 = Symbol('desc1');const symbol2 = Symbol('desc2');const myObject = {};myObject[symbol1] = 'Value1';myObject[symbol2] = 'Value2';let output = '';for (let key in myObject) {  output += myObject[key] + ' ';}output += Object.getOwnPropertySymbols(myObject).length;console.log(output);`,
    options: [
      "Value1 Value2 2",
      "2",
      "Value1 Value2 0",
      "0"
],
    correctAnswer: "Value1 Value2 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1904).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1907",
    title: "JS Challenge #1907",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [2, 4, 6, 8];const sum = numbers.reduce((acc, num) => acc + num, 0);console.log(sum);`,
    options: [
      "20",
      "18",
      "24",
      "15"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1907).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1910",
    title: "JS Challenge #1910",
    difficulty: "medium",
    category: "basics",
    code: `var obj = {  a: 10,  b: 20,  c: 'hello'};with (obj) {  var sum = a + b;  var greeting = c + ' world';}console.log(sum, greeting);`,
    options: [
      "30 'hello world'",
      "30 'hello'",
      "'hello world' 30",
      "undefined 'hello world'"
],
    correctAnswer: "30 'hello world'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1910).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`30 hello world\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1874",
    title: "JS Challenge #1874",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1 };Object.seal(obj);obj.b = 2;console.log(obj.b);`,
    options: [
      "undefined",
      "2",
      "Error",
      "null"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1874).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1877",
    title: "JS Challenge #1877",
    difficulty: "medium",
    category: "basics",
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: [
      "true",
      "false",
      "Error",
      "undefined"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1877).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1880",
    title: "JS Challenge #1880",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b: function() {    return this.a;  }};const b = obj.b;console.log(b());`,
    options: [
      "1",
      "undefined",
      "null",
      "Error"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1880).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1883",
    title: "JS Challenge #1883",
    difficulty: "medium",
    category: "basics",
    code: `function* gen() {  yield 1;  yield 2;  return 3;}const g = gen();console.log([...g]);`,
    options: [
      "[1,2,3]",
      "[1,2]",
      "[1]",
      "Error"
],
    correctAnswer: "[1,2]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1883).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1886",
    title: "JS Challenge #1886",
    difficulty: "medium",
    category: "basics",
    code: `const nums = [1, 2, 3];const res = nums.reduce((acc, val) => acc + val, "");console.log(typeof res);`,
    options: [
      "“number”",
      "“string”",
      "“object”",
      "Error"
],
    correctAnswer: "“string”",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1886).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1889",
    title: "JS Challenge #1889",
    difficulty: "medium",
    category: "basics",
    code: `(async function() {  return await 10;})().then(console.log);`,
    options: [
      "10",
      "undefined",
      "Error",
      "Promise { 10 }"
],
    correctAnswer: "10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1889).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1855",
    title: "JS Challenge #1855",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  valueOf: () => 42,  toString: () => "Hello"};console.log(\`\${obj}\`, obj + 10);`,
    options: [
      "“42”, 52",
      "“Hello”, 52",
      "“Hello”, 42",
      "“Hello”, “[Object object]”"
],
    correctAnswer: "“42”, 52",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1855).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello 52\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1861",
    title: "JS Challenge #1861",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3];arr[-1] = 10;console.log(arr.length, arr[-1]);`,
    options: [
      "3, undefined",
      "4, 10",
      "3, 10",
      "Error"
],
    correctAnswer: "3, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1861).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3 10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1864",
    title: "JS Challenge #1864",
    difficulty: "medium",
    category: "basics",
    code: `const x = (() => {  try {    return 10;  } finally {    return 20;  }})();console.log(x);`,
    options: [
      "10",
      "20",
      "undefined",
      "Error"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1864).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1867",
    title: "JS Challenge #1867",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};Object.defineProperty(obj, "prop", {  value: 42,  writable: false});obj.prop = 100;console.log(obj.prop);`,
    options: [
      "1",
      "42",
      "2",
      "Error"
],
    correctAnswer: "42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1867).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1871",
    title: "JS Challenge #1871",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2];arr.length = 0;console.log(arr[0]);`,
    options: [
      "1",
      "2",
      "Error",
      "undefined"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1871).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1835",
    title: "JS Challenge #1835",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3];arr[10] = 11;console.log(arr.length);`,
    options: [
      "3",
      "4",
      "11",
      "10"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1835).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1839",
    title: "JS Challenge #1839",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b: 2,  a: 3};console.log(obj.a);`,
    options: [
      "1",
      "2",
      "3",
      "Error"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1839).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1842",
    title: "JS Challenge #1842",
    difficulty: "medium",
    category: "basics",
    code: `console.log([..."hello"]);`,
    options: [
      "[\"h\", \"e\", \"l\", \"l\", \"o\"]",
      "[\"hello\"]",
      "Error",
      "[\"h\", \"ello\"]"
],
    correctAnswer: "[\"h\", \"e\", \"l\", \"l\", \"o\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1842).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["h","e","l","l","o"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1845",
    title: "JS Challenge #1845",
    difficulty: "medium",
    category: "basics",
    code: `Number.prototype[Symbol.iterator] = function*() { yield *['a','b','c'] };console.log([...1]);`,
    options: [
      "['a', 'b', 'c']",
      "Error",
      "[NaN, NaN, NaN]",
      "1"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1845).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: 1 is not iterable\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1848",
    title: "JS Challenge #1848",
    difficulty: "medium",
    category: "basics",
    code: `console.log([…({ [Symbol.iterator]: function*(){ yield *[1, yield *[2,3] ] } })])`,
    options: [
      "[1,2,3]",
      "[1, [2,3]]",
      "Error",
      "[2, 3, 1, undefined]"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1848).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Invalid or unexpected token\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1814",
    title: "JS Challenge #1814",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { value: 10 };const result = (obj.value += 5) && obj.value;console.log(result);`,
    options: [
      "5",
      "15",
      "undefined",
      "Error"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1814).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1817",
    title: "JS Challenge #1817",
    difficulty: "medium",
    category: "basics",
    code: `async function test() {  return (await Promise.resolve(0)) || 10;}test().then(console.log);`,
    options: [
      "0",
      "10",
      "undefined",
      "Error"
],
    correctAnswer: "0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1817).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1820",
    title: "JS Challenge #1820",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3];const copy = [...arr];copy.push(4);console.log(arr);console.log(copy);`,
    options: [
      "[1, 2, 3, 4], Error",
      "[1, 2, 3], Error",
      "[1, 2, 3, 4], [1, 2, 3, 4]",
      "[1, 2, 3], [1, 2, 3, 4]"
],
    correctAnswer: "[1, 2, 3, 4], Error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1820).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3]
[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1823",
    title: "JS Challenge #1823",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof typeof 42);`,
    options: [
      "number",
      "string",
      "object",
      "Error"
],
    correctAnswer: "string",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1823).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1826",
    title: "JS Challenge #1826",
    difficulty: "medium",
    category: "basics",
    code: `let name = "Alice";(function() {  let name = "Bob";  console.log(name);})();console.log(name);`,
    options: [
      "\"Bob\", \"Alice\"",
      "\"Alice\", \"Alice\"",
      "\"Bob\", \"Bob",
      "\"Alice\", \"Bob\""
],
    correctAnswer: "\"Bob\", \"Alice\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1826).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Bob
Alice\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1829",
    title: "JS Challenge #1829",
    difficulty: "medium",
    category: "basics",
    code: `const sym1 = Symbol("id");const sym2 = Symbol("id");console.log(sym1 === sym2);`,
    options: [
      "true",
      "undefined",
      "Error",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1829).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1793",
    title: "JS Challenge #1793",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof null);console.log(typeof function () {});`,
    options: [
      "\"object\", \"object\"",
      "\"null\", \"function\"",
      "\"object\", \"function\"",
      "\"null\", \"object\""
],
    correctAnswer: "\"object\", \"object\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1793).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`object
function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1796",
    title: "JS Challenge #1796",
    difficulty: "medium",
    category: "basics",
    code: `console.log('A');setTimeout(() => console.log('B'), 0);Promise.resolve()  .then(() => {    console.log('C');    return Promise.resolve();  })  .then(() => console.log('D'));console.log('E');`,
    options: [
      "A, C, D, E, B",
      "A, E, B, C, D",
      "A, C, E, D, B",
      "A, E, C, D, B"
],
    correctAnswer: "A, C, D, E, B",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1796).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
E
C
D
B\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1799",
    title: "JS Challenge #1799",
    difficulty: "medium",
    category: "basics",
    code: `function memoize(fn) {  const cache = {};  return (arg) => cache[arg] ?? (cache[arg] = fn(arg));}const square = memoize((n) => n * n);console.log(square(5)); console.log(square(5)); console.log(square(6));`,
    options: [
      "25, 25, 36",
      "25, 0, 36",
      "25, undefined, 36",
      "25, 25, 25"
],
    correctAnswer: "25, 25, 36",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1799).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`25
25
36\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1802",
    title: "JS Challenge #1802",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 10 };console.log(obj.a && obj.b || 20);`,
    options: [
      "10",
      "20",
      "undefined",
      "Error"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1802).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1805",
    title: "JS Challenge #1805",
    difficulty: "medium",
    category: "basics",
    code: `const a = false || 0 || "" || null || "JavaScript";console.log(a);`,
    options: [
      "null",
      "false",
      "\"\"",
      "JavaScript"
],
    correctAnswer: "\"\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1805).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`JavaScript\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1808",
    title: "JS Challenge #1808",
    difficulty: "medium",
    category: "basics",
    code: `function Person(name) {  this.name = name;  this.sayName = () => console.log(this.name);}const person1 = new Person('David');const person2 = { name: 'Not David', sayName: person1.sayName };person2.sayName();`,
    options: [
      "Not David",
      "David",
      "undefined",
      "Error"
],
    correctAnswer: "Not David",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1808).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`David\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1811",
    title: "JS Challenge #1811",
    difficulty: "medium",
    category: "basics",
    code: `const factorial = (function () {  const cache = {};  return function inner(n) {    if (n in cache) return cache[n];    return (cache[n] = n <= 1 ? 1 : n * inner(n - 1));  };})();console.log(factorial(5)); console.log(factorial(5));`,
    options: [
      "120, 120",
      "120, undefined",
      "Error",
      "5, 5"
],
    correctAnswer: "120, 120",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1811).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`120
120\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1774",
    title: "JS Challenge #1774",
    difficulty: "medium",
    category: "basics",
    code: `for (var i = 0; i < 3; i++) {  setTimeout(() => console.log(i), 100);}`,
    options: [
      "0, 1, 2",
      "3, 3, 3",
      "0, 1, 2, 3",
      "Undefined behavior"
],
    correctAnswer: "0, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1774).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
3
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1777",
    title: "JS Challenge #1777",
    difficulty: "medium",
    category: "basics",
    code: `function Person(name) {  this.name = name;}Person.prototype.greet = function () {  console.log(\`Hello, \${this.name}\`);};const person = new Person('Alice');person.greet();console.log(person.hasOwnProperty('greet'));`,
    options: [
      "Hello, Alice; true",
      "Hello, Alice; false",
      "Error",
      "Hello, Alice; undefined"
],
    correctAnswer: "Hello, Alice; true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1777).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, Alice
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1780",
    title: "JS Challenge #1780",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof NaN);console.log(NaN === NaN);`,
    options: [
      "\"number\", true",
      "\"undefined\", false",
      "\"number\", false",
      "\"NaN\", true"
],
    correctAnswer: "\"number\", true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1780).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`number
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1783",
    title: "JS Challenge #1783",
    difficulty: "medium",
    category: "basics",
    code: `async function test() {  console.log(1);  await new Promise(resolve => setTimeout(resolve, 1000));  console.log(2);  return 3;}console.log(4);test().then(console.log);console.log(5);`,
    options: [
      "4, 1, 5, 2, 3",
      "4, 1, 2, 5, 3",
      "1, 4, 2, 3, 5",
      "1, 4, 2, 5, 3"
],
    correctAnswer: "4, 1, 5, 2, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1783).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4
1
5
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1786",
    title: "JS Challenge #1786",
    difficulty: "medium",
    category: "basics",
    code: `function Animal(name) {  this.name = name;}Animal.prototype.sound = 'Generic sound';const dog = new Animal('Dog');Animal.prototype.sound = 'Bark';console.log(dog.sound);`,
    options: [
      "Undefined",
      "Error",
      "Bark",
      "Generic sound"
],
    correctAnswer: "Bark",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1786).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Bark\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1789",
    title: "JS Challenge #1789",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 10,  getValue: function () {    return () => this.value;  }};const value = 20;const getValue = obj.getValue();console.log(getValue());`,
    options: [
      "10",
      "20",
      "undefined",
      "Error"
],
    correctAnswer: "10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1789).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1752",
    title: "JS Challenge #1752",
    difficulty: "medium",
    category: "basics",
    code: `const obj = Object.freeze({  name: "Alice",  info: {    age: 25  }});try {  obj.name = "Bob";  obj.info.age = 30;} catch (e) {  console.log("Error:", e.message);}console.log(obj.name, obj.info.age);`,
    options: [
      "Error: Cannot assign to read-only property 'name' -> Alice 25",
      "Error: Cannot assign to read-only property 'name' -> Bob 30",
      "Alice 30",
      "Bob 30"
],
    correctAnswer: "Alice 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1752).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Alice 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1755",
    title: "JS Challenge #1755",
    difficulty: "medium",
    category: "basics",
    code: `function* numberGenerator() {  let i = 0;  while (i < 3) {    yield i++;  }}const gen = numberGenerator();console.log(gen.next().value);console.log(gen.return(10).value);console.log(gen.next().value);`,
    options: [
      "0 10 undefined",
      "0 10 10",
      "0 3 3",
      "0 10 3"
],
    correctAnswer: "0 10 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1755).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0
10
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1758",
    title: "JS Challenge #1758",
    difficulty: "medium",
    category: "basics",
    code: `function processData({ a = 10, b = 20 } = { a: 30 }) {  console.log(a, b);}processData({ a: 5 });processData();`,
    options: [
      "Error",
      "5 20 5 20",
      "5 20 30 20",
      "5 20 undefined 20"
],
    correctAnswer: "5 20 30 20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1758).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5 20
30 20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1761",
    title: "JS Challenge #1761",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};Object.defineProperty(obj, 'name', {  value: 'Alice',  writable: false,  configurable: false});try {  obj.name = 'Bob';  delete obj.name;  console.log(obj.name);} catch (e) {  console.log('Error:', e.message);}`,
    options: [
      "Error: Cannot assign to read-only property 'name' -> Alice",
      "Error: Cannot delete property 'name' -> Alice",
      "Error: Cannot assign to read-only property 'name' -> Error: Cannot delete property 'name' -> Alice",
      "Alice"
],
    correctAnswer: "Error: Cannot assign to read-only property 'name' -> Alice",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1761).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Alice\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1764",
    title: "JS Challenge #1764",
    difficulty: "medium",
    category: "basics",
    code: `const map = new Map();const key1 = {};const key2 = key1;map.set(key1, "Value for key1");map.set(key2, "Value for key2");console.log(map.get({}));console.log(map.get(key1));`,
    options: [
      "undefined  Value for key1",
      "undefined  Value for key2",
      "Value for key2 Value for key2",
      "Value for key1 Value for key2"
],
    correctAnswer: "undefined  Value for key2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1764).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined
Value for key2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1768",
    title: "JS Challenge #1768",
    difficulty: "medium",
    category: "basics",
    code: `Promise.resolve(1)  .then(value => {    console.log(value);    throw new Error('Something went wrong');  })  .then(() => {    console.log('This will not run');  })  .catch(error => {    console.log('Caught:', error.message);    return 42;  })  .then(value => {    console.log('Recovered with:', value);  });`,
    options: [
      "1, This will not run, Caught: Something went wrong, Recovered with: 42",
      "1, Caught: Something went wrong, This will not run",
      "1, Caught: Something went wrong , Recovered with: 42",
      "1, Caught: Something went wrong, Error"
],
    correctAnswer: "1, This will not run, Caught: Something went wrong, Recovered with: 42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1768).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
Caught: Something went wrong
Recovered with: 42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1732",
    title: "JS Challenge #1732",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1);setTimeout(() => console.log(2), 0);Promise.resolve()  .then(() => {    console.log(3);    return Promise.resolve(4);  })  .then(console.log);console.log(5);`,
    options: [
      "1, 5, 3, 2, 4",
      "1, 5, 3, 4, 2",
      "1, 5, 2 ,3, 4",
      "1, 5, 4, 3, 2"
],
    correctAnswer: "1, 5, 3, 2, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1732).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
5
3
4
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1735",
    title: "JS Challenge #1735",
    difficulty: "medium",
    category: "basics",
    code: `console.log('A');setTimeout(() => console.log('B'), 0);Promise.resolve().then(() => console.log('C'));console.log('D');`,
    options: [
      "A, B, C, D",
      "A, D, B, C",
      "A, C, D, B",
      "A, D, C, B"
],
    correctAnswer: "A, B, C, D",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1735).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`A
D
C
B\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1738",
    title: "JS Challenge #1738",
    difficulty: "medium",
    category: "basics",
    code: `setTimeout(() => {  console.log('setTimeout 1');  Promise.resolve().then(() => console.log('Promise 1'));}, 0);Promise.resolve().then(() => {  console.log('Promise 2');  setTimeout(() => console.log('setTimeout 2'), 0);});console.log('Sync');`,
    options: [
      "Sync, setTimeout 1, Promise 1, Promise 2, setTimeout 2",
      "Sync, Promise 2, setTimeout 1, Promise 1, setTimeout 2",
      "Sync, Promise 2, setTimeout 1, setTimeout 2, Promise 1",
      "Sync, setTimeout 1, Promise 2, Promise 1, setTimeout 2"
],
    correctAnswer: "Sync, setTimeout 1, Promise 1, Promise 2, setTimeout 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1738).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sync
Promise 2
setTimeout 1
Promise 1
setTimeout 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1741",
    title: "JS Challenge #1741",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncFunc() {  console.log('Async Start');  await new Promise(resolve => setTimeout(resolve, 100));  console.log('Async End');}console.log('Script Start');asyncFunc();setTimeout(() => console.log('Timeout 1'), 50);setTimeout(() => console.log('Timeout 2'), 150);console.log('Script End');`,
    options: [
      "Script Start, Async Start, Timeout 1, Script End, Async End, Timeout 2",
      "Script Start, Async Start, Script End, Timeout 1, Async End, Timeout 2",
      "Script Start, Async Start, Script End, Timeout 1, Timeout 2, Async End",
      "Script Start, Async Start, Timeout 1, Timeout 2, Script End, Async End"
],
    correctAnswer: "Script Start, Async Start, Timeout 1, Script End, Async End, Timeout 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1741).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Script Start
Async Start
Script End
Timeout 1
Async End
Timeout 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1744",
    title: "JS Challenge #1744",
    difficulty: "medium",
    category: "basics",
    code: `setTimeout(() => {  console.log('Timeout');  Promise.resolve().then(() => console.log('Promise after Timeout'));}, 0);Promise.resolve().then(() => console.log('Promise'));console.log('End of script');`,
    options: [
      "Timeout, Promise after Timeout, Promise, End of script",
      "End of script, Promise, Timeout, Promise after Timeout",
      "End of script, Timeout, Promise, Promise after Timeout",
      "Promise, End of script, Timeout, Promise after Timeout"
],
    correctAnswer: "Timeout, Promise after Timeout, Promise, End of script",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1744).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`End of script
Promise
Timeout
Promise after Timeout\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1746",
    title: "JS Challenge #1746",
    difficulty: "medium",
    category: "basics",
    code: `setTimeout(() => console.log('Timeout 1'), 100);setTimeout(() => {  console.log('Timeout 2');  Promise.resolve().then(() => console.log('Promise in Timeout 2'));}, 50);Promise.resolve().then(() => console.log('Promise 1'));setTimeout(() => console.log('Timeout 3'), 150);console.log('Sync');`,
    options: [
      "Sync, Promise 1, Timeout 2, Timeout 1, Timeout 3, Promise in Timeout 2",
      "Sync, Timeout 2, Promise 1, Timeout 1, Promise in Timeout 2, Timeout 3",
      "Sync, Promise 1, Timeout 2, Promise in Timeout 2, Timeout 1, Timeout 3",
      "Sync, Promise 1, Timeout 1, Timeout 2, Promise in Timeout 2, Timeout 3"
],
    correctAnswer: "Sync, Promise 1, Timeout 2, Timeout 1, Timeout 3, Promise in Timeout 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1746).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Sync
Promise 1
Timeout 2
Promise in Timeout 2
Timeout 1
Timeout 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1749",
    title: "JS Challenge #1749",
    difficulty: "medium",
    category: "basics",
    code: `async function first() {  console.log('First Start');  await second();  console.log('First End');}async function second() {  console.log('Second Start');}console.log('Script Start');first();setTimeout(() => console.log('Timeout'), 0);console.log('Script End');`,
    options: [
      "Script Start, First Start, Second Start, Script End, First End, Timeout",
      "First Start, Script Start, Second Start, Script End, First End, Timeout",
      "Script Start, First Start, Second Start, First End, Script End,  Timeout",
      "Script Start, First Start, First End, Second Start, Script End,  Timeout"
],
    correctAnswer: "Script Start, First Start, Second Start, Script End, First End, Timeout",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1749).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Script Start
First Start
Second Start
Script End
First End
Timeout\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1714",
    title: "JS Challenge #1714",
    difficulty: "medium",
    category: "basics",
    code: `const original = Object.freeze({ a: [1, 2, 3] });const copy = { ...original };copy.a.push(4);console.log(original.a);console.log(copy.a);`,
    options: [
      "[1, 2, 3], [1, 2, 3, 4]",
      "[1, 2, 3, 4], [1, 2, 3, 4]",
      "[1, 2, 3, 4], [1, 2, 3]",
      "[1, 2, 3], [4]"
],
    correctAnswer: "[1, 2, 3], [1, 2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1714).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]
[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1717",
    title: "JS Challenge #1717",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve) => {  console.log('Promise started');  setTimeout(() => {    resolve('Promise resolved');  }, 100);});promise.then((result) => {  console.log(result);});console.log('End of script');`,
    options: [
      "Promise started, End of script, Promise resolved",
      "End of script, Promise started, Promise resolved",
      "Promise started, Promise resolved, End of script",
      "Promise resolved, Promise started, End of script"
],
    correctAnswer: "Promise started, End of script, Promise resolved",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1717).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Promise started
End of script
Promise resolved\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1720",
    title: "JS Challenge #1720",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 100,  method: function() {    const inner = function() {      console.log(this.value);    };    inner();  }};obj.method();`,
    options: [
      "100",
      "undefined",
      "Error",
      "0"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1720).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1723",
    title: "JS Challenge #1723",
    difficulty: "medium",
    category: "basics",
    code: `function* generatorFunction() {  yield 1;  yield* function* () {    yield 2;    yield 3;  }();  yield 4;}const gen = generatorFunction();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, 2, 3, undefined, 4",
      "1, 3, 4, undefined, undefined",
      "1, 2, 3, undefined, undefined",
      "1, 2, 3, 4, undefined"
],
    correctAnswer: "1, 2, 3, undefined, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1723).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
4
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1726",
    title: "JS Challenge #1726",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3];const newArr = arr.map(num => num * 2);newArr.push(4);arr[0] = 0;console.log(arr);console.log(newArr);`,
    options: [
      "[0, 2, 3], [2, 4, 6]",
      "[1, 2, 3], [2, 4, 6, 4]",
      "[1, 2, 3], [2, 4, 6]",
      "[0, 2, 3], [2, 4, 6, 4]"
],
    correctAnswer: "[0, 2, 3], [2, 4, 6]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1726).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,2,3]
[2,4,6,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1729",
    title: "JS Challenge #1729",
    difficulty: "medium",
    category: "basics",
    code: `async function fetchData() {  console.log('Fetching...');  await new Promise((resolve) => {    setTimeout(() => {      console.log('Data fetched');      resolve();    }, 100);  });  console.log('Process completed');}fetchData();console.log('End of script');`,
    options: [
      "Data fetched, Fetching..., End of script, Process completed",
      "Fetching..., End of script, Process completed, Data fetched",
      "Fetching..., Data fetched, End of script, Process completed",
      "Fetching..., End of script, Data fetched, Process completed"
],
    correctAnswer: "Data fetched, Fetching..., End of script, Process completed",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1729).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Fetching...
End of script
Data fetched
Process completed\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1696",
    title: "JS Challenge #1696",
    difficulty: "medium",
    category: "basics",
    code: `function tag(strings, ...values) {  return strings[0] + values[0] * 2 + strings[1] + values[1] + strings[2];}const num1 = 5;const num2 = 10;const result = tag\`Double \${num1} and add \${num2}!\`;console.log(result);`,
    options: [
      "Double 5 and add 10!",
      "Double 10 and add 10!",
      "Double 10 and add 5!",
      "Double 10 and add 20!"
],
    correctAnswer: "Double 10 and add 10!",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1696).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Double 10 and add 10!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1699",
    title: "JS Challenge #1699",
    difficulty: "medium",
    category: "basics",
    code: `function tag(strings, ...values) {  return strings.reduce((acc, str, i) => {    return acc + str + (values[i] ? values[i].toUpperCase() : '');  }, '');}const first = "hello";const second = "world";const result = tag\`\${first} and \${second} are great!\`;console.log(result);`,
    options: [
      "HELLO and WORLD are great!",
      "hello and world are great!",
      "HELLO and WORLD",
      "HELLO and WORLD are great!HELLO"
],
    correctAnswer: "HELLO and WORLD are great!",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1699).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`HELLO and WORLD are great!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1702",
    title: "JS Challenge #1702",
    difficulty: "medium",
    category: "basics",
    code: `let funcs = [];for (var i = 0; i < 3; i++) {  funcs.push(() => i);}console.log(funcs[0]());console.log(funcs[1]());console.log(funcs[2]());`,
    options: [
      "0, 1, 2",
      "0, 0, 0",
      "2, 2, 2",
      "3, 3, 3"
],
    correctAnswer: "0, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1702).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
3
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1705",
    title: "JS Challenge #1705",
    difficulty: "medium",
    category: "basics",
    code: `const person = {  name: "John",  greet: function() {    const getMessage = () => \`Hello, \${this.name}\`;    return getMessage();  }};console.log(person.greet());`,
    options: [
      "Hello, undefined",
      "Hello, John",
      "Hello, [object Object]",
      "Error"
],
    correctAnswer: "Hello, John",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1705).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, John\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1708",
    title: "JS Challenge #1708",
    difficulty: "medium",
    category: "basics",
    code: `const animal = {  sound: "Generic sound",  makeSound() {    return this.sound;  }};const dog = Object.freeze(Object.create(animal));dog.sound = "Bark";const result = dog.makeSound();console.log(result);`,
    options: [
      "Generic sound",
      "undefined",
      "Bark",
      "Error"
],
    correctAnswer: "Generic sound",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1708).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Generic sound\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1674",
    title: "JS Challenge #1674",
    difficulty: "medium",
    category: "basics",
    code: `async function foo() {  console.log('Start');  await Promise.resolve().then(() => {    console.log('Inside Promise');  });  console.log('End');}foo();console.log('Outside');`,
    options: [
      "Start, Inside Promise, End, Outside",
      "Start, Inside Promise, Outside, End",
      "Start, Outside, End, Inside Promise",
      "Start, Outside, Inside Promise, End"
],
    correctAnswer: "Start, Inside Promise, End, Outside",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1674).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Outside
Inside Promise
End\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1653",
    title: "JS Challenge #1653",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  num: 10,  getValue() {    return this.num;  },  getUpdatedValue() {    return (() => this.num + 10)();  }};console.log(obj.getValue());console.log(obj.getUpdatedValue());`,
    options: [
      "10, 20",
      "20, 20",
      "20, 30",
      "10, 30"
],
    correctAnswer: "10, 20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1653).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10
20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1656",
    title: "JS Challenge #1656",
    difficulty: "medium",
    category: "basics",
    code: `let num = 5;function change() {  let num = 10;  return function() {    return num;  };}const getValue = change();num = 20;console.log(getValue());`,
    options: [
      "10",
      "5",
      "20",
      "Error"
],
    correctAnswer: "10",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1656).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1659",
    title: "JS Challenge #1659",
    difficulty: "medium",
    category: "basics",
    code: `function outer() {  var x = 1;    function inner() {    var x = 2;        function deeper() {      console.log(x);    }        return deeper;  }    return inner();}const fn = outer();fn();`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1659).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1662",
    title: "JS Challenge #1662",
    difficulty: "medium",
    category: "basics",
    code: `const obj = Object.freeze({  a: [1, 2, 3],  b: {    c: 4  }});obj.a.push(4);obj.b.c = 5;console.log(obj.a);console.log(obj.b.c);`,
    options: [
      "[1, 2, 3, 4], 5",
      "[1, 2, 3], 5",
      "[1, 2, 3, 4], 4",
      "[1, 2, 3], 5"
],
    correctAnswer: "[1, 2, 3, 4], 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1662).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1665",
    title: "JS Challenge #1665",
    difficulty: "medium",
    category: "basics",
    code: `async function process() {  console.log('Start');  await new Promise(resolve => setTimeout(resolve, 0));  console.log('Middle');  return 'Done';}process().then(result => console.log(result));console.log('End');`,
    options: [
      "Start, Middle, End, Done",
      "Start, End, Done, Middle",
      "Start, End, Middle, Done",
      "Start, Middle, Done, End"
],
    correctAnswer: "Start, Middle, End, Done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1665).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
End
Middle
Done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1668",
    title: "JS Challenge #1668",
    difficulty: "medium",
    category: "basics",
    code: `function* gen() {  yield* [1, 2, 3].map(x => x * 2);}const iterator = gen();console.log(iterator.next().value);console.log(iterator.next().value);console.log(iterator.next().value);console.log(iterator.next().value);`,
    options: [
      "2, 4, 6, Error",
      "2, 4, 6, 12",
      "2, 4, 6, undefined",
      "2, 4, 6, 6"
],
    correctAnswer: "2, 4, 6, Error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1668).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
4
6
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1634",
    title: "JS Challenge #1634",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 42,  getValue() {    return Math.max(this.value, 50);  }};const obj2 = {  value: 25,  getValue: obj.getValue};console.log(obj.getValue());console.log(obj2.getValue());`,
    options: [
      "50, 50",
      "42, 50",
      "42, 25",
      "50, 42"
],
    correctAnswer: "50, 50",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1634).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`50
50\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1643",
    title: "JS Challenge #1643",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  count: 0,  increment() {    this.count++;  },  getCount() {    return (() => this.count)();  }};obj.increment();obj.increment();console.log(obj.getCount());`,
    options: [
      "0",
      "2",
      "1",
      "3"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1643).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1646",
    title: "JS Challenge #1646",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  data: [1, 2, 3],  getData() {    return this.data.map(x => x * 2);  }};const newData = obj.getData.bind({ data: [4, 5, 6] })();console.log(newData);`,
    options: [
      "[1, 2, 3]",
      "[2, 4, 6]",
      "[8, 10, 12]",
      "[4, 6, 8]"
],
    correctAnswer: "[8, 10, 12]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1646).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[8,10,12]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1649",
    title: "JS Challenge #1649",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 1,  increment() {    this.value++;  }};const increment = obj.increment;increment();console.log(obj.value);`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1649).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1612",
    title: "JS Challenge #1612",
    difficulty: "medium",
    category: "basics",
    code: `function* infiniteGenerator() {  let i = 0;  while (true) {    yield i++;  }}const weakMap = new WeakMap();const gen = infiniteGenerator();weakMap.set(gen, gen.next().value);const result = weakMap.get(gen) + gen.next().value;console.log(result);`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1612).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1617",
    title: "JS Challenge #1617",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const arr = [1, 2, 3, 4];const objs = arr.map(n => ({ n }));objs.forEach((obj, index) => weakMap.set(obj, arr.slice(0, index + 1)));const result = objs.map(obj => weakMap.get(obj).reduce((acc, num) => acc + num, 0));console.log(result);`,
    options: [
      "[1, 3, 6, 10]",
      "[1, 2, 3, 4]",
      "[4, 3, 2, 1]",
      "Error"
],
    correctAnswer: "[1, 3, 6, 10]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1617).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,3,6,10]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1619",
    title: "JS Challenge #1619",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const arr = [{}, {}, {}];arr.forEach((obj, index) => weakMap.set(obj, index));arr.splice(1, 1); // Remove the second elementconst result = arr.map(obj => weakMap.get(obj));console.log(result);`,
    options: [
      "[0, 2]",
      "[0, undefined ]",
      "[undefined, 2]",
      "[0, 1, 2]"
],
    correctAnswer: "[0, 2]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1619).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1623",
    title: "JS Challenge #1623",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  outer: 1,  inner: {    outer: 10,    inner: 20  }};let result = 0;with (obj) {  result += outer;  with (inner) {    result += outer + inner;  }}console.log(result);`,
    options: [
      "31",
      "21",
      "11",
      "30"
],
    correctAnswer: "31",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1623).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`31\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1625",
    title: "JS Challenge #1625",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [0,0,0];let i = 0;const result = numbers.reduce((acc, _) => {  return ++acc;}, i);console.log(i, result);`,
    options: [
      "0 0",
      "3 3",
      "3 2",
      "0 3"
],
    correctAnswer: "0 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1625).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1628",
    title: "JS Challenge #1628",
    difficulty: "medium",
    category: "basics",
    code: `function createCounter() {  let count = 0;  return {    increment() {      count++;      return count;    },    getCount() {      return count;    }  };}const counter = createCounter();console.log(counter.increment());console.log(counter.getCount());console.log(counter.increment());console.log(counter.getCount());`,
    options: [
      "1, 0, 2, 1",
      "1, 2, 2, 2",
      "1, 1, 1, 2",
      "1, 1, 2, 2"
],
    correctAnswer: "1, 0, 2, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1628).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
1
2
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1593",
    title: "JS Challenge #1593",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const array = [1, 2, 3];const obj = {};weakMap.set(obj, array);const result = weakMap.get(obj).reduce((acc, val) => acc + val);console.log(result);`,
    options: [
      "6",
      "[1, 2, 3]",
      "\"123\"",
      "Error"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1593).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1596",
    title: "JS Challenge #1596",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const obj1 = {};const obj2 = { key: 'value' };weakMap.set(obj1, obj2);const result = weakMap.get(obj1).key.split('').reverse().join('');console.log(result);`,
    options: [
      "Error",
      "\"value\"",
      "\"eulav\"",
      "undefined"
],
    correctAnswer: "\"eulav\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1596).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`eulav\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1599",
    title: "JS Challenge #1599",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const objs = [{}, {}, {}];objs.forEach((obj, index) => weakMap.set(obj, index + 1));const result = objs.filter(obj => weakMap.has(obj)).map(obj => weakMap.get(obj) * 2);console.log(result);`,
    options: [
      "[1, 2, 3]",
      "Error",
      "[]",
      "[2, 4, 6]"
],
    correctAnswer: "[2, 4, 6]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1599).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,4,6]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1603",
    title: "JS Challenge #1603",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b: 2};let a = 10;let b = 20;with (obj) {  a += 1;  b += 1;}console.log(a, obj.a, b, obj.b);`,
    options: [
      "11 1 21 2",
      "11 2 21 3",
      "10 2 20 3",
      "10 1 20 2"
],
    correctAnswer: "10 2 20 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1603).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10 2 20 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1605",
    title: "JS Challenge #1605",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = {  name: "Alice",  age: 25};const obj2 = {  age: 30,  city: "Wonderland"};with (obj1) {  with (obj2) {    name = "Bob";    console.log(name, age);  }}`,
    options: [
      "Bob 30",
      "Alice 25",
      "Bob 25",
      "undefined 30"
],
    correctAnswer: "Bob 30",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1605).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Bob 30\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1609",
    title: "JS Challenge #1609",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const arr = [1, 2, 3].map(n => ({ n }));arr.forEach(obj => weakMap.set(obj, obj.n * 2));arr.pop(); // Remove the last elementconst result = arr.reduce((acc, obj) => acc + weakMap.get(obj), 0);console.log(result);`,
    options: [
      "2",
      "6",
      "4",
      "10"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1609).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1572",
    title: "JS Challenge #1572",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const obj1 = {};const obj2 = {};weakMap.set(obj1, 'value1');weakMap.set(obj2, 'value2');const arr = [obj1, obj2];const result = arr.map(obj => weakMap.get(obj)).join(', ');console.log(result);`,
    options: [
      "Error",
      "\"value1, undefined\"",
      "\"undefined, undefined\"",
      "\"value1, value2\""
],
    correctAnswer: "\"value1, value2\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1572).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1, value2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1575",
    title: "JS Challenge #1575",
    difficulty: "medium",
    category: "basics",
    code: `function* idGenerator() {  let id = 1;  while (true) {    yield id++;  }}const gen = idGenerator();const weakMap = new WeakMap();const objs = [{}, {}, {}];objs.forEach(obj => weakMap.set(obj, gen.next().value));const result = objs.map(obj => weakMap.get(obj)).filter(id => id % 2 === 0);console.log(result);`,
    options: [
      "[1, 2, 3]",
      "[1, 3]",
      "[2]",
      "Error"
],
    correctAnswer: "[2]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1575).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1578",
    title: "JS Challenge #1578",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const obj = {};(function() {  const obj1 = { name: 'inner' };  weakMap.set(obj1, 'inner value');})();const result = weakMap.get(obj);console.log(result);`,
    options: [
      "\"inner value\"",
      "Error",
      "undefined",
      "null"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1578).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1581",
    title: "JS Challenge #1581",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const obj = {};const gen = (function* () {  yield 'value1';  yield 'value2';})();weakMap.set(obj, gen.next().value);console.log(weakMap.get(obj));console.log(gen.next().value);`,
    options: [
      "Error",
      "\"valie1\", undefined",
      "\"value1\", \"value2\"",
      "\"value2\", \"value2\""
],
    correctAnswer: "Error",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1581).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1
value2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1584",
    title: "JS Challenge #1584",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const gen = (function* () {  yield { key: 'value1' };  yield { key: 'value2' };})();const obj1 = gen.next().value;const obj2 = gen.next().value;weakMap.set(obj1, 'stored value1');weakMap.set(obj2, 'stored value2');const result = [...gen].map(obj => weakMap.get(obj));console.log(result);`,
    options: [
      "[undefined, undefined]",
      "[]",
      "[\"stored value1\", \"stored value2\"]",
      "[null, null]"
],
    correctAnswer: "[]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1584).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1587",
    title: "JS Challenge #1587",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const array = [{}, {}];array.forEach(obj => weakMap.set(obj, obj));const result = array.map(obj => weakMap.get(obj) === obj);console.log(result);`,
    options: [
      "[false, false]",
      "[true, false]",
      "Error",
      "[true, true]"
],
    correctAnswer: "[true, true]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1587).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[true,true]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1590",
    title: "JS Challenge #1590",
    difficulty: "medium",
    category: "basics",
    code: `const weakMap = new WeakMap();const obj = {};(function() {  const internalObj = {};  weakMap.set(internalObj, 'hidden');  obj.ref = internalObj;})();delete obj.ref;const result = weakMap.has(obj.ref);console.log(result);`,
    options: [
      "undefined",
      "true",
      "false",
      "Error"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1590).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1554",
    title: "What is the otuput?",
    difficulty: "medium",
    category: "basics",
    code: `function* evenNumbers() {  let num = 0;  while (true) {    yield num;    num += 2;  }}const gen = evenNumbers();const evens = Array.from({ length: 4 }, () => gen.next().value).map(n => n + 1);console.log(evens);`,
    options: [
      "[1, 3, 5, 7]",
      "[2, 4, 6, 8]",
      "[0, 2, 4, 6]",
      "[1, 2, 3, 4]"
],
    correctAnswer: "[1, 3, 5, 7]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1554).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,3,5,7]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1557",
    title: "JS Challenge #1557",
    difficulty: "medium",
    category: "basics",
    code: `function* numberDoubler(arr) {  for (const num of arr) {    yield num * 2;  }}const result = [...numberDoubler([1, 2, 3])].some(n => n % 4 === 0);console.log(result);`,
    options: [
      "undefined",
      "false",
      "Error",
      "true"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1557).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1560",
    title: "JS Challenge #1560",
    difficulty: "medium",
    category: "basics",
    code: `function* idGenerator() {  let id = 1;  while (true) {    yield id++;  }}const gen = idGenerator();const ids = Array.from({ length: 3 }, () => gen.next().value).map(id => \`ID\${id}\`);console.log(ids);`,
    options: [
      "[\"ID0\", \"ID1\", \"ID2\"]",
      "[\"1\", \"2\", \"3\"]",
      "[\"ID1\", \"ID2\", \"ID3\"]",
      "[\"ID1\", \"ID2\", \"ID2\"]"
],
    correctAnswer: "[\"ID1\", \"ID2\", \"ID3\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1560).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["ID1","ID2","ID3"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1563",
    title: "JS Challenge #1563",
    difficulty: "medium",
    category: "basics",
    code: `function* fibGenerator() {  let a = 0, b = 1;  while (true) {    let next = a + b;    a = b;    b = next;    yield next;  }}const gen = fibGenerator();const fibArray = Array.from({ length: 5 }, () => gen.next().value);console.log(fibArray);`,
    options: [
      "Error",
      "[0, 1, 1, 2, 3]",
      "[1, 1, 2, 3, 5]",
      "[1, 2, 3, 5, 8]"
],
    correctAnswer: "[1, 2, 3, 5, 8]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1563).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,5,8]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1566",
    title: "JS Challenge #1566",
    difficulty: "medium",
    category: "basics",
    code: `function* alternatingGenerator() {  yield 1;  yield 2;  yield 3;}const gen = alternatingGenerator();const result = [gen.next().value, gen.next().value, gen.next().value].reduce((acc, curr) => acc + curr, 0);console.log(result);`,
    options: [
      "0",
      "Error",
      "123",
      "6"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1566).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1569",
    title: "JS Challenge #1569",
    difficulty: "medium",
    category: "basics",
    code: `function* reverseGenerator(arr) {  for (let i = arr.length - 1; i >= 0; i--) {    yield arr[i];  }}const result = [...reverseGenerator([1, 2, 3, 4, 5])].join('');console.log(result);`,
    options: [
      "\"1,2,3,4,5\"",
      "[5, 4, 3, 2, 1]",
      "\"12345\"",
      "\"54321\""
],
    correctAnswer: "\"54321\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1569).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`54321\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1533",
    title: "JS Challenge #1533",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b() {    return this.a + 1;  }};const { b } = obj;console.log(b());`,
    options: [
      "2",
      "1",
      "undefined",
      "NaN"
],
    correctAnswer: "NaN",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1533).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`NaN\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1536",
    title: "JS Challenge #1536",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2 };Object.defineProperty(obj, 'b', { value: 3, writable: false });obj.b = 4;console.log(obj.b);`,
    options: [
      "3",
      "4",
      "2",
      "undefined"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1536).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1539",
    title: "JS Challenge #1539",
    difficulty: "medium",
    category: "basics",
    code: `const a = { value: 1 };const b = Object.create(a);b.value = 2;console.log(b.value);console.log(a.value);`,
    options: [
      "2, 1",
      "2, 2",
      "1, 2",
      "1, 1"
],
    correctAnswer: "2, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1539).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1542",
    title: "JS Challenge #1542",
    difficulty: "medium",
    category: "basics",
    code: `let count = 0;const counter = (function() {  count = 0;  return function() {    count += 1;    return count;  };})();count = 10;counter();console.log(count);`,
    options: [
      "0",
      "11",
      "1",
      "NaN"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1542).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1545",
    title: "JS Challenge #1545",
    difficulty: "medium",
    category: "basics",
    code: `const target = {  age: 30};const handler = {  get: function(obj, prop) {    return obj[prop]++;    }};const proxy = new Proxy(target, handler);console.log(proxy.age);console.log(target.age);console.log(proxy.age);`,
    options: [
      "30 31 31",
      "30 31 32",
      "31 31 32",
      "NaN 30 NaN"
],
    correctAnswer: "30 31 31",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1545).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`30
31
31\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1548",
    title: "JS Challenge #1548",
    difficulty: "medium",
    category: "basics",
    code: `let obj1 = { key: 'value1' };let obj2 = { key: 'value2' };const weakMap = new WeakMap();weakMap.set(obj1, 'data1');weakMap.set(obj2, 'data2');obj1 = null;setTimeout(() => {  console.log(weakMap.has(obj1));  console.log(weakMap.has(obj2));}, 100);`,
    options: [
      "true true",
      "false true",
      "true false",
      "false false"
],
    correctAnswer: "false true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1548).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1515",
    title: "JS Challenge #1515",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b() {    return new Promise(resolve => {      setTimeout(() => {        resolve(this.a);      }, 100);    });  }};obj.b().then(console.log);obj.a = 2;`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1515).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1518",
    title: "JS Challenge #1518",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4];const result = array.reduceRight((acc, val) => acc - val);console.log(result);`,
    options: [
      "2",
      "-8",
      "-2",
      "Error"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1518).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1521",
    title: "JS Challenge #1521",
    difficulty: "medium",
    category: "basics",
    code: `function test() {  console.log(arguments.length);}test(1, 2, 3);test.call(null, 1, 2, 3);`,
    options: [
      "3, 3",
      "3, 0",
      "0, 3",
      "0, 0"
],
    correctAnswer: "3, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1521).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1524",
    title: "JS Challenge #1524",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2 };const descriptor = Object.getOwnPropertyDescriptor(obj, 'a');descriptor.value = 3;Object.defineProperty(obj, 'a', descriptor);console.log(obj.a);`,
    options: [
      "1",
      "2",
      "3",
      "Error"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1524).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1527",
    title: "JS Challenge #1527",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3];const result = array.map(function(n) {  return this ? n : 0;}, false);console.log(result);`,
    options: [
      "[1, 2, 3]",
      "[0, 0, 0]",
      "[1, 2, 3, 0]",
      "Error"
],
    correctAnswer: "[1, 2, 3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1527).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1530",
    title: "JS Challenge #1530",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield* [1, 2];  yield* (function* () { yield 3; yield 4; })();}const gen = generator();console.log([...gen]);`,
    options: [
      "[1, 2, 3, 4]",
      "[1, 2, 4]",
      "[1, 2, 3]",
      "[1, 2, 3, 4, 5]"
],
    correctAnswer: "[1, 2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1530).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1495",
    title: "JS Challenge #1495",
    difficulty: "medium",
    category: "basics",
    code: `const func = () => arguments.length;console.log(func(1, 2, 3));`,
    options: [
      "undefined",
      "TypeError",
      "0",
      "3"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1495).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: arguments is not defined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1499",
    title: "JS Challenge #1499",
    difficulty: "medium",
    category: "basics",
    code: `const array = Array.from({ length: 5 }, () => Math.random() > 0.5);console.log(array);`,
    options: [
      "An array of 5 random true/false values",
      "An array of 5 random numbers between 0 and 1",
      "An empty array",
      "Error"
],
    correctAnswer: "An array of 5 random true/false values",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1499).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[false,false,false,true,false]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1502",
    title: "JS Challenge #1502",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1 };const obj2 = Object.create(obj1);obj2.b = 2;const result = 'a' in obj2;console.log(result);`,
    options: [
      "false",
      "true",
      "undefined",
      "Error"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1502).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1505",
    title: "JS Challenge #1505",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3];array[-1] = 0;console.log(array.length);`,
    options: [
      "3",
      "4",
      "2",
      "1"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1505).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1508",
    title: "JS Challenge #1508",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  then(resolve) {    resolve(this.a);  }};obj.then(console.log);`,
    options: [
      "1",
      "undefined",
      "Promise object",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1508).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1472",
    title: "JS Challenge #1472",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3];array[10] = 4;console.log(array.length);console.log(array.includes(undefined));`,
    options: [
      "11, true",
      "11, false",
      "4, true",
      "4, false"
],
    correctAnswer: "11, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1472).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1475",
    title: "JS Challenge #1475",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b() {    return this.a;  }};const b = obj.b;console.log(b.call({ a: 2 }));`,
    options: [
      "2",
      "1",
      "undefined",
      "Error"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1475).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1478",
    title: "JS Challenge #1478",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4, 5];const result = array.some(n => n % 2 === 0) && array.every(n => n < 10);console.log(result);`,
    options: [
      "true",
      "false",
      "[1, 2, 3, 4, 5]",
      "Error"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1478).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1481",
    title: "JS Challenge #1481",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1, b: { c: 2 } };const obj2 = { ...obj1 };obj1.b.c = 3;console.log(obj2.b.c);`,
    options: [
      "Error",
      "undefined",
      "3",
      "2"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1481).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1484",
    title: "JS Challenge #1484",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3, 4, 5];const sliced = arr.slice(1, 3);const spliced = arr.splice(1, 3);console.log(sliced, spliced, arr);`,
    options: [
      "[2, 3], [2, 3], [1, 5]",
      "[2, 3, 4], [2, 3, 4], [1, 5]",
      "[2, 3, 4], [2, 3], [1, 5]",
      "[2, 3], [2, 3, 4], [1, 5]"
],
    correctAnswer: "[2, 3], [2, 3], [1, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1484).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,3] [2,3,4] [1,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1487",
    title: "JS Challenge #1487",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2 };const obj2 = { ...obj, b: 3 };const samePrototype = Object.getPrototypeOf(obj) === Object.getPrototypeOf(obj2);console.log(samePrototype);`,
    options: [
      "undefined",
      "Error",
      "false",
      "true"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1487).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1452",
    title: "JS Challenge #1452",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4, 5];const result = array.find(n => n > 3) ? array.every(n => n < 6) : array.some(n => n > 4);console.log(result);`,
    options: [
      "false",
      "true",
      "4",
      "5"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1452).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1455",
    title: "JS Challenge #1455",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 'a';  yield* 'bcd';  yield 'e';}const gen = generator();console.log([...gen]);`,
    options: [
      "['a', 'b', 'c', 'e']",
      "['a', 'bcd', 'e']",
      "['a', 'b', 'c', 'd']",
      "[\"a\", \"b\", \"c\", \"d\", \"e\"]"
],
    correctAnswer: "[\"a\", \"b\", \"c\", \"d\", \"e\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1455).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["a","b","c","d","e"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1458",
    title: "JS Challenge #1458",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, [3, 4, [5, 6]]];const result = array.flat(2).map(n => n * 2);console.log(result);`,
    options: [
      "[2, 4, 3, 4, 5, 6]",
      "[1, 2, 6, 8, 10, 12]",
      "[2, 4, 6, 8, 10, 12]",
      "[2, 4, [6, 8, [10, 12]]]"
],
    correctAnswer: "[2, 4, 6, 8, 10, 12]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1458).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,4,6,8,10,12]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1466",
    title: "JS Challenge #1466",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4, 5];const [first, ...rest] = array;const modified = rest.map((n, i) => i % 2 === 0 ? n * 2 : n);console.log(first, modified);`,
    options: [
      "1, [2, 3, 8, 5]",
      "1, [4, 6, 8]",
      "1, [4, 8]",
      "1, [4, 3, 8, 5]"
],
    correctAnswer: "1, [2, 3, 8, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1466).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 [4,3,8,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1469",
    title: "JS Challenge #1469",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2 };const proxy = new Proxy(obj, {  get(target, prop) {    return prop in target ? target[prop] : 0;  }});console.log(proxy.a, proxy.b, proxy.c);`,
    options: [
      "undefined, 2, 0",
      "1, undefined, 0",
      "1, 2, 0",
      "1, 2, undefined"
],
    correctAnswer: "undefined, 2, 0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1469).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 2 0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1431",
    title: "JS Challenge #1431",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1 };const obj2 = Object.create(obj1);obj2.b = 2;console.log(obj2.a, obj2.b);console.log(obj2.hasOwnProperty('a'));console.log(Object.getPrototypeOf(obj2) === obj1);`,
    options: [
      "undefined, 2, true, false",
      "1, 2, true, false",
      "1, 2, false, true",
      "undefined, 2, false, true"
],
    correctAnswer: "undefined, 2, true, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1431).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 2
false
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1434",
    title: "JS Challenge #1434",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4, 5];const result = array.filter(n => n % 2).map(n => n * 2);console.log(result);`,
    options: [
      "[2, 6, 10]",
      "[1, 3, 5]",
      "[4, 8, 12]",
      "[2, 6, 8]"
],
    correctAnswer: "[2, 6, 10]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1434).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,6,10]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1437",
    title: "JS Challenge #1437",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [1, 2, 3, 4, 5];const [first, , third, ...rest] = arr;console.log(first, third, rest);`,
    options: [
      "1, 3, [4, 5]",
      "1, 3, [2, 4, 5]",
      "1, 3, 4",
      "1, 4, [5]"
],
    correctAnswer: "1, 3, [4, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1437).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 3 [4,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1440",
    title: "JS Challenge #1440",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};let value = 0;Object.defineProperty(obj, 'prop', {  get() {    return value;  },  set(newValue) {    value = newValue + 1;  },  configurable: true,  enumerable: true});obj.prop = 10;console.log(obj.prop);`,
    options: [
      "10",
      "11",
      "1",
      "undefined"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1440).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1443",
    title: "JS Challenge #1443",
    difficulty: "medium",
    category: "basics",
    code: `class Parent {  static greet() {    return 'Hello from Parent';  }}class Child extends Parent {  static greet() {    return super.greet() + ' and Child';  }}const childInstance = new Child();console.log(childInstance.greet);`,
    options: [
      "Hello from Parent",
      "Hello from Parent and Child",
      "undefined",
      "TypeError"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1443).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1446",
    title: "JS Challenge #1446",
    difficulty: "medium",
    category: "basics",
    code: `const array = [1, 2, 3, 4, 5];const result = array.splice(2, 2, 6, 7);console.log(array, result);`,
    options: [
      "[1, 2, 3, 6, 7], [3, 4]",
      "[1, 2, 6, 7, 5], [3, 4]",
      "[1, 2, 6, 7, 3, 4, 5], [3, 4]",
      "[1, 2, 6, 7], [3, 4, 5]"
],
    correctAnswer: "[1, 2, 3, 6, 7], [3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1446).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,6,7,5] [3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1410",
    title: "JS Challenge #1410",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield 2;  yield 3;}const gen = generator();const { value, done } = gen.return('early');console.log(value, done);`,
    options: [
      "undefined, true",
      "2, false",
      "1, false",
      "'early', true"
],
    correctAnswer: "undefined, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1410).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`early true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1413",
    title: "JS Challenge #1413",
    difficulty: "medium",
    category: "basics",
    code: `const sym = Symbol('unique');const obj = {  [sym]: 'symbol value',  a: 1,  b: 2};const keys = Object.keys(obj);const symbols = Object.getOwnPropertySymbols(obj);console.log(keys.length, symbols.length);`,
    options: [
      "2, 1",
      "3, 1",
      "2, 0",
      "3, 0"
],
    correctAnswer: "2, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1413).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2 1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1416",
    title: "JS Challenge #1416",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 1,  method() {    return this.value;  }};const boundMethod = obj.method.bind({ value: 2 });console.log(boundMethod());`,
    options: [
      "undefined",
      "Error",
      "2",
      "1"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1416).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1419",
    title: "JS Challenge #1419",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = { a: 1 };const obj2 = { b: 2 };Object.setPrototypeOf(obj2, obj1);console.log('a' in obj2);console.log(obj2.hasOwnProperty('a'));console.log(obj2.__proto__.a);`,
    options: [
      "false, true, 1",
      "false, false, 1",
      "true, false, 1",
      "true, true, 1"
],
    correctAnswer: "false, true, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1419).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
false
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1422",
    title: "JS Challenge #1422",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncFunc() {  return 'async';}function promiseFunc() {  return new Promise(resolve => resolve('promise'));}(async function() {  const result = await (true ? asyncFunc() : promiseFunc());  console.log(result);})();`,
    options: [
      "Error",
      "undefined",
      "promise",
      "async"
],
    correctAnswer: "async",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1422).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`async\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1425",
    title: "JS Challenge #1425",
    difficulty: "medium",
    category: "basics",
    code: `const obj1 = {  a: 1,  method() {    return this.a;  }};const obj2 = Object.create(obj1);obj2.a = 2;console.log(obj2.method());`,
    options: [
      "Error",
      "undefined",
      "2",
      "1"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1425).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1428",
    title: "JS Challenge #1428",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncFunc() {  return 'async function';}function* generator() {  yield 'generator';  yield asyncFunc();  yield 'done';}const gen = generator();(async function() {  console.log(gen.next().value);  console.log(await gen.next().value);  console.log(gen.next().value);})();`,
    options: [
      "generator, async function, done",
      "generator, Promise, done",
      "generator, undefined, done",
      "generator, async function, undefined"
],
    correctAnswer: "generator, async function, done",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1428).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`generator
async function
done\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1391",
    title: "JS Challenge #1391",
    difficulty: "medium",
    category: "basics",
    code: `function* gen() {  yield 1;  yield 2;  yield 3;}async function asyncFunc() {  for (let value of gen()) {    await new Promise(res => setTimeout(res, 100));    console.log(value);  }  return 'done';}const result = asyncFunc();console.log(result instanceof Promise);`,
    options: [
      "1 2 3 done true",
      "1 2 3 done false",
      "true 1 2 3",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1391).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1394",
    title: "JS Challenge #1394",
    difficulty: "medium",
    category: "basics",
    code: `const handler = {  get(target, prop, receiver) {    if (prop === 'secret') {      return Reflect.get(...arguments) + ' exposed';    }    return Reflect.get(...arguments);  }};const secretObj = { secret: 'hidden', reveal: 'nothing' };const proxy = new Proxy(secretObj, handler);console.log(proxy.secret);`,
    options: [
      "hidden",
      "hidden exposed",
      "nothing",
      "undefined"
],
    correctAnswer: "hidden",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1394).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`hidden exposed\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1397",
    title: "JS Challenge #1397",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield 2;}const gen = generator();const sym = Symbol('unique');gen[sym] = function() {  return this.next().value;};console.log(gen[sym](), gen[sym](), gen[sym]());`,
    options: [
      "undefined, undefined, undefined",
      "1, 2, 3",
      "1, 1, 1",
      "1, 2, undefined"
],
    correctAnswer: "undefined, undefined, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1397).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 2 undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1400",
    title: "JS Challenge #1400",
    difficulty: "medium",
    category: "basics",
    code: `const func = new Function('a', 'b', 'return a + b');console.log(func(1, 2));`,
    options: [
      "3",
      "undefined",
      "'a+b'",
      "Error"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1400).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1403",
    title: "JS Challenge #1403",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield* [2, 3];  yield 4;}const gen = generator();const arr = Array.from(gen);console.log(arr);`,
    options: [
      "[1, 4]",
      "[2, 3, 4]",
      "[1, 2, 3, 4]",
      "[1, 2, 3]"
],
    correctAnswer: "[1, 2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1403).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1407",
    title: "JS Challenge #1407",
    difficulty: "medium",
    category: "basics",
    code: `const sym1 = Symbol('sym');const sym2 = Symbol('sym');const obj = {  [sym1]: 'value1',  [sym2]: 'value2'};console.log(obj[sym1], obj[sym2], sym1 === sym2);`,
    options: [
      "value1, value1, true",
      "value1, value1, false",
      "value1, value2, false",
      "undefined, undefined, false"
],
    correctAnswer: "value1, value1, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1407).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`value1 value2 false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1370",
    title: "JS Challenge #1370",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  const value = yield 1;  yield value;}const gen = generator();console.log(gen.next().value);console.log(gen.next(2).value);`,
    options: [
      "undefined, 2",
      "1, undefined",
      "1, 2",
      "1, 1"
],
    correctAnswer: "undefined, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1370).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1373",
    title: "JS Challenge #1373",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield 2;  return 3;}const gen = generator();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, 2",
      "1, 2, 2",
      "1, 2, undefined",
      "1, 2, 3"
],
    correctAnswer: "1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1373).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1376",
    title: "JS Challenge #1376",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield new Promise(resolve => resolve(2));  yield 3;}const gen = generator();console.log(gen.next().value);gen.next().value.then(console.log);console.log(gen.next().value);`,
    options: [
      "1, 3, 2",
      "1, 2, 3",
      "1, Promise, 3",
      "Promise, 2, 3"
],
    correctAnswer: "1, 3, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1376).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
3
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1380",
    title: "JS Challenge #1380",
    difficulty: "medium",
    category: "basics",
    code: `let obj1 = { key: 'value1' };let obj2 = { key: 'value2' };const map = new Map();const weakMap = new WeakMap();map.set(obj1, 'mapValue');weakMap.set(obj2, 'weakMapValue');obj1 = null;  // Changing referenceobj2 = null;  // Changing referenceconsole.log(map.has(obj1));console.log(weakMap.has(obj2));`,
    options: [
      "false true",
      "true false",
      "false false",
      "true true"
],
    correctAnswer: "false true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1380).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1382",
    title: "JS Challenge #1382",
    difficulty: "medium",
    category: "basics",
    code: `function* genFunc() {  yield Symbol('A');  yield new Function('return this')();}const obj = { key: genFunc().next().value };obj.key = genFunc().next().value;console.log(obj.key === globalThis);`,
    options: [
      "false",
      "true",
      "Error",
      "undefined"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1382).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1385",
    title: "JS Challenge #1385",
    difficulty: "medium",
    category: "basics",
    code: `const secret = 'hidden';function revealSecret() {  const secret = 'revealed';  const obj = { secret: 'object secret' };  with (obj) {    return () => secret;  }}const mySecret = revealSecret()();console.log(mySecret);`,
    options: [
      "hidden",
      "revealed",
      "object secret",
      "undefined"
],
    correctAnswer: "object secret",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1385).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`object secret\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1388",
    title: "JS Challenge #1388",
    difficulty: "medium",
    category: "basics",
    code: `const secretKey = Symbol('key');const secretValue = 'secret';function Store() {  this[secretKey] = secretValue;}Store.prototype.get = function(key) {  return this[key];};const store = new Store();const revealed = store.get(secretKey);console.log(revealed);`,
    options: [
      "secret",
      "undefined",
      "Symbol('key')",
      "Error"
],
    correctAnswer: "secret",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1388).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`secret\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1350",
    title: "JS Challenge #1350",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b: function() {    return () => {      return this.a;    };  },  c: function() {    return function() {      return this.a;    };  }};const arrowFunc = obj.b();const regularFunc = obj.c();console.log(arrowFunc());console.log(regularFunc());`,
    options: [
      "undefined, 1",
      "undefined, undefined",
      "1, 1",
      "1, undefined"
],
    correctAnswer: "undefined, 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1350).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1353",
    title: "JS Challenge #1353",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield* [1, 2, 3];  yield 4;}const gen = generator();console.log([...gen]);`,
    options: [
      "[4]",
      "[1, 4]",
      "[1, 2, 3]",
      "[1, 2, 3, 4]"
],
    correctAnswer: "[1, 2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1353).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1356",
    title: "JS Challenge #1356",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield 2;  yield 3;}const gen1 = generator();const gen2 = generator();console.log(gen1.next().value);console.log(gen2.next().value);console.log(gen1.next().value);console.log(gen2.next().value);`,
    options: [
      "1,1,2,2",
      "1,2,3,1",
      "1,1,1,2",
      "2,1,2,1"
],
    correctAnswer: "1,1,2,2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1356).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
1
2
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1359",
    title: "JS Challenge #1359",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield* (function*() { yield 2; yield 3; })();  yield 4;}const gen = generator();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1,2,3,4",
      "1,2,4, undefined",
      "1, undefined, 3, 4",
      "undefined, 1, 3, 4"
],
    correctAnswer: "1,2,3,4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1359).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1361",
    title: "JS Challenge #1361",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  return 2;}const gen = generator();console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, undefined",
      "1, 2",
      "undefined, 1",
      "undefined, undefined"
],
    correctAnswer: "1, undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1361).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1364",
    title: "JS Challenge #1364",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield* [2, 3];  yield 4;}const gen = generator();for (const value of gen) {  console.log(value);}`,
    options: [
      "1, 4",
      "1, 2, 3",
      "1, 2, 3, 4",
      "2, 3, 4"
],
    correctAnswer: "1, 4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1364).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1367",
    title: "JS Challenge #1367",
    difficulty: "medium",
    category: "basics",
    code: `function* generator1() {  yield 1;  yield 2;}function* generator2() {  yield* generator1();  yield 3;}const gen = generator2();console.log(gen.next().value);console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, 2, 3",
      "1, 2, undefined",
      "1, undefined, 3",
      "undefined, 2, 3"
],
    correctAnswer: "1, 2, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1367).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1332",
    title: "JS Challenge #1332",
    difficulty: "medium",
    category: "basics",
    code: `function A() {}A.prototype.value = 1;function B() {}B.prototype = new A();B.prototype.value = 2;var b = new B();console.log(b.value);`,
    options: [
      "1",
      "2",
      "Error",
      "undefined"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1332).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1335",
    title: "JS Challenge #1335",
    difficulty: "medium",
    category: "basics",
    code: `let obj = { a: 1 };let proto = { b: 2 };Object.setPrototypeOf(obj, proto);for (let key in obj) {  console.log(key);}`,
    options: [
      "none",
      "a, b",
      "b",
      "a"
],
    correctAnswer: "b",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1335).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`a
b\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1338",
    title: "JS Challenge #1338",
    difficulty: "medium",
    category: "basics",
    code: `let obj = { a: 1 };Object.freeze(obj);console.log(Object.isFrozen(obj));console.log(obj.a = 2);console.log(obj.a);`,
    options: [
      "false, 2, 2",
      "true, 2, 2",
      "true, 2, 1",
      "true, 1, 1"
],
    correctAnswer: "false, 2, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1338).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
2
1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1341",
    title: "JS Challenge #1341",
    difficulty: "medium",
    category: "basics",
    code: `let obj = {};Object.defineProperty(obj, 'a', {  value: 1,  enumerable: true});let clone = Object.create(  Object.getPrototypeOf(obj),  Object.getOwnPropertyDescriptors(obj));console.log(clone.a);console.log(clone.hasOwnProperty('a'));`,
    options: [
      "undefined, false",
      "1, true",
      "1, false",
      "undefined, true"
],
    correctAnswer: "undefined, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1341).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1344",
    title: "JS Challenge #1344",
    difficulty: "medium",
    category: "basics",
    code: `let proto = { a: 1 };let obj = Object.create(proto);Object.defineProperty(obj, 'a', {  value: 2,  writable: false,  enumerable: true,  configurable: false});console.log(obj.a);proto.a = 3;console.log(obj.a);`,
    options: [
      "1, 2",
      "2, 3",
      "3, 3",
      "2, 2"
],
    correctAnswer: "1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1344).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1347",
    title: "JS Challenge #1347",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1);setTimeout(() => {  console.log(2);}, 100);setTimeout(() => {  console.log(3);}, 0);Promise.resolve().then(() => {  console.log(4);}).then(() => {  console.log(5);});console.log(6);`,
    options: [
      "1, 6, 4, 3, 5, 2",
      "1, 6, 3, 4, 5, 2",
      "1, 6, 4, 5, 2, 3",
      "1, 6, 4, 5, 3, 2"
],
    correctAnswer: "1, 6, 4, 3, 5, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1347).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
6
4
5
3
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1312",
    title: "JS Challenge #1312",
    difficulty: "medium",
    category: "basics",
    code: `function Animal() {}function Dog() {}Dog.prototype = Object.create(Animal.prototype);const rover = new Dog();console.log(rover.hasOwnProperty('constructor'));`,
    options: [
      "ReferenceError",
      "undefined",
      "true",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1312).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1315",
    title: "JS Challenge #1315",
    difficulty: "medium",
    category: "basics",
    code: `function Shape() {}function Circle(radius) {}Circle.prototype = Object.create(Shape.prototype);const shape = new Shape();console.log(shape instanceof Circle);`,
    options: [
      "false",
      "true",
      "undefined",
      "ReferenceError"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1315).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1319",
    title: "JS Challenge #1319",
    difficulty: "medium",
    category: "basics",
    code: `function Animal() {}const dog = new Animal();console.log(dog.constructor === Animal);`,
    options: [
      "ReferenceError",
      "undefinied",
      "false",
      "true"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1319).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1322",
    title: "JS Challenge #1322",
    difficulty: "medium",
    category: "basics",
    code: `var foo = {};var bar = Object.create(foo);foo.a = 1;console.log(bar.a);`,
    options: [
      "1",
      "null",
      "undefined",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1322).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1325",
    title: "JS Challenge #1325",
    difficulty: "medium",
    category: "basics",
    code: `function Person() {}var person = new Person();console.log(person instanceof Person);console.log(person instanceof Object);`,
    options: [
      "true, true",
      "false, true",
      "false, false",
      "true, false"
],
    correctAnswer: "true, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1325).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1290",
    title: "JS Challenge #1290",
    difficulty: "medium",
    category: "basics",
    code: `function Shape() {}function Circle(radius) {}Circle.prototype = Object.create(Shape.prototype);const shape = new Shape();console.log(shape instanceof Circle);`,
    options: [
      "ReferenceError",
      "undefined",
      "true",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1290).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1293",
    title: "JS Challenge #1293",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve, reject) => {  setTimeout(() => reject(new Error('Error')), 1000);});promise  .then(result => console.log(result))  .then(result => console.log(result))  .catch(error => console.error(error.message))  .finally(() => console.log('Finally'));`,
    options: [
      "Error: Error, Finally",
      "Error: Error",
      "Error: Error, undefined, Finally",
      "Finally"
],
    correctAnswer: "Finally",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1293).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error
Finally\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1296",
    title: "JS Challenge #1296",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve, reject) => {  setTimeout(() => resolve(3), 1000);});promise  .then(result => {    console.log(result);    return result * 2;  })  .then(result => {    console.log(result);    return new Promise(resolve => setTimeout(() => resolve(result * 3), 1000));  })  .then(result => {    console.log(result);  });`,
    options: [
      "3,6",
      "3,6,9",
      "3,6,18",
      "18"
],
    correctAnswer: "3,6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1296).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3
6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1299",
    title: "JS Challenge #1299",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve, reject) => {  setTimeout(() => reject(new Error('Rejected')), 1000);});promise  .then(result => console.log(result))  .catch(error => console.error(error.message))  .then(() => console.log('After catch'))  .then(() => console.log('After then'))  .catch(error => console.error(error.message));`,
    options: [
      "Rejected, After catch",
      "Rejected, After catch, After then",
      "Error: Rejected, After catch, After then",
      "Error: Rejected"
],
    correctAnswer: "Rejected, After catch",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1299).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Rejected
After catch
After then\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1303",
    title: "JS Challenge #1303",
    difficulty: "medium",
    category: "basics",
    code: `function Product(name, price) {  this.name = name;  this.price = price;}Product.prototype.discount = function(discount) {  this.price -= discount;};const product = new Product('Phone', 500);product.discount(50);console.log(product.price);`,
    options: [
      "500",
      "450",
      "550",
      "NaN"
],
    correctAnswer: "450",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1303).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`450\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1306",
    title: "JS Challenge #1306",
    difficulty: "medium",
    category: "basics",
    code: `function Animal() {}function Dog() {}Dog.prototype = Object.create(Animal.prototype);const rover = new Dog();console.log(rover.constructor === Animal);console.log(rover.constructor === Dog);console.log(Dog.prototype.isPrototypeOf(rover));console.log(Animal.prototype.isPrototypeOf(rover));`,
    options: [
      "true, false, true, true",
      "false, false, true, true",
      "false, true, false, true",
      "true, true, true, false"
],
    correctAnswer: "true, false, true, true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1306).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
false
true
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1272",
    title: "JS Challenge #1272",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');Promise.resolve().then(() => console.log('Promise'));const foo = n => {  console.log('Function call');  n > 0 && foo(n - 1);};setTimeout(() => foo(2), 0);`,
    options: [
      "Start, Function call (2 times), Promise",
      "Start, Promise, Function call, Function call, Promise",
      "Start, Promise, Function call (3 times)",
      "Start, Promise, Function call (2 times)"
],
    correctAnswer: "Start, Function call (2 times), Promise",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1272).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Promise
Function call
Function call
Function call\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1278",
    title: "JS Challenge #1278",
    difficulty: "medium",
    category: "basics",
    code: `function Car(make) {  this.make = make;}function Truck(make) {  this.make = make;}const car = new Car('Toyota');const truck = new Truck('Toyota');console.log(car.__proto__ === truck.__proto__);console.log(car.constructor === truck.constructor);console.log(car instanceof Truck);console.log(car instanceof Car);console.log(Truck.prototype.isPrototypeOf(car));console.log(Car.prototype.isPrototypeOf(truck));`,
    options: [
      "true, false, false, true, false, false",
      "false, false, false, false, false, false",
      "false, false, false, true, true, false",
      "false, false, false, true, false, false"
],
    correctAnswer: "true, false, false, true, false, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1278).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false
false
false
true
false
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1281",
    title: "JS Challenge #1281",
    difficulty: "medium",
    category: "basics",
    code: `function Animal() {  this.type = 'animal';}function Dog() {  this.name = 'dog';}Dog.prototype = new Animal();const rover = new Dog();const spot = new Dog();console.log(rover instanceof Dog);console.log(rover instanceof Animal);console.log(rover instanceof Object);console.log(rover === spot);console.log(rover.constructor === Dog);console.log(rover.constructor === Animal);`,
    options: [
      "true, true, true, false, true, false",
      "true, true, true, false, false, false",
      "true, true, true, true, true, false",
      "true, true, true, false, false, true"
],
    correctAnswer: "true, true, true, false, true, false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1281).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
true
false
false
false
true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1284",
    title: "JS Challenge #1284",
    difficulty: "medium",
    category: "basics",
    code: `function Animal() {}function Dog() {}Dog.prototype = Object.create(Animal.prototype);const rover = new Dog();console.log(rover.constructor === Animal);`,
    options: [
      "ReferenceError",
      "undefined",
      "true",
      "false"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1284).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1287",
    title: "JS Challenge #1287",
    difficulty: "medium",
    category: "basics",
    code: `function Person(name) {  this.name = name;}Person.prototype.sayName = function() {  console.log('My name is ' + this.name);};const john = new Person('John');console.log(john.sayName === Person.prototype.sayName);`,
    options: [
      "true",
      "false",
      "undefined",
      "ReferenceError"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1287).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1251",
    title: "JS Challenge #1251",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1 };const { b } = obj;console.log(b);`,
    options: [
      "1",
      "TypeError",
      "ReferenceError",
      "undefined"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1251).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1254",
    title: "JS Challenge #1254",
    difficulty: "medium",
    category: "basics",
    code: `const promise1 = new Promise((resolve, reject) => {  setTimeout(() => resolve(10), 500);});const promise2 = new Promise((resolve, reject) => {  setTimeout(() => reject('Error'), 1000);});Promise.allSettled([promise1, promise2])  .then(results => console.log(results))  .catch(error => console.error(error));`,
    options: [
      "Error: 'Error'",
      "[{ status: 'rejected', reason: 'Error' }]",
      "[{ status: 'fulfilled', value: 10 }]",
      "[{ status: 'fulfilled', value: 10 }, { status: 'rejected', reason: 'Error' }]"
],
    correctAnswer: "[{ status: 'fulfilled', value: 10 }, { status: 'rejected', reason: 'Error' }]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1254).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[{"status":"fulfilled","value":10},{"status":"rejected","reason":"Error"}]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1258",
    title: "JS Challenge #1258",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');setTimeout(() => console.log('Timeout 1'), 0);setTimeout(() => console.log('Timeout 2'), 0);console.log('End');`,
    options: [
      "Start, End, Timeout 2, Timeout 1",
      "Start, Timeout 1, Timeout 2, End",
      "Start, Timeout 2, Timeout 1, End",
      "Start, End, Timeout 1, Timeout 2"
],
    correctAnswer: "Start, End, Timeout 2, Timeout 1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1258).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
End
Timeout 1
Timeout 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1262",
    title: "JS Challenge #1262",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');setTimeout(() => {  console.log('Timeout 1');  Promise.resolve().then(() => console.log('Promise 1'));}, 0);Promise.resolve().then(() => {  console.log('Promise 2');  setTimeout(() => console.log('Timeout 2'), 0);});console.log('End');`,
    options: [
      "\"Start\"  \"Promise 1\" \"Timeout 1\" \"Promise 2\" \"Timeout 2\" \"End\"",
      "\"Start\" \"Promise 2\" \"Promise 1\" \"Timeout 1\" \"Timeout 2\" \"End\"",
      "\"Start\" \"Promise 2\" \"Timeout 1\" \"Promise 1\" \"Timeout 2\" \"End\"",
      "\"Start\" \"End\" \"Promise 2\" \"Timeout 1\" \"Promise 1\" \"Timeout 2\""
],
    correctAnswer: "\"Start\" \"End\" \"Promise 2\" \"Timeout 1\" \"Promise 1\" \"Timeout 2\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1262).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
End
Promise 2
Timeout 1
Promise 1
Timeout 2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1265",
    title: "JS Challenge #1265",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');setTimeout(() => console.log('Timeout'), 0);Promise.resolve().then(() => console.log('Promise'));function foo() {  console.log('Function call');}foo();console.log('End');`,
    options: [
      "\"Start\" \"Promise\"  \"Function call\" \"Timeout\"    \"End\"",
      "\"Start\" \"Function call\" \"Timeout\"  \"Promise\"  \"End\"",
      "\"Start\" \"Function call\" \"Timeout\" \"End\" \"Promise\"",
      "\"Start\" \"Function call\" \"End\" \"Promise\" \"Timeout\""
],
    correctAnswer: "\"Start\" \"Function call\" \"End\" \"Promise\" \"Timeout\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1265).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Function call
End
Promise
Timeout\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1268",
    title: "JS Challenge #1268",
    difficulty: "medium",
    category: "basics",
    code: `console.log('Start');Promise.resolve().then(() => console.log('Promise'));function foo(n) {  if (n === 0) {    console.log('End');    return;  }  console.log('Function call');  foo(n - 1);}setTimeout(() => foo(3), 0);`,
    options: [
      "Start, Promise, End, Function call (3 times)",
      "Start, Function call (3 times), Promise, End",
      "Start, Promise, Function call (3 times), End",
      "Start, End, Function call (3 times), Promise"
],
    correctAnswer: "Start, Promise, End, Function call (3 times)",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1268).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Promise
Function call
Function call
Function call
End\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1231",
    title: "JS Challenge #1231",
    difficulty: "medium",
    category: "basics",
    code: `const clothes = ['shirt', 'socks', 'jacket', 'pants', 'hat']clothes.length = 0 console.log(clothes[3])`,
    options: [
      "shirt",
      "pants",
      "jacket",
      "undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1231).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected identifier 'clothes'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1234",
    title: "JS Challenge #1234",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};obj.length = 5;console.log(obj.length);`,
    options: [
      "1",
      "0",
      "5",
      "undefined"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1234).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1237",
    title: "JS Challenge #1237",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};Object.defineProperty(obj, 'length', { get: () => Math.random() });console.log(obj.length);`,
    options: [
      "0",
      "1",
      "A random number",
      "undefined"
],
    correctAnswer: "0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1237).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0.10467990967097496\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1240",
    title: "JS Challenge #1240",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { length: 3 };console.log(Object.keys(obj).length);`,
    options: [
      "0",
      "3",
      "1",
      "undefined"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1240).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1243",
    title: "JS Challenge #1243",
    difficulty: "medium",
    category: "basics",
    code: `const arr = [];arr[100] = 'a';console.log(arr.length);`,
    options: [
      "0",
      "1",
      "100",
      "101"
],
    correctAnswer: "0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1243).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`101\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1211",
    title: "JS Challenge #1211",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof typeof undefined);`,
    options: [
      "\"undefined\"",
      "\"function\"",
      "\"object\"",
      "\"string\""
],
    correctAnswer: "\"string\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1211).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1214",
    title: "JS Challenge #1214",
    difficulty: "medium",
    category: "basics",
    code: `console.log([] == []);`,
    options: [
      "TypeError",
      "true",
      "false",
      "SyntaxError"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1214).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1217",
    title: "JS Challenge #1217",
    difficulty: "medium",
    category: "basics",
    code: `console.log('abc' instanceof String);`,
    options: [
      "SyntaxError",
      "TypeError",
      "true",
      "false"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1217).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1222",
    title: "JS Challenge #1222",
    difficulty: "medium",
    category: "basics",
    code: `var x = 1;console.log(x+++x);`,
    options: [
      "3",
      "2",
      "4",
      "SyntaxError"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1222).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1225",
    title: "JS Challenge #1225",
    difficulty: "medium",
    category: "basics",
    code: `var x = 1;console.log(x++ + ++x);`,
    options: [
      "NaN",
      "2",
      "3",
      "4"
],
    correctAnswer: "4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1225).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1191",
    title: "JS Challenge #1191",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof NaN === 'number');`,
    options: [
      "false",
      "true",
      "NaN",
      "Syntax Error"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1191).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1194",
    title: "JS Challenge #1194",
    difficulty: "medium",
    category: "basics",
    code: `console.log(3 === 3 === 3);`,
    options: [
      "true",
      "false",
      "NaN",
      "SnytaxError"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1194).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1197",
    title: "JS Challenge #1197",
    difficulty: "medium",
    category: "basics",
    code: `console.log({} + []);`,
    options: [
      "undefined",
      "[object Object]",
      "{}[]",
      "TypeError"
],
    correctAnswer: "[object Object]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1197).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[object Object]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1200",
    title: "JS Challenge #1200",
    difficulty: "medium",
    category: "basics",
    code: `console.log(NaN === NaN);`,
    options: [
      "true",
      "false",
      "TypeError",
      "NaN"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1200).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1203",
    title: "JS Challenge #1203",
    difficulty: "medium",
    category: "basics",
    code: `var x = 1;if (function f() {}) {  x += typeof f;}console.log(x);`,
    options: [
      "1",
      "2undefined",
      "1undefined",
      "TypeError"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1203).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1205",
    title: "JS Challenge #1205",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1 + 2 + '3' - 4 + 5);`,
    options: [
      "123",
      "10",
      "\"9\"",
      "34"
],
    correctAnswer: "34",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1205).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`34\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1170",
    title: "JS Challenge #1170",
    difficulty: "medium",
    category: "basics",
    code: `const a = [1, 2, 3];const b = a.flatMap(x => [x, x * 2]);console.log(b);`,
    options: [
      "[1, 2, 3, 2, 4, 6]",
      "[1, 2, 2, 4, 3, 6]",
      "[2, 4, 6]",
      "[1, 2, 3]"
],
    correctAnswer: "[1, 2, 2, 4, 3, 6]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1170).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,2,4,3,6]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1173",
    title: "JS Challenge #1173",
    difficulty: "medium",
    category: "basics",
    code: `const a = [1, 2, 3];const b = a.findIndex(x => x === 4);console.log(b);`,
    options: [
      "0",
      "1",
      "3",
      "-1"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1173).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1176",
    title: "JS Challenge #1176",
    difficulty: "medium",
    category: "basics",
    code: `const a = { a: 1 };const b = Object.seal(a);b.a = 2;console.log(a.a);`,
    options: [
      "1",
      "undefined",
      "TypeError: Cannot assign to read only property 'a' of object",
      "2"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1176).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1179",
    title: "JS Challenge #1179",
    difficulty: "medium",
    category: "basics",
    code: `let sum = 0;for (let i = 0; i < 3; i++, sum++) { sum *= i }console.log(sum);`,
    options: [
      "4",
      "5",
      "0",
      "Error"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1179).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1182",
    title: "JS Challenge #1182",
    difficulty: "medium",
    category: "basics",
    code: `let x = 5;let y = (x = 10) + 3;console.log(x, y);`,
    options: [
      "10 13",
      "10 5",
      "5 3",
      "Error"
],
    correctAnswer: "10 13",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1182).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`10 13\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1185",
    title: "JS Challenge #1185",
    difficulty: "medium",
    category: "basics",
    code: `console.log(3 > 2 > 1);`,
    options: [
      "true",
      "false",
      "Nan",
      "Syntax Error"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1185).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1149",
    title: "JS Challenge #1149",
    difficulty: "medium",
    category: "basics",
    code: `let arr = [1, 2, 3];function modifyArray(array) {  array.push(4);}modifyArray(arr.splice(1));console.log(arr);`,
    options: [
      "[]",
      "[1]",
      "[2,3,4]",
      "[1,2,4]"
],
    correctAnswer: "[1]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1149).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1152",
    title: "JS Challenge #1152",
    difficulty: "medium",
    category: "basics",
    code: `let x = 5;let result = typeof (x + "10");console.log(result);`,
    options: [
      "number",
      "string",
      "Error",
      "object"
],
    correctAnswer: "string",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1152).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`string\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1155",
    title: "JS Challenge #1155",
    difficulty: "medium",
    category: "basics",
    code: `function foo() {    let a = b = 0    a++    return a} foo()console.log(typeof a)console.log(typeof b)`,
    options: [
      "undefined, number",
      "undefined, undefined",
      "number, number",
      "number undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1155).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected identifier 'a'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1158",
    title: "JS Challenge #1158",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  a: 1,  b: function() {    console.log(this.a);  }};const func = obj.b;func();`,
    options: [
      "1",
      "undefined",
      "TypeError: Cannot read property 'a' of undefined",
      "ReferenceError: a is not defined"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1158).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1161",
    title: "JS Challenge #1161",
    difficulty: "medium",
    category: "basics",
    code: `function* generator() {  yield 1;  yield 2;  yield 3;}const gen = generator();console.log(gen.next().value);console.log(gen.next().value);`,
    options: [
      "1, null",
      "1, undefined",
      "1,2",
      "1, 1"
],
    correctAnswer: "1, null",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1161).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1164",
    title: "JS Challenge #1164",
    difficulty: "medium",
    category: "basics",
    code: `const a = { a: 1 };const b = Object.assign({}, a);b.a = 2;console.log(a.a);`,
    options: [
      "2",
      "1",
      "undefined",
      "TypeError: Cannot set property 'a' of undefined"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1164).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1167",
    title: "JS Challenge #1167",
    difficulty: "medium",
    category: "basics",
    code: `const a = [1, 2, 3];const b = a.slice(0, 2).push(4);console.log(b);`,
    options: [
      "[1, 2, 4]",
      "[1, 2]",
      "3",
      "4"
],
    correctAnswer: "3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1167).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1130",
    title: "JS Challenge #1130",
    difficulty: "medium",
    category: "basics",
    code: `console.log(typeof null);`,
    options: [
      "null",
      "object",
      "undefined",
      "number"
],
    correctAnswer: "object",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1130).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`object\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1133",
    title: "JS Challenge #1133",
    difficulty: "medium",
    category: "basics",
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: [
      "false",
      "true",
      "TypeError",
      "NaN"
],
    correctAnswer: "false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1133).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1136",
    title: "JS Challenge #1136",
    difficulty: "medium",
    category: "basics",
    code: `var x = 1;function changeX() { x = 2; }changeX();console.log(x);`,
    options: [
      "1",
      "undefined",
      "Error",
      "2"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1136).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1139",
    title: "JS Challenge #1139",
    difficulty: "medium",
    category: "basics",
    code: `function Animal(){   this.type = "animal"}   function Dog(){   this.name = "dog"} Dog.prototype = new Animal() var PavlovPet = new Dog();  console.log(PavlovPet.__proto__ === Dog.prototype)console.log(Dog.prototype.__proto__ === Animal.prototype)`,
    options: [
      "true and true",
      "false and true",
      "true and false",
      "false and false"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1139).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected token 'var'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1142",
    title: "JS Challenge #1142",
    difficulty: "medium",
    category: "basics",
    code: `console.log("5" + 3);console.log("5" - 3);`,
    options: [
      "\"53\" and 2",
      "\"53\" and \"23\"",
      "8 and 2",
      "8 and \"23\""
],
    correctAnswer: "\"53\" and 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1142).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`53
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1145",
    title: "JS Challenge #1145",
    difficulty: "medium",
    category: "basics",
    code: `console.log(new RegExp({}).test("mom"));console.log(new RegExp({}).test("dad"));`,
    options: [
      "true false",
      "false false",
      "true true",
      "false true"
],
    correctAnswer: "true false",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1145).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true
false\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1108",
    title: "JS Challenge #1108",
    difficulty: "medium",
    category: "basics",
    code: `const nums = [1, 2, 3, 4, 5];const sum = nums.reduce((total, current) => {  return total + current * current;}, 0);console.log(sum);`,
    options: [
      "55",
      "30",
      "50",
      "65"
],
    correctAnswer: "55",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1108).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`55\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1111",
    title: "JS Challenge #1111",
    difficulty: "medium",
    category: "basics",
    code: `const num = 8;const obj = {  num: 10,  inner: {    num: 6,    getNum: function() {      return this.num;    }  }};console.log(obj.inner.getNum());const getNum = obj.inner.getNum;console.log(getNum());`,
    options: [
      "6 8",
      "6 undefined",
      "10 8",
      "undefined undefined"
],
    correctAnswer: "6 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1111).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1114",
    title: "JS Challenge #1114",
    difficulty: "medium",
    category: "basics",
    code: `function* generateSequence() {  yield 1;  yield 2;  return 3;}const generator = generateSequence();console.log(generator.next());console.log(generator.next());console.log(generator.next());`,
    options: [
      "{ value: 1, done: false }, { value: 2, done: false }, { value: 3, done: false }",
      "{ value: 1, done: false }, { value: 2, done: false }, { value: 3, done: true }",
      "{ value: 1, done: true }, { value: 2, done: true }, { value: 3, done: false }",
      "{ value: 1, done: true }, { value: 2, done: true }, { value: 3, done: true }"
],
    correctAnswer: "{ value: 1, done: false }, { value: 2, done: false }, { value: 3, done: false }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1114).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"value":1,"done":false}
{"value":2,"done":false}
{"value":3,"done":true}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1117",
    title: "JS Challenge #1117",
    difficulty: "medium",
    category: "basics",
    code: `function factorial(n) {  return n <= 1 ? 1 : n * factorial(n - 1);}console.log(factorial(5));`,
    options: [
      "120",
      "20",
      "25",
      "15"
],
    correctAnswer: "120",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1117).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`120\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1120",
    title: "JS Challenge #1120",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  value: 42,  getValue: function() {    return () => {      console.log(this.value);    };  }};const getValue = obj.getValue();getValue();`,
    options: [
      "42",
      "undefined",
      "Error",
      "NaN"
],
    correctAnswer: "42",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1120).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`42\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1123",
    title: "JS Challenge #1123",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2, c: 3 };let result = "";for (const [key, value] of Object.entries(obj)) {  result += key + value;}console.log(result);`,
    options: [
      "abc",
      "123",
      "abbccc",
      "a1b2c3"
],
    correctAnswer: "a1b2c3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1123).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`a1b2c3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1089",
    title: "JS Challenge #1089",
    difficulty: "medium",
    category: "basics",
    code: `const x = [1, 2, 3];const y = x;y.push(4);console.log(x.length);`,
    options: [
      "3",
      "4",
      "TypeError: console.log is not a function",
      "ReferenceError: x is not defined"
],
    correctAnswer: "4",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1089).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`4\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1092",
    title: "JS Challenge #1092",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2, c: 3 };const result = Object.values(obj).reduce((acc, curr) => acc * curr, 1);console.log(result);`,
    options: [
      "undefined",
      "1",
      "5",
      "6"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1092).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1095",
    title: "JS Challenge #1095",
    difficulty: "medium",
    category: "basics",
    code: `const person = { name: 'John', age: 30 };const { name, ...rest } = person;console.log(rest);`,
    options: [
      "{   age: 30 }",
      "{ name: 'John' }",
      "{ name: 'John', age: 30 }",
      "John"
],
    correctAnswer: "{   age: 30 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1095).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"age":30}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1098",
    title: "JS Challenge #1098",
    difficulty: "medium",
    category: "basics",
    code: `function Person(name) {  this.name = name;}Person.prototype.greet = function() {  return \`Hello, my name is \${this.name}\`;};const john = new Person('John');console.log(john.greet());`,
    options: [
      "undefined",
      "Hello, my name is John",
      "TypeError: john.greet is not a function",
      "Hello, my name is undefined"
],
    correctAnswer: "Hello, my name is John",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1098).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Hello, my name is John\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1102",
    title: "JS Challenge #1102",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3];const [x, y, z] = numbers;console.log(x, y, z);`,
    options: [
      "[1, 2, 3]",
      "1, 2, 3",
      "undefined undefined undefined",
      "2, 2, 3"
],
    correctAnswer: "[1, 2, 3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1102).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1 2 3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1105",
    title: "JS Challenge #1105",
    difficulty: "medium",
    category: "basics",
    code: `const value = { number: 10 };function increment(obj) {  obj.number++;}increment(value);console.log(value.number);`,
    options: [
      "10",
      "TypeError: Cannot read property 'number' of undefined",
      "undefined",
      "11"
],
    correctAnswer: "11",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1105).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`11\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1068",
    title: "JS Challenge #1068",
    difficulty: "medium",
    category: "basics",
    code: `class Rectangle {  constructor(width, height) {    this.width = width;    this.height = height;  }  get area() {    return this.width * this.height;  }}const rectangle = new Rectangle(5, 10);console.log(rectangle.area());`,
    options: [
      "TypeError: rectangle.area is not a function at line 13",
      "ReferenceError: height is not defined at line 3",
      "Error: Cannot access 'this' before initialization at line 5",
      "No error"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1068).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: rectangle.area is not a function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1071",
    title: "JS Challenge #1071",
    difficulty: "medium",
    category: "basics",
    code: `const obj = { a: 1, b: 2 };const key = 'c';console.log(obj[key]);`,
    options: [
      "ReferenceError: c is not defined at line 3",
      "undefined",
      "TypeError: obj is not iterable at line 3",
      "No error"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1071).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1074",
    title: "JS Challenge #1074",
    difficulty: "medium",
    category: "basics",
    code: `const promise = new Promise((resolve, reject) => {  setTimeout(() => {    resolve('Resolved');    reject(new Error('Rejected'));  }, 1000);});promise.then(response => console.log(response)).catch(error => console.error(error));`,
    options: [
      "Error: Rejected at line 8",
      "Resolved",
      "ReferenceError: response is not defined at line 7",
      "SyntaxError: Unexpected token 'catch' at line 9"
],
    correctAnswer: "Resolved",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1074).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Resolved\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1077",
    title: "JS Challenge #1077",
    difficulty: "medium",
    category: "basics",
    code: `function asyncQuiz() {  return new Promise((resolve) => {    setTimeout(() => resolve('Hello'), 1000);  });}async function runAsyncQuiz() {  const result = await asyncQuiz();  console.log(result);}runAsyncQuiz();console.log('World');`,
    options: [
      "World Hello",
      "Hello World",
      "Hello undefined",
      "Error"
],
    correctAnswer: "World Hello",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1077).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`World
Hello\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1080",
    title: "JS Challenge #1080",
    difficulty: "medium",
    category: "basics",
    code: `var a = 1;function scopeQuiz() {  console.log(a);  var a = 2;}scopeQuiz();`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1080).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1083",
    title: "JS Challenge #1083",
    difficulty: "medium",
    category: "basics",
    code: `function delayedLog(item) {  setTimeout(() => {    console.log(item);  }, 1000);}for (var i = 0; i < 3; i++) {  delayedLog(i);}`,
    options: [
      "0 1 2",
      "2 2 2",
      "undefined undefined undefined",
      "1 2 3"
],
    correctAnswer: "0 1 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1083).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0
1
2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1086",
    title: "JS Challenge #1086",
    difficulty: "medium",
    category: "basics",
    code: `var a = 1;const arrowQuiz = () => {  console.log(this.a);};arrowQuiz();var a = 2;`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1086).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1050",
    title: "JS Challenge #1050",
    difficulty: "medium",
    category: "basics",
    code: `const product = {  name: "Laptop",  price: 1000,  discount: function(percentage) {    return this.price * (percentage / 100);  }};const result = product.discount(10);console.log(result);`,
    options: [
      "100",
      "10",
      "1000",
      "1"
],
    correctAnswer: "100",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1050).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`100\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1053",
    title: "JS Challenge #1053",
    difficulty: "medium",
    category: "basics",
    code: `const x = [1, 2, 3];const y = x;y.push(4);console.log(x);`,
    options: [
      "[1, 2, 3, 4]",
      "[1, 2, 3]",
      "[1, 2, 3] [1, 2, 3, 4]",
      "TypeError: console.log is not a function"
],
    correctAnswer: "[1, 2, 3, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1053).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1056",
    title: "JS Challenge #1056",
    difficulty: "medium",
    category: "basics",
    code: `let i = 0;for (; i < 5; i++) {  setTimeout(() => console.log(i), 0);}`,
    options: [
      "5 5 5 5 5",
      "0 1 2 3 4",
      "1 2 3 4 5",
      "4 4 4 4 4"
],
    correctAnswer: "5 5 5 5 5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1056).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5
5
5
5
5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1059",
    title: "JS Challenge #1059",
    difficulty: "medium",
    category: "basics",
    code: `const num = 8;const obj = {  num: 10,  inner: {    num: 6,    getNum: function() {      return this.num;    }  }};console.log(obj.inner.getNum());const getNum = obj.inner.getNum;console.log(getNum());`,
    options: [
      "10 8",
      "6 8",
      "6 undefined",
      "undefined undefined"
],
    correctAnswer: "6 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1059).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1062",
    title: "JS Challenge #1062",
    difficulty: "medium",
    category: "basics",
    code: `const person = {};person.name.toUpperCase();console.log(person.name);`,
    options: [
      "TypeError: Cannot read property 'toUpperCase' of undefined",
      "TypeError: person.name.toUpperCase is not a function",
      "ReferenceError: name is not defined",
      "ReferenceError: person is not defined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1062).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Cannot read properties of undefined (reading 'toUpperCase')\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1065",
    title: "JS Challenge #1065",
    difficulty: "medium",
    category: "basics",
    code: `function fetchData(url) {  return new Promise((resolve, reject) => {    setTimeout(() => {      if (url.startsWith('https://api.example.com')) {        resolve({ data: 'Some data' });      } else {        reject(new Error('Invalid URL'));      }    }, 1000);  });}fetchData('https://api.example.com/data')  .then(response => console.log(response.data))  .catch(error => console.error(error));`,
    options: [
      "Some data",
      "ReferenceError: resolve is not defined at line 4",
      "SyntaxError: Unexpected token '{' at line 2",
      "Error: Invalid URL at line 8"
],
    correctAnswer: "Some data",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1065).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Some data\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1030",
    title: "JS Challenge #1030",
    difficulty: "medium",
    category: "basics",
    code: `const string = "Hello, World! How are you?";const result = string.match(/[aeiou]/g).reduce((acc, char) => {  acc[char] = (acc[char] || 0) + 1;  return acc;}, {});console.log(result);`,
    options: [
      "This will result in an error.",
      "{ a: 1, e: 1, i: 1, o: 2, u: 2 }",
      "{ a: 0, e: 1, i: 0, o: 1, u: 1 }",
      "{   a: 1,   e: 2,   o: 4,   u: 1 }"
],
    correctAnswer: "This will result in an error.",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1030).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"e":2,"o":4,"a":1,"u":1}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1033",
    title: "JS Challenge #1033",
    difficulty: "medium",
    category: "basics",
    code: `const string = "Hello, World! How are you?";const result = [...string.matchAll(/[aeiou]/g)]                 .map(match => match[0])                 .reverse()                 .join("");console.log(result);`,
    options: [
      "\"uoa eo o\"",
      "\"uoeaoooe\"",
      "\"uo er o\"",
      "This will result in an error."
],
    correctAnswer: "\"uoeaoooe\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1033).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`uoeaoooe\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1036",
    title: "JS Challenge #1036",
    difficulty: "medium",
    category: "basics",
    code: `const string = "open sesame";const result = string.split(" ").map(word => word.length);console.log(result);`,
    options: [
      "[4, 7]",
      "[7, 4]",
      "[3, 6]",
      "[4, 6]"
],
    correctAnswer: "[4, 6]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1036).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[4,6]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1041",
    title: "JS Challenge #1041",
    difficulty: "medium",
    category: "basics",
    code: `const string = "hello world";const result = string.split("").filter((char, index) => index % 2 === 0).join("");console.log(result);`,
    options: [
      "\"hlowrd\"",
      "\"hlo ol\"",
      "\"hello world\"",
      "\"eoo\""
],
    correctAnswer: "\"hlowrd\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1041).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`hlowrd\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1044",
    title: "What is thte output?",
    difficulty: "medium",
    category: "basics",
    code: `const string = "abacabadabacaba";const result = string.split("").reduce((acc, val) => {  acc[val] = (acc[val] || 0) + 1;  return acc;}, {});console.log(result);`,
    options: [
      "{ a: 6, b: 4, c: 3, d: 2 }",
      "{   a: 8,   b: 4,   c: 2,   d: 1 }",
      "{ a: 7, b: 4, c: 2, d: 1 }",
      "{ a: 7, b: 5, c: 2, d: 1 }"
],
    correctAnswer: "{   a: 8,   b: 4,   c: 2,   d: 1 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1044).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"a":8,"b":4,"c":2,"d":1}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1007",
    title: "JS Challenge #1007",
    difficulty: "medium",
    category: "basics",
    code: `function* generatorQuiz() {  yield 1;}const generator = generatorQuiz();setTimeout(() => console.log(generator.next().value), 0);for (const value of generator) {  console.log(value);}`,
    options: [
      "1 1",
      "Error",
      "1 undefined",
      "undefined 1"
],
    correctAnswer: "1 undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1007).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1009",
    title: "JS Challenge #1009",
    difficulty: "medium",
    category: "basics",
    code: `function recursivePascalTriangle(n, row = [1], triangle = []) {  triangle.push(row);  if (n === triangle.length) {    return triangle;  }  const nextRow = [1];  for (let i = 1; i < row.length; i++) {    nextRow.push(row[i] + row[i - 1]);  }  nextRow.push(1);  return recursivePascalTriangle(n, nextRow, triangle);}const result = recursivePascalTriangle(5);console.log(result);`,
    options: [
      "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
      "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 10, 10, 1]]",
      "[[1], [1, 2], [1, 3, 6], [1, 4, 9, 16], [1, 5, 10, 20, 25]]",
      "This will result in an error."
],
    correctAnswer: "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1009).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1012",
    title: "What is the otuput?",
    difficulty: "medium",
    category: "basics",
    code: `function recursiveNQueens(n) {  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => "."));  const solutions = [];  const isSafe = (row, col) => {    for (let i = 0; i < row; i++) {      if (board[i][col] === "Q") return false;      const colOffset = row - i;      if (col - colOffset >= 0 && board[i][col - colOffset] === "Q") return false;      if (col + colOffset < n && board[i][col + colOffset] === "Q") return false;    }    return true;  };  const placeQueens = (row) => {    if (row === n) {      solutions.push(board.map(row => row.join("")));      return;    }    for (let col = 0; col < n; col++) {      if (isSafe(row, col)) {        board[row][col] = "Q";        placeQueens(row + 1);        board[row][col] = ".";      }    }  };  placeQueens(0);  return solutions;}const result = recursiveNQueens(4);console.log(result);`,
    options: [
      "[[\".Q..\", \"...Q\", \"Q...\", \"..Q.\"], [\"..Q.\", \"Q...\", \"...Q\", \".Q..\"]]",
      "[['.Q..','..Q.','...Q','Q...'], ['..Q.','Q...','...Q','.Q..']]",
      "[['..Q.','Q...','...Q','.Q..'], ['.Q..','...Q','Q...','..Q.']]",
      "This will result in an error."
],
    correctAnswer: "[[\".Q..\", \"...Q\", \"Q...\", \"..Q.\"], [\"..Q.\", \"Q...\", \"...Q\", \".Q..\"]]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1012).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1015",
    title: "JS Challenge #1015",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const sum = numbers.reduce((acc, curr) => {  setTimeout(() => {    acc += curr;  }, 0);  return acc;}, 0);console.log(sum);`,
    options: [
      "15",
      "0",
      "undefined",
      "This will throw an error."
],
    correctAnswer: "0",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1015).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`0\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1018",
    title: "JS Challenge #1018",
    difficulty: "medium",
    category: "basics",
    code: `function recursiveMaxSubarraySum(nums, startIndex = 0, currentSum = 0, maxSum = -Infinity) {  if (startIndex === nums.length) {    return maxSum;  }  currentSum = Math.max(nums[startIndex], currentSum + nums[startIndex]);  maxSum = Math.max(currentSum, maxSum);  return recursiveMaxSubarraySum(nums, startIndex + 1, currentSum, maxSum);}const result = recursiveMaxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]);console.log(result);`,
    options: [
      "8",
      "11",
      "9",
      "6"
],
    correctAnswer: "6",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1018).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`6\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1021",
    title: "JS Challenge #1021",
    difficulty: "medium",
    category: "basics",
    code: `const string = "Lorem ipsum dolor sit amet";const result = string.split(" ")                     .map(word => word.toLowerCase())                     .reduce((acc, word) => {                       acc[word] = (acc[word] || 0) + 1;                       return acc;                     }, {});console.log(result);`,
    options: [
      "{ lorem: 1, Ipsum: 1, dolor: 1, sit: 1, amet: 1 }",
      "{   amet: 1,   dolor: 1,   ipsum: 1,   lorem: 1,   sit: 1 }",
      "{ lorem: 1, ipsum: 1, dolor: 1, sit: 1, amet: 2 }",
      "This will result in an error."
],
    correctAnswer: "{ lorem: 1, Ipsum: 1, dolor: 1, sit: 1, amet: 1 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1021).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"lorem":1,"ipsum":1,"dolor":1,"sit":1,"amet":1}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1025",
    title: "JS Challenge #1025",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers.filter(num => num % 2 === 0)                     .map(num => num ** 2)                     .reduce((acc, val) => acc + val, 0);console.log(result);`,
    options: [
      "6",
      "20",
      "30",
      "54"
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1025).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-987",
    title: "JS Challenge #987",
    difficulty: "medium",
    category: "basics",
    code: `const fetchData = async (id) => {  return new Promise((resolve) => {    setTimeout(() => resolve(\`Data for ID \${id}\`), 100);  });};const ids = [1, 2, 3];async function complexAsyncFetch(ids) {  const result = await ids.reduce(async (acc, id) => {    const data = await fetchData(id);    const currentResult = await acc;    currentResult.push(data);    return currentResult;  }, Promise.resolve([]));  console.log(result);}complexAsyncFetch(ids);`,
    options: [
      "[Promise { ['Data for ID 1', 'Data for ID 2', 'Data for ID 3'] }]",
      "['Data for ID 1', 'Data for ID 2', 'Data for ID 3']",
      "['Data for ID 3', 'Data for ID 2', 'Data for ID 1']",
      "This will result in an error."
],
    correctAnswer: "[Promise { ['Data for ID 1', 'Data for ID 2', 'Data for ID 3'] }]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 987).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["Data for ID 1","Data for ID 2","Data for ID 3"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-990",
    title: "JS Challenge #990",
    difficulty: "medium",
    category: "basics",
    code: `function recursiveFibonacci(n) {  return n <= 1 ? n : recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);}const result = recursiveFibonacci(6);console.log(result);`,
    options: [
      "8",
      "13",
      "21",
      "This will result in an error."
],
    correctAnswer: "8",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 990).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`8\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-993",
    title: "JS Challenge #993",
    difficulty: "medium",
    category: "basics",
    code: `function recursivePalindromeCheck(str) {  if (str.length <= 1) {    return true;  }  return str[0] === str[str.length - 1] && recursivePalindromeCheck(str.slice(1, -1));}const result = recursivePalindromeCheck("radar");console.log(result);`,
    options: [
      "true",
      "false",
      "This will result in an error.",
      "The output is not predictable."
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 993).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-996",
    title: "JS Challenge #996",
    difficulty: "medium",
    category: "basics",
    code: `function recursiveBinarySearch(arr, target, start = 0, end = arr.length - 1) {  if (start > end) {    return -1;  }  const mid = Math.floor((start + end) / 2);  if (arr[mid] === target) {    return mid;  } else if (arr[mid] < target) {    return recursiveBinarySearch(arr, target, mid + 1, end);  } else {    return recursiveBinarySearch(arr, target, start, mid - 1);  }}const result = recursiveBinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6);console.log(result);`,
    options: [
      "5",
      "6",
      "4",
      "-1"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 996).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1000",
    title: "JS Challenge #1000",
    difficulty: "medium",
    category: "basics",
    code: `function recursiveReverseString(str) {  return str === "" ? str : recursiveReverseString(str.substr(1)) + str[0];}const result = recursiveReverseString("hello");console.log(result);`,
    options: [
      "\"hello\"",
      "\"hell\"",
      "\"olleh\"",
      "\"h\""
],
    correctAnswer: "\"olleh\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1000).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`olleh\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-1002",
    title: "JS Challenge #1002",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {  0: 'a',  1: 'b',  length: 2};const result = Array.from(obj);console.log(result);`,
    options: [
      "[‘a’, ‘b’]",
      "[‘a’, ‘b’, 2]",
      "[2, ‘a’, ‘b’]",
      "[0, 1, ‘length’]"
],
    correctAnswer: "[‘a’, ‘b’]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 1002).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["a","b"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-966",
    title: "JS Challenge #966",
    difficulty: "medium",
    category: "basics",
    code: `async function complexAsyncFunction() {  const promise1 = new Promise(resolve => setTimeout(() => resolve(10), 1000));  const promise2 = new Promise(resolve => setTimeout(() => resolve(20), 500));  const result = await Promise.race([promise1, promise2]);  console.log(result);}complexAsyncFunction();`,
    options: [
      "500",
      "10",
      "20",
      "The output is not predictable."
],
    correctAnswer: "20",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 966).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`20\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-969",
    title: "JS Challenge #969",
    difficulty: "medium",
    category: "basics",
    code: `const array = [  { name: 'John', score: 80 },  { name: 'Jane', score: 95 },  { name: 'Doe', score: 88 },];const result = array.every(obj => obj.score >= 80);console.log(result);`,
    options: [
      "[true, true, true]",
      "[false, false, false]",
      "false",
      "true"
],
    correctAnswer: "[true, true, true]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 969).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-972",
    title: "JS Challenge #972",
    difficulty: "medium",
    category: "basics",
    code: `const array = [  { name: 'Alice', age: 25 },  { name: 'Bob', age: 30 },  { name: 'Charlie', age: 22 },];const result = array.find(obj => obj.age === 30);console.log(result);`,
    options: [
      "{ name: 'Bob', age: 30 }",
      "{ name: 'Charlie', age: 22 }",
      "{ name: 'Alice', age: 25 }",
      "undefined"
],
    correctAnswer: "{ name: 'Bob', age: 30 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 972).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"name":"Bob","age":30}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-977",
    title: "JS Challenge #977",
    difficulty: "medium",
    category: "basics",
    code: `function asyncSum(arr) {  return arr.reduce(async (acc, num) => (await acc) + num, Promise.resolve(0));}async function computeTotal() {  const result = await asyncSum([1, 2, 3, 4, 5]);  console.log(result);}computeTotal();`,
    options: [
      "Promise { 15 }",
      "15",
      "012345",
      "This will result in an error."
],
    correctAnswer: "Promise { 15 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 977).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-981",
    title: "JS Challenge #981",
    difficulty: "medium",
    category: "basics",
    code: `const matrix = [  [1, 2, 3],  [4, 5, 6],  [7, 8, 9],];async function complexMatrixOperation(matrix) {  const result = await Promise.all(matrix.map(async row => {    return await Promise.all(row.map(async num => {      if (num % 2 === 0) {        return await new Promise(resolve => setTimeout(() => resolve(num * 3), 200));      } else {        return await new Promise(resolve => setTimeout(() => resolve(num * 2), 100));      }    }));  }));  console.log(result);}complexMatrixOperation(matrix);`,
    options: [
      "This will result in an error.",
      "[[6, 12, 18], [24, 20, 36], [42, 48, 54]]",
      "[[2, 4, 6], [8, 10, 12], [14, 16, 18]]",
      "[[2, 6, 6], [12, 10, 18], [14, 24, 18]]"
],
    correctAnswer: "[[2, 6, 6], [12, 10, 18], [14, 24, 18]]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 981).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[[2,6,6],[12,10,18],[14,24,18]]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-984",
    title: "JS Challenge #984",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncQuiz() {  console.log("Start");  const promise1 = new Promise((resolve) => {    setTimeout(() => resolve("Promise 1"), 1000);  });  const promise2 = new Promise((resolve) => {    setTimeout(() => resolve("Promise 2"), 500);  });  console.log(await promise1);  console.log(await promise2);  console.log("End");}asyncQuiz();`,
    options: [
      "\"Start\", \"End\", \"Promise 1\", \"Promise 2\"",
      "\"Start\", \"Promise 1\", \"Promise 2\", \"End\"",
      "\"Start\", \"Promise 2\", \"Promise 1\", \"End\"",
      "This will result in an error."
],
    correctAnswer: "\"Start\", \"End\", \"Promise 1\", \"Promise 2\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 984).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Promise 1
Promise 2
End\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-944",
    title: "JS Challenge #944",
    difficulty: "medium",
    category: "basics",
    code: `const string = 'a1b2c3d4e5';const result = string.match(/\d+/g).map(Number);console.log(result);`,
    options: [
      "[1, 2, 3, 4, 5]",
      "['1', '2', '3', '4', '5']",
      "[1, '2', 3, '4', 5]",
      "This will result in an error."
],
    correctAnswer: "[1, 2, 3, 4, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 944).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-948",
    title: "JS Challenge #948",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let a = 0, b = 1;  while (true) {    yield a;    [a, b] = [b, a + b];  }}const fibSequence = Array.from({ length: 5 }, () => fibonacci().next().value);console.log(fibSequence);`,
    options: [
      "[0, 0, 0, 0, 0]",
      "[0, 1, 1, 2, 3]",
      "[0, 1, 1, 3, 5]",
      "[0, 1, 2, 4, 8]"
],
    correctAnswer: "[0, 0, 0, 0, 0]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 948).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,0,0,0,0]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-951",
    title: "JS Challenge #951",
    difficulty: "medium",
    category: "basics",
    code: `const matrix = [  [2, 4],  [6, 8],];const result = matrix.reduceRight((acc, row) => acc.concat(row.map(num => num * 2)), []);console.log(result);`,
    options: [
      "[4, 8, 12, 16]",
      "[8, 6, 4, 2]",
      "[12, 16, 4, 8]",
      "[2, 4, 6, 8]"
],
    correctAnswer: "[12, 16, 4, 8]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 951).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[12,16,4,8]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-954",
    title: "JS Challenge #954",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncArrayOperations() {  const array1 = [1, 2, 3];  const array2 = [4, 5, 6];  const result = await Promise.all([array1, array2].map(async arr => {    return await arr.reduce(async (acc, num) => {      return (await acc) + num;    }, Promise.resolve(0));  }));  console.log(result);}asyncArrayOperations();`,
    options: [
      "[10, 20]",
      "[1, 2, 3, 4, 5, 6]",
      "[6, 15]",
      "This will result in an error."
],
    correctAnswer: "[6, 15]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 954).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[6,15]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-957",
    title: "JS Challenge #957",
    difficulty: "medium",
    category: "basics",
    code: `const matrix = [  [1, 2, 3],  [4, 5, 6],  [7, 8, 9],];async function asyncSumOfEvenNumbers(matrix) {  const result = await matrix.flat().filter(async num => {    return await Promise.resolve(num % 2 === 0);  });  return result.reduce((acc, num) => acc + num, 0);}asyncSumOfEvenNumbers(matrix).then(result => console.log(result));`,
    options: [
      "18",
      "This will result in an error.",
      "45",
      "20"
],
    correctAnswer: "45",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 957).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`45\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-960",
    title: "JS Challenge #960",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncSumOfSquares() {  const numbers = [1, 2, 3, 4, 5];  const result = await numbers.reduce(async (acc, num) => {    const currentSquare = await Promise.resolve(num * num);    return (await acc) + currentSquare;  }, Promise.resolve(0));  console.log(result);}asyncSumOfSquares();`,
    options: [
      "This will result in an error.",
      "15",
      "30",
      "55"
],
    correctAnswer: "55",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 960).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`55\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-925",
    title: "JS Challenge #925",
    difficulty: "medium",
    category: "basics",
    code: `const sentence = 'The quick brown fox jumps over the lazy dog';const result = sentence.split(/\s+/).map(word => word.length).filter(length => length % 2 === 0);console.log(result);`,
    options: [
      "[3, 5, 3, 4, 4]",
      "[2, 4, 3, 3]",
      "[4, 4]",
      "[2, 4]"
],
    correctAnswer: "[4, 4]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 925).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[4,4]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-928",
    title: "JS Challenge #928",
    difficulty: "medium",
    category: "basics",
    code: `const text = 'Hello, World!';const result = text.match(/l+/g);console.log(result);`,
    options: [
      "['l', 'l', 'l']",
      "['ll']",
      "['l', 'l']",
      "['ll', 'l']"
],
    correctAnswer: "['ll', 'l']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 928).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["ll","l"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-932",
    title: "JS Challenge #932",
    difficulty: "medium",
    category: "basics",
    code: `const a = [1, 2, 3];const b = a;b[0] = 0;console.log(a);`,
    options: [
      "[1, 2, 3]",
      "[0, 2, 3]",
      "[0, 2, 3, 1]",
      "[0, 2, 3, 1, 2, 3]"
],
    correctAnswer: "[0, 2, 3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 932).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[0,2,3]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-935",
    title: "JS Challenge #935",
    difficulty: "medium",
    category: "basics",
    code: `async function asyncQuiz() {  console.log("Start");  const promise1 = new Promise((resolve) => {    setTimeout(() => resolve("Promise 1"), 1000);  });  const promise2 = new Promise((resolve) => {    setTimeout(() => resolve("Promise 2"), 500);  });  console.log(await promise1);  console.log(await promise2);  console.log("End");}asyncQuiz();`,
    options: [
      "Start, Promise 1, Promise 2, End",
      "Start, Promise 2, Promise 1, End",
      "Start, Promise 1, End, Promise 2",
      "Start, Promise 2, End, Promise 1"
],
    correctAnswer: "Start, Promise 1, Promise 2, End",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 935).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Start
Promise 1
Promise 2
End\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-938",
    title: "JS Challenge #938",
    difficulty: "medium",
    category: "basics",
    code: `function* gen() {  yield *[1,1];  yield 2;  yield 3;}const generator = gen();console.log(generator.next().value);console.log(generator.next().value);for (const value of generator) {  console.log(value);}`,
    options: [
      "Error",
      "1 2 3",
      "[1,1] 2 3",
      "1 1 2 3"
],
    correctAnswer: "1 2 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 938).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-941",
    title: "JS Challenge #941",
    difficulty: "medium",
    category: "basics",
    code: `function getArr() {  return Array.from(arguments);}const result = getArr(...[1, 2, 3]);console.log(result);`,
    options: [
      "Error",
      "[[1],[2],[3]]",
      "[1,2,3]",
      "[1]"
],
    correctAnswer: "[1,2,3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 941).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-905",
    title: "JS Challenge #905",
    difficulty: "medium",
    category: "basics",
    code: `const data = [1, 2, 3, 4, 5];const result = data.flatMap(num => Array(num).fill(num * 2));console.log(result);`,
    options: [
      "[1, 1, 2, 2, 3, 3, 4, 4, 5, 5]",
      "[1, 2, 3, 4, 5]",
      "[1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]",
      "[2, 4, 4, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 10]"
],
    correctAnswer: "[2, 4, 4, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 10]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 905).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,4,4,6,6,6,8,8,8,8,10,10,10,10,10]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-908",
    title: "JS Challenge #908",
    difficulty: "medium",
    category: "basics",
    code: `const data = [  { id: 1, name: 'Alice', age: 25, gender: 'Female' },  { id: 2, name: 'Bob', age: 30, gender: 'Male' },  { id: 3, name: 'Charlie', age: 22, gender: 'Male' },  { id: 4, name: 'David', age: 35, gender: 'Male' },];const result = data.filter(person => person.gender === 'Male').map(person => person.age).reduce((acc, age) => acc + age, 0);console.log(result);`,
    options: [
      "67",
      "30",
      "87",
      "57"
],
    correctAnswer: "87",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 908).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`87\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-911",
    title: "JS Challenge #911",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [1, 2, 3, 4, 5];const result = numbers.reduce((acc, num) => {  if (num % 2 === 0) {    acc.even += num;  } else {    acc.odd *= num;  }  return acc;}, { even: 0, odd: 1 });console.log(result);`,
    options: [
      "{ even: 6, odd: 15 }",
      "{ even: 9, odd: 120 }",
      "{ even: 6, odd: 120 }",
      "{ even: 9, odd: 15 }"
],
    correctAnswer: "{ even: 6, odd: 15 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 911).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"even":6,"odd":15}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-915",
    title: "What is the otuput?",
    difficulty: "medium",
    category: "basics",
    code: `const words = ['apple', 'banana', 'cherry'];const result = words.map(word => [...word].reduce((acc, char) => char + acc, ''));console.log(result);`,
    options: [
      "[\"elppa\", \"ananab\", \"yrrehc\"]",
      "['epple', 'ananab', 'rehtc']",
      "['elppa', 'ananab', 'rehtc']",
      "['epple', 'ananab', 'yrrehc']"
],
    correctAnswer: "[\"elppa\", \"ananab\", \"yrrehc\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 915).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["elppa","ananab","yrrehc"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-918",
    title: "JS Challenge #918",
    difficulty: "medium",
    category: "basics",
    code: `function Car(make, model) {  this.make = make;  this.model = model;}Car.prototype.displayInfo = function () {  return \`Make: \${this.make}, Model: \${this.model}\`;};const myCar = new Car('Toyota', 'Camry');console.log(myCar.displayInfo());`,
    options: [
      "[object Object]",
      "Make: Toyota, Model: Camry",
      "Undefined",
      "This will result in an error."
],
    correctAnswer: "Make: Toyota, Model: Camry",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 918).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Make: Toyota, Model: Camry\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-922",
    title: "JS Challenge #922",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [4, 9, 16, 25];const result = numbers.every(num => Math.sqrt(num) % 1 === 0);console.log(result);`,
    options: [
      "This will result in an error.",
      "false",
      "true",
      "undefined"
],
    correctAnswer: "true",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 922).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`true\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-890",
    title: "JS Challenge #890",
    difficulty: "medium",
    category: "basics",
    code: `function calculateAsyncSum(numbers) {  return new Promise(resolve => {    setTimeout(() => {      const sum = numbers.reduce((acc, num) => acc + num, 0);      resolve(sum);    }, 1000);  });}async function getResult() {  const data = [1, 2, 3, 4, 5];  const result = await calculateAsyncSum(data);  console.log(result);}getResult();`,
    options: [
      "15",
      "This will result in an error",
      "0",
      "10"
],
    correctAnswer: "15",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 890).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`15\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-893",
    title: "JS Challenge #893",
    difficulty: "medium",
    category: "basics",
    code: `function asyncOperation() {  return new Promise((resolve, reject) => {    setTimeout(() => {      resolve('Async operation completed!');    }, 2000);  });}const asyncOperationWithTimeout = Promise.race([asyncOperation(), new Promise((_, reject) => setTimeout(() => reject('Timeout!'), 1000))]);asyncOperationWithTimeout  .then(result => console.log(result))  .catch(error => console.log(error));`,
    options: [
      "undefined",
      "'Async operation completed!'",
      "This will result in an error",
      "'Timeout!'"
],
    correctAnswer: "'Timeout!'",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 893).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Timeout!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-896",
    title: "JS Challenge #896",
    difficulty: "medium",
    category: "basics",
    code: `function fetchData() {  return new Promise((resolve, reject) => {    setTimeout(() => {      resolve('Data fetched successfully!');    }, 1000);  });}async function getResult() {  const result = await fetchData();  console.log(result);}getResult();`,
    options: [
      "\"Data fetched successfully!\"",
      "'Fetching data...'",
      "undefined",
      "This will result in an error"
],
    correctAnswer: "\"Data fetched successfully!\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 896).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Data fetched successfully!\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-899",
    title: "JS Challenge #899",
    difficulty: "medium",
    category: "basics",
    code: `const data = [  { id: 1, name: 'Alice', skills: ['JavaScript', 'HTML'] },  { id: 2, name: 'Bob', skills: ['JavaScript', 'CSS'] },  { id: 3, name: 'Charlie', skills: ['HTML', 'CSS'] },];const result = data.reduce((acc, person) => {  person.skills.forEach(skill => {    acc[skill] = acc[skill] ? acc[skill] + 1 : 1;  });  return acc;}, {});console.log(result);`,
    options: [
      "{ JavaScript: 3, HTML: 2, CSS: 2 }",
      "{ JavaScript: 3, HTML: 1, CSS: 1 }",
      "{ JavaScript: 2, HTML: 1, CSS: 1 }",
      "{ JavaScript: 2, HTML: 2, CSS: 2 }"
],
    correctAnswer: "{ JavaScript: 2, HTML: 2, CSS: 2 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 899).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"JavaScript":2,"HTML":2,"CSS":2}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-902",
    title: "JS Challenge #902",
    difficulty: "medium",
    category: "basics",
    code: `const data = [1, 2, 3, 4, 5];const result = data.reduce((acc, val) => acc.concat(Array.from({ length: val }, (_, index) => val + index)), []);console.log(result);`,
    options: [
      "[1, 2, 2, 3, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 9]",
      "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
      "[1, 2, 3, 3, 4, 5, 4, 5, 6, 7, 5, 6, 7, 8, 9]",
      "[1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9]"
],
    correctAnswer: "[1, 2, 3, 3, 4, 5, 4, 5, 6, 7, 5, 6, 7, 8, 9]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 902).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,3,4,5,4,5,6,7,5,6,7,8,9]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-864",
    title: "What is the output",
    difficulty: "medium",
    category: "basics",
    code: `const data = [1, 2, 3, 4, 5];const result = data.map(num => Array.from({ length: num }, (_, index) => index + 1));console.log(result);`,
    options: [
      "[[1], [2, 1], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]",
      "[[1], [2], [3], [4], [5]]",
      "[[1], [2], [3], [4], [5], [6]]",
      "[[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]"
],
    correctAnswer: "[[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5]]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 864).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[[1],[1,2],[1,2,3],[1,2,3,4],[1,2,3,4,5]]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-867",
    title: "JS Challenge #867",
    difficulty: "medium",
    category: "basics",
    code: `const data = [1, 2, 3, 4, 5];const result = data.flatMap(num => Array.from({ length: num * 2 - 1 }, (_, index) => index % 2 === 0 ? num : index + 1));console.log(result);`,
    options: [
      "[1, 2, 2, 2, 3, 2, 3, 4, 3, 4, 2, 4, 4, 4, 6, 4, 5, 2, 5, 4, 5, 6, 5, 8, 5]",
      "[1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9]",
      "[1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9]",
      "[1, 2, 3, 4, 5, 6, 7, 8, 9]"
],
    correctAnswer: "[1, 2, 2, 2, 3, 2, 3, 4, 3, 4, 2, 4, 4, 4, 6, 4, 5, 2, 5, 4, 5, 6, 5, 8, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 867).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,2,2,3,2,3,4,3,4,2,4,4,4,6,4,5,2,5,4,5,6,5,8,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-872",
    title: "JS Challenge #872",
    difficulty: "medium",
    category: "basics",
    code: `if (false) {    function foo() {        return 1;    }}console.log(foo());`,
    options: [
      "TypeError: foo is not a function",
      "1",
      "undefined"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 872).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: foo is not a function\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-875",
    title: "JS Challenge #875",
    difficulty: "medium",
    category: "basics",
    code: `const numbers = [2, 4, 6, 8, 10];const result = numbers.reduce((acc, val) => {  acc[val] = val * 2;  return acc;}, {});console.log(result);`,
    options: [
      "{ 2: 4, 4: 8, 6: 12, 8: 16, 10: 10 }",
      "{ 2: 4, 4: 8, 6: 12, 8: 16, 10: 20 }",
      "{ 2: 4, 4: 8, 6: 12, 8: 16 }",
      "{ 4: 8, 8: 16, 12: 24, 16: 32, 20: 40 }"
],
    correctAnswer: "{ 2: 4, 4: 8, 6: 12, 8: 16, 10: 20 }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 875).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"2":4,"4":8,"6":12,"8":16,"10":20}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-843",
    title: "JS Challenge #843",
    difficulty: "medium",
    category: "basics",
    code: `const matrix = [  [1, 2, 3],  [4, 5, 6],  [7, 8, 9],];let columnSums = [];for (let i = 0; i < matrix[0].length; i++) {  let sum = 0;  for (let j = 0; j < matrix.length; j++) {    sum += matrix[j][i];  }  columnSums.push(sum);}console.log(columnSums);`,
    options: [
      "[3, 7, 11]",
      "[12, 15, 18]",
      "[6, 15, 24]",
      "[1, 4, 7]"
],
    correctAnswer: "[12, 15, 18]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 843).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[12,15,18]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-846",
    title: "JS Challenge #846",
    difficulty: "medium",
    category: "basics",
    code: `const matrix = [  [1, 2, 3],  [4, 5, 6],  [7, 8, 9],];let flattenedMatrix = [];for (let i = 0; i < matrix.length; i++) {  for (let j = 0; j < matrix[i].length; j++) {    flattenedMatrix.push(matrix[i][j]);  }}console.log(flattenedMatrix);`,
    options: [
      "[[1], [2], [3], [4], [5], [6], [7], [8], [9]]",
      "[1, 4, 7, 2, 5, 8, 3, 6, 9]",
      "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      "[1, 2, 3, 4, 5, 6, 7, 8, 9]"
],
    correctAnswer: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 846).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,3,4,5,6,7,8,9]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-849",
    title: "JS Challenge #849",
    difficulty: "medium",
    category: "basics",
    code: `const data = [1, 2, 3, 4, 5];const result = data.flatMap(num => [num * 2, num * 3]);console.log(result);`,
    options: [
      "[2, 4, 6, 8, 10]",
      "[2, 3, 4, 6, 6, 9, 8, 12, 10, 15]",
      "[2, 3, 4, 6, 6, 9]",
      "[1, 2, 3, 4, 5]"
],
    correctAnswer: "[2, 3, 4, 6, 6, 9, 8, 12, 10, 15]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 849).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[2,3,4,6,6,9,8,12,10,15]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-852",
    title: "JS Challenge #852",
    difficulty: "medium",
    category: "basics",
    code: `const words = ['apple', 'banana', 'cherry'];const result = words.flatMap(word => word.split('').reverse());console.log(result);`,
    options: [
      "['e', 'l', 'p', 'a', 'n', 'a', 'b', 'h', 'c']",
      "['e', 'l', 'p', 'a', 'n', 'a', 'b', 'h', 'c']",
      "['elppa', 'ananab', 'yrrehc']",
      "['e', 'l', 'p', 'p', 'a', 'e', 'n', 'a', 'n', 'a', 'b', 'h', 'c', 'e', 'r', 'r', 'y']"
],
    correctAnswer: "['e', 'l', 'p', 'a', 'n', 'a', 'b', 'h', 'c']",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 852).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["e","l","p","p","a","a","n","a","n","a","b","y","r","r","e","h","c"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-855",
    title: "JS Challenge #855",
    difficulty: "medium",
    category: "basics",
    code: `const items = [1, 2, 3, 4, 5];const result = items.reduce((acc, val) => acc.concat(Array.from({ length: val }, () => val)), []);console.log(result);`,
    options: [
      "[1, 1, 2, 2, 3, 3, 4, 4, 5, 5]",
      "[1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]",
      "[1, 2, 3, 4, 5]",
      "[1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]"
],
    correctAnswer: "[1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 855).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[1,2,2,3,3,3,4,4,4,4,5,5,5,5,5]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-858",
    title: "JS Challenge #858",
    difficulty: "medium",
    category: "basics",
    code: `const words = ['apple', 'banana', 'cherry'];const result = words.map(word => word.split('').sort().join(''));console.log(result);`,
    options: [
      "['a', 'b', 'c']",
      "['elppa', 'banana', 'cherry']",
      "['elppa', 'ananab', 'yrrehc']",
      "[\"aelpp\", \"aaabnn\", \"cehrry\"]"
],
    correctAnswer: "[\"aelpp\", \"aaabnn\", \"cehrry\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 858).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["aelpp","aaabnn","cehrry"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-861",
    title: "JS Challenge #861",
    difficulty: "medium",
    category: "basics",
    code: `const data = [  { id: 1, name: 'Alice', age: 25, gender: 'Female' },  { id: 2, name: 'Bob', age: 30, gender: 'Male' },  { id: 3, name: 'Charlie', age: 22, gender: 'Male' },  { id: 4, name: 'David', age: 35, gender: 'Male' },];const result = data  .filter(person => person.gender === 'Male')  .map(person => ({ ...person, isSenior: person.age > 30 }))  .sort((a, b) => a.age - b.age)  .slice(0, 2)  .reduce((acc, person) => {    acc[person.name] = person.isSenior;    return acc;  }, {});console.log(result);`,
    options: [
      "{ Charlie: false, David: true }",
      "{   Bob: false,   Charlie: false }",
      "{ David: true, Bob: false }",
      "{ Bob: false, David: true }"
],
    correctAnswer: "{ Charlie: false, David: true }",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 861).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`{"Charlie":false,"Bob":false}\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-825",
    title: "JS Challenge #825",
    difficulty: "medium",
    category: "basics",
    code: `let arr = [1, 2, 3, 4, 5];let slicedArray = arr.slice(1, 4);let splicedArray = arr.splice(2, 2);console.log(slicedArray.length + splicedArray.length);`,
    options: [
      "4",
      "3",
      "2",
      "5"
],
    correctAnswer: "5",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 825).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`5\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-828",
    title: "JS Challenge #828",
    difficulty: "medium",
    category: "basics",
    code: `console.log(1 + '2' + '2');`,
    options: [
      "122",
      "14",
      "32",
      "5"
],
    correctAnswer: "122",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 828).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`122\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-831",
    title: "JS Challenge #831",
    difficulty: "medium",
    category: "basics",
    code: `let x = 10;let y = 5;x += y -= x *= y;console.log(x);`,
    options: [
      "10",
      "25",
      "-35",
      "-15"
],
    correctAnswer: "-35",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 831).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`-35\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-834",
    title: "JS Challenge #834",
    difficulty: "medium",
    category: "basics",
    code: `function multiply(a, b) {  if (b === 0) {    return 0;  } else if (b > 0) {    return a + multiply(a, b - 1);  } else {    return -multiply(a, -b);  }}console.log(multiply(7, 5));`,
    options: [
      "Error: maximum call stack size exceeded",
      "35",
      "-35",
      "12"
],
    correctAnswer: "35",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 834).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`35\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-837",
    title: "JS Challenge #837",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let [prev, curr] = [0, 1];  while (true) {    [prev, curr] = [curr, prev + curr];    yield curr;  }}const fib = fibonacci();console.log(fib.next().value);console.log(fib.next().value);console.log(fib.next().value);`,
    options: [
      "1, 2, 3",
      "1, 1, 2",
      "3, 5, 8",
      "2, 3, 5"
],
    correctAnswer: "1, 2, 3",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 837).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-840",
    title: "JS Challenge #840",
    difficulty: "medium",
    category: "basics",
    code: `const asyncFunction = async () => {  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));  const result = await Promise.race([delay(100), delay(500)]);  return result;};asyncFunction().then(value => console.log(value));`,
    options: [
      "100",
      "500",
      "Error",
      "undefined"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 840).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-803",
    title: "JS Challenge #803",
    difficulty: "medium",
    category: "basics",
    code: `function asyncFunction(value) {  return new Promise(resolve => {    setTimeout(() => {      console.log(value);      resolve(value);    }, 1000);  });}(async () => {  const results = await Promise.all([asyncFunction(1), asyncFunction(2), asyncFunction(3)]);  console.log(results);})();`,
    options: [
      "1, 2, 3, [1, 2, 3]",
      "[1, 2, 3], 1, 2, 3",
      "1, 1, 1, [1, 2, 3]",
      "1, 2, 3, [3, 3, 3]"
],
    correctAnswer: "1, 2, 3, [1, 2, 3]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 803).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3
[1,2,3]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-806",
    title: "JS Challenge #806",
    difficulty: "medium",
    category: "basics",
    code: `for (var i = 0; i < 3; i++) {  const log = () => {    console.log(i)  }  setTimeout(log, 100)}`,
    options: [
      "Error",
      "1, 2, 3",
      "3, 2, 1",
      "3, 3, 3"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 806).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Unexpected identifier 'setTimeout'\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-809",
    title: "JS Challenge #809",
    difficulty: "medium",
    category: "basics",
    code: `var a = 1function output () {    console.log(a)    var a = 2    console.log(a)}console.log(a)output()console.log(a)`,
    options: [
      "2, 1",
      "2, 2",
      "1, 1",
      "1, 2"
],
    correctAnswer: "TypeError",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 809).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Error: Invalid or unexpected token\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-812",
    title: "JS Challenge #812",
    difficulty: "medium",
    category: "basics",
    code: `const asyncFunction = async () => {  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));  const result = await Promise.race([delay(100), delay(500)]);  return result;};asyncFunction().then(value => console.log(value));`,
    options: [
      "500",
      "100",
      "undefined",
      "Error"
],
    correctAnswer: "undefined",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 812).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`undefined\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-815",
    title: "JS Challenge #815",
    difficulty: "medium",
    category: "basics",
    code: `function* fibonacci() {  let [prev, curr] = [0, 1];  while (true) {    [prev, curr] = [curr, prev + curr];    yield curr;  }}const fib = fibonacci();console.log(fib.next().value);console.log(fib.next().value);console.log(fib.next().value);`,
    options: [
      "1, 1, 2",
      "2, 3, 5",
      "1, 2, 3",
      "0, 1, 1"
],
    correctAnswer: "1, 1, 2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 815).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1
2
3\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-818",
    title: "JS Challenge #818",
    difficulty: "medium",
    category: "basics",
    code: `function deepFreeze(obj) {  Object.freeze(obj);  Object.getOwnPropertyNames(obj).forEach(prop => {    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {      deepFreeze(obj[prop]);    }  });  return obj;}const data = { a: { b: { c: 1 } } };const frozenData = deepFreeze(data);frozenData.a.b.c = 2;console.log(frozenData.a.b.c);`,
    options: [
      "1",
      "2",
      "undefined",
      "Error"
],
    correctAnswer: "1",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 818).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`1\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-821",
    title: "JS Challenge #821",
    difficulty: "medium",
    category: "basics",
    code: `const obj = {};const sym1 = Symbol('a');const sym2 = Symbol('b');obj[sym1] = 1;obj[sym2] = 2;console.log(Object.keys(obj));`,
    options: [
      "[Symbol('a'), Symbol('b')]",
      "['b', 'a']",
      "['a', 'b']",
      "[]"
],
    correctAnswer: "[]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 821).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`[]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-792",
    title: "JS Challenge #792",
    difficulty: "medium",
    category: "basics",
    code: `let a = 1;{  let a = 2;}a+=1;console.log(a);`,
    options: [
      "Error",
      "3",
      "1",
      "2"
],
    correctAnswer: "2",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 792).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`2\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-796",
    title: "What is the output",
    difficulty: "medium",
    category: "basics",
    code: `const asyncFunction = async () => {  try {    await Promise.reject("Oops!");  } catch (error) {    return "Caught: " + error;  } finally {    return "Finally block executed";  }};asyncFunction().then(result => console.log(result));`,
    options: [
      "Error",
      "[object Promise]",
      "\"Finally block executed\"",
      "\"Caught: Oops!\""
],
    correctAnswer: "\"Finally block executed\"",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 796).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`Finally block executed\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  },
  {
    id: "tg-799",
    title: "JS Challenge #799",
    difficulty: "medium",
    category: "basics",
    code: `const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\$/;const emails = ["user@example.com", "john.doe@gmail.", "invalid-email", "info@company.org"];const validEmails = emails.filter(email => emailPattern.test(email));console.log(validEmails);`,
    options: [
      "[]",
      "[\"user@example.com\", \"john.doe@gmail.\", \"invalid-email\", \"info@company.org\"]",
      "[\"user@example.com\", \"john.doe@gmail.\"]",
      "[\"user@example.com\", \"info@company.org\"]"
],
    correctAnswer: "[\"user@example.com\", \"info@company.org\"]",
    explanation: `**Qadam-baqadam tahlil:**
1. Ushbu savol @javascript telegram kanalidan olindi (Post ID: 799).
2. Kod bajarilganda konsolga quyidagicha natija chiqadi: \`["user@example.com","info@company.org"]\`.
3. Variantlar ichidan to'g'ri javobni tanlang.`
  }
];
