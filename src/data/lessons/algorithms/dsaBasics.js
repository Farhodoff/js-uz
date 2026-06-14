export const dsaBasics = {
  id: "dsaBasics",
  title: "DSA Asoslari: O'zgaruvchilar va Xotira (Memory Layout)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Kompyuterda ma'lumotlarni saqlash va ulardan foydalanish xuddi kiyimlar va jihozlarni tartibga solishga o'xshaydi. Dasturdagi o'zgaruvchilar - bu xotiradagi ma'lum bir katakchaga qo'yilgan yorliqlardir.

### Xotira o'xshatishi:
- **Stack (Stek xotira):** Bu xuddi tor va chuqur qutiga o'xshaydi. Siz kitoblarni ustma-ust taxlaysiz (LIFO - Last In First Out). Stek xotira juda tez ishlaydi, lekin hajmi cheklangan va faqat o'lchami aniq bo'lgan static ma'lumotlarni (masalan, sonlar, stringlar) saqlaydi.
- **Heap (Xip xotira):** Bu katta va keng xona (omborxona). Siz u yerda katta va o'lchami o'zgarib turadigan narsalarni (masalan, mebellar, qutilar) saqlaysiz. Bu yerga narsa qo'yish va olish stekka qaraganda sekinroq, lekin joy juda ko'p. Obyektlar va massivlar shu yerda saqlanadi. Biz stekda faqat o'sha narsaning omborda qayerda turgani haqidagi "manzil" (ko'rsatkich yoki pointer)ni saqlaymiz.

---

## 2. 💻 Real Kod Misollari

Primitiv va referensial o'zgaruvchilarning xotirada ajralishi:

