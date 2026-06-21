# 7-qadam: React Hooklari va useEffect'ga Chuqur Sho'ng'ish

React'ning eng kuchli xususiyatlaridan biri bu **Hook**lardir. Ular funksional komponentlarga "kuch" bag'ishlaydi. Ushbu darsda biz Hooklar tushunchasi va ayniqsa, `useEffect` bilan mukammal ishlashni o'rganamiz.

---

## Hooklar o'zi nima?

**Hooklar** (ilmoqlar) – bu React'ning "state" (holat) va hayot sikli xususiyatlariga "ilinish" (ulanish) imkonini beruvchi maxsus funksiyalardir. Ularsiz funksional komponentlar shunchaki ma'lumot qabul qilib, UI qaytaradigan oddiy va "xotirasiz" funksiyalar bo'lar edi. Hooklar yordamida esa biz komponentlarga xotira (`useState`) va tashqi dunyo bilan ishlash qobiliyatini (`useEffect`) qo'shamiz.

> **Analogiya:** Tasavvur qiling, sizning komponentingiz - bu oddiy bir xona. Hooklar - bu shu xonaga elektr toki, suv yoki internet olib kiruvchi kabellar va quvurlardir. Siz kerakli "hook"ni chaqirish orqali o'sha xonani jonlantirasiz.

### Nega kerak?
Eski React'da murakkab ishlarni faqat Klass (Class) komponentlari yordamida qilish mumkin edi. Bu esa kodni o'qishni va yozishni qiyinlashtirardi (masalan, `this` kalit so'zi bilan bog'liq chalkashliklar). Hooklar bizga butun ilovani oddiy, toza va tushunarli funksiyalar orqali yozish imkonini berdi.

---

## Hooklarning Oltin Qoidalari (Rules of Hooks)

Hooklardan foydalanishning qat'iy qoidalari mavjud. Agar bu qoidalarni buzsangiz, React xatoga uchraydi.

1. **Faqat eng yuqori darajada chaqiring (Top-level only):** 
   Hooklarni tsikllar (`for`, `while`), shartlar (`if`, `else`) yoki ichki funksiyalar ichida chaqirmang. Har safar komponent render bo'lganda, Hooklar aniq bir xil tartibda chaqirilishi kerak.

   ❌ **Yomon amaliyot (Don't):**
   ```javascript
   if (isUserLoggedIn) {
     const [name, setName] = useState("Ali"); // Xato! Shart ichida Hook ishlatish mumkin emas.
   }
   ```

   ✅ **Yaxshi amaliyot (Do):**
   ```javascript
   const [name, setName] = useState("Ali"); // To'g'ri! Komponentning eng yuqori qismida.
   if (isUserLoggedIn) {
     // endi nimadir qilish mumkin
   }
   ```

2. **Faqat React funksiyalaridan chaqiring:**
   Hooklarni oddiy JavaScript funksiyalaridan chaqirmang. Ularni faqat React funksional komponentlaridan yoki o'zingiz yaratgan "Custom Hook" (Maxsus hook)lardan chaqirishingiz mumkin.

---

## useEffect Hookiga Chuqur Sho'ng'ish

React'da `useEffect` - bu komponentingizni tashqi tizimlar bilan sinxronlashtirish uchun mo'ljallangan hook. "Tashqi tizim" deganda internetdan ma'lumot yuklab olish (API fetch), brauzer hujjatini (DOM) o'zgartirish, taymerlar (setTimeout) o'rnatish yoki boshqa kutubxonalar bilan ishlash tushuniladi.

### Komponent Hayot Sikli (Component Lifecycle)

Har bir React komponentining xuddi odamlar kabi o'z "hayot sikli" mavjud:
1. **Tug'ilish (Mounting):** Komponent birinchi marta ekranda paydo bo'ladi.
2. **O'zgarish (Updating):** Komponentning `state` yoki `props` lari o'zgaradi va u qayta chiziladi (re-render).
3. **O'lim (Unmounting):** Komponent ekrandan o'chiriladi.

Biz `useEffect` yordamida mana shu 3 ta bosqichning har biriga reksiya bildirishimiz mumkin.

#### Hayot sikli va useEffect qaramliklari (Mermaid diagram)

```mermaid
graph TD
    A([Komponent ekranga chiqdi - Mount]) --> B{useEffect qaramliklari qanday?}
    
    B -->|Qaramlik massivi yo'q| C[Har bir renderdan keyin ishlaydi]
    B -->|Bo'sh massiv: [ ]| D[Faqat 1 marta, boshida ishlaydi]
    B -->|Massivda elementlar: [x, y]| E[Faqat x yoki y o'zgarsa ishlaydi]
    
    C --> F((Komponent yangilanadi - Update))
    E --> F
    
    F -.-> G{State yoki Props o'zgardi}
    G --> B
    
    D --> H([Komponent ekrandan o'chmoqda - Unmount])
    C -.-> |"Cleanup ishga tushadi"| H
    E -.-> |"Cleanup ishga tushadi"| H
    
    H --> I((Cleanup funksiyasi ishlaydi))
```

---

## Qaramliklar Massivi (The Dependency Array)

`useEffect` ikkita argument qabul qiladi:
1. Bajarilishi kerak bo'lgan funksiya (Effect).
2. Qaramliklar massivi (Dependency array) - opsional.

Mana shu 2-argument sizning effektingiz qachon va necha marta ishlashini hal qiladi. Bu eng ko'p xato qilinadigan joy!

### 1. Hech narsa berilmasa (Massiv yo'q)
Agar siz qaramliklar massivini umuman yozmasangiz, sizning effektingiz **har bir renderdan so'ng** ishlayveradi.

```javascript
useEffect(() => {
  console.log("Men har safar komponent o'zgarganda ishlayman!");
}); // E'tibor bering, vergul va massiv yo'q
```

### 2. Bo'sh massiv `[]` (Tug'ilish / Mount)
Agar bo'sh massiv bersangiz, React bu effektni komponent **faqatgina birinchi marta yaratilganda** (Mount) 1 marta ishlatadi, boshqa hech qachon ishlatmaydi. Odatda API dan dastlabki ma'lumotlarni tortish uchun (fetch) ishlatiladi.

```javascript
useEffect(() => {
  console.log("Men faqatgina 1 marta, eng boshida ishlayman!");
}, []); // Bo'sh massiv
```

### 3. To'ldirilgan massiv `[var1, var2]` (O'zgarish / Update)
Massiv ichiga qandaydir o'zgaruvchilarni (state yoki props) solsangiz, React faqatgina shu o'zgaruvchilardan biri o'zgargandagina effektni qayta ishga tushiradi.

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  console.log(`Count qiymati o'zgardi: ${count}`);
}, [count]); // Faqat 'count' o'zgarganda ishlaydi
```

---

## Cheksiz Tsikllar Tuzog'i (Infinite Loops Trap)

React dasturchilari o'z faoliyati davomida kamida bir marta (ko'pincha yuzlab marta) cheksiz tsikl tuzog'iga tushishadi. Bu brauzerni qotib qolishiga olib keladi.

### Qanday qilib bu yuzaga keladi?
Agar siz `useEffect` ichida biror `state`ni o'zgartirsangiz va `useEffect` shu `state` o'zgarganda ishlashga sozlangan bo'lsa (yoki qaramliklar massivi umuman berilmagan bo'lsa), ular bir-birini cheksiz chaqirishni boshlaydi.

> **Analogiya:** Bu xuddi kuchukka o'z dumini tishlashini aytishga o'xshaydi. U dumiga yetib olganda yana aylanib ketaveradi va hech qachon to'xtamaydi.

❌ **Yomon amaliyot (Cheksiz tsikl):**
```javascript
const [counter, setCounter] = useState(0);

