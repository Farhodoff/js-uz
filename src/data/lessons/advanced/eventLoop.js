export const eventLoopLesson = {
  id: "event-loop",
  title: "Event Loop: JavaScript Qanday Ishlaydi?",
  level: "Murakkab",
  description: "Call Stack, Web APIs, Callback Queue, Microtasks, Macrotasks, va Event Loop mexanizmi.",
  theory: `## 1. NEGA kerak?

JavaScript **single-threaded** til, ya'ni u bir vaqtning o'zida faqat bitta ishni bajara oladi. Lekin biz saytlarda bir vaqtning o'zida ham ma'lumot yuklanishini, ham animatsiyalar ishlashini, ham shuning bilan borada boshqa kodlarni o'qishini ko'ramiz.

**Muammo:**
- Server'dan ma'lumot olish 5 soniya davom etadi
- Agar JS "kutib tursa", butun sayt 5 soniyaga **qotib qoladi** (bloklanadi)

**Event Loop yechimi:** JS og'ir ishlarni "fondagi ishchilar"ga (Web APIs) topshiradi va o'zi navbatdagi kodni o'qishda davom etadi.

## 2. SODDALIK (Analogiya)

**Restorandagi ofitsiant va oshxonani tasavvur qiling:**

1. **Ofitsiant (Call Stack):** Buyurtmalarni oladi va oshxonaga uzatadi
2. **Oshxona (Web APIs):** Ovqatni tayyorlaydi (5-10 daqiqa)
3. **Tayyor taomlar stoli (Callback Queue):** Tayyor ovqatlar ofitsiant bo'shashini kutadi
4. **Event Loop:** Har doim ofitsiantga qarab turadi. Agar u bo'sh bo'lsa, stoldagi ovqatni mijozga olib boradi

## 3. STRUKTURA

### A. Call Stack - Ishlayotgan Kod
Hozir bajarilayotgan funksiyalar navbati. LIFO (Last In, First Out) tartibida ishlaydi.

### B. Web APIs
setTimeout, fetch, DOM events kabi asinxron operatsiyalar brauzer xotirasida bajariladi.

### C. Microtask Queue (Yuqori ustuvor)
Promises (.then, .catch, .finally) va async/await callback'lari bu yerga tushadi.

### D. Macrotask Queue (Past ustuvor)
setTimeout va setInterval callback'lari bu yerga tushadi.

**Eng Muhim:** Event Loop har macrotask'dan keyin barcha microtask'larni bajarib tugataguncha kutadi!

## 4. SAVOLLAR VA JAVOBLAR

**1. JavaScript necha oqimli (threaded) til?**
Single-threaded. Faqat bitta kod bir vaqtda bajariladi.


**2. Call Stack nima?**
Hozir bajarilayotgan funksiyalar navbati. LIFO tartibida ishlaydi.


**3. Web APIs nima vazifani bajaradi?**
Asinxron operatsiyalarni brauzerda fonda bajaradi.


**4. Event Loop'ning asosiy vazifasi nima?**
Call Stack bo'sh bo'lsa, Queue'dagi callback'larni Call Stack'ga o'tkazish.


**5. Microtask va Macrotask farqi nimada?**
Microtask (Promise) - yuqori ustuvor, Macrotask (setTimeout) - past ustuvor.


**6. Promise qaysi navbatga tushadi?**
Microtask Queue'ga.


**7. setTimeout qaysi navbatga tushadi?**
Macrotask Queue'ga.


**8. Nima uchun microtask'lar macrotask'lardan oldin bajariladi?**
Data konsistentligi va UI tezkor yangilanishi uchun.


**9. "Blocking code" nima degani?**
Event Loop'ni to'xtatadigan, brauzerni qotiradigan uzun kod.


**10. Event Loop brauzerni qotib qolishidan qanday saqlaydi?**
Asinxronlik orqali og'ir ishlarni chetga surib qo'yadi.


**11. Call Stack bo'sh bo'lmasa Event Loop nima qiladi?**
Navbatdagi ishni o'tkazmay, kutib turadi.


**12. Node.js va Browser Event Loop'lari farq qiladimi?**
Ha, Node.js da ko'proq fazalar mavjud.
`,
  exercises: [
    {
      id: 1,
      title: "Call Stack Tartibi",
      instruction: "Natija 'b', keyin 'a' chiqadigan kod yozing.",
      startingCode: "function a() { b(); console.log('a'); }\nfunction b() { console.log('b'); }\na();",
      hint: "Funksiyalarni ketma-ket chaqiring.",
      test: "if (logs[0] === 'b' && logs[1] === 'a') return null; return 'Xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Loop-da Microtask Queue va Macrotask Queue (Callback Queue) o'rtasidagi ustuvorlik qanday?",
      options: [
        "Microtask Queue har doim ustuvor va u to'liq bo'shatilmaguncha navbatdagi Macrotask bajarilmaydi",
        "Macrotask Queue har doim ustuvor",
        "Ular navbatma-navbat bajariladi",
        "Ikkalasi ham bir vaqtda bajariladi"
      ],
      correctAnswer: 0,
      explanation: "Event Loop qoidasiga ko'ra, har bir Macrotaskdan so'ng Microtask Queue to'liq tekshiriladi va undagi barcha vazifalar tugatilgandan keyingina keyingi Macrotaskka o'tiladi."
    },
    {
      id: 2,
      question: "Quyidagi kod natijasi nima bo'ladi?\n```javascript\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\n```",
      options: [
        "Timeout, Promise",
        "Promise, Timeout",
        "Bir vaqtda chiqadi",
        "Faqat Promise"
      ],
      correctAnswer: 1,
      explanation: "Promise Microtask Queuega, setTimeout esa Macrotask Queuega tushadi. Microtasklar Macrotasklardan oldin bajariladi."
    },
    {
      id: 3,
      question: "JavaScript engine-da 'Blocking code' deganda nimani tushunasiz?",
      options: [
        "API dan ma'lumot kutish",
        "Main thread (Call Stack)ni uzoq vaqt band qiladigan va Event Loop-ni to'xtatib qo'yadigan og'ir sinxron kod",
        "Xato yozilgan kod",
        "Asinxron funksiyalar"
      ],
      correctAnswer: 1,
      explanation: "Og'ir sinxron operatsiyalar (masalan, milliardlik loop) Call Stackni band qiladi va Event Loop callbacklarni stackka o'tkaza olmay qoladi, natijada sahifa qotadi."
    }
  ]
};