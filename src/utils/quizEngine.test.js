import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  DEFAULT_TIME_LIMIT,
  createQuestion,
  initQuizState,
  stopTimer,
  startTimer,
  getPreciseRemainingSeconds,
  checkAnswer,
  nextQuestion,
  calculateResult,
  lockOptions,
} from './quizEngine.js';

describe('createQuestion', () => {
  it('berilgan qiymatlar asosida savol yaratadi va standart vaqtni qo\'llaydi', () => {
    expect(createQuestion('JS nima?', ['Til', 'Baza'], 0)).toEqual({
      question: 'JS nima?',
      options: ['Til', 'Baza'],
      correctAnswerIndex: 0,
      timeLimit: DEFAULT_TIME_LIMIT,
    });
  });

  it('berilgan timeLimit ni saqlaydi', () => {
    expect(createQuestion('Q', ['a'], 0, 30).timeLimit).toBe(30);
  });
});

describe('initQuizState', () => {
  it('birinchi savol timeLimit ini boshlang\'ich vaqt qilib oladi', () => {
    const state = initQuizState([{ timeLimit: 20 }, { timeLimit: 5 }]);

    expect(state).toMatchObject({
      currentIndex: 0,
      score: 0,
      timeLeft: 20,
      timerId: null,
      isFinished: false,
    });
    expect(state.questions).toHaveLength(2);
  });

  it('timeLimit bo\'lmasa standart 15 ni ishlatadi', () => {
    expect(initQuizState([{}]).timeLeft).toBe(DEFAULT_TIME_LIMIT);
    expect(initQuizState([{ timeLimit: 0 }]).timeLeft).toBe(DEFAULT_TIME_LIMIT);
  });

  it('bo\'sh yoki noto\'g\'ri ro\'yxat uchun xavfsiz holat qaytaradi', () => {
    expect(initQuizState().questions).toEqual([]);
    expect(initQuizState(null).questions).toEqual([]);
    expect(initQuizState([]).timeLeft).toBe(DEFAULT_TIME_LIMIT);
  });
});

describe('stopTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('faol intervalni to\'xtatib, timerId ni null qiladi', () => {
    const state = { timerId: setInterval(() => {}, 1000) };
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');

    const result = stopTimer(state);

    expect(clearSpy).toHaveBeenCalledWith(expect.anything());
    expect(state.timerId).toBeNull();
    expect(result).toBe(state);
    clearSpy.mockRestore();
  });

  it('timerId null yoki undefined bo\'lsa clearInterval chaqirmaydi', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');

    stopTimer({ timerId: null });
    stopTimer({ timerId: undefined });
    stopTimer(null);

    expect(clearSpy).not.toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});

describe('startTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('har soniyada timeLeft ni kamaytiradi va 0 da to\'xtaydi', () => {
    const state = { timeLeft: 3, timerId: null, isFinished: false };
    const ticks = [];
    const onTimeout = vi.fn();

    startTimer(state, (timeLeft) => ticks.push(timeLeft), onTimeout);

    vi.advanceTimersByTime(1000);
    expect(state.timeLeft).toBe(2);

    vi.advanceTimersByTime(2000);
    expect(state.timeLeft).toBe(0);
    expect(state.timerId).toBeNull();
    expect(ticks).toEqual([2, 1, 0]);
    expect(onTimeout).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5000);
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('qayta ishga tushirilganda eski intervalni tozalaydi (stacking yo\'q)', () => {
    const state = { timeLeft: 10, timerId: null, isFinished: false };

    startTimer(state);
    const firstId = state.timerId;
    startTimer(state);

    expect(state.timerId).not.toBe(firstId);

    vi.advanceTimersByTime(1000);
    expect(state.timeLeft).toBe(9);
  });

  it('callback lar berilmasa ham ishlaydi', () => {
    const state = { timeLeft: 1, timerId: null, isFinished: false };

    expect(startTimer(state)).not.toBeNull();
    vi.advanceTimersByTime(1000);

    expect(state.timeLeft).toBe(0);
    expect(state.timerId).toBeNull();
  });

  it('tugagan yoki noto\'g\'ri holat uchun timer ochmaydi', () => {
    expect(startTimer(null)).toBeNull();
    expect(startTimer({ timeLeft: 5, timerId: null, isFinished: true })).toBeNull();
  });
});