useEffect(() => {
  // XATO! Effect har renderda ishlaydi, va o'zi ham re-render chaqiryapti!
  setCounter(counter + 1); 
});
```
*Tushuntirish: Komponent render bo'ladi -> useEffect ishlaydi -> counter + 1 ga o'zgaradi -> State o'zgargani uchun komponent qayta render bo'ladi -> useEffect yana ishlaydi -> va h.k. cheksiz!*

✅ **Yaxshi amaliyot:**
```javascript
const [counter, setCounter] = useState(0);

// Faqatgina biz xohlagan qat'iy holatda ishlaydi (masalan, faqat boshida)
useEffect(() => {
  const timer = setTimeout(() => {
    setCounter((prev) => prev + 1);
  }, 1000);
  
  return () => clearTimeout(timer); // Tozalash (Cleanup)
}, []); // Yoki faqatgina biror aniq shart asosida ishlaydigan qilib sozlash
```

---

## Tozalash Funksiyalari (Cleanup Functions)

`useEffect` sizga funksiya ichidan yana bir funksiya qaytarishga imkon beradi. Bu **Tozalash funksiyasi (Cleanup function)** deb ataladi.

### Nega kerak?
Ba'zi effektlar "iz" qoldiradi. Masalan, siz setInterval bilan taymer yoqdingiz yoki qandaydir hodisani tinglashni boshladingiz (`window.addEventListener`). Agar komponent ekrandan o'chirilsa (Unmount), u taymerlar orqada ishlayveradi va xotira sizib chiqishiga (Memory Leak) hamda xatolarga olib keladi.

> **Analogiya:** Siz mehmonxona xonasini ijaraga oldingiz (Mount). Xonada musiqa qo'yib berishini so'radingiz (Effect). Mehmonxonadan chiqib ketayotganingizda (Unmount), musiqani o'chirib ketishingiz kerak, aks holda u kimsasiz xonada bo'shga jiringlab yotaveradi (Memory Leak).

### Qachon ishlaydi?
1. Komponent ekrandan butunlay o'chirilishidan oldin (Unmount).
2. Effekt keyingi marta qayta ishga tushishidan oldin (oldingi effektning qoldiqlarini tozalash uchun).

❌ **Yomon amaliyot (Tozalamaslik):**
```javascript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Agar foydalanuvchi sahifadan chiqib ketsa, bu "listener" brauzer xotirasida osilib qoladi!
}, []);
```

✅ **Yaxshi amaliyot (Tozalash bilan):**
```javascript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup funksiyasi:
  return () => {
    window.removeEventListener('resize', handleResize);
    console.log("Listener tozalandi!");
  };
}, []);
```

### Xulosa
Hooklar qoidalariga amal qiling. `useEffect` dagi qaramliklar massiviga (`[]`) doim e'tibor qarating, chunki kodning ishlash mantig'i va tezligi to'g'ridan-to'g'ri unga bog'liq. Har doim ishlatilgan obunalar (subscriptions) yoki taymerlarni "Cleanup" qilishni unutmang!
