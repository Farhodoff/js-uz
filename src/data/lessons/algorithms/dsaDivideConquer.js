export const dsaDivideConquer = {
  id: "dsaDivideConquer",
  title: "Bo'lib Tashla va Hukmronlik Qil (Divide and Conquer)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Bo'lib Tashla va Hukmronlik Qil (Divide and Conquer / Bo'l va Hukmronlik qil) - bu murakkab muammoni bir-biriga bog'liq bo'lmagan bir nechta kichik qism-muammolarga bo'lish (Divide), ularning har birini mustaqil ravishda yechish (Conquer) va oxirida olingan natijalarni birlashtirib (Combine) global yechimga erishish algoritmik strategiyasidir.

### Qulupnay terish analogiyasi:
- **Muammo:** Sizga 100 kg qulupnay terish vazifasi topshirildi (Juda katta va og'ir ish).
- **Divide (Bo'lish):** Siz ishni 10 ta do'stingizga bo'lib berdingiz: har bir kishiga 10 kg dan (qismlarga ajratish). Do'stlar bir-biriga bog'liq bo'lmagan holda mustaqil ishlaydi.
- **Conquer (Hukmronlik/Yechish):** Har bir do'stingiz o'ziga berilgan 10 kg qulupnayni mustaqil terib chiqadi.
- **Combine (Birlashtirish):** Har bir do'stingiz yig'gan 10 kg lik chelaklarni olib, bitta katta idishga ag'darasiz va natijada 100 kg qulupnay hosil bo'ladi.

---

## 2. 💻 Real Kod Misollari

Divide and Conquer yondashuviga asoslangan Merge Sort (Birlashtirib saralash) algoritmi:

\`\`\`javascript
function mergeSort(arr) {
  // Base case: massiv uzunligi 1 yoki 0 bo'lsa, u allaqachon saralangan
  if (arr.length <= 1) return arr;

  // 1. Divide: Massivni o'rtasidan ikkiga bo'lish
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 2. Conquer: Ikkala qismni ham rekursiv saralash
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // 3. Combine: Saralangan qismlarni birlashtirish
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let l = 0, r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  return result.concat(left.slice(l)).concat(right.slice(r));
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Uchta Asosiy Qadam (Three Steps):
1. **Divide (Bo'lish):** Asosiy muammo rekursiya yordamida o'ziga o'xshash bo'lgan va o'zaro bog'lanmagan (disjoint) kichik muammolarga bo'linadi.
2. **Conquer (Hukmronlik qilish):** Kichik qism-muammolar rekursiv yechiladi. Agar ular juda kichik bo'lsa (base case), to'g'ridan-to'g'ri yechim qaytariladi.
3. **Combine (Birlashtirish):** Kichik yechimlar yig'ilib, asosiy katta muammoning yechimi hosil qilinadi.

### Vaqt murakkabligi:
Master teorema (Master Theorem) yordamida baholanganda, ko'plab Divide & Conquer algoritmlari (masalan Merge Sort) **$O(N \\log N)$** vaqt oladi. Bu esa oddiy $O(N^2)$ kvadratik algoritmlardan ancha tezroqdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Bo'lingan qismlarni birlashtirish (Combine) xarajatini hisobga olmaslik
Ko'pincha bo'lish oson bo'ladi, lekin yechimlarni birlashtirishda chiziqli $O(N)$ o'rniga nested looplar yozish umumiy vaqtni yana $O(N^2)$ ga chiqarib yuboradi.
* **Tuzatish:** Birlashtirish (Combine) algoritmining vaqt murakkabligi minimal bo'lishiga e'tibor qarating (masalan ikki saralangan massivni ikki ko'rsatkich yordamida $O(N)$ da birlashtirish).

---

## 5. 💬 12 ta Intervyu Savollari

1. **Divide and Conquer (Bo'lib tashla va hukmronlik qil) nima?**
   * *Javob:* Muammoni mustaqil kichik bo'laklarga bo'lib, ularni alohida yechib, oxirida natijalarni birlashtiruvchi algoritmik dizayn shabloni.
2. **Divide and Conquer-ning 3 ta asosiy bosqichini sanang.**
   * *Javob:* Divide (Bo'lish), Conquer (Hukmronlik/Yechish) va Combine (Birlashtirish).
3. **Merge Sort algoritmi qanday vaqt murakkabligiga ega?**
   * *Javob:* Har doim (eng yaxshi, o'rtacha va eng yomon holatda ham) O(N log N) vaqt oladi.
4. **Divide and Conquer va Dinamik Dasturlash (DP) farqi nimada?**
   * *Javob:* Divide & Conquer-da qism-muammolar o'zaro mustaqil (kesishmaydigan, non-overlapping) bo'ladi. DP-da esa qism-muammolar qayta takrorlanuvchi (kesishadigan, overlapping) bo'ladi.
5. **Quick Sort algoritmi qanday ishlaydi?**
   * *Javob:* Pivot (tayanch) element tanlanadi, massiv pivotdan kichiklar va kattalarga bo'linadi (Divide) va ular rekursiv saralanadi (Conquer). Birlashtirish talab etilmaydi (in-place).
6. **Binary Search (Ikkilik qidiruv) Divide and Conquer-ga misol bo'la oladimi?**
   * *Javob:* Ha. U muammoni har safar teng ikkiga bo'ladi (Divide) va faqat bitta mos qismini yechadi (Conquer). Birlashtirish (Combine) qadami bu yerda mavjud emas (O(1)).
7. **Master Teorema (Master Theorem) nima uchun ishlatiladi?**
   * *Javob:* Divide and Conquer yondashuvidagi rekursiv funksiyalarning vaqt murakkabligini matematik formula yordamida tezkor hisoblash uchun.
8. **Nima uchun Merge Sort qo'shimcha xotira talab qiladi?**
   * *Javob:* Ikkita saralangan massivni birlashtirish (merge) jarayonida vaqtinchalik yangi massiv yaratilgani sababli O(N) qo'shimcha xotira talab qiladi.
9. **Quick Sort eng yomon holatda qanday vaqt oladi?**
   * *Javob:* O(N^2) vaqt oladi. Bu pivot doimo eng chekka (eng kichik yoki eng katta) element bo'lib tanlanganda (massiv mutanosib bo'linmaganda) yuz beradi.
10. **Divide and Conquer parallel dasturlashga qanday mos keladi?**
    * *Javob:* Bo'lingan qism-muammolar o'zaro mutlaqo bog'liq bo'lmagani uchun, ularni turli protsessor yadrolarida (parallel ravishda) bir vaqtda yechish juda qulay.
11. **Daraxt traversallari (masalan balandlikni hisoblash) Divide & Conquer-ga kiradimi?**
    * *Javob:* Ha, chap shox balandligi va o'ng shox balandligi mustaqil hisoblanadi (Divide & Conquer) va ulardan Math.max + 1 olinadi (Combine).
12. **Divide and Conquer algoritmlarida base case vazifasi nima?**
    * *Javob:* Muammoni bo'lish to'xtaydigan eng sodda va kichik holat (masalan massivda bitta element qolganda).

---

## 6. 🎨 Interaktiv Vizual

### Merge Sort Algoritmidagi Divide & Combine
Massivning bo'linishi va qayta birlashishi:

\`\`\`mermaid
graph TD
    start["[4, 2, 1, 3]"]
    div1["[4, 2]"]
    div2["[1, 3]"]
    c1["[2, 4]"]
    c2["[1, 3]"]
    final["[1, 2, 3, 4]"]
    start -->|Divide| div1
    start -->|Divide| div2
    div1 -->|Sort & Combine| c1
    div2 -->|Sort & Combine| c2
    c1 -->|Combine / Merge| final
    c2 --> final
    style start fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style final fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mustaqil masalalarni rekursiv bo'lib yeching.

---

## 8. 📝 12 ta Mini Test

Bilimingizni sinash uchun testlar.

---

## 9. 🚀 Performance va Optimization

- **In-place Quick Sort:** Xotirani tejash uchun dynamic massivlar yaratmasdan, indekslar ko'rsatkichi yordamida massivni o'z joyida saralang (Space: \`O(log N)\`).

---

## 10. 📌 Cheat Sheet

| Algoritm | Divide qadami | Combine qadami | Vaqt murakkabligi | Xotira murakkabligi |
| :--- | :--- | :--- | :--- | :--- |
| **Merge Sort** | O(1) (indeks bo'lish) | O(N) (birlashtirish) | O(N log N) | O(N) |
| **Quick Sort** | O(N) (partition qilish) | O(1) (birlashmaydi) | O(N log N) (o'rtacha) | O(log N) |
| **Binary Search** | O(1) | O(1) | O(log N) | O(1) |
`,
  exercises: [
    {
      id: 1,
      title: "Massivning Eng Katta Elementini Topish",
      instruction: "Sonlar massivi berilgan. Sikllar (`for` yoki `while`) va tayyor `Math.max` ishlatmasdan, Divide and Conquer yondashuvi yordamida massivning eng katta elementini topuvchi `findMaxDC(arr)` funksiyasini yozing.",
      startingCode: "function findMaxDC(arr) {\n  // Kodni yozing\n}",
      hint: "Massivni o'rtasidan ikkiga bo'ling. Har bir qismning maksimalini rekursiv toping va kattasini qaytaring. Base case: agar bitta element qolsa, o'zini qaytaring.",
      test: "if (code.includes('for') || code.includes('while') || code.includes('max(')) return 'Sikllar yoki Math.max taqiqlanadi, faqat Divide and Conquer!'; const sandbox = new Function(code + '; return findMaxDC;'); const fn = sandbox(); if (fn([3, 1, 5, 2, 9, 4]) === 9) return null; return 'Eng katta element noto\\'g\\'ri topildi';"
    },
    {
      id: 2,
      title: "Massiv Elementlari Yig'indisi",
      instruction: "Sonlar massivi berilgan. Sikllar va `reduce` ishlatmasdan, Divide and Conquer (rekursiv massivni ikkiga bo'lish) yordamida massiv elementlari yig'indisini hisoblaydigan `sumArrayDC(arr)` funksiyasini yozing.",
      startingCode: "function sumArrayDC(arr) {\n  // Kodni yozing\n}",
      hint: "Base case: agar massiv bo'sh bo'lsa 0, bitta element bo'lsa o'zini qaytaring. Aks holda o'rtasidan bo'lib chap va o'ng qismlarni qo'shing.",
      test: "if (code.includes('for') || code.includes('while') || code.includes('reduce')) return 'Sikllar yoki reduce taqiqlanadi'; const sandbox = new Function(code + '; return sumArrayDC;'); const fn = sandbox(); if (fn([1, 2, 3, 4, 5]) === 15 && fn([]) === 0) return null; return 'Massiv yig\\'indisi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 3,
      title: "Saralangan Massivdagi Birinchi Uchrash (Binary Search variation)",
      instruction: "Saralangan sonlar massivi va `target` berilgan. Divide and Conquer (Binary Search) yordamida targetning massivdagi birinchi uchrash indeksini qaytaruvchi `findFirstOccurrence(arr, target)` funksiyasini yozing. Natija topilmasa `-1` bo'lsin.",
      startingCode: "function findFirstOccurrence(arr, target) {\n  // Kodni yozing\n}",
      hint: "Binary search kabi ishlang, lekin target topilganda darhol indeksni qaytarmang, chap tomonda ham o'sha son bor yoki yo'qligini tekshirib ko'ring (right = mid - 1).",
      test: "const sandbox = new Function(code + '; return findFirstOccurrence;'); const fn = sandbox(); if (fn([1, 2, 2, 2, 3, 4], 2) === 1 && fn([1, 2, 3], 5) === -1) return null; return 'Birinchi uchrash indeksi xato aniqlandi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Bo'lib Tashla va Hukmronlik Qil (Divide and Conquer) strategiyasining asosiy bosqichlari qaysilar?",
      options: [
        "Create, Read, Update, Delete",
        "Divide (Bo'lish), Conquer (Yechish) va Combine (Birlashtirish)",
        "Insert, Search, Delete, Resizing",
        "Stack frame, Heap frame, Memory allocation"
      ],
      correctAnswer: 1,
      explanation: "D&C asosan muammoni qismlarga bo'lish, har birini rekursiv yechish va natijalarni birlashtirish bosqichlaridan iborat."
    },
    {
      id: 2,
      question: "Divide & Conquer yondashuvidagi 'Conquer' (Hukmronlik) qadami nima qiladi?",
      options: [
        "Muammoni har xil fayllarga saqlaydi",
        "Kichik qism-muammolarni rekursiv tarzda yechadi (base case ga yetganda to'g'ridan-to'g'ri yechim beradi)",
        "Matnni formatlaydi",
        "Barcha natijalarni o'chirib yuboradi"
      ],
      correctAnswer: 1,
      explanation: "Conquer - ajratilgan kichikroq muammolarni rekursiv chaqiruvlar bilan mustaqil yechish bosqichidir."
    },
    {
      id: 3,
      question: "Divide & Conquer va Dinamik Dasturlash (DP) o'rtasidagi asosiy farq nimada?",
      options: [
        "D&C faqat sonlar bilan ishlaydi",
        "D&C da qism-muammolar o'zaro mustaqil bo'ladi (kesishmaydi), DP da esa qism-muammolar qayta takrorlanuvchi bo'ladi",
        "DP har doim rekursiyasiz ishlaydi",
        "Ular mutlaqo farqsiz"
      ],
      correctAnswer: 1,
      explanation: "D&C da qismlar bir-biriga bog'liq bo'lmaydi (masalan massivning chap yarmi o'ng yarmiga ta'sir qilmaydi). DP-da esa kichik yechimlar takrorlangani uchun keshlanadi."
    },
    {
      id: 4,
      question: "Merge Sort algoritmining o'rtacha va eng yomon holatdagi vaqt murakkabligi qanday?",
      options: [
        "O(N)",
        "O(N log N)",
        "O(N^2)",
        "O(2^N)"
      ],
      correctAnswer: 1,
      explanation: "Merge sort har doim massivni o'rtasidan bo'lib (log N qavat) va ularni O(N) da birlashtirgani uchun murakkabligi O(N log N) bo'ladi."
    },
    {
      id: 5,
      question: "Nima uchun Merge Sort algoritmi qo'shimcha O(N) xotira (Space) talab qiladi?",
      options: [
        "Chunki u rekursiv",
        "Chunki ikki saralangan qismni birlashtirish (merge) jarayonida vaqtinchalik yangi massiv yaratish talab etiladi",
        "Chunki u faqat string saqlaydi",
        "Xotirani optimallashtirish imkonsiz"
      ],
      correctAnswer: 1,
      explanation: "Merge operatsiyasi ikkala qismdan elementlarni solishtirib yozib borish uchun yangi xotira blockini talab qiladi."
    },
    {
      id: 6,
      question: "Quick Sort algoritmidagi 'Pivot' (Tayanch) element nima?",
      options: [
        "Eng oxirgi javob",
        "Massivni bo'lish uchun mezon (chegara) sifatida tanlanadigan joriy element",
        "Massivning uzunligi",
        "Xatolik belgisi"
      ],
      correctAnswer: 1,
      explanation: "Pivot - Quick Sortda massiv elementlarini o'zidan kichiklar va kattalarga guruhlash (Partition) uchun asos qilib olinadigan elementdir."
    },
    {
      id: 7,
      question: "Quick Sort eng yomon holatda (Worst Case) qanday vaqt murakkabligida ishlaydi?",
      options: [
        "O(N)",
        "O(N log N)",
        "O(N^2)",
        "O(1)"
      ],
      correctAnswer: 2,
      explanation: "Agar massiv allaqachon saralangan bo'lsa va biz eng chekka elementni pivot qilib tanlasak, bo'linish mutanosib bo'lmaydi (har safar faqat 1 element ajraladi) va vaqt O(N^2) bo'lib ketadi."
    },
    {
      id: 8,
      question: "Binary Search (Ikkilik qidiruv) algoritmining D&C dagi o'ziga xosligi nimada?",
      options: [
        "Unda bo'lish amali yo'q",
        "U muammoni ikkiga bo'ladi, lekin faqat bitta mos yarmini yechadi (Combine/birlashtirish qadami mavjud emas, ya'ni O(1))",
        "U faqat saralanmagan massivda ishlaydi",
        "U O(N) vaqt oladi"
      ],
      correctAnswer: 1,
      explanation: "Binary search har qadamda qidiruv hududining yarmini tashlab yuboradi. Birlashtirish qadami bo'lmagani uchun vaqt O(log N) bo'ladi."
    },
    {
      id: 9,
      question: "Master Teorema (Master Theorem) nima vazifani bajaradi?",
      options: [
        "Dastur xavfsizligini tekshiradi",
        "Divide and Conquer rekursiv tenglamalarining vaqt murakkabligini tezkor aniqlab beradi",
        "Matritsalarni ko'paytiradi",
        "Xotirani tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "$T(N) = aT(N/b) + f(N)$ ko'rinishidagi rekursiv algoritmlar tezligini Master teorema formulalari orqali hisoblash mumkin."
    },
    {
      id: 10,
      question: "D&C algoritmlari nima uchun parallel (ko'p yadroli) tizimlarda juda samarali?",
      options: [
        "Chunki ular xotiradan kam joy oladi",
        "Bo'lingan qism-muammolar bir-biriga bog'liq bo'lmagani (disjoint) uchun ularni alohida protsessor yadrolarida bir vaqtda parallel yechish mumkin",
        "Chunki ular faqat serverlarda ishlaydi",
        "Ularni faqat bitta yadroda bajarish shart"
      ],
      correctAnswer: 1,
      explanation: "Mustaqil qismlarni (masalan, massivning chap va o'ng yarmini) parallel ravishda turli yadrolarda bir vaqtda saralash ishlash tezligini oshiradi."
    },
    {
      id: 11,
      question: "Divide & Conquer yondashuvidagi 'Base Case' nima?",
      options: [
        "Katta muammoning o'zi",
        "Muammoni bo'lish to'xtaydigan va javob darhol ma'lum bo'ladigan eng kichik holat (masalan o'lchami 1 bo'lgan massiv)",
        "Xatoliklarni ushlovchi blok",
        "Dasturning yopilish tugmasi"
      ],
      correctAnswer: 1,
      explanation: "Base case rekursiya chuqurligi to'xtaydigan va hisoblashsiz yechim qaytadigan eng quyi chegaradir."
    },
    {
      id: 12,
      question: "Quick Sort saralash algoritmi xotira murakkabligi (Space Complexity) o'rtacha holatda qanday baholanadi?",
      options: [
        "O(N)",
        "O(log N)",
        "O(1)",
        "O(N^2)"
      ],
      correctAnswer: 1,
      explanation: "Quick sort in-place saralasa ham, rekursiv chaqiriqlar Call Stack xotirasida o'rtacha O(log N) balandlikdagi freymlarni saqlaydi."
    }
  ]
};
