export const typescriptBasics = {
  id: "typescriptBasics",
  title: "TypeScript Asoslari va Tiplar",
  theory: `## 1. NEGA kerak?
JavaScript dinamik tipli tildir. Bu shuni anglatadiki, o'zgaruvchi e'lon qilinganda uning tipi belgilanmaydi va dastur ishlash jarayonida (runtime) o'zgaruvchi ixtiyoriy tipdagi qiymatni qabul qilishi mumkin. Bu moslashuvchanlikni oshirsa-da, katta loyihalarda kutilmagan xatolar (runtime errors) keltirib chiqaradi.
**TypeScript** esa Microsoft tomonidan yaratilgan bo'lib, JavaScript ustiga qurilgan va unga **statik tiplash** (static typing) xususiyatini qo'shadi. TypeScript koddagi tiplarni dastur ishga tushishidan oldin (compile-time) tekshiradi. Bu orqali xatoliklarni kod yozish jarayonidayoq aniqlash va IDE imkoniyatlaridan (autocomplete, refactoring) maksimal foydalanish mumkin bo'ladi.

## 2. SODDALIK (Analogiya)
JavaScript-ni **vilkalar va rozetkalarsiz simlarga** o'xshatish mumkin: siz istalgan simni istalgan joyga ulashingiz mumkin, lekin noto'g'ri ulasangiz, qisqa tutashuv (runtime error) yuz beradi.
TypeScript esa **maxsus shaklli rozetka va vilkalarga** o'xshaydi: yumaloq vilkani faqat yumaloq rozetkaga ulay olasiz. Agar to'rtburchak vilkani ulamoqchi bo'lsangiz, tizim sizga elektr oqimi boshlanishidan oldinoq (kompilyatsiyada) xato haqida ogohlantiradi.

## 3. STRUKTURA
TypeScript-da asosiy tiplar quyidagicha e'lon qilinadi:
- **Oddiy tiplar:** \`number\`, \`string\`, \`boolean\`
- **Massivlar (Arrays):** \`number[]\` yoki \`Array<string>\`
- **Tuple (Kortej):** Elementlar soni va tiplari qat'iy belgilangan massiv. Masalan: \`[string, number]\`
- **Enum (Ro'yxat):** Nomlangan konstantalar to'plami.
- **Any va Unknown:** \`any\` tiplashni butunlay o'chirib qo'yadi, \`unknown\` esa xavfsizroq muqobil bo'lib, ishlatishdan oldin tipni aniqlashtirishni (type narrowing) talab qiladi.
- **Void va Never:** \`void\` funksiya qiymat qaytarmasligini, \`never\` esa funksiya hech qachon yakunlanmasligini (xato otishini yoki cheksiz siklni) anglatadi.

Tiplarni belgilash sinraksi:
\`\`\`typescript
let age: number = 25;
let username: string = "Ali";
let isDeveloper: boolean = true;

// Tuple
let coords: [number, number] = [41.2995, 69.2401];
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Hammasiga \`any\` ishlatish (Any-script):** TypeScript-ga endi o'tganlar tiplash xatolaridan qochish uchun barcha joyda \`any\` ishlatishadi. Bu statik tekshiruvning barcha afzalliklarini yo'qqa chiqaradi.
2. **unknown tipidagi o'zgaruvchini to'g'ridan-to'g'ri ishlatish:** \`unknown\` tipidagi qiymatni boshqa o'zgaruvchiga berishdan oldin uning tipini \`typeof\` orqali tekshirish yoki type assertion (\`as\`) qilish shart.
3. **Tuple va Array-ni chalkashtirish:** \`[string, number]\` kortejiga faqat ikkita element qo'shish mumkin, oddiy massiv esa ixtiyoriy uzunlikda bo'ladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. TypeScript nima?**
JavaScript-ga statik tiplash va qo'shimcha imkoniyatlarni qo'shadigan, kompilyatsiya qilinadigan dasturlash tili.

**2. Statik tiplash nima va u dinamik tiplashdan nimasi bilan farq qiladi?**
Statik tiplashda tiplar kod yozish/kompilyatsiya vaqtida tekshiriladi, dinamik tiplashda esa dastur ishlayotgan vaqtda (runtime) tekshiriladi.

**3. TypeScript kodini brauzer to'g'ridan-to'g'ri tushunadimi?**
Yo'q, brauzerlar faqat JavaScript-ni tushunadi. TypeScript kodi avval JavaScript-ga transpayl (kompilyatsiya) qilinishi kerak.

**4. "Type Inference" nima degani?**
TypeScript o'zgaruvchiga berilgan boshlang'ich qiymatga qarab, uning tipini avtomatik ravishda aniqlab olish xususiyati.

**5. any va unknown farqi nima?**
Ikkalasi ham har qanday qiymatni qabul qiladi, lekin \`any\` tipi bilan istalgan amalni bajarish mumkin, \`unknown\` esa tip aniqlanmaguncha u ustida amal bajarishga yo'l qo'ymaydi.

**6. Tuple nima?**
Elementlari soni va har bir indeksdagi elementlarining tipi oldindan qat'iy belgilangan massiv turi.

**7. Enum nima va u nima uchun ishlatiladi?**
Mantiqiy bog'langan konstantalar to'plamini (masalan, haftaning kunlari, foydalanuvchi rollari) bitta nom ostida guruhlash uchun.

**8. Void tipi qayerda ishlatiladi?**
Hech qanday qiymat qaytarmaydigan (faqat amal bajaradigan) funksiyalarning qaytish tipi sifatida.

**9. Never tipi nima va u void-dan qanday farq qiladi?**
\`void\` funksiya tugaydi lekin qiymat qaytarmaydi (undefined qaytadi), \`never\` esa funksiya umuman normal tugamasligini (dasturni to'xtatishini yoki xato otishini) bildiradi.

**10. TypeScript-da qanday qilib massivlarni e'lon qilish mumkin?**
\`type[]\` (masalan, \`string[]\`) yoki \`Array<type>\` (masalan, \`Array<string>\`) sinrakslari orqali.

**11. Type Assertion nima?**
Kompilyatorga o'zgaruvchining tipi haqida aniqroq ma'lumot berish uchun ishlatiladigan \`as\` kalit so'zi (cast qilish).

**12. TypeScript loyiha tezligiga ta'sir qiladimi?**
Kompilyatsiya vaqtini biroz ko'paytiradi, lekin tayyor bo'lgan JavaScript kodi oddiy JS bilan bir xil tezlikda ishlaydi (hech qanday runtime yuklama qo'shmaydi).
`,
  exercises: [
    {
      id: 1,
      title: "Number va String tiplari",
      instruction: "Faqat son qabul qiluvchi va uni string tipiga o'girib qaytaradigan `numberToString(val)` funksiyasini yozing.",
      startingCode: "function numberToString(val) {\n  // Kodni yozing\n}",
      hint: "return String(val);",
      test: "if (typeof numberToString !== 'function') return 'Funksiya aniqlanmagan'; if (numberToString(45) !== '45') return 'Natija xato'; return null;"
    },
    {
      id: 2,
      title: "Boolean tekshiruvi",
      instruction: "Berilgan qiymat boolean tipida ekanligini aniqlab true/false qaytaradigan `isBooleanVal(val)` funksiyasini yozing.",
      startingCode: "function isBooleanVal(val) {\n  // Kodni yozing\n}",
      hint: "return typeof val === 'boolean';",
      test: "if (typeof isBooleanVal !== 'function') return 'Funksiya topilmadi'; if(isBooleanVal(true) !== true || isBooleanVal(5) !== false) return 'Boolean qiymatlar xato tekshirildi'; return null;"
    },
    {
      id: 3,
      title: "Number massivi (Array of numbers)",
      instruction: "Berilgan sonlar massividagi elementlarni kvadratga oshirib yangi massiv qaytaradigan `squareArray(arr)` funksiyasini yozing.",
      startingCode: "function squareArray(arr) {\n  // Kodni yozing\n}",
      hint: "return arr.map(x => x * x);",
      test: "if (typeof squareArray !== 'function') return 'squareArray topilmadi'; const res = squareArray([2, 3]); if(res[0] !== 4 || res[1] !== 9) return 'Kvadratlar hisoblanmadi'; return null;"
    },
    {
      id: 4,
      title: "String massivi (Array<string>)",
      instruction: "String massivi elementlarini vergul bilan birlashtirib qaytaruvchi `joinStrings(arr)` funksiyasini yozing.",
      startingCode: "function joinStrings(arr) {\n  // Kodni yozing\n}",
      hint: "return arr.join(', ');",
      test: "if (typeof joinStrings !== 'function') return 'joinStrings topilmadi'; if(joinStrings(['a', 'b']) !== 'a, b') return 'Birlashtirish xato'; return null;"
    },
    {
      id: 5,
      title: "Tuple (Kortej) simulyatsiyasi",
      instruction: "Koordinatalar korteji [x, y] ko'rinishida berilgan massiv elementlarini o'zaro almashtirib [y, x] ko'rinishida qaytaruvchi `swapCoords(coords)` funksiyasini yozing.",
      startingCode: "function swapCoords(coords) {\n  // coords[0] va coords[1] almashtiring\n}",
      hint: "return [coords[1], coords[0]];",
      test: "if (typeof swapCoords !== 'function') return 'swapCoords topilmadi'; const res = swapCoords([10, 20]); if(res[0] !== 20 || res[1] !== 10) return 'Koordinatalar almashmadi'; return null;"
    },
    {
      id: 6,
      title: "Kortej: Name va Age",
      instruction: "Kortej sifatida [string, number] (ism va yosh) qabul qilib, 'Ism: [name], Yosh: [age]' ko'rinishidagi satr qaytaruvchi `formatPerson(person)` funksiyasini yozing.",
      startingCode: "function formatPerson(person) {\n  // Kodni yozing\n}",
      hint: "return `Ism: ${person[0]}, Yosh: ${person[1]}`;",
      test: "if (typeof formatPerson !== 'function') return 'formatPerson topilmadi'; if(formatPerson(['Ali', 20]) !== 'Ism: Ali, Yosh: 20') return 'Format xato'; return null;"
    },
    {
      id: 7,
      title: "Numeric Enum simulyatsiyasi",
      instruction: "Numeric Enum kabi ishlaydigan `Role` obyektini yarating. Unda `User = 0` va `Admin = 1` bo'lsin.",
      startingCode: "const Role = {\n  // Role obyektini to'ldiring\n}",
      hint: "const Role = { User: 0, Admin: 1 };",
      test: "if (typeof Role === 'undefined') return 'Role topilmadi'; if(Role.User !== 0 || Role.Admin !== 1) return 'Role qiymatlari noto\\'g\\'ri'; return null;"
    },
    {
      id: 8,
      title: "String Enum simulyatsiyasi",
      instruction: "String Enum kabi ishlaydigan `Status` obyektini yarating. Unda `Pending = 'PENDING'` va `Success = 'SUCCESS'` bo'lsin.",
      startingCode: "const Status = {\n  // Status obyektini to'ldiring\n}",
      hint: "const Status = { Pending: 'PENDING', Success: 'SUCCESS' };",
      test: "if (typeof Status === 'undefined') return 'Status topilmadi'; if(Status.Pending !== 'PENDING' || Status.Success !== 'SUCCESS') return 'Status qiymatlari xato'; return null;"
    },
    {
      id: 9,
      title: "Any tipi ustida amallar",
      instruction: "Kiruvchi istalgan qiymatni satr (string) ko'rinishiga o'girib, uning uzunligini qaytaruvchi `getAnyLength(val)` funksiyasini yozing.",
      startingCode: "function getAnyLength(val) {\n  // Kodni yozing\n}",
      hint: "return String(val).length;",
      test: "if (typeof getAnyLength !== 'function') return 'getAnyLength topilmadi'; if(getAnyLength(12345) !== 5) return 'Uzunlik xato'; return null;"
    },
    {
      id: 10,
      title: "Unknown va Type Narrowing",
      instruction: "Unknown qiymat qabul qilib, agar u `number` bo'lsa uni 2 ga ko'paytirib, agar `string` bo'lsa katta harflarga o'girib, boshqa hollarda null qaytaradigan `processUnknown(val)` funksiyasini yozing.",
      startingCode: "function processUnknown(val) {\n  // typeof tekshiruvini ishlating\n}",
      hint: "if (typeof val === 'number') return val * 2; if (typeof val === 'string') return val.toUpperCase(); return null;",
      test: "if (typeof processUnknown !== 'function') return 'processUnknown topilmadi'; if(processUnknown(5) !== 10 || processUnknown('ok') !== 'OK' || processUnknown(true) !== null) return 'Type narrowing xato ishladi'; return null;"
    },
    {
      id: 11,
      title: "Void funksiya simulyatsiyasi",
      instruction: "Qabul qilgan qiymatini global `globalState` o'zgaruvchisiga yozadigan va o'zi hech narsa qaytarmaydigan (void kabi undefined) `updateState(val)` funksiyasini yozing.",
      startingCode: "let globalState = '';\nfunction updateState(val) {\n  // globalState ni yangilang va return yozmang\n}",
      hint: "globalState = val;",
      test: "if (typeof updateState !== 'function') return 'updateState topilmadi'; updateState('active'); if(globalState !== 'active') return 'Global holat yangilanmadi'; return null;"
    },
    {
      id: 12,
      title: "Never funksiya simulyatsiyasi",
      instruction: "Hech qachon qiymat qaytarmaydigan va chaqirilganda doim 'Fatal Error' xabari bilan xato otadigan (throw Error) `throwFatal()` funksiyasini yozing.",
      startingCode: "function throwFatal() {\n  // Error otish logikasi\n}",
      hint: "throw new Error('Fatal Error');",
      test: "if (typeof throwFatal !== 'function') return 'throwFatal topilmadi'; try { throwFatal(); return 'Xato otilmadi'; } catch(e) { if(e.message !== 'Fatal Error') return 'Xato xabari noto\\'g\\'ri'; } return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-ning JavaScript-dan eng asosiy farqi nimada?",
      options: [
        "U tezroq ishga tushadi",
        "U kod yozish vaqtida statik tiplarni tekshiradi (Static Typing)",
        "U faqat ma'lumotlar bazasida ishlaydi",
        "Unga CSS yozib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "TypeScript-ning asosiy vazifasi JavaScript-ga statik tiplash tizimini qo'shib, xatolarni kompilyatsiya vaqtidayoq aniqlashdir."
    },
    {
      id: 2,
      question: "Foydalanuvchi kiritgan har qanday o'zgaruvchan qiymat uchun tiplash tekshiruvini butunlay o'chirishda qaysi tipdan foydalaniladi?",
      options: ["unknown", "any", "void", "never"],
      correctAnswer: 1,
      explanation: "any tipi TypeScript-ning tip tekshiruvchisini o'chirib qo'yadi va o'zgaruvchiga istalgan amalni bajarishga ruxsat beradi."
    },
    {
      id: 3,
      question: "unknown tipining any tipidan afzalligi nimada?",
      options: [
        "U kamroq xotira egallaydi",
        "U xavfsizroq, chunki tip tekshiruvisiz (type narrowing) qiymatdan foydalanishga yo'l qo'ymaydi",
        "Uni JavaScript umuman tanimaydi",
        "Uni faqat sonlar uchun ishlatib bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "unknown any kabi har qanday qiymatni qabul qiladi, lekin uni ishlatishdan oldin uning aniq tipini (masalan, typeof orqali) tekshirishni talab qiladi."
    },
    {
      id: 4,
      question: "Qaysi kalit so'z yordamida o'zgaruvchining tipini majburiy ravishda boshqa tipga o'tkazish mumkin (Type Assertion)?",
      options: ["is", "as", "typeof", "extends"],
      correctAnswer: 1,
      explanation: "TypeScript-da 'as' kalit so'zi yordamida ob'ekt tipini assert (type casting) qilish mumkin. Masalan: val as string."
    },
    {
      id: 5,
      question: "Elementlari soni va ularning tiplari qat'iy belgilangan massiv turi nima deb ataladi?",
      options: ["List", "Tuple (Kortej)", "Enum", "Record"],
      correctAnswer: 1,
      explanation: "Tuple (Kortej) ma'lum tartibdagi va cheklangan sondagi elementlardan iborat massiv tipidir. Masalan: [string, number]."
    },
    {
      id: 6,
      question: "Agar funksiya return orqali hech qanday qiymat qaytarmasa (lekin normal tugasa), uning qaytish tipi nima bo'ladi?",
      options: ["null", "undefined", "void", "never"],
      correctAnswer: 2,
      explanation: "Qiymat qaytarmaydigan funksiyalarning qaytish tipi TypeScript-da 'void' deb belgilanadi."
    },
    {
      id: 7,
      question: "Xato otadigan (throw) yoki cheksiz aylanadigan funksiyalarning qaytish tipi nima bo'ladi?",
      options: ["void", "null", "never", "any"],
      correctAnswer: 2,
      explanation: "never tipi funksiya hech qachon muvaffaqiyatli yakunlanmasligini va oxirigacha yetib bormasligini bildiradi."
    },
    {
      id: 8,
      question: "Enum (Ro'yxat) nima uchun xizmat qiladi?",
      options: [
        "Faqat massivlarni saralash uchun",
        "Mantiqan bir-biriga bog'liq konstantalar guruhini bitta nom ostida birlashtirish uchun",
        "Faqat CSS klasslarini yozish uchun",
        "Brauzer keshini tozalash uchun"
      ],
      correctAnswer: 1,
      explanation: "Enum mantiqan bog'langan konstantalarni (masalan, foydalanuvchi rollari: Admin, User) e'lon qilishda qulay vositadir."
    },
    {
      id: 9,
      question: "TypeScript-da string massivini qanday tiplash mumkin?",
      options: ["string[] yoki Array<string>", "stringArray", "[string]", "string{}"],
      correctAnswer: 0,
      explanation: "TypeScript-da massivlar string[] yoki generic Array<string> sinrakslari yordamida e'lon qilinadi."
    },
    {
      id: 10,
      question: "TypeScript kodi qachon tekshiriladi?",
      options: [
        "Dastur ishga tushganda (runtime)",
        "Kompilyatsiya / kod yozish jarayonida (compile-time)",
        "Faqat foydalanuvchi tugmani bosganda",
        "Faqat GitHub-ga yuklanganda"
      ],
      correctAnswer: 1,
      explanation: "TypeScript statik tiplash tizimi bo'lgani uchun, u koddagi tiplarni dastur ishlamasdan oldin (dastur yozish yoki build jarayonida) tekshiradi."
    },
    {
      id: 11,
      question: "TypeScript o'zgaruvchi e'lon qilinib, unga qiymat berilganda tipni avtomatik aniqlashi nima deyiladi?",
      options: ["Type Assertion", "Type Inference (Tip xulosasi)", "Type Cast", "Interface"],
      correctAnswer: 1,
      explanation: "Type Inference — TypeScript-ning berilgan boshlang'ich qiymatga qarab o'zgaruvchi tipini aniqlay olish xususiyatidir."
    },
    {
      id: 12,
      question: "TypeScript-da yozilgan tayyor kod brauzerda qaysi tilda ishlaydi?",
      options: ["TypeScript", "JavaScript", "C++", "HTML5"],
      correctAnswer: 1,
      explanation: "TypeScript kodi transpilyatsiya qilinib, oddiy JavaScript kodiga o'giriladi, chunki brauzerlar TypeScript-ni tushunmaydi."
    }
  ]
};
