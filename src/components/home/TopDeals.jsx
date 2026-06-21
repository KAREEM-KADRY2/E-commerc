import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Share2 } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { useTranslation } from 'react-i18next';

const TopDeals = ({ products }) => {
  const { t } = useTranslation();
  if (!products || products.length === 0) return null;

  return (
    <section className="section-padding" style={{ marginBottom: '40px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#003b46', margin: 0 }}>{t("Top Deals")}</h2>
        <Link to="/category/deals" style={{ color: '#008b8b', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {t("View All")} <ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {products.slice(0, 6).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopDeals;
