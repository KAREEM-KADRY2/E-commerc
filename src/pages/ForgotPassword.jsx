import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Smartphone, KeyRound } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: phone, 2: otp, 3: new password
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      showToast(t('Please enter your phone number'));
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword(phone);
      showToast(t('OTP sent successfully'));
      setStep(2);
    } catch (err) {
      showToast(t('Failed to send OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      showToast(t('Please enter the OTP'));
      return;
    }
    setLoading(true);
    try {
      await authService.verifyForgotOtp(phone, otp);
      showToast(t('OTP verified successfully'));
      setStep(3);
    } catch (err) {
      showToast(t('Invalid OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || password !== confirmPassword) {
      showToast(t('Passwords do not match'));
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(phone, otp, password, confirmPassword);
      showToast(t('Password reset successfully'));
      navigate('/login');
    } catch (err) {
      showToast(t('Failed to reset password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginRight: '16px' }}>
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1d20', margin: 0 }}>{t("Reset Password")}</h1>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', background: '#e6f9f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={32} color="#008b8b" />
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '32px', lineHeight: '1.5' }}>
            {step === 1 && t("Enter your phone number to receive a verification code to reset your password.")}
            {step === 2 && t("Enter the 4-digit code sent to your phone.")}
            {step === 3 && t("Enter your new password to complete the reset process.")}
          </p>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e9ecef', borderRadius: '8px', padding: '12px' }}>
                <Smartphone size={20} color="#adb5bd" />
                <input 
                  type="tel" 
                  placeholder={t("Phone Number")} 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }} 
                />
              </div>
              <button disabled={loading} onClick={handleSendOtp} style={{ background: '#008b8b', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? t("Sending...") : t("Send OTP")}
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e9ecef', borderRadius: '8px', padding: '12px' }}>
                <KeyRound size={20} color="#adb5bd" />
                <input 
                  type="text" 
                  placeholder={t("Enter OTP")} 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px', letterSpacing: '2px' }} 
                  maxLength={6}
                />
              </div>
              <button disabled={loading} onClick={handleVerifyOtp} style={{ background: '#008b8b', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? t("Verifying...") : t("Verify OTP")}
              </button>
              <button disabled={loading} onClick={handleSendOtp} style={{ background: 'none', color: '#008b8b', border: 'none', padding: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {t("Resend OTP")}
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e9ecef', borderRadius: '8px', padding: '12px' }}>
                <Lock size={20} color="#adb5bd" />
                <input 
                  type="password" 
                  placeholder={t("New Password")} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }} 
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e9ecef', borderRadius: '8px', padding: '12px' }}>
                <Lock size={20} color="#adb5bd" />
                <input 
                  type="password" 
                  placeholder={t("Confirm Password")} 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }} 
                />
              </div>
              <button disabled={loading} onClick={handleResetPassword} style={{ background: '#008b8b', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? t("Resetting...") : t("Reset Password")}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
