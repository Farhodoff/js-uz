export const dsaStringAlgos = {
  id: "dsaStringAlgos",
  title: "Satrlar bilan Ishlash Algoritmlari (KMP, Rabin-Karp, Z-Algorithm)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Satr (String) algoritmlari matnlar ichidan andozalarni (pattern) qidirish, matnlar o'xshashligini tekshirish va matnli ma'lumotlarni tahlil qilish uchun ishlatiladi.

### Qidiruv tizimi o'xshatishi:
- **KMP (Knuth-Morris-Pratt):** Tasavvur qiling, siz kitobdan "ABABAC" so'zini qidiryapsiz. Agar siz "ABABA" ni o'qib, 6-harfda adashib ketsangiz, boshidan boshlamaysiz. "ABA" allaqachon to'g'ri o'qilganini bilib, KMP andozadagi takrorlanuvchi qismlarga tayanib, chap tomonga siljimay oldinga qidirishni davom ettiradi.
- **Rabin-Karp (Xeshli Qidiruv):** Bu xuddi andozaning "raqamli imzosi" (xesh) bilan matndagi har bir bo'lakning xeshini solishtirishga o'xshaydi. Faqat xeshlar mos kelgandagina so'zni harfma-harf solishtirib ko'radi, bu esa qidiruvni tezlashtiradi.
- **Z-Algorithm:** Matnning har bir indeksidan boshlanadigan qism-matnning umumiy prefiksi (boshlanishi) uzunligini saqlab boruvchi "Z-massiv" yordamida andozalarni tezkor topish usuli.

---

## 2. 💻 Real Kod Misollari

Rabin-Karp algoritmi yordamida andozani matn ichidan qidirish (sodda xesh misolida):

\`\`\`javascript
function rabinKarpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const prime = 101; // Tub son
  const indices = [];

  let patternHash = 0;
  let textHash = 0;
  let h = 1;

  // h = Math.pow(256, m - 1) % prime
  for (let i = 0; i < m - 1; i++) {
    h = (h * 256) % prime;
  }

  // Boshlang'ich xesh qiymatlarini hisoblash
  for (let i = 0; i < m; i++) {
    patternHash = (256 * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (256 * textHash + text.charCodeAt(i)) % prime;
  }

  // Oyna bo'ylab siljish
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      // Xeshlar mos kelganda harfma-harf tekshirish (kolliziya xavfi)
      let j;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) break;
      }
      if (j === m) indices.push(i);
    }

    // Keyingi oyna xeshini hisoblash (Rolling Hash)
    if (i < n - m) {
      textHash = (256 * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
      if (textHash < 0) textHash = textHash + prime;
    }
  }

  return indices;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### KMP va LPS massivi:
1. KMP andozaning **LPS (Longest Proper Prefix which is also Suffix)** massivini quradi.
2. LPS massivi andozadagi har bir pozitsiya uchun undan oldingi qismning eng uzun prefiksi va suffiksi mosligini saqlaydi.
3. Qidiruv jarayonida xatolik yuz bersa, matn ko'rsatkichi orqaga qaytmaydi, andoza ko'rsatkichi LPS bo'yicha siljiydi. Bu esa $O(N + M)$ tezlikni ta'minlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Rabin-Karpda Rolling Hash formulasida manfiy xeshni to'g'rilamaslik
Rolling hash formulasida element ayirilganda xesh manfiy songa aylanib qolishi mumkin. Modulo (%) amali JS-da manfiy natija beradi, bu esa xato indeks hisoblanishiga sabab bo'ladi.
* **Tuzatish:** Modulo amali oldidan har doim manfiy songa bo'luvchi modulni (prime) qo'shib yuboring: \`hash = (hash + prime) % prime\`.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Satrdan andoza qidirishda (String Matching) eng sodda yondashuv (Naive) qanday vaqt oladi?**
   * *Javob:* Eng yomon holatda O(N * M) vaqt oladi (masalan matn: \"AAAAAA\", andoza: \"AAB\").
2. **KMP algoritmi qanday vaqt murakkabligiga ega?**
   * *Javob:* O(N + M) vaqt oladi (bu yerda N - matn uzunligi, M - andoza uzunligi).
3. **LPS (Longest Prefix Suffix) massivi nima?**
   * *Javob:* Andoza ichidagi har bir pozitsiya uchun, o'sha joygacha bo'lgan qism-satrning ham prefiksi, ham suffiksi bo'lgan eng uzun mos bo'lak uzunligi.
4. **KMP algoritmi nega Naive algoritmga qaraganda tezroq?**
   * *Javob:* Chunki andoza mos kelmay qolganda, KMP matn ko'rsatkichini orqaga qaytarmaydi, andozani LPS jadvali bo'yicha oldinga suradi.
5. **Rabin-Karp algoritmi qaysi matematik tushunchaga asoslangan?**
   * *Javob:* Rolling Hash (siljuvchi xesh) yordamida andozaning xesh qiymatini tezkor yangilab borishga.
6. **Rolling Hash nima?**
   * *Javob:* Matn bo'ylab andoza uzunligidagi oynani siljitganda, yangi xeshni boshidan hisoblamasdan, chiqib ketayotgan belgini ayirib va kirayotgan yangi belgini qo'shib O(1) da hisoblash usuli.
7. **Rabin-Karp algoritmining o'rtacha va eng yomon vaqt murakkabligi qanday?**
   * *Javob:* O'rtacha O(N + M), eng yomon holatda (barcha xeshlar kolliziya bo'lganda) O(N * M) bo'ladi.
8. **Z-Algorithm and Z-array nima?**
   * *Javob:* Z-array har bir i indeks uchun text.substring(i) ning text bilan eng uzun umumiy prefiksi uzunligini saqlaydi. U O(N) da quriladi.
9. **Kolliziya (Collision) Rabin-Karpda qachon sodir bo'ladi?**
   * *Javob:* Ikki xil satr bo'laklarining xesh qiymatlari bir xil bo'lib qolganida. Buni aniqlash uchun xesh mos kelganda harfma-harf solishtirib ko'riladi.
10. **Trie (Daraxtsimon) va oddiy Satr qidiruv algoritmlari farqi nima?**
    * *Javob:* KMP bitta andozani qidirishga moslashgan. Trie esa ko'plab andozalar lug'atidan bir vaqtda qidirish uchun ishlatiladi.
11. **Suffix Array va Suffix Tree nima?**
    * *Javob:* Matnning barcha suffikslarini (oxirgi bo'laklarini) tartiblangan holda saqlovchi va andozani O(M log N) da qidirishga imkon beruvchi murakkab ma'lumot tuzilmalari.
12. **Anagramma (Anagram) nima?**
    * *Javob:* Ikki satrning harflari tarkibi bir xil bo'lib, faqat ularning joylashuvi farq qiladigan holat (masalan, \"anagram\" va \"nagaram\").

---

## 6. 🎨 Interaktiv Vizual

### KMP LPS massivi misoli: \"ABACABA\"
Har bir indeksgacha bo'lgan prefiks va suffiks mosligi:

\`\`\`mermaid
graph TD
    A["A (0)"] --> B["AB (0)"]
    B --> C["ABA (1)"]
    C --> D["ABAC (0)"]
    D --> E["ABACA (1)"]
    E --> F["ABACAB (2)"]
    F --> G["ABACABA (3)"]
    style C fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style G fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Satr algoritmlarini kodlab, ularning samaradorligini sinang.

---

## 8. 📝 12 ta Mini Test

Satr algoritmlari bo'yicha mini testlar.

---

## 9. 🚀 Performance va Optimization

- **Rabin-Karp xesh taqsimoti:** Xesh formulasida tub son (masalan, 101 yoki 1000000007) ishlatib, kolliziyalar sonini kamaytiring.

---

## 10. 📌 Cheat Sheet

| Algoritm | Eng Yaxshi Vaqt | Eng Yomon Vaqt | Xotira murakkabligi | O'ziga xosligi |
| :--- | :--- | :--- | :--- | :--- |
| **Naive Search** | O(N) | O(N * M) | O(1) | Sodda, qo'shimcha xotirasiz |
| **KMP** | O(N + M) | O(N + M) | O(M) | LPS massiviga tayanadi |
| **Rabin-Karp** | O(N + M) | O(N * M) | O(1) | Rolling Hash va Xesh solishtirish |
| **Z-Algorithm** | O(N) | O(N) | O(N) | Z-massiv prefiks o'lchovlari |
`,
  exercises: [
    {
      id: 1,
      title: "KMP uchun LPS Massivi Tuzish",
      instruction: "Berilgan `pattern` andozasi uchun KMP algoritmida ishlatiladigan LPS (Longest Prefix Suffix) massivini hisoblovchi `computeLPS(pattern)` funksiyasini yozing.",
      startingCode: "function computeLPS(pattern) {\n  const lps = Array(pattern.length).fill(0);\n  let len = 0;\n  let i = 1;\n  // Kodni yozing\n  return lps;\n}",
      hint: "Sikl yordamida i-element pattern[len] bilan mos kelganda len-ni oshirib lps[i]-ga yozing. Mos kelmasa, agar len !== 0 bo'lsa len = lps[len-1] qilib qayta tekshiring, aks holda lps[i] = 0 va i++.",
      test: "const sandbox = new Function(code + '; return computeLPS;'); const fn = sandbox(); const res = fn('ABABCABAB'); if (res && res[2] === 1 && res[4] === 0 && res[8] === 4) return null; return 'LPS massivini hisoblashda xatolik yuz berdi';"
    },
    {
      id: 2,
      title: "Rabin-Karp Xesh Qiymat Hisoblagich",
      instruction: "Berilgan satr `str` ning xesh qiymatini oddiy polinom hisoblash formulasi yordamida topuvchi `simpleStringHash(str, prime)` funksiyasini yozing. Formula: `(str.charCodeAt(0) * base^(len-1) + ... + str.charCodeAt(len-1)) % prime` (bu yerda `base = 256`).",
      startingCode: "function simpleStringHash(str, prime) {\n  let hash = 0;\n  const base = 256;\n  // Kodni yozing\n  return hash;\n}",
      hint: "Sikl yordamida har bir belgi kodini hashga qo'shing va modulo prime qiling: `hash = (hash * base + str.charCodeAt(i)) % prime`.",
      test: "const sandbox = new Function(code + '; return simpleStringHash;'); const fn = sandbox(); const h1 = fn('abc', 101); if (h1 >= 0 && h1 < 101 && typeof h1 === 'number') return null; return 'Xesh funksiyasi noto\\'g\\'ri qiymat qaytardi';"
    },
    {
      id: 3,
      title: "Anagramma Tekshirgich (Optimal)",
      instruction: "Ikki berilgan satr `s1` va `s2` bir-biriga anagramma (harflar soni va tarkibi bir xil) ekanligini aniqlovchi optimal `isAnagram(s1, s2)` funksiyasini yozing. Vaqt murakkabligi O(N) bo'lishi lozim.",
      startingCode: "function isAnagram(s1, s2) {\n  // Kodni yozing\n}",
      hint: "Agar uzunliklar har xil bo'lsa false qaytaring. Map yoki bitta xesh-obyekt ochib, s1 dagi harflarni hisoblab qo'shing, s2 dagilarini esa ayiring. Oxirida barcha qiymatlar 0 bo'lishini tekshiring.",
      test: "const sandbox = new Function(code + '; return isAnagram;'); const fn = sandbox(); if (fn('anagram', 'nagaram') === true && fn('rat', 'car') === false) return null; return 'Anagramma tekshirishda xatolik yuz berdi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Satr ichidan andoza qidirishda (String Matching) Naive (Sodda) yondashuvning eng yomon vaqt murakkabligi qanday?",
      options: [
        "O(N + M)",
        "O(N * M)",
        "O(log N)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Naive yondashuv har bir indeks uchun andozani boshidan boshlab to'liq solishtiradi, eng yomon holatda bu O(N * M) qadam talab qiladi."
    },
    {
      id: 2,
      question: "KMP (Knuth-Morris-Pratt) algoritmining vaqt murakkabligi qanday?",
      options: [
        "O(N * M)",
        "O(N + M)",
        "O(N log M)",
        "O(2^N)"
      ],
      correctAnswer: 1,
      explanation: "KMP andozadagi LPS jadvalidan foydalanib, matn ko'rsatkichini orqaga qaytarmaganligi sababli vaqt murakkabligi O(N + M) bo'ladi."
    },
    {
      id: 3,
      question: "KMP algoritmidagi 'LPS' qisqartmasi nimani anglatadi?",
      options: [
        "Last Position Saved",
        "Longest Prefix Suffix (ham prefiks, ham suffiks bo'lgan eng uzun qism)",
        "Linear Pattern Search",
        "Loop Pointer Structure"
      ],
      correctAnswer: 1,
      explanation: "LPS - Longest Proper Prefix which is also a Suffix (ham prefiks, ham suffiks bo'lgan eng uzun andoza bo'lagi)."
    },
    {
      id: 4,
      question: "KMP algoritmi qidiruv davomida andoza mos kelmay qolsa, qanday yo'l tutadi?",
      options: [
        "Matn ko'rsatkichini boshiga qaytaradi",
        "LPS massivi yordamida andoza ko'rsatkichini kerakli joyga siljitib, matndagi joriy belgidan tekshirishni davom ettiradi",
        "Dasturni to'xtatadi",
        "Satrni teskari o'qiydi"
      ],
      correctAnswer: 1,
      explanation: "KMP matnda orqaga qaytmaydi, balki andoza ichidagi takrorlanuvchi qismlarga tayanib andozani suradi."
    },
    {
      id: 5,
      question: "Rabin-Karp algoritmi andozani qidirishda qaysi usuldan foydalanadi?",
      options: [
        "LPS massividan",
        "Rolling Hash (siljuvchi xesh) va xesh qiymatlarini solishtirishdan",
        "Daraxtlarni aylanib chiqishdan",
        "Saralashdan"
      ],
      correctAnswer: 1,
      explanation: "Rabin-Karp andoza xeshini matn bo'laklari xeshi bilan solishtirib andoza bor-yo'qligini tekshiradi."
    },
    {
      id: 6,
      question: "Rabin-Karp algoritmida 'Rolling Hash' (Siljuvchi xesh) afzalligi nimada?",
      options: [
        "U kodni xavfsiz shifrlaydi",
        "U yangi pozitsiyadagi oynaning xesh qiymatini oldingi xesh orqali O(1) vaqtda hisoblash imkonini beradi",
        "U xotirani 0 ga tushiradi",
        "U faqat JS dvigatellarida ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Rolling hash butun matn bo'lagini qaytadan xesh qilmay, chiqib ketgan belgini ayirib, kirganini qo'shish orqali xeshni O(1) da yangilaydi."
    },
    {
      id: 7,
      question: "Rabin-Karp algoritmining eng yomon vaqt murakkabligi qachon yuz beradi?",
      options: [
        "Matn juda qisqa bo'lganda",
        "Ko'plab matn bo'laklarining xesh qiymatlari andoza xeshi bilan mos kelib (kolliziya bo'lib), har safar harfma-harf to'liq solishtirishga to'g'ri kelganda",
        "Modulo ishlatilmaganda",
        "Hech qanday moslik topilmaganda"
      ],
      correctAnswer: 1,
      explanation: "Agar yomon xesh funksiya tufayli yoki andozaning barcha harflari bir xil bo'lsa va xeshlar tez-tez mos kelsa, Rabin-Karp O(N * M) ga aylanib ketadi."
    },
    {
      id: 8,
      question: "Z-Algorithm qanday vaqt murakkabligida ishlaydi?",
      options: [
        "O(N * M)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 1,
      explanation: "Z-Algorithm matn va andoza birlashtirilgan yangi satr uchun Z-massivini chiziqli O(N) vaqt ichida hisoblab beradi."
    },
    {
      id: 9,
      question: "Z-massivdagi (Z-array) har bir Z[i] qiymati nimani anglatadi?",
      options: [
        "i-indeksdagi belgi kodini",
        "i-indeksdan boshlanadigan qism-satrning butun satr prefiksi bilan bo'lgan eng uzun mosligi uzunligini",
        "Satrdagi 'Z' harflari sonini",
        "Andoza uzunligini"
      ],
      correctAnswer: 1,
      explanation: "Z[i] satrning i-indeksidan boshlangan substringning jami satr bilan eng uzun umumiy prefiksi (LCP) uzunligidir."
    },
    {
      id: 10,
      question: "Nima uchun Rabin-Karp algoritmi rolling hash hisoblashda tub son (prime number) ishlatadi?",
      options: [
        "Modulo amalini tezlashtirish uchun",
        "Xesh taqsimoti yaxshi bo'lishi va kolliziyalar (xesh to'qnashuvlari) sonini kamaytirish uchun",
        "JS tub sonlarsiz ishlay olmagani uchun",
        "Kod xavfsizligini ta'minlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Tub sonlar modulo olinayotganda xesh kodlarining bir xil indeksga tushib qolish (kolliziya) ehtimolini sezilarli darajada kamaytiradi."
    },
    {
      id: 11,
      question: "Trie ma'lumot tuzilmasining satrlar bilan ishlashdagi o'rni qanday?",
      options: [
        "Faqat bitta satrni saqlash",
        "Ko'plab satrlar/so'zlar lug'atini saqlab, ulardan tezkor andoza yoki prefiks qidirishni O(L) vaqtda bajarish",
        "Satrlarni alifbo bo'yicha tezkor saralash",
        "Matnlarni siqish"
      ],
      correctAnswer: 1,
      explanation: "Trie (Prefix tree) yordamida katta lug'atlardan so'zlarni ularning uzunligi L qadamida qidirib topish mumkin."
    },
    {
      id: 12,
      question: "Ikki satr anagramma ekanligini eng optimal (xotira va vaqt bo'yicha) tekshirish yo'li qaysi?",
      options: [
        "Ikkala satrni saralab (`sort`), keyin solishtirish",
        "Xesh-jadval orqali harflar chastotasini hisoblab chiqish va solishtirish (vaqt murakkabligi O(N))",
        "Nested loop yordamida solishtirish",
        "Satrlarni sonlarga o'tkazib solishtirish"
      ],
      correctAnswer: 1,
      explanation: "Xesh-jadval (Map) orqali harflar sonini hisoblash O(N) vaqt oladi, sort qilish esa O(N log N) vaqt oladi."
    }
  ]
};
