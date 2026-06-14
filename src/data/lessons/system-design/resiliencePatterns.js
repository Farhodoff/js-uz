export const resiliencePatterns = {
  id: "resiliencePatterns",
  title: "Resilience Patterns (Tizim Chidamliligi)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Tasavvur qiling, siz **restorandasiz** va taom buyurtma beryapsiz:
* **Oddiy tizim:** Siz ofitsiantga buyurtma berdingiz. Ofitsiant oshxonaga ketdi. Oshxonada oshpaz hushidan ketib yiqilgan (servis ishlamayapti). Ofitsiant oshpazning uyg'onishini soatlab kutib turaveradi. Natijada siz ham, boshqa mijozlar ham stol atrofida kutib qolasiz va butun restoran falaj bo'ladi.
* **Resilience (Chidamli) tizim:**
  * **Timeout:** Ofitsiant oshxonaga kirib, agar 5 daqiqada taom tayyor bo'lmasa, darhol qaytib keladi va mijozga "Kechirasiz, kutish muddati tugadi" deydi.
  * **Fallback:** Oshxona ishlamasa, ofitsiant sizga tayyor muzlatilgan pitsani (zaxira varianti) taklif qiladi.
  * **Circuit Breaker:** Agar ketma-ket 5 ta ofitsiant oshxonadan xafa bo'lib qaytsa, kirish eshigiga "Oshxona vaqtincha yopiq" degan belgi qo'yiladi. Keyingi mijozlar oshxonaga borib vaqt yo'qotmaydi, darhol rad javobi yoki zaxira menyusini olishadi.

Mikroxizmatlar (Microservices) va taqsimlangan tizimlarda bitta servisning sekinlashishi yoki buzilishi butun tizimning zanjirli qulashiga (**Cascading Failure**) olib kelishi mumkin. **Resilience Patterns** (Chidamlilik andozalari) aynan mana shunday vaziyatlarda tizimni himoya qilish uchun ishlatiladi.

---

## 2. 💻 Real Kod Misoli

Quyida **Circuit Breaker** (Avtomat O'chirgich) andozasining soddalashtirilgan Node.js realizatsiyasi keltirilgan:

\`\`\`javascript
class SimpleCircuitBreaker {
  constructor(requestFunction, failureThreshold = 3, cooldownMs = 5000) {
    this.requestFunction = requestFunction;
    this.failureThreshold = failureThreshold;
    this.cooldownMs = cooldownMs;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failures = 0;
    this.lastFailureTime = null;
  }

  async execute(...args) {
    // 1. OPEN holatida cooldown vaqtini tekshirish
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.cooldownMs) {
        this.state = 'HALF_OPEN';
        console.log('🔄 Circuit Breaker: HALF_OPEN holatiga o\\'tdi. Sinov so\\'rovi...');
      } else {
        throw new Error('❌ Circuit Breaker is OPEN. So\\'rov rad etildi.');
      }
    }

    try {
      const result = await this.requestFunction(...args);
      // Agar HALF_OPEN holatida muvaffaqiyatli bo'lsa, zanjirni yopamiz
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
        console.log('✅ Circuit Breaker: CLOSED holatiga qaytdi. Tizim tiklandi.');
      }
      return result;
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.state === 'CLOSED' && this.failures >= this.failureThreshold) {
        this.state = 'OPEN';
        console.log('🚨 Circuit Breaker: OPEN holatiga o\\'tdi! So\\'rovlar bloklandi.');
      } else if (this.state === 'HALF_OPEN') {
        this.state = 'OPEN';
        console.log('🚨 Circuit Breaker: Sinov so\\'rovi muvaffaqiyatsiz bo\\'ldi. Qayta OPEN holatiga o\\'tdi.');
      }
      throw error;
    }
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### A. Circuit Breaker Uchta Holati (States):
1. **CLOSED (Yopiq):** Barcha so'rovlar normal rejimda maqsadli servisga o'tkaziladi. Agar xatolar soni belgilangan **Failure Threshold** (Xatolar chegarasi)dan oshsa, zanjir **OPEN** holatiga o'tadi.
2. **OPEN (Ochiq):** So'rovlar maqsadli servisga yuborilmaydi, darhol xatolik yoki **Fallback** (zaxira javobi) qaytariladi. Bu maqsadli servisga o'zini tiklab olish uchun vaqt beradi.
3. **HALF_OPEN (Yarim Ochiq):** Cooldown (sovush) davri tugagach, tizim sinov so'rovini yuboradi. Agar u muvaffaqiyatli bo'lsa, holat **CLOSED** ga qaytadi. Agar xato bersa, zanjir yana **OPEN** holatiga qaytadi.

### B. Retry Storm va Exponential Backoff with Jitter:
* **Retry Storm (Qayta urinishlar bo'roni):** Agar servisda muammo yuzaga kelsa va yuzlab mijozlar bir vaqtda doimiy sekundlarda (masalan, har 1 soniyada) qayta so'rov yuborsa, bu servisning qayta uyg'onishiga mutlaqo yo'l qo'ymaydi (**Thundering Herd** muammosi).
* **Exponential Backoff:** Har bir urinish oralig'ini eksponentsial ravishda oshirish (1s, 2s, 4s, 8s, 16s...).
* **Jitter (Tasodifiylik):** Eksponentsial kechikishga tasodifiy millisekundlar qo'shish. Bu so'rovlarni vaqt bo'yicha tarqatib yuboradi va yuklamani tekislaydi.

### C. Bulkhead Pattern (Resurslarni ajratish):
* Kema korpusidagi bo'limlar (bulkheads) kabi, tizim resurslarini ham alohida-alohida guruhlarga (Thread Pool yoki Semaphore) ajratish. Masalan, to'lov xizmati sekinlashsa, u faqat o'ziga ajratilgan 10 ta threadni band qiladi va mahsulotlar katalogini ko'rish uchun ajratilgan 100 ta threadga daxl qilmaydi.

### D. Rate Limiting Algoritmlari:
1. **Token Bucket:** Savatda cheklangan miqdorda tokenlar bo'ladi. Har bir so'rov 1 ta token yeydi. Tokenlar ma'lum bir tezlikda (refill rate) to'lib boradi. Keskin yuklamalarni (bursts of traffic) o'tkaza oladi.
2. **Leaky Bucket:** So'rovlar bir xil o'zgarmas tezlikda oqib chiqadi. Agar paqir (navbat) to'lsa, yangi so'rovlar tashlab yuboriladi. Trafikni silliqlash (smooth traffic) uchun eng yaxshi yechim.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

1. **Jittersiz Retry qo'llash:** Bu tizimda sun'iy yuklanish to'lqinlarini keltirib chiqaradi va serverlarni butunlay yiqitadi.
2. **Timeout qiymatlarini haddan tashqari katta qo'yish:** Masalan, HTTP so'rov uchun 30 soniyalik timeout. Bu vaqt ichida foydalanuvchi sahifani tark etadi va serverning barcha ulanish kanallari (sockets) band bo'lib qoladi.
3. **Fallback ichida ham og'ir tarmoq so'rovini bajarish:** Zaxira rejasi har doim ishonchli, keshdan olingan yoki lokal statik ma'lumot bo'lishi kerak. Zaxira rejasi ham xato bersa, resilience andozalari foydasiz bo'ladi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Circuit Breaker-ning HALF_OPEN holati nimaga kerak?**
Tizim o'ziga kelganini tekshirish uchun bitta sinov so'rovini yuborish va zanjirni xavfsiz tarzda yana CLOSED holatiga qaytarish uchun.

**2. Thundering Herd muammosi nima va u qanday hal qilinadi?**
Ko'plab mijozlarning bir vaqtning o'zida bitta resursga yopishishi. Exponential Backoff va Jitter yordamida so'rov vaqtlari tasodifiy taqsimlanib hal qilinadi.

**3. Bulkhead naqshida thread pool va semaphore farqi nimada?**
Thread Pool alohida xotira va asinxron bajarilishni izolyatsiya qiladi. Semaphore esa faqat faol parallel so'rovlar sonini cheklaydi, yangi thread ochmaydi.

**4. Token Bucket va Leaky Bucket farqi nimada?**
Token Bucket qisqa muddatli katta yuklanishlarni (bursts) o'tkazadi, Leaky Bucket esa chiqish tezligini qat'iy va bir xil ushlab turadi.

**5. Cascading Failure qanday yuz beradi?**
Zanjirdagi bitta quyi servis sekinlashsa, unga bog'liq bo'lgan barcha yuqori servislarning resurslari band bo'lib, zanjir bo'ylab hamma narsa birin-ketin o'chadi.

**6. Circuit Breaker-da Sliding Window nima?**
So'rovlar xatoligini oxirgi N soniya (Time-based) yoki oxirgi N ta so'rovlar (Count-based) ichida hisoblash oynasi.

**7. Nima uchun Nginx-da rate limit ko'pincha Leaky Bucket-ga asoslanadi?**
Chunki veb-serverlar trafikni silliq taqsimlashni va spam so'rovlarni doimiy o'zgarmas oqim bilan cheklashni afzal ko'rishadi.

**8. Resilience4j va Netflix Hystrix o'rtasidagi farq nima?**
Hystrix eski va endi qo'llab-quvvatlanmaydi, u har bir servis uchun alohida thread pool talab qiladi. Resilience4j esa yengil, Java 8 lambda va funksional dasturlashga moslangan.

**9. Service Mesh (Envoy sidecar) resilience naqshlarini qanday yengillashtiradi?**
Dasturchi o'z kodida timeout yoki retry mantiqini yozishi shart emas; Envoy proxy barcha tarmoq darajasidagi chidamlilikni o'ziga oladi.

**10. Retry qilish xavfsiz bo'lgan operatsiyalar qanday ataladi?**
Idempotent operatsiyalar (masalan, GET, PUT). Non-idempotent (masalan, POST to'lov) operatsiyalarni jittersiz retry qilish pulni iki marta yechib olinishiga sabab bo'lishi mumkin.

**11. Fallback silent degradation nima?**
Tizim nosoz bo'lganda, foydalanuvchiga xato ko'rsatmasdan, uning o'rniga ba'zi ikkinchi darajali funksiyalarni vaqtinchalik o'chirib turish (masalan, tavsiyalar blokini yashirish).

**12. Nima uchun timeout har doim retry-dan oldin bajarilishi kerak?**
Chunki agar timeout bo'lmasa, so'rov abadiy osilib qolishi va qayta urinish (retry) hech qachon ishga tushmasligi mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar quyida exercises bo'limida berilgan. Ularni muvaffaqiyatli bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Netflix API Gateway va Hystrix integratsiyasi
Netflix o'zining mikroxizmatlar arxitekturasida har bir foydalanuvchi sahifasini shakllantirish uchun o'nlab quyi servislarga (User, Movie Details, Subtitles, Recommendations) murojaat qiladi. Recommendations xizmati ishlamay qolganda, tizim butun sahifani buzib ko'rsatmasdan, Hystrix orqali Recommendations bloki uchun zaxira (Fallback) sifatida umumiy "Top 10 mashhur kinolar" ro'yxatini qaytaradi. Bu foydalanuvchiga sezilarsiz nosozlik (graceful degradation) taqdim etadi.

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
stateDiagram-v2
    [*] --> CLOSED : Normal holat
    CLOSED --> OPEN : Xatolar soni >= Limit (Failure Threshold)
    OPEN --> HALF_OPEN : Cooldown Period o'tdi
    HALF_OPEN --> CLOSED : Sinov so'rovi MUVAFFAQIYATLI
    HALF_OPEN --> OPEN : Sinov so'rovi XATO
\`\`\`

---

## 10. 📌 Cheat Sheet

| Andoza | Maqsadi | Qo'llaniladigan holat |
| :--- | :--- | :--- |
| **Timeout** | Resurslarni bo'shatish | Tashqi so'rovlar cheksiz osilib qolishini oldini olish |
| **Retry + Jitter** | Vaqtinchalik xatolarni yengish | Tarmoq qisqa vaqtga uzilib qayta ulanganda |
| **Circuit Breaker** | Tizimni yuklamadan asrash | Quyi servis butunlay ishdan chiqqanda |
| **Bulkhead** | Muammoni izolyatsiya qilish | Bitta og'ir servis boshqalarini bloklab qo'ymasligi uchun |
| **Fallback** | Foydalanuvchi tajribasini saqlash | Xatolik o'rniga zaxira javob ko'rsatish |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Timeout Chegarasi (Timeout Wrapper)",
      instruction: "Tashqi servis sekin ishlaganda so'rovni to'xtatish uchun `withTimeout(promise, ms)` funksiyasini yozing. Agar berilgan `promise` belgilangan `ms` ichida yakunlanmasa, funksiya `'Timeout Error'` matnli xato (Error) bilan rad etilishi (reject) lozim. Vaqtida yakunlansa, natijani qaytarsin.",
      startingCode: "function withTimeout(promise, ms) {\n  // Kodni shu yerda yozing\n}",
      hint: "Promise.race va setTimeout yordamida bajaring. setTimeout id-sini tozalashni unutmang.",
      test: "if (typeof withTimeout !== 'function') return 'withTimeout funksiya bo\\'lishi kerak';\nconst fast = new Promise(res => setTimeout(() => res('ok'), 10));\nconst slow = new Promise(res => setTimeout(() => res('slow'), 50));\ntry {\n  const r1 = await withTimeout(fast, 30);\n  if (r1 !== 'ok') return 'Tezkor promise noto\\'g\\'ri ishladi';\n} catch(e) {\n  return 'Tezkor promise timeout berdi: ' + e.message;\n}\ntry {\n  await withTimeout(slow, 20);\n  return 'Sekin promise timeout bermadi';\n} catch(e) {\n  if (e.message !== 'Timeout Error') return 'Xatolik xabari \"Timeout Error\" bo\\'lishi kerak';\n}\nreturn null;"
    },
    {
      id: 2,
      title: "2️⃣ Zaxira Rejasi (Fallback Handler)",
      instruction: "Xatoliklarni silliq hal qilish uchun `withFallback(fn, fallback)` asinxron funksiyasini yozing. U `fn` (sinxron yoki asinxron) funksiyasini vaqtinchalik xavfsiz bajaradi. Agar xato yuz bersa, `fallback` qiymatini (yoki agar u funksiya bo'lsa, uning chaqirilgan natijasini) qaytarsin.",
      startingCode: "async function withFallback(fn, fallback) {\n  // Kodni shu yerda yozing\n}",
      hint: "try/catch blokidan foydalaning. fallback turi 'function' bo'lsa uni chaqiring, aks holda qiymatni o'zini qaytaring.",
      test: "if (typeof withFallback !== 'function') return 'withFallback funksiya bo\\'lishi kerak';\nconst okFn = async () => 'hello';\nconst errFn = async () => { throw new Error('fail'); };\nconst r1 = await withFallback(okFn, 'default');\nif (r1 !== 'hello') return 'Muvaffaqiyatli chaqiruv xato qaytardi';\nconst r2 = await withFallback(errFn, 'default');\nif (r2 !== 'default') return 'Zaxira qiymati qaytmadi';\nconst r3 = await withFallback(errFn, () => 'fallbackFn');\nif (r3 !== 'fallbackFn') return 'Zaxira funksiyasi chaqirilmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Exponential Backoff va Jitter",
      instruction: "Retry storm oldini olish uchun kechikish vaqtini hisoblaydigan `calculateDelay(attempt, baseDelay, maxDelay)` funksiyasini yozing. \nKechikish formulasi: `tempDelay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt - 1))`. \nYakuniy kechikish `0` va `tempDelay` (inklyuziv) oralig'idagi tasodifiy (random) son bo'lishi kerak. `attempt` 1 dan boshlanadi.",
      startingCode: "function calculateDelay(attempt, baseDelay, maxDelay) {\n  // Kodni shu yerda yozing\n}",
      hint: "Math.pow va Math.random dan foydalaning.",
      test: "if (typeof calculateDelay !== 'function') return 'calculateDelay topilmadi';\nconst d1 = calculateDelay(1, 100, 1000);\nif (d1 < 0 || d1 > 100) return 'Jitter cheklovidan chiqib ketdi (attempt=1)';\nconst d2 = calculateDelay(3, 100, 1000);\nif (d2 < 0 || d2 > 400) return 'Jitter cheklovidan chiqib ketdi (attempt=3)';\nlet nonZero = false;\nfor(let i=0; i<20; i++) {\n  if(calculateDelay(2, 100, 1000) > 0) nonZero = true;\n}\nif(!nonZero) return 'Random jitter ishlamayapti';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ Token Bucket Rate Limiter",
      instruction: "Token Bucket algoritmini amalga oshiruvchi `TokenBucket` klassini yozing. Konstruktor `capacity` (maksimal tokenlar) va `refillRate` (soniyasiga tiklanadigan tokenlar soni)ni qabul qiladi. \nMetod `tryConsume(tokens)`: \n1. Oxirgi tekshiruvdan o'tgan vaqt hisobiga yangi tokenlarni hisoblab qo'shing (lekin `capacity`dan oshmasin).\n2. Agar tokenlar yetarli bo'lsa, ularni kamaytirib `true` qaytarsin, aks holda `false` bo'lsin.",
      startingCode: "class TokenBucket {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.refillRate = refillRate;\n    this.tokens = capacity;\n    this.lastRefill = Date.now();\n  }\n\n  tryConsume(tokens = 1) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "elapsedSeconds = (Date.now() - this.lastRefill) / 1000. newTokens = elapsedSeconds * refillRate. lastRefill ni yangilashni unutmang.",
      test: "if (typeof TokenBucket !== 'function') return 'TokenBucket klass emas';\nconst bucket = new TokenBucket(10, 2);\nif (!bucket.tryConsume(5)) return '5 ta tokenni olish imkoni bo\\'lishi kerak';\nif (bucket.tryConsume(10)) return 'Maksimal sig\\'imdan ko\\'p olinmasligi kerak';\nbucket.tokens = 0;\nbucket.lastRefill = Date.now() - 2000;\nif (!bucket.tryConsume(4)) return '2 soniyada tiklangan tokenlar bilan 4 ta token olinishi kerak edi';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ Leaky Bucket Simulator",
      instruction: "Trafikni silliqlash uchun `LeakyBucket` klassini yozing. Konstruktor `capacity` (sig'im) va `leakRate` (soniyasiga oqib chiqadigan suv/so'rov miqdori) qabul qiladi. \nMetod `addRequest()`: \n1. Vaqt o'tishi bilan oqib ketgan suvni hisoblab `water` darajasini kamaytiring (kamida 0 gacha).\n2. Agar `water + 1 <= capacity` bo'lsa, `water`ga 1 qo'shib `true` qaytaring (so'rov qabul qilindi), aks holda `false` (drop).",
      startingCode: "class LeakyBucket {\n  constructor(capacity, leakRate) {\n    this.capacity = capacity;\n    this.leakRate = leakRate;\n    this.water = 0;\n    this.lastLeak = Date.now();\n  }\n\n  addRequest() {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "elapsedSeconds = (Date.now() - this.lastLeak) / 1000. water = Math.max(0, water - elapsedSeconds * leakRate).",
      test: "if (typeof LeakyBucket !== 'function') return 'LeakyBucket topilmadi';\nconst bucket = new LeakyBucket(3, 1);\nif (!bucket.addRequest()) return '1-so\\'rov o\\'tishi kerak';\nif (!bucket.addRequest()) return '2-so\\'rov o\\'tishi kerak';\nif (!bucket.addRequest()) return '3-so\\'rov o\\'tishi kerak';\nif (bucket.addRequest()) return '4-so\\'rov rad etilishi kerak';\nbucket.lastLeak = Date.now() - 2000;\nif (!bucket.addRequest()) return '2 soniyadan keyin bo\\'shagan paqirga so\\'rov qo\\'shilishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Bulkhead (Resource Isolation)",
      instruction: "Bir vaqtning o'zida parallel bajariladigan so'rovlar sonini cheklaydigan `Bulkhead` klassini yarating. Konstruktor `maxConcurrent`ni oladi. \nMetod `execute(fn)`: \n1. Agar faol parallel so'rovlar soni (`activeCount`) limitdan oshsa, darhol `new Error('Bulkhead Full')` xatoligini tashlasin. \n2. Aks holda `activeCount`ni oshirib funksiyani bajarsin va tugagach kamaytirsin.",
      startingCode: "class Bulkhead {\n  constructor(maxConcurrent) {\n    this.maxConcurrent = maxConcurrent;\n    this.activeCount = 0;\n  }\n\n  async execute(fn) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "try/finally dan foydalaning, shunda activeCount har doim kamayishi kafolatlanadi.",
      test: "if (typeof Bulkhead !== 'function') return 'Bulkhead topilmadi';\nconst bulkhead = new Bulkhead(2);\nconst task = () => new Promise(res => setTimeout(() => res('ok'), 20));\nconst p1 = bulkhead.execute(task);\nconst p2 = bulkhead.execute(task);\ntry {\n  await bulkhead.execute(task);\n  return 'Uchinchi vazifa rad etilmadi';\n} catch(e) {\n  if (e.message !== 'Bulkhead Full') return 'Xato \"Bulkhead Full\" bo\\'lishi kerak';\n}\nawait Promise.all([p1, p2]);\nif (bulkhead.activeCount !== 0) return 'activeCount kamaymadi';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Circuit Breaker Davlat Mashinasi",
      instruction: "Circuit Breaker andozasini yozing. Konstruktor `failureThreshold` va `cooldownPeriod` (ms) qabul qiladi. \nQoidalar:\n1. Agar holat `'OPEN'` bo'lsa va `cooldownPeriod` o'tgan bo'lsa, holatni `'HALF_OPEN'`ga o'tkazing.\n2. Agar holat `'OPEN'` bo'lsa va cooldown o'tmagan bo'lsa, `new Error('Circuit Open')` xatosini tashlang.\n3. Funksiyani bajaring. Muvaffaqiyatli bo'lsa, holat `'HALF_OPEN'` bo'lgan bo'lsa, uni `'CLOSED'`ga o'tkazing va `failures`ni 0 qiling.\n4. Xatolik bo'lsa, `failures`ni oshiring va `lastStateChange`ni yangilang. Agar holat `'CLOSED'` bo'lib, `failures >= failureThreshold` bo'lsa yoki holat `'HALF_OPEN'` bo'lsa, holatni `'OPEN'`ga o'tkazing, keyin xatoni qayta tashlang (throw).",
      startingCode: "class CircuitBreaker {\n  constructor(failureThreshold, cooldownPeriod) {\n    this.failureThreshold = failureThreshold;\n    this.cooldownPeriod = cooldownPeriod;\n    this.state = 'CLOSED';\n    this.failures = 0;\n    this.lastStateChange = Date.now();\n  }\n\n  async execute(fn) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Holat o'tishlariga va xatolarni catch qilib qayta throw qilishga e'tibor bering.",
      test: "if (typeof CircuitBreaker !== 'function') return 'CircuitBreaker topilmadi';\nconst cb = new CircuitBreaker(2, 50);\nconst okTask = async () => 'ok';\nconst failTask = async () => { throw new Error('fail'); };\nawait cb.execute(okTask);\ntry { await cb.execute(failTask); } catch(e) {}\ntry { await cb.execute(failTask); } catch(e) {}\nif (cb.state !== 'OPEN') return 'Holat OPEN bo\\'lishi kerak edi';\ntry {\n  await cb.execute(okTask);\n  return 'OPEN holatida cheklanmadi';\n} catch(e) {\n  if (e.message !== 'Circuit Open') return 'Xato \"Circuit Open\" bo\\'lishi kerak';\n}\nawait new Promise(res => setTimeout(res, 60));\ntry {\n  await cb.execute(okTask);\n  if (cb.state !== 'CLOSED') return 'HALF_OPEN dan CLOSED ga o\\'tmadi';\n} catch(e) {\n  return 'Cooldown dan keyin o\\'tmadi: ' + e.message;\n}\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ Saturation & Cascading Failure Simulyatori",
      instruction: "Sekin ishlaydigan servislar qanday qilib butun resursni egallashini simulyatsiya qiling. `workerPool` obyekti berilgan. `simulateRequest(serviceName, requestPromise)` funksiyasini yozing. \nAgar `activeWorkers >= maxWorkers` bo'lsa, darhol `new Error('Thread Saturation Error')` tashlang. \nAks holda `activeWorkers`ni 1 ga oshiring va so'rovni bajaring. So'rov yakunlangach (muvaffaqiyatli yoki xatolik bilan) `activeWorkers`ni kamaytiring.",
      startingCode: "const workerPool = {\n  maxWorkers: 5,\n  activeWorkers: 0\n};\n\nasync function simulateRequest(serviceName, requestPromise) {\n  // Kodni shu yerda yozing\n}",
      hint: "try/finally dan foydalaning, activeWorkers ni to'g'ri boshqaring.",
      test: "if (typeof simulateRequest !== 'function') return 'simulateRequest topilmadi';\nworkerPool.activeWorkers = 0;\nconst pList = [];\nfor(let i=0; i<5; i++) {\n  pList.push(simulateRequest('SlowService', new Promise(res => setTimeout(() => res('slow'), 30))));\n}\ntry {\n  await simulateRequest('FastService', Promise.resolve('fast'));\n  return 'Saturatsiya tekshirilmadi';\n} catch(e) {\n  if(e.message !== 'Thread Saturation Error') return 'Xato xabari mos emas';\n}\nawait Promise.all(pList);\nif(workerPool.activeWorkers !== 0) return 'activeWorkers 0 bo\\'lishi kerak edi';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ Retry Storm Prevention (Retry with Backoff)",
      instruction: "Xatolik bergan funksiyani exponential backoff va jitter bilan qayta chaqiruvchi `retryWithBackoff(fn, maxAttempts, baseDelay, maxDelay)` funksiyasini yozing. Har bir urinishda kechikish vaqti kechiktiriladi. Agar oxirgi urinish ham xato bersa, eng oxirgi xatolikni tashlang (throw). Urinishlar orasidagi kutish uchun asinxron sleep helperidan foydalaning.",
      startingCode: "async function retryWithBackoff(fn, maxAttempts, baseDelay, maxDelay) {\n  // Kodni shu yerda yozing\n}",
      hint: "Har bir urinishdan keyin kechikishni calculateDelay (yoki o'zingiz yozgan mantiq) bo'yicha hisoblab, await new Promise(r => setTimeout(r, delay)) qiling.",
      test: "if (typeof retryWithBackoff !== 'function') return 'retryWithBackoff topilmadi';\nlet calls = 0;\nconst failTwice = async () => {\n  calls++;\n  if(calls < 3) throw new Error('temp-error');\n  return 'ok';\n};\nconst r = await retryWithBackoff(failTwice, 3, 5, 20);\nif(r !== 'ok') return 'Muvaffaqiyatli qiymat qaytmadi';\nif(calls !== 3) return 'Urinishlar soni xato';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Resilience Pipeline Builder",
      instruction: "Himoya qatlamlarini birlashtiruvchi `ResiliencePipeline` klassini yozing. U quyidagi metodlarga ega:\n- `addTimeout(ms)`: timeout vaqtini saqlaydi.\n- `addCircuitBreaker(cb)`: Circuit Breaker obyektini saqlaydi.\n- `addRetry(maxAttempts, baseDelay, maxDelay)`: Retry parametrlarini saqlaydi.\n- `execute(fn)`: Funksiyani circuit breaker, retry va timeout himoyalari ostida bajaradi. Har bir retry urinishi belgilangan timeout bilan cheklangan bo'lishi kerak. Agar ballar urinishlar tugab xato bersa, u circuit breaker tomonidan qayd etilishi va tashqariga otilishi kerak.",
      startingCode: "class ResiliencePipeline {\n  constructor() {\n    this.timeoutMs = null;\n    this.cb = null;\n    this.retryParams = null;\n  }\n\n  addTimeout(ms) {\n    this.timeoutMs = ms;\n    return this;\n  }\n\n  addCircuitBreaker(cb) {\n    this.cb = cb;\n    return this;\n  }\n\n  addRetry(maxAttempts, baseDelay, maxDelay) {\n    this.retryParams = { maxAttempts, baseDelay, maxDelay };\n    return this;\n  }\n\n  async execute(fn) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Avvalgi topshiriqlardagi withTimeout va retry logikalaridan foydalaning. cb.execute() ichida butun retry va timeout zanjirini o'rang.",
      test: "if (typeof ResiliencePipeline !== 'function') return 'ResiliencePipeline topilmadi';\nconst cb = new CircuitBreaker(2, 100);\nconst pipeline = new ResiliencePipeline()\n  .addTimeout(15)\n  .addCircuitBreaker(cb)\n  .addRetry(2, 5, 10);\n\nlet calls = 0;\nconst slowTask = async () => {\n  calls++;\n  await new Promise(r => setTimeout(r, 30));\n  return 'ok';\n};\n\ntry {\n  await pipeline.execute(slowTask);\n  return 'Timeout xatosi yuz berishi kerak edi';\n} catch(e) {\n  // kutilgan xato\n}\nif(calls !== 2) return 'Retry urinishlari bajarilmadi';\nif(cb.state !== 'OPEN') return 'Circuit breaker ochilmadi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 0,
      question: "Circuit Breaker qaysi holatda barcha so'rovlarni maqsadli servisga yuboradi?",
      options: [
        "CLOSED",
        "OPEN",
        "HALF_OPEN",
        "DISABLED"
      ],
      correctAnswer: 0,
      explanation: "CLOSED (yopiq) holatida zanjir butun bo'ladi va barcha so'rovlar normal rejimda maqsadli servisga uzatiladi."
    },
    {
      id: 1,
      question: "Retry Storm nima?",
      options: [
        "Ma'lumotlar bazasiga noto'g'ri yozilgan SQL so'rovi",
        "Tizim nosoz bo'lganda ko'plab mijozlarning bir vaqtda qayta-qayta so'rov yuborib, serverni batamom yiqitishi",
        "Dasturdagi cheksiz rekursiya xatoligi",
        "Foydalanuvchining ko'plab brauzer oynalarini ochishi"
      ],
      correctAnswer: 1,
      explanation: "Agar barcha mijozlar parallel ravishda tez-tez qayta urinishlarni amalga oshirsa, bu serverni og'ir yuklama ostida qoldirib, uning tiklanishiga yo'l qo'ymaydi."
    },
    {
      id: 2,
      question: "Exponential Backoff-da 'Jitter'ning asosiy vazifasi nima?",
      options: [
        "So'rov tezligini oshirish",
        "Kechikish vaqtiga tasodifiylik qo'shish orqali so'rovlar oqimini tarqatib yuborish va Thundering Herd muammosining oldini olish",
        "Xatoliklarni butunlay o'chirib yuborish",
        "Xotira sarfini kamaytirish"
      ],
      correctAnswer: 1,
      explanation: "Jitter kechikishlarga random millisekundlar qo'shadi, natijada barcha mijozlar bir xil sekundda emas, har xil tasodifiy millisekundlarda murojaat qiladi."
    },
    {
      id: 3,
      question: "Bulkhead andozasining (Pattern) asosiy g'oyasi nima?",
      options: [
        "Trafikni silliqlash",
        "Bitta komponent nosozligi butun tizim resurslarini band qilib, boshqa komponentlarni yiqitmasligi uchun resurslarni (thread/semaphore) izolyatsiya qilish",
        "Xatolik yuz berganda zaxira ma'lumotlarini qaytarish",
        "Tarmoq so'rovlarini keshga yozish"
      ],
      correctAnswer: 1,
      explanation: "Bulkhead kemaning bo'limlari kabi resurslarni bo'lib tashlaydi. Bitta bo'lim cho'ksa (servis buzilsa), qolgan bo'limlar (boshqa servislar) ishlashda davom etadi."
    },
    {
      id: 4,
      question: "Token Bucket algoritmi qaysi xususiyati bilan Leaky Bucket-dan farq qiladi?",
      options: [
        "U so'rovlarni doimiy o'zgarmas tezlikda qayta ishlaydi",
        "U qisqa vaqt ichidagi keskin yuklamalarni (bursty traffic) o'tkaza oladi",
        "U faqat tranzaksiyalarni himoya qiladi",
        "U hech qachon tokenlarni tiklamaydi"
      ],
      correctAnswer: 1,
      explanation: "Token Bucket-da yig'ilib qolgan tokenlar evaziga bir vaqtning o'zida ko'p so'rovlar (burst) o'tishi mumkin, Leaky Bucket esa har doim qat'iy tekis tezlikda o'tkazadi."
    },
    {
      id: 5,
      question: "Foydalanuvchi HTTP so'rovi uchun timeout vaqtini belgilashda qaysi jihat eng muhim?",
      options: [
        "Timeout doim maksimal darajada katta (masalan, 60s) bo'lek bo'lishi kerak",
        "Timeout foydalanuvchining o'rtacha sabr-toqati va server resurslarini tezroq bo'shatish zaruriyatiga mos belgilanishi kerak",
        "Timeout faqat server xotirasi to'lganda ishlaydi",
        "Timeout faqat GET so'rovlar uchun qo'llaniladi"
      ],
      correctAnswer: 1,
      explanation: "Haddan tashqari katta timeout server ulanishlarini band qilib, tizim saturalishiga (saturation) olib keladi."
    },
    {
      id: 6,
      question: "Circuit Breaker qaysi holatda faqat bitta sinov so'rovini quyi servisga yuboradi?",
      options: [
        "CLOSED",
        "OPEN",
        "HALF_OPEN",
        "RESTORED"
      ],
      correctAnswer: 2,
      explanation: "HALF_OPEN holatida avtomat o'chirgich quyi servis o'ziga kelganini tekshirish uchun faqat bitta (yoki cheklangan) sinov so'rovini yuboradi."
    },
    {
      id: 7,
      question: "Silent Degradation (yoki Graceful Degradation) nima?",
      options: [
        "Dastur xato berib to'xtab qolganda foydalanuvchiga qora ekran ko'rsatish",
        "Ikkinchi darajali servis buzilganda, sahifani butunlay yopmasdan, faqat o'sha qismni yashirish yoki zaxira ma'lumot ko'rsatish",
        "Baza ma'lumotlarini o'chirib yuborish",
        "Tarmoq kechikishlarini sun'iy ravishda oshirish"
      ],
      correctAnswer: 1,
      explanation: "Graceful Degradation tizim qisman buzilganda ham foydalanuvchiga minimal darajadagi xizmat ko'rsatishni saqlab qolishni anglatadi."
    },
    {
      id: 8,
      question: "Nima uchun tranzaksiyali POST so'rovlarini (masalan, to'lov qilish) jittersiz yoki umuman nazoratsiz retry qilish xavfli?",
      options: [
        "Server keshini tozalab yuboradi",
        "Foydalanuvchining hisobidan pul ikki marta yechib olinishiga (non-idempotency sababli) olib kelishi mumkin",
        "Faqat ma'lumotlar bazasi indekslarini buzadi",
        "Bu xavfli emas, har doim retry qilish tavsiya etiladi"
      ],
      correctAnswer: 1,
      explanation: "POST so'rovlar odatda idempotent emas. Ulanish uzilib retry qilinganda, birinchi so'rov serverga yetib borgan bo'lishi mumkin va takroriy so'rov ikkinchi to'lovni amalga oshiradi."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri real hayotdagi Envoy proxy sidecar vazifasiga kiradi?",
      options: [
        "SQL jadvallarini loyihalash",
        "Dastur kodi darajasida o'zgartirish kiritmasdan, tarmoq trafigida timeout, retry va circuit breaker andozalarini boshqarish",
        "Foydalanuvchi interfeysini render qilish",
        "Faqat JavaScript kodini siqish (minify)"
      ],
      correctAnswer: 1,
      explanation: "Envoy sidecar sifatida tarmoq trafigini to'liq boshqaradi va dastur kodidan resilience mantiqlarini alohida infratuzilma qatlamiga ajratadi."
    },
    {
      id: 10,
      question: "Nginx rate limit sozlamalarida ishlatiladigan 'burst' parametri nima uchun xizmat qiladi?",
      options: [
        "So'rovlarni tezroq rad etish uchun",
        "Belgilangan me'yordan (rate) oshgan so'rovlarni darhol tashlab yubormasdan, navbatda (buffer) vaqtinchalik saqlab turish uchun",
        "Nginx serverini o'chirib yoqish uchun",
        "Kesh xotirasini kengaytirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Burst parametri Leaky Bucket-dagi paqir sig'imiga to'g'ri keladi va u me'yordan oshgan so'rovlarni navbatda ushlab turish imkonini beradi."
    },
    {
      id: 11,
      question: "Circuit Breaker andozasida 'Failure Rate' qanday hisoblanadi?",
      options: [
        "Faqat tizimdagi umumiy foydalanuvchilar soniga qarab",
        "Sliding Window (sirpanuvchi oyna) ichidagi muvaffaqiyatsiz so'rovlarning umumiy so'rovlarga nisbati foizida",
        "Baza hajmining kamayish foizida",
        "Server protsessori yuklanish darajasiga qarab"
      ],
      correctAnswer: 1,
      explanation: "Failure Rate o'tgan ma'lum vaqt oynasi yoki ma'lum miqdordagi so'rovlar ichidagi xatolar nisbati (foizi) hisoblanadi."
    }
  ]
};
