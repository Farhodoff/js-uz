export const templateLiterals = {
  id: "templateLiterals",
  title: "Template Literals",
  language: "javascript",
  theory: `
# Template Literals in JavaScript

## Part 1: Beginner Analogy

Imagine you are filling out a physical form, like a concert ticket or an invitation.

* **The Old Way (String Concatenation):** You have to write everything on separate pieces of paper, cut them out, and use glue (the \\\`+\\\` operator) to stick the name, date, and venue together. It gets messy, you easily forget spaces, and breaking lines is annoying.
* **The New Way (Template Literals):** You have a perfectly formatted fill-in-the-blanks template. You just write the information directly into the designated blanks (\\\`\${...}\\\`). No glue required, and you can freely press Enter to create multiple lines!

In JavaScript, we create this "fill-in-the-blanks" template by wrapping our text in **backticks** (\\\` \\\`) instead of standard quotes.

\\\`\\\`\\\`javascript
const name = "Sardor";
const age = 25;

// Old way (messy)
const oldWay = "Hello, my name is " + name + " and I am " + age + " years old.";

// New way (clean and readable)
const newWay = \\\`Hello, my name is \${name} and I am \${age} years old.\\\`;
\\\`\\\`\\\`

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

While template literals look like syntactic sugar, modern JavaScript engines like V8 (Chrome, Node.js) optimize them differently than normal string concatenation.

### 1. Parsing and Memory Allocation
When the engine sees a template literal, it splits it into an array of **static strings** and a sequence of **expressions** during the parsing phase.
For example, \\\`Hello \${name}!\\\` becomes:
- Static parts: \\\`["Hello ", "!"]\\\`
- Dynamic expression: \\\`[name]\\\`

Instead of creating intermediate strings in memory for every \\\`+\\\` operation (which causes memory fragmentation and heavy Garbage Collection), the engine pre-calculates the final string size. It allocates a single buffer in memory and copies the static strings and evaluated expressions directly into it.

### 2. Tagged Templates & Caching
Template literals can be processed by a "Tag" function.
\\\`\\\`\\\`javascript
function highlight(strings, ...values) {
  return strings[0] + values[0].toUpperCase() + strings[1];
}
const user = "john";
const result = highlight\\\`User: \${user} is active\\\`;
// Result: "User: JOHN is active"
\\\`\\\`\\\`
**Performance Secret:** The \\\`strings\\\` array passed to the tag function is cached by the V8 engine! If the same tagged template is evaluated inside a loop, the engine passes the exact same immutable strings array reference, saving memory and improving performance.

## Part 3: Edge Cases and Senior Interview Questions

### Edge Cases
1. **Object Interpolation:** If you put an object in a template literal like \\\`User: \${{ name: "Ali" }}\\\`, it will be coerced to a string, resulting in \\\`User: [object Object]\\\`. You must explicitly serialize it: \\\`\${JSON.stringify(user)}\\\`.
2. **Escaping Backticks:** To use a literal backtick inside a template literal, you must escape it with a backslash: \\\` \\\\\\\` \\\`.
3. **\\\`String.raw\\\`:** This built-in tag function allows you to get the "raw" string form of template literals, ignoring escape sequences like \\\`\\n\\\`.

### Senior Interview Questions

**Q1: What is the difference in memory handling between \\\`str1 + str2 + str3\\\` and \\\`\${str1}\${str2}\${str3}\\\`?**
*Answer:* Concatenation using \\\`+\\\` creates temporary intermediate strings for every operation (e.g., \\\`str1 + str2\\\` is created in memory, then \\\`str3\\\` is appended). Template literals are optimized to allocate the exact memory needed for the final string and build it in a single pass.

**Q2: How do Tagged Template Literals prevent XSS (Cross-Site Scripting)?**
*Answer:* Tagged templates allow you to write a function that sanitizes all dynamic \\\`values\\\` before they are merged with the static \\\`strings\\\`. Libraries like \\\`lit-html\\\` use this to escape user input automatically.

**Q3: Is a template literal evaluated at compile-time or runtime?**
*Answer:* The expressions inside \\\`\${}\\\` are evaluated at runtime, but the static structure (the literal itself) is parsed and cached during compile/parse time.

**Q4: Can you use statements like \\\`if/else\\\` or \\\`for\\\` inside \\\`\${}\\\`?**
*Answer:* No, you can only use expressions (like ternary operators \\\`a ? b : c\\\`, function calls, or logical operators). Statements do not resolve to a value and will throw a SyntaxError.

## Diagram: String Concatenation vs Template Literals

\\\`\\\`\\\`mermaid
graph TD
    subgraph Concatenation [Old: 'A' + var + 'B']
        direction TB
        C1["'A'"] --> Op1["+"]
        V1["var"] --> Op1
        Op1 --> Temp["Temporary String in Memory"]
        Temp --> Op2["+"]
        C2["'B'"] --> Op2
        Op2 --> Final1["Final String"]
    end

    subgraph Template [New: \\\`A\${var}B\\\`]
        direction TB
        T1["Parse Template"] --> S1["Static Parts: ['A', 'B']"]
        T1 --> E1["Expressions: [var]"]
        S1 --> V8["V8 Single Allocation"]
        E1 --> V8
        V8 --> Final2["Final String"]
    end
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchilarni interpolatsiya qilish",
      instruction: "Foydalanuvchining `firstName` va `lastName` o'zgaruvchilarini qabul qilib, ularni template literal (backtick) yordamida bitta satrga bo'sh joy (space) bilan ajratib birlashtiruvchi `formatFullName(firstName, lastName)` funksiyasini yozing. Masalan: `formatFullName('Ali', 'Valiyev')` chaqirilganda `'Ali Valiyev'` qaytishi kerak.",
      startingCode: "function formatFullName(firstName, lastName) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Backtick (`) belgisidan foydalaning va o'zgaruvchilarni ${firstName} ko'rinishida yozing.",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return formatFullName;');\nconst fn = sandbox();\nconst res = fn('Olim', 'Sodiqov');\nif (res === 'Olim Sodiqov') return null;\nreturn 'formatFullName funksiyasi ism va familiyani to\\'g\\'ri birlashtirmadi';"
    },
    {
      id: 2,
      title: "Matematik ifodani formatlash",
      instruction: "Ikkita `a` va `b` sonlarini qabul qilib, ularning yig'indisini quyidagi ko'rinishda shablonli satr sifatida qaytaruvchi `sumFormula(a, b)` funksiyasini yozing: `'a + b = yig'indi'`. Masalan: `sumFormula(3, 4)` chaqirilganda `'3 + 4 = 7'` qaytishi kerak.",
      startingCode: "function sumFormula(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Shablon ichida ${a} va ${b} ni o'zaro qo'shib ketishingiz mumkin: `${a} + ${b} = ${a + b}`",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return sumFormula;');\nconst fn = sandbox();\nconst res = fn(10, 20);\nif (res === '10 + 20 = 30') return null;\nreturn 'sumFormula funksiyasi formulani to\\'g\\'ri formatlamadi';"
    },
    {
      id: 3,
      title: "HTML Shabloni yaratish",
      instruction: "Foydalanuvchi obyekti (`user` - `name` va `age` xossalari bor) va rolni (`role` - satr) qabul qilib, ularni HTML ko'rinishida formatlovchi `renderProfile(user, role)` funksiyasini yozing. Qaytadigan matn aynan mana shunday multiline (ko'p satrli) bo'lishi kerak:\n```html\n<div class=\"profile\">\n  <h2>Name: ${user.name}</h2>\n  <p>Age: ${user.age}</p>\n  <span class=\"role\">${role}</span>\n</div>\n```\nE'tibor bering: qatorlar va bo'sh joylar formatga mos tushishi lozim.",
      startingCode: "function renderProfile(user, role) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Ko'p satrli matn hosil qilish uchun backtickdan foydalaning va shablon ichida tegishli o'zgaruvchilarni joylashtiring: `${user.name}`, `${user.age}` va `${role}`.",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return renderProfile;');\nconst fn = sandbox();\nconst res = fn({ name: 'Jasur', age: 25 }, 'Developer');\nconst clean = (str) => str.replace(/\\s+/g, '');\nconst expectedClean = clean('<div class=\"profile\"><h2>Name:Jasur</h2><p>Age:25</p><span class=\"role\">Developer</span></div>');\nif (clean(res) === expectedClean) return null;\nreturn 'renderProfile qaytargan HTML to\\'g\\'ri formatda emas';"
    },
    {
      id: 4,
      title: "Yoshni hisoblash",
      instruction: "`getAgeMessage(name, birthYear)` yozing, u 2026-yilda nechaga kirganligini chiqaradi. Masalan: `'Ali joriy yilda 36 yoshda.'` deb template literal (backtick) qaytarsin.",
      startingCode: "function getAgeMessage(name, birthYear) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Yilni to'g'ridan-to'g'ri ifoda orqali ${2026 - birthYear} qilib hisoblang.",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return getAgeMessage;');\nconst fn = sandbox();\nif (fn('Ali', 1990) !== 'Ali joriy yilda 36 yoshda.') return 'Yoshi yoki matn noto\\'g\\'ri hisoblandi';\nreturn null;"
    },
    {
      id: 5,
      title: "Ko'p qatorli oddiy matn",
      instruction: "Uch qatorli matnni (line1, line2, line3 qabul qiladi) bitta ko'p qatorli stringda qaytaruvchi funksiya tuzing.",
      startingCode: "function multiLine(line1, line2, line3) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Template literal ichida \\nEnter/Return ni bosing.",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return multiLine;');\nconst fn = sandbox();\nconst res = fn('a','b','c');\nif (res.split('\\n').length !== 3) return 'Uch qator qilib qaytarish kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "Mantiqiy ifoda",
      instruction: "Ism va baho (`score`) qabul qilib, agar 50 dan baland bo'lsa `'Otdi'`, aks holda `'Yiqildi'` ni template literal ichida xabar sifatida qaytaring: `'Olim imtihondan Otdi'`. Ternary ishlatib interpolatsiya qiling.",
      startingCode: "function examResult(name, score) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`${name} imtihondan ${score > 50 ? 'Otdi' : 'Yiqildi'}`",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return examResult;');\nconst fn = sandbox();\nif (fn('Ali', 60) !== 'Ali imtihondan Otdi' || fn('Vali', 40) !== 'Vali imtihondan Yiqildi') return 'Natija no\\'to\\'gri';\nreturn null;"
    },
    {
      id: 7,
      title: "Massiv elementlarini birlashtirish",
      instruction: "Do'kon nomi va mevalar massivi (`fruits`) berilgan. Funksiya quyidagini qaytarsin: `'Do\\'kon: Makro, mevalar: olma, anor'`. Massivni `.join(', ')` bilan chiqaring.",
      startingCode: "function storeFruits(storeName, fruits) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`${storeName}` va `${fruits.join(', ')}`",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return storeFruits;');\nconst fn = sandbox();\nif (fn('Makro', ['olma', 'anor']) !== \"Do'kon: Makro, mevalar: olma, anor\") return 'Massivni birlashtirish xato';\nreturn null;"
    },
    {
      id: 8,
      title: "Matn ichida qo'shtirnoq va bittalik tirnoq",
      instruction: "Quyidagi matnni Template Literal bilan qaytaradigan funksiya yozing: `Ali aytdi: \"Men bugun 'JS' o'rgandim!\"`. Echib o'tish (backslash) ishlatilmasin.",
      startingCode: "function createQuote() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Barcha qo'shtirnoq va tirnoqlarni orqasida shunchaki kiritib qo'ying: `Ali aytdi: \"Men...\"`",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return createQuote;');\nconst fn = sandbox();\nif (fn() !== 'Ali aytdi: \"Men bugun \\'JS\\' o\\'rgandim!\"') return 'Tirnoqlar bilan to\\'g\\'ri yozilmadi';\nreturn null;"
    },
    {
      id: 9,
      title: "Funksiyani ifodada ishlatish",
      instruction: "`getGreeting(name)` funksiyasi bor deb tasavvur qiling. Siz `welcomeUser(name)` funksiyasi ichida uni shablon sifatida chaqirishingiz kerak: `'Xabar: ${getGreeting(name)}'`. Biz getGreeting('Ali') -> 'Salom Ali' tarzida ishlashini ta'minlaymiz.",
      startingCode: "function getGreeting(name) { return 'Salom ' + name; }\nfunction welcomeUser(name) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "`${getGreeting(name)}`",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nconst sandbox = new Function(code + '; return welcomeUser;');\nconst fn = sandbox();\nif (fn('Ali') !== 'Xabar: Salom Ali') return 'Funksiya to\\'g\\'ri chaqirilmadi';\nreturn null;"
    },
    {
      id: 10,
      title: "Tagged Template (qo'shimcha malaka)",
      instruction: "Bir string template ni `highlight` deb nomlangan funksiya orqali tag qiladigan kod qoldiring. Bu shunchaki `highlight\\`Mening ismim ${name}\\`` qaytarsin.",
      startingCode: "function makeTagged(name) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Faqat string qaytaring: `return highlight\\`Mening ismim ${name}\\`` (Bu shunchaki sintaksisni yozishni mashq qilish)",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilishi shart!';\nif (!code.includes('highlight`')) return 'Tagged template ishlatilmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Template literals (shablonli satrlar) yaratish uchun qaysi belgidan foydalaniladi?",
      options: [
        "Yakkalik tirnoq (' ')",
        "Qo'shaloq tirnoq (\" \")",
        "Backtick (bek-tik, ` `)",
        "Qavslar ( )"
      ],
      correctAnswer: 2,
      explanation: "Template literals JavaScript-da backtick (bektik, ya'ni klaviaturadagi 'Esc' tugmasining ostidagi belgi) yordamida yoziladi."
    },
    {
      id: 2,
      question: "Quyidagi kodda konsolga nima chiqadi?\\n```javascript\\nconst name = 'Ali';\\nconsole.log('Salom ${name}');\\n```",
      options: [
        "Salom Ali",
        "Salom ${name}",
        "Salom undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "O'zgaruvchini interpolatsiya qilish uchun oddiy tirnoqlar emas, balki backticks (`) ishlatilishi shart. Oddiy tirnoqlar ichida yozilgan ${name} oddiy matn deb hisoblanadi."
    },
    {
      id: 3,
      question: "Template literals yordamida ko'p satrli (multiline) matnlarni qanday yozish mumkin?",
      options: [
        "Har bir satr oxiriga \\n va + belgisini qo'yish orqali",
        "Satr oxiriga faqat \\\\ qo'yish orqali",
        "Hech qanday maxsus belgisiz, shunchaki kodda yangi satrga o'tish orqali",
        "Faqat String.multiline() metodidan foydalanib"
      ],
      correctAnswer: 2,
      explanation: "Template literals backticklar ichida yozilganda, qo'shimcha \\n yoki satrlarni birlashtiruvchi + belgisiz bevosita kodning o'zida Enter yordamida yangi satrga o'tish imkonini beradi."
    },
    {
      id: 4,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\\n```javascript\\nconst a = 5;\\nconst b = 10;\\nconsole.log(`Javob: ${a + b}`);\\n```",
      options: [
        "Javob: 510",
        "Javob: 15",
        "Javob: a + b",
        "Javob: ${15}"
      ],
      correctAnswer: 1,
      explanation: "${} ichidagi JavaScript ifodasi (expression) bajariladi. a + b arifmetik qo'shish bo'lib, uning natijasi 15 matnga birlashtiriladi."
    },
    {
      id: 5,
      question: "Template literal ichida ternary (uchlik) operatorini ishlatish mumkinmi?",
      options: [
        "Yo'q, shablon ichida faqat oddiy o'zgaruvchilarni ko'rsatish mumkin",
        "Ha, chunki ternary operator qiymat qaytaruvchi ifoda (expression) hisoblanadi",
        "Faqat agar ternary operator oldindan qavs ichiga olingan bo'lsa",
        "Ha, lekin faqat sonli qiymatlarni solishtirish uchun"
      ],
      correctAnswer: 1,
      explanation: "${} ichiga istalgan valid JavaScript ifodasini (expression) yozish mumkin. Ternary operator qiymat qaytargani uchun uni bemalol shablon ichida ishlatish mumkin."
    },
    {
      id: 6,
      question: "Quyidagi kodda konsolga nima chiqadi?\\n```javascript\\nconst user = { name: 'Vali' };\\nconsole.log(`Foydalanuvchi: ${user}`);\\n```",
      options: [
        "Foydalanuvchi: Vali",
        "Foydalanuvchi: { name: 'Vali' }",
        "Foydalanuvchi: [object Object]",
        "TypeError"
      ],
      correctAnswer: 2,
      explanation: "Obyekt shablon satriga kiritilganda u avtomatik ravishda satrga o'giriladi (coerced). Obyektlarning sukut bo'yicha .toString() metodi [object Object] qiymatini qaytaradi."
    },
    {
      id: 7,
      question: "Tagged template literal (teg belgilangan shablon) nima?",
      options: [
        "Shablonli satrni maxsus funksiya yordamida chaqirish va uning qismlarini qayta ishlash usuli",
        "HTML-dagi <template> tegi bilan bir xil narsa",
        "Shablon ichida faqat XML teglarini ishlatish qoidasi",
        "Stringlarni kesib oluvchi metod"
      ],
      correctAnswer: 0,
      explanation: "Tagged template — shablonli satrni tahlil qilish imkonini beruvchi ilg'or usul. Bunda maxsus funksiya (teg funksiya) yoziladi va u shablonli satrdagi matnlar hamda interpolatsiya qilingan qiymatlarni alohida argument sifatida qabul qiladi."
    },
    {
      id: 8,
      question: "Quyidagi tagged template funksiyasida `strings` argumenti nimani anglatadi?\\n```javascript\\nfunction myTag(strings, ...values) {\\n  return strings;\\n}\\nconst name = 'Rustam';\\nmyTag`Salom ${name}! Qalaysan?`;\\n```",
      options: [
        "['Rustam']",
        "['Salom ', '! Qalaysan?']",
        "['Salom Rustam! Qalaysan?']",
        "['Salom', 'Rustam', 'Qalaysan']"
      ],
      correctAnswer: 1,
      explanation: "Teg funksiyasining birinchi argumenti — shablonli satr ichidagi barcha statik matnli qismlardan (interpolatsiyadan tashqarida bo'lgan) tuzilgan massivdir. Shuning uchun ['Salom ', '! Qalaysan?'] massivi qaytadi."
    },
    {
      id: 9,
      question: "`String.raw` tegi nima vazifani bajaradi?",
      options: [
        "Satr ichidagi barcha harflarni kichik harfga o'tkazadi",
        "Satrdagi escape belgilarini (masalan, \\n, \\t) o'z holicha, interpretatsiya qilmasdan oddiy matn sifatida saqlaydi",
        "Satr ichidagi o'zgaruvchilarni butunlay o'chirib yuboradi",
        "Satrni massivga aylantiradi"
      ],
      correctAnswer: 1,
      explanation: "`String.raw` o'rnatilgan teg funksiyasi bo'lib, u escape belgilarini (masalan \\n) yangi satrga o'tkazmasdan, aynan \\\\ va n harflari ko'rinishida 'xom' (raw) holatda qaytaradi."
    },
    {
      id: 10,
      question: "Quyidagi kodda konsolga nima chiqadi?\\n```javascript\\nconst show = () => 'Salom';\\nconsole.log(`${show()}`);\\n```",
      options: [
        "show()",
        "() => 'Salom'",
        "Salom",
        "undefined"
      ],
      correctAnswer: 2,
      explanation: "${} ichida funksiya chaqirilgan: show(). Bu funksiya 'Salom' qiymatini qaytaradi, shuning uchun natija 'Salom' bo'ladi."
    },
    {
      id: 11,
      question: "Shablonli satrlar yordamida funksiya chaqirilganda (tagged template), `strings.raw` xossasi nima beradi?",
      options: [
        "Shablonli satrning original matn uzunligini",
        "Satrdagi barcha interpolatsiya qilingan qiymatlarni",
        "Escape belgilar (masalan \\n) interpretatsiya qilinmasdan saqlangan 'xom' matnlar massivini",
        "HTML xavfsizligini ta'minlovchi metodni"
      ],
      correctAnswer: 2,
      explanation: "Teg funksiyasiga uzatiladigan birinchi argument (strings massivi) `raw` nomli xususiyatga ega. U o'z ichida escape belgilari qayta ishlanmagan original matn qismlarini saqlaydi."
    },
    {
      id: 12,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nconsole.log(`Natija: ${(() => {\\n  let x = 2;\\n  return x * 3;\\n})()}`);\\n```",
      options: [
        "Natija: 6",
        "Natija: x * 3",
        "Natija: undefined",
        "TypeError"
      ],
      correctAnswer: 0,
      explanation: "${} ichida darhol ishga tushuvchi arrow funksiya (IIFE) yozilgan. U bajarilib, 2 * 3 = 6 qiymatini qaytaradi. Satr natijasi 'Natija: 6' bo'ladi."
    }
  ]
};
