export const dsaGreedy = {
  id: "dsaGreedy",
  title: "Ochko'z Algoritmlar (Greedy Algorithms)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Ochko'z Algoritmlar (Greedy Algorithms) - bu har bir qadamda kelajakni o'ylamasdan, faqat o'sha joriy lahzada eng optimal, eng jozibador bo'lib ko'ringan qarorni qabul qilish orqali global optimal yechimga erishishni ko'zlaydigan yondashuvdir.

### Do'kon xaridori analogiyasi:
- **Ochko'z yondashuv (Greedy):** Tasavvur qiling, sizga 80 tsent pulni minimal miqdordagi tangalar bilan qaytarish kerak. Do'konda 50, 20, 10, 5 tsentlik tangalar bor.
- Siz doimo cho'ntakka solish mumkin bo'lgan eng katta tangani tanlaysiz:
  1. Avval eng katta tanga: 50 tsent (qoldi 30).
  2. Keyin qolgan 30 uchun eng katta: 20 tsent (qoldi 10).
  3. Keyin qolgan 10 uchun eng katta: 10 tsent (qoldi 0).
  - Jami: 3 ta tanga (50, 20, 10). Bu har bir qadamda eng yaxshi (ochko'z) variantni tanlash global miqyosda ham eng yaxshi natijani bergan holatdir.
- **Kamchiligi (Kelajakni o'ylamaslik):** Agar tangalar to'plamida faqat 9, 6 va 1 tsentlik tangalar bo'lsa va bizga 12 tsent yig'ish kerak bo'lsa:
  - Ochko'z yondashuv: Avval 9 (qoldi 3), keyin 1, 1, 1 -> Jami 4 ta tanga (9, 1, 1, 1).
  - Aslida eng optimal yechim: 2 ta tanga (6, 6).
  - Demak, ochko'z algoritmlar har doim ham eng to'g'ri yechimni bermaydi, lekin ular juda tez ishlaydi.

---

## 2. 💻 Real Kod Misollari

Javaskriptda ochko'z usul bilan Tangalarni almashtirish (Coin Change Greedy) masalasi:

\`\`\`javascript
function minCoinsGreedy(coins, amount) {
  // Tangalarni kattasidan kichigiga qarab saralash
  coins.sort((a, b) => b - a);
  const result = [];

  for (let i = 0; i < coins.length; i++) {
    while (amount >= coins[i]) {
      amount -= coins[i];
      result.push(coins[i]); // Ochko'zlik bilan eng kattasini olish
    }
  }

  // Agar to'liq yig'a olsak qaytaramiz, aks holda yig'ib bo'lmaydi
  return amount === 0 ? result.length : -1;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Ochko'zlik shartlari (Greedy Choice Property):
Ochko'z algoritm global optimal yechimni kafolatlashi uchun masala quyidagi ikki xususiyatga ega bo'lishi kerak:
1. **Greedy Choice Property (Ochko'z tanlov xossasi):** Mahalliy (local) darajada qabul qilingan eng yaxshi qaror global optimal yechimga olib borishi kerak.
2. **Optimal Substructure (Optimal qism-tuzilma):** Muammoning optimal yechimi uning qism-muammolari optimal yechimlarini o'z ichiga olishi lozim.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Masalaning ochko'zlik bilan yechilishini isbotlamasdan qo'llash
Ko'pincha junior dasturchilar bir nechta oddiy testlarda to'g'ri ishlagani uchun algoritmni greedy usulida yozishadi. Lekin real tizimda u global xato berishi mumkin (xuddi tepada ko'rsatilgan 9, 6, 1 tangalar kabi).
* **Tuzatish:** Agar masala ochko'zlik xossasini to'liq qanoatlantirmasa (isbotlanmasa), Dinamik Dasturlash (DP) yoki Backtracking usullarini qo'llang.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Ochko'z Algoritm (Greedy Algorithm) nima?**
   * *Javob:* Har bir qadamda kelajak natijalarini hisobga olmasdan, faqat joriy eng optimal qarorni qabul qiluvchi algoritmik yondashuv.
2. **Greedy va Dinamik Dasturlash (DP) farqi nimada?**
   * *Javob:* DP barcha qism-muammolarni tekshirib, xotiraga yig'ib boradi va global eng to'g'risini tanlaydi. Greedy esa bitta shart bo'yicha orqaga qaytmasdan to'g'ridan-to'g'ri bitta yo'ldan ketadi (tezroq ishlaydi).
3. **Greedy Choice Property nima?**
   * *Javob:* Mahalliy darajadagi eng yaxshi tanlov global optimal yechimga eltuvchi to'g'ri yo'l ekanligini anglatuvchi xossa.
4. **Nima uchun greedy algoritmlar har doim global optimal yechim bermaydi?**
   * *Javob:* Chunki ular kelajakdagi qadamlarda yuzaga keladigan cheklovlar yoki imkoniyatlarni oldindan ko'ra olmaydi.
5. **Greedy algoritmlar unumdorligi (Time Complexity) qanday?**
   * *Javob:* Odatda juda tez ishlaydi. Ko'pincha saralash uchun O(N log N) va uning ustidan bir marta aylanib chiqish uchun O(N) vaqt oladi.
6. **Fractional Knapsack (Bo'lakli qop) muammosi nima?**
   * *Javob:* Buyumlarni bo'laklab (masalan oltin kukunini grammlab) olish mumkin bo'lgan qop masalasi. Buni greedy yordamida (qiymat/vazn nisbati eng kattasini tanlab) 100% optimal yechish mumkin.
7. **Huffman Coding nima?**
   * *Javob:* Ma'lumotlarni siqish (data compression) algoritmi bo'lib, eng ko'p takrorlanadigan belgilarga qisqa kod berish orqali ishlaydi (greedy yordamida quriladi).
8. **Qaysi mashhur graf algoritmlarida greedy yondashuv ishlatiladi?**
   * *Javob:* Dijkstra (eng qisqa yo'l) va Prim hamda Kruskal (minimal yoyuvchi daraxt - MST) algoritmlarida.
9. **Kruskal algoritmi qanday ishlaydi?**
   * *Javob:* Shoxlarni vazni bo'yicha saralaydi va eng kichik shoxlarni sikl hosil qilmasdan DSU yordamida birlashtirib boradi (greedy yondashuv).
10. **Greedy algoritmining to'g'riligi qanday isbotlanadi?**
    * *Javob:* Matematik induksiya yoki almashtirish (exchange argument) usuli orqali.
11. **Activity Selection (Faoliyatlarni tanlash) masalasi nima?**
    * *Javob:* Bir vaqtda bajarilishi kerak bo'lgan bir nechta tadbirlardan, o'zaro kesishmaydigan maksimal sondagi tadbirlarni tanlash muammosi (tugash vaqti eng kichigini tanlab yechiladi).
12. **0/1 Knapsack (Butun qop) masalasini nega greedy bilan yechib bo'lmaydi?**
    * *Javob:* Chunki buyumlarni bo'lish taqiqlanadi (yo olish, yo olmaslik kerak). Bunday holda optimal yechimga faqat DP orqali erishiladi.

---

## 6. 🎨 Interaktiv Vizual

### Tangalarni Ochko'zlik Bilan Tanlash (80 tsent uchun)
Har qadamda eng katta tangani cho'ntakka solish jarayoni:

\`\`\`mermaid
graph TD
    start[80 tsent yig'ish kerak] -->|Tanlov: Eng kattasi 50| step1[Qoldi: 30 tsent]
    step1 -->|Tanlov: Eng kattasi 20| step2[Qoldi: 10 tsent]
    step2 -->|Tanlov: Eng kattasi 10| step3[Qoldi: 0 tsent - Tugadi]
    style start fill:#f5ee9e,stroke:#f39c12,stroke-width:2px
    style step3 fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mahalliy optimal yechimlardan global optimal yechimlar hosil qiling.

---

## 8. 📝 12 ta Mini Test

Ochko'z algoritmlar bo'yicha bilimingizni sinang.

---

## 9. 🚀 Performance va Optimization

- **Saralashni optimallang:** Ochko'z algoritmlarda eng qimmat operatsiya odatda dastlabki saralash (Sorting - \`O(N log N)\`) hisoblanadi. Agar ma'lumotlar diapazoni aniq bo'lsa, Counting Sort orqali saralashni \`O(N)\` ga keltirish mumkin.

---

## 10. 📌 Cheat Sheet

| Muammo turi | Greedy optimalmi? | DP kerakmi? | Vaqt murakkabligi (Greedy) |
| :--- | :--- | :--- | :--- |
| **Fractional Knapsack** | Ha (Optimal) | Yo'q | O(N log N) (saralash tufayli) |
| **0/1 Knapsack** | Yo'q (Optimal emas) | Ha | O(N * W) (DP jadvali) |
| **Activity Selection** | Ha (Optimal) | Yo'q | O(N log N) |
`,
  exercises: [
    {
      id: 1,
      title: "Faoliyatlarni Tanlash Masalasi (Activity Selection)",
      instruction: "Tadbirlarning boshlanish `start` va tugash `end` vaqtlari berilgan (masalan: `start = [1, 3, 0, 5, 8, 5]`, `end = [2, 4, 6, 7, 9, 9]`). Bir kishi bajarishi mumkin bo'lgan maksimal sondagi o'zaro kesishmaydigan tadbirlar umumiy sonini hisoblaydigan `maxActivities(start, end)` funksiyasini yozing. (Tugash vaqti bo'yicha tadbirlar oldindan saralangan deb hisoblang).",
      startingCode: "function maxActivities(start, end) {\n  let count = 0;\n  // Kodni yozing\n  return count;\n}",
      hint: "Ochko'z yondashuv bo'yicha har doim eng birinchi tugaydigan tadbirni tanlang. Keyingi tanlanadigan tadbirning boshlanish vaqti oxirgi tanlangan tadbirning tugash vaqtidan katta yoki teng bo'lishi kerak.",
      test: "const sandbox = new Function(code + '; return maxActivities;'); const fn = sandbox(); const start = [1, 3, 0, 5, 8, 5]; const end = [2, 4, 6, 7, 9, 9]; if (fn(start, end) === 4) return null; return 'Maksimal tadbirlar soni noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 2,
      title: "Fractional Knapsack (Bo'lakli Qop)",
      instruction: "Buyumlarning qiymati `values` va vazni `weights` massivlari hamda qop sig'imi `capacity` berilgan. Buyumlarni bo'laklab olish mumkin (masalan 0.5 qism). Qopga sig'adigan buyumlardan olinishi mumkin bo'lgan maksimal umumiy qiymatni hisoblaydigan `fractionalKnapsack(values, weights, capacity)` funksiyasini yozing.",
      startingCode: "function fractionalKnapsack(values, weights, capacity) {\n  // Kodni yozing\n}",
      hint: "Buyumlarni qiymat/vazn (unit value) nisbati bo'yicha kamayish tartibida saralang. Keyin ochko'zlik bilan eng qimmatli buyumlarni qop to'lguncha joylang (agar sig'masa oxirgi buyumni qolgan sig'imga yarasha bo'lib oling).",
      test: "const sandbox = new Function(code + '; return fractionalKnapsack;'); const fn = sandbox(); const val = [60, 100, 120]; const wt = [10, 20, 30]; if (Math.round(fn(val, wt, 50)) === 240) return null; return 'Bo\\'lakli qop yechimi noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Massivdan Maksimal Yig'indi (Maximize Array Sum)",
      instruction: "Massiv `arr` va butun son `k` berilgan. Siz massivdagi istalgan element belgisini (musbatni manfiyga yoki teskarisi) o'zgartirish amalini roppa-rosa `k` marta bajarishingiz mumkin. `k` ta amaldan so'ng massiv elementlarining yig'indisi maksimal bo'lishini ta'minlovchi `maximizeSum(arr, k)` funksiyasini yozing.",
      startingCode: "function maximizeSum(arr, k) {\n  // Kodni yozing\n}",
      hint: "Har safar massivni saralang va eng kichik element belgisini o'zgartiring. Agar eng kichigi manfiy bo'lsa uni musbat qilasiz, agar hammasi musbat bo'lsa va k qolsa, eng kichik musbat element belgisini o'zgartirib turasiz.",
      test: "const sandbox = new Function(code + '; return maximizeSum;'); const fn = sandbox(); if (fn([4, 2, 3], 1) === 9 && fn([3, -1, 0, 2], 3) === 6) return null; return 'Maksimal yig\\'indi noto\\'g\\'ri hisoblandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ochko'z Algoritmlar (Greedy Algorithms) qanday qaror qabul qiladi?",
      options: [
        "Barcha kelajakdagi oqibatlarni to'liq hisoblab global optimal yo'lni tanlaydi",
        "Har bir qadamda kelajakni o'ylamasdan, faqat joriy lahzada eng yaxshi bo'lib ko'ringan mahalliy optimal qarorni tanlaydi",
        "Orqaga qaytish (backtracking) yordamida xatolarni tuzatadi",
        "Hech qanday qaror qabul qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Greedy algoritmlar har bir bosqichda faqat o'sha paytdagi eng yaxshi variantni (mahalliy optimal) tanlaydi, global oqibatlarni hisobga olmaydi."
    },
    {
      id: 2,
      question: "Dinamik Dasturlash (DP) bilan Ochko'z (Greedy) algoritmlarning asosiy farqi nimada?",
      options: [
        "DP har doim sekinroq va xotirasiz ishlaydi",
        "DP barcha holatlarni tahlil qilib, optimal yo'lni tanlaydi. Greedy esa orqaga qaytmasdan, faqat joriy eng yaxshi shart bo'yicha bitta yo'ldan ketadi",
        "Ular mutlaqo bir xil",
        "Greedy rekursiya yordamida ishlaydi, DP esa faqat sikllarda"
      ],
      correctAnswer: 1,
      explanation: "Greedy qaror qabul qilgandan keyin orqaga qaytmaydi (no backtracking) va juda tez ishlaydi. DP esa barcha qismlarni hisoblab global optimalni kafolatlaydi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri Greedy Choice Property (Ochko'z tanlov xossasi) ni ifodalaydi?",
      options: [
        "Jadvalni to'liq to'ldirish sharti",
        "Mahalliy darajada eng yaxshi bo'lgan tanlov global optimal yechimga olib kelishiga kafolat borligi",
        "Dasturni majburiy to'xtatish",
        "Xotirani tejash xususiyati"
      ],
      correctAnswer: 1,
      explanation: "Agar mahalliy optimal tanlov global yechimga ta'sir qilmasdan to'g'ri yo'lga boshlasa, demak masala greedy choice xossasiga ega."
    },
    {
      id: 4,
      question: "Tadbir tugash vaqti eng kichigini tanlab ketish (Activity Selection) qaysi yondashuvga mos keladi?",
      options: [
        "Dinamik Dasturlash",
        "Ochko'z Algoritmlar (Greedy)",
        "Divide and Conquer",
        "Backtracking"
      ],
      correctAnswer: 1,
      explanation: "Tugash vaqti eng kichik bo'lgan faoliyatni birinchi tanlab ketish optimal ochko'z yondashuv hisoblanadi (Activity Selection Problem)."
    },
    {
      id: 5,
      question: "Fractional Knapsack (Bo'lakli qop) masalasini Greedy bilan optimal yechish mumkinmi?",
      options: [
        "Yo'q, faqat DP bilan yechiladi",
        "Ha, buyumlarni qiymat/vazn nisbati bo'yicha saralab, ochko'zlik bilan eng qimmatini joylab borish orqali",
        "Faqat massivlarni bo'lish orqali",
        "Masala noto'g'ri qo'yilgan"
      ],
      correctAnswer: 1,
      explanation: "Buyumlarni bo'lish imkoniyati (masalan oltin kukuni, bug'doy) bo'lgani uchun greedy tanlov global optimalni kafolatlaydi."
    },
    {
      id: 6,
      question: "0/1 Knapsack (Butun qop) masalasini Greedy bilan yechish nega har doim to'g'ri natija bermaydi?",
      options: [
        "Chunki buyumlar qiymati yo'q",
        "Chunki buyumlarni bo'laklab bo'lmaydi (yo butunlay olish, yo olmaslik kerak) va ochko'zlik qopda bo'sh joy qoldirib samarasiz yechim berishi mumkin",
        "Chunki qop sig'imi juda kichik",
        "Ochko'z algoritm massivlarni tanimaydi"
      ],
      correctAnswer: 1,
      explanation: "0/1 Knapsackda buyumni bo'lish imkoni yo'qligi sababli, ochko'z tanlov (masalan eng og'ir yoki eng qimmatini olish) ba'zan qopda joy qoldirib, yomonroq yechimga olib keladi."
    },
    {
      id: 7,
      question: "Kruskal algoritmi grafda minimal yoyuvchi daraxt (MST) qurishda qaysi prinspda ishlaydi?",
      options: [
        "Barcha tugunlarni DFS aylanib chiqish",
        "Shoxlarni vazni bo'yicha o'sish tartibida saralab, eng kichiklarini sikl hosil qilmasdan DSU orqali bog'lab boruvchi Greedy yondashuv",
        "Jadvallar yordamida",
        "Hech qanday prinsipsiz"
      ],
      correctAnswer: 1,
      explanation: "Kruskal har safar eng arzon shoxni tanlab, sikl yaratmasligini tekshiradi (Greedy)."
    },
    {
      id: 8,
      question: "Dijkstra eng qisqa yo'l topish algoritmida greedy yondashuv qayerda namoyon bo'ladi?",
      options: [
        "Yo'llarni butunlay o'chirishda",
        "Har qadamda hali yakuniy tekshirilmagan tugunlar ichidan eng yaqin masofadagini tanlab olishda",
        "Tasodifiy tugunlarni bog'lashda",
        "Rekursiyada"
      ],
      correctAnswer: 1,
      explanation: "Dijkstra doimo navbatdagi eng yaqin tugunni (Mahalliy optimal) tanlaydi va o'sha orqali yo'llarni yangilaydi."
    },
    {
      id: 9,
      question: "Huffman Coding ma'lumotlarni siqish algoritmi qaysi yondashuvga asoslangan?",
      options: [
        "Dinamik dasturlash",
        "Ochko'z algoritmlar (Greedy)",
        "Backtracking",
        "Linear Search"
      ],
      correctAnswer: 1,
      explanation: "Huffman kodi eng ko'p uchraydigan belgilarga eng qisqa kod berish uchun greedy yondashuv bilan optimal daraxt quradi."
    },
    {
      id: 10,
      question: "Greedy algoritmlarning eng katta afzalligi nimada?",
      options: [
        "Ular har doim to'g'ri javob beradi",
        "Ular hisoblash jihatdan juda tez ishlaydi va odatda murakkab keshlar yoki katta jadvallarni talab qilmaydi",
        "Ular xotira talab qilmaydi",
        "Ular faqat SQL bazalar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Greedy algoritmlari har qadamda bitta to'g'ri qaror qabul qilgani va orqaga qaytmagani uchun vaqt va xotira jihatidan juda samaralidir."
    },
    {
      id: 11,
      question: "Exchange Argument (Almashtirish argumenti) nima uchun ishlatiladi?",
      options: [
        "O'zgaruvchilarni almashtirish uchun",
        "Ochko'z algoritmning global to'g'riligini matematik jihatdan isbotlash uchun",
        "Fayl tizimidan nusxa olishda",
        "Xatolar ro'yxatini tozalashda"
      ],
      correctAnswer: 1,
      explanation: "Exchange argument ochko'z algoritm bergan yechimni boshqa ixtiyoriy optimal yechim bilan almashtirish orqali greedy to'g'riligini isbotlash metodidir."
    },
    {
      id: 12,
      question: "Agar tangalar 5, 2 va 1 tsentlik bo'lsa, 6 tsent qaytarish uchun ochko'z algoritm necha tanga tanlaydi?",
      options: [
        "2 ta tanga",
        "3 ta tanga (5, 1)",
        "4 ta tanga",
        "Hech qanday"
      ],
      correctAnswer: 1,
      explanation: "6 tsent uchun eng katta tanga: 5 (qoldi 1 tsent). Keyin 1 tsent. Jami 2 ta tanga (5, 1). Bu tizim uchun greedy optimal yechim beradi."
    }
  ]
};
