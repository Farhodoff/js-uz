export const audioVideo = {
  id: "audioVideo",
  title: "Audio va Video API: Media Elementlarini Boshqarish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Audio va Video API nima?
**Audio va Video API (HTMLMediaElement)** — bu brauzerga o'rnatilgan audio (\`<audio>\`) va video (\`<video>\`) fayllarni JavaScript yordamida dasturiy boshqarish (o'ynatish, to'xtatish, ovozni sozlash, tezlikni o'zgartirish) imkonini beruvchi interfeysdir.

### Real hayotiy analogiya
Tasavvur qiling, sizda **avtomobil magnitolasi** bor:
* **Tugmalar va datchiklar (Media API):** 
  * \`play()\` — gazni bosib harakatni boshlash.
  * \`pause()\` — tormozni bosib vaqtincha to'xtash.
  * \`currentTime\` — tasmali kassetani qo'lda oldinga yoki orqaga aylantirib vaqtni o'zgartirish.
  * \`volume\` — ovozni baland qiluvchi aylanma murvat.
  * \`timeupdate\` (hodisa) — magnitola ekranida har soniyada o'zgarib turadigan elektron soat.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Play va Pause)
\`\`\`javascript
const myVideo = document.getElementById("my-video");

// Videoni ijro etish (Avtomatik o'ynatish cheklovi sababli promise rad etilishi mumkin)
myVideo.play().catch(error => {
  console.log("Foydalanuvchi ta'siridan oldin avtomatik o'ynatib bo'lmaydi:", error);
});

// 5 soniyadan keyin to'xtatish
setTimeout(() => {
  myVideo.pause();
}, 5000);
\`\`\`

### 2. Intermediate Example (Ovozsiz qilish va Tezlikni sozlash)
\`\`\`javascript
const audio = document.getElementById("my-audio");

// Ovozni butunlay o'chirish (Mute)
audio.muted = true;

// Ijro etish tezligini 1.5 barobarga oshirish
audio.playbackRate = 1.5;
\`\`\`

### 3. Advanced Example (Custom Progress Bar / Vaqt yangilanishi)
Video ijro etilayotgan paytda foydalanuvchiga jarayon foizini ko'rsatish:
\`\`\`javascript
const video = document.getElementById("video-player");
const progressBar = document.getElementById("progress");

video.addEventListener("timeupdate", () => {
  // O'tgan vaqtni umumiy vaqtga bo'lib foizini topamiz
  const percentage = (video.currentTime / video.duration) * 100;
  if (progressBar) {
    progressBar.style.width = \`\${percentage}%\`;
  }
});
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### HTMLMediaElement Interfeysi
Oshxonadagi har xil muzlatgichlar bir xil ish printsipiga ega bo'lgani kabi, \`<audio>\` va \`<video>\` teglari ham JavaScript-da bitta umumiy **\`HTMLMediaElement\`** prototipidan meros oladi. Shuning uchun ulardagi metodlar (\`play()\`, \`pause()\`) va xossalar (\`volume\`, \`currentTime\`) mutlaqo bir xil ishlaydi.

> [!IMPORTANT]
> **Autoplay Block:** Zamonaviy brauzerlar ovozli videolarni sahifa yuklanishi bilan avtomatik o'ynatishga ruxsat bermaydi. Bunga erishish uchun videoni albatta \`muted = true\` (ovozsiz) qilib qo'yish kerak.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Video yuklanishidan oldin NaN xatosini oldini olish
Video yuklanishi bilanoq uning umumiy vaqtini (\`duration\`) o'qishga harakat qilsak, \`NaN\` (Not a Number) qaytadi. Chunki brauzer hali fayl haqidagi metama'lumotlarni yuklab ulgurmagan bo'ladi.

#### To'g'ri yechim:
\`\`\`javascript
const video = document.createElement("video");
video.src = "movie.mp4";

// Metadata yuklanishini kutamiz
video.addEventListener("loadedmetadata", () => {
  console.log(\`Videoning umumiy davomiyligi: \${video.duration} soniya\`);
});
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Ovoz balandligini belgilangan chegaradan tashqari berish
Ovoz balandligi faqat \`0.0\` va \`1.0\` oralig'ida bo'lishi mumkin.
* **Noto'g'ri:**
  \`\`\`javascript
  audio.volume = 1.5; // IndexSizeError! (Xatolik otiladi)
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  audio.volume = 0.8; // 80% ovoz balandligi
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xossa | Vazifasi | Qiymat turi / Natija |
| :--- | :--- | :--- |
| \`play()\` | Ijroni boshlash | Qaytaradi: \`Promise\` |
| \`pause()\` | Ijroni vaqtincha to'xtatish | Qaytaradi: \`void\` |
| \`currentTime\` | Joriy vaqtni boshqarish | Soniyalarda (o'qish/yozish) |
| \`duration\` | Umumiy vaqtni bilish | Soniyalarda (faqat o'qish) |
| \`volume\` | Ovoz balandligi | \`0.0\` dan \`1.0\` gacha |
| \`playbackRate\` | Ijro tezligi | \`1\` - normal, \`2\` - ikki barobar tez |

---

## 7. ❓ Savollar va Javoblar

### 1. \`muted = true\` va \`volume = 0\` o'rtasida qanday farq bor?
\`muted = true\` ovozni o'chiradi, ammo original ovoz balandligini saqlab qoladi (qayta yoqqanda avvalgi ovoz balandligi tiklanadi). \`volume = 0\` esa ovoz darajasini nolga tushiradi.

### 2. Video tugagan paytda qanday hodisa (event) yordamida JavaScript reaksiya bildiradi?
\`'ended'\` hodisasi yordamida. Masalan, video tugagach, avtomatik keyingi darsga o'tishni rejalashtirish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qanday qilib video elementini sahifa ochilishi bilanoq avtomatik o'ynatish mumkin?
2. \`loadedmetadata\` hodisasi nima uchun kerak?
3. \`playbackRate\` qiymatini \`0.5\` ga tenglasak nima sodir bo'ladi? (Video 2 barobar sekinlashadi).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida media elementlarini boshqarish ko'nikmalaringizni sinab ko'ring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Mediani Ijro Etish",
    "instruction": "Taqdim etilgan 'video' elementini dasturiy ravishda ishga tushiring (play qiling).",
    "startingCode": "const video = document.createElement('video');\n\n// Kodni shu yerda yozing\n",
    "hint": "video.play();",
    "test": "if (!code.includes('play()')) return 'video.play() chaqirilmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Ovozsiz Rejimga O'tkazish (Mute)",
    "instruction": "'video' elementining ovozini o'chiring (muted xususiyatini true qiling).",
    "startingCode": "const video = document.createElement('video');\n\n// Kodni shu yerda yozing\n",
    "hint": "video.muted = true;",
    "test": "if (!code.includes('muted = true')) return 'muted xususiyati true qilinmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Ovoz Balandligini Sozlash",
    "instruction": "'audio' elementining ovoz balandligini (volume) 60% ga (ya'ni 0.6 qiymatga) o'zgartiring.",
    "startingCode": "const audio = document.createElement('audio');\n\n// Kodni shu yerda yozing\n",
    "hint": "audio.volume = 0.6;",
    "test": "if (!code.includes('volume = 0.6')) return 'volume xususiyati 0.6 qilib belgilanmadi';\nreturn null;"
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
