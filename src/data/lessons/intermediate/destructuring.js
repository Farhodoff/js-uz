export const destructuring = {
  id: "destructuring",
  title: "Destructuring (Ma'lumotlarni ochish)",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: Unpacking Your Suitcase

Tasavvur qiling, sayohatdan qaytdingiz va chamadoningizni ochyapgansiz:
- **Eski usul (Destructuring-siz):** Chamadondan bitta-bitta kiyimlarni qidirib olib, har birini alohida shkafga joylaysiz. Bu ko'p vaqt va takroriy ishlarni talab qiladi.
- **Yangi usul (Destructuring orqali):** Chamadonning har bir qismi aniq. Bitta harakat bilan chamadonning ma'lum qismlarini kerakli shkaflarga birdaniga o'tkazib qo'yasiz.

Kodda bu qanday ko'rinadi?
\\\`\\\`\\\`javascript
// Eski usul
const user = { name: "Ali", age: 25 };
const name = user.name;
const age = user.age;

// Destructuring usuli
const { name, age } = user;
\\\`\\\`\\\`

Massivlarni ochish **navbatga turishga** o'xshaydi: birinchi kelgan birinchi joyni oladi (indeks bo'yicha).
Obyektlarni ochish esa **pochta qutilariga** o'xshaydi: qutining ustidagi ismga qarab xat olasiz (kalit nomlari mosligi bo'yicha).

---

## 2. 🧠 Deep Dive: Under the Hood (V8 Engine va Xotira)

### JavaScript V8 dvigateli buni qanday tushunadi?
Destructuring aslida "Syntactic Sugar" (sintaktik shirinlik) hisoblanadi. Ya'ni dvigatel uni bajarayotganda baribir oddiy o'zgaruvchilarni e'lon qilish va obyekt xossalarini o'qish (property access) kodiga aylantiradi.

Masalan, quyidagi kod:
\\\`\\\`\\\`javascript
const { a, b } = obj;
\\\`\\\`\\\`
V8 dvigatelida (yoki Babel orqali eski brauzerlarga tushadigan qilib kompilyatsiya qilinganda) quyidagiga o'giriladi:
\\\`\\\`\\\`javascript
const a = obj.a;
const b = obj.b;
\\\`\\\`\\\`

### Performance (Tezlik)
Umuman olganda, oddiy xossalarni o'qish (property access) va destructuring o'rtasida katta tezlik farqi yo'q. Dvigatel uni juda yaxshi optimallashtiradi.
Ammo **Rest operatori (\\\`...\\\`)** yordamida destructuring qilinganda, yangi obyekt yoki massiv yaratiladi va qolgan qiymatlar unga ko'chiriladi (shallow copy). Katta obyektlarda buning xotiraga va garbage collector (GC) ga ta'siri sezilarli bo'lishi mumkin.

\\\`\\\`\\\`javascript
// Diqqat: Bu yerda yangi 'restObj' obyekti yaratiladi va xotiradan yangi joy ajratiladi
const { id, ...restObj } = veryLargeObject;
\\\`\\\`\\\`

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Cases (Nozik holatlar)
1. **\\\`null\\\` yoki \\\`undefined\\\` ni destructuring qilish:**
JavaScript \\\`null\\\` va \\\`undefined\\\` dagi xossalarga murojaat qilishga yo'l qo'ymaydi va \\\`TypeError\\\` xatoligi yuzaga keladi.
\\\`\\\`\\\`javascript
const data = null;
const { name } = data; // TypeError!
// Himoyalangan usul:
const { name } = data || {}; 
\\\`\\\`\\\`

2. **O'zgaruvchilarni qayta ishlash va qavslar \\\`()\\\`: **
Oldindan e'lon qilingan o'zgaruvchilarga obyekt orqali qiymat berishda qavslardan foydalanish shart, aks holda JS bloki deb tushunib, SyntaxError beradi.
\\\`\\\`\\\`javascript
let x, y;
({ x, y } = { x: 10, y: 20 }); // Qavslar muhim!
\\\`\\\`\\\`

### Senior Interview Savollari
1. **Savol:** \\\`const [a, b] = [1, 2, 3]\\\` kodida 3 nima bo'ladi?
   **Javob:** 3 shunchaki xotirada qoladi, unga hech qaysi o'zgaruvchi ishora qilmaydi, kerak bo'lmasa garbage collector uni tozalaydi.
2. **Savol:** Obyekt va massivlarni aralash destructuring qilish qanday bo'ladi?
   **Javob:** \\\`const [{ name }] = [{ name: 'John' }]\\\` kabi qilib, ichma-ich sintaksisdan foydalanish orqali qilinadi.

---

## 4. 📊 Arxitektura va Diagramma

Quyidagi Mermaid sxemasida Obyekt va Massiv destructuring prinsiplari ko'rsatilgan:

\\\`\\\`\\\`mermaid
graph TD
    Start[Destructuring Concept] --> ArrayDest[Array Destructuring]
    Start --> ObjectDest[Object Destructuring]

    ArrayDest --> ArrRule[By Index Order]
    ArrRule --> ArrEx[const a, b = arr]

    ObjectDest --> ObjRule[By Key Name]
    ObjRule --> ObjEx[const key = obj]

    style Start fill:#f9f,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "O'zgaruvchilar qiymatini almashtirish va massivni ochish",
      instruction: "Berilgan `swapAndUnpack(arr)` funksiyasiga kamida 2 ta elementdan iborat massiv uzatiladi. Funksiya massivning birinchi va ikkinchi elementlarining o'rnini faqat massiv destruptizatsiyasidan (array destructuring) foydalanib almashtirishi (swapping) va ularni yangi massiv ko'rinishida qaytarishi kerak. Boshqa vaqtinchalik o'zgaruvchilardan foydalanmang.",
      startingCode: "function swapAndUnpack(arr) {\n  // Faqat destructuring yordamida birinchi va ikkinchi elementlarni almashtiring\n  // Kodni shu yerda yozing\n}",
      hint: "let [a, b] = arr; [a, b] = [b, a]; return [a, b];",
      test: "const sandbox = new Function(code + '; return swapAndUnpack;');\nconst fn = sandbox();\nconst result = fn([10, 20]);\nif (!Array.isArray(result) || result[0] !== 20 || result[1] !== 10) return 'swapAndUnpack funksiyasi elementlar o\\'rnini to\\'g\\'ri almashtirmadi. Kutilgan: [20, 10], olingan: ' + JSON.stringify(result);\nconst result2 = fn(['olma', 'anor', 'behi']);\nif (result2[0] !== 'anor' || result2[1] !== 'olma') return 'Ko\\'p elementli massivlar uchun ham to\\'g\\'ri ishlashi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "API ma'lumotlarini qayta ishlash",
      instruction: "Foydalanuvchi obyekti (`user`) berilgan. Undan destruptizatsiya yordamida `firstName`ni `name` o'zgaruvchisiga, `email`ni esa o'zgaruvchining o'ziga oling. Shuningdek, `role` xossasini ajrating, agar u mavjud bo'lmasa unga default (boshlang'ich) qiymat sifatida `'user'`ni bering. Funksiya yakunda yangi obyekt ko'rinishida `{ name, email, role }`ni qaytarsin.",
      startingCode: "function processUser(user) {\n  // Destructuring yordamida firstName -> name, email, va role (default: 'user') o'zgaruvchilarini oching\n  // Kodni shu yerda yozing\n}",
      hint: "const { firstName: name, email, role = 'user' } = user; return { name, email, role };",
      test: "const sandbox = new Function(code + '; return processUser;');\nconst fn = sandbox();\nconst user1 = { firstName: 'Sardor', email: 's@gmail.com', role: 'admin' };\nconst res1 = fn(user1);\nif (!res1 || res1.name !== 'Sardor' || res1.email !== 's@gmail.com' || res1.role !== 'admin') return 'firstName qayta nomlanishi yoki role qiymati noto\\'g\\'ri olingan';\nconst user2 = { firstName: 'Madina', email: 'm@mail.ru' };\nconst res2 = fn(user2);\nif (!res2 || res2.role !== 'user') return 'role xossasi bo\\'lmaganda default \"user\" qiymati biriktirilishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "Murakkab obyektlarni destruptizatsiya qilish",
      instruction: "Berilgan buyurtma (`order`) obyektidan `id`ni, uning ichidagi `customer` obyektidan `city`ni destruptizatsiya qilib oling. Shuningdek, buyurtmaning boshqa barcha xossalarini `details` nomli o'zgaruvchiga (rest operator orqali) yig'ing. Yakunda funksiya `{ id, city, details }` obyektini qaytarsin.",
      startingCode: "function getOrderSummary(order) {\n  // Ichma-ich destructuring va rest operatoridan foydalaning\n  // Kodni shu yerda yozing\n}",
      hint: "const { id, customer: { city }, ...details } = order; return { id, city, details };",
      test: "const sandbox = new Function(code + '; return getOrderSummary;');\nconst fn = sandbox();\nconst orderData = { id: 501, date: '2026-06-11', customer: { name: 'Eldor', city: 'Samarqand' }, items: ['tel', 'keys'], total: 1500 };\nconst res = fn(orderData);\nif (!res || res.id !== 501 || res.city !== 'Samarqand') return 'id yoki ichki customer.city noto\\'g\\'ri ochildi';\nif (!res.details || res.details.total !== 1500 || res.details.customer !== undefined) return 'Rest operatori yordamida qolgan xossalar details obyektiga to\\'g\\'ri yig\\'ilmadi';\nreturn null;"
    },
    {
      id: 4,
      title: "Ikki o'zgaruvchining o'rnini almashtirish",
      instruction: "`a` va `b` o'zgaruvchilarini massiv destruptizatsiyasi yordamida almashtirib, `[b, a]` ni qaytaradigan `swapVariables(a, b)` yozing.",
      startingCode: "function swapVariables(a, b) {\n  // Kodni yozing\n}",
      hint: "return [a, b] = [b, a];",
      test: "const fn = new Function(code + '; return swapVariables;')(); const r = fn(1, 2); if(r[0]!==2 || r[1]!==1) return 'Xato'; return null;"
    },
    {
      id: 5,
      title: "Massivdan birinchi va uchinchi",
      instruction: "Uchta elementli massiv keladi. Birinchi va uchinchi elementlarni olib (ikkinchisini tashlab), ularni yangi massiv qilib qaytaruvchi `getFirstAndThird(arr)` yozing.",
      startingCode: "function getFirstAndThird(arr) {\n  // Kodni yozing\n}",
      hint: "const [first, , third] = arr; return [first, third];",
      test: "const fn = new Function(code + '; return getFirstAndThird;')(); const r = fn([10,20,30]); if(r[0]!==10||r[1]!==30) return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "Rest operatori bilan massiv",
      instruction: "Massiv qabul qilib, uning birinchi elementini olib, qolgan hamma elementlarini bitta alohida massiv qilib [first, restArr] ko'rinishida qaytaruvchi `headAndTail(arr)` tuzing.",
      startingCode: "function headAndTail(arr) {\n  // Kodni yozing\n}",
      hint: "const [head, ...tail] = arr; return [head, tail];",
      test: "const fn = new Function(code + '; return headAndTail;')(); const r=fn([1,2,3]); if(r[0]!==1 || r[1][0]!==2) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Funksiya parametridagi obyekt",
      instruction: "Funksiya `{name, age}` qabul qiladi. Faqat age ni qaytarsin. `getAge({name, age})` degan funksiya argumentida destructuring ishlating.",
      startingCode: "function getAge({ /* kodni yozing */ }) {\n  // Kodni yozing\n}",
      hint: "getAge({ age }) { return age; }",
      test: "const fn = new Function(code + '; return getAge;')(); if(fn({name:'Ali', age:25}) !== 25) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Default Qiymatlar (Massiv)",
      instruction: "Massiv keladi, unda 1 ta yo 2 ta element bo'lishi mumkin. Ularni olib a, b ga yozing, agar b yo'q bo'lsa `0` qilib bering. Va ularni yig'indisini qaytaring `sumTwo(arr)`.",
      startingCode: "function sumTwo(arr) {\n  // Kodni yozing\n}",
      hint: "const [a, b = 0] = arr; return a + b;",
      test: "const fn = new Function(code + '; return sumTwo;')(); if(fn([5])!==5 || fn([5,3])!==8) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "Obyektni o'zgarmas qilib birlashtirish (Spread)",
      instruction: "`obj1` va `obj2` keladi, ularni destructuring/spread orqali bitta qilib qaytaruvchi `mergeObj(obj1, obj2)` yozing.",
      startingCode: "function mergeObj(obj1, obj2) {\n  // Kodni yozing\n}",
      hint: "return { ...obj1, ...obj2 };",
      test: "const fn = new Function(code + '; return mergeObj;')(); const r=fn({a:1},{b:2}); if(r.a!==1 || r.b!==2) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Ko'p qavatli Destructuring",
      instruction: "`{ user: { address: { city } } }` obyektidan faqat city ni olib qaytaradigan `getCity(data)` yozing.",
      startingCode: "function getCity(data) {\n  // Kodni yozing\n}",
      hint: "const { user: { address: { city } } } = data; return city;",
      test: "const fn = new Function(code + '; return getCity;')(); if(fn({user:{address:{city:'Tashkent'}}}) !== 'Tashkent') return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da destruptizatsiya (destructuring) nima?",
      options: [
        "Massivlarni o'chirish va obyektlarni xotiradan tozalash usuli",
        "Massiv elementlari va obyekt xossalarini alohida o'zgaruvchilarga oson ajratib olish (ochish) sintaksisi",
        "Obyektlarni yangi class-ga o'tkazish uchun mo'ljallangan metod",
        "Obyekt qiymatlarini faqat o'qish uchun bloklovchi operator"
      ],
      correctAnswer: 1,
      explanation: "Destructuring (ma'lumotlarni ochish) massiv yoki obyekt ichidagi qiymatlarni bitta qatorda alohida o'zgaruvchilarga o'zlashtirish imkonini beruvchi qulay ES6 sintaksisidir."
    },
    {
      id: 2,
      question: "Quyidagi kod bajarilgandan keyin konsolga nima chiqadi?\n```javascript\nconst colors = ['red', 'green', 'blue'];\nconst [, color] = colors;\nconsole.log(color);\n```",
      options: [
        "red",
        "green",
        "blue",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Massiv destruptizatsiyasida vergullar orqali elementlarni tashlab ketish mumkin. Birinchi element tashlab ketilgan (red), shuning uchun color o'zgaruvchisiga ikkinchi element ya'ni 'green' yuklanadi."
    },
    {
      id: 3,
      question: "Obyektni destruptizatsiya qilishda o'zgaruvchini boshqa nom bilan saqlash (qayta nomlash) qanday sintaksis orqali amalga oshiriladi?",
      options: [
        "const { oldName as newName } = obj;",
        "const { oldName: newName } = obj;",
        "const { oldName -> newName } = obj;",
        "const { oldName = newName } = obj;"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da obyekt xossalarini qayta nomlash uchun ikki nuqta (:) operatori ishlatiladi, masalan: const { oldName: newName } = obj;."
    },
    {
      id: 4,
      question: "Obyektda mavjud bo'lmagan xossa destruptizatsiya qilinganda unga standart (default) qiymat qanday beriladi?",
      options: [
        "const { role = 'guest' } = user;",
        "const { role: 'guest' } = user;",
        "const { role as 'guest' } = user;",
        "const { role == 'guest' } = user;"
      ],
      correctAnswer: 0,
      explanation: "Default qiymat berish uchun tenglik (=) belgisidan foydalaniladi. Agarda obyektda role xossasi bo'lmasa yoki undefined bo'lsa, unga 'guest' biriktiriladi."
    },
    {
      id: 5,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst user = { name: 'Ali', age: 25 };\nconst { name: userName, age } = user;\nconsole.log(name);\n```",
      options: [
        "Ali",
        "25",
        "ReferenceError yoki xatolik yuz beradi",
        "undefined"
      ],
      correctAnswer: 2,
      explanation: "Obyekt xossasini name: userName ko'rinishida qayta nomlaganimizda, faqat yangi yaratilgan userName o'zgaruvchisi mavjud bo'ladi. name nomli o'zgaruvchi umuman yaratilmaganligi sababli ReferenceError yuzaga keladi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilgandan keyin x va y ning qiymati nima bo'ladi?\n```javascript\nlet x = 5, y = 10;\n[x, y] = [y, x];\n```",
      options: [
        "x = 5, y = 10",
        "x = 10, y = 5",
        "x = 10, y = 10",
        "x = 5, y = 5"
      ],
      correctAnswer: 1,
      explanation: "Massiv destruptizatsiyasida yordamida o'zgaruvchilar qiymatini uchinchi vaqtinchalik o'zgaruvchisiz osongina almashtirish mumkin. [x, y] = [y, x] yozilganda x 10 ga, y esa 5 ga teng bo'ladi."
    },
    {
      id: 7,
      question: "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nconst { email } = null;\n```",
      options: [
        "email o'zgaruvchisi undefined bo'ladi",
        "email o'zgaruvchisi null bo'ladi",
        "TypeError (Cannot destructure property of null) yuz beradi",
        "Dastur xatoliksiz, jimgina ishini davom ettiradi"
      ],
      correctAnswer: 2,
      explanation: "null va undefined qiymatlarini destruptizatsiya qilib bo'lmaydi, chunki ulardan xossalarni o'qib bo'lmaydi. Bu TypeError xatoligiga olib keladi."
    },
    {
      id: 8,
      question: "Rest operatori (...rest) yordamida obyektning qolgan xossalarini ajratib olayotganda qaysi shart bajarilishi majburiy?",
      options: [
        "Rest operatoridan faqat bitta xossani olishda foydalanish mumkin",
        "Rest operatori har doim destruptizatsiya ro'yxatining eng oxirida yozilishi shart",
        "Rest operatori faqat birinchi indeksda turishi kerak",
        "Rest operatori faqat sonli xossalar uchun ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Rest operatori (...rest) qolgan barcha xossalarni yig'ib olishi uchun u har doim destruptizatsiya sintaksisida eng oxirgi element bo'lib kelishi shart."
    },
    {
      id: 9,
      question: "Quyidagi kod bajarilgach rest ning qiymati nima bo'ladi?\n```javascript\nconst [first, ...rest] = [1, 2, 3, 4];\n```",
      options: [
        "2",
        "[2, 3, 4]",
        "[3, 4]",
        "[1, 2, 3, 4]"
      ],
      correctAnswer: 1,
      explanation: "Massiv destruptizatsiyasida rest operatori qolgan barcha elementlarni yangi massivga yig'adi. Shuning uchun rest massiv ko'rinishida [2, 3, 4] bo'ladi."
    },
    {
      id: 10,
      question: "Ichma-ich (nested) joylashgan xossalarni destruptizatsiya qilishda qanday xavf bor?",
      options: [
        "Ichki obyektlar har doim readonly bo'lib qoladi",
        "Agar tashqi obyekt mavjud bo'lmasa (undefined bo'lsa), TypeError yuzaga keladi",
        "Ichki destruptizatsiya kodni sekinlashtiradi va xotirani to'ldiradi",
        "Faqat bitta darajagacha ichkariga kirish mumkin"
      ],
      correctAnswer: 1,
      explanation: "Ichma-ich destruptizatsiyada (masalan, const { address: { city } } = user;), agar address xossasi mavjud bo'lmasa (undefined bo'lsa), undefineddan cityni o'qishga urinish tufayli TypeError yuz beradi."
    },
    {
      id: 11,
      question: "Quyidagi kod bajarilgandan keyin city o'zgaruvchisining qiymati nima bo'ladi?\n```javascript\nconst user = { name: 'Vali' };\nconst { address: { city } = { city: 'Toshkent' } } = user;\n```",
      options: [
        "undefined",
        "Toshkent",
        "TypeError",
        "ReferenceError"
      ],
      correctAnswer: 1,
      explanation: "user obyektida address xossasi mavjud bo'lmagani (undefined bo'lgani) uchun default qiymat sifatida berilgan { city: 'Toshkent' } obyekti ishlatiladi va undan city qiymati ochib olinib, 'Toshkent'ga teng bo'ladi."
    },
    {
      id: 12,
      question: "Satrni (string) destruptizatsiya qilish mumkinmi? Masalan: `const [char1, char2] = \"JS\";`",
      options: [
        "Yo'q, faqat obyekt va massivlarni destruptizatsiya qilish mumkin",
        "Ha, chunki satrlar iteratsiya qilinuvchi (iterable) obyektlardir, char1 'J' va char2 'S' bo'ladi",
        "Faqat typeof 'object' bo'lgan satrlarda ishlaydi",
        "Ha, lekin ikkala o'zgaruvchi ham butun satrni oladi"
      ],
      correctAnswer: 1,
      explanation: "Satrlar (strings) iteratsiya qilinuvchi obyektlar bo'lgani sababli ularni xuddi massivlar kabi destruptizatsiya qilish mumkin. Natijada har bir belgi alohida o'zgaruvchiga o'zlashtiriladi."
    }
  ]
};
