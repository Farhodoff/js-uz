export const blockScopeLesson = {
  id: "blockScopeLesson",
  title: "Blok Ko'lami (Block Scope)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Blok Ko'lami (Block Scope) nima?
Blok ko'lami — bu o'zgaruvchining faqat o'zi e'lon qilingan figurali qavslar \`{ ... }\` (blok) ichida ko'rinishi va undan tashqarida mavjud bo'lmasligidir. JavaScript-da \`let\` va \`const\` yordamida e'lon qilingan o'zgaruvchilar blok ko'lamiga ega. O'z navbatida, \`var\` kalit so'zi blok ko'lamini mutlaqo hisobga olmaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz ko'p xonali **shaxsiy uyda** yashayapsiz:
* **\`let\` va \`const\` (Xonadagi shaxsiy buyumlar):** Siz xonangizning ichiga seyf qo'ydingiz va u yerda shaxsiy kundaligingizni saqlaysiz. Uyning boshqa xonasidagi odamlar u yerga kira olmaydi va u buyumni ko'ra olmaydi. Agar kimdir tashqaridan kundalikni so'rasa, "bunday buyum yo'q" deb javob beriladi (ReferenceError).
* **\`var\` (Megafonli odam):** Siz xonangiz ichida turib megafonda baqiryapsiz. Garchi siz xona ichida bo'lsangiz ham, ovozingiz butun uyga tarqaladi. Uyning istalgan burchagidagi odam sizni eshitishi mumkin, chunki ovoz xona chegarasidan (blokdan) tashqariga sizib chiqqan.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Bare Blocks va if-else shartlarida doiralar)
Bare block (oddiy figurali qavslar) ichida o'zgaruvchilar e'lon qilish:
\`\`\`javascript
{
  var globalA = "Men megafonman (var)";
  let localB = "Men shaxsiy xonadaman (let)";
  const localC = "Men ham shaxsiy xonadaman (const)";
}

console.log(globalA); // Natija: "Men megafonman (var)"
// console.log(localB); // Xato beradi: ReferenceError: localB is not defined
// console.log(localC); // Xato beradi: ReferenceError: localC is not defined
\`\`\`

\`if-else\` sharti ichida blok ko'lami:
\`\`\`javascript
const isAuthorized = true;

if (isAuthorized) {
  let secretKey = "12345-SUPER-SECRET";
  var sessionID = "ACTIVE-SESSION-99";
  console.log("Blok ichida secretKey:", secretKey); // Ishlaydi
}

console.log("Blok tashqarisida sessionID:", sessionID); // Natija: ACTIVE-SESSION-99
// console.log("Blok tashqarisida secretKey:", secretKey); // ReferenceError xatosi!
\`\`\`

### 2. Intermediate Example (for tsikli ichida let va var farqi)
\`var\` yordamida tsikl sanog'ini yaratganda uning tashqariga sizib chiqishi:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  console.log("Tsikl ichi:", i); // 0, 1, 2
}
console.log("Tsikl tashqarisi (var):", i); // Natija: 3 (Sizib chiqdi!)
\`\`\`

\`let\` yordamida tsikl yozilganda xavfsiz blok ko'lami:
\`\`\`javascript
for (let j = 0; j < 3; j++) {
  console.log("Tsikl ichi:", j); // 0, 1, 2
}
// console.log("Tsikl tashqarisi (let):", j); // ReferenceError: j is not defined
\`\`\`

### 3. Advanced Example (O'zgaruvchini soya qilish - Shadowing va TDZ)
Bir xil nomdagi o'zgaruvchilarni ichma-ich bloklarda e'lon qilish (Variable Shadowing):
\`\`\`javascript
const username = "Ali"; // Global/Tashqi o'zgaruvchi

{
  // console.log(username); // ReferenceError: Cannot access 'username' before initialization
  // Sababi: TDZ (Temporal Dead Zone) boshlandi. Blok ichidagi username hali yaratilmagan.
  
  let username = "Vali"; // Soya qilish (Shadowing) boshlandi
  console.log("Blok ichida username:", username); // Natija: "Vali"
  
  {
    let username = "Hasan"; // Yana bir qatlam soya qilish
    console.log("Ichki blokda username:", username); // Natija: "Hasan"
  }
  
  console.log("Blok ichida qayta tekshirish:", username); // Natija: "Vali" (Hasan o'chib ketdi)
}

console.log("Blok tashqarisida username:", username); // Natija: "Ali" (Tashqi o'zgaruvchiga ta'sir qilmadi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Leksik Muhit (Lexical Environment) va Bloklar
JavaScript dvigateli (masalan, Chrome brauzeridagi V8) kodni bajarishda **Bajarilish Konteksti (Execution Context)** va **Leksik Muhit (Lexical Environment)** konsepsiyalaridan foydalanadi:

1. **Blokga kirish:** Dvigatel biror blokni \`{\` boshlaganda, joriy leksik muhitni vaqtincha muzlatib, blok uchun yangi alohida leksik muhit (Lexical Environment) yaratadi.
2. **Environment Record:** Blok uchun ochilgan muhit ikki qismdan iborat bo'ladi:
   * **Declarative Environment Record:** Blok doirasidagi \`let\`, \`const\`, \`class\` e'lonlarini saqlaydi.
   * **Outer reference (Tashqi havola):** Ota (tashqi) blok yoki funktsiyaning leksik muhitiga ishora qiladi (Scope Chain shu orqali ishlaydi).
3. **Hoisting va TDZ:** Blok ichidagi \`let\` va \`const\` o'zgaruvchilari ham hoist qilinadi (blok boshiga olib o'tiladi), lekin ularga boshlang'ich qiymat (masalan, \`undefined\`) yuklanmaydi. Ular **Temporal Dead Zone (TDZ)** ga joylashtiriladi. Dvigatel o'zgaruvchi e'lon qilingan haqiqiy qatorga yetib kelmaguncha u o'zgaruvchiga murojaat qilish mutlaqo taqiqlanadi va \`ReferenceError\` tashlaydi.
4. **\`var\` ning chetlab o'tishi:** \`var\` kalit so'zi blok doirasidagi Leksik Muhitni umuman chetlab o'tadi va eng yaqin o'rab turgan funktsiya yoki global leksik muhitning (Variable Environment) tarkibiga qo'shiladi. Shuning uchun u blokdan tashqarida ham ko'rinadi.
5. **Blokdan chiqish:** Blok tugagach \`}\`, uning shaxsiy leksik muhiti xotiradan o'chiriladi va dvigatel yana tashqi leksik muhitga qaytadi. Blokdagi \`let\`/\`const\` o'zgaruvchilariga havola yo'qolgani uchun ular axlat yig'uvchi (Garbage Collector) tomonidan tezda tozalanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Blok scoped o'zgaruvchini tashqarida ishlatishga urinish
Dasturchilar shart bajarilganda qiymat oladigan o'zgaruvchini blok tashqarisida ishlatib xatoga yo'l qo'yadilar.
* **Xato:**
  \`\`\`javascript
  if (true) {
    let result = 10 * 5;
  }
  console.log(result); // ReferenceError: result is not defined
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  let result; // O'zgaruvchini tashqi doirada e'lon qilamiz
  if (true) {
    result = 10 * 5;
  }
  console.log(result); // Natija: 50 (to'g'ri ishlaydi)
  \`\`\`

### 2. \`var\` tufayli yuzaga keladigan asinxron tsikl muammosi
Asinxron callback funksiyalari (masalan, \`setTimeout\` yoki \`addEventListener\`) ishga tushganda \`var\` bilan e'lon qilingan o'zgaruvchining oxirgi qiymatini olishi.
* **Xato:**
  \`\`\`javascript
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log(i); // Natija ketma-ketligi: 3, 3, 3 (0, 1, 2 emas!)
    }, 100);
  }
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  for (let i = 0; i < 3; i++) { // var o'rniga let ishlatamiz
    setTimeout(function() {
      console.log(i); // Natija ketma-ketligi: 0, 1, 2
    }, 100);
  }
  \`\`\`
*Tushuntirish:* \`let\` ishlatilganda, har bir aylanish (iteratsiya) uchun yangi blok ko'lami ochilib, \`i\` o'zgaruvchisining alohida nusxasi saqlab qolinadi.

### 3. Temporal Dead Zone (TDZ) ga tushib qolish
O'zgaruvchi e'lon qilinishidan oldin unga murojaat qilish.
* **Xato:**
  \`\`\`javascript
  function calculate() {
    console.log(temp); // ReferenceError: Cannot access 'temp' before initialization
    let temp = 36.6;
  }
  calculate();
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  function calculate() {
    let temp = 36.6; // Avval e'lon qilamiz
    console.log(temp); // 36.6
  }
  calculate();
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Level
1. **Savol:** O'zgaruvchi ko'lami (scope) nima?
   * **Javob:** Scope — o'zgaruvchilar va funksiyalarga dasturning qaysi qismlaridan kirish (access) mumkinligini belgilaydigan qoidalar to'plamidir.
2. **Savol:** Blok ko'lami (block scope) nima va u qanday yaratiladi?
   * **Javob:** Blok doirasi figurali qavslar \`{}\` yordamida ochilgan har qanday kod blokidir. Blok ichida \`let\` yoki \`const\` yordamida e'lon qilingan o'zgaruvchilar faqat shu blok ichida ko'rinadi.
3. **Savol:** \`var\` kalit so'zi blok ko'lamiga bo'ysunadimi?
   * **Javob:** Yo'q, \`var\` blok ko'lamini tan olmaydi. U faqat funktsiya ko'lamiga (function scope) yoki global ko'lamga bo'ysunadi.
4. **Savol:** Blok doirasidagi \`let\` va \`const\` o'rtasidagi farq nimada?
   * **Javob:** Ikkalasi ham blok ko'lamiga ega. Biroq, \`let\` o'zgaruvchisini keyinchalik qayta o'zgartirish (re-assignment) mumkin, \`const\` esa o'zgarmas doimiydir va unga qayta qiymat yuklab bo'lmaydi.

### Middle Level
5. **Savol:** Temporal Dead Zone (TDZ) nima va u qachon sodir bo'ladi?
   * **Javob:** TDZ — bu blok boshlangan joydan to o'zgaruvchi (\`let\`/\`const\`) haqiqiy e'lon qilingan satrgacha bo'lgan oraliq. Bu hududda o'zgaruvchiga murojaat qilish \`ReferenceError\` xatosiga sabab bo'ladi.
6. **Savol:** Variable Shadowing (soya qilish) nima?
   * **Javob:** Variable Shadowing — ichki blok doirasida tashqi doiradagi o'zgaruvchi bilan bir xil nomdagi yangi o'zgaruvchining e'lon qilinishi. Bunda ichki doiradagi o'zgaruvchi tashqarisidagisini yashirib (soya qilib) turadi.
7. **Savol:** Global doirada \`var\` va \`let\` o'rtasida window obyekti nuqtai nazaridan qanday farq bor?
   * **Javob:** Global ko'lamda \`var\` yordamida yaratilgan o'zgaruvchi brauzerda \`window\` obyektining xususiyatiga aylanadi (masalan, \`window.x\`). \`let\` esa global doirada e'lon qilinsa ham \`window\` obyektiga birikmaydi.
8. **Savol:** Tsikl ichida \`var\` va \`let\` o'zgaruvchilarining ishlash mexanizmi qanday farq qiladi?
   * **Javob:** \`for\` tsiklida \`var\` faqat bitta umumiy o'zgaruvchini ishlatadi va qiymat tsikl tugaguncha o'zgarib boradi. \`let\` ishlatilganda esa, har bir iteratsiya uchun yangi o'zgaruvchi (nusxa) va shaxsiy blok muhiti yaratiladi.

### Senior Level
9. **Savol:** JavaScript dvigateli bloklarni bajarishda Lexical Environment-ni qanday manipulyatsiya qiladi?
   * **Javob:** Har safar blok doirasiga kirilganda, dvigatel joriy muhitni o'rab turuvchi tashqi havola (Outer reference) sifatida belgilab, blok uchun yangi alohida Lexical Environment yaratadi. Blokdan chiqilganda esa eski Lexical Environment tiklanadi, blok doirasidagi o'zgaruvchilar Garbage Collector uchun ochiq qoladi.
10. **Savol:** Nima uchun ES6 dan keyin IIFE (Immediately Invoked Function Expressions) dan foydalanish sezilarli darajada kamaydi?
    * **Javob:** IIFE-lar asosan \`var\` o'zgaruvchilarini ma'lum bir doirada yashirish va global sohaga o'tishining oldini olish (encapsulation) uchun ishlatilgan. ES6 da blok ko'lami (\`let\`/\`const\`) va bare block-lar \`{}\` paydo bo'lishi bilan IIFE funksiyalariga bo'lgan ehtiyoj yo'qoldi.
11. **Savol:** \`try-catch\` blokidagi \`catch(error)\` qismining scope xususiyati qanday?
    * **Javob:** \`catch(error)\` bloki o'zining mustaqil blok ko'lamiga ega. Hatto ES6 gacha ham, \`error\` o'zgaruvchisi faqat \`catch\` bloki ichida mavjud bo'lib, unga tashqaridan kirish taqiqlangan. Bu JS-dagi blok doirasiga ega dastlabki elementlardan biri edi.
12. **Savol:** Quyidagi kod bajarilganda qanday xato chiqadi va nima uchun?
    \`\`\`javascript
    let x = 10;
    {
      console.log(x);
      let x = 20;
    }
    \`\`\`
    * **Javob:** \`ReferenceError: Cannot access 'x' before initialization\` xatosi chiqadi. Sababi, blok ichida \`let x = 20\` borligi uchun bu blokda local \`x\` ustuvor (shadowing). Ammo \`console.log(x)\` bajarilganda, local \`x\` hali e'lon qilinmagan (u TDZ da), shuning uchun tashqi \`x = 10\` qiymatiga murojaat qilinmaydi va xatolik beradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Blok ko'lami va o'zgaruvchilarning sizib chiqishini vizual diagramma orqali tahlil qilamiz.

### Bajarilish Oqimi Diagrammasi (Control Flow)

\`\`\`mermaid
graph TD
    ScopeStart([Kodni Bajarish: Global/Funktsiya Doirasi]) --> BlockStart["Blok Boshi: { let x, const y, var z }"]
    BlockStart --> ScopeSplit{"O'zgaruvchi Turi?"}
    
    ScopeSplit -- let / const --> BlockBound["Blok Ichida Cheklangan (Block-Scoped)"]
    ScopeSplit -- var --> EscapesBlock["Blokdan Tashqariga Sizadi (Escapes Block)"]
    
    BlockBound --> BlockEnd["Blok Tugashi } (Xotiradan o'chadi)"]
    EscapesBlock --> OuterScopeAccess["Tashqi Scope-da saqlanib qoladi (Global/Funktsiya)"]
    
    BlockEnd --> RefErr["console.log(x/y) -> ReferenceError!"]
    OuterScopeAccess --> SuccessVal["console.log(z) -> Muvaffaqiyatli chop etiladi"]
\`\`\`

### Bosqichma-bosqich ishlash jarayoni:
1. Blok ochilganda (\`{\` belgisiga duch kelganda), yangi blok leksik muhiti (Scope) yaratiladi.
2. \`let\` va \`const\` o'zgaruvchilari shu blok ichidagi Declarative Environment Record ga joylashtiriladi (va TDZ ga tushadi).
3. \`var\` o'zgaruvchisi esa blokni chetlab o'tib, tashqi funktsional/global muhitga biriktiriladi.
4. Blok yakunlanganda (\`}\` belgisiga kelganda), blok doirasidagi o'zgaruvchilar o'chiriladi. Tashqaridan ularni chaqirish \`ReferenceError\` xatoligiga olib keladi.

> [!TIP]
> Doimo dastur yozayotganda standart sifatida \`const\` dan foydalaning. Agar o'zgaruvchining qiymati o'zgarishi kerak bo'lsa, \`let\` ishlating. \`var\` kalit so'zini ishlatishdan butunlay qoching, chunki u kutilmagan xatoliklar va global soha ifloslanishiga (scope pollution) olib keladi.

---

## 7. 📝 12 ta Mini Test

Ushbu mavzu bo'yicha olgan bilimlaringizni sinab ko'rish uchun maxsus testlar to'plami tayyorlangan. Mavzuga oid \`quizzes.json\` fayli yordamida o'z bilimlaringizni chuqur tekshirib olishingiz mumkin.

---

## 8. 🎯 Real Project Case Study

### Tranzaksiya Ma'lumotlarini Qayta Ishlash Tizimi
Real loyihalarda tsikl yoki shart bloklari ichida oraliq hisob-kitob o'zgaruvchilaridan ko'p foydalaniladi. Agar ushbu o'zgaruvchilar blok ko'lamiga ega bo'lmasa, ular tashqi hisob-kitoblar bilan to'qnashib, ma'lumotlar buzilishiga (data corruption) sabab bo'lishi mumkin.

Quyidagi kodda do'kon savatidagi mahsulotlar chegirmasi hisoblanadi. Unda block scope yordamida oraliq o'zgaruvchilarning xavfsizligi ta'minlangan:

\`\`\`javascript
const cartItems = [
  { name: "Smartfon", price: 800, discount: 0.1 },  // 10% chegirma
  { name: "G'ilof", price: 20, discount: 0 },       // Chegirma yo'q
  { name: "Quloqchin", price: 150, discount: 0.15 } // 15% chegirma
];

function calculateCartTotal(items) {
  let grandTotal = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i]; // Block-scoped: Har bir iteratsiya uchun alohida ob'ekt
    
    // 1. Chegirmali narxni hisoblash
    if (item.discount > 0) {
      // temporary discount variables
      const discountAmount = item.price * item.discount; // Block-scoped
      const discountedPrice = item.price - discountAmount; // Block-scoped
      
      grandTotal += discountedPrice;
      console.log(\`Chegirma qo'llanildi: \${item.name} -> Yangi narx: $\${discountedPrice}\`);
    } else {
      // Chegirmasiz to'liq narx
      const finalPrice = item.price; // Block-scoped
      grandTotal += finalPrice;
      console.log(\`Oddiy narx: \${item.name} -> $\${finalPrice}\`);
    }
    
    // console.log(discountedPrice); // ReferenceError! O'zgaruvchi if-blokidan tashqarida ko'rinmaydi.
  }

  return grandTotal;
}

const totalToPay = calculateCartTotal(cartItems);
console.log(\`Jami to'lanadigan summa: $\${totalToPay}\`); // Natija: $867.5 (720 + 20 + 127.5)
\`\`\`

*Nega bu uslub muhim?*
Agar biz \`const discountAmount\` o'rniga \`var\` ishlatganimizda, bu o'zgaruvchi butun funksiya bo'ylab yoyilib, keyingi iteratsiyalardagi hisob-kitoblarga tasodifan aralashib ketishi mumkin edi. Block scope yordamida esa har bir \`if\` va \`for\` bloki o'zining "shaxsiy hududi"da xavfsiz hisob-kitoblarni amalga oshirdi.

---

## 9. 🚀 Performance va Optimization

### 1. Axlat yig'uvchi (Garbage Collector) faoliyati
Blok ko'lamiga ega bo'lgan o'zgaruvchilar dasturning umumiy xotira (RAM) sarfini kamaytirishga xizmat qiladi. Dastur kodi blokdan (\`}\`) chiqishi bilan, u yerdagi barcha \`let\` va \`const\` o'zgaruvchilariga bo'lgan havolalar yo'qoladi. Bu esa JavaScript Garbage Collector-ga ushbu o'zgaruvchilar egallab turgan xotirani darhol tozalash imkonini beradi. \`var\` ishlatilganda esa, o'zgaruvchi funksiya oxirigacha xotirada saqlanib qoladi.

### 2. V8 Dvigateli tomonidan optimallashtirish (JIT Compilers)
Zamonaviy JS dvigatellari (V8, JavaScriptCore, SpiderMonkey) \`let\` va \`const\` o'zgaruvchilari orqali yozilgan kodlarni osonroq tahlil qila oladi. \`const\` bilan e'lon qilingan o'zgaruvchilarning qayta o'zgarmasligi dvigatelga kodni interpretatsiya qilishda qo'shimcha tezkor optimallashtirishlar qilishga yordam beradi.

### 3. Memory Leak (Xotira sizishi) oldini olish
Global yoki funktsional doirada ortiqcha o'zgaruvchilarning yoyilib ketishi (Scope pollution) xotira sizishiga olib keladi. Qat'iy blok ko'lamidan foydalanish orqali siz keraksiz ma'lumotlarning global \`window\` yoki uzoq yashovchi funktsiyalar xotirasida saqlanib qolishini oldini olasiz.

---

## 10. 📌 Cheat Sheet

| Xususiyati | \`var\` | \`let\` | \`const\` |
| :--- | :---: | :---: | :---: |
| **Ko'lam (Scope)** | Funktsional yoki Global | Blok ko'lami (\`{}\`) | Blok ko'lami (\`{}\`) |
| **Hoisting** | Ha (qiymati \`undefined\` bo'ladi) | Ha (lekin TDZ da qoladi) | Ha (lekin TDZ da qoladi) |
| **E'londan oldin chaqirish** | Muvaffaqiyatli (\`undefined\`) | \`ReferenceError\` xatoligi | \`ReferenceError\` xatoligi |
| **Qayta e'lon qilish (Re-declaration)**| Muvaffaqiyatli | Sintaktik xato (\`SyntaxError\`)| Sintaktik xato (\`SyntaxError\`)|
| **Qayta qiymat o'zlashtirish** | Muvaffaqiyatli | Muvaffaqiyatli | Taqiqlangan (\`TypeError\`) |
| **Global window obyektiga birikish** | Ha | Yo'q | Yo'q |
`,
  exercises: [
  {
    "id": 1,
    "title": "Tsikl ichida Block Scope",
    "instruction": "Berilgan sonlar massividagi faqat musbat sonlar kvadratlarining yig'indisini hisoblaydigan `sumOfPositiveSquares(numbers)` funksiyasini yozing. Tsikl va uning ichidagi `if` sharti ichida o'zgaruvchilarni e'lon qilishda faqat `let` yoki `const` kalit so'zlaridan foydalaning (umuman `var` kalit so'zini ishlatmang). Har bir musbat son kvadratini alohida block scope ichida `square` o'zgaruvchisiga yuklab, keyin yig'indiga qo'shing.",
    "startingCode": "function sumOfPositiveSquares(numbers) {\n  let total = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    // Kodni shu yerda yozing\n  }\n  return total;\n}",
    "hint": "if (numbers[i] > 0) { const square = numbers[i] * numbers[i]; total += square; } blokidan foydalaning.",
    "test": "if (code.includes('var')) return \"Kodingizda 'var' kalit so'zidan foydalanmang! Block scope ta'sirini ko'rsatish uchun faqat let yoki const ishlating.\";\nconst sandbox = new Function(code + '; return sumOfPositiveSquares;');\nconst fn = sandbox();\nconst res1 = fn([2, -3, 4]);\nconst res2 = fn([-1, -2, -5]);\nconst res3 = fn([1, 2, 3]);\nif (res1 === 20 && res2 === 0 && res3 === 14) return null;\nreturn 'Kalkulyatsiya xato yoki kutilgan natija olinmadi. Musbat sonlar kvadratlarini to\\'g\\'ri hisoblang.';"
  },
  {
    "id": 2,
    "title": "Asinxron Tsikl Muammosi",
    "instruction": "Massivga 3 ta callback funksiyani joylashtirib qaytaruvchi `createDelayedCallbacks()` funksiyasini yozing. Har bir callback funksiya chaqirilganda o'zining tsikldagi indeksini (0, 1, 2) qaytarishi kerak. Tsikl o'zgaruvchisini block scope da saqlab qolish uchun `let` dan to'g'ri foydalaning.",
    "startingCode": "function createDelayedCallbacks() {\n  const callbacks = [];\n  // Tsiklni block scope-dan foydalanib yozing\n  for (let i = 0; i < 3; i++) {\n    callbacks.push(function() {\n      // Kodni shu yerda yozing\n    });\n  }\n  return callbacks;\n}",
    "hint": "Callback funksiya ichida shunchaki `return i;` qiling. Tsikl boshida `let i` yozilgani sababli, har bir callback o'zining shaxsiy block-scoped `i` nusxasini saqlab qoladi.",
    "test": "if (code.includes('var')) return \"Kodingizda var ishlatmang! Har bir iteratsiya uchun alohida block scope yaratish uchun faqat let ishlatilishi shart.\";\nconst sandbox = new Function(code + '; return createDelayedCallbacks;');\nconst fn = sandbox();\nconst cbList = fn();\nif (cbList.length !== 3) return 'Massivda ro\\'ppa-rosa 3 ta callback bo\\'lishi kerak.';\nif (cbList[0]() === 0 && cbList[1]() === 1 && cbList[2]() === 2) return null;\nreturn 'Callbacklar noto\\'g\\'ri indekslarni qaytardi. Block scope muammosini let yordamida hal qiling.';"
  },
  {
    "id": 3,
    "title": "O'zgaruvchini Soya Qilish (Shadowing)",
    "instruction": "Sizga global (yoki tashqi doiradagi) o'zgaruvchi `value = 10` berilgan. Funksiya ichida yangi blok `{}` oching. Ushbu blok ichida `value` o'zgaruvchisini `let` orqali qayta e'lon qilib, unga `20` qiymatini bering va bu qiymatni tashqaridagi `innerValue` o'zgaruvchisiga o'zlashtiring. Blokdan chiqilganda, tashqi `value` qiymati o'zgarmasdan `10`ligicha qolishi kerak.",
    "startingCode": "function testShadowing() {\n  let value = 10;\n  let innerValue;\n  \n  // Kodni shu yerda yozing\n  \n  return [innerValue, value];\n}",
    "hint": "{\n  let value = 20;\n  innerValue = value;\n} ko'rinishidagi blokdan foydalaning.",
    "test": "if (!code.includes('{') || !code.includes('}')) return \"Blokdan (curly braces) foydalanilmagan!\";\nif (code.includes('var')) return \"Kodingizda 'var' ishlatmang!\";\nconst sandbox = new Function(code + '; return testShadowing;');\nconst fn = sandbox();\nconst res = fn();\nif (res[0] === 20 && res[1] === 10) return null;\nreturn \"Natija kutilgandek emas. Blok ichida 'value' o'zgaruvchisini soya qilib (shadowing) uni 20 ga tenglang.\";"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da blok ko'lami (block scope) nima bilan aniqlanadi?",
    "options": [
      "Figurali qavslar `{}` yordamida yaratilgan har qanday blok bilan",
      "Faqat `function` kalit so'zi bilan",
      "Faqat dumaloq qavslar `()` bilan",
      "Maxsus `scope` kalit so'zi bilan"
    ],
    "correctAnswer": 0,
    "explanation": "JavaScript-da blok doirasi figurali qavslar `{}` yordamida belgilanadi. Bloklar `if`, `for`, `while` yoki shunchaki bare block (oddiy bloklar) bo'lishi mumkin."
  },
  {
    "id": 2,
    "question": "Quyidagi o'zgaruvchilardan qaysi biri blok ko'lamiga (block scope) ega?",
    "options": [
      "`let` va `const`",
      "Faqat `var`",
      "`var` va `let`",
      "`var`, `let` va `const`"
    ],
    "correctAnswer": 0,
    "explanation": "ES6 (ES2015) da joriy qilingan `let` va `const` o'zgaruvchilari blok ko'lamiga ega. O'z navbatida `var` funktsional yoki global ko'lamga ega."
  },
  {
    "id": 3,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nif (true) {\n  var a = 5;\n  let b = 10;\n}\nconsole.log(a);\nconsole.log(b);\n```",
    "options": [
      "Avval `5` chiqadi, so'ng `ReferenceError: b is not defined` xatosi yuz beradi",
      "`5` va `10` chiqadi",
      "`ReferenceError: a is not defined` xatosi yuz beradi",
      "`undefined` va `undefined` chiqadi"
    ],
    "correctAnswer": 0,
    "explanation": "`var` blok ko'lamini hisobga olmaydi, shuning uchun `a` o'zgaruvchisiga blok tashqarisidan ham kirish mumkin. `let b` esa faqat `if` bloki ichida mavjud, shuning uchun tashqarida `ReferenceError` xatosi chiqadi."
  },
  {
    "id": 4,
    "question": "Temporal Dead Zone (Vaqtinchalik O'lik Zona - TDZ) nima?",
    "options": [
      "Blok boshlanishidan to o'zgaruvchi (`let`/`const`) e'lon qilingan qatorgacha bo'lgan, o'zgaruvchiga kirish taqiqlangan hudud",
      "Sikl ishlashni to'xtatgan paytdagi vaqt oralig'i",
      "Xotirada foydalanilmaydigan o'zgaruvchilar o'chib ketadigan vaqt",
      "`setTimeout` ishlashini kutish vaqti"
    ],
    "correctAnswer": 0,
    "explanation": "TDZ — bu blok boshidan o'zgaruvchi e'lon qilinadigan satrgacha bo'lgan vaqt oralig'i. Bu hududda `let` yoki `const` o'zgaruvchisidan foydalanish `ReferenceError` xatosini beradi."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\n{\n  let x = 1;\n  {\n    let x = 2;\n    console.log(x);\n  }\n  console.log(x);\n}\n```",
    "options": [
      "`2` va `1`",
      "`1` va `2`",
      "`2` va `2`",
      "`ReferenceError` xatosi chiqadi"
    ],
    "correctAnswer": 0,
    "explanation": "Ichki blokdagi `let x = 2` o'zgaruvchisi tashqi blokdagi `x`ni soya qiladi (shadowing). Ichki blok tugagach, yana tashqi blokdagi `x` (ya'ni 1) ko'rinadi."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda qanday muammo yuz beradi?\n```javascript\nconsole.log(myVar);\nconsole.log(myLet);\nvar myVar = 'A';\nlet myLet = 'B';\n```",
    "options": [
      "Avval `undefined` chiqadi, keyin `ReferenceError` xatosi beradi",
      "Ikkalasida ham `undefined` chiqadi",
      "Ikkalasida ham `ReferenceError` beradi",
      "`'A'` va `'B'` chiqadi"
    ],
    "correctAnswer": 0,
    "explanation": "`var` o'zgaruvchisi hoist qilinib, `undefined` qiymatini oladi. `let` o'zgaruvchisi ham hoist qilinadi, lekin u TDZ da bo'lgani sababli e'londan oldin chaqirilsa `ReferenceError` xatosi chiqadi."
  },
  {
    "id": 7,
    "question": "Nima uchun `for (var i = 0; i < 3; i++)` tsikli ichidagi `setTimeout` callbacklari faqat oxirgi qiymatni chop etadi?",
    "options": [
      "Chunki `var` blok ko'lamiga ega emas va banyan iteratsiyalar bitta umumiy `i` o'zgaruvchisini ulashadi",
      "Chunki `setTimeout` doimo oxirgi elementni tanlaydi",
      "Chunki `i++` operatsiyasi juda sekin ishlaydi",
      "Chunki tsikl faqat 3 marta aylanadi"
    ],
    "correctAnswer": 0,
    "explanation": "`var` blok ko'lamiga ega bo'lmagani uchun butun tsikl davomida faqat bitta `i` o'zgaruvchisi mavjud bo'ladi. Asinxron `setTimeout` ishlaguncha `i` ning qiymati allaqachon 3 ga teng bo'lib bo'ladi. `let` ishlatilganda esa, har bir iteratsiya uchun alohida blok doirasi va shaxsiy `i` o'zgaruvchisi yaratiladi."
  },
  {
    "id": 8,
    "question": "Quyidagi qaysi blok turi o'zgaruvchilar doirasi uchun alohida blok (block scope) hisoblanadi?",
    "options": [
      "`if-else` blocklari, `for`/`while` loop blocklari va bare blocklar `{}`",
      "Faqat funktsiya bloklari",
      "Faqat `switch` bloklari",
      "Faqat class ta'riflari"
    ],
    "correctAnswer": 0,
    "explanation": "Qavslar `{}` yordamida yozilgan barcha `if`, `else`, `for`, `while` bloklari va shunchaki mustaqil (bare) bloklar `let` va `const` uchun yangi blok ko'lamini (block scope) hosil qiladi."
  },
  {
    "id": 9,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst user = { name: \"Ali\" };\n{\n  user.name = \"Vali\";\n}\nconsole.log(user.name);\n```",
    "options": [
      "`\"Vali\"` chiqadi",
      "`\"Ali\"` chiqadi",
      "`TypeError: Assignment to constant variable`",
      "`undefined` chiqadi"
    ],
    "correctAnswer": 0,
    "explanation": "`const` o'zgaruvchining qayta o'zlashtirilishini (re-assignment) cheklaydi, ammo obyektning ichki xususiyatlarini (properties) o'zgartirishga to'sqinlik qilmaydi. Blok ichida uning xususiyati o'zgartirilishi mumkin."
  },
  {
    "id": 10,
    "question": "Global ko'lamda (global scope) `var` va `let` o'rtasidagi farq nima?",
    "options": [
      "`var` global `window` obyektida xususiyat yaratadi, `let` esa yaratmaydi",
      "`let` global doirada ishlamaydi",
      "`var` global doirada xato beradi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "Brauzer muhitida global doirada `var x = 5` deb e'lon qilinsa, u `window.x` ga birikadi. `let y = 10` esa global doirada e'lon qilinsa ham `window.y` ga birikmaydi."
  },
  {
    "id": 11,
    "question": "`try-catch` blokidagi qaysi qism o'zining maxsus blok ko'lamiga ega bo'lib, undagi o'zgaruvchiga tashqaridan kirib bo'lmaydi?",
    "options": [
      "`catch(error)` qismidagi `error` argumenti",
      "`try` bloki ichidagi barcha `var` o'zgaruvchilar",
      "`finally` bloki ichidagi barcha o'zgaruvchilar",
      "Bunday maxsus doira mavjud emas"
    ],
    "correctAnswer": 0,
    "explanation": "`catch(error)` blokidagi `error` parametrining o'zi catch bloki uchun alohida blok doirasini hosil qiladi va faqat o'sha catch bloki ichida mavjud bo'ladi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet x = 10;\n{\n  console.log(x);\n  let x = 20;\n}\n```",
    "options": [
      "`ReferenceError: Cannot access 'x' before initialization`",
      "`10` chiqadi",
      "`undefined` chiqadi",
      "`20` chiqadi"
    ],
    "correctAnswer": 0,
    "explanation": "Blok ichida `let x = 20` e'lon qilingan. Bu blok ichidagi `x` tashqi doiradagi `x`ni yashiradi. Ammo `console.log(x)` bajarilganda, blok ichidagi `x` hali e'lon qilinmagan va u TDZ da joylashgan. Shuning uchun `ReferenceError` xatosi chiqadi."
  }
]

};
