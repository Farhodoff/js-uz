export const typeNarrowing = {
  id: "typeNarrowing",
  title: "Type Narrowing va Type Guards",
  language: "typescript",
  theory: `## 1. NEGA kerak?
TypeScript-da biror o'zgaruvchi bir nechta tipni qabul qila olganda (masalan, Union types: \`string | number\`), biz uning xossalaridan to'g'ridan-to'g'ri foydalana olmaymiz. Masalan, agar qiymat \`string | number\` bo'lsa, unga \`toUpperCase()\` yoki \`toFixed()\` metodlarini chaqirish xatolikka olib keladi. Sababi, TypeScript bu metod faqat ma'lum bir tipga tegishli ekanligini ko'radi va xavfsizlikni ta'minlash uchun kodni ishga tushirishga yo'l qo'ymaydi.

Bunday vaziyatlarda bizga **Type Narrowing** (Tipni toraytirish) yordam beradi. Bu JavaScript-dagi shartlar (if/else) va maxsus tekshiruvlar yordamida o'zgaruvchining aniq tipini shart bloki ichida toraytirish jarayonidir.

## 2. SODDALIK (Analogiya)
Buni aeroportdagi **xavfsizlik nazorati (security checkpoint)** bilan solishtirish mumkin:
Barcha yo'lovchilar va ularning yuklari bitta umumiy oqimda (union type) keladi. Lekin bojxona xodimlari yuklarni tekshirayotganda ularni turlariga ajratishadi:
- Agar yuk sumka bo'lsa (typeof check), uni rentgen apparatiga solishadi.
- Agar yo'lovchi xorijiy fuqaro bo'lsa (instanceof Passport check), pasport nazoratiga yuboriladi.
- Agar yukda taqiqlangan buyum borligi aniqlansa (in check), uni alohida tintuv qilishadi.

Ushbu tekshiruvlardan so'ng, har bir yo'lovchi o'z yo'nalishi bo'yicha ketadi va o'sha yerda unga mos bo'lgan maxsus amallar bajariladi.

## 3. STRUKTURA
TypeScript-da tiplarni toraytirishning bir nechta asosiy usullari (Type Guards) mavjud:

### A. \`typeof\` operatori
JavaScript-dagi standart \`typeof\` operatori yordamida primitiv tiplarni (\`string\`, \`number\`, \`boolean\`, \`symbol\`) tekshirish mumkin:
\`\`\`typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    // Bu blok ichida id avtomatik string deb hisoblanadi
    console.log(id.toUpperCase());
  } else {
    // Bu yerda esa faqat number bo'la oladi
    console.log(id.toFixed(2));
  }
}
\`\`\`

### B. \`instanceof\` operatori
Klaslar yoki obyektlar nusxasini (instances) tekshirish uchun ishlatiladi:
\`\`\`typescript
function logDateOrString(x: Date | string) {
  if (x instanceof Date) {
    // Bu yerda x aniq Date obyekti
    console.log(x.toUTCString());
  } else {
    // Bu yerda x string
    console.log(x.trim());
  }
}
\`\`\`

### C. \`in\` operatori
Obyekt tarkibida ma'lum bir kalit/xossa (property) bor-yo'qligini tekshirish orqali tipni toraytiradi:
\`\`\`typescript
interface Fish { swim: () => void }
interface Bird { fly: () => void }

function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    // pet tarkibida swim metodi bor, demak u Fish
    pet.swim();
  } else {
    pet.fly();
  }
}
\`\`\`

### D. Discriminated Unions (Tasniflangan birlashmalar)
Har bir interfeysga umumiy bo'lgan va literal qiymat qabul qiluvchi xossa (odatda \`kind\` yoki \`type\`) qo'shish orqali tiplarni ajratishning eng keng tarqalgan usuli:
\`\`\`typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
  }
}
\`\`\`

### E. User-Defined Type Guards (Custom Type Guards)
Ba'zan sodda tekshiruvlar yetarli bo'lmaydi. Bunday holda funksiya yozib, uning qaytish tipini \`parameter is Type\` ko'rinishida belgilaymiz:
\`\`\`typescript
interface Car { drive: () => void }
interface Bike { ride: () => void }

// Custom type guard funksiyasi
function isCar(vehicle: Car | Bike): vehicle is Car {
  return (vehicle as Car).drive !== undefined;
}

function useVehicle(v: Car | Bike) {
  if (isCar(v)) {
    v.drive(); // Endi drive() xavfsiz chaqiriladi
  } else {
    v.ride();
  }
}
\`\`\`

### F. Assertion Functions (Tasdiqlovchi funksiyalar)
Shart bajarilmaganda xatolik otadigan funksiyalar uchun \`asserts condition\` yoki \`asserts parameter is Type\` sintaksisi ishlatiladi. Bu asosan test yozishda yoki ma'lumotlar strukturasini tekshirishda qo'l keladi:
\`\`\`typescript
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Qiymat string emas!");
  }
}
\`\`\`

### G. Type Narrowing Oqimi (Mermaid)

Quyidagi oqim diagrammasi union tip (\`string | Date\`) qanday qilib tegishli type guard orqali toraytirilishini ko'rsatadi:

\`\`\`mermaid
flowchart TD
    Start[O'zgaruvchi: val string | Date] --> Check{val instanceof Date ?}
    Check -->|Ha| DateBlock[Date tipi deb qabul qilinadi]
    DateBlock --> UseDate[val.getFullYear() ishlatsa bo'ladi]
    Check -->|Yo'q| StrBlock[string tipi deb qabul qilinadi]
    StrBlock --> UseStr[val.toUpperCase() ishlatsa bo'ladi]
End
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Tipni aniqlamasdan to'g'ridan-to'g'ri ishlash:** Union tipdagi o'zgaruvchining metodini tekshiruvsiz chaqirish xatoga sabab bo'ladi.
2. **Custom type guard-da noto'g'ri logika yozish:** Agar custom guard ichida noto'g'ri boolean qiymat qaytsa, TypeScript baribir siz ko'rsatgan tipga ishonadi, bu esa runtime xatolarga olib kelishi mumkin.
3. **\`/typeof null === 'object'\` xatosi:** Agar obyekt \`null\` bo'lishi mumkin bo'lsa, shunchaki \`typeof obj === 'object'\` tekshiruvi yetarli emas, chunki \`null\` ham \`object\` qaytaradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Type Narrowing nima?**
Union tipli o'zgaruvchini ma'lum bir shartlar yordamida kichikroq va aniqroq tip doirasiga olib kelish jarayoni.

**2. Type Guard nima?**
Sinflarni yoki tiplarni runtime-da tekshiruvchi va natijasiga qarab compile-time da tipni toraytiruvchi ifoda yoki funksiya.

**3. typeof bilan qaysi turlarni tekshirish mumkin?**
Faqat primitiv JavaScript tiplarini (\`string\`, \`number\`, \`boolean\`, \`symbol\`, \`undefined\`, \`object\`, \`function\`).

**4. instanceof qanday ishlaydi?**
Obyektning prototip zanjirida berilgan klass mavjudligini runtime va compile-time da tekshiradi.

**5. in operatori qachon qo'llaniladi?**
Obyektda ma'lum bir kalit borligini va shu orqali obyekt tipini boshqalaridan farqlash kerak bo'lganda.

**6. Discriminated Union nima?**
Union tarkibidagi har bir tipda bir xil nomli, lekin har xil literal qiymatga ega bo'lgan identifikator maydon mavjud birlashma.

**7. Custom Type Guard nima qaytaradi?**
Qaytish tipi sifatida maxsus predikat (\`parameter is Type\`) yoziladi va u ichkarida boolean qiymat qaytaradi.

**8. asserts operatori nima uchun ishlatiladi?**
Shart to'g'ri bo'lmaganda xato otadigan funksiyani aniqlash va undan keyingi kodlarda tipni toraytirish uchun.

**9. dynamic API ma'lumotlariga qaysi guard ko'p mos keladi?**
Custom type guards yoki \`in\` operatori, chunki tashqi API tiplari ma'lum bo'lmasligi mumkin.

**10. Type narrowing faqat compile-time dami?**
Tekshiruv logikasi (typeof, instanceof, in) JavaScript runtime-da ham ishlaydi, lekin tipni tushunish va cheklovlar faqat TypeScript kompilyatsiya bosqichida bo'ladi.
`,
  exercises: [
    {
      id: 1,
      title: "Typeof Type Guard",
      instruction: "Kiruvchi `val` parametrini (`string | number`) tekshiring. Agar string bo'lsa uning uzunligini, number bo'lsa uning kvadratini qaytaruvchi `checkType(val)` funksiyasini yozing.",
      startingCode: "function checkType(val: string | number): number {\n  // Kodni yozing\n}",
      hint: "if (typeof val === 'string') return val.length; return val * val;",
      test: "if (typeof checkType !== 'function') return 'checkType topilmadi'; if(checkType('hello') !== 5 || checkType(4) !== 16) return 'Turlarni tekshirish xato'; return null;"
    },
    {
      id: 2,
      title: "Instanceof Type Guard",
      instruction: "O'zgaruvchi `val` (`Date | string`) qabul qilib, agar u Date obyekti bo'lsa uning yilini (`getFullYear()`), string bo'lsa uni Date obyekti sifatida pars qilib, keyin uning yilini qaytaradigan `getYear(val)` funksiyasini yozing.",
      startingCode: "function getYear(val: Date | string): number {\n  // instanceof dan foydalaning\n}",
      hint: "if (val instanceof Date) return val.getFullYear(); return new Date(val).getFullYear();",
      test: "if (typeof getYear !== 'function') return 'getYear topilmadi'; if(getYear(new Date(2025, 0, 1)) !== 2025 || getYear('2026-01-01') !== 2026) return 'Yilni aniqlash xato'; return null;"
    },
    {
      id: 3,
      title: "In Operator Guard",
      instruction: "Foydalanuvchi `user` (`Admin | Guest`) qabul qilib, unda `kickUser` xossasi borligini `in` operatori orqali tekshiring. Agar u Admin bo'lsa `kickUser()` natijasini, Guest bo'lsa `login()` natijasini qaytaruvchi `handleUser(user)` funksiyasini yozing.",
      startingCode: "interface Admin { role: string; kickUser: () => string; }\ninterface Guest { name: string; login: () => string; }\n\nfunction handleUser(user: Admin | Guest): string {\n  // in operatorini ishlating\n}",
      hint: "if ('kickUser' in user) return user.kickUser(); return user.login();",
      test: "if (typeof handleUser !== 'function') return 'handleUser topilmadi'; const admin = { role: 'admin', kickUser: () => 'Kicked' }; const guest = { name: 'Ali', login: () => 'Logged in' }; if (handleUser(admin) !== 'Kicked' || handleUser(guest) !== 'Logged in') return 'Foydalanuvchi roli noto\\'g\\'ri tekshirildi'; return null;"
    },
    {
      id: 4,
      title: "Discriminated Unions (Shape area)",
      instruction: "Circle va Square shakllari berilgan. Ularning yuzasini `kind` xossasi bo'yicha aniqlab hisoblaydigan `getArea(shape)` funksiyasini yozing. Doiraning yuzi PI * r^2, Kvadratning yuzi side * side.",
      startingCode: "interface Circle { kind: 'circle'; radius: number; }\ninterface Square { kind: 'square'; side: number; }\n\ntype Shape = Circle | Square;\n\nfunction getArea(shape: Shape): number {\n  // kind xossasi orqali switch yoki if ishlating\n}",
      hint: "if (shape.kind === 'circle') return Math.PI * shape.radius * shape.radius; return shape.side * shape.side;",
      test: "if (typeof getArea !== 'function') return 'getArea topilmadi'; const c = { kind: 'circle', radius: 3 }; const s = { kind: 'square', side: 4 }; if (Math.abs(getArea(c) - Math.PI * 9) > 0.001 || getArea(s) !== 16) return 'Yuza noto\\'g\\'ri hisoblandi'; return null;"
    },
    {
      id: 5,
      title: "Custom Type Guard",
      instruction: "Kiruvchi `val` (`unknown`) parametr satr (string) ekanligini tekshiradigan custom type guard funksiyasi `isString(val)` ni yozing. Uning qaytish turi `val is string` bo'lishi shart.",
      startingCode: "function isString(val: unknown): val is string {\n  // typeof dan foydalaning\n}",
      hint: "return typeof val === 'string';",
      test: "if (typeof isString !== 'function') return 'isString topilmadi'; if (isString('hello') !== true || isString(123) !== false) return 'Type guard noto\\'g\\'ri ishladi'; return null;"
    },
    {
      id: 6,
      title: "Assertion Functions",
      instruction: "Kiruvchi `val` (`unknown`) qiymat son (number) ekanligini tasdiqlovchi va agar son bo'lmasa 'Not a number' xabari bilan xatolik otadigan `assertIsNumber(val)` funksiyasini yozing. Qaytish tipi `asserts val is number` bo'lishi shart.",
      startingCode: "function assertIsNumber(val: unknown): asserts val is number {\n  // Kodni yozing\n}",
      hint: "if (typeof val !== 'number') throw new Error('Not a number');",
      test: "if (typeof assertIsNumber !== 'function') return 'assertIsNumber topilmadi'; try { assertIsNumber(10); } catch(e) { return 'Son uchun xatolik otildi'; } try { assertIsNumber('hello'); return 'Xatolik otilmadi'; } catch(e) { if(e.message !== 'Not a number') return 'Xato xabari xato'; } return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-da 'Type Narrowing' deganda nima tushuniladi?",
      options: [
        "O'zgaruvchi xotira hajmini kamaytirish",
        "Union tipdagi o'zgaruvchini ma'lum tekshiruvlar yordamida aniqroq tipga toraytirish",
        "Koddagi barcha o'zgaruvchilarni number-ga o'tkazish",
        "TypeScript-ni JavaScript-ga transpayl qilish"
      ],
      correctAnswer: 1,
      explanation: "Type Narrowing union tipli o'zgaruvchilar ustida xavfsiz amal bajarish uchun uning tipini shartlar doirasida aniqlashtirishdir."
    },
    {
      id: 2,
      question: "Primitiv turlarni (string, number va boshqalar) tekshirishda qaysi type guard mos keladi?",
      options: ["instanceof", "in", "typeof", "as"],
      correctAnswer: 2,
      explanation: "typeof operatori JavaScript primitiv tiplarini tekshirish va uni TypeScript darajasida toraytirish uchun ishlatiladi."
    },
    {
      id: 3,
      question: "Klass nusxalari (instances) yoki obyektlarni tekshirish uchun qaysi operator ishlatiladi?",
      options: ["typeof", "instanceof", "in", "is"],
      correctAnswer: 1,
      explanation: "instanceof klass yoki obyekt zanjiri orqali aniq klass nusxasi ekanligini tekshirish uchun ishlatiladi."
    },
    {
      id: 4,
      question: "Obyekt tarkibida aniq bir maydon/xossa mavjudligini tekshirishda qaysi type guard qo'llaniladi?",
      options: ["typeof", "instanceof", "in", "is"],
      correctAnswer: 2,
      explanation: "'property in object' sintaksisi orqali obyektda kerakli xossa borligi aniqlanadi va tip toraytiriladi."
    },
    {
      id: 5,
      question: "Discriminated Union tipida har bir interfeysda qanday umumiy maydon bo'lishi kerak?",
      options: [
        "Faqat id maydoni",
        "Umumiy nomli, lekin har xil literal qiymatga ega bo'lgan identifikator (masalan: kind)",
        "Barcha maydonlar turi bir xil bo'lishi shart",
        "Hech qanday umumiy xossa kerak emas"
      ],
      correctAnswer: 1,
      explanation: "Discriminated union-lar har bir obyektdagi umumiy literal tipdagi xossa (kind yoki type) qiymatini solishtirish orqali farqlanadi."
    },
    {
      id: 6,
      question: "Custom Type Guard yaratishda funksiyaning qaytarish turi sintaksisi qanday bo'ladi?",
      options: [
        "boolean",
        "parameter is Type",
        "Type | null",
        "asserts parameter is Type"
      ],
      correctAnswer: 1,
      explanation: "Custom Type Guard-da funksiya `parameter is Type` ko'rinishida tip predikatini qaytaradi va u ichkarida true bo'lganda shu tip qabul qilinadi."
    },
    {
      id: 7,
      question: "Assertion Functions haqidagi qaysi tasdiq to'g'ri?",
      options: [
        "Ular hech qachon xatolik otmaydi",
        "Ular asserts parameter is Type sintaksisidan foydalanib, shart bajarilmasa xato otadi va undan keyingi kodlarda tipni kafolatlaydi",
        "Ular faqat CSS stillarini tekshiradi",
        "Ular oddiy JavaScript-ga transpayl qilinmaydi"
      ],
      correctAnswer: 1,
      explanation: "Assertion functions (`asserts val is number`) o'zgaruvchi talab qilingan tipda bo'lmasa xato otadi va funksiya chaqirilgandan keyingi kodda shu o'zgaruvchi o'sha tipda ekanligini kafolatlaydi."
    },
    {
      id: 8,
      question: "Quyidagi tekshiruvning natijasi nima bo'ladi?\n`typeof null === 'object'`",
      options: [
        "Bu xato, u 'null' qaytaradi",
        "Bu to'g'ri, JavaScript-da null obyektdir, shuning uchun faqat typeof object tekshiruvi null uchun ham ishlaydi",
        "Bu true qaytarsa-da, TypeScript-da uni tip guard deb bo'lmaydi",
        "U runtime error beradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da `typeof null === 'object'` har doim true qaytarganligi sababli, faqat typeof 'object' qilish orqali null qiymatni xavfsiz filtrlash yetarli emas."
    }
  ]
};
