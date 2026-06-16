## 1. 💡 Sodda Tushuntirish va Analogiya

### String Metodlari nima?
JavaScript-da har qanday matn (tirnoq ichidagi belgilar ketma-ketligi) **String** ma'lumot turi hisoblanadi. String metodlari — bu matnlar bilan ishlash (masalan, ularni kesish, harflarini kattalashtirish, qidirish yoki almashtirish) uchun oldindan tayyorlab qo'yilgan maxsus asboblar to'plamidir.

### Real hayotiy analogiya
Tasavvur qiling, sizda **gil (loy)** bor:
* Agar siz undan ko'za yasamoqchi bo'lsangiz, uni ezib, shakl berasiz. Ammo JavaScript stringlari gilga emas, balki **toshga o'yilgan yozuvga** o'xshaydi.
* Agar toshdagi yozuvni o'zgartirmoqchi bo'lsangiz, mavjud toshni o'zgartira olmaysiz (chunki stringlar o'zgarmasdir - **immutable**). Siz faqat boshqa toshni olib, unga yangi matnni o'yib yozishingiz mumkin.
* Matn metodlari ham xuddi shunday ishlaydi: ular mavjud matnni o'zgartirmaydi, balki berilgan buyruq asosida mutlaqo yangi matn nusxasini yaratib qaytaradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda misol)
Matn harflari registrini o'zgartirish va bo'shliqlarni tozalash:
```javascript
const greeting = "   Assalomu Alaykum!   ";

// Boshidagi va oxiridagi bo'shliqlarni olib tashlaymiz
const cleanGreeting = greeting.trim();
console.log(cleanGreeting); // "Assalomu Alaykum!"

// Barcha harflarni katta yoki kichik qilamiz
console.log(cleanGreeting.toUpperCase()); // "ASSALOMU ALAYKUM!"
console.log(cleanGreeting.toLowerCase()); // "assalomu alaykum!"
```

### 2. Intermediate Example (O'rtacha misol)
Matn ichidan qismlarni kesib olish va qidirish:
```javascript
const sentence = "JavaScript juda ajoyib til!";

// includes() - matnda biror so'z borligini tekshiradi
console.log(sentence.includes("ajoyib")); // true
console.log(sentence.includes("Python")); // false

// indexOf() - so'zning indeksini (boshlanish joyini) qaytaradi
console.log(sentence.indexOf("juda")); // 11

// slice(start, end) - matnning ma'lum qismini kesib oladi
// 0-indeksdan 10-indeksgacha bo'lgan qism (10-indeks kirmaydi)
console.log(sentence.slice(0, 10)); // "JavaScript"
```

### 3. Advanced Example (Murakkab misol)
Metodlarni zanjir (chaining) ko'rinishida ulash va matnlarni formatlash:
```javascript
const rawInput = "   admin_user_name   ";

// Zanjir usulida metodlarni chaqirish:
// 1. Bo'shliqlarni tozalaydi
// 2. "_" belgilarini bo'sh joyga almashtiradi
// 3. Har bir so'zning bosh harfini katta qiladi (split va map orqali)
const formatted = rawInput
  .trim()
  .replaceAll("_", " ")
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

console.log(formatted); // "Admin User Name"
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Primitive Wrapper Objects (Boxing)
JavaScript-da stringlar **primitiv** ma'lumot turi hisoblanadi. Primitiv turlar esa obyekt bo'lmagani uchun ularda o'z-o'zidan xossa (property) yoki metodlar bo'lishi mumkin emas. Unda qanday qilib `'salom'.toUpperCase()` kodi ishlamoqda?

Siz string metodini chaqirganingizda, JavaScript orqa fonda quyidagi amallarni bajaradi:
1. **Boxing (Qobiqqa o'rash):** Vaqtinchalik maxsus `String` obyektini (`new String()`) yaratadi va primitiv matnni uning ichiga o'raydi. Bu obyekt matn metodlariga ega bo'ladi.
2. **Metodni bajarish:** Vaqtinchalik obyektdagi metod ishga tushiriladi va natija qaytariladi.
3. **Unboxing (Qobiqdan chiqarish):** Natija qaytganidan so'ng, ushbu vaqtinchalik obyekt xotiradan (Garbage Collector yordamida) darhol o'chirib yuboriladi va bizda yana oddiy primitiv string qoladi.

### String Interning (Xotirani optimallashtirish)
Dvigatel (masalan, V8) xotirani tejash uchun bir xil string literallarini bitta xotira manzilida saqlaydi. Agar siz dasturda bir xil matnli 10 ta o'zgaruvchi yaratsangiz ham, ular xotirada faqat bitta joyni egallaydi. Stringlar o'zgarmas bo'lgani uchun bu xavfsizdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Immutability (O'zgarmaslik) qoidasini unutish
#### Xato:
```javascript
let nickname = "nodir";
nickname.toUpperCase(); // Kutish: nickname "NODIR" bo'lib qoladi
console.log(nickname); // Natija: "nodir" (o'zgarmagan!)
```
#### Nima uchun:
String o'zgarmas bo'lganligi sababli, `toUpperCase()` o'zgaruvchining qiymatini o'zgartirmaydi, balki yangi matn qaytaradi.
#### To'g'ri usul:
Natijani yangi o'zgaruvchiga o'zlashtirish yoki o'zini qayta yozish kerak:
```javascript
nickname = nickname.toUpperCase();
console.log(nickname); // "NODIR"
```

### 2. `length`ni metod sifatida chaqirish
#### Xato:
```javascript
const text = "Salom";
console.log(text.length()); // TypeError: text.length is not a function
```
#### Nima uchun:
`length` bu string metodi emas, uning xususiyatidir (property).
#### To'g'ri usul:
Qavslarsiz yoziladi:
```javascript
console.log(text.length); // 5
```

### 3. `replace()` faqat birinchi moslikni o'zgartirishini bilmaslik
#### Xato:
```javascript
const list = "olma, olma, olma";
const result = list.replace("olma", "anor");
console.log(result); // "anor, olma, olma" (faqat birinchisi o'zgardi)
```
#### To'g'ri usul:
Barcha mosliklarni o'zgartirish uchun `replaceAll()` yoki global RegEx ishlatish kerak:
```javascript
const result = list.replaceAll("olma", "anor"); // "anor, anor, anor"
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior darajasi uchun
1. **Savol:** JavaScript-da stringlar o'zgaruvchanmi (mutable) yoki o'zgarmasmi (immutable)?
   * **Javob:** Stringlar mutlaqo o'zgarmasdir (immutable). Bir marta yaratilgan stringni ichidan o'zgartirib bo'lmaydi, har doim yangisi yaratiladi.
