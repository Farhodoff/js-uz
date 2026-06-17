export const metaprogramming = {
  id: "metaprogramming",
  title: "Metaprogramming: Proxy va Reflect",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Metadasturlash (Metaprogramming), Proxy va Reflect nima?
* **Metadasturlash (Metaprogramming):** Dasturning o'z-o'zini o'zgartirishi, tekshirishi yoki boshqa kodlarni boshqarishi bilan bog'liq dasturlash yondashuvidir. Ya'ni, dastur faqat ma'lumotlar bilan emas, balki kodning tuzilishi va xatti-harakati bilan ishlaydi.
* **Proxy (Vakil):** JavaScript-da obyekt atrofida o'ralgan maxsus qobiq (vakil) bo'lib, u obyekt ustida bajariladigan barcha operatsiyalarni (xususiyatni o'qish, qiymat yozish, o'chirish va h.k.) o'z nazoratiga oladi.
* **Reflect:** JavaScript-ning o'rnatilgan obyekti bo'lib, obyektlar bilan ishlashning standart metodlarini taqdim etadi. Proxy ichidagi "trap" (tutuvchi) funksiyalarni asl obyektga xavfsiz yo'naltirish uchun xizmat qiladi.

### Real hayotiy o'xshatish
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
    "id": 1,
    "title": "Proxy yordamida Validatsiya",
    "instruction": "Foydalanuvchi obyektini tekshiruvchi `createValidatedUser(user)` funksiyasini yozing. U quyidagi shartlar bilan Proxy qaytarishi kerak:\n1. `age` xususiyati faqat son bo'lishi va 18 dan kichik bo'lmasligi kerak, aks holda Error tashlasin.\n2. `name` xususiyati faqat satr (string) bo'lishi va uzunligi kamida 3 ta belgidan iborat bo'lishi kerak, aks holda Error tashlasin.",
    "startingCode": "function createValidatedUser(user) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Proxy set(target, prop, value) trap-idan foydalaning. Validatsiyadan o'tgach, Reflect.set(target, prop, value) yoki target[prop] = value orqali qiymatni yozing.",
    "test": "const sandbox = new Function(code + '; return createValidatedUser;');\nconst fn = sandbox();\nconst target = { name: 'Ali', age: 20 };\nconst proxy = fn(target);\nproxy.age = 25;\nif (proxy.age !== 25) return 'Proxy qiymatni o\\'zgartira olmadi';\ntry {\n  proxy.age = 'yosh';\n  return 'Age string qabul qilinganda xato tashlamadi';\n} catch (e) {}\ntry {\n  proxy.age = 15;\n  return 'Age 18 dan kichik bo\\'lganda xato tashlamadi';\n} catch (e) {}\ntry {\n  proxy.name = 'Ab';\n  return 'Name 3 ta harfdan kam bo\\'lganda xato tashlamadi';\n} catch (e) {}\nreturn null;"
  },
  {
    "id": 2,
    "title": "Property Logger (Obyekt Logeri)",
    "instruction": "Obyekt ustidagi har bir o'qish (get) va yozish (set) operatsiyalarini kuzatib boruvchi `createLogger(obj)` funksiyasini yozing. Funksiya `{ proxy, logs }` ko'rinishidagi obyekt qaytarishi kerak. Bu yerda:\n- `proxy` - yaratilgan Proxy obyekti.\n- `logs` - operatsiyalarni yozib boruvchi massiv. Agar xususiyat o'qilsa, massivga `GET <prop>` ko'rinishida, yozilsa `SET <prop>=<value>` ko'rinishida satr qo'shilsin.",
    "startingCode": "function createLogger(obj) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Proxy get va set traplari ichida `logs` massiviga tegishli matnni push qiling va Reflect.get/Reflect.set orqali asl amalni bajaring.",
    "test": "const sandbox = new Function(code + '; return createLogger;');\nconst fn = sandbox();\nconst target = { name: 'Jasur' };\nconst { proxy, logs } = fn(target);\nconst n = proxy.name;\nproxy.age = 22;\nif (n !== 'Jasur') return 'GET operatsiyasi noto\\'g\\'ri qiymat qaytardi';\nif (logs[0] !== 'GET name') return 'GET logi noto\\'g\\'ri yozildi: ' + logs[0];\nif (logs[1] !== 'SET age=22') return 'SET logi noto\\'g\\'ri yozildi: ' + logs[1];\nreturn null;"
  },
  {
    "id": 3,
    "title": "Maxfiy Xususiyatlar (Safe Object)",
    "instruction": "Obyektning pastki chiziq (`_`) bilan boshlanadigan xususiyatlarini yashiruvchi va himoyalovchi `createSafeObject(obj)` funksiyasini yozing. U quyidagi qoidalarga ega Proxy qaytarsin:\n1. Pastki chiziq bilan boshlangan xususiyat o'qilganda `undefined` qaytsin.\n2. Pastki chiziq bilan boshlangan xususiyatga yozishga harakat qilinganda `Error('Access Denied')` xatosi tashlansin.\n3. Obyekt kalitlari ro'yxati olinganda (Object.keys yoki for...in da) pastki chiziq bilan boshlanadigan xususiyatlar ko'rinmasin (filtrlab tashlansin).",
    "startingCode": "function createSafeObject(obj) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "get, set va ownKeys traplaridan foydalaning. ownKeys-da Reflect.ownKeys(target) orqali barcha kalitlarni olib, key.startsWith('_') bo'lmaganlarini saqlang.",
    "test": "const sandbox = new Function(code + '; return createSafeObject;');\nconst fn = sandbox();\nconst target = { name: 'Ali', _secret: '12345' };\nconst proxy = fn(target);\nif (proxy.name !== 'Ali') return 'Oddiy xususiyatlarni o\\'qishda xatolik';\nif (proxy._secret !== undefined) return '_ bilan boshlanuvchi xususiyatni o\\'qish yopilmadi';\ntry {\n  proxy._secret = 'change';\n  return '_ bilan boshlanuvchi xususiyatga yozishda xato tashlamadi';\n} catch(e) {}\nconst keys = Object.keys(proxy);\nif (keys.includes('_secret')) return 'ownKeys orqali _secret ko\\'rinib qoldi';\nreturn null;"
  }
]
,
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
