import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Wallet, Bell, Globe, Check, Menu, X, Heart, User } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, languages } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import './Header.css';
const Header = ({
  searchQuery,
  setSearchQuery
}) => {
  const {
    t
  } = useTranslation();
  const {
    cartTotalItems
  } = useCartContext();
  const {
    wishlistTotalItems
  } = useWishlistContext();
  const {
    isLoggedIn,
    openAuthModal,
    user
  } = useAuth();
  const avatarLetters = user?.fullName ? user.fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'AH';
  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Ahmed';
  const {
    currentLanguage,
    setCurrentLanguage
  } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  return <header className="header" ref={headerRef}>
      <div className="header-container">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="logo">
            <span className="logo-buy">Buy</span>
            <span className="logo-sawa">SAWA</span>
          </Link>
        </div>


        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>{t("Home")}</Link>
          <Link to="/active-group-buys" className={`nav-link ${location.pathname === '/active-group-buys' ? 'active' : ''}`}>{t("Deals")}</Link>
          
          {/* Mobile Only Menu Items */}
          <div className="mobile-only-links">
            <Link to={isLoggedIn ? '/wallet' : '#'} onClick={e => {
            if (!isLoggedIn) {
              e.preventDefault();
              openAuthModal();
            }
          }} className="nav-link">
              <Wallet size={18} /> {t("Wallet")}
            </Link>
            <Link to="/account" className="nav-link">
              <User size={18} /> {t("Account")}
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <div style={{
          position: 'relative'
        }} ref={dropdownRef}>
            <button className="icon-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Globe size={18} />
              <span style={{
              fontSize: '16px',
              marginLeft: '4px'
            }}>{currentLanguage.flag}</span>
            </button>

            {isDropdownOpen && <div className="lang-dropdown">
                {languages.map(lang => {
              const isSelected = currentLanguage.code === lang.code;
              return <div key={lang.code} onClick={() => {
                setCurrentLanguage(lang);
                setIsDropdownOpen(false);
              }} className={`lang-option ${isSelected ? 'selected' : ''}`}>
                      <div className="lang-flag">{lang.flag}</div>
                      <div className="lang-info">
                        <span className="lang-name">{lang.name}</span>
                        <span className="lang-native">{lang.nativeName}</span>
                      </div>
                      {isSelected && <Check size={16} color="#008b8b" />}
                    </div>;
            })}
              </div>}
          </div>


          <button className="icon-btn" onClick={() => isLoggedIn ? navigate('/cart') : openAuthModal('cart')}>
            <ShoppingCart size={20} />
            {cartTotalItems > 0 && <span className="badge">{cartTotalItems}</span>}
          </button>

          <button className="icon-btn">
            <Bell size={20} />
          </button>

          <div className="desktop-only-actions">
            <Link to={isLoggedIn ? '/wallet' : '#'} onClick={e => {
            if (!isLoggedIn) {
              e.preventDefault();
              openAuthModal();
            }
          }} className="wallet">
              <Wallet size={18} />
              <span>{t("Wallet")}</span>
            </Link>            
            <div style={{ position: 'relative' }}>
              <button onClick={() => navigate('/account')} className="user-profile" style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}>
                <div className="avatar" style={{ background: '#e9ecef', color: '#495057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} />
                </div>
                {isLoggedIn && <span className="user-greeting" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>{firstName} ▼</span>}
              </button>


            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;