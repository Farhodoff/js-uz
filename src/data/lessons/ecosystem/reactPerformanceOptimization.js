export const reactPerformanceOptimization = {
  id: "reactPerformanceOptimization",
  title: "Performance Optimization Texnikalari",
  language: "react",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### React-da Performance Optimization nima?
React judayam tez ishlaydigan kutubxona bo'lsa-da, loyiha kattalashib borgan sari interfeys qotib qolishi yoki keraksiz re-renderlar ko'payishi mumkin. **React Performance Optimization (Ishlash samaradorligini optimallashtirish)** — bu keraksiz qayta chizishlarni va og'ir matematik hisob-kitoblarni oldini olish orqali ilova tezligini saqlash usulidir.

### Real hayotiy analogiya
Tasavvur qiling, siz maktabda matematika darsidasiz:
* **useMemo yo'q bo'lsa (Keshlanmagan):** O'qituvchi har safar sizdan "135 x 24 necha bo'ladi?" deb so'raganda, siz har safar varoq va qalam olib qaytadan hisoblaysiz. Bu vaqt va kuchingizni ketkazadi.
* **useMemo bor bo'lsa (Keshga saqlangan):** Siz birinchi marta "135 x 24 = 3240" deb hisoblab, daftaringiz burchagiga yozib qo'yasiz. Keyingi safar so'rashganda, darhol "3240" deb javob berasiz.
* **React.memo (Eshikbon):** Kelgan mehmonning props-lari (sovig'alari) o'zgarmagan bo'lsa, uni eshikdan qaytaradi (komponentni qayta render qilmaydi).
* **useCallback (Sertifikat):** Har safar bir xil ishni qiladigan xodimga yangi shartnoma tuzmasdan, eski shartnomani xotirada saqlab, qayta-qayta ishlatishdir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (React.memo va useCallback)
Ota komponentdan bolaga funksiya uzatish va bolaning keraksiz render bo'lishini cheklash:
\`\`\`javascript
import React, { useState, useCallback } from 'react';

// Bolakay komponent - faqat props o'zgarganda render bo'ladi
const ChildButton = React.memo(({ onClick, label }) => {
  console.log(\`\${label} tugmasi render bo'ldi!\`);
  return <button onClick={onClick}>\${label}</button>;
});

export function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Har renderda yangi funksiya yaratilishini oldini olamiz
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // dependency bo'sh, faqat 1 marta yaratiladi

  return (
    <div>
      <h3>Sanoq: \${count}</h3>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Yozing..." 
      />
      {/* ChildButton faqat increment havolasi o'zgarsa render bo'ladi.
          useCallback tufayli increment o'zgarmaydi, shuning uchun inputga
          yozganda ChildButton qayta render bo'lmaydi. */}
      <ChildButton onClick={increment} label="Ko'paytirish" />
    </div>
  );
}
\`\`\`

### 2. Intermediate Example (useMemo yordamida og'ir hisob-kitoblarni optimallashtirish)
Katta hajmdagi massivlarni saralash va qidirish:
\`\`\`javascript
import React, { useState, useMemo } from 'react';

export function SearchList({ items }) {
  const [query, setQuery] = useState("");

  // Faqat items yoki query o'zgargandagina massiv filtrlanadi
  const filteredItems = useMemo(() => {
    console.log("Massiv filtrlanmoqda... (Og'ir amal)");
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]); // faqat shu 2 ta dependency o'zgarganda ishlaydi

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Qidirish..." 
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>\${item.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### 3. Advanced Example (React.lazy va Suspense yordamida Code Splitting)
Og'ir komponentlar yoki butun boshli sahifalarni faqat kerak bo'lganda yuklash:
\`\`\`javascript
import React, { useState, Suspense } from 'react';

// Og'ir komponentni lazy load qilamiz
const HeavyChart = React.lazy(() => import('./HeavyChart'));

export function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h2>Dashboard sahifasi</h2>
      <button onClick={() => setShowChart(true)}>Grafikni ko'rsatish</button>
      
      {showChart && (
        <Suspense fallback={<div>Grafik yuklanmoqda...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Keraksiz Renderlar (Unnecessary Re-renders):** React-da ota komponent render bo'lsa, uning ostidagi barcha komponentlar ham re-render bo'ladi. Bu katta sahifalarda sezilarli sekinlashuvga olib keladi.
* **Og'ir Hisob-kitoblarning Qayta Bajarilishi:** Katta ma'lumotlarni saralash, murakkab matematik formulalar har bir oddiy foydalanuvchi harakatida (masalan, inputga yozganda) qaytadan hisoblanishi CPU yuklamasini oshiradi.
* **Yirik JS Bundle hajmi:** Sayt ochilganida barcha sahifalar va komponentlar kodini birdan yuklab olish saytning birinchi yuklanish vaqtini (LCP) sekinlashtiradi. \`React.lazy\` va Code Splitting buni hal qiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Hamma narsani \`useMemo\` va \`useCallback\` bilan o'rab chiqish
#### Xato:
\`\`\`javascript
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
\`\`\`
#### Nega noto'g'ri?
Oddiy va kichik funksiyalar yoki primitiv qiymatlarga \`useCallback\`/\`useMemo\` ishlatish ularni solishtirish va keshga saqlash jarayonidan ko'ra arzonroqdir. Ularning o'zi ham qo'shimcha resurs (overhead) talab qiladi.

### 2. Dependency massivini bo'sh qoldirib, stale closure yaratish
#### Xato:
\`\`\`javascript
const logCount = useCallback(() => {
  console.log("Count:", count);
}, []); // count o'zgarganda funksiya yangilanmaydi va har doim 0 ni chiqaradi
\`\`\`
#### To'g'ri yechim:
\`\`\`javascript
const logCount = useCallback(() => {
  console.log("Count:", count);
}, [count]);
\`\`\`

### 3. Taqqoslash funksiyasi bo'lmagan obyektlarni props qilib yuborish
#### Xato:
\`\`\`javascript
// Ota komponent ichida:
return <ChildComponent options={{ theme: 'dark' }} />;
// Har renderda yangi options obyekti (yangi reference) yaratiladi,
// natijada ChildComponent React.memo qilingan bo'lsa ham foydasiz bo'lib qoladi.
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`React.memo\` nima va u qachon ishlatiladi?
   * **Javob:** \`React.memo\` — bu Oliy Darajali Komponent (HOC) bo'lib, u props-larni yuzaki (shallow) solishtiradi. Props o'zgarmasa, komponent qayta render bo'lishidan saqlaydi.
2. **Savol:** \`useMemo\` ning asosiy vazifasi nima?
   * **Javob:** \`useMemo\` og'ir hisob-kitoblar natijasini (qiymatini) renderlararo keshlab saqlash uchun ishlatiladi.
3. **Savol:** \`useCallback\` nima uchun kerak?
   * **Javob:** U funksiyaning xotiradagi havolasini (reference) saqlaydi. Har renderda yangi funksiya yaratilishini oldini oladi.
4. **Savol:** Referential Identity (Havola aynanligi) nima degani?
   * **Javob:** JavaScript-da obyektlar va funksiyalar xotiradagi manzili bo'yicha solishtiriladi. Ikki bir xil obyekt \`{} === {}\` false qaytaradi, chunki ularning havolalari boshqadir.

### Middle (5–8)
5. **Savol:** \`useMemo\` va \`useCallback\` o'rtasidagi asosiy farq nimada?
   * **Javob:** \`useMemo\` funksiya qaytargan **qiymatni** keshlaydi, \`useCallback\` esa funksiyaning **o'zini (havolasini)** keshlaydi.
6. **Savol:** \`React.lazy\` va \`Suspense\` qanday ishlaydi?
   * **Javob:** \`React.lazy\` komponentni dinamik import qilish imkonini beradi. \`Suspense\` esa u yuklangunga qadar vaqtinchalik visual interfeys (fallback) ko'rsatib turadi.
7. **Savol:** React.memo ichidagi custom taqqoslash funksiyasini qanday yozamiz?
   * **Javob:** Ikkinchi argument sifatida custom function beriladi: \`React.memo(Component, (prevProps, nextProps) => boolean)\`. Agar true qaytsa render bo'lmaydi.
8. **Savol:** Nega obyektlar props sifatida uzatilganda \`React.memo\` ishlamay qoladi?
   * **Javob:** Chunki ota komponent har render bo'lganda yangi obyekt yaratiladi va yuzaki solishtirishda yangi havola (\`prevProps.obj !== nextProps.obj\`) tufayli re-render sodir bo'laveradi.

### Senior (9–12)
9. **Savol:** React-da "Stale Closure" muammosi nima va uni qanday hal qilish mumkin?
   * **Javob:** Keshlab qo'yilgan callback funksiya ichida ishlatilgan o'zgaruvchining qiymati dependency massivga yozilmay qolganda, funksiya eski qiymat bilan qolib ketishi. Yechimi: dependencyni to'g'ri ko'rsatish yoki state updater funksiyalardan \`(prev => prev + 1)\` foydalanish.
10. **Savol:** Profiler va Chrome DevTools orqali React-dagi keraksiz renderlarni qanday aniqlaysiz?
    * **Javob:** React DevTools Profiler orqali render davomiyligini yozib olamiz. "Highlight updates when components render" sozlamasi orqali qayta render bo'layotgan komponentlarni vizual ko'ramiz.
11. **Savol:** React 18 dagi \`useTransition\` hooki qanday muammoni hal qiladi?
    * **Javob:** U og'ir re-renderlarni "past ustuvorlikdagi" (non-urgent transition) deb belgilaydi. Bu orqali foydalanuvchining inputga yozishi kabi tezkor amallari bloklanib qolmaydi.
12. **Savol:** \`useEvent\` (yoki transition APIs) useCallback hookidan qanday ustunlikka ega?
    * **Javob:** U doimo eng yangi state va props-larni ko'ra oladi, lekin uning xotiradagi havolasi hech qachon o'zgarmaydi va dependency massivi talab qilmaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

### Memoization va Havolalar Bog'liqligi
Quyidagi diagrammada React-da dependency o'zgarishiga qarab keshdagi havolani qaytarish yoki yangisini yaratish jarayoni tasvirlangan:

\`\`\`mermaid
graph TD
    A[Komponent Render Bo'lishi] --> B{Dependency massivi o'zgardimi?}
    B -- Yo'q (Teng) --> C[Keshdagi vaqtinchalik Havolani qaytarish]
    B -- Ha (Farqli) --> D[Yangi Havola / Qiymat yaratish]
    D --> E[Yangi qiymatni keshga saqlash]
    E --> F[Yangi Havolani qaytarish]
    C --> G[Render tugallandi]
    F --> G
\`\`\`

Mashqlar quyida taqdim etilgan. Ularni bajarib ko'nikmalaringizni oshiring.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Katta hajmdagi jadvalni (Table Grid) optimallashtirish
Tasavvur qiling, sizda 1000 ta qatordan iborat mahsulotlar jadvali bor. Har bir qatorda "Savatga qo'shish" tugmasi mavjud. Tugma bosilganda ota komponentdagi \`cart\` state-i yangilanadi va butun 1000 ta qator qaytadan render bo'ladi. Bu foydalanuvchiga sezilarli darajada kechikish beradi.

#### Muammoning yechimi (React.memo va useCallback):
1. **Har bir qatorni \`React.memo\` bilan o'rash:** Faqat o'sha mahsulotning props o'zgarsagina qayta chiziladi.
2. **"Savatga qo'shish" funksiyasini \`useCallback\` bilan o'rash:** Har renderda yangi funksiya yaratilib, bolalarning re-render bo'lishiga sabab bo'lmaydi.
3. **State updater funksiyasi:** \`useCallback\` dependency massivini bo'sh saqlash XML/HTML o'xshash state-ni yangilashda callback sintaksisidan foydalanamiz.

\`\`\`javascript
// Yechim namunasi:
const TableRow = React.memo(({ item, onAddToCart }) => {
  console.log(\`Row render: \${item.name}\`);
  return (
    <tr>
      <td>\${item.name}</td>
      <td>\${item.price} \\$</td>
      <td>
        <button onClick={() => onAddToCart(item.id)}>Savatga</button>
      </td>
    </tr>
  );
});

export function ProductTable({ items }) {
  const [cart, setCart] = useState([]);

  // callback har doim bir xil havolaga ega bo'ladi
  const handleAddToCart = useCallback((id) => {
    setCart((prevCart) => [...prevCart, id]);
  }, []);

  return (
    <table>
      <tbody>
        {items.map(item => (
          <TableRow 
            key={item.id} 
            item={item} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </tbody>
    </table>
  );
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Virtualizatsiya (Windowing):** Agar jadvalda o'n minglab qator bo'lsa, hatto \`React.memo\` ham yetarli bo'lmaydi. Buning uchun \`react-window\` yoki \`react-virtualized\` yordamida faqat ekranga ko'rinib turgan qatorlarnigina render qilish kerak.
* **Inline funksiyalar va obyektlardan qochish:** JSX ichida to'g'ridan-to'g'ri <Component style={{color: 'red'}} onClick={() => {}} /> yozish har doim yangi referencelar yaratadi. Ularni tashqariga yoki \`useMemo\`/\`useCallback\`ga o'tkazing.

---

## 10. 📌 Cheat Sheet

| Asbob | Qachon ishlatiladi | Yuzaki tekshiruv (Shallow) |
| :--- | :--- | :--- |
| **React.memo** | Props o'zgarmaganda butun komponent re-renderini to'xtatish uchun | Ha (prevProps vs nextProps) |
| **useMemo** | Og'ir hisob-kitoblar va obyekt referencelarini saqlash uchun | Ha (dependency massivi) |
| **useCallback** | Funksiyalar havolasini (reference) saqlash uchun | Ha (dependency massivi) |
| **React.lazy** | Kodni bo'lish (Code Splitting) va tezkor yuklash uchun | N/A |`,
  exercises: [
    {
      id: 1,
      title: "Sodda useMemo simulyatsiyasi",
      instruction: "Qiymat va dependencylar berilganda, agar dependency o'zgarmasa keshdagi qiymatni qaytaradigan `memoizeValue(fn, deps, lastDeps, lastValue)` funksiyasini yozing. (massiv deps tengligini solishtiring).",
      startingCode: "function memoizeValue(fn, deps, lastDeps, lastValue) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Agar teng bo'lsa eski qiymatni, bo'lmasa fn() ni chaqirib yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastValue;\nreturn fn();",
      test: "if (typeof memoizeValue !== 'function') return 'memoizeValue topilmadi'; const fn = () => 10; if(memoizeValue(fn, [1], [1], 5) !== 5) return 'Dependency o\\'zgarmaganda kesh xato'; if(memoizeValue(fn, [2], [1], 5) !== 10) return 'Dependency o\\'zgarganda fn() chaqirilmadi'; return null;"
    },
    {
      id: 2,
      title: "Sodda useCallback simulyatsiyasi",
      instruction: "Berilgan funksiya havolasini dependencylar o'zgarmasa keshlab saqlaydigan `memoizeCallback(fn, deps, lastDeps, lastFn)` funksiyasini yozing.",
      startingCode: "function memoizeCallback(fn, deps, lastDeps, lastFn) {\n  const depsEqual = lastDeps && deps.every((d, i) => d === lastDeps[i]);\n  // Teng bo'lsa eski funksiyani, bo'lmasa yangisini qaytaring\n}",
      hint: "if (depsEqual) return lastFn;\nreturn fn;",
      test: "if (typeof memoizeCallback !== 'function') return 'memoizeCallback topilmadi'; const f = () => {}; if (memoizeCallback(f, [1], [1], f) !== f) return 'Callback keshlanmadi'; return null;"
    },
    {
      id: 3,
      title: "Bundle Limit Checker",
      instruction: "Sahifa to'liq hidratatsiya bo'lishidan oldin yuklanadigan bundle hajmini tekshiruvchi `checkBundleSize(sizeKB, limitKB)` funksiyasini yozing (agar limitdan oshsa true, bo'lmasa false).",
      startingCode: "function checkBundleSize(sizeKB, limitKB) {\n  // Limit tekshirish\n}",
      hint: "return sizeKB > limitKB;",
      test: "if (typeof checkBundleSize !== 'function') return 'checkBundleSize topilmadi'; if(checkBundleSize(600, 500) !== true || checkBundleSize(400, 500) !== false) return 'Limit tekshirish xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`React.memo` qachon ishlatiladi?",
      options: [
        "API-dan keladigan ma'lumotlarni keshga saqlashda",
        "Props-lar o'zgarmasa, komponent re-renderini to'xtatishda",
        "HTML button tugmasini yaratishda",
        "Faqat CSS animasiyalarini tezlashtirishda"
      ],
      correctAnswer: 1,
      explanation: "React.memo yordamida props shallow solishtirilib, o'zgarish bo'lmasagina komponent qayta chizilishi to'xtatiladi."
    },
    {
      id: 2,
      question: "`useCallback` ning asosiy maqsadi nima?",
      options: [
        "Funksiya havolasini (reference) renderlararo keshlab qolish",
        "Hisoblangan qiymatni keshlash",
        "Faqat server so'rovlarini boshqarish",
        "Input qiymatlarini tozalash"
      ],
      correctAnswer: 0,
      explanation: "useCallback har renderda yangi funksiya yaratilishini (xotirada yangi manzil hosil bo'lishini) cheklaydi."
    },
    {
      id: 3,
      question: "Nega keraksiz joyda `useMemo` ishlatish tavsiya etilmaydi?",
      options: [
        "Chunki u JS xatoligiga sabab bo'ladi",
        "Faqat rasmlarga ta'sir qiladi",
        "Chunki dependencylarni solishtirish va keshga yozish ham qo'shimcha resurs (overhead) talab qiladi",
        "Chunki u butun state-ni o'chirib yuboradi"
      ],
      correctAnswer: 2,
      explanation: "useMemo-da dependencylarni solishtirish va qiymatni xotirada ushlab turish ham bepul emas. Oddiy hisob-kitoblar uchun u keraksiz overhead yaratadi."
    },
    {
      id: 4,
      question: "React-da 'Lazy loading' nima?",
      options: [
        "Saytni sekin ishlaydigan qilish",
        "Komponent yoki sahifani faqat foydalanuvchiga kerak bo'lganda (user ochganda) yuklash",
        "CSS-ni brauzerdan o'chirish",
        "Ma'lumotlarni kechiktirib serverga jo'natish"
      ],
      correctAnswer: 1,
      explanation: "React.lazy yordamida sahifalar dynamic import qilinadi va birinchi sahifa ochilganda boshqa keraksiz sahifalar yuklanmaydi, bundle hajmi kichrayadi."
    },
    {
      id: 5,
      question: "Suspense komponentidagi 'fallback' prop nima vazifa bajaradi?",
      options: [
        "Lazy komponent yuklangunga qadar ekranga chiqariladigan loading (spinner, shablon) interfeysi",
        "Saytdagi xatolarni ko'rsatadi",
        "Hech narsa ko'rsatmaydi",
        "Server o'chganligini bildiradi"
      ],
      correctAnswer: 0,
      explanation: "Fallback - asinxron dynamic import yuklanayotgan vaqtda foydalanuvchiga vaqtinchalik visual interfeys taqdim etadi."
    },
    {
      id: 6,
      question: "Stale Closure muammosi qachon yuz beradi?",
      options: [
        "State mutable bo'lganda",
        "CSS kodi eskirib qolganda",
        "API error 404 qaytarganda",
        "Keshlab qo'yilgan callback funksiya ichida ishlatilgan o'zgaruvchi dependency massivga yozilmay qolib ketganda"
      ],
      correctAnswer: 3,
      explanation: "Callback-da dependency yozilmasa, u o'zgaruvchining eski holatdagi (stale) holatini keshlab qotirib qo'yadi."
    },
    {
      id: 7,
      question: "`React.memo` default holatda props-larni qanday solishtiradi?",
      options: [
        "Yuzaki (shallow comparison) solishtiradi",
        "Chuqur (deep comparison) solishtiradi",
        "Solishtirmaydi",
        "Faqat string formatga tekshiradi"
      ],
      correctAnswer: 0,
      explanation: "React.memo default holatda props obyektlarining birinchi darajali kalitlarini yuzaki (`Object.is` orqali) tekshiradi."
    },
    {
      id: 8,
      question: "`useMemo` va `useCallback` hooklarining farqi nimada?",
      options: [
        "useMemo klasslarda, useCallback funksiyalarda ishlaydi",
        "useMemo hisoblangan qiymatni (value), useCallback esa funksiya havolasini (reference) keshlaydi",
        "Ikkalasi mutlaqo bir xil narsadir",
        "Faqat useCallback serverda ishlay oladi"
      ],
      correctAnswer: 1,
      explanation: "useMemo qiymatni keshlab saqlaydi. useCallback esa qayta yaratilishini oldini olish uchun funksiyani o'zini keshlaydi."
    },
    {
      id: 9,
      question: "`useCallback` hookini ishlatish qachon haqiqiy foyda keltiradi?",
      options: [
        "Hamma yaratilgan funksiyalarga yozganda",
        "Faqat CSS stillarini o'zgartirganda",
        "Funksiyani props orqali `React.memo` bilan optimallashtirilgan bola komponentga yuborganda",
        "Hech qachon foyda keltirmaydi"
      ],
      correctAnswer: 2,
      explanation: "useCallback-ning maqsadi funksiya reference-ini saqlashdir, bu esa React.memo bolaning keraksiz render bo'lishidan saqlaydi."
    },
    {
      id: 10,
      question: "React-dagi 'dynamic import()' nima?",
      options: [
        "Kodni asinxron va faqat kerak bo'lganda yuklash (Code Splitting asoschisi)",
        "Require yordamida yuklash",
        "Faqat rasmlarni yuklash",
        "API-ga tezkor so'rov yuborish"
      ],
      correctAnswer: 0,
      explanation: "Dynamic import `import('./file')` orqali JS faylni alohida chunk qilib yig'adi va foydalanuvchi faqat kerak bo'lganda yuklab oladi."
    },
    {
      id: 11,
      question: "Code splitting (kodni bo'lish) ning eng asosiy performance foydasi nima?",
      options: [
        "Serverni tezroq yuklaydi",
        "Database so'rovlarini birlashtiradi",
        "Xavfsizlikni kuchaytiradi",
        "Brauzer birinchi yuklab oladigan JS bundle hajmini kamaytiradi (sayt tez ochiladi)"
      ],
      correctAnswer: 3,
      explanation: "Code splitting barcha sahifalarni bitta JS faylga tiqmasdan, bo'laklab yuborgani uchun sayt tez yuklanadi."
    },
    {
      id: 12,
      question: "Agar komponent `React.memo` qilingan bo'lsa-yu, unga har renderda parent ichida yangi obyekt props qilib uzatilsa nima bo'ladi?",
      options: [
        "React xato berib to'xtaydi",
        "Obyekt reference-i o'zgargani uchun, React.memo baribir komponentni qayta render qiladi",
        "Render bo'lmaydi",
        "State o'chib ketadi"
      ],
      correctAnswer: 1,
      explanation: "React.memo yuzaki tekshiradi. Obyekt har safar yangi manzilga ega bo'lgani uchun, u o'zgardi deb hisoblanadi va render bo'laveradi."
    }
  ]
};
