const fs = require('fs');

const theoryContent = `
# Node.js: Events, Streams va Buffers (Yoki nega 1GB faylni RAMga yuklamaslik kerak?)

Assalomu alaykum! Bugun biz Node.js ning yuragi bo'lgan Events va Streams haqida gaplashamiz. Tasavvur qiling, sizga 10 litr suv (katta fayl) berishdi va uni boshqa joyga ko'chirish kerak. 

❌ YOMON usul: 10 litr suvni hammasini bitta katta chelakda ko'tarishga urinib, belingizni sindirib olasiz (RAM to'lib qolib, serveringiz "o'ladi").

✅ YAXSHI usul (Streams): Suvni truba orqali yuborasiz (kichik bo'laklarga, ya'ni Bufferlarga bo'lib). Shunda qancha suv bo'lishidan qat'iy nazar xotirjam o'tkazasiz.

## 1. Events (Voqealar)
Node.js asosan Event-Driven (voqealarga asoslangan) arxitekturada ishlaydi. \`EventEmitter\` yordamida biz o'z voqealarimizni yaratishimiz va ularni tutib olishimiz mumkin.

\`\`\`javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Quloq soluvchi (Listener)
myEmitter.on('kofe_tayyor', (ism) => {
  console.log(\`☕ \${ism} uchun kofe tayyor!\`);
});

// Voqeani chaqirish (Emitting)
myEmitter.emit('kofe_tayyor', 'Eshmat'); 
\`\`\`

## 2. Buffers
Buffer - bu vaqtinchalik xotira. Kompyuter ma'lumotlarni 0 va 1 larda (binar) ko'radi. Node.js dagi Buffer bizga shu xom ma'lumotlar bilan ishlash imkonini beradi. Odatda fayl o'qiyotganda yoki tarmoqdan ma'lumot kelayotganda Buffer ishlatiladi.

## 3. Streams (Oqimlar)
Streams - bu ma'lumotlarni bo'laklab (chunks) ishlash mexanizmi. 4 xil asosiy stream bor:
- **Readable:** O'qish uchun oqim (masalan, \`fs.createReadStream\`)
- **Writable:** Yozish uchun oqim (masalan, \`fs.createWriteStream\`)
- **Duplex:** Ham o'qish, ham yozish (TCP sockets)
- **Transform:** O'qilayotgan ma'lumotni o'zgartirib yozish (masalan, zlib siqish)

### Mermaid Diagramma (Stream qanday ishlaydi)
\`\`\`mermaid
sequenceDiagram
    participant D as Disk (Fayl)
    participant RS as Readable Stream
    participant WS as Writable Stream
    participant D2 as Disk (Yangi fayl)
    
    D->>RS: Chunk 1 (Buffer)
    RS->>WS: .pipe() orqali yuborish
    WS->>D2: Chunk 1 yozildi
    D->>RS: Chunk 2 (Buffer)
    RS->>WS: .pipe() orqali yuborish
    WS->>D2: Chunk 2 yozildi
    Note over RS,WS: RAMga faqat bitta chunk tushadi!
\`\`\`

## 🧠 Intervyu Savollari

1. **Savol:** \`EventEmitter\` dagi \`.on\` va \`.once\` metodlarining farqi nimada?
   **Javob:** \`.on\` orqali bog'langan listener har safar voqea (\`emit\`) chaqirilganda ishlaydi. \`.once\` esa faqatgina bir marta ishlaydi va keyin avtomatik o'chib ketadi.

2. **Savol:** Buffer nima uchun kerak, oddiy string ishlatib qo'ya qolmaymizmi?
   **Javob:** Buffer sof binar ma'lumotlar bilan ishlash uchun kerak. Stringlar ma'lum bir kodlash (masalan, UTF-8) formatida bo'ladi va faqat matn uchun xizmat qiladi. Rasm, video yoki tarmoq paketlari kabi binar ma'lumotlarni stringda saqlab bo'lmaydi.

3. **Savol:** Stream ishlatishning foydasi nimada? Nega \`fs.readFile\` o'rniga \`fs.createReadStream\` ishlatamiz?
   **Javob:** \`fs.readFile\` butun faylni RAMga yuklaydi, agar fayl 2GB bo'lsa server qulashi mumkin. \`fs.createReadStream\` esa ma'lumotni kichik bo'laklarga (chunk) bo'lib o'qiydi. Shunda RAMda juda kam joy band qilinadi (odatda 64KB).
`;

