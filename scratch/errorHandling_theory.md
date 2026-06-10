## 1. 💡 Sodda Tushuntirish va Analogiya

### Xatolarni Boshqarish nima?
Dasturlashda xatolar muqarrar. Foydalanuvchi noto'g'ri ma'lumot kiritishi, internet uzilib qolishi yoki server noto'g'ri javob qaytarishi mumkin. **try...catch...finally** bloklari — bu JavaScript-da xatolarni oldindan ko'ra bilish va dastur butunlay to'xtab qolishining (crash bo'lishining) oldini olish mexanizmidir.
* **try (urinib ko'rish):** Xavfli bo'lgan, ya'ni xato berishi mumkin bo'lgan kodlar yoziladigan blok.
* **catch (tutib olish):** Agar `try` ichida xatolik yuz bersa, dastur to'xtamaydi, balki boshqaruv darhol `catch` blokiga o'tadi. U yerda xato haqida ma'lumot (`error` obyekti) mavjud bo'ladi.
* **finally (oxir-oqibat):** Xato yuz berishidan qat'i nazar, har qanday holatda ham eng oxirida bajariladigan blok.
* **throw (otish):** Dasturchi o'zi xohlagan shart asosida sun'iy xatolik yaratib, uni otib yuborishi.

### Real hayotiy analogiya
Tasavvur qiling, siz **mashinada sayohatga chiqyapsiz**:
* **try:** Mashinani haydash jarayoni. Yo'lda g'ildirak teshilishi yoki motor buzilishi mumkin.
* **catch:** Zaxira g'ildirak (zapaska) yoki evakuator xizmati. Agar mashina buzilsa, siz sayohatni butunlay to'xtatmaysiz, zaxira reja ishga tushadi.
* **finally:** Sayohat qanday tugashidan qat'i nazar (mashina buziladimi yoki manzilga eson-omon yetib borasizmi), siz baribir kun oxirida mashinadan tushib, dam olasiz.
* **throw:** Siz yo'lga chiqishdan oldin benzin datchigiga qaraysiz va agar benzin tugayotgan bo'lsa, "Yo'lga chiqib bo'lmaydi!" deb sayohatni taqiqlaysiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (try...catch...finally)
Matnni JSON formatiga o'girishda xatolikni boshqarish:
```javascript
function parseUserData(jsonString) {
  try {
    console.log("JSON parsing boshlandi...");
    const user = JSON.parse(jsonString);
    console.log("Muvaffaqiyatli o'qildi:", user.name);
    return user;
  } catch (error) {
    console.error("Xatolik aniqlandi! Xato turi:", error.name);
    console.error("Xato xabari:", error.message);
    return null;
  } finally {
    console.log("Operatsiya yakunlandi."); // har doim ishlaydi
  }
}

parseUserData('{"name": "Ali"}'); // Ishlaydi
parseUserData('{not-a-json}'); // Xatolik yuz beradi, lekin dastur to'xtamaydi
```

### 2. Intermediate Example (throw va Custom Errors)
Yoshni tekshirish va maxsus xatolik otish:
```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function registerUser(age) {
  if (typeof age !== 'number') {
    throw new TypeError("Yosh faqat son bo'lishi kerak!");
  }
  if (age < 18) {
    throw new ValidationError("Ro'yxatdan o'tish uchun yosh 18 dan kichik bo'lmasligi kerak!");
  }
  return "Muvaffaqiyatli ro'yxatdan o'tdingiz!";
}

try {
  registerUser(15);
} catch (err) {
  if (err instanceof ValidationError) {
    console.warn("Validatsiya xatosi:", err.message);
  } else {
    console.error("Tizim xatosi:", err.message);
  }
}
```

### 3. Advanced Example (Asinxron Xatolarni Boshqarish)
Async/await funksiyalarda xatolarni boshqarish:
```javascript
async function fetchWithValidation(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // HTTP xato statusi (masalan 404) yuz bersa, uni qo'lda otamiz
      throw new Error(`Server xatosi: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Tarmoq uzilishi yoki parsing xatolari shu yerda tutiladi
    console.error("Asinxron operatsiyada xatolik:", error.message);
    throw error; // Xatoni yuqori darajaga qayta otish (rethrow)
  }
}
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Dasturning to'liq qulashi (Crash):** JavaScript bir oqimli (single-threaded) bo'lgani uchun, agar kodning biror qismida boshqarilmagan (uncaught) xato yuz bersa, butun skript ishlashdan to'xtaydi. Bu sahifaning qotib qolishiga yoki oq sahifa bo'lib qolishiga sabab bo'ladi.
* **Foydalanuvchi tajribasi (UX):** Foydalanuvchiga texnik xatoliklar (masalan, `TypeError: Cannot read properties of undefined`) o'rniga tushunarli "Nimadir xato ketdi, iltimos qayta urining" degan xabarni ko'rsatish imkonini beradi.
* **Resurslarni tozalash:** Buzilgan ulanishlar, ochiq fayllar yoki yuklash indikatorlarini (spinners) har qanday holatda ham yopish/tozalash imkonini beradi (`finally` yordamida).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Asinxron xatolarni sinxron try-catch ichida tutishga urinish
#### Xato:
```javascript
try {
  setTimeout(() => {
    throw new Error("Kechikkan xato!"); // BU TUTILMAYDI!
  }, 1000);
} catch (e) {
  console.log("Xato tutilmadi:", e);
}
```
*Tushuntirish:* `setTimeout` chaqirilgach, `try-catch` bloki bajarilib bo'ladi va Call Stack-dan chiqib ketadi. Xato esa 1 soniyadan keyin alohida stackda yuz beradi.
#### Tuzatish:
```javascript
setTimeout(() => {
  try {
    throw new Error("Kechikkan xato!");
  } catch (e) {
    console.log("Xato tutildi:", e.message);
  }
}, 1000);
```

