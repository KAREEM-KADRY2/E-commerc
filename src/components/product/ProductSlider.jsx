import { useTranslation } from "react-i18next";
import React, { useState, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const ProductSlider = ({
  title,
  products
}) => {
  const {
    t
  } = useTranslation();
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  if (!products || products.length === 0) return null;
  return <div className="product-slider-section">
      <div className="slider-header">
        <h3 className="section-title">{title}</h3>
        <div className="slider-controls">
          <button className="slider-nav-btn" onClick={scrollLeft}><ChevronLeft size={24} /></button>
          <button className="slider-nav-btn" onClick={scrollRight}><ChevronRight size={24} /></button>
        </div>
      </div>
      
      <div className="slider-container" ref={sliderRef}>
        {products.map(product => {
        const {
          t
        } = useTranslation();
        return <Link to={`/product/${product.id}`} key={product.id} className="slider-card-link">
            <div className="slider-card">
              <div className="slider-card-image-wrapper">
                {product.discount && <span className="slider-discount-badge">{product.discount?.replace('-', '')}</span>}
                <button className="slider-wishlist-btn" onClick={e => {
                e.preventDefault(); /* add to wishlist */
              }}>
                  <Heart size={20} />
                </button>
                <img src={product.image || product.images?.[0]} alt={product.name} />
              </div>
              <div className="slider-card-info">
                <h4 className="slider-product-title">{product.name}</h4>
                <div className="slider-price-row">
                  <span className="slider-current-price">${product.price.toLocaleString()}</span>
                  {product.oldPrice && <span className="slider-old-price">${product.oldPrice.toLocaleString()}</span>}
                </div>
                {product.cashback && <div className="slider-cashback-badge">{t("Earn $")}{product.cashback.toLocaleString()}{t("Cashback")}</div>}
              </div>
            </div>
          </Link>;
      })}
      </div>
    </div>;
};
export default ProductSlider;
