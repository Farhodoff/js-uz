## 1. 💡 Sodda Tushuntirish va Analogiya

### Audio va Video API nima?
**Audio va Video API (HTMLMediaElement)** — bu brauzerga o'rnatilgan audio (`<audio>`) va video (`<video>`) fayllarni JavaScript yordamida dasturiy boshqarish (o'ynatish, to'xtatish, ovozni sozlash, tezlikni o'zgartirish) imkonini beruvchi interfeysdir.

### Real hayotiy analogiya
Tasavvur qiling, sizda **avtomobil magnitolasi** bor:
* **Tugmalar va datchiklar (Media API):** 
  * `play()` — gazni bosib harakatni boshlash.
  * `pause()` — tormozni bosib vaqtincha to'xtash.
  * `currentTime` — tasmali kassetani qo'lda oldinga yoki orqaga aylantirib vaqtni o'zgartirish.
  * `volume` — ovozni baland qiluvchi aylanma murvat.
  * `timeupdate` (hodisa) — magnitola ekranida har soniyada o'zgarib turadigan elektron soat.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Play va Pause)
```javascript
const myVideo = document.getElementById("my-video");

// Videoni ijro etish (Avtomatik o'ynatish cheklovi sababli promise rad etilishi mumkin)
myVideo.play().catch(error => {
  console.log("Foydalanuvchi ta'siridan oldin avtomatik o'ynatib bo'lmaydi:", error);
});

// 5 soniyadan keyin to'xtatish
setTimeout(() => {
  myVideo.pause();
}, 5000);
```

### 2. Intermediate Example (Ovozsiz qilish va Tezlikni sozlash)
```javascript
const audio = document.getElementById("my-audio");

// Ovozni butunlay o'chirish (Mute)
audio.muted = true;

// Ijro etish tezligini 1.5 barobarga oshirish
audio.playbackRate = 1.5;
```

### 3. Advanced Example (Custom Progress Bar / Vaqt yangilanishi)
Video ijro etilayotgan paytda foydalanuvchiga jarayon foizini ko'rsatish:
```javascript
const video = document.getElementById("video-player");
const progressBar = document.getElementById("progress");

video.addEventListener("timeupdate", () => {
  // O'tgan vaqtni umumiy vaqtga bo'lib foizini topamiz
  const percentage = (video.currentTime / video.duration) * 100;
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
});
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### HTMLMediaElement Interfeysi
Oshxonadagi har xil muzlatgichlar bir xil ish printsipiga ega bo'lgani kabi, `<audio>` va `<video>` teglari ham JavaScript-da bitta umumiy **`HTMLMediaElement`** prototipidan meros oladi. Shuning uchun ulardagi metodlar (`play()`, `pause()`) va xossalar (`volume`, `currentTime`) mutlaqo bir xil ishlaydi.

> [!IMPORTANT]
> **Autoplay Block:** Zamonaviy brauzerlar ovozli videolarni sahifa yuklanishi bilan avtomatik o'ynatishga ruxsat bermaydi. Bunga erishish uchun videoni albatta `muted = true` (ovozsiz) qilib qo'yish kerak.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Video yuklanishidan oldin NaN xatosini oldini olish
Video yuklanishi bilanoq uning umumiy vaqtini (`duration`) o'qishga harakat qilsak, `NaN` (Not a Number) qaytadi. Chunki brauzer hali fayl haqidagi metama'lumotlarni yuklab ulgurmagan bo'ladi.

#### To'g'ri yechim:
```javascript
const video = document.createElement("video");
video.src = "movie.mp4";

// Metadata yuklanishini kutamiz
video.addEventListener("loadedmetadata", () => {
  console.log(`Videoning umumiy davomiyligi: ${video.duration} soniya`);
});
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Ovoz balandligini belgilangan chegaradan tashqari berish
Ovoz balandligi faqat `0.0` va `1.0` oralig'ida bo'lishi mumkin.
* **Noto'g'ri:**
  ```javascript
  audio.volume = 1.5; // IndexSizeError! (Xatolik otiladi)
  ```
* **To'g'ri:**
  ```javascript
  audio.volume = 0.8; // 80% ovoz balandligi
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xossa | Vazifasi | Qiymat turi / Natija |
| :--- | :--- | :--- |
| `play()` | Ijroni boshlash | Qaytaradi: `Promise` |
| `pause()` | Ijroni vaqtincha to'xtatish | Qaytaradi: `void` |
| `currentTime` | Joriy vaqtni boshqarish | Soniyalarda (o'qish/yozish) |
| `duration` | Umumiy vaqtni bilish | Soniyalarda (faqat o'qish) |
| `volume` | Ovoz balandligi | `0.0` dan `1.0` gacha |
| `playbackRate` | Ijro tezligi | `1` - normal, `2` - ikki barobar tez |

---

## 7. ❓ Savollar va Javoblar

### 1. `muted = true` va `volume = 0` o'rtasida qanday farq bor?
`muted = true` ovozni o'chiradi, ammo original ovoz balandligini saqlab qoladi (qayta yoqqanda avvalgi ovoz balandligi tiklanadi). `volume = 0` esa ovoz darajasini nolga tushiradi.

### 2. Video tugagan paytda qanday hodisa (event) yordamida JavaScript reaksiya bildiradi?
`'ended'` hodisasi yordamida. Masalan, video tugagach, avtomatik keyingi darsga o'tishni rejalashtirish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qanday qilib video elementini sahifa ochilishi bilanoq avtomatik o'ynatish mumkin?
2. `loadedmetadata` hodisasi nima uchun kerak?
3. `playbackRate` qiymatini `0.5` ga tenglasak nima sodir bo'ladi? (Video 2 barobar sekinlashadi).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida media elementlarini boshqarish ko'nikmalaringizni sinab ko'ring.
