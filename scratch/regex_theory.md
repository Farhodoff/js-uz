## 1. 💡 Sodda Tushuntirish va Analogiya

### Muntazam Ifoda (Regular Expression) nima?
* **Muntazam ifoda (RegEx):** Matnlar ichidan ma'lum bir andozaga (shablonga) mos keladigan qismlarni qidirish, mosligini tekshirish (validation) yoki almashtirish (replace) uchun ishlatiladigan maxsus qidiruv tili andozasidir.
* U JavaScript-da o'rnatilgan obyekt (`RegExp`) bo'lib, juda murakkab matnli vazifalarni bitta qatorda hal qilish imkonini beradi.

### Real hayotiy analogiya
Tasavvur qiling, sizda **minglab hujjatlar solingan quti** bor:
* **Oddiy usul (Muntazam ifodasiz):** Siz har bir qog'ozni ochib, undagi har bir so'zni ko'zdan kechirib chiqishingiz kerak. Agar sizga "telefon raqamlari" kerak bo'lsa, har bir raqamni qo'lda tekshirasiz.
* **Muntazam ifoda (RegEx) usuli:** Sizda sehrli skaner bor. Unga **"avval 3 ta raqam, keyin tire, keyin yana 2 ta raqam"** ko'rinishidagi qolipni (shablonni) o'rgatasiz. Skaner qutidagi barcha qog'ozlarni soniyalar ichida skanerdan o'tkazib, faqat shu qolipga mos keluvchi raqamlarni ajratib beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Satrdan raqamlarni qidirish)
Matn ichida raqamlar bor-yo'qligini tekshirish va ularni olish:
```javascript
const text = "Mening telefon raqamim: 1234567";
const regex = /\d+/; // \d raqamni anglatadi, + esa kamida bitta yoki ko'p degani

console.log(regex.test(text)); // true (tekshirish)
console.log(text.match(regex)); // ["1234567"] (ajratib olish)
```

### 2. Intermediate Example (Matndagi so'zlarni almashtirish)
RegEx yordamida barcha mos keladigan so'zlarni almashtirish:
```javascript
const str = "Men olmani yaxshi ko'raman. Olma juda shirin.";
// 'g' flagi global qidirishni, 'i' esa katta-kichik harf farqlamaslikni bildiradi
const pattern = /olma/gi; 

const newStr = str.replace(pattern, "anor");
console.log(newStr); // "Men anorni yaxshi ko'raman. anor juda shirin."
```

