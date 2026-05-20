export const globalScopeLesson = {
  id: "global-scope",
  title: "Global Scope (Global doira)",
  theory: `## Global Scope – JavaScriptning eng tashqi darajasi

**Global Scope** (Umumiy doira) — bu JavaScript kodining eng tashqi qismidir. Bu yerda e'lon qilingan o'zgaruvchilar va funksiyalar dasturning istalgan joyidan (xohlagan funksiya yoki blok ichidan) ko'rinadi.

## 1. NEGA kerak?
Ba'zan bizga butun dastur davomida kerak bo'ladigan ma'lumotlar zarur bo'ladi. Masalan, foydalanuvchining tanlagan tili yoki dastur versiyasi. Bunday ma'lumotlarni globalda saqlash qulay.

## 2. SODDALIK (Analogiya)
Global doirani **shahar maydoni** deb tasavvur qiling. Maydon o'rtasida turgan soatni (global o'zgaruvchini) shahardagi barcha odamlar (hamma funksiyalar) ko'ra oladi. Local scope esa — uyingiz ichidagi soat, uni faqat uydagilar ko'radi.

## 3. STRUKTURA

### A. Global o'zgaruvchi yaratish
Hech qanday funksiya yoki blok ichida bo'lmagan o'zgaruvchi global hisoblanadi:
\`\`\`javascript
let til = "O'zbekcha"; // Global

function salomBer() {
  console.log("Til: " + til); // Global o'zgaruvchini funksiya ichida ishlatish ✅
}
salomBer();
\`\`\`

### B. Global Obyekt (window)
Brauzerda barcha global narsalar \`window\` obyektining ichida bo'ladi:
\`\`\`javascript
var ism = "Farhod";
console.log(window.ism); // "Farhod"
\`\`\`
*(Eslatma: let va const bilan yaratilgan global o'zgaruvchilar window'ga qo'shilmaydi).*

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let x = 10; // Global

function o'zgartir() {
  x = 20; // Global o'zgaruvchini funksiya ichida yangilash
}
o'zgartir();
console.log(x); // 20
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Global ifloslanish (Global Pollution):** Juda ko'p global o'zgaruvchi yaratmang! Agar ikki xil faylda bir xil nomli global o'zgaruvchi bo'lsa, ular bir-birini buzib qo'yadi.
2. **E'lonsiz o'zgaruvchi:** Funksiya ichida \`let/const\` yozishni unutsangiz (\`y = 5\`), JS uni avtomatik global qilib yuboradi. Bu juda yomon odat!

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Global Scope nima?**
Global Scope (global doira) — bu JavaScript kodining eng tashqi qismi bo'lib, bu yerda e'lon qilingan o'zgaruvchilar va funksiyalar dasturning istalgan joyidan foydalanish uchun ochiq bo'ladi.


**2. Qayerda e'lon qilingan o'zgaruvchilar global hisoblanadi?**
Hech qanday funksiya yoki blok (\`{ }\`) ichida bo'lmagan, kodning eng yuqori qismida e'lon qilingan o'zgaruvchilar global hisoblanadi.


**3. Global o'zgaruvchini funksiya ichida ishlatsa bo'ladimi?**
Ha, global o'zgaruvchini kodning istalgan joyida, jumladan har qanday funksiya yoki blok ichida bemalol ishlatish va o'zgartirish mumkin.


**4. window obyekti nima?**
\`window\` — brauzer muhitidagi global obyekt bo'lib, u brauzer oynasini ifodalaydi va barcha global o'zgaruvchilar hamda brauzer API'larini (masalan, \`window.alert\`) o'z ichiga oladi.


**5. Nima uchun global o'zgaruvchilar xavfli bo'lishi mumkin?**
Chunki dasturning istalgan joyi ularni o'zgartirishi mumkin, bu esa kutilmagan xatoliklarga (side-effects) va turli kodlar orasida nomlar to'qnashuviga olib keladi.


**6. let va var global e'lon qilinganda nima farqi bor?**
Global e'lon qilingan \`var\` o'zgaruvchisi global \`window\` obyektining xususiyatiga aylanadi (\`window.x\`), lekin \`let\` (va \`const\`) global obyektga qo'shilmaydi.


**7. "Global Namespace Pollution" nima degani?**
Global Namespace Pollution (Global doiraning ifloslanishi) — global sohada keragidan ortiq o'zgaruvchilarning to'planishi va bu sababli nomlar to'qnashuvi ehtimolining ortishidir.


**8. Funksiya ichida let ishlatmasdan o'zgaruvchi yaratsak nima bo'ladi?**
Strict mode bo'lmagan holatlarda, kalit so'zsiz yaratilgan o'zgaruvchi (\`x = 10\`) avtomatik ravishda global doiraga qo'shiladi va xavfli hisoblanadi.


**9. Global o'zgaruvchini qachon ishlatish tavsiya etiladi?**
Faqat butun loyiha bo'ylab o'zgarmas umumiy konfiguratsiyalar (masalan, API manzili, dasturning versiyasi yoki sozlamalari) uchun ishlatish tavsiya etiladi.


**10. Global doira faqat brauzerdami yoki Node.js'da ham bormi?**
Ikkala muhitda ham bor. Brauzerda global obyekt \`window\`, Node.js'da esa \`global\` deb ataladi.


**11. globalThis nima uchun kerak?**
\`globalThis\` — har qanday JavaScript ishlaydigan muhitda (brauzer, Node.js, Web Worker) global obyektga murojaat qilishning yagona va universal standart usulidir.


**12. Qanday qilib global o'zgaruvchilar sonini kamaytirish mumkin?**
O'zgaruvchilarni funksiyalar yoki bloklar ichida cheklash (local/block scope), modullardan (ES Modules) foydalanish va ma'lumotlarni bitta global obyekt ichiga guruhlash orqali kamaytirish mumkin.
`,
  exercises: [
    {
      id: 1,
      title: "Global mashqi",
      instruction: "Global o'zgaruvchi yarating va uni funksiya ichida 1 ga oshiring.",
      startingCode: "let count = 0;\nfunction inc() {\n  // Bu yerda countni oshiring\n}\ninc();",
      hint: "count++;",
      test: "if (count === 1) return null; return 'O\\'zgaruvchi oshmadi!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da global scope (global doira) deb qaysi doiraga aytiladi?",
      options: [
        "Faqat `if` sharti bajariladigan blokka",
        "Kodning eng tashqi qismi bo'lib, unda e'lon qilingan o'zgaruvchi va funksiyalar dasturning istalgan joyidan ko'rinadi",
        "Faqat server muhiti (Node.js)dagi maxsus doiraga",
        "Faqat HTML fayliga bog'langan qismga"
      ],
      correctAnswer: 1,
      explanation: "Global doira bu kodning eng yuqori, tashqi qavatidir. Undagi ma'lumotlar local (funksiya yoki blok) scopelar uchun ochiq hisoblanadi."
    },
    {
      id: 2,
      question: "Brauzer muhitida global doirada `var` yordamida yaratilgan o'zgaruvchi qaysi global obyektning xususiyatiga (property) aylanadi?",
      options: [
        "`document`",
        "`window` (masalan: `var x = 5` yaratilsa, unga `window.x` orqali murojaat qilish mumkin)",
        "`console`",
        "`globalThis` faqat Node.js-da"
      ],
      correctAnswer: 1,
      explanation: "Brauzerlarda global ob'ekt `window` hisoblanadi. Global doiradagi har qanday `var` o'zgaruvchisi avtomatik tarzda `window` obyektining xususiyatiga aylanadi."
    },
    {
      id: 3,
      question: "Global doirada `let` yoki `const` yordamida yaratilgan o'zgaruvchilarning `var` dan eng katta farqi nimada?",
      options: [
        "Ular global doiradan ko'rinmaydi",
        "Ular brauzerning global `window` obyektiga xususiyat bo'lib qo'shilmaydi",
        "Ularning qiymatini o'zgartirib bo'lmaydi",
        "Ular xotirani band qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` global doirada e'lon qilinsa ham, ular xavfsizlik va yangi standart qoidalariga ko'ra `window` obyektiga xususiyat sifatida biriktirilmaydi."
    },
    {
      id: 4,
      question: "Nima uchun JavaScript-da global doiradagi o'zgaruvchilardan imkon qadar kamroq foydalanish tavsiya etiladi?",
      options: [
        "Chunki global o'zgaruvchilar dasturni sekinlashtiradi",
        "Chunki turli fayllarda yoki kutubxonalarda bir xil nomli o'zgaruvchilar bir-birining qiymatini kutilmaganda o'zgartirib yuborishi (global pollution/ifloslanish) mumkin",
        "Ular hech qachon xotiradan o'chmaydi",
        "To'g'ri javob: ham global ifloslanish xavfi, ham ular dastur ishlayotgan vaqt davomida xotirada saqlanib qolishi sababli"
      ],
      correctAnswer: 3,
      explanation: "Global o'zgaruvchilar butun dastur faoliyati davomida xotirani egallab turadi hamda koddagi nomlar to'qnashuvi xavfini (name collision) sezilarli darajada oshiradi."
    },
    {
      id: 5,
      question: "Brauzerda ham, Node.js-da ham universal tarzda global obyektga murojaat qilish uchun ES2020 standartida qaysi kalit so'z kiritildi?",
      options: [
        "`window`",
        "`global`",
        "`globalThis`",
        "`root`"
      ],
      correctAnswer: 2,
      explanation: "`globalThis` kalit so'zi JavaScript ishlaydigan istalgan muhitda (brauzerda `window`, Node.js-da `global`) global obyektga murojaat qilishning yagona standart usulidir."
    }
  ]
};
