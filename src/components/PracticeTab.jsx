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
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  };

  const hasError = output.includes('❌');

  return (
    <div className="practice-panel" onKeyDown={handleKeyDown}>
      {/* Exercise Info */}
      <div className="exercise-info">
        <div className="exercise-header">
          <span className="exercise-counter">
            {hasMultipleExercises
              ? `Mashq ${currentExerciseIndex + 1} / ${exercises.length}`
              : 'Topshiriq'}
          </span>
          {currentExercise?.type === 'bug-fix' && (
            <span className="exercise-badge">🐞 Xatoni tuzatish</span>
          )}
        </div>
        <div className="exercise-instruction">
          {currentExercise?.instruction || activeLesson.task}
        </div>
      </div>

      {/* Code Editor */}
      <div className="editor-wrapper">
        <CodeMirror
          value={code}
          height="280px"
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
            highlightSelectionMatches: true,
            tabSize: 2,
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="action-bar">
        <div className="action-bar-left">
          <button className="btn btn-primary" onClick={runCode} aria-label="Kodni tekshirish">
            <span>▶</span> Tekshirish
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowHint(!showHint)}
            aria-label="Maslahat ko'rsatish"
          >
            💡 Maslahat
          </button>
        </div>

        {hasMultipleExercises && (
          <div className="action-bar-right">
            <button
              className="btn btn-ghost"
              disabled={currentExerciseIndex === 0}
              onClick={goToPrev}
              aria-label="Oldingi mashq"
            >
              ←
            </button>
            <button
              className="btn btn-ghost"
              disabled={currentExerciseIndex === exercises.length - 1}
              onClick={goToNext}
              aria-label="Keyingi mashq"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Hint */}
      {showHint && (
        <div className="hint-box">
          <strong>💡 Maslahat:</strong><br />
          {currentExercise?.hint || activeLesson.hint}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="output-label">Natija (Console):</div>
          <div
            ref={outputRef}
            className={`output-panel ${hasError ? 'output-error' : 'output-success'}`}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
