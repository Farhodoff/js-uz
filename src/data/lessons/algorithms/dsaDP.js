export const dsaDP = {
  id: "dsaDP",
  title: "Dinamik Dasturlash (Dynamic Programming)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Dinamik Dasturlash (Dynamic Programming / DP) - bu murakkab muammoni kichikroq o'xshash qism-muammolarga bo'lish, ularning natijalarini xotirada saqlab qolish va shu orqali hisob-kitoblarni qayta-qayta bajarmasdan o'ta samarali yechish usulidir.

### Daftar varag'i o'xshatishi:
- **Eskini eslab qolish:** Men sizdan so'rayman: "1 + 1 + 1 + 1 + 1 nechaga teng?" Siz sanab aytasiz: "5". 
- Endi men varaqning chetiga yana bitta "+ 1" yozaman va so'rayman: "Endi nechaga teng bo'ldi?" Siz boshidan sanamasdan, darhol: "6" deysiz.
- Nega boshidan sanamadingiz? Chunki siz oldingi natija "5" ekanini **eslab qoldingiz** (Memoization/Keshlash). Dinamik dasturlash aynan shu prinsipda ishlaydi: "O'tmishni eslab qol, kelajakni tezlashtir".

---

## 2. 💻 Real Kod Misollari

Fibonachchi sonlarini oddiy rekursiya ($O(2^N)$), Memoization ($O(N)$) va Tabulation ($O(N)$) yordamida hisoblash:

\`\`\`javascript
// 1. Memoization (Top-down - Yuqoridan pastga): Kesh bilan rekursiya
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n]; // Keshdan olish

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 2. Tabulation (Bottom-up - Pastdan yuqoriga): Sikl yordamida jadval to'ldirish
function fibTab(n) {
  if (n <= 1) return n;
  const table = new Array(n + 1);
  table[0] = 0;
  table[1] = 1;

  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n]; // Space: O(N) (buni O(1) xotiraga ham keltirish mumkin)
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Dinamik Dasturlash qo'llanilishi shartlari:
DP quyidagi ikki xususiyatga ega bo'lgan masalalarda ishlaydi:
1. **Overlapping Subproblems (Qayta kesishuvchi qism-muammolar):** Muammoning yechimi davomida bir xil kichik yechimlar qayta-qayta hisoblanishi kerak bo'lganda (masalan, $F(5)$ uchun $F(3)$ chaqiriladi, $F(4)$ uchun ham $F(3)$ chaqiriladi).
2. **Optimal Substructure (Optimal qism-tuzilma):** Katta muammoning optimal yechimini uning kichik qismlari optimal yechimlari yordamida yig'ish mumkin bo'lsa (masalan, $F(N) = F(N-1) + F(N-2)$).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Memoization'da keshni global o'zgaruvchi qilib e'lon qilish
Agar kesh global bo'lsa, funksiya har xil test topshiriqlarida (ixtiyoriy chaqiriqlarda) noto'g'ri, eski hisoblangan qiymatlarni qaytarib yuboradi.
* **Tuzatish:** Keshni har doim funksiya argumenti sifatida uzating (\`memo = {}\`) yoki funksiya ichida local scope'da e'lon qiling.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Dinamik Dasturlash (DP) nima?**
   * *Javob:* Kichik qism-muammolar natijasini eslab qolish (keshlash) orqali murakkab muammolarni yechish algoritmi.
2. **Memoization (Top-down) va Tabulation (Bottom-up) farqi nimada?**
   * *Javob:* Memoization rekursiya va keshdan foydalanib yuqoridan pastga yechadi. Tabulation esa sikl yordamida jadvalni to'ldirib, pastdan yuqoriga yechadi.
3. **Overlapping Subproblems nima?**
   * *Javob:* Algoritm ishlashi davomida bir xil hisob-kitoblarga qayta-qayta ehtiyoj tug'ilishi (kesishishi).
4. **Optimal Substructure nima?**
   * *Javob:* Muammoning eng optimal yechimini uning kichik qism-muammolari optimal yechimlari orqali qurish mumkinligi.
5. **Nima uchun Fibonachchini oddiy rekursiya yordamida yechish O(2^N) vaqt oladi?**
   * *Javob:* Chunki bir xil qiymatlar (masalan, F(2), F(3)) minglab marta qaytadan behuda hisoblanib, chaqiriqlar daraxtini hosil qiladi.
6. **DP-da xotirani O(N) dan O(1) ga tushirish (Space Optimization) qanday bo'ladi?**
   * *Javob:* Agar bizga faqatgina oxirgi 2 ta o'tgan qiymat kerak bo'lsa (Fibonachchi kabi), butun jadval massivini emas, faqat ikkita o'zgaruvchini saqlash orqali.
7. **Knapsack (Qop) muammosi nima?**
   * *Javob:* Ma'lum bir sig'imga ega qopga, umumiy qiymati maksimal bo'ladigan qilib buyumlarni joylashtirish (DP yordamida yechiladigan klassik masala).
8. **LCS (Longest Common Subsequence - Eng uzun umumiy qism-ketma-ketlik) nima?**
   * *Javob:* Ikki satr ichidagi ketma-ketligi buzilmagan, lekin yonma-yon turishi shart bo'lmagan eng uzun umumiy harflarni topish masalasi.
9. **DP va Divide & Conquer (Bo'lib tashla) farqi nimada?**
   * *Javob:* Divide & Conquer da qism-muammolar o'zaro kesishmaydi (mustaqil bo'ladi, masalan Merge Sort). DP-da esa qism-muammolar kesishadi (overlapping).
10. **DP yechimini yozishda eng birinchi qadam nima?**
    * *Javob:* Shartli o'tish formulasini (State Transition Relation) aniqlab olish (masalan, $dp[i] = dp[i-1] + dp[i-2]$).
11. **State (Holat) nima?**
    * *Javob:* DP jadvalining bitta katakchasi yoki parametri ifodalovchi ma'no (masalan, $dp[i]$ - i-chi qadamda turgan maksimal foyda).
12. **Nima uchun DP yechimlar ba'zan xotirani ko'p talab qiladi?**
    * *Javob:* Chunki 2D va 3D o'lchamli DP jadvallarini saqlash uchun massivlar o'lchami kattalashib, xotira yuklamasini oshiradi.

---

## 6. 🎨 Interaktiv Vizual

### Fibonachchi Chaqiriqlar Daraxtining Qisqarishi
Memoization orqali takroriy hisoblashlarning oldi olinishi:

\`\`\`mermaid
graph TD
    f5((F 5)) --> f4((F 4))
    f5 --> f3((F 3 - Keshdan))
    f4 --> f3_real((F 3))
    f4 --> f2((F 2 - Keshdan))
    f3_real --> f2_real((F 2))
    f3_real --> f1((F 1))
    style f3 fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style f2 fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Dinamik dasturlash bo'yicha masalalarni yeching.

---

## 8. 📝 12 ta Mini Test

Bilimingizni sinash uchun testlar.

---

## 9. 🚀 Performance va Optimization

- **Space Reduction:** Jadval to'ldirishda har doim oxirgi qatorga ishonuvchi 2D DP'larni 1D massivga o'tkazish orqali xotirani $O(V^2)$ dan $O(V)$ ga optimallang.

---

## 10. 📌 Cheat Sheet

| DP Turi | Afzalligi | Kamchiligi | Qo'llanilishi |
| :--- | :--- | :--- | :--- |
| **Top-Down (Memoization)** | Tushunish oson, faqat kerakli holatlar hisoblanadi | Rekursiya steki sarfi | Murakkab shartli holatlarda |
| **Bottom-Up (Tabulation)** | Stek sarfi yo'q, tezroq ishlaydi | Barcha holatlar hisoblanishi shart | Jadval o'lchami oldindan ma'lum bo'lsa |
`,
  exercises: [
    {
      id: 1,
      title: "Zinadan Ko'tarilish (Climbing Stairs)",
      instruction: "Sizda `n` ta qadamdan iborat zina bor. Har safar siz 1 yoki 2 qadam yuqoriga sakrashingiz mumkin. Zina tepasiga chiqishning jami necha xil turli usullari borligini aniqlovchi `climbStairs(n)` funksiyasini yozing. Vaqt murakkabligi O(N) bo'lsin.",
      startingCode: "function climbStairs(n) {\n  // Kodni yozing\n}",
      hint: "Bu masala aslida Fibonachchi ketma-ketligiga o'xshaydi. n-chi qadamga chiqish usullari soni: (n-1) va (n-2) qadamlardagi usullar yig'indisiga teng.",
      test: "const sandbox = new Function(code + '; return climbStairs;'); const fn = sandbox(); if (fn(2) === 2 && fn(3) === 3 && fn(5) === 8) return null; return 'Zinadan ko\\'tarilish yechimi noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Minimal Xarajatli Yo'l (Min Cost Climbing Stairs)",
      instruction: "Zina qadamlarining har birida ma'lum xarajat `cost` massivi berilgan (masalan: `[10, 15, 20]`). Siz 0 yoki 1-indeksdagi qadamdan boshlashingiz mumkin. Har safar 1 yoki 2 qadam yuqoriga o'tishingiz mumkin. Zina tepasiga yetib borish uchun ketadigan eng minimal xarajatni qaytaruvchi `minCostClimbingStairs(cost)` funksiyasini yozing.",
      startingCode: "function minCostClimbingStairs(cost) {\n  // Kodni yozing\n}",
      hint: "DP massivi yarating: `dp[i] = cost[i] + Math.min(dp[i-1], dp[i-2])`. Oxirida `Math.min(dp[n-1], dp[n-2])` ni qaytaring.",
      test: "const sandbox = new Function(code + '; return minCostClimbingStairs;'); const fn = sandbox(); if (fn([10, 15, 20]) === 15 && fn([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) === 6) return null; return 'Minimal xarajat xato hisoblandi';"
    },
    {
      id: 3,
      title: "O'g'ri Masalasi (House Robber)",
      instruction: "Uylardagi pullar ro'yxati `nums` massivida berilgan. O'g'ri bir-biriga qo'shni (yonma-yon) uylarni o'g'irlay olmaydi (signalizatsiya ishga tushadi). O'g'ri bitta tunda o'g'irlashi mumkin bo'lgan maksimal pul miqdorini aniqlovchi `rob(nums)` funksiyasini yozing.",
      startingCode: "function rob(nums) {\n  // Kodni yozing\n}",
      hint: "Formulasi: `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`. Har bir uyda ikki xil tanlov bor: joriy uyni o'g'irlash yoki o'g'irlamaslik.",
      test: "const sandbox = new Function(code + '; return rob;'); const fn = sandbox(); if (fn([1, 2, 3, 1]) === 4 && fn([2, 7, 9, 3, 1]) === 12) return null; return 'Maksimal o\\'g\\'irlangan pul noto\\'g\\'ri hisoblandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dinamik Dasturlashning (DP) asosiy g'oyasi nimadan iborat?",
      options: [
        "Massivlarni har doim ikkiga bo'lib qidirish",
        "Kichik qism-muammolar optimal yechimlarini eslab qolish (keshlash) orqali katta hisob-kitoblarni tezlashtirish",
        "Koddagi barcha o'zgaruvchilarni const qilish",
        "Faqat graflar bilan ishlash"
      ],
      correctAnswer: 1,
      explanation: "Dinamik dasturlash qayta takrorlanadigan hisob-kitoblarni xotirada saqlab, bir marta bajarish orqali unumdorlikni oshiradi."
    },
    {
      id: 2,
      question: "Memoization (Top-down) yondashuvi qanday ishlaydi?",
      options: [
        "Sikl yordamida massivni boshidan to'ldirib boradi",
        "Rekursiya va kesh (memo/object) yordamida yuqoridan pastga qarab ishlaydi va hisoblanganlarni keshga saqlaydi",
        "Faqat SQL bazalar bilan ishlaydi",
        "Stack xotirasini butunlay tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "Memoization - bu rekursiya davomida qiymatlarni keshga yozib borish orqali yuqoridan pastga yechish usulidir."
    },
    {
      id: 3,
      question: "Tabulation (Bottom-up) yondashuvi qanday ishlaydi?",
      options: [
        "Rekursiv chaqiriqlar steki yordamida",
        "Jadval (massiv) yaratib, uni sikl orqali eng kichik holatdan boshlab yuqoriga qarab to'ldiradi",
        "Ma'lumotlarni shifrlaydi",
        "Faqat qiyin shartlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Tabulation jadval to'ldirish bo'lib, eng kichik base case lardan boshlab tepaga qarab sikllar yordamida ishlaydi (rekursiyasiz)."
    },
    {
      id: 4,
      question: "DP qo'llash uchun masala qanday xususiyatlarga ega bo'lishi kerak?",
      options: [
        "Faqat manfiy sonlar bo'lishi shart",
        "Overlapping Subproblems (kesishuvchi kichik yechimlar) va Optimal Substructure (optimal qism-tuzilma)",
        "Massiv doimo saralangan bo'lishi kerak",
        "Sikllar soni cheklangan bo'lishi lozim"
      ],
      correctAnswer: 1,
      explanation: "Agar kichik muammolar takrorlanmasa (overlapping) yoki ulardan katta optimal yechim yig'ilmasa (optimal substructure), DP qo'llab bo'lmaydi."
    },
    {
      id: 5,
      question: "Dinamik dasturlash va Bo'lib tashla (Divide & Conquer) yondashuvining asosiy farqi nimada?",
      options: [
        "DP har doim sekinroq ishlaydi",
        "Divide & Conquer da qism-muammolar mustaqil (kesishmaydi, masalan saralashda). DP-da esa qism-muammolar kesishadi ( overlapping )",
        "Ular mutlaqo bir xil",
        "Divide & Conquer faqat stringlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Divide and Conquer muammoni kesishmaydigan mustaqil qismlarga bo'ladi. DP esa takrorlanadigan overlapping qismlar natijasini keshlashga tayanadi."
    },
    {
      id: 6,
      question: "Fibonachchi sonini oddiy rekursiya yordamida hisoblash nega samarasiz?",
      options: [
        "Chunki JS rekursiyani qo'llab-quvvatlamaydi",
        "Chunki bir xil Fibonachchi qiymatlari (masalan F(2), F(3)) minglab marta qaytadan behuda hisoblangani uchun vaqt murakkabligi O(2^N) bo'lib ketadi",
        "Chunki u faqat juft sonlarda ishlaydi",
        "Xotira to'lib qolgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Optimallashtirilmagan rekursiyada har bir chaqiriq yana ikkita chaqiriq yaratadi. Bir xil holatlar qayta-qayta hisoblangani uchun eksponentsial T(N) = O(2^N) vaqt oladi."
    },
    {
      id: 7,
      question: "State Transition Relation (Holat o'tish formulasi) nima?",
      options: [
        "Dastur yopilish sharti",
        "Katta muammoning joriy holatini uning oldingi kichik holatlari orqali bog'lovchi matematik formula",
        "Matnni o'zgartirish funksiyasi",
        "HTML sahifalarini ulash"
      ],
      correctAnswer: 1,
      explanation: "O'tish formulasi DP ning yuragi hisoblanadi. U joriy qadam qiymatini qaysi formulaga asosan oldingi dp qiymatlaridan hisoblashni belgilaydi."
    },
    {
      id: 8,
      question: "LCS (Longest Common Subsequence) qaysi turdagi masalaga misol bo'ladi?",
      options: [
        "Ochko'z algoritmlarga",
        "Dinamik dasturlashga (DP)",
        "Saralash algoritmlariga",
        "Qidiruvga"
      ],
      correctAnswer: 1,
      explanation: "LCS ikki matn o'xshashligini aniqlashda DP yordamida yechiladigan mashhur muammolardan biridir."
    },
    {
      id: 9,
      question: "Fibonachchi hisoblashda tabulation xotira murakkabligini O(N) dan O(1) ga qanday tushirish mumkin?",
      options: [
        "Massiv o'lchamini kamaytirib",
        "Butun massiv jadvalini saqlamasdan, faqat oxirgi ikkita hisoblangan sonni ikkita o'zgaruvchida saqlab borish orqali",
        "JS Map ishlatib",
        "Bu xotirani optimallab bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Bizga faqat oldingi ikkita son kerakligi sababli, butun massivni saqlash shart emas. Ikki o'zgaruvchini almashtirib borish orqali Space O(1) ga tushadi."
    },
    {
      id: 10,
      question: "Dinamik dasturlashda Memoization keshini global o'zgaruvchi qilishning xavfi nimada?",
      options: [
        "Kodni o'qish qiyinlashadi",
        "Har xil test chaqiriqlarida kesh tozalanmagani uchun oldingi test ma'lumotlari yangi chaqiriq natijasiga xato ta'sir qiladi",
        "Sikllar sekinlashadi",
        "Tashqaridan o'qib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Kesh global bo'lsa, har xil kirish parametrlari uchun eski chaqiriq xotiralari aralashib ketadi va noto'g'ri natijalar beradi."
    },
    {
      id: 11,
      question: "Knapsack (Qop) masalasi nima?",
      options: [
        "Massivni ikkiga bo'lish usuli",
        "Cheklangan yuk ko'tara oladigan qopga maksimal foyda beradigan buyumlar to'plamini tanlab joylash muammosi",
        "Fayl siqish formati",
        "Xatolarni qidirish tizimi"
      ],
      correctAnswer: 1,
      explanation: "Knapsack - kombinatorik optimallash masalasi bo'lib, buyumlar vazni va qiymatiga qarab qopga optimal joylashni talab qiladi va DP orqali samarali yechiladi."
    },
    {
      id: 12,
      question: "Nima uchun ba'zi 2D DP masalalari (masalan, Grid Path) ko'p xotira talab qiladi?",
      options: [
        "Chunki ular matnli",
        "N x M o'lchamli jadvalni xotirada saqlash uchun O(N * M) o'lchamdagi 2D massiv talab qilingani uchun",
        "Chunki ular faqat telefonda ishlaydi",
        "Qurilmaga bog'liq"
      ],
      correctAnswer: 1,
      explanation: "Holatlar soni ko'paygani sari (masalan 2D grid) bizga katta hajmdagi matritsa jadvali kerak bo'ladi, bu esa xotirani band qiladi."
    }
  ]
};
