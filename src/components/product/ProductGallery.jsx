import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useWishlistContext } from '../../context/WishlistContext';

const ProductGallery = ({ product }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const isWishlisted = isInWishlist(product?.id);
  
  if (!product) return null;
  const images = product.images || [product.image];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-gallery">
      <div className="gallery-main-image-container">
        {product.discount && (
          <div className="gallery-badge-discount">{product.discount?.replace('-', '')}</div>
        )}
        <div className="gallery-actions-top">
          <button className="gallery-action-btn share-btn">
            <Share2 size={20} />
          </button>
          <button className={`gallery-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`} onClick={handleWishlist}>
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        
        {images.length > 1 && (
          <button className="gallery-nav-btn prev" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className="main-image-wrapper">
          <img 
            src={images[currentIndex]} 
            alt={product.name} 
            className="main-image" 
            style={{ filter: `hue-rotate(${currentIndex * 80}deg)` }}
          />
        </div>
        
        {images.length > 1 && (
          <button className="gallery-nav-btn next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-thumbnail ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img 
                src={img} 
                alt={`${product.name} ${idx + 1}`} 
                style={{ filter: `hue-rotate(${idx * 80}deg)` }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
