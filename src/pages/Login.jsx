import { useTranslation } from "react-i18next";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const handleLogin = e => {
    e.preventDefault();
    login();
    navigate('/wallet'); // Or whatever the target was
  };
  return <div className="login-page" style={{
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif'
  }}>
      <div style={{
      marginBottom: '30px'
    }}>
        <ArrowLeft style={{
        cursor: 'pointer'
      }} onClick={() => navigate(-1)} />
      </div>
      
      <div style={{
      textAlign: 'center',
      marginBottom: '30px'
    }}>
        <div style={{
        background: '#008b8b',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>{t("BS")}</div>
        <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1a1a24'
      }}>{t("Welcome to Buy SAWA")}</h1>
        <p style={{
        color: '#666',
        fontSize: '14px'
      }}>{t("Log in to start a group and unlock group prices")}</p>
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '25px'
    }}>
        <button style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: 'white',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt={t("Google")} style={{
          width: '20px'
        }} />{t("Continue with Google")}</button>
        <button style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        background: 'black',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer'
      }}>{t("Continue with Apple")}</button>
      </div>

      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '25px',
      color: '#999',
      fontSize: '12px'
    }}>
        <div style={{
        flex: 1,
        height: '1px',
        background: '#e0e0e0'
      }}></div>{t("OR")}<div style={{
        flex: 1,
        height: '1px',
        background: '#e0e0e0'
      }}></div>
      </div>

      <div style={{
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    }}>
        <button style={{
        flex: 1,
        padding: '12px',
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        color: '#008b8b',
        fontWeight: '600'
      }}>{t("Email")}</button>
        <button style={{
        flex: 1,
        padding: '12px',
        background: '#f8f9fa',
        border: 'none',
        borderRadius: '8px',
        color: '#666'
      }}>{t("Phone")}</button>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '10px'
      }}>
          <div style={{
          position: 'relative'
        }}>
            <Mail size={18} style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }} />
            <input type="email" placeholder={t("you@example.com")} style={{
            width: '100%',
            padding: '15px 15px 15px 45px',
            border: 'none',
            background: '#f8f9fa',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }} required />
          </div>
          <div style={{
          position: 'relative'
        }}>
            <Lock size={18} style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }} />
            <input type="password" placeholder={t("Password")} style={{
            width: '100%',
            padding: '15px 15px 15px 45px',
            border: 'none',
            background: '#f8f9fa',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }} required />
          </div>
        </div>

        <div style={{
        textAlign: 'right',
        marginBottom: '25px'
      }}>
          <a href="#" style={{
          color: '#008b8b',
          fontSize: '12px',
          textDecoration: 'none'
        }}>{t("Forgot password?")}</a>
        </div>

        <button type="submit" style={{
        width: '100%',
        padding: '15px',
        background: '#008b8b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '20px'
      }}>{t("Log In")}</button>
      </form>

      <div style={{
      textAlign: 'center',
      fontSize: '14px',
      color: '#666'
    }}>{t("Don't have an account?")}<a href="#" style={{
        color: '#008b8b',
        fontWeight: 'bold',
        textDecoration: 'none'
      }}>{t("Sign up")}</a>
      </div>
    </div>;
};
export default Login;
