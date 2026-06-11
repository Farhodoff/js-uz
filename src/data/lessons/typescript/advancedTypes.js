export const advancedTypes = {
  id: "advancedTypes",
  title: "Advanced & Utility Types",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Advanced & Utility Types nima?
TypeScript-da **Utility Types** (Yordamchi tiplar) va **Advanced Types** (Kengaytirilgan tiplar) — bu tayyor tiplarni o'zgartirish, ulardan nusxa olish yoki ularni tahrirlash orqali yangi tiplar hosil qilish usulidir. Ular kod takrorlanishini (DRY qoidasini) kamaytiradi va tiplash jarayonini osonlashtiradi.

### Real hayotiy analogiya
Buni rasm tahrirlovchi **foto-filtrlarga (photo filters)** o'xshatish mumkin:
* **Original Type:** Bu sizning asl rasmingiz (barcha maydonlari bo'lgan obyekt).
* **Partial filter:** Rasmning ba'zi qismlarini xiralashtiradi yoki yashiradi. Asl rasmdagi barcha elementlar endi ixtiyoriy (optional) bo'ladi.
* **Readonly filter:** Rasmni shisha ramkaga soladi. Uni faqat tomosha qilishingiz mumkin, lekin ustiga chizib bo'lmaydi.
* **Pick filter:** Rasmdan faqat sizga kerakli qismini (masalan, faqat yuzingizni) qirqib (crop) oladi.
* **Omit filter:** Rasm fonidagi keraksiz detalni o'chirib tashlaydi va qolgan hamma narsani saqlaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Partial va Readonly yordamida obyektlar bilan ishlash)
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Barcha maydonlar ixtiyoriy: { id?, name?, email? }
type UpdateUser = Partial<User>;

// Barcha maydonlar faqat o'qish uchun: o'zgartirib bo'lmaydi
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: "Farhod",
  email: "farhod@example.com"
};

// user.name = "Ali"; // Xatolik! Readonly maydonni o'zgartirib bo'lmaydi.
\`\`\`

### 2. Intermediate Example (Record, Pick va Omit orqali ma'lumotlarni filtrlash)
\`\`\`typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Faqat nom va narx kerak bo'lgan holat
type ProductCardInfo = Pick<Product, "name" | "price">;

// Tavsif (description) va ID dan tashqari hamma narsani olish
type InsertProduct = Omit<Product, "id" | "description">;

// Mahsulotlar lug'atini yaratish (Kalit - string, qiymat - Product)
type ProductCatalog = Record<string, Product>;

const catalog: ProductCatalog = {
  "laptop-01": { id: 101, name: "Noutbuk", price: 1200, description: "Zo'r noutbuk" }
};
\`\`\`

### 3. Advanced Example (Conditional Types va \`infer\` yordamida funksiya qaytarish tipini aniqlash)
\`\`\`typescript
// Agarda T funksiya bo'lsa, uning qaytarish tipini (R) ajratib oladi, aks holda never qaytaradi
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const getUserRole = () => "admin" as const;

type UserRole = MyReturnType<typeof getUserRole>; // "admin"
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Katta loyihalarda bitta tipning har xil ko'rinishlari talab etiladi. Masalan, ma'lumotlar bazasidagi \`User\` modeli barcha maydonlarga ega, lekin API orqali uni tahrirlashda (\`PATCH\` so'rovida) faqat bitta-ikkita maydon yuborilishi mumkin. Agarda yordamchi tiplar bo'lmaganida, dasturchi har bir holat uchun alohida \`UserUpdate\`, \`UserCard\`, \`UserReadOnly\` kabi o'nlab o'xshash interfeyslarni qo'lda yozishi kerak bo'lardi. Bu esa kod takrorlanishiga va keyinchalik bitta maydon o'zgarganda barcha tiplarni yangilab chiqish qiyinchiligiga (maintenance do'zaxiga) sabab bo'lardi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Mapped yoki Omit tiplarida mavjud bo'lmagan kalitlarni ishlatish
#### Xato:
\`\`\`typescript
interface User {
  id: number;
  name: string;
}
// Loyihada xato ko'rsatmasligi mumkin, lekin mantiqan noto'g'ri
type InvalidOmit = Omit<User, "password">; 
\`\`\`

### 2. \`typeof\` va \`keyof\` operatorlarini chalkashtirish
\`typeof\` qiymatning tipini oladi, \`keyof\` esa obyekt tipining barcha kalitlarini union (birlashma) sifatida qaytaradi.
#### Xato:
\`\`\`typescript
const config = { theme: "dark" };
type ConfigKeys = keyof config; // Xatolik! Obyekt o'zgaruvchisiga to'g'ridan-to'g'ri keyof berib bo'lmaydi.
\`\`\`
#### Tuzatish:
\`\`\`typescript
const config = { theme: "dark" };
type ConfigKeys = keyof typeof config; // "theme"
\`\`\`

### 3. Partial qiymat maydonlarini tekshirmasdan ishlatish
\`Partial<T>\` qilinganda barcha maydonlar \`undefined\` bo'lishi mumkinligini inobatga olmaslik.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`Partial<T>\` va \`Required<T>\` farqi nimada?
   * **Javob:** \`Partial<T>\` barcha xossalarni ixtiyoriy (\`?\`) qiladi, \`Required<T>\` esa aksincha barcha ixtiyoriy xossalarni majburiy qiladi.
2. **Savol:** Obyekt maydonlarini faqat o'qiladigan qilish uchun qaysi utility tip ishlatiladi?
   * **Javob:** \`Readonly<T>\`.
3. **Savol:** \`Pick<T, K>\` qanday ishlaydi?
   * **Javob:** Berilgan \`T\` tipidan faqat \`K\` kalitlari orqali ko'rsatilgan xossalarni tanlab olib, yangi tip yaratadi.
4. **Savol:** \`Record<K, T>\` nima uchun ishlatiladi?
   * **Javob:** Obyekt lug'atlari (dictionary) yoki xaritalar (map) uchun kalit va qiymat tiplarini belgilab berishda qo'llaniladi.

### Middle (5–8)
5. **Savol:** \`Omit<T, K>\` va \`Exclude<T, U>\` farqi nimada?
   * **Javob:** \`Omit\` obyekt tipidan ma'lum kalitlarni olib tashlaydi, \`Exclude\` esa union (birlashma) tiplardan ma'lum tiplarni chiqarib yuboradi.
6. **Savol:** Mapped Types (Xaritalangan tiplar) nima?
   * **Javob:** Mavjud tip kalitlari ro'yxatini aylanib chiqib (sikl kabi), xususiyatlarini va qiymat tiplarini o'zgartirib yangi tip yaratish texnikasi.
7. **Savol:** \`NonNullable<T>\` qanday qiymatlarni filtrlaydi?
   * **Javob:** Berilgan tip tarkibidan \`null\` va \`undefined\` tiplarini butunlay olib tashlaydi.
8. **Savol:** TypeScript-da \`typeof\` operatori nima vazifani bajaradi?
   * **Javob:** JavaScript o'zgaruvchisi yoki obyektining strukturasini TypeScript tipi darajasida aniqlab beradi.

### Senior (9–12)
9. **Savol:** Conditional Types (Shartli tiplar) qanday yoziladi?
   * **Javob:** Ternary operator yordamida: \`T extends U ? X : Y\` ko'rinishida yoziladi.
10. **Savol:** Conditional tiplardagi \`infer\` kalit so'zining vazifasi nima?
    * **Javob:** Shart tekshiruvi jarayonida aniqlanmagan yoki yashirin bo'lgan tipni ajratib olish va unga o'zgaruvchi nomi berish uchun ishlatiladi.
11. **Savol:** Mapped Types-da \`+\` va \`-\` modifierlari nima qiladi?
    * **Javob:** \`readonly\` yoki \`?\` (optional) xususiyatlarni qo'shish (\`+\`) yoki olib tashlash (\`-\`) uchun qo'llaniladi. Masalan, \`-readonly\` maydonni o'zgaruvchan qiladi.
12. **Savol:** Utility tiplari JavaScript dasturi ishlash (runtime) tezligiga ta'sir qiladimi?
    * **Javob:** Yo'q. TypeScript-dagi barcha tiplar va utility vositalari transpayl paytida o'chiriladi va JS kodga hech qanday ta'sir o'tkazmaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida Mapped va Conditional tiplarni yechish va qayta ishlash jarayonini aks ettiruvchi sxema ko'rsatilgan:

\`\`\`mermaid
graph TD
    Input["Input Type: T"] --> Check{"T extends Array?"}
    Check -->|Yes| Extract["Extract Element Type: infer U"]
    Check -->|No| Return["Return T as is"]
    Extract --> OutputArray["UnwrapArray<T> = U"]
    Return --> OutputPlain["UnwrapArray<T> = T"]

    style Input fill:#f9f,stroke:#333,stroke-width:2px
    style OutputArray fill:#9f9,stroke:#333,stroke-width:2px
    style OutputPlain fill:#9cf,stroke:#333,stroke-width:2px
\`\`\`

\`\`\`mermaid
graph TD
    Original["Original Type: { id: number, role: string }"] --> Loop["Map Keys: [K in keyof T]"]
    Loop --> Modify["Apply modifier: boolean"]
    Modify --> Result["Result: { id: boolean, role: boolean }"]

    style Original fill:#f9f,stroke:#333,stroke-width:2px
    style Result fill:#bbf,stroke:#333,stroke-width:2px
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali mavzuni qanchalik yaxshi o'zlashtirganingizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### API Response Mapper va Permission Checker
Katta loyihalarda API orqali keladigan ma'lumotlarni foydalanuvchi huquqlariga qarab cheklash talab etiladi. Mapped va Conditional tiplar yordamida ma'lumotlarni faqat ruxsat berilgan qismini ko'rish uchun dinamik tiplash mumkin:

\`\`\`typescript
type Permissions = {
  canReadEmail: boolean;
  canReadSalary: boolean;
};

type EmployeeData = {
  email: string;
  salary: number;
  fullName: string;
};

// Shartli ravishda huquqlarga qarab Employee data qiymatlarini tiplaymiz
type RestrictData<Data, Perms extends Permissions> = {
  [K in keyof Data]: K extends "email" 
    ? (Perms["canReadEmail"] extends true ? string : null)
    : K extends "salary"
    ? (Perms["canReadSalary"] extends true ? number : null)
    : Data[K];
};

type GuestPermissions = { canReadEmail: false; canReadSalary: false };
type GuestData = RestrictData<EmployeeData, GuestPermissions>;
// GuestData = { email: null; salary: null; fullName: string; }
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **TypeScript kompilyator tezligi:** Murakkab shartli yoki rekurziv tiplar (\`extends\` zanjirlari juda chuqur bo'lsa) VS Code va IDE-larda tip tekshiruvini sekinlashtirishi mumkin.
* **Transpilation:** Utility va Advanced tiplar faqat loyiha ishlab chiqilayotgan paytda xavfsizlik uchun xizmat qiladi. JavaScript-ga o'girilganda barcha tiplar butunlay olib tashlanishi sababli runtime performance-ga 0% ta'sir qiladi.

---

## 10. 📌 Cheat Sheet

| Yordamchi Tip | Sintaksis | Vazifasi |
| :--- | :--- | :--- |
| \`Partial<T>\` | \`Partial<User>\` | Barcha maydonlarni ixtiyoriy (\`?\`) qiladi |
| \`Required<T>\` | \`Required<User>\` | Barcha ixtiyoriy maydonlarni majburiy qiladi |
| \`Readonly<T>\` | \`Readonly<User>\` | Barcha maydonlarni o'zgartirib bo'lmaydigan (\`readonly\`) qiladi |
| \`Record<K, T>\` | \`Record<string, number>\` | Dinamik kalit-qiymat obyektlari tipini yaratadi |
| \`Pick<T, K>\` | \`Pick<User, "name">\` | Faqat tanlangan maydonlardan iborat yangi tip yaratadi |
| \`Omit<T, K>\` | \`Omit<User, "id">\` | Tanlangan maydonlarni olib tashlab, qolganlaridan tip yaratadi |
| \`NonNullable<T>\` | \`NonNullable<string \\| null>\` | \`null\` va \`undefined\` qiymatlarini olib tashlaydi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Partial (Ixtiyoriy obyekt) simulyatsiyasi",
    "instruction": "User obyektini (`{ id, name, email }`) va qisman yangilanuvchi ma'lumotlarni (`Partial` kabi optional) qabul qilib, ularni birlashtirib qaytaruvchi `updateUser(user, fields)` funksiyasini yozing.",
    "startingCode": "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction updateUser(user: User, fields: Partial<User>): User {\n  // user va fields obyektlarini birlashtiring\n}",
    "hint": "return { ...user, ...fields };",
    "test": "if (typeof updateUser !== 'function') return 'updateUser topilmadi'; const u = { id: 1, name: 'Ali', email: 'a@a.com' }; const res = updateUser(u, { name: 'Vali' }); if(res.name !== 'Vali' || res.email !== 'a@a.com') return 'Obyekt yangilanmadi'; return null;"
  },
  {
    "id": 2,
    "title": "Custom Mapped Type (BooleanFlags)",
    "instruction": "Berilgan `T` tipidagi barcha maydonlarning tipini `boolean` qilib o'zgartiradigan custom mapped type `BooleanFlags<T>` e'lon qiling va uni `{ name: string; age: number }` interfeysiga tatbiq etib, `{ name: true, age: false }` obyektini qaytaradigan `getUserFlags()` funksiyasini yozing.",
    "startingCode": "type BooleanFlags<T> = {\n  // Mapped type qismini yozing\n};\n\nfunction getUserFlags() {\n  // Bu yerga yozing\n}",
    "hint": "type BooleanFlags<T> = {\n  [K in keyof T]: boolean;\n};\nfunction getUserFlags() {\n  return { name: true, age: false };\n}",
    "test": "if (typeof getUserFlags !== 'function') return 'getUserFlags topilmadi'; const res = getUserFlags(); if (res.name !== true || res.age !== false) return 'Flags qiymatlari xato'; return null;"
  },
  {
    "id": 3,
    "title": "Conditional Type va infer kalit so'zi",
    "instruction": "Agar berilgan tip `T` massiv bo'lsa uning element tipini (array element type), aks holda `T` ning o'zini qaytaradigan `UnwrapArray<T>` conditional tipini e'lon qiling. Ushbu tip yordamida `string[]`dan `string` tipini ajratib olib, satr qaytaruvchi `getFirstWord(words)` funksiyasini yozing.",
    "startingCode": "type UnwrapArray<T> = any; // Bu yerga conditional yozing\n\nfunction getFirstWord(words: string[]): string {\n  // words[0] ni qaytaring\n}",
    "hint": "type UnwrapArray<T> = T extends (infer U)[] ? U : T;\nfunction getFirstWord(words: string[]): UnwrapArray<string[]> {\n  return words[0];\n}",
    "test": "if (typeof getFirstWord !== 'function') return 'getFirstWord topilmadi'; if (getFirstWord(['Salom', 'Dunyo']) !== 'Salom') return 'Birinchi so\'z noto\'g\'ri'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Partial<T> yordamchi tipi (Utility Type) qanday vazifani bajaradi?",
    "options": [
      "Maydonlarni faqat sonlar bilan cheklaydi",
      "Obyekt tipidagi barcha maydonlarni ixtiyoriy (optional) qiladi",
      "Barcha maydonlarni o'chirib tashlaydi",
      "T tipini funksiyaga aylantiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Partial<T> barcha maydonlarni ixtiyoriy qiladi, ya'ni ularni e'lon qilishda `?` belgisi qo'shilgandek ta'sir ko'rsatadi."
  },
  {
    "id": 2,
    "question": "Required<T> tipining vazifasi nima?",
    "options": [
      "Barcha maydonlarni o'chirish",
      "Barcha ixtiyoriy (optional) maydonlarni majburiy (required) holga keltirish",
      "Maydonlarni faqat o'qish uchun sozlash",
      "Obyektga yangi kalitlar qo'shish"
    ],
    "correctAnswer": 1,
    "explanation": "Required<T> tipidagi barcha `?` optional belgilarini olib tashlab, har bir maydonga qiymat berilishini majburiy qiladi."
  },
  {
    "id": 3,
    "question": "Obyektning hech bir maydonini o'zgartirib bo'lmaydigan qilishda qaysi utility tipdan foydalaniladi?",
    "options": [
      "Freeze<T>",
      "Readonly<T>",
      "Const<T>",
      "Immutable<T>"
    ],
    "correctAnswer": 1,
    "explanation": "Readonly<T> obyekt tarkibidagi barcha maydonlarni `readonly` qilib belgilaydi, natijada qiymatlarni o'zgartirish taqiqlanadi."
  },
  {
    "id": 4,
    "question": "Quyidagi tip nima deb ataladi?\ntype AgeMap = Record<string, number>;",
    "options": [
      "Oddiy massiv tipi",
      "Kalitlari string bo'lgan va qiymatlari son bo'lgan obyekt lug'ati",
      "Tuple korteji",
      "Conditional Type"
    ],
    "correctAnswer": 1,
    "explanation": "Record<K, T> yordamida kalitlari K tipida va qiymatlari T tipida bo'lgan xarita/lug'at obyektlari tiplanadi."
  },
  {
    "id": 5,
    "question": "Mavjud tipdan faqat ko'rsatilgan bir nechta maydonlarni tanlab olishda qaysi utility tip ishlatiladi?",
    "options": [
      "Omit",
      "Pick",
      "Select",
      "Filter"
    ],
    "correctAnswer": 1,
    "explanation": "Pick<T, K> orqali T tipidan faqat K kalitlari ajratib olinib, yangi kichik tip yaratiladi."
  },
  {
    "id": 6,
    "question": "Mavjud tipdan ko'rsatilgan bir nechta maydonlarni o'chirib tashlab, qolgan maydonlardan tip hosil qilishda qaysi utility tip ishlatiladi?",
    "options": [
      "Pick",
      "Omit",
      "Exclude",
      "Delete"
    ],
    "correctAnswer": 1,
    "explanation": "Omit<T, K> turi T tarkibidan K ro'yxatidagi maydonlarni o'chirib, qolgan maydonlardan iborat yangi tip qaytaradi."
  },
  {
    "id": 7,
    "question": "NonNullable<T> tipi T tarkibidan qaysi tiplarni avtomatik ravishda olib tashlaydi?",
    "options": [
      "Faqat any tipini",
      "null va undefined tiplarini",
      "Faqat bo'sh satrlarni",
      "Faqat raqamlarni"
    ],
    "correctAnswer": 1,
    "explanation": "NonNullable<T> qiymatlarda null yoki undefined mavjud bo'lishi ehtimolini yo'qotib, xavfsizlikni ta'minlaydi."
  },
  {
    "id": 8,
    "question": "TypeScript-da typeof operatorining asosiy vazifasi nima?",
    "options": [
      "Faqat runtime-da tiplarni tekshirish",
      "Mavjud JavaScript o'zgaruvchisining tipini aniqlab, uni TypeScript kodi darajasida tip sifatida qo'llash",
      "Kodni siqish",
      "Error handling bajarish"
    ],
    "correctAnswer": 1,
    "explanation": "TypeScript darajasidagi typeof o'zgaruvchining tipini o'ziga ko'chirib olish uchun qulay. Masalan: `let y: typeof x = 10;`."
  },
  {
    "id": 9,
    "question": "Conditional Type (Shartli tip) sintaksisi qaysi operatorga juda o'xshash?",
    "options": [
      "If-else operatoriga",
      "Ternary (uchlik) shart operatoriga (A extends B ? C : D)",
      "Switch-case operatoriga",
      "Bitwise operatoriga"
    ],
    "correctAnswer": 1,
    "explanation": "Conditional type shartli tip tanlash uchun ternary operator sintaksisini qo'llaydi: `T extends U ? X : Y`."
  },
  {
    "id": 10,
    "question": "Mavjud tipdagi har bir maydonni aylanib chiqib, ularning xususiyatlarini o'zgartirish orqali yangi tip yaratish nima deyiladi?",
    "options": [
      "Mapped Types (Xaritalangan tiplar)",
      "Intersection Types",
      "Union Types",
      "Enum Types"
    ],
    "correctAnswer": 0,
    "explanation": "Mapped types yordamida mavjud tip maydonlarining tiplarini siklda o'zgartirib chiqish mumkin, masalan: barcha maydonlarni readonly yoki optional qilish."
  },
  {
    "id": 11,
    "question": "Funksiyaning qaytaradigan natijasi tipini aniqlab beradigan utility tip qaysi?",
    "options": [
      "FunctionReturn<T>",
      "ReturnType<T>",
      "GetReturn<T>",
      "ResultOf<T>"
    ],
    "correctAnswer": 1,
    "explanation": "ReturnType<T> funksiya tipi T ning return qiladigan qiymati qanday tipdaligini aniqlab beradi."
  },
  {
    "id": 12,
    "question": "Utility tiplar loyiha JavaScript-ga o'girilganda kod hajmiga qanday ta'sir ko'rsatadi?",
    "options": [
      "Kod hajmini 2 barobar ko'paytiradi",
      "Hech qanday ta'sir qilmaydi - ular kompilyatsiya vaqtida o'chib ketadi, JS faylda qolmaydi",
      "JS fayllarni import qilishni qiyinlashtiradi",
      "Faqat local keshda saqlanib qoladi"
    ],
    "correctAnswer": 1,
    "explanation": "Balla TypeScript utility tiplari faqat tip tekshiruvi uchun mavjud bo'lgani sababli, tayyor JS fayllardan to'liq olib tashlanadi."
  }
]

};
