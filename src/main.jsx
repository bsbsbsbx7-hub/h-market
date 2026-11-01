import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

if (typeof window !== 'undefined') {
  if (import.meta.env && import.meta.env.VITE_SUPABASE_URL) {
    window.__HMARKET_SUPABASE_URL__ = import.meta.env.VITE_SUPABASE_URL;
  }
  if (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    window.__HMARKET_SUPABASE_KEY__ = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("App Crash Caught by ErrorBoundary:", error, errorInfo);
  }
  handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center', backgroundColor: '#f8fafc', color: '#0f172a' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '520px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '12px' }}>تنبيه تشغيل</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
              اضغط على الزر أدناه لتنظيف الذاكرة وتشغيل الموقع فوراً:
            </p>
            {this.state.error && (
              <pre style={{ fontSize: '11px', textAlign: 'left', background: '#f1f5f9', padding: '10px', borderRadius: '8px', overflowX: 'auto', marginBottom: '20px', color: '#334155' }}>
                {String(this.state.error)}
              </pre>
            )}
            <button
              onClick={this.handleResetStorage}
              style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
            >
              إعادة تهيئة الذاكرة وتشغيل الموقع الآن
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