### 3. Advanced Example (Guruhlar yordamida sanani formatlash)
Sana formatini o'zgartirish (masalan, YYYY-MM-DD formatini DD/MM/YYYY ko'rinishiga keltirish):
```javascript
const dateStr = "2026-06-10";
// 4 ta raqam, 2 ta raqam va yana 2 ta raqamni guruhlarga ajratamiz
const datePattern = /(\d{4})-(\d{2})-(\d{2})/;

// $1, $2, $3 - mos ravishda dumaloq qavslar ichidagi guruhlarni bildiradi
const formattedDate = dateStr.replace(datePattern, "$3/$2/$1");
console.log(formattedDate); // "10/06/2026"
```

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Murakkab matn validatsiyasi:** Foydalanuvchi kiritgan email manzili, telefon raqami, pochta indeksi yoki parol xavfsizligini (kamida bitta katta harf, bitta raqam, bitta belgi bo'lishi shartligi) tekshirish uchun loops va if-shartlari yozilsa, kod yuzlab qator bo'lib ketadi va sekin ishlaydi. RegEx buni bitta shablon bilan tez va aniq bajaradi.
2. **Matnlarni qayta ishlash:** Log fayllaridan ma'lumotlarni yig'ish, matn ichidan URL havolalarini qidirib ajratib olish kabi ishlarni RegEx yordamida juda oson hal qilish mumkin.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. `g` (Global) flagini yozishni unutish
Agar `g` flagi qo'yilmasa, `replace` yoki `match` faqat birinchi duch kelgan moslikni oladi va to'xtaydi.
#### Xato:
```javascript
const sentence = "cat, bat, rat, cat";
const result = sentence.replace(/cat/, "dog");
console.log(result); // "dog, bat, rat, cat" (ikkinchisi o'zgarmay qoldi)
```
#### Tuzatish:
```javascript
const result = sentence.replace(/cat/g, "dog");
console.log(result); // "dog, bat, rat, dog"
```

### 2. Maxsus belgilarni ekranlashtirishni (escaping) unutish
`.`, `?`, `*`, `+`, `(`, `)` kabi belgilar RegEx-da maxsus ma'noga ega. Ularni oddiy matn sifatida qidirish uchun oldiga orqa chiziq `\` (backslash) qo'yish shart.
#### Xato:
```javascript
// Nuqta belgisi RegEx-da "istalgan belgi" degan ma'noni beradi
const fileRegex = /photo.jpg/; 
console.log(fileRegex.test("photoAxjpg")); // true qaytadi, chunki nuqta o'rnida A turibdi
```
#### Tuzatish:
```javascript
const fileRegex = /photo\.jpg/; // Nuqta oldiga \ qo'yildi
console.log(fileRegex.test("photoAxjpg")); // false
console.log(fileRegex.test("photo.jpg")); // true
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** RegEx-da `test()` va `match()` metodlarining farqi nimada?
   * **Javob:** `test()` metodi RegExp obyekti metodi bo'lib, true/false qaytaradi. `match()` esa String metodi bo'lib, mos keluvchi matnlarni massiv shaklida qaytaradi (topilmasa null).
2. **Savol:** RegEx flaglari nima va eng ko'p ishlatiladiganlarini ayting?
   * **Javob:** Flaglar qidiruv xatti-harakatini o'zgartiradi. `g` (global qidiruv), `i` (katta-kichik harf farqlamaslik), `m` (ko'p qatorli qidiruv).
3. **Savol:** `\d` va `\D` farqi nimada?
   * **Javob:** `\d` istalgan bitta raqamga mos keladi, `\D` esa raqam bo'lmagan istalgan belgiga mos keladi.
4. **Savol:** `\w` belgilar sinfi nimalarni o'z ichiga oladi?
   * **Javob:** Alfanumerik belgilar: harflar (a-z, A-Z), raqamlar (0-9) va pastki chiziq (`_`).

### Middle (5–8)
5. **Savol:** RegEx-da ochko'zlik (greedy) va kamtar (lazy) qidiruv nima?
   * **Javob:** Greedy (masalan `.*`) maksimal darajada uzun matnni qamrab oladi. Lazy qilish uchun kvantifikatordan keyin `?` qo'yiladi (masalan `.*?`), u eng qisqa mos keluvchi matnni oladi.
6. **Savol:** Capturing group (guruhlash) nima va unga qanday murojaat qilinadi?
   * **Javob:** Shablon ichida qismlarni dumaloq qavs `(...)` ichiga olish orqali guruhlanadi. Ularga replace-da `$1`, `$2` kabi o'zgaruvchilar orqali murojaat qilish mumkin.
7. **Savol:** RegExp konstruktori `new RegExp('pattern')` va `/pattern/` literalining farqi nimada?
   * **Javob:** Literallar dastur yuklanganda kompiyatsiya qilinadi (statik). Konstruktor esa dinamik tarzda, masalan o'zgaruvchi qiymatidan shablon yasash uchun ishlatiladi.
8. **Savol:** `^` belgisi qachon satr boshini, qachon inkor etishni bildiradi?
   * **Javob:** Andoza boshida kelganda (`/^abc/`) satr boshini bildiradi. To'rtburchak qavslar ichida kelganda (`/[^abc]/`) a, b, c dan boshqa istalgan belgini bildiradi.

### Senior (9–12)
9. **Savol:** Lookahead (`(?=...)` va `(?!...)`) va Lookbehind (`(?<=...)` va `(?<!...)`) tushunchalarini tushuntiring.
   * **Javob:** Ular assertion (tasdiqlar) bo'lib, o'zidan oldin yoki keyin ma'lum bir matn bor yoki yo'qligini tekshiradi, lekin u matnni natijaga (match) qo'shmaydi.
10. **Savol:** RegEx-da "Catastrophic Backtracking" (Halokatli qaytish) nima va u qanday xavf tug'diradi?
    * **Javob:** Agar shablon juda murakkab va mos kelmaydigan matn uzun bo'lsa, RegEx dvigateli barcha kombinatsiyalarni tekshirish uchun juda ko'p vaqt sarflaydi. Bu CPU yuklamasini 100% ga chiqarib, dasturni qotirib qo'yishi mumkin (ReDoS hujumi).
11. **Savol:** RegExp obyektidagi `lastIndex` xususiyati nima va u qachon o'zgaradi?
    * **Javob:** Global (`g`) yoki yopishqoq (`y`) flaglari ishlatilganda, `lastIndex` keyingi qidiruv boshlanadigan indeksni ko'rsatadi. Har safar `exec()` yoki `test()` chaqirilganda u yangilanadi.
12. **Savol:** RegEx-da Unicode belgilar bilan ishlashda qaysi flag kerak va nima uchun?
    * **Javob:** `u` (unicode) flagi kerak. Chunki Emoji yoki maxsus belgilar 2-4 bayt joy egallaydi va `u` flagsiz ular noto'g'ri bo'laklarga bo'linib tekshiriladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Parol Kuchini Tekshiruvchi Algoritm (Password Validator)
Saytlarda ro'yxatdan o'tishda parollarni tekshirish uchun RegEx eng qulay vosita hisoblanadi.

```javascript
function checkPasswordStrength(password) {
  // Shartlar:
  // 1. Kamida 8 ta belgi bo'lishi kerak
  // 2. Kamida bitta katta harf bo'lishi kerak
  // 3. Kamida bitta kichik harf bo'lishi kerak
  // 4. Kamida bitta raqam bo'lishi kerak
  // 5. Kamida bitta maxsus belgi (@, $, !, %, *, ?, &) bo'lishi kerak

  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (strongPattern.test(password)) {
    return { status: "Kuchli", valid: true };
  } else {
    return {
      status: "Kuchsiz. Parolda kamida 8 belgi, katta-kichik harflar, raqam va maxsus belgi bo'lishi shart.",
      valid: false
    };
  }
}

console.log(checkPasswordStrength("Simple12")); // valid: false (maxsus belgi yo'q)
console.log(checkPasswordStrength("SecurePass123!")); // valid: true (Kuchli!)
```

---

## 9. 🚀 Performance va Optimization

* **Sikl ichida `new RegExp()` yaratmang:** Agar andoza dinamik ravishda o'zgarmasa, uni sikl tashqarisida e'lon qiling. Har bir sikl aylanishida yangi obyekt yaratish xotira va vaqt talab qiladi.
* **Andozalarni soddalashtiring:** Juda murakkab va bir-birining ichiga kirgan kvantifikatorlardan (masalan `(a+)+`) qoching, chunki ular "Catastrophic Backtracking" xavfini tug'diradi.

---

## 10. 📌 Cheat Sheet

| Belgan / Sinf | Vazifasi | Misol |
| :--- | :--- | :--- |
| `.` | Istalgan bitta belgi (yangi satrdan tashqari) | `/a.c/` -> "abc", "axc" |
| `\d` | Istalgan bitta raqam | `/\d/` -> "5" |
| `\w` | Alfanumerik belgi (harf, raqam, `_`) | `/\w/` -> "a", "3", "_" |
| `\s` | Istalgan bo'shliq belgi (probel, tab) | `/\s/` -> " " |
| `^` | Satr boshlanishi | `/^Hello/` -> "Hello World" |
| `$` | Satr tugashi | `/World$/` -> "Hello World" |
| `*` | 0 yoki undan ko'p marta takrorlanish | `/ab*/` -> "a", "ab", "abbb" |
| `+` | 1 yoki undan ko'p marta takrorlanish | `/ab+/` -> "ab", "abbb" |
| `?` | 0 yoki 1 marta takrorlanish (ixtiyoriy) | `/ab?/` -> "a", "ab" |
| `{n,m}` | Kamida n marta, ko'pi bilan m marta | `/\d{2,4}/` -> "12", "1234" |
| `[a-z]` | Berilgan oraliqdagi istalgan belgi | `/[a-c]/` -> "a", "b", "c" |
| `(abc)` | Guruhlash (capturing group) | `/(\d{2})/` -> guruh 1 |
