export const typeofLesson = {
  id: "b14",
  title: "typeof operatori",
  theory: `## typeof – Ma’lumot turini aniqlash

\`typeof\` – JavaScriptda operandning **ma’lumot turini** aniqlaydigan va natijani **string** sifatida qaytaradigan operator.

---

### Qaytariladigan qiymatlar:
| Qiymat | typeof natijasi |
|--------|-------------------|
| "salom" | "string" |
| 42, 3.14, NaN | "number" |
| true, false | "boolean" |
| undefined | "undefined" |
| **null** | **"object"** (Mashhur bug!) |
| {}, [], Date | "object" |
| function() {} | "function" |

### Muhim eslatmalar:
1. **typeof null === "object"**: Bu JavaScriptning eng qadimgi xatolaridan biridir. Null primitiv bo'lsa-da, typeof uni "object" deb qaytaradi.
2. **typeof [] === "object"**: Massivlar ham obyektlar oilasiga kirgani uchun typeof ularni ajratib bera olmaydi. Buning uchun \`Array.isArray()\` ishlatiladi.
3. **typeof NaN === "number"**: "Not a Number" (Son emas) qiymati ham sonlar turiga kiradi.

### E’lon qilinmagan o‘zgaruvchi:
\`typeof\` e'lon qilinmagan o'zgaruvchiga murojaat qilganda xato bermaydi, balki \`"undefined"\` qaytaradi. Bu o'zgaruvchi bor-yo'qligini tekshirishning xavfsiz usuli.

---

## Intervyu savollari (Junior & Middle)

### Junior daraja
1. **typeof operatori nima qaytaradi?**
2. **typeof null natijasi nima?**
3. **typeof [] va typeof {} farqi bormi?**

### Middle daraja
4. **typeof NaN nima uchun "number" qaytaradi?**
5. **Qanday qilib massivni obyektdan typeof yordamida ajratish mumkin emasligini isbotlang va yechim ayting.**
6. **typeof typeof 42 natijasi nima bo'ladi?**`,
  task: `// 1. Har xil turdagi (string, number, boolean, null, undefined, function) o'zgaruvchilar yarating va ularning turini typeof bilan ko'ring.
// 2. typeof yordamida biror o'zgaruvchi "undefined" ekanligini tekshiruvchi funksiya yozing.
// 3. Array.isArray() va typeof dan foydalanib, berilgan qiymat massiv yoki obyekt ekanini aniqlang.
// 4. typeof null === "object" ekanligini konsolda tekshiring.
// 5. typeof typeof 100 ifodasining natijasini ko'ring va nega shunday bo'lishini tushuntiring.

// Kodingizni shu yerga yozing`,
  hint: `// 1. Types
console.log(typeof "JS", typeof 10, typeof true, typeof null);

// 2. Safe check
function isDefined(v) {
  return typeof v !== "undefined";
}

// 3. Array vs Object
let data = [];
if (typeof data === "object" && Array.isArray(data)) {
  console.log("Bu massiv");
}

// 5. Double typeof
// typeof 100 -> "number"
// typeof "number" -> "string"`
};
