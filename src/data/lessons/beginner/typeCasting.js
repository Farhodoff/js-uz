export const typeCasting = {
  id: "typeCasting",
  title: "Explicit Type Casting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Yaqqol Tip O'tkazish (Explicit Type Casting) nima?
Dasturlashda ma'lumotlar turli xil tiplarga (turlarga) ega bo'ladi (masalan: matn, son, boolean). **Yaqqol tip o'tkazish (Explicit Type Casting)** — bu dasturchi tomonidan kodda maxsus funksiyalar yoki operatorlar yordamida qiymatni bir tipdan ikkinchi tipga ataylab o'tkazishidir.

Buni JavaScript o'zicha mustaqil bajaradigan **yashirin (implicit yoki coercion) o'tish**dan farqlash lozim. Yashirin o'tishda JS dvigateli o'zi taxmin qilib tiplarni o'zgartiradi (masalan, \`"5" + 2\` yozsangiz, JS 2 ni string qilib \`"52"\` qaytaradi). Yaqqol o'tkazishda esa siz: *"Men buni son qilib o'qimoqchiman!"* deb aniq buyruq berasiz (masalan, \`Number("5") + 2\` yozib \`7\` olasiz).

### Real hayotiy analogiya
Tasavvur qiling, siz **valyuta ayirboshlash shoxobchasiga (bankka) bordingiz**:
* **Yaqqol (Explicit) usul:** Siz dollaringizni bank xodimiga berasiz va uni so'mga almashtirib berishni so'raysiz. Siz jarayonni to'liq nazorat qilasiz, kursni bilasiz va natijani aniq son ko'rinishida qabul qilib olasiz (bu \`Number()\` yoki \`parseInt()\` funksiyalariga o'xshaydi).
* **Yashirin (Implicit) usul:** Siz chet eldagi do'konda o'z milliy kartangiz bilan to'lov qilasiz. Terminal o'z-o'zidan orqa fonda valyutani konvertatsiya qilib, pulingizni yechib oladi. Siz konvertatsiya qoidalari va qancha komissiya ketganini to'liq nazorat qila olmaysiz (bu \`"5" - 2\` amali bajarilganda stringning avtomatik songa aylanib ketishiga o'xshaydi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Number, String va Boolean bilan ishlash)
Eng ko'p ishlatiladigan yaqqol o'tkazish funksiyalari:
\`\`\`javascript
// 1. Songa o'tkazish (Number)
const stringVal = "42";
const convertedNum = Number(stringVal); // Yaqqol songa o'tkazish
console.log(convertedNum); // 42
console.log(typeof convertedNum); // "number"

// 2. Matnga o'tkazish (String)
const numVal = 100;
const convertedStr = String(numVal); // Yaqqol stringga o'tkazish
console.log(convertedStr); // "100"
console.log(typeof convertedStr); // "string"

// 3. Mantiqiy tipga o'tkazish (Boolean)
const emptyStr = "";
console.log(Boolean(emptyStr)); // false (falsy qiymat)
const hasText = "Salom";
console.log(Boolean(hasText)); // true (truthy qiymat)
\`\`\`

### 2. Intermediate Example (parseInt va parseFloat yordamida o'lchov birliklarini ajratish)
Foydalanuvchilar kiritgan ma'lumotlar ko'pincha qo'shimcha matnlardan iborat bo'ladi (masalan, CSS dagi \`"20px"\` yoki \`"1.5rem"\`). Ularni faqat son qismini ajratib olish uchun \`parseInt\` va \`parseFloat\` ishlatiladi.
\`\`\`javascript
// parseInt - butun sonlarni ajratib oladi
const width = "150px";
const numericWidth = parseInt(width, 10); // 10 lik sanoq tizimida parse qilish
console.log(numericWidth); // 150

// parseFloat - o'nli kasr sonlarni saqlab qoladi
const price = "19.99 USD";
const numericPrice = parseFloat(price);
console.log(numericPrice); // 19.99

// No-raqam belgi bilan boshlansa NaN qaytadi
const invalid = parseInt("width: 150px", 10);
console.log(invalid); // NaN
\`\`\`

### 3. Advanced Example (Qat'iy va Xavfsiz Tiplarni O'tkazish)
JSON ma'lumotlar bilan ishlashda tiplarni xavfsiz boshqarish:
\`\`\`javascript
const rawInput = {
  age: "28",
  salary: "1500.50$",
  isActive: "true"
};

// Ma'lumotlarni tozalab, mos tiplarga yaqqol o'tkazamiz
const cleanData = {
  age: parseInt(rawInput.age, 10), // 28
  salary: parseFloat(rawInput.salary.replace("$", "")), // 1500.5
  isActive: rawInput.isActive === "true" // true bo'lgan boolean qiymat
};

console.log(cleanData);
// { age: 28, salary: 1500.5, isActive: true }
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
JavaScript — **dinamik tiplangan** til. Bu shuni anglatadiki, o'zgaruvchilar ma'lum bir tipga qat'iy bog'lanmagan va operatsiyalar bajarilayotganda JavaScript o'zicha tiplarni o'zgartirishga harakat qiladi. Bu esa kutilmagan jiddiy xatolarga olib kelishi mumkin.

Masalan:
\`\`\`javascript
const input1 = "10";
const input2 = "20";

// Foydalanuvchi hisoblagichda 10 + 20 = 30 natijasini kutyapti.
// Ammo yashirin o'tish tufayli matnlar birlashib ketadi (Concatenation):
const result = input1 + input2;
console.log(result); // "1020" (Xatolik!)
\`\`\`

Agar biz yaqqol tip o'tkazishdan foydalanganimizda, bu muammo bo'lmasdi:
\`\`\`javascript
const result = Number(input1) + Number(input2);
console.log(result); // 30 (To'g'ri!)
\`\`\`
Yaqqol tip o'tkazish dastur mantiqini aniq, tushunarli qiladi va ma'lumotlar bazasiga noto'g'ri tipli ma'lumotlar yozilishining oldini oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`null\` va \`undefined\` qiymatlarida \`.toString()\` metodini chaqirish
\`toString()\` metodi obyektdan meros olingan bo'lib, \`null\` yoki \`undefined\` da mavjud emas. Shuning uchun u xatolik beradi.
* **Xato (Crash):**
  \`\`\`javascript
  const age = null;
  const strAge = age.toString(); // TypeError: Cannot read properties of null (reading 'toString')
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  const age = null;
  const strAge = String(age); // "null" matnini qaytaradi, xatosiz ishlaydi.
  \`\`\`

### 2. \`parseInt\` da sanoq tizimini (radix) yozmaslik
Agar radix ko'rsatilmasa, eski JS dvigatellarida \`"0"\` bilan boshlangan stringlar 8 lik sanoq tizimida parse qilinishi va noto'g'ri natija berishi mumkin.
* **Xato:**
  \`\`\`javascript
  const num = parseInt("015"); // Eski tizimlarda 13 qaytishi mumkin (8 likda 015 = 13)
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  const num = parseInt("015", 10); // 15 (Har doim 10 likda ekanini aniq ko'rsating)
  \`\`\`

### 3. \`NaN\` qiymatini \`===\` operatori orqali tekshirishga urinish
\`NaN\` (Not-a-Number) o'z-o'ziga ham teng bo'lmagan yagona qiymatdir.
* **Xato:**
  \`\`\`javascript
  const parsed = parseInt("abc", 10); // NaN
  if (parsed === NaN) { ... } // Bu shart hech qachon ishlamaydi!
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  const parsed = parseInt("abc", 10);
  if (Number.isNaN(parsed)) {
    console.log("Xato: bu raqam emas!");
  }
  \`\`\`

### 4. \`"false"\` stringini \`Boolean()\` ga berganda \`false\` qaytishini kutish
Matn ichida nima yozilganidan qat'i nazar, agar matn bo'sh bo'lmasa, \`Boolean\` uni \`true\` deb hisoblaydi.
* **Xato:**
  \`\`\`javascript
  const active = Boolean("false");
  console.log(active); // true (Kutilmagan natija!)
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  const active = "false" === "true"; // false (Taqqoslash orqali to'g'ri mantiq hosil qilinadi)
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`String(x)\` va \`x.toString()\` farqi nimada?
   * **Javob:** \`String(x)\` global funksiya bo'lib, \`null\` va \`undefined\` qiymatlarini ham xatosiz \`"null"\` va \`"undefined"\`ga o'tkazadi. \`x.toString()\` esa metod bo'lib, \`null\` yoki \`undefined\` da chaqirilsa \`TypeError\` beradi.
2. **Savol:** \`Number("123px")\` va \`parseInt("123px", 10)\` nima qaytaradi va nima uchun?
   * **Javob:** \`Number("123px")\` \`NaN\` qaytaradi, chunki u butun stringni sof son sifatida o'qishga harakat qiladi. \`parseInt("123px", 10)\` esa boshidagi raqamli qismni parse qilib, \`123\` qaytaradi.
3. **Savol:** JavaScript-da qiymatni songa o'tkazuvchi eng qisqa yaqqol operator qaysi?
   * **Javob:** Unar plyus (\`+\`) operatori. Masalan: \`+"42"\` qiymati \`42\` soniga aylanadi.
4. **Savol:** \`Boolean("")\` va \`Boolean(" ")\` natijalari nima bo'ladi?
   * **Javob:** \`Boolean("")\` bo'sh string bo'lgani uchun \`false\` (falsy) qaytaradi. \`Boolean(" ")\` esa ichida bo'shliq (probel) belgisi bo'lgani uchun \`true\` (truthy) qaytaradi.

### Middle (5–8)
5. **Savol:** \`parseInt()\` funksiyasida \`radix\` parametri nima va uni yozish nega majburiy?
   * **Javob:** \`radix\` — sanoq tizimi asosini belgilaydi (masalan, 10 lik, 16 lik, 2 lik). Uni yozish eski JS dvigatellarida \`"0"\` yoki \`"0x"\` bilan boshlanuvchi stringlar avtomatik tarzda 8 lik yoki 16 lik tizimda noto'g'ri tahlil qilinishini oldini oladi.
6. **Savol:** \`parseFloat("12.34.56")\` qanday qiymat qaytaradi? Nima uchun?
   * **Javob:** \`12.34\` qaytaradi. Chunki \`parseFloat\` birinchi nuqtani kasr ajratuvchisi sifatida qabul qiladi, lekin ikkinchi nuqtani ko'rgach tahlilni to'xtatadi va ungacha bo'lgan qismini qaytaradi.
7. **Savol:** \`Number(null)\` va \`Number(undefined)\` qiymatlari nima qaytaradi?
   * **Javob:** \`Number(null)\` qiymati \`0\` qaytaradi. \`Number(undefined)\` esa \`NaN\` qaytaradi.
8. **Savol:** Qanday qilib biror o'zgaruvchini \`Boolean()\` funksiyasisiz yaqqol boolean tipiga o'tkazish mumkin?
   * **Javob:** Ikki karra inkor operatori \`!!\` yordamida. Masalan: \`!!"matn"\` natijasi \`true\` bo'ladi.

### Senior (9–12)
9. **Savol:** Nima uchun \`NaN === NaN\` ifodasi \`false\` beradi va buni qanday hal qilish kerak?
   * **Javob:** IEEE 754 standartiga ko'ra, \`NaN\` matematik jihatdan aniqlanmagan qiymat bo'lib, har qanday boshqa aniqlanmagan qiymat bilan teng bo'la olmaydi. Buni tekshirish uchun \`Number.isNaN()\` yoki global \`isNaN()\` ishlatilishi kerak.
10. **Savol:** \`parseInt(0.0000005, 10)\` nima uchun \`5\` qaytaradi?
    * **Javob:** JavaScript juda kichik sonlarni avtomatik ravishda eksponentsial ko'rinishga keltirib oladi: \`5e-7\`. \`parseInt\` esa birinchi argumentni string deb qabul qiladi, ya'ni \`"5e-7"\` ko'rinishida o'qiydi. U ushbu string boshidagi raqamni tahlil qilganda faqat \`5\` sonini topadi va \`5\` qaytaradi.
11. **Savol:** \`Number(object)\` bajarilganda JavaScript obyekti qaysi ichki metodlarni chaqiradi va qanday ketma-ketlikda?
    * **Javob:** Avval obyektdagi \`[Symbol.toPrimitive]("number")\` tekshiriladi. Agar u bo'lmasa, \`valueOf()\` metodi chaqiriladi (agar u ibtidoiy qiymat qaytarsa, shu olinadi). Agar \`valueOf()\` ibtidoiy qaytarmasa, \`toString()\` chaqiriladi. Agar u ham ibtidoiy qiymat qaytarmasa, \`TypeError\` beriladi.
12. **Savol:** Katta hajmdagi ma'lumotlarni parse qilishda \`+str\` va \`parseInt(str, 10)\` o'rtasidagi performance (tezlik) farqini tushuntiring.
    * **Javob:** \`+str\` (yoki \`Number(str)\`) ancha tezroq ishlaydi, chunki u stringni to'g'ridan-to'g'ri songa xaritaydi. \`parseInt(str)\` esa stringni chapdan o'ngga belgilar bo'yicha tahlil (character-by-character scan) qilib chiqadi, bu esa ortiqcha resurs talab etadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida string, boolean, null va undefined qiymatlarini songa o'tkazishning 3 xil asosiy yo'li va ularning natija chegaralari (boundary differences) ko'rsatilgan sxema keltirilgan:

\`\`\`mermaid
graph TD
    Input["Kiruvchi qiymat: '12.5px', true, null, undefined"] --> Routes{O'tish Yo'llari}
    
    Routes -->|"Number(x) yoki +x"| RouteNumber["Number() / Unar +"]
    Routes -->|"parseInt(x, 10)"| RouteInt["parseInt()"]
    Routes -->|"parseFloat(x)"| RouteFloat["parseFloat()"]
    
    %% Number outputs
    RouteNumber --> NumberS1["'12.5px' ➔ NaN (Harf aralashgani uchun)"]
    RouteNumber --> NumberS2["'12.5' ➔ 12.5"]
    RouteNumber --> NumberB1["true ➔ 1 / false ➔ 0"]
    RouteNumber --> NumberN1["null ➔ 0"]
    RouteNumber --> NumberU1["undefined ➔ NaN"]
    
    %% parseInt outputs
    RouteInt --> IntS1["'12.5px' ➔ 12 (Boshidagi butun sonni ajratadi)"]
    RouteInt --> IntS2["'px12' ➔ NaN (No-raqam bilan boshlansa)"]
    RouteInt --> IntB1["true / false ➔ NaN"]
    RouteInt --> IntN1["null / undefined ➔ NaN"]
    
    %% parseFloat outputs
    RouteFloat --> FloatS1["'12.5px' ➔ 12.5 (O'nli kasrni ham o'qiydi)"]
    RouteFloat --> FloatS2["'12.34.56' ➔ 12.34 (Ikkinchi nuqtada to'xtaydi)"]
    RouteFloat --> FloatB1["true / false ➔ NaN"]
    RouteFloat --> FloatN1["null / undefined ➔ NaN"]

    style Input fill:#f9f,stroke:#333,stroke-width:2px
    style RouteNumber fill:#9f9,stroke:#333,stroke-width:2px
    style RouteInt fill:#9cf,stroke:#333,stroke-width:2px
    style RouteFloat fill:#ffc,stroke:#333,stroke-width:2px
\`\`\`

*Sxema tushuntirishi:*
* \`Number()\` va \`+\` faqat **sof sonli** matnlarni va mantiqiy qiymatlarni o'tkazishda ishlaydi. Har qanday qo'shimcha matn (masalan, \`px\`) butun natijani \`NaN\` qiladi.
* \`parseInt()\` va \`parseFloat()\` esa matn ichidagi raqamlarni qidirib topadi. Ular faqat birinchi no-raqamli belgigacha o'qiydi. Agar matn raqam bo'lmagan belgilar bilan boshlansa (masalan \`px12\`), \`NaN\` qaytadi.

---

## 7. 📝 12 ta Mini Test

Mavzuni to'liq o'zlashtirish va o'zingizni tekshirish uchun dars uchun tayyorlangan 12 ta test topshiriqlarini yechib chiqing. Testlar orqali \`NaN\` bilan ishlash, radix sozlamalari, \`parseFloat\` ning nozik jihatlari va boshqa muammolarni amaliy tushunishingiz mumkin.

---

## 8. 🎯 Real Project Case Study

### URL Query parametrlarini xavfsiz tahlil qilish (Query Param Parsing)
Real veb-ilovalarda brauzer URL manzilidan sahifa raqami (\`page\`), sahifadagi elementlar soni (\`limit\`) yoki status (\`active\`) kabi ma'lumotlar olinadi. Brauzer bu parametrlarni har doim **string** ko'rinishida beradi. 

Agarda biz ularni yaqqol tiplarga o'tkazmasdan to'g'ridan-to'g'ri API so'rovda yoki ma'lumotlar bazasida ishlatsak, xatoliklar kelib chiqadi.

\`\`\`javascript
// Brauzer manzilidan olingan xom ma'lumotlar (URLSearchParams)
const rawQueryParams = {
  page: "2",
  limit: "10",
  isActive: "true",
  search: "dasturlash"
};

// API yoki Baza so'rovi uchun xavfsiz tahlil (Parsing) funksiyasi
function parseRequestParams(params) {
  // Sahifa raqami butun son bo'lishi kerak, minimum 1
  let page = parseInt(params.page, 10);
  if (Number.isNaN(page) || page <= 0) {
    page = 1; // Default qiymat
  }

  // Sahifa limiti butun son bo'lishi kerak, odatda 10
  let limit = parseInt(params.limit, 10);
  if (Number.isNaN(limit) || limit <= 0) {
    limit = 10;
  }

  // Faollik statusi faqat boolean true/false bo'lishi kerak
  const isActive = params.isActive === "true";

  // Search matn bo'ladi, agar yo'q bo'lsa bo'sh string
  const search = params.search ? String(params.search).trim() : "";

  return {
    page,
    limit,
    isActive,
    search
  };
}

const cleanedParams = parseRequestParams(rawQueryParams);
console.log(cleanedParams);
// Natija: { page: 2, limit: 10, isActive: true, search: 'dasturlash' }
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Plyus (\`+\`) va \`Number()\` o'rtasidagi farq:** \`+str\` operatori yozilishi qisqa va tezkorroq bo'lsa-da, katta dasturlarda o'qilishi biroz qiyin bo'lishi mumkin. \`Number(str)\` esa funksional ko'rinishda bo'lib, kod o'qilishini yaxshilaydi, ammo ishlash tezligi jihatidan unar plyusga nisbatan mikrosekund darajasida sekinroq bo'lishi mumkin.
* **\`parseInt\` ni og'ir vazifalarda cheklash:** Agar sizda toza sonli string bo'lsa (masalan \`"42"\`), uni butun songa o'tkazish uchun \`parseInt("42", 10)\` emas, balki \`Math.floor(Number("42"))\` yoki \`Math.trunc(+"42")\` ishlatish tavsiya etiladi. \`parseInt\` matn ichidagi belgilarni tekin tekshirib chiqishi sababli qo'shimcha resurs sarflaydi.
* **Radix optimallashtirishi:** \`parseInt\` ishlatganda radix (10) parametrini berish faqatgina xavfsizlik uchun emas, balki dvigatelga avtomatik ravishda sanoq tizimini aniqlash yukini bermaslik orqali kod ishlashini tezlashtiradi.

---

## 10. 📌 Cheat Sheet

| Asl Qiymat | O'tkaziluvchi Tip | Qo'llanilgan Metod | Natija | Izoh |
| :--- | :--- | :--- | :--- | :--- |
| \`"123"\` | **Number** | \`Number("123")\` yoki \`+"123"\` | \`123\` | Sof sonli string muvaffaqiyatli o'tadi. |
| \`"123.45"\` | **Number (Integer)** | \`parseInt("123.45", 10)\` | \`123\` | Kasr qismini tashlab yuboradi. |
| \`"123.45"\` | **Number (Float)** | \`parseFloat("123.45")\` | \`123.45\` | Nuqtani va undan keyingi sonlarni saqlaydi. |
| \`"123px"\` | **Number** | \`Number("123px")\` | \`NaN\` | Son bo'lmagan belgilar borligi uchun xato. |
| \`"123px"\` | **Number (Integer)** | \`parseInt("123px", 10)\` | \`123\` | Matn ichidan boshidagi sonlarni ajratadi. |
| \`true\` / \`false\` | **Number** | \`Number(true)\` / \`Number(false)\` | \`1\` / \`0\` | Boolean qiymatlar mos ravishda 1 va 0 bo'ladi. |
| \`null\` | **Number** | \`Number(null)\` | \`0\` | \`null\` songa aylanganda har doim 0 bo'ladi. |
| \`undefined\` | **Number** | \`Number(undefined)\` | \`NaN\` | \`undefined\` qiymatini son qilib bo'lmaydi. |
| \`null\` / \`undefined\` | **String** | \`String(null)\` / \`String(undefined)\` | \`"null"\` / \`"undefined"\` | Crash bo'lmaydi, matnga o'tadi. |
| \`"false"\` | **Boolean** | \`Boolean("false")\` | \`true\` | Bo'sh bo'lmagan har qanday matn \`true\` beradi. |
| \`""\` | **Boolean** | \`Boolean("")\` | \`false\` | Bo'sh string har doim \`false\` beradi. |
| \`0\` | **Boolean** | \`Boolean(0)\` | \`false\` | Sonli \`0\` falsy qiymatdir. |
`,
  exercises: [
  {
    "id": 1,
    "title": "Stringni songa o'tkazish va tekshirish",
    "instruction": "Foydalanuvchidan yosh qiymati ko'rinishida olinadigan stringni butun songa o'tkazuvchi `parseAge(ageStr)` funksiyasini yozing. Buning uchun `parseInt` funksiyasidan foydalaning va har doim 10 lik sanoq tizimini (radix) ko'rsating. Agar o'tkazish natijasi `NaN` bo'lsa yoki olingan son 0 dan kichik bo'lsa, funksiya `null` qaytarishi kerak. Aks holda o'tkazilgan sonni qaytarsin.",
    "startingCode": "function parseAge(ageStr) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "parseInt(ageStr, 10) yordamida o'tkazing, so'ngra Number.isNaN() va yoshni tekshiring.",
    "test": "const sandbox = new Function(code + '; return parseAge;');\nconst fn = sandbox();\nif (fn('25') !== 25) return 'parseAge(\"25\") 25 qaytarishi kerak';\nif (fn('abc') !== null) return 'parseAge(\"abc\") null qaytarishi kerak';\nif (fn('-5') !== null) return 'parseAge(\"-5\") null qaytarishi kerak';\nif (fn('30px') !== 30) return 'parseAge(\"30px\") 30 qaytarishi kerak';\nif (!code.includes('10')) return 'parseInt funksiyasida radix (10) ko\\'rsatilmagan';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Qiymatlarni boolean tipiga o'tkazish",
    "instruction": "Istalgan qiymatni qabul qilib, uni Boolean tipiga yaqqol o'tkazuvchi `convertToBoolean(val)` funksiyasini yozing. Ammo, maxsus qoida sifatida, agar qiymat string ko'rinishidagi 'false' yoki '0' bo'lsa, funksiya `false` qaytarishi kerak. Boshqa barcha holatlarda standart Boolean conversion qoidalariga amal qiling.",
    "startingCode": "function convertToBoolean(val) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Avval qiymat 'false' yoki '0' stringlariga tengligini tekshiring, keyin Boolean(val) orqali qaytaring.",
    "test": "const sandbox = new Function(code + '; return convertToBoolean;');\nconst fn = sandbox();\nif (fn('false') !== false) return 'convertToBoolean(\"false\") false qaytarishi kerak';\nif (fn('0') !== false) return 'convertToBoolean(\"0\") false qaytarishi kerak';\nif (fn('') !== false) return 'convertToBoolean(\"\") false qaytarishi kerak';\nif (fn(0) !== false) return 'convertToBoolean(0) false qaytarishi kerak';\nif (fn('true') !== true) return 'convertToBoolean(\"true\") true qaytarishi kerak';\nif (fn(123) !== true) return 'convertToBoolean(123) true qaytarishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Moliyaviy qiymatlarni tozalash va parse qilish",
    "instruction": "Valyuta belgilari yoki boshqa matnlar aralashgan stringni qabul qiluvchi `parsePrice(priceStr)` funksiyasini yozing. Funksiya string ichidagi raqam va nuqta bo'lmagan barcha belgilarni o'chirib tashlashi, so'ngra qolgan qismni `parseFloat` orqali songa o'tkazishi kerak. Agar natijada yaroqli son hosil bo'lmasa yoki `NaN` bo'lsa, `0` qaytarilsin. Masalan: '$120.50' -> 120.5, '99.99 USD' -> 99.99, 'USD' -> 0.",
    "startingCode": "function parsePrice(priceStr) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "priceStr.replace(/[^0-9.]/g, '') yordamida stringni tozalang va parseFloat qiling. So'ng isNaN ekanini tekshiring.",
    "test": "const sandbox = new Function(code + '; return parsePrice;');\nconst fn = sandbox();\nif (fn('$120.50') !== 120.5) return 'parsePrice(\"$120.50\") 120.5 qaytarishi kerak';\nif (fn('99.99 USD') !== 99.99) return 'parsePrice(\"99.99 USD\") 99.99 qaytarishi kerak';\nif (fn('USD') !== 0) return 'parsePrice(\"USD\") 0 qaytarishi kerak';\nif (fn('15000') !== 15000) return 'parsePrice(\"15000\") 15000 qaytarishi kerak';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da qiymatni yaqqol (explicit) ravishda string tipiga o'tkazishning qaysi usuli xavfsizroq va `null` hamda `undefined` qiymatlarida xatolik (crash) bermaydi?",
    "options": [
      "value.toString()",
      "String(value)",
      "JSON.stringify(value)",
      "value + \"\""
    ],
    "correctAnswer": 1,
    "explanation": "String(value) funksiyasi null va undefined qiymatlarini ham xatosiz \"null\" va \"undefined\" stringlariga o'tkazadi. value.toString() esa null va undefined qiymatlarida TypeError beradi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod bajarilganda konsolda qanday natija chiqadi?\n```javascript\nconsole.log(Number(\"123px\"));\nconsole.log(parseInt(\"123px\", 10));\n```",
    "options": [
      "123 va 123",
      "NaN va 123",
      "NaN va NaN",
      "123 va NaN"
    ],
    "correctAnswer": 1,
    "explanation": "Number() funksiyasi stringda biron bir raqam bo'lmagan belgi bo'lsa, butunlay NaN qaytaradi. parseInt() esa stringning boshidagi raqamlarni ajratib olib parse qiladi va 123 qaytaradi."
  },
  {
    "id": 3,
    "question": "Unar plyus (`+`) operatori orqali tiplarni o'tkazish haqida qaysi tasdiq to'g'ri?",
    "options": [
      "U faqat parseInt kabi ishlaydi va oxiridagi harflarni tashlab yuboradi",
      "U Number() funksiyasi bilan bir xil qoidalarga ko'ra qiymatni songa o'tkazadi",
      "U har doim sonlarni butun qismigacha yaxlitlab beradi",
      "U faqat musbat sonlarni o'z holicha saqlab, manfiylarini NaN qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Unar plyus (+value) matematik jihatdan Number(value) bilan to'liq bir xil ishlaydi va eng tez/qisqa yaqqol son tipiga o'tkazish usulidir."
  },
  {
    "id": 4,
    "question": "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nBoolean(\"false\")\n```",
    "options": [
      "false",
      "true",
      "NaN",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Bo'sh bo'lmagan har qanday string (shu jumladan \"false\" va \"0\" ham) Boolean() ga uzatilganda true qaytaradi. Faqat bo'sh string \"\" falsy hisoblanadi."
  },
  {
    "id": 5,
    "question": "parseInt() funksiyasining ikkinchi parametri (radix) nima uchun muhim?",
    "options": [
      "U natija sifatida qaytadigan kasr xonalarini belgilaydi",
      "U sanoq tizimini (masalan, 10 lik yoki 16 lik) belgilaydi va eski JS dvigatellarida boshqa sanoq tizimlari avtomatik qo'llanilishi oldini oladi",
      "U faqat o'tkazish xato bo'lganda ishlaydigan default qiymatni beradi",
      "U matn ichidagi raqamlarning maksimal uzunligini belgilaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Radix sanoq tizimini aniqlaydi. Ko'rsatilmaganda, \"0x\" bilan boshlangan stringlar 16 lik, \"0\" bilan boshlanganlar esa eski brauzerlarda 8 lik sanoq tizimida parse bo'lib xato natija berishi mumkin edi. Shuning uchun har doim 10 lik uchun 10 yozish shart."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda qanday qiymat hosil bo'ladi?\n```javascript\nNumber(true) + Number(false)\n```",
    "options": [
      "1",
      "2",
      "NaN",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Number(true) qiymati 1 ga, Number(false) esa 0 ga teng bo'ladi. Ularning yig'indisi esa 1 + 0 = 1 bo'ladi."
  },
  {
    "id": 7,
    "question": "parseFloat(\"12.34.56\") ifodasi qanday natija beradi?",
    "options": [
      "12.34",
      "NaN",
      "12.3456",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "parseFloat() stringni chapdan o'ngga parse qiladi. Birinchi nuqtani kasr nuqtasi deb biladi, ammo ikkinchi nuqtani ko'rganda to'xtaydi va ungacha bo'lgan qismni (12.34) qaytaradi."
  },
  {
    "id": 8,
    "question": "Quyidagi kodlardan qaysi biri yaqqol (explicit) tiplarni o'tkazishga misol bo'la olmaydi?",
    "options": [
      "Number(\"42\")",
      "\"42\" * 1",
      "String(42)",
      "Boolean(1)"
    ],
    "correctAnswer": 1,
    "explanation": "\"42\" * 1 - bu yashirin (implicit yoki coercion) tiplarni o'tkazishdir. Unda JS ko'paytirish operatorini ko'rib, stringni o'zi avtomatik songa o'tkazadi. Qolganlarida maxsus funksiyalar yaqqol yozilgan."
  },
  {
    "id": 9,
    "question": "Quyidagi ifodaning natijasi nima bo'ladi?\n```javascript\nNumber(undefined)\n```",
    "options": [
      "0",
      "NaN",
      "null",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Number(undefined) har doim NaN qaytaradi. Taqqoslash uchun: Number(null) esa 0 qaytaradi."
  },
  {
    "id": 10,
    "question": "parseInt(\"   42   \") kodi qanday ishlaydi?",
    "options": [
      "Boshidagi va oxiridagi bo'shliqlarni inobatga olmasdan 42 sonini qaytaradi",
      "Bo'shliqlar bo'lgani uchun NaN qaytaradi",
      "Bo'shliqlarni ham saqlab \"   42   \" stringini qaytaradi",
      "TypeError xatoligini beradi"
    ],
    "correctAnswer": 0,
    "explanation": "parseInt va parseFloat funksiyalari string boshidagi va oxiridagi bo'shliqlarni avtomatik tarzda tashlab yuboradi va keyin kelgan sonlarni parse qiladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(typeof String(null));\n```",
    "options": [
      "\"object\"",
      "\"null\"",
      "\"string\"",
      "\"undefined\""
    ],
    "correctAnswer": 2,
    "explanation": "String(null) ifodasi \"null\" matnini (string) qaytaradi. Uning tipi (typeof) esa \"string\" bo'ladi."
  },
  {
    "id": 12,
    "question": "parseInt(\"abc\", 10) natijasi NaN ekanligini tekshirish uchun qaysi ifodadan foydalanish kerak?",
    "options": [
      "parseInt(\"abc\", 10) === NaN",
      "isNaN(parseInt(\"abc\", 10))",
      "typeof parseInt(\"abc\", 10) === \"nan\"",
      "parseInt(\"abc\", 10) == null"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da NaN === NaN har doim false qaytaradi. Shuning uchun qiymatning NaN ekanini tekshirish uchun faqat isNaN() yoki Number.isNaN() funksiyasini ishlatish zarur."
  }
]

};
