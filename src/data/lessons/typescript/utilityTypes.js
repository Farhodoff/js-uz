export const utilityTypes = {
  id: "ts-utility-types",
  title: "Utility Types",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
TypeScript'da **Utility Types** — bu mavjud turlarni (types) o'zgartirish, ulardan yangi turlar yaratish uchun ishlatiladigan tayyor vositalar (yordamchi turlar). Tasavvur qiling, sizda bitta shablon (qolip) bor va siz shu qolipdan har xil pishiriqlar pishirmoqchisiz. Kichkina o'zgarishlar uchun noldan yangi qolip yasash o'rniga, Utility Types orqali kerakli joylarini moslashtirib olasiz.

Asosiy yordamchi turlar:
- \`Partial<T>\`: T ning barcha maydonlarini ixtiyoriy (optional) qiladi.
- \`Required<T>\`: T ning barcha maydonlarini majburiy qiladi.
- \`Readonly<T>\`: T ning barcha maydonlarini o'zgartirib bo'lmaydigan (readonly) qiladi.
- \`Pick<T, K>\`: T dan faqat K maydonlarni tanlab oladi.
- \`Omit<T, K>\`: T dan K maydonlarni olib tashlaydi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv (Turlarni qayta-qayta yozish):**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Faqat email va name kerak bo'lsa, noldan yozish
interface UserWithoutId {
  name: string;
  email: string;
}
\`\`\`

✅ **YAXSHI Yondashuv (Utility Types ishlatish):**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Omit yordamida id ni olib tashlaymiz
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

## 🎤 Intervyu Savollari
1. **Utility Types nima va nima uchun kerak?**
   - Javob: Ular mavjud turlar asosida yangi turlar yaratishni osonlashtiruvchi tayyor shablonlardir. Kod takrorlanishining (DRY) oldini oladi va kodning tozaligini saqlaydi.
2. **\`Pick\` va \`Omit\` ning farqi nima?**
   - Javob: \`Pick\` berilgan turdan faqat ko'rsatilgan maydonlarni *oladi*. \`Omit\` esa berilgan turdan ko'rsatilgan maydonlarni *olib tashlaydi*.
3. **\`Partial\` qanday vaziyatlarda ishlatiladi?**
   - Javob: Obyektni yangilash (update) funksiyalarida juda qulay. Chunki yangilashda biz obyektning hamma qismini emas, faqat bazilarini yuborishimiz mumkin.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    User[User Type] -->|Partial| OptionalUser[Maydonlari ixtiyoriy User]
    User -->|Pick| PickedUser[Faqat kerakli maydonlar]
    User -->|Omit| OmittedUser[Keraksiz maydonlar olib tashlangan]
    User -->|Readonly| ReadonlyUser[O'zgartirib bo'lmaydigan User]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Partial",
      instruction: "\`User\` tipidagi barcha maydonlarni ixtiyoriy qiluvchi parametr tipini \`Partial\` yordamida belgilang.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction updateUser(user: ___) {\n  return user;\n}",
      hint: "Partial<User> dan foydalaning.",
      solution: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction updateUser(user: Partial<User>) {\n  return user;\n}",
      test: "return /Partial\\s*<\\s*User\\s*>/.test(code);"
    },
    {
      id: 2,
      title: "Required",
      instruction: "Barcha maydonlari ixtiyoriy bo'lgan \`Config\` interfeysidan barcha maydonlari majburiy bo'lgan yangi tipni \`Required\` bilan yarating.",
      startingCode: "interface Config {\n  port?: number;\n  host?: string;\n}\n\ntype FullConfig = ___;\n",
      hint: "Required<Config> ishlating.",
      solution: "interface Config {\n  port?: number;\n  host?: string;\n}\n\ntype FullConfig = Required<Config>;\n",
      test: "return /Required\\s*<\\s*Config\\s*>/.test(code);"
    },
    {
      id: 3,
      title: "Readonly",
      instruction: "\`Settings\` obyektini o'zgartirib bo'lmaydigan (readonly) qilish uchun mos Utility turdan foydalaning.",
      startingCode: "interface Settings {\n  theme: string;\n}\n\nconst mySettings: ___ = {\n  theme: 'dark'\n};",
      hint: "Readonly<Settings> yozing.",
      solution: "interface Settings {\n  theme: string;\n}\n\nconst mySettings: Readonly<Settings> = {\n  theme: 'dark'\n};",
      test: "return /Readonly\\s*<\\s*Settings\\s*>/.test(code);"
    },
    {
      id: 4,
      title: "Pick",
      instruction: "\`Product\` turidan faqat \`id\` va \`name\` maydonlarini olib, \`ProductSummary\` turini yasang.",
      startingCode: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductSummary = ___;\n",
      hint: "Pick<Product, 'id' | 'name'> ishlating.",
      solution: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductSummary = Pick<Product, 'id' | 'name'>;\n",
      test: "return /Pick\\s*<\\s*Product\\s*,\\s*(['\"]id['\"]\\s*\\|\\s*['\"]name['\"]|['\"]name['\"]\\s*\\|\\s*['\"]id['\"])\\s*>/.test(code);"
    },
    {
      id: 5,
      title: "Omit",
      instruction: "\`Product\` turidan \`desc\` (description) maydonini olib tashlab, \`ProductCard\` turini yasang.",
      startingCode: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductCard = ___;\n",
      hint: "Omit<Product, 'desc'> ishlating.",
      solution: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n  desc: string;\n}\n\ntype ProductCard = Omit<Product, 'desc'>;\n",
      test: "return /Omit\\s*<\\s*Product\\s*,\\s*['\"]desc['\"]\\s*>/.test(code);"
    },
    {
      id: 6,
      title: "Record",
      instruction: "Kallitlari \`string\`, qiymatlari \`number\` bo'lgan obyekt tipini yaratish uchun \`Record\` ishlating.",
      startingCode: "type StringNumberMap = ___;\n\nconst ages: StringNumberMap = {\n  ali: 25,\n  vali: 30\n};",
      hint: "Record<string, number> dan foydalaning.",
      solution: "type StringNumberMap = Record<string, number>;\n\nconst ages: StringNumberMap = {\n  ali: 25,\n  vali: 30\n};",
      test: "return /Record\\s*<\\s*string\\s*,\\s*number\\s*>/.test(code);"
    },
    {
      id: 7,
      title: "Exclude",
      instruction: "\`T0\` turida \`'a' | 'b' | 'c'\` mavjud. Undan \`'a'\` ni chiqarib tashlab \`T1\` turini yasang.",
      startingCode: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = ___;\n",
      hint: "Exclude<T0, 'a'> ishlating.",
      solution: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = Exclude<T0, 'a'>;\n",
      test: "return /Exclude\\s*<\\s*T0\\s*,\\s*['\"]a['\"]\\s*>/.test(code);"
    },
    {
      id: 8,
      title: "Extract",
      instruction: "\`T0\` turidagi \`'a' | 'b' | 'c'\` qiymatlaridan faqat \`'a' | 'f'\` lar bilan umumiy bo'lganlarini (kesishmasini) ajratib oling.",
      startingCode: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = ___;\n",
      hint: "Extract<T0, 'a' | 'f'> ishlating.",
      solution: "type T0 = 'a' | 'b' | 'c';\n\ntype T1 = Extract<T0, 'a' | 'f'>;\n",
      test: "return /Extract\\s*<\\s*T0\\s*,\\s*(['\"]a['\"]\\s*\\|\\s*['\"]f['\"]|['\"]f['\"]\\s*\\|\\s*['\"]a['\"])\\s*>/.test(code);"
    },
    {
      id: 9,
      title: "NonNullable",
      instruction: "\`T0\` turida \`string | number | null | undefined\` mavjud. Ularning ichidan \`null\` va \`undefined\` larni olib tashlang.",
      startingCode: "type T0 = string | number | null | undefined;\n\ntype ValidTypes = ___;\n",
      hint: "NonNullable<T0> ishlating.",
      solution: "type T0 = string | number | null | undefined;\n\ntype ValidTypes = NonNullable<T0>;\n",
      test: "return /NonNullable\\s*<\\s*T0\\s*>/.test(code);"
    },
    {
      id: 10,
      title: "ReturnType",
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
      question: "Utility Types (Yordamchi turlar) nima?",
      options: [
        "Mavjud turlar (types) asosida yangilarini yaratish shablonlari",
        "Turlarni o'chirib yuboruvchi mexanizm",
        "React komponentlari uchun maxsus ilgaklar (hooks)",
        "Dastur ishlayotgan (runtime) vaqtida ishlaydigan mantiq"
      ],
      correctAnswer: 0,
      explanation: "Utility Types kod takrorlanishini kamaytirish uchun, mavjud turlarni modifikatsiya qilib yangilarini hosil qiladi."
    },
    {
      id: 2,
      question: "Qaysi Utility Type barcha maydonlarni ixtiyoriy (?) qiladi?",
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
      question: "Required<T> ning vazifasi nima?",
      options: [
        "Tur maydonlarini readonly qiladi",
        "Ixtiyoriy maydonlarni olib tashlaydi",
        "Barcha maydonlarni majburiy (required) holatga keltiradi",
        "Faqat kerakli maydonlarni tanlaydi"
      ],
      correctAnswer: 2,
      explanation: "Required<T> ixtiyoriy belgisini (?) olib tashlab, har bir maydon kiritilishini majburiy qilib qoyadi."
    },
    {
      id: 4,
      question: "Pick<T, K> qanday ishlaydi?",
      options: [
        "T ichidan faqat K maydonlarni tanlab oladi",
        "T ichidan K maydonlarni olib tashlaydi",
        "T va K ni birlashtiradi",
        "T ichidagi faqat sonli turlarni tanlaydi"
      ],
      correctAnswer: 0,
      explanation: "Pick, ya'ni 'tanlash'. U berilgan turdan aynan kerakli maydonlarni sug'urib oladi."
    },
    {
      id: 5,
      question: "Omit<T, K> nima vazifani bajaradi?",
      options: [
        "T dan barcha K larni tanlaydi",
        "T dan K bilan ko'rsatilgan maydonlarni olib tashlaydi",
        "T ning qiymatini o'zgartiradi",
        "T ni K ga o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "Omit (inkor qilish, tashlab ketish) ko'rsatilgan maydonni o'chirib, qolgan maydonlardan tur yaratadi."
    },
    {
      id: 6,
      question: "Record<K, T> qanday ob'ekt yaratadi?",
      options: [
        "Kalitlari K va qiymatlari T bo'lgan ob'ekt turini yaratadi",
        "Massiv yaratadi",
        "Faqat o'qish uchun funksiya yaratadi",
        "Ixtiyoriy maydonlardan iborat ob'ekt yaratadi"
      ],
      correctAnswer: 0,
      explanation: "Record asosan xarita (map) ob'ektlar yaratishda qulay: Record<string, number>."
    },
    {
      id: 7,
      question: "Readonly<T> bilan e'lon qilingan o'zgaruvchini nima qilib bo'lmaydi?",
      options: [
        "Konsolga chiqarib bo'lmaydi",
        "Yangi ob'ektga nusxalab bo'lmaydi",
        "O'qib bo'lmaydi",
        "Maydonlarini qayta o'zgartirib bo'lmaydi"
      ],
      correctAnswer: 3,
      explanation: "Readonly bilan maydonlar faqat o'qish uchun bo'ladi (re-assign qilish mumkin emas)."
    },
    {
      id: 8,
      question: "Exclude<T, U> yordamchi turi qanday ishlaydi?",
      options: [
        "T dan U ga teng bo'lgan qismlarini olib tashlaydi",
        "T va U ni kesishmasini topadi",
        "Obyekt maydonlarini yashiradi",
        "Faqat interfeyslarda ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Union (Birlashma) turlar bilan ishlaganda, Exclude ko'rsatilgan turlarni chiqarib yuboradi."
    },
    {
      id: 9,
      question: "Extract<T, U> qaysi ishni bajaradi?",
      options: [
        "Exclude bilan bir xil ishlaydi",
        "T va U orasida umumiy (ikkalasida ham bor) qismlarni tanlab oladi",
        "Barcha xatolarni ekstratsiya qiladi",
        "U ni T ga o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "Extract (ajratib olish) faqat ikkala turda mavjud bo'lgan (intersect) tiplarni qoldiradi."
    },
    {
      id: 10,
      question: "NonNullable<T> ning natijasi nima bo'ladi?",
      options: [
        "Barcha maydonlarni null qiladi",
        "null va undefined larni olib tashlaydi",
        "Faqat null larni qoldiradi",
        "Bo'sh obyekt yaratadi"
      ],
      correctAnswer: 1,
      explanation: "T ichidan null va undefined ni o'chiradi, faqat haqiqiy qiymatli turlar qoladi."
    },
    {
      id: 11,
      question: "ReturnType<T> dan qachon foydalanamiz?",
      options: [
        "Funksiyaning argumentlari tipini olish uchun",
        "Funksiyani ishga tushirish uchun",
        "Funksiya qaytaradigan qiymat (return) turini olish uchun",
        "Class qaytarish uchun"
      ],
      correctAnswer: 2,
      explanation: "typeof myFunction bilan birga ishlatilib, uning nimani return qilishini avtomatik tiplaydi."
    },
    {
      id: 12,
      question: "Omit qaysi ikki yordamchi turning kombinatsiyasiga o'xshash?",
      options: [
        "Pick va Exclude",
        "Partial va Pick",
        "Required va Record",
        "Readonly va Partial"
      ],
      correctAnswer: 0,
      explanation: "Omit orqa fonda 'Pick<T, Exclude<keyof T, K>>' orqali ishlaydi."
    }
  ]
};
