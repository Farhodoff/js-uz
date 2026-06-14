export const tsConfigFile = {
  id: "tsConfigFile",
  title: "TypeScript Config (tsconfig.json chuqur tahlili)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### tsconfig.json nima?
**tsconfig.json** — bu TypeScript loyihangizning \"miyasidir\". U TypeScript kompilyatoriga (tsc) kodni JavaScript-ga qanday o'girish (transpile qilish), qaysi fayllarni tekshirish va qanday qat'iylik (strictness) darajasida xatolarni aniqlash kerakligini aytib beradi.
Bu xuddi **avtomobil sozlamalari paneliga** o'xshaydi: siz unda sport rejimini (strict mode), qaysi yo'nalish bo'yicha harakatlanishni (target output) va xavfsizlik yostiqchalari sezgirligini (module resolution) sozlashingiz mumkin. Noto'g'ri sozlangan config kodingizni ishlamasligiga yoki xavfsizlik darajasining pasayishiga olib keladi.

---

## 2. 💻 Real Kod Misollari

### 1. Asosiy tsconfig.json tuzilmasi
Quyida standart va tavsiya etiladigan \\\`tsconfig.json\\\` sozlamalari berilgan:
\\\`\\\`\\\`json
{
  "compilerOptions": {
    "target": "es2022",                /* Target JS versiyasi (brauzerlar tushunishi uchun) */
    "module": "commonjs",              /* Modul tizimi (commonjs yoki esnext) */
    "strict": true,                    /* Barcha strict tiplash qoidalarini yoqish */
    "esModuleInterop": true,           /* CommonJS va ES modullari o'rtasidagi kelishuv */
    "forceConsistentCasingInFileNames": true, /* Fayl nomlarining registriga e'tibor berish */
    "skipLibCheck": true,              /* Kutubxonalar (.d.ts) ichidagi tiplarni tekshirmaslik */
    "outDir": "./dist"                 /* JS kodlari saqlanadigan papka */
  },
  "include": ["src/**/*"],             /* Faqat src ichidagi fayllarni tekshirish */
  "exclude": ["node_modules", "dist"]  /* Tekshiruvdan tashqari qilinadigan papkalar */
}
\\\`\\\`\\\`

### 2. Strict bayroqlari (Strict Flags)
\\\`"strict": true\\\` yoqilganda TypeScript quyidagi qoidalarni avtomatik tarzda majburiy qiladi:
* **\\\`noImplicitAny\\\`** — Tip aniq ko'rsatilmagan va TS uni aniqlay olmagan o'zgaruvchilarga avtomatik \\\`any\\\` berilishini taqiqlaydi.
* **\\\`strictNullChecks\\\`** — O'zgaruvchilarga \\\`null\\\` va \\\`undefined\\\` berilishini alohida tekshiradi.
\\\`\\\`\\\`typescript
// strictNullChecks: true bo'lganda
let name: string = "Doston";
// name = null; // XATO! string tipiga null berib bo'lmaydi.

// To'g'rilash:
let optionalName: string | null = null;
\\\`\\\`\\\`

### 3. Path Aliases (Yo'l taxalluslari)
Katta loyihalarda juda uzun nisbiy yo'llardan (masalan \\\`../../components/Button\\\`) qochish uchun path taxalluslari ishlatiladi:
\\\`\\\`\\\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
\\\`\\\`\\\`
Endi kodingizda to'g'ridan-to'g'ri \\\`import { Button } from "@components/Button"\\\` ko'rinishida yozishingiz mumkin.

---

## 3. 🎨 Kompilyator Oqimi (Compiler Pipeline)

TypeScript faylining JavaScript-ga o'girilish jarayonidagi \\\`tsconfig.json\\\` o'rni:

\`\`\`mermaid
graph LR
    TS["TypeScript Source (.ts)"] -->|tsconfig: include/exclude| TSC["TS Compiler (tsc)"]
    TSC -->|tsconfig: strict rules| Checker["Type Checker"]
    Checker -->|tsconfig: target/module| JS["JavaScript Output (.js)"]
    TSC -->|tsconfig: declaration| DTS["Declaration Files (.d.ts)"]
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`strict: false\` qilish
Yangi boshlovchilar tiplash xatolaridan qochish va osonroq kod yozish uchun strict rejimini o'chirib qo'yishadi. Bu TypeScript ishlatishning asosiy xavfsizlik ma'nosini yo'q qiladi.
* **Tuzatish:** Har doim \\\`strict: true\\\` qilib ishlang va yuzaga kelgan tiplash muammolarini generic yoki conditional tiplar yordamida yeching.

### 2. \`target\` ni eski versiyada qoldirish
Agar kodingiz faqat eng zamonaviy Node.js muhitida ishlasa, \\\`target\\\` parametrini \\\`es5\\\` deb sozlash keraksiz transpilyatsiya va keraksiz polyfill generatorlariga olib keladi.
* **Tuzatish:** Ishga tushadigan muhitingizga mos ravishda moslashtiring (masalan, \\\`es2022\\\` yoki \\\`esnext\\\`).

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** \`tsconfig.json\` fayli nima uchun xizmat qiladi?
   * **Javob:** TypeScript kompilyatoriga (tsc) kodni tekshirish va transpile qilish bo'yicha ko'rsatmalar beruvchi konfiguratsiya faylidir.
2. **Savol:** Loyihada qaysi fayllar tekshirilishini qaysi sozlamalar hal qiladi?
   * **Javob:** \\\`include\\\` (kiritiladigan fayllar) va \\\`exclude\\\` (tekshirilmaydigan fayllar) massivlari orqali belgilanadi.
3. **Savol:** \`"strict": true\` nimani anglatadi?
   * **Javob:** Barcha qat'iy tip tekshirish qoidalarini (noImplicitAny, strictNullChecks va boshqalar) birgalikda faollashtiradi.
4. **Savol:** \`"target"\` konfiguratsiyasi nima?
   * **Javob:** TypeScript kodi o'giriladigan JavaScript versiyasini belgilaydi (masalan: es5, es6, es2022).

### Middle
5. **Savol:** \`"noImplicitAny"\` yoqilganda kompilyator nima qiladi?
   * **Javob:** Agar funksiya argumenti yoki o'zgaruvchi tipi ko'rsatilmagan bo'lsa va uni avtomatik aniqlash iloji bo'lmasa, TS xatolik beradi (yashirin any-ga ruxsat yo't).
6. **Savol:** \`"strictNullChecks"\` qanday ishlaydi?
   * **Javob:** O'zgaruvchilarga to'g'ridan-to'g'ri \\\`null\\\` yoki \\\`undefined\\\` berishni taqiqlaydi. Ular alohida union tip sifatida ko'rsatilishi shart (\\\`string | null\\\`).
7. **Savol:** \`"esModuleInterop"\` nimani hal qiladi?
   * **Javob:** CommonJS va ES6 Modullari (import/export) o'rtasidagi moslikni ta'minlaydi. Masalan \\\`import express from "express"\\\` shaklida yozishga imkon beradi.
8. **Savol:** \`"skipLibCheck"\` nima uchun kerak?
   * **Javob:** Uchinchi tomon kutubxonalari (.d.ts) ichidagi tiplarni tekshirmaslik orqali kompilyatsiya tezligini oshiradi.

### Senior
9. **Savol:** \`"declaration": true\` nima beradi?
   * **Javob:** Har bir TS fayli uchun JavaScript kodi bilan birga uning tiplarini saqlovchi \\\`.d.ts\\\` faylini avtomatik yaratib boradi.
10. **Savol:** \`"moduleResolution"\` nimani anglatadi?
    * **Javob:** Modullarni import qilishda ularning joylashuvini qanday qidirib topishni (masalan: 'node' yoki 'bundler' algoritmlari) belgilaydi.
11. **Savol:** tsconfig-da \`"extends"\` xususiyati qachon qo'llaniladi?
    * **Javob:** Monorepo yoki bir nechta loyihalar uchun umumiy bo'lgan base (asosiy) tsconfig sozlamalarini meros qilib olishda ishlatiladi.
12. **Savol:** \`"incremental": true\` qanday ishlaydi va uning foydasi nima?
    * **Javob:** Avvalgi kompilyatsiya natijalarini keshga yozib qo'yadi va faqat o'zgargan fayllarni kompilyatsiya qiladi, bu esa build vaqtini sezilarli darajada qisqartiradi.
`,
  exercises: [
    {
      id: 1,
      title: "strictNullChecks muammosini tuzatish",
      instruction: "Quyidagi kodda strictNullChecks yoqilgan deb hisoblab, `User` interfeysidagi `address` maydoni string yoki null bo'lishi uchun to'g'ri tiplang.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n  // address string yoki null bo'la olsin\n  address: string;\n}\n",
      hint: "address: string | null;",
      test: "if (!code.includes('address: string | null') && !code.includes('address: null | string')) return 'address-ga string | null tipini bering';"
    },
    {
      id: 2,
      title: "noImplicitAny xatosini to'g'rilash",
      instruction: "Quyidagi funksiyaga argumentlarga tegishli tiplarni yozib, implicit any xatosini bartaraf eting.",
      startingCode: "function addNumbers(a, b) {\n  return a + b;\n}\n",
      hint: "function addNumbers(a: number, b: number) {",
      test: "if (code.includes('(a, b)')) return 'a va b argumentlariga tiplarni biriktiring';\nif (!code.includes('number')) return 'Argumentlar son bo\\'lishi lozim (number)';"
    },
    {
      id: 3,
      title: "tsconfig.json sozlash",
      instruction: "Compiler targets variantlarida es2022 versiyasini o'rnatish uchun yoziladigan xossani string formatida ko'rsating (o'zgaruvchi qiymati sifatida).",
      startingCode: "const configTargetSetting = '';\n",
      hint: "const configTargetSetting = 'target';",
      test: "if (!code.includes('target')) return 'Xossa nomi target bo\\'lishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "tsconfig.json-da TypeScript kodi o'giriladigan JavaScript versiyasini qaysi xususiyat belgilaydi?",
      options: [
        "module",
        "target",
        "lib",
        "outDir"
      ],
      correctAnswer: 1,
      explanation: "target xossasi es5, es6, es2022 kabi JavaScript-ning yakuniy versiyasini belgilaydi."
    },
    {
      id: 2,
      question: "Qaysi konfiguratsiya barcha qat'iy tip tekshirish qoidalarini bir vaqtda yoqadi?",
      options: [
        "strict: true",
        "strictNullChecks: true",
        "noImplicitAny: true",
        "forceConsistentCasingInFileNames: true"
      ],
      correctAnswer: 0,
      explanation: "strict: true barcha qat'iy tekshiruvlarni, jumladan noImplicitAny va strictNullChecks-ni faollashtiradi."
    },
    {
      id: 3,
      question: "noImplicitAny yoqilganda qaysi holatda kompilyator xatolik beradi?",
      options: [
        "Funksiya argumentining tipi ko'rsatilmaganda va TS uni aniqlay olmaganda",
        "O'zgaruvchiga null qiymat berilganda",
        "Standard let o'zgaruvchi ishlatilganda",
        "Kodda console.log yozilganda"
      ],
      correctAnswer: 0,
      explanation: "noImplicitAny yashirin any tiplariga ruxsat bermaydi va tip ko'rsatilmagan parametrlar uchun error beradi."
    },
    {
      id: 4,
      question: "outDir sozlamasining vazifasi nima?",
      options: [
        "TypeScript fayllarining joylashuv papkasi",
        "Kompilyatsiya qilingan JavaScript fayllari saqlanadigan maqsad papka",
        "Uchinchi tomon kutubxonalari papkasi",
        "Faqat CSS fayllari papkasi"
      ],
      correctAnswer: 1,
      explanation: "outDir (output directory) kompilyator yaratgan JS fayllarini qaysi papkaga yozishini belgilaydi."
    },
    {
      id: 5,
      question: "esModuleInterop nima uchun kerak?",
      options: [
        "Kodni tezroq kompilyatsiya qilish uchun",
        "CommonJS va ES modullari (import/export) o'rtasidagi kelishuvni ta'minlash uchun",
        "CSS modullari bilan ishlash uchun",
        "Faqat JSON fayllarini o'qish uchun"
      ],
      correctAnswer: 1,
      explanation: "esModuleInterop CommonJS modullarini xuddi ES6 default importlari kabi qulay yuklash imkonini beradi."
    },
    {
      id: 6,
      question: "skipLibCheck nima uchun foydali?",
      options: [
        "O'zimizning kodimizni tekshirmaydi",
        "Loyiha tez yig'ilishi (build) uchun kutubxonalar ichidagi .d.ts fayllarini tekshirishni tashlab ketadi",
        "TypeScript-ni o'chirib qo'yadi",
        "Faqat src ichidagi fayllarni tekshiradi"
      ],
      correctAnswer: 1,
      explanation: "skipLibCheck node_modules ichidagi kutubxonalar deklaratsiya fayllarini tekshirishdan qochib, tezlikni oshiradi."
    },
    {
      id: 7,
      question: "Kompilyatsiya paytida har bir fayl uchun uning tiplarini saqlovchi .d.ts faylini yaratish qaysi buyruq bilan yoqiladi?",
      options: [
        "declaration: true",
        "declarationMap: true",
        "dts: true",
        "emitDeclarationOnly: true"
      ],
      correctAnswer: 0,
      explanation: "declaration: true sozlamasi kompilyatorga har bir JS uchun tegishli tiplar faylini (.d.ts) ham yaratishni buyuradi."
    },
    {
      id: 8,
      question: "tsconfig.json-da include va exclude nima vazifani bajaradi?",
      options: [
        "Kompilyatsiya qilinadigan fayllar ro'yxatini belgilaydi va chiqarib tashlaydi",
        "Uchinchi tomon kutubxonalarini o'chiradi",
        "Target versiyasini o'zgartiradi",
        "Faqat Node.js modullarini sozlaydi"
      ],
      correctAnswer: 0,
      explanation: "include qaysi fayllarni tekshirish kerakligini, exclude esa qaysi papkalarni (masalan node_modules) chetlab o'tishni aytadi."
    },
    {
      id: 9,
      question: "noEmit: true sozlamasi kompilyatorda qanday ta'sir qiladi?",
      options: [
        "Kodni tekshiradi, lekin JS fayllarini diskka yozmaydi (faqat type-checking)",
        "Kompilyatsiyani to'xtatadi",
        "Faqat xatolarni yashiradi",
        "Fayllarni o'chirib yuboradi"
      ],
      correctAnswer: 0,
      explanation: "noEmit faqat tiplarning to'g'riligini tekshiradi (Type Checking) va natijada hech qanday JS faylini yaratmaydi."
    },
    {
      id: 10,
      question: "removeComments: true sozlamasi nimaga xizmat qiladi?",
      options: [
        "Koddagi barcha izohlarni (comments) o'chirib, toza JS kodini generatsiya qiladi",
        "Koddagi tiplarni o'chiradi",
        "Faqat console.loglarni o'chiradi",
        "TypeScript-ni tezlashtiradi"
      ],
      correctAnswer: 0,
      explanation: "removeComments yakuniy JavaScript faylidan barcha izohlarni (comments) tozalab tashlaydi."
    },
    {
      id: 11,
      question: "incremental: true sozlamasining foydasi nimada?",
      options: [
        "Loyiha hajmini kichraytiradi",
        "Faqat o'zgargan fayllarni kompilyatsiya qilib, keyingi build tezligini oshiradi",
        "Dinamik importlarni yoqadi",
        "Loyiha xavfsizligini kuchaytiradi"
      ],
      correctAnswer: 1,
      explanation: "incremental keshdan foydalanib faqat tahrirlangan fayllarni qayta tekshiradi va build tezligini oshiradi."
    },
    {
      id: 12,
      question: "strictNullChecks true bo'lganda quyidagi kodlardan qaysi biri xato beradi?",
      options: [
        "let a: string = 'test';",
        "let a: string | null = null;",
        "let a: string = null;",
        "let a: any = null;"
      ],
      correctAnswer: 2,
      explanation: "strictNullChecks yoqilgan bo'lsa, string tipiga to'g'ridan-to'g'ri null yoki undefined qiymat berib bo'lmaydi (xato beradi)."
    }
  ]
};
