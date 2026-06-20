export const arrays = {
  id: "arrays",
  title: "Massivlar (Arrays) va Ularning Metodlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Massiv (Array) nima?
**Massiv (Array)** — bu bir nechta qiymatlarni (elementlarni) ma'lum bir tartibda o'zida saqlaydigan maxsus ma'lumotlar strukturasidir. Oddiy o'zgaruvchi faqat bitta qiymatni saqlay olsa, massiv bitta nom ostida yuzlab yoki minglab qiymatlarni tartiblangan ro'yxat ko'rinishida saqlashi mumkin. Massivdagi har bir element o'zining joylashuv tartibiga ega bo'lib, u **indeks (index)** deb ataladi. Dasturlashda indekslash har doim **0 dan boshlanadi**.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **poyezd bekatidasiz**:
* **O'zgaruvchi** — bu faqat bitta odam sig'adigan kichkina taksi.
* **Massiv (Array)** — bu ketma-ket ulangan ko'plab vagonlardan iborat yuk poyezdi.
  * Har bir vagonning o'z tartib raqami (indeksi) bor: birinchi vagon 0-indeks, ikkinchisi 1-indeks va hokazo.
  * Har bir vagon ichida har xil yuklar (ma'lumotlar: sonlar, matnlar yoki obyektlar) saqlanishi mumkin.
  * Agar siz poyezd oxiriga yangi vagon qo'shmoqchi bo'lsangiz (\`push\`) yoki boshidagi vagonni uzib tashlamoqchi bo'lsangiz (\`shift\`), bu butun poyezdning umumiy uzunligiga va vagonlar indekslariga ta'sir qiladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Massiv yaratish va elementlarga murojaat)
Massiv literalidan foydalanib oddiy massiv yaratish va uning elementlarini olish/o'zgartirish:
\`\`\`javascript
// Massiv yaratish
const colors = ['red', 'green', 'blue'];

// Elementlarga indeks orqali murojaat qilish
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
console.log(colors[3]); // undefined (bunday indeks mavjud emas)

// Element qiymatini o'zgartirish
colors[1] = 'yellow';
console.log(colors); // ['red', 'yellow', 'blue']

// Massiv uzunligi
console.log(colors.length); // 3
\`\`\`

### 2. Intermediate Example (Massiv oxiridan va boshidan element qo'shish/o'chirish)
Massiv uzunligini dynamic o'zgartiruvchi asosiy mutator metodlar (\`push\`, \`pop\`, \`shift\`, \`unshift\`):
\`\`\`javascript
const todoList = ['Dars qilish', 'Kitob o\\'qish'];

// 1. push() - massiv oxiriga element qo'shadi
todoList.push('Yugurish'); 
console.log(todoList); // ['Dars qilish', 'Kitob o\\'qish', 'Yugurish']

// 2. pop() - massiv oxiridan elementni o'chiradi va o'chirilgan qiymatni qaytaradi
const lastTodo = todoList.pop();
console.log(lastTodo);  // "Yugurish"
console.log(todoList); // ['Dars qilish', 'Kitob o\\'qish']

// 3. unshift() - massiv boshiga element qo'shadi
todoList.unshift('Choy ichish');
console.log(todoList); // ['Choy ichish', 'Dars qilish', 'Kitob o\\'qish']

// 4. shift() - massiv boshidan elementni o'chiradi va o'chirilgan qiymatni qaytaradi
const firstTodo = todoList.shift();
console.log(firstTodo); // "Choy ichish"
console.log(todoList);  // ['Dars qilish', 'Kitob o\\'qish']
\`\`\`

### 3. Advanced Example (Splice, Slice va Qidiruv metodlari)
Massiv elementlarini qirqib olish, almashtirish va massiv ichidan elementlarni qidirish:
\`\`\`javascript
const members = ['Ali', 'Vali', 'Sardor', 'Olim', 'Rustam'];

// 1. slice() - massivning ma'lum qismidan nusxa oladi (asl massiv o'zgarmaydi)
const team = members.slice(1, 4); 
console.log(team);    // ['Vali', 'Sardor', 'Olim'] (1-indeksdan 4-indeksgacha, 4 kirmaydi)
console.log(members); // original o'zgarmadi

// 2. splice() - massiv tarkibini o'zgartiradi (elementlarni o'chiradi, qo'shadi yoki almashtiradi)
// 2-indeksdan boshlab 2 ta elementni o'chirish va o'rniga 'Eldor'ni qo'shish:
const deleted = members.splice(2, 2, 'Eldor');
console.log(deleted); // ['Sardor', 'Olim'] (o'chirilgan elementlar)
console.log(members); // ['Ali', 'Vali', 'Eldor', 'Rustam'] (original o'zgardi!)

// 3. indexOf() va includes() - qidiruv metodlari
console.log(members.indexOf('Vali'));    // 1 (indeksini qaytaradi)
console.log(members.indexOf('Anvar'));   // -1 (topilmasa -1)
console.log(members.includes('Eldor'));  // true (bor bo'lsa true, yo'q bo'lsa false)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript-da massivlarning haqiqiy tabiati
C, C++ yoki Java kabi statik dasturlash tillarida massivlar xotiraning ketma-ket kelgan yagona blokida (contiguous block of memory) saqlanadi va ularning hajmi e'lon qilinganda qat'iy belgilab qo'yiladi.
JavaScript-da esa vaziyat butunlay boshqacha:
1. **Massivlar aslida Obyektlardir:** JavaScript-da massivlar o'ziga xos tarzda ishlovchi obyektlardir. Ularning indekslari (\`0\`, \`1\`, \`2\`...) aslida obyektning kalitlari (string properties) hisoblanadi. Ya'ni \`arr[0]\` yozuvi xotira darajasida \`arr['0']\` ko'rinishida ishlaydi.
2. **Dynamic va Heterogen:** Massiv o'lchami oldindan belgilanmaydi va u dynamic tarzda o'sishi mumkin. Massiv ichida bir vaqtning o'zida har xil ma'lumot turlarini (\`number\`, \`string\`, \`object\`, \`function\`) saqlash mumkin.
3. **\`length\` xususiyatining ishlashi:** Massivning \`length\` xossasi faqatgina elementlar sonini hisoblamaydi, u har doim **massivdagi eng katta indeks + 1** ga teng bo'ladi. Agar siz \`length\`ni qo'lda kichraytirsangiz, massiv oxiridagi elementlar o'chib ketadi.

### V8 Dvigatelining Optimizatsiyasi (Fast vs Dictionary Elements)
JavaScript massivlari oddiy obyekt bo'lsa, ulardan element o'qish juda sekin bo'lishi kerak edi. Shuning uchun JavaScript dvigatellari (masalan, Chrome-dagi V8) massivlarni optimallashtiradi:
* **Fast Elements (Zich massivlar):** Agar massiv elementlari bir xil turdagi ma'lumotlardan tashkil topsa va indekslari ketma-ket kelgan bo'lsa (masalan: \`[1, 2, 3, 4]\`), dvigatel ularni xuddi C tilidagi kabi xotiraning ketma-ket blokida saqlaydi. Bu elementlarga juda tez kirish imkonini beradi.
* **Dictionary Elements / Sparse Arrays (Siyrak massivlar):** Agar massivda indekslar oralig'ida bo'shliqlar bo'lsa (masalan: \`arr[0] = 1; arr[1000] = 2;\`), dvigatel uni zich saqlay olmaydi. U massivni oddiy **Hash Map (kalit-qiymat lug'ati)** ko'rinishiga o'tkazadi. Bu xotirani tejaydi, lekin ishlash tezligini pasaytiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Massiv elementini o'chirishda \`delete\` operatoridan foydalanish
* **Noto'g'ri (Siyrak massiv hosil qiladi):**
  \`\`\`javascript
  const arr = [10, 20, 30];
  delete arr[1]; // 20 o'chiriladi, lekin...
  console.log(arr); // [10, <1 empty item>, 30]
  console.log(arr.length); // 3 (uzunlik o'zgarmadi!)
  console.log(arr[1]); // undefined (lekin xotirada joy turibdi)
  \`\`\`
* **To'g'ri (Splice yoki Filter ishlatish):**
  \`\`\`javascript
  const arr = [10, 20, 30];
  arr.splice(1, 1); // 1-indeksdagi 1 ta elementni butunlay o'chirish
  console.log(arr); // [10, 30]
  console.log(arr.length); // 2
  \`\`\`

### 2. Massivlarni \`===\` yordamida qiymat bo'yicha solishtirish
* **Noto'g'ri:**
  \`\`\`javascript
  const a = [1, 2];
  const b = [1, 2];
  console.log(a === b); // false (chunki xotiradagi manzillar boshqa)
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const a = [1, 2];
  const b = [1, 2];
  // Qiymatlarni va uzunlikni solishtirish:
  const areEqual = a.length === b.length && a.every((val, index) => val === b[index]);
  console.log(areEqual); // true
  \`\`\`

### 3. Mavjud bo'lmagan indeks xossasiga murojaat qilish (TypeError)
* **Noto'g'ri (Dasturni to'xtatib qo'yadigan xato):**
  \`\`\`javascript
  const users = [{ name: 'Ali' }];
  // users[1] - undefined qaytaradi, uning ichidan name ni o'qish esa error beradi
  console.log(users[1].name); // TypeError: Cannot read properties of undefined
  \`\`\`
* **To'g'ri (Optional Chaining yoki shartli tekshirish):**
  \`\`\`javascript
  const users = [{ name: 'Ali' }];
  console.log(users[1]?.name); // undefined qaytaradi (xato bermaydi)
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Darajasi (1–4)
1. **Savol:** Massiv (Array) nima va u oddiy obyektlardan qanday farq qiladi?
   * **Javob:** Massiv ham obyekt turi hisoblanadi. U tartiblangan ma'lumotlarni kalit sifatida 0 dan boshlanadigan butun sonlar (indekslar) yordamida saqlaydi va dynamic ravishda o'zgarib boruvchi maxsus \`length\` xususiyatiga ega.
2. **Savol:** Massiv oxiriga element qo'shish/o'chirish va boshiga qo'shish/o'chirish metodlarini sanab bering.
   * **Javob:** Oxiriga qo'shish: \`push()\`, oxiridan o'chirish: \`pop()\`. Boshiga qo'shish: \`unshift()\`, boshidan o'chirish: \`shift()\`.
3. **Savol:** \`arr.length = 0\` amali bajarilganda nima sodir bo'ladi?
   * **Javob:** Massiv to'liq tozalanadi (bo'shab qoladi), undagi barcha elementlar o'chib ketadi.
4. **Savol:** E'lon qilingan \`const arr = [1, 2]\` massiviga yangi element qo'shsa bo'ladimi? \`const\` xatolik bermaydimi?
   * **Javob:** Ha, yangi element qo'shish mumkin. Chunki \`const\` faqat massivning xotiradagi manziliga (reference) boshqa yangi massiv yoki qiymat biriktirishni taqiqlaydi, massiv ichidagi elementlarni o'zgartirishni emas.

### Middle Darajasi (5–8)
5. **Savol:** \`slice()\` va \`splice()\` metodlarining asosiy farqi nimada?
   * **Javob:** \`slice()\` massivning belgilangan qismidan nusxa oladi va yangi massiv qaytaradi, asl massivni o'zgartirmaydi (pure function). \`splice()\` esa elementlarni o'chirish, qo'shish yoki almashtirish orqali asl massiv tarkibini bevosita o'zgartiradi (mutates array).
6. **Savol:** Massivni qanday usullar bilan to'liq yoki qisman nusxalash (shallow copy) mumkin?
   * **Javob:** Spread operator yordamida \`[...arr]\`, argumentsiz \`arr.slice()\` metodi yordamida yoki \`Array.from(arr)\` yordamida.
7. **Savol:** Massivda ma'lum bir element mavjudligini tekshirish uchun qaysi metodlardan foydalanish afzal?
   * **Javob:** Agar faqat bor/yo'qligini tekshirish kerak bo'lsa, \`.includes()\` (true/false). Agar element indeksini bilish kerak bo'lsa, \`.indexOf()\` (indeks yoki -1) ishlatiladi.
8. **Savol:** "Sparse Array" (siyrak massiv) nima va u qanday hosil bo'ladi?
   * **Javob:** Bu elementlari orasida bo'shliqlar (empty slots) bo'lgan massivdir. Masalan, massiv yaratib to'g'ridan-to'g'ri katta indeksga qiymat berilsa (\`arr[10] = 'test'\`), yoki o'chirishda \`delete arr[2]\` ishlatilsa hosil bo'ladi.

### Senior Darajasi (9–12)
9. **Savol:** Nima uchun \`push()\`/\`pop()\` amallari \`shift()\`/\`unshift()\` amallariga qaraganda tezroq ishlaydi?
   * **Javob:** \`push()\` va \`pop()\` faqat massiv oxiri bilan ishlaydi va mavjud elementlarning xotiradagi o'rnini o'zgartirmaydi ($O(1)$). \`shift()\` va \`unshift()\` esa boshiga ta'sir qilgani uchun barcha qolgan elementlarni xotirada bitta indeks oldinga yoki orqaga surishga majbur qiladi ($O(N)$).
10. **Savol:** V8 dvigateli kontekstida "Fast Elements" va "Dictionary Elements" (yoki Hash Map representation) farqini tushuntiring.
    * **Javob:** Zich va homogeneous (bir xil tipli) massivlar V8 tomonidan xotirada ketma-ketlikda ("Fast Elements") saqlanadi va juda tez ishlaydi. Siyrak (sparse) va heterogenous massivlar esa sekinroq ishlovchi obyekt lug'atlari ("Dictionary Elements") shakliga o'tkaziladi.
11. **Savol:** Massivlarni chuqur nusxalash (Deep Copy) va yuzaki nusxalash (Shallow Copy) farqi nimada va ularni massivlar uchun qanday bajaramiz?
    * **Javob:** Shallow copy (\`[...]\`) faqat massivning birinchi darajali elementlarini nusxalaydi, agar uning ichida boshqa ichki obyekt yoki massiv bo'lsa, ularning havolasi (reference) nusxalanadi va ular o'zaro bog'liq qoladi. Deep copy esa ichki obyektlar bilan birga to'liq yangi nusxa yaratadi. Buni zamonaviy JSda \`structuredClone(arr)\` yordamida amalga oshirish mumkin.
12. **Savol:** Massiv elementlari bo'sh (\`empty\`) ekanligini va \`undefined\` qiymatga ega ekanligini qanday farqlash mumkin?
    * **Javob:** \`empty\` (hole) elementlar massiv kaliti sifatida umuman mavjud bo'lmaydi. Uni \`index in arr\` (masalan, \`2 in arr\`) yoki \`arr.hasOwnProperty(index)\` yordamida tekshirish mumkin. Agar element rostdan mavjud bo'lsa-yu, qiymati \`undefined\` bo'lsa, \`in\` operatori \`true\` qaytaradi, bo'sh (empty slot) bo'lsa \`false\` qaytaradi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi massiv mutatsiyalarining massiv uzunligiga (\`length\`) va elementlarning indekslariga ko'rsatadigan ta'sirini grafik shaklda tasvirlaydi. Boshdan bajariladigan amallar nima uchun sekinroq ($O(N)$) ekanligini indekslarning siljishi orqali tushunishingiz mumkin:

\`\`\`mermaid
graph TD
    subgraph OriginalState [Original Massiv: length = 3]
        style OriginalState fill:#f9f9f9,stroke:#333,stroke-width:2px
        Orig["['A', 'B', 'C'] <br/> indeks: 0, 1, 2"]
    end

    OriginalState -->|push 'D' <br/> Oxiridan qo'shish O1| PushAction["['A', 'B', 'C', 'D'] <br/> length: 4 <br/> (Indekslar o'zgarmaydi, tez ishlaydi)"]
    OriginalState -->|pop <br/> Oxiridan o'chirish O1| PopAction["['A', 'B'] <br/> length: 2 <br/> (Indekslar o'zgarmaydi, tez ishlaydi)"]

    OriginalState -->|unshift 'Z' <br/> Boshidan qo'shish ON| UnshiftAction["['Z', 'A', 'B', 'C'] <br/> length: 4 <br/> (Barcha indekslar +1 ga siljiydi - sekin)"]
    OriginalState -->|shift <br/> Boshidan o'chirish ON| ShiftAction["['B', 'C'] <br/> length: 2 <br/> (Barcha indekslar -1 ga siljiydi - sekin)"]

    style PushAction fill:#e6f7ff,stroke:#1890ff,stroke-width:1px
    style PopAction fill:#e6f7ff,stroke:#1890ff,stroke-width:1px
    style UnshiftAction fill:#fff7e6,stroke:#ffa940,stroke-width:1px
    style ShiftAction fill:#fff7e6,stroke:#ffa940,stroke-width:1px
\`\`\`

* **Push/Pop:** Massiv oxiridagi o'zgarishlar faqat oxirgi elementga ta'sir qiladi. Boshqa elementlar o'z o'rnida qoladi.
* **Shift/Unshift:** Massiv boshiga ta'sir etuvchi amallar har bir elementning indeksini o'zgartirishni talab qiladi. Dvigatel orqa fonda barcha elementlarni xotirada surib chiqadi, bu esa massiv kattalashgan sari sekinlashadi.

---

## 7. 📝 12 ta Mini Test

Darsimizning quizzes bo'limida massiv metodlari, xususiyatlari, xotira xulq-atvori va amaliy vaziyatlar bo'yicha tayyorlangan 12 ta test savolini yechib, bilimingizni sinab ko'ring. Har bir savolda to'g'ri javob bilan birga batafsil tushuntirish berilgan.

---

## 8. 🎯 Real Project Case Study

### Tizim jurnali (Buffer Log) va "Undo" harakatlari tarixi
Real loyihalarda massivlar yordamida foydalanuvchining oxirgi bajargan harakatlari ro'yxatini (History/Undo Stack) yoki tizim loglarini saqlash mumkin. Bu yerda xotirani cheklash muhim. Biz faqat oxirgi 5 ta harakatni saqlab qoladigan dynamic log tizimi misolini ko'ramiz:

\`\`\`javascript
class ActionHistory {
  constructor(maxSize = 5) {
    this.history = [];
    this.maxSize = maxSize;
  }

  // Yangi harakat qo'shish
  add(action) {
    this.history.push(action); // Harakatni oxiriga qo'shadi
    console.log(\`Qo'shildi: \${action}\`);

    // Agar limitdan oshib ketsa, eng eskisini boshidan o'chirib yuboradi
    if (this.history.length > this.maxSize) {
      const removed = this.history.shift(); // 0-indeksdagi element o'chiriladi
      console.log(\`Limit oshdi! Eng eski harakat o'chirildi: \${removed}\`);
    }
  }

  // Tarixni ko'rish
  getHistory() {
    return [...this.history]; // Massiv havolasini himoya qilish uchun nusxa qaytaramiz
  }
}

// Foydalanish:
const userHistory = new ActionHistory(3); // Maksimim 3 ta harakat saqlaymiz

userHistory.add("Sahifaga kirdi");
userHistory.add("Profilni tahrirladi");
userHistory.add("Rasmni yukladi");
console.log("Hozirgi tarix:", userHistory.getHistory()); 
// ['Sahifaga kirdi', 'Profilni tahrirladi', 'Rasmni yukladi']

userHistory.add("Parolni o'zgartirdi"); // Limit oshadi! "Sahifaga kirdi" o'chiriladi.
console.log("Yangi tarix:", userHistory.getHistory()); 
// ['Profilni tahrirladi', 'Rasmni yukladi', 'Parolni o'zgartirdi']
\`\`\`

---

## 9. 🚀 Performance va Optimization

Massiv bilan ishlashda uning metodlari vaqt murakkabligini (Time Complexity) bilish kod samaradorligini oshiradi:

1. **Indeks orqali element o'qish/yozish ($O(1)$):** Massivdagi istalgan elementni indeksi bo'yicha olish (masalan \`arr[500]\`) xotira manzilini darhol hisoblagani sababli doimiy vaqt oladi.
2. **Push/Pop ($O(1)$ amortizatsiyalangan):** Massiv oxiridan element qo'shish yoki olish eng tezkor operatsiyalardir. V8 massiv uchun xotirada biroz qo'shimcha joy ajratib qo'ygani uchun ko'pincha bu amal zudlik bilan bajariladi.
3. **Shift/Unshift ($O(N)$):** Har safar massiv boshiga element qo'shilganda yoki olib tashlanganda, barcha $N$ ta element indekslari qayta yozilishi kerak. Bu massiv hajmi kattalashgan sari samarasiz bo'ladi.
4. **Splice ($O(N)$):** Element o'chirilgan yoki qo'shilgan joydan boshlab undan keyingi barcha elementlar siljitilishi kerak bo'ladi.
5. **Includes/IndexOf ($O(N)$):** Elementni topish uchun massiv boshidan oxirigacha qidirib chiqiladi (Chiziqli qidiruv - Linear Search), shuning uchun eng yomon holatda butun massiv aylanib chiqiladi.

> [!TIP]
> Agar dasturda tez-tez massiv boshidan ma'lumot qo'shish va o'chirish kerak bo'lsa, massiv o'rniga **Double-ended Queue (Deq)** yoki **Linked List (Bog'langan ro'yxat)** ma'lumotlar strukturasidan foydalanish tavsiya etiladi.

---

## 10. 📌 Cheat Sheet

| Metod | Nima qiladi? | Asl massivni o'zgartiradimi? (Mutation) | Qaytargan qiymati | Vaqt murakkabligi (Big O) |
| :--- | :--- | :--- | :--- | :--- |
| **\`push(el)\`** | Oxiriga element qo'shadi | **Ha** | Yangi massiv uzunligi (\`length\`) | $O(1)$ |
| **\`pop()\`** | Oxiridan elementni o'chiradi | **Ha** | O'chirilgan element qiymati | $O(1)$ |
| **\`unshift(el)\`** | Boshiga element qo'shadi | **Ha** | Yangi massiv uzunligi (\`length\`) | $O(N)$ |
| **\`shift()\`** | Boshidan elementni o'chiradi | **Ha** | O'chirilgan element qiymati | $O(N)$ |
| **\`slice(start, end)\`**| Massiv qismidan nusxa oladi | Yo'q | Yangi massiv nusxasi | $O(N)$ |
| **\`splice(start, count, ...items)\`** | Elementlarni o'chiradi/qo'shadi | **Ha** | O'chirilgan elementlar massivi | $O(N)$ |
| **\`indexOf(el)\`** | Element indeksini qidiradi | Yo'q | Element indeksi yoki \`-1\` | $O(N)$ |
| **\`includes(el)\`** | Element borligini tekshiradi | Yo'q | Mantiqiy qiymat (\`true\`/\`false\`) | $O(N)$ |
| **\`concat(arr2)\`** | Massivlarni birlashtiradi | Yo'q | Yangi birlashgan massiv | $O(N + M)$ |
| **\`join(separator)\`** | Massivni satrga (string) o'tkazadi | Yo'q | Yig'ilgan satr (string) | $O(N)$ |
`,
  exercises: [
  {
    "id": 1,
    "title": "Navbat (Queue) Simulyatsiyasi",
    "instruction": "Massivni boshqaruvchi `manageQueue(arr, element)` funksiyasini yozing. Funksiya berilgan `arr` massivining oxiriga `element`ni qo'shishi, so'ngra massivning birinchi elementini o'chirib, o'sha o'chirilgan elementni qaytarishi kerak (massiv o'zgarishi kerak).",
    "startingCode": "function manageQueue(arr, element) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "push yordamida elementni oxiriga qo'shing, shift yordamida birinchi elementni o'chiring va uni return qiling.",
    "test": "const sandbox = new Function(code + '; return manageQueue;');\nconst fn = sandbox();\nconst testArr = [1, 2, 3];\nconst removed = fn(testArr, 4);\nif (removed !== 1) return 'manageQueue birinchi elementni to\\'g\\'ri o\\'chirmadi yoki qaytarmadi';\nif (testArr.length !== 3 || testArr[0] !== 2 || testArr[2] !== 4) return 'manageQueue elementni oxiriga qo\\'shmadi yoki massiv tarkibini to\\'g\\'ri o\\'zgartirmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Massivdan nusxa olish va kesish",
    "instruction": "Berilgan massivning boshidan va oxiridan ma'lum miqdordagi elementlarni olib tashlab, o'rtadagi qismidan nusxa qaytaruvchi `getMiddlePart(arr, startCount, endCount)` funksiyasini yozing. Masalan: `getMiddlePart([1, 2, 3, 4, 5], 1, 1)` chaqirilganda boshidan 1 ta, oxiridan 1 ta element olib tashlanadi va `[2, 3, 4]` qaytariladi. Asl massiv o'zgarmasligi shart.",
    "startingCode": "function getMiddlePart(arr, startCount, endCount) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "slice metodidan foydalaning. Slice asl massivni o'zgartirmaydi. arr.slice(startCount, arr.length - endCount) deb yozishingiz mumkin.",
    "test": "const sandbox = new Function(code + '; return getMiddlePart;');\nconst fn = sandbox();\nconst original = [10, 20, 30, 40, 50, 60];\nconst result = fn(original, 2, 1);\nif (original.length !== 6) return 'Asl massiv o\\'zgarmasligi kerak';\nif (!Array.isArray(result) || result.length !== 3 || result[0] !== 30 || result[2] !== 50) return 'getMiddlePart o\\'rtadagi elementlarni to\\'g\\'ri qaytarmadi. Kutilgan: [30, 40, 50], olingan: ' + JSON.stringify(result);\nreturn null;"
  },
  {
    "id": 3,
    "title": "Elementni almashtirish (Splice)",
    "instruction": "Berilgan `arr` massivida `oldVal` qiymatini izlab toping va uning birinchi uchragan indeksida uni o'chirib, o'rniga `newVal`ni joylashtiradigan `replaceElement(arr, oldVal, newVal)` funksiyasini yozing. Agar `oldVal` topilmasa, massiv o'zgarmasin. Funksiya o'zgartirilgan massivni qaytarsin (massiv joyida (in-place) o'zgarishi kerak).",
    "startingCode": "function replaceElement(arr, oldVal, newVal) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "indexOf orqali element indeksini toping. Agar indeks -1dan farqli bo'lsa, splice(index, 1, newVal) yordamida uni almashtiring va massivni qaytaring.",
    "test": "const sandbox = new Function(code + '; return replaceElement;');\nconst fn = sandbox();\nconst testArr = ['olma', 'anor', 'behi'];\nconst result = fn(testArr, 'anor', 'shaftoli');\nif (testArr !== result) return 'replaceElement funksiyasi o\\'zgartirilgan asl massivni qaytarishi kerak';\nif (testArr[1] !== 'shaftoli' || testArr.length !== 3) return 'replaceElement qiymatni to\\'g\\'ri almashtirmadi';\nconst notFound = fn(testArr, 'anjir', 'olxo\\'ri');\nif (notFound.length !== 3 || notFound[1] !== 'shaftoli') return 'Topilmagan element bo\\'lsa massiv o\\'zgarmasligi kerak';\nreturn null;"
  },
  {
    "id": 4,
    "title": "Massivdagi Eng Katta Element",
    "instruction": "Faqat sonlardan iborat massiv berilgan. Massivdagi eng katta sonni qaytaradigan `findMax(arr)` yozing.",
    "startingCode": "function findMax(arr) {\n  // Kodni yozing\n}",
    "hint": "Math.max(...arr) orqali yechish juda oson yoki sikl ishlating.",
    "test": "const fn = new Function(code + '; return findMax;')(); if(fn([1, 5, 3]) !== 5) return 'Xato'; if(fn([-10, -2, -5]) !== -2) return 'Manfiy sonlarda xato'; return null;"
  },
  {
    "id": 5,
    "title": "Barcha Elementlar Yig'indisi",
    "instruction": "Sonlardan iborat massiv berilgan. Ularning yig'indisini qaytaruvchi `sumArray(arr)` yozing.",
    "startingCode": "function sumArray(arr) {\n  // Kodni yozing\n}",
    "hint": "reduce((a, b) => a + b, 0) yordamida yig'indini olish mumkin.",
    "test": "const fn = new Function(code + '; return sumArray;')(); if(fn([1, 2, 3]) !== 6) return '1+2+3=6'; if(fn([]) !== 0) return 'Bo\\'sh massiv uchun 0 qaytishi kerak'; return null;"
  },
  {
    "id": 6,
    "title": "Massivni Teskarisiga Aylantirish",
    "instruction": "Massiv elementlarini teskari tartibda joylashtirib (yangi massiv sifatida) qaytaradigan `reverseArray(arr)` funksiyasini yozing.",
    "startingCode": "function reverseArray(arr) {\n  // Kodni yozing\n}",
    "hint": "arr.slice().reverse() ishlatishingiz yoki siklni oxiridan boshlab yangi massivga yig'ishingiz mumkin.",
    "test": "const fn = new Function(code + '; return reverseArray;')(); const a = [1,2,3]; const r = fn(a); if(r[0]!==3 || r[2]!==1) return 'Teskari bo\\'lmadi'; if(a[0]===3) return 'Asl massiv o\\'zgarmasligi kerak'; return null;"
  },
  {
    "id": 7,
    "title": "Elementlar Sonini Topish",
    "instruction": "Massiv ichida berilgan element necha marta takrorlanganini hisoblovchi `countOccurrences(arr, val)` yozing.",
    "startingCode": "function countOccurrences(arr, val) {\n  // Kodni yozing\n}",
    "hint": "filter(x => x === val).length qilib ishlashingiz mumkin.",
    "test": "const fn = new Function(code + '; return countOccurrences;')(); if(fn([1,2,2,3,2], 2) !== 3) return '2 soni 3 marta bor'; return null;"
  },
  {
    "id": 8,
    "title": "Toq Sonlarni Ajratish",
    "instruction": "Massivdan faqat toq sonlarni ajratib, yangi massivda qaytaruvchi `getOdds(arr)` yozing.",
    "startingCode": "function getOdds(arr) {\n  // Kodni yozing\n}",
    "hint": "arr.filter(n => n % 2 !== 0) ni ishlating.",
    "test": "const fn = new Function(code + '; return getOdds;')(); const r = fn([1,2,3,4,5]); if(r.length !== 3 || r[1] !== 3) return 'Faqat toq sonlar olinmadi'; return null;"
  },
  {
    "id": 9,
    "title": "Massivlarni Birlashtirish",
    "instruction": "Ikkita massivni bitta yangi massivga aylantiradigan `mergeArrays(arr1, arr2)` yozing.",
    "startingCode": "function mergeArrays(arr1, arr2) {\n  // Kodni yozing\n}",
    "hint": "[...arr1, ...arr2] yoki arr1.concat(arr2) foydalaning.",
    "test": "const fn = new Function(code + '; return mergeArrays;')(); const r = fn([1,2], [3,4]); if(r.length !== 4 || r[2] !== 3) return 'To\\'g\\'ri birlashmadi'; return null;"
  },
  {
    "id": 10,
    "title": "Dublikatlarni O'chirish",
    "instruction": "Massiv ichidagi takroriy (bir xil) elementlarni o'chirib yuboradigan va faqat unique qoldiradigan `removeDuplicates(arr)` yozing.",
    "startingCode": "function removeDuplicates(arr) {\n  // Kodni yozing\n}",
    "hint": "Array.from(new Set(arr)) juda zo'r usul.",
    "test": "const fn = new Function(code + '; return removeDuplicates;')(); const r = fn([1,1,2,3,3]); if(r.length !== 3 || r[1] !== 2) return 'Takroriylar o\\'chmadi'; return null;"
  },
  {
    "id": 11,
    "title": "Massiv Oxiriga Qo'shish (Push)",
    "instruction": "Berilgan massivning oxiriga berilgan elementni qoshib, shu massivning o'zini qaytaruvchi `appendElement(arr, val)` yozing.",
    "startingCode": "function appendElement(arr, val) {\n  // Kodni yozing\n}",
    "hint": "arr.push(val) dan so'ng arr ni return qiling.",
    "test": "const fn = new Function(code + '; return appendElement;')(); const a = [1]; const r = fn(a, 2); if(r[1] !== 2 || r !== a) return 'Push noto\\'g\\'ri'; return null;"
  },
  {
    "id": 12,
    "title": "Satrlar Massivini Birlashtirish (Join)",
    "instruction": "So'zlar massivini vergul va probel bilan qo'shib bitta satrga aylantiradigan `joinWords(words)` yozing. Masalan: `['Olma', 'Anor']` -> `'Olma, Anor'`",
    "startingCode": "function joinWords(words) {\n  // Kodni yozing\n}",
    "hint": "words.join(', ') yordam beradi.",
    "test": "const fn = new Function(code + '; return joinWords;')(); if(fn(['A', 'B']) !== 'A, B') return 'To\\'g\\'ri biriktirilmadi'; return null;"
  },
  {
    "id": 13,
    "title": "Istalgan Element Mavjudligi (Includes)",
    "instruction": "Massivda kutilayotgan element bor yo'qligini tekshiradigan (true/false) `containsElement(arr, val)` yozing.",
    "startingCode": "function containsElement(arr, val) {\n  // Kodni yozing\n}",
    "hint": "arr.includes(val) qulay usul.",
    "test": "const fn = new Function(code + '; return containsElement;')(); if(fn([1,2,3], 2) !== true) return '2 bor (true)'; if(fn([1,2], 5) !== false) return '5 yo\\'q (false)'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da massiv (array) yaratishning eng keng tarqalgan va tavsiya etilgan usuli qaysi?",
    "options": [
      "let arr = {};",
      "let arr = [];",
      "let arr = new Map();",
      "let arr = \"1, 2, 3\";"
    ],
    "correctAnswer": 1,
    "explanation": "Kvadrat qavslar `[]` massiv literalini ifodalaydi va u massiv yaratishning eng oddiy, tezkor va o'qilishi oson usulidir."
  },
  {
    "id": 2,
    "question": "Massivning oxiriga bitta yoki bir nechta element qo'shuvchi va massivning yangi uzunligini qaytaruvchi metod qaysi?",
    "options": [
      ".pop()",
      ".shift()",
      ".push()",
      ".unshift()"
    ],
    "correctAnswer": 2,
    "explanation": "`.push()` metodi massivning oxiriga yangi elementlarni qo'shadi va natijada massivning yangilangan `length` (uzunlik) qiymatini qaytaradi."
  },
  {
    "id": 3,
    "question": "Massiv boshidan birinchi elementni olib tashlaydigan va o'sha elementni qaytaradigan metod qaysi?",
    "options": [
      ".shift()",
      ".unshift()",
      ".pop()",
      ".splice()"
    ],
    "correctAnswer": 0,
    "explanation": "`.shift()` massivning birinchi (0-indeksdagi) elementini o'chiradi va o'sha o'chirilgan qiymatni qaytaradi. Qolgan elementlarning indekslari bittaga kamayadi (oldinga suriladi)."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilgandan keyin `fruits.length` qiymati nechaga teng bo'ladi?\n```javascript\nconst fruits = ['Apple', 'Banana'];\nfruits[5] = 'Orange';\n```",
    "options": [
      "3",
      "5",
      "6",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript-da massiv indekslari uzluksiz bo'lishi shart emas. Agar mavjud bo'lmagan yuqori indeksga (masalan, 5-indeksga) qiymat biriktirilsa, massiv uzunligi (length) eng katta indeks + 1 (ya'ni 5 + 1 = 6) bo'ladi. O'rtadagi 2, 3 va 4-indekslar bo'shliq bo'lib qoladi."
  },
  {
    "id": 5,
    "question": "Massivdan uning asl qiymatlarini o'zgartirmasdan nusxa olish (shallow copy) uchun qaysi metoddan foydalaniladi?",
    "options": [
      "arr.splice()",
      "arr.slice()",
      "arr.push()",
      "arr.shift()"
    ],
    "correctAnswer": 1,
    "explanation": "`arr.slice()` (hech qanday argumentsiz chaqirilganda) butun massivni nusxalab, yangi massiv qaytaradi va asl massivga zarar yetkazmaydi. `splice` esa asl massivni o'zgartiradi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilsa konsolga nima chiqadi?\n```javascript\nconst arr = [10, 20, 30, 40];\narr.length = 2;\nconsole.log(arr);\n```",
    "options": [
      "[10, 20, 30, 40]",
      "[10, 20]",
      "[30, 40]",
      "[10, 20, undefined, undefined]"
    ],
    "correctAnswer": 1,
    "explanation": "Massivning `length` xossasini kichikroq songa o'zgartirish massivni o'sha uzunlikkacha qisqartiradi (kesib tashlaydi) va o'chirilgan elementlar massivdan butunlay yo'qoladi."
  },
  {
    "id": 7,
    "question": "Massiv tarkibida ma'lum bir qiymat bor yoki yo'qligini tekshirib, true yoki false qaytaruvchi eng qulay metod qaysi?",
    "options": [
      ".indexOf()",
      ".includes()",
      ".find()",
      ".some()"
    ],
    "correctAnswer": 1,
    "explanation": "`.includes()` metodi berilgan element massivda mavjud bo'lsa `true`, aks holda `false` qaytaradi."
  },
  {
    "id": 8,
    "question": "`delete arr[0]` va `arr.shift()` amallarining farqi nimada?",
    "options": [
      "Ikkalasi ham mutlaqo bir xil vazifani bajaradi",
      "`delete arr[0]` element qiymatini o'chirib, o'rnida bo'shliq (empty slot) qoldiradi va uzunlikni o'zgartirmaydi; `arr.shift()` esa elementni o'chirib, qolganlarini oldinga suradi va uzunlikni kamaytiradi.",
      "`arr.shift()` xotiradan butun massivni o'chirib yuboradi",
      "`delete` faqat satrli (string) massivlarda ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`delete` operatori elementni o'chiradi, lekin massiv elementlari o'rnini surmaydi, natijada massivda bo'sh joy qolib uzunlik o'zgarmaydi. `.shift()` esa haqiqatda elementni o'chirib, massiv uzunligini kamaytiradi va qolgan elementlarni chapga siljitadi."
  },
  {
    "id": 9,
    "question": "Nima uchun `unshift()` metodi `push()` metodiga qaraganda ancha sekinroq (kamroq samarali) ishlaydi?",
    "options": [
      "Chunki `unshift()` massiv oxirigacha borib element qo'shadi",
      "Chunki `unshift()` massiv boshiga element qo'shgandan keyin, qolgan barcha elementlarning indekslarini bittaga oshirib (siljitib) chiqishi kerak ($O(N)$)",
      "JavaScript dvigateli `unshift` metodini faqat asinxron bajaradi",
      "Metodlar tezligida hech qanday farq yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "`push()` massiv oxiriga element qo'shadi va boshqa elementlar indeksiga ta'sir qilmaydi ($O(1)$). `unshift()` esa elementni boshiga joylagani uchun massivdagi qolgan barcha elementlarni bitta indeks o'ngga surishga majbur qiladi, bu esa $O(N)$ vaqt oladi."
  },
  {
    "id": 10,
    "question": "Quyidagi taqqoslash natijasi nima bo'ladi?\n```javascript\nconst a = [1, 2];\nconst b = [1, 2];\nconsole.log(a === b);\n```",
    "options": [
      "true",
      "false",
      "TypeError",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Massivlar reference (havola) turi bo'lgani uchun ularni taqqoslashda qiymatlari emas, balki ularning xotiradagi manzili solishtiriladi. `a` va `b` alohida massivlar bo'lganligi sababli ularning xotiradagi manzillari har xil va natija `false` bo'ladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilgandan keyin `arr` massivining holati qanday bo'ladi?\n```javascript\nconst arr = [1, 2, 3];\narr.splice(1, 1, 'a', 'b');\n```",
    "options": [
      "[1, 'a', 'b', 3]",
      "[1, 'a', 3]",
      "[1, 2, 'a', 'b', 3]",
      "['a', 'b', 2, 3]"
    ],
    "correctAnswer": 0,
    "explanation": "`arr.splice(1, 1, 'a', 'b')` 1-indeksdan boshlab 1 ta elementni (ya'ni `2`ni) o'chiradi va o'rniga `'a'` va `'b'` elementlarini qo'shadi. Natijada massiv `[1, 'a', 'b', 3]` holatiga keladi."
  },
  {
    "id": 12,
    "question": "JavaScript massivlarida har xil turdagi (masalan, son, satr, obyekt) ma'lumotlarni aralashtirib saqlash mumkinmi?",
    "options": [
      "Yo'q, massiv elementlari faqat bir xil turda bo'lishi shart",
      "Ha, bitta massiv ichida sonlar, satrlar, obyektlar va hatto boshqa massivlarni ham aralashtirib saqlash mumkin",
      "Faqat sonlar va booleanlarni aralashtirish mumkin",
      "Faqat obyektlarni saqlab bo'lmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript dinamik tipli til bo'lgani sababli uning massivlari heterogen (aralash) bo'la oladi. Ya'ni bitta massiv tarkibida turli xil ma'lumot turlarini bemalol birga saqlash mumkin."
  }
]

};
