import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from '../features/layout/ErrorBoundary.jsx';
import '../index.css';
import '../config/monacoSetup.js';
import { registerSW } from 'virtual:pwa-register';

// PWA Service Worker ro'yxatdan o'tkazish (bloklamaydigan yangilash banneri bilan)
function showUpdateBanner(onUpdate) {
  if (document.getElementById('pwa-update-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.setAttribute('role', 'status');
  banner.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:1000;display:flex;gap:12px;align-items:center;background:#1e1e1e;color:#f8f9fa;border:1px solid #534AB7;border-radius:8px;padding:10px 16px;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,0.5);';
  banner.textContent = 'Yangi versiya mavjud. ';
  const btn = document.createElement('button');
  btn.textContent = 'Yangilash';
  btn.style.cssText = 'background:#d4af37;color:#000;border:none;border-radius:6px;padding:6px 14px;font-weight:600;cursor:pointer;';
  btn.onclick = () => { onUpdate(); banner.remove(); };
  const close = document.createElement('button');
  close.textContent = '✕';
  close.setAttribute('aria-label', 'Yopish');
  close.style.cssText = 'background:none;border:none;color:#c9ccd1;cursor:pointer;font-size:14px;';
  close.onclick = () => banner.remove();
  banner.appendChild(btn);
  banner.appendChild(close);
  document.body.appendChild(banner);
}

const updateSW = registerSW({
  onNeedRefresh() {
    showUpdateBanner(() => updateSW(true));
  },
  onOfflineReady() {
    console.log("Ilova oflayn rejimda ishlashga tayyor.");
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
