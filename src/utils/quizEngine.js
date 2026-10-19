import { resolveCorrectIndex } from './quizUtils.js';

export const DEFAULT_TIME_LIMIT = 15;

export function createQuestion(question, options, correctAnswerIndex, timeLimit = DEFAULT_TIME_LIMIT) {
  return { question, options, correctAnswerIndex, timeLimit };
}

export function initQuizState(questions = []) {
  const list = Array.isArray(questions) ? questions : [];
  const firstQuestion = list[0];

  return {
    questions: list,
    currentIndex: 0,
    score: 0,
    timeLeft: (firstQuestion && firstQuestion.timeLimit) || DEFAULT_TIME_LIMIT,
    timerId: null,
    isFinished: false,
  };
}

export function stopTimer(state) {
  if (state && state.timerId !== null && state.timerId !== undefined) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  return state;
}

export function startTimer(state, onTick, onTimeout, intervalMs = 1000) {
  if (!state || state.isFinished) return null;

  stopTimer(state);

  state.timerId = setInterval(() => {
    state.timeLeft = Math.max(0, state.timeLeft - 1);

    if (typeof onTick === 'function') onTick(state.timeLeft);

    if (state.timeLeft <= 0) {
      stopTimer(state);
      if (typeof onTimeout === 'function') onTimeout();
    }
  }, intervalMs);

  return state.timerId;
}

export function getPreciseRemainingSeconds(startTimestamp, totalDurationSeconds, now = Date.now()) {
  const remainingMs = (startTimestamp + totalDurationSeconds * 1000) - now;
  return Math.max(0, Math.ceil(remainingMs / 1000));
}

export function checkAnswer(state, selectedIndex) {
  if (!state || !Array.isArray(state.questions)) return false;

  const currentQuestion = state.questions[state.currentIndex];
  if (!currentQuestion) return false;

  const correctIndex = resolveCorrectIndex(currentQuestion);
  if (correctIndex === -1) return false;

  if (selectedIndex === correctIndex) {
    state.score += 1;
    return true;
  }

  return false;
}

export function nextQuestion(state) {
  if (!state || !Array.isArray(state.questions)) return false;

  stopTimer(state);
  state.currentIndex += 1;

  if (state.currentIndex >= state.questions.length) {
    state.currentIndex = state.questions.length;
    state.timeLeft = 0;
    state.isFinished = true;
    return false;
  }

  const currentQuestion = state.questions[state.currentIndex];
  state.timeLeft = (currentQuestion && currentQuestion.timeLimit) || DEFAULT_TIME_LIMIT;
  state.isFinished = false;
  return true;
}

export function calculateResult(state, passingPercentage = 70) {
  const questions = state && Array.isArray(state.questions) ? state.questions : [];
  const total = questions.length;
  const correct = state && Number.isFinite(state.score) ? state.score : 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    percentage,
    passed: percentage >= passingPercentage,
  };
}

export function lockOptions(buttons, selectedIndex, correctIndex) {
  if (!Array.isArray(buttons)) return buttons;

  buttons.forEach((button, index) => {
    if (!button) return;

    button.disabled = true;

    if (index === selectedIndex) {
      button.className = index === correctIndex ? 'correct' : 'wrong';
    }

    if (index === correctIndex && selectedIndex !== correctIndex) {
      button.className = 'correct';
    }
  });

  return buttons;
}
