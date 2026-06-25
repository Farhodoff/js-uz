export const tsConfigFile = {
  id: "ts-config-file",
  title: "tsconfig.json (Konfiguratsiya)",
  language: "json",
  theory: `## 1. 💡 Sodda Tushuntirish
**\`tsconfig.json\`** — bu TypeScript loyihangizning boshqaruv pulti (sozlamalar fayli). U TypeScript kompyutatoriga (compiler) kodingizni qanday o'qishi, qanday tekshirishi va qanday JavaScript (qaysi versiya) fayllariga aylantirishi kerakligini aytadi.
Agar loyihangizda \`tsconfig.json\` fayli bo'lsa, bu o'sha papka TypeScript loyihasining asosiy (root) qismi ekanligini bildiradi.

Eng ko'p ishlatiladigan sozlamalar (\`compilerOptions\` ichida):
- \`target\`: Qaysi JavaScript versiyasiga o'girish kerakligi (masalan, \`"ES5"\`, \`"ES2015"\`, \`"ESNext"\`).
- \`module\`: Qaysi modul tizimidan foydalanish (masalan, \`"CommonJS"\`, \`"ESNext"\`).
- \`strict\`: Qat'iy tur tekshiruvlarini (strict mode) yoqish. Buni doim \`true\` qilib qo'yish tavsiya etiladi.
- \`outDir\`: Yig'ilgan (kompilyatsiya qilingan) \`.js\` fayllar qayerga saqlanishi kerakligi.
- \`rootDir\`: Asosiy \`.ts\` fayllar joylashgan papka.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv (Yumshoq tekshiruvlar):**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES5",
    "strict": false,
    "noImplicitAny": false
  }
}
\`\`\`
*Izoh: \`strict: false\` bo'lsa, xatolar o'tkazib yuboriladi va TypeScript ning ko'p foydasi yo'qoladi.*

✅ **YAXSHI Yondashuv (Qat'iy tekshiruvlar va aniq tuzilma):**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
\`\`\`

## 🎤 Intervyu Savollari
1. **\`tsconfig.json\` fayli nima uchun kerak?**
   - Javob: TypeScript kompilyatori uchun sozlamalarni belgilaydi: qaysi fayllarni kompilyatsiya qilish va qay tartibda tekshirishni ko'rsatadi.
2. **\`target\` va \`module\` ning farqi nima?**
   - Javob: \`target\` natijaviy JS kodining sintaksis versiyasini (ES5, ES6) belgilaydi. \`module\` esa fayllar bir-biriga qanday ulanishini (import/export tizimini, masalan CommonJS yoki ESModules) bildiradi.
3. **Nima uchun \`strict\` rejimni \`true\` qilish kerak?**
   - Javob: U barcha qat'iy tekshiruvlarni (\`noImplicitAny\`, \`strictNullChecks\` kabi) yoqadi, bu esa kelajakda xatolar (bug) chiqishining oldini oladi va sifatli kod yozishga majbur qiladi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph LR;
    TS[src/app.ts] --> Compiler[TS Compiler];
    TS2[src/utils.ts] --> Compiler;
    Config(tsconfig.json) -.->|Sozlamalar| Compiler;
    Compiler --> JS1[dist/app.js];
    Compiler --> JS2[dist/utils.js];
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Strict Rejim",
      instruction: "Loyiha xavfsizroq bo'lishi uchun `compilerOptions` ichida qat'iy rejimni (`strict`) yoqing.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"strict\": true qilib yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
      test: "return /\"strict\"\\s*:\\s*true/.test(code);"
    },
    {
      id: 2,
      title: "Target ES6",
      instruction: "Loyihangizdagi TypeScript kodi zamonaviyroq ES6 versiyasidagi JavaScript-ga o'girilishi uchun `target` ni `\"ES6\"` qilib belgilang.",
      startingCode: "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
      hint: "\"target\": \"ES6\" qilib yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"target\": \"ES6\"\n  }\n}",
      test: "return /\"target\"\\s*:\\s*\"ES6\"/.test(code);"
    },
    {
      id: 3,
      title: "CommonJS moduli",
      instruction: "Kodingiz Node.js muhitida ishlashi uchun `module` tizimini `\"CommonJS\"` qilib belgilang.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"module\": \"CommonJS\" qo'shing.",
      solution: "{\n  \"compilerOptions\": {\n    \"module\": \"CommonJS\"\n  }\n}",
      test: "return /\"module\"\\s*:\\s*\"CommonJS\"/.test(code);"
    },
    {
      id: 4,
      title: "outDir (Chiqish papkasi)",
      instruction: "Kompilyatsiya qilingan `.js` fayllar alohida papkada saqlanishi uchun `outDir` parametrini `\"./dist\"` ga o'rnating.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"outDir\": \"./dist\" qo'shing.",
      solution: "{\n  \"compilerOptions\": {\n    \"outDir\": \"./dist\"\n  }\n}",
      test: "return /\"outDir\"\\s*:\\s*\"\\.\\/dist\"/.test(code);"
    },
    {
      id: 5,
      title: "rootDir (Asosiy papka)",
      instruction: "Kompilyator faqat ma'lum bir papkadagi kodlarni kuzatishi uchun `rootDir` parametrini `\"./src\"` ga o'rnating.",
      startingCode: "{\n  \"compilerOptions\": {\n    \"outDir\": \"./dist\"\n  }\n}",
      hint: "\"rootDir\": \"./src\" yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\"\n  }\n}",
      test: "return /\"rootDir\"\\s*:\\s*\"\\.\\/src\"/.test(code);"
    },
    {
      id: 6,
      title: "allowJs (JS fayllarga ruxsat)",
      instruction: "Loyiha ichidagi mavjud `.js` fayllarni ham kompilyatordan o'tkazishga ruxsat berish uchun `allowJs` ni `true` qiling.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"allowJs\": true yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"allowJs\": true\n  }\n}",
      test: "return /\"allowJs\"\\s*:\\s*true/.test(code);"
    },
    {
      id: 7,
      title: "noImplicitAny",
      instruction: "Agar tip aniq ko'rsatilmagan bo'lsa va uni avtomatik topib bo'lmasa xato berishi uchun `noImplicitAny` ni `true` qiling.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"noImplicitAny\": true qilib yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"noImplicitAny\": true\n  }\n}",
      test: "return /\"noImplicitAny\"\\s*:\\s*true/.test(code);"
    },
    {
      id: 8,
      title: "esModuleInterop",
      instruction: "CommonJS va ES Modullar o'rtasida ishlashni osonlashtirish uchun `esModuleInterop` parametrini `true` qiling.",
      startingCode: "{\n  \"compilerOptions\": {\n    \n  }\n}",
      hint: "\"esModuleInterop\": true qilib yozing.",
      solution: "{\n  \"compilerOptions\": {\n    \"esModuleInterop\": true\n  }\n}",
      test: "return /\"esModuleInterop\"\\s*:\\s*true/.test(code);"
    },
    {
      id: 9,
      title: "include (Qo'shish)",
      instruction: "`compilerOptions` dan **tashqarida**, kompilyator faqatgina `\"src/**/*\"` ichidagi fayllarni o'qishini ta'minlash uchun `include` massivini kiriting.",
      startingCode: "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
      hint: "Bosh obyekt ichida \"include\": [\"src/**/*\"] qo'shing.",
      solution: "{\n  \"compilerOptions\": {\n    \"strict\": true\n  },\n  \"include\": [\"src/**/*\"]\n}",
      test: "return /\"include\"\\s*:\\s*\\[\\s*\"src\\/\\*\\*\\/\\*\"\\s*\\]/.test(code);"
    },
    {
      id: 10,
      title: "exclude (Chiqarib tashlash)",
      instruction: "`compilerOptions` dan **tashqarida**, kompilyator chetlab o'tishi kerak bo'lgan fayllar papkasi `\"node_modules\"` ni `exclude` massiviga kiriting.",
      startingCode: "{\n  \"compilerOptions\": {},\n  \"include\": [\"src/**/*\"]\n}",
      hint: "\"exclude\": [\"node_modules\"] ni kiriting.",
      solution: "{\n  \"compilerOptions\": {},\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\"node_modules\"]\n}",
      test: "return /\"exclude\"\\s*:\\s*\\[\\s*\"node_modules\"\\s*\\]/.test(code);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "tsconfig.json fayli nima vazifani bajaradi?",
      options: [
        "Loyiha modullari va kutubxonalarini yuklab beradi",
        "TypeScript kompilyatoriga qanday sozlamalar bilan ishlashni ko'rsatadi",
        "Faqat CSS fayllarni tahrirlaydi",
        "React komponentlarini render qiladi"
      ],
      correctAnswer: 1,
      explanation: "tsconfig.json — bu TypeScript uchun asosiy konfiguratsiya faylidir."
    },
    {
      id: 2,
      question: "compilerOptions.target qaysi ma'noni bildiradi?",
      options: [
        "Kompilyatsiya bo'lgan JS kodning versiyasini (ES5, ES6 va hokazo)",
        "Dastur ishga tushadigan operatsion tizimni",
        "Qaysi brauzer ishlatilishini",
        "Modullarning eksport tizimini"
      ],
      correctAnswer: 0,
      explanation: "Target kompilyator natijasida chiqadigan JavaScript sintaksisi versiyasini ko'rsatadi."
    },
    {
      id: 3,
      question: "strict sozlamasi true bo'lsa nima sodir bo'ladi?",
      options: [
        "Kompilyatsiya vaqti uzayadi lekin ishlamaydi",
        "Barcha xavfsizlik va tip tekshiruvlari qat'iy rejimda ishlaydi",
        "Faqat ob'ektlar bilan ishlash taqiqlanadi",
        "Loyihani avtomatik formatlaydi"
      ],
      correctAnswer: 1,
      explanation: "strict: true barcha asosiy tur xavfsizligi qoidalarini faollashtiradi (masalan, null tekshiruvi va any taqiqi)."
    },
    {
      id: 4,
      question: "Kompilyatsiya qilingan JS fayllar alohida papkaga tushishi uchun qaysi xususiyat ishlatiladi?",
      options: [
        "outDir",
        "rootDir",
        "targetDir",
        "files"
      ],
      correctAnswer: 0,
      explanation: "outDir (output directory) belgilangan papkaga tayyor JS fayllarni joylashtiradi."
    },
    {
      id: 5,
      question: "Loyihada faqat qaysi fayllarni kompilyatsiya qilish kerakligini qanday belgilaymiz?",
      options: [
        "exclude orqali",
        "compilerOptions ichida only xususiyatida",
        "include va files massivlarida",
        "outDir da fayllarni sanab"
      ],
      correctAnswer: 2,
      explanation: "include massivi orqali kerakli fayl va papkalar (masalan ['src/**/*']) belgilab beriladi."
    },
    {
      id: 6,
      question: "noImplicitAny sozlamasi nima ish qiladi?",
      options: [
        "Har qanday turdan foydalanishga ruxsat beradi",
        "any tipini umuman ishlatishni man qiladi",
        "Tipi ko'rsatilmagan bo'lsa va avtomatik 'any' tipiga tushib qolsa, xato beradi",
        "Kodni xatosiz o'tkazib yuboradi"
      ],
      correctAnswer: 2,
      explanation: "Agar TS tur topa olmasa uni 'any' deydi. noImplicitAny yashirin (implicit) any larni taqiqlaydi."
    },
    {
      id: 7,
      question: "allowJs sozlamasining vazifasi nima?",
      options: [
        "Loyiha papkasidagi JS fayllarini kompilyatsiya qilishga ruxsat beradi",
        "Barcha TypeScript fayllarni JS ga aylantirmaydi",
        "Faqat JS fayllarni qabul qiladi",
        "Brauzerga JS ni yuklashga yordam beradi"
      ],
      correctAnswer: 0,
      explanation: "Loyiha aralash (ham JS, ham TS) bo'lganda js fayllarni import qilish va tekshirish uchun allowJs: true ishlatiladi."
    },
    {
      id: 8,
      question: "rootDir nimani bildiradi?",
      options: [
        "HTML fayllar saqlanadigan joyni",
        "Kompyuterdagi bosh papkani",
        "Asosiy TypeScript kodlari saqlanadigan papka, shu strukturani outDir da saqlaydi",
        "NPM paketlari joylashgan joyni"
      ],
      correctAnswer: 2,
      explanation: "rootDir kompilyator qaysi papkani o'zak sifatida qabul qilishini ko'rsatadi, u yerdagi struktura outDir ichiga xuddi shunday saqlanadi."
    },
    {
      id: 9,
      question: "esModuleInterop nima uchun ishlatiladi?",
      options: [
        "TypeScript ni o'chirib qo'yish uchun",
        "CommonJS modullarini xuddi ES6 Modullari kabi import qilish uchun sharoit yaratadi",
        "Xatoliklarni terminalda chiroyli ko'rsatadi",
        "Loyihani git ga avtomatik yuklaydi"
      ],
      correctAnswer: 1,
      explanation: "Masalan: import React from 'react' degan ES6 sintaksisini React kutubxonasi kabi CommonJS asosidagi modullar uchun xatosiz ishlashiga imkon beradi."
    },
    {
      id: 10,
      question: "Agar include ham, files ham ko'rsatilmagan bo'lsa, TypeScript qaysi fayllarni kompilyatsiya qiladi?",
      options: [
        "Faqat app.ts ni",
        "Hech qaysi faylni",
        "exclude dan tashqari papkadagi barcha .ts, .tsx va .d.ts fayllarni",
        "Faqat package.json ichida ko'rsatilganlarni"
      ],
      correctAnswer: 2,
      explanation: "Odatiy holatda, u loyihadagi barcha TypeScript fayllarni qidirib topib oladi."
    },
    {
      id: 11,
      question: "Barcha izohlarni (comments) tayyor JS fayllardan olib tashlash uchun qaysi sozlama kerak?",
      options: [
        "noComments",
        "removeComments",
        "deleteComments",
        "cleanJs"
      ],
      correctAnswer: 1,
      explanation: "removeComments: true bo'lsa, chiqadigan JS fayllarda izohlar tozalanadi va kod hajmi kichiklashadi."
    },
    {
      id: 12,
      question: "sourceMap sozlamasi true bo'lsa nima yaratiladi?",
      options: [
        "Loyihaning geografik xaritasi",
        "Faqat CSS xaritalar",
        ".js.map fayllari yaratiladi, ular JS dan asl TS kodini topish (debug) imkonini beradi",
        "Kompilyatsiya vaqtini hisoblaydigan jadval"
      ],
      correctAnswer: 2,
      explanation: "sourceMap brauzerda yoki Node da nosozliklarni izlashda (debug), bevosita JS ni emas, siz yozgan TS kodni ko'rish uchun yo'riqnoma yaratadi."
    }
  ]
};
