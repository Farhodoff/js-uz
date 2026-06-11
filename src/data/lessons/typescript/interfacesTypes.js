export const interfacesTypes = {
  id: "interfacesTypes",
  title: "Interfaces va Type Aliases",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Nega kerak?
TypeScript-da murakkab ma'lumotlar tuzilmalarini (obyektlar, funksiyalar) tavsiflash uchun asosan ikki xil usuldan foydalaniladi: **Interfaces** (Interfeyslar) va **Type Aliases** (Tip taxalluslari).
Katta va murakkab dasturlarda obyektlarning qanday xususiyat va metodlarga ega bo'lishini oldindan belgilab qo'yish juda muhimdir. Bu kodda tartibni ta'minlaydi va noto'g'ri maydonlar yozilishini oldini oladi. Ikkala usul o'xshash vazifani bajarsa-da, ularning o'ziga xos farqlari va ishlatilish o'rinlari bor.

### Real hayotiy analogiya
Obyekt tiplarini **qurilish loyihasiga (blueprint)** o'xshatish mumkin:
- **Interface** — bu uyni qurish uchun berilgan **rasmiy litsenziya va shartnoma**. Agar kelajakda shartnomaga yangi shart qo'shilsa (declaration merging), uy quruvchisi uni ham bajarishi shart. Shuningdek, bir shartnomani ikkinchisiga kengaytirish (extend) oson.
- **Type Alias** — bu sizning o'zingiz chizgan **shaxsiy uy xaritangiz**. Siz uni e'lon qilganingizdan keyin o'zgartira olmaysiz (yangi maydon qo'shib bo'lmaydi), lekin xaritangizni boshqa loyihalar bilan birlashtirib (intersection) yangi turdagi uylar dizaynini yaratishingiz mumkin.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda Sintaksis)
\`\`\`typescript
// Interface yordamida foydalanuvchini tavsiflash
interface User {
  readonly id: number; // faqat o'qish uchun, o'zgartirib bo'lmaydi
  name: string;
  age?: number; // ixtiyoriy (optional) maydon
}

// Type Alias yordamida nuqtani tavsiflash
type Point = {
  x: number;
  y: number;
};
\`\`\`

### 2. Intermediate Example (Index Signatures va Extends/Intersection)
Dinamik kalitlar bilan ishlash va kengaytirish:
\`\`\`typescript
// Dinamik kalitli obyektlar uchun Index Signature
interface UserScores {
  [username: string]: number; // kalitlar string, qiymatlar esa number bo'lishi shart
}

const scores: UserScores = {
  ali: 95,
  vali: 88
};

// Interface kengaytirilishi (extends)
interface Employee extends User {
  salary: number;
}

// Type Alias birlashishi (intersection)
type Developer = User & {
  skills: string[];
};
\`\`\`

### 3. Advanced Example (Discriminated Unions va Exhaustiveness Check)
TypeScript-da obyekt tiplarini ishonchli ajratish uchun ularga umumiy literal qiymatli maydon (tag/discriminator) beriladi va \`never\` yordamida to'liqlik tekshiriladi:
\`\`\`typescript
interface Success {
  type: "success";
  data: string;
}

interface Failure {
  type: "failure";
  error: string;
}

type ResponseResult = Success | Failure;

function handleResponse(res: ResponseResult) {
  switch (res.type) {
    case "success":
      return res.data;
    case "failure":
      return res.error;
    default:
      // Yangi tip qo'shilsa va tekshirilmasa, bu yerda kompilyatsiya xatosi bo'ladi
      const _exhaustiveCheck: never = res;
      return _exhaustiveCheck;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Structural vs Nominal Typing
TypeScript **Structural Typing** (tuzilmaviy tiplash) tizimidan foydalanadi. Bu shuni anglatadiki, ikki xil nomdagi interfeys yoki tiplar bir xil tarkibga (xossalarga) ega bo'lsa, TypeScript ularni mos keladigan tiplar deb hisoblaydi. Nominal tiplash tizimida (masalan, Java yoki C# kabi) esa tiplar nomi bo'yicha solishtiriladi.

### Type Erasure (Tiplarning o'chirilishi)
Barcha TypeScript interfeyslari va tiplari faqatgina ishlab chiqish (development) va kompilyatsiya jarayonida mavjud bo'ladi. JavaScript kodiga transpayl qilinganda (transpilation), barcha \`interface\` va \`type\` e'lonlari butunlay o'chib ketadi (type erasure). Tayyor JS faylda ulardan hech qanday asar qolmaydi, bu esa runtime-da ortiqcha xotira va yuklama bo'lmasligini ta'minlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Readonly xossani o'zgartirishga harakat qilish
\`readonly\` kalit so'zi qo'yilgan maydonlarni faqat obyekt yaratish paytida sozlash mumkin:
\`\`\`typescript
interface Config {
  readonly apiKey: string;
}
const config: Config = { apiKey: "12345" };
// config.apiKey = "67890"; // XATO! Readonly maydonni o'zgartirib bo'lmaydi.
\`\`\`

### 2. Ixtiyoriy (optional) maydonlarni tekshirmaslik
\`age?: number\` deb e'lon qilingan maydondan foydalanishdan oldin uning mavjudligini tekshirish lozim, aks holda undefined ustida ishlash xatoga olib keladi:
\`\`\`typescript
function printAge(user: User) {
  // console.log(user.age.toFixed()); // XATO! user.age undefined bo'lishi mumkin.
  if (user.age !== undefined) {
    console.log(user.age.toFixed()); // To'g'ri
  }
}
\`\`\`

### 3. Union tiplarni Interface bilan yaratishga urinish
Interfeyslar faqat obyekt shaklini tavsiflashi mumkin. Agar union (birlashma) yoki kortej (tuple) kerak bo'lsa, faqat Type Alias ishlatilishi shart:
\`\`\`typescript
// interface Status = "active" | "inactive"; // XATO!
type Status = "active" | "inactive"; // To'g'ri
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Interface va Type Alias orasidagi eng fundamental farq nima?
   - **Javob:** Interface-lar deklaratsiyalarni avtomatik birlashtira oladi (Declaration Merging), Type Alias-lar esa birlashtira olmaydi va union kabi sodda tiplarni ham saqlay oladi.
2. **Savol:** Optional property (ixtiyoriy xossa) nima va u qanday belgilanadi?
   - **Javob:** Obyektda bo'lishi majburiy bo'lmagan va so'roq belgisi (\`?\`) bilan belgilanadigan maydon. Agar qiymati berilmasa, u \`undefined\` bo'ladi.
3. **Savol:** Readonly property nima?
   - **Javob:** Faqat o'qish uchun mo'ljallangan va faqat obyekt birinchi marta yaratilgan vaqtda qiymat qabul qiladigan maydon.
4. **Savol:** Interfeysni qanday kengaytirish mumkin?
   - **Javob:** \`extends\` kalit so'zi yordamida meros olish orqali. Masalan: \`interface B extends A {}\`.

### Middle
5. **Savol:** Intersection Types (Kesishuvchi tiplar) nima va u qaysi operator yordamida yaratiladi?
   - **Javob:** Bir nechta tiplarni \`&\` operatori orqali birlashtirib, barcha tiplardagi maydonlarga ega yangi tip yaratish.
6. **Savol:** Type Alias-da Declaration Merging nima uchun ishlamaydi?
   - **Javob:** Chunki tip taxalluslari qat'iy va o'zgarmas deklaratsiyalardir, ularni keyinchalik qayta e'lon qilib kengaytirib bo'lmaydi.
7. **Savol:** Index Signatures nima va u qachon ishlatiladi?
   - **Javob:** Maydonlar nomlari oldindan noma'lum bo'lgan, lekin ularning tipi va kalit tipi ma'lum bo'lgan obyektlarni tavsiflash uchun ishlatiladi: \`{ [key: string]: number }\`.
8. **Savol:** Union Types (Birlashma tiplari) nima?
   - **Javob:** O'zgaruvchi bir nechta tiplardan birini qabul qilishi mumkinligini bildiruvchi \`|\` (yoki) belgisi bilan yoziladigan tip.

### Senior
9. **Savol:** Discriminated Union nima va u qanday vazifani bajaradi?
   - **Javob:** Union tarkibidagi har bir obyekt tipida umumiy yagona kalit maydoni (masalan, \`type: "car" | "bike"\`) orqali tipni oson va xavfsiz farqlash usuli.
10. **Savol:** Interfeysni klassda qanday qo'llash (implement) mumkin?
    - **Javob:** \`implements\` kalit so'zi orqali. Klass interfeysdagi barcha maydon va metodlarni yaratishga majbur bo'ladi.
11. **Savol:** Nega TypeScript-da tiplar runtime-da mavjud bo'lmaydi?
    - **Javob:** Chunki kompilyatsiya jarayonida barcha interfeyslar va tiplar o'chib ketadi (Type Erasure), JavaScript faylda ulardan asar qolmaydi.
12. **Savol:** Extends va Intersection o'rtasida ishlash samaradorligi (performance) jihatidan qanday farq bor?
    - **Javob:** Interfeyslar \`extends\` orqali kengaytirilganda TypeScript ularni nomi bo'yicha keshlaydi va ziddiyatlarni tezroq aniqlaydi. Tiplarning kesishuvi (\`&\`) esa har safar tekshirilganda maydonlarni qayta hisoblab chiqadi va sekinroq bo'lishi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida Interfaces va Type Aliases o'rtasidagi deklaratsiyalarni birlashtirish hamda kengaytirish imkoniyatlarining vizual taqqoslanishi (Mermaid) ko'rsatilgan:

### Declaration Merging (Faqat Interface-larda)
\`\`\`mermaid
graph TD
    subgraph Interfaces (Birlashish)
        I1["interface User { name: string }"] -->|Declaration Merging| I2["interface User { age: number }"]
        I2 -->|Natija| IResult["User: { name: string, age: number } <br/> (Avtomatik birlashdi)"]
    end

    subgraph Type Aliases (Taqiqlangan)
        T1["type User = { name: string }"] -.->|Declaration Merging| T2["type User = { age: number }"]
        T2 -.->|Natija| TError["Compile-time Error:<br/>Duplicate identifier 'User'"]
    end
\`\`\`

### Extends va Intersection Farqlari
\`\`\`mermaid
graph TD
    subgraph Interface Extends (Kengaytirish)
        IExt1["interface Animal { name: string }"] -->|extends| IExt2["interface Dog { breed: string }"]
        IExt2 -->|Natija| IExtResult["Dog: { name: string, breed: string }"]
    end

    subgraph Type Intersection (Kesishuv)
        TInt1["type Animal = { name: string }"] -->|Intersection &| TInt2["type Dog = Animal & { breed: string }"]
        TInt2 -->|Natija| TIntResult["Dog: { name: string, breed: string }"]
    end
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'zlashtirgan bilimlaringizni sinash uchun maxsus 12 ta ko'p variantli testlarni bajaring.

---

## 8. 🎯 Real Project Case Study

### API Response Standardizatsiyasi
Real loyihalarda turli xil API natijalarini standartlashtirish uchun Discriminated Union-dan juda keng foydalaniladi:

\`\`\`typescript
interface ApiResponseSuccess<T> {
  status: "success";
  data: T;
  timestamp: number;
}

interface ApiResponseError {
  status: "error";
  error: {
    code: number;
    message: string;
  };
  timestamp: number;
}

type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

function handleApiResponse<T>(response: ApiResponse<T>) {
  if (response.status === "success") {
    // response.data faqat shu blok ichida xavfsiz ishlatiladi
    console.log("Ma'lumot keldi:", response.data);
  } else {
    // response.error faqat shu blok ichida mavjud
    console.error(\`Xato yuz berdi (\${response.error.code}): \${response.error.message}\`);
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

- **Interface cache-lash:** TypeScript kompilyatori interfeyslarni (nomlari orqali) xotirada keshlaydi, bu esa kompilyatsiya tezligini oshiradi.
- **Intersection og'irligi:** Bir nechta type kesishuvini (\`&\`) yaratish, kompilyatorga har bir obyekt xossalarini tekshirish va tekshiruv zanjirini tuzish uchun og'irlik qiladi, shuning uchun katta loyihalarda ko'proq \`interface\` ishlatish tavsiya etiladi.
- **Declaration Merging ziddiyatlari:** Bir xil nomli interfeyslarda bir xil kalitli xossalar e'lon qilinsa, ularning tiplari mutlaqo bir xil bo'lishi shart, aks holda kompilyatsiya xatosi yuz beradi.

---

## 10. 📌 Cheat Sheet

| Xususiyat | Interface (\`interface\`) | Type Alias (\`type\`) |
| :--- | :--- | :--- |
| **Declaration Merging** | Ha (avtomatik birlashadi) | Yo'q (xatolik beradi) |
| **Kengaytirish usuli** | \`extends\` kalit so'zi bilan | \`&\` (intersection) operatori bilan |
| **Union / Primitiv tiplar** | Yo'q (faqat obyekt va klasslar) | Ha (istalgan tipni saqlay oladi) |
| **Class implements** | Ha | Ha (agar obyekt yoki kesishuv bo'lsa) |
| **Kompilyatsiya tezligi** | Tezroq (nomlari bo'yicha keshlanadi) | Sekinroq (dynamic hisoblanadi) |
`,
  exercises: [
    {
      id: 1,
      title: "Interface simulyatsiyasi",
      instruction: "Name va Age xossalariga ega bo'lgan foydalanuvchi obyektini yaratadigan `createUser(name, age)` funksiyasini yozing.",
      startingCode: "interface User {\n  name: string;\n  age: number;\n}\n\nfunction createUser(name: string, age: number): User {\n  // Obyekt qaytaring\n}",
      hint: "return { name, age };",
      test: "if (typeof createUser !== 'function') return 'createUser topilmadi'; const user = createUser('Ali', 25); if(user.name !== 'Ali' || user.age !== 25) return 'Obyekt xossalari xato'; return null;"
    },
    {
      id: 2,
      title: "Optional Property",
      instruction: "Book obyekti uchun `title` majburiy va `pages` ixtiyoriy (agar berilmasa `undefined`) bo'lsin. Obyektni yaratuvchi `createBook(title, pages)` funksiyasini yozing.",
      startingCode: "interface Book {\n  title: string;\n  pages?: number;\n}\n\nfunction createBook(title: string, pages?: number): Book {\n  // pages undefined bo'lishi ham mumkin\n}",
      hint: "return { title, pages };",
      test: "if (typeof createBook !== 'function') return 'createBook topilmadi'; const b1 = createBook('JS'); if(b1.title !== 'JS' || b1.pages !== undefined) return 'Optional property ishlamadi'; return null;"
    },
    {
      id: 3,
      title: "Readonly maydoni",
      instruction: "Faqat o'qish uchun mo'ljallangan `id` maydoni va oddiy `value` maydoni bor obyektni qaytaruvchi `createReadonlyItem(id, value)` funksiyasini yozing.",
      startingCode: "interface ReadonlyItem {\n  readonly id: number;\n  value: string;\n}\n\nfunction createReadonlyItem(id: number, value: string): ReadonlyItem {\n  // Obyekt qaytaring\n}",
      hint: "return { id, value };",
      test: "if (typeof createReadonlyItem !== 'function') return 'createReadonlyItem topilmadi'; const item = createReadonlyItem(1, 'Notebook'); if(item.id !== 1 || item.value !== 'Notebook') return 'Obyekt to\\'g\\'ri yaratilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Interface va Type Alias o'rtasidagi eng fundamental farqlardan biri nima?",
      options: [
        "Interface-da funksiyalar yozib bo'lmaydi",
        "Interface deklaratsiyalari avtomatik birlasha oladi (Declaration Merging)",
        "Type Alias faqat class ichida ishlaydi",
        "Interface har doim sekinroq ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar bir xil nomda ikkita interface e'lon qilinsa, ular bitta interfeysga birlashadi. Type Alias-da esa bir xil nomli tip qayta e'lon qilinsa, xatolik yuz beradi."
    },
    {
      id: 2,
      question: "Quyidagilardan qaysi biri Type Alias yordamida e'lon qilinishi mumkin, lekin Interface-da ilojisi yo'q?",
      options: ["Obyekt tiplari", "Meros olish (Inheritance)", "Sodda tiplar birlashmasi (Union Types - masalan: 'active' | 'inactive')", "Metodlar"],
      correctAnswer: 2,
      explanation: "Union (birlashma) va oddiy primitiv tiplar taxalluslarini faqat `type` kalit so'zi bilan yaratish mumkin. Interfeyslar faqat obyektlar shaklini belgilash uchun ishlatiladi."
    },
    {
      id: 3,
      question: "Obyektdagi ma'lum bir maydonni ixtiyoriy (optional) qilish uchun qaysi belgidan foydalaniladi?",
      options: ["*", "!", "?", "&"],
      correctAnswer: 2,
      explanation: "Maydon nomidan keyin so'roq belgisi `?` qo'yilishi uning ixtiyoriy ekanligini, qiymat berilmaganda `undefined` bo'lishini bildiradi."
    },
    {
      id: 4,
      question: "Obyekt yaratilgandan keyin uning ma'lum bir xossasini o'zgartirib bo'lmaydigan qilish uchun qaysi kalit so'z qo'yiladi?",
      options: ["const", "readonly", "static", "private"],
      correctAnswer: 1,
      explanation: "Interface yoki Type ichida xossa nomidan oldin yoziladigan `readonly` kalit so'zi ushbu maydonni o'zgartirishni taqiqlaydi."
    },
    {
      id: 5,
      question: "Ikkita interfeysni birlashtirish (meros olish) uchun qaysi kalit so'z ishlatiladi?",
      options: ["implements", "extends", "inherits", "merge"],
      correctAnswer: 1,
      explanation: "Interfeyslarni kengaytirish va boshqa interfeys xossalarini o'ziga qo'shish uchun `extends` kalit so'zidan foydalaniladi."
    },
    {
      id: 6,
      question: "Ikkita Type Alias-ni birlashtirib (kesishuv), yangi tip hosil qilishda qaysi operator qo'llaniladi (Intersection)?",
      options: ["|", "&", "+", "&&"],
      correctAnswer: 1,
      explanation: "`&` (ampersand) operatori tiplarning kesishuvini (Intersection) bildiradi, bu yangi tip har ikkala tipdagi barcha xossalarni o'z ichiga olishini ta'minlaydi."
    },
    {
      id: 7,
      question: "Nomlari oldindan noma'lum bo'lgan maydonlarga ega obyektlar qanday tiplanadi (Index Signature)?",
      options: [
        "readonly id: number",
        "{ [key: string]: number }",
        "Array<string>",
        "any[]"
      ],
      correctAnswer: 1,
      explanation: "`{ [key: string]: number }` ko'rinishidagi yozuv ixtiyoriy string kalitli maydonlar qiymati faqat son bo'lika olishini belgilaydi."
    },
    {
      id: 8,
      question: "Quyidagi e'lon nima deb ataladi?\n`type Status = 'open' | 'closed';`",
      options: ["Intersection Type", "Union Type", "Tuple Type", "Interface"],
      correctAnswer: 1,
      explanation: "Bir nechta variantlardan birini ifodalaydigan tip `Union Type` (Birlashma tipi) deb ataladi."
    },
    {
      id: 9,
      question: "Discriminated Union (Farqlanuvchi birlashma) yaratish uchun obyektlarda nima bo'lishi shart?",
      options: [
        "Faqat raqamli maydonlar",
        "Obyektlar tiplarini farqlash uchun ishlatiladigan yagona umumiy konstant maydon (literal type)",
        "extends kalit so'zi",
        "Faqat funksiyalar"
      ],
      correctAnswer: 1,
      explanation: "Discriminated union-da har bir obyekt tipida bir xil nomli, lekin har xil literal qiymatga ega maydon (masalan: `kind: 'circle'` va `kind: 'square'`) bo'ladi."
    },
    {
      id: 10,
      question: "Klasslar qaysi kalit so'z orqali interfeyslarni o'zlashtiradi va undagi shartlarni bajarishga majbur bo'ladi?",
      options: ["extends", "implements", "instanceof", "typeof"],
      correctAnswer: 1,
      explanation: "Klass interfeysdagi talab qilingan xossa va metodlarni to'liq realizatsiya qilishi uchun `implements` kalit so'zi yoziladi."
    },
    {
      id: 11,
      question: "Bir xil nomli interfeyslar avtomatik birlashishi qanday ataladi?",
      options: ["Declaration Merging", "Type Assertion", "Interface Extension", "Intersection"],
      correctAnswer: 0,
      explanation: "Bu xususiyat 'Declaration Merging' (Deklaratsiyalar birlashishi) deb ataladi va u faqat interfeyslar uchun amal qiladi."
    },
    {
      id: 12,
      question: "Quyidagi tip e'lon qilingandan keyin u brauzerda JavaScript kodida qanday ko'rinishda bo'ladi?\n`type Point = { x: number; y: number };`",
      options: [
        "const Point = { x: 0, y: 0 };",
        "U butunlay o'chib ketadi va JS kodida hech narsa qolmaydi",
        "var Point = 'Point';",
        "class Point {}"
      ],
      correctAnswer: 1,
      explanation: "TypeScript tiplari va interfeyslari faqat kompilyatsiya paytidagi tekshiruvlar uchun kerak. JavaScript-ga transpayl bo'lganda ular butunlay olib tashlanadi."
    }
  ]
};
