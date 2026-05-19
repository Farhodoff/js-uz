export const debugging = {
  id: "a7",
  title: "Debugging - Xatolarni ovlash san'ati",
  theory: `## 1. NEGA VA NIMA?
Dasturchi vaqtining 70% qismi kod yozishga emas, balki yozilgan koddagi xatolarni topishga (ovlashga) ketadi. **Debugging** — bu dasturdagi "bug" (qo'ng'iz) larni aniqlash va ularni yo'qotish jarayonidir.

Dastur ishlamay qolsa asabiylashmang, bu yangi narsa o'rganish uchun imkoniyat!

---

## 2. CONSOLE METODLARI (Tushuntir → Ko'rsat → Bajartir)
Faqat \`console.log\` bilan cheklanib qolmang. JSda boshqa foydali qurollar ham bor.

**Ko'rsat:**
\`\`\`javascript
const user = { id: 1, name: "Ali", role: "admin" };
console.table(user); // Ma'lumotni chiroyli jadval qilib chiqaradi
console.error("Bu xato xabari!");
console.warn("Bu ogohlantirish!");
\`\`\`

**Mashq:** O'zingiz yoqtirgan 3 ta kitob obyekti bor massiv yarating va uni \`console.table\` orqali chiqaring.

---

## 3. DEBUGGER KALIT SO'ZI
Kodning istalgan joyiga \`debugger;\` deb yozsangiz, brauzer o'sha nuqtada kodni to'xtatadi. Siz o'sha paytdagi o'zgaruvchilar qiymatini qadam-baqadam tekshirishingiz mumkin.

**Ko'rsat:**
\`\`\`javascript
function hisobla(a, b) {
  let natija = a + b;
  debugger; // Brauzer shu yerda "pauza" qiladi
  return natija;
}
\`\`\`

---

## 4. KO'P UCHRAYDIGAN XATOLAR ⚠️
1.  **Syntax Error:** Qavs yoki nuqtali vergulni unutish. Kod umuman ishlamaydi.
2.  **Reference Error:** Mavjud bo'lmagan o'zgaruvchini ishlatishga urinish.
3.  **Logic Error:** Kod ishlaydi, lekin natija siz kutgandek emas (Eng xavflisi!).

---

## 5. BUZIB KO'RISH 🧐
**Nima bo'ladi agar \`console.log\` ichida bajariladigan funksiya yozsak?**
\`\`\`javascript
console.log("Natija:", (function() { return 5 + 5 })());
\`\`\`
**Xulosa:** Log ichida ham kod bajarilishi mumkin, lekin bu debuggingni qiyinlashtirishi mumkin.

---

## 6. TOP 12: INTERVYU SAVOLLARI VA AMALIYOT (Junior/Middle) 🎯

1. **"Bug" so'zi qayerdan kelgan? (Junior)**
   *Javob:* 1947-yilda kompyuter ichiga haqiqiy kuya (bug) kirib qolib, tizimni to'xtatib qo'yganidan keyin ishlatila boshlangan.

2. **Console.time() va Console.timeEnd() nima uchun? (Junior - Amaliy)**
   *Vazifa:* Kod necha millisekundda bajarilishini o'lchang.

3. **Breakpoint nima? (Junior)**
   *Javob:* Brauzer DevTools'da kodni to'xtatish uchun qo'yiladigan "to'xtash nuqtasi".

4. **Watch (Kuzatuv) oynasi nima? (Middle)**
   *Javob:* Debugging paytida ma'lum o'zgaruvchilarni doimiy nazorat qilib turish oynasi.

5. **Call Stack nima? (Middle)**
   *Javob:* Funksiyalar bir-birini qaysi tartibda chaqirganini ko'rsatuvchi iyerarxiya.

6. **Conditional Breakpoint nima? (Middle)**
   *Javob:* Faqat ma'lum bir shart bajarilgandagina to'xtaydigan breakpoint.

7. **Console.trace() nima qiladi? (Middle - Amaliy)**
   *Vazifa:* Funksiya qayerdan chaqirilganini zanjir ko'rinishida chiqaring.

8. **Runtime va Compile-time xatosi farqi? (Junior)**
   *Javob:* Compile-time kod o'qilayotganda, Runtime kod ishlayotgan paytda chiqadi.

9. **Try...Catch debugging uchun foydalimi? (Junior)**
   *Javob:* Ha, xatoni ushlash va dastur o'chib qolmasligini ta'minlash uchun.

10. **Network tabida nimalarni debug qilish mumkin? (Junior)**
    *Javob:* API so'rovlar, ularning tezligi va kelayotgan javoblarni.

11. **Memory leak (Xotira sizishi) nima? (Middle)**
    *Javob:* Ishlatilmayotgan o'zgaruvchilar xotirada qolib ketishi va kompyuterni sekinlashtirishi.

12. **Mantiqiy xatoni qanday topish mumkin? (Middle - Amaliy)**
    *Vazifa:* Noto'g'ri hisoblayotgan funksiyaga \`debugger\` qo'yib, har bir qadamni tekshiring.

---

## 7. CHALLENGE 🏆
Quyidagi kodda mantiqiy xato bor. Funksiya massivdagi eng katta sonni topishi kerak, lekin u manfiy sonlar bilan ishlamayapti. Debugger yordamida xatoni toping va tuzating.
\`\`\`javascript
function findMax(arr) {
  let max = 0; 
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > max) max = arr[i];
  }
  return max;
}
console.log(findMax([-10, -5, -2])); // 0 chiqmoqda, aslida -2 chiqishi kerak!
\`\`\`

---

## 8. XULOSA
Endi siz xatolardan qo'rqmaysiz va ularni professional dasturchidek "ovlay" olasiz!
`,
  exercises: [
    {
      id: 1,
      title: "Console Table",
      instruction: "Obyektni jadval ko'rinishida chiqaring.",
      startingCode: "const car = { model: 'Tesla', year: 2023 };\n// Bu yerda console.table ishlating\n",
      hint: "console.table(car);",
      test: "if (code.includes('console.table')) return null; return 'console.table ishlatilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log` metodidan tashqari, murakkab obyektlar va massivlarni chiroyli hamda o'qilishi oson bo'lgan jadval ko'rinishida consolega chiqarish uchun qaysi metoddan foydalaniladi?",
      options: [
        "`console.dir()`",
        "`console.table()`",
        "`console.group()`",
        "`console.trace()`"
      ],
      correctAnswer: 1,
      explanation: "`console.table()` metodi uzatilgan obyekt yoki massivni jadval (index, key, value) shaklida render qiladi. Bu katta ma'lumotlar bilan ishlashda va ularni solishtirishda juda qulay."
    },
    {
      id: 2,
      question: "Brauzerda JavaScript kodini bajarilishini ma'lum bir qatorda to'xtatib (pauza qilib), o'sha joydagi o'zgaruvchilar qiymatini va call stack holatini DevTools yordamida qadam-baqadam tekshirish uchun kodga qaysi maxsus kalit so'z yoziladi?",
      options: [
        "`stop;`",
        "`break;`",
        "`debugger;`",
        "`pause;`"
      ],
      correctAnswer: 2,
      explanation: "`debugger;` kalit so'zi brauzer uchun dasturni to'xtatish (breakpoint) buyrug'i hisoblanadi. Agar brauzerda DevTools (inspektor) oynasi ochiq bo'lsa, kod aynan shu qatorda to'xtaydi va dasturchiga har bir qadamni kuzatish imkonini beradi."
    },
    {
      id: 3,
      question: "Kodning ma'lum bir qismi (masalan, murakkab loop yoki API so'rovi) qancha vaqt ichida bajarilishini millisekundlarda aniq o'lchash uchun qaysi console metodlari juftligidan foydalaniladi?",
      options: [
        "`console.start()` va `console.stop()`",
        "`console.time()` va `console.timeEnd()`",
        "`console.profile()` va `console.profileEnd()`",
        "`console.count()` va `console.countReset()`"
      ],
      correctAnswer: 1,
      explanation: "`console.time('label')` taymerni ishga tushiradi, `console.timeEnd('label')` esa taymerni to'xtatadi va uning orasidagi vaqtni millisekundlarda chop etadi. Bu performance (samaradorlik) testlari uchun ishlatiladi."
    },
    {
      id: 4,
      question: "Dasturdagi funksiyalar bir-birini qaysi tartibda va qaysi fayllardan chaqirib kelganini (Call Stack iyerarxiyasini) konsolda to'liq ko'rish uchun qaysi metod chaqiriladi?",
      options: [
        "`console.stack()`",
        "`console.trace()`",
        "`console.debug()`",
        "`console.log(Error.stack)`"
      ],
      correctAnswer: 1,
      explanation: "`console.trace()` funksiya qayerda va qaysi funksiyalar orqali chaqirilganligini ko'rsatadigan stack trace (izlar zanjiri)ni konsolda ko'rsatib beradi."
    },
    {
      id: 5,
      question: "Brauzer DevTools'dagi \"Conditional Breakpoint\" (Shartli to'xtash nuqtasi) oddiy Breakpoint'dan nimasi bilan farq qiladi?",
      options: [
        "U faqat internet uzilib qolsagina ishlaydi",
        "U kodni faqat biz yozgan ma'lum bir shart (ifoda) `true` bo'lgandagina o'sha qatorda to'xtatadi, boshqa hollarda kod to'xtamasdan o'tib ketadi",
        "U faqat asinxron funksiyalar ichida ishlaydi",
        "U faqat CSS stillarining xatolarini aniqlaydi"
      ],
      correctAnswer: 1,
      explanation: "Shartli breakpointlar juda ko'p marta aylanadigan looplarda yoki ma'lum bir foydalanuvchi IDsi bilan muammo chiqqanda qo'l keladi. Masalan, `user.id === 42` bo'lgandagina kodni to'xtatish shartini qo'yishimiz mumkin."
    }
  ]
};
