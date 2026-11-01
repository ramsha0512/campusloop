import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', title = '', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newToast = { id, message, type, title, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const success = useCallback((message, title = 'Success') => {
    return showToast(message, 'success', title);
  }, [showToast]);

  const error = useCallback((message, title = 'Error') => {
    return showToast(message, 'error', title, 5000);
  }, [showToast]);

  const warning = useCallback((message, title = 'Notice') => {
    return showToast(message, 'warning', title, 4500);
  }, [showToast]);

  const info = useCallback((message, title = 'CampusLoop') => {
    return showToast(message, 'info', title);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          let bgClass = "bg-white border-[#E8E7EE] text-[#171725]";
          let icon = <Info className="w-5 h-5 text-[#635BFF] shrink-0" />;
          let barClass = "bg-[#635BFF]";

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-5 h-5 text-[#22A06B] shrink-0" />;
            barClass = "bg-[#22A06B]";
          } else if (toast.type === 'error') {
            icon = <AlertCircle className="w-5 h-5 text-[#D64545] shrink-0" />;
            barClass = "bg-[#D64545]";
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-5 h-5 text-[#E6A700] shrink-0" />;
            barClass = "bg-[#E6A700]";
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 shadow-xl rounded-xl p-4 border flex items-start gap-3 bg-white relative overflow-hidden animate-slideUp`}
              style={{
                boxShadow: '0 12px 30px -4px rgba(23, 23, 37, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${barClass}`} />
              <div className="pt-0.5 ml-1">{icon}</div>
              <div className="flex-1 pr-2">
                {toast.title && (
                  <h4 className="font-semibold text-sm text-[#171725] leading-tight mb-0.5">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-[#77758A] leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#77758A] hover:text-[#171725] p-1 rounded-lg transition-colors -mr-1 -mt-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
