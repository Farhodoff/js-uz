export const dataTypesLesson = {
  id: "data-types",
  title: "Ma'lumotlar Turlari (Data Types)",
  theory: `## 1. JAVASCRIPTDA MA'LUMOTLAR TURLARI
JavaScriptda ma'lumotlar ikki katta guruhga bo'linadi: **Primitiv** va **Murakkab (Reference)**.

### A. Primitiv turlar (7 ta)
Bular xotirada to'g'ridan-to'g'ri qiymatni saqlaydi:
1.  **String:** Matnlar (\`"Salom"\`, \`'JS'\`).
2.  **Number:** Sonlar (butun, kasr, \`NaN\`, \`Infinity\`).
3.  **Boolean:** Rost (\`true\`) yoki Yolg'on (\`false\`).
4.  **Undefined:** Qiymati berilmagan o'zgaruvchi.
5.  **Null:** Ataylab bo'sh qoldirilgan qiymat.
6.  **BigInt:** Juda katta sonlar uchun.
7.  **Symbol:** Unikal identifikatorlar.

### B. Murakkab tur (1 ta)
1.  **Object:** Obyektlar, massivlar (Array) va funksiyalar.

---

## 2. CHUQURROQ KO'Z YUGURTAMIZ

### Number va NaN
\`NaN\` (Not a Number) — bu son emas degani, lekin uning turi \`number\` bo'lib chiqadi. G'alati, a?
\`\`\`javascript
console.log("Olma" * 5); // → NaN
\`\`\`

### Null vs Undefined
- **Undefined:** "Men hali e'lon qilinmadim yoki menga qiymat berilmadi".
- **Null:** "Men boraman, lekin ichim bo'sh (ataylab)".

\`\`\`mermaid
graph TD
    A[Ma'lumot Turlari] --> B[Primitiv]
    A --> C[Object]
    B --> B1[String]
    B --> B2[Number]
    B --> B3[Boolean]
    B --> B4[Null/Undefined]
    C --> C1[Array]
    C --> C2[Function]
    C --> C3[Object]
\`\`\`

---

## 3. typeof OPERATORI
Bu operator o'zgaruvchining turini aniqlab beradi.

\`\`\`javascript
typeof 42;          // "number"
typeof "Salom";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (JS dagi mashhur xato)
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **JavaScriptda nechta primitiv tur bor?**
   *Javob:* 7 ta.

2. **null va undefined farqi nimada?**
   *Javob:* Undefined — avtomatik holat, Null — dasturchi tomonidan qo'yilgan bo'sh qiymat.

3. **typeof null nima qaytaradi?**
   *Javob:* "object". Bu til yaratilgandagi texnik xatolik hisoblanadi.`,
  exercises: [
    {
      id: 1,
      title: "Turlarni aniqlash",
      instruction: "O'zgaruvchi 'x' yarating, unga son bering va uning turini 'typeof' bilan konsolga chiqaring.",
      startingCode: "let x = 25;\n// typeof x ni konsolga chiqaring\n",
      hint: "console.log(typeof x);",
      test: "if (logs.includes('number')) return null; return 'Sonning turi \"number\" bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "String yaratish",
      instruction: "Yangi 'ism' o'zgaruvchisini yarating va unga o'z ismingizni string sifatida bering.",
      startingCode: "// Ismingizni yozing\n",
      hint: 'let ism = "Ali";',
      test: "if (typeof code.split('=')[1]?.trim().replace(/['\"]/g, '') === 'string') return null; return 'String to\\'g\\'ri e\\'lon qilinmagan';"
    }
  ]
};
