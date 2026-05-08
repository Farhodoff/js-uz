# 📚 Kurs Darslarini Upgrade Qilish Ish Rejasi

**Maqsad:** Qolgan 15 ta darsni Farhodoff qoidalariga muvofiq chuqurlashtirish
- 70-80% Amaliyot + 20-30% Nazariya
- Har darsda 12 Q&A savol-javob
- Bosqichma-bosqich mashqlar (Boshlang'ich → Qiyin)
- Real hayotdagi misollar va edge cases

---

## 🔴 PHASE 1: CRITICAL (3 dars) - 1-2 hafta

### 1. This Keyword & Binding (`intermediate/thisKeyword.js`)
**Hozirgi holati:** Asosiy
**Kerak:**
- [ ] this binding rules (4 qoidasi)
- [ ] call(), apply(), bind() metodlari
- [ ] Arrow function this vs regular function
- [ ] Method context va standalone function
- [ ] 12 mashq: Simple → bind + event listeners
- [ ] 12 Q&A: Method calling, binding problems, edge cases

**Qo'shimcha:**
- Misol: Event listener with `this`
- Misol: Callback context muammosi
- Misol: bind() yordamida custom context

---

### 2. Objects Deep Dive (`beginner/objects.js`)
**Hozirgi holati:** Boshlang'ich (3-4 mashq)
**Kerak:**
- [ ] Object creation patterns (literal, constructor, Object.create)
- [ ] Object.keys(), Object.values(), Object.entries()
- [ ] Object.assign() - copying va merging
- [ ] Getters va Setters (get/set)
- [ ] Immutability patterns
- [ ] Property descriptors (writable, enumerable, configurable)
- [ ] 12 mashq: Simple objects → Complex patterns
- [ ] 12 Q&A: Copying (shallow vs deep), mutation, Object methods

**Qo'shimcha:**
- Misol: Shallow copy vs Deep copy
- Misol: Object merging
- Edge case: Circular references

---

### 3. Functions Mastery (`beginner/functions.js`)
**Hozirgi holati:** Asosiy (2-3 mashq)
**Kerak:**
- [ ] Function Declaration vs Expression vs Arrow
- [ ] Hoisting va Temporal Dead Zone
- [ ] Return statements va early returns
- [ ] Parameters: default, rest, destructured
- [ ] Function scope vs block scope
- [ ] IIFE pattern (Immediately Invoked)
- [ ] 12 mashq: Basic → Advanced patterns
- [ ] 12 Q&A: Hoisting, scope, declarations, arrow functions

**Qo'shimcha:**
- Misol: Function hoisting gotchas
- Misol: Default parameters
- Edge case: arguments object

---

## 🟡 PHASE 2: MODERN ES6 (3 dars) - 2-3 hafta

### 4. Destructuring Advanced (`intermediate/destructuring.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Array destructuring (basic, nested, rest)
- [ ] Object destructuring (basic, nested, rename, defaults)
- [ ] Function parameter destructuring
- [ ] Destructuring in loops (for...of)
- [ ] Practical use cases
- [ ] 12 mashq: Array → Object → Nested → Complex
- [ ] 12 Q&A: Defaults, rest, nested, common mistakes

**Qo'shimcha:**
- Misol: API response destructuring
- Misol: Function parameters as object
- Edge case: Undefined vs default values

---

### 5. Spread & Rest (`intermediate/spreadRest.js`)
**Hozirgi holati:** Asosiy (1-2 mashq)
**Kerak:**
- [ ] Spread for arrays (copying, merging, unpacking)
- [ ] Spread for objects (copying, merging, overriding)
- [ ] Rest parameters in functions (...args)
- [ ] Spread in function calls vs function definitions
- [ ] Combining with destructuring
- [ ] Performance considerations
- [ ] 12 mashq: Array spread → Object spread → Rest params
- [ ] 12 Q&A: Shallow copy, immutability, edge cases

**Qo'shimcha:**
- Misol: Immutable state updates
- Misol: Variadic functions
- Edge case: Nested spread

---

### 6. Arrow Functions Deep (`intermediate/arrowFunctions.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Syntax variations (implicit return, {})
- [ ] this binding (lexical scope)
- [ ] When NOT to use arrow functions
- [ ] Arrow functions in callbacks vs methods
- [ ] Currying with arrow functions
- [ ] 12 mashq: Basic → this binding → Complex patterns
- [ ] 12 Q&A: this context, implicit return, performance

**Qo'shimcha:**
- Misol: Event listener (arrow vs regular)
- Misol: Method context problems
- Edge case: Nested arrow functions

---

## 🔵 PHASE 3: REAL-WORLD (3 dars) - 3-4 hafta

### 7. Fetch API (`advanced/fetch.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Fetch basics (GET, POST, PUT, DELETE)
- [ ] Request headers va body
- [ ] Response handling (json, text, blob)
- [ ] Error handling (network vs HTTP errors)
- [ ] Async/await with fetch
- [ ] Request cancellation (AbortController)
- [ ] 12 mashq: GET → POST → Error handling → Advanced
- [ ] 12 Q&A: Status codes, CORS, cancellation

**Qo'shimcha:**
- Misol: Real API integration
- Misol: Retry logic
- Edge case: CORS errors

---

### 8. Error Handling (`advanced/errorHandling.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Try-catch-finally
- [ ] Error types (TypeError, ReferenceError, SyntaxError)
- [ ] Custom error classes
- [ ] Throwing vs catching
- [ ] Async/await error handling
- [ ] Global error handlers (window.onerror)
- [ ] 12 mashq: Basic try-catch → Custom errors → Async
- [ ] 12 Q&A: Error types, async errors, best practices

**Qo'shimcha:**
- Misol: Custom error classes
- Misol: Async error handling
- Edge case: Finally block execution order

---

### 9. DOM Manipulation (`intermediate/domManipulation.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Creating elements (createElement, innerHTML, textContent)
- [ ] Modifying elements (style, class, attributes)
- [ ] Removing elements (remove, removeChild)
- [ ] Cloning elements
- [ ] Document fragments (performance)
- [ ] Traversing DOM (parent, children, siblings)
- [ ] 12 mashq: Create → Modify → Remove → Complex
- [ ] 12 Q&A: Performance, innerHTML vs textContent, methods

**Qo'shimcha:**
- Misol: Dynamic form creation
- Misol: Bulk DOM updates with fragment
- Edge case: XSS prevention

---

## 🟢 PHASE 4: ADVANCED PATTERNS (3 dars) - 4-5 hafta

### 10. Functional Programming (`advanced/functionalProgramming.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Pure functions
- [ ] Higher-order functions (map, filter, reduce composition)
- [ ] Function composition
- [ ] Immutability principles
- [ ] Partial application va currying
- [ ] Pipe/compose utilities
- [ ] 12 mashq: Pure functions → Composition → Utilities
- [ ] 12 Q&A: Side effects, composition, immutability

**Qo'shimcha:**
- Misol: Real-world composition
- Misol: Custom compose function
- Edge case: Performance optimization

---

### 11. Regular Expressions (`advanced/regex.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] Basic regex patterns (characters, quantifiers, classes)
- [ ] Anchors (^, $, \b)
- [ ] Groups va capturing
- [ ] Lookahead/lookbehind
- [ ] String methods (match, replace, split)
- [ ] Performance considerations
- [ ] 12 mashq: Basic patterns → Complex → Real use cases
- [ ] 12 Q&A: Escaping, groups, performance

**Qo'shimcha:**
- Misol: Email validation
- Misol: String replacement
- Edge case: Regex performance

---

### 12. Modules (`advanced/modules.js`)
**Hozirgi holati:** Asosiy (2 mashq)
**Kerak:**
- [ ] CommonJS vs ES6 modules
- [ ] Import/export patterns (default, named)
- [ ] Module scope
- [ ] Circular dependencies
- [ ] Dynamic imports
- [ ] Bundling considerations
- [ ] 12 mashq: Basic imports → Advanced patterns
- [ ] 12 Q&A: Module systems, circular deps, best practices

**Qo'shimcha:**
- Misol: Module organization
- Misol: Lazy loading
- Edge case: Circular dependencies

---

## 🟣 PHASE 5: BONUS (3 dars) - 2-3 hafta (ixtiyoriy)

### 13. Performance Optimization (`advanced/performanceOptimization.js`)
- Debouncing va throttling deep dive
- Request optimization
- Memory optimization
- 12 mashq + 12 Q&A

### 14. Design Patterns (`advanced/designPatterns.js`)
- Singleton, Factory, Observer
- Pub/Sub pattern
- 12 mashq + 12 Q&A

### 15. Debugging (`advanced/debugging.js`)
- Browser DevTools
- Debugging strategies
- Common bugs patterns
- 12 mashq + 12 Q&A

---

## 📊 Jami Statistics (Barcha 15 ta dars)

| Metrika | Qiymat |
|---------|--------|
| **Jami mashqlar** | 180 (12×15) |
| **Jami Q&A** | 180 (12×15) |
| **Kod misollari** | 150+ |
| **Real-world examples** | 45+ |
| **Edge case boli'mlari** | 15 |
| **Tahmini vaqt** | 12-16 hafta |

---

## ✅ Har dars struktura (Template)

```javascript
export const lessonName = {
  id: "...",
  title: "📌 Title (Emoji + Eng + O'zbek)",
  level: "Boshlang'ich/O'rta/Murakkab",
  description: "1-2 jumlali tavsif",
  theory: `
## 📌 MAVZU — KURS DARAJASI

### 1. NEGA KERAK? (Sabab)
...

### 2. SODDALIK (Analogiya)
...

### 3. TUSHUNCHA (BATAFSIL)
...

### 4. ADVANCED TUSHUNCHALAR
...

### 5. REAL HAYOTDAGI MISOLLAR
...

### 6. 12 TA SAVOL VA JAVOBLAR
<details>
<summary>Savol 1</summary>
Javob 1
</details>
...
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Title (Boshlang'ich)",
      instruction: "...",
      startingCode: "...",
      hint: "...",
      test: "..."
    },
    // ... 11 ta ko'p mashq
  ]
}
```

---

## 🎯 Boshlash Qadamlari

1. **Phase 1 darslarni upgrade qil** (This, Objects, Functions)
2. **Build va test qil** `npm run build`
3. **Git commit qil** har dars uchun alohida
4. **Phase 2 ga o't** (Destructuring, Spread/Rest, Arrow)
5. **Davom et** (Phase 3, 4, 5)

---

## 🚀 Hali upgrade qilingan darslar:

✅ Array Metodlari (12 mashq + 12 Q&A)
✅ Closures & Scope (12 mashq + 12 Q&A)
✅ Callbacks → Promises → Async/Await (36 mashq + 36 Q&A)
✅ Prototypes & Classes (24 mashq + 24 Q&A)

**Jami:** 84 mashq, 84 Q&A ✨

---

**Oxirgi yangilangan:** 2026-05-08
**Holati:** Ishlanmoqda 🔄
