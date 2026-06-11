export const designPatterns = {
  id: "a13",
  title: "Design Patterns: Singleton, Factory, Observer, Decorator, Strategy",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Katta va murakkab dasturlarda kod tarkibi, obyektlar o'rtasidagi bog'liqliklar tezda chalkashib ketishi mumkin. **Loyihalash andozalari (Design Patterns)** — bu dasturiy ta'minotni loyihalash jarayonida tez-tez uchraydigan muammolarga yozilgan va amaliyotda sinalgan tayyor arxitekturaviy yechimlardir. Ulardan to'g'ri foydalanish kodning qayta ishlatiluvchanligini (reusability), moslashuvchanligini va unga keyinchalik o'zgartirishlar kiritish osonligini ta'minlaydi.

---

## 2. 💻 Real Kod Misollari

Mavzuga oid amaliy kod misollari.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Loyihalash andozalari uchta asosiy guruhga bo'linadi:
1. **Creational (Yaratuvchi):** Obyektlarni xavfsiz va tizimli yaratish mexanizmlari (Singleton, Factory, Builder).
2. **Structural (Tuzilmaviy):** Klasslar va obyektlarni birlashtirib, kattaroq va moslashuvchan tuzilmalar hosil qilish (Decorator, Facade, Adapter, Proxy).
3. **Behavioral (Xulq-atvor):** Obyektlar o'rtasidagi samarali aloqa, mas'uliyatlarni taqsimlash va harakatlar boshqaruvi (Observer, Strategy, State).

---

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

Dasturlash davomida yo'l qo'yiladigan asosiy xatolar.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Singleton andozasini JS-da klasslarsiz qanday yozish mumkin?**
JS modullari (ESM) o'z-o'zidan Singleton hisoblanadi. Moduldan eksport qilingan obyekt butun loyihada bir marta yaratiladi va barcha joyda bitta xotira manziliga ishora qiladi.

**2. Adapter andozasi qachon qo'llaniladi?**
Uchinchi tomon kutubxonasini loyihaga integratsiya qilganda, uning API nomi loyihamizdagi nomlar bilan mos kelmaganda adapter (tarjimon) sifatida o'rab ishlatiladi.

**3. Anti-pattern nima?**
Muammoni hal qilishda dastlab oson tuyulgan, lekin vaqt o'tishi bilan kodni chalkashtirib, qo'shimcha xatolar va qiyinchiliklar keltirib chiqaradigan yomon yondashuv.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Dynamic Payment Strategy Integration
Strategiya (Strategy) andozasidan foydalanib dasturning to'lov tizimini qayta yozish:
\`\`\`javascript
const paymentProcessor = {
  strategy: null,
  setStrategy(strategy) { this.strategy = strategy; },
  pay(amount) { return this.strategy.pay(amount); }
};
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    subgraph Observer Pattern
        Subject[Subject / Obyekt] -->|Bevosita obuna / Chaqiruv| Obs1[Observer 1]
        Subject -->|Bevosita obuna / Chaqiruv| Obs2[Observer 2]
    end

    subgraph PubSub Pattern
        Publisher[Publisher / Nashriyotchi] -->|publish event| Broker[Event Channel / Broker]
        Broker -->|notify / trigger| Subscriber1[Subscriber 1]
        Broker -->|notify / trigger| Subscriber2[Subscriber 2]
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

| Andoza | Guruh | Maqsadi |
| :--- | :--- | :--- |
| **Singleton** | Creational | Faqat bitta instance yaratish |
| **Factory** | Creational | Obyekt yaratish logikasini yashirish |
| **Observer** | Behavioral | O'zgarishlar haqida obunachilarni xabardor qilish |
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Singleton Pattern",
    "instruction": "Bitta instance qaytaruvchi Singleton class yarating.",
    "startingCode": "class Singleton {\n  static getInstance() {\n    // Bu yerga yozing\n  }\n}\n",
    "hint": "static instance = null; if (!instance) instance = new Singleton();",
    "test": "if (code.includes('getInstance')) return null; return 'Singleton kerak';"
  },
  {
    "id": 2,
    "title": "2️⃣ Factory Pattern",
    "instruction": "Factory method orqali ob'ekt yarating.",
    "startingCode": "class Factory {\n  static create(type) {\n    // Bu yerga yozing\n  }\n}\n",
    "hint": "if (type === 'A') return new A();",
    "test": "if (code.includes('create')) return null; return 'Factory kerak';"
  },
  {
    "id": 3,
    "title": "3️⃣ Observer Pattern",
    "instruction": "EventEmitter bilan observer yarating.",
    "startingCode": "class EventEmitter {\n  on(event, listener) { /* ... */ }\n  emit(event, data) { /* ... */ }\n}\n",
    "hint": "this.events[event]?.forEach(...)",
    "test": "if (code.includes('on') && code.includes('emit')) return null; return 'Observer kerak';"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Dasturlashda Singleton naqshi (Design Pattern) qanday maqsadlarda ishlatiladi?",
    "options": [
      "Obyekt yaratish tezligini 10 barobarga oshirish",
      "Butun dastur davomida ma'lum bir klassdan faqat va faqat bitta namuna (instance) yaratilishini va unga yagona global kirish nuqtasini ta'minlash (masalan, Database connection, Config settings)",
      "Har xil turdagi obyektlarni bitta joyda guruhlash",
      "Klasslarni funksiyaga o'zgartirish"
    ],
    "correctAnswer": 1,
    "explanation": "Singleton klassi o'zining yagona namunasini statik xususiyatda saqlaydi va ikkinchi marta yaratmoqchi bo'lganda yangisini yaratmasdan o'sha birinchisini qaytaradi. Bu resurslarni tejash va umumiy holatni bitta joyda saqlash uchun juda foydali."
  },
  {
    "id": 2,
    "question": "Obyekt yaratish jarayonini (new operatorini) to'g'ridan-to'g'ri chaqirish o'rniga, uning turiga qarab alohida maxsus metod (yoki klass) orqali obyektdan nusxa olib beradigan yaratuvchi (creational) naqsh qaysi?",
    "options": [
      "Observer Pattern",
      "Factory Pattern",
      "Decorator Pattern",
      "Strategy Pattern"
    ],
    "correctAnswer": 1,
    "explanation": "Factory pattern obyekt yaratish logikasini o'ziga oladi. Dasturchi unga qaysi turdagi obyekt kerakligini string yoki parametr orqali aytadi va Factory kerakli klassdan obyekt yaratib beradi."
  },
  {
    "id": 3,
    "question": "JavaScript-da `addEventListener` metodi qaysi mashhur xulq-atvor (behavioral) naqshiga asoslangan holda ishlaydi?",
    "options": [
      "Singleton Pattern",
      "Observer (yoki Publish-Subscribe) Pattern",
      "Facade Pattern",
      "Adapter Pattern"
    ],
    "correctAnswer": 1,
    "explanation": "Observer naqshi biror obyektda (subject) o'zgarish bo'lganda, unga obuna bo'lgan boshqa ko'plab obyektlarni (observers) avtomat xabardor qilish uchun ishlatiladi. `addEventListener` aynan klik yoki boshqa hodisalarga obuna bo'lish namunasidir."
  },
  {
    "id": 4,
    "question": "Mavjud klassning kodini o'zgartirmasdan yoki undan vorislik (inheritance) olmasdan turib, unga dinamik ravishda yangi funksionallik yoki xatti-harakatlarni qo'shish (o'rash) imkonini beruvchi tarkibiy (structural) naqsh qaysi?",
    "options": [
      "Decorator Pattern",
      "Singleton Pattern",
      "Factory Pattern",
      "Strategy Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Decorator naqshi asl obyektni o'rab oladigan boshqa wrapper-klasslar orqali uning xatti-harakatlarini kengaytiradi (masalan, oddiy qahvaga sut yoki shakar qo'shimchalarini qo'shib uning cost() funksiyasi qiymatini oshirish)."
  },
  {
    "id": 5,
    "question": "Bir nechta murakkab va chalkash quyi tizimlar (subsystems) ustidan oddiy va yagona interfeys taqdim etuvchi (masalan, to'lov qilish, email jo'natish va log yozishni bitta methodga birlashtiruvchi) naqsh qaysi?",
    "options": [
      "Proxy Pattern",
      "Facade Pattern",
      "Strategy Pattern",
      "State Pattern"
    ],
    "correctAnswer": 1,
    "explanation": "Facade (Tashqi ko'rinish) naqshi murakkab quyi tizimlarni bitta sodda klass yoki metod orqali boshqarish interfeysini yaratib beradi, natijada mijoz (client) ichki detallar bilan chalkashmaydi."
  },
  {
    "id": 6,
    "question": "Biror klassning interfeysini mijoz (client) kutayotgan boshqa interfeysga moslashtirish uchun qaysi strukturaviy (structural) naqsh ishlatiladi?",
    "options": [
      "Adapter Pattern",
      "Singleton Pattern",
      "Strategy Pattern",
      "Observer Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Adapter naqshi mos kelmaydigan interfeysga ega bo'lgan ikki xil klassning birgalikda ishlashini ta'minlash uchun xizmat qiladi (xuddi rozetka adapteri kabi)."
  },
  {
    "id": 7,
    "question": "Murakkab obyektlarni bosqichma-bosqich, zanjir (method chaining) usulida yaratishga mo'ljallangan naqsh qaysi?",
    "options": [
      "Builder Pattern",
      "Factory Pattern",
      "Facade Pattern",
      "Decorator Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Builder naqshi ko'plab parametrlarga ega murakkab obyektlarni bosqichma-bosqich va toza usulda (masalan, new UserBuilder().withName('Ali').withAge(25).build()) yaratish uchun qo'llaniladi."
  },
  {
    "id": 8,
    "question": "Obyektning ichki holati (state) o'zgarganda, uning xatti-harakati kavob berishini ta'minlovchi xulq-atvor naqshi qaysi?",
    "options": [
      "State Pattern",
      "Strategy Pattern",
      "Facade Pattern",
      "Adapter Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "State naqshida obyekt o'zining holatiga mos keladigan alohida 'State' klass obyektiga so'rovlarni delegatsiya qiladi, holat o'zgarganda esa boshqa 'State' klassiga o'tadi."
  },
  {
    "id": 9,
    "question": "Tizimdagi ma'lumotlar bazasiga kirish (data access) logikasini biznes logikadan ajratib olish va abstraktsiya qilish uchun qaysi me'moriy (architectural) naqsh ishlatiladi?",
    "options": [
      "Repository Pattern",
      "Factory Pattern",
      "Strategy Pattern",
      "Singleton Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Repository naqshi ma'lumotlarni saqlash va o'qish logikasini (masalan, SQL so'rovlarini) ma'lumotlar bazasidan ajratib, umumiy interfeys orqali taqdim etadi."
  },
  {
    "id": 10,
    "question": "Muayyan vazifani bajarish uchun turli xil algoritmlar guruhini yaratish va ularni dinamik ravishda bir-biriga almashtirish imkonini beruvchi naqsh qaysi?",
    "options": [
      "Strategy Pattern",
      "Observer Pattern",
      "Decorator Pattern",
      "Singleton Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Strategy naqshi turli algoritmlarni (masalan, turli to'lov usullarini: PayPal, CreditCard) alohida klasslarga ajratib, ularni bir-birining o'rnida oson ishlatish imkonini beradi."
  },
  {
    "id": 11,
    "question": "JavaScript-da o'zgaruvchilarni tashqi dunyodan yashirish (encapsulation) va faqat kerakli qismlarini public qilishda qaysi an'anaviy naqshdan foydalaniladi?",
    "options": [
      "Module Pattern (IIFE yordamida)",
      "Facade Pattern",
      "Singleton Pattern",
      "Decorator Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "Module naqshi JavaScript-da scope va IIFE (Immediately Invoked Function Expression) yordamida private o'zgaruvchilar yaratish va faqat ma'lum bir API'larni qaytarish uchun klassik usul hisoblanadi."
  },
  {
    "id": 12,
    "question": "Dasturlashda \"Anti-pattern\" (anti-andoza) iborasi nimani anglatadi?",
    "options": [
      "Kod yozishda keng tarqalgan, ammo samarasiz, xavfli yoki muammolarga olib keladigan noto'g'ri yondashuvlar",
      "Faqat yangi boshlovchilar yozadigan kodlar",
      "Dasturdagi sintaktik xatolar ro'yxati",
      "Loyihani tezroq yakunlash uchun ishlatiladigan eng yaxshi usullar"
    ],
    "correctAnswer": 0,
    "explanation": "Anti-pattern — muammoni hal qilishda dastlab oson ko'ringan, biroq kelajakda kodni o'zgartirishni qiyinlashtiradigan, chalkash va samarasiz yechimlardir (masalan, Spaghetti code, Callback hell)."
  }
]
};
