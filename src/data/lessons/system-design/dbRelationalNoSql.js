export const dbRelationalNoSql = {
  id: "dbRelationalNoSql",
  title: "Ma'lumotlar Bazalari: Relational (SQL) vs NoSQL",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Relational (SQL) va NoSQL nima?
Ma\\'lumotlar bazasini tanlash — bu uyingizdagi narsalarni qanday tartiblash haqida qaror qabul qilish kabidir:
* **Relational (SQL) ma\\'lumotlar bazasi** — bu har bir tortmasi aniq o\\'lchamga ega, kiyimlar qat\\'iy qoidalar asosida guruhlangan **klassik shkaf** (Wardrobe). Har bir ko\\'ylak faqat o\\'z bo\\'limiga (Table) joylashadi va uning rangi, o\\'lchami oldindan belgilangan bo\\'lishi kerak (Schema). Agar siz shim bilan ko\\'ylakni birga ko\\'rmoqchi bo\\'lsangiz, ularni bog\\'lovchi maxsus ilgichlardan (Foreign Key/JOIN) foydalanasiz.
* **NoSQL ma\\'lumotlar bazasi** — bu har xil turdagi qutilardan iborat **zamonaviy omborxona** (Storage unit). Bu yerda qutilar har xil o\\'lchamda bo\\'lishi (Schema-less), ba\\'zi qutilarda faqat bitta kalit va qiymat (Key-Value), boshqalarida butun boshli hujjatlar to\\'plami (Document Store), yoki bir-biri bilan arqon orqali bog\\'langan buyumlar (Graph) bo\\'lishi mumkin.

### Real hayotiy analogiya
Tasavvur qiling, siz **kutubxona** yoki **kitob do\\'konini** boshqaryapsiz:
* **SQL yondashuvi:** Sizda \\"Mualliflar\\" jadvali, \\"Kitoblar\\" jadvali va ularni bog\\'lovchi \\"Kitob_Muallif\\" bog\\'liqlik jadvali bor. Har bir kitob qat\\'iy ravishda bitta yoki bir nechta muallif ID-siga ega bo\\'lishi shart. Agar birorta muallif o\\'chsa, kitobning yetim qolmasligini kafolatlovchi qoidalar (Referential Integrity) bor.
* **NoSQL yondashuvi (Document):** Har bir kitob alohida JSON hujjat ko\\'rinishida saqlanadi. Kitobning ichida uning mualliflari ismi, yoshi va hatto yozgan boshqa kitoblari ro\\'yxati to\\'g\\'ridan-to\\'g\\'ri kitobning ichiga \\"joylashtirilgan\\" (Embedded). JOIN qilish shart emas, bitta kitobni so\\'raganingizda unga tegishli hamma narsa bir zumda chiqib keladi.

---

## 2. 💻 Real Kod Misollari

### 1. SQL-dagi Tranzaksiyalar (ACID) - PostgreSQL
Tashqi to\\'lovni amalga oshirish va balansni xavfsiz yangilash:
\\\`\`\`javascript
// PostgreSQL-da tranzaksiya simulyatsiyasi
async function transferFunds(client, fromAccountId, toAccountId, amount) {
  try {
    await client.query('BEGIN'); // Tranzaksiya boshlanishi
    
    // 1. Pul yuboruvchining balansini tekshiramiz va kamaytiramiz
    const withdrawRes = await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
      [amount, fromAccountId]
    );
    if (withdrawRes.rowCount === 0) {
      throw new Error("Mablag\\' yetarli emas yoki hisob topilmadi");
    }

    // 2. Pul qabul qiluvchining balansini oshiramiz
    const depositRes = await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toAccountId]
    );
    if (depositRes.rowCount === 0) {
      throw new Error("Qabul qiluvchi hisobi topilmadi");
    }

    await client.query('COMMIT'); // Tranzaksiyani tasdiqlash
    return true;
  } catch (error) {
    await client.query('ROLLBACK'); // Xatolik yuz bersa, barchasini bekor qilish
    console.error("Tranzaksiya bekor qilindi:", error.message);
    return false;
  }
}
\\\`\`\`

### 2. Document Store (MongoDB) - Embedding vs Referencing
MongoDB-da foydalanuvchi va uning manzillarini embedding (ichiga joylashtirish) va referencing (havola berish) usullari:
\\\`\`\`javascript
// 1. Embedding (Tez o\\'qish, kam o\\'zgaradigan ma\\'lumotlar uchun)
const embeddedUser = {
  _id: "user123",
  username: "farhod_dev",
  email: "farhod@example.com",
  addresses: [
    { city: "Tashkent", street: "Amir Temur 45", zip: "100000" },
    { city: "Samarkand", street: "Registon 12", zip: "140100" }
  ]
};

// 2. Referencing (Ko\\'p o\\'zgaradigan yoki ulkan massivlar uchun)
const userRef = {
  _id: "user123",
  username: "farhod_dev"
};

const addressRefs = [
  { _id: "addr1", userId: "user123", city: "Tashkent", street: "Amir Temur 45" },
  { _id: "addr2", userId: "user123", city: "Samarkand", street: "Registon 12" }
];
\\\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### SQL vs NoSQL Ma\\'lumotlar tuzilishi
Quyidagi diagrammada bitta foydalanuvchi va uning do\\'stlari turli xil ma\\'lumotlar bazalarida qanday saqlanishi ko\\'rsatilgan:

\\\`\`\`mermaid
graph TD
    subgraph Relational (SQL - JOIN tables)
        R_User[Users Table: id, name] -->|1:N| R_Friends[Friends Table: user_id, friend_id]
    end

    subgraph Document Store (NoSQL - MongoDB JSON)
        D_Doc["{ id: 1, name: 'Ali', friends: [ { id: 2, name: 'Vali' } ] }"]
    end

    subgraph Wide-Column (NoSQL - Cassandra)
        C_Table["Partition Key: user_id | Clustering Key: friend_id | friend_name"]
    end

    subgraph Graph DB (NoSQL - Neo4j)
        G_Ali((Node: Ali)) -->|FRIEND_OF| G_Vali((Node: Vali))
    end
\\\`\`\`

### Tranzaksiyalar: ACID vs BASE
* **ACID (SQL uchun xos):**
  * **Atomicity (Butunlik):** Tranzaksiyadagi barcha amallar yoki to\\'liq bajariladi, yoki hech biri bajarilmaydi.
  * **Consistency (Moslik):** Tranzaksiya bazani bir to\\'g\\'ri holatdan ikkinchi to\\'g\\'ri holatga o\\'tkazadi.
  * **Isolation (Ajratilganlik):** Parallel ishlayotgan tranzaksiyalar bir-biriga xalaqit bermaydi.
  * **Durability (Chidamlilik):** Tizim o\\'chib qolsa ham, tasdiqlangan ma\\'lumotlar bazada qoladi.
* **BASE (NoSQL uchun xos):**
  * **Basically Available (Asosiy mavjudlik):** Tizim har doim javob beradi (xatolik bo\\'lsa ham).
  * **Soft state (Yumshoq holat):** Ma\\'lumotlar foydalanuvchi aralashuvisiz ham vaqt o\\'tishi bilan o\\'zgarishi mumkin.
  * **Eventual consistency (Yakuniy moslik):** Ma\\'lumotlar barcha replikalarga tarqalishi uchun vaqt ketadi, ammo oxir-oqibat hamma joyda bir xil bo\\'ladi.

### Normalizatsiya Qoidalari (Data Normalization)
1. **Birinchi Normal Shakl (1NF):** Har bir katakda faqat bitta (atomar) qiymat bo\\'lishi kerak, takrorlanuvchi guruhlar bo\\'lmasligi lozim.
2. **Ikkinchi Normal Shakl (2NF):** 1NF talablariga javob berishi va har bir no-kalit ustun birlamchi kalitga (Primary Key) to\\'liq bog\\'liq bo\\'lishi kerak (qisman bog\\'liqlik taqiqlanadi).
3. **Uchinchi Normal Shakl (3NF):** 2NF talablariga javob berishi va hech bir ustun tranzitiv (bilvosita) bog\\'liq bo\\'lmasligi kerak (masalan, \`A -> B -> C\` bog\\'liqlik bo\\'lsa, \`C\` alohida jadvalga o\\'tkaziladi).

### NoSQL turlari va ularning ishlatilish holatlari:
1. **Key-Value (Redis, DynamoDB):** O\\'ta yuqori tezlikdagi keshlash, sessiyalar saqlash.
2. **Document Store (MongoDB, CouchDB):** Moslashuvchan va tez o\\'zgaruvchan sxemalar, e-tijorat savatlari.
3. **Wide-Column / Columnar (Cassandra, ScyllaDB):** Ulkan hajmdagi vaqt seriyalari (timeseries), loglar yozish (yozish tezligi juda yuqori).
4. **Graph Databases (Neo4j, Amazon Neptune):** Ijtimoiy tarmoqlar, tavsiya tizimlari (Recommendation engines), firibgarlikni aniqlash.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Relational Schema-dan Document Modelga ko\\'chish
Faraz qilaylik, bizda SQL bazada foydalanuvchilar va ularning telefon raqamlari jadvallari bor. Biz buni MongoDB uchun yagona Document ko\\'rinishiga keltirmoqchimiz.

\\\`\`\`javascript
// SQL jadvallar simulyatsiyasi
const sqlUsers = [
  { id: 1, name: "Ali", email: "ali@gmail.com" },
  { id: 2, name: "Vali", email: "vali@gmail.com" }
];

const sqlPhones = [
  { id: 10, user_id: 1, type: "work", number: "+998901112233" },
  { id: 11, user_id: 1, type: "home", number: "+998914445566" },
  { id: 12, user_id: 2, type: "work", number: "+998937778899" }
];

// Document modelga o\\'tkazuvchi transformator funksiya
function transformToDocument(users, phones) {
  return users.map(user => {
    // Har bir foydalanuvchi uchun tegishli telefonlarni topib, massiv ko\\'rinishida joylaymiz
    const userPhones = phones
      .filter(p => p.user_id === user.id)
      .map(p => ({ type: p.type, number: p.number }));
      
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      contacts: userPhones // Embedded array
    };
  });
}

const docResult = transformToDocument(sqlUsers, sqlPhones);
console.log(JSON.stringify(docResult, null, 2));
\\\`\`\`

---

## 5. ⚠️ Ko\\'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Har qanday loyiha uchun o\\'ylamasdan NoSQL (MongoDB) tanlash
* **Xavf:** Dasturda murakkab moliyaviy hisob-kitoblar, tranzaksiyalar va o\\'zaro bog\\'liq ma\\'lumotlar (JOIN-lar) ko\\'p bo\\'lsa-da, \\"moda\\" ortidan quvib MongoDB tanlash. Natijada kod darajasida sun\\'iy JOIN-lar yozishga to\\'g\\'ri keladi, bu esa sekin va xatoliklarga boy bo\\'ladi.
* **Tuzatish:** Agar ma\\'lumotlar qat\\'iy bog\\'langan bo\\'lsa, relational bazalardan (PostgreSQL, MySQL) foydalaning.

### 2. NoSQL-da Normalizatsiya qilishga urinish
* **Xavf:** MongoDB-da ma\\'lumotlarni SQL kabi jadvalchalarga bo\\'lib tashlab, har bir joyga havola (Reference) qo\\'yib chiqish. Buning oqibatida har bir o\\'qish so\\'rovida 5-6 marta DB so\\'rovi (N+1 query problem) yuzaga keladi.
* **Tuzatish:** NoSQL-ning tabiatiga ko\\'ra, tez-tez o\\'qiladigan ma\\'lumotlarni bir joyga embed (ichiga yozish) qiling va denormalizatsiyadan qo\\'rqmang.

### 3. Cassandra-da ad-hoc query-lar yozishni kutish
* **Xavf:** Wide-column bazalarda (Cassandra) sxemani loyihalashdan oldin qanday so\\'rovlar (queries) bo\\'lishini rejalashtirmaslik. Cassandra-da so\\'rovlar faqatgina **Partition Key** va **Clustering Key** bo\\'yicha ishlaydi. \`ALLOW FILTERING\`-ni yoqib so\\'rov yuborish butun klasterni qulashiga olib kelishi mumkin.
* **Tuzatish:** Har doim **Query-Driven Design** tamoyiliga amal qiling: oldin so\\'rovlarni aniqlang, keyin esa shu so\\'rovga moslab jadval sxemasini loyihalang.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyat | Relational (SQL) | NoSQL (Document / Key-Value) |
| :--- | :--- | :--- |
| **Sxema** | Qat\\'iy va oldindan belgilangan | Moslashuvchan va dinamik (Schema-less) |
| **Masshtablanish** | Vertikal (Kattaroq server qo\\'yish) | Gorizontal (Ko\\'p sonli arzon serverlar) |
| **Bog\\'liqliklar** | Tranzaksion JOIN-lar mavjud | JOIN yo\\'q, embed yoki referencing |
| **Tranzaksiyalar** | Kuchli ACID kafolati | BASE (Eventual consistency) |
| **Asosiy kuch** | Murakkab so\\'rovlar, yaxlitlik | Tez yozish/o\\'qish, moslashuvchanlik |

---

## 7. ❓ Savollar va Javoblar

### 1. Polyglot Persistence nima?
Bu bitta yirik tizimda uning turli ehtiyojlari uchun har xil turdagi ma\\'lumotlar bazalarini birgalikda ishlatishdir. Masalan:
* Foydalanuvchilar va to\\'lovlar uchun — **PostgreSQL** (ACID muhim).
* Tezkor qidiruv uchun — **Elasticsearch** (matnli qidiruv).
* Sessiyalar va kesh uchun — **Redis** (in-memory tezlik).
* Tavsiyalar va do\\'stlar tarmog\\'i uchun — **Neo4j** (Graph).

### 2. Denormalizatsiya nima va u qachon kerak?
Denormalizatsiya — bu o\\'qish operatsiyalarini tezlashtirish uchun ma\\'lumotlarni ataylab takrorlab saqlashdir. Masalan, maqola hujjati ichida muallif nomini ham saqlash. Bu muallif jadvaliga JOIN qilishdan qutqaradi, biroq muallif nomi o\\'zgarganda hamma maqolalarni yangilash kerakligini anglatadi (Write cost oshadi, Read cost kamayadi).

---

## 8. 🧠 O\\'z-o\\'zini Tekshirish

1. Qaysi normal shaklda tranzitiv bog\\'liqliklar butunlay yo\\'qotiladi?
2. Nima uchun graph ma\\'lumotlar bazalari ijtimoiy tarmoqlar yoki tavsiya tizimlari uchun eng yaxshi tanlov hisoblanadi?
3. Eventual Consistency (Yakuniy moslik) nima va u qaysi NoSQL tizimlarida eng ko\\'p uchraydi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi Javascript mashqlari yordamida SQL-dan NoSQL-ga o\\'tish, 3NF normalarini tekshirish, graph bazalardagi BFS algoritmi va polyglot persistenceni kod darajasida simulyatsiya qiling.

---

## 10. 📌 Cheat Sheet

1. **SQL:** Ma\\'lumotlar yaxlitligi va murakkab hisobotlar kerak bo\\'lsa foydalaning.
2. **NoSQL:** Gorizontal kengayish (Sharding) va moslashuvchan sxemalar kerak bo\\'lsa tanlang.
3. **Embed (MongoDB):** Agar bog\\'liq ma\\'lumotlar asosiy hujjat bilan birga o\\'qilsa va o\\'lchami 16MB-dan oshmasa.
4. **Reference:** Agar bog\\'liq ma\\'lumotlar juda tez o\\'zgarib tursa yoki N:M (ko\\'pga ko\\'p) munosabatda bo\\'lsa.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Relational to Document Mapper",
      instruction: "Relational ma'lumotlar bazasidan olingan foydalanuvchilar (users), buyurtmalar (orders) va buyurtma tovarlari (orderItems) jadvallarini yagona ichma-ich joylashgan (embedded) JSON hujjatlar massiviga aylantiruvchi `mapRelationalToDocument(users, orders, orderItems)` funksiyasini yozing.\n\nHar bir natijaviy foydalanuvchi hujjati quyidagi ko'rinishda bo'lishi kerak:\n```json\n{\n  \"id\": 1,\n  \"name\": \"Ali\",\n  \"orders\": [\n    {\n      \"orderId\": 101,\n      \"date\": \"2026-06-10\",\n      \"items\": [\n        { \"productId\": 501, \"quantity\": 2, \"price\": 150 }\n      ]\n    }\n  ]\n}\n```",
      startingCode: "function mapRelationalToDocument(users, orders, orderItems) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir user uchun unga tegishli orders-ni filter qiling. Har bir order uchun unga mos orderItems-ni topib, faqat productId, quantity, price-ni saqlang.",
      test: "if (typeof mapRelationalToDocument !== 'function') return 'mapRelationalToDocument funksiya emas';\nconst users = [{ id: 1, name: 'Ali' }, { id: 2, name: 'Vali' }];\nconst orders = [\n  { id: 101, user_id: 1, date: '2026-06-10' },\n  { id: 102, user_id: 2, date: '2026-06-11' }\n];\nconst items = [\n  { order_id: 101, product_id: 501, quantity: 2, price: 150 },\n  { order_id: 102, product_id: 502, quantity: 1, price: 300 }\n];\nconst res = mapRelationalToDocument(users, orders, items);\nif (res.length !== 2) return 'Natijada 2 ta user bo\\'lishi kerak';\nif (res[0].orders.length !== 1) return 'Ali-da bitta buyurtma bo\\'lishi kerak';\nif (res[0].orders[0].items[0].price !== 150) return 'Tovar narxi noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ Uchinchi Normal Shakl (3NF) Tekshiruvchisi",
      instruction: "Uchinchi normal shakl (3NF) qoidalarini tekshirish uchun soddalashtirilgan `violates3NF(attributes, functionalDependencies, primaryKeys)` funksiyasini yozing.\n\nAgar `X -> Y` ko'rinishidagi funksional bog'liqlik vaqtida quyidagi shartlardan HECH BIRI bajarilmasa, u holda 3NF buzilgan (violated) hisoblanadi (va funksiya `true` qaytaradi):\n1. `X` ustunlar to'plami superkey bo'lsa (ya'ni `primaryKeys` tarkibidagi kalitlarni to'liq o'z ichiga olsa. Sodda qilib aytganda, `X` massivi `primaryKeys`dagi barcha kalitlarni o'z ichiga olishi kerak: har bir kalit `X`da mavjud bo'lishi kerak).\n2. `Y` tarkibidagi barcha attributlar birlamchi/kalit attributlar bo'lsa (ya'ni `Y`dagi har bir element `primaryKeys` massivida mavjud bo'lsa).\n3. `X` va `Y` bir xil attributlarni o'z ichiga olsa (trivial bog'liqlik - ya'ni `Y`dagi barcha elementlar `X`da ham mavjud bo'lsa).\n\nAgar birorta ham bunday buzilish topilmasa, funksiya `false` qaytaradi.",
      startingCode: "function violates3NF(attributes, functionalDependencies, primaryKeys) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir fd uchun X = fd.from va Y = fd.to deb oling. 1-shart: primaryKeys-ning barcha elementlari X-da bormi? 2-shart: Y-ning barcha elementlari primaryKeys-da bormi? 3-shart: Y-ning barcha elementlari X-da bormi? Agar uchala shart ham bajarilmasa, true (buzilish bor) qaytaring.",
      test: "if (typeof violates3NF !== 'function') return 'violates3NF funksiya emas';\nconst primaryKeys = ['student_id'];\nconst fdsValid = [\n  { from: ['student_id'], to: ['name'] },\n  { from: ['student_id'], to: ['major'] }\n];\nconst fdsInvalid = [\n  { from: ['student_id'], to: ['major'] },\n  { from: ['major'], to: ['department_head'] }\n];\nif (violates3NF(['student_id', 'name', 'major'], fdsValid, primaryKeys) !== false) return 'To\\'g\\'ri 3NF sxemasi uchun false chiqishi kerak';\nif (violates3NF(['student_id', 'major', 'department_head'], fdsInvalid, primaryKeys) !== true) return 'Tranzitiv bog\\'liqlik bo\\'lsa true chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Query-Driven Key Router (Cassandra Simulyatori)",
      instruction: "Wide-Column bazalarda ma'lumotlar qaysi tugunga (Node) yozilishini aniqlash uchun Partition Key ishlatiladi. `routeQuery(partitionKey, nodesCount)` funksiyasini yozing.\nFunksiya partitionKey (string) ning har bir belgisining ASCII qiymatlari yig'indisini hisoblab, uni `nodesCount` soniga bo'lgandagi qoldig'ini (Node ID) qaytarsin. Agar kirish qiymatlari noto'g'ri bo'lsa, `0` qaytaring.",
      startingCode: "function routeQuery(partitionKey, nodesCount) {\n  // Kodni shu yerda yozing\n}",
      hint: "partitionKey satrini sikl orqali aylanib, charCodeAt() yordamida belgilar ASCII qiymatlarini yig'ing va % nodesCount amalini bajaring.",
      test: "if (typeof routeQuery !== 'function') return 'routeQuery funksiya emas';\nif (routeQuery('user_101', 4) !== 3) return 'user_101 node 3-ga yo\\'naltirilishi kerak edi';\nif (routeQuery('user_999', 5) !== 2) return 'user_999 node 2-ga yo\\'naltirilishi kerak edi';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ BFS Graph Traversal for N-Degree Friends",
      instruction: "Graph ma'lumotlar bazasida ikki foydalanuvchi o'rtasidagi yaqinlik darajasini aniqlash juda tez ishlaydi. Berilgan foydalanuvchilar do'stligi grafigida berilgan `startUser`dan aniq `degree` uzoqlikdagi barcha do'stlarni topuvchi `findFriendsAtDegree(graph, startUser, degree)` funksiyasini yozing (BFS algoritmi yordamida).\n\nMisol grafik tuzilishi:\n```javascript\nconst graph = {\n  'Ali': ['Vali', 'Sardor'],\n  'Vali': ['Ali', 'Jasur'],\n  'Sardor': ['Ali'],\n  'Jasur': ['Vali']\n};\n```\nAgar `startUser` 'Ali' va `degree` 2 bo'lsa, Ali-ning 2-darajali do'sti bu 'Jasur' (chunki Ali -> Vali -> Jasur). Natija takrorlanmas ismlar massivi bo'lishi kerak va `startUser` o'zi yoki 1-darajali do'stlar bu ro'yxatga kirmasligi kerak.",
      startingCode: "function findFriendsAtDegree(graph, startUser, degree) {\n  // Kodni shu yerda yozing\n}",
      hint: "BFS navbati (queue) va har bir foydalanuvchigacha bo'lgan masofani (distance Map) saqlang. Faqat masofasi berilgan degree-ga teng bo'lgan do'stlarni qaytaring.",
      test: "if (typeof findFriendsAtDegree !== 'function') return 'findFriendsAtDegree funksiya emas';\nconst graph = {\n  'Ali': ['Vali', 'Sardor'],\n  'Vali': ['Ali', 'Jasur'],\n  'Sardor': ['Ali', 'Bobur'],\n  'Jasur': ['Vali'],\n  'Bobur': ['Sardor']\n};\nconst res = findFriendsAtDegree(graph, 'Ali', 2);\nif (!res.includes('Jasur') || !res.includes('Bobur')) return '2-darajali do\\'stlar Jasur va Bobur bo\\'lishi kerak';\nif (res.includes('Ali') || res.includes('Vali')) return 'Asosiy user yoki 1-darajali do\\'stlar kirmasligi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Custom Document Schema Validator",
      instruction: "NoSQL bazalar sxemasiz (schema-less) bo'lsa-da, ko'pincha dastur darajasida validatsiya kerak bo'ladi. Hujjat (document) berilgan sxema (schema) talablariga javob berishini tekshiruvchi `validateDocument(doc, schema)` funksiyasini yozing.\n\nSxema formati:\n```json\n{\n  \"username\": { \"type\": \"string\", \"required\": true },\n  \"age\": { \"type\": \"number\", \"required\": false },\n  \"tags\": { \"type\": \"array\", \"required\": true }\n}\n```\nAgar barcha qoidalar to'g'ri bo'lsa `true`, birorta shart bajarilmasa `false` qaytaring. Massiv uchun `Array.isArray()` ishlating.",
      startingCode: "function validateDocument(doc, schema) {\n  // Kodni shu yerda yozing\n}",
      hint: "Sxemadagi har bir kalit uchun required bo'lsa va doc-da yo'q bo'lsa false qaytaring. Agar doc-da bo'lsa, uning type-ini tekshiring (string, number, array).",
      test: "if (typeof validateDocument !== 'function') return 'validateDocument funksiya emas';\nconst schema = {\n  username: { type: 'string', required: true },\n  age: { type: 'number', required: false },\n  tags: { type: 'array', required: true }\n};\nif (validateDocument({ username: 'ali', tags: ['js'] }, schema) !== true) return 'To\\'g\\'ri hujjat validatsiyadan o\\'tishi kerak';\nif (validateDocument({ age: 25, tags: ['js'] }, schema) !== false) return 'Majburiy maydon bo\\'lmaganda false chiqishi kerak';\nif (validateDocument({ username: 'ali', tags: 'not-array' }, schema) !== false) return 'Turi noto\\'g\\'ri bo\\'lganda false chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Denormalization Dynamic Sync Helper",
      instruction: "Denormalizatsiya qilingan tizimlarda ma'lumotlar bir nechta replica yoki kolleksiyalarda nusxalanadi. Agar birlamchi obyekt yangilansa, nusxalangan joylarni ham yangilash lozim. `syncDenormalizedData(primaryDb, replicaDb, updateLog)` funksiyasini yozing.\n\n`updateLog` bu o'zgarishlar tarixi bo'lib, har bir o'zgarish `{ userId: 1, field: 'name', newValue: 'Alisher' }` ko'rinishida bo'ladi.\n`primaryDb` foydalanuvchilar ro'yxati: `[{ id: 1, name: 'Ali' }]`.\n`replicaDb` esa postlar kolleksiyasi bo'leadig, unda muallif nomi nusxalangan: `[{ postId: 101, author: { id: 1, name: 'Ali' } }]`.\n\nFunksiya log bo'yicha `replicaDb`dagi barcha mos keluvchi postlarning author ismini yangilab, o'zgargan `replicaDb`ni qaytarsin.",
      startingCode: "function syncDenormalizedData(primaryDb, replicaDb, updateLog) {\n  // Kodni shu yerda yozing\n}",
      hint: "updateLog-dagi har bir o'zgarish uchun, replicaDb-dagi author.id mos keladigan postlarni topib, author.name qiymatini yangilang.",
      test: "if (typeof syncDenormalizedData !== 'function') return 'syncDenormalizedData funksiya emas';\nconst primaryDb = [{ id: 1, name: 'Ali' }];\nconst replicaDb = [\n  { postId: 101, title: 'Post 1', author: { id: 1, name: 'Ali' } },\n  { postId: 102, title: 'Post 2', author: { id: 2, name: 'Vali' } }\n];\nconst updateLog = [{ userId: 1, field: 'name', newValue: 'Alisher' }];\nconst res = syncDenormalizedData(primaryDb, replicaDb, updateLog);\nif (res[0].author.name !== 'Alisher') return '101-post muallifining ismi yangilanmadi';\nif (res[1].author.name !== 'Vali') return 'Boshqa muallif nomi tasodifan o\\'zgardi';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Embedding vs Referencing Cost Calculator",
      instruction: "Loyiha uchun eng arzon modelni tanlashda xotira hajmini hisoblash kerak. `calculateStorageCost(userCount, avgOrdersPerUser, embedSpec, refSpec)` funksiyasini yozing.\n\nUshbu funksiya Embedding va Referencing modellarining umumiy bayt hajmini hisoblab taqqoslaydi.\n\nFormulalar:\n* **Embedding modeli xotira hajmi:**\n  `UserHajmi + avgOrdersPerUser * OrderHajmi` har bir user uchun. Umumiy hajmni topish uchun buni `userCount`ga ko'paytirasiz.\n  Bu yerda `UserHajmi` va `OrderHajmi` parametrda berilgan `embedSpec` obyektidan olinadi: `{ userSize, orderSize }`.\n* **Referencing modeli xotira hajmi:**\n  User alohida saqlanadi, har bir order ham alohida saqlanadi (va har bir order ichida `userId` reference bo'lib, uning hajmi `refSize`ga teng).\n  Hajm: `userCount * UserHajmi + (userCount * avgOrdersPerUser) * (OrderHajmi + refSize)`.\n  Bu yerda `UserHajmi`, `OrderHajmi` va `refSize` parametrda berilgan `refSpec` obyektidan olinadi: `{ userSize, orderSize, refSize }`.\n\nFunksiya ikkala modelning xotira hajmlarini hisoblab, `{ embeddingBytes, referencingBytes, cheaperModel: 'embedding' | 'referencing' }` formatida qaytarsin. Agar narxlar teng bo'lsa, cheaperModel 'embedding' bo'lsin.",
      startingCode: "function calculateStorageCost(userCount, avgOrdersPerUser, embedSpec, refSpec) {\n  // Kodni shu yerda yozing\n}",
      hint: "Ikkala formulani alohida hisoblang va taqqoslab cheaperModel aniqlang.",
      test: "if (typeof calculateStorageCost !== 'function') return 'calculateStorageCost funksiya emas';\nconst embedSpec = { userSize: 200, orderSize: 100 };\nconst refSpec = { userSize: 200, orderSize: 100, refSize: 16 };\nconst res = calculateStorageCost(1000, 5, embedSpec, refSpec);\nif (res.embeddingBytes !== 700000) return 'Embedding hajmi noto\\'g\\'ri';\nif (res.referencingBytes !== 780000) return 'Referencing hajmi noto\\'g\\'ri';\nif (res.cheaperModel !== 'embedding') return 'Embedding arzonroq bo\\'lishi kerak edi';\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Polyglot Router Simulator",
      instruction: "Polyglot Persistence tizimida har xil so'rovlar har xil bazalarga yo'naltiriladi. `routePolyglotStore(request)` funksiyasini yozing.\n\nSo'rovlar (request) quyidagi turlarga ega va tegishli ma'lumotlar bazalariga yo'naltirilishi kerak:\n* `type: 'transaction'` yoki `type: 'invoice'` -> `'PostgreSQL'` (ACID muhim).\n* `type: 'session'` yoki `type: 'cache'` -> `'Redis'` (Tezkor RAM).\n* `type: 'recommendation'` yoki `type: 'social_graph'` -> `'Neo4j'` (Graph bog'liqliklar).\n* `type: 'product_catalog'` yoki `type: 'blog_post'` -> `'MongoDB'` (Hujjatlar).\n\nAgar noma'lum tur kelsa `'MongoDB'` deb hisoblang. Funksiya yo'naltirilgan baza nomini qaytarsin.",
      startingCode: "function routePolyglotStore(request) {\n  // Kodni shu yerda yozing\n}",
      hint: "switch-case yoki obyekt mapping orqali request.type qiymatini tekshiring va mos keluvchi baza nomini qaytaring.",
      test: "if (typeof routePolyglotStore !== 'function') return 'routePolyglotStore funksiya emas';\nif (routePolyglotStore({ type: 'transaction' }) !== 'PostgreSQL') return 'Tranzaksiyalar PostgreSQL-ga borishi kerak';\nif (routePolyglotStore({ type: 'cache' }) !== 'Redis') return 'Keshlar Redis-ga borishi kerak';\nif (routePolyglotStore({ type: 'social_graph' }) !== 'Neo4j') return 'Ijtimoiy tarmoq grafigi Neo4j-ga borishi kerak';\nif (routePolyglotStore({ type: 'unknown' }) !== 'MongoDB') return 'Noma\\'lum turlar MongoDB-ga borishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ ACID Transaction Coordinator",
      instruction: "Mikroservislarda yoki sodda dasturlarda bir nechta bazalar bo'yicha ketma-ketliklarni tranzaksion boshqarish kerak bo'ladi. Agar birorta qadam xato bersa, oldingi barcha bajarilgan qadamlarni bekor qilish (Rollback) kerak. `coordinateTransaction(steps)` funksiyasini yozing.\n\n`steps` bu obyeklar massivi bo'lib, har biri quyidagicha tuzilishga ega:\n`{ execute: () => boolean, rollback: () => void }`.\n\nFunksiya qadamlarni ketma-ket `execute()` qiladi. Agar barchasi `true` qaytarsa, muvaffaqiyatli yakunlanib `true` qaytadi.\nAgar birorta qadam `false` qaytarsa yoki xatolik yuz bersa, ushbu xato bergan qadamgacha bo'lgan (va uni ham o'z ichiga olgan, agar xato qaytargan bo'lsa) barcha muvaffaqiyatli qadamlarning `rollback()` metodini teskari tartibda (LIFO - Last In First Out) chaqiradi va `false` qaytaradi.",
      startingCode: "function coordinateTransaction(steps) {\n  // Kodni shu yerda yozing\n}",
      hint: "Bajarilgan qadamlarni massivga yig'ib boron. Agar xatolik bo'lsa, ushbu yig'ilgan massivni oxiridan boshlab rollback qiling.",
      test: "if (typeof coordinateTransaction !== 'function') return 'coordinateTransaction funksiya emas';\nlet rolledBack = [];\nconst steps = [\n  { execute: () => true, rollback: () => rolledBack.push(1) },\n  { execute: () => true, rollback: () => rolledBack.push(2) },\n  { execute: () => false, rollback: () => rolledBack.push(3) }\n];\nconst success = coordinateTransaction(steps);\nif (success !== false) return 'Xato qadam bo\\'lganda tranzaksiya false qaytarishi kerak';\nif (rolledBack.join(',') !== '3,2,1') return 'Rollback teskari tartibda (3,2,1) chaqirilishi shart';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Cassandra Table Clustering Key Checker",
      instruction: "Wide-Column bazada so'rov yozayotganda, clustering key-lar faqatgina ularning sxemada belgilangan qat'iy tartibida ishlatilishi mumkin. `isQueryValid(schemaClusteringKeys, queryKeys)` funksiyasini yozing.\n\nAgar so'rov kalitlari `queryKeys` massividagi barcha elementlar `schemaClusteringKeys` massividagi elementlarning prefiksi (ya'ni boshlanishi) bo'lsa va tartib buzilmagan bo'lsa, `true` qaytaring. Masalan, sxema kalitlari `['year', 'month', 'day']` bo'lsa, `['year', 'month']` so'rovi to'g'ri (`true`), ammo `['year', 'day']` so'rovi noto'g'ri (`false`) chunki `month` o'tkazib yuborilgan.",
      startingCode: "function isQueryValid(schemaClusteringKeys, queryKeys) {\n  // Kodni shu yerda yozing\n}",
      hint: "queryKeys ning har bir indexdagi elementi schemaClusteringKeys ning aynan o'sha indexdagi elementiga teng bo'lishi kerak.",
      test: "if (typeof isQueryValid !== 'function') return 'isQueryValid funksiya emas';\nif (isQueryValid(['year', 'month', 'day'], ['year', 'month']) !== true) return 'Yil va oy so\\'rovi to\\'g\\'ri bo\\'lishi kerak';\nif (isQueryValid(['year', 'month', 'day'], ['year', 'day']) !== false) return 'Oy o\\'tkazib yuborilsa so\\'rov xato bo\\'lishi kerak';\nif (isQueryValid(['year', 'month', 'day'], ['month']) !== false) return 'Boshlanishidan emasligi uchun xato bo\\'lishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL ma'lumotlar bazalarida ACID tranzaksiyalarining 'A' (Atomicity) harfi nimani anglatadi?",
      options: [
        "Tranzaksiyadagi barcha amallar yoki to'liq bajarilishi, yoki hech biri bajarilmasligi kerak",
        "Ma'lumotlar faqat ASCII formatida saqlanishini kafolatlash",
        "Tranzaksiyalarning bir vaqtda parallel ishlash tezligi",
        "Ma'lumotlar bazasining doimiy faollik darajasi"
      ],
      correctAnswer: 0,
      explanation: "Atomicity (Butunlik/Bo'linmaslik) tranzaksiyani bitta butun deb biladi. Undagi birorta amal xato bo'lsa ham butun tranzaksiya orqaga qaytariladi (Rollback)."
    },
    {
      id: 2,
      question: "Uchinchi Normal Shakl (3NF) qoidasiga ko'ra qaysi turdagi bog'liqliklar taqiqlanadi?",
      options: [
        "Birlamchi kalitga bog'liqlik",
        "Tranzitiv (bilvosita) bog'liqliklar (A -> B -> C)",
        "Dinamik JSON massivlari",
        "Xorijiy kalitlar (Foreign Keys) ishlatilishi"
      ],
      correctAnswer: 1,
      explanation: "3NF qoidasi bo'yicha hech bir no-kalit ustun boshqa no-kalit ustun orqali birlamchi kalitga bilvosita bog'lanmasligi kerak. Bunday holat bo'lsa, ular alohida jadvalga ko'chirilishi shart."
    },
    {
      id: 3,
      question: "NoSQL ma'lumotlar bazalaridagi BASE modeli nimani anglatadi?",
      options: [
        "Basic availability, Soft state, Eventual consistency",
        "Binary access, Strict ACID, Encryption",
        "Backup recovery, Archive, Schema, Execution",
        "Hech qanday ma'noni anglatmaydi, bu shunchaki nom"
      ],
      correctAnswer: 0,
      explanation: "BASE NoSQL-ning ACID modeliga qarama-qarshi xususiyati bo'lib, u asosan yakuniy moslik (Eventual consistency) va tizimning doimiy mavjudligiga qaratilgan."
    },
    {
      id: 4,
      question: "Qaysi turdagi NoSQL ma'lumotlar bazasi ijtimoiy tarmoqlar, tavsiya tizimlari va firibgarlikni aniqlash uchun eng mos keladi?",
      options: [
        "Key-Value database",
        "Document database",
        "Wide-Column database",
        "Graph database"
      ],
      correctAnswer: 3,
      explanation: "Graph bazalari (masalan Neo4j) ma'lumotlar o'rtasidagi bog'liqliklarni (Edges) birinchi darajali obyekt sifatida saqlagani uchun murakkab tarmoqlarni tahlil qilishda juda tez hisoblanadi."
    },
    {
      id: 5,
      question: "MongoDB-da 'Embedding' (ichiga joylashtirish) modelini tanlashga qachon ruxsat beriladi?",
      options: [
        "Bog'liq ma'lumotlar kam o'zgarsa, o'lchami cheklangan bo'lsa va asosiy hujjat bilan birga o'qilsa",
        "Ma'lumotlar hajmi 1 GB-dan oshib ketganda",
        "Faqat relational SQL bazalar bilan bog'langanda",
        "Har qanday holatda ham embedding yaxshi variant"
      ],
      correctAnswer: 0,
      explanation: "Embedding o'qish tezligini oshiradi, lekin hujjat o'lchami chegaralangan bo'lsa va tez-tez o'zgaruvchan bog'liqliklar bo'lmasa ishlatilgani ma'qul (aks holda write amplifikatsiyasi yuz beradi)."
    },
    {
      id: 6,
      question: "Cassandra kabi Wide-Column bazalarda sxema loyihalashdagi eng asosiy farq nima?",
      options: [
        "Sxema so'rovlarga qarab loyihalanadi (Query-Driven Design)",
        "JOIN amallari juda ko'p ishlatiladi",
        "Barcha ma'lumotlar bitta SQL serverda saqlanadi",
        "Faqat optimistik tranzaksiyalar qo'llaniladi"
      ],
      correctAnswer: 0,
      explanation: "Cassandra-da SQL-dagidek ad-hoc so'rov yuborish imkoni yo'q, shuning uchun sxema loyihalashdan oldin qanday so'rovlar bo'lishini bilish shart (Query-driven)."
    },
    {
      id: 7,
      question: "Polyglot Persistence yondashuvining mohiyati nima?",
      options: [
        "Faqat bitta ma'lumotlar bazasini barcha loyihalarda ishlatish",
        "Tizimning turli talablari uchun turli xil ma'lumotlar bazalarini (SQL, Redis, Graph va b.) birgalikda ishlatish",
        "Barcha ma'lumotlarni faqat matnli fayllarga saqlash",
        "Ma'lumotlar bazalarini bir tildan ikkinchi tilga tarjima qilish"
      ],
      correctAnswer: 1,
      explanation: "Yirik tizimlarda har bir modulning ehtiyojlari turlicha (kesh, tranzaksiya, qidiruv). Ularning har biriga mos bazani tanlash polyglot persistence deyiladi."
    },
    {
      id: 8,
      question: "NoSQL bazalarida denormalizatsiyaning asosiy maqsadi nima?",
      options: [
        "Xotirani tejash",
        "O'qish operatsiyalarini tezlashtirish (JOIN-larni chetlab o'tish orqali)",
        "Ma'lumotlar yaxlitligini oshirish",
        "Dasturning xavfsizligini ta'minlash"
      ],
      correctAnswer: 1,
      explanation: "Denormalizatsiya ma'lumotlarni nusxalab saqlab, bir nechta jadvallarni JOIN qilishdan qochish va o'qishni mikrosaniyalarda amalga oshirish imkonini beradi."
    },
    {
      id: 9,
      question: "Relational ma'lumotlar bazasining asosiy masshtablanish (scaling) muammosi nimada?",
      options: [
        "Ular faqat lokal kompyuterda ishlay oladi",
        "Ularni gorizontal sharding qilish qiyin (tranzaksiyalar va JOIN-larni ko'p tugunlarda bajarish qiyinligi sababli)",
        "Ularga ko'p ma'lumot sig'maydi",
        "Faqat JavaScript-da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "SQL bazalar qat'iy munosabatlar va ACID talablari sababli odatda bitta serverda (vertikal) kengayadi, ularni gorizontal (sharding) taqsimlash ancha murakkab."
    },
    {
      id: 10,
      question: "MongoDB-da 16 MB limit nima bilan bog'liq?",
      options: [
        "Bitta BSON hujjatining maksimal ruxsat etilgan hajmi",
        "Butun bazaning maksimal sig'imi",
        "Faqat log fayllarining hajmi",
        "RAM-da keshlanadigan ma'lumot limiti"
      ],
      correctAnswer: 0,
      explanation: "MongoDB-da yagona BSON hujjati (document) 16 MB-dan oshmasligi kerak. Agar oshib ketadigan bo'lsa, GridFS yoki Referencing modelidan foydalanish lozim."
    },
    {
      id: 11,
      question: "Redis-ning an'anaviy diskka asoslangan bazalardan asosiy farqi nimada?",
      options: [
        "U ma'lumotlarni faqat JSON formatida diskka yozadi",
        "U ma'lumotlarni operativ xotirada (RAM) saqlaydi va juda tez ishlaydi",
        "U faqat SQL tranzaksiyalarini bajaradi",
        "Unda sxema qat'iy belgilangan"
      ],
      correctAnswer: 1,
      explanation: "Redis asosan In-Memory (RAM) bazadir. Bu unga mikrosaniyalarda javob qaytarish imkonini beradi, lekin server to'satdan o'chganda ma'lumotlar yo'qolmasligi uchun diskka sinxronlash mexanizmlari ochilgan."
    },
    {
      id: 12,
      question: "SQL-da tranzaksiyadagi 'Consistency' (Moslik/Muvofiqlik) nima degani?",
      options: [
        "Ma'lumotlar faqat bitta foydalanuvchiga ko'rinishi",
        "Tranzaksiya bajarilgandan so'ng, baza qoidalari va constraintlar (Unique, Check va b.) buzilmagan bo'lishi",
        "Barcha replikalar darhol yangilanishi",
        "Faqat yangi yozilgan ma'lumotlarning saqlanishi"
      ],
      correctAnswer: 1,
      explanation: "Consistency tranzaksiyadan so'ng bazaning barcha biznes va relyatsion qoidalariga rioya etilishini va noto'g'ri ma'lumot saqlanib qolmasligini kafolatlaydi."
    }
  ]
};