### 2. Bo'sh catch bloki (Silent Catch)
#### Xato:
```javascript
try {
  doSomething();
} catch (e) {
  // Hech narsa yozilmagan. Xato yashirib ketildi!
}
```
*Tushuntirish:* Xatoni hech qanday log yoki ogohlantirishsiz yashirish loyihada buglarni topishni juda qiyinlashtiradi.

### 3. Catch bloki ichida xato obyektini satr sifatida otish
#### Noto'g'ri:
`throw "Xatolik yuz berdi";`
#### To'g'ri:
`throw new Error("Xatolik yuz berdi");` (Chunki Error obyekti xato yuz bergan joyning stack trace ma'lumotlarini o'zida saqlaydi).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da qanday standart Error turlari mavjud?
   * **Javob:** `ReferenceError`, `TypeError`, `SyntaxError`, `RangeError`, `URIError`, `EvalError`.
2. **Savol:** `finally` bloki qachon ishlaydi?
   * **Javob:** `finally` bloki `try` ichida xato bo'lishi yoki bo'lmasligidan qat'i nazar, shuningdek `try` yoki `catch` ichida `return` yozilgan bo'lsa ham har doim ishlaydi.
3. **Savol:** Oddiy Error obyektining qanday muhim xossalari bor?
   * **Javob:** `.name` (xato turi), `.message` (xato xabari) va `.stack` (xato qayerda yuz berganini ko'rsatuvchi chaqiriqlar ketma-ketligi).
4. **Savol:** `throw` operatori nima uchun ishlatiladi?
   * **Javob:** Dasturchi tomonidan aniq shartlar asosida yangi xatolik obyekti yaratish va uni otish (dasturni to'xtatish yoki catch-ga yo'naltirish) uchun.

### Middle (5–8)
5. **Savol:** Nima uchun `setTimeout` ichidagi xatolar tashqi `try-catch` tomonidan tutilmaydi?
   * **Javob:** Chunki `setTimeout` asinxron funksiya bo'lib, uning callbacki keyinchalik Event Loop orqali yangi Call Stack-da bajariladi, tashqi `try-catch` esa allaqachon bajarilib tugagan bo'ladi.
6. **Savol:** `throw new Error()` va `throw Error()` farqi nimada?
   * **Javob:** Funktsional jihatdan hech qanday farq yo'q. JavaScript Error-ni `new` kalit so'zisiz chaqirganda ham avtomatik ravishda yangi obyekt yaratadi.
7. **Savol:** Qanday qilib custom (shaxsiy) Error klasslarini yaratish mumkin?
   * **Javob:** Standart `Error` klassidan `extends` kalit so'zi orqali voris olib, `super(message)` ni chaqirish orqali.
8. **Savol:** Agar `catch` va `finally` ikkalasida ham `return` bo'lsa, qaysi biri ustunlik qiladi?
   * **Javob:** `finally` blokidagi `return` har doim ustunlik qiladi va undan oldingi return qiymatlarini felini o'zgartiradi.

### Senior (9–12)
9. **Savol:** Asinxron Promise zanjirida unhandled rejection qanday yuzaga keladi va uni global miqyosda qanday ushlash mumkin?
   * **Javob:** `.catch()` qilinmagan Promise rad etilganda yuz beradi. Brauzerda uni `window.addEventListener('unhandledrejection', callback)` orqali global tutish mumkin.
10. **Savol:** Nima uchun `try-catch` bloklari V8 dvigatelining kodni optimallashtirish (JIT compilation) jarayoniga ta'sir qilishi mumkin?
    * **Javob:** Eski V8 versiyalarida `try-catch` ichidagi funksiyalar optimizatsiya qilinmas edi. Hozirda bu muammo deyarli hal qilingan bo'lsa-da, og'ir funksiyalarni `try-catch` ichida saqlamaslik tavsiya etiladi.
11. **Savol:** Error Cause (Xato sababchisi) nima va u qanday ishlatiladi?
    * **Javob:** ES2022-da kiritilgan bo'lib, xatoni boshqa xatoga o'rayotganda asl xatoni saqlab qolish uchun ishlatiladi: `throw new Error('New error', { cause: originalError })`.
12. **Savol:** Node.js-dagi xatolarni boshqarish bilan brauzerdagi xatolarni boshqarishning qanday arxitekturaviy farqlari bor?
    * **Javob:** Node.js-da boshqarilmagan xato jarayonni (`process.exit(1)`) butunlay to'xtatadi. Brauzerda esa faqat joriy skript oqimi to'xtaydi, foydalanuvchi interfeysi ishlashda davom etishi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali xatolarni boshqarish bo'yicha mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxirida bilimingizni sinash uchun test topshiriqlari taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### JSON formatidagi API javobini xavfsiz o'qish va validatsiya qilish
Ko'pincha serverdan keladigan ma'lumot buzilgan yoki kutilmagan formatda bo'lishi mumkin. Biz xavfsiz parsing funksiyasini yozamiz.

```javascript
function processApiResponse(rawJson) {
  try {
    // 1. JSON parse qilamiz
    const data = JSON.parse(rawJson);
    
    // 2. Formatni tekshiramiz (Validatsiya)
    if (!data.status) {
      throw new Error("API javobida 'status' maydoni yo'q");
    }
    
    if (data.status === 'error') {
      throw new Error(`Server xatolik qaytardi: ${data.message || 'Noma'lum xato'}`);
    }
    
    console.log("API muvaffaqiyatli qayta ishlandi:", data.payload);
    return data.payload;
    
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Format noto'g'ri (JSON SyntaxError):", error.message);
    } else {
      console.error("API xatoligi:", error.message);
    }
    return null; // Dastur qulamaydi, shunchaki null qaytadi
  }
}
```

---

## 9. 🚀 Performance va Optimization

* **Faqat xatolar uchun ishlating:** `try-catch` blokini dasturning normal oqimini (flow control) boshqarish uchun (masalan `if-else` o'rniga) ishlatmang. Xatolarni yaratish va stack trace yig'ish xotira va vaqt jihatidan og'ir operatsiyadir.
* **Try blokini kichik saqlang:** `try` bloki ichida faqat haqiqatan ham xato berishi mumkin bo'lgan operatsiyani (masalan `JSON.parse` yoki `fetch`) yozing. Hamma kodni bitta global `try`ga tiqish xatolik aynan qayerda yuz berganini aniqlashni qiyinlashtiradi.

---

## 10. 📌 Cheat Sheet

| Blok / Buyruq | Vazifasi | Misol |
| :--- | :--- | :--- |
| `try { ... }` | Xato berishi mumkin bo'lgan kod bloki | `try { parseJson(); }` |
| `catch (error) { ... }` | Xato yuz berganda uning tafsilotlarini tutib olish | `catch(e) { console.log(e.message); }` |
| `finally { ... }` | Xato bo'lishidan qat'i nazar oxirida bajariluvchi kod | `finally { hideLoadingSpinner(); }` |
| `throw expression` | Maxsus xatolik yaratib otish | `throw new Error("Ta'qiqlangan!");` |
| `error.stack` | Xato yuz bergan joygacha bo'lgan funksiyalar chaqiruvi | `console.log(err.stack);` |
