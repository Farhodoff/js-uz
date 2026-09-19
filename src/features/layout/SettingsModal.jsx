import React, { useRef, useState } from "react";

export default function SettingsModal({ isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const data = {
        progress: localStorage.getItem("js-academy-progress-store"),
        challenges: localStorage.getItem("js_challenges"),
        attempts: localStorage.getItem("js_attempts")
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `js-uz-backup-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus("✅ Ma'lumotlar muvaffaqiyatli yuklab olindi!");
    } catch (e) {
      setStatus("❌ Xatolik yuz berdi: " + e.message);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.progress) localStorage.setItem("js-academy-progress-store", data.progress);
        if (data.challenges) localStorage.setItem("js_challenges", data.challenges);
        if (data.attempts) localStorage.setItem("js_attempts", data.attempts);
        
        setStatus("✅ Ma'lumotlar tiklandi! Sahifa yangilanmoqda...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        setStatus("❌ Faylni o'qishda xatolik: Noto'g'ri format!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>⚙️ Sozlamalar va Zaxira (Backup)</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Barcha yutuqlaringiz, XP ochkolaringiz va yechgan masalalaringiz brauzer xotirasida (LocalStorage) saqlanadi. 
          Agar siz brauzer tarixini tozalasangiz yoki boshqa qurilmaga o'tsangiz, ma'lumotlaringiz yo'qoladi. 
          Shuning uchun ularni fayl ko'rinishida yuklab oling va kerak bo'lganda qayta yuklang.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={handleExport} style={{ justifyContent: 'center' }}>
            ⬇️ Ma'lumotlarni Yuklab Olish (Export)
          </button>
          
          <div style={{ position: 'relative' }}>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} style={{ width: '100%', justifyContent: 'center' }}>
              ⬆️ Ma'lumotlarni Tiklash (Import)
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImport}
            />
          </div>
        </div>

        {status && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem' }}>
            {status}
          </div>
        )}

        <button className="btn btn-ghost" onClick={onClose} style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
          Yopish
        </button>
      </div>
    </div>
  );
}
