export const dsaHashing = {
  id: "dsaHashing",
  title: "Xeshlash va Xesh-Jadvallar (Hashing & Hash Tables)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Xeshlash (Hashing) - bu ixtiyoriy hajmdagi ma'lumotni (masalan, matn, fayl yoki kalit) olib, uni aniq bir uzunlikdagi butun songa (xesh-kodga) o'tkazib berish jarayonidir. Xesh-jadval (Hash Table) esa ushbu xesh-kodlar yordamida ma'lumotlarni o'ta tezkor ($O(1)$ vaqtda) saqlash va qidirib topish uchun mo'ljallangan tuzilmadir.

### Kutubxona analogiyasi:
- **Xesh-funksiya (Hash Function):** Bu xuddi tajribali kutubxonachiga o'xshaydi. Siz unga kitob nomini (kalit/key) bersangiz, u maxsus formula orqali kitob nomi harflaridan foydalanib, uning qaysi shkafda (indeks/bucket) turishini bir lahzada aytib beradi.
- **Kolliziya (Collision):** Agar kutubxonachi ikki xil kitob uchun bir xil javon raqamini hisoblab chiqsa (chunki formula sodda bo'lishi mumkin), bu to'qnashuv (Collision) deyiladi. Bitta javonga ikkala kitobni qanday joylashtirishni hal qilish kerak (**Chaining** yoki **Open Addressing**).

---

## 2. 💻 Real Kod Misollari

Sodda kolliziyalarni Separate Chaining (bog'langan ro'yxat) orqali hal qiluvchi xesh-jadval simulyatsiyasi:

\`\`\`javascript
class SimpleHashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = Array.from({ length: this.size }, () => []);
  }

  // Kalitni indeksga o'tkazuvchi sodda xesh-funksiya
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }

  // Ma'lumot qo'shish (O(1) o'rtacha)
  set(key, value) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const found = bucket.find((kv) => kv[0] === key);
    if (found) {
      found[1] = value; // Qiymatni yangilash
    } else {
      bucket.push([key, value]); // Kolliziyada ketma-ket qo'shish
    }
  }

  // Ma'lumotni olish (O(1) o'rtacha)
  get(key) {
    const idx = this._hash(key);
    const bucket = this.buckets[idx];
    const found = bucket.find((kv) => kv[0] === key);
    return found ? found[1] : undefined;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Kolliziyalarni hal qilish usullari (Collision Resolution):
Kolliziyalar mutlaqo qochib bo'lmaydigan holatdir (chunki xesh-jadval o'lchami cheklangan, kiruvchi kalitlar soni esa cheksiz). Ikki asosiy yechim mavjud:
1. **Separate Chaining (Zanjirlash):** Har bir indeksda alohida massiv yoki Linked List saqlanadi. Kolliziya bo'lsa, elementlar zanjir oxiriga qo'shilaveradi.
2. **Open Addressing (Ochiq manzillash):** Kolliziya bo'lganda bo'sh joy topilguncha jadval bo'ylab ma'lum qadam bilan (masalan, +1 qadam bilan - **Linear Probing**) keyingi bo'sh katak qidiriladi.

### Load Factor va Resizing:
- **Load Factor (Yuklanish koeffitsiyenti):** $\\alpha = N / M$ (bu yerda $N$ - elementlar soni, $M$ - jadval hajmi).
- Agar $\\alpha > 0.7$ bo'lsa, kolliziyalar keskin ko'payadi va unumdorlik pasayadi. Shu sababli xesh-jadval sig'imi 2 barobar oshirilib, barcha elementlar yangi o'lcham bo'yicha boshqadan xeshlanadi (**Rehashing**).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Noto'g'ri xesh-funksiya yozish (yomon taqsimot)
Agar xesh-funksiya barcha kalitlar uchun deyarli bir xil indekslarni hisoblasa, barcha elementlar bitta zanjirga yig'ilib qoladi.
* **Oqibati:** Xesh-jadvalning afzalligi yo'qoladi, qidiruv tezligi $O(1)$ dan $O(N)$ chiziqli vaqtga tushib ketadi (Linear Search kabi bo'lib qoladi).

---

## 5. 💬 12 ta Intervyu Savollari

1. **Xeshlash (Hashing) nima?**
   * *Javob:* Ixtiyoriy hajmdagi kalit ma'lumotini matematik formula yordamida qat'iy belgilangan o'lchamdagi butun songa aylantirish.
2. **Xesh-jadvalda (Hash Table) o'rtacha vaqt murakkabligi qanday?**
   * *Javob:* Element qo'shish (Insert), o'chirish (Delete) va qidirish (Lookup) o'rtacha holatda O(1) doimiy vaqt oladi.
3. **Kolliziya (Collision) nima?**
   * *Javob:* Ikki xil kalit uchun xesh-funksiya bir xil indeks (xesh-kod) hisoblab chiqqan holat.
4. **Separate Chaining qanday ishlaydi?**
   * *Javob:* Kolliziyalarni hal qilish uchun xesh-jadvalning har bir indeksida elementlarni zanjirlab saqlaydigan Linked List yoki massiv saqlash yondashuvi.
5. **Open Addressing (Linear Probing) nima?**
   * *Javob:* Kolliziya sodir bo'lganda, jadvalning o'zidan bo'sh katak topilguncha indekslarni ketma-ket (+1 qadam bilan) tekshirib borish usuli.
6. **Xesh-funksiya qanday xususiyatlarga ega bo'lishi kerak?**
   * *Javob:* Deterministik bo'lishi (bir xil kalitga doim bir xil indeks berishi), tezkor hisoblanishi va elementlarni jadval bo'ylab bir tekis taqsimlashi (uniform distribution).
7. **Load Factor (Yuklanish koeffitsiyenti) nima?**
   * *Javob:* Xesh-jadvaldagi elementlar sonining jadval sig'imiga nisbati ($N/M$). U jadvalning qanchalik to'lganligini ko'rsatadi.
8. **Rehashing qachon amalga oshiriladi?**
   * *Javob:* Load factor ma'lum chegaradan (odatda 0.7 - 0.8) oshganda, jadval hajmi kattalashtirilib, barcha elementlar yangi o'lcham bo'yicha boshqadan xeshlanib chiqilganda.
9. **Eng yomon holatda (Worst Case) xesh-jadval qidiruv murakkabligi qanday bo'lishi mumkin?**
   * *Javob:* O(N) chiziqli vaqt. Bu barcha elementlar kolliziya tufayli bitta chelakka (bucket) yig'ilib qolganda sodir bo'ladi.
10. **JS-da Set va Map obyektlari orqasida qaysi tuzilma turadi?**
    * *Javob:* Set va Map orqasida V8 dvigateli darajasida xavfsiz va tezkor xesh-jadvallar ishlaydi.
11. **Nima uchun xesh-jadvallarda kalitlar tartibini saqlash qiyin?**
    * *Javob:* Chunki xesh-funksiya elementlarni xotiraga tartibsiz, hisoblangan indekslar bo'yicha joylashtiradi (tartib kafolatlanmaydi).
12. **Cryptographic hashing (masalan SHA-256) bilan Hash Table hashing farqi nimada?**
    * *Javob:* Kriptografik xeshlash bir tomonlama va qayta tiklanmaydigan, xavfsizlik uchun o'ta murakkab bo'lishi shart. Hash table xeshlash esa xavfsiz emas, balki tezkor qidirish uchun optimallashgan bo'ladi.

---

## 6. 🎨 Interaktiv Vizual

### Separate Chaining Kolliziya Resolution
Indeksda elementlar bog'langan ro'yxat ko'rinishida saqlanishi:

\`\`\`mermaid
graph LR
    subgraph Table [Hash Table Buckets]
        b0["Index 0"]
        b1["Index 1"]
        b2["Index 2"]
    end
    subgraph Chain [Zanjirlar - Linked Lists]
        e1["['keyA', 10]"]
        e2["['keyB', 20]"]
        e3["['keyC', 30]"]
    end
    b0 -->|Kolliziya yo'q| e1
    b2 --> e2
    e2 -->|Kolliziya zanjiri| e3
    style Table fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style Chain fill:#fdf2e9,stroke:#d35400,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mashqlarni bajarib, xeshlash algoritmlarini mustahkamlang.

---

## 8. 📝 12 ta Mini Test

Bilimingizni tekshiruvchi testlardan o'ting.

---

## 9. 🚀 Performance va Optimization

- **Yaxshi xesh formula tanlash:** Kalit qiymatlarini bir tekis taqsimlovchi matematik ifodalarni qo'llang.
- **Dinamik resizing:** Load factor 0.75 dan oshganda jadval o'lchamini kattalashtirishni unutmang.

---

## 10. 📌 Cheat Sheet

| Kolliziya turi | Afzalligi | Kamchiligi | Qo'llanilishi |
| :--- | :--- | :--- | :--- |
| **Separate Chaining** | Element soni cheklanmagan | Qo'shimcha pointerlar xotirasi | O'lchami oldindan noma'lum bo'lganda |
| **Open Addressing** | Xotira ketma-ket, pointer yo'q | Jadval to'lsa tezlik keskin tushadi | Keshlar va kichik jadvallarda |
`,
  exercises: [
    {
      id: 1,
      title: "Sodda Custom Xesh-Funksiya",
      instruction: "Berilgan satrli `key` va jadval o'lchami `size` parametrlari bo'yicha `0` dan `size - 1` gacha bo'lgan butun son qaytaruvchi determenistik xesh-funksiya `customHash(key, size)` funksiyasini yozing.",
      startingCode: "function customHash(key, size) {\n  let hash = 0;\n  // Kodni yozing\n  return hash % size;\n}",
      hint: "Sikl yordamida kalitdagi har bir belgi kodini (`key.charCodeAt(i)`) ma'lum bir tub songa (masalan, 31) ko'paytirib yig'ib boring.",
      test: "const sandbox = new Function(code + '; return customHash;'); const fn = sandbox(); const h1 = fn('hello', 10); const h2 = fn('hello', 10); const h3 = fn('world', 10); if (h1 === h2 && h1 !== undefined && h1 >= 0 && h1 < 10) return null; return 'Xesh-funksiya determenistik emas yoki qiymat oraliqdan tashqarida';"
    },
    {
      id: 2,
      title: "Two Sum Algoritmi Xesh-Jadval Yordamida",
      instruction: "Sonlar massivi `nums` va butun son `target` berilgan. O(N) vaqt murakkabligida ishlaydigan, yig'indisi `target`ga teng bo'lgan ikki sonning indekslarini `[index1, index2]` ko'rinishida qaytaruvchi `twoSumHash(nums, target)` funksiyasini yozing. Buning uchun JS `Map` (xesh-jadval) obyektidan foydalaning.",
      startingCode: "function twoSumHash(nums, target) {\n  const map = new Map();\n  // Kodni yozing\n}",
      hint: "Har bir son uchun uning targetga yetmagan farqini (complement = target - num) hisoblang. Agar u mapda bo'lsa, indekslarni qaytaring, bo'lmasa joriy sonni va indeksini mapga qo'shing.",
      test: "if (code.includes('for') && (code.match(/for/g) || []).length > 1) return 'Nested loop ishlatish taqiqlanadi (O(N) bo\\'lishi shart)'; const sandbox = new Function(code + '; return twoSumHash;'); const fn = sandbox(); const res = fn([2, 7, 11, 15], 9); if (res && res[0] === 0 && res[1] === 1) return null; return 'Two Sum xato yechildi';"
    },
    {
      id: 3,
      title: "Kolliziyali Bucket Simulyatori (Separate Chaining)",
      instruction: "Berilgan xesh-jadval bucketlari `buckets` massividan iborat (har bir indeksda massiv saqlanadi). Berilgan xesh-indeks `idx` va kalit-qiymat juftligi `[key, value]` ni bucketchaga joylashtiradigan `insertChaining(buckets, idx, key, value)` funksiyasini yozing. Agar kalit oldindan bor bo'lsa, uning qiymatini yangilang.",
      startingCode: "function insertChaining(buckets, idx, key, value) {\n  const bucket = buckets[idx];\n  // Kodni yozing\n  return buckets;\n}",
      hint: "Bucketchani aylanib chiqib kalit mos kelsa qiymatni yangilang. Topilmasa bucket.push([key, value]) qiling.",
      test: "const sandbox = new Function(code + '; return insertChaining;'); const fn = sandbox(); const testBuckets = [[], [], []]; fn(testBuckets, 1, 'a', 100); fn(testBuckets, 1, 'b', 200); fn(testBuckets, 1, 'a', 300); if (testBuckets[1].length === 2 && testBuckets[1][0][1] === 300 && testBuckets[1][1][1] === 200) return null; return 'Kolliziyani bog\\'lashda xatolik';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Xesh-funksiyaning (Hash Function) asosiy vazifasi nima?",
      options: [
        "Ma'lumotlarni shifrlash va yashirish",
        "Ixtiyoriy kalitni jadval indekslariga mos keladigan butun songa o'tkazib berish",
        "Fayllarni siqish",
        "Sikllarni to'xtatish"
      ],
      correctAnswer: 1,
      explanation: "Xesh-funksiya berilgan kalitni (key) xesh-jadvalning indeksiga mos keluvchi butun songa aylantiradi."
    },
    {
      id: 2,
      question: "Xesh-jadvalda (Hash Table) o'rtacha holatda elementni qidirish va qo'shish qancha vaqt oladi?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 0,
      explanation: "Yaxshi taqsimlangan xesh-jadvalda qidirish, qo'shish va o'chirish o'rtacha holatda doimiy O(1) vaqtda bajariladi."
    },
    {
      id: 3,
      question: "Kolliziya (Collision) nima?",
      options: [
        "Xesh-jadvalning to'lib qolishi",
        "Ikki xil kalit uchun xesh-funksiya bir xil indeks qiymatini hisoblab chiqishi",
        "Koddagi sintaktik xatolik",
        "Xotira yetishmasligi sababli dasturning to'xtab qolishi"
      ],
      correctAnswer: 1,
      explanation: "Cheksiz kalitlar to'plamini cheklangan indekslar to'plamiga o'tkazishda ikki xil kalitning bitta indeksga tushib qolishi kolliziya (to'qnashuv) deyiladi."
    },
    {
      id: 4,
      question: "Separate Chaining kolliziyalarni qanday hal qiladi?",
      options: [
        "Elementlarni keyingi bo'sh indeksga yozish orqali",
        "Kolliziya bo'lgan indeksda elementlarni bog'langan ro'yxat (Linked List) yoki massiv zanjiri ko'rinishida saqlash orqali",
        "Eski elementni o'chirib yuborish orqali",
        "Dasturni xatolik bilan to'xtatish orqali"
      ],
      correctAnswer: 1,
      explanation: "Separate Chaining-da har bir indeksda alohida ro'yxat (zanjir) saqlanadi. Bir indeksga tushgan elementlar ketma-ket zanjirga qo'shib boriladi."
    },
    {
      id: 5,
      question: "Open Addressing (Ochiq manzillash) usulida Linear Probing nima?",
      options: [
        "Kolliziya bo'lganda, jadvalning keyingi (+1 qadam bilan) bo'sh katagini qidirib topib joylashtirish",
        "Elementlarni zanjirga qo'shish",
        "Tub sonlar indeksiga joylash",
        "Xeshni nolgacha kamaytirish"
      ],
      correctAnswer: 0,
      explanation: "Linear Probing kolliziya bo'lganda bo'sh joy topilguncha indeksni 1 taga oshirib borish orqali ochiq manzillashni amalga oshiradi."
    },
    {
      id: 6,
      question: "Xesh-jadvalning 'Load Factor'i (Yuklanish koeffitsiyenti) nimani anglatadi?",
      options: [
        "Xesh-funksiya algoritmining qiyinlik darajasini",
        "Jadvaldagi joriy elementlar sonining jadvalning umumiy o'lchamiga (sig'imiga) nisbatini (N/M)",
        "Jadvalning diskdagi hajmini",
        "Dasturchi yozgan kod qatorlari sonini"
      ],
      correctAnswer: 1,
      explanation: "Load Factor (N/M) jadvalning qanchalik to'lganligini o'lchaydi. U ma'lum darajadan (masalan, 0.75) oshganda jadval unumdorligi pasayadi."
    },
    {
      id: 7,
      question: "Load Factor me'yoridan oshib ketganida nima qilish kerak?",
      options: [
        "Eski elementlarni tozalash",
        "Jadval hajmini kattalashtirib (ko'pincha 2 barobar), barcha elementlarni yangi o'lcham bo'yicha boshqadan xeshlab chiqish (Rehashing)",
        "Xesh-funksiyani o'zgartirish",
        "Hech narsa qilish shart emas"
      ],
      correctAnswer: 1,
      explanation: "Load factor juda oshsa kolliziyalar ko'payadi va tezlik tushadi. Rehashing orqali jadval kengaytiriladi va elementlar qayta taqsimlanadi."
    },
    {
      id: 8,
      question: "Yomon xesh-funksiya (barcha kalitlarga bir xil indeks beruvchi) ishlatilganda xesh-jadval tezligi qaysi murakkablikka tushib qoladi?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 1,
      explanation: "Agar barcha kalitlar bitta indeksga tushsa, xesh-jadval bitta uzun zanjirga aylanadi va qidiruv chiziqli qidiruv (O(N)) kabi sekinlashadi."
    },
    {
      id: 9,
      question: "Xesh-funksiya deterministik bo'lishi nima uchun muhim?",
      options: [
        "Chunki u tezroq ishlashi kerak",
        "Bir xil kalit uchun u doimo xotiradan bitta va bir xil indeks qaytarishi shart, aks holda yozilgan ma'lumotni qayta topib bo'lmaydi",
        "U faqat sonli natijalar qaytarishi uchun",
        "Kolliziyani butunlay yo'qotish uchun"
      ],
      correctAnswer: 1,
      explanation: "Deterministiklik deganda bir xil kiruvchi parametrlarga har doim bir xil chiquvchi natija olinishi tushuniladi. Xesh-funksiya har chaqirilganda har xil indeks qaytarsa, qidiruv imkonsiz bo'ladi."
    },
    {
      id: 10,
      question: "Xesh-jadvalda ma'lumotlar saqlanish tartibi haqida qaysi fikr to'g'ri?",
      options: [
        "Elementlar har doim alifbo tartibida saqlanadi",
        "Elementlar xesh-kod indekslari bo'yicha tartibsiz taqsimlanadi, kiritilish tartibi kafolatlanmaydi",
        "Elementlar kiritilish vaqti bo'yicha qat'iy tartiblanadi",
        "Faqat o'sish tartibida joylashadi"
      ],
      correctAnswer: 1,
      explanation: "Xesh-jadval tabiatan tartibsiz tuzilmadir. Element indeksini xesh-kod belgilagani uchun tartib tasodifiy kabi ko'rinadi."
    },
    {
      id: 11,
      question: "JS-da `new Map()` va oddiy obyekt `{}` farqi nimada?",
      options: [
        "Map faqat stringlarni kalit qiladi",
        "Map kalit sifatida ixtiyoriy ma'lumot turini (jumladan obyektlar va funksiyalar) qabul qila oladi, oddiy obyekt esa faqat string yoki symbolni kalit qiladi",
        "Obyekt Map-dan har doim tezroq",
        "Map faqat massivlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "JS `Map` xesh-jadval prinsiplariga to'liq rioya qiladi va har qanday tipdagi kalitlar bilan to'g'ri ishlay oladi."
    },
    {
      id: 12,
      question: "Nima uchun xesh-jadvallarda kolliziyalarni mutlaqo 0 ga tushirib bo'lmaydi?",
      options: [
        "Chunki dasturchilar xato kod yozishadi",
        "Chunki kalitlar to'plami (cheksiz bo'lishi mumkin) jadval o'lchamidan (cheklangan xotira) doimo ancha katta bo'ladi (Dirixle prinsipi)",
        "Chunki protsessorlar buni taqiqlaydi",
        "Faqat JavaScript cheklovlari tufayli"
      ],
      correctAnswer: 1,
      explanation: "Pigeonhole Principle (Dirixle prinsipi) ga ko'ra, cheklangan sig'imga cheksiz elementlar to'plamini joylashtirishda kamida ikkita element bir xil manzilga ishora qilishi muqarrar."
    }
  ]
};
