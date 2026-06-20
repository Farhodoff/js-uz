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
      const isWindowAiAvailable = window.ai && (window.ai.languageModel || window.ai.createTextSession);
      
      if (!isWindowAiAvailable) {
        setAiAnswer("⚠️ Kechirasiz, sizning brauzeringizda o'rnatilgan AI (Gemini Nano) yoqilmagan. Uni yoqish uchun Chrome'da:\n1. **chrome://flags** manziliga kiring.\n2. **Prompt API for Gemini Nano** ni izlang va **Enabled** qiling.\n3. **Enables optimization guide on device** parametrini ham yoqing.\n4. Brauzerni qayta ishga tushiring.");
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

      let session;
      if (window.ai.languageModel) {
        session = await window.ai.languageModel.create();
      } else {
        session = await window.ai.createTextSession();
      }

      const response = await session.prompt(promptText);
      setAiAnswer(response || "Javob olinmadi.");
      
    } catch (e) {
      setAiAnswer("❌ AI ishga tushishida xatolik: " + e.message + "\n\nModel hali qurilmangizga yuklanmagan bo'lishi mumkin. Iltimos, **chrome://components** manziliga kirib, **Optimization Guide On Device Model** ni toping va **Check for update** tugmasini bosing.");
    }
    
    setAiLoading(false);
  }, [aiQuestion]);

  const clearAnswer = useCallback(() => {
    setAiAnswer('');
    setAiQuestion('');
  }, []);

  return { aiQuestion, setAiQuestion, aiAnswer, aiLoading, askAI, clearAnswer };
}
