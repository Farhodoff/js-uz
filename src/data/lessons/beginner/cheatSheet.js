export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)",
  theory: `## JS Cheat Sheet (To'liq ma'lumotnoma)

JavaScript'ning eng kerakli qismlari bir joyda. Bu sahifa tezkor eslatma sifatida ishlaydi: asoslar, operatorlar, tiplar, obyektlar, massivlar, sana, Math, xatolar, JSON va Promise'lar.

---

### Basics
\`\`\`html
<script type="text/javascript">
  // Sahifa ichida yozilgan JS kodi.
</script>

<script src="filename.js"></script>
\`\`\`

\`\`\`js
setTimeout(function () {
  // Bu kod 1 soniyadan keyin ishlaydi.
}, 1000);
\`\`\`

\`\`\`js
function addNumbers(a, b) {
  return a + b; // Ikki sonni qo'shadi.
}

const x = addNumbers(1, 2); // Natija: 3
\`\`\`

\`\`\`js
document.getElementById("elementID").innerHTML = "Yangi matn"; // DOM matnini almashtiradi
\`\`\`

\`\`\`js
console.log(a); // Konsolga yozadi
document.write(a); // HTML hujjatiga yozadi
alert(a); // Ogohlantirish oynasini chiqaradi
confirm("Really?"); // Ha/yo'q oynasi
prompt("Your age?", "0"); // Foydalanuvchidan qiymat oladi
\`\`\`

\`\`\`js
/* Ko'p qatorli izoh */
// Bir qatorli izoh
\`\`\`

---

### Loops
\`\`\`js
for (var i = 0; i < 10; i++) {
  // i 0 dan 9 gacha aylanadi
  document.write(i + ": " + i * 3 + "<br />"); // Natijani chiqaradi
}
\`\`\`

\`\`\`js
var i = 1; // Boshlang'ich qiymat
while (i < 100) {
  i *= 2; // Har safar ikki barobar oshiradi
  document.write(i + ", "); // Qiymatni chiqaradi
}
\`\`\`

\`\`\`js
var i = 1; // Boshlang'ich qiymat
do {
  i *= 2; // Kamida bir marta bajariladi
  document.write(i + ", "); // Qiymatni chiqaradi
} while (i < 100);
\`\`\`

\`\`\`js
for (var i = 0; i < 10; i++) {
  if (i == 5) break; // 5 ga yetganda siklni to'xtatadi
  document.write(i + ", ");
}
\`\`\`

\`\`\`js
for (var i = 0; i < 10; i++) {
  if (i == 5) continue; // 5 ni o'tkazib yuboradi
  document.write(i + ", ");
}
\`\`\`

---

### If / Else / Switch
\`\`\`js
if ((age >= 14) && (age < 19)) {
  status = "Eligible."; // Shart bajarildi
} else {
  status = "Not eligible."; // Aks holda
}
\`\`\`

\`\`\`js
switch (new Date().getDay()) {
  case 6:
    text = "Saturday"; // Shanba
    break;
  case 0:
    text = "Sunday"; // Yakshanba
    break;
  default:
    text = "Whatever"; // Boshqa kunlar
}
\`\`\`

---

### Variables and Data Types
\`\`\`js
var a; // E'lon qilingan, lekin bo'sh
var b = "init"; // Satr
var c = "Hi" + " " + "Joe"; // "Hi Joe"
var d = 1 + 2 + "3"; // "33" (string concatenation)
var e = [2, 3, 5, 8]; // Massiv
var f = false; // Boolean
var g = /()/; // Regular expression
var h = function () {}; // Funksiya obyekt

const PI = 3.14; // O'zgarmas qiymat
let z = 'zzz'; // Block scope o'zgaruvchi
\`\`\`

\`\`\`js
"use strict"; // Xavfsizroq rejim
x = 1; // E'lon qilinmagan o'zgaruvchi xato beradi
\`\`\`

- Number
- String
- Boolean
- Undefined
- Null
- Object
- Symbol

\`\`\`js
false, true // Boolean
18, 3.14, 0b10011, 0xF6, NaN // Number
"flower", 'John' // String
undefined, null, Infinity // Maxsus qiymatlar
\`\`\`

---

### Operators
\`\`\`js
a = b + c - d; // Qo'shish va ayirish
a = b * (c / d); // Qavs bilan guruhlash
x = 100 % 48; // Qoldiq
a++; // 1 ga oshiradi
b--; // 1 ga kamaytiradi
\`\`\`

\`\`\`js
a == b; // Qiymat bo'yicha solishtirish
a != b; // Teng emas
a === b; // Qiymat va tur bo'yicha solishtirish
a !== b; // Qiymat yoki tur bo'yicha teng emas
a < b; // Kichik
a > b; // Katta
a <= b; // Kichik yoki teng
a >= b; // Katta yoki teng
a += b; // a = a + b
a && b; // Mantiqiy VA
a || b; // Mantiqiy YOKI
\`\`\`

\`\`\`js
5 & 1; // AND
5 | 1; // OR
~5; // NOT
5 ^ 1; // XOR
5 << 1; // Chapga siljitish
5 >> 1; // O'ngga siljitish
5 >>> 1; // Nol bilan to'ldirib o'ngga siljitish
\`\`\`

---

### Objects
\`\`\`js
var student = {
  firstName: "Jane", // Ismi
  lastName: "Doe", // Familiyasi
  age: 18, // Yoshi
  height: 170, // Bo'yi
  fullName: function () {
    return this.firstName + " " + this.lastName; // To'liq ism
  }
};

student.age = 19; // Qiymatni o'zgartirish
student["age"]++; // Indeks orqali oshirish
name = student.fullName(); // Funksiyani chaqirish
\`\`\`

---

### Strings
\`\`\`js
var abc = "abcdefghijklmnopqrstuvwxyz"; // Misol string
var esc = 'I don\\'t \\n know'; // Maxsus belgilar
var len = abc.length; // Uzunligi
abc.indexOf("lmno"); // Qidirish
abc.lastIndexOf("lmno"); // Oxirgi moslik
abc.slice(3, 6); // Kesib olish
abc.replace("abc", "123"); // Almashtirish
abc.toUpperCase(); // Katta harf
abc.toLowerCase(); // Kichik harf
abc.concat(" ", str2); // Birlashtirish
abc.charAt(2); // Indeks bo'yicha belgi
abc[2]; // Xavfli qisqa yozuv
abc.charCodeAt(2); // Belgining kodi
abc.split(","); // Vergul bo'yicha bo'lish
abc.split(""); // Har bir belgiga ajratish
\`\`\`

---

### Events
- Mouse: \`onclick\`, \`oncontextmenu\`, \`ondblclick\`, \`onmousedown\`, \`onmouseenter\`, \`onmouseleave\`, \`onmousemove\`, \`onmouseover\`, \`onmouseout\`, \`onmouseup\`
- Keyboard: \`onkeydown\`, \`onkeypress\`, \`onkeyup\`
- Frame: \`onabort\`, \`onbeforeunload\`, \`onerror\`, \`onhashchange\`, \`onload\`, \`onpageshow\`, \`onpagehide\`, \`onresize\`, \`onscroll\`, \`onunload\`
- Form: \`onblur\`, \`onchange\`, \`onfocus\`, \`onfocusin\`, \`onfocusout\`, \`oninput\`, \`oninvalid\`, \`onreset\`, \`onsearch\`, \`onselect\`, \`onsubmit\`
- Drag: \`ondrag\`, \`ondragend\`, \`ondragenter\`, \`ondragleave\`, \`ondragover\`, \`ondragstart\`, \`ondrop\`
- Clipboard: \`oncopy\`, \`oncut\`, \`onpaste\`

---

### Numbers and Math
\`\`\`js
var pi = 3.141; // Pi soni
pi.toFixed(0); // Butun qism
pi.toFixed(2); // 2 xonali kasr
pi.toPrecision(2); // Aniqlik bilan chiqarish
pi.valueOf(); // Sonning o'zi
Number(true); // Boolean -> number
Number(new Date()); // Millisekundlarga aylantiradi
parseInt("3 months"); // Boshlang'ich butun sonni oladi
parseFloat("3.5 days"); // Boshlang'ich kasr sonni oladi
\`\`\`

\`\`\`js
Math.PI; // Pi konstantasi
Math.round(4.4); // Yaqin butun songa
Math.round(4.5); // Yuqoriga yaxlitlash
Math.pow(2, 8); // Daraja
Math.sqrt(49); // Kvadrat ildiz
Math.abs(-3.14); // Modul
Math.ceil(3.14); // Tepaga yaxlitlash
Math.floor(3.99); // Pastga yaxlitlash
Math.sin(0); // Sinus
Math.cos(Math.PI); // Kosinus
Math.min(0, 3, -2, 2); // Eng kichik qiymat
Math.max(0, 3, -2, 2); // Eng katta qiymat
Math.log(1); // Natural logarifm
Math.exp(1); // e^x
Math.random(); // 0 va 1 oralig'ida son
Math.floor(Math.random() * 5) + 1; // 1 dan 5 gacha tasodifiy son
\`\`\`

---

### Dates
\`\`\`js
var d = new Date(); // Hozirgi sana va vaqt
Number(d); // Millisekund ko'rinishiga o'tkazish
Date("2017-06-23"); // Sana satri
Date("2017");
Date("2017-06-23T12:00:00-09:45");
Date("June 23 2017");
Date("Jun 23 2017 07:45:00 GMT+0100 (Tokyo Time)");
\`\`\`

\`\`\`js
d.getDay(); // Haftaning kuni
d.getDate(); // Oy kuni
d.getFullYear(); // Yil
d.getHours(); // Soat
d.getMilliseconds(); // Millisekund
d.getMinutes(); // Daqiqa
d.getMonth(); // Oy
d.getSeconds(); // Sekund
d.getTime(); // 1970 dan beri milisekund
\`\`\`

\`\`\`js
d.setDate(d.getDate() + 7); // 7 kun qo'shish
d.setDate();
d.setFullYear();
d.setHours();
d.setMilliseconds();
d.setMinutes();
d.setMonth();
d.setSeconds();
d.setTime();
\`\`\`

---

### Arrays
\`\`\`js
var dogs = ["Bulldog", "Beagle", "Labrador"]; // Massiv literal
var dogs = new Array("Bulldog", "Beagle", "Labrador"); // Konstruktor orqali
alert(dogs[1]); // 2-elementni olish
dogs[0] = "Bull Terier"; // Birinchi elementni almashtirish
\`\`\`

\`\`\`js
for (var i = 0; i < dogs.length; i++) {
  console.log(dogs[i]); // Har bir elementni chiqarish
}
\`\`\`

\`\`\`js
dogs.toString(); // Matnga aylantirish
dogs.join(" * "); // Belgilar bilan birlashtirish
dogs.pop(); // Oxiridan o'chirish
dogs.push("Chihuahua"); // Oxiriga qo'shish
dogs.shift(); // Boshidan o'chirish
dogs.unshift("Chihuahua"); // Boshiga qo'shish
delete dogs[0]; // Elementni bo'shatish
dogs.splice(2, 0, "Pug", "Boxer"); // Joyiga qo'shish
var animals = dogs.concat(cats, birds); // Massivlarni birlashtirish
dogs.slice(1, 4); // Nusxa olish
dogs.sort(); // Saralash
dogs.reverse(); // Teskari qilish
x.sort(function(a, b) { return a - b; }); // O'sish tartibi
x.sort(function(a, b) { return b - a; }); // Kamayish tartibi
\`\`\`

---

### Global Functions
\`\`\`js
eval(); // String kodni bajaradi
String(23); // Stringga aylantiradi
(23).toString(); // Sonni string qiladi
Number("23"); // Stringni songa aylantiradi
decodeURI(enc); // URI ni dekod qiladi
encodeURI(uri); // URI ni kodlaydi
decodeURIComponent(enc); // URI komponentni dekod qiladi
encodeURIComponent(uri); // URI komponentni kodlaydi
isFinite(); // Cheksiz emasligini tekshiradi
isNaN(); // Son emasligini tekshiradi
parseFloat(); // Kasr son o'qiydi
parseInt(); // Butun son o'qiydi
\`\`\`

---

### Regular Expressions
- Modifiers: \`i\`, \`g\`, \`m\`
- Patterns: \`\\\\\`, \`\\d\`, \`\\s\`, \`\\b\`, \`n+\`, \`n*\`, \`n?\`, \`^\`

---

### Errors
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

\`\`\`js
try {
  undefinedFunction(); // Xato beradigan kod
} catch (err) {
  console.log(err.message); // Xabarni chiqaradi
}
\`\`\`

\`\`\`js
throw "My error message"; // Qo'lda xato ko'tarish
\`\`\`

\`\`\`js
var x = document.getElementById("mynum").value; // Input qiymati

try {
  if (x == "") throw "empty";
  if (isNaN(x)) throw "not a number";
  x = Number(x);
  if (x > 10) throw "too high";
} catch (err) {
  document.write("Input is " + err); // Foydalanuvchiga xabar
  console.error(err); // Konsolga xato
} finally {
  document.write("</br />Done"); // Har doim bajariladi
}
\`\`\`

---

### JSON
\`\`\`js
var str = '{"names":[{"first":"Hakuna","lastN":"Matata"},{"first":"Jane","lastN":"Doe"},{"first":"Air","last":"Jordan"}]}'; // JSON string
obj = JSON.parse(str); // Stringdan obyektga
document.write(obj.names[1].first); // Qiymatni o'qish
\`\`\`

\`\`\`js
var myObj = { "name":"Jane", "age":18, "city":"Chicago" }; // Obyekt
var myJSON = JSON.stringify(myObj); // Obyektni stringga
window.location = "demo.php?x=" + myJSON; // So'rovga yuborish
\`\`\`

\`\`\`js
myObj = { "name":"Jane", "age":18, "city":"Chicago" };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON); // Saqlash
text = localStorage.getItem("testJSON"); // O'qish
obj = JSON.parse(text); // Qayta obyektga
document.write(obj.name); // Ismni chiqarish
\`\`\`

---

### Promises
\`\`\`js
function sum(a, b) {
  return Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof a !== "number" || typeof b !== "number") {
        return reject(new TypeError("Inputs must be numbers")); // Noto'g'ri kirish
      }
      resolve(a + b); // Natijani qaytarish
    }, 1000);
  });
}

var myPromise = sum(10, 5);
myPromise
  .then(function (result) {
    document.write("10 + 5: ", result); // Birinchi natija
    return sum(null, "foo"); // Xatoli chaqiriq
  })
  .then(function () {})
  .catch(function (err) {
    console.error(err); // Xatoni ushlash
  });
\`\`\`

- States: \`pending\`, \`fulfilled\`, \`rejected\`
- Properties: \`Promise.length\`, \`Promise.prototype\`
- Methods: \`Promise.all(iterable)\`, \`Promise.race(iterable)\`, \`Promise.reject(reason)\`, \`Promise.resolve(value)\`

---

### Useful Links
- JS cleaner
- Obfuscator
- Can I use?
- Node.js
- jQuery
- RegEx tester`,
  quizzes: [
    {
      question: "Qaysi xato turi o'zgaruvchi e'lon qilinmasdan ishlatilganda yuz beradi?",
      options: [
        "TypeError",
        "SyntaxError",
        "ReferenceError",
        "URIError"
      ],
      correctAnswer: 2,
      explanation: "ReferenceError - mavjud bo'lmagan (e'lon qilinmagan) o'zgaruvchiga murojaat qilinganda yuz beradi."
    },
    {
      question: "JavaScript'da massiv oxiriga element qo'shish uchun qaysi metod ishlatiladi?",
      options: [
        "shift()",
        "push()",
        "pop()",
        "unshift()"
      ],
      correctAnswer: 1,
      explanation: "push() metodi massiv oxiriga yangi element qo'shadi."
    },
    {
      question: "Qaysi operator 'qiymati va turi bo'yicha tenglik' ni tekshiradi?",
      options: [
        "==",
        "=",
        "!==",
        "==="
      ],
      correctAnswer: 3,
      explanation: "=== operatori qat'iy tenglikni (Strict Equality) tekshiradi: ham qiymat, ham tip bir xil bo'lishi kerak."
    }
  ]
};