describe('getPreciseRemainingSeconds', () => {
  it('qolgan vaqtni yuqoriga yaxlitlab qaytaradi', () => {
    const start = 1_000_000;

    expect(getPreciseRemainingSeconds(start, 10, start)).toBe(10);
    expect(getPreciseRemainingSeconds(start, 10, start + 500)).toBe(10);
    expect(getPreciseRemainingSeconds(start, 10, start + 1000)).toBe(9);
    expect(getPreciseRemainingSeconds(start, 10, start + 9500)).toBe(1);
  });

  it('muddat tugagach 0 dan kichik qiymat qaytarmaydi', () => {
    const start = 1_000_000;

    expect(getPreciseRemainingSeconds(start, 10, start + 10_000)).toBe(0);
    expect(getPreciseRemainingSeconds(start, 10, start + 60_000)).toBe(0);
  });
});

describe('checkAnswer', () => {
  it('to\'g\'ri javobda ballni oshiradi va true qaytaradi', () => {
    const state = {
      questions: [{ options: ['a', 'b', 'c'], correctAnswerIndex: 2 }],
      currentIndex: 0,
      score: 0,
    };

    expect(checkAnswer(state, 2)).toBe(true);
    expect(state.score).toBe(1);
  });

  it('noto\'g\'ri javobda ballni o\'zgartirmaydi va false qaytaradi', () => {
    const state = {
      questions: [{ options: ['a', 'b'], correctAnswerIndex: 1 }],
      currentIndex: 0,
      score: 0,
    };

    expect(checkAnswer(state, 0)).toBe(false);
    expect(state.score).toBe(0);
  });

  it('string ko\'rinishidagi to\'g\'ri javobni ham qo\'llaydi', () => {
    const state = {
      questions: [{ options: ['ES5', 'ES6'], correctAnswer: 'ES6' }],
      currentIndex: 0,
      score: 0,
    };

    expect(checkAnswer(state, 1)).toBe(true);
    expect(state.score).toBe(1);
  });

  it('savol yoki javob topilmasa false qaytaradi', () => {
    expect(checkAnswer(null, 0)).toBe(false);
    expect(checkAnswer({ questions: 'x', currentIndex: 0, score: 0 }, 0)).toBe(false);
    expect(checkAnswer({ questions: [], currentIndex: 0, score: 0 }, 0)).toBe(false);
    expect(checkAnswer({ questions: [{ options: ['a'] }], currentIndex: 0, score: 0 }, 0)).toBe(false);
  });
});

describe('nextQuestion', () => {
  it('keyingi savolga o\'tib, uning timeLimit ini o\'rnatadi', () => {
    const state = {
      questions: [{ timeLimit: 10 }, { timeLimit: 25 }],
      currentIndex: 0,
      timeLeft: 5,
      timerId: null,
      isFinished: false,
    };

    expect(nextQuestion(state)).toBe(true);
    expect(state.currentIndex).toBe(1);
    expect(state.timeLeft).toBe(25);
    expect(state.isFinished).toBe(false);
  });

  it('timeLimit yo\'q bo\'lsa standart 15 ni o\'rnatadi', () => {
    const state = {
      questions: [{}, { timeLimit: 0 }],
      currentIndex: 0,
      timeLeft: 5,
      timerId: null,
      isFinished: false,
    };

    nextQuestion(state);
    expect(state.timeLeft).toBe(DEFAULT_TIME_LIMIT);
  });

  it('savollar tugaganda isFinished true qiladi va false qaytaradi', () => {
    const state = {
      questions: [{ timeLimit: 10 }],
      currentIndex: 0,
      timeLeft: 7,
      timerId: null,
      isFinished: false,
    };

    expect(nextQuestion(state)).toBe(false);
    expect(state.currentIndex).toBe(1);
    expect(state.timeLeft).toBe(0);
    expect(state.isFinished).toBe(true);
  });

  it('o\'tishdan oldin faol taymerni to\'xtatadi', () => {
    vi.useFakeTimers();
    const state = {
      questions: [{}, {}],
      currentIndex: 0,
      timeLeft: 5,
      timerId: setInterval(() => {}, 1000),
      isFinished: false,
    };

    nextQuestion(state);

    expect(state.timerId).toBeNull();
    vi.useRealTimers();
  });

  it('noto\'g\'ri holat uchun false qaytaradi', () => {
    expect(nextQuestion(null)).toBe(false);
    expect(nextQuestion({ questions: null })).toBe(false);
  });
});

