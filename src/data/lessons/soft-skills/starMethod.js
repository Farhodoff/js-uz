export const starMethod = {
  id: "starMethod",
  title: "STAR Metodi: Loyihalarni taqdim etish",
  theory: `## 1. NEGA kerak?
Texnik suhbatlarda ko'pincha "O'zingiz hal qilgan eng qiyin texnik muammo haqida gapirib bering" yoki "Jamoada kelishmovchilik yuz berganda nima qilgansiz?" kabi ochiq savollar beriladi. Ko'plab dasturchilar bu savollarga javob berishda tartibsiz va uzoq gapirib, suhbatdoshni zeriktirishadi va asosiy natijani aytishni unutishadi.
**STAR Metodi** — bu xulq-atvorga oid (behavioral) savollarga aniq, lo'nda va ta'sirchan javob berish imkonini beruvchi xalqaro standart tuzilmadir. U orqali siz o'z tajribangizni muhandislik nuqtai nazaridan chiroyli tarzda ko'rsatib bera olasiz.

## 2. SODDALIK (Analogiya)
Buni **kinolar ssenariysiga** o'xshatish mumkin. Qiziqarli kino har doim ma'lum bir tuzilishda bo'ladi:
- **Vaziyat (S):** Qahramon tinch hayot kechirmoqda, to'satdan ajdarho kelib shahar xavf ostida qoladi.
- **Vazifa (T):** Qahramon shaharni qutqarishi kerak.
- **Harakat (A):** U qilich yasaydi, mashq qiladi va ajdarhoga qarshi jangga kiradi.
- **Natija (R):** Ajdarho yengiladi va shahar qutqariladi (baxtli yakun).
Agar siz kinoni ajdarho bilan jangdan boshlab, nega jang qilayotganingizni aytmasangiz, tomoshabin hech narsani tushunmaydi. STAR ham javobingizni tushunarli kino qiladi.

## 3. STRUKTURA
STAR qisqartmasining to'liq ma'nosi:

### 1. Situation (Vaziyat)
Muammoning konteksti va sharoitini tushuntiring.
*Masalan:* "Oxirgi loyihamizda foydalanuvchilar soni keskin oshib ketdi va serverimiz so'rovlarga 10 soniyada javob bera boshladi."

### 2. Task (Vazifa)
Sizning zimmangizda qanday vazifa turganini va nima qilinishi kerakligini ayting.
*Masalan:* "Mening vazifam ma'lumotlar yuklanishi tezligini 2 soniyadan kamaytirish va bazaga yuklamani kamaytirish edi."

### 3. Action (Harakat)
Muammoni hal qilish uchun shaxsan **o'zingiz** qanday choralarni ko'rganingizni tushuntiring.
*Masalan:* "Men Redis kesh tizimini o'rnatdim, eng ko'p so'raladigan API-larni keshladim va bazada indekslarni optimallashtirdim."

### 4. Result (Natija)
Qilgan harakatlaringiz natijasida nimalarga erishilganini **raqamlar (metrikalar)** orqali ko'rsating.
*Masalan:* "Natijada, API javob berish tezligi 10 soniyadan 1.2 soniyaga tushdi (88% tezlashish) va bazaga tushadigan yuklama 70% ga kamaydi."

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **"Biz" deb gapirish (We instead of I):** Intervyer jamoangizni emas, ayni sizni ishga olmoqchi. "Biz qildik, biz yozdik" deyish o'rniga, shaxsan o'zingiz bajargan ishlarni ("Men keshladim, men SQL yozdim") aniq ko'rsating.
2. **Natijada raqamlar ishlatmaslik:** "Sayt ancha tezlashdi" yoki "Hamma xursand bo'ldi" kabi gaplar professional ko'rinmaydi. Buning o'rniga "Sayt yuklanishi 40% ga kamaydi" yoki "Foydalanuvchilar soni 15% ga oshdi" deb aniq metrika bering.
3. **Kontekstga juda ko'p vaqt sarflash:** Loyiha tarixini 10 daqiqa gapirib berish suhbatdoshni charchatadi. Vaziyat (S) va Vazifani (T) 1 daqiqada tushuntiring, asosiy e'tiborni Harakat (A) va Natija (R) ga qarating.

## 6. SAVOLLAR VA JAVOBLAR
**1. STAR metodi nima uchun kerak?**
Xulq-atvorga (behavioral) oid savollarga javob berishda fikrlarni tartibli, lo'nda va natijaga yo'naltirilgan shaklda ifodalash uchun.

**2. STAR harflarining to'liq ma'nosi nima?**
Situation (Vaziyat), Task (Vazifa), Action (Harakat), Result (Natija).

**3. "Situation" qismida nima haqida gapiriladi?**
Muammo qayerda, qachon yuz bergani va uning kelib chiqish sharoiti (konteksti) haqida.

**4. "Task" qismida qanday ma'lumot berilishi kerak?**
Loyiha oldida turgan aniq texnik maqsad va aynan siz hal qilishingiz kerak bo'lgan vazifa.

**5. "Action" qismida nimalarga e'tibor qaratish lozim?**
Guruh emas, aynan siz shaxsan qanday kod yozganingiz, texnologiya tanlaganingiz va muammoni qanday yechganingizga.

**6. "Result" qismida nega raqamlar muhim?**
Raqamlar sizning qilgan ishingiz biznesga yoki loyihaga qanchalik aniq (real) foyda keltirganini isbotlaydi.

**7. STAR bo'yicha javobning ideal davomiyligi qancha?**
Taxminan 2-3 daqiqa. Undan ortig'i suhbatdoshni zeriktiradi, kamrog'i esa ma'lumot to'liqligini ta'minlamaydi.

**8. Nega javobda faqat "Biz" so'zini ishlatish xato?**
Chunki intervyer jamoangiz bilan emas, siz bilan suhbatlashmoqda va aynan sizning shaxsiy hissangizni bilmoqchi.

**9. "O'zingiz qilgan eng qiyin texnik xato haqida gapiring" deganda qanday javob berish kerak?**
STAR yordamida xatoni tushuntirib (S/T), uni tuzatish uchun nima qilganingiz (A) va bu xatodan qanday dars olib, qanday natijaga (R) erishganingizni ko'rsatish kerak.

**10. STAR metodini rezyumeda (Resume) ham ishlatsa bo'ladimi?**
Albatta. Ish tajribasi bo'limidagi har bir bandni "Harakat + Kontekst + Natija (Raqamda)" shaklida yozish tavsiya etiladi.

**11. Natijada raqamlar bo'lmasa nima qilish kerak?**
Sifat ko'rsatkichlarini bering, masalan: "loyihani muddatidan oldin topshirdik", "mijozlar tomonidan 0 ta xatolik xabari keldi" yoki "kod sifati yuqoriligi tufayli refaktoring osonlashdi".

**12. STAR metodining asosiy maqsadi nima?**
Suhbatdoshga o'zingizning muammolarni hal qilish qobiliyatingizni tizimli va tushunarli tarzda taqdim etish.
`,
  exercises: [
    {
      id: 1,
      title: "STAR javob formatlash",
      instruction: "Situation, Task, Action va Result parametrlarini qabul qilib, ularni STAR andozasida formatlangan matn ko'rinishida qaytaruvchi `formatSTAR(s, t, a, r)` funksiyasini yozing.",
      startingCode: "function formatSTAR(s, t, a, r) {\n  // Satrlarni birlashtiring\n}",
      hint: "return `S: ${s}\\nT: ${t}\\nA: ${a}\\nR: ${r}`;",
      test: "if (typeof formatSTAR !== 'function') return 'formatSTAR topilmadi'; const res = formatSTAR('vaziyat', 'vazifa', 'harakat', 'natija'); if(!res.includes('S: vaziyat') || !res.includes('R: natija')) return 'Format noto\\'g\\'ri'; return null;"
    },
    {
      id: 2,
      title: "Javob so'zlari sonini tekshirish",
      instruction: "Suhbatdagi javobingiz juda qisqa bo'lib qolmasligini ta'minlash uchun matndagi so'zlar sonini hisoblaydigan `countWords(text)` funksiyasini yozing.",
      startingCode: "function countWords(text) {\n  if(!text.trim()) return 0;\n  // So'zlar sonini hisoblang\n}",
      hint: "return text.trim().split(/\\s+/).length;",
      test: "if (typeof countWords !== 'function') return 'countWords topilmadi'; if(countWords('   Men kesh tizimini uladim.  ') !== 4) return 'So\\'zlar noto\\'g\\'ri hisoblandi'; return null;"
    },
    {
      id: 3,
      title: "STAR harflari qisqartmasi",
      instruction: "Berilgan STAR sarlavhali stringdan harflarni ajratib 'STAR' so'zini hosil qiluvchi `getAcronym(arr)` funksiyasini yozing.",
      startingCode: "function getAcronym(arr) {\n  // massivdagi so'zlar birinchi harflarini birlashtiring\n}",
      hint: "return arr.map(w => w[0]).join('').toUpperCase();",
      test: "if (typeof getAcronym !== 'function') return 'getAcronym topilmadi'; if(getAcronym(['Situation', 'Task', 'Action', 'Result']) !== 'STAR') return 'Qisqartma noto\\'g\\'ri'; return null;"
    },
    {
      id: 4,
      title: "Metrika (Raqam) borligini tekshirish",
      instruction: "Natija (Result) qismida raqamlar (metrikalar) ishlatilganligini tekshiruvchi `hasMetrics(resultText)` funksiyasini yozing (matnda kamida bitta raqam bo'lsa true, bo'lmasa false).",
      startingCode: "function hasMetrics(resultText) {\n  // Raqam borligini RegExp yordamida tekshiring\n}",
      hint: "return /\\d+/.test(resultText);",
      test: "if (typeof hasMetrics !== 'function') return 'hasMetrics topilmadi'; if(hasMetrics('Sayt 50% ga tezlashdi') !== true) return 'Raqam borligini aniqlay olmadi'; if(hasMetrics('Sayt ancha tezlashdi') !== false) return 'Raqamsiz natijani qabul qildi'; return null;"
    },
    {
      id: 5,
      title: "Metrikalarni qavsga olish",
      instruction: "Natija matni ichidagi barcha foizli sonlarni (masalan, 50% yoki 25%) qavs ichiga oluvchi `highlightMetrics(text)` funksiyasini yozing (masalan, `(50%)`).",
      startingCode: "function highlightMetrics(text) {\n  // RegExp replace ishlating\n}",
      hint: "return text.replace(/(\\d+%)/g, '($1)');",
      test: "if (typeof highlightMetrics !== 'function') return 'highlightMetrics topilmadi'; if (highlightMetrics('Sayt 45% ga tezlashdi, yuklama 80% kamaydi') !== 'Sayt (45%) ga tezlashdi, yuklama (80%) kamaydi') return 'Foizlar qavsga olinmadi'; return null;"
    },
    {
      id: 6,
      title: "I-Statements check (Shaxsiy hissa)",
      instruction: "Suhbatdagi javobingizda 'men' (I) so'zi 'biz' (we) so'ziga qaraganda ko'proq ishlatilganligini tekshiradigan `checkPersonalContribution(text)` funksiyasini yozing (men soni > biz soni bo'lsa true).",
      startingCode: "function checkPersonalContribution(text) {\n  const words = text.toLowerCase().split(/\\s+/);\n  const iCount = words.filter(w => w === 'men' || w === 'mening').length;\n  const weCount = words.filter(w => w === 'biz' || w === 'bizning').length;\n  // Taqqoslang\n}",
      hint: "return iCount > weCount;",
      test: "if (typeof checkPersonalContribution !== 'function') return 'checkPersonalContribution topilmadi'; if (checkPersonalContribution('Men kesh uladim. Biz yordam berdik.') !== true) return 'Men ko\\'p bo\\'lsa true bo\\'lishi kerak'; if (checkPersonalContribution('Biz qildik. Biz yozdik. Men ko\\'rdim.') !== false) return 'Biz ko\\'p bo\\'lsa false bo\\'lishi kerak'; return null;"
    },
    {
      id: 7,
      title: "STAR To'liqligini tekshirish",
      instruction: "Javob obyektida barcha to'rtta (`situation`, `task`, `action`, `result`) xossalar mavjudligi va ularning bo'sh emasligini tekshiradigan `isCompleteSTAR(answerObj)` funksiyasini yozing (true/false).",
      startingCode: "function isCompleteSTAR(answerObj) {\n  // Xossalarni tekshiring\n}",
      hint: "return !!(answerObj?.situation && answerObj?.task && answerObj?.action && answerObj?.result);",
      test: "if (typeof isCompleteSTAR !== 'function') return 'isCompleteSTAR topilmadi'; if(isCompleteSTAR({ situation: 'a', task: 'b', action: 'c', result: 'd' }) !== true) return 'To\\'liq obyektni rad etdi'; if(isCompleteSTAR({ situation: 'a', task: 'b' }) !== false) return 'Chala obyektni qabul qildi'; return null;"
    },
    {
      id: 8,
      title: "Qisqa ma'lumot (Summary) yaratish",
      instruction: "Vaziyat (situation) matnining birinchi 30 ta belgisini olib, oxiriga '...' qo'shadigan qisqa `getSummary(text)` funksiyasini yozing.",
      startingCode: "function getSummary(text) {\n  if(text.length <= 30) return text;\n  // Kesib oling\n}",
      hint: "return text.slice(0, 30) + '...';",
      test: "if (typeof getSummary !== 'function') return 'getSummary topilmadi'; if(getSummary('Kichik xatolik yuz berdi') !== 'Kichik xatolik yuz berdi') return 'Qisqa matnda ... qo\\'shilmasligi kerak edi'; if(getSummary('Juda uzoq davom etgan va murakkab muammo yuzaga keldi') !== 'Juda uzoq davom etgan va murak...') return 'Kesish xato'; return null;"
    },
    {
      id: 9,
      title: "Gaplarni sanash",
      instruction: "Javob ichidagi jami gaplar sonini nuqta, so'roq va undov belgilari bo'yicha hisoblaydigan `countSentences(text)` funksiyasini yozing.",
      startingCode: "function countSentences(text) {\n  if(!text.trim()) return 0;\n  // Gaplarni bo'ling va sanang\n}",
      hint: "return text.split(/[.!?]+/).filter(Boolean).length;",
      test: "if (typeof countSentences !== 'function') return 'countSentences topilmadi'; if(countSentences('Men uladim. Ishladi! Hammasi zo\\'rmi?') !== 3) return 'Gaplar soni xato hisoblandi'; return null;"
    },
    {
      id: 10,
      title: "Speaking Time calculator",
      instruction: "Taxminan 1 daqiqada 130 ta so'z gapirish mumkinligini hisobga olib, matndagi so'zlar soniga ko'ra gapirish vaqtini (sekundlarda, yaxlitlangan holda) hisoblovchi `getSpeakingTime(text)` funksiyasini yozing.",
      startingCode: "function getSpeakingTime(text) {\n  const words = text.trim().split(/\\s+/).filter(Boolean).length;\n  // Sekundni hisoblang (words / 130 * 60)\n}",
      hint: "return Math.round((words / 130) * 60);",
      test: "if (typeof getSpeakingTime !== 'function') return 'getSpeakingTime topilmadi'; if(getSpeakingTime('Men kesh uladim') !== 1) return 'Qisqa matn uchun xato'; if(getSpeakingTime('a '.repeat(130)) !== 60) return '130 so\\'z uchun 60s bo\\'lishi kerak'; return null;"
    },
    {
      id: 11,
      title: "STAR bullet points format",
      instruction: "Obyekt xossalarini bullet points shaklida formatlovchi `formatBulletPoints(obj)` funksiyasini yozing.",
      startingCode: "function formatBulletPoints(obj) {\n  // Satrlarni yig'ing\n}",
      hint: "return `* Situation: ${obj.situation}\\n* Task: ${obj.task}\\n* Action: ${obj.action}\\n* Result: ${obj.result}`;",
      test: "if (typeof formatBulletPoints !== 'function') return 'formatBulletPoints topilmadi'; const res = formatBulletPoints({ situation: 'S', task: 'T', action: 'A', result: 'R' }); if(!res.startsWith('* Situation: S')) return 'Formatlash xato'; return null;"
    },
    {
      id: 12,
      title: "Natija foizini hisoblash",
      instruction: "Avvalgi javob berish vaqti (`oldTime` ms) va yangi vaqt (`newTime` ms) berilgan holda tezlashish foizini hisoblab qaytaruvchi `getOptimizationPercent(oldTime, newTime)` funksiyasini yozing.",
      startingCode: "function getOptimizationPercent(oldTime, newTime) {\n  // Tezlashish foizini hisoblang\n}",
      hint: "return Math.round(((oldTime - newTime) / oldTime) * 100);",
      test: "if (typeof getOptimizationPercent !== 'function') return 'getOptimizationPercent topilmadi'; if(getOptimizationPercent(10, 2) !== 80) return '80% tezlashish hisoblanmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "STAR metodining asosiy maqsadi nima?",
      options: [
        "Kodni tezroq yozish",
        "Xulq-atvorga (behavioral) oid texnik savollarga aniq, lo'nda va natijaga yo'naltirilgan tarzda javob berish",
        "Dizayn patternlarini o'rganish",
        "Parollarni shifrlash"
      ],
      correctAnswer: 1,
      explanation: "STAR metodi suhbatlarda o'z tajribangizni tizimli ssenariy shaklida ifodalash uchun ishlatiladigan xalqaro andozadir."
    },
    {
      id: 2,
      question: "STAR qisqartmasining birinchi harfi 'S' nimani anglatadi?",
      options: ["Solution (Yechim)", "Situation (Vaziyat)", "Static (Statik)", "Structure (Tuzilma)"],
      correctAnswer: 1,
      explanation: "S — Situation (Vaziyat) bo'lib, u yuzaga kelgan muammoning sharoiti va kontekstini tushuntiradi."
    },
    {
      id: 3,
      question: "STAR metodidagi 'Task' (Vazifa) qismida nima haqida gapiriladi?",
      options: [
        "Faqat server sozlamalari haqida",
        "Aynan joriy vaziyatda sizning zimmangizda qanday maqsad yoki muammo turganligi va nima qilinishi kerakligi",
        "Qilingan ishning yakuniy natijasi",
        "Boshqa dasturchilarning xatolari"
      ],
      correctAnswer: 1,
      explanation: "Task — bu muammoni hal qilishda shaxsan sizning oldingizga qo'yilgan maqsad va vazifadir."
    },
    {
      id: 4,
      question: "STAR metodining qaysi qismida siz shaxsan bajargan texnik ishlar, yozgan kodlaringiz tushuntiriladi?",
      options: ["Situation", "Task", "Action (Harakat)", "Result"],
      correctAnswer: 2,
      explanation: "Action (Harakat) qismida aynan sizning shaxsiy harakatlaringiz, qo'llagan texnologiyalaringiz va muammoni qanday yechganingiz tasvirlanadi."
    },
    {
      id: 5,
      question: "STAR metodidagi eng muhim yakuniy qism qaysi?",
      options: ["Situation", "Task", "Action", "Result (Natija)"],
      correctAnswer: 3,
      explanation: "Result (Natija) eng muhim qismdir, chunki u qilgan harakatlaringiz loyihaga yoki biznesga qanday real foyda keltirganini ko'rsatadi."
    },
    {
      id: 6,
      question: "Nega 'Result' (Natija) qismida raqamlar (metrikalar) ishlatish o'ta muhim?",
      options: [
        "Raqamlar kodni chiroyli ko'rsatadi",
        "Raqamlar qilgan ishingiz samarasini mavhum emas, balki aniq va isbotlanadigan shaklda ko'rsatib beradi",
        "Faqat matematiklar shunday qiladi",
        "Raqamsiz intervyu tugamaydi"
      ],
      correctAnswer: 1,
      explanation: "Raqamlar (masalan: 'yuklanish 50% ga kamaydi', 'xatoliklar 3 barobar kamaydi') loyihaga qo'shgan hissangizni aniq ko'rsatadi."
    },
    {
      id: 7,
      question: "Suhbatdagi javob davomida faqat 'Biz qildik, biz yozdik' deb gapirishning kamchiligi nimada?",
      options: [
        "Bu jamoani maqtaydi",
        "Intervyer aynan sizning shaxsiy hissangiz va qobiliyatingizni bilolmay qoladi",
        "Suhbatdosh uxlab qolishi mumkin",
        "Bu grammatik jihatdan xato"
      ],
      correctAnswer: 1,
      explanation: "Suhbat oluvchi butun jamoani emas, aynan sizni ishga olmoqchi, shuning uchun shaxsiy hissangizni ('Men kesh uladim', 'Men query yozdim') ko'rsatishingiz shart."
    },
    {
      id: 8,
      question: "STAR bo'yicha tayyorlangan javobning ideal gapirish vaqti taxminan qancha bo'lishi kerak?",
      options: ["10 daqiqadan ko'p", "2-3 daqiqa atrofida", "Faqat 10 sekund", "1 soat"],
      correctAnswer: 1,
      explanation: "2-3 daqiqa barcha 4 ta komponentni lo'nda va batafsil tushuntirish uchun eng ideal vaqt hisoblanadi."
    },
    {
      id: 9,
      question: "Vaziyat (Situation) va Vazifa (Task) qismlariga javobning qancha vaqtini ajratish kerak?",
      options: [
        "Javobning 80% qismini",
        "Uchinchi qismini yoki imkon qadar qisqa (1 daqiqagacha) vaqtni, chunki asosiy e'tibor Harakat (Action) va Natija (Result) ga qaratilishi shart",
        "Hech qancha, ularni aytish shart emas",
        "Faqat oxirgi 10 sekundni"
      ],
      correctAnswer: 1,
      explanation: "Vaziyat va Vazifa faqat fon (kontekst) yaratish uchun xizmat qiladi. Intervyer uchun eng qiziqarlisi sizning harakatingiz va uning natijasidir."
    },
    {
      id: 10,
      question: "Suhbatda 'O'zingiz qilgan eng katta xatongiz' so'ralganda STAR-ni qanday qo'llash kerak?",
      options: [
        "Xatoni boshqalarga ag'darib gapirish",
        "Xatoni va uning kelib chiqishini tushuntirib, uni bartaraf etish uchun qanday tezkor chora ko'rganingiz va undan nimalarni o'rganganingizni ko'rsatish",
        "Hech qanday xato qilmaganman deb javob berish",
        "Mavzuni boshqa tomonga burish"
      ],
      correctAnswer: 1,
      explanation: "Hamma xato qiladi. Muhimi — xatoni tan olish, uni to'g'ri hal qilish va undan to'g'ri dars olganingizni ko'rsata olishdir."
    },
    {
      id: 11,
      question: "STAR usulini rezyumedagi ish tajribasi bandlarida qanday qo'llash mumkin?",
      options: [
        "Faqat texnologiyalar nomini yozish orqali",
        "Har bir ish bandini 'Harakat + Kontekst + Erishilgan Natija (Raqamda)' shaklida yozish orqali",
        "Faqat loyiha linklarini qo'yish orqali",
        "Ish kun tartibini batafsil yozish"
      ],
      correctAnswer: 1,
      explanation: "Masalan: 'Redis keshni joriy etish orqali (Action) loyiha yuklanish tezligini (Context) 40% ga yaxshiladim (Result)' ko'rinishida."
    },
    {
      id: 12,
      question: "Natija (Result) qismida raqamli ko'rsatkichlar mutlaqo bo'lmasa nima qilish kerak?",
      options: [
        "Soxta raqamlar to'qib chiqarish",
        "Sifat o'zgarishlarini (masalan, loyiha vaqtida topshirildi, kod tozaligi ortib refaktoring osonlashdi) ifodalash",
        "Javobni darhol tugatish",
        "Ushbu loyiha haqida umuman gapirmaslik"
      ],
      correctAnswer: 1,
      explanation: "Agar raqamlar bo'lmasa, sifat o'zgarishlari, jamoaning fikri yoki loyihaga kiritilgan qulayliklar orqali foydali natijani ko'rsatish mumkin."
    }
  ]
};
