export const audioVideo = {
  id: "audioVideo",
  title: "Audio va Video API: Media Elementlarini Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Audio va Video API (HTMLMediaElement) nima?
**Audio va Video API** — bu brauzerga o'rnatilgan audio (\`<audio>\`) va video (\`<video>\`) fayllarni JavaScript yordamida dasturiy boshqarish (o'ynatish, to'xtatish, ovozni sozlash, tezlikni o'zgartirish) imkonini beruvchi interfeysdir. HTML-dagi pleyer faqat visual element bo'lsa, JavaScript bizga uning orqasidagi "miya" vazifasini bajarib beradi.

### Real hayotiy o'xshatish
Tasavvur qiling, sizda **avtomobil magnitolasi** va uning **masofaviy pulti (remote control)** bor:
* **Magnitola (HTML media elementi):** Qo'shiqlarni ijro qiluvchi va ovoz chiqaruvchi asosiy qurilma.
* **Pult (JavaScript Media API):** Magnitolani uzoqdan boshqaruvchi tugmalar to'plami:
  * \`play()\` tugmasi — gazni bosib harakatni (ijroni) boshlash.
  * \`pause()\` tugmasi — tormozni bosib vaqtincha to'xtash.
  * \`currentTime\` — kassetani qo'lda aylantirib, qo'shiqning ma'lum soniyasiga (masalan, 2-daqiqasiga) o'tkazish.
  * \`volume\` — ovozni baland yoki past qiluvchi burama murvat.
  * \`muted\` — ovozni bir zumda o'chirib qo'yuvchi Mute (tovushsiz) tugmasi (lekin original ovoz darajasini o'zgartirmaydi).
  * \`timeupdate\` (hodisa) — magnitola ekranida har soniyada o'zgarib turadigan elektron soniyalar hisoblagichi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Play va Pause)
Videoni dasturiy boshqarish va brauzerning avtomatik o'ynatish (autoplay block) cheklovini to'g'ri hal qilish:
\`\`\`javascript
const video = document.getElementById("my-video");

// play() va'da (Promise) qaytargani uchun .catch yordamida autoplay cheklovini tutamiz
function startPlayback() {
  video.play()
    .then(() => {
      console.log("Video muvaffaqiyatli o'ynay boshladi!");
    })
    .catch(error => {
      console.warn("Avtomatik o'ynatish taqiqlandi. Foydalanuvchi klik qilishi kutilmoqda:", error);
    });
}

// 5 soniyadan keyin videoni to'xtatish
setTimeout(() => {
  if (!video.paused) {
    video.pause();
    console.log("Video vaqtincha to'xtatildi.");
  }
}, 5000);
\`\`\`

### 2. Intermediate Example (Mute va Tezlikni sozlash)
Ovoz rejimini almashtirish va ijro tezligini dinamik sozlash:
\`\`\`javascript
const audio = document.getElementById("my-audio");

// Ovozni yoqish/o'chirish (Mute Toggle)
function toggleMute() {
  audio.muted = !audio.muted;
  console.log(audio.muted ? "Ovoz o'chirildi" : "Ovoz yoqildi");
}

// Ovoz balandligini 70% ga sozlash (0.0 dan 1.0 gacha)
function setVolumeToSeventy() {
  audio.volume = 0.7;
}

// Ijro tezligini 1.5 barobar oshirish (darslarni tez ko'rish uchun)
function setSpeedOneAndHalf() {
  audio.playbackRate = 1.5;
}
\`\`\`

### 3. Advanced Example (Custom Progress Bar)
Vaqt yangilanishini kuzatish (\`timeupdate\`) va foydalanuvchiga progress bar-ni chizish:
\`\`\`javascript
const video = document.getElementById("video-player");
const progressBar = document.getElementById("progress");

// Video o'ynayotgan vaqtda joriy vaqtni doimiy kuzatib boramiz
video.addEventListener("timeupdate", () => {
  if (video.duration) {
    // Foizni hisoblaymiz: (joriy vaqt / umumiy vaqt) * 100
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = \`\${percentage}%\`;
  }
});

// Progress bar ustiga bosilganda videoni o'sha joyga o'tkazish
const progressContainer = document.getElementById("progress-container");
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left; // Bosilgan joy koordinatasi
  const width = rect.width;             // Progress bar kengligi
  
  // Bosilgan joy nisbati orqali yangi vaqtni hisoblaymiz
  const clickPercentage = clickX / width;
  video.currentTime = clickPercentage * video.duration;
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### HTMLMediaElement Interfeysi va Merosxo'rlik
Brauzerda \`<audio>\` va \`<video>\` teglari JavaScript-da turli xil elementlar kabi ko'rinsa-da, aslida ularning ikkalasi ham bitta umumiy **\`HTMLMediaElement\`** prototipidan meros oladi. Shuning uchun ular bir xil metodlar (\`play()\`, \`pause()\`, \`load()\`) va xossalarga (\`volume\`, \`currentTime\`, \`duration\`, \`paused\`).

### Brauzerlarning Autoplay Siyosati (Autoplay Policy)
Zamonaviy brauzerlar foydalanuvchi tajribasini himoya qilish va internet trafigini tejash maqsadida sahifa yuklanganda ovozli media fayllarni avtomatik o'ynatishni taqiqlaydi. 
* **Autoplay ishlashi shartlari:**
  1. Media elementida \`muted\` xossasi \`true\` bo'lek bo'lishi kerak.
  2. Yoki foydalanuvchi sahifada kamida bir marta faol harakat qilgan bo'lishi (klik qilishi, tugmani bosishi) kerak.
* Agar ushbu shartlar bajarilmasa, \`play()\` metodi qaytargan Promise **\`NotAllowedError\`** bilan rad etiladi.

### Buffering (Buferlash) jarayoni
Media to'liq yuklanmasdan turib ham o'ynay boshlaydi. Buning sababi brauzer faylni bo'laklab yuklaydi (streaming).
* **\`buffered\`** xossasi \`TimeRanges\` obyektini qaytaradi. Unda brauzer media faylning aynan qaysi qismlarini yuklab bo'lganligi haqida vaqt segmentlari saqlanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Metama'lumotlar yuklanmasdan oldin \`duration\`ni o'qish (NaN)
Video yuklanishi bilanoq uning davomiyligini (\`duration\`) o'qishga harakat qilganda \`NaN\` qiymati qaytadi, chunki brauzer hali fayl hajmi va uzunligini aniqlashga ulgurmagan bo'ladi.
\`\`\`javascript
// XATO:
const myVideo = document.createElement("video");
myVideo.src = "movie.mp4";
console.log(myVideo.duration); // NaN

// TO'G'RI:
myVideo.addEventListener("loadedmetadata", () => {
  console.log(myVideo.duration); // Soniyalarda to'g'ri qiymat qaytadi
});
\`\`\`

### 2. Ovoz darajasini belgilangan diapazondan tashqarida berish
Ovoz balandligi (\`volume\`) xususiyati faqat \`0.0\` va \`1.0\` orasidagi son bo'lishi mumkin.
\`\`\`javascript
// XATO:
video.volume = 80; // IndexSizeError xatoligi otiladi va kod to'xtaydi!

// TO'G'RI:
video.volume = 0.8; // 80% ovoz balandligi
\`\`\`

### 3. \`play()\` metodini xatolikni tutmasdan chaqirish
Brauzer autoplay-ni blocklaganda xatolik yuz beradi. Agar uni \`.catch()\` bilan tutmasangiz, konsolda qizil xatoliklar paydo bo'ladi.
\`\`\`javascript
// XATO:
video.play(); // Konsolda: Uncaught (in promise) DOMException: play() failed...

// TO'G'RI:
video.play().catch(error => {
  showPlayButtonOnUI(); // UI-da foydalanuvchiga play tugmasini ko'rsatish
});
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1-4)
1. **Savol:** \`<audio>\` va \`<video>\` elementlarini boshqaruvchi umumiy JavaScript klassi nima?
   * **Javob:** Har ikkala element ham **\`HTMLMediaElement\`** klassidan (prototipidan) meros oladi va uning xususiyatlarini ishlatadi.
2. **Savol:** Media pleyerni vaqtincha to'xtatish va to'liq o'chirish o'rtasida qanday farq bor?
   * **Javob:** Media elementlarida \`stop()\` metodi mavjud emas. To'xtatish uchun \`pause()\` chaqiriladi. Uni butunlay boshidan boshlash uchun \`pause()\` qilib, keyin \`currentTime = 0\` o'rnatiladi.
3. **Savol:** Media fayl butunlay ijro etilib bo'linganligini qaysi event orqali aniqlaymiz?
   * **Javob:** \`'ended'\` hodisasi (event) orqali aniqlanadi. Masalan, musiqa tugagach keyingisiga o'tishda ishlatiladi.
4. **Savol:** Nima uchun \`video.play()\` ba'zida konsolda xatolik qaytaradi?
   * **Javob:** Brauzerlarning Autoplay Policy (Avtomatik ijro siyosati) tufayli ovozli videolarni sahifa ochilishi bilan foydalanuvchi aralashuvisiz o'ynatib bo'lmaydi.

### Middle Darajasi (5-8)
5. **Savol:** \`muted = true\` va \`volume = 0\` o'rtasida qanday amaliy farq bor?
   * **Javob:** \`muted = true\` qilinganda ovoz o'chadi, lekin ovoz darajasi (volume) o'zgarmaydi. Mute o'chirilganda avvalgi ovoz balandligi qaytadi. \`volume = 0\` esa ovoz darajasini nolga tushiradi va avvalgi darajani eslab qolmaydi.
6. **Savol:** \`playbackRate\` nima va unga manfiy qiymat berish mumkinmi?
   * **Javob:** \`playbackRate\` ijro etish tezligini boshqaradi (masalan, \`0.5\` - sekin, \`2.0\` - tez). HTML5 standartiga ko'ra ba'zi brauzerlar orqaga o'ynatish uchun manfiy qiymatlarni qo'llashi belgilangan bo'lsa-da, amalda ko'pgina zamonaviy brauzerlar buni qo'llab-quvvatlamaydi va manfiy qiymat berilsa ijro to'xtaydi yoki xatolik yuz beradi.
7. **Savol:** Musiqa ijro etilayotganda buferlangan (yuklangan) qismlarni qanday ko'rish mumkin?
   * **Javob:** Elementning \`buffered\` xossasi orqali. U \`TimeRanges\` obyektini qaytaradi va undan yuklangan qismlarning boshlanish (\`start(i)\`) va tugash (\`end(i)\`) vaqtlarini olish mumkin.
8. **Savol:** \`loadedmetadata\` va \`loadeddata\` hodisalari farqi nimada?
   * **Javob:** \`loadedmetadata\` faqat metama'lumotlar (davomiyligi, o'lchamlari, format) yuklanganda ishlaydi. \`loadeddata\` esa brauzer birinchi freymni (videoning birinchi tasvirini) yuklab bo'lganda ishga tushadi.

### Senior Darajasi (9-12)
9. **Savol:** \`readyState\` xususiyati nima va uning qiymatlari nimani bildiradi?
   * **Javob:** \`readyState\` medianing hozirgi vaqtda ijroga tayyorlik holatini raqamlar orqali ko'rsatadi:
     * \`0\` (HAVE_NOTHING) — media haqida ma'lumot yo'q.
     * \`1\` (HAVE_METADATA) — metama'lumotlar bor.
     * \`2\` (HAVE_CURRENT_DATA) — joriy kadr bor, lekin keyingisi yuklanmagan (ijro davom etolmaydi).
     * \`3\` (HAVE_FUTURE_DATA) — ijro davom etishi mumkin, lekin keyinroq buferlash kerak bo'lishi mumkin.
     * \`4\` (HAVE_ENOUGH_DATA) — media to'liq yoki yetarli darajada yuklangan, to'xtovsiz o'ynay oladi.
10. **Savol:** Media Source Extensions (MSE) nima va u qachon kerak bo'ladi?
    * **Javob:** MSE — bu JavaScript-ga video oqimini dinamik ravishda bo'laklab (chunks) media elementiga uzatish imkonini beruvchi API. U HLS (HTTP Live Streaming) yoki DASH kabi moslashuvchan video oqimlarini (adaptive streaming) yaratish va video sifatini internet tezligiga qarab o'zgartirish uchun ishlatiladi.
11. **Savol:** Custom video pleyerda \`timeupdate\` hodisasidan foydalanish xotira va ishlash unumdorligiga qanday ta'sir qiladi va uni qanday optimallashtirish mumkin?
    * **Javob:** \`timeupdate\` hodisasi soniyasiga 4 dan 25 martagacha chaqirilishi mumkin. Uning ichida og'ir DOM manipulyatsiyalarini bajarish sahifani qotishiga (jank) olib keladi. Optimallashtirish uchun vaqtni yaxlitlab (soniyalarda), faqat soniya o'zgargandagina UI-ni yangilash kerak yoki \`requestAnimationFrame\` dan foydalanish lozim.
12. **Savol:** SPA (React/Vue) ilovalarida media elementlaridan foydalanganda xotira sizib chiqishi (memory leak) qanday yuzaga keladi?
    * **Javob:** Agar komponent o'chirilganda (unmount) video pleyer \`pause()\` qilinmasa va event listener-lar tozalanmasa, audio orqa fonda chalinishda davom etishi va xotira elementlari o'chmasdan qolishi mumkin. Buni oldini olish uchun unmount-da \`src\` bo'shatilib, \`load()\` chaqiriladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi HTML5 media elementining JavaScript yordamida boshqariladigan holatlar mashinasi (State Machine) va unga bog'liq hodisalarni (events) grafik shaklda tasvirlaydi:

\`\`\`mermaid
stateDiagram-v2
    [*] --> Unloaded : src belgilanmagan
    Unloaded --> Loading : src yuklanishi / load() chaqirildi
    Loading --> LoadedMetadata : loadedmetadata (duration ma'lum)
    LoadedMetadata --> Paused : yuklanib bo'lindi (suspend/paused)
    
    Paused --> Playing : play() chaqirildi / playing hodisasi
    Playing --> Paused : pause() chaqirildi / pause hodisasi
    
    Playing --> Playing : timeupdate hodisasi (vaqt o'zgarganda)
    Playing --> Playing : volumechange hodisasi (ovoz sozlanganda)
    
    Playing --> Ended : ended hodisasi (media oxiriga yetdi)
    Ended --> Playing : play() chaqirildi (yoki loop=true bo'lsa avtomat)
    Ended --> Paused : currentTime = 0 o'rnatildi
\`\`\`

* **Play/Pause:** Media ijrosining asosiy holatlari.
* **Volume Change & Timeupdate:** Ijro jarayonida faol ravishda yuz berib turadigan va UI-ni yangilash uchun xizmat qiladigan hodisalar.
* **Ended:** Ijro tugaganda keyingi treklarni boshqarish nuqtasi.

Amaliy mashqlar \`/Users/farhod/Desktop/github/js-uz/scratch/audioVideo_exercises.json\` faylida berilgan. Ularni bajarish orqali media boshqaruvini mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Darsimizning quizzes bo'limida siz HTML5 Media API, uning xususiyatlari, brauzer cheklovlari va metodlari bo'yicha tayyorlangan 12 ta test savolini topasiz. Ularni yechib darsni qay darajada o'zlashtirganingizni sinab ko'ring.

Savollar \`/Users/farhod/Desktop/github/js-uz/scratch/audioVideo_quizzes.json\` faylida joylagan.

---

## 8. 🎯 Real Project Case Study

### Custom Video Pleyer (Custom Video Player)
Ushbu loyihada biz brauzerning standart video boshqaruv tugmalarini o'chirib, o'zimizning shaxsiy Play, Mute, Ovoz sozlagich va progress bar-ga ega bo'lgan boshqaruv panelimizni yaratamiz:

\`\`\`javascript
// HTML:
// <div id="player-container">
//   <video id="my-video" src="video.mp4" width="600"></video>
//   <div class="controls">
//     <button id="play-btn">▶ Play</button>
//     <button id="mute-btn">🔊 Mute</button>
//     <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="0.8">
//     <div id="progress-container" style="background:#ccc; height:10px; cursor:pointer;">
//       <div id="progress-bar" style="background:red; width:0%; height:100%;"></div>
//     </div>
//     <span id="time-display">00:00 / 00:00</span>
//   </div>
// </div>

const video = document.querySelector("#my-video");
const playBtn = document.querySelector("#play-btn");
const muteBtn = document.querySelector("#mute-btn");
const volumeSlider = document.querySelector("#volume-slider");
const progressBar = document.querySelector("#progress-bar");
const progressContainer = document.querySelector("#progress-container");
const timeDisplay = document.querySelector("#time-display");

// 1. Play/Pause rejimlarini almashtirish
function togglePlay() {
  if (video.paused || video.ended) {
    video.play()
      .then(() => { playBtn.textContent = "⏸ Pause"; })
      .catch(err => console.warn("Autoplay bloklandi:", err));
  } else {
    video.pause();
    playBtn.textContent = "▶ Play";
  }
}

playBtn.addEventListener("click", togglePlay);

// 2. Ovozni butunlay o'chirish / yoqish (Mute Toggle)
function toggleMute() {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇 Unmute" : "🔊 Mute";
}

muteBtn.addEventListener("click", toggleMute);

// 3. Slider orqali ovoz balandligini sozlash
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = false; // Slider ishlatilganda ovoz avtomat yonadi
  muteBtn.textContent = video.volume === 0 ? "🔇 Unmute" : "🔊 Mute";
});

// 4. Vaqt ko'rsatkichi va Progress bar-ni yangilash
video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = \`\${percent}%\`;
  
  // Vaqtni formatlash: soniyalarni MM:SS ko'rinishiga o'tkazish
  const format = (seconds) => {
    const min = String(Math.floor(seconds / 60) || 0).padStart(2, "0");
    const sec = String(Math.floor(seconds % 60) || 0).padStart(2, "0");
    return \`\${min}:\${sec}\`;
  };
  
  timeDisplay.textContent = \`\${format(video.currentTime)} / \${format(video.duration)}\`;
});

// 5. Progress barga klik qilib videoni kerakli joyga o'tkazish (Seeking)
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const clickPercent = clickX / width;
  
  video.currentTime = clickPercent * video.duration;
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **\`preload\` atributidan to'g'ri foydalaning:**
  HTML-da media elementlariga \`preload\` atributini berish mumkin:
  * \`preload="none"\`: Foydalanuvchi play tugmasini bosmaguncha hech qanday ma'lumot yuklanmaydi (trafikni tejash uchun eng yaxshi usul).
  * \`preload="metadata"\`: Faqat video davomiyligi va formati yuklanadi (NaN xatosini oldini oladi va trafikni ko'p sarflamaydi).
  * \`preload="auto"\`: Sahifa yuklanishi bilan butun video orqa fonda yuklana boshlaydi (autoplay bo'lsa yoki video asosiy kontent bo'lsa qulay).

* **\`timeupdate\` ichidagi kodni kamaytiring (Throttling):**
  UI-da vaqtni har 250ms dan ortiq yangilash inson ko'zi uchun sezilarsiz bo'ladi. Agar soniyalarni MM:SS ko'rinishida chiqarmoqchi bo'lsangiz, faqat soniyaning butun qismi o'zgargandagina DOM-ni yangilang:
  \`\`\`javascript
  let lastSecond = -1;
  video.addEventListener("timeupdate", () => {
    const currentSec = Math.floor(video.currentTime);
    if (currentSec !== lastSecond) { // faqat yangi soniyaga o'tganda ishlaydi
      lastSecond = currentSec;
      updateTimeDisplay(currentSec);
    }
  });
  \`\`\`

* **Xotirani ozod qilish (Clean-up):**
  SPA platformalarida (React, Vue, Svelte) komponent unmount bo'lganda media yuklanishini to'liq to'xtatish xotira va tarmoq yuklanishini kamaytiradi:
  \`\`\`javascript
  // Komponent yo'qolganda:
  video.pause();
  video.removeAttribute("src"); // manbani o'chirish
  video.load();                 // pleyerni bo'shatish
  \`\`\`

---

## 10. 📌 Cheat Sheet

### Asosiy Metodlar
| Metod | Vazifasi | Qaytaradigan qiymati |
| :--- | :--- | :--- |
| \`play()\` | Medianing ijrosini boshlaydi | \`Promise<void>\` |
| \`pause()\` | Ijroni vaqtincha to'xtatadi | \`void\` |
| \`load()\` | Yangi o'rnatilgan manbani (\`src\`) qaytadan yuklaydi | \`void\` |
| \`canPlayType(mimeType)\` | Brauzer ushbu formatni o'ynata olishini tekshiradi | \`'probably'\`, \`'maybe'\` yoki \`''\` |

### Asosiy Xossalar (Properties)
| Xossa | Vazifasi | Turi / Diapazoni | O'qish/Yozish |
| :--- | :--- | :--- | :--- |
| \`currentTime\` | Joriy ijro vaqti (soniyalarda) | \`Number\` | O'qish va Yozish |
| \`duration\` | Medianing umumiy vaqti (soniyalarda) | \`Number\` | Faqat o'qish |
| \`volume\` | Ovoz balandligi | \`0.0\` dan \`1.0\` gacha | O'qish va Yozish |
| \`muted\` | Ovoz o'chirilganligi | \`Boolean\` | O'qish va Yozish |
| \`paused\` | Media to'xtab turganligi | \`Boolean\` | Faqat o'qish |
| \`ended\` | Ijro oxiriga yetganligi | \`Boolean\` | Faqat o'qish |
| \`playbackRate\` | Ijro tezligi (1.0 = normal) | \`Number\` | O'qish va Yozish |
| \`readyState\` | Medianing yuklanish darajasi | \`Number\` (0 dan 4 gacha) | Faqat o'qish |

### Eng ko'p ishlatiladigan Hodisalar (Events)
| Hodisa | Ishga tushish vaqti |
| :--- | :--- |
| \`'play'\` | \`play()\` chaqirilganda yoki autoplay boshlanganda |
| \`'pause'\` | \`pause()\` chaqirilganda |
| \`'playing'\` | Media buferlashdan chiqib, rostdan o'ynay boshlaganda |
| \`'timeupdate'\` | Ijro vaqti (\`currentTime\`) o'zgarganda (tez-tez chaqiriladi) |
| \`'volumechange'\` | Ovoz darajasi yoki \`muted\` holati o'zgarganda |
| \`'ended'\` | Ijro oxiriga yetganda |
| \`'loadedmetadata'\` | Fayl uzunligi va o'lchamlari aniqlanganda |
| \`'waiting'\` | Tarmoq sekinligi sababli video to'xtab, buferlash boshlanganda |
`,
  exercises: [
  {
    "id": 1,
    "title": "Mediani boshqarish (play, pause, stop)",
    "instruction": "HTMLMediaElement elementini qabul qilib, 'action' parametridan kelib chiqib harakat qiladigan `controlPlayback(mediaElement, action)` funksiyasini yozing. 'play' bo'lganda `.play()`ni chaqirib, Promise rad etilishini `.catch(err => {})` orqali boshqaring. 'pause' bo'lganda `.pause()`ni chaqiring. 'stop' bo'lganda esa `.pause()`ni chaqiring va `currentTime`ni `0` ga tushiring.",
    "startingCode": "function controlPlayback(mediaElement, action) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Shartlarni tekshirish uchun if-else yoki switch foydalaning. .play() va'dasini (.catch()) tekshirishni unutmang. stop bo'lsa currentTime = 0 bo'lishi kerak.",
    "test": "if (!code.includes('currentTime = 0') && !code.includes('currentTime=0')) return 'stop bo\\'lsa currentTime 0 ga tushirilishi kerak';\ntry {\n  let actions = [];\n  const mockMedia = {\n    play: () => { actions.push('play'); return Promise.resolve(); },\n    pause: () => { actions.push('pause'); },\n    currentTime: 10\n  };\n  const sandbox = new Function('mediaElement', 'action', code + '; return controlPlayback;');\n  const fn = sandbox();\n  fn(mockMedia, 'play');\n  fn(mockMedia, 'pause');\n  fn(mockMedia, 'stop');\n  if (!actions.includes('play') || !actions.includes('pause')) return 'play va pause amallari noto\\'g\\'ri bajarildi';\n  if (mockMedia.currentTime !== 0) return 'stop amalida currentTime 0 bo\\'lishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 2,
    "title": "Media sozlamalarini konfiguratsiya qilish",
    "instruction": "`mediaElement` va sozlamalar obyekti `options` (xossalari: `volume`, `speed`, `muted`) ni qabul qiluvchi `configureMedia(mediaElement, options)` funksiyasini yozing. Sozlamalarni elementga biriktiring. Agar `volume` o'rnatilmoqchi bo'lib, uning qiymati 0.0 dan kichik yoki 1.0 dan katta bo'lsa `RangeError` xatoligini otish (throw) kerak.",
    "startingCode": "function configureMedia(mediaElement, options) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "`mediaElement.playbackRate = options.speed` orqali tezlikni sozlang. volume 0 va 1 orasida bo'lishini `if (options.volume < 0 || options.volume > 1)` orqali tekshiring.",
    "test": "try {\n  const mockMedia = { volume: 0.5, playbackRate: 1.0, muted: false };\n  const sandbox = new Function('mediaElement', 'options', code + '; return configureMedia;');\n  const fn = sandbox();\n  \n  fn(mockMedia, { volume: 0.8, speed: 1.5, muted: true });\n  if (mockMedia.volume !== 0.8) return 'volume to\\'g\\'ri o\\'rnatilmadi';\n  if (mockMedia.playbackRate !== 1.5) return 'playbackRate (speed) to\\'g\\'ri o\\'rnatilmadi';\n  if (mockMedia.muted !== true) return 'muted to\\'g\\'ri o\\'rnatilmadi';\n  \n  try {\n    fn(mockMedia, { volume: 1.5, speed: 1.0 });\n    return '1.5 volume uchun RangeError otilishi kerak edi';\n  } catch(err) {\n    if (!(err instanceof RangeError)) return 'Noto\\'g\\'ri xatolik turi otildi. RangeError bo\\'lishi shart.';\n  }\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 3,
    "title": "Media vaqtini formatlash",
    "instruction": "Media o'yinchisida vaqtni foydalanuvchiga ko'rsatish uchun soniyalarni (masalan `125`) `MM:SS` formatidagi satr ko'rinishida (masalan `\"02:05\"`) qaytaradigan `formatTime(seconds)` funksiyasini yozing. Agar berilgan qiymat son bo'lmasa, manfiy bo'lsa yoki `NaN` bo'lsa, `\"00:00\"` qaytaring.",
    "startingCode": "function formatTime(seconds) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Sonni tekshirish uchun `isNaN(seconds)` yoki `typeof seconds !== 'number'` ishlating. Daqiqalarni topish uchun `Math.floor(seconds / 60)` ni, sekundlarni topish uchun esa `Math.floor(seconds % 60)` ni chaqiring va `String(...).padStart(2, '0')` orqali 2 xonali ko'rinishga keltiring.",
    "test": "try {\n  const sandbox = new Function(code + '; return formatTime;');\n  const fn = sandbox();\n  \n  if (fn(125) !== '02:05') return '125 soniya uchun \"02:05\" qaytishi kerak, lekin ' + fn(125) + ' qaytdi';\n  if (fn(9) !== '00:09') return '9 soniya uchun \"00:09\" qaytishi kerak';\n  if (fn(-5) !== '00:00') return 'Manfiy son uchun \"00:00\" qaytishi kerak';\n  if (fn(NaN) !== '00:00') return 'NaN uchun \"00:00\" qaytishi kerak';\n  if (fn(3600) !== '60:00') return '3600 soniya uchun \"60:00\" qaytishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "HTMLMediaElement interfeysida media faylni dasturiy o'ynatish uchun qaysi metod ishlatiladi?",
    "options": [
      "media.start()",
      "media.play()",
      "media.resume()",
      "media.begin()"
    ],
    "correctAnswer": 1,
    "explanation": "play() metodi HTMLMediaElement (audio/video) ijro etilishini boshlaydi va Promise obyekti qaytaradi."
  },
  {
    "id": 2,
    "question": "Media elementini vaqtincha to'xtatish uchun qaysi metod chaqiriladi?",
    "options": [
      "media.stop()",
      "media.halt()",
      "media.pause()",
      "media.break()"
    ],
    "correctAnswer": 2,
    "explanation": "pause() metodi medianing ijro etilishini to'xtatib turadi, ammo currentTime qiymatini nolga qaytarmaydi (o'sha joydan davom ettirish mumkin)."
  },
  {
    "id": 3,
    "question": "Media ijro etilayotganda joriy vaqt o'zgarishini real-vaqtda kuzatish uchun qaysi hodisa (event) ishlatiladi?",
    "options": [
      "progress",
      "timeupdate",
      "playing",
      "change"
    ],
    "correctAnswer": 1,
    "explanation": "timeupdate hodisasi media ijro etilayotgan vaqtda currentTime xususiyati o'zgarganda tez-tez (sekundiga bir necha marta) ishga tushadi."
  },
  {
    "id": 4,
    "question": "Ijro etish tezligini 2 barobar tezlashtirish uchun qaysi xususiyat qanday o'zgartiriladi?",
    "options": [
      "media.playbackRate = 2.0;",
      "media.speed = 2;",
      "media.rate = 200%;",
      "media.velocity = 2;"
    ],
    "correctAnswer": 0,
    "explanation": "playbackRate xususiyati medianing ijro etilish tezligini belgilaydi. Standart qiymat 1.0 bo'lib, 2.0 uni ikki barobar tezlashtiradi."
  },
  {
    "id": 5,
    "question": "Ovoz balandligi (volume) uchun qabul qilinadigan qiymatlar diapazoni qanday?",
    "options": [
      "0 dan 100 gacha bo'lgan butun sonlar",
      "0.0 dan 1.0 gacha bo'lgan o'nlik sonlar",
      "-1.0 dan 1.0 gacha bo'lgan sonlar",
      "Cheklov yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "volume xususiyati faqat 0.0 (mutloq ovozsiz) dan 1.0 (maksimal balandlik) oralig'idagi float son bo'lishi mumkin."
  },
  {
    "id": 6,
    "question": "Nima uchun media elementining 'duration' xususiyati sahifa yuklanishi bilan darhol o'qilganda NaN qaytishi mumkin?",
    "options": [
      "Audio/Video fayl buzilgan bo'lsa",
      "Brauzer hali medianing o'lchami va vaqti haqidagi metama'lumotlarni yuklamagan bo'lsa",
      "Ovoz o'chirilgan (muted) bo'lsa",
      "duration xususiyati faqat audio uchun mavjud bo'lib, video uchun ishlamasa"
    ],
    "correctAnswer": 1,
    "explanation": "duration va o'lchamlar loadedmetadata hodisasi yuz berganidan keyingina aniq yuklanib bo'ladi. Ungacha bo'lgan vaqtda NaN qaytadi."
  },
  {
    "id": 7,
    "question": "Media fayl tugaganligini aniqlash uchun qaysi xususiyatdan foydalaniladi (boolean qiymat)?",
    "options": [
      "media.finished",
      "media.ended",
      "media.completed",
      "media.isOver"
    ],
    "correctAnswer": 1,
    "explanation": "ended xususiyati agar media ijrosi o'z oxiriga yetgan bo'lsa true, aks holda false qiymatini qaytaradi."
  },
  {
    "id": 8,
    "question": "Media manbaini dinamik o'zgartirgandan so'ng, uni brauzerda yuklashni boshlash uchun qaysi metod chaqiriladi?",
    "options": [
      "media.load()",
      "media.reload()",
      "media.fetch()",
      "media.update()"
    ],
    "correctAnswer": 0,
    "explanation": "load() metodi media elementini yangidan ishga tushiradi va va yangi manbani (src) keshdan yoki tarmoqdan yuklaydi."
  },
  {
    "id": 9,
    "question": "Ovozni butunlay o'chirish (mute) uchun qaysi xususiyat ishlatiladi?",
    "options": [
      "media.volume = 0;",
      "media.muted = true;",
      "Ikkala usul ham foydalaniladi, ammo muted = true ovoz balandligi xotirasini saqlab qoladi",
      "media.silence = true;"
    ],
    "correctAnswer": 2,
    "explanation": "muted = true ovozni o'chiradi, lekin volume darajasini o'zgartirmaydi, ya'ni qayta yoqqanda avvalgi balandlik tiklanadi. volume = 0 va ovoz balandligini yo'qotadi."
  },
  {
    "id": 10,
    "question": "Media pleyerning tugashi bilash boshidan takror o'ynashi uchun loop xususiyati qanday sozlanadi?",
    "options": [
      "media.loop = true;",
      "media.repeat = true;",
      "media.autoplay = true;",
      "media.cycle = true;"
    ],
    "correctAnswer": 0,
    "explanation": "loop xususiyati boolean tipida bo'lib, unga true berilsa media tugashi bilanoq avtomatik tarzda qaytadan o'ynashni boshlaydi."
  },
  {
    "id": 11,
    "question": "Videoni avtomatik o'ynatish (autoplay) muvaffaqiyatli bo'lishi uchun qaysi shart bajarilishi kerak?",
    "options": [
      "Video faqat yuqori sifatli bo'lishi kerak",
      "Video ovozsiz (muted = true) holatda bo'lishi lozim",
      "Sahifada kamida bitta tugma bo'lishi shart",
      "Video autoplay atributiga ega bo'lmasa ishlamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Zamonaviy brauzerlar ovozli kontentlarning foydalanuvchi ruxsatisiz avtomatik o'ynalishini taqiqlaydi. Shuning uchun muted qilingan media autoplay bo'ladi."
  },
  {
    "id": 12,
    "question": "Volume darajasi o'zgarganligini eshitish uchun qaysi event ishlatiladi?",
    "options": [
      "change",
      "volumechange",
      "mutechange",
      "soundupdate"
    ],
    "correctAnswer": 1,
    "explanation": "volumechange hodisasi volume yoki muted xususiyatlari o'zgarganda ishga tushadi."
  }
]

};
