export const utilityTypes = {
  id: "utilityTypes",
  title: "TypeScript Utility Types (Yordamchi Tiplar)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Utility Types nima?
TypeScript-da mavjud bo'lgan tiplarni qayta yozmasdan, ularni dynamic tarzda o'zgartirish va any-ga tushmasdan yangi tiplar yaratish uchun **Utility Types (Yordamchi tiplar)** ishlatiladi.
Ular xuddi mebel transformatoriga o'xshaydi: sizda bitta asosiy divan bor va siz uni yig'ib to'shakka yoki stolga aylantirishingiz mumkin. Xuddi shunday, yordamchi tiplar yordamida mavjud \\\`interface\\\` yoki \\\`type\\\` ning ba'zi xossalarini ixtiyoriy (optional) qilish, o'chirish yoki faqat o'qish (read-only) rejimiga o'tkazish mumkin.

---

## 2. 💻 Real Kod Misollari

### 1. Partial va Required
* **\\\`Partial<T>\\\`** — Tipdagi barcha xossalarni ixtiyoriy (optional, \\\`?\\\`) qiladi.
* **\\\`Required<T>\\\`** — Tipdagi barcha ixtiyoriy xossalarni majburiy (required) qiladi.
\\\`\\\`\\\`typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

// Barcha xossalar optional bo'ladi (masalan, PATCH update uchun)
type UpdateUser = Partial<User>; 
// { id?: number; name?: string; email?: string; }

// Barcha xossalar majburiy bo'ladi
type StrictUser = Required<User>;
// { id: number; name: string; email: string; }
\\\`\\\`\\\`

### 2. Pick va Omit
* **\\\`Pick<T, K>\\\`** — Berilgan tipdan faqat ko'rsatilgan xossalarni tanlab oladi.
* **\\\`Omit<T, K>\\\`** — Berilgan tipdan ko'rsatilgan xossalarni tashlab ketib, qolganini oladi.
\\\`\\\`\\\`typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Faqat nom va narx kerak bo'lgan holatda
type ProductPreview = Pick<Product, "name" | "price">;
// { name: string; price: number; }

// ID va tavsifdan tashqari hammasini olish
type NewProductInput = Omit<Product, "id" | "description">;
// { name: string; price: number; }
\\\`\\\`\\\`

### 3. Record va ReturnType
* **\\\`Record<K, T>\\\`** — Kalitlari \\\`K\\\` tipida, qiymatlari \\\`T\\\` tipida bo'lgan obyekt tipini yaratadi.
* **\\\`ReturnType<T>\\\`** — Funksiyaning qaytaradigan qiymati tipini aniqlaydi.
\\\`\\\`\\\`typescript
// Kalitlari string, qiymatlari son bo'lgan lug'at (Dictionary)
type UserAgeMap = Record<string, number>;
const ages: UserAgeMap = {
  "Ali": 20,
  "Vali": 25
};

// Funksiya qaytaradigan qiymat tipini olish
function getResponse() {
  return { status: 200, data: "Muvaffaqiyatli" };
}
type ApiResponse = ReturnType<typeof getResponse>;
// { status: number; data: string; }
\\\`\\\`\\\`

---

## 3. 🎨 Tiplar Transformatsiyasi (Mermaid diagrammasi)

Quyidagi diagrammada original \\\`User\\\` interfeysidan yordamchi tiplar orqali yangi tiplar hosil qilinishi ko'rsatilgan:

\`\`\`mermaid
graph TD
    User["User { id: number, name: string, role: string }"]
    User -->|Partial| PartialUser["{ id?, name?, role? }"]
    User -->|Pick name/role| PickUser["{ name, role }"]
    User -->|Omit id| OmitUser["{ name, role }"]
    User -->|Readonly| ReadonlyUser["readonly { id, name, role }"]
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`Omit\` ichida noto'g'ri kalit yozish
TypeScript \\\`Omit\\\` ichida mavjud bo'lmagan kalit yozsangiz xabar bermasligi mumkin (agar strict null checks o'chirilgan bo'lsa), lekin bu chalkashliklarga olib keladi.
* **Yechim:** Har doim o'chirilayotgan xossalar original tipda mavjudligini tekshiring.

### 2. \`ReturnType\` uchun funksiya tipini emas, o'zini uzatish
\\\`ReturnType\\\` faqat funksiya tipi bilan ishlaydi. Funksiya o'zgaruvchisining o'zini uzatsangiz xatolik beradi:
* **Noto'g'ri:** \\\`type Result = ReturnType<myFunc>;\\\`
* **To'g'ri:** \\\`type Result = ReturnType<typeof myFunc>;\\\`

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** Utility Types nima?
   * **Javob:** Mavjud tiplarni o'zgartirish va ulardan yangi tiplar yaratish uchun ishlatiladigan tayyor global yordamchi tiplardir.
2. **Savol:** \`Partial<T>\` nima vazifani bajaradi?
   * **Javob:** Berilgan tipdagi barcha xossalarni ixtiyoriy (optional) qiladi.
3. **Savol:** \`Readonly<T>\` nima va u qachon ishlatiladi?
   * **Javob:** Barcha xossalarni faqat o'qiladigan qiladi. Qiymatlarni keyinchalik o'zgartirishga harakat qilinsa, TS xatolik beradi.
4. **Savol:** \`Pick\` va \`Omit\` farqi nimada?
   * **Javob:** \\\`Pick\\\` belgilangan xossalarni tanlab oladi, \\\`Omit\\\` esa belgilangan xossalarni tashlab yuboradi.

### Middle
5. **Savol:** Obyekt lug'atlarini yaratishda \`Record<K, T>\` qanday yordam beradi?
   * **Javob:** Kalit va qiymatlar tiplarini qat'iy cheklash orqali dinamik kalitli obyektlar yaratishda yordam beradi, masalan \\\`Record<string, User>\\\`.
6. **Savol:** \`ReturnType<T>\` nima uchun kerak va unga argument qanday beriladi?
   * **Javob:** Funksiya qaytaradigan qiymat turini aniqlash uchun kerak. Argument sifatida unga \\\`typeof funksiyaNomi\\\` beriladi.
7. **Savol:** \`Required<T>\` tipi \`Partial<T>\` ning teskarisimi? Tushuntiring.
   * **Javob:** Ha, \\\`Required\\\` barcha optional (\\\`?\\\`) xossalardan so'roq belgisini olib tashlab, ularni majburiy qiladi.
8. **Savol:** \`NonNullable<T>\` nima va u qachon qo'llaniladi?
   * **Javob:** T tipidan \\\`null\\\` va \\\`undefined\\\` qiymatlarini olib tashlaydi.

### Senior
9. **Savol:** \`Parameters<T>\` yordamchi tipi nima qaytaradi?
   * **Javob:** Funksiya qabul qiladigan argumentlar (parametrlar) tiplarini kortej (tuple) ko'rinishida qaytaradi.
10. **Savol:** Utility tiplar orqasida qanday TypeScript mexanizmi yotadi?
    * **Javob:** Ular \\\`Mapped Types\\\`, \\\`Conditional Types\\\` va \\\`Index Signatures\\\` kabi TypeScript-ning ichki dinamik tiplash imkoniyatlaridan foydalanib yozilgan.
11. **Savol:** \`Exclude\` va \`Extract\` tiplari qanday ishlaydi va ularning farqi nima?
    * **Javob:** Ikkalasi ham Union tiplar bilan ishlaydi. \\\`Exclude<T, U>\\\` T-dan U-ga mos keladiganlarini olib tashlaydi, \\\`Extract<T, U>\\\` esa faqat ikkala tipda ham bor bo'lgan (kesishish) tiplarni oladi.
12. **Savol:** \`Omit\` tipi \`Pick\` va \`Exclude\` yordamida qanday qurilganligini tushuntira olasizmi?
    * **Javob:** Ha, TypeScript-da \\\`Omit\\\` quyidagicha yozilgan: \\\`type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>\\\`. Ya'ni original kalitlar ro'yxatidan K olib tashlanadi va qolgan kalitlar \\\`Pick\\\` qilinadi.
`,
  exercises: [
    {
      id: 1,
      title: "Partial yordamida yangilash tipi",
      instruction: "Berilgan `User` interfeysi asosida barcha xossalari ixtiyoriy bo'lgan `UpdateUserDto` tipini yarating.",
      startingCode: "interface User {\n  id: number;\n  name: string;\n  age: number;\n}\n\n// UpdateUserDto tipini yozing\n",
      hint: "type UpdateUserDto = Partial<User>;",
      test: "if (!code.includes('type UpdateUserDto')) return 'UpdateUserDto tipini e\\'lon qiling';\nif (!code.includes('Partial<User>')) return 'Partial yordamchi tipidan foydalaning';"
    },
    {
      id: 2,
      title: "Pick yordamida to'plam olish",
      instruction: "`Article` interfeysidan faqat `title` va `author` xossalarini tanlab oluvchi `ArticleHeader` tipini yarating.",
      startingCode: "interface Article {\n  id: number;\n  title: string;\n  body: string;\n  author: string;\n}\n\n// ArticleHeader tipini yarating\n",
      hint: "type ArticleHeader = Pick<Article, 'title' | 'author'>;",
      test: "if (!code.includes('type ArticleHeader')) return 'ArticleHeader tipini yarating';\nif (!code.includes('Pick<Article')) return 'Pick yordamchi tipini ishlating';"
    },
    {
      id: 3,
      title: "ReturnType tahlili",
      instruction: "`createSession` funksiyasining qaytadigan qiymat turini `SessionData` nomi ostida oling.",
      startingCode: "function createSession() {\n  return { token: 'xyz123', expires: 3600 };\n}\n\n// SessionData tipini oling\n",
      hint: "type SessionData = ReturnType<typeof createSession>;",
      test: "if (!code.includes('type SessionData')) return 'SessionData tipini e\\'lon qiling';\nif (!code.includes('ReturnType<typeof createSession>')) return 'ReturnType va typeof dan to\\'g\\'ri foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Mavjud tipdagi barcha xossalarni ixtiyoriy (optional) qiladigan yordamchi tip qaysi?",
      options: [
        "Required<T>",
        "Partial<T>",
        "Omit<T>",
        "Pick<T>"
      ],
      correctAnswer: 1,
      explanation: "Partial<T> barcha xossalarni optional qiladi va PATCH kabi yangilash so'rovlarida juda asqotadi."
    },
    {
      id: 2,
      question: "Omit<User, 'id' | 'password'> nima qaytaradi?",
      options: [
        "Faqat 'id' va 'password' maydonlaridan iborat yangi tip",
        "'id' va 'password' maydonlari olib tashlangan yangi User tipi",
        "Bo'sh obyekt tipi",
        "Xatolik qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Omit belgilangan xossalarni o'chirib tashlaydi va qolgan xossalardan iborat tip qaytaradi."
    },
    {
      id: 3,
      question: "Pick<User, 'email'> nima qaytaradi?",
      options: [
        "Faqat 'email' maydonidan tashkil topgan obyekt tipi",
        "'email' maydoni optional bo'lgan User tipi",
        "'email' maydoni o'chirilgan User tipi",
        "Faqat string tipi"
      ],
      correctAnswer: 0,
      explanation: "Pick ko'rsatilgan xossalarni tanlab oladi. Bu yerda faqat 'email' bo'lgan yangi tip hosil bo'ladi."
    },
    {
      id: 4,
      question: "Required<T> ning vazifasi nima?",
      options: [
        "Barcha xossalarni readonly qiladi",
        "Barcha optional xossalarni majburiy qiladi",
        "Barcha xossalarni string qiladi",
        "Hech narsani o'zgartirmaydi"
      ],
      correctAnswer: 1,
      explanation: "Required barcha optional (?) xossalarni majburiy qilib o'zgartiradi."
    },
    {
      id: 5,
      question: "Kalitlari string, qiymatlari User obyekti bo'lgan tipni qanday e'lon qilish mumkin?",
      options: [
        "Record<string, User>",
        "Map<string, User>",
        "Dictionary<User>",
        "Record<User, string>"
      ],
      correctAnswer: 0,
      explanation: "Record<K, T> yordamida obyekt kaliti va qiymati tiplarini belgilash mumkin. Kalit string, qiymat User bo'ladi."
    },
    {
      id: 6,
      question: "ReturnType yordamchi tipiga to'g'ridan-to'g'ri funksiya nomini uzatish mumkinmi?",
      options: [
        "Ha, mumkin",
        "Yo'q, chunki u funksiya qiymatini emas, tipini talab qiladi, shuning uchun 'typeof' ishlatish shart",
        "Faqat arrow funksiyalar uchun mumkin",
        "Faqat class metodlari uchun mumkin"
      ],
      correctAnswer: 1,
      explanation: "ReturnType funksiya o'zgaruvchisining tipi ustida ishlaydi, shuning uchun uning yoniga 'typeof' yozilishi shart."
    },
    {
      id: 7,
      question: "Readonly<T> tipidagi obyektning xossasini o'zgartirmoqchi bo'lsak nima yuz beradi?",
      options: [
        "Runtime-da xatolik beradi",
        "TypeScript kompilyatsiya vaqtidayoq xatolik beradi",
        "Hech qanday xatolik bo'lmaydi",
        "Obyekt avtomatik nusxalanadi"
      ],
      correctAnswer: 1,
      explanation: "Readonly kompilyatsiya vaqtida xossalarni qayta yozishga ruxsat bermaydi va TS compiler error chiqaradi."
    },
    {
      id: 8,
      question: "NonNullable<string | null | undefined> qaysi tiplarni qaytaradi?",
      options: [
        "string",
        "null | undefined",
        "any",
        "never"
      ],
      correctAnswer: 0,
      explanation: "NonNullable union tip tarkibidagi null va undefined qiymatlarini chiqarib tashlaydi, faqat string qoladi."
    },
    {
      id: 9,
      question: "Parameters<(a: number, b: string) => void> nimani qaytaradi?",
      options: [
        "[number, string] kortej (tuple) tipi",
        "void tipi",
        "Obyekt tipi",
        "number tipi"
      ],
      correctAnswer: 0,
      explanation: "Parameters funksiya parametrlarining turlarini kortej (tuple) shaklida qaytaradi."
    },
    {
      id: 10,
      question: "Exclude<'a' | 'b' | 'c', 'a'> nimani qaytaradi?",
      options: [
        "'b' | 'c'",
        "'a'",
        "never",
        "any"
      ],
      correctAnswer: 0,
      explanation: "Exclude birinchi uniondan ikkinchisiga mos keladigan barcha tiplarni olib tashlaydi."
    },
    {
      id: 11,
      question: "Extract<'a' | 'b' | 'c', 'a' | 'f'> nimani qaytaradi?",
      options: [
        "'a'",
        "'a' | 'b' | 'c' | 'f'",
        "'b' | 'c'",
        "never"
      ],
      correctAnswer: 0,
      explanation: "Extract ikkala to'plam (union) ichida mavjud bo'lgan umumiy elementlarni tanlab oladi."
    },
    {
      id: 12,
      question: "Any-dan farqli o'laroq, Omit qaysi tipdagi kalitlarni qabul qilmaydi (strict rejimda)?",
      options: [
        "Mavjud bo'lmagan yoki noto'g'ri yozilgan kalitlarni",
        "Faqat string kalitlarni",
        "Faqat number kalitlarni",
        "Hammasini qabul qiladi"
      ],
      correctAnswer: 0,
      explanation: "Strict rejimda mavjud bo'lmagan kalitlarni Omit-ga verish xatolik keltirib chiqaradi."
    }
  ]
};
