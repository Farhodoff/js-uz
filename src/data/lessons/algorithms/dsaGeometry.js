export const dsaGeometry = {
  id: "dsaGeometry",
  title: "Geometrik Algoritmlar (Convex Hull, Line Intersection, Sweep Line)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Geometrik Algoritmlar (Computational Geometry) - 2D yoki 3D fazodagi nuqtalar, chiziqlar, ko'pburchaklar va boshqa geometrik obyektlar bilan bog'liq masalalarni yechish uchun ishlatiladi.

### Tushunarli o'xshatishlar:
- **Convex Hull (Qavariq Qobiq - Graham Scan / Jarvis March):** Tasavvur qiling, doskaga juda ko'p mixlar qoqilgan. Siz bitta katta elastik rezina tasmani (rubber band) olib, barcha mixlarni o'rab qo'yib yubordingiz. Rezina eng chetdagi mixlarga ilinib, barcha nuqtalarni o'rab oladi. Mana shu hosil bo'lgan eng chekka qavariq shakl Convex Hull (Qavariq qobiq) deb ataladi.
- **Line Intersection (Chiziqlar kesishishi):** Ikki to'g'ri chiziq kesishadimi yoki yo'qmi, buni aniqlash. Bu o'yinlar fizikasi (kolliziyalarni aniqlash) va xaritalarda juda muhim.
- **Sweep Line (Siquvchi Chiziq):** Doskada juda ko'p vertikal va gorizontal chiziqlar bor. Ularning o'zaro kesishish nuqtalarini topmoqchisiz. Barcha juftliklarni tekshirish $O(N^2)$ vaqt oladi. Sweep Line yondashuvida chapdan o'ngga qarab virtual vertikal chiziq suriladi (sweeping), u faqat o'zi kesib o'tayotgan va bir-biriga yaqin chiziqlarnigina tekshirib $O(N \\log N)$ da kesishishlarni topadi.

---

## 2. 💻 Real Kod Misollari

Uchta nuqtaning yo'nalishini (Orientation: soat mili bo'yicha, miliga qarshi yoki chiziqli) aniqlash:

