import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Info } from 'lucide-react';

const Toast = () => {
  const { toast } = useToast();

  return (
    <div className={`toast ${toast.isVisible ? 'show' : ''}`} id="toast">
      <Info size={18} />
      <span id="toastMessage">{toast.message}</span>
    </div>
  );
};

export default Toast;
