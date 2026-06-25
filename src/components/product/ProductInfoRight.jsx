import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Undo2, Plus, Minus, Users, Zap, ShoppingCart, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { productShareService } from '../../services/productShareService';

const ProductInfoRight = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addToCart } = useCartContext();
  const { isLoggedIn, openAuthModal } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    color: product.colors?.[0]?.name || '',
    size: product.sizes?.[0] || '',
    storage: product.storageOptions?.[0] || '',
    strapColor: product.strapColors?.[0] || '',
    dialColor: product.dialColors?.[0] || ''
  });

  const handleOptionChange = (type, value) => {
    setSelectedOptions(prev => ({ ...prev, [type]: value }));
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleStartGroup = () => {
    navigate('/active-group-buys');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleShare = async () => {
    if (!isLoggedIn) {
      openAuthModal('login');
      return;
    }
    try {
      setIsSharing(true);
      const response = await productShareService.createProductShare(product.id);
      if (response && response.share_url) {
        await navigator.clipboard.writeText(response.share_url);
        showToast(t("Share link copied to clipboard!"));
      } else {
        // Fallback or handle differently
        await navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}?share_code=test_123`);
        showToast(t("Share link copied to clipboard!"));
      }
    } catch (err) {
      showToast(t("Failed to generate share link"));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="product-info-right premium-layout">
      <div className="product-category-label">{t(product.category)}</div>
      <h1 className="product-title">{t(product.name)}</h1>
      
      <div className="product-meta premium">

        {/* Weekly sales removed */}
      </div>

      <p className="short-description">{t(product.shortDescription || "Premium quality product with excellent features.")}</p>

      <div className="premium-pricing-section">
        <div className="price-solo">
          <span className="price-label">{t("Solo Price")}</span>
          <div className="price-value">
            <span className="current">${product.price.toLocaleString()}</span>
            {product.oldPrice && <span className="old">${product.oldPrice.toLocaleString()}</span>}
          </div>
        </div>
      </div>

      {/* Dynamic Attributes */}
      <div className="product-attributes">
        {product.colors && product.colors.length > 0 && (
          <div className="attribute-group">
            <h4 className="attribute-title">{t("Color")}: <span>{t(selectedOptions.color)}</span></h4>
            <div className="attribute-options color-swatches">
              {product.colors.map(color => (
                <button 
                  key={color.name} 
                  className={`color-swatch ${selectedOptions.color === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleOptionChange('color', color.name)}
                  title={t(color.name)}
                />
              ))}
            </div>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="attribute-group">
            <h4 className="attribute-title">{t("Size")}: <span>{selectedOptions.size}</span></h4>
            <div className="attribute-options text-options">
              {product.sizes.map(size => (
                <button 
                  key={size} 
                  className={`text-option ${selectedOptions.size === size ? 'active' : ''}`}
                  onClick={() => handleOptionChange('size', size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.storageOptions && product.storageOptions.length > 0 && (
          <div className="attribute-group">
            <h4 className="attribute-title">{t("Storage")}: <span>{selectedOptions.storage}</span></h4>
            <div className="attribute-options text-options">
              {product.storageOptions.map(storage => (
                <button 
                  key={storage} 
                  className={`text-option ${selectedOptions.storage === storage ? 'active' : ''}`}
                  onClick={() => handleOptionChange('storage', storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {product.strapColors && product.strapColors.length > 0 && (
          <div className="attribute-group">
            <h4 className="attribute-title">{t("Strap Color")}: <span>{t(selectedOptions.strapColor)}</span></h4>
            <div className="attribute-options text-options">
              {product.strapColors.map(strap => (
                <button 
                  key={strap} 
                  className={`text-option ${selectedOptions.strapColor === strap ? 'active' : ''}`}
                  onClick={() => handleOptionChange('strapColor', strap)}
                >
                  {t(strap)}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.dialColors && product.dialColors.length > 0 && (
          <div className="attribute-group">
            <h4 className="attribute-title">{t("Dial Color")}: <span>{t(selectedOptions.dialColor)}</span></h4>
            <div className="attribute-options text-options">
              {product.dialColors.map(dial => (
                <button 
                  key={dial} 
                  className={`text-option ${selectedOptions.dialColor === dial ? 'active' : ''}`}
                  onClick={() => handleOptionChange('dialColor', dial)}
                >
                  {t(dial)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="premium-action-section">
        <div className="quantity-selector premium-qty">
          <button onClick={decreaseQuantity}><Minus size={16} /></button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}><Plus size={16} /></button>
        </div>
        
        <div className="premium-buttons" style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button className="btn-outline-hover" onClick={handleAddToCart} style={{
            flex: 1,
            background: 'white',
            border: '2px solid #008b8b',
            color: '#008b8b',
            padding: '16px 0',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '150px'
          }}>
            {t("Add to Cart")}
          </button>
          
          <button className="btn-solid-hover" onClick={handleStartGroup} style={{
            flex: 1,
            background: '#008b8b',
            color: 'white',
            border: 'none',
            padding: '16px 0',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 139, 139, 0.2)',
            minWidth: '150px'
          }}>
            <Zap size={20} fill="#FFA726" color="#FFA726" /> {t("Start Group Buy")}
          </button>

          <button className="btn-outline-hover share-btn" onClick={handleShare} disabled={isSharing} style={{
            flex: 1,
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            color: '#495057',
            padding: '16px 0',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isSharing ? 'not-allowed' : 'pointer',
            opacity: isSharing ? 0.7 : 1,
            transition: 'all 0.2s ease',
            minWidth: '150px'
          }}>
            <Share2 size={20} /> {isSharing ? t("Generating...") : t("Share")}
          </button>
        </div>
        <p className="share-info-text" style={{ marginTop: '12px', fontSize: '14px', color: '#6c757d', textAlign: 'center' }}>
          {t("Share with your friends to unlock extra discounts.")}
        </p>
      </div>

    </div>
  );
};

export default ProductInfoRight;