\`\`\`javascript
function getOrientation(p1, p2, p3) {
  // Matematik cross product (vektor ko'paytmasi) farqi
  const val = (p2.y - p1.y) * (p3.x - p2.x) - (p2.x - p1.x) * (p3.y - p2.y);

  if (val === 0) return 0; // Kollinear (bir to'g'ri chiziqda)
  return val > 0 ? 1 : 2; // 1: Soat mili bo'yicha (CW), 2: Soat miliga qarshi (CCW)
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Nuqtalar yo'nalishi (Orientation):
Geometrik hisoblashlarda ikki chiziq kesishishi yoki qobiq qurishda vektor ko'paytmasi (cross product) ishlatiladi:
1. Agar $P_1, P_2, P_3$ nuqtalar berilgan bo'lsa, $P_1 \\rightarrow P_2$ va $P_2 \\rightarrow P_3$ vektorlari burilish yo'nalishini ko'rsatadi.
2. Burilish soat miliga qarshi (Counter-Clockwise - CCW) bo'lsa, qavariq qobiq Graham skanerlashida yangi nuqta qobiqqa qo'shiladi. Agar soat mili bo'yicha (CW) bo'lsa, bu noto'g'ri burilish hisoblanib, stekdagi oxirgi nuqta o'chiriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Haqiqiy sonlar (Float accuracy) bilan ishlashda tenglikdan foydalanish
Geometriyada koordinatalar ko'p hollarda haqiqiy sonlar bo'ladi. JS-da \`0.1 + 0.2 === 0.3\` amali \`false\` berganidek, geometrik hisoblarda ham aniq tenglikdan (\`===\`) foydalanish xato beradi.
* **Tuzatish:** Tenglikni tekshirish uchun har doim juda kichik $\\epsilon$ (epsilon, masalan \`1e-9\`) sonidan foydalaning: \`Math.abs(val1 - val2) < 1e-9\`.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Convex Hull (Qavariq qobiq) nima?**
   * *Javob:* Berilgan nuqtalar to'plamini to'liq o'rab oladigan, barcha burchaklari qavariq bo'lgan eng kichik ko'pburchak.
2. **Graham Scan algoritmi qanday vaqt murakkabligida qavariq qobiqni quradi?**
   * *Javob:* O(N log N) vaqtda (bu yerda eng ko'p vaqt nuqtalarni burchak bo'yicha saralashga ketadi).
3. **Nuqtalar yo'nalishini (Orientation) aniqlashda 0, 1 va 2 qiymatlari nimani anglatadi?**
   * *Javob:* 0 - kollinear (bir to'g'ri chiziqda), 1 - soat mili bo'yicha burilish, 2 - soat miliga qarshi burilish.
4. **Vektor ko'paytmasi (Cross Product) geometrik algoritmlarda nima uchun ishlatiladi?**
   * *Javob:* Ikki vektor o'rtasidagi burilish burchagi va yo'nalishini (chapga yoki o'ngga burilganligini) aniqlash uchun.
5. **Sweep Line algoritmining asosiy g'oyasi nima?**
   * *Javob:* Fazodagi muammoni virtual chiziq yordamida bir yo'nalishda (masalan chapdan o'ngga) supurib o'tish orqali 2D muammoni 1D muammolar ketma-ketligiga keltirish va tezlashtirish.
6. **Nima uchun geometriyada floating-point errors (haqiqiy sonlar xatoligi) xavfli?**
   * *Javob:* Kompyuter xotirasida haqiqiy sonlar yaxlitlanishi sababli, chiziqlar kesishish nuqtasi yoki kollinearlikni tekshirishda xatolik yuz berishi mumkin.
7. **Jarvis March (Gift Wrapping) algoritmining vaqt murakkabligi qanday?**
   * *Javob:* O(N * H) bo'ladi, bu yerda H - qobiqdagi nuqtalar soni. Eng yomon holatda O(N^2) bo'lishi mumkin.
8. **Point in Polygon (Nuqtaning ko'pburchak ichida ekanligini tekshirish) masalasi qanday yechiladi?**
   * *Javob:* Ray Casting (Nur yuborish) algoritmi yordamida: nuqtadan cheksizlikka nur yuborilib, nur ko'pburchak shoxlarini toq marta kesse - ichkarida, juft marta kesse - tashqarida bo'ladi.
9. **Kollinear (Collinear) nuqtalar nima?**
   * *Javob:* Bitta to'g'ri chiziqda yotuvchi uch yoki undan ortiq nuqtalar.
10. **Polygon Area (Ko'pburchak yuzasi) qanday formula bilan hisoblanadi?**
    * *Javob:* Shoelace Formula (Gausning trapetsiyalar formulasi) yordamida koordinatalarni ko'paytirib chiqish orqali.
11. **Graham Scan algoritmida birinchi qadam nima?**
    * *Javob:* Y koordinatasi eng kichik bo'lgan nuqtani (eng pastki chap nuqtani) boshlang'ich nuqta qilib tanlash.
12. **Sweep Line algoritmi qaysi ma'lumotlar tuzilmasidan foydalanadi?**
    * *Javob:* Hodisalarni saqlash uchun Priority Queue hamda faol chiziqlarni tartibli saqlash uchun Balanced Binary Search Tree (yoki Set).

---

## 6. 🎨 Interaktiv Vizual

### Convex Hull (Rezina tasma effekti)
Qobiqdagi nuqtalar boshqa barcha nuqtalarni o'rab oladi:

\`\`\`mermaid
graph TD
    A((A: Qobiq)) --- B((B: Ichki nuqta))
    A --- C((C: Qobiq))
    C --- D((D: Qobiq))
    D --- A
    style A fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style C fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style D fill:#d4efdf,stroke:#27ae60,stroke-width:2px
    style B fill:#ebf5fb,stroke:#2980b9,stroke-width:2px
\`\`\`

---

## 7. 🛠️ Amaliy Topshiriqlar

Geometrik amallarni kodlang.

---

## 8. 📝 12 ta Mini Test

Geometrik algoritmlardan test topshiring.

---

## 9. 🚀 Performance va Optimization

- **Graham Scan vs Jarvis March:** Nuqtalar soni juda katta bo'lsa, Graham scan doimo $O(N \\log N)$ bo'lib, eng yomon holatdagi Jarvis march $O(N^2)$ dan tezroq ishlaydi.

---

## 10. 📌 Cheat Sheet

| Masala | Algoritm | Vaqt Murakkabligi | Xotira murakkabligi |
| :--- | :--- | :--- | :--- |
| **Convex Hull** | Graham Scan | O(N log N) | O(N) |
| **Convex Hull** | Jarvis March | O(N * H) | O(N) |
| **Line Intersection** | CCW / Cross Product | O(1) | O(1) |
| **Point in Polygon** | Ray Casting | O(N) | O(1) |
| **Polygon Area** | Shoelace Formula | O(N) | O(1) |
`,
  exercises: [
    {
      id: 1,
      title: "Nuqtalar Yo'nalishi (Orientation)",
      instruction: "Uchta geometrik nuqtalar obyektlari `p1`, `p2` va `p3` (har biri `{ x, y }` ko'rinishida) berilgan. Ularning yo'nalishini aniqlovchi `findOrientation(p1, p2, p3)` funksiyasini yozing. Agar kollinear bo'lsa `0`, soat mili bo'yicha bo'lsa `1`, soat miliga qarshi bo'lsa `2` qaytaring.",
      startingCode: "function findOrientation(p1, p2, p3) {\n  // Kodni yozing\n}",
      hint: "`(p2.y - p1.y) * (p3.x - p2.x) - (p2.x - p1.x) * (p3.y - p2.y)` formulasini hisoblang. Musbat bo'lsa 1, manfiy bo'lsa 2, nol bo'lsa 0 qaytaring.",
      test: "const sandbox = new Function(code + '; return findOrientation;'); const fn = sandbox(); if (fn({x: 0, y: 0}, {x: 4, y: 4}, {x: 1, y: 2}) === 2 && fn({x: 0, y: 0}, {x: 4, y: 4}, {x: 2, y: 2}) === 0) return null; return 'Yo\\'nalish noto\\'g\\'ri aniqlandi';"
    },
    {
      id: 2,
      title: "Shoelace Formula bilan Ko'pburchak Yuzasi",
      instruction: "Ko'pburchak uchlari nuqtalari massivi `points` (har biri `{ x, y }` formatida, tartiblangan) berilgan. Shoelace formula yordamida ko'pburchakning umumiy yuzasini hisoblovchi `getPolygonArea(points)` funksiyasini yozing.",
      startingCode: "function getPolygonArea(points) {\n  let area = 0;\n  const n = points.length;\n  // Kodni yozing\n  return Math.abs(area) / 2;\n}",
      hint: "Sikl yordamida `area += points[i].x * points[(i + 1) % n].y - points[(i + 1) % n].x * points[i].y` formulasini jamlab boring.",
      test: "const sandbox = new Function(code + '; return getPolygonArea;'); const fn = sandbox(); const rect = [{x: 0, y: 0}, {x: 4, y: 0}, {x: 4, y: 3}, {x: 0, y: 3}]; if (fn(rect) === 12) return null; return 'Ko\\'pburchak yuzasi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 3,
      title: "Nuqta Chiziq Segmentida Yotishini Tekshirish",
      instruction: "Kollinear bo'lgan uchta nuqta `p`, `q`, `r` berilgan. `q` nuqtasi `pr` chiziq segmenti ustida yotishini tekshiruvchi `onSegment(p, q, r)` funksiyasini yozing (ya'ni `q.x` p va r ning x koordinatalari oralig'ida va `q.y` p va r ning y koordinatalari oralig'ida bo'lsin).",
      startingCode: "function onSegment(p, q, r) {\n  // Kodni yozing\n}",
      hint: "Math.min va Math.max dan foydalanib q.x >= min(p.x, r.x) && q.x <= max(p.x, r.x) hamda y koordinatalari uchun ham shunday shartni tekshiring.",
      test: "const sandbox = new Function(code + '; return onSegment;'); const fn = sandbox(); if (fn({x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}) === true && fn({x: 1, y: 1}, {x: 4, y: 4}, {x: 3, y: 3}) === false) return null; return 'Nuqtaning segmentda yotishini tekshirishda xatolik';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Convex Hull (Qavariq qobiq) nima?",
      options: [
        "Ko'pburchakning ichki burchaklar yig'indisi",
        "Nuqtalar to'plamini to'liq o'rab oladigan, burchaklari qavariq bo'lgan eng kichik ko'pburchak",
        "Geometrik chiziqlar kesishish nuqtasi",
        "Daraxtsimon ma'lumotlar tuzilmasi"
      ],
      correctAnswer: 1,
      explanation: "Convex Hull - bu berilgan nuqtalarning eng tashqi chegarasini o'rab oladigan qavariq ko'pburchakdir."
    },
    {
      id: 2,
      question: "Graham Scan algoritmi qavariq qobiqni qanday vaqt murakkabligida quradi?",
      options: [
        "O(N^2)",
        "O(N log N)",
        "O(N)",
        "O(2^N)"
      ],
      correctAnswer: 1,
      explanation: "Graham scan algoritmi nuqtalarni Y koordinatasi yoki burchak bo'yicha saralash uchun O(N log N) vaqt sarflaydi, skanerlash bosqichi esa chiziqli vaqt oladi."
    },
    {
      id: 3,
      question: "Geometrik algoritmlarda nuqtalar yo'nalishi (Orientation) tekshirilganda 'kollinear' (collinear) so'zi nimani anglatadi?",
      options: [
        "Nuqtalarning burchak hosil qilmasdan, bitta to'g'ri chiziq ustida yotishini",
        "Soat mili bo'yicha burilishni",
        "Koordinatalari nolga tengligini",
        "Nuqtalar mutlaqo mos kelishini"
      ],
      correctAnswer: 0,
      explanation: "Uch yoki undan ortiq nuqtalar bitta to'g'ri chiziqda yotsa, ular kollinear nuqtalar deyiladi."
    },
    {
      id: 4,
      question: "Vektor ko'paytmasi (Cross Product) geometrik algoritmlarda qaysi maqsad uchun ishlatiladi?",
      options: [
        "Faqat masofani topish uchun",
        "Uchta nuqta orasidagi burilish yo'nalishini (soat mili yoki soat miliga qarshi) aniqlash uchun",
        "Koordinatalarni yaxlitlash uchun",
        "Chiziq segmentini uzaytirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Cross product vektorlar burilishi chapga yoki o'ngga ekanligini aniqlashda geometrik hisob-kitoblarning asosiy asosi hisoblanadi."
    },
    {
      id: 5,
      question: "Sweep Line algoritmining asosiy afzalligi nimada?",
      options: [
        "U hech qanday hisob-kitob talab qilmaydi",
        "U 2D fazodagi narsalarni tartibli vertikal chiziq bilan siljib tekshirish orqali O(N^2) lik muammolarni O(N log N) gacha optimallashtiradi",
        "U xotirani 0 ga tushiradi",
        "U faqat doiralar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Sweep Line virtual chiziq yordamida hodisalar bo'yicha yurib, faqat qo'shni elementlarning o'zaro ta'sirini tekshirgani sababli vaqtni tejaydi."
    },
    {
      id: 6,
      question: "Point in Polygon (Nuqta ko'pburchak ichidami) masalasini yechuvchi 'Ray Casting' algoritmi qanday ishlaydi?",
      options: [
        "Nuqta atrofida doira chizib",
        "Nuqtadan cheksizlikka nur yuborib, uning ko'pburchak chegaralari bilan kesishishlar sonini hisoblash orqali (toq bo'lsa ichida, juft bo'lsa tashqarisida)",
        "Nuqta koordinatalarini qo'shish orqali",
        "Faqat kollinear nuqtalarni o'chirish orqali"
      ],
      correctAnswer: 1,
      explanation: "Nur ko'pburchak qirralarini toq marta kessa - nuqta ko'pburchak ichida yotgan bo'ladi, juft marta kessa - tashqarida bo'ladi."
    },
    {
      id: 7,
      question: "Shoelace Formula (Bog'ich formulasi) nima uchun ishlatiladi?",
      options: [
        "Nuqtalar orasidagi masofani hisoblashga",
        "Ko'pburchak yuzasini (Area of a Polygon) uning uchlari koordinatalari orqali hisoblashga",
        "Qavariq qobiqni saralashga",
        "Sweep line chizishga"
      ],
      correctAnswer: 1,
      explanation: "Shoelace formula 2D tekislikdagi ixtiyoriy oddiy ko'pburchak uchlari koordinatalari orqali uning yuzini hisoblovchi matematik formuladir."
    },
    {
      id: 8,
      question: "Graham Scan algoritmida Y koordinatasi eng kichik bo'lgan nuqta nima uchun birinchi tanlanadi?",
      options: [
        "U eng katta nuqta bo'lgani uchun",
        "U kafolatlangan qavariq qobiq uchi (boshlang'ich nuqta) bo'lganligi va qolgan nuqtalar undan faqat yuqorida joylashganligi sababli",
        "U koordinatalar markazi bo'lgani uchun",
        "Hisoblashni osonlashtirish uchun hech qanday sababsiz"
      ],
      correctAnswer: 1,
      explanation: "Eng pastki (va eng chap) nuqta har doim qavariq qobiqning bir qismi bo'lishi aniq, shuning uchun u boshlang'ich tayanch nuqta qilib olinadi."
    },
    {
      id: 9,
      question: "Jarvis March algoritmining eng yomon holatdagi vaqt murakkabligi qanday?",
      options: [
        "O(N log N)",
        "O(N^2)",
        "O(N)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Agar barcha nuqtalar qavariq qobiqda yotsa (masalan, aylanada yotgan nuqtalar), Jarvis march O(N * H) formulasi bo'yicha H = N bo'lib, O(N^2) vaqt oladi."
    },
    {
      id: 10,
      question: "JS-da geometrik hisoblashlarni bajarayotganda, floating-point xatoliklaridan qanday himoyalanish mumkin?",
      options: [
        "Tenglikni `===` bilan tekshirish orqali",
        "Farqni juda kichik epsilon (masalan, 1e-9) qiymati bilan taqqoslash orqali (Math.abs(a - b) < 1e-9)",
        "Sonlarni har doim stringga o'tkazish orqali",
        "Faqat butun sonlar ishlatish orqali"
      ],
      correctAnswer: 1,
      explanation: "Kasrli sonlar cheklangan bitlarda yaxlitlangani sababli, farqni epsilon qiymati bilan tekshirish to'g'ri taqqoslashni ta'minlaydi."
    },
    {
      id: 11,
      question: "Sweep line algoritmida 'Event' (Hodisa) nima?",
      options: [
        "Koddagi xatolik hodisasi",
        "Chiziq siljiyotganda geometrik obyekt boshlanadigan, tugaydigan yoki kesishadigan nuqtadagi hodisa vaqt hisobi",
        "Barcha nuqtalarni o'chirish jarayoni",
        "Faqat sichqoncha bosilish hodisasi"
      ],
      correctAnswer: 1,
      explanation: "Siquvchi chiziq (Sweep line) faqat ma'lum bir hodisa nuqtalarida (events, masalan segment boshlanishi va tugashi) to'xtaydi va hisoblashlarni amalga oshiradi."
    },
    {
      id: 12,
      question: "Qavariq ko'pburchak (Convex Polygon) va botiq ko'pburchak (Concave Polygon) farqi nimada?",
      options: [
        "Qavariq ko'pburchakning barcha ichki burchaklari 180 darajadan kichik bo'ladi, botiqda esa kamida bitta burchak 180 dan katta bo'ladi",
        "Qavariq ko'pburchakda faqat uchta burchak bo'ladi",
        "Ular mutlaqo bir xil",
        "Botiq ko'pburchak faqat aylanada bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Qavariq ko'pburchakning istalgan ikkita ichki nuqtasini ulovchi segment to'liq ko'pburchak ichida yotadi. Botiq ko'pburchakda esa bunday bo'lmasligi mumkin."
    }
  ]
};
