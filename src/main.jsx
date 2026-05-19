import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// PWA Service Worker ro'yxatdan o'tkazish
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Yangi versiya mavjud. Yangilashni xohlaysizmi?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("Ilova oflayn rejimda ishlashga tayyor.");
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
