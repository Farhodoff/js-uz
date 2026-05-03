export const jsWhat = {
  id: "js-introduction",
  title: "JavaScriptga Kirish",
  theory: `## 1. NEGA VA NIMA?
Tasavvur qiling, sizda chiroyli mashina bor (bu **HTML** va **CSS**). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni "jonlantirish" uchun sizga dvigatel va miya kerak. Veb-saytlar uchun bu "miya" — **JavaScript**dir!

**JavaScript** (JS) — bu veb-sahifalarni "jonlantiradigan" dasturlash tilidir. Agar saytni bir odam deb tasavvur qilsak, HTML — uning suyagi, CSS — uning kiyimi va tashqi ko'rinishi, JavaScript esa uning **miyasi** va harakatlaridir.

## 1. NEGA kerak?
Tasavvur qiling, sizda chiroyli mashina bor (bu HTML va CSS). Lekin u yurmaydi, chiroqlari yonmaydi va signali ishlamaydi. Uni harakatga keltirish uchun sizga dvigatel kerak. Saytlarda bu vazifani JavaScript bajaradi. Tugmalar bosilganda nima sodir bo'lishi, animatsiyalar, ma'lumotlarni yuklash — hammasi JS orqali qilinadi.

## 2. SODDALIK (Analogiya)
JSni **sehrli tayoqcha** deb tasavvur qiling. Saytdagi istalgan elementga tegib, uni o'zgartirishingiz, yo'qotib yuborishingiz yoki harakatga keltirishingiz mumkin. Eng yaxshi tomoni — bu tayoqchani ishlatish uchun sizga faqat **Brauzer** (Chrome, Safari) kerak, xolos!

## 3. STRUKTURA (Qayerda ishlaydi?)

### A. Brauzer Konsoli
Bu eng tezkor kod yozish joyi. Brauzerda \`F12\`ni bosib, "Console" bo'limiga o'tsangiz, darhol JS kodini yozishingiz mumkin.

### B. console.log() – Sizning birinchi buyrug'ingiz
Bu buyruq kompyuterga: "Menga mana shu ma'lumotni ko'rsat!" degan ma'noni beradi.
\`\`\`javascript
console.log("Assalomu alaykum, JS olami!");
console.log(10 + 20); // 30
\`\`\`

## 4. AMALIYOT (Mashq)
Hozirroq brauzer konsolini oching va quyidagi kodni yozing:
\`\`\`javascript
alert("Men JS o'rganishni boshladim!");
\`\`\`
Ekranda oyna chiqdimi? Tabriklayman, siz birinchi JS kodingizni yozdingiz!

## 5. XATOLAR (Common mistakes)
1. **Harfga sezgirlik:** \`Console.log\` (Katta harf bilan) deb yozsangiz, JS uni tushunmaydi. Doim kichik harfda \`console.log\` deb yozing.
2. **Qo'shtirnoqlar:** Matnlarni doim \`" "\` yoki \`' '\` ichiga oling. Agar \`console.log(Salom)\` deb yozsangiz (qo'shtirnoqsiz), JS \`Salom\`ni o'zgaruvchi deb o'ylaydi va xato beradi.

## 6. SAVOLLAR (12 ta)
1. JavaScript nima?
2. Sayt qurilishida JSning o'rni qanday?
3. JS faqat brauzerdami yoki serverda ham ishlaydimi?
4. \`console.log()\` nima uchun kerak?
5. \`alert()\` funksiyasi nima qiladi?
6. JS kodi qayerda (qaysi faylda) yoziladi?
7. Brendan Eich kim va u nima qilgan?
8. Nima uchun JS "Dynamic" til deyiladi?
9. JS harflar (katta/kichik) farqiga boradimi?
10. \`console.error()\` nima uchun ishlatiladi?
11. Matnni qo'shtirnoqsiz yozsa nima bo'ladi?
12. Birinchi JS versiyasi nechanchi yilda chiqqan?`,
  exercises: [
    {
      id: 1,
      title: "Salom Berish",
      instruction: "Konsolga 'Salom Dunyo' matnini chiqaring.",
      startingCode: "// Kodni shu yerda yozing\n",
      hint: "console.log('Salom Dunyo');",
      test: "if (logs.includes('Salom Dunyo')) return null; return 'Konsolga chiqmagan!';"
    }
  ]
};
