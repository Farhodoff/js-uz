export const errorHandling = {
  id: "error-handling",
  title: "Xatolar bilan ishlash: Mustahkam va xavfsiz kod yozish",
  level: "O'rta/Murakkab",
  description: "Dasturingiz 'portlab' ketmasligi uchun xatolarni ushlash, boshqarish va to'g'ri qayta joylashtirish.",
  theory: `## 1. NEGA kerak?

Dasturlashda xatolar muqarrar. Kodda 100% aniqlik bo'lmasligi mumkin:
- Foydalanuvchi noto'g'ri ma'lumot kiritsashi mumkin
- Server javob bermasaligi mumkin
- API'dan xato JSON kelishi mumkin
- Fayl topilmasaligi mumkin

Muhimi — xato sodir bo'lganda **butun sayt to'xtab qolmasligini** ta'minlash. Bu foydalanuvchi tajribasi yomonlashtirib qo'yadi. Error Handling bo'lsa, sayt to'xtamay, xatoni ushlash va foydalanuvchiga tushunarli xabar ko'rsatish mumkin.

## 2. SODDALIK (Analogiya)

Buni **xavfsizlik kamari** deb tasavvur qiling. Siz mashina haydayapsiz (kod ishlayapti). Agar kutilmagan holat (xato) bo'lsa, xavfsizlik kamari (try...catch) sizni jarohatdan (dastur o'chib qolishidan) saqlab qoladi. Kamari sizni berkin tegib, lekin xavf o'tib ketadi.

## 3. STRUKTURA

### A. Try...Catch...Finally Struktura

Bu error handling'ning asosiy shakli:

\`\`\`javascript
try {
  // Xato bo'lishi mumkin bo'lgan kod
  const natija = riskyOperation();
} catch (error) {
  // Agar xato bo'lsa, bu blok ishlaydi
  console.error("Xato yuz berdi: " + error.message);
} finally {
  // Xato bo'lishi yoki bo'lmasligidan qat'iy nazar oxirida ishlaydi
  console.log("Amal yakunlandi.");
}
\`\`\`

**Muhim:** finally bloki **har doim** ishlaydi, hatta \`return\` bo'lsa ham:
\`\`\`javascript
function test() {
  try {
    return "Success";
  } finally {
    console.log("Finally ishlaydi!"); // Bu konsolga chiqadi
  }
}
\`\`\`

### B. Error Objekti va Xususiyatlari

Xato sodir bo'lganda, \`catch\` bloki \`error\` objektini oladi:

\`\`\`javascript
try {
  JSON.parse("salom"); // Invalid JSON
} catch (error) {
  console.log(error.message);  // "Unexpected token s..."
  console.log(error.name);     // "SyntaxError"
  console.log(error.stack);    // Full stack trace
}
\`\`\`

**Error Objektining asosiy xususiyatlari:**
- \`message\` — Xato tavsifi
- \`name\` — Xato turi nomi
- \`stack\` — Xato qayerda ro'y bergani (debug uchun)

### C. Xato Turlari

**1. TypeError — Noto'g'ri tip bilan ishlash:**
\`\`\`javascript
const obj = null;
obj.name;  // TypeError: Cannot read property 'name' of null
\`\`\`

**2. ReferenceError — Yo'q o'zgaruvchiga murojaatda:**
\`\`\`javascript
console.log(nolumMalumOzgaruvchi);  // ReferenceError: is not defined
\`\`\`

**3. SyntaxError — Kodni noto'g'ri yozish (Runtime xatosi emas):**
\`\`\`javascript
JSON.parse("{invalid json}");  // SyntaxError
\`\`\`

**4. RangeError — Parametr qabul qilinadigan diapazondan chiqib ketgan:**
\`\`\`javascript
const arr = new Array(-1);  // RangeError: Invalid array length
\`\`\`

**5. Custom Errors — O'z xatoliklar:**
\`\`\`javascript
throw new Error("Custom xato matni");
\`\`\`

### D. Throw Statement — Xatoni Ataylab Chiqarish

Shartga ko'ra xato hosil qilish:

\`\`\`javascript
function validateAge(age) {
  if (age < 0) {
    throw new Error("Yosh manfiy bo'lishi mumkin emas!");
  }
  if (age > 150) {
    throw new Error("Bunday yosh bo'lishi mumkin emas!");
  }
  console.log("Yosh to'g'ri: " + age);
}

try {
  validateAge(-5);  // Xato bilan to'xtaydi
} catch (error) {
  console.log(error.message);  // "Yosh manfiy bo'lishi mumkin emas!"
}
\`\`\`

### E. Input Validation (Kirish Ma'lumotini Tekshirish)

Xatolikdan oldini olishning eng yaxshi usuli:

\`\`\`javascript
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Raqam kiritish kerak!");
  }
  if (b === 0) {
    throw new Error("Nolga bo'lish mumkin emas!");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));     // 5
  console.log(divide(10, 0));     // Xato
} catch (error) {
  console.error(error.message);
}
\`\`\`

### F. Nested Try...Catch (Ichma-ich Try...Catch)

Bir try...catch'ni boshqasi ichiga joylashtirish:

\`\`\`javascript
try {
  try {
    JSON.parse("invalid");  // Xato
  } catch (innerError) {
    console.log("Ichki catch: " + innerError.message);
    throw new Error("Qayta yuboring!");  // Xatoni yana otish
  }
} catch (outerError) {
  console.log("Tashqi catch: " + outerError.message);
}
\`\`\`

### G. Error Handling va Promises

Promise'da \`.catch()\` orqali xatolarni boshqarish:

\`\`\`javascript
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      throw new Error("API xatosi: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    console.error("Xato yuz berdi: " + error.message);
  })
  .finally(() => console.log("Amal yakunlandi"));
\`\`\`

### H. Error Handling va Async/Await

\`async/await\` bilan try...catch eng samarali:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error("Server xatosi: " + response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Xato: " + error.message);
  } finally {
    console.log("Yuklanish tugatildi");
  }
}

fetchData();
\`\`\`

### I. Custom Error Klasslar

O'z xato tiplarini yaratish:

\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(\`\${resource} topilmadi\`);
    this.name = "NotFoundError";
  }
}

try {
  throw new ValidationError("Email to'g'ri emas");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validatsiya xatosi: " + error.message);
  }
}
\`\`\`

### J. Error Logging (Xatoni Qayd Qilish)

Production'da xatolarni server-ga yuborish:

\`\`\`javascript
function logError(error) {
  // Konsolda - development uchun
  console.error(error);

  // Server'ga - production uchun
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: new Date()
    })
  });
}

try {
  riskyOperation();
} catch (error) {
  logError(error);
}
\`\`\`

### K. Foydalanuvchiga Ko'rsatish

Texnik xatolarni foydalanuvchiga tushunarli qilib ko'rsatish:

\`\`\`javascript
function handleError(error) {
  // Konsolda - texnik ma'lumot (development)
  console.error(error);

  // UI'da - tushunarli xabar (foydalanuvchi uchun)
  const userMessage = {
    "NetworkError": "Internet aloqasi yo'q",
    "ValidationError": "Ma'lumotlarni to'g'ri kiriting",
    "NotFoundError": "Qidirilayotgan ma'lumot topilmadi"
  }[error.name] || "Biror xatolik yuz berdi, qayta urinib ko'ring";

  showAlert(userMessage);
}
\`\`\`

### L. Global Error Handler

Barcha catch qilinmagan xatolarni tulovchi:

\`\`\`javascript
// Synchronous xatolar uchun:
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global xato: " + message);
  // Server'ga jo'natish
  return true; // Standart error handle'ni bekor qiladi
};

// Unhandled promise rejection'lar uchun:
window.onunhandledrejection = function(event) {
  console.error("Promise rejected: " + event.reason);
};
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **try ichidagi xatoni catch ichida rethrow qilish:**
   \`\`\`javascript
   // XATO:
   try {
     riskyOperation();
   } catch (e) {
     throw e;  // Xato yana o'tadi
   }

   // TO'G'RI:
   try {
     riskyOperation();
   } catch (e) {
     // Xatoni handle qilish (log, transform va h.k.)
     console.error(e);
     // Agar re-throw kerak bo'lsa:
     throw new Error("Qayta yubor: " + e.message);
   }
   \`\`\`

2. **Asinxron kodda try...catch ishlatish (await yo'q):**
   \`\`\`javascript
   // XATO:
   try {
     setTimeout(() => {
       throw new Error("Xato");
     }, 100);
   } catch (e) {
     console.log(e);  // Ushlanmaydi!
   }

   // TO'G'RI (async/await):
   async function test() {
     try {
       await new Promise((resolve, reject) => {
         setTimeout(() => reject(new Error("Xato")), 100);
       });
     } catch (e) {
       console.log(e);  // Ushlanadi
     }
   }
   \`\`\`

3. **Bo'sh catch bloki (silent failure):**
   \`\`\`javascript
   // XATO:
   try {
     riskyOperation();
   } catch (e) {
     // Hech narsa qilmaymiz!
   }

   // TO'G'RI:
   try {
     riskyOperation();
   } catch (e) {
     console.error(e);  // Hech bo'lmasa log qiling
     // Yoki qayta joylashtiring
     throw new Error("Qayta yubor: " + e.message);
   }
   \`\`\`

4. **Null/undefined tekshirsiz murojaat:**
   \`\`\`javascript
   // XATO:
   const user = response.data.user.name;  // Qaysi biri null?

   // TO'G'RI:
   const user = response?.data?.user?.name;  // Optional chaining
   // Yoki:
   const user = (response && response.data && response.data.user) ? response.data.user.name : null;
   \`\`\`

5. **Generic error handling (hammani bir kanallaga?):**
   \`\`\`javascript
   // XATO:
   try {
     // Juda ko'p kod
   } catch (e) {
     // Hammani bir xil qayta joylashtirish
   }

   // TO'G'RI:
   try {
     operationA();
   } catch (e) {
     handleAError(e);
   }
   try {
     operationB();
   } catch (e) {
     handleBError(e);
   }
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Error Handling nima va nima uchun kerak?</summary>
Dasturda yuz berishi mumkin bo'lgan xatolarni ushlash va boshqarish. Sayt to'xtab qolmasligini ta'minlash.
</details>

<details>
<summary>2. try, catch, finally bloklari nima?</summary>
try — xavfli kod, catch — xato bo'lganda ishlaydi, finally — har doim ishlaydi (xato bo'lsa ham, bo'lmasa ham).
</details>

<details>
<summary>3. Error objektining asosiy xususiyatlari qaysilar?</summary>
message (xato matni), name (xato turi), stack (qayerda ro'y bergani).
</details>

<details>
<summary>4. throw kalit so'zi nima qiladi?</summary>
Dasturda ataylab xatolik (exception) hosil qiladi.
</details>

<details>
<summary>5. TypeError va ReferenceError farqi nima?</summary>
TypeError — noto'g'ri turdagi qiymat ishlatilganda. ReferenceError — yo'q o'zgaruvchiga murojaat qilinganda.
</details>

<details>
<summary>6. try...catch asinxron kodda qanday ishlaydi?</summary>
Oddiy setTimeout ichidagi xatolikni ushlamaydi. Buning uchun async/await va Promise.catch() kerak.
</details>

<details>
<summary>7. Custom Error yaratish misoli?</summary>
class MyError extends Error { constructor(msg) { super(msg); this.name = "MyError"; } }
</details>

<details>
<summary>8. Promise'da xatolar qanday ushlanadi?</summary>
.catch() metodini ishlatish orqali: promise.catch(error => {...})
</details>

<details>
<summary>9. Foydalanuvchiga xatoni qanday ko'rsatish kerak?</summary>
Texnik xatolarni konsolda qoldirib, foydalanuvchiga esa tushunarli matn ko'rsatish (masalan, "Biror xatolik yuz berdi").
</details>

<details>
<summary>10. finally bloki har doim ishlaydiми?</summary>
Ha, xato bo'lishi yoki bo'lmasligidan, hatta return bo'lsa ham.
</details>

<details>
<summary>11. Optional chaining (?.) nima foydasi?</summary>
Null/undefined tekshirib murojaat qilmasdan birgalikda tekshirish. Masalan: obj?.prop?.nested
</details>

<details>
<summary>12. Global error handler nima va qachon kerak?</summary>
window.onerror va onunhandledrejection — barcha catch qilinmagan xatalarni tulovchi. Production'da kritik xatolarni qayd qilish uchun kerak.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Try-Catch",
      instruction: "JSON.parse() orqali noto'g'ri JSON parse qiling va xatoni catch qilib konsolga 'Xato ushlanda!' deб chiqaring.",
      startingCode: "// Try-Catch qo'llaniladi\n\nconsole.log(typeof err); // xatolik ushlanib, err o'zgaruvchini olish kerak\n",
      hint: "try { JSON.parse('{invalid}'); } catch (err) { console.log('Xato ushlanda!'); }",
      test: "if (logs.includes('Xato ushlanda!')) return null; return 'Try-catch to\\'g\\'ri qo\\'llanilmadi';"
    },
    {
      id: 2,
      title: "Error Message O'qish",
      instruction: "Yo'q o'zgaruvchiga murojaatni try-catch qilib, error.message'ni konsolga chiqaring.",
      startingCode: "// Yo'q o'zgaruvchi natijasidagi xatoni ushlab, message chiqaring\n\nconsole.log(typeof errorMsg); // xato messagi\n",
      hint: "try { console.log(nolumMalumOz); } catch (err) { const errorMsg = err.message; console.log(errorMsg); }",
      test: "if (logs.includes('is not defined')) return null; return 'Error message noto\\'g\\'ri chiqarildi';"
    },
    {
      id: 3,
      title: "Throw Statement",
      instruction: "'age' parametri 0-dan kichik bo'lsa, Error throw qiling.",
      startingCode: "function validateAge(age) {\n  // Bu yerga yozing\n}\n\ntry {\n  validateAge(-5);\n} catch (err) {\n  console.log(err.message);\n}\n",
      hint: "if (age < 0) throw new Error('Age manfiy bo\\'lmasligi kerak');",
      test: "if (code.includes('throw') && code.includes('Error')) return null; return 'Throw statement noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Finally Bloki",
      instruction: "Try-catch-finally tuzilishida finally bloki har doim ishlashi'ni ko'rsating.",
      startingCode: "let result = '';\ntry {\n  result += 'try';\n} catch (e) {\n  result += 'catch';\n} finally {\n  result += 'finally';\n}\nconsole.log(result); // 'tryfinally' bo'lishi kerak\n",
      hint: "Finally bloki xato bo'lishi yoki bo'lmasligidan qat'iy nazar ishlaydi.",
      test: "if (logs.includes('tryfinally')) return null; return 'Finally bloki noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Input Validation",
      instruction: "'divide(a, b)' funksiyasini yarating. Agar b === 0 bo'lsa, xato throw qiling.",
      startingCode: "// divide funksiyasini yozing\n\ntry {\n  console.log(divide(10, 0));\n} catch (e) {\n  console.log('Xato: ' + e.message);\n}\n",
      hint: "function divide(a, b) { if (b === 0) throw new Error('Nolga bo\\'lish mumkin emas'); return a / b; }",
      test: "if (code.includes('throw') && code.includes('b === 0')) return null; return 'Validation noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Error Turi Tekshirish",
      instruction: "Xato sodir bo'lganda, error.name'ni konsolga chiqarip error turini aniqlang.",
      startingCode: "try {\n  JSON.parse('{invalid}');\n} catch (err) {\n  // Bu yerga yozing - error.name chiqaring\n}\n",
      hint: "console.log(err.name); // 'SyntaxError'",
      test: "if (logs.includes('SyntaxError')) return null; return 'Error type noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Nested Try-Catch",
      instruction: "Ichma-ich try-catch (try ichida catch, keyin yana try-catch) qiling.",
      startingCode: "let result = '';\ntry {\n  try {\n    throw new Error('Inner');\n  } catch (e) {\n    result += 'inner ';\n    throw new Error('Rethrow');\n  }\n} catch (e) {\n  result += 'outer';\n}\nconsole.log(result); // 'inner outer' bo'lishi kerak\n",
      hint: "Ichki catch'da throw qilish tashqi catch'ga o'tadi.",
      test: "if (logs.includes('inner outer')) return null; return 'Nested try-catch noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Typeof Check",
      instruction: "'getData()' funksiyasini yarating. Parametrni tekshirb, raqam bo'lmasa TypeError throw qiling.",
      startingCode: "// getData funksiyasini yozing\n\ntry {\n  getData('string'); // Xato\n} catch (e) {\n  console.log(e.message);\n}\n",
      hint: "if (typeof param !== 'number') throw new TypeError('Raqam kiritish kerak');",
      test: "if (code.includes('typeof') && code.includes('TypeError')) return null; return 'Type check noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Custom Error Klass",
      instruction: "ValidationError klass yarating, extends Error orqali. Matn berib throw qiling.",
      startingCode: "// ValidationError klassini yozing\n\nclass ValidationError extends Error {\n  // Bu yerga yozing\n}\n\ntry {\n  throw new ValidationError('Email noto\\'g\\'ri');\n} catch (e) {\n  console.log(e.name); // 'ValidationError' bo'lishi kerak\n}\n",
      hint: "constructor(message) { super(message); this.name = 'ValidationError'; }",
      test: "if (code.includes('extends Error') && logs.includes('ValidationError')) return null; return 'Custom error noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Error Filtering",
      instruction: "Catch qilingan xatoning turini tekshirib, turga qarab boshqacha qayta joylashtiring.",
      startingCode: "let message = '';\ntry {\n  throw new TypeError('Xato');\n} catch (err) {\n  if (err instanceof TypeError) {\n    message = 'TypeError';\n  } else if (err instanceof Error) {\n    message = 'Other error';\n  }\n}\nconsole.log(message); // 'TypeError' bo'lishi kerak\n",
      hint: "instanceof operatori orqali error turini tekshiring.",
      test: "if (logs.includes('TypeError')) return null; return 'Error filtering noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Default Qiymat bilan Error Handling",
      instruction: "Funksiya parametrini parse qiling. Xato bo'lsa, default qiymatni qaytaring.",
      startingCode: "function parseAge(ageStr) {\n  try {\n    const age = parseInt(ageStr);\n    if (isNaN(age)) throw new Error('Age raqam emas');\n    return age;\n  } catch (e) {\n    return 0; // Default qiymat\n  }\n}\n\nconsole.log(parseAge('abc')); // 0\nconsole.log(parseAge('25')); // 25\n",
      hint: "Catch blokida default qiymatni qaytaring.",
      test: "if (logs.includes('0') && logs.includes('25')) return null; return 'Default qiymat noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - API Response Handling",
      instruction: "'fetchUser(id)' funksiyasini yarating. ID raqam bo'lmasa throw, response'ni parse qilganda xato bo'lsa catch qiling, finally'da 'completed' chiqarsin.",
      startingCode: "// fetchUser funksiyasini yozing\n\nasync function fetchUser(id) {\n  try {\n    if (typeof id !== 'number') throw new Error('ID raqam kerak');\n    // Simulated response\n    const response = '{\"name\": \"Ali\"}';\n    const data = JSON.parse(response);\n    return data;\n  } catch (err) {\n    console.log('Error: ' + err.message);\n  } finally {\n    console.log('completed');\n  }\n}\n\nfetchUser('invalid');\n",
      hint: "Try ichida type tekshir, catch'da handle qil, finally'da hasti qil.",
      test: "if (code.includes('try') && code.includes('catch') && code.includes('finally') && logs.includes('completed')) return null; return 'Kompleks error handling noto\\'g\\'ri';"
    }
  ]
};
