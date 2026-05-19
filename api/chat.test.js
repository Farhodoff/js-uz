import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from './chat.js';

describe('chat.js API handler', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Mock req va res obyektlarini yaratish
    mockReq = {
      method: 'POST',
      body: {
        question: 'JavaScript nima?',
        lesson: 'Asoslar'
      }
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn().mockReturnThis(),
      end: vi.fn()
    };

    // Environment variable mock
    process.env.DEEPSEEK_API_KEY = 'test-api-key';
  });

  describe('CORS preflight', () => {
    it('OPTIONS method uchun CORS headerlarini qaytarishi kerak', async () => {
      mockReq.method = 'OPTIONS';
      
      await handler(mockReq, mockRes);

      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'POST, OPTIONS');
      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'Content-Type');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.end).toHaveBeenCalled();
    });
  });

  describe('Method validation', () => {
    it('GET method uchun 405 qaytarishi kerak', async () => {
      mockReq.method = 'GET';
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });

    it('POST method uchun ishlashi kerak', async () => {
      // Fetch mock
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          choices: [{
            message: {
              content: 'JavaScript - bu dasturlash tili'
            }
          }]
        })
      });

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('Question validation', () => {
    it('req.body undefined bo\'lsa 400 qaytarishi kerak', async () => {
      mockReq.body = undefined;
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Savol bo'sh bo'lishi mumkin emas" });
    });

    it("Bo'sh savol uchun 400 qaytarishi kerak", async () => {
      mockReq.body.question = '';
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Savol bo'sh bo'lishi mumkin emas" });
    });

    it('Whitespace-only savol uchun 400 qaytarishi kerak', async () => {
      mockReq.body.question = '   ';
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Savol bo'sh bo'lishi mumkin emas" });
    });

    it('2000 belgidan uzun savol uchun 400 qaytarishi kerak', async () => {
      mockReq.body.question = 'a'.repeat(2001);
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Savol juda uzun (max 2000 belgi)" });
    });

    it('2000 belgilik savol uchun ishlashi kerak', async () => {
      mockReq.body.question = 'a'.repeat(2000);
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          choices: [{
            message: {
              content: 'Javob'
            }
          }]
        })
      });

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('API Key validation', () => {
    it("API key bo'lmasa 500 qaytarishi kerak", async () => {
      delete process.env.DEEPSEEK_API_KEY;
      
      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Server taraflama xato' });
    });
  });

  describe('DeepSeek API integration', () => {
    it('Muvaffaqiyatli API call uchun javob qaytarishi kerak', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          choices: [{
            message: {
              content: 'JavaScript - bu dasturlash tili'
            }
          }]
        })
      });

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        answer: 'JavaScript - bu dasturlash tili' 
      });
      expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    });

    it('API error uchun xato qaytarishi kerak', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Invalid request' })
      });

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'DeepSeek API xatosi' });
    });

    it('Network error uchun 500 qaytarishi kerak', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Tarmoq xatosi' });
    });

    it('Bo\'sh javob uchun default message qaytarishi kerak', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          choices: []
        })
      });

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        answer: 'Javob olinmadi' 
      });
    });
  });

  describe('Lesson parameter', () => {
    it('Lesson parameteri bo\'lmasa "Umumiy" ishlatishi kerak', async () => {
      mockReq.body.lesson = undefined;
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          choices: [{
            message: {
              content: 'Javob'
            }
          }]
        })
      });

      await handler(mockReq, mockRes);

      const fetchCall = global.fetch.mock.calls[0];
      const body = JSON.parse(fetchCall[1].body);
      expect(body.messages[1].content).toContain('Umumiy');
    });
  });
});
