export const closuresDeepDive = {
  id: "closuresDeepDive",
  title: "Closures: Amaliy Tahlil va Xotira Boshqaruvi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

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
\`\`\`javascript
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
\`\`\`

### 2. Intermediate Example (Detached DOM Element Memory Leak)
DOM elementi o'chirilgan bo'lsa ham xotirada qolib ketishi muammosi:
\`\`\`javascript
function setupLeak() {
  const button = document.getElementById("leak-button");
  
  return function handleClick() {
    // button o'zgaruvchisi yopilish ichida saqlanmoqda
    console.log("Bosilgan tugma ID:", button.id);
  };
}

// Keyinchalik DOM-dan tugma o'chirilsa ham, handleClick funksiyasi yashar ekan,
// button xotiradan to'liq o'chib ketmaydi (Detached DOM element).
\`\`\`

### 3. Advanced Example (Meteor JS mashhur Closure Leak muammosi)
\`\`\`javascript
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
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Heap vs Stack
JavaScript-da oddiy, qisqa muddatli o'zgaruvchilar **Stack** xotirasida saqlanadi. Biroq closures ishtirok etganda, o'zgaruvchilar va ularga tegishli Leksik Muhit (Lexical Environment) **Heap** xotirasiga ko'chiriladi. Chunki JS dvigateli bu o'zgaruvchilarning qancha muddat yashashini oldindan bilolmaydi.

### 2. V8 Garbage Collection va Scope Sharing
Modern V8 dvigateli closures xotirasini optimallashtiradi. Agar ichki funksiyada tashqi o'zgaruvchi ishlatilmasa, u leksik muhitdan o'chiriladi.
Biroq, agar bitta tashqi funksiyada ikkita ichki funksiya yaratilsa va ulardan faqat bittasi tashqi o'zgaruvchidan foydalansa ham, **ikkala funksiya bitta umumiy Lexical Environment obyekti bilan bog'lanadi**. Bu degani, ikkinchi funksiya global miqyosda saqlansa, birinchisidagi ishlatilmagan o'zgaruvchi ham o'chmay xotirada qolib ketaveradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`setInterval\` / \`setTimeout\` ichidagi closures havolasini uzmaslik
#### Muammo:
\`setInterval\` har doim o'zining callback-ini xotirada saqlaydi va unga ulanib qolgan barcha o'zgaruvchilarni ham tozalanishdan to'sib turadi.
#### Tuzatish:
Sikl yoki vaqt tugagandan so'ng intervalni tozalash (\`clearInterval\`) va closures-ga bo'lgan havolalarni \`null\` qilish zarur.

### 2. \`eval()\` dan foydalanish va xotirani optimallashtira olmaslik
\`eval()\` ishlatilgan funksiyada JS dvigateli hech qaysi o'zgaruvchini optimallashtira olmaydi. Barcha o'zgaruvchilar xotirada qolib ketadi.
#### Tavsiya:
Dynamic eval() ishlatishdan qat'iyan qoching.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Heap va Stack farqi nima?
   * **Javob:** Stack — tezkor, kichik hajmli va sinxron ishlovchi xotira. Heap — dynamic o'lchamli, obyektlar va closures saqlanadigan xotira.
2. **Savol:** Garbage Collector closures-ni qachon tozalaydi?
   * **Javob:** Ichki funksiyaga bo'lgan barcha havolalar \`null\` bo'lganda yoki butunlay yo'q qilinganda.
3. **Savol:** Nima uchun \`const\` ishlatganda ham xotira oqishi mumkin?
   * **Javob:** \`const\` faqat o'zgaruvchining qayta tayinlanishini (reassignment) taqiqlaydi, lekin uning ichidagi obyektlar o'zgarishi va closures xotirada qolishi mumkin.
4. **Savol:** Xotira oqishi (Memory Leak) nima?
   * **Javob:** Endi kerak bo'lmagan, lekin dasturdagi havolalar uzilmagani sababli RAM xotiradan tozalanmay qolgan ma'lumotlar.

### Middle
5. **Savol:** Detached DOM element nima va closures unga qanday bog'liq?
   * **Javob:** DOM-dan o'chirilgan, lekin JS-dagi closure ichida hali ham havolasi saqlanib qolgan elementlar.
6. **Savol:** Chrome DevTools yordamida memory leak qanday topiladi?
   * **Javob:** Memory bo'limida Heap Snapshot olib, "detached" yoki closures havolalarining soni oshib borishini tekshirish orqali.
7. **Savol:** \`WeakMap\` va \`WeakSet\` nima va u closures muammolarini qanday yengillashtiradi?
   * **Javob:** Ular o'zlarining kalitlarini kuchsiz havola (weak reference) orqali ushlab turadi va bu obyektlar boshqa joyda ishlatilmay qolsa, closures ularni xotirada ushlab qololmaydi, avtomat tozalanadi.
8. **Savol:** Closures ishlatilganda xotira hajmi oshishining sababi nimada?
   * **Javob:** Chunki har bir closure o'zining butun leksik muhit (scope) zanjirini Heap xotirasida saqlashga majbur qiladi.

### Senior
9. **Savol:** Meteor JS dagi yopilish xotirasi oqishi (Scope sharing leak) qanday ishlaydi?
   * **Javob:** Agar bitta funksiya ichida ikkita closure bo'lsa va biri katta obyektdan foydalansa, ikkinchisi esa global context-da saqlanib qolsa, ikkalasi bitta Lexical Environment obyektini bo'lishgani uchun katta obyekt ham xotiradan o'chmaydi.
10. **Savol:** V8 dvigatelidagi \`Context\` obyekti closures uchun qanday yaratiladi?
    * **Javob:** Har safar closures bo'lgan funksiya chaqirilganda, V8 Heap xotirada dynamic \`Context\` obyektini yaratadi va faqat closure-da ishlatilgan o'zgaruvchilarnigina unga ko'chiradi.
11. **Savol:** \`new Function()\` closures yaratishga qodirmi va nima uchun?
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
Katta hajmdagi ma'lumotlarni vaqtincha keshlovchi, lekin xotira to'lib ketmasligi uchun \`WeakMap\` va closures yordamida avtomatik tozalanadigan tizim tuzamiz.

\`\`\`javascript
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
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Factory vs Classes:** Private o'zgaruvchilar xotirada qimmat turadi. Agar minglab nusxalar kerak bo'lsa, closures emas, \`#\` private sintaksisiga ega \`class\`lardan foydalaning.
* **GC Timing:** Garbage Collection qachon ishlashi aniq emas (non-deterministic). Shuning uchun havolalarni zudlik bilan tozalash muhim.

---

## 10. 📌 Cheat Sheet

| Muammo / Konsept | Sababi | Yechimi |
| :--- | :--- | :--- |
| **Detached DOM** | Yopilish ichida DOM element saqlanishi | Element o'chganda closuredagi havolani \`null\` qilish |
| **Shared Scope Leak** | Closures bitta Leksik Muhitni bo'lishishi | Keraksiz closures havolalarini uzish |
| **WeakMap** | Oddiy Map xotirada ushlab turadi | Kuchsiz havolalardan foydalanish |
| **new Function** | Scope chain yo'qligi | Faqat global scope-ga ehtiyoj bo'lganda ishlatish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Memoization (Keshlovchi Funksiya)",
    "instruction": "Hisoblash yukini kamaytirish uchun, chaqirilgan argumentlar natijalarini keshda saqlovchi va bir xil argument bilan qayta murojaat qilinganda hisoblamasdan tayyor natijani qaytaruvchi `memoize(fn)` yordamchi funksiyasini yozing.",
    "startingCode": "function memoize(fn) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Closure ichida `const cache = {};` yarating. Qaytarilgan funksiya parametrni (masalan JSON.stringify yoki oddiy toString qilib) kalit sifatida ishlatsin va natijani keshga yozsin.",
    "test": "const sandbox = new Function(code + '; return memoize;');\nconst fn = sandbox();\nlet calls = 0;\nconst square = (x) => { calls++; return x * x; };\nconst memoized = fn(square);\nif (typeof memoized !== 'function') return 'memoize funksiya qaytarishi kerak';\nif (memoized(4) !== 16) return 'Hisob-kitob natijasi noto\\'g\\'ri';\nif (memoized(4) !== 16) return 'Keshdagi natija noto\\'g\\'ri';\nif (calls !== 1) return 'Funksiya keshdan foydalanmadi va qayta ishga tushdi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Bir Martalik Funksiya (Once)",
    "instruction": "Uzatilgan funksiyani faqat bir marta chaqirishga imkon beradigan, keyingi barcha chaqiriqlarda birinchi chaqiriqdagi natijani qaytaradigan `once(fn)` funksiyasini yozing.",
    "startingCode": "function once(fn) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Closure-da funksiyaning bajarilgan yoki bajarilmaganligini ifodalovchi bayroqcha (`hasRun = false`) va olingan natija o'zgaruvchisini saqlang.",
    "test": "const sandbox = new Function(code + '; return once;');\nconst fn = sandbox();\nlet counter = 0;\nconst increment = fn(() => {\n  counter++;\n  return counter;\n});\nif (typeof increment !== 'function') return 'once funksiya qaytarishi kerak';\nconst res1 = increment();\nconst res2 = increment();\nif (res1 !== 1 || res2 !== 1) return 'Qiymatlar noto\\'g\\'ri qaytdi';\nif (counter !== 1) return 'Asl funksiya 1 martadan ko\\'p bajarilib ketdi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Qisman Qo'llash (Partial Application)",
    "instruction": "Funksiya va bir nechta boshlang'ich argumentlarni (`presetArgs`) qabul qilib, yangi funksiya qaytaradigan `partial(fn, ...presetArgs)` funksiyasini yozing. Yangi funksiya chaqirilganda, u qolgan argumentlarni qabul qilib, hammasini birlashtirgan holda asl funksiyani ishga tushirsin.",
    "startingCode": "function partial(fn, ...presetArgs) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Qaytarilgan funksiya ichida rest operator yordamida yangi argumentlarni olib, `presetArgs` bilan birlashtiring (`[...presetArgs, ...newArgs]`) va `fn`ga uzating.",
    "test": "const sandbox = new Function(code + '; return partial;');\nconst fn = sandbox();\nconst multiply = (a, b, c) => a * b * c;\nconst doubleAndMultiply = fn(multiply, 2);\nif (typeof doubleAndMultiply !== 'function') return 'partial funksiya qaytarishi kerak';\nif (doubleAndMultiply(3, 4) !== 24) return 'Parametrlar noto\\'g\\'ri birlashtirildi';\nconst multiplyBySix = fn(multiply, 2, 3);\nif (multiplyBySix(5) !== 30) return 'Ko\\'p parametrli partial qo\\'llashda xatolik';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Garbage Collector (Axlat yig'uvchi) yopilish (closure) ichidagi tashqi o'zgaruvchilarni qachon xotiradan tozalaydi?",
    "options": [
      "Tashqi funksiya bajarilib bo'lishi bilanoq",
      "Ichki funksiyaga (yopilishga) bo'lgan barcha havolalar (references) butunlay yo'qolganda yoki null bo'lganda",
      "Faqat brauzer sahifasi yangilanganda",
      "Har 5 daqiqada avtomatik tarzda"
    ],
    "correctAnswer": 1,
    "explanation": "Garbage Collector faqat obyekt yoki funksiyaga hech qanday faol havola qolmagan taqdirdagina uni va uning leksik muhitini xotiradan tozalaydi."
  },
  {
    "id": 2,
    "question": "V8 dvigateli closures bo'yicha qanday xotira optimallashtirishini amalga oshiradi?",
    "options": [
      "Barcha o'zgaruvchilarni matn (string) shakliga o'tkazadi",
      "Ichki funksiyada ishlatilmagan tashqi o'zgaruvchilarni leksik muhitdan (Lexical Environment) olib tashlaydi va xotirada saqlamaydi",
      " closures ichidagi o'zgaruvchilarni Stack-ga ko'chiradi",
      "Hech qanday optimallashtirish qilmaydi, hamma o'zgaruvchilar to'liq saqlanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Modern JS dvigatellari (V8 kabi) leksik muhitni tahlil qilib, ichki funksiya tomonidan murojaat qilinmagan o'zgaruvchilarni xotirada saqlamaydi."
  },
  {
    "id": 3,
    "question": "Meteor JS freymvorkida aniqlangan mashhur 'Closure Memory Leak' (Jorj Beyli muammosi) nima sababdan sodir bo'ladi?",
    "options": [
      "Katta massivlarni `.forEach()` orqali aylanishdan",
      "Bitta tashqi funksiya ichida yaratilgan bitta closure katta hajmdagi ma'lumotni ushlab qolsa va ikkinchi closure global miqyosda saqlansa, ikkalasi bitta Lexical Environment obyekti bilan bo'lishgani uchun katta ma'lumot ham xotirada qolib ketadi",
      "`setTimeout` vaqtini juda kichik qilib belgilashdan",
      "Global o'zgaruvchilarni `const` bilan e'lon qilmaganlikdan"
    ],
    "correctAnswer": 1,
    "explanation": "Bitta tashqi funksiyadan qaytgan closures umumiy Lexical Environment obyekti bilan bog'lanadi. Agar bir closure ulkan ma'lumotni ushlab tursa va ikkinchisi yashashda davom etsa, butun leksik muhit (shu jumladan ulkan ma'lumot) xotirada qolib ketadi."
  },
  {
    "id": 4,
    "question": "Detached DOM elementlari closures ichida qanday xavf tug'diradi?",
    "options": [
      "Sahifaning CSS stillarini buzib yuboradi",
      "DOM element sahifadan o'chirilgan bo'lsa ham, closure unga bo'lgan havolani saqlab qolgani uchun u xotiradan o'chmaydi (Detached DOM Tree leak)",
      "Hech qanday xavfi yo'q, xotira avtomat tozalanadi",
      "Faqat Internet Explorer brauzerida xatolik beradi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar closure ichida DOM elementi saqlangan bo'lsa va keyin u element `remove()` qilinsa ham, closure havolasi tufayli Garbage Collector uni xotiradan chiqara olmaydi."
  },
  {
    "id": 5,
    "question": "Closures bilan bog'liq o'zgaruvchilar va leksik muhitlar xotiraning qaysi qismida (Heap yoki Stack) saqlanadi?",
    "options": [
      "Faqat Stack xotirasida",
      "Hech qayerda saqlanmaydi, dynamic hisoblanadi",
      "Heap (uyum) xotirasida, chunki ularning yashash muddati funksiya bajarilishidan uzunroq bo'lishi mumkin",
      "CPU kesh xotirasida"
    ],
    "correctAnswer": 2,
    "explanation": "Oddiy lokal o'zgaruvchilar Call Stack-da saqlanishi mumkin, ammo yopilish (closure) vujudga kelganda, leksik muhit Heap xotirasiga ko'chiriladi, chunki uning qachon o'chirilishi noma'lum bo'ladi."
  },
  {
    "id": 6,
    "question": "Chrome DevTools-ning qaysi paneli orqali closures sabab bo'lgan xotira oqishlarini (Memory Leak) tahlil qilish mumkin?",
    "options": [
      "Network paneli",
      "Memory paneli (Heap Snapshot yordamida)",
      "Elements paneli",
      "Security paneli"
    ],
    "correctAnswer": 1,
    "explanation": "Memory panelida olingan Heap Snapshot-lar orqali xotiradagi obyeklar va closures havolalarining qayerda bog'lanib qolganini ko'rish mumkin."
  },
  {
    "id": 7,
    "question": "Quyidagi kodda `eval()` ishlatilishi closures-ga qanday ta'sir qiladi?\n```javascript\nfunction outer() {\n  let secret = \"123\";\n  let unused = \"data\";\n  eval(\"\");\n  return () => console.log(secret);\n}\n```",
    "options": [
      "Hech qanday ta'sir ko'rsatmaydi",
      "V8 dvigatelining optimallashtirish qobiliyatini cheklaydi, chunki dynamic kod nima so'rashini bilmaganligi sababli barcha o'zgaruvchilarni (jumladan `unused`ni ham) xotirada saqlashga majbur bo'ladi",
      "Dasturning xavfsizligini ta'minlaydi",
      "Faqat `secret` o'zgaruvchisini o'chirib yuboradi"
    ],
    "correctAnswer": 1,
    "explanation": "`eval` ishlatilganda JS dvigateli qaysi o'zgaruvchi dynamic chaqirilishini oldindan bilolmaydi va scope-ni optimallashtira olmaydi, natijada barcha o'zgaruvchilar xotirada qoladi."
  },
  {
    "id": 8,
    "question": "Quyidagi kodda nima uchun xotira oqishi (Memory Leak) yuz berishi mumkin?\n```javascript\nlet replaceThing = function () {\n  let originalThing = theThing;\n  let unused = function () {\n    if (originalThing) console.log(\"hi\");\n  };\n  theThing = {\n    longStr: new Array(1000000).join('*'),\n    someMethod: function () {}\n  };\n};\nsetInterval(replaceThing, 1000);\n```",
    "options": [
      "`setInterval` ishlamay qoladi",
      "`unused` closure va `someMethod` closure bitta leksik muhitni bo'lishadi. `theThing`ning `someMethod`i omon qoladi va har soniyada oldingi `originalThing`ni yopilishda zanjirdek ushlab boradi, natijada xotira to'lib ketadi",
      "Chunki massiv hajmi juda kichik",
      "Chunki `replaceThing` o'zgaruvchisi o'zgarmas `const` emas"
    ],
    "correctAnswer": 1,
    "explanation": "Bu Meteor muammosining klassik namunasidir. `someMethod` global `theThing` tarkibida saqlanib qoladi va o'zi bilan birga `originalThing` saqlangan leksik muhitni tortib yuradi, bu zanjir har soniyada uzayib boradi."
  },
  {
    "id": 9,
    "question": "Qisman qo'llash (Partial Application) va Currying usullari closures bilan qanday bog'liq?",
    "options": [
      "Ular closures-dan foydalanmaydi, faqat prototiplarga asoslanadi",
      "Ular dastlabki uzatilgan parametrlarni closure (yopilish) ichida saqlab qolib, keyinchalik to'liq chaqiruvda foydalanadi",
      "Ular xotirani avtomatik ravishda kamaytiradi",
      "Ular faqat sinxron kodlarda xatolarni oldini oladi"
    ],
    "correctAnswer": 1,
    "explanation": "Currying va Partial application funksiyalarga dastlab berilgan argumentlarni closure-da saqlaydi va keyingi chaqiriqlar o'sha saqlangan qiymatlardan foydalanadi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodda `new Function` ishlatilganda nima sodir bo'ladi?\n```javascript\nlet x = 10;\nfunction outer() {\n  let x = 20;\n  return new Function('console.log(x)');\n}\nconst fn = outer();\nfn();\n```",
    "options": [
      "`20` chiqadi, chunki u `outer` ichida yaratilgan",
      "`10` chiqadi, chunki `new Function` yopilgan leksik muhitni emas, faqat global scope-ni ko'radi",
      "`undefined` chiqadi",
      "`ReferenceError` xatoligi yuz beradi"
    ],
    "correctAnswer": 1,
    "explanation": "`new Function` orqali yaratilgan funksiyalar jismoniy joylashuviga qaramay, har doim global scope leksik qamroviga ulanadi va lokal yopilishlarni (closures) yarata olmaydi."
  },
  {
    "id": 11,
    "question": "Quyidagi kodda xotira oqishining oldini olish uchun qanday o'zgarish qilish kerak?\n```javascript\nlet element = document.getElementById('button');\nelement.addEventListener('click', function onClick() {\n  // element bilan qandaydir amal\n});\n```",
    "options": [
      "`onClick` funksiyasini `const` qilish",
      "Element o'chirilganda `removeEventListener` yordamida `onClick`ni tozalash yoki havola zanjirini uzish",
      "Tugmani yashirib qo'yish (`display: none`)",
      "Hech qanday o'zgarish shart emas, brauzer o'zi tozalaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Element o'chirilayotganda unga bog'liq dynamic listener-larni o'chirish yoki mos closures havolalarini uzish detached DOM elements hosil bo'lishining oldini oladi."
  },
  {
    "id": 12,
    "question": "Garbage Collector-ga xotiradagi keraksiz obyektlarni yig'ishga yordam berish uchun modern JS dasturchilari qanday obyekt turidan foydalanadilar (havolani kuchsiz saqlash uchun)?",
    "options": [
      "`Map` va `Set` dan",
      "`WeakMap` va `WeakSet` dan",
      "`Object.freeze` qilingan obyektlardan",
      "`JSON.stringify` qilingan ma'lumotlardan"
    ],
    "correctAnswer": 1,
    "explanation": "`WeakMap` va `WeakSet` kalitlari bo'lgan obyektlar kuchsiz havolaga ega bo'ladi (weak references). Agar obyektga boshqa kuchli havola qolmasa, u Garbage Collector tomonidan xotiradan tozalab yuborilaveradi (closures-da ham keng qo'llaniladi)."
  }
]

};
