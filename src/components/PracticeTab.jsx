import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export default function PracticeTab({ 
  code, setCode, runCode, showHint, setShowHint, activeLesson, 
  currentExerciseIndex, setCurrentExerciseIndex, output, outputRef 
}) {
  if (!activeLesson) return null;

  const exercises = activeLesson.exercises || [];
  const currentExercise = exercises[currentExerciseIndex] || null;
  const hasMultipleExercises = exercises.length > 1;

  const goToNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIdx = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIdx);
      setCode(exercises[nextIdx].startingCode || "");
    }
  };

  const goToPrev = () => {
    if (currentExerciseIndex > 0) {
      const prevIdx = currentExerciseIndex - 1;
      setCurrentExerciseIndex(prevIdx);
      setCode(exercises[prevIdx].startingCode || "");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800 }}>
      {/* Exercise Info */}
      <div style={{ background: "#2a2015", border: "1px solid #3a2e1e", borderRadius: 8, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "#c8a96e", fontWeight: 700, fontSize: 14 }}>
            {hasMultipleExercises ? `Mashq ${currentExerciseIndex + 1} / ${exercises.length}` : "Topshiriq"}
          </span>
          {currentExercise?.type === "bug-fix" && (
            <span style={{ background: "#4a2a2a", color: "#ff8a80", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>
              🐞 Xatoni tuzatish
            </span>
          )}
        </div>
        <div style={{ color: "#e8d5b0", fontSize: 14, lineHeight: 1.5 }}>
          {currentExercise?.instruction || activeLesson.task}
        </div>
      </div>

      <div style={{ 
        border: "1px solid #3a2e1e", 
        borderRadius: 8, 
        overflow: "hidden",
        fontSize: 14,
        background: "#1e1e1e"
      }}>
        <CodeMirror
          value={code}
          height="300px"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightSelectionMatches: true,
            tabSize: 2,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button 
            onClick={runCode} 
            style={{ padding: "10px 24px", background: "#c8a96e", color: "#1a1510", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}
          >
            <span>▶</span> Tekshirish
          </button>
          <button 
            onClick={() => setShowHint(!showHint)} 
            style={{ padding: "10px 18px", background: "#2a2015", color: "#c8a96e", border: "1px solid #c8a96e", borderRadius: 8, cursor: "pointer", fontSize: 13 }}
          >
            💡 Maslahat
          </button>
        </div>

        {hasMultipleExercises && (
          <div style={{ display: "flex", gap: 8 }}>
            <button 
              disabled={currentExerciseIndex === 0}
              onClick={goToPrev} 
              style={{ padding: "10px 15px", background: "#2a2015", color: currentExerciseIndex === 0 ? "#4a3e2e" : "#c8a96e", border: "1px solid #3a2e1e", borderRadius: 8, cursor: currentExerciseIndex === 0 ? "default" : "pointer", fontSize: 13 }}
            >
              ←
            </button>
            <button 
              disabled={currentExerciseIndex === exercises.length - 1}
              onClick={goToNext} 
              style={{ padding: "10px 15px", background: "#2a2015", color: currentExerciseIndex === exercises.length - 1 ? "#4a3e2e" : "#c8a96e", border: "1px solid #3a2e1e", borderRadius: 8, cursor: currentExerciseIndex === exercises.length - 1 ? "default" : "pointer", fontSize: 13 }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {showHint && (
        <div style={{ background: "#1a1f12", border: "1px solid #4a6a3a", borderRadius: 8, padding: 14, fontSize: 13, color: "#a8c88a", fontFamily: "monospace", lineHeight: 1.5 }}>
          <strong>💡 Maslahat:</strong><br />
          {currentExercise?.hint || activeLesson.hint}
        </div>
      )}

      {output && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: "#8a7a5a", marginBottom: 4, marginLeft: 4 }}>Natija (Console):</div>
          <div 
            ref={outputRef} 
            style={{ 
              background: "#0a0f08", 
              border: "1px solid #2a3a2a", 
              borderRadius: 8, 
              padding: 14, 
              fontFamily: "'Fira Code', monospace", 
              fontSize: 13, 
              color: output.includes("❌") ? "#ff8a80" : "#a8d8a0", 
              whiteSpace: "pre-wrap", 
              minHeight: 60,
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)"
            }}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
