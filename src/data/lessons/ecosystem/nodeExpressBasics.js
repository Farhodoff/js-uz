export const nodeExpressBasics = {
  id: "nodeExpressBasics",
  title: "Node.js & Express Asoslari va MongoDB Integratsiyasi",
  language: "javascript",
  theory: `## 1. 🟢 Node.js va Express nima?

**Node.js** — JavaScript'ni brauzerdan tashqarida, kompyuter yoki serverda ishlatish imkonini beruvchi muhit. Unda Fayl tizimi (\`fs\`), Tarmoq (\`http\`), Yo'llar (\`path\`) kabi qulay modullar bor.
**Express** — Node.js ustiga qurilgan, server yaratishni juda qulay va ixcham qiluvchi eng mashhur framework.

---

## 2. 🚀 Express ilovasini yaratish va Port muammosi

Ko'pgina qo'llanmalarda server yaratish quyidagicha sodda va xavfli ko'rsatiladi: \`app.listen(3000)\`. 
Lekin "real loyiha"larda bunday qilinmaydi! Nima uchun? Agar 3000-port boshqa dastur tomonidan band qilingan bo'lsa-chi? Yoki serverga joylaganimizda u boshqa portni talab qilsa-chi?

Shuning uchun haqiqiy loyihalarda **Muhit o'zgaruvchilari (Environment Variables)** ishlatiladi va port doim dinamik olinadi. Yana xatoliklarni ushlab qolish (\`error handling\`) yozilishi shart.

\`\`\`javascript
const express = require('express');
const app = express();

// .env faylidan yoki tizimdan portni oladi, bo'lmasa 3000 ishlatadi
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server muvaffaqiyatli ishlamoqda!');
});

// Xatoni ushlash bilan serverni yoqish
const server = app.listen(PORT, () => {
  console.log(\`✅ Server ishga tushdi. Port: \${PORT}\`);
});

// Agar port band bo'lsa qulab tushmasdan xabarni ko'rsatadi
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(\`❌ \${PORT} porti band. Boshqa port ishlating yoki avvalgisini yoping.\`);
  } else {
    console.error("Server xatosi: ", error);
  }
});
\`\`\`

---

## 3. 🌉 Middleware (Oraliq dastur) va \`next()\` jumbog'i

**Middleware** bu mijozning so'rovi (Request) va oxirgi javob (Response) o'rtasida ishlaydigan "tekshiruvchi bojxona" funksiyalaridir.

Ko'pchilik buni tushunadi, lekin eng muhim sir — \`next()\` ni esdan chiqaradi. 
**Qoida:** Agar middleware so'rovni o'zi to'xtatib (\`res.send\`) javob qaytarmasa, u albatta \`next()\` ni chaqirishi shart. Aks holda so'rov osilib qoladi va sahifa abadiy yuklanib turaveradi!

\`\`\`javascript
// 1. Oddiy Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(\`[Log]: \${req.method} \${req.url}\`);
  next(); // <== Buni yozmasangiz, dastur shu yerda qotadi!
};

// 2. Xatolik uchun maxsus next(error)
const checkAuthMiddleware = (req, res, next) => {
  const isAuth = false; // Aytaylik ruxsat yo'q
  if (isAuth) {
    next(); // Hammasi joyida, davom et
  } else {
    const error = new Error('Avtorizatsiyadan o\\'tilmagan!');
    error.status = 401;
    next(error); // <== Xatolik bilan maxsus Error Middleware'ga sakrash!
  }
};

app.use(loggerMiddleware);
app.use('/profil', checkAuthMiddleware, (req, res) => {
  res.send("Sizning profilingiz");
});

// 3. Error Handling Middleware (4 ta argument qabul qiladi)
app.use((err, req, res, next) => {
  console.error("Xato yuz berdi:", err.message);
  res.status(err.status || 500).send(err.message);
});
\`\`\`

---

## 4. 🌁 "Full Stack" ko'prigi: MongoDB bilan integratsiya

Faqatgina API yaratib qo'yish bilan ish bitmaydi. Haqiqiy Full Stack tizimda Node.js ilovasi albatta ma'lumotlar bazasiga ulanishi kerak. Bunga eng yaxshi misol MongoDB dushmani bo'lgan **Mongoose** kutubxonasidir. Express va MongoDB o'rtasidagi asosiy "ko'prik" quyidagicha quriladi:

\`\`\`javascript
const mongoose = require('mongoose');

// Baza bilan ulanish (Odatda URL .env faylda turadi)
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/mening_bazam';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB ma\\'lumotlar bazasiga muvaffaqiyatli ulandi!'))
  .catch((err) => console.error('❌ MongoDB ga ulanishda xato:', err));

// Mongoose sxemasi va model yaratish
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const User = mongoose.model('User', UserSchema);

// Yangi foydalanuvchini bazaga qo'shish marshruti
app.post('/api/users', async (req, res, next) => {
  try {
    const newUser = await User.create({ name: 'Ali', age: 25 });
    res.status(201).json(newUser);
  } catch (error) {
    next(error); // Xatoni tutib olish middleware ga jo'natadi
  }
});
\`\`\`
Darsliklarimizdagi bo'shliqni shu qism orqali yopamiz. Endi Node.js va Express ni tushunibgina qolmay, ularni MongoDB bilan qanday jonlantirishni ham bilasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Xavfsiz port tanlash",
      instruction: "process.env.PORT orqali portni olishni yarating, agar mavjud bo'lmasa 4000 portni ishlatsin va uni PORT deb nomlang.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const PORT = process.env.PORT || 4000;",
      test: "if (code.includes('process.env.PORT') && code.includes('||') && code.includes('4000')) return null; return 'process.env ishlatilganiga ishonch hosil qiling';"
    },
    {
      id: 2,
      title: "next() bilan yashash",
      instruction: "myMiddleware nomli middleware funksiya yarating va uning ichida albatta `next()` ni chaqiring.",
      startingCode: "const myMiddleware = (req, res, next) => {\n  // Bu yerga yozing\n};\n",
      hint: "next();",
      test: "if (code.includes('next()')) return null; return 'next() ni chaqirmasangiz sorov osilib qoladi';"
    },
    {
      id: 3,
      title: "Xatolik sakrashi",
      instruction: "errorMiddleware nomli middleware da agar if(true) bo'lsa, xatolik obyekti bilan `next(new Error('Xato'))` chaqiring.",
      startingCode: "const errorMiddleware = (req, res, next) => {\n  if(true) {\n    // Bu yerga yozing\n  }\n};\n",
      hint: "next(new Error('Xato'));",
      test: "if (code.includes('next(new Error(') || code.includes('next(')) return null; return 'next() ga xatolik obyekti bering';"
    },
    {
      id: 4,
      title: "MongoDB ko'prigi",
      instruction: "Mongoose kutubxonasi yordamida URL 'mongodb://localhost/test' ga ulanishni (connect) yozing.",
      startingCode: "const mongoose = require('mongoose');\n\n// Bu yerga yozing\n",
      hint: "mongoose.connect('mongodb://localhost/test');",
      test: "if (code.includes('mongoose.connect') && code.includes('mongodb://')) return null; return 'mongoose.connect orqali to\\'g\\'ri url ga ulaning';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Nima uchun Express ilovani `app.listen(3000)` kabi qattiq kodlangan (hardcoded) port bilan yaratmaslik kerak?",
      "options": [
        "Chunki 3000 omadsiz raqam",
        "Bu xavfsizlikka to'g'ri kelmaydi va Node.js ni buzadi",
        "Agar kompyuterda bu port band bo'lsa xatolik yuz beradi yoki deploy qilingan server o'zi alohida port talab qiladi",
        "React buni xohlamaydi"
      ],
      "correctAnswer": 2,
      "explanation": "Haqiqiy server va muhitlar doimiy bo'lmaydi. Port dinamik tanlanishi (.env orqali) va EADDRINUSE (port band) xatolari ushlanishi kerak."
    },
    {
      "id": 2,
      "question": "Middleware nima vazifa bajaradi?",
      "options": [
        "Faqat CSS ulab beradi",
        "Serverni o'chirib yoqadi",
        "Client dan kelgan so'rov (req) va uning javobi (res) o'rtasida tushib ishlovchi \"oraliq dastur\"",
        "Ma'lumotlar bazasini o'chiradi"
      ],
      "correctAnswer": 2,
      "explanation": "U o'rtadagi bojxona rolini o'ynaydi: req ni o'zgartirishi, tekshirishi (auth) va javobni to'xtatishi mumkin."
    },
    {
      "id": 3,
      "question": "Agar Middleware ichida `next()` chaqirilmasa nima yuz beradi?",
      "options": [
        "Avtomatik res.send chaqirilib ketadi",
        "So'rov o'sha yerda qotib osilib qoladi va client javob kutib turaveradi",
        "Server yonib ketadi",
        "Ekranga xatolik chiqadi"
      ],
      "correctAnswer": 1,
      "explanation": "next() - bu stafeta tayoqchasi. Agar funksiya o'z ishini tugatib javob jo'natmasa, albatta next() ni chaqirishi kerak, yo'qsa so'rov 'abadiy oraliqda' qoladi."
    },
    {
      "id": 4,
      "question": "`next(new Error('Kutilmagan xato'))` chaqirilsa dastur oqimi qayerga o'tadi?",
      "options": [
        "Darhol eng oddiy keyingi middleware ga",
        "To'g'ridan to'g'ri klientga",
        "Node.js dasturini darhol portlatib o'chiradi",
        "Barcha oraliq middleware-larni aylanib o'tib, eng oxiridagi Maxsus Error Handling Middleware (4 argumentli funksiya) ga sakraydi"
      ],
      "correctAnswer": 3,
      "explanation": "next() ga argument berilsa, Express buni xatolik deb tushunadi va oddiy routelarni sakrab o'tib faqat Error Handler ga boradi."
    },
    {
      "id": 5,
      "question": "Express va MongoDB o'rtasidagi aloqani ta'minlovchi mashhur ODM kutubxona nima deb nomlanadi?",
      "options": [
        "React",
        "Mongoose",
        "Lodash",
        "Axios"
      ],
      "correctAnswer": 1,
      "explanation": "Mongoose Node.js ilovasiga MongoDB ma'lumotlar bazasi bilan sodda va qat'iy sxemalar asosida muloqot qilish ('ko'prik' bo'lish) imkonini beradi."
    },
    {
      "id": 6,
      "question": "Mongoose da `mongoose.connect()` asinxron ishlaydimi?",
      "options": [
        "Ha, shuning uchun .then() va .catch() yoki async/await ishlatish mumkin",
        "Yo'q, u sinxron ishlaydi",
        "U faqat cb (callback) oladi",
        "Xato funksiya"
      ],
      "correctAnswer": 0,
      "explanation": "Bazaga ulanish tarmoq so'rovi orqali vaqt oladi, shuning uchun u Promise qaytaruvchi asinxron funksiyadir."
    },
    {
      "id": 7,
      "question": "`process.env` qanday maqsadda ishlatiladi?",
      "options": [
        "Log fayllarini o'chirish uchun",
        "Dastur ishlash jarayoni haqidagi muhit (environment) o'zgaruvchilariga, xususan yashirin kalitlar, port va parollarga ulanish uchun",
        "CSS ranglarini berish uchun",
        "Express ilovani yaratish uchun"
      ],
      "correctAnswer": 1,
      "explanation": "Loyihadagi qattiq kodlangan sirlarni va konfiguratsiyalarni .env fayli va process.env obyekti orqali xavfsiz boshqarish lozim."
    },
    {
      "id": 8,
      "question": "Error Handling Middleware nechtalik argumentdan iborat bo'ladi?",
      "options": [
        "1 ta: (req)",
        "2 ta: (req, res)",
        "3 ta: (req, res, next)",
        "4 ta: (err, req, res, next)"
      ],
      "correctAnswer": 3,
      "explanation": "Express da 4 ta argument oluvchi har qanday middleware avtomatik ravishda xato ushlovchi (error handler) hisoblanadi."
    },
    {
      "id": 9,
      "question": "`EADDRINUSE` xatosi qachon paydo bo'ladi?",
      "options": [
        "Bazaga ulanib bo'lmaganda",
        "Noto'g'ri middleware ishlatilsa",
        "Biz ko'rsatgan portda boshqa dastur allaqachon ishlayotgan bo'lsa",
        "Fayl topilmasa"
      ],
      "correctAnswer": 2,
      "explanation": "Error ADDRess IN USE degani - bu manzil (port) foydalanishda. Ko'pincha oldingi server o'chirilmay qolganda sodir bo'ladi."
    },
    {
      "id": 10,
      "question": "Node.js nima?",
      "options": [
        "U faqat brauzerda ishlovchi til",
        "U JavaScript kodini serverda bajaruvchi ishchi muhit (runtime environment)",
        "U C++ uchun fremvork",
        "U o'yin dvigateli"
      ],
      "correctAnswer": 1,
      "explanation": "Node.js tufayli biz JavaScript-ni backend-da (fayllarni o'qish, server ochish uchun) ishlata olamiz."
    },
    {
      "id": 11,
      "question": "`app.use()` qanday maqsadda ishlatiladi?",
      "options": [
        "Faqat GET so'rovlarni o'tkazish uchun",
        "Ilovaga global miqyosda ishlaydigan middleware'larni biriktirish uchun",
        "Bazani ulash uchun",
        "So'rovni to'xtatish uchun"
      ],
      "correctAnswer": 1,
      "explanation": "app.use() yordamida log yozuvchilar, CORS, yoki body-parser kabi oraliq dasturlar butun server so'rovlariga ulanadi."
    },
    {
      "id": 12,
      "question": "Agar biz xatoliklarni tutmasak, client tomonda qanday ta'sir bo'ladi?",
      "options": [
        "Sayt tezroq ishlaydi",
        "Server qulab tushishi mumkin, mijoz esa hech qanday ma'lumot yoki noaniq 500 html xato oladi",
        "Hech qanday",
        "Console.log yoziladi"
      ],
      "correctAnswer": 1,
      "explanation": "Real loyihalarda xatolik yuz bersa u chiroyli ko'rinishda ({ success: false, message: '...' }) qaytarilishi kerak, oddiy qulab tushishi yomon UX va xavfsizlikka ziddir."
    }
  ]
};
