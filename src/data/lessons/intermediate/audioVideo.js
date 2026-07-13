export const audioVideo = {
  id: "audioVideo",
  title: "Audio va Video API: Media Elementlarini Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Audio va Video API nima?
**Audio va Video API** — bu HTML hujjatidagi \\\`<audio>\\\` va \\\`<video>\\\` elementlarini JavaScript orqali dasturiy ravishda boshqarish (play, pause, ovozini o'zgartirish) imkonini beruvchi interfeys.

### Real hayotiy o'xshatish
Tasavvur qiling, televizor va uning **masofaviy boshqaruv pulti** (pul't):
* **Televizor (HTML elementi):** Ekranda videoni ko'rsatuvchi va ovoz chiqaruvchi asosiy qurilma.
* **Pult (JavaScript Media API):** Televizorni masofadan boshqaradigan tugmalar:
  * \\\`play()\\\` — videoni ishga tushirish (pultdagi play tugmasi).
  * \\\`pause()\\\` — videoni to'xtatish (pultdagi pause tugmasi).
  * \\\`volume\\\` — ovoz balandligini sozlash (pultdagi +/- tugmalari).
  * \\\`currentTime\\\` — videoni ma'lum bir daqiqaga o'tkazish.

---

## 2. ⚙️ Qanday Ishlaydi (Deep Dive)

### Under the hood (Ichki ishlash mexanizmi)
Brauzerda \\\`<audio>\\\` va \\\`<video>\\\` elementlarining barchasi \\\`HTMLMediaElement\\\` nomli bazaviy interfeysdan meros oladi. Bu interfeys C++ da yozilgan brauzer dvigateli bilan to'g'ridan-to'g'ri aloqa qiladi. Siz JS da \\\`video.play()\\\` ni chaqirganingizda, V8 (yoki boshqa JS engine) C++ dagi oqim (streaming) API-lariga signal yuboradi va dekoder faylni o'qishni boshlaydi.

### Xotira, V8 Engine va Unumdorlik
1. **Garbage Collection (Axlat yig'uvchi):** Media elementlari katta hajmdagi xotira ishlatadi. Single Page Application (SPA) larda (React/Vue) agar komponent ekrandan yo'qolsa-yu, media to'xtatilmasa (\\\`pause()\\\`), u orqa fonda o'ynashda davom etadi va xotiradan tozalanmaydi (Memory Leak). Shuning uchun komponent o'chayotganda \\\`video.pause()\\\` qilish va \\\`src\\\` ni bo'shatish shart.
2. **Bufferlash (Buffering):** Video to'liq yuklanmasidan turib ishlashni boshlaydi. JS orqali \\\`media.buffered\\\` orqali qancha qism yuklanganini bilish mumkin.
3. **Throttling Eventlar:** \\\`timeupdate\\\` hodisasi soniyasiga 4-25 marta chaqirilishi mumkin. React kabi freymvorklarda ushbu hodisada har safar state-ni yangilash keraksiz renderlarga va unumdorlikning pasayishiga olib keladi. Optimallashtirish uchun uni har 1 soniyada bir marta ishlashini (throttle) ta'minlash kerak.

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases
1. **Autoplay Policy:** Zamonaviy brauzerlar ovozli videoni foydalanuvchi ta'sirigacha (klik yoki klaviatura) avtomatik ishga tushishini bloklaydi. \\\`play()\\\` metodi Promise qaytaradi va agar bloklansa, Promise \\\`NotAllowedError\\\` bilan rejected bo'ladi. Har doim \\\`.catch()\\\` bilan bloklanganini tutib olish kerak.
2. **NaN Duration:** \\\`duration\\\` xususiyati darhol o'qilsa \\\`NaN\\\` qaytaradi. To'g'ri ishlash uchun \\\`loadedmetadata\\\` hodisasini kutish kerak.

### Senior Interview Savollari
1. **Savol:** Nima uchun \\\`video.play()\\\` ba'zida konsolda xato beradi va bu muammoni qanday hal qilasiz?
   * **Javob:** Brauzerning Autoplay Policy tufayli. Buni oldini olish uchun \\\`video.play().catch(error => { /* fallback logic */ })\\\` yozamiz. Odatda fallback sifatida pleyerga katta "Play" tugmasini chiqaramiz. Yana bir yechim: videoni ovozsiz (\\\`muted = true\\\`) qilib avtomatik ishga tushirish mumkin.
2. **Savol:** \\\`loadedmetadata\\\` va \\\`loadeddata\\\` hodisalarining farqi nimada?
   * **Javob:** \\\`loadedmetadata\\\` faqat media ma'lumotlari (uzunligi, o'lchamlari) yuklanganda yonadi. \\\`loadeddata\\\` esa birinchi freym (kadr) yuklanganida va uni ekranda chizish imkoni bo'lganda ishga tushadi.
3. **Savol:** SPA loyihalarida media xotira sizib chiqishining (memory leak) oldini qanday olasiz?
   * **Javob:** Komponentning unmount qismida: \\\`video.pause(); video.src = ''; video.load();\\\` qilinadi va barcha hodisa tinglovchilar (event listeners) tozalanadi.

---

## 4. 📊 Mermaid Diagrammasi

Quyidagi diagramma Media elementining hayot sikli (Life Cycle) va holatlarini ifodalaydi:

\\\`\\\`\\\`mermaid
stateDiagram-v2
    [*] --> Unloaded : Sahifa yuklandi
    Unloaded --> Loading : src berildi
    Loading --> LoadedMetadata : loadedmetadata yonadi
    LoadedMetadata --> Paused : Tayyor (Kutmoqda)
    
    Paused --> Playing : play() chaqirildi
    Playing --> Paused : pause() chaqirildi
    
    Playing --> Playing : timeupdate
    Playing --> Ended : ended hodisasi
    Ended --> Paused : currentTime = 0
\\\`\\\`\\\`
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
  },
  {
    "id": 4,
    "title": "Ovoz darajasini slider bilan boshqarish",
    "instruction": "Media element va 0 dan 100 gacha bo'lgan butun son (`percent`) qabul qilib, ovoz darajasini foiz asosida o'rnatadigan `setVolumeByPercent(mediaElement, percent)` funksiyasini yozing. Funksiya `percent` qiymatini 0.0-1.0 oralig'iga o'tkazib `volume` ga o'rnatishi kerak. Agar `percent` 0 dan kichik bo'lsa 0 ga, 100 dan katta bo'lsa 100 ga chegaralang (clamp). Agar `muted` yoqilgan bo'lsa, uni `false` ga o'tkazing.",
    "startingCode": "function setVolumeByPercent(mediaElement, percent) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Math.max(0, Math.min(100, percent)) orqali chegaralang, keyin 100 ga bo'ling. mediaElement.volume = clampedPercent / 100; va mediaElement.muted = false;",
    "test": "try {\n  const mockMedia = { volume: 0.5, muted: true };\n  const sandbox = new Function(code + '; return setVolumeByPercent;');\n  const fn = sandbox();\n  fn(mockMedia, 75);\n  if (Math.abs(mockMedia.volume - 0.75) > 0.001) return 'percent=75 uchun volume 0.75 bo\\'lishi kerak, lekin ' + mockMedia.volume + ' qaytdi';\n  if (mockMedia.muted !== false) return 'muted false ga o\\'tkazilishi kerak';\n  fn(mockMedia, -10);\n  if (mockMedia.volume !== 0) return 'percent=-10 uchun volume 0 bo\\'lishi kerak (clamp)';\n  fn(mockMedia, 200);\n  if (mockMedia.volume !== 1) return 'percent=200 uchun volume 1 bo\\'lishi kerak (clamp)';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 5,
    "title": "Media tugashi hodisasini boshqarish (ended)",
    "instruction": "Media element va callback funksiya qabul qilib, media ijrosi tugaganda (`ended` hodisasi) callback funksiyani chaqiradigan `onMediaEnd(mediaElement, callback)` funksiyasini yozing. Shuningdek, funksiya `ended` hodisasi uchun biriktirilgan listenerni olib tashlash imkonini beruvchi `removeListener` funksiyasini qaytarsin.",
    "startingCode": "function onMediaEnd(mediaElement, callback) {\n  // Kodni shu yerda yozing\n  // removeListener funksiyasini qaytaring\n}\n",
    "hint": "mediaElement.addEventListener('ended', callback) orqali hodisani biriktiring. return function removeListener() { mediaElement.removeEventListener('ended', callback); }; orqali tozalash funksiyasini qaytaring.",
    "test": "try {\n  let listeners = {};\n  const mockMedia = {\n    addEventListener(event, fn) { listeners[event] = fn; },\n    removeEventListener(event, fn) { if (listeners[event] === fn) delete listeners[event]; }\n  };\n  let called = false;\n  const cb = () => { called = true; };\n  const sandbox = new Function(code + '; return onMediaEnd;');\n  const fn = sandbox();\n  const remove = fn(mockMedia, cb);\n  if (!listeners['ended']) return 'ended hodisasiga listener biriktirilmadi';\n  listeners['ended']();\n  if (!called) return 'callback funksiya chaqirilmadi';\n  if (typeof remove !== 'function') return 'Funksiya removeListener qaytarishi kerak';\n  remove();\n  if (listeners['ended']) return 'removeListener chaqirilgandan keyin listener olib tashlanishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 6,
    "title": "Loop rejimini almashtirish (toggle)",
    "instruction": "Media elementni qabul qilib, uning `loop` xossasini teskarisiga o'zgartiradigan (toggle) va yangi holatni `{ loop: true/false }` ko'rinishida qaytaradigan `toggleLoop(mediaElement)` funksiyasini yozing.",
    "startingCode": "function toggleLoop(mediaElement) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "mediaElement.loop = !mediaElement.loop; orqali almashtirib, return { loop: mediaElement.loop }; qaytaring.",
    "test": "try {\n  const mockMedia = { loop: false };\n  const sandbox = new Function(code + '; return toggleLoop;');\n  const fn = sandbox();\n  const result1 = fn(mockMedia);\n  if (mockMedia.loop !== true) return 'Birinchi chaqiruvda loop true bo\\'lishi kerak';\n  if (!result1 || result1.loop !== true) return 'Qaytarilgan obyektda loop true bo\\'lishi kerak';\n  const result2 = fn(mockMedia);\n  if (mockMedia.loop !== false) return 'Ikkinchi chaqiruvda loop false bo\\'lishi kerak';\n  if (!result2 || result2.loop !== false) return 'Qaytarilgan obyektda loop false bo\\'lishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 7,
    "title": "Mediada vaqtni o'tkazish (seek)",
    "instruction": "Media element va `targetSeconds` (maqsad soniya) qabul qilib, media ijrosini o'sha soniyaga o'tkazadigan `seekTo(mediaElement, targetSeconds)` funksiyasini yozing. Agar `targetSeconds` manfiy bo'lsa — 0 ga o'rnating. Agar `duration` mavjud va `targetSeconds` undan katta bo'lsa — `duration` ga o'rnating. Funksiya o'rnatilgan yangi `currentTime` qiymatini qaytarsin.",
    "startingCode": "function seekTo(mediaElement, targetSeconds) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Avval targetSeconds = Math.max(0, targetSeconds) orqali manfiy qiymatni tekshiring. Keyin if (mediaElement.duration && targetSeconds > mediaElement.duration) targetSeconds = mediaElement.duration; orqali chegaralang. mediaElement.currentTime = targetSeconds; va return mediaElement.currentTime;",
    "test": "try {\n  const mockMedia = { currentTime: 0, duration: 120 };\n  const sandbox = new Function(code + '; return seekTo;');\n  const fn = sandbox();\n  let result = fn(mockMedia, 60);\n  if (mockMedia.currentTime !== 60) return 'currentTime 60 ga o\\'rnatilishi kerak';\n  if (result !== 60) return 'Funksiya 60 qaytarishi kerak';\n  result = fn(mockMedia, -10);\n  if (mockMedia.currentTime !== 0) return 'Manfiy qiymat uchun currentTime 0 bo\\'lishi kerak';\n  result = fn(mockMedia, 200);\n  if (mockMedia.currentTime !== 120) return 'duration dan katta qiymat uchun currentTime duration ga teng bo\\'lishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 8,
    "title": "Progress foizini hisoblash (timeupdate uchun)",
    "instruction": "Media elementni qabul qilib, joriy ijro foizini 0 dan 100 gacha bo'lgan son sifatida qaytaradigan `getProgressPercent(mediaElement)` funksiyasini yozing. Foiz `(currentTime / duration) * 100` formulasi bo'yicha hisoblanadi. Agar `duration` nolga teng bo'lsa, `NaN` bo'lsa yoki mavjud bo'lmasa — `0` qaytaring. Natijani `Math.round` bilan yaxlitlang.",
    "startingCode": "function getProgressPercent(mediaElement) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "if (!mediaElement.duration || isNaN(mediaElement.duration)) return 0; va return Math.round((mediaElement.currentTime / mediaElement.duration) * 100);",
    "test": "try {\n  const sandbox = new Function(code + '; return getProgressPercent;');\n  const fn = sandbox();\n  if (fn({ currentTime: 30, duration: 120 }) !== 25) return '30/120 uchun 25 qaytishi kerak';\n  if (fn({ currentTime: 60, duration: 120 }) !== 50) return '60/120 uchun 50 qaytishi kerak';\n  if (fn({ currentTime: 120, duration: 120 }) !== 100) return '120/120 uchun 100 qaytishi kerak';\n  if (fn({ currentTime: 0, duration: 0 }) !== 0) return 'duration=0 uchun 0 qaytishi kerak';\n  if (fn({ currentTime: 5, duration: NaN }) !== 0) return 'duration=NaN uchun 0 qaytishi kerak';\n  if (fn({ currentTime: 10 }) !== 0) return 'duration mavjud bo\\'lmaganda 0 qaytishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 9,
    "title": "Ijro tezligini bosqichma-bosqich aylantirish",
    "instruction": "Media elementni qabul qilib, ijro tezligini (`playbackRate`) ketma-ket aylantiradigan `cyclePlaybackRate(mediaElement)` funksiyasini yozing. Tezliklar tartibi: `[0.5, 1.0, 1.25, 1.5, 2.0]`. Funksiya har chaqirilganda `playbackRate`ni keyingi bosqichga o'tkazsin. Agar joriy tezlik ro'yxatda bo'lmasa yoki oxirgi element (2.0) bo'lsa — birinchi elementga (0.5) qaytsin. Funksiya yangi tezlikni qaytarsin.",
    "startingCode": "function cyclePlaybackRate(mediaElement) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const rates = [0.5, 1.0, 1.25, 1.5, 2.0]; massivini yarating. indexOf orqali joriy tezlik indeksini toping. Keyingi indeksni (currentIndex + 1) % rates.length bilan hisoblang.",
    "test": "try {\n  const mockMedia = { playbackRate: 1.0 };\n  const sandbox = new Function(code + '; return cyclePlaybackRate;');\n  const fn = sandbox();\n  let r = fn(mockMedia);\n  if (mockMedia.playbackRate !== 1.25) return '1.0 dan keyin 1.25 bo\\'lishi kerak, lekin ' + mockMedia.playbackRate + ' qaytdi';\n  fn(mockMedia);\n  if (mockMedia.playbackRate !== 1.5) return '1.25 dan keyin 1.5 bo\\'lishi kerak';\n  fn(mockMedia);\n  if (mockMedia.playbackRate !== 2.0) return '1.5 dan keyin 2.0 bo\\'lishi kerak';\n  fn(mockMedia);\n  if (mockMedia.playbackRate !== 0.5) return '2.0 dan keyin 0.5 ga qaytishi kerak';\n  fn(mockMedia);\n  if (mockMedia.playbackRate !== 1.0) return '0.5 dan keyin 1.0 bo\\'lishi kerak';\n  mockMedia.playbackRate = 3.0;\n  fn(mockMedia);\n  if (mockMedia.playbackRate !== 0.5) return 'Ro\\'yxatda bo\\'lmagan tezlik uchun 0.5 ga qaytishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  },
  {
    "id": 10,
    "title": "Buferlangan vaqt oraliqlarini olish",
    "instruction": "Media elementni qabul qilib, uning `buffered` xossasidagi barcha vaqt oraliqlarini `[{ start: soniya, end: soniya }, ...]` ko'rinishidagi massiv sifatida qaytaradigan `getBufferedRanges(mediaElement)` funksiyasini yozing. `buffered` — bu `TimeRanges` obyekti bo'lib, `length` xossasi va `start(i)`, `end(i)` metodlariga ega. Agar `buffered` mavjud bo'lmasa yoki `length` 0 bo'lsa, bo'sh massiv qaytaring.",
    "startingCode": "function getBufferedRanges(mediaElement) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "const ranges = []; for (let i = 0; i < mediaElement.buffered.length; i++) { ranges.push({ start: mediaElement.buffered.start(i), end: mediaElement.buffered.end(i) }); } return ranges;",
    "test": "try {\n  const sandbox = new Function(code + '; return getBufferedRanges;');\n  const fn = sandbox();\n  const mockMedia1 = {\n    buffered: {\n      length: 2,\n      start(i) { return [0, 60][i]; },\n      end(i) { return [30, 120][i]; }\n    }\n  };\n  const result1 = fn(mockMedia1);\n  if (!Array.isArray(result1)) return 'Natija massiv bo\\'lishi kerak';\n  if (result1.length !== 2) return '2 ta oraliq qaytishi kerak, lekin ' + result1.length + ' ta qaytdi';\n  if (result1[0].start !== 0 || result1[0].end !== 30) return 'Birinchi oraliq {start:0, end:30} bo\\'lishi kerak';\n  if (result1[1].start !== 60 || result1[1].end !== 120) return 'Ikkinchi oraliq {start:60, end:120} bo\\'lishi kerak';\n  const mockMedia2 = { buffered: { length: 0, start() {}, end() {} } };\n  const result2 = fn(mockMedia2);\n  if (!Array.isArray(result2) || result2.length !== 0) return 'Buferlash bo\\'lmaganda bo\\'sh massiv qaytishi kerak';\n} catch(e) {\n  return 'Xato: ' + e.message;\n}\nreturn null;"
  }
],
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
