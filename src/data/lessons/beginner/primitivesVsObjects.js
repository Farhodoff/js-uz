export const primitivesVsObjects = {
  id: "primitivesVsObjects",
  title: "Primitivlar va Obyektlar (Memory)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Primitivlar va Obyektlar nima?
JavaScript-da o'zgaruvchilar va ma'lumotlar bilan ishlashda eng muhim tushunchalardan biri bu ularning xotirada qanday saqlanishidir. Ma'lumotlar turlari ikki asosiy guruhga bo'linadi:
1. **Primitiv turlar (Primitive types):** \`Number\`, \`String\`, \`Boolean\`, \`Null\`, \`Undefined\`, \`Symbol\` va \`BigInt\`. Ular oddiy, yagona qiymatni ifodalaydi va xotiraning **Stack** deb nomlangan tezkor qismida bevosita saqlanadi. Primitivlar o'zgarmas (**immutable**) hisoblanadi.
2. **Havola turlar (Reference types / Objects):** Obyektlar (\`Object\`), massivlar (\`Array\`) va funksiyalar (\`Function\`). Ular murakkab tuzilishga ega bo'lib, o'lchami dinamik ravishda o'zgarishi mumkin. Ular xotiraning **Heap** deb nomlangan katta qismida saqlanadi, Stack-da esa faqat ularning Heap-dagi manziliga ko'rsatuvchi ko'rsatkich (havola / pointer) saqlanadi. Obyektlar o'zgaruvchan (**mutable**) hisoblanadi.

---

### Real hayotiy analogiya

* **Primitiv qiymat (Qiymat bo'yicha nusxalash) — Qog'ozdagi raqam:**
  Tasavvur qiling, sizda bir varaq qog'oz bor va unda "42" raqami yozilgan (\`let x = 42\`). Siz do'stingizga xuddi shu qog'ozning kserokopiyasini berdingiz (\`let y = x\`). Endi do'stingiz o'zidagi qog'ozdagi raqamni o'chirib, "100" deb yozsa ham, sizning qog'ozingizdagi "42" o'zgarmaydi. Ular mutlaqo mustaqil nusxalardir.

* **Havola qiymat (Havola bo'yicha nusxalash) — Google Doc hujjati havolasi:**
  Tasavvur qiling, siz bulutli saqlagichda bitta matnli hujjat yaratdingiz (Heap-dagi obyekt) va uning havola manzilini (linkini) o'zgaruvchiga saqladingiz (\`let doc1 = "https://docs.google.com/document/d/1"\`). Keyin bu havolani do'stingizga nusxalab berdingiz (\`let doc2 = doc1\`). Endi do'stingiz havolani ochib, hujjat ichidagi matnni o'zgartirsa, siz ham o'z havolangiz orqali kirganingizda o'sha o'zgarishlarni ko'rasiz. Chunki havola (link) ikkita bo'lsa-da, ular ko'rsatib turgan real hujjat bitta.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Primitivlar — Qiymat bo'yicha nusxalash)
\`\`\`javascript
let scoreA = 100;
let scoreB = scoreA; // scoreA ning qiymati scoreB ga ko'chirildi

scoreB = 250; // scoreB o'zgartirildi

console.log(scoreA); // 100 (scoreA o'zgarmay qoldi)
console.log(scoreB); // 250
\`\`\`

### 2. Intermediate Example (Obyektlar — Havola bo'yicha nusxalash)
\`\`\`javascript
const player1 = { name: "Jasur", score: 100 };
const player2 = player1; // Obyekt nusxalanmadi, uning xotiradagi manzili nusxalandi

player2.score = 250; // player2 orqali xususiyat o'zgartirildi

console.log(player1.score); // 250 (player1 ham o'zgardi!)
console.log(player1 === player2); // true (ikkala o'zgaruvchi ham bitta obyektga ko'rsatmoqda)
\`\`\`

### 3. Advanced Example (Sayoz nusxa vs Chuqur nusxa va Ichma-ich obyektlar)
Spread operator (\`...\`) yordamida yuzaki (shallow) nusxa olinganda, faqat birinchi darajali primitivlar nusxalanadi, ammo ichki obyektlarning havolasi saqlanib qoladi:
\`\`\`javascript
const originalUser = {
  name: "Ali",
  skills: ["JavaScript", "React"] // Ichki massiv (reference type)
};

// Spread operator yordamida shallow copy
const shallowCopy = { ...originalUser };

shallowCopy.name = "Vali";
shallowCopy.skills.push("Node.js"); // Ichki obyekt o'zgartirildi

console.log(originalUser.name); // "Ali" (birinchi darajali primitiv o'zgarmadi)
console.log(originalUser.skills); // ["JavaScript", "React", "Node.js"] (ichki reference o'zgarib ketdi!)

// To'liq chuqur nusxa olish (Deep Copy) - structuredClone yordamida
const deepCopy = structuredClone(originalUser);
deepCopy.skills.push("Python");

console.log(originalUser.skills); // ["JavaScript", "React", "Node.js"] (original endi xavfsiz!)
console.log(deepCopy.skills); // ["JavaScript", "React", "Node.js", "Python"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Stack va Heap xotiralari
JavaScript tizimi (masalan V8 dvigateli) xotirani ikki turga ajratib boshqaradi:

1. **Stack (Stek) xotira:**
   - **Tuzilishi:** LIFO (Last In, First Out) tartibida ishlaydigan qat'iy va tartibli xotira.
   - **Tezligi:** Juda tez ishlaydi.
   - **Nima saqlanadi:** Funksiya chaqiriqlari (execution contexts), lokal o'zgaruvchilar va ulardagi primitiv qiymatlar hamda Heap-dagi obyektlarning havolalari (pointers).
   - **Boshqarilishi:** Kontekst yopilishi bilan Stack-dan avtomatik ravishda o'chiriladi.

2. **Heap (Xip) xotira:**
   - **Tuzilishi:** Dinamik ravishda o'lchami o'zgaruvchi, tartibsiz katta xotira havzasi.
   - **Tezligi:** Stack-ga qaraganda sekinroq, chunki manzillar bo'yicha qidirish va boshqarish talab etiladi.
   - **Nima saqlanadi:** Obyektlar, massivlar, funksiyalar va boshqa murakkab tuzilmalar.
   - **Boshqarilishi:** Garbage Collector (axlat yig'uvchi) tomonidan boshqariladi.

### Argumentlarni funksiyaga uzatish (Pass-by-value)
JavaScript-da barcha argumentlar funksiyaga **qiymat bo'yicha (by value)** uzatiladi. Biroq, obyektni uzatayotganda, "qiymat" sifatida obyektning o'zi emas, balki uning **havola ko'rsatkichi (pointer)** nusxalanib uzatiladi.

\`\`\`javascript
function modify(primitive, object) {
  primitive = 100; // Lokal o'zgaruvchi o'zgardi, tashqariga ta'sir qilmaydi
  object.value = 100; // Havola bo'yicha obyektning ichki xususiyati o'zgartirildi
  
  // Parametrga yangi obyekt yuklash (havolani uzib yuboradi)
  object = { value: 999 }; 
}

let num = 10;
let data = { value: 10 };

modify(num, data);

console.log(num);  // 10
console.log(data.value); // 100 (ichki xususiyat o'zgardi, lekin butunlay yangi obyektga aylanmadi)
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Obyektni nusxalash uchun oddiy assignment (\`=\`) operatorini ishlatish
#### Noto'g'ri (Original obyekt mutatsiyaga uchraydi):
\`\`\`javascript
const user = { name: "Anvar" };
const userCopy = user;
userCopy.name = "Doston";
console.log(user.name); // "Doston" (original ham o'zgarib ketdi)
\`\`\`
#### To'g'ri (Shallow yoki Deep nusxa olish):
\`\`\`javascript
const user = { name: "Anvar" };
const userCopy = { ...user }; // Yoki structuredClone(user)
userCopy.name = "Doston";
console.log(user.name); // "Anvar"
\`\`\`

### 2. Ikkita obyektni qiymatlari bo'yicha \`===\` orqali solishtirish
#### Noto'g'ri (Har doim false qaytaradi):
\`\`\`javascript
const obj1 = { id: 1 };
const obj2 = { id: 1 };
console.log(obj1 === obj2); // false (chunki xotiradagi manzillari boshqa-boshqa)
\`\`\`
#### To'g'ri (Tarkibidagi xususiyatlarni solishtirish):
\`\`\`javascript
const obj1 = { id: 1 };
const obj2 = { id: 1 };
const isEqual = obj1.id === obj2.id; // true
// Yoki chuqur solishtirish uchun: JSON.stringify(obj1) === JSON.stringify(obj2)
\`\`\`

### 3. \`const\` bilan e'lon qilingan obyektni umuman o'zgartirib bo'lmaydi deb o'ylash
#### Noto'g'ri (Xatolik kelib chiqishini kutish, lekin kod ishlayverishi):
\`\`\`javascript
const settings = { theme: "dark" };
settings.theme = "light"; // Hech qanday xatoliksiz o'zgaradi!
\`\`\`
#### To'g'ri (Xossalarini o'zgartirishni ham taqiqlash uchun Object.freeze ishlatish):
\`\`\`javascript
const settings = Object.freeze({ theme: "dark" });
settings.theme = "light"; // Qat'iy rejimda (strict mode) xatolik beradi, oddiy rejimda o'zgarmaydi.
console.log(settings.theme); // "dark"
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da qanday ma'lumotlar turlari primitiv hisoblanadi?
   * **Javob:** \`String\`, \`Number\`, \`Boolean\`, \`Null\`, \`Undefined\`, \`Symbol\` va \`BigInt\`.
2. **Savol:** Nima uchun \`typeof null\` natijasi \`"object"\` chiqadi?
   * **Javob:** Bu JavaScript-ning birinchi versiyalaridan qolgan tarixiy xato (bug) bo'lib, orqaga moslikni saqlab qolish uchun tuzatilmagan.
3. **Savol:** Primitivlar va obyektlarning nusxalanishidagi asosiy farq nima?
   * **Javob:** Primitivlar qiymat bo'yicha nusxalanadi (alohida xotira ajratiladi), obyektlar esa havola bo'yicha nusxalanadi (bir xil xotira manziliga ko'rsatadi).
4. **Savol:** "Immutability" (o'zgarmaslik) primitivlar uchun nima degani?
   * **Javob:** Primitiv qiymatning o'zini xotirada o'zgartirib bo'lmaydi. Masalan, \`'salom'\` satriga metod qo'llasak, u mavjud satrni o'zgartirmaydi, balki yangi satr yaratadi.

### Middle (5–8)
5. **Savol:** JavaScript-da argumentlar funksiyaga qanday uzatiladi?
   * **Javob:** Har doim qiymat bo'yicha (pass-by-value). Ammo obyektlar uzatilganda, ularning havola manzili qiymat sifatida uzatiladi, bu esa ba'zan "pass-by-reference" taassurotini uyg'otadi.
6. **Savol:** Sayoz nusxa (Shallow Copy) va Chuqur nusxa (Deep Copy) o'rtasidagi farq nima?
   * **Javob:** Sayoz nusxa faqat obyektning birinchi darajali xossalarini nusxalaydi, ichki obyektlar esa havola bo'lib qoladi. Chuqur nusxa esa barcha ichki elementlarni ham rekursiv nusxalab, mutlaqo yangi obyekt yaratadi.
7. **Savol:** \`structuredClone\` nima va uning cheklovlari qanday?
   * **Javob:** Bu JavaScript-da chuqur nusxa olish uchun mo'ljallangan o'rnatilgan funksiyadir. U funksiyalar, DOM elementlari va ba'zi maxsus obyektlarni (masalan, Symbol kalitlari) nusxalay olmaydi.
8. **Savol:** \`Object.freeze()\` metodining cheklovi nimada?
   * **Javob:** U faqat sayoz (shallow) muzlatadi. Agar obyekt ichida boshqa obyekt bo'lsa, ichki obyektning xossalarini baribir o'zgartirsa bo'ladi.

### Senior (9–12)
9. **Savol:** V8 dvigatelida Stack va Heap xotirani boshqarish va Garbage Collection qanday bog'langan?
   * **Javob:** Stack o'z-o'zidan kontekst yakunlanganda tozalanadi. Heap xotiradagi obyektlar esa Garbage Collector (Mark-and-Sweep algoritmi) orqali tozalanadi. Agar Stack-dan (root) Heap-dagi obyektgacha hech qanday havola zanjiri yetib bormasa, u axlat deb hisoblanadi va o'chiriladi.
10. **Savol:** Closures (yopilishlar) qanday qilib xotira oqishiga (memory leak) sabab bo'lishi mumkin?
    * **Javob:** Ichki funksiya tashqi funksiyadagi katta obyektlarni o'zining leksik muhitida (\`[[Environment]]\`) saqlab qolsa va ichki funksiyaga havola ochiq qolsa, Garbage Collector o'sha katta obyektlarni Heap-dan o'chira olmaydi.
11. **Savol:** Nima uchun primitivlarni Heap-da emas, Stack-da saqlash optimalroq?
    * **Javob:** Chunki primitivlarning o'lchami oldindan ma'lum va o'zgarmasdir. Stack xotira pointer siljishi orqali juda tez ishlaydi, Heap esa dinamik taqsimlashni talab qiladi va sekinroq.
12. **Savol:** Primitivlar ustida metod chaqirilganda (masalan, \`"hello".toUpperCase()\`) orqa fonda nima yuz beradi (Autoboxing)?
    * **Javob:** JavaScript vaqtincha vaqtinchalik o'rab turuvchi obyekt (Wrapper Object: \`new String()\`) yaratadi, metodni bajaradi va natijani qaytargach, u obyektni darhol yo'qotib, xotirani bo'shatadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasi JavaScript-da primitiv va havola turlarining xotirada qanday saqlanishi va nusxalanishini yaqqol ko'rsatib beradi:

\`\`\`mermaid
graph TD
    subgraph Stack [Stack Xotira - Tezkor va Cheklangan]
        style Stack fill:#e6f7ff,stroke:#1890ff,stroke-width:2px
        pValA["let a = 10 (Primitive)"]
        pValB["let b = a (Qiymat nusxalandi: 10)"]
        ref1["let user1 = #202 (Havola manzili)"]
        ref2["let user2 = user1 (Havola nusxalandi: #202)"]
    end

    subgraph Heap [Heap Xotira - Dinamik va Katta]
        style Heap fill:#fff7e6,stroke:#ffa940,stroke-width:2px
        heapData["Manzil #202: { name: 'Ali', age: 25 }"]
    end

    ref1 -.->|Ko'rsatadi| heapData
    ref2 -.->|Ko'rsatadi| heapData
\`\`\`

### Amaliy Mashqlar:
1. **Shallow vs Deep Copy:** Berilgan murakkab xususiyatli obyekt ustida yuzaki va chuqur nusxalarni sinab ko'ring va ularning o'zgarishlarini konsolda kuzating.
2. **Mutatsiyasiz funksiya yozish:** Massiv elementlarini o'zgartiradigan, lekin original massivni buzmaydigan, toza funksiyalar yozish amaliyoti.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi bilimingizni sinash uchun testlar.

---

## 8. 🎯 Real Project Case Study

### React State yangilanishida Immutability (O'zgarmaslik) printsipi
React loyihalarida state o'zgarganini tekshirish uchun faqatgina havolalar solishtiriladi (\`prevState === nextState\`). Agar siz obyekt ichini mutatsiya qilsangiz, React o'zgarishni sezmaydi.

#### Xavfli va xato yondashuv (React-da render ishlamaydi):
\`\`\`javascript
const [profile, setProfile] = useState({ name: "Lola", settings: { notifications: true } });

const toggleNotificationsX = () => {
  profile.settings.notifications = !profile.settings.notifications; // Mutatsiya!
  setProfile(profile); // Havola bir xil bo'lgani uchun sahifa yangilanmaydi
};
\`\`\`

#### To'g'ri yondashuv (Immutability saqlangan):
\`\`\`javascript
const toggleNotifications = () => {
  setProfile({
    ...profile,
    settings: {
      ...profile.settings,
      notifications: !profile.settings.notifications
    }
  }); // Yangi xotira manzillariga ega obyekt yaratiladi va React renderingni boshlaydi
};
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Obyekt yaratish xarajati:** Heap xotirada yangi obyekt yaratish Stack-dagi oddiy primitiv amallarga qaraganda 10-20 baravar ko'proq vaqt va resurs talab qiladi. Keraksiz massiv va obyekt yaratishdan tiyilish kerak.
* **Deep Copy xavfi:** \`JSON.parse(JSON.stringify(obj))\` yoki \`structuredClone(obj)\` orqali katta obyektlarni nusxalash og'ir CPU operatsiyasidir. Agar bu tez-tez (masalan, har bir sekundda yoki har bir klaviatura bosilganda) bajarilsa, dastur qotib qoladi (jank yuzaga keladi).
* **Garbage Collection yuklamasi:** Heap xotirada yaratilgan obyektlar soni qanchalik ko'p bo'lsa, Garbage Collector shunchalik ko'p ishlashga va CPU resursini sarflashga majbur bo'ladi.

---

## 10. 📌 Cheat Sheet

| Xususiyat | Primitiv turlar | Havola turlar (Obyektlar) |
| :--- | :--- | :--- |
| **Xotirada saqlanishi** | Stack xotirada bevosita | Heap-da ma'lumot, Stack-da havola manzili |
| **Nusxalanishi** | Qiymat bo'yicha (Copy by value) | Havola bo'yicha (Copy by reference) |
| **Taqqoslanishi** | Qiymati bo'yicha solishtiriladi | Xotiradagi manzili bo'yicha solishtiriladi |
| **O'zgaruvchanligi** | O'zgarmas (Immutable) | O'zgaruvchan (Mutable) |
| **Misollar** | \`42\`, \`"salom"\`, \`true\`, \`null\` | \`{...}\`, \`[...]\`, \`function() {}\` |
`,
  exercises: [
    {
      id: 1,
      title: "Manzilni tekshirish",
      instruction: "Ikkita yangi bo'sh obyekt yaratib ularni qat'iy tenglik (===) orqali solishtiring va natijani res o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = ({} === {});",
      test: "if (res === false) return null; return 'Obyektlar har doim alohida xotirada bo\\'ladi, natija false bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Primitiv nusxasi",
      instruction: "x o'zgaruvchisini y o'zgaruvchisiga o'zlashtiring va keyin y ning qiymatini 20 qiling. x o'zgaruvchisini o'z holicha qoldiring.",
      startingCode: "let x = 10;\n// Bu yerga yozing\nlet y = ",
      hint: "let y = x; y = 20;",
      test: "if (x === 10 && y === 20) return null; return 'x ning qiymati 10 bo\\'lib qolishi shart!';"
    },
    {
      id: 3,
      title: "Obyekt havolasi",
      instruction: "user obyektini admin o'zgaruvchisiga o'zlashtiring. Keyin admin.name qiymatini 'Vali' ga o'zgartiring.",
      startingCode: "let user = { name: 'Ali' };\n// Bu yerga yozing\nlet admin = ",
      hint: "let admin = user; admin.name = 'Vali';",
      test: "if (user.name === 'Vali' && admin.name === 'Vali') return null; return 'admin o\\'zgarganda user.name ham Vali bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Mustaqil obyekt nusxasi",
      instruction: "Spread operatoridan (...) foydalanib original obyektining nusxasini yarating va uni copy o'zgaruvchisiga saqlang. Keyin copy.age ni 30 qiling.",
      startingCode: "let original = { age: 25 };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = { ...original }; copy.age = 30;",
      test: "if (original.age === 25 && copy.age === 30) return null; return 'original.age 25 bo\\'lib qolishi shart!';"
    },
    {
      id: 5,
      title: "Massiv havolasi",
      instruction: "list1 massivini list2 o'zgaruvchisiga tenglang. Keyin list2 massiviga push() yordamida 3 sonini qo'shing.",
      startingCode: "let list1 = [1, 2];\n// Bu yerga yozing\nlet list2 = ",
      hint: "let list2 = list1; list2.push(3);",
      test: "if (list1.length === 3 && list1[2] === 3) return null; return 'list1 massiviga ham 3 soni qo\\'shilib qolishi kerak!';"
    },
    {
      id: 6,
      title: "Massiv nusxasi",
      instruction: "Spread operatori yordamida originalList massivining mustaqil nusxasini yarating va uni newList o'zgaruvchisiga saqlang. Keyin newList massiviga 3 sonini qo'shing.",
      startingCode: "let originalList = [1, 2];\n// Bu yerga yozing\nlet newList = ",
      hint: "let newList = [...originalList]; newList.push(3);",
      test: "if (originalList.length === 2 && newList.length === 3) return null; return 'originalList o\\'zgarmasdan qolishi kerak!';"
    },
    {
      id: 7,
      title: "Teng manzillar",
      instruction: "obj1 ni obj2 ga o'zlashtiring. Keyin ularni qat'iy tenglik (===) orqali tekshirib natijani res o'zgaruvchisiga saqlang.",
      startingCode: "let obj1 = { val: 10 };\n// Bu yerga yozing\nlet obj2 = \nlet res = ",
      hint: "let obj2 = obj1; let res = (obj1 === obj2);",
      test: "if (res === true) return null; return 'Havolalar bitta bo\\'lgani sababli res true bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Obyektni muzlatish",
      instruction: "Object.freeze() yordamida obj obyektini o'zgartirib bo'lmaydigan qilib muzlating.",
      startingCode: "let obj = { x: 5 };\n// Bu yerga yozing\n",
      hint: "Object.freeze(obj);",
      test: "if (Object.isFrozen(obj)) return null; return 'obj obyekti muzlatilishi shart!';"
    },
    {
      id: 9,
      title: "String o'zgarmasligi",
      instruction: "Matnlarning (string) o'zgarmasligini (immutability) tekshiring. str massiv kabi indeks orqali str[0] = 'S' deb o'zgartirib ko'ring (o'zgarmaydi) va uni chop eting.",
      startingCode: "let str = 'salom';\n// Bu yerga yozing\n",
      hint: "str[0] = 'S'; console.log(str);",
      test: "if (code.includes('[0]') && str === 'salom') return null; return 'String o\\'zgarib qolmasligini indeks orqali tekshiring!';"
    },
    {
      id: 10,
      title: "Havolaning uzilishi",
      instruction: "b o'zgaruvchisiga a obyektini o'zlashtiring. Keyin a o'zgaruvchisini butunlay yangi obyekt { n: 2 } ga o'zgartiring (buning natijasida b o'zgarmaydi).",
      startingCode: "let a = { n: 1 };\n// Bu yerga yozing\nlet b = ",
      hint: "let b = a; a = { n: 2 };",
      test: "if (b.n === 1 && a.n === 2) return null; return 'a yangilanganda b o\\'zgaruvchisi eski obyektda qolishi kerak!';"
    },
    {
      id: 11,
      title: "Shallow copy muammosi",
      instruction: "Spread yordamida user obyektini copy ga nusxalang. Keyin copy.info.age ni 25 qiling. Buning natijasida original ham o'zgarib qolishini ko'rasiz.",
      startingCode: "let user = { info: { age: 20 } };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = { ...user }; copy.info.age = 25;",
      test: "if (user.info.age === 25 && copy.info.age === 25) return null; return 'copy.info.age o\\'zgarganda user.info.age ham o\\'zgarib qolishi shart (shallow copy)!';"
    },
    {
      id: 12,
      title: "JSON Deep copy",
      instruction: "JSON.parse(JSON.stringify()) yordamida user obyektining to'liq chuqur nusxasini oling va uni copy o'zgaruvchisiga saqlang. Keyin copy.info.age ni 25 qiling.",
      startingCode: "let user = { info: { age: 20 } };\n// Bu yerga yozing\nlet copy = ",
      hint: "let copy = JSON.parse(JSON.stringify(user)); copy.info.age = 25;",
      test: "if (user.info.age === 20 && copy.info.age === 25) return null; return 'Deep copy natijasida original obyekt o\\'zgarmasdan qolishi kerak!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da qaysi ma'lumotlar turi primitiv hisoblanadi?",
    "options": [
      "Object",
      "Function",
      "String",
      "Array"
    ],
    "correctAnswer": 2,
    "explanation": "String JavaScript-dagi primitiv ma'lumot turlaridan biridir. Object, Function va Array esa reference (havola) turlariga kiradi."
  },
  {
    "id": 2,
    "question": "Primitiv qiymatlar xotiraning qaysi qismida saqlanadi?",
    "options": [
      "Stack xotirada",
      "Heap xotirada",
      "Faqat diskda",
      "Web API-larda"
    ],
    "correctAnswer": 0,
    "explanation": "Primitiv qiymatlar o'lchami oldindan ma'lum bo'lganligi sababli tezkor va qat'iy tartibli Stack xotirasida bevosita saqlanadi."
  },
  {
    "id": 3,
    "question": "Obyektlar va massivlar kabi murakkab ma'lumotlar xotiraning qaysi qismida saqlanadi va Stack-da nima saqlanadi?",
    "options": [
      "Heap-da saqlanadi va Stack-da ularga ko'rsatib turuvchi havola manzili (pointer) saqlanadi",
      "Stack-da saqlanadi va Heap-da ularga ko'rsatib turuvchi havola manzili saqlanadi",
      "Ikkalasi ham faqat Stack-da saqlanadi",
      "Ular hech qayerda saqlanmaydi, har doim brauzer keshidan olinadi"
    ],
    "correctAnswer": 0,
    "explanation": "Dinamik o'lchamli obyektlar Heap xotirada saqlanadi. Stack xotirasida esa ularning Heap-dagi manziliga havola (reference pointer) saqlanadi."
  },
  {
    "id": 4,
    "question": "let a = 5; let b = a; b = 10; kodidan so'ng a ning qiymati nechaga teng bo'ladi?",
    "options": [
      "10",
      "5",
      "undefined",
      "ReferenceError beradi"
    ],
    "correctAnswer": 1,
    "explanation": "a primitiv son bo'lganligi sababli, b = a qilinganda qiymat nusxalandi. b o'zgartirilishi a ning qiymatiga ta'sir qilmaydi, shuning uchun a hamon 5 dir."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilgandan keyin nima konsolga chiqadi?\n\nconst user1 = { name: 'Ali' };\nconst user2 = user1;\nuser2.name = 'Vali';\nconsole.log(user1.name);",
    "options": [
      "'Ali'",
      "'Vali'",
      "undefined",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlar havola bo'yicha nusxalanadi. user2 = user1 bo'lganda ikkala o'zgaruvchi ham bitta xotira manziliga havola qiladi. Shuning uchun user2.name o'zgartirilganda original user1.name ham 'Vali' ga o'zgaradi."
  },
  {
    "id": 6,
    "question": "Quyidagi taqqoslash natijasi nima bo'ladi? console.log({} === {});",
    "options": [
      "true",
      "false",
      "undefined",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlar === orqali solishtirilganda xotiradagi manzillari solishtiriladi. Bu yerda ikkita alohida yangi obyekt yaratilmoqda, ularning xotira manzillari har xil, shuning uchun natija false bo'ladi."
  },
  {
    "id": 7,
    "question": "const kalit so'zi yordamida e'lon qilingan obyekt ustida qaysi amalni bajarib bo'lmaydi?",
    "options": [
      "Obyektning xususiyatini o'zgartirish (masalan: obj.id = 2)",
      "Obyektga yangi xususiyat qo'shish (masalan: obj.newProp = 'test')",
      "Obyektga butunlay yangi obyekt havolasini qayta yuklash (masalan: obj = { id: 2 })",
      "Obyektdagi xususiyatni delete yordamida o'chirish"
    ],
    "correctAnswer": 2,
    "explanation": "const kalit so'zi o'zgaruvchining xotiradagi havola ko'rsatkichini o'zgartirishni (reassignment) taqiqlaydi. Obyekt ichidagi xususiyatlarni o'zgartirish esa havola manzilini o'zgartirmaydi, shuning uchun u mumkin."
  },
  {
    "id": 8,
    "question": "Obyektning birinchi darajali xossalarini nusxalab, lekin ichki obyekt havolalarini saqlab qoladigan nusxalash turi nima deyiladi?",
    "options": [
      "Deep Copy (Chuqur nusxa)",
      "Shallow Copy (Yuzaki nusxa)",
      "Reference Copy (Havola nusxasi)",
      "Absolute Copy (Mutloq nusxa)"
    ],
    "correctAnswer": 1,
    "explanation": "Shallow Copy (yuzaki yoki sayoz nusxa) faqat birinchi darajali elementlarni nusxalaydi, ichki obyektlar esa original obyekt bilan bir xil havola bo'yicha qoladi."
  },
  {
    "id": 9,
    "question": "JavaScript-da obyektni chuqur nusxalash (Deep Copy) uchun qaysi standart o'rnatilgan funksiyadan foydalanish tavsiya etiladi?",
    "options": [
      "Object.assign()",
      "Spread operator (...)",
      "structuredClone()",
      "Object.create()"
    ],
    "correctAnswer": 2,
    "explanation": "structuredClone() zamonaviy JavaScript-dagi o'rnatilgan funksiya bo'lib, murakkab ichma-ich obyektlarni xavfsiz va to'liq chuqur nusxalaydi (deep copy)."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilgandan keyin x ning qiymati nima bo'ladi?\n\nfunction addProp(obj) {\n  obj.age = 20;\n  obj = { age: 30 };\n}\nconst x = { age: 10 };\naddProp(x);",
    "options": [
      "{ age: 10 }",
      "{ age: 20 }",
      "{ age: 30 }",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya parametriga obyekt uzatilganda uning havolasi uzatiladi. obj.age = 20 original obyektni mutatsiya qiladi. Ammo keyinchalik obj = { age: 30 } qilinganda, lokal parametr havola manzili uzib yuboriladi va u yangi obyektga ko'rsatadi, bu esa tashqaridagi x ga ta'sir qilmaydi. Shuning uchun x.age qiymati 20 bo'lib qoladi."
  },
  {
    "id": 11,
    "question": "Obyektni mutatsiyadan saqlash va uning birinchi darajali barcha xususiyatlarini o'zgartirishni butunlay taqiqlash uchun qaysi metod ishlatiladi?",
    "options": [
      "Object.freeze()",
      "Object.seal()",
      "Object.preventExtensions()",
      "Object.lock()"
    ],
    "correctAnswer": 0,
    "explanation": "Object.freeze() metodi obyektning yangi xossalarini qo'shish, mavjudlarini o'chirish yoki qiymatlarini o'zgartirishni to'liq taqiqlab qo'yadi."
  },
  {
    "id": 12,
    "question": "Heap xotiradagi foydalanilmayotgan obyektlar xotiradan qanday tozalanadi?",
    "options": [
      "Ular Stack to'lishi bilan o'chib ketadi",
      "Garbage Collector (Axlat yig'uvchi) tomonidan zanjirli kirish huquqi (reachability) yo'qolganda tozalanadi",
      "Dasturchi har bir o'zgaruvchidan keyin free() funksiyasini chaqirishi shart",
      "Hech qachon tozalanmaydi, brauzer yopilguncha saqlanadi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da xotirani boshqarish avtomatlashtirilgan. Garbage Collector 'Mark-and-Sweep' algoritmi yordamida Stack root-dan boshlab yetib bo'lmaydigan (unreachable) bo'lgan obyektlarni Heap xotiradan avtomatik tozalaydi."
  }
]

};
