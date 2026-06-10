export const linkedLists = {
  id: "linkedLists",
  title: "Linked Lists (Bog'langan Ro'yxatlar) va Floyd Tsikl Tizimi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Bog'langan Ro'yxat (Linked List) nima?
* **Linked List:** Bu elementlari xotirada ketma-ket emas, balki tarqoq joylashgan va har bir element (tugun) o'zidan keyingi elementga havola (ko'rsatkich) orqali bog'langan ma'lumotlar tuzilmasidir.
* **Tarkibi:** Har bir element **Tugun (Node)** deb ataladi va u ikki qismdan iborat:
  1. **Qiymat (Value):** Tugunda saqlanadigan ma'lumot.
  2. **Ko'rsatkich (Next pointer):** Keyingi tugunning xotiradagi manzili.
* **Floyd Tsikl Tizimi (Floyd's Cycle Detection):** Bog'langan ro'yxat ichida oxiri yo'q cheksiz aylanma yo'l (tsikl) bor-yo'qligini aniqlaydigan algoritm.

### Real hayotiy analogiya
Tasavvur qiling, siz **xazina qidiryapsiz (Treasure Hunt)**:
* **Massiv usuli (Array):** Sizga xarita berilgan va u yerda xazinalar qaysi uylarda ekani aniq yozilgan. Siz to'g'ridan-to'g'ri 5-uyga borib xazinani olasiz.
* **Linked List usuli:** Siz birinchi uyga borasiz. U yerda xazina va keyingi xazina qaysi uyda ekanligi yozilgan eslatma (havola) bor. Keyingi uyga borasiz, u yerda ham qiymat va keyingi uy manzili yozilgan. Oxirgi uyda esa "Keyingi uy yo'q" deb yozilgan (\`null\`).
* **Floyd Tsikl Tizimi (Aylanma yo'l):** Agar kimdir uydagi eslatmani avvalgi biror uyga yo'naltirib qo'ysa, siz aylanma yo'lga kirib qolasiz va umringiz oxirigacha o'sha uylar orasida aylanib yuraverasiz. Uni aniqlash uchun ikki kishi (biri sekin yuruvchi Toshbaqa, biri tez yuguruvchi Quyon) yo'lga chiqadi. Agar yo'l aylana bo'lsa, Quyon baribir Toshbaqani quvib yetadi.

---

## 2. 💻 Real Kod Misollari

### 1. Tugun (Node) va Linked List yaratish
JavaScript-da bog'langan ro'yxatni class-lar yordamida yozamiz:
\`\`\`javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null; // Boshida keyingi tugun yo'q
  }
}

// Ro'yxatni yaratish: 1 -> 2 -> 3 -> null
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
\`\`\`

### 2. Bog'langan ro'yxatni aylanib chiqish (Traversal)
\`\`\`javascript
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next; // Ko'rsatkichni keyingi tugunga suramiz
  }
}
printList(head); // Konsolga: 1, 2, 3 chiqadi
\`\`\`

### 3. Floyd Tsikl Aniqlash Algoritmi (Detect Cycle)
\`\`\`javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // 1 qadam siljiydi (Toshbaqa)
    fast = fast.next.next;  // 2 qadam siljiydi (Quyon)

    if (slow === fast) {
      return true; // Ular uchrashdi, demak tsikl bor!
    }
  }
  return false; // fast oxiriga yetdi, tsikl yo'q
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Xotira taqsimoti (Memory Allocation)
* **Massivlar** xotiradan ketma-ket joy oladi. Agar massivga yangi element qo'shmoqchi bo'lsak va yonidagi xotira band bo'lsa, kompyuter butun massivni boshqa bo'sh joyga ko'chirib o'tkazishi kerak.
* **Linked List** tugunlari esa dynamic tarzda xotiraning har xil bo'sh kataklarida joylashadi. Ularni faqat \`next\` havolasi birlashtirib turadi. Shuning uchun element qo'shish yoki o'chirish juda tez amalga oshadi, lekin elementni qidirish sekinroq kechadi.

### Floyd algoritmining matematik isboti
Nega tezkor (fast) va sekin (slow) ko'rsatkichlar tsikl ichida albatta to'qnashadi?
* Tsikl ichida \`fast\` ko'rsatkichi har qadamda \`slow\`ga 1 qadamdan yaqinlashib boradi (chunki tezligi $2 - 1 = 1$). 
* Masofa har qadamda 1 taga qisqargani sababli, ular orasidagi masofa albatta 0 ga teng bo'ladi va ular uchrashadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`null\` qiymat ustida \`.next\`ni chaqirish (NullPointer Exception)
Ko'rsatkichni tekshirmasdan oldinga surish dasturni buzib qo'yadi.
* **Xato:**
  \`\`\`javascript
  let current = head;
  while (current.next !== null) { // Agar head null bo'lsa, xatolik beradi
    current = current.next;
  }
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  let current = head;
  while (current !== null && current.next !== null) {
    current = current.next;
  }
  \`\`\`

### 2. Havolalarni yo'qotib qo'yish (Broken Chain)
Yangi element qo'shayotganda yoki o'chirayotganda zanjir tartibini noto'g'ri yozish havolalar uzilishiga olib keladi.
* **Xato:**
  \`\`\`javascript
  // Yangi tugunni head-dan keyin qo'shish
  let newNode = new Node(1.5);
  head.next = newNode; // Head-ning eski next havolasi yo'qoldi! (2 va 3-tugunlar xotirada yetim qoldi)
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  let newNode = new Node(1.5);
  newNode.next = head.next; // Avval yangi tugunni eski zanjirga ulaymiz
  head.next = newNode;      // Keyin head-ni yangi tugunga ulaymiz
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Linked List nima?**
   * *Javob:* Har bir elementi qiymat va keyingi elementga havola saqlaydigan tugunlar zanjiridan iborat chiziqli ma'lumotlar tuzilmasi.
2. **Linked List massivdan qanday ustunlikka ega?**
   * *Javob:* Boshiga va oxiriga (tail ma'lum bo'lsa) element qo'shish/o'chirish O(1) vaqt oladi va o'lchami dynamic ravishda o'zgaradi.
3. **Singly va Doubly Linked List farqi nimada?**
   * *Javob:* Singly list faqat keyingi tugunga havola qiladi. Doubly list esa ham keyingi, ham oldingi tugunga havola qiladi.
4. **Linked List-da element o'chirish qanday ishlaydi?**
   * *Javob:* O'chiriladigan tugundan oldingi tugunning \`next\` havolasini o'chirilayotgan tugundan keyingi tugunga yo'naltirish orqali.

### Middle
5. **Nima uchun Linked List-da elementni indeks bo'yicha olish O(n) vaqt talab qiladi?**
   * *Javob:* Chunki elementlar xotirada tarqoq joylashgan va to'g'ridan-to'g'ri indeks bo'yicha borib bo'lmaydi. Boshidan boshlab bittalab aylanib chiqish shart.
6. **Floyd Tsikl aniqlash algoritmi qanday ishlaydi?**
   * *Javob:* Ikkita ko'rsatkich (slow va fast) olingan holda, fast ikki marta tezroq yuradi. Agar tsikl bo'lsa, ular to'qnashadi, bo'lmasa fast oxiriga yetib boradi.
7. **Singly Linked List-ni teskari qilish algoritmini tushuntiring.**
   * *Javob:* Uchta ko'rsatkich (\`prev\`, \`current\`, \`next\`) yordamida zanjir bo'ylab yurib, har bir tugunning \`next\` havolasini orqadagi \`prev\` tugunga qarab o'zgartirib chiqiladi.
8. **Linked List-da xotira sarfi massivdagidan ko'pmi?**
   * *Javob:* Ha, chunki qiymatning o'zidan tashqari har bir tugun uchun pointer (havola) ham saqlanishi kerak.

### Senior
9. **Circular Linked List nima va u qayerda ishlatiladi?**
   * *Javob:* Oxirgi tugunning \`next\` ko'rsatkichi yana \`head\`ga ulanadigan ro'yxat. U aylanma navbatlar (Round-Robin CPU scheduling) kabi algoritmlarda ishlatiladi.
10. **Floyd algoritmi orqali tsikl boshlanish nuqtasini (tugunini) qanday topish mumkin?**
    * *Javob:* Toshbaqa va Quyon to'qnashganidan so'ng, ulardan birini (masalan, slow) yana \`head\`ga qaytaramiz. Keyin ikkalasini ham 1 qadamdan surib boramiz. Ular yana uchrashgan nuqta tsikl boshlanish tuguni bo'ladi.
11. **Skip List nima?**
    * *Javob:* Elementlarni qidirishni tezlashtirish (O(log n)) uchun bir necha qatlamli ko'rsatkichlarga ega bo'lgan bog'langan ro'yxat turi.
12. **Garbage Collector (Axlat yig'uvchi) bog'langan ro'yxatdagi o'chirilgan tugunlarni qachon xotiradan o'chiradi?**
    * *Javob:* Qachonki global qamrovda yoki ishlayotgan funksiyalarda ushbu tugunga olib boruvchi birorta ham havola qolmagan bo'lsa.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu dars uchun topshiriqlar \`linkedLists_exercises.json\` faylida berilgan. U yerda siz ro'yxatni teskari qilish, Floyd tsikl algoritmini yozish va ro'yxat o'rtasini topish kabi topshiriqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars bo'yicha bilimingizni sinash uchun 12 ta test savollari tayyorlangan bo'lib, ular \`linkedLists_quizzes.json\` faylida keltirilgan.

---

## 8. 🎯 Real Project Case Study

### Browser History (Orqaga-Oldinga o'tish tizimi)
Brauzerlarda "Orqaga" (Back) va "Oldinga" (Forward) tugmalari qanday ishlaydi?
* **Yechim:** Bu tizim Doubly Linked List yordamida amalga oshiriladi.
* **Ishlash tartibi:**
  * Har bir ochilgan sahifa yangi tugun sifatida qo'shiladi va joriy tugun unga bog'lanadi.
  * Biz hozir turgan sahifa ko'rsatkich sifatida saqlanadi (\`current\`).
  * "Orqaga" bosilganda \`current = current.prev\` qilinadi.
  * "Oldinga" bosilganda \`current = current.next\` qilinadi.

\`\`\`javascript
class BrowserHistory {
  constructor(homepage) {
    this.current = { url: homepage, prev: null, next: null };
  }

  visit(url) {
    const newPage = { url: url, prev: this.current, next: null };
    this.current.next = newPage;
    this.current = newPage; // Yangi sahifaga o'tdik
  }

  back() {
    if (this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current.url;
  }

  forward() {
    if (this.current.next) {
      this.current = this.current.next;
    }
    return this.current.url;
  }
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **O'lchamni oldindan bilib bo'lmasa, Linked List tanlang:** Ma'lumotlar miqdori dynamic o'zgarib tursa, massiv kengayishidagi O(n) xarajatidan qutulasiz.
* **Lookup ko'p bo'lsa, massiv ishlating:** Tez-tez indeks bo'yicha qidiruv qiladigan loyihalarda Linked List yomon natija beradi.

---

## 10. 📌 Cheat Sheet

| Operatsiya | Array (Massiv) | Linked List (Bog'langan Ro'yxat) | Izoh |
| :--- | :--- | :--- | :--- |
| **Lookup (Indeks orqali olish)** | O(1) | O(n) | Massivda random access bor, ro'yxatda yo'q |
| **Insert at Head (Boshiga qo'shish)** | O(n) | O(1) | Massiv elementlarini surish kerak, ro'yxatda shart emas |
| **Insert at Tail (Oxiriga qo'shish)** | O(1) | O(1) (tail bo'lsa) / O(n) (bo'lmasa) | Ro'yxat oxirigacha borish vaqti talab qilinishi mumkin |
| **Delete (O'chirish)** | O(n) | O(1) (tugun berilgan bo'lsa) | Havolani o'zgartirish kifoya |
| **Qo'shimcha Xotira** | Yo'q | Bor (next va prev pointerlar uchun) | Ro'yxat ko'proq RAM sarflaydi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Linked List-ni Teskari Qilish (Reverse Linked List)",
    "instruction": "Singly Linked List-ning bosh tuguni (`head`) berilgan. Ro'yxatni teskari qilib (ya'ni oxirgi element boshiga keladigan qilib) yangi bosh tugunni qaytaradigan `reverseList(head)` funksiyasini yozing. Har bir tugunda keyingi elementga ishora qiluvchi `.next` xossasi mavjud.",
    "startingCode": "function reverseList(head) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "prev = null, current = head o'zgaruvchilarini yarating. Loop ichida keyingi tugunni saqlab oling (next = current.next), joriy tugunni prev ga yo'naltiring, keyin prev va current ko'rsatkichlarini bir qadam oldinga suring.",
    "test": "const sandbox = new Function(code + '; return reverseList;');\nconst fn = sandbox();\nconst node3 = { val: 3, next: null };\nconst node2 = { val: 2, next: node3 };\nconst node1 = { val: 1, next: node2 };\nconst reversed = fn(node1);\nif (reversed && reversed.val === 3 && reversed.next && reversed.next.val === 2 && reversed.next.next && reversed.next.next.val === 1 && reversed.next.next.next === null) return null;\nreturn 'reverseList funksiyasi ro\\'yxatni to\\'g\\'ri teskari qilmadi';"
  },
  {
    "id": 2,
    "title": "Floyd Tsikl Aniqlash Algoritmi (Detect Cycle)",
    "instruction": "Bog'langan ro'yxatda (`head`) tsikl (loop) bor yoki yo'qligini aniqlovchi `hasCycle(head)` funksiyasini yozing. Buning uchun Floyd tsikl aniqlash algoritmidan (ikki ko'rsatkich - sekin va tez) foydalaning. Tsikl bo'lsa `true`, aks holda `false` qaytaring.",
    "startingCode": "function hasCycle(head) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "slow = head, fast = head qilib belgilang. fast va fast.next mavjud bo'lgancha, slow ni 1 qadam, fast ni esa 2 qadam oldinga suring. Agar ular uchrashsa, tsikl bor.",
    "test": "const sandbox = new Function(code + '; return hasCycle;');\nconst fn = sandbox();\nconst node3 = { val: 3, next: null };\nconst node2 = { val: 2, next: node3 };\nconst node1 = { val: 1, next: node2 };\nconst noCycle = fn(node1);\nnode3.next = node2;\nconst hasCycle = fn(node1);\nif (noCycle === false && hasCycle === true) return null;\nreturn 'hasCycle tsiklni to\\'g\\'ri aniqlay olmadi';"
  },
  {
    "id": 3,
    "title": "Bog'langan Ro'yxat O'rtasini Topish (Middle of the Linked List)",
    "instruction": "Singly Linked List-ning bosh tuguni (`head`) berilgan. Ikki ko'rsatkich (slow va fast) usuli yordamida ro'yxatning o'rtasidagi tugunni qaytaruvchi `findMiddle(head)` funksiyasini yozing. Agar ro'yxatda juft miqdordagi element bo'lsa, ikkinchi o'rta element qaytarilsin.",
    "startingCode": "function findMiddle(head) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "slow = head va fast = head oling. fast va fast.next tugaguncha slow ni 1 qadam, fast ni 2 qadam suring. Oxirida slow o'rtadagi tugunga ishora qiladi.",
    "test": "const sandbox = new Function(code + '; return findMiddle;');\nconst fn = sandbox();\nconst node4 = { val: 4, next: null };\nconst node3 = { val: 3, next: node4 };\nconst node2 = { val: 2, next: node3 };\nconst node1 = { val: 1, next: node2 };\nconst mid = fn(node1);\nif (mid && mid.val === 3) return null;\nreturn 'findMiddle o\\'rtadagi tugunni to\\'g\\'ri topmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Singly Linked List (Bir tomonlama bog'langan ro'yxat) nima?",
    "options": [
      "Barcha elementlari xotirada ketma-ket kataklarda joylashadigan ma'lumotlar tuzilmasi",
      "Har bir elementi qiymat va faqat keyingi elementga havola (pointer) saqlaydigan tugunlar zanjiri",
      "Elementlari faqat ota-bola munosabatida bo'lgan daraxtsimon tuzilma",
      "Faqat raqamlardan iborat saralangan massiv"
    ],
    "correctAnswer": 1,
    "explanation": "Singly Linked List har bir tuguni (Node) o'z qiymati (value) va keyingi tugunga havola (next) saqlaydigan chiziqli ma'lumotlar tuzilmasidir."
  },
  {
    "id": 2,
    "question": "Massiv (Array) va Bog'langan Ro'yxat (Linked List) o'rtasidagi eng asosiy xotira farqi nimada?",
    "options": [
      "Massiv xotirada ketma-ket kataklarda joylashadi, Linked List tugunlari esa xotiraning ixtiyoriy tarqoq joylarida joylashishi mumkin",
      "Linked List xotiradan mutlaqo joy egallamaydi",
      "Massiv faqat statik xotirada, Linked List esa faqat kesh xotirada saqlanadi",
      "Massivda elementlar havolalar yordamida bog'lanadi, Linked Listda esa indeks yordamida"
    ],
    "correctAnswer": 0,
    "explanation": "Massivlar xotiradan ketma-ket bo'sh joy (contiguous block of memory) talab qiladi, Linked List esa xotira bo'ylab tarqoq holda bo'lib, havolalar orqali bog'lanadi."
  },
  {
    "id": 3,
    "question": "Bog'langan ro'yxatning boshiga (Head) yangi tugun qo'shish operatsiyasining vaqt murakkabligi qanday?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Head-ga yangi element qo'shish uchun faqat yangi tugunning `next` xossasini eski head-ga yo'naltirish kifoya. Bu massiv hajmidan qat'i nazar doimiy vaqt O(1) oladi."
  },
  {
    "id": 4,
    "question": "Agar bizda `tail` (oxirgi tugun) ko'rsatkichi bo'lmasa, ro'yxat oxiriga yangi tugun qo'shish qanday vaqt oladi?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 2,
    "explanation": "Tail ko'rsatkichi bo'lmasa, ro'yxat oxirini topish uchun boshidan oxirigacha traversal (aylanib o'tish) qilish kerak, bu O(n) vaqt oladi. (Kechirasiz, options 0-indexed da 3 deb belgiladim, lekin variant index-lariga ko'ra O(n) bu 2. Keling to'g'rilab 2 qilamiz)."
  },
  {
    "id": 5,
    "question": "Doubly Linked List (Ikki tomonlama bog'langan ro'yxat) Singly Linked List-dan nima bilan farq qiladi?",
    "options": [
      "U faqat sonli ma'lumotlarni saqlaydi",
      "Uning har bir tuguni ham keyingi (next), ham oldingi (prev) tugunga havola saqlaydi",
      "U faqat bitta tugundan iborat bo'ladi",
      "U xotirada ketma-ket joylashadi"
    ],
    "correctAnswer": 1,
    "explanation": "Doubly Linked List tugunlari ikkita ko'rsatkichga ega bo'ladi: `.next` (keyingi tugun) va `.prev` (oldingi tugun). Bu ro'yxat bo'ylab ikki tomonga ham harakatlanish imkonini beradi."
  },
  {
    "id": 6,
    "question": "Bog'langan ro'yxatda ma'lum bir elementni qiymati bo'yicha qidirish (Search) yoki indeks bo'yicha olish (Lookup) murakkabligi qanday?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "correctAnswer": 2,
    "explanation": "Linked Listda tasodifiy kirish (random access) yo'q. Istalgan elementni olish uchun boshidan boshlab bittalab o'tib borish kerak, bu eng yomon holatda O(n) vaqt oladi."
  },
  {
    "id": 7,
    "question": "Floyd's Cycle-Finding algoritmi qanday nom bilan ham mashhur?",
    "options": [
      "Toshbaqa va Quyon (Tortoise and Hare) algoritmi",
      "Tezkor saralash algoritmi",
      "Chuqurlik bo'yicha qidiruv (DFS)",
      "Ikki karrali ko'rsatkichlar simulyatsiyasi"
    ],
    "correctAnswer": 0,
    "explanation": "Floyd tsikl topish algoritmi ikki xil tezlikdagi ko'rsatkichlar (sekin - Toshbaqa va tezkor - Quyon) ishlatilgani uchun 'Tortoise and Hare' deb ataladi."
  },
  {
    "id": 8,
    "question": "Floyd algoritmi yordamida tsiklni aniqlashda qo'shimcha xotira murakkabligi (Space Complexity) qanday bo'ladi?",
    "options": [
      "O(1) - faqat ikkita ko'rsatkich uchun xotira ishlatiladi",
      "O(n) - barcha tugunlarni Set-ga saqlab borish kerak",
      "O(log n) - rekursiya steki ishlatiladi",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Floyd algoritmi yangi ma'lumotlar tuzilmasi (Set yoki massiv kabi) yaratmaydi, faqatgina ikkita ko'rsatkich o'zgaruvchisidan foydalanadi, shuning uchun xotira murakkabligi O(1) dir."
  },
  {
    "id": 9,
    "question": "Bog'langan ro'yxatni teskari qilish (Reverse) algoritmining vaqt murakkabligi qanday?",
    "options": [
      "O(1)",
      "O(n)",
      "O(n^2)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "explanation": "Ro'yxatni teskari qilish uchun har bir tugunning havolasini (next) bir marta o'zgartirib chiqish yetarli, bu O(n) vaqtni talab qiladi."
  },
  {
    "id": 10,
    "question": "Floyd tsikl aniqlash algoritmida tezkor ko'rsatkich (fast) har iteratsiyada necha qadam siljiydi?",
    "options": [
      "1 qadam",
      "2 qadam",
      "3 qadam",
      "Tasodifiy qadam"
    ],
    "correctAnswer": 1,
    "explanation": "Floyd algoritmida `slow` ko'rsatkichi har qadamda 1 ta tugunga, `fast` esa 2 ta tugunga siljiydi. Agar tsikl bo'lsa, ular albatta to'qnashadi."
  },
  {
    "id": 11,
    "question": "Singly Linked List-da zanjirning eng oxirgi tugunining `next` ko'rsatkichi nimaga teng bo'ladi?",
    "options": [
      "`undefined`",
      "`null`",
      "Bosh tugunga (`head`) qaytadi",
      "`0`"
    ],
    "correctAnswer": 1,
    "explanation": "Singly Linked List oxirgi tugunidan keyin hech qanday element yo'qligini bildirish uchun uning `.next` qiymati standart bo'yicha `null` ga teng bo'ladi."
  },
  {
    "id": 12,
    "question": "Linked List massivga nisbatan qo'shimcha xotira sarflaydi. Bunga sabab nima?",
    "options": [
      "Elementlar faqat dynamic xotirada saqlanishi",
      "Har bir tugun ma'lumot qiymatidan tashqari havolalar (ko'rsatkichlar) uchun ham xotirada joy egallashi",
      "U faqat o'nlik sanoq tizimida ishlashi",
      "Brauzer keshini tez-tez tozalab turishi"
    ],
    "correctAnswer": 1,
    "explanation": "Massivda faqat qiymatlar saqlansa, Linked List-da har bir qiymat bilan birga uning keyingi/oldingi elementga havolalari (ko'rsatkichlari) ham saqlanishi tufayli har bir Node qo'shimcha baytlar talab qiladi."
  }
]

};
