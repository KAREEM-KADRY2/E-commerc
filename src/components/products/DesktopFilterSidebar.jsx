import { useTranslation } from "react-i18next";
import React from 'react';
import { Filter, Check, ChevronLeft } from 'lucide-react';
import { useFilters } from '../../hooks/useFilters';
import './DesktopFilterSidebar.css';
const DesktopFilterSidebar = ({
  initialCategory,
  onCategoryChange
}) => {
  const {
    t
  } = useTranslation();
  const {
    loadingOptions,
    options,
    state,
    actions
  } = useFilters(initialCategory);
  if (loadingOptions) {
    return <div className="desktop-filter-sidebar">
        <div className="dfs-loading">
          <Filter size={24} color="#e0e0e0" style={{
          marginBottom: 16
        }} />
          <span>{t("Loading filters...")}</span>
        </div>
      </div>;
  }
  const {
    categories,
    brands,
    priceRanges,
    sortOptions
  } = options;
  const {
    selectedCategory,
    selectedBrands,
    selectedPriceRange,
    customPriceRange,
    selectedSort
  } = state;
  const handleCategoryClick = cat => {
    actions.setSelectedCategory(cat.name);
    if (onCategoryChange) {
      onCategoryChange(cat.id);
    }
  };
  return <div className="desktop-filter-sidebar">
      
      {/* Header */}
      <div className="dfs-header">
        <div className="dfs-title-wrapper">
          <Filter size={20} color="#1a1a24" />
          <h2 className="dfs-title">{t("Filters")}</h2>
        </div>
        <button className="dfs-clear-btn" onClick={actions.clearAllFilters}>{t("Clear All")}</button>
      </div>

      {/* Categories */}
      <div className="dfs-section">
        <h3 className="dfs-section-title">{t("Categories")}</h3>
        <div className="dfs-category-list">
          {categories.map(cat => (
            <div key={cat.id} className={`dfs-category-item ${selectedCategory === cat.name ? 'active' : ''}`} onClick={() => handleCategoryClick(cat)}>
              <span className="dfs-category-icon">{cat.icon}</span>
              <span>{t(cat.name)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="dfs-section">
        <h3 className="dfs-section-title">{t("Price Range")}</h3>
        
        {/* Simulated Slider */}
        <div className="dfs-price-slider-wrapper">
          <input type="range" min="0" max="100000" value={customPriceRange.max} onChange={e => actions.setCustomPriceRange({
          ...customPriceRange,
          max: parseInt(e.target.value)
        })} className="dfs-price-slider" />
        </div>

        <div className="dfs-price-inputs">
          <div className="dfs-price-input-box">
            <span>{t("Min")}</span>
            <input type="number" value={customPriceRange.min} onChange={e => actions.setCustomPriceRange({
            ...customPriceRange,
            min: parseInt(e.target.value) || 0
          })} className="dfs-price-input" />
          </div>
          <div className="dfs-price-input-box">
            <span>{t("Max")}</span>
            <input type="number" value={customPriceRange.max} onChange={e => actions.setCustomPriceRange({
            ...customPriceRange,
            max: parseInt(e.target.value) || 0
          })} className="dfs-price-input" />
          </div>
        </div>

        <div className="dfs-price-chips">
          {priceRanges.map(price => (
            <div key={price.id} className={`dfs-price-chip ${selectedPriceRange === price.id ? 'active' : ''}`} onClick={() => actions.setSelectedPriceRange(price.id)}>
              {t(price.label)}
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="dfs-section">
        <h3 className="dfs-section-title">{t("Brands")}</h3>
        <div className="dfs-brand-grid">
          {brands.map(brand => {
            const isActive = selectedBrands.includes(brand.id);
            return (
              <div key={brand.id} className={`dfs-brand-card ${isActive ? 'active' : ''}`} onClick={() => actions.toggleBrand(brand.id)}>
                <div className="dfs-checkbox">
                  {isActive && <Check size={12} color="white" strokeWidth={3} />}
                </div>
                <span className="dfs-brand-logo">{brand.logo}</span>
                <span className="dfs-brand-name">{t(brand.name)}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>;
};
export default DesktopFilterSidebar;