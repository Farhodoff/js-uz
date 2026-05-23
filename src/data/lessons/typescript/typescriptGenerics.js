export const typescriptGenerics = {
  id: "typescriptGenerics",
  title: "Generics (Umumiylashtirish)",
  language: "typescript",
  theory: `## 1. NEGA kerak?
Katta loyihalarda har xil turdagi ma'lumotlar bilan ishlaydigan qayta ishlatiladigan (reusable) komponentlar yoki funksiyalar yozish talab qilinadi. Masalan, massivlar bilan ishlaydigan yordamchi funksiya sonlar massivini ham, satrlar massivini ham qayta ishlay olishi kerak.
Agar biz har bir tip uchun alohida funksiya yozsak, kod hajmi ko'payadi. Agar \`any\` tipini ishlatsak, tiplar xavfsizligidan voz kechgan bo'lamiz.
**Generics** (Umumiylashtiruvchilar) esa bu muammoni hal qiladi: ular funksiya, klass yoki interfeys chaqirilayotgan vaqtda qaysi tip bilan ishlashini parametr sifatida qabul qilish imkonini beradi. Bu kodning qayta ishlatilishini oshiradi va tiplar xavfsizligini 100% saqlaydi.

## 2. SODDALIK (Analogiya)
Generics-ni **bo'sh yuk qutilariga (shipping containers)** o'xshatish mumkin:
- Oddiy tipli klass — bu faqat **olma** uchun maxsus qurilgan qutidir (unga nok solib bo'lmaydi).
- \`any\` tipli klass — bu **aralash qutidir**. Unga hamma narsani tartibsiz solaverasiz, lekin ichidan olma olayotganda, u nok bo'lib chiqishi yoki buzilib ketgan bo'lishi mumkin (runtime error).
- **Generic klass (\`Container<T>\`)** — bu **universal bo'sh qutidir**. Uni ishlatish paytida siz unga \`Apple\` markasini yopishtirasiz va u faqat olmalarni xavfsiz saqlaydi. Boshqa safar esa unga \`Orange\` markasini urib, faqat apelsinlar uchun ishlata olasiz.

## 3. STRUKTURA
Generic funksiya yaratish va tiplarni parametr sifatida uzatish:
\`\`\`typescript
// Generic funksiya (T - tip parametridir)
function identity<T>(arg: T): T {
  return arg;
}

// Ishlatilishi (majburiy ko'rsatish)
let output1 = identity<string>("myString"); 
// Avtomatik aniqlash (Type Inference)
let output2 = identity(100); // T son deb topiladi
\`\`\`

### Generic Constraints (Tiplarni cheklash):
Generic tip parametriga ma'lum bir shartlarni yuklash uchun \`extends\` ishlatiladi:
\`\`\`typescript
interface Lengthwise {
  length: number;
}

// T faqat .length maydoniga ega bo'lgan tiplarni qabul qila oladi
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Generic xususiyatlarni asossiz cheklash:** Masalan, \`T\` tipidagi o'zgaruvchining \`length\` xossasini tekshirishga urinish, kompilyatsiya xatosini beradi (chunki \`T\` son bo'lishi ham mumkin va unda \`length\` yo'q). Buni tuzatish uchun \`extends { length: number }\` cheklovidan foydalanish shart.
2. **Generics kerak bo'lmagan joyda ishlatish:** Agar funksiya parametri va qaytish tipi o'zaro bog'liq bo'lmasa, generics ishlatish kodni keraksiz murakkablashtiradi.
3. **Static a'zolarda generic ishlatish:** Klasslarning static a'zolari klass instansiyasiga bog'liq bo'lmagani sababli, ular generic tiplardan foydalana olmaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Generics nima?**
Kod komponentlarini (funksiyalar, klasslar, interfeyslar) tiplar bilan parametrlash imkonini beruvchi vosita.

**2. T harfi nimani anglatadi?**
U 'Type' (Tip) so'zining qisqartmasi bo'lib, generic tiplar uchun eng ko'p ishlatiladigan standart o'zgaruvchi nomidir. Boshqa harflarni ham ishlatish mumkin (masalan, U, K, V).

**3. Generic constraint (tip cheklovi) nima?**
\`extends\` yordamida generic parametr qabul qilishi mumkin bo'lgan tiplarni ma'lum interfeys yoki xossalar bilan cheklab qo'yish usuli.

**4. Generic Class nima?**
Klass e'lon qilinishida tipi aniqlanmagan, balki obyekt olinishida (\`new Box<number>()\`) tipi belgilanadigan klass.

**5. Generic Interface nima?**
Obyekt yoki funksiya shaklini tavsiflovchi va o'zgaruvchan tiplarni qabul qiladigan interfeys. Masalan: \`interface KeyValue<K, V> {}\`.

**6. keyof kalit so'zi generics bilan qanday ishlatiladi?**
Mavjud obyekt tipining barcha kalitlarini union tip sifatida olish uchun. Masalan: \`K extends keyof T\` (K faqat T ning kalitlari bo'lishi mumkin).

**7. Default generic parameters nima?**
Tip parametri uzatilmaganda ishlatiladigan standart zaxira tip. Masalan: \`class Box<T = string>\`.

**8. any tipidan generics ning afzalligi nimada?**
any tiplar xavfsizligini buzadi, generics esa har xil tiplarni qabul qilsa ham kiritilgan va qaytarilgan qiymatning tiplari o'rtasidagi bog'liqlikni qat'iy saqlab qoladi.

**9. Generic funksiyani chaqirganda tip parametrini yozish shartmi?**
Majburiy emas. Agar argumentlar orqali tip aniq bo'lsa, TypeScript-ning Type Inference tizimi tipni o'zi aniqlaydi.

**10. Bitta generic funksiyada nechta tip parametridan foydalanish mumkin?**
Istalgancha. Masalan: \`function mergeProps<T, U>(obj1: T, obj2: U): T & U\`.

**11. Generic massiv qanday yoziladi?**
\`Array<T>\` ko'rinishida yozilishi mumkin. Bu \`T[]\` yozuvi bilan bir xil.

**12. TypeScript generics runtime-da mavjud bo'ladimi?**
Yo'q, JS faylga o'girilganda barcha generic tiplar, \`<T>\` belgilari va cheklovlar to'liq o'chirib tashlanadi.
`,
  exercises: [
    {
      id: 1,
      title: "Generic Identity funksiyasi",
      instruction: "Uzatilgan istalgan qiymatni o'zini o'zgartirmasdan qaytaradigan generic `identity(arg)` funksiyasini yozing.",
      startingCode: "function identity<T>(arg: T): T {\n  // Qiymatni qaytaring\n}",
      hint: "return arg;",
      test: "if (typeof identity !== 'function') return 'identity topilmadi'; if(identity(5) !== 5 || identity('test') !== 'test') return 'Identity xato ishladi'; return null;"
    },
    {
      id: 2,
      title: "Massiv birinchi elementi (Get First)",
      instruction: "Generic massiv qabul qilib, uning birinchi elementini qaytaradigan `getFirst(arr)` funksiyasini yozing. Massiv bo'sh bo'lsa `undefined` qaytarilsin.",
      startingCode: "function getFirst<T>(arr: T[]): T | undefined {\n  // Birinchi elementni qaytaring\n}",
      hint: "return arr[0];",
      test: "if (typeof getFirst !== 'function') return 'getFirst topilmadi'; if (getFirst([10, 20]) !== 10 || getFirst([]) !== undefined) return 'Birinchi element xato olinmoqda'; return null;"
    },
    {
      id: 3,
      title: "Massiv oxirgi elementi (Get Last)",
      instruction: "Generic massiv qabul qilib, uning eng oxirgi elementini qaytaradigan `getLast(arr)` funksiyasini yozing.",
      startingCode: "function getLast<T>(arr: T[]): T | undefined {\n  // Oxirgi elementni qaytaring\n}",
      hint: "return arr[arr.length - 1];",
      test: "if (typeof getLast !== 'function') return 'getLast topilmadi'; if(getLast(['a', 'b', 'c']) !== 'c') return 'Oxirgi element xato olindi'; return null;"
    },
    {
      id: 4,
      title: "Ikki massivni birlashtirish",
      instruction: "Ikkita bir xil tipdagi massivlarni qabul qilib, ularni bitta massivga birlashtirib qaytaruvchi `mergeArrays(arr1, arr2)` funksiyasini yozing.",
      startingCode: "function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {\n  // Massivlarni birlashtiring\n}",
      hint: "return [...arr1, ...arr2];",
      test: "if (typeof mergeArrays !== 'function') return 'mergeArrays topilmadi'; const res = mergeArrays([1, 2], [3, 4]); if(res.length !== 4 || res[2] !== 3) return 'Birlashma xato'; return null;"
    },
    {
      id: 5,
      title: "Generic Key-Value Pair",
      instruction: "Generic `key` va `value` qiymatlarini qabul qilib, `{ key, value }` obyektini qaytaradigan `createPair(key, value)` funksiyasini yozing.",
      startingCode: "function createPair<K, V>(key: K, value: V): { key: K; value: V } {\n  // Obyekt qaytaring\n}",
      hint: "return { key, value };",
      test: "if (typeof createPair !== 'function') return 'createPair topilmadi'; const pair = createPair('age', 25); if(pair.key !== 'age' || pair.value !== 25) return 'Pair xato yaratildi'; return null;"
    },
    {
      id: 6,
      title: "Constraint: Length mulki",
      instruction: "Tarkibida `.length` xossasi bor bo'lgan har qanday obyekt (massiv, string) qabul qilib, uning uzunligini qaytaradigan `getLength(obj)` funksiyasini yozing (bu TS-da `T extends { length: number }` cheklovi bilan yoziladi).",
      startingCode: "function getLength<T extends { length: number }>(obj: T): number {\n  // .length xossasini qaytaring\n}",
      hint: "return obj.length;",
      test: "if (typeof getLength !== 'function') return 'getLength topilmadi'; if(getLength('hello') !== 5 || getLength([1, 2, 3]) !== 3) return 'Uzunlik xato aniqlandi'; return null;"
    },
    {
      id: 7,
      title: "KeyOf constraint simulyatsiyasi",
      instruction: "Obyekt `obj` va kalit `key` qabul qilib, obyekt ichidagi shu kalit qiymatni qaytaradigan `getProperty(obj, key)` funksiyasini yozing.",
      startingCode: "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  // Kalit qiymatni qaytaring\n}",
      hint: "return obj[key];",
      test: "if (typeof getProperty !== 'function') return 'getProperty topilmadi'; if(getProperty({ name: 'Ali' }, 'name') !== 'Ali') return 'Property xato qaytarildi'; return null;"
    },
    {
      id: 8,
      title: "Generic Box klassi",
      instruction: "Istalgan qiymatni saqlaydigan `value` maydoniga va unga qiymat yozadigan `setValue(val)`, qiymat o'qiydigan `getValue()` metodlariga ega `Box` klassini yozing.",
      startingCode: "class Box<T> {\n  private value: T | null = null;\n  // Metodlarni yozing\n}",
      hint: "setValue(val: T): void {\n    this.value = val;\n  }\n  getValue(): T | null {\n    return this.value;\n  }",
      test: "if (typeof Box !== 'function') return 'Box klassi topilmadi'; const box = new Box(); box.setValue('token'); if(box.getValue() !== 'token') return 'Box klassi xato ishladi'; return null;"
    },
    {
      id: 9,
      title: "Generic Queue (Navbat)",
      instruction: "Generic ma'lumotlar bilan ishlaydigan, `enqueue(item)` (oxiriga qo'shish) va `dequeue()` (boshidan o'chirish va qaytarish) metodlari bor `Queue` klassini yozing.",
      startingCode: "class Queue<T> {\n  private data: T[] = [];\n  // Metodlarni yozing\n}",
      hint: "enqueue(item: T): void {\n    this.data.push(item);\n  }\n  dequeue(): T | undefined {\n    return this.data.shift();\n  }",
      test: "if (typeof Queue !== 'function') return 'Queue topilmadi'; const q = new Queue(); q.enqueue(1); q.enqueue(2); if(q.dequeue() !== 1 || q.dequeue() !== 2) return 'Navbat FIFO qoidasi buzildi'; return null;"
    },
    {
      id: 10,
      title: "Massiv nusxalash (Generic Copy)",
      instruction: "Berilgan massivning nusxasini (shallow copy) yaratib qaytaradigan generic `copyArray(arr)` funksiyasini yozing.",
      startingCode: "function copyArray<T>(arr: T[]): T[] {\n  // slice yordamida nusxalang\n}",
      hint: "return arr.slice();",
      test: "if (typeof copyArray !== 'function') return 'copyArray topilmadi'; const a = [1, 2]; const b = copyArray(a); if(a === b || b[1] !== 2) return 'Nusxalash xato'; return null;"
    },
    {
      id: 11,
      title: "Obyekt qoplama (Generic Wrapper)",
      instruction: "Uzatilgan qiymatni `{ data: val }` obyektiga o'rab qaytaradigan generic `wrapData(val)` funksiyasini yozing.",
      startingCode: "function wrapData<T>(val: T): { data: T } {\n  // Obyekt qaytaring\n}",
      hint: "return { data: val };",
      test: "if (typeof wrapData !== 'function') return 'wrapData topilmadi'; const w = wrapData(100); if(w.data !== 100) return 'Wrapper xato yaratildi'; return null;"
    },
    {
      id: 12,
      title: "Tarix saqlovchi (History Tracker)",
      instruction: "Klassda `list` (array) maydoni bo'lsin. Yangi qiymat qo'shadigan `add(item)` va oxirgi 3 ta qo'shilgan elementlar ro'yxatini qaytaradigan `getHistory()` metodlari bor `HistoryTracker` klassini yozing.",
      startingCode: "class HistoryTracker<T> {\n  private list: T[] = [];\n  // Metodlarni yozing\n}",
      hint: "add(item: T): void {\n    this.list.push(item);\n  }\n  getHistory(): T[] {\n    return this.list.slice(-3);\n  }",
      test: "if (typeof HistoryTracker !== 'function') return 'HistoryTracker topilmadi'; const tracker = new HistoryTracker(); tracker.add('a'); tracker.add('b'); tracker.add('c'); tracker.add('d'); if(tracker.getHistory().length !== 3 || tracker.getHistory()[0] !== 'b') return 'Tarix noto\\'g\\'ri qaytarildi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-da Generics nima uchun xizmat qiladi?",
      options: [
        "Faqat CSS o'zgaruvchilarini boshqarish uchun",
        "Turlicha ma'lumotlar tiplari bilan xavfsiz va qayta ishlatiladigan (reusable) kod yozish uchun",
        "Koddagi cheksiz sikllarni to'xtatish uchun",
        "Faqat ma'lumotlar bazasi so'rovlarini tiplash uchun"
      ],
      correctAnswer: 1,
      explanation: "Generics yordamida funksiya, klass yoki interfeys ishlatilish vaqtida qaysi tip bilan ishlashini parametr sifatida qabul qila oladi."
    },
    {
      id: 2,
      question: "Generic tiplashda odatiy holda birinchi tip parametri sifatida qaysi harf ishlatiladi?",
      options: ["G", "T", "V", "K"],
      correctAnswer: 1,
      explanation: "T harfi 'Type' (Tip) so'zining qisqartmasi bo'lib, generic kodlarda an'anaviy ravishda birinchi bo'lib qo'llaniladi."
    },
    {
      id: 3,
      question: "Generic parametrning qabul qilishi mumkin bo'lgan turlarini cheklash (Generic Constraint) uchun qaysi kalit so'z ishlatiladi?",
      options: ["implements", "extends", "as", "is"],
      correctAnswer: 1,
      explanation: "`extends` kalit so'zi generic parametr ma'lum interfeys yoki xossalarga ega bo'lishini shart qilib qo'yadi. Masalan: `T extends Lengthwise`."
    },
    {
      id: 4,
      question: "Quyidagilardan qaysi biri generic funksiya e'lon qilinishining to'g'ri sinraksidir?",
      options: [
        "function identity(arg: T) <T>",
        "function identity<T>(arg: T): T",
        "function <T> identity(arg: T)",
        "let identity = <T>(arg) as T"
      ],
      correctAnswer: 1,
      explanation: "Generic funksiyada tip parametri funksiya nomidan keyin burchak qavslarda `<T>` yoziladi va parametrlar hamda qaytish tipida ishlatiladi."
    },
    {
      id: 5,
      question: "keyof kalit so'zi generics bilan birga ishlatilganda qanday vazifani bajaradi?",
      options: [
        "Faqat ob'ekt uzunligini qaytaradi",
        "Tip parametrini obyektning kalitlari (keys) bilan cheklaydi (Union type of object keys)",
        "Static a'zolarni tekshiradi",
        "Kodni xavfsiz transpayl qiladi"
      ],
      correctAnswer: 1,
      explanation: "`keyof T` yozuvi T obyektining barcha kalitlari birlashmasini beradi. `K extends keyof T` esa K faqat T obyektida mavjud kalitlardan biri bo'lishini shart qiladi."
    },
    {
      id: 6,
      question: "Default Generic Parameters (standart generic tip parametrlari) nima uchun kerak?",
      options: [
        "Faqat xatolar yuz berganda o'rnini bosish uchun",
        "Generic funksiya yoki klass chaqirilganda tip parametri uzatilmasa, sukut bo'yicha ishlatiladigan zaxira tipini belgilash uchun",
        "Klass static metodlarini tiplash uchun",
        "TypeScript build tezligini oshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar klass yoki interfeys chaqirilganda tip ko'rsatilmasa, standart ko'rsatilgan tip (masalan: `class Box<T = string>`) ishlatiladi."
    },
    {
      id: 7,
      question: "Quyidagi e'londa T qanday aniqlanadi (Type Inference orqali)?\n`function log<T>(val: T) {}` va `log(45);` chaqiruvi.",
      options: ["string", "number", "any", "unknown"],
      correctAnswer: 1,
      explanation: "Uzatilgan argument `45` son (number) bo'lganligi sababli, TypeScript-ning Type Inference tizimi T tipini avtomatik ravishda `number` deb belgilaydi."
    },
    {
      id: 8,
      question: "Nima uchun klasslarning static maydonlari va metodlarida generic tiplarni ishlatib bo'lmaydi?",
      options: [
        "Chunki static a'zolar xotirada saqlanmaydi",
        "Chunki static a'zolar klass instansiyasi (obyekti) yaratilmasdan ishlaydi va ular obyekt yaratishdagi generic tiplarni bilmaydi",
        "Chunki static faqat CSS-da ishlaydi",
        "Chunki static metodlar return qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Static a'zolar ob'ekt nusxalariga emas, balki klassning o'ziga tegishlidir. Generic tiplar esa har bir yangi obyekt yaratishda har xil aniqlanadi, shu sababli static a'zolarda generic ishlamaydi."
    },
    {
      id: 9,
      question: "Generics-ning `any` tipini ishlatishdan asosiy afzalligi nimada?",
      options: [
        "Kod tezligini oshirishi",
        "Kirish va chiqish qiymatlari orasidagi tiplar bog'liqligini qat'iy saqlab, tiplar xavfsizligini ta'minlashi",
        "HTML kodlarini validatsiya qilishi",
        "Barcha xatolarni avtomatik tozalashi"
      ],
      correctAnswer: 1,
      explanation: "any tiplar tekshiruvini butunlay buzadi, Generics esa tiplar xavfsizligini 100% saqlab, moslashuvchan funksiyalar yaratishga imkon beradi."
    },
    {
      id: 10,
      question: "TypeScript-da generic interfeys qanday e'lon qilinadi?",
      options: [
        "interface Box<T> { value: T; }",
        "interface Box(T) { value: T; }",
        "interface <T> Box { value: T; }",
        "interface Box { value: T; } as generic"
      ],
      correctAnswer: 0,
      explanation: "Generic interfeys nomi yoniga burchak qavsda `<T>` yoziladi, masalan: `interface Box<T> { value: T; }`."
    },
    {
      id: 11,
      question: "Obyekt kesishuvida (Intersection) generic tiplar qanday birlashtiriladi?",
      options: [
        "function merge<T, U>(a: T, b: U): T & U",
        "function merge<T, U>(a: T, b: U): T | U",
        "function merge<T, U>(a: T, b: U): T + U",
        "function merge<T, U>(a: T, b: U): T && U"
      ],
      correctAnswer: 0,
      explanation: "T va U tiplarini birlashtirish va har ikkala tipdagi maydonlarga ega obyekt qaytarish uchun `T & U` (Intersection) yoziladi."
    },
    {
      id: 12,
      question: "TypeScript generics-dan transpayl qilingan JavaScript kodi qayerda generics parametrlarini saqlaydi?",
      options: [
        "Klass prototipida",
        "Hech qayerda - JS-da generics yo'q, shuning uchun ular kompilyatsiyada butunlay o'chib ketadi",
        "Global o'zgaruvchilarda",
        "JSON formatida local-keshda"
      ],
      correctAnswer: 1,
      explanation: "TypeScript faqat compile-time uchun kerak. JS faylga o'girilganda barcha `<T>` kabi yozuvlar va generic cheklovlar to'liq o'chiriladi."
    }
  ]
};
