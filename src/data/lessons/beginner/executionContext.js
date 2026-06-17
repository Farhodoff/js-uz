export const executionContextLesson = {
  id: "executionContextLesson",
  title: "Bajarilish Konteksti (Execution Context)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Bajarilish Konteksti (Execution Context) nima?
**Bajarilish Konteksti (Execution Context)** — bu JavaScript kodi bajariladigan, uning barcha o'zgaruvchilari, funksiyalari, doiralari (scopes) va \`this\` kalit so'zi qiymatlari saqlanadigan va boshqariladigan **maxsus muhit (kontekst)**. JavaScript-da har qanday kod har doim qandaydir bajarilish konteksti ichida ishlaydi.

JavaScript-da uchta asosiy kontekst turi mavjud:
1. **Global Bajarilish Konteksti (GEC):** Har qanday JS kodi ishga tushganda yaratiladigan birlamchi kontekst. U faqat bitta bo'ladi va global obyektni (\`window\` yoki \`global\`) hamda \`this\`ni yaratadi.
2. **Funksiya Bajarilish Konteksti (FEC):** Har safar biror funksiya chaqirilganda (ishga tushirilganda) o'sha funksiya uchun alohida dynamic yaratiladigan kontekst.
3. **Eval Konteksti:** \`eval()\` funksiyasi ichidagi kod bajariladigan kontekst (xavfsizlik sababli deyarli ishlatilmaydi).

---

### Real hayotiy o'xshatish: Oshxona va Shaxsiy Reseptlar
Tasavvur qiling, siz **professional oshpazsiz** va katta oshxonada ishlayapsiz:

* **Global Bajarilish Konteksti (GEC):** Bu butun boshli **oshxona**. Oshxonada hamma uchun umumiy bo'lgan jihozlar (plita, suv, muzlatgich) va umumiy ziravorlar (global o'zgaruvchilar) bor. Siz oshxonaga kirishingiz bilan bu muhit tayyor turadi.
* **Funksiya Bajarilish Konteksti (FEC):** Siz maxsus taom, masalan, **"Shokoladli Tort"** tayyorlashga buyurtma oldingiz. Siz tort tayyorlash uchun alohida stolga o'tasiz va faqat shu tortga tegishli bo'lgan ingredientlarni (tuxum, un, shokolad - local o'zgaruvchilar va parametrlar) yig'asiz. Tortni tayyorlab bo'lgach, siz bu stolni tozalaysiz (kontekst o'chiriladi) va yana umumiy oshxona (GEC) ishiga qaytasiz.
* **Call Stack (Chaqiriqlar Steki):** Bu sizning stolingizdagi **reseptlar dasta-varag'i (stack)**. 
  1. Birinchi bo'lib oshxonaga kirdingiz (GEC stakning tagida).
  2. Tort reseptini oldingiz va uni GEC ustiga qo'ydingiz (\`bakeCake()\`).
  3. Tort ichiga krem tayyorlash kerak bo'lib qoldi. Siz tort reseptini to'xtatib turib, krem tayyorlash reseptini uning ustiga qo'ydingiz (\`makeCream()\`).
  4. Krem tayyor bo'lgach, uning reseptini stakdan olib tashlaysiz (pop) va yana tort pishirishga qaytasiz.
  5. Tort pishib bo'lgach, uning ham reseptini olib tashlaysiz. Stolingizda faqat umumiy oshxona ishlari qoladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global va Funksiya Konteksti)
Sodda o'zgaruvchilar va funksiya chaqiruvi orqali kontekst yaratilishi:
\`\`\`javascript
// GEC (Global Execution Context) yaratildi
let developer = "Sardor"; 

function welcome(name) {
  // FEC (Function Execution Context) yaratildi
  let message = "Salom, " + name; 
  return message; 
  // FEC stackdan chiqib ketadi va yo'q qilinadi
}

console.log(welcome(developer));
\`\`\`

### 2. Intermediate Example (Ichma-ich funksiyalar va Chaqiriqlar Steki)
Ichma-ich funksiya chaqirilganda stakning o'zgarishi:
\`\`\`javascript
function greet() {
  console.log("Greet boshlandi");
  sayName(); // Yangi kontekst stakka qo'shiladi
  console.log("Greet tugadi");
}

function sayName() {
  console.log("Mening ismim Sardor");
}

greet();
// Konsoldagi natija:
// Greet boshlandi
// Mening ismim Sardor
// Greet tugadi
\`\`\`

### 3. Advanced Example (Hoisting va Kontekst Fazalari)
Creation Phase (Yaratilish fazasi) da \`var\` va \`let\` o'zgaruvchilarining xatti-harakati:
\`\`\`javascript
console.log(city); // undefined (var hoisted bo'lib, initsializatsiya qilingan)
// console.log(country); // ReferenceError: Cannot access 'country' before initialization (let hoisted, lekin initsializatsiya qilinmagan - TDZ da)

var city = "Toshkent";
let country = "O'zbekiston";

// Funksiya e'loni (Function Declaration) to'liq hoisting bo'ladi
sayHello(); // "Salom!" deb konsolga chiqadi

function sayHello() {
  console.log("Salom!");
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

JavaScript dvigateli (masalan, V8) kodni bajarishdan oldin har bir Bajarilish Kontekstini **ikki bosqichda** yaratadi va boshqaradi:

### 1. Creation Phase (Yaratilish Bosqichi)
Kodni bajarishdan oldin, dvigatel kontekst tarkibini tuzib chiqadi:
* **Lexical Environment (Leksik Muhit) yaratiladi:**
  * **Environment Record:** \`let\`, \`const\` o'zgaruvchilar, funksiya argumentlari (parametrlar) va ichki funksiyalar e'lonlari saqlanadi. Ular xotirada joylashadi, lekin initsializatsiya qilinmaydi (Temporal Dead Zone).
  * **Outer Reference (Tashqi havola):** Scope Chain-ni hosil qilish uchun tashqi (parent) leksik muhitga havola yaratiladi.
  * **\`this\` binding:** \`this\` kalit so'zining qiymati aniqlanadi va bog'lanadi.
* **Variable Environment (O'zgaruvchilar Muhiti) yaratiladi:**
  * Faqat \`var\` yordamida e'lon qilingan o'zgaruvchilar saqlanadi va ularga boshlang'ich qiymat sifatida darhol \`undefined\` biriktiriladi (Hoisting).

### 2. Execution Phase (Bajarilish Bosqichi)
Bu bosqichda JS dvigateli kodni yuqoridan pastga qarab satrma-satr ishga tushiradi:
* O'zgaruvchilarga haqiqiy qiymatlari biriktiriladi (\`city = "Toshkent"\`).
* Funksiyalar chaqiriladi va bajariladi.

---

### Call Stack va LIFO (Last In First Out)
JavaScript bir vaqtning o'zida faqat bitta amal bajara oladigan (Single-Threaded) til bo'lganligi sababli, bajarilish kontekstlarini tartiblash uchun **Call Stack**-dan foydalanadi. Chaqirilgan funksiyalar stack-ga push qilinadi va bajarib bo'lingach stakdan pop (o'chirib tashlash) qilinadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Temporal Dead Zone (TDZ) ga tushib qolish
* **Noto'g'ri (Error beradi):**
  \`\`\`javascript
  function showPrice() {
    console.log(price); // ReferenceError: Cannot access 'price' before initialization
    let price = 100;
  }
  showPrice();
  \`\`\`
  *Junior xatosi:* "Let ham hoisting bo'ladi, nega undefined qaytarmadi?" deb o'ylash. Aslida, \`let\` va \`const\` yaratilish bosqichida xotiradan joy oladi, lekin ularga e'lon qilingan qatorgacha murojaat qilib bo'lmaydi (TDZ).
* **To'g'ri:**
  \`\`\`javascript
  function showPrice() {
    let price = 100;
    console.log(price); // 100
  }
  showPrice();
  \`\`\`

### 2. Cheksiz rekursiya sababli Stack Overflow xatosi
* **Noto'g'ri (Dastur qotib qoladi):**
  \`\`\`javascript
  function runForever() {
    runForever(); // To'xtash shartisiz o'zini chaqirmoqda
  }
  runForever(); // RangeError: Maximum call stack size exceeded
  \`\`\`
  Har bir chaqiruv Call Stack-ga yangi FEC qo'shadi. Stack to'lib ketgach, JS dvigateli xatolik bilan dasturni to'xtatadi.
* **To'g'ri:**
  \`\`\`javascript
  function runSafely(counter) {
    if (counter <= 0) return; // To'xtash sharti (Base case)
    runSafely(counter - 1);
  }
  runSafely(5);
  \`\`\`

### 3. Blok Scope va Kontekstni adashtirish
* **Xato tushuncha:** \`if\` yoki \`for\` bloklari yangi Bajarilish Kontekstini yaratadi deb o'ylash.
  *Haqiqat:* Bloklar (\`{ ... }\`) faqat yangi **Block Lexical Environment** yaratadi, lekin alohida Bajarilish Konteksti (Execution Context) yaratmaydi. Faqat funksiya chaqirilgandagina yangi FEC hosil bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1–4)
1. **Savol:** Bajarilish Konteksti (Execution Context) nima?
   * **Javob:** Bu JavaScript kodi bajariladigan, o'zgaruvchilar, scope va \`this\` qiymati saqlanadigan maxsus muhitdir.
2. **Savol:** JavaScript-da qanday asosiy kontekstlar bor?
   * **Javob:** Global Bajarilish Konteksti (GEC) va Funksiya Bajarilish Konteksti (FEC).
3. **Savol:** Call Stack nima va u qanday tartibda ishlaydi?
   * **Javob:** Call Stack - bu joriy bajarilayotgan kontekstlarni kuzatib boruvchi mexanizm. U LIFO (Last In First Out - oxirgi kirgan birinchi chiqadi) printsipi asosida ishlaydi.
4. **Savol:** Funksiya bajarilib bo'lingach, uning konteksti bilan nima sodir bo'ladi?
   * **Javob:** U Call Stack-dan chiqariladi (pop) va o'chiriladi (agar closure tomonidan xotirada ushlab turilmagan bo'lsa).

### Middle Darajasi (5–8)
5. **Savol:** Yaratilish bosqichi (Creation Phase) va Bajarilish bosqichi (Execution Phase) farqi nimada?
   * **Javob:** Creation Phase-da xotiradan o'zgaruvchi va funksiyalar uchun joy ajratiladi, outer reference va \`this\` aniqlanadi. Execution Phase-da esa kod satrma-satr bajarilib, o'zgaruvchilarga qiymat yuklanadi.
6. **Savol:** Nima uchun \`var\` o'zgaruvchisi e'londan oldin chaqirilganda \`undefined\` beradi, \`let\` esa xatolik beradi?
   * **Javob:** \`var\` yaratilish bosqichida \`undefined\` qiymati bilan initsializatsiya qilinadi. \`let\` esa xotiradan joy oladi, lekin initsializatsiya qilinmaydi va e'lon qilinishigacha Temporal Dead Zone (TDZ) da bo'ladi.
7. **Savol:** Scope Chain nima va u Bajarilish Konteksti bilan qanday bog'liq?
   * **Javob:** Har bir kontekst o'zining Leksik Muhitiga ega va unda tashqi muhitga havola (\`outer reference\`) bo'ladi. O'zgaruvchi joriy kontekstdan topilmasa, tashqi havola orqali zanjir bo'ylab Global kontekstgacha izlanadi. Bu Scope Chain deyiladi.
8. **Savol:** Bajarilish konteksti va Scope (Sfera) o'rtasidagi farq nimada?
   * **Javob:** Scope (Sfera) - bu kod yozilayotgan paytda (fizik joylashuvida) o'zgaruvchilarning ko'rinish chegarasidir. Execution Context esa runtime (kod ishga tushganda) yaratiladigan va scope chain, \`this\` hamda o'zgaruvchilarni o'z ichiga oluvchi amaliy muhitdir.

### Senior Darajasi (9–12)
9. **Savol:** Variable Environment va Lexical Environment o'rtasidagi farq nima?
   * **Javob:** \`Lexical Environment\` \`let\`, \`const\` o'zgaruvchilarini, block scope-larni va funksiya parametrlarini saqlaydi. \`Variable Environment\` esa faqat \`var\` kalit so'zi bilan e'lon qilingan o'zgaruvchilarni saqlaydi.
10. **Savol:** Funksiya stakdan o'chirilgandan keyin ham uning leksik muhiti xotirada qanday saqlanib qolishi mumkin? (Closures muammosi)
    * **Javob:** Agar funksiya ichidan qaytarilgan boshqa bir ichki funksiya tashqi o'zgaruvchilarga murojaat qilsa (closure), JS Garbage Collector ushbu tashqi funksiyaning Leksik Muhitini xotiradan o'chirmaydi, chunki unga havola (reference) saqlanib qolgan bo'ladi.
11. **Savol:** Call Stack to'lib ketishining (Stack Overflow) oldini olish uchun qanday amaliy choralar ko'riladi?
    * **Javob:** Rekursiv amallarni sikllarga (iteration) o'tkazish, Tail Call Optimization (TCO) dan foydalanish (agar brauzer qo'llab-quvvatlasa) yoki asinxron yondashuv (\`setTimeout\`, \`Promise\`) orqali chaqiriqlarni Event Loop-ga o'tkazib stakni bo'shatish.
12. **Savol:** Asinxron funksiyalar va callbacklar Call Stack-ga qanday ta'sir qiladi?
    * **Javob:** Asinxron amallar Call Stack-ga to'g'ridan-to'g'ri kirmaydi. Ular brauzer API orqali bajarilib, keyin Callback Queue-ga tushadi. Event Loop faqat Call Stack butunlay bo'shaganidan keyingina ularni stakka o'tkazadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi global koddan boshlab ichma-ich funksiyalar chaqirilishi va ular bajarilib bo'lgach stakdan o'chirilishi jarayonini (LIFO printsipi) ko'rsatadi:

\`\`\`mermaid
graph TD
    subgraph Call Stack LIFO Bajarilishi
        direction TB
        
        step1["1. Dars boshlanishi <br/> [ Global Context (GEC) ] <br/> (Stack tagida Global doim turadi)"]
        step2["2. outer() chaqirilganda <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ]"]
        step3["3. inner() chaqirilganda <br/> [ inner() FEC ] <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ] <br/> (Stack cho'qqisi)"]
        step4["4. inner() tugagach (Pop) <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ] <br/> (inner xotiradan o'chdi)"]
        step5["5. outer() tugagach (Pop) <br/> [ Global Context (GEC) ] <br/> (outer xotiradan o'chdi)"]
        step6["6. Dastur butunlay tugagach <br/> [ (Bo'sh Stack) ]"]

        step1 -->|Push outer()| step2
        step2 -->|Push inner()| step3
        step3 -->|Pop inner()| step4
        step4 -->|Pop outer()| step5
        step5 -->|Pop GEC| step6
    end
\`\`\`

### Amaliy mashq uchun kod namunasi:
Yuqoridagi diagrammaga mos keluvchi JavaScript kodi:
\`\`\`javascript
function inner() {
  console.log("inner bajarilmoqda");
}

function outer() {
  console.log("outer boshlandi");
  inner();
  console.log("outer tugadi");
}

outer();
\`\`\`

---

## 7. 📝 12 ta Mini Test

Darsimizning quizzes bo'limida Bajarilish Konteksti, hoisting, stack overflow, leksik muhit va \`this\` bog'lanishi bo'yicha tayyorlangan 12 ta test savolini yechib, bilimingizni tekshirib ko'ring. Har bir savolda to'g'ri javob bilan birga batafsil tushuntirish berilgan.

---

## 8. 🎯 Real Project Case Study

### Rekursiya chuqurligi limitini va Call Stack to'lib ketishini boshqarish
Real loyihalarda, masalan, fayllar tizimini (folder tree) yoki murakkab JSON daraxtlarni parsing qilishda rekursiyadan foydalaniladi. Agar daraxt juda chuqur bo'lsa (minglab darajalar), stack overflow xatosi yuz beradi.

Buning oldini olish uchun loyihalarda **Iterativ yondashuv (Stack-ni array yordamida simulyatsiya qilish)** ishlatiladi. Bu xotirani Call Stack-dan Heap (xotira ombori)ga o'tkazadi, chunki Heap hajmi stakka qaraganda ancha katta.

#### Rekursiv (Stack Overflow xavfi bor) usul:
\`\`\`javascript
function traverseDirectoryRecursive(node) {
  console.log("Joriy papka:", node.name);
  if (node.children) {
    node.children.forEach(child => traverseDirectoryRecursive(child));
  }
}
\`\`\`

#### Iterativ (Xavfsiz va Call Stack-ni to'ldirmaydigan) usul:
\`\`\`javascript
function traverseDirectoryIterative(rootNode) {
  // Biz xotiraning heap qismida o'z stack-imizni (massiv) yaratamiz
  const stack = [rootNode];

  while (stack.length > 0) {
    const currentNode = stack.pop(); // Oxirgi qo'shilgan elementni olamiz
    console.log("Joriy papka:", currentNode.name);

    if (currentNode.children) {
      // Bolalarini stack-ga qo'shamiz, bu Call Stack-ga og'irlik solmaydi
      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        stack.push(currentNode.children[i]);
      }
    }
  }
}
\`\`\`

> [!IMPORTANT]
> Loyihalarda chuqur ma'lumotlarni qayta ishlashda iterativ stack yoki asinxron bo'laklash (\`setTimeout\` / \`requestAnimationFrame\`) yordamida Call Stack-ni bo'shatib turish tavsiya etiladi.

---

## 9. 🚀 Performance va Optimization

1. **Closures tufayli xotira leaks (Memory Leaks):**
   Qachonki ichki funksiya tashqi o'zgaruvchilarga murojaat qilsa, ota funksiya konteksti stakdan o'chsa ham uning leksik muhiti xotirada (Heap) saqlanib qoladi. Keraksiz closures ishlatish xotirani band qiladi. Ishlatib bo'lingach, bog'lanishni uzish uchun o'zgaruvchini \`null\` ga tenglash tavsiya etiladi.
2. **Deep Stack Traces samaradorligi:**
   Xatolik yuz berganda brauzer konsolga \`Error.stack\` (Stack Trace) chiqaradi. Deep nesting (chuqur ketma-ket chaqiriqlar) bo'lgan loyihalarda stack trace-ni yig'ish va render qilish biroz resurs talab qiladi. Dvigatellarda stack trace limiti bo'ladi (sukut bo'yicha Chrome-da 10 ta freym).
3. **Tail Call Optimization (TCO):**
   ES6 standartida agar rekursiv chaqiruv funksiyaning eng oxirgi amali (return) bo'lsa, dvigatel yangi stack freym yaratmasdan joriy freymni qayta ishlatishi mumkin. Biroq, bu optimallash hozircha faqat ba'zi dvigatellarda (masalan, Safari's JavaScriptCore) to'liq qo'llab-quvvatlanadi.

---

## 10. 📌 Cheat Sheet

| Kontekst/Muhit | Qachon yaratiladi? | Nimalarni saqlaydi? | Stack-dagi o'rni |
| :--- | :--- | :--- | :--- |
| **Global Context (GEC)** | Skript yuklanib ishga tushganda | Global obyekt (\`window\`), \`this\`, global o'zgaruvchilar | Har doim eng tagida joylashadi |
| **Function Context (FEC)** | Funksiya chaqirilganda (\`fn()\`) | Argumentlar, local o'zgaruvchilar, \`this\`, outer reference | Chaqirilganda tepaga qo'shiladi (push), tugagach o'chiriladi (pop) |
| **Lexical Environment** | Kontekst yaratilish bosqichida | \`let\`, \`const\`, funksiya e'lonlari, tashqi scope havolasi | Kontekstning ichki tarkibiy qismi |
| **Variable Environment** | Kontekst yaratilish bosqichida | Faqat \`var\` bilan e'lon qilingan o'zgaruvchilar | Kontekstning ichki tarkibiy qismi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Rekursiya va Call Stack Xavfsizligi",
    "instruction": "Rekursiv funksiyalar Call Stack-ni to'ldirib yubormasligi (Stack Overflow bo'lmasligi) uchun cheklovga ega bo'lishi kerak. `safeRecursion(count, maxDepth)` funksiyasini yozing. Agar `count` qiymati `maxDepth` ga yetsa yoki undan oshsa, funksiya `'Stack limit reached'` satrini qaytarsin. Aks holda, `count` qiymatini 1 taga oshirib, funksiyani o'zini rekursiv chaqirsin. Agar `maxDepth` parametri berilmagan bo'lsa, u sukut bo'yicha 10 ga teng bo'lsin.",
    "startingCode": "function safeRecursion(count, maxDepth = 10) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "if (count >= maxDepth) return 'Stack limit reached'; shartini tekshiring va aks holda safeRecursion(count + 1, maxDepth) ni return qiling.",
    "test": "const sandbox = new Function(code + '; return safeRecursion;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'safeRecursion funksiyasi aniqlanmadi';\nconst res1 = fn(0, 5);\nconst res2 = fn(12, 10);\nconst res3 = fn(3, 3);\nif (res1 !== 'Stack limit reached') return 'SafeRecursion limitga yetganda \"Stack limit reached\" qaytarmadi';\nif (res2 !== 'Stack limit reached') return 'SafeRecursion count maxDepth dan katta bo\\\'lganda to\\\'xtamadi';\nif (res3 !== 'Stack limit reached') return 'SafeRecursion count va maxDepth teng bo\\\'lganda to\\\'xtamadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Lexical Scope va Context Scope Chain",
    "instruction": "JavaScript-da o'zgaruvchilar scope chain bo'yicha qidirilganda, funksiya qayerda chaqirilganiga qarab emas, balki qayerda e'lon qilinganiga qarab (Lexical Scope) qidiriladi. `value` global o'zgaruvchisini `'global'` qiymati bilan yarating. Keyin `printValue()` funksiyasini e'lon qiling, u `value` o'zgaruvchisini qaytarsin. So'ngra `checkScope()` funksiyasini yarating, uning ichida mahalliy `let value = 'local'` o'zgaruvchisi bo'lsin va u `printValue()` funksiyasini chaqirib natijasini qaytarsin.",
    "startingCode": "// O'zgaruvchi va funksiyalarni shu yerda e'lon qiling\n",
    "hint": "global doirada 'let value = \"global\"' va 'function printValue() { return value; }' deb yozing.",
    "test": "const sandbox = new Function(code + '; return { checkScope, printValue };');\nconst { checkScope, printValue } = sandbox();\nif (typeof checkScope !== 'function') return 'checkScope funksiyasi aniqlanmadi';\nif (typeof printValue !== 'function') return 'printValue funksiyasi aniqlanmadi';\nif (checkScope() !== 'global') return 'checkScope funksiyasi \"global\" qiymatini qaytarmadi (Lexical scope xatosi)';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Bajarilish Konteksti va this ni bog'lash",
    "instruction": "Funksiya bajarilish konteksti `this` kalit so'zining qiymatini ham belgilaydi. Agar obyekt metodi boshqa o'zgaruvchiga o'zlashtirilsa, `this` bog'liqligi uziladi. Berilgan `person` obyektining `getName` metodini context yo'qolmasligi uchun `person` obyektining o'ziga `bind` yordamida bog'lang va hosil bo'lgan funksiyani `boundGetName` o'zgaruvchisiga o'zlashtiring.",
    "startingCode": "const person = {\n  name: \"Sardor\",\n  getName: function() {\n    return this.name;\n  }\n};\n\n// Kodni shu yerda yozing\nconst boundGetName = \n",
    "hint": "const boundGetName = person.getName.bind(person); ko'rinishida yozing.",
    "test": "const sandbox = new Function(code + '; return boundGetName;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'boundGetName funksiyasi aniqlanmadi';\nif (fn() === 'Sardor') return null;\nreturn 'boundGetName chaqirilganda \"Sardor\" qiymatini qaytarmadi, demak context bog\\\'lanmagan';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Bajarilish Konteksti (Execution Context) nima?",
    "options": [
      "Faqat funksiyalarning ishlash vaqtini o'lchaydigan maxsus API",
      "JavaScript kodi bajariladigan, uning o'zgaruvchilari, scope chain va this qiymati saqlanadigan muhit",
      "Sahifadagi HTML elementlarining joylashuvini boshqaradigan CSS qismi",
      "Dasturdagi sintaktik xatolarni avtomatik tarzda tuzatuvchi tizim"
    ],
    "correctAnswer": 1,
    "explanation": "Bajarilish konteksti (Execution Context) - bu JavaScript kodi baholanadigan va bajariladigan muhitdir. Har qanday JS kodi bajarilganda, u ma'lum bir kontekst (GEC yoki FEC) ichida ishlaydi."
  },
  {
    "id": 2,
    "question": "Global Bajarilish Konteksti (Global Execution Context) dastur ishga tushganda necha marta yaratiladi?",
    "options": [
      "Har bir funksiya chaqirilganda yangidan yaratiladi",
      "Faqat bir marta yaratiladi va dastur bajarilishi tugaguncha mavjud bo'ladi",
      "Har bir 'let' yoki 'const' o'zgaruvchisi e'lon qilinganda boshqadan yaratiladi",
      "Event Loop har bir aylanganda o'chib qaytadan yaratiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Global Bajarilish Konteksti (GEC) dastur birinchi marta ishga tushganda faqat bir marta yaratiladi. U global obyekt (masalan, brauzerda window) va global scope-ni hosil qiladi."
  },
  {
    "id": 3,
    "question": "Funksiya Bajarilish Konteksti (Function Execution Context) qachon yaratiladi?",
    "options": [
      "Funksiya kodda e'lon qilingan (yozilgan) paytda",
      "Funksiya chaqirilgan (ishga tushirilgan/invoke qilingan) paytda",
      "Faqat funksiya ichida 'var' o'zgaruvchisi ishlatilganda",
      "Faqat funksiya 'return' kalit so'zi bilan tugaganda"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya Bajarilish Konteksti (FEC) funksiya yozilgan paytda emas, balki u kodda chaqirilganda (masalan, 'myFunc()') dynamic ravishda yaratiladi va stack-ga qo'shiladi."
  },
  {
    "id": 4,
    "question": "Call Stack (Chaqiriqlar Steki) qaysi ma'lumotlar strukturasi printsipi asosida ishlaydi?",
    "options": [
      "FIFO (First In, First Out - Birinchi kirgan birinchi chiqadi)",
      "LIFO (Last In, First Out - Oxirgi kirgan birinchi chiqadi)",
      "Random (Elementlar mutlaqo ixtiyoriy tartibda ishlaydi)",
      "Faqat hajmi eng kichik funksiyalar birinchi bajariladi"
    ],
    "correctAnswer": 1,
    "explanation": "Call Stack LIFO (Last In, First Out) printsipida ishlaydi. Eng oxirgi chaqirilgan funksiya stack-ga oxirgi bo'lib kiradi va birinchi bo'lib tugatilib, stack-dan chiqariladi."
  },
  {
    "id": 5,
    "question": "Bajarilish kontekstining Yaratilish Bosqichida (Creation Phase) nima sodir bo'ladi?",
    "options": [
      "Kod satrma-satr bajariladi va barcha o'zgaruvchilarga yakuniy qiymatlar yuklanadi",
      "O'zgaruvchilar va funksiyalar e'lonlari uchun xotiradan joy ajratiladi (Hoisting), Scope Chain va this aniqlanadi",
      "Barcha asinxron API va tarmoq so'rovlari bajarib bo'linadi",
      "Dastur xatoliklarini tekshirish uchun uchinchi tomon kutubxonalari yuklanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Creation Phase davomida JS dvigateli xotirani tayyorlaydi: o'zgaruvchilar va funksiyalar e'lonlarini xotiraga yozadi (hoisting), tashqi scope-ga bog'lanishlarni (Scope Chain) va this qiymatini belgilaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda hoisting sababli konsolda nima chop etiladi?\n```javascript\nconsole.log(myVar);\nvar myVar = 5;\n```",
    "options": [
      "5",
      "ReferenceError: myVar is not defined",
      "undefined",
      "TypeError: myVar is not a function"
    ],
    "correctAnswer": 2,
    "explanation": "'var' bilan e'lon qilingan o'zgaruvchilar Creation Phase-da hoisting bo'lib, ularga 'undefined' boshlang'ich qiymati beriladi. Shuning uchun e'lon qilinishidan oldin chaqirilsa, xatolik o'rniga undefined chiqadi."
  },
  {
    "id": 7,
    "question": "Quyidagi kod ishga tushganda konsolda nima yuz beradi?\n```javascript\nconsole.log(myLet);\nlet myLet = 10;\n```",
    "options": [
      "10",
      "undefined",
      "ReferenceError (Temporal Dead Zone sababli)",
      "Hech narsa chop etilmaydi va dastur xatosiz tugaydi"
    ],
    "correctAnswer": 2,
    "explanation": "'let' va 'const' ham hoisting bo'ladi, lekin ularga boshlang'ich qiymat berilmaydi. Ular e'lon qilingan qatorgacha bo'lgan hudud Temporal Dead Zone (TDZ) deyiladi va unda o'zgaruvchini chaqirish ReferenceError beradi."
  },
  {
    "id": 8,
    "question": "Bajarilish Bosqichida (Execution Phase) JavaScript dvigateli nima ishni bajaradi?",
    "options": [
      "Faqat sintaktik xatolarni tekshirib chiqadi",
      "Dastur kodini satrma-satr o'qib, o'zgaruvchilarga qiymat yuklaydi va funksiyalarni ishga tushiradi",
      "Faqat global o'zgaruvchilarni o'chirib yuboradi",
      "Barcha asinxron funksiyalarni sinxron kodga o'tkazadi"
    ],
    "correctAnswer": 1,
    "explanation": "Execution Phase - bu yaratilgan kontekst (muhit) ichida kodning satrma-satr bajarilish bosqichidir. Bu yerda o'zgaruvchilarga qiymatlar biriktiriladi va funksiya kodlari ishga tushiriladi."
  },
  {
    "id": 9,
    "question": "Cheksiz rekursiv funksiya chaqirilganda Call Stack-da nima sodir bo'ladi?",
    "options": [
      "Xotira hajmi avtomatik kengayib boraveradi",
      "Maximum call stack size exceeded (Stack Overflow) xatoligi bilan dastur to'xtaydi",
      "Dastur avtomatik ravishda barcha funksiyalarni o'chirib yuboradi",
      "JS dvigateli uni asinxron operatsiyaga aylantiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Har safar rekursiv chaqiriq bo'lganda, Call Stack-ga yangi kontekst qo'shilaveradi. To'xtash sharti bo'lmasa, stack hajmi to'lib ketadi va stack overflow xatoligi yuz beradi."
  },
  {
    "id": 10,
    "question": "Lexical Environment (Leksik muhit) nima?",
    "options": [
      "Dasturdagi o'zgaruvchilarning nomlarini saqlaydigan lug'at",
      "O'zgaruvchilar va funksiyalar e'lon qilingan kodning fizik joylashuviga ko'ra ularning scope (doira)larini belgilovchi JS ichki tuzilmasi",
      "Faqat vaqtincha saqlanadigan ma'lumotlar bazasi",
      "Brauzer konsolidagi xatolar ro'yxati"
    ],
    "correctAnswer": 1,
    "explanation": "Lexical Environment - bu o'zgaruvchilar va funksiyalar kodning aynan qayerida yozilganligi (fizik joylashuvi) asosida o'zaro aloqalar, scope va o'zgaruvchilar bog'lanishlarini boshqaruvchi ichki tuzilmadir."
  },
  {
    "id": 11,
    "question": "Scope Chain (Sferalar zanjiri) Bajarilish Kontekstida qanday ishlaydi?",
    "options": [
      "Faqat global o'zgaruvchilarni local funksiyalardan himoya qiladi",
      "Joriy kontekstda topilmagan o'zgaruvchilarni tashqi (parent) leksik muhitlardan tortib Global kontekstgacha qidirish zanjirini hosil qiladi",
      "Har bir kontekstni faqat o'z ichida cheklab qo'yadi",
      "Faqat 'use strict' rejimi yoqilganda ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Scope Chain - bu joriy kontekstda topilmagan o'zgaruvchilarni uning tashqi (lexical parent) kontekstlaridan qidirish zanjiridir. Agar o'zgaruvchi global kontekstda ham topilmasa, ReferenceError qaytadi."
  },
  {
    "id": 12,
    "question": "Funksiya bajarilib bo'lingach, uning Bajarilish Konteksti bilan nima sodir bo'ladi?",
    "options": [
      "U xotirada o'zgarmasdan saqlanib qoladi",
      "U Call Stack-dan chiqarib yuboriladi (pop) va o'chiriladi (agar closure tomonidan ushlab turilmagan bo'lsa)",
      "U avtomatik ravishda boshqa funksiyalarga nusxalanadi",
      "U faqat sahifa yangilanganda o'chadi"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya o'z ishini tugatgandan so'ng, uning bajarilish konteksti Call Stack-dan chiqariladi (popped) va xotiradan (Garbage Collector yordamida) o'chiriladi, agar biror closure uning Lexical Environment-iga bog'lanmagan bo'lsa."
  }
]

};
