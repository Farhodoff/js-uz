export const errorHandling = {
  id: "errorHandling",
  title: "Xatolarni Boshqarish: try, catch, finally",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Xatolarni Boshqarish nima?
Dasturlashda xatolar muqarrar. Foydalanuvchi noto'g'ri ma'lumot kiritishi, internet uzilib qolishi yoki server noto'g'ri javob qaytarishi mumkin. **try...catch...finally** bloklari — bu JavaScript-da xatolarni oldindan ko'ra bilish va dastur butunlay to'xtab qolishining (crash bo'lishining) oldini olish mexanizmidir.
* **try (urinib ko'rish):** Xavfli bo'lgan, ya'ni xato berishi mumkin bo'lgan kodlar yoziladigan blok.
* **catch (tutib olish):** Agar \`try\` ichida xatolik yuz bersa, dastur to'xtamaydi, balki boshqaruv darhol \`catch\` blokiga o'tadi. U yerda xato haqida ma'lumot (\`error\` obyekti) mavjud bo'ladi.
* **finally (oxir-oqibat):** Xato yuz berishidan qat'i nazar, har qanday holatda ham eng oxirida bajariladigan blok.
* **throw (otish):** Dasturchi o'zi xohlagan shart asosida sun'iy xatolik yaratib, uni otib yuborishi.

### Real hayotiy analogiya
Tasavvur qiling, siz **mashinada sayohatga chiqyapsiz**:
* **try:** Mashinani haydash jarayoni. Yo'lda g'ildirak teshilishi yoki motor buzilishi mumkin.
* **catch:** Zaxira g'ildirak (zapaska) yoki evakuator xizmati. Agar mashina buzilsa, siz sayohatni butunlay to'xtatmaysiz, zaxira reja ishga tushadi.
* **finally:** Sayohat qanday tugashidan qat'i nazar (mashina buziladimi yoki manzilga eson-omon yetib borasizmi), siz baribir kun oxirida mashinadan tushib, dam olasiz.
* **throw:** Siz yo'lga chiqishdan oldin benzin datchigiga qaraysiz va agar benzin tugayotgan bo'lsa, "Yo'lga chiqib bo'lmaydi!" deb sayohatni taqiqlaysiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (try...catch...finally)
Matnni JSON formatiga o'girishda xatolikni boshqarish:
\`\`\`javascript
function parseUserData(jsonString) {
  try {
    console.log("JSON parsing boshlandi...");
    const user = JSON.parse(jsonString);
    console.log("Muvaffaqiyatli o'qildi:", user.name);
    return user;
  } catch (error) {
    console.error("Xatolik aniqlandi! Xato turi:", error.name);
    console.error("Xato xabari:", error.message);
    return null;
  } finally {
    console.log("Operatsiya yakunlandi."); // har doim ishlaydi
  }
}

parseUserData('{"name": "Ali"}'); // Ishlaydi
parseUserData('{not-a-json}'); // Xatolik yuz beradi, lekin dastur to'xtamaydi
\`\`\`

### 2. Intermediate Example (throw va Custom Errors)
Yoshni tekshirish va maxsus xatolik otish:
\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function registerUser(age) {
  if (typeof age !== 'number') {
    throw new TypeError("Yosh faqat son bo'lishi kerak!");
  }
  if (age < 18) {
    throw new ValidationError("Ro'yxatdan o'tish uchun yosh 18 dan kichik bo'lmasligi kerak!");
  }
  return "Muvaffaqiyatli ro'yxatdan o'tdingiz!";
}

try {
  registerUser(15);
} catch (err) {
  if (err instanceof ValidationError) {
    console.warn("Validatsiya xatosi:", err.message);
  } else {
    console.error("Tizim xatosi:", err.message);
  }
}
\`\`\`

### 3. Advanced Example (Asinxron Xatolarni Boshqarish)
Async/await funksiyalarda xatolarni boshqarish:
\`\`\`javascript
async function fetchWithValidation(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // HTTP xato statusi (masalan 404) yuz bersa, uni qo'lda otamiz
      throw new Error(\`Server xatosi: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Tarmoq uzilishi yoki parsing xatolari shu yerda tutiladi
    console.error("Asinxron operatsiyada xatolik:", error.message);
    throw error; // Xatoni yuqori darajaga qayta otish (rethrow)
  }
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Dasturning to'liq qulashi (Crash):** JavaScript bir oqimli (single-threaded) bo'lgani uchun, agar kodning biror qismida boshqarilmagan (uncaught) xato yuz bersa, butun skript ishlashdan to'xtaydi. Bu sahifaning qotib qolishiga yoki oq sahifa bo'lib qolishiga sabab bo'ladi.
* **Foydalanuvchi tajribasi (UX):** Foydalanuvchiga texnik xatoliklar (masalan, \`TypeError: Cannot read properties of undefined\`) o'rniga tushunarli "Nimadir xato ketdi, iltimos qayta urining" degan xabarni ko'rsatish imkonini beradi.
* **Resurslarni tozalash:** Buzilgan ulanishlar, ochiq fayllar yoki yuklash indikatorlarini (spinners) har qanday holatda ham yopish/tozalash imkonini beradi (\`finally\` yordamida).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Asinxron xatolarni sinxron try-catch ichida tutishga urinish
#### Xato:
\`\`\`javascript
try {
  setTimeout(() => {
    throw new Error("Kechikkan xato!"); // BU TUTILMAYDI!
  }, 1000);
} catch (e) {
  console.log("Xato tutilmadi:", e);
}
\`\`\`
*Tushuntirish:* \`setTimeout\` chaqirilgach, \`try-catch\` bloki bajarilib bo'ladi va Call Stack-dan chiqib ketadi. Xato esa 1 soniyadan keyin alohida stackda yuz beradi.
#### Tuzatish:
\`\`\`javascript
setTimeout(() => {
  try {
    throw new Error("Kechikkan xato!");
  } catch (e) {
    console.log("Xato tutildi:", e.message);
  }
}, 1000);
\`\`\`

### 2. Bo'sh catch bloki (Silent Catch)
#### Xato:
\`\`\`javascript
try {
  doSomething();
} catch (e) {
  // Hech narsa yozilmagan. Xato yashirib ketildi!
}
\`\`\`
*Tushuntirish:* Xatoni hech qanday log yoki ogohlantirishsiz yashirish loyihada buglarni topishni juda qiyinlashtiradi.

### 3. Catch bloki ichida xato obyektini satr sifatida otish
#### Noto'g'ri:
\`throw "Xatolik yuz berdi";\`
#### To'g'ri:
\`throw new Error("Xatolik yuz berdi");\` (Chunki Error obyekti xato yuz bergan joyning stack trace ma'lumotlarini o'zida saqlaydi).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da qanday standart Error turlari mavjud?
   * **Javob:** \`ReferenceError\`, \`TypeError\`, \`SyntaxError\`, \`RangeError\`, \`URIError\`, \`EvalError\`.
2. **Savol:** \`finally\` bloki qachon ishlaydi?
   * **Javob:** \`finally\` bloki \`try\` ichida xato bo'lishi yoki bo'lmasligidan qat'i nazar, shuningdek \`try\` yoki \`catch\` ichida \`return\` yozilgan bo'lsa ham har doim ishlaydi.
3. **Savol:** Oddiy Error obyektining qanday muhim xossalari bor?
   * **Javob:** \`.name\` (xato turi), \`.message\` (xato xabari) va \`.stack\` (xato qayerda yuz berganini ko'rsatuvchi chaqiriqlar ketma-ketligi).
4. **Savol:** \`throw\` operatori nima uchun ishlatiladi?
   * **Javob:** Dasturchi tomonidan aniq shartlar asosida yangi xatolik obyekti yaratish va uni otish (dasturni to'xtatish yoki catch-ga yo'naltirish) uchun.

### Middle (5–8)
5. **Savol:** Nima uchun \`setTimeout\` ichidagi xatolar tashqi \`try-catch\` tomonidan tutilmaydi?
   * **Javob:** Chunki \`setTimeout\` asinxron funksiya bo'lib, uning callbacki keyinchalik Event Loop orqali yangi Call Stack-da bajariladi, tashqi \`try-catch\` esa allaqachon bajarilib tugagan bo'ladi.
6. **Savol:** \`throw new Error()\` va \`throw Error()\` farqi nimada?
   * **Javob:** Funktsional jihatdan hech qanday farq yo'q. JavaScript Error-ni \`new\` kalit so'zisiz chaqirganda ham avtomatik ravishda yangi obyekt yaratadi.
7. **Savol:** Qanday qilib custom (shaxsiy) Error klasslarini yaratish mumkin?
   * **Javob:** Standart \`Error\` klassidan \`extends\` kalit so'zi orqali voris olib, \`super(message)\` ni chaqirish orqali.
8. **Savol:** Agar \`catch\` va \`finally\` ikkalasida ham \`return\` bo'lsa, qaysi biri ustunlik qiladi?
   * **Javob:** \`finally\` blokidagi \`return\` har doim ustunlik qiladi va undan oldingi return qiymatlarini felini o'zgartiradi.

### Senior (9–12)
9. **Savol:** Asinxron Promise zanjirida unhandled rejection qanday yuzaga keladi va uni global miqyosda qanday ushlash mumkin?
   * **Javob:** \`.catch()\` qilinmagan Promise rad etilganda yuz beradi. Brauzerda uni \`window.addEventListener('unhandledrejection', callback)\` orqali global tutish mumkin.
10. **Savol:** Nima uchun \`try-catch\` bloklari V8 dvigatelining kodni optimallashtirish (JIT compilation) jarayoniga ta'sir qilishi mumkin?
    * **Javob:** Eski V8 versiyalarida \`try-catch\` ichidagi funksiyalar optimizatsiya qilinmas edi. Hozirda bu muammo deyarli hal qilingan bo'lsa-da, og'ir funksiyalarni \`try-catch\` ichida saqlamaslik tavsiya etiladi.
11. **Savol:** Error Cause (Xato sababchisi) nima va u qanday ishlatiladi?
    * **Javob:** ES2022-da kiritilgan bo'lib, xatoni boshqa xatoga o'rayotganda asl xatoni saqlab qolish uchun ishlatiladi: \`throw new Error('New error', { cause: originalError })\`.
12. **Savol:** Node.js-dagi xatolarni boshqarish bilan brauzerdagi xatolarni boshqarishning qanday arxitekturaviy farqlari bor?
    * **Javob:** Node.js-da boshqarilmagan xato jarayonni (\`process.exit(1)\`) butunlay to'xtatadi. Brauzerda esa faqat joriy skript oqimi to'xtaydi, foydalanuvchi interfeysi ishlashda davom etishi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali xatolarni boshqarish bo'yicha mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### JSON formatidagi API javobini xavfsiz o'qish va validatsiya qilish
Ko'pincha serverdan keladigan ma'lumot buzilgan yoki kutilmagan formatda bo'lishi mumkin. Biz xavfsiz parsing funksiyasini yozamiz.

\`\`\`javascript
function processApiResponse(rawJson) {
  try {
    // 1. JSON parse qilamiz
    const data = JSON.parse(rawJson);
    
    // 2. Formatni tekshiramiz (Validatsiya)
    if (!data.status) {
      throw new Error("API javobida 'status' maydoni yo'q");
    }
    
    if (data.status === 'error') {
      throw new Error(\`Server xatolik qaytardi: \${data.message || 'Noma'lum xato'}\`);
    }
    
    console.log("API muvaffaqiyatli qayta ishlandi:", data.payload);
    return data.payload;
    
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Format noto'g'ri (JSON SyntaxError):", error.message);
    } else {
      console.error("API xatoligi:", error.message);
    }
    return null; // Dastur qulamaydi, shunchaki null qaytadi
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Faqat xatolar uchun ishlating:** \`try-catch\` blokini dasturning normal oqimini (flow control) boshqarish uchun (masalan \`if-else\` o'rniga) ishlatmang. Xatolarni yaratish va stack trace yig'ish xotira va vaqt jihatidan og'ir operatsiyadir.
* **Try blokini kichik saqlang:** \`try\` bloki ichida faqat haqiqatan ham xato berishi mumkin bo'lgan operatsiyani (masalan \`JSON.parse\` yoki \`fetch\`) yozing. Hamma kodni bitta global \`try\`ga tiqish xatolik aynan qayerda yuz berganini aniqlashni qiyinlashtiradi.

---

## 10. 📌 Cheat Sheet

| Blok / Buyruq | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`try { ... }\` | Xato berishi mumkin bo'lgan kod bloki | \`try { parseJson(); }\` |
| \`catch (error) { ... }\` | Xato yuz berganda uning tafsilotlarini tutib olish | \`catch(e) { console.log(e.message); }\` |
| \`finally { ... }\` | Xato bo'lishidan qat'i nazar oxirida bajariluvchi kod | \`finally { hideLoadingSpinner(); }\` |
| \`throw expression\` | Maxsus xatolik yaratib otish | \`throw new Error("Ta'qiqlangan!");\` |
| \`error.stack\` | Xato yuz bergan joygacha bo'lgan funksiyalar chaqiruvi | \`console.log(err.stack);\` |
`,
  exercises: [
    {
      id: 1,
      title: "JSON Parse Xatosini Tutish",
      instruction: "Berilgan noto'g'ri JSON matnini parse qilayotganda yuz beradigan xatoni `try...catch` yordamida tuting va konsolga 'Xato yuz berdi' deb chiqaring.",
      startingCode: "const jsonStr = '{ invalid json }';\ntry {\n  // JSON parse qiling\n} catch (e) {\n  // Konsolga yozing\n}",
      hint: "JSON.parse(jsonStr) va console.log('Xato yuz berdi')",
      test: "if (logs.includes('Xato yuz berdi')) return null; return 'Xato to\\'g\\'ri tutilmadi';"
    },
    {
      id: 2,
      title: "Yosh Cheklovi Xatosini Tashlash",
      instruction: "`checkAge` funksiyasida agar `age` 18 dan kichik bo'lsa, `throw new Error('Yosh yetarli emas')` yordamida xato tashlang.",
      startingCode: "function checkAge(age) {\n  // Kodni shu yerga yozing\n}",
      hint: "if (age < 18) { throw new Error('Yosh yetarli emas'); }",
      test: "try { checkAge(15); return 'Xato tashlanmadi'; } catch (e) { if (e.message === 'Yosh yetarli emas') return null; return 'Xato xabari noto\\'g\\'ri'; }"
    },
    {
      id: 3,
      title: "Finally Bloki Bilan Ishlash",
      instruction: "`processData` funksiyasida `try...catch...finally` ishlating. Har qanday holatda ham `finally` blokida konsolga 'Tugadi' deb chiqaring.",
      startingCode: "function processData() {\n  try {\n    throw new Error('Test xato');\n  } catch (e) {\n    console.log('Ushlandi');\n  }\n  // finally blokini yozing\n}",
      hint: "finally { console.log('Tugadi'); }",
      test: "if (logs.includes('Ushlandi') && logs.includes('Tugadi')) return null; return 'Finally ishlamadi';"
    },
    {
      id: 4,
      title: "Xato Turini Aniqlash",
      instruction: "`catch` blokida tutilgan xato `TypeError` ekanligini `instanceof` yordamida tekshiring va agar shunday bo'lsa konsolga 'Tip xatosi' deb chiqaring.",
      startingCode: "try {\n  const num = null;\n  num.toUpperCase();\n} catch (e) {\n  // e instanceof TypeError ni tekshiring\n}",
      hint: "if (e instanceof TypeError) { console.log('Tip xatosi'); }",
      test: "if (logs.includes('Tip xatosi')) return null; return 'TypeError aniqlanmadi';"
    },
    {
      id: 5,
      title: "Xavfsiz Bo'lish Funksiyasi",
      instruction: "Ikki sonni bo'luvchi funksiya yarating. Agar maxraj (`b`) 0 bo'lsa, `throw new Error('Nolga bo\\'lish mumkin emas')` tashlasin.",
      startingCode: "function divide(a, b) {\n  // Kodni yozing\n}",
      hint: "if (b === 0) throw new Error('Nolga bo\\'lish mumkin emas'); return a / b;",
      test: "try { if (divide(10, 2) !== 5) return 'Bo\\'lish xato'; divide(10, 0); return '0 ga bo\\'lganda xato tashlanmadi'; } catch(e) { if (e.message === 'Nolga bo\\'lish mumkin emas') return null; return 'Xato xabari mos kelmadi'; }"
    },
    {
      id: 6,
      title: "Maxsus Xato Klassi (Custom Error)",
      instruction: "`ValidationError` nomli maxsus xato klassini yarating (u `Error` klassidan voris olsin). `constructor` ichida xato xabarini `super()` orqali o'rnating va uning `name` xususiyatini `'ValidationError'` qiling.",
      startingCode: "// ValidationError klassini yarating\n",
      hint: "class ValidationError extends Error { constructor(message) { super(message); this.name = 'ValidationError'; } }",
      test: "const err = new ValidationError('Email xato'); if (err instanceof Error && err.name === 'ValidationError' && err.message === 'Email xato') return null; return 'ValidationError klassi to\\'g\\'ri yaratilmadi';"
    },
    {
      id: 7,
      title: "Promise Xatosini Catch Qilish",
      instruction: "Promise orqali yuborilgan xatoni `.catch()` yordamida tuting va konsolga 'Xato: [error message]' ko'rinishida yozing.",
      startingCode: "function handleFetchError() {\n  return Promise.reject(new Error('Ulanish xatosi'))\n    // catch blokini qo'shing\n}",
      hint: ".catch(err => console.log('Xato: ' + err.message))",
      test: "return handleFetchError().then(() => { if (logs.some(l => l.includes('Xato: Ulanish xatosi'))) return null; return 'Promise xatosi tutilmadi'; });"
    },
    {
      id: 8,
      title: "Async/Await va Try-Catch",
      instruction: "`fetchData` asinxron funksiyasida xato tashlaydigan Promise chaqirilgan. Uni `try...catch` yordamida o'rab, xato xabarini konsolga chiqaring.",
      startingCode: "async function fetchData() {\n  const getPromise = () => Promise.reject(new Error('Server band'));\n  // try...catch ichida getPromise() ni await qiling\n}",
      hint: "try { await getPromise(); } catch(e) { console.log(e.message); }",
      test: "return fetchData().then(() => { if (logs.includes('Server band')) return null; return 'Asinxron xato to\\'g\\'ri tutilmadi'; });"
    },
    {
      id: 9,
      title: "Xatoni Qayta Tashlash (Rethrow)",
      instruction: "`readConfig` funksiyasida xato sodir bo'lsa, agar u `SyntaxError` bo'lsa uni tutib konsolga 'Sintaksis xato' deb yozing. Boshqa har qanday kutilmagan xatoni esa qayta tashlang (`throw e`).",
      startingCode: "function readConfig(fn) {\n  try {\n    fn();\n  } catch (e) {\n    // SyntaxError bo'lsa konsolga yozing, aks holda qayta throw qiling\n  }\n}",
      hint: "if (e instanceof SyntaxError) { console.log('Sintaksis xato'); } else { throw e; }",
      test: "let rethrown = false; try { readConfig(() => { throw new TypeError('Tur xatosi'); }); } catch(e) { if (e instanceof TypeError) rethrown = true; } let handled = false; try { readConfig(() => { throw new SyntaxError('Sintaksis'); }); handled = logs.includes('Sintaksis xato'); } catch(e) {} if (rethrown && handled) return null; return 'Rethrowing mantiqi noto\\'g\\'ri bajarildi';"
    },
    {
      id: 10,
      title: "Ichma-ich Try-Catch",
      instruction: "Ichki `try...catch` blokida xato yuz beradi va u ushlanib, qayta boshqa xato ko'rinishida tashlanadi (`throw new Error('Yangi')`). Tashqi `try...catch` esa bu yangi xatoni tutib konsolga chiqarsin.",
      startingCode: "try {\n  try {\n    throw new Error('Eski');\n  } catch (innerError) {\n    // Yangi xato tashlang\n  }\n} catch (outerError) {\n  // Konsolga chiqaring\n}",
      hint: "throw new Error('Yangi') ichki catchda, console.log(outerError.message) tashqi catchda.",
      test: "if (logs.includes('Yangi')) return null; return 'Tashqi catch yangi xatoni tutmadi';"
    },
    {
      id: 11,
      title: "Massiv O'lchami Xatosini Oldini Olish",
      instruction: "Berilgan o'lcham bo'yicha massiv yaratadigan `createArray` funksiyasini yozing. Noto'g'ri o'lcham tufayli kelib chiqadigan `RangeError`ni `try...catch` bilan tutib konsolga 'Noto\\'g\\'ri o\\'lcham' deb yozing.",
      startingCode: "function createArray(size) {\n  try {\n    // new Array(size) qiling\n  } catch (e) {\n    // RangeError ekanligini tekshirib konsolga chiqaring\n  }\n}",
      hint: "try { new Array(size); } catch(e) { if (e instanceof RangeError) console.log('Noto\\'g\\'ri o\\'lcham'); }",
      test: "createArray(-5); if (logs.includes('Noto\\'g\\'ri o\\'lcham')) return null; return 'RangeError tutilmadi';"
    },
    {
      id: 12,
      title: "Obyekt Maydonlarini Validatsiya Qilish",
      instruction: "`validateUser(user)` funksiyasini yozing. Agar `user` obyektida `username` bo'lmasa, `throw new Error('Foydalanuvchi nomi majburiy')` qilsin.",
      startingCode: "function validateUser(user) {\n  // Kodni yozing\n}",
      hint: "if (!user.username) throw new Error('Foydalanuvchi nomi majburiy');",
      test: "try { validateUser({ age: 25 }); return 'Xato tashlanmadi'; } catch (e) { if (e.message === 'Foydalanuvchi nomi majburiy') return null; return 'Xato xabari noto\\'g\\'ri'; }"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Xavfsiz JSON Parse (safeJSONParse)",
      instruction: "Berilgan satrni xavfsiz JSON.parse qiladigan `safeJSONParse(str, fallback)` funksiyasini yozing. Noto'g'ri JSON bo'lsa, xato tashlamasdan `fallback` qiymatini qaytarsin.",
      startingCode: "function safeJSONParse(str, fallback) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return JSON.parse(str); } catch (e) { return fallback; }",
      test: "if (typeof safeJSONParse !== 'function') return 'safeJSONParse funksiya emas';\nif (safeJSONParse('{\"a\": 1}', {})?.a !== 1) return 'To\\'g\\'ri JSON xato parse qilindi';\nif (JSON.stringify(safeJSONParse('{invalid}', { b: 2 })) !== '{\"b\":2}') return 'Fallback noto\\'g\\'ri qaytdi';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Error cause bog'lash (fetchWithErrorCause)",
      instruction: "Berilgan `url`ga fetch yuboring. Agar tarmoq xatosi yuz bersa (catch), uni ushlab, `new Error('Tarmoq yuklash xatosi', { cause: err })` deb original xatoni ulab qayta tashlang (throw).",
      startingCode: "async function fetchWithErrorCause(url) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { return await fetch(url); } catch (err) { throw new Error('Tarmoq yuklash xatosi', { cause: err }); }",
      test: "if (typeof fetchWithErrorCause !== 'function') return 'fetchWithErrorCause funksiya emas';\nreturn fetchWithErrorCause('https://invalid-domain-does-not-exist.xyz').then(() => 'Xato tashlanmadi').catch(err => {\n  if (err.message === 'Tarmoq yuklash xatosi' && err.cause instanceof Error) return null;\n  return 'Error cause zanjiri noto\\'g\\'ri shakllantirilgan';\n});"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da try...catch blokining asosiy vazifasi nima?",
    "options": [
      "Dasturning xotira sarfini kamaytirish",
      "Koddagi xatolarni avtomatik tarzda o'chirib yuborish",
      "Kutilmagan xatolar yuz berganda dastur to'xtab qolishining oldini olish va xatoni boshqarish",
      "Sinxron kodni asinxron kodga aylantirish"
    ],
    "correctAnswer": 2,
    "explanation": "try...catch bloki yordamida biz xavfli kodlarni try ichiga olamiz, xato yuz berganda esa catch bloki ishlab dastur to'xtamasligini ta'minlaymiz."
  },
  {
    "id": 2,
    "question": "finally bloki qachon ishga tushadi?",
    "options": [
      "Faqat try blokida xato yuz bermasa",
      "Faqat catch bloki xatoni tutib olgandan keyin",
      "Xatolik yuz berishi yoki bermasligidan qat'i nazar har doim eng oxirida",
      "Faqat brauzer yopilganda"
    ],
    "correctAnswer": 2,
    "explanation": "finally bloki har qanday holatda ham, xato bo'lsa ham bo'lmasa ham, eng oxirida albatta ishga tushadi."
  },
  {
    "id": 3,
    "question": "Dasturchi tomonidan qo'lda (sun'iy) xatolik otish uchun qaysi kalit so'z ishlatiladi?",
    "options": [
      "catch",
      "throw",
      "reject",
      "raise"
    ],
    "correctAnswer": 1,
    "explanation": "throw kalit so'zi yordamida istalgan xatolik obyektini yoki qiymatini otishimiz mumkin: throw new Error('Xato');"
  },
  {
    "id": 4,
    "question": "E'lon qilinmagan (mavjud bo'lmagan) o'zgaruvchidan foydalanmoqchi bo'linganda qanday xato turi yuzaga keladi?",
    "options": [
      "TypeError",
      "SyntaxError",
      "ReferenceError",
      "RangeError"
    ],
    "correctAnswer": 2,
    "explanation": "ReferenceError o'zgaruvchi yoki funksiya topilmaganda, ya'ni unga havola (reference) noto'g'ri bo'lganda yuzaga keladi."
  },
  {
    "id": 5,
    "question": "Error obyektining qaysi xossasi xato yuz bergan joygacha bo'lgan funksiyalar chaqiruvlari ketma-ketligini (Call Stack) ko'rsatadi?",
    "options": [
      "message",
      "name",
      "stack",
      "cause"
    ],
    "correctAnswer": 2,
    "explanation": "stack xossasi xato aynan qaysi fayl, qaysi qator va qaysi funksiyalarda sodir bo'lganligini to'liq ko'rsatuvchi ma'lumotni saqlaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\ntry {\n  setTimeout(() => {\n    throw new Error('Asinxron xato');\n  }, 100);\n} catch (e) {\n  console.log('Xato tutildi!');\n}\n```",
    "options": [
      "Konsolda 'Xato tutildi!' yozuvi chiqadi",
      "Dastur xatosiz tugaydi va hech narsa chiqmaydi",
      "Boshqarilmagan (Uncaught Error: Asinxron xato) xatosi yuzaga keladi va catch bloki ishlamaydi",
      "TypeError xatosi chiqadi"
    ],
    "correctAnswer": 2,
    "explanation": "setTimeout asinxron bo'lgani uchun uning callbacki keyinchalik alohida stackda ishlaydi. Bu paytda try-catch bloki allaqachon bajarilib bo'lgani uchun u xatoni tuta olmaydi va global xato yuzaga keladi."
  },
  {
    "id": 7,
    "question": "throw operatori yordamida qanday turdagi qiymatlarni otish mumkin?",
    "options": [
      "Faqat Error obyektlarini",
      "Faqat satr (string) turidagi xabarlarni",
      "Istalgan turdagi qiymatni (obyekt, string, son, boolean va h.k.)",
      "Faqat raqamlarni"
    ],
    "correctAnswer": 2,
    "explanation": "JS-da throw orqali istalgan qiymatni, jumladan string, son yoki custom obyektlarni ham otish mumkin, lekin eng yaxshi amaliyot Error obyektini ishlatishdir."
  },
  {
    "id": 8,
    "question": "try yoki catch bloklari ichida return yozilgan bo'lsa, finally bloki qanday ishlaydi?",
    "options": [
      "finally bloki umuman ishga tushmaydi",
      "finally baribir ishlaydi va agar uning ichida ham return bo'lsa, u oldingi return qiymatini felini o'zgartiradi",
      "Faqat xato bo'lsagina ishlaydi",
      "Dastur SyntaxError beradi"
    ],
    "correctAnswer": 1,
    "explanation": "finally bloki try/catch ichidagi return bajarilishidan oldin baribir ishga tushadi. Agar finally ichida ham return bo'lsa, u yakuniy natijaga aylanadi."
  },
  {
    "id": 9,
    "question": "Noma'lum (aniqlanmagan) obyekt metodini yoki null qiymat ustida amal bajarmoqchi bo'lganda qaysi xato turi yuz beradi?",
    "options": [
      "SyntaxError",
      "TypeError",
      "RangeError",
      "URIError"
    ],
    "correctAnswer": 1,
    "explanation": "TypeError qiymat kutilgan turda bo'lmaganda yoki null/undefined ustida xossa/metod chaqirilganda yuzaga keladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodda console.log ishlaydimi?\n```javascript\ntry {\n  JSON.parse('{not-json}');\n} catch (e) {\n  console.log('Catch ishladi');\n}\n```",
    "options": [
      "Yo'q, chunki JSON parsing xatosi try-catch tomonidan tutilmaydi",
      "Ha, chunki noto'g'ri JSON parser SyntaxError beradi va catch uni tutib log yozadi",
      "Yo'q, chunki kod SyntaxError berib butunlay to'xtaydi",
      "Ha, lekin logda undefined chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "JSON.parse xato JSON matni uzatilganda SyntaxError otadi va bu sinxron xato bo'lgani uchun catch bloki uni muvaffaqiyatli tutadi va log ishlaydi."
  },
  {
    "id": 11,
    "question": "RangeError xatosi odatda qachon yuz beradi?",
    "options": [
      "O'zgaruvchi topilmaganda",
      "Qiymat ruxsat etilgan diapazondan yoki massiv o'lchovidan oshib ketganda",
      "Sinxron kod asinxronga aylanganda",
      "Tugma bosilmaganda"
    ],
    "correctAnswer": 1,
    "explanation": "RangeError qiymat ruxsat berilgan diapazondan chiqqanda (masalan, new Array(-1) yoki recursion juda chuqurlashib stack overflow bo'lganda) yuzaga keladi."
  },
  {
    "id": 12,
    "question": "Nima uchun try-catch bloklarini faqat haqiqiy xatolar uchun ishlatish tavsiya etiladi?",
    "options": [
      "Chunki ular kod hajmini oshiradi",
      "Chunki xatolarni yaratish va stack trace to'plash resurs jihatidan og'ir operatsiya bo'lib, unumdorlikka ta'sir qiladi",
      "Chunki brauzer try-catch ko'p bo'lsa sahifani bloklaydi",
      "Foydalanish cheklovlari mavjud"
    ],
    "correctAnswer": 1,
    "explanation": "Error obyektlarini yaratish va call stack trace yig'ish tizim uchun qimmatga tushadi, shuning uchun dastur normal mantiqiy oqimini (flow control) if-else o'rniga try-catch bilan boshqarish unumdorlikni pasaytiradi."
  }
]

};
