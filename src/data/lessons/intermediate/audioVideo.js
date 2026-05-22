export const audioVideo = {
  id: "audioVideo",
  title: "Audio va Video API: Media Elementlarini Boshqarish",
  theory: `## 1. NEGA kerak?
HTML5 \`<audio>\` va \`<video>\` elementlari bizga brauzerda tashqi plaginlarsiz (eski Flash o'rniga) audio va videolarni ijro etish imkonini beradi. Lekin ba'zida bizga brauzer taqdim etgan oddiy o'ynatish tugmasi yetarli bo'lmaydi. Masalan, o'zimizning maxsus dizaynimizga ega media-pleyer yaratishimiz, o'yinlarda tovushlarni boshqarishimiz, video tugaganda avtomatik boshqa sahifaga o'tishimiz yoki video tezligini (playback speed) o'zgartirishimiz kerak bo'ladi. JavaScript Media API yordamida barcha ushbu jarayonlarni to'liq dasturiy boshqara olamiz.

## 2. SODDALIK (Analogiya)
Media API-ni **avtomobil magnitolasining tugmalari va sensorlariga** o'xshatish mumkin.
- \`.play()\` - gaz pedalini bosish (ijro etish).
- \`.pause()\` - tormozni bosish (to'xtatish).
- \`.currentTime\` - magnitola ekranida vaqtni oldinga yoki orqaga surish.
- \`.volume\` - ovoz balandligini burab boshqarish g'ildiragi.
- \`timeupdate\` hodisasi - har soniyada vaqt ko'rsatkichi o'zgarishini ko'rsatuvchi raqamli soat.

## 3. STRUKTURA
Audio va video elementlari JavaScript-da **HTMLMediaElement** interfeysini baham ko'rishadi, ya'ni ikkala element uchun deyarli bir xil metodlar va xususiyatlar ishlaydi.

### Asosiy xususiyatlar (Properties):
- \`src\` - media faylning URL manzili.
- \`currentTime\` - joriy ijro etilayotgan vaqt soniyalarda (o'qish va yozish mumkin).
- \`duration\` - medianing umumiy davomiyligi soniyalarda (faqat o'qish mumkin).
- \`volume\` - ovoz balandligi (\`0.0\` dan \`1.0\` gacha).
- \`muted\` - ovoz o'chirilganligi (true/false).
- \`ended\` - ijro oxiriga yetganligi (true/false).
- \`playbackRate\` - ijro etish tezligi (\`1\` - normal, \`0.5\` - sekin, \`2.0\` - tez).
- \`loop\` - takroriy ijro etishni yoqish/o'chirish (true/false).

### Asosiy metodlar:
- \`play()\` - ijroni boshlash (Promise qaytaradi).
- \`pause()\` - ijroni vaqtincha to'xtatish.
- \`load()\` - media faylni qayta yuklash (manba o'zgarganda).

### Asosiy hodisalar (Events):
- \`play\` - ijro boshlanganda.
- \`pause\` - to'xtatilganda.
- \`timeupdate\` - joriy vaqt o'zgarganda (ijro davomida doimiy ishlaydi).
- \`ended\` - media tugaganda.
- \`volumechange\` - ovoz balandligi o'zgarganda.

\`\`\`javascript
const video = document.getElementById('myVideo');

// Videoni ijro etish
video.play().catch(error => {
  console.log("Avtomatik o'ynatish bloklandi:", error);
});

// Ijroni 10-soniyaga surish
video.currentTime = 10;

// Ovozni 50% ga sozlash
video.volume = 0.5;
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Autoplay (Avtomatik o'ynatish) cheklovlari:** Brauzerlar xavfsizlik va foydalanuvchilar tinchligi uchun ovozli videolarni sahifa yuklanishi bilan avtomatik o'ynatishni taqiqlaydi. Agar \`.play()\`ni chaqirsangiz xato berishi mumkin. Buning uchun video **muted (ovozsiz)** holatda bo'lishi kerak.
2. **\`duration\` xususiyatini sahifa yuklanishi bilan o'qish:** Sahifa yuklanishi bilan darhol \`video.duration\`ni chaqirsangiz \`NaN\` qaytadi. Chunki brauzer hali medianing metama'lumotlarini (metadata) yuklab ulgurmagan bo'ladi. Buning uchun \`loadedmetadata\` hodisasini kutish shart.
3. **\`volume\` qiymatini chegaradan tashqari berish:** Ovoz balandligi faqat \`0.0\` va \`1.0\` oralig'ida bo'ladi. Unga \`1.5\` yoki \`-0.5\` berish xatolikka (\`IndexSizeError\`) olib keladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Media faylni ijro etish metodini ko'rsating.**
\`mediaElement.play()\` metodi.

**2. Ijro etilayotgan vaqtni qaysi xususiyat orqali bilsa bo'ladi?**
\`mediaElement.currentTime\` xususiyati orqali.

**3. Media elementining umumiy vaqti qaysi xususiyatda saqlanadi?**
\`mediaElement.duration\` xususiyatida.

**4. Videoni ovozsiz (mute) qilish uchun nima qilish kerak?**
\`mediaElement.muted = true;\` deb belgilash kerak.

**5. Ovoz balandligini qanday qiymatlar oralig'ida belgilash mumkin?**
\`0.0\` (butunlay ovozsiz) dan \`1.0\` (maksimal ovoz) gacha bo'lgan o'nlik sonlar bilan.

**6. Video tugaganida qanday hodisa (event) yuz beradi?**
\`'ended'\` hodisasi yuz beradi.

**7. Video ijro etilayotganda vaqt o'zgarishi qaysi hodisa yordamida kuzatiladi?**
\`'timeupdate'\` hodisasi yordamida.

**8. Videoning ijro etilish tezligini qanday o'zgartirish mumkin?**
\`mediaElement.playbackRate\` xususiyatiga son qiymat berish orqali.

**9. Videoni qayta-qayta takroran o'ynatadigan qilish uchun qaysi atribut sozlanadi?**
\`mediaElement.loop = true;\` qilinadi.

**10. Nima uchun brauzerda play() metodi ba'zan rad etiladi (reject)?**
Brauzerlar foydalanuvchi sahifaga tegmasidan oldin ovozli videolarni avtomatik ijro etilishini taqiqlagani uchun.

**11. Media metadata yuklanganini qaysi event orqali eshitish mumkin?**
\`'loadedmetadata'\` hodisasi yordamida.

**12. Media elementini to'xtatib turish metodi qaysi?**
\`mediaElement.pause()\` metodi.
`,
  exercises: [
    {
      id: 1,
      title: "Mediani ijro etish",
      instruction: "Berilgan 'video' elementini dasturiy ravishda ishga tushiring (o'ynating).",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.play();",
      test: "if (code.includes('video.play()')) return null; return 'video.play() metodini chaqiring.';"
    },
    {
      id: 2,
      title: "Mediani pauza qilish",
      instruction: "Berilgan 'audio' elementini ijro etilishini vaqtincha to'xtating (pause qiling).",
      startingCode: "const audio = document.createElement('audio');\n// Bu yerga yozing\n",
      hint: "audio.pause();",
      test: "if (code.includes('audio.pause()')) return null; return 'audio.pause() metodini chaqiring.';"
    },
    {
      id: 3,
      title: "Ovozni o'chirish",
      instruction: "'video' elementining ovozini dasturiy ravishda o'chirib qo'ying (muted qiling).",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.muted = true;",
      test: "if (code.includes('video.muted = true')) return null; return 'muted xususiyatini true qiling.';"
    },
    {
      id: 4,
      title: "Ovoz balandligini sozlash",
      instruction: "'audio' elementining ovoz balandligini 70% ga (0.7) sozlang.",
      startingCode: "const audio = document.createElement('audio');\n// Bu yerga yozing\n",
      hint: "audio.volume = 0.7;",
      test: "if (code.includes('audio.volume = 0.7')) return null; return 'volume qiymatini 0.7 qiling.';"
    },
    {
      id: 5,
      title: "Media manbasini yuklash",
      instruction: "'video' elementining manbasiga (src) 'clip.mp4' faylini biriktiring.",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.src = 'clip.mp4';",
      test: "if (code.includes(\"video.src = 'clip.mp4'\") || code.includes('video.src = \"clip.mp4\"')) return null; return 'src atributiga clip.mp4 ni yuklang.';"
    },
    {
      id: 6,
      title: "Joriy vaqtni aniqlash",
      instruction: "'video' elementining hozirgi ijro vaqtini 15-soniyaga o'tkazing.",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.currentTime = 15;",
      test: "if (code.includes('video.currentTime = 15')) return null; return 'currentTime ni 15 qiling.';"
    },
    {
      id: 7,
      title: "Avtomatik takrorlash",
      instruction: "'audio' elementi tugaganda avtomatik boshidan boshlanadigan (loop) qilib sozlang.",
      startingCode: "const audio = document.createElement('audio');\n// Bu yerga yozing\n",
      hint: "audio.loop = true;",
      test: "if (code.includes('audio.loop = true')) return null; return 'loop xususiyatini true qiling.';"
    },
    {
      id: 8,
      title: "Ijro tezligi",
      instruction: "'video' ijro etilish tezligini 1.5 barobar tezlashtiring (playbackRate).",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.playbackRate = 1.5;",
      test: "if (code.includes('video.playbackRate = 1.5')) return null; return 'playbackRate ni 1.5 qiling.';"
    },
    {
      id: 9,
      title: "Ijro tugaganini eshitish",
      instruction: "'video' elementi tugagani (ended) haqida konsolga 'Tugadi' deb yozadigan hodisa tinglovchisini qo'shing.",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.addEventListener('ended', () => console.log('Tugadi'));",
      test: "if (code.includes(\"addEventListener('ended'\") || code.includes('addEventListener(\"ended\"')) return null; return 'ended hodisasi uchun addEventListener yozing.';"
    },
    {
      id: 10,
      title: "Metadata yuklanganda davomiylikni bilish",
      instruction: "Metama'lumotlar yuklanganda (loadedmetadata) video davomiyligini konsolga chiqaruvchi tinglovchi yozing.",
      startingCode: "const video = document.createElement('video');\n// Bu yerga yozing\n",
      hint: "video.addEventListener('loadedmetadata', () => console.log(video.duration));",
      test: "if (code.includes('loadedmetadata') && code.includes('duration')) return null; return 'loadedmetadata hodisasi va duration xususiyatidan foydalaning.';"
    },
    {
      id: 11,
      title: "Ovoz o'zgarganini tekshirish",
      instruction: "'audio' da ovoz o'zgarganini (volumechange) aniqlovchi event listener qo'shing.",
      startingCode: "const audio = document.createElement('audio');\n// Bu yerga yozing\n",
      hint: "audio.addEventListener('volumechange', () => {});",
      test: "if (code.includes('volumechange')) return null; return 'volumechange hodisasini eshiting.';"
    },
    {
      id: 12,
      title: "Media manbaini yangilash va qayta yuklash",
      instruction: "'video' manbasini o'zgartirgandan keyin yangi mediani qayta yuklash (load) metodini chaqiring.",
      startingCode: "const video = document.createElement('video');\nvideo.src = 'new.mp4';\n// Bu yerga yozing\n",
      hint: "video.load();",
      test: "if (code.includes('video.load()')) return null; return 'video.load() metodini chaqiring.';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "HTMLMediaElement interfeysida media faylni dasturiy o'ynatish uchun qaysi metod ishlatiladi?",
      options: [
        "media.start()",
        "media.play()",
        "media.resume()",
        "media.begin()"
      ],
      correctAnswer: 1,
      explanation: "play() metodi HTMLMediaElement (audio/video) ijro etilishini boshlaydi va Promise obyekti qaytaradi."
    },
    {
      id: 2,
      question: "Media elementini vaqtincha to'xtatish uchun qaysi metod chaqiriladi?",
      options: [
        "media.stop()",
        "media.halt()",
        "media.pause()",
        "media.break()"
      ],
      correctAnswer: 2,
      explanation: "pause() metodi medianing ijro etilishini to'xtatib turadi, ammo currentTime qiymatini nolga qaytarmaydi (o'sha joydan davom ettirish mumkin)."
    },
    {
      id: 3,
      question: "Media ijro etilayotganda joriy vaqt o'zgarishini real-vaqtda kuzatish uchun qaysi hodisa (event) ishlatiladi?",
      options: [
        "progress",
        "timeupdate",
        "playing",
        "change"
      ],
      correctAnswer: 1,
      explanation: "timeupdate hodisasi media ijro etilayotgan vaqtda currentTime xususiyati o'zgarganda tez-tez (sekundiga bir necha marta) ishga tushadi."
    },
    {
      id: 4,
      question: "Ijro etish tezligini 2 barobar tezlashtirish uchun qaysi xususiyat qanday o'zgartiriladi?",
      options: [
        "media.playbackRate = 2.0;",
        "media.speed = 2;",
        "media.rate = 200%;",
        "media.velocity = 2;"
      ],
      correctAnswer: 0,
      explanation: "playbackRate xususiyati medianing ijro etilish tezligini belgilaydi. Standart qiymat 1.0 bo'lib, 2.0 uni ikki barobar tezlashtiradi."
    },
    {
      id: 5,
      question: "Ovoz balandligi (volume) uchun qabul qilinadigan qiymatlar diapazoni qanday?",
      options: [
        "0 dan 100 gacha bo'lgan butun sonlar",
        "0.0 dan 1.0 gacha bo'lgan o'nlik sonlar",
        "-1.0 dan 1.0 gacha bo'lgan sonlar",
        "Cheklov yo'q"
      ],
      correctAnswer: 1,
      explanation: "volume xususiyati faqat 0.0 (mutloq ovozsiz) dan 1.0 (maksimal balandlik) oralig'idagi float son bo'lishi mumkin."
    },
    {
      id: 6,
      question: "Nima uchun media elementining 'duration' xususiyati sahifa yuklanishi bilan darhol o'qilganda NaN qaytishi mumkin?",
      options: [
        "Audio/Video fayl buzilgan bo'lsa",
        "Brauzer hali medianing o'lchami va vaqti haqidagi metama'lumotlarni yuklamagan bo'lsa",
        "Ovoz o'chirilgan (muted) bo'lsa",
        "duration xususiyati faqat audio uchun mavjud bo'lib, video uchun ishlamasa"
      ],
      correctAnswer: 1,
      explanation: "duration va o'lchamlar loadedmetadata hodisasi yuz berganidan keyingina aniq yuklanib bo'ladi. Ungacha bo'lgan vaqtda NaN qaytadi."
    },
    {
      id: 7,
      question: "Media fayl tugaganligini aniqlash uchun qaysi xususiyatdan foydalaniladi (boolean qiymat)?",
      options: [
        "media.finished",
        "media.ended",
        "media.completed",
        "media.isOver"
      ],
      correctAnswer: 1,
      explanation: "ended xususiyati agar media ijrosi o'z oxiriga yetgan bo'lsa true, aks holda false qiymatini qaytaradi."
    },
    {
      id: 8,
      question: "Media manbaini dinamik o'zgartirgandan so'ng, uni brauzerda yuklashni boshlash uchun qaysi metod chaqiriladi?",
      options: [
        "media.load()",
        "media.reload()",
        "media.fetch()",
        "media.update()"
      ],
      correctAnswer: 0,
      explanation: "load() metodi media elementini yangidan ishga tushiradi va yangi manbani (src) keshdan yoki tarmoqdan yuklaydi."
    },
    {
      id: 9,
      question: "Ovozni butunlay o'chirish (mute) uchun qaysi xususiyat ishlatiladi?",
      options: [
        "media.volume = 0;",
        "media.muted = true;",
        "Ikkala usul ham foydalaniladi, ammo muted = true ovoz balandligi xotirasini saqlab qoladi",
        "media.silence = true;"
      ],
      correctAnswer: 2,
      explanation: "muted = true ovozni o'chiradi, lekin volume darajasini o'zgartirmaydi, ya'ni qayta yoqqanda avvalgi balandlik tiklanadi. volume = 0 esa ovoz balandligini yo'qotadi."
    },
    {
      id: 10,
      question: "Media pleyerning tugashi bilash boshidan takror o'ynashi uchun loop xususiyati qanday sozlanadi?",
      options: [
        "media.loop = true;",
        "media.repeat = true;",
        "media.autoplay = true;",
        "media.cycle = true;"
      ],
      correctAnswer: 0,
      explanation: "loop xususiyati boolean tipida bo'lib, unga true berilsa media tugashi bilanoq avtomatik tarzda qaytadan o'ynashni boshlaydi."
    },
    {
      id: 11,
      question: "Videoni avtomatik o'ynatish (autoplay) muvaffaqiyatli bo'lishi uchun qaysi shart bajarilishi kerak?",
      options: [
        "Video faqat yuqori sifatli bo'lishi kerak",
        "Video ovozsiz (muted = true) holatda bo'lishi lozim",
        "Sahifada kamida bitta tugma bo'lishi shart",
        "Video autoplay atributiga ega bo'lmasa ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy brauzerlar ovozli kontentlarning foydalanuvchi ruxsatisiz avtomatik o'ynalishini taqiqlaydi. Shuning uchun muted qilingan media autoplay bo'ladi."
    },
    {
      id: 12,
      question: "Volume darajasi o'zgarganligini eshitish uchun qaysi event ishlatiladi?",
      options: [
        "change",
        "volumechange",
        "mutechange",
        "soundupdate"
      ],
      correctAnswer: 1,
      explanation: "volumechange hodisasi volume yoki muted xususiyatlari o'zgarganda ishga tushadi."
    }
  ]
};
