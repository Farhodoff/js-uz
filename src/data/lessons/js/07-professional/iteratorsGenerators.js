export const iteratorsGenerators = {
  id: "iteratorsGenerators",
  title: "Iterators va Generators",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Iterators va Generators nima?
* **Iterators (Iteratorlar)** — bu har qanday murakkab to'plam (massiv, obyekt yoki maxsus struktura) elementlarini tartib bilan, birma-bir o'qish (aylanib chiqish) mexanizmi. Ular o'zlarida joriy holatni saqlaydi va har safar chaqirilganda keyingi elementni taqdim etadi.
* **Iterables (Iterable obyektlar)** — \`[Symbol.iterator]\` metodiga ega bo'lgan va \`for...of\` siklida aylanib chiqish mumkin bo'lgan obyektlar (masalan: \`Array\`, \`Map\`, \`Set\`, \`String\`).
* **Generators (Generatorlar)** — bu o'z ishini ma'lum vaqtga to'xtatib (suspend), keyinroq yana qolgan joyidan davom ettira oladigan maxsus funksiyalardir. Oddiy funksiyalar chaqirilganda oxirigacha ishlab to'xtaydi, generatorlar esa har safar qiymat berganida to'xtab turadi va tashqi buyruqni kutadi.

### Real hayotiy o'xshatish
* **Iterator:** Bu xuddi **kitob varaqlash** kabi. Sizda qalin kitob bor (iterable). Uni bitta-bitta o'qish uchun varoqlaysiz (\`next()\`). Har safar varoqlaganingizda keyingi sahifa matnini ko'rasiz (\`value\`). Sahifalar tugagach, kitob yopiladi (\`done: true\`).
* **Generator:** Bu xuddi **navbat bilan mahsulot beradigan avtomat**ga o'xshaydi. Siz tangani tashlab tugmani bosasiz (\`next()\`), u bitta mahsulot ishlab chiqarib chiqarib beradi (\`yield\`) va to'xtaydi. Keyingi mijoz kelib yana tugmani bosmaguncha u o'z holatida jim turaveradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Custom Iterator)
Oddiy obyektni iterable qilib, uni \`for...of\` sikli yordamida aylanish:
\`\`\`javascript
const myRange = {
  from: 1,
  to: 3,
  
  // Obyektni iterable qilish
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    
    // Iterator obyektini qaytarish (next metodiga ega bo'lgan)
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const num of myRange) {
  console.log(num); // 1, 2, 3
}
\`\`\`

### 2. Intermediate Example (Sodda Generator va yield)
\`yield\` yordamida qiymatlarni ketma-ketlikda qaytarish:
\`\`\`javascript
function* simpleGenerator() {
  console.log('Boshlanish');
  yield 'Birinchi qiymat';
  
  console.log('Davomi');
  yield 'Ikkinchi qiymat';
  
  return 'Tugadi';
}

const gen = simpleGenerator();

console.log(gen.next()); // { value: 'Birinchi qiymat', done: false }
console.log(gen.next()); // { value: 'Ikkinchi qiymat', done: false }
console.log(gen.next()); // { value: 'Tugadi', done: true }
\`\`\`

### 3. Advanced Example (Ikki tomonlama muloqot va yield* delegatsiyasi)
Generator ichiga qiymat uzatish va \`yield*\` yordamida boshqa generatorni chaqirish:
\`\`\`javascript
function* sequenceGenerator() {
  yield* [1, 2]; // yield* massivni birma-bir yield qiladi
}

function* interactiveGenerator() {
  yield* sequenceGenerator();
  
  // Tashqaridan yuborilgan qiymatni qabul qilish
  const result = yield "Savol: Sizga qaysi dasturlash tili yoqadi?";
  yield \`Siz tanlagan til: \${result}\`;
}

const iterator = interactiveGenerator();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // "Savol: Sizga qaysi dasturlash tili yoqadi?"
console.log(iterator.next('JavaScript').value); // "Siz tanlagan til: JavaScript"
\`\`\`

### 4. Production Example (Asinxron Generator va for await...of)
Katta hajmdagi ma'lumotlarni dynamic (paginated) ravishda API'dan yuklab olish:
\`\`\`javascript
async function* fetchUsersStream(limit) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(\`https://api.example.com/users?page=\${page}&limit=\${limit}\`);
    const data = await response.json();

    if (data.users.length === 0) {
      hasMore = false;
    } else {
      yield data.users; // Har safar bitta sahifa ma'lumotlarini yield qiladi
      page++;
    }
  }
}

// Foydalanish:
async function processUsers() {
  const usersStream = fetchUsersStream(20);
  
  for await (const usersBatch of usersStream) {
    console.log(\`Yuklangan foydalanuvchilar soni: \${usersBatch.length}\`);
    // DOM-ga yozish yoki render qilish
  }
}
\`\`\`

### 5. Enterprise Example (Generator Lifecycle va cancelable asinxron operatsiyalar)
Xatoliklarni boshqarish va generatorda zudlik bilan ishni to'xtatish:
\`\`\`javascript
function* jobRunner() {
  try {
    yield 'Bosqich 1';
    yield 'Bosqich 2';
  } catch (error) {
    console.warn('Xato generator ichida ushlandi:', error.message);
    yield 'Qutqarish bosqichi';
  } finally {
    console.log('Generator har qanday holatda yopildi (clean up)');
  }
}

const runner = jobRunner();
console.log(runner.next().value); // "Bosqich 1"

// 1. throw() yordamida generatorga xato yuborish
console.log(runner.throw(new Error('Kutilmagan muammo')).value); // "Qutqarish bosqichi"

// 2. return() yordamida generatorni majburiy tugatish
console.log(runner.return('Tamom')); // { value: 'Tamom', done: true }
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Xotira tejash (Memory Optimization):** Tasavvur qiling, sizda **1 000 000 ta** sonli ro'yxat bor. Agar uni oddiy massivda yaratsangiz, u xotiradan megabaytlab joy oladi. Generator yordamida esa faqat chaqirilgandagina bitta element yaratiladi (Lazy Evaluation). Xotira sarfi minimal darajada qoladi.
* **Boshqariladigan asinxronlik:** Asinxron kodlar oqimini (masalan, API pagination, websocket stream) asinxron generatorlar yordamida oddiy, tushunarli \`for await...of\` siklida yozish imkoniyati paydo bo'ldi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Generator funksiyani \`new\` kalit so'zi bilan chaqirish
#### Xato:
\`\`\`javascript
function* myGen() {}
const obj = new myGen(); // TypeError
\`\`\`
#### Nima uchun noto'g'ri:
Generator funksiyalari konstruktor emas, ular orqali obyekt yaratib bo'lmaydi.
#### To'g'ri usul:
\`\`\`javascript
const obj = myGen();
\`\`\`

### 2. Generator obyektini qayta-qayta ishlatishga urinish
#### Xato:
\`\`\`javascript
const gen = rangeGenerator(1, 3);
const firstRun = [...gen]; // [1, 2, 3]
const secondRun = [...gen]; // [] (bo'sh, chunki u tugallangan)
\`\`\`
#### Nima uchun noto'g'ri:
Generator barcha \`yield\`larni bajarib bo'lgach (\`done: true\`), u o'z holatini qayta tiklay olmaydi.
#### To'g'ri usul:
Har safar aylanib chiqish kerak bo'lganda yangi generator instansiyasini chaqirish kerak.

### 3. Generator return qiymatini \`for...of\` sikli ichida kutish
#### Xato:
\`\`\`javascript
function* test() {
  yield 1;
  return 2;
}
for (const v of test()) {
  console.log(v); // Faqat 1 chiqadi, 2 emas!
}
\`\`\`
#### Nima uchun noto'g'ri:
\`for...of\` sikli iteratorning \`done: true\` bo'lgan holatidagi \`value\` qiymatini tashlab yuboradi.
#### To'g'ri usul:
Barcha kerakli qiymatlarni faqat \`yield\` qilish lozim, \`return\`ni esa yakuniy signal sifatida ishlatish kerak.

### 4. \`yield\`ni oddiy funksiyalar ichida ishlatish
#### Xato:
\`\`\`javascript
function* main() {
  [1, 2, 3].forEach(item => {
    yield item; // SyntaxError: yield to'g'ridan-to'g'ri generator ichida yozilishi shart
  });
}
\`\`\`
#### To'g'ri usul:
\`yield*\` dan foydalanish yoki klassik \`for...of\` loopidan foydalanish.

### 5. \`Symbol.iterator\` metodini noto'g'ri qaytarish
#### Xato:
Metoddan iterator obyekti (next metodiga ega) o'rniga oddiy qiymat yoki funksiya qaytarish.
#### To'g'ri usul:
\`[Symbol.iterator]() { return { next() { return { value, done } } } }\` formatiga rioya qilish.

### 6. Dynamic parameters yuborishda birinchi \`next()\`ga qiymat berish
#### Xato:
\`gen.next('myValue')\` ni birinchi qadamdayoq chaqirish va generator uni qabul qilishini kutish.
#### Nima uchun:
Birinchi \`next()\` chaqiruvi faqat generatorni ishga tushiradi (birinchi \`yield\`ga qadar boradi), u hech qanday argument qabul qilmaydi.

### 7. Asinxron generatorni oddiy \`for...of\` bilan aylanish
#### Xato:
\`async function*\` generatorini oddiy \`for...of\` bilan o'qimoqchi bo'lish, bu xatolikka olib keladi.
#### To'g'ri usul:
\`for await (const x of asyncGenerator())\` ko'rinishida yozish.

### 8. \`yield*\` o'rniga oddiy \`yield\` ishlatib iterable-ni uzatib yuborish
#### Xato:
\`yield [1, 2]\` deb yozish, bunda butun massiv bitta element bo'lib chiqadi.
#### To'g'ri usul:
Massiv ichidagi elementlarni birma-bir o'qish uchun \`yield* [1, 2]\` yozish kerak.

### 9. Iterator ichida \`done\` xossasini unutish
#### Xato:
\`next()\` metodidan faqat \`{ value }\` qaytarish, bu cheksiz sikl yaratadi.

### 10. \`performance.memory\` dan foydalanib xotirani tekshirmaslik
#### Muammo:
Generatorlar yordamida xotirani tejashni tekshirishni bilmaslik.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Iterator nima va u iterable obyektlardan nimasi bilan farq qiladi?
   * **Javob:** Iterable - bu \`[Symbol.iterator]\` metodiga ega bo'lgan va iterator qaytara oladigan har qanday obyekt. Iterator esa \`next()\` metodiga ega bo'lib, \`{ value, done }\` formatida ma'lumot beruvchi obyektdir.

2. **Savol:** Generator funksiya oddiy funksiyadan qanday farq qiladi?
   * **Javob:** Oddiy funksiya oxirigacha ishlaydi va bitta qiymat qaytaradi. Generator esa \`yield\` yordamida bir nechta qiymatni to'xtab-to'xtab qaytara oladi va o'z holatini saqlab qoladi.

3. **Savol:** Generatorni yaratish uchun qaysi belgi qo'yiladi va qaysi kalit so'z ishlatiladi?
   * **Javob:** Funksiya nomidan avval yulduzcha (\`*\`) qo'yiladi: \`function* myGen()\`. Qiymat qaytarish uchun \`yield\` ishlatiladi.

4. **Savol:** \`next()\` metodi qanday obyekti qaytaradi?
   * **Javob:** \`{ value: joriy_qiymat, done: boolean }\` formatidagi obyektni.

### Middle (5–8)
5. **Savol:** \`yield*\` operatori nima vazifani bajaradi?
   * **Javob:** U boshqa generator yoki har qanday iterable (massiv, string) ustidan iteratsiyani delegatsiya qilish (o'tkazish) uchun ishlatiladi.

6. **Savol:** Generator ichidagi \`return\` operatori \`for...of\` siklida qanday ta'sir qiladi?
   * **Javob:** \`return\` generatorni \`done: true\` holatiga o'tkazadi va undagi qiymatni qaytaradi. Biroq \`for...of\` sikli \`done: true\` bo'lgandagi qiymatni e'tiborsiz qoldiradi, shuning uchun u ekranga chiqmaydi.

7. **Savol:** Generatorga tashqaridan qiymatni qanday yuboramiz?
   * **Javob:** \`generator.next(value)\` chaqiruvi orqali. Yuborilgan qiymat generator ichidagi joriy \`yield\` ifodasining o'zlashtirgan qiymatiga aylanadi.

8. **Savol:** \`generator.return(val)\` va \`generator.throw(err)\` nima qiladi?
   * **Javob:** \`return(val)\` generatorni darhol majburiy tugatadi. \`throw(err)\` esa generator ichiga istisno (error) otadi va generator ichida \`try...catch\` bo'lsa uni ushlash mumkin.

### Senior (9–12)
9. **Savol:** Asinxron generatorlar nima va ularni dynamic oqimlarda (streams) qanday qo'llaysiz?
   * **Javob:** \`async function*\` yordamida yoziladigan, \`yield\` bilan birga \`await\` qilish imkonini beruvchi generator. U har bir qadamda Promise qaytaradi. Bu sahifalangan API so'rovlarini yoki fayl chunklarini oqimli yuklashda juda foydali.

10. **Savol:** Generatorlar orqali "Lazy Evaluation" (sust baholash) qanday amalga oshiriladi va xotira (Heap) tejash printsipi qanday?
    * **Javob:** Qiymatlar dastur boshida hammasi xotiraga yuklanmaydi. Faqat keyingi qiymat so'ralgandagina (\`next()\`) generator o'sha elementni hisoblab beradi. Bu gigabaytlab ma'lumotlar ustida ishlaganda minimal RAM sarfini ta'minlaydi.

11. **Savol:** Generatorlar yordamida Redux-Saga kabi asinxron boshqaruv tizimlari qanday yaratiladi?
    * **Javob:** Generatorlar asinxron effekti (Promise)-ni \`yield\` qiladi. Markaziy boshqaruvchi (middleware) u Promise-ni olib bajaradi (resolve qiladi) va natijani \`generator.next(result)\` orqali generatorga qaytarib beradi. Bu asinxron kodni sinxron ko'rinishda yozish imkonini beradi.

12. **Savol:** Agar iterable obyekt aylanib chiqilayotganda \`break\` yoki \`throw\` bo'lsa, iteratorni tozalash qanday amalga oshiriladi?
    * **Javob:** Agar iterator obyektda \`return()\` metodi aniqlangan bo'lsa, \`for...of\` sikli muddatidan oldin tugatilganda (break, return yoki error bo'lganda) brauzer avtomatik ravishda iteratorning \`return()\` metodini chaqiradi va xotirani tozalash imkonini beradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Infinite Scroll va Paginated API Streamer
Ushbu tizim foydalanuvchi sahifani pastga skroll qilganda yangi ma'lumotlarni dynamic yuklab oladi. Bizga har safar dynamic ma'lumot yuklab beruvchi asinxron generator kerak.

\`\`\`javascript
async function* paginatedUserLoader(url, limit) {
  let page = 1;
  while (true) {
    const res = await fetch(\`\${url}?page=\${page}&limit=\${limit}\`);
    const data = await res.json();
    if (data.length === 0) break; // Barcha ma'lumotlar yuklab bo'lindi
    yield data;
    page++;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Lazy evaluation unumdorligi:** Katta massivlarni dynamic filterlashda generator ishlash tezligi oddiy massiv metodlariga nisbatan xotira jihatidan 99% kamroq RAM talab qiladi, chunki oraliq massivlar (intermediate arrays) yaratilmaydi.

---

## 10. 📌 Cheat Sheet

| Metod / Kalit | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **function\\*** | \`function* name() {}\` | Generator yaratish | Oddiy funksiyadan farq qiladi |
| **yield** | \`yield value;\` | Kodni to'xtatib qiymat berish | Faqat generator ichida |
| **yield\\*** | \`yield* iterable;\` | Boshqa iterablega o'tkazish | Massiv yoki generatorlar uchun |
| **next(val)** | \`gen.next(val)\` | Generatorni davom ettirish | Qiymat yieldga qaytadi |
| **return(val)**| \`gen.return(val)\` | Generatorni yopish | \`done: true\` qiladi |
| **throw(err)** | \`gen.throw(err)\` | Xatolik yuborish | try...catchda ushlanadi |
| **Symbol.iterator**| \`[Symbol.iterator]()\` | Obyektni iterable qilish | \`for...of\` tomonidan chaqiriladi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Custom Range Iterable Obyekt",
    "instruction": "Berilgan `start` dan `end` gacha bo'lgan sonlarni `for...of` siklida aylanish imkonini beruvchi `[Symbol.iterator]` metodini yozing va iterable obyektni qaytaring.",
    "startingCode": "function createRange(start, end) {\n  return {\n    [Symbol.iterator]() {\n      let current = start;\n      return {\n        next() {\n          // Kodni yozing\n        }\n      };\n    }\n  };\n}",
    "hint": "return current <= end ? { value: current++, done: false } : { value: undefined, done: true };",
    "test": "try { const range = createRange(2, 5); const vals = [...range]; if (vals.join(',') !== '2,3,4,5') return 'Sikl natijasi noto\\'g\\'ri: ' + vals.join(','); } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Juft Sonlar Generatori",
    "instruction": "Berilgan `limit` sonigacha bo'lgan barcha juft sonlarni ketma-ketlikda yield qiluvchi `evenNumbers(limit)` generator funksiyasini yozing.",
    "startingCode": "function* evenNumbers(limit) {\n  // Kodni yozing\n}",
    "hint": "for (let i = 2; i <= limit; i += 2) { yield i; }",
    "test": "try { const vals = [...evenNumbers(7)]; if (vals.join(',') !== '2,4,6') return 'Faqat juft sonlar limitgacha qaytarilishi kerak. Natija: ' + vals.join(','); } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Ikki Tomonlama Aloqa (ChatBot)",
    "instruction": "Birinchi yield-da 'Ismingiz nima?' savolini chiqaradigan, keyin tashqaridan kelgan ism qiymatini qabul qilib 'Salom, [ism]!' matnini yield qiladigan va yakunlanadigan `chatBot()` generator funksiyasini yozing.",
    "startingCode": "function* chatBot() {\n  // Kodni yozing\n}",
    "hint": "const name = yield 'Ismingiz nima?'; yield `Salom, ${name}!`;",
    "test": "try { const bot = chatBot(); const step1 = bot.next(); if (step1.value !== 'Ismingiz nima?') return 'Birinchi yield \"Ismingiz nima?\" bo\\'lishi kerak'; const step2 = bot.next('Ali'); if (step2.value !== 'Salom, Ali!') return 'Ikkinchi yield \"Salom, Ali!\" bo\\'lishi kerak'; const step3 = bot.next(); if (!step3.done) return 'Generator oxirida tugashi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Iterator va Iterable obyekt o'rtasidagi farq nima?",
    "options": [
      "Iterable obyekt elementlarni birma-bir o'qish uchun `[Symbol.iterator]` metodiga ega, Iterator esa `next()` metodiga ega bo'lib, o'sha o'qish jarayonini boshqaradi",
      "Iterator faqat massivlar bilan, Iterable esa faqat obyektlar bilan ishlaydi",
      "Iterable faqat sinxron kodlarda, Iterator esa asinxron kodlarda qo'llaniladi",
      "Ular mutlaqo bir xil narsa"
    ],
    "correctAnswer": 0,
    "explanation": "Iterable - bu `[Symbol.iterator]` metodi orqali o'zidan iterator qaytaruvchi obyekt. Iterator esa `next()` metodi orqali `{ value, done }` ko'rinishida keyingi elementlarni chiqaruvchi obyektdir."
  },
  {
    "id": 2,
    "question": "Obyektni `for...of` siklida aylanuvchan (iterable) qilish uchun qaysi maxsus Symbol kaliti aniqlangan bo'lishi lozim?",
    "options": [
      "Symbol.iterable",
      "Symbol.iterator",
      "Symbol.for('iterator')",
      "Symbol.generator"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektda `[Symbol.iterator]` metodining aniqlangan bo'lishi brauzerga ushbu obyektni `for...of` yoki spread (`...`) operatorlari yordamida aylanish imkonini beradi."
  },
  {
    "id": 3,
    "question": "Generator funksiyasini e'lon qilish uchun qaysi sintaksis ishlatiladi?",
    "options": [
      "function$ name() {}",
      "function* name() {}",
      "function# name() {}",
      "async function name() {}"
    ],
    "correctAnswer": 1,
    "explanation": "Generator funksiyalari `function` kalit so'zidan so'ng yulduzcha (`*`) qo'yish orqali e'lon qilinadi."
  },
  {
    "id": 4,
    "question": "Iteratorning `next()` metodi qanday formatdagi obyektni qaytaradi?",
    "options": [
      "[value, done] massivini",
      "{ value, done } obyektini",
      "Faqat o'sha qadamdagi qiymatni",
      "Dasturlash xatoligini (TypeError)"
    ],
    "correctAnswer": 1,
    "explanation": "Iterator protokoli bo'yicha har bir qadamda `{ value: istalgan_tur, done: boolean }` obyekt qaytishi shart."
  },
  {
    "id": 5,
    "question": "Generator funksiyasi to'liq bajarilib bo'lingach (done: true bo'lgach), keyingi `next()` chaqiruvlari nima qaytaradi?",
    "options": [
      "TypeError xatoligini otadi",
      "{ value: undefined, done: true }",
      "0-bosqichdan qaytadan boshlaydi",
      "Null qiymatini qaytaradi"
    ],
    "correctAnswer": 1,
    "explanation": "Tugallangan generator hech qachon avtomatik ravishda boshidan boshlanmaydi va har doim done: true va value: undefined qaytaradi."
  },
  {
    "id": 6,
    "question": "Generator ichida boshqa generator yoki iterable (massiv) qiymatlarini navbatma-navbat yield qilish uchun qaysi operator ishlatiladi?",
    "options": [
      "yield",
      "yield*",
      "yield delegation",
      "await yield"
    ],
    "correctAnswer": 1,
    "explanation": "yield* operatori iteratsiyani boshqa iterable obyektga delegatsiya qiladi, ya'ni uning elementlarini birma-bir o'qib yield qiladi."
  },
  {
    "id": 7,
    "question": "Generator ichidagi dynamic yield ifodasiga tashqaridan qiymat yuborish uchun nima qilinadi?",
    "options": [
      "generator.send(value) chaqiriladi",
      "generator.next(value) chaqiriladi",
      "O'zgaruvchini global scope-da e'lon qilinadi",
      "Hech qanday qiymat yuborib bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "next(value) chaqirilganda yuborilgan parametr generator ichidagi o'sha to'xtab turgan yield ifodasining qiymati sifatida qaytadi."
  },
  {
    "id": 8,
    "question": "Generatorni zudlik bilan to'liq tugatish (done: true qilish) uchun qaysi metod chaqiriladi?",
    "options": [
      "generator.stop()",
      "generator.return(value)",
      "generator.throw(error)",
      "generator.close()"
    ],
    "correctAnswer": 1,
    "explanation": "generator.return(value) metodi generatorning ishini o'sha zohoti to'xtatadi, done: true holatiga o'tkazadi va berilgan qiymatni qaytaradi."
  },
  {
    "id": 9,
    "question": "Asinxron generator (`async function*`) elementlarini aylanib chiqish uchun qaysi sikl operatori ishlatiladi?",
    "options": [
      "for...in",
      "for await...of",
      "while(true)",
      "Array.prototype.forEach()"
    ],
    "correctAnswer": 1,
    "explanation": "Asinxron generatorlar har bir qadamda Promise qaytargani sababli ularni o'qish uchun asinxron `for await...of` siklidan foydalaniladi."
  },
  {
    "id": 10,
    "question": "Lazy Evaluation (sust baholash) orqali generatorlar qanday muammoni hal qiladi?",
    "options": [
      "Kod hajmini siqish",
      "Barcha elementlarni xotirada birdan saqlamay, faqat kerak bo'lgandagina dynamic hisoblab RAM-ni tejash",
      "Asinxron funksiyalar tezligini oshirish",
      "Foydalanuvchi interfeysini qotmasligini ta'minlash"
    ],
    "correctAnswer": 1,
    "explanation": "Generatorlar o'z-o'zidan barcha qiymatlarni hisoblab xotirani band qilmaydi (Eager Evaluation emas). Faqat `next()` chaqirilgandagina o'sha kadr qiymatini hisoblab beradi, bu esa RAM tejaydi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nfunction* myGen() {\n  yield 1;\n  return 100;\n}\nfor (let val of myGen()) {\n  console.log(val);\n}\n```",
    "options": [
      "1 va keyin 100",
      "Faqat 1",
      "Faqat 100",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "`for...of` sikli iteratorda `done: true` bo'lgan qiymatni tashlab yuboradi. Shuning uchun `return 100` dagi 100 qiymati sikl ichiga kirmaydi, faqat `yield 1` dagi 1 chiqadi."
  },
  {
    "id": 12,
    "question": "Generator ichida yield paytida kutilmagan xatolik yuz berganini simulyatsiya qilish uchun tashqaridan qaysi metod chaqiriladi?",
    "options": [
      "generator.throw(error)",
      "generator.next(error)",
      "generator.catch(error)",
      "window.onerror()"
    ],
    "correctAnswer": 0,
    "explanation": "generator.throw(error) generator ichiga xatolik yuboradi, bu xatoni generator ichidagi `try...catch` bloki orqali ushlab, dasturning barqarorligini ta'minlash mumkin."
  }
]

};
