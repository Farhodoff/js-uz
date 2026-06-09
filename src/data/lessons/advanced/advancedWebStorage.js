export const advancedWebStorage = {
  id: "advancedWebStorage",
  title: "Kengaytirilgan Web Storage (IndexedDB, Cookies, SessionStorage)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Brauzerda Ma'lumot Saqlash (Client-side Storage) nima?
Biz yaratadigan veb-saytlar foydalanuvchining o'z brauzerida ma'lumotlarni saqlashi kerak bo'ladi (masalan: tizimga kirish tokeni, tanlangan mavzu, savatdagi tovarlar). LocalStorage-dan tashqari brauzerda yana 3 ta o'ta muhim storage turlari bor:

1. **SessionStorage:** Ma'lumotlarni faqat joriy brauzer oynasi (tab) ochiq turguncha saqlaydi. Tab yopilishi bilan ma'lumotlar o'chib ketadi.
2. **Cookies (Pechenyelar):** Kichik matnli ma'lumotlar bo'lib, ular har safar backend-ga HTTP so'rov yuborilganda avtomatik ravishda so'rov sarlavhasi (Headers) tarkibida serverga jo'natiladi. Asosan avtorizatsiya (auth session) uchun ishlatiladi.
3. **IndexedDB:** Brauzer ichidagi to'laqonli, relyatsion bo'lmagan NoSQL ma'lumotlar bazasi. U yirik hajmdagi murakkab, tuzilmali ma'lumotlarni (megabaytlab yoki gigabaytlab) saqlashga mo'ljallangan va asinxron ishlaydi.

### Storage-larning solishtirma jadvali:
| Xususiyat | LocalStorage | SessionStorage | Cookies | IndexedDB |
| :--- | :--- | :--- | :--- | :--- |
| **Hajmi** | ~5-10 MB | ~5 MB | ~4 KB (juda kichik) | Cheksiz (disk hajmiga mos) |
| **Muddati** | O'chirilguncha | Tab yopilguncha | Belgilangan sanagacha | O'chirilguncha |
| **Serverga uzatilishi** | Yo'q | Yo'q | Ha (har bir HTTP so'rovda) | Yo'q |
| **Ishlash tartibi** | Sinxron | Sinxron | Sinxron | Asinxron |

### Real hayotiy analogiya
Tasavvur qiling, siz **ofisda ishlayapsiz**:
* **LocalStorage:** Sizning ish stolingizdagi tortma. Stolingizda turadigan har doim kerak bo'ladigan hujjatlarni saqlaysiz. Siz uyga ketib ertasi kuni kelsangiz ham u yerda turaveradi.
* **SessionStorage:** Stolingiz ustidagi vaqtinchalik varoq. Faqat o'sha kuni stolingizda o'tirganingizda ishlatasiz. Kunning oxirida stolingizni yig'ishtirib ketganingizda u varoq axlatga tashlanadi.
* **Cookies:** Sizning ofis **ko'krak nishoningiz (Badge)**. Siz qaysi xonaga (serverga) kirsangiz ham uni eshikdagi qo'riqchiga (HTTP request) majburiy ravishda ko'rsatasiz. Badge-da sizning unikal identifikatoringiz (session key) yozilgan.
* **IndexedDB:** Ofis binosining yerto'lasidagi **katta arxiv xonasi**. U yerda siz minglab papkalar va katta hajmdagi hisobotlarni tartibli (indekslangan) holda saqlaysiz va istalgan paytda asinxron ravishda borib o'qiysiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (SessionStorage bilan ishlash)
Vaqtinchalik sahifa sozlamasini saqlash:
\`\`\`javascript
// SessionStorage-ga ma'lumot yozish
sessionStorage.setItem('temp_filter', 'laptop');

// O'qish
const filter = sessionStorage.getItem('temp_filter');
console.log('Tanlangan filtr:', filter);

// O'chirish (tab yopilganda o'z-o'zidan o'chadi)
sessionStorage.removeItem('temp_filter');
\`\`\`
* **Natija:** Ma'lumot faqat tab ochiqligida ishlaydi.
* **Qachon ishlatiladi:** Bir marta ishlatiladigan wizard formalar (multi-step forms) ma'lumotlarini saqlashda.

### 2. Intermediate Example (Xavfsiz Cookie yozish va o'qish)
JS orqali xavfsiz (Secure, SameSite) Cookie-lar yaratish va ularning muddati (Expiration) belgilash:
\`\`\`javascript
// 1. 7 kundan keyin o'chadigan xavfsiz Cookie yaratish
const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 7);

document.cookie = \`session_id=xyz12345; expires=\${expireDate.toUTCString()}; path=/; SameSite=Strict; Secure\`;

// 2. Cookie-larni o'qish (matndan kerakli kalitni qidirish)
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

console.log('Session ID:', getCookie('session_id'));
\`\`\`
* **Qachon ishlatiladi:** Avtorizatsiya tokenlarini (JWT token) saqlashda.
* **Performance jihati:** Cookies juda kichik saqlanishi kerak, chunki ular har safar internet tarmog'i orqali HTTP request-da serverga yuklanib, tarmoqni yuklaydi.

### 3. Advanced Example (IndexedDB yaratish va ochish)
Asinxron IndexedDB ma'lumotlar bazasini ochish va jadval (Object Store) yaratish:
\`\`\`javascript
// 1. 'ShopDatabase' nomli bazani 1-versiya bilan ochish
const request = indexedDB.open('ShopDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // 'products' nomli jadval yaratamiz (keyPath: unikal ID ustuni)
  const objectStore = db.createObjectStore('products', { keyPath: 'id' });
  // Tezkor qidirish uchun toifalar bo'yicha indeks yaratish
  objectStore.createIndex('category', 'category', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('IndexedDB muvaffaqiyatli ochildi.');
};

request.onerror = (event) => {
  console.error('IndexedDB xatolik:', event.target.error);
};
\`\`\`
* **Qachon ishlatiladi:** Offline-first ishlaydigan PWA (Progressive Web App) ilovalarida katta ma'lumotlarni keshlab saqlashda.

### 4. Production Example (IndexedDB-ga ma'lumot yozish va o'qish - Transactions)
IndexedDB-da tranzaksiya ochib, mahsulot qo'shish va uni o'qish:
\`\`\`javascript
function addProduct(db, product) {
  // Readwrite tranzaksiya ochish
  const transaction = db.transaction(['products'], 'readwrite');
  const store = transaction.objectStore('products');
  
  const addRequest = store.add(product);
  
  addRequest.onsuccess = () => {
    console.log('Mahsulot IndexedDB ga yozildi.');
  };
  
  transaction.oncomplete = () => {
    console.log('Tranzaksiya muvaffaqiyatli yakunlandi.');
  };
}

function getProduct(db, id) {
  const transaction = db.transaction(['products'], 'readonly');
  const store = transaction.objectStore('products');
  const getRequest = store.get(id);
  
  getRequest.onsuccess = () => {
    console.log('Mahsulot ma\\\\'lumoti:', getRequest.result);
  };
}
\`\`\`

### 5. Enterprise Example (IndexedDB wrapper-dan foydalanish)
Production tizimlarda IndexedDB-ning murakkab callback arxitekturasini soddalashtirish uchun \`Dexie.js\` yoki localForage kutubxonasidan foydalanish (mantiqiy simulyatsiya):
\`\`\`javascript
// Dexie yordamida IndexedDB bilan asinxron Promise orqali ishlash
import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
  friends: '++id, name, age' // auto-increment id va age indeksi
});

async function run() {
  // Yozish (Promise yordamida oson va qulay)
  await db.friends.add({ name: 'Ali', age: 25 });
  
  // Qidirish
  const youngFriends = await db.friends
    .where('age')
    .below(30)
    .toArray();
    
  console.log('Yosh do\\\\'stlar:', youngFriends);
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Xavfsiz avtorizatsiya (XSS va CSRF himoyasi):** Tokenlarni LocalStorage-da saqlash xavfli, chunki ixtiyoriy JS skript (XSS) uni o'g'irlashi mumkin. Uni Cookies-da \`HttpOnly\` va \`Secure\` bayroqlari bilan saqlasa, JS unga kira olmaydi va xavfsizlik ta'minlanadi.
* **Offline ishlash:** IndexedDB katta hajmdagi ma'lumotlarni saqlash imkonini beradi. Bu orqali internet uzilsa ham sayt to'liq offline rejimida ishlashda davom etadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Maxfiy tokenlarni LocalStorage-da saqlash
#### Xato:
Avtorizatsiya JWT tokenini to'g'ridan-to'g'ri \`localStorage.setItem('token', token)\` deb saqlash.
#### Nima uchun noto'g'ri:
LocalStorage-dagi ma'lumotlarni ixtiyoriy tashqi JS skript (masalan, zararli Chrome extension) \`localStorage.getItem\` yordamida o'g'irlashi mumkin.
#### To'g'ri usul:
Tokenlarni HttpOnly Cookies ichida saqlash yoki memory-da (faqat RAM-da) saqlab, silent refresh qilish.
#### Izoh:
Xavfsizlik o'ta muhim bo'lgan loyihalarda LocalStorage-dan token saqlashda foydalanmang.

### 2. Cookie hajmini oshirib yuborish
#### Xato:
Cookie ichiga katta hajmdagi savatdagi tovarlarni (JSON) string qilib yozish.
#### Nima uchun noto'g'ri:
Cookies har safar brauzer backend-ga so'rov yuborganda tarmoq trafigi bilan birga serverga ketadi. Katta cookies tarmoqni sekinlashtiradi.
#### To'g'ri usul:
Bunday ma'lumotlarni LocalStorage yoki IndexedDB-da saqlang. Cookies faqat kichik session ID uchun bo'lishi shart.
#### Izoh:
Cookies tarmoq yuklamasini oshiradi.

### 3. IndexedDB asinxronligini hisobga olmaslik
#### Xato:
IndexedDB ochish so'rovi ketgandan keyin darhol unga yozishga urinish:
\`\`\`javascript
const request = indexedDB.open('db');
// XATO: Baza hali ochilmasdan yozishga harakat qilish
request.db.transaction(...); 
\`\`\`
#### To'g'ri usul:
Barcha amallarni \`onsuccess\` callback hodisalari yoki Promisellardan foydalanib yozish shart.

### 4. \`HttpOnly\` cookie-ni JS orqali o'qishga urinish
#### Xato:
Backend tomonidan \`HttpOnly\` deb belgilangan cookie-ni JS orqali \`document.cookie\` qilib qidirish.
#### Nima uchun noto'g'ri:
HttpOnly cookie-lar JS skriptlaridan yashirilgan. Ularni JS o'qiy olmaydi.
#### To'g'ri usul:
Tizimga kirishni tekshirish uchun serverga request jo'natish yoki maxsus non-HttpOnly holatda yozilgan boshqa xavfsiz belgidan foydalanish.

### 5. \`SessionStorage\`ni tablar o'rtasida ma'lumot ulashish uchun ishlatish
#### Xato:
Ikkita ochiq tab (o'sha saytdagi ikkita alohida oyna) o'rtasida SessionStorage yordamida ma'lumot uzatishni kutish.
#### Nima uchun noto'g'ri:
SessionStorage faqat o'sha oyna uchun unikal. U tablar yopilganda o'chadi va boshqa tablar bilan bo'lishmaydi.
#### To'g'ri usul:
Tablararo aloqa uchun LocalStorage yoki BroadcastChannel ishlatish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** LocalStorage va SessionStorage farqi nima?
   * **Javob:** LocalStorage ma'lumotlarni doimiy saqlaydi. SessionStorage esa faqat tab yopilguncha saqlaydi.

2. **Savol:** Cookies nima va ularning asosiy hajmi qancha bo'ladi?
   * **Javob:** Cookies — HTTP request-lar orqali avtomatik serverga jo'natiladigan kichik ma'lumotlar. Hajmi maksimal ~4 KB.

3. **Savol:** Cookie-larning muddati (Expiration) qanday belgilanadi?
   * **Javob:** \`expires\` yoki \`max-age\` atributlari yordamida.

4. **Savol:** IndexedDB nima va u qachon kerak?
   * **Javob:** Brauzer ichidagi katta hajmli NoSQL ma'lumotlar bazasi bo'lib, u yirik asinxron ma'lumotlarni saqlashda kerak.

### Middle (5–8)
5. **Savol:** Cookie-lardagi \`HttpOnly\` va \`Secure\` bayroqlari nima uchun kerak?
   * **Javob:** \`HttpOnly\` JS-ni cookie-ni o'qishini taqiqlaydi (XSS himoyasi). \`Secure\` esa faqat HTTPS orqali yuborilishini ta'minlaydi.

6. **Savol:** Cookie-lardagi \`SameSite\` atributi nima (Strict, Lax, None)?
   * **Javob:** U uchinchi tomon saytlardan kelayotgan request-larga cookie qo'shib yuborilishini boshqaradi (CSRF hujumidan himoya qiladi).

7. **Savol:** Nima uchun IndexedDB sinxron emas, balki asinxron ishlaydi?
   * **Javob:** Katta ma'lumotlarni diskdan o'qish/yozish sinxron bajarilsa, brauzer interfeysi qotib qoladi (blocking UI).

8. **Savol:** LocalStorage-da \`JSON.stringify\` va \`JSON.parse\` ishlatishning qanday performance ta'siri bor?
   * **Javob:** Katta obyektlarni tez-tez string-ga o'tkazish CPU yuklamasini oshiradi, chunki bu amallar sinxrondir.

### Senior (9–12)
9. **Savol:** IndexedDB-da \`objectStore\` va \`Indexes\` tushunchalari qanday ishlaydi va qidiruv samaradorligini qanday oshiradi?
   * **Javob:** \`objectStore\` bu jadval. \`Indexes\` esa ma'lum ustun qiymati bo'yicha indeks yaratib, $O(N)$ o'rniga tezkor indeksli qidirish imkonini beradi.

10. **Savol:** JWT tokenlarni saqlashda xavfsizlik va arxitektura nuqtai nazaridan LocalStorage va HttpOnly Cookie o'rtasida qanday tanlov qilasiz?
    * **Javob:** HttpOnly Cookie xavfsizroq, chunki u XSS orqali token o'g'irlanishini butunlay oldini oladi. Biroq u CSRF-ga zaif bo'lgani sababli, SameSite=Strict va anti-CSRF tokenlar birga ishlatiladi.

11. **Savol:** IndexedDB tranzaksiyalarining \`abort\` va \`commit\` mexanizmlari qanday ishlaydi va ziddiyatlarda ma'lumotlar qanday himoyalanadi?
    * **Javob:** IndexedDB tranzaksiyalari reliesion bazalardek barqaror. Agar biror operatsiya xato bersa, butun tranzaksiya avtomatik abort bo'ladi va o'zgarishlar bekor qilinadi.

12. **Savol:** Foydalanuvchi qurilmasida disk joyi to'lib qolsa, brauzer storage ma'lumotlarini (LocalStorage, IndexedDB) qanday o'chiradi (Storage Eviction)?
    * **Javob:** Brauzerlar disk to'lganda avtomatik kesh va storage-larni tozalaydi (Eviction policy). Buning oldini olish uchun \`navigator.storage.persist()\` yordamida storage-ni o'chmas holatga (persistent storage) keltirish so'raladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Offline rejimida ishlaydigan pochtachi ilovasi (Offline-first PWA)
Pochtachi internet yo'q joylarda uylarni aylanib, xatlarni topshiradi va mobil ilovada "Topshirildi" deb belgilaydi.

#### Muammo:
Internet yo'qligida ma'lumotlar yo'qolmasligi va internet kelishi bilan serverga yuklanishi shart. LocalStorage hajmi bunga yetarli bo'lmasligi mumkin.

#### Yechim:
Biz **IndexedDB**-da \`offline_actions\` nomli jadval yaratamiz. Pochtachi amal bajarganda, u IndexedDB-ga yoziladi:
\`\`\`javascript
function saveOfflineAction(db, action) {
  const tx = db.transaction('offline_actions', 'readwrite');
  tx.objectStore('offline_actions').add(action);
}
\`\`\`
Internet tiklangach, fondagi Service Worker IndexedDB-dagi barcha amallarni o'qib serverga jo'natadi va IndexedDB-ni tozalaydi.

---

## 9. 🚀 Performance va Optimization

* **Sinxron yuklama:** \`localStorage\` va \`sessionStorage\` sinxron ishlagani uchun, ularni ko'p va tez-tez o'qish brauzer render tezligini (FPS) pasaytiradi.
* **IndexedDB kesh:** Murakkab loyihalarda faqat IndexedDB-dan foydalaning va yuklamani asinxron taqsimlang.

---

## 10. 📌 Cheat Sheet

| Storage | Hajmi | Expiration | Xavfsizlik |
| :--- | :--- | :--- | :--- |
| **LocalStorage** | 5-10 MB | Doimiy | XSS-ga zaif |
| **SessionStorage**| 5 MB | Tab yopilguncha | XSS-ga zaif |
| **Cookies** | 4 KB | Belgilangan sana | HttpOnly bilan xavfsiz |
| **IndexedDB** | Cheksiz | Doimiy | Asinxron va xavfsiz |
`,
  exercises: [
  {
    "id": 1,
    "title": "Vaqtinchalik Ma'lumot (SessionStorage)",
    "instruction": "Kritilgan kalit (`key`) va qiymatni (`val`) `sessionStorage`-ga saqlaydigan va so'ngra uni qayta o'qib qaytaradigan `saveSessionData(key, val)` funksiyasini yozing.",
    "startingCode": "function saveSessionData(key, val) {\n  // Kodni yozing\n}",
    "hint": "sessionStorage.setItem(key, val); return sessionStorage.getItem(key);",
    "test": "try { const res = saveSessionData('theme', 'dark'); if(res !== 'dark') return 'Qiymat to\\'g\\'ri saqlanmadi'; if(sessionStorage.getItem('theme') !== 'dark') return 'sessionStorage ishlatilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Cookie Yaratuvchi Helper",
    "instruction": "Cookie formatidagi stringni qaytaruvchi `formatCookie(name, value)` funksiyasini yozing. U `SameSite=Strict; Secure` parametrlariga ega bo'lsin.",
    "startingCode": "function formatCookie(name, value) {\n  // Kodni yozing\n}",
    "hint": "return name + '=' + value + '; SameSite=Strict; Secure';",
    "test": "try { const res = formatCookie('session', '123'); if(res !== 'session=123; SameSite=Strict; Secure') return 'Cookie formati xato'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "IndexedDB Ochish",
    "instruction": "`test-db` nomli IndexedDB bazasini ochishga so'rov yuboradigan va muvaffaqiyatli ochilganda database nomini resolve qiladigan Promise qaytaruvchi `openDatabasePromise()` funksiyasini yozing.",
    "startingCode": "function openDatabasePromise() {\n  return new Promise((resolve, reject) => {\n    // indexedDB.open\n  });\n}",
    "hint": "const request = indexedDB.open('test-db', 1); request.onsuccess = (e) => resolve(e.target.result.name); request.onerror = () => reject('xato');",
    "test": "try { return openDatabasePromise().then(name => { if(name !== 'test-db') return 'Baza nomi noto\\'g\\'ri'; return null; }).catch(err => 'Xatolik: ' + err); } catch(e) { return 'Xato: ' + e.message; }"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "SessionStorage-ga saqlangan ma'lumotlar qachon o'chib ketadi?",
    "options": [
      "Faqat server o'chganda",
      "Brauzer oynasi (tab) yopilishi bilan",
      "1 soatdan keyin",
      "Hech qachon o'chmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "SessionStorage ma'lumotlari faqat joriy brauzer tabi ochiq turguncha saqlanadi va u yopilganda o'chadi."
  },
  {
    "id": 2,
    "question": "Cookies-ning eng katta hajmi qancha bo'ladi?",
    "options": ["~5 MB", "~10 MB", "~4 KB", "Cheksiz"],
    "correctAnswer": 2,
    "explanation": "Cookies juda kichik saqlash xotirasiga ega bo'lib, maksimal hajm qariyb 4 kilobaytni tashkil qiladi."
  },
  {
    "id": 3,
    "question": "Quyidagilardan qaysi biri har safar HTTP so'rov yuborilganda serverga avtomatik jo'natiladi?",
    "options": ["LocalStorage", "SessionStorage", "Cookies", "IndexedDB"],
    "correctAnswer": 2,
    "explanation": "Cookies so'rov sarlavhasi (request headers) orqali har safar serverga avtomatik uzatiladi, qolgan storagelar esa faqat brauzerda qoladi."
  },
  {
    "id": 4,
    "question": "Cookies-da HttpOnly bayrog'i (flag) nima uchun kerak?",
    "options": [
      "Faqat HTTP portini tekshirish uchun",
      "JavaScript skriptlaridan uni o'qish imkonini to'sib, XSS hujumidan himoya qilish uchun",
      "Xotirani tozalash uchun",
      "Cookies tezligini oshirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "HttpOnly cookie-larni JavaScript orqali (document.cookie) o'qib bo'lmaydi, bu esa hackerlarga sessiya tokenlarini o'g'irlashni taqiqlaydi."
  },
  {
    "id": 5,
    "question": "IndexedDB reliesion ma'lumotlar bazasimi?",
    "options": [
      "Ha, u PostgreSQL kabi ishlaydi",
      "Yo'q, u reliesion emas (NoSQL) hujjat va obyektlarni saqlovchi asinxron bazadir",
      "Faqat rasmlarni saqlaydi",
      "Sinxron ma'lumotlar bazasi"
    ],
    "correctAnswer": 1,
    "explanation": "IndexedDB reliesion emas (NoSQL), u kalit-qiymat va obyektlar do'koni ko'rinishida asinxron ishlaydigan bazadir."
  },
  {
    "id": 6,
    "question": "CSRF (Cross-Site Request Forgery) hujumlaridan himoyalanishda Cookies ning qaysi atributi yordam beradi?",
    "options": ["Secure", "SameSite", "Expires", "Path"],
    "correctAnswer": 1,
    "explanation": "SameSite atributi (Strict, Lax, None) uchinchi tomon so'rovlariga cookie biriktirilishini cheklaydi, bu esa CSRF hujumidan himoya qiladi."
  },
  {
    "id": 7,
    "question": "IndexedDB nima uchun asinxron (Promise va Callback asosida) ishlaydi?",
    "options": [
      "U juda eski texnologiya bo'lgani uchun",
      "Katta hajmdagi disk amallari paytida brauzer interfeysi qotib qolmasligi (non-blocking) uchun",
      "Faqat internetda ishlashi uchun",
      "Sinxron ishlash taqiqlangani uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Disk amallari sekin bo'lgani uchun, u sinxron bo'lsa render thread (UI) qotib qolardi. Shuning uchun asinxron qilingan."
  },
  {
    "id": 8,
    "question": "Faqat HTTPS (xavfsiz protokol) orqali cookie uzatilishini ta'minlash uchun qaysi bayroq qo'yiladi?",
    "options": ["HttpOnly", "Secure", "SameSite", "Expires"],
    "correctAnswer": 1,
    "explanation": "Secure flagi cookie faqat shifrlangan HTTPS ulanishlari orqali yuborilishini kafolatlaydi."
  },
  {
    "id": 9,
    "question": "LocalStorage-da katta hajmdagi JSON stringlarini tez-tez parse qilish qanday salbiy oqibatlarga olib kelishi mumkin?",
    "options": [
      "Baza o'chib ketadi",
      "Sinxron bajarilgani uchun CPU band bo'lib, render va kadr o'tkazish (FPS) pasayadi",
      "Hech qanday salbiy tomoni yo'q",
      "Internet sekinlashadi"
    ],
    "correctAnswer": 1,
    "explanation": "JSON.parse/stringify sinxrondir. Katta obyektlar bilan tez-tez bajarganda UI thread bloklanishi va qotishi mumkin."
  },
  {
    "id": 10,
    "question": "IndexedDB-da 'objectStore' nima?",
    "options": [
      "LocalStorage kaliti",
      "U relying bazadagi 'Jadval' (Table) vazifasini bajaruvchi obyektlar do'konidir",
      "Faqat rasmlar saqlaydigan papka",
      "Baza xotirasi"
    ],
    "correctAnswer": 1,
    "explanation": "objectStore IndexedDB-da obyektlar saqlanadigan joy bo'lib, relyatsion bazalardagi 'Table' (Jadval) kabi ishlaydi."
  },
  {
    "id": 11,
    "question": "Foydalanuvchi qurilmasida disk joyi to'lib qolganda brauzer storage-larni o'chirib tashlamasligi uchun nima qilinadi?",
    "options": [
      "Hech narsa qilib bo'lmaydi",
      "navigator.storage.persist() orqali storage-ga persistent (o'chmas) maqom berish so'raladi",
      "Baza paroli o'zgartiriladi",
      "LocalStorage o'chiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Persistent storage so'rash orqali brauzer disk to'lganda ham bizning IndexedDB ma'lumotlarimizni avtomatik tozalab yubormaydi."
  },
  {
    "id": 12,
    "question": "SameSite=Strict cookie qiymati qanday ishlaydi?",
    "options": [
      "Cookie faqat HTTPS orqali ketadi",
      "Cookie uchinchi tomon havolalaridan o'tgan yoki boshqa saytda bo'lgan so'rovlarga mutlaqo qo'shib yuborilmaydi",
      "JS uni bemalol o'qiy oladi",
      "Baza xavfsizligini ta'minlamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Strict qiymatida cookie faqat foydalanuvchi to'g'ridan-to'g'ri aynan shu sayt ichida bo'lgandagina yuboriladi, bu esa CSRF hujumini to'liq to'xtatadi."
  }
]

};
