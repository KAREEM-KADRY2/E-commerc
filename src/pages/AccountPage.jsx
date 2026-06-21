import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { 
  Globe, Mail, HelpCircle, Info, FileText, Shield, 
  User, ShoppingBag, Users, Heart, Wallet, Settings, LogOut, ChevronRight, ChevronDown 
} from 'lucide-react';

const AccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn, user, openAuthModal, logout } = useAuth();
  const [showMore, setShowMore] = useState(false);

  const generalLinks = [
    { icon: <Globe size={20} />, title: 'Language', action: () => {} }, // Could trigger language modal
    { icon: <HelpCircle size={20} />, title: 'Help Center / FAQs', action: () => navigate('/help') },
    { icon: <Shield size={20} />, title: 'Privacy Policy', action: () => navigate('/privacy') },
    { icon: <FileText size={20} />, title: 'Terms & Conditions', action: () => navigate('/terms') }
  ];

  const authLinks = [
    { icon: <User size={20} />, title: 'My Profile', action: () => navigate('/profile-details') },
    { icon: <ShoppingBag size={20} />, title: 'My Orders', action: () => navigate('/orders') },
    { icon: <Users size={20} />, title: 'My Groups', action: () => navigate('/active-group-buys') },
    { icon: <Heart size={20} />, title: 'Wishlist', action: () => navigate('/wishlist') },
    { icon: <Wallet size={20} />, title: 'Wallet', action: () => navigate('/wallet') },
    { icon: <Settings size={20} />, title: 'Settings', action: () => navigate('/settings') },
  ];

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '80px' }}>
      
      {/* Header */}
      <div style={{ background: '#fff', padding: '24px', borderBottom: '1px solid #e9ecef', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1d20', margin: 0, textAlign: 'center' }}>
          {t("Account")}
        </h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        
        {/* User Info / Guest Card */}
        {!isLoggedIn ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#e6f9f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <User size={32} color="#008b8b" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1d20', marginBottom: '8px' }}>
              {t("Welcome to BuySAWA")}
            </h2>
            <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '24px' }}>
              {t("Sign in or create an account to view your profile, orders, and more.")}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => openAuthModal('register')} 
                style={{ flex: 1, padding: '12px 0', border: '1px solid #008b8b', background: 'transparent', color: '#008b8b', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {t("Create Account")}
              </button>
              <button 
                onClick={() => openAuthModal('login')} 
                style={{ flex: 1, padding: '12px 0', background: '#008b8b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {t("Sign In")}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #008b8b 0%, #005a5a 100%)', borderRadius: '16px', padding: '24px', marginBottom: '24px', color: 'white', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 12px rgba(0, 139, 139, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : <User size={32} />}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>{user?.fullName || 'User'}</h2>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        )}

        {/* Links Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '8px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#adb5bd', padding: '16px 24px 8px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {isLoggedIn ? t("My Account") : t("General")}
          </h3>
          
          {isLoggedIn ? (
            <>
              {authLinks.map((link, index) => (
                <div 
                  key={`auth-${index}`}
                  onClick={link.action}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', cursor: 'pointer', borderBottom: '1px solid #f8f9fa' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#1a1d20', fontWeight: '500' }}>
                    <div style={{ color: '#008b8b' }}>{link.icon}</div>
                    {t(link.title)}
                  </div>
                  <ChevronRight size={18} color="#adb5bd" />
                </div>
              ))}
              
              {!showMore ? (
                <div 
                  onClick={() => setShowMore(true)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', cursor: 'pointer', transition: 'background 0.2s', color: '#008b8b', fontWeight: '600', fontSize: '14px', gap: '8px' }}
                >
                  {t("Show More")} <ChevronDown size={18} />
                </div>
              ) : (
                generalLinks.map((link, index) => (
                  <div 
                    key={`gen-${index}`}
                    onClick={link.action}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', cursor: 'pointer', borderTop: index === 0 ? '1px solid #f8f9fa' : 'none', borderBottom: index < generalLinks.length - 1 ? '1px solid #f8f9fa' : 'none', transition: 'background 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#1a1d20', fontWeight: '500' }}>
                      <div style={{ color: '#6c757d' }}>{link.icon}</div>
                      {t(link.title)}
                    </div>
                    <ChevronRight size={18} color="#adb5bd" />
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              {generalLinks.map((link, index) => (
                <div 
                  key={`gen-${index}`}
                  onClick={link.action}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', cursor: 'pointer', borderBottom: index < generalLinks.length - 1 ? '1px solid #f8f9fa' : 'none', transition: 'background 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#1a1d20', fontWeight: '500' }}>
                    <div style={{ color: '#6c757d' }}>{link.icon}</div>
                    {t(link.title)}
                  </div>
                  <ChevronRight size={18} color="#adb5bd" />
                </div>
              ))}
            </>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <>
              <div style={{ borderTop: '8px solid #f8f9fa' }}></div>
              <div 
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#dc3545', fontWeight: '600' }}>
                  <div><LogOut size={20} /></div>
                  {t("Logout")}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AccountPage;
