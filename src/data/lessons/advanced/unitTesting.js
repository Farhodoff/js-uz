export const unitTesting = {
  id: "a22",
  title: "Testing va Debugging: Jest, Unit Tests, Integration Tests",
  theory: `## 1. NEGA kerak?
Dasturiy mahsulotlar kattalashgani sayn, ularni qo'lda (manual) test qilish imkonsiz va juda qimmatga tushadigan jarayonga aylanadi. **Avtomatlashtirilgan testlash (Automated Testing)** kodning sifati va xavfsizligini ta'minlash, koddagi o'zgarishlar yangi xatolarni keltirib chiqarmasligi hamda dasturchilar yangi funksiyalarni xotirjamlik bilan qo'shishlari uchun xizmat qilami.

## 2. SODDALIK (Analogiya)
Buni **avtomobil zavodidagi avtomatik sinov konveyeriga** o'xshatish mumkin. Avtomobil tayyor bo'lgach, har bir detal (tormoz, chiroqlar, dvigatel) alohida va birgalikda avtomatik uskunalar yordamida tekshiriladi. Agar qayerdadir nosozlik bo'lsa, tizim ogohlantiradi. Avtomatlashtirilgan testlar ham siz yozgan kodni turli sharoitlarda avtomatik tekshirib, xatolarni oldindan aniqlaydi.

## 3. CHUQUR NAZARIYA VA TUSHUNCHALAR

### A. Test Turlari va Test Piramidasi
Dasturiy ta'minotni test qilish odatda uch xil darajaga bo'linadi:
1. **Unit Tests (Birlik testlari - 80%):** Dasturning eng kichik bo'laklarini (alohida funksiya yoki metodlarni) boshqa bog'liqliklardan alohida (isolated) tekshiradi. Juda tez va arzon ishlaydi.
2. **Integration Tests (Integratsiyaviy testlar - 15%):** Bir nechta komponentlar yoki modullarning birgalikda, o'zaro to'g'ri bog'lanishini tekshiradi (masalan, API va ma'lumotlar bazasi hamkorligi).
3. **E2E (End-to-End, boshidan oxirigacha - 5%):** Haqiqiy foydalanuvchi oqimini (user flow) simulyatsiya qilib, butun dasturni brauzerda boshidan oxirigacha sinovdan o'tkazadi (masalan, login qilish, to'lovni yakunlash).

### B. TDD (Test-Driven Development)
TDD — bu kod yozishdan oldin uning testini yozish metodologiyasidir. U uchta bosqichdan iborat: **Red-Green-Refactor**:
1. **Red:** Avval muvaffaqiyatsiz bo'ladigan test yoziladi (chunki kod hali tayyor emas).
2. **Green:** Testdan muvaffaqiyatli o'tadigan eng minimal va sodda kod yoziladi.
3. **Refactor:** Kod tozalanadi, arxitekturasi yaxshilanadi, lekin testlar yashil holatda qolishi nazorat qilinadi.

\`\`\`mermaid
graph TD
    Red[1. RED: Muvaffaqiyatsiz test yozish] -->|Kod hali yozilmagan| Green[2. GREEN: Testdan o'tuvchi minimal kod yozish]
    Green -->|Testlar yashil bo'ldi| Refactor[3. REFACTOR: Kodni tozalash va optimallashtirish]
    Refactor -->|Yangi funksionallik uchun| Red
    style Red fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
    style Green fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff
    style Refactor fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff
\`\`\`

### C. AAA Pattern (Arrange-Act-Assert)
Har bir test blokini quyidagi uch qismga bo'lish toza va o'qiladigan testlar yozish qoidasidir:
- **Arrange (Tayyorlash):** Test uchun kerakli ma'lumotlar, obyektlar yoki mocklarni tayyorlash.
- **Act (Bajarish):** Test qilinayotgan funksiya yoki metodni chaqirish.
- **Assert (Tasdiqlash):** Olingan natija kutilgan natijaga to'g'ri kelishini tekshirish (\`expect\` yordamida).

\`\`\`javascript
test("sum funksiyasi 2 va 2 ni qo'shganda 4 berishi kerak", () => {
  // 1. Arrange
  const a = 2;
  const b = 2;

  // 2. Act
  const result = sum(a, b);

  // 3. Assert
  expect(result).toBe(4);
});
\`\`\`

### D. Soxtalashtirish: Mocks, Stubs va Spies
1. **Stub (Soxta javob):** Haqiqiy funksiyaga murojaat qilmasdan, faqat oldindan tayyorlangan statik ma'lumotni qaytaruvchi eng sodda obyekt.
2. **Spy (Josus):** Haqiqiy funksiyani saqlagan holda, uning necha marta chaqirilgani, qanday parametrlar uzatilganini kuzatib boradi (\`vi.spyOn\` yoki \`jest.spyOn\`).
3. **Mock (Soxta obyekt):** Tashqi bog'liqliklarni (API so'rovlari, ma'lumotlar bazasi ulanishi) butunlay soxta obyekt bilan almashtirish va ularni tekshirish (\`vi.fn\` yoki \`jest.fn\`).

### E. Fake Timers (Soxta taymerlar)
Asinxron taymerlar (\`setTimeout\`, \`setInterval\`) real vaqtni talab qiladi. Agar testda 10 soniyalik kechikish bo'lsa, real rejimda test 10 soniya kutadi va sekinlashadi.
**Fake Timers** yordamida vaqt oqimini dasturiy ravishda boshqarish mumkin. Taymerlar soxtalashtiriladi va vaqt bir zumda kerakli miqdorga oldinga suriladi:

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant Test as Test Suite
    participant Clock as Fake Timer System
    participant Callback as setTimeout Callback

    Test->>Clock: vi.useFakeTimers() (Taymerni soxtalashtirish)
    Test->>Clock: setTimeout(callback, 5000) (5 soniyalik kutish)
    Note over Clock: Soxta soat ishga tushdi (t = 0ms)
    Test->>Clock: vi.advanceTimersByTime(5000) (Vaqtni 5s oldinga surish)
    Note over Clock: Soat vaqti o'zgardi (t = 5000ms)
    Clock->>Callback: Callback funksiyasini chaqirish
    Callback-->>Test: Callback bajarildi (Sinxron tekshiruv)
    Test->>Clock: vi.useRealTimers() (Asl holatga qaytarish)
\`\`\`

## 4. XATOLAR (Common mistakes)
- **Fragile Tests (Mo'rt testlar):** Test kodi ichki o'zgarishlarga (implementation details) haddan tashqari bog'lanib qolsa, funksionallik buzilmagan taqdirda ham testlar yiqila boshlaydi.
- **Asinxron testlarda await/return unutish:** Asinxron kodlarni test qilishda \`await\` qo'yilmasa yoki Promise qaytarilmasa, test natijani kutmasdan muvaffaqiyatli deb o'tib ketadi va yashirin xatolarni aniqlay olmaydi.
- **Test Isolation buzilishi:** Testlar global o'zgaruvchilarni o'zgartirib, bir-birining natijasiga ta'sir o'tkazishi. Buni oldini olish uchun har doim \`beforeEach\` va \`afterEach\` metodlarida holatni tozalash lozim.

## 5. SAVOLLAR VA JAVOBLAR
**1. Jest/Vitest-da toEqual() va toBe() farqi nimada?**
\`toBe()\` xotiradagi referenslarni (primitiv qiymatlar) solishtiradi. \`toEqual()\` esa obyekt va massivlarning ichki qiymatlarini chuqur tekshiradi.

**2. Test Coverage nima?**
Loyiha kodining necha foiz qatori, shoxlanishi (if/else) va funksiyalari testlar orqali qamrab olinganini ko'rsatuvchi hisobot.

**3. vi.fn() nima uchun ishlatiladi?**
Soxta funksiyalar (mock function) yaratish, ulardan qaytadigan qiymatni belgilash va ularning chaqirilganligini kuzatish uchun.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Test",
      instruction: "sum(2,2) = 4 bo'lishini tekshiring.",
      startingCode: "function sum(a,b) { return a + b; }\n// Test yozing\n",
      hint: "if (sum(2,2) !== 4) throw new Error('Test failed');",
      test: "if (code.includes('sum(2,2)')) return null; return 'Test yoq';"
    },
    {
      id: 2,
      title: "2️⃣ Jest Test",
      instruction: "Jest'da test yozing - test() funksiyasi bilan.",
      startingCode: "test('sum 2+2', () => {\n  // Bu yerga yozing\n});\n",
      hint: "expect(sum(2,2)).toBe(4);",
      test: "if (code.includes('expect')) return null; return 'Jest test xato';"
    },
    {
      id: 3,
      title: "3️⃣ Describe va Test",
      instruction: "describe bilan test suite yarating.",
      startingCode: "describe('sum', () => {\n  test('2+2=4', () => {\n    expect(sum(2,2)).toBe(4);\n  });\n});\n",
      hint: "Mavjud",
      test: "if (code.includes('describe')) return null; return 'Describe xato';"
    },
    {
      id: 4,
      title: "4️⃣ beforeEach",
      instruction: "beforeEach'da o'zgaruvchi tayyorlang.",
      startingCode: "let value;\nbeforeEach(() => {\n  // Bu yerga value = 10\n});\ntest('test', () => {\n  expect(value).toBe(10);\n});\n",
      hint: "value = 10;",
      test: "if (code.includes('beforeEach')) return null; return 'beforeEach xato';"
    },
    {
      id: 5,
      title: "5️⃣ Matchers",
      instruction: "toBeTruthy(), toBeNull(), toContain() ishlatib ko'ring.",
      startingCode: "test('matchers', () => {\n  expect(true).toBeTruthy();\n  // Bu yerga boshqa matchers\n});\n",
      hint: "expect(null).toBeNull(); expect([1,2,3]).toContain(2);",
      test: "if (code.includes('toBe')) return null; return 'Matchers xato';"
    },
    {
      id: 6,
      title: "6️⃣ Mock Function",
      instruction: "jest.fn() orqali mock funksiya yarating.",
      startingCode: "test('mock', () => {\n  const mockFn = jest.fn();\n  mockFn(1,2);\n  // Bu yerga toHaveBeenCalledWith\n});\n",
      hint: "expect(mockFn).toHaveBeenCalledWith(1,2);",
      test: "if (code.includes('jest.fn')) return null; return 'Mock xato';"
    },
    {
      id: 7,
      title: "7️⃣ Async Test",
      instruction: "async/await test yozing.",
      startingCode: "test('async', async () => {\n  // Bu yerga await\n});\n",
      hint: "const data = await fetchData(); expect(data).toBe(...)",
      test: "if (code.includes('async')) return null; return 'Async test xato';"
    },
    {
      id: 8,
      title: "8️⃣ toThrow",
      instruction: "Funksiya error throw qilishini tekshiring.",
      startingCode: "function divide(a, b) {\n  if (b === 0) throw new Error('Nolga bo\\'lish mumkin emas');\n  return a / b;\n}\ntest('error', () => {\n  // Bu yerga yozing\n});\n",
      hint: "expect(() => divide(5,0)).toThrow();",
      test: "if (code.includes('toThrow')) return null; return 'toThrow xato';"
    },
    {
      id: 9,
      title: "9️⃣ Spy",
      instruction: "jest.spyOn orqali funksiyani watch qiling.",
      startingCode: "const obj = { method: () => 'original' };\ntest('spy', () => {\n  const spy = jest.spyOn(obj, 'method');\n  // Bu yerga yozing\n});\n",
      hint: "expect(spy).toHaveBeenCalled();",
      test: "if (code.includes('spyOn')) return null; return 'Spy xato';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Mock Module",
      instruction: "jest.mock() orqali modul mock qiling.",
      startingCode: "jest.mock('./api', () => ({\n  fetch: jest.fn(() => Promise.resolve({data: 'test'}))\n}));\ntest('mock module', async () => {\n  // Bu yerga yozing\n});\n",
      hint: "const data = await fetch(); expect(data.data).toBe('test');",
      test: "if (code.includes('jest.mock')) return null; return 'Mock module xato';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Coverage",
      instruction: "Barcha branch'larini test qiling (if/else).",
      startingCode: "function check(x) {\n  if (x > 0) return 'positive';\n  return 'negative';\n}\ntest('positive', () => expect(check(5)).toBe('positive'));\n// Bu yerga negative test\n",
      hint: "test('negative', () => expect(check(-1)).toBe('negative'));",
      test: "if (code.includes('negative')) return null; return 'Coverage xato';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Kompleks - Full Test Suite",
      instruction: "describe + multiple tests + beforeEach + matchers.",
      startingCode: "describe('Calculator', () => {\n  let calc;\n  beforeEach(() => { calc = new Calculator(); });\n  test('add', () => { expect(calc.add(2,2)).toBe(4); });\n  // Bu yerga subtract test\n});\n",
      hint: "test('subtract', () => { expect(calc.sub(5,2)).toBe(3); });",
      test: "if (code.includes('beforeEach') && code.includes('describe')) return null; return 'Full suite xato';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Soxta Taymerlarni Sinash (testFakeTimers)",
      instruction: "Jest/Vitest fake timers yordamida vaqtni boshqarishni tekshiruvchi `testFakeTimers(callback, delay)` funksiyasini yozing. Funksiya ichida soxta taymerlarni faollashtiring (`vi.useFakeTimers` yoki `jest.useFakeTimers`), `setTimeout` orqali `callback`ni `delay` vaqtga o'rnating, vaqtni bir zumda `delay` ga oldinga suring (`vi.advanceTimersByTime` yoki `jest.advanceTimersByTime`) va yakunda taymerlarni real holatga qaytaring (`vi.useRealTimers` yoki `jest.useRealTimers`).",
      startingCode: "function testFakeTimers(callback, delay) {\n  // Kodni shu yerdan yozing\n}",
      hint: "vi.useFakeTimers();\nsetTimeout(callback, delay);\nvi.advanceTimersByTime(delay);\nvi.useRealTimers();",
      test: "if (typeof testFakeTimers !== 'function') return 'testFakeTimers funksiya emas';\nif (!code.includes('useFakeTimers') || !code.includes('advanceTimersByTime') || !code.includes('useRealTimers')) {\n  return 'useFakeTimers, advanceTimersByTime va useRealTimers metodlaridan foydalaning';\n}\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ API So'rovini Mock Qilish (mockApiCall)",
      instruction: "Tarmoq yoki ma'lumotlar bazasi so'rovlarini soxtalashtirish uchun `apiClient` obyektining `fetchData` metodini mock qiling. `fetchData` metodi har doim `{ success: true, data: mockData }` obyektini qaytaradigan Promise bo'lishi kerak. Buning uchun `vi.fn().mockResolvedValue(...)` yoki `jest.fn().mockResolvedValue(...)` metodidan foydalanuvchi `mockApiCall(apiClient, mockData)` funksiyasini yozing.",
      startingCode: "function mockApiCall(apiClient, mockData) {\n  // Kodni shu yerdan yozing\n}",
      hint: "apiClient.fetchData = vi.fn().mockResolvedValue({ success: true, data: mockData });",
      test: "if (typeof mockApiCall !== 'function') return 'mockApiCall funksiya emas';\nif (!code.includes('fn()') && !code.includes('mockResolvedValue') && !code.includes('mockReturnValue')) {\n  return 'fn() va mockResolvedValue (yoki mockReturnValue) metodlaridan foydalaning';\n}\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Test Pyramidi (Test piramidasi) modeliga ko'ra, qaysi turdagi testlar loyihada eng ko'p (odatda 80% gacha) bo'lishi tavsiya etiladi?",
      options: [
        "E2E (End-to-End) Tests — chunki ular butun tizimni sinab beradi",
        "Unit Tests (Birlik testlari) — chunki ular alohida funksiyalarni juda tez va arzon tekshiradi",
        "Integration Tests (Integratsiya testlari) — chunki ular modullar bog'lanishini tekshiradi",
        "Manual Tests (Qo'lda bajariladigan testlar)"
      ],
      correctAnswer: 1,
      explanation: "Unit testlar dasturning eng kichik bo'laklarini (funksiyalarni) boshqa bog'liqliklardan alohida holda tekshiradi. Ular juda tez ishlaydi va yaratish arzon bo'lgani uchun test piramidasining asosini tashkil qilishi shart."
    },
    {
      id: 2,
      question: "Test yozishda ko'p qo'llaniladigan AAA (Arrange-Act-Assert) andozasi (pattern) deganda nimani tushunasiz?",
      options: [
        "Test yozishdan oldin kodni avtomatik formatlash",
        "Testlarni 3 ta alohida bosqichga bo'lish: 1) Test muhitini va o'zgaruvchilarni tayyorlash (Arrange), 2) Test qilinayotgan funksiyani bajarish (Act), 3) Olingan natija kutilgan natijaga mosligini tasdiqlash/tekshirish (Assert)",
        "Testlarni Jest, Mocha va Cypress yordamida parallel ishga tushirish",
        "Test nomi, uning tavsifi va xatolik xabarining bosh harflari"
      ],
      correctAnswer: 1,
      explanation: "AAA pattern test kodining o'qiluvchanligini oshiradi. Arrange - sharoit yaratish (obyektlar, mocklar); Act - sinovdagi funksiyani chaqirish; Assert - natijani tekshirish (`expect` yordamida)."
    },
    {
      id: 3,
      question: "Jest kutubxonasida `{a: 1}` ko'rinishidagi obyekt yoki massiv ichidagi barcha xususiyatlarni chuqur tekshirish (deep equality) uchun qaysi matcher metodi ishlatiladi?",
      options: [
        "`expect(obj).toBe({a: 1})` (chunki obyektlar referensi tekshiriladi)",
        "`expect(obj).toEqual({a: 1})`",
        "`expect(obj).toBeSame({a: 1})`",
        "`expect(obj).toDeepEqual({a: 1})`"
      ],
      correctAnswer: 1,
      explanation: "`toBe` matcheri referenslarni (xotiradagi manzilni) solishtiradi. Obyekt va massivlar tarkibini (qiymatlarini) chuqur taqqoslash uchun Jest'da har doim `toEqual` matcheri ishlatiladi."
    },
    {
      id: 4,
      question: "Jest frameworkida har bir test ishga tushishidan oldin umumiy ma'lumotlar bazasini tayyorlash yoki o'zgaruvchilarni qayta tozalab boshlang'ich qiymatga keltirish uchun qaysi lifecyle metodidan foydalaniladi?",
      options: [
        "`beforeAll()`",
        "`beforeEach()`",
        "`afterEach()`",
        "`initTest()`"
      ],
      correctAnswer: 1,
      explanation: "`beforeEach` har bir test blokidan (`test` yoki `it`) oldin ishga tushadi. Bu testlar bir-birining holatiga ta'sir qilmasligini (test isolation) ta'minlash uchun xizmat qiladi."
    },
    {
      id: 5,
      question: "Test yozishda Mocking va Spying (Spy) tushunchalari o'rtasidagi asosiy farq nimada?",
      options: [
        "Ikkalasi ham mutqalo bir xil narsa, farqi yo'q",
        "Mock - bu real obyektdan butunlay voz kechib soxta (fake) funksiya ishlatish; Spy esa real obyekt/funksiyani saqlagan holda uning qanday chaqirilganini (necha marta, qanday argumentlar bilan) kuzatishdir",
        "Spy faqat asinxron funksiyalar bilan ishlaydi",
        "Mock faqat E2E testlarida ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "`jest.fn()` soxta (mock) funksiya yaratadi va uning ichki qismi aslini takrorlamaydi. `jest.spyOn()` esa vaqtinchalik real obyektni kuzatadi."
    },
    {
      id: 6,
      question: "Test yozishda 'Test Isolation' (testlarning mustaqilligi) tamoyili nimani anglatadi?",
      options: [
        "Barcha testlarni bitta katta faylga yozish",
        "Har bir test mustaqil ishlashi, bir testning natijasi yoki o'zgartirgan ma'lumotlari boshqa testlarning o'tishiga ta'sir qilmasligi kerakligi",
        "Testlarni faqat offlayn (internetsiz) rejimda ishga tushirish",
        "Testlarni faqat alohida serverda bajarish"
      ],
      correctAnswer: 1,
      explanation: "Har bir test alohida ishga tushirilganda ham, parallel yoki tartibsiz bajarilganda ham bir xil natija verishi kerak. Buning uchun beforeEach va afterEach yordamida state tozalab olinadi."
    },
    {
      id: 7,
      question: "Integration Testing (Integratsiyaviy testlash) birlik testlaridan (Unit Testing) qanday farq qiladi?",
      options: [
        "U faqat bitta funksiyani test qiladi",
        "U bir nechta modullar yoki tizimlarning (masalan, API va Ma'lumotlar bazasi) birgalikda to'g'ri ishlashini va o'zaro aloqasini tekshiradi",
        "U faqat CSS fayllarini tekshiradi",
        "Uni faqat foydalanuvchilar qo'lda bajaradi"
      ],
      correctAnswer: 1,
      explanation: "Unit test faqat alohida izolyatsiyalangan kod bo'lagini tekshirsa, integration test esa bir nechta bog'liq komponentlar yoki uchinchi tomon xizmatlarining birgalikdagi integratsiyasini tekshiradi."
    },
    {
      id: 8,
      question: "E2E (End-to-End, boshidan oxirigacha) testlashning asosiy afzalligi nimada?",
      options: [
        "U juda tez ishlaydi va loyiha build vaqtini kamaytiradi",
        "U butun tizimni real brauzer muhitida, foydalanuvchi ko'zi bilan (haqiqiy tugmalarni bosib, formani to'ldirib) boshidan oxirigacha sinab beradi",
        "U JavaScript kodini avtomat ravishda optimallashtiradi",
        "U faqat mobil ilovalar uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "E2E testlar (masalan, Cypress, Playwright yordamida) haqiqiy brauzerda foydalanuvchining butun oqimini (user flow) simulyatsiya qilib tekshiradi."
    },
    {
      id: 9,
      question: "Test Coverage (Test qamrovi) deganda nima tushuniladi?",
      options: [
        "Loyihadagi JavaScript kodining necha foizi testlar tomonidan bajarilgani va tekshirilganini ko'rsatuvchi ko'rsatkich (foizda)",
        "Test fayllarining umumiy hajmi (Megabaytlarda)",
        "Testlarni yozishga ketgan jami vaqt",
        "GitHub'ga yuklangan testlar soni"
      ],
      correctAnswer: 0,
      explanation: "Test coverage loyiha kodining qaysi qatorlari (lines), shoxlanishlari (branches, if/else) va funksiyalari testlar davomida kamida bir marta chaqirilganini foizda hisoblab beradi."
    },
    {
      id: 10,
      question: "TDD (Test-Driven Development - testlar orqali ishlab chiqish) metodologiyasining asosiy qadami qanday?",
      options: [
        "Avval kodni yozish, keyin edi uni test qilish, oxirida xatolarni tuzatish",
        "Avval test yozish (u muvaffaqiyatsiz bo'ladi - Red), so'ngra testdan o'tadigan minimal kod yozish (Green), va oxirida kodni refaktoring qilish (Refactor)",
        "Faqa tayyor loyihani test qilish",
        "Testlarni butunlay rad etib, faqat manual tekshirish"
      ],
      correctAnswer: 1,
      explanation: "TDD uch bosqichli 'Red-Green-Refactor' sikliga tayanadi. U yondashuv toza, tushunarli va testlar bilan to'liq qoplangan arxitekturani qurishga yordam beradi."
    },
    {
      id: 11,
      question: "Asinxron funksiyalarni (masalan, API fetch so'rovlarini) Jest'da qanday to'g'ri test qilish kerak?",
      options: [
        "Faqat `setTimeout` ishlatish kerak",
        "Test callback funksiyasini `async` qilib e'lon qilish va asinxron chaqiriqlar oldidan `await` kalit so'zini qo'llash yoki Promise qaytarish",
        "Asinxron kodlarni sinxron holga keltirish",
        "Asinxron funksiyalarni test qilish imkonsiz"
      ],
      correctAnswer: 1,
      explanation: "Jest asinxron testlarni qo'llab-quvvatlaydi. Agar callback asinxron bo'lsa, async/await qo'llaniladi. Aks holda Jest promisening yakunlanishini kutmasdan testni yakunlab yuboradi."
    },
    {
      id: 12,
      question: "Jest matcheri `toThrow()` nima uchun ishlatiladi?",
      options: [
        "Funksiya kutilgan xatolikni (error/exception) otishini (throw qilishini) tekshirish uchun",
        "Funksiya hech qanday xatosiz ishlashini tekshirish uchun",
        "Dasturni darhol to'xtatish uchun",
        "Promise rad etilganini (rejected) tekshirish uchun"
      ],
      correctAnswer: 0,
      explanation: "`expect(() => fn()).toThrow()` matcheri berilgan funksiya chaqirilganda xatolik (Exception) yuz berishini tekshiradi. Muhimi, tekshirilayotgan funksiya alohida anonim funksiya ichida chaqirilishi kerak."
    },
    {
      id: 13,
      question: "Vitest yoki Jest-da asinxron kechikishlarni (masalan, 10 soniyalik `setTimeout`) test qilishda nima uchun real vaqtni kutish o'rniga Fake Timers ishlatiladi?",
      options: [
        "Chunki real vaqtda testlar juda sekin ishlaydi va loyiha build qilish jarayonini kechiktiradi, Fake Timers esa vaqtni sinxron va bir zumda oldinga surib beradi",
        "Chunki real vaqtda asinxron operatsiyalar xotira sizib chiqishiga olib keladi",
        "Chunki asinxron kodlarni real vaqtda test qilish xavfsizlik nuqtai nazaridan taqiqlangan",
        "Chunki real taymerlar faqat server muhitida ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Fake Timers yordamida sinov muhiti vaqtni o'z nazoratiga oladi. `advanceTimersByTime()` metodi orqali vaqtni soniyalar yoki daqiqalarga bir zumda oldinga surib, asinxron hodisalar chaqirilishini kutmasdan tezkor va sinxron tekshirish imkonini beradi."
    },
    {
      id: 14,
      question: "Testlashda Mock, Stub va Spy tushunchalari o'rtasidagi asosiy farqlar nimada?",
      options: [
        "Mock va Stub faqat brauzerda, Spy esa faqat Node.js da ishlaydi",
        "Stub — faqat oldindan tayyorlangan ma'lumotlarni qaytaradi; Spy — real funksiyani saqlab, uning chaqirilish parametrlarini kuzatadi; Mock — o'zida ham xatti-harakatni, ham kutilayotgan chaqiriqlar tekshiruvini birlashtiradi",
        "Ular o'rtasida hech qanday farq yo'q, sinonim so'zlar",
        "Spy faqat xatoliklarni aniqlaydi, Stub esa ma'lumotlarni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "Stub - oddiy soxtalashtirilgan javob (dummy data). Spy - chaqiriqlarni kuzatuvchi josus (necha marta, qanday parametrlar). Mock - murakkabroq soxta obyekt bo'lib, o'zida shartlar va assertion'larni ham saqlaydi."
    }
  ]
};
