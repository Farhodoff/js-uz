export const reactProductionArchitecture = {
  id: "reactProductionArchitecture",
  title: "React Production Arxitekturasi (Build, Deploy, CI/CD)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Katta va professional React loyihalarida (masalan, o\\'nlab dasturchilar ishlaydigan Enterprise tizimlarda) kod bazasini tartibli saqlash hayotiy zaruriyatdir. Junior dasturchilar odatda barcha logikani (API so\\'rovlar, ma\\'lumotlarni formatlash, form validation va holat boshqaruvi) to\\'g\\'ridan-to\\'g\\'ri UI komponentining ichiga (JSX aralash) yozib yuborishadi. Bu quyidagi muammolarga olib keladi:
- **Spaghetti Code:** Kodni o\\'qish va tushunish o\\'ta qiyinlashadi.
- **Qayta ishlatib bo\\'lmaslik (Duplication):** Bir xil API so\\'rov yoki logika boshqa sahifada ham kerak bo\\'lsa, uni nusxalashga to\\'g\\'ri keladi.
- **Testlash qiyinligi:** UI-ga qattiq bog\\'langan biznes logikani Unit test yordamida tekshirish imkonsiz bo\\'lib qoladi.

**Separation of Concerns (Vazifalar taqsimoti)** — har bir kod bo\\'lagining loyihada faqat bitta aniq vazifaga ega bo\\'lishini ta\\'minlash qoidasidir.

---

Professional restoran faoliyatini tasavvur qiling:
1. **UI Komponent (Ofitsiant):** Mijoz bilan muloqot qiladi, buyurtmani oladi va tayyor ovqatni chiroyli qilib stolga tortadi. U ovqat qanday pishishini yoki masalliqlar qaerdan kelishini bilmaydi.
2. **Custom Hook (Oshpaz):** Oshxonada ishlaydi. U ovqat tayyorlash retsepti va texnikasini (biznes logikani) biladi, lekin mijozlar bilan to\\'g\\'ridan-to\\'g\\'ri gaplashmaydi.
3. **Service Layer (Ta\\'minotchi):** Bozordan go\\'sht, sabzavotlar (tashqi API ma\\'lumotlari) olib keladi. U ovqat pishirmaydi ham, mijozga xizmat ham ko\\'rsatmaydi.

Agar ofitsiantning o\\'zi ham bozorga borib, ham ovqat pishirib, ham xizmat ko\\'rsatsa, restoran tezda inqirozga uchraydi. Dasturlashda ham xuddi shunday!

---

Service Layer — API so\\'rovlari va tarmoq kutubxonalari (Axios kabi) sozlamalari yoziladigan alohida qatlam. U logikani markazlashtiradi va testlashni osonlashtiradi.

#

Custom Hooks arxitekturasi. Hooklar kodni kamaytirdi, tushunarli qildi va JSX yozmasdan biznes logikani oson ulash imkonini berdi.

#

---

## 2. 💻 Real Kod Misollari

Mavzuga oid amaliy kod misollari.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Modul tashqarisidagi kodlar modul ichidagi private fayllarga ruxsatsiz kirmasligi uchun modulning faqat \`index.js\` faylidagi eksportlari bilan cheklanishini ta\\'minlaydi.

---

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **useEffect ichida to\\'g\\'ridan-to\\'g\\'ri URL bilan Fetch qilish:**
   - *Muammo:* Tarmoq xatolari va interceptorlar markazlashtirilmagan. Keyinchalik API manzili o\\'zgarsa, o\\'nlab fayllarni qo\\'lda tahrirlash kerak bo\\'ladi.
   - *Yechim:* Har doim API so\\'rovlarni \`Service\` qatlamiga joylashtiring.

2. **Circular Dependencies (Aylanma Importlar):**
   - *Muammo:* A component B componentni import qiladi, B esa o\\'z navbatida A-ni import qiladi. Bu dasturning to\\'xtab qolishiga yoki \`undefined\` xatolariga sabab bo\\'ladi.
   - *Yechim:* Modullarning public API-larini (\`index.js\` orqali) to\\'g\\'ri boshqaring va umumiy qismlarni global \`components\` yoki \`hooks\`-ga ko\\'chiring.

3. **Global State-dan noto\\'g\\'ri foydalanish:**
   - *Muammo:* Oddiy UI holatlarini (masalan, dropdown ochiq-yopiqligini) ham Redux yoki global context-ga joylash bundle hajmini va re-renderlar sonini oshiradi.
   - *Yechim:* **State Colocation** qoidasiga amal qiling. State-ni faqat o\\'sha state-ga muhtoj bo\\'lgan eng pastki komponent darajasida saqlang.

---

---

## 5. 💬 12 ta Intervyu Savollari

#

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Dynamic Imports for Bundle Size Optimization
Vite/Webpack build hajmini kamaytirish uchun dinamik importlar (\`React.lazy\`) bilan ishlash:
\`\`\`javascript
import React, { Suspense } from 'react';

// Modul faqat kerak bo'lganda yuklanadi (lazy loading)
const HeavyDashboard = React.lazy(() => import('./HeavyDashboard'));

function App() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <HeavyDashboard />
    </Suspense>
  );
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph LR
    Code[Code Push] --> CI[CI: Lint, Test]
    CI --> Build[Build: Minify, Tree Shake]
    Build --> Deploy[Deploy: CDN, Edge Servers]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Texnika | Vazifasi | Foydasi |
| :--- | :--- | :--- |
| **Lazy Loading** | Komponentlarni dinamik yuklash | Ilk bundle hajmini kamaytiradi |
| **Tree Shaking** | Ishlatilmayotgan kodlarni o'chirish | Ortiqcha kodlardan tozalaydi |
| **Gzip / Brotli** | Build fayllarini siqish | Yuklanish tezligini 70% oshiradi |
`,
  exercises: [
  {
    "id": 1,
    "title": "API URL Creator",
    "instruction": "Service qatlamida API so\\'rovlari uchun to\\'liq URL yaratadigan `createServiceUrl(baseUrl, path, queryParams)` funksiyasini yozing (QueryParams obyekt kalit va qiymatlaridan foydalanib string yarating).",
    "startingCode": "function createServiceUrl(baseUrl, path, queryParams) {\n  // queryParams obyektidan URL string yarating\n}",
    "hint": "const q = new URLSearchParams(queryParams).toString();\nreturn `${baseUrl}${path}${q ? '?' + q : ''}`;",
    "test": "if (typeof createServiceUrl !== 'function') return 'createServiceUrl topilmadi'; const res = createServiceUrl('https://api.com', '/users', { limit: 10 }); if (res !== 'https://api.com/users?limit=10') return 'URL noto\\'g\\'ri formatlandi'; return null;"
  },
  {
    "id": 2,
    "title": "Custom Hook State Getter/Setter",
    "instruction": "Custom hook logikasini simulyatsiya qiluvchi, boshlang\\'ich qiymat olib, o\\'zgaruvchi state-ni yopiq saqlagan holda array formatda `[getState, setState]` funksiyalarini qaytaradigan `useCustomState(initialValue)` yozing.",
    "startingCode": "function useCustomState(initialValue) {\n  let state = initialValue;\n  // getState va setState-ni qaytaring\n}",
    "hint": "const getState = () => state;\nconst setState = (newValue) => { state = newValue; };\nreturn [getState, setState];",
    "test": "if (typeof useCustomState !== 'function') return 'useCustomState topilmadi'; const [get, set] = useCustomState(5); if(get() !== 5) return 'Boshlang\\'ich qiymat xato'; set(10); if(get() !== 10) return 'State yangilanmadi'; return null;"
  },
  {
    "id": 3,
    "title": "Service Response Parser",
    "instruction": "API Service qatlamida javob muvaffaqiyatli bo\\'lsa `response.data` ni qaytaruvchi, aks holda `response.error` ni Error shaklida uloqtiruvchi (throw) `parseApiResponse(response)` funksiyasini yozing.",
    "startingCode": "function parseApiResponse(response) {\n  // data yoki error tekshiring\n}",
    "hint": "if (response.data) return response.data;\nthrow new Error(response.error || 'Unknown error');",
    "test": "if (typeof parseApiResponse !== 'function') return 'parseApiResponse topilmadi'; if(parseApiResponse({ data: 'ok' }) !== 'ok') return 'Data qaytishi xato'; try { parseApiResponse({ error: 'fail' }); } catch(e) { if(e.message === 'fail') return null; } return 'Error otilmadi';"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Separation of Concerns (Vazifalar ajratilishi) prinsipi nima?",
    "options": [
      "Loyiha sahifalarini turli serverlarga joylashtirish",
      "Har bir kod bloki faqat bitta aniq vazifaga (UI, logika yoki API) xizmat qilishi",
      "Faqat CSS va HTML fayllarni birlashtirish",
      "Ma'lumotlar bazasini o'chirib yuborish"
    ],
    "correctAnswer": 1,
    "explanation": "Separation of Concerns har bir fayl yoki modul faqat o'ziga taalluqli vazifani bajarishini ta'minlashni anglatadi."
  },
  {
    "id": 2,
    "question": "Custom Hook va oddiy helper funksiyaning eng katta farqi nimada?",
    "options": [
      "Helper funksiyalar tezroq ishlaydi",
      "Custom Hook o'z ichida boshqa React hooklaridan (useState, useEffect) foydalana oladi",
      "Custom Hook faqat CSS-ni boshqaradi",
      "Ikkalasining hech qanday farqi yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Custom Hook-da React-ning stateful va lifecycle hooklarini ishlata olish imkoniyati mavjud."
  },
  {
    "id": 3,
    "question": "API Service Layer nima uchun xizmat qiladi?",
    "options": [
      "Sayt tugmalarini chizish uchun",
      "API so'rovlar va tarmoq kutubxonalari sozlamalarini markazlashtirib, komponentlardan ajratish uchun",
      "Rasmlarni yuklash uchun",
      "Faqat CSS-larni boshqarish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Service layer tarmoq logikasini yagona joyga to'plab, butun loyiha bo'ylab import qilib ishlatishga imkon beradi."
  },
  {
    "id": 4,
    "question": "React-da Container/Presenter pattern-ini nima siqib chiqardi?",
    "options": [
      "Redux Toolkit",
      "Custom Hooks arxitekturasi",
      "CSS Grid",
      "TypeScript sinflari"
    ],
    "correctAnswer": 1,
    "explanation": "Custom Hook-lar yordamida logika va UI-ni ajratish ancha osonlashdi, natijada eski Container/Presenter andozasiga ehtiyoj qolmadi."
  },
  {
    "id": 5,
    "question": "Nega useEffect ichida to'g'ridan-to'g'ri fetch chaqirish production-da tavsiya etilmaydi?",
    "options": [
      "Chunki u JS-ni o'chirib qo'yadi",
      "Ushbu kodni boshqa komponentlarda qayta ishlatib bo'lmaydi va test yozish juda qiyinlashadi",
      "Hech qanday farqi yo'q",
      "Faqat CSS-ga zarar beradi"
    ],
    "correctAnswer": 1,
    "explanation": "Direct fetch kod takrorlanishiga olib keladi. Uni custom hook yoki service layer-ga ko'chirish kerak."
  },
  {
    "id": 6,
    "question": "Scalable arxitekturadagi 'Barrel export' (index.js) ning zarari nima bo'lishi mumkin?",
    "options": [
      "Saytni o'chirib qo'yishi",
      "Circular dependencies (aylanma import) va keraksiz kodlarning yuklanishi (Tree shaking cheklovi)",
      "Hech qanday zarari yo'q",
      "Sana va vaqtni buzishi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar barrel fayl ichidagi barcha komponentlar bir vaqtda yuklansa, bu tree shaking-ni buzib bundle hajmini oshirishi mumkin."
  },
  {
    "id": 7,
    "question": "Production arxitekturasida 'Service Layer' modelining eng muhim vazifasi nima?",
    "options": [
      "Dizayn stillarini boshqarish",
      "Tarmoq so'rovlarini (Axios/fetch kabi) komponentlar va hooklardan to'liq ajratib, markaziy joyga yig'ish",
      "Database migratsiyalarini qilish",
      "JSX yozish"
    ],
    "correctAnswer": 1,
    "explanation": "Service Layer barcha API so'rovlarni alohida modullarda saqlashga imkon beradi, bu esa loyihani toza va oson testlanadigan qiladi."
  },
  {
    "id": 8,
    "question": "React-da logikani komponentga eng yaqin joyda saqlash (Co-location) nimani anglatadi?",
    "options": [
      "Hamma kodni App.js faylida saqlash",
      "State va biznes logikani aynan o'sha ma'lumotdan foydalanadigan komponentga imkon qadar yaqin joyda joylashtirish",
      "Kodlarni har xil serverlarga yozish",
      "Bitta faylda faqat CSS saqlash"
    ],
    "correctAnswer": 1,
    "explanation": "Co-location keraksiz props-drilling va global statelar yuzaga kelishini oldini oladi, kodni oson o'qiladigan qiladi."
  },
  {
    "id": 9,
    "question": "Custom Hook-lar yozilishi React ilovasini testlashni qanday osonlashtiradi?",
    "options": [
      "Ular testlarni tezlashtiradi",
      "Hech qanday UI komponentni chizmasdan (render qilmasdan), biznes logikani alohida (isolation) testlash imkonini beradi",
      "Linter xatolarini o'chiradi",
      "Database-ni test qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Custom hook faqat funksiya bo'lgani sababli, `@testing-library/react-hooks` orqali uning holatlari UI-siz sinovdan o'tkaziladi."
  },
  {
    "id": 10,
    "question": "Feature-based papkalar tuzilishidagi `index.js` (barrel) ning vazifasi nima?",
    "options": [
      "Node serverini ishga tushirish",
      "Feature modulining 'Public API' si vazifasini bajarib, tashqariga faqat ruxsat etilgan komponent va hooklarni eksport qilish",
      "CSS-ni sozlash",
      "Kodni tozalash"
    ],
    "correctAnswer": 1,
    "explanation": "Index.js feature modulining tashqi dunyo bilan bog'lanadigan yagona eshigi (interface) bo'limi bo'lib xizmat qiladi."
  },
  {
    "id": 11,
    "question": "React-da DRY (Don't Repeat Yourself) prinsipining ma'nosi nima?",
    "options": [
      "Kodni kommentlarsiz yozish",
      "Takrorlanuvchi UI qismlari, biznes logikalari yoki API chaqiruvlarini alohida komponent, hook va helper funksiyalarga chiqarish",
      "Har soatda build qilish",
      "Fayllarni quruq saqlash"
    ],
    "correctAnswer": 1,
    "explanation": "Takrorlanuvchi logikani bitta umumiy funksiya yoki hook ichiga yozib, hamma joyda o'shani import qilib ishlatish DRY hisoblanadi."
  },
  {
    "id": 12,
    "question": "Ma'lumot olish uchun custom hook ishlatish qanday qilib 'Separation of Concerns' ga mos keladi?",
    "options": [
      "Kodni tezroq compile qiladi",
      "Komponentning JSX qismini toza saqlab, loading, error va fetch holatlarini to'liq komponentdan yashiradi",
      "Bazaga to'g'ridan-to'g'ri bog'laydi",
      "Faqat CSS-ga stil beradi"
    ],
    "correctAnswer": 1,
    "explanation": "UI komponent faqat ma'lumotni render qilish bilan shug'ullanadi, hook esa orqa fondagi so'rovlar logikasiga javob beradi."
  }
]
};
