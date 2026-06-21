const fs = require('fs');
const file = 'c:/Users/pc/Desktop/E-commerc/src/pages/CategoryPage.jsx';

let content = fs.readFileSync(file, 'utf8');

// The file got completely mangled. Let's rebuild CategoryPage.jsx entirely from scratch to be safe.
const fullContent = `import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Share2, Heart, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductsByCategory } from '../services/api';
import DesktopFilterSidebar from '../components/category/DesktopFilterSidebar';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductsByCategory(categoryName);
        setCategoryProducts(products);
      } catch (err) {
        console.error("Failed to fetch products for category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory !== categoryName) {
      navigate(\`/category/\${newCategory}\`);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Category Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '73px',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#adb5bd', textDecoration: 'none' }}>{t("Home")}</Link>
          <ChevronRight size={14} color="#adb5bd" />
          <span style={{ color: '#1a1d20', fontWeight: '600' }}>{categoryName}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '10px 16px',
          width: '400px',
          border: '1px solid #e9ecef'
        }}>
          <Search size={18} color="#adb5bd" />
          <input type="text" placeholder={\`Search in \${categoryName}\`} style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            width: '100%',
            marginLeft: '12px',
            fontSize: '14px',
            color: '#495057'
          }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        </div>
      </div>

      <div className="category-page-layout">
        
        {/* Left Sidebar (Filters) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <DesktopFilterSidebar initialCategory={categoryName} onCategoryChange={handleCategoryChange} />
        </div>

        {/* Main Content Area */}
        <div>
          {/* Horizontal Promo Banner */}
          <div style={{
            background: 'linear-gradient(90deg, #e6f9f5 0%, #d1f4ec 100%)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #bcebe1'
          }}>
            <div style={{ maxWidth: '60%', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#005a5a',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Gift size={20} color="#fff" />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#003b46', margin: 0 }}>
                  {t("Create a Group")} - {categoryName}
                </h1>
              </div>
              
              <p style={{ fontSize: '16px', color: '#0b4c46', marginBottom: '24px', lineHeight: 1.6, fontWeight: '500' }}>
                {t("Invite friends to buy together and unlock massive cashback rewards. The more people join, the more everyone saves!")}
              </p>
              
              <button style={{
                background: '#008b8b',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0, 139, 139, 0.3)'
              }}>
                {t("Start a Group Now")} <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1d20', margin: 0 }}>
              {t("Showing")} {categoryProducts.length} {t("results")}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>{t("Sort by:")}</span>
              <select style={{
                padding: '10px 36px 10px 16px',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                fontWeight: '600',
                color: '#212529',
                cursor: 'pointer',
                appearance: 'none',
                outline: 'none',
                fontSize: '14px',
                fontFamily: 'inherit',
                backgroundImage: \`url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")\`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}>
                <option value="popular">{t("Most Popular")}</option>
                <option value="price-low">{t("Price: Low to High")}</option>
                <option value="price-high">{t("Price: High to Low")}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#adb5bd', fontSize: '18px', fontWeight: '600' }}>
              {t("Loading products...")}
            </div>
          ) : (
            <div className="category-product-grid">
              {categoryProducts.map(product => (
                <div key={product.id} onClick={() => navigate(\`/product/\${product.id}\`)} style={{
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}>
                  
                  {product.discount && <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#f5a623',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    zIndex: 10
                  }}>
                    {product.discount.replace('-', '')}
                  </div>}
                  <button style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <Share2 size={16} color="#495057" />
                  </button>

                  <div style={{ height: '200px', overflow: 'hidden', background: '#f8f9fa' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '16px' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#868e96',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '4px'
                    }}>{product.specifications?.Brand || 'Premium'}</div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1a1d20',
                      margin: '0 0 4px 0'
                    }}>{product.name}</h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      color: '#f5a623',
                      fontWeight: '700',
                      marginBottom: '12px'
                    }}>
                      ★ {product.rating} <span style={{ color: '#adb5bd', fontWeight: '500' }}>({product.reviewsCount})</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#1a1d20' }}>
                        {product.price.toLocaleString()}{t("EGP")}
                      </span>
                      <span style={{ fontSize: '13px', color: '#adb5bd', textDecoration: 'line-through', marginBottom: '2px' }}>
                        {product.oldPrice.toLocaleString()}{t("EGP")}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#adb5bd' }}>
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
\`;

fs.writeFileSync(file, fullContent);
console.log("Successfully overwrote CategoryPage.jsx");
