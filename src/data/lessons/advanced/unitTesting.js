export const unitTesting = {
  id: "unitTesting",
  title: "Javascript-da Unit Testing va Jest asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Unit Testing va Jest nima?
* **Unit Testing (Birlik testi):** Dasturimizning eng kichik mantiqiy bo'laklarini (odatda alohida funksiyalarni) butun tizimdan ajratgan holda alohida tekshirib chiqish jarayonidir.
* **Jest:** JavaScript va TypeScript loyihalari uchun Meta (Facebook) tomonidan yaratilgan eng oson, tezkor va mashhur test yozish framework-idir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **avtomobil zavodida muhandissiz**:
* **Haqiqiy sinov:** Mashina tayyor bo'lgandan keyin haydab ko'rish — bu *End-to-End (E2E) yoki integratsion test*. U uzoq vaqt va katta xarajat talab qiladi.
* **Unit Test:** Mashina yig'ilishidan oldin har bir **motor porsheni, tormoz diski va fara chirog'ini** alohida-alohida stanokda tekshirish. Agar fara chirog'iga 12V tok berilganda yonsa, u sinovdan o'tadi. Bu oson, tez va xatolik qayerdaligini darhol ko'rsatib beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Math funksiyasini test qilish)
Keling, oddiy matematik amallarni bajaruvchi funksiyani yozamiz va uni Jest-da test qilamiz.
\`\`\`javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// math.test.js
const { add } = require('./math');

test('add funksiyasi 2 va 3 sonlarini qo\\'shganda 5 qaytarishi kerak', () => {
  // expect - kutilayotgan qiymatni belgilaydi
  // toBe - natijani tekshiruvchi matcher (assert)
  expect(add(2, 3)).toBe(5);
});
\`\`\`

### 2. Intermediate Example (Obyektlarni tekshirish va Setup/Teardown)
Massiv va obyektlarni chuqur tekshirish (deep equality) hamda testdan oldin ma'lumotlarni sozlash:
\`\`\`javascript
// userStore.js
class UserStore {
  constructor() {
    this.users = [];
  }
  addUser(user) {
    this.users.push(user);
  }
  getUsers() {
    return this.users;
  }
}
module.exports = UserStore;

// userStore.test.js
const UserStore = require('./userStore');

describe('UserStore Tests', () => {
  let store;

  // Har bir testdan oldin yangi store obyekti yaratiladi
  beforeEach(() => {
    store = new UserStore();
  });

  test('addUser yangi foydalanuvchini qo\\'shishi lozim', () => {
    const user = { id: 1, name: 'Sardor' };
    store.addUser(user);
    
    // toEqual obyekt ichidagi qiymatlarni solishtirish uchun ishlatiladi
    expect(store.getUsers()).toEqual([ { id: 1, name: 'Sardor' } ]);
  });
});
\`\`\`

### 3. Advanced Example (Mocking va Asinxron test qilish)
Tashqi API so'rov yuboradigan funksiyani test qilishda tarmoqqa bog'lanib qolmaslik uchun so'rovni soxtalashtiramiz (mocking):
\`\`\`javascript
// userService.js
const axios = require('axios');

async function fetchUser(id) {
  const response = await axios.get(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  return response.data;
}
module.exports = { fetchUser };

// userService.test.js
const { fetchUser } = require('./userService');
const axios = require('axios');

// Axios kutubxonasini mock qilamiz
jest.mock('axios');

test('fetchUser asinxron ravishda foydalanuvchini olishi kerak', async () => {
  const mockUser = { id: 1, name: 'Tolib' };
  
  // Axios.get metodining mock javobini sozlaymiz
  axios.get.mockResolvedValue({ data: mockUser });

  const result = await fetchUser(1);
  
  expect(result.name).toBe('Tolib');
  expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
});
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Regressiya (Regression):** Koddagi yangi o'zgarishlar tufayli eski ishlayotgan qismlar buzilib ketishi. Testlar bo'lsa, regressiya darhol aniqlanadi.
* **Qo'rqinchli refaktoring (Fear of Refactoring):** Eski yozilgan kodni o'zgartirish yoki optimallashtirishdan qo'rqish. Testlar kodning to'g'ri ishlashini kafolatlasa, bemalol refaktoring qilish mumkin.
* **Hujjatlashtirish:** Testlar kodning nima ish qilishi kerakligini tushuntiruvchi eng ishonchli va yangilanib turadigan texnik hujjat (documentation) vazifasini o'taydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Obyekt yoki massivlarni \`toBe()\` orqali tekshirish
#### Xato:
\`\`\`javascript
// Noto'g'ri! Massivlar xotirada turli manzilda bo'lgani uchun test o'tmaydi
expect([1, 2]).toBe([1, 2]);
\`\`\`
#### To'g'ri usul:
\`\`\`javascript
// Obyekt va massivlar qiymatini tekshirishda toEqual() ishlatish shart
expect([1, 2]).toEqual([1, 2]);
\`\`\`

### 2. Asinxron testlarda \`await\` ishlatishni unutish
#### Xato:
\`\`\`javascript
test('data is fetched', () => {
  const data = fetchData(); // Promise qaytaradi
  expect(data.status).toBe('ok'); // Xatolik beradi yoki test soxta o'tib ketadi
});
\`\`\`
#### To'g'ri usul:
\`\`\`javascript
test('data is fetched', async () => {
  const data = await fetchData();
  expect(data.status).toBe('ok');
});
\`\`\`

### 3. Testlar o'rtasida global holatni (state) baham ko'rish
#### Xato:
Bitta testda global o'zgaruvchi o'zgartirilsa, keyingi testlar xato ishlay boshlaydi.
#### To'g'ri usul:
\`beforeEach\` yoki \`afterEach\` hooklari ichida har doim holatni tozalab, yangidan yaratish kerak.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Unit Test nima?
   * **Javob:** Dasturning eng kichik funksional qismini (birligini) qolgan kodlardan ajratgan holda alohida sinab ko'rish.
2. **Savol:** Jest-da \`.toBe()\` va \`.toEqual()\` farqi nimada?
   * **Javob:** \`.toBe()\` ibtidoiy qiymatlar va referenslarni tekshiradi, \`.toEqual()\` esa obyekt va massivlarning tarkibini (qiymatlarini) solishtiradi.
3. **Savol:** Test-dagi \`describe\` va \`it/test\` farqi nimada?
   * **Javob:** \`describe\` testlarni guruhlash uchun, \`it\` yoki \`test\` esa aniq bitta test senariysini yozish uchun ishlatiladi.
4. **Savol:** \`beforeEach\` va \`afterEach\` qachon bajariladi?
   * **Javob:** \`beforeEach\` har bir test ishga tushishidan oldin, \`afterEach\` esa har bir test tugagandan keyin ishlaydi.

### Middle (5–8)
5. **Savol:** Mocking nima va nima uchun kerak?
   * **Javob:** Haqiqiy tizimlarga (masalan, API, File System) bog'liqlikni yo'qotish uchun ularning o'rniga soxta, boshqariladigan versiyalarini (mocks) ishlatish.
6. **Savol:** \`jest.fn()\` va \`jest.spyOn()\` farqi nimada?
   * **Javob:** \`jest.fn()\` butunlay yangi soxta funksiya yaratadi. \`jest.spyOn()\` esa mavjud obyektning haqiqiy metodini kuzatishga (va ixtiyoriy ravishda mock qilishga) imkon beradi.
7. **Savol:** Code Coverage (qamrov foizi) nima?
   * **Javob:** Loyihamizdagi kodning necha foiz qatori yoki shartlari testlar tomonidan bajarilganini ko'rsatadigan statistika.
8. **Savol:** Jest-da asinxron kodlarni qanday test qilish mumkin?
   * **Javob:** Test funksiyasini \`async\` qilib \`await\` ishlatish, Promise qaytarish yoki \`done()\` callback-dan foydalanish orqali.

### Senior (9–12)
9. **Savol:** TDD (Test Driven Development) nima va uning foydasi nimada?
   * **Javob:** Dastlab test yozib, keyin kod yozish yondashuvi. Bu kodning arxitekturasini toza saqlash, ortiqcha kod yozmaslik va yuqori test qamrovini ta'minlashga yordam beradi.
10. **Savol:** Jest-da modullarni mock qilishda \`jest.mock()\` qanday ishlaydi va uning hoisting xususiyati nima?
    * **Javob:** \`jest.mock()\` fayl importlaridan oldin bajarilishi (hoisted) kerak. Jest compile paytida uni avtomatik ravishda faylning eng tepasiga ko'chiradi.
11. **Savol:** Katta loyihalarda testlarning tezligini qanday oshirish mumkin?
    * **Javob:** Testlarni parallel ishlatish (\`--maxWorkers\`), keraksiz og'ir kutubxonalarni mock qilish, keshdan foydalanish va faqat o'zgargan fayllarni test qilish (\`--watch\` yoki \`--onlyChanged\`).
12. **Savol:** Jest-dagi Snapshot testing nima va uni qachon ishlatgan ma'qul?
    * **Javob:** UI komponentlar yoki murakkab JSON javoblarni saqlab qolib, keyingi o'zgarishlarda eski snapshot bilan solishtirish. UI renderi kutilmaganda o'zgarib ketmasligini tekshirish uchun qulay.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Savatcha (Shopping Cart) logikasini test qilish
Elektron tijorat loyihasida savatga mahsulot qo'shish, o'chirish va yakuniy narxni hisoblash qismlarini TDD orqali yozamiz.

#### Savatcha klassi va testi:
\`\`\`javascript
// cart.js
class Cart {
  constructor() {
    this.items = [];
  }
  addItem(product, quantity = 1) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
module.exports = Cart;

// cart.test.js
const Cart = require('./cart');

describe('Shopping Cart Logic', () => {
  let cart;
  
  beforeEach(() => {
    cart = new Cart();
  });

  test('savatcha bo\\'sh boshlanishi lozim', () => {
    expect(cart.items.length).toBe(0);
  });

  test('savatchaga yangi mahsulot qo\\'shilishi kerak', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    cart.addItem(apple, 2);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  test('bir xil mahsulot qo\\'shilganda miqdori ko\\'payishi lozim', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    cart.addItem(apple, 1);
    cart.addItem(apple, 2);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  test('umumiy summa to\\'g\\'ri hisoblanishi lozim', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    const banana = { id: 2, name: 'Banan', price: 2000 };
    cart.addItem(apple, 2); // 2000
    cart.addItem(banana, 1); // 2000
    expect(cart.getTotalPrice()).toBe(4000);
  });
});
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Faqat o'zgargan testlarni ishga tushirish:** \`jest --watch\` rejimi yordamida Git orqali faqat siz tahrirlagan fayllarga tegishli testlarni kuzatib, tezkor qayta ishga tushiradi.
* **Timeout cheklovlari:** Agar asinxron test 5 soniyadan uzoq cho'zilsa, Jest testni bekor qiladi. Zudlik bilan bajariladigan testlarga \`jest.setTimeout(1000)\` kabi kichikroq cheklovlar qo'yish orqali osilib qolgan testlarni tezroq aniqlash mumkin.

---

## 10. 📌 Cheat Sheet

| Matcher / Hook | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`describe()\` | Testlarni mantiqan guruhlash | \`describe('Auth API', () => {})\` |
| \`test()\` / \`it()\` | Bitta test senariysini yozish | \`test('should save user', () => {})\` |
| \`expect(x).toBe(y)\` | Oddiy tenglikni tekshirish (primitive) | \`expect(1 + 1).toBe(2)\` |
| \`expect(x).toEqual(y)\` | Obyekt/Massiv chuqur tengligini tekshirish | \`expect(obj).toEqual({ id: 1 })\` |
| \`expect(x).toContain(y)\` | Massivda element borligini tekshirish | \`expect(arr).toContain('admin')\` |
| \`jest.fn()\` | Kuzatiluvchi mock funksiya yaratish | \`const mock = jest.fn()\` |
| \`beforeEach()\` | Har bir testdan oldin bajariladigan kod | \`beforeEach(() => { db.connect() })\` |
| \`afterAll()\` | Barcha testlar tugagach 1 marta bajariladigan kod | \`afterAll(() => { db.close() })\` |
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
    "id": 1,
    "question": "Unit Test (Birlik testi) nima?",
    "options": [
      "Butun veb-saytning xavfsizligini tekshiruvchi test turi",
      "Dasturdagi eng kichik tekshirilishi mumkin bo'lgan qism (odatda alohida funksiya yoki metod) to'g'ri ishlayotganini alohida (izolyatsiyada) tekshiruvchi test",
      "Faqat ma'lumotlar bazasi tezligini o'lchaydigan test",
      "Foydalanuvchi interfeysining dizaynini solishtiruvchi test"
    ],
    "correctAnswer": 1,
    "explanation": "Unit test dasturdagi eng kichik mantiqiy bo'laklarni (funksiyalarni) boshqa bog'liqliklardan ajratgan holda alohida tekshiradi."
  },
  {
    "id": 2,
    "question": "Jest nima?",
    "options": [
      "JavaScript kodlarini siquvchi va tezlashtiruvchi framework",
      "Ma'lumotlar bazasi boshqaruv tizimi",
      "Facebook (Meta) tomonidan yaratilgan, JavaScript va TypeScript kodlarini test qilish uchun mo'ljallangan mashhur sinov muhiti (test runner va assertion library)",
      "Veb-saytlar uchun CSS animatsiyalar kutubxonasi"
    ],
    "correctAnswer": 2,
    "explanation": "Jest — bu JS ekotizimida eng keng tarqalgan test muhiti bo'lib, u testlarni ishga tushirish, natijalarni tekshirish (assertion) va mock qilish vositalarini o'z ichiga oladi."
  },
  {
    "id": 3,
    "question": "TDD (Test-Driven Development) yondashuvining asosiy tamoyili nimadan iborat?",
    "options": [
      "Loyihani to'liq tugatib, keyin oxirida barcha kod uchun test yozish",
      "Faqat server xatolarini test qilish",
      "Kodni yozishdan oldin uning bajarishi kerak bo'lgan vazifasi uchun test yozish, so'ngra testdan o'tuvchi minimal kod yozish va keyin refaktoring qilish (Red-Green-Refactor)",
      "Dasturchilarga test yozishni taqiqlash"
    ],
    "correctAnswer": 2,
    "explanation": "TDD-da dastlab bajarilmaydigan test yoziladi (Red), keyin u testdan o'tadigan darajada kod yoziladi (Green) va nihoyat kod optimallashtiriladi (Refactor)."
  },
  {
    "id": 4,
    "question": "Jest-da ibtidoiy qiymatlarni (primitives: son, satr) aniq tenglikka tekshirish uchun qaysi matcher mos keladi?",
    "options": [
      "`.toBe()`",
      "`.toEqual()`",
      "`.toBeNull()`",
      "`.toMatch()`"
    ],
    "correctAnswer": 0,
    "explanation": "`.toBe()` matcher-i JavaScript-dagi `Object.is` (deyarli `===`) kabi ishlaydi va ibtidoiy qiymatlar uchun ishlatiladi."
  },
  {
    "id": 5,
    "question": "Obyekt yoki massivlarning ichidagi barcha xossalarini (deep equality) tenglikka tekshirish uchun Jest-da qaysi matcher ishlatiladi?",
    "options": [
      "`.toBe()`",
      "`.toEqual()`",
      "`.toContain()`",
      "`.toBeInstanceOf()`"
    ],
    "correctAnswer": 1,
    "explanation": "`.toEqual()` matcheri obyekt va massivlarning barcha xossalarini rekurziv ravishda tekshirib chiqadi. `.toBe()` esa obyektlarning xotiradagi silkasini (reference) tekshiradi."
  },
  {
    "id": 6,
    "question": "Jest-dagi `describe` blokining vazifasi nima?",
    "options": [
      "Faqat bitta testni ishga tushirish",
      "Tegishli testlarni mantiqan guruhlash va test natijalarini o'qishni osonlashtirish",
      "Funksiyaning necha marta chaqirilganini sanash",
      "Asinxron kodlarni sinxron qilish"
    ],
    "correctAnswer": 1,
    "explanation": "`describe('Guruh nomi', () => { ... })` bloki bir nechta bog'liq testlarni bitta guruhga birlashtirish uchun xizmat qiladi."
  },
  {
    "id": 7,
    "question": "Har bir test blokidan oldin (boshlang'ich holatni sozlash yoki bazani tozalash uchun) kod bajarish uchun Jest-ning qaysi hook-idan foydalaniladi?",
    "options": [
      "`afterAll`",
      "`beforeEach`",
      "`afterEach`",
      "`beforeAll`"
    ],
    "correctAnswer": 1,
    "explanation": "`beforeEach` har bir `test()` yoki `it()` bloki ishga tushishidan oldin avtomatik ravishda bajariladi."
  },
  {
    "id": 8,
    "question": "Testlarda Mocking (soxtalashtirish) nima uchun kerak?",
    "options": [
      "Foydalanuvchilarni aldash uchun",
      "Tashqi API-lar yoki og'ir operatsiyalarni (masalan, haqiqiy ma'lumotlar bazasi yoki tarmoq so'rovini) simulyatsiya qilish va testlarning tez hamda barqaror ishlashini ta'minlash uchun",
      "Brauzer oynasini yopish uchun",
      "Faqat CSS xatoliklarini topish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Mocking yordamida tashqi tizimlarga (masalan, to'lov tizimi API-siga) bog'liqlikni soxtalashtiramiz va haqiqiy pul sarflamay yoki tarmoqqa tayanmay test o'tkaza olamiz."
  },
  {
    "id": 9,
    "question": "Jest-da asinxron funksiyani (Promise qaytaradigan funksiyani) test qilishning eng to'g'ri va o'qishli usuli qaysi?",
    "options": [
      "Callback orqali `done` parametridan foydalanish",
      "Asinxron test yozib, `async/await` dan foydalanish (masalan: `const data = await fetchData(); expect(data)...`)",
      "Asinxron testlarni test qilmaslik",
      "setInterval yordamida kutish"
    ],
    "correctAnswer": 1,
    "explanation": "Zamonaviy Jest-da test blokini `async` qilib, ichida `await` yordamida Promise hal bo'lishini kutish eng toza va o'qishli yo'ldir."
  },
  {
    "id": 10,
    "question": "Code Coverage (kodning test bilan qamrab olinishi) nimani anglatadi?",
    "options": [
      "Loyihada yozilgan fayllar sonini",
      "Loyiha kodining necha foizi testlar tomonidan bajarilganligini va tekshirilganligini ko'rsatuvchi ko'rsatkich",
      "Dasturning internet tezligini",
      "Koddagi sintaktik xatolar sonini"
    ],
    "correctAnswer": 1,
    "explanation": "Code Coverage kodimizning qaysi qismlari test yordamida tekshirilayotganini va qaysi qismlar (statements, branches, functions, lines) e'tibordan chetda qolganini foizlarda ko'rsatadi."
  },
  {
    "id": 11,
    "question": "Jest-da mock funksiya yaratish uchun qaysi metod ishlatiladi?",
    "options": [
      "`jest.mock()`",
      "`jest.fn()`",
      "`jest.spyOn()`",
      "`jest.create()`"
    ],
    "correctAnswer": 1,
    "explanation": "`jest.fn()` yangi mock (soxta) funksiya qaytaradi, u chaqirilganda necha marta chaqirilgani va qanday argumentlar olganini kuzatib boradi."
  },
  {
    "id": 12,
    "question": "Quyidagi assert qanday vazifani bajaradi?\n```javascript\nexpect(myMockFn).toHaveBeenCalledTimes(2);\n```",
    "options": [
      "`myMockFn` funksiyasi 2 soniya davomida ishlaganini tekshiradi",
      "`myMockFn` mock funksiyasi test davomida aynan 2 marta chaqirilganligini tekshiradi",
      "Funksiya faqat 2 ta parametr qabul qilganini tekshiradi",
      "Funksiya ichida 2 marta xatolik bo'lganini tekshiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`toHaveBeenCalledTimes(n)` mock funksiyaning jami chaqirilgan sonini tekshirish uchun ishlatiladi."
  }
]

};
