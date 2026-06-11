export const dsaTries = {
  id: "dsaTries",
  title: "Trie: Prefiks Daraxtlari (Tries & Prefix Search)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Trie (talaffuzi: 'Tray') yoki Prefiks daraxti (Prefix Tree) - bu asosan satrlar (matnlar) ustida o'ta tezkor qidiruv, avto-to'ldirish (Autocomplete) va lug'at vazifalarini bajarish uchun mo'ljallangan maxsus shoxlangan daraxt tuzilmasidir.

### Smartfon klaviaturasi analogiyasi:
- **Trie (Prefiks daraxti):** Siz smartfoningizda 's' harfini yozganingizda, u 'salom', 'sariq', 'sut' kabi so'zlarni taklif qiladi. Klaviatura orqa fonda 's' prefiksi bilan boshlanadigan barcha so'zlar tarmog'iga kirib boradi.
- **Tugunlar (Nodes):** Triening har bir tuguni butun boshli so'zni emas, balki **bitta harfni** saqlaydi. Ildiz (root) tugun bo'sh bo'ladi.
- **Path (Yo'l):** Ildizdan boshlab pastga qarab yurilgan yo'l so'zni hosil qiladi. Masalan, 's' -> 'a' -> 'l' -> 'o' -> 'm' shoxlari bo'ylab yursak, 'salom' so'zi hosil bo'ladi. Har bir so'z tugash nuqtasida maxsus belgi (masalan, \`isEndOfWord = true\`) qo'yiladi.

---

## 2. 💻 Real Kod Misollari

Javaskriptda TrieNode va to'liq Trie (Prefiks daraxti) klassi:

\`\`\`javascript
class TrieNode {
  constructor() {
    this.children = {}; // Harflar xaritasi
    this.isEndOfWord = false; // So'z tugash belgisi
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // So'z qo'shish (Insert) - O(L) vaqt, bu yerda L - so'z uzunligi
  insert(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### O'ta tezkor qidiruv unumdorligi:
- Agar bizda 1 millionta so'zdan iborat oddiy massiv bo'lsa, bitta so'zni qidirish $O(N)$ yoki saralangan bo'lsa $O(\\log N)$ vaqt oladi.
- Trie daraxtida esa, so'z qidirish faqat va faqat qidirilayotgan so'zning uzunligi ($L$) ga bog'liq: $O(L)$ vaqt. Lug'atda nechta so'z (million yoki milliard) borligi qidirish tezligiga mutlaqo ta'sir qilmaydi!
- **Space complexity:** Harflar o'zaro umumiy prefikslarni baham ko'rgani sababli (masalan, 'salom', 'sariq' va 'sut' so'zlari bitta umumiy 's' tugunidan shoxlanadi), xotira sezilarli darajada tejaladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. So'z tugallanish belgisini (isEndOfWord) qo'yishni unutish
Trie daraxtiga so'z kiritilgandan so'ng, eng oxirgi harf tugunida \`isEndOfWord = true\` bayrog'ini o'rnatish shart.
* **Oqibati:** Agar bu qo'yilmasa, daraxtda 'salom' so'zi borligini tekshirganda, qidiruv funksiyasi uni mustaqil so'z deb hisoblamasdan, xato ravishda \`false\` qaytaradi.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Trie (Prefiks daraxti) nima?**
   * *Javob:* Matnli ma'lumotlarni qidirish va saqlash uchun mo'ljallangan, har bir tugun bitta harf saqlovchi iyerarxik daraxt.
2. **Trie-da so'z qidirish (search) vaqt murakkabligi qanday?**
   * *Javob:* O(L) doimiy kabi tez, bu yerda L - qidirilayotgan so'zning uzunligi. U lug'at o'lchamiga bog'liq emas.
3. **isEndOfWord bayrog'i nima uchun ishlatiladi?**
   * *Javob:* Ildizdan boshlangan yo'l tugagach, u yerda haqiqiy so'z tugaganini bildirish uchun (masalan, 'salom' so'zidan keyin 'salomlar' bo'lsa, 'm' harfida so'z tugagani belgilanadi).
4. **Trie-ning oddiy xesh-jadvaldan (Hash Table) ustunligi nimada?**
   * *Javob:* Xesh-jadvalda faqat to'liq mos kelishni qidirish mumkin. Trie esa umumiy prefiksli (masalan, 'sal' bilan boshlanadigan) barcha so'zlarni bir zumda topib bera oladi (Prefix search/Autocomplete).
5. **Trie xotira murakkabligi (Space Complexity) qanday baholanadi?**
   * *Javob:* O(W * L) gacha bo'lishi mumkin, bu yerda W - so'zlar soni, L - o'rtacha uzunlik. Biroq, umumiy prefikslar bitta tugunni ishlatgani sababli xotira tejaladi.
6. **Trie-da so'zni qanday kiritiladi (insert)?**
   * *Javob:* So'zdagi har bir harf bo'ylab pastga yuriladi. Agar joriy harfli tugun bo'lmasa, yangi node yaratiladi va oxirida isEndOfWord true qilinadi.
7. **Trie-dan so'zni o'chirish (delete) qanday amalga oshiriladi?**
   * *Javob:* Oxirgi harfdagi isEndOfWord false qilinadi. Agar o'sha tugunning boshqa bolalari bo'lmasa, xotirani bo'shatish uchun pastdan yuqoriga qarab keraksiz tugunlar o'chirib chiqiladi.
8. **Trie daraxtining ildiz (root) tugunida qaysi belgi saqlanadi?**
   * *Javob:* Ildiz tugun odatda bo'sh bo'ladi (qiymat saqlamaydi), u faqat bosh harflarga yo'l ochadi.
9. **Trie-da 'starts-with' (prefiks qidiruv) qanday ishlaydi?**
   * *Javob:* Prefiksdagi har bir harf bo'ylab pastga tushiladi. Agar yo'l uzilib qolmasa, demak ushbu prefiksli so'zlar mavjud (true qaytadi).
10. **Suffix Tree va Trie farqi nimada?**
    * *Javob:* Trie so'zlarning boshlanish prefiksini saqlasa, Suffix Tree so'zlarning barcha oxirgi qismlarini (saffikslarini) saqlaydi, bu matn ichidan qidirishda yordam beradi.
11. **Trie-ning orqasida qaysi dasturlar turadi?**
    * *Javob:* IP-manzillarni yo'naltirish (routing tables), lug'at tekshirgichlar (Spell checkers) va qidiruv tizimlaridagi avto-takliflar (Autocomplete).
12. **Trie tugunidagi 'children' xaritasi qanday tuzilmalar yordamida amalga oshirilishi mumkin?**
    * *Javob:* Oddiy massiv (o'lchami 26 bo'lgan alifbo uchun), xesh-xarita (Hash Map) yoki dynamic obyekt (\`{}\`) yordamida.

---

## 6. 🎨 Interaktiv Vizual

### Trie Prefiks Daraxti Struktura Ko'rinishi
'sal', 'salom' va 'sut' kiritilgan Trie daraxti:

\`\`\`mermaid
graph TD
    Root((Bo'sh Ildiz))
    s((s))
    a((a))
    u((u))
    l((l*))
    t((t*))
    o((o))
    m((m*))
    Root --> s
    s --> a
    s --> u
    a --> l
    u --> t
    l --> o
    o --> m
    style Root fill:#f5ee9e,stroke:#f39c12,stroke-width:2px
    style l fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style t fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style m fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`
*(Eslatma: \`*\` belgili tugunlar \`isEndOfWord = true\` ekanini bildiradi)*

---

## 7. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni bajaring.

---

## 8. 📝 12 ta Mini Test

Prefiks daraxtlari bo'yicha mini testlar.

---

## 9. 🚀 Performance va Optimization

- **TrieNode optimallashtirish:** Agar faqat ingliz tili kichik harflari bo'lsa, xarita o'rniga 26 o'lchamli massiv ishlatish lookup tezligini maksimal qiladi, chunki indeks \`char.charCodeAt(0) - 97\` orqali O(1) aniqlanadi.

---

## 10. 📌 Cheat Sheet

| Amallar | Vaqt murakkabligi | Xotira murakkabligi | Izoh |
| :--- | :--- | :--- | :--- |
| **Insert Word** | O(L) | O(L) | L - so'z uzunligi |
| **Search Word** | O(L) | O(1) | Lug'at hajmiga bog'liq emas |
| **Starts With** | O(L) | O(1) | Prefiks tekshirish |
`,
  exercises: [
    {
      id: 1,
      title: "Trie-da So'z Qidirish (Search Word)",
      instruction: "Trie klassiga so'z bor yoki yo'qligini tekshiruvchi `search(word)` metodini qo'shing. Agar so'z to'liq mavjud bo'lsa va oxirgi harfida `isEndOfWord === true` bo'lsa `true`, aks holda `false` qaytsin.",
      startingCode: "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEndOfWord = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  \n  insert(word) {\n    let curr = this.root;\n    for (let char of word) {\n      if (!curr.children[char]) curr.children[char] = new TrieNode();\n      curr = curr.children[char];\n    }\n    curr.isEndOfWord = true;\n  }\n  \n  search(word) {\n    // Kodni yozing\n  }\n}",
      hint: "Ildizdan boshlab har bir harf bo'ylab pastga yuring. Agar shox uzilsa `false` qaytaring. Oxirida `curr.isEndOfWord` qiymatini qaytaring.",
      test: "const sandbox = new Function(code + '; return Trie;'); const TrieClass = sandbox(); const t = new TrieClass(); t.insert('apple'); if (t.search('apple') === true && t.search('app') === false) return null; return 'Qidiruv funksiyasi noto\\'g\\'ri ishladi';"
    },
    {
      id: 2,
      title: "Trie-da Prefiks Tekshirish (Starts With)",
      instruction: "Trie klassiga berilgan `prefix` bilan boshlanadigan biror so'z bor yoki yo'qligini tekshiruvchi `startsWith(prefix)` metodini qo'shing. Agar shunday so'z bo'lsa `true`, bo'lmasa `false` qaytsin.",
      startingCode: "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEndOfWord = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  \n  insert(word) {\n    let curr = this.root;\n    for (let char of word) {\n      if (!curr.children[char]) curr.children[char] = new TrieNode();\n      curr = curr.children[char];\n    }\n    curr.isEndOfWord = true;\n  }\n  \n  startsWith(prefix) {\n    // Kodni yozing\n  }\n}",
      hint: "Prefiks harflari bo'yicha pastga yuring. Agar yo'l oxirigacha yetib borsa `true`, o'rtada uzilsa `false` qaytaring (isEndOfWord tekshirish shart emas).",
      test: "const sandbox = new Function(code + '; return Trie;'); const TrieClass = sandbox(); const t = new TrieClass(); t.insert('apple'); if (t.startsWith('app') === true && t.startsWith('ape') === false) return null; return 'Prefiks tekshirish to\\'g\\'ri ishlamadi';"
    },
    {
      id: 3,
      title: "Avto-to'ldirish Takliflari (Autocomplete Options)",
      instruction: "Trie klassiga berilgan `prefix` bilan boshlanadigan barcha so'zlarni massiv ko'rinishida qaytaruvchi `autocomplete(prefix)` metodini qo'shing. Agar mos so'zlar bo'lmasa, bo'sh massiv qaytsin.",
      startingCode: "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEndOfWord = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  \n  insert(word) {\n    let curr = this.root;\n    for (let char of word) {\n      if (!curr.children[char]) curr.children[char] = new TrieNode();\n      curr = curr.children[char];\n    }\n    curr.isEndOfWord = true;\n  }\n  \n  autocomplete(prefix) {\n    // Kodni yozing\n  }\n}",
      hint: "Avval prefiks bo'yicha oxirgi tugunga tushing. O'sha tugundan boshlab barcha pastki tugunlarni DFS aylanib, topilgan so'zlarni yig'ing.",
      test: "const sandbox = new Function(code + '; return Trie;'); const TrieClass = sandbox(); const t = new TrieClass(); t.insert('cat'); t.insert('car'); t.insert('dog'); const res = t.autocomplete('ca'); if (res && res.includes('cat') && res.includes('car') && !res.includes('dog')) return null; return 'Avto-to\\'ldirish takliflari xato qaytdi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Trie (Prefiks daraxti) ma'lumotlar tuzilmasining eng asosiy maqsadi nima?",
      options: [
        "Sonlarni saralash",
        "Matnli ma'lumotlarni, ayniqsa prefikslar va lug'atlarni o'ta tezkor qidirish va boshqarish",
        "Ikki nuqta o'rtasidagi eng qisqa yo'lni topish",
        "Ma'lumotlar bazasini shifrlash"
      ],
      correctAnswer: 1,
      explanation: "Trie prefikslar yordamida so'zlar bilan ishlashga mo'ljallangan bo'lib, avto-to'ldirish va lug'at qidirishlarida eng samarali tuzilma hisoblanadi."
    },
    {
      id: 2,
      question: "Trie daraxtining bitta tuguni (Node) odatda nimani saqlaydi?",
      options: [
        "Butun bir so'zni",
        "Bitta harfni (belgini) va bolalariga (keyingi harflarga) eltuvchi havolalar xaritasini",
        "SQL so'rovlarini",
        "Massiv uzunligini"
      ],
      correctAnswer: 1,
      explanation: "Trie tuguni har bir harfni alohida shox ko'rinishida saqlaydi va uning ostida qaysi harflar davom etishi mumkinligini ko'rsatuvchi children xaritasi bo'ladi."
    },
    {
      id: 3,
      question: "Nima uchun Trie-da so'z qidirish (Search) unumdorligi lug'at hajmi (N) ga bog'liq emas?",
      options: [
        "Chunki u xotirani o'chirib yuboradi",
        "Chunki qidiruv faqat qidirilayotgan so'zning uzunligi (L) bo'yicha harflar zanjirini tekshiradi, ya'ni O(L) vaqt oladi",
        "Chunki u faqat local kompyuterda ishlaydi",
        "Chunki barcha so'zlar bir xil"
      ],
      correctAnswer: 1,
      explanation: "Trie-da so'z qidirishda butun lug'at aylanilmaydi, faqat qidirilayotgan so'z harflari bo'ylab ildizdan pastga tushiladi (O(word_length))."
    },
    {
      id: 4,
      question: "Trie-da 'isEndOfWord' (so'z oxiri) bayrog'i nima uchun kerak?",
      options: [
        "Dasturni majburiy to'xtatish uchun",
        "Ushbu tugunda (harfda) ma'lum bir mustaqil so'z yakunlanganini bildirish uchun (masalan, 'salom' va 'salomlar' so'zlarini ajratish)",
        "Satrdagi harflar sonini hisoblash uchun",
        "Hech qanday ahamiyati yo'q"
      ],
      correctAnswer: 1,
      explanation: "Agar bu bayroq bo'lmasa, prefiks va to'liq so'zni ajratib bo'lmaydi. Masalan, 'app' kiritilganda u shunchaki 'apple' so'zining bo'lagimi yoki mustaqil so'zmi ekanini bilib bo'lmas edi."
    },
    {
      id: 5,
      question: "Trie xotirani tejash xususiyati (Space Efficiency) qaysi omilga bog'liq?",
      options: [
        "Kompyuter tezligiga",
        "So'zlar bir xil prefikslarga ega bo'lsa, umumiy harflarni (shoxlarni) bitta tugun sifatida baham ko'rishiga",
        "Faqat qisqa so'zlar kiritilishiga",
        "Rekursiya ishlatilmasligiga"
      ],
      correctAnswer: 1,
      explanation: "Misol uchun, 'salom', 'sariq' va 'sut' so'zlari uchun alohida 3 ta 's' harfi yaratilmaydi, ular bitta umumiy 's' tugunidan shoxlanib ketadi va bu xotirani tejaydi."
    },
    {
      id: 6,
      question: "Trie-ga 'apple' so'zi kiritilgan. 'app' so'zini qidirganda (search) qanday natija chiqadi?",
      options: [
        "true",
        "false",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "'app' so'zi daraxtda prefiks sifatida bor, lekin u mustaqil so'z sifatida kiritilmagani uchun (p harfida isEndOfWord false bo'ladi), search() false qaytaradi."
    },
    {
      id: 7,
      question: "Trie-da 'startsWith('app')' so'ralganda qanday natija qaytadi (agar 'apple' kiritilgan bo'lsa)?",
      options: [
        "false",
        "true",
        "null",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "`startsWith` faqat prefiks borligini tekshiradi (isEndOfWord-ga qaramaydi). Shuning uchun u true qaytaradi."
    },
    {
      id: 8,
      question: "Trie ildiz (root) tuguni haqida qaysi fikr to'g'ri?",
      options: [
        "U doimo 'A' belgisini saqlaydi",
        "U qiymatsiz bo'sh tugun bo'lib, keyingi barcha harflarga ko'rsatkich pointer vazifasini bajaradi",
        "U massivning oxirgi elementidir",
        "Ildiz tugun bo'lishi shart emas"
      ],
      correctAnswer: 1,
      explanation: "Trie root nodi hech qanday harf saqlamaydi. U faqat so'zlarning birinchi harflari boshlanadigan darajaga havola beradi."
    },
    {
      id: 9,
      question: "Trie-dan so'zni butunlay o'chirishda qaysi holatni hisobga olish kerak?",
      options: [
        "Hech narsani, shunchaki xotirani o'chirib yuborish kerak",
        "O'chirilayotgan so'z boshqa uzunroq so'zning prefiksi emasligini (masalan, 'app'ni o'chirishda 'apple'ga tegmaslikni)",
        "Faqat oxirgi harfni o'chirishni",
        "O'chirish imkonsiz"
      ],
      correctAnswer: 1,
      explanation: "Agar 'app' o'chirilayotganda 'apple' mavjud bo'lsa, biz faqat 'p' tugunidagi isEndOfWord bayrog'ini false qilamiz va tugunlarga tegmaymiz."
    },
    {
      id: 10,
      question: "Smartfonlardagi 'Klaviatura avto-taklifi' (Autocomplete) qaysi tuzilmada tez ishlaydi?",
      options: [
        "Oddiy massiv",
        "Trie (Prefiks daraxti)",
        "Bog'langan ro'yxat",
        "Graf"
      ],
      correctAnswer: 1,
      explanation: "Trie foydalanuvchi kiritayotgan harflar zanjiridan pastga tushib, o'sha joydan tarqalgan barcha so'zlarni (avto-takliflarni) topishda o'ta tez ishlaydi."
    },
    {
      id: 11,
      question: "TrieNode-dagi 'children' xaritasini obyekt (`{}`) o'rniga 26 o'lchamli massiv sifatida yozishning afzalligi nimada?",
      options: [
        "Xotirani tejaydi",
        "Element lookup tezligini maksimal darajada barqaror O(1) qiladi (chunki xaritasiz indeks hisoblanadi)",
        "Unga so'zlarni ham yozsa bo'ladi",
        "Massiv ishlatish osonroq"
      ],
      correctAnswer: 1,
      explanation: "Massiv indekslari orqali belgilar to'g'ridan-to'g'ri topiladi, bu esa JavaScript obyektlaridagi xarita lookup operatsiyalaridan ko'ra tezroq ishlaydi."
    },
    {
      id: 12,
      question: "Spell Checker (Imlo tekshirgich) dasturlari qanday ishlaydi?",
      options: [
        "Faqat xatolarni hisoblaydi",
        "So'zni lug'at daraxtidan (Trie) qidirib ko'radi, agar isEndOfWord topilmasa, so'z xato deb hisoblanadi va o'xshash prefiksli takliflar ko'rsatiladi",
        "Matnni internetdan izlaydi",
        "Faqat harflarni solishtiradi"
      ],
      correctAnswer: 1,
      explanation: "Trie lug'atini aylanib chiqib, yozilgan so'zning mavjudligi tekshiriladi va xatoliklar aniqlanadi."
    }
  ]
};
