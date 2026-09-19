import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary tutgan xatolik:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a',
          color: '#e2e8f0', fontFamily: 'sans-serif', textAlign: 'center', padding: '20px'
        }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px', color: '#ef4444' }}>Opps! Sayt buzildi 😅</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            Dasturda kutilmagan xatolik yuz berdi. Iltimos, sahifani yangilang.
          </p>
          <div style={{
            backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', 
            border: '1px solid #334155', maxWidth: '600px', width: '100%', 
            overflowX: 'auto', textAlign: 'left', color: '#f87171', fontFamily: 'monospace'
          }}>
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px', padding: '10px 20px', backgroundColor: '#3b82f6', 
              color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Sahifani yangilash
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}
