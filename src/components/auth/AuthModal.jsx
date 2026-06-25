import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAuthApi } from '../../hooks/useAuthApi';
import './AuthModal.css';
const AuthModal = () => {
  const {
    t
  } = useTranslation();
  const {
    isAuthModalOpen,
    closeAuthModal,
    login,
    authIntent
  } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthModalOpen) {
      if (authIntent === 'register') {
        setMode('signup');
      } else {
        setMode('login');
      }
    }
  }, [isAuthModalOpen, authIntent]);
  const {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleGoogleLogin
  } = useAuthApi();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  if (!isAuthModalOpen) return null;
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (mode === 'login') {
      try {
        await handleLogin(formData.email, formData.password);
        // After successful API login, set global auth state
        login();
        closeAuthModal();
        if (authIntent === 'cart') {
          navigate('/cart');
        }
      } catch (err) {
        // Error is handled by hook and displayed below
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        // Handle validation error (can add local state for this)
        alert('Passwords do not match');
        return;
      }
      try {
        await handleRegister({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        // After successful API register, set global auth state
        login();
        closeAuthModal();
        if (authIntent === 'cart') {
          navigate('/cart');
        }
      } catch (err) {
        // Error is handled by hook
      }
    }
  };
  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin();
      login();
      closeAuthModal();
      if (authIntent === 'cart') {
        navigate('/cart');
      }
    } catch (err) {
      // Error handled
    }
  };
  return <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-container" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={closeAuthModal}>
          <X size={24} />
        </button>

        <div className="auth-modal-header">
          <h2>{mode === 'login' ? 'مرحباً بك في BuySAWA' : 'إنشاء حساب جديد'}</h2>
          <p>
            {mode === 'login' ? 'سجل الدخول للوصول إلى الكاش باك والعروض الحصرية ومميزات الشراء الجماعي.' : 'انضم إلينا الآن واستمتع بأفضل العروض والمميزات.'}
          </p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          {mode === 'signup' && <>
              <div className="auth-input-group">
                <User size={20} className="auth-input-icon" />
                <input type="text" name="fullName" placeholder="الاسم الكامل" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="auth-input-group">
                <Phone size={20} className="auth-input-icon" />
                <input type="tel" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
              </div>
            </>}

          <div className="auth-input-group">
            <Mail size={20} className="auth-input-icon" />
            <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <Lock size={20} className="auth-input-icon" />
            <input type="password" name="password" placeholder="كلمة المرور" value={formData.password} onChange={handleChange} required />
          </div>

          {mode === 'signup' && <div className="auth-input-group">
              <Lock size={20} className="auth-input-icon" />
              <input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" value={formData.confirmPassword} onChange={handleChange} required />
            </div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'جاري التحميل...' : mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </button>
        </form>

        {mode === 'login' && <button type="button" className="auth-google-btn" onClick={onGoogleLogin} disabled={loading}>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>{t("المتابعة بواسطة Google")}</button>}

        <div className="auth-modal-footer">
          {mode === 'login' ? <>
              <a href="#" className="auth-forgot-link" onClick={(e) => { e.preventDefault(); closeAuthModal(); navigate('/forgot-password'); }}>نسيت كلمة المرور؟</a>
              <p>
                ليس لديك حساب؟{' '}
                <button className="auth-switch-btn" onClick={() => setMode('signup')}>
                  إنشاء حساب
                </button>
              </p>
            </> : <p>
              لديك حساب بالفعل؟{' '}
              <button className="auth-switch-btn" onClick={() => setMode('login')}>
                تسجيل الدخول
              </button>
            </p>}
        </div>
      </div>
    </div>;
};
export default AuthModal;