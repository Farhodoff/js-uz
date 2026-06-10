## 1. 💡 Sodda Tushuntirish va Analogiya

### Canvas API nima?
**Canvas API (Polotno / Mato)** — bu HTML5 va JavaScript yordamida brauzer sahifasida bevosita 2D shakllar, rasmlar, animatsiyalar hamda o'yin grafikalarini piksellar darajasida dinamik chizish imkonini beruvchi asboblar to'plamidir. Canvas yuqori renderslash tezligiga ega bo'lib, veb-o'yinlar, interaktiv grafiklar (charts) va vizual effektlar yaratishda keng qo'llaniladi.

### Real hayotiy analogiya
Tasavvur qiling, siz **rassomsiz**:
* **`<canvas>` tegi (Mato):** Bu sizning bo'sh oq polotnogiz (matongiz). Unda hali hech narsa yo'q va u shunchaki devorga ilingan.
* **Context (Mo'yqalam va Bo'yoqlar):** `canvas.getContext('2d')` orqali rassomning qo'liga mo'yqalam, chizg'ich va rang-barang bo'yoqlar to'plami (kontekst) beriladi. Rassom shu kontekst metodlari yordamida matoga chizadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (2D Kontekst olish va To'rtburchak chizish)
```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// To'ldirilgan ko'k to'rtburchak chizish
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 150, 100); // x, y, width, height
```

### 2. Intermediate Example (Chiziqlar va Yo'llar - Paths)
Uchburchak chizish orqali chiziqlar bilan ishlash:
```javascript
ctx.beginPath(); // Yangi chizish yo'lini boshlaymiz
ctx.moveTo(75, 50); // Boshlang'ich nuqtaga o'tamiz
ctx.lineTo(100, 75); // Birinchi chiziq
ctx.lineTo(75, 100); // Ikkinchi chiziq
ctx.closePath(); // Boshlang'ich nuqta bilan birlashtirib yo'lni yopamiz

ctx.strokeStyle = "red";
ctx.stroke(); // Faqat chegarasini qizil chizamiz
```

### 3. Advanced Example (Aylana va Animatsiya)
Aylana chizish va uni sahifa bo'ylab harakatlantirish:
```javascript
let x = 50;
let dx = 2; // Harakat tezligi

function animate() {
  // Avvalgi chizmalarni o'chirib tozalaymiz
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.arc(x, 75, 30, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
  ctx.fillStyle = "green";
  ctx.fill();
  
  x += dx; // Koordinatani suramiz
  
  if (x > canvas.width || x < 0) dx = -dx; // Chegaraga yetsa qaytadi
  
  requestAnimationFrame(animate); // Keyingi kadrni rejalashtiramiz
}
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Raster Graphics (Pikselli grafika)
Canvas — bu **raster (pikselli)** chizish maydoni. Siz biror shakl chizganingizda, brauzer o'sha hududdagi piksellar rangini o'zgartiradi xolos.
* **Canvas va SVG farqi:** SVG (Vektorli) har bir chiziqni alohida DOM elementi sifatida saqlaydi (bu sekin ishlaydi, lekin kattalashtirganda sifat buzilmaydi). Canvas esa pikselli bo'lgani uchun DOMni og'irlashtirmaydi (juda tez ishlaydi, lekin kattalashtirganda sifati buziladi).

> [!IMPORTANT]
> Canvas o'lchamlarini (width, height) hech qachon CSS orqali o'zgartirmang. Bu shakllarni cho'zib, sifatini buzib yuboradi. O'lchamlarni HTML atributlari yoki JS orqali (`canvas.width = 500`) o'rnating.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Oddiy diagramma (Bar Chart) chizish loyihasi
Ma'lumotlar massividan ustunli grafik chizish:

```javascript
const data = [100, 150, 80, 200];
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#3498db";

data.forEach((val, index) => {
  const x = 20 + index * 60; // Har bir ustun orasidagi masofa
  const y = canvas.height - val; // Pastdan yuqoriga chizish uchun
  const width = 40;
  const height = val;
  
  ctx.fillRect(x, y, width, height);
});
```

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. `beginPath()` chaqirishni unutish
Agar yangi shakl boshlashdan oldin `beginPath()` chaqirilmasa, keyingi barcha chiziqlar oldingi yo'lga ulanib, oldingilarini ham qayta-qayta chizib yuboradi.
* **Noto'g'ri:**
  ```javascript
  ctx.lineTo(50, 50);
  ctx.stroke();
  // keyingi chizma...
  ctx.lineTo(100, 100);
  ctx.stroke(); // oldingi 50,50 chiziq ham qalinlashib qayta chiziladi
  ```
* **To'g'ri:**
  ```javascript
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 50);
  ctx.stroke();
  
  ctx.beginPath(); // To'liq yangi chizma
  ctx.moveTo(50, 50);
  ctx.lineTo(100, 100);
  ctx.stroke();
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| `getContext('2d')` | Chizish asboblarini olish | `const ctx = canvas.getContext('2d')` |
| `fillRect(x, y, w, h)` | To'ldirilgan to'rtburchak | `ctx.fillRect(0, 0, 50, 50)` |
| `strokeRect(x, y, w, h)` | Chegarali to'rtburchak | `ctx.strokeRect(0, 0, 50, 50)` |
| `beginPath()` | Yangi yo'l / chizmani boshlash | `ctx.beginPath()` |
| `arc(x, y, r, s, e)` | Aylana chizish | `ctx.arc(50, 50, 20, 0, Math.PI * 2)` |

---

## 7. ❓ Savollar va Javoblar

### 1. Canvas ichidagi barcha chizmalarni qanday o'chirib tozalash mumkin?
`ctx.clearRect(0, 0, canvas.width, canvas.height)` metodi orqali canvasdagi barcha piksellar shaffof holatga qaytariladi.

### 2. Canvas-da soya (shadow) qanday qo'shiladi?
Kontekstning `shadowBlur`, `shadowColor`, `shadowOffsetX` va `shadowOffsetY` xususiyatlari orqali chizmalarga dynamic soya berish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Nima uchun Canvas va SVG o'rtasidagi farq renderslash tezligida muhim rol o'ynaydi?
2. Canvas-ning koordinatalar boshi (0, 0) qayerda joylashgan? (Chap yuqori burchakda).
3. `ctx.save()` va `ctx.restore()` metodlari nima vazifani bajaradi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida Canvas API bilan grafikalar chizish ko'nikmalaringizni tekshiring.