2. **Savol:** `str.length` nima va u qanday hisoblanadi?
   * **Javob:** U stringdagi UTF-16 belgilar sonini qaytaradigan xususiyatdir.
3. **Savol:** Boshidagi va oxiridagi bo'shliqlarni qaysi metod olib tashlaydi?
   * **Javob:** `trim()` metodi. Shuningdek `trimStart()` va `trimEnd()` ham mavjud.
4. **Savol:** `indexOf()` metodi qidirilayotgan qiymat topilmasa nima qaytaradi?
   * **Javob:** `-1` qaytaradi.

### Middle darajasi uchun
5. **Savol:** `slice(start, end)` va `substring(start, end)` orasidagi farq nima?
   * **Javob:** `slice()` manfiy indekslarni qabul qiladi va ularni matn oxiridan boshlab hisoblaydi. `substring()` esa manfiy indekslarni `0` deb hisoblaydi. Shuningdek, `substring`da agar `start > end` bo'lsa, argumentlar o'rni avtomatik almashadi.
6. **Savol:** `str.charAt(index)` va `str[index]` o'rtasidagi farq nima?
   * **Javob:** Agar berilgan indeks mavjud bo'lmasa (chegaradan tashqarida bo'lsa), `charAt()` bo'sh string `""` qaytaradi, `str[index]` esa `undefined` beradi.
7. **Savol:** `includes()` va `indexOf()` farqi nimada?
   * **Javob:** `includes()` faqat mantiqiy qiymat (`true/false`) qaytaradi, `indexOf()` esa mos keluvchi birinchi belgining indeksini yoki `-1` qaytaradi.
8. **Savol:** `replace()` metodiga birinchi argument sifatida satr (string) berilsa nima bo'ladi?
   * **Javob:** Faqat birinchi uchragan moslik almashtiriladi, qolganlari o'zgarishsiz qoladi.

### Senior darajasi uchun
9. **Savol:** String Boxing nima va u ishlash tezligiga (performance) ta'sir qiladimi?
   * **Javob:** Boxing — primitiv stringda metod chaqirilganda vaqtinchalik obyekt yaratilishi. Bu qisqa muddatli xotira bandligini yaratadi. Katta tsikllarda (millionlab marta) keraksiz metod chaqirishdan qochish kerak.
10. **Savol:** String Interning qanday ishlaydi?
    * **Javob:** JS dvigateli bir xil string literallari uchun xotirada bitta joy ajratadi va ularga bir xil pointer beradi. Bu xotirani tejaydi va solishtirish tezligini oshiradi.
11. **Savol:** Matnlarni alifbo tartibida to'g'ri solishtirish uchun qaysi metoddan foydalaniladi?
    * **Javob:** `localeCompare()` metodi. U turli tillardagi o'ziga xos harflarni (masalan, o'zbek tilidagi `o'`, `g'`) to'g'ri tartiblash imkonini beradi.
