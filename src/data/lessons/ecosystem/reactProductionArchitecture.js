export const reactProductionArchitecture = {
  id: "reactProductionArchitecture",
  title: "Real Production Arxitekturasi (Separation of Concerns)",
  theory: `## 1. NEGA KERAK?

Katta va professional React loyihalarida (masalan, o\\'nlab dasturchilar ishlaydigan Enterprise tizimlarda) kod bazasini tartibli saqlash hayotiy zaruriyatdir. Junior dasturchilar odatda barcha logikani (API so\\'rovlar, ma\\'lumotlarni formatlash, form validation va holat boshqaruvi) to\\'g\\'ridan-to\\'g\\'ri UI komponentining ichiga (JSX aralash) yozib yuborishadi. Bu quyidagi muammolarga olib keladi:
- **Spaghetti Code:** Kodni o\\'qish va tushunish o\\'ta qiyinlashadi.
- **Qayta ishlatib bo\\'lmaslik (Duplication):** Bir xil API so\\'rov yoki logika boshqa sahifada ham kerak bo\\'lsa, uni nusxalashga to\\'g\\'ri keladi.
- **Testlash qiyinligi:** UI-ga qattiq bog\\'langan biznes logikani Unit test yordamida tekshirish imkonsiz bo\\'lib qoladi.

**Separation of Concerns (Vazifalar taqsimoti)** — har bir kod bo\\'lagining loyihada faqat bitta aniq vazifaga ega bo\\'lishini ta\\'minlash qoidasidir.

---

## 2. SODDALASHTIRILGAN ANALOGIYA

Professional restoran faoliyatini tasavvur qiling:
1. **UI Komponent (Ofitsiant):** Mijoz bilan muloqot qiladi, buyurtmani oladi va tayyor ovqatni chiroyli qilib stolga tortadi. U ovqat qanday pishishini yoki masalliqlar qaerdan kelishini bilmaydi.
2. **Custom Hook (Oshpaz):** Oshxonada ishlaydi. U ovqat tayyorlash retsepti va texnikasini (biznes logikani) biladi, lekin mijozlar bilan to\\'g\\'ridan-to\\'g\\'ri gaplashmaydi.
3. **Service Layer (Ta\\'minotchi):** Bozordan go\\'sht, sabzavotlar (tashqi API ma\\'lumotlari) olib keladi. U ovqat pishirmaydi ham, mijozga xizmat ham ko\\'rsatmaydi.

Agar ofitsiantning o\\'zi ham bozorga borib, ham ovqat pishirib, ham xizmat ko\\'rsatsa, restoran tezda inqirozga uchraydi. Dasturlashda ham xuddi shunday!

---

## 3. ASOSIY KONSEPTLAR

Katta loyihalarda arxitektura asosan quyidagi 4 ta mustaqil qatlamga bo\\'linadi:

1. **Presentation Layer (UI Qatlami):**
   - Faqat JSX render qiladi, foydalanuvchi hodisalarini (onClick, onChange) tinglaydi.
   - Minimal holat (faqat UI-ga tegishli statelar, masalan: \`isOpen\`, \`activeTab\`) saqlaydi.
2. **Business Logic Layer (Biznes Logika Qatlami):**
   - Custom hooklar orqali amalga oshiriladi.
   - React state-lari, useEffect-lar va boshqa logikalar shu yerda yashaydi.
3. **Service Layer (API Qatlami):**
   - Tashqi dunyo (Backend) bilan bog\\'lanish kanali.
   - Axios instance-lar, fetch so\\'rovlari va request/response interceptor-lar shu yerda boshqariladi.
4. **Data/State Management (Global Global State):**
   - Redux, Zustand, yoki React Context yordamida ilovaning umumiy holatini boshqarish.

---

## 4. CHUQUR SHO\\'NG\\'ISH: FEATURE-BASED ARXITEKTURA

Zamonaviy React production loyihalarida eng mashhur va kengayuvchan papkalar tuzilmasi bu **Feature-based structure** (yoki *Colocation*) hisoblanadi. Kod texnik turi bo\\'yicha emas, balki biznes moduli bo\\'yicha guruhlanadi:

\`\`\`bash
src/
├── assets/             # Global rasmlar, shriftlar
├── components/         # Global umumiy UI komponentlar (Button, Input, Modal)
├── config/             # Global konfiguratsiyalar (env, constants)
├── hooks/              # Global custom hooklar (useTheme, useAuth)
├── services/           # Global umumiy API xizmatlari
├── features/           # Biznes modullar (Har bir modul o\\'z arxitekturasiga ega)
│   ├── auth/           # Avtorizatsiya moduli
│   │   ├── components/ # Faqat auth sahifalariga tegishli UI komponentlar
│   │   ├── hooks/      # useLogin, useRegister hooklari
│   │   ├── services/   # authApi.js (login, register so\\'rovlari)
│   │   └── index.js    # Public API (Tashqariga faqat kerakli narsalarni chiqaradi)
│   └── dashboard/      # Dashboard moduli
└── App.js
\`\`\`

### Barrel Exports va Public API Pattern
Feature ichidagi \`index.js\` fayli darvoza (public API) vazifasini bajaradi. U boshqa modullarga auth ichidagi hamma narsani ko\\'rishga ruxsat bermaydi, faqat eksport qilingan qismlarnigina taqdim etadi:
\`\`\`javascript
// features/auth/index.js
export { LoginForm } from \\'./components/LoginForm\\';
export { useAuth } from \\'./hooks/useAuth\\';
// Boshqa ichki yordamchi funksiyalar yashirin qoladi.
\`\`\`

---

## 5. TIRIK KOD / LOYIHA MISOLI

Keling, Separation of Concerns prinsipini to\\'liq qo\\'llagan holda foydalanuvchilar ro\\'yxatini yuklaydigan kod yozamiz.

### 1-qadam: API Service (services/userService.js)
\`\`\`javascript
import axios from \\'axios\\';

const apiClient = axios.create({
  baseURL: \\'https://api.example.com\\',
  headers: { \\'Content-Type\\': \\'application/json\\' }
});

export const UserService = {
  getUsers: async () => {
    try {
      const response = await apiClient.get(\\'/users\\');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || \\'Tarmoq xatosi!\\');
    }
  }
};
\`\`\`

### 2-qadam: Custom Hook (hooks/useFetchUsers.js)
\`\`\`javascript
import { useState, useEffect } from \\'react\\';
import { UserService } from \\'../services/userService\\';

export function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const data = await UserService.getUsers();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { users, loading, error };
}
\`\`\`

### 3-qadam: UI Presentational Component (components/UserList.jsx)
\`\`\`javascript
import React from \\'react\\';
import { useFetchUsers } from \\'../hooks/useFetchUsers\\';

export function UserList() {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div className="error">Xatolik: {error}</div>;

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-item">
          <strong>{user.name}</strong> - {user.email}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

---

## 6. VIZUALIZATSIYA

Quyidagi diagrammada React Server Components (RSC) va Client Components o\\'rtasidagi chegara hamda ma\\'lumotlar oqimi tasvirlangan:

\`\`\`mermaid
graph TD
  subgraph Server Boundary (NodeJS Environment)
    RSC[React Server Component: ProductPage] -->|Direct Fetch| DB[(Database / Internal API)]
    RSC -->|Prepare Static HTML & JSON Props| Serializer[Props Serialization]
  end

  subgraph Client Boundary (Browser Environment)
    Serializer -->|Network Transfer| ClientComp[Client Component: ProductInteractive]
    ClientComp -->|Browser Hydration| Interactive[Attach Event Listeners & State]
    Interactive -->|Interactions| API[External Microservices API]
  end
  
  style ServerBoundary fill:#e1f5fe,stroke:#03a9f4,stroke-width:2px
  style ClientBoundary fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
\`\`\`

---

## 7. KO\\'P UCHRAYDIGAN XATOLAR VA MUAMMOLAR

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

## 8. INTERVYU SAVOLLARI VA JAVOBLARI

### 1. Separation of Concerns (Vazifalar ajratilishi) React ilovalarda qanday amalga oshiriladi?
JSX kodini (UI render), API chaqiruvlarini (Services) va UI o\\'zgarishlar logikasini (Custom Hooks) alohida fayllarga ajratib saqlash orqali.

### 2. Service Layer nima va u nega muhim?
Service Layer — API so\\'rovlari va tarmoq kutubxonalari (Axios kabi) sozlamalari yoziladigan alohida qatlam. U logikani markazlashtiradi va testlashni osonlashtiradi.

### 3. Custom Hook va oddiy helper funksiyaning farqi nimada?
Custom Hook o\\'z ichida React-ning boshqa hooklarini (\`useState\`, \`useEffect\`) ishlata oladi va stateful logikani boshqaradi. Helper funksiya esa faqat kiruvchi qiymat olib chiquvchi toza (pure) JavaScript funksiyasidir.

### 4. Barrel export nima va undan foydalanishda nimaga e\\'tibor berish kerak?
Papkadagi barcha eksportlarni yagona \`index.js\` faylida jamlab, boshqa fayllarga bitta import bilan taqdim etish usuli. E\\'tiborsizlik qilinsa, Tree-shaking-ni buzib, aylanma import (circular dependency) chaqirishi mumkin.

### 5. Feature-based papka tuzilishining an\\'anaviy (technical/flat) tuzilishdan afzalligi nimada?
Katta loyihalarda har bir modul (masalan, \`auth\`, \`payment\`) mustaqil yashaydi. Bu kodni oson o\\'chirish, ko\\'chirish va alohida jamoalar tomonidan parallel rivojlantirish imkonini beradi.

### 6. React-da Container/Presenter pattern-ini nima siqib chiqardi va nega?
Custom Hooks arxitekturasi. Hooklar kodni kamaytirdi, tushunarli qildi va JSX yozmasdan biznes logikani oson ulash imkonini berdi.

### 7. Custom hook ichida fetch yozish unit test yozishni qanday osonlashtiradi?
Chunki biz UI-ni render qilmasdan va tugmalarni bosmasdan turib, shunchaki hookni alohida ishga tushirib (\`@testing-library/react-hooks\`), uning holatlarini sinab ko\\'rishimiz mumkin.

### 8. State Colocation nima?
Ma\\'lumotni iloji boricha uni ishlatadigan komponentning eng yaqin ajdodiga yoki o\\'zining ichiga joylashtirish. Bu keraksiz global state va props drilling-ni oldini oladi.

### 9. API so\\'rovlarda interceptor-lar qanday vazifani bajaradi?
Har bir so\\'rov yuborilishidan oldin unga Token qo\\'shish, yoki serverdan kelgan xatoliklarni yagona joyda (masalan, 401 Unauthorized bo\\'lganda foydalanuvchini tizimdan chiqarib yuborish) qayta ishlash uchun ishlatiladi.

### 10. React Server Components (RSC) arxitekturasi bizga qanday yordam beradi?
Komponentlarni to\\'g\\'ridan-to\\'g\\'ri serverda ma\\'lumotlar bazasiga ulanib render qilishga va mijoz brauzeriga keraksiz JS yuklamasdan faqat HTML/JSON formatida jo\\'natishga yordam beradi.

### 11. Loyihani optimallashtirishda Dynamic Import nima uchun ishlatiladi?
Kam ishlatiladigan katta sahifalarni (masalan, Admin Dashboard) faqat foydalanuvchi o\\'sha sahifaga kirgandagina yuklash orqali dastlabki yuklanish hajmini (\`bundle size\`) kamaytirish uchun.

### 12. Public API pattern qanday ishlaydi?
Modul tashqarisidagi kodlar modul ichidagi private fayllarga ruxsatsiz kirmasligi uchun modulning faqat \`index.js\` faylidagi eksportlari bilan cheklanishini ta\\'minlaydi.

---

## 9. KENGAYTIRILGAN MAVZULAR

### Monorepo Arxitekturasi (Lerna, Turborepo, Nx)
Agar tashkilotda bir nechta loyihalar mavjud bo\\'lsa (masalan, Admin panel, Customer site, Mobile App), ularning umumiy UI komponentlari va API xizmatlarini bitta joyda saqlash uchun Monorepo arxitekturasi tanlanadi:
- **Shared packages:** API xizmatlar (\`@org/api\`) va UI dizayn tizimi (\`@org/ui\`) alohida paket sifatida yozilib, Turborepo orqali boshqariladi.
- **Qayta foydalanish:** Kod takrorlanishini minimallashtiradi va barcha ilovalarda dizayn izchilligini kafolatlaydi.

### Micro-Frontend Arxitekturasi
Katta tizimlarni bir nechta mustaqil React loyihalariga bo\\'lib yuborish va ularni Webpack 5 Module Federation yordamida runtime-da bitta katta ilovaga birlashtirish usuli:
- Har bir jamoa o\\'z feature-ini alohida build qilib, deploy qila oladi.
- Asosiy xost (Host) ilova ushbu modullarni dinamik ravishda o\\'ziga yuklab oladi.

---

## 10. XULOSA VA CHECKLIST

Tizimli production arxitekturasini yaratish uchun quyidagi checklistga rioya qiling:
- [ ] useEffect ichida to\\'g\\'ridan-to\\'g\\'ri fetch yozish taqiqlangan.
- [ ] Barcha API chaqiruvlari Service qatlamida to\\'plangan.
- [ ] Har bir feature modul faqat o\\'zining \`index.js\` (Public API) fayli orqali tashqi dunyoga bog\\'lanadi.
- [ ] UI komponentlar faqat renderlash bilan band, og\\'ir hisob-kitoblar helper-larda, asinxron holatlar custom hooklarda joylashgan.
- [ ] Aylanma importlarni aniqlash uchun ESLint qoidalari o\\'rnatilgan.`,
  exercises: [
    {
      id: 1,
      title: "API URL Creator",
      instruction: "Service qatlamida API so\\'rovlari uchun to\\'liq URL yaratadigan `createServiceUrl(baseUrl, path, queryParams)` funksiyasini yozing (QueryParams obyekt kalit va qiymatlaridan foydalanib string yarating).",
      startingCode: "function createServiceUrl(baseUrl, path, queryParams) {\n  // queryParams obyektidan URL string yarating\n}",
      hint: "const q = new URLSearchParams(queryParams).toString();\nreturn `${baseUrl}${path}${q ? '?' + q : ''}`;",
      test: "if (typeof createServiceUrl !== 'function') return 'createServiceUrl topilmadi'; const res = createServiceUrl('https://api.com', '/users', { limit: 10 }); if (res !== 'https://api.com/users?limit=10') return 'URL noto\\'g\\'ri formatlandi'; return null;"
    },
    {
      id: 2,
      title: "Custom Hook State Getter/Setter",
      instruction: "Custom hook logikasini simulyatsiya qiluvchi, boshlang\\'ich qiymat olib, o\\'zgaruvchi state-ni yopiq saqlagan holda array formatda `[getState, setState]` funksiyalarini qaytaradigan `useCustomState(initialValue)` yozing.",
      startingCode: "function useCustomState(initialValue) {\n  let state = initialValue;\n  // getState va setState-ni qaytaring\n}",
      hint: "const getState = () => state;\nconst setState = (newValue) => { state = newValue; };\nreturn [getState, setState];",
      test: "if (typeof useCustomState !== 'function') return 'useCustomState topilmadi'; const [get, set] = useCustomState(5); if(get() !== 5) return 'Boshlang\\'ich qiymat xato'; set(10); if(get() !== 10) return 'State yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "Service Response Parser",
      instruction: "API Service qatlamida javob muvaffaqiyatli bo\\'lsa `response.data` ni qaytaruvchi, aks holda `response.error` ni Error shaklida uloqtiruvchi (throw) `parseApiResponse(response)` funksiyasini yozing.",
      startingCode: "function parseApiResponse(response) {\n  // data yoki error tekshiring\n}",
      hint: "if (response.data) return response.data;\nthrow new Error(response.error || 'Unknown error');",
      test: "if (typeof parseApiResponse !== 'function') return 'parseApiResponse topilmadi'; if(parseApiResponse({ data: 'ok' }) !== 'ok') return 'Data qaytishi xato'; try { parseApiResponse({ error: 'fail' }); } catch(e) { if(e.message === 'fail') return null; } return 'Error otilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Separation of Concerns (Vazifalar ajratilishi) prinsipi nima?",
      options: [
        "Loyiha sahifalarini turli serverlarga joylashtirish",
        "Har bir kod bloki faqat bitta aniq vazifaga (UI, logika yoki API) xizmat qilishi",
        "Faqat CSS va HTML fayllarni birlashtirish",
        "Ma'lumotlar bazasini o'chirib yuborish"
      ],
      correctAnswer: 1,
      explanation: "Separation of Concerns har bir fayl yoki modul faqat o'ziga taalluqli vazifani bajarishini ta'minlashni anglatadi."
    },
    {
      id: 2,
      question: "Custom Hook va oddiy helper funksiyaning eng katta farqi nimada?",
      options: [
        "Helper funksiyalar tezroq ishlaydi",
        "Custom Hook o'z ichida boshqa React hooklaridan (useState, useEffect) foydalana oladi",
        "Custom Hook faqat CSS-ni boshqaradi",
        "Ikkalasining hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Custom Hook-da React-ning stateful va lifecycle hooklarini ishlata olish imkoniyati mavjud."
    },
    {
      id: 3,
      question: "API Service Layer nima uchun xizmat qiladi?",
      options: [
        "Sayt tugmalarini chizish uchun",
        "API so'rovlar va tarmoq kutubxonalari sozlamalarini markazlashtirib, komponentlardan ajratish uchun",
        "Rasmlarni yuklash uchun",
        "Faqat CSS-larni boshqarish uchun"
      ],
      correctAnswer: 1,
      explanation: "Service layer tarmoq logikasini yagona joyga to'plab, butun loyiha bo'ylab import qilib ishlatishga imkon beradi."
    },
    {
      id: 4,
      question: "React-da Container/Presenter pattern-ini nima siqib chiqardi?",
      options: [
        "Redux Toolkit",
        "Custom Hooks arxitekturasi",
        "CSS Grid",
        "TypeScript sinflari"
      ],
      correctAnswer: 1,
      explanation: "Custom Hook-lar yordamida logika va UI-ni ajratish ancha osonlashdi, natijada eski Container/Presenter andozasiga ehtiyoj qolmadi."
    },
    {
      id: 5,
      question: "Nega useEffect ichida to'g'ridan-to'g'ri fetch chaqirish production-da tavsiya etilmaydi?",
      options: [
        "Chunki u JS-ni o'chirib qo'yadi",
        "Ushbu kodni boshqa komponentlarda qayta ishlatib bo'lmaydi va test yozish juda qiyinlashadi",
        "Hech qanday farqi yo'q",
        "Faqat CSS-ga zarar beradi"
      ],
      correctAnswer: 1,
      explanation: "Direct fetch kod takrorlanishiga olib keladi. Uni custom hook yoki service layer-ga ko'chirish kerak."
    },
    {
      id: 6,
      question: "Scalable arxitekturadagi 'Barrel export' (index.js) ning zarari nima bo'lishi mumkin?",
      options: [
        "Saytni o'chirib qo'yishi",
        "Circular dependencies (aylanma import) va keraksiz kodlarning yuklanishi (Tree shaking cheklovi)",
        "Hech qanday zarari yo'q",
        "Sana va vaqtni buzishi"
      ],
      correctAnswer: 1,
      explanation: "Agar barrel fayl ichidagi barcha komponentlar bir vaqtda yuklansa, bu tree shaking-ni buzib bundle hajmini oshirishi mumkin."
    },
    {
      id: 7,
      question: "Production arxitekturasida 'Service Layer' modelining eng muhim vazifasi nima?",
      options: [
        "Dizayn stillarini boshqarish",
        "Tarmoq so'rovlarini (Axios/fetch kabi) komponentlar va hooklardan to'liq ajratib, markaziy joyga yig'ish",
        "Database migratsiyalarini qilish",
        "JSX yozish"
      ],
      correctAnswer: 1,
      explanation: "Service Layer barcha API so'rovlarni alohida modullarda saqlashga imkon beradi, bu esa loyihani toza va oson testlanadigan qiladi."
    },
    {
      id: 8,
      question: "React-da logikani komponentga eng yaqin joyda saqlash (Co-location) nimani anglatadi?",
      options: [
        "Hamma kodni App.js faylida saqlash",
        "State va biznes logikani aynan o'sha ma'lumotdan foydalanadigan komponentga imkon qadar yaqin joyda joylashtirish",
        "Kodlarni har xil serverlarga yozish",
        "Bitta faylda faqat CSS saqlash"
      ],
      correctAnswer: 1,
      explanation: "Co-location keraksiz props-drilling va global statelar yuzaga kelishini oldini oladi, kodni oson o'qiladigan qiladi."
    },
    {
      id: 9,
      question: "Custom Hook-lar yozilishi React ilovasini testlashni qanday osonlashtiradi?",
      options: [
        "Ular testlarni tezlashtiradi",
        "Hech qanday UI komponentni chizmasdan (render qilmasdan), biznes logikani alohida (isolation) testlash imkonini beradi",
        "Linter xatolarini o'chiradi",
        "Database-ni test qiladi"
      ],
      correctAnswer: 1,
      explanation: "Custom hook faqat funksiya bo'lgani sababli, `@testing-library/react-hooks` orqali uning holatlari UI-siz sinovdan o'tkaziladi."
    },
    {
      id: 10,
      question: "Feature-based papkalar tuzilishidagi `index.js` (barrel) ning vazifasi nima?",
      options: [
        "Node serverini ishga tushirish",
        "Feature modulining 'Public API' si vazifasini bajarib, tashqariga faqat ruxsat etilgan komponent va hooklarni eksport qilish",
        "CSS-ni sozlash",
        "Kodni tozalash"
      ],
      correctAnswer: 1,
      explanation: "Index.js feature modulining tashqi dunyo bilan bog'lanadigan yagona eshigi (interface) bo'limi bo'lib xizmat qiladi."
    },
    {
      id: 11,
      question: "React-da DRY (Don't Repeat Yourself) prinsipining ma'nosi nima?",
      options: [
        "Kodni kommentlarsiz yozish",
        "Takrorlanuvchi UI qismlari, biznes logikalari yoki API chaqiruvlarini alohida komponent, hook va helper funksiyalarga chiqarish",
        "Har soatda build qilish",
        "Fayllarni quruq saqlash"
      ],
      correctAnswer: 1,
      explanation: "Takrorlanuvchi logikani bitta umumiy funksiya yoki hook ichiga yozib, hamma joyda o'shani import qilib ishlatish DRY hisoblanadi."
    },
    {
      id: 12,
      question: "Ma'lumot olish uchun custom hook ishlatish qanday qilib 'Separation of Concerns' ga mos keladi?",
      options: [
        "Kodni tezroq compile qiladi",
        "Komponentning JSX qismini toza saqlab, loading, error va fetch holatlarini to'liq komponentdan yashiradi",
        "Bazaga to'g'ridan-to'g'ri bog'laydi",
        "Faqat CSS-ga stil beradi"
      ],
      correctAnswer: 1,
      explanation: "UI komponent faqat ma'lumotni render qilish bilan shug'ullanadi, hook esa orqa fondagi so'rovlar logikasiga javob beradi."
    }
  ]
};
