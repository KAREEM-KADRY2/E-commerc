import { useTranslation } from "react-i18next";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, HelpCircle, HelpCircle as FaqIcon, HeadphonesIcon, Globe, Trash2, LogOut, ChevronRight, LogIn, Heart, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
const Profile = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    isLoggedIn,
    logout,
    openAuthModal,
    user
  } = useAuth();
  const {
    setIsLanguageModalOpen,
    currentLanguage
  } = useLanguage();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <div className="profile-page" style={{
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
    background: '#f8f9fa',
    minHeight: '100vh'
  }}>
      
      {isLoggedIn ? <div className="profile-header-center" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
      marginTop: '20px'
    }}>
          <div className="profile-avatar-large" style={{
        width: '80px',
        height: '80px',
        background: '#008b8b',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
            <User size={40} color="#fff" />
          </div>
          <h2 className="profile-name" style={{
        margin: '0 0 8px 0',
        fontSize: '20px',
        color: '#1a1a24'
      }}>{user?.fullName || 'Guest User'}</h2>
          <p className="profile-phone" style={{
        margin: 0,
        color: '#999',
        fontSize: '14px'
      }}>{user?.phone}</p>
        </div> : <div className="profile-header-guest" style={{
      background: 'linear-gradient(135deg, #008b8b, #00a896)',
      borderRadius: '24px',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
      marginTop: '20px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
          {/* Background circles for design */}
          <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }}></div>
          <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '-20px',
        width: '120px',
        height: '120px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }}></div>

          <div className="profile-avatar-guest" style={{
        width: '70px',
        height: '70px',
        border: '1px dashed rgba(255,255,255,0.6)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        zIndex: 1
      }}>
            <User size={30} color="#fff" />
          </div>
          <h2 style={{
        margin: '0 0 8px 0',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 1
      }}>{t("Welcome, Guest")}</h2>
          <p style={{
        margin: '0 0 20px 0',
        fontSize: '14px',
        opacity: 0.9,
        textAlign: 'center',
        zIndex: 1
      }}>{t("Sign in to unlock cashback & deals")}</p>
          
          <button onClick={openAuthModal} style={{
        background: '#f2994a',
        color: '#1a1a24',
        border: 'none',
        padding: '14px 32px',
        borderRadius: '24px',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(242, 153, 74, 0.3)',
        zIndex: 1
      }}>
            <LogIn size={20} />{t("Login / Sign Up")}</button>
        </div>}

      <div className="profile-section">
        <p className="section-label" style={{
        fontSize: '12px',
        color: '#999',
        fontWeight: 'bold',
        marginBottom: '10px',
        marginLeft: '10px'
      }}>{t("ACCOUNT")}</p>
        
        <div className="profile-card-list" style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '20px'
      }}>
          
          {isLoggedIn && <div className="profile-list-item" onClick={() => navigate('/profile-details')} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}>
              <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
                <div className="icon-wrapper icon-teal" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e6f4f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#008b8b'
            }}>
                  <User size={20} />
                </div>
                <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("Profile")}</span>
              </div>
              <ChevronRight size={18} color="#ccc" />
            </div>}

          {isLoggedIn && <div className="profile-list-item" onClick={() => navigate('/wishlist')} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}>
            <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
              <div className="icon-wrapper" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#ffe6e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444'
            }}>
                <Heart size={20} />
              </div>
              <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("Wishlist")}</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>}



          <div className="profile-list-item" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}>
            <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
              <div className="icon-wrapper icon-teal-light" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e6f9f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00a896'
            }}>
                <HelpCircle size={20} />
              </div>
              <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("Help Center")}</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>

          <div className="profile-list-item" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}>
            <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
              <div className="icon-wrapper icon-purple" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#f3e8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9b51e0'
            }}>
                <FaqIcon size={20} />
              </div>
              <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("FAQs")}</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>

          <div className="profile-list-item" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer'
        }}>
            <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
              <div className="icon-wrapper icon-orange" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#fff0e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f2994a'
            }}>
                <HeadphonesIcon size={20} />
              </div>
              <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("Contact Us")}</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>

          <div className="profile-list-item no-border" onClick={() => setIsLanguageModalOpen(true)} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          cursor: 'pointer'
        }}>
            <div className="profile-item-left" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
              <div className="icon-wrapper icon-blue" style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e6f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2f80ed'
            }}>
                <Globe size={20} />
              </div>
              <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a24'
            }}>{t("Language")}</span>
            </div>
            <div className="profile-item-right" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
              <span className="language-text" style={{
              fontSize: '14px',
              color: '#999'
            }}>{currentLanguage.name}</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          </div>
        </div>

        {isLoggedIn && <>
            <div className="profile-card-list mt-24" style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '30px'
        }}>
              <div className="profile-list-item no-border text-danger" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            cursor: 'pointer'
          }}>
                <div className="profile-item-left" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
                  <div className="icon-wrapper icon-red-light" style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ffe6e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#eb5757'
              }}>
                    <Trash2 size={20} />
                  </div>
                  <span style={{
                fontSize: '15px',
                fontWeight: '500',
                color: '#eb5757'
              }}>{t("Delete Account")}</span>
                </div>
                <ChevronRight size={18} color="#eb5757" />
              </div>
            </div>

            <button onClick={handleLogout} className="logout-btn mt-24" style={{
          width: '100%',
          padding: '16px',
          background: 'white',
          color: '#eb5757',
          border: '1px solid #ffe6e6',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
              <LogOut size={20} />{t("Logout")}</button>
          </>}
      </div>
    </div>;
};
export default Profile;