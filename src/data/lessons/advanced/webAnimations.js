export const webAnimations = {
  id: "webAnimations",
  title: "Web Animations API va requestAnimationFrame",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Animations API (WAAPI) nima?
**Web Animations API (WAAPI)** — bu brauzer ichida CSS animatsiyalarni (Keyframes, transitions) to'g'ridan-to'g'ri JavaScript yordamida dinamik boshqarish (play, pause, reverse, speed) imkonini beruvchi kuchli brauzer vositasidir.
U CSS kuchi va JS moslashuvchanligini birlashtiradi. Animatsiyalar GPU (protsessor) yordamida o'ta ravon chiziladi.

### \`requestAnimationFrame\` (rAF) nima?
**\`requestAnimationFrame\`** — bu brauzerga keyingi kadr chizilmasidan oldin (odatda soniyada 60 yoki 120 marta - FPS) ma'lum bir JS funksiyasini chaqirish haqidagi buyruqdir.
Agar siz JS-da o'yinlar yoki murakkab animatsiyalar yaratayotgan bo'lsangiz, vaqtni o'lchashda \`setTimeout\` yoki \`setInterval\` ishlatish xato. Chunki ular brauzer kadr chizish sikli (Refreshrate) bilan sinxron emas. \`requestAnimationFrame\` esa aynan kadr chizish bilan mukammal darajada sinxron ishlaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **multfilm chizuvchi rassomsiz**:
* **\`setInterval\` (Eski yomon usul):** Siz har 16 millisekundda budilnik chalishini o'rnatasiz. Budilnik chalinganda keyingi kadrni chizasiz. Agar budilnik brauzer kadrini chizayotgan millisekundga to'g'ri kelmay qolsa, multfilmingizda sakrashlar (kadr o'tishi kechikishi) yuz beradi (bu **Frame Drop** deyiladi).
* **\`requestAnimationFrame\` (Yangi optimal usul):** Siz budilnik ishlatmaysiz. Buning o'rniga, kadrni tayyorlab, operatorga *"Kamerani yoqishingiz bilan menga signal bering, keyingi rasmni qo'yaman"* deysiz. Operator kamerani yoqqanda (brauzer kadr chizishga tayyor bo'lganda) signal beradi va siz yangi kadrni silliq joylashtirasiz.
* **Web Animations API:** Bu tayyor **videomagnitofon**. Sizda play, pause, orqaga aylantirish (reverse) va tezlashtirish tugmalari bor. Siz har bir kadrni qo'lda chizmaysiz, shunchaki magnitofon tugmalarini JS orqali bosasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Web Animations API bilan elementni harakatlantirish)
Sodda qizil divni 1 soniyada o'ngga surish va aylanma qilish:
\`\`\`javascript
// HTML: <div id="box" style="width: 50px; height: 50px; background: red;"></div>

const box = document.getElementById('box');

// 1. Keyframes belgilash (CSS keyframes bilan bir xil)
const keyframes = [
  { transform: 'translateX(0px) rotate(0deg)' },
  { transform: 'translateX(300px) rotate(360deg)' }
];

// 2. Animatsiya sozlamalari
const options = {
  duration: 1000, // 1 soniya
  iterations: Infinity, // Cheksiz qaytarish
  direction: 'alternate', // Oldinga va orqaga
  easing: 'ease-in-out'
};

// 3. Animatsiyani boshlash
const animation = box.animate(keyframes, options);
\`\`\`
* **Natija:** Qizil quti silliq aylanib o'ngga suriladi va orqaga qaytadi.

### 2. Intermediate Example (WAAPI ustida boshqaruv - Play, Pause, Reverse)
Tugmalar orqali animatsiyani pauza qilish va orqaga aylantirish:
\`\`\`javascript
// Animatsiya obyektini saqlab olganmiz (oldingi misoldagi 'animation')

document.querySelector('#pause-btn').addEventListener('click', () => {
  animation.pause(); // Animatsiyani to'xtatish
});

document.querySelector('#play-btn').addEventListener('click', () => {
  animation.play(); // Davom ettirish
});

document.querySelector('#reverse-btn').addEventListener('click', () => {
  animation.reverse(); // Orqaga aylantirish
});

document.querySelector('#speed-btn').addEventListener('click', () => {
  animation.playbackRate = 2; // Tezlikni 2 barobar oshirish
});
\`\`\`
* **Qachon ishlatiladi:** Foydalanuvchi interaktiv boshqara oladigan murakkab UI komponentlarida.

### 3. Advanced Example (\`requestAnimationFrame\` bilan silliq JS animatsiya)
Elementni aniq vaqtga bog'liq ravishda (FPS mustaqil) o'ngga surish:
\`\`\`javascript
const box = document.getElementById('box');
let startTimestamp = null;
const duration = 2000; // 2 soniya davom etadi
const distance = 400; // 400 piksel masofa

function animate(timestamp) {
  if (!startTimestamp) startTimestamp = timestamp;
  const elapsed = timestamp - startTimestamp;

  // Vaqt foizini hisoblash (0.0 dan 1.0 gacha)
  const progress = Math.min(elapsed / duration, 1);
  
  // Elementni surish
  box.style.transform = \`translateX(\${progress * distance}px)\`;

  if (progress < 1) {
    // Kadr tugamagan bo'lsa, keyingi kadrni so'rash (Rekursiv)
    requestAnimationFrame(animate);
  }
}

// Boshlash
requestAnimationFrame(animate);
\`\`\`
* **Qachon ishlatiladi:** Murakkab JS o'yin sikllarida (Game loop) yoki animatsiya kutubxonalarini (masalan GreenSock kabi) yozayotganda.
* **Performance jihati:** \`timestamp\` brauzer tomonidan millisekundlarda beriladi va u FPS-dan qat'iy nazar harakatning silliqligini ta'minlaydi.

### 4. Production Example (Tugma bosilganda elementlarni sochib yuborish - Particle explosion)
WAAPI yordamida tugma bosilganda ko'plab kichik zarrachalarni (particles) silliq sochib yuborish:
\`\`\`javascript
function explode(x, y) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = \`\${x}px\`;
    p.style.top = \`\${y}px\`;
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const destX = Math.cos(angle) * 100;
    const destY = Math.sin(angle) * 100;

    const anim = p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: \`translate(\${destX}px, \${destY}px) scale(0)\`, opacity: 0 }
    ], {
      duration: 500 + Math.random() * 500,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    });

    anim.onfinish = () => p.remove(); // Animatsiya tugagach elementni o'chirish
  }
}
\`\`\`

### 5. Enterprise Example (Scroll linked animation using WAAPI)
Foydalanuvchi scroll qilganda sahifa o'qilish foizini (Progress bar) silliq ko'rsatish:
\`\`\`javascript
// Progress bar animatsiyasi (avtomatik o'ynab ketmaydi, pause holatida)
const scrollBar = document.getElementById('progress-bar');
const scrollAnim = scrollBar.animate([
  { width: '0%' },
  { width: '100%' }
], {
  duration: 1,
  fill: 'both'
});
scrollAnim.pause(); // To'xtatib qo'yamiz

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  
  const scrollPercent = window.scrollY / maxScroll;
  // Animatsiya foizini scroll foiziga tenglashtiramiz (0.0 - 1.0)
  scrollAnim.currentTime = scrollPercent; 
});
\`\`\`
* **Qachon ishlatiladi:** Premium darajadagi taqdimot veb-saytlarida scroll animatsiyalarini boshqarishda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Frame Drops (Kadrlar yo'qolishi):** \`setInterval\` ishlatilganda brauzer render siklidan chalg'iydi, natijada animatsiyada sakrashlar (lag) yuzaga keladi. \`requestAnimationFrame\` buni bartaraf etadi.
* **Xotira tejash (Battery saving):** Agar foydalanuvchi boshqa tabga (sahifaga) o'tib ketsa, \`requestAnimationFrame\` avtomatik ravishda to'xtaydi (pause bo'ladi). Bu esa protsessor yuklamasini va qurilma batareya quvvatini tejaydi. \`setInterval\` esa orqada ishlab turaverardi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`requestAnimationFrame\` ichida og'ir DOM amallarini yozish (Layout Thrashing)
#### Xato:
rAF sikli ichida har bir kadrda element kengligini o'qib, yana yangilash:
\`\`\`javascript
function step() {
  const w = box.offsetWidth; // Layout o'qish (reflow)
  box.style.width = (w + 1) + 'px'; // Layout yozish
  requestAnimationFrame(step);
}
\`\`\`
#### Nima uchun noto'g'ri:
Bir kadr ichida o'qish va yozishni aralashtirish brauzerni layoutni qayta chizishga majbur qiladi (forced synchronous layout), natijada FPS keskin tushib ketadi.
#### To'g'ri usul:
rAF ichida faqat CSS transformatsiyalarini (\`transform: translate\`) o'zgartirish. Ular layoutni buzmaydi, faqat GPU orqali kompozitsiya qilinadi.
#### Izoh:
Transform xossalari eng tez animatsiyalarni kafolatlaydi.

### 2. \`requestAnimationFrame\`ni to'xtatishni unutish (Infinite Loop)
#### Xato:
Animatsiya sharti tugasa ham rAF rekursiyasini davom ettiraverish.
#### Nima uchun noto'g'ri:
Kompyuter protsessori doimiy band bo'ladi va batareya tez tugaydi.
#### To'g'ri usul:
Shart bajarilgach, rekursiyani to'xtatish yoki \`cancelAnimationFrame(requestId)\` chaqirish.
#### Izoh:
Sikllarni nazorat qilish resurslarni tejaydi.

### 3. FPS-ga bog'liq tezlikni hisoblash (FPS Dependency)
#### Xato:
rAF ichida elementni har kadrda 5px o'ngga surish (\`x += 5\`).
#### Nima uchun noto'g'ri:
60Hz ekranli kompyuterda element soniyada $60 \\times 5 = 300\\text{px}$ surilsa, 120Hz ekranda $120 \\times 5 = 600\\text{px}$ surilib ketadi (2 barobar tezroq).
#### To'g'ri usul:
Harakat tezligini kadrga emas, o'tgan real vaqtga (\`timestamp\`) bog'lash shart (3-misolga qarang).
#### Izoh:
Barcha qurilmalarda bir xil tezlikda ishlashini ta'minlang.

### 4. Animatsiyadan keyin element oxirgi holatini saqlab qolmaslik (WAAPI fill xossasi)
#### Xato:
WAAPI orqali elementni 100px o'ngga surish, lekin animatsiya tugashi bilan u yana joyiga qaytib qolishi.
#### To'g'ri usul:
Options qismida \`fill: 'forwards'\` parametrini qo'shish.
#### Izoh:
Bu CSS-dagi \`animation-fill-mode: forwards\` bilan bir xil.

### 5. Ko'p elementlarni alohida \`requestAnimationFrame\` bilan boshqarish
#### Xato:
100 ta zarrachani harakatlantirish uchun 100 ta alohida \`requestAnimationFrame\` chaqirish.
#### To'g'ri usul:
Bitta umumiy \`requestAnimationFrame\` siklini yaratib, uning ichida massivdagi 100 ta element koordinatalarini yangilash.
#### Izoh:
Yagona animatsiya boshqaruvchisi (Single Loop) samaralidir.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Web Animations API nima?
   * **Javob:** CSS animatsiyalarni JavaScript orqali dinamik (play, pause, reverse) boshqarish imkonini beruvchi brauzer API-si.

2. **Savol:** \`requestAnimationFrame\` nima uchun \`setInterval\`ga qaraganda yaxshiroq?
   * **Javob:** U brauzer kadr chizish tezligi (refresh rate) bilan sinxron ishlaydi, frame drop-larni kamaytiradi va fon tablarida protsessorni to'xtatadi.

3. **Savol:** WAAPI da animatsiyani qanday to'xtatamiz?
   * **Javob:** \`animation.pause()\` orqali.

4. **Savol:** rAF qabul qiladigan callback funksiyaga brauzer qanday parametr uzatadi?
   * **Javob:** Hozirgi aniq vaqtni ifodalovchi yuqori aniqlikdagi vaqt tamg'asi (\`timestamp\` - millisekundlarda).

### Middle (5–8)
5. **Savol:** rAF ichida layout thrashing nima va uni qanday oldini olasiz?
   * **Javob:** Kadr ichida DOM-ni ketma-ket o'qib-yozish natijasida brauzer layoutni qayta chizishga majbur bo'lishi. Buni oldini olish uchun faqat \`transform\` va \`opacity\` o'zgartiriladi.

6. **Savol:** \`cancelAnimationFrame\` nima uchun kerak va u qanday ishlaydi?
   * **Javob:** rAF rejalashtirgan keyingi kadr chaqiruvini bekor qilish uchun. Buning uchun rAF qaytargan ID ishlatiladi.

7. **Savol:** WAAPI-da \`playbackRate\` nima vazifa bajaradi?
   * **Javob:** Animatsiya tezligini oshirish yoki kamaytirish (masalan: 2.0 tezlashtirish, -1.0 teskari aylantirish).

8. **Savol:** WAAPI tugaganini (finish) JS-da qanday eshitamiz?
   * **Javob:** \`animation.onfinish = callback\` xossasi yoki \`animation.finished\` Promisi orqali.

### Senior (9–12)
9. **Savol:** Pixel Pipeline (Brauzer chizish zanjiri) bosqichlari qaysilar va nima uchun animatsiyalarda faqat \`transform\` va \`opacity\` xossalarini o'zgartirish tavsiya etiladi?
   * **Javob:** Zanjir: JS -> Style -> Layout -> Paint -> Composite. \`transform\` va \`opacity\` o'zgarganda Layout va Paint bosqichlari chetlab o'tilib, birdan Composite (GPU) ishlaydi.

10. **Savol:** Qurilma 60Hz, 120Hz yoki 144Hz bo'lganida \`requestAnimationFrame\` qanday moslashadi?
    * **Javob:** rAF avtomatik ravishda monitor chastotasiga mos ravishda ishlaydi (soniyada 60, 120 yoki 144 marta chaqiriladi). Shuning uchun harakat tezligi kadrlar soniga emas, real vaqtga (\`timestamp\`) bog'lanishi shart.

11. **Savol:** WAAPI yordamida yuzlab elementlarni harakatlantirish va CSS transitions o'rtasidagi CPU/GPU yuklamasi farqi nimada?
    * **Javob:** WAAPI ham, CSS ham brauzerning ichki animatsiya dvigatelidan (C++ darajasida) foydalanadi va GPU-da ishlaydi. Ammo WAAPI bizga JS orqali DOM-ga yangi stillar yozish yuklamasisiz (style recalculation) animatsiyani bevosita boshqarish imkonini beradi.

12. **Savol:** PWA va mobil ilovalarda rAF va batareya quvvati (battery consumption) o'rtasidagi bog'liqlikni tushuntiring.
    * **Javob:** Agar foydalanuvchi ilovani yopib, orqa fonga o'tkazsa (background tab), brauzer resurslarni tejash uchun rAF chaqiruvlarini 0 ga tushiradi (to'xtatadi). Bu batareya quvvatini tejaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Premium taqdimot sayti uchun Scroll-Linked 3D silliq animatsiya
Apple saytlaridagi kabi, foydalanuvchi pastga scroll qilganda rasm silliq aylanib kattalashishi kerak.

#### Yechim:
Biz WAAPI va scroll hodisasini bog'laymiz. Scroll tez o'zgargani uchun, silliqlikni ta'minlash maqsadida kadrlar boshqaruvini rAF orqali amalga oshiramiz:
\`\`\`javascript
const box = document.querySelector('.macbook-3d');
const anim = box.animate([
  { transform: 'rotateY(0deg) scale(0.8)' },
  { transform: 'rotateY(180deg) scale(1.2)' }
], { duration: 1, fill: 'both' });
anim.pause();

let targetScroll = 0;
let currentScroll = 0;

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  targetScroll = window.scrollY / max;
});

function smoothRender() {
  // LERP (Linear Interpolation) yordamida scrollni silliqlashtirish
  currentScroll += (targetScroll - currentScroll) * 0.1;
  anim.currentTime = currentScroll;
  requestAnimationFrame(smoothRender);
}
requestAnimationFrame(smoothRender);
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Avoid Layout Thrashing:** rAF ichida element o'lchamlarini o'qimang.
* **Use Will-change:** Animatsiya qilinadigan elementga CSS-da \`will-change: transform;\` berish brauzerni uni GPU qatlamiga oldindan tayyorlashga undaydi.

---

## 10. 📌 Cheat Sheet

| Asbob | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **animate()** | \`el.animate(keyframes, options)\` | WAAPI animatsiya boshlash | GPU da ishlaydi |
| **play() / pause()** | \`anim.play(); anim.pause();\` | Animatsiya holati | Dinamik boshqaruv |
| **requestAnimationFrame** | \`requestAnimationFrame(callback)\` | Keyingi kadrda funksiya chaqirish| Monitor tezligiga moslashadi|
| **cancelAnimationFrame** | \`cancelAnimationFrame(id)\` | rAF-ni bekor qilish | ID-dan foydalaniladi |
| **playbackRate** | \`anim.playbackRate = 2.0\` | Animatsiya tezligi | manfiy son orqaga aylantiradi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Pulsatsiya Animatsiyasi (WAAPI)",
    "instruction": "Berilgan elementni (`el`) 500 millisekund davomida shaffofligini (`opacity`) `1` dan `0.3` gacha cheksiz ravishda (`iterations: Infinity`), oldinga-orqaga (`direction: 'alternate'`) o'zgaruvchan qiluvchi animatsiyani boshlang va Animation obyektini qaytaring.",
    "startingCode": "function startPulse(el) {\n  // Kodni yozing\n}",
    "hint": "return el.animate([{ opacity: 1 }, { opacity: 0.3 }], { duration: 500, iterations: Infinity, direction: 'alternate' });",
    "test": "try { const div = document.createElement('div'); const anim = startPulse(div); if(!anim || typeof anim.pause !== 'function') return 'Animatsiya obyekti qaytarilmadi'; if(anim.effect.getTiming().duration !== 500) return 'Duration 500ms bo\\'lishi shart'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Kadrlar Sanagichi (rAF)",
    "instruction": "`requestAnimationFrame` yordamida roppa-rosa 3 ta kadr davomida ishlaydigan va keyin to'xtaydigan asinxron loop yozing. Har bir kadrda berilgan `callback` funksiyasi chaqirilsin.",
    "startingCode": "function countThreeFrames(callback) {\n  let count = 0;\n  function step() {\n    count++;\n    callback();\n    if (count < 3) {\n      requestAnimationFrame(step);\n    }\n  }\n  requestAnimationFrame(step);\n}",
    "hint": "Kodni diqqat bilan o'rganing. U 3 ta kadr bajarilgach rAF chaqirishni to'xtatadi.",
    "test": "try { let calls = 0; countThreeFrames(() => { calls++; }); return new Promise((resolve) => { setTimeout(() => { if(calls === 3) resolve(null); else resolve('Callback roppa-rosa 3 marta chaqirilishi kerak, lekin ' + calls + ' marta chaqirildi'); }, 100); }); } catch(e) { return 'Xato: ' + e.message; }"
  },
  {
    "id": 3,
    "title": "Tezlikni Boshqarish",
    "instruction": "Berilgan animatsiyaning tezligini (`playbackRate`) 2 barobar oshiradigan `doubleSpeed(animation)` funksiyasini yozing.",
    "startingCode": "function doubleSpeed(animation) {\n  // Kodni yozing\n}",
    "hint": "animation.playbackRate = 2;",
    "test": "try { const div = document.createElement('div'); const anim = div.animate([{opacity: 1}, {opacity: 0}], 100); doubleSpeed(anim); if(anim.playbackRate !== 2) return 'playbackRate 2 ga tenglashtirilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Web Animations API nima vazifani bajaradi?",
    "options": [
      "Animatsion rasmlarni yuklaydi",
      "CSS animatsiyalarni JavaScript orqali dinamik (play, pause, speed) boshqarish imkonini beradi",
      "CSS-ni butunlay o'chirib tashlaydi",
      "Ovozli fayllarni ijro etadi"
    ],
    "correctAnswer": 1,
    "explanation": "Web Animations API brauzer darajasida CSS animatsiyalarni bevosita JavaScript klasslari va metodlari yordamida boshqarish imkonini beruvchi standart API hisoblanadi."
  },
  {
    "id": 2,
    "question": "requestAnimationFrame (rAF) operatorining setTimeout-dan asosiy afzalligi nimada?",
    "options": [
      "U faqat o'yinlarda ishlaydi",
      "U brauzer kadr chizish sikli (refresh rate) bilan sinxron ishlaydi, fon tablarida ishlashni to'xtatib batareyani tejaydi",
      "U sinxron ishlaydi",
      "U xotirani o'chirib yuboradi"
    ],
    "correctAnswer": 1,
    "explanation": "requestAnimationFrame kadr chizilayotgan millisekundlarda ishga tushadi, bu jank (kadrdan sakrash) muammosini yo'qotadi va fon tablarida batareyani tejaydi."
  },
  {
    "id": 3,
    "question": "Web Animations API-da yaratilgan animatsiyani vaqtinchalik to'xtatish uchun qaysi metod ishlatiladi?",
    "options": ["stop()", "pause()", "halt()", "freeze()"],
    "correctAnswer": 1,
    "explanation": "yaratilgan animatsiya obyekti ustida 'animation.pause()' chaqirilsa, animatsiya joriy kadrda vaqtinchalik muzlaydi."
  },
  {
    "id": 4,
    "question": "requestAnimationFrame callback funksiyasiga brauzer qanday parametr yuboradi?",
    "options": [
      "Sana formatini",
      "Yuqori aniqlikdagi vaqt tamg'asini (high-resolution timestamp - millisekundlarda)",
      "Kadrlar sonini",
      "Ekran o'lchamlarini"
    ],
    "correctAnswer": 1,
    "explanation": "rAF callback funksiyasi parametr sifatida millisekundlarda o'lchanadigan aniq vaqtni (timestamp) oladi, bu harakat tezligini vaqtga bog'lash imkonini beradi."
  },
  {
    "id": 5,
    "question": "rAF ichidagi 'Layout Thrashing' (render qotishi) muammosiga nima sabab bo'ladi?",
    "options": [
      "Faqat rasmlarni o'zgartirish",
      "Bitta kadr ichida DOM-dan ma'lumot o'qish (offsetwidth va h.k.) va darhol DOM-ga yozishni aralashtirish",
      "CSS ranglarini ishlatish",
      "Ko'p div-lar yaratish"
    ],
    "correctAnswer": 1,
    "explanation": "Bir kadrda DOM element o'lchamlarini o'qish va yozishni ketma-ket bajarish brauzerni layoutni qayta hisoblashga majburlaydi (reflow) va kadr tezligini pasaytiradi."
  },
  {
    "id": 6,
    "question": "Web Animations API-da animatsiya tugashini (finish) Promise yordamida qanday eshitish mumkin?",
    "options": ["animation.onfinish", "animation.finished Promisi orqali", "animation.then()", "animation.await()"],
    "correctAnswer": 1,
    "explanation": "animation.finished xossasi Promise qaytaradi. Uni await yoki .then() orqali kutib olib, animatsiya tugaganidan so'ng kod bajarish mumkin."
  },
  {
    "id": 7,
    "question": "rAF sikli tomonidan rejalashtirilgan keyingi kadr chaqiruvini bekor qilish uchun qaysi funksiya ishlatiladi?",
    "options": ["clearTimeout()", "cancelAnimationFrame()", "stopAnimationFrame()", "clearAnimationFrame()"],
    "correctAnswer": 1,
    "explanation": "cancelAnimationFrame(requestId) yordamida navbatdagi kadr animatsiyasini bekor qilish mumkin."
  },
  {
    "id": 8,
    "question": "Nima uchun animatsiyalarda faqat transform (translate, scale, rotate) va opacity xossalarini o'zgartirish tavsiya etiladi?",
    "options": [
      "Ular eng chiroyli stillar",
      "Ular Layout va Paint bosqichlarini chetlab o'tib, GPU orqali Composite bosqichida o'ta tez va silliq chiziladi",
      "Ular CSS talab qilmaydi",
      "Baza boshqa xossalarni tushunmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Transform va opacity xossalari brauzerning layout va paint bosqichlarini yuklamasdan, to'g'ridan-to'g'ri grafik protsessorda (GPU) ishlov beriladi, bu esa 60+ FPS beradi."
  },
  {
    "id": 9,
    "question": "WAAPI-da animatsiya tezligini (playback rate) boshqarish xossasi qaysi?",
    "options": ["speed", "playbackRate", "rate", "velocity"],
    "correctAnswer": 1,
    "explanation": "playbackRate atributi animatsiya tezligini belgilaydi (masalan, 2.0 ikki barobar tezlashtiradi, -1.0 orqaga aylantiradi)."
  },
  {
    "id": 10,
    "question": "Tashqaridagi global scroll mantiqini WAAPI animatsiyasi bilan bog'lashda qaysi xossaga scroll foizi o'rnatiladi?",
    "options": ["duration", "currentTime", "startTime", "playState"],
    "correctAnswer": 1,
    "explanation": "currentTime xossasiga scroll foizi orqali olingan vaqt (milisekundlar) yoziladi, bu esa scroll-ga bog'liq animatsiyani boshqaradi."
  },
  {
    "id": 11,
    "question": "requestAnimationFrame monitorning refresh rate (chastotasi) 144Hz bo'lganda soniyada necha marta ishlaydi?",
    "options": ["Har doim 60 marta", "144 marta", "120 marta", "Monitorga bog'liq emas"],
    "correctAnswer": 1,
    "explanation": "rAF avtomatik ravishda foydalanuvchi monitori chastotasiga moslashadi, shuning uchun 144Hz li monitorda u soniyada 144 marta ishga tushadi."
  },
  {
    "id": 12,
    "question": "WAAPI-da animatsiya tugagach element oxirgi holatida (masalan transform o'ngga surilgan holda) qolishi uchun qaysi parametr beriladi?",
    "options": ["fill: 'forwards'", "fill: 'backward'", "keep: true", "freeze: true"],
    "correctAnswer": 0,
    "explanation": "fill: 'forwards' xossasi animatsiya yakunlangach, elementni uning oxirgi kadr stili bilan saqlab qoladi."
  }
]

};
