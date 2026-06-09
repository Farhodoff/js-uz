export const intlApi = {
  id: "intlApi",
  title: "Intl API (Internationalization - Lokalizatsiya)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Intl API nima?
**Intl (Internationalization - Xalqaro integratsiya) API** — bu veb-ilovani turli davlatlar (lokallar) formatiga avtomatik moslashtiruvchi, raqamlar, valyutalar, sanalar va ro'yxatlarni o'sha davlat madaniy qoidalariga mos ravishda formatlovchi o'rnatilgan JavaScript obyektidir.

### Nima uchun kerak?
Turli davlatlarda sanalar va sonlar har xil yoziladi:
* **Sana:** O'zbekistonda \`10.06.2026\` ko'rinishida yozilsa, AQSHda \`06/10/2026\` (oy birinchi), Yaponiyada esa \`2026/06/10\` bo'ladi.
* **Sonlar:** AQSHda mingliklar vergul bilan ajratiladi (\`1,000,000.00\`), Germaniyada nuqta bilan (\`1.000.000,00\`), O'zbekistonda esa bo'shliq bilan (\`1 000 000,00\`).
* **Valyuta:** Narxlarni dynamic tarzda \`$100.00\`, \`100 000,00 UZS\` yoki \`€100\` ko'rinishida to'g'ri chiqarish.

Intl API bu hisob-kitoblarni va formatlashni hech qanday tashqi kutubxonalarsiz (masalan, og'ir \`moment.js\`iz) toza, tezkor brauzer ichida bajaradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **xalqaro aeroport tarjimonisiz**:
* **Kutubxonasiz (Eski yomon usul):** Har bir davlatdan (AQSH, Germaniya, Yaponiya) kelgan sayyoh bilan gaplashish uchun uyingizdan qalin lug'at kitoblarini (og'ir JS kutubxonalari) ko'tarib kelasiz va har safar so'zlarni qidirib vaqt yo'qotasiz.
* **Intl API (Yangi optimal usul):** Sizning miyangizda barcha tillar va ularning madaniy qoidalari (sana yozilishi, pul birligi) oldindan o'rnatilgan. Sayyoh kelishi bilan uning pasportidagi davlat kodini (masalan, \`uz-UZ\` yoki \`en-US\`) ko'rib, u bilan o'sha zahoti o'z tilida, pulini va vaqtini u tushunadigan formatda gapirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sonlarni formatlash - NumberFormat)
Katta sonlarni minglik guruhlarga bo'lib, chiroyli ko'rsatish:
\`\`\`javascript
const number = 1250500.75;

// O'zbekiston formati (bo'shliq va vergul bilan)
const uzFormatter = new Intl.NumberFormat('uz-UZ');
console.log('UZ:', uzFormatter.format(number)); // "1 250 500,75"

// AQSH formati (vergul va nuqta bilan)
const usFormatter = new Intl.NumberFormat('en-US');
console.log('US:', usFormatter.format(number)); // "1,250,500.75"
\`\`\`
* **Natija:** Davlat kodiga mos ravishda sonlar silliq formatlanadi.
* **Qachon ishlatiladi:** Saytda katta raqamlar (aholi soni, yuklashlar soni) ko'rsatilganda o'qishni osonlashtirish uchun.

### 2. Intermediate Example (Valyutalarni formatlash - Currency)
Narxlarni davlat valyutasiga mos formatlash:
\`\`\`javascript
const price = 450000;

// O'zbek so'mida formatlash
const sumFormatter = new Intl.NumberFormat('uz-UZ', {
  style: 'currency',
  currency: 'UZS'
});
console.log(sumFormatter.format(price)); // "450 000,00 UZS" (yoki so'm)

// AQSH dollarida formatlash
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
console.log(usdFormatter.format(120.50)); // "$120.50"
\`\`\`
* **Qachon ishlatiladi:** E-commerce (onlayn do'kon) savdo tizimlarida narx-navoni chiroyli chiqarishda.

### 3. Advanced Example (Sanalarni formatlash - DateTimeFormat)
Sanalarni to'liq matnli va mahalliylashtirilgan shaklda chiqarish:
\`\`\`javascript
const today = new Date('2026-06-10');

// O'zbek tilida to'liq sana
const uzDate = new Intl.DateTimeFormat('uz-UZ', {
  dateStyle: 'full',
  timeStyle: 'short' // yoki faqat sana uchun timeStyle berilmaydi
});
console.log(uzDate.format(today)); // "chorshanba, 2026-yil 10-iyun"

// Ingliz tilida sana
const usDate = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long'
});
console.log(usDate.format(today)); // "June 10, 2026"
\`\`\`
* **Qachon ishlatiladi:** Blog maqolalari, yangiliklar yoki chatlarda xabar yozilgan sanalarni o'quvchi tilida chiroyli chiqarishda.

### 4. Production Example (Nisbiy vaqt formatlash - RelativeTimeFormat)
"Xabar 5 daqiqa oldin yuborildi" kabi nisbiy vaqtlarni avtomatik tarjima qilish:
\`\`\`javascript
const rtf = new Intl.RelativeTimeFormat('uz-UZ', { numeric: 'auto' });

console.log(rtf.format(-1, 'day'));   // "kecha"
console.log(rtf.format(-5, 'minute')); // "5 daqiqa oldin"
console.log(rtf.format(2, 'day'));    // "indan keyin"
console.log(rtf.format(1, 'hour'));   // "1 soatdan keyin"
\`\`\`
* **Natija:** Qo'lda tarjima qilish shart emas. Brauzer o'z-o'zidan berilgan til va songa qarab relative matnni yasab beradi.
* **Qachon ishlatiladi:** Ijtimoiy tarmoqlar, chatlar va bildirishnomalarda (notifications) xabar vaqtlarini chiroyli ko'rsatishda.

### 5. Enterprise Example (Ro'yxatlarni birlashtirish - ListFormat)
Massivdagi elementlarni til grammatikasi bo'yicha birlashtirish:
\`\`\`javascript
const fruits = ['Olma', 'Banan', 'Uzum'];

// O'zbek tili uchun ro'yxat (oxirgisiga "va" qo'shadi)
const uzList = new Intl.ListFormat('uz-UZ', { style: 'long', type: 'conjunction' });
console.log(uzList.format(fruits)); // "Olma, Banan va Uzum"

// Ingliz tili uchun ro'yxat (oxirgisiga "and" qo'shadi)
const enList = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });
console.log(enList.format(fruits)); // "Olma, Banan, and Uzum" (Oxford comma)
\`\`\`
* **Qachon ishlatiladi:** Foydalanuvchilarga dynamic ro'yxatlarni (masalan: *"Ushbu postni Ali, Vali va yana 3 kishi yoqtirdi"*) grammatik jihatdan to'g'ri chiqarishda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Bundle Size (Sayt hajmi):** Sanalarni formatlovchi \`moment.js\` kutubxonasi deyarli **70 KB** joy egallaydi. Intl API dan foydalanish loyiha hajmini kamaytiradi (0 KB - chunki u brauzer ichida tayyor turadi), bu esa sayt yuklanishini tezlashtiradi.
* **Lokalizatsiya xatolari:** Sana va raqamlarni qo'lda regex va string orqali formatlash doimo chekka holatlarda (edge cases) xatoliklarga olib keladi. Brauzer esa dunyo standartlariga (CLDR) tayanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Har bir formatlashda yangi formatlovchi (Formatter) obyekt yaratish
#### Xato:
\`\`\`javascript
// Loop ichida har safar new Intl chaqirish (Juda sekin)
data.forEach(item => {
  const formatted = new Intl.NumberFormat('uz-UZ').format(item.price);
});
\`\`\`
#### Nima uchun noto'g'ri:
\`new Intl.NumberFormat\` obyektini yaratish ancha og'ir hisob-kitob talab qiladi. Uni loop ichida har kadrda chaqirish CPU-ni yuklaydi.
#### To'g'ri usul:
Formatter obyektini loop-dan tashqarida bir marta yaratib, uni qayta-qayta ishlatish:
\`\`\`javascript
const formatter = new Intl.NumberFormat('uz-UZ');
data.forEach(item => {
  const formatted = formatter.format(item.price);
});
\`\`\`
#### Izoh:
Obyektlarni keshlab ishlatish tezkorlikni kafolatlaydi.

### 2. Valyuta belgilaganda valyuta kodini (USD, UZS) noto'g'ri yozish
#### Xato:
\`currency: '$'\` yoki \`currency: 'som'\` deb yozish.
#### Nima uchun noto'g'ri:
ISO 4217 standarti bo'yicha valyuta kodlari 3 ta harfdan iborat bo'lishi shart (masalan: USD, EUR, UZS). Aks holda xatolik beradi.
#### To'g'ri usul:
\`currency: 'USD'\`
#### Izoh:
ISO standartlariga rioya qiling.

### 3. Foydalanuvchi tilini (Locale) kodda hardcode qilib belgilash
#### Xato:
Doimo \`new Intl.NumberFormat('uz-UZ')\` deb yozib, chet ellik foydalanuvchilarni hisobga olmaslik.
#### To'g'ri usul:
Foydalanuvchi brauzeri tilini avtomatik aniqlash uchun \`navigator.language\` ishlatish:
\`\`\`javascript
const userLocale = navigator.language || 'uz-UZ';
const formatter = new Intl.NumberFormat(userLocale);
\`\`\`
#### Izoh:
Ilova barcha foydalanuvchilar uchun moslashuvchan bo'lsin.

### 4. Sana formatlashda vaqt zonalarini (Timezones) hisobga olmaslik
#### Xato:
Faqat lokal vaqtni ko'rsatib, boshqa davlatdagilarga noto'g'ri soatni ko'rsatish.
#### To'g'ri usul:
Options qismida \`timeZone: 'Asia/Tashkent'\` yoki dynamic ravishda foydalanuvchi zonasini berish.
#### Izoh:
Vaqt zonalari global tizimlarda muhim.

### 5. \`Intl\` obyekti bor-yo'qligini tekshirmaslik (Eski brauzerlar)
#### Xato:
Eski brauzerlarda (masalan Internet Explorer) Intl yo'qligi sababli JS kod to'xtab qolishi.
#### To'g'ri usul:
Agar eski brauzerlar qo'llab-quvvatlanishi kerak bo'lsa, polyfill ishlatish yoki shart qo'yish:
\`\`\`javascript
if (window.Intl) { ... }
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da \`Intl\` obyekti nima uchun kerak?
   * **Javob:** Sanalar, sonlar va valyutalarni davlatlar formatiga mos (lokalizatsiya) formatlash uchun.

2. **Savol:** Nima uchun \`moment.js\` o'rniga Intl API ishlatish tavsiya etiladi?
   * **Javob:** Intl API brauzer ichida tayyor turadi va loyihamiz hajmini (bundle size) deyarli 70 KB ga tejaydi.

3. **Savol:** Raqamlarni formatlashda mingliklarni qanday ajratamiz?
   * **Javob:** \`Intl.NumberFormat('locale')\` orqali.

4. **Savol:** Nisbiy vaqtni (masalan, "2 daqiqa oldin") formatlovchi Intl obyekti qaysi?
   * **Javob:** \`Intl.RelativeTimeFormat\`.

### Middle (5–8)
5. **Savol:** \`Intl.NumberFormat\` konstruktoriga beriladigan \`style: 'currency'\` sozlamasi qanday ishlaydi va nima uchun \`currency\` parametri talab qilinadi?
   * **Javob:** style: 'currency' berilganda son pul belgisi bilan formatlanadi. Qaysi pul birligi ekanini bilish uchun ISO kodi (masalan USD) kiritilishi shart.

6. **Savol:** Foydalanuvchi brauzeri tilini JS yordamida qanday to'g'ri aniqlash mumkin?
   * **Javob:** \`navigator.language\` (birlamchi til) yoki \`navigator.languages\` (afzal ko'rilgan tillar ro'yxati) orqali.

7. **Savol:** \`Intl.DateTimeFormat\` yordamida haftaning kunini (dushanba, chorshanba) matn ko'rinishida qanday formatlash mumkin?
   * **Javob:** Options ichida \`weekday: 'long'\` yoki \`'short'\` berish orqali.

8. **Savol:** \`Intl.ListFormat\` nima vazifani bajaradi?
   * **Javob:** Massivdagi elementlarni berilgan til qoidalariga mos ravishda tinish belgilari va grammatik bog'lovchilar (va, and, or) bilan birlashtiradi.

### Senior (9–12)
9. **Savol:** Performance critical ilovalarda \`Intl\` obyektlarini yaratish yuklamasini qanday optimallashtirasiz?
   * **Javob:** Formatter obyektlarini doimo keshlab (Memoization) qayta ishlatamiz. Jadvallarni render qilganda har safar loop ichida new Intl chaqirilmaydi.

10. **Savol:** \`Intl.Collator\` nima va u turli tillardagi matnlarni saralashda (sorting) qanday muammoni hal qiladi?
    * **Javob:** Pastroq darajada matnlarni til qoidalariga ko'ra solishtirish obyekti. Oddiy \`Array.prototype.sort()\` turli tillardagi maxsus belgilarni (masalan, o'zbekcha 'o'g' or 'o'', nemischa 'ä', 'ö') noto'g'ri saralaydi. \`Intl.Collator\` esa grammatik jihatdan to'g'ri tartiblab beradi.

11. **Savol:** Server-Side Rendering (SSR) tizimlarida (masalan, Next.js) \`Intl\` ishlaganda "Hydration Mismatch" xatosi yuzaga kelish sababi nima va uni qanday hal qilasiz?
    * **Javob:** Agar serverdagi vaqt zonasi/tili va mijoz brauzeridagi til har xil bo'lsa, HTML har xil render bo'lib mismatch xatosi keladi. Yechim — tilni faqat component yuklangandan keyin (useEffect ichida) render qilish yoki statik locale berish.

12. **Savol:** \`Intl.NumberFormat.prototype.formatToParts()\` metodi nima uchun kerak va u an'anaviy \`format()\`dan nimasi bilan farq qiladi?
    * **Javob:** \`format()\` shunchaki tayyor string beradi. \`formatToParts()\` esa formatlangan sonni bo'laklarga ajratib (butun qismi, kasr qismi, valyuta belgisi, minglik ajratuvchi) massiv shaklida beradi. Bu bizga UI-da valyuta belgisini boshqacha rangda yoki kichikroq o'lchamda chizish imkonini beradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Xalqaro moliyaviy hisobot va hisob-faktura (Invoice) tizimi
Loyiha butun dunyo bo'yicha to'lovlar qabul qiladi. Bizga har bir mijoz uchun hisob-fakturani chiroyli chiqarish tizimi kerak.

#### Yechim:
Biz dynamic NumberFormat yaratamiz. Mijoz qaysi davlatdan bo'lsa, pulni o'sha formatda chiqaramiz. Agar mijoz UZdan bo'lsa So'mda, USdan bo'lsa dollarda:
\`\`\`javascript
function formatInvoice(amount, locale, currencyCode) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  });
  return {
    formattedPrice: formatter.format(amount),
    date: new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date())
  };
}

// UZ foydalanuvchisi uchun:
console.log(formatInvoice(150000, 'uz-UZ', 'UZS')); 
// { formattedPrice: "150 000,00 UZS", date: "2026-06-10" }
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Memoization Pattern:**
  \`\`\`javascript
  const formatterCache = new Map();
  function getFormatter(locale, options) {
    const key = \`\${locale}-\${JSON.stringify(options)}\`;
    if (!formatterCache.has(key)) {
      formatterCache.set(key, new Intl.NumberFormat(locale, options));
    }
    return formatterCache.get(key);
  }
  \`\`\`
  Ushbu kesh loyihadagi dynamic formatlashlarni 10 barobargacha tezlashtiradi.

---

## 10. 📌 Cheat Sheet

| Obyekt | Parametrlar | Asosiy Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **NumberFormat** | \`style: 'currency'\`, \`currency: 'USD'\` | Son va pulni formatlash | ISO kodlari ishlatiladi |
| **DateTimeFormat** | \`dateStyle: 'full'\`, \`timeZone: 'UTC'\` | Sanani formatlash | Vaqt zonalari muhim |
| **RelativeTimeFormat**| \`numeric: 'auto'\` | Nisbiy vaqtlar ("kecha") | Avtomatik tarjima qilinadi |
| **ListFormat** | \`type: 'conjunction'\` | Ro'yxatlarni birlashtirish | Grammatik to'g'ri ulaydi |
| **Collator** | standard | Matnlarni to'g'ri saralash | Maxsus harflar uchun |
`,
  exercises: [
  {
    "id": 1,
    "title": "Valyutani Formatlash (NumberFormat)",
    "instruction": "Berilgan sonni (`amount`) 'uz-UZ' lokali va 'UZS' valyuta kodi yordamida valyuta ko'rinishida formatlovchi `formatUZS(amount)` funksiyasini yozing. Natija string bo'lishi kerak.",
    "startingCode": "function formatUZS(amount) {\n  // Kodni yozing\n}",
    "hint": "return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' }).format(amount);",
    "test": "try { const res = formatUZS(150000); if (typeof res !== 'string') return 'Natija string bo\\'lishi kerak'; if (!res.includes('UZS') && !res.includes('so\\'m')) return 'Valyuta formati noto\\'g\\'ri, UZS bo\\'lishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Nisbiy Vaqt (RelativeTimeFormat)",
    "instruction": "Berilgan manfiy bo'lmagan minutlar sonini (`minutes`) 'uz-UZ' lokalida 'daqiqa oldin' yoki 'hozir' kabi formatlovchi `formatMinutesAgo(minutes)` funksiyasini yozing. `numeric: 'auto'` sozlamasidan foydalaning.",
    "startingCode": "function formatMinutesAgo(minutes) {\n  // Kodni yozing\n}",
    "hint": "const rtf = new Intl.RelativeTimeFormat('uz-UZ', { numeric: 'auto' }); return rtf.format(-minutes, 'minute');",
    "test": "try { const res1 = formatMinutesAgo(5); const res2 = formatMinutesAgo(0); if (!res1.includes('5') || !res1.includes('daqiqa')) return '5 daqiqa oldin matni shakllanmadi'; if (res2 !== 'hozir' && res2 !== '0 daqiqa oldin') return '0 daqiqa uchun hozir yoki 0 daqiqa oldin bo\\'lishi kerak'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "O'zbekcha Sana (DateTimeFormat)",
    "instruction": "Berilgan Date obyektini (`date`) 'uz-UZ' lokalida faqat sana qismini to'liq shaklda (masalan, '2026-yil 10-iyun') formatlovchi `formatToUzbekDate(date)` funksiyasini yozing. `dateStyle: 'long'` sozlamasidan foydalaning.",
    "startingCode": "function formatToUzbekDate(date) {\n  // Kodni yozing\n}",
    "hint": "return new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'long' }).format(date);",
    "test": "try { const testDate = new Date('2026-06-10'); const res = formatToUzbekDate(testDate); if (!res.includes('2026') || !res.includes('iyun')) return 'Sana formati noto\\'g\\'ri: ' + res; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da Intl API nima maqsadda ishlatiladi?",
    "options": [
      "Veb-ilovada internet tezligini oshirish uchun",
      "Sana, raqam va valyutalarni foydalanuvchi tiliga mos ravishda formatlash (lokalizatsiya) uchun",
      "Kutubxonalarning hajmini siqish uchun",
      "Matnlar ustida regex qidiruvini tezlashtirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Intl API xalqaro standartlarga (CLDR) asoslanib, ilovani turli davlatlar (lokallar) madaniy qoidalariga mos formatlashga xizmat qiladi."
  },
  {
    "id": 2,
    "question": "Sanalarni formatlashda moment.js o'rniga Intl API ishlatishning asosiy afzalligi nimada?",
    "options": [
      "Moment.js o'zbek tilini tushunmaydi",
      "Intl API brauzerga o'rnatilgan bo'lib, loyiha hajmini (bundle size) tejaydi",
      "Intl API sinxron emas, asinxron ishlaydi",
      "Intl API xotirani avtomatik tozalaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Intl API brauzer ichida tayyor turgani sababli tashqi yirik kutubxonalarga ehtiyoj qolmaydi va bundle hajmini 0 KB ga kamaytiradi."
  },
  {
    "id": 3,
    "question": "Qaysi Intl sinfi katta sonlarni minglik guruhlarga bo'lish uchun ishlatiladi?",
    "options": [
      "Intl.DateTimeFormat",
      "Intl.NumberFormat",
      "Intl.ListFormat",
      "Intl.RelativeTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.NumberFormat sonlar va pul birliklarini berilgan lokal bo'yicha chiroyli formatlash uchun qo'llaniladi."
  },
  {
    "id": 4,
    "question": "'5 daqiqa oldin' kabi nisbiy vaqtlarni formatlovchi Intl obyekti qaysi?",
    "options": [
      "Intl.TimeSpan",
      "Intl.RelativeTimeFormat",
      "Intl.DurationFormat",
      "Intl.DateTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.RelativeTimeFormat berilgan son va o'lchov birligidan (masalan, -5 va 'minute') kelib chiqib dynamic nisbiy vaqt matnini yasaydi."
  },
  {
    "id": 5,
    "question": "Intl.NumberFormat-da valyutani ko'rsatish (style: 'currency') uchun yana qaysi parametr majburiy hisoblanadi?",
    "options": [
      "currency (masalan, 'USD')",
      "currencySymbol (masalan, '$')",
      "localeSymbol",
      "formatType"
    ],
    "correctAnswer": 0,
    "explanation": "Valyuta uslubi tanlansa, albatta ISO 4217 standarti bo'yicha 3 harfli valyuta kodi (currency) ko'rsatilishi shart (masalan: UZS, USD, EUR)."
  },
  {
    "id": 6,
    "question": "Foydalanuvchi brauzerining asosiy tilini dynamic aniqlash uchun qaysi brauzer API-sidan foydalaniladi?",
    "options": [
      "window.locale",
      "navigator.language",
      "document.language",
      "navigator.userAgent"
    ],
    "correctAnswer": 1,
    "explanation": "navigator.language foydalanuvchi brauzerining asosiy interfeys tilini (masalan, 'uz-UZ' yoki 'en-US') qaytaradi."
  },
  {
    "id": 7,
    "question": "Massiv elementlarini grammatik jihatdan to'g'ri (masalan, 'Olma, Banan va Uzum') birlashtiruvchi Intl obyekti qaysi?",
    "options": [
      "Intl.ArrayFormat",
      "Intl.ListFormat",
      "Intl.StringJoiner",
      "Intl.Collator"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.ListFormat berilgan lokal qoidalariga mos keladigan bog'lovchilar ('va', 'and', 'or') bilan massivlarni birlashtirib beradi."
  },
  {
    "id": 8,
    "question": "Matnlarni yoki alifbo harflarini (masalan, o'zbekcha 'o'g' yoki 'o'') tillarga xos tartibda to'g'ri saralash (sorting) uchun nima ishlatiladi?",
    "options": [
      "Array.prototype.sort()",
      "Intl.Collator",
      "Intl.StringFormatter",
      "Intl.DateTimeFormat"
    ],
    "correctAnswer": 1,
    "explanation": "Intl.Collator har bir tilning o'ziga xos alifbo qoidalarini (masalan, umlautlar, tutuq belgilari) hisobga olgan holda matnlarni to'g'ri solishtiradi."
  },
  {
    "id": 9,
    "question": "Jadvaldagi 10 000 ta qatorni render qilishda Intl.NumberFormat ishlatishda eng to'g'ri optimallashtirish usuli qaysi?",
    "options": [
      "Har bir qatorda 'new Intl.NumberFormat()' chaqirish",
      "Loop-dan tashqarida bitta formatlovchi obyekt yaratib, uni loop ichida qayta-qayta ishlatish (Keshlash)",
      "Loop o'rniga setTimeout ishlatish",
      "Intl API dan butunlay voz kechish va string operatsiyalardan foydalanish"
    ],
    "correctAnswer": 1,
    "explanation": "Intl formatlovchi obyektlarini yaratish CPU uchun og'ir bo'lgani sababli, uni bir marta yaratib keshlab qo'yish (Memoization) unumdorlikni sezilarli oshiradi."
  },
  {
    "id": 10,
    "question": "Intl.NumberFormat.prototype.formatToParts() metodi oddiy format() metodidan nima bilan farq qiladi?",
    "options": [
      "U faqat sonlarni JSON formatida qaytaradi",
      "U formatlangan matnni alohida bo'laklarga ajratilgan obyektlar massivi shaklida qaytaradi (masalan, butun qism, valyuta belgisi, minglik ajratuvchi)",
      "U faqat asinxron ishlaydi",
      "U hech qanday farq qilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "formatToParts() yordamida har bir bo'lakka (valyuta belgisi, son, ajratuvchi) alohida CSS stillari berish yoki UI elementlarni moslashuvchan boshqarish mumkin."
  },
  {
    "id": 11,
    "question": "Hafta kunini matn ko'rinishida chiqarish uchun Intl.DateTimeFormat options qismida qaysi xususiyat beriladi?",
    "options": [
      "day: 'string'",
      "weekday: 'long' yoki 'short'",
      "week: 'text'",
      "dayOfWeek: 'full'"
    ],
    "correctAnswer": 1,
    "explanation": "weekday xossasiga 'long' (chorshanba) yoki 'short' (chor.) qiymati berilib, hafta kunini olish mumkin."
  },
  {
    "id": 12,
    "question": "SSR (Server-Side Rendering) ilovalarda Intl ishlaganda nima uchun 'Hydration Mismatch' xatosi yuzaga keladi?",
    "options": [
      "Server va brauzer vaqt zonalari yoki lokallari bir-biridan farq qilganligi uchun",
      "Serverda JavaScript ishlamasligi sababli",
      "Brauzer dynamic animatsiyalarni qo'llab-quvvatlamagani uchun",
      "Serverda Intl API mavjud emasligi sababli"
    ],
    "correctAnswer": 0,
    "explanation": "Agar serverda HTML boshqa lokalda (masalan, 'en-US' / UTC) chizilsa va foydalanuvchida boshqa lokalda ('uz-UZ') hydration bo'lsa, struktura mos kelmay mismatch yuz beradi."
  }
]

};
