export const prototypesLesson = {
  id: "a18",
  title: "Prototypes va OOP: JavaScript'ning Ob'ekt-Yo'naltirilgan Dasturlash",
  level: "Murakkab",
  description: "Prototype chain, Inheritance, ES6 Classes, va JavaScript OOP mexanizmi.",
  theory: `## 1. NEGA kerak?

JavaScript-da kodni qayta ishlatish va obyektlar o'rtasida "vorislik" (inheritance) o'rnatish uchun **Prototype** kerak. Masalan, har bir massivda \`.map()\` bo'lishining sababi — u prototipda yozilgan.

## 2. SODDALIK (Analogiya)

**Oila vorisligi:**
- **Bobo** = Prototype (eng asosiy xususiyatlar).
- **Ota** = Boboning prototipi.
- **Siz** = Obyekt (konkret misol).

Agar sizda biror narsa bo'lmasa, otangizda, unda ham bo'lmasa bobongizda qidiriladi.

## 3. STRUKTURA

### A. Prototype Chain
Har bir obyektda yashirin \`__proto__\` bor. U o'zining "ota" prototipiga ishora qiladi.

### B. Constructor Funksiyalar
\`new\` kalit so'zi bilan yangi obyekt yasash.

### C. Prototype-ga metod qo'shish
Xotirani tejash uchun metodlarni prototipga yozish tavsiya etiladi.

## 4. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Prototype nima?</summary>
Obyektlar o'rtasida xususiyatlar almashish mexanizmi.
</details>

<details>
<summary>2. __proto__ nima?</summary>
Obyektning ota prototipiga bo'lgan yashirin ishorasi.
</details>

<details>
<summary>3. prototype va __proto__ farqi?</summary>
prototype — funksiya xususiyati, __proto__ — obyekt xususiyati.
</details>

<details>
<summary>4. Prototype chain nima?</summary>
Ob'ektdan to null gacha bo'lgan prototiplar zanjiri.
</details>

<details>
<summary>5. new operatori nima qiladi?</summary>
Yangi obyekt yaratadi va prototipni bog'laydi.
</details>

<details>
<summary>6. Object.create() nima?</summary>
Berilgan prototip bilan yangi obyekt yaratish.
</details>

<details>
<summary>7. hasOwnProperty() nima qiladi?</summary>
Xususiyat obyektning o'zinikimi yoki prototipdan kelganmi tekshiradi.
</details>

<details>
<summary>8. Nima uchun metodlarni prototipga qo'shgan ma'qul?</summary>
Xotirani tejash uchun (bitta nusxa hamma instance uchun).
</details>

<details>
<summary>9. ES6 Class asli nima?</summary>
Prototype inheritance uchun sintaktik qobiq (sugar).
</details>

<details>
<summary>10. instanceof nima uchun?</summary>
Obyekt ma'lum bir prototip zanjirida bormi tekshirish uchun.
</details>

<details>
<summary>11. Object.prototype nima?</summary>
Eng yuqori (bazaviy) prototip.
</details>

<details>
<summary>12. Polyfill nima?</summary>
Eski brauzerlarda yo'q metodlarni prototipga qo'lda qo'shish.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Simple Prototype",
      instruction: "Person.prototype-ga 'sayHi' metodini qo'shing.",
      startingCode: "function Person(n) { this.name = n; }\n// Bu yerga yozing\nconst p = new Person('Ali');",
      hint: "Person.prototype.sayHi = function() { ... }",
      test: "if (p.sayHi) return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da obyektlar o'rtasida metodlar va xususiyatlar qanday uzatiladi?",
      options: [
        "Klasslar nusxalanishi orqali",
        "Prototip zanjiri orqali (Prototype chain)",
        "Global o'zgaruvchilar orqali",
        "Funksiyalar chaqirilishi orqali"
      ],
      correctAnswer: 1,
      explanation: "JS prototiplarga asoslangan, har bir obyekt o'z prototipidan meros oladi."
    },
    {
      id: 2,
      question: "`Object.create(parent)` metodi nima qiladi?",
      options: [
        "Yangi obyekt yaratadi va prototipini parent-ga tenglashtiradi",
        "Parent-ni nusxalaydi",
        "Parent-ni o'chiradi",
        "Static metod yaratadi"
      ],
      correctAnswer: 0,
      explanation: "`Object.create` yangi obyekt yaratishda uning prototipini belgilash imkonini beradi."
    }
  ]
};