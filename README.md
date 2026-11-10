<div align="center">

# 🎓 JS Academy (js-uz)
### O'zbek tilida JavaScript va zamonaviy Web dasturlashni interaktiv o'rganish platformasi

<p align="center">
  <strong>280+ interaktiv dars, Monaco Editor (brauzerda jonli kod yozish), 900+ mashq va testlar, DeepSeek AI repititor hamda qulay progress nazorati.</strong>
</p>

[![Live Demo](https://img.shields.io/badge/Live_Demo-js--uz.vercel.app-blue?style=for-the-badge&logo=vercel)](https://js-uz.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Core-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![DeepSeek AI](https://img.shields.io/badge/AI_Assistant-DeepSeek-4D6BFE?style=for-the-badge)](https://www.deepseek.com/)

<br />

[🌐 Jonli Platforma](https://js-uz.vercel.app) • [✨ Xususiyatlar](#-xususiyatlar) • [🏗️ Texnologiyalar](#️-texnologiyalar) • [🚀 O'rnatish](#-ornatish) • [📁 Loyiha Tuzilmasi](#-loyiha-tuzilmasi) • [👤 Muallif](#-muallif)

</div>

---

## 💡 Loyiha Haqida

**JS Academy** — JavaScript dasturlash tilini **o'zbek tilida** noldan boshlab bosqichma-bosqich o'rganish uchun maxsus ishlab chiqilgan to'liq interaktiv ta'lim platformasi. O'quv rejasi [roadmap.sh/javascript](https://roadmap.sh/javascript) xalqaro yo'l xaritasi asosida tizimlashtirilgan.

Foydalanuvchilar faqat nazariyani o'qibgina qolmay, har bir darsda integratsiya qilingan Monaco Editor orqali bevosita brauzerda kod yozadi, avtomatik testlar yordamida natijani tekshiradi va tushunarsiz savollar yuzasidan o'rnatilgan DeepSeek AI yordamchisidan tushuntirish oladi.

---

## ✨ Asosiy Xususiyatlar

- 📚 **280+ interaktiv dars** — JavaScript asoslaridan boshlab Professional darajagacha (React, Node.js, TypeScript, SQL, Algoritmlar va Ma'lumotlar tuzilmalari, System Design).
- 💻 **Live Monaco Code Editor** — VS Code yadrosidagi kod muharriri, Web Worker asosidagi cheksiz sikllardan himoyalangan xavfsiz kod yurgizgich.
- 📝 **Har bir darsda kompleks yondashuv** — Nazariya + 10 ta amaliy mashq + 12 ta test savoli.
- 🏆 **900+ Challenges** — Dasturchi tafakkurini charxlovchi boy topshiriqlar banki.
- 🤖 **DeepSeek AI Repititor** — O'zbek tilida kod tahlili, xatolarni ko'rsatish va yo'l-yo'riq beruvchi aqlli yordamchi.
- 📊 **Progress Tracking** — Har bir dars va test natijalari avtomatik saqlanib boruvchi qulay monitoring (Zustand + LocalStorage).
- 📱 **PWA + To'liq Moslashuvchanlik (Responsive)** — Mobil telefon, planshet va kompyuterlarda birdek qulay ishlash.

---

## 🏗️ Texnologik Stack

| Texnologiya | Vazifasi va Qo'llanishi |
|---|---|
| **React 18** | Foydalanuvchi interfeysi (UI framework) |
| **Vite** | Zamonaviy va tezkor frontend build tool |
| **React Router v6** | Client-side marshrutlash |
| **Monaco Editor** | Brauzerdagi professional kod muharriri |
| **Web Workers** | Kodni xavfsiz va alohida oqimda testdan o'tkazish |
| **ReactMarkdown & Mermaid** | Dars matnlari va texnik diagrammalarni vizuallashtirish |
| **Zustand** | Holat (state) va o'rganish natijalarini boshqarish |
| **DeepSeek API** | O'zbek tilida yordam beruvchi AI model |
| **Vercel** | Hosting & Serverless API funksiyalari |

---

## 🚀 Loyal Muhitda O'rnatish va Ishga Tushirish

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/Farhodoff/js-uz.git
cd js-uz

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Muhit o'zgaruvchilarini sozlash
cp .env.example .env
# .env fayliga o'zingizning DEEPSEEK_API_KEY kalitingizni kiriting

# 4. Development serverni ishga tushirish
npm run dev

# 5. Sinovlar va ishlab chiqarish (production) build
npm test
npm run build
```

---

## 📁 Loyiha Tuzilmasi

```text
src/
├── components/         # React komponentlar (Sidebar, TheoryTab, PracticeTab, QuizTab, ...)
├── hooks/              # useLesson, useCodeRunner, useAI, useResizable
├── store/              # Zustand store (progress localStorage'da)
├── workers/            # Kod runner Web Worker (cheksiz sikl himoyasi bilan)
├── utils/              # loopGuard va boshqa yordamchi utillar
└── data/
    ├── curriculum.js       # JavaScript yo'nalishi (bo'limlar + darslar ro'yxati)
    ├── reactCurriculum.js  # React yo'nalishi
    ├── challenges.js       # 900+ challenges banki
    └── lessons/            # Dars kontentlari
        ├── beginner/ ... advanced/   # JS asosiy yo'nalishi
        ├── react/, react-projects/   # React yo'nalishi
        ├── nodejs/, typescript/, sql/, algorithms/,
        │  system-design/, ecosystem/, soft-skills/,
        │  projects/, challenges/     # Qo'shimcha yo'nalishlar
api/
└── chat.js             # Vercel serverless (DeepSeek proxy)
```

---

## 👤 Muallif

**[Farhodoff](https://github.com/Farhodoff)** — Full-stack & AI Developer.

---

## 📝 Litsenziya

Ushbu loyiha [MIT](LICENSE) litsenziyasi asosida ochiq taqdim etiladi.