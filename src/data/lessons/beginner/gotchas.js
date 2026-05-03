export const jsGotchas = {
  id: "js-gotchas",
  title: "JS Tuzoqlari: Gotchas & Traps",
  theory: `## 1. KIRISH
JavaScript — juda moslashuvchan, lekin ba'zida "mantiqsiz" tuyuladigan til. Bu darsda biz intervyularda eng ko'p so'raladigan va juniorlarni "chuv tushiradigan" g'alati holatlarni ko'rib chiqamiz.

---

## 2. NAZARIY INTERVYU SAVOLLARI

### Q1. Nima uchun 0.1 + 0.2 !== 0.3? ⭐
**Javob:**
JavaScript sonlarni **IEEE 754** standarti bo'yicha ikkilik (binary) sanoq tizimida saqlaydi. 0.1 va 0.2 sonlari ikkilik tizimda cheksiz davriy kasr bo'lgani uchun, ular xotirada ozgina xato bilan saqlanadi.
**Natija:** \`0.1 + 0.2\` aslida \`0.30000000000000004\` ga teng.

### Q2. Type Coercion (Tur o'zgarishi) nima?
**Javob:**
JavaScript bir amalni bajarish uchun turli xil ma'lumot turlarini avtomatik ravishda bir-biriga moslashtirishi.
- \`"5" + 1 = "51"\` (String ustun)
- \`"5" - 1 = 4\` (Ayirishda songa aylanadi)

### Q3. NaN nima va uning turi qanday?
**Javob:**
\`NaN\` (Not a Number) — matematik xato natijasida hosil bo'ladigan qiymat. 
G'alatisi shundaki: \`typeof NaN === "number"\`. Uni tekshirish uchun \`Number.isNaN()\` ishlatiladi.

---

## 3. VIZUAL JADVAL: G'alati natijalar
| Amallar | Natija | Sababi |
|---|---|---|
| \`[] + []\` | \`""\` | Ikkita bo'sh massiv stringga aylanib qo'shiladi |
| \`[] + {}\` | \`"[object Object]"\` | Massiv bo'sh string, obyekt esa string bo'ladi |
| \`{} + []\` | \`0\` | Ba'zi konsollarda {} blok deb olinadi va +[] songa o'giriladi |
| \`true + true\` | \`2\` | Booleanda true = 1 deb olinadi |

---

## 4. AMALIY QISMDAGI TOPSHIRIQLAR
O'ng tomondagi muharrirda intervyuning **amaliy** topshiriqlarini bajarib ko'ring. Barcha topshiriqlar real intervyu savollaridan olingan.
`,
  exercises: [
    {
      id: 1,
      title: "Amaliy: Coercion Tuzog'i",
      instruction: "Intervyu savoli: Quyidagi log natijasi 'false' chiqishi uchun '===' emas, '==' ishlating, lekin nima uchunligini tushunib oling.",
      startingCode: "// Savol: false + 1 nima beradi?\nconst natija = false + 1;\nconsole.log(natija);",
      hint: "Boolean son bilan qo'shilganda songa (false=0, true=1) aylanadi.",
      test: "if (logs.includes('1')) return null; return 'Natija 1 chiqishi kerak (0 + 1)';"
    },
    {
      id: 2,
      title: "Amaliy: Array/Object intervyu",
      instruction: "Bo'sh massiv va bo'sh obyektni qo'shing va natijani ko'ring.",
      startingCode: "const res = [] + {};\nconsole.log(res);",
      hint: "Bu ko'p so'raladigan savol. Natija: '[object Object]'",
      test: "if (logs.includes('[object Object]')) return null; return 'Natija [object Object] chiqishi kerak';"
    }
  ]
};
