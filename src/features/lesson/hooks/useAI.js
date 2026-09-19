import { useState, useCallback } from 'react';

export function useAI() {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const askAI = useCallback(async (lessonTitle, activeCode = '') => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer('');
    
    try {
      const apiKey = localStorage.getItem('gemini_api_key');
      
      if (!apiKey) {
        setAiAnswer("⚠️ Kechirasiz, AI dan foydalanish uchun pastdagi maydonga o'zingizning bepul **Gemini API Key** kalitingizni kiriting. U faqat shu brauzerda xavfsiz saqlanadi.");
        setAiLoading(false);
        return;
      }

      const promptText = `Siz o'zbek tilida gaplashadigan JS-UZ dasturlash platformasining dasturlash bo'yicha yordamchisisiz. Foydalanuvchiga qisqa va aniq javob bering.
Dars mavzusi: ${lessonTitle || 'Umumiy'}
Foydalanuvchi kodi:
\`\`\`javascript
${activeCode}
\`\`\`
Savol: ${aiQuestion}`;

      // Dynamically find a valid model to avoid "not found" errors
      const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const modelsData = await modelsRes.json();
      if (modelsData.error) throw new Error(modelsData.error.message);
      
      const availableModels = modelsData.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      // Prefer a flash model, fallback to any available model
      let selectedModel = availableModels.find(m => m.name.includes("flash"));
      if (!selectedModel) selectedModel = availableModels[0];
      
      if (!selectedModel) throw new Error("Qo'llab-quvvatlanadigan model topilmadi.");

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${selectedModel.name}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      
      setAiAnswer(data.candidates[0].content.parts[0].text || "Javob olinmadi.");
      
    } catch (e) {
      setAiAnswer("❌ AI ishga tushishida xatolik: " + e.message);
    }
    
    setAiLoading(false);
  }, [aiQuestion]);

  const clearAnswer = useCallback(() => {
    setAiAnswer('');
    setAiQuestion('');
  }, []);

  return { aiQuestion, setAiQuestion, aiAnswer, aiLoading, askAI, clearAnswer };
}
