## 1. 💡 Sodda Tushuntirish va Analogiya

### Unit Testing va Jest nima?
* **Unit Testing (Birlik testi):** Dasturimizning eng kichik mantiqiy bo'laklarini (odatda alohida funksiyalarni) butun tizimdan ajratgan holda alohida tekshirib chiqish jarayonidir.
* **Jest:** JavaScript va TypeScript loyihalari uchun Meta (Facebook) tomonidan yaratilgan eng oson, tezkor va mashhur test yozish framework-idir.

### Real hayotiy analogiya
Tasavvur qiling, siz **avtomobil zavodida muhandissiz**:
* **Haqiqiy sinov:** Mashina tayyor bo'lgandan keyin haydab ko'rish — bu *End-to-End (E2E) yoki integratsion test*. U uzoq vaqt va katta xarajat talab qiladi.
* **Unit Test:** Mashina yig'ilishidan oldin har bir **motor porsheni, tormoz diski va fara chirog'ini** alohida-alohida stanokda tekshirish. Agar fara chirog'iga 12V tok berilganda yonsa, u sinovdan o'tadi. Bu oson, tez va xatolik qayerdaligini darhol ko'rsatib beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Math funksiyasini test qilish)
Keling, oddiy matematik amallarni bajaruvchi funksiyani yozamiz va uni Jest-da test qilamiz.
```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// math.test.js
const { add } = require('./math');

test('add funksiyasi 2 va 3 sonlarini qo\'shganda 5 qaytarishi kerak', () => {
  // expect - kutilayotgan qiymatni belgilaydi
  // toBe - natijani tekshiruvchi matcher (assert)
  expect(add(2, 3)).toBe(5);
});
```

### 2. Intermediate Example (Obyektlarni tekshirish va Setup/Teardown)
Massiv va obyektlarni chuqur tekshirish (deep equality) hamda testdan oldin ma'lumotlarni sozlash:
```javascript
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

  test('addUser yangi foydalanuvchini qo\'shishi lozim', () => {
    const user = { id: 1, name: 'Sardor' };
    store.addUser(user);
    
    // toEqual obyekt ichidagi qiymatlarni solishtirish uchun ishlatiladi
    expect(store.getUsers()).toEqual([ { id: 1, name: 'Sardor' } ]);
  });
});
```

