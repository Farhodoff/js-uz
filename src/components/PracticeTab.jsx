import React, { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { linter, lintGutter } from '@codemirror/lint';
import { autocompletion } from '@codemirror/autocomplete';
import { uzbekJavaScriptLinter, uzbekJavaScriptAutocomplete } from '../utils/editorExtensions';

export default function PracticeTab({
  code, setCode, runCode, showHint, setShowHint, activeLesson,
  currentExerciseIndex, setCurrentExerciseIndex, output, outputRef
}) {
  const [editorHeight, setEditorHeight] = useState(280);
  const isResizingHeight = useRef(false);

  if (!activeLesson) return null;

  const exercises = activeLesson.exercises || [];
  const currentExercise = exercises[currentExerciseIndex] || null;
  const hasMultipleExercises = exercises.length > 1;

  const startResizingHeight = () => {
    isResizingHeight.current = true;
    document.addEventListener('mousemove', handleMouseMoveHeight);
    document.addEventListener('mouseup', stopResizingHeight);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResizingHeight = () => {
    isResizingHeight.current = false;
    document.removeEventListener('mousemove', handleMouseMoveHeight);
    document.removeEventListener('mouseup', stopResizingHeight);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  const handleMouseMoveHeight = (e) => {
    if (!isResizingHeight.current) return;
    const editorWrapper = document.querySelector('.editor-wrapper');
    if (editorWrapper) {
      const rect = editorWrapper.getBoundingClientRect();
      const newHeight = e.clientY - rect.top;
      if (newHeight > 100 && newHeight < 600) {
        setEditorHeight(newHeight);
      }
    }
  };

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
          height={`${editorHeight}px`}
          theme={vscodeDark}
          extensions={[
            javascript({ jsx: true }),
            linter(uzbekJavaScriptLinter),
            lintGutter(),
            autocompletion({ override: [uzbekJavaScriptAutocomplete] })
          ]}
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
            autocompletion: false,
            rectangularSelection: true,
            highlightSelectionMatches: true,
            tabSize: 2,
          }}
        />
        <div className="editor-resizer" onMouseDown={startResizingHeight}>
          <span></span>
        </div>
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
