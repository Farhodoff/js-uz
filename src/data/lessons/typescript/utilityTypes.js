export const utilityTypes = {
  id: "ts-utility-types",
  title: "Utility Types",
  language: "typescript",
  theory: `## 1. 💡 Beginner Analogy: The Swiss Army Knife of Types

Tasavvur qiling, sizda oddiy bir cho'ntak pichog'i bor. Ammo kutilmaganda sizga qaychi, otvyortka yoki arrali asbob kerak bo'lib qoldi. Siz har safar yangi asbob sotib olish o'rniga, barcha kerakli narsalarni o'z ichiga olgan **Swiss Army Knife** (Shveytsariya armiyasi pichog'i) ishlatsangiz ancha qulay.

TypeScript'dagi **Utility Types** xuddi shu ko'p funksiyali asbobga o'xshaydi. Sizda tayyor \\\`User\\\` yoki \\\`Product\\\` kabi turlar (types) bo'lsa va ularning ba'zi xususiyatlarini o'zgartirish kerak bo'lsa (masalan, barcha qismlarini ixtiyoriy qilish yoki ba'zi qismlarini yashirish), ularni noldan qayta yozmaysiz. Buning o'rniga siz TypeScript taqdim etgan Utility Types'dan foydalanasiz! Bu kodning takrorlanishini (DRY - Don't Repeat Yourself) oldini oladi.

## 2. 🧠 Deep Dive: Under the Hood (Chuqurroq Sho'ng'iymiz)

Keling, Utility Types aslida qanday ishlashini va TypeScript Compiler (tsc) ularni qanday tushunishini ko'rib chiqamiz.

### TS Compiler (tsc) va Type Erasure
TypeScript'da yozilgan barcha \\\`Utility Types\\\` (va umuman tiplar) faqatgina kompilyatsiya vaqtida (compile-time) tekshiriladi. Dastur ishga tushganda (runtime - JavaScript'ga o'girilganda) bu turlar umuman mavjud bo'lmaydi. Bu jarayon **Type Erasure** deb ataladi. Ya'ni, \\\`Partial<User>\\\` yoki \\\`Omit<Product, 'price'>\\\` kabi yozuvlar sizning JavaScript kodingiz hajmini kattalashtirmaydi va xotiraga qo'shimcha og'irlik tushirmaydi. Xotirada va ishlash tezligida (performance) hech qanday pasayish bo'lmaydi.

### Under the Hood: Mapped Types
Ko'pgina Utility Types aslida **Mapped Types** orqali yaratilgan. Masalan, \\\`Partial<T>\\\` aslida qanday yozilgan?
\\\`\\\`\\\`typescript
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
\\\`\\\`\\\`
Bu yerda kompilyator \\\`T\\\` ning har bir kalitini (\\\`keyof T\\\`) aylanib chiqadi va unga \\\`?\\\` (ixtiyoriy) belgisini qo'shib chiqadi.

\\\`Omit\\\` qanday ishlaydi?
\\\`\\\`\\\`typescript
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
\\\`\\\`\\\`
Ko'rib turganingizdek, \\\`Omit\\\` boshqa ikkita utility tipning (\\\`Pick\\\` va \\\`Exclude\\\`) kombinatsiyasidir!

## 3. ⚠️ Edge Cases va Senior Interview Savollari

Utility Types ishlatishda bazi nozik holatlar (edge cases) mavjud:

- **\\\`Readonly\\\` va Nested Objects (Ichma-ich obyektlar):**
  \\\`Readonly<T>\\\` faqat birinchi darajadagi (shallow) maydonlarni o'zgartirib bo'lmaydigan qiladi. Agar obyektingiz ichida yana obyekt bo'lsa, u chuqur darajada (deep) o'zgartirib bo'lmaydigan holatga o'tmaydi.
  \\\`\\\`\\\`typescript
  interface Config { nested: { port: number } }
  const c: Readonly<Config> = { nested: { port: 8080 } };
  c.nested.port = 3000; // Xatolik bermaydi! Edge case!
  \\\`\\\`\\\`

- **\\\`Record\\\` va aniq kalitlar (Literal Types):**
  \\\`Record<string, number>\\\` yozganda kalitlar istalgan string bo'lishi mumkin. Lekin ko'pincha \\\`Record<'A' | 'B', number>\\\` kabi aniq kalitlardan foydalanish xavfsizroq yondashuv hisoblanadi.

### 🎤 Senior Interview Savollari

1. **Savol:** \\\`Omit\\\` qanday ishlaydi va uning o'rniga nima uchun \\\`Pick\\\` ishlatsa ham bo'ladi deb o'ylaysiz?
   **Javob:** \\\`Omit\\\` asli \\\`Pick<T, Exclude<keyof T, K>>\\\` dan iborat. \\\`Pick\\\` faqat ko'rsatilganlarni oladi, \\\`Omit\\\` esa olib tashlangandan qolganlarini oladi. Ikkisi ham bir-birining inkoridir. Agar yashiriladigan maydonlar ko'p bo'lsa \\\`Pick\\\`, tanlanadiganlari ko'p bo'lsa \\\`Omit\\\` ishlatgan ma'qul.

2. **Savol:** TypeScript'da \\\`DeepPartial\\\` qanday yaratiladi?
   **Javob:** Tayyor \\\`Partial\\\` faqat yuqori (shallow) darajada ishlaydi. \\\`DeepPartial\\\` ni recursion (o'zini o'zi chaqirish) orqali yasashimiz kerak: 
   \\\`\\\`\\\`typescript
   type DeepPartial<T> = T extends object ? {
     [P in keyof T]?: DeepPartial<T[P]>;
   } : T;
   \\\`\\\`\\\`

3. **Savol:** \\\`ReturnType\\\` qachon va nega ishlatiladi?
   **Javob:** Uchinchi tomon kutubxonalari (third-party libraries) o'zlarining funksiya qaytarish tiplarini eksport qilmaganda, biz \\\`ReturnType<typeof someFunction>\\\` orqali uni avtomatik o'qib olishimiz mumkin. Bu juda ham qulay.

## 📊 Diagramma: Utility Types Jarayoni

\\\`\\\`\\\`mermaid
graph TD;
    OriginalType[Asl Type] --> PartialNode[Partial];
    OriginalType --> RequiredNode[Required];
    OriginalType --> ReadonlyNode[Readonly];
    OriginalType --> OmitNode[Omit];
    OriginalType --> PickNode[Pick];
    
    PartialNode --> PartialDesc[Barcha maydonlar ixtiyoriy boladi];
    RequiredNode --> RequiredDesc[Barcha maydonlar majburiy boladi];
    ReadonlyNode --> ReadonlyDesc[Shallow Readonly holatga otadi];
    OmitNode --> OmitDesc[Keraksiz xususiyatlar kesib tashlanadi];
    PickNode --> PickDesc[Faqat kerakli xususiyatlar qoladi];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Partial ishlatish",
      instruction: "\`User\` tipidagi barcha maydonlarni ixtiyoriy (optional) qiluvchi yordamchi turni \`Partial\` yordamida belgilang.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction updateUser(user: ___) {\n  return user;\n}",
      hint: "Parametr turini aniqlashda Partial<User> dan foydalaning.",
      solution: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction updateUser(user: Partial<User>) {\n  return user;\n}",
      test: "return /Partial\\s*<\\s*User\\s*>/.test(code);"
    },
    {
      id: 2,
      title: "Required orqali majburiy qilish",
      instruction: "Barcha maydonlari ixtiyoriy bo'lgan \`Config\` interfeysidan barcha maydonlari majburiy bo'lgan yangi tipni \`Required\` yordamida yarating.",
      startingCode: "interface Config {\n  port?: number;\n  host?: string;\n}\n\ntype FullConfig = ___;\n",
      hint: "Required<Config> ishlating.",
      solution: "interface Config {\n  port?: number;\n  host?: string;\n}\n\ntype FullConfig = Required<Config>;\n",
      test: "return /Required\\s*<\\s*Config\\s*>/.test(code);"
    },
    {
      id: 3,
      title: "Readonly ma'lumotlar",
      instruction: "\`Settings\` obyektini o'zgartirib bo'lmaydigan (readonly) qilish uchun mos turdan foydalaning.",
      startingCode: "interface Settings {\n  theme: string;\n}\n\nconst mySettings: ___ = {\n  theme: 'dark'\n};",
      hint: "Readonly<Settings> yozing.",
      solution: "interface Settings {\n  theme: string;\n}\n\nconst mySettings: Readonly<Settings> = {\n  theme: 'dark'\n};",
      test: "return /Readonly\\s*<\\s*Settings\\s*>/.test(code);"
    },
    {
      id: 4,
      title: "Pick orqali xususiyatlarni tanlash",
      instruction: "\`Product\` turidan faqat \`id\` va \`name\` maydonlarini olib, \`ProductSummary\` turini quring.",
      startingCode: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductSummary = ___;\n",
      hint: "Pick<Product, 'id' | 'name'> ishlating.",
      solution: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductSummary = Pick<Product, 'id' | 'name'>;\n",
      test: "return /Pick\\s*<\\s*Product\\s*,\\s*(['\"]id['\"]\\s*\\|\\s*['\"]name['\"]|['\"]name['\"]\\s*\\|\\s*['\"]id['\"])\\s*>/.test(code);"
    },
    {
      id: 5,
      title: "Omit orqali keraksiz maydonlarni tashlash",
      instruction: "\`Product\` turidan \`desc\` maydonini olib tashlab, \`ProductCard\` turini quring.",
      startingCode: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductCard = ___;\n",
      hint: "Omit<Product, 'desc'> ishlating.",
      solution: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductCard = Omit<Product, 'desc'>;\n",
      test: "return /Omit\\s*<\\s*Product\\s*,\\s*['\"]desc['\"]\\s*>/.test(code);"
    },
    {
      id: 6,
      title: "Record orqali qatiy Map yaratish",
      instruction: "Kalitlari string, qiymatlari number bo'lgan \`StringNumberMap\` obyekt tipini yaratish uchun \`Record\` ishlating.",
      startingCode: "type StringNumberMap = ___;\n\nconst ages: StringNumberMap = {\n  ali: 25,\n  vali: 30\n};",
      hint: "Record<string, number> dan foydalaning.",
      solution: "type StringNumberMap = Record<string, number>;\n\nconst ages: StringNumberMap = {\n  ali: 25,\n  vali: 30\n};",
      test: "return /Record\\s*<\\s*string\\s*,\\s*number\\s*>/.test(code);"
    },
    {
      id: 7,
      title: "Exclude orqali variantlarni ayirish",
      instruction: "\`T0\` turida \`'a' | 'b' | 'c'\` mavjud. Undan \`'a'\` ni chiqarib tashlab \`T1\` turini yasang.",
      startingCode: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = ___;\n",
      hint: "Exclude<T0, 'a'> ishlating.",
      solution: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = Exclude<T0, 'a'>;\n",
      test: "return /Exclude\\s*<\\s*T0\\s*,\\s*['\"]a['\"]\\s*>/.test(code);"
    },
    {
      id: 8,
      title: "Extract orqali keraklilarini ajratish",
      instruction: "\`T0\` turidagi \`'a' | 'b' | 'c'\` qiymatlaridan faqat \`'a' | 'f'\` lar bilan umumiy bo'lganlarini kesishmasini ajratib oling.",
      startingCode: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = ___;\n",
      hint: "Extract<T0, 'a' | 'f'> ishlating.",
      solution: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = Extract<T0, 'a' | 'f'>;\n",
      test: "return /Extract\\s*<\\s*T0\\s*,\\s*(['\"]a['\"]\\s*\\|\\s*['\"]f['\"]|['\"]f['\"]\\s*\\|\\s*['\"]a['\"])\\s*>/.test(code);"
    },
    {
      id: 9,
      title: "NonNullable orqali tozalash",
      instruction: "\`T0\` turida \`string | number | null | undefined\` mavjud. Undan \`null\` va \`undefined\` larni olib tashlang.",
      startingCode: "type T0 = string | number | null | undefined;\n\ntype ValidTypes = ___;\n",
      hint: "NonNullable<T0> ishlating.",
      solution: "type T0 = string | number | null | undefined;\n\ntype ValidTypes = NonNullable<T0>;\n",
      test: "return /NonNullable\\s*<\\s*T0\\s*>/.test(code);"
    },
    {
      id: 10,
      title: "ReturnType orqali tipni ushlash",
      instruction: "\`myFunction\` nomli funksiyaning qaytaradigan (return) qiymati turini avtomatik ajratib oling.",
      startingCode: "function myFunction() {\n  return { name: 'Ali', age: 20 };\n}\n\ntype MyResult = ___;\n",
      hint: "ReturnType<typeof myFunction> ishlating.",
      solution: "function myFunction() {\n  return { name: 'Ali', age: 20 };\n}\n\ntype MyResult = ReturnType<typeof myFunction>;\n",
      test: "return /ReturnType\\s*<\\s*typeof\\s+myFunction\\s*>/.test(code);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Utility Types (Yordamchi turlar) asosiy maqsadi nima?",
      options: [
        "Mavjud turlar asosida yangi turlar yaratib, DRY (kod takrorlanmasligi) tamoyiliga amal qilish",
        "Turlarni xotiradan butunlay o'chirib yuboruvchi mexanizm",
        "React komponentlari uchun maxsus interfeyslar",
        "Dastur ishlash tezligini (runtime) oshirish"
      ],
      correctAnswer: 0,
      explanation: "Utility Types kod takrorlanishini kamaytirish uchun mavjud turlarni modifikatsiya qilib yangilarini hosil qiladi."
    },
    {
      id: 2,
      question: "Qaysi Utility Type obyektning barcha xususiyatlarini ixtiyoriy (optional) qiladi?",
      options: [
        "Readonly",
        "Partial",
        "Omit",
        "Required"
      ],
      correctAnswer: 1,
      explanation: "Partial<T> berilgan T ning barcha maydonlarini optional (ixtiyoriy) holatga o'tkazadi."
    },
    {
      id: 3,
      question: "Required<T> ning asosiy vazifasi nima?",
      options: [
        "Tur maydonlarini faqat o'qish uchun (readonly) qiladi",
        "Ixtiyoriy maydonlarni butunlay olib tashlaydi",
        "Barcha maydonlarni majburiy (required) holatga keltiradi, ixtiyoriylikni olib tashlaydi",
        "Faqat kerakli maydonlarni string tipiga o'zgartiradi"
      ],
      correctAnswer: 2,
      explanation: "Required<T> ixtiyoriy belgisini (?) olib tashlab, har bir maydon kiritilishini majburiy qilib qoyadi."
    },
    {
      id: 4,
      question: "Pick<T, K> qanday ishlaydi?",
      options: [
        "T ichidan faqat K maydonlarni tanlab yangi type yasaydi",
        "T ichidan K maydonlarni olib tashlaydi",
        "T va K tiplarini birlashtiradi",
        "T ichidagi faqat sonli turlarni ajratib oladi"
      ],
      correctAnswer: 0,
      explanation: "Pick so'zining ma'nosi 'tanlash'. U berilgan turdan aynan kerakli maydonlarni sug'urib oladi."
    },
    {
      id: 5,
      question: "Omit<T, K> qaysi vaziyatda ishlatiladi?",
      options: [
        "T dan barcha K larni tanlab olmoqchi bo'lganda",
        "T turidan K bilan ko'rsatilgan keraksiz maydonlarni olib tashlamoqchi bo'lganda",
        "T ning qiymatini butunlay boshqa turga o'zgartirganda",
        "Faqat classlar bilan ishlaganda"
      ],
      correctAnswer: 1,
      explanation: "Omit ko'rsatilgan maydonni o'chirib, qolgan maydonlardan yangi tur yaratadi."
    },
    {
      id: 6,
      question: "TypeScript'da Type Erasure nima?",
      options: [
        "Tiplarning faqat compile-time'da mavjud bo'lib, JavaScript'ga o'girilganda (runtime) olib tashlanishi",
        "Dastur ishlayotganda xatolik beruvchi tur",
        "Keraksiz kodlarni o'chirib yuboradigan plugin",
        "Utility typelarning o'ziga xos faqat JavaScript'da ishlaydigan versiyasi"
      ],
      correctAnswer: 0,
      explanation: "TypeScript faqat kompilyatsiya vaqtida ishlaydi. Dastur yurganda (runtime) TS turlari bo'lmaydi (Type Erasure)."
    },
    {
      id: 7,
      question: "Readonly<T> qachon nested (ichma-ich) obyektlarni ham to'liq himoya qiladi?",
      options: [
        "Faqat maxsus parametr berilsa",
        "Readonly<T> har doim hamma narsani himoya qiladi",
        "Readonly<T> faqat yuqori (shallow) darajadagi maydonlarni himoya qiladi, nested obyektlarni to'liq himoya qilmaydi",
        "Hech qachon himoya qilmaydi"
      ],
      correctAnswer: 2,
      explanation: "Oddiy Readonly faqat birinchi darajadagi xususiyatlarni readonly qiladi. Ichma-ich ob'ektlarni himoya qilish uchun DeepReadonly yozish kerak."
    },
    {
      id: 8,
      question: "Exclude<T, U> yordamchi turi nima vazifa bajaradi?",
      options: [
        "T union turidan U ga teng bo'lganlarini olib tashlaydi",
        "T va U ning eng katta qiymatini topadi",
        "Obyekt maydonlarini butunlay yashiradi",
        "Faqat massivlarda element o'chiradi"
      ],
      correctAnswer: 0,
      explanation: "Union (Birlashma) turlar bilan ishlaganda, Exclude ko'rsatilgan turlarni uniondan chiqarib yuboradi."
    },
    {
      id: 9,
      question: "Extract<T, U> qaysi ishni bajaradi?",
      options: [
        "Exclude bilan aynan bir xil ishlaydi",
        "T va U orasida faqat umumiy (ikkalasida ham mavjud) bo'lgan tiplarni tanlab oladi",
        "Barcha xatolarni chiqarib yuboradi",
        "T dagi hamma narsani U ga tenglashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Extract (ajratib olish) faqat ikkala turda mavjud bo'lgan (intersection) tiplarni qoldiradi."
    },
    {
      id: 10,
      question: "NonNullable<T> dan qanday natija kutish mumkin?",
      options: [
        "Barcha xususiyatlarni null ga o'zgartiradi",
        "Union tip ichidan null va undefined larni butunlay olib tashlaydi",
        "Faqat null qiymatlarni qoldiradi",
        "Yangi bo'sh obyekt (null) yasaydi"
      ],
      correctAnswer: 1,
      explanation: "T union tipi ichidan null va undefined o'chiriladi va faqat aniq qiymatli turlar qoladi."
    },
    {
      id: 11,
      question: "ReturnType<T> funksiyalar bilan qanday ishlatiladi?",
      options: [
        "Funksiyaning argumentlari tipini massiv qilib qaytaradi",
        "Funksiyani avtomatik ishga tushiradi",
        "Kutubxona funksiyasining qanday qiymat qaytarish (return turi) turini ajratib olish uchun",
        "Classning constructor tipini topadi"
      ],
      correctAnswer: 2,
      explanation: "ReturnType typeof functionName bilan ishlatilib, funksiya qaytaradigan turni chiqarib oladi."
    },
    {
      id: 12,
      question: "Omit<T, K> aslida qanday Utility typelar jamlanmasidan iborat?",
      options: [
        "Pick<T, Exclude<keyof T, K>>",
        "Partial<Pick<T, K>>",
        "Required<Record<T, K>>",
        "Readonly<Partial<T>>"
      ],
      correctAnswer: 0,
      explanation: "Omit avval T dagi barcha kalitlardan K ni Exclude qiladi, so'ng qolganlarini Pick yordamida oladi."
    }
  ]
};
