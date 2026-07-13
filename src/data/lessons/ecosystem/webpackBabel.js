export const webpackBabel = {
  id: "webpack-babel",
  title: "Webpack va Babel (Ecosystem)",
  theory: `
# Webpack va Babel

## 1-qism: Boshlang'ich O'xshatish (Beginner Analogy)
Tasavvur qiling, siz katta restoranda bosh oshpazsiz. Sizda turli xil masalliqlar (pomidor, go'sht, ziravorlar) bor. Lekin mijozga ularni pishirib, chiroyli idishda, bitta tayyor taom sifatida taqdim etishingiz kerak. 
- **Webpack** bu - sizning oshxonangizdagi yordamchilaringiz. Ular hamma turli xil masalliqlarni (JS fayllar, CSS, rasmlar) yig'ib, bitta tayyor taom (bundle.js) holatiga keltiradi.
- **Babel** esa - tarjimon. Tasavvur qiling, ba'zi mijozlar faqat eski tilda gaplashadi (eski brauzerlar). Sizning yangi retseptlaringiz (ES6+ kod) ular uchun tushunarsiz. Babel sizning zamonaviy retseptingizni o'sha eski mijozlar tushunadigan tilga o'girib beradi.

## 2-qism: Chuqur O'rganish (Deep Dive)

### Webpack qanday ishlaydi?
Webpack modullarni yig'ishda quyidagi bosqichlardan o'tadi:
1. **Entry (Kirish nuqtasi)**: Webpack ilovaning qayerdan boshlanishini bilishi kerak (masalan, \\\`index.js\\\`).
2. **Dependency Graph (Bog'liqliklar grafi)**: Webpack kirish nuqtasidan boshlab, fayldagi hamma \\\`import\\\` va \\\`require\\\` larni o'qib chiqadi va qaysi fayl qaysi faylga bog'liqligini xaritasi (Dependency Graph) ni tuzadi.
3. **Loaders (Yuklagichlar)**: Webpack asosan faqat JS va JSON ni tushunadi. CSS, rasmlar yoki TS kabi fayllarni tushunish uchun Loaders kerak bo'ladi (masalan, \\\`css-loader\\\`, \\\`ts-loader\\\`).
4. **Plugins (Plaginlar)**: Ular murakkabroq ishlarni bajaradi: kodni siqish (minification), muhit o'zgaruvchilarini qo'shish, HTML fayl yaratish va h.k.
5. **Output (Chiqish)**: Barcha fayllar bitta yoki bir nechta "bundle" fayllarga yig'ilib, ko'rsatilgan papkaga (masalan, \\\`dist/\\\`) saqlanadi.

### Babel va AST Transformation
Babel - bu JavaScript kompilatori. U zamonaviy kodni (ES6+) eskiroq brauzerlar tushunadigan ES5 kodiga o'zgartiradi.
Bu jarayon 3 bosqichda amalga oshadi:
1. **Parsing (Tahlil qilish)**: Kodni o'qiydi va Abstract Syntax Tree (AST - mavhum sintaksis daraxti) ga aylantiradi.
2. **Transforming (O'zgartirish)**: AST ni olib, uni kerakli qoidalarga (preset va pluginlarga) ko'ra o'zgartiradi.
3. **Generating (Yaratish)**: Yangi o'zgartirilgan AST dan qayta JavaScript kodini hosil qiladi.

### Tree-shaking
Tree-shaking - bu Webpack'ning ishlatilmagan kodlarni (dead code) "bundle" dan olib tashlash qobiliyati. Bu orqali dastur hajmi sezilarli darajada qisqaradi. ES6 modullarining (\\\`import/export\\\`) statik tahlil qilinishi tree-shaking ishlashiga imkon beradi.

## 3-qism: Edge Cases va Senior Interview Savollari

**Savol 1: Webpack'da Hot Module Replacement (HMR) qanday ishlaydi?**
**Javob:** HMR ilovani to'liq qayta yuklamasdan (reload) faqat o'zgargan modullarni brauzerda yangilash imkonini beradi. U Webpack Dev Server bilan birgalikda WebSockets orqali ishlaydi. Fayl o'zgarganda, dev-server yangi modul kodini brauzerga jo'natadi va brauzerdagi HMR runtime eski modulni yangisiga almashtiradi.

**Savol 2: Babel polyfill va transform-runtime o'rtasidagi farq nima?**
**Javob:** Babel asosan sintaksisni (masalan, arrow functions) o'zgartiradi. Lekin yangi API lar (masalan, \\\`Promise\\\`, \\\`Array.from\\\`) uchun polyfill kerak. 
- \\\`@babel/polyfill\\\` global obyektlarni ifloslantiradi (pollutes global scope).
- \\\`@babel/plugin-transform-runtime\\\` esa global ob'ektlarni o'zgartirmasdan yordamchi funksiyalarni import qiladi, bu kutubxona (library) yozishda juda muhim.

**Savol 3: Webpack'da Code Splitting nima va nima uchun kerak?**
**Javob:** Ilova kattalashgan sari bitta katta bundle.js fayli brauzerda yuklanishni sekinlashtiradi. Code Splitting kodni bir nechta kichik "chunk" larga bo'lish imkonini beradi. Ular faqat kerak bo'lganda yuklanadi (Lazy loading - \\\`import()\\\`).

## Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Entry: index.js] --> B(Dependency Graph)
    B --> C{Loaders tahlili}
    C -->|JS/TS| D[Babel: AST Transform]
    C -->|CSS/SCSS| E[Style Loaders]
    C -->|Images| F[Asset Modules]
    D --> G(Webpack Plugins)
    E --> G
    F --> G
    G --> H[Minification & Tree-Shaking]
    H --> I[Output: bundle.js]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Entry sozlash",
      description: "Webpack konfiguratsiyasida entry (kirish nuqtasi) qanday sozlanadi? 'src/index.js' faylini entry qilib belgilang.",
      starterCode: "module.exports = {\\n  // code here\\n};",
      solution: "module.exports = {\\n  entry: './src/index.js'\\n};",
      hints: ["'entry' xususiyatidan foydalaning"]
    },
    {
      id: 2,
      title: "Output sozlash",
      description: "Webpack konfiguratsiyasida output (chiqish nuqtasi) papkasini 'dist' va fayl nomini 'bundle.js' qilib sozlang.",
      starterCode: "const path = require('path');\\nmodule.exports = {\\n  // code here\\n};",
      solution: "const path = require('path');\\nmodule.exports = {\\n  output: {\\n    path: path.resolve(__dirname, 'dist'),\\n    filename: 'bundle.js'\\n  }\\n};",
      hints: ["'output' obyekti ichida 'path' va 'filename' ni kiriting"]
    },
    {
      id: 3,
      title: "Babel-loader qo'shish",
      description: ".js fayllari uchun babel-loader ni ishlatish qoidasini yozing (node_modules papkasini istisno qiling).",
      starterCode: "module.exports = {\\n  module: {\\n    rules: [\\n      // code here\\n    ]\\n  }\\n};",
      solution: "module.exports = {\\n  module: {\\n    rules: [\\n      {\\n        test: /\\\\.js$/,\\n        exclude: /node_modules/,\\n        use: {\\n          loader: 'babel-loader'\\n        }\\n      }\\n    ]\\n  }\\n};",
      hints: ["'module.rules' ichida obyekt ochib, 'test', 'exclude', 'use' maydonlarini to'ldiring"]
    },
    {
      id: 4,
      title: "Css-loader va style-loader qo'shish",
      description: ".css fayllari uchun mos loaderlarni sozlang.",
      starterCode: "module.exports = {\\n  module: {\\n    rules: [\\n      // code here\\n    ]\\n  }\\n};",
      solution: "module.exports = {\\n  module: {\\n    rules: [\\n      {\\n        test: /\\\\.css$/,\\n        use: ['style-loader', 'css-loader']\\n      }\\n    ]\\n  }\\n};",
      hints: ["Loaderlar o'ngdan chapga ishlaydi, shuning uchun oldin 'style-loader' keyin 'css-loader' qo'yiladi"]
    },
    {
      id: 5,
      title: "Babel Preset",
      description: "Babel konfiguratsiyasida (babel.config.js yoki .babelrc) ES6+ kodni tarjima qilish uchun '@babel/preset-env' presetini sozlang.",
      starterCode: "module.exports = {\\n  // code here\\n};",
      solution: "module.exports = {\\n  presets: ['@babel/preset-env']\\n};",
      hints: ["'presets' massivi ichida '@babel/preset-env' ni kiriting"]
    },
    {
      id: 6,
      title: "HtmlWebpackPlugin",
      description: "Webpack konfiguratsiyasida 'HtmlWebpackPlugin' plaginini qo'shing va template sifatida 'src/index.html' ni ishlating.",
      starterCode: "const HtmlWebpackPlugin = require('html-webpack-plugin');\\nmodule.exports = {\\n  // code here\\n};",
      solution: "const HtmlWebpackPlugin = require('html-webpack-plugin');\\nmodule.exports = {\\n  plugins: [\\n    new HtmlWebpackPlugin({\\n      template: './src/index.html'\\n    })\\n  ]\\n};",
      hints: ["'plugins' massiviga yangi HtmlWebpackPlugin instansiyasini qo'shing"]
    },
    {
      id: 7,
      title: "Dev Server sozlash",
      description: "Webpack dev server portini 3000 qilib belgilang va 'hot' rejimini yoqing.",
      starterCode: "module.exports = {\\n  // code here\\n};",
      solution: "module.exports = {\\n  devServer: {\\n    port: 3000,\\n    hot: true\\n  }\\n};",
      hints: ["'devServer' obyekti ichida 'port' va 'hot' maydonlarini sozlang"]
    },
    {
      id: 8,
      title: "Code Splitting (Dynamic Import)",
      description: "math.js faylidagi add funksiyasini dinamik import qilib, keyin ishlating.",
      starterCode: "// code here",
      solution: "import('./math.js').then(math => {\\n  console.log(math.add(2, 3));\\n});",
      hints: ["'import()' funksiyasidan foydalaning va u Promise qaytarishini hisobga oling"]
    },
    {
      id: 9,
      title: "Mode sozlash",
      description: "Webpack konfiguratsiyasida rejimni 'production' ga o'rnating.",
      starterCode: "module.exports = {\\n  // code here\\n};",
      solution: "module.exports = {\\n  mode: 'production'\\n};",
      hints: ["'mode' xususiyatidan foydalaning"]
    },
    {
      id: 10,
      title: "Asset Modules (Rasmlar uchun)",
      description: "Webpack 5 Asset Modules yordamida .png va .jpg fayllarini qayta ishlash qoidasini yozing (type: 'asset/resource').",
      starterCode: "module.exports = {\\n  module: {\\n    rules: [\\n      // code here\\n    ]\\n  }\\n};",
      solution: "module.exports = {\\n  module: {\\n    rules: [\\n      {\\n        test: /\\\\.(png|jpg)$/,\\n        type: 'asset/resource'\\n      }\\n    ]\\n  }\\n};",
      hints: ["'type: asset/resource' dan foydalaning"]
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Webpack ning asosiy vazifasi nima?",
      options: [
        "Fayllarni va modullarni bitta (yoki bir nechta) bundle ga yig'ish",
        "Ma'lumotlar bazasini boshqarish",
        "Faqat JavaScript kodni formatlash",
        "Brazuerda DOM ni yaratish"
      ],
      correctAnswer: 0,
      explanation: "Webpack - bu module bundler (modullarni yig'uvchi vosita). U turli xil fayllarni olib, brauzer tushunadigan bundle ga yig'adi."
    },
    {
      id: 2,
      question: "Babel qanday vazifani bajaradi?",
      options: [
        "JS fayllarni bitta qilib yig'adi",
        "Zamonaviy JavaScript kodini (ES6+) eskiroq muhitlar tushunadigan versiyaga (ES5) o'zgartiradi",
        "CSS fayllarni minifikatsiya qiladi",
        "Rasmlarni optimizatsiya qiladi"
      ],
      correctAnswer: 1,
      explanation: "Babel - bu JavaScript transkompilyatori (compiler). U ES6 va undan yuqori versiyalarni ES5 kabi eski versiyalarga aylantirib beradi."
    },
    {
      id: 3,
      question: "Webpack loaderlar qanday ketma-ketlikda bajariladi?",
      options: [
        "Yuqoridan pastga, chapdan o'ngga",
        "Pastdan yuqoriga, o'ngdan chapga",
        "Bir vaqtning o'zida",
        "Faqat alifbo tartibida"
      ],
      correctAnswer: 1,
      explanation: "Webpack'da loaderlar massivi doimo oxiridan boshiga, ya'ni o'ngdan chapga qarab o'qiladi va bajariladi."
    },
    {
      id: 4,
      question: "Abstract Syntax Tree (AST) nima?",
      options: [
        "O'rmondagi daraxt turi",
        "Dastur kodining mavhum sintaktik tuzilishining daraxt ko'rinishida ifodalanishi",
        "CSS klasslarining ro'yxati",
        "Brauzerning DOM daraxti"
      ],
      correctAnswer: 1,
      explanation: "AST - kodning tuzilishini kompyuter (compiler) tushunishi uchun yaratiladigan daraxtsimon ma'lumotlar strukturasi."
    },
    {
      id: 5,
      question: "Tree-shaking nima?",
      options: [
        "Xatoliklarni qidirish algoritmi",
        "Dastur kodidagi bo'sh joylarni tozalash",
        "Loyihadagi umuman ishlatilmayotgan (dead code) kodni bundle'dan olib tashlash",
        "Daraxtsimon ma'lumotlar strukturasini yaratish"
      ],
      correctAnswer: 2,
      explanation: "Tree-shaking - bu ishlatilmagan va keraksiz kodlarni oxirgi chiqish faylidan (bundle) olib tashlash jarayoni."
    },
    {
      id: 6,
      question: "Webpack'da 'Entry' nima?",
      options: [
        "Fayllar saqlanadigan joy",
        "Webpack ilovani yig'ishni boshlaydigan birinchi fayl (kirish nuqtasi)",
        "Barcha xatolar ro'yxati",
        "HTML faylining nomi"
      ],
      correctAnswer: 1,
      explanation: "Entry - bu webpack dependency graph yaratishni boshlaydigan asosiy kirish nuqtasi hisoblanadi."
    },
    {
      id: 7,
      question: "Babel polyfill qachon kerak bo'ladi?",
      options: [
        "Arrow function larni o'zgartirish uchun",
        "Yangi JavaScript ob'ektlari (Promise, Map) eski brauzerlarda ishlashi uchun",
        "CSS fayllarni yuklash uchun",
        "Webpack serverni ishga tushirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Babel sintaksisni (Syntax) o'zgartira oladi, lekin yangi ob'ektlar va metodlar (API) eski brauzerlarda bo'lmagani uchun ularni polyfill (qo'shimcha kod) yordamida qo'shish kerak."
    },
    {
      id: 8,
      question: "Webpack plaginlari nima maqsadda ishlatiladi?",
      options: [
        "Faqat JS fayllarini o'qish uchun",
        "Loaderlar qila olmaydigan murakkab vazifalarni (masalan bundle ni siqish, muhit o'zgaruvchilarini sozlash) bajarish uchun",
        "Faqat xatolarni ushlash uchun",
        "Babelni o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Plaginlar loaderlarga qaraganda kuchliroq bo'lib, ular butun kompilyatsiya jarayoniga aralasha oladi."
    },
    {
      id: 9,
      question: "Code Splitting qanday afzallik beradi?",
      options: [
        "Barcha kodlarni bitta faylga yig'adi",
        "Kodlarni qismlarga bo'lib, sahifa tezroq yuklanishi uchun ularni kerak bo'lganda (lazy) yuklash imkonini beradi",
        "Kodni xavfsizroq qiladi",
        "Kodni qisqartiradi"
      ],
      correctAnswer: 1,
      explanation: "Code Splitting orqali dastlabki yuklanish (initial load) hajmi kamayadi, chunki kodlar qismlarga bo'linadi va foydalanuvchiga faqat kerakli qismi jo'natiladi."
    },
    {
      id: 10,
      question: "Hot Module Replacement (HMR) qanday ishlaydi?",
      options: [
        "Sahifani to'liq yangilash orqali",
        "Faqat CSS fayllarni yangilaydi",
        "Ilovaning joriy holatini saqlab qolgan holda faqat o'zgargan modullarni brauzerda yangilaydi",
        "Serverni o'chirib yoqadi"
      ],
      correctAnswer: 2,
      explanation: "HMR dasturlash paytida butun sahifani refresh qilmasdan faqat kod o'zgargan qismini yangilaydi. Bu orqali ilova holati (state) saqlanib qoladi."
    },
    {
      id: 11,
      question: "Webpack Dependency Graph qanday tuziladi?",
      options: [
        "Faqat papkadagi fayllar ro'yxatini oladi",
        "Entry nuqtasidan boshlab barcha import va require larni o'qish orqali",
        "Faqat package.json faylidan",
        "Internetdan ko'chirib olinadi"
      ],
      correctAnswer: 1,
      explanation: "Webpack entry fayldan boshlab, kod ichidagi import qilingan barcha modullarni o'qib, ularning bir-biriga bog'liqlik xaritasini tuzadi."
    },
    {
      id: 12,
      question: "Webpack 'mode' parametrini 'production' qilsak nima o'zgaradi?",
      options: [
        "Kodni tezroq kompilyatsiya qiladi, lekin optimizatsiya qilmaydi",
        "Avtomatik ravishda kodni siqish (minification) va tree-shaking kabi turli xil optimizatsiyalarni yoqadi",
        "Serverga avtomatik yuklaydi",
        "Barcha loaderlarni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "'production' mode yoniq bo'lsa, webpack ko'plab o'rnatilgan optimizatsiya plaginlarini (masalan, TerserPlugin) ishga tushiradi."
    }
  ]
};
