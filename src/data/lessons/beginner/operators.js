export const operators = {
  id: "operators",
  title: "Operatorlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Operatorlar nima?
JavaScript-da **operatorlar** — bu qiymatlar (operandlar) ustida matematik, solishtirish yoki mantiqiy amallarni bajarishga ko'rsatma beruvchi maxsus belgilar. Masalan, \`+\` operatori ikkita sonni qo'shadi, \`===\` esa ularning tengligini tekshiradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **oshxonada taom tayyorlamoqchisiz**:
* **O'zgaruvchilar (Variables):** Idishlar va ularning ichidagi mahsulotlar (masalan, go'sht, piyoz).
* **Qiymatlar (Values):** Mahsulotlarning o'zi.
* **Operatorlar (Operators):** Oshxona asboblari! 
  * **Matematik operatorlar (\`+\`, \`-\`, \`*\`, \`/\`):** Pichoq (bo'laklash uchun) yoki qirg'ich (birlashgan narsalarni ajratish uchun).
  * **Solishtirish operatorlari (\`===\`, \`>\`, \`<\`):** Tarozilar. Ular mahsulotlarni bir-biri bilan solishtirib, "bu og'irroq", "bu teng" degan xulosani beradi (ya'ni \`true\` yoki \`false\`).
  * **Mantiqiy operatorlar (\`&&\`, \`||\`, \`!\`):** Retsept qoidalari: "Agar kartoshka bo'lsa **VA** sabzi bo'lsa (AND), sho'rva qilamiz", "Agar olma bo'lsa **YOKI** nok bo'lsa (OR), pirog pishiramiz".

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Matematik va Qiymat yuklash operatorlari)
Kundalik matematik hisob-kitoblar va o'zgaruvchi qiymatini o'zgartirish:
\`\`\`javascript
let balance = 1000; // O'zgaruvchiga qiymat yuklash (=)
const salary = 500;

// Qo'shish (+) va ko'paytirish (*)
let total = balance + salary * 1.1; 
console.log(total); // 1550 (chunki ko'paytirish qo'shishdan oldin bajariladi)

// Qoldiqni topish (%) va Darajaga ko'tarish (**)
const isEven = 10 % 2 === 0; // true (qoldiqsiz bo'linadi)
const power = 2 ** 3; // 8 (2 ning 3-darajasi)
\`\`\`

### 2. Intermediate Example (Solishtirish va Mantiqiy operatorlar)
Foydalanuvchining tizimga kirish huquqini tekshirish (Short-circuit baholash bilan):
\`\`\`javascript
const userAge = 20;
const hasLicense = true;
const hasCar = false;

// && (Mantiqiy VA) - barcha shartlar true bo'lishi kerak
const canDrive = userAge >= 18 && hasLicense;
console.log("Hayday oladimi:", canDrive); // true

// || (Mantiqiy YOKI) - kamida bitta shart true bo'lishi yetarli
const canTravel = canDrive || hasCar;
console.log("Sayohat qila oladimi:", canTravel); // true

// ! (Mantiqiy inkor) - qiymatni teskarisiga o'zgartiradi
console.log("Mashinasi yo'qmi:", !hasCar); // true
\`\`\`

### 3. Advanced Example (Nullish Coalescing va Mantiqiy qiymat yuklash)
Default (standart) konfiguratsiyalarni o'rnatish va bitwise (bitli) operatorlar:
\`\`\`javascript
// Obyektdagi sozlamalar
const config = {
  theme: "dark",
  timeout: 0,
  retries: null
};

// ?? operatori faqat null va undefined ni tekshiradi
// 'timeout' 0 bo'lsa ham truthy deb oladi
const fetchTimeout = config.timeout ?? 3000; 
console.log(fetchTimeout); // 0 (agar || ishlatilganda, 3000 qaytardi)

// ||= mantiqiy qiymat yuklash
let defaultName = "";
defaultName ||= "Mehmon"; // defaultName bo'sh (falsy) bo'lgani uchun "Mehmon" yuklanadi
console.log(defaultName); // "Mehmon"

// Bitwise (bitli) operator orqali ruxsatlarni tekshirish (Flag checking)
const READ = 1;   // 0001
const WRITE = 2;  // 0010
let userPermission = READ | WRITE; // 0011 (Ikkala ruxsatni birlashtirish)

const hasWriteAccess = (userPermission & WRITE) === WRITE;
console.log("Yozish huquqi bormi:", hasWriteAccess); // true
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Operator Precedence (Prioriteti) va Associativity (Assotsiativlik)
JavaScript koddagi ifodalarni baholayotganda matematikadagi qoidalarga bo'ysunadi. Qaysi amal birinchi bajarilishi **Precedence (Prioritet)** jadvaliga bog'liq.
Agar ikkita operatorning prioriteti bir xil bo'lsa (masalan, \`-\` va \`+\`), u holda **Associativity (Assotsiativlik)** tartibi qo'llaniladi. Ko'p operatorlar chapdan o'ngga (\`Left-to-Right\`) baholanadi, ammo ba'zilari (masalan, darajaga ko'tarish \`**\` va qiymat yuklash \`=\`) o'ngdan chapga (\`Right-to-Left\`) baholanadi.

### Short-Circuit Evaluation (Qisqa tutashuvli baholash)
Mantiqiy \`&&\` va \`||\` operatorlari barcha ifodalarni to'liq tekshirib o'tirmaydi:
* \`&&\` chap tomondagi qiymat \`false\` bo'lsa, o'ng tomonni **o'qib ham ko'rmaydi** va darhol \`false\` qaytaradi.
* \`||\` chap tomondagi qiymat \`true\` bo'lsa, o'ng tomonni tekshirmay darhol \`true\` qaytaradi.

### Implicit Type Coercion (Avtomatik tip o'zgartirish)
Matematik va taqqoslash operatorlari turli tipdagi ma'lumotlarni avtomatik ravishda moslashtiradi:
* \`+\` operatori matn (string) ishtirok etganda barcha o'zgaruvchilarni matnga o'tkazadi (\`5 + '5' = '55'\`).
* \`-\`, \`*\`, \`/\` operatorlari har doim ma'lumotlarni raqamga aylantirishga harakat qiladi (\`5 - '2' = 3\`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`if\` sharti ichida taqqoslash o'rniga qiymat yuklash
* **Xato:**
  \`\`\`javascript
  let userRole = "guest";
  if (userRole = "admin") { // Xato: '=' ishlatildi, shuning uchun 'admin' yuklandi
    console.log("Xush kelibsiz, Admin!"); // Bu har doim ishlaydi
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  let userRole = "guest";
  if (userRole === "admin") { // To'g'ri taqqoslash
    console.log("Xush kelibsiz, Admin!");
  }
  \`\`\`

### 2. Kuchsiz solishtirish (\`==\`) oqibatida kutilmagan mantiqiy xatolar
* **Xato:**
  \`\`\`javascript
  const input = "";
  if (input == 0) {
    // Bo'sh satr raqamli 0 ga teng deb topiladi, bu xavfli!
    console.log("Qiymat nolga teng"); 
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const input = "";
  if (input === 0) { // Turlar solishtiriladi, string !== number
    console.log("Qiymat nolga teng");
  }
  \`\`\`

### 3. Exponentiation (\`**\`) operatorining o'ngdan chapga assotsiativligini unutish
* **Xato deb o'ylash:**
  \`\`\`javascript
  let result = 2 ** 3 ** 2; 
  // Ko'pchilik buni (2**3)**2 = 8**2 = 64 deb o'ylaydi.
  \`\`\`
* **Aslida:**
  \`\`\`javascript
  let result = 2 ** 3 ** 2; // Bu 2 ** (3 ** 2) = 2 ** 9 = 512 bo'ladi.
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior level
1. **Savol:** JavaScript-da qanday operator turlari mavjud?
   * **Javob:** Arifmetik, solishtirish, mantiqiy, qiymat yuklash (assignment), bitli (bitwise), shartli (ternary), string va maxsus operatorlar (typeof, instanceof, delete, void).
2. **Savol:** \`==\` va \`===\` farqi nimada?
   * **Javob:** \`==\` faqat qiymatni tekshiradi va solishtirishdan oldin turlarni avtomatik o'zgartiradi. \`===\` esa qiymatni ham, ma'lumot turini ham o'zgartirmasdan qat'iy tekshiradi.
3. **Savol:** \`%\` operatori nima qaytaradi?
   * **Javob:** Birinchi sonni ikkinchi songa bo'lgandagi matematik qoldiqni qaytaradi. Masalan, \`13 % 5 = 3\`.
4. **Savol:** Postfix va Prefix inkrement operatorlarining (\`x++\` va \`++x\`) farqi nimada?
   * **Javob:** \`x++\` (postfix) avval o'zgaruvchining joriy qiymatini ifodaga qaytaradi, keyin uni oshiradi. \`++x\` (prefix) esa avval o'zgaruvchini oshiradi, keyin yangi qiymatni ifodaga uzatadi.

### Middle level
5. **Savol:** Short-circuit evaluation qanday ishlaydi va uning foydasi nima?
   * **Javob:** Bu mantiqiy ifoda natijasi aniq bo'lgach, qolgan qismni hisoblamaslikdir. Bu kodning ishlash tezligini oshiradi va xatolar oldini olishda (masalan, obyektdan xossani olishdan oldin obyekt mavjudligini tekshirishda) yordam beradi.
6. **Savol:** \`??\` (Nullish coalescing) operatori \`||\` (Logical OR) dan nimasi bilan farq qiladi?
   * **Javob:** \`||\` operatori har qanday falsy (\`false\`, \`0\`, \`""\`, \`NaN\`, \`null\`, \`undefined\`) qiymatda default qiymatga o'tadi. \`??\` esa faqat \`null\` yoki \`undefined\` bo'lgandagina o'ng tomondagi qiymatni oladi.
7. **Savol:** Quyidagi kod nima chiqaradi va nima uchun? \`console.log(1 + 2 + "3");\` va \`console.log("1" + 2 + 3);\`
   * **Javob:** Birinchisi \`33\` chiqaradi (chunki chapdan o'ngga 1+2=3 bajariladi, keyin u matnli "3" bilan ulanadi). Ikkinchisi \`123\` chiqaradi (chunki birinchi amal matnli bo'lib, keyingi raqamlar ham matn qilib ulanib ketadi).
8. **Savol:** Logical Assignment operatorlari (\`&&=\`, \`||=\`, \`??=\`) qanday vazifani bajaradi?
   * **Javob:** Ular o'zgaruvchining joriy qiymati ma'lum bir mantiqiy shartga mos kelgandagina unga yangi qiymat yuklaydi. Masalan, \`x ||= y\` bu \`x = x || y\` ifodasining qisqa yozilishidir.

### Senior level
9. **Savol:** Operator assotsiativligi (Associativity) nima va u qachon ishlaydi?
   * **Javob:** Prioritetlari teng bo'lgan operatorlar ifodada kelganda, ularning baholanish yo'nalishini (chapdan-o'ngga yoki o'ngdan-chapga) belgilaydi. Masalan, ko'p amallar chapdan o'ngga, lekin \`**\` yoki \`=\` o'ngdan chapga ishlaydi.
10. **Savol:** Bitwise (bitli) operatorlar nima va ularning amaliy qo'llanilishiga misol keltiring.
    * **Javob:** Sonlarni binary (ikkilik) sanoq tizimidagi bitlar (0 va 1) darajasida qayta ishlovchi operatorlar. Loyihalarda ruxsatnomalar tizimini (permissions mask) saqlashda va xotirani maksimal tejashda ishlatiladi.
11. **Savol:** Obyektlarni solishtirishda operatorlar qanday ishlaydi? Masalan, \`[] == ![]\` nima qaytaradi?
    * **Javob:** Obyektlar solishtirilganda ularning qiymatlari emas, xotiradagi havolalari (references) tekshiriladi. \`[] == ![]\` ifodasi \`true\` qaytaradi, chunki \`![]\` boolean \`false\` ga aylanadi. Keyin \`[] == false\` ifodasi esa tiplar majburlanishi natijasida \`0 == 0\` holiga kelib, \`true\` bo'ladi.
12. **Savol:** \`typeof\` operatori qanday ishlaydi? Nima uchun u funksiyalarni \`function\` deb qaytaradi, vaholanki funksiyalar ham obyekt?
    * **Javob:** \`typeof\` o'zgaruvchining JavaScript-dagi eng asosiy turlaridan biriga tegishliligini aniqlaydi. Funksiyalar texnik jihatdan obyekt bo'lsa-da, u chaqiriluvchan (callable object) bo'lgani uchun interfeys qulayligi nuqtai nazaridan unga alohida \`"function"\` tipi ajratilgan.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda operatorlarning ustuvorligi (precedence) va ketma-ket baholanish (associativity) tartibini vizual sxema yordamida o'rganamiz. 

### Operatorlar Ustuvorligi va Baholash Oqimi

Quyidagi diagrammada murakkab matematik va mantiqiy ifodalarning JavaScript dvigateli tomonidan qanday ketma-ketlikda va qaysi qoidalar asosida hisoblanishi ko'rsatilgan:

\`\`\`mermaid
graph TD
    classDef precedence fill:#f9f,stroke:#333,stroke-width:2px;
    classDef associativity fill:#bbf,stroke:#333,stroke-width:2px;
    
    Start["Matematik Ifoda: 5 + 3 * 2 ** 2"] --> Parse{"1. Operatorlarni aniqlash"}
    Parse --> |"+, *, **"| CheckPrecedence{"2. Prioritetlarni solishtirish"}
    
    CheckPrecedence --> |"** (Prioritet: 13)"| EvalExp["2 ** 2 = 4"]:::precedence
    EvalExp --> CheckMul{"3. Keyingi yuqori prioritet"}
    CheckMul --> |"* (Prioritet: 12)"| EvalMul["3 * 4 = 12"]:::precedence
    EvalMul --> CheckAdd{"4. Pastroq prioritet"}
    CheckAdd --> |"+ (Prioritet: 11)"| EvalAdd["5 + 12 = 17"]:::precedence
    
    %% Associativity Path
    Start2["Assotsiativlik (Chapdan O'ngga): 10 - 4 - 2"] --> Parse2{"Bir xil prioritet (- va -)"}
    Parse2 --> |Chapdan O'ngga| EvalLeft["10 - 4 = 6"]:::associativity
    EvalLeft --> EvalRight["6 - 2 = 4"]:::associativity
    
    Start3["Assotsiativlik (O'ngdan Chapga): a = b = 5"] --> Parse3{"Bir xil prioritet (= va =)"}
    Parse3 --> |O'ngdan Chapga| EvalRightSide["b = 5"]:::associativity
    EvalRightSide --> EvalLeftSide["a = (b ning qiymati) ya'ni a = 5"]:::associativity
\`\`\`

> [!TIP]
> Agar kodingiz o'qilishi oson bo'lishini va kutilmagan ustuvorlik xatolaridan holi bo'lishini istasangiz, har doim guruhlash qavslaridan \`()\` foydalaning. Bu nafaqat ifodani birinchi bajarishga majbur qiladi, balki kodni o'quvchi boshqa dasturchilarga ham tushunishni osonlashtiradi.

---

## 7. 📝 12 ta Mini Test

Ushbu mavzu bo'yicha olgan bilimlaringizni sinab ko'rish uchun mo'ljallangan testlar. Test savollari yordamida mantiqiy amallar, avtomatik tip o'zgartirish, prioritetlar va boshqa qiziqarli holatlarni qayta ko'rib chiqing va mustahkamlang.

---

## 8. 🎯 Real Project Case Study

### API Konfiguratsiyasi va Ruxsatlar Tizimi

Katta real loyihalarda operatorlarning short-circuit xususiyati, nullish coalescing va bitwise amallari birlashtirilib dynamic boshqaruv tizimlari yaratiladi. Quyidagi kod loyihadagi foydalanuvchining ma'lumotlarini qabul qilib, uning ruxsatlarini aniqlaydi va default sozlamalarni yuklaydi:

\`\`\`javascript
// 1. Tizimdagi huquqlar (Bitwise flags)
const PERMISSIONS = {
  NONE: 0,       // 0000
  READ: 1,       // 0001
  WRITE: 2,      // 0010
  EXECUTE: 4,    // 0100
  DELETE: 8      // 1000
};

// 2. Foydalanuvchi obyekti
const activeUser = {
  id: 102,
  username: "kamron_dev",
  // 0011 (READ va WRITE huquqlari berilgan)
  permissions: PERMISSIONS.READ | PERMISSIONS.WRITE, 
  settings: {
    theme: "light",
    fontSize: 0, // 0 - amalda falsy lekin to'g'ri qiymat
    maxUploadSize: null
  }
};

// 3. Foydalanuvchi huquqini tekshirish funksiyasi
function checkUserAccess(user, requiredPermission) {
  // Bitwise AND (&) yordamida tekshiramiz
  return (user.permissions & requiredPermission) === requiredPermission;
}

// 4. Sozlamalarni default qiymatlar bilan yuklash
function loadConfig(user) {
  const userSettings = user.settings || {}; // Short-circuit orqali himoya
  
  return {
    // fontSize 0 bo'lsa ham ?? operatori uni saqlab qoladi (|| bo'lsa 14 bo'lardi)
    fontSize: userSettings.fontSize ?? 14,
    
    // maxUploadSize null bo'lgani uchun default 50MB yuklanadi
    maxUploadSize: userSettings.maxUploadSize ?? 50,
    
    // theme bo'sh yoki yo'q bo'lsa default "dark" yuklanadi
    theme: userSettings.theme || "dark"
  };
}

// Sinov natijalari:
console.log("Yozish ruxsati bormi:", checkUserAccess(activeUser, PERMISSIONS.WRITE)); // true
console.log("O'chirish ruxsati bormi:", checkUserAccess(activeUser, PERMISSIONS.DELETE)); // false

const finalConfig = loadConfig(activeUser);
console.log("Yuklangan sozlamalar:", finalConfig);
// { fontSize: 0, maxUploadSize: 50, theme: "light" }
\`\`\`

---

## 9. 🚀 Performance va Optimization

### Bitwise operatorlar orqali mikro-optimallashtirish
Sonning butun qismini ajratib olishda \`Math.floor()\` o'rniga double bitwise NOT \`~~\` yoki bitwise OR \`| 0\` operatorlaridan foydalanish mumkin:
\`\`\`javascript
const num = 45.67;
const integer1 = Math.floor(num); // 45 (Standart)
const integer2 = ~~num;           // 45 (Tezroq ishlaydi, lekin o'qilishi qiyin)
const integer3 = num | 0;         // 45 (Tezroq)
\`\`\`
*Tavsiya:* Bu kabi mikro-optimallashtirishlarni faqat juda katta hajmdagi matematik hisob-kitoblar bajarilayotgan (masalan, o'yinlar yoki Canvas render qilish) joylarda ishlating. Oddiy biznes loyihalarda kodning o'qilishi (readability) muhimroq.

### Short-Circuit tartibini to'g'ri tanlash
Mantiqiy \`&&\` va \`||\` zanjirlarida eng tez baholanadigan va eng katta ehtimol bilan natijani hal qiladigan shartlarni birinchi navbatda yozing:
\`\`\`javascript
// Noto'g'ri (og'ir funksiya birinchi ishlayapti):
if (heavyDatabaseCheck() && isCached) { ... }

// To'g'ri (Cached holati false bo'lsa, og'ir funksiya umuman ishga tushmaydi):
if (isCached && heavyDatabaseCheck()) { ... }
\`\`\`

### Strict operatorlarni afzal ko'rish
Dvigatel \`==\` operatorini ishlatganda turlarni moslashtirish uchun qo'shimcha vaqt va resurs sarflaydi. \`===\` operatori esa turlarni o'zgartirmasligi sababli xotira va CPU resurslarini tejaydi.

---

## 10. 📌 Cheat Sheet

| Operator turi | Belgisi | Prioritet | Assotsiativlik | Qisqa izoh |
| :--- | :--- | :--- | :--- | :--- |
| **Guruhlash** | \`()\` | 19 | Chapdan O'ngga | Qavs ichidagi amallar har doim birinchi bajariladi |
| **A'zolik (Member)** | \`.\` / \`[]\` | 18 | Chapdan O'ngga | Obyekt xossalariga kirish |
| **Postfix Inkrement** | \`x++\` / \`x--\` | 15 | Chapdan O'ngga | Qiymatni ishlatib, keyin oshiradi/kamaytiradi |
| **Prefix Inkrement** | \`++x\` / \`--x\` | 14 | O'ngdan Chapga | Qiymatni oshirib, keyin ifodaga uzatadi |
| **Darajaga ko'tarish**| \`**\` | 13 | O'ngdan Chapga | Matematik darajaga oshirish |
| **Ko'paytirish/Bo'lish**| \`*\` / \`/\` / \`%\` | 12 | Chapdan O'ngga | Matematik ko'paytirish, bo'lish va qoldiq |
| **Qo'shish/Ayrish** | \`+\` / \`-\` | 11 | Chapdan O'ngga | Matematik hisoblar yoki matn ulanishi (\`+\`) |
| **Taqqoslash** | \`<\`, \`<=\`, \`>\`, \`>=\` | 9 | Chapdan O'ngga | Qiymatlar o'rtasida munosabatlarni solishtirish |
| **Tenglik** | \`===\` / \`!==\` | 8 | Chapdan O'ngga | Qat'iy tenglik va teng emaslikni tekshirish |
| **Mantiqiy VA** | \`&&\` | 5 | Chapdan O'ngga | Barcha shartlar true bo'lsa true qaytaradi |
| **Mantiqiy YOKI** | \`||\` | 4 | Chapdan O'ngga | Kamida bitta shart true bo'lsa true qaytaradi |
| **Nullish Coalescing**| \`??\` | 4 | Chapdan O'ngga | Faqat null yoki undefined bo'lganda o'ng tomonga o'tadi |
| **Ternary (Shartli)** | \`? :\` | 3 | O'ngdan Chapga | Qisqa \`if-else\` yozilishi |
| **Qiymat Yuklash** | \`=\`, \`+=\`, \`**=\` | 2 | O'ngdan Chapga | O'zgaruvchilarga yakuniy qiymatlarni saqlash |
`,
  exercises: [
    {
      id: 1,
      title: "Qoldiq operatori",
      instruction: "10 ni 3 ga bo'lgandagi qoldiqni toping va uni rem o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet rem = ",
      hint: "let rem = 10 % 3;",
      test: "if (rem === 1) return null; return 'Qoldiq 1 bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Darajaga ko'tarish",
      instruction: "2 ning 5-darajasini darajaga ko'tarish operatori (**) yordamida hisoblab, power o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet power = ",
      hint: "let power = 2 ** 5;",
      test: "if (power === 32) return null; return 'Natija 32 chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Oddiy tenglik",
      instruction: "5 sonini va '5' stringini oddiy tenglik (==) operatori orqali solishtirib, natijani check o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet check = ",
      hint: "let check = (5 == '5');",
      test: "if (check === true) return null; return 'check o\\'zgaruvchisi true bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Qat'iy tenglik",
      instruction: "5 sonini va '5' stringini qat'iy tenglik (===) operatori orqali solishtirib, natijani strictCheck o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet strictCheck = ",
      hint: "let strictCheck = (5 === '5');",
      test: "if (strictCheck === false) return null; return 'strictCheck o\\'zgaruvchisi false bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Mantiqiy VA",
      instruction: "isAdult va hasTicket shartlarining mantiqiy VA (&&) natijasini canEnter o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let isAdult = true;\nlet hasTicket = true;\n// Bu yerga yozing\nlet canEnter = ",
      hint: "let canEnter = isAdult && hasTicket;",
      test: "if (canEnter === true) return null; return 'canEnter true bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Mantiqiy YOKI",
      instruction: "isWeekend va isHoliday shartlaridan kamida biri true bo'lganda ishlaydigan mantiqiy YOKI (||) amali natijasini freeTime o'zgaruvchisiga saqlang.",
      startingCode: "let isWeekend = true;\nlet isHoliday = false;\n// Bu yerga yozing\nlet freeTime = ",
      hint: "let freeTime = isWeekend || isHoliday;",
      test: "if (freeTime === true) return null; return 'freeTime true bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Mantiqiy inkor",
      instruction: "isRaining qiymatining teskarisini mantiqiy inkor (!) operatori orqali topib, goWalk o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let isRaining = false;\n// Bu yerga yozing\nlet goWalk = ",
      hint: "let goWalk = !isRaining;",
      test: "if (goWalk === true) return null; return 'goWalk true bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Increment",
      instruction: "count o'zgaruvchisini postfix increment (++) operatori yordamida 1 taga oshiring.",
      startingCode: "let count = 5;\n// Bu yerga yozing\n",
      hint: "count++;",
      test: "if (count === 6) return null; return 'count qiymati 6 bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Decrement",
      instruction: "count o'zgaruvchisini postfix decrement (--) operatori yordamida 1 taga kamaytiring.",
      startingCode: "let count = 10;\n// Bu yerga yozing\n",
      hint: "count--;",
      test: "if (count === 9) return null; return 'count qiymati 9 bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Stringlarni birlashtirish",
      instruction: "name1 va name2 stringlarini qo'shish (+) yordamida oralarida bitta bo'sh joy bilan birlashtiring va fullName o'zgaruvchisiga saqlang.",
      startingCode: "let name1 = 'Ali';\nlet name2 = 'Valiyev';\n// Bu yerga yozing\nlet fullName = ",
      hint: "let fullName = name1 + ' ' + name2;",
      test: "if (fullName === 'Ali Valiyev') return null; return 'fullName\\'Ali Valiyev\\' bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Qisqartirilgan qo'shish",
      instruction: "x o'zgaruvchisining qiymatiga qo'shimcha 5 sonini qisqartirilgan (+=) operator yordamida qo'shing.",
      startingCode: "let x = 10;\n// Bu yerga yozing\n",
      hint: "x += 5;",
      test: "if (x === 15) return null; return 'x qiymati 15 bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Qat'iy teng emaslik",
      instruction: "10 soni 20 soniga qat'iy teng emasligini (!==) tekshiring va natijani notEqual o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet notEqual = ",
      hint: "let notEqual = (10 !== 20);",
      test: "if (notEqual === true) return null; return 'notEqual o\\'zgaruvchisi true bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da `==` (loose equality) va `===` (strict equality) operatorlari o'rtasidagi asosiy farq nimada?",
    "options": [
      "`==` faqat qiymatlarni solishtiradi (va kerak bo'lsa tipni o'zgartiradi), `===` esa qiymatni ham, ma'lumot turini (type) ham tekshiradi",
      "`===` faqat obyektlarni solishtirish uchun ishlatiladi, `==` esa faqat oddiy o'zgaruvchilarni solishtiradi",
      "`==` operatori tezroq ishlaydi, `===` esa xavfsiz emas",
      "Ular orasida umuman farq yo'q, ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "`==` solishtirishdan oldin tiplarni bir-biriga moslashtiradi (type coercion). `===` esa tiplarni o'zgartirmaydi, agar tiplar har xil bo'lsa darhol `false` qaytaradi."
  },
  {
    "id": 2,
    "question": "Quyidagi ifodalarning natijasi mos ravishda nima bo'ladi?\n```javascript\nconsole.log('5' + 3);\nconsole.log('5' - 3);\n```",
    "options": [
      "`'53'` (string) va `2` (number)",
      "`8` (number) va `2` (number)",
      "`'53'` (string) va `NaN`",
      "`NaN` va `2` (number)"
    ],
    "correctAnswer": 0,
    "explanation": "`+` operatori string ishtirok etganda matnlarni birlashtiradi (concatenation), shuning uchun `'5' + 3` natijasi `'53'` bo'ladi. `-` operatori esa faqat matematik amal bo'lgani uchun stringni songa aylantiradi va `5 - 3 = 2` ni hisoblaydi."
  },
  {
    "id": 3,
    "question": "Nullish coalescing (`??`) operatori chap tomondagi qiymat qanday bo'lganda o'ng tomondagi qiymatga o'tadi (fallback)?",
    "options": [
      "Faqat qiymat `null` yoki `undefined` bo'lganda",
      "Har qanday falsy (masalan, `0`, `false`, `\"\"`) qiymat bo'lganda",
      "Faqat qiymat `false` bo'lganda",
      "Faqat qiymat bo'sh satr `\"\"` bo'lganda"
    ],
    "correctAnswer": 0,
    "explanation": "`??` operatori mantiqiy `||` operatoridan farqli o'laroq, `0` yoki bo'sh satr `\"\"` kabi falsy qiymatlarni inobatga olmaydi, faqatgina `null` va `undefined` holatlaridagina o'ng tomondagi qiymatni qaytaradi."
  },
  {
    "id": 4,
    "question": "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nconsole.log(true || false && false);\n```",
    "options": [
      "`true`",
      "`false`",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 0,
    "explanation": "Mantiqiy VA (`&&`) operatori mantiqiy YOKI (`||`) operatoriga qaraganda yuqoriroq prioritetga (precedence) ega. Shuning uchun birinchi `false && false` bajarilib `false` chiqadi. So'ng `true || false` bajarilib, yakuniy natija `true` bo'ladi."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilgandan keyin `x` va `y` qiymatlari nima bo'ladi?\n```javascript\nlet x = 5;\nlet y = x++;\n```",
    "options": [
      "`x = 6`, `y = 5`",
      "`x = 5`, `y = 6`",
      "`x = 6`, `y = 6`",
      "`x = 5`, `y = 5`"
    ],
    "correctAnswer": 0,
    "explanation": "Bu yerda postfix inkrement (`x++`) ishlatilgan. Postfix avval o'zgaruvchining joriy qiymatini (`5`) ifodaga qaytaradi (ya'ni `y` ga 5 yuklanadi), so'ngra `x` ning qiymatini 1 taga oshiradi (ya'ni `x` 6 bo'ladi)."
  },
  {
    "id": 6,
    "question": "JavaScript-da quyidagi solishtirish natijasi nima bo'ladi va nima uchun?\n```javascript\nconsole.log([] == false);\n```",
    "options": [
      "`true`, chunki solishtirish paytida massiv bo'sh satrga `\"\"` aylanadi, u esa o'z navbatida 0 bo'ladi, false ham 0 ga aylanadi",
      "`false`, chunki massiv har doim obyekt va u hech qachon false ga teng bo'la olmaydi",
      "`TypeError`, chunki massivni boolean bilan solishtirib bo'lmaydi",
      "`undefined`"
    ],
    "correctAnswer": 0,
    "explanation": "Loose equality (`==`) ishlatilganda, bo'sh massiv `[]` primitive turga (`\"\"`) o'giriladi. Bo'sh satr `\"\"` esa raqamga aylantirilganda `0` bo'ladi. `false` ham raqamga aylantirilganda `0` bo'ladi. `0 == 0` esa `true` natijani beradi."
  },
  {
    "id": 7,
    "question": "Quyidagi mantiqiy ifodaning qiymati nima bo'ladi?\n```javascript\nconsole.log(5 && 'hello' && 0 && true);\n```",
    "options": [
      "`0`",
      "`'hello'`",
      "`false`",
      "`true`"
    ],
    "correctAnswer": 0,
    "explanation": "Mantiqiy `&&` operatori chapdan o'ngga qarab birinchi falsy qiymatni qidiradi va uni qaytaradi. Agar barcha qiymatlar truthy bo'lsa, oxirgisini qaytaradi. Ushbu ifodada birinchi falsy qiymat `0` bo'lgani uchun natija `0` bo'ladi."
  },
  {
    "id": 8,
    "question": "Quyidagi operator qanday qiymat qaytaradi?\n```javascript\nconsole.log(typeof null);\n```",
    "options": [
      "`\"object\"`",
      "`\"null\"`",
      "`\"undefined\"`",
      "`\"value\"`"
    ],
    "correctAnswer": 0,
    "explanation": "JavaScript yaratilgan dastlabki versiyalardan boshlab mavjud bo'lgan xatolik (bug) sababli, `typeof null` har doim `\"object\"` matnini qaytaradi. Bu tarixiy sabablarga ko'ra tuzatilmadi."
  },
  {
    "id": 9,
    "question": "Quyidagi daraja ko'tarish ifodasining natijasi nima bo'ladi?\n```javascript\nconsole.log(2 ** 3 ** 2);\n```",
    "options": [
      "`512`",
      "`64`",
      "`18`",
      "`81`"
    ],
    "correctAnswer": 0,
    "explanation": "Darajaga ko'tarish (`**`) operatori o'ngdan chapga assotsiativlikka (right-to-left associativity) ega. Shuning uchun ifoda `2 ** (3 ** 2)` kabi guruhlanadi, ya'ni `2 ** 9 = 512` bo'ladi."
  },
  {
    "id": 10,
    "question": "Quyidagi operatorlardan qaysi biri eng yuqori prioritetga (operator precedence) ega?",
    "options": [
      "Guruhlash `()` (Grouping)",
      "Ko'paytirish `*` (Multiplicative)",
      "Qo'shish `+` (Additive)",
      "Tenglik `===` (Strict equality)"
    ],
    "correctAnswer": 0,
    "explanation": "Qavslar (guruhlash `()`) JavaScript-da barcha operatorlardan ko'ra yuqori prioritetga ega bo'lib, har qanday ifodani birinchi bo'lib baholashga majbur qiladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilgandan so'ng `x` ning qiymati nima bo'ladi?\n```javascript\nlet x = 10;\nx += 5 * 2;\n```",
    "options": [
      "`20`",
      "`30`",
      "`15`",
      "`10`"
    ],
    "correctAnswer": 0,
    "explanation": "Qiymat yuklash (`+=`) operatorining prioriteti juda past. Shuning uchun birinchi navbatda ko'paytirish (`5 * 2 = 10`) amali bajariladi. So'ngra `x += 10` amali bajarilib, `x` 20 ga aylanadi."
  },
  {
    "id": 12,
    "question": "Quyidagi mantiqiy inkor ifodasi nima qaytaradi?\n```javascript\nconsole.log(!\"hello\");\n```",
    "options": [
      "`false`",
      "`true`",
      "`\"hello\"`",
      "`undefined`"
    ],
    "correctAnswer": 0,
    "explanation": "Bo'sh bo'lmagan matn (`\"hello\"`) har doim truthy qiymat hisoblanadi. Mantiqiy NOT (`!`) operatori esa uni boolean holatiga o'tkazib inkor qiladi, natijada `false` hosil bo'ladi."
  }
]

};
