export const oopMiniProject = {
  id: "oopMiniProject",
  title: "🏆 Mini-Loyiha: Kutubxona Boshqaruv Tizimi (OOP)",
  language: "javascript",
  theory: `## 1. 💡 Loyiha: Nima quramiz?

Bu bosqichda 4-bosqichda o'rgangan **HAMMA** OOP tushunchasini bitta tizimga yig'amiz:
- **Klasslar** — \`Book\`, \`Member\`, \`Library\`
- **Inkapsulyatsiya** — \`#\` private maydonlar bilan ichki holatni himoyalash
- **Meros** — \`Member\` dan \`VIPMember\`
- **Polimorfizm** — har tur o'z \`describe()\` javobini beradi
- **Getter/Setter** — validatsiyali property'lar
- **Observer uslubi** — hodisalar ro'yxati (log)

### Real hayotiy o'xshatish
Kutubxona tizimi — klassik OOP o'quv loyihasi, chunki u **obyektlar orasidagi munosabatlar**ni ko'rsatadi:
- **Kitob** — ma'lumot (nom, muallif, holat).
- **A'zo** — kitob oladi, qaytaradi (xatti-harakat).
- **Kutubxona** — orkestrlovchi (orchestrator): kitoblar va a'zolarni boshqaradi.

\`\`\`javascript
class Book {
  #available = true; // private holat

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  get available() { return this.#available; }

  checkout() {   // faqat tizim orqali o'zgaradi
    this.#available = false;
  }
  giveBack() {
    this.#available = true;
  }

  describe() {
    return \`\${this.title} — \${this.author}\`;
  }
}

class Member {
  #borrowed = []; // private ro'yxat

  constructor(name) { this.name = name; }

  borrow(book) {
    if (!book.available) return \`"\${book.title}" mavjud emas\`;
    book.checkout();
    this.#borrowed.push(book);
    return \`"\${book.title}" olindi\`;
  }

  get borrowedCount() { return this.#borrowed.length; }
}

class Library {
  #books = [];
  #members = [];
  #log = [];

  addBook(book) { this.#books.push(book); return this; } // chaining!
  addMember(member) { this.#members.push(member); return this; }

  findBook(title) {
    return this.#books.find(b => b.title === title) || null;
  }

  get log() { return [...this.#log]; } // nusxa — tashqaridan o'zgartirib bo'lmaydi
}
\`\`\`

---

## 2. 💻 Bosqichma-bosqich Qurish

### 1-qadam: Book klassi
Holat (\`#available\`) private, faqat metodlar orqali o'zgaradi — **inkapsulyatsiya**.

### 2-qadam: Member va VIPMember
\`VIPMember\` \`Member\`dan meros oladi, \`limit\` kattaroq va \`describe()\` ni override qiladi — **meros + polimorfizm**.

\`\`\`javascript
class VIPMember extends Member {
  static LIMIT = 5; // statik konstanta
  describe() { return \`VIP a'zo: \${this.name}\`; }
}
\`\`\`

### 3-qadam: Library — kompozitsiya
\`Library\` kitoblar va a'zolarni **ichida saqlaydi** (has-a) — **kompozitsiya** prinsipi. Ular bir-biridan xabardor emas, hammasi kutubxona orqali aloqa qiladi.

### 4-qadam: Hodisalar jurnali (mini-Observer)
Har amal \`#log\` ga yoziladi — tizim nima bo'lganini "eslab qoladi". Haqiqiy ilovalarda bu \`EventEmitter\` yoki bazadagi \`audit_log\` jadvaliga aylanadi.

---

## 3. ⚙️ Deep Dive: Loyihadagi professional qarorlar

**Nima uchun \`#books\` ni to'g'ridan-to'g'ri qaytarmaymiz?**
\`get books() { return this.#books; }\` — tashqarida biror kod \`lib.books.push(...)\` bilan ichki ro'yxatni buzishi mumkin edi. Shuning uchun:
\`\`\`javascript
get books() { return [...this.#books]; } // himoyalangan nusxa
\`\`\`

**Nima uchun \`addBook\` \`this\` qaytaradi?**
Metod chaining — \`lib.addBook(a).addMember(m)\` — ravon (fluent) interfeys.

**Nima uchun \`Book\` o'zi bor-yo'qligini tekshirmaydi?**
Har klass **bitta mas'uliyat**ga ega (SRP): \`Book\` — o'z holati, \`Library\` — biznes qoidalari. Tekshiruvni \`Library.borrowBook()\` da qilamiz.

**API bilan ishlashda klasslarni qanday qo'llash?**
Serverdan kelgan JSON'ni klassga "aylantirish" (hydration):
\`\`\`javascript
const apiData = [{ title: "O'tkan kunlar", author: "Qodiriy" }];
const books = apiData.map(b => new Book(b.title, b.author));
// Endi books[0].describe() ishlaydi — oddiy obyekt emas, klass nusxa!
\`\`\`

---

## 4. 📊 Mermaid Diagrammasi

Tizim arxitekturasi:

\`\`\`mermaid
graph TD
    L["Library<br/>(orchestrator)"] -->|"has-a (kompozitsiya)"| B["Book × N"]
    L -->|"has-a"| M["Member / VIPMember × N"]
    B -->|"#available"| B2["Private holat"]
    M -->|"#borrowed"| M2["Private ro'yxat"]
    VIP["VIPMember"] -->|"extends"| M
    L -->|"#log"| LOG["Hodisalar jurnali"]
    style L fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style M fill:#bbf,stroke:#333
    style VIP fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1-qadam: Book klassi",
      instruction: "`Book(title, author)` klassini yozing: `#available = true` private maydon, `available` getter, `checkout()` (false qiladi), `giveBack()` (true qiladi).",
      startingCode: "// Book klassini yozing\n",
      hint: "class Book { #available = true; get available() { return this.#available; } checkout() { this.#available = false; } giveBack() { this.#available = true; } constructor(title, author) { this.title = title; this.author = author; } }",
      test: "const fn = new Function(code + '; const b = new Book(\\'A\\', \\'B\\'); const r1 = b.available; b.checkout(); const r2 = b.available; b.giveBack(); const r3 = b.available; return [r1, r2, r3];'); const r = fn(); if (r && r[0] === true && r[1] === false && r[2] === true) return null; return 'Book holati checkout/giveBack orqali o\\'zgarishi kerak';"
    },
    {
      id: 2,
      title: "2-qadam: Member klassi",
      instruction: "`Member(name)` klassi yozing: `#borrowed = []` private, `borrow(book)` — kitob available bo'lsa oladi (book.checkout() chaqiradi) va true qaytaradi, aks holda false. `borrowedCount` getter bor bo'lsin.",
      startingCode: "// Member klassini yozing (Book allaqachon bor deb faraz qiling)\nclass Book {\n  #available = true;\n  constructor(title) { this.title = title; }\n  get available() { return this.#available; }\n  checkout() { this.#available = false; }\n}",
      hint: "class Member { #borrowed = []; constructor(name) { this.name = name; } borrow(book) { if (!book.available) return false; book.checkout(); this.#borrowed.push(book); return true; } get borrowedCount() { return this.#borrowed.length; } }",
      test: "const fn = new Function(code + '; const b = new Book(\\'JS\\'); const m = new Member(\\'Ali\\'); const r1 = m.borrow(b); const r2 = m.borrow(b); return [r1, r2, m.borrowedCount];'); const r = fn(); if (r && r[0] === true && r[1] === false && r[2] === 1) return null; return 'Bir kitobni ikki marta olib bo\\'lmasligi kerak';"
    },
    {
      id: 3,
      title: "3-qadam: returnBook",
      instruction: "`Member` ga `returnBook(book)` metodini qo'shing: ro'yxatdan o'chiradi, `book.giveBack()` chaqiradi, topilsa true qaytaradi.",
      startingCode: "class Book {\n  #available = true;\n  constructor(title) { this.title = title; }\n  get available() { return this.#available; }\n  checkout() { this.#available = false; }\n  giveBack() { this.#available = true; }\n}\nclass Member {\n  #borrowed = [];\n  constructor(name) { this.name = name; }\n  borrow(book) { if (!book.available) return false; book.checkout(); this.#borrowed.push(book); return true; }\n  get borrowedCount() { return this.#borrowed.length; }\n  // returnBook yozing\n}",
      hint: "returnBook(book) { const i = this.#borrowed.indexOf(book); if (i === -1) return false; this.#borrowed.splice(i, 1); book.giveBack(); return true; }",
      test: "const fn = new Function(code + '; const b = new Book(\\'JS\\'); const m = new Member(\\'A\\'); m.borrow(b); const r1 = m.returnBook(b); const r2 = b.available; return [r1, r2];'); const r = fn(); if (r && r[0] === true && r[1] === true) return null; return 'Kitob qaytarilgach available bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "4-qadam: VIPMember meros",
      instruction: "`VIPMember extends Member` yozing: `describe()` — `'VIP a\\'zo: [ism]'` qaytarsin (polimorfizm). `Member.describe()` — `'A\\'zo: [ism]'`.",
      startingCode: "class Member {\n  constructor(name) { this.name = name; }\n  describe() { return 'A\\'zo: ' + this.name; }\n}\n// VIPMember yozing",
      hint: "class VIPMember extends Member { describe() { return 'VIP a\\'zo: ' + this.name; } }",
      test: "const fn = new Function(code + '; return [new VIPMember(\\'Ali\\').describe(), new Member(\\'Vali\\').describe()];'); const r = fn(); if (r && r[0] === 'VIP a\\'zo: Ali' && r[1] === 'A\\'zo: Vali') return null; return 'VIPMember describe ni override qilishi kerak';"
    },
    {
      id: 5,
      title: "5-qadam: Library konteyner",
      instruction: "`Library` klassi yozing: `#books = []`, `addBook(book)` — qo'shib `this` qaytarsin (chaining), `findBook(title)` — topilgan kitobni yoki null qaytarsin. Book klassi berilgan.",
      startingCode: "class Book {\n  constructor(title) { this.title = title; }\n}\n// Library klassini yozing\n",
      hint: "class Library { #books = []; addBook(b) { this.#books.push(b); return this; } findBook(t) { return this.#books.find(b => b.title === t) || null; } }",
      test: "const fn = new Function(code + '; const l = new Library(); const b = new Book(\\'X\\'); l.addBook(b); return l.findBook(\\'X\\') === b;'); if (fn() === true) return null; return 'addBook va findBook ishlashi kerak';"
    },
    {
      id: 6,
      title: "6-qadam: borrowBook biznes-logikasi",
      instruction: "`Library` ga `borrowBook(title, member)` yozing: kitob topilmasa `'Kitob topilmadi'`, mavjud emas bo'lsa `'Kitob mavjud emas'`, aks holda `member.borrow(book)` natijasi bo'yicha `'OK'`.",
      startingCode: "class Book {\n  #available = true;\n  constructor(title) { this.title = title; }\n  get available() { return this.#available; }\n  checkout() { this.#available = false; }\n}\nclass Member {\n  #borrowed = [];\n  borrow(book) { if (!book.available) return false; book.checkout(); this.#borrowed.push(book); return true; }\n}\nclass Library {\n  #books = [];\n  addBook(b) { this.#books.push(b); return this; }\n  findBook(t) { return this.#books.find(b => b.title === t) || null; }\n  // borrowBook yozing\n}",
      hint: "borrowBook(t, m) { const b = this.findBook(t); if (!b) return 'Kitob topilmadi'; const ok = m.borrow(b); return ok ? 'OK' : 'Kitob mavjud emas'; }",
      test: "const fn = new Function(code + '; const l = new Library(); l.addBook(new Book(\\'JS\\')); const m = new Member(\\'A\\'); const r1 = l.borrowBook(\\'JS\\', m); const r2 = l.borrowBook(\\'Nope\\', m); const r3 = l.borrowBook(\\'JS\\', m); return [r1, r2, r3];'); const r = fn(); if (r && r[0] === 'OK' && r[1] === 'Kitob topilmadi' && r[2] === 'Kitob mavjud emas') return null; return 'Uch holatni ham to\\'g\\'ri qaytaring';"
    },
    {
      id: 7,
      title: "7-qadam: Hodisalar jurnali",
      instruction: "`Library` ga `#log = []` qo'shing. `borrowBook` har amalni log'ga yozsin (`'[[ism]] [[natija]]'` formatda) va `log` getter — nusxa qaytarsin (`[...this.#log]`).",
      startingCode: "class Book {\n  #available = true;\n  constructor(title) { this.title = title; }\n  get available() { return this.#available; }\n  checkout() { this.#available = false; }\n}\nclass Member {\n  #borrowed = [];\n  constructor(name) { this.name = name; }\n  borrow(book) { if (!book.available) return false; book.checkout(); this.#borrowed.push(book); return true; }\n}\nclass Library {\n  #books = [];\n  #log = [];\n  addBook(b) { this.#books.push(b); return this; }\n  findBook(t) { return this.#books.find(b => b.title === t) || null; }\n  borrowBook(t, m) {\n    // log bilan yozing\n  }\n  get log() {\n    // nusxa qaytaring\n  }\n}",
      hint: "const b = this.findBook(t); if (!b) { this.#log.push(t + ' topilmadi'); return 'Kitob topilmadi'; } ... get log() { return [...this.#log]; }",
      test: "const fn = new Function(code + '; const l = new Library(); l.addBook(new Book(\\'JS\\')); const m = new Member(\\'A\\'); l.borrowBook(\\'JS\\', m); const log = l.log; log.push(\\'hack\\'); return l.log.length === 1;'); if (fn() === true) return null; return 'log getter himoyalangan nusxa qaytarishi kerak';"
    },
    {
      id: 8,
      title: "8-qadam: API'dan klassga (hydration)",
      instruction: "`apiData` massivi bor. Uni `Book` nusxalariga aylantiring: `loadBooks(data)` — `Book` nusxalari massivini qaytarsin.",
      startingCode: "class Book {\n  constructor(title, author) { this.title = title; this.author = author; }\n}\nconst apiData = [\n  { title: 'O\\'tkan kunlar', author: 'Qodiriy' },\n  { title: 'JS Kitobi', author: 'Anonim' }\n];\nfunction loadBooks(data) {\n  // map bilan klasslarga aylantiring\n}",
      hint: "return data.map(b => new Book(b.title, b.author));",
      test: "const fn = new Function(code + '; return loadBooks(apiData)[0] instanceof Book;'); if (fn() === true) return null; return 'Natija Book nusxalari bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "9-qadam: Limit bilan VIP",
      instruction: "`VIPMember` ga `static LIMIT = 3` qo'shing. `borrow` override qiling: limitdan oshsa false qaytarsin, aks holda `super.borrow(book)` ishlasin.",
      startingCode: "class Member {\n  #borrowed = [];\n  borrow(book) { this.#borrowed.push(book); return true; }\n  get borrowedCount() { return this.#borrowed.length; }\n}\nclass Book { constructor(title) { this.title = title; } }\nclass VIPMember extends Member {\n  // LIMIT va override qilingan borrow\n}",
      hint: "static LIMIT = 3; borrow(book) { if (this.borrowedCount >= VIPMember.LIMIT) return false; return super.borrow(book); }",
      test: "const fn = new Function(code + '; const v = new VIPMember(); const books = [1,2,3,4].map(i => new Book(\\'b\\'+i)); const results = books.map(b => v.borrow(b)); return [results[2], results[3]];'); const r = fn(); if (r && r[0] === true && r[1] === false) return null; return '3 ta kitobgacha ruxsat, 4-si rad etilishi kerak';"
    },
    {
      id: 10,
      title: "Yakuniy integratsiya",
      instruction: "To'liq tizim: `Book`, `Member`, `Library` (borrowBook, log) yozing. `runDemo()` funksiyasi: kitob qo'shsin, a'zo keltirsin, kitob olsin — va log massivini qaytarsin (kamida 1 element).",
      startingCode: "// To'liq tizimni yozing va runDemo() da sinang\n",
      hint: "class Library ... borrowBook ichida log.push(...) ... function runDemo() { const l = new Library(); l.addBook(new Book('JS')); const m = new Member('A'); l.borrowBook('JS', m); return l.log; }",
      test: "const fn = new Function(code + '; const log = runDemo(); return Array.isArray(log) && log.length >= 1;'); if (fn() === true) return null; return 'runDemo() log massivini qaytarishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Loyihada `#available` maydoni nega private qilingan?",
      options: [
        "Tezroq ishlashi uchun",
        "Holat faqat metodlar orqali nazorat bilan o'zgarsin",
        "Kod qisqaroq bo'lishi uchun",
        "Prototip talabi"
      ],
      correctAnswer: 1,
      explanation: "Inkapsulyatsiya: kitob holatini hech kim bevosita buzolmaydi — faqat checkout/giveBack orqali."
    },
    {
      id: 2,
      question: "`Library` bilan `Book` orasidagi bog'lanish qanday turda?",
      options: ["Meros (is-a)", "Kompozitsiya (has-a)", "Static bog'lanish", "Umuman bog'lanish yo'q"],
      correctAnswer: 1,
      explanation: "Kutubxona kitoblarni 'ega bo'ladi' (has-a) — kompozitsiya, meros emas."
    },
    {
      id: 3,
      question: "`VIPMember extends Member` qaysi prinsip namoyishi?",
      options: ["Inkapsulyatsiya", "Meros", "Abstraktsiya", "Kohesiya"],
      correctAnswer: 1,
      explanation: "Voris klass ota klassning xususiyatlarini oladi — meros (inheritance)."
    },
    {
      id: 4,
      question: "`describe()` metodini har turda qayta yozish nimani namoyish etadi?",
      options: ["Inkapsulyatsiya", "Polimorfizm", "Rekursiya", "Memoizatsiya"],
      correctAnswer: 1,
      explanation: "Bir xil metod chaqiruvi har xil turda har xil natija — polimorfizm."
    },
    {
      id: 5,
      question: "`get log() { return [...this.#log]; }` nega nusxa qaytaradi?",
      options: [
        "Tezlik uchun",
        "Tashqaridan ichki massivni o'zgartirishning oldini olish",
        "JSON uchun",
        "Sintaksis talabi"
      ],
      correctAnswer: 1,
      explanation: "To'g'ridan-to'g'ri havola qaytarilsa, tashqari kod ichki holatni buzishi mumkin edi."
    },
    {
      id: 6,
      question: "`addBook()` ning `this` qaytarishi nimaga xizmat qiladi?",
      options: [
        "Xotira tejash",
        "Metod chaining (fluent interfeys)",
        "Async ishlash",
        "Hech narsaga"
      ],
      correctAnswer: 1,
      explanation: "`lib.addBook(a).addBook(b)` — zanjirli chaqiruv imkonini beradi."
    },
    {
      id: 7,
      question: "`#log` har amalni yozishi qanday patternning sodda ko'rinishi?",
      options: ["Singleton", "Observer/hodisa jurnali", "Factory", "Decorator"],
      correctAnswer: 1,
      explanation: "Amallarni yozib borish — hodisalarga asoslangan kuzatish (audit log) sodda shakli."
    },
    {
      id: 8,
      question: "Serverdan kelgan JSON'ni klass nusxasiga aylantirish nima deb ataladi?",
      options: ["Serialization", "Hydration", "Minification", "Tree-shaking"],
      correctAnswer: 1,
      explanation: "Oddiy obyektlardan klass nusxalari yaratish — hydration (API ma'lumotlarini modellashtirish)."
    },
    {
      id: 9,
      question: "`VIPMember.borrow` ichida `super.borrow(book)` chaqiruvning maqsadi?",
      options: [
        "Ota metodni to'liq almashtirish",
        "Ota logikasini qayta yozmasdan kengaytirish",
        "Ota klassni o'chirish",
        "Statik metod chaqirish"
      ],
      correctAnswer: 1,
      explanation: "super — ota implementatsiyani ishga tushirib, ustiga qo'shimcha shart (limit) qo'yadi."
    },
    {
      id: 10,
      question: "`static LIMIT = 3` nega statik qilingan?",
      options: [
        "Har nusxada turlicha bo'lishi kerak",
        "Bu klass darajasidagi umumiy qoida, nusxaga bog'liq emas",
        "Tezroq o'qish uchun",
        "Xatolik — instance bo'lishi kerak"
      ],
      correctAnswer: 1,
      explanation: "Limit — barcha VIP a'zolar uchun bir xil qoida: klass darajasida saqlanadi."
    },
    {
      id: 11,
      question: "`Book` klassi bor-yo'qligini tekshirmasa, bu qaysi prinsipga mos?",
      options: ["DRY", "Single Responsibility", "KISS", "YAGNI"],
      correctAnswer: 1,
      explanation: "Book faqat o'z holati uchun javob beradi; biznes qoidasi Library'da — SRP."
    },
    {
      id: 12,
      question: "Haqiqiy ilovada `#log` o'rniga ko'pincha nima ishlatiladi?",
      options: [
        "CSS fayl",
        "EventEmitter yoki bazadagi audit jadvali",
        "HTML element",
        "Local storage'ga majburiy yozish"
      ],
      correctAnswer: 1,
      explanation: "Hodisalarni markazlashtirilgan yozish — EventEmitter, log tizimlari yoki DB audit jadvali."
    }
  ]
};
