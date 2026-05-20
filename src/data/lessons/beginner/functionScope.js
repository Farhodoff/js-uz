export const functionScopeLesson = {
  id: "function-scope",
  title: "Function Scope: Xona sirlari",
  theory: `## 1. KIRISH
Tasavvur qiling, har bir funksiya — bu bitta alohida **xona**. Xona ichida nima sodir bo'layotganini tashqaridagilar ko'rmaydi. Bu o'zgaruvchilarni xavfsiz saqlashning eng oson usuli.

**Function Scope** — bu o'zgaruvchining faqat funksiya ichida "yashashi" va ishlatilishidir. Funksiya tugashi bilan uning ichidagi hamma o'zgaruvchilar o'chib ketadi.

## 1. NEGA kerak?
Tasavvur qiling, har bir funksiyada bir xil nomli o'zgaruvchi (\`count\`) ishlatmoqchisiz. Agar "funksiya doirasi" bo'lmaganda edi, barcha funksiyalar bir-birining o'zgaruvchisini o'zgartirib yuborar edi. Scope bizga har bir funksiya uchun "shaxsiy hudud" yaratadi.

## 2. SODDALIK (Analogiya)
Funksiyani alohida bir **xona** deb tasavvur qiling. Xona ichida nima sodir bo'layotganini ko'chada (globalda) turganlar ko'rmaydi. Xona ichidagi shaxsiy kundalikni (o'zgaruvchini) faqat o'sha xonaga kirganlar o'qiy oladi.

## 3. STRUKTURA

### A. Funksiya ichidagi o'zgaruvchi
\`\`\`javascript
function xona() {
  let sir = "Maxfiy";
  console.log(sir); // Xona ichida ko'rinadi ✅
}
xona();
console.log(sir); // Xato! ❌ (Xonadan tashqarida ko'rinmaydi)
\`\`\`

### B. var, let va const farqi
Funksiya ichida e'lon qilingan bo'lsa, uchalasi ham tashqariga chiqolmaydi:
\`\`\`javascript
function test() {
  var a = 1;
  let b = 2;
  const c = 3;
}
// a, b, c - hech biri tashqarida yo'q!
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let ism = "Ali"; // Global
function salom() {
  let ism = "Vali"; // Local (shaxsiy)
  console.log("Salom, " + ism);
}
salom(); // Salom, Vali
console.log(ism); // Ali (Global ism o'zgarmadi!)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Kalit so'zsiz o'zgaruvchi:** Funksiya ichida \`let/const\` ishlatmasdan o'zgaruvchi yaratsangiz (\`x = 10\`), u avtomatik ravishda **Global** bo'lib qoladi va boshqa joylarga xalaqit beradi. Doim \`let\` yoki \`const\` ishlating!
2. **E'lon qilishdan oldin ishlatish:** O'zgaruvchini funksiya oxirida e'lon qilib, boshida ishlatsangiz xato beradi (let/const bilan).

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

<details>
<summary>1. Function Scope nima?</summary>
Function Scope — funksiya ichida e'lon qilingan o'zgaruvchi va funksiyalarning faqat shu funksiya ichida mavjud bo'lishi va tashqaridan unga kirib bo'lmasligidir.
</details>

<details>
<summary>2. O'zgaruvchi funksiya ichida yaratilsa nima deyiladi?</summary>
Lokal o'zgaruvchi (Local variable) deyiladi.
</details>

<details>
<summary>3. Nima uchun funksiya ichidagi o'zgaruvchi tashqarida ko'rinmaydi?</summary>
Chunki JavaScript xavfsizlik va ma'lumotlarni yashirish (encapsulation) uchun funksiyalar atrofida ko'rinish chegaralarini (scope) o'rnatadi.
</details>

<details>
<summary>4. Funksiya ichida var ishlatsa u tashqarida ko'rinadimi?</summary>
Yo'q, \`var\` block scope-ni tan olmasa ham, function scope-ga to'liq bo'ysunadi. Funksiya ichidagi \`var\` o'zgaruvchisi tashqaridan ko'rinmaydi.
</details>

<details>
<summary>5. Funksiya tugaganidan keyin uning ichidagi o'zgaruvchilar nima bo'ladi?</summary>
Ular xotirani bo'shatish uchun axlat yig'uvchi (Garbage Collector) tomonidan avtomatik ravishda o'chirib tashlanadi.
</details>

<details>
<summary>6. Global scope va Local scope farqi nima?</summary>
Global scope-dagi o'zgaruvchilar butun kod davomida ochiq bo'ladi. Local scope o'zgaruvchilari esa faqat ma'lum bir funksiya yoki blok ichida yashaydi.
</details>

<details>
<summary>7. "Lexical Scope" nima degani?</summary>
Lexical Scope — o'zgaruvchilarning ko'rinish sohasi ular kodning qayerida yozilganiga qarab belgilanishidir (funksiya chaqirilgan joyga qarab emas, balki yaratilgan joyiga qarab).
</details>

<details>
<summary>8. Funksiya ichida let ishlatishning afzalligi nimada?</summary>
\`let\` o'zgaruvchilari hoisting paytida TDZ (Temporal Dead Zone) ga tushadi va ularni e'lon qilishdan oldin ishlatish xavfini oldini oladi hamda block scope-ga rioya qiladi.
</details>

<details>
<summary>9. Nyma uchun global va local o'zgaruvchilar nomi bir xil bo'lsa, local ustuvor bo'ladi?</summary>
Buni "Variable Shadowing" (to'sish) deyiladi, joriy scopedagi o'zgaruvchi tashqi scopedagisini soya ostida qoldiradi.
</details>

<details>
<summary>10. Kalit so'zsiz (let/const/var) o'zgaruvchi yaratilsa nima bo'ladi?</summary>
Agar funksiya ichida kalit so'zsiz o'zgaruvchi e'lon qilinsa (masalan \`x = 10\`), u avtomatik ravishda global o'zgaruvchiga aylanadi (qavslar tashqarisida ham ko'rinadi).
</details>

<details>
<summary>11. Funksiya ichidagi funksiya (nested) tashqi funksiya o'zgaruvchisini ko'radimi?</summary>
Ha, Scope Chain zanjiri bo'yicha ichki funksiya tashqi funksiyaning o'zgaruvchilari va parametrlaridan foydalanishi mumkin (bu closure hosil qiladi).
</details>

<details>
<summary>12. "Namespace pollution" nima va scope uni qanday hal qiladi?</summary>
Namespace pollution — global sohada o'zgaruvchilarning ko'payib ketishi va bir xil nomlarning to'qnashishidir. Local scope o'zgaruvchilarni alohida hududlarda saqlash orqali bu muammoni hal qiladi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Scope mashqi",
      instruction: "Funksiya ichida 'msg' o'zgaruvchisini yarating va uni faqat funksiya ichida chiqaring.",
      startingCode: "function show() {\n  // Bu yerda yarating\n}\nshow();",
      hint: "let msg = 'Salom';",
      test: "if (code.includes('msg')) return null; return 'O\\'zgaruvchi yaratilmadi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Funksiya ichida e'lon qilingan har qanday o'zgaruvchining hayot davri (lifetime) qachon tugaydi?",
      options: [
        "Brauzer yopilganda",
        "Funksiya o'z ishini bajarib bo'lganidan so'ng (funksiya tugashi bilan uning ichidagi barcha o'zgaruvchilar xotiradan o'chiriladi)",
        "Hech qachon o'chmaydi",
        "Faqat sahifa yangilanganda"
      ],
      correctAnswer: 1,
      explanation: "Funksiya chaqirilganda uning lokal o'zgaruvchilari yaratiladi va funksiya o'z ishini tugatishi (return bo'lishi) bilan bu o'zgaruvchilar xotirani band qilmasligi uchun avtomatik ravishda yo'q qilinadi."
    },
    {
      id: 2,
      question: "Funksiya ichida e'lon qilingan `var`, `let` va `const` o'zgaruvchilaridan qaysi birlarini funksiya tashqarisidan turib chaqirish (ishlatish) mumkin?",
      options: [
        "Faqat `var` yordamida yaratilganini",
        "Faqat `let` va `const` yordamida yaratilganini",
        "Hech birini (funksiya ichida e'lon qilingan har qanday o'zgaruvchi tashqaridan mutlaqo yopiq bo'ladi)",
        "Barchasini ishlatish mumkin"
      ],
      correctAnswer: 2,
      explanation: "Qaysi kalit so'z ishlatilishidan qat'iy nazar (`var`, `let`, yoki `const`), funksiya doirasida (Function Scope) yaratilgan o'zgaruvchilar tashqi dunyodan mutlaqo himoyalangan va faqat o'sha funksiya ichida amal qiladi."
    },
    {
      id: 3,
      question: "Agar funksiya ichida o'zgaruvchi e'lon qilinayotganda hech qanday kalit so'z (`var`, `let` yoki `const`) ishlatilmasdan qiymat berilsa (masalan: `x = 10;`), bu qanday oqibatga olib keladi?",
      options: [
        "Bu xatolik (Error) beradi va dastur to'xtaydi",
        "Ushbu o'zgaruvchi avtomatik ravishda Global Scope-ga qo'shiladi va butun kod bo'ylab o'zgaradi, bu esa namespace pollution xavfini keltirib chiqaradi",
        "U faqat funksiya ichida block scope bo'ladi",
        "U o'zgarmas `const` ga aylanadi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da kalit so'zsiz o'zgaruvchi e'lon qilinganda (strict mode bo'lmagan holatlarda) u global `window` yoki `global` obyektiga biriktirib qo'yiladi. Bu esa xavfli hisoblanadi."
    },
    {
      id: 4,
      question: "Agar bir xil nomli ham global o'zgaruvchi, ham funksiya ichida lokal o'zgaruvchi mavjud bo'lsa, funksiya ichida o'sha nom chaqirilganda qaysi biri ustuvor bo'ladi (Variable Shadowing)?",
      options: [
        "Global o'zgaruvchi ustuvor bo'ladi",
        "Lokal o'zgaruvchi (chunki JS birinchi bo'lib o'zining ichki ko'rinish sohasini (local scope) tekshiradi)",
        "Ikkalasi ham qo'shilib ketadi",
        "Dastur xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Buni \"Variable Shadowing\" deb atashadi. Lokal o'zgaruvchi o'sha funksiya ichida tashqaridagi global o'zgaruvchining ko'rinishini to'sib qo'yadi."
    },
    {
      id: 5,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet data = \"A\";\nfunction change() {\n  let data = \"B\";\n}\nchange();\nconsole.log(data);\n```",
      options: [
        "`\"B\"`",
        "`\"A\"` (chunki funksiya ichidagi data o'zgaruvchisi faqat lokal hududda yashaydi va tashqaridagi global data qiymatini o'zgartira olmaydi)",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "`change()` funksiyasi ichida `let data` yordamida mutlaqo yangi lokal o'zgaruvchi yaratildi. Tashqaridagi global `data` o'zgarishsiz `\"A\"` holida qoladi."
    }
  ]
};
