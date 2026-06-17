export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "Taqqoslash va Tenglik (== vs ===)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Taqqoslash va Tenglik (== vs ===) nima?
JavaScript-da qiymatlarni solishtirish uchun asosan ikkita operator ishlatiladi:
* **Loose Equality (Yumshoq/Kuchsiz tenglik - \`==\`):** Faqat qiymatlarni solishtiradi. Agar solishtirilayotgan qiymatlarning tiplari (turlari) har xil bo'lsa, ularni avval yashirincha bir xil tipga o'tkazib (type coercion), keyin solishtiradi.
* **Strict Equality (Qat'iy tenglik - \`===\`):** Ham qiymatni, ham ma'lumot turini (tipini) tekshiradi. Hech qanday tiplarni o'zgartirish (coercion) sodir bo'lmaydi.

---

### Real hayotiy o'xshatish
Tasavvur qiling, siz **metroga kirmoqchisiz**:
* **Strict Equality (\`===\`) - bu juda qat'iy nazoratchi:** U sizdan ham turniket chiptasini, ham shaxsingizni tasdiqlovchi hujjatni talab qiladi. Agar sizda chiptaning o'zi bo'lsa-yu (qiymat bor), lekin u qog'oz chipta bo'lsa (boshqa tip), elektron karta o'rniga o'tmaydi. Tiplar mos kelishi shart.
* **Loose Equality (\`==\`) - bu yumshoq turniket:** Unga chiptaning shakli (qog'oz, elektron yoki telefon ekrandagi QR kod) muhim emas. U har qanday shakldagi chiptani avval o'zining skaneri orqali "umumiy kodga" (songa) o'tkazadi va agar u to'g'ri bo'lsa, sizni ichkariga kiritadi.

Misol uchun, \`5 === "5"\` tekshiruvida qat'iy nazoratchi biri Son (Number) va biri Matn (String) bo'lgani uchun yo'l bermaydi (\`false\`). \`5 == "5"\` esa \`"5"\` matnini avval \`5\` soniga aylantirib, keyin teng deb topadi (\`true\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Son va Matn)
Eng ko'p uchraydigan holat — son va matn ko'rinishidagi sonlarni taqqoslash:
\`\`\`javascript
const num = 10;
const str = "10";

console.log(num == str);  // true  -> chunki "10" yashirincha 10 soniga o'tkaziladi
console.log(num === str); // false -> chunki tiplari har xil: Number va String
\`\`\`

### 2. Intermediate Example (Boolean va Null/Undefined)
Mantiqiy qiymatlar va bo'sh qiymatlarni solishtirishda kutilmagan natijalar kelib chiqishi mumkin:
\`\`\`javascript
// Boolean-ni loose equality orqali solishtirish
console.log(1 == true);   // true  -> true songa aylanganda 1 bo'ladi
console.log(0 == false);  // true  -> false songa aylanganda 0 bo'ladi
console.log("" == false); // true  -> ikkala tomon ham songa o'tganda 0 == 0 bo'ladi

// null va undefined
console.log(null == undefined);  // true  -> loose equality qoidasiga ko'ra o'zaro teng
console.log(null === undefined); // false -> tiplari har xil (object va undefined)
\`\`\`

### 3. Advanced Example (Obyektlar va Maxsus Qiymatlar)
Referens turlarni va \`NaN\`ni solishtirish:
\`\`\`javascript
// Obyektlar reference (xotiradagi havola) bo'yicha solishtiriladi
const obj1 = { id: 1 };
const obj2 = { id: 1 };

console.log(obj1 == obj2);  // false -> qiymatlari bir xil bo'lsa ham xotiradagi manzillari farq qiladi
console.log(obj1 === obj2); // false

// NaN (Not-a-Number) solishtiruvi
console.log(NaN == NaN);   // false -> NaN o'z-o'ziga ham teng bo'lmagan yagona qiymat!
console.log(NaN === NaN);  // false

// Object.is() yordamida aniq taqqoslash
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0));   // false (=== operatorida true qaytadi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

JavaScript-da taqqoslashlar ECMAScript standarti tomonidan belgilangan aniq algoritmlar asosida ishlaydi.

### 1. Strict Equality Comparison Algorithm (\`===\`)
Dvigatel \`x === y\` ifodasini quyidagi tartibda bajaradi:
1. Agar \`Type(x)\` va \`Type(y)\` har xil bo'lsa, **\`false\`** qaytar.
2. Agar \`Type(x)\` son (Number) bo'lsa:
   * Agar \`x\` yoki \`y\` qiymati \`NaN\` bo'lsa, **\`false\`** qaytar.
   * Agar \`x\` qiymati \`+0\` va \`y\` qiymati \`-0\` bo'lsa (yoki aksincha), **\`true\`** qaytar.
   * Agar \`x\` va \`y\` bir xil son qiymatiga ega bo'lsa, **\`true\`** qaytar.
3. Agar \`Type(x)\` boshqa primitiv tur (String, Boolean, Symbol, BigInt) bo'lsa va qiymatlar teng bo'lsa, **\`true\`** qaytar.
4. Agar \`x\` va \`y\` bir xil obyektga ishora qilsa (xotiradagi bitta manzil), **\`true\`** qaytar, aks holda **\`false\`**.

### 2. Abstract Equality Comparison Algorithm (\`==\`)
Dvigatel \`x == y\` ifodasini quyidagi ketma-ketlikda bajaradi:
1. Agar \`Type(x)\` va \`Type(y)\` bir xil bo'lsa, ularni strict \`===\` kabi solishtir.
2. Agar \`x\` qiymati \`null\` va \`y\` qiymati \`undefined\` bo'lsa, **\`true\`** qaytar (yoki aksincha).
3. Agar biri son (Number) va biri matn (String) bo'lsa, matnni \`ToNumber()\` yordamida songa o'tkazib qaytadan solishtir.
4. Agar biri mantiqiy qiymat (Boolean) bo'lsa, uni \`ToNumber()\` orqali songa (\`true -> 1\`, \`false -> 0\`) o'tkazib qaytadan solishtir.
5. Agar biri obyekt (Object) va biri primitiv (String, Number, Symbol) bo'lsa, obyektni \`ToPrimitive()\` yordamida oddiy qiymatga o'girib, keyin qaytadan solishtir.
6. Qolgan barcha holatlarda **\`false\`** qaytar.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Boolean qiymatlarni loose equality (\`==\`) bilan tekshirish
Junior dasturchilar ko'pincha truthy qiymatni to'g'ridan-to'g'ri \`true\`ga loose tenglik orqali solishtirishadi.
* **Xato:**
  \`\`\`javascript
  const arr = [1, 2, 3]; // massiv truthy qiymat
  if (arr == true) {
    // Bu kod ishlamaydi!
    // Chunki: arr.toString() -> "1,2,3" -> Number("1,2,3") -> NaN.
    // true -> 1. Oxiri: NaN == 1 -> false bo'ladi.
  }
  \`\`\`
* **To'g'ri (Explicit tekshirish yoki shunchaki shartga qo'yish):**
  \`\`\`javascript
  const arr = [1, 2, 3];
  if (arr) {
    // Bu kod muvaffaqiyatli ishlaydi, chunki if o'zi yashirincha ToBoolean bajaradi.
  }
  \`\`\`

### 2. Obyekt va massivlarni qiymat bo'yicha teng deb o'ylash
* **Xato:**
  \`\`\`javascript
  console.log([] == []); // false -> ikkita alohida massiv xotiraning boshqa manzillarida!
  console.log({} == {}); // false
  \`\`\`
* **To'g'ri:** Obyektlar yoki massivlar tarkibini tekshirish uchun ularning kalitlarini/elementlarini bittalab solishtirish (shallow/deep comparison) yoki JSON formatga o'tkazib tekshirish kerak.

### 3. \`null\` qiymatini 0 soniga loose teng deb hisoblash
* **Xato:**
  \`\`\`javascript
  // null matematik amallarda 0 bo'ladi (+null === 0), lekin == solishtiruvida 0 emas!
  console.log(null == 0); // false
  \`\`\`
* **To'g'ri:** \`null\` faqat \`undefined\` ga teng. Agar nol yoki null ekanini aniqlamoqchi bo'lsangiz, alohida tekshiring:
  \`\`\`javascript
  if (value === null || value === 0) { ... }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** \`==\` va \`===\` operatorlarining farqi nimada?
   * **Javob:** \`==\` solishtirishdan oldin tiplarni yashirincha bir xil turga o'tkazadi (coercion), \`===\` esa hech qanday o'tkazishlarsiz ham tipini, ham qiymatini tekshiradi.
2. **Savol:** \`"5" == 5\` va \`"5" === 5\` ifodalari nima qaytaradi?
   * **Javob:** Birinchisi \`true\` qaytaradi, chunki \`"5"\` stringi songa o'tkaziladi. Ikkinchisi \`false\` qaytaradi, chunki tiplari mos kelmaydi.
3. **Savol:** \`null == undefined\` natijasi nima? \`===\` ishlatilsa-chi?
   * **Javob:** \`null == undefined\` har doim \`true\` (algoritmdagi maxsus qoida). \`null === undefined\` esa \`false\` qaytaradi, chunki biri null (turi object deb hisoblanadi), ikkinchisi undefined turida.
4. **Savol:** Nima uchun \`NaN == NaN\` har doim \`false\` chiqadi?
   * **Javob:** ECMAScript standartiga ko'ra, \`NaN\` (Not-a-Number) har doim o'ziga teng emas deb belgilangan. Uni tekshirish uchun \`Number.isNaN()\` yoki \`Object.is()\` ishlatiladi.

### Middle
5. **Savol:** \`[] == false\` nega \`true\` qaytarishini tushuntirib bering.
   * **Javob:** 1. \`false\` boolean songa o'tadi: \`0\`. 2. \`[]\` obyekti ToPrimitive bo'yicha stringga o'tadi: \`""\`. 3. \`""\` stringi songa o'tadi: \`0\`. 4. Natijada \`0 == 0\` bo'lib, \`true\` chiqadi.
6. **Savol:** \`Object.is()\` va \`===\` operatorlari o'rtasidagi 2 ta asosiy farq qaysi?
   * **Javob:** 1. \`Object.is(NaN, NaN)\` ifodasi \`true\` qaytaradi (\`===\` esa \`false\`). 2. \`Object.is(-0, +0)\` esa \`false\` qaytaradi (\`===\` esa \`true\`).
7. **Savol:** \`[10] == "10"\` nima qaytaradi va nega?
   * **Javob:** \`true\` qaytaradi. Massiv \`[10]\` primitive tipga o'girilganda \`[10].toString()\` chaqiriladi va \`"10"\` stringi hosil bo'ladi. Keyin esa \`"10" == "10"\` taqqoslanib, true chiqadi.
8. **Savol:** Agar dynamic qiymatlarni taqqoslayotgan bo'lsak, qaysi operatorni ishlatgan ma'qul va nega?
   * **Javob:** Har doim \`===\` (strict) tavsiya etiladi. Tiplarni taqqoslashdan oldin o'zimiz to'g'ridan-to'g'ri explicit (aniq) o'zgartirib olishimiz kutilmagan xatolarning oldini oladi.

### Senior
9. **Savol:** Obyekt primitiv bilan loose tenglikda solishtirilganda \`ToPrimitive\` operatsiyasi qaysi metodlarni qidiradi?
   * **Javob:** Dastlab obyektdagi \`[Symbol.toPrimitive]\` metodi chaqiriladi. Agar u yo'q bo'lsa, kontekstga qarab \`valueOf()\` va keyin \`toString()\` metodlari ishga tushadi.
10. **Savol:** \`Object.is()\` ichki ishlash algoritmi (SameValue) qanday ishlaydi?
    * **Javob:** SameValue algoritmi qiymatlarni qat'iy tekshiradi va nollarning belgilarini (+/-) hamda \`NaN\` o'xshashligini hisobga oladi. U matematik jihatdan mutlaq bir xillikni aniqlash uchun mo'ljallangan.
11. **Savol:** \`[] == ![]\` nega \`true\` qaytaradi?
    * **Javob:** 1. Mantiqiy inkor operatori \`![]\` massivni truthy deb hisoblab \`false\`ga aylantiradi. 2. \`[] == false\` qoladi. 3. \`false\` -> \`0\`, \`[]\` -> \`""\` -> \`0\` bo'lib, yakunda \`0 == 0\` ya'ni \`true\` qaytadi.
12. **Savol:** Katta ma'lumotlar bilan ishlashda va yuqori yuklamali sikllarda (loops) \`===\` ishlatish performance-ga qanday ta'sir qiladi?
    * **Javob:** \`===\` operatori \`==\` ga qaraganda tezroq ishlaydi, chunki u tiplarni o'zgartirish algoritmlarini (coercion) chetlab o'tib, srazu xotiradagi qiymat/tipni solishtiradi. Bu ayniqsa millionlab elementli sikllarda sezilishi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi diagramma orqali Loose Equality (\`==\`) va Strict Equality (\`===\`) operatorlarining solishtirish mantiqini va turlar qanday o'zgarishini ko'rishingiz mumkin:

\`\`\`mermaid
graph TD
    Start["Taqqoslash: x == y yoki x === y"] --> CheckOperator{"Qaysi operator?"}
    
    CheckOperator -->|===| StrictType{"Tiplari tengmi?"}
    CheckOperator -->|==| LooseType{"Tiplari tengmi?"}
    
    %% Strict Equality Logic
    StrictType -->|Yo'q| StrictFalse["false"]
    StrictType -->|Ha| StrictNaN{"Ikkalasi ham NaN?"}
    StrictNaN -->|Ha| StrictFalse
    StrictNaN -->|Yo'q| StrictZero{"Biri +0, biri -0?"}
    StrictZero -->|Ha| StrictTrue["true"]
    StrictZero -->|Yo'q| StrictValue{"Qiymatlari tengmi?"}
    StrictValue -->|Ha| StrictTrue
    StrictValue -->|Yo'q| StrictFalse
    
    %% Loose Equality Logic
    LooseType -->|Ha| StrictNaN
    LooseType -->|Yo'q| CoercionRules{"Turlarni o'zgartirish qoidalari"}
    
    CoercionRules -->|null va undefined| NullUndef{"Biri null, biri undefined?"}
    NullUndef -->|Ha| LooseTrue["true"]
    NullUndef -->|Yo'q| StrNum{"Biri String, biri Number?"}
    
    StrNum -->|Ha| ConvertStr["String-ni ToNumber orqali songa o'tkazish"] --> CompareAgain["Qaytadan taqqoslash (x == y)"]
    StrNum -->|Yo'q| HasBool{"Biri Boolean?"}
    
    HasBool -->|Ha| ConvertBool["Boolean-ni ToNumber orqali songa o'tkazish"] --> CompareAgain
    HasBool -->|Yo'q| ObjPrim{"Biri Object, biri Primitive?"}
    
    ObjPrim -->|Ha| ConvertObj["Object-ni ToPrimitive orqali string/songa o'tkazish"] --> CompareAgain
    ObjPrim -->|Yo'q| LooseFalse["false"]
\`\`\`

### Murakkab ifodalarni tahlil qilish:

1. **\`[] == ![]\` ifodasi:**
   * Birinchi bo'lib o'ng tarafdagi \`![]\` mantiqiy operatori bajariladi.
   * Massiv \`[]\` — bu obyekt, demak u truthy (rost). Uni inkor etish \`!true\` bizga \`false\` beradi.
   * Ifoda \`[] == false\` ko'rinishiga keladi.
   * Endi o'ng tarafdagi boolean (\`false\`) songa aylantiriladi: \`Number(false) -> 0\`. Ifoda: \`[] == 0\`.
   * Chap tarafdagi obyekt (\`[]\`) primitiv bilan solishtirilayotgani uchun u primitiv turga o'tkaziladi: \`[].toString() -> ""\`. Ifoda: \`"" == 0\`.
   * String va Number solishtirilayotganda string songa aylantiriladi: \`Number("") -> 0\`. Ifoda: \`0 == 0\`.
   * Natija: \`true\`.

2. **\`null == 0\` ifodasi:**
   * Dvigatel ikkala operandning tiplarini tekshiradi (null va number).
   * Loose equality qoidalariga ko'ra, \`null\` faqat \`undefined\`ga teng bo'la oladi va boshqa hech qanday primitivga (jumladan \`0\` ga ham) o'tkazilmaydi.
   * Natija: \`false\`.

---

## 7. 📝 12 ta Mini Test

Dars oxirida berilgan alohida test topshiriqlarini bajaring. Unda siz \`==\` va \`===\` operatorlari bilan bog'liq eng qiyin mantiqiy testlarni, shuningdek \`Object.is()\` va referenslarni taqqoslashga oid masalalarni yechib, bilimingizni sinab olasiz.

---

## 8. 🎯 Real Project Case Study

### Status va API-dan kelayotgan qiymatlarni tekshirishdagi xatolik

Katta elektron tijorat (E-commerce) loyihasida buyurtma holatini tekshirish funksiyasi yozilgan edi. 

* **Muammoli kod:**
  \`\`\`javascript
  // API dan olingan buyurtma ma'lumotlari
  const orderDetails = {
    id: 9845,
    status: "0" // 0 - Bekor qilingan (API dan string formatda kelgan)
  };
  
  // Konfiguratsiyadagi status kodlari
  const STATUS_CANCELLED = 0; // son formatida
  
  // Noto'g'ri mantiqiy solishtiruv (Strict ishlatilganda):
  if (orderDetails.status === STATUS_CANCELLED) {
    console.log("Buyurtma bekor qilingan."); // Bu kod hech qachon ishlamaydi!
  }
  \`\`\`
  **Natija:** Foydalanuvchilar o'zlarining bekor qilingan buyurtmalarini hali ham faol deb ko'rishdi, chunki \`"0" === 0\` har doim \`false\` beradi.

* **Junior yechimi (Loose equality orqali - Xavfli):**
  \`\`\`javascript
  if (orderDetails.status == STATUS_CANCELLED) {
    // Ishlaydi, lekin kelgusida boshqa tiplar bilan (masalan null/undefined) kutilmagan buglarni keltirib chiqarishi mumkin.
  }
  \`\`\`

* **Production-grade (To'g'ri va xavfsiz) yechim:**
  Taqqoslashdan oldin qiymatni aniq (explicit) tarzda songa o'girib, so'ngra qat'iy \`===\` operatori orqali solishtirish lozim:
  \`\`\`javascript
  // Qiymatni songa o'tkazib olish
  const currentStatus = Number(orderDetails.status);
  
  if (currentStatus === STATUS_CANCELLED) {
    console.log("Buyurtma muvaffaqiyatli bekor qilindi.");
  }
  \`\`\`

---

## 9. 🚀 Performance va Optimization

1. **Orqadagi hisob-kitoblar (Engine overhead):**
   \`==\` operatori ishlatilganda, agar tiplar har xil bo'lsa, brauzer JavaScript dvigateli (masalan, V8) qo'shimcha conversion funksiyalarini chaqiradi. \`===\` esa srazu tiplar har xilligini ko'rib, casting operatsiyalarini bajarmasdan srazu \`false\` qaytaradi. Bu esa xotirani tejaydi va tezroq ishlaydi.
   
2. **JIT (Just-In-Time) Compiler optimizatsiyasi:**
   Zamonaviy JS compilerlar ma'lumotlar turini oldindan taxmin qiladi. Agar siz qat'iy \`===\` operatori va bir xil tiplarni ishlatsangiz, compiler kodni "monomorfik" (bir xil tipdagi) deb hisoblaydi va uni mashina kodiga juda tez o'tkazadi. \`==\` esa optimizatsiyani qiyinlashtiradi.

3. **Linter va static analysis asboblari:**
   Eslint va boshqa tahlilchilar har doim \`==\` o'rniga \`===\` ishlatishni majburiy qilib qo'yishadi. Bu nafaqat performance, balki kod xavfsizligi va o'qilishini ta'minlash uchun muhimdir.

---

## 10. 📌 Cheat Sheet

Quyidagi jadvalda eng ko'p solishtiriladigan qiymatlar va ularning natijalari ko'rsatilgan:

| Operand X | Operand Y | \`X == Y\` | \`X === Y\` | \`Object.is(X, Y)\` | Sababi |
| :--- | :--- | :---: | :---: | :---: | :--- |
| \`5\` | \`"5"\` | **true** | false | false | \`==\` matnni songa o'tkazadi. |
| \`0\` | \`false\` | **true** | false | false | \`false\` songa o'tganda \`0\` bo'ladi. |
| \`""\` | \`0\` | **true** | false | false | Bo'sh matn songa o'tganda \`0\` bo'ladi. |
| \`null\` | \`undefined\` | **true** | false | false | Loose equality qoidasi bo'yicha teng. |
| \`null\` | \`0\` | false | false | false | \`null\` loose tenglikda songa o'tmaydi. |
| \`NaN\` | \`NaN\` | false | false | **true** | \`NaN\` o'ziga teng emas, lekin \`Object.is\`da teng. |
| \`-0\` | \`+0\` | **true** | **true** | false | \`Object.is\` nollarning ishorasini tekshiradi. |
| \`[]\` | \`false\` | **true** | false | false | \`[]\` stringga, so'ng songa (\`0\`) o'tadi. |
| \`[]\` | \`[]\` | false | false | false | Xotiradagi havolalari (references) har xil. |
| \`{}\` | \`{}\` | false | false | false | Xotiradagi havolalari (references) har xil. |
`,
  exercises: [
  {
    "id": 1,
    "title": "Obyektlarni yuzaki taqqoslash (Shallow Equality)",
    "instruction": "JavaScript-da obyektlar xotiradagi havola (reference) bo'yicha solishtiriladi, shuning uchun `{} === {}` har doim `false` beradi. Sizga ikkita obyektni 'Shallow' (yuzaki) taqqoslaydigan `shallowEqual(obj1, obj2)` funksiyasini yozish topshiriladi. Funksiya ikkala obyektning kalitlari soni bir xilligini va mos kalitlardagi qiymatlar strict equality (`===`) orqali tengligini tekshirishi kerak. (Eslatma: Obyektlar faqat bir qavatli tekis obyekt deb hisoblansin, ichma-ich obyektlar tekshirilishi shart emas).",
    "startingCode": "function shallowEqual(obj1, obj2) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Avvalo, `Object.keys(obj1)` va `Object.keys(obj2)` yordamida kalitlar massivini oling. Ularning uzunligi tengligini solishtiring. Keyin har bir kalitdagi qiymat `obj1[key] === obj2[key]` yordamida tengligini tekshiring.",
    "test": "const sandbox = new Function(code + '; return shallowEqual;');\nconst fn = sandbox();\nconst o1 = { a: 1, b: 'hello' };\nconst o2 = { a: 1, b: 'hello' };\nconst o3 = { a: 1, b: 'hello', c: true };\nconst o4 = { a: 1, b: 'world' };\nif (fn(o1, o2) === true && fn(o1, o3) === false && fn(o1, o4) === false && fn({}, {}) === true) return null;\nreturn 'shallowEqual funksiyasi obyektlarni to\\'g\\'ri taqqoslamadi';"
  },
  {
    "id": 2,
    "title": "Mukammal tenglik aniqlovchisi (Object.is simulyatsiyasi)",
    "instruction": "JavaScript-da `===` (strict equality) operatorida ham ba'zi istisnolar bor: `NaN === NaN` har doim `false` qaytaradi, hamda `-0 === +0` esa `true` qaytaradi. Siz `Object.is()` metodi kabi ishlaydigan `isIdentical(val1, val2)` funksiyasini yozing, lekin unda `Object.is` metodining o'zidan foydalanmang. Funksiya `NaN` va `NaN` ni solishtirganda `true`, `-0` va `+0` ni solishtirganda `false` qaytarishi kerak, qolgan barcha holatlarda esa oddiy `===` kabi ishlashi lozim.",
    "startingCode": "function isIdentical(val1, val2) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`NaN` o'ziga o'zi teng bo'lmagan yagona qiymat. Shuning uchun `val1 !== val1 && val2 !== val2` sharti ikkala qiymat ham `NaN` ekanini aniqlaydi. Nollarning farqini (ya'ni `-0` yoki `+0` ligini) tekshirish uchun esa ularni bo'lish orqali tekshirish mumkin: `1 / val` ifodasi `+0` uchun `Infinity`, `-0` uchun esa `-Infinity` beradi.",
    "test": "const sandbox = new Function(code + '; return isIdentical;');\nconst fn = sandbox();\nif (fn(NaN, NaN) === true && fn(-0, +0) === false && fn(5, 5) === true && fn('test', 'test') === true && fn(0, 0) === true) return null;\nreturn 'isIdentical funksiyasi NaN yoki nollarni to\\'g\\'ri solishtirmadi';"
  },
  {
    "id": 3,
    "title": "Loose Equality algoritmini qo'lda simulyatsiya qilish",
    "instruction": "JavaScript-dagi yashirin turlarni o'zgartirib taqqoslovchi loose equality (`==`) operatorining ishlash mexanizmini tushunish uchun, ushbu operatsiyani `==` yoki `!=` operatorlarisiz simulyatsiya qiluvchi `looseEqual(a, b)` funksiyasini yozing. Funksiyada faqat `===`, `typeof` va turlarni aniq o'zgartirish (`Number()`, `String()`) yordamida quyidagi qoidalarni amalga oshiring:\n1. Tiplar bir xil bo'lsa, `===` orqali taqqoslang.\n2. `null` va `undefined` o'zaro teng bo'lsin (`true`).\n3. Biri son, biri matn (string) bo'lsa, matnni songa o'tkazib taqqoslang.\n4. Biri boolean bo'lsa, uni songa o'tkazib (`true -> 1`, `false -> 0`) qayta taqqoslang.\n5. Obyekt (massiv ham) va primitiv (son, matn yoki boolean) solishtirilsa, obyektni `.toString()` yordamida stringga o'tkazib taqqoslang.",
    "startingCode": "function looseEqual(a, b) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Taqqoslash algoritmini shartlar ketma-ketligida yozing. Agar tiplar bir xil bo'lsa, to'g'ridan-to'g'ri `a === b` ni qaytaring. Agar biri `null` va biri `undefined` bo'lsa `true` qaytaring. Agar ulardan biri boolean bo'lsa, uni songa aylantirib qaytadan funksiyaga bering (`looseEqual(Number(a), b)` yoki aksincha). Obyektlarni string qilib qayta yuboring.",
    "test": "const sandbox = new Function(code + '; return looseEqual;');\nconst fn = sandbox();\nconst test1 = fn('5', 5) === true;\nconst test2 = fn(null, undefined) === true;\nconst test3 = fn(true, 1) === true;\nconst test4 = fn(false, 0) === true;\nconst test5 = fn([5], '5') === true;\nconst test6 = fn(false, '0') === true;\nconst test7 = fn(null, 0) === false;\nif (test1 && test2 && test3 && test4 && test5 && test6 && !test7) return null;\nreturn 'looseEqual funksiyasi loose equality-ni to\\'g\\'ri simulyatsiya qila olmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da loose equality (`==`) va strict equality (`===`) operatorlarining asosiy farqi nimada?",
    "options": [
      "Loose equality tiplarni moslashtirmasdan faqat qiymatni solishtiradi, strict esa tiplarni o'zgartiradi",
      "Loose equality qiymatlarni solishtirishdan oldin ularni yashirin ravishda bir xil tipga o'tkazadi (coercion), strict esa tiplarni o'zgartirmasdan solishtiradi",
      "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi",
      "Strict equality faqat obyektlar uchun ishlatiladi, loose esa faqat primitivlar uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Loose equality (`==`) operatori agar qiymatlar turlari xilma-xil bo'lsa, ularni avval orqa fonda yashirin ravishda umumiy tipga o'tkazadi (coercion), so'ngra taqqoslaydi. Strict equality (`===`) esa hech qanday o'zgartirishlarsiz ham tipni, ham qiymatni tekshiradi."
  },
  {
    "id": 2,
    "question": "Quyidagi taqqoslash natijasi nima bo'ladi?\n```javascript\nconsole.log(NaN === NaN);\nconsole.log(NaN == NaN);\n```",
    "options": [
      "true va true",
      "true va false",
      "false va true",
      "false va false"
    ],
    "correctAnswer": 3,
    "explanation": "JavaScript standartiga (ECMAScript) muvofiq, `NaN` (Not-a-Number) o'ziga o'zi ham strict (`===`), ham loose (`==`) taqqoslashda teng bo'lmagan yagona qiymatdir."
  },
  {
    "id": 3,
    "question": "Quyidagi taqqoslashlardan qaysi birining natijasi `true` bo'ladi?",
    "options": [
      "null === undefined",
      "null == undefined",
      "null == 0",
      "undefined == false"
    ],
    "correctAnswer": 1,
    "explanation": "Loose equality (`==`) qoidalariga ko'ra, `null` faqat `undefined` yoki o'ziga teng bo'la oladi. Shuning uchun `null == undefined` har doim `true` qaytaradi, lekin ularning tiplari har xil bo'lgani uchun strict equality (`===`) da `false` bo'ladi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconsole.log([] == false);\n```",
    "options": [
      "true",
      "false",
      "TypeError",
      "undefined"
    ],
    "correctAnswer": 0,
    "explanation": "Tahlil bosqichlari:\n1. Loose equality-da bir taraf boolean (`false`) bo'lsa, u songa o'tkaziladi: `false -> 0`. Ifoda: `[] == 0` bo'ladi.\n2. Obyekt (`[]`) primitiv bilan solishtirilganda ToPrimitive operatsiyasi bajariladi. Bo'sh massiv `[]` string-ga aylanganda `\"\"` hosil bo'ladi. Ifoda: `\"\" == 0` bo'ladi.\n3. String va Number solishtirilganda string songa o'tkaziladi: `\"\" -> 0`. Ifoda: `0 == 0` bo'ladi va natijada `true` chiqadi."
  },
  {
    "id": 5,
    "question": "Quyidagi ifodaning natijasi qanday bo'ladi?\n```javascript\nconsole.log({} === {});\n```",
    "options": [
      "true, chunki ikkalasi ham bo'sh obyekt",
      "TypeError",
      "false, chunki obyektlar xotiradagi turli havolalarga (references) ega",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript-da referens (havola) tiplari (obyektlar, massivlar, funksiyalar) qiymati bo'yicha emas, balki xotiradagi manzili bo'yicha solishtiriladi. Bu ikkita alohida yaratilgan bo'sh obyekt xotiraning turli joylarida joylashgani sababli ular teng emas va `false` qaytadi."
  },
  {
    "id": 6,
    "question": "Quyidagi `Object.is()` metodidan foydalanib qilingan taqqoslashlar natijasi qanday bo'ladi?\n```javascript\nconsole.log(Object.is(NaN, NaN));\nconsole.log(Object.is(-0, +0));\n```",
    "options": [
      "false va true",
      "true va true",
      "false va false",
      "true va false"
    ],
    "correctAnswer": 3,
    "explanation": "`Object.is()` metodi `===` (strict equality) operatoriga juda o'xshaydi, lekin ikkita asosiy farqqa ega: u `NaN` ni o'z-o'ziga teng deb biladi (`Object.is(NaN, NaN) === true`) va `-0` bilan `+0` ni teng emas deb topadi (`Object.is(-0, +0) === false`)."
  },
  {
    "id": 7,
    "question": "Quyidagi taqqoslash nima qaytaradi?\n```javascript\nconsole.log(1 == true);\nconsole.log(1 === true);\n```",
    "options": [
      "true va false",
      "true va true",
      "false va true",
      "false va false"
    ],
    "correctAnswer": 0,
    "explanation": "`1 == true` ifodasida loose equality sababli `true` boolean qiymati songa o'tkaziladi: `true -> 1`. Shundan so'ng `1 == 1` bajarilib, `true` qaytadi. `1 === true` da esa tiplar har xil (number va boolean) bo'lgani uchun srazu `false` qaytadi."
  },
  {
    "id": 8,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log([10] == 10);\n```",
    "options": [
      "false",
      "true",
      "TypeError",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Taqqoslashda massiv `[10]` (obyekt) va son `10` (primitiv) ishtirok etmoqda. Massiv `ToPrimitive` bo'yicha stringga o'girilganda `\"10\"` bo'ladi. Keyin `\"10\" == 10` taqqoslashida `\"10\"` stringi songa (`10`) o'tadi va natija `10 == 10` bo'lib, `true` qaytaradi."
  },
  {
    "id": 9,
    "question": "Quyidagi loose equality taqqoslash natijasi nima bo'ladi?\n```javascript\nconsole.log(\"\" == 0);\n```",
    "options": [
      "false",
      "true",
      "NaN",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "String va son loose equality (`==`) yordamida solishtirilganda, string son tipiga o'tkaziladi. Bo'sh string `\"\"` son tipiga o'tkazilganda `0` ga aylanadi. Shuning uchun `0 == 0` bajarilib, natija `true` bo'ladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconsole.log(null == 0);\n```",
    "options": [
      "true",
      "false",
      "TypeError",
      "NaN"
    ],
    "correctAnswer": 1,
    "explanation": "Matematik operatorlardan farqli ravishda, loose equality (`==`) algoritmi `null` qiymatini son tipiga (`0` ga) o'tkazmaydi. Loose equality qoidasiga ko'ra, `null` faqat `undefined` va o'ziga tengdir. Shuning uchun `null == 0` natijasi `false` bo'ladi."
  },
  {
    "id": 11,
    "question": "Quyidagi ifoda bajarilganda nima natija beradi?\n```javascript\nconsole.log(undefined == 0);\n```",
    "options": [
      "true",
      "false",
      "NaN",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Loose equality (`==`) algoritmi bo'yicha `undefined` hech qachon son tipiga o'tkazilmaydi va u faqat `null` hamda boshqa bir `undefined` bilan teng bo'ladi. Shuning uchun `undefined == 0` ifodasi `false` qaytaradi."
  },
  {
    "id": 12,
    "question": "Strict Equality Comparison algoritmining eng birinchi qadami nima?",
    "options": [
      "Qiymatlarni string tipiga o'tkazish",
      "Taqqoslanayotgan qiymatlarning turlarini (Type) tekshirish va agar ular har xil bo'lsa false qaytarish",
      "Qiymatlarni son tipiga o'tkazish",
      "Qiymatlarni obyektga o'tkazish"
    ],
    "correctAnswer": 1,
    "explanation": "Strict Equality Comparison algoritmi bo'yicha, eng birinchi navbatda solishtirilayotgan ikki qiymatning tiplari solishtiriladi. Agar `Type(x)` va `Type(y)` har xil bo'lsa, algoritm orqaga qaytmasdan to'g'ridan-to'g'ri `false` qiymatni qaytaradi."
  }
]

};
