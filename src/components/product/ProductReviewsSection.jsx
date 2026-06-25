import { useTranslation } from "react-i18next";
import React from 'react';
import { Star, Award, ShieldCheck, ArrowRight } from 'lucide-react';

const ProductReviewsSection = ({ reviews }) => {
  const { t } = useTranslation();
  if (!reviews) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} fill={i < Math.floor(rating) ? "#FFB800" : "transparent"} color={i < Math.floor(rating) ? "#FFB800" : "#e5e7eb"} />
    ));
  };

  const getPercentage = count => {
    if (!count || reviews.totalReviews === 0) return 0;
    return (count / reviews.totalReviews) * 100;
  };

  const avgRating = reviews.averageRating || 4.6;
  const totalRev = reviews.totalReviews || 120;
  
  const mockBreakdown = { 5: 84, 4: 24, 3: 7, 2: 2, 1: 3 };

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f3f5', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: '40px', height: '40px', background: '#e6f9f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008b8b' }}>
          <Award size={20} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1d20', margin: 0 }}>{t("Reviews & Ratings")}</h2>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Left: Overall Rating */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
          <div style={{ fontSize: '48px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{avgRating.toFixed(1)}</div>
          <div style={{ display: 'flex', gap: '2px', margin: '12px 0 8px 0' }}>
            {renderStars(avgRating)}
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>({totalRev} {t("Reviews")})</div>
        </div>

        {/* Middle: Breakdown */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.breakdown?.[star] || defaultBreakdown[star];
            const pct = Math.round(getPercentage(count) || (count / totalRev) * 100);
            return (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600', width: '20px' }}>{star} <Star size={10} fill="#6b7280" color="#6b7280" style={{ display: 'inline', verticalAlign: 'middle' }} /></div>
                <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '13px', color: '#4b5563', width: '32px', textAlign: 'right' }}>{pct}%</div>
              </div>
            );
          })}
        </div>

        {/* Right: Review Items */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
          {(reviews.items?.slice(0, 2) || []).map(review => (
            <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '24px', borderBottom: '1px solid #f1f3f5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}&background=f3f4f6`} alt={review.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1a1d20' }}>{review.name}</span>
                      {review.verified && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#008b8b', fontSize: '12px', fontWeight: '600' }}>
                          <ShieldCheck size={14} /> {t("Verified Buyer")}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{review.date}</div>
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, paddingLeft: '52px' }}>{review.text}</p>
            </div>
          ))}

          <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#008b8b', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}>
            {t(`View All ${totalRev} Reviews`)} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsSection;