# 📚 Error Handling — Custom Error, Error Types, Debugging usullari — O'rta daraja

## 📦 Tushunchalarning sodda izohi

JavaScriptda xatolar `throw` orqali yuz beradi — yoki JS engine, yoki siz o'zingiz. Xato ushlab olish `try/catch`, yoki "unhandled" bo'lsa — console xatosi (bu "catch" bo'lmagan holat).

- **Asosiy Error turlari (built-in):**
  - `Error` — asosiy (base), umumiy xato
  - `TypeError` — noto'g'ri tip (masalan, `null.someMethod()`)
  - `ReferenceError` — o'zgaruvchi mavjud emas
  - `SyntaxError` — sintaksis noto'g'ri (eval yoki JSON.parse)
  - `RangeError` — cheklov ostida (masalan, `new Array(-1)`, recursion limit)
  - `URIError` — URL bilan ishlashda (encodeURI, decodeURI)
  - `EvalError` — eski, eval bilan (hozir kam qo'llaniladi)
- **`throw` operatori** — xato yuboradi: `throw new Error("xato");` yoki `throw new TypeError("...");` yoki `throw "string";` (siz tanlash, lekin obyekt tavsiya).
- **`try / catch / finally`:**
  - `try { ... }` — xato bo'lishi mumkin bo'lgan kod
  - `catch (err) { ... }` — xato ketganida ishga tushadi (`err` xato obyekti)
  - `finally { ... }` — xato bo'lsa ham, bo'lmasa ham har doim ishga tushadi (todel, tozalash)
- **Xato obyekti xususiyatlari:** `err.message`, `err.name`, `err.stack` (stack trace), `err.cause` (agar `new Error("...", { cause: ... })`).
- **Custom Error (O'z xato turi):** `class ValidationError extends Error { ... }` — siz o'zingiz xato turi yaratishingiz mumkin. `super(message)` bilan `this.name = "ValidationError"` yoki boshqa.
- **Xatoni qayta yuborish (rethrowing):** `catch` ichida `throw err;` — xato boshqa try/catch ga o'tadi. Yoki `throw new Error("...")` — yangi xato yaratish.
- **Promise xatoni (unhandled rejection):** Promise reject,qachon `catch` bo'lmasa — "Uncaught (in promise)" xatosi. `window.addEventListener("unhandledrejection", ...)` yordamida ushlab olish.
- **Debugging usullari:**
  - `console.error`, `console.warn`, `console.info`, `console.log`
  - `console.trace()` — stack trace ko'rsatadi
  - `console.table(data)` — jadval ko'rinishida
  - `console.time(label)` / `console.timeEnd(label)` — vaqt o'lchash
  - `console.assert(condition, "message")` — shart `false` bo'lsa chiqaradi
  - `debugger;` — brauzerda breakpoint (DevTools ochilgan bo'lsa)
  - Stack trace (`err.stack`) orqali qayerdan kelib chiqqanini aniqlash
  - Browser DevTools: Breakpoints, Step Over/Into, Watch, Console

*Oddiy misol:* `try { JSON.parse(invalidJson); } catch (e) { console.error("Parsing xato:", e.message); } finally { console.log("Har doim"); }`

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. ASOSIY try/catch/finally
try {
  const result = JSON.parse(invalidJson);
  console.log(result);
} catch (error) {
  console.error("Parsing xato:", error.message);
} finally {
  console.log("Finally — har doim ishga tushadi");
}
// Xato bo'lmagan holatda ham finally ishga tushadi

// 2. CUSTOM ERROR — o'z xato turi
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
function validateUser(user) {
  if (!user.email) {
    throw new ValidationError("Email kerak", "email");
  }
  if (!user.name) {
    throw new ValidationError("Ism kerak", "name");
  }
}
try {
  validateUser({});
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`Validatsiya xatosi (${err.field}): ${err.message}`);
  } else {
    console.error("Boshqa xato:", err);
  }
}

// 3. Error cause — sababi saqlash (ES2022)
class ApiError extends Error {
  constructor(message, statusCode, cause) {
    super(message, { cause }); // cause = { cause: ... }
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new ApiError("API xatosi", res.status, new Error(res.statusText));
    return res.json();
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(`API ${err.statusCode}: ${err.message}`);
      console.error("Sababi:", err.cause?.message);
    }
    throw err;
  }
}
```

```javascript
// 4. XATO turlarini ajratish
try {
  someDangerousCode();
} catch (err) {
  if (err instanceof TypeError) {
    console.error("Tip xatosi:", err.message);
  } else if (err instanceof ReferenceError) {
    console.error("O'zgaruvchi yo'q:", err.message);
  } else if (err instanceof RangeError) {
    console.error("Cheklov xatosi:", err.message);
  } else {
    console.error("Boshqa xato:", err);
  }
}

// 5. RETRY (qayta urinish) — asinxron
async function retry(fn, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err; // oxirgi marta — xato yubor
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

// 6. Debugging usullari
function compute(a, b) {
  console.log("compute input:", a, b);
  console.group("compute");
  console.info("a =", a, "b =", b);
  console.warn("b noldan farqli ekanligini tekshiring", b === 0);
  console.assert(b !== 0, "b nolga teng bo'lmasligi kerak");
  console.time("compute time");
  const result = a / b;
  console.table({ a, b, result });
  console.timeEnd("compute time");
  console.groupEnd();
  return result;
}

// debugger; // brauzerda breakpoint

// 7. Global error yoki unhandled rejection ushlab olish
window.addEventListener("error", (event) => {
  console.error("Global xato:", event.message, event.filename, event.lineno);
  // error reporting yoki logging
});
window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise unhandled rejection:", event.reason);
  // logging
});
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: catch bo'lmagan throw — hech qanday ushlanmagan
function bad() {
  throw new Error("Bu catch bo'lmagan xato");
}
bad(); // Uncaught (in promise) Error — brauzerda kirmaydi (legacy console)

// XATO 2: catch ichida catch orqali xato yoki catch ichida xato throw qilmagan
try {
  // ...
} catch (err) {
  console.error("Xato", err);
  // catch ichida qayta throw qilmagan — xato "use" bo'lmagan
}

// XATO 3: String xato yoki rang tug'ri Emas
throw "Bu xato string — odatda Error obyekti tavsiya";
throw 404; // raqam
// Bu yomon, chunki stack trace yo'q, type aniq emas

// XATO 4: try/catch ichida finally ichida xato qayta yuritish
try {
  console.log("try");
} catch (err) {
  console.log("catch");
} finally {
  throw new Error("finally ichida xato"); // catch orqali ushlanadi, lekin bu confusion
}

// XATO 5: catch bo'lmagan Promise rejection
async function badAsync() {
  await Promise.reject(new Error("Rejection without catch"));
}
badAsync(); // Uncaught (in promise) — brauzerda kirmaydi, lekin "Uncaught" console xatosi

// XATO 6: try/catch orqali "catch" orqali try/catch yangi try/catch
try {
  try {
    risky();
  } catch (inner) {
    // inner xatosini qayta yuritish — asosiysi buyruqlash
  }
} catch (outer) {
  // outer catch orqali inner xato yuritish — chaining
}

// XATO 7: debugger yoki console.logging yuqori — "Hamming"
function oldDebug() {
  console.log("1");
  console.log("2");
  console.log("3");
  // yuqori — logging hammasini, debugging murakkab
}
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **try/catch/finally** — xato catch qilinganda finally har doim
- **Custom Error subtypes** — `class X extends Error` — `.name`, `.field` yoyish
- **Error cause** — `throw new Error("main", { cause: innerError })` — sabab saqlash
- **Xato turi ajratish** — `instanceof TypeError`, `instanceof ReferenceError` orqali
- **Xatoni qayta yuborish (rethrowing)** — `catch` ichida `throw err;` — boshqa try/catch ga o'tadi
- **Debugging:** `console.trace()`, `console.table()`, `console.time()`, `console.assert()`, `debugger;`
- **Global error handler** — `window.addEventListener("error", ...)` yoki `"unhandledrejection"`
- **Stack trace o'qish** — `err.stack` yordamida qayerdan kelib chiqqanini aniqlash

### ❌ Noto'g'ri:

