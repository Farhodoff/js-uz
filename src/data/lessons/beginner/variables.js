export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### O'zgaruvchilar nima va var, let, const farqlari qanday?
JavaScript-da o'zgaruvchilar ma'lumotlarni saqlash uchun qutilardir. Ammo bu qutilar o'zining doirasi (scope) bo'yicha farq qiladi:
* **\`var\` (Eski):** ES6 gacha ishlatilgan eski usul. U blok doirasini (\`if\` yoki \`for\` qavslarini) tan olmaydi va funksiya bo'ylab o'z bilganicha ishlayveradi. Bir xil nom bilan ko'p marta e'lon qilinsa ham e'tiroz bildirmaydi.
* **\`let\` (Zamonaviy):** Faqat o'zi e'lon qilingan qavslar \`{}\` (blok) ichida amal qiladi. U xonadan tashqariga chiqib ketmaydi. Bitta blok ichida bir xil nomda qayta e'lon qilish mumkin emas. Qiymatini o'zgartirish (reassign) mumkin.
* **\`const\` (O'zgarmas):** \`let\` kabi blok doirasida ishlaydi, lekin unga bir marta qiymat berilgach, uni butunlay yangi qiymatga qayta tayinlab bo'lmaydi. 

### Real hayotiy o'xshatish
Tasavvur qiling, siz ofisdasiz:
* **\`var\` (Doskadagi bo'r yozuvi):** Umumiy zalidagi doskaga yozilgan yozuv. Hamma o'chirib yoza oladi, tartib-qoida yo'q.
* **\`let\` (Daftar):** Xodimning o'z qalam bilan yozilgan daftari. O'chirib, o'zgartirishi mumkin, lekin faqat o'z xonasi (bloki) ichida ishlaydi.
* **\`const\` (Metall lavha):** Eshikdagi metall lavha, ismini umuman almashtirib bo'lmaydi, lekin ustiga stiker (mutatsiya) yopishtirish mumkin.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Blok doirasi)
\`\`\`javascript
if (true) {
  var leakedVar = "Blokdan tashqariga chiqdim!";
  let blockLet = "Blok ichida qoldim!";
}
console.log(leakedVar); // "Blokdan tashqariga chiqdim!"
// console.log(blockLet);  // ReferenceError: blockLet is not defined
\`\`\`

### 2. Intermediate Example (const va Obyektlar)
\`\`\`javascript
const user = { name: "Jasur", age: 25 };

// Obyekt ichini o'zgartirish MUMKIN (mutatsiya)
user.age = 26; 
console.log(user.age); // 26

// Yangi obyektga qayta bog'lash XATO
// user = { name: "Olim" }; // TypeError: Assignment to constant variable.
\`\`\`

---

## 3. ❌ YOMON va ✅ YAXSHI Misollar

❌ YOMON:
\`\`\`javascript
var counter = 0; // Eski va globalni ifloslantiradi
const PI; // Xato: const ga boshlang'ich qiymat berilmagan
PI = 3.14; 

console.log(name);
var name = "Ali"; // undefined bo'lib chop etiladi
\`\`\`

✅ YAXSHI:
\`\`\`javascript
let counter = 0; // O'zgaruvchi blok darajasida
const PI = 3.14; // Bir vaqtning o'zida e'lon qilinib qiymat berilgan

let name = "Ali";
console.log(name); // To'g'ri ketma-ketlik, TDZ oldi olinadi
\`\`\`

---

## 4. ⚙️ Mermaid Diagrammasi

\`\`\`mermaid
graph LR
    subgraph ScopeBoundaries ["Scope Chegaralari"]
        direction TB
        subgraph GlobalScope ["Global Scope (window)"]
            GVar["var global (windowga birikadi)"]
            GLet["let/const (windowda yo'q)"]
            
            subgraph FuncScope ["Function Scope - function() {}"]
                FVar["var funcVar (Funksiyada qoladi)"]
                
                subgraph BlockScope ["Block Scope - if() {}"]
                    BVar["var insideBlock (Blokdan tashqariga sizadi)"]
                    BLet["let/const blockLet (Blokdan chiqolmaydi)"]
                end
            end
        end
    end

    BVar -->|Sizib chiqadi| FuncScope
    BLet -.->|Taqiqlangan| FuncScope
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **Savol:** \`var\`, \`let\` va \`const\` farqi nima?
   * **Javob:** \`var\` function scope, qayta e'lon qilinishi mumkin, hoistingda undefined oladi. \`let\` va \`const\` block scope, qayta e'lon qilib bo'lmaydi, TDZga ega. \`const\` qiymati qayta tayinlanmaydi.
2. **Savol:** Temporal Dead Zone (TDZ) nima?
   * **Javob:** O'zgaruvchi xotirada ro'yxatdan o'tib to u amalda e'lon qilingan qatorgacha bo'lgan vaqt oraliqqa TDZ deyiladi, unga murojaat qilish ReferenceError beradi.
3. **Savol:** \`const\` massiv yoki obyekt ichini nega o'zgartirish mumkin?
   * **Javob:** \`const\` faqat havolani (reference) o'zgarmas qiladi. Obyektning ichidagi elementlarni (property) mutate qilish havolani o'zgartirmaydi, shuning uchun bunga ruxsat berilgan. To'liq muzlatish uchun \`Object.freeze()\` kerak.
`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchini yaratish",
      instruction: "Ismingizni `name` degan o'zgaruvchida `const` yordamida e'lon qiling va unga string qiymat bering.",
      startingCode: "// const ishlatib name yarating\n",
      hint: "const name = 'Sizning_Ismingiz';",
      test: "const fn = new Function(code + '; return name;')(); return typeof fn === 'string' && code.includes('const name');"
    },
    {
      id: 2,
      title: "O'zgaradigan qiymat",
      instruction: "Yoshingizni bildiruvchi `age` o'zgaruvchisini `let` yordamida e'lon qiling va unga 20 qiymatini bering. So'ng qiymatni 21 ga o'zgartiring.",
      startingCode: "// age ni let yordamida yarating\n",
      hint: "let age = 20; age = 21;",
      test: "const fn = new Function(code + '; return age;')(); return fn === 21 && code.includes('let age');"
    },
    {
      id: 3,
      title: "Var ni Let ga o'zgartirish",
      instruction: "Quyidagi kodda `var counter = 5;` yozilgan. Uni zamonaviy ES6 usuliga (`let`) o'tkazing.",
      startingCode: "var counter = 5;\n",
      hint: "var so'zini let bilan almashtiring.",
      test: "const fn = new Function(code + '; return counter;')(); return fn === 5 && code.includes('let counter');"
    },
    {
      id: 4,
      title: "Blok ichidagi let",
      instruction: "Yangi blok `{\n}` ichida `secret` o'zgaruvchisini let bilan '123' qiymatida e'lon qiling. U yashirin bo'lib qoladi.",
      startingCode: "{\n  // secret\n}",
      hint: "{ let secret = '123'; }",
      test: "try { new Function(code + '; return secret;')(); return false; } catch(e) { return code.includes('let secret'); }"
    },
    {
      id: 5,
      title: "Ikkita o'zgaruvchi",
      instruction: "`a = 10` va `b = 20` ni let yordamida e'lon qiling, so'ng `sum = a + b` qilib yig'indini hisoblang.",
      startingCode: "// a, b va sum",
      hint: "let a = 10; let b = 20; let sum = a + b;",
      test: "const fn = new Function(code + '; return sum;')(); return fn === 30;"
    },
    {
      id: 6,
      title: "Const va Object mutatsiyasi",
      instruction: "Sizga `const user = { age: 10 };` berilgan. Uning `age` qiymatini 11 ga o'zgartiring (mutatsiya).",
      startingCode: "const user = { age: 10 };\n// user yoshini oshiring\n",
      hint: "user.age = 11;",
      test: "const fn = new Function(code + '; return user.age;')(); return fn === 11;"
    },
    {
      id: 7,
      title: "Array mutatsiyasi",
      instruction: "Sizga `const list = [1, 2];` berilgan. Unga 3 raqamini qo'shing (push yordamida).",
      startingCode: "const list = [1, 2];\n// listga 3 ni qo'shing\n",
      hint: "list.push(3);",
      test: "const fn = new Function(code + '; return list;')(); return fn.length === 3 && fn[2] === 3;"
    },
    {
      id: 8,
      title: "Hoistingni to'g'irlash",
      instruction: "Kodda e'lon qilishdan oldin o'zgaruvchi ishlatilmoqda: `console.log(x); let x = 5;`. Uni o'zgartirib to'g'rilang.",
      startingCode: "console.log(x);\nlet x = 5;\n",
      hint: "Avval let x = 5; keyin console.log(x); yozing.",
      test: "const idxX = code.indexOf('let x'); const idxC = code.indexOf('console.log'); return idxX < idxC;"
    },
    {
      id: 9,
      title: "String saqlash",
      instruction: "`city` nomli o'zgaruvchini const bilan yarating va unga 'Tashkent' qiymatini bering.",
      startingCode: "// city yarating\n",
      hint: "const city = 'Tashkent';",
      test: "const fn = new Function(code + '; return city;')(); return fn === 'Tashkent';"
    },
    {
      id: 10,
      title: "Boolean flag",
      instruction: "`isActive` degan o'zgaruvchini `let` bilan e'lon qilib, `true` deng. Keyingi qatorda uni `false` ga o'zgartiring.",
      startingCode: "// isActive yarating va o'zgartiring\n",
      hint: "let isActive = true; isActive = false;",
      test: "const fn = new Function(code + '; return isActive;')(); return fn === false && code.includes('let isActive');"
    }
  ],
  quizzes: [
    {
      question: "Qaysi kalit so'z blok doirasiga ega (block scoped)?",
      options: ["var va let", "Faqat var", "let va const", "Barchasi"],
      correctAnswer: 2,
      explanation: "let va const blok ichida ishlaydi, var esa butun funksiya doirasida."
    },
    {
      question: "O'zgaruvchini qiymati hech qachon o'zgarmasligi uchun qaysi kalit so'z ishlatiladi?",
      options: ["var", "let", "const", "static"],
      correctAnswer: 2,
      explanation: "const o'zgarmas (constant) qiymatlar uchun."
    },
    {
      question: "Temporal Dead Zone (TDZ) nima?",
      options: ["Funksiya tugagandagi holat", "O'zgaruvchi o'lik bo'lgan xotira", "O'zgaruvchi amalda e'lon qilinishidan oldingi unga murojaat taqiqlangan vaqt", "Hech biri"],
      correctAnswer: 2,
      explanation: "let va const e'lon qilinishigacha bo'lgan vaqt oraliq TDZ deyiladi."
    },
    {
      question: "var hoisting bo'lganda uning qiymati nima bo'ladi?",
      options: ["ReferenceError", "null", "undefined", "NaN"],
      correctAnswer: 2,
      explanation: "var e'lon qilinishidan oldin murojaat qilinsa undefined bo'ladi."
    },
    {
      question: "Bir xil nomli o'zgaruvchini bitta doirada qayta e'lon (redeclare) qilish mumkinmi?",
      options: ["Ha, doim", "Faqat var bilan mumkin, let bilan xato beradi", "Faqat let bilan", "Mutlaqo mumkin emas"],
      correctAnswer: 1,
      explanation: "let bilan Identifier has already been declared xatosi chiqadi, var bilan esa mumkin."
    },
    {
      question: "const bilan e'lon qilingan massivga (array) push qilish mumkinmi?",
      options: ["Yo'q, bu xato", "Ha, massiv xususiyatlarini mutatsiya qilish mumkin", "Faqat raqamlarni mumkin", "Faqat var bo'lsa mumkin"],
      correctAnswer: 1,
      explanation: "const havolani (reference) o'zgarmas qiladi, massiv yoki obyekt tarkibini emas."
    },
    {
      question: "Quyidagi qaysi biri global window obyektiga birikadi?",
      options: ["Global var", "Global let", "Global const", "Barchasi"],
      correctAnswer: 0,
      explanation: "Global var window obyektiga birikadi (masalan, window.a = 5), let/const birikmaydi."
    },
    {
      question: "Agar o'zgaruvchini kalit so'zsiz (\`a = 5\`) e'lon qilsa nima bo'ladi?",
      options: ["Error beradi (strict mode'siz)", "Global obyektga yozilib ketadi (strict mode'siz)", "Block scope bo'ladi", "Function scope bo'ladi"],
      correctAnswer: 1,
      explanation: "Agar let/const/var ishlatilmasa (strict mode yo'q bo'lsa), o'z-o'zidan global oynani ifloslantiradi."
    },
    {
      question: "let o'zgaruvchisiga boshlang'ich qiymat bermay e'lon qilsa bo'ladimi?",
      options: ["Ha, qiymati undefined bo'lib qoladi", "Yo'q, const kabi majburiy", "Yo'q, syntax error beradi", "Ha, lekin 0 ga teng bo'ladi"],
      correctAnswer: 0,
      explanation: "let y = ; desangiz xato, lekin let y; desangiz bo'ladi, u undefined turadi."
    },
    {
      question: "const o'zgaruvchisiga boshlang'ich qiymat bermay e'lon qilsa bo'ladimi?",
      options: ["Ha, undefined qabul qiladi", "Yo'q, albatta qiymat berish majburiy (SyntaxError)", "Ha, 0 bo'lib qoladi", "Yo'q, ReferenceError"],
      correctAnswer: 1,
      explanation: "const bilan e'lon qilayotganda darhol const a = 10; qilib qiymat berish kerak."
    },
    {
      question: "Sikllar (for loop) ichida i iteratoriga qaysi kalit so'z to'g'ri keladi?",
      options: ["var", "let", "const", "static"],
      correctAnswer: 1,
      explanation: "let iterator i ga to'g'ri keladi, chunki u doim qiymati o'zgaradi. var bilan bitta doirada ishlaydi (yomon amaliyot), const qilsangiz reassign qilib bo'lmaydi xato bo'ladi."
    },
    {
      question: "Xavfsizlik va eng yaxshi amaliyotga ko'ra kalit so'zlar tanlash qoidasi qanday?",
      options: ["Har doim var", "Har doim let, kerak bo'lsa const", "Har doim const, faqat o'zgaradigan qiymat bo'lsa let", "Umuman kalit so'zsiz yozish"],
      correctAnswer: 2,
      explanation: "Asosiy qoida: Imkon qadar doimo const ishlating, o'zgarishi aniq bo'lsagina let ishlating."
    }
  ]
};