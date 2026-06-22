import React from 'react';
import { useTranslation } from "react-i18next";
import { Share2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryProductCard = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="category-product-card">
      
      {product.discount && (
        <div className="category-product-discount-badge">
          {product.discount.replace('-', '')}
        </div>
      )}
      
      <button 
        className="category-product-share-btn"
        onClick={(e) => {
          e.stopPropagation();
          // Add share logic here if needed
        }}
      >
        <Share2 size={16} color="#495057" />
      </button>

      <div className="category-product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="category-product-details">
        <div className="category-product-brand">
          {product.specifications?.Brand || 'Premium'}
        </div>
        
        <h3 className="category-product-name">{product.name}</h3>
        
        <div className="category-product-rating">
          ★ {product.rating} <span>({product.reviewsCount})</span>
        </div>

        <div className="category-product-price-row">
          <span className="category-product-price">
            {product.price.toLocaleString()}{t("AED")}
          </span>
          <span className="category-product-old-price">
            {product.oldPrice.toLocaleString()}{t("AED")}
          </span>
        </div>

        <div className="category-product-actions">
          <button 
            className="category-product-wishlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              // Add wishlist logic here if needed
            }}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductCard;
