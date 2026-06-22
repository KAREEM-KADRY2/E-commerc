import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Truck, ShieldCheck, Undo2, ArrowRight, Play, Apple } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const Facebook = ({ size = 20 }) => { const { t } = useTranslation();
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
};
const Instagram = ({ size = 20 }) => { const { t } = useTranslation();
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
};
const Twitter = ({ size = 20 }) => { const { t } = useTranslation();
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
};
const TikTok = ({ size = 20 }) => { const { t } = useTranslation();
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-8-8H7v15a4 4 0 0 1-4-4z" /></svg>;
};
const Footer = () => { const { t } = useTranslation();
  return <footer style={{
    background: 'linear-gradient(135deg, #063B3B 0%, #0A4E4E 100%)',
    color: '#fff',
    paddingTop: '24px',
    paddingBottom: '16px',
    fontFamily: 'Inter, sans-serif',
    marginTop: 'auto'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    }}>
        
        {/* Main Links (4 compact columns) */}
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '24px',
        justifyContent: 'space-between'
      }}>
          
          {/* COLUMN 1 - BuySAWA */}
          <div style={{
          flex: '1 1 200px'
        }}>
            <div style={{
            fontSize: '20px',
            fontWeight: '900',
            color: '#fff',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}><span style={{color: '#fff'}}>Buy</span><span style={{color: '#FFA726'}}>SAWA</span>
            </div>
            <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '12px',
            lineHeight: '1.4',
            marginBottom: '10px',
            maxWidth: '250px'
          }}>
              {t("Your smarter way to shop online. Best products and exclusive cashback.")}
            </p>
            <div style={{
            display: 'flex',
            gap: '8px'
          }}>
              {[Facebook, Instagram, Twitter, TikTok].map((Icon, i) => {
              return <a key={i} href="#" style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textDecoration: 'none',
                transition: 'background 0.3s'
              }} onMouseEnter={e => e.currentTarget.style.background = '#FFA726'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                  <Icon size={16} />
                </a>;
            })}
            </div>
          </div>

          {/* COLUMN 2 - Shop */}
          <div style={{
          flex: '1 1 120px'
        }}>
            <h4 style={{
            color: '#FFA726',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>{t("Shop")}</h4>
            <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
              {[
                { name: "Men's Clothing", path: "/category/mens-clothing" },
                { name: "Women's Clothing", path: "/category/womens-clothing" },
                { name: "Shoes", path: "/category/shoes" },
                { name: "Watches", path: "/category/watches" },
                { name: "Electronics", path: "/category/electronics" },
                { name: "Audio", path: "/category/audio" }
              ].map(link => {
              return <li key={link.name}><Link to={link.path} style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'color 0.3s'
                }} onMouseEnter={e => e.currentTarget.style.color = '#FFA726'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>{t(link.name)}</Link></li>;
            })}
            </ul>
          </div>

          {/* COLUMN 3 - My Account */}
          <div style={{
          flex: '1 1 120px'
        }}>
            <h4 style={{
            color: '#FFA726',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>{t("My Account")}</h4>
            <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
              {[
                { name: "My Orders", path: "/orders" },
                { name: "My Groups", path: "/active-group-buys" },
                { name: "Wishlist", path: "/wishlist" },
                { name: "Wallet", path: "/wallet" }
              ].map(link => {
              return <li key={link.name}><Link to={link.path} style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'color 0.3s'
                }} onMouseEnter={e => e.currentTarget.style.color = '#FFA726'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>{t(link.name)}</Link></li>;
            })}
            </ul>
          </div>

          {/* COLUMN 4 - Support */}
          <div style={{
          flex: '1 1 120px'
        }}>
            <h4 style={{
            color: '#FFA726',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>{t("Support")}</h4>
            <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
              {[
                { name: "Help Center / FAQs", path: "/help" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" }
              ].map(link => {
              return <li key={link.name}><Link to={link.path} style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'color 0.3s'
                }} onMouseEnter={e => e.currentTarget.style.color = '#FFA726'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>{t(link.name)}</Link></li>;
            })}
            </ul>
          </div>

          {/* COLUMN 5 - Download App */}
          <div style={{
          flex: '1 1 140px'
        }}>
            <h4 style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: '700',
            marginBottom: '12px',
            textAlign: 'left'
          }}>{t("Download Our App")}</h4>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
              <a href="#" style={{
                background: '#000',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
                width: 'fit-content'
              }} onMouseEnter={e => e.currentTarget.style.background = '#111'} onMouseLeave={e => e.currentTarget.style.background = '#000'}>
                <Play size={24} fill="#fff" strokeWidth={1} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', opacity: 0.8, lineHeight: 1, marginBottom: '2px' }}>{t("GET IT ON")}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: 1 }}>{t("Google Play")}</span>
                </div>
              </a>
              
              <a href="#" style={{
                background: '#000',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
                width: 'fit-content'
              }} onMouseEnter={e => e.currentTarget.style.background = '#111'} onMouseLeave={e => e.currentTarget.style.background = '#000'}>
                <Apple size={24} fill="#fff" strokeWidth={1} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', opacity: 0.8, lineHeight: 1, marginBottom: '2px' }}>{t("Download on the")}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: 1 }}>{t("App Store")}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Feature Row */}
        <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
        marginBottom: '12px'
      }}>
          {[{
          icon: Truck,
          title: 'Free Shipping',
          desc: 'Orders over 1,000 AED'
        }, {
          icon: ShieldCheck,
          title: 'Secure Payments',
          desc: '100% secure checkout'
        }, {
          icon: Undo2,
          title: 'Easy Returns',
          desc: '30-day money-back guarantee'
        }].map((feature, i) => {
          return <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
              <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <feature.icon size={16} color="#FFA726" />
              </div>
              <div>
                <h5 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 2px 0'
              }}>{t(feature.title)}</h5>
                <p style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.6)',
                margin: 0
              }}>{t(feature.desc)}</p>
              </div>
            </div>;
        })}
        </div>

        {/* Bottom Bar */}
        <div style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '13px'
      }}>
          {t("© 2025 BuySAWA. All rights reserved.")}
        </div>

      </div>
    </footer>;
};
export default Footer;