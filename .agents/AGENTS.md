# JS-UZ Project Rules & Teaching Methodology

Bu loyiha JS (va React/Node) darsliklarini yaratish uchun mo'ljallangan. Barcha darsliklarni yaratuvchi agentlar quyidagi pedagogik qoidalarga va uslublarga qat'iy amal qilishi shart!

## 1. Analogy First (O'xshatishlar bilan tushuntirish)
Har doim yangi texnik atama yoki konseptni tushuntirishdan oldin unga hayotiy o'xshatish (analogy) toping.
* **Misol:** O'zgaruvchi (variable) bu — ustiga stiker yopishtirilgan ma'lumotlar saqlanadigan quti.
* **Misol:** `http` server — qahvaxonadagi ofitsiant (so'rovlarni oladi va javob qaytaradi).
O'quvchi bu o'xshatishni eslab qolish orqali qiyin texnik mantiqni osonroq tushunadi.

## 2. From Scratch (Tarixdan va Noldan boshlash)
"Eng ko'p qo'llaniladigani bu" deb sirtini aytib ketmang! Tushunchaning tub mohiyatini ko'rsating. Agar yangi texnologiya (masalan `let`) haqida gapirsangiz, nima uchun eskisidan (`var`) voz kechilganini mantiqan va qisqacha ko'rsating. Nima uchun kerak o'zi bu degan savolga javob bering.

## 3. Good and Bad Code (❌ YOMON va ✅ YAXSHI yondashuv)
Foydalanuvchiga faqat to'g'ri kodni yozib bermang. Noto'g'ri (yoki eski, noqulay) kod qanday bo'lishini va uni to'g'risi bilan qanday taqqoslash mumkinligini aniq ko'rsating.
Naming qoidalarida doim o'quvchini tushunarli (`userName` va boshqalar) nomlar berishga chaqiring. `data`, `value` kabi ma'nosiz nomlar ishlatishdan ehtiyot qiling.

## 4. Visual Mental Models (Mermaid diagrammalari)
Har bir muhim konseptni tushuntirish uchun `mermaid` diagrammalaridan (sequenceDiagram, flowchart va hokazo) foydalaning. Bu o'quvchida arxitekturani visual tasavvur qilish imkonini beradi.
**DIQQAT!** Mermaid diagrammalarida `participant` yoki boshqa node larni belgilashda hecham ochiq holda probel, nuqta yoki qavslardan foydalanmang!
* ❌ YOMON: `participant Node.js (Thread)` (Bu Mermaid xatoligi (Parse error) beradi)
* ✅ YAXSHI: `participant N as Node.js (Thread)` (Bu to'g'ri! Doim `as` orqali taxallus berib ishlating yoki qo'shtirnoq ichiga oling `participant "Node.js (Thread)"`).

## 5. Darslik Strukturasiga rioya qilish
Har bir dars quyidagi to'liq obyekt strukturasini saqlab qolishi kerak:
* `theory`: Matn, kod misollari, diagramma, Intervyu savollari.
* `exercises`: Aniq 10 ta amaliyot (`id`, `title`, `instruction`, `startingCode`, `hint`, `test`).
* `quizzes`: Aniq 12 ta test (`id`, `question`, `options`, `correctAnswer`, `explanation`).
* Barcha kontent o'zbek tilida, qiziqarli (bir oz hazilomuz, do'stona roast formatida) bo'lishi lozim.
