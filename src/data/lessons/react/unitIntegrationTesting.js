export const unitIntegrationTesting = {
  id: "unitIntegrationTesting",
  title: "Unit va Integration Testing",
  content: `
# Dasturni Testlash: Unit va Integration Testing

Dasturchi sifatida biz kod yozamiz. Lekin ertaga boshqa bir dasturchi kelib loyihaga o'zgartirish kiritganda, bizning yozgan ishlayotgan kodimiz buzilib qolmasligiga kim kafolat beradi? **Testlar kafolat beradi!**

Dasturlashda testlash — bu biz yozgan kodlarning (funksiya yoki komponentlarning) xatosiz ishlayotganini avtomatik ravishda tekshiruvchi "Boshqa bir kodlar" yozishdir.

## 1. Test turlari

1. **Unit Testing (Birlik testlari):** Eng kichik qismlarni (masalan, bitta matematik funksiyani) boshqalardan ajratilgan holda tekshirish.
2. **Integration Testing (Birlashuv testlari):** Bir nechta funksiya yoki komponentlar o'zaro to'g'ri ma'lumot almashayotganligini tekshirish.
3. **E2E Testing (End-to-End):** Haqiqiy brauzerni ochib, haqiqiy foydalanuvchi kabi (tugmani bosib, sahifa o'tishini) to'liq simulyatsiya qilish (masalan, Cypress orqali).

Ushbu darsda biz birinchi va ikkinchi turlarga e'tibor qaratamiz.

## 2. Jest bilan tanishuv

React (va umuman JS) olamida eng mashhur test kutubxonasi bu **Jest** hisoblanadi (\`npm install --save-dev jest\`). Odatda Create React App yoki Vite bilan u o'rnatilgan yoki oson sozlanadigan bo'ladi.

Test fayllari odatda \`funksiyaNomi.test.js\` yoki \`funksiyaNomi.spec.js\` deb nomlanadi.

### Asosiy sintaksis:
- \`test()\` yoki \`it()\`: Bitta alohida testni yaratadi.
- \`expect()\`: Natijani kutadi (Kutilma).
- \`toBe()\`: Natija aynan qanday bo'lishi kerakligini bildiradi.
- \`describe()\`: Bir-biriga o'xshash testlarni bitta guruhga yig'adi.

## 3. Unit Test qanday yoziladi?

Keling, oddiy kalkulyator funksiyamizni test qilamiz.

\`\`\`javascript
// math.js (Bizning asosiy kodimiz)
export function add(a, b) {
  return a + b;
}

export function isEven(number) {
  return number % 2 === 0;
}
\`\`\`

Endi shu fayl uchun test yozamiz:
\`\`\`javascript
// math.test.js (Test faylimiz)
import { add, isEven } from './math';

// describe - barcha matematik testlarni bitta blokga yig'adi
describe("Matematik funksiyalar", () => {

  // 1-Test: add funksiyasi uchun
  test("2 ga 3 ni qo'shganda 5 chiqishi kerak", () => {
    const result = add(2, 3);
    expect(result).toBe(5); // Kutilma: result 5 ga teng bo'lsin!
  });

  // 2-Test: isEven funksiyasi uchun
  test("4 raqami juft bo'lishi kerak", () => {
    expect(isEven(4)).toBe(true); // toBeTruthy() ishlatsa ham bo'ladi
  });

  // 3-Test: Manfiy holatni tekshirish
  test("7 raqami juft Emas", () => {
    expect(isEven(7)).toBe(false); // toBeFalsy() ishlatsa ham bo'ladi
  });

});
\`\`\`

Terminalda \`npm run test\` yoki \`npx jest\` deb yozsak, u bizga **PASS** (O'tdi) yoki **FAIL** (Yiqildi) degan hisobotni beradi.

## 4. Integration Test nima?

Aytaylik, bizda \`calculateDiscount\` nomli funksiya bor. U ishida ikkita ish qiladi: 
1. Boshqa funksiyadan mijoz turini oladi (\`getUserType()\`).
2. Agar mijoz "VIP" bo'lsa, narxdan 20% chegirma qiladi.

Agar biz \`calculateDiscount\` ning to'g'ri ishlashini \`getUserType\` bilan birga test qilsak, bu **Integration Test** bo'ladi. Chunki biz ikkita alohida modul (funksiya) ning birgalikda (integratsiyada) ishlashini tekshiryapmiz.

\`\`\`javascript
// auth.js
export function getUserType(userId) {
  // Aslida bu ma'lumotlar bazasidan keladi deb faraz qilamiz
  if (userId === 1) return "VIP";
  return "NORMAL";
}

// shop.js
import { getUserType } from './auth';

export function calculatePrice(userId, price) {
  const type = getUserType(userId); // Boshqa modulga qaramlik (Dependency)
  if (type === "VIP") {
    return price * 0.8; // 20% chegirma
  }
  return price;
}
\`\`\`

Test qismi:
\`\`\`javascript
// shop.integration.test.js
import { calculatePrice } from './shop';

test("VIP mijoz (ID: 1) uchun 100$ lik tovarga 20% chegirma berilishi kerak", () => {
  const finalPrice = calculatePrice(1, 100);
  expect(finalPrice).toBe(80); // 100 ning 80 foizi
});

test("Oddiy mijoz (ID: 2) uchun chegirma berilmasligi kerak", () => {
  const finalPrice = calculatePrice(2, 100);
  expect(finalPrice).toBe(100);
});
\`\`\`

### Xulosa
- Testlar loyihangiz kelajakda buzilib qolishini oldini oluvchi sug'urtadir.
- **Unit test** — alohida funksiyalarni izolyatsiyada (yolg'iz) tekshiradi.
- **Integration test** — funksiyalar yoki modullarni biriktirib, zanjir to'g'ri ishlayotganligini tekshiradi.
  `,
  code: `// Odatda bu kodlar .test.js yoki .spec.js faylida yoziladi va 
// Terminalda (Node.js orqali) ishga tushiriladi. Brauzerda testlarni bevosita yurgizib bo'lmaydi.
// Lekin biz uning qanday ishlashini ko'z oldingizga keltirish uchun psevdo-muhit qildik.

import React, { useState } from "react";

// Faraz qilamiz bu utils.js faylida turgan oddiy funksiyalar
const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const getArrayLength = (arr) => arr.length;

export default function TestSimulation() {
  const [logs, setLogs] = useState([]);

  const runTests = () => {
    let newLogs = [];
    const logPass = (msg) => newLogs.push({ status: "PASS", msg });
    const logFail = (msg, error) => newLogs.push({ status: "FAIL", msg, error });

    // --- TEST 1 ---
    try {
      const result = capitalize("rEAcT");
      if (result === "React") {
        logPass("capitalize() funksiyasi kichik-katta harflarni to'g'rilay oldi ('React' ga aylantirdi)");
      } else {
        throw new Error(\`Kutilgan: "React", Keldi: "\${result}"\`);
      }
    } catch (e) {
      logFail("capitalize() ishlamadi", e.message);
    }

    // --- TEST 2 ---
    try {
      const result = capitalize("");
      if (result === "") {
        logPass("capitalize() bo'sh stringni xatosiz qaytardi");
      } else {
        throw new Error("Bo'sh stringda xato berdi");
      }
    } catch (e) {
      logFail("capitalize() ishlamadi", e.message);
    }

    // --- TEST 3 ---
    try {
      const len = getArrayLength([1, 2, 3]);
      if (len === 3) {
        logPass("getArrayLength() 3 ta elementli massivni to'g'ri sanadi");
      } else {
        throw new Error(\`Kutilgan: 3, Keldi: \${len}\`);
      }
    } catch (e) {
      logFail("getArrayLength() ishlamadi", e.message);
    }

    setLogs(newLogs);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace", background: "#1e1e1e", color: "#fff", height: "100vh" }}>
      <h2> Jest Test Simulyatori</h2>
      <p style={{ color: "#aaa" }}>"npm run test" buyrug'i terminalda taxminan shunday natija beradi:</p>
      
      <button 
        onClick={runTests}
        style={{ padding: "10px", background: "#2ecc71", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" }}
      >
        ▶ Testlarni Ishga Tushirish
      </button>

      <div>
        {logs.map((log, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", borderLeft: log.status === "PASS" ? "5px solid #2ecc71" : "5px solid #e74c3c", background: "#2d2d2d" }}>
            <strong style={{ color: log.status === "PASS" ? "#2ecc71" : "#e74c3c" }}>
              [{log.status}] 
            </strong> 
            <span style={{ marginLeft: "10px" }}>{log.msg}</span>
            {log.error && <p style={{ color: "#e74c3c", margin: "5px 0 0 45px" }}>Xato tafsiloti: {log.error}</p>}
          </div>
        ))}
        {logs.length > 0 && (
          <p style={{ color: "#aaa", marginTop: "20px" }}>
            Testlar o'tdi: {logs.filter(l => l.status === "PASS").length} / {logs.length}
          </p>
        )}
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Test Yozish",
      description: "Bizda ikkita sonni ko'paytiruvchi \`multiply(a, b)\` funksiyasi bor. Unga test yozing.",
      startingCode: `import { multiply } from './math';\n\n// VAZIFA: test() funksiyasini yozing. \n// 4 va 5 ni ko'paytirganda 20 chiqishini kutish (expect) qiling.\n`,
      solution: `import { multiply } from './math';\n\ntest("4 va 5 ning ko'paytmasi 20 chiqishi kerak", () => {\n  expect(multiply(4, 5)).toBe(20);\n});`,
      hint: "\`test('matn', () => { expect(multiply(4, 5)).toBe(20); })\` shaklida yozing."
    },
    {
      id: 2,
      title: "Massiv uzunligini tekshirish",
      description: "\`expect()\` yordamida \`users\` massivining uzunligi (length) 3 ga teng ekanligini tasdiqlang.",
      startingCode: `test("Massiv uzunligi 3 ga teng bo'lsin", () => {\n  const users = ['Ali', 'Vali', 'Gani'];\n  // VAZIFA: users.length ni tekshiring\n  expect(   ).toBe(   );\n});`,
      solution: `test("Massiv uzunligi 3 ga teng bo'lsin", () => {\n  const users = ['Ali', 'Vali', 'Gani'];\n  expect(users.length).toBe(3);\n});`,
      hint: "\`expect(users.length).toBe(3);\`"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dasturlashda testlash nima uchun muhim?",
      options: [
        "Dasturni rangli qilish uchun",
        "Ertaga koddagi o'zgarishlar (refactoring) sababli avval ishlayotgan narsalar buzilib qolmasligini kafolatlash uchun (avtomatlashtirilgan sug'urta)",
        "React ruxsat bermasligi uchun",
        "SEO (Qidiruv tizimlari) ni yaxshilash uchun"
      ],
      correctAnswer: 1,
      explanation: "Loyiha kattalashgani sari o'zingiz yozgan kodlaringiz nima qilishini unuta boshlaysiz. Testlar - siz kodni buzib qo'yganingizda darhol ogohlantiradigan signalizatsiyadir."
    },
    {
      id: 2,
      question: "Unit Test (Birlik testi) qanday ta'riflanadi?",
      options: [
        "Butun saytni brauzerda ochib tekshirish",
        "Faqat bitta kichik, yakkalangan mantiqni (funksiyani) tashqi aralashuvsiz izolyatsiyada tekshirish",
        "Ma'lumotlar bazasini tekshirish",
        "API serverni sinash"
      ],
      correctAnswer: 1,
      explanation: "Unit - bu birlik. Ya'ni bitta eng kichik g'ishtni buzilmasligini tekshiramiz. Masalan: ikkita sonni qo'shuvchi funksiya to'g'ri ishlayaptimi?"
    },
    {
      id: 3,
      question: "Jest testlarida kutilayotgan (natija shu bo'lishi shart) narsani qaysi funksiya orqali yozamiz?",
      options: [
        "console.log()",
        "check()",
        "expect(...).toBe(...)",
        "assert()"
      ],
      correctAnswer: 2,
      explanation: "Jest (va ko'pgina test kutubxonalarida) asosiy so'z bu 'expect' (Kutish). 'Men ushbu natijani 5 bo'lishini kutyapman' ma'nosida."
    },
    {
      id: 4,
      question: "Integration Test qanday ishlaydi?",
      options: [
        "U faqat CSS ni test qiladi",
        "U kodni xakerlardan himoya qiladi",
        "Ikki yoki undan ortiq funksiya/komponentlarning birgalikda o'zaro to'g'ri aloqa (integratsiya) qilayotganligini tekshiradi",
        "U faqat TypeScript da yoziladi"
      ],
      correctAnswer: 2,
      explanation: "Tasavvur qiling, motor (1-unit) ajoyib ishlaydi, g'ildiraklar (2-unit) yaxshi aylanadi. Lekin ular bir-biriga ulanganda moshina yurmay qoldi. Mana shu integratsiya xatosidir. Uni topish uchun Integration Testlar yoziladi."
    }
  ]
};
