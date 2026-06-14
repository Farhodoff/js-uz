export const dsaBacktracking = {
  id: "dsaBacktracking",
  title: "Orqaga Qaytish Algoritmlari (Backtracking)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Orqaga Qaytish (Backtracking) - bu barcha mumkin bo'lgan yechim variantlarini (holatlarni) ketma-ket sinab ko'rish, agar tanlangan yo'l noto'g'ri (muvaffaqiyatsiz) bo'lib chiqsa, bir qadam orqaga qaytib (**backtrack**), boshqa yo'ldan urinib ko'rishga asoslangan algoritmik yondashuvdir.

### Labirint o'xshatishi:
- **Labirintdan chiqish:** Tasavvur qiling, siz qorong'u labirintda turibsiz va chiqish yo'lini qidiryapsiz.
- Siz birinchi chorrahaga kelasiz va **chap yo'lni** tanlaysiz. Biroz yurgach, yo'l berk bo'lib chiqadi (Tugallanish nuqtasi/Dead end).
- Siz u yerda taslim bo'lmaysiz, balki izingizga qaytib (bir qadam orqaga yurib), yana o'sha chorrahaga kelasiz va bu safar **o'ng yo'lni** tanlab ko'rasiz.
- Ushbu "oldinga yurish - xato bo'lsa orqaga qaytish - boshqa yo'lni sinash" jarayoni aynan Backtracking hisoblanadi.

---

## 2. 💻 Real Kod Misollari

Javaskriptda Backtracking yordamida berilgan sonlar to'plamining barcha mumkin bo'lgan permutatsiyalarini (o'rin almashtirishlarini) hosil qilish:

\`\`\`javascript
function permute(nums) {
  const result = [];

  function backtrack(tempList) {
    // Base Case: to'liq permutatsiya hosil bo'ldi
    if (tempList.length === nums.length) {
      result.push([...tempList]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (tempList.includes(nums[i])) continue; // Allaqachon tanlangan

      tempList.push(nums[i]); // Tanlov qilish (Make Choice)
      backtrack(tempList);    // Rekursiv keyingi qadam (Explore)
      tempList.pop();         // Tanlovni bekor qilish / Orqaga qaytish (Undo Choice)
    }
  }

  backtrack([]);
  return result;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### State Space Tree (Holatlar daraxti):
Backtracking algoritmi orqa fonda rekursiya yordamida barcha holatlar daraxtini (State Space Tree) aylanib chiqadi.
- **Pruning (Shoxlarni kesish):** Vaqtni tejash uchun, agar ma'lum bir shox (yo'nalish) keyinchalik xato natija berishi boshidanoq ma'lum bo'lsa (shart bajarilmasa), algoritm o'sha yo'nalishga chuqurlashmasdan uni darhol rad etadi (kesib tashlaydi). Bu keraksiz millionlab qadamlarning oldini oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tanlovni bekor qilishni (Undo Choice) unutish
Rekursiv chaqiruvdan so'ng massiv yoki holatga qo'shilgan o'zgarishni bekor qilmaslik (masalan \`pop()\` qilmaslik) keyingi shoxlardagi tekshiruvlarni butunlay buzib yuboradi.
* **Tuzatish:** Har safar rekursiv chuqurlashib chiqqanidan so'ng, qo'shilgan elementni o'chirib, holatni avvalgi ko'rinishiga qaytaring.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Backtracking (Orqaga qaytish) nima?**
   * *Javob:* Yechimni qadam-baqadam izlab, to'g'ri kelmaganda orqaga qaytib, boshqa variantlarni sinaydigan algoritmik yondashuv.
2. **Backtracking va Brute-Force (To'liq qidirish) farqi nimada?**
   * *Javob:* Brute-force barcha variantlarni oxirigacha ko'r-ko'rona tekshiradi. Backtracking esa shart to'g'ri kelmagan shoxlarni oldindan aniqlab kesib tashlaydi (Pruning).
3. **Pruning (Kesish) nima?**
   * *Javob:* Holatlar daraxtini aylanayotganda, yechimga olib bormaydigan shoxlarga kirmasdan ularni darhol chetlab o'tish texnikasi.
4. **Nima uchun Backtracking-da rekursiyadan keng foydalaniladi?**
   * *Javob:* Chunki tizim Call Stack'i biz bajargan tanlovlarni va orqaga qaytish nuqtalarini avtomatik eslab qolishga juda mos keladi.
5. **N-Queens (N-Qirolicha) masalasi nima?**
   * *Javob:* N x N shaxmat taxtasiga N ta qirolichani bir-biriga hujum qilmaydigan (bir qator, ustun yoki diagonalda turmaydigan) qilib joylashtirish masalasi (Backtracking yordamida yechiladi).
6. **Backtracking algoritmining vaqt murakkabligi nega odatda eksponentsial bo'ladi?**
   * *Javob:* Chunki u barcha kombinatsiyalarni (permutatsiya yoki kombinatsiyalar) tekshirgani uchun vaqt ko'pincha $O(2^N)$ yoki $O(N!)$ bo'ladi.
7. **Backtracking-da 'Make Choice', 'Explore' va 'Undo Choice' qadamlari nima?**
   * *Javob:* Make Choice - elementni joriy yechimga qo'shish. Explore - keyingi qadamni rekursiv izlash. Undo Choice - rekursiyadan qaytgandan so'ng elementni yechimdan o'chirib, holatni tiklash.
8. **Sudoku yechuvchi algoritmlar qaysi yondashuvda ishlaydi?**
   * *Javob:* Bo'sh katakchalarga 1 dan 9 gacha sonlarni qo'yib, agar shart buzilsa orqaga qaytuvchi Backtracking algoritmi yordamida.
9. **Backtracking va DFS (Chuqurlik bo'yicha qidiruv) farqi nimada?**
   * *Javob:* DFS graf yoki daraxtdagi tugunlarni to'liq aylanadi. Backtracking esa mavhum yechimlar fazosida (State Space) shartlar asosida aylanadi va ziyorat tugagach holatni orqaga qaytaradi.
10. **Subset Sum (Qism-to'plam yig'indisi) masalasi nima?**
    * *Javob:* Massiv ichidan elementlar yig'indisi berilgan targetga teng bo'lgan barcha qism-to'plamlarni topish muammosi.
11. **Backtracking algoritmlarida xotira murakkabligi (Space Complexity) qanday?**
    * *Javob:* O(N) bo'ladi, chunki rekursiya Call Stack chuqurligi yechim uzunligi N dan oshmaydi.
12. **Backtracking muammolarini qanday optimallashtirish mumkin?**
    * *Javob:* Pruning shartlarini kuchaytirish (keraksiz yo'llarni ertaroq aniqlash) va ma'lumotlarni saralash (eng cheklovchi elementlarni birinchi tekshirish) orqali.

---

## 6. 🎨 Interaktiv Vizual

### Backtracking Ziyorat Zanjiri
Chap shox berk bo'lib chiqqanida orqaga qaytib o'ng shoxga o'tish:

\`\`\`mermaid
graph TD
    start[Chorraha A] -->|Tanlov: Chap| left[Yo'l berk - Dead End]
    left -.->|Orqaga qaytish| start
    start -->|Tanlov: O'ng| right[Chiqish topildi - Success]
    style start fill:#f5ee9e,stroke:#f39c12,stroke-width:2px
    style left fill:#fadbd8,stroke:#e74c3c,stroke-width:2px
    style right fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Orqaga qaytish algoritmlari bilan barcha kombinatsiyalarni toping.

---

## 8. 📝 12 ta Mini Test

Testlar orqali bilimingizni tekshiring.

---

## 9. 🚀 Performance va Optimization

- **Erta kesish (Early Pruning):** Agar izlanayotgan yig'indi targetdan oshib ketgan bo'lsa (musbat sonlarda), rekursiyani davom ettirmasdan darhol \`return\` qiling.

---

## 10. 📌 Cheat Sheet

| Bosqich | Vazifasi | Misol kod qatori |
| :--- | :--- | :--- |
| **Make Choice** | Holatga element qo'shish | \`temp.push(nums[i])\` |
| **Explore** | Keyingi holatga chuqurlashish | \`backtrack(temp)\` |
| **Undo Choice** | Elementni o'chirib orqaga qaytish | \`temp.pop()\` |
`,
  exercises: [
    {
      id: 1,
      title: "Barcha Qism-To'plamlarni Topish (Subsets)",
      instruction: "Unikal sonlardan iborat massiv `nums` berilgan. Backtracking yordamida ushbu massiv elementlaridan hosil bo'lishi mumkin bo'lgan barcha qism-to'plamlarni (Power Set) 2D massiv ko'rinishida qaytaruvchi `subsets(nums)` funksiyasini yozing. Natijada bo'sh to'plam ham bo'lishi kerak.",
      startingCode: "function subsets(nums) {\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Sikl ichida har bir elementni temp massivga qo'shing, rekursiv keyingi indeksni chaqiring va qaytishda pop() qiling. Har safar rekursiya boshida `res.push([...temp])` qiling.",
      test: "const sandbox = new Function(code + '; return subsets;'); const fn = sandbox(); const res = fn([1, 2]); if (res && res.length === 4 && res.some(a => a.length === 0) && res.some(a => a.includes(1) && a.includes(2))) return null; return 'Subsets xato yechildi';"
    },
    {
      id: 2,
      title: "Target Yig'indi Kombinatsiyalari (Combination Sum)",
      instruction: "Unikal sonlar massivi `candidates` va `target` soni berilgan. Elementlar yig'indisi `target`ga teng bo'lgan barcha unikal kombinatsiyalarni qaytaruvchi `combinationSum(candidates, target)` funksiyasini yozing. Bittani sonni istalgancha qayta ishlatish mumkin.",
      startingCode: "function combinationSum(candidates, target) {\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Rekursiyaga joriy qolgan targetni (target - candidate) uzating. Agar target === 0 bo'lsa, natijani res'ga qo'shing. Agar target < 0 bo'lsa, orqaga qayting.",
      test: "const sandbox = new Function(code + '; return combinationSum;'); const fn = sandbox(); const res = fn([2, 3, 6, 7], 7); if (res && res.length === 2 && res.some(a => a.includes(7)) && res.some(a => a.includes(2) && a.includes(3))) return null; return 'Combination sum xato yechildi';"
    },
    {
      id: 3,
      title: "Telefon Raqami Harflari Kombinatsiyasi",
      instruction: "Telefon klavishlaridagi harflar xaritasi berilgan (masalan, '2' -> 'abc', '3' -> 'def'). `2` dan `9` gacha bo'lgan raqamlar satri `digits` berilgan. Ushbu raqamlardan hosil bo'lishi mumkin bo'lgan barcha harf kombinatsiyalarini massiv ko'rinishida qaytaruvchi `letterCombinations(digits)` funksiyasini yozing. Agar digits bo'sh bo'lsa `[]` qayting.",
      startingCode: "function letterCombinations(digits) {\n  if (!digits) return [];\n  const map = {\n    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'\n  };\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Darbosh raqam indeksini kuzating. Joriy raqamga mos harflar bo'yicha sikl aylanib, stringga harf qo'shib rekursiv chaqiring va qaytishda harfni o'chiring.",
      test: "const sandbox = new Function(code + '; return letterCombinations;'); const fn = sandbox(); const res = fn('23'); if (res && res.includes('ad') && res.includes('ae') && res.length === 9) return null; return 'Telefon harflari kombinatsiyasi xato yechildi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Orqaga Qaytish (Backtracking) algoritmining asosiy ishlash prinsipi nima?",
      options: [
        "Faqat massivlarni saralash",
        "Yechim variantlarini qadam-baqadam sinab ko'rish, xato yo'nalishga duch kelganda bir qadam orqaga qaytib boshqa yo'lni sinash",
        "Butun matnni o'chirish",
        "Birinchi kelgan yechimni to'g'ridan-to'g'ri olish"
      ],
      correctAnswer: 1,
      explanation: "Backtracking - bu xatolardan saboq olib, yechim bo'lmagan yo'llardan orqaga qaytib (backtrack), boshqa kombinatsiyalarni sinash yondashuvidir."
    },
    {
      id: 2,
      question: "Backtracking va Brute-Force (To'liq tekshirish) o'rtasidagi asosiy farq nima?",
      options: [
        "Backtracking har doim sekinroq",
        "Backtracking yechimga olib bormaydigan shoxlarni (Pruning yordamida) oldindan kesib tashlaydi, Brute-force esa barcha yo'llarni oxirigacha ko'r-ko'rona tekshiradi",
        "Ular mutlaqo farqsiz",
        "Brute-force rekursiya ishlatadi, Backtracking esa yo'q"
      ],
      correctAnswer: 1,
      explanation: "Pruning shoxlarni kesish orqali Backtracking unumdorligini Brute-force ga qaraganda millionlab qadamlarga tejaydi."
    },
    {
      id: 3,
      question: "Holatlar daraxtida 'Pruning' (Kesish) operatsiyasi nima?",
      options: [
        "Yangi tugun qo'shish",
        "Yechimga olib bormasligi oldindan ma'lum bo'lgan qism-shoxlarni aylanmasdan chetlab o'tish (kesib tashlash)",
        "Daraxt balandligini hisoblash",
        "Fayllarni diskdan o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Agar joriy qadamda shart bajarilmasa (masalan yig'indi targetdan oshsa), keyingi shoxchalarni aylanib o'tirish shart emas, shu yerda rekursiya kesiladi."
    },
    {
      id: 4,
      question: "Quyidagilardan qaysi masala klassik tarzda Backtracking bilan yechiladi?",
      options: [
        "Binary Search",
        "N-Queens (N-Qirolicha) masalasi",
        "Merge Sort",
        "Dijkstra shortest path"
      ],
      correctAnswer: 1,
      explanation: "N-Queens taxtaga qirolichalarni joylashda barcha shartlarni tekshirish uchun backtracking yondashuvidan foydalanadi."
    },
    {
      id: 5,
      question: "Backtracking algoritmlarida 'Undo Choice' (Tanlovni bekor qilish) qadami nega zarur?",
      options: [
        "Xavfsizlikni ta'minlash uchun",
        "Rekursiv chaqiriqdan qaytgandan so'ng, xotiradagi joriy holatni o'z holiga keltirish (eski qiymatni tiklash) orqali boshqa shoxlarga to'g'ri ta'sir qilish uchun",
        "Dasturni crash qilish uchun",
        "Faqat yangi o'zgaruvchi yaratish uchun"
      ],
      correctAnswer: 1,
      explanation: "Agar biz joriy tanlovni o'chirib orqaga qaytmasak (masalan pop() qilmasak), massivda eski shoxning keraksiz qoldiqlari qolib, boshqa shoxlar yechimini buzadi."
    },
    {
      id: 6,
      question: "Sudoku yechuvchi algoritmlar qaysi yondashuvga asoslangan?",
      options: [
        "Ochko'z algoritmlar",
        "Backtracking (Orqaga qaytish)",
        "Binary Search",
        "Linear Search"
      ],
      correctAnswer: 1,
      explanation: "Sudoku o'yinidagi bo'sh kataklarga sonlarni qo'yib, agar ziddiyat (kolliziya) chiqsa orqaga qaytib boshqa sonlarni sinash orqali yechiladi."
    },
    {
      id: 7,
      question: "Nima uchun backtracking algoritmlari eng yomon holatda eksponentsial (O(2^N) yoki O(N!)) vaqt oladi?",
      options: [
        "Chunki JS sekin til",
        "Chunki ular barcha kombinatsiya va permutatsiyalar to'plamini aylanib chiqishni talab qiladi",
        "Chunki u xotira ishlatmaydi",
        "Chunki u faqat massivlarni saralaydi"
      ],
      correctAnswer: 1,
      explanation: "Barcha mumkin bo'lgan yechim kombinatsiyalari soni matematik jihatdan eksponentsial yoki faktorial bo'lgani uchun vaqt ham shuncha ko'p ketadi."
    },
    {
      id: 8,
      question: "Backtracking-da 'State Space Tree' (Holatlar fazosi daraxti) nima?",
      options: [
        "Kompyuter xotirasidagi kataloglar shajarasi",
        "Dastur o'tishi mumkin bo'lgan barcha holatlar va ulardan keyingi tanlovlar shajarasi",
        "Faqat CSS renderlash daraxti",
        "HTML DOM daraxti"
      ],
      correctAnswer: 1,
      explanation: "State Space Tree - bu algoritmdagi barcha mumkin bo'lgan tanlovlar va ulardan shoxlanadigan holatlarning matematik tasviridir."
    },
    {
      id: 9,
      question: "N-Queens masalasida 4x4 taxtaga necha ta bir-biriga hujum qilmaydigan qirolicha joylash mumkin?",
      options: [
        "4 ta qirolicha",
        "2 ta qirolicha",
        "8 ta qirolicha",
        "Unga joylab bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "N-Queens qoidasiga ko'ra N x N taxtaga N ta qirolicha qo'yiladi. 4x4 taxtaga 4 ta qirolicha joylashtiriladi (buning 2 xil yechimi bor)."
    },
    {
      id: 10,
      question: "Backtracking algoritmining xotira murakkabligi (Space Complexity) nima uchun O(N) bo'ladi?",
      options: [
        "Chunki u yangi massiv ochmaydi",
        "Chunki rekursiya call stack chuqurligi yechim uzunligi N dan oshmaydi",
        "Chunki u faqat local o'zgaruvchi saqlaydi",
        "Xotira murakkabligi O(1) bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Tizim stekida bir vaqtda eng ko'pida rekursiya chuqurligi darajasida (daraxt balandligi N) faol chaqiriqlar saqlanadi."
    },
    {
      id: 11,
      question: "Permutatsiya (Permutation) nima?",
      options: [
        "Elementlarni faqat o'chirish",
        "Elementlarning barcha mumkin bo'lgan joylashuv tartiblari (tartib muhim bo'lgan holatlar)",
        "Faqat musbat sonlar to'plami",
        "Matnlarni siqish usuli"
      ],
      correctAnswer: 1,
      explanation: "Permutatsiya - elementlarning tartibini o'zgartirib hosil qilingan unikal ketma-ketliklar (masalan, [1,2] va [2,1])."
    },
    {
      id: 12,
      question: "Subset Sum (Qism-to'plam yig'indisi) masalasida qidiruvni tezlashtirish uchun qaysi optimallash qo'llaniladi?",
      options: [
        "Kodni qisqartirish",
        "Massivni oldindan saralab olish va yig'indi targetdan oshib ketishi bilan o'sha shoxdagi rekursiyani darhol to'xtatish (Early Pruning)",
        "Faqat juft sonlarni olish",
        "Barcha elementlarni nolga tenglashtirish"
      ],
      correctAnswer: 1,
      explanation: "Massiv saralangan bo'lsa va joriy son qo'shilganda targetdan oshsa, undan keyingi kattaroq sonlarni ham qo'shib ko'rish shart emas (darhol kesiladi)."
    }
  ]
};
