export const reactivePatterns = {
  id: "reactivePatterns",
  title: "Dasturlash Patternlari va Reaktiv Tizimlar (Proxy & PubSub)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Zamonaviy frontend frameworklar (React, Vue) va arxitekturalar ma'lumotlar o'zgarganda UI-ni avtomatik yangilash (Reaktivlik) yoki xizmatlarni o'zaro decoupling qilish uchun turli dasturlash patternlaridan foydalanadi. Bular orasida eng asosiylari: **Observer (Kuzatuvchi)**, **PubSub (Shtab-obunachi)** va JS-ning yangi imkoniyati bo'lgan **Proxy (Vositachi)** obyektlaridir.

### Gazeta tahririyati analogiyasi:
- **PubSub (Wildcards bilan):** Siz gazeta nashriyotiga borib, uning barcha nashrlariga obuna bo'ldingiz. Wildcard \`*\` orqali: "Menga sport, siyosat yoki istalgan yangilik bo'lsa yuboring" deb obuna bo'lasiz. Nashriyot yangi sport xabari chiqarganda, sizga avtomatik yetib keladi. Nashriyot va obunachi bir-birini shaxsan tanimaydi, ular faqat mavzu (Topic) orqali bog'lanadi.
- **Proxy (Reaktivlik):** Sizning **aqlli uyingizdagi muzlatgich**. Kimdir muzlatgich eshigini ochib ichidan sutni olsa (gett) yoki yangi tuxum qo'ysa (sett), muzlatgich orqa fonda buni sezadi (intercept qiladi) va avtomatik ravishda smartfoningizga xabar yuboradi yoki mahsulotlar ro'yxatini yangilaydi.

---

## 2. 💻 Real Kod Misollari

JavaScript Proxy yordamida sodda reaktivlik (auto-logger) yaratish:

\`\`\`javascript
const user = { name: "Anvar", age: 25 };

// Proxy yordamida obyekt amallarini ushlash (traps)
const reactiveUser = new Proxy(user, {
  get(target, key) {
    console.log(\`O'qildi: \${key} -> \${target[key]}\`);
    return target[key];
  },
  set(target, key, value) {
    console.log(\`O'zgardi: \${key} -> oldin: \${target[key]}, keyin: \${value}\`);
    target[key] = value;
    return true; // Muvaffaqiyatli o'zgardi
  }
});

reactiveUser.name; // O'qildi: name -> Anvar
reactiveUser.age = 26; // O'zgardi: age -> oldin: 25, keyin: 26
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Proxy va Reflect:
JS Proxy obyekti maqsadli obyekt atrofida o'raladi va uning ustida bajariladigan 13 ta asosiy operatsiyani (masalan, \`get\`, \`set\`, \`deleteProperty\`, \`has\`) tutib olish (intercept) imkonini beradi. \`Reflect\` API esa ushbu operatsiyalarni asl holatda xatosiz bajarib beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Proxy vaqtida infinite loop-ga tushib qolish:** \`set\` handler ichida o'sha proxy obyektining boshqa atributini noto'g'ri yangilash natijasida recursive cheksiz sikl yuzaga keladi.
2. **PubSub xotira to'lib ketishi (Memory Leak):** Obunachilar kerak bo'lmay qolganda ularni o'chirmaslik (unsubscribe qilmaslik). Bu dastur uzoq vaqt yoniq turganda xotiraning to'lib ketishiga olib keladi.

---

## 5. 💬 12 ta Intervyu Savollari

Testlar yordamida patternlarni intervyu darajasida o'rganasiz.

---

## 8. 🎯 Real Project Case Study

### Vue 3 Reaktivligi (Reactive System)
Vue 3 frameworki o'zining reaktivlik tizimini to'liq JavaScript \`Proxy\` obyektlariga o'tkazgan. Obyekt atributi o'zgarganda \`set\` trapi ishga tushadi, u esa o'sha atributga bog'langan barcha UI elementlarini (DOM) aniqlab, ularni avtomatik qayta render qiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Wildcard PubSub Broker",
      instruction: "Yulduzcha `*` wildcard qo'llab-quvvatlaydigan PubSub klassini yozing. `subscribe(topic, cb)` va `publish(topic, data)` metodlariga ega bo'lsin. Agar obunachi `user.*` mavzusiga obuna bo'lsa, u `user.created`, `user.deleted` kabi har qanday `user.` bilan boshlanadigan topic yuborilganda ham o'sha callback ishga tushishi kerak.",
      startingCode: "class WildcardPubSub {\n  constructor() {\n    this.subs = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "Topic-ni tekshirishda regex-ga o'giring: '^' + pattern.replace('*', '.*') + '$'.",
      test: "if (typeof WildcardPubSub !== 'function') return 'WildcardPubSub topilmadi'; const ps = new WildcardPubSub(); let count = 0; ps.subscribe('user.*', (data) => { count += data; }); ps.publish('user.created', 5); ps.publish('user.deleted', 10); ps.publish('product.created', 100); if (count !== 15) return 'Wildcard to\\'g\\'ri filtrlamadi'; return null;"
    },
    {
      id: 2,
      title: "Reactive State using Proxy",
      instruction: "Obyekt atributlari o'zgarganda avtomatik ravishda berilgan callback funksiyasini chaqiruvchi `createReactiveObject(target, onChangeCallback)` funksiyasini yozing (Proxy yordamida). Callback funksiyasiga o'zgargan `key` va yangi `value` uzatilsin.",
      startingCode: "function createReactiveObject(target, onChangeCallback) {\n  // Proxy yarating\n}",
      hint: "Proxy constructorda set handlerini yozib target[key] = value qiling va onChangeCallback(key, value) chaqirib, return true qiling.",
      test: "if (typeof createReactiveObject !== 'function') return 'createReactiveObject topilmadi'; let changedKey = null; let changedVal = null; const obj = createReactiveObject({ a: 1 }, (k, v) => { changedKey = k; changedVal = v; }); obj.a = 42; if (changedKey !== 'a' || changedVal !== 42) return 'Reaktiv o\\'zgarish ushlanmadi'; return null;"
    },
    {
      id: 3,
      title: "Custom Observer (Kuzatuvchi) Pattern",
      instruction: "Mavzu holati o'zgarganda barcha ro'yxatdan o'tgan kuzatuvchilarning `update(state)` metodini ishga tushiradigan `Subject` klassini yarating. Metodlar: `addObserver(obs)`, `removeObserver(obs)`, `notify(state)`.",
      startingCode: "class Subject {\n  constructor() {\n    this.observers = [];\n  }\n  // Metodlarni yozing\n}",
      hint: "addObserver-da massivga qo'shing, notify-da har bir observer.update(state) ni chaqiring.",
      test: "if (typeof Subject !== 'function') return 'Subject topilmadi'; const sub = new Subject(); let stateVal = ''; const obs = { update: (s) => { stateVal = s; } }; sub.addObserver(obs); sub.notify('active'); if (stateVal !== 'active') return 'Observer yangilanmadi'; sub.removeObserver(obs); sub.notify('offline'); if (stateVal !== 'active') return 'O\\'chirilgan observer yangilandi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript Proxy obyektining asosiy maqsadi nima?",
      options: [
        "Ma'lumotlar bazasini shifrlash",
        "Asl obyekt ustida bajariladigan amallarni (get, set va boshqalar) tutib olish (intercept) va maxsus boshqarish",
        "CSS animatsiyalarini ishga tushirish",
        "Dastur tezligini 10 barobarga oshirish"
      ],
      correctAnswer: 1,
      explanation: "Proxy maqsadli obyekt atrofida vositachi bo'lib, get, set, delete kabi fundamental amallarga maxsus handlerlar yozish imkonini beradi."
    },
    {
      id: 2,
      question: "Proxy tarkibidagi 'Trap' nima?",
      options: [
        "Xatoliklarni ushlovchi try/catch bloki",
        "Obyekt amallarini tutib oluvchi maxsus handler metodlari (masalan, get, set)",
        "O'chib ketgan fayllar qutisi",
        "Brauzer keshini tozalash plagini"
      ],
      correctAnswer: 1,
      explanation: "Proxy handler obyekti ichida yozilgan get, set, has kabi metodlar 'trap' (tuzoq) deb ataladi."
    },
    {
      id: 3,
      question: "PubSub (Publish-Subscribe) patternining Observer patternidan asosiy farqi nimada?",
      options: [
        "U faqat asinxron ishlaydi",
        "PubSub-da nashriyotchi va obunachi bir-birini shaxsan tanimaydi, ular o'rtasida Event Broker (vositachi kanal) turadi",
        "Observer faqat mobil telefonlarda ishlaydi",
        "Ular mutlaqo bir xil"
      ],
      correctAnswer: 1,
      explanation: "Observer-da Subject kuzatuvchilar ro'yxatini to'g'ridan-to'g'ri o'zida saqlaydi. PubSub-da esa nashriyotchi va obunachi bir-biridan mustaqil (decoupled) bo'lib, o'rtada message/event broker xizmat qiladi."
    },
    {
      id: 4,
      question: "Vue 3 reaktivlik tizimi nima uchun Object.defineProperty dan Proxy-ga o'tdi?",
      options: [
        "Chunki Proxy tekinroq",
        "Proxy yangi qo'shilgan atributlar va massiv indekslari o'zgarishini ham to'liq ushlay oladi (Object.defineProperty buni qila olmaydi)",
        "Proxy faqat SQL bazalar bilan ishlaydi",
        "Object.defineProperty funksiyasi eskirib o'chib ketgan"
      ],
      correctAnswer: 1,
      explanation: "Object.defineProperty obyekt atributi o'zgarishini kuzatish uchun oldindan bor atributlarni o'zgartira oladi. Proxy esa dinamik ravishda yangi qo'shilayotgan yoki massiv elementlarini ham to'liq ushlaydi."
    },
    {
      id: 5,
      question: "Proxy handler-dagi set(target, key, value) trap-i qachon ishga tushadi?",
      options: [
        "Obyekt atributi o'qilganda",
        "Obyekt atributiga yangi qiymat yozilganda yoki o'zgartirilganda",
        "Obyekt butunlay o'chirilganda",
        "Obyekt funksiyasi chaqirilganda"
      ],
      correctAnswer: 1,
      explanation: "Set trap-i proxy obyekt atributiga qiymat biriktirilganida (reactiveObj.age = 20) ishga tushadi."
    },
    {
      id: 6,
      question: "Proxy traps-da 'Reflect' API nima uchun ishlatiladi?",
      options: [
        "Sayt rangini aks ettirish uchun",
        "Target obyekt ustida standart JavaScript amallarini (get, set va boshqalar) xatosiz bajarishni ta'minlovchi yordamchi metodlar to'plami sifatida",
        "SQL so'rovlarini tahlil qilish uchun",
        "Foydalanuvchi ma'lumotlarini o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Reflect API metodlari (Reflect.get, Reflect.set) Proxy traps ichida standart xatti-harakatlarni to'g'ri va xavfsiz bajarishga xizmat qiladi."
    },
    {
      id: 7,
      question: "PubSub patterni loyihalarni qanday yaxshilaydi?",
      options: [
        "Tizimlar o'zaro qattiq bog'lanishini (tight coupling) kamaytirib, ularni bir-biridan mustaqil (decoupled) qiladi",
        "CSS fayllari hajmini kichik qiladi",
        "SQL tranzaksiyalarini taqiqlaydi",
        "Faqat bitta serverda ishlashga majburlaydi"
      ],
      correctAnswer: 0,
      explanation: "PubSub nashriyotchi va obunachilarni ajratib qo'ygani sababli, tizim kengayishi va yangi xizmatlar qo'shilishi oson bo'ladi."
    },
    {
      id: 8,
      question: "PubSub brokerda Wildcard (masalan, '*') nima maqsadda qo'llaniladi?",
      options: [
        "Kodni chiroyli ko'rsatish uchun",
        "Bitta obuna orqali guruhli mavzularni (masalan, user.created, user.deleted kabi barcha user.* mavzularini) ushlash uchun",
        "Parollarni shifrlash uchun",
        "Trafikni cheklash uchun"
      ],
      correctAnswer: 1,
      explanation: "Wildcards yordamida obunachi bir nechta o'xshash mavzularga bitta umumiy shablon orqali obuna bo'la oladi."
    },
    {
      id: 9,
      question: "Observer patternidagi Subject-ning vazifasi nima?",
      options: [
        "Faqat xatolarni saqlash",
        "Kuzatuvchilar (Observers) ro'yxatini saqlash va holat o'zgarganda ularni yangilash (notify qilish)",
        "Ommaviy so'rovlarni o'chirish",
        "IP-manzillarni taqsimlash"
      ],
      correctAnswer: 1,
      explanation: "Subject kuzatuvchilarni o'zida saqlaydi va holati o'zgarganda barchaga bir vaqtda update chaqiruvini yuboradi."
    },
    {
      id: 10,
      question: "Proxy get handlerida 'receiver' argumenti nima vazifani bajaradi?",
      options: [
        "Xat yuboruvchi server",
        "Trap chaqirilgan haqiqiy obyekt (odatda Proxy-ning o'zi yoki voris klass)",
        "CSS selektori",
        "Internet provayder"
      ],
      correctAnswer: 1,
      explanation: "Receiver - trap chaqirilayotgan joriy obyekt konteksti (this) bo'lib, meros olingan getter-lar to'g'ri ishlashi uchun zarur."
    },
    {
      id: 11,
      question: "PubSub tizimida 'Memory Leak' (Xotira to'lib ketishi) qanday sodir bo'lishi mumkin?",
      options: [
        "Faqat internet o'chganda",
        "Keraksiz bo'lgan obunachilarni unsubscribe (obunani bekor) qilmasdan tashlab ketganda",
        "HTML kodi noto'g'ri yozilganda",
        "Baza to'lib qolganda"
      ],
      correctAnswer: 1,
      explanation: "Agar obunachi obunani bekor qilmasa, uning callback funksiyasi doimo xotirada saqlanadi (garbage collector o'chirmaydi) va bu xotira yukini oshiradi."
    },
    {
      id: 12,
      question: "Proxy trap-laridan deleteProperty qachon ishga tushadi?",
      options: [
        "Obyekt tozalanganda",
        "delete obj.property operatori ishlatilganda",
        "Faqat yangi atribut qo'shilganda",
        "Faqat funktsiyalar o'chirilganda"
      ],
      correctAnswer: 1,
      explanation: "deleteProperty trap-i proxy obyektidan biron bir atributni o'chirib yuborishda (delete target.key) ishga tushadi."
    }
  ]
};
