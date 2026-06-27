import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Truck, Gift, Tag, ShieldCheck } from 'lucide-react';
import Hero from '../components/home/Hero';
import CategoriesGrid from '../components/categories/CategoriesGrid';
import ProductsGrid from '../components/products/ProductsGrid';
import TopDeals from '../components/home/TopDeals';
import { useProducts } from '../hooks/useProducts';
import { useTranslation } from 'react-i18next';
import { useMarket } from '../context/MarketContext';

const Home = ({ searchQuery, onResetSearch, groupState }) => {
  const { t } = useTranslation();
  const { products, categories, loading, error } = useProducts();
  const { marketData } = useMarket();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (location.hash === '#categories-section') {
      setTimeout(() => {
        const section = document.getElementById('categories-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>{t("Loading...")}</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{t(error)}</div>;

  return (
    <main className="main-content">
      <Hero 
        onOpenGroup={() => navigate('/active-group-buys')} 
        onExploreDeals={() => {
          const section = document.getElementById('trending-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <div className="feature-bar-wrapper">
        <div className="feature-bar">
          <div className="feature-item">
            <div className="feature-icon bg-blue-light">
              <Truck size={24} />
            </div>
            <div className="feature-text">
              <strong>{t("Free Shipping")}</strong>
              <span>{t("On orders over")} {marketData?.min_order || 1000} {marketData?.currency_symbol || t("AED")}</span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon bg-orange-light">
              <Gift size={24} />
            </div>
            <div className="feature-text">
              <strong>{t("Cashback Rewards")}</strong>
              <span>{t("Earn big cashback on group buys")}</span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon bg-green-light">
              <Tag size={24} />
            </div>
            <div className="feature-text">
              <strong>{t("Daily Deals")}</strong>
              <span>{t("New offers every day")}</span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon bg-purple-light">
              <ShieldCheck size={24} />
            </div>
            <div className="feature-text">
              <strong>{t("Secure Payments")}</strong>
              <span>{t("100% secure checkout")}</span>
            </div>
          </div>
        </div>
      </div>

      <section id="categories-section" className="section-padding">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t("Explore Categories")}</h2>
          <Link to="/category/all" style={{ color: '#008b8b', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {t("View All Categories")}
          </Link>
        </div>
        <CategoriesGrid 
          categories={categories} 
          currentCategory={selectedCategory} 
          onSelectCategory={handleSelectCategory} 
        />
      </section>

      <section id="trending-section" className="products-section section-padding">
        <div className="section-header" style={{ alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#003b46', margin: '0 0 4px 0' }}>{t("Trending Deals")}</h2>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>{t("Discover the most popular products with cashback rewards.")}</p>
          </div>
          <Link to="/category/trending" className="view-all" style={{ marginTop: '4px' }}>{t("View All")} <i data-lucide="arrow-right"></i></Link>
        </div>
        <ProductsGrid 
          products={searchQuery ? filteredProducts : filteredProducts.slice(0, 8)} 
          onResetFilters={onResetSearch} 
        />
      </section>

      <TopDeals products={products} />
    </main>
  );
};

export default Home;

