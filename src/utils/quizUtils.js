// Quiz javob formatlarini yagona indeksga keltirish.
// Loyihada 4 xil maydon nomi
// (correctAnswer | correctAnswerIndex | answer | answerIndex)
// va 2 xil qiymat turi (number indeks | string variant matni) uchraydi.
export function resolveCorrectIndex(quiz) {
  if (!quiz || !Array.isArray(quiz.options)) return -1;
  const ans = quiz.correctAnswer ?? quiz.correctAnswerIndex ?? quiz.answer ?? quiz.answerIndex;
  if (typeof ans === 'number') {
    return ans >= 0 && ans < quiz.options.length ? ans : -1;
  }
  if (typeof ans === 'string') {
    return quiz.options.indexOf(ans);
  }
  return -1;
}
