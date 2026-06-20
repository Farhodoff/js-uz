import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { registerUzbekMonacoHover } from '../utils/editorExtensions';

export default function PracticeTab({
  code, setCode, runCode, showHint, setShowHint, activeLesson,
  currentExerciseIndex, setCurrentExerciseIndex, output
}) {
  const [editorHeight, setEditorHeight] = useState(280);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isResizingHeight = useRef(false);

  const runCodeRef = useRef(runCode);
  runCodeRef.current = runCode;

  const editorRef = useRef(null);
  const zoneIdRef = useRef(null);
  const monacoRef = useRef(null);
  const hoverProviderDisposerRef = useRef(null);

  const removeInlineOutput = (editor) => {
    if (zoneIdRef.current !== null && editor) {
      editor.changeViewZones(accessor => {
        accessor.removeZone(zoneIdRef.current);
      });
      zoneIdRef.current = null;
    }
  };

  const showInlineOutput = (editor, monaco, outputText, hasError) => {
    removeInlineOutput(editor);

    const lineCount = editor.getModel().getLineCount();

    const domNode = document.createElement('div');
    domNode.className = `monaco-inline-output ${hasError ? 'error' : 'success'}`;

    // Style the container
    domNode.style.background = '#151515';
    domNode.style.border = '1px solid var(--border-primary)';
    domNode.style.borderLeft = `4px solid ${hasError ? '#f87171' : '#4ade80'}`;
    domNode.style.padding = '12px 16px';
    domNode.style.fontFamily = 'var(--font-mono, monospace)';
    domNode.style.fontSize = '13px';
    domNode.style.lineHeight = '1.5';
    domNode.style.color = '#e2e8f0';
    domNode.style.overflow = 'auto';
    domNode.style.boxSizing = 'border-box';
    domNode.style.borderRadius = '4px';
    domNode.style.margin = '4px 20px 8px 45px';
    domNode.style.position = 'relative';

    // Status header
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '8px';
    header.style.borderBottom = '1px solid #2d2d2d';
    header.style.paddingBottom = '6px';

    const title = document.createElement('span');
    title.innerText = hasError ? "❌ Natija (Xatolik)" : "✅ Natija (Muvaffaqiyatli)";
    title.style.fontWeight = 'bold';
    title.style.color = hasError ? '#f87171' : '#4ade80';
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = '✕';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#94a3b8';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '14px';
    closeBtn.style.padding = '0 4px';
    closeBtn.onclick = () => removeInlineOutput(editor);
    header.appendChild(closeBtn);

    domNode.appendChild(header);

    // Body containing text
    const pre = document.createElement('pre');
    pre.style.margin = '0';
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.wordBreak = 'break-all';
    pre.style.fontFamily = 'inherit';
    pre.innerText = outputText;
    domNode.appendChild(pre);

    const lines = outputText.split('\n').length;
    const heightInLines = Math.min(15, lines + 4);

    editor.changeViewZones(accessor => {
      zoneIdRef.current = accessor.addZone({
        afterLineNumber: lineCount,
        heightInLines: heightInLines,
        domNode: domNode
      });
    });
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Clean up previous registration just in case
    if (hoverProviderDisposerRef.current) {
      hoverProviderDisposerRef.current();
    }

    // Register Uzbek hover tooltips
    hoverProviderDisposerRef.current = registerUzbekMonacoHover(monaco);

    // Bind Ctrl+Enter and Cmd+Enter to runCode
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (runCodeRef.current) {
        runCodeRef.current();
      }
    });

    // If there is existing output, show it inline immediately
    if (output) {
      const hasError = output.includes('❌');
      showInlineOutput(editor, monaco, output, hasError);
    }
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current && output) {
      const hasError = output.includes('❌');
      showInlineOutput(editorRef.current, monacoRef.current, output, hasError);
    } else if (editorRef.current && !output) {
      removeInlineOutput(editorRef.current);
    }
  }, [output]);

  useEffect(() => {
    return () => {
      if (hoverProviderDisposerRef.current) {
        hoverProviderDisposerRef.current();
      }
      if (editorRef.current) {
        removeInlineOutput(editorRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!activeLesson) return null;

  const insertText = (text) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const op = { range: selection, text: text, forceMoveMarkers: true };
      editor.executeEdits("mobile-toolbar", [op]);
      editor.focus();
    }
  };

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

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

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
      <div className="editor-wrapper" style={{ minHeight: '150px' }}>
        {isMobile && (
          <div className="mobile-toolbar">
            {['{', '}', '(', ')', '[', ']', '=>', '"', "'", '`', ';', '=', 'console.log()'].map(char => (
              <button 
                key={char} 
                className="mobile-toolbar-btn"
                onClick={() => insertText(char === 'console.log()' ? 'console.log()' : char)}
                title={`Kiritish: ${char}`}
              >
                {char}
              </button>
            ))}
          </div>
        )}
        <Editor
          height={`${editorHeight}px`}
          language={
            activeLesson.language === 'sql'
              ? 'sql'
              : activeLesson.language === 'typescript'
              ? 'typescript'
              : 'javascript'
          }
          value={code}
          theme="vs-dark"
          onChange={(value) => {
            setCode(value || '');
            if (editorRef.current) {
              removeInlineOutput(editorRef.current);
            }
          }}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            tabSize: 2,
            wordWrap: 'on',
            lineNumbers: 'on',
            folding: true,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            suggestOnTriggerCharacters: true
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
            onClick={handleFormat}
            aria-label="Kodni formatlash"
          >
            ✨ Format
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

    </div>
  );
}

