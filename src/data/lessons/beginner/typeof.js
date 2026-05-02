export const typeofLesson = {
  id: "typeof",
  title: "typeof operatori",
  level: "Beginner",
  description: "Ma'lumot turini aniqlashning eng oson usuli.",
  theory: `
# typeof – Bu nima va nima uchun kerak?

**typeof** — bu o'zgaruvchi yoki qiymatning turini (number, string, boolean va h.k.) aniqlab beradigan operator.

## 1. NEGA kerak?
Tasavvur qiling, sizga birorta ma'lumot keldi, lekin siz uning ichida nima borligini bilmaysiz. Agar u son bo'lsa — hisoblashingiz, agar matn bo'lsa — kesishingiz kerak. \`typeof\` yordamida biz "bu nima o'zi?" deb so'rab olamiz.

## 2. SODDALIK (Analogiya)
Buni **detektorga** o'xshatish mumkin. Sizda noma'lum metall bor, uni detektordan o'tkazasiz va u sizga "bu oltin" yoki "bu kumush" deb aytadi. \`typeof\` ham shunday detektor.

## 3. STRUKTURA (Natijalar jadvali)

| Qiymat | typeof natijasi |
|--------|-----------------|
| 100 | "number" |
| "Salom" | "string" |
| true | "boolean" |
| undefined | "undefined" |
| null | "object" (Bug!) |
| { } | "object" |
| [ ] | "object" |
| function() {} | "function" |

### Muhim: G'alati holatlar
- **null:** Primitiv bo'lsa ham \`object\` qaytaradi.
- **NaN:** Son bo'lmasa ham \`number\` qaytaradi.
- **Massivlar:** Ular ham obyektdir, shuning uchun \`object\` qaytaradi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = "JS";
console.log(typeof x); // "string"

console.log(typeof (5 + 5)); // "number"
console.log(typeof true); // "boolean"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **typeof(x):** \`typeof\` funksiya emas, u operator. Uni qavssiz yozish to'g'riroq: \`typeof x\`.
2. **Double typeof:** \`typeof typeof 100\` har doim **"string"** qaytaradi. Chunki \`typeof 100\` — \`"number"\` (matn), uning turi esa \`string\`.

## 6. SAVOLLAR (12 ta)
1. \`typeof\` operatori nima qaytaradi?
2. \`typeof\` natijasi qaysi ma'lumot turida bo'ladi (string)?
3. Nima uchun \`typeof null\` "object" chiqadi?
4. Massivning turini \`typeof\` orqali aniqlab bo'ladimi?
5. \`typeof NaN\` natijasi nima?
6. \`typeof 10 + " apples"\` natijasi nima bo'ladi?
7. \`typeof (10 + " apples")\` natijasi-chi?
8. \`typeof undefined\` natijasi nima?
9. Funksiyalarning turi nima deb chiqadi?
10. \`typeof true === "boolean"\` natijasi nima bo'ladi?
11. \`typeof typeof 42\` natijasi nima?
12. E'lon qilinmagan o'zgaruvchiga \`typeof\` ishlatsa xato beradimi?`,
  exercises: [
    {
      id: 1,
      title: "Turini tekshiring",
      instruction: "100 sonining turini konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof 100);",
      test: "if (logs.includes('number')) return null; return 'Xato chiqdi!';"
    }
  ]
};
