export const eventLoopDeep = {
  id: "a12",
  title: "Event Loop (Deep Dive)",
  theory: `## 1. KIRISH
Nima uchun JavaScript bir vaqtda faqat bitta ishni bajara olsa ham (Single Threaded), u qotib qolmasdan minglab foydalanuvchilarga xizmat ko'rsata oladi? Javob - **Event Loop**.

Ushbu darsda biz JavaScriptning "kapoti" ostiga kirib, u asinxron kodni qanday boshqarishini o'rganamiz.

## 2. TUSHUNCHA

### Call Stack
Hozirda ishlayotgan funksiyalar navbati. LIFO (Last In, First Out) tamoyili asosida ishlaydi.
**Metafora:** Likopchalar to'plami - oxirgi qo'yilgani birinchi olinadi.

### Task Queue (Macrotasks)
\`setTimeout\`, \`setInterval\` kabi amallar natijasi shu yerda navbat kutadi.

### Microtask Queue
\`Promises\`, \`queueMicrotask\` va \`MutationObserver\`. Bu navbat **hammasidan ustun** turadi!

---

## 3. KOD MISOLLARI

### Misol 1 — Tartibni aniqlash
**Maqsad:** Call Stack, Microtask va Macrotask navbatini ko'rsatish.
\`\`\`javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");

// NATIJA:
// 1. Start
// 4. End
// 3. Promise  (Microtask)
// 2. Timeout (Macrotask)
\`\`\`

**Nima bo'ldi:**
1. \`console.log\` (Synchronous) birinchi ishlaydi.
2. \`Promise\` (Microtask) navbatga qo'shiladi.
3. \`setTimeout\` (Macrotask) navbatga qo'shiladi.
4. Stack bo'shagach, avval hamma Microtasklar, keyin bitta Macrotask bajariladi.

---

## 4. VIZUAL TUSHUNTIRISH
### Event Loop Oqimi
\`\`\`
1. [Call Stack] dagi hamma sinxron kodni bajar.
2. [Microtask Queue] bo'shaguncha hammasini bajar (Promises).
3. [Render] kerak bo'lsa ekranni yangila.
4. [Task Queue] dan bitta Macrotaskni olib bajar (setTimeout).
5. 1-qadamga qayt. 🔄
\`\`\`

---

## 5. UMUMIY XATOLAR
### ❌ Stack Overflow
\`\`\`javascript
function recursive() {
  recursive(); // Cheksiz rekursiya
}
// Muammo: Call Stack to'lib ketadi va dastur to'xtaydi.
\`\`\`

---

## 6. INTERVYU SAVOLLARI (⭐ Top 3)
1. **Nima uchun Promise setTimeout'dan oldin ishlaydi?** - Chunki Promiselar Microtask queue ga tushadi va Event Loop ularni Macrotasklardan oldin bajaradi.
2. **Event Loop nima uchun kerak?** - JS single-threaded bo'lgani uchun asinxron amallarni (API so'rovlar, taymerlar) boshqarish uchun kerak.
3. **Microtask va Macrotask farqi?** - Microtasklar joriy stack bo'shashi bilan darhol bajariladi, Macrotasklar esa navbatdagi aylanishda.

---

## 7. MINI LOYIHA: "Execution Order Simulator"
**Vazifa:** Quyidagi kod natijasini bashorat qiling va sinab ko'ring.

\`\`\`javascript
console.log("A");

async function asyncFn() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}

asyncFn();

console.log("D");

// Kutilgan natija: A, B, D, C
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Microtask ustunligi",
      instruction: "Sinxron log, Promise va setTimeout'ni shunday yozingki, logda 1, 2, 3 chiqsin.",
      startingCode: "// Tartibni to'g'rilang\n",
      hint: "console.log(1); Promise.resolve().then(() => console.log(2)); setTimeout(() => console.log(3));",
      test: "if (logs[0] === '1' && logs[1] === '2' && logs[2] === '3') return null; return 'Tartib: 1 (Sync), 2 (Promise), 3 (Timeout)';"
    }
  ]
};
