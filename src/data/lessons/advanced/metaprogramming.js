export const metaprogramming = {
  id: "metaprogramming",
  title: "Metaprogramming: Proxy va Reflect",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Metadasturlash (Metaprogramming), Proxy va Reflect nima?
* **Metadasturlash (Metaprogramming):** Dasturning o'z-o'zini o'zgartirishi, tekshirishi yoki boshqa kodlarni boshqarishi bilan bog'liq dasturlash yondashuvidir. Ya'ni, dastur faqat ma'lumotlar bilan emas, balki kodning tuzilishi va xatti-harakati bilan ishlaydi.
* **Proxy (Vakil):** JavaScript-da obyekt atrofida o'ralgan maxsus qobiq (vakil) bo'lib, u obyekt ustida bajariladigan barcha operatsiyalarni (xususiyatni o'qish, qiymat yozish, o'chirish va h.k.) o'z nazoratiga oladi.
* **Reflect:** JavaScript-ning o'rnatilgan obyekti bo'lib, obyektlar bilan ishlashning standart metodlarini taqdim etadi. Proxy ichidagi "trap" (tutuvchi) funksiyalarni asl obyektga xavfsiz yo'naltirish uchun xizmat qiladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **mashhur shaxs (VIP)** bilan bog'lanmoqchisiz:
* **Proxy-siz usul:** Siz to'g'ridan-to'g'ri VIP shaxsga murojaat qilasiz. U bevosita javob beradi (hech qanday nazoratsiz yoki filtrsiz).
* **Proxy va Reflect usuli:** VIP shaxs o'ziga **shaxsiy yordamchi (Proxy)** yollaydi. Endi siz VIP shaxsga bermoqchi bo'lgan har bir savolingizni avval yordamchiga berishingiz kerak:
  * Agar siz VIP shaxsdan "telefon raqami"ni so'rasangiz (\`get\`), yordamchi buni tekshirib, "Raqamni berish taqiqlangan" deb javob beradi yoki VIP shaxsdan so'rab (\`Reflect.get\`) sizga yetkazadi.
  * Agar siz VIP shaxsning jadvaliga uchrashuv yozmoqchi bo'lsangiz (\`set\`), yordamchi avval uchrashuv vaqtini tekshiradi, agar bo'sh bo'lsa, jadvalga kiritadi (\`Reflect.set\`).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Xususiyatni o'qishni o'zgartirish)
Obyektda mavjud bo'lmagan xususiyat so'ralganda xatolik berish o'rniga default qiymat qaytaruvchi Proxy:
\`\`\`javascript
const user = {
  name: "Jasur",
  age: 25
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    // Agar xususiyat obyektda bo'lsa, o'zini qaytaradi, aks holda xabar beradi
    return prop in target ? target[prop] : \`Xususiyat '\${prop}' mavjud emas!\`;
  }
});

console.log(userProxy.name); // Jasur
console.log(userProxy.email); // Xususiyat 'email' mavjud emas!
\`\`\`

### 2. Intermediate Example (Validatsiya va Reflect)
Reflect yordamida yozish operatsiyasini nazorat qilish va tekshirish:
\`\`\`javascript
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
\`\`\`

### 3. Advanced Example (Vaqtinchalik / Revocable Proxy)
Ma'lum vaqtdan keyin yoki kerak bo'lganda butunlay o'chiriladigan (revoke qilinadigan) xavfsiz Proxy yaratish:
\`\`\`javascript
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
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Obyekt xatti-harakatini to'liq nazorat qilish (Meta-programming):** JavaScript-da obyekt xususiyatiga qiymat yozilayotganda (\`obj.key = val\`) yoki o'qilayotganda (\`obj.key\`) uni dasturiy ravishda tutiladigan global uskunalar yo'q edi. Proxy bizga tilning ichki operatsiyalarini o'zgartirish (metaprogramming) imkonini berdi.
2. **Reaktivlik (Reactivity) va Obyektlarni kuzatish:** Vue.js 3 kabi zamonaviy frameworklar obyektlardagi o'zgarishlarni kuzatib, brauzer ekranini (DOM) avtomatik yangilash uchun aynan Proxy mexanizmidan foydalanadi (Vue 2 da buning uchun cheklangan \`Object.defineProperty\` ishlatilar edi).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`set\` trap-ida \`true\` qaytarishni unutish
Proxy set trap-i qiymat muvaffaqiyatli yozilganini bildirish uchun \`true\` (yoki Reflect.set natijasini) qaytarishi shart. Aks holda Strict Mode-da xatolik yuz beradi.
#### Xato:
\`\`\`javascript
const proxy = new Proxy({}, {
  set(target, prop, value) {
    target[prop] = value;
    // return yo'q, default undefined qaytadi va xato berishi mumkin
  }
});
\`\`\`
#### Tuzatish:
\`\`\`javascript
const proxy = new Proxy({}, {
  set(target, prop, value, receiver) {
    return Reflect.set(target, prop, value, receiver); // true/false qaytaradi
  }
});
\`\`\`

### 2. Cheksiz rekursiyaga tushib qolish
Trap ichida \`Reflect\` yoki \`target\` o'rniga proxy obyektining o'zini chaqirish cheksiz rekursiyaga (Stack Overflow) olib keladi.
#### Xato:
\`\`\`javascript
const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    return receiver[prop]; // receiver bu proxy-ning o'zi! Cheksiz get chaqiruvi!
  }
});
\`\`\`
#### Tuzatish:
\`\`\`javascript
const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver); // target obyektidan to'g'ri o'qiydi
  }
});
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Metadasturlash nima va JavaScript-da u qanday amalga oshiriladi?
   * **Javob:** Dasturning o'z xatti-harakatlarini tahlil qilishi va o'zgartirishi. JS-da Proxy, Reflect va Symbol-lar orqali amalga oshiriladi.
2. **Savol:** Proxy yaratish uchun nechta va qanday parametrlar kerak?
   * **Javob:** 2 ta parametr kerak: \`target\` (asl obyekt) va \`handler\` (trap-lar joylashgan obyekt).
3. **Savol:** Trap nima va uning qanday turlarini bilasiz?
   * **Javob:** Trap - Proxy intercept qiladigan operatsiyalarga mos keluvchi metodlar (masalan, \`get\`, \`set\`, \`has\`, \`deleteProperty\`).
4. **Savol:** Obyektda \`key in obj\` yoki \`'key' in proxy\` tekshiruvi bajarilganda qaysi trap ishga tushadi?
   * **Javob:** \`has\` trap-i ishga tushadi.

### Middle (5–8)
5. **Savol:** Nima uchun Proxy ichida Reflect-dan foydalanish tavsiya etiladi?
   * **Javob:** Reflect operatsiyalarni asl obyektga xavfsiz yo'naltiradi, \`this\` kontekstini (receiver orqali) to'g'ri saqlaydi va xato tashlash o'rniga mantiqiy javob qaytaradi.
6. **Savol:** \`Object.keys(proxy)\` chaqirilganda qaysi trap ishlaydi va u nima qaytarishi kerak?
   * **Javob:** \`ownKeys\` trap-i ishga tushadi va u faqat satr (string) yoki Symbol turidagi kalitlar massivini qaytarishi lozim.
7. **Savol:** Proxy.revocable nima va u qayerda qo'llaniladi?
   * **Javob:** U vaqtinchalik proxy yaratib, istalgan vaqtda uni butunlay o'chirish (revoke qilish) imkonini beradi. Xavfsizlik va xotira boshqaruvida qo'llaniladi.
8. **Savol:** Vue 3 reaktivlik tizimida Vue 2-dagi \`Object.defineProperty\` o'rniga nega Proxy-ga o'tildi?
   * **Javob:** \`Object.defineProperty\` faqat mavjud xususiyatlarni kuzata olardi (yangi qo'shilgan yoki o'chirilgan xususiyatlarni bilmasdi). Proxy esa obyekt ustidagi har qanday dinamik o'zgarishlarni to'liq tutib oladi.

### Senior (9–12)
9. **Savol:** \`Reflect.get\` dagi uchinchi parametr \`receiver\` nima vazifani bajaradi va u nega muhim?
   * **Javob:** \`receiver\` getter yoki setter chaqirilganda \`this\` kontekstini belgilaydi. Agar obyekt boshqa obyektga prototype qilib bog'langan bo'lsa, \`this\` voris obyektga to'g'ri ishora qilishi uchun \`receiver\` kerak.
10. **Savol:** Proxy-ni chetlab o'tib asl obyekt ustida to'g'ridan-to'g'ri amal bajarish mumkinmi?
    * **Javob:** Ha, agar bizda asl obyekt (target) ga to'g'ridan-to'g'ri havola (reference) bo'lsa, unga yozilgan qiymat proxy-dan o'tmaydi.
11. **Savol:** Proxy yordamida funksiya chaqiruvlari (\`()\` bilan bajarish) va \`new\` konstruktor chaqiruvlarini qanday ushlash mumkin?
    * **Javob:** Funksiya chaqiruvi uchun \`apply\` trap-i, konstruktor sifatida chaqirilganda esa \`construct\` trap-i ishlatiladi.
12. **Savol:** Proxy yordamida massivning manfiy indekslarini (masalan, \`arr[-1]\` oxirgi element bo'lishi) qanday amalga oshirish mumkin?
    * **Javob:** Proxy get trap-ida indeks string yoki number ekanligini va noldan kichikligini tekshirib, \`target[target.length + Number(prop)]\` formulasidan foydalanib natija qaytarish mumkin.

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

\`\`\`javascript
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
    appDiv.innerHTML = \`<h1>\${state.title}</h1><p>Bosishlar soni: \${state.count}</p>\`;
  }
};

// Reaktiv obyekt yaratamiz
const reactiveState = createReactiveObject(appState, render);

// UI-ni birinchi marta chizamiz
render(appState);

// Endi qiymatlarni o'zgartirsak, UI avtomatik o'zgaradi!
reactiveState.count = 5; 
reactiveState.title = "Dars muvaffaqiyatli yakunlandi!";
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Proxy sekinroq ishlaydi:** Proxy orqali obyekt xususiyatlariga murojaat qilish oddiy obyektga qaraganda bir necha barobar sekinroq bo'lishi mumkin. Shuning uchun yuqori unumdorlik talab qiladigan (sekundiga millionlab operatsiyalar bajariladigan) sikllar ichida Proxy-dan foydalanmaslik kerak.
* **Keraksiz trap-larni yozmang:** handler ichida faqat sizga kerakli bo'lgan trap-larni yarating. Agar get-ni nazorat qilmoqchi bo'lsangiz, faqat \`get\` yozing, \`set\` yoki boshqalarni yozib ortiqcha yuklama yaratmang.

---

## 10. 📌 Cheat Sheet

| Sintaksis / Trap | Vazifasi | Chaqirilish holati |
| :--- | :--- | :--- |
| \`get(target, prop, receiver)\` | Xususiyat o'qilishini tutadi | \`proxy.name\`, \`proxy['age']\` |
| \`set(target, prop, val, receiver)\` | Xususiyat yozilishini tutadi | \`proxy.age = 18\` |
| \`has(target, prop)\` | \`in\` operatorini tutadi | \`'email' in proxy\` |
| \`deleteProperty(target, prop)\` | Xususiyat o'chirilishini tutadi | \`delete proxy.age\` |
| \`ownKeys(target)\` | Kalitlar ro'yxatini tutadi | \`Object.keys(proxy)\`, \`for...in\` |
| \`apply(target, thisArg, argumentsList)\` | Funksiya chaqirilishini tutadi | \`proxyFunc()\` |
| \`construct(target, argumentsList, newTarget)\` | Konstruktor chaqiruvini tutadi | \`new ProxyClass()\` |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Proxy Validatsiya",
      instruction: "Obyektga yangi xususiyat qo'shishni taqiqlovchi Proxy yozing (faqat mavjud xususiyatni o'zgartirishga ruxsat bersin).",
      startingCode: "const data = { name: 'JS' };\nconst proxy = new Proxy(data, {\n  set(target, prop, value) {\n    // faqat bor xususiyatni o'zgartirishga ruxsat bering\n  }\n});",
      hint: "if (!(prop in target)) return false; target[prop] = value; return true;",
      test: "if (code.includes('in target')) return null; return 'In operatoridan foydalanib tekshiring';"
    },
    {
      id: 2,
      title: "2️⃣ ReadOnly Proxy",
      instruction: "Obyekt xususiyatlarini o'zgartirishni yoki yangi qo'shishni butunlay taqiqlab, faqat o'qishga (read-only) ruxsat beruvchi Proxy yarating.",
      startingCode: "const user = { role: 'admin' };\nconst readOnlyUser = new Proxy(user, {\n  // set trap-ni to'ldiring\n});",
      hint: "set(target, prop, value) { return false; }",
      test: "if (code.includes('return false')) return null; return 'Set trap-i ichida doim false qaytaring';"
    },
    {
      id: 3,
      title: "3️⃣ Property Logger",
      instruction: "Obyekt xususiyati o'qilganda, uning nomini console-ga chiqaradigan get trap-ni yozing.",
      startingCode: "const obj = { secret: '123' };\nconst loggedObj = new Proxy(obj, {\n  // get trap-ni yozing\n});",
      hint: "get(target, prop) { console.log(prop); return target[prop]; }",
      test: "if (code.includes('console.log') && code.includes('target[prop]')) return null; return 'get trap ichida console.log(prop) va qiymatni qaytarishni yozing';"
    },
    {
      id: 4,
      title: "4️⃣ Default Value (Fallback)",
      instruction: "Obyektda mavjud bo'lmagan xususiyat o'qilganda undefined o'rniga doim 'Not Found' qaytaradigan Proxy yarating.",
      startingCode: "const settings = { theme: 'dark' };\nconst safeSettings = new Proxy(settings, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { return prop in target ? target[prop] : 'Not Found'; }",
      test: "if (code.includes('in target') && code.includes('Not Found')) return null; return 'Mavjud bo\\'lmagan kalitlar uchun \\'Not Found\\' qaytaring';"
    },
    {
      id: 5,
      title: "5️⃣ Private Property",
      instruction: "Agar xususiyat nomi ostki chiziq (_) bilan boshlansa (masalan _id), unga tashqaridan kirishni (get) taqiqlab undefined qaytaradigan Proxy yarating.",
      startingCode: "const account = { username: 'john', _id: 'acc_999' };\nconst secureAccount = new Proxy(account, {\n  // get trap-ni to'ldiring\n});",
      hint: "get(target, prop) { if (prop.startsWith('_')) return undefined; return target[prop]; }",
      test: "if (code.includes('startsWith') || code.includes('_[0]') || code.includes(\"'_'\")) return null; return 'Ostki chiziq (_) bilan boshlangan xususiyatlarga ruxsat bermang';"
    },
    {
      id: 6,
      title: "6️⃣ Reflect.get ishlatish",
      instruction: "Proxy get trap-i ichida obyekt xususiyatini o'qish uchun Reflect.get()-dan foydalaning.",
      startingCode: "const user = { name: 'Ali' };\nconst proxyUser = new Proxy(user, {\n  get(target, prop, receiver) {\n    // Reflect.get orqali qiymatni qaytaring\n  }\n});",
      hint: "return Reflect.get(target, prop, receiver);",
      test: "if (code.includes('Reflect.get')) return null; return 'Reflect.get metodidan foydalaning';"
    },
    {
      id: 7,
      title: "7️⃣ Delete Property Trap",
      instruction: "Ostki chiziq bilan boshlangan xususiyatlarni o'chirishni (delete) taqiqlovchi Proxy yarating (boshqalarini esa o'chirishga ruxsat bersin).",
      startingCode: "const data = { _id: 1, age: 20 };\nconst proxyData = new Proxy(data, {\n  deleteProperty(target, prop) {\n    // Trap-ni yozing\n  }\n});",
      hint: "if (prop.startsWith('_')) return false; return Reflect.deleteProperty(target, prop);",
      test: "if (code.includes('deleteProperty') && (code.includes('startsWith') || code.includes('_[0]'))) return null; return 'deleteProperty tuzog\\'i va startsWith dan foydalaning';"
    },
    {
      id: 8,
      title: "8️⃣ Negative Index Array",
      instruction: "Manfiy indekslarni qo'llab-quvvatlaydigan (masalan, [-1] massivning oxirgi elementini qaytarsin) massiv uchun Proxy yaratuvchi createSmartArray funksiyasini yozing.",
      startingCode: "function createSmartArray(arr) {\n  return new Proxy(arr, {\n    get(target, prop) {\n      // Manfiy indekslarni tekshiring\n    }\n  });\n}",
      hint: "let index = Number(prop); if (index < 0) index = target.length + index; return target[index];",
      test: "if (code.includes('length') && code.includes('Number')) return null; return 'Smart array manfiy indekslarni to\\'g\\'ri hisoblamadi';"
    },
    {
      id: 9,
      title: "9️⃣ Reflect.has operatori",
      instruction: "in operatori xatti-harakatini boshqaruvchi has trap-i ichida Reflect.has() operatoridan foydalaning.",
      startingCode: "const user = { name: 'Ali', role: 'guest' };\nconst proxy = new Proxy(user, {\n  has(target, prop) {\n    // has trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.has(target, prop);",
      test: "if (code.includes('Reflect.has') && code.includes('has')) return null; return 'has trap va Reflect.has metodidan foydalaning';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Only Numbers Object",
      instruction: "Obyektga faqat sonli qiymatlarni yozishga ruxsat beruvchi Proxy yarating. Agar qiymat son bo'lmasa, TypeError tashlasin (throw).",
      startingCode: "const score = { points: 10 };\nconst numericScore = new Proxy(score, {\n  set(target, prop, value) {\n    // set trap-ni to'ldiring\n  }\n});",
      hint: "if (typeof value !== 'number') throw new TypeError(); target[prop] = value; return true;",
      test: "if (code.includes('TypeError') && code.includes('typeof')) return null; return 'Son bo\\'lmagan qiymatlar uchun TypeError tashlang';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Reflect.ownKeys operatori",
      instruction: "Obyekt kalitlarini ro'yxat qilganda ostki chiziq bilan boshlangan xususiyatlarni yashirish uchun ownKeys trap-ni yozing.",
      startingCode: "const user = { _password: '123', name: 'Ali' };\nconst proxy = new Proxy(user, {\n  ownKeys(target) {\n    // ownKeys trap-ni to'ldiring\n  }\n});",
      hint: "return Reflect.ownKeys(target).filter(key => typeof key !== 'string' || !key.startsWith('_'));",
      test: "if (code.includes('Reflect.ownKeys') && code.includes('filter')) return null; return 'ownKeys va filter yordamida ostki chiziqli kalitlarni yashiring';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Proxy Revocable",
      instruction: "Proxy.revocable yordamida bekor qilinadigan proxy yarating. Funksiya obyekt va uning proxy'sini bekor qilish funksiyasini (revoke) qaytarsin.",
      startingCode: "function createRevocable(target) {\n  // Proxy.revocable ishlatib qaytaring\n}",
      hint: "return Proxy.revocable(target, {});",
      test: "if (code.includes('Proxy.revocable')) return null; return 'Proxy.revocable orqali obekt va revoke funksiyasini qaytaring';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ To'liq read-only Proxy (createReadOnlyProxy)",
      instruction: "Obyektga har qanday yangi qiymat yozish (`set`) yoki o'chirish (`deleteProperty`) harakatlarida xatolik (`Error`) tashlaydigan to'liq read-only Proxy qaytaruvchi `createReadOnlyProxy(obj)` funksiyasini yozing. O'chirish va yozish rad etilganda `'Bu obyekt faqat o\\'qish uchun!'` xabari bilan Error tashlanishi shart.",
      startingCode: "function createReadOnlyProxy(obj) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Proxy(obj, {\n  set() { throw new Error(\"Bu obyekt faqat o'qish uchun!\"); },\n  deleteProperty() { throw new Error(\"Bu obyekt faqat o'qish uchun!\"); }\n});",
      test: "if (typeof createReadOnlyProxy !== 'function') return 'createReadOnlyProxy funksiya emas';\nconst o = { a: 1 };\nconst p = createReadOnlyProxy(o);\ntry {\n  p.a = 2;\n  return 'Qiymat yozishda xato tashlanmadi';\n} catch (e) {\n  if (e.message !== \"Bu obyekt faqat o'qish uchun!\") return 'Xato xabari noto\\'g\\'ri';\n}\ntry {\n  delete p.a;\n  return 'Qiymat o\\'chirishda xato tashlanmadi';\n} catch (e) {\n  if (e.message !== \"Bu obyekt faqat o'qish uchun!\") return 'Xato xabari noto\\'g\\'ri';\n}\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Schema bo'yicha validatsiya (createValidationProxy)",
      instruction: "Berilgan `target` obyekti va `schema` (kalit-turlar juftligi) bo'yicha qiymatlarni validatsiya qiluvchi `createValidationProxy(target, schema)` funksiyasini yozing. Agar o'rnatilayotgan qiymat turi `schema`-dagi turga mos kelmasa (va kalit schema-da mavjud bo'lsa), `TypeError` tashlang. Agarda kalit schema ichida bo'lmasa, yoki tur to'g'ri bo'lsa, qiymatni asl obyektga o'rnating. O'rnatish muvaffaqiyatli bo'lsa `Reflect.set` yordamida haqiqiy holatni qaytaring.",
      startingCode: "function createValidationProxy(target, schema) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Proxy(target, {\n  set(tar, prop, val) {\n    if (prop in schema && typeof val !== schema[prop]) {\n      throw new TypeError(`Noto'g'ri tur`);\n    }\n    return Reflect.set(tar, prop, val);\n  }\n});",
      test: "if (typeof createValidationProxy !== 'function') return 'createValidationProxy funksiya emas';\nconst schema = { name: 'string', age: 'number' };\nconst target = { name: 'Ali', age: 20 };\nconst p = createValidationProxy(target, schema);\ntry {\n  p.age = 'yosh';\n  return 'Noto\\'g\\'ri tur o\\'rnatilganda TypeError tashlanmadi';\n} catch (e) {\n  if (!(e instanceof TypeError)) return 'Xato turi TypeError bo\\'lishi kerak';\n}\np.age = 25;\nif (target.age !== 25) return 'To\\'g\\'ri qiymat o\\'rnatilmadi';\np.role = 'admin';\nif (target.role !== 'admin') return 'Schema-da bo\\'lmagan kalit o\\'rnatilmadi';\nreturn null;"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Proxy nima vazifani bajaradi?",
    "options": [
      "Obyektga so'rovlar yuboruvchi HTTP mijoz kutubxonasi",
      "Asl obyekt atrofida o'ralgan maxsus qobiq bo'lib, uning ustidagi amallarni (o'qish, yozish va h.k.) intercept qilish (tutib olish) va boshqarish imkonini beradi",
      "Faqat massivlarni tezkor saralash uchun xizmat qiladigan algoritm",
      "Brauzer keshini tozalash funksiyasi"
    ],
    "correctAnswer": 1,
    "explanation": "Proxy obyekti boshqa obyektning ustidagi fundamental operatsiyalarni (masalan, xususiyatni o'qish, yozish, o'chirish va hokazo) tutib olib, ularni qayta aniqlash (customise qilish) imkonini beradi."
  },
  {
    "id": 2,
    "question": "Reflect obyektining asosiy maqsadi nima?",
    "options": [
      "Obyektni HTML sahifada aks ettirish",
      "Proxy trap-lari ichidan mos keluvchi asl obyekt amallarini bajarish va xatoliklar o'rniga to'g'ri qiymatlar (masalan boolean) qaytaruvchi metodlar taqdim etish",
      "Funksiyalarni asinxron tarzda parallel ishga tushirish",
      "Klasslarni avtomatik ravishda JSON-ga o'tkazish"
    ],
    "correctAnswer": 1,
    "explanation": "Reflect - bu obyektlar ustidagi operatsiyalar uchun metodlar taqdim etuvchi o'rnatilgan obyekt bo'lib, u ko'pincha Proxy trap-lari ichida operatsiyalarni asl obyektga to'g'ri yo'naltirish uchun Reflect.get, Reflect.set kabi metodlar bilan ishlatiladi."
  },
  {
    "id": 3,
    "question": "Proxy yaratishdagi `target` parametri nimani anglatadi?",
    "options": [
      "Proxy orqali yuboriladigan yakuniy URL manzili",
      "Trap-lar yoziladigan handler obyekti",
      "Proxy o'rab oladigan va xatti-harakati boshqariladigan asl obyekt",
      "Xatoliklarni qayta ishlovchi catch bloki"
    ],
    "correctAnswer": 2,
    "explanation": "new Proxy(target, handler) sintaksisida `target` - bu biz virtualizatsiya qilmoqchi bo'lgan, Proxy ortida turgan asl obyekt (obyekt, massiv yoki funksiya) hisoblanadi."
  },
  {
    "id": 4,
    "question": "Proxy yaratishdagi `handler` parametri nima?",
    "options": [
      "Xatolarni qayd qiluvchi global tizim",
      "Obyekt ustidagi operatsiyalarni tutib oluvchi funksiyalar (trap-lar) jamlangan obyekt",
      "Serverdan kelgan javobni qayta ishlovchi callback funksiya",
      "Barcha asinxron operatsiyalar navbati"
    ],
    "correctAnswer": 1,
    "explanation": "`handler` - bu Proxy-ning xulq-atvorini belgilaydigan obyekt bo'lib, uning ichida get, set kabi traplar (tutuvchi metodlar) joylashadi."
  },
  {
    "id": 5,
    "question": "Obyektdan biror xususiyat qiymati o'qilayotganda uni tutish uchun qaysi trap ishlatiladi?",
    "options": [
      "`read`",
      "`get`",
      "`access`",
      "`intercept`"
    ],
    "correctAnswer": 1,
    "explanation": "`get` trap-i obyektdan xususiyat o'qilayotganda (masalan, proxy.name yoki proxy['name']) avtomatik ravishda ishga tushadi."
  },
  {
    "id": 6,
    "question": "Obyekt xususiyatiga yangi qiymat yozilayotganda uni tekshirish va tutish uchun qaysi trap ishlatiladi?",
    "options": [
      "`write`",
      "`update`",
      "`set`",
      "`modify`"
    ],
    "correctAnswer": 2,
    "explanation": "`set` trap-i obyekt xususiyatiga qiymat berilayotganda (masalan, proxy.age = 20) ishga tushadi va qiymatni tekshirish (validatsiya) uchun eng qulay joy hisoblanadi."
  },
  {
    "id": 7,
    "question": "Reflect.set() metodi muvaffaqiyatli qiymat o'rnatilgandan so'ng nima qaytaradi?",
    "options": [
      "O'zgartirilgan obyektning o'zini (this)",
      "Yozilgan yangi qiymatni",
      "Amal muvaffaqiyatli bo'lsa `true`, aks holda `false` (mantiqiy qiymat)",
      "`undefined` qaytaradi"
    ],
    "correctAnswer": 2,
    "explanation": "Reflect.set() muvaffaqiyatli bajarilsa `true`, muvaffaqiyatsiz bo'lsa (masalan obyekt muzlatilgan bo'lsa) `false` qaytaradi. Bu Proxy set trap-i ichida return qilish uchun juda qulaydir."
  },
  {
    "id": 8,
    "question": "Quyidagi kodda `proxy.name` so'ralganda ekranga nima chiqadi?\n```javascript\nconst user = { name: 'Ali' };\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    return 'Jasur';\n  }\n});\nconsole.log(proxy.name);\n```",
    "options": [
      "`'Ali'`",
      "`'Jasur'`",
      "`undefined`",
      "`TypeError` xatoligi"
    ],
    "correctAnswer": 1,
    "explanation": "`get` trap-i kelgan so'rovlarni har doim intercept qilib `'Jasur'` qaytarmoqda. Shuning uchun asl obyektda `'Ali'` bo'lsa ham, proxy orqali o'qilganda `'Jasur'` qaytadi."
  },
  {
    "id": 9,
    "question": "Obyekt kalitlari ro'yxatini (`Object.keys()`) yoki loop orqali aylanib chiqishni intercept qilish uchun qaysi handler trap-idan foydalaniladi?",
    "options": [
      "`keys`",
      "`enumerate`",
      "`ownKeys`",
      "`getOwnPropertyNames`"
    ],
    "correctAnswer": 2,
    "explanation": "`ownKeys` trap-i Reflect.ownKeys(), Object.keys(), Object.getOwnPropertyNames() kabi metodlar chaqirilganda va for...in looplarida obyekt kalitlarini boshqarish yoki yashirish uchun ishlatiladi."
  },
  {
    "id": 10,
    "question": "Proxy o'rab olgan obyekt funksiya bo'lsa va u chaqirilganda (call qilinganda) qaysi trap ishga tushadi?",
    "options": [
      "`call`",
      "`apply`",
      "`run`",
      "`execute`"
    ],
    "correctAnswer": 1,
    "explanation": "`apply` trap-i nishon obyekt funksiya bo'lib chaqirilganda, `.apply()`, yoki `.call()` qilinganda ishga tushadi."
  },
  {
    "id": 11,
    "question": "Nishon obyekt (constructor) ustida `new` kalit so'zi yordamida obyekt yaratilishini intercept qilish uchun qaysi trap ishlatiladi?",
    "options": [
      "`new`",
      "`createInstance`",
      "`construct`",
      "`instantiate`"
    ],
    "correctAnswer": 2,
    "explanation": "`construct` trap-i `new` operatori orqali obyektdan nusxa olinayotganda ishga tushadi. Bu trap har doim obyekt qaytarishi shart."
  },
  {
    "id": 12,
    "question": "Vaqtinchalik Proxy yaratish va uni keyinchalik butunlay o'chirib qo'yish (o'chirgandan keyin xatolik otadigan qilish) uchun nima ishlatiladi?",
    "options": [
      "`proxy.delete()` metodi",
      "`Proxy.revocable()` metodi",
      "`delete proxy` operatori",
      "`proxy = null` qilish"
    ],
    "correctAnswer": 1,
    "explanation": "`Proxy.revocable(target, handler)` metodi `{ proxy, revoke }` obyektini qaytaradi. `revoke()` funksiyasi chaqirilgach, proxy o'chadi va uning xususiyatlariga murojaat qilganda `TypeError` tashlanadi."
  }
]

};
