export const reactInterviewQuestions = {
  title: "Top 20+ React Intervyu Savollari va Javoblar",
  content: `
# 🎤 React Intervyu Savollari

Ushbu bo'limda O'zbekiston va xalqaro IT kompaniyalarida React dasturchisi lavozimiga topshiriladigan suhbatlarda (intervyu) eng ko'p so'raladigan savollar va ularga batafsil javoblar jamlangan.
Savollar qiyinlik darajasiga ko'ra **Junior**, **Middle** va **Senior** toifalarga bo'lingan.

---

## 🌱 Junior (Boshlang'ich) daraja

### 1. React nima va u qanday muammoni hal qiladi?
* **Javob:** React — bu Facebook (Meta) tomonidan yaratilgan ochiq kodli JavaScript kutubxonasi. U foydalanuvchi interfeyslarini (UI) yaratish uchun ishlatiladi. React'ning eng asosiy maqsadi: UI ni qayta ishlatiladigan kichik komponentlarga bo'lish, state o'zgarganda DOM ni juda tez va samarali yangilash (Virtual DOM orqali) va kodni deklarativ usulda yozish imkonini berishdir.

### 2. Virtual DOM nima va u qanday ishlaydi?
* **Javob:** Virtual DOM — bu haqiqiy DOM'ning xotiradagi (memory) yengil JavaScript obyekti ko'rinishidagi nusxasi. 
  Qachonki komponentda state o'zgarsa, React butunlay yangi Virtual DOM yaratadi. So'ngra uni avvalgi Virtual DOM bilan **Diffing** (solishtirish) algoritmi orqali taqqoslaydi. O'zgarishlar farqi topilgach, React faqatgina o'zgargan elementlarni haqiqiy DOM ga o'tkazadi (Commit phase). Bu jarayon qimmat bo'lgan haqiqiy DOM operatsiyalarini minimal darajaga tushiradi.

### 3. State va Props o'rtasidagi farq nimada?
* **Javob:** 
  - **Props (Properties):** Tashqaridan (ota komponentdan) bola komponentga beriladigan ma'lumotlar. Props **Read-only** (faqat o'qish uchun) hisoblanadi, bola komponent o'ziga kelgan propsni o'zgartira olmaydi.
  - **State:** Komponentning o'ziga tegishli bo'lgan, uning ichida boshqariladigan va vaqt o'tishi bilan o'zgarishi mumkin bo'lgan ichki ma'lumot (xotira). State o'zgarganda komponent qayta render bo'ladi.

### 4. Nega useState ishlatamiz, oddiy o'zgaruvchi emas (\`let count = 0\`)?
* **Javob:** Agar oddiy o'zgaruvchining qiymatini o'zgartirsangiz (masalan, \`count++\`), React bundan xabar topmaydi va interfeysni (UI) yangilamaydi. \`useState\` ishlatilganda esa, uning setter funksiyasi (\`setCount\`) React'ga komponentni qayta chizish (re-render) kerakligi haqida "signal" yuboradi.

### 5. JSX nima? Brauzer uni to'g'ridan-to'g'ri tushunadimi?
* **Javob:** JSX (JavaScript XML) — bu JavaScript ichida HTML ga o'xshash sintaksis yozish imkonini beruvchi kengaytma. 
  Brauzer JSX ni to'g'ridan-to'g'ri **tushunmaydi**. JSX kodi ishlashi uchun avval u \`Babel\` kabi transpaylerlar yordamida standart JavaScript obyektlariga (\`React.createElement\`) o'girilishi kerak.

### 6. React'da ro'yxatlarda (Lists) nega \`key\` prop kerak?
* **Javob:** \`key\` elementi React'ga Virtual DOM solishtirish jarayonida (reconciliation) qaysi element qo'shilganini, o'chirilganini yoki o'zgarganini aniq topib olishga yordam beradi. \`key\` sifatida ro'yxat indeksini (\`index\`) ishlatish tavsiya etilmaydi, chunki ro'yxat tartibi o'zgarsa (masalan, boshiga element qo'shilsa), indekslar o'zgarib ketadi va keraksiz re-render yoki kutilmagan buglarni keltirib chiqarishi mumkin. Har doim unikal ID ishlatish kerak.

### 7. Fragment (\`<></>\` yoki \`<React.Fragment>\`) nima uchun kerak?
* **Javob:** React'da har bir komponent faqat bitta ota (wrapper) elementni qaytarishi shart. Agar qo'shimcha \`<div>\` o'ramini yaratmasdan bir nechta elementni qaytarmoqchi bo'lsak, Fragment'dan foydalanamiz. Bu keraksiz HTML teglari bilan DOM ni to'ldirib yuborishning oldini oladi.

---

## 🚀 Middle (O'rta) daraja

### 8. \`useEffect\` dagi Dependency Array (bog'liqliklar massivi) qanday ishlaydi?
* **Javob:** Dependency array (\`[]\`) \`useEffect\` qachon qayta ishga tushishini nazorat qiladi.
  - Agar **berilmasa**: useEffect har safar komponent re-render bo'lganda ishlaydi.
  - Agar **bo'sh array (\`[]\`) berilsa**: useEffect faqat bir marta (komponent mount bo'lganda) ishlaydi.
  - Agar **array ichida state/prop bo'lsa (\`[count]\`)**: useEffect dastlabki mount'da va qachonki shu qiymat o'zgarsa qayta ishlaydi.
  - *Qo'shimcha:* \`useEffect\` ichidan return qilingan funksiya Cleanup (tozalash) funksiyasi deyiladi va u komponent o'chirilayotganda (unmount) yoki dependency o'zgarib keyingi effect ishlashidan oldin bajariladi.

### 9. Controlled va Uncontrolled komponentlar farqi nimada?
* **Javob:** Form elementlari (input, select, textarea) haqida gap ketganda:
  - **Controlled:** Input'ning qiymati to'liq React \`state\` orqali boshqariladi. \`<input value={state} onChange={...} />\`
  - **Uncontrolled:** Input'ning qiymatini React emas, balki an'anaviy DOM o'zi boshqaradi. Qiymatni olish uchun \`useRef\` hooki orqali to'g'ridan-to'g'ri DOM ga murojaat qilinadi.

### 10. \`useMemo\` va \`useCallback\` ning qanday farqi bor va qachon ishlatiladi?
* **Javob:** Ikkalasi ham optimizatsiya (memoization) uchun xizmat qiladi:
  - **\`useMemo\`**: Og'ir hisob-kitoblar natijasini (qiymatni) eslab qolish uchun ishlatiladi. Faqat dependencylar o'zgargandagina hisob-kitob qaytadan amalga oshiriladi.
  - **\`useCallback\`**: Funksiyani eslab qolish uchun ishlatiladi. React har re-renderda yangi funksiya obyektini yaratadi. Agar bola komponentlarga \`React.memo\` o'rnatilgan bo'lsa va ularga funksiya uzatsak, yangi funksiya obyekti bola komponentni bekorga re-render qilishi mumkin. Buni oldini olish uchun \`useCallback\` kerak.

### 11. React'da re-renderni qanday qilib kamaytirish (optimizatsiya) mumkin?
* **Javob:** 
  1. Bola komponentni keraksiz ota re-renderidan himoyalash uchun \`React.memo\` ishlatish.
  2. Og'ir ma'lumotlarni va callback'larni \`useMemo\` va \`useCallback\` orqali keshda saqlash.
  3. State'ni imkon qadar pastga tushirish (Push state down) - ya'ni state qayerda kerak bo'lsa, o'sha eng quyi komponentda e'lon qilish.
  4. Ko'p o'zgaruvchi ma'lumotlar uchun Context API o'rniga Zustand yoki Redux kabi alohida render-optimallashtirilgan menejerlardan foydalanish.

### 12. Context API nima va u qachon ishlashi sekinlashishi mumkin?
* **Javob:** Context API props-drilling (propslarni zanjirdek bir-biriga uzatish) muammosini hal qiladi va global holatni saqlash imkonini beradi. 
  Ammo, agar Context dagi state birorta obyekt bo'lsa va uning kichik bir qismi o'zgarsa ham, **shu Context'ni o'qiyotgan barcha komponentlar** qayta render bo'lib ketadi. Bu katta ilovalarda jiddiy ishlash (performance) muammolarini keltirib chiqaradi. Shuning uchun lokal yoki sodda global ma'lumotlar uchungina Context API yaxshi tanlovdir.

### 13. \`useRef\` hooki nima uchun kerak?
* **Javob:** Ikkita asosiy maqsadi bor:
  1. **DOM elementlariga to'g'ridan-to'g'ri murojaat qilish** (masalan: inputga avtomatik fokus qaratish).
  2. **Renderga ta'sir qilmaydigan qiymatlarni saqlash.** Agar \`useRef\` dagi \`.current\` qiymatini o'zgartirsangiz, komponent **qayta render bo'lmaydi** (masalan, taymerlar ID sini saqlash uchun juda qulay).

---

## 🏆 Senior (Katta) daraja

### 14. React Fiber nima va uning ishlash prinsipi qanday?
* **Javob:** React 16 versiyasidan boshlab joriy etilgan yangi rendering yadrosi (engine). 
  Uning asosiy yutug'i **Interruptible Rendering** (uziluvchan rendering). React oldinlari renderingni boshlasa, toki bitirmaguncha to'xtamas edi (bu brauzerni qotirib qo'yishi mumkin edi). Fiber orqali React oynani yangilash jarayonini kichik "bo'laklarga" bo'ladi. U brauzerga asosiy iplarni bo'shatib, muhimroq vazifalarni (animatsiya yoki foydalanuvchi tugmani bosishi kabi) birinchi navbatda bajarishi va keyin renderingni qolgan joyidan davom ettirishi mumkin.

### 15. Server-Side Rendering (SSR) va Client-Side Rendering (CSR) farqi va React Server Components (RSC) nima?
* **Javob:** 
  - **CSR (React'ning asl holati):** Brauzer bo'm-bo'sh HTML va katta JS faylni yuklab oladi. JS ishga tushgachgina barcha UI ni brauzer o'zida chizadi. (Minuslari: SEO yomon, birinchi yuklanish sekin).
  - **SSR (Next.js kabi):** Server HTML ni tayyorlab brauzerga yuboradi. Brauzer tayyor HTML ni darhol ko'radi, so'ngra unga JS ulanib "tiriltiradi" (Hydration). 
  - **RSC (React Server Components):** React 18+ dagi yangi paradigma. Ba'zi komponentlar butunlay serverda ishlaydi va ular mijozga (client) JS bundle sifatida emas, balki tayyor serializatsiya qilingan komponent shaklida keladi. Natijada client ga yuboriladigan JS fayl hajmi keskin kamayadi va xavfsizlik (DB bilan bevosita ishlash) ortadi.

### 16. Hydration (Gidratatsiya) nima va Hydration Error nima uchun yuz beradi?
* **Javob:** SSR yordamida brauzerga tayyor HTML yetib kelgach, u o'lik (statik) bo'ladi. React shu HTML elementlariga event listener'lar va state larni biriktirib chiqish jarayoni **Hydration** deyiladi.
  **Hydration Error** - qachonki serverdan kelgan HTML strukturasi, brauzerdagi dastlabki render natijasidagi Virtual DOM strukturasidan farq qilib qolganda kelib chiqadi (masalan, brauzerdagi vaqtni ko'rsatuvchi komponent serverda boshqa vaqtni, clientda boshqa vaqtni hisoblab qo'ysa).

### 17. \`useLayoutEffect\` va \`useEffect\` farqi nima?
* **Javob:** 
  - **\`useEffect\`**: Asinxron tarzda, ya'ni DOM yangilanib, brauzer ekranni chizib (Paint) bo'lganidan **keyin** ishga tushadi. Bu foydalanuvchiga hech narsani to'sib qo'ymaydi.
  - **\`useLayoutEffect\`**: Sinxron tarzda, React DOM ni yangilaganidan so'ng, lekin brauzer ekranni chizishidan (Paint) **oldin** ishga tushadi. Agar DOM da kattaliklarni (width, height, scrollPosition) o'lchash kerak bo'lsa va o'lchamga qarab stilni o'zgartirmoqchi bo'lsangiz \`useLayoutEffect\` ishlatiladi, aks holda UI miltillab (flicker) qolishi mumkin.

### 18. HOC (Higher-Order Component) va Custom Hook farqi?
* **Javob:** Ikkalasi ham kodni qayta ishlatish (reusability) usullari.
  - **HOC:** Komponentni parametr sifatida qabul qilib, unga qo'shimcha prop'lar yoki funksiyalar qo'shib yangi komponent qaytaruvchi funksiyadir. (Eski usul: masalan Redux'dagi \`connect()\`).
  - **Custom Hook:** React hooklaridan tashkil topgan, odatiy JS funksiyasi (nomi \`use\` dan boshlanadi). U UI (JSX) qaytarmaydi, balki logika (state va funksiyalar) qaytaradi. U HOC larning "wrapper hell" (ichma-ich o'rab tashlash) muammosini hal qildi.

### 19. Concurrent Mode va \`useTransition\` haqida nima bilasiz?
* **Javob:** Concurrent Mode bu React'ga bir vaqtning o'zida bir nechta UI holatlarini tayyorlash imkonini beruvchi xususiyatdir.
  \`useTransition\` hooki yordamida state o'zgarishini "shoshilinch emas" deb belgilash mumkin. Masalan, qidiruv natijalarini filtrlayotganda: foydalanuvchi inputga yozish jarayoni yuqori prioritetga ega bo'ladi (input darhol yangilanadi), filtrlangan qalin ro'yxatni chizish esa \`startTransition\` ichiga o'raladi va fonda, aralashmasdan amalga oshadi, interfeysni qotirmaydi.

### 20. Strict Mode (\`<React.StrictMode>\`) nima va u nega hamma narsani ikki marta chaqiradi?
* **Javob:** Strict Mode — bu koddagi xatolarni, nojo'ya ta'sirlarni (side effects) va eskirgan API larni erta aniqlash uchun ishlatiladigan vosita. 
  Development (ishlab chiqish) muhitida u atayin komponentlarni, \`useEffect\` larni va state updater funksiyalarini **ikki marta (Double Invocation)** chaqiradi. Maqsad — komponentingiz toza (pure) ekanligini va turli renderlarda kutilmagan yon ta'sirlar keltirib chiqarmayotganini tekshirishdir (Production build'da bu narsa ishlamaydi va 1 marta chaqiriladi).
`,
  code: `import React, { useState, useTransition } from "react";

// Concurrent Mode: useTransition ishlatilishiga misol
export default function InterviewDemo() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 1. Shoshilinch yangilanish (Input yozuvi silliq chiqishi uchun)
    setText(e.target.value);

    // 2. Katta hisob-kitob va og'ir render bo'ladigan joy (Fonda chiziladi)
    startTransition(() => {
      const arr = [];
      for (let i = 0; i < 20000; i++) {
        arr.push(e.target.value);
      }
      setList(arr);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>useTransition (React 18) bilan optimizatsiya</h3>
      <input 
        type="text" 
        value={text} 
        onChange={handleChange} 
        placeholder="Yozishni boshlang..."
        style={{ padding: 10, width: 300, fontSize: 16 }}
      />
      {isPending ? (
        <p style={{ color: 'blue' }}>⏳ Yuklanmoqda (Fonda chizilmoqda)...</p>
      ) : (
        <p style={{ color: 'green' }}>✅ Tayyor! ({list.length} ta natija)</p>
      )}
      
      {/* Katta ro'yxatni chizamiz, agar startTransition ishlatilmasa browser input yozayotganda qotib qolardi */}
      <ul style={{ maxHeight: 300, overflow: 'auto', background: '#2c3e50', padding: 10 }}>
        {list.map((item, i) => (
          <li key={i} style={{ color: 'white' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
    {
      question: "useEffect va useLayoutEffect o'rtasidagi asosiy farq nima?",
      options: [
        "Hech qanday farqi yo'q, shunchaki eski va yangi nomlari",
        "useEffect sinxron ishlaydi, useLayoutEffect asinxron",
        "useEffect brauzer ekranni Paint qilib bo'lgandan keyin asinxron ishlaydi, useLayoutEffect esa ekranni chizishdan (Paint) oldin sinxron ishlaydi",
        "useLayoutEffect faqat CSS classlarni o'zgartirish uchun ishlatiladi"
      ],
      correctAnswer: 2,
      explanation: "useLayoutEffect Paint gacha kutadi, shuning uchun agar DOM ning hajmlarini o'lchab birdaniga stil o'zgartirish kerak bo'lsa miltillashning (flickering) oldini oladi."
    },
    {
      question: "Qaysi xususiyat (hook) bizga renderingni 'shoshilinch emas' (non-urgent) deb belgilash va interfeysni bloklamaslik imkonini beradi?",
      options: [
        "useReducer",
        "useTransition",
        "useDeferredValue",
        "B va C javoblar to'g'ri"
      ],
      correctAnswer: 3,
      explanation: "React 18 dagi useTransition (startTransition bilan) va useDeferredValue xususiyatlari og'ir amallarni fonda rejalashtirib, foydalanuvchining input yozishi kabi interaksiyalarini bloklamaydi."
    }
  ]
};
