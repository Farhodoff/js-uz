export const advancedFetch = {
  id: "a19",
  title: "Ilg'or Fetch: Timeout, Retry va Xatolar",
  theory: `## 1. KIRISH
Oddiy \`fetch()\` faqat internet o'chsa yoki server topilmasa xato (reject) beradi. Agar server 404 yoki 500 xato bersa ham, \`fetch\` uni "muvaffaqiyatli" deb hisoblaydi. Real loyihalarda bizga bunday "baxtli yakunlar" yetarli emas.

## 2. CHUQUR TUSHUNCHALAR

### Request Timeout (AbortController)
Agar so'rov juda uzoq davom etsa (masalan 5 soniya), uni to'xtatish kerak. Aks holda foydalanuvchi cheksiz kutib qoladi.

### Retry Mexanizmi
Internet uzilib qolsa yoki server vaqtinchalik ishlamasa, avtomatik ravishda qayta so'rov yuborish.

### HTTP Xatolarni Tekshirish
\`res.ok\` xususiyati orqali status kod 200-299 oralig'ida ekanligini tekshirish shart.

---

## 3. KOD MISOLLARI

### Misol 1 — Request Timeout (AbortController) ⭐
\`\`\`javascript
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error("Vaqt tugadi (Timeout)!");
    }
    throw err;
  }
}
\`\`\`

### Misol 2 — Retry (Qayta urinish) Mexanizmi
\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Server xatosi: " + res.status);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(\`Qayta urinish... (\${i + 1})\`);
    }
  }
}
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Xatolarni Boshqarish Oqimi
\`\`\`mermaid
graph TD
    A[Fetch Request] --> B{Tarmoq bormi?}
    B -- Yo'q --> C[catch: Network Error]
    B -- Ha --> D{res.ok?}
    D -- Yo'q 404/500 --> E[throw: Custom Error]
    D -- Ha 200 --> F[res.json]
    F --> G[Muvaffaqiyat ✅]
\`\`\`

---

## 5. INTERVYU SAVOLLARI
1. **Fetch qachon reject bo'ladi?** - Faqat tarmoq xatosi bo'lganda (internet yo'qligi). HTTP 404/500 xatolarida reject bo'lmaydi.
2. **AbortController nima uchun kerak?** - Ishlab turgan fetch so'rovini istalgan vaqtda (masalan, timeout bo'lganda) to'xtatish uchun.
3. **Promise.race() bilan timeout qilsa bo'ladimi?** - Bo'ladi, lekin u so'rovni to'xtatmaydi, shunchaki natijani kutmaydi. \`AbortController\` esa haqiqatda so'rovni uzadi.

---

## 6. MINI LOYIHA: "Robust API Client"
**Vazifa:** Xavfsiz fetch funksiyasini yozing.

\`\`\`javascript
async function secureGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
       throw new Error(\`HTTP xatosi! Status: \${res.status}\`);
    }
    return await res.json();
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
}
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "res.ok tekshiruvi",
      instruction: "Fetch so'rovida res.ok false bo'lsa, xato tashlaydigan (throw) kod yozing.",
      startingCode: "fetch(url).then(res => {\n  // Bu yerda tekshiring\n});",
      hint: "if (!res.ok) throw new Error('Xato');",
      test: "if (code.includes('res.ok')) return null; return 'res.ok xususiyatini tekshiring';"
    }
  ]
};
