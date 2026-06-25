import React, { createContext, useContext, useState, useEffect } from 'react';
import { productShareService } from '../services/productShareService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { useTranslation } from 'react-i18next';

const ShareContext = createContext();

export const useShareContext = () => useContext(ShareContext);

export const ShareProvider = ({ children }) => {
  const [shareCode, setShareCode] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const { user, isLoggedIn, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Wait until auth state is known before processing the share code
    if (authLoading || hasProcessed) return;

    const processShareCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('share_code');
      if (code) {
        try {
          // Verify it via the API
          const response = await productShareService.resolveShareByCode(code);
          
          // Self-referral check: Don't allow using your own share link
          if (isLoggedIn && user && response && response.user_id === user.id) {
            showToast(t("You cannot use your own share link."));
            return;
          }

          if (response && response.share_code) {
            setShareCode(response.share_code);
            showToast(t("Product share applied successfully!"));
          } else {
            setShareCode(code);
            showToast(t("Product share applied successfully!"));
          }
        } catch (error) {
          console.error("Invalid share code:", error);
          showToast(t("Invalid or expired share link."));
        } finally {
          setHasProcessed(true);
        }
      } else {
        setHasProcessed(true);
      }
    };
    
    processShareCode();
  }, [authLoading, hasProcessed, isLoggedIn, user, showToast, t]);

  const clearShareCode = () => {
    setShareCode(null);
  };

  return (
    <ShareContext.Provider value={{ shareCode, setShareCode, clearShareCode }}>
      {children}
    </ShareContext.Provider>
  );
};
