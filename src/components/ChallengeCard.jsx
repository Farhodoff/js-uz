import React from "react";

// Lightweight syntax highlighter helper
function highlightJS(code) {
  if (!code) return "";
  
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>');
  html = html.replace(/("(?:\\"|[^"])*")/g, '<span class="token-string">$1</span>');
  html = html.replace(/('(?:\\'|[^'])*')/g, '<span class="token-string">$1</span>');
  html = html.replace(/(`(?:\\`|[^`])*`)/g, '<span class="token-string">$1</span>');

  const keywords = [
    "const", "let", "var", "function", "return", "if", "else", "for", "of", "in", 
    "new", "typeof", "class", "import", "export", "from", "use strict"
  ];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b(?![^<]*>)`, 'g');
    html = html.replace(regex, '<span class="token-keyword">$1</span>');
  });

  const methods = [
    "console", "log", "map", "split", "trim", "reverse", "join", "replace", 
    "resolve", "then", "setTimeout", "Object", "freeze", "push"
  ];
  methods.forEach(m => {
    const regex = new RegExp(`\\b(${m})\\b(?![^<]*>)`, 'g');
    html = html.replace(regex, '<span class="token-function">$1</span>');
  });

  const operators = ["=&gt;", "===", "==", "\\+", "-", "\\*", "/", "\\?", ":"];
  operators.forEach(op => {
    const regex = new RegExp(`(${op})(?![^<]*>)`, 'g');
    html = html.replace(regex, '<span class="token-operator">$1</span>');
  });

  return html;
}

export default function ChallengeCard({
  challenge,
  selectedOption,
  setSelectedOption,
  isSubmitted,
  setIsSubmitted,
  onNext,
  isLast
}) {
  const letters = ["A", "B", "C", "D"];

  const handleOptionClick = (option) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const getOptionClass = (option) => {
    if (!isSubmitted) {
      return selectedOption === option ? "challenge-option-btn selected" : "challenge-option-btn";
    }
    if (option === challenge.correctAnswer) {
      return "challenge-option-btn correct";
    }
    if (selectedOption === option && selectedOption !== challenge.correctAnswer) {
      return "challenge-option-btn incorrect";
    }
    return "challenge-option-btn";
  };

  return (
    <div className="challenge-card">
      {/* Header */}
      <div className="challenge-header">
        <div className="challenge-title">{challenge.title}</div>
        <div className="challenge-meta">
          <span className={`badge-diff ${challenge.difficulty}`}>
            {challenge.difficulty === "easy" ? "Oson" : challenge.difficulty === "medium" ? "O'rta" : "Qiyin"}
          </span>
          <span className="badge-cat">{challenge.category}</span>
        </div>
      </div>

      {/* Code */}
      <div className="challenge-code-container">
        <div className="challenge-code-header">
          <div className="code-dots">
            <span className="code-dot red"></span>
            <span className="code-dot yellow"></span>
            <span className="code-dot green"></span>
          </div>
          <span>javascript</span>
        </div>
        <div className="challenge-code-body">
          <pre dangerouslySetInnerHTML={{ __html: highlightJS(challenge.code) }}></pre>
        </div>
      </div>

      {/* Options */}
      <div className="challenge-options">
        {challenge.options.map((option, idx) => (
          <button
            key={idx}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={isSubmitted}
          >
            <span className="option-num">{letters[idx]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding: "0 var(--space-5) var(--space-5) var(--space-5)", display: "flex", justifyContent: "flex-end" }}>
        {!isSubmitted ? (
          <button
            className="btn btn-primary"
            disabled={!selectedOption}
            onClick={() => setIsSubmitted(true)}
          >
            Tekshirish
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onNext}>
            {isLast ? "Natijalarni ko'rish" : "Keyingi savol →"}
          </button>
        )}
      </div>
    </div>
  );
}
