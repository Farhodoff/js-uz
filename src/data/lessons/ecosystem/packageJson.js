export const packageJson = {
  id: "package-json",
  title: "package.json",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Har bir Node.js loyihasida \\\`package.json\\\` fayli bo'ladi. Uni loyihaning "pasporti" va "retsepti" deb tasavvur qiling. Siz biror taom tayyorlamoqchi bo'lsangiz, sizga kerakli masalliqlar ro'yxati (dependencies) va pishirish ketma-ketligi (scripts) kerak bo'ladi. Node.js dunyosida dastur ishlashi uchun zarur kutubxonalar va ularni ishga tushirish komandalari aynan shu faylda saqlanadi. 

## 2. 🚀 Deep Dive (Chuqur tahlil)

**Kutubxonalar (Dependencies) turlari:**
Loyihadagi paketlar vazifasiga qarab guruhlarga bo'linadi:
1. **dependencies**: Dasturning asosiy qismi ishlashi uchun doimiy kerak bo'ladigan kutubxonalar (masalan, \\\`react\\\`, \\\`express\\\`).
2. **devDependencies**: Faqat dasturlash (development) va test qilish jarayonida kerak bo'ladigan yordamchi vositalar (masalan, \\\`jest\\\`, \\\`nodemon\\\`, \\\`typescript\\\`). Ular ishlab chiqarishga (production) ketmaydi.
3. **peerDependencies**: Bu asosan kutubxona yaratuvchilar tomonidan ishlatiladi. "Mening kutubxonam ishlashi uchun sizning loyihangizda aynan shu paket bo'lishi shart" degan ma'noni beradi.
4. **optionalDependencies**: Agar ushbu paket o'rnatilishda xatolik bersa ham (masalan, OS mos kelmasa), dastur ishini to'xtatmay davom ettiraveradi.

**Semver (Semantic Versioning) - Versiyani boshqarish:**
Npm dagi barcha paketlar qat'iy versiyalash qoidasiga amal qiladi. Versiyalar 3 qismdan iborat bo'ladi: \\\`Major.Minor.Patch\\\` (masalan, \\\`1.4.2\\\`).
- **Patch** (1.4.**3**): Kichik xatolarni tuzatish (Bug fixes). Oldingi kodni buzmang.
- **Minor** (1.**5**.0): Yangi xususiyatlar (features) qo'shish. Oldingi funksionallik buzilmaydi (Backward compatible).
- **Major** (**2**.0.0): Katta o'zgarishlar. Oldingi kodlar mutlaqo ishlamay qolishi mumkin (Breaking changes).

Versiya belgilari:
- \\\`^1.4.2\\\` - Minor va Patch yangilanishlarni qabul qiladi (1.x.x gacha, lekin 2.0.0 emas).
- \\\`~1.4.2\\\` - Faqat Patch yangilanishlarni qabul qiladi (1.4.x, lekin 1.5.0 emas).
- \\\`1.4.2\\\` - Faqatgina aynan shu versiyani talab qiladi.

**Module Resolution va Exports:**
Zamonaviy Node.js muhitida loyiha tuzilishini boshqarish uchun \\\`"main"\\\` o'rniga \\\`"exports"\\\` maydoni keng qo'llanilmoqda. U orqali paketingizning qaysi qismlarini boshqalar import qilish mumkinligini aniq belgilashingiz mumkin:

\\\`\\\`\\\`javascript
{
  "name": "my-awesome-lib",
  "exports": {
    ".": "./index.js",
    "./utils": "./src/utils.js"
  }
}
\\\`\\\`\\\`

## 3. ⚠️ Edge Cases va Senior Interview Savollari

1. **\\\`package-lock.json\\\` nega kerak?**
   Javob: \\\`package.json\\\` dagi \\\`^\\\` va \\\`~\\\` belgilari tufayli jamoadagi turli dasturchilarda bitta paketning har xil versiyasi o'rnatilib qolishi mumkin. \\\`package-lock.json\\\` barcha qaramliklarning aynan qaysi versiyasi o'rnatilganini qotirib qo'yadi va "mening kompyuterimda ishlagandi" degan muammoni oldini oladi.

2. **\\\`"private": true\\\` nimaga kerak?**
   Javob: Agar o'z kompaniyangiz uchun yopiq kod yozayotgan bo'lsangiz, bu sozlama loyihangizni tasodifan ochiq npm registry'ga yuklanib ketishidan (publish qilinishidan) saqlaydi.

3. **\\\`engines\\\` maydoni nima vazifani bajaradi?**
   Javob: Loyihangiz aniq qaysi Node.js yoki npm versiyalarida ishlashi kafolatlanganini bildiradi. Masalan: \\\`"engines": { "node": ">=18.0.0" }\\\`.

## 4. 📊 Diagramma

Quyidagi diagrammada Semver (Semantic Versioning) va versiyalarning oshish ketma-ketligi qanday ishlashi ko'rsatilgan:

\\\`\\\`\\\`mermaid
graph TD
    A[Joriy Versiya: 1.4.2] --> B{Qanday o'zgarish qildingiz?}
    B -->|Kichik xato tuzatildi| C[Patch: 1.4.3]
    B -->|Yangi xususiyat qo'shildi| D[Minor: 1.5.0]
    B -->|Katta, buzuvchi o'zgarish| E[Major: 2.0.0]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Parse Semver",
      instruction: "`parseSemver(version)` funksiyasi '1.2.3' formatidagi stringni qabul qilib, `{ major: 1, minor: 2, patch: 3 }` obyektini qaytarsin.",
      startingCode: "function parseSemver(v) {\n  // code\n}",
      hint: "split('.') va Number() ishlating.",
      solution: "function parseSemver(v) {\n  const p = v.split('.');\n  return { major: Number(p[0]), minor: Number(p[1]), patch: Number(p[2]) };\n}",
      test: "const fn = new Function(code + '; return parseSemver;')();\nif(fn('1.2.3').major !== 1 || fn('2.0.1').patch !== 1) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Check Minor Update",
      instruction: "`isMinorUpdate(oldV, newV)` funksiyasi ikkita 'X.Y.Z' stringlarni solishtirsin. Agar faqat minor yoki patch versiya oshgan bo'lsa (major o'zgarmagan bo'lsa), true qaytarsin. Aks holda false.",
      startingCode: "function isMinorUpdate(oldV, newV) {\n  // code\n}",
      hint: "split orqali major qismlarini solishtiring.",
      solution: "function isMinorUpdate(oldV, newV) {\n  return oldV.split('.')[0] === newV.split('.')[0];\n}",
      test: "const fn = new Function(code + '; return isMinorUpdate;')();\nif(fn('1.2.3', '1.3.0') !== true || fn('1.9.9', '2.0.0') !== false) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Get All Dependencies",
      instruction: "`getAllDeps(pkg)` funksiyasi package.json obyektini qabul qilib, `dependencies` va `devDependencies` dagi barcha paket nomlarini bitta massivda qaytarsin.",
      startingCode: "function getAllDeps(pkg) {\n  // code\n}",
      hint: "Object.keys() yordam beradi.",
      solution: "function getAllDeps(pkg) {\n  const deps = pkg.dependencies ? Object.keys(pkg.dependencies) : [];\n  const devDeps = pkg.devDependencies ? Object.keys(pkg.devDependencies) : [];\n  return [...deps, ...devDeps];\n}",
      test: "const fn = new Function(code + '; return getAllDeps;')();\nif(fn({dependencies: {a: '1'}, devDependencies: {b: '2'}}).length !== 2) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Has Script",
      instruction: "`hasScript(pkg, scriptName)` funksiyasi package.json obyektidagi `scripts` bo'limida berilgan nomdagi script bor-yo'qligini tekshirsin.",
      startingCode: "function hasScript(pkg, name) {\n  // code\n}",
      hint: "in operatori yoki undefined tekshiruvi.",
      solution: "function hasScript(pkg, name) {\n  return Boolean(pkg.scripts && pkg.scripts[name]);\n}",
      test: "const fn = new Function(code + '; return hasScript;')();\nif(fn({scripts: {start: 'node'}}, 'start') !== true || fn({}, 'test') !== false) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Resolve Main",
      instruction: "`resolveMain(pkg)` funksiyasi pkg ichidan `main` fayl yo'lini qaytarsin. Agar ko'rsatilmagan bo'lsa, standart holda `'index.js'` qaytarsin.",
      startingCode: "function resolveMain(pkg) {\n  // code\n}",
      hint: "Mantiqiy YOKI (||) operatorini ishlating.",
      solution: "function resolveMain(pkg) {\n  return pkg.main || 'index.js';\n}",
      test: "const fn = new Function(code + '; return resolveMain;')();\nif(fn({main: 'app.js'}) !== 'app.js' || fn({}) !== 'index.js') throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Is Monorepo",
      instruction: "`isMonorepo(pkg)` funksiyasi agar loyiha workspaces ro'yxatiga ega bo'lsa va u kamida 1 ta elementdan iborat bo'lsa true qaytarsin.",
      startingCode: "function isMonorepo(pkg) {\n  // code\n}",
      hint: "Array.isArray va length xususiyatlarini tekshiring.",
      solution: "function isMonorepo(pkg) {\n  return Array.isArray(pkg.workspaces) && pkg.workspaces.length > 0;\n}",
      test: "const fn = new Function(code + '; return isMonorepo;')();\nif(fn({workspaces: ['packages/*']}) !== true || fn({}) !== false) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Validate Node Version",
      instruction: "`isValidNode(engines, currentVersion)` funksiyasi engines.node dagi minimal talabni tekshirsin. Masalan `>=14.0.0` bo'lsa, current 14 dan katta yoki tengligini tasdiqlasin.",
      startingCode: "function isValidNode(engines, curr) {\n  // code\n}",
      hint: "replace orqali keraksiz belgilarni olib, sonlarni solishtiring.",
      solution: "function isValidNode(engines, curr) {\n  if(!engines || !engines.node) return true;\n  const min = parseInt(engines.node.replace(/[>=]/g, ''));\n  return parseInt(curr) >= min;\n}",
      test: "const fn = new Function(code + '; return isValidNode;')();\nif(fn({node: '>=14.0.0'}, '16.0.0') !== true || fn({node: '>=18.0.0'}, '16.5.0') !== false) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Resolve Export Path",
      instruction: "`resolveExport(pkg, path)` zamonaviy Node.js `exports` maydonini o'qiydi. Agar bor bo'lsa qiymatini, bo'lmasa null qaytarsin.",
      startingCode: "function resolveExport(pkg, path) {\n  // code\n}",
      hint: "Obyekt ichidan kalit orqali qidiring.",
      solution: "function resolveExport(pkg, path) {\n  return (pkg.exports && pkg.exports[path]) ? pkg.exports[path] : null;\n}",
      test: "const fn = new Function(code + '; return resolveExport;')();\nif(fn({exports: {'.': './main.js'}}, '.') !== './main.js') throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Find Outdated Packages",
      instruction: "`findOutdated(current, latest)` obyekti qabul qiladi. current ichidagi versiya latest dagi versiyadan farq qiladigan paket nomlarini massiv qilib qaytaring.",
      startingCode: "function findOutdated(current, latest) {\n  // code\n}",
      hint: "Object.keys va filter yordamida farqlarni toping.",
      solution: "function findOutdated(current, latest) {\n  return Object.keys(current).filter(k => current[k] !== latest[k]);\n}",
      test: "const fn = new Function(code + '; return findOutdated;')();\nif(fn({a: '1.0', b: '2.0'}, {a: '1.1', b: '2.0'}).length !== 1) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Lock Version",
      instruction: "`lockVersion(version)` funksiyasi `^1.2.3` yoki `~1.2.3` ni qabul qilib, sof versiyani (`1.2.3`) qaytarsin.",
      startingCode: "function lockVersion(v) {\n  // code\n}",
      hint: "replace(/^[~^]/, '') yordam berishi mumkin.",
      solution: "function lockVersion(v) {\n  return v.replace(/^[~^]/, '');\n}",
      test: "const fn = new Function(code + '; return lockVersion;')();\nif(fn('^1.2.3') !== '1.2.3' || fn('2.0.0') !== '2.0.0') throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "package.json ning asosiy vazifasi nima?",
      options: ["Faqat kod xatolarini tekshirish", "CSS stillarni saqlash", "Loyihaga oid barcha ma'lumotlar, kutubxonalar va skriptlarni saqlash", "Baza ma'lumotlarini keshda saqlash"],
      correctAnswer: 2,
      explanation: "package.json loyiha retsepti hisoblanib, nimalar o'rnatilishi va dastur qanday ishlashi kerakligini o'z ichiga oladi."
    },
    {
      id: 2,
      question: "dependencies va devDependencies o'rtasidagi asosiy farq nimada?",
      options: ["Hech qanday farqi yo'q", "devDependencies faqat dasturlash va test paytida kerak bo'ladi, dependencies esa doimiy kerak", "dependencies tezroq ishlaydi", "devDependencies faqat CSS kutubxonalari uchun"],
      correctAnswer: 1,
      explanation: "Loyihani serverga deploy qilganda (production) devDependencies ichidagi paketlar o'rnatilmaydi, bu esa server xotirasini tejaydi."
    },
    {
      id: 3,
      question: "^1.4.2 belgisidagi (^) caret belgisi nimani anglatadi?",
      options: ["Faqat Patch (kichik xatolar) o'zgarishlarini qabul qiladi", "Major, Minor va Patch o'zgarishlariga ruxsat beradi", "Minor (yangi imkoniyatlar) va Patch (xato tuzatish) yangilanishlariga ruxsat beradi", "Versiyani butunlay bloklaydi"],
      correctAnswer: 2,
      explanation: "^ belgisi mavjud kodni buzib yuboradigan Major yangilanishlarni (masalan 2.0.0) cheklaydi, ammo Minor va Patch'ga ruxsat beradi."
    },
    {
      id: 4,
      question: "~1.4.2 belgisidagi (~) tilde belgisi nimani anglatadi?",
      options: ["Minor va Patch yangilanishlarni qabul qiladi", "Faqat Patch (xato tuzatish) yangilanishlariga ruxsat beradi", "Barcha turdagi yangilanishlarni qabul qiladi", "Avtomatik tarzda o'chirib yuboradi"],
      correctAnswer: 1,
      explanation: "~ belgisi juda qattiq cheklov bo'lib, u faqat eng kichik xatolarni tuzatuvchi Patch (masalan 1.4.5) yangilanishlarni o'rnatadi."
    },
    {
      id: 5,
      question: "peerDependencies kimlar tomonidan ko'proq ishlatiladi?",
      options: ["Faqat frontend dasturchilar", "Kutubxona yoki plagin yaratuvchilar tomonidan", "Baza ma'murlari (DBA)", "Faqat test yozuvchilar"],
      correctAnswer: 1,
      explanation: "Kutubxona yaratuvchisi 'mening paketim ishlashi uchun foydalanuvchi o'z loyihasiga Reactni o'rnatgan bo'lishi kerak' deganda peerDependencies ishlatadi."
    },
    {
      id: 6,
      question: "package-lock.json fayli nega juda muhim?",
      options: ["Kod tezligini 10 barobar oshiradi", "U Github'ga kod yuklashni taqiqlaydi", "Jamoada hammada paketlarning aynan bir xil versiyasi bo'lishini ta'minlash uchun qaramliklarni qotirib qo'yadi", "Faqat viruslardan himoya qiladi"],
      correctAnswer: 2,
      explanation: "Agar kimdir loyihani 1 oydan keyin yuklab olsa ham, package-lock.json orqali sizning kompyuteringizdagi bilan yuz foiz bir xil versiyalar o'rnatiladi."
    },
    {
      id: 7,
      question: "scripts maydoni qanday maqsadda ishlatiladi?",
      options: ["JS kodlarini siqish uchun", "Ma'lumotlar bazasini yaratish uchun", "Dasturni ishga tushirish, test qilish, build kabi maxsus buyruqlarni (komandalarni) yozib qo'yish uchun", "Faqatgina npm init qilish uchun"],
      correctAnswer: 2,
      explanation: "Siz npm start, npm run dev, npm test kabi buyruqlarni aynan scripts ichiga yozasiz."
    },
    {
      id: 8,
      question: "main va exports maydonlarining asosiy farqi nimada?",
      options: ["exports CSS fayllarni ulash uchun", "exports zamonaviyroq va modulning aniq qaysi qismlarini boshqalar import qila olishini aniq nazorat qiladi", "Ularning farqi yo'q", "main faqat brauzerlar uchun"],
      correctAnswer: 1,
      explanation: "main maydoni loyihaning faqat bitta kirish nuqtasini belgilaydi. exports esa turli xil papka va fayllar uchun maxsus yo'llarni ko'rsatish imkonini beradi."
    },
    {
      id: 9,
      question: "Loyihangiz xato tufayli ommaviy NPM katalogiga (registry) yuklanib ketmasligi uchun qaysi maydonni yozish kerak?",
      options: ["\"public\": false", "\"private\": true", "\"hidden\": true", "\"secure\": \"always\""],
      correctAnswer: 1,
      explanation: "\"private\": true qatorini qo'shsangiz, npm publish komandasi ishlamaydi va loyihangiz xavfsiz qoladi."
    },
    {
      id: 10,
      question: "engines maydoni orqali nima qilinadi?",
      options: ["Video karta kuchini o'lchash", "Loyiha qaysi operatsion tizimda ishlashini hal qilish", "Loyiha ishlashi uchun aynan qaysi Node.js va npm versiyalari talab etilishini belgilash", "Faqat V8 engine xususiyatlarini yoqish"],
      correctAnswer: 2,
      explanation: "Sizning kodingizdagi ba'zi qismlar Node.js 18+ ni talab qilsa, buni engines maydonida ko'rsatishingiz zarur."
    },
    {
      id: 11,
      question: "workspaces maydoni qachon kerak bo'ladi?",
      options: ["CSS animatsiyalarni ishlashda", "React komponentlarini optimizatsiya qilishda", "Monorepo arxitekturasida bitta papka ichida bir nechta paketlarni birgalikda boshqarishda", "Faqat Docker ishlatganda"],
      correctAnswer: 2,
      explanation: "workspaces yordamida bitta katta repozitoriy ichida turli frontend va backend paketlarni qulay integratsiya qilsa bo'ladi."
    },
    {
      id: 12,
      question: "Semantic Versioning (Semver) qoidasiga ko'ra, Major versiya (X.0.0) qachon o'zgartiriladi?",
      options: ["Kichik xatolik (bug) tuzatilganda", "O'zgarishlar mavjud API'larni buzib yuboradigan (breaking changes) va eski kodlar bilan mos tushmaydigan holatlarda", "Faqat hujjatlar yangilanganda", "Har bir haftada bir marta"],
      correctAnswer: 1,
      explanation: "Agar siz foydalanuvchilar o'zgartirishi shart bo'lgan katta kod yangilanishi qilsangiz, albatta Major versiyani oshirishingiz kerak."
    }
  ]
};
