## 1. 💡 Sodda Tushuntirish va Analogiya

### Scope (Ko'rinish Sohasi) nima?
* **Scope (Ko'rinish sohasi):** Bu JavaScript-da o'zgaruvchilar, funksiyalar va obyektlarning kodimizning qaysi qismlarida "ko'rinishi" (ya'ni ularga murojaat qilish imkoniyati borligi) va ularning xotiradagi yashash muddatini belgilaydigan qoidalar to'plamidir.
* **Lexical Scope (Leksik qamrov):** JavaScript o'zgaruvchilarning ko'rinish sohasini dinamik tarzda emas, balki kod yozilayotgan (e'lon qilinayotgan) vaqtdagi joylashuviga qarab belgilaydi. Ichki doiradagi kod har doim o'zidan tashqaridagi muhit o'zgaruvchilarini ko'ra oladi.

### Real hayotiy analogiya
Tasavvur qiling, siz bir **ofis binosida** ishlayapsiz:
* **Global Scope (Umumiy bino):** Binoning hovlisi yoki kirish zali. Hovlidagi ma'lumot taxtasini binodagi barcha xodimlar, qaysi xonada bo'lishidan qat'i nazar, ko'ra oladi.
* **Function Scope (Alohida bo'lim xonasi):** Faqat buxgalteriya bo'limi xonasi. Ushbu xona ichidagi hujjatlarni faqat buxgalteriya xodimlari ko'ra oladi. Tashqaridagilar (masalan, hovlidagilar) xona ichidagi ma'lumotlarni ko'ra olmaydi.
* **Block Scope (Xona ichidagi qulflangan seyf):** Buxgalteriya xonasi ichidagi bitta seyf `{}`. Seyf ichidagi hujjatlar faqat seyf ochilgandagina (blok bajarilayotganda) ko'rinadi va foydalaniladi, seyf yopilgach ularga kirib bo'lmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global va Function Scope farqi)
Mahalliy (local) va umumiy (global) o'zgaruvchilar bilan ishlash:
```javascript
let globalName = "Jasur"; // Global scope - hamma joyda ko'rinadi

function greetUser() {
  let localMessage = "Salom"; // Function scope - faqat funksiya ichida ko'rinadi
  console.log(`${localMessage}, ${globalName}!`); // Global o'zgaruvchidan foydalanish
}

greetUser(); // Konsolga: "Salom, Jasur!"
// console.log(localMessage); // Xato! localMessage funksiyadan tashqarida ko'rinmaydi (ReferenceError)
```

### 2. Intermediate Example (Block Scope: let/const va var farqi)
`if` va `for` kabi bloklar ichida o'zgaruvchi e'lon qilish:
```javascript
if (true) {
  var varVariable = "Men block scope-ga ega emasman";
  let letVariable = "Men faqat shu blok ichida ko'rinaman";
  const constVariable = "Men ham faqat shu blok ichida ko'rinaman";
}

console.log(varVariable); // Konsolga: "Men block scope-ga ega emasman" (Chunki var block scope-ni bilmaydi)
// console.log(letVariable); // Xato: ReferenceError (Blokdan tashqarida kirish taqiqlangan)
// console.log(constVariable); // Xato: ReferenceError
```

### 3. Advanced Example (Variable Shadowing - Soyalanish va Nested Scope)
Ichki qamrovda tashqi qamrovdagi o'zgaruvchi bilan bir xil nomdagi o'zgaruvchi e'lon qilinganda:
```javascript
let theme = "light"; // Global o'zgaruvchi

function configureApp() {
  let theme = "dark"; // Shadowing: Global "theme" o'zgaruvchisini vaqtincha to'sib qo'yadi
  console.log(`Lokal sozlama: ${theme}`); // Konsolga: "Lokal sozlama: dark"
  
  if (true) {
    let theme = "neon"; // Block-level Shadowing: configureApp-dagi "theme"ni soyalaydi
    console.log(`Blok ichidagi sozlama: ${theme}`); // Konsolga: "Blok ichidagi sozlama: neon"
  }
}

configureApp();
console.log(`Global sozlama o'zgarmadi: ${theme}`); // Konsolga: "Global sozlama o'zgarmadi: light"
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Leksik Atrof-muhit (Lexical Environment)
JavaScript dvigateli kodni bajarishdan oldin uni tahlil qiladi (compile). Har bir bajarilish muhiti (global, funksiya yoki blok) uchun **Lexical Environment** deb nomlanuvchi maxsus xotira tuzilmasini yaratadi. U ikki qismdan iborat:
1. **Environment Record:** Hozirgi scope-ga tegishli barcha lokal o'zgaruvchilar, funksiyalar va parametrlarni saqlaydigan xarita (map).
2. **Outer Reference (Tashqi havola):** Kodning yozilish joyiga ko'ra o'zidan bitta yuqori turgan (tashqi) Leksik Atrof-muhitga bo'lgan havola (ko'rsatkich). Global scope uchun tashqi havola `null` ga teng.

### 2. Qidirish Zanjiri (Scope Chain Lookup)
Qachonki kodda o'zgaruvchiga murojaat qilinsa:
1. JavaScript dvigateli o'zgaruvchini avval joriy (lokal) `Environment Record` ichidan qidiradi.
2. Agar u yerda topilmasa, `Outer Reference` orqali tashqi Leksik Atrof-muhitga o'tadi va o'sha yerdan qidiradi.
3. Bu jarayon global atrof-muhitgacha (`null` ga yetguncha) davom etadi.
4. Agar eng oxirgi global scope-dan ham o'zgaruvchi topilmasa va Strict Mode yoqilgan bo'lsa, `ReferenceError` xatosi qaytariladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `var` block scope-ga ega deb o'ylash (Loop muammolari)
Junior dasturchilar ko'pincha `for` sikli ichida `var` ishlatib, uni blokdan tashqarida ko'rinmaydi deb o'ylashadi.
#### Xato kod:
```javascript
for (var i = 0; i < 3; i++) {
  // amallar...
}
console.log(i); // Konsolga: 3! (i o'zgaruvchisi global scope-ga sizib chiqdi)
```
#### To'g'ri yechim:
```javascript
for (let i = 0; i < 3; i++) {
  // amallar...
}
// console.log(i); // To'g'ri: ReferenceError: i is not defined. i o'zgaruvchisi faqat loop bloki ichida mavjud edi.
```

### 2. Bexosdan Global o'zgaruvchi yaratish (Global Scope Pollution)
O'zgaruvchini e'lon qilishda `let`, `const` yoki `var` kalit so'zlarini unutib qoldirish.
#### Xato kod:
```javascript
function calculateArea(r) {
  pi = 3.14; // Kalit so'zsiz yozilgani uchun avtomatik global o'zgaruvchiga aylanadi
  return pi * r * r;
}
calculateArea(5);
console.log(pi); // Konsolga: 3.14 (Global scope ifloslandi va boshqa fayllar bilan to'qnashishi mumkin)
```
#### To'g'ri yechim:
```javascript
"use strict"; // Qat'iy rejimni yoqish
function calculateArea(r) {
  const pi = 3.14; // To'g'ri e'lon qilish
  return pi * r * r;
}
```

### 3. Temporal Dead Zone (TDZ - Vaqtinchalik o'lik hudud)
`let` va `const` o'zgaruvchilari hoisting (tepaga ko'tarilish) bo'lsa-da, ular e'lon qilinmaguncha ularga murojaat qilib bo'lmaydi. Bu oraliq TDZ deyiladi.
#### Xato kod:
```javascript
console.log(myNumber); // Xato! ReferenceError: Cannot access 'myNumber' before initialization
let myNumber = 42;
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Scope nima va u nima uchun kerak?
   * **Javob:** Scope — o'zgaruvchi va funksiyalarning kodning qaysi qismlarida ko'rinishi va ishlash doirasidir. U kodni tartibga solish, xavfsizlikni ta'minlash va nomlar to'qnashuvining oldini olish uchun kerak.
2. **Savol:** `let`, `const` va `var` o'rtasidagi asosiy scope farqi nimada?
   * **Javob:** `let` va `const` block scope-ga ega (faqat `{}` blok ichida ko'rinadi). `var` esa function scope-ga ega (faqat funksiya ichida cheklanadi, oddiy bloklardan tashqariga sizib chiqadi).
3. **Savol:** Global Scope nima?
   * **Javob:** Dasturdagi barcha funksiyalar va bloklardan tashqarida joylashgan eng yuqori doira. Global scope-dagi o'zgaruvchilar kodning istalgan joyidan foydalanish mumkin bo'ladi.
4. **Savol:** Quyidagi kod nima chiqaradi? `if (true) { var user = "Ali"; } console.log(user);`
   * **Javob:** `"Ali"` chiqadi, chunki `var` block scope-ga ega emas va u global scope-ga tegishli bo'lib qoladi.

### Middle
5. **Savol:** Leksik qamrov (Lexical Scope) va Dinamik qamrov (Dynamic Scope) farqi nimada?
   * **Javob:** Leksik qamrovda o'zgaruvchi qidirish tartibi kodning yozilgan (e'lon qilingan) joyiga ko'ra belgilanadi (JavaScript-da shunday). Dinamik qamrovda esa funksiya qayerda va qachon chaqirilganiga qarab aniqlanadi.
6. **Savol:** Scope Chain qanday ishlaydi?
   * **Javob:** JavaScript dvigateli o'zgaruvchini joriy lokal scope-dan qidiradi. Topolmasa, zanjir bo'ylab yuqoridagi tashqi leksik muhitlarga chiqadi va global scope-gacha boradi.
7. **Savol:** Variable Shadowing (Soyalash) nima va u qanday yuz beradi?
   * **Javob:** Ichki scope ichida tashqi scope-dagi o'zgaruvchi bilan bir xil nomda yangi o'zgaruvchi e'lon qilinsa, ichki o'zgaruvchi tashqarisidagisini to'sib qo'yadi. Bu variable shadowing deyiladi.
8. **Savol:** Strict mode (`"use strict"`) scope ifloslanishini qanday oldini oladi?
   * **Javob:** Strict mode e'lon qilinmagan o'zgaruvchiga qiymat berishga ruxsat bermaydi (ReferenceError beradi) va avtomatik ravishda tasodifiy global o'zgaruvchilar yaratilishini taqiqlaydi.

### Senior
9. **Savol:** JavaScript-da Module Scope nima va u global scope pollution-ni qanday hal qiladi?
   * **Javob:** ES modullarda (`import/export` ishlatilganda) har bir fayl o'zining shaxsiy scope-iga ega bo'ladi. Fayl ichidagi o'zgaruvchilar boshqa fayllarga sizib chiqmaydi, faqat `export` orqali ruxsat berilganlarigagina kirish mumkin bo'ladi.
10. **Savol:** V8 dvigateli Scope va xotira boshqaruvini qanday optimallashtiradi?
    * **Javob:** V8 dvigateli kodni tahlil qilib, yopilishlar (closures) yoki ichki funksiyalar tomonidan ishlatilmaydigan tashqi o'zgaruvchilarni leksik muhit xotirasidan o'chirib yuboradi (Garbage Collection-ga yordam beradi).
11. **Savol:** Global obyekt (`window` yoki `globalThis`) va Global scope o'rtasida qanday farq bor?
    * **Javob:** Global scope eng yuqori qamrovdir. Global obyekt esa global scope-dagi ayrim o'zgaruvchilar va brauzer API-larini o'zida saqlovchi obyektdir. Masalan, global scope-da `let` yoki `const` bilan e'lon qilingan o'zgaruvchilar global obyekt (`window`) tarkibiga kirmaydi, lekin `var` yoki to'g'ridan-to'g'ri e'lon qilinganlar kiradi.
12. **Savol:** Shadowing bilan hoisting o'rtasidagi bog'liqlikni tushuntiring.
    * **Javob:** Agar ichki blokda `let` yordamida o'zgaruvchi soyalansa, u blokning boshidan boshlab hoisting tufayli TDZ (Temporal Dead Zone) hosil qiladi. Hatto tashqi qamrovda shu nomli o'zgaruvchi bo'lsa ham, blok boshida unga murojaat qilish ReferenceError-ga olib keladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz blok qamrovlari, global o'zgaruvchilar bilan ishlash va ichma-ich joylashgan statik leksik qamrov zanjirini mashq qilasiz.

### Scope Chain bo'ylab o'zgaruvchini qidirish zanjiri (Variable Lookup via Scope Chain):

```mermaid
graph LR
    subgraph Scope Chain Zanjiri
        Local[Lokal Scope <br> masalan: inner()] -->|Leksik havola| Outer[Tashqi Scope <br> masalan: outer()]
        Outer -->|Leksik havola| Global[Global Scope]
    end
    
    Lookup[O'zgaruvchini qidirish oqimi] -.-> Local
    Local -.->|Topilmasa| Outer
    Outer -.->|Topilmasa| Global
    Global -.->|Topilmasa| RefErr[ReferenceError]
```

---

## 7. 📝 12 ta Mini Test

Dars yakunida olingan bilimlaringizni mustahkamlash va tekshirish uchun tayyorlangan 12 ta test savollari.

---

## 8. 🎯 Real Project Case Study

### Modul Pattern yordamida Ma'lumotlarni Izolyatsiya qilish (State Registry)
Katta loyihalarda global scope-ning ifloslanishini oldini olish va maxfiy ma'lumotlarni himoya qilish uchun funksiya scope va block scope-dan foydalaniladi (Module Pattern). Quyidagi misolda xavfsiz tizim konfiguratsiyasi yaratilgan:

```javascript
// Immediately Invoked Function Expression (IIFE) va Scope yordamida yopiq muhit yaratish
const AppConfig = (function() {
  // Ushbu o'zgaruvchi global scope-dan butunlay yashiringan (private)
  const systemSettings = {
    apiKey: "SECURE_12345_API_KEY",
    apiBaseUrl: "https://api.myproject.com/v1",
    maxConnections: 5
  };

  // Faqat ruxsat berilgan amallarnigina tashqariga obyekt sifatida chiqaramiz
  return {
    getSetting(key) {
      // Tizim ichki konfiguratsiyasini o'qish (Leksik qamrov orqali kirish)
      if (key in systemSettings) {
        return systemSettings[key];
      }
      return null;
    },
    updateConnectionLimit(newLimit) {
      if (typeof newLimit === "number" && newLimit > 0) {
        systemSettings.maxConnections = newLimit;
        console.log(`Ulanishlar soni yangilandi: ${systemSettings.maxConnections}`);
      } else {
        console.error("Noto'g'ri qiymat kiritildi!");
      }
    }
  };
})();

// Foydalanish:
console.log(AppConfig.getSetting("apiBaseUrl")); // "https://api.myproject.com/v1"
AppConfig.updateConnectionLimit(10); // "Ulanishlar soni yangilandi: 10"

// Global scope-dan to'g'ridan-to'g'ri systemSettings obyektiga kirib bo'lmaydi:
console.log(typeof systemSettings); // "undefined"
console.log(AppConfig.systemSettings); // undefined
```

---

## 9. 🚀 Performance va Optimization

* **Global qamrovdan kamroq foydalaning:** Global o'zgaruvchilarni o'qish va yozish nisbatan sekinroq kechadi, chunki dvigatel zanjirning eng oxirigacha borishi kerak. Ko'p ishlatiladigan global qiymatlarni lokal o'zgaruvchilarga keshlab oling.
* **Xotira oqishini (Memory Leak) nazorat qiling:** Keraksiz bo'lgan global o'zgaruvchilar sahifa yopilguncha xotirada qoladi. Ularni `null` ga tenglash orqali Garbage Collector-ga yordam bering.
* **`with` va `eval` operatorlaridan voz keching:** Ushbu operatorlar dinamik scope yaratadi. Bu esa JavaScript dvigatellarining JIT (Just-In-Time) optimallashtirish jarayonlarini butunlay buzadi va kod ishlashini sezilarli darajada sekinlashtiradi.

---

## 10. 📌 Cheat Sheet

| Qamrov Turi | Qayerda e'lon qilinadi | Qayerda amal qiladi | Kalit So'zlar |
| :--- | :--- | :--- | :--- |
| **Global Scope** | Har qanday funksiya yoki blokdan tashqarida | Butun dastur davomida istalgan joyda | `let`, `const`, `var` |
| **Function Scope** | Funksiya bloki `{}` ichida | Faqat shu funksiya ichida | `let`, `const`, `var` |
| **Block Scope** | Oddiy bloklar `{}` (if, for, while) ichida | Faqat shu blok ichida | `let`, `const` |
| **Shadowing** | Ichki qamrovda tashqi qamrovdagi nom bilan | Faqat ichki qamrov doirasida | Yangi e'lon qilish orqali |
| **Scope Chain** | Ichma-ich qamrovlarda | Lokal -> Tashqi -> Global | Qidiruv mexanizmi |
