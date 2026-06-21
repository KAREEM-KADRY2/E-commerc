import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
const ProfileDetails = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    showToast
  } = useToast();
  const {
    user,
    setUser
  } = useAuth();
  const [formData, setFormData] = useState(user);
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    // Here we would typically make an API call to save
    setUser(formData);
    showToast('Profile updated successfully!');
  };
  return <div style={{
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
    background: '#f8f9fa',
    minHeight: '100vh'
  }}>
      {/* Header */}
      <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginBottom: '40px'
    }}>
        <div onClick={() => navigate(-1)} style={{
        position: 'absolute',
        left: 0,
        width: '36px',
        height: '36px',
        background: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
          <ArrowLeft size={18} color="#4a5568" />
        </div>
        <h2 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
        color: '#003b46'
      }}>{t("Profile")}</h2>
      </div>

      {/* Avatar Section */}
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '40px'
    }}>
        <div style={{
        position: 'relative',
        marginBottom: '16px'
      }}>
          <div style={{
          width: '90px',
          height: '90px',
          background: '#008080',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <User size={40} color="white" />
          </div>
          <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '28px',
          height: '28px',
          background: '#f6a728',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white',
          cursor: 'pointer'
        }}>
            <Camera size={14} color="white" />
          </div>
        </div>
        <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 0 4px 0',
        color: '#003b46'
      }}>{formData.fullName}</h3>
        <p style={{
        margin: 0,
        color: '#718096',
        fontSize: '14px'
      }}>{formData.phone}</p>
      </div>

      {/* Form Fields */}
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '40px'
    }}>
        
        <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
            <User size={16} color="#008080" />
            <label style={{
            fontSize: '12px',
            color: '#a0aec0',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>{t("FULL NAME")}</label>
          </div>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#003b46',
          border: 'none',
          outline: 'none',
          background: 'transparent'
        }} />
        </div>

        <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
            <Phone size={16} color="#008080" />
            <label style={{
            fontSize: '12px',
            color: '#a0aec0',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>{t("PHONE NUMBER")}</label>
          </div>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#003b46',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          direction: 'ltr'
        }} />
        </div>

        <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
            <Mail size={16} color="#008080" />
            <label style={{
            fontSize: '12px',
            color: '#a0aec0',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>{t("EMAIL")}</label>
          </div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#003b46',
          border: 'none',
          outline: 'none',
          background: 'transparent'
        }} />
        </div>

        <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
            <MapPin size={16} color="#008080" />
            <label style={{
            fontSize: '12px',
            color: '#a0aec0',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>{t("ADDRESS")}</label>
          </div>
          <input type="text" name="address" value={formData.address} onChange={handleChange} style={{
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#003b46',
          border: 'none',
          outline: 'none',
          background: 'transparent'
        }} />
        </div>

      </div>

      <button onClick={handleSave} style={{
      width: '100%',
      padding: '16px',
      background: '#008b8b',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}>{t("Save Changes")}</button>
    </div>;
};
export default ProfileDetails;