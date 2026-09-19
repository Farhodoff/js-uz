export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)",
  language: "javascript",
  theory: `## 1. 💡 Bu Dars Nima Uchun?

Bu dars — **ma'lumotnoma**. Yodlash shart emas: kerak bo'lganda ochib qaraysiz. Shu 1-Bosqichda o'rgangan hamma narsa bir joyda, ixcham jadval holida.

> **Maslahat:** bu sahifani xatcho'pga (bookmark) qo'shing — har kuni ishlatasiz.

---

## 2.  O'zgaruvchilar

\`\`\`javascript
let yosh = 25;        // o'zgaradi
yosh = 26;            // ✅ mumkin

const ISM = "Ali";    // o'zgarmaydi
ISM = "Vali";         // ❌ Xatolik!
\`\`\`

| Nima | Qachon |
|---|---|
| \`let\` | Qiymat o'zgaradi (hisob, holat) |
| \`const\` | Qiymat o'zgarmaydi (sozlama, konstanta) |

**Nomlash:** harf/raqam/\`$\`/\`_\`, birinchi belgi raqam emas, camelCase: \`foydalanuvchiIsmi\`.

---

## 3. 💻 Ma'lumot Turlari

| Tur | Misol | \`typeof\` |
|---|---|---|
| \`number\` | \`25\`, \`99.9\` | \`"number"\` |
| \`string\` | \`"Ali"\` | \`"string"\` |
| \`boolean\` | \`true\`, \`false\` | \`"boolean"\` |
| \`undefined\` | \`let x;\` | \`"undefined"\` |
| \`null\` | \`let x = null;\` | \`"object"\` (tarixiy xato) |
| \`bigint\` | \`10n\` | \`"bigint"\` |
| \`symbol\` | \`Symbol()\` | \`"symbol"\` |

**5 ta yolg'onchi** (\`false\` beradi): \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`.

---

## 4. 💻 Operatorlar

