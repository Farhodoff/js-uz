export const streamsBuffers = {
  id: 'streams-buffers',
  title: 'Node.js Streams & Buffers',
  description: 'Learn how to handle massive data efficiently using Streams and Buffers in Node.js, understanding memory management, backpressure, and performance optimization.',
  theory: `
## Part 1: Beginner Analogy
Tasavvur qiling, sizga do'stingiz 10,000 litrlik hovuzni suvga to'ldirishni so'radi. Sizda bitta kichkina chelak bor. 
Agar siz suvni bir marta to'plab, keyin hammaga beraman desangiz (bu oddiy o'qish usuli - butun ma'lumotni xotiraga yuklash), sizga 10,000 litrlik bitta ulkan chelak (RAM) kerak bo'lardi. Bu imkonsiz yoki juda qimmat!

Buning o'rniga siz quvur (Pipe) ulab qo'yasiz. Suv uzluksiz oqib keladi va hovuzga tushadi. 
Siz bir tomchi suvni ham kutishingiz shart emas. 

- **Buffer**: Chelikdagi bir vaqtning o'zida tashiydigan suv miqdori (kichkina vaqtinchalik xotira). 
- **Stream**: Suvning quvur orqali uzluksiz oqimi. 

Node.js da katta fayllar yoki tarmoq so'rovlari xuddi shu quvur (Stream) va chelak (Buffer) yordamida qismlarga bo'linib, xotirani (RAM) ortiqcha to'ldirmasdan qayta ishlanadi.

## Part 2: Deep Dive
Node.js asosan V8 engine'da ishlaydi, va V8 ning RAM limiti cheklangan (1.5 - 2GB). Katta hajmdagi ma'lumotlarni (masalan 5GB video) qayta ishlashda Buffer va Streams muhim o'rin tutadi.

### Buffers (Buferlar)
V8 dvigateli asosan satrlar va sonlar bilan ishlaydi, ammo binar ma'lumotlarni qayta ishlashga qiynaladi. Buffer C++ da yozilgan maxsus xotira ajratuvchi mexanizm bo'lib, Node.js ga to'g'ridan-to'g'ri operativ xotiradan (RAM) V8 dan tashqarida xotira ajratishga imkon beradi. Buffer binar ma'lumotlar ustida juda tez ishlaydi.

### Streams (Oqimlar)
Streams asosan \`EventEmitter\` sinfidan meros oladi va quyidagi 4 ta asosiy turga bo'linadi:
1. **Readable**: O'qish mumkin bo'lgan oqimlar (masalan: \\\`fs.createReadStream\\\`, \\\`http.IncomingMessage\\\`).
2. **Writable**: Yozish mumkin bo'lgan oqimlar (masalan: \\\`fs.createWriteStream\\\`, \\\`http.ServerResponse\\\`).
3. **Duplex**: Ham o'qish, ham yozish mumkin bo'lgan oqimlar (masalan: TCP socket'lar).
4. **Transform**: Ma'lumotlarni o'qiyotganda yoki yozayotganda o'zgartirish (transformatsiya) mumkin bo'lgan Duplex oqimlari (masalan: \\\`zlib.createGzip\\\`).

### Libuv va Unumdorlik (Performance)
Node.js da Stream I/O operatsiyalari asinxron bo'lib, Libuv yordamida Thread Pool orqali operatsion tizim darajasida amalga oshiriladi. Streams Event Loop'ni to'sib qo'ymaydi va xotira (Memory footprint) miqdorini doimiy kichik saqlaydi, bu esa Node.js ning yengil va yuqori unumdor (High Performance) bo'lishini ta'minlaydi.

## Part 3: Edge Cases va Senior Interview Questions

**Savol: "Backpressure" (Orqa bosim) nima va u qanday hal qilinadi?**
Javob: Backpressure o'qish (Readable) oqimidan ma'lumot yozish (Writable) oqimiga qaraganda tezroq kelayotganda sodir bo'ladi. Bu holda ma'lumot xotirada yig'ila boshlaydi va RAM to'lib ketishi mumkin (OOM xavfi). Node.js da bu holatni hal qilish uchun \\\`readable.pipe(writable)\\\` ishlatiladi. \\\`pipe()\\\` funksiyasi avtomatik ravishda Writable oqimi band bo'lsa, Readable oqimini pauza qiladi (drain eventi kelguncha).

**Savol: \\\`Buffer.alloc()\\\` va \\\`Buffer.allocUnsafe()\\\` o'rtasidagi farq nima?**
Javob: \\\`Buffer.alloc(size)\\\` xotiradan joy ajratadi va uni nollar (zeros) bilan tozalab chiqadi. Bu biroz vaqt oladi, lekin xavfsiz. \\\`Buffer.allocUnsafe(size)\\\` esa xotiradan joy ajratadi lekin uni tozalamaydi. Eski ma'lumotlar (parollar va boshqa sezgir data) bo'lishi mumkin. Lekin unumdorligi (performance) bo'yicha ancha tez ishlaydi.

**Savol: Streamlarning Object Mode qanday ishlaydi?**
Javob: Odatda streamlar binar ma'lumot (Buffer) yoki String qabul qiladi. Agar siz \\\`{ objectMode: true }\\\` opsiyasini yoqsangiz, stream har qanday JavaScript obyektlarini qabul qilishi va uzatishi mumkin.

## Diagramma

\\\`\\\`\\\`mermaid
graph TD
    A[Readable Stream] -->|Data Chunk 1| B(Buffer Memory)
    B -->|pipe| C[Writable Stream]
    C --> D((File System / Network))
    A -->|Data Chunk 2 - Kutish| B
    B -.->|Backpressure - Oqim to'la| A
    C -->|Drain Event - Davom etamiz| A
\\\`\\\`\\\`

## Kod Namunasi

\\\`\\\`\\\`javascript
import { createReadStream, createWriteStream } from 'fs';

// Katta faylni o'qish va nusxalash
const readStream = createReadStream('./big_video.mp4');
const writeStream = createWriteStream('./copy_video.mp4');

// Pipe avtomatik backpressure'ni nazorat qiladi
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Nusxalash muvaffaqiyatli yakunlandi!');
});
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Buffer yaratish",
      description: "Hajmi 10 baytga teng bo'lgan nol bilan to'ldirilgan xavfsiz Buffer yarating.",
      codeTemplate: "// Kodingizni shu yerda yozing\n",
      solution: "const buf = Buffer.alloc(10);\nconsole.log(buf);"
    },
    {
      id: 2,
      title: "Bufferga matn yozish",
      description: "Yangi 15 baytli buffer yarating va unga 'Hello World' matnini yozing.",
      codeTemplate: "// Kodingizni shu yerda yozing\n",
      solution: "const buf = Buffer.alloc(15);\nbuf.write('Hello World');\nconsole.log(buf.toString());"
    },
    {
      id: 3,
      title: "Satrdan Buffer yaratish",
      description: "'Node.js' satridan foydalanib to'g'ridan-to'g'ri yangi Buffer yarating.",
      codeTemplate: "// Kodingizni shu yerda yozing\n",
      solution: "const buf = Buffer.from('Node.js');\nconsole.log(buf);"
    },
    {
      id: 4,
      title: "Readable Stream yaratish",
      description: "fs modulidan foydalanib 'data.txt' faylidan o'qiydigan Readable stream yarating va ma'lumotni konsolga chiqaring.",
      codeTemplate: "const fs = require('fs');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst readStream = fs.createReadStream('data.txt', 'utf8');\nreadStream.on('data', (chunk) => {\n  console.log(chunk);\n});"
    },
    {
      id: 5,
      title: "Writable Stream yaratish",
      description: "fs modulidan foydalanib 'output.txt' fayliga ma'lumot yozadigan Writable stream yarating.",
      codeTemplate: "const fs = require('fs');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst writeStream = fs.createWriteStream('output.txt');\nwriteStream.write('Hello Streams!\\n');\nwriteStream.end();"
    },
    {
      id: 6,
      title: "Pipe yordamida nusxalash",
      description: "'input.txt' dagi ma'lumotlarni pipe orqali 'output.txt' ga nusxalang.",
      codeTemplate: "const fs = require('fs');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst rs = fs.createReadStream('input.txt');\nconst ws = fs.createWriteStream('output.txt');\nrs.pipe(ws);"
    },
    {
      id: 7,
      title: "Stream finish eventi",
      description: "Faylni nusxalash tugaganini 'finish' eventi orqali bilib, konsolga 'Tugadi' yozing.",
      codeTemplate: "const fs = require('fs');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst rs = fs.createReadStream('input.txt');\nconst ws = fs.createWriteStream('output.txt');\nrs.pipe(ws);\nws.on('finish', () => console.log('Tugadi'));"
    },
    {
      id: 8,
      title: "Transform Stream bilan ishlash",
      description: "zlib modulidan createGzip ni o'rnatib, input.txt faylini zipe qilib output.txt.gz ga saqlang.",
      codeTemplate: "const fs = require('fs');\nconst zlib = require('zlib');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst zlib = require('zlib');\nconst gzip = zlib.createGzip();\nconst rs = fs.createReadStream('input.txt');\nconst ws = fs.createWriteStream('output.txt.gz');\nrs.pipe(gzip).pipe(ws);"
    },
    {
      id: 9,
      title: "Katta fayllarda xatolikni ushlash",
      description: "Mavjud bo'lmagan fayldan o'qishga harakat qilib, error eventini ushlab konsolga xatolikni chiqaring.",
      codeTemplate: "const fs = require('fs');\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\nconst rs = fs.createReadStream('missing.txt');\nrs.on('error', (err) => {\n  console.error('Xatolik:', err.message);\n});"
    },
    {
      id: 10,
      title: "Custom Transform Stream",
      description: "stream modulidan Transform ni import qilib, kirayotgan barcha matnlarni katta harflarga o'zgartiruvchi transform stream yarating.",
      codeTemplate: "const { Transform } = require('stream');\n// Kodingizni shu yerda yozing\n",
      solution: "const { Transform } = require('stream');\nconst uppercase = new Transform({\n  transform(chunk, encoding, callback) {\n    callback(null, chunk.toString().toUpperCase());\n  }\n});\nprocess.stdin.pipe(uppercase).pipe(process.stdout);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Buffer.allocUnsafe() funksiyasi haqida to'g'ri gapni toping.",
      options: [
        "U fayllarni o'chirish uchun ishlatiladi",
        "Xotiradan joy ajratadi lekin uni eski ma'lumotlardan tozalamaydi",
        "Dasturni to'xtatib qo'yadigan darajada xavfli",
        "U faqat Windows tizimida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "allocUnsafe xotiradan joyni tezda ajratadi, ammo zero-fill (nol bilan to'ldirish) qilmagani uchun xotirada qolgan eski ma'lumotlar qaytib chiqishi mumkin, shu jihatdan xavfli, ammo tez."
    },
    {
      id: 2,
      question: "Node.js da katta fayllarni qayta ishlash uchun eng maqbul usul nima?",
      options: [
        "fs.readFileSync() ni ishlatish",
        "Promise bilan faylni o'qish (fs.promises.readFile)",
        "Streams yordamida kichik qismlarga bo'lib o'qish va yozish",
        "Ma'lumotlar bazasidan to'g'ridan to'g'ri o'qish"
      ],
      correctAnswer: 2,
      explanation: "Streams xotirani ortiqcha band qilmasdan, faylni qismlarga (chunks) ajratib qayta ishlaydi. Katta fayllar uchun yagona maqbul yo'l shu."
    },
    {
      id: 3,
      question: "Qaysi xususiyat Writable va Readable xususiyatlarini o'zida birlashtirgan oqimga (stream) xos?",
      options: [
        "OnlyRead",
        "Duplex",
        "ReadableStream",
        "SingleStream"
      ],
      correctAnswer: 1,
      explanation: "Duplex ham o'qish, ham yozish imkoniyatini taqdim etuvchi Stream turidir."
    },
    {
      id: 4,
      question: "Stream orqali ma'lumotlarni siqish (zip) qanday amalga oshiriladi?",
      options: [
        "Duplex stream orqali",
        "Readable streamni o'zida zip opsiyasini yoqib",
        "Transform stream yordamida (masalan zlib.createGzip())",
        "Node.js da buning imkoni yo'q"
      ],
      correctAnswer: 2,
      explanation: "Transform oqimlari o'qilayotgan yoki yozilayotgan ma'lumotni o'zgartirish (masalan zipping) imkoniyatini beradi."
    },
    {
      id: 5,
      question: "Backpressure holati qachon yuz beradi?",
      options: [
        "O'qish tezligi yozish tezligidan yuqori bo'lganda",
        "Yozish tezligi o'qish tezligidan ancha yuqori bo'lganda",
        "Serverga hujum bo'lganda",
        "Fayl topilmagan hollarda"
      ],
      correctAnswer: 0,
      explanation: "Qabul qiluvchi (Writable) ma'lumotlarni o'qiydigan (Readable) tomonga nisbatan sekinroq ishlasa xotira to'lib qoladi va Backpressure yuz beradi."
    },
    {
      id: 6,
      question: "Backpressure oldini olish uchun Node.js da ko'pincha qaysi funksiyadan foydalaniladi?",
      options: [
        "stream.pause()",
        "stream.resume()",
        "readable.pipe(writable)",
        "stream.end()"
      ],
      correctAnswer: 2,
      explanation: "pipe() funksiyasi Writable band bo'lsa, Readable oqimni avtomat to'xtatib turadi, shuning uchun Backpressureni o'zi nazorat qiladi."
    },
    {
      id: 7,
      question: "Buffer qaysi dvigateldan tashqarida xotira ajratadi?",
      options: [
        "ChakraCore",
        "SpiderMonkey",
        "V8 Engine",
        "Libuv"
      ],
      correctAnswer: 2,
      explanation: "Node.js dagi Buffer obyektlari to'g'ridan-to'g'ri operativ xotirada (RAM) V8 ning xotira cheklovlaridan (heap) tashqarida joylashtiriladi."
    },
    {
      id: 8,
      question: "Qaysi Event Writable Streamda ma'lumotlarni yana qabul qilishga tayyor ekanligini bildiradi?",
      options: [
        "data",
        "ready",
        "finish",
        "drain"
      ],
      correctAnswer: 3,
      explanation: "Qachonki Writable oqimi bufferi to'lib, u yozishni to'xtatsa va keyinroq yana ma'lumot qabul qila olsa, 'drain' eventini chiqaradi."
    },
    {
      id: 9,
      question: "Object Mode streamlarning maqsadi nima?",
      options: [
        "Faqat binar ma'lumotlar bilan ishlash",
        "Matnni obyektlarga aylantirish",
        "Stream orqali har qanday JavaScript obyektlarini uzatish",
        "Xotira miqdorini doim 0 da ushlab turish"
      ],
      correctAnswer: 2,
      explanation: "Odatda streamlar Buffer yoki String uzatadi. Object Mode yoqilsa, uning ichida istalgan JS obyektlarini uzatish mumkin bo'ladi."
    },
    {
      id: 10,
      question: "Stream yordamida fayl nusxalayotganda jarayon tugaganini qanday bilsa bo'ladi?",
      options: [
        "Faqat readable 'end' eventi orqali",
        "Faqat writable 'finish' eventi orqali",
        "Hem readable 'end', ham writable 'finish' orqali tekshirish yaxshi amaliyot",
        "Node o'zi konsolga habar chiqaradi"
      ],
      correctAnswer: 2,
      explanation: "Readable 'end' bo'lganda o'qish tugaydi, Writable 'finish' bo'lganda yozish to'liq yakunlanadi. Ikkisini ham tinglash xavfsiz va aniq usuldir."
    },
    {
      id: 11,
      question: "Buffer.from('hello') funksiyasining vazifasi nima?",
      options: [
        "Stringni JS obyekti holatiga keltiradi",
        "Matnni o'chirib yuboradi",
        "'hello' matni asosida binar ma'lumotlar to'plami(Buffer) yaratadi",
        "Xatolik qaytaradi"
      ],
      correctAnswer: 2,
      explanation: "Buffer.from mavjud ma'lumotlardan (satr yoki massivlardan) yangi binar Buffer yaratadi."
    },
    {
      id: 12,
      question: "Qaysi holatda Streams ishlatish noqulay yoki tavsiya etilmaydi?",
      options: [
        "Video yoki audioni yuklashda",
        "Log fayllarni o'qib yozishda",
        "Faylning ma'lum bir so'nggi 2 ta qatorini o'qish zarurati bo'lganda (boshidan oxirigacha kerak bo'lmasa)",
        "Internet tezligi past bo'lganda"
      ],
      correctAnswer: 2,
      explanation: "Streams doim faylni boshi-oxiri bilan oqim sifatida uzatadi. Agar sizga faqat fayl oxiridan 10 bayt kerak bo'lsa, fs.read (file descriptor bilan) kabi past darajali API qulayroq."
    }
  ]
};
