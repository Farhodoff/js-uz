import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export default function PracticeTab({ code, setCode, runCode, showHint, setShowHint, activeLesson, output, outputRef }) {
  if (!activeLesson) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800 }}>
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

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button 
          onClick={runCode} 
          style={{ padding: "10px 24px", background: "#c8a96e", color: "#1a1510", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}
        >
          <span>▶</span> Kodni ishlatish
        </button>
        <button 
          onClick={() => setShowHint(!showHint)} 
          style={{ padding: "10px 18px", background: "#2a2015", color: "#c8a96e", border: "1px solid #c8a96e", borderRadius: 8, cursor: "pointer", fontSize: 13 }}
        >
          💡 Maslahat
        </button>
        <button 
          onClick={() => { setCode(activeLesson.task); }} 
          style={{ padding: "10px 18px", background: "#2a2015", color: "#8a7a5a", border: "1px solid #3a2e1e", borderRadius: 8, cursor: "pointer", fontSize: 13 }}
        >
          ↺ Qayta boshlash
        </button>
      </div>

      {showHint && (
        <div style={{ background: "#1a1f12", border: "1px solid #4a6a3a", borderRadius: 8, padding: 14, fontSize: 13, color: "#a8c88a", fontFamily: "monospace", lineHeight: 1.5 }}>
          <strong>💡 Maslahat:</strong><br />
          {activeLesson.hint}
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
