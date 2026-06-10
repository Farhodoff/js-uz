## 1. 💡 Sodda Tushuntirish va Analogiya

### Closures va Xotira Boshqaruvi
* **Closures (Yopilishlar):** Birinchi darsda o'rganganimizdek, bu ichki funksiyaning tashqi o'zgaruvchilarni saqlab qolishidir.
* **Xotira boshqaruvi (Memory Management):** Yopilishlar o'zgaruvchilarni xotirada ushlab turar ekan, bu ma'lumotlar **Heap (uyum)** xotirasida saqlanadi. Agarda biz ularni to'g'ri boshqara olmasak, xotirada keraksiz chiqindilar yig'ilib qoladi, bu esa **Memory Leak (xotira oqishi)** ga olib keladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **ijaraga kvartira oldingiz**:
* **Oddiy funksiya:** Siz kvartirani bir necha kunga ijaraga olasiz, ishni tugatgach kalitni topshirib ketasiz. Kvartira egasi uni tozalaydi va boshqaga beradi (Garbage Collection).
* **Closure:** Siz kvartirani ijaraga olib, u yerdagi bir xonani **shaxsiy narsalaringizni saqlash uchun qulflab ketdingiz**. Kvartira egasi siz kalitni qaytarmaguningizcha u xonani tozalay olmaydi va boshqalarga ijaraga berolmaydi. Agar siz o'sha xonadan foydalanmayotgan bo'lsangiz ham, u band bo'lib turaveradi (Memory Leak).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Memoization - Keshlash yordamida optimallashtirish)
Faqat bir marta hisoblab, keyingi safar keshdan olish:
```javascript
function memoizedFactorial() {
  const cache = {}; // Yopilishda saqlanadigan kesh

  return function calculate(n) {
    if (n in cache) {
      console.log("Keshdan olindi:");
      return cache[n];
    }
    console.log("Yangi hisoblandi:");
    if (n <= 1) return 1;
    const result = n * calculate(n - 1);
    cache[n] = result;
    return result;
  };
}

const factorial = memoizedFactorial();
console.log(factorial(5)); // Yangi hisoblandi... -> 120
console.log(factorial(5)); // Keshdan olindi: -> 120
```

### 2. Intermediate Example (Detached DOM Element Memory Leak)
DOM elementi o'chirilgan bo'lsa ham xotirada qolib ketishi muammosi:
```javascript
function setupLeak() {
  const button = document.getElementById("leak-button");
  
  return function handleClick() {
    // button o'zgaruvchisi yopilish ichida saqlanmoqda
    console.log("Bosilgan tugma ID:", button.id);
  };
}

// Keyinchalik DOM-dan tugma o'chirilsa ham, handleClick funksiyasi yashar ekan,
// button xotiradan to'liq o'chib ketmaydi (Detached DOM element).
```

