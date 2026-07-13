export const fileSystem = {
  id: 'file-system',
  title: 'Node.js File System (fs)',
  description: 'Learn how to interact with the file system using Node.js, including synchronous, asynchronous, and promise-based approaches.',
  theory: `
## Part 1: Beginner Analogy
Tasavvur qiling, siz katta bir kutubxonadasiz (bu sizning kompyuteringizning qattiq diski). Kutubxonachi (Node.js) kitoblarni (fayllarni) topishi, o'qishi, yozishi va o'chirishi kerak. 

Node.js da bu vazifani **fs** (File System) moduli bajaradi. Bu modul xuddi shu kutubxonachi kabi ishlaydi. 
- Siz kutubxonachiga "Shu kitobni o'qib ber" desangiz, u kitobni topib o'qiydi (\\\`fs.readFile\\\`).
- "Yangi kitob yoz" desangiz, yozadi (\\\`fs.writeFile\\\`).
- Agar siz "Men kutib turaman, ishingni tugatib ayt" desangiz, bu **sinxron** (Synchronous) jarayon bo'ladi.
- Agar siz "Sen ishni qilaver, men boshqa ishlarimni qilib turaman, tugatgach aytarsan" desangiz, bu **asinxron** (Asynchronous) jarayon bo'ladi.

## Part 2: Deep Dive
Node.js dagi \\\`fs\\\` moduli C++ da yozilgan bo'lib, operatsion tizimning fayl tizimi bilan to'g'ridan-to'g'ri ishlaydi. U uch xil API taqdim etadi:
1. **Callback-based API (Asinxron)**: Libuv yordamida non-blocking (to'siqsiz) ishlaydi. Thread pool'dan foydalanib OS darajasidagi fayl operatsiyalarini bajaradi.
2. **Promise-based API (Asinxron)**: \\\`fs/promises\\\` orqali ishlaydi. Zamonaviy \\\`async/await\\\` sintaksisi uchun eng qulay usul bo'lib, callback hell'ning oldini oladi.
3. **Synchronous API**: V8 engine main thread'ni to'sib (block qilib) qo'yadi. Faqatgina ilova ishga tushayotganda (initialization phase) konfiguratsiya fayllarini o'qish uchun tavsiya etiladi.

### Memory & Performance (Xotira va Unumdorlik)
Katta fayllarni \\\`fs.readFile\\\` orqali o'qish butun fayl hajmini RAM (xotira) ga yuklaydi. Agar fayl hajmi V8 engine ajratgan xotiradan (odatda 1.5GB - 2GB) oshib ketsa, ilova qulaydi (Out of Memory - OOM).
Shuning uchun katta fayllar bilan ishlashda doimo **Streams** (\\\`fs.createReadStream\\\`) dan foydalanish kerak. Streams faylni kichik qismlarga (chunks - odatda 64KB) bo'lib o'qiydi va memory footprint'ni minimal darajada ushlab turadi.

### Libuv va Thread Pool
Node.js asinxron fayl operatsiyalarini V8 da emas, balki Libuv ning Thread Pool'ida bajaradi. Odatiy holatda Thread Pool 4 ta thread'ga ega (\\\`UV_THREADPOOL_SIZE=4\\\`). Agar siz bir vaqtning o'zida 5 ta og'ir fayl operatsiyasini boshlasangiz, 5-operatsiya bo'sh thread paydo bo'lguncha kutib turadi.

## Part 3: Edge Cases va Senior Interview Questions

**Savol: \\\`fs.watch\\\` va \\\`fs.watchFile\\\` o'rtasidagi farq nima?**
Javob: \\\`fs.watch\\\` OS darajasidagi inotify (Linux) yoki FSEvents (macOS) dan foydalanadi va ancha tez ishlaydi, event-driven. \\\`fs.watchFile\\\` esa "polling" (muntazam tekshirish) usulidan foydalanadi, ya'ni fayl o'zgargan-o'zgarmaganligini bilish uchun vaqt-vaqti bilan \\\`fs.stat\\\` qilib turadi. Shuning uchun \\\`fs.watchFile\\\` CPU ni ko'proq band qiladi va sekinroq.

**Savol: File Descriptor (fd) nima va File descriptor leak qanday sodir bo'ladi?**
Javob: OS har bir ochilgan faylga maxsus raqam (\\\`fd\\\`) beradi. Agar siz faylni \\\`fs.open\\\` orqali ochib, so'ng \\\`fs.close\\\` orqali yopishni unutsangiz, OS u faylni ochiq deb o'ylaydi. OS da bir vaqtning o'zida ochilishi mumkin bo'lgan fayllar soni chegaralangan (masalan, Linux'da \\\`ulimit -n\\\`). Limitga yetganda, dastur \\\`EMFILE\\\` xatosini tashlaydi va qulaydi.

**Savol: \\\`fs.readFileSync\\\` dan qachon foydalanish kerak va qachon yo'q?**
Javob: Dastur ishga tushayotganda, konfiguratsiya (masalan, JSON) yoki SSL sertifikatlarni o'qishda ishlatish to'g'ri. Ammo veb-server ishlayotgan vaqtda har bir so'rov (request) uchun ishlatish mutlaqo taqiqlanadi, chunki u Event Loop'ni to'sib qo'yadi va boshqa foydalanuvchilar kutib qoladi.

## Diagramma

\\\`\\\`\\\`mermaid
graph TD
    A[JavaScript Code] -->|fs.readFile| B(Node.js Bindings - C++)
    B --> C{Libuv}
    C -->|I/O task| D[Thread Pool Worker 1]
    C -->|I/O task| E[Thread Pool Worker 2]
    D --> F((OS File System))
    E --> F
    F -->|Data & Callback| D
    D -->|Event Queue| G[Event Loop]
    G -->|Execute Callback| A
\\\`\\\`\\\`

## Kod Namunasi

\\\`\\\`\\\`javascript
import { promises as fs } from 'fs';

async function readConfig() {
  try {
    const data = await fs.readFile('./config.json', 'utf8');
    console.log('Fayl tarkibi:', data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Fayl topilmadi!');
    } else {
      console.error('Xatolik yuz berdi:', error.message);
    }
  }
}
readConfig();
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Fayl yaratish va yozish",
      description: "fs modulidan foydalanib hello.txt nomli fayl yarating va uning ichiga 'Hello Node.js' matnini yozing. Callback yoki Promise ishlatishingiz mumkin.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.writeFile('hello.txt', 'Hello Node.js', (err) => {\n  if (err) throw err;\n  console.log('Fayl saqlandi!');\n});"
    },
    {
      id: 2,
      title: "Faylni asinxron o'qish",
      description: "Yuqorida yaratilgan hello.txt faylini asinxron tarzda o'qing va natijani konsolga chiqaring.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.readFile('hello.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});"
    },
    {
      id: 3,
      title: "Faylni sinxron o'qish",
      description: "hello.txt faylini sinxron usulda o'qing va tarkibini qaytaring (konsolga chiqaring).",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nconst data = fs.readFileSync('hello.txt', 'utf8');\nconsole.log(data);"
    },
    {
      id: 4,
      title: "Promises bilan o'qish",
      description: "fs/promises yordamida hello.txt ni o'qib, konsolga chiqaradigan async funksiya yozing.",
      codeTemplate: "const fs = require('fs/promises');\n\nasync function readFile() {\n  // Kodingizni shu yerda yozing\n}\n\nreadFile();",
      solution: "const fs = require('fs/promises');\n\nasync function readFile() {\n  try {\n    const data = await fs.readFile('hello.txt', 'utf8');\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}\n\nreadFile();"
    },
    {
      id: 5,
      title: "Faylga qo'shimcha yozish (Append)",
      description: "hello.txt fayli oxiriga asinxron tarzda ' Appended text' so'zini qo'shing.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.appendFile('hello.txt', ' Appended text', (err) => {\n  if (err) throw err;\n  console.log('Qo\\'shildi');\n});"
    },
    {
      id: 6,
      title: "Fayl mavjudligini tekshirish",
      description: "hello.txt fayli mavjud yoki yo'qligini tekshiruvchi asinxron kod yozing.",
      codeTemplate: "const fs = require('fs/promises');\n\nasync function checkFile() {\n  // Kodingizni shu yerda yozing\n}\n\ncheckFile();",
      solution: "const fs = require('fs/promises');\n\nasync function checkFile() {\n  try {\n    await fs.access('hello.txt');\n    console.log('Mavjud');\n  } catch {\n    console.log('Mavjud emas');\n  }\n}\n\ncheckFile();"
    },
    {
      id: 7,
      title: "Papka (Directory) yaratish",
      description: "fs modulidan foydalanib my_folder nomli yangi papka yarating.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.mkdir('my_folder', { recursive: true }, (err) => {\n  if (err) throw err;\n  console.log('Papka yaratildi');\n});"
    },
    {
      id: 8,
      title: "Papkani o'qish",
      description: "Joriy direktoriya (papka) ichidagi barcha fayl va papkalar ro'yxatini konsolga chiqaring.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.readdir('.', (err, files) => {\n  if (err) throw err;\n  console.log(files);\n});"
    },
    {
      id: 9,
      title: "Fayl nomini o'zgartirish (Rename)",
      description: "hello.txt nomli faylni greetings.txt ga asinxron tarzda o'zgartiring.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.rename('hello.txt', 'greetings.txt', (err) => {\n  if (err) throw err;\n  console.log('Nomi o\\'zgartirildi');\n});"
    },
    {
      id: 10,
      title: "Faylni o'chirish (Unlink)",
      description: "greetings.txt faylini o'chirib tashlang.",
      codeTemplate: "const fs = require('fs');\n\n// Kodingizni shu yerda yozing\n",
      solution: "const fs = require('fs');\n\nfs.unlink('greetings.txt', (err) => {\n  if (err) throw err;\n  console.log('Fayl o\\'chirildi');\n});"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Qaysi fs metodi V8 Event Loop'ni to'sib qo'yadi?",
      options: [
        "fs.readFile()",
        "fs.readFileSync()",
        "fs.promises.readFile()",
        "fs.createReadStream()"
      ],
      correctAnswer: 1,
      explanation: "Barcha sinxron (Sync qo'shimchasi bor) metodlar Node.js ning asosiy oqimini to'sib qo'yadi."
    },
    {
      id: 2,
      question: "Fayl hajmi juda katta bo'lganda (masalan 5GB) qaysi usuldan foydalanish eng xavfsiz hisoblanadi?",
      options: [
        "fs.readFileSync()",
        "fs.readFile()",
        "fs.createReadStream()",
        "fs.promises.readFile()"
      ],
      correctAnswer: 2,
      explanation: "Streams faylni qismlarga bo'lib o'qiydi, shuning uchun katta fayllarda RAM (xotira) to'lib qolishi (OOM) sodir bo'lmaydi."
    },
    {
      id: 3,
      question: "fs.watch va fs.watchFile o'rtasidagi asosiy farq nima?",
      options: [
        "Ular bir xil ishlaydi, farqi yo'q.",
        "fs.watch OS event'lariga tayanadi, fs.watchFile esa faylni doimiy polling qiladi.",
        "fs.watchFile tezroq ishlaydi.",
        "fs.watch faqat papkalar uchun, watchFile esa faqat fayllar uchun."
      ],
      correctAnswer: 1,
      explanation: "fs.watch operatsion tizim (inotify/FSEvents) imkoniyatlaridan foydalanib samarali ishlaydi, watchFile esa muddatli tekshiruv (polling) qilgani uchun sekin va resurs talab qiluvchidir."
    },
    {
      id: 4,
      question: "Qaysi xatolik kodi fayl mavjud emasligini bildiradi?",
      options: [
        "EACCES",
        "EMFILE",
        "ENOENT",
        "EEXIST"
      ],
      correctAnswer: 2,
      explanation: "ENOENT (Error NO ENTry) tizim so'ralgan fayl yoki papkani topa olmaganda yuzaga keladi."
    },
    {
      id: 5,
      question: "Node.js da I/O operatsiyalarni (shundan jumladan fs) bajarish uchun qaysi kutubxona javobgar?",
      options: [
        "V8",
        "Libuv",
        "Express",
        "NPM"
      ],
      correctAnswer: 1,
      explanation: "Libuv Node.js ga asinxron, non-blocking I/O operatsiyalarni OS da Thread Pool orqali bajarish imkonini beradi."
    },
    {
      id: 6,
      question: "fs.appendFile() ning vazifasi nima?",
      options: [
        "Fayl boshiga ma'lumot qo'shadi",
        "Fayl oxiriga ma'lumot qo'shadi",
        "Faylni to'liq o'chirib, qaytadan yozadi",
        "Faylni o'chirib tashlaydi"
      ],
      correctAnswer: 1,
      explanation: "appendFile - fayl oxiriga ma'lumot qo'shish uchun ishlatiladi. Agar fayl yo'q bo'lsa, yaratadi."
    },
    {
      id: 7,
      question: "File Descriptor (fd) o'zi nima?",
      options: [
        "Faylning ichki hajmi (baytlarda)",
        "OS tomonidan ochiq faylga berilgan maxsus raqam/identifikator",
        "Faylning yashirin ekanligini bildiruvchi bayroq",
        "Fayl egasining ismi"
      ],
      correctAnswer: 1,
      explanation: "File Descriptor (fd) operatsion tizim darajasida ochiq bo'lgan har bir fayl uchun ajratiladigan butun sondir."
    },
    {
      id: 8,
      question: "Node.js papka ichidagi barcha fayllarni qanday o'qiydi?",
      options: [
        "fs.readDir()",
        "fs.readdir()",
        "fs.readFolder()",
        "fs.getFiles()"
      ],
      correctAnswer: 1,
      explanation: "Papkani o'qish uchun fs.readdir() yoki fs.readdirSync() metodlari ishlatiladi (kattasiz d harfi bilan emas)."
    },
    {
      id: 9,
      question: "fs API da promise-based metodlarni qayerdan import qilish kerak?",
      options: [
        "require('fs/promises')",
        "require('fs-promise')",
        "require('fs/async')",
        "require('fs').promise"
      ],
      correctAnswer: 0,
      explanation: "Node.js o'rnatilgan fs modulining barcha promise ga asoslangan metodlarini 'fs/promises' modulida saqlaydi."
    },
    {
      id: 10,
      question: "EMFILE xatoligi nimani bildiradi?",
      options: [
        "Fayl bo'sh ekanligini",
        "Operatsion tizim ruxsat bergan chegaradan ko'p fayl ochilganligini",
        "Fayl faqat o'qish uchun mo'ljallanganligini",
        "Faylni o'chirish imkoni yo'qligini"
      ],
      correctAnswer: 1,
      explanation: "EMFILE - OS bir vaqtning o'zida ochiq ushlab turishi mumkin bo'lgan maksimal file descriptor'lar sonidan oshib ketganligini anglatadi (Too many open files)."
    },
    {
      id: 11,
      question: "Faylni mutlaqo o'chirib tashlash uchun qaysi usuldan foydalaniladi?",
      options: [
        "fs.delete()",
        "fs.remove()",
        "fs.unlink()",
        "fs.destroy()"
      ],
      correctAnswer: 2,
      explanation: "fs.unlink() va fs.unlinkSync() orqali Unix tizimlariga o'xshab fayllar o'chiriladi."
    },
    {
      id: 12,
      question: "fs.access() metodi asosan nima uchun ishlatiladi?",
      options: [
        "Faylning parolini buzish uchun",
        "Faylga kirish huquqlarini tekshirish uchun (masalan mavjudligi, o'qish/yozish huquqi)",
        "Faylni xotiradan tozalash uchun",
        "Tizim papkasiga kirish uchun"
      ],
      correctAnswer: 1,
      explanation: "fs.access() faylning mavjudligini, shuningdek foydalanuvchida faylni o'qish/yozish (R_OK, W_OK, F_OK) huquqlari bor-yo'qligini tekshiradi."
    }
  ]
};
