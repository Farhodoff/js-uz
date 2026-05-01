import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Mermaid from './Mermaid';
import 'highlight.js/styles/atom-one-dark.css';

export default function TheoryTab({ activeLesson }) {
  if (!activeLesson) return null;

  return (
    <div className="theory-container" style={{ 
      background: "#201a12", 
      border: "1px solid #3a2e1e", 
      borderRadius: 10, 
      padding: "24px", 
      fontSize: 15, 
      color: "#e8d5b0",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    }}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match && match[1] === 'mermaid') {
              return <Mermaid chart={String(children).replace(/\n$/, '')} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => <h1 style={{ color: "#c8a96e", borderBottom: "1px solid #3a2e1e", paddingBottom: 10, marginBottom: 20 }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ color: "#c8a96e", marginTop: 30, marginBottom: 15 }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ color: "#c8a96e", marginTop: 25, marginBottom: 10 }}>{children}</h3>,
          p: ({ children }) => <p style={{ marginBottom: 16, lineHeight: 1.8 }}>{children}</p>,
          li: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "20px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #3a2e1e" }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => <th style={{ background: "#2a2015", padding: 12, border: "1px solid #3a2e1e", textAlign: "left" }}>{children}</th>,
          td: ({ children }) => <td style={{ padding: 12, border: "1px solid #3a2e1e" }}>{children}</td>,
        }}
      >
        {activeLesson.theory}
      </ReactMarkdown>
    </div>
  );
}
