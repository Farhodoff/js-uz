export const capPacelc = {
  id: "capPacelc",
  title: "CAP va PACELC Teomalari: Tarqoq Tizimlar Muvozanati",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

Tasavvur qiling, siz va do'stingiz (Ali va Vali) birgalikda eslatmalar xizmatini yo'lga qo'ydingiz. Mijozlar sizga telefon qilib, eslatmalar qoldirishadi yoki oldingi yozilganlarini so'rashadi. Sizlar alohida xonalarda o'tirasizlar, lekin har safar yangi yozuv yozilganda, bir-biringizga qog'oz orqali xabar yuborib, daftarlaringizni sinxronlab turasiz.

Kunlardan bir kun, xonalaringiz orasidagi yo'lak yopilib qoldi va qog'oz almasha olmay qoldingiz. Bu **Tarmoq Bo'linishi (Network Partition - P)** holatidir. Shunda telefon jiringladi:

*   **Mijoz Aliga qo'ng'iroq qilib, yangi eslatma yozdirdi:** Ali buni yozib oldi. Lekin u Vali bilan bog'lana olmaydi.
*   **Keyin mijoz Valiga qo'ng'iroq qilib, o'sha eslatmani so'radi:** Vali nima qilishi kerak?
    1.  **CP (Consistency + Partition Tolerance) Tanlovi:** Vali: "Kechirasiz, hozir Alining xonasi bilan aloqa uzilgan, sizga aniq ma'lumot berolmayman" deb javob beradi. Tizim xizmat ko'rsatishni rad etadi (Availability yo'qoladi), lekin noto'g'ri ma'lumot ham bermaydi (Muvofiqlik/Consistency saqlanadi).
    2.  **AP (Availability + Partition Tolerance) Tanlovi:** Vali: "Menda bor oxirgi ma'lumot mana bu..." deb javob beradi. Vali mijozga tezda javob beradi (Availability saqlanadi), lekin bu ma'lumot eskirgan bo'lishi mumkin, chunki u Alining yangi yozganidan bexabar (Consistency yo'qoladi).

---

## 2. 💻 Real Kod Misollari

JavaScript-da tarmoq bo'linishi va replikalar o'rtasidagi kelishmovchilikni simulyatsiya qilamiz:

\`\`\`javascript
class DistributedNode {
  constructor(name) {
    this.name = name;
    this.data = null;
    this.version = 0;
    this.connectedNodes = new Set();
  }

  connect(node) {
    this.connectedNodes.add(node);
  }

  disconnect(node) {
    this.connectedNodes.delete(node);
  }

  write(value) {
    this.data = value;
    this.version += 1;
    
    // Boshqa ulangan replikalarga tarqatish (Replication)
    let replicatedCount = 1;
    for (let peer of this.connectedNodes) {
      peer.receiveUpdate(value, this.version);
      replicatedCount++;
    }
    return replicatedCount;
  }

  receiveUpdate(value, version) {
    if (version > this.version) {
      this.data = value;
      this.version = version;
    }
  }

  read() {
    return { data: this.data, version: this.version };
  }
}

// Tarmoqni simulyatsiya qilish
const replicaA = new DistributedNode("Replica-A");
const replicaB = new DistributedNode("Replica-B");

// Oddiy holatda replikalar ulangan
replicaA.connect(replicaB);
replicaB.connect(replicaA);

// Oddiy yozish
replicaA.write("Salom Dunyo");
console.log(replicaB.read().data); // "Salom Dunyo" (Sinxronlangan)

// Tarmoq uzilishi (Partition)
replicaA.disconnect(replicaB);
replicaB.disconnect(replicaA);

// A replikaga yangi ma'lumot yozamiz
replicaA.write("Yangi Xabar");

// B replikadan o'qiymiz
console.log(replicaB.read().data); // "Salom Dunyo" (Eski ma'lumot! Consistency buzildi - AP holati)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### CAP Teoremasi
2000-yilda Eric Brewer tomonidan taqdim etilgan CAP teoremasi tarqoq tizimlar quyidagi uchta kafolatdan faqat **ikkitasini** bir vaqtning o'zida ta'minlay olishini isbotlaydi:

1.  **Consistency (C - Muvofiqlik):** Har bir o'qish so'rovi eng oxirgi yozilgan ma'lumotni yoki xatolikni qaytaradi. Barcha tugunlar bir vaqtda mutlaqo bir xil ma'lumotni ko'radi.
2.  **Availability (A - Mavjudlik):** Ishlayotgan har qanday tugun xatoliksiz javob qaytarishi kerak (lekin bu javob eng oxirgi yozilgan ma'lumot bo'lishi shart emas).
3.  **Partition Tolerance (P - Bo'linishga Chidamlilik):** Tugunlar o'rtasida tarmoq xabarlari yo'qolgan yoki kechikkan holatda ham tizim ishlashda davom etadi.

> [!IMPORTANT]
> Real dunyo tarmoqlarida uzilishlar (P) muqarrar. Shuning uchun bizda hech qachon **CA** tizim bo'lmaydi. Biz faqat **CP** yoki **AP** tizimni tanlashimiz mumkin.

### PACELC Teoremasi
CAP faqat tarmoq bo'lingan (Partition) holatni tasvirlaydi. Oddiy ish rejimida (Partition yo'q paytda) nima bo'ladi? Buni **PACELC** tushuntiradi:

Agar **P** (Partition) bo'lsa, tizim **A** (Availability) yoki **C** (Consistency) tanlaydi;
**E**lse (Aks holda, normal holatda), tizim **L** (Latency - Tezkorlik) yoki **C** (Consistency - Kuchli muvofiqlik) o'rtasida tanlov qilishi kerak.

*   **MongoDB (PC/EC):** Bo'linishda Consistency-ni tanlaydi, normal holatda ham tezlikdan ko'ra Consistency-ni (EC) afzal ko'radi.
*   **Cassandra (PA/EL):** Bo'linishda Availability-ni tanlaydi, normal holatda ham minimal kechikish (Latency - EL) uchun eventual consistency-dan foydalanib ishlaydi.

### Quorum Formulalari (W + R > N)
Tarqoq tizimlarda ma'lumotlar to'g'riligini saqlash uchun kvorum (Quorum) ishlatiladi:
*   $N$: Replikalar (tugunlar) soni.
*   $W$: Yozish muvaffaqiyatli deb hisoblanishi uchun tasdiqlashi kerak bo'lgan replikalar soni.
*   $R$: O'qish so'rovida so'raladigan replikalar soni.

Agar **$W + R > N$** bo'lsa, o'qish to'plami va yozish to'plami kamida bitta umumiy replikaga ega bo'ladi va siz har doim **kuchli consistency (strong consistency)**ga ega bo'lasiz. Aks holda ($W + R \\le N$), **eventual consistency** yuzaga keladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1.  **"Men CA tizim yaratdim" deyish:** Ko'pchilik bitta server va bitta ma'lumotlar bazasidan iborat tizimni CA deb o'ylaydi. Ammo tarqoq bo'lmagan tizimlarda CAP qo'llanilmaydi. Agar tizim tarqoq bo'lsa, tarmoq uzilishi muqarrar, demak CA variant sifatida mavjud emas.
2.  **ACID Muvofiqligi (C) bilan CAP Muvofiqligi (C) ni adashtirish:** ACID-dagi Consistency bu ma'lumotlar bazasining schema va constraint qoidalariga (masalan, unique key, foreign key) mos kelishidir. CAP-dagi Consistency esa tarqoq replikalar orasidagi ma'lumotlarning bir xilligidir (Linearizability).
3.  **W + R parametrlarini noto'g'ri sozlash:** Masalan, $N=3$, $W=1$, $R=1$ qilib qo'yish. Bu holda tizim juda tez ishlaydi (Latency past), lekin o'qish paytida eski (stale) ma'lumot qaytishi ehtimoli juda yuqori bo'ladi, chunki $1 + 1 \\le 3$.

---

## 5. 💬 12 ta Intervyu Savollari

1.  **CAP teoremasi nima va undagi 3 ta harf nimani anglatadi?**
    Tarqoq tizimlarda Consistency (Muvofiqlik), Availability (Mavjudlik) va Partition Tolerance (Bo'linishga chidamlilik) kafolatlaridan faqat ikkitasini bir vaqtda ta'minlash mumkinligini ko'rsatadigan teorema.
2.  **Nima uchun real tizimlarda CA (Consistency + Availability) bo'lishi mumkin emas?**
    Chunki real jismoniy tarmoqlarda uzilishlar (Partitions) yuz berishi tabiiy holat. P-dan qochib bo'lmagani uchun, faqat CP yoki AP tanlanishi shart.
3.  **Linearizability nima?**
    CAP-dagi kuchli Consistency (Muvofiqlik) ning sinonimi. Har qanday o'qish operatsiyasi eng oxirgi yozilgan qiymatni qaytarishi kafolatidir.
4.  **PACELC teoremasi nima va u CAP-ni qanday kengaytiradi?**
    PACELC teoremasi tarmoq bo'linishi yo'q paytdagi (normal holatda) Latency (tezkorlik) va Consistency (muvofiqlik) o'rtasidagi kelishuvni ham hisobga oladi.
5.  **Eventual Consistency nima?**
    Yozish amalga oshirilgandan so'ng, tizim replikalari ma'lum vaqt ichida yangilanadi, ammo darhol emas. Vaqt o'tishi bilan barcha replikalar baribir bir xil qiymatga keladi.
6.  **Quorum o'qish va yozish formulasi qanday? Kuchli consistency uchun shart nima?**
    Formula: $W + R > N$. Bunda yozish tasdiqlanadigan tugunlar ($W$) va o'qiladigan tugunlar ($R$) yig'indisi umumiy tugunlar ($N$) sonidan katta bo'lishi kerak.
7.  **Agar $W=1, R=1, N=3$ bo'lsa, qanday consistency turi yuzaga keladi va nima uchun?**
    Eventual consistency yuzaga keladi. Chunki $1 + 1 \\le 3$, yozilgan va o'qilgan tugunlar mutlaqo boshqa-boshqa bo'lishi mumkin.
8.  **Cassandra qanday tizim (PACELC bo'yicha)?**
    Cassandra PA/EL tizim hisoblanadi. Tarmoq bo'linganda u Availability-ni, normal holatda esa Latency-ni (tezlikni) afzal ko'radi.
9.  **MongoDB qanday tizim (PACELC bo'yicha)?**
    MongoDB PC/EC tizimdir. Tarmoq bo'linganda ham, normal holatda ham u ma'lumotlar muvofiqligini (Consistency) birinchi o'ringa qo'yadi.
10. **Network Partition (Tarmoq bo'linishi) deganda nimani tushunasiz?**
    Tarmoqdagi uzilish tufayli serverlar (tugunlar) guruhining bir-biri bilan aloqasi yo'qolishi, lekin har bir guruh ichidagi serverlar o'z holicha ishlashda davom etishi.
11. **Spanner qaysi CAP guruhiga kiradi va u qanday qilib yuqori mavjudlikni ta'minlaydi?**
    Spanner CP tizim hisoblanadi, lekin u TrueTime API (atom soatlari) va GPS orqali tarmoq kechikishlarini minimal qilib, amalda deyarli 99.999% mavjudlikni (Availability) ko'rsatadi.
12. **Read Repair nima?**
    O'qish jarayonida replikalardan eski ma'lumot aniqlanganda, fon rejimida uni eng yangi versiya bilan yangilab qo'yish jarayoni.

---

## 6. 🛠️ Amaliy Topshiriqlar

Dars uchun tayyorlangan coding mashqlari orqali tarqoq tizim sozlamalarini tekshirishni, PACELC klassifikatorini yaratishni va tarmoq bo'linganda so'rovlarni marshrutlashni o'rganing.

---

## 7. 📝 12 ta Mini Test

Testlar bo'limida CAP va PACELC teomalari bo'yicha bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### DynamoDB vs MongoDB
Yirik elektron tijorat platformasida ikki xil komponent mavjud:
1.  **Savat (Shopping Cart):** Foydalanuvchi mahsulot qo'shganda tezkorlik juda muhim. Agar tarmoq bo'linsa ham savat ishlashi kerak. Buning uchun **AP (Eventual Consistency / DynamoDB)** mos keladi.
2.  **To'lov tizimi (Checkout/Payment):** Bu yerda pul hisob-kitobi ketadi. Xatolikka yo'l qo'yib bo'lmaydi. Ikki marta pul yechilmasligi yoki balans noto'g'ri ko'rinmasligi uchun **CP (Strong Consistency / MongoDB yoki Spanner)** tanlanadi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

### Tarmoq Bo'linishi (Partition) Paytida CAP Tanlovi

\`\`\`mermaid
graph TD
    subgraph G1 [Guruh 1 - CP Tanlovida]
        NodeA[Replica A: Yangi Qiymat]
    end
    subgraph G2 [Guruh 2 - AP Tanlovida]
        NodeB[Replica B: Eski Qiymat]
    end
    
    NodeA -.-|X Tarmoq Uzilgan| NodeB
    
    Client1[Client 1: Write] -->|Yozish| NodeA
    Client2[Client 2: Read] -->|O'qish| NodeB
    
    style NodeA fill:#d4edda,stroke:#28a745
    style NodeB fill:#f8d7da,stroke:#dc3545
\`\`\`

### PACELC Qaror Qabul Qilish Daraxti

\`\`\`mermaid
graph TD
    Start[Tarqoq Tizim Holati] --> Partition{Tarmoq Bo'linganmi? - P}
    Partition -->|Ha| PACAP{Mavjudlikmi yoki Muvofiqlikmi? - A vs C}
    PACAP -->|Availability| AP[AP Tizim]
    PACAP -->|Consistency| CP[CP Tizim]
    
    Partition -->|Yo'q - Else| PACEL{Tezlikmi yoki Muvofiqlikmi? - L vs C}
    PACEL -->|Latency| EL[EL Tizim]
    PACEL -->|Consistency| EC[EC Tizim]
\`\`\`

---

## 10. 📌 Cheat Sheet

### CAP va PACELC bo'yicha Tizimlar Xaritasi

| Tizim | CAP Turi | PACELC Turi | Asosiy Xususiyati |
| :--- | :--- | :--- | :--- |
| **Cassandra** | AP | PA / EL | Yuqori yozish tezligi, eventual consistency |
| **MongoDB** | CP | PC / EC | Relyatsion bo'lmagan, lekin kuchli consistency |
| **DynamoDB** | AP | PA / EL | Sozlanadigan kvorum, normal holatda juda tez |
| **Spanner** | CP | PC / EC | Global miqyosda kuchli consistency (TrueTime API) |

### Quorum Sozlamalari Jadvali ($N=3$ replika uchun)

| W | R | Turi | Xavf darajasi / Afzalligi |
| :--- | :--- | :--- | :--- |
| **3** | **1** | Kuchli Consistency | Yozish sekin (barcha replikalar kutiladi), o'qish juda tez |
| **2** | **2** | Kuchli Consistency | Optimal muvozanat ($2+2 > 3$) |
| **1** | **3** | Kuchli Consistency | Yozish juda tez, o'qish sekin (hamma replika so'raladi) |
| **1** | **1** | Eventual Consistency | Eng tezkor, lekin eski ma'lumot o'qish xavfi juda yuqori |
`,
  exercises: [
  {
    "id": 1,
    "title": "Quorum Configurator (W + R > N)",
    "instruction": "Kvorum parametrlarini tekshiradigan `validateQuorumConfig(w, r, n)` funksiyasini yozing. Funksiya quyidagi qoidalarga ko'ra `{ isValid: boolean, isStrong: boolean, reason: string }` obyektini qaytarishi kerak:\n1. Barcha parametrlar butun sonlar va 1 dan katta yoki teng bo'lishi shart.\n2. W va R qiymatlari N dan katta bo'la olmaydi. Agar shunday bo'lsa, `isValid` false bo'ladi va sababi yoziladi.\n3. Agar sozlamalar to'g'ri bo'lsa (`isValid` true) va `W + R > N` bo'lsa, `isStrong` true bo'ladi va reason: 'Strong consistency guaranteed'.\n4. Agar `W + R <= N` bo'lsa, `isStrong` false bo'ladi va reason: 'Eventual consistency only'.",
    "startingCode": "function validateQuorumConfig(w, r, n) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Avval parametrlar N dan oshmasligini va 1 dan kichik bo'lmasligini tekshiring. Keyin W + R > N shartini tekshirib natijani qaytaring.",
    "test": "const sandbox = new Function(code + '; return validateQuorumConfig;');\nconst fn = sandbox();\nlet res = fn(2, 2, 3);\nif (!res.isValid || !res.isStrong || res.reason !== 'Strong consistency guaranteed') return '2,2,3 sozlamasi kuchli kvorum hisoblanadi!';\nres = fn(1, 1, 3);\nif (!res.isValid || res.isStrong || res.reason !== 'Eventual consistency only') return '1,1,3 sozlamasi eventual consistency bo\\'lishi kerak!';\nres = fn(4, 2, 3);\nif (res.isValid) return 'W qiymati N dan katta bo\\'lishi mumkin emas!';\nreturn null;"
  },
  {
    "id": 2,
    "title": "PACELC Teoremasi Klassifikatori",
    "instruction": "Ma'lumotlar bazasi xatti-harakatiga qarab uni PACELC bo'yicha klassifikatsiya qiluvchi `classifyPACELC(partitionChoice, normalChoice)` funksiyasini yozing.\n- `partitionChoice` faqat 'A' (Availability) yoki 'C' (Consistency) bo'lishi mumkin.\n- `normalChoice` faqat 'L' (Latency) yoki 'C' (Consistency) bo'lishi mumkin.\n- Kiritilgan qiymatlar noto'g'ri bo'lsa, xato (`Error('Invalid inputs')`) otishi kerak.\n- Natija sifatida `{ classification: string, examples: string[] }` formatida obyekt qaytaring.\n- Misollar:\n  - PA/EL bo'lsa: `['Cassandra', 'DynamoDB']`\n  - PC/EC bo'lsa: `['MongoDB', 'Spanner']`\n  - Boshqa holatlar uchun mos ravishda mos klassifikatsiya (masalan, `PC/EL` yoki `PA/EC`) va bo'sh massiv `[]` qaytarsin.",
    "startingCode": "function classifyPACELC(partitionChoice, normalChoice) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Kiritilgan qiymatlarni katta harflarga o'tqazib tekshiring. Klassifikatsiyani 'P' + partitionChoice + '/E' + normalChoice ko'rinishida hosil qiling.",
    "test": "const sandbox = new Function(code + '; return classifyPACELC;');\nconst fn = sandbox();\ntry {\n  const res = fn('A', 'L');\n  if (res.classification !== 'PA/EL' || !res.examples.includes('Cassandra')) return 'PA/EL klassifikatsiyasi noto\\'g\\'ri!';\n} catch(e) {\n  return 'A va L to\\'g\\'ri parametrlar hisoblanadi!';\n}\ntry {\n  fn('X', 'Y');\n  return 'Noto\\'g\\'ri parametrlarga xatolik otilmadi!';\n} catch(e) {}\nconst res2 = fn('C', 'C');\nif (res2.classification !== 'PC/EC' || !res2.examples.includes('MongoDB')) return 'PC/EC klassifikatsiyasi xato!';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Network Partition Request Router",
    "instruction": "Tarmoq bo'lingan yoki normal holatida so'rovlarni boshqaruvchi `routeRequest(partitioned, preferredStrategy, primaryHealthy, replicaHealthy)` funksiyasini yozing.\n- Agar tarmoq bo'linmagan bo'lsa (`partitioned` false):\n  - `primaryHealthy` true bo'lsa, `'PRIMARY'` qaytarsin.\n  - `primaryHealthy` false va `replicaHealthy` true bo'lsa, `'REPLICA'` qaytarsin.\n  - Ikkalasi ham nosoz bo'lsa, xatolik (`Error('System Down')`) yuborsin.\n- Agar tarmoq bo'lingan bo'lsa (`partitioned` true):\n  - Agar `preferredStrategy` `'CP'` bo'lsa (Consistency ustun): faqat `primaryHealthy` true bo'lsagina `'PRIMARY'` qaytarsin, aks holda xatolik (`Error('Consistency Compromised')`) yuborsin (chunki replica eskirgan bo'lishi mumkin).\n  - Agar `preferredStrategy` `'AP'` bo'lsa (Availability ustun): birinchi navbatda `primaryHealthy` true bo'lsa `'PRIMARY'`, bo'lmasa `replicaHealthy` true bo'lsa `'REPLICA'` qaytarsin. Agar ikkisi ham nosoz bo'lsa, xatolik (`Error('System Down')`) yuborsin.",
    "startingCode": "function routeRequest(partitioned, preferredStrategy, primaryHealthy, replicaHealthy) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Avval partitioned holatini if orqali ajratib oling, keyin preferredStrategy qiymatini tekshiring va shunga mos ravishda healthy holatlarga ko'ra qiymat qaytaring.",
    "test": "const sandbox = new Function(code + '; return routeRequest;');\nconst fn = sandbox();\nif (fn(false, 'CP', true, true) !== 'PRIMARY') return 'Normal holatda primary-ga borishi kerak';\nif (fn(false, 'CP', false, true) !== 'REPLICA') return 'Normal holatda primary ishlamasa replica-ga borishi kerak';\ntry {\n  fn(true, 'CP', false, true);\n  return 'CP strategiyasida tarmoq uzilganda va primary o\\'chganda xato otishi kerak edi!';\n} catch (e) {\n  if (e.message !== 'Consistency Compromised') return 'Xatolik xabari to\\'g\\'ri emas!';\n}\nif (fn(true, 'AP', false, true) !== 'REPLICA') return 'AP strategiyasida primary o\\'chsa ham replica ishlayverishi kerak!';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "CAP teoremasi nima?",
    "options": [
      "Tarqoq tizimlarda Consistency, Availability va Partition Tolerance-ni bir vaqtda to'liq ta'minlash mumkinligini isbotlovchi teorema",
      "Tarqoq tizimlarda ma'lumotlar o'zgarishi va kechikishi o'rtasidagi bog'liqlik yo'qligini ko'rsatuvchi formula",
      "Tarqoq tizimlarda Consistency, Availability va Partition Tolerance-dan faqat ikkitasini bir vaqtda ta'minlash mumkinligini ko'rsatuvchi teorema",
      "Ma'lumotlar bazasining tezligini o'lchaydigan ko'rsatkich"
    ],
    "correctAnswer": 2,
    "explanation": "Eric Brewer teoremasiga ko'ra, tarqoq tizimlarda Consistency, Availability va Partition Tolerance xususiyatlaridan faqat ikkitasini bir vaqtda kafolatlash mumkin."
  },
  {
    "id": 2,
    "question": "Nima uchun real tarmoqlarda CA (Consistency + Availability) tizim bo'lishi mumkin emas?",
    "options": [
      "Chunki jismoniy tarmoqlarda uzilishlar (Partitions) yuz berishi muqarrar va buni chetlab o'tib bo'lmaydi",
      "Chunki dasturchilar bunga ruxsat bermaydi",
      "Chunki bunday tizimlar juda qimmat turadi",
      "CA tizimlar aslida mavjud, masalan Cassandra bunga misol"
    ],
    "correctAnswer": 0,
    "explanation": "Tarmoq uzilishi (P) jismoniy dunyoda muqarrar bo'lganligi sababli, har qanday tarqoq tizim P yuz berganda C va A o'rtasida tanlov qilishi shart. CA variant emas."
  },
  {
    "id": 3,
    "question": "PACELC teoremasidagi 'Else' (normal holat) nimani anglatadi?",
    "options": [
      "Tarmoq bo'lingan (Partition) holat",
      "Tarmoqda hech qanday uzilish bo'lmagan, normal ish rejimi",
      "Server butunlay o'chib qolgan holat",
      "Foydalanuvchilar soni keskin kamaygan holat"
    ],
    "correctAnswer": 1,
    "explanation": "PACELC teoremasida 'Else' (E harfi) tarmoq bo'linmagan, ya'ni hamma narsa normal ishlayotgan paytdagi holatni anglatadi."
  },
  {
    "id": 4,
    "question": "PACELC bo'yicha 'PA/EL' qanday ma'noni anglatadi?",
    "options": [
      "Bo'linishda Availability, normal holatda Latency tanlanadi",
      "Bo'linishda Consistency, normal holatda Latency tanlanadi",
      "Bo'linishda Availability, normal holatda Consistency tanlanadi",
      "Bo'linishda Consistency, normal holatda Consistency tanlanadi"
    ],
    "correctAnswer": 0,
    "explanation": "PACELC formulasi: If Partition (P) choose Availability (A), Else (E) choose Latency (L). Bu PA/EL dir."
  },
  {
    "id": 5,
    "question": "MongoDB PACELC tasnifiga ko'ra qaysi guruhga kiradi?",
    "options": [
      "PA/EL",
      "PC/EC",
      "PA/EC",
      "PC/EL"
    ],
    "correctAnswer": 1,
    "explanation": "MongoDB tarmoq bo'linganda ham (P), normal holatda ham (E) kuchli Consistency-ni (C) birinchi o'ringa qo'yadi. Shuning uchun u PC/EC tizimdir."
  },
  {
    "id": 6,
    "question": "Quorum formulasida W + R > N sharti nimani kafolatlaydi?",
    "options": [
      "Tizimning 100% mavjud (Available) bo'lishini",
      "O'qish so'rovi har doim eng oxirgi yozilgan to'g'ri qiymatni olishini (Strong Consistency)",
      "Tarmoq uzilishlari umuman sodir bo'lmasligini",
      "Ma'lumotlar bazasining avtomatik sharding bo'lishini"
    ],
    "correctAnswer": 1,
    "explanation": "W + R > N shartida o'qish va yozish to'plamlari kamida bitta umumiy replikada kesishadi, natijada o'qish har doim eng yangi yozilgan qiymatni oladi."
  },
  {
    "id": 7,
    "question": "N = 5, W = 3, R = 3 kvorum konfiguratsiyasi qanday consistency darajasini beradi?",
    "options": [
      "Eventual Consistency, chunki yozish va o'qish replikalari kesishmaydi",
      "Kuchli Consistency, chunki 3 + 3 = 6 > 5",
      "Hech qanday ma'lumot yozib bo'lmaydi, chunki N toq son",
      "Weak Consistency"
    ],
    "correctAnswer": 1,
    "explanation": "Chunki W + R = 6 bo'lib, u N (5) dan katta. Bu kuchli consistency (strong consistency) beradi."
  },
  {
    "id": 8,
    "question": "Cassandra ma'lumotlar bazasi PACELC bo'yicha qaysi guruhga kiradi?",
    "options": [
      "PC/EC",
      "PA/EL",
      "PC/EL",
      "PA/EC"
    ],
    "correctAnswer": 1,
    "explanation": "Cassandra asosan tarmoq bo'linganda Availability (A) va normal holatda Latency (L) uchun optimallashtirilgan, ya'ni PA/EL tizimdir."
  },
  {
    "id": 9,
    "question": "CAP-dagi Consistency (Muvofiqlik) nima degani?",
    "options": [
      "Ma'lumotlarning bazadagi constraint qoidalariga rioya etishi",
      "Har qanday o'qish so'rovida barcha replikalar darhol eng oxirgi yozilgan ma'lumotni ko'rishi (Linearizability)",
      "Serverning doimo 200 OK javobini qaytarishi",
      "Bazaning hech qachon o'chib qolmasligi"
    ],
    "correctAnswer": 1,
    "explanation": "CAP-dagi Consistency bu tarqoq tugunlar orasida barcha so'rovlar uchun bir xil va eng yangi ma'lumot ko'rinishi (Linearizability) demakdir."
  },
  {
    "id": 10,
    "question": "Spanner qanday qilib CP tizim bo'lishiga qaramay juda yuqori availability ko'rsatadi?",
    "options": [
      "U tarqoq tizim emas, bitta serverda ishlaydi",
      "U TrueTime API (GPS va atom soatlari) yordamida replikalararo vaqtni sinxronlab kechikishlarni minimal qiladi",
      "U o'qish operatsiyalarini umuman tekshirmaydi",
      "U tarmoq uzilishlarini (P) butunlay taqiqlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Google Spanner jismoniy atom soatlari va GPS yordamida butun dunyo bo'ylab kechikish va replikatsiya sinxronizatsiyasini shunchalik mukammal qilganki, amalda yuqori darajada available bo'lib ko'rinadi."
  },
  {
    "id": 11,
    "question": "Junior dasturchilarning CAP bo'yicha eng ko'p qiladigan xatosi nima?",
    "options": [
      "Tarqoq tizim dizaynida CA (Consistency + Availability) ni tanlash mumkin deb o'ylash",
      "Bazani index-larsiz ishlatish",
      "NoSQL bazalarni haddan taxation ko'p ishlatish",
      "REST o'rniga gRPC ishlatish"
    ],
    "correctAnswer": 0,
    "explanation": "Juniorlar ko'pincha tarmoq uzilishi (P) muqarrar ekanligini hisobga olmay, real tarqoq tizimda ham C, ham A ni bir vaqtda to'liq saqlab qolmoqchi bo'lishadi."
  },
  {
    "id": 12,
    "question": "Read Repair mexanizmi nima?",
    "options": [
      "Ma'lumot yozish jarayonida diskni formatlash",
      "O'qish so'rovi davomida aniqlangan eski ma'lumotni fon rejimida eng yangi ma'lumot bilan yangilab qo'yish",
      "O'qib bo'lmaydigan buzilgan fayllarni o'chirish",
      "Tizimni qayta yuklash (Reboot)"
    ],
    "correctAnswer": 1,
    "explanation": "Read Repair - o'qish paytida aniqlangan eski replika ma'lumotlarini fon rejimida yangi qiymat bilan avtomatik tuzatish mexanizmidir."
  }
]

};
