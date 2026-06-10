## 1. 💡 Sodda Tushuntirish va Analogiya

### Metadasturlash (Metaprogramming), Proxy va Reflect nima?
* **Metadasturlash (Metaprogramming):** Dasturning o'z-o'zini o'zgartirishi, tekshirishi yoki boshqa kodlarni boshqarishi bilan bog'liq dasturlash yondashuvidir. Ya'ni, dastur faqat ma'lumotlar bilan emas, balki kodning tuzilishi va xatti-harakati bilan ishlaydi.
* **Proxy (Vakil):** JavaScript-da obyekt atrofida o'ralgan maxsus qobiq (vakil) bo'lib, u obyekt ustida bajariladigan barcha operatsiyalarni (xususiyatni o'qish, qiymat yozish, o'chirish va h.k.) o'z nazoratiga oladi.
* **Reflect:** JavaScript-ning o'rnatilgan obyekti bo'lib, obyektlar bilan ishlashning standart metodlarini taqdim etadi. Proxy ichidagi "trap" (tutuvchi) funksiyalarni asl obyektga xavfsiz yo'naltirish uchun xizmat qiladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **mashhur shaxs (VIP)** bilan bog'lanmoqchisiz:
* **Proxy-siz usul:** Siz to'g'ridan-to'g'ri VIP shaxsga murojaat qilasiz. U bevosita javob beradi (hech qanday nazoratsiz yoki filtrsiz).
* **Proxy va Reflect usuli:** VIP shaxs o'ziga **shaxsiy yordamchi (Proxy)** yollaydi. Endi siz VIP shaxsga bermoqchi bo'lgan har bir savolingizni avval yordamchiga berishingiz kerak:
  * Agar siz VIP shaxsdan "telefon raqami"ni so'rasangiz (`get`), yordamchi buni tekshirib, "Raqamni berish taqiqlangan" deb javob beradi yoki VIP shaxsdan so'rab (`Reflect.get`) sizga yetkazadi.
  * Agar siz VIP shaxsning jadvaliga uchrashuv yozmoqchi bo'lsangiz (`set`), yordamchi avval uchrashuv vaqtini tekshiradi, agar bo'sh bo'lsa, jadvalga kiritadi (`Reflect.set`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Xususiyatni o'qishni o'zgartirish)
Obyektda mavjud bo'lmagan xususiyat so'ralganda xatolik berish o'rniga default qiymat qaytaruvchi Proxy:
```javascript
const user = {
  name: "Jasur",
  age: 25
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    // Agar xususiyat obyektda bo'lsa, o'zini qaytaradi, aks holda xabar beradi
    return prop in target ? target[prop] : `Xususiyat '${prop}' mavjud emas!`;
  }
});

console.log(userProxy.name); // Jasur
console.log(userProxy.email); // Xususiyat 'email' mavjud emas!
```

### 2. Intermediate Example (Validatsiya va Reflect)
Reflect yordamida yozish operatsiyasini nazorat qilish va tekshirish:
```javascript
const car = {
  brand: "Tesla",
  speed: 0
};

const carProxy = new Proxy(car, {
  set(target, prop, value, receiver) {
    if (prop === "speed") {
      if (typeof value !== "number" || value < 0) {
        throw new Error("Tezlik faqat musbat son bo'lishi kerak!");
      }
    }
    // Reflect yordamida asl obyektga yozish amalini to'g'ri bajaramiz
    return Reflect.set(target, prop, value, receiver);
  }
});

carProxy.speed = 100; // Muvaffaqiyatli
console.log(car.speed); // 100
// carProxy.speed = -50; // Error: Tezlik faqat musbat son bo'lishi kerak!
```

