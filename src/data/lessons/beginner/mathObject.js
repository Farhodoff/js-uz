export const mathObject = {
  id: "mathObject",
  title: "Math Obyekti va Matematik Metodlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Math obyekti nima?
JavaScript-da **\`Math\`** obyekti matematik amallar va konstantalarni (masalan, $\\pi$ soni) bajarish uchun mo'ljallangan maxsus **ichki (built-in)** obyektdir. 

Boshqa ko'plab JavaScript obyektlaridan farqli o'laroq, \`Math\` konstruktor emas. Ya'ni, siz \`new Math()\` deb yozib, undan yangi nusxa ololmaysiz. Uning barcha metod va xususiyatlari **statikdir** — ularni to'g'ridan-to'g'ri \`Math.metodName()\` ko'rinishida chaqirib ishlataverasiz.

### Real hayotiy o'xshatish
Tasavvur qiling, siz yangi uy qurayapsiz va sizga har xil o'lchov asboblari kerak:
* **Siz yangi chizg'ich yoki kalkulyator sotib olmaysiz (\`new Math()\` yo'q):** Devor chetida tayyor o'rnatilgan universal va bepul **ilmiy kalkulyator panelini** ko'rasiz.
* **Math.floor(x):** Doskani kesayotganingizda uzunlikni faqat **kichik butun tomonga qarab** kesib tashlash (masalan, 3.8 metrli taxtadan faqat 3 metrini ishlatish).
* **Math.ceil(x):** Xonani plitka bilan qoplashda plitkalar sonini **yuqori tomonga qarab** butunlash. Agar sizga 10.2 ta plitka kerak bo'lsa, siz do'kondan baribir 11 ta butun plitka sotib olasiz (chunki 10 ta yetmaydi).
* **Math.round(x):** Eng adolatli va yaqin qo'shniga qarab yaxlitlash (matematik qoida bo'yicha).
* **Math.random():** Qaysi usta bugun tushlikka borishini aniqlash uchun **tangani havoga otish** yoki tasodifiy raqam tanlash.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sonlarni yaxlitlash metodlari)
Kundalik ishlarda ko'p qo'llaniladigan yaxlitlash metodlarining farqi:

\`\`\`javascript
// 1. Math.floor() - Doimo pastga (kichik butun songa) yaxlitlaydi
console.log(Math.floor(4.7));  // 4
console.log(Math.floor(-4.2)); // -5 (chunki -5 soni -4.2 dan kichik)

// 2. Math.ceil() - Doimo yuqoriga (katta butun songa) yaxlitlaydi
console.log(Math.ceil(4.1));   // 5
console.log(Math.ceil(-4.8));  // -4 (chunki -4 soni -4.8 dan katta)

// 3. Math.round() - Matematik qoida bo'yicha eng yaqin butun songa yaxlitlaydi
console.log(Math.round(4.4));  // 4 (0.4 < 0.5 bo'lgani uchun)
console.log(Math.round(4.5));  // 5 (0.5 va undan katta bo'lsa yuqoriga)
console.log(Math.round(-4.5)); // -4 (manfiy sonlarda -4 soni musbat cheksizlikka yaqinroq)

// 4. Math.trunc() - Kasr qismini shunchaki kesib tashlaydi (yaxlitlamaydi)
console.log(Math.trunc(4.9));  // 4
console.log(Math.trunc(-4.9)); // -4

// 5. Math.abs() - Sonning absolyut qiymatini (modulini) qaytaradi
console.log(Math.abs(-15));    // 15
console.log(Math.abs(15));     // 15
\`\`\`

### 2. Intermediate Example (Min/Max va Darajalar bilan ishlash)
Elementlarning eng kattasi/kichigini aniqlash va matematik hisob-kitoblar:

\`\`\`javascript
// 1. Math.max va Math.min - Eng katta va kichik sonlarni topish
console.log(Math.max(12, 5, 8, 30, 2)); // 30
console.log(Math.min(12, 5, 8, 30, 2)); // 2

// Massivlar bilan spread (...) operatori orqali ishlatish:
const scores = [85, 92, 78, 99, 64];
const highest = Math.max(...scores);
console.log(\`Eng yuqori ball: \${highest}\`); // Eng yuqori ball: 99

// 2. Math.pow va Math.sqrt - Daraja va kvadrat ildiz
console.log(Math.pow(2, 3)); // 8 (2 ning 3-darajasi: 2 * 2 * 2)
console.log(2 ** 3);         // 8 (ES6 dagi muqobil daraja operatori)

console.log(Math.sqrt(25));  // 5 (25 ning kvadrat ildizi)
console.log(Math.sqrt(-25)); // NaN (haqiqiy sonlar ichida manfiy sonning kvadrat ildizi yo'q)
\`\`\`

### 3. Advanced Example (Tasodifiy son generatsiyasi va aniq moliyaviy yaxlitlash)
Loyihalarda eng ko'p ishlatiladigan amaliy vazifalar:

\`\`\`javascript
// 1. Chegaralangan oraliqda butun tasodifiy son yaratish [min, max]
function getRandomNumber(min, max) {
  // Math.random() -> [0, 1) oraliq
  // Math.random() * (max - min + 1) -> kerakli oraliq kengligi
  // + min -> oraliqni o'ngga siljitish
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomNumber(10, 20)); // Masalan: 14, 10 yoki 20 qaytishi mumkin

// 2. Float ko'rinishidagi sonlarni aniq kasr xonasigacha yaxlitlash helper funksiyasi
// (Masalan: 0.1 + 0.2 muammosini chetlab o'tish yoki dollar/so'm kopeklarini hisoblash)
function financialRound(value, decimals) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

console.log(0.1 + 0.2); // 0.30000000000000004 (JS float muammosi)
console.log(financialRound(0.1 + 0.2, 2)); // 0.3 (Aniq va chiroyli natija)

// 3. Doira yuzini hisoblash (Math.PI dan foydalanish)
function calculateCircleArea(radius) {
  return Math.PI * Math.pow(radius, 2);
}
console.log(calculateCircleArea(5).toFixed(2)); // "78.54"
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammolarni hal qiladi?
1. **Kompyuter xotirasidagi sonlar xatoligi (Floating-point precision):** JavaScript barcha sonlarni 64-bitli float formatda saqlaydi. Bu esa \`0.1 + 0.2\` ning \`0.30000000000000004\` bo'lishiga olib keladi. Math metodlari orqali natijalarni kerakli xonagacha aniq yaxlitlaymiz.
2. **Tasodifiylik (Randomization):** O'yinlarda suyak (dice) tashlash, unikal lotereya raqamlari yaratish yoki ma'lumotlarni aralashtirish (shuffle) kabi holatlarda \`Math.random()\` ajralmas vositadir.
3. **Geometriya va Fizika simulyatsiyalari:** Brauzer ekranida animatsiyalar yoki Canvas chizish jarayonida koordinatalar va burchaklarni hisoblash uchun trigonometrik (\`Math.sin\`, \`Math.cos\`, \`Math.atan2\`) metodlar talab etiladi.
4. **Massivlar orasidan eng chekka qiymatlarni tez topish:** Sikllar yozib, har bir elementni taqqoslab o'tirmasdan, spread operatori yordamida massivdagi eng katta yoki eng kichik qiymatni tezkor aniqlash imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`new Math()\` orqali yangi obyekt yaratishga urinish
#### Muammo:
\`Math\` konstruktor emas. Uni chaqirib bo'lmaydi.
\`\`\`javascript
const myMath = new Math(); // XATO! TypeError: Math is not a constructor
\`\`\`
#### Tuzatish:
To'g'ridan-to'g'ri \`Math\` global obyektidan foydalaning:
\`\`\`javascript
const value = Math.sqrt(9); // TO'G'RI: 3
\`\`\`

### 2. Manfiy sonlarda \`Math.floor\` va \`Math.trunc\` farqini unutish
#### Muammo:
Ko'pchilik manfiy sonlardan kasr qismini olib tashlashda ham \`Math.floor\` ishlatib yuboradi, bu esa kutilmagan matematik natijaga olib keladi.
\`\`\`javascript
console.log(Math.floor(-5.5)); // -6 qaytadi (chunki -6 kichikroq son)
\`\`\`
#### Tuzatish:
Agar maqsad faqat kasr qismini kesib tashlash bo'lsa, \`Math.trunc\` ishlatilishi shart:
\`\`\`javascript
console.log(Math.trunc(-5.5)); // -5 qaytadi (kasr shunchaki olib tashlandi)
\`\`\`

### 3. Massivni spread operatorisiz \`Math.max\`ga to'g'ridan-to'g'ri uzatish
#### Muammo:
\`Math.max\` massiv obyektini tushunmaydi, u faqat alohida argumentlarni qabul qiladi.
\`\`\`javascript
const numbers = [1, 5, 3];
console.log(Math.max(numbers)); // NaN qaytadi!
\`\`\`
#### Tuzatish:
Massiv elementlarini yoyib (spread) yuborish kerak:
\`\`\`javascript
console.log(Math.max(...numbers)); // TO'G'RI: 5
\`\`\`

### 4. \`Math.random()\`ni xavfsizlik va parollar uchun ishlatish
#### Muammo:
\`Math.random()\` PRNG (Pseudo-Random Number Generator) hisoblanadi va uning qiymatlari algoritmik ravishda bashorat qilinishi mumkin. Shuning uchun undan API tokenlar yoki parollar yaratishda foydalanish xavfsizlik tizimini zaiflashtiradi.
#### Tuzatish:
Kriptografik xavfsiz tasodifiy sonlar uchun \`crypto.getRandomValues()\` metodidan foydalaning.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Nima uchun \`new Math()\` yozib yangi obyekt yarata olmaymiz?
   * **Javob:** Chunki \`Math\` konstruktor funksiya emas, u shunchaki global statik namespace (obyekt) bo'lib, uning tarkibidagi barcha metodlar va xususiyatlar to'g'ridan-to'g'ri chaqirish uchun yaratilgan.
2. **Savol:** \`Math.floor(4.9)\` va \`Math.ceil(4.1)\` metodlarining farqi nimada?
   * **Javob:** \`Math.floor()\` sonni kichik butun songa (pastga) yaxlitlaydi (4.9 -> 4). \`Math.ceil()\` esa katta butun songa (yuqoriga) yaxlitlaydi (4.1 -> 5).
3. **Savol:** \`Math.random()\` funksiyasi \`1\` qiymatini qaytarishi mumkinmi?
   * **Javob:** Yo'q. \`Math.random()\` har doim 0 va 1 oralig'idagi (0 kiradi, lekin 1 kirmaydi) kasr sonni qaytaradi: \`[0, 1)\`.
4. **Savol:** \`Math.round(-3.5)\` va \`Math.round(3.5)\` natijalari qanday farq qiladi?
   * **Javob:** \`Math.round(3.5)\` natijasi \`4\` bo'ladi. \`Math.round(-3.5)\` esa \`-3\` qaytaradi, chunki \`-3\` soni musbat cheksizlik yo'nalishida \`-3.5\` ga eng yaqin butun sondir.

### Middle (5–8)
5. **Savol:** Bo'sh massiv yuborilganda \`Math.max(...[])\` va \`Math.min(...[])\` qiymati qanday bo'ladi? Nima uchun?
   * **Javob:** \`Math.max()\` argumentlarsiz chaqirilsa \`-Infinity\` qaytaradi. \`Math.min()\` esa \`Infinity\` qaytaradi. Buning sababi, taqqoslash algoritmi boshlang'ich qiymat sifatida eng kichik/katta chegaralardan boshlanadi.
6. **Savol:** Nima uchun manfiy sonlar bilan ishlaganda \`Math.floor()\` va \`Math.trunc()\` farq qiladi?
   * **Javob:** Chunki \`Math.trunc()\` sonning faqat kasr qismini kesib tashlaydi (masalan, -3.9 -> -3). \`Math.floor()\` esa sonni kichik tomonga tortadi (masalan, -3.9 -> -4).
7. **Savol:** \`Math.pow(x, y)\` metodidan tashqari JavaScript-da darajaga ko'tarishning qanday muqobil yo'li bor?
   * **Javob:** ES6 (ES2016) dan boshlab qo'shilgan darajaga ko'tarish operatori \`**\` dan foydalanish mumkin (masalan, \`2 ** 3\` ko'rinishida).
8. **Savol:** \`Math.sqrt(-9)\` ning natijasi nima bo'ladi va nega?
   * **Javob:** \`NaN\` (Not a Number). Chunki haqiqiy sonlar tizimida manfiy sonlarning kvadrat ildizi mavjud emas.

### Senior (9–12)
9. **Savol:** \`Math.random()\` qanday algoritmga asoslangan va nega u kriptografik xavfsiz emas?
   * **Javob:** \`Math.random()\` ko'p brauzerlarda (masalan, V8 dvigatelida) **xorshift128+** kabi psevdo-tasodifiy algoritmlarga asoslangan. Bu algoritmlarning holati (seed) ma'lum miqdordagi natijalardan so'ng aniqlanishi mumkin, shu bois u tokenlar generatsiyasiga yaramaydi. Uning o'rniga Web Crypto API (\`crypto.getRandomValues()\`) ishlatiladi.
10. **Savol:** JavaScript-da tezkor yaxlitlash uchun bitwise operatorlari (masalan, \`~~x\` yoki \`x | 0\`) ishlatiladi. Ularning \`Math.floor\` yoki \`Math.trunc\` metodlaridan farqi va xavfi nimada?
    * **Javob:** Bitwise operatorlar sonni 32-bitli butun songa o'tkazadi va kasr qismini kesadi (xuddi \`Math.trunc\` kabi). Ular juda tez ishlaydi, lekin ularning cheklovi — faqat 32-bitli signed integer chegarasidagi sonlar bilan to'g'ri ishlaydi (ya'ni $-2^{31}$ dan $2^{31}-1$ gacha). Katta sonlarda noto'g'ri natija beradi.
11. **Savol:** \`Math.min\` yoki \`Math.max\` metodlariga juda katta massivni spread qilib uzatganda (\`Math.max(...veryLargeArray)\`) qanday muammo yuzaga kelishi mumkin?
    * **Javob:** JS-da funksiyaga uzatiladigan argumentlar soni cheklangan (Call Stack limiti). Agar massivda 100,000 dan ortiq element bo'lsa, \`RangeError: Maximum call stack size exceeded\` xatoligi yuz berishi mumkin. Buning oldini olish uchun oddiy \`for\` sikli yoki \`reduce\` ishlatilishi kerak.
12. **Savol:** \`Math.atan2(y, x)\` metodi nima uchun ishlatiladi va oddiy \`Math.atan(y/x)\` dan qanday afzalligi bor?
    * **Javob:** \`Math.atan2(y, x)\` koordinata o'qidagi $(x, y)$ nuqtaning qutb burchagini ($-\\pi$ va $\\pi$ oralig'ida) aniqlaydi. U $x = 0$ bo'lgan holatni (nolga bo'lish) ham to'g'ri boshqaradi va burchak joylashgan chorakni (quadrant) aniq aniqlab beradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz Math metodlari yordamida har xil matematik va amaliy amallarni bajarishni o'rganasiz.

### Yaxlitlash va Tasodifiylik Vizual Modeli
Quyidagi Mermaid diagrammasi orqali yaxlitlash metodlari sonlar o'qida qanday yo'nalishda harakat qilishi va tasodifiy sonlarni qanday oraliqlarda generatsiya qilish mumkinligini vizual tushunishingiz mumkin:

\`\`\`mermaid
graph TD
    A["Math Metodlari Vizualizatsiyasi"] --> B["Yaxlitlash Metodlari (Rounding)"]
    A --> C["Tasodifiy Sonlar (Random Numbers)"]

    B --> B1["Math.floor(x)"]
    B --> B2["Math.ceil(x)"]
    B --> B3["Math.round(x)"]
    B --> B4["Math.trunc(x)"]

    B1 --> F1["Musbat / Manfiy sonlarni pastga yaxlitlaydi <br> 3.7 -> 3 <br> -3.2 -> -4"]
    B2 --> F2["Musbat / Manfiy sonlarni yuqoriga yaxlitlaydi <br> 3.1 -> 4 <br> -3.7 -> -3"]
    B3 --> F3["Matematik qoidaga ko'ra yaqin butun songa <br> 3.5 -> 4 <br> -3.5 -> -3"]
    B4 --> F4["Kasr qismini kesib tashlaydi <br> 3.9 -> 3 <br> -3.9 -> -3"]

    C --> C1["Math.random()"]
    C1 --> C2["[0, 1) oralig'ida kasr son qaytaradi <br> (0 kiradi, 1 kirmaydi)"]
    C1 --> C3["[min, max] butun son formulasi: <br> Math.floor(Math.random() * (max - min + 1)) + min"]
\`\`\`

### Mashqlar Tavsifi:
1. **Tasodifiy son generatori:** Berilgan ikki butun son oralig'ida tasodifiy butun son qaytaruvchi funksiya yarating.
2. **Moliyaviy yaxlitlash:** Kopek yoki tiyinlar bilan yuzaga keladigan floating-point muammolarini bartaraf etuvchi, ma'lum xonagacha aniq yaxlitlaydigan tizim yarating.
3. **Eng katta va kichik son farqi:** Massiv ichidagi eng chekka qiymatlarni topib, ular o'rtasidagi absolyut farqni aniqlang.

---

## 7. 📝 12 ta Mini Test

Ushbu dars yuzasidan o'zlashtirgan bilimlaringizni tekshirib ko'rish uchun mo'ljallangan 12 ta interaktiv test savollari \`mathObject_quizzes.json\` faylida taqdim etilgan. O'zingizni sinab ko'ring!

---

## 8. 🎯 Real Project Case Study

### E-Commerce Financial & Transaction Utility (Kassa va Tranzaksiyalar uchun Matematik Utility)
Elektron tijorat tizimlarida hisob-kitoblarni aniq yuritish juda muhimdir. Quyidagi klass valyutalarni hisoblash, chegirmalarni soliq bilan birga to'g'ri yaxlitlash va xavfsizroq fallback tranzaksiya ID-larini generatsiya qilish vazifalarini bajaradi:

\`\`\`javascript
class FinanceUtility {
  // 1. Valyutani aniq tiyinlargacha yaxlitlash (Floating-point muammosini hal etadi)
  static roundPrice(amount, currency = 'USD') {
    const decimalPlaces = currency === 'JPY' ? 0 : 2; // Iena butun son, dollar esa 2 kasr xonali
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(amount * factor) / factor;
  }

  // 2. Mahsulot narxiga soliq va chegirmalarni qo'llash
  static calculateFinalPrice(price, discountPercent, taxPercent) {
    const discountAmount = price * (discountPercent / 100);
    const priceAfterDiscount = price - discountAmount;
    const taxAmount = priceAfterDiscount * (taxPercent / 100);
    
    const rawTotal = priceAfterDiscount + taxAmount;
    return this.roundPrice(rawTotal);
  }

  // 3. Foydalanuvchilar o'rtasida g'olibni tasodifiy aniqlash (Lotereya yoki Giveaway)
  static selectRandomWinner(participantsArray) {
    if (participantsArray.length === 0) return null;
    // Tasodifiy indeks [0, array.length - 1]
    const randomIndex = Math.floor(Math.random() * participantsArray.length);
    return participantsArray[randomIndex];
  }

  // 4. Cheklangan tasodifiy ID generatsiyasi (Fallback sifatida)
  static generateShortReferenceID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TX-';
    for (let i = 0; i < 8; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      result += chars.charAt(idx);
    }
    return result;
  }
}

// Foydalanib ko'ramiz:
console.log(FinanceUtility.roundPrice(19.9923)); // 19.99
console.log(FinanceUtility.roundPrice(1250.6, 'JPY')); // 1251

// Murakkab hisob-kitob (Narxi: 100$, Chegirma: 12.5%, Soliq: 8.25%)
const total = FinanceUtility.calculateFinalPrice(100, 12.5, 8.25);
console.log(\`Yakuniy to'lov: \${total} USD\`); // Yakuniy to'lov: 94.72 USD

// Tasodifiy g'olibni aniqlash
const users = ['Ali', 'Vali', 'Sardor', 'Diyora'];
console.log(\`G'olib: \${FinanceUtility.selectRandomWinner(users)}\`);

// Tranzaksiya ID si
console.log(\`Tranzaksiya: \${FinanceUtility.generateShortReferenceID()}\`); // Masalan: TX-A3B9G2K8
\`\`\`

---

## 9. 🚀 Performance va Optimization

1. **Bitwise Operatorlar (\`~~\` yoki \`| 0\`) tezligi:**
   Kichik butun sonlarni (32-bit signed) yaxlitlashda \`~~x\` operatori \`Math.trunc()\` yoki \`Math.floor()\` metodlaridan tezroq ishlashi mumkin, chunki u to'g'ridan-to'g'ri protsessor darajasidagi bitlar bilan ishlaydi. Biroq, sonlar $-2,147,483,648$ dan kichik yoki $2,147,483,647$ dan katta bo'lsa, bitwise operatorlar xato qiymat qaytaradi.
   
2. **Katta massivlarda Spread operatoridan qochish:**
   \`Math.max(...largeArray)\` yoki \`Math.min(...largeArray)\` chaqirig'i massiv hajmi 100,000 dan oshsa, Call Stack to'lishi xatosini beradi. Bunday katta massivlarni hisoblashda \`reduce\` metodi yoki oddiy \`for\` loop yozish unumdorlik va xavfsizlik jihatdan eng to'g'ri yo'ldir:
   \`\`\`javascript
   // Katta massivlar uchun xavfsiz uslub
   let maxVal = -Infinity;
   for (let i = 0; i < largeArray.length; i++) {
     if (largeArray[i] > maxVal) {
       maxVal = largeArray[i];
     }
   }
   \`\`\`
   
3. **Konstantalarni keshlash (Caching):**
   Agar murakkab matematik sikl (masalan, $10,000,000$ ta aylanish) ichida \`Math.PI\` kabi konstantalarni qayta-qayta ishlatsangiz, uni tashqarida bitta o'zgaruvchiga saqlab olish (keshlash) tavsiya etiladi. Garchi zamonaviy JS dvigatellari buni optimallashtirsa ham, bu yaxshi kod yozish madaniyati hisoblanadi.

---

## 10. 📌 Cheat Sheet

| Metod / Konstanta | Izoh | Kod Misoli |
| :--- | :--- | :--- |
| \`Math.PI\` | $\\pi$ konstantasi (~3.14159) | \`const pi = Math.PI;\` |
| \`Math.E\` | Eyler soni (~2.718) | \`const e = Math.E;\` |
| \`Math.floor(x)\` | Sonni kichik tomonga yaxlitlaydi | \`Math.floor(2.9) // 2\` |
| \`Math.ceil(x)\` | Sonni katta tomonga yaxlitlaydi | \`Math.ceil(2.1) // 3\` |
| \`Math.round(x)\` | Eng yaqin butun songa yaxlitlaydi | \`Math.round(2.5) // 3\` |
| \`Math.trunc(x)\` | Kasr qismini kesib tashlaydi | \`Math.trunc(-2.9) // -2\` |
| \`Math.abs(x)\` | Absolyut qiymat (modul) qaytaradi | \`Math.abs(-10) // 10\` |
| \`Math.random()\` | 0 va 1 oralig'idagi tasodifiy kasr | \`Math.random() // 0.384...\` |
| \`Math.max(a, b, ...)\` | Kiritilgan eng katta sonni qaytaradi | \`Math.max(3, 9, 2) // 9\` |
| \`Math.min(a, b, ...)\` | Kiritilgan eng kichik sonni qaytaradi | \`Math.min(3, 9, 2) // 2\` |
| \`Math.pow(x, y)\` | $x$ ning $y$-darajasini hisoblaydi | \`Math.pow(2, 3) // 8\` |
| \`Math.sqrt(x)\` | Kvadrat ildizini hisoblaydi | \`Math.sqrt(9) // 3\` |
| \`Math.sin(x)\` | Radian burchakning sinus qiymati | \`Math.sin(Math.PI / 2) // 1\` |
| \`Math.cos(x)\` | Radian burchakning kosinus qiymati | \`Math.cos(Math.PI) // -1\` |
`,
  exercises: [
    {
      id: 1,
      title: "Random mashqi",
      instruction: "1 dan 6 gacha bo'lgan tasodifiy butun son hosil qiling va uni dice o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet dice = ",
      hint: "let dice = Math.floor(Math.random() * 6) + 1;",
      test: "if (dice >= 1 && dice <= 6 && Math.floor(dice) === dice) return null; return '1 va 6 oralig\\'idagi butun son bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Pastga yaxlitlash",
      instruction: "4.7 sonini pastga qarab yaxlitlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 4.7;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.floor(num);",
      test: "if (result === 4) return null; return 'Natija 4 bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Tepaga yaxlitlash",
      instruction: "4.1 sonini har doim yuqoriga yaxlitlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 4.1;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.ceil(num);",
      test: "if (result === 5) return null; return 'Natija 5 bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Kvadrat ildiz",
      instruction: "64 sonining kvadrat ildizini hisoblang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 64;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.sqrt(num);",
      test: "if (result === 8) return null; return 'Natija 8 bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Darajaga ko'tarish",
      instruction: "3 ning 4-darajasini Math.pow() yordamida hisoblang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.pow(3, 4);",
      test: "if (result === 81) return null; return 'Natija 81 bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Eng katta son",
      instruction: "12, 45, 78 va 34 sonlari ichidan eng kattasini aniqlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.max(12, 45, 78, 34);",
      test: "if (result === 78) return null; return 'Eng katta son 78 bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Eng kichik son",
      instruction: "12, 45, 7 va 34 sonlari ichidan eng kichigini aniqlang va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.min(12, 45, 7, 34);",
      test: "if (result === 7) return null; return 'Eng kichik son 7 bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Absolyut qiymat",
      instruction: "-99 sonining modulini (absolyut qiymatini) toping va natijani result o'zgaruvchisiga saqlang.",
      startingCode: "let num = -99;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.abs(num);",
      test: "if (result === 99) return null; return 'Natija 99 bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Kasr qismini kesish",
      instruction: "Math.trunc() yordamida 15.99 sonining faqat butun qismini olib, result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 15.99;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.trunc(num);",
      test: "if (result === 15) return null; return 'Natija 15 bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Aylana yuzi",
      instruction: "Aylana radiusi r = 5. Math.PI va Math.pow() yordamida aylana yuzini (S = π * r²) hisoblang va uni area o'zgaruvchisiga saqlang.",
      startingCode: "let r = 5;\n// Bu yerga yozing\nlet area = ",
      hint: "let area = Math.PI * Math.pow(r, 2);",
      test: "if (area > 78.5 && area < 78.6) return null; return 'Aylana yuzi noto\\'g\\'ri hisoblandi!';"
    },
    {
      id: 11,
      title: "Yaqin songa yaxlitlash",
      instruction: "Math.round() yordamida 5.5 sonini eng yaqin butun songa yaxlitlang va result o'zgaruvchisiga saqlang.",
      startingCode: "let num = 5.5;\n// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.round(num);",
      test: "if (result === 6) return null; return 'Natija 6 bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Tasodifiy oraliq",
      instruction: "10 va 50 oralig'ida (10 va 50 ham kirishi mumkin) tasodifiy butun son hosil qilib, uni result o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet result = ",
      hint: "let result = Math.floor(Math.random() * 41) + 10;",
      test: "if (result >= 10 && result <= 50 && Math.floor(result) === result) return null; return '10 va 50 oralig\\'idagi butun son bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Math obyekti haqida qaysi tasdiq to'g'ri?",
    "options": [
      "`new Math()` yordamida uning yangi nusxasini yaratish mumkin",
      "U funksiya emas, balki statik obyekt bo'lib, uning konstruktori yo'q",
      "U faqat natural sonlar bilan ishlaydigan brauzer funksiyasidir",
      "Uning tarkibidagi metodlarni faqat Node.js da ishlatish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Math obyekti konstruktor emas, ya'ni uni `new Math()` deb chaqirib bo'lmaydi. Uning barcha metodlari va konstantalari statikdir (to'g'ridan-to'g'ri Math ustida chaqiriladi)."
  },
  {
    "id": 2,
    "question": "`Math.floor(4.7)` va `Math.ceil(4.1)` metodlari qanday natija beradi?",
    "options": [
      "`4` va `5`",
      "`5` va `4`",
      "`4.7` va `4.1`",
      "`4` va `4`"
    ],
    "correctAnswer": 0,
    "explanation": "`Math.floor()` berilgan sondan kichik yoki unga teng eng yaqin butun songacha pastga qarab yaxlitlaydi (4.7 -> 4). `Math.ceil()` esa kattaroq yoki teng eng yaqin butun songacha yuqoriga qarab yaxlitlaydi (4.1 -> 5)."
  },
  {
    "id": 3,
    "question": "`Math.round(2.5)` va `Math.round(-2.5)` natijalari mos ravishda qanday bo'ladi?",
    "options": [
      "`3` va `-3`",
      "`2` va `-2`",
      "`3` va `-2`",
      "`2.5` va `-2.5`"
    ],
    "correctAnswer": 2,
    "explanation": "`Math.round(x)` yaqinroq butun songa yaxlitlaydi. Kasr qismi `.5` yoki undan katta bo'lsa, musbat cheksizlik tomon yaxlitlaydi. Shuning uchun `Math.round(2.5)` natijasi `3`, `Math.round(-2.5)` esa `-2` ga teng (chunki -2 musbat cheksizlikka -3 ga qaraganda yaqinroq)."
  },
  {
    "id": 4,
    "question": "`Math.trunc()` metodining asosiy vazifasi nima?",
    "options": [
      "Sonning faqat butun qismini qoldirib, kasr qismini shunchaki tashlab yuboradi",
      "Sonni eng yaqin juft songacha yaxlitlaydi",
      "Musbat sonlarni pastga, manfiy sonlarni esa yuqoriga yaxlitlaydi",
      "Sonning kvadrat ildizini hisoblaydi"
    ],
    "correctAnswer": 0,
    "explanation": "`Math.trunc()` hech qanday yaxlitlash qoidalariga rioya qilmaydi, u shunchaki nuqtadan keyingi kasr qismini butunlay kesib tashlaydi."
  },
  {
    "id": 5,
    "question": "Musbat va manfiy sonlar uchun `Math.floor()` va `Math.trunc()` qachon farqli natija beradi?",
    "options": [
      "Hech qachon farq qilmaydi, ular bir xil ishlaydi",
      "Faqat musbat kasr sonlarda (masalan: 3.2)",
      "Faqat manfiy kasr sonlarda (masalan: -3.2)",
      "Faqat butun sonlarda (masalan: -5 yoki 5)"
    ],
    "correctAnswer": 2,
    "explanation": "Musbat sonlar uchun ikkalasi ham bir xil ishlaydi (masalan, 3.7 uchun 3). Ammo manfiy kasr sonlarda `Math.floor(-3.2)` kichikroq butun son ya'ni `-4` ni beradi, `Math.trunc(-3.2)` esa kasr qismini kesib `-3` ni beradi."
  },
  {
    "id": 6,
    "question": "`Math.random()` funksiyasi qanday diapazondagi sonlarni qaytaradi?",
    "options": [
      "`[0, 1]` ya'ni 0 dan 1 gacha (0 kiradi, 1 kirmaydi)",
      "`(0, 1)` ya'ni 0 dan 1 gacha (0 ham, 1 ham kirmaydi)",
      "`[0, 1]` ya'ni 0 va 1 oralig'idagi sonlar (har ikkala chegara ham kiradi)",
      "`[1, 100]` oralig'idagi butun sonlar"
    ],
    "correctAnswer": 0,
    "explanation": "`Math.random()` 0 dan (shu jumladan 0) 1 gacha (1 kirmaydi, ya'ni har doim 1 dan kichik) bo'lgan tasodifiy o'nlik kasr sonni qaytaradi: `0 <= x < 1`."
  },
  {
    "id": 7,
    "question": "Qaysi kod berilgan `[1, 10]` (1 va 10 ham kiradi) oralig'idan butun tasodifiy sonni qaytaradi?",
    "options": [
      "`Math.floor(Math.random() * 10)`",
      "`Math.floor(Math.random() * 10) + 1`",
      "`Math.ceil(Math.random() * 10)`",
      "`Math.round(Math.random() * 9) + 1`"
    ],
    "correctAnswer": 1,
    "explanation": "`Math.random() * 10` bizga `[0, 10)` oralig'ini beradi. `Math.floor` orqali uni yaxlitlasak, `[0, 9]` oralig'idagi butun sonlar hosil bo'ladi. Keyin `+ 1` qo'shsak, oraliq `[1, 10]` ga o'tadi."
  },
  {
    "id": 8,
    "question": "`Math.min()` metodiga argumentlar berilmasa nima qaytadi?",
    "options": [
      "`0`",
      "`undefined`",
      "`Infinity`",
      "`-Infinity`"
    ],
    "correctAnswer": 2,
    "explanation": "Qiziqarli fakt: JavaScript-da `Math.min()` argumentlarsiz chaqirilsa `Infinity` (musbat cheksizlik), `Math.max()` esa `-Infinity` qaytaradi. Bu taqqoslash algoritmlarining boshlang'ich qiymatlari uchun shunday qilingan."
  },
  {
    "id": 9,
    "question": "Massivdagi sonlarning eng kattasini topish uchun qaysi kod to'g'ri hisoblanadi?",
    "options": [
      "`Math.max(numbers)`",
      "`Math.max(...numbers)`",
      "`Math.max.apply(numbers)`",
      "`Math.max(Array.values(numbers))`"
    ],
    "correctAnswer": 1,
    "explanation": "`Math.max` metodi massivni to'g'ridan-to'g'ri qabul qilmaydi, u alohida argumentlarni kutadi. Spread operator (`...`) yordamida massiv elementlarini argumentlarga yoyib yuborish kerak: `Math.max(...numbers)`."
  },
  {
    "id": 10,
    "question": "`Math.abs(-42.5)` ning natijasi nima bo'ladi?",
    "options": [
      "`-42`",
      "`42`",
      "`43`",
      "`42.5`"
    ],
    "correctAnswer": 3,
    "explanation": "`Math.abs(x)` metodi sonning absolyut qiymatini (modulini) qaytaradi, ya'ni uning ishorasini (musbat yoki manfiyligini) olib tashlaydi. `-42.5` ning absolyut qiymati `42.5` dir."
  },
  {
    "id": 11,
    "question": "`Math.pow(8, 2)` metodi qaysi operator bilan bir xil ishlaydi?",
    "options": [
      "`8 * 2`",
      "`8 ** 2`",
      "`8 ^ 2`",
      "`8 && 2`"
    ],
    "correctAnswer": 1,
    "explanation": "Darajaga ko'tarish uchun `Math.pow(x, y)` metodidan yoki ES6 dan boshlab `x ** y` operatoridan foydalanish mumkin. `^` operatori esa JavaScript-da bitwise XOR (istisno etuvchi Yoki) operatoridir."
  },
  {
    "id": 12,
    "question": "`Math.sqrt(16)` va `Math.sqrt(-16)` natijalari qanday?",
    "options": [
      "`4` va `NaN`",
      "`4` va `-4`",
      "`4` va `TypeError`",
      "`8` va `NaN`"
    ],
    "correctAnswer": 0,
    "explanation": "`Math.sqrt(x)` berilgan sonning kvadrat ildizini qaytaradi. Manfiy sonlarning kvadrat ildizi haqiqiy sonlar to'plamida mavjud bo'lmaganligi uchun, JS `NaN` (Not a Number) qaytaradi."
  }
]

};
