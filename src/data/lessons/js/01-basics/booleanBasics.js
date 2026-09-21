export const booleanBasics = {
  id: "booleanBasics",
  title: "Boolean: true va false",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, devordagi chiroq yoqgichida (kalitida) faqat 2 ta holat bor:
- Yoqilgan (chiroq yonadi)
- O'chirilgan (chiroq o'chadi)

Uchinchisi yo'q: u yarimta yoqilgan bo'lolmaydi.

Dasturlashda Boolean turi xuddi shu ikki holatli chiroq kalitiga o'xshaydi.

Boolean (mantiqiy tur) — faqat ikkita qiymatdan birini: \`true\` (rost / ha) yoki \`false\` (yolg'on / yo'q) qabul qiladigan ma'lumot turidir.

---

## 2. Nega kerak?

Dasturlarda ko'pincha "Ha" yoki "Yo'q" degan aniq savollarga javob saqlash kerak bo'ladi:
- Foydalanuvchi tizimga kirganmi?
- Tovarlar omborda bormi?
- Tovush yoqilganmi?

Bunday ma'lumotlarni matn yoki son bilan saqlash noaniq bo'ladi. Boolean turi esa aniq \`true\` yoki \`false\` orqali bu savollarga javob saqlaydi.

---

## 3. Birinchi misol

Bu kod \`isOnline\` o'zgaruvchisiga \`true\` qiymatini beradi va konsolga chiqaradi.

\`\`\`javascript
let isOnline = true; // Foydalanuvchi tarmoqda (rost)
console.log(isOnline);
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isOnline = true;\` — \`isOnline\` nomli o'zgaruvchiga \`true\` mantiqiy qiymati berildi. \`true\` qo'shtirnoqsiz yoziladi.
- Nomlash uslubi: Boolean o'zgaruvchilari odatda savol ma'nosini beruvchi \`is...\` (\`isOnline\`, \`isCold\`) yoki \`has...\` (\`hasAccess\`) so'zlari bilan boshlanadi.
- \`console.log(isOnline);\` — konsolga \`true\` qiymati chiqadi.

---

## 5. Yana bitta misol

Bu kod \`isLoaded\` o'zgaruvchisiga \`false\` qiymatini beradi va konsolga chiqaradi.

\`\`\`javascript
let isLoaded = false; // Hali yuklanmagan (yolg'on)
console.log(isLoaded);
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

---

## 6. Ko'p uchraydigan xatolar

### 1. true yoki false ni qo'shtirnoqqa olish
❌ Xato tushuncha:
\`\`\`javascript
let isOnline = "true";
\`\`\`
Nima bo'ladi: \`isOnline\` Boolean bo'lmay qoladi, balki oddiy matn (String) bo'lib qoladi.
✅ To'g'ri variant:
\`\`\`javascript
let isOnline = true;
\`\`\`

### 2. Katta harflar bilan yozish
❌ Xato kod:
\`\`\`javascript
let isOnline = True;
\`\`\`
Nima bo'ladi: \`ReferenceError: True is not defined\` xatoligi yuz beradi. JavaScript'da \`true\` va \`false\` faqat kichik harflar bilan yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let isOnline = true;
\`\`\`

### 3. False deb yozish
❌ Xato kod:
\`\`\`javascript
let isReady = False;
\`\`\`
Nima bo'ladi: \`ReferenceError: False is not defined\` xatoligi yuz beradi.
✅ To'g'ri variant:
\`\`\`javascript
let isReady = false;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`isLightOn\` nomli o'zgaruvchi yarating, unga \`true\` qiymatini bering va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`hasPaid\` nomli o'zgaruvchi yarating, unga \`false\` qiymatini bering va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`ReferenceError\` xatosini to'g'rilang:
\`\`\`javascript
let isCompleted = True;
console.log(isCompleted);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let isLightOn = true;
console.log(isLightOn);
\`\`\`
2.
\`\`\`javascript
let hasPaid = false;
console.log(hasPaid);
\`\`\`
3.
\`\`\`javascript
let isCompleted = true; // True kichik harfda yoziladi
console.log(isCompleted);
\`\`\`

---

## 8. Xulosa

1. Boolean — faqat ikkita qiymatdan: \`true\` (ha/rost) yoki \`false\` (yo'q/yolg'on) dan iborat ma'lumot turi.
2. \`true\` va \`false\` har doim kichik harflar bilan va qo'shtirnoqsiz yoziladi.
3. Boolean o'zgaruvchilari odatda \`is...\` yoki \`has...\` so'zlari bilan nomlanadi (masalan, \`isOnline\`).

Keyingi darsda: Ma'lumot turini aniqlash uchun \`typeof\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "true qiymatli boolean yaratish",
      instruction: "`isLightOn` nomli o'zgaruvchi yarating (`let` bilan), unga `true` qiymatini bering va `console.log(isLightOn);` orqali chiqaring.",
      startingCode: "// isLightOn o'zgaruvchisini yarating va chiqaring\n",
      hint: "let isLightOn = true;\nconsole.log(isLightOn);",
      test: "if (code.includes('\"true\"') || code.includes(\"'true'\")) return 'true so\\'zini qo\\'shtirnoqsiz yozing';\nif (!code.includes('isLightOn')) return 'isLightOn nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true qiymati konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "false qiymatli boolean yaratish",
      instruction: "`hasPaid` nomli o'zgaruvchi yarating (`let` bilan), unga `false` qiymatini bering va konsolga chiqaring.",
      startingCode: "// hasPaid o'zgaruvchisini yarating va chiqaring\n",
      hint: "let hasPaid = false;\nconsole.log(hasPaid);",
      test: "if (code.includes('\"false\"') || code.includes(\"'false'\")) return 'false so\\'zini qo\\'shtirnoqsiz yozing';\nif (!code.includes('hasPaid')) return 'hasPaid nomli o\\'zgaruvchi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('false'))) return null;\nreturn 'false qiymati konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Katta harf xatosini tuzatish",
      instruction: "`let isCompleted = True;` dagi katta harf xatosini tuzating, toki konsolga `true` chiqsin.",
      startingCode: "let isCompleted = True;\nconsole.log(isCompleted);\n",
      hint: "let isCompleted = true;\nconsole.log(isCompleted);",
      test: "if (code.includes('True')) return 'True ni kichik harflar bilan true deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('true'))) return null;\nreturn 'true qiymati konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Boolean ma'lumot turida nechta mumkin bo'lgan qiymat bor?",
      options: [
        "Cheksiz ko'p",
        "Faqat ikkita: true va false",
        "Uchta: true, false, null",
        "Faqat 0 va 1"
      ],
      correctAnswer: 1,
      explanation: "Boolean turi faqat ikkita qiymatni qabul qiladi: true (rost) yoki false (yolg'on)."
    },
    {
      id: 2,
      question: "`let isOnline = \"true\";` qatoridagi `isOnline` qaysi ma'lumot turiga tegishli?",
      options: [
        "Boolean",
        "String (matn)",
        "Number (son)",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq ichiga yozilgan har qanday qiymat, hatto u \"true\" bo'lsa ham, String (matn) hisoblanadi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri JavaScript'da to'g'ri Boolean qiymat hisoblanadi?",
      options: [
        "True",
        "FALSE",
        "false",
        "\"false\""
      ],
      correctAnswer: 2,
      explanation: "JavaScript harflar registriga sezgir: Boolean qiymatlar faqat kichik harflar bilan true va false shaklida yoziladi."
    }
  ]
};