### 3. Advanced Example (Vaqtinchalik / Revocable Proxy)
Ma'lum vaqtdan keyin yoki kerak bo'lganda butunlay o'chiriladigan (revoke qilinadigan) xavfsiz Proxy yaratish:
```javascript
const secretData = { apiKey: "XYZ12345" };

const { proxy, revoke } = Proxy.revocable(secretData, {
  get(target, prop) {
    return Reflect.get(target, prop);
  }
});

console.log(proxy.apiKey); // XYZ12345

// Foydalanish tugagandan so'ng ruxsatni bekor qilamiz
revoke();

// Endi murojaat qilsak xatolik yuz beradi:
// console.log(proxy.apiKey); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Obyekt xatti-harakatini to'liq nazorat qilish (Meta-programming):** JavaScript-da obyekt xususiyatiga qiymat yozilayotganda (`obj.key = val`) yoki o'qilayotganda (`obj.key`) uni dasturiy ravishda tutiladigan global uskunalar yo'q edi. Proxy bizga tilning ichki operatsiyalarini o'zgartirish (metaprogramming) imkonini berdi.
2. **Reaktivlik (Reactivity) va Obyektlarni kuzatish:** Vue.js 3 kabi zamonaviy frameworklar obyektlardagi o'zgarishlarni kuzatib, brauzer ekranini (DOM) avtomatik yangilash uchun aynan Proxy mexanizmidan foydalanadi (Vue 2 da buning uchun cheklangan `Object.defineProperty` ishlatilar edi).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `set` trap-ida `true` qaytarishni unutish
Proxy set trap-i qiymat muvaffaqiyatli yozilganini bildirish uchun `true` (yoki Reflect.set natijasini) qaytarishi shart. Aks holda Strict Mode-da xatolik yuz beradi.
#### Xato:
```javascript
const proxy = new Proxy({}, {
  set(target, prop, value) {
    target[prop] = value;
    // return yo'q, default undefined qaytadi va xato berishi mumkin
  }
});
```
#### Tuzatish:
```javascript
const proxy = new Proxy({}, {
  set(target, prop, value, receiver) {
    return Reflect.set(target, prop, value, receiver); // true/false qaytaradi
  }
});
```

### 2. Cheksiz rekursiyaga tushib qolish
Trap ichida `Reflect` yoki `target` o'rniga proxy obyektining o'zini chaqirish cheksiz rekursiyaga (Stack Overflow) olib keladi.
#### Xato:
```javascript
const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    return receiver[prop]; // receiver bu proxy-ning o'zi! Cheksiz get chaqiruvi!
  }
});
```
#### Tuzatish:
```javascript
const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver); // target obyektidan to'g'ri o'qiydi
  }
});
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Metadasturlash nima va JavaScript-da u qanday amalga oshiriladi?
   * **Javob:** Dasturning o'z xatti-harakatlarini tahlil qilishi va o'zgartirishi. JS-da Proxy, Reflect va Symbol-lar orqali amalga oshiriladi.
2. **Savol:** Proxy yaratish uchun nechta va qanday parametrlar kerak?
   * **Javob:** 2 ta parametr kerak: `target` (asl obyekt) va `handler` (trap-lar joylashgan obyekt).
3. **Savol:** Trap nima va uning qanday turlarini bilasiz?
   * **Javob:** Trap - Proxy intercept qiladigan operatsiyalarga mos keluvchi metodlar (masalan, `get`, `set`, `has`, `deleteProperty`).
4. **Savol:** Obyektda `key in obj` yoki `'key' in proxy` tekshiruvi bajarilganda qaysi trap ishga tushadi?
   * **Javob:** `has` trap-i ishga tushadi.

### Middle (5–8)
5. **Savol:** Nima uchun Proxy ichida Reflect-dan foydalanish tavsiya etiladi?
   * **Javob:** Reflect operatsiyalarni asl obyektga xavfsiz yo'naltiradi, `this` kontekstini (receiver orqali) to'g'ri saqlaydi va xato tashlash o'rniga mantiqiy javob qaytaradi.
6. **Savol:** `Object.keys(proxy)` chaqirilganda qaysi trap ishlaydi va u nima qaytarishi kerak?
   * **Javob:** `ownKeys` trap-i ishga tushadi va u faqat satr (string) yoki Symbol turidagi kalitlar massivini qaytarishi lozim.
7. **Savol:** Proxy.revocable nima va u qayerda qo'llaniladi?
   * **Javob:** U vaqtinchalik proxy yaratib, istalgan vaqtda uni butunlay o'chirish (revoke qilish) imkonini beradi. Xavfsizlik va xotira boshqaruvida qo'llaniladi.
8. **Savol:** Vue 3 reaktivlik tizimida Vue 2-dagi `Object.defineProperty` o'rniga nega Proxy-ga o'tildi?
   * **Javob:** `Object.defineProperty` faqat mavjud xususiyatlarni kuzata olardi (yangi qo'shilgan yoki o'chirilgan xususiyatlarni bilmasdi). Proxy esa obyekt ustidagi har qanday dinamik o'zgarishlarni to'liq tutib oladi.

