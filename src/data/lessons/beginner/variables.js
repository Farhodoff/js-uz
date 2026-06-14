export const variables = {
  id: "variables",
  title: "O'zgaruvchilar: var, let, const",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### O'zgaruvchilar nima va var, let, const farqlari qanday?
JavaScript-da o'zgaruvchilar ma'lumotlarni saqlash uchun qutilardir. Ammo bu qutilar o'zining mustahkamligi va kirish doirasi (scope) bo'yicha farq qiladi:
* **\`var\` (Eski va erkin xizmatkor):** ES6 gacha (2015-yil) ishlatilgan eski usul. U juda erkin, blok doirasini (masalan, \`if\` yoki \`for\` qavslarini) tan olmaydi va butun funksiya bo'ylab o'z bilganicha ishlayveradi. Bir xil nom bilan bir necha marta qayta e'lon qilinsa ham e'tiroz bildirmaydi.
* **\`let\` (Zamonaviy va tartibli yordamchi):** Faqat o'zi e'lon qilingan jingalak qavslar \`{}\` (blok) ichida amal qiladi. U xonadan tashqariga chiqib ketmaydi. Bitta blok ichida bir xil nomda qayta e'lon qilsangiz, darhol xatolik beradi. Qiymatini o'zgartirish (reassign) mumkin.
* **\`const\` (Sodiq va o'zgarmas qo'riqchi):** \`let\` kabi blok doirasida ishlaydi, lekin unga bir marta qiymat berilgach, uni butunlay yangi qiymatga qayta tayinlab bo'lmaydi. U o'ziga topshirilgan qiymatni oxirigacha himoya qiladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ofis boshqaruvchisiz**:
* **\`var\` (Doskadagi bo'r yozuvi):** Siz ofisning umumiy zalidagi doskaga yozuv yozdingiz. Istalgan xodim kelib, bu yozuvni o'chirib, o'rniga boshqa narsa yozishi yoki xuddi shu nom bilan boshqa ma'lumot yozishi mumkin. U hamma uchun ko'rinadi va nazorat qilish qiyin.
* **\`let\` (Qalam bilan yozilgan daftar):** Har bir xodimning o'z xonasi (bloki) va daftari bor. Xodim faqat o'z xonasi ichida daftardagi ma'lumotlarni o'chirib, yangilay oladi (reassign). Lekin boshqa xonadagilar bu daftarni ko'ra olmaydi. Shuningdek, bir varoqda bir xil nomli ikkita yozuv yozish taqiqlanadi.
* **\`const\` (Eshikdagi metall lavha):** Xonaning eshigiga o'rnatilgan metall lavha. Undagi yozuvni (ismni) butunlay o'chirib, boshqa lavhaga almashtirib bo'lmaydi. Lekin lavha ustiga kichik stiker yopishtirib, qo'shimcha ma'lumot yozish mumkin (obyekt mutatsiyasi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Blok doirasi va Sizib chiqish)
\`var\` blokni tan olmaydi va undan tashqariga sizib chiqadi. \`let\` esa blok ichida qoladi:
\`\`\`javascript
if (true) {
  var leakedVar = "Men blokdan qochib chiqdim!";
  let blockLet = "Men blok ichida mahbusman!";
}

console.log(leakedVar); // "Men blokdan qochib chiqdim!"
console.log(blockLet);  // ReferenceError: blockLet is not defined
\`\`\`

### 2. Intermediate Example (const va Obyektlar Mutatsiyasi)
\`const\` o'zgaruvchini qayta tayinlashni taqiqlaydi, lekin massiv yoki obyekt ichidagi qiymatlarni o'zgartirishga to'sqinlik qilmaydi:
\`\`\`javascript
const user = { name: "Jasur", age: 25 };

// 1. Obyekt ichini o'zgartirish (MUMKIN - mutatsiya)
user.age = 26; 
console.log(user.age); // 26

// 2. Yangi obyektga qayta bog'lash (XATO - reassignment)
try {
  user = { name: "Olim", age: 30 }; // TypeError: Assignment to constant variable.
} catch (e) {
  console.log("Xatolik:", e.message);
}
\`\`\`

### 3. Advanced Example (Loop-lar va Asinxron Closures)
Klassik \`var\` muammosi: sikl ichidagi asinxron kodda \`var\` oxirgi qiymatni olib qoladi. \`let\` esa har bir qadamda yangi doira (scope) yaratadi:
\`\`\`javascript
// var bilan yozilganda:
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log("var i:", i); // 3 soniyadan keyin uch marta "4" chiqadi
  }, 100);
}

// let bilan yozilganda:
for (let j = 1; j <= 3; j++) {
  setTimeout(() => {
    console.log("let j:", j); // 1, 2, 3 tartibida chiqadi
  }, 100);
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Hoisting va Leksik Muhit (Lexical Environment)
JavaScript kodni bajarishdan oldin uni **kompilyatsiya fazasidan** o'tkazadi. Bu paytda barcha o'zgaruvchilar xotirada ro'yxatdan o'tadi:
* \`var\` o'zgaruvchisi xotirada yaratiladi va unga darhol \`undefined\` qiymati beriladi.
* \`let\` va \`const\` o'zgaruvchilar ham hoisting bo'ladi (xotirada ro'yxatga olinadi), lekin ularga hech qanday boshlang'ich qiymat berilmaydi (uninitialized holatda qoladi).

### 2. Temporal Dead Zone (TDZ)
O'zgaruvchi xotirada ro'yxatga olingan vaqtdan to kod bajarilishi jarayonida uning e'lon qilingan (declaration) qatoriga yetib kelguncha bo'lgan vaqt oralig'i **Vaqtinchalik O'lik Hudud (TDZ)** deyiladi.
\`\`\`javascript
// --- TDZ boshlandi (value o'zgaruvchisi uchun) ---
// value xotirada bor, lekin unga kirish taqiqlangan.

try {
  console.log(value); // ReferenceError: Cannot access 'value' before initialization
} catch (e) {
  console.log(e.message);
}

let value = "Salom"; // --- TDZ tugadi ---
console.log(value);   // "Salom"
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. O'zgaruvchini e'lon qilishdan oldin ishlatish (TDZ xatosi)
* **Noto'g'ri:**
  \`\`\`javascript
  console.log(username); 
  let username = "Farhod"; // ReferenceError beradi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  let username = "Farhod";
  console.log(username); // To'g'ri tartib
  \`\`\`

### 2. const orqali e'lon qilingan o'zgaruvchiga qiymat bermaslik
* **Noto'g'ri:**
  \`\`\`javascript
  const PI; // SyntaxError: Missing initializer in const declaration
  PI = 3.14;
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const PI = 3.14; // Bir vaqtning o'zida e'lon qilinadi va qiymat beriladi
  \`\`\`

### 3. Global oynani (Window) ifloslantirish
* **Noto'g'ri:**
  \`\`\`javascript
  var config = "production"; // window.config ga aylanib, boshqa kutubxonalar bilan to'qnashishi mumkin
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  let config = "production"; // window obyektiga qo'shilmaydi va xavfsiz qoladi
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** \`var\`, \`let\` va \`const\` o'rtasidagi asosiy farqlar nimada?
   * **Javob:** \`var\` funksiya doirasiga ega, qayta e'lon qilinishi mumkin, hoisting-da \`undefined\` oladi. \`let\` blok doirasiga ega, qayta e'lon qilib bo'lmaydi, TDZ ga ega. \`const\` esa \`let\` kabi ishlaydi, lekin qiymatini qayta tayinlab bo'lmaydi.
2. **Savol:** Qachon \`let\` va qachon \`const\` ishlatish kerak?
   * **Javob:** O'zgaruvchi qiymati kelajakda o'zgarishi aniq bo'lsa (masalan, sikllar yoki hisoblagichlarda) \`let\`, boshqa barcha holatlarda (xavfsizlik va o'qishlilik uchun) standart sifatida \`const\` ishlatilishi lozim.
3. **Savol:** Blok doirasi (Block Scope) nima?
   * **Javob:** Jingalak qavslar \`{}\` ichidagi hudud (masalan, \`if\`, \`for\`, \`while\` yoki shunchaki bloklar). Bu blok ichida \`let\` yoki \`const\` bilan e'lon qilingan o'zgaruvchilar blokdan tashqarida ko'rinmaydi.
4. **Savol:** \`var\` hoisting bo'lganda nima uchun \`ReferenceError\` bermaydi?
   * **Javob:** Chunki JavaScript dvigateli \`var\` ni xotiraga joylashtirish paytida unga avtomatik ravishda \`undefined\` qiymatini biriktiradi.

### Middle
5. **Savol:** Temporal Dead Zone (TDZ) nima va u qanday foyda keltiradi?
   * **Javob:** TDZ — o'zgaruvchi yaratilganidan to u e'lon qilingan qatorgacha bo'lgan vaqt. U dasturchilarni o'zgaruvchilarni e'lon qilishdan oldin ishlatib yuborishdan (bu ko'p xatolarga sabab bo'ladi) himoya qiladi va kod sifatini oshiradi.
6. **Savol:** Nima uchun global \`var\` o'zgaruvchilari global obyekt (masalan, \`window\`) xususiyatiga aylanadi, lekin \`let\`/\`const\` aylanmaydi?
   * **Javob:** Bu tarixiy sabablar va ES6 spetsifikatsiyasi bilan bog'liq. Global doirada \`let\` va \`const\` Declarative Environment Record-da saqlanadi, \`var\` esa Object Environment Record-ga (ya'ni global obyektga) yoziladi.
7. **Savol:** Quyidagi kod bajarilganda nima yuz beradi va nima uchun?
   \`\`\`javascript
   let a = 10;
   {
     console.log(a);
     let a = 20;
   }
   \`\`\`
   * **Javob:** \`ReferenceError\` beradi. Blok ichidagi \`let a = 20\` o'sha blok doirasida hoisting bo'ladi va blok boshidan boshlab TDZ ni yaratadi. Shuning uchun tashqi \`a = 10\` ko'rinmaydi va e'lon qilinishidan oldin o'qishga harakat qilingani uchun xato yuz beradi.
8. **Savol:** \`const\` orqali e'lon qilingan massivga yangi element qo'shish mumkinmi?
   * **Javob:** Ha, mumkin. Chunki massiv obyektdir va uning ichiga element qo'shish (\`arr.push(4)\`) massivning xotiradagi havolasini (reference) o'zgartirmaydi, faqat tarkibini mutatsiyaga uchratadi.

### Senior
9. **Savol:** Lexical Environment (Leksik Muhit) va Variable Environment o'rtasidagi farq nima?
   * **Javob:** JavaScript Execution Context (bajarilish muhiti) tarkibida ikkala qism ham bor. \`LexicalEnvironment\` \`let\` va \`const\` deklaratsiyalarini va scope-larini saqlash uchun ishlatiladi, \`VariableEnvironment\` esa faqat \`var\` deklaratsiyalarini saqlaydi.
10. **Savol:** \`Object.freeze()\` va \`const\` farqi nimada?
    * **Javob:** \`const\` o'zgaruvchi havolasini qayta tayinlashni (reassignment) taqiqlaydi, lekin obyekt xususiyatlarini o'zgartirishga ruxsat beradi. \`Object.freeze()\` esa obyekt tarkibini butunlay muzlatib qo'yadi va xususiyatlarini o'zgartirishni taqiqlaydi, lekin uning havolasini o'zgartirish (agar u \`let\` bo'lsa) mumkin.
11. **Savol:** Dvigatel darajasida (V8 compiler) \`const\` o'zgaruvchilar qanday optimallashtiriladi?
    * **Javob:** V8 kompilyatori (Turbofan) \`const\` o'zgaruvchilarning qiymati hech qachon o'zgarmasligini bilgani uchun, ular ustida "constant folding" (o'zgaruvchini to'g'ridan-to'g'ri qiymat bilan almashtirish) va boshqa inline optimallashtirishlarni amalga oshiradi, bu esa kodning tezroq bajarilishini ta'minlaydi.
12. **Savol:** Nima uchun \`let\` va \`const\` redeclaration (qayta e'lon qilish) qilishga yo'l qo'ymaydi?
    * **Javob:** Bu til darajasidagi xavfsizlik chorasidir. Dastur yiriklashgan sari tasodifan bir xil nomdagi o'zgaruvchini qayta e'lon qilib, oldingi ma'lumotlarni o'chirib yuborish xavfi juda yuqori bo'ladi. ES6 ushbu muammoni bartaraf etdi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashq topshiriqlari \`/Users/farhod/Desktop/github/js-uz/scratch/variables_exercises.json\` faylida berilgan. Ularni bajarib, bilimingizni mustahkamlang.

### O'zgaruvchilarning Scope Boundaries (Doira chegaralari) farqlari:

Quyidagi diagrammada \`var\` va \`let/const\` o'zgaruvchilarining kirish doirasi chegaralari va ularning cheklovlari ko'rsatilgan:

\`\`\`mermaid
graph LR
    subgraph ScopeBoundaries ["Scope Chegaralari"]
        direction TB
        subgraph GlobalScope ["Global Scope (window)"]
            GVar["var globalVar (window.globalVar bo'ladi)"]
            GLet["let/const globalLet (window-da ko'rinmaydi)"]
            
            subgraph FuncScope ["Function Scope - function myFunc() { ... }"]
                FVar["var funcVar (Funksiyadan tashqariga chiqolmaydi)"]
                
                subgraph BlockScope ["Block Scope - if (true) { ... } / for (...) { ... }"]
                    BVar["var insideBlock (Blokdan tashqari, funksiyaga sizib chiqadi)"]
                    BLet["let/const blockLet (Blokdan tashqariga mutlaqo chiqolmaydi)"]
                end
            end
        end
    end

    BVar -->|Sizib chiqadi| FuncScope
    BLet -.->|Taqiqlangan| FuncScope
    FVar -.->|Taqiqlangan| GlobalScope
\`\`\`

---

## 7. 📝 12 ta Mini Test

Test savollari \`/Users/farhod/Desktop/github/js-uz/scratch/variables_quizzes.json\` faylida joylashgan. Darsdan keyin testlarni yechib, o'zlashtirish darajangizni tekshiring.

---

## 8. 🎯 Real Project Case Study

### Case Study: Dynamic Buttons & Applications Configuration

Real loyihalarda \`var\`, \`let\`, \`const\` dan noto'g'ri foydalanish jiddiy muammolarga olib kelishi mumkin. Keling, 2 ta real holatni ko'rib chiqamiz:

#### 1. UI Event Listeners muammosi (let yechimi)
Dinamik yaratilgan tugmalarga hodisalarni bog'lashda \`var\` ishlatilsa, barcha tugmalar eng oxirgi tugmaning ma'lumotlarini ko'rsatadi:
\`\`\`javascript
// XATO (var ishlatilganda):
function setupBadMenu(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      // i o'zgaruvchisi umumiy bo'lgani uchun, har doim oxirgi indeksni ko'rsatadi
      console.log("Bosilgan tugma ID:", i); 
    };
  }
}

// TO'G'RI (let ishlatilganda):
function setupGoodMenu(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      // Har bir sikl qadami uchun alohida i o'zgaruvchisi (block scope) yaratiladi
      console.log("Bosilgan tugma ID:", i); 
    };
  }
}
\`\`\`

#### 2. Dastur Sozlamalari Himoyasi (const va Object.freeze yechimi)
Loyihamizdagi API config obyektini tasodifiy o'zgarishlardan himoya qilish:
\`\`\`javascript
// Shunchaki const ishlatish yetarli emas, chunki ichki xususiyatlarni o'zgartirish mumkin:
const APP_CONFIG = {
  apiEndpoint: "https://api.mysite.uz",
  timeout: 5000
};
APP_CONFIG.timeout = 10000; // O'zgarib ketdi!

// To'liq himoya qilish uchun const va Object.freeze() birgalikda qo'llaniladi:
const SECURE_CONFIG = Object.freeze({
  apiEndpoint: "https://api.mysite.uz",
  timeout: 5000
});

// Endi bu amal xatolik beradi yoki inkor qilinadi:
SECURE_CONFIG.timeout = 10000; 
console.log(SECURE_CONFIG.timeout); // 5000 (o'zgarmadi)
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Garbage Collection (Xotirani tozalash)
Blok doirasiga ega o'zgaruvchilar (\`let\`/\`const\`) blok yakunlangandan so'ng darhol xotiradan o'chirilishi (Garbage Collection) osonlashadi. Zero, dvigatel ularning hayot aylanish muddati ushbu blok bilan cheklanganini aniq biladi. \`var\` o'zgaruvchilari esa funksiya tugamaguncha xotirada qoladi, bu esa xotira sarfini (memory consumption) oshiradi.

### 2. Dvigatel Optimallashtirishi (V8 engines)
Zamonaviy JS dvigatellari \`const\` ishlatilgan o'zgaruvchilarni "read-only pointer" sifatida belgilab oladi. Bu esa kompilyatsiya vaqtida kodni optimallashtirishga (masalan, o'zgarmas qiymatlarni keshda saqlashga) yordam beradi.

---

## 10. 📌 Cheat Sheet

| Xususiyat | \`var\` | \`let\` | \`const\` |
| :--- | :--- | :--- | :--- |
| **Scope (Doirasi)** | Function scope | Block scope | Block scope |
| **Hoisting** | Ha (qiymati \`undefined\` bo'ladi) | Ha (lekin TDZ da qoladi) | Ha (lekin TDZ da qoladi) |
| **Qayta e'lon qilish (Redeclare)** | Ha, mumkin | Yo'q, taqiqlangan | Yo'q, taqiqlangan |
| **Qayta qiymat berish (Reassign)** | Ha, mumkin | Ha, mumkin | Yo'q, taqiqlangan |
| **Boshlang'ich qiymat berish** | Shart emas | Shart emas | **Majburiy** |
| **Global obyektga birikish (\`window\`)** | Ha | Yo'q | Yo'q |
`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchi yaratish",
      instruction: "'name' nomli o'zgarmas (const) va 'score' nomli o'zgaruvchan (let) yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const name = 'Ali'; let score = 0;",
      test: "if (code.includes('const') && code.includes('let')) return null; return 'Kalit so\\'zlarni to\\'g\\'ri ishlating';"
    },
    {
      id: 2,
      title: "Qiymatni yangilash",
      instruction: "'ball' o'zgaruvchisini yarating, unga 10 bering va keyingi qatorda uni 15 ga o'zgartiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let ball = 10; ball = 15;",
      test: "if (code.includes('let') && typeof ball !== 'undefined' && ball === 15) return null; return 'Qiymatni to\\'g\\'ri yangilang';"
    },
    {
      id: 3,
      title: "O'zgarmas PI qiymati",
      instruction: "'PI' nomli o'zgarmas o'zgaruvchi yarating va unga 3.14159 qiymatini bering.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const PI = 3.14159;",
      test: "if (code.includes('const') && code.includes('PI') && code.includes('3.14159')) return null; return 'const PI o\\'zgarmasini to\\'g\\'ri e\\'lon qiling';"
    },
    {
      id: 4,
      title: "Ism va Familiya",
      instruction: "'firstName' o'zgaruvchisiga 'Ali' va 'lastName' o'zgaruvchisiga 'Valiyev' qiymatlarini bering.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let firstName = 'Ali';\nlet lastName = 'Valiyev';",
      test: "if (code.includes('firstName') && code.includes('lastName')) return null; return 'firstName va lastName o\\'zgaruvchilarini yarating';"
    },
    {
      id: 5,
      title: "Qiymatlarni almashtirish",
      instruction: "Berilgan 'a' va 'b' o'zgaruvchilarining qiymatlarini alohida 'temp' o'zgaruvchisi yordamida almashtiring.",
      startingCode: "let a = 5;\nlet b = 10;\nlet temp;\n// Bu yerga yozing\n",
      hint: "temp = a;\na = b;\nb = temp;",
      test: "if (code.includes('temp = a') && code.includes('a = b') && code.includes('b = temp')) return null; return 'Qiymatlarni temp yordamida almashtiring';"
    },
    {
      id: 6,
      title: "CamelCase uslubida nomlash",
      instruction: "CamelCase uslubidan foydalanib 'foydalanuvchi yoshi' va 'tizimga kirish vaqti' degan ma'nolarni anglatuvchi let o'zgaruvchilarini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let userAge;\nlet loginTime;",
      test: "if (code.includes('userAge') && code.includes('loginTime')) return null; return 'O\\'zgaruvchilarni camelCase shaklida nomlang (userAge, loginTime)';"
    },
    {
      id: 7,
      title: "Dinamik tiplashtirish",
      instruction: "'data' o'zgaruvchisini let orqali yarating, dastlab unga 100 sonini bering va keyingi qatorda unga 'Salom' matnini yuklang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let data = 100;\ndata = 'Salom';",
      test: "if (code.includes('let data') && code.includes('100') && code.includes('Salom')) return null; return 'data o\\'zgaruvchisini yarating va keyin matn qiymat yuklang';"
    },
    {
      id: 8,
      title: "Undefined o'zgaruvchi",
      instruction: "'message' nomli o'zgaruvchini qiymat bermasdan e'lon qiling va uni console.log() orqali konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let message;\nconsole.log(message);",
      test: "if (code.includes('let message') && code.includes('console.log')) return null; return 'message ni qiymat bermay e\\'lon qiling va konsolga chiqaring';"
    },
    {
      id: 9,
      title: "O'zgarmas massivni o'zgartirish",
      instruction: "const bilan 'numbers' massivini [1, 2] ko'rinishida yarating va unga push() metodi yordamida 3 sonini qo'shing.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const numbers = [1, 2];\nnumbers.push(3);",
      test: "if (code.includes('const numbers') && code.includes('push(3)')) return null; return 'const massiv yarating va 3 ni push qiling';"
    },
    {
      id: 10,
      title: "O'zgarmas obyektni yangilash",
      instruction: "const bilan 'car' obyektini yarating (ichida brand: 'Tesla' bo'lsin). Keyingi qatorda brand qiymatini 'BYD' ga o'zgartiring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const car = { brand: 'Tesla' };\ncar.brand = 'BYD';",
      test: "if (code.includes('const car') && code.includes('BYD')) return null; return 'Obyekt ichidagi xususiyatni yangilang';"
    },
    {
      id: 11,
      title: "Bir qatorda bir nechta o'zgaruvchi",
      instruction: "Bir dona 'let' kalit so'zi yordamida bir qatorning o'zida a = 1, b = 2, c = 3 o'zgaruvchilarini yarating.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let a = 1, b = 2, c = 3;",
      test: "if (code.includes('let') && code.includes('a = 1') && code.includes('b = 2') && code.includes('c = 3')) return null; return 'Bir qatorda e\\'lon qilish qoidasiga rioya qiling';"
    },
    {
      id: 12,
      title: "TDZ va ReferenceError",
      instruction: "Try-catch bloki ichida, 'y' o'zgaruvchisini let bilan e'lon qilishdan oldin console.log(y) qiling va xatoni ushlab e.name ni konsolga chiqaring.",
      startingCode: "try {\n  // Bu yerga yozing\n  \n  let y = 5;\n} catch (e) {\n  console.log(e.name);\n}",
      hint: "console.log(y);",
      test: "if (code.includes('console.log(y)') && code.includes('let y')) return null; return 'y e\\'lon qilinishidan oldin konsolga chiqarilishi kerak';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da var, let va const o'zgaruvchilarining qaysilari blok doirasiga (block scope) ega?",
    "options": [
      "var va let",
      "Faqat var",
      "let va const",
      "Barchasi (var, let, const)"
    ],
    "correctAnswer": 2,
    "explanation": "let va const kalit so'zlari blok doirasiga (block scope) ega, ya'ni ular e'lon qilingan jingalak qavslar ({}) ichidagina amal qiladi. var esa funksiya doirasiga (function scope) ega."
  },
  {
    "id": 2,
    "question": "var orqali e'lon qilingan o'zgaruvchi bilan bog'liq qaysi holat let va const da xatolikka (SyntaxError) olib keladi?",
    "options": [
      "O'zgaruvchini funksiya ichida ishlatish",
      "Bir xil nomdagi o'zgaruvchini ayni bir doirada (scope) qayta e'lon qilish (redeclaration)",
      "O'zgaruvchiga yangi qiymat yuklash (reassignment)",
      "O'zgaruvchini global obyektga biriktirish"
    ],
    "correctAnswer": 1,
    "explanation": "var bilan bir xil nomli o'zgaruvchini bitta doirada qayta-qayta e'lon qilish mumkin (masalan: var a = 1; var a = 2;). Ammo let yoki const bilan buni amalga oshirish 'Identifier has already been declared' SyntaxError xatosini beradi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(a);\nvar a = 5;\n```",
    "options": [
      "5",
      "ReferenceError: a is not defined",
      "undefined",
      "null"
    ],
    "correctAnswer": 2,
    "explanation": "var o'zgaruvchilari hoisting (tepaga ko'tarilish) xususiyatiga ega. Ularning e'lon qilinishi (declaration) tepaga ko'tariladi, ammo qiymat berilishi (initialization) o'z joyida qoladi. Shuning uchun deklaratsiyadan oldin ularning qiymati undefined bo'ladi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilganda nima yuz beradi?\n```javascript\nconsole.log(b);\nlet b = 10;\n```",
    "options": [
      "undefined chiqadi",
      "ReferenceError: Cannot access 'b' before initialization xatoligi yuz beradi",
      "10 chiqadi",
      "null chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "let va const o'zgaruvchilari ham hoisting bo'ladi, lekin ular e'lon qilinmaguncha TDZ (Temporal Dead Zone - Vaqtinchalik o'lik hudud) da qoladi. Ularga e'lon qilinishidan oldin murojaat qilish ReferenceError xatosini beradi."
  },
  {
    "id": 5,
    "question": "const yordamida e'lon qilingan o'zgaruvchilar haqida qaysi tasdiq to'g'ri?",
    "options": [
      "Ularni e'lon qilishda qiymat berish majburiy emas",
      "Ularning qiymatini keyinchalik butunlay qayta tayinlab (reassign) bo'lmaydi va e'lon qilinayotganda boshlang'ich qiymat berish shart",
      "Ularning qiymati mutlaqo o'zgarmas bo'lib, ichidagi obyekt xususiyatlarini ham o'zgartirib bo'lmaydi",
      "Ular faqat sonlar va satrlar (primitivlar) uchun ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "const o'zgaruvchisiga boshqa qiymatni qayta tenglashtirib bo'lmaydi (reassignment taqiqlangan) va uni yaratishda boshlang'ich qiymat yozilishi shart. Biroq, agar u obyekt yoki massiv bo'lsa, uning ichki elementlarini o'zgartirish (mutatsiya) mumkin."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst obj = { name: \"Anvar\" };\nobj.name = \"Dilshod\";\nconsole.log(obj.name);\n```",
    "options": [
      "TypeError: Assignment to constant variable",
      "Anvar",
      "Dilshod",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "const faqat o'zgaruvchining xotiradagi havolasini (reference) o'zgarmas qiladi. Obyektning ichidagi xususiyatni o'zgartirish (mutatsiya) mumkin, shuning uchun obj.name qiymati 'Dilshod' ga muvaffaqiyatli o'zgaradi."
  },
  {
    "id": 7,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst numbers = [1, 2, 3];\nnumbers = [4, 5, 6];\nconsole.log(numbers);\n```",
    "options": [
      "[4, 5, 6]",
      "[1, 2, 3]",
      "TypeError: Assignment to constant variable",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "const orqali yaratilgan massivga yangi massiv havolasini qayta tayinlash (reassign) xatolik beradi. Massivga element qo'shish (push) mumkin, lekin yangi massivga tenglab bo'lmaydi."
  },
  {
    "id": 8,
    "question": "Temporal Dead Zone (Vaqtinchalik o'lik hudud) nima?",
    "options": [
      "Funksiya ichidagi barcha o'zgaruvchilar o'chib ketadigan xotira qismi",
      "Brauzer sahifasi yopilgandagi vaqt oralig'i",
      "Blok doirasi boshlangan joydan to o'zgaruvchi (let/const) amalda e'lon qilingan qatorgacha bo'lgan, o'zgaruvchiga murojaat qilib bo'lmaydigan kod hududi",
      "setTimeout funksiyasi kutadigan millisekundlar oralig'i"
    ],
    "correctAnswer": 2,
    "explanation": "TDZ — kod blokining boshlanishidan boshlab, o'zgaruvchi let yoki const kalit so'zi bilan e'lon qilinadigan qatorgacha bo'lgan kod qismidir. Bu hududda o'zgaruvchiga kirish ReferenceError xatosiga sabab bo'ladi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet x = 1;\n{\n  let x = 2;\n  console.log(x);\n}\nconsole.log(x);\n```",
    "options": [
      "2 va 2",
      "1 va 2",
      "2 va 1",
      "1 va 1"
    ],
    "correctAnswer": 2,
    "explanation": "Blok ichidagi let x = 2 faqat o'sha blok ichida amal qiladi va tashqi x ni soyalaydi (shadowing). Blok tugagach, tashqi let x = 1 o'z kuchida qoladi. Shuning uchun natija 2 va 1 bo'ladi."
  },
  {
    "id": 10,
    "question": "Global doirada (window yoki global) var va let o'rtasidagi farq nimada?",
    "options": [
      "Ikkala o'zgaruvchi ham global window obyektining xususiyatiga aylanadi",
      "var orqali e'lon qilingan o'zgaruvchi window obyektiga birikadi, let esa window obyektiga birikmaydi",
      "let orqali e'lon qilingan o'zgaruvchi window obyektiga birikadi, var esa birikmaydi",
      "Ikkalasi ham window obyektiga biriktirilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Global doirada (eng yuqori qismda) var orqali e'lon qilingan o'zgaruvchilar global obyektga (masalan, brauzerda window) xususiyat bo'lib qo'shiladi. let va const esa global doirada e'lon qilinsa-da, window obyektida ko'rinmaydi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod ishga tushirilganda konsolda nima ko'rinadi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
    "options": [
      "0, 1, 2",
      "3, 3, 3",
      "2, 2, 2",
      "undefined, undefined, undefined"
    ],
    "correctAnswer": 1,
    "explanation": "var funksiya doirasiga (yoki global doiraga) ega bo'lgani uchun butun for sikli uchun faqat bitta 'i' o'zgaruvchisi mavjud bo'ladi. setTimeout callbacks bajarilganda sikl allaqachon tugab, i = 3 bo'lib qolgan. let ishlatilganda esa har bir qadam uchun alohida i o'zgaruvchisi yaratilib, 0, 1, 2 chiqardi."
  },
  {
    "id": 12,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nfunction test() {\n  if (true) {\n    var a = \"olma\";\n    let b = \"anor\";\n  }\n  console.log(a);\n  console.log(b);\n}\ntest();\n```",
    "options": [
      "'olma' chiqadi, so'ngra ReferenceError: b is not defined xatosi yuz beradi",
      "'olma' va 'anor' chiqadi",
      "ReferenceError: a is not defined xatosi yuz beradi",
      "'anor' chiqadi, so'ngra ReferenceError: a is not defined xatosi yuz beradi"
    ],
    "correctAnswer": 0,
    "explanation": "var a funksiya doirasiga (function scope) ega bo'lib, if blokidan tashqarida ham ko'rinadi, shuning uchun 'olma' muvaffaqiyatli chiqadi. let b esa blok doirasiga (block scope) ega bo'lgani uchun if blokidan tashqarida ko'rinmaydi va ReferenceError xatosini beradi."
  }
]

};
