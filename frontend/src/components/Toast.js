import React, { useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: 'bg-emerald-600 border-emerald-700 text-white',
    error: 'bg-rose-600 border-rose-700 text-white',
    warning: 'bg-amber-500 border-amber-600 text-white',
    info: 'bg-blue-600 border-blue-700 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md shadow-2xl rounded-xl">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-lg ${
          bgColors[type] || bgColors.info
        }`}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 font-bold text-sm">
          {icons[type] || '•'}
        </span>
        <p className="text-sm font-medium pr-2 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-lg font-bold ml-2 leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
