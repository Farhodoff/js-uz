export const consoleErrorWarn = {
  id: "consoleErrorWarn",
  title: "Xabar Turlari: console.error va console.warn",
  language: "javascript",
  theory: `## 1. Bu nima?

Yo'l harakati belgilarini tasavvur qiling: ko'k belgi — oddiy ma'lumot (masalan, "avtoturargoh"), sariq belgi — ogohlantirish ("ehtiyot bo'ling, sirpanchiq yo'l"), qizil belgi esa — xavf yoki taqiq ("to'xtang, yo'l yopiq").

Dasturlashda ham xabarlar turlarga bo'linadi:
- \`console.log()\` — oddiy ma'lumotlar uchun (ko'k/oq).
- \`console.warn()\` — ogohlantirishlar uchun (sariq).
- \`console.error()\` — xatoliklar uchun (qizil).

**console.warn() va console.error()** — dasturchiga konsolda ogohlantirish va jiddiy xatolik xabarlarini rangli va alohida belgilar bilan yaqqol ko'rsatib beruvchi metodlardir.

*Yangi terminlar:*
- **console.warn()** — sariq rangli ogohlantirish xabarini chiqaradi (kod to'xtamaydi, lekin e'tibor talab qilinadi).
- **console.error()** — qizil rangli xatolik xabarini chiqaradi (jiddiy nosozlik yuz berganda qo'llanadi).

---

## 2. Nega kerak?

Katta dasturlarda konsolga yuzlab ma'lumotlar chiqib turadi. Agar hamma narsa faqat \`console.log()\` bilan yozilsa, haqiqiy xatolar oddiy ma'lumotlar orasida ko'rinmay qoladi.

\`console.warn()\` va \`console.error()\` ning afzalliklari:
1. Brauzer DevTools konsolida sariq va qizil ranglar bilan alohida ajralib turadi.
2. Konsol panelida nechta xato va ogohlantirish borligi hisoblab ko'rsatiladi.
3. Filtrlash orqali faqat xatolarni yoki faqat ogohlantirishlarni ajratib ko'rish mumkin.

---

## 3. Birinchi misol

Bu kod konsolga ogohlantirish va xatolik xabarlarini chiqaradi.

\`\`\`javascript
console.warn("Diqqat: Parol juda oddiy!"); // sariq ogohlantirish
console.error("Xatolik: Serverga ulanib bo'lmadi!"); // qizil xatolik
\`\`\`

\`\`\`text
// Natija:
Diqqat: Parol juda oddiy!
Xatolik: Serverga ulanib bo'lmadi!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`console.warn("Diqqat: Parol juda oddiy!");\` — \`warn\` metodi ogohlantirish matnini konsolga chiqaradi. Brauzer konsolida uning yonida sariq uchburchak ⚠️ belgisi chiqadi. Dastur ishlashdan to'xtamaydi.
- \`console.error("Xatolik: Serverga ulanib bo'lmadi!");\` — \`error\` metodi qizil xatolik xabarini chiqaradi. Brauzerda qizil fon va ❌ belgisi bilan ko'rsatiladi. Bu metod ham dasturni to'xtatmaydi, lekin xatoni ko'zga tashlanadigan qiladi.

---

## 5. Qadamma-qadam (solishtirish)

Konsol metodlarining farqlari:

| Metod | Maqsadi | Brauzerdagi ko'rinishi | Misol holat |
|---|---|---|---|
| \`console.log()\` | Oddiy ma'lumot | Oddiy oq/qora matn | O'zgaruvchi qiymatini ko'rish |
| \`console.warn()\` | Ogohlantirish | Sariq rang va ⚠️ belgisi | Kuchsiz parol, eskirgan funksiya |
| \`console.error()\` | Xatolik | Qizil rang va ❌ belgisi | Noto'g'ri ma'lumot, server xatosi |

---

## 6. Yana bitta misol

1-misoldan farqi: Shart operatori (\`if/else\`) bilan birgalikda tekshiruvda qo'llash.

\`\`\`javascript
const age = -5;

if (age < 0) {
  console.error("Xato: Yosh manfiy bo'lishi mumkin emas!");
} else if (age < 18) {
  console.warn("Ogohlantirish: Foydalanuvchi voyaga yetmagan.");
} else {
  console.log("Xush kelibsiz!");
}
\`\`\`

\`\`\`text
// Natija:
Xato: Yosh manfiy bo'lishi mumkin emas!
\`\`\`

Tahlil:
- Noto'g'ri qiymat (\`-5\`) kiritilgani sababli \`if (age < 0)\` sharti ishladi va \`console.error\` orqali xatolik darhol qizil bilan qayd etildi.

---

## 7. Ko'p uchraydigan xatolar

### 1-xato: console.error() dastur ishini to'xtatadi deb o'ylash

\`\`\`javascript
console.error("Xatolik yuz berdi!");
console.log("Bu kod baribir ishlaydi"); // Bu qator to'xtamaydi, ishlaydi!
\`\`\`

**Nima bo'ladi:** \`console.error()\` dasturni majburiy to'xtatmaydi, faqat konsolga qizil xabar yozadi.
**To'g'ri varianti:** Dastur to'xtamasdan faqat xabarni ko'rsatish talab etilsa, \`console.error\` ayni muddao.

### 2-xato: Oddiy ma'lumotlar uchun ham doim console.error ishlatish

\`\`\`javascript
const name = "Ali";
console.error("Foydalanuvchi: " + name); // XATO uslub
\`\`\`

**Nima bo'ladi:** Konsol qizil yozuvlarga to'lib ketadi va dasturchi haqiqiy jiddiy xatolarni payqamay qoladi.
**To'g'ri varianti:** Oddiy xabarlar uchun \`console.log\` dan foydalaning.

### 3-xato: console so'zini yozmasdan to'g'ridan-to'g'ri chaqirish

\`\`\`javascript
warn("Diqqat!"); // XATO: ReferenceError: warn is not defined
\`\`\`

**Nima bo'ladi:** \`warn\` va \`error\` alohida funksiya emas, ular \`console\` obyektining metodlaridir.
**To'g'ri varianti:** Har doim \`console.warn()\` va \`console.error()\` deb yozing.

---

## 8. Tekshiruv

### 1-mashq (oson)
\`console.warn()\` yordamida \`"Diqqat: Batareya quvvati kam"\` degan ogohlantirish xabarini konsolga chiqaring.

### 2-mashq (o'rtacha)
\`score = -10\` soni berilgan. Agar \`score < 0\` bo'lsa, \`console.error("Xato: Ball manfiy bo'lishi mumkin emas")\` deb xato xabarini chiqaring.

### 3-mashq (chegara holat)
\`speed = 130\` qiymati berilgan. Agar \`speed > 120\` bo'lsa \`console.warn("Tezlik yuqori: " + speed)\` deb ogohlantirish chiqaring, aks holda \`console.log("Tezlik me'yorda")\` chiqaring.

---

### Javoblar

**1-mashq javobi:**
\`\`\`javascript
console.warn("Diqqat: Batareya quvvati kam");
\`\`\`

**2-mashq javobi:**
\`\`\`javascript
const score = -10;

if (score < 0) {
  console.error("Xato: Ball manfiy bo'lishi mumkin emas");
}
\`\`\`

**3-mashq javobi:**
\`\`\`javascript
const speed = 130;

if (speed > 120) {
  console.warn("Tezlik yuqori: " + speed);
} else {
  console.log("Tezlik me'yorda");
}
\`\`\`

---

## 9. Xulosa

1. \`console.log\` — dasturdagi umumiy va oddiy ma'lumotlarni ko'rish uchun.
2. \`console.warn\` — sariq rangli ogohlantirish xabarlari uchun (e'tibor talab holatlar).
3. \`console.error\` — qizil rangli xatolik xabarlari uchun (nosozliklar haqida xabar berish).

Keyingi darsda: Xatolarni ushlash va dastur to'xtab qolishining oldini olish — \`try...catch\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Ogohlantirish xabarini chiqarish",
      instruction: "`console.warn()` yordamida `\"Diqqat: Batareya quvvati kam\"` ogohlantirishini konsolga chiqaring.",
      startingCode: "// console.warn yordamida ogohlantirish matnini chiqaring\n",
      hint: "console.warn(\"Diqqat: Batareya quvvati kam\");",
      test: "if (!code.includes('console.warn')) return 'console.warn ishlatilmadi';\nlet out = [];\nconst orig = console.warn;\nconsole.warn = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.warn = orig; }\nif (out.some(m => m.includes('Batareya quvvati kam'))) return null;\nreturn 'Ogohlantirish matni to\\'g\\'ri chiqmadi';"
    },
    {
      id: 2,
      title: "Xatolik xabarini chiqarish",
      instruction: "`score = -10` berilgan. Agar `score < 0` bo'lsa, `console.error(\"Xato: Ball manfiy bo'lishi mumkin emas\")` chiqaring.",
      startingCode: "const score = -10;\n// score < 0 bo'lsa console.error bilan xato xabarini chiqaring\n",
      hint: "if (score < 0) {\n  console.error(\"Xato: Ball manfiy bo'lishi mumkin emas\");\n}",
      test: "if (!code.includes('console.error')) return 'console.error ishlatilmadi';\nlet out = [];\nconst orig = console.error;\nconsole.error = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.error = orig; }\nif (out.some(m => m.includes('Ball manfiy'))) return null;\nreturn 'Xato xabari chiqmadi';"
    },
    {
      id: 3,
      title: "Tezlikni tekshirish",
      instruction: "`speed = 130` berilgan. Agar `speed > 120` bo'lsa `console.warn(\"Tezlik yuqori: \" + speed)` chiqaring, aks holda `console.log(\"Tezlik me'yorda\")` chiqaring.",
      startingCode: "const speed = 130;\n// speed > 120 bo'lsa console.warn, aks holda console.log chiqaring\n",
      hint: "if (speed > 120) {\n  console.warn(\"Tezlik yuqori: \" + speed);\n} else {\n  console.log(\"Tezlik me'yorda\");\n}",
      test: "if (!code.includes('console.warn')) return 'console.warn ishlatilmadi';\nlet out = [];\nconst orig = console.warn;\nconsole.warn = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.warn = orig; }\nif (out.some(m => m.includes('Tezlik yuqori') && m.includes('130'))) return null;\nreturn 'Tezlik yuqori ogohlantirishi chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "console.warn() metodi brauzer konsolida qaysi rangda ajralib turadi?",
      options: [
        "Sariq rangda va ogohlantirish belgisi bilan",
        "Qizil rangda va xatolik belgisi bilan",
        "Yashil rangda",
        "Oddiy qora matnda"
      ],
      correctAnswer: 0,
      explanation: "console.warn() ogohlantirish xabari hisoblanadi va sariq rang bilan ajratib ko'rsatiladi."
    },
    {
      id: 2,
      question: "console.error() chaqirilganda dastur ishlashdan butunlay to'xtab qoladimi?",
      options: [
        "Yo'q, faqat konsolga qizil xatolik xabarini chiqaradi, kod ishlashda davom etadi",
        "Ha, dastur darhol o'chadi",
        "Faqat brauzerda to'xtaydi",
        "Faqat serverda to'xtaydi"
      ],
      correctAnswer: 0,
      explanation: "console.error() dasturni to'xtatmaydi, u shunchaki konsolga qizil xabar chiqarish vositasidir."
    },
    {
      id: 3,
      question: "Dasturda jiddiy nosozlik yuz berganda dasturchiga xabar berish uchun qaysi metod eng mos keladi?",
      options: [
        "console.error()",
        "console.log()",
        "console.warn()",
        "console.clear()"
      ],
      correctAnswer: 0,
      explanation: "Jiddiy xatolik va nosozliklarni yaqqol ko'rsatish uchun console.error() eng to'g'ri tanlovdir."
    }
  ]
};
