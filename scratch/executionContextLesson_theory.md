## 1. 💡 Sodda Tushuntirish va Analogiya

### Bajarilish Konteksti (Execution Context) nima?
**Bajarilish Konteksti (Execution Context)** — bu JavaScript kodi bajariladigan, uning barcha o'zgaruvchilari, funksiyalari, doiralari (scopes) va `this` kalit so'zi qiymatlari saqlanadigan va boshqariladigan **maxsus muhit (kontekst)**. JavaScript-da har qanday kod har doim qandaydir bajarilish konteksti ichida ishlaydi.

JavaScript-da uchta asosiy kontekst turi mavjud:
1. **Global Bajarilish Konteksti (GEC):** Har qanday JS kodi ishga tushganda yaratiladigan birlamchi kontekst. U faqat bitta bo'ladi va global obyektni (`window` yoki `global`) hamda `this`ni yaratadi.
2. **Funksiya Bajarilish Konteksti (FEC):** Har safar biror funksiya chaqirilganda (ishga tushirilganda) o'sha funksiya uchun alohida dynamic yaratiladigan kontekst.
3. **Eval Konteksti:** `eval()` funksiyasi ichidagi kod bajariladigan kontekst (xavfsizlik sababli deyarli ishlatilmaydi).

---

### Real hayotiy analogiya: Oshxona va Shaxsiy Reseptlar
Tasavvur qiling, siz **professional oshpazsiz** va katta oshxonada ishlayapsiz:

* **Global Bajarilish Konteksti (GEC):** Bu butun boshli **oshxona**. Oshxonada hamma uchun umumiy bo'lgan jihozlar (plita, suv, muzlatgich) va umumiy ziravorlar (global o'zgaruvchilar) bor. Siz oshxonaga kirishingiz bilan bu muhit tayyor turadi.
* **Funksiya Bajarilish Konteksti (FEC):** Siz maxsus taom, masalan, **"Shokoladli Tort"** tayyorlashga buyurtma oldingiz. Siz tort tayyorlash uchun alohida stolga o'tasiz va faqat shu tortga tegishli bo'lgan ingredientlarni (tuxum, un, shokolad - local o'zgaruvchilar va parametrlar) yig'asiz. Tortni tayyorlab bo'lgach, siz bu stolni tozalaysiz (kontekst o'chiriladi) va yana umumiy oshxona (GEC) ishiga qaytasiz.
* **Call Stack (Chaqiriqlar Steki):** Bu sizning stolingizdagi **reseptlar dasta-varag'i (stack)**. 
  1. Birinchi bo'lib oshxonaga kirdingiz (GEC stakning tagida).
  2. Tort reseptini oldingiz va uni GEC ustiga qo'ydingiz (`bakeCake()`).
  3. Tort ichiga krem tayyorlash kerak bo'lib qoldi. Siz tort reseptini to'xtatib turib, krem tayyorlash reseptini uning ustiga qo'ydingiz (`makeCream()`).
  4. Krem tayyor bo'lgach, uning reseptini stakdan olib tashlaysiz (pop) va yana tort pishirishga qaytasiz.
  5. Tort pishib bo'lgach, uning ham reseptini olib tashlaysiz. Stolingizda faqat umumiy oshxona ishlari qoladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global va Funksiya Konteksti)
Sodda o'zgaruvchilar va funksiya chaqiruvi orqali kontekst yaratilishi:
```javascript
// GEC (Global Execution Context) yaratildi
let developer = "Sardor"; 

function welcome(name) {
  // FEC (Function Execution Context) yaratildi
  let message = "Salom, " + name; 
  return message; 
  // FEC stackdan chiqib ketadi va yo'q qilinadi
}

console.log(welcome(developer));
```

### 2. Intermediate Example (Ichma-ich funksiyalar va Chaqiriqlar Steki)
Ichma-ich funksiya chaqirilganda stakning o'zgarishi:
```javascript
function greet() {
  console.log("Greet boshlandi");
  sayName(); // Yangi kontekst stakka qo'shiladi
  console.log("Greet tugadi");
}

function sayName() {
  console.log("Mening ismim Sardor");
}

greet();
// Konsoldagi natija:
// Greet boshlandi
// Mening ismim Sardor
// Greet tugadi
```

