export const mongoDbBasics = {
  id: "mongoDbBasics",
  title: "MongoDB Asoslari: CRUD va Aggregatsiya",
  language: "javascript",
  theory: `## 1. 🍃 MongoDB nima o'zi?

MongoDB – bu **NoSQL (Document-based)** ma'lumotlar bazasi. Unda qat'iy jadvallar (SQL) yo'q. Uning o'rniga ma'lumotlar xuddi JavaScript obyektlaridek JSON ko'rinishida (BSON deb ataladi) saqlanadi. 

Ko'pchilik darsliklarda qandaydir "sehrli" \`db.collection('users')\` obyekti osmondan tushib qolgandek ko'rsatiladi. Keling, o'sha sehrni ochamiz!

---

## 2. 🔌 Ulanish (Connection) va CRUD Sehrining Foshi

Qanday qilib Node.js da ulanamiz? Avval loyihangizga \`mongodb\` paketini o'rnatasiz (\`npm install mongodb\`). So'ngra haqiqiy kod quyidagicha yoziladi:

\`\`\`javascript
const { MongoClient } = require('mongodb');

// Ulanish manzili (Connection String)
const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);

// Baza nomi (o'zingiz tanlaysiz)
const dbName = 'mening_loyiham';

async function run() {
  try {
    // 1. Bazaga ulanamiz (Sehr shu yerda boshlanadi)
    await client.connect();
    console.log('✅ Serverga ulandik!');

    // 2. Bazani tanlaymiz
    const db = client.db(dbName);

    // 3. To'plamni (Collection - ya'ni jadvalni) tanlaymiz
    const collection = db.collection('users');

    // === C: CREATE (Yaratish) ===
    const insertResult = await collection.insertOne({ name: "Ali", age: 25 });
    console.log('Qo\\'shildi:', insertResult.insertedId);

    // === R: READ (O'qish) ===
    const users = await collection.find({ age: { $gte: 18 } }).toArray();
    console.log('Topilganlar:', users);

    // === U: UPDATE (Yangilash) ===
    await collection.updateOne({ name: "Ali" }, { $set: { age: 26 } });

    // === D: DELETE (O'chirish) ===
    await collection.deleteOne({ name: "Ali" });

  } finally {
    // Eng muhimi: ishimiz bitgach ulanishni yopishimiz shart!
    await client.close();
  }
}

run().catch(console.dir);
\`\`\`

Ana endi siz bilasizki, \`collection\` shunchaki oddiy JavaScript obyekti va u serverga ulanish orqali olingan!

---

## 3. 🚰 Aggregatsiya (Aggregation Pipeline)

Aggregatsiya xuddi zavoddagi **konveyer quvuri (pipeline)** kabi ishlaydi. Hujjatlar quvurga kiradi va har bir bosqichdan o'tganda shakli (struktura) o'zgaradi. Darsliklarda ko'pincha bu narsa tushuntirilmaydi. Quyidagi misolda, har bir qadam nima kirib, nima chiqayotganiga qat'iy e'tibor bering!

\`\`\`javascript
const pipeline = [
  // 1-BOSQICH: $match (Filterlash)
  // Kiruvchi barcha hujjatlar, masalan: 
  // { _id: 1, name: "Olma", status: "A", amount: 50 }
  // { _id: 2, name: "Nok", status: "B", amount: 30 }
  {
    $match: { status: "A" } 
  },
  // Chiquvchi hujjatlar faqat 'A' statuslilar:
  // { _id: 1, name: "Olma", status: "A", amount: 50 }
  // { _id: 3, name: "Nok", status: "A", amount: 20 }

  // 2-BOSQICH: $group (Guruhlash)
  {
    $group: {
      // Nimaga qarab guruhlaymiz? status'ga qarab (_id shart!)
      _id: "$status", 
      // Jami summani hisoblaymiz ($sum agregator funksiyasi)
      totalAmount: { $sum: "$amount" }
    }
  }
  // YAKUNIY CHIQUVCHI NATIJA:
  // E'tibor bering, eski 'name' yo'qoldi, faqat biz yaratgan maydonlar qoldi!
  // { _id: "A", totalAmount: 70 }
];

const results = await db.collection('orders').aggregate(pipeline).toArray();
console.log(results);
\`\`\`

Ko'rib turganingizdek, **Aggregation** shunchaki quvur emas, har bir bosqich ma'lumotni ezib, qoliplab, keyingi bosqichga mutlaqo yangi shaklda o'tkazadi!
`,
  exercises: [
    {
      id: 1,
      title: "Ulanish manzili (Connection String)",
      instruction: "Localhost uchun standart portdagi (27017) MongoDB ulanish manzilini o'zgaruvchiga tenglang.",
      startingCode: "// url o'zgaruvchisiga to'g'ri manzil yozing\nconst url = '';\n",
      hint: "const url = 'mongodb://localhost:27017';",
      test: "if (code.includes('mongodb://localhost:27017')) return null; return 'Manzil mongodb://localhost:27017 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Bazaga ulanish kodi",
      instruction: "MongoClient obyekti orqali `client.connect()` ni chaqiring. U asinxron ekanini unutmang (await qo'ying).",
      startingCode: "async function run(client) {\n  // Bu yerga ulanish kodini yozing\n}\n",
      hint: "await client.connect();",
      test: "if (code.includes('await client.connect()')) return null; return 'client.connect() ni await bilan chaqirish yodingizdan chiqmasin';"
    },
    {
      id: 3,
      title: "Bitta hujjat qo'shish",
      instruction: "collection obyektidan foydalanib `{ title: \"Kitob\" }` ma'lumotini bazaga `insertOne` orqali qo'shing va natijani kuting.",
      startingCode: "async function addData(collection) {\n  // Bu yerga yozing\n}\n",
      hint: "await collection.insertOne({ title: \"Kitob\" });",
      test: "if (code.includes('await collection.insertOne') && code.includes('Kitob')) return null; return 'insertOne dan to\\'g\\'ri foydalaning va await qo\\'ying';"
    },
    {
      id: 4,
      title: "Aggregatsiya: $match",
      instruction: "Pipeline (massiv) ichida shunday `$match` bosqichini yozingki, u faqat `isActive: true` bo'lganlarni saralab olsin.",
      startingCode: "const pipeline = [\n  // Bu yerga yozing\n];\n",
      hint: "{ $match: { isActive: true } }",
      test: "if (code.includes('$match') && code.includes('isActive: true')) return null; return '$match da xatolik bor';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "MongoDB da ma'lumotlar SQL (relyatsion) bazalardagi kabi jadvallarda emas, balki qaysi shaklda saqlanadi?",
      "options": [
        "Faqat matnli (txt) fayllar ko'rinishida",
        "JSON/BSON obyektli hujjatlar (Document) ko'rinishida",
        "Eksel (CSV) formatida",
        "Ikkilik (Binary) kodda"
      ],
      "correctAnswer": 1,
      "explanation": "MongoDB NoSQL bazasi bo'lib, u ma'lumotlarni moslashuvchan (flexible) strukturadagi BSON hujjatlarida saqlaydi."
    },
    {
      "id": 2,
      "question": "Node.js da \`db.collection('users')\` dan foydalanish uchun qaysi bosqich avval bajarilishi shart?",
      "options": [
        "Hech qanday, u global obyekt hisoblanadi",
        "MongoClient orqali bazaga ulanish (connect) qilinib, baza (\`db\`) tanlab olinishi shart",
        "Faqat import qilish kifoya",
        "HTML faylini ochish"
      ],
      "correctAnswer": 1,
      "explanation": "Dastur avval ma'lum bir manzilga (url) ulanishi (client.connect) va kerakli bazani tanlashi (client.db) kerak. Aks holda `db` topilmaydi."
    },
    {
      "id": 3,
      "question": "Nima uchun `await client.connect()` kabi ma'lumotlar bazasi operatsiyalarida `await` ishlatamiz?",
      "options": [
        "Chunki Node.js shuni talab qiladi",
        "Bazaga so'rov jo'natish va javob kutish (tarmoq operatsiyasi) biroz vaqt oladi, shu bois u Asinxrondir",
        "Dasturni tezlatish uchun",
        "Qoida shunaqa"
      ],
      "correctAnswer": 1,
      "explanation": "Tarmoq bo'ylab ma'lumot almashish darhol bajarmaydigan jarayon bo'lgani uchun operatsiyalar Promise qaytaradi. Uni tugashini kutish (await) kerak."
    },
    {
      "id": 4,
      "question": "Qachon MongoDB dagi Aggregation Pipeline (quvur) ishi yakunlanadi va dasturga natijani qaytaradi?",
      "options": [
        "Birinchi bosqich tugagach",
        "Hujjatlar barcha kiritilgan bosqichlardan ($match, $group, kabi) birin-ketin o'tib chiqqach",
        "Faqat xato berganda",
        "Quvur ichida 1 sekund o'tgach"
      ],
      "correctAnswer": 1,
      "explanation": "Quvurda birinchi bosqich natijasi ikkinchisiga kirish vazifasini o'taydi. Faqat barcha modifikatsiyalar tugagach yakuniy natija massiv ko'rinishida qaytariladi."
    },
    {
      "id": 5,
      "question": "Aggregation bosqichida `$group` qanday vazifani bajaradi?",
      "options": [
        "Ma'lumotlarni o'chirib tashlaydi",
        "Hujjatlarni o'xshash xususiyatiga (masalan `_id: \"$status\"`) qarab bitta ob'ektga birlashtiradi va qo'shimcha amallar ($sum) bajaradi",
        "Faqat yangi ma'lumot qo'shadi",
        "Xatoliklarni ushlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Group xuddi guruh boshi kabi ko'plab kichik hujjatlarni bitta joyga jamlab, ulardan masalan o'rtacha yosh yoki jami summani hisoblab chiqaradi."
    },
    {
      "id": 6,
      "question": "Agar `$match` va `$group` quvurda (pipeline) bo'lsa, ularning ketma-ketligi muhimmi?",
      "options": [
        "Yo'q, Mongo o'zi tushunib ishlaydi",
        "Ha, chunki `$match` ni birinchi qilsak ortiqcha ma'lumotlar guruhlanmasdan oldin filtrlanadi, bu tezlikni juda oshiradi",
        "Ularni faqat $sort bilan ishlatish kerak",
        "Ketma-ketlik xato beradi"
      ],
      "correctAnswer": 1,
      "explanation": "Agar oldin barcha millionlab datalarni guruhlab keyin filtrlasangiz server qotadi. Avval $match qilib ozgina ma'lumot olib keyin ularni guruhlash eng maqbul yo'ldir."
    },
    {
      "id": 7,
      "question": "\`collection.find({ age: 25 })\` so'rovi faqat bitta foydalanuvchini qaytaradimi?",
      "options": [
        "Ha, u faqat birinchi topilganini beradi",
        "Yo'q, u shu shartga mos tushgan BARCHA foydalanuvchilarni topadi (va biz ularni kursordan olish uchun .toArray() deymiz)",
        "Faqat ohirgi elementni beradi",
        "Bo'sh massiv qaytaradi"
      ],
      "correctAnswer": 1,
      "explanation": "Faqat bitta ma'lumotni olish uchun findOne() ishlatiladi. find() ko'plab hujjatlarni kursorda qaytaradi."
    },
    {
      "id": 8,
      "question": "Bazadagi ulanishni qachon yopish (client.close()) kerak?",
      "options": [
        "Faqat xato yuz berganda",
        "Server ishni yakunlaganda yoki muhim script ishlab bo'lgach (masalan `finally` blokida), chunki ochiq qolgan aloqa xotirani to'ldiradi",
        "Ulanishni umuman yopmaslik kerak",
        "Avtomatik yopiladi"
      ],
      "correctAnswer": 1,
      "explanation": "Maxsus server skriptlari ishlaganida memory leak (xotira sizishi) bo'lmasligi uchun ishlarni bitirib bazani darhol yopish - best practice (eng yaxshi odat) sanaladi."
    },
    {
      "id": 9,
      "question": "Mongo da CRUD yoyilmasi nima?",
      "options": [
        "Copy, Read, Undo, Delete",
        "Create, Read, Update, Delete",
        "Catch, Run, Update, Drop",
        "Create, Run, Upload, Download"
      ],
      "correctAnswer": 1,
      "explanation": "Har qanday bazadagi 4 ta fundamental jarayon: Yaratish(C), O'qish(R), O'zgartirish(U), O'chirish(D)."
    },
    {
      "id": 10,
      "question": "MongoDB da ma'lumotlarni o'zgartirish (Update) uchun qaysi maxsus operator eng ko'p ishlatiladi?",
      "options": [
        "$change",
        "$set",
        "$edit",
        "$modify"
      ],
      "correctAnswer": 1,
      "explanation": "$set orqali biz eski ma'lumotdagi aniq bir maydonlarni o'chirmasdan o'zgartira olamiz."
    },
    {
      "id": 11,
      "question": "MongoDB ning rasmiy NPM paketi nima deb ataladi?",
      "options": [
        "mongo-db",
        "mongodb",
        "mongoshell",
        "db-mongo"
      ],
      "correctAnswer": 1,
      "explanation": "Loyihaga Node.js orqali eng asosiy integratsiya npm install mongodb buyrug'i orqali o'rnatiladi."
    },
    {
      "id": 12,
      "question": "Pipeline dagi bosqichdan chiqqan obyekt nima bo'ladi?",
      "options": [
        "U yana bazada saqlanib qoladi",
        "U keyingi bosqich uchun kirituvchi (input) vazifasini bajaradi va u mutlaqo yangi strukturada bo'lishi mumkin",
        "U xato yuzaga keltiradi",
        "U JSON ga aylanmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Har bir quvur bosqichi datani o'zgartiradi va bu o'zgarish keyingi bosqichda ko'rinadi (masalan, $group da eski original maydonlar yo'qolib ketadi)."
    }
  ]
};
