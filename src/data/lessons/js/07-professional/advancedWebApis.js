export const advancedWebApis = {
  id: "advancedWebApis",
  title: "Advanced Web APIs (Intersection & Mutation Observer)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Intersection Observer nima?
**Intersection Observer API** — bu veb-sahifadagi ma'lum bir elementning foydalanuvchi ekraniga (Viewport) kirganini yoki undan chiqqanini kuzatuvchi brauzer vositasidir.
Avvallari element ekranga kirdimi-yo'qmi bilish uchun global \`scroll\` hodisasini eshitib, \`getBoundingClientRect()\` orqali hisob-kitob qilar edik. Bu render thread-ni og'ir yuklar va scroll qilganda sahifani qotirardi. Intersection Observer esa buni brauzer darajasida, o'ta samarali (performance-friendly) bajaradi.

### Mutation Observer nima?
**Mutation Observer API** — bu DOM daraxtida (HTML elementlarda) sodir bo'ladigan o'zgarishlarni (yangi bola element qo'shilishi, atributlar o'zgarishi, matn o'zgarishi) kuzatuvchi brauzer vositasidir.
U DOM o'zgarganda orqa fonda biz bergan callback funksiyasini ishga tushiradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **do'kon qo'riqchisiz**:
* **Scroll + getBoundingClientRect() (Eski yomon usul):** Siz har millisekundda do'konga kirish eshigini ochib, tashqariga qarab *"Kimdir kelyaptimi? Hozir keldimi? Hozirchi?"* deb so'rayverasiz (Juda charchaysiz va ish sekinlashadi).
* **Intersection Observer (Yangi optimal usul):** Siz eshik tepasiga **harakat datchigi (sensor)** o'rnatasiz. Sensor faqat kimdir eshik oldiga kelgandagina (kesishganda) sizga qo'ng'iroq chaladi (Siz tinchgina ofisda dam olasiz).
* **Mutation Observer:** Bu do'kon ichidagi **xavfsizlik kamerasi**. Kamera do'kon ichidagi biror narsa o'zgarganda (masalan, kiyim javonining joyi o'zgarganda yoki yangi tovar qo'yilganda) sizga darhol xabar beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Intersection Observer bilan element ekranga kirganini bilish)
Element ekranga to'liq kirganda konsolga yozish:
\`\`\`javascript
// 1. Observer yaratish
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element ekranga kirdi:', entry.target);
      // Ekranga bir marta kirgandan keyin kuzatishni to'xtatish (ixtiyoriy)
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 // Elementning kamida 50% qismi ekranga kirganda ishlaydi
});

// 2. Kuzatiladigan elementni belgilash
const targetElement = document.querySelector('#lazy-box');
observer.observe(targetElement);
\`\`\`
* **Qachon ishlatiladi:** Rasmlarni "Lazy loading" (faqat ekranga yaqinlashganda yuklash) yoki reklamalarni ko'rish statistikasini aniq hisoblashda.

### 2. Intermediate Example (Infinite Scroll - Cheksiz lenta)
Foydalanuvchi sahifa oxiriga yetganda avtomatik yangi postlarni yuklash:
\`\`\`javascript
// Sahifa ostidagi ko'rinmas element (sentinel)
const sentinel = document.querySelector('#sentinel');

const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    console.log('Lenta oxiriga keldi. Yangi postlarni yuklaymiz...');
    loadMorePosts(); // Yangi ma'lumot yuklovchi funksiya
  }
});

scrollObserver.observe(sentinel);
\`\`\`
* **Qachon ishlatiladi:** Instagram, Telegram yoki Facebook-dagi cheksiz lenta (Feed) mantiqida.
* **Performance jihati:** Global scroll-ni eshitmaslik orqali mobil brauzerlarda yuklama 10 barobargacha kamayadi.

### 3. Advanced Example (Mutation Observer - Atribut o'zgarishini kuzatish)
Ma'lum bir \`div\` elementning class yoki style atributi o'zgarganda ishlash:
\`\`\`javascript
const targetNode = document.querySelector('#status-box');

// Kuzatish qoidalari
const config = { 
  attributes: true, // Atributlarni kuzatish
  attributeFilter: ['class', 'style'] // Faqat shu atributlar o'zgarganda ishlaydi
};

const mutationObserver = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      console.log(\`\${mutation.attributeName} atributi o'zgardi.\`);
      console.log('Yangi qiymat:', targetNode.getAttribute(mutation.attributeName));
    }
  }
});

// Kuzatishni boshlash
mutationObserver.observe(targetNode, config);
\`\`\`
* **Qachon ishlatiladi:** Dark mode yoki tillar o'zgarganda global DOM o'zgarishlarini kuzatib dynamic ishlar qilishda.

### 4. Production Example (Lazy Loading Images - Rasmlarni kechiktirib yuklash)
Faqat ekran sohasiga kirgan rasmlarni yuklash va bandwidth-ni tejash:
\`\`\`javascript
// HTML: <img class="lazy" data-src="real-image.jpg" src="placeholder.jpg" />

const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // Haqiqiy rasm manzilini o'rnatish
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      // Kuzatishni to'xtatamiz (rasm yuklandi)
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img.lazy').forEach(img => imgObserver.observe(img));
\`\`\`
* **Natija:** Sayt ochilganda faqat foydalanuvchining ko'z oldidagi rasmlar yuklanadi, sahifa ostidagi rasmlar esa internet trafigini keraksiz sarflamaydi.

### 5. Enterprise Example (Mutation Observer yordamida uchinchi tomon skriptlarini nazorat qilish)
Saytga qo'shilgan uchinchi tomon vidjetlari (masalan, reklama bannerlari) sahifadagi muhim DOM tugunlarini o'chirib yubormasligini ta'minlash:
\`\`\`javascript
const container = document.querySelector('#app-root');

const safetyObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.removedNodes.forEach(node => {
      if (node.id === 'secure-checkout-btn') {
        console.warn('DIQQAT: To\\\\'lov tugmasi o\\\\'chirildi! Uni qayta tiklaymiz.');
        container.appendChild(node); // Tugmani joyiga qaytarish
      }
    });
  });
});

safetyObserver.observe(container, { childList: true, subtree: true });
\`\`\`
* **Qachon ishlatiladi:** Katta bank yoki to'lov tizimlarida tashqi widget-larning (masalan chat bot) xavfsizligini ta'minlashda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Jank (Sahifa qotishi):** \`window.addEventListener('scroll')\` har bir piksel harakatida yuzlab marta hisoblaydi. Intersection Observer esa hisob-kitobni asosiy brauzer thread-idan tashqarida qiladi va sahifa qotishini yo'qotadi.
2. **Dynamic DOM Manipulation tracking:** DOM o'zgarganini bilish uchun \`setInterval\` yordamida har soniyada tekshirish o'rniga, Mutation Observer orqali o'ta optimal event-driven tizim yaratiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Element ekranga kirgach kuzatishni to'xtatmaslik (unobserve)
#### Xato:
Lazy loading qilayotganda, rasm yuklangandan keyin ham uni kuzatishda davom etish.
#### Nima uchun noto'g'ri:
Bu xotirani (RAM) band qilib boradi.
#### To'g'ri usul:
Rasm yuklanishi bilan \`observer.unobserve(img)\` chaqirilishi shart.

### 2. Mutation Observer konfiguratsiyasini noto'g'ri sozlash (Maximum Call Stack Exceeded)
#### Xato:
Mutation Observer callback funksiyasi ichida kuzatilayotgan DOM-ga yangi element qo'shish va cheksiz siklga tushib qolish (Infinite loop).
#### To'g'ri usul:
Observer ichida DOM-ni o'zgartirgandan so'ng vaqtincha \`observer.disconnect()\` qilish yoki atribut filtrlaridan foydalanish.

### 3. Katta elementlar uchun \`threshold\` xossasini noto'g'ri belgilash
#### Xato:
Uzunligi 2000px bo'lgan element uchun \`threshold: 1.0\` (to'liq kirish) qilish.
#### Nima uchun noto'g'ri:
Ekran balandligi atigi 1080px bo'lgani uchun, u element hech qachon ekranga 100% to'liq sig'maydi va observer ishlamay qoladi.
#### To'g'ri usul:
Bunday elementlar uchun \`threshold: 0.1\` yoki \`0.0\` (chegarasi kirishi bilan) ishlating.

### 4. \`rootMargin\` xossasini piksel o'lchovsiz (px/%) yozish
#### Xato:
\`rootMargin: '10px 0px 20px'\` o'rniga \`rootMargin: '10 0 20'\` yozish.
#### Nima uchun noto'g'ri:
Baza buni sintaktik xato deb hisoblaydi va ishlamaydi. Qiymatlar albatta birlik bilan yozilishi shart.

### 5. \`disconnect()\` amalini keraksiz joyda unutib qoldirish
#### Xato:
Bitta elementni kuzatishni to'xtatish o'rniga \`disconnect()\` chaqirib, butun observer-ni o'chirib yuborish.
#### To'g'ri usul:
Faqat bitta element uchun \`unobserve(el)\`, hammasi uchun esa \`disconnect()\` chaqiring.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Intersection Observer nima uchun kerak?
   * **Javob:** Element foydalanuvchi ekraniga (viewport) kirganini yoki undan chiqqanini kuzatish uchun.

2. **Savol:** Nima uchun an'anaviy \`scroll\` hodisasi bilan elementni kuzatish yomon deb hisoblanadi?
   * **Javob:** Scroll hodisasi har pikselda yuzlab marta ishlaydi va \`getBoundingClientRect()\` chaqirilganda layout reflow-ni majburlab sahifani sekinlashtiradi.

3. **Savol:** Mutation Observer nima vazifani bajaradi?
   * **Javob:** DOM elementlarining o'zgarishini (atributlar, bolalar, matn) kuzatadi.

4. **Savol:** Intersection Observer-da \`threshold\` nima?
   * **Javob:** Elementning necha foiz qismi ekranga kirganda callback funksiyasi ishlashini belgilovchi son (0.0 dan 1.0 gacha).

### Middle (5–8)
5. **Savol:** Intersection Observer sozlamalaridagi \`rootMargin\` nima?
   * **Javob:** U ekran chegaralarini virtual kengaytirish yoki qisqartirish uchun ishlatiladi (CSS padding kabi, masalan: '100px' element ekranga kirishidan 100px oldin hodisani ishga tushiradi).

6. **Savol:** Mutation Observer konfiguratsiyasidagi \`childList\` va \`subtree\` farqi nimada?
   * **Javob:** \`childList\` faqat bevosita bola elementlar qo'shilishi/o'chirilishini kuzatadi. \`subtree\` esa barcha chuqurlikdagi avlod elementlarni ham kuzatishga ruxsat beradi.

7. **Savol:** Mutation Observer asinxronmi yoki sinxron?
   * **Javob:** Asinxron. U DOM o'zgarishlarini mikrotask (Microtask Queue) sifatida yig'ib bajaradi, bu esa tezlikni oshiradi.

8. **Savol:** Bir vaqtda bir nechta elementlarni bitta Intersection Observer bilan kuzatish mumkinmi?
   * **Javob:** Ha. Bitta observer yaratib, bir nechta elementlarga \`observer.observe(el)\` ni qayta-qayta chaqirish mumkin. Callback ichidagi \`entries\` massivi ularning barchasini beradi.

### Senior (9–12)
9. **Savol:** Intersection Observer qanday qilib Main Thread-ni bloklamasdan ishlaydi?
   * **Javob:** Brauzer kesishish hisob-kitoblarini asinxron, o'zining ichki render siklidan (Render Pipeline) so'ng bajaradi va faqat natijanigina JS event loop-ga yuboradi.

10. **Savol:** Mutation Observer-dagi memory leaks (xotira oqishi) qanday yuzaga keladi va \`disconnect()\` qachon chaqirilishi shart?
    * **Javob:** DOM element o'chirilganda, agar u Mutation Observer tomonidan kuzatilayotgan bo'lsa, xotirada qolib ketishi mumkin. Element o'chirilishi bilan \`observer.disconnect()\` chaqirilishi shart.

11. **Savol:** Single Page Application (SPA) arxitekturasida sahifa o'zgarganda Intersection Observer-larni qanday boshqarasiz?
    * **Javob:** Komponent o'chganda (React-da useEffect return qismida) albatta \`observer.disconnect()\` yoki \`unobserve\` chaqirilib tozalanishi kerak, aks holda eski element xotirada qoladi.

12. **Savol:** \`ResizeObserver\` nima va u Intersection Observer-dan nimasi bilan farq qiladi?
    * **Javob:** ResizeObserver elementning jismoniy o'lchamlari (kengligi va balandligi pikselda) o'zgarganini kuzatadi. Intersection Observer esa faqat ekranga nisbatan kesishishini tekshiradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### E-commerce saytida ko'rilgan reklamalarni hisoblash tizimi (Ad view tracking)
Saytdagi homiy mahsulotlar (Sponsor posts) ro'yxatidan foydalanuvchi aynan qaysi tovarlarni jismonan ko'rganini hisoblab, reklama beruvchiga hisobot yuborish kerak.

#### Muammo:
Foydalanuvchi shunchaki lentani tez o'tkazib (scroll) yuborganida rasm ko'rindi deb hisoblamaslik kerak. Mahsulot ekranda kamida 2 soniya davomida kamida 50% qismi ko'rinib turishi shart.

#### Yechim:
\`\`\`javascript
const adObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 2 soniya ko'rib turganini tekshirish uchun taymer
      entry.target.timer = setTimeout(() => {
        console.log('Reklama 2 soniya ko\\\\'rildi. ID:', entry.target.dataset.adId);
        sendAdMetrics(entry.target.dataset.adId); // API ga yuborish
        adObserver.unobserve(entry.target);
      }, 2000);
    } else {
      // Agar 2 soniya bo'lmasdan ekrandan chiqib ketsa, taymerni bekor qilish
      clearTimeout(entry.target.timer);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.sponsor-ad').forEach(ad => adObserver.observe(ad));
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Sinxron reflow oldini olish:** Intersection Observer sahifani qayta chizishga (layout trashing) majburlamaydi, chunki u getBoundingClientRect kabi sinxron emas.
* **disconnect() unumdorligi:** Katta loyihalarda keraksiz observer-larni o'chirish orqali protsessor va RAM quvvatini tejash mumkin.

---

## 10. 📌 Cheat Sheet

| Observer | Vazifasi | Sozlamalari | Metodlari |
| :--- | :--- | :--- | :--- |
| **Intersection** | Ekranga kirishni kuzatadi | \`threshold\`, \`rootMargin\`, \`root\` | \`observe()\`, \`unobserve()\`, \`disconnect()\` |
| **Mutation** | DOM o'zgarishini kuzatadi | \`childList\`, \`attributes\`, \`subtree\` | \`observe()\`, \`disconnect()\`, \`takeRecords()\` |
| **Resize** | Hajm o'zgarishini kuzatadi | standard | \`observe()\`, \`unobserve()\`, \`disconnect()\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "Intersection Observer Yaratish",
    "instruction": "Kamida 50% qismi ekranga kirganda ishlashi uchun `threshold: 0.5` sozlamasiga ega bo'lgan va berilgan callback funksiyasini qabul qiluvchi `createThresholdObserver(callback)` funksiyasini yozing.",
    "startingCode": "function createThresholdObserver(callback) {\n  // Kodni yozing\n}",
    "hint": "return new IntersectionObserver(callback, { threshold: 0.5 });",
    "test": "try { const obs = createThresholdObserver(() => {}); if(!obs || typeof obs.observe !== 'function') return 'IntersectionObserver yaratilmadi'; if(obs.thresholds[0] !== 0.5) return 'threshold sozlamasi 0.5 bo\\'lishi shart'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "DOM Kuzatuvchi (Mutation Observer)",
    "instruction": "Berilgan `target` elementining bolalar ro'yxati (`childList`) o'zgarishini kuzatuvchi va o'zgarganda `callback`ni chaqiruvchi MutationObserver-ni yaratib, uni `target`ga ulaydigan `startDOMWatcher(target, callback)` funksiyasini yozing. Funksiya observer obyektini qaytarsin.",
    "startingCode": "function startDOMWatcher(target, callback) {\n  // 1. Yangi MutationObserver yaratish\n  // 2. observe qilish\n}",
    "hint": "const obs = new MutationObserver(callback); obs.observe(target, { childList: true }); return obs;",
    "test": "try { const div = document.createElement('div'); let called = false; const obs = startDOMWatcher(div, () => { called = true; }); if(!obs || typeof obs.disconnect !== 'function') return 'MutationObserver yaratilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Rasmni Kechiktirib Yuklash",
    "instruction": "Rasm ekranga kirganda uning `src` atributiga `dataset.src` qiymatini o'rnatuvchi va kuzatishni to'xtatuvchi `lazyLoadImage(img)` funksiyasini yozing.",
    "startingCode": "function lazyLoadImage(img) {\n  const observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n      if (entry.isIntersecting) {\n        // src ni o'rnatish va unobserve qilish\n      }\n    });\n  });\n  observer.observe(img);\n}",
    "hint": "entry.target.src = entry.target.dataset.src; observer.unobserve(entry.target);",
    "test": "try { const img = document.createElement('img'); img.dataset.src = 'real.jpg'; lazyLoadImage(img); if(img.src === 'real.jpg') return 'Ushbu amal faqat ekranga kirganda (isIntersecting bo\\'lganda) bajarilishi shart'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Intersection Observer API nima maqsadda ishlatiladi?",
    "options": [
      "Fayllarni yuklash uchun",
      "Element ekranga (viewport) kirgani yoki undan chiqqanini kuzatish uchun",
      "Sinflar strukturasini tekshirish uchun",
      "Ma'lumotlar bazasini yangilash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Intersection Observer API elementlarning ekran chegaralari bilan kesishishini (viewport-ga kirish/chiqish) asinxron va optimal kuzatadi."
  },
  {
    "id": 2,
    "question": "Nima uchun an'anaviy window.onscroll orqali elementlarni ekranga kirganini tekshirish yomon amaliyot hisoblanadi?",
    "options": [
      "U faqat eski brauzerlarda ishlaydi",
      "Scroll hodisasi har bir pikselda yuzlab marta chaqirilib, getBoundingClientRect layout reflow-ni majburlaydi va render thread-ni bloklaydi",
      "U faqat rasmlar bilan ishlaydi",
      "U hech qanday xatolik bermaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Scroll hodisasi o'ta ko'p chaqirilgani sababli undagi sinxron hisob-kitoblar brauzer rendering jarayonini sekinlashtiradi va sahifa qotishiga (jank) sabab bo'ladi."
  },
  {
    "id": 3,
    "question": "Mutation Observer nima maqsadda ishlatiladi?",
    "options": [
      "Jadval o'lchamlarini kuzatish uchun",
      "DOM daraxtidagi va elementlardagi o'zgarishlarni (childList, attributes) kuzatish uchun",
      "Foydalanuvchi tugma bosishini eshitish uchun",
      "Ovozli fayllarni ijro etish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Mutation Observer DOM daraxtining o'zgarishini kuzatish uchun maxsus brauzer API-sidir."
  },
  {
    "id": 4,
    "question": "Intersection Observer-da threshold: 1.0 nimani anglatadi?",
    "options": [
      "Elementning chegarasi ekranga tekkanda ishlashini",
      "Elementning 100% qismi ekranga to'liq kirgandagina callback chaqirilishini",
      "Observer butunlay o'chirilishini",
      "Faqat 1 ta element kuzatilishini"
    ],
    "correctAnswer": 1,
    "explanation": "threshold: 1.0 qiymati kuzatilayotgan element ekranda to'liq (100%) ko'ringandagina observer callback funksiyasini ishga tushirishini bildiradi."
  },
  {
    "id": 5,
    "question": "Intersection Observer-da rootMargin xossasining vazifasi nima?",
    "options": [
      "Elementning padding o'lchamlarini o'zgartirish",
      "Ekran chegaralarini virtual kengaytirish yoki qisqartirish (masalan, element ekranga kirishidan 200px oldin yuklash)",
      "Baza xotirasini boshqarish",
      "Rasmlarni kichiklashtirish"
    ],
    "correctAnswer": 1,
    "explanation": "rootMargin yordamida ekranning virtual chegaralarini oshirish mumkin, bu esa element ekranga kirishidan oldinroq (masalan, lazy-load rasm) tayyor turishiga yordam beradi."
  },
  {
    "id": 6,
    "question": "Mutation Observer callback funksiyalari qachon bajariladi?",
    "options": [
      "Sinxron tarzda, DOM o'zgarishi bilan birdaniga",
      "Asinxron tarzda, mikrotask (Microtask Queue) sifatida keyingi kadr chizilishidan oldin",
      "1 soniyalik taymerdan keyin",
      "Faqat sahifa yangilanganda"
    ],
    "correctAnswer": 1,
    "explanation": "Mutation Observer mikrotask sifatida asinxron ishlaydi, bu esa bir nechta DOM o'zgarishlarini bitta paket qilib optimal qayta ishlash imkonini beradi."
  },
  {
    "id": 7,
    "question": "Observer-ga bog'langan barcha elementlarni kuzatishni to'liq to'xtatish va observer-ni yopish uchun qaysi metod chaqiriladi?",
    "options": ["unobserve()", "disconnect()", "stop()", "clear()"],
    "correctAnswer": 1,
    "explanation": "disconnect() metodi observer-ga bog'langan barcha elementlar kuzatuvini butunlay to'xtatadi."
  },
  {
    "id": 8,
    "question": "Jismoniy element o'lchamlari (width, height pikselda) o'zgarganini kuzatish uchun qaysi observer ishlatiladi?",
    "options": ["IntersectionObserver", "MutationObserver", "ResizeObserver", "PerformanceObserver"],
    "correctAnswer": 2,
    "explanation": "ResizeObserver element o'lchamlari o'zgarganini (masalan, brauzer oynasi kichrayganda div o'zgarishini) kuzatish uchun ishlatiladi."
  },
  {
    "id": 9,
    "question": "Mutation Observer config sozlamasidagi subtree: true nimani bildiradi?",
    "options": [
      "Faqat daraxt rasmlarini yuklashni",
      "Faqat birinchi darajadagi bolalarni kuzatishni",
      "Kuzatilayotgan elementning barcha ichki avlod (chuqur) elementlaridagi o'zgarishlarni ham kuzatishni",
      "Atributlarni o'chirishni"
    ],
    "correctAnswer": 2,
    "explanation": "subtree: true xossasi berilgan elementning ostidagi barcha chuqurlikdagi avlod elementlar o'zgarishini ham kuzatishga ruxsat beradi."
  },
  {
    "id": 10,
    "question": "Intersection Observer-da unobserve(element) metodi nima vazifa bajaradi?",
    "options": [
      "Observer-ni butunlay o'chirib yuboradi",
      "Faqat bitta ko'rsatilgan elementni kuzatishni to'xtatadi",
      "Atributlarni tozalaydi",
      "Yangi element qo'shadi"
    ],
    "correctAnswer": 1,
    "explanation": "unobserve() faqat bitta parametrdagi elementni kuzatuv ro'yxatidan olib tashlaydi, qolgan elementlar kuzatilishi davom etaveradi."
  },
  {
    "id": 11,
    "question": "Nima uchun rasmlarni lazy-load qilishda birinchi marta ekranga kirgach unobserve() qilish shart?",
    "options": [
      "Aks holda rasm yana o'chib qoladi",
      "Memory leak (xotira oqishi) oldini olish va keraksiz hisob-kitoblar yuklamasini to'xtatish uchun",
      "Baza xatolik beradi",
      "Rasm sifati buziladi"
    ],
    "correctAnswer": 1,
    "explanation": "Rasm bir marta yuklangach, uni qayta kuzatish mantiqsiz va resurs sarflaydi, shuning uchun unobserve() chaqirish shart."
  },
  {
    "id": 12,
    "question": "Mutation Observer config sozlamasida attributeFilter nima vazifani bajaradi?",
    "options": [
      "Barcha atributlarni o'chiradi",
      "Faqat belgilangan unikal atributlar (masalan: ['class', 'style']) o'zgargandagina observer ishlashini ta'minlaydi",
      "Faqat matnlarni filtrlaydi",
      "Sanalarni tekshiradi"
    ],
    "correctAnswer": 1,
    "explanation": "attributeFilter orqali biz faqat qiziqtirgan atributlarni belgilab, boshqa keraksiz atributlar o'zgarganda observer keraksiz ishlamasligini ta'minlaymiz."
  }
]

};