### 3. Advanced Example (Hoisting va Kontekst Fazalari)
Creation Phase (Yaratilish fazasi) da `var` va `let` o'zgaruvchilarining xatti-harakati:
```javascript
console.log(city); // undefined (var hoisted bo'lib, initsializatsiya qilingan)
// console.log(country); // ReferenceError: Cannot access 'country' before initialization (let hoisted, lekin initsializatsiya qilinmagan - TDZ da)

var city = "Toshkent";
let country = "O'zbekiston";

// Funksiya e'loni (Function Declaration) to'liq hoisting bo'ladi
sayHello(); // "Salom!" deb konsolga chiqadi

function sayHello() {
  console.log("Salom!");
}
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

JavaScript dvigateli (masalan, V8) kodni bajarishdan oldin har bir Bajarilish Kontekstini **ikki bosqichda** yaratadi va boshqaradi:

### 1. Creation Phase (Yaratilish Bosqichi)
Kodni bajarishdan oldin, dvigatel kontekst tarkibini tuzib chiqadi:
* **Lexical Environment (Leksik Muhit) yaratiladi:**
  * **Environment Record:** `let`, `const` o'zgaruvchilar, funksiya argumentlari (parametrlar) va ichki funksiyalar e'lonlari saqlanadi. Ular xotirada joylashadi, lekin initsializatsiya qilinmaydi (Temporal Dead Zone).
  * **Outer Reference (Tashqi havola):** Scope Chain-ni hosil qilish uchun tashqi (parent) leksik muhitga havola yaratiladi.
  * **`this` binding:** `this` kalit so'zining qiymati aniqlanadi va bog'lanadi.
* **Variable Environment (O'zgaruvchilar Muhiti) yaratiladi:**
  * Faqat `var` yordamida e'lon qilingan o'zgaruvchilar saqlanadi va ularga boshlang'ich qiymat sifatida darhol `undefined` biriktiriladi (Hoisting).

### 2. Execution Phase (Bajarilish Bosqichi)
Bu bosqichda JS dvigateli kodni yuqoridan pastga qarab satrma-satr ishga tushiradi:
* O'zgaruvchilarga haqiqiy qiymatlari biriktiriladi (`city = "Toshkent"`).
* Funksiyalar chaqiriladi va bajariladi.

---

### Call Stack va LIFO (Last In First Out)
JavaScript bir vaqtning o'zida faqat bitta amal bajara oladigan (Single-Threaded) til bo'lganligi sababli, bajarilish kontekstlarini tartiblash uchun **Call Stack**-dan foydalanadi. Chaqirilgan funksiyalar stack-ga push qilinadi va bajarib bo'lingach stakdan pop (o'chirib tashlash) qilinadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Temporal Dead Zone (TDZ) ga tushib qolish
* **Noto'g'ri (Error beradi):**
  ```javascript
  function showPrice() {
    console.log(price); // ReferenceError: Cannot access 'price' before initialization
    let price = 100;
  }
  showPrice();
  ```
  *Junior xatosi:* "Let ham hoisting bo'ladi, nega undefined qaytarmadi?" deb o'ylash. Aslida, `let` va `const` yaratilish bosqichida xotiradan joy oladi, lekin ularga e'lon qilingan qatorgacha murojaat qilib bo'lmaydi (TDZ).
* **To'g'ri:**
  ```javascript
  function showPrice() {
    let price = 100;
    console.log(price); // 100
  }
  showPrice();
  ```

### 2. Cheksiz rekursiya sababli Stack Overflow xatosi
* **Noto'g'ri (Dastur qotib qoladi):**
  ```javascript
  function runForever() {
    runForever(); // To'xtash shartisiz o'zini chaqirmoqda
  }
  runForever(); // RangeError: Maximum call stack size exceeded
  ```
  Har bir chaqiruv Call Stack-ga yangi FEC qo'shadi. Stack to'lib ketgach, JS dvigateli xatolik bilan dasturni to'xtatadi.
* **To'g'ri:**
  ```javascript
  function runSafely(counter) {
    if (counter <= 0) return; // To'xtash sharti (Base case)
    runSafely(counter - 1);
  }
  runSafely(5);
  ```

### 3. Blok Scope va Kontekstni adashtirish
* **Xato tushuncha:** `if` yoki `for` bloklari yangi Bajarilish Kontekstini yaratadi deb o'ylash.
  *Haqiqat:* Bloklar (`{ ... }`) faqat yangi **Block Lexical Environment** yaratadi, lekin alohida Bajarilish Konteksti (Execution Context) yaratmaydi. Faqat funksiya chaqirilgandagina yangi FEC hosil bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1–4)
1. **Savol:** Bajarilish Konteksti (Execution Context) nima?
   * **Javob:** Bu JavaScript kodi bajariladigan, o'zgaruvchilar, scope va `this` qiymati saqlanadigan maxsus muhitdir.
2. **Savol:** JavaScript-da qanday asosiy kontekstlar bor?
   * **Javob:** Global Bajarilish Konteksti (GEC) va Funksiya Bajarilish Konteksti (FEC).
3. **Savol:** Call Stack nima va u qanday tartibda ishlaydi?
   * **Javob:** Call Stack - bu joriy bajarilayotgan kontekstlarni kuzatib boruvchi mexanizm. U LIFO (Last In First Out - oxirgi kirgan birinchi chiqadi) printsipi asosida ishlaydi.
4. **Savol:** Funksiya bajarilib bo'lingach, uning konteksti bilan nima sodir bo'ladi?
   * **Javob:** U Call Stack-dan chiqariladi (pop) va o'chiriladi (agar closure tomonidan xotirada ushlab turilmagan bo'lsa).

### Middle Darajasi (5–8)
5. **Savol:** Yaratilish bosqichi (Creation Phase) va Bajarilish bosqichi (Execution Phase) farqi nimada?
   * **Javob:** Creation Phase-da xotiradan o'zgaruvchi va funksiyalar uchun joy ajratiladi, outer reference va `this` aniqlanadi. Execution Phase-da esa kod satrma-satr bajarilib, o'zgaruvchilarga qiymat yuklanadi.
6. **Savol:** Nima uchun `var` o'zgaruvchisi e'londan oldin chaqirilganda `undefined` beradi, `let` esa xatolik beradi?
   * **Javob:** `var` yaratilish bosqichida `undefined` qiymati bilan initsializatsiya qilinadi. `let` esa xotiradan joy oladi, lekin initsializatsiya qilinmaydi va e'lon qilinishigacha Temporal Dead Zone (TDZ) da bo'ladi.
7. **Savol:** Scope Chain nima va u Bajarilish Konteksti bilan qanday bog'liq?
   * **Javob:** Har bir kontekst o'zining Leksik Muhitiga ega va unda tashqi muhitga havola (`outer reference`) bo'ladi. O'zgaruvchi joriy kontekstdan topilmasa, tashqi havola orqali zanjir bo'ylab Global kontekstgacha izlanadi. Bu Scope Chain deyiladi.
8. **Savol:** Bajarilish konteksti va Scope (Sfera) o'rtasidagi farq nimada?
   * **Javob:** Scope (Sfera) - bu kod yozilayotgan paytda (fizik joylashuvida) o'zgaruvchilarning ko'rinish chegarasidir. Execution Context esa runtime (kod ishga tushganda) yaratiladigan va scope chain, `this` hamda o'zgaruvchilarni o'z ichiga oluvchi amaliy muhitdir.

### Senior Darajasi (9–12)
9. **Savol:** Variable Environment va Lexical Environment o'rtasidagi farq nima?
   * **Javob:** `Lexical Environment` `let`, `const` o'zgaruvchilarini, block scope-larni va funksiya parametrlarini saqlaydi. `Variable Environment` esa faqat `var` kalit so'zi bilan e'lon qilingan o'zgaruvchilarni saqlaydi.
10. **Savol:** Funksiya stakdan o'chirilgandan keyin ham uning leksik muhiti xotirada qanday saqlanib qolishi mumkin? (Closures muammosi)
    * **Javob:** Agar funksiya ichidan qaytarilgan boshqa bir ichki funksiya tashqi o'zgaruvchilarga murojaat qilsa (closure), JS Garbage Collector ushbu tashqi funksiyaning Leksik Muhitini xotiradan o'chirmaydi, chunki unga havola (reference) saqlanib qolgan bo'ladi.
11. **Savol:** Call Stack to'lib ketishining (Stack Overflow) oldini olish uchun qanday amaliy choralar ko'riladi?
    * **Javob:** Rekursiv amallarni sikllarga (iteration) o'tkazish, Tail Call Optimization (TCO) dan foydalanish (agar brauzer qo'llab-quvvatlasa) yoki asinxron yondashuv (`setTimeout`, `Promise`) orqali chaqiriqlarni Event Loop-ga o'tkazib stakni bo'shatish.
12. **Savol:** Asinxron funksiyalar va callbacklar Call Stack-ga qanday ta'sir qiladi?
    * **Javob:** Asinxron amallar Call Stack-ga to'g'ridan-to'g'ri kirmaydi. Ular brauzer API orqali bajarilib, keyin Callback Queue-ga tushadi. Event Loop faqat Call Stack butunlay bo'shaganidan keyingina ularni stakka o'tkazadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi global koddan boshlab ichma-ich funksiyalar chaqirilishi va ular bajarilib bo'lgach stakdan o'chirilishi jarayonini (LIFO printsipi) ko'rsatadi:

```mermaid
graph TD
    subgraph Call Stack LIFO Bajarilishi
        direction TB
        
        step1["1. Dars boshlanishi <br/> [ Global Context (GEC) ] <br/> (Stack tagida Global doim turadi)"]
        step2["2. outer() chaqirilganda <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ]"]
        step3["3. inner() chaqirilganda <br/> [ inner() FEC ] <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ] <br/> (Stack cho'qqisi)"]
        step4["4. inner() tugagach (Pop) <br/> [ outer() FEC ] <br/> [ Global Context (GEC) ] <br/> (inner xotiradan o'chdi)"]
        step5["5. outer() tugagach (Pop) <br/> [ Global Context (GEC) ] <br/> (outer xotiradan o'chdi)"]
        step6["6. Dastur butunlay tugagach <br/> [ (Bo'sh Stack) ]"]

        step1 -->|Push outer()| step2
        step2 -->|Push inner()| step3
        step3 -->|Pop inner()| step4
        step4 -->|Pop outer()| step5
        step5 -->|Pop GEC| step6
    end
