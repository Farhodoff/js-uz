export const v8CompilerOptimization = {
  id: "v8CompilerOptimization",
  title: "V8 Dvigateli: Kompilyatsiya va Optimizatsiya",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### V8 Dvigateli nima?
JavaScript dunyodagi eng tezkor dinamik tillardan biridir. Bunga sabab — brauzerlar ichida (masalan, Google Chrome, Node.js) ishlaydigan **V8 dvigateli** kabi kuchli kompilyatsiya tizimlaridir. 
JavaScript sinxron, interpretatsiya qilinadigan (satrma-satr o'qiladigan) tildan yuqori optimallashtirilgan mashina kodiga aylanadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **xalqaro biznes muzokaralarida ishtirok etayotgan tarjimonsiz**:
* **Interpreter (Ignition Bytecode):** Siz spiker gapirishi bilan gapni darhol tarjima qilasiz. Bu tez boshlanadi, lekin juda ko'p energiya talab qiladi va qayta-qayta gapirilgan jumlalarni ham har safar noldan tarjima qilishingiz kerak.
* **JIT Compiler (TurboFan):** Agar muzokarada bir xil shartnomalar va jumlalar tez-tez takrorlansa, siz ularni yozib olasiz, mukammal o'zbekcha tarjimasini tayyorlab qo'yasiz va spiker o'sha gapni boshlashi bilan tayyor tarjimani o'qiysiz. Bu kompilyatsiya (optimizatsiya) jarayonidir.
* **Deoptimization (Deopt):** Agar kutilmaganda spiker boshqa tilda yoki mutlaqo yangi terminlar bilan gapirib yuborsa, siz tayyor shabloningizni chetga surib, yana satrma-satr tarjima qilishga majbur bo'lasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Hidden Class (Yashirin Klaslar) barqarorligi
V8 obyektdagi xossalarni offset bo'yicha tez topish uchun ularga yashirin klaslar (Shapes) biriktiradi.
\`\`\`javascript
// 1-holat: Bir xil tartibda xossalar yaratish (Optimal)
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const p1 = new Point(1, 2); // Shape A
const p2 = new Point(3, 4); // Shape A (ikkalasi ham bitta yashirin klasga ega)

// 2-holat: Har xil tartibda xossalar yaratish (Deopt/Nooptimal)
const obj1 = {};
obj1.x = 1;
obj1.y = 2; // Shape A (x -> y)

const obj2 = {};
obj2.y = 2;
obj2.x = 1; // Shape B (y -> x) - V8 bularni ikki xil shakl deb hisoblaydi!
\`\`\`

### 2. Inline Caching (IC) va Monomorfizm
Dvigatel hot (issiq) funksiyalarni tezlashtirish uchun obyektdagi property qidiruv natijalarini keshlab oladi.
\`\`\`javascript
function getX(obj) {
  return obj.x; // Inline cache bu yerda shaklni eslab qoladi
}

// Monomorphic holat (Eng tezi)
const o1 = { x: 1, y: 2 };
const o2 = { x: 3, y: 4 };
for (let i = 0; i < 1000000; i++) {
  getX(o1);
  getX(o2); // Faqat bitta yashirin klas (Shape) ko'rilgan
}
\`\`\`

### 3. Deopt (Deoptimization) misoli
Kutilmagan turdagi argument uzatilganda optimallashtirilgan kodning orqaga qaytishi:
\`\`\`javascript
function add(a, b) {
  return a + b;
}

// 1. Dvigatel funksiyani ko'p marta sonlar bilan chaqiradi
for (let i = 0; i < 10000; i++) add(i, i); // TurboFan funksiyani sonlar uchun optimallashtiradi

// 2. Kutilmaganda string uzatiladi
add("hello", "world"); // BOOM! TurboFan optimallashtirilgan kodni tashlab yuboradi (Deoptimization)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### V8 Source-to-Optimized-Code Pipeline

\`\`\`mermaid
graph TD
    A[Source Code] --> B[Parser]
    B --> C[Abstract Syntax Tree - AST]
    C --> D[Ignition Interpreter]
    D -->|Bytecode| E[Sparkplug Compiler]
    D -->|Profiling Data| F[Maglev Compiler]
    F -->|Optimized Code| G[TurboFan Compiler]
    G -->|Deoptimization| D
    D --> H[Machine Code Execution]
\`\`\`

1. **Parser va AST:** Dastlab JavaScript kodi o'qiladi, sintaktik tahlil qilinadi va daraxtsimon struktura — AST (Abstract Syntax Tree) yaratiladi.
2. **Ignition Interpreter:** AST asosida tezda **Bytecode** generatsiya qilinadi va darhol bajarila boshlaydi. Ignition bajarilish jarayonida funksiyalarning qanchalik tez-tez chaqirilayotganini va qanday turlar (types) uzatilayotganini kuzatadi (**Profiling**).
3. **Sparkplug Compiler:** Juda tezkor kompilyator bo'lib, bytecodeni to'g'ridan-to'g'ri mashina kodiga o'tkazadi (hech qanday optimallashtirishsiz).
4. **Maglev Compiler:** O'rta darajadagi optimallashtiruvchi kompilyator. U kodni tezda o'rta darajada optimallashtirilgan mashina kodiga aylantiradi.
5. **TurboFan Compiler:** Peak optimallashtiruvchi. Agar biror funksiya juda ko'p chaqirilsa ("hot function"), TurboFan uni oladi va olingan profiling ma'lumotlariga suyanib, juda tezkor mashina kodini ishlab chiqadi.
6. **Deoptimization:** Agar profiling davomida olingan taxminlar noto'g'ri chiqsa (masalan, har doim butun son kelayotgan joyga obyekt kelib qolsa), optimallashtirilgan kod buziladi va dvigatel yana Ignition interpreteriga (Bytecode bajarishga) qaytadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Xossalarni dynamic ravishda o'chirish (\`delete\`)
Obyektdan \`delete\` orqali xossani o'chirish uni yashirin klas (Shape) tizimidan chiqarib yuboradi va uning xotiradagi ko'rinishini sekinroq ishlaydigan "Dictionary Mode" (lug'at rejimi)ga o'tkazadi.
* **Noto'g'ri:**
  \`\`\`javascript
  const user = { name: "Sardor", age: 25 };
  delete user.age; // V8 shape-ni buzadi va Dictionary mode-ga o'tadi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const user = { name: "Sardor", age: 25 };
  user.age = undefined; // Yoki null, lekin shape saqlanib qoladi
  \`\`\`

### 2. Obyekt xossalarining tartibini buzish
* **Noto'g'ri:**
  \`\`\`javascript
  const objA = { x: 1, y: 2 };
  const objB = {};
  objB.y = 2;
  objB.x = 1; // objA va objB mutlaqo boshqa yashirin klaslarga ega bo'ladi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const objA = { x: 1, y: 2 };
  const objB = { x: 1, y: 2 }; // Xossalar har doim bir xil tartibda e'lon qilinadi
  \`\`\`

---

## 5. 📝 Qisqacha Xulosa (Cheat Sheet)

| Komponent / Tushuncha | Vazifasi / Ta'rifi | Tezlik darajasi |
| :--- | :--- | :--- |
| **Ignition** | Interpretator, baytkod bajaradi, profiling ma'lumotlarini yig'adi. | Boshlang'ich tezlik |
| **TurboFan** | Peak optimallashtiruvchi kompilyator, JIT mashina kodi generatsiya qiladi. | Juda tez |
| **Hidden Classes** | Obyektlar uchun V8 yaratadigan yashirin shape-lar zanjiri. | Offset bo'yicha tezkor kirish |
| **Monomorphic IC** | Inline Cache faqat 1 xil shape-ni eslab qolgan holat. | Maksimal tezkor |
| **Polymorphic IC** | Inline Cache 2 dan 4 tagacha bo'lgan turli xil shape-larni eslab qolgan holat. | O'rtacha tezkor |
| **Megamorphic IC** | 5 va undan ortiq shape ko'rilgan holat (keshlash ishlamaydi, sekinlashadi). | Sekin (Dictionary lookup) |

---

## 6. ❓ Savollar va Javoblar

### 1. Nima uchun JavaScript-da property tartibi muhim?
Chunki V8 dynamic obyektlar bilan ishlashda static tillardagi (masalan, C++, Java) kabi xossalarga offset (manzil surilishi) orqali juda tez kirishni xohlaydi. Agar xossalar tartibi har xil bo'lsa, offsets ham o'zgaradi va V8 yangi shape yaratishga majbur bo'ladi.

### 2. Deopt (deoptimizatsiya) nima uchun xavfli?
Chunki deoptimizatsiya vaqtida katta protsessor resursi sarflanadi. Dvigatel optimallashtirilgan mashina kodidan voz kechib, registrlardagi holatni yana interpretator darajasiga qaytarishi kerak. Bu esa vaqtinchalik sekinlashuvga (jank) olib keladi.

---

## 7. 🧠 O'z-o'zini Tekshirish

1. Inline caching-ning monomorfik, polimorfik va megamorfik holatlarining farqi nimada?
2. Array-larda \`PACKED\` va \`HOLEY\` elementlar farqi nimada va nega \`HOLEY\` array-lar sekinroq ishlaydi?
3. Nega hot loops (tez-tez ishlaydigan sikllar) ichida obyekt shakllarini o'zgartirmaslik kerak?

---

## 8. 🚀 Amaliy Topsiriq

Quyidagi topshiriqlar va testlar yordamida V8 dvigatelining kompilyatsiya va optimallashtirish qoidalariga mos kod yozish ko'nikmalaringizni shakllantiring.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Yashirin Klaslar Transitsiyasini Simulyatsiya Qilish",
      instruction: "Berilgan boshlang'ich shape ID (masalan `0`) va obyektga qo'shiladigan yangi xossa (key) nomini qabul qilib, transitsiyani qaytaruvchi `transitionShape(currentShapeId, key, transitions)` funksiyasini yozing. `transitions` — bu `{ '0->x': 1, '1->y': 2 }` ko'rinishidagi mavjud transitsiyalar xaritasi. Agar transitsiya mavjud bo'lmasa, `-1` qaytaring.",
      startingCode: "function transitionShape(currentShapeId, key, transitions) {\n  // Kodni shu yerda yozing\n}",
      hint: "currentShapeId va keyni '->' yordamida birlashtirib kalit yarating va uni transitions ichidan qidiring.",
      test: "if (transitionShape(0, 'x', { '0->x': 1, '1->y': 2 }) !== 1) return 'Xato transition!';\nif (transitionShape(1, 'z', { '0->x': 1, '1->y': 2 }) !== -1) return 'Mavjud bo\\'lmagan transition uchun -1 qaytishi kerak';"
    },
    {
      id: 2,
      title: "2️⃣ Monomorfik Obyekt Shape Yaratuvchi Helper",
      instruction: "V8 dvigateli ikkita obyektni bitta Hidden Class-da saqlashi uchun ularning xossalari bir xil tartibda yaratilishi kerak. `createMonomorphicPair(key1, value1, key2, value2)` funksiyasini yozing. U ikkita obyektni o'z ichiga olgan massiv qaytarsin: `[objA, objB]`. Har ikkala obyektda har doim xossalar e'lon qilinish tartibi bir xil (`key1` birinchi, `key2` ikkinchi) bo'lsin.",
      startingCode: "function createMonomorphicPair(key1, val1, key2, val2) {\n  // Kodni shu yerda yozing\n}",
      hint: "Object dynamic literal yordamida har bir obyektni yaratishda avval key1 ni, keyin esa key2 ni e'lon qiling.",
      test: "const pair = createMonomorphicPair('a', 10, 'b', 20);\nif (Object.keys(pair[0]).join(',') !== 'a,b') return 'Birinchi obyekt shakli noto\\'g\\'ri';\nif (Object.keys(pair[1]).join(',') !== 'a,b') return 'Ikkinchi obyekt shakli noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Inline Caching State Evaluator",
      instruction: "Inline Cache (IC) holatini aniqlovchi `evaluateICState(shapesSeen)` funksiyasini yozing. `shapesSeen` — bu hot funksiya ko'rgan noyob (unique) shape ID-larning massividir. Agar massivdagi noyob elementlar soni 1 bo'lsa `MONOMORPHIC`, 2 dan 4 gacha bo'lsa `POLYMORPHIC`, 5 va undan ko'p bo'lsa `MEGAMORPHIC` qiymatlarini qaytaring.",
      startingCode: "function evaluateICState(shapesSeen) {\n  // Kodni shu yerda yozing\n}",
      hint: "Noyob elementlar sonini topish uchun Set-dan foydalaning va uning size-ga qarab tekshiring.",
      test: "if (evaluateICState([1, 1, 1]) !== 'MONOMORPHIC') return '1 ta shape uchun MONOMORPHIC bo\\'lishi kerak';\nif (evaluateICState([1, 2, 3]) !== 'POLYMORPHIC') return '3 ta shape uchun POLYMORPHIC bo\\'lishi kerak';\nif (evaluateICState([1, 2, 3, 4, 5]) !== 'MEGAMORPHIC') return '5 ta shape uchun MEGAMORPHIC bo\\'lishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ Deoptimizatsiya Xavfini Tekshiruvchi Funksiya",
      instruction: "Funksiya chaqirilganda kelgan argument turlarini tekshirib deoptimizatsiya xavfini aniqlovchi `checkDeoptRisk(argumentTypesList)` funksiyasini yozing. `argumentTypesList` — har bir chaqiruvdagi parametrlar turlari massivi (masalan `['number', 'number', 'string']`). Agar massivda 1 tadan ko'p har xil turdagi qiymatlar mavjud bo'lsa, funksiya `true` (xavf bor), aks holda `false` (xavf yo'q) qaytarsin.",
      startingCode: "function checkDeoptRisk(argumentTypesList) {\n  // Kodni shu yerda yozing\n}",
      hint: "Massiv elementlarini Set-ga solib, Set hajmi 1 dan katta bo'limini tekshiring.",
      test: "if (checkDeoptRisk(['number', 'number', 'number']) !== false) return 'Bir xil turlar uchun false chiqishi kerak';\nif (checkDeoptRisk(['number', 'number', 'string']) !== true) return 'Turli turlar uchun true chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Object Shape Barqarorlashtiruvchi Helper",
      instruction: "Obyektning xossalari tartibsiz yaratilganda V8 har xil yashirin klaslar hosil qiladi. Obyektni qabul qilib, uning xossalarini alifbo tartibida saralangan holatda yangi obyekt qilib qaytaradigan `normalizeObjectShape(obj)` funksiyasini yozing.",
      startingCode: "function normalizeObjectShape(obj) {\n  // Kodni shu yerda yozing\n}",
      hint: "Object.keys(obj) yordamida kalitlarni olib, keyin sort() qiling va yangi obyektga qiymatlarni bittalab o'tkazing.",
      test: "const normalized = normalizeObjectShape({ z: 1, a: 2, m: 3 });\nif (Object.keys(normalized).join(',') !== 'a,m,z') return 'Kalitlar saralanmadi!';\nif (normalized.a !== 2 || normalized.z !== 1) return 'Qiymatlar noto\\'g\\'ri ko\\'chirilgan!';"
    },
    {
      id: 6,
      title: "6️⃣ Dictionary Mode (Lug'at Rejimi) Detektori",
      instruction: "V8 dvigatelida obyekt xossalari `delete` yordamida o'chirilganda yoki dynamic kalitlar haddan tashqari ko'payganda, u optimallashtirilgan shakldan Dictionary Mode-ga o'tadi. Berilgan obyekt operatsiyalarini va uning natijasida dictionary mode-ga tushish xavfini simulyatsiya qiluvchi `isDictionaryModeRisk(operations)` funksiyasini yozing. `operations` massivida `'delete'` amali qatnashgan bo'lsa yoki xossalar soni 30 tadan oshib ketgan bo'lsa, `true` qaytarsin, aks holda `false` bo'lsin.",
      startingCode: "function isDictionaryModeRisk(operations) {\n  // Kodni shu yerda yozing\n}",
      hint: "operations.includes('delete') shartini va uning ichidagi dynamic xossalar sonini tekshiring.",
      test: "if (isDictionaryModeRisk(['add', 'add', 'delete']) !== true) return 'delete amali uchun true chiqishi shart';\nif (isDictionaryModeRisk(Array(35).fill('add')) !== true) return 'Xossalar soni 30 dan oshganda true chiqishi shart';\nif (isDictionaryModeRisk(['add', 'add']) !== false) return 'Oddiy qo\\'shishlar uchun false chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Shape Transition Tree Simulyatori",
      instruction: "Yangi xossa qo'shilganda shape transition (o'tish) zanjirini quradigan `ShapeSimulator` klassini yarating. Klassda `constructor()` bo'lsin, unda `this.transitions = {}` va `this.currentShapeId = 0` bo'lsin. Unda `addProperty(key)` metodi bo'lib, agar `currentShapeId + '->' + key` transitsiyasi transitions obyektida mavjud bo'lsa, `currentShapeId` ni o'sha qiymatga o'zgartirsin. Agar yo'q bo'lsa, yangi shape ID yaratsin (keyingi tartib raqam, masalan, 1 dan boshlab), uni transition-ga yozsin va `currentShapeId` ni unga o'zgartirsin. Metod yangi shape ID-ni qaytarsin.",
      startingCode: "class ShapeSimulator {\n  constructor() {\n    this.transitions = {};\n    this.currentShapeId = 0;\n    this.nextId = 1;\n  }\n  \n  addProperty(key) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Path kalitini `this.currentShapeId + '->' + key` ko'rinishida hosil qiling. Agar mavjud bo'lmasa, `this.transitions[path] = this.nextId++` yozing va currentShapeId-ni yangilang.",
      test: "const sim = new ShapeSimulator();\nconst id1 = sim.addProperty('x');\nconst id2 = sim.addProperty('y');\nsim.currentShapeId = 0;\nconst id3 = sim.addProperty('x');\nif (id1 !== id3) return 'Avvalgi transition-dan qayta foydalanilmadi!';\nif (id2 !== 2) return 'Shape ID to\\'g\\'ri oshmadi!';"
    },
    {
      id: 8,
      title: "8️⃣ Object Shape Taqqoslovchi Guard",
      instruction: "Ikkita obyektning yashirin klaslari (shapes) bir xilligini tekshiruvchi `haveSameShape(obj1, obj2)` funksiyasini yozing. Ya'ni, ulardagi kalitlar soni, nomlari va joylashuv tartibi 100% mos kelishi kerak.",
      startingCode: "function haveSameShape(obj1, obj2) {\n  // Kodni shu yerda yozing\n}",
      hint: "Object.keys(obj1) va Object.keys(obj2) massivlarini solishtiring (uzunligi va har bir indeksdagi qiymatini).",
      test: "if (haveSameShape({a: 1, b: 2}, {a: 3, b: 4}) !== true) return 'Bir xil shape-lar uchun true qaytishi kerak';\nif (haveSameShape({a: 1, b: 2}, {b: 2, a: 1}) !== false) return 'Tartib farq qilganda false bo\\'lishi kerak';\nif (haveSameShape({a: 1}, {a: 1, b: 2}) !== false) return 'Uzunlik farq qilganda false bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "9️⃣ V8 Polimorfizm Optimizeri (Bucket pattern)",
      instruction: "V8 da hot funksiyaga har xil shape-lar yuborilganda u sekinlashadi (polimorfizm yoki megamorfizm). Shuni oldini olish uchun obyektlar massivini qabul qilib, ularni shape-lariga (kalitlarining string ko'rinishiga) ko'ra guruhlab, obyekt ko'rinishida qaytaruvchi `optimizeCollectionByShape(arr)` funksiyasini yozing.",
      startingCode: "function optimizeCollectionByShape(arr) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir obyekt uchun Object.keys(obj).join(',') kalitini yarating va guruhlang.",
      test: "const items = [{ a: 1 }, { b: 2 }, { a: 3 }];\nconst result = optimizeCollectionByShape(items);\nif (!result['a'] || result['a'].length !== 2) return 'a shakli noto\\'g\\'ri guruhlandi';\nif (!result['b'] || result['b'].length !== 1) return 'b shakli noto\\'g\\'ri guruhlandi';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Hidden Class Transition Path Tracer",
      instruction: "Obyektning property-lar qo'shilishi jarayonidagi to'liq transition yo'lini massiv shaklida qaytaruvchi `traceTransitionPath(keysList)` funksiyasini yozing. Masalan: `['x', 'y']` kalitlari berilsa, u `['0', '0->x', '0->x->y']` transition yo'lini qaytarsin.",
      startingCode: "function traceTransitionPath(keysList) {\n  // Kodni shu yerda yozing\n}",
      hint: "Boshlang'ich yo'l '0' bo'ladi. Har safar keyingi kalitni o'tgan qismga '->key' qilib qo'shib boring.",
      test: "const path = traceTransitionPath(['x', 'y', 'z']);\nif (path.join(',') !== '0,0->x,0->x->y,0->x->y->z') return 'Transition yo\\'li noto\\'g\\'ri shakllantirildi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "V8 dvigatelidagi 'Ignition' qismining o'rni nimada?",
      options: [
        "JavaScript kodini to'g'ridan-to'g'ri peak darajada optimallashtirilgan mashina kodiga aylantirish",
        "AST-ni qabul qilib, Bytecode generatsiya qilish va uni interpretatsiya (bajarish) qilish",
        "Obyektlardagi yashirin klaslar (hidden classes) transition-larini o'chirish",
        "Massivlardagi bo'shliqlarni (holes) avtomatik to'ldirish"
      ],
      correctAnswer: 1,
      explanation: "Ignition — bu V8 ning interpretatori bo'lib, u AST asosida baytkod yaratadi va profiling ma'lumotlarini yig'ib boradi."
    },
    {
      id: 2,
      question: "TurboFan nima?",
      options: [
        "V8 dvigatelidagi yuqori darajada optimallashtiruvchi JIT kompilyator",
        "Kodni xatolarga tahlil qiluvchi statik analizator",
        "DOM elementlarini tezkor render qiluvchi grafik drayver",
        "Xotiradagi foydalanilmayotgan obyektlarni tozalovchi Garbage Collector"
      ],
      correctAnswer: 0,
      explanation: "TurboFan - bu V8 engine-ning eng yuqori darajadagi JIT optimallashtiruvchi kompilyatori bo'lib, hot (issiq) funksiyalarni mashina kodiga o'tkazadi."
    },
    {
      id: 3,
      question: "Nima uchun V8 dvigateli 'Hidden Classes' (Shapes) tushunchasini ishlatadi?",
      options: [
        "JavaScript kodlarini xakerlardan yashirish va shifrlash uchun",
        "Dinamik obyekt xossalariga C++ yoki Java kabi static tillardagi kabi tezkor offset (manzil) orqali murojaat qilish uchun",
        "Faqat maxsus 'class' sintaksisini qo'llab-quvvatlash uchun",
        "Xotirada global scope o'zgaruvchilarini cheklash uchun"
      ],
      correctAnswer: 1,
      explanation: "Hidden classes yordamida V8 obyektdagi property qayerda joylashganini (offset) tez bilib oladi va kalit bo'yicha qidirish vaqtini tejaydi."
    },
    {
      id: 4,
      question: "Quyidagi obyektlardan qaysi ikkitasi V8-da bir xil Hidden Class (Shape)ga ega bo'ladi?",
      options: [
        "`const a = { x: 1, y: 2 };` va `const b = { y: 2, x: 1 };`",
        "`const a = { x: 1, y: 2 };` va `const b = { x: 10, y: 20 };`",
        "`const a = { x: 1 };` va `const b = { x: 1, y: 2 };`",
        "`const a = { x: 1, y: 2 };` va `const b = { x: 1, y: 2, z: 3 };`"
      ],
      correctAnswer: 1,
      explanation: "Agar obyektlar bir xil xossalar nomiga va ular yaratilgan bir xil ketma-ketlikka (tartibga) ega bo'lsa, ular bir xil shape-ga ega bo'ladi. Qiymatlar har xil bo'lishi shape-ga ta'sir qilmaydi."
    },
    {
      id: 5,
      question: "Obyektlarda 'delete' operatorini ishlatish nima uchun tavsiya etilmaydi?",
      options: [
        "Chunki u xotiradagi qiymatni o'chira olmaydi",
        "Chunki u yashirin klas strukturasini buzadi va obyektni Dictionary Mode (sekin rejim)ga o'tkazadi",
        "Chunki u faqat global obyektlar bilan ishlaydi",
        "Chunki u JavaScript-ning yangi versiyalarida taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "Obyektdagi property-ni o'chirish (delete) yashirin klas transitsiyasini orqaga qaytarib bo'lmaydigan holatga keltiradi va V8 uni sekin ishlaydigan lug'at (Dictionary Mode) rejimiga o'tkazadi."
    },
    {
      id: 6,
      question: "Inline Caching (IC) nima?",
      options: [
        "Internet sahifalarini brauzer diskida keshlab saqlash",
        "Property-ga kirish operatsiyalari natijalarini (shape va offset) bevosita chaqiruv joyida keshlab olish texnikasi",
        "Garbage Collector tomonidan xotirani tozalash algoritmi",
        "Sinxron operatsiyalarni asinxron operatsiyalarga aylantiruvchi kesh"
      ],
      correctAnswer: 1,
      explanation: "Inline Caching hot-spotlardagi (tez-tez chaqiriladigan joylarda) obyektdan xossani olishni tezlashtirish uchun o'sha chaqiruv joyining o'zida shakl va uning offsetini eslab qoladi."
    },
    {
      id: 7,
      question: "Inline Caching-da 'Monomorphic' holati nimani anglatadi?",
      options: [
        "Kodda bitta funksiya ichida 5 xil turli xildagi obyektlar ishlatilayotganini",
        "Ushbu chaqiruv nuqtasida faqat bir xil yashirin klasga (Shape) ega bo'lgan obyektlar ko'rilganini",
        "Faqat bitta argument qabul qiladigan funksiyani",
        "Hech qachon ishga tushmaydigan o'lik kod"
      ],
      correctAnswer: 1,
      explanation: "Monomorphic holatda IC faqat bitta shaklni ko'rgan bo'ladi va property-ga murojaat maksimal darajada tez (C++ darajasida) amalga oshadi."
    },
    {
      id: 8,
      question: "Inline Caching qachon 'Megamorphic' holatiga o'tadi?",
      options: [
        "Faqat funksiya ichida cheksiz sikl yozilganda",
        "Chaqiruv nuqtasida 5 va undan ortiq turli xil yashirin klasga (shapes) ega obyektlar uzatilganda",
        "Obyektda hech qanday xossa bo'lmaganda",
        "Turli xildagi massivlar bir-biriga qo'shilganda"
      ],
      correctAnswer: 1,
      explanation: "Odatda V8 da 4 tagacha bo'lgan shakllar Polymorphic hisoblanadi. Undan ko'payib ketsa (5 va undan ortiq), kesh megamorphic holatiga o'tadi va global lookup-dan qidiradi (bu eng sekin yo'l)."
    },
    {
      id: 9,
      question: "V8-da 'Deoptimization' (deopt) qachon yuz beradi?",
      options: [
        "Faqat internet aloqasi uzilib qolganda",
        "TurboFan tomonidan optimallashtirilgan kodning profiling taxminlari (masalan, tiplarning barqarorligi) buzilganda",
        "Foydalanuvchi sahifani yangilaganda (refresh)",
        "O'zgaruvchilarni var yordamida e'lon qilganda"
      ],
      correctAnswer: 1,
      explanation: "TurboFan funksiyani ma'lum bir turlar (masalan, faqat sonlar) keladi degan taxmin bilan optimallashtiradi. Agar keyinchalik boshqa turdagi argument (masalan, string) kelsa, taxmin buziladi va kod deoptimizatsiya bo'ladi."
    },
    {
      id: 10,
      question: "Array-larda 'Holey' (bo'shliqli) array nima va uning muammosi nimada?",
      options: [
        "Teshiklari bor jismoniy xotira qurilmasi",
        "Indekslari orasida bo'shliqlar bo'lgan (masalan, `[1, , 3]`) array. Ular V8 prototype zanjirini qidirishga majbur qilgani uchun sekin ishlaydi",
        "Faqat string tiplarini saqlaydigan massiv",
        "Hech qanday muammosi yo'q, xuddi PACKED array kabi tez ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Holey array-larda element yo'qligi sababli, V8 massiv prototipidan (`Array.prototype`) o'sha indeksda xossa bor-yo'qligini tekshirishi kerak, bu esa ishlash tezligini keskin kamaytiradi."
    },
    {
      id: 11,
      question: "V8 dvigatelidagi 'Sparkplug' kompilyatorining vazifasi nima?",
      options: [
        "Og'ir matematik hisob-kitoblarni amalga oshirish",
        "Bytecodeni hech qanday optimallashtirishlarsiz, juda tez sur'atda mashina kodiga o'tkazish",
        "Faqat xatolarni tahlil qilish",
        "O'zgaruvchilarning scope qamrovini tekshirish"
      ],
      correctAnswer: 1,
      explanation: "Sparkplug - bu interpretatordan keyingi tezkor kompilyator bo'lib, u baytkodni optimallashtirmasdan, juda tezda mashina kodiga aylantiradi."
    },
    {
      id: 12,
      question: "Qaysi amaliyot V8 kompilyatorining optimizatsiyasiga yordam beradi?",
      options: [
        "Obyekt xossalarini istalgan joyda har xil tartibda qo'shish va o'chirish",
        "Obyekt shakllarini (hidden classes) barqaror saqlash va hot loops ichida tiplarni o'zgartirmaslik",
        "Array elementlari tiplarini doimiy aralashtirib yozish (son, string, obyekt)",
        "Faqat dynamic funksiyalar va eval ishlatish"
      ],
      correctAnswer: 1,
      explanation: "Obyekt shakllari barqarorligi va tiplar bir xilligi JIT kompilyatoriga eng optimal mashina kodini ishlab chiqish va uni deoptimizatsiyasiz uzoq ishlatish imkonini beradi."
    }
  ]
};
