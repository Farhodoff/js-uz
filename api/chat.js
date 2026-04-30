/* eslint-env node */
// Vercel serverless function: API kalitni xavfsiz saqlash va Gemini API'ga chaqirish
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

  const { question, lesson } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Savol bo\'sh bo\'lishi mumkin emas' });
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('VITE_GEMINI_API_KEY missing');
    return res.status(500).json({ error: 'Server taraflama xato' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Siz JavaScript o'qituvchisisiz. Mavzu: ${lesson || 'Umumiy'}. Savol: ${question}. O'zbek tilida javob bering.`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ error: 'Gemini API xatosi' });
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Javob olinmadi';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ answer });
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: 'Tarmoq xatosi' });
  }
}
