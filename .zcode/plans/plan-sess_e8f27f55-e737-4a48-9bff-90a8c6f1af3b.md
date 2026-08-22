# JS Academy — roadmap.sh asosida 0 dan to'liq reorganizatsiya rejasi

## Maqsad
Loyihani mutlaq boshlovchi (0 dan) uchun aniq, bosqichma-bosqich, roadmap.sh/javascript tartibidagi o'quv yo'nalishiga aylantirish. Qamrov: **faqat JavaScript yo'nalishi** (Node/TS/React/SQL/Algoritmlar/System Design "Keyingi qadamlar" guruhida qoladi, faqat yetim darslar hal qilinadi). Tech stack o'zgarmaydi (React SPA + code runner + quiz tizimi saqlanadi).

## Hozirgi muammolar (aniqlandi)
- 12 bo'im aralash: JS asoslari bilan System Design/SQL bir ro'yxatda — boshlovchi yo'nalishni ko'rmaydi
- Darslar tartibsiz, raqamlanmagan; 3 ta takror type-conversion darsi, 4 ta scope darsi, event loop 4 joyda
- 21 ta yetim (ochilmaydigan) dars fayli; `paths.js` buzilgan; Sidebar'da React track bug'i (`/reactBeginner` mavjud emas)
- Bir qator darslarda mashq testlari umuman foydalanuvchi kodini tekshirmaydi (javob testning ichida — har narsa "to'g'ri" chiqadi): `variables.js`, `functions.js`, `closures.js` ...
- Repo bandit: `scratch/` (471 fayl), `temp_md/`, ildizda ~15 ta `fix_*.cjs`, takroriy GIFlar, `.DS_Store`
- Yo'q mavzular: alohida JSON darsi, Rekursiya (core trackda), Event Delegation

---

## YANGI STRUKTURA — 7 bosqich (roadmap.sh/javascript tartibida)

Fayllar `src/data/lessons/js/` ostida modul papkalariga ko'chiriladi, har bir dars raqamlanadi (`number: "1.3"` — Sidebar va sarlavhada ko'rinadi):

**🟢 1-BOSQICH — JS Asoslari** (`js/01-basics/`, ~13 dars)
jsWhat → consoleMethods → variables → dataTypes (+typeof birlashtiriladi) → moreDataTypes → operators → typeConversion (3 dars → 1 ga birlashtiriladi) → equalityAlgorithms → ifElse → switch → loops → breakContinue → functions (asoslari; scope qismi 3-bosqichga) → templateLiterals → strictMode (intermediate'dan ko'chiriladi) → jsGotchas → cheat-sheet (bonus)

**🟢 2-BOSQICH — Ma'lumot Turlari Chuqurroq** (`js/02-data/`, ~12 dars)
mathObject → stringMethods → dateObject → arrays → higherOrderArrays → objects → objectMethods → primitivesVsObjects → immutableData → mapSetWeak → symbolType → **JSON ★ YANGI** → intlApi

