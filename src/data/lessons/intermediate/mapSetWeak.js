export const mapSetWeak = {
  id: "mapSetWeak",
  title: "Map, Set, WeakMap va WeakSet",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Map, Set, WeakMap va WeakSet nima?
ES6 versiyasida JavaScriptga ma'lumotlarni yanada samaraliroq saqlash va boshqarish uchun 4 ta yangi ma'lumotlar tuzilmasi qo'shildi:
* **Map (Lug'at):** Kalit-qiymat (key-value) juftliklarini saqlaydi. Obyektdan farqi - istalgan turdagi qiymatni (hatto boshqa obyektni ham) kalit sifatida ishlata oladi.
* **Set (Unikal to'plam):** Faqat takrorlanmaydigan (unikal) qiymatlarni saqlaydi.
* **WeakMap (Kuchsiz lug'at):** Kaliti faqat obyekt bo'lishi mumkin va u xotirada kuchsiz saqlanadi (agar obyektga boshqa ishora qolmasa, u avtomatik xotiradan o'chadi).
* **WeakSet (Kuchsiz to'plam):** Faqat obyektlarni unikal va kuchsiz tarzda saqlaydi.

### Real hayotiy analogiya
* **Map:** Telefon kitobchasi. Odamning ismi (kalit) va uning raqami (qiymat). Obyektdan farqi - odamning rasmini (obyekt) ham kalit qilib yopishtirish mumkin!
* **Set:** Imtihonga kirgan talabalar ro'yxati. Bir talaba imtihonga 3 marta kelgan bo'lsa ham, ro'yxatda uning ismi faqat 1 marta unikal bo'lib qoladi.
* **WeakMap:** Vaqtincha saqlash kamerasi. Agar mehmon mehmonxonadan chiqib ketsa (obyekt xotiradan o'chirilsa), kameradagi uning yuklari (qiymat) ham avtomatik axlatga tashlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Map va Set yaratish)
\`\`\`javascript
// Map yaratish
const userRoles = new Map();
const user = { name: "Ali" };
userRoles.set(user, "admin");
console.log(userRoles.get(user)); // "admin"

// Set yaratish va duplikatlarni tozalash
const numbers = new Set([1, 2, 2, 3, 3, 4]);
console.log([...numbers]); // [1, 2, 3, 4]
\`\`\`

### 2. Intermediate Example (WeakMap va Xotira boshqaruvi)
\`\`\`javascript
let guest = { name: "Zara" };
const guestVisits = new WeakMap();

// Obyektni kalit sifatida saqlaymiz
guestVisits.set(guest, 5);

// Agar guest obyektini o'chirsak:
guest = null;
// Endi guestVisits ichidagi ma'lumot ham avtomatik ravishda xotiradan o'chadi.
\`\`\`

### 3. Advanced Example (WeakSet orqali faol ulanishlarni kuzatish)
\`\`\`javascript
const activeConnections = new WeakSet();

let socket1 = { id: "ws_1" };
let socket2 = { id: "ws_2" };

activeConnections.add(socket1);
activeConnections.add(socket2);

console.log(activeConnections.has(socket1)); // true

// Socket yopilganda va xotiradan o'chirilganda:
socket1 = null; 
// activeConnections ichidan ham avtomatik o'chadi
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Hash Tables va Garbage Collection
* **Map/Set** elementlarni **Hash Table** orqali tartiblaydi, bu esa elementlarni qidirishni (\`has\`), o'chirishni (\`delete\`) va qo'shishni (\`set\`/\`add\`) massivlar kabi $O(N)$ emas, balki juda tezkor $O(1)$ tezlikda bajarish imkonini beradi.
* **WeakMap/WeakSet** Garbage Collector (axlat yig'uvchi) uchun to'siq bo'lmaydi. Oddiy \`Map\`da obyekt o'chirilgan taqdirda ham, u Map ichida kalit sifatida turgani uchun xotiradan butunlay o'chib ketmaydi (Memory Leak). \`WeakMap\` esa bu muammoni hal qiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Massivdagi takrorlangan ma'lumotlarni tozalash loyihasi
Foydalanuvchilar tomonidan kiritilgan unikal teglar (tags) ro'yxatini shakllantirish:

\`\`\`javascript
const userTags = ["js", "react", "js", "html", "react", "css"];

// 1. Set yordamida unikal qilamiz
const uniqueTagsSet = new Set(userTags);

// 2. Set ni qaytadan massivga aylantiramiz (spread yordamida)
const cleanTags = [...uniqueTagsSet];

console.log(cleanTags); // ["js", "react", "html", "css"]
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. WeakMap ichida ibtidoiy (primitive) tiplarni kalit qilish
* **Noto'g'ri:**
  \`\`\`javascript
  const wm = new WeakMap();
  wm.set("key", 100); // TypeError: Invalid value used as weak map key
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const wm = new WeakMap();
  const keyObj = {};
  wm.set(keyObj, 100);
  \`\`\`

### 2. Obyekt kalitlarida reference farqini hisobga olmaslik
* **Noto'g'ri:**
  \`\`\`javascript
  const map = new Map();
  map.set({ id: 1 }, "Ma'lumot");
  console.log(map.get({ id: 1 })); // undefined! Chunki ikkita {} xotirada har xil manzilda.
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const map = new Map();
  const userKey = { id: 1 };
  map.set(userKey, "Ma'lumot");
  console.log(map.get(userKey)); // "Ma'lumot"
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyati | Map | Set | WeakMap | WeakSet |
| :--- | :--- | :--- | :--- | :--- |
| **Kalit turi** | Istalgan tip | Faqat qiymat | Faqat obyekt | Faqat obyekt |
| **Iteratsiya** | Mavjud | Mavjud | Yo'q | Yo'q |
| **size xossasi** | Mavjud | Mavjud | Yo'q | Yo'q |
| **Garbage Collected** | Yo'q | Yo'q | Ha | Ha |

---

## 7. ❓ Savollar va Javoblar

### 1. \`Map\` va \`Object\` farqi nimada?
Obyekt kalitlari faqat string yoki symbol bo'ladi, Map esa har qanday ma'lumot turini kalit qila oladi. Mapda elementlar sonini \`size\` orqali tezda olish mumkin.

### 2. Nima uchun WeakMap-ni loop orqali aylanib chiqib bo'lmaydi?
Chunki Garbage Collector fonda istalgan vaqtda kalit obyektlarni xotiradan o'chirib yuborishi mumkin. Bu esa aylanib chiqish jarayonida kutilmagan xatoliklar keltirib chiqaradi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`Set\` ichiga ikkita bo'sh obyekt \`{}\` qo'shilsa, uning \`size\` qiymati nechaga teng bo'ladi? (2 ga, chunki ular reference bo'yicha farq qiladi).
2. Qaysi holatlarda \`Map\`ni oddiy \`Object\`dan ko'ra afzal ko'rish kerak?
3. \`WeakSet\` qaysi muammoni hal qilishda qo'llaniladi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar va testlar yordamida to'plamlar bilan ishlash ko'nikmalaringizni mustahkamlang.
`,
  exercises: [
  {
    "id": 1,
    "title": "Set yordamida Duplikatlarni Tozalash",
    "instruction": "Taqdim etilgan 'removeDuplicates(arr)' funksiyasini shunday yozingki, u massivdagi barcha takrorlanuvchi elementlarni Set yordamida tozalab, unikal elementlardan iborat yangi massiv qaytarsin.",
    "startingCode": "function removeDuplicates(arr) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return [...new Set(arr)];",
    "test": "if (!code.includes('Set')) return 'Set ishlatilmadi';\nconst sandbox = new Function(code + '; return removeDuplicates;');\nconst fn = sandbox();\nconst res = fn([1, 2, 2, 3, 1]);\nif (Array.isArray(res) && res.length === 3 && res[1] === 2) return null;\nreturn 'Natija noto\\'g\\'ri';"
  },
  {
    "id": 2,
    "title": "Map yordamida Ma'lumot Qidirish",
    "instruction": "'userMap' (Map obyekti) va 'id' kalitini qabul qilib, agar Map ichida kalit mavjud bo'lsa uning qiymatini, aks holda 'Topilmadi' satrini qaytaruvchi 'getUserName(userMap, id)' funksiyasini yozing.",
    "startingCode": "function getUserName(userMap, id) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "return userMap.has(id) ? userMap.get(id) : 'Topilmadi';",
    "test": "if (!code.includes('get') || !code.includes('has')) return 'Map has/get metodlari ishlatilmadi';\nconst sandbox = new Function(code + '; return getUserName;');\nconst fn = sandbox();\nconst m = new Map([[1, 'Ali']]);\nif (fn(m, 1) === 'Ali' && fn(m, 2) === 'Topilmadi') return null;\nreturn 'getUserName funksiyasi to\\'g\\'ri ishlamadi';"
  },
  {
    "id": 3,
    "title": "WeakMap orqali Metadata bog'lash",
    "instruction": "'weakMap' obyekti, 'obj' (kalit obyekt) va 'metadata' (qiymat) qabul qiluvchi 'attachMetadata(weakMap, obj, metadata)' funksiyasini yozing. U 'weakMap'ga ma'lumotni saqlasin va o'sha saqlangan qiymatni qaytarsin.",
    "startingCode": "function attachMetadata(weakMap, obj, metadata) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "weakMap.set(obj, metadata); return weakMap.get(obj);",
    "test": "if (!code.includes('set') || !code.includes('get')) return 'WeakMap set/get metodlari ishlatilmadi';\nconst sandbox = new Function(code + '; return attachMetadata;');\nconst fn = sandbox();\nconst wm = new WeakMap();\nconst k = {};\nif (fn(wm, k, 'secret_val') === 'secret_val') return null;\nreturn 'Metadata to\\'g\\'ri bog\\'lanmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Obyekt (Object) va Map o'rtasidagi eng asosiy farqlardan biri nima?",
    "options": [
      "Obyektlar faqat sonlarni kalit qiladi, Map esa satrlarni",
      "Map kaliti sifatida har qanday turdagi qiymatni (shu jumladan obyektlarni ham) ishlatish mumkin",
      "Map faqat local storage-da saqlanadi",
      "Obyektlar Map-ga qaraganda doimo tezroq ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlarda kalitlar faqat String yoki Symbol bo'lishi mumkin, Map-da esa istalgan tip (obyekt, funksiya, raqam) kalit bo'la oladi."
  },
  {
    "id": 2,
    "question": "Set to'plamining o'ziga xosligi nimada?",
    "options": [
      "U ma'lumotlarni kalit-qiymat shaklida saqlaydi",
      "U faqat takrorlanmaydigan (unikal) elementlarni saqlaydi",
      "U faqat asinxron funksiyalarni qabul qiladi",
      "U massivlardan ko'ra ko'proq xotira egallaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Set - faqat unikal elementlarni saqlaydigan to'plam bo'lib, unga takroriy qiymat qo'shilganda u inkor qilinadi."
  },
  {
    "id": 3,
    "question": "Set ichida elementlar sonini olish uchun qaysi xossadan foydalaniladi?",
    "options": ["length", "size", "count", "keys.length"],
    "correctAnswer": 1,
    "explanation": "Set va Map to'plamlarida elementlar sonini olish uchun maxsus `size` xossasi ishlatiladi."
  },
  {
    "id": 4,
    "question": "WeakMap-da kalit sifatida nimalardan foydalanish mumkin?",
    "options": [
      "Faqat string va number turlari",
      "Faqat obyektlar (objects)",
      "Istalgan ma'lumot turi",
      "Faqat funksiyalar"
    ],
    "correctAnswer": 1,
    "explanation": "WeakMap va WeakSet faqat obyektlar bilan ishlaydi. Ular ibtidoiy turlarni (string, number, boolean) kalit qilib qabul qilmaydi."
  },
  {
    "id": 5,
    "question": "WeakMap qanday qilib xotira sizib chiqishini (memory leaks) oldini oladi?",
    "options": [
      "U xotirani vaqti-vaqti bilan avtomatik o'chirib turadi",
      "Undagi obyekt-kalitlarga boshqa havola qolmasa, u Garbage Collector tomonidan xotiradan avtomatik o'chiriladi",
      "U ma'lumotlarni qattiq diskda saqlaydi",
      "U faqat asinxron operatsiyalarni bloklaydi"
    ],
    "correctAnswer": 1,
    "explanation": "WeakMap obyekt-kalitlarni kuchsiz ushlab turadi (weak references). Agar dasturda obyektga boshqa reference qolmasa, u xotiradan to'liq o'chib ketadi."
  },
  {
    "id": 6,
    "question": "WeakSet va WeakMap to'plamlarini loop (for...of, forEach) yordamida aylanib chiqish mumkinmi?",
    "options": [
      "Ha, cheklovlarsiz",
      "Yo'q, ularda aylanib chiqish (iteratsiya) metodlari mavjud emas",
      "Faqat browser konsolida aylanib chiqish mumkin",
      "Faqat maxsus generatorlar yordamida"
    ],
    "correctAnswer": 1,
    "explanation": "WeakMap va WeakSet tarkibi Garbage Collector tomonidan istalgan vaqtda o'zgarishi mumkinligi sababli, ularni iterate qilish (for...of) taqiqlangan."
  },
  {
    "id": 7,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconst set = new Set();\nset.add({});\nset.add({});\nconsole.log(set.size);\n```",
    "options": ["1", "2", "undefined", "TypeError"],
    "correctAnswer": 1,
    "explanation": "Ikkita alohida bo'sh obyekt `{}` xotirada boshqa havolalarga (references) ega, shuning uchun Set ularni unikal deb hisoblaydi va ikkalasini ham saqlaydi. Natija: 2."
  },
  {
    "id": 8,
    "question": "Map tarkibidagi barcha elementlarni butunlay o'chirish uchun qaysi metod chaqiriladi?",
    "options": ["delete()", "clear()", "reset()", "remove()"],
    "correctAnswer": 1,
    "explanation": "Map va Set to'plamlaridagi barcha elementlarni to'liq tozalash uchun `clear()` metodi ishlatiladi."
  },
  {
    "id": 9,
    "question": "Map to'plamida elementlar qanday tartibda saqlanadi?",
    "options": [
      "Elementlar unga qo'shilgan ketma-ketlik tartibida (insertion order)",
      "Kalitlar bo'yicha alifbo tartibida",
      "Qiymatlar bo'yicha o'sish tartibida",
      "Hech qanday tartib saqlanmaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Map va Set to'plamlarida elementlar qo'shilgan tartibi (insertion order) har doim saqlanadi va aylanib chiqilganda o'sha tartibda chiqadi."
  },
  {
    "id": 10,
    "question": "Set ichida `NaN` qiymatini qo'shganda nima sodir bo'ladi?",
    "options": [
      "NaN ni qo'shib bo'lmaydi, xato beradi",
      "Bir nechta NaN qiymat qo'shsa bo'ladi",
      "Faqat bitta unikal NaN qiymat qo'shish mumkin, keyingilari inkor etiladi",
      "NaN avtomatik ravishda 0 ga o'zgaradi"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript Set to'plamlarida `NaN` qiymatlarini bir-biriga teng deb hisoblaydi va Set ichida faqat bitta `NaN` unikal element sifatida saqlanishi mumkin."
  },
  {
    "id": 11,
    "question": "Oddiy obyektni Map ga o'tkazish uchun qaysi metod birgalikda qo'llaniladi?",
    "options": [
      "`new Map(Object.entries(obj))`",
      "`new Map(Object.keys(obj))`",
      "`Map.from(obj)`",
      "`obj.toMap()`"
    ],
    "correctAnswer": 0,
    "explanation": "`Object.entries(obj)` obyektni `[key, value]` ko'rinishidagi massivga aylantiradi. Bu formatni `new Map()` bevosita qabul qilib, Map obyektini yaratadi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst wm = new WeakMap();\nlet obj = { id: 1 };\nwm.set(obj, 'data');\nobj = null;\n// Keyinchalik dynamic GC dan so'ng:\n```",
    "options": [
      "Obyekt va 'data' avtomatik xotiradan o'chib ketadi",
      "Obyekt xotirada qolaveradi",
      "WeakMap xatolik berib dasturni to'xtatadi",
      "Obyekt local storage ga yoziladi"
    ],
    "correctAnswer": 0,
    "explanation": "WeakMap kuchsiz reference ishlatgani sababli, `obj = null` qilingandan keyin Garbage Collector ushbu obyektni va unga tegishli 'data' qiymatini xotiradan to'liq o'chiradi."
  }
]

};
