export const unitTesting = {
  id: "a22",
  title: "Testing va Debugging: Jest, Unit Tests, Integration Tests",
  theory: `## 1. NEGA kerak?

**Muammolar:**
- Koda o'zgartirish qo'shilsagina qandaydir joyda taslif bo'ladi
- Foydalanuvchilar xato topishadan oldin siz bilmoqchisiz
- Manual testing - vaqt israfsasi, xatolar mumkin

**Yechim:** Automated Testing - kodni avtomatik tekshirish

## 2. SODDALIK

**Autom fabrikiday:** Mahsulot sifati avtomatik tekshiriladi. Xato bo'lsa brakeage chiqadi oldindan.

## 3. STRUKTURA

### A. Test Pyramid

\`\`\`
       E2E Tests (5%)       - Butun sayt
      Integration (15%)     - Modullar birgalikda
         Unit Tests (80%)   - Alohida funksiyalar
\`\`\`

### B. AAA Pattern

\`\`\`javascript
test("sum 2+2=4", () => {
  // ARRANGE - Tayyorlash
  const a = 2, b = 2;

  // ACT - Bajarish
  const result = sum(a, b);

  // ASSERT - Tasdiqlash
  expect(result).toBe(4);
});
\`\`\`

### C. Jest - Popular Testing Framework

\`\`\`javascript
// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum.js';

describe('sum funksiyasi', () => {
  test('2 + 2 = 4', () => {
    expect(sum(2, 2)).toBe(4);
  });

  test('0 + 0 = 0', () => {
    expect(sum(0, 0)).toBe(0);
  });

  test('manfiy sonlar', () => {
    expect(sum(-5, 3)).toBe(-2);
  });
});
\`\`\`

### D. Jest Matchers

\`\`\`javascript
// Equality
expect(value).toBe(4);                    // Exact
expect(value).toEqual({a: 1});            // Deep equality

// Truthiness
expect(value).toBeTruthy();               // true-like
expect(value).toBeFalsy();                // false-like
expect(value).toBeNull();                 // null
expect(value).toBeUndefined();            // undefined
expect(value).toBeDefined();              // not undefined

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.1 + 0.2);

// Strings
expect(text).toMatch(/regex/);
expect(text).toContain('substring');

// Arrays/Objects
expect(arr).toContain('item');
expect(obj).toHaveProperty('key');
expect(arr).toHaveLength(3);

// Functions
expect(fn).toThrow();
expect(fn).toThrow(Error);
\`\`\`

### E. Test Life Cycle

\`\`\`javascript
describe('User module', () => {
  let user;

  // Har test oldin
  beforeEach(() => {
    user = new User('Ali');
  });

  // Har test keyin
  afterEach(() => {
    user = null;
  });

  // Butun suite oldin
  beforeAll(() => {
    console.log('Suite boshlandi');
  });

  // Butun suite keyin
  afterAll(() => {
    console.log('Suite tugadi');
  });

  test('...', () => { });
});
\`\`\`

### F. Async Testing

\`\`\`javascript
test('async/await test', async () => {
  const data = await fetchData();
  expect(data).toEqual({id: 1});
});

test('promise test', () => {
  return fetchData()
    .then(data => expect(data).toEqual({id: 1}));
});

test('mock fetch', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({json: () => ({id: 1})})
  );
  return fetchData().then(data => {
    expect(fetch).toHaveBeenCalled();
  });
});
\`\`\`

### G. Mocking

\`\`\`javascript
// Function mock
const mockFn = jest.fn();
mockFn(1, 2, 3);
expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
expect(mockFn).toHaveBeenCalledTimes(1);

// Module mock
jest.mock('./api.js', () => ({
  fetch: jest.fn(() => Promise.resolve({data: 'test'}))
}));

// Spy (partial mock)
const obj = {
  method: () => 'original'
};
const spy = jest.spyOn(obj, 'method');
spy.mockReturnValue('mocked');
expect(obj.method()).toBe('mocked');
\`\`\`

### H. Coverage

\`\`\`javascript
// Barcha code line'larni test qilib ko'rmoq
// Coverage types:
// Line Coverage - har line ishlaydi
// Branch Coverage - har if/else ishlaydi
// Function Coverage - har function chaqiriladi
// Statement Coverage - har statement ishlaydi
\`\`\`

### I. Integration Testing

\`\`\`javascript
// APIClient + Database birga test
describe('User API', () => {
  test('create user', async () => {
    const user = await api.createUser({name: 'Ali'});
    const found = await db.findUser(user.id);
    expect(found.name).toBe('Ali');
  });
});
\`\`\`

### J. E2E Testing (Cypress)

\`\`\`javascript
// Butun saytni brauzer orqali tekshirish
describe('Login flow', () => {
  it('foydalanuvchi login qilishi', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('test@test.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button').click();
    cy.contains('Welcome, Test').should('be.visible');
  });
});
\`\`\`

### K. Debugging

\`\`\`javascript
// Console'da debug
console.log('value:', value);
console.table(arr);
console.time('label');
// ... code
console.timeEnd('label');

// Debugger
debugger; // Brauzer'da break point

// Browser DevTools
// Sources tab -> breakpoint qo'yish
// Step over/into/out
\`\`\`

### L. Test Best Practices

\`\`\`javascript
// 1. Descriptive test names
// BAD: test('works')
// GOOD: test('should return 4 when adding 2+2')

// 2. One assertion per test (ideally)
// BAD: expect(a).toBe(1); expect(b).toBe(2);
// GOOD: Alohida test'lar

// 3. DRY - Don't Repeat Yourself
// beforeEach'da common setup

// 4. Isolated tests
// Bir test'ning natijaasi boshqasiga ta'sir qilmasi

// 5. Mock external dependencies
// API, Database, etc.
\`\`\`

## 4. XATOLAR

1. **Fragile tests - juda specific assertions**
2. **100% coverage sanasi - garchi cover 0% muammoli kod qolsa**
3. **Slow tests - optimization kerak**
4. **Async tests'da forget to await/return**

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details><summary>1. Unit test nima?</summary>Bitta funksiya/metod'ni test qilish</details>
<details><summary>2. AAA pattern nima?</summary>Arrange-Act-Assert - test tuzilishi</details>
<details><summary>3. Jest nima?</summary>Popular JavaScript testing framework</details>
<details><summary>4. Mock nima?</summary>Fake ma'lumot/funksiya test uchun</details>
<details><summary>5. Spy nima?</summary>Real funksiya'ni watch qilish</details>
<details><summary>6. beforeEach nima?</summary>Har test oldin ishlaydigan kod</details>
<details><summary>7. Coverage nima?</summary>Nechta kod line test qilinganini % bilan</details>
<details><summary>8. Async test qanday?</summary>async/await yoki return promise</details>
<details><summary>9. E2E test nima?</summary>Butun saytni foydalanuvchi ko'zi bilan test</details>
<details><summary>10. Integration test nima?</summary>Bir nechta modullar birgalikda test</details>
<details><summary>11. Test isolation nima?</summary>Bir test'ning natijaasi boshqasiga ta'sir qilmasligi</details>
<details><summary>12. Mocking vs Spying farqi?</summary>Mock - fake, Spy - real + watch</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Test",
      instruction: "sum(2,2) = 4 bo'lishini tekshiring.",
      startingCode: "function sum(a,b) { return a + b; }\n// Test yozing\n",
      hint: "if (sum(2,2) !== 4) throw new Error('Test failed');",
      test: "if (code.includes('sum(2,2)')) return null; return 'Test yoq';"
    },
    {
      id: 2,
      title: "Jest Test",
      instruction: "Jest'da test yozing - test() funksiyasi bilan.",
      startingCode: "test('sum 2+2', () => {\n  // Bu yerga yozing\n});\n",
      hint: "expect(sum(2,2)).toBe(4);",
      test: "if (code.includes('expect')) return null; return 'Jest test xato';"
    },
    {
      id: 3,
      title: "Describe va Test",
      instruction: "describe bilan test suite yarating.",
      startingCode: "describe('sum', () => {\n  test('2+2=4', () => {\n    expect(sum(2,2)).toBe(4);\n  });\n});\n",
      hint: "Mavjud",
      test: "if (code.includes('describe')) return null; return 'Describe xato';"
    },
    {
      id: 4,
      title: "beforeEach",
      instruction: "beforeEach'da o'zgaruvchi tayyorlang.",
      startingCode: "let value;\nbeforeEach(() => {\n  // Bu yerga value = 10\n});\ntest('test', () => {\n  expect(value).toBe(10);\n});\n",
      hint: "value = 10;",
      test: "if (code.includes('beforeEach')) return null; return 'beforeEach xato';"
    },
    {
      id: 5,
      title: "Matchers",
      instruction: "toBeTruthy(), toBeNull(), toContain() ishlatib ko'ring.",
      startingCode: "test('matchers', () => {\n  expect(true).toBeTruthy();\n  // Bu yerga boshqa matchers\n});\n",
      hint: "expect(null).toBeNull(); expect([1,2,3]).toContain(2);",
      test: "if (code.includes('toBe')) return null; return 'Matchers xato';"
    },
    {
      id: 6,
      title: "Mock Function",
      instruction: "jest.fn() orqali mock funksiya yarating.",
      startingCode: "test('mock', () => {\n  const mockFn = jest.fn();\n  mockFn(1,2);\n  // Bu yerga toHaveBeenCalledWith\n});\n",
      hint: "expect(mockFn).toHaveBeenCalledWith(1,2);",
      test: "if (code.includes('jest.fn')) return null; return 'Mock xato';"
    },
    {
      id: 7,
      title: "Async Test",
      instruction: "async/await test yozing.",
      startingCode: "test('async', async () => {\n  // Bu yerga await\n});\n",
      hint: "const data = await fetchData(); expect(data).toBe(...)",
      test: "if (code.includes('async')) return null; return 'Async test xato';"
    },
    {
      id: 8,
      title: "toThrow",
      instruction: "Funksiya error throw qilishini tekshiring.",
      startingCode: "function divide(a, b) {\n  if (b === 0) throw new Error('Nolga bo\\'lish mumkin emas');\n  return a / b;\n}\ntest('error', () => {\n  // Bu yerga yozing\n});\n",
      hint: "expect(() => divide(5,0)).toThrow();",
      test: "if (code.includes('toThrow')) return null; return 'toThrow xato';"
    },
    {
      id: 9,
      title: "Spy",
      instruction: "jest.spyOn orqali funksiyani watch qiling.",
      startingCode: "const obj = { method: () => 'original' };\ntest('spy', () => {\n  const spy = jest.spyOn(obj, 'method');\n  // Bu yerga yozing\n});\n",
      hint: "expect(spy).toHaveBeenCalled();",
      test: "if (code.includes('spyOn')) return null; return 'Spy xato';"
    },
    {
      id: 10,
      title: "Mock Module",
      instruction: "jest.mock() orqali modul mock qiling.",
      startingCode: "jest.mock('./api', () => ({\n  fetch: jest.fn(() => Promise.resolve({data: 'test'}))\n}));\ntest('mock module', async () => {\n  // Bu yerga yozing\n});\n",
      hint: "const data = await fetch(); expect(data.data).toBe('test');",
      test: "if (code.includes('jest.mock')) return null; return 'Mock module xato';"
    },
    {
      id: 11,
      title: "Coverage",
      instruction: "Barcha branch'larini test qiling (if/else).",
      startingCode: "function check(x) {\n  if (x > 0) return 'positive';\n  return 'negative';\n}\ntest('positive', () => expect(check(5)).toBe('positive'));\n// Bu yerga negative test\n",
      hint: "test('negative', () => expect(check(-1)).toBe('negative'));",
      test: "if (code.includes('negative')) return null; return 'Coverage xato';"
    },
    {
      id: 12,
      title: "Kompleks - Full Test Suite",
      instruction: "describe + multiple tests + beforeEach + matchers.",
      startingCode: "describe('Calculator', () => {\n  let calc;\n  beforeEach(() => { calc = new Calculator(); });\n  test('add', () => { expect(calc.add(2,2)).toBe(4); });\n  // Bu yerga subtract test\n});\n",
      hint: "test('subtract', () => { expect(calc.sub(5,2)).toBe(3); });",
      test: "if (code.includes('beforeEach') && code.includes('describe')) return null; return 'Full suite xato';"
    }
  ]
};
