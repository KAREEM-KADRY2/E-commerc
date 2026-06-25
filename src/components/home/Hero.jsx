import React, { useState, useEffect } from 'react';
import { Users, ChevronLeft, ChevronRight, Compass, Wallet, Smartphone, Headphones, ShoppingBag, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { contentService } from '../../services/contentService';

const getFallbackSlides = (t) => [
  {
    id: 1,
    title: <>{t("Together,")}<br /><span style={{ color: '#f59e0b' }}>{t("We Save More")}</span></>,
    subtitle: t('Team up with friends and unlock bigger savings on every group purchase.'),
    bgColor: 'linear-gradient(135deg, #F2F3F5 0%, #E6E8EB 100%)', // Soft Silver Gray
    titleColor: '#1a1d20',
    subtitleColor: '#495057',
    productName: 'iPhone 14 Pro Max',
    productPrice: '46,800 AED',
    productCashback: t('Earn 4,680 AED Cashback'),
    totalCashback: t('Total Cashback +12,000 AED'),
    productIcon: <Smartphone size={18} />,
    productImage: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80',
    btnPrimaryBg: '#1a1d20',
    btnPrimaryText: '#ffffff',
    btnOutlineColor: '#1a1d20'
  }
];

const Hero = ({ onOpenGroup, onExploreDeals }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(getFallbackSlides(t));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await contentService.getBanners();
        const data = Array.isArray(res) ? res : (res?.data || []);
        if (data && data.length > 0) {
          // Map API banners to expected slide format
          const mappedSlides = data.map((b, idx) => ({
            id: b.id || idx,
            title: b.title || 'Special Offer',
            subtitle: b.description || 'Discover our new deals.',
            bgColor: b.bg_color || 'linear-gradient(135deg, #F2F3F5 0%, #E6E8EB 100%)',
            titleColor: b.title_color || '#1a1d20',
            subtitleColor: b.subtitle_color || '#495057',
            productName: b.product_name || 'Featured Product',
            productPrice: b.product_price || '',
            productCashback: b.cashback_text || '',
            totalCashback: b.tag_text || t('Special Offer'),
            productIcon: <ShoppingBag size={18} />,
            productImage: b.image || 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80',
            btnPrimaryBg: '#1a1d20'
          }));
          setSlides(mappedSlides);
        } else {
          // If empty, keep fallback
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [t]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide] || slides[0];

  if (loading) {
     return <div style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t("Loading Banners...")}</div>;
  }

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '48px', minHeight: '450px' }}>
      {slides.map((s, idx) => (
        <div 
          key={`bg-${s.id}`}
          style={{ 
            position: 'absolute', inset: 0, 
            background: s.bgColor, 
            opacity: currentSlide === idx ? 1 : 0, 
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 0
          }} 
        />
      ))}
      <div className="hero-bg" style={{ backgroundColor: 'transparent' }}></div>
      <div className="hero-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '64px', position: 'relative', zIndex: 2 }}>
        
        <div className="hero-left" style={{ maxWidth: '500px' }}>
          {slide.totalCashback && (
            <div style={{ display: 'inline-block', background: '#f5a623', color: '#1a1d20', padding: '8px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: '800', marginBottom: '16px', boxShadow: '0 8px 24px rgba(245, 166, 35, 0.4)' }}>
              {slide.totalCashback}
            </div>
          )}
          <h1 className="hero-title" style={{ color: slide.titleColor, fontSize: '56px', fontWeight: '900', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '24px' }}>
            {slide.title}
          </h1>
          <p className="hero-subtitle" style={{ color: slide.subtitleColor, fontSize: '18px', fontWeight: '500', marginBottom: '40px', lineHeight: 1.7, maxWidth: '90%' }}>
            {slide.subtitle}
          </p>
        </div>
        
        <div className="hero-right" style={{ position: 'relative', width: '500px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ borderRadius: '24px', width: '100%', height: '100%', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            <img src={slide.productImage} alt={slide.productName} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease', filter: 'saturate(0.85)', borderRadius: '24px' }} />
            
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '100px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008b8b' }}>
                {slide.productIcon}
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#1a1d20', marginBottom: '2px' }}>{slide.productName}</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#008b8b' }}>{slide.productPrice}</div>
              </div>
            </div>

            <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#f59e0b', color: 'white', padding: '8px 16px', borderRadius: '100px', zIndex: 20, fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Zap size={14} fill="white" /> {t("Limited Offer")}
            </div>

            {slide.productCashback && (
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'white', padding: '10px 20px', borderRadius: '100px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008b8b' }}>
                  <Wallet size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1a1d20', marginBottom: '2px' }}>{slide.productCashback}</div>
                  <div style={{ fontSize: '12px', color: '#6c757d', fontWeight: '500' }}>{t("on this group buy")}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {slides.length > 1 && (
        <>
          <button className="hero-slider-btn" onClick={prevSlide} style={{ left: '24px' }}>
            <ChevronLeft size={20} />
          </button>
          <button className="hero-slider-btn" onClick={nextSlide} style={{ right: '24px' }}>
            <ChevronRight size={20} />
          </button>
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
            {slides.map((s, index) => (
              <div 
                key={s.id} 
                onClick={() => setCurrentSlide(index)}
                style={{ width: index === currentSlide ? '24px' : '8px', height: '8px', backgroundColor: index === currentSlide ? slide.btnPrimaryBg : 'rgba(0,0,0,0.1)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease' }}
              ></div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
