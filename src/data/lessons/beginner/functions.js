export const functions = {
  id: "b4",
  title: "Funksiya asoslari (Deklaratsiya, Ifoda, Arrow)",
  theory: `## 1. FUNKSIYA DEKLARATSIYASI
Funksiya — bu ma'lum bir vazifani bajaradigan kod bo'lagi. Uni bir marta yozib, istalgancha qayta ishlatish mumkin. **Function Declaration** eng keng tarqalgan usuldir.

### Hoisting (Ko'tarilish)
Funksiya deklaratsiyasi butunligicha scope boshiga ko'tariladi. Shuning uchun uni e'lon qilishdan **oldin** ham chaqirish mumkin.

\`\`\`javascript
salomBer(); // Ishlaydi!

function salomBer() {
  console.log("Salom!");
}
\`\`\`

---

## 2. FUNKSIYA IFODASI (Function Expression)
Funksiyani o'zgaruvchiga qiymat sifatida saqlash usuli. Bu usulda **hoisting ishlamaydi**.

\`\`\`javascript
const xayrlesh = function() {
  console.log("Xayr!");
};

xayrlesh(); // Faqat e'lon qilingandan keyin ishlaydi
\`\`\`

---

## 3. ARROW FUNCTIONS (ES6+)
Funksiyalarni yozishning qisqa va zamonaviy usuli.

\`\`\`javascript
// Bitta parametr bo'lsa qavs shart emas
const kvadrat = x => x * x;

// Bir qatorli bo'lsa return va {} shart emas (Implicit return)
const add = (a, b) => a + b;
\`\`\`

### Farqlar jadvali:

| Xususiyat | Deklaratsiya | Arrow Function |
|-----------|--------------|----------------|
| **Hoisting** | Bor ✅ | Yo'q ❌ |
| **this** | O'ziniki bor | Tashqaridan oladi |
| **arguments**| Bor ✅ | Yo'q ❌ |

---

## 4. INTERVYU SAVOLLARI (Junior & Middle)

1. **Deklaratsiya va Ifoda farqi nima?**
   *Javob:* Asosiy farq hoistingda. Deklaratsiyani oldin chaqirsa bo'ladi, ifodani (expression) esa yo'q.

2. **Arrow funksiyada 'this' qanday ishlaydi?**
   *Javob:* Uning o'z \`this\`i yo'q, u o'zi yozilgan joydagi (lexical scope) \`this\`ni ishlatadi.

3. **Implicit return nima?**
   *Javob:* Arrow funksiya bitta qatordan iborat bo'lsa, \`return\` so'zini yozmasdan natijani qaytarishi.`,
  exercises: [
    {
      id: 1,
      title: "isEven (Deklaratsiya)",
      instruction: "Son juft bo'lsa true, toq bo'lsa false qaytaradigan 'isEven' funksiyasini deklaratsiya usulida yozing.",
      startingCode: "// Deklaratsiya usulida yozing\n\nconsole.log(isEven(4));",
      hint: "function isEven(n) { return n % 2 === 0; }",
      test: "if (typeof isEven === 'function' && isEven(4) === true) return null; return 'isEven funksiyasini to\\'g\\'ri yozing';"
    },
    {
      id: 2,
      title: "Arrow Multiply",
      instruction: "Ikkita sonni ko'paytiradigan arrow funksiya yozing (bir qatorda).",
      startingCode: "const multiply = \n\nconsole.log(multiply(4, 5));",
      hint: "const multiply = (a, b) => a * b;",
      test: "if (logs.includes('20')) return null; return 'Natija 20 bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Implicit Return Object",
      instruction: "Obyekt qaytaradigan arrow funksiya yozing. Obyektni qavs ichiga olishni unutmang!",
      startingCode: "const makeUser = (name) => // bu yerga yozing\n\nconsole.log(makeUser('Ali').name);",
      hint: "const makeUser = (name) => ({ name: name });",
      test: "if (logs.includes('Ali')) return null; return 'Obyekt to\\'g\\'ri qaytmadi (qavslarga e\\'tibor bering)';"
    }
  ]
};