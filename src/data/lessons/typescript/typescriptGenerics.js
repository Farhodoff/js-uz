export const typescriptGenerics = {
  id: "typescriptGenerics",
  title: "Generics (Umumiylashtirish)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Generics (Umumiylashtirish) nima?
Dasturlashda ko'pincha har xil turdagi ma'lumotlar bilan ishlaydigan qayta ishlatiladigan komponentlar yoki funksiyalar yozish talab qilinadi. Masalan, massivlar bilan ishlaydigan yordamchi funksiya sonlar massivini ham, satrlar massivini ham qayta ishlay olishi kerak.
Agar biz har bir tip uchun alohida funksiya yozsak, kod hajmi ko'payadi. Agar \`any\` tipini ishlatsak, tiplar xavfsizligidan (type safety) butunlay voz kechgan bo'lamiz.
**Generics** esa bu muammoni hal qiladi: ular funksiya, klass yoki interfeys chaqirilayotgan vaqtda qaysi tip bilan ishlashini parametr sifatida qabul qilish imkonini beradi. Bu kodning qayta ishlatilishini oshiradi va tiplar xavfsizligini 100% saqlaydi.

### Real hayotiy o'xshatish
Generics-ni **bo'sh yuk konteynerlariga (shipping containers)** o'xshatish mumkin:
* **Oddiy tipli klass/funksiya** — bu faqat **olma** uchun maxsus qurilgan qutidir (unga nok solib bo'lmaydi).
* **\`any\` tipli klass/funksiya** — bu **aralash qutidir**. Unga hamma narsani tartibsiz solaverasiz, lekin ichidan olma olayotganda, u nok bo'lib chiqishi yoki buzilib ketgan bo'lishi mumkin (runtime error).
* **Generic klass/funksiya (\`Container<T>\`)** — bu **universal bo'sh konteynerdir**. Uni ishlatish paytida siz unga \`Apple\` yorlig'ini yopishtirasiz va u faqat olmalarni xavfsiz saqlaydi. Boshqa safar esa unga \`Orange\` yorlig'ini urib, faqat apelsinlar uchun ishlata olasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Generic Identity Funksiyasi)
Qiymatni o'zidek qaytaruvchi oddiy generic funksiya:
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Ishlatilishi (majburiy tip ko'rsatish)
let output1 = identity<string>("Salom Dunyo"); 

// Avtomatik aniqlash (Type Inference)
let output2 = identity(100); // T avtomatik ravishda number deb topiladi
\`\`\`

### 2. Intermediate Example (Generic Constraints va keyof)
Generic tip parametrlarini cheklash (\`extends\`) va obyekt kalitlarini tekshirish:
\`\`\`typescript
interface Lengthwise {
  length: number;
}

// T faqat .length xossasiga ega bo'lgan tiplarni qabul qila oladi
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Obyektdan kalit bo'yicha qiymat olish (keyof constraint)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // To'g'ri: 1 qaytadi
// getProperty(x, "m"); // Xato: "m" xossasi x da mavjud emas!
\`\`\`

### 3. Advanced Example (Generic Class va Factory Funksiyalar)
Ma'lumotlarni xavfsiz saqlash klassi va klass konstruktori yordamida obyekt yaratuvchi factory funksiya:
\`\`\`typescript
class DataStore<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }
}

// Klass tiplari bilan factory yaratish
function createInstance<T>(clazz: new () => T): T {
  return new clazz();
}

class Car {
  drive() {
    console.log("Mashina haydalmoqda...");
  }
}
const myCar = createInstance(Car); // Car instansiyasi xavfsiz yaratiladi
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammolarni hal qiladi?
* **Kod takrorlanishi (Code Duplication):** Agar loyihada \`number\`, \`string\` va \`User\` obyektlari uchun alohida ro'yxat (List/Queue) klasslari kerak bo'lsa, generic-siz 3 ta alohida klass yozishga majbur bo'lar edik. Generics buni bitta \`List<T>\` klassiga jamlaydi.
* **\`any\` xavfi (Loss of Type Safety):** \`any\` tipidan foydalanilganda TypeScript o'zining asosiy kuchi — tiplar nazoratini yo'qotadi. Generics esa har xil tiplarni qabul qilsa ham, kirish va chiqish qiymatlarining bog'liqligini qat'iy saqlaydi.
* **Tushunarsiz Kast qilishlar (Type Casting):** Generics yordamida ma'lumotlarni o'qiyotganda qo'shimcha \`as targetType\` deb majburiy o'tkazish (casting) qilishga hojat qolmaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Generic xususiyatlarni asossiz cheklash
#### Xato:
\`\`\`typescript
function getLength<T>(arg: T): number {
  return arg.length; // Xatolik: T tipida 'length' xossasi borligi kafolatlanmagan
}
\`\`\`
#### To'g'ri usul:
\`\`\`typescript
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length; // extends yordamida cheklov qo'shildi
}
\`\`\`

### 2. Generics-ni keraksiz joyda ishlatish
#### Xato:
\`\`\`typescript
function logValue<T>(value: T): void {
  console.log(value); // Agar T faqat kirishda ishlatilib, qaytishda yoki o'zaro bog'liqlikda kerak bo'lmasa
}
\`\`\`
#### To'g'ri usul:
\`\`\`typescript
function logValue(value: unknown): void {
  console.log(value); // Generics o'rniga unknown yoki konkret tip ishlatish koddagi murakkablikni kamaytiradi
}
\`\`\`

### 3. Static a'zolarda generic-ni ishlatishga urinish
#### Xato:
\`\`\`typescript
class Box<T> {
  static defaultValue: T; // Xato: static a'zolar generic tiplardan foydalana olmaydi
}
\`\`\`
#### To'g'ri usul:
Static a'zolar klass instansiyasi yaratilmasdan oldin mavjud bo'lgani sababli, ular generic tiplardan mustaqil bo'lishi kerak. Kerak bo'lsa, static metodning o'ziga alohida generic parametr bering.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Generics nima va u \`any\` tipidan nimasi bilan farq qiladi?
   * **Javob:** Generics tiplar xavfsizligini saqlagan holda moslashuvchan kod yozish imkonini beradi. \`any\` esa barcha tiplar tekshiruvini o'chirib yuboradi.
2. **Savol:** Generic funksiyada \`<T>\` nimani anglatadi?
   * **Javob:** Bu tip o'zgaruvchisi bo'lib, funksiya chaqirilgan vaqtda uzatiladigan aniq tipni vaqtinchalik saqlaydi.
3. **Savol:** Type Inference (Tipni aniqlash) generics bilan qanday ishlaydi?
   * **Javob:** Agar funksiya chaqirilganda burchak qavslarda tip yozilmasa, TypeScript argumentlarga qarab tipni o'zi aniqlab oladi (masalan, \`identity(5)\` -> \`T\` son deb olinadi).
4. **Savol:** Default Generic Parameters nima?
   * **Javob:** Agar tip uzatilmasa, sukut bo'yicha ishlatiladigan tip. Masalan: \`<T = string>\`.

### Middle (5–8)
5. **Savol:** Generic constraints (Cheklovlar) nima uchun kerak va u qanday yoziladi?
   * **Javob:** Generic tip qabul qilishi mumkin bo'lgan tiplarni cheklash uchun. \`extends\` kalit so'zi yordamida yoziladi. Masalan: \`<T extends string>\`.
6. **Savol:** \`keyof\` kalit so'zi generics-da qanday qo'llaniladi?
   * **Javob:** Biror obyekt tipining barcha kalitlarini union tip qilib olish uchun. Masalan, \`<K extends keyof T>\` orqali \`K\` faqat \`T\` obyektining kalitlaridan biri bo'lishini ta'minlaydi.
7. **Savol:** Generic Interface nima?
   * **Javob:** Ichidagi maydonlari yoki metodlari o'zgaruvchan tiplarni qabul qila oladigan interfeys. Masalan: \`interface ApiResponse<T> { data: T; status: number; }\`.
8. **Savol:** Nima uchun static metod yoki maydonlarda sinfning generic parametridan foydalanib bo'lmaydi?
   * **Javob:** Chunki static a'zolar sinf instansiyasi yaratilishidan oldin yuklanadi va instansiyadagi generic tip bilan bog'liq bo'lmaydi.

### Senior (9–12)
9. **Savol:** TypeScript-da factory funksiya yozishda klass tipi generic parametr sifatida qanday uzatiladi?
   * **Javob:** \`new () => T\` yoki \`new (...args: any[]) => T\` konstruktor signaturasi orqali uzatiladi.
10. **Savol:** Type Erasure (Tiplarning o'chirilishi) nima va generics runtime-da mavjud bo'ladimi?
    * **Javob:** TypeScript kodi JavaScript-ga transpayl qilinganda barcha generic tiplar, cheklovlar va burchak qavslar o'chiriladi. Runtime-da generics mavjud bo'lmaydi.
11. **Savol:** generic parametrlar bilan \`T & U\` (Intersection) qanday ishlaydi?
    * **Javob:** Ikkita alohida generic obyekt tiplarini birlashtirib, har ikkala obyektning barcha xossalariga ega yangi yagona tip yaratishda ishlatiladi.
12. **Savol:** \`Record<K, T>\` utility tipi qanday yozilgan?
    * **Javob:** U ichki generic tip bo'lib, \`type Record<K extends keyof any, T> = { [P in K]: T; }\` ko'rinishida yozilgan.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz generics bilan bog'liq asosiy amallarni bajarasiz.

### Generic Type Constraints va Mappings Vizualizatsiyasi

Quyidagi diagrammada generic tiplar uchun cheklovlar (\`extends\`) va uning tekshirilish jarayoni tasvirlangan:

\`\`\`mermaid
graph TD
    T["T (Generic Type)"] -->|extends| Constraint["{ id: number } (Constraint)"]
    Input1["{ id: 1, name: 'Ali' }"] -->|Valid (Matches Constraint)| T
    Input2["{ name: 'Vali' }"] -->|Invalid (Missing id property)| T
\`\`\`

Quyidagi diagrammada esa \`keyof\` kalit so'zi yordamida kalitlar union-ini yaratish va uni cheklash sxemasi ko'rsatilgan:

\`\`\`mermaid
graph LR
    T["Type T = { name: string, age: number }"]
    K["Type K extends keyof T"]
    K -->|Can be| K1["'name'"]
    K -->|Can be| K2["'age'"]
    K -->|Invalid| K3["'other' (Error)"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari orqali bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Xavfsiz HTTP Client Adapteri
Katta loyihalarda tashqi API'lar bilan ishlaganda ma'lumotlar turli shaklda qaytadi. Quyida API'dan ma'lumotlarni tiplar xavfsizligi bilan oluvchi generic HTTP service yozilgan:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Generic request metodi
  async get<T>(path: string): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${path}\`);
    if (!response.ok) {
      throw new Error(\`HTTP xatosi! Status: \${response.status}\`);
    }
    const data = (await response.json()) as T;
    return {
      data,
      status: response.status,
      message: "Muvaffaqiyatli yuklandi"
    };
  }
}

// Loyihadagi foydalanish misoli:
interface User {
  id: number;
  name: string;
  email: string;
}

const client = new ApiClient("https://api.example.com");

async function loadUser() {
  // get metodi User qaytarishini aniq bilamiz
  const response = await client.get<User>("/users/1");
  console.log(response.data.name); // Ali (Autocomplete va Type safety ishlaydi!)
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Zero Runtime Overhead:** TypeScript generics faqat kompilyatsiya vaqtida (compile-time) tekshiriladi. JavaScript transpayl bo'lganda barcha tiplar o'chirib yuborilgani bois, u ishlab chiqarish muhitida hech qanday yuklama (overhead) hosil qilmaydi.
* **Avoid redundant generics:** Loyihalarda build va type-checking tezligini saqlash uchun generics-ni faqat haqiqatan ham parametrli moslashuvchanlik kerak bo'lgan joylardagina qo'llash tavsiya etiladi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Sintaksis / Misol | Tavsifi |
| :--- | :--- | :--- |
| **Generic Funksiya** | \`function f<T>(x: T): T\` | Har xil tiplarni qabul qiladigan va bog'liqlikni saqlaydigan funksiya |
| **Generic Interface** | \`interface Box<T> { val: T }\` | Maydonlari tipi o'zgaruvchan bo'lgan obyekt shakli |
| **Generic Class** | \`class Store<T> { item: T }\` | Obyekt yaratilishida tip parametrlari aniqlanadigan sinf |
| **Generic Constraints** | \`T extends Lengthwise\` | Generic tipni ma'lum bir interfeys yoki shart bilan cheklash |
| **Obyekt Kalitlari Cheklovi** | \`K extends keyof T\` | Parametrni faqat obyektdagi mavjud kalitlar bilan cheklash |
| **Default Generic Param** | \`<T = string>\` | Agar chaqiruvda tip ko'rsatilmasa, sukut bo'yicha string-ni olish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Generic Key-Value Juftligi",
    "instruction": "Ikkita turli tipdagi kalit (`key`) va qiymat (`value`) qabul qilib, ularni `{ key, value }` shaklidagi obyektda qaytaradigan generic `createPair(key, value)` funksiyasini yozing.",
    "startingCode": "function createPair<K, V>(key: K, value: V): { key: K; value: V } {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return { key, value };",
    "test": "if (typeof createPair !== 'function') return 'createPair funksiyasi topilmadi';\nconst pair = createPair('age', 25);\nif (pair.key !== 'age' || pair.value !== 25) return 'Juftlik to\\'g\\'ri yaratilmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Constraint: Uzunlik mulkini tekshirish",
    "instruction": "Tarkibida `.length` xossasi (number tipida) mavjud bo'lgan har qanday obyektni qabul qilib, uning uzunligini qaytaruvchi generic `getLength(obj)` funksiyasini yozing. Buning uchun generic tipga mos cheklov qo'llang.",
    "startingCode": "function getLength<T extends { length: number }>(obj: T): number {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return obj.length;",
    "test": "if (typeof getLength !== 'function') return 'getLength funksiyasi topilmadi';\nif (getLength('hello') !== 5 || getLength([1, 2, 3]) !== 3) return 'Uzunlik noto\\'g\\'ri qaytarilmoqda';\nreturn null;"
  },
  {
    "id": 3,
    "title": "keyof cheklovi bilan obyekt xossasini olish",
    "instruction": "Obyekt va uning kalitini qabul qilib, obyekt ichidagi shu kalitga tegishli qiymatni qaytaruvchi `getProperty(obj, key)` funksiyasini yozing. Kalit faqat obyektda mavjud xossalardan biri bo'lishini ta'minlash uchun `keyof` operatoridan foydalaning.",
    "startingCode": "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return obj[key];",
    "test": "if (typeof getProperty !== 'function') return 'getProperty funksiyasi topilmadi';\nconst user = { name: 'Ali', age: 20 };\nif (getProperty(user, 'name') !== 'Ali' || getProperty(user, 'age') !== 20) return 'Obyekt xossasi noto\\'g\\'ri qaytarildi';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "TypeScript-da Generics nima uchun xizmat qiladi?",
    "options": [
      "Faqat CSS o'zgaruvchilarini boshqarish uchun",
      "Turlicha ma'lumotlar tiplagi bilan xavfsiz va qayta ishlatiladigan (reusable) kod yozish uchun",
      "Koddagi cheksiz sikllarni to'xtatish uchun",
      "Faqat ma'lumotlar bazasi so'rovlarini tiplash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Generics yordamida funksiya, klass yoki interfeys ishlatilish vaqtida qaysi tip bilan ishlashini parametr sifatida qabul qila oladi."
  },
  {
    "id": 2,
    "question": "Generic tiplashda odatiy holda birinchi tip parametri sifatida qaysi harf ishlatiladi?",
    "options": [
      "G",
      "T",
      "V",
      "K"
    ],
    "correctAnswer": 1,
    "explanation": "T harfi 'Type' (Tip) so'zining qisqartmasi bo'lib, generic kodlarda an'anaviy ravishda birinchi bo'lib qo'llaniladi."
  },
  {
    "id": 3,
    "question": "Generic parametrning qabul qilishi mumkin bo'lgan turlarini cheklash (Generic Constraint) uchun qaysi kalit so'z ishlatiladi?",
    "options": [
      "implements",
      "extends",
      "as",
      "is"
    ],
    "correctAnswer": 1,
    "explanation": "`extends` kalit so'zi generic parametr ma'lum interfeys yoki xossalarga ega bo'lishini shart qilib qo'yadi. Masalan: `T extends Lengthwise`."
  },
  {
    "id": 4,
    "question": "Quyidagilardan qaysi biri generic funksiya e'lon qilinishining to'g'ri sintaksisidir?",
    "options": [
      "function identity(arg: T) <T>",
      "function identity<T>(arg: T): T",
      "function <T> identity(arg: T)",
      "let identity = <T>(arg) as T"
    ],
    "correctAnswer": 1,
    "explanation": "Generic funksiyada tip parametri funksiya nomidan keyin burchak qavslarda `<T>` yoziladi va parametrlar hamda qaytish tipida ishlatiladi."
  },
  {
    "id": 5,
    "question": "keyof kalit so'zi generics bilan birga ishlatilganda qanday vazifani bajaradi?",
    "options": [
      "Faqat ob'ekt uzunligini qaytaradi",
      "Tip parametrini obyektning kalitlari (keys) birlashmasi bilan cheklaydi (Union type of object keys)",
      "Static a'zolarni tekshiradi",
      "Kodni xavfsiz transpayl qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "`keyof T` yozuvi T obyektining barcha kalitlari birlashmasini beradi. `K extends keyof T` esa K faqat T obyektida mavjud kalitlardan biri bo'lishini shart qiladi."
  },
  {
    "id": 6,
    "question": "Default Generic Parameters (standart generic tip parametrlari) nima uchun kerak?",
    "options": [
      "Faqat xatolar yuz berganda o'rnini bosish uchun",
      "Generic funksiya yoki klass chaqirilganda tip parametri uzatilmasa, sukut bo'yicha ishlatiladigan zaxira tipini belgilash uchun",
      "Klass static metodlarini tiplash uchun",
      "TypeScript build tezligini oshirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Agar klass yoki interfeys chaqirilganda tip ko'rsatilmasa, standart ko'rsatilgan tip (masalan: `class Box<T = string>`) ishlatiladi."
  },
  {
    "id": 7,
    "question": "Quyidagi e'londa T qanday aniqlanadi (Type Inference orqali)? `function log<T>(val: T) {}` va `log(45);` chaqiruvi.",
    "options": [
      "string",
      "number",
      "any",
      "unknown"
    ],
    "correctAnswer": 1,
    "explanation": "Uzatilgan argument `45` son (number) bo'lganligi sababli, TypeScript-ning Type Inference tizimi T tipini avtomatik ravishda `number` deb belgilaydi."
  },
  {
    "id": 8,
    "question": "Nima uchun klasslarning static maydonlari va metodlarida generic tiplarni ishlatib bo'lmaydi?",
    "options": [
      "Chunki static a'zolar xotirada saqlanmaydi",
      "Chunki static a'zolar klass instansiyasi (obyekti) yaratilmasdan ishlaydi va ular obyekt yaratishdagi generic tiplarni bilmaydi",
      "Chunki static faqat CSS-da ishlaydi",
      "Chunki static metodlar return qilmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Static a'zolar ob'ekt nusxalariga emas, balki klassning o'ziga tegishlidir. Generic tiplar esa har bir yangi obyekt yaratishda har xil aniqlanadi, shu sababli static a'zolarda generic ishlamaydi."
  },
  {
    "id": 9,
    "question": "Generics-ning any tipini ishlatishdan asosiy afzalligi nimada?",
    "options": [
      "Kod tezligini oshirishi",
      "Kirish va chiqish qiymatlari orasidagi tiplar bog'liqligini qat'iy saqlab, tiplar xavfsizligini ta'minlashi",
      "HTML kodlarini validatsiya qilishi",
      "Barcha xatolarni avtomatik tozalashi"
    ],
    "correctAnswer": 1,
    "explanation": "any tiplar tekshiruvini butunlay buzadi, Generics esa tiplar xavfsizligini 100% saqlab, moslashuvchan funksiyalar yaratishga imkon beradi."
  },
  {
    "id": 10,
    "question": "TypeScript-da generic interfeys qanday e'lon qilinadi?",
    "options": [
      "interface Box<T> { value: T; }",
      "interface Box(T) { value: T; }",
      "interface <T> Box { value: T; }",
      "interface Box { value: T; } as generic"
    ],
    "correctAnswer": 0,
    "explanation": "Generic interfeys nomi yoniga burchak qavsda `<T>` yoziladi, masalan: `interface Box<T> { value: T; }`."
  },
  {
    "id": 11,
    "question": "Obyekt kesishuvida (Intersection) generic tiplar qanday birlashtiriladi?",
    "options": [
      "function merge<T, U>(a: T, b: U): T & U",
      "function merge<T, U>(a: T, b: U): T | U",
      "function merge<T, U>(a: T, b: U): T + U",
      "function merge<T, U>(a: T, b: U): T && U"
    ],
    "correctAnswer": 0,
    "explanation": "T va U tiplarini birlashtirish va har ikkala tipdagi maydonlarga ega obyekt qaytarish uchun `T & U` (Intersection) yoziladi."
  },
  {
    "id": 12,
    "question": "TypeScript generics-dan transpayl qilingan JavaScript kodi qayerda generics parametrlarini saqlaydi?",
    "options": [
      "Klass prototipida",
      "Hech qayerda - JS-da generics yo'q, shuning uchun ular kompilyatsiyada butunlay o'chib ketadi",
      "Global o'zgaruvchilarda",
      "JSON formatida local-keshda"
    ],
    "correctAnswer": 1,
    "explanation": "TypeScript faqat compile-time uchun kerak. JS faylga o'girilganda barcha `<T>` kabi yozuvlar va generic cheklovlar to'liq o'chiriladi."
  }
]

};
