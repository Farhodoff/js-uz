import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Segoe UI, sans-serif',
});

const Mermaid = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div key={chart} className="mermaid" ref={ref} style={{ background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, margin: "10px 0" }}>
      {chart}
    </div>
  );
};

export default Mermaid;