### 3. Advanced Example (Mocking va Asinxron test qilish)
Tashqi API so'rov yuboradigan funksiyani test qilishda tarmoqqa bog'lanib qolmaslik uchun so'rovni soxtalashtiramiz (mocking):
```javascript
// userService.js
const axios = require('axios');

async function fetchUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
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
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Regressiya (Regression):** Koddagi yangi o'zgarishlar tufayli eski ishlayotgan qismlar buzilib ketishi. Testlar bo'lsa, regressiya darhol aniqlanadi.
* **Qo'rqinchli refaktoring (Fear of Refactoring):** Eski yozilgan kodni o'zgartirish yoki optimallashtirishdan qo'rqish. Testlar kodning to'g'ri ishlashini kafolatlasa, bemalol refaktoring qilish mumkin.
* **Hujjatlashtirish:** Testlar kodning nima ish qilishi kerakligini tushuntiruvchi eng ishonchli va yangilanib turadigan texnik hujjat (documentation) vazifasini o'taydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Obyekt yoki massivlarni `toBe()` orqali tekshirish
#### Xato:
```javascript
// Noto'g'ri! Massivlar xotirada turli manzilda bo'lgani uchun test o'tmaydi
expect([1, 2]).toBe([1, 2]);
```
#### To'g'ri usul:
```javascript
// Obyekt va massivlar qiymatini tekshirishda toEqual() ishlatish shart
expect([1, 2]).toEqual([1, 2]);
```

### 2. Asinxron testlarda `await` ishlatishni unutish
#### Xato:
```javascript
test('data is fetched', () => {
  const data = fetchData(); // Promise qaytaradi
  expect(data.status).toBe('ok'); // Xatolik beradi yoki test soxta o'tib ketadi
});
```
#### To'g'ri usul:
```javascript
test('data is fetched', async () => {
  const data = await fetchData();
  expect(data.status).toBe('ok');
});
```

### 3. Testlar o'rtasida global holatni (state) baham ko'rish
#### Xato:
Bitta testda global o'zgaruvchi o'zgartirilsa, keyingi testlar xato ishlay boshlaydi.
#### To'g'ri usul:
`beforeEach` yoki `afterEach` hooklari ichida har doim holatni tozalab, yangidan yaratish kerak.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Unit Test nima?
   * **Javob:** Dasturning eng kichik funksional qismini (birligini) qolgan kodlardan ajratgan holda alohida sinab ko'rish.
2. **Savol:** Jest-da `.toBe()` va `.toEqual()` farqi nimada?
   * **Javob:** `.toBe()` ibtidoiy qiymatlar va referenslarni tekshiradi, `.toEqual()` esa obyekt va massivlarning tarkibini (qiymatlarini) solishtiradi.
3. **Savol:** Test-dagi `describe` va `it/test` farqi nimada?
   * **Javob:** `describe` testlarni guruhlash uchun, `it` yoki `test` esa aniq bitta test senariysini yozish uchun ishlatiladi.
4. **Savol:** `beforeEach` va `afterEach` qachon bajariladi?
   * **Javob:** `beforeEach` har bir test ishga tushishidan oldin, `afterEach` esa har bir test tugagandan keyin ishlaydi.

### Middle (5–8)
5. **Savol:** Mocking nima va nima uchun kerak?
   * **Javob:** Haqiqiy tizimlarga (masalan, API, File System) bog'liqlikni yo'qotish uchun ularning o'rniga soxta, boshqariladigan versiyalarini (mocks) ishlatish.
6. **Savol:** `jest.fn()` va `jest.spyOn()` farqi nimada?
   * **Javob:** `jest.fn()` butunlay yangi soxta funksiya yaratadi. `jest.spyOn()` esa mavjud obyektning haqiqiy metodini kuzatishga (va ixtiyoriy ravishda mock qilishga) imkon beradi.
7. **Savol:** Code Coverage (qamrov foizi) nima?
   * **Javob:** Loyihamizdagi kodning necha foiz qatori yoki shartlari testlar tomonidan bajarilganini ko'rsatadigan statistika.
8. **Savol:** Jest-da asinxron kodlarni qanday test qilish mumkin?
   * **Javob:** Test funksiyasini `async` qilib `await` ishlatish, Promise qaytarish yoki `done()` callback-dan foydalanish orqali.

### Senior (9–12)
9. **Savol:** TDD (Test Driven Development) nima va uning foydasi nimada?
   * **Javob:** Dastlab test yozib, keyin kod yozish yondashuvi. Bu kodning arxitekturasini toza saqlash, ortiqcha kod yozmaslik va yuqori test qamrovini ta'minlashga yordam beradi.
10. **Savol:** Jest-da modullarni mock qilishda `jest.mock()` qanday ishlaydi va uning hoisting xususiyati nima?
    * **Javob:** `jest.mock()` fayl importlaridan oldin bajarilishi (hoisted) kerak. Jest compile paytida uni avtomatik ravishda faylning eng tepasiga ko'chiradi.
11. **Savol:** Katta loyihalarda testlarning tezligini qanday oshirish mumkin?
    * **Javob:** Testlarni parallel ishlatish (`--maxWorkers`), keraksiz og'ir kutubxonalarni mock qilish, keshdan foydalanish va faqat o'zgargan fayllarni test qilish (`--watch` yoki `--onlyChanged`).
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
```javascript
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

  test('savatcha bo\'sh boshlanishi lozim', () => {
    expect(cart.items.length).toBe(0);
  });

  test('savatchaga yangi mahsulot qo\'shilishi kerak', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    cart.addItem(apple, 2);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  test('bir xil mahsulot qo\'shilganda miqdori ko\'payishi lozim', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    cart.addItem(apple, 1);
    cart.addItem(apple, 2);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  test('umumiy summa to\'g\'ri hisoblanishi lozim', () => {
    const apple = { id: 1, name: 'Olma', price: 1000 };
    const banana = { id: 2, name: 'Banan', price: 2000 };
    cart.addItem(apple, 2); // 2000
    cart.addItem(banana, 1); // 2000
    expect(cart.getTotalPrice()).toBe(4000);
  });
});
```

---

## 9. 🚀 Performance va Optimization

* **Faqat o'zgargan testlarni ishga tushirish:** `jest --watch` rejimi yordamida Git orqali faqat siz tahrirlagan fayllarga tegishli testlarni kuzatib, tezkor qayta ishga tushiradi.
* **Timeout cheklovlari:** Agar asinxron test 5 soniyadan uzoq cho'zilsa, Jest testni bekor qiladi. Zudlik bilan bajariladigan testlarga `jest.setTimeout(1000)` kabi kichikroq cheklovlar qo'yish orqali osilib qolgan testlarni tezroq aniqlash mumkin.

---

## 10. 📌 Cheat Sheet

| Matcher / Hook | Vazifasi | Misol |
| :--- | :--- | :--- |
| `describe()` | Testlarni mantiqan guruhlash | `describe('Auth API', () => {})` |
| `test()` / `it()` | Bitta test senariysini yozish | `test('should save user', () => {})` |
| `expect(x).toBe(y)` | Oddiy tenglikni tekshirish (primitive) | `expect(1 + 1).toBe(2)` |
| `expect(x).toEqual(y)` | Obyekt/Massiv chuqur tengligini tekshirish | `expect(obj).toEqual({ id: 1 })` |
| `expect(x).toContain(y)` | Massivda element borligini tekshirish | `expect(arr).toContain('admin')` |
| `jest.fn()` | Kuzatiluvchi mock funksiya yaratish | `const mock = jest.fn()` |
| `beforeEach()` | Har bir testdan oldin bajariladigan kod | `beforeEach(() => { db.connect() })` |
| `afterAll()` | Barcha testlar tugagach 1 marta bajariladigan kod | `afterAll(() => { db.close() })` |