```

### Amaliy mashq uchun kod namunasi:
Yuqoridagi diagrammaga mos keluvchi JavaScript kodi:
```javascript
function inner() {
  console.log("inner bajarilmoqda");
}

function outer() {
  console.log("outer boshlandi");
  inner();
  console.log("outer tugadi");
}

outer();
```

---

## 7. 📝 12 ta Mini Test

Darsimizning quizzes bo'limida Bajarilish Konteksti, hoisting, stack overflow, leksik muhit va `this` bog'lanishi bo'yicha tayyorlangan 12 ta test savolini yechib, bilimingizni tekshirib ko'ring. Har bir savolda to'g'ri javob bilan birga batafsil tushuntirish berilgan.

---

## 8. 🎯 Real Project Case Study

### Rekursiya chuqurligi limitini va Call Stack to'lib ketishini boshqarish
Real loyihalarda, masalan, fayllar tizimini (folder tree) yoki murakkab JSON daraxtlarni parsing qilishda rekursiyadan foydalaniladi. Agar daraxt juda chuqur bo'lsa (minglab darajalar), stack overflow xatosi yuz beradi.

Buning oldini olish uchun loyihalarda **Iterativ yondashuv (Stack-ni array yordamida simulyatsiya qilish)** ishlatiladi. Bu xotirani Call Stack-dan Heap (xotira ombori)ga o'tkazadi, chunki Heap hajmi stakka qaraganda ancha katta.

#### Rekursiv (Stack Overflow xavfi bor) usul:
```javascript
function traverseDirectoryRecursive(node) {
  console.log("Joriy papka:", node.name);
  if (node.children) {
    node.children.forEach(child => traverseDirectoryRecursive(child));
  }
}
```

#### Iterativ (Xavfsiz va Call Stack-ni to'ldirmaydigan) usul:
```javascript
function traverseDirectoryIterative(rootNode) {
  // Biz xotiraning heap qismida o'z stack-imizni (massiv) yaratamiz
  const stack = [rootNode];

  while (stack.length > 0) {
    const currentNode = stack.pop(); // Oxirgi qo'shilgan elementni olamiz
    console.log("Joriy papka:", currentNode.name);

    if (currentNode.children) {
      // Bolalarini stack-ga qo'shamiz, bu Call Stack-ga og'irlik solmaydi
      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        stack.push(currentNode.children[i]);
      }
    }
  }
}
```

> [!IMPORTANT]
> Loyihalarda chuqur ma'lumotlarni qayta ishlashda iterativ stack yoki asinxron bo'laklash (`setTimeout` / `requestAnimationFrame`) yordamida Call Stack-ni bo'shatib turish tavsiya etiladi.

---

## 9. 🚀 Performance va Optimization

1. **Closures tufayli xotira leaks (Memory Leaks):**
   Qachonki ichki funksiya tashqi o'zgaruvchilarga murojaat qilsa, ota funksiya konteksti stakdan o'chsa ham uning leksik muhiti xotirada (Heap) saqlanib qoladi. Keraksiz closures ishlatish xotirani band qiladi. Ishlatib bo'lingach, bog'lanishni uzish uchun o'zgaruvchini `null` ga tenglash tavsiya etiladi.
2. **Deep Stack Traces samaradorligi:**
   Xatolik yuz berganda brauzer konsolga `Error.stack` (Stack Trace) chiqaradi. Deep nesting (chuqur ketma-ket chaqiriqlar) bo'lgan loyihalarda stack trace-ni yig'ish va render qilish biroz resurs talab qiladi. Dvigatellarda stack trace limiti bo'ladi (sukut bo'yicha Chrome-da 10 ta freym).
3. **Tail Call Optimization (TCO):**
   ES6 standartida agar rekursiv chaqiruv funksiyaning eng oxirgi amali (return) bo'lsa, dvigatel yangi stack freym yaratmasdan joriy freymni qayta ishlatishi mumkin. Biroq, bu optimallash hozircha faqat ba'zi dvigatellarda (masalan, Safari's JavaScriptCore) to'liq qo'llab-quvvatlanadi.

---

## 10. 📌 Cheat Sheet

| Kontekst/Muhit | Qachon yaratiladi? | Nimalarni saqlaydi? | Stack-dagi o'rni |
| :--- | :--- | :--- | :--- |
| **Global Context (GEC)** | Skript yuklanib ishga tushganda | Global obyekt (`window`), `this`, global o'zgaruvchilar | Har doim eng tagida joylashadi |
| **Function Context (FEC)** | Funksiya chaqirilganda (`fn()`) | Argumentlar, local o'zgaruvchilar, `this`, outer reference | Chaqirilganda tepaga qo'shiladi (push), tugagach o'chiriladi (pop) |
| **Lexical Environment** | Kontekst yaratilish bosqichida | `let`, `const`, funksiya e'lonlari, tashqi scope havolasi | Kontekstning ichki tarkibiy qismi |
| **Variable Environment** | Kontekst yaratilish bosqichida | Faqat `var` bilan e'lon qilingan o'zgaruvchilar | Kontekstning ichki tarkibiy qismi |
