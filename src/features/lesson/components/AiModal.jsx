import React, { useEffect, useRef } from "react";
import AiTab from "./AiTab";

export default function AiModal({ showAI, setShowAI, aiQuestion, setAiQuestion, askAI, aiLoading, aiAnswer, clearAnswer }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!showAI) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setShowAI(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showAI, setShowAI]);

  if (!showAI) return null;

  return (
    <div className="ai-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setShowAI(false);
    }}>
      <div className="ai-modal" role="dialog" aria-label="AI Yordamchi">
        <div className="ai-modal-header">
          <h3>🤖 Robotdan so'rash</h3>
          <button
            ref={closeRef}
            className="ai-close-btn"
            onClick={() => setShowAI(false)}
            aria-label="Yopish"
          >
            ✕
          </button>
        </div>
        <AiTab
          aiQuestion={aiQuestion}
          setAiQuestion={setAiQuestion}
          askAI={askAI}
          aiLoading={aiLoading}
          aiAnswer={aiAnswer}
          clearAnswer={clearAnswer}
        />
      </div>
    </div>
  );
}
