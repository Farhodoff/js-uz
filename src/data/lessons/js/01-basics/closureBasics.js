export const closureBasics = {
  id: "closureBasics",
  title: "Closure (Yopilish / Eslab Qolish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz uydan ko'chaga chiqayotib, sevimli ryukzagingizni yelkangizga taqib oldingiz. Uyning eshigi qulflanib, siz undan uzoqlashgan bo'lsangiz ham, ryukzak ichidagi narsalaringiz doimo yoningizda qoladi va ulardan istalgan payt foydalanishingiz mumkin.
JavaScript da funksiyalar ham xuddi shunday "ryukzak"ka ega: ichki funksiya tashqi funksiyaning o'zgaruvchilarini o'zi bilan olib ketadi va tashqi funksiya tugaganidan keyin ham ularni eslab qoladi.

**Closure (yopilish / eslab qolish)** — ichki funksiyaning o'zidan tashqaridagi funksiyada yaratilgan o'zgaruvchilarni, hatto tashqi funksiya o'z ishini to'liq yakunlagan bo'lsa ham, eslab qolishi va ulardan foydalana olish xususiyatidir.

*Yangi terminlar:*
- **Closure (yopilish)** — ichki funksiya va u eslab qolgan tashqi muhit o'zgaruvchilari birikmasi.
- **Ichki funksiya (inner function)** — boshqa bir funksiya tanasi ichida yaratilgan funksiya.

---

## 2. Nega kerak?

Oldingi darsda ko'rganimizdek, odatda funksiya ishlab bo'lgach, uning ichidagi barcha lokal o'zgaruvchilar o'chib ketadi:

\`\`\`javascript
// Muammo: Oddiy lokal o'zgaruvchi xotirada saqlanib qolmaydi
function countUp() {
  let count = 0;
  count += 1;
  return count;
}
console.log(countUp()); // 1
console.log(countUp()); // yana 1!
\`\`\`

Agar biz o'zgaruvchini global qilsak, butun dastur uni bexosdan buzib qo'yishi mumkin. Closure esa ma'lumotni tashqi muhitdan xavfsiz yashirgan (privat) holda saqlash va faqat maxsus ichki funksiya orqali uni boshqarish imkonini beradi.

---

## 3. Birinchi misol

Bu kod tashqi funksiya tugagach ham, ichki funksiya tashqi o'zgaruvchini eslab qolishini ko'rsatadi.

\`\`\`javascript
function createGreeting(name) { // tashqi funksiya
  function greet() { // ichki funksiya
    console.log("Salom, " + name); // tashqi name ni eslab qoladi
  }
  return greet; // ichki funksiyaning o'zini qaytaramiz (qavslarsiz)
}

const sayHelloToAli = createGreeting("Ali");
sayHelloToAli(); // tashqi funksiya tugagan, lekin "Ali" eslab qolingan!
\`\`\`

\`\`\`text
// Natija:
Salom, Ali
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function createGreeting(name) {\` — tashqi funksiya \`name\` parametrini qabul qiladi.
- \`function greet() {\` — tashqi funksiya ichida yangi ichki funksiya yaratildi.
- \`console.log("Salom, " + name);\` — ichki funksiya o'zidan tashqaridagi \`name\` o'zgaruvchisiga murojaat qiladi.
- \`return greet;\` — \`createGreeting\` o'z ichidagi \`greet\` funksiyasining o'zini qaytaradi (diqqat qiling: \`greet()\` emas, qavslarsiz \`greet\`!).
- \`const sayHelloToAli = createGreeting("Ali");\` — \`createGreeting\` ishga tushdi va ishi tugadi. U qaytargan ichki funksiya \`sayHelloToAli\` o'zgaruvchisiga saqlandi.
- \`sayHelloToAli();\` — bu funksiya chaqirilganda, u o'zi bilan birga olib chiqqan \`name = "Ali"\` o'zgaruvchisini xotiradan topadi va ekranga chiqaradi.

---

## 5. Qadamma-qadam (trace)

Bajarilish jarayoni jadvali:

| Qadam | Kod | Tashqi funksiya holati | Ichki funksiya closure xotirasi | Natija |
|---|---|---|---|---|
| 1 | \`createGreeting("Ali")\` | Ishga tushdi, \`name = "Ali"\` | \`greet\` funksiyasi yaratildi | \`greet\` funksiyasi qaytarildi |
| 2 | Tashqi funksiya yakunlandi | Ishini tugatdi (yopildi) | \`name = "Ali"\` o'chmadi, closure da qoldi | \`sayHelloToAli\` ga yuklandi |
| 3 | \`sayHelloToAli()\` chaqirildi | Allaqachon yopiq | Closure dan \`name\` olindi | "Salom, Ali" chiqdi |

---

## 6. Yana bitta misol

1-misoldan farqi: O'zgaruvchi shunchaki o'qilmaydi, balki har chaqirilganda yangilanib boradi (shaxsiy hisoblagich — counter).

\`\`\`javascript
function createCounter() {
  let count = 0; // xavfsiz, yashirin o'zgaruvchi
  return function() { // anonim ichki funksiya qaytariladi
    count += 1; // eslab qolingan count ni 1 ga oshiradi
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

Tahlil:
- \`count\` o'zgaruvchisi global emas, uni to'g'ridan-to'g'ri tashqaridan o'zgartirib bo'lmaydi.
- Har safar \`counter()\` chaqirilganda, u o'zining eslab qolingan \`count\` qiymatini 1 ga oshirib boradi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: Ichki funksiyani qaytarishda qavslarni () qo'yib yuborish

\`\`\`javascript
function makeGreeter(name) {
  function greet() {
    return "Salom, " + name;
  }
  return greet(); // XATO: funksiya emas, uning natijasi qaytib qoladi!
}

const greeter = makeGreeter("Ali");
greeter(); // XATO: TypeError: greeter is not a function
\`\`\`

**Nima bo'ladi:** \`makeGreeter\` funksiya o'rniga oddiy matn (\`"Salom, Ali"\`) qaytarib yuboradi. Matnni esa qavslar bilan chaqirib bo'lmaydi, natijada \`TypeError\` xatosi chiqadi.
**To'g'ri varianti:** Har doim qavslarsiz funksiyaning o'zini qaytaring: \`return greet;\`.

### 2-xato: Yangi nusxa olmasdan to'g'ridan-to'g'ri asosiy funksiyani qayta chaqirish

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

console.log(createCounter()()); // 1
console.log(createCounter()()); // yana 1!
\`\`\`

**Nima bo'ladi:** Har safar \`createCounter()\` yangidan chaqirilganda, noldan yangi \`count = 0\` o'zgaruvchisi yaratiladi va u hech qachon 2 ga yetmaydi.
**To'g'ri varianti:** Avval hisoblagichni bitta o'zgaruvchiga saqlang: \`const myCounter = createCounter();\`, keyin \`myCounter()\` deb chaqiring.

### 3-xato: Ichki funksiyada tashqi o'zgaruvchini qayta let bilan yaratish

\`\`\`javascript
function createStep(step) {
  return function() {
    let step = 10; // XATO: tashqi step qiymati to'silib qoldi!
    return step;
  };
}
\`\`\`

**Nima bo'ladi:** Tashqaridan kelgan \`step\` e'tibordan chetda qolib, doimo ichkaridagi \`10\` qiymati ishlaydi.
**To'g'ri varianti:** Ichki funksiyada \`let step\` deb qayta e'lon qilmang, to'g'ridan-to'g'ri mavjud o'zgaruvchidan foydalaning.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`createPrefix(prefix)\` nomli funksiya yozing. U ichki funksiya qaytarsin. Ichki funksiya \`word\` parametrini qabul qilib, \`prefix + word\` ni qaytarsin. \`const addExclamation = createPrefix("!");\` orqali funksiya yaratib, \`addExclamation("Salom")\` natijasini konsolga chiqaring (\`"!Salom"\`).

### 2-mashq (o'rtacha)
\`createCounter()\` funksiyasini yozing: ichida \`let count = 0;\` bo'lsin va chaqirilganda \`count += 1\` qilib yangi sonni qaytarsin. \`const myCounter = createCounter();\` yarating, uni 2 marta chaqiring va ikkinchi chaqiruv natijasini konsolga chiqaring (\`2\`).

### 3-mashq (chegara holat)
Boshlang'ich qiymatdan boshlab hisoblaydigan hisoblagich yozing: \`createCounterFrom(start)\`. Ichidagi \`count\` dastlab \`start\` ga teng bo'lsin. Har chaqirilganda \`count += 1\` bo'lib qaytsin. \`const counterFrom5 = createCounterFrom(5);\` yarating va uni ketma-ket 2 marta chaqirib, oxirgi natijani konsolga chiqaring (\`7\`).

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
function createPrefix(prefix) {
  return function(word) {
    return prefix + word;
  };
}

const addExclamation = createPrefix("!");
console.log(addExclamation("Salom")); // !Salom
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

const myCounter = createCounter();
myCounter();
console.log(myCounter()); // 2
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
function createCounterFrom(start) {
  let count = start;
  return function() {
    count += 1;
    return count;
  };
}

const counterFrom5 = createCounterFrom(5);
counterFrom5();
console.log(counterFrom5()); // 7
\`\`\`

---

## 9. Xulosa

1. Closure — ichki funksiyaning tashqi funksiyadagi o'zgaruvchilarni, hatto tashqi funksiya tugagan bo'lsa ham eslab qolishidir.
2. Closure yordamida o'zgaruvchilarni global qilib qo'ymasdan, xavfsiz va xususiy holatda saqlash mumkin.
3. Ichki funksiya qaytarilayotganda qavslarsiz (\`return innerFunction;\`) yoziladi.

Keyingi darsda: Bir nechta ma'lumotlarni bitta ro'yxatda saqlash — Massivlar (Arrays) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "createPrefix closure funksiyasi",
      instruction: "`createPrefix(prefix)` nomli funksiya yozing: u `word` qabul qiluvchi va `prefix + word` qaytaruvchi ichki funksiya qaytarsin. `const addExclamation = createPrefix(\"!\");` qilib, `addExclamation(\"Salom\")` natijasini konsolga chiqaring.",
      startingCode: "// createPrefix funksiyasini yozing\n",
      hint: "function createPrefix(prefix) {\n  return function(word) {\n    return prefix + word;\n  };\n}\nconst addExclamation = createPrefix(\"!\");\nconsole.log(addExclamation(\"Salom\"));",
      test: "if (!code.includes('createPrefix')) return 'createPrefix funksiyasi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('!Salom'))) return null;\nreturn 'Konsolga \"!Salom\" chiqmadi';"
    },
    {
      id: 2,
      title: "createCounter hisoblagichi",
      instruction: "`createCounter()` funksiyasini yozing: u har chaqirilganda `count` ni 1 ga oshirib qaytarsin (`let count = 0;`). `const myCounter = createCounter();` yarating, uni 2 marta chaqiring va ikkinchi natijani konsolga chiqaring (2).",
      startingCode: "// createCounter funksiyasini yozing\n",
      hint: "function createCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\nconst myCounter = createCounter();\nmyCounter();\nconsole.log(myCounter());",
      test: "if (!code.includes('createCounter')) return 'createCounter funksiyasi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('2'))) return null;\nreturn 'Konsolga 2 chiqmadi';"
    },
    {
      id: 3,
      title: "Boshlang'ich sondan sanovchi closure",
      instruction: "`createCounterFrom(start)` funksiyasini yozing (`let count = start;`). `const counterFrom5 = createCounterFrom(5);` qilib, uni 2 marta chaqiring va ikkinchi natijani konsolga chiqaring (7).",
      startingCode: "// createCounterFrom funksiyasini yozing\n",
      hint: "function createCounterFrom(start) {\n  let count = start;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\nconst counterFrom5 = createCounterFrom(5);\ncounterFrom5();\nconsole.log(counterFrom5());",
      test: "if (!code.includes('createCounterFrom')) return 'createCounterFrom funksiyasi yaratilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('7'))) return null;\nreturn 'Konsolga 7 chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Closure nima?",
      options: [
        "Ichki funksiyaning tashqi funksiyadagi o'zgaruvchilarni eslab qolishi",
        "Funksiyani avtomatik yopib qo'yuvchi operator",
        "Faqat xato berganda ishlaydigan blok",
        "Global o'zgaruvchilarni o'chiruvchi mexanizm"
      ],
      correctAnswer: 0,
      explanation: "Closure — ichki funksiya o'zining tashqi funksiyasidagi o'zgaruvchilarni tashqi funksiya tugagach ham eslab qolishidir."
    },
    {
      id: 2,
      question: "Tashqi funksiyadan ichki funksiyani qaytarayotganda qanday yozish kerak?",
      options: [
        "Qavslarsiz: return innerFunction;",
        "Qavslar bilan: return innerFunction();",
        "Qo'shtirnoqda: return \"innerFunction\";",
        "new kalit so'zi bilan: return new innerFunction;"
      ],
      correctAnswer: 0,
      explanation: "Ichki funksiyaning o'zini qaytarish uchun uni qavslarsiz yozish kerak. Agar qavs qo'yilsa, u darhol chaqirilib uning natijasi qaytib qoladi."
    },
    {
      id: 3,
      question: "Closure dan foydalanishning asosiy afzalligi nima?",
      options: [
        "O'zgaruvchilarni global qilmasdan, xavfsiz va yashirin holatda saqlash",
        "Funksiya tezligini 10 barobar oshirish",
        "Barcha xatolarni avtomatik tuzatish",
        "O'zgaruvchi turini avtomatik o'zgartirish"
      ],
      correctAnswer: 0,
      explanation: "Closure ma'lumotlarni tashqi muhitdan xavfsiz yashirgan holda saqlash va hisoblagichlarni xavfsiz boshqarish imkonini beradi."
    }
  ]
};