### Senior (9–12)
9. **Savol:** `Reflect.get` dagi uchinchi parametr `receiver` nima vazifani bajaradi va u nega muhim?
   * **Javob:** `receiver` getter yoki setter chaqirilganda `this` kontekstini belgilaydi. Agar obyekt boshqa obyektga prototype qilib bog'langan bo'lsa, `this` voris obyektga to'g'ri ishora qilishi uchun `receiver` kerak.
10. **Savol:** Proxy-ni chetlab o'tib asl obyekt ustida to'g'ridan-to'g'ri amal bajarish mumkinmi?
    * **Javob:** Ha, agar bizda asl obyekt (target) ga to'g'ridan-to'g'ri havola (reference) bo'lsa, unga yozilgan qiymat proxy-dan o'tmaydi.
11. **Savol:** Proxy yordamida funksiya chaqiruvlari (`()` bilan bajarish) va `new` konstruktor chaqiruvlarini qanday ushlash mumkin?
    * **Javob:** Funksiya chaqiruvi uchun `apply` trap-i, konstruktor sifatida chaqirilganda esa `construct` trap-i ishlatiladi.
12. **Savol:** Proxy yordamida massivning manfiy indekslarini (masalan, `arr[-1]` oxirgi element bo'lishi) qanday amalga oshirish mumkin?
    * **Javob:** Proxy get trap-ida indeks string yoki number ekanligini va noldan kichikligini tekshirib, `target[target.length + Number(prop)]` formulasidan foydalanib natija qaytarish mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Reaktiv Obyekt va DOM Integratsiyasi (Mini Vue.js)
Keling, Proxy yordamida obyekt o'zgarishi bilan HTML sahifadagi matnni avtomatik yangilaydigan sodda reaktiv kutubxona yaratamiz.

```javascript
// HTML element: <div id="app">Salom</div>

function createReactiveObject(state, updateUI) {
  return new Proxy(state, {
    set(target, prop, value, receiver) {
      const success = Reflect.set(target, prop, value, receiver);
      if (success) {
        updateUI(target); // Qiymat o'zgarganda ekranni yangilaymiz
      }
      return success;
    }
  });
}

// Bizning state (holat)
const appState = {
  title: "Xush kelibsiz!",
  count: 0
};

// UI-ni yangilovchi funksiya
const render = (state) => {
  const appDiv = document.getElementById("app");
  if (appDiv) {
    appDiv.innerHTML = `<h1>${state.title}</h1><p>Bosishlar soni: ${state.count}</p>`;
  }
};

// Reaktiv obyekt yaratamiz
const reactiveState = createReactiveObject(appState, render);

// UI-ni birinchi marta chizamiz
render(appState);

// Endi qiymatlarni o'zgartirsak, UI avtomatik o'zgaradi!
reactiveState.count = 5; 
reactiveState.title = "Dars muvaffaqiyatli yakunlandi!";
```

---

## 9. 🚀 Performance va Optimization

* **Proxy sekinroq ishlaydi:** Proxy orqali obyekt xususiyatlariga murojaat qilish oddiy obyektga qaraganda bir necha barobar sekinroq bo'lishi mumkin. Shuning uchun yuqori unumdorlik talab qiladigan (sekundiga millionlab operatsiyalar bajariladigan) sikllar ichida Proxy-dan foydalanmaslik kerak.
* **Keraksiz trap-larni yozmang:** handler ichida faqat sizga kerakli bo'lgan trap-larni yarating. Agar get-ni nazorat qilmoqchi bo'lsangiz, faqat `get` yozing, `set` yoki boshqalarni yozib ortiqcha yuklama yaratmang.

---

## 10. 📌 Cheat Sheet

| Sintaksis / Trap | Vazifasi | Chaqirilish holati |
| :--- | :--- | :--- |
| `get(target, prop, receiver)` | Xususiyat o'qilishini tutadi | `proxy.name`, `proxy['age']` |
| `set(target, prop, val, receiver)` | Xususiyat yozilishini tutadi | `proxy.age = 18` |
| `has(target, prop)` | `in` operatorini tutadi | `'email' in proxy` |
| `deleteProperty(target, prop)` | Xususiyat o'chirilishini tutadi | `delete proxy.age` |
| `ownKeys(target)` | Kalitlar ro'yxatini tutadi | `Object.keys(proxy)`, `for...in` |
| `apply(target, thisArg, argumentsList)` | Funksiya chaqirilishini tutadi | `proxyFunc()` |
| `construct(target, argumentsList, newTarget)` | Konstruktor chaqiruvini tutadi | `new ProxyClass()` |
