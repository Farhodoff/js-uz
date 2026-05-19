export const metaprogramming = {
  id: "a23",
  title: "Metaprogramming: Proxy va Reflect",
  theory: `## 1. KIRISH
Metadasturlash (Metaprogramming) - bu kodning o'zini o'zi o'zgartirishi yoki boshqarishi. JavaScriptda **Proxy** va **Reflect** yordamida biz obyektlarning standart xatti-harakatlarini (o'qish, yozish, o'chirish) butunlay o'zgartira olamiz. 

**Vue 3** va **MobX** kabi frameworklar aynan shu texnologiya ustiga qurilgan.

## 2. CHUQUR TUSHUNCHALAR

### Proxy (Vakil) ⭐
Proxy - bu biror obyekt atrofidagi "himoya qobig'i". U obyektga bo'layotgan har bir murojaatni tutib oladi (trap) va bizga uni boshqarish imkonini beradi.

### Reflect (Aks ettirish)
Reflect - bu obyektlar bilan ishlashning zamonaviy va qulayroq usullari jamlangan ichki obyekt. U ko'pincha Proxy ichida ishlatiladi.

---

## 3. KOD MISOLLARI

### Misol 1 — Data Validation (Tekshirish)
Obyektga noto'g'ri turdagi ma'lumot yozishni taqiqlash.
\`\`\`javascript
const user = { name: "Ali", age: 25 };

const secureUser = new Proxy(user, {
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new Error("Yosh faqat son bo'lishi kerak!");
    }
    target[prop] = value;
    return true;
  }
});

secureUser.age = 30; // Ishlaydi
// secureUser.age = "o'ttiz"; // ❌ Xato beradi!
\`\`\`

### Misol 2 — "Sehrli" Reactivity (Reaktivlik)
Obyekt o'zgarganda avtomatik ravishda biror amal bajarish.
\`\`\`javascript
const data = { count: 0 };

const reactive = new Proxy(data, {
  set(target, prop, value) {
    console.log(\`\${prop} o'zgardi: \${target[prop]} -> \${value}\`);
    target[prop] = value;
    // Bu yerda UI ni yangilash kodini yozish mumkin
    return true;
  }
});

reactive.count++; // → count o'zgardi: 0 -> 1
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Proxy qanday ishlaydi?
\`\`\`mermaid
graph LR
    A[KOD] -- murojaat --> B((PROXY))
    B -- TRAP: set/get --> C{Mantiqni tekshir}
    C -- To'g'ri bo'lsa --> D[ASL OBYEKT]
    C -- Xato bo'lsa --> E[Throw Error]
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Proxy nima uchun kerak?** - Obyektlar ustidan to'liq nazorat o'rnatish: validatsiya, reaktivlik, log yozish (logging) uchun.
2. **Trap (tuzoq) nima?** - Proxy ichidagi metodlar (get, set, has, deleteProperty) bo'lib, ular ma'lum bir amal sodir bo'lganda ishga tushadi.
3. **Proxy va Reflect farqi?** - Proxy murojaatni tutib oladi, Reflect esa o'sha murojaatni asl obyektda xavfsiz bajarishga yordam beradi.

---

## 6. MINI LOYIHA: "Negative Index Array"
**Vazifa:** Python kabi manfiy indekslarni (\`arr[-1]\`) tushunadigan massiv yarating.

\`\`\`javascript
function createSmartArray(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      let index = Number(prop);
      if (index < 0) {
        index = target.length + index;
      }
      return target[index];
    }
  });
}

const list = createSmartArray(["A", "B", "C"]);
console.log(list[-1]); // → "C" (Massiv oxiri!)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Proxy Validatsiya",
      instruction: "Obyektga yangi xususiyat qo'shishni taqiqlovchi Proxy yozing.",
      startingCode: "const data = { name: 'JS' };\nconst proxy = new Proxy(data, {\n  // faqat bor xususiyatni o'zgartirishga ruxsat bering\n});",
      hint: "if (!(prop in target)) return false;",
      test: "if (code.includes('in target')) return null; return 'In operatoridan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da Metadasturlash (Metaprogramming) deganda nima tushuniladi?",
      options: [
        "HTML elementlarini JavaScript yordamida tezkor render qilish",
        "Kodni o'zini o'zi tahlil qiladigan, o'zgartiradigan yoki boshqa kodning xatti-harakatlarini nazorat qiladigan dasturlar yozish san'ati",
        "Ma'lumotlar bazasidan ma'lumotlarni meta-taglar yordamida qidirish",
        "Kodni faqat CSS stillari bilan bog'lash"
      ],
      correctAnswer: 1,
      explanation: "Metadasturlash — bu dasturning boshqa dasturlarni (yoki o'zining xatti-harakatlarini) ma'lumot sifatida qabul qilib, ularni o'zgartira olish qobiliyatidir. JavaScriptda bunga Proxy va Reflect yordamida erishiladi."
    },
    {
      id: 2,
      question: "Proxy obyektini yaratishda `handler` obyekti ichidagi `get` va `set` kabi maxsus metodlar nima deb ataladi?",
      options: [
        "Filters (Filtrlar)",
        "Traps (Tuzoqlar)",
        "Listeners (Eshituvchilar)",
        "Interceptors (To'suvchilar)"
      ],
      correctAnswer: 1,
      explanation: "Proxy'da obyekt ustidagi operatsiyalarni (murojaat, o'zgartirish va h.k.) tutib oluvchi bu metodlar rasmiy ravishda 'traps' (tuzoqlar) deb ataladi."
    },
    {
      id: 3,
      question: "Proxy yordamida obyektning biror xususiyatini o'chirish (`delete obj.prop`) harakatini tutib qolish uchun qaysi trap (tuzoq) metodidan foydalaniladi?",
      options: [
        "`delete()`",
        "`deleteProperty()`",
        "`removeProperty()`",
        "`unset()`"
      ],
      correctAnswer: 1,
      explanation: "Obyekt xususiyatini o'chirish operatsiyasini nazorat qilish va taqiqlash yoki o'zgartirish uchun `deleteProperty(target, prop)` trap funksiyasidan foydalaniladi."
    },
    {
      id: 4,
      question: "Reflect obyekti nima va u asosan nima uchun ishlatiladi?",
      options: [
        "Brauzer oynasini aks ettiruvchi (iframe) yaratish vositasi",
        "Obyektlar bilan ishlashda uning standart metodlarini (masalan, get, set, defineProperty) sodda, xavfsiz va funksional ko'rinishda chaqirish imkonini beruvchi, hamda true/false natija qaytaruvchi o'rnatilgan obyekt",
        "Ma'lumotlarni shifrlash klassi",
        "Serverga so'rov yuborish kutubxonasi"
      ],
      correctAnswer: 1,
      explanation: "Reflect — bu obyektlarning ichki operatsiyalari uchun tayyor metodlar to'plamidir. Masalan, `try/catch` bloklarisiz `Reflect.set()` true/false qaytarib xavfsiz qiymat belgilash imkonini beradi va u Proxy trap metodlari bilan bir xil parametrlarga ega."
    },
    {
      id: 5,
      question: "Quyidagi kod e'lon qilingandan so'ng, `proxy.age` qiymati consolega nima deb chiqadi?\n```javascript\nconst target = { name: 'Ali' };\nconst proxy = new Proxy(target, {\n  get(target, prop) {\n    return prop in target ? target[prop] : 'Yo\\'q';\n  }\n});\nconsole.log(proxy.age);\n```",
      options: [
        "`undefined`",
        "`\"Yo'q\"`",
        "`ReferenceError` xatoligi beradi",
        "`\"Ali\"`"
      ],
      correctAnswer: 1,
      explanation: "Proxy'dagi `get` trap metodi `target` obyektda so'ralgan xususiyat bor-yo'qligini `in` operatori orqali tekshiradi. `age` xususiyati yo'qligi sababli `'Yo\\'q'` qiymati qaytariladi."
    }
  ]
};
