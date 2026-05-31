export const advancedTypes = {
  id: "advancedTypes",
  title: "Advanced & Utility Types",
  language: "typescript",
  theory: `## 1. NEGA kerak?
TypeScript-da mavjud bo'lgan tiplarni qayta yozmasdan, ulardan yangi va o'zgartirilgan tiplarni yaratish uchun **Utility Types** (Yordamchi tiplar) va **Advanced Types** (Kengaytirilgan tiplar) ishlatiladi.
Masalan, bizda to'liq foydalanuvchi interfeysi bor, lekin uning ma'lumotlarini tahrirlash (update) funksiyasi uchun barcha maydonlar ixtiyoriy bo'lishi kerak. Har bir maydonni so'roq belgisi bilan qayta yozib chiqish o'rniga, TypeScript-ning tayyor yordamchilaridan foydalanish vaqtni tejaydi va kod takrorlanishini (DRY qoidasi) oldini oladi.

## 2. SODDALIK (Analogiya)
Utility tiplarini **foto-filtrlarga (photo filters)** o'xshatish mumkin:
- Bizda asl rasm (original type) bor.
- **Partial filter:** Rasmning ba'zi qismlarini yashiradi (barcha maydonlarni ixtiyoriy qiladi).
- **Readonly filter:** Rasmni ramkaga solib oyna ortiga qo'yadi. Endi uni faqat ko'rish mumkin, ustiga chizib bo'lmaydi (maydonlarni o'zgartirishni taqiqlaydi).
- **Pick filter:** Rasmdan faqat sizga yoqqan yuz qismini qirqib oladi (faqat tanlangan maydonlarni qoldiradi).
- **Omit filter:** Rasmdagi keraksiz fonni o'chirib tashlaydi (tanlangan maydonlarni o'chirib, qolganini saqlaydi).

## 3. STRUKTURA
Eng ko'p ishlatiladigan Utility Types:
- \`Partial<T>\`: T tipidagi barcha maydonlarni ixtiyoriy (\`?\`) qiladi.
- \`Required<T>\`: T tipidagi barcha ixtiyoriy maydonlarni majburiy qiladi.
- \`Readonly<T>\`: T tipidagi barcha maydonlarni faqat o'qish uchun qiladi.
- \`Record<K, T>\`: Kalitlari K tipida va qiymatlari T tipida bo'lgan obyekt tipini yaratadi.
- \`Pick<T, K>\`: T tipidan faqat K kalitlariga ega bo'lgan kichik tip yaratadi.
- \`Omit<T, K>\`: T tipidan K kalitlarini olib tashlab, qolgan maydonlardan tip yaratadi.
- \`NonNullable<T>\`: T tarkibidan \`null\` va \`undefined\` tiplarini olib tashlaydi.

Ishlatilishi:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

// Barcha maydonlar ixtiyoriy: { id?, name?, email? }
type UpdateUser = Partial<User>;

// Faqat name va email qoladi: { name, email }
type UserContact = Pick<User, "name" | "email">;
\`\`\`

### A. Indexed Access Types (Indeks orqali murojaat)
Obyekt tipining ma'lum bir maydoni tipini olish uchun xuddi massiv indeksiga o'xshash sintaksisdan foydalaniladi:
\`\`\`typescript
interface Product {
  id: number;
  info: {
    name: string;
    price: number;
  };
}

type ProductInfo = Product["info"]; // { name: string; price: number }
type PriceType = Product["info"]["price"]; // number
\`\`\`

### B. Mapped Types (Xaritalangan tiplar)
Mapped tiplar mavjud tip maydonlarini aylanib chiqib, yangi tiplar yaratadi. Bunda xossalarni majburiy qilish/ixtiyoriy qilish uchun \`+\` va \`-\` modifierlari ishlatilishi mumkin:
\`\`\`typescript
type FeatureFlags = {
  darkMode: () => void;
  profilePage: () => void;
};

// Har bir xossani boolean tipiga o'zgartiramiz
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// { darkMode: boolean; profilePage: boolean; }

// Readonly va optional bo'lgan maydonlarni majburiy va o'zgaruvchan qilish (-readonly va -?)
type MutableRequired<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property];
};
\`\`\`

### C. Conditional Types (Shartli tiplar va \`infer\`)
Ternary operatoriga o'xshab shartga ko'ra har xil tip tanlash imkonini beradi:
\`\`\`typescript
// Agarda T tipi string bo'lsa boolean, aks holda number qaytaradi
type IsString<T> = T extends string ? boolean : number;

type A = IsString<"Salom">; // boolean
type B = IsString<123>;     // number
\`\`\`

#### \`infer\` kalit so'zi (Tipni ajratib olish)
Conditional tiplar ichida noma'lum tipni ajratib olish va unga nom berish uchun \`infer\` ishlatiladi. Masalan, funksiyaning qaytarish tipini ajratib olish:
\`\`\`typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFuncType = () => string;
type FuncResult = GetReturnType<MyFuncType>; // string
\`\`\`

### D. Template Literal Types (Andoza matn tiplari)
JavaScript-dagi template literal (shablon satrlar) kabi ishlaydi, ya'ni matn tiplarini birlashtirish orqali yeni string literal tiplar yaratadi:
\`\`\`typescript
type EmailStatus = "pending" | "sent" | "failed";
type EventName = \`on_\${EmailStatus}\`; // "on_pending" | "on_sent" | "on_failed"
\`\`\`

### E. Utility Types Bajarilish Diagrammasi (Mermaid)

Quyida asosiy Utility tiplar (\`Partial\`, \`Required\`, \`Pick\`, \`Omit\`) obyekt ustida qanday set operatsiyalarini bajarishini ko'rsatuvchi vizual diagramma taqdim etilgan:

\`\`\`mermaid
graph TD
    User["Original User Type:<br/>{ id: number, name: string, email?: string }"]
    
    User -->|Partial| P["Partial&lt;User&gt;:<br/>{ id?: number, name?: string, email?: string }"]
    User -->|Required| R["Required&lt;User&gt;:<br/>{ id: number, name: string, email: string }"]
    User -->|Pick 'name'| PK["Pick&lt;User, 'name'&gt;:<br/>{ name: string }"]
    User -->|Omit 'email'| OM["Omit&lt;User, 'email'&gt;:<br/>{ id: number, name: string }"]
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Omit ichida mavjud bo'lmagan kalitlarni yozish:** \`Omit<User, "password">\` qilganda, agar User interfeysida "password" kaliti bo'lmasa, TS xato bermasligi mumkin, lekin bu kodda mantiqiy chalkashlikka olib keladi.
2. **typeof va keyof chalkashtirish:** \`typeof\` obyekt o'zgaruvchisidan uning TS tipini olish uchun, \`keyof\` esa tip kalitlari ro'yxatini (union) olish uchun ishlatiladi.
3. **Partial qilingan obyekt xossalarini tekshirmaslik:** \`Partial<User>\` maydonlari undefined bo'lishi mumkinligi sababli, ularni ishlatishdan oldin majburiy tekshirish shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Utility Types nima?**
Mavjud tiplarni oson o'zgartirish va yangi variantlarini yaratish uchun TypeScript tomonidan taqdim etilgan tayyor tiplar to'plami.

**2. Partial<T> nima vazifani bajaradi?**
T tipidagi barcha maydonlarni ixtiyoriy (optional) qiladi. Bu asosan tahrirlash (update) funksiyalarida ishlatiladi.

**3. Required<T> Partial-dan nimasi bilan farq qiladi?**
Required barcha maydonlarni majburiy (required) qiladi, ya'ni optional bo'lgan maydonlardagi \`?\` belgilarini olib tashlaydi.

**4. Readonly<T> qanday ishlaydi?**
Obyektning barcha maydonlarini \`readonly\` qiladi, ya'ni ularni yaratgandan keyin o'zgartirib bo'lmaydi.

**5. Record<K, T> nima?**
Xaritalar (Maps) yaratish uchun qulay tip bo'lib, kalitlar va qiymatlar tiplarini belgilaydi. Masalan: \`Record<string, number>\`.

**6. Pick va Omit farqi nima?**
\`Pick\` berilgan tipdan faqat ko'rsatilgan kalitlarni tanlab oladi, \`Omit\` esa ko'rsatilgan kalitlarni o'chirib tashlab, qolganlarini qoldiradi.

**7. NonNullable<T> nima uchun ishlatiladi?**
Tip tarkibidan \`null\` va \`undefined\` qiymatlarini olib tashlab, faqat aniq ma'lumot qolishini kafolatlash uchun.

**8. typeof operatorining TypeScript-dagi vazifasi nima?**
Dasturdagi biror JavaScript o'zgaruvchisi yoki obyektining tipini aniqlab, uni boshqa tiplash joyida ishlatish imkonini beradi.

**9. Mapped Types nima?**
Mavjud tipdagi har bir maydonni sikl (iteration) orqali aylanib chiqib, yangi xossali tip yaratish usuli (masalan, barcha maydonlarni boolean qilish).

**10. Conditional Types nima?**
Tip darajasidagi shartli operator bo'lib, ternary \`A extends B ? C : D\` sinraksi orqali shartga ko'ra har xil tip tanlash imkoniyati.

**11. ReturnType<T> nima?**
Generic funksiya tipi \`T\` ning qaytaradigan natijasi tipini avtomatik aniqlab beruvchi utility tip.

**12. Utility tiplar JavaScript build-da qoladimi?**
Yo'q, barcha utility tiplar faqat TypeScript kompilyatori uchun xizmat qiladi va transpayl jarayonida to'liq o'chib ketadi.
`,
  exercises: [
    {
      id: 1,
      title: "Partial (Ixtiyoriy obyekt) simulyatsiyasi",
      instruction: "User obyektini (`{ id, name, email }`) va qisman yangilanuvchi ma'lumotlarni (`Partial` kabi optional) qabul qilib, ularni birlashtirib qaytaruvchi `updateUser(user, fields)` funksiyasini yozing.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction updateUser(user: User, fields: Partial<User>): User {\n  // user va fields obyektlarini birlashtiring\n}",
      hint: "return { ...user, ...fields };",
      test: "if (typeof updateUser !== 'function') return 'updateUser topilmadi'; const u = { id: 1, name: 'Ali', email: 'a@a.com' }; const res = updateUser(u, { name: 'Vali' }); if(res.name !== 'Vali' || res.email !== 'a@a.com') return 'Obyekt yangilanmadi'; return null;"
    },
    {
      id: 2,
      title: "Required (Barcha maydonlar majburiy)",
      instruction: "Obyektdagi `name` va `email` maydonlari majburiy ekanligini (ya'ni `undefined` yoki `null` emasligini) tekshirib true/false qaytaradigan `hasRequiredFields(obj)` funksiyasini yozing.",
      startingCode: "interface UserOptional {\n  name?: string;\n  email?: string;\n}\n\nfunction hasRequiredFields(obj: Required<UserOptional>): boolean {\n  // name va email borligini tekshiring\n}",
      hint: "return obj.name !== undefined && obj.name !== null && obj.email !== undefined && obj.email !== null;",
      test: "if (typeof hasRequiredFields !== 'function') return 'hasRequiredFields topilmadi'; if(hasRequiredFields({ name: 'Ali' }) !== false || hasRequiredFields({ name: 'Ali', email: 'a@a' }) !== true) return 'Required tekshiruvi xato'; return null;"
    },
    {
      id: 3,
      title: "Readonly obyekt simulyatsiyasi",
      instruction: "Berilgan obyektni dastur ishlash jarayonida o'zgartirib bo'lmaydigan qilib qotiradigan (Object.freeze) `makeReadonly(obj)` funksiyasini yozing.",
      startingCode: "function makeReadonly<T extends object>(obj: T): Readonly<T> {\n  // Object.freeze ishlating\n}",
      hint: "return Object.freeze(obj);",
      test: "if (typeof makeReadonly !== 'function') return 'makeReadonly topilmadi'; const o = makeReadonly({ x: 1 }); try { o.x = 2; } catch(e){} if (o.x !== 1) return 'Obyekt o\\'zgartirildi, readonly bo\\'lmadi'; return null;"
    },
    {
      id: 4,
      title: "Record (Lug'at xaritasi)",
      instruction: "Kalitlar massivi `keys` (string) qabul qilib, har bir kalit qiymatiga uning uzunligini yozib obyekt ko'rinishida qaytaruvchi `createRecord(keys)` funksiyasini yozing.",
      startingCode: "function createRecord(keys: string[]): Record<string, number> {\n  // keys bo'yicha Record obyektini shakllantiring\n}",
      hint: "const res = {}; keys.forEach(k => res[k] = k.length); return res;",
      test: "if (typeof createRecord !== 'function') return 'createRecord topilmadi'; const r = createRecord(['cat', 'horse']); if (r.cat !== 3 || r.horse !== 5) return 'Record to\\'g\\'ri yaratilmadi'; return null;"
    },
    {
      id: 5,
      title: "Pick (Tanlab olish) simulyatsiyasi",
      instruction: "Obyekt va kalitlar massivi `keys` qabul qilib, faqat ko'rsatilgan kalitlar va ularning qiymatlaridan iborat yangi obyekt qaytaruvchi `pickProperties(obj, keys)` funksiyasini yozing.",
      startingCode: "function pickProperties<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {\n  // Yangi obyekt yarating\n}",
      hint: "const res = {}; keys.forEach(k => { if(k in obj) res[k] = obj[k]; }); return res;",
      test: "if (typeof pickProperties !== 'function') return 'pickProperties topilmadi'; const u = { id: 10, name: 'Ali', role: 'admin' }; const res = pickProperties(u, ['name', 'role']); if(res.id !== undefined || res.name !== 'Ali' || res.role !== 'admin') return 'Obyekt maydonlari xato ajratildi'; return null;"
    },
    {
      id: 6,
      title: "Omit (O'chirish) simulyatsiyasi",
      instruction: "Obyekt va o'chirilishi kerak bo'lgan kalitlar massivi `keys` qabul qilib, shu kalitlardan tashqari barcha maydonlarni o'z ichiga oluvchi yangi obyekt qaytaruvchi `omitProperties(obj, keys)` funksiyasini yozing.",
      startingCode: "function omitProperties<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {\n  // Kalitlarni o'chirib qaytaring\n}",
      hint: "const res = { ...obj }; keys.forEach(k => delete res[k]); return res;",
      test: "if (typeof omitProperties !== 'function') return 'omitProperties topilmadi'; const u = { id: 1, name: 'Ali', pass: '123' }; const res = omitProperties(u, ['pass']); if(res.pass !== undefined || res.name !== 'Ali') return 'Omit xato ishladi'; return null;"
    },
    {
      id: 7,
      title: "Typeof (JS runtime validation)",
      instruction: "Kiruvchi parametr tipi faqat `string` bo'lganda 'Text', `number` bo'lganda 'Number', boshqa hollarda 'Other' qaytaruvchi `getTypeName(val)` funksiyasini yozing.",
      startingCode: "function getTypeName(val: any): string {\n  // typeof tekshiruvini bajaring\n}",
      hint: "if (typeof val === 'string') return 'Text'; if (typeof val === 'number') return 'Number'; return 'Other';",
      test: "if (typeof getTypeName !== 'function') return 'getTypeName topilmadi'; if(getTypeName('ok') !== 'Text' || getTypeName(5) !== 'Number' || getTypeName(true) !== 'Other') return 'Tipi xato aniqlandi'; return null;"
    },
    {
      id: 8,
      title: "NonNullable (Null bo'lmagan qiymat)",
      instruction: "Qiymat `val` qabul qilib, agar u `null` yoki `undefined` bo'lsa, standart qiymat `defaultVal` ni qaytaruvchi, aks holda `val` ning o'zini qaytaruvchi `getNonNullable(val, defaultVal)` funksiyasini yozing.",
      startingCode: "function getNonNullable<T>(val: T | null | undefined, defaultVal: T): T {\n  // Null/undefined tekshiring\n}",
      hint: "return (val === null || val === undefined) ? defaultVal : val;",
      test: "if (typeof getNonNullable !== 'function') return 'getNonNullable topilmadi'; if(getNonNullable(null, 'ok') !== 'ok' || getNonNullable('hello', 'ok') !== 'hello') return 'NonNullable tekshiruvi xato'; return null;"
    },
    {
      id: 9,
      title: "Conditional Output",
      instruction: "Agar kiruvchi qiymat string bo'lsa uning kichik harflari bilan, agar son bo'lsa uni stringga o'girib, boshqa hollarda bo'sh string qaytaradigan `conditionalFormat(val)` yozing.",
      startingCode: "function conditionalFormat(val: string | number | boolean): string {\n  // Kodni yozing\n}",
      hint: "if (typeof val === 'string') return val.toLowerCase(); if (typeof val === 'number') return String(val); return '';",
      test: "if (typeof conditionalFormat !== 'function') return 'conditionalFormat topilmadi'; if(conditionalFormat('HELLO') !== 'hello' || conditionalFormat(123) !== '123' || conditionalFormat(false) !== '') return 'Conditional format xato'; return null;"
    },
    {
      id: 10,
      title: "Mapped Object (Barcha maydonlarni o'zgartirish)",
      instruction: "Berilgan obyektning barcha string qiymatli maydonlarini katta harflarga (uppercase) o'zgartiradigan `mapToUppercase(obj)` funksiyasini yozing.",
      startingCode: "function mapToUppercase(obj: Record<string, any>): Record<string, any> {\n  // Obyekt maydonlarini aylanib o'zgartiring\n}",
      hint: "const res = {}; for(let k in obj) { res[k] = typeof obj[k] === 'string' ? obj[k].toUpperCase() : obj[k]; } return res;",
      test: "if (typeof mapToUppercase !== 'function') return 'mapToUppercase topilmadi'; const res = mapToUppercase({ name: 'ali', age: 20 }); if (res.name !== 'ALI' || res.age !== 20) return 'Mapped property o\\'zgartirilmadi'; return null;"
    },
    {
      id: 11,
      title: "Safe Object Read (Strict Key)",
      instruction: "Obyekt va `key` qabul qilib, agar `key` obyektda mavjud bo'lsa uning qiymatini, bo'lmasa 'Key not found' qaytaruvchi `safeRead(obj, key)` yozing.",
      startingCode: "function safeRead<T extends Record<string, any>>(obj: T, key: string): any {\n  // Kodni yozing\n}",
      hint: "return key in obj ? obj[key] : 'Key not found';",
      test: "if (typeof safeRead !== 'function') return 'safeRead topilmadi'; if (safeRead({x: 1}, 'x') !== 1 || safeRead({x: 1}, 'y') !== 'Key not found') return 'Safe read xato ishladi'; return null;"
    },
    {
      id: 12,
      title: "Required parameters validation",
      instruction: "Obyekt va talab qilingan kalitlar massivi `requiredKeys` qabul qilib, obyektda barcha kalitlar borligini tekshiradigan `checkRequired(obj, requiredKeys)` funksiyasini yozing (true/false).",
      startingCode: "function checkRequired(obj: Record<string, any>, requiredKeys: string[]): boolean {\n  // every dan foydalaning\n}",
      hint: "return requiredKeys.every(k => k in obj && obj[k] !== undefined);",
      test: "if (typeof checkRequired !== 'function') return 'checkRequired topilmadi'; if (checkRequired({name: 'Ali'}, ['name', 'age']) !== false || checkRequired({name: 'Ali', age: 20}, ['name']) !== true) return 'Validation xato'; return null;"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Custom Mapped Type (`BooleanFlags`)",
      instruction: "Berilgan `T` tipidagi barcha maydonlarning tipini `boolean` qilib o'zgartiradigan custom mapped type `BooleanFlags<T>` e'lon qiling va uni `{ name: string; age: number }` interfeysiga tatbiq etib, `{ name: true, age: false }` obyektini qaytaradigan `getUserFlags()` funksiyasini yozing.",
      startingCode: "type BooleanFlags<T> = {\n  // Mapped type qismini yozing\n};\n\nfunction getUserFlags() {\n  // Bu yerga yozing\n}",
      hint: "type BooleanFlags<T> = {\n  [K in keyof T]: boolean;\n};\nfunction getUserFlags() {\n  return { name: true, age: false };\n}",
      test: "if (typeof getUserFlags !== 'function') return 'getUserFlags topilmadi'; const res = getUserFlags(); if (res.name !== true || res.age !== false) return 'Flags qiymatlari xato'; return null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Conditional Type va `infer` kalit so'zi",
      instruction: "Agar berilgan tip `T` massiv bo'lsa uning element tipini (array element type), aks holda `T` ning o'zini qaytaradigan `UnwrapArray<T>` conditional tipini e'lon qiling. Ushbu tip yordamida `string[]`dan `string` tipini ajratib olib, satr qaytaruvchi `getFirstWord(words)` funksiyasini yozing.",
      startingCode: "type UnwrapArray<T> = any; // Bu yerga conditional yozing\n\nfunction getFirstWord(words: string[]): string {\n  // words[0] ni qaytaring\n}",
      hint: "type UnwrapArray<T> = T extends (infer U)[] ? U : T;\nfunction getFirstWord(words: string[]): UnwrapArray<string[]> {\n  return words[0];\n}",
      test: "if (typeof getFirstWord !== 'function') return 'getFirstWord topilmadi'; if (getFirstWord(['Salom', 'Dunyo']) !== 'Salom') return 'Birinchi so\'z noto\'g\'ri'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Partial<T> yordamchi tipi (Utility Type) qanday vazifani bajaradi?",
      options: [
        "Maydonlarni faqat sonlar bilan cheklaydi",
        "Obyekt tipidagi barcha maydonlarni ixtiyoriy (optional) qiladi",
        "Barcha maydonlarni o'chirib tashlaydi",
        "T tipini funksiyaga aylantiradi"
      ],
      correctAnswer: 1,
      explanation: "Partial<T> barcha maydonlarni ixtiyoriy qiladi, ya'ni ularni e'lon qilishda `?` belgisi qo'shilgandek ta'sir ko'rsatadi."
    },
    {
      id: 2,
      question: "Required<T> tipining vazifasi nima?",
      options: [
        "Barcha maydonlarni o'chirish",
        "Barcha ixtiyoriy (optional) maydonlarni majburiy (required) holga keltirish",
        "Maydonlarni faqat o'qish uchun sozlash",
        "Obyektga yangi kalitlar qo'shish"
      ],
      correctAnswer: 1,
      explanation: "Required<T> tipidagi barcha `?` optional belgilarini olib tashlab, har bir maydonga qiymat berilishini majburiy qiladi."
    },
    {
      id: 3,
      question: "Obyektning hech bir maydonini o'zgartirib bo'lmaydigan qilishda qaysi utility tipdan foydalaniladi?",
      options: ["Freeze<T>", "Readonly<T>", "Const<T>", "Immutable<T>"],
      correctAnswer: 1,
      explanation: "Readonly<T> obyekt tarkibidagi barcha maydonlarni `readonly` qilib belgilaydi, natijada qiymatlarni o'zgartirish taqiqlanadi."
    },
    {
      id: 4,
      question: "Quyidagi tip nima deb ataladi?\n`type AgeMap = Record<string, number>;`",
      options: [
        "Oddiy massiv tipi",
        "Kalitlari string bo'lgan va qiymatlari son bo'lgan obyekt lug'ati",
        "Tuple korteji",
        "Conditional Type"
      ],
      correctAnswer: 1,
      explanation: "Record<K, T> yordamida kalitlari K tipida va qiymatlari T tipida bo'lgan xarita/lug'at obyektlari tiplanadi."
    },
    {
      id: 5,
      question: "Mavjud tipdan faqat ko'rsatilgan bir nechta maydonlarni tanlab olishda qaysi utility tip ishlatiladi?",
      options: ["Omit", "Pick", "Select", "Filter"],
      correctAnswer: 1,
      explanation: "Pick<T, K> orqali T tipidan faqat K kalitlari ajratib olinib, yangi kichik tip yaratiladi."
    },
    {
      id: 6,
      question: "Mavjud tipdan ko'rsatilgan bir nechta maydonlarni o'chirib tashlab, qolgan maydonlardan tip hosil qilishda qaysi utility tip ishlatiladi?",
      options: ["Pick", "Omit", "Exclude", "Delete"],
      correctAnswer: 1,
      explanation: "Omit<T, K> turi T tarkibidan K ro'yxatidagi maydonlarni o'chirib, qolgan maydonlardan iborat yangi tip qaytaradi."
    },
    {
      id: 7,
      question: "NonNullable<T> tipi T tarkibidan qaysi tiplarni avtomatik ravishda olib tashlaydi?",
      options: [
        "Faqat `any` tipini",
        "\`null\` va \`undefined\` tiplarini", // eslint-disable-line no-useless-escape
        "Faqat bo'sh satrlarni",
        "Faqat raqamlarni"
      ],
      correctAnswer: 1,
      explanation: "NonNullable<T> qiymatlarda `null` yoki `undefined` mavjud bo'lishi ehtimolini yo'qotib, xavfsizlikni ta'minlaydi."
    },
    {
      id: 8,
      question: "TypeScript-da typeof operatorining asosiy vazifasi nima?",
      options: [
        "Faqat runtime-da tiplarni tekshirish",
        "Mavjud JavaScript o'zgaruvchisining tipini aniqlab, uni TypeScript kodi darajasida tip sifatida qo'llash",
        "Kodni siqish",
        "Error handling bajarish"
      ],
      correctAnswer: 1,
      explanation: "TypeScript darajasidagi `typeof` o'zgaruvchining tipini o'ziga ko'chirib olish uchun qulay. Masalan: `let y: typeof x = 10;`."
    },
    {
      id: 9,
      question: "Conditional Type (Shartli tip) sinraksi qaysi operatorga juda o'xshash?",
      options: [
        "If-else operatoriga",
        "Ternary (uchlik) shart operatoriga (`A extends B ? C : D`)",
        "Switch-case operatoriga",
        "Bitwise operatoriga"
      ],
      correctAnswer: 1,
      explanation: "Conditional type shartli tip tanlash uchun ternary operator sinraksini qo'llaydi: `T extends U ? X : Y`."
    },
    {
      id: 10,
      question: "Mavjud tipdagi har bir maydonni aylanib chiqib, ularning xususiyatlarini o'zgartirish orqali yangi tip yaratish nima deyiladi?",
      options: ["Mapped Types (Xaritalangan tiplar)", "Intersection Types", "Union Types", "Enum Types"],
      correctAnswer: 0,
      explanation: "Mapped types yordamida mavjud tip maydonlarining tiplarini siklda o'zgartirib chiqish mumkin, masalan: barcha maydonlarni readonly yoki optional qilish."
    },
    {
      id: 11,
      question: "Funksiyaning qaytaradigan natijasi tipini aniqlab beradigan utility tip qaysi?",
      options: ["FunctionReturn<T>", "ReturnType<T>", "GetReturn<T>", "ResultOf<T>"],
      correctAnswer: 1,
      explanation: "ReturnType<T> funksiya tipi T ning return qiladigan qiymati qanday tipdaligini aniqlab beradi."
    },
    {
      id: 12,
      question: "Utility tiplar loyiha JavaScript-ga o'girilganda kod hajmiga qanday ta'sir ko'rsatadi?",
      options: [
        "Kod hajmini 2 barobar ko'paytiradi",
        "Hech qanday ta'sir qilmaydi - ular kompilyatsiya vaqtida o'chib ketadi, JS faylda qolmaydi",
        "JS fayllarni import qilishni qiyinlashtiradi",
        "Faqat local keshda saqlanib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Barcha TypeScript utility tiplari faqat tip tekshiruvi uchun mavjud bo'lgani sababli, tayyor JS fayllardan to'liq olib tashlanadi."
    },
    {
      id: 13,
      question: "Conditional Types ichida `infer` kalit so'zi nima vazifani bajaradi?",
      options: [
        "Dasturdagi runtime xatolarni tahlil qiladi",
        "Shartli tip tekshiruvi jarayonida noma'lum tipni avtomatik ravishda aniqlab, unga yangi o'zgaruvchi nomi (R) beradi",
        "Barcha utility tiplarni o'chirib tashlaydi",
        "Faqat massiv elementlarini saralash uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "`infer` operatori conditional tip extends qismida noma'lum tipni ajratib olish va uni ternary operatorning to'g'ri (true) qismida ishlatish imkonini beradi."
    },
    {
      id: 14,
      question: "Mapped Types-da `readonly` va optional (`?`) modifierlarini olib tashlash uchun qaysi belgilardan foydalaniladi?",
      options: [
        "Delete va Remove kalit so'zlaridan",
        "Minus belgisi `-` va modifier nomidan (masalan: `-readonly` va `-?`)",
        "Undov belgisi `!` va `as` operatoridan",
        "Faqat static kalit so'zidan"
      ],
      correctAnswer: 1,
      explanation: "Mapped types-da `+` (qo'shish) va `-` (olib tashlash) modifierlari mavjud. `-readonly` va `-?` yozuvi mos ravishda readonly va optional xususiyatlarni tipdan olib tashlab, o'zgaruvchan va majburiy qiladi."
    }
  ]
};
