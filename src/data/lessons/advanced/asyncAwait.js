export const asyncAwait = {
  id: "asyncAwait",
  title: "Async/Await — Asinxronlikning Cho'qqisi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Async/Await nima?
**Async/Await** — bu JavaScript-da asinxron kodni (Promises) xuddi sinxron (ketma-ket yozilgan) kod kabi oson, chiziqli va chiroyli yozish imkonini beruvchi zamonaviy sintaksisdir. U yangi asinxron mexanizm yaratmaydi, balki mavjud va'dalar (Promises) ustiga qurilgan qulay qobiq ("syntactic sugar") hisoblanadi.

### Real hayotiy o'xshatish (Beginner Analogy)
Tasavvur qiling, siz **restoranda ovqat buyurtma qilyapsiz**:
* **Callbacks (Eski usul):** Siz buyurtma berasiz va ofitsiantga telefon raqamingizni qoldirasiz. Ovqat tayyor bo'lgach sizga telefon qilishadi (callback). Telefon qilishganidan keyin keyingi buyurtmani tushuntirishingiz kerak. Agar zanjir uzun bo'lsa, bu "Callback Hell" ga aylanadi.
* **Promises (O'rta usul):** Buyurtma berishingiz bilan sizga elektron kvitansiya (Promise) berishadi. Siz kvitansiyani qo'lda ushlab, \\\`.then()\\\` (agar pishsa) va \\\`.catch()\\\` (agar kuyib ketgan bo'lsa) qoidalarini yozib kutasiz.
* **Async/Await (Zamonaviy usul):** Siz kafega kelib, buyurtma berasiz va joyingizda o'tirib **kutib turasiz** (\\\`await\\\`). Ovqat stolingizga kelgunicha boshqa hech narsa qilmaysiz (kod kutiladi). Taom kelgach esa, xuddi sinxron holdagidek ovqatlanishni boshlaysiz. Agar muammo bo'lsa (\\\`try-catch\\\`), darhol ma'murni chaqirasiz.

---

## 2. 🧠 Deep Dive (Under the hood, memory, V8 engine)

V8 dvigateli (engine) \\\`async/await\\\` ni qanday tushunadi?
Aslida JavaScript single-threaded (yagona oqim) va u asinxronlikni bevosita o'zi bajarmaydi, balki Web API (yoki Node.js da C++ API) larga topshiradi. 

\\\`async/await\\\` — bu aslida **Generatorlar** va **Promises** yig'indisining "syntactic sugar"idir.
Qachonki V8 \\\`await\\\` kalit so'ziga duch kelsa:
1. U funksiya bajarilishini to'xtatadi (suspend).
2. Oqimni (Event Loop) bloklamaydi, balki boshqa sinxron kodlarni bajarishga ruxsat beradi.
3. Promise hal bo'lganda (resolved/rejected), **Microtask Queue** orqali funksiya o'z ishini to'xtagan joyidan davom ettiradi (resume).
4. Xotira jihatidan, har bir \\\`await\\\` funksiyaning lokal o'zgaruvchilari (execution context) ni xotirada saqlab turadi, shuning uchun ham keraksiz ketma-ket \\\`await\\\` lar xotira sarfini biroz oshirishi mumkin.

\\\`\\\`\\\`javascript
// V8 dvigateli taxminan quyidagicha ishlaydi (abstraksiya):
function* asyncFunction() {
  const result = yield fetch('url'); // await vazifasini bajaradi
  console.log(result);
}
\\\`\\\`\\\`

**Performance bo'yicha maslahat:**
Agar ikkita \\\`await\\\` bir-biriga bog'liq bo'lmasa, ularni ketma-ket yozmang! Bu vaqt yo'qotishiga (waterfall effect) olib keladi. Buni \\\`Promise.all\\\` yordamida parallellashtiring:

\\\`\\\`\\\`javascript
// Yomon usul (Waterfal effect - ketma-ket)
const users = await fetchUsers(); // 1s
const posts = await fetchPosts(); // 1s
// Jami: 2 soniya kutildi

// Yaxshi usul (Parallel)
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
// Jami: 1 soniya kutildi
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Noodatiy holatlar)
1. **Loop ichida await:**
\\\`forEach\\\` ichida \\\`await\\\` ishlamaydi, chunki \\\`forEach\\\` callback larni kutmaydi (barchasini bir vaqtda ishga tushirib yuboradi). Ketma-ket kutish uchun \\\`for...of\\\` yoki oddiy \\\`for\\\` tsiklini ishlating.
2. **Top-level await:** 
Faqat ES Modules (\\\`type="module"\\\`) da ishlaydi. U modullarda eng yuqori darajada async funksiyasiz \\\`await\\\` ishlatish imkonini beradi.
3. **Promise.all vs Promise.allSettled:**
\\\`Promise.all\\\` bittasi reject bo'lsa ham butunlay to'xtaydi va catch ga o'tadi. \\\`Promise.allSettled\\\` esa hammasining natijasini (fulfilled yoki rejected) yig'ib beradi.

### Senior Interview Questions
1. **Savol:** Nima uchun class constructor-i (konstruktor) \\\`async\\\` bo'la olmaydi?
   * **Javob:** Konstruktor har doim yaratilgan obyekt instance'ini qaytarishi kerak. Agar u async bo'lsa, u Promise qaytargan bo'lardi, bu esa JS obyekti instansiyasi mantiqiga zid.
2. **Savol:** \\\`await\\\` so'zini promise bo'lmagan oddiy qiymat oldidan ishlatsak nima bo'ladi?
   * **Javob:** JS xato bermaydi, u avtomatik ravishda \\\`Promise.resolve(qiymat)\\\` ga o'raydi. Masalan: \\\`const x = await 5;\\\` x ning qiymati 5 bo'ladi.
3. **Savol:** \\\`Unhandled Promise Rejection\\\` xatosi qanday yuzaga keladi?
   * **Javob:** Agar Promise rad etilsa (rejected) va uning atrofida \\\`try-catch\\\` bo'lmasa yoki zanjir oxirida \\\`.catch()\\\` ulanmagan bo'lsa yuzaga keladi. Dastur kutilmaganda to'xtab qolishi mumkin.
4. **Savol:** Event Loop va Microtask Queue bilan \\\`async/await\\\` qanday ishlaydi?
   * **Javob:** \\\`await\\\` dan keyingi barcha qatorlar (kodlar) Promise-ning \\\`.then()\\\` blokiga o'xshab Microtask Queue-ga tushadi va Event Loop stack bo'shashi bilanoq, joriy makrotask tugashi bilan birinchi navbatda ularni ishga tushiradi.

---

## 4. 📊 Mermaid Diagram

Ushbu diagrammada Event Loop va Async/Await munosabati tasvirlangan:

\\\`\\\`\\\`mermaid
graph TD;
    A[Call Stack] -->|Kodni o'qiydi| B{async funksiya?};
    B -->|Ha| C[await ga duch keldi];
    B -->|Yo'q| D[Sinxron kodni bajaradi];
    C --> E[Web API ga Promise yuboriladi];
    E -->|Promise hal bo'lgach| F[Microtask Queue];
    F -->|Stack bo'shagach| G[Call Stack ga qaytadi];
    G --> H[Funksiya to'xtagan joyidan davom etadi];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Asinxron Ma'lumot Yuklash",
      instruction: "Taqdim etilgan `fetchData` funksiyasini chaqirib, undan qaytgan ma'lumotni qaytaruvchi asinxron `getUserData` funksiyasini yozing. `fetchData` va'da (Promise) qaytaradi.",
      startingCode: "async function getUserData() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "const data = await fetchData(); return data;",
      test: "if (!code.includes('await')) return 'await kalit so\\'zi ishlatilmadi';\ntry {\n  const sandbox = new Function('fetchData', code + '; return getUserData;');\n  const fn = sandbox(async () => 'ok');\n  const p = fn();\n  if (!(p instanceof Promise)) return 'getUserData funksiyasi Promise qaytarmayapti (async ekanligiga ishonch hosil qiling)';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
    },
    {
      id: 2,
      title: "Xatoliklarni Try-Catch bilan Boshqarish",
      instruction: "Asinxron `fetchUser` funksiyasini chaqirib, natijani qaytaruvchi `safeFetch` asinxron funksiyasini yozing. Agar `fetchUser` xato bersa (reject), catch blokida 'Xato yuz berdi' satrini qaytaring.",
      startingCode: "async function safeFetch() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "try {\n  return await fetchUser();\n} catch(err) {\n  return 'Xato yuz berdi';\n}",
      test: "if (!code.includes('try') || !code.includes('catch')) return 'try-catch blogi ishlatilmadi';\ntry {\n  const sandbox = new Function('fetchUser', code + '; return safeFetch;');\n  const fn = sandbox(async () => { throw new Error('fail'); });\n  const p = fn();\n  if (!(p instanceof Promise)) return 'safeFetch funksiyasi Promise qaytarishi kerak';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
    },
    {
      id: 3,
      title: "Paralel Asinxron Amallar (Promise.all)",
      instruction: "Ikkita asinxron funksiya `getProfile()` va `getPosts()` berilgan. Ularni bir vaqtda (paralel) ishga tushirib, natijalarini [profile, posts] massivi ko'rinishida qaytaruvchi asinxron `getDashboardData()` funksiyasini yozing.",
      startingCode: "async function getDashboardData() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return await Promise.all([getProfile(), getPosts()]);",
      test: "if (!code.includes('Promise.all')) return 'Promise.all ishlatilmadi';\ntry {\n  const sandbox = new Function('getProfile', 'getPosts', code + '; return getDashboardData;');\n  const fn = sandbox(async () => 'p', async () => 'posts');\n  const p = fn();\n  if (!(p instanceof Promise)) return 'getDashboardData funksiyasi Promise qaytarishi kerak';\n} catch(e) { return 'Xatolik: ' + e.message; }\nreturn null;"
    },
    {
      id: 4,
      title: "Oddiy async funksiya",
      instruction: "Hech qanday maxsus asinxron amalsiz faqat `'Hello'` satrini qaytaruvchi asinxron `sayHello()` funksiyasini yozing.",
      startingCode: "async function sayHello() {\n  // Kodni yozing\n}",
      hint: "async funksiyada shunchaki `return 'Hello';` yozishingiz kifoya, u o'zi Promise.resolve qaytaradi.",
      test: "const fn = new Function(code + '; return sayHello;')(); return fn().then(r => r === 'Hello' ? null : 'Xato');"
    },
    {
      id: 5,
      title: "Await yordamida qiymat olish",
      instruction: "`getSecret()` asinxron funksiyasi bor deb faraz qiling. Uning natijasini kutib (await) va qaytaradigan asinxron `revealSecret()` yozing.",
      startingCode: "async function revealSecret() {\n  // Kodni yozing\n}",
      hint: "return await getSecret();",
      test: "const fn = new Function('getSecret', code + '; return revealSecret;'); const r = fn(async () => 'Secret'); return r().then(x => x === 'Secret' ? null : 'Xato');"
    },
    {
      id: 6,
      title: "Throw orqali xato chiqarish",
      instruction: "Agar parametrdagi raqam manfiy bo'lsa darhol xato (throw 'Manfiy son') chiqaradigan, musbat bo'lsa uning kvadratini qaytaruvchi asinxron `squareAsync(n)` yozing.",
      startingCode: "async function squareAsync(n) {\n  // Kodni yozing\n}",
      hint: "if (n<0) throw 'Manfiy son'; return n*n;",
      test: "const fn = new Function(code + '; return squareAsync;')(); return fn(-1).catch(e => e==='Manfiy son' ? null : 'Xato');"
    },
    {
      id: 7,
      title: "Ikkita amallarni ketma-ket (Sequential) bajarish",
      instruction: "`step1()` va undan keyin `step2()` ni ketma-ket chaqiruvchi va ikkalasi tugagach `'Done'` qaytaruvchi asinxron `runSteps()` yozing.",
      startingCode: "async function runSteps() {\n  // Kodni yozing\n}",
      hint: "await step1(); await step2(); return 'Done';",
      test: "let c=0; const fn=new Function('step1', 'step2', code+'; return runSteps;'); const r = fn(async ()=>c++, async ()=>c++); return r().then(x => x==='Done'&&c===2?null:'Xato');"
    },
    {
      id: 8,
      title: "JSON Parsed",
      instruction: "Berilgan url (satr) ga fetch so'rov yuboradigan va `await res.json()` ni qaytaradigan `fetchData(url)` ni qisman taqlid qilib yozing. (Fetch haqida o'ylamang, json() metodli ob'yekt qaytaruvchi mock `mockFetch(url)` ni kuting).",
      startingCode: "async function fetchData(url) {\n  // Kodni yozing\n}",
      hint: "const res = await mockFetch(url); return await res.json();",
      test: "const fn = new Function('mockFetch', code + '; return fetchData;'); const r=fn(async()=>({json:async()=>'OK'})); return r().then(x=>x==='OK'?null:'Xato');"
    },
    {
      id: 9,
      title: "Asinxron If",
      instruction: "Asinxron `checkAccess()` yordamida tekshiring: agar u true qaytarsa `'Welcome'`, false qaytarsa `'Denied'` qaytarsin. Yechim asinxron bo'lsin.",
      startingCode: "async function login() {\n  // Kodni yozing\n}",
      hint: "const ok = await checkAccess(); return ok ? 'Welcome' : 'Denied';",
      test: "const fn = new Function('checkAccess', code + '; return login;'); return fn(async()=>false)().then(x=>x==='Denied'?null:'Xato');"
    },
    {
      id: 10,
      title: "Async Loop (For...of)",
      instruction: "Asinxron funksiyalar massivi berilgan: `funcs`. Ularni `for...of` bilan birma-bir asinxron kutib (await), natijalarini yangi massivga yig'ib qaytaradigan asinxron `runSequence(funcs)` yozing.",
      startingCode: "async function runSequence(funcs) {\n  // Kodni yozing\n}",
      hint: "const res = []; for (let f of funcs) { res.push(await f()); } return res;",
      test: "const fn = new Function(code + '; return runSequence;')(); return fn([async()=>1, async()=>2]).then(r=>r[1]===2?null:'Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`async` kalit so'zi funksiya oldidan qo'yilganda nima sodir bo'ladi?",
      options: [
        "Funksiya sinxron rejimga o'tadi va tezroq ishlaydi",
        "Funksiya har doim Promise (va'da) qaytaradigan bo'ladi",
        "Funksiya avtomatik ravishda setTimeout ichiga o'raladi",
        "Funksiya xotiradan butunlay o'chiriladi"
      ],
      correctAnswer: 1,
      explanation: "Funksiya oldiga `async` qo'yilganda, u har doim Promise qaytaradi. Agar funksiya ichida oddiy qiymat qaytarilsa ham, u avtomatik ravishda Promise.resolve() bilan o'raladi."
    },
    {
      id: 2,
      question: "`await` kalit so'zini qayerlarda ishlatish mumkin?",
      options: [
        "Faqat `async` deb e'lon qilingan funksiyalar ichida (yoki top-level await qo'llab-quvvatlaydigan modullarda)",
        "Istalgan oddiy funksiya yoki sikl (loop) ichida cheklovsiz",
        "Faqat HTML fayl ichidagi script teglarida",
        "Faqat klass konstruktori (constructor) ichida"
      ],
      correctAnswer: 0,
      explanation: "`await` kalit so'zi asinxron operatsiya tugashini kutish uchun faqat `async` funksiyalar ichida yoki modern ES modullarning eng yuqori darajasida (top-level await) ishlaydi."
    },
    {
      id: 3,
      question: "Agar `await` qilingan Promise 'rejected' (rad etilgan) holatga o'tsa, nima sodir bo'ladi?",
      options: [
        "Dastur hech qanday xatosiz jim to'xtaydi",
        "Promise avtomatik ravishda yana bir bor bajarilishga urinadi",
        "Xatolik (exception) otiladi, uni try-catch bloki orqali tutish kerak",
        "Brauzer o'z-o'zidan qayta yuklanadi"
      ],
      correctAnswer: 2,
      explanation: "Rad etilgan Promise `await` qilinganida xuddi oddiy xatolik otilgandek (`throw`) ishlaydi. Shuning uchun uni try-catch bloki yordamida boshqarish lozim."
    },
    {
      id: 4,
      question: "Quyidagi kodda nima xato bor?\\n`function show() { const data = await fetchDetails(); }`",
      options: [
        "`await` faqat `async` funksiya ichida ishlatilishi kerak",
        "`const` o'rniga `let` ishlatish shart",
        "`fetchDetails` parametri berilmagan",
        "Kodda xatolik yo'q, u to'g'ri ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "`await` faqat asinxron funksiyalar ichida ishlaydi. Ushbu kod ishlashi uchun `async function show()` deb yozilishi kerak."
    },
    {
      id: 5,
      question: "Bir nechta asinxron so'rovlarni parallel bajarish va ularning barchasi tugashini kutish uchun qaysi metod ishlatiladi?",
      options: [
        "Promise.race()",
        "setInterval()",
        "async.parallel()",
        "Promise.all()"
      ],
      correctAnswer: 3,
      explanation: "`Promise.all()` bir nechta Promise massivini qabul qilib, ularning hammasi muvaffaqiyatli bajarilgandan so'ng umumiy natijani qaytaradi."
    },
    {
      id: 6,
      question: "Async/await qaysi fundamental JS obyekti ustiga qurilgan 'syntactic sugar' hisoblanadi?",
      options: [
        "Promise (Va'dalar)",
        "Array (Massivlar)",
        "Closure (Yopilmalar)",
        "Callback funksiyalar"
      ],
      correctAnswer: 0,
      explanation: "Async/await sintaksisi asinxron kodni chiroyli va tushunarli yozish uchun Promise API ustiga qurilgan qulaylikdir."
    },
    {
      id: 7,
      question: "`async` funksiya ichida oddiy qiymat qaytarganimizda (masalan `return 42;`), aslini olganda nima qaytadi?",
      options: [
        "Oddiy son turi (Number)",
        "Undefined qiymati",
        "42 qiymati bilan hal qilingan (resolved) Promise obyekti",
        "Promise.reject(42) obyekti"
      ],
      correctAnswer: 2,
      explanation: "`async` funksiyadan qaytgan har qanday qiymat Promise.resolve(qiymat) ko'rinishida Promise-ga o'raladi."
    },
    {
      id: 8,
      question: "Top-level await nima?",
      options: [
        "ES modullarda async funksiyasiz to'g'ridan-to'g'ri eng yuqori darajada `await` ishlatish imkoniyati",
        "Brauzerning eng yuqori qismida skroll qilish vaqtidagi asinxronlik",
        "Barcha kutubxonalardan oldin Promise yuklash",
        "Window obyektida global wait qilish"
      ],
      correctAnswer: 0,
      explanation: "Zamonaviy JavaScript (ES modullar) tarkibida async funksiya yaratmasdan ham bevosita faylning o'zida `await` ishlatish imkoniyati Top-level await deb ataladi."
    },
    {
      id: 9,
      question: "Nima uchun class constructor-i ichida `async/await` ishlatib bo'lmaydi?",
      options: [
        "Klasslar faqat sinxron kod uchun yaratilgan",
        "Chunki konstruktor har doim yangi klass nusxasini (instance) qaytarishi shart, Promise emas",
        "V8 dvigateli klasslarda asinxronlikni taqiqlaydi",
        "JavaScript prototiplari asinxronlikni qo'llamaydi"
      ],
      correctAnswer: 1,
      explanation: "Konstruktor yangi obyekt instance qaytarishi kerak. Agar u async qilinib Promise qaytarsa, new kalit so'zi kutilganidek ishlamaydi."
    },
    {
      id: 10,
      question: "Birinchi tugagan asinxron operatsiyaning natijasini olish kerak bo'lsa (qolganlarini kutmasdan), qaysi metoddan foydalaniladi?",
      options: [
        "Promise.race()",
        "Promise.all()",
        "Promise.allSettled()",
        "Promise.any()"
      ],
      correctAnswer: 0,
      explanation: "`Promise.race()` massivdagi eng birinchi bo'lib yakunlangan (resolved yoki rejected) Promise-ning natijasini qaytaradi."
    },
    {
      id: 11,
      question: "Asinxron siklda (for-await-of) qanday oqimlar yoki obyektlar bilan ishlash mumkin?",
      options: [
        "Asinxron generatorlar va AsyncIterable obyektlar",
        "Oddiy massivlar va obyektlar bilan faqat",
        "DOM hodisalari bilan faqat",
        "JSON fayllar bilan faqat"
      ],
      correctAnswer: 0,
      explanation: "`for await...of` sikli asinxron oqimlar, generatsiyalar va AsyncIterable interfeysiga ega bo'lgan obyeklar ustida aylanish uchun mo'ljallangan."
    },
    {
      id: 12,
      question: "async/await yordamida yozilgan asinxron kodning callback-larga nisbatan eng asosiy ustunligi nimada?",
      options: [
        "Kod tezroq ishlaydi va kamroq protsessor kuchi talab qiladi",
        "Kodning o'qilishi osonroq (sinxron kod kabi ko'rinadi) va 'callback hell' muammosi hal bo'ladi",
        "Xatoliklarni mutlaqo yuzaga keltirmaydi",
        "Tarmoq so'rovlarini avtomatik ravishda takrorlaydi (retry)"
      ],
      correctAnswer: 1,
      explanation: "Async/await asinxron kodni go'yo sinxron kod kabi tekis va chiziqli ko'rinishda yozish imkonini berib, o'qiluvchanlikni oshiradi va chuqur callback zanjirlaridan qutqaradi."
    }
  ]
};