- **catch bo'lmagan throw** — "Uncaught" xato, hech qanday yordam yo'q
- **catch orqali xato yuritmagan** — xato "use" bo'lmasa, unda xato hech qanday ishga tushishdan so'ng oqib ketadi
- **String yoki raqamli throw** — stack trace yo'q, type aniq emas
- **finally ichida xato yuritish** — confusion, catch orqali ushlanadi, lekin murakkab
- **catch bo'lmagan Promise rejection** — "Uncaught (in promise)"
- **try/catch orqali try/catch** — chaining yoki nesting — murakkab
- **Yuqori console logging** — "Hamming" — debugging murakkab, `console.trace` yoki `debugger` yoki breakpoint yordamida

## 🎩 Hayotiy o'xshatishlar

- **try/catch/finally:** Darvozani ochish (try), xato yuz berganida "qafasga tushgan" (catch), va "todel" (finally) — xato bo'lsa ham, bo'lmasa ham har doim. Masalan: `file.open()` → `try { read } catch (error) { log error } finally { file.close() }` — file har doim yopiladi.
- **Custom Error:** Doctor xato turi — "Orey", "Xuruj", "Emergency". Har biri o'z belgilari (masalan, "Emergency" da "patient" yoki "call"). Xato turi orqali javob berish (masalan, "Oreyda" qanday qilish, "Xurujda" qanday).
- **Error cause:** Duch kelish — "asosiysi sabab" (sabab): "Server down" → "Internet yo'q". Xato obyekti `cause` orqali ichki xato obyekti saqlaydi (masalan, `new Error("API error", { cause: new Error("Network XY" })`).
- **Stack trace:** "Yo'nalishlar ro'yxati" — xatovor yuz bersa, stack trace "qaysi funksiya qayerda chaqirilgan" ko'rsatadi. Debugging.
- **Global error event:** "Xelqaro xatovor" — "barcha xatovorlar" global catch (analytics, logging).

## 📊 Mermaid diagramma

```mermaid
flowchart TD
    A[ try { ruhsatsiz } ] --> B{ Xato yuz berdimi? }
    B -->|Yo'q| C[ finally { cleanup } ]
    B -->|Ha| D[ catch (err) ]
    D --> E{ Xato turi? }
    E --> E1[ instanceof ReferenceError/TypeError/RangeError/SyntaxError ]
    E --> E2[ instanceof ValidationError (custom) ]
    E --> E3[ Generic Error ]
    E1 --> F1[ Xato turi bo'yicha qo'llab-quvvatlash ]
    E2 --> F2[ Custom Error field/status/cause ]
    E3 --> F3[ Generic catch or qayta throw ]
    F1 --> G[ finally { cleanup } ]
    F2 --> G
    F3 --> G
    G --> H[ Xato "unhandled" emas ]
    
    style D fill:#fff3e0,stroke:#e65100
    style E fill:#e3f2fd,stroke:#1976d2
    style G fill:#e8f5e9,stroke:#2e7d32
```

**Diagrama tushuntirishi:** Error handling flow:
1. `try` ichida code execution — xatovor yuz bermasligi kerak.
2. Xatovor yuz bermasligi — `finally` cleanup.
3. Xatovor yuz bermasa — `catch (err)` — catch holding (xata obyekt).
4. `err` instanceof Error turi (ReferenceError, TypeError, RangeError, SyntaxError) yoki Custom Error (ValidationError).
5. Error e'lon qilinmaslik — generic catch yoki rethrowing (catch ichida throw).
6. `finally` — har doim.

## 🎙 Intervyu savollari va javoblari

### 1. `try/catch/finally` ishlashini tushuntiring. `finally` qachon ishga tushadi?

**Javob:** `try { ... } catch (err) { ... } finally { ... }` — `try` ichida xato yuz bermasa — `catch` ishga tushmaydi, `finally` har doim ishga tushadi. Xatovor yuz bermasa — `catch (err)` chaqirilmaydi, finally tugashdan keyin. Xatovor yuz bermasa — `catch (err)` chaqiriladi, catch tugashidan keyin finally. finally — try yoki catch tugashidan (har doim). Shunday qilib, try/catch/finally — error xato to'g'ri boshqarish.

### 2. JavaScript Error turlarini ro'yxatlang.

**Javob:** Standard Error types: `Error` (base), `TypeError` (noto'g'ri tip — `null.prop`), `ReferenceError` (o'zgaruvchi yo'q — `console.log(x)` — x aniqlanmagan), `SyntaxError` (sintaksis — `eval("invalid")` yoki JSON.parse), `RangeError` (cheklov — `new Array(-1)`, recursion limit), `URIError` (URL — `decodeURI("%ZZ")`), `EvalError` (eski `eval` bilan — hozir kam). Har biri `instanceof Error` orqali aniqlanadi.

