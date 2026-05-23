export const interfacesTypes = {
  id: "interfacesTypes",
  title: "Interfaces va Type Aliases",
  language: "typescript",
  theory: `## 1. NEGA kerak?
Hozirgi kunda TypeScript-da murakkab ma'lumotlar tuzilmalarini (obyektlar, funksiyalar) tavsiflash uchun asosan ikki xil usuldan foydalaniladi: **Interfaces** (Interfeyslar) va **Type Aliases** (Tip taxalluslari).
Katta dasturlarda obyektlarning qanday xususiyat va metodlarga ega bo'lishini oldindan belgilab qo'yish juda muhimdir. Bu kodda tartibni ta'minlaydi va noto'g'ri maydonlar yozilishini oldini oladi. Ikkala usul o'xshash vazifani bajarsa-da, ularning o'ziga xos farqlari va ishlatilish o'rinlari bor.

## 2. SODDALIK (Analogiya)
Obyekt tiplarini **qurilish loyihasiga (blueprint)** o'xshatish mumkin:
- **Interface** — bu uyni qurish uchun berilgan **rasmiy litsenziya va shartnoma**. Agar kelajakda shartnomaga yangi shart qo'shilsa (declaration merging), uy quruvchisi uni ham bajarishi shart. Shuningdek, bir shartnomani ikkinchisiga kengaytirish (extend) oson.
- **Type Alias** — bu sizning o'zingiz chizgan **shaxsiy uy xaritangiz**. Siz uni e'lon qilganingizdan keyin o'zgartira olmaysiz (yangi maydon qo'shib bo'lmaydi), lekin xaritangizni boshqa loyihalar bilan birlashtirib (intersection) yangi turdagi uylar dizaynini yaratishingiz mumkin.

## 3. STRUKTURA
Obyektni tavsiflash uchun sinrakslar:
\`\`\`typescript
// Interface
interface User {
  readonly id: number; // o'zgartirib bo'lmaydi
  name: string;
  age?: number; // ixtiyoriy (optional)
}

// Type Alias
type Point = {
  x: number;
  y: number;
};
\`\`\`

### Asosiy Farqlar:
1. **Declaration Merging:** Bir xil nomli ikkita interfeys e'lon qilinsa, mereka avtomatik birlashadi. Type Alias-da esa bir xil nomli tip yaratish xatoga olib keladi.
2. **Kengaytirish (Extends & Intersection):** Interfeyslar \`extends\` orqali, Tiplar esa \`&\` (intersection) operatori yordamida kengaytiriladi:
\`\`\`typescript
interface Employee extends User {
  salary: number;
}

type Developer = User & {
  skills: string[];
};
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Readonly xossani o'zgartirishga harakat qilish:** \`readonly\` kalit so'zi qo'yilgan maydonlarni faqat obyekt yaratish paytida sozlash mumkin, keyinchalik ularga yeni qiymat berish kompilyatsiya xatosini beradi.
2. **Ixtiyoriy (optional) maydonlarni tekshirmaslik:** \`age?: number\` deb e'lon qilingan maydondan foydalanishdan oldin uning mavjudligini tekshirish lozim, aks holda undefined ustida ishlash xatoga olib keladi.
3. **Union tiplarni Interface bilan yaratishga urinish:** Interfeyslar faqat obyekt shaklini tavsiflashi mumkin. Agar sizga \`type Status = "active" | "inactive"\` kabi union (birlashma) tip kerak bo'lsa, faqat Type Alias ishlatilishi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. Interface va Type Alias orasidagi eng katta farq nima?**
Interface-lar deklaratsiyalarni avtomatik birlashira oladi (Declaration Merging), Type Alias-lar esa birlashira olmaydi va union kabi sodda tiplarni ham saqlay oladi.

**2. Optional property (ixtiyoriy xossa) nima?**
Obyektda bo'lishi ixtiyoriy bo'lgan va so'roq belgisi (\`?\`) bilan belgilanadigan maydon (qiymati berilmasa, u \`undefined\` bo'ladi).

**3. Readonly property nima?**
Faqat o'qish uchun mo'ljallangan va faqat obyekt birinchi marta yaratilgan vaqtda qiymat qabul qiladigan maydon.

**4. Interfeysni qanday kengaytirish mumkin?**
\`extends\` kalit so'zi yordamida meros olish orqali. Masalan: \`interface B extends A {}\`.

**5. Intersection Types (Kesishuvchi tiplar) nima?**
Bir nechta tiplarni \`&\` operatori orqali birlashtirib, barcha tiplardagi maydonlarga ega yangi tip yaratish.

**6. Type Alias-da Declaration Merging nima uchun ishlamaydi?**
Chunki tip taxalluslari qat'iy va o'zgarmas deklaratsiyalardir, ularni keyinchalik qayta e'lon qilib kengaytirib bo'lmaydi.

**7. Index Signatures nima?**
Maydonlar nomlari oldindan noma'lum bo'lgan, lekin ularning tipi va kalit tipi ma'lum bo'lgan obyektlarni tavsiflash uchun ishlatiladi: \`{ [key: string]: number }\`.

**8. Union Types nima?**
O'zgaruvchi bir nechta tiplardan birini qabul qilishi mumkinligini bildiruvchi \`|\` (yoki) belgisi bilan yoziladigan tip.

**9. Discriminated Union nima?**
Union tarkibidagi har bir obyekt tipida umumiy yagona kalit maydoni (masalan, \`type: "car" | "bike"\`) orqali tipni oson farqlash usuli.

**10. Interfeysni klassda qanday qo'llash (implement) mumkin?**
\`implements\` kalit so'zi orqali. Klass interfeysdagi barcha maydon va metodlarni yaratishga majbur bo'ladi.

**11. Qachon Interface, qachon Type Alias ishlatgan ma'qul?**
Obyektlar va OOP arxitekturasi uchun ko'pincha \`interface\` tavsiya etiladi. Murakkab tiplar, union va kortejlar uchun esa \`type\` ishlatiladi.

**12. TypeScript-da tiplar runtime-da mavjud bo'ladimi?**
Yo'q, kompilyatsiya jarayonida barcha interfeyslar va tiplar o'chib ketadi, JavaScript faylda ulardan hech qanday asar qolmaydi.
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
    },
    {
      id: 4,
      title: "Intersection (Kesishuv) simulyatsiyasi",
      instruction: "Person (`{ name }`) va Employee (`{ company }`) obyektlarini birlashtirib bitta yangi obyekt qaytaruvchi `mergeObjects(person, employee)` funksiyasini yozing.",
      startingCode: "type Person = { name: string };\ntype Employee = { company: string };\ntype Staff = Person & Employee;\n\nfunction mergeObjects(person: Person, employee: Employee): Staff {\n  // Obyektlarni birlashtiring\n}",
      hint: "return { ...person, ...employee };",
      test: "if (typeof mergeObjects !== 'function') return 'mergeObjects topilmadi'; const res = mergeObjects({ name: 'Vali' }, { company: 'Google' }); if (res.name !== 'Vali' || res.company !== 'Google') return 'Intersection birlashmasi xato'; return null;"
    },
    {
      id: 5,
      title: "Interface kengaytirish (Extends)",
      instruction: "Animal interfeysi (`{ name }`) kengaytirilib, Dog (`{ name, breed }`) yaratilgan. Berilgan name va breed qiymatlari bilan ob'ekt qaytaradigan `createDog(name, breed)` yozing.",
      startingCode: "interface Animal {\n  name: string;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}\n\nfunction createDog(name: string, breed: string): Dog {\n  // Dog obyektini qaytaring\n}",
      hint: "return { name, breed };",
      test: "if (typeof createDog !== 'function') return 'createDog topilmadi'; const dog = createDog('Bobik', 'Poodle'); if(dog.name !== 'Bobik' || dog.breed !== 'Poodle') return 'Meros obyekt xato'; return null;"
    },
    {
      id: 6,
      title: "Index Signatures (Lug'at)",
      instruction: "Ixtiyoriy kalit va qiymatlarni (string) o'z ichiga oluvchi lug'at obyektini yaratuvchi va unga qiymat qo'shib beruvchi `addToDict(dict, key, val)` funksiyasini yozing.",
      startingCode: "interface Dictionary {\n  [key: string]: string;\n}\n\nfunction addToDict(dict: Dictionary, key: string, val: string): Dictionary {\n  // dict obyektiga key orqali val ni yozing va dict ni qaytaring\n}",
      hint: "dict[key] = val; return dict;",
      test: "if (typeof addToDict !== 'function') return 'addToDict topilmadi'; const d = addToDict({}, 'hello', 'salom'); if(d.hello !== 'salom') return 'Index signature lug\\'at xato'; return null;"
    },
    {
      id: 7,
      title: "Status Union tipi",
      instruction: "Faqat 'active' va 'inactive' qiymatlarini qabul qiladigan va ulardan boshqasiga `false` qaytaradigan `isValidStatus(status)` funksiyasini yozing.",
      startingCode: "type Status = 'active' | 'inactive';\n\nfunction isValidStatus(status: any): boolean {\n  // statusni tekshiring\n}",
      hint: "return status === 'active' || status === 'inactive';",
      test: "if (typeof isValidStatus !== 'function') return 'isValidStatus topilmadi'; if(isValidStatus('active') !== true || isValidStatus('pending') !== false) return 'Union qiymatlar noto\\'g\\'ri tekshirildi'; return null;"
    },
    {
      id: 8,
      title: "Discriminated Union simulyatsiyasi",
      instruction: "Obyektdagi `type` xossasiga qarab ('square' yoki 'circle') maydonni aniqlovchi va mos ravishda kvadrat yuzi (`size * size`) yoki doira yuzi (`Math.PI * r * r`) qaytaruvchi `getArea(shape)` funksiyasini yozing.",
      startingCode: "interface Square {\n  type: 'square';\n  size: number;\n}\n\ninterface Circle {\n  type: 'circle';\n  radius: number;\n}\n\ntype Shape = Square | Circle;\n\nfunction getArea(shape: Shape): number {\n  // type boyicha if yoki switch ishlating\n}",
      hint: "if (shape.type === 'square') return shape.size * shape.size; if (shape.type === 'circle') return Math.PI * shape.radius * shape.radius;",
      test: "if (typeof getArea !== 'function') return 'getArea topilmadi'; const s = { type: 'square', size: 4 }; const c = { type: 'circle', radius: 2 }; if (getArea(s) !== 16 || Math.abs(getArea(c) - 12.56) > 0.1) return 'Yuzani hisoblash xato'; return null;"
    },
    {
      id: 9,
      title: "3D nuqta tipini birlashtirish",
      instruction: "2D nuqtani (`{ x, y }`) z o'qi bilan birlashtirib, 3D nuqta obyektini hosil qiladigan `make3DPoint(point2D, z)` funksiyasini yozing.",
      startingCode: "interface Point2D {\n  x: number;\n  y: number;\n}\n\ninterface Point3D extends Point2D {\n  z: number;\n}\n\nfunction make3DPoint(point2D: Point2D, z: number): Point3D {\n  // point2D va z ni birlashtiring\n}",
      hint: "return { ...point2D, z };",
      test: "if (typeof make3DPoint !== 'function') return 'make3DPoint topilmadi'; const res = make3DPoint({ x: 1, y: 2 }, 3); if(res.x !== 1 || res.y !== 2 || res.z !== 3) return '3D nuqta xato yaratildi'; return null;"
    },
    {
      id: 10,
      title: "Custom User Identity",
      instruction: "Tarkibida `id` (number) va `meta` (ixtiyoriy obyekt) bo'lgan interfeysga mos obyekt yaratib qaytaradigan `createIdentity(id, meta = null)` yozing.",
      startingCode: "interface Identity {\n  id: number;\n  meta?: any;\n}\n\nfunction createIdentity(id: number, meta: any = null): Identity {\n  // Kodni yozing\n}",
      hint: "return { id, meta };",
      test: "if (typeof createIdentity !== 'function') return 'createIdentity topilmadi'; const id1 = createIdentity(5); if(id1.id !== 5 || id1.meta !== null) return 'Identity xato yaratildi'; return null;"
    },
    {
      id: 11,
      title: "Optional Callback Interface",
      instruction: "Foydalanuvchini ro'yxatdan o'tkazadigan va agar uchinchi parametrda `onSuccess` callback funksiyasi berilgan bo'lsa uni chaqiradigan `registerUser(name, pass, onSuccess)` yozing.",
      startingCode: "type SuccessCallback = () => void;\n\nfunction registerUser(name: string, pass: string, onSuccess?: SuccessCallback): void {\n  // Agar onSuccess bo'lsa uni chaqiring\n}",
      hint: "if (onSuccess) onSuccess();",
      test: "if (typeof registerUser !== 'function') return 'registerUser topilmadi'; let called = false; registerUser('admin', '123', () => { called = true; }); if(!called) return 'Callback chaqirilmadi'; return null;"
    },
    {
      id: 12,
      title: "Nested Interface (Ichma-ich)",
      instruction: "User `{ name, address: { city, zip } }` ko'rinishidagi ichma-ich interfeysga ega. Berilgan ma'lumotlar asosida ushbu obyektni yaratib qaytaradigan `createNestedUser(name, city, zip)` yozing.",
      startingCode: "interface Address {\n  city: string;\n  zip: number;\n}\n\ninterface UserWithAddress {\n  name: string;\n  address: Address;\n}\n\nfunction createNestedUser(name: string, city: string, zip: number): UserWithAddress {\n  // Ichma-ich obyekt qaytaring\n}",
      hint: "return { name, address: { city, zip } };",
      test: "if (typeof createNestedUser !== 'function') return 'createNestedUser topilmadi'; const u = createNestedUser('Ali', 'Toshkent', 100000); if(u.address.city !== 'Toshkent' || u.address.zip !== 100000) return 'Address tuzilmasi xato'; return null;"
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
      explanation: "`{ [key: string]: number }` ko'rinishidagi yozuv ixtiyoriy string kalitli maydonlar qiymati faqat son bo'lishi mumkinligini belgilaydi."
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
