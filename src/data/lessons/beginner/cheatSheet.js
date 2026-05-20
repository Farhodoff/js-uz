export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (To'liq ma'lumotnoma)",
  theory: `## JS Cheat Sheet (To'liq ma'lumotnoma)

JavaScript'ning eng kerakli qismlari bir joyda. Bu sahifa tezkor eslatma sifatida ishlaydi: asoslar, operatorlar, tiplar, obyektlar, massivlar, sana, Math, xatolar, JSON va Promise'lar.

---

### Basics
\`\`\`html
<script type="text/javascript">
  // JS kodi
</script>

<script src="filename.js"></script>
\`\`\`

\`\`\`js
setTimeout(function () {
  // 1 soniyadan keyin bajariladi
}, 1000);
\`\`\`

\`\`\`js
function addNumbers(a, b) {
  return a + b;
}

const x = addNumbers(1, 2);
\`\`\`

\`\`\`js
document.getElementById("elementID").innerHTML = "Yangi matn";
\`\`\`

\`\`\`js
console.log(a);
document.write(a);
alert(a);
confirm("Really?");
prompt("Your age?", "0");
\`\`\`

\`\`\`js
/* Ko'p qatorli izoh */
// Bir qatorli izoh
\`\`\`

---

### Loops
\`\`\`js
for (var i = 0; i < 10; i++) {
  document.write(i + ": " + i * 3 + "<br />");
}
\`\`\`

\`\`\`js
var i = 1;
while (i < 100) {
  i *= 2;
  document.write(i + ", ");
}
\`\`\`

\`\`\`js
var i = 1;
do {
  i *= 2;
  document.write(i + ", ");
} while (i < 100);
\`\`\`

\`\`\`js
for (var i = 0; i < 10; i++) {
  if (i == 5) break;
  document.write(i + ", ");
}
\`\`\`

\`\`\`js
for (var i = 0; i < 10; i++) {
  if (i == 5) continue;
  document.write(i + ", ");
}
\`\`\`

---

### If / Else / Switch
\`\`\`js
if ((age >= 14) && (age < 19)) {
  status = "Eligible.";
} else {
  status = "Not eligible.";
}
\`\`\`

\`\`\`js
switch (new Date().getDay()) {
  case 6:
    text = "Saturday";
    break;
  case 0:
    text = "Sunday";
    break;
  default:
    text = "Whatever";
}
\`\`\`

---

### Variables and Data Types
\`\`\`js
var a;
var b = "init";
var c = "Hi" + " " + "Joe";
var d = 1 + 2 + "3";
var e = [2, 3, 5, 8];
var f = false;
var g = /()/;
var h = function () {};

const PI = 3.14;
let z = 'zzz';
\`\`\`

\`\`\`js
"use strict";
x = 1;
\`\`\`

- Number
- String
- Boolean
- Undefined
- Null
- Object
- Symbol

\`\`\`js
false, true
18, 3.14, 0b10011, 0xF6, NaN
"flower", 'John'
undefined, null, Infinity
\`\`\`

---

### Operators
\`\`\`js
a = b + c - d;
a = b * (c / d);
x = 100 % 48;
a++;
b--;
\`\`\`

\`\`\`js
a == b;
a != b;
a === b;
a !== b;
a < b;
a > b;
a <= b;
a >= b;
a += b;
a && b;
a || b;
\`\`\`

\`\`\`js
5 & 1;
5 | 1;
~5;
5 ^ 1;
5 << 1;
5 >> 1;
5 >>> 1;
\`\`\`

---

### Objects
\`\`\`js
var student = {
  firstName: "Jane",
  lastName: "Doe",
  age: 18,
  height: 170,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

student.age = 19;
student["age"]++;
name = student.fullName();
\`\`\`

---

### Strings
\`\`\`js
var abc = "abcdefghijklmnopqrstuvwxyz";
var esc = 'I don\\'t \\n know';
var len = abc.length;
abc.indexOf("lmno");
abc.lastIndexOf("lmno");
abc.slice(3, 6);
abc.replace("abc", "123");
abc.toUpperCase();
abc.toLowerCase();
abc.concat(" ", str2);
abc.charAt(2);
abc[2];
abc.charCodeAt(2);
abc.split(",");
abc.split("");
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
var pi = 3.141;
pi.toFixed(0);
pi.toFixed(2);
pi.toPrecision(2);
pi.valueOf();
Number(true);
Number(new Date());
parseInt("3 months");
parseFloat("3.5 days");
\`\`\`

\`\`\`js
Math.PI;
Math.round(4.4);
Math.round(4.5);
Math.pow(2, 8);
Math.sqrt(49);
Math.abs(-3.14);
Math.ceil(3.14);
Math.floor(3.99);
Math.sin(0);
Math.cos(Math.PI);
Math.min(0, 3, -2, 2);
Math.max(0, 3, -2, 2);
Math.log(1);
Math.exp(1);
Math.random();
Math.floor(Math.random() * 5) + 1;
\`\`\`

---

### Dates
\`\`\`js
var d = new Date();
Number(d);
Date("2017-06-23");
Date("2017");
Date("2017-06-23T12:00:00-09:45");
Date("June 23 2017");
Date("Jun 23 2017 07:45:00 GMT+0100 (Tokyo Time)");
\`\`\`

\`\`\`js
d.getDay();
d.getDate();
d.getFullYear();
d.getHours();
d.getMilliseconds();
d.getMinutes();
d.getMonth();
d.getSeconds();
d.getTime();
\`\`\`

\`\`\`js
d.setDate(d.getDate() + 7);
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
var dogs = ["Bulldog", "Beagle", "Labrador"];
var dogs = new Array("Bulldog", "Beagle", "Labrador");
alert(dogs[1]);
dogs[0] = "Bull Terier";
\`\`\`

\`\`\`js
for (var i = 0; i < dogs.length; i++) {
  console.log(dogs[i]);
}
\`\`\`

\`\`\`js
dogs.toString();
dogs.join(" * ");
dogs.pop();
dogs.push("Chihuahua");
dogs.shift();
dogs.unshift("Chihuahua");
delete dogs[0];
dogs.splice(2, 0, "Pug", "Boxer");
var animals = dogs.concat(cats, birds);
dogs.slice(1, 4);
dogs.sort();
dogs.reverse();
x.sort(function(a, b) { return a - b; });
x.sort(function(a, b) { return b - a; });
\`\`\`

---

### Global Functions
\`\`\`js
eval();
String(23);
(23).toString();
Number("23");
decodeURI(enc);
encodeURI(uri);
decodeURIComponent(enc);
encodeURIComponent(uri);
isFinite();
isNaN();
parseFloat();
parseInt();
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
  undefinedFunction();
} catch (err) {
  console.log(err.message);
}
\`\`\`

\`\`\`js
throw "My error message";
\`\`\`

\`\`\`js
var x = document.getElementById("mynum").value;

try {
  if (x == "") throw "empty";
  if (isNaN(x)) throw "not a number";
  x = Number(x);
  if (x > 10) throw "too high";
} catch (err) {
  document.write("Input is " + err);
  console.error(err);
} finally {
  document.write("</br />Done");
}
\`\`\`

---

### JSON
\`\`\`js
var str = '{"names":[{"first":"Hakuna","lastN":"Matata"},{"first":"Jane","lastN":"Doe"},{"first":"Air","last":"Jordan"}]}';
obj = JSON.parse(str);
document.write(obj.names[1].first);
\`\`\`

\`\`\`js
var myObj = { "name":"Jane", "age":18, "city":"Chicago" };
var myJSON = JSON.stringify(myObj);
window.location = "demo.php?x=" + myJSON;
\`\`\`

\`\`\`js
myObj = { "name":"Jane", "age":18, "city":"Chicago" };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);
text = localStorage.getItem("testJSON");
obj = JSON.parse(text);
document.write(obj.name);
\`\`\`

---

### Promises
\`\`\`js
function sum(a, b) {
  return Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof a !== "number" || typeof b !== "number") {
        return reject(new TypeError("Inputs must be numbers"));
      }
      resolve(a + b);
    }, 1000);
  });
}

var myPromise = sum(10, 5);
myPromise
  .then(function (result) {
    document.write("10 + 5: ", result);
    return sum(null, "foo");
  })
  .then(function () {})
  .catch(function (err) {
    console.error(err);
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
};
