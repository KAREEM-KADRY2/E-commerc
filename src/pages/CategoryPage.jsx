import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProductsByCategory } from '../services/api';
import DesktopFilterSidebar from '../components/products/DesktopFilterSidebar';
import CategoryPromoBanner from '../components/categories/CategoryPromoBanner';
import CategoryProductCard from '../components/categories/CategoryProductCard';
import './CategoryPage.css';

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
      navigate(`/category/${newCategory}`);
    }
  };

  return (
    <div className="category-page-wrapper">
      
      <div className="category-header-sticky">
        <div className="category-breadcrumb">
          <Link to="/" className="category-breadcrumb-link">{t("Home")}</Link>
          <ChevronRight size={14} color="#adb5bd" />
          <span className="category-breadcrumb-active">{categoryName}</span>
        </div>

        <div className="category-search-bar">
          <Search size={18} color="#adb5bd" />
          <input 
            type="text" 
            placeholder={`${t("Search in")} ${categoryName}`} 
            className="category-search-input" 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        </div>
      </div>

      <div className="category-layout">
        
        <div className="category-sidebar">
          <DesktopFilterSidebar initialCategory={categoryName} onCategoryChange={handleCategoryChange} />
        </div>

        <div className="category-main-content">
          <CategoryPromoBanner categoryName={categoryName} />

          <div className="category-results-header">
            <h2 className="category-results-title">
              {t("Showing")} {categoryProducts.length} {t("results")}
            </h2>
            <div className="category-sort-controls">
              <span className="category-sort-label">{t("Sort by:")}</span>
              <select className="category-sort-select">
                <option value="popular">{t("Most Popular")}</option>
                <option value="price-low">{t("Price: Low to High")}</option>
                <option value="price-high">{t("Price: High to Low")}</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="category-loading">
              {t("Loading products...")}
            </div>
          ) : (
            <div className="category-product-grid">
              {categoryProducts.map(product => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
