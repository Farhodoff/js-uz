import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Segoe UI, sans-serif',
});

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    // Remove any special characters or spaces that could break element IDs
    const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    const renderChart = async () => {
      try {
        setError(null);
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError(err);
        }
        // Clean up bad elements created by mermaid in the body/DOM
        const badEl = document.getElementById(id);
        if (badEl) {
          badEl.remove();
        }
        // Also clean up any bindElement / wrapper if exists
        const bindEl = document.getElementById(`d${id}`);
        if (bindEl) {
          bindEl.remove();
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div style={{ color: '#e74c3c', padding: '12px', background: 'rgba(231, 76, 60, 0.1)', borderRadius: '8px', border: '1px dashed #e74c3c', margin: '10px 0' }}>
        <strong>Visualizatsiyani yuklashda xatolik yuz berdi.</strong>
        <p style={{ fontSize: '12px', margin: '5px 0 0 0', opacity: 0.8 }}>Diagramma sintaksisi yoki yuklanishda xato bor.</p>
      </div>
    );
  }

  return (
    <div 
      className="mermaid" 
      style={{ background: "rgba(0,0,0,0.2)", padding: 15, borderRadius: 8, margin: "15px 0", overflowX: 'auto', display: 'flex', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: svg || '<span style="opacity: 0.6; font-size: 14px;">Vizualizatsiya yuklanmoqda...</span>' }}
    />
  );
};

export default Mermaid;