\`\`\`javascript
// 1. Primitiv tur (Qiymat bo'yicha nusxalash - Stack)
let a = 10;
let b = a; // b yangi 10 qiymatini oladi
b = 20;
console.log(a); // 10 (a o'zgarmaydi)

// 2. Referensial tur (Havola bo'yicha nusxalash - Heap)
let obj1 = { value: 100 };
let obj2 = obj1; // obj2 obj1 ishora qilgan heapdagi manzilni oladi
obj2.value = 200;
console.log(obj1.value); // 200 (obj1 qiymati ham o'zgaradi!)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Xotira manzillari va Bitlar:
Kompyuterda har qanday ma'lumot 0 va 1 (bit) ko'rinishida saqlanadi. 8 bit = 1 bayt. Har bir o'zgaruvchi xotirada ma'lum bir baytlar diapazonini egallaydi.
- **Primitiv qiymatlar (V8 dvigatelida):** Sonlar (Numbers) odatda 64-bitli suzuvchi nuqta (double-precision float) shaklida saqlanadi va stack xotirasida tezkor foydalaniladi.
- **Havolalar (References):** Heap xotiradagi obyekting 32-bit yoki 64-bitli xotira manzilini (Memory Address) ifodalaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Referensial obyektlarni noto'g'ri nusxalash (Shallow Copy)
Obyekt yoki massivni shunchaki \`=\` yordamida tenglashtirish uning nusxasini yaratmaydi, balki bir xil manzilga havola beradi.
* **Xato:**
  \`\`\`javascript
  const list1 = [1, 2, 3];
  const list2 = list1;
  list2.push(4); // list1 ham [1, 2, 3, 4] bo'lib qoladi!
  \`\`\`
* **Tuzatish (Shallow copy):**
  \`\`\`javascript
  const list2 = [...list1]; // Spread operator yordamida nusxalash
  list2.push(4); // Endi list1 o'zgarmaydi
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Stack va Heap xotira farqi nima?**
   * *Javob:* Stack tezkor va statik ma'lumotlar (primitivlar) uchun ishlatiladi, Heap esa dinamik va katta ma'lumotlar (obyektlar) uchun joy beradi.
2. **Pass-by-value va Pass-by-reference farqi nima?**
   * *Javob:* JS-da primitivlar qiymat bo'yicha uzatiladi (nusxa olinadi), obyektlar esa havola (manzil) bo'yicha uzatiladi.
3. **JS-da primitiv turlarni sanab bering.**
   * *Javob:* Number, String, Boolean, Null, Undefined, Symbol, BigInt.
4. **JS dynamic typedan static typega qanday o'tadi?**
   * *Javob:* JS interpretatorida runtime vaqtida tiplar aniqlanadi. TypeScript yordamida biz static yozishimiz mumkin.
5. **Garbage Collector nima vazifani bajaradi?**
   * *Javob:* Heap xotirada hech qaysi stack o'zgaruvchisidan havola (reference) qolmagan obyektlarni avtomatik o'chirib, xotirani bo'shatadi.
6. **Shallow copy va Deep copy farqi nimada?**
   * *Javob:* Shallow copy faqat birinchi darajali atributlarni nusxalaydi, ichki obyekt havolalarini saqlab qoladi. Deep copy esa barcha ichki obyektlarni ham to'liq yangidan yaratadi.
7. **JS-da massiv xotirada qanday saqlanadi?**
   * *Javob:* Massivlar aslida JS-da maxsus obyektlardir va ular Heap xotirasida saqlanadi.
8. **Stack Overflow qachon sodir bo'ladi?**
   * *Javob:* Rekursiya yoki chaqiriqlar juda ko'payib ketib, Stack uchun ajratilgan cheklangan xotira to'lib toshib ketganda.
9. **\`typeof null\` nima qaytaradi va nega?**
   * *Javob:* \`'object'\` qaytaradi. Bu JS tilining eng birinchi versiyalaridan qolgan xatolik (bug) hisoblanadi.
10. **Memory Leak nima?**
    * *Javob:* Keraksiz bo'lgan ma'lumotlarga havola saqlanib qolgani sababli Garbage Collector ularni tozalay olmasligi va xotira band bo'lib qolishi.
11. **Primitiv turlar immutable (o'zgarmas) ekanini qanday tushuntirasiz?**
    * *Javob:* Primitiv qiymatning o'zini o'zgartirib bo'lmaydi. Masalan, \`'salom'.toUpperCase()\` yangi string qaytaradi, eski string o'z holicha qoladi.
12. **\`const\` o'zgaruvchisi xotira nuqtai nazaridan qanday ishlaydi?**
    * *Javob:* \`const\` o'zgaruvchisining stack xotiradagi qiymati (yoki havolasi/manzili) o'zgarmas qilib qulflanadi. Lekin u ishora qilayotgan heapdagi obyektning ichki atributlarini o'zgartirsa bo'ladi.

---

## 6. 🎨 Interaktiv Vizual

### O'zgaruvchilarning Xotirada Taqsimlanishi
Quyidagi diagrammada primitiv o'zgaruvchilar va obyekt havolalarining xotiradagi joylashuvi tasvirlangan:

\`\`\`mermaid
graph TD
    subgraph Stack [Stack Memory - Tezkor va Cheklangan]
        s1["let age = 30<br>(Son - Qiymat shaklida)"]
        s2["let name = 'Ali'<br>(Matn - Qiymat shaklida)"]
        s3["let userRef = #808<br>(Havola - Xotira manzili)"]
    end
    subgraph Heap [Heap Memory - Katta va Dinamik]
        h1["Obyekt #808<br>{ name: 'Ali', role: 'Developer' }"]
    end
    s3 -->|Manzilga ishora| h1
    style Stack fill:#e8f8f5,stroke:#117a65,stroke-width:2px
    style Heap fill:#fcf3cf,stroke:#b7950b,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mavzuni tushunganingizni tekshirish uchun topshiriqlarni bajaring.

---

## 8. 📝 12 ta Mini Test

Bilimingizni sinash uchun 12 ta test savoli tayyorlangan.

---

## 9. 🚀 Performance va Optimization

- **Primitivlardan to'g'ri foydalaning:** Kichik amallar uchun keraksiz vaqtinchalik obyektlar yaratmang.
- **Memory Footprint:** Katta hajmdagi ma'lumotlar bilan ishlagandan so'ng havolalarni \`null\` qilish orqali Garbage Collector-ga yordam bering.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Xotira turi | Nusxalanish usuli | Tezligi |
| :--- | :--- | :--- | :--- |
| **Primitives** | Stack | Qiymat bo'yicha (By Value) | O'ta tezkor |
| **Objects / Arrays** | Heap | Havola bo'yicha (By Reference) | Nisbatan sekinroq |
`,
  exercises: [
    {
      id: 1,
      title: "Qiymatlarni Uchinchi O'zgaruvchisiz Almashtirish",
      instruction: "Ikki sonli o'zgaruvchining qiymatini uchinchi o'zgaruvchisiz (temp variable ishlatmasdan) almashtiradigan `swap(a, b)` funksiyasini yozing. Funksiya almashtirilgan qiymatlarni massiv ko'rinishida qaytarsin: `[b, a]`.",
      startingCode: "function swap(a, b) {\n  // Kodni shu yerda yozing\n}",
      hint: "Matematik qo'shish va ayirish orqali (a = a + b; ...) yoki destructuring `[a, b] = [b, a]` yordamida bajaring.",
      test: "if (code.includes('let temp') || code.includes('var temp') || code.includes('const temp')) return 'Uchinchi o\\'zgaruvchi (temp) ishlatish taqiqlanadi'; const sandbox = new Function(code + '; return swap;'); const fn = sandbox(); const res = fn(5, 10); if (res && res[0] === 10 && res[1] === 5) return null; return 'Qiymatlar to\\'g\\'ri almashmadi';"
    },
    {
      id: 2,
      title: "Deep Copy Yaratish (Chuqur Nusxa)",
      instruction: "Berilgan ixtiyoriy chuqur joylashgan obyektning to'liq yangi nusxasini (Deep Copy) yaratadigan `deepCopy(obj)` funksiyasini yozing. Asl obyekt o'zgartirilganda yangi obyekt o'zgarmasligi kerak.",
      startingCode: "function deepCopy(obj) {\n  // Kodni shu yerda yozing\n}",
      hint: "Obyektni satrga o'giring va qaytadan obyektga o'giring (`JSON.parse(JSON.stringify(obj))`) yoki rekursiv nusxalang.",
      test: "const sandbox = new Function(code + '; return deepCopy;'); const fn = sandbox(); const original = { a: 1, b: { c: 2 } }; const copied = fn(original); copied.b.c = 99; if (original.b.c === 2 && copied.b.c === 99) return null; return 'Chuqur nusxalash amalga oshmadi, havola bog\\'liqligi qolib ketgan';"
    },
    {
      id: 3,
      title: "Xotira Manzilini Tekshiruvchi (Reference Checker)",
      instruction: "Berilgan ikki obyekt xotirada bir xil manzilga ishora qilayotganini aniqlovchi `isSameReference(obj1, obj2)` funksiyasini yozing. Agar havolalar bir xil bo'lsa `true`, aks holda `false` qaytaring.",
      startingCode: "function isSameReference(obj1, obj2) {\n  // Kodni shu yerda yozing\n}",
      hint: "Tenglik operatorlari (`===`) referensial obyektlarda qiymatni emas, xotiradagi manzilni solishtiradi.",
      test: "const sandbox = new Function(code + '; return isSameReference;'); const fn = sandbox(); const o1 = { x: 1 }; const o2 = o1; const o3 = { x: 1 }; if (fn(o1, o2) === true && fn(o1, o3) === false) return null; return 'Havolalarni solishtirishda xatolik yuz berdi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Primitiv ma'lumot turlari xotiraning qaysi qismida saqlanadi?",
      options: [
        "Heap xotirasida",
        "Stack xotirasida",
        "Faqat brauzer keshida",
        "Qattiq diskda"
      ],
      correctAnswer: 1,
      explanation: "Primitiv ma'lumot turlari (Numbers, Strings, Booleans va h.k.) statik o'lchamga ega bo'lgani uchun tezkor va tartibli Stack xotirasida saqlanadi."
    },
    {
      id: 2,
      question: "Referensial ma'lumot turlari (obyektlar, massivlar) aslida qayerda saqlanadi?",
      options: [
        "Heap xotirasida o'zi saqlanadi, Stack-da esa faqat uning xotira manzili (havolasi) turadi",
        "To'liq Stack xotirasida saqlanadi",
        "Global o'zgaruvchilar bazasida",
        "Faqat operativ xotiradan tashqarida"
      ],
      correctAnswer: 0,
      explanation: "Dinamik o'lchamdagi obyektlar va massivlar Heap xotirasida joy oladi. Stack-da esa ushbu obyektga eltuvchi pointer (havola) yoziladi."
    },
    {
      id: 3,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nlet x = 5;\nlet y = x;\ny += 5;\nconsole.log(x);\n```",
      options: [
        "10",
        "5",
        "undefined",
        "ReferenceError"
      ],
      correctAnswer: 1,
      explanation: "JS-da primitivlar qiymat bo'yicha nusxalanadi. Shuning uchun y o'zgarishi x ga ta'sir qilmaydi va x o'zining 5 qiymatida qoladi."
    },
    {
      id: 4,
      question: "Quyidagi kod bajarilgach, `person1.name` qiymati qanday bo'ladi?\n```javascript\nlet person1 = { name: 'Anvar' };\nlet person2 = person1;\nperson2.name = 'Sardor';\n```",
      options: [
        "'Anvar'",
        "'Sardor'",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Obyektlar havola bo'yicha ishlaydi. person2 = person1 qilinganda ikkala o'zgaruvchi ham heapdagi bitta obyektga ishora qiladi, shuning uchun person2 o'zgarishi person1 ni ham o'zgartiradi."
    },
    {
      id: 5,
      question: "Deep Copy (Chuqur nusxalash) deganda nimani tushunasiz?",
      options: [
        "Faqat birinchi darajali kalitlarni nusxalash",
        "Obyekt va uning barcha ichki joylashgan obyektlarini ham yangidan xotirada yaratish",
        "Obyektning faqat xotira manzilini nusxalash",
        "Obyektni o'chirib yuborish"
      ],
      correctAnswer: 1,
      explanation: "Deep Copy - bu obyekt va uning ichidagi barcha referensial qiymatlarni rekursiv ravishda to'liq yangidan xotirada nusxalashdir."
    },
    {
      id: 6,
      question: "JavaScript Garbage Collector-ning asosiy vazifasi nima?",
      options: [
        "Koddagi ortiqcha bo'sh joylarni (whitespace) o'chirish",
        "Xotirada hech qanday havola qolmagan, ishlatilmayotgan obyektlarni aniqlab, xotirani bo'shatish",
        "Dasturdagi sintaktik xatolarni o'chirish",
        "Xavfsizlikni ta'minlash uchun parollarni tozalash"
      ],
      correctAnswer: 1,
      explanation: "Garbage Collector (Axlat yig'uvchi) xotirada endi erishib bo'lmaydigan (hech qayerda reference qolmagan) obyektlarni o'chirib, RAM-ni bo'shatadi."
    },
    {
      id: 7,
      question: "JS-da `typeof null` nima qaytaradi?",
      options: [
        "'null'",
        "'undefined'",
        "'object'",
        "'string'"
      ],
      correctAnswer: 2,
      explanation: "Tarixiy xatolik (bug) tufayli JS-da `typeof null` 'object' qaytaradi."
    },
    {
      id: 8,
      question: "Stack Overflow xatosi qanday holatda yuzaga keladi?",
      options: [
        "Heap xotira to'lib ketganda",
        "Funksiya chaqiriqlari steki (Call Stack) to'lib ketganda, masalan cheksiz rekursiyada",
        "Faqat SQL so'rovlari noto'g'ri bo'lganda",
        "Internet tezligi sekinlashganda"
      ],
      correctAnswer: 1,
      explanation: "Har bir funksiya chaqiruvi Stack xotiradan joy oladi. Agar cheksiz rekursiya bo'lsa, xotira to'lib ketadi va Stack Overflow xatosi yuzaga keladi."
    },
    {
      id: 9,
      question: "JavaScript-da primitiv turlar nima uchun o'zgarmas (immutable) deyiladi?",
      options: [
        "Ularni qayta e'lon qilib bo'lmagani uchun",
        "Mavjud qiymatning o'zini o'zgartirib bo'lmaydi, har qanday o'zgarish yangi qiymat yaratadi",
        "Ular faqat o'qish uchun mo'ljallangan fayllarda saqlanadi",
        "Ularning xotiradagi hajmini o'zgartirib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Primitiv qiymatning o'zi o'zgarmaydi. Masalan, satrning biron bir harfini to'g'ridan-to'g'ri o'zgartirib bo'lmaydi, yangi satr yaratish lozim."
    },
    {
      id: 10,
      question: "Nima uchun memory leak (xotira oqishi) yuz beradi?",
      options: [
        "Operativ xotira (RAM) jismonan buzilganda",
        "Dasturga keraksiz bo'lgan obyektlar hali ham havolalar orqali xotirada saqlanib qolgani uchun Garbage Collector tozalay olmaganda",
        "Browser juda ko'p yuklanganda",
        "Faqat server o'chib qolganda"
      ],
      correctAnswer: 1,
      explanation: "Ishlatilmaydigan ma'lumotlarga havola dasturda saqlanib qolsa, Garbage Collector ularni axlat deb hisoblamaydi va xotira doimiy band bo'lib qoladi."
    },
    {
      id: 11,
      question: "Obyektni `const` bilan e'lon qilsak, uning atributlarini o'zgartirsa bo'ladimi?",
      options: [
        "Yo'q, mutlaqo o'zgartirib bo'lmaydi",
        "Ha, chunki `const` faqat obyektning xotira manzilini (havolasini) o'zgarmas qiladi, ichki qiymatlarni emas",
        "Faqat sonli atributlarni o'zgartirsa bo'ladi",
        "Faqat yangi atribut qo'shish mumkin, borini o'zgartirib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "`const` o'zgaruvchining stackdagi qiymati (havolasi) o'zgarmasligini ta'minlaydi. Obyektning o'zi heapda bo'lgani uchun uning atributlarini o'zgartirish taqiqlanmaydi."
    },
    {
      id: 12,
      question: "Shallow Copy (Yuzaki nusxa) obyekt nusxasini qanday yaratadi?",
      options: [
        "Faqat birinchi darajali elementlarni nusxalaydi, ichki referensial obyektlarning havolasini nusxalaydi (manzil bir xil qoladi)",
        "Barcha ichki obyektlarni ham to'liq yangidan yaratadi",
        "Obyektni o'chirib yuboradi",
        "Faqat obyekt metodlarini nusxalaydi"
      ],
      correctAnswer: 0,
      explanation: "Shallow copy yuzaki nusxalaydi, ya'ni birinchi darajali qiymatlar nusxalanadi, lekin ichki obyektlar va massivlar baribir eski obyektning elementlariga ishora qilib qoladi."
    }
  ]
};
