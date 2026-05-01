export const memoryManagement = {
  id: "a16",
  title: "Memory Management (Xotira boshqaruvi)",
  theory: `## 1. KIRISH
Dastur qancha ko'p xotira (RAM) ishlatsa, u shunchalik sekinlashadi va oxir-oqibat "qotib" qoladi. JavaScriptda xotira boshqaruvi avtomatlashtirilgan, lekin bu biz uni tushunmasligimiz kerak degani emas.

## 2. TUSHUNCHA

### Garbage Collection (Chiqindilarni yig'ish)
JavaScript ishlatilmayotgan xotirani avtomatik ravishda bo'shatadi. Buning uchun asosiy algoritm - **Mark-and-Sweep** ishlatiladi.
**Sodda ta'rif:** Agar biror obyektga hech qanday yo'l (ko'rsatkich) qolmagan bo'lsa, u "chiqindi" deb hisoblanadi va o'chiriladi.

### Memory Leaks (Xotira oqishi)
Dasturchi e'tiborsizligi tufayli xotira bo'shamay qolishi. Bu dasturning vaqt o'tishi bilan ko'p RAM yeyishiga sabab bo'ladi.

---

## 3. ASOSIY SABABLAR (Memory Leaks)

### 1. Global o'zgaruvchilar
\`var\` yoki kalit so'zsiz yaratilgan o'zgaruvchilar window obyektiga birikib qoladi va hech qachon o'chmaydi.

### 2. Unutilgan taymerlar
\`setInterval\` ishga tushirilsa va to'xtatish unutilsa, u ichidagi obyektlarni xotirada ushlab turadi.

### 3. Closure (Yashirin bog'lanish)
Ichki funksiya tashqi funksiyaning katta obyektini keraksiz bo'lsa ham ushlab turishi mumkin.

---

## 4. VIZUAL TUSHUNTIRISH
### Mark-and-Sweep Algoritmi
\`\`\`mermaid
graph TD
    Root[Root: window/global] --> A[Obyekt A]
    Root --> B[Obyekt B]
    A --> C[Obyekt C]
    D[Obyekt D: Bog'lanmagan] -- X --▶ Root
    E[Obyekt E: Bog'lanmagan] -- X --▶ Root
    style D fill:#f66,stroke:#333
    style E fill:#f66,stroke:#333
\`\`\`
*Qizil obyektlar navbatdagi "chiqindi yig'ish" paytida o'chiriladi.*

---

## 5. INTERVYU SAVOLLARI
1. **Garbage Collection qanday ishlaydi?** - Mark-and-Sweep algoritmi yordamida "root" obyektidan yetib bo'lmaydigan obyektlarni topadi va o'chiradi.
2. **WeakMap va WeakSet nima uchun kerak?** - Ular obyektlarga "kuchsiz" bog'lanadi, bu esa Garbage Collectorga o'sha obyektlarni bemalol o'chirishga imkon beradi.
3. **Memory Leakni qanday topish mumkin?** - Brauzerning **DevTools -> Memory** bo'limida "Heap Snapshot" olish orqali.

---

## 6. MINI LOYIHA: "Leak Detector"
**Vazifa:** Taymerni to'g'ri to'xtatish orqali xotira oqishini oldini oling.

\`\`\`javascript
function startWork() {
  const bigData = new Array(1000000).fill("💾");
  const interval = setInterval(() => {
    console.log("Ishlayapti...");
  }, 1000);

  // 5 soniyadan keyin to'xtatish shart!
  setTimeout(() => {
    clearInterval(interval);
    console.log("Xotira bo'shatildi");
  }, 5000);
}
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Intervalni to'xtatish",
      instruction: "setInterval() funksiyasini to'xtatuvchi kalit funksiyani yozing.",
      startingCode: "const id = setInterval(() => {}, 1000);\n// Bu yerda to'xtating\n",
      hint: "clearInterval(id)",
      test: "if (code.includes('clearInterval')) return null; return 'clearInterval ishlatilishi shart';"
    }
  ]
};
