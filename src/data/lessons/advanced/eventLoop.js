export const eventLoopLesson = {
  id: "a9",
  title: "Event Loop (Hodisalar sikli)",
  theory: `## Event Loop – JavaScript qanday ishlaydi?

JavaScript **single-threaded** (bir ipda) ishlaydi. Bir vaqtning o‘zida faqat bitta ishni bajaradi. Ammo asinxron amallarni (timer, API so'rovlar) **Event Loop** mexanizmi orqali boshqaradi.

---

### 1. Asosiy komponentlar
- **Call Stack:** Bajarilayotgan funksiyalar steki.
- **Web APIs:** Brauzer tomonidan ta'minlanadigan vositalar (setTimeout, fetch, DOM).
- **Task Queue (Macrotask):** setTimeout, setInterval kabi vazifalar navbati.
- **Microtask Queue:** Promise (.then), queueMicrotask kabi yuqori prioritetli vazifalar.

### 2. Ishlash tartibi
1. Call Stack’dagi barcha sinxron kod bajariladi.
2. Stack bo‘shagach, Event Loop **microtask queue**ni to‘liq bo‘shatadi.
3. Keyin **macrotask queue**dan **bitta** vazifani olib stackga qo‘yadi.
4. Jarayon takrorlanadi.

### 3. Microtask vs Macrotask
| Queue turi | Misollar | Prioriteti |
|------------|----------|-------------|
| **Microtask** | Promise.then, MutationObserver | Yuqori |
| **Macrotask** | setTimeout, setInterval, UI Rendering | Past |

\`\`\`javascript
console.log("1"); 
setTimeout(() => console.log("2"), 0); 
Promise.resolve().then(() => console.log("3")); 
console.log("4");

// Natija: 1, 4, 3, 2
\`\`\`

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **Event Loop nima va u nima uchun kerak?**
2. **Microtask va Macrotask o'rtasidagi farq nima?**
3. **setTimeout(fn, 0) darhol ishlaydimi?**

### Middle daraja
4. **Event Loop UI rendering bilan qanday bog'liq?**
5. **Nima uchun uzoq davom etuvchi sinxron kod (masalan, cheksiz loop) brauzerni qotirib qo'yadi?**
6. **Microtask ichida yana microtask qo'shilsa nima bo'ladi?**`,
  task: `// 1. Quyidagi kod natijasini taxmin qiling va tekshiring:
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// 2. Microtask queue'ni band qiluvchi kod yozing (masalan, Promise zanjiri).
// 3. setTimeout va Promise.then yordamida "1, 3, 2" tartibida chiqadigan kod yozing.
// 4. async/await ishlatilgan holda Event Loop tartibini tahlil qiling:
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
// test(); console.log("C");

// Kodingizni shu yerga yozing`,
  hint: `// 1. Result: Start, End, Promise, Timeout

// 3. Sequence
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));

// 4. Async await
// A chiqadi, keyin await tufayli qolgan qismi microtaskka o'tadi. 
// Shuning uchun C birinchi chiqishi mumkin (test() chaqirilgandan keyin).`
};
