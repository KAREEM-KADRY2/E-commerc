import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ShareProvider } from './context/ShareContext';
import { MarketProvider } from './context/MarketContext';
import AuthModal from './components/auth/AuthModal';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <WishlistProvider>
            <ShareProvider>
              <MarketProvider>
                <CartProvider>
                  <AppRoutes />
                </CartProvider>
              </MarketProvider>
            </ShareProvider>
          </WishlistProvider>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
