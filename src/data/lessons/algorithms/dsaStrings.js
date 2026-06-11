export const dsaStrings = {
  id: "dsaStrings",
  title: "Satrlar va Matnlar (DSA String Manipulations)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

Satrlar (Strings) - bu kompyuter xotirasida matnli ma'lumotlarni ifodalash uchun ishlatiladigan belgilar ketma-ketligidir. Har bir belgi orqa fonda ma'lum bir songa (kodga) to'g'ri keladi.

### Kitob harflari analogiyasi:
- **Satrlar (Strings):** Xuddi sahifaga siyoh bilan yozilgan so'zlar kabi. Ularni to'g'ridan-to'g'ri o'chirib, o'rniga boshqa harf yozib bo'lmaydi (**Immutable / O'zgarmas**). Agar siz so'zning birgina harfini o'zgartirmoqchi bo'lsangiz, yangi sahifa olib, butun so'zni qaytadan yozishingiz kerak.
- **ASCII va Unicode:** Bu har bir harf uchun belgilangan xalqaro raqamlar katalogidir. Masalan, 'A' harfi kompyuter tushunadigan tilda 65 sonini anglatadi.

---

## 2. 💻 Real Kod Misollari

Javaskriptda satrlar ustida amallar va ularning xotiradagi xatti-harakati:

\`\`\`javascript
// 1. Immutability (O'zgarmaslik) isboti
let str = "Salom";
str[0] = "X"; // Bu xatolik bermaydi, lekin matn baribir o'zgarmaydi!
console.log(str); // "Salom"

// 2. Anagrammani aniqlash (Ikki so'z bir xil harflardan tashkil topganini tekshirish)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Belgilar kodlanishi (Character Encoding):
Kompyuter faqat sonlar bilan ishlaydi. Shuning uchun har bir belgi xotirada ma'lum bir son sifatida saqlanadi:
- **ASCII:** 7-bitli kodlash tizimi bo'lib, jami 128 ta belgini (asosan ingliz alifbosi va belgilarini) ifodalaydi.
- **Unicode (UTF-8/UTF-16):** Butun dunyo tillari (jumladan o'zbek tili, emoji va iyerogliflar)ni ifodalay oladigan universal kodlash tizimi. JS stringlari UTF-16 kodlashidan foydalanadi (har bir belgi uchun 2 bayt ajratiladi).
- **Satrlar xotiradagi o'zgarmasligi (Immutability):** JS-da stringlar yaratilgach, ularning xotiradagi block qiymati o'zgarmaydi. Satrlar ustidagi har qanday manipulyatsiya (masalan, \`split\`, \`concat\`, \`replace\`) orqa fonda yangi string obyekti yaratadi va yangi xotira blockini band qiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Sikl ichida satrlarni oddiy string concatenation (+) yordamida qo'shish
Sikl ichida stringga tez-tez belgi qo'shish har safar yangi string yaratilishiga olib keladi. Bu vaqt murakkabligini $O(N^2)$ ga chiqarib yuboradi!
* **Xato (Sekin O(N^2)):**
  \`\`\`javascript
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "a"; // Har iteratsiyada yangi string obyekti yaratiladi va ko'chiriladi
  }
  \`\`\`
* **Tuzatish (Tezkor O(N)):**
  Belgilarni massivga yig'ib, oxirida bitta qilib birlashtirish:
  \`\`\`javascript
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push("a");
  }
  let result = arr.join(""); // O(N) vaqt oladi
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **String (Satr) nima?**
   * *Javob:* Belgilardan iborat bo'lgan va xotirada ketma-ket joylashgan o'zgarmas ma'lumotlar tuzilmasi.
2. **String immutability (satr o'zgarmasligi) nima degani?**
   * *Javob:* Yaratilgan satr qiymatini xotirada to'g'ridan-to'g'ri o'zgartirib bo'lmasligi. Har qanday o'zgartirish yangi satr yaratadi.
3. **ASCII va Unicode farqi nimada?**
   * *Javob:* ASCII faqat 128 ta inglizcha belgilarni qo'llaydi, Unicode esa butun dunyo yozuvlari va belgilarini (jumladan emojilarni) qamrab oladi.
4. **JS-da satrning birinchi belgisini \`str[0] = 'X'\` deb o'zgartirmoqchi bo'lsak nima bo'ladi?**
   * *Javob:* JS xatolik tashlamaydi (strict mode bo'lmasa), lekin satr baribir o'zgarmasdan o'z holicha qoladi.
5. **Sikl ichida \`str += char\` yozish nega samarasiz?**
   * *Javob:* Har safar matn nusxalanib, xotirada yangi string obyekti yaratilgani sababli vaqt murakkabligi O(N^2) bo'lib ketadi.
6. **Matnning anagramma (Anagram) ekanligini qanday tekshirish mumkin?**
   * *Javob:* Ikki satrni ham harflarga bo'lib, saralab, qayta birlashtirib, bir-biriga solishtirish orqali.
7. **Palindrome satr nima?**
   * *Javob:* Chapdan o'qisa ham, o'ngdan o'qisa ham bir xil o'qiladigan matn (masalan, "kiyik").
8. **JS stringining \`.length\` xossasi nimani o'lchaydi?**
   * *Javob:* Satrdagi UTF-16 kod birliklari (code units) sonini qaytaradi (ba'zi murakkab emojilar length=2 qaytarishi mumkin).
9. **Satrni teskari (reverse) qilishning eng samarali usuli qanday?**
   * *Javob:* Satrni massivga bo'lib (\`split\`), massivni teskari qilib (\`reverse\`) va qayta birlashtirish (\`join\`).
10. **\`String.prototype.charAt(index)\` va \`str[index]\` farqi nimada?**
    * *Javob:* Agar berilgan indeks massiv doirasidan tashqarida bo'lsa, \`charAt\` bo'sh string \`""\` qaytaradi, \`str[index]\` esa \`undefined\` qaytaradi.
11. **Substring (qism-satr) qidirishning eng oddiy algoritmi qanday vaqt oladi?**
    * *Javob:* Brute-force usulida matndan qism-satr qidirish eng yomon holatda O(N * M) vaqt oladi (bu yerda N - matn uzunligi, M - qidirilayotgan satr).
12. **Nima uchun satrlar bilan ishlashda massivlar (Arrays) yordamchi vosita bo'ladi?**
    * *Javob:* Massivlar mutable (o'zgaruvchan) bo'lgani sababli, satrlar ustidagi ko'p amallarni avval massivga o'tkazib bajarib, keyin satrga qaytarish samaraliroq.

---

## 6. 🎨 Interaktiv Vizual

### Belgilarning Xotirada Unicode Raqamlari Bilan Saqlanishi
"Salom" so'zining xotiradagi ko'rinishi:

\`\`\`mermaid
graph LR
    s1["'S'<br>Unicode: 83"]
    s2["'a'<br>Unicode: 97"]
    s3["'l'<br>Unicode: 108"]
    s4["'o'<br>Unicode: 111"]
    s5["'m'<br>Unicode: 109"]
    s1 --> s2 --> s3 --> s4 --> s5
    style s1 fill:#d6eaf8,stroke:#2e86c1,stroke-width:2px
    style s2 fill:#d6eaf8,stroke:#2e86c1,stroke-width:2px
    style s3 fill:#d6eaf8,stroke:#2e86c1,stroke-width:2px
    style s4 fill:#d6eaf8,stroke:#2e86c1,stroke-width:2px
    style s5 fill:#d6eaf8,stroke:#2e86c1,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Mashqlarni bajarib bilimlaringizni sinang.

---

## 8. 📝 12 ta Mini Test

Mini test yordamida o'tilgan darsni tekshiring.

---

## 9. 🚀 Performance va Optimization

- **String Builder pattern:** Katta hajmli satrlarni yig'ishda massivlarga push qilib oxirida \`join\` metodini ishlating.
- **RegEx unumdorligi:** Satrlarni tozalash yoki tekshirishda murakkab Regular Expressionlardan ko'p foydalanish dastur tezligini sezilarli pasaytiradi. Oddiy shartlardan ko'proq foydalaning.

---

## 10. 📌 Cheat Sheet

| Amallar | Vaqt murakkabligi (Time Complexity) | Izoh |
| :--- | :--- | :--- |
| **Access (belgini indeks bo'yicha olish)** | O(1) | O'ta tezkor |
| **Concatenation (+)** | O(N + M) | Yangi xotira ajratiladi |
| **Substring search (Brute force)** | O(N * M) | Oddiy qidiruv |
| **Substring search (KMP / Boyer-Moore)** | O(N + M) | Optimallashtirilgan qidiruv |
`,
  exercises: [
    {
      id: 1,
      title: "Valid Anagram (Anagrammani Tekshirish)",
      instruction: "Berilgan ikki satr `s` va `t` bir-birining anagrammasi ekanini tekshiruvchi `isAnagram(s, t)` funksiyasini yozing (ya'ni, bir xil harflardan faqat boshqacha tartibda tuzilgan bo'lishi kerak). Agar anagramma bo'lsa `true`, bo'lmasa `false` qaytaring. Harflar registri (katta-kichikligi) hisobga olinsin.",
      startingCode: "function isAnagram(s, t) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ikkala satrni ham harflarga ajratib (`split`), saralab (`sort`) va yana birlashtirib (`join`) solishtiring.",
      test: "const sandbox = new Function(code + '; return isAnagram;'); const fn = sandbox(); if (fn('anagram', 'nagaram') === true && fn('rat', 'car') === false) return null; return 'Anagramma tekshirish funksiyasi xato ishladi';"
    },
    {
      id: 2,
      title: "Palindrome Tekshiruvchi (Faqat Harf va Sonlar)",
      instruction: "Berilgan satr palindrome ekanini tekshiradigan `isPalindromeClean(str)` funksiyasini yozing. Matndagi barcha harf va son bo'lmagan belgilarni (bo'shliqlar, tinish belgilari) hisobga olmang va harflar registrini (katta-kichik) e'tiborsiz qoldiring. Masalan: `'A man, a plan, a canal: Panama'` -> `true`.",
      startingCode: "function isPalindromeClean(str) {\n  // Kodni shu yerda yozing\n}",
      hint: "Regex `/[^a-zA-Z0-9]/g` yordamida ortiqcha belgilarni olib tashlang va hammasini toLowerCase qilib, ikki ko'rsatkich yordamida tekshiring.",
      test: "const sandbox = new Function(code + '; return isPalindromeClean;'); const fn = sandbox(); if (fn('A man, a plan, a canal: Panama') === true && fn('race a car') === false) return null; return 'Palindrome to\\'g\\'ri aniqlanmadi';"
    },
    {
      id: 3,
      title: "Satrni Siqish (String Compression)",
      instruction: "Belgilarning takrorlanish soniga asoslangan oddiy siqish algoritmini amalga oshiruvchi `compressString(str)` funksiyasini yozing. Masalan, `'aabcccccaaa'` berilsa, `'a2b1c5a3'` qaytarishi kerak. Agar siqilgan satr uzunligi asl satrdan qisqa bo'lmasa, asl satrning o'zi qaytarilsin.",
      startingCode: "function compressString(str) {\n  // Kodni shu yerda yozing\n}",
      hint: "Sikl orqali belgilar takrorlanishini hisoblang, har safar belgi o'zgarganda natijaga qo'shib boring. Oxirida uzunliklarni solishtiring.",
      test: "const sandbox = new Function(code + '; return compressString;'); const fn = sandbox(); if (fn('aabcccccaaa') === 'a2b1c5a3' && fn('abcd') === 'abcd') return null; return 'Satr siqish algoritmi xato natija qaytardi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da satrlarning o'zgarmasligi (Immutability) nimani anglatadi?",
      options: [
        "Satrdagi belgilarni hech qachon o'qib bo'lmasligini",
        "Satr yaratilgandan so'ng uning xotiradagi qiymatini o'zgartirib bo'lmasligini. Har qanday o'zgartirish yangi satr yaratadi",
        "Satrlarning faqat raqamlardan iborat bo'lishini",
        "Satrlarni o'zgaruvchilarga qayta biriktirib bo'lmasligini"
      ],
      correctAnswer: 1,
      explanation: "JS-da satrlar immutable hisoblanadi. Ya'ni xotiradagi string ma'lumoti o'zgartirilmaydi, har qanday o'zgartirish yangi string yaratilishiga sabab bo'ladi."
    },
    {
      id: 2,
      question: "ASCII kodlash tizimi jami nechta belgini ifodalay oladi?",
      options: [
        "256 ta",
        "128 ta",
        "65536 ta",
        "Cheksiz"
      ],
      correctAnswer: 1,
      explanation: "Standart ASCII kodlash tizimi 7-bitli bo'lib, jami 128 ta asosiy inglizcha belgi, raqam va boshqaruv belgilarini qamrab oladi."
    },
    {
      id: 3,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nlet s = 'abc';\ns[1] = 'x';\nconsole.log(s);\n```",
      options: [
        "'axc'",
        "'abc'",
        "TypeError",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Satr o'zgarmas bo'lganligi uchun uning indeksiga qiymat biriktirish (`s[1] = 'x'`) satrni o'zgartirmaydi va s o'zining 'abc' qiymatida qolaveradi."
    },
    {
      id: 4,
      question: "Sikl ichida stringga tez-tez belgi qo'shish (`str += char`) nega tavsiya etilmaydi?",
      options: [
        "Chunki satrlar xotirada joy egallamaydi",
        "Chunki har safar yangi string obyekti yaratilib, ma'lumotlar ko'chirilishi sababli vaqt murakkabligi O(N^2) bo'lib ketadi",
        "Chunki JS buni avtomatik to'xtatadi",
        "Hech qanday salbiy ta'siri yo'q"
      ],
      correctAnswer: 1,
      explanation: "String immutable bo'lgani sababli har safar `+=` ishlatilganda yangi string yaratilib eskisi ko'chiriladi. Bu esa chiziqli vaqt o'rniga kvadratik O(N^2) vaqt sarflanishiga olib keladi."
    },
    {
      id: 5,
      question: "Anagramma (Anagram) nima?",
      options: [
        "O'ngdan va chapdan bir xil o'qiladigan matn",
        "Bir xil harflardan tashkil topgan, lekin har xil tartibda yozilgan so'zlar zanjiri",
        "Faqat katta harflardan iborat satr",
        "Shifrlangan maxfiy matn"
      ],
      correctAnswer: 1,
      explanation: "Agar ikki so'zdagi harflar soni va tarkibi mutlaqo bir xil bo'lib, faqat tartibi boshqacha bo'lsa, ular bir-biriga anagramma deyiladi (masalan, 'silent' va 'listen')."
    },
    {
      id: 6,
      question: "Palindrome so'zga to'g'ri misolni tanlang.",
      options: [
        "'hello'",
        "'kiyik'",
        "'anagram'",
        "'comput'"
      ],
      correctAnswer: 1,
      explanation: "'kiyik' so'zi teskari o'qilganda ham 'kiyik' bo'lib qoladi, shuning uchun u palindrome so'zdir."
    },
    {
      id: 7,
      question: "Unicode UTF-16 kodlash tizimida har bir standart belgi uchun xotiradan qancha joy ajratiladi?",
      options: [
        "1 bit",
        "1 bayt (8 bit)",
        "2 bayt (16 bit)",
        "8 bayt"
      ],
      correctAnswer: 2,
      explanation: "UTF-16 kodlash tizimida har bir standart belgi uchun 2 bayt (16 bit) joy ajratiladi. Ba'zi kamdan-kam ishlatiladigan belgilar 4 bayt olishi ham mumkin."
    },
    {
      id: 8,
      question: "Matnni teskari (reverse) qilishda qaysi yondashuv JS-da eng keng tarqalgan?",
      options: [
        "Sikl yordamida barcha harflarni alohida ayirib chiqish",
        "Satrni massivga ajratish, massivni reverse qilish va yana satrga birlashtirish (`str.split('').reverse().join('')`)",
        "Hech qanday yondashuv yo'q, satrni reverse qilib bo'lmaydi",
        "`String.reverse()` metodini to'g'ridan-to'g'ri chaqirish"
      ],
      correctAnswer: 1,
      explanation: "JS String obyektida to'g'ridan-to'g'ri `.reverse()` metodi mavjud emas. Shuning uchun uni massivga o'tkazib, keyin reverse qilinadi."
    },
    {
      id: 9,
      question: "Agar `str` o'zgaruvchisining uzunligi 5 bo'lsa, `str[10]` qiymati nima bo'ladi?",
      options: [
        "Bo'sh string `\"\"`",
        "undefined",
        "TypeError xatoligi",
        "null"
      ],
      correctAnswer: 1,
      explanation: "JS-da massiv chegarasidan yoki satr uzunligidan tashqaridagi indeksga murojaat qilinsa, u har doim `undefined` qaytaradi."
    },
    {
      id: 10,
      question: "Matndan qism-satr (substring) qidirishning eng sodda (brute-force) algoritmi vaqt murakkabligi qanday?",
      options: [
        "O(1)",
        "O(N + M)",
        "O(N * M)",
        "O(N^2)"
      ],
      correctAnswer: 2,
      explanation: "Eng oddiy holatda matndagi har bir indeksdan boshlab qidirilayotgan satrni solishtirib chiqamiz, bu esa eng yomon holatda O(N * M) vaqt oladi."
    },
    {
      id: 11,
      question: "String unumdorligini oshirish uchun qaysi ma'lumot tuzilmasi yordamchi bo'ladi?",
      options: [
        "Set (To'plam)",
        "Array (Massiv)",
        "Linked List",
        "Stack"
      ],
      correctAnswer: 1,
      explanation: "Massivlar mutable (o'zgaruvchan) bo'lgani uchun, belgilar ustidagi amallarni massivda bajarib, oxirida stringga o'tkazish xotira sarfini keskin kamaytiradi."
    },
    {
      id: 12,
      question: "Quyidagi kodning vaqt murakkabligi qanday?\n```javascript\nlet s = 'hello';\nlet exists = s.includes('e');\n```",
      options: [
        "O(1)",
        "O(N)",
        "O(N^2)",
        "O(log N)"
      ],
      correctAnswer: 1,
      explanation: "`.includes()` metodi satr boshidan oxirigacha belgini qidirib chiqadi. Eng yomon holatda belgi oxirida bo'lsa yoki umuman bo'lmasa, satr to'liq aylaniladi, ya'ni O(N) chiziqli vaqt oladi."
    }
  ]
};
