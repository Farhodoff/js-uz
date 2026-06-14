export const dsaControlFlow = {
  id: "dsaControlFlow",
  title: "Boshqaruv Oqimi va Sikl Murakkabligi (Control Flow & Loops)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Dasturda kodlarning bajarilish tartibini boshqarish xuddi chorrahadagi svetofor va yo'l belgilariga o'xshaydi. Shartli o'tishlar (\`if-else\`) yo'lni ikkiga ajratsa, sikllar (\`loops\`) ma'lum bir aylanma yo'lni takroran bosib o'tishga o'xshaydi.

### Svetofor va Aylanma yo'l o'xshatishi:
- **Shartli o'tish (Conditional / Branching):** "Agar svetofor yashil bo'lsa, to'g'riga yur, aks holda to'xta." Bu yerda faqat bitta yo'nalish tanlanadi va vaqt murakkabligi doimiy $O(1)$ bo'ladi, chunki shart tekshiruvi bir lahzada bajariladi.
- **Sikllar (Loops):** "Aylanma yo'ldan (roundabout) 5 marta aylanib o't keyin chiq." Bu yerda operatsiyalar takrorlanadi. Agar aylanma yo'lni $N$ marta aylanib chiqish kerak bo'lsa, siz bosib o'tgan masofa va vaqt $O(N)$ chiziqli murakkablikda bo'ladi.
- **Ichma-ich sikllar (Nested Loops):** Siz har safar katta aylanma yo'ldan o'tganingizda (tashqi sikl), ichkaridagi kichik yo'lni 3 marta aylanasiz (ichki sikl). Jami aylanishlar ko'paytiriladi.

---

## 2. 💻 Real Kod Misollari

Sikllarning har xil murakkablik darajalarini ko'rsatuvchi kod namunalari:

\`\`\`javascript
// 1. Shartli tekshiruv (Constant Time - O(1))
function checkLimit(value, limit) {
  if (value > limit) {
    return "Limitdan oshdi";
  } else {
    return "Normada";
  }
}

// 2. Chiziqli sikl (Linear Time - O(N))
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// 3. Ichma-ich sikl (Quadratic Time - O(N^2))
function hasCommonElement(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true; // Erta chiqish (Early Exit)
      }
    }
  }
  return false;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Branch Predictor (Shartlarni Oldindan Taxmin Qilish):
Zamonaviy protsessorlar darajasida shartli o'tishlar (\`if-else\`) bajarilayotganda, protsessor qaysi shart bajarilishini oldindan taxmin qilishga harakat qiladi (**Branch Prediction**). Agar taxmin to'g'ri chiqsa, kod juda tez bajariladi. Agar xato bo'lsa, tayyorlab qo'yilgan pipeline tozalanadi va vaqt yo'qotiladi.

### Loop Optimization va Erta Chiqishlar:
- **Early Exit (Erta chiqish):** Agar izlayotgan elementimiz topilsa, siklni darhol \`break\` yoki \`return\` yordamida to'xtatish kerak. Bu eng yaxshi holatda (Best Case) vaqtni O(1) gacha qisqartirishi mumkin.
- **Loop Invariants:** Sikl ichida o'zgarmaydigan amallarni sikldan tashqariga chiqarish kod samaradorligini oshiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Sikl ichida og'ir yoki keraksiz amallarni takrorlash
Sikl ichida har safar o'zgarmas hisob-kitoblarni qaytadan bajarish sekinlashuvga olib keladi.
* **Xato:**
  \`\`\`javascript
  for (let i = 0; i < arr.length; i++) {
    // Har iteratsiyada obyekt kalitlarini olish O(K) vaqt oladi
    const keys = Object.keys(config); 
    process(arr[i], keys);
  }
  \`\`\`
* **Tuzatish:**
  \`\`\`javascript
  const keys = Object.keys(config); // Sikldan tashqariga chiqarish
  for (let i = 0; i < arr.length; i++) {
    process(arr[i], keys);
  }
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **\`if-else\` shartining vaqt murakkabligi qanday?**
   * *Javob:* O(1) doimiy vaqt oladi, chunki shart tekshiruvi faqat bir marta bajariladi.
2. **\`break\` va \`continue\` operatorlarining farqi nimada?**
   * *Javob:* \`break\` siklni butunlay to'xtatib undan chiqib ketadi. \`continue\` esa joriy iteratsiyani o'tkazib yuborib, keyingi iteratsiyaga o'tadi.
3. **Ichma-ich joylashgan sikllar har doim O(N^2) bo'ladimi?**
   * *Javob:* Yo'q. Agar ichki sikl tashqi o'lchamga bog'liq bo'lmagan doimiy K marta aylansa, murakkablik O(N * K) = O(N) bo'ladi.
4. **Early Exit (Erta chiqish) yondashuvining afzalligi nimada?**
   * *Javob:* Maqsadga erishilganda ortiqcha hisob-kitoblar va qadamlarni bajarishdan qochib, vaqtni tejaydi.
5. **Nima uchun cheksiz sikl (infinite loop) yuzaga keladi?**
   * *Javob:* Siklning tugash sharti (termination condition) hech qachon bajarilmasa yoki noto'g'ri yozilsa.
6. **Protsessordagi 'Branch Prediction' kodingizga qanday ta'sir qiladi?**
   * *Javob:* Saralangan massivlarni aylanib chiqish saralanmaganga qaraganda tezroq ishlaydi, chunki branch predictor shartlarni to'g'ri taxmin qiladi.
7. **Sikl o'zgaruvchisini \`let\` o'rniga \`var\` bilan e'lon qilishning qanday yashirin xavfi bor?**
   * *Javob:* \`var\` blok skopiga ega bo'lmagani uchun sikldan tashqarida ham mavjud bo'lib qoladi va boshqa o'zgaruvchilar bilan to'qnashib, buglar yaratishi mumkin.
8. **\`while\` va \`do-while\` farqi nimada?**
   * *Javob:* \`while\` avval shartni tekshiradi, \`do-while\` esa kamida bir marta kodni bajarib, keyin shartni tekshiradi.
9. **Sikl ichida \`try-catch\` blokini qo'llash unumdorlikka ta'sir qiladimi?**
   * *Javob:* Ha, sikl ichida xatoliklarni ushlovchi block bo'lishi JS dvigateliga optimallash jarayoniga xalaqit beradi. Iloji bo'lsa, try-catch blockni sikl tashqarisiga qo'yish afzal.
10. **Time complexity nuqtai nazaridan loop unrolling (sikl yoyish) nima?**
    * *Javob:* Iteratsiyalar sonini kamaytirish uchun sikl ichida bir nechta amalni ketma-ket yozish. Bu sikl nazorat xarajatlarini tejaydi.
11. **Sikllarda \`length\` xossasini keshlab qo'yish (masalan \`let len = arr.length\`) shartmi?**
    * *Javob:* Zamonaviy JS dvigatellarida (V8) massiv o'lchami avtomatik keshlanadi, lekin HTMLCollection kabi dinamik DOM ro'yxatlarida bu juda muhim.
12. **Siklni to'xtatishning eng xavfsiz usuli qanday?**
    * *Javob:* Tugallanish shartini aniq belgilash va kutilmagan holatlar uchun maksimal iteratsiyalar chegarasini (safety counter) o'rnatish.

---

## 6. 🎨 Interaktiv Vizual

### Ichma-ich Sikllarning Ishlash Diagrammasi
Tashqi va ichki sikl qadamlarining bir-biriga bog'liqligi:

\`\`\`mermaid
sequenceDiagram
    participant Tashqi as Tashqi Loop (i)
    participant Ichki as Ichki Loop (j)
    Tashqi->>Ichki: i = 0 da ichki loop boshlanadi
    Ichki->>Ichki: j = 0, keyin j = 1
    Tashqi->>Ichki: i = 1 da ichki loop boshlanadi
    Ichki->>Ichki: j = 0, keyin j = 1
    Note over Tashqi,Ichki: Umumiy qadamlar ko'paytmasi: i * j
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mavzuni amaliy kod yozib mustahkamlang.

---

## 8. 📝 12 ta Mini Test

Sikllar va shartlarni tekshiruvchi testlardan o'ting.

---

## 9. 🚀 Performance va Optimization

- **Sikl ichidan chaqiruvlarni chiqarish:** Iloji boricha og'ir hisob-kitoblar va o'zgarmas funksiyalarni sikldan tashqarida e'lon qiling.
- **Erta to'xtatish:** Qidiruv jarayonida natija topilishi bilan darhol \`return\` qiling.

---

## 10. 📌 Cheat Sheet

| Sikl turi | Eng yaxshi holat (Best Case) | Eng yomon holat (Worst Case) | Qo'llanilishi |
| :--- | :--- | :--- | :--- |
| **Oddiy For** | O(1) (Erta chiqish bilan) | O(N) | Massivni to'liq aylanib chiqish |
| **Ichma-ich For** | O(1) (Erta chiqish bilan) | O(N^2) | Matritsalar, juftliklar qidiruvi |
| **While** | O(1) | O(N) (yoki cheksiz) | Qadamlar soni oldindan ma'lum bo'lmaganda |
`,
  exercises: [
    {
      id: 1,
      title: "Optimallashtirilgan FizzBuzz",
      instruction: "Berilgan `n` sonigacha bo'lgan sonlarni aylanib chiquvchi `fizzBuzz(n)` funksiyasini yozing. Har bir son uchun massivga quyidagi qiymatlarni qo'shing:\n- 3 ga bo'linsa: `'Fizz'`\n- 5 ga bo'linsa: `'Buzz'`\n- Ikkalasiga bo'linsa: `'FizzBuzz'`\n- Bo'linmasa o'zi (son ko'rinishida).\nKodda `%` operatorini har bir iteratsiyada eng ko'pida 2 marta ishlating (ko'p marta tekshirib vaqt sarflamang).",
      startingCode: "function fizzBuzz(n) {\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Bitta o'zgaruvchi yarating, masalan `let str = ''`, unga 3 ga bo'linsa 'Fizz', 5 ga bo'linsa 'Buzz' qo'shib keting.",
      test: "const sandbox = new Function(code + '; return fizzBuzz;'); const fn = sandbox(); const res = fn(15); if (res && res[2] === 'Fizz' && res[4] === 'Buzz' && res[14] === 'FizzBuzz' && res[0] === 1) return null; return 'FizzBuzz funksiyasi xato qiymat qaytardi';"
    },
    {
      id: 2,
      title: "Matritsani Bitta Sikl Bilan Aylanib Chiqish",
      instruction: "2D matritsa (ichma-ich massiv) berilgan. Ikki qavatli nested loops ishlatmasdan, faqat bitta oddiy `for` yoki `while` sikli yordamida barcha elementlarni bir o'lchamli massivga yig'adigan `flattenMatrix(matrix)` funksiyasini yozing. Matritsa o'lchami har doim kvadrat (N x N) bo'ladi.",
      startingCode: "function flattenMatrix(matrix) {\n  const res = [];\n  // Kodni yozing\n  return res;\n}",
      hint: "Matritsa o'lchami N bo'lsa, jami elementlar soni N * N bo'ladi. Har bir indeks uchun qatorni `Math.floor(index / N)` va ustunni `index % N` orqali toping.",
      test: "if (code.includes('for') && (code.match(/for/g) || []).length > 1) return 'Nested for loop ishlatish taqiqlanadi'; const sandbox = new Function(code + '; return flattenMatrix;'); const fn = sandbox(); const mat = [[1, 2], [3, 4]]; const res = fn(mat); if (res && res[0] === 1 && res[1] === 2 && res[2] === 3 && res[3] === 4) return null; return 'Matritsa to\\'g\\'ri tekislanmadi';"
    },
    {
      id: 3,
      title: "Erta Chiqishli Chiziqli Qidiruv",
      instruction: "Obyektlardan iborat massiv va qidirilayotgan kalit-qiymat juftligi berilgan. Massivni aylanib chiqib, mos obyektni darhol qaytaradigan va ishni to'xtatadigan `findFirstMatch(arr, key, value)` funksiyasini yozing. Agar mos element topilmasa `null` qaytarsin.",
      startingCode: "function findFirstMatch(arr, key, value) {\n  // Kodni yozing\n}",
      hint: "Sikl ichida `if (item[key] === value)` sharti to'g'ri kelganda `return item` qilib erta chiqib keting.",
      test: "const sandbox = new Function(code + '; return findFirstMatch;'); const fn = sandbox(); const data = [{id:1, name:'A'}, {id:2, name:'B'}, {id:3, name:'A'}]; const res = fn(data, 'name', 'A'); if (res && res.id === 1) return null; return 'Mos obyekt topilmadi yoki erta chiqish amalga oshmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Sikl ichidagi shartda `break` operatori ishlatilsa nima sodir bo'ladi?",
      options: [
        "Sikl butunlay tugatiladi va undan keyingi kod bajarilishda davom etadi",
        "Sikl faqat joriy qadamni o'tkazib yuboradi",
        "Dastur xatolik bilan to'xtaydi",
        "Sikl boshidan qaytadan ishga tushadi"
      ],
      correctAnswer: 0,
      explanation: "`break` operatori joriy sikl blockini darhol to'xtatadi va boshqaruvni sikldan keyingi qatorga o'tkazadi."
    },
    {
      id: 2,
      question: "Quyidagi kod necha marta konsolga qiymat chiqaradi?\n```javascript\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  console.log(i);\n}\n```",
      options: [
        "5 marta",
        "4 marta",
        "3 marta",
        "2 marta"
      ],
      correctAnswer: 1,
      explanation: "`i` jami 0, 1, 2, 3, 4 qiymatlarini oladi. `i === 2` bo'lganda `continue` ishlagani uchun ushbu qadamda konsolga chiqarish bajarilmaydi. Jami 4 marta chiqariladi."
    },
    {
      id: 3,
      question: "Time complexity nuqtai nazaridan, if-else operatori qanday baholanadi?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 0,
      explanation: "Shartli o'tishlar (if-else) faqat bitta shart tekshiruvi bo'lgani uchun kirish hajmidan qat'i nazar o'zgarmas O(1) vaqt oladi."
    },
    {
      id: 4,
      question: "N x N o'lchamdagi kvadrat matritsani ikkita ichma-ich sikl yordamida aylanib chiqishning murakkabligi qanday?",
      options: [
        "O(N)",
        "O(N log N)",
        "O(N^2)",
        "O(2^N)"
      ],
      correctAnswer: 2,
      explanation: "Tashqi sikl N marta, ichki sikl har safar N marta aylangani uchun umumiy operatsiyalar soni N * N = N^2 (Kvadratik murakkablik) bo'ladi."
    },
    {
      id: 5,
      question: "Branch Predictor (Shartlarni taxmin qilish) qachon eng ko'p xatoga yo'l qo'yadi va vaqt sarflaydi?",
      options: [
        "Ma'lumotlar butunlay saralangan bo'lganda",
        "Shartlar tasodifiy (random) va tartibsiz ma'lumotlar ustida tekshirilganda",
        "Hech qanday shart bo'lmaganda",
        "Faqat bitta if sharti bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "Branch predictor o'tmishdagi naqshlarga (pattern) tayanadi. Agar ma'lumotlar tasodifiy bo'lsa, shart natijasini taxmin qilish imkoni kamayadi va protsessor xato taxminlar tufayli vaqt yo'qotadi."
    },
    {
      id: 6,
      question: "Sikl ichida yozilgan `try-catch` blocki haqida qaysi fikr to'g'ri?",
      options: [
        "Kodni doimo tezlashtiradi",
        "JS dvigatelining (masalan V8) kodni optimallash jarayoniga salbiy ta'sir ko'rsatishi mumkin",
        "Cheksiz sikllarni oldini oladi",
        "Tip tekshiruvini majburiy qiladi"
      ],
      correctAnswer: 1,
      explanation: "Sikl ichida catch block bo'lishi V8 dvigatelining inline optimallash ishiga xalaqit beradi, shuning uchun juda zarur bo'lmasa try-catch blockni sikl tashqarisiga qo'ygan afzal."
    },
    {
      id: 7,
      question: "Nima uchun nested loop ishlatishda ehtiyot bo'lish zarur?",
      options: [
        "Chunki ular xotiradan juda ko'p joy egallaydi",
        "Chunki ma'lumotlar soni ortishi bilan bajarilish vaqti keskin (kvadratik ravishda) o'sib ketadi",
        "Chunki ular JS tilida taqiqlangan",
        "Hech qanday xavfi yo'q"
      ],
      correctAnswer: 1,
      explanation: "O(N^2) murakkablikdagi kod 100,000 ta ma'lumot kelganda 10 milliard operatsiya bajaradi. Bu esa dasturning qotib qolishiga sabab bo'ladi."
    },
    {
      id: 8,
      question: "Quyidagi loop qachon tugaydi?\n```javascript\nlet i = 0;\nwhile (i < 10) {\n  console.log(i);\n}\n```",
      options: [
        "10 marta aylangandan keyin",
        "Hech qachon tugamaydi (cheksiz sikl)",
        "Dars o'zi tugatadi",
        "i = 10 bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "Sikl ichida `i` o'zgaruvchisining qiymati oshirilmayapti (`i++` yo'q), shuning uchun `i` doim 0 bo'lib qoladi va shart doim true bo'lganidan cheksiz sikl yuzaga keladi."
    },
    {
      id: 9,
      question: "Early Exit (Erta chiqish) yondashuvi qaysi maqsadda ishlatiladi?",
      options: [
        "Kodni tezroq yozib tugatish uchun",
        "Keraksiz hisob-kitoblarni oldini olish va kerakli natija topilishi bilan sikl/funksiyani darhol yakunlash uchun",
        "Dasturni majburan yopish uchun",
        "Xotirani tozalash uchun"
      ],
      correctAnswer: 1,
      explanation: "Erta chiqish (masalan `return` qilish) qidirilayotgan ma'lumot topilganidan so'ng qolgan elementlarni aylanib chiqishga vaqt sarflamaslikni ta'minlaydi."
    },
    {
      id: 10,
      question: "Quyidagi siklning vaqt murakkabligi qanday?\n```javascript\nfor (let i = 0; i < N; i++) {\n  for (let j = 0; j < 5; j++) {\n    console.log(i, j);\n  }\n}\n```",
      options: [
        "O(N^2)",
        "O(N)",
        "O(5N)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Ichki sikl doimiy 5 marta aylanadi (N ga bog'liq emas). Umumiy operatsiyalar soni 5 * N marta bajariladi. Konstantalar tashlanganda murakkablik O(N) chiziqli bo'ladi."
    },
    {
      id: 11,
      question: "`do-while` siklining `while`dan asosiy farqi nimada?",
      options: [
        "Do-while shartni tekshirishdan oldin kamida bir marta sikl ichidagi kodni bajaradi",
        "Do-while tezroq ishlaydi",
        "Do-while xotiradan kamroq joy oladi",
        "Do-while faqat sonli qiymatlar bilan ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "`do-while` operatorida shart oxirida tekshiriladi, shuning uchun shart noto'g'ri bo'lsa ham uning ichidagi kod kamida 1 marta albatta ishlaydi."
    },
    {
      id: 12,
      question: "Sikl ichida `Object.keys(obj)` funksiyasini chaqirish qanday muammoni keltirib chiqarishi mumkin?",
      options: [
        "Hech qanday muammo yo'q",
        "Bu metod obyekt kalitlarini olish uchun orqa fonda obyektni to'liq aylanib chiqadi (O(K)) va loop ichida ishlatilsa vaqtni sekinlashtiradi",
        "Bu metod faqat arraylar bilan ishlaydi",
        "Xotirani butunlay tozalab yuboradi"
      ],
      correctAnswer: 1,
      explanation: "`Object.keys()` doimiy vaqtda ishlamaydi, u obyekt kalitlari soniga mutanosib vaqt oladi. Sikl ichida chaqirilganda bu yashirin nested loop kabi unumdorlikni pasaytiradi."
    }
  ]
};
