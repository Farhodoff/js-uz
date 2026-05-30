export const promises = {
  id: "promises",
  title: "Promises: Asinxron Darslar Asosi",
  level: "Murakkab",
  description: "Promise obyekti, uning holatlari, zanjirli chaqiruvlar (.then, .catch, .finally), parallel va ketma-ket asinxron operatsiyalar, hamda Promise static metodlari.",
  theory: `## 1. NEGA kerak?

JavaScript yagona oqimli (single-threaded) til hisoblanadi. Bu degani, u bir vaqtning o'zida faqat bitta vazifani bajara oladi. Agar biz tarmoqdan ma'lumot yuklash yoki faylni o'qish kabi vaqt talab qiladigan ishlarni sinxron (kutish orqali) bajarsak, butun brauzer oynasi qotib qoladi (bloklanadi).

**Callback-lar muammosi (Callback Hell):**
Asinxron kodlarni callback funksiyalar yordamida yozish ichma-ich kodlarning ko'payib ketishiga (Pyramid of Doom / Callback Hell) olib keladi. Buni o'qish va xatolarini boshqarish juda murakkab. **Promises** (Va'dalar) asinxron operatsiyalarni tartibli, oson va zanjir shaklida yozish uchun yaratilgan.

---

## 2. SODDALIK (Analogiya)

Tasavvur qiling, siz do'kondan yangi telefon buyurtma qildingiz:
1. **Pending (Kutilmoqda):** Do'kon sizga chek berdi. Telefon hali qo'lingizda yo'q, lekin do'kon uni yetkazib berishga va'da berdi.
2. **Fulfilled (Bajarildi):** Telefon muvaffaqiyatli yetkazildi. Siz xursandsiz (resolve).
3. **Rejected (Rad etildi):** Omborda telefon qolmagani ma'lum bo'ldi. Sizga pulingiz qaytarildi va uzr so'rashdi (reject).

\\\`\\\`\\\`mermaid
stateDiagram-v2
    [*] --> Pending : new Promise()
    Pending --> Fulfilled : resolve(value)
    Pending --> Rejected : reject(error)
    Fulfilled --> [*] : .then()
    Rejected --> [*] : .catch()
\\\`\\\`\\\`

---

## 3. STRUKTURA

### A. Promise Yaratish (Promise Constructor)
Promise obyekti \`new Promise()\` konstruktori yordamida yaratiladi. U parametr sifatida \`executor\` funksiyasini oladi. Bu funksiya ikkita argument qabul qiladi: \`resolve\` va \`reject\`.
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Muvaffaqiyatli!");
  } else {
    reject("Xatolik yuz berdi!");
  }
});
\`\`\`

### B. Promise Chaining (Zanjirlash)
Birinchi asinxron ish tugagach, undan kelgan natijani keyingi \`.then()\`ga uzatish mumkin. Xatoliklar esa \`.catch()\` yordamida zanjirning istalgan joyida ushlanadi. \`.finally()\` esa muvaffaqiyatli yoki muvaffaqiyatsiz bo'lishidan qat'i nazar har doim bajariladi.
\`\`\`javascript
myPromise
  .then(result => {
    console.log(result); // "Muvaffaqiyatli!"
    return result + " Yangi qiymat";
  })
  .then(newResult => {
    console.log(newResult); // "Muvaffaqiyatli! Yangi qiymat"
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Jarayon tugadi.");
  });
\`\`\`

### C. Static Metodlar
1. **\`Promise.all([p1, p2, p3])\`** - Hamma promislar bajarilishini parallel kutadi. Agar birortasi rad etilsa (\`rejected\`), butun so'rov xatolik bilan yakunlanadi.
2. **\`Promise.race([p1, p2, p3])\`** - Qaysi promis birinchi bo'lib yakunlansa (resolve yoki reject), shuning natijasini qaytaradi.
3. **\`Promise.allSettled([p1, p2])\`** - Barcha promislar yakunlanishini kutadi (natijasi qanday bo'lishidan qat'i nazar: fulfilled yoki rejected) va ularning holatlari ro'yxatini beradi.
4. **\`Promise.any([p1, p2])\`** - Birinchi bo'lib muvaffaqiyatli (\`fulfilled\`) bo'lgan promis qiymatini qaytaradi. Agar hammasi xato bo'lsa, \`AggregateError\` tashlaydi.

### D. Parallel va Ketma-ket (Sequential) So'rovlar
- **Parallel:** Bir vaqtda bir nechta so'rov yuborish. \`Promise.all\` yordamida barcha so'rovlar fonda birga ishlaydi va umumiy vaqt eng uzoq davom etadigan so'rovga teng bo'ladi.
- **Ketma-ket (Sequential):** Birinchi so'rov natijasi olingandan keyingina ikkinchi so'rovni yuborish. Bu so'rovlar zanjirlash orqali bajariladi va vaqt barcha so'rovlar vaqtining yig'indisiga teng bo'ladi.

---

## 4. AMALIYOT

Serverdan foydalanuvchi ma'lumotlarini olish va keyin uning postlarini parallel yuklash misoli:
\`\`\`javascript
function getUser(id) {
  return Promise.resolve({ id: id, name: "Farhod" });
}

function getPosts(userId) {
  return Promise.resolve(["Post 1", "Post 2"]);
}

// Zanjir (Sequential)
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts));
\`\`\`

---

## 5. XATOLAR (Common Mistakes)

1. **Zanjirni buzish (Not returning in then):**
   \`\`\`javascript
   // XATO
   p.then(data => {
     fetchData(data); // return qilinmagani uchun keyingi .then undefined oladi
   }).then(result => { ... });
   
   // TO'G'RI
   p.then(data => {
     return fetchData(data);
   }).then(result => { ... });
   \`\`\`
2. **Xatoni ushlamaslik (Uncaught Promise Rejection):**
   Har doim promislar zanjiri oxiriga \`.catch()\` qo'shish shart, aks holda dastur kutilmaganda to'xtashi mumkin.

---

## 6. SAVOLLAR VA JAVOBLAR

**1. Promise nima?**
Asinxron operatsiyaning kelajakdagi natijasini (qiymat yoki xatoni) ifodalovchi maxsus JavaScript obyektidir.

**2. Promise-ning 3 ta holati qaysilar va ularning ma'nosi nima?**
Pending (kutilayotgan), Fulfilled (muvaffaqiyatli bajarilgan) va Rejected (xatolik bilan rad etilgan).

**3. .then() va .catch() metodlari nima uchun ishlatiladi?**
.then() muvaffaqiyatli natijani (resolve qiymatini) olish va qayta ishlash uchun, .catch() esa xatoliklarni (reject sababini) ushlash uchun xizmat qiladi.

**4. .finally() metodi nima va u qachon bajariladi?**
Promise muvaffaqiyatli yoki muvaffaqiyatsiz yakunlanishidan qat'i nazar, eng oxirida bajariladigan tozalash blokidir.

**5. Promise Chaining (zanjir) nima va u qanday ishlaydi?**
Ketma-ket asinxron amallarni bajarish uchun .then() metodlarini bir-biriga ulab yozish. Har bir .then() o'zidan keyingi .then()ga qiymat qaytaradi.

**6. Promise.all() nima va uning bitta kamchiligi qaysi?**
Bir nechta promisni parallel kutadi. Kamchiligi: agar kamida bitta promis reject bo'lsa, barcha promislar natijasi bekor qilinadi va umumiy xato qaytariladi.

**7. Promise.race() nima va u qaysi holatlarda foydali?**
Berilgan promislar orasidan eng birinchi bo'lib yakunlangan (resolve yoki reject) promisning natijasini qaytaradi. Timeout va poyga holatlarida foydali.

**8. Promise.allSettled() va Promise.all() o'rtasidagi asosiy farq nima?**
Promise.all bitta xatoda hammasini bekor qiladi. Promise.allSettled esa barcha promislar xato yoki muvaffaqiyatli bo'lsa ham tugashini kutadi va har birining holatini batafsil qaytaradi.

**9. Promise.any() nima va u qachon AggregateError qaytaradi?**
Promislardan birinchi muvaffaqiyatli (fulfilled) bo'lganini qaytaradi. Agar berilgan barcha promislar reject bo'lsa, u AggregateError xatosini qaytaradi.

**10. Parallel va Ketma-ket asinxron so'rovlar nima va ularning farqi qanday?**
Parallel so'rovlar bir vaqtda ishga tushib, vaqtni tejaydi. Ketma-ket so'rovlar esa bir-biriga bog'liq bo'lgan (biri ikkinchisining natijasiga tayanadigan) ishlarda ishlatiladi.

**11. Callback Hell va Promise o'rtasidagi farq nima?**
Callback Hell kodni ichma-ich chuqurlashtirib o'qishni qiyinlashtiradi. Promise esa kodni tekis zanjir shaklida o'qishga oson va tartibli qiladi.

**12. Promisni qanday qilib manual ravishda reject qilish mumkin?**
Konstruktor ichida reject("sabab") chaqirish yoki to'g'ridan-to'g'ri Promise.reject(new Error("xato")) yozish orqali.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Muvaffaqiyatli Promise",
      instruction: "Qiymati 'Salom' bo'lgan muvaffaqiyatli (resolve bo'lgan) Promise yarating va uni 'p' o'zgaruvchisiga yuklang.",
      startingCode: "const p = new Promise((resolve) => {\n  // Bu yerga yozing\n});",
      hint: "resolve('Salom') chaqiring.",
      test: "if (p instanceof Promise) { return p.then(r => { if (r === 'Salom') return null; return 'Qiymat Salom emas'; }); } return 'p Promise emas';"
    },
    {
      id: 2,
      title: "2️⃣ Rad etilgan Promise",
      instruction: "'Xato yuz berdi' xabari bilan rad etilgan (rejected) Promise yarating va uni 'p' o'zgaruvchisiga yuklang.",
      startingCode: "const p = new Promise((resolve, reject) => {\n  // Bu yerga yozing\n});",
      hint: "reject('Xato yuz berdi') chaqiring.",
      test: "if (p instanceof Promise) { return p.catch(err => { const msg = err instanceof Error ? err.message : err; if (msg === 'Xato yuz berdi') return null; return 'Xato xabari noto\\'g\\'ri'; }); } return 'p Promise emas';"
    },
    {
      id: 3,
      title: "3️⃣ Qisqa yo'l bilan Promise yaratish",
      instruction: "`Promise.resolve()` yordamida qiymati 100 bo'lgan Promise yarating va uni 'p' o'zgaruvchisiga yuklang.",
      startingCode: "const p = // Bu yerga yozing\n",
      hint: "const p = Promise.resolve(100);",
      test: "if (p instanceof Promise) { return p.then(r => { if (r === 100) return null; return 'Qiymat 100 emas'; }); } return 'p Promise emas';"
    },
    {
      id: 4,
      title: "4️⃣ Promise zanjiri (Chaining)",
      instruction: "Mavjud 'p' promisining natijasini olib, uni 2 ga ko'paytirib qaytaradigan keyingi `.then()` zanjirini yarating va natijani 'result' o'zgaruvchisiga yuklang.",
      startingCode: "const p = Promise.resolve(10);\nconst result = p.then(num => {\n  // Bu yerga yozing\n});",
      hint: "return num * 2;",
      test: "if (result instanceof Promise) { return result.then(r => { if (r === 20) return null; return 'Natija 20 emas'; }); } return 'result Promise emas';"
    },
    {
      id: 5,
      title: "5️⃣ Xatolarni ushlash (.catch)",
      instruction: "Rad etilgan promisdan kelayotgan xato xabarini `.catch()` yordamida ushlab, uni 'errorVal' o'zgaruvchisiga yuklang (catch ichida return qiling).",
      startingCode: "const p = Promise.reject('Muammo');\nconst errorVal = p.catch(err => {\n  // Bu yerga yozing\n});",
      hint: "return err;",
      test: "if (errorVal instanceof Promise) { return errorVal.then(r => { if (r === 'Muammo') return null; return 'Xato to\\'g\\'ri ushlanmadi'; }); } return 'errorVal Promise emas';"
    },
    {
      id: 6,
      title: "6️⃣ Parallel Promislar (Promise.all)",
      instruction: "`p1`, `p2`, `p3` promislarini parallel ravishda ishga tushirib, ularning natijalarini oluvchi `Promise.all` metodini ishlating va natijani 'allPromise' ga yuklang.",
      startingCode: "const p1 = Promise.resolve('A');\nconst p2 = Promise.resolve('B');\nconst p3 = Promise.resolve('C');\n\nconst allPromise = // Bu yerga yozing",
      hint: "Promise.all([p1, p2, p3])",
      test: "if (allPromise instanceof Promise) { return allPromise.then(r => { if (Array.isArray(r) && r.join('') === 'ABC') return null; return 'Natija noto\\'g\\'ri'; }); } return 'allPromise Promise emas';"
    },
    {
      id: 7,
      title: "7️⃣ Promislar poygasi (Promise.race)",
      instruction: "Ikki xil vaqtda bajariladigan promislar (`slow` va `fast`) poygasini o'tkazing va natijani 'racePromise' o'zgaruvchisiga yuklang.",
      startingCode: "const slow = new Promise(resolve => setTimeout(() => resolve('Sekin'), 50));\nconst fast = new Promise(resolve => setTimeout(() => resolve('Tez'), 10));\n\nconst racePromise = // Bu yerga yozing",
      hint: "Promise.race([slow, fast])",
      test: "if (racePromise instanceof Promise) { return racePromise.then(r => { if (r === 'Tez') return null; return 'Tezroq promis g\\'olib bo\\'lmadi'; }); } return 'racePromise Promise emas';"
    },
    {
      id: 8,
      title: "8️⃣ Hamma natijalar (Promise.allSettled)",
      instruction: "`p1` (muvaffaqiyatli) va `p2` (rad etilgan) promislarining yakuniy holatlarini olish uchun `Promise.allSettled` ishlating va natijani 'settledPromise' ga yuklang.",
      startingCode: "const p1 = Promise.resolve('OK');\nconst p2 = Promise.reject('FAIL');\n\nconst settledPromise = // Bu yerga yozing",
      hint: "Promise.allSettled([p1, p2])",
      test: "if (settledPromise instanceof Promise) { return settledPromise.then(r => { if (r.length === 2 && r[0].status === 'fulfilled' && r[1].status === 'rejected') return null; return 'Natija noto\\'g\\'ri'; }); } return 'settledPromise Promise emas';"
    },
    {
      id: 9,
      title: "9️⃣ Birinchi muvaffaqiyatli (Promise.any)",
      instruction: "Birinchi bo'lib muvaffaqiyatli (fulfilled) bo'lgan promisni olish uchun `Promise.any` metodini ishlating va natijani 'anyPromise' ga yuklang.",
      startingCode: "const p1 = new Promise((_, reject) => setTimeout(() => reject('Error'), 10));\nconst p2 = new Promise(resolve => setTimeout(() => resolve('Success'), 30));\n\nconst anyPromise = // Bu yerga yozing",
      hint: "Promise.any([p1, p2])",
      test: "if (anyPromise instanceof Promise) { return anyPromise.then(r => { if (r === 'Success') return null; return 'Muvaffaqiyatli promis olinmadi'; }); } return 'anyPromise Promise emas';"
    },
    {
      id: 10,
      title: "🔟 Promisifikatsiya (Callback to Promise)",
      instruction: "`delay` funksiyasini yozing. U berilgan `ms` vaqtidan keyin resolve bo'ladigan Promise qaytarsin.",
      startingCode: "function delay(ms) {\n  // Bu yerga yozing\n}",
      hint: "return new Promise(resolve => setTimeout(resolve, ms));",
      test: "const t1 = Date.now(); const p = delay(20); if (p instanceof Promise) { return p.then(() => { const diff = Date.now() - t1; if (diff >= 15) return null; return 'Kechikish noto\\'g\\'ri'; }); } return 'delay Promise qaytarmadi';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Tozalash ishlari (.finally)",
      instruction: "Promis zanjiri oxirida `loading = false` qiluvchi `.finally()` blokini yozing (kodda loading o'zgaruvchisi berilgan).",
      startingCode: "let loading = true;\nconst p = Promise.resolve('Ma\\'lumot')\n  .then(res => console.log(res))\n  // Bu yerga .finally yozing\n",
      hint: ".finally(() => { loading = false; })",
      test: "if (code.includes('finally') && !loading) return null; return 'finally ishlatilmadi yoki loading false bo\\'lmadi';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ So'rov Taymauti (Race)",
      instruction: "Agar `fetchData` promisi 50ms dan ko'p vaqt olsa, rad etiladigan (reject bo'ladigan) timeout promisi bilan `Promise.race` poygasini yarating va natijani 'result' ga yuklang.",
      startingCode: "const fetchData = new Promise(resolve => setTimeout(() => resolve('Data'), 100));\nconst timeout = new Promise((_, reject) => setTimeout(() => reject('Timeout!'), 30));\n\nconst result = // Bu yerga yozing",
      hint: "Promise.race([fetchData, timeout])",
      test: "if (result instanceof Promise) { return result.catch(err => { if (err === 'Timeout!') return null; return 'Poyga noto\\'g\\'ri tashkil etildi'; }); } return 'result Promise emas';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Promise-ning dastlabki (initial) holati qaysi?",
      options: ["fulfilled", "rejected", "pending", "resolved"],
      correctAnswer: 2,
      explanation: "Yangi Promise yaratilganda u ishini yakunlaguncha 'pending' (kutilayotgan) holatida bo'ladi."
    },
    {
      id: 2,
      question: "`Promise.all()` massividagi promis-lardan biri rad etilsa (reject) nima bo'ladi?",
      options: [
        "Faqat muvaffaqiyatlilari qaytadi",
        "Butun `Promise.all` rad etiladi (reject bo'ladi)",
        "Xato qilgan promis o'tkazib yuboriladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "`Promise.all` barcha promislar muvaffaqiyatli bo'lishini talab qiladi. Bitta xato butun zanjirni to'xtatadi."
    },
    {
      id: 3,
      question: "`Promise.race()` metodi nima qaytaradi?",
      options: [
        "Massivdagi barcha promislar natijalarini",
        "Faqat birinchi bo'lib muvaffaqiyatli yakunlangan promis natijasini",
        "Eng birinchi bo'lib yakunlangan (resolve yoki reject bo'lgan) promis natijasini",
        "Faqat xatoliklarni"
      ],
      correctAnswer: 2,
      explanation: "Promise.race o'z nomiga mos ravishda poyga o'tkazadi va birinchi tugagan (yaxshi yoki yomon natijali) promisni tanlaydi."
    },
    {
      id: 4,
      question: "Promise zanjirida `.then()` ichidagi handler return qilmasa, keyingi `.then()` qanday qiymat oladi?",
      options: ["null", "undefined", "Bo'sh string", "Xatolik tashlanadi"],
      correctAnswer: 1,
      explanation: "Agar `.then()` ichida aniq qiymat return qilinmasa, u sukut bo'yicha `undefined` qaytaradi va keyingi `.then()` ushbu `undefined`ni qabul qiladi."
    },
    {
      id: 5,
      question: "Zanjirdagi `.catch()` metodidan keyin kelgan `.then()` ishlaydimi?",
      options: [
        "Yo'q, catch zanjirni butunlay to'xtatadi",
        "Ha, agar catch ichida yangi xato throw qilinmasa, u muvaffaqiyatli zanjirni davom ettiradi",
        "Faqat asinxron funksiyalarda ishlaydi",
        "Faqat massiv qaytarilganda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`.catch()` o'zidan oldingi xatoni tozalaydi (handle qiladi) va yangi qiymat qaytarishi mumkin. Shuning uchun undan keyingi `.then()`lar ishlashda davom etadi."
    },
    {
      id: 6,
      question: "`Promise.allSettled()` qaytaradigan massivdagi har bir obyekt qaysi xususiyatlarga ega?",
      options: [
        "Faqat `value` yoki `reason`",
        "`status` va (`value` yoki `reason`)",
        "Faqat `status` va `ok`",
        "Faqat error kodlari"
      ],
      correctAnswer: 1,
      explanation: "Har bir obyektda `status` ('fulfilled' yoki 'rejected') bo'ladi. Agar status fulfilled bo'lsa `value`, rejected bo'lsa `reason` (xato sababi) mavjud bo'ladi."
    },
    {
      id: 7,
      question: "Promis-larning callback funksiyalari qaysi navbatda (queue) bajariladi?",
      options: [
        "Macrotask Queue",
        "Microtask Queue",
        "Call Stack'da sinxron",
        "Web APIs ichida"
      ],
      correctAnswer: 1,
      explanation: "Promislarning callbacklari (then/catch/finally) Microtask navbatiga joylashadi. Microtasklar macrotasklarga (masalan setTimeout) qaraganda yuqori ustuvorlikka ega."
    },
    {
      id: 8,
      question: "`new Promise((resolve, reject) => { ... })` ichidagi kod sinxronmi yoki asinxron?",
      options: [
        "Asinxron bajariladi",
        "Sinxron (darhol) bajariladi",
        "Event loop bo'shagandan keyin ishlaydi",
        "Faqat 1 soniyadan keyin ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Promise konstruktori ichidagi executor funksiya sinxron ravishda darhol ishga tushadi. Faqat uning resolve/reject qilingan callbacklari asinxron navbatga qo'yiladi."
    },
    {
      id: 9,
      question: "Promisening necha xil yakuniy (settled) holati bo'lishi mumkin?",
      options: ["1 xil (fulfilled)", "2 xil (fulfilled yoki rejected)", "3 xil", "Cheksiz"],
      correctAnswer: 1,
      explanation: "Promise faqat ikkita yakuniy holatga ega bo'lishi mumkin: fulfilled (muvaffaqiyatli) yoki rejected (rad etilgan). Ular settled deb ataladi."
    },
    {
      id: 10,
      question: "`Promise.any()` metodining `Promise.race()`dan asosiy farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "U faqat birinchi muvaffaqiyatli (fulfilled) promisni qaytaradi va faqat hammasi rad etilgandagina reject bo'ladi",
        "U tezroq ishlaydi",
        "U faqat network so'rovlarini qabul qiladi"
      ],
      correctAnswer: 1,
      explanation: "`Promise.any()` xatolarni e'tiborsiz qoldirib, birinchi g'olib kelgan muvaffaqiyatli promisni kutadi. Race esa xato bo'lsa ham birinchi tugaganni oladi."
    },
    {
      id: 11,
      question: "Bitta promisning `.then()` metodini ko'p marta mustaqil chaqirib unga bir nechta handler bog'lash mumkinmi?",
      options: [
        "Yo'q, faqat oxirgi bog'langani ishlaydi",
        "Ha, barcha bog'langan handlerlar promis bajarilgandan keyin ketma-ket parallel ishga tushadi",
        "Faqat strict mode o'chirilgan bo'lsa",
        "Buning uchun async/await kerak"
      ],
      correctAnswer: 1,
      explanation: "Ha, bitta promisga bir nechta mustaqil `.then()` ulanishi mumkin. Ular bir-biriga ta'sir qilmagan holda, promis resolve bo'lishi bilan navbatma-navbat bajariladi."
    },
    {
      id: 12,
      question: "Agar resolve(value) chaqirilgandan keyin executor ichida yana resolve(otherValue) chaqirilsa nima sodir bo'ladi?",
      options: [
        "Qiymat ikkinchisiga o'zgaradi",
        "Ikkinchi chaqiruv e'tiborsiz qoldiriladi (holat o'zgarmaydi)",
        "Xatolik tashlanadi",
        "Ikkala qiymat massiv bo'lib qaytadi"
      ],
      correctAnswer: 1,
      explanation: "Promise holati faqat bir marta o'zgarishi mumkin. Bir marta settled (resolve yoki reject) bo'lganidan so'ng, keyingi barcha resolve/reject chaqiriqlari e'tiborsiz qoldiriladi."
    }
  ]
};