### 3. Custom Error yaratish qanday? Misol yozing.

**Javob:** `class CustomError extends Error { constructor(message, extra) { super(message); this.name = "CustomError"; this.extra = extra; } }`. Misol:
```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
```
`instanceof ValidationError` orqali ajratiladi. `err.field` orqali qaysi maydon xato ekanligi.

### 4. Error cause nima va qachon foydali?

**Javob:** `cause` — `Error` `cause` — options.cause (zamanaviy — ES2022). Xatovor "boshqa xatovor" sig'imi (inner error). Masalan: `ApiError` — "Request failed" — `cause: new Error('Network error')`. Shunday qilib, xatovor yuz berish sababi (inner error) saqlash. Debugging yoki logChain.

### 5. Rethrowing nima?

**Javob:** Rethrowing — catch ichida xato qayta "throw" qilish (yuqoriga yoki catch qilingan joyga). Shunday qilib, catch boshqa area-da buyuk catch. Misol: try { inner() } catch (e) { if (e instanceof ValidationError) handle; else throw e; }. Shunday qilib, catch boshqa xatovorni qayta yuborish (rethrowing).

### 6. Promise error handling qanday?

**Javob:** Promise reject bo'ldi, catch yo'q — "Uncaught (in promise)". Shunday qilib, `.catch(err => ...)` yoki `try/catch` (async funksiya). Har doim catch yoki unhandledrejection event. Shunday qilib, Promise error handling — catch yoki rethrowing.

### 7. `console.trace`, `console.assert`, `console.table` qanday?

**Javob:** `console.trace()` — stack trace (qayerdan call gan). `console.assert(condition, message)` — condition false bo'lsa — message log (assertion error). `console.table(obj)` — tabular (object/array). Shunday qilib, debugging — trace, assert, table (tashqi look).

### 8. `window.addEventListener('error', ...)` global xata qanday?

**Javob:** `window.addEventListener('error', (e) => { ... })` — global uncaught error (console error qilmagan holda). e.message, e.filename, e.lineno, e.colno, e.error (Error obyekt). Shunday qilib, analytics logging yoki fallback. Shunday qilib, global error catch — barcha xatovorlar. Shunday qilib, `unhandledrejection` (Promise).

### 9. catch boshqa catch bo'lishi mumkin yoki catch ichida catch qurish mumkin?

**Javob:** catch ichida catch qurish mumkin — xato (catch ichida xato qilinadi). Shunday qilib, catch nesting — xato. Yoki catch ichida rethrowing yoki catch qilingan joyga. Shunday qilib, catch nesting — yomon (mas'uliyat?). Shunday qilib, catch boshqa catch emas.

### 10. Debugging usullari qanday?

**Javob:** Debugging — `console.log`, `console.error`, `console.trace`, `console.assert`, `console.table`, `debugger` statement (DevTools breakpoint), browser DevTools (sources, breakpoints, step, watch, call stack, scope). Shunday qilib, stack trace (xato stack property), DevTools.

### 📌 Xulosa:

- try/catch/finally — error xato to'g'ri boshqarish.
- Error turlari: Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError, EvalError.
- Custom Error — extends Error — name, field, status, cause.
- Error cause — inner error saqlash.
- Rethrowing — catch ichida throw.
- Promise catch — `.catch()` yoki `try/catch`.
- Global error — `window.addEventListener('error', ...)` yoki `unhandledrejection`.
- Debugging — console.trace, assert, table, debugger, DevTools.
- Promise catch yo'q — "Uncaught (in promise)" — global handler yoki catch.
- Stack trace — `err.stack` — qayerdan kelib chiqqanini aniqlash.

---

**Keyingi darslar (o'rta daraja) — ketma-ketlik:**
1. ✅ Event Loop
2. ✅ Error Handling
3. **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying**
4. **this keyword — call, apply, bind, arrow functions, method borrowing**
5. **React Hooks — JS context bilan uyg'unlik (useState, useEffect, useContext)**
6. **TypeScript (tip, interface, type alias) — JS keyingi bosqich**

Qaysi mavzu keyingi? Raqam (3, 4, 5, 6) yoki nom. Yozayman.