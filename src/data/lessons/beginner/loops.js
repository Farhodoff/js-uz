export const loops = {
  id: "loops",
  title: "Sikllar: for, while, do-while",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

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
1. **Sinxron Bajarilish:** JavaScript bir oqimli (single-threaded) bo'lgani uchun, sikl boshlanganda u joriy Execution Context-ni (bajarilish muhitini) va Call Stack-ni band qiladi. Sikl to'liq tugamaguncha undan keyingi qatordagi kodlar bajarilmaydi (ya'ni sikllar bloklovchi xususiyatga ega).
2. **Kompilyator darajasida (Jumps):** Dvigatel darajasida sikl sharti tekshirilgach, assembler tilidagi \`JUMP\` (o'tish) buyrug'i kabi kodning ma'lum bir satriga qaytish yoki shart bajarilmaganda sikldan keyingi satrga sakrash amalga oshiriladi.
3. **\`let\` bilan block scope yaratilishi:** \`for (let i = 0; i < 5; i++)\` siklida \`let\` har bir iteratsiya (aylanish) uchun alohida Leksik Muhit (Lexical Environment) yaratadi. Bu esa sikl ichidagi asinxron funksiyalar (masalan, \`setTimeout\` yoki event listener) har safar \`i\` ning o'z qadamidagi nusxasini xotirada to'g'ri saqlab qolishini ta'minlaydi.

> [!WARNING]
> Agar sikl sharti noto'g'ri yozilsa va u cheksiz davom etsa, Call Stack abadiy band bo'lib qoladi. Event Loop navbatdagi boshqa vazifalarni (tugma bosilishi, renderlash, taymerlar) stack-ga yuklay olmaydi va natijada brauzer tabingiz butunlay qotib qoladi (Thread Block).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Cheksiz Sikl (Infinite Loop) - Qadamni yangilashni unutish
Sikl o'zgaruvchisini o'zgartirishni unutish eng ko'p uchraydigan xatodir.
* **Noto'g'ri:**
  \`\`\`javascript
  let i = 0;
  while (i < 5) {
    console.log(i);
    // i++ yozilmadi. i doimo 0 ga teng bo'lib qoladi va sikl cheksiz aylanadi.
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  let i = 0;
  while (i < 5) {
    console.log(i);
    i++; // Har safar qadam 1 taga oshadi
  }
  \`\`\`

### 2. Off-by-One Xatoligi (Chegaradan chiqib ketish)
Massiv indekslari 0 dan boshlangani sababli, oxirgi indeks har doim \`length - 1\` bo'ladi. \`<\` o'rniga \`<=\` ishlatilsa, massiv chegarasidan chiqib ketiladi.
* **Noto'g'ri:**
  \`\`\`javascript
  const arr = [10, 20, 30];
  for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]); // Oxirgi iteratsiyada arr[3] ya'ni \`undefined\` chiqadi
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const arr = [10, 20, 30];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // To'g'ri: 10, 20, 30 chiqadi
  }
  \`\`\`

### 3. Loop ichida \`var\` ishlatilishi va asinxronlik xatosi
\`var\` block scope-ga ega bo'lmagani sababli asinxron hodisalarda kutilmagan natija beradi.
* **Noto'g'ri:**
  \`\`\`javascript
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); 
  }
  // Konsolga 3 ta "3" chiqadi. Chunki i umumiy o'zgaruvchi va u sikl yakunida 3 ga teng bo'lib qolgan.
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); 
  }
  // Konsolga "0, 1, 2" chiqadi, chunki let har bir qadam uchun alohida scope yaratadi.
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** JavaScript-da qanday sikllar mavjud va ularning asosiy vazifasi nima?
   * **Javob:** \`for\`, \`while\`, \`do-while\`, \`for...in\`, va \`for...of\` sikllari bor. Ularning vazifasi ma'lum bir kod qismini berilgan shart asosida takroriy bajarishdir.
2. **Savol:** \`for\` siklining qavslari ichidagi uchta ifoda nima uchun xizmat qiladi?
   * **Javob:** \`initialization\` (boshlang'ich qiymat o'rnatish), \`condition\` (sikl davom etish sharti) va \`update\` (har bir aylanishdan keyin o'zgaruvchini o'zgartirish).
3. **Savol:** \`break\` va \`continue\` o'rtasidagi farq nimada?
   * **Javob:** \`break\` siklni darhol to'xtatib, undan butunlay chiqib ketadi. \`continue\` esa siklning joriy aylanmasini to'xtatib, kod blokining qolgan qismini tashlab yuboradi va darhol keyingi aylanmaga (iteratsiyaga) o'tadi.
4. **Savol:** Nima uchun \`do-while\` sikli kamida bir marta ishlaydi deb aytiladi?
   * **Javob:** Chunki \`do-while\` sintaksisida avval kod bloki bajariladi (\`do\` qismi), so'ngra shart tekshiriladi (\`while\` qismi). Shart boshidanoq noto'g'ri bo'lsa ham, birinchi aylanish allaqachon bajarilgan bo'ladi.

### Middle
5. **Savol:** \`for...in\` va \`for...of\` sikllarining farqini tushuntirib bering.
   * **Javob:** \`for...in\` obyektning kalitlarini (keys / properties) aylanib chiqish uchun ishlatiladi. \`for...of\` esa faqat iterativ (iterable) obyektlarning (massiv, string, Map, Set) qiymatlarini (values) to'g'ridan-to'g'ri o'qish uchun qo'llaniladi.
6. **Savol:** Cheksiz sikl yuz berganda sahifa nima uchun qotib qoladi (respond qilmaydi)?
   * **Javob:** JavaScript single-threaded bo'lib, uning asosi Event Loop-ga tayanadi. Cheksiz sikl Call Stack-ni to'liq egallab oladi, bu esa Event Loop-ga foydalanuvchi harakatlarini (klik, skrol) yoki sahifani qayta chizish (repaint) operatsiyalarini bajarishga yo'l qo'ymaydi.
7. **Savol:** Quyidagi kod bajarilganda konsolga nima chiqadi va nima uchun?
   \`\`\`javascript
   let i = 0;
   for (; i < 3 ;) {
     console.log(i++);
   }
   \`\`\`
   * **Javob:** \`0, 1, 2\` ketma-ket chiqadi. \`for\` siklida initialization va update qismlarini qavs ichida yozish majburiy emas (lekin nuqtali vergullar yozilishi shart). Qiymat sikl ichida oshirib boriladi.
8. **Savol:** Massivlarni aylanib chiqishda an'anaviy \`for\` sikli yaxshimi yoki \`.forEach()\` metodi?
   * **Javob:** \`.forEach()\` metodi o'qilishi osonroq va xavfsizroq (chegaradan chiqib ketish xavfi yo'q). Ammo an'anaviy \`for\` sikli ichida \`break\` yoki \`continue\` ishlatib, aylanishni erta to'xtatish mumkin, \`.forEach()\` ichida esa bunday qilib bo'lmaydi (faqat return qilish mumkin, u continue kabi ishlaydi, break qilishning imkoni yo'q).

### Senior
9. **Savol:** Labelled statements (belgili ifodalar) nima va ulardan sikllarda qanday foydalaniladi?
   * **Javob:** Bu sikllarga nom (label) berish usuli bo'lib, ichma-ich joylashgan sikllarda ichki sikl ichidan tashqi siklni to'xtatish (\`break labelName\`) yoki uni keyingi qadamga o'tkazish (\`continue labelName\`) imkonini beradi.
10. **Savol:** JavaScript dvigateli (masalan, V8) sikllarni optimallashtirish uchun qanday texnikalardan foydalanadi?
    * **Javob:** Dvigatel **Loop Peeling** (birinchi iteratsiyani alohida ajratish), **Loop Invariant Code Motion** (sikl ichidagi o'zgarmas hisob-kitoblarni sikldan tashqariga chiqarish) va **Loop Unrolling** (kichik sikllarni ketma-ket qatorlarga almashtirish orqali sakrashlarni kamaytirish) kabi optimallashtirishlarni bajaradi.
11. **Savol:** Nima uchun \`for...in\` siklini massivlar uchun ishlatish tavsiya etilmaydi?
    * **Javob:** Birinchidan, \`for...in\` indekslarni satr (string) sifatida o'qiydi (masalan, "0", "1"), bu esa matematik amallarda xatolikka olib kelishi mumkin. Ikkinchidan, u massivning prototipiga (prototype chain) qo'shilgan nostandart xususiyatlarni ham aylanib chiqadi, bu esa ortiqcha elementlar chiqishiga sabab bo'ladi.
12. **Savol:** Agar asinxron kodlarni (masalan, API so'rovlarini) ketma-ket bajarish kerak bo'lsa, qaysi sikl yordam beradi?
    * **Javob:** \`for...of\` sikli ichida \`await\` ishlatish mumkin. Ya'ni, \`for (const item of items) { await fetchItem(item); }\` yozilganda, so'rovlar ketma-ket bajariladi. \`.forEach\` ichida esa \`await\` ishlatish kutilgandek ishlamaydi, chunki u barcha callbacklarni parallel va sinxron ishga tushirib yuboradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Sikllar mavzusini amaliy jihatdan mukammal o'zlashtirish uchun topshiriqlar tayyorlangan. Ularni \`/Users/farhod/Desktop/github/js-uz/scratch/loops_exercises.json\` faylida topishingiz va bajarishingiz mumkin.

### Sikllarning ishlash jarayoni (Lifecycle) va cheksiz sikl sxemasi:

Quyidagi diagrammalarda standart sikl aylanish bosqichlari va xavfli cheksiz sikl qanday yuzaga kelishi tasvirlangan:

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

Dars bo'yicha olgan bilimlaringizni sinash va mustahkamlash uchun 12 ta interaktiv test tayyorlandi. Test savollarini yechish uchun \`/Users/farhod/Desktop/github/js-uz/scratch/loops_quizzes.json\` faylini oching.

---

## 8. 🎯 Real Project Case Study

### Case Study 1: E-commerce Savatidagi Mahsulotlar Yig'indisini Hisoblash
Katta internet do'konlarda foydalanuvchi savatidagi mahsulotlarning umumiy narxini hisoblash uchun sikllardan foydalaniladi. Quyida dynamic narxlar va chegirmalarni hisobga olib yig'indini hisoblovchi kod keltirilgan:

\`\`\`javascript
const cart = [
  { name: "Telefon", price: 3000000, quantity: 1, discount: 0.1 }, // 10% chegirma
  { name: "G'ilof", price: 150000, quantity: 2, discount: 0 },
  { name: "Zaryadlovchi", price: 250000, quantity: 1, discount: 0.05 } // 5% chegirma
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

### Case Study 2: API Polling (Doimiy so'rov yuborib holatni tekshirish)
Ba'zida serverda uzoq vaqt talab qiladigan jarayon boshlanadi (masalan, videoni formatini o'zgartirish yoki hisobot tayyorlash). Dastur orqa fonda serverga har 3 soniyada so'rov yuborib, status \`'COMPLETED'\` bo'lguniga qadar kutishi kerak. Bu \`while\` yordamida quyidagicha simulyatsiya qilinadi:

\`\`\`javascript
// Server holatini simulyatsiya qiluvchi funksiya
let attempts = 0;
function checkServerStatus() {
  attempts++;
  console.log(\`Serverga so'rov yuborildi (urinish: \${attempts})...\`);
  return attempts >= 3 ? "COMPLETED" : "PROCESSING";
}

// Polling jarayoni
function startPolling() {
  let status = "PENDING";
  
  // Status 'COMPLETED' bo'lmaguncha sikl davom etadi
  while (status !== "COMPLETED") {
    status = checkServerStatus();
    
    if (status === "COMPLETED") {
      console.log("Jarayon muvaffaqiyatli yakunlandi!");
      break;
    }
    
    // Haqiqiy loyihada bu yerda asinxron kutish (sleep) qo'yiladi
  }
}

startPolling();
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Loop Overhead va Cache Optimization
Eski JavaScript dvigatellarida massiv uzunligini har bir iteratsiyada hisoblash vaqt talab qilardi. Zamonaviy dvigatellar buni avtomatik optimallashtirsa-da, katta hajmdagi massivlar uchun uzunlikni o'zgaruvchiga keshlab olish hali ham yaxshi praktika hisoblanadi:
\`\`\`javascript
// Nisbatan sekinroq (katta massivlarda har iteratsiyada length o'qiladi)
for (let i = 0; i < largeArray.length; i++) { ... }

// Optimallashtirilgan usul (length bir marta o'qib olinadi)
for (let i = 0, len = largeArray.length; i < len; i++) { ... }
\`\`\`

### 2. Nested Loops (Ichma-ich sikllar) xavfi
Ichma-ich yozilgan sikllar dastur tezligini keskin pasaytiradi, chunki ularning vaqt murakkabligi **$O(N^2)$** ga teng bo'ladi. Agar massivda 10 000 ta element bo'lsa, ichma-ich sikl 100 000 000 (yuz million) marta ishlaydi va sahifani butunlay qotiradi. Bunday holatlarni massivlarni obyekt (Hash Map) yoki \`Map\` tuzilmalariga o'tkazish orqali optimallashtirish lozim.

### 3. Early Exit (Erta chiqish)
Sikldan qanchalik erta chiqib ketilsa, CPU resurslari shunchalik tejaladi. Masalan, massivdan biror element qidirilayotganda, u topilishi bilanoq \`break\` orqali sikl to'xtatilishi kerak.

---

## 10. 📌 Cheat Sheet

| Sikl turi | Qachon ishlatiladi | O'ziga xosligi | Oddiy Misol |
| :--- | :--- | :--- | :--- |
| **\`for\`** | Takrorlanishlar soni aniq bo'lganda | Barcha 3 ta qism (init, cond, update) bir qatorda yoziladi | \`for(let i=0; i<5; i++)\` |
| **\`while\`** | Shart to'g'ri bo'lib turguncha takrorlash kerak bo'lsa | Sikl boshlanishidan oldin shart tekshiriladi | \`while(x < 10) { x++ }\` |
| **\`do-while\`** | Kamida 1 marta bajarilishi shart bo'lganda | Shart oxirida tekshiriladi | \`do { x++ } while(x < 10)\` |
| **\`for...of\`** | Massiv yoki satr qiymatlarini o'qish uchun | Qiymatni to'g'ridan-to'g'ri qaytaradi, indeks yo'q | \`for(let val of arr)\` |
| **\`for...in\`** | Obyekt kalitlarini (keys) aylanib chiqishda | Faqat obyekt xususiyatlari nomlarini beradi | \`for(let key in obj)\` |
`,
  exercises: [
    {
      id: 1,
      title: "Takrorlash",
      instruction: "for sikli yordamida 1 dan 5 gacha bo'lgan sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      test: "if (logs.length >= 5 && logs.includes('1') && logs.includes('5')) return null; return '1 dan 5 gacha sonlar chiqishi kerak!';"
    },
    {
      id: 2,
      title: "While sikli",
      instruction: "while sikli yordamida 'count' 3 bo'lguncha uning qiymatini chiqaring.",
      startingCode: "let count = 1;\n// Bu yerga yozing\n",
      hint: "while (count <= 3) { console.log(count); count++; }",
      test: "if (logs.includes('1') && logs.includes('3')) return null; return 'While siklini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "Yig'indi",
      instruction: "1 dan 10 gacha sonlar yig'indisini hisoblang va konsolga chiqaring.",
      startingCode: "let sum = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 10; i++) { sum += i; } console.log(sum);",
      test: "if (logs.includes('55')) return null; return 'Yig\\'indi 55 chiqishi kerak!';"
    },
    {
      id: 4,
      title: "Juft sonlar",
      instruction: "for sikli yordamida 1 dan 10 gacha bo'lgan juft sonlarni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 2; i <= 10; i += 2) { console.log(i); }",
      test: "if (logs.includes('2') && logs.includes('10') && !logs.includes('3')) return null; return 'Faqat juft sonlarni chiqaring';"
    },
    {
      id: 5,
      title: "Teskari tartib",
      instruction: "for sikli yordamida 5 dan 1 gacha teskari tartibda sonlarni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 5; i >= 1; i--) { console.log(i); }",
      test: "if (logs.indexOf('5') < logs.indexOf('1') && logs.includes('5') && logs.includes('1')) return null; return '5 dan 1 gacha kamayib borishini ta\\'minlang';"
    },
    {
      id: 6,
      title: "Massiv elementlarini aylanish",
      instruction: "for...of sikli yordamida 'fruits' massivi elementlarini ketma-ket konsolga chiqaring.",
      startingCode: "const fruits = ['Olma', 'Banan', 'Nok'];\n// Bu yerga yozing\n",
      hint: "for (const fruit of fruits) { console.log(fruit); }",
      test: "if (logs.includes('Olma') && logs.includes('Banan') && logs.includes('Nok')) return null; return 'for...of yordamida mevalarni chiqaring';"
    },
    {
      id: 7,
      title: "Obyekt kalitlarini aylanish",
      instruction: "for...in sikli yordamida 'user' obyektining kalitlarini konsolga chiqaring.",
      startingCode: "const user = { name: 'Ali', age: 20 };\n// Bu yerga yozing\n",
      hint: "for (const key in user) { console.log(key); }",
      test: "if (logs.includes('name') && logs.includes('age')) return null; return 'for...in yordamida kalitlarni chiqaring';"
    },
    {
      id: 8,
      title: "Break operatori",
      instruction: "for sikli yordamida 1 dan 10 gacha sonlarni aylaning, lekin son 5 ga teng bo'lganda break orqali siklni to'xtating va sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 10; i++) { if (i === 5) break; console.log(i); }",
      test: "if (logs.includes('4') && !logs.includes('5')) return null; return '5 ga yetganda break ishlatib siklni to\\'xtating';"
    },
    {
      id: 9,
      title: "Continue operatori",
      instruction: "for sikli yordamida 1 dan 5 gacha sonlarni aylaning, lekin son 3 ga teng bo'lganda continue orqali uni o'tkazib yuboring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { if (i === 3) continue; console.log(i); }",
      test: "if (logs.includes('2') && logs.includes('4') && !logs.includes('3')) return null; return '3 qiymatini continue yordamida o\\'tkazib yuboring';"
    },
    {
      id: 10,
      title: "Do...While sikli",
      instruction: "do...while sikli yordamida 'x' o'zgaruvchisi 1 dan 3 gacha bo'lgan sonlarni konsolga chiqaring.",
      startingCode: "let x = 1;\n// Bu yerga yozing\n",
      hint: "do { console.log(x); x++; } while (x <= 3);",
      test: "if (logs.includes('1') && logs.includes('3') && code.includes('do') && code.includes('while')) return null; return 'do...while siklini to\\'g\\'ri yozing';"
    },
    {
      id: 11,
      title: "Ko'paytirish hisoblash",
      instruction: "Loop yordamida 5 ning kvadratini (5 ta 5 ni qo'shish orqali) hisoblang va natijani konsolga chiqaring.",
      startingCode: "let result = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 0; i < 5; i++) { result += 5; } console.log(result);",
      test: "if (logs.includes('25')) return null; return 'Natija 25 chiqishi kerak';"
    },
    {
      id: 12,
      title: "Massiv sonlarini yig'ish",
      instruction: "for...of yordamida 'numbers' massividagi sonlar yig'indisini hisoblang va 'total' o'zgaruvchisiga saqlang.",
      startingCode: "const numbers = [10, 20, 30];\nlet total = 0;\n// Bu yerga yozing\n",
      hint: "for (const num of numbers) { total += num; }",
      test: "if (code.includes('for') && code.includes('total') && code.includes('of')) return null; return 'for...of yordamida numbers yig\\'indisini total ga qo\\'shing';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da `for` siklining sintaksisida qaysi uchta qism qavs ichida nuqtali vergul (`;`) bilan ajratiladi?",
    "options": [
      "initialization; condition; increment/decrement",
      "start, stop, step",
      "condition; check; update",
      "declaration: condition: execution"
    ],
    "correctAnswer": 0,
    "explanation": "`for` siklining standart sintaksisi `for (initialization; condition; update)` ko'rinishida bo'lib, uning qismlari nuqtali vergul (;) bilan ajratiladi."
  },
  {
    "id": 2,
    "question": "`while` va `do-while` sikllarining eng asosiy farqi nimada?",
    "options": [
      "`while` sikli kamida bir marta bajariladi, `do-while` esa shart noto'g'ri bo'lsa umuman bajarilmaydi",
      "`do-while` sikli har doim kamida bir marta bajariladi, hatto shart boshidanoq noto'g'ri (false) bo'lsa ham. `while` esa birinchi bo'lib shartni tekshiradi",
      "`while` faqat sonlar bilan ishlaydi, `do-while` esa satrlar (string) bilan ishlaydi",
      "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`do-while` siklida kod bloki shart tekshirilishidan oldin ishga tushadi, shuning uchun shart boshidanoq noto'g'ri bo'lsa ham blok kamida bir marta ishlaydi."
  },
  {
    "id": 3,
    "question": "Quyidagi kod bajarilganda `count` o'zgaruvchisining yakuniy qiymati qancha bo'ladi?\n```javascript\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 3) break;\n  count++;\n}\n```",
    "options": [
      "3",
      "4",
      "5",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Sikl i = 0, 1, 2 bo'lganda ishlaydi va count 3 marta oshadi. i = 3 bo'lganda shart bajariladi va `break` orqali sikldan chiqib ketiladi. Shunda count = 3 bo'lib qoladi."
  },
  {
    "id": 4,
    "question": "`continue` kalit so'zi siklda qanday vazifani bajaradi?",
    "options": [
      "Siklni butunlay to'xtatadi va undan chiqib ketadi",
      "Siklning joriy qadamini (iteratsiyasini) to'xtatib, darhol keyingi qadamga o'tadi",
      "Dasturni to'liq to'xtatib, xatolik qaytaradi",
      "Siklni boshidan, ya'ni i = 0 dan qayta boshlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`continue` siklni butunlay to'xtatmaydi, balki hozirgi iteratsiyadagi qolgan kodlarni tashlab yuborib, siklning navbatdagi iteratsiyasiga o'tadi."
  },
  {
    "id": 5,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
    "options": [
      "3, 3, 3",
      "0, 1, 2",
      "undefined, undefined, undefined",
      "ReferenceError"
    ],
    "correctAnswer": 1,
    "explanation": "Siklda `let` ishlatilgani uchun har bir iteratsiya alohida block scope yaratadi va har bir `setTimeout` o'z qadamidagi `i` ning qiymatini yopib (closure qilib) oladi. Shuning uchun natija ketma-ket 0, 1, 2 chiqadi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod ishga tushganda konsolga nima chiqadi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```",
    "options": [
      "0, 1, 2",
      "3, 3, 3",
      "2, 2, 2",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "`var` block scope-ga ega emas va global yoki funksiyaviy doiraga ega bo'ladi. Sikl tugagach, `i` ning qiymati 3 ga teng bo'ladi. Hamma `setTimeout` callbacklari ishga tushganda o'sha bitta `i` o'zgaruvchisiga murojaat qiladi, natijada uchta 3 chiqadi."
  },
  {
    "id": 7,
    "question": "Qaysi holatda cheksiz (infinite) sikl yuzaga keladi?",
    "options": [
      "Sikl sharti har doim true bo'lsa va undan chiqish uchun break/return ishlatilmasa",
      "`do-while` siklida shart false bo'lganda",
      "`for` siklida increment/decrement qismi yozilmasa, lekin shart o'zgarib borsa",
      "Sikl ichida `continue` ishlatilganda"
    ],
    "correctAnswer": 0,
    "explanation": "Agar sikl sharti hech qachon false bo'lmasa va ichida break yoki return bo'lmasa, sikl to'xtamaydi va brauzer yoki Node.js jarayoni qotib qolishiga sabab bo'ladi."
  },
  {
    "id": 8,
    "question": "Quyidagi kodda `console.log(i)` necha marta bajariladi?\n```javascript\nlet i = 10;\ndo {\n  console.log(i);\n  i++;\n} while (i < 5);\n```",
    "options": [
      "0 marta",
      "1 marta",
      "5 marta",
      "Cheksiz marta"
    ],
    "correctAnswer": 1,
    "explanation": "`do-while` sikli shartni tekshirishdan oldin kod blokini kamida bir marta bajaradi. Boshida i = 10, console.log(i) bajariladi va i = 11 bo'ladi. Keyin 11 < 5 tekshiriladi (false) va sikl to'xtaydi. Shuning uchun 1 marta bajariladi."
  },
  {
    "id": 9,
    "question": "`for` siklida barcha uchta qismni ham tashlab ketish mumkinmi (masalan: `for (;;)` )?",
    "options": [
      "Yo'q, bu sintaktik xatolikka olib keladi",
      "Ha, lekin bu cheksiz siklni yaratadi va uni to'xtatish uchun ichkarida break bo'lishi kerak",
      "Ha, faqat agar let ishlatilmagan bo'lsa",
      "Faqat brauzerning eski versiyalarida mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da `for (;;)` sintaksisi sintaktik jihatdan to'g'ri hisoblanadi. U cheksiz siklni anglatadi va agar ichida break yoki return bo'lmasa dastur cheksiz davom etadi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet x = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i % 2 === 0) continue;\n  x += i;\n}\nconsole.log(x);\n```",
    "options": [
      "4",
      "6",
      "9",
      "10"
    ],
    "correctAnswer": 0,
    "explanation": "i = 0 da continue (x = 0). i = 1 da x += 1 (x = 1). i = 2 da continue (x = 1). i = 3 da x += 3 (x = 4). i = 4 da continue (x = 4). Jami x = 4 bo'ladi."
  },
  {
    "id": 11,
    "question": "JavaScript-dagi obyektdagi kalitlarni (keys) aylanib chiqish uchun qaysi sikl turi ishlatiladi?",
    "options": [
      "`for...in` sikli",
      "`for...of` sikli",
      "`while...in` sikli",
      "`do...of` sikli"
    ],
    "correctAnswer": 0,
    "explanation": "`for...in` sikli obyektning barcha enumerable xususiyatlarini (kalitlarini) aylanib chiqish uchun mo'ljallangan. `for...of` esa massiv va shunga o'xshash iterativ obyektlar elementlarining qiymatlarini o'qish uchun ishlatiladi."
  },
  {
    "id": 12,
    "question": "Massiv elementlarining qiymatlarini (indekslarini emas) to'g'ridan-to'g'ri o'qib aylanib chiqish uchun qaysi sikl turi ishlatiladi?",
    "options": [
      "`for...in`",
      "`for...of`",
      "`while...in`",
      "`do...while`"
    ],
    "correctAnswer": 1,
    "explanation": "`for...of` sikli massiv, satr va boshqa iterativ obyektlar elementlarining qiymatlarini (values) aylanib chiqish uchun eng qulay va to'g'ri sintaksis hisoblanadi."
  }
]

};