### 3. Advanced Example (Meteor JS mashhur Closure Leak muammosi)
```javascript
let theThing = null;
let replaceThing = function () {
  let originalThing = theThing;
  
  // unused funksiyasi originalThing-ga bog'langan
  let unused = function () {
    if (originalThing) console.log("hi");
  };
  
  theThing = {
    longStr: new Array(1000000).join('*'),
    // someMethod unused bilan bir xil Lexical Environment-ni bo'lishadi!
    someMethod: function () {
      console.log("salom");
    }
  };
};

// Har soniyada replaceThing chaqirilganda xotira tinimsiz o'sib boradi!
setInterval(replaceThing, 1000);
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Heap vs Stack
JavaScript-da oddiy, qisqa muddatli o'zgaruvchilar **Stack** xotirasida saqlanadi. Biroq closures ishtirok etganda, o'zgaruvchilar va ularga tegishli Leksik Muhit (Lexical Environment) **Heap** xotirasiga ko'chiriladi. Chunki JS dvigateli bu o'zgaruvchilarning qancha muddat yashashini oldindan bilolmaydi.

### 2. V8 Garbage Collection va Scope Sharing
Modern V8 dvigateli closures xotirasini optimallashtiradi. Agar ichki funksiyada tashqi o'zgaruvchi ishlatilmasa, u leksik muhitdan o'chiriladi.
Biroq, agar bitta tashqi funksiyada ikkita ichki funksiya yaratilsa va ulardan faqat bittasi tashqi o'zgaruvchidan foydalansa ham, **ikkala funksiya bitta umumiy Lexical Environment obyekti bilan bog'lanadi**. Bu degani, ikkinchi funksiya global miqyosda saqlansa, birinchisidagi ishlatilmagan o'zgaruvchi ham o'chmay xotirada qolib ketaveradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `setInterval` / `setTimeout` ichidagi closures havolasini uzmaslik
#### Muammo:
`setInterval` har doim o'zining callback-ini xotirada saqlaydi va unga ulanib qolgan barcha o'zgaruvchilarni ham tozalanishdan to'sib turadi.
#### Tuzatish:
Sikl yoki vaqt tugagandan so'ng intervalni tozalash (`clearInterval`) va closures-ga bo'lgan havolalarni `null` qilish zarur.

### 2. `eval()` dan foydalanish va xotirani optimallashtira olmaslik
`eval()` ishlatilgan funksiyada JS dvigateli hech qaysi o'zgaruvchini optimallashtira olmaydi. Barcha o'zgaruvchilar xotirada qolib ketadi.
#### Tavsiya:
Dynamic eval() ishlatishdan qat'iyan qoching.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Heap va Stack farqi nima?
   * **Javob:** Stack — tezkor, kichik hajmli va sinxron ishlovchi xotira. Heap — dynamic o'lchamli, obyektlar va closures saqlanadigan xotira.
2. **Savol:** Garbage Collector closures-ni qachon tozalaydi?
   * **Javob:** Ichki funksiyaga bo'lgan barcha havolalar `null` bo'lganda yoki butunlay yo'q qilinganda.
3. **Savol:** Nima uchun `const` ishlatganda ham xotira oqishi mumkin?
   * **Javob:** `const` faqat o'zgaruvchining qayta tayinlanishini (reassignment) taqiqlaydi, lekin uning ichidagi obyektlar o'zgarishi va closures xotirada qolishi mumkin.
4. **Savol:** Xotira oqishi (Memory Leak) nima?
   * **Javob:** Endi kerak bo'lmagan, lekin dasturdagi havolalar uzilmagani sababli RAM xotiradan tozalanmay qolgan ma'lumotlar.

### Middle
5. **Savol:** Detached DOM element nima va closures unga qanday bog'liq?
   * **Javob:** DOM-dan o'chirilgan, lekin JS-dagi closure ichida hali ham havolasi saqlanib qolgan elementlar.
6. **Savol:** Chrome DevTools yordamida memory leak qanday topiladi?
   * **Javob:** Memory bo'limida Heap Snapshot olib, "detached" yoki closures havolalarining soni oshib borishini tekshirish orqali.
7. **Savol:** `WeakMap` va `WeakSet` nima va u closures muammolarini qanday yengillashtiradi?
   * **Javob:** Ular o'zlarining kalitlarini kuchsiz havola (weak reference) orqali ushlab turadi va bu obyektlar boshqa joyda ishlatilmay qolsa, closures ularni xotirada ushlab qololmaydi, avtomat tozalanadi.
8. **Savol:** Closures ishlatilganda xotira hajmi oshishining sababi nimada?
   * **Javob:** Chunki har bir closure o'zining butun leksik muhit (scope) zanjirini Heap xotirasida saqlashga majbur qiladi.

### Senior
9. **Savol:** Meteor JS dagi yopilish xotirasi oqishi (Scope sharing leak) qanday ishlaydi?
   * **Javob:** Agar bitta funksiya ichida ikkita closure bo'lsa va biri katta obyektdan foydalansa, ikkinchisi esa global context-da saqlanib qolsa, ikkalasi bitta Lexical Environment obyektini bo'lishgani uchun katta obyekt ham xotiradan o'chmaydi.
10. **Savol:** V8 dvigatelidagi `Context` obyekti closures uchun qanday yaratiladi?
    * **Javob:** Har safar closures bo'lgan funksiya chaqirilganda, V8 Heap xotirada dynamic `Context` obyektini yaratadi va faqat closure-da ishlatilgan o'zgaruvchilarnigina unga ko'chiradi.
11. **Savol:** `new Function()` closures yaratishga qodirmi va nima uchun?
    * **Javob:** Yo'q, chunki u runtime paytida global scope-da e'lon qilinadi va o'zi yaratilgan lokal funksiyaning Leksik Muhitini ko'rmaydi.
12. **Savol:** Closures-ni optimallashtirish uchun JavaScript-da Factory pattern o'rniga Class ishlatish qachon samaraliroq?
    * **Javob:** Agar obyektlar juda ko'p yaratilsa, Class metodlari prototipda yozilgani uchun xotirani tejaydi. Factory pattern esa closures orqali xususiy o'zgaruvchilar yaratar ekan, har safar yangi xotira talab qiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda keshlovchi yordamchi funksiyalar (memoize), qisman qo'llash (partial) va bir marta ishlovchi (once) tizimlarni yozasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi xotira boshqaruvi va advanced closures bo'yicha testlar.

---

## 8. 🎯 Real Project Case Study

### Xavfsiz Kesh tizimi (Memory Safe Cache Manager)
Katta hajmdagi ma'lumotlarni vaqtincha keshlovchi, lekin xotira to'lib ketmasligi uchun `WeakMap` va closures yordamida avtomatik tozalanadigan tizim tuzamiz.

```javascript
function createMemorySafeCache() {
  // WeakMap kalitlari obyekt bo'lishi shart va ular GC tomonidan avtomat tozalanadi
  const cache = new WeakMap();

  return {
    get(keyObj) {
      return cache.get(keyObj);
    },
    set(keyObj, value) {
      cache.set(keyObj, value);
    },
    has(keyObj) {
      return cache.has(keyObj);
    }
  };
}

// Foydalanish:
let userSession = { token: "XYZ123" };
const sessionCache = createMemorySafeCache();

sessionCache.set(userSession, { role: "admin", logTime: Date.now() });

// Foydalanuvchi tizimdan chiqsa:
userSession = null; // Havola uzildi, WeakMap keshdagi ma'lumotlar avtomat tozalanadi
```

---

## 9. 🚀 Performance va Optimization

* **Factory vs Classes:** Private o'zgaruvchilar xotirada qimmat turadi. Agar minglab nusxalar kerak bo'lsa, closures emas, `#` private sintaksisiga ega `class`lardan foydalaning.
* **GC Timing:** Garbage Collection qachon ishlashi aniq emas (non-deterministic). Shuning uchun havolalarni zudlik bilan tozalash muhim.

---

## 10. 📌 Cheat Sheet

| Muammo / Konsept | Sababi | Yechimi |
| :--- | :--- | :--- |
| **Detached DOM** | Yopilish ichida DOM element saqlanishi | Element o'chganda closuredagi havolani `null` qilish |
| **Shared Scope Leak** | Closures bitta Leksik Muhitni bo'lishishi | Keraksiz closures havolalarini uzish |
| **WeakMap** | Oddiy Map xotirada ushlab turadi | Kuchsiz havolalardan foydalanish |
| **new Function** | Scope chain yo'qligi | Faqat global scope-ga ehtiyoj bo'lganda ishlatish |
