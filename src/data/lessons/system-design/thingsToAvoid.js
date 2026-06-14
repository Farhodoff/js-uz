export const thingsToAvoid = {
  id: "thingsToAvoid",
  title: "System Design Intervyuda Yo'l Qo'yiladigan Xatolar (Things to Avoid)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

System Design intervyulari faqat texnik bilimlarni emas, balki sizning muloqot va hamkorlik madaniyatingizni ham sinovdan o'tkazadi. Bu xuddi **shifokor va bemor** muloqotiga o'xshaydi:
- **Xato (Junior yondashuv):** Bemor eshikdan kirishi bilan shifokor uning shikoyatini tinglamasdan, qon bosimini o'lchamasdan turib darhol og'ir jarrohlik amaliyotini (yoki eng kuchli dori-darmonlarni) buyuradi (talablarni so'ramay over-engineering qilish).
- **To'g'ri (Senior yondashuv):** Shifokor avval og'riq qayerdaligini, qachondan beri og'riyotganini va bemorning boshqa kasalliklarini so'rab surishtiradi (talablarni aniqlashtirish), keyin davolash usullarining foydali va zararli tomonlarini (trade-offs) tushuntiradi.

Intervyuda faqat to'g'ri chizmani chizish yetarli emas; eng muhimi — intervyuer bilan hamkorlik qila olish va keng tarqalgan tuzoqlardan qochishdir.

---

## 2. 💻 Real Kod Misollari

Intervyu jarayonida nomzodning moslashuvchanligini (flexibility) simulyatsiya qiluvchi oddiy namuna:

\`\`\`javascript
// Nomzodning intervyuer taklifiga munosabatini tekshirish
function checkCandidateBehavior(isFlexible, acceptsFeedback, explainTradeoffs) {
  if (!isFlexible) {
    return {
      score: "Fayl (Rad etildi)",
      feedback: "Nomzod o'z fikrida qaysarlik bilan turib oldi, muqobil variantlarni ko'rib chiqmadi."
    };
  }
  
  if (acceptsFeedback && !explainTradeoffs) {
    return {
      score: "O'rta",
      feedback: "Nomzod fikrga rozi bo'ldi, lekin nega bu tanlov qilinganini (tradeoff) tushuntira olmadi."
    };
  }
  
  return {
    score: "Pass (Muvaffaqiyatli)",
    feedback: "Ajoyib! Nomzod fikr-mulohazani qabul qildi va muqobil variantlarning kamchiliklarini asoslab berdi."
  };
}

console.log(checkCandidateBehavior(true, true, true));
// { score: "Pass (Muvaffaqiyatli)", feedback: "Ajoyib! Nomzod fikr-mulohazani qabul qildi va muqobil variantlarning kamchiliklarini asoslab berdi." }
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

System Design intervyusida quyidagi 6 ta asosiy xato nomzodni muvaffaqiyatsizlikka olib keladi:

1. **Talablarni chetlab o'tish (Ignoring Requirements):** Savol berilishi bilanoq chizishni boshlash. Bu tizim miqyosini bilmasdan noto'g'ri arxitektura qurilishiga sabab bo'ladi.
2. **Detallarga o'ta erta kirish (Diving into details too soon):** High-level (umumiy) diagramma tayyor bo'lmasdan turib, ma'lumotlar bazasining jadval ustunlari yoki bitta klass tuzilishi haqida 15 daqiqa gapirish.
3. **Fikrda qotib qolish (Inflexibility):** Intervyuer "Nega MongoDB tanladingiz, bu yerda tranzaksiyalar muhim-ku?" deb ishora berganida, o'z qarorida qaysarlik qilib turib olish.
4. **Trade-offs tahlilini qilmaslik:** Biror texnologiyani (masalan, Kafka) tanlab, uning tizimga olib keladigan murakkabligi va narxini aytib o'tmaslik.
5. **Nofunksional talablarni unutish:** Tizimning faqat biznes mantiqini (rasm yuklash) chizib, Uptime, Latency va xavfsizlik (HTTPS/OAuth) haqida gapirmaslik.
6. **Under-communication (Kam muloqot qilish):** Whiteboardga qarab olib, intervyuerga orqa o'girib, 10 daqiqa davomida jimjitlikda chizish.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Yolg'on gapirish yoki bilmaganini tan olmaslik:** Bilmaydigan atamasini (masalan, Raft consensus) go'yoki biladigandek tushuntirishga urinish. Intervyuer buni darhol sezadi. Bilmaslik uyat emas, intervyuda ochiq tan olib, taxmin qilishga ruxsat so'rash yaxshi signal hisoblanadi.
2. **Monolog qilish:** Intervyuerga gapirishga imkon bermaslik. Bu hamkorlikda ishlash qobiliyati (collaboration) pastligini ko'rsatadi.
3. **Over-engineering (Ortiqcha murakkablashtirish):** Kuniga 100 ta foydalanuvchisi bor oddiy blog uchun Kubernetes, Redis va Cassandra ishlatishni taklif qilish.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Tizimli dizayn intervyusida eng keng tarqalgan 1-raqamli xato nima?**
Savol berilishi bilanoq, talablarni so'ramay va cheklovlarni aniqlashtirmay diagramma chizishni boshlash.

**2. Nima uchun "monolog" qilish salbiy signal hisoblanadi?**
Chunki bu nomzodning jamoada boshqalarni eshitmasligini va hamkorlikda ishlay olmasligini ko'rsatadi.

**3. "Rushing into low-level details" xatosi nima?**
Umumiy tizim oqimini ko'rsatmasdan turib, ma'lumotlar bazasining sxemasi yoki API payloadining mayda detallariga berilib ketish.

**4. Intervyuer bergan maslahat yoki ishorani (hint) rad etish nimani ko'rsatadi?**
Nomzodning fikrlashda moslashuvchan emasligini va o'zgaruvchan talablarga tez moslasha olmasligini.

**5. "No design has zero cost" iborasi nimani anglatadi?**
Har bir arxitektura qarorining o'z yutuqlari (pros) va narxi/kamchiliklari (cons/trade-offs) borligini ko'rsatadi.

**6. Nofunksional talablar rad etilsa, tizim bilan nima sodir bo'ladi?**
Tizim kod darajasida ishlasa ham, real hayotdagi yuklama, kutilmagan qulashlar va xakerlik hujumlari ostida sinib qoladi.

**7. "Overconfidence" (haddan tashqari ishonch) intervyuda qanday zarar beradi?**
Foydali fikr-mulohazalarni rad etishga va tizimning zaif nuqtalarini (failure modes) ko'rmay qolishga sabab bo'ladi.

**8. Bilmaydigan texnologiyangiz haqida so'rashganda qanday yo'l tutish kerak?**
"Bu texnologiya bilan chuqur ishlamaganman, lekin uning vazifasi X deb o'ylayman va uning o'rniga Y dan foydalanishni taklif qilaman" deb ochiq aytish lozim.

**9. Whiteboardda chizayotganda qanday muloqot qilish kerak?**
Har doim intervyuerga qarab gapirish, har bir chizilgan qutining vazifasini ovoz chiqarib tushuntirish.

**10. "Under-specification" muammosi nima?**
Muammoni keragidan ortiq soddalashtirib yuborish va uning ichidagi murakkab chekka holatlarni (edge cases) ko'rmaslik.

**11. Nima uchun intervyuda "kumush o'q" (silver bullet) yo'q?**
Chunki hamma muammoga birdek tushadigan mukammal dastur yoki baza yo'q. Tanlov doimo talabga qarab belgilanadi.

**12. Tizimli dizayn intervyusida intervyuer o'zini qanday tutishi kerak?**
U sizga raqib emas, balki siz bilan birga arxitektura loyihalayotgan "sherik/kollega" sifatida ko'rinishi kerak.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi exercises bo'limida bajarib, bilimingizni tekshiring.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali xatolarni aniqlash darajangizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Case Study: Re-designing based on interviewer's feedback
- **Dastlabki holat:** Nomzod barcha tranzaksiyalarni keshda saqlashni taklif qildi.
- **Intervyuer ishorasi:** "Kesh xotirasi to'lib qolsa yoki server o'chsa, pullar yo'qolmaydimi?"
- **Yomon reaksiya:** "Yo'q, kesh hech qachon o'chmaydi, men bunga ishonaman." (Inflexible)
- **Yaxshi reaksiya:** "To'g'ri aytdingiz. Kesh operativ xotirada bo'lgani uchun doimiy (durable) emas. Tranzaksiyalarni avval ACID kafolatiga ega relyatsion bazaga (masalan, Postgres) yozib, keyin tez o'qish uchun keshga qo'yishimiz kerak." (Collaborative & Flexible)

---

## 9. 🧠 Vizual ko'rinish (Communication Feedback Loop)

\`\`\`mermaid
graph LR
    Candidate[Nomzod taklif kiritadi] -->|Tushuntiradi| Interviewer{Intervyuer munosabati}
    Interviewer -->|Rozilik| Proceed[Keyingi bosqichga o'tish]
    Interviewer -->|Tashvish / Ishora| Adapt{Nomzod fikrini moslashtiradimi?}
    Adapt -->|Ha: Moslashuvchan| Redesign[Dizaynni o'zgartiradi va tradeoffni aytadi]
    Adapt -->|Yo'q: Qaysar| Pitfall[Xato: Inflexibility - Rad etilish xavfi]
    Redesign --> Candidate
\`\`\`

---

## 10. 📌 Cheat Sheet

| Noto'g'ri yondashuv (Don't) | To'g'ri yondashuv (Do) | Natija |
| :--- | :--- | :--- |
| Savol berilishi bilan chizish | 5 daqiqa talablarni so'rash | To'g'ri yo'nalish |
| Jimjitlikda chizish | Ovoz chiqarib tushuntirish | Hamkorlik signali |
| "MongoDB eng yaxshisi" | "MongoDB ni mana bu sabab bilan tanlayman" | Muhandislik fikrlashi |
| Bilmagan narsani to'qish | Ochiq tan olib, taxmin qilish | Ishonchlilik |
`,
  exercises: [
    {
      id: 1,
      title: "Muloqot xatosini aniqlash",
      instruction: "Nomzodning muloqot xulq-atvori (`isMonologue` va `asksQuestions`) berilgan. Agar u faqat o'zi gapirsa (`isMonologue === true`), 'Pitfall: Under-communicating' qaytaring. Agar u savollar bermasa (`asksQuestions === false`), 'Pitfall: No clarification' qaytaring. Ikkalasi ham yaxshi bo'lsa, 'Good communication' qaytaring.",
      startingCode: "function validateCommunication(isMonologue, asksQuestions) {\n  // Kodni yozing\n}",
      hint: "if shartlaridan ketma-ket foydalaning.",
      test: "if (typeof validateCommunication !== 'function') return 'validateCommunication topilmadi'; if(validateCommunication(true, true) !== 'Pitfall: Under-communicating') return '1-xato aniqlanmadi'; if(validateCommunication(false, false) !== 'Pitfall: No clarification') return '2-xato aniqlanmadi'; if(validateCommunication(false, true) !== 'Good communication') return 'Muvaffaqiyatli holat xato'; return null;"
    },
    {
      id: 2,
      title: "Over-engineering tekshiruvi",
      instruction: "Tizimning foydalanuvchilar soni (`userCount`) va ishlatilgan ma'lumotlar bazalari soni (`databaseCount`) berilgan. Agar foydalanuvchilar soni 1000 dan kam bo'lib, bazalar soni 1 dan ko'p bo'lsa, 'Overengineered' qaytaring, aks holda 'Appropriate' qaytaring.",
      startingCode: "function checkOverengineering(userCount, databaseCount) {\n  // Kodni yozing\n}",
      hint: "Sodda if operatori yozing.",
      test: "if (typeof checkOverengineering !== 'function') return 'checkOverengineering topilmadi'; if (checkOverengineering(500, 2) !== 'Overengineered') return '500 user 2 db uchun xato'; if (checkOverengineering(2000, 3) !== 'Appropriate') return 'Appropriate holat xato'; return null;"
    },
    {
      id: 3,
      title: "Moslashuvchanlikni tekshirish",
      instruction: "Nomzodning boshlang'ich dizayni (`initialDesign`), o'zgartirilgan dizayni (`modifiedDesign`) va intervyuer ishorasi (`interviewerHint`) berilgan. Agar intervyuer ishora bergandan keyin ham nomzod dizaynini o'zgartirmasa (ya'ni `initialDesign === modifiedDesign` bo'lsa), `false` (moslashuvchan emas) qaytaring. Aks holda `true` qaytaring.",
      startingCode: "function isDesignFlexible(initialDesign, modifiedDesign, interviewerHint) {\n  // Kodni yozing\n}",
      hint: "interviewerHint true bo'lsa va ikkala dizayn teng bo'lsa false qaytaring.",
      test: "if (typeof isDesignFlexible !== 'function') return 'isDesignFlexible topilmadi'; if (isDesignFlexible('SQL', 'SQL', true) !== false) return 'Qaysarlik holati aniqlanmadi'; if (isDesignFlexible('SQL', 'NoSQL', true) !== true) return 'Moslashuvchanlik xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "System Design intervyusini boshlashda eng katta yo'l qo'yiladigan xato nima?",
      options: [
        "Faqat bitta diagramma chizish",
        "Talablarni aniqlashtirmasdan va savollar bermasdan darhol chizish yoki loyihalashni boshlash",
        "Intervyuer bilan salomlashish",
        "Postgres bazasini tanlash"
      ],
      correctAnswer: 1,
      explanation: "Nima qurayotganimizni va tizim cheklovlarini bilmasdan turib loyihalash eng katta va tuzatib bo'lmas xatodir."
    },
    {
      id: 1,
      question: "Intervyuda 'Rushing into low-level details' deganda nima tushuniladi?",
      options: [
        "Whiteboardda juda tez chizish",
        "Umumiy (high-level) arxitekturani qurmasdan turib, bazaning ustunlari kabi mayda detallarga berilib ketish",
        "Faqat SQL bazalarni ishlatish",
        "Intervyuni tezroq tugatishga urinish"
      ],
      correctAnswer: 1,
      explanation: "Nomzod avval tizimning umumiy zanjirini (high-level flow) ko'rsatishi, keyin esa detallarga (deep-dive) kirishi lozim."
    },
    {
      id: 2,
      question: "Intervyuda 'Monolog' qilish (faqat nomzodning o'zi gapirishi) nima uchun xato?",
      options: [
        "Chunki bu vaqtni ko'p oladi",
        "Chunki u intervyuer bilan hamkorlik qilmasligini va jamoaviy ishlashga tayyor emasligini ko'rsatadi",
        "Faqat ingliz tilida gapirish xato",
        "Hech qanday zarari yo'q"
      ],
      correctAnswer: 1,
      explanation: "Tizimli dizayn intervyusi ikki muhandisning birgalikdagi dialogi ko'rinishida o'tishi kerak."
    },
    {
      id: 3,
      question: "Intervyuer siz tanlagan ma'lumotlar bazasining kamchiligini aytganida qaysi javob to'g'ri hisoblanadi?",
      options: [
        "Qaroringizni asossiz himoya qilib, MongoDB baribir eng yaxshisi deb turib olish",
        "Maslahatni inobatga olib, tanlovingizning kamchiliklarini tan olish va muqobil variant tradeofflarini muhokama qilish",
        "Intervyuer bilan bahslashish",
        "Savolni e'tiborsiz qoldirish"
      ],
      correctAnswer: 1,
      explanation: "Moslashuvchanlik (flexibility) va fikr-mulohazalarni (feedback) qabul qila olish intervyuda juda ijobiy baholanadi."
    },
    {
      id: 4,
      question: "Design qarorlarida 'Trade-offs'ni muhokama qilmaslik nomzod haqida qanday fikr uyg'otadi?",
      options: [
        "U juda aqlli va xatosiz loyihalaydi deb o'ylashadi",
        "Uning bilimi sayoz ekanligi va har bir texnologiyaning yutuq-kamchiligini tahlil qila olmasligini ko'rsatadi",
        "Buning hech qanday ahamiyati yo'q",
        "Faqat junior nomzodlar tradeoff aytadi"
      ],
      correctAnswer: 1,
      explanation: "Har qanday arxitektura qarorida nimadandir voz kechiladi (masalan: tezlik uchun konsistentlikdan). Buni tushuntirish nomzodning chuqurligini ko'rsatadi."
    },
    {
      id: 5,
      question: "Nofunksional talablarni (Scalability, Reliability) e'tiborsiz qoldirish qanday muammoga sabab bo'ladi?",
      options: [
        "Tizim faqat kichik yuklamada ishlaydi, lekin real hayotda darhol qulab tushadi",
        "Kod yozish qiyinlashadi",
        "CSS xatolari ko'payadi",
        "Hech qanday muammo bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "NFR rad etilsa, tizim faqat nazariyada ishlaydi, amalda esa millionlab foydalanuvchilar oqimini ko'tara olmaydi."
    },
    {
      id: 6,
      question: "Agar intervyuda so'ralgan biror atama yoki texnologiyani umuman bilmasangiz nima qilish to'g'ri?",
      options: [
        "Bilmasangiz ham u haqida noto'g'ri ma'lumotlarni to'qib gapirish",
        "Ochiq tan olib, bu texnologiya bilan ishlamaganingizni aytish va o'zingiz bilgan muqobil yechimni taklif qilish",
        "Intervyuni darhol tugatish",
        "Sessiya davomida umuman gapirmay jim turish"
      ],
      correctAnswer: 1,
      explanation: "Bilmaslikni tan olish yolg'on gapirish yoki to'qishdan ko'ra 10 barobar yaxshiroq taassurot qoldiradi."
    },
    {
      id: 7,
      question: "Ortiqcha murakkablashtirish (Over-engineering) nima?",
      options: [
        "Juda oddiy talablar uchun keraksiz darajada murakkab va qimmat arxitekturani taklif qilish",
        "Kodni xato yozish",
        "Faqat bitta serverdan foydalanish",
        "Talablarni noto'g'ri o'qish"
      ],
      correctAnswer: 0,
      explanation: "Junior nomzodlar ko'p o'qiydigan yirik tizimlarni kichik muammolarga ham asossiz tatbiq etib, over-engineering tuzog'iga tushishadi."
    },
    {
      id: 8,
      question: "Intervyuda 'Inflexibility' (moslashuvchan emaslik) deb nimaga aytiladi?",
      options: [
        "Whiteboardda chiza olmaslikka",
        "Yangi talablar yoki intervyuer ishoralari berilganda o'zining boshlang'ich fikrini o'zgartira olmaslikka",
        "Faqat JavaScript tili bilan cheklanishga",
        "Tez gapirishga"
      ],
      correctAnswer: 1,
      explanation: "Moslashuvchanlik amaliyotda talablar o'zgarganda dasturchining arxitekturani to'g'ri yo'naltira olish ko'nikmasidir."
    },
    {
      id: 9,
      question: "Nima uchun intervyuda 'Silver bullet' (hamma muammoga birdek tushadigan dori) yo'q?",
      options: [
        "Chunki texnologiyalar juda tez eskiradi",
        "Chunki har bir muammoning o'ziga xos talablari bor va tanlov doimo tradeofflarga bog'liq",
        "Chunki hamma bazalar pullik",
        "Hech kim mukammal baza yarata olmagan"
      ],
      correctAnswer: 1,
      explanation: "Hech qanday texnologiya (masalan, Kafka yoki Redis) mutlaq mukammal emas. Ular faqat ma'lum sharoit va cheklovlar ostida to'g'ri tanlov bo'la oladi."
    },
    {
      id: 10,
      question: "Intervyuda o'lchovsiz (masalan 'tizim tez ishlashi kerak') talab qo'yish o'rniga qanday gapirish kerak?",
      options: [
        "Tizim faqat kechalari tez ishlaydi deb aytish",
        "Aniq raqamlar bilan, masalan: 'p99 latency 200ms dan past bo\\'lishi kerak' deb gapirish",
        "Tezlikni umuman tilga olmaslik",
        "Faqat 'super tez' so'zidan foydalanish"
      ],
      correctAnswer: 1,
      explanation: "Muhandislikda tezlik va yuklama aniq raqamlar (latency, throughput, QPS) bilan o'lchanadi va loyihalanadi."
    },
    {
      id: 11,
      question: "Tizimli dizayn intervyusida intervyuerning asosiy roli nima?",
      options: [
        "Nomzodga qiyin savollar berib yiqitish",
        "Nomzod bilan birgalikda arxitektura muammosini hal qiluvchi suhbatdosh hamkor bo'lish",
        "Faqat vaqtni kuzatib turish",
        "Dizayn diagrammasini tekshirib baho qo'yish"
      ],
      correctAnswer: 1,
      explanation: "Intervyu bu hamkorlikda ishlash (collaboration) jarayonidir. Intervyuer sizning kelajakdagi hamkasbingiz rolida bo'ladi."
    }
  ]
};