**🟡 3-BOSQICH — Funksiyalar Chuqur** (`js/03-functions/`, ~10 dars)
scope (4 dars → 1 ga birlashtiriladi) → hoisting → executionContext → arrowFunctions → thisKeyword → callApplyBind → closures → closuresDeepDive → callbacks (advanced'dan ko'chiriladi) → higherOrderFunctions (advanced'dan qaytadi) → **Rekursiya ★ YANGI** → interviewQuestionsBeginner (bosqich yakuni)

**🟡 4-BOSQICH — OOP va Zamonaviy JS** (`js/04-oop-modern/`, ~7 dars)
prototypes → classes → destructuring → spreadRest → optionalChaining → es6Features → modules (advanced'dan ko'chiriladi)

**🟡 5-BOSQICH — DOM va Brauzer** (`js/05-dom-browser/`, ~8 dars)
dom → domManipulation → events (+Event Delegation bo'lmasa ★ YANGI qo'shiladi) → forms → timers → localStorage → bomAndWindow (advanced'dan) → interviewQuestionsIntermediate (bosqich yakuni)

**🔴 6-BOSQICH — Asinxron JS** (`js/06-async/`, ~9 dars)
eventLoop → callbacks hell → promises → asyncAwait → **fetchApi (advanced'dan shu yerga — o'rta darajada ham API o'rganiladi)** → advancedFetch → errorHandling → eventLoopDeep → advancedTaskScheduling → asyncPolyfills

**🔴 7-BOSQICH — Professional JS (medium-hard)** (`js/07-professional/`, ~30 dars)
regex → iteratorsGenerators → metaprogramming → reactivePatterns → propertyDescriptors (+objectProtection birlashtiriladi) → designPatterns → functionalProgramming → debounceThrottle → performanceOptimization → performanceAlgos → memoryManagement → v8CompilerOptimization → v8GarbageCollection → domPerformance → debugging → security → unitTesting → integrationE2eTesting → jsPitfalls → problemSolving → typedArrays → binaryData → webWorkers → serviceWorkersPwa → webSockets → serverSentEvents → webComponents → webAssemblyIntegration → historyRouting → advancedWebApis → advancedWebStorage → webAnimations → canvas → audioVideo → dragAndDrop → selectionRange → clipboardApi → scrollingApis → a11yAria → interviewQuestionsAdvanced (yakuniy)

Sidebar: 7 bosqich yuqorida, ayirg'ich chiziqdan keyin **"🚀 Keyingi qadamlar"** gurudi: Loyihalar → Challenges → Node.js → TypeScript → React (track) → SQL → Algoritmlar → System Design → Ekotizim → Suhbat madaniyati.

---

## BATCh 1 — Tozalash va bug-fix (1-commit)

**O'chirish:** `scratch/`, `temp_md/`, `goals.md`, `react.md`, `fix_*.cjs`, `write_step*.cjs` (ildizdagi barcha bir martalik skriptlar), ildizdagi 8 takroriy GIF (`public/` dagilari qoladi), `.DS_Store` + `.gitignore`ga yozish, `src/data/lessons/react/update_script.cjs`.

**Yetim 21 dars:** react stub'lari (jsxBasics, reactComponents, reactState, useEffectHook) va step1-14 bilan qoplanagan takrorlari (reactIntro, jsxRendering, componentsProps, eventsConditionals, componentLifecycle, reactKeys), nodejs'ning step1-5 bilan qoplangan 8 tasi, ecosystem'ning 3 tasi (npmBasics, packageJson, webpackBabel) — har biri mavjud darslar bilan tez solishtiriladi: takror bo'lsa o'chiriladi, noyob kontent bo'lsa mos bo'limga ro'yxatga qo'shiladi.

**Bug-fix:**
- `src/data/paths.js` o'chiriladi (12 ta mavjud bo'lmagan kalitga ishora qiladi, hech qayerda render qilinmaydi) + `Sidebar.jsx:4`dagi o'lik import olib tashlanadi
- Sidebar React track navigatsiyasi: `/reactBeginner` → `/reactBasics` (`Sidebar.jsx:57-58`)
- `curriculum.js` 1–224-qatorlaridagi bo'sh qatorlar va 8 ta eskirgan statik import tozalanadi
- `src/data/lessons.test.js`: `theory` YOKI `content` qabul qiladi; `injectLoopGuard` importi worker'dan to'g'rilanadi
- `advanced/webComponents.js:201` — foydalanuvchiga ko'rinadigan absolyut yo'llar olib tashlanadi
- SQL darslarida `language: "javascript"` → `"sql"` (worker alasql'ni qo'llab-quvvatlaydi)
- README yangilanadi: real darslar soni, DeepSeek (Gemini emas), yangi struktura

## BATCH 2 — Yangi curriculum va strukturа (asosiy ish)

1. `src/data/lessons/js/{01-basics..07-professional}/` papkalari yaratiladi, mavjud fayllar `git mv` bilan ko'chiriladi (boshqa track papkalari tegilmaydi)
2. `curriculum.js` qayta yoziladi: 7 bosqich (kalitlar: `basics`, `data`, `functions`, `oopModern`, `domBrowser`, `async`, `professional`), har bir darsda `number` maydoni; dars `id`lari saqlanadi → foydalanuvchilarning mavjud progressi (localStorage) yo'qolmaydi
3. Sidebar: bosqich raqamlari (1.1, 1.2...), "Keyingi qadamlar" ayirg'ichi, LessonPage sarlavhasida dars raqami
4. **Birlashtirish:** typeConversion+typeCasting+implicitCasting → 1 ta to'liq dars; scope+globalScope+functionScope+blockScope → 1 ta; propertyDescriptors+objectProtection → 1 ta (eng yaxshi kontentlar birlashtiriladi)
5. **Yangi darslar** (loyiha shabloni: theory + 10 mashq + 12 quiz, o'zbekcha): `json`, `recursion`, event delegation (events.js'da chuqur bo'lmasa)
6. Tekshiruv: curriculum'dagi barcha `import()`'lar yechilishi (vitest skript), `npm run build`, qo'lda smoke-test

## BATCH 3 — Mashg'ulot testlari sifati (core track)

- Audit skript yoziladi: test foydalanuvchi kodini tekshirmaydigan (javob test ichida yozilgan, har doim pass bo'ladigan) darslarni topadi
- Aniq buzilgan: `variables.js`, `functions.js`, `closures.js` (10/10 test har biri) — barcha `new Function(code + test)` naqshiga o'tkaziladi (haqiqiy tekshiruv, `classes.js` naqshida)
- Bosqichlar bo'yicha (1→7) qolgan buzilgan testlar tuzatiladi

## BATCH 4 — Yagona shablon va yakunlash

- Barcha core darslarda yagona tuzilish: o'zbekcha sarlavhalar (inglizcha "Part 2: Deep Dive" kabilar o'zbekchaga), emoji-sarlavha uslubi (eng silliqlari: `variables.js` uslubi)
- README yakuniy: yangi yo'l xaritasi, screenshot o'rniga bosqichlar ro'yxati
- `npm run build` + `npm test` + brauzerda to'liq tekshiruv (sidebar, dars ochilishi, mashq/quiz ishlashi, progress)

Har bir batch alohida commit qilinadi. Batch 3-4 ichma-ich kichik commitlar bo'lishi mumkin (bosqichlar bo'yicha).