const exercises = [
  {
    id: 1,
    title: "Oddiy EventEmitter",
    instruction: "Node.js ning o'rnatilgan `events` modulidan foydalanib, yangi `EventEmitter` klassidan obyekt yarating. 'salom' voqeasi uchun listener qo'shing va u ishlaganda konsolga 'Salom dunyo!' deb chiqarsin. Oxirida 'salom' voqeasini emit qiling.",
    startingCode: "const EventEmitter = require('events');\n\n// Kodingizni shu yerda yozing\n",
    hint: "Avval `const emitter = new EventEmitter();` qiling. Keyin `emitter.on('salom', () => {...})` va `emitter.emit('salom')`.",
    test: "const logs=[];const orig=console.log;console.log=val=>logs.push(val); /*RUN*/ console.log=orig; if(logs.length !== 1 || logs[0] !== 'Salom dunyo!') throw new Error('Xato');"
  },
  {
    id: 2,
    title: ".once() metodini ishlatish",
    instruction: "`myEmitter` nomli EventEmitter obyekti berilgan. 'tugadi' voqeasiga faqat BIRTAMARTA ishlaydigan listener qo'shing. U konsolga 'Jarayon tugadi' deb chiqarsin. Voqeani ikki marta emit qilib ko'ring.",
    startingCode: "const EventEmitter = require('events');\nconst myEmitter = new EventEmitter();\n\n// Listener qo'shing va voqeani ikki marta emit qiling\n",
    hint: "`myEmitter.once('tugadi', ...)` dan foydalaning.",
    test: "const logs=[];const orig=console.log;console.log=val=>logs.push(val); /*RUN*/ console.log=orig; if(logs.length !== 1 || logs[0] !== 'Jarayon tugadi') throw new Error('Faqat bir marta chiqishi kerak');"
  },
  {
    id: 3,
    title: "Voqeaga argument yuborish",
    instruction: "'xabar' nomli voqeaga quloq soluvchi yarating. U argument sifatida foydalanuvchi ismini qabul qilsin va 'Xabar keldi: [ism]' shaklida konsolga chiqarsin. So'ngra 'xabar' voqeasini 'Eshmat' argumenti bilan emit qiling.",
    startingCode: "const EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\n// Kodingizni shu yerda yozing\n",
    hint: "`emitter.on('xabar', (ism) => { ... })` va `emitter.emit('xabar', 'Eshmat')` qiling.",
    test: "const logs=[];const orig=console.log;console.log=val=>logs.push(val); /*RUN*/ console.log=orig; if(!logs.includes('Xabar keldi: Eshmat')) throw new Error('Xato');"
  },
  {
    id: 4,
    title: "Buffer yaratish",
    instruction: "'Salom Node' yozuvini o'zida saqlovchi Buffer yarating va uni `myBuffer` o'zgaruvchisiga ta'minlang.",
    startingCode: "// Buffer.from(...) dan foydalaning\nlet myBuffer;\n",
    hint: "`myBuffer = Buffer.from('Salom Node');` qilib yarating.",
    test: "/*RUN*/ if(!Buffer.isBuffer(myBuffer) || myBuffer.toString() !== 'Salom Node') throw new Error('Buffer noto\\'g\\'ri yaratildi');"
  },
  {
    id: 5,
    title: "Buffer uzunligi va satrga o'girish",
    instruction: "Sizga binar ma'lumotli Buffer berilgan. Uning ichidagi yozuvni `str` o'zgaruvchisiga, uzunligini (baytlarda) esa `len` o'zgaruvchisiga saqlang.",
    startingCode: "const myBuf = Buffer.from('O\\'zbekiston');\n\nlet str;\nlet len;\n// Kodingizni yozing\n",
    hint: "Satrga o'girish uchun `.toString()`, uzunlik uchun `.length`.",
    test: "/*RUN*/ if(str !== 'O\\'zbekiston' || len !== myBuf.length) throw new Error('Xato');"
  },
  {
    id: 6,
    title: "Bo'sh Buffer yaratish (alloc)",
    instruction: "Uzunligi roppa-rosa 10 bayt bo'lgan va nollar bilan to'ldirilgan xavfsiz Buffer yarating. Uni `emptyBuf` o'zgaruvchisiga saqlang.",
    startingCode: "// Buffer.alloc ishlatib ko'ring\nlet emptyBuf;\n",
    hint: "`Buffer.alloc(10)` xavfsiz nolga to'lgan buffer yaratadi.",
    test: "/*RUN*/ if(!Buffer.isBuffer(emptyBuf) || emptyBuf.length !== 10 || emptyBuf[0] !== 0) throw new Error('Xato');"
  },
  {
    id: 7,
    title: "Readable Stream yaratish",
    instruction: "`fs` modulidan foydalanib, `test.txt` faylini o'qish uchun Readable Stream yarating va uni `reader` o'zgaruvchisiga saqlang. Fayl matn sifatida o'qilishi uchun encoding 'utf8' bo'lsin.",
    startingCode: "const fs = require('fs');\n\nlet reader;\n// Kodingizni yozing\n",
    hint: "`fs.createReadStream('test.txt', { encoding: 'utf8' })`",
    test: "const fs = require('fs'); fs.writeFileSync('test.txt','123'); /*RUN*/ if(!reader || typeof reader.pipe !== 'function') throw new Error('Yaratilmadi'); fs.unlinkSync('test.txt');"
  },
  {
    id: 8,
    title: "Stream 'data' voqeasi",
    instruction: "Sizga `reader` stream berilgan. Uning 'data' voqeasiga (event) listener qo'shing va o'qilgan har bir bo'lakni (chunk) konsolga chiqaring.",
    startingCode: "const fs = require('fs');\nconst reader = fs.createReadStream(__filename, { encoding: 'utf8' });\n\n// data voqeasini tinglang\n",
    hint: "`reader.on('data', (chunk) => console.log(chunk))`",
    test: "const logs=[];const orig=console.log;console.log=val=>logs.push(val); /*RUN*/ console.log=orig; setTimeout(() => { if(logs.length===0) throw new Error('Xato'); }, 100);"
  },
  {
    id: 9,
    title: "Writable Stream yaratish",
    instruction: "`fs` modulidan foydalanib, `output.txt` fayliga yozuvchi Writable Stream yarating va `writer` ga ta'minlang. So'ngra u orqali 'Salom stream' matnini yozing.",
    startingCode: "const fs = require('fs');\n\nlet writer;\n// Kodingizni yozing\n",
    hint: "`fs.createWriteStream('output.txt')` va `writer.write('Salom stream')`.",
    test: "/*RUN*/ if(!writer || typeof writer.write !== 'function') throw new Error('Xato'); setTimeout(() => { if(!fs.existsSync('output.txt')) throw new Error('Fayl yoq'); fs.unlinkSync('output.txt'); }, 100);"
  },
  {
    id: 10,
    title: "Pipe (.pipe) yordamida nusxalash",
    instruction: "Sizda ikkita stream bor: `readStream` va `writeStream`. Pipe mexanizmidan foydalanib, o'qilayotgan ma'lumotlarni to'g'ridan-to'g'ri yozuvchiga yo'naltiring (ulab qo'ying).",
    startingCode: "const fs = require('fs');\nconst readStream = fs.createReadStream(__filename);\nconst writeStream = fs.createWriteStream('copy.js');\n\n// pipe qiling\n",
    hint: "`readStream.pipe(writeStream);`",
    test: "/*RUN*/ setTimeout(() => { if(!fs.existsSync('copy.js')) throw new Error('Pipe ishlamadi'); fs.unlinkSync('copy.js'); }, 100);"
  }
];

const quizzes = [
  {
    id: 1,
    question: "Voqealar bilan ishlash uchun qaysi moduldan foydalaniladi?",
    options: ["fs", "path", "events", "http"],
    correctAnswer: 2,
    explanation: "Node.js da voqealarni (events) boshqarish uchun o'rnatilgan 'events' modulidan foydalaniladi."
  },
  {
    id: 2,
    question: "EventEmitter da voqeani chaqirish (yuzaga keltirish) uchun qaysi metod ishlatiladi?",
    options: [".on()", ".emit()", ".trigger()", ".call()"],
    correctAnswer: 1,
    explanation: ".emit('voqea_nomi') orqali biz o'sha voqeani chaqiramiz."
  },
  {
    id: 3,
    question: "Agar listener faqat bir marta ishlashini xohlasak, qaysi metod bilan ulaymiz?",
    options: [".on()", ".once()", ".listen()", ".bind()"],
    correctAnswer: 1,
    explanation: ".once() obunasi voqea bir marta sodir bo'lgandan keyin o'zini o'zi o'chirib yuboradi."
  },
  {
    id: 4,
    question: "Buffer Node.js da nima uchun xizmat qiladi?",
    options: ["Xatoliklarni ushlab qolish uchun", "Ma'lumotlar bazasiga ulanish uchun", "Binar ma'lumotlar bilan ishlash (saqlash/o'zgartirish) uchun", "HTML sahifalarni render qilish uchun"],
    correctAnswer: 2,
    explanation: "Buffer - xom binar (0 va 1) ma'lumotlar ustida amallar bajarish va xotirada ushlab turish uchun mo'ljallangan."
  },
  {
    id: 5,
    question: "Buffer.alloc(10) nima qiladi?",
    options: ["10 baytlik nol bilan to'ldirilgan buffer yaratadi", "Tarkibida '10' yozuvi bor buffer yaratadi", "10 megabayt xotira ajratadi", "Uzunligi noma'lum buffer yaratadi"],
    correctAnswer: 0,
    explanation: "Buffer.alloc xavfsiz usulda ko'rsatilgan bayt miqdoricha joy ajratadi va uni 0 (nol) bilan tozalab beradi."
  },
  {
    id: 6,
    question: "Streamlarning nechta asosiy turi mavjud Node.js da?",
    options: ["2 ta", "3 ta", "4 ta", "5 ta"],
    correctAnswer: 2,
    explanation: "4 ta: Readable, Writable, Duplex va Transform."
  },
  {
    id: 7,
    question: "Katta fayllarni o'qishda nega stream qulayroq?",
    options: ["Tezligi ancha sekin bo'lgani uchun xavfsizroq", "Faylni kichik qismlarga (chunk) bo'lib RAMni to'ldirib yubormasdan o'qiydi", "U faylni faqat string qilib o'qiy oladi", "Qulayroq emas, doim fs.readFile yaxshi"],
    correctAnswer: 1,
    explanation: "Stream faylni qismlarga (chunks) bo'lib o'qiydi, shuning uchun RAM sarfi juda kam bo'ladi."
  },
  {
    id: 8,
    question: ".pipe() metodining vazifasi nima?",
    options: ["O'qilayotgan stream ma'lumotlarini yozilayotgan streamga to'g'ridan-to'g'ri ulash", "Dasturni vaqtincha to'xtatib turish", "Kodni siqish (kompressiya)", "EventEmitterlarni birlashtirish"],
    correctAnswer: 0,
    explanation: "pipe() xuddi suv quvurlarini ulashtirgandek, Readable Stream dan kelayotgan oqimni to'g'ri Writable Stream ga o'tkazib beradi."
  },
  {
    id: 9,
    question: "Qaysi oqim (stream) turi ham o'qish, ham yozish xususiyatiga ega (masalan, TCP soketlar)?",
    options: ["Readable", "Writable", "Duplex", "Passive"],
    correctAnswer: 2,
    explanation: "Duplex oqimlar bir vaqtning o'zida Readable va Writable hisoblanadi."
  },
  {
    id: 10,
    question: "Ma'lumotlar stream orqali o'qilganda, qismlar qaysi obyekt ko'rinishida o'qiladi (agar encoding berilmagan bo'lsa)?",
    options: ["String", "Buffer", "Array", "Object"],
    correctAnswer: 1,
    explanation: "Agar Readable streamga encoding ko'rsatilmasa, 'data' voqeasi orqali keladigan chunk'lar Buffer obyektlari bo'ladi."
  },
  {
    id: 11,
    question: "Transform stream ning Duplex stream dan farqi nima?",
    options: ["Farqi yo'q", "Transform o'qish va yozishni qila olmaydi", "Transform oqimida yozilayotgan va o'qilayotgan ma'lumotlar o'zaro bog'liq (masalan siqish yoki o'zgartirish jarayoni)", "Transform faqat string oladi"],
    correctAnswer: 2,
    explanation: "Transform da kiritilgan ma'lumot qandaydir o'zgarishga uchrab (modifikatsiya qilinib) chiqadi (masalan, zlib siqilishi)."
  },
  {
    id: 12,
    question: "Agar Readable Stream da barcha ma'lumotlar o'qilib bo'lingan bo'lsa, qaysi voqea (event) chaqiriladi?",
    options: ["finish", "end", "close", "done"],
    correctAnswer: 1,
    explanation: "Readable stream'lar barcha ma'lumotlarni berib bo'lgach 'end' voqeasini emit qiladi (Writable streamlar esa 'finish' ni emit qiladi)."
  }
];

const escapedTheory = theoryContent.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');

const fileContent = `export const step3_events_streams = {
  theory: \`${escapedTheory}\`,
  exercises: ${JSON.stringify(exercises, null, 2)},
  quizzes: ${JSON.stringify(quizzes, null, 2)}
};
`;

fs.writeFileSync('/Users/farhod/Desktop/github/js-uz/src/data/lessons/nodejs/step3_events_streams.js', fileContent);
console.log('Fayl muvaffaqiyatli yangilandi');
