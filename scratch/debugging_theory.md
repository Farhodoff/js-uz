## 1. 💡 Sodda Tushuntirish va Analogiya

### Debugging nima?
**Debugging** (xatoliklarni aniqlash va tuzatish) — bu dasturdagi buglarni (xatolarni) topish, tahlil qilish va ularni bartaraf etish jarayonidir. Kodingiz kutilganidek ishlamayotganida, faqat taxmin qilish o'rniga, dasturning ma'lum bir qatorida to'xtatib, o'zgaruvchilarning o'sha paytdagi holatini tekshirish juda muhimdir.
* **console.\***: Turli xil shakllarda ma'lumotlarni konsolga chiqarish (faqat `log` emas, balki jadval, ogohlantirish, vaqtni o'lchash va h.k.).
* **debugger (to'xtatuvchi):** Dasturning bajarilishini aynan o'sha nuqtada to'xtatib, brauzerning ishlab chiquvchilar oynasini (DevTools) ochib beruvchi maxsus JavaScript buyrug'i.
* **Breakpoints (to'xtash nuqtalari):** DevTools oynasida kodning qaysi qatori bajarilganda to'xtashini belgilash usuli.

### Real hayotiy analogiya
Tasavvur qiling, siz **detektivsiz**:
* **console.log:** Yo'l chetiga o'rnatilgan kuzatuv kameralari. Siz ularni ma'lum joylarga qo'yib chiqasiz va keyinroq kelib kimlar o'tganini (qiymatlarni) ko'rasiz.
* **debugger / Breakpoints:** Vaqtni to'xtatuvchi sehrli pult. Jinoyatchi (xatolik) qayerda sodir bo'lishini bilsangiz, vaqtni aynan o'sha lahzada to'xtatasiz. So'ngra atrofdagi har bir narsani (o'zgaruvchilarni, Call Stackni) diqqat bilan tekshirasiz, bir soniya oldinga yurib nima sodir bo'layotganini bosqichma-bosqich kuzatasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (console metodlari)
Kodni oddiy loglardan tashqari professional konsol metodlari yordamida tekshirish:
```javascript
// Obyektlar massivini chiroyli jadval ko'rinishida chiqarish
const users = [
  { id: 1, name: "Ali", role: "Admin" },
  { id: 2, name: "Vali", role: "User" }
];
console.table(users);

// Funksiya ishlash vaqtini o'lchash
console.time("LoopTime");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd("LoopTime"); // LoopTime: X.XX ms deb chiqaradi

// Funksiya qayerdan chaqirilganini (Call Stack trace) aniqlash
function logCallOrigin() {
  console.trace("Bu yerga qayerdan keldik?");
}
function test() { logCallOrigin(); }
test();
```

### 2. Intermediate Example (debugger kalit so'zi)
Kod oqimini to'xtatish va tekshirish:
```javascript
function calculateCartTotal(cartItems) {
  let total = 0;
  
  for (let item of cartItems) {
    const price = item.price;
    const qty = item.quantity;
    
    // Agar DevTools ochiq bo'lsa, kod aynan shu yerda muzlaydi (to'xtaydi)
    // Siz price va qty qiymatlarini ko'rishingiz mumkin
    debugger; 
    
    total += price * qty;
  }
  
  return total;
}

calculateCartTotal([{ price: 100, quantity: 2 }, { price: 50, quantity: 1 }]);
```

### 3. Advanced Example (Source Maps)
Production (ishlab chiqarish) muhitida kodlar siqiladi (minify qilinadi) va o'qish qiyin holga keladi. **Source Maps** — bu siqilgan kod bilan siz yozgan asl kod o'rtasidagi ko'prikdir:
```javascript
// production.min.js (Haqiqiy brauzer o'qiydigan kod)
function a(b){return b*2}console.log(a(5));

// Source Map (.js.map fayli) yordamida brauzer DevTools-da buni quyidagicha ko'rsatadi:
// main.js (Siz yozgan kod)
function doubleNumber(num) {
  return num * 2;
}
console.log(doubleNumber(5));
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Ko'r-ko'rona kod yozish:** console.log yozib, sahifani yangilab, yana console.log yozib vaqt yo'qotishni kamaytiradi. Breakpoint-lar yordamida kod ishlayotgan paytning o'zida o'zgaruvchilarni o'zgartirib ko'rish, kodni qadamma-qadam (Step Over, Step Into) bajarish mumkin.
* **Call Stack-ni ko'ra olish:** Xatolik aynan qaysi funksiya ichidan, u funksiya esa qaysi biri orqali chaqirilganini aniqlash.
* **Xotira sizib chiqishini (Memory Leaks) topish:** DevTools-dagi "Memory" (Performance) paneli orqali xotirada ortiqcha qolib ketgan obyektlarni aniqlash.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Production-ga console.log-larni qoldirib ketish
*Tushuntirish:* Konsol metodlari foydalanuvchiga keraksiz loglarni ko'rsatadi va unumdorlikka (performance) salbiy ta'sir qiladi.
*Tuzatish:* Build vositalari (masalan, Vite, Webpack, Terser) yordamida build paytida barcha console.log-larni avtomatik o'chirib tashlash.

### 2. debugger kalit so'zini o'chirishni unutish
Agar `debugger` yozilgan kod production sahifasida qolsa va foydalanuvchi DevTools-ni ochsa, sayt kutilmaganda to'xtab qoladi va bu yomon foydalanuvchi tajribasini keltirib chiqaradi.

### 3. Asinxron kodlarda breakpoints ishlashini tushunmaslik
Asinxron chaqiriqlarda (masalan fetch yoki setTimeout) breakpoint o'rnatilganda, sinxron kodlar bajarilib bo'lib, keyin asinxron qismga o'tishini tushunish kerak.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da `debugger` kalit so'zi nima vazifani bajaradi?
   * **Javob:** Agar brauzerda ishlab chiquvchi asboblari (DevTools) ochiq bo'lsa, kod bajarilishi aynan `debugger` yozilgan qatorda to'xtaydi (breakpoint kabi ishlaydi).
2. **Savol:** `console.table()` metodining vazifasi nima?
   * **Javob:** Obyektlar yoki massivlarni konsolda qulay va chiroyli jadval (table) ko'rinishida ko'rsatadi.
3. **Savol:** DevTools-dagi "Watch" bo'limi nima uchun kerak?
   * **Javob:** Debugging paytida biz kuzatmoqchi bo'lgan maxsus o'zgaruvchilar yoki ifodalarni ro'yxatga qo'shib qo'yib, ularning qiymati qanday o'zgarayotganini real vaqtda kuzatish uchun.
4. **Savol:** Kodni qadamma-qadam bajarishda "Step Over" va "Step Into" farqi nimada?
   * **Javob:** "Step Over" keyingi qatorga o'tadi (funksiya bo'lsa uning ichiga kirmaydi). "Step Into" esa joriy qatordagi funksiya ichiga kirib, uning ichki qadamlarini birma-bir bajaradi.

### Middle (5–8)
5. **Savol:** Source Map nima va u loyihalarda nima uchun kerak?
   * **Javob:** Source Map — bu build jarayonida siqilgan (minified) kod bilan asl yozilgan kodni bog'laydigan xarita. U production-da yuz bergan xatolarni oson topish va asl kodni debug qilish uchun kerak.
6. **Savol:** Conditional Breakpoint nima?
   * **Javob:** Faqat ma'lum bir shart bajarilgandagina (masalan `i === 50` bo'lganda) kodni to'xtatadigan breakpoint turi.
7. **Savol:** `console.time()` va `console.timeEnd()` qanday ishlatiladi?
   * **Javob:** Bir xil teg (label) nomi bilan chaqirilib, ular orasida bajarilgan kodning qancha vaqt (millisekund) olganini o'lchash uchun ishlatiladi.
8. **Savol:** `console.trace()` nimani chop etadi?
   * **Javob:** Xato yuz bergan yoki chaqirilgan joygacha bo'lgan funksiyalar chaqiruvi iyerarxiyasini (Call Stack) ko'rsatadi.

### Senior (9–12)
9. **Savol:** Dom Breakpoints nima va ularning qanday turlari bor?
   * **Javob:** HTML DOM elementi ustida biror amal bajarilganda kodni to'xtatish. Turlari: Subtree modifications (ichki elementlar o'zgarganda), Attribute modifications (klass yoki id o'zgarganda), Node removal (element o'chirilganda).
10. **Savol:** JavaScript single-threaded bo'lsa, asinxron callbacklar bajarilayotgan paytda Call Stack va Async Call Stack iyerarxiyasi DevTools-da qanday ko'rsatiladi?
    * **Javob:** DevTools-da "Async" funksiyasi yoqilgan bo'lsa, u asinxron vazifani yaratgan joyni ham Call Stack-ning quyi qismida xotirada saqlab ko'rsatib beradi.
11. **Savol:** "Blackboxing" (Ignore List) nima va u debugging jarayonini qanday osonlashtiradi?
    * **Javob:** Uchinchi tomon kutubxonalari (masalan, React, jQuery yoki lodash) kodlarini debugging jarayonida chetlab o'tish (ignore qilish). Bu orqali "Step Into" qilganda kutubxonalar kodiga kirmasdan faqat o'zimiz yozgan kod bo'yicha yuramiz.
12. **Savol:** Xotira sizib chiqishini (Memory Leak) aniqlashda "Heap Snapshot" dan qanday foydalaniladi?
    * **Javob:** Ikki yoki undan ortiq vaqt oralig'ida xotira nusxalari (snapshots) olinadi va ularni taqqoslash ("Comparison") orqali qaysi obyektlar o'chirilmasdan xotirada qolib ketayotganini aniqlash mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali debugging va console metodlari bo'yicha mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Rekursiv funksiyadagi cheksizlikni Call Stack orqali topish
Faraz qilaylik, bizda rekursiv faktorial hisoblaydigan funksiya bor, lekin u ba'zida cheksiz siklga tushib, stack to'lib ketmoqda:

```javascript
function findFactorial(n) {
  // Debugging uchun chaqiriq trace-ni ko'ramiz
  if (n < 0) {
    console.trace("Manfiy son bilan chaqirildi!");
    return 0;
  }
  
  if (n === 1 || n === 0) {
    return 1;
  }
  
  // Xato shart: agar n son bo'lmasa yoki butun bo'lmasa nima bo'ladi?
  // debugger yordamida oqimni to'xtatib kuzatamiz:
  if (typeof n !== 'number') {
    debugger;
  }
  
  return n * findFactorial(n - 1);
}

// Mana bu chaqiriq cheksiz rekursiyaga olib keladi:
// findFactorial(3.5); // 3.5 -> 2.5 -> 1.5 -> 0.5 -> -0.5 ...
```

---

## 9. 🚀 Performance va Optimization

* **Konsol loglarini tozalash:** console metodlari bajarilayotgan paytda sinxron bo'lib, ular parametr sifatida uzatilgan obyektlarni xotirada ushlab turadi. Katta hajmdagi ma'lumotlarni konsolga chiqarish sahifani sekinlashtiradi.
* **Production-da o'chirish:** Vite loyihalarda Vite config orqali `esbuild: { drop: ['console', 'debugger'] }` sozlamasini o'rnatish orqali ishlab chiqarish kodidan konsollarni butunlay tozalang.

---

## 10. 📌 Cheat Sheet

| Metod / Buyruq | Vazifasi | Misol |
| :--- | :--- | :--- |
| `console.log()` | Oddiy xabar chiqarish | `console.log(x)` |
| `console.table()` | Massiv/obyektlarni jadval ko'rinishida chiqarish | `console.table(users)` |
| `console.trace()` | Call Stack izlarini ko'rsatish | `console.trace('Log trace')` |
| `console.time(label)` | Vaqtni o'lchashni boshlash | `console.time('fetchTime')` |
| `console.timeEnd(label)` | O'lchashni tugatish va vaqtni chiqarish | `console.timeEnd('fetchTime')` |
| `debugger;` | Dasturni to'xtatib, DevTools-ni ishga tushirish | `if(!data) { debugger; }` |