12. **Savol:** Ko'p sonli matnlarni birlashtirishda `+` operatori va `Array.join()` orasida qaysi biri samaraliroq?
    * **Javob:** Zamonaviy dvigatellarda `+` operatori juda yaxshi optimallashtirilgan bo'lib, oddiy birlashtirishlarda tezroq ishlaydi. Ammo juda ko'p dinamik stringlar yig'ilayotganda `Array.push()` va keyin `join()` xotirani kamroq band qiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi diagrammada string o'zgarmasligi (immutability) ko'rsatilgan. E'tibor bering, operatsiyalar original stringni o'zgartirmasdan, xotirada yangi stringlar hosil qiladi:

```mermaid
graph LR
    A["Original String: 'hello'"] -->|str.toUpperCase()| B["Yangi String: 'HELLO'"]
    A -->|str.slice(1, 4)| C["Yangi String: 'ell'"]
    A -->|O'zgarishsiz qoladi| D["Original String: 'hello' (xotirada saqlanadi)"]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style C fill:#bbf,stroke:#333,stroke-width:1px
    style D fill:#f9f,stroke:#333,stroke-width:2px
```

### Amaliy topshiriq variantlari:
1. Foydalanuvchining telefon raqamini formatlang: `+998901234567` matnini olib, `+998 (90) 123-45-67` shakliga keltiring.
2. Berilgan matndagi barcha probellarni olib tashlab, harflar sonini hisoblang.

---

## 7. 📝 12 ta Mini Test

Ushbu dars uchun maxsus tayyorlangan 12 ta test yordamida o'z bilimingizni sinab ko'ring. Testlar primitiv turlar, xotirada ishlash va metodlarning o'ziga xos jihatlarini qamrab olgan.

---

## 8. 🎯 Real Project Case Study

### URL Slug Generator (Maqola sarlavhasini URL manziliga o'tkazish)
Haqiqiy loyihalarda (masalan, blog yoki yangiliklar saytida) maqola sarlavhasini chiroyli URL manziliga o'tkazish talab qilinadi. Buni string metodlari zanjiri orqali amalga oshiramiz:

```javascript
function generateSlug(title) {
  return title
    .trim()                     // 1. Boshidagi va oxiridagi bo'shliqlarni tozalaydi
    .toLowerCase()              // 2. Kichik harflarga o'tkazadi
    .replace(/[^a-z0-9\s-]/g, '') // 3. Maxsus belgilarni (nuqta, undov, so'roq) o'chiradi
    .replace(/\s+/g, '-')       // 4. Barcha bo'shliqlarni bitta chiziqchaga almashtiradi
    .slice(0, 50);              // 5. URL uzunligini 50 belgidan oshirmaydi
}

const articleTitle = " JavaScript-da String Metodlari! (To'liq qo'llanma) ";
const slug = generateSlug(articleTitle);

console.log(slug); // "javascript-da-string-metodlari-toliq-qollanma"
```

---

## 9. 🚀 Performance va Optimization

* **Primitiv turlarni afzal ko'ring:** Hech qachon `new String("matn")` shaklida string yaratmang. Bu keraksiz obyektlarni yaratib, xotirani band qiladi va `typeof` tekshiruvida `'object'` qaytarib chalkashlik yuzaga keltiradi.
* **Qidiruv operatsiyalari tezligi:** `includes()` va `startsWith()` metodlari o'rnatilgan C++ kodlarida ishlaydi, shuning uchun ular qo'lda yozilgan `for` sikllariga qaraganda ancha tez va optimaldir.
* **Matn tozalash:** Matnni tekshirishdan oldin har doim `trim()` va `toLowerCase()` metodlarini ishlatish xatolarni keskin kamaytiradi (ayniqsa login va email validatsiyasida).

---

## 10. 📌 Cheat Sheet

| Metod | Parametrlari | Qaytaradigan Qiymati | Vazifasi / Izoh |
| :--- | :--- | :--- | :--- |
| `trim()` | yo'q | `string` | Boshidagi va oxiridagi bo'shliqlarni tozalaydi |
| `toUpperCase()` | yo'q | `string` | Barcha harflarni kattalashtiradi |
| `toLowerCase()` | yo'q | `string` | Barcha harflarni kichiklashtiradi |
| `slice(start, end)` | `start (number)`, `end? (number)` | `string` | Ko'rsatilgan indekslar bo'yicha matnni kesib oladi |
| `indexOf(val)` | `value (string)` | `number` | Qiymatning birinchi uchragan indeksini qaytaradi (topilmasa `-1`) |
| `includes(val)` | `value (string)` | `boolean` | Matn ichida qidirilayotgan qiymat borligini tekshiradi |
| `replace(search, repl)`| `search (string/regex)`, `repl (string)` | `string` | Birinchi mos kelgan qiymatni almashtiradi |
| `replaceAll(search, repl)`| `search (string/regex)`, `repl (string)` | `string` | Barcha mos kelgan qiymatlarni almashtiradi |
| `split(separator)` | `separator (string)` | `array` | Stringni bo'laklarga bo'lib, massiv qaytaradi |
| `repeat(count)` | `count (number)` | `string` | Matnni berilgan marta takrorlab birlashtiradi |
