import React from "react";

// Simple markdown-to-html helper for the explanation text
function parseExplanationMarkdown(md) {
  if (!md) return "";

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold text: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Inline code: `code`
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  // Code blocks: ```javascript ... ```
  html = html.replace(/```javascript([\s\S]*?)```/g, '<pre class="explanation-code-block">$1</pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="explanation-code-block">$1</pre>');

  // Split into paragraphs/lists
  const lines = html.split("\n");
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("1. ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      return `<li style="margin-left: var(--space-4); margin-bottom: var(--space-2);">${content}</li>`;
    }
    if (trimmed === "") {
      return "";
    }
    return `<p style="margin-bottom: var(--space-3);">${trimmed}</p>`;
  });

  return processedLines.join("");
}

export default function ExplanationBox({ challenge, selectedOption, isCorrect }) {
  return (
    <div className="explanation-card">
      <div className={`explanation-banner ${isCorrect ? "correct" : "incorrect"}`}>
        {isCorrect ? (
          <span>🎉 To'g'ri javob! Ofarin!</span>
        ) : (
          <span>😢 Noto'g'ri javob. Qayta tahlil qilib ko'ring.</span>
        )}
      </div>

      <div className="explanation-body">
        <h3 style={{ marginBottom: "var(--space-3)", fontSize: "var(--text-md)", color: "var(--accent)" }}>
          Yechim va Tahlil
        </h3>
        <div 
          className="explanation-content"
          dangerouslySetInnerHTML={{ __html: parseExplanationMarkdown(challenge.explanation) }}
        ></div>
      </div>
    </div>
  );
}
