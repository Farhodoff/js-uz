export const memoryManagement = {
  id: "memory-management",
  title: "Memory Management (Xotira boshqaruvi)",
  level: "Advanced",
  description: "JavaScript xotirani qanday boshqaradi va 'Memory Leak' (Xotira oqishi) nima?",
  theory: `
# Memory Management – Bu nima va nima uchun kerak?

Dastur qancha ko'p xotira (RAM) ishlatsa, u shunchalik sekinlashadi va oxir-oqibat "qotib" qoladi. JavaScriptda xotira boshqaruvi avtomatlashtirilgan, lekin biz uni qanday ishlashini bilishimiz shart.

## 1. NEGA kerak?
Agar biz xotira qanday ishlashini tushunmasak, bilmasdan "Memory Leak" (xotira oqishi) yaratib qo'yamiz. Bu dasturimizning vaqt o'tishi bilan ko'proq RAM yeyishiga va foydalanuvchi kompyuterini sekinlashtirishiga olib keladi.

## 2. SODDALIK (Analogiya)
Buni **ijaraga olingan uy** deb tasavvur qiling:
1. Siz uyga ko'chib kirasiz (Xotira ajratish - Allocation).
2. Uyda yashaysiz (Ma'lumotlarni ishlatish).
3. Uydan ko'chib ketasiz va kalitni topshirasiz (Xotirani bo'shatish - Release).
Agar siz ko'chib ketsangiz-u, lekin "kalitni topshirmasangiz", u uy band bo'lib turaveradi. Bu — Memory Leak.

## 3. STRUKTURA

### A. Garbage Collection (Chiqindi yig'uvchi)
JavaScriptda **Garbage Collector** bor. U kodingizda ishlatilmayotgan (hech kim unga murojaat qilmayotgan) obyektlarni qidiradi va ularni o'chirib, xotirani bo'shatadi. Eng ko'p ishlatiladigan algoritm: **Mark-and-Sweep**.

### B. Memory Leak sabablari
1. **Global o'zgaruvchilar:** Unutilgan \`var\`lar xotirada doimiy qoladi.
2. **Unutilgan Taymerlar:** \`setInterval\`ni to'xtatmasangiz, u ichidagi hamma narsani xotirada ushlab turadi.
3. **Closures:** Keraksiz closurelar katta ma'lumotlarni xotirada qulflab qo'yishi mumkin.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
function createLeak() {
  const bigArray = new Array(1000000).fill("📦"); // Katta ma'lumot
  return () => console.log(bigArray.length); // Closure orqali xotirada qoladi
}
const leak = createLeak();
// leak o'zgaruvchisi ochiq tursa, bigArray o'chmaydi.
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **EventListener'larni o'chirmaslik:** Element o'chib ketgan bo'lsa ham, unga biriktirilgan listener xotirada qolishi mumkin.
2. **Katta massivlarni globalda saqlash:** Ma'lumot kerak bo'lmaganda uni \`null\` qilib qo'yishni unutmang.

## 6. SAVOLLAR (12 ta)
1. Memory Management nima?
2. Garbage Collector nima ish qiladi?
3. Allocation (Ajratish) va Release (Bo'shatish) nima?
4. Mark-and-Sweep algoritmi qanday ishlaydi?
5. Memory Leak (Xotira oqishi) nima?
6. Nima uchun global o'zgaruvchilar xotira uchun xavfli?
7. \`setInterval\` qanday qilib memory leakka sabab bo'lishi mumkin?
8. Closure xotiraga qanday ta'sir qiladi?
9. "Root" obyekt degani nima (\`window\`)?
10. Obyektga bo'lgan bog'liqlik (reference) qolmasa nima bo'ladi?
11. Memory Leakni brauzerda qanday aniqlash mumkin (Chrome DevTools)?
12. \`WeakMap\` va \`WeakSet\` xotira uchun qanday foyda beradi?`,
  exercises: [
    {
      id: 1,
      title: "Xotira mashqi",
      instruction: "Intervalni to'xtatish orqali xotira oqishining oldini oling.",
      startingCode: "const id = setInterval(() => {}, 1000);\n// Bu yerda to'xtating",
      hint: "clearInterval(id);",
      test: "if (code.includes('clearInterval')) return null; return 'clearInterval ishlatilmadi';"
    }
  ]
};
