export const typeNarrowing = {
  id: "typeNarrowing",
  title: "Type Narrowing va Type Guards",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Type Narrowing va Type Guards nima?
* **Type Narrowing (Tipni toraytirish):** TypeScript-da biror o'zgaruvchi bir nechta tipni qabul qila olganda (ya'ni Union type: \`string | number\`), uning aniq metodlaridan to'g'ridan-to'g'ri foydalana olmaymiz. Masalan, \`string | number\` tipiga ega o'zgaruvchiga \`.toUpperCase()\` deb murojaat qilsak, TypeScript kompilyatori xatolik beradi. Nega? Chunki u qiymat son bo'lib qolishi mumkinligidan xavotir oladi. Type Narrowing — bu shartlar va tekshiruvlar yordamida o'zgaruvchining tipini torroq va aniqroq sohaga olib kelish jarayonidir.
* **Type Guard (Tip qo'riqchisi):** Dasturning runtime (ishlash) vaqtida o'zgaruvchi tipini tekshiruvchi va natijasiga qarab compile-time (kompilyatsiya) vaqtida tipni toraytiruvchi maxsus ifoda yoki funksiyadir.

### Real hayotiy o'xshatish
Buni aeroportdagi **xavfsizlik nazorati (security checkpoint)** bilan solishtirish mumkin:
Barcha yo'lovchilar va ularning yuklari bitta umumiy oqimda (union type) keladi. Lekin bojxona xodimlari ularni tekshirish vaqtida turli guruhlarga ajratishadi (narrowing):
* Agar yuk metall buyum bo'lsa (\`typeof\` check), uni maxsus metall qidiruvchiga yuborishadi.
* Agar yo'lovchi xorijiy fuqaro bo'lsa (\`instanceof\` Passport check), pasport nazoratiga yuboriladi.
* Agar yukda taqiqlangan buyum borligi shubha qilinsa (\`in\` check), uni alohida tintuv qilishadi.

Ushbu tekshiruvlardan so'ng, har bir yo'lovchi o'z yo'nalishi bo'yicha ketadi va u yerda unga mos bo'lgan maxsus amallar bajariladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (\`typeof\` operatori yordamida primitivlarni toraytirish)
JavaScript-dagi standart \`typeof\` operatori primitiv tiplarni (\`string\`, \`number\`, \`boolean\`, \`symbol\`) tekshirish uchun ishlatiladi:
\`\`\`typescript
function formatPrice(price: string | number) {
  if (typeof price === "string") {
    // Bu blok ichida price avtomatik string deb hisoblanadi
    return price.trim().toUpperCase();
  } else {
    // Bu yerda esa faqat number bo'la oladi
    return price.toFixed(2);
  }
}
\`\`\`

### 2. Intermediate Example (\`instanceof\` va \`in\` operatorlari)
* **\`instanceof\`** — obyekt ma'lum bir klass yoki konstruktordan yaratilganligini tekshiradi:
\`\`\`typescript
function logFormattedDate(x: Date | string) {
  if (x instanceof Date) {
    // x aniq Date obyekti ekanligi kafolatlandi
    console.log(x.toUTCString());
  } else {
    // x string tipi deb qabul qilinadi
    console.log(new Date(x).toUTCString());
  }
}
\`\`\`
* **\`in\`** — obyekt tarkibida ma'lum bir xossa mavjudligini tekshiradi:
\`\`\`typescript
interface Admin {
  role: string;
  deleteUser: () => void;
}
interface User {
  name: string;
  profile: () => void;
}

function processUser(person: Admin | User) {
  if ("deleteUser" in person) {
    // person tarkibida deleteUser bor, demak u Admin
    person.deleteUser();
  } else {
    // person foydalanuvchi
    person.profile();
  }
}
\`\`\`

### 3. Advanced Example (Custom Type Guards va Assertion Functions)
* **Custom Type Guard:** Maxsus funksiya yordamida tipni aniqlash. Funksiya qaytarish tipi sifatida \`parameter is Type\` yoziladi:
\`\`\`typescript
interface Car { drive: () => void }
interface Boat { sail: () => void }

function isCar(vehicle: Car | Boat): vehicle is Car {
  return (vehicle as Car).drive !== undefined;
}

function moveVehicle(v: Car | Boat) {
  if (isCar(v)) {
    v.drive(); // Car ekanligi kafolatlandi
  } else {
    v.sail(); // Boat ekanligi kafolatlandi
  }
}
\`\`\`
* **Assertion Function:** Agar shart to'g'ri kelmasa, xatolik otuvchi va keyingi kodda tipni toraytiruvchi funksiyalar:
\`\`\`typescript
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Qiymat satr bo'lishi shart!");
  }
}

function processUnknown(val: unknown) {
  assertIsString(val);
  // Bu qatordan boshlab val string deb qabul qilinadi
  console.log(val.toUpperCase());
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Agar bizda union tiplar yoki \`unknown\` qiymatlar bo'lsa, ularni tekshiruvsiz ishlatish xavfli hisoblanadi. TypeScript bizga quyidagi xatoliklarning oldini olishga yordam beradi:
1. **Runtime Error (Ishga tushishdagi xatolar):** Obyektda mavjud bo'lmagan metodni chaqirish (masalan, \`TypeError: x.toFixed is not a function\`).
2. **Kompilyatsiya xavfsizligi:** Dasturchi kod yozayotgan paytda noto'g'ri metodlarni chaqirishdan ogohlantiradi.
3. **Kodni tozalash:** \`any\` turidan butunlay voz kechish va tiplarni aniq boshqarish imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`typeof null === 'object'\` tuzog'i
Junior dasturchilar ko'pincha qiymat null emasligini tekshirish uchun faqat \`typeof obj === 'object'\` dan foydalanadilar.
* **Xato:**
\`\`\`typescript
function process(obj: object | null) {
  if (typeof obj === "object") {
    // Xatolik! null ham object qaytaradi va bu yerda obj.hasOwnProperty() xato berishi mumkin
    console.log(obj.toString()); 
  }
}
\`\`\`
* **To'g'ri usul:**
\`\`\`typescript
function process(obj: object | null) {
  if (obj !== null && typeof obj === "object") {
    console.log(obj.toString());
  }
}
\`\`\`

### 2. Interfeyslar ustida \`instanceof\` ishlatish
TypeScript interfeyslari faqat kompilyatsiya vaqtida mavjud bo'ladi. JavaScript-ga o'girilganda interfeyslar butunlay o'chib ketadi.
* **Xato:**
\`\`\`typescript
interface Bird { fly: () => void }
// if (pet instanceof Bird) { ... } -> Xato! Bird sinf emas, u runtime-da mavjud emas!
\`\`\`
* **To'g'ri usul:** Interfeyslar uchun \`in\` operatori yoki Custom Type Guard-lardan foydalaning.

### 3. Custom Type Guard-da noto'g'ri logika
Custom type guard-da funksiya \`true\` qaytarsa, TypeScript siz ko'rsatgan tipga ishonadi, hatto logika noto'g'ri bo'lsa ham.
* **Xato:**
\`\`\`typescript
function isNumber(x: any): x is number {
  return typeof x === "string"; // Noto'g'ri return, lekin TS baribir x ni number deb hisoblaydi!
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** TypeScript-da Type Narrowing nima?
   * **Javob:** Union tipli o'zgaruvchini shartli tekshiruvlar yordamida kichikroq va aniqroq tip doirasiga olib kelish jarayoni.
2. **Savol:** JavaScript \`typeof\` operatori qaysi tiplarni aniqlay oladi?
   * **Javob:** Primitiv turlarni: \`string\`, \`number\`, \`boolean\`, \`symbol\`, \`undefined\`, \`object\`, \`function\`, \`bigint\`.
3. **Savol:** \`instanceof\` qachon ishlatiladi?
   * **Javob:** Obyekt prototipi zanjirida berilgan klass mavjudligini tekshirish uchun (masalan, \`Date\`, \`Error\` yoki maxsus klasslar).
4. **Savol:** Obyektda biror xossa borligini qaysi operator yordamida tekshirish mumkin?
   * **Javob:** \`in\` operatori yordamida. Masalan: \`"fly" in animal\`.

### Middle (5–8)
5. **Savol:** Discriminated Union nima va u qanday yaratiladi?
   * **Javob:** Har bir interfeysga umumiy literal nomli (masalan, \`kind\` yoki \`type\`) maydon qo'shish va uning qiymatlari orqali tiplarni ajratish.
6. **Savol:** Custom Type Guard yaratish sintaksisi qanday?
   * **Javob:** Funksiya qaytaruvchi qiymati sifatida \`parameter is Type\` (masalan, \`x is string\`) yoziladi va funksiya boolean qiymat qaytarishi shart.
7. **Savol:** Nima uchun \`typeof null\` natijasi \`'object'\` bo'lib chiqadi?
   * **Javob:** Bu JavaScript-ning dastlabki versiyalaridan qolgan tarixiy xato bo'lib, null xotirada 000 ko'rinishida saqlangani uchun uni obyekt deb hisoblagan.
8. **Savol:** Type predicate (\`parameter is Type\`) oddiy \`boolean\`dan nima bilan farq qiladi?
   * **Javob:** Oddiy \`boolean\` faqat true/false qaytaradi, TypeScript kompilyatori esa shart blokida tipni toraytira olmaydi. Type predicate esa TypeScript-ga o'zgaruvchining tipini o'zgartirish haqida buyruq beradi.

### Senior (9–12)
9. **Savol:** Assertion function (\`asserts x is Type\`) oddiy type guard funksiyasidan nimasi bilan farq qiladi?
   * **Javob:** Type guard boolean qaytaradi va \`if\` sharti bilan ishlaydi. Assertion funksiyasi esa agar tekshiruv muvaffaqiyatsiz bo'lsa xatolik otadi va shart bloklarisiz undan keyingi barcha kodlarda tipni toraytiradi.
10. **Savol:** exhaustive check (to'liq tekshirish) nima va unga qanday erishiladi?
    * **Javob:** \`never\` tipi yordamida switch-case yoki if-else bloklarida barcha mumkin bo'lgan tiplar qamrab olinganini tekshirish. Agar yangi tip qo'shilsa va u tekshirilmay qolsa, kompilyator xatolik beradi.
11. **Savol:** Dinamik API ma'lumotlarini tekshirishda qaysi turdagi guard eng mos keladi?
    * **Javob:** Custom type guards yoki Zod/Yup kabi runtime validation kutubxonalari orqali ma'lumot strukturasi to'liq tekshirilgandan keyin safe narrowing qilish.
12. **Savol:** TypeScript-da narrowing faqat runtime tekshiruvlarga tayanadimi?
    * **Javob:** Tekshiruv logikasi (typeof, instanceof, in) JavaScript runtime-da bajariladi. Lekin undan keyingi tip toraytirish va static tekshiruvlar faqat compile-time vaqtida TypeScript tomonidan bajariladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz amaliy mashqlar orqali tiplarni toraytirishni o'rganasiz.

Quyidagi diagramma union tip (\`string | Date | Car\`) qanday qilib tegishli type guard orqali bosqichma-bosqich toraytirilishini ko'rsatadi:

\`\`\`mermaid
flowchart TD
    Start["Union Type: value (string | Date | Car)"] --> CheckType{"typeof value === 'string'"}
    CheckType -->|Yes| StringBlock["value is string (toUpperCase allowed)"]
    CheckType -->|No| CheckInstance{"value instanceof Date"}
    CheckInstance -->|Yes| DateBlock["value is Date (getFullYear allowed)"]
    CheckInstance -->|No| CheckCustom{"isCar(value) (custom guard)"}
    CheckCustom -->|Yes| CarBlock["value is Car (drive allowed)"]
    CheckCustom -->|No| UnknownBlock["value is unknown / fallback / never"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari quyidagi quizzes bo'limida keltirilgan.

---

## 8. 🎯 Real Project Case Study

### API javoblarini Discriminated Unions orqali xavfsiz boshqarish
Tasavvur qiling, bizda serverdan keladigan turli xil javob holatlari mavjud. Ularni to'g'ri ajratmasak, yo'q maydonlarga murojaat qilib xatoga yo'l qo'yamiz.

#### Exhaustive checking bilan yechim:
\`\`\`typescript
interface SuccessResponse {
  status: "success";
  data: { id: number; name: string };
}

interface ErrorResponse {
  status: "error";
  message: string;
}

interface LoadingResponse {
  status: "loading";
}

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleApiResponse(response: ApiResponse) {
  switch (response.status) {
    case "success":
      // response.data xavfsiz o'qiladi
      console.log("Foydalanuvchi nomi:", response.data.name);
      break;
    case "error":
      // response.message xavfsiz o'qiladi
      console.error("Xatolik yuz berdi:", response.message);
      break;
    case "loading":
      console.log("Yuklanmoqda...");
      break;
    default:
      // Exhaustive check: yangi javob turi qo'shilsa va case yozilmasa, bu yerda xato beradi
      const _exhaustiveCheck: never = response;
      return _exhaustiveCheck;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Zero Runtime Overhead:** TypeScript-ning tiplarni toraytirish tekshiruvlari JavaScript-ning standart operatorlari (\`typeof\`, \`instanceof\`, \`in\`) yordamida yoziladi. Ular qo'shimcha runtime kutubxonalari yoki ortiqcha kodlarsiz ishlaydi.
* **V8 Engine optimizatsiyasi:** Discriminated Union-larda literal maydonlar (masalan: \`status: "success"\`) tekshiruvi juda tez ishlaydi, chunki JS dvigatellari (V8) string yoki son literals solishtirishni optimallashtirilgan shaklda bajaradi.
* **Yengil custom type guardlar:** Custom type guard yozayotganda ichkarida og'ir va ko'p vaqt oladigan operatsiyalar yoki tarmoq so'rovlarini amalga oshirmaslik kerak, chunki bu shartli tekshiruvlar har safar bajarilganda dastur ishlashini sekinlashtiradi.

---

## 10. 📌 Cheat Sheet

| Shart turi | Runtime operatori | Sintaksis misoli | Qaysi hollarda qo'llaniladi |
| :--- | :--- | :--- | :--- |
| **Primitiv tiplar** | \`typeof\` | \`typeof val === "string"\` | \`string\`, \`number\`, \`boolean\`, \`symbol\` va boshqalar |
| **Klass nusxalari** | \`instanceof\` | \`val instanceof Date\` | Klaslar, sanalar (\`Date\`), xatolar (\`Error\`) |
| **Xossa mavjudligi** | \`in\` | \`"fly" in animal\` | Interfeyslar va obyekt xossalarini tekshirish |
| **Custom Tip Guard** | Type predicate (\`is\`) | \`x is Car\` | Murakkab obyektlar va custom tiplar |
| **Tasdiq (Assertion)** | \`asserts\` | \`asserts val is string\` | Testlar va run-time tekshiruvlarda majburiy toraytirish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Typeof Type Guard",
    "instruction": "Kiruvchi `val` parametrini (`string | number`) tekshiring. Agar string bo'lsa uning uzunligini, number bo'lsa uning kvadratini qaytaruvchi `checkType(val)` funksiyasini yozing.",
    "startingCode": "function checkType(val: string | number): number {\n  // Kodni yozing\n}",
    "hint": "if (typeof val === 'string') return val.length; return val * val;",
    "test": "if (typeof checkType !== 'function') return 'checkType topilmadi'; if(checkType('hello') !== 5 || checkType(4) !== 16) return 'Turlarni tekshirish xato'; return null;"
  },
  {
    "id": 2,
    "title": "Instanceof Type Guard",
    "instruction": "O'zgaruvchi `val` (`Date | string`) qabul qilib, agar u Date obyekti bo'lsa uning yilini (`getFullYear()`), string bo'lsa uni Date obyekti sifatida pars qilib, keyin uning yilini qaytaradigan `getYear(val)` funksiyasini yozing.",
    "startingCode": "function getYear(val: Date | string): number {\n  // instanceof dan foydalaning\n}",
    "hint": "if (val instanceof Date) return val.getFullYear(); return new Date(val).getFullYear();",
    "test": "if (typeof getYear !== 'function') return 'getYear topilmadi'; if(getYear(new Date(2025, 0, 1)) !== 2025 || getYear('2026-01-01') !== 2026) return 'Yilni aniqlash xato'; return null;"
  },
  {
    "id": 3,
    "title": "In Operator Guard",
    "instruction": "Foydalanuvchi `user` (`Admin | Guest`) qabul qilib, unda `kickUser` xossasi borligini `in` operatori orqali tekshiring. Agar u Admin bo'lsa `kickUser()` natijasini, Guest bo'lsa `login()` natijasini qaytaruvchi `handleUser(user)` funksiyasini yozing.",
    "startingCode": "interface Admin { role: string; kickUser: () => string; }\ninterface Guest { name: string; login: () => string; }\n\nfunction handleUser(user: Admin | Guest): string {\n  // in operatorini ishlating\n}",
    "hint": "if ('kickUser' in user) return user.kickUser(); return user.login();",
    "test": "if (typeof handleUser !== 'function') return 'handleUser topilmadi'; const admin = { role: 'admin', kickUser: () => 'Kicked' }; const guest = { name: 'Ali', login: () => 'Logged in' }; if (handleUser(admin) !== 'Kicked' || handleUser(guest) !== 'Logged in') return 'Foydalanuvchi roli noto\\'g\\'ri tekshirildi'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "TypeScript-da 'Type Narrowing' deganda nima tushuniladi?",
    "options": [
      "O'zgaruvchi xotira hajmini kamaytirish",
      "Union tipdagi o'zgaruvchini ma'lum tekshiruvlar yordamida aniqroq tipga toraytirish",
      "Koddagi barcha o'zgaruvchilarni number-ga o'tkazish",
      "TypeScript-ni JavaScript-ga transpayl qilish"
    ],
    "correctAnswer": 1,
    "explanation": "Type Narrowing union tipli o'zgaruvchilar ustida xavfsiz amal bajarish uchun uning tipini shartlar doirasida aniqlashtirishdir."
  },
  {
    "id": 2,
    "question": "Primitiv turlarni (string, number va boshqalar) tekshirishda qaysi type guard mos keladi?",
    "options": [
      "instanceof",
      "in",
      "typeof",
      "as"
    ],
    "correctAnswer": 2,
    "explanation": "typeof operatori JavaScript primitiv tiplarini tekshirish va uni TypeScript darajasida toraytirish uchun ishlatiladi."
  },
  {
    "id": 3,
    "question": "Klass nusxalari (instances) yoki Date kabi obyektlarni tekshirish uchun qaysi operator ishlatiladi?",
    "options": [
      "typeof",
      "instanceof",
      "in",
      "is"
    ],
    "correctAnswer": 1,
    "explanation": "instanceof klass yoki obyekt zanjiri orqali aniq klass nusxasi ekanligini tekshirish uchun ishlatiladi."
  },
  {
    "id": 4,
    "question": "Obyekt tarkibida aniq bir maydon/xossa mavjudligini tekshirishda qaysi type guard qo'llaniladi?",
    "options": [
      "typeof",
      "instanceof",
      "in",
      "is"
    ],
    "correctAnswer": 2,
    "explanation": "'property in object' sintaksisi orqali obyektda kerakli xossa borligi aniqlanadi va tip toraytiriladi."
  },
  {
    "id": 5,
    "question": "Discriminated Union tipida har bir interfeysda qanday umumiy maydon bo'lishi kerak?",
    "options": [
      "Faqat id maydoni",
      "Umumiy nomli, lekin har xil literal qiymatga ega bo'lgan identifikator (masalan: kind)",
      "Barcha maydonlar turi bir xil bo'lishi shart",
      "Hech qanday umumiy xossa kerak emas"
    ],
    "correctAnswer": 1,
    "explanation": "Discriminated union-lar har bir obyektdagi umumiy literal tipdagi xossa (kind yoki type) qiymatini solishtirish orqali farqlanadi."
  },
  {
    "id": 6,
    "question": "Custom Type Guard yaratishda funksiyaning qaytarish turi sintaksisi qanday bo'ladi?",
    "options": [
      "boolean",
      "parameter is Type",
      "Type | null",
      "asserts parameter is Type"
    ],
    "correctAnswer": 1,
    "explanation": "Custom Type Guard-da funksiya `parameter is Type` ko'rinishida tip predikatini qaytaradi va u ichkarida true bo'lganda shu tip qabul qilinadi."
  },
  {
    "id": 7,
    "question": "Assertion Functions haqidagi qaysi tasdiq to'g'ri?",
    "options": [
      "Ular hech qachon xatolik otmaydi",
      "Ular asserts parameter is Type sintaksisidan foydalanib, shart bajarilmasa xato otadi va undan keyingi kodlarda tipni kafolatlaydi",
      "Ular faqat CSS stillarini tekshiradi",
      "Ular oddiy JavaScript-ga transpayl qilinmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Assertion functions (`asserts val is number`) o'zgaruvchi talab qilingan tipda bo'lmasa xato otadi va funksiya chaqirilgandan keyingi kodda shu o'zgaruvchi o'sha tipda ekanligini kafolatlaydi."
  },
  {
    "id": 8,
    "question": "Quyidagi tekshiruvning natijasi nima bo'ladi? typeof null === 'object'",
    "options": [
      "Bu xato, u 'null' qaytaradi",
      "Bu to'g'ri, JavaScript-da null obyektdir, shuning uchun faqat typeof object tekshiruvi null uchun ham ishlaydi",
      "Bu true qaytarsa-da, TypeScript-da uni tip guard deb bo'lmaydi",
      "U runtime error beradi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da `typeof null === 'object'` har doim true qaytarganligi sababli, faqat typeof 'object' qilish orqali null qiymatni xavfsiz filtrlash yetarli emas."
  },
  {
    "id": 9,
    "question": "Nima uchun TypeScript-da interfeyslar (interfaces) ustida instanceof tekshiruvini amalga oshirib bo'lmaydi?",
    "options": [
      "Interfeyslar faqat compile-time da mavjud bo'lib, runtime JavaScript-da o'chib ketadi",
      "Interfeyslar juda katta xotira egallaydi",
      "Interfeyslar faqat typeof bilan tekshirilishi shart",
      "TypeScript interfeyslarda instanceof-ni taqiqlamaydi, u to'g'ridan-to'g'ri ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Interfeyslar faqat TypeScript tip tizimida mavjud va JavaScript-ga transpayl qilinganda yo'qoladi. Shu bois runtime-da ishlaydigan `instanceof` ularni tekshira olmaydi."
  },
  {
    "id": 10,
    "question": "TypeScript-da shart blokining else qismida o'zgaruvchining tipi qanday aniqlanadi?",
    "options": [
      "U har doim any bo'lib qoladi",
      "U kompilyator tomonidan union tarkibidagi qolgan tiplardan iborat deb toraytiriladi",
      "U har doim never tipida bo'ladi",
      "Dasturchi uni qo'lda qayta e'lon qilishi shart"
    ],
    "correctAnswer": 1,
    "explanation": "TypeScript `if` bloki ichidagi shartga mos kelmaydigan qolgan barcha tiplarni `else` blokiga o'tkazadi va tipni toraytiradi."
  },
  {
    "id": 11,
    "question": "Exhaustive type checking (barcha tiplar tekshirilganligini kafolatlash) uchun qaysi tipdan foydalaniladi?",
    "options": [
      "any",
      "unknown",
      "never",
      "void"
    ],
    "correctAnswer": 2,
    "explanation": "`never` tipiga qiymat yuklash orqali biz switch-case yoki if-else zanjirida barcha union tiplari qamrab olinganini tekshiramiz. Agar yangi tip qo'shilsa va u tekshirilmasa, compile-time xatosi yuzaga keladi."
  },
  {
    "id": 12,
    "question": "Custom Type Guard-da funksiya tanasi qanday qiymat qaytarishi shart?",
    "options": [
      "Faqat satr (string) qiymat",
      "Shart bajarilishini tasdiqlovchi mantiqiy (boolean) qiymat",
      "Hech narsa qaytarmaydi (void)",
      "Tekshirilayotgan obyektning o'zini"
    ],
    "correctAnswer": 1,
    "explanation": "Custom type guard funksiyasi mantiqiy (`true` yoki `false`) qiymat qaytarasi. TypeScript ushbu boolean natijaga qarab o'zgaruvchi tipini toraytiradi."
  }
]

};
