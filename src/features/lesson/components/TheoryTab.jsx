import React, { Suspense, lazy } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

// Mermaid og'ir kutubxona (~1MB) — faqat diagramma bor darslarda yuklansin
const Mermaid = lazy(() => import('./Mermaid'));

export default function TheoryTab({ activeLesson }) {
  if (!activeLesson) return null;

  return (
    <div className="theory-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match && match[1] === 'mermaid') {
              return (
                <Suspense fallback={<div style={{ opacity: 0.6, fontSize: 14 }}>Diagramma yuklanmoqda...</div>}>
                  <Mermaid chart={String(children).replace(/\n$/, '')} />
                </Suspense>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {activeLesson.theory || activeLesson.content}
      </ReactMarkdown>
    </div>
  );
}