describe('calculateResult', () => {
  it('foiz va o\'tish holatini to\'g\'ri hisoblaydi', () => {
    expect(calculateResult({ questions: [{}, {}, {}, {}], score: 3 })).toEqual({
      total: 4,
      correct: 3,
      percentage: 75,
      passed: true,
    });
  });

  it('o\'tish chegarasidan past natijani passed false qiladi', () => {
    expect(calculateResult({ questions: [{}, {}], score: 1 })).toEqual({
      total: 2,
      correct: 1,
      percentage: 50,
      passed: false,
    });
  });

  it('aynan chegara bo\'yicha passed true qaytaradi', () => {
    const result = calculateResult({ questions: Array.from({ length: 10 }, () => ({})), score: 7 });
    expect(result.percentage).toBe(70);
    expect(result.passed).toBe(true);
  });

  it('maxsus passingPercentage ni qo\'llaydi', () => {
    expect(calculateResult({ questions: [{}, {}, {}], score: 2 }, 90).passed).toBe(false);
    expect(calculateResult({ questions: [{}, {}, {}], score: 2 }, 60).passed).toBe(true);
  });

  it('savol yo\'q bo\'lsa 0 foiz qaytaradi', () => {
    expect(calculateResult({ questions: [], score: 0 })).toEqual({
      total: 0,
      correct: 0,
      percentage: 0,
      passed: false,
    });
  });

  it('noto\'g\'ri yoki to\'liq bo\'lmagan holatni xavfsiz qayta ishlaydi', () => {
    expect(calculateResult(null)).toEqual({
      total: 0,
      correct: 0,
      percentage: 0,
      passed: false,
    });
    expect(calculateResult({ questions: [{}, {}] })).toMatchObject({ correct: 0, percentage: 0 });
  });
});

describe('lockOptions', () => {
  it('to\'g\'ri javob tanlanganda barchasini bloklaydi va correct belgilaydi', () => {
    const buttons = [
      { disabled: false, className: '' },
      { disabled: false, className: '' },
    ];

    lockOptions(buttons, 1, 1);

    expect(buttons.every((button) => button.disabled)).toBe(true);
    expect(buttons[1].className).toBe('correct');
    expect(buttons[0].className).toBe('');
  });

  it('noto\'g\'ri javob tanlanganda wrong va correct ni belgilaydi', () => {
    const buttons = [
      { disabled: false, className: '' },
      { disabled: false, className: '' },
      { disabled: false, className: '' },
    ];

    lockOptions(buttons, 0, 2);

    expect(buttons[0].className).toBe('wrong');
    expect(buttons[2].className).toBe('correct');
    expect(buttons[1].className).toBe('');
  });

  it('noto\'g\'ri kirishlarni xavfsiz qayta ishlaydi', () => {
    expect(lockOptions(null, 0, 1)).toBeNull();
    const buttons = [null, { disabled: false, className: '' }];
    expect(() => lockOptions(buttons, 0, 1)).not.toThrow();
    expect(buttons[1].disabled).toBe(true);
  });
});
