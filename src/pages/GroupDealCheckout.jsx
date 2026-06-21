import { useTranslation } from "react-i18next";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
const GroupDealCheckout = () => {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    products
  } = location.state || {
    products: []
  };
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  return <div style={{
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
    paddingBottom: '120px'
  }}>
      <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px'
    }}>
        
        {/* Header */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
          <button onClick={() => navigate(-1)} style={{
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          
          <h1 style={{
          fontSize: '20px',
          fontWeight: '800',
          color: '#003b46',
          margin: 0
        }}>{t("Group Deal Checkout")}</h1>
          
          <div style={{
          width: '40px',
          height: '40px',
          background: '#fff8e6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Lock size={18} color="#d97706" />
          </div>
        </div>

        {/* Products */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px'
      }}>
          {products.map((product, index) => {
          const {
            t
          } = useTranslation();
          return <div key={index} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
              <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#f8f9fa',
              border: '1px solid #e9ecef',
              flexShrink: 0
            }}>
                {product.image ? <img src={product.image} alt={product.name} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} /> : <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  </div>}
              </div>
              
              <div style={{
              flex: 1
            }}>
                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '4px'
              }}>
                  <h4 style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#003b46',
                  margin: 0
                }}>{product.name}</h4>
                  <div style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#d97706',
                  background: '#fff8e6',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                    <Lock size={10} />{t("LOCKED")}</div>
                </div>
                <div style={{
                fontSize: '13px',
                color: '#868e96',
                marginBottom: '8px'
              }}>{t("Color: Black | Size: Standard")}</div>
                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                  <div style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#008b8b'
                }}>{product.price} <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#868e96'
                  }}>{t("AED")}</span></div>
                  <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6c757d',
                  background: '#f8f9fa',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>{t("Qty 1")}</div>
                </div>
              </div>
            </div>;
        })}
        </div>

        {/* Locked Deal Disclaimer */}
        <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        borderLeft: '4px solid #d97706'
      }}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
            <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#fff8e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
              <ShieldCheck size={14} color="#d97706" />
            </div>
            <h3 style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#003b46',
            margin: 0
          }}>{t("Locked Group Deal")}</h3>
          </div>
          <p style={{
          fontSize: '14px',
          color: '#6c757d',
          lineHeight: '1.5',
          margin: '0 0 16px 0'
        }}>{t("Group deals cannot be modified. You will pay the original full price now. Once the group duration expires, your earned cashback discount will be credited to your Wallet.")}</p>
          <div style={{
          fontSize: '11px',
          fontWeight: '800',
          color: '#d97706',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          letterSpacing: '0.5px'
        }}>
            <span style={{
            border: '1px solid #d97706',
            borderRadius: '4px',
            padding: '2px 4px'
          }}>$</span>{t("CASHBACK CREDITED TO WALLET AFTER GROUP CLOSES")}</div>
        </div>

        {/* Total Section */}
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '24px'
      }}>
          <div>
            <div style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#868e96',
            letterSpacing: '0.5px',
            marginBottom: '4px'
          }}>{t("TOTAL • FULL PRICE")}</div>
            <div style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#1a1d20'
          }}>{totalPrice.toLocaleString()} <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#868e96'
            }}>{t("AED")}</span></div>
          </div>
          <div style={{
          fontSize: '11px',
          fontWeight: '800',
          color: '#d97706',
          background: '#fff8e6',
          padding: '6px 12px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
            <Lock size={12} />{t("SECURE LOCK")}</div>
        </div>

        {/* Action Button */}
        <button onClick={() => alert('Proceeding to payment gateway...')} style={{
        width: '100%',
        background: '#f59e0b',
        color: 'white',
        border: 'none',
        padding: '20px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
      }}>{t("Pay Full Price & Lock Deal")}</button>

      </div>
    </div>;
};
export default GroupDealCheckout;