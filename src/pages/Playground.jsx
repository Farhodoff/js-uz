import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

export default function Playground() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('html');
  const [htmlCode, setHtmlCode] = useState('<h1>Salom Qumdon!</h1>\n<p>HTML, CSS va JS kodlarini yozing...</p>');
  const [cssCode, setCssCode] = useState('body {\n  font-family: sans-serif;\n  background: #f4f4f5;\n  color: #333;\n  padding: 1rem;\n}\n\nh1 {\n  color: #3b82f6;\n}');
  const [jsCode, setJsCode] = useState('console.log("Qumdon ishga tushdi!");');
  const [srcDoc, setSrcDoc] = useState('');
  const [logs, setLogs] = useState([]);
  
  // Debounced effect to update iframe
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Create a script that intercepts console.log
      const consoleScript = `
        <script>
          const origLog = console.log;
          const origError = console.error;
          const origWarn = console.warn;
          
          window.console.log = function(...args) {
            window.parent.postMessage({ type: 'playground-log', level: 'log', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
            origLog.apply(console, args);
          };
          window.console.error = function(...args) {
            window.parent.postMessage({ type: 'playground-log', level: 'error', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
            origError.apply(console, args);
          };
          window.console.warn = function(...args) {
            window.parent.postMessage({ type: 'playground-log', level: 'warn', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
            origWarn.apply(console, args);
          };
          
          window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'playground-log', level: 'error', message: message }, '*');
          };
        </script>
      `;

      setSrcDoc(`
        <html>
          <head>
            <style>${cssCode}</style>
            ${consoleScript}
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'playground-log') {
        setLogs(prev => [...prev, { level: event.data.level, message: event.data.message, time: new Date().toLocaleTimeString() }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="playground-container">
      {/* Header */}
      <div className="playground-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => navigate('/beginner')} className="playground-btn-back">
            ← Darslarga qaytish
          </button>
          <h2 className="playground-title">🛠️ Qumdon (Playground)</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="playground-btn-clear"
            onClick={() => { setHtmlCode(''); setCssCode(''); setJsCode(''); setLogs([]); }}
          >
            Tozalash
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="playground-main">
        
        {/* Editors (Left) */}
        <div className="playground-left">
          <div className="playground-tabs">
            <button className={`playground-tab-btn html ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
            <button className={`playground-tab-btn css ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
            <button className={`playground-tab-btn js ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JavaScript</button>
          </div>
          <div className="playground-editor-wrap">
            <Editor
              height="100%"
              language={activeTab}
              theme="vs-dark"
              value={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
              onChange={(val) => {
                const v = val || '';
                if (activeTab === 'html') setHtmlCode(v);
                if (activeTab === 'css') setCssCode(v);
                if (activeTab === 'js') setJsCode(v);
              }}
              options={{ minimap: { enabled: false }, fontSize: 14, tabSize: 2, wordWrap: 'on', formatOnPaste: true }}
            />
          </div>
        </div>

        {/* Preview (Right) */}
        <div className="playground-right">
          <div className="playground-iframe-wrap">
            <iframe
              title="preview"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-modals"
            />
          </div>

          {/* Console */}
          <div className="playground-console">
            <div className="playground-console-header">
              <h3 className="playground-console-title">Console</h3>
              <button 
                className="playground-btn-clear" 
                style={{ padding: '4px 8px', fontSize: '12px' }}
                onClick={() => setLogs([])}
              >
                Clear
              </button>
            </div>
            <div className="playground-console-body">
              {logs.length === 0 ? (
                <div className="playground-console-empty">Konsol bo'sh...</div>
              ) : (
                logs.map((log, idx) => (
                  <div 
                  key={idx} 
                  className={`playground-log ${log.level}`}
                >
                  <span className="playground-log-time">[{log.time}]</span>
                  {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
