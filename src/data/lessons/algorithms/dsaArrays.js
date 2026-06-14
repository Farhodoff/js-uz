export const dsaArrays = {
  id: "dsaArrays",
  title: "Massivlar: Statik va Dinamik Massivlar (Static & Dynamic Arrays)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Massivlar (Arrays) - bu kompyuter xotirasida ketma-ket joylashgan, bir xil turdagi elementlarni saqlashga mo'ljallangan eng asosiy ma'lumotlar tuzilmasidir.

### Poyezd vagonlari o'xshatishi:
- **Statik Massiv (Static Array):** Tasavvur qiling, vokzalda roppa-rosa 5 ta vagondan iborat poyezd turibdi. Vagondagi o'rindiqlar soni qat'iy belgilangan. Agar 6-yo'lovchi kelib chiqsa, uni poyezdga sig'dirib bo'lmaydi. Poyezd vagonlariga o'zgartirish kiritib bo'lmaydi. Siz har bir vagon raqamiga (indeks) qarab u yerda kim o'tirganini O(1) vaqtda tezda bilib olasiz.
- **Dinamik Massiv (Dynamic Array):** Yo'lovchilar ko'paygani sari o'z-o'zidan uzunligi kattalashadigan aqlli poyezd. Agar 5 ta vagon to'lib qolsa, temir yo'l xizmati darhol yon tomondagi bo'sh relsga borib, 10 ta vagondan iborat yangi poyezdni tayyorlaydi (hajmini 2 barobar oshiradi) va birinchi poyezddagi barcha yo'lovchilarni yangi poyezdga ko'chirib o'tadi (Resizing).

---

## 2. 💻 Real Kod Misollari

JavaScript-da massivlar dinamik massiv hisoblanadi. Dynamic massivning orqa fonda ishlash simulyatsiyasi:

\`\`\`javascript
class SimpleDynamicArray {
  constructor() {
    this.capacity = 4; // Boshlang'ich xotira hajmi
    this.length = 0;
    this.data = new Array(this.capacity);
  }

  // O(1) amortizatsiyalangan qiymat qo'shish
  push(val) {
    if (this.length === this.capacity) {
      this._resize();
    }
    this.data[this.length] = val;
    this.length++;
  }

  // O(N) massiv hajmini 2 barobar kattalashtirish
  _resize() {
    this.capacity *= 2;
    const newArray = new Array(this.capacity);
    for (let i = 0; i < this.length; i++) {
      newArray[i] = this.data[i]; // Ma'lumotlarni ko'chirish
    }
    this.data = newArray;
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Xotirada Ketma-ketlik (Contiguous Memory):
Statik massiv yaratilganda xotiradan (RAM) ketma-ket joylashgan block ajratiladi.
- Massivning $i$-chi elementining xotiradagi manzili quyidagi formula bilan hisoblanadi:
  $$\\text{Manzil} = \\text{Boshlang'ich Manzil} + i \\times \\text{Element Hajmi}$$
- Chunki kompyuter faqat birgina formula yordamida manzilni darhol hisoblab oladi, shuning uchun massivdan indeks bo'yicha element o'qish (Lookup) har doim $O(1)$ vaqt oladi.
- **Amortizatsiyalangan vaqt (Amortized Time):** Dinamik massivga element qo'shish ko'pincha $O(1)$ vaqt oladi. Faqat massiv to'lib qolganida yangi massiv yaratib nusxalash $O(N)$ vaqt oladi. Ammo bu ko'chirish juda kamdan-kam sodir bo'lgani sababli, o'rtacha hisobda (amortizatsiyalanganda) bitta kirish $O(1)$ deb qabul qilinadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Elementni massiv boshiga yoki o'rtasiga qo'shish/o'chirish xarajatini hisobga olmaslik
Ko'pchilik \`unshift\` yoki \`splice\` metodlarini doimiy vaqt oladi deb o'ylaydi.
* **Xato:**
  \`\`\`javascript
  const arr = [2, 3, 4, 5];
  arr.unshift(1); // O(N) - Massiv boshiga element qo'shilganda har bir element o'ngga suriladi!
  \`\`\`
* **Tuzatish:**
  Agar sizga massiv boshidan va oxiridan tez ma'lumot qo'shish kerak bo'lsa, Massiv o'rniga Deque (Double-ended queue) yoki Linked List-dan foydalaning.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Massivning xotiradagi asosiy xususiyati nima?**
   * *Javob:* Elementlari xotirada ketma-ket (contiguous) block ko'rinishida saqlanadi.
2. **Indeks bo'yicha lookup nega har doim O(1) bo'ladi?**
   * *Javob:* Chunki element manzili formula orqali (boshlang'ich manzil + indeks * element hajmi) matematik tarzda bir marta hisoblanadi.
3. **Statik va Dinamik massivlar farqi nima?**
   * *Javob:* Statik massiv hajmi yaratilishda qat'iy belgilanadi. Dinamik massiv esa to'lib qolganda avtomatik ravishda kattaroq xotira blockiga ko'chib o'tadi.
4. **Dinamik massiv to'lganda nega odatda hajmi 2 barobar ko'paytiriladi?**
   * *Javob:* Ko'p marta resizing qilishni oldini olish va element qo'shish unumdorligini amortizatsiyalangan O(1) saqlash uchun.
5. **Massiv boshiga element qo'shish (\`unshift\`) nima uchun O(N) vaqt oladi?**
   * *Javob:* Massivning barcha mavjud elementlarini bitta indeks o'ngga siljitib (shift), 0-indeksni bo'shatish kerak bo'lgani uchun.
6. **Massiv oxiridan element o'chirish (\`pop\`) murakkabligi qanday?**
   * *Javob:* O(1) doimiy vaqt oladi, chunki elementlarni surish shart emas.
7. **Javaskript massivlari aslida statik massivmi?**
   * *Javob:* Yo'q, JS massivlari orqa fonda yuqori darajadagi dinamik massiv simulyatsiyasi hisoblanadi (va u sparse array kabi ishlay oladi).
8. **Prefix Sum texnikasi nima va u qachon ishlatiladi?**
   * *Javob:* Massiv elementlarining yig'indisini oldindan hisoblab, istalgan oraliqdagi (subarray) yig'indini O(1) vaqtda topish uchun yordam beradigan texnika.
9. **Two Pointers (Ikki ko'rsatkich) texnikasi nima?**
   * *Javob:* Massiv boshidan va oxiridan (yoki turli tezlikda) ikkita ko'rsatkich yordamida massivni bir marta aylanib chiqib, kerakli shartni tekshirish usuli (vaqtni O(N^2) dan O(N) ga tushiradi).
10. **Matritsa (Multi-dimensional array) xotirada qanday saqlanadi?**
    * *Javob:* Kompyuter xotirasi 1 o'lchamli chiziqli bo'lgani uchun matritsalar yoki qatorlar bo'yicha (Row-major) yoki ustunlar bo'yicha (Column-major) ketma-ketlashtirilib saqlanadi.
11. **Dinamik massivning amortizatsiyalangan vaqti nima degani?**
    * *Javob:* Massivga element qo'shish deyarli har doim O(1) vaqt oladi, faqat juda kamdan-kam (N operatsiyadan birida) resizing uchun O(N) vaqt sarflanadi. O'rtacha hisoblaganda jami vaqt baribir O(1) ga teng bo'ladi.
12. **Massivni in-place (o'z joyida) o'zgartirish nima degani?**
    * *Javob:* Qo'shimcha massiv yaratmasdan (Space complexity O(1) bo'lgan holatda) massiv elementlarini o'zgartirish yoki tartiblash.

---

## 6. 🎨 Interaktiv Vizual

### Dinamik Massivni Kattalashtirish (Resizing)
Hajmi to'lganda yangi xotira ajratilishi va ma'lumotlar ko'chirilishi:

\`\`\`mermaid
graph TD
    subgraph Old [Eski Massiv - To'lgan capacity: 4]
        m1[10]
        m2[20]
        m3[30]
        m4[40]
    end
    subgraph New [Yangi Massiv - Yangi capacity: 8]
        n1[10]
        n2[20]
        n3[30]
        n4[40]
        n5[50]
        n6[Bo'sh]
        n7[Bo'sh]
        n8[Bo'sh]
    end
    m1 -.->|Ko'chirish| n1
    m2 -.->|Ko'chirish| n2
    m3 -.->|Ko'chirish| n3
    m4 -.->|Ko'chirish| n4
    style Old fill:#fadbd8,stroke:#e74c3c,stroke-width:2px
    style New fill:#d4efdf,stroke:#27ae60,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mavzu bo'yicha amaliy kod yozish topshiriqlari.

---

## 8. 📝 12 ta Mini Test

Bilimingizni tekshirish uchun testlar.

---

## 9. 🚀 Performance va Optimization

- **Array Resizing minimallashtirish:** Agar siz yaratayotgan massiv elementlari soni aniq bo'lsa, JS-da \`new Array(size)\` orqali xotirani oldindan bron qiling.
- **Boshiga element qo'shishdan qoching:** Har doim oxiriga push qilib, keyin kerak bo'lsa reverse qilish \`unshift\` qilishdan ko'ra tezroq ishlaydi.

---

## 10. 📌 Cheat Sheet

| Amallar | Vaqt murakkabligi (Time Complexity) | Xotira murakkabligi (Space Complexity) | Izoh |
| :--- | :--- | :--- | :--- |
| **Lookup (indeks bo'yicha olish)** | O(1) | O(1) | O'ta tezkor |
| **Search (qiymat qidirish)** | O(N) | O(1) | Butun massiv aylaniladi |
| **Insert (oxiriga qo'shish)** | O(1) (Amortizatsiyalangan) | O(1) (Resizing bo'lmasa) | Eng yaxshi qo'shish usuli |
| **Insert (boshiga qo'shish)** | O(N) | O(1) | Elementlar o'ngga suriladi |
`,
  exercises: [
    {
      id: 1,
      title: "Prefix Sum Massiv Generator",
      instruction: "Berilgan sonlar massividan foydalanib, uning Prefix Sum (oldingi yig'indilar) massivini yaratuvchi `getPrefixSum(arr)` funksiyasini yozing. Masalan: `[1, 2, 3]` berilsa, `[1, 1+2, 1+2+3]` ya'ni `[1, 3, 6]` qaytsin.",
      startingCode: "function getPrefixSum(arr) {\n  // Kodni shu yerda yozing\n}",
      hint: "Yangi massiv yaratib, birinchi elementni joylashtiring. Qolgan elementlar uchun `res[i] = res[i-1] + arr[i]` formuladan foydalaning.",
      test: "const sandbox = new Function(code + '; return getPrefixSum;'); const fn = sandbox(); const res = fn([1, 2, 3, 4]); if (res && res[0] === 1 && res[1] === 3 && res[2] === 6 && res[3] === 10) return null; return 'Prefix sum massivi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 2,
      title: "Ikki Ko'rsatkichli Target Yig'indi (Two Sum Sorted)",
      instruction: "O'sish tartibida saralangan massiv `arr` va `target` soni berilgan. Ikki ko'rsatkich (Two Pointers) texnikasi yordamida, massiv ichidagi yig'indisi `target`ga teng bo'lgan ikki sonning indekslarini massiv ko'rinishida `[index1, index2]` qaytaradigan `twoSumSorted(arr, target)` funksiyasini yozing. (Ichma-ich loop yozish taqiqlanadi, vaqt murakkabligi O(N) bo'lishi shart).",
      startingCode: "function twoSumSorted(arr, target) {\n  // Kodni shu yerda yozing\n}",
      hint: "boshidan `left = 0` va oxiridan `right = arr.length - 1` ko'rsatkichlarni belgilang. Agar yig'indi targetdan kichik bo'lsa left-ni oshiring, katta bo'lsa right-ni kamaytiring.",
      test: "if (code.includes('for') && (code.match(/for/g) || []).length > 1) return 'Nested loop ishlatish taqiqlanadi (O(N^2) bo\\'lmasligi kerak)'; const sandbox = new Function(code + '; return twoSumSorted;'); const fn = sandbox(); const res = fn([1, 2, 3, 4, 6], 9); if (res && res[0] === 2 && res[1] === 4) return null; return 'Two sum sorted algoritmi xato indekslar qaytardi';"
    },
    {
      id: 3,
      title: "Nol Elementlarni Oxiriga Ko'chirish (In-Place)",
      instruction: "Sonlar massivi berilgan. Qo'shimcha massiv ochmasdan (Space complexity O(1) bo'lgan holda, massivni o'z joyida) massiv ichidagi barcha `0` qiymatga ega elementlarni massiv oxiriga ko'chiradigan, boshqa sonlarning tartibini buzmaydigan `moveZeroes(arr)` funksiyasini yozing. Funksiya o'sha massivni qaytarsin.",
      startingCode: "function moveZeroes(arr) {\n  // Kodni shu yerda yozing\n}",
      hint: "Bitta yozuvchi ko'rsatkich (`let writePointer = 0`) belgilang. Massivni aylanib chiqib nol bo'lmagan elementlarni writePointer o'rniga qo'ying va writePointer-ni oshiring. Oxirida qolgan qismini nol bilan to'ldiring.",
      test: "if (code.includes('filter') || code.includes('concat')) return 'Yangi massiv yaratuvchi metodlardan foydalanmang (In-Place bo\\'lishi shart)'; const sandbox = new Function(code + '; return moveZeroes;'); const fn = sandbox(); const testArr = [0, 1, 0, 3, 12]; const res = fn(testArr); if (res && res[0] === 1 && res[1] === 3 && res[2] === 12 && res[3] === 0 && res[4] === 0) return null; return 'Nollar oxiriga to\\'g\\'ri o\\'tkazilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Statik massivning xotiradagi eng asosiy xarakteristikasi nima?",
      options: [
        "Unga istalgancha element qo'shish mumkin",
        "Uning elementlari xotirada ketma-ket (contiguous) blocklarda joylashgan bo'lib, o'lchami o'zgarmasdir",
        "U faqat string turlaridan tashkil topadi",
        "U xotirani o'zi boshqaradi va keraksizlarini o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "Statik massiv yaratilganida xotiradan ma'lum bir statik o'lchamdagi ketma-ket blocklar ajratiladi va uni keyinchalik kengaytirib bo'lmaydi."
    },
    {
      id: 2,
      question: "Nima uchun massiv elementini indeks bo'yicha olish (Lookup) har doim O(1) bo'ladi?",
      options: [
        "Chunki massiv juda kichik bo'ladi",
        "Chunki element manzili formula orqali (boshlang'ich manzil + index * element_hajmi) bir zumda matematik hisoblab olinadi",
        "Chunki JS dvigateli massivlarni keshlab qo'yadi",
        "Chunki barcha elementlar bir xil qiymatga ega"
      ],
      correctAnswer: 1,
      explanation: "Xotira manzili oddiy matematika yordamida darhol aniqlanganligi sababli, massiv o'lchamidan qat'i nazar lookup O(1) vaqt oladi."
    },
    {
      id: 3,
      question: "Dinamik massiv to'lib qolganida yangi element qo'shish (Resizing) qanday amalga oshiriladi?",
      options: [
        "Orqa fondagi bo'sh joyga element shunchaki joylashtiriladi",
        "Kattaroq sig'imga (ko'pincha 2 barobar) ega yangi massiv yaratiladi, eski elementlar unga ko'chiriladi va yangisi qo'shiladi",
        "Eski elementlar avtomatik o'chirilib yuboriladi",
        "Operatsion tizim o'z-o'zidan massiv xotirasini kengaytiradi"
      ],
      correctAnswer: 1,
      explanation: "RAMda massivdan keyingi joy boshqa dasturlar bilan band bo'lishi mumkinligi uchun, dinamik massiv to'lganda butunlay boshqa bo'sh joydan 2 barobar katta yangi block ajratilib, barcha ma'lumotlar u yerga nusxalanadi."
    },
    {
      id: 4,
      question: "Dinamik massiv oxiriga element qo'shishning amortizatsiyalangan vaqt murakkabligi qanday?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N^2)"
      ],
      correctAnswer: 0,
      explanation: "Resizing amali O(N) vaqt olsada, u juda kamdan-kam (N ta elementdan keyin bir marta) sodir bo'ladi. O'rtacha hisobda har bir kiritish baribir amortizatsiyalangan O(1) deb baholanadi."
    },
    {
      id: 5,
      question: "Massivning birinchi indeksiga element qo'shish (unshift) nima uchun O(N) vaqt oladi?",
      options: [
        "Chunki boshida element kam bo'ladi",
        "Chunki mavjud barcha elementlarni xotirada bir indeks o'ngga surib chiqish zarur",
        "Chunki JS buni sekinlashtiradi",
        "Bu xato, u aslida O(1) vaqt oladi"
      ],
      correctAnswer: 1,
      explanation: "0-indeksga yangi qiymat qo'yish uchun massivdagi barcha N ta elementning indeksini 1 taga surib chiqish kerak bo'ladi, bu esa chiziqli O(N) murakkablikni yaratadi."
    },
    {
      id: 6,
      question: "Massiv oxiridan elementni o'chirish (`pop`) qanday vaqt oladi?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(1) yoki O(N) resizing ga qarab"
      ],
      correctAnswer: 0,
      explanation: "Massiv oxiridan elementni olib tashlash boshqa elementlarni xotirada surishni talab qilmaganligi sababli O(1) vaqt oladi."
    },
    {
      id: 7,
      question: "Multi-dimensional array (ko'p o'lchamli massiv) xotirada aslida qanday saqlanadi?",
      options: [
        "Qavatma-qavat bo'lib stackda joylashadi",
        "1 o'lchamli chiziqli xotira blockida ketma-ketlikda (Row-major yoki Column-major shaklida)",
        "Faqat tarmoq oqimi orqali dinamik bog'lanadi",
        "Har bir qator alohida diskda saqlanadi"
      ],
      correctAnswer: 1,
      explanation: "Jismoniy xotira (RAM) chiziqli (1D) bo'lgani sababli, ko'p o'lchamli massivlar orqa fonda matematik formula asosida ketma-ket joylashtirilgan chiziqli massivga aylantiriladi."
    },
    {
      id: 8,
      question: "Prefix Sum texnikasining asosiy afzalligi nimada?",
      options: [
        "Massivni tez saralash",
        "Massivning istalgan oraliqdagi subarray yig'indisini (range sum query) oldindan hisoblash orqali O(1) vaqtda qaytarish",
        "Nollardan tez tozalash",
        "Xotirani 2 barobar tejash"
      ],
      correctAnswer: 1,
      explanation: "Prefix sum yordamida L dan R gacha bo'lgan elementlar yig'indisini `prefix[R] - prefix[L-1]` formulasi bilan bitta operatsiyada (O(1)) hisoblash mumkin."
    },
    {
      id: 9,
      question: "Two Pointers (Ikki ko'rsatkich) texnikasi qanday ishlaydi?",
      options: [
        "O'zgaruvchilarni uchinchi o'zgaruvchisiz almashtiradi",
        "Massiv bo'ylab qarama-qarshi tomonlardan (yoki har xil tezlikda) ikkita ko'rsatkichni harakatlantirib, elementlarni bir marta aylanib chiqish (O(N)) orqali muammoni yechadi",
        "Ikkita massivni birlashtiradi",
        "Faqat binary search algoritmini o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "Ikki ko'rsatkich texnikasi massivni ikki tomondan aylanib chiqib, yig'indilarni tekshirish kabi masalalarda vaqtni O(N^2) dan O(N) ga qisqartiradi."
    },
    {
      id: 10,
      question: "Massivda 'In-Place' amal bajarish deganda nimani tushunasiz?",
      options: [
        "Amalni faqat serverda bajarish",
        "Qo'shimcha yangi massiv yaratmasdan, berilgan massivning o'zini o'zgartirib yechimga erishish (Space complexity: O(1))",
        "Massivni shunchaki nusxalash",
        "Faqat massiv boshiga element qo'shish"
      ],
      correctAnswer: 1,
      explanation: "In-place amallar qo'shimcha xotira sarfini talab qilmaydi, barcha o'zgartirishlar kiruvchi massiv ustida amalga oshiriladi."
    },
    {
      id: 11,
      question: "JS-da `new Array(100)` yaratishning afzalligi nimada?",
      options: [
        "Dasturni xavfsiz qiladi",
        "Orqa fonda xotiradan 100 ta element uchun oldindan joy bron qilib, dinamik kattalashish (resizing) xarajatlarini oldini oladi",
        "Bu massivni o'chirib yuboradi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Massiv hajmini oldindan belgilash xotirada resizing qilish ehtiyojini kamaytiradi va unumdorlikni oshiradi."
    },
    {
      id: 12,
      question: "Massiv oxiriga element qo'shish (`push`) va boshiga element qo'shish (`unshift`) farqi haqida qaysi mulohaza to'g'ri?",
      options: [
        "Ikkalasi ham bir xil O(1) vaqt oladi",
        "Push O(1) amortizatsiyalangan vaqt olsa, unshift O(N) chiziqli vaqt oladi, chunki unshift hamma elementlarni surib chiqadi",
        "Unshift tezroq ishlaydi",
        "Push elementlarni o'ngga suradi"
      ],
      correctAnswer: 1,
      explanation: "Push massiv oxiriga joylashtirgani uchun surishni talab qilmaydi (O(1)). Unshift esa 0-indeksni bo'shatish uchun barcha elementlarni xotirada surib chiqadi (O(N))."
    }
  ]
};
