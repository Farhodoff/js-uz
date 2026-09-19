import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

export default function QuizTab({ activeLesson, completedQuizzes, onCompleteQuiz }) {
  const quizzes = activeLesson?.quizzes || [];
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // index of selected option
  const [answered, setAnswered] = useState(false); // whether current quiz is answered

  const currentQuiz = quizzes[currentQuizIndex];

  // Reset quiz state when active lesson or quiz index changes
  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
  }, [activeLesson, currentQuizIndex]);

  if (quizzes.length === 0) {
    return (
      <div className="quiz-empty">
        <p>Ushbu darsda variantli testlar mavjud emas.</p>
      </div>
    );
  }

  const handleOptionClick = (optionIdx) => {
    if (answered) return; // Prevent double answering
    setSelectedOption(optionIdx);
    setAnswered(true);

    const isCorrect = optionIdx === currentQuiz.correctAnswer;
    onCompleteQuiz(currentQuizIndex, isCorrect);
  };

  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  const isCompleted = completedQuizzes?.[`${activeLesson.id}_quiz_${currentQuizIndex}`];

  return (
    <div className="quiz-panel">
      {/* Quiz Progress Header */}
      <div className="quiz-header">
        <span className="quiz-counter">
          Savol {currentQuizIndex + 1} / {quizzes.length}
        </span>
        {isCompleted && (
          <span className="quiz-status-badge">✅ Bajarildi</span>
        )}
      </div>

      {/* Quiz Question Card */}
      <div className="quiz-card">
        <div className="quiz-question">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {currentQuiz.question}
          </ReactMarkdown>
        </div>

        {/* Options List */}
        <div className="quiz-options">
          {currentQuiz.options.map((option, idx) => {
            let optionClass = 'quiz-option-btn';
            
            if (answered) {
              if (idx === currentQuiz.correctAnswer) {
                optionClass += ' correct';
              } else if (idx === selectedOption) {
                optionClass += ' wrong';
              } else {
                optionClass += ' disabled';
              }
            } else {
              // Show previously answered state if completed but not answered in this session
              if (isCompleted && idx === currentQuiz.correctAnswer) {
                optionClass += ' correct';
              }
            }

            return (
              <button
                key={idx}
                className={optionClass}
                disabled={answered || (isCompleted && !answered)}
                onClick={() => handleOptionClick(idx)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + idx)})
                </span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer feedback & Explanation */}
      {(answered || isCompleted) && (
        <div className="quiz-feedback-section animate-fade-in">
          {answered && (
            <div className={`quiz-result-msg ${selectedOption === currentQuiz.correctAnswer ? 'success' : 'error'}`}>
              {selectedOption === currentQuiz.correctAnswer ? (
                <span>🎉 To'g'ri topdingiz! Barakalla!</span>
              ) : (
                <span>❌ Noto'g'ri javob. Qayta o'qib ko'ring.</span>
              )}
            </div>
          )}

          <div className="quiz-explanation">
            <h4>💡 Nega bunday? (Tushuntirish):</h4>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {currentQuiz.explanation}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="quiz-navigation">
        <button
          className="btn btn-secondary"
          disabled={currentQuizIndex === 0}
          onClick={handlePrev}
        >
          ← Oldingi
        </button>
        
        {answered && !isCompleted && selectedOption !== currentQuiz.correctAnswer ? (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedOption(null);
              setAnswered(false);
            }}
          >
            🔄 Qayta urinish
          </button>
        ) : null}

        <button
          className="btn btn-secondary"
          disabled={currentQuizIndex === quizzes.length - 1}
          onClick={handleNext}
        >
          Keyingi →
        </button>
      </div>
    </div>
  );
}
