export const closuresLesson = {
  id: "closures",
  title: "Closures (Yopilishlar)",
  level: "Murakkab",
  description: "JavaScriptning eng sehrli va kuchli xususiyati - funksiyalarning 'eslab qolish' qobiliyati.",
  theory: `
# Closures – Bu nima va nima uchun kerak?

**Closure** — bu funksiyaning o'zi yaratilgan muhitni (o'zgaruvchilarni) "eslab qolish" qobiliyatidir. Tashqi funksiya o'z ishini tugatib bo'lsa ham, ichki funksiya uning o'zgaruvchilaridan foydalana oladi.

## 1. NEGA kerak?
Tasavvur qiling, sizga bir hisoblagich (counter) kerak. Agar siz o'zgaruvchini global qilib yaratsangiz, uni istalgan kod o'zgartirib yuborishi mumkin. Closure yordamida biz o'zgaruvchini funksiya ichiga "yashirib" (private), faqat o'zimiz xohlagan yo'l bilan o'zgartirishimiz mumkin.

## 2. SODDALIK (Analogiya)
Buni xuddi "fotoapparat" deb tasavvur qiling. Tashqi funksiya ishlaganda u o'sha vaqtdagi muhitni "rasmga olib qo'yadi". Ichki funksiya esa qachon chaqirilishidan qat'iy nazar o'sha "rasm"dagi (muhitdagi) o'zgaruvchilarni ko'ra oladi.

## 3. STRUKTURA

### A. Oddiy Closure
\`\`\`javascript
function tashqi() {
  let ism = "Farhod";
  return function ichki() {
    console.log("Salom, " + ism);
  }
}
const salom = tashqi();
salom(); // Salom, Farhod (tashqi funksiya tugagan bo'lsa ham!)
\`\`\`

### B. Ma'lumotlarni yashirish (Encapsulation)
\`\`\`javascript
function createCounter() {
  let count = 0; // Bu o'zgaruvchi xavfsiz (private)
  return {
    oshir() { count++; return count; },
    kamaytir() { count--; return count; }
  };
}
const counter = createCounter();
console.log(counter.oshir()); // 1
console.log(counter.oshir()); // 2
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
function makeMultiplier(x) {
  return function(y) {
    return x * y;
  };
}
const double = makeMultiplier(2);
console.log(double(5)); // 10
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Xotira muammosi:** Closurelar o'zgaruvchilarni xotirada saqlab turadi. Agar juda ko'p keraksiz closurelar yaratsangiz, xotira to'lib qolishi mumkin (Memory Leak).
2.  **Loop ichida closure:** \`var\` ishlatsangiz, barcha taymerlar oxirgi qiymatni chiqaradi. \`let\` bu muammoni hal qiladi.

## 6. SAVOLLAR (12 ta)
1. Closure (Yopilish) nima?
2. Ichki funksiya tashqi o'zgaruvchini qanday eslab qoladi?
3. Lexical Environment nima?
4. Closure nima uchun "Private" o'zgaruvchilar yasashda kerak?
5. Tashqi funksiya ishini tugatsa, uning o'zgaruvchilari o'chib ketadimi?
6. Closure xotiraga qanday ta'sir qiladi?
7. \`let\` va \`var\`ning closure bilan bog'liq farqi nima?
8. Closure ishlatilgan real misol keltiring.
9. Funksiya fabrikasi (Function factory) nima?
10. Har doim funksiya ichida funksiya bo'lsa closure bo'ladimi?
11. Closureni qanday qilib "tozalash" (delete) mumkin?
12. Closure Senior intervyularida nega ko'p so'raladi?`,
  exercises: [
    {
      id: 1,
      title: "Counter yaratish",
      instruction: "Ichki o'zgaruvchini oshiradigan funksiya qaytaruvchi 'counter' funksiyasini yozing.",
      startingCode: "function createCounter() {\n  let count = 0;\n  // Funksiya qaytaring\n}\nconst c = createCounter();",
      hint: "return () => ++count;",
      test: "if (typeof c === 'function' && c() === 1) return null; return 'Counter noto\\'g\\'ri';"
    }
  ]
};
