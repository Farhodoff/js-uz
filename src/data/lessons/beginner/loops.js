export const loops = {
  id: "loops",
  title: "Sikllar: for, while, do-while",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Sikl (Loop) nima?
Dasturlashda ko'pincha bir xil amalni bir necha marta takrorlashga to'g'ri keladi. Masalan, 1 dan 100 gacha sanash, massivdagi barcha elementlarni ekranga chiqarish yoki foydalanuvchi to'g'ri parol kiritmaguncha so'rov yuborish. Bu takrorlanuvchi jarayonlar **sikllar (loops)** orqali amalga oshiriladi.

JavaScript-da asosan uchta klassik sikl turi mavjud:
* **\`for\` (Soni aniq takrorlanish):** Agar siz amal necha marta bajarilishi kerakligini oldindan bilsangiz (masalan, roppa-rosa 10 marta yoki massiv uzunligicha), ushbu sikl eng yaxshi tanlovdir.
* **\`while\` (Shartli takrorlanish):** Takrorlanishlar soni oldindan ma'lum bo'lmasa-da, ma'lum bir shart to'g'ri (\`true\`) bo'lib turgunga qadar ishni davom ettirish kerak bo'lganda ishlatiladi.
* **\`do-while\` (Kamida bir marta ishlaydigan takrorlanish):** Xuddi \`while\` kabi ishlaydi, lekin shartni tekshirishdan oldin kod blokini **kamida bir marta** bajarish kafolatlanadi.

---

### Real hayotiy o'xshatish

Tasavvur qiling, siz **sport zalidasiz va murabbiy sizga mashq topshirdi**:
* **\`for\` sikli (10 marta turnikda tortilish):** Siz 1 dan boshlab sanaysiz, har bir tortilishda sonni 1 taga oshirasiz va 10 ga yetganda to'xtaysiz. Necha marta tortilishingiz boshidanoq aniq belgilangan.
* **\`while\` sikli (Charchamaguningizcha yugurish):** Murabbiy sizga "charchab qolmaguningizcha yuguring" dedi. Har bir aylanadan keyin o'zingizdan so'raysiz: "Charchadimmi?". Agar charchamagan bo'lsangiz (\`charchadim === false\`), yugurishda davom etasiz. Boshida charchagan bo'lsangiz, umuman yugurmasligingiz ham mumkin.
* **\`do-while\` sikli (Taomni tatib ko'rish):** Murabbiy sizga yangi vitaminli ichimlik berdi va "yoqmaguncha iching" dedi. Siz ichimlik yoqadimi yo'qmi bilish uchun **kamida bir marta** tatib ko'rishingiz (xo'plashingiz) shart. Birinchi xo'plamdan keyingina shartni tekshira boshlaysiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (\`for\` sikli - Sonlarni sanash)
Noldan boshlab berilgan songacha bo'lgan raqamlarni konsolga chiqarish:
\`\`\`javascript
const limit = 5;

// for (boshlanish; shart; o'zgarish)
for (let i = 0; i < limit; i++) {
  console.log("Hozirgi son:", i);
}
// Natija:
// Hozirgi son: 0
// Hozirgi son: 1
// Hozirgi son: 2
// Hozirgi son: 3
// Hozirgi son: 4
\`\`\`

### 2. Intermediate Example (\`while\` va \`do-while\` farqi)
Keling, bir xil noto'g'ri shart bilan ikkala siklni ham ishga tushirib ko'ramiz:
\`\`\`javascript
let countWhile = 10;
// while shartni boshida tekshiradi
while (countWhile < 5) {
  console.log("while ichi bajarildi"); // Bu kod umuman ishlamaydi
  countWhile++;
}

let countDo = 10;
// do-while avval kodni bajarib, keyin shartni tekshiradi
do {
  console.log("do-while ichi bajarildi!"); // Bu kod 1 marta ishlaydi
  countDo++;
} while (countDo < 5);

// Natijada konsolga faqat: "do-while ichi bajarildi!" chiqadi.
\`\`\`

### 3. Advanced Example (Sikl ichida break, continue va obyektdan foydalanish)
Massiv ichidagi foydalanuvchilar orasidan faqat "admin" bo'lmagan birinchi 2 ta foydalanuvchini topish:
\`\`\`javascript
const users = [
  { name: "Ali", role: "admin" },
  { name: "Vali", role: "user" },
  { name: "Sardor", role: "user" },
  { name: "Jasur", role: "admin" },
  { name: "Lola", role: "user" }
];

const selectedUsers = [];

for (let i = 0; i < users.length; i++) {
  // Agar foydalanuvchi admin bo'lsa, uni tashlab o'tamiz (continue)
  if (users[i].role === "admin") {
    continue; 
  }

  selectedUsers.push(users[i]);

  // Kerakli miqdordagi odamni yig'gach, siklni butunlay to'xtatamiz (break)
  if (selectedUsers.length === 2) {
    break; 
  }
}

console.log(selectedUsers);
// Natija: [{ name: "Vali", role: "user" }, { name: "Sardor", role: "user" }]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Call Stack va Sikllarni Bajarish mexanizmi
JavaScript dvigateli (V8 kabi) sikllarni qanday bajaradi?
1. **Sinxron Bajarilish:** JavaScript bir oqimli (single-threaded) bo'lgani uchun, sikl boshlanganda u joriy Execution Context-ni va Call Stack-ni band qiladi. Sikl to'liq tugamaguncha undan keyingi qatordagi kodlar bajarilmaydi (ya'ni sikllar bloklovchi xususiyatga ega).
2. **Kompilyator darajasida (Jumps):** Dvigatel darajasida sikl sharti tekshirilgach, assembler tilidagi \`JUMP\` (o'tish) buyrug'i kabi kodning ma'lum bir satriga qaytish yoki shart bajarilmaganda sikldan keyingi satrga sakrash amalga oshiriladi.
3. **\`let\` bilan block scope yaratilishi:** \`for (let i = 0; i < 5; i++)\` siklida \`let\` har bir iteratsiya uchun alohida Leksik Muhit yaratadi. Bu esa sikl ichidagi asinxron funksiyalar har safar \`i\` ning o'z qadamidagi nusxasini xotirada to'g'ri saqlashini ta'minlaydi.

> [!WARNING]
> Agar sikl sharti noto'g'ri yozilsa va u cheksiz davom etsa, Call Stack abadiy band bo'lib qoladi. Event Loop navbatdagi boshqa vazifalarni stack-ga yuklay olmaydi va natijada brauzer tabingiz qotib qoladi (Thread Block).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Cheksiz Sikl (Infinite Loop) - Qadamni yangilashni unutish
Sikl o'zgaruvchisini o'zgartirishni unutish eng ko'p uchraydigan xatodir.
🔴 **YOMON:**
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  // i++ yozilmadi. i doimo 0 ga teng bo'lib qoladi va sikl cheksiz aylanadi.
}
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++; // Har safar qadam 1 taga oshadi
}
\`\`\`

### 2. Off-by-One Xatoligi (Chegaradan chiqib ketish)
Massiv indekslari 0 dan boshlangani sababli, oxirgi indeks har doim \`length - 1\` bo'ladi. \`<\` o'rniga \`<=\` ishlatilsa, massiv chegarasidan chiqib ketiladi.
🔴 **YOMON:**
\`\`\`javascript
const arr = [10, 20, 30];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // Oxirgi iteratsiyada arr[3] ya'ni undefined chiqadi
}
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
const arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // To'g'ri: 10, 20, 30 chiqadi
}
\`\`\`

### 3. Loop ichida \`var\` ishlatilishi va asinxronlik xatosi
\`var\` block scope-ga ega bo'lmagani sababli asinxron hodisalarda kutilmagan natija beradi.
🔴 **YOMON:**
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); 
}
// Konsolga 3 ta "3" chiqadi. Chunki i umumiy o'zgaruvchi.
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); 
}
// Konsolga "0, 1, 2" chiqadi.
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** JavaScript-da qanday sikllar mavjud va ularning asosiy vazifasi nima?
   * **Javob:** \`for\`, \`while\`, \`do-while\`, \`for...in\`, va \`for...of\` sikllari bor. Ularning vazifasi ma'lum bir kod qismini berilgan shart asosida takroriy bajarishdir.
2. **Savol:** \`for\` siklining qavslari ichidagi uchta ifoda nima uchun xizmat qiladi?
   * **Javob:** \`initialization\` (boshlang'ich qiymat o'rnatish), \`condition\` (sikl davom etish sharti) va \`update\` (har bir aylanishdan keyin o'zgaruvchini o'zgartirish).
3. **Savol:** \`break\` va \`continue\` o'rtasidagi farq nimada?
   * **Javob:** \`break\` siklni darhol to'xtatib, undan butunlay chiqib ketadi. \`continue\` esa siklning joriy aylanmasini to'xtatib, kod blokining qolgan qismini tashlab yuboradi va darhol keyingi aylanmaga o'tadi.
4. **Savol:** Nima uchun \`do-while\` sikli kamida bir marta ishlaydi deb aytiladi?
   * **Javob:** Chunki \`do-while\` sintaksisida avval kod bloki bajariladi (\`do\` qismi), so'ngra shart tekshiriladi (\`while\` qismi). Shart boshidanoq noto'g'ri bo'lsa ham, birinchi aylanish allaqachon bajarilgan bo'ladi.

### Middle
5. **Savol:** \`for...in\` va \`for...of\` sikllarining farqini tushuntirib bering.
   * **Javob:** \`for...in\` obyektning kalitlarini (keys) aylanib chiqish uchun ishlatiladi. \`for...of\` esa iterativ obyektlarning (massiv, string) qiymatlarini (values) to'g'ridan-to'g'ri o'qish uchun qo'llaniladi.
6. **Savol:** Cheksiz sikl yuz berganda sahifa nima uchun qotib qoladi?
   * **Javob:** JavaScript single-threaded. Cheksiz sikl Call Stack-ni to'liq egallab oladi, bu esa Event Loop-ga foydalanuvchi harakatlarini bajarishga yo'l qo'ymaydi.
7. **Savol:** Quyidagi kod bajarilganda konsolga nima chiqadi va nima uchun?
   \`\`\`javascript
   let i = 0;
   for (; i < 3 ;) {
     console.log(i++);
   }
   \`\`\`
   * **Javob:** \`0, 1, 2\` ketma-ket chiqadi. \`for\` siklida initialization va update qismlarini qavs ichida yozish majburiy emas. Qiymat sikl ichida oshirib boriladi.
8. **Savol:** Massivlarni aylanib chiqishda an'anaviy \`for\` sikli yaxshimi yoki \`.forEach()\` metodi?
   * **Javob:** \`.forEach()\` o'qilishi oson va xavfsiz. Ammo an'anaviy \`for\` sikli ichida \`break\` yoki \`continue\` ishlatib, aylanishni to'xtatish mumkin, \`.forEach()\` ichida esa bunday qilib bo'lmaydi.

### Senior
9. **Savol:** Labelled statements (belgili ifodalar) nima va ulardan sikllarda qanday foydalaniladi?
   * **Javob:** Bu sikllarga nom berish usuli bo'lib, ichki sikl ichidan tashqi siklni to'xtatish (\`break labelName\`) yoki uni keyingi qadamga o'tkazish (\`continue labelName\`) imkonini beradi.
10. **Savol:** JavaScript dvigateli sikllarni optimallashtirish uchun qanday texnikalardan foydalanadi?
    * **Javob:** Loop Peeling (birinchi iteratsiyani alohida ajratish), Loop Invariant Code Motion (sikl ichidagi o'zgarmas hisob-kitoblarni tashqariga chiqarish) va Loop Unrolling (kichik sikllarni ketma-ket qatorlarga almashtirish).
11. **Savol:** Nima uchun \`for...in\` siklini massivlar uchun ishlatish tavsiya etilmaydi?
    * **Javob:** U indekslarni string sifatida o'qiydi (masalan, "0", "1") va massivning prototipiga qo'shilgan nostandart xususiyatlarni ham aylanib chiqadi, bu esa xatolikka olib kelishi mumkin.
12. **Savol:** Agar asinxron kodlarni ketma-ket bajarish kerak bo'lsa, qaysi sikl yordam beradi?
    * **Javob:** \`for...of\` sikli ichida \`await\` ishlatish mumkin. So'rovlar ketma-ket bajariladi. \`.forEach\` ichida esa \`await\` ishlatsangiz ular parallel bajarilib ketadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Sikllarning ishlash jarayoni va cheksiz sikl xavfi quyidagi diagrammada tasvirlangan:

\`\`\`mermaid
flowchart TD
    subgraph Standard ["Standart Sikl Ishlash Aylanmasi"]
        Start1([Start]) --> Init1[1. Initialization: let i = 0]
        Init1 --> Cond1{2. Condition: i < limit}
        Cond1 -- True --> Block1[3. Execute Code Block]
        Block1 --> Update1[4. Post-Iteration Update: i++]
        Update1 --> Cond1
        Cond1 -- False --> End1([Exit Loop])
    end

    subgraph Infinite ["Cheksiz Sikl (Infinite Loop) Xavfi"]
        Start2([Start]) --> Init2[1. Initialization: let i = 0]
        Init2 --> Cond2{2. Condition: i >= 0}
        Cond2 -- True --> Block2[3. Execute Code Block]
        Block2 --> Update2[4. Update: i++ yoki Yo'q]
        Update2 --> Cond2
        Cond2 -- False --> End2([Hech qachon bajarilmaydi])
    end
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars bo'yicha olgan bilimlaringizni sinash va mustahkamlash uchun 12 ta interaktiv testdan o'ting.

---

## 8. 🎯 Real Project Case Study

### Case Study 1: E-commerce Savatidagi Mahsulotlar Yig'indisini Hisoblash
Katta internet do'konlarda foydalanuvchi savatidagi mahsulotlarning umumiy narxini hisoblash uchun sikllardan foydalaniladi.
\`\`\`javascript
const cart = [
  { name: "Telefon", price: 3000000, quantity: 1, discount: 0.1 },
  { name: "G'ilof", price: 150000, quantity: 2, discount: 0 },
  { name: "Zaryadlovchi", price: 250000, quantity: 1, discount: 0.05 }
];

function calculateTotal(cartItems) {
  let totalSum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const discountedPrice = item.price * (1 - item.discount);
    totalSum += discountedPrice * item.quantity;
  }
  return totalSum;
}

console.log("Jami to'lov:", calculateTotal(cart)); // 3237500 UZS
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Loop Overhead va Cache Optimization
\`\`\`javascript
// Katta massivlarda uzunlikni oldindan keshlash tezroq ishlashi mumkin
for (let i = 0, len = largeArray.length; i < len; i++) { 
  // ...
}
\`\`\`

### 2. Nested Loops (Ichma-ich sikllar) xavfi
Ichma-ich yozilgan sikllar dastur tezligini keskin pasaytiradi, chunki ularning vaqt murakkabligi O(N^2) ga teng bo'ladi. Ularni Hash Map kabi usullar bilan optimallashtirish zarur.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan N gacha yig'indi",
      instruction: "for siklidan foydalanib, 1 dan n gacha bo'lgan barcha butun sonlarning yig'indisini hisoblovchi va qaytaruvchi sumUpTo(n) funksiyasini yozing. n soni ham yig'indiga qo'shilishi kerak.",
      startingCode: "function sumUpTo(n) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Boshlang'ich yig'indi uchun o'zgaruvchi yarating (masalan, let sum = 0). So'ng for (let i = 1; i <= n; i++) orqali har bir sonni sum ga qo'shib boring va yakunda sum ni qaytaring.",
      test: "const sandbox = new Function(code + '; return sumUpTo;');\nconst fn = sandbox();\nif (fn(5) !== 15) return 'sumUpTo(5) funksiyasi 15 qaytarmadi';\nif (fn(1) !== 1) return 'sumUpTo(1) funksiyasi 1 qaytarmadi';\nif (fn(10) !== 55) return 'sumUpTo(10) funksiyasi 55 qaytarmadi';\nif (!code.includes('for')) return 'for siklidan foydalanilmagan';\nreturn null;"
    },
    {
      id: 2,
      title: "Massivdan juft sonlarni ajratish",
      instruction: "while siklidan foydalanib, berilgan sonlar massividan faqat juft sonlarni ajratib olib, yangi massiv ko'rinishida qaytaruvchi getEvens(arr) funksiyasini yozing.",
      startingCode: "function getEvens(arr) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "while (i < arr.length) sharti yordamida elementlarni aylanib chiqing. Har bir elementni juftlikka tekshiring (element % 2 === 0). Sikl oxirida indeksni (i++) oshirishni unutmang.",
      test: "const sandbox = new Function(code + '; return getEvens;');\nconst fn = sandbox();\nconst res = fn([1, 2, 3, 4, 5, 6]);\nif (!Array.isArray(res) || res.join(',') !== '2,4,6') return 'getEvens([1, 2, 3, 4, 5, 6]) [2, 4, 6] qaytarmadi';\nif (fn([1, 3, 5]).length !== 0) return 'Juft sonlar bo\\'lmaganda bo\\'sh massiv qaytarilishi kerak';\nif (!code.includes('while')) return 'while siklidan foydalanilmagan';\nreturn null;"
    },
    {
      id: 3,
      title: "Raqamlarni teskari tartibda birlashtirish",
      instruction: "do-while siklidan foydalanib, berilgan musbat butun sonning raqamlarini teskari tartibda satr ko'rinishida yig'ib qaytaruvchi reverseNumberString(num) funksiyasini yozing. Masalan, 1234 -> '4321'.",
      startingCode: "function reverseNumberString(num) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "do { ... } while (temp > 0) siklidan foydalaning. Har safar temp % 10 orqali oxirgi raqamni oling.",
      test: "const sandbox = new Function(code + '; return reverseNumberString;');\nconst fn = sandbox();\nif (fn(1234) !== '4321') return 'reverseNumberString(1234) \"4321\" qaytarmadi';\nif (fn(5) !== '5') return 'reverseNumberString(5) \"5\" qaytarmadi';\nif (fn(0) !== '0') return 'reverseNumberString(0) \"0\" qaytarmadi';\nif (!code.includes('do') || !code.includes('while')) return 'do-while siklidan foydalanilmagan';\nreturn null;"
    },
    {
      id: 4,
      title: "1 dan N gacha Yig'indi 2",
      instruction: "1 dan berilgan `n` sonigacha bo'lgan butun sonlar yig'indisini hisoblovchi (for sikli) `sumToN(n)` yozing.",
      startingCode: "function sumToN(n) {\n  // Kodni yozing\n}",
      hint: "let sum = 0; yaratib, 1 dan n gacha for bilan aylanib chiqing va sum ga qo'shing.",
      test: "const fn = new Function(code + '; return sumToN;')(); if(fn(5) !== 15) return '1+2+3+4+5=15'; return null;"
    },
    {
      id: 5,
      title: "Juft Sonlarni Sanash",
      instruction: "0 dan berilgan `n` gacha (n ham kiradi) bo'lgan barcha juft sonlar nechtaligini hisoblovchi `countEvens(n)` yozing.",
      startingCode: "function countEvens(n) {\n  // Kodni yozing\n}",
      hint: "i=0 dan boshlab n gacha if(i%2===0) orqali hisoblang.",
      test: "const fn = new Function(code + '; return countEvens;')(); if(fn(10) !== 6) return '0,2,4,6,8,10 jami 6 ta'; return null;"
    },
    {
      id: 6,
      title: "Toq Sonlar Yig'indisi",
      instruction: "Massiv qabul qilib, faqat toq elementlari yig'indisini hisoblaydigan `sumOdds(arr)` yozing (for).",
      startingCode: "function sumOdds(arr) {\n  // Kodni yozing\n}",
      hint: "if (arr[i] % 2 !== 0) sum += arr[i].",
      test: "const fn = new Function(code + '; return sumOdds;')(); if(fn([1,2,3,4,5]) !== 9) return '1+3+5=9'; return null;"
    },
    {
      id: 7,
      title: "Qoldiqli Bo'lish (FizzBuzz sodda)",
      instruction: "`n` son qabul qilib, 1 dan n gacha aylanib barcha sonlarni vergul bilan ajratilgan satrga yig'ing. Agar son 3 ga karrali bo'lsa o'rniga 'X' qo'shing: `fizzBuzzLite(n)`.",
      startingCode: "function fizzBuzzLite(n) {\n  // Kodni yozing\n}",
      hint: "for bilan aylanib, satrga i yoki 'X' qoshing va orasiga vergul qoshing.",
      test: "const fn = new Function(code + '; return fizzBuzzLite;')(); if(fn(4) !== '1,2,X,4') return 'Xato chiqdi'; return null;"
    },
    {
      id: 8,
      title: "Factorial Hisoblash",
      instruction: "Berilgan musbat sonning faktorialini hisoblovchi `factorial(n)` yozing. (Masalan 5! = 120)",
      startingCode: "function factorial(n) {\n  // Kodni yozing\n}",
      hint: "result = 1 deb i ni 1 dan n gacha ko'paytiring.",
      test: "const fn = new Function(code + '; return factorial;')(); if(fn(5) !== 120) return '5! = 120'; if(fn(0) !== 1) return '0! = 1'; return null;"
    },
    {
      id: 9,
      title: "Satr Ichidagi 'a' Harfini Sanash",
      instruction: "Berilgan satr ichida 'a' harfi (kichik 'a') necha marta ishtirok etganini hisoblovchi `countA(str)` yozing. Sikl orqali.",
      startingCode: "function countA(str) {\n  // Kodni yozing\n}",
      hint: "for bilan 0 dan str.length gacha aylanib str[i] ni 'a' bilan solishtiring.",
      test: "const fn = new Function(code + '; return countA;')(); if(fn('banana') !== 3) return '3 marta a bor'; return null;"
    },
    {
      id: 10,
      title: "Eng Kichik Sonni Topish (Sikl)",
      instruction: "Faqat sonlardan iborat massiv beriladi, for orqali aylanib eng kichik sonni topuvchi `findMin(arr)` yozing. (Math.min ishlatmang)",
      startingCode: "function findMin(arr) {\n  // Kodni yozing\n}",
      hint: "let min = arr[0] deb oling va qolganini solishtiring.",
      test: "const fn = new Function(code + '; return findMin;')(); if(fn([4,1,9]) !== 1) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `for` siklining sintaksisida qaysi uchta qism qavs ichida nuqtali vergul (`;`) bilan ajratiladi?",
      options: [
        "initialization; condition; increment/decrement",
        "start, stop, step",
        "condition; check; update",
        "declaration: condition: execution"
      ],
      correctAnswer: 0,
      explanation: "`for` siklining standart sintaksisi `for (initialization; condition; update)` ko'rinishida bo'lib, uning qismlari nuqtali vergul (;) bilan ajratiladi."
    },
    {
      id: 2,
      question: "`while` va `do-while` sikllarining eng asosiy farqi nimada?",
      options: [
        "`while` sikli kamida bir marta bajariladi, `do-while` esa shart noto'g'ri bo'lsa umuman bajarilmaydi",
        "`do-while` sikli har doim kamida bir marta bajariladi, hatto shart boshidanoq noto'g'ri bo'lsa ham. `while` esa birinchi bo'lib shartni tekshiradi",
        "`while` faqat sonlar bilan ishlaydi, `do-while` esa satrlar bilan ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "`do-while` siklida kod bloki shart tekshirilishidan oldin ishga tushadi, shuning uchun shart noto'g'ri bo'lsa ham blok kamida 1 marta ishlaydi."
    },
    {
      id: 3,
      question: "Quyidagi kod bajarilganda `count` o'zgaruvchisining yakuniy qiymati qancha bo'ladi?\n```javascript\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 3) break;\n  count++;\n}\n```",
      options: [
        "3",
        "4",
        "5",
        "0"
      ],
      correctAnswer: 0,
      explanation: "Sikl i = 0, 1, 2 bo'lganda ishlaydi. i = 3 bo'lganda `break` orqali sikldan chiqib ketiladi. Shunda count = 3 bo'lib qoladi."
    },
    {
      id: 4,
      question: "`continue` kalit so'zi siklda qanday vazifani bajaradi?",
      options: [
        "Siklni butunlay to'xtatadi va undan chiqib ketadi",
        "Siklning joriy qadamini (iteratsiyasini) to'xtatib, darhol keyingi qadamga o'tadi",
        "Dasturni to'liq to'xtatib, xatolik qaytaradi",
        "Siklni boshidan qayta boshlaydi"
      ],
      correctAnswer: 1,
      explanation: "`continue` hozirgi iteratsiyadagi qolgan kodlarni tashlab yuborib, siklning navbatdagi iteratsiyasiga o'tadi."
    },
    {
      id: 5,
      question: "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
      options: [
        "3, 3, 3",
        "0, 1, 2",
        "undefined, undefined, undefined",
        "ReferenceError"
      ],
      correctAnswer: 1,
      explanation: "`let` ishlatilgani uchun har bir iteratsiya alohida block scope yaratadi va natija ketma-ket 0, 1, 2 chiqadi."
    },
    {
      id: 6,
      question: "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
      options: [
        "0, 1, 2",
        "3, 3, 3",
        "2, 2, 2",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "`var` block scope-ga ega emas va yagona global o'zgaruvchidir. Sikl tugagach, u 3 ga teng bo'ladi, barcha callbacklar shu bitta qiymatni o'qiydi."
    },
    {
      id: 7,
      question: "Qaysi holatda cheksiz (infinite) sikl yuzaga keladi?",
      options: [
        "Sikl sharti har doim true bo'lsa va undan chiqish uchun break ishlatilmasa",
        "`do-while` siklida shart false bo'lganda",
        "`for` siklida increment yozilmasa, lekin shart o'zgarib borsa",
        "Sikl ichida `continue` ishlatilganda"
      ],
      correctAnswer: 0,
      explanation: "Agar sikl sharti hech qachon false bo'lmasa va break bo'lmasa, sikl to'xtamaydi."
    },
    {
      id: 8,
      question: "Quyidagi kodda `console.log(i)` necha marta bajariladi?\n```javascript\nlet i = 10;\ndo {\n  console.log(i);\n  i++;\n} while (i < 5);\n```",
      options: [
        "0 marta",
        "1 marta",
        "5 marta",
        "Cheksiz marta"
      ],
      correctAnswer: 1,
      explanation: "`do-while` sikli shartni tekshirishdan oldin kod blokini kamida bir marta bajaradi. Keyin 11 < 5 false bo'ladi."
    },
    {
      id: 9,
      question: "`for` siklida barcha uchta qismni ham tashlab ketish mumkinmi (masalan: `for (;;)` )?",
      options: [
        "Yo'q, bu sintaktik xatolikka olib keladi",
        "Ha, lekin bu cheksiz siklni yaratadi va uni to'xtatish uchun ichkarida break bo'lishi kerak",
        "Ha, faqat agar let ishlatilmagan bo'lsa",
        "Faqat brauzerning eski versiyalarida mumkin"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da `for (;;)` cheksiz siklni anglatadi."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet x = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i % 2 === 0) continue;\n  x += i;\n}\nconsole.log(x);\n```",
      options: [
        "4",
        "6",
        "9",
        "10"
      ],
      correctAnswer: 0,
      explanation: "i=1 da x=1, i=3 da x=4. Boshqa juft qiymatlarda continue sabab x ga qo'shilmaydi."
    },
    {
      id: 11,
      question: "JavaScript-dagi obyektdagi kalitlarni (keys) aylanib chiqish uchun qaysi sikl turi ishlatiladi?",
      options: [
        "`for...in` sikli",
        "`for...of` sikli",
        "`while...in` sikli",
        "`do...of` sikli"
      ],
      correctAnswer: 0,
      explanation: "`for...in` sikli obyektning enumerable xususiyatlarini (kalitlarini) aylanib chiqish uchun ishlatiladi."
    },
    {
      id: 12,
      question: "Massiv elementlarining qiymatlarini to'g'ridan-to'g'ri o'qib aylanib chiqish uchun qaysi sikl turi ishlatiladi?",
      options: [
        "`for...in`",
        "`for...of`",
        "`while...in`",
        "`do...while`"
      ],
      correctAnswer: 1,
      explanation: "`for...of` sikli massiv, satr va boshqa iterativ obyektlar elementlarining qiymatlarini (values) aylanish uchun to'g'ri sintaksisdir."
    }
  ]
};
