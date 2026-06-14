export const reactArchitecture = {
  id: "reactArchitecture",
  title: "React Arxitekturasi (Fiber, Reconciler, Virtual DOM)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

React loyihalarida to\\'g\\'ri komponentlar dizaynini tanlash, kodning qayta ishlatilishini (reusability) va kengaytiriluvchanligini ta\\'minlaydi. Loyiha o\\'sib borgan sari komponentlar chalkashib ketmasligi uchun ularni to\\'g\\'ri guruhlash, rollarini aniqlash va vazifalarini ajratish (Separation of Concerns) muhimdir. Agar bu arxitektura to\\'g\\'ri o\\'rnatilmasa, React loyihasi qisqa muddatda "spagetti kod"ga aylanadi va uni testlash yoki kengaytirish imkonsiz bo\\'lib qoladi.

---

React komponentlar dizaynini **Lego o\\'yinchoq uyi** yoki **Lego shaharchasi** deb tasavvur qiling:
* **Dumb (Presentational) Component:** Oddiy Lego g\\'ishtining o\\'zi. U faqat shakli va rangi bilan mavjud, o\\'zicha o\\'zgarmaydi. Faqat props (tashqi buyruqlar va xossalar) oladi va o\\'sha bo\\'yicha ko\\'rinish beradi.
* **Smart (Container) Component:** Uyning elektr shit paneli. U qayerdan tok kelishini va qayerga tarqalishini boshqaradi. U state (holat) va ma\\'lumotlarni boshqaradi va Dumb komponentlarni kerakli energiya bilan ta\\'minlaydi.
* **Reconciliation (Yarashtirish) va Fiber:** Bu Lego shaharchasini doimiy ravishda minimal kuch bilan ta\\'mirlab turadigan usta quruvchilar guruhidir. Ular butun shaharni buzib qayta qurmaydi, balki faqat shikastlangan g\\'ishtchani (DOM elementini) topib almashtiradi.

---

---

## 2. 💻 Real Kod Misollari

Mavzuga oid amaliy kod misollari.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

* **Separation of Concerns (Vazifalarni ajratish):** Vizual ko\\'rinish va biznes logikani alohida saqlash.
* **Smart vs Dumb Components:**
  * **Dumb (Presentational):** UI renderiga mas\\'ul. Unda API so\\'rovlari yoki global state boshqaruvi bo\\'lmaydi. Ular faqat props qabul qiladi.
  * **Smart (Container):** Logika va state uchun mas\\'ul. Ular API-ga so\\'rov yuboradi, ma\\'lumotlarni saqlaydi va dumb komponentlarga uzatadi.
* **Folder Structure (Features vs Shared):**
  * Loyiha fayllarini biznes funksionalligi bo\\'yicha guruhlash: \`features/auth\`, \`features/cart\`. Common UI komponentlar esa \`components/shared\` papkasida saqlanadi.

---

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Dumb komponent ichida API so\\'rov yozish:** Bu komponentni boshqa joyda qayta ishlatish imkoniyatini yo\\'q qiladi.
2. **Ro\\'yxatlarda index-ni key sifatida ishlatish:** Agar ro\\'yxat tartibi o\\'zgarsa, React eski holatni noto\\'g\\'ri render qilishi mumkin.
3. **Props-drilling xatosi:** State-ni unga ehtiyoji bo\\'lmagan ko\\'plab o\\'rta komponentlar orqali pastga uzatish. Yechim: React Context yoki global state (Zustand, Redux).

---

---

## 5. 💬 12 ta Intervyu Savollari

1. **Reconciliation nima?**
   - *Javob:* Virtual DOM-dagi o\\'zgarishlarni real DOM bilan solishtirib, faqat farqlarni yangilash algoritmi.
2. **Fiber nima va uning asosiy afzalligi nima?**
   - *Javob:* Fiber - React-ning renderlash ishini mayda bo\\'laklarga bo\\'lib asinxron bajaruvchi yangi dvigateli.
3. **Smart va Dumb komponentlarning farqi nima?**
   - *Javob:* Smart logika va ma\\'lumotlar bilan ishlaydi, Dumb esa faqat props olib, visual UI ko\\'rsatadi.
4. **Co-location nima?**
   - *Javob:* Fayllarni (test, css, komponent) o\\'ziga yaqin joyda, bitta papkada saqlash.
5. **Nega key prop kerak?**
   - *Javob:* React Reconciliation jarayonida qaysi elementlar o\\'zgarganini yoki o\\'chganini aniqlash uchun.

---

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: React Fiber Reconciliation & DOM Commits
React Fiber-ning ustuvorlik bo'yicha ishlashi:
\`\`\`javascript
// React 18 Concurrent rendering ishlatilganda, 
// og'ir hisob-kitoblar oqimni to'sib qo'ymaydi (non-blocking)
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (query) => {
    startTransition(() => {
      // Og'ir qidiruv logikasi shu yerda bajariladi,
      // foydalanuvchi interfeysi qotib qolmaydi.
    });
  };
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    VDOM[Virtual DOM Update] --> Fiber[Fiber Reconciler - Diffing]
    Fiber --> CommitPhase[Commit Phase - DOM Mutation]
    CommitPhase --> RealDOM[Real DOM Update]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Bosqich | Vazifasi | Asinxronmi? |
| :--- | :--- | :--- |
| **Render Phase** | Fiber daraxtini qurish, o'zgarishlarni aniqlash (Diffing) | Ha (To'xtatilishi mumkin) |
| **Commit Phase** | O'zgarishlarni Real DOM-ga qo'llash | Yo'q (Sinxron bajariladi) |
`,
  exercises: [
  {
    "id": 1,
    "title": "React isFunctionComponent",
    "instruction": "Fiber node funksiyali komponent ekanligini (typeof node.type === 'function') tekshiradigan `isFunctionComponent(fiberNode)` funksiyasini yozing.",
    "startingCode": "function isFunctionComponent(fiberNode) {\n  // type xossasini tekshiring\n}",
    "hint": "return typeof fiberNode?.type === 'function';",
    "test": "if (typeof isFunctionComponent !== 'function') return 'isFunctionComponent topilmadi'; if (isFunctionComponent({ type: () => {} }) !== true) return 'Funksiyali komponent xato topildi'; if (isFunctionComponent({ type: 'div' }) !== false) return 'Oddiy teg rad etilmadi'; return null;"
  },
  {
    "id": 2,
    "title": "Strict Mode Warning Finder",
    "instruction": "Komponent kodi ichida eskirgan `componentWillMount` metodi bor-yo'qligini tekshiradigan `checkDeprecatedMethods(code)` funksiyasini yozing (true/false).",
    "startingCode": "function checkDeprecatedMethods(code) {\n  // componentWillMount qidirilishi\n}",
    "hint": "return code.includes('componentWillMount');",
    "test": "if (typeof checkDeprecatedMethods !== 'function') return 'checkDeprecatedMethods topilmadi'; if (checkDeprecatedMethods('class A { componentWillMount() {} }') !== true) return 'Eskirgan metod aniqlanmadi'; return null;"
  },
  {
    "id": 3,
    "title": "Ref Bog'lash",
    "instruction": "DOM obyektini React `ref` obyektining `current` xossasiga bog'lab qo'yuvchi `assignRef(ref, domNode)` funksiyasini yozing.",
    "startingCode": "function assignRef(ref, domNode) {\n  // ref.current-ga yozing\n}",
    "hint": "if (ref) ref.current = domNode;",
    "test": "if (typeof assignRef !== 'function') return 'assignRef topilmadi'; const r = { current: null }; assignRef(r, 'div'); if(r.current !== 'div') return 'Ref bog\\'lanmadi'; return null;"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Presentational (Dumb) komponentning asosiy vazifasi nima?",
    "options": [
      "API so'rovlarini boshqarish",
      "Props orqali kelgan ma'lumotlarni faqat ekranga chiqarish (UI render)",
      "Global state-ni yangilash",
      "Ma'lumotlar bazasi bilan bog'lanish"
    ],
    "correctAnswer": 1,
    "explanation": "Dumb komponentlar o'zlarida state va logikani saqlamaydi, faqat props qabul qilib vizual ko'rinishga javob beradi."
  },
  {
    "id": 2,
    "question": "Smart (Container) komponentlar nima qiladi?",
    "options": [
      "Faqat CSS stillarini boshqaradi",
      "Biznes logika, API fetch va state boshqaruvini amalga oshiradi",
      "Faqat rasmlarni render qiladi",
      "HTML-ni to'g'ridan-to'g'ri o'zgartiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Smart komponentlar ma'lumotlar oqimini boshqaradi va dumb komponentlarga props uzatadi."
  },
  {
    "id": 3,
    "question": "Feature-based folder structure loyihani qanday tashkil qiladi?",
    "options": [
      "Barcha fayllarni bitta papkaga joylaydi",
      "Texnik turlar o'rniga, biznes imkoniyatlari (auth, billing) bo'yicha guruhlaydi",
      "Faqat CSS fayllarni alohida saqlaydi",
      "JavaScript-ni butunlay o'chirib yuboradi"
    ],
    "correctAnswer": 1,
    "explanation": "Feature-based tizim modulli bo'lib, har bir modul o'zining komponentlari, hooklari va servislari bilan alohida yashaydi."
  },
  {
    "id": 4,
    "question": "Co-location prinsipi nima degani?",
    "options": [
      "Barcha rasmlarni bitta bulutda saqlash",
      "Komponentga tegishli bo'lgan stil, test va hooklarni uning yonida (bitta papkada) saqlash",
      "Serverlarni bir xil joyga joylashtirish",
      "Faqat localstorage ishlatish"
    ],
    "correctAnswer": 1,
    "explanation": "Co-location loyihani tartibli qilish va kerakli fayllarni oson topish uchun komponent fayllarini bir joyda saqlashni bildiradi."
  },
  {
    "id": 5,
    "question": "Atomic Design tizimidagi 'Atom' komponent nima?",
    "options": [
      "Butun sahifa kodi",
      "Eng kichik, boshqa bo'linmaydigan UI elementi (masalan, Input yoki Button)",
      "Faqat animatsiyalar",
      "Node.js server qismi"
    ],
    "correctAnswer": 1,
    "explanation": "Atomic dizaynda Atom — bu eng kichik va sodda UI g'ishtchasi hisoblanadi."
  },
  {
    "id": 6,
    "question": "Circular dependency qachon yuzaga keladi?",
    "options": [
      "React-ni ikki marta o'rnatganda",
      "Ikki komponent bir-birini aylanma import qilganda",
      "Internet o'chib qolganda",
      "API sekin ishlaganda"
    ],
    "correctAnswer": 1,
    "explanation": "Aylanma bog'liqlik importlar sikliga sabab bo'lib, runtime-da xatolik yuzaga keltirishi mumkin."
  },
  {
    "id": 7,
    "question": "Barrel export (index.js orqali eksport qilish) nima?",
    "options": [
      "Barcha importlarni o'chirib tashlash",
      "Papkadagi barcha komponentlarni bitta index.js fayl orqali tashqi foydalanish uchun eksport qilish",
      "Stil fayllarini birlashtirish",
      "Faqat server loglarini yozish"
    ],
    "correctAnswer": 1,
    "explanation": "Barrel export import yo'llarini qisqartirib, bitta papkadan hamma kerakli narsani olishga yordam beradi."
  },
  {
    "id": 8,
    "question": "Presentational (Dumb) komponentlarning eng katta afzalligi nimada?",
    "options": [
      "Faqat bitta tugma chiza olishi",
      "Yuqori darajadagi qayta ishlatiluvchanlik (reusability) va testlashning osonligi",
      "API so'rovlarini avtomatik bajarishi",
      "State-ni o'zgartirishi"
    ],
    "correctAnswer": 1,
    "explanation": "Dumb komponentlar tashqi state yoki API-ga bog'liq bo'lmagani uchun ularni loyihaning istalgan joyida ishlatish juda oson."
  },
  {
    "id": 9,
    "question": "Feature-based papkalar tuzilishida umumiy komponentlar (masalan, Button, Input) qayerda saqlanadi?",
    "options": [
      "src/features/auth/components papkasida",
      "src/components (shared components) papkasida",
      "node_modules ichida",
      "src/pages papkasida"
    ],
    "correctAnswer": 1,
    "explanation": "Loyiha bo'ylab ko'p ishlatiladigan shared UI g'ishtchalari har doim global src/components papkasida saqlanadi."
  },
  {
    "id": 10,
    "question": "Komponentlar dizaynidagi 'Separation of Concerns' nima degani?",
    "options": [
      "HTML va CSS-ni alohida yozish",
      "UI renderini (ko'rinishini) biznes logikadan (hisob-kitob, api) ajratish",
      "Database jadvallarini bo'lish",
      "Rasmlarni alohida serverda saqlash"
    ],
    "correctAnswer": 1,
    "explanation": "Bu prinsip kodni toza va tushunarli saqlash uchun visual UI bilan ma'lumotlar logikasini alohida yozishni anglatadi."
  },
  {
    "id": 11,
    "question": "Presentational komponentdan logikani butunlay ajratish uchun React-da qaysi hook turi qo'llaniladi?",
    "options": [
      "useId",
      "Custom Hooks (maxsus hooklar)",
      "useInsertionEffect",
      "useDeferredValue"
    ],
    "correctAnswer": 1,
    "explanation": "Custom hooklar logikani alohida faylda saqlab, UI komponentni faqat vizual render bilan band qilishga imkon beradi."
  },
  {
    "id": 12,
    "question": "Smart komponent pattern-i UI-da qaysi xavfli xolatning oldini oladi?",
    "options": [
      "CSS yozishni qiyinlashishini",
      "API so'rovlari va UI shablonlarini bitta joyda aralashib ketishini (spagetti kod)",
      "JavaScript kodining kamayishini",
      "Faqat class component ishlashini"
    ],
    "correctAnswer": 1,
    "explanation": "Smart komponent pattern-i logika va vizual qismni ajratish orqali chalkash loyihalar yuzaga kelishini oldini oladi."
  }
]
};
