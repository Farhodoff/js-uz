# 📝 Yangi JavaScript Darsini Qo'shish Qo'llanmasi

## Dars Tuzilishi Qoidalari
Har bir dars JavaScript moduli (`src/data/lessons/...`) formatida quyidagi majburiy qismlardan iborat bo'lishi shart:
1. **`id` va `title`:** Unikal identifikator va aniq o'zbekcha sarlavha.
2. **`theory`:** Nazariy tushuntirish, kod misollari va diagrammalar.
3. **`exercises` (kamida 10 ta):**
   - `instruction`: Aniq topshiriq.
   - `startingCode`: Boshlang'ich shablon.
   - `solution`: To'g'ri yechim.
   - `test`: Avtomatik tekshiruvchi test kodi.
4. **`quiz` (kamida 12 ta):**
   - 4 ta variantli ko'p tanlovli test savollari va tushuntirish (`explanation`).
