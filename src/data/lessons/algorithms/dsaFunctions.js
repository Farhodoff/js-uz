export const dsaFunctions = {
  id: "dsaFunctions",
  title: "Funksiyalar va Rekursiya (Functions & Recursion Basics)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Dasturlashda funksiyalar kodning ma'lum bir bo'lagini alohida ajratib, istalgancha qayta ishlatish imkonini beradi. Rekursiya esa funksiyaning o'z-o'zini chaqirishi bo'lib, murakkab muammolarni kichikroq o'xshash muammolarga bo'lib yechishda qo'llaniladi.

### Matryoshka qo'g'irchog'i analogiyasi:
- **Oddiy funksiya:** Bu xuddi zavodda bir marta loyihalashtirilgan va har safar chaqirilganda bir xil ishni bajaradigan dastgohga o'xshaydi.
- **Rekursiya (Matryoshka):** Tasavvur qiling, siz eng katta matryoshka qo'g'irchog'ini ochasiz (tashqi chaqiriq), uning ichidan kichikrog'i chiqadi. Siz uni ham ochasiz va bu jarayon eng oxirgi, ichida boshqa qo'g'irchoq bo'lmagan eng kichik matryoshkaga yetguncha davom etadi. Shu eng kichigi - **Base Case (Tugash sharti)**. Agar siz u yerda to'xtashni bilmasangiz, cheksiz davom etib xonangiz to'lib ketadi (**Stack Overflow**). Eng kichigidan boshlab qaytadan qo'g'irchoqlarni yig'ib chiqasiz (Natijalarni qaytarish).

---

## 2. 💻 Real Kod Misollari

Oddiy va rekursiv yondashuvlarning taqqoslanishi:

\`\`\`javascript
// 1. Iterativ (sikl yordamida) faktorial hisoblash
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result; // Space complexity: O(1)
}

// 2. Rekursiv faktorial hisoblash
function factorialRecursive(n) {
  // Base Case: to'xtash sharti
  if (n <= 1) {
    return 1;
  }
  // Recursive Step: o'zini chaqirish
  return n * factorialRecursive(n - 1); // Space complexity: O(n) call stack tufayli
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Call Stack (Chaqiriqlar Steki):
Har safar funksiya chaqirilganda, operatsion tizim (yoki JS dvigateli) uning o'zgaruvchilari va qaytish manzilini xotiraning **Call Stack** deb nomlangan qismiga blok (Stack Frame) ko'rinishida qo'shadi (push).
- **Iterativ usulda:** Stackda faqatgina bitta stack frame turadi.
- **Rekursiv usulda:** Har safar funksiya o'zini chaqirganda stekka yangi frame qo'shilib boradi. Agar chaqiriqlar soni juda ko'p bo'lsa (masalan, $N > 10000$), stek to'lib ketadi va JS \`Maximum call stack size exceeded\` xatosini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Rekursiyada tugash shartini (Base Case) unutish yoki noto'g'ri yozish
Bu xatolik dasturning cheksiz ishlashiga va tez orada crash bo'lishiga olib keladi.
* **Xato:**
  \`\`\`javascript
  function countToZero(n) {
    console.log(n);
    // Base Case yo'q!
    countToZero(n - 1);
  }
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  function countToZero(n) {
    if (n < 0) return; // Base Case
    console.log(n);
    countToZero(n - 1);
  }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Rekursiya nima?**
   * *Javob:* Funksiyaning muammoni yechish uchun o'z-o'zini chaqirish jarayoni.
2. **Rekursiyadagi 'Base Case' nima vazifani bajaradi?**
   * *Javob:* Rekursiv chaqiriqlar qachon to'xtashini belgilaydi. Agar u bo'lmasa, funksiya cheksiz chaqirilib, Stack Overflow xatosi kelib chiqadi.
3. **Rekursiv funksiyaning xotira murakkabligi (Space Complexity) nega faqat O(1) bo'la olmaydi?**
   * *Javob:* Chunki har bir faol rekursiv chaqiriq Call Stack-da alohida Stack Frame yaratadi. Rekursiya chuqurligi $D$ bo'lsa, xotira ham $O(D)$ bo'ladi.
4. **Stack Overflow nima?**
   * *Javob:* Call Stack xotirasining maksimal chegarasi to'lib toshib ketishi natijasida yuzaga keladigan runtime xatolik.
5. **Rekursiya va Iteratsiya (Sikl) farqi nimada?**
   * *Javob:* Rekursiya chaqiriqlar steki orqali takrorlanishni amalga oshiradi, Iteratsiya esa ko'rsatkich va shartli sikllar yordamida ishlaydi. Rekursiya kodni tushunarliroq qiladi, lekin ko'proq xotira talab qiladi.
6. **Tail Call Optimization (TCO) nima?**
   * *Javob:* Rekursiv chaqiriq funksiyaning eng oxirgi amali bo'lsa, xotirada yangi stack frame yaratmasdan, mavjud frameni qayta ishlatish orqali xotirani tejash texnikasi (ES6 standartida bor, lekin hamma brauzerlar to'liq qo'llab-quvvatlamaydi).
7. **Fibonachchi sonlarini oddiy rekursiya orqali hisoblashning vaqt murakkabligi nega O(2^N)?**
   * *Javob:* Chunki har bir $F(N)$ chaqiruvi ikkita yangi chaqiruvga ($F(N-1)$ va $F(N-2)$) bo'linadi, bu esa operatsiyalar sonini eksponentsial ravishda oshiradi.
8. **Call Stack-dagi 'Stack Frame' ichida nimalar saqlanadi?**
   * *Javob:* Funksiya argumentlari, lokal o'zgaruvchilari va funksiya tugagandan so'ng kod qayerdan davom etishi kerakligi haqidagi qaytish manzili (return address).
9. **Rekursiyani iteratsiyaga o'tkazish har doim ilojlimi?**
   * *Javob:* Ha, istalgan rekursiv algoritmni qo'lda stek ma'lumotlar tuzilmasini simulyatsiya qilish orqali iterativ ko'rinishga o'tkazish mumkin.
10. **Mutual Recursion (O'zaro rekursiya) nima?**
    * *Javob:* Ikki yoki undan ko'p funksiyalarning bir-birini aylanma tarzda chaqirishi (A funksiya B-ni chaqiradi, B esa A-ni).
11. **Rekursiv algoritmni qanday optimallashtirish mumkin?**
    * *Javob:* Memoization (keshlash) yordamida avval hisoblangan qiymatlarni saqlab qolish yoki uni iterativ usulga o'tkazish orqali.
12. **Nima uchun ko'plab Graph traversal (DFS) algoritmlarida rekursiyadan foydalaniladi?**
    * *Javob:* Chunki rekursiya daraxt yoki graf shoxlari bo'ylab chuqurlikka kirishni va orqaga qaytishni (backtracking) Call Stack yordamida avtomatik boshqarib beradi.

---

## 6. 🎨 Interaktiv Vizual

### Rekursiya va Call Stack Ishlashi
\`factorial(3)\` chaqirilganda Call Stack holatining o'zgarishi:

\`\`\`mermaid
graph TD
    subgraph Stack1 [1-bosqich]
        f3["factorial(3) - kutmoqda"]
    end
    subgraph Stack2 [2-bosqich]
        f3_2["factorial(3) - kutmoqda"]
        f2["factorial(2) - kutmoqda"]
    end
    subgraph Stack3 [3-bosqich]
        f3_3["factorial(3) - 3 * 2 = 6"]
        f2_2["factorial(2) - 2 * 1 = 2"]
        f1["factorial(1) - 1 (Base Case)"]
    end
    Stack1 --> Stack2 --> Stack3
    style Stack1 fill:#f5eef8,stroke:#8e44ad,stroke-width:2px
    style Stack2 fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
    style Stack3 fill:#e8f8f5,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar yordamida rekursiyani o'rganing.

---

## 8. 📝 12 ta Mini Test

Bilimingizni sinash uchun testlar.

---

## 9. 🚀 Performance va Optimization

- **Call Stack Limits:** JS-da rekursiya chuqurligi odatda 10,000 gacha cheklangan. Katta hajmdagi ma'lumotlarda iteratsiyadan foydalaning.
- **Memoization:** Takroriy chaqiriqlarni kamaytirish uchun orqa fonda natijalarni keshlang.

---

## 10. 📌 Cheat Sheet

| Yondashuv | Vaqt murakkabligi (Faktorial) | Xotira murakkabligi (Faktorial) | Stack Overflow Xavfi |
| :--- | :--- | :--- | :--- |
| **Iterativ (Loops)** | O(N) | O(1) | Yo'q |
| **Rekursiv (Recursion)** | O(N) | O(N) (Stek xotira) | Yuqori |
`,
  exercises: [
    {
      id: 1,
      title: "Rekursiv Fibonachchi Ketma-ketligi",
      instruction: "N-chi Fibonachchi sonini hisoblaydigan rekursiv `fibonacci(n)` funksiyasini yozing. Shart: $n \\le 1$ bo'lsa $n$ qaytsin. Rekursiya tugash shartini to'g'ri belgilang.",
      startingCode: "function fibonacci(n) {\n  // Kodni yozing\n}",
      hint: "Base case: `if (n <= 1) return n;` Recursive step: `return fibonacci(n - 1) + fibonacci(n - 2);`",
      test: "const sandbox = new Function(code + '; return fibonacci;'); const fn = sandbox(); if (fn(0) === 0 && fn(1) === 1 && fn(6) === 8) return null; return 'Fibonachchi funksiyasi noto\\'g\\'ri natija qaytardi';"
    },
    {
      id: 2,
      title: "Massiv Elementlarini Rekursiv Yig'ish",
      instruction: "Sonlardan iborat massiv berilgan. Sikllar (`for` yoki `while`) ishlatmasdan, faqat rekursiya yordamida massiv elementlari yig'indisini hisoblaydigan `sumArrayRecursive(arr)` funksiyasini yozing.",
      startingCode: "function sumArrayRecursive(arr) {\n  // Kodni yozing\n}",
      hint: "Base case: Massiv bo'sh bo'lsa (`arr.length === 0`), yig'indi 0 bo'ladi. Recursive step: Birinchi elementni olib, qolgan qismini rekursiv chaqiring.",
      test: "if (code.includes('for') || code.includes('while') || code.includes('reduce')) return 'Sikllar yoki reduce ishlatish taqiqlanadi, faqat rekursiya!'; const sandbox = new Function(code + '; return sumArrayRecursive;'); const fn = sandbox(); if (fn([1, 2, 3, 4]) === 10 && fn([]) === 0) return null; return 'Yig\\'indi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 3,
      title: "Matnni Teskari Qilish (Recursive String Reverse)",
      instruction: "Berilgan satrni rekursiv usulda teskari qiladigan `reverseStringRecursive(str)` funksiyasini yozing. Tayyor `.reverse()` metodidan foydalanmang.",
      startingCode: "function reverseStringRecursive(str) {\n  // Kodni yozing\n}",
      hint: "Base case: Satr bo'sh bo'lsa yoki bitta harf bo'lsa o'zini qaytaring. Recursive step: Satrning oxirgi harfini olib, boshiga qo'ying va qolgan qismini rekursiv teskari qiling.",
      test: "if (code.includes('reverse')) return 'Tayyor reverse metodidan foydalanish taqiqlanadi'; const sandbox = new Function(code + '; return reverseStringRecursive;'); const fn = sandbox(); if (fn('hello') === 'olleh' && fn('a') === 'a') return null; return 'Matn to\\'g\\'ri teskari qilinmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Rekursiv funksiyaning o'zini qaytadan chaqirish jarayoni qanday ataladi?",
      options: [
        "Base Case",
        "Recursive Step (Rekursiv qadam)",
        "Stack Frame",
        "Garbage Collection"
      ],
      correctAnswer: 1,
      explanation: "Funksiyaning o'zini o'zgartirilgan argumentlar bilan qayta chaqirish bosqichi Recursive Step deb ataladi."
    },
    {
      id: 2,
      question: "Stek xotiradagi 'Stack Frame' nima uchun yaratiladi?",
      options: [
        "CSS ranglarini saqlash uchun",
        "Funksiya chaqirilganda uning argumentlari, lokal o'zgaruvchilari va qaytish manzilini saqlash uchun",
        "Global obyektlarni saqlash uchun",
        "Fayl tizimidan nusxa olish uchun"
      ],
      correctAnswer: 1,
      explanation: "Har bir funksiya chaqiruvi uchun Call Stack-da alohida Stack Frame ajratiladi. U chaqiriq tugaguniga qadar uning barcha lokal ma'lumotlarini saqlab turadi."
    },
    {
      id: 3,
      question: "Rekursiyadagi 'Base Case' (Tugash sharti) noto'g'ri yozilsa yoki yozilmasa nima sodir bo'ladi?",
      options: [
        "Kod umuman ishga tushmaydi",
        "Cheksiz chaqiriq yuzaga kelib, Call Stack to'lib ketadi va 'Stack Overflow' yuz beradi",
        "JS interpretatori avtomatik uni siklga aylantiradi",
        "Hech qanday o'zgarish bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Base case bo'lmaganda rekursiya cheksiz davom etadi. Bu esa tez fursatda ajratilgan stek xotiraning to'lishiga (Stack Overflow) sabab bo'ladi."
    },
    {
      id: 4,
      question: "Optimallashtirilmagan rekursiv Fibonachchi algoritmining vaqt murakkabligi qanday?",
      options: [
        "O(N)",
        "O(log N)",
        "O(N^2)",
        "O(2^N)"
      ],
      correctAnswer: 3,
      explanation: "Har bir chaqiriq o'zidan keyin yana ikkita chaqiriqni amalga oshiradi, bu chaqiriqlar daraxtini hosil qilib, operatsiyalar sonini eksponentsial O(2^N) darajaga chiqaradi."
    },
    {
      id: 5,
      question: "Rekursiv funksiyaning xotira murakkabligi (Space Complexity) nimalarga bog'liq?",
      options: [
        "Faqat kirish parametrlari o'lchamiga",
        "Call Stack-dagi faol chaqiriqlarning maksimal chuqurligiga (eng ko'p framelar soniga)",
        "Koddagi funksiyalar soniga",
        "O'zgaruvchilar nomlarining uzunligiga"
      ],
      correctAnswer: 1,
      explanation: "Rekursiyaning xotira murakkabligi bir vaqtning o'zida stekda turgan eng ko'p framelar soniga (chuqurligiga) bog'liq. Bu odatda O(depth) shaklida o'lchanadi."
    },
    {
      id: 6,
      question: "JS-da rekursiya chaqiriqlari maksimal chuqurligi taxminan qancha bo'ladi?",
      options: [
        "Cheksiz",
        "Faqat 100 marta",
        "Dvigatel va muhitga qarab taxminan 10,000 atrofida",
        "Roppa-rosa 1,000,000 marta"
      ],
      correctAnswer: 2,
      explanation: "JS dvigatellarida (V8) stek hajmi cheklangan va odatda chuqurlik 10,000 chaqiriq atrofida to'lib, xato beradi."
    },
    {
      id: 7,
      question: "Tail Call Optimization (TCO) ning asosiy foydasi nimada?",
      options: [
        "Matnlar ustida tez ishlash",
        "Oxirgi rekursiv chaqiriq uchun yangi stack frame ochmasdan mavjudini qayta ishlatib, xotirani tejash",
        "Dasturni avtomatik optimallashtirish",
        "CSS animatsiyalarini yuklash"
      ],
      correctAnswer: 1,
      explanation: "TCO yordamida rekursiv funksiyalar iteratsiya kabi O(1) xotirada ishlashi mumkin, chunki eski stack framelar saqlab turilmaydi."
    },
    {
      id: 8,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nfunction test(n) {\n  if (n === 0) return 0;\n  return n + test(n - 1);\n}\nconsole.log(test(3));\n```",
      options: [
        "3",
        "6",
        "0",
        "Stack Overflow"
      ],
      correctAnswer: 1,
      explanation: "Chaqiriqlar ketma-ketligi: 3 + test(2) -> 3 + 2 + test(1) -> 3 + 2 + 1 + test(0) -> 3 + 2 + 1 + 0 = 6."
    },
    {
      id: 9,
      question: "Iterativ yondashuv (loops) rekursiv yondashuvga qaraganda qanday afzallikka ega?",
      options: [
        "Kodi har doim qisqa bo'ladi",
        "Stek xotiradan joy olmaydi, shuning uchun xotira sarfi O(1) bo'ladi va Stack Overflow xavfi yo'q",
        "Uni tushunish osonroq",
        "Daraxtlarni aylanib chiqishda qulayroq"
      ],
      correctAnswer: 1,
      explanation: "Sikllar faqat o'zgarmas o'zgaruvchilarni yangilaydi, stekda yangi framelar yaratmaydi. Shu sababli xotira samaradorligi yuqori."
    },
    {
      id: 10,
      question: "Har qanday rekursiv dasturni iterativ (loop) shaklga o'tkazsa bo'ladimi?",
      options: [
        "Yo'q, ba'zi algoritmlar faqat rekursiyada ishlaydi",
        "Ha, qo'lda stek ma'lumotlar tuzilmasini yaratib simulyatsiya qilish orqali buni doim qilish mumkin",
        "Faqat sonli algoritmlarni o'tkazish mumkin",
        "Faqat massivlar bilan ishlaydiganlarini"
      ],
      correctAnswer: 1,
      explanation: "Nazariy kompyuter fanlarida isbotlangan: istalgan rekursiv algoritm iterativ ko'rinishga (ko'pincha stek yordamida) o'tkazilishi mumkin."
    },
    {
      id: 11,
      question: "Nima uchun Recursion (Rekursiya) ko'pincha daraxt (Tree) tuzilmalarida keng qo'llaniladi?",
      options: [
        "Chunki daraxtlar faqat shoxlardan iborat",
        "Daraxt tuzilmalari o'z-o'ziga o'xshash (self-similar) bo'lgani uchun, ya'ni har bir shox o'zi ham alohida kichik daraxt (subtree) hisoblanadi",
        "Chunki ular xotirani tejaydi",
        "Daraxtlarda sikllar taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "Daraxt tuzilmalari tabiatan rekursivdir. Har bir node o'z navbatida kichik sub-treelardan iborat bo'lgani uchun ularni aylanib chiqishda rekursiv kod yozish oson va qulay."
    },
    {
      id: 12,
      question: "O'zaro rekursiya (Mutual Recursion) deganda nimani tushunasiz?",
      options: [
        "Bitta funksiyaning o'zini bir vaqtda ikki marta chaqirishi",
        "A funksiyaning B funksiyani chaqirishi va o'z navbatida B funksiyaning A funksiyani chaqirishi",
        "Cheksiz davom etadigan sikl",
        "Xatoliklarni ushlovchi funksiyalar zanjiri"
      ],
      correctAnswer: 1,
      explanation: "Ikki yoki undan ortiq funksiyalar bir-birini bilvosita, zanjir shaklida chaqirib rekursiya hosil qilishi o'zaro (mutual) rekursiya deyiladi."
    }
  ]
};