\`\`\`javascript
10 + 5    // 15 — qo'shish
10 - 5    // 5  — ayirish
10 * 5    // 50 — ko'paytirish
10 / 5    // 2  — bo'lish
10 % 3    // 1  — qoldiq (juft/toq tekshirish!)
2 ** 3    // 8  — daraja
\`\`\`

**Solishtirish:** \`>\`, \`<\`, \`>=\`, \`<=\`, \`===\`, \`!==\`
**Mantiqiy:** \`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS)
**Qisqa:** \`+=\`, \`-=\`, \`++\`, \`--\`

---

## 5. 💻 Aylantirish

\`\`\`javascript
Number("25")       // 25
Number("25px")     // NaN (qat'iy!)
parseInt("25px")   // 25
parseFloat("25.9") // 25.9
String(25)         // "25"
Boolean("")        // false
\`\`\`

**Tuzoq:** \`"5" + 3\` → \`"53"\` (yopishtiradi!), \`"5" - 3\` → \`2\` (hisoblaydi!).

---

## 6.  Shartlar va Sikllar

\`\`\`javascript
if (yosh >= 18) {
  console.log("Kattalar");
} else {
  console.log("Bolalar");
}

switch (kun) {
  case 1: console.log("Dushanba"); break;
  default: console.log("Boshqa");
}

for (let i = 1; i <= 5; i++) console.log(i);
while (suv > 0) { suv--; }
\`\`\`

**break** — siklni to'xtatadi, **continue** — bittasini tashlaydi.

---

## 7. 💻 Funksiyalar va Matn

\`\`\`javascript
function salomBer(ism) {
  return \`Salom, \${ism}!\`;
}
console.log(salomBer("Ali"));  // Salom, Ali!
\`\`\`

**Backtick** (\`\` \` \`\`) + \`\${}\` — zamonaviy yopishtirish, ichida hisoblash ham mumkin: \`\${a + b}\`.

---

## 8. 🎙 Intervyu Savollari

**1. \`let\` va \`const\` farqi?**
**Javob:** \`let\` o'zgaradi, \`const\` muhrlangan.

**2. \`==\` va \`===\` farqi?**
**Javob:** \`==\` turni e'tiborsiz qoldiradi, \`===\` qat'iy tekshiradi. **Doim \`===\` ishlating.**

**3. \`"5" + 3\` va \`"5" - 3\`?**
**Javob:** \`"53"\` va \`2\`. \`+\` yopishtiradi, \`-\` hisoblaydi.

**4. \`typeof null\` nima?**
**Javob:** \`"object"\` — 1995-yilgi tarixiy xato.

**5. Scope nima?**
**Javob:** O'zgaruvchining ko'rinish hududi. \`var\` — function scope, \`let/const\` — block scope.

---

## 9. ✅ Xulosa va Keyingi Qadam

Siz 1-Bosqichni tugatdingiz! Endi sizda:
- O'zgaruvchilar, turlar, operatorlar — **asoslar**
- Shartlar, sikllar, funksiyalar — **mantiq**
- Strict mode, tuzoqlar — **xavfsizlik**

**Keyingi qadam:** 1.24-darsda hammasini birlashtirib **mini-loyiha** yozamiz!`,
exercises: [
    {
      id: 1,
      title: "O'zgaruvchi turi",
      instruction: "`whatType(x)` funksiyasi `typeof x` natijasini qaytarsin (ma'lumotnomani mashq qilamiz).",
      startingCode: "function whatType(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof x;",
      test: "const fn = new Function(code + '; return whatType;')();\nif (fn(25) === 'number' && fn(\"a\") === 'string' && fn(true) === 'boolean') return null;\nreturn 'typeof qaytaring';"
    },
    {
      id: 2,
      title: "Yolg'onchimi?",
      instruction: "`isFalsy(x)` funksiyasi `Boolean(x) === false` bo'lsa `true` qaytarsin.",
      startingCode: "function isFalsy(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Boolean(x) === false;",
      test: "const fn = new Function(code + '; return isFalsy;')();\nif (fn(0) === true && fn(\"\") === true && fn(\"a\") === false && fn(1) === false) return null;\nreturn '5 ta yolg\\'onchi: 0, \"\", null, undefined, NaN';"
    },
    {
      id: 3,
      title: "Qoldiq",
      instruction: "`remainder(a, b)` funksiyasi `a` ni `b` ga bo'lgandagi qoldiqni qaytarsin.",
      startingCode: "function remainder(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return a % b;",
      test: "const fn = new Function(code + '; return remainder;')();\nif (fn(10, 3) === 1 && fn(9, 3) === 0) return null;\nreturn '% ishlating';"
    },
    {
      id: 4,
      title: "Xavfsiz aylantirish",
      instruction: "`safeInt(x)` funksiyasi `parseInt` bilan butun son qaytarsin: safeInt(\"25px\") => 25.",
      startingCode: "function safeInt(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return parseInt(x);",
      test: "const fn = new Function(code + '; return safeInt;')();\nif (fn(\"25px\") === 25 && fn(\"99.9\") === 99) return null;\nreturn 'parseInt ishlating';"
    },
    {
      id: 5,
      title: "Sikl bilan yig'ish",
      instruction: "`sumList(massiv)` funksiyasi massivdagi sonlar yig'indisini for bilan hisoblab qaytarsin.",
      startingCode: "function sumList(massiv) {\n  // for yozing\n}\n",
      hint: "let jami = 0; for (let i = 0; i < massiv.length; i++) jami += massiv[i]; return jami;",
      test: "const fn = new Function(code + '; return sumList;')();\nif (fn([1,2,3,4]) === 10 && fn([]) === 0) return null;\nreturn 'Yig\\'indi xato';"
    },
    {
      id: 6,
      title: "Blanka",
      instruction: "`card(ism, yosh)` funksiyasi backtick bilan `\"Ali (20 yosh)\"` qaytarsin.",
      startingCode: "function card(ism, yosh) {\n  // backtick yozing\n}\n",
      hint: "return `${ism} (${yosh} yosh)`;",
      test: "const fn = new Function(code + '; return card;')();\nif (fn(\"Ali\", 20) === 'Ali (20 yosh)') return null;\nreturn 'Format: Ali (20 yosh)';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "Qiymat o'zgarmasligi aniq bo'lsa nima ishlatamiz?",
      options: [
        "let",
        "const",
        "var",
        "function"
      ],
      correctAnswer: 1,
      explanation: "const — muhrlangan quti."
    },
    {
      id: 2,
      question: "Erta/usul: `\"5\" + 3` natijasi nima?",
      options: [
        "8",
        "\"53\"",
        "NaN",
        "\"8\""
      ],
      correctAnswer: 1,
      explanation: "+ matnni ko'rsa yopishtiradi."
    },
    {
      id: 3,
      question: "Juft sonni tekshirish usuli?",
      options: [
        "son / 2 === 0",
        "son % 2 === 0",
        "son + 2",
        "son * 2"
      ],
      correctAnswer: 1,
      explanation: "% — qoldiq operatori."
    },
    {
      id: 4,
      question: "`parseInt(\"25px\")` va `Number(\"25px\")`?",
      options: [
        "25 va 25",
        "25 va NaN",
        "NaN va 25",
        "Ikkisi NaN"
      ],
      correctAnswer: 1,
      explanation: "parseInt moslashuvchan, Number qat'iy."
    },
    {
      id: 5,
      question: "Funksiya natijani qaytarish uchun nima ishlatadi?",
      options: [
        "console.log",
        "return",
        "alert",
        "throw"
      ],
      correctAnswer: 1,
      explanation: "return — natija eshigi."
    },
    {
      id: 6,
      question: "O'zgaruvchi qaysi rejimda blokka bo'ysunadi?",
      options: [
        "var",
        "let va const",
        "function",
        "Hech qaysi"
      ],
      correctAnswer: 1,
      explanation: "var faqat funksiyaga bo'ysunadi."
    }
  ]
};
