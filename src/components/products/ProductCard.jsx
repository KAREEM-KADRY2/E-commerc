import { useTranslation } from "react-i18next";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Users, Wallet } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCartContext } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useWishlistContext } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { showToast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`);
  };
  
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div style={{ 
      background: '#FCFCFB', 
      borderRadius: '16px', 
      border: '1px solid #f1f3f5', 
      padding: '24px', 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {/* Top section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', zIndex: 10 }}>
        {product.discount ? (
          <div style={{ background: '#FFF3E8', color: '#FF7A29', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {product.discount?.replace('-', '')} {t("OFF")}
          </div>
        ) : <div />}
        <button 
          onClick={handleWishlist} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isWishlisted ? '#E96B7A' : '#D1D5DB', padding: 0 }}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Image */}
      <div 
        onClick={handleProductClick} 
        style={{ cursor: 'pointer', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', backgroundColor: product.imageBg || '#F8F9FA', borderRadius: '12px', padding: '16px' }}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
        />
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 
          onClick={handleProductClick} 
          style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '700', color: '#1a1d20', margin: '0 0 8px 0', lineHeight: '1.4' }}
        >
          {t(product.name)}
        </h3>
        <div style={{ fontSize: '13px', color: '#7A7A7A', marginBottom: '24px' }}>
          {product.specifications?.Storage || product.specifications?.Size || product.specifications?.Color || product.category || 'Standard Edition'}
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#008b8b' }}>{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span style={{ fontSize: '14px', color: '#adb5bd', textDecoration: 'line-through', marginBottom: '2px' }}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/start-group-buy'); }} 
              style={{ flex: 1, background: 'white', border: '1px solid #008b8b', color: '#008b8b', padding: '12px 0', borderRadius: '12px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <Users size={16} /> {t("Join Group")}
            </button>
            <button 
              onClick={handleProductClick} 
              style={{ flex: 1, background: '#008b8b', color: 'white', border: 'none', padding: '12px 0', borderRadius: '12px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <ShoppingCart size={16} /> {t("View")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
