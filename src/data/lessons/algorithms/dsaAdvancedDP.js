export const dsaAdvancedDP = {
  id: "dsaAdvancedDP",
  title: "Murakkab Dinamik Dasturlash (Bitmask DP, Digit DP, DP on Trees)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Murakkab Dinamik Dasturlash (Advanced Dynamic Programming) - oddiy DP usullari (LCS, Knapsack) yetarli bo'lmagan, holatlar (states) sonini ifodalash uchun bitlar, daraxtlar yoki raqamlar strukturasidan foydalanishni talab qiluvchi masalalarni yechish uchun qo'llaniladi.

### Tushunarli o'xshatishlar:
- **Bitmask DP (Bitlar orqali holatni saqlash):** Tasavvur qiling, sizda 5 ta vazifa bor. Ularning qaysi biri bajarilgan, qaysi biri bajarilmaganligini bitta butun sonning bitlarida (0 va 1) saqlaysiz. Masalan, \`01101\` soni 1, 3 va 4-vazifalar bajarilganini, 2 va 5-vazifalar esa hali bajarilmaganini ko'rsatadi. Bit amallari yordamida holatlarni ifodalash juda tez ishlaydi.
- **Digit DP (Raqamlar bo'yicha DP):** 1 dan $10^{18}$ gacha bo'lgan sonlar orasida raqamlar yig'indisi ma'lum shartga javob beradigan sonlar nechtaligini topmoqchisiz. Har bir sonni alohida tekshirish imkonsiz. Digit DP sonlarni chapdan o'ngga qarab xonama-xona (raqamlar bo'yicha) shakllantirib, holatni keshlab boradi.
- **DP on Trees (Daraxtlardagi DP):** Daraxt ko'rinishidagi tashkilotda xodimlardan iborat shunday jamoa yig'moqchisizki, unda bevosita boshliq va xodim birga qatnasha olmaydi, lekin jamoaning umumiy foydasi maksimal bo'lishi kerak. Bu yerda har bir tugun (xodim) uchun DP holati uning pastki shoxlariga (subtrees) tayanib rekursiv hisoblanadi.

---

## 2. 💻 Real Kod Misollari

Bitmask DP yordamida Sayohat qiluvchi Savdogar masalasini (Traveling Salesperson Problem - TSP) yechish:

\`\`\`javascript
function tsp(dist) {
  const n = dist.length;
  const memo = Array.from({ length: 1 << n }, () => Array(n).fill(-1));

  // mask: ziyorat qilingan shaharlar (bitlar orqali)
  // pos: joriy shahar indeksi
  function solve(mask, pos) {
    // Agar barcha shaharlar ziyorat qilingan bo'lsa, startga (0-shahar) qaytish masofasi
    if (mask === (1 << n) - 1) {
      return dist[pos][0];
    }

    if (memo[mask][pos] !== -1) return memo[mask][pos];

    let ans = Infinity;

    // Keyingi shaharlarni ziyorat qilib ko'rish
    for (let next = 0; next < n; next++) {
      // Agar next-shahar hali ziyorat qilinmagan bo'lsa (maskda bit 0 bo'lsa)
      if ((mask & (1 << next)) === 0) {
        const newCost = dist[pos][next] + solve(mask | (1 << next), next);
        ans = Math.min(ans, newCost);
      }
    }

    return memo[mask][pos] = ans;
  }

  // 1-shahar ziyorat qilingan (mask = 1, ya'ni 0001), pozitsiya = 0
  return solve(1, 0);
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Bitmask DP amallari:
1. **Holat (State) ifodasi:** Ko'pincha $O(2^N \\times N)$ yoki $O(2^N)$ holatlarni saqlaydi.
2. **Bitwise AND (\`&\`):** Biror shahar/vazifa ziyorat qilinganligini tekshirish: \`(mask & (1 << i))\` noldan farqli bo'lsa, ziyorat qilingan bo'ladi.
3. **Bitwise OR (\`|\`):** Yangi holatni ziyorat qilingan deb belgilash: \`newMask = mask | (1 << i)\`.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. N o'lchami kattaligida Bitmask DP ishlatib Memory Limit Exceeded (MLE) olish
Bitmask DP holatlar soni $2^N$ bo'lganligi sababli, $N > 20$ bo'lganida massiv o'lchami haddan tashqari oshib ketadi ($2^{20} = 1,048,576$).
* **Tuzatish:** Bitmask DP faqat $N \\le 20$ bo'lgan kichik chegaralar uchun ishlatilishini nazorat qiling.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Bitmask DP nima?**
   * *Javob:* Subsets (to'plam osti) yoki holatlarni butun sonning bitlarida ifodalab, DP jadvalida keshlab boruvchi optimallashtirish usuli.
2. **Sayohat qiluvchi savdogar masalasi (TSP) bitmask DP yordamida qanday vaqtda yechiladi?**
   * *Javob:* O(2^N * N^2) yoki O(2^N * N) vaqtda yechiladi (oddiy brute-force O(N!) ga qaraganda ancha tez).
3. **Bitmask DPda i-bitni 1 (ziyorat qilingan) qilish qanday amalga oshiriladi?**
   * *Javob:* mask | (1 << i) operatori yordamida.
4. **Bitmask DPda i-bitning 0 yoki 1 ekanligini qanday tekshiramiz?**
   * *Javob:* (mask & (1 << i)) amali yordamida. Agar natija noldan farqli bo'lsa, bit 1 ga teng.
5. **Digit DP qanday muammolarni yechadi?**
   * *Javob:* Ma'lum bir oraliqdagi [L, R] sonlarning raqamlariga bog'liq bo'lgan shartlarni (masalan raqamlar yig'indisi X bo'lgan sonlar soni) xonalar bo'yicha hisoblovchi masalalarni.
6. **Digit DPda 'tight' yoki 'limit' o'zgaruvchisi nima uchun kerak?**
   * *Javob:* Shakllantirilayotgan son berilgan chegaradan (L yoki R dan) oshib ketmasligi uchun joriy xonadagi raqam chegarasini belgilab turish uchun.
7. **DP on Trees (Daraxtlarda DP) nima?**
   * *Javob:* Daraxt tuzilmasidagi tugunlarning o'zaro bog'liqliklaridan kelib chiqib, yechimni barglardan ildizgacha (post-order DFS orqali) DP holatlarida hisoblash.
8. **Daraxtlarda DP hisoblashda odatda qanday algoritm yordamida aylanib chiqiladi?**
   * *Javob:* DFS (Depth-First Search) algoritmi yordamida, chunki pastki shoxlar (subtrees) natijalari birinchi hisoblanishi kerak.
9. **Bitmask DPda N ning eng yuqori chegarasi odatda qancha bo'ladi?**
   * *Javob:* Odatda N <= 20. Chunki 2^20 dan keyin xotira va vaqt keskin o'sib ketadi.
10. **Knapsack DP bilan Bitmask DP farqi nima?**
    * *Javob:* Knapsack DPda holat og'irlik bilan aniqlanadi. Bitmask DPda esa aynan qaysi elementlar tanlanganligi bitlar yordamida aniq saqlanadi.
11. **DP on Trees-ga bitta klassik masala misol keltiring.**
    * *Javob:* Tree Maximum Independent Set (Daraxtda bevosita bog'lanmagan tugunlarning maksimal yig'indisini topish).
12. **Bitmask DPda (1 << N) nimani anglatadi?**
    * *Javob:* 2 ning N-darajasini anglatadi, ya'ni jami mumkin bo'lgan holatlar (kombinatsiyalar) soni.

---

## 6. 🎨 Interaktiv Vizual

### Bitmask holat o'zgarishi:
0001 (Faqat 0-tugun ziyorat qilingan) -> 2-tugunni qo'shish:

\`\`\`mermaid
graph TD
    startState["mask: 0001 (1)"]
    op["mask | (1 << 2)"]
    endState["mask: 0101 (5)"]
    startState --> op
    op --> endState
    style startState fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style endState fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Murakkab DP masalalarini kodlang.

---

## 8. 📝 12 ta Mini Test

Murakkab DP bo'yicha testlardan o'ting.

---

## 9. 🚀 Performance va Optimization

- **Bitmask limitations:** Bitlar soni 31 tadan oshsa, JS-da oddiy bit amallari (BigInt talab etiladi) bilan ishlash qiyinlashadi. Shunga e'tibor bering.

---

## 10. 📌 Cheat Sheet

| DP Turi | Holat ifodasi | Asosiy Qo'llanilishi | Vaqt Murakkabligi (odatda) |
| :--- | :--- | :--- | :--- |
| **Bitmask DP** | mask (butun son bitlari) | TSP, Assignment masalalari | O(2^N * N^2) |
| **Digit DP** | (index, tight, sum) | Oraliqdagi sonlar xususiyatlari | O(uzunlik * 10 * shart) |
| **DP on Trees** | dp[node][state] | Daraxtdagi bog'liqliklar | O(V) |
`,
  exercises: [
    {
      id: 1,
      title: "Bitmask DP: Hammasi 1 bo'lgan Maskni Tekshirish",
      instruction: "Tugunlar soni `n` berilgan. Barcha bitlar `1` bo'lgan holatni butun son ko'rinishida ifodalovchi `getFullMask(n)` funksiyasini yozing (ya'ni `2^n - 1`).",
      startingCode: "function getFullMask(n) {\n  // Kodni yozing\n}",
      hint: "Bit siljitish operatoridan foydalaning: `(1 << n) - 1` formulasini qaytaring.",
      test: "const sandbox = new Function(code + '; return getFullMask;'); const fn = sandbox(); if (fn(4) === 15 && fn(5) === 31) return null; return 'Full mask noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 2,
      title: "Digit DP: Tight Chegarani Aniqlash",
      instruction: "Digit DP da keyingi xonaga o'tishda yangi `tight` (chegara) holatini aniqlash kerak. Joriy `tight` (boolean), joriy tanlangan raqam `d` va chegara raqami `limitDigit` berilgan. Keyingi xona uchun `newTight` qiymatini hisoblovchi `getNewTight(tight, d, limitDigit)` funksiyasini yozing.",
      startingCode: "function getNewTight(tight, d, limitDigit) {\n  // Kodni yozing\n}",
      hint: "Agar joriy tight to'g'ri (true) bo'lsa va tanlangan raqam d chegara limitDigit ga teng bo'lsa, tight saqlanadi (true), aks holda u false bo'ladi.",
      test: "const sandbox = new Function(code + '; return getNewTight;'); const fn = sandbox(); if (fn(true, 5, 5) === true && fn(true, 4, 5) === false && fn(false, 5, 5) === false) return null; return 'Tight holatini aniqlashda xatolik yuz berdi';"
    },
    {
      id: 3,
      title: "DP on Trees: Oddiy Daraxt Balandligi",
      instruction: "Daraxt qo'shnichilik ro'yxati `adj` berilgan. Post-order yondashuvda har bir tugunning pastki shoxlariga tayanib, daraxtning umumiy balandligini qaytaruvchi `getTreeHeight(adj, node, parent)` funksiyasini yozing.",
      startingCode: "function getTreeHeight(adj, node, parent) {\n  let maxHeight = 0;\n  // Kodni yozing\n  return maxHeight;\n}",
      hint: "Qo'shnilarni aylanib, agar neighbor !== parent bo'lsa rekursiv getTreeHeight chaqiring va maxHeight = Math.max(maxHeight, childHeight + 1) qiling.",
      test: "const sandbox = new Function(code + '; return getTreeHeight;'); const fn = sandbox(); const adj = { 1: [2, 3], 2: [1, 4], 3: [1], 4: [2] }; if (fn(adj, 1, -1) === 2) return null; return 'Daraxt balandligi noto\\'g\\'ri hisoblandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Bitmask DP da 'Bitmask' tushunchasi nimani anglatadi?",
      options: [
        "Xavfsizlik parolini",
        "Butun sonning bitlarida (0 va 1) elementlar kombinatsiyasi yoki holatni saqlashni",
        "JS massivlari hajmini cheklashni",
        "HTML input elementlari maskasini"
      ],
      correctAnswer: 1,
      explanation: "Bitmask - elementlar tanlangan yoki tanlanmaganligini 0 va 1 bitlari orqali bitta butun son ko'rinishida saqlash usulidir."
    },
    {
      id: 2,
      question: "Nima uchun Bitmask DP faqat kichik N (odatda N <= 20) chegaralarda ishlatiladi?",
      options: [
        "Chunki JS bit operatorlari sekin ishlaydi",
        "Chunki holatlar soni 2^N darajali bo'lib, N katta bo'lsa xotira va vaqt haddan tashqari oshib ketadi (MLE/TLE)",
        "Chunki katta sonlar o'nlik tizimga o'tmaydi",
        "Daraxtlar faqat 20 tagacha tugun saqlay oladi"
      ],
      correctAnswer: 1,
      explanation: "2^N formula bo'yicha N=20 bo'lganda 1 milliondan ortiq holat yuzaga keladi, N=30 da esa u 1 milliarddan oshib ketadi va xotiraga sig'maydi."
    },
    {
      id: 3,
      question: "Bitmask DP da i-tugunni 'tanlangan' deb belgilash uchun qaysi bit operatori ishlatiladi?",
      options: [
        "mask & (1 << i)",
        "mask | (1 << i)",
        "mask ^ (1 << i)",
        "mask >> i"
      ],
      correctAnswer: 1,
      explanation: "Bitwise OR (|) operatori yordamida maskning i-bitini 1 ga tenglashtiramiz, bu esa ushbu element tanlanganligini bildiradi."
    },
    {
      id: 4,
      question: "Bitmask DP da i-element hali 'tanlanmagan'ligini qanday tekshirish mumkin?",
      options: [
        "(mask & (1 << i)) === 0",
        "(mask | (1 << i)) === 1",
        "(mask ^ (1 << i)) === 0",
        "mask === 0"
      ],
      correctAnswer: 0,
      explanation: "Bitwise AND (&) operatori maskdagi i-bitni tekshiradi. Natija 0 bo'lsa, demak u bit hali 0 (tanlanmagan)."
    },
    {
      id: 5,
      question: "Digit DP asosan qanday masalalarni yechish uchun mo'ljallangan?",
      options: [
        "Massivda eng katta sonni qidirish",
        "Berilgan L va R oralig'ida raqamlari ma'lum bir qoidaga bo'ysunuvchi sonlar sonini hisoblash",
        "Daraxtlarni aylanib chiqish",
        "Bitlarni saralash"
      ],
      correctAnswer: 1,
      explanation: "Digit DP katta sonlar oralig'ida (masalan, 1 dan 10^18 gacha) raqamlarga bog'liq xususiyatlarni xonama-xona hisoblashga mo'ljallangan."
    },
    {
      id: 6,
      question: "Digit DP da 'tight' (yoki 'limit') boolean o'zgaruvchisining vazifasi nima?",
      options: [
        "DP jadvalini tozalash",
        "Joriy xonaga qo'yilishi mumkin bo'lgan raqamlar yuqori chegarasini cheklash (chegaradan oshib ketmaslik uchun)",
        "Faqat juft sonlarni tekshirish",
        "Rekursiyani to'xtatish"
      ],
      correctAnswer: 1,
      explanation: "Agar 'tight' o'zgaruvchisi true bo'lsa, keyingi xonaga faqat berilgan sonning o'sha xonadagi raqamigacha qo'yish mumkin, false bo'lsa 9 gacha ixtiyoriy raqam qo'yish mumkin."
    },
    {
      id: 7,
      question: "DP on Trees (Daraxtlardagi DP) algoritmlarida holatni hisoblash qaysi tartibda boradi?",
      options: [
        "Faqat ildizdan (root) boshlanadi va pastga qarab tarqaladi",
        "Barglardan (leaves) boshlanib, yuqoriga - ildizga qarab ko'tariladi (post-order)",
        "Random tarzda tugunlar tanlanadi",
        "Unda DP jadvali ishlatilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Daraxtdagi tugun qiymati uning bolalari (subtrees) yechimlariga bog'liq bo'lganligi uchun post-order DFS orqali barglardan boshlab hisoblanadi."
    },
    {
      id: 8,
      question: "Sayohat qiluvchi savdogar masalasi (TSP) Brute-force yordamida qanday tezlikda ishlaydi?",
      options: [
        "O(N)",
        "O(N!) (faktorial)",
        "O(N^2)",
        "O(2^N)"
      ],
      correctAnswer: 1,
      explanation: "Barcha shaharlarni to'liq kombinatsiyasini tekshirish Brute-force yordamida O(N!) vaqt oladi."
    },
    {
      id: 9,
      question: "TSP masalasi Bitmask DP yordamida qanday vaqt murakkabligigacha qisqaradi?",
      options: [
        "O(N)",
        "O(2^N * N^2)",
        "O(N log N)",
        "O(N^3)"
      ],
      correctAnswer: 1,
      explanation: "Bitmask DP yordamida holatlar soni 2^N * N ga tushadi, har bir holatda o'tishlar soni N ta bo'lgani uchun umumiy vaqt O(2^N * N^2) bo'ladi."
    },
    {
      id: 10,
      question: "Daraxtda 'Maximum Independent Set' (maksimal mustaqil to'plam) masalasi DP yordamida qanday vaqtda yechiladi?",
      options: [
        "O(2^V)",
        "O(V)",
        "O(V^2)",
        "O(V log V)"
      ],
      correctAnswer: 1,
      explanation: "Daraxtda har bir tugun uchun uni jamoaga qo'shish yoki qo'shmaslik holatini post-order DFSda O(1) da hisoblaganimiz uchun umumiy vaqt O(V) bo'ladi."
    },
    {
      id: 11,
      question: "Bitmask DP da `(1 << 5)` amali nimaga teng?",
      options: [
        "5",
        "32",
        "10",
        "64"
      ],
      correctAnswer: 1,
      explanation: "(1 << 5) amali 2 ning 5-darajasini bildiradi, bu esa 32 ga teng."
    },
    {
      id: 12,
      question: "Digit DP yordamida R gacha bo'lgan shartga mos sonlarni f(R) va L gacha bo'lgan sonlarni f(L-1) deb topsak, [L, R] oralig'idagi javob qanday aniqlanadi?",
      options: [
        "f(R) + f(L-1)",
        "f(R) - f(L-1)",
        "f(R) * f(L)",
        "f(R)"
      ],
      correctAnswer: 1,
      explanation: "[L, R] oraliqdagi natijani topish uchun R gacha bo'lgan jami natijadan L-1 gacha bo'lgan natija ayirib tashlanadi (f(R) - f(L-1))."
    }
  ]
};
