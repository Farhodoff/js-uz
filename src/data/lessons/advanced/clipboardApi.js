export const clipboardApi = {
  title: "Clipboard API: Nusxalash va Joylash",
  content: `
Veb-saytlarda "Nusxa olish" (Copy) tugmalari juda ko'p uchraydi. Ilgari bu ish \`document.execCommand('copy')\` orqali qilingan bo'lsa, hozirgi kunda xavfsizroq va zamonaviyroq **Clipboard API** ishlatiladi.

Clipboard API brauzerning \`navigator.clipboard\` obyekti orqali ishlaydi va har doim Asinxron (Promise qaytaruvchi) tarzda ishlaydi.

### 1. Matnni xotiraga nusxalash (Copy)
Eng ko'p ishlatiladigan xususiyat — biror matnni foydalanuvchi xotirasiga (Clipboard) nusxalash.

\`\`\`javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Matn muvaffaqiyatli nusxalandi!");
  } catch (err) {
    console.error("Nusxalashda xatolik yuz berdi:", err);
  }
}

// Tugmaga ulash
document.getElementById('copyBtn').addEventListener('click', () => {
  copyToClipboard("Salom, Dunyo!");
});
\`\`\`

### 2. Xotiradan o'qish (Paste)
Foydalanuvchi nusxa olgan narsasini saytingizdagi maxsus maydonga "Paste" qilmasdan turib, to'g'ridan-to'g'ri uning xotirasidagi matnni JS orqali o'qish imkoniyati ham bor (Foydalanuvchi bunga ruxsat berishi kerak).

\`\`\`javascript
async function readFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Xotiradagi matn: ", text);
    return text;
  } catch (err) {
    console.error("Xotiradan o'qishga ruxsat yo'q yoki xato:", err);
  }
}
\`\`\`

### 3. Rasmlarni nusxalash (write)
Clipboard API nafaqat matn, balki rasmlarni (Blob formatida) ham nusxalashga ruxsat beradi.

\`\`\`javascript
async function copyImageToClipboard(imageUrl) {
  try {
    // Rasmni fetch qilib blob formatiga o'tkazamiz
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Uni ClipboardItem'ga o'rab xotiraga yozamiz
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    console.log("Rasm nusxalandi!");
  } catch (err) {
    console.error("Rasm nusxalashda xatolik:", err);
  }
}
\`\`\`

### 4. Xavfsizlik qoidalari
Clipboard API juda kuchli vosita bo'lgani uchun brauzerlar xavfsizlik choralarini ko'rishadi:
1. U faqat **HTTPS** (yoki localhost) tizimlarida ishlaydi.
2. \`writeText\` va \`readText\` odatda bevosita foydalanuvchining hatti-harakati (masalan, "Click" hodisasi) ichida chaqirilishi kerak. O'z-o'zidan (avtomatik) chaqirib qo'yilsa brauzer uni bloklaydi.
3. \`readText\` ishlatilganda brauzer foydalanuvchidan ruxsat so'rashi (Permission prompt) mumkin.

### Xulosa
Clipboard API bilan "Bir marta bosish orqali nusxalash" kabi User Experience (UX) jihatdan juda muhim bo'lgan qulayliklarni qo'shishingiz mumkin. Faqatgina Promise'lar bilan ishlashni va xavfsizlik cheklovlarini yodda tutsangiz bas.
  `,
  exercises: [
    {
      id: "clipboard-1",
      title: "Matnni nusxalovchi funksiya",
      description: `Quyidagi \`copyToBuffer\` funksiyasi \`text\` qabul qiladi. Uni navigator.clipboard yordamida nusxalang va Promise qaytaring.`,
      initialCode: `function copyToBuffer(text) {
  // navigator.clipboard'dan foydalaning
  
}`,
      solution: `function copyToBuffer(text) {
  return navigator.clipboard.writeText(text);
}`,
      tests: [
        {
          test: `
          let copiedText = "";
          globalThis.navigator = {
            clipboard: {
              writeText: (t) => { copiedText = t; return Promise.resolve(true); }
            }
          };
          copyToBuffer("test");
          return copiedText === "test";`,
          description: "navigator.clipboard.writeText to'g'ri matn bilan chaqirilishi kerak"
        }
      ]
    }
  ]
};
