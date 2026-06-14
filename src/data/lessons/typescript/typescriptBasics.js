export const typescriptBasics = {
  id: "typescriptBasics",
  title: "TypeScript Asoslari va Tiplar",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### JavaScript va TypeScript farqi
* **JavaScript (Dinamik tiplash):** O'zgaruvchining tipi oldindan belgilanmaydi va runtime-da (ishlash jarayonida) o'zgarishi mumkin. Bu xuddi vilkalar va rozetkalarsiz yalang'och simlarga o'xshaydi: istalgan simni istalgan joyga ulashingiz mumkin, lekin noto'g'ri ulasangiz, portlash (runtime error) sodir bo'ladi.
* **TypeScript (Statik tiplash):** Kod yozish va build qilish vaqtidayoq har bir o'zgaruvchi va funksiyaning tipi tekshiriladi. U xuddi har xil shakldagi rozetka va vilkalarga o'xshaydi: to'rtburchak vilkani faqat to'rtburchak rozetkaga ulay olasiz. Agar xato shaklli simni ulamoqchi bo'lsangiz, tizim sizga tokni ulashdan oldinoq (kompilyatsiyada) xato beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Primitive Types va Type Inference)
TypeScript o'zgaruvchining tipini u biriktirilayotgan qiymatidan kelib chiqib avtomatik ravishda ham aniqlay oladi (Type Inference):
\\\`\\\`\\\`typescript
// Type Annotation (Tipni aniq belgilash)
let age: number = 25;
let userName: string = "Doston";
let isStudent: boolean = true;

// Type Inference (TS avtomatik ravishda 'number' deb xulosa qiladi)
let score = 95; 
// score = "yuz"; // XATO! string tipi number-ga berilmaydi.
\\\`\\\`\\\`

### 2. Intermediate Example (Tuple va Enum)
Kortej (Tuple) elementlari soni va tiplari qat'iy belgilangan massivdir. Enum esa mantiqiy konstantalar guruhidir:
\\\`\\\`\\\`typescript
// Tuple (Kortej)
let location: [number, number] = [41.2995, 69.2401]; // [kenglik, uzunlik]

// Enum (Ro'yxat)
enum UserRole {
  User = "USER",
  Admin = "ADMIN",
  Guest = "GUEST"
}

let currentRole: UserRole = UserRole.Admin;
\\\`\\\`\\\`

### 3. Advanced Example (Unknown vs Any va Type Narrowing)
\\\`any\\\` barcha tip tekshiruvlarini o'chiradi. \\\`unknown\\\` esa qiymatni saqlaydi, lekin uni ishlatishdan oldin uning tipini aniqlashtirishni talab qiladi:
\\\`\\\`\\\`typescript
function printLength(value: unknown) {
  // value.length; // XATO! unknown tipida 'length' bormi-yo'qmi TS bilmaydi.
  
  if (typeof value === "string") {
    // Type Narrowing: bu blok ichida 'value' aniq string ekanligi isbotlandi
    console.log("Satr uzunligi:", value.length); 
  } else if (Array.isArray(value)) {
    console.log("Massiv uzunligi:", value.length);
  } else {
    console.log("Uzunlik aniqlanmadi.");
  }
}
\\\`\\\`\\\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Kompilyatsiya va Transpilyatsiya
TypeScript kodi brauzer yoki Node.js tomonidan bevosita bajarila olmaydi. Buning uchun:
1. **TS Compiler (tsc):** Kodni tahlil qiladi va tiplarni tekshiradi. Agar koddagi tiplarda biror mos kelmaslik bo'lsa, xato xabarini chiqaradi.
2. **Type Erasure:** Kompilyator tiplarning to'g'riligini tasdiqlagach, barcha tiplarga tegishli belgilarni (masalan, \\\`: number\\\`, \\\`interface\\\`, \\\`type\\\`) koddandan butunlay o'chirib tashlaydi.
3. **JS Generation:** Natijada toza JavaScript kodi hosil bo'ladi va bu kod runtimeda odatdagidek ishlaydi.

> [!IMPORTANT]
> TypeScript faqat **kod yozish va kompilyatsiya** vaqtida xavfsizlikni ta'minlaydi. Runtime-da (dastur ishlash jarayonida) faqat JavaScript ishlaydi va u yerda hech qanday tip tekshiruvi mavjud bo'lmaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. "Any-Script" yozish
Junior dasturchilar tiplardagi xatoliklarni yechish uchun ko'p joyga \\\`any\\\` yozishadi. Bu statik tiplashning barcha foydasini yo'qqa chiqaradi va JS-ga qaytish bilan barobardir.
* **Yechim:** \\\`any\\\` o'rniga \\\`unknown\\\` ishlating va tipni toraytiring (narrowing).

### 2. Type Assertion (\\\`as\\\`) ni runtime-da ishlaydi deb o'ylash
\\\`as\\\` yordamida tipni majburlash kompilyatorni aldaydi, lekin runtime-da haqiqiy qiymat boshqacha bo'lsa, baribir xatolik kelib chiqadi.
* **Noto'g'ri:**
  \\\`\\\`\\\`typescript
  let val: any = 123;
  let str = val as string; // bu runtimeda sonligicha qolaveradi!
  console.log(str.toUpperCase()); // RUNTIME ERROR: toUpperCase is not a function
  \\\`\\\`\\\`

### 3. Void va Never-ni adashtirish
* \\\`void\\\` — funksiya normal tugaydi, lekin hech qanday qiymat qaytarmaydi (ichki xizmatda \\\`undefined\\\` qaytadi).
* \\\`never\\\` — funksiya hech qachon normal yakunlanmaydi (masalan, cheksiz sikl yoki throw error).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** TypeScript nima va u JavaScript-dan qanday farq qiladi?
   * **Javob:** TypeScript JavaScript-ning ustiga qurilgan bo'lib, unga statik tiplash tizimini qo'shadi. Kod yozish jarayonida xatolarni aniqlashga yordam beradi.
2. **Savol:** Type Inference (Tip xulosasi) nima?
   * **Javob:** Dasturchi tipni yozmagan bo'lsa ham, TypeScript-ning o'zgaruvchiga berilgan qiymatdan kelib chiqib uning tipini avtomatik aniqlab olish xususiyatidir.
3. **Savol:** any va unknown tiplari farqi nima?
   * **Javob:** Ikkalasi ham har qanday qiymatni qabul qiladi. Farqi shundaki, \\\`any\\\` bilan istalgan amalni bajarish mumkin (tip tekshiruvi yo'q), \\\`unknown\\\` esa tip aniqlashtirilmaguncha (narrowing bo'lmaguncha) u ustida amal bajarishga yo'l qo'ymaydi.
4. **Savol:** Kortej (Tuple) nima?
   * **Javob:** Elementlari soni va ularning tartibi bo'yicha tiplari qat'iy belgilangan massiv. Masalan: \\\`[string, number]\\\`.

### Middle
5. **Savol:** void va never farqi nimada?
   * **Javob:** \\\`void\\\` funksiya normal tugaydi va qiymat qaytarmaydi. \\\`never\\\` esa funksiya hech qachon normal oxiriga yetib bormasligini bildiradi (xato otadi yoki cheksiz sikl).
6. **Savol:** Type Alias (\\\`type\\\`) va \\\`interface\\\` farqi nima?
   * **Javob:** \\\`interface\\\` faqat obyektlar/klasslarni tavsiflaydi va declaration merging (avtomatik birlashish) ni qo'llaydi. \\\`type\\\` esa istalgan tipga (primitivlar, union va h.k.) taxallusi sifatida ishlatiladi va avtomatik birlashmaydi.
7. **Savol:** Type Assertion (\\\`as\\\`) runtimeda ishlaydimi?
   * **Javob:** Yo'q. Type assertion faqat kompilyatsiya vaqtida ishlaydi (kompilyatorga 'bunga tegma, men tipni aniq bilaman' deydi). Kompilyatsiyadan keyin u yo'qoladi.
8. **Savol:** \\\`const enum\\\` ning oddiy \\\`enum\\\` dan farqi nima?
   * **Javob:** Oddiy \\\`enum\\\` runtime-da JS obyekti sifatida saqlanib qoladi. \\\`const enum\\\` esa kompilyatsiyadan so'ng butunlay o'chiriladi va uning qiymatlari kod ichiga joylashtiriladi (inlined).

### Senior
9. **Savol:** TypeScript structural typing (strukturaviy tiplash) modeliga qanday asoslanadi?
   * **Javob:** U nominal emas, balki struktura bo'yicha tekshiriladi (Duck typing). Agar obyekt talab etilgan barcha xossalarga mos tuzilishga ega bo'lsa, u mos tip hisoblanadi (nomi muhim emas).
10. **Savol:** TypeScript-da Top Type va Bottom Type deganda nimalar tushuniladi?
    * **Javob:** Top Type (barcha boshqa tiplarni qabul qila oladigan) — \\\`any\\\` va \\\`unknown\\\`. Bottom Type (hech qanday tip qabul qilolmaydigan, hatto void-ni ham) — \\\`never\\\`.
11. **Savol:** "Type Narrowing" nima va uni qanday usullar bilan amalga oshirish mumkin?
    * **Javob:** \\\`typeof\\\`, \\\`instanceof\\\`, \\\`in\\\` operatorlari, shuningdek Custom Type Guards (foydalanuvchi tekshiruv funksiyalari) orqali tipni kichikroq, aniqroq tipga toraytirish.
12. **Savol:** Nima uchun TypeScript runtimeda koddagi xavfsizlikni to'liq kafolatlay olmaydi?
    * **Javob:** Chunki runtimeda faqat transpilyatsiya qilingan JavaScript ishlaydi. Agar tashqi API kutilmagan yoki noto'g'ri shakldagi ma'lumot qaytarsa, JS uni qabul qilib xatolik berishi mumkin (buni oldini olish uchun runtimeda alohida validatorlar kerak).

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida TypeScript tiplar ierarxiyasi tasvirlangan. Bu ierarxiya qaysi tip boshqasining usti (supertype) yoki osti (subtype) ekanligini ko'rsatadi:

\\\`\\\`\\\`mermaid
graph TD
    unknown[unknown / any] --> Object[Object / custom types]
    unknown --> primitives[Primitives: string, number, boolean, symbol, null, undefined]
    unknown --> void[void]
    primitives --> Literals[Literal Types: 'red', 42, true]
    Object --> never[never]
    Literals --> never
    void --> never
\\\`\\\`\\\`

Dars oxiridagi amaliy mashqlarni bajarib, olgan bilimlaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Darsdagi nazariy tushunchalarni mustahkamlash uchun mo'ljallangan mini testlar to'plami.

---

## 8. 🎯 Real Project Case Study

### API-dan kelgan ma'lumotni xavfsiz validation qilish va tiplash (API Guard)
Haqiqiy loyihalarda API-dan kelgan ma'lumotlar tipi biz kutgandek bo'lmasligi mumkin. Quyida ma'lumotni \\\`unknown\\\` orqali qabul qilib, uni xavfsiz tahlil qiluvchi va ma'lumot turini kafolatlovchi (Type Guard) tizim keltirilgan:

\\\`\\\`\\\`typescript
interface UserData {
  id: number;
  name: string;
  role: "admin" | "user";
}

// UserData ekanligini runtimeda va compile-time da tekshiruvchi funksiya
function isUserData(obj: any): obj is UserData {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    (obj.role === "admin" || obj.role === "user")
  );
}

// API so'rovi natijasini qayta ishlash
function handleApiResponse(rawResponse: unknown) {
  if (isUserData(rawResponse)) {
    // Bu blok ichida rawResponse tipi avtomatik ravishda UserData bo'ladi
    console.log(\\\`Tizimga kirildi: \\\${rawResponse.name} (Roli: \\\${rawResponse.role})\\\`);
  } else {
    console.error("API qaytargan ma'lumot formati noto'g'ri!");
  }
}

// To'g'ri ma'lumot bilan chaqirish
handleApiResponse({ id: 1, name: "Sardor", role: "admin" });

// Noto'g'ri ma'lumot bilan chaqirish
handleApiResponse({ id: "1", name: "Guest" }); // Konsolga xato chiqadi
\\\`\\\`\\\`

---

## 9. 🚀 Performance va Optimization

* **\\\`const enum\\\` ishlating:** Oddiy \\\`enum\\\`lar JavaScript obyektlarini yaratadi, bu esa ortiqcha kod hajmini oshiradi. \\\`const enum\\\` esa inlining yordamida qiymatlarni joy-joyiga qo'yadi.
* **\\\`strict: true\\\` yoqing:** Loyihani boshlashdanoq \\\`tsconfig.json\\\` faylida \\\`strict\\\` rejimini yoqish kutilmagan \\\`null\\\`/\\\`undefined\\\` xatolaridan 99% qutqaradi.
* **\\\`any\\\` tiplarini minimallashtiring:** \\\`any\\\` tipi ko'p ishlatilganda, kompilyator tiplarni tekshirishni rad etadi va uning tahlil qilish tezligi sekinlashishi mumkin.

---

## 10. 📌 Cheat Sheet

| Tip (Type) | Tavsif | Misol |
| :--- | :--- | :--- |
| **Primitivlar** | Oddiy ma'lumotlar turlari | \\\`let x: number = 5;\\\` \\\`let s: string = "ok";\\\` |
| **Tuple (Kortej)** | Hajmi va tiplar tartibi qat'iy massiv | \\\`let coords: [number, number] = [12, 34];\\\` |
| **unknown** | Xavfsiz top tip (ishlatishdan oldin tekshirish shart) | \\\`let data: unknown; if (typeof data === "string") ...\\\` |
| **any** | Tip tekshiruvini butunlay o'chirish (tavsiya etilmaydi) | \\\`let raw: any = getRawData();\\\` |
| **void** | Qiymat qaytarmaydigan funksiyalar uchun | \\\`function log(): void { console.log("hi"); }\\\` |
| **never** | Hech qachon yakunlanmaydigan funksiyalar yoki imkonsiz holatlar | \\\`function fail(): never { throw new Error(); }\\\` |
| **Literal type** | Faqat aniq yozilgan qiymatni qabul qilish | \\\`let mode: "dark" | "light";\\\` |`,
  exercises: [
    {
      id: 1,
      title: "Primitiv tiplar va Funksiya tiplanishi",
      instruction: "Foydalanuvchining ismi (`string`) va yoshi (`number`) qiymatlarini qabul qilib, ularni formatlangan satr ko'rinishida (`Ism: {name}, Yosh: {age}`) qaytaradigan `formatUserInfo(name, age)` funksiyasini yozing. Funksiya parametrlari va qaytish tipi aniq belgilangan bo'lishi kerak.",
      startingCode: "function formatUserInfo(name: string, age: number): string {\n  // Kodni yozing\n}",
      hint: "return `Ism: ${name}, Yosh: ${age}`;",
      test: "if (typeof formatUserInfo !== 'function') return 'formatUserInfo funksiyasi topilmadi'; if (formatUserInfo('Ali', 25) !== 'Ism: Ali, Yosh: 25') return 'Natija noto\\'g\\'ri'; if (!code.includes(': string') || !code.includes(': number')) return 'Iltimos, parametrlarning tiplarini (string va number) to\\'g\\'ri belgilang'; return null;"
    },
    {
      id: 2,
      title: "Unknown va Type Narrowing",
      instruction: "Bizga `unknown` tipida qiymat qabul qiladigan va uning tipi `string` bo'lsa satr uzunligini, agar `number` bo'lsa, uning kvadratini (sonning o'ziga ko'paytirilganini) qaytaradigan, boshqa barcha hollarda esa `-1` qaytaradigan `processInput(input)` funksiyasini yozing. Type narrowing (typeof) ishlating.",
      startingCode: "function processInput(input: unknown): number {\n  // Kodni yozing\n}",
      hint: "if (typeof input === 'string') return input.length; if (typeof input === 'number') return input * input; return -1;",
      test: "if (typeof processInput !== 'function') return 'processInput funksiyasi topilmadi'; if (processInput('hello') !== 5) return 'String uchun uzunlik noto\\'g\\'ri hisoblandi'; if (processInput(6) !== 36) return 'Number uchun kvadrat noto\\'g\\'ri hisoblandi'; if (processInput(true) !== -1) return 'Boshqa tiplar uchun -1 qaytarilishi kerak'; if (!code.includes(': unknown')) return 'Parametr tipi unknown deb belgilanishi shart'; return null;"
    },
    {
      id: 3,
      title: "Tuple (Kortej) bilan ishlash",
      instruction: "Sizga koordinatalarni [x, y] ko'rinishida saqlovchi kortej (`[number, number]`) beriladi. Koordinatalarning o'rtacha qiymatini (ya'ni `(x + y) / 2`) qaytaradigan `getAverageCoord(coords)` funksiyasini yozing. Kortej tipini to'g'ri belgilang.",
      startingCode: "function getAverageCoord(coords: [number, number]): number {\n  // Kodni yozing\n}",
      hint: "return (coords[0] + coords[1]) / 2;",
      test: "if (typeof getAverageCoord !== 'function') return 'getAverageCoord funksiyasi topilmadi'; if (getAverageCoord([10, 20]) !== 15) return 'Natija noto\\'g\\'ri'; if (getAverageCoord([5, 5]) !== 5) return 'Natija noto\\'g\\'ri'; if (!code.includes('[number, number]')) return 'coords parametri [number, number] (Tuple) tipida bo\\'lishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-ning JavaScript-dan asosiy farqi nimada?",
      options: [
        "U tezroq ishga tushadi va kamroq xotira egallaydi",
        "U statik tiplash tizimiga ega va xatolarni kompilyatsiya vaqtidayoq aniqlaydi",
        "U faqat backend-da (Node.js) ishlaydi va brauzer uni to'g'ridan-to'g'ri tushunadi",
        "U HTML va CSS-ni almashtira oladigan yangi dasturlash tilidir"
      ],
      correctAnswer: 1,
      explanation: "TypeScript JavaScript-ga statik tiplash tizimini qo'shib, xatolarni kod yozish va kompilyatsiya vaqtida aniqlash imkonini beradi."
    },
    {
      id: 2,
      question: "TypeScript-da tip tekshiruvini butunlay o'chirib qo'yadigan va ixtiyoriy qiymat qabul qiladigan tip qaysi?",
      options: [
        "unknown",
        "any",
        "never",
        "void"
      ],
      correctAnswer: 1,
      explanation: "any tipi TypeScript-ning tip tekshiruvini to'liq o'chiradi, bu esa xavfsizlikni yo'qotadi."
    },
    {
      id: 3,
      question: "unknown tipining any tipidan asosiy afzalligi nimada?",
      options: [
        "unknown faqat sonlarni qabul qila oladi",
        "unknown xavfsizroq bo'lib, uning ustida amal bajarishdan oldin tipni tekshirishni (Type Narrowing) talab qiladi",
        "unknown xotiradan kamroq joy oladi",
        "unknown faqat sinxron funksiyalarda ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "unknown tipidagi o'zgaruvchi bilan biror amal bajarishdan oldin typeof yoki type assertion yordamida uning aniq tipini aniqlashtirish talab qilinadi."
    },
    {
      id: 4,
      question: "Elementlar soni va tiplari tartib bo'yicha qat'iy belgilangan massiv turi nima deyiladi?",
      options: [
        "Array",
        "Tuple (Kortej)",
        "Enum (Ro'yxat)",
        "Literal"
      ],
      correctAnswer: 1,
      explanation: "Elementlar soni va har bir indeksdagi elementlarining tipi qat'iy belgilangan massiv turi Tuple (kortej) deyiladi."
    },
    {
      id: 5,
      question: "Hech qanday qiymat qaytarmaydigan (faqat amal bajarib tugaydigan) funksiyaning qaytish tipi qanday belgilanadi?",
      options: [
        "undefined",
        "null",
        "void",
        "never"
      ],
      correctAnswer: 2,
      explanation: "Qiymat qaytarmaydigan funksiyalarning qaytish tipi void hisoblanadi."
    },
    {
      id: 6,
      question: "Doimiy ravishda xato otadigan (throw) yoki cheksiz siklda aylanadigan (hech qachon tugamaydigan) funksiyaning qaytish tipi nima?",
      options: [
        "void",
        "never",
        "unknown",
        "any"
      ],
      correctAnswer: 1,
      explanation: "never tipi funksiya normal yakunlanmasligini (dasturni to'xtatishini yoki xato otishini) bildiradi."
    },
    {
      id: 7,
      question: "Dasturchi o'zgaruvchi tipini kompilyatorga qaraganda yaxshiroq bilishini bildirish uchun ishlatiladigan vosita nima deb ataladi?",
      options: [
        "Type Inference",
        "Type Assertion (as)",
        "Interface",
        "Type Guard"
      ],
      correctAnswer: 1,
      explanation: "Type Assertion (as operatori) kompilyatorga o'zgaruvchining tipini majburiy ravishda ma'lum bir tip sifatida qabul qilishni aytadi."
    },
    {
      id: 8,
      question: "TypeScript-dagi Type Inference nima?",
      options: [
        "Dasturchi tomonidan tipni majburan o'zgartirish",
        "Dastur ishga tushganda tipni aniqlash",
        "Boshlang'ich berilgan qiymatga qarab TypeScript tomonidan tipning avtomatik aniqlanishi",
        "Obyektning faqat prototipini tekshirish"
      ],
      correctAnswer: 2,
      explanation: "Type Inference — bu TypeScript kompilyatori o'zgaruvchining boshlang'ich qiymatidan uning tipini avtomatik xulosa qilib olishidir."
    },
    {
      id: 9,
      question: "TypeScript-da yaratilgan tayyor kod brauzerda qanday ishlaydi?",
      options: [
        "TypeScript brauzerda maxsus plagin yordamida to'g'ridan-to'g'ri ishlaydi",
        "TS kodi JavaScript-ga transpayl (kompilyatsiya) qilinadi, chunki brauzerlar faqat JS-ni tushunadi",
        "Kompilyator kodni WebAssembly-ga o'giradi",
        "TS kodi Node.js tomonidan virtual sahifada ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "Brauzerlar TypeScript-ni bevosita tushunmaydi, shuning uchun TS kodi avval standart JavaScript-ga kompilyatsiya qilinadi."
    },
    {
      id: 10,
      question: "Type Aliases (type) va Interfaces (interface) o'rtasidagi asosiy farqlardan biri nima?",
      options: [
        "Type tezroq ishlaydi, interface esa sekinroq",
        "Interface-larni bir xil nomda qayta e'lon qilib avtomatik birlashtirish (declaration merging) mumkin, type-da esa buni qilib bo'lmaydi",
        "Type faqat obyektlar uchun ishlatiladi, interface esa primitivlar uchun ham ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "Interfeyslar avtomatik birlashish xususiyatiga ega (declaration merging), ya'ni bir xil nomdagi interfeyslar kengayadi. Type esa bunday xususiyatga ega emas, lekin u union tiplarni yaratishga imkon beradi."
    },
    {
      id: 11,
      question: "const enum ning oddiy enum dan farqi nimada?",
      options: [
        "const enum ko'proq xotira egallaydi",
        "const enum kompilyatsiyadan so'ng runtime-da JavaScript obyekti hosil qilmaydi, qiymatlar to'g'ridan-to'g'ri joyiga yoziladi (inlined)",
        "const enum faqat string qiymatlar qabul qiladi",
        "const enum-dan tashqi fayllarda foydalanib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "const enum kompilyatsiya paytida butunlay o'chiriladi va uning qiymatlari kodga inlining qilinadi (direkt yoziladi), bu esa xotirani va tezlikni tejaydi."
    },
    {
      id: 12,
      question: "TypeScript-ning tiplash tizimi qaysi modelga asoslangan?",
      options: [
        "Nominal typing (tiplar nomi va klassi bo'yicha solishtiriladi)",
        "Structural typing (tiplarning faqat ichki tuzilishi/xossalari bo'yicha solishtiriladi - Duck typing)",
        "Strict typing (faqat son va satrlar tekshiriladi)",
        "Runtime typing (tiplar faqat dastur ishlaganda tekshiriladi)"
      ],
      correctAnswer: 1,
      explanation: "TypeScript-da tiplash strukturaviy (structural typing) yondashuvga asoslangan: agar obyektning strukturasi kerakli xossalar va tiplarga mos kelsa, u shu tipga tegishli deb hisoblanadi."
    }
  ]
};
