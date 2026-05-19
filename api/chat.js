/* eslint-env node */
// Vercel serverless function: API kalitni xavfsiz saqlash va DeepSeek API'ga chaqirish
export default async function handler(req, res) {
  // CORS so'rovlar uchun preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.body) {
    return res.status(400).json({ error: "Savol bo'sh bo'lishi mumkin emas" });
  }

  const { question, lesson } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Savol bo'sh bo'lishi mumkin emas" });
  }

  // Savol uzunligini cheklash
  if (question.length > 2000) {
    return res.status(400).json({ error: "Savol juda uzun (max 2000 belgi)" });
  }

  // VITE_ prefikssiz — faqat server-side'da mavjud
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('DEEPSEEK_API_KEY missing');
    return res.status(500).json({ error: 'Server taraflama xato' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: "Siz JavaScript o'qituvchisisiz. Javobni Markdown formatida, o'zbek tilida bering."
          },
          {
            role: 'user',
            content: `Mavzu: ${lesson || 'Umumiy'}. Savol: ${question}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DeepSeek API error:', errorData);
      return res.status(response.status).json({ error: 'DeepSeek API xatosi' });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Javob olinmadi';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ answer });
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: 'Tarmoq xatosi' });
  }
}
