import React from 'react';
import { useTranslation } from "react-i18next";
import { Plus, Minus, Heart, Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item, updateQuantity, handleSaveForLater, removeFromCart }) => {
  const { t } = useTranslation();
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <div>
          <h3 className="cart-item-title">{item.name}</h3>
          <p className="cart-item-price">{formatPrice(item.price)}</p>
          <p className="cart-item-cashback">
            <span>🪙</span>{t("Earn")}{formatPrice(item.cashback * item.quantity)}{t("Cashback")}
          </p>
        </div>
        <div className="cart-item-actions-wrapper">
          <div className="cart-item-quantity-controls">
            <button onClick={() => updateQuantity(item.id, -1)} className="cart-qty-btn">
              <Minus size={16} />
            </button>
            <span className="cart-qty-text">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)} className="cart-qty-btn">
              <Plus size={16} />
            </button>
          </div>
          <div className="cart-item-actions">
            <button onClick={() => handleSaveForLater(item)} className="cart-action-btn btn-save">
              <Heart size={16} />{t("Save For Later")}
            </button>
            <button onClick={() => removeFromCart(item.id)} className="cart-action-btn btn-remove">
              <Trash2 size={16} />{t("Remove")